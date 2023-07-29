import asyncio
from typing import Optional
from datetime import datetime, timedelta
import can
from sniffer.mappings import (
    can_mappings,
    obd2_mappings,
    support_pids,
    OBD2_REQUEST,
    OBD2_RESPONSE,
    OBD2_PIDS,
)
from sniffer.formatters import bytearray_to_bit_string, bytearray_to_hex_string
from speedyapi.websockets import WebsocketsStore
from speedyapi.json import serialise_json
from speedyapi import Logger

PID_REQUEST_ORDER = [
    OBD2_PIDS.ENGINE_LOAD.value,
    OBD2_PIDS.ENGINE_COOLANT_TEMPERATURE.value,
    OBD2_PIDS.ENGINE_RPM.value,
    OBD2_PIDS.VEHICLE_SPEED.value,
    OBD2_PIDS.INTAKE_AIR_TEMPERATURE.value,
    OBD2_PIDS.MASS_AIR_FLOW.value,
    OBD2_PIDS.RELATIVE_THROTTLE_POSITION.value,
    OBD2_PIDS.O2_VOLTAGE.value,
    OBD2_PIDS.ENGINE_RUNTIME.value,
    OBD2_PIDS.FUEL_TANK_LEVEL.value,
    OBD2_PIDS.AIR_PRESSURE.value,
    OBD2_PIDS.BATTERY_VOLTAGE.value,
    OBD2_PIDS.AIR_FUEL_RATIO.value,
    OBD2_PIDS.AMBIENT_AIR_TEMPERATURE.value,
    OBD2_PIDS.THROTTLE_POSITION.value,
    OBD2_PIDS.ACCELERATOR_POSITION.value,
    OBD2_PIDS.RELATIVE_ACCELERATOR_POSITION.value,
    OBD2_PIDS.ENGINE_OIL_TEMPERATURE.value,
    OBD2_PIDS.ENGINE_FUEL_RATE.value,
    OBD2_PIDS.TOTAL_ENGINE_RUNTIME.value,
    OBD2_PIDS.GEAR_RATIO.value,
    OBD2_PIDS.ODOMETER.value,
]


