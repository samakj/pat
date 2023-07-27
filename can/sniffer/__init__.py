import asyncio
from typing import Optional, Any
import can
from models.mapping import DataMapping
from sniffer.mappings import mappings
from sniffer.formatters import bytearray_to_bit_string
from speedyapi.websockets import WebsocketsStore
from speedyapi.json import serialise_json
from speedyapi import Logger


class CANSniffer:
    websockets: WebsocketsStore
    logger: Logger

    task: Optional[asyncio.Task]
    bus: Optional[can.Bus]
    reader: Optional[can.AsyncBufferedReader]
    notifier: Optional[can.Notifier]

    def __init__(
        self,
        websockets: WebsocketsStore,
        logger: Logger,
    ) -> None:
        self.websockets = websockets
        self.logger = logger
        self.task = None
        self.bus = None
        self.reader = None
        self.notifier = None
        self.mappings_state = {}

    def build_can_socket_message(self, message: can.Message) -> dict[str, Any]:
        return {
            "timestamp": message.timestamp * 1000,
            "bits": bytearray_to_bit_string(message.data),
            "bytes": [byte for byte in bytes],
            "hex": [format(byte, "02x") for byte in bytes],
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

    def build_data_socket_message(
        self, message: can.Message, mapping: DataMapping
    ) -> dict[str, Any]:
        return {
            "timestamp": message.timestamp * 1000,
            "name": mapping.name,
            "value": mapping.format(message.data[mapping.bits[0] : mapping.bits[1]]),
        }

    async def _run(self) -> None:
        try:
            while True:
                try:
                    loop = asyncio.get_running_loop()
                    self.bus = self.bus or can.Bus(
                        channel="can0", bustype="socketcan", receive_own_messages=True
                    )
                    self.reader = self.reader or can.AsyncBufferedReader()
                    self.notifier = self.notifier or can.Notifier(
                        self.bus, [self.reader], loop=loop
                    )
                    while True:
                        message = await self.reader.get_message()

                        await self.websockets.broadcast_to_scope(
                            scope="can",
                            message=serialise_json(
                                self.build_can_socket_message(message)
                            ),
                        )

                        if mappings.get(message.arbitration_id) is not None:
                            for mapping in mappings[message.arbitration_id]:
                                await self.websockets.broadcast_to_scope(
                                    scope="data",
                                    message=serialise_json(
                                        self.build_data_socket_message(message, mapping)
                                    ),
                                )

                except Exception as error:
                    self.logger.info([self.notifier, self.reader, self.bus])
                    if self.notifier is not None:
                        self.notifier.stop()
                        self.notifier = None
                    if self.reader is not None:
                        self.reader.stop()
                        self.reader = None
                    if self.bus is not None:
                        self.bus.shutdown()
                        self.bus = None

                    if isinstance(error, asyncio.CancelledError):
                        raise

                    self.logger.error(f"CAN sniffer task exception: {error}")
                    self.logger.info("Restarting sniffer in 5s")

                await asyncio.sleep(5)

        except asyncio.CancelledError:
            self.logger.info(f"CAN sniffer task received cancel instruction.")

    async def start(self) -> asyncio.Task:
        if self.task is not None:
            await self.stop()

        self.logger.info("Starting can sniffer.")
        self.task = asyncio.create_task(self._run())

        return self.task

    async def stop(self) -> None:
        if self.task is not None:
            self.logger.info("Stopping can sniffer.")
            self.task.cancel()
            await self.task
            self.task = None