class CANSniffer:
    websockets: WebsocketsStore
    logger: Logger

    sniffer_task: Optional[asyncio.Task]
    listener_task: Optional[asyncio.Task]
    requester_task: Optional[asyncio.Task]
    bus: Optional[can.Bus]
    reader: Optional[can.AsyncBufferedReader]
    notifier: Optional[can.Notifier]

    obd2_request_sent_at: Optional[datetime]
    last_sent_obd2_pid: Optional[int]
    last_seen_obd2_pid: Optional[int]
    supported_pids: dict[int, bool]

    def __init__(
        self,
        websockets: WebsocketsStore,
        logger: Logger,
    ) -> None:
        self.websockets = websockets
        self.logger = logger
        self.sniffer_task = None
        self.listener_task = None
        self.requester_task = None
        self.bus = None
        self.reader = None
        self.notifier = None
        self.obd2_request_sent_at = None
        self.last_sent_obd2_pid = None
        self.last_seen_obd2_pid = None
        self.supported_pids = {}

    async def forward_can_socket_message(self, message: can.Message) -> None:
        await self.websockets.broadcast_to_scope(
            scope="can",
            message=serialise_json(
                {
                    "timestamp": message.timestamp * 1000,
                    "bits": bytearray_to_bit_string(message.data),
                    "bytes": [byte for byte in message.data],
                    "hex": [format(byte, "02x") for byte in message.data],
                    "arbitration_id": message.arbitration_id,
                    "is_extended_id": message.is_extended_id,
                    "is_remote_frame": message.is_remote_frame,
                    "is_error_frame": message.is_error_frame,
                    "channel": message.channel,
                    "dlc": message.dlc,
                    "is_fd": message.is_fd,
                    "is_rx": message.is_rx,
                    "bitrate_switch": message.bitrate_switch,
                    "error_state_indicator": message.error_state_indicator,
                }
            ),
        )

    async def forward_can_data_socket_message(self, message: can.Message) -> None:
        for mapping in can_mappings.get(message.arbitration_id, []):
            await self.websockets.broadcast_to_scope(
                scope="data",
                message=serialise_json({
                    "timestamp": message.timestamp * 1000,
                    "name": mapping.name,
                    "value": mapping.format(
                        message.data[mapping.bits[0] : mapping.bits[1]]
                    ),
                }),
            )

    async def forward_obd2_data_socket_message(self, message: can.Message) -> None:
        mapping = obd2_mappings.get(message.data[2])

        if mapping is not None:
            await self.websockets.broadcast_to_scope(
                scope="data",
                message=serialise_json({
                    "timestamp": message.timestamp * 1000,
                    "name": mapping.name,
                    "value": mapping.format(message.data[3:7]),
                    "unit": mapping.unit,
                }),
            )

    def update_supported_pids(self, message: can.Message) -> None:
        mapping = obd2_mappings.get(message.data[2])

        if mapping is not None:
            self.supported_pids = {
                **self.supported_pids,
                **mapping.format(message.data[3:7]),
            }

    def send_obd2_message(self, service: int, pid: Optional[int] = None) -> None:
        if self.bus is None:
            self.logger.warning("Attempted to send OBD2 message without bus present.")
            return

        self.bus.send(
            can.Message(
                arbitration_id=OBD2_REQUEST,
                data=[
                    0x02 if pid is not None else 0x01,
                    service,
                    pid if pid is not None else 0x00,
                    0x00,
                    0x00,
                    0x00,
                    0x00,
                    0x00,
                ],
                is_extended_id=False,
            )
        )

    def send_obd2_data_message(self, pid: int) -> None:
        self.last_sent_obd2_pid = pid
        self.obd2_request_sent_at = datetime.utcnow()
        self.send_obd2_message(service=0x01, pid=pid)

    def send_obd2_dtc_message(self) -> None:
        self.send_obd2_message(service=0x03)

    async def _start_tasks(self) -> None:
        if self.listener_task is None:
            self.logger.info("Starting can listener.")
            self.listener_task = asyncio.create_task(self._run_listener())
        else:
            raise ValueError("Listener task already exists.")
        if self.requester_task is None:
            self.logger.info("Starting can requester.")
            self.requester_task = asyncio.create_task(self._run_requester())
        else:
            raise ValueError("Requester task already exists.")

    async def _stop_tasks(self) -> None:
        if self.requester_task is not None:
            self.logger.info("Stopping can requester.")
            self.requester_task.cancel()
            await self.requester_task
            self.requester_task = None
        if self.listener_task is not None:
            self.logger.info("Stopping can listener.")
            self.listener_task.cancel()
            await self.listener_task

    def _start_can(self) -> None:
        loop = asyncio.get_running_loop()
        if self.bus is None:
            self.logger.info("Starting can bus.")
            self.bus = can.Bus(
                channel="can0",
                bustype="socketcan",
                receive_own_messages=True,
            )
        else:
            raise ValueError("Bus already exists.")
        if self.reader is None:
            self.logger.info("Starting can reader.")
            self.reader = can.AsyncBufferedReader()
        else:
            raise ValueError("Reader already exists.")
        if self.notifier is None:
            self.logger.info("Starting can notifier.")
            self.notifier = can.Notifier(self.bus, [self.reader], loop=loop)
        else:
            raise ValueError("Notifier already exists.")

    def _stop_can(self) -> None:
        if self.notifier is not None:
            self.logger.info("Stopping can notifier.")
            self.notifier.stop()
            self.notifier = None
        if self.reader is not None:
            self.logger.info("Stopping can reader.")
            self.reader.stop()
            self.reader = None
        if self.bus is not None:
            self.logger.info("Stopping can bus.")
            self.bus.shutdown()
            self.bus = None

    async def _run_sniffer(self) -> None:
        init = True
        try:
            while True:
                if init:
                    pass
                elif (
                    self.listener_task is None
                    or self.listener_task.cancelled()
                    or self.listener_task.done()
                ):
                    self.logger.warning("listener_task in bad state, restarting")
                elif (
                    self.requester_task is None
                    or self.requester_task.cancelled()
                    or self.requester_task.done()
                ):
                    self.logger.warning("requester_task in bad state, restarting")
                elif self.bus is None or self.bus.state != can.BusState.ACTIVE:
                    self.logger.warning("bus in bad state, restarting")
                elif self.reader is None:
                    self.logger.warning("reader in bad state, restarting")
                elif self.notifier is None:
                    self.logger.warning("notifier in bad state, restarting")
                else:
                    # All good in the hood
                    await asyncio.sleep(1)
                    continue

                await self._stop_tasks()
                self._stop_can()

                try:
                    self._start_can()
                    await self._start_tasks()
                    init = False
                except Exception as error:
                    await self._stop_tasks()
                    self._stop_can()

                    if isinstance(error, asyncio.CancelledError):
                        raise

                    self.logger.error(f"CAN sniffer start up failed: {error}")
                    self.logger.info("Restarting sniffer in 1s")

                await asyncio.sleep(1)

        except asyncio.CancelledError:
            self.logger.info(f"CAN sniffer task received cancel instruction.")
            await self._stop_tasks()
            self._stop_can()

    async def _run_listener(self) -> None:
        try:
            while True:
                message = await self.reader.get_message()
                await self.forward_can_socket_message(message)

                if can_mappings.get(message.arbitration_id) is not None:
                    await self.forward_can_data_socket_message(message)
                    # mappings = can_mappings[message.arbitration_id]
                    # self.logger.info(
                    #     f"Received CAN-{message.arbitration_id}: "
                    #     + f"{' ,'.join([mapping.name for mapping in mappings])}"
                    # )
                if message.arbitration_id == OBD2_RESPONSE:
                    self.last_seen_obd2_pid = message.data[2]
                    mapping = obd2_mappings.get(message.data[2])

                    if mapping is None:
                        self.logger.warning(
                            f"Unmapped OBD2 PID seen: {bytearray_to_hex_string(message.data[2:3])}"
                        )
                    elif mapping.pid in support_pids:
                        self.logger.info(f"Received {mapping.name}:")
                        self.update_supported_pids(message)
                    else:
                        self.logger.info(
                            f"Received {mapping.name}"
                            + f"{f' ({datetime.utcnow() - self.obd2_request_sent_at})' if mapping.pid == self.last_sent_obd2_pid else ''}: "
                            + f"{mapping.format(message.data[3:7])} {mapping.unit or ''}"
                        )
                        await self.forward_can_data_socket_message(message)
        except asyncio.CancelledError:
            self.logger.info(f"CAN listener task received cancel instruction.")
        except Exception as error:
            self.logger.error(f"CAN listener task error: {error}")

    async def _run_requester(self) -> None:
        try:
            i = 0
            while True:
                if self.last_sent_obd2_pid == self.last_seen_obd2_pid or datetime.utcnow() - self.obd2_request_sent_at > timedelta(milliseconds=1000):
                    if self.supported_pids.get(0x01) is None:
                        self.logger.info(
                            f"Requesting {obd2_mappings[OBD2_PIDS.SUPPORTED_PIDS_01_0F.value].name}"
                        )
                        self.send_obd2_data_message(
                            OBD2_PIDS.SUPPORTED_PIDS_01_0F.value
                        )
                    elif self.supported_pids.get(0x21) is None:
                        self.logger.info(
                            f"Requesting {obd2_mappings[OBD2_PIDS.SUPPORTED_PIDS_21_3F.value].name}"
                        )
                        self.send_obd2_data_message(
                            OBD2_PIDS.SUPPORTED_PIDS_21_3F.value
                        )
                    elif self.supported_pids.get(0x41) is None:
                        self.logger.info(
                            f"Requesting {obd2_mappings[OBD2_PIDS.SUPPORTED_PIDS_41_5F.value].name}"
                        )
                        self.send_obd2_data_message(
                            OBD2_PIDS.SUPPORTED_PIDS_41_5F.value
                        )
                    elif self.supported_pids.get(0x61) is None:
                        self.logger.info(
                            f"Requesting {obd2_mappings[OBD2_PIDS.SUPPORTED_PIDS_61_7F.value].name}"
                        )
                        self.send_obd2_data_message(
                            OBD2_PIDS.SUPPORTED_PIDS_61_7F.value
                        )
                    elif self.supported_pids.get(0x81) is None:
                        self.logger.info(
                            f"Requesting {obd2_mappings[OBD2_PIDS.SUPPORTED_PIDS_81_9F.value].name}"
                        )
                        self.send_obd2_data_message(
                            OBD2_PIDS.SUPPORTED_PIDS_81_9F.value
                        )
                    elif self.supported_pids.get(0xA1) is None:
                        self.logger.info(
                            f"Requesting {obd2_mappings[OBD2_PIDS.SUPPORTED_PIDS_A1_BF.value].name}"
                        )
                        self.send_obd2_data_message(
                            OBD2_PIDS.SUPPORTED_PIDS_A1_BF.value
                        )
                    else:
                        pid = PID_REQUEST_ORDER[i % len(PID_REQUEST_ORDER)]
                        self.logger.info(f"Requesting {obd2_mappings[pid].name}")

                        if self.supported_pids[pid]:
                            self.send_obd2_data_message(pid)
                        else:
                            self.logger.warning(f"{obd2_mappings[pid].name} not supported")

                        i += 1

                await asyncio.sleep(0.01)
        except asyncio.CancelledError:
            self.logger.info(f"CAN requester task received cancel instruction.")
        except Exception as error:
            self.logger.error(f"CAN requester task error: {error}")

    async def start(self) -> asyncio.Task:
        if self.sniffer_task is not None:
            await self.stop()

        self.logger.info("Starting can sniffer.")
        self.sniffer_task = asyncio.create_task(self._run_sniffer())

        return self.sniffer_task

    async def stop(self) -> None:
        if self.sniffer_task is not None:
            self.logger.info("Stopping can sniffer.")
            self.sniffer_task.cancel()
            await self.sniffer_task
            self.sniffer_task = None
