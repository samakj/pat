from enum import Enum

from models.mapping import CANMapping, OBD2Mapping
from sniffer.formatters import (
    bytearray_to_bool,
    supported_pids_formatter,
    first_byte_to_percentage,
    bytearray_to_int,
    offset_first_byte_to_int,
)


can_mappings = {
    1477: [
        CANMapping(
            name="handbrake", arbitration_id=1477, bits=(5, 6), format=bytearray_to_bool
        )
    ],
    1549: [
        CANMapping(
            name="boot open", arbitration_id=1549, bits=(0, 1), format=bytearray_to_bool
        ),
        CANMapping(
            name="drivers door open",
            arbitration_id=1549,
            bits=(3, 4),
            format=bytearray_to_bool,
        ),
        CANMapping(
            name="passenger door open",
            arbitration_id=1549,
            bits=(4, 5),
            format=bytearray_to_bool,
        ),
        CANMapping(
            name="side lights on",
            arbitration_id=1549,
            bits=(5, 6),
            format=bytearray_to_bool,
        ),
        CANMapping(
            name="head lights on",
            arbitration_id=1549,
            bits=(6, 7),
            format=bytearray_to_bool,
        ),
        CANMapping(
            name="left indicator on",
            arbitration_id=1549,
            bits=(10, 11),
            format=bytearray_to_bool,
        ),
        CANMapping(
            name="right indicator on",
            arbitration_id=1549,
            bits=(11, 12),
            format=bytearray_to_bool,
        ),
    ],
}

OBD2_REQUEST = 0x7DF
OBD2_RESPONSE = 0x7E8


class OBD2_PIDS(Enum):
    SUPPORTED_PIDS_01_0F = 0x00

    ENGINE_LOAD = 0x04
    ENGINE_COOLANT_TEMPERATURE = 0x05
    ENGINE_RPM = 0x0C
    VEHICLE_SPEED = 0x0D
    INTAKE_AIR_TEMPERATURE = 0x0F
    MASS_AIR_FLOW = 0x10
    RELATIVE_THROTTLE_POSITION = 0x11
    O2_VOLTAGE = 0x14
    ENGINE_RUNTIME = 0x1F

    SUPPORTED_PIDS_21_3F = 0x20

    FUEL_TANK_LEVEL = 0x2F
    AIR_PRESSURE = 0x33

    SUPPORTED_PIDS_41_5F = 0x40

    BATTERY_VOLTAGE = 0x42
    AIR_FUEL_RATIO = 0x44
    AMBIENT_AIR_TEMPERATURE = 0x46
    THROTTLE_POSITION = 0x47
    ACCELERATOR_POSITION = 0x49
    RELATIVE_ACCELERATOR_POSITION = 0x5A
    ENGINE_OIL_TEMPERATURE = 0x5C
    ENGINE_FUEL_RATE = 0x5E

    SUPPORTED_PIDS_61_7F = 0x60

    # MASS_AIR_FLOW = 0x66
    # ENGINE_COOLANT_TEMPERATURE = 0x67
    # INTAKE_AIR_TEMPERATURE = 0x68
    TOTAL_ENGINE_RUNTIME = 0x7F

    SUPPORTED_PIDS_81_9F = 0x80

    SUPPORTED_PIDS_A1_BF = 0x80

    GEAR_RATIO = 0xA4
    ODOMETER = 0xA6


support_pids = {
    OBD2_PIDS.SUPPORTED_PIDS_01_0F.value,
    OBD2_PIDS.SUPPORTED_PIDS_21_3F.value,
    OBD2_PIDS.SUPPORTED_PIDS_41_5F.value,
    OBD2_PIDS.SUPPORTED_PIDS_61_7F.value,
    OBD2_PIDS.SUPPORTED_PIDS_81_9F.value,
    OBD2_PIDS.SUPPORTED_PIDS_A1_BF.value,
}

obd2_mappings = {
    OBD2_PIDS.SUPPORTED_PIDS_01_0F.value: OBD2Mapping(
        pid=OBD2_PIDS.SUPPORTED_PIDS_01_0F.value,
        name="Supported PIDs: 01 - 0F",
        format=supported_pids_formatter(start=0x01),
    ),
    OBD2_PIDS.ENGINE_LOAD.value: OBD2Mapping(
        pid=OBD2_PIDS.ENGINE_LOAD.value,
        name="Engine load",
        format=first_byte_to_percentage,
        unit="%",
    ),
    OBD2_PIDS.ENGINE_COOLANT_TEMPERATURE.value: OBD2Mapping(
        pid=OBD2_PIDS.ENGINE_COOLANT_TEMPERATURE.value,
        name="Engine coolant temperature",
        format=offset_first_byte_to_int(-40),
        unit="°C",
    ),
    OBD2_PIDS.ENGINE_RPM.value: OBD2Mapping(
        pid=OBD2_PIDS.ENGINE_RPM.value,
        name="Engine RPM",
        format=lambda bytes: (bytearray_to_int(bytes[0:2])) / 4,
        unit="rpm",
    ),
    OBD2_PIDS.VEHICLE_SPEED.value: OBD2Mapping(
        pid=OBD2_PIDS.VEHICLE_SPEED.value,
        name="Speed",
        format=lambda bytes: bytearray_to_int(bytes[0:1]),
        unit="km/h",
    ),
    OBD2_PIDS.INTAKE_AIR_TEMPERATURE.value: OBD2Mapping(
        pid=OBD2_PIDS.INTAKE_AIR_TEMPERATURE.value,
        name="Intake air temperature",
        format=offset_first_byte_to_int(-40),
        unit="°C",
    ),
    OBD2_PIDS.MASS_AIR_FLOW.value: OBD2Mapping(
        pid=OBD2_PIDS.MASS_AIR_FLOW.value,
        name="Mass air flow",
        format=lambda bytes: (bytearray_to_int(bytes[0:2])) / 100,
        unit="g/s",
    ),
    OBD2_PIDS.RELATIVE_THROTTLE_POSITION.value: OBD2Mapping(
        pid=OBD2_PIDS.RELATIVE_THROTTLE_POSITION.value,
        name="Relative throttle position",
        format=first_byte_to_percentage,
        unit="%",
    ),
    OBD2_PIDS.O2_VOLTAGE.value: OBD2Mapping(
        pid=OBD2_PIDS.O2_VOLTAGE.value,
        name="O2 Voltage",
        format=lambda bytes: bytearray_to_int(bytes[0:1]) / 100,
        unit="V",
    ),
    OBD2_PIDS.ENGINE_RUNTIME.value: OBD2Mapping(
        pid=OBD2_PIDS.ENGINE_RUNTIME.value,
        name="Engine runtime",
        format=lambda bytes: (bytearray_to_int(bytes[0:2])),
        unit="s",
    ),
    OBD2_PIDS.SUPPORTED_PIDS_21_3F.value: OBD2Mapping(
        pid=OBD2_PIDS.SUPPORTED_PIDS_21_3F.value,
        name="Supported PIDs: 21 - 3F",
        format=supported_pids_formatter(start=0x21),
    ),
    OBD2_PIDS.FUEL_TANK_LEVEL.value: OBD2Mapping(
        pid=OBD2_PIDS.FUEL_TANK_LEVEL.value,
        name="Fuel tank level",
        format=first_byte_to_percentage,
        unit="%",
    ),
    OBD2_PIDS.AIR_PRESSURE.value: OBD2Mapping(
        pid=OBD2_PIDS.AIR_PRESSURE.value,
        name="Air pressure",
        format=lambda bytes: bytearray_to_int(bytes[0:1]),
        unit="kPa",
    ),
    OBD2_PIDS.SUPPORTED_PIDS_41_5F.value: OBD2Mapping(
        pid=OBD2_PIDS.SUPPORTED_PIDS_41_5F.value,
        name="Supported PIDs: 41 - 5F",
        format=supported_pids_formatter(start=0x41),
    ),
    OBD2_PIDS.BATTERY_VOLTAGE.value: OBD2Mapping(
        pid=OBD2_PIDS.BATTERY_VOLTAGE.value,
        name="Battery voltage",
        format=lambda bytes: bytearray_to_int(bytes[0:2]) / 1000,
        unit="V",
    ),
    OBD2_PIDS.AIR_FUEL_RATIO.value: OBD2Mapping(
        pid=OBD2_PIDS.AIR_FUEL_RATIO.value,
        name="Air fuel ratio",
        format=lambda bytes: 2 * bytearray_to_int(bytes[0:2]) / 65536,
    ),
    OBD2_PIDS.AMBIENT_AIR_TEMPERATURE.value: OBD2Mapping(
        pid=OBD2_PIDS.AMBIENT_AIR_TEMPERATURE.value,
        name="Ambient air pressure",
        format=offset_first_byte_to_int(-40),
        unit="°C",
    ),
    OBD2_PIDS.THROTTLE_POSITION.value: OBD2Mapping(
        pid=OBD2_PIDS.THROTTLE_POSITION.value,
        name="Throttle position",
        format=first_byte_to_percentage,
        unit="%",
    ),
    OBD2_PIDS.ACCELERATOR_POSITION.value: OBD2Mapping(
        pid=OBD2_PIDS.ACCELERATOR_POSITION.value,
        name="Accelerator position",
        format=first_byte_to_percentage,
        unit="%",
    ),
    OBD2_PIDS.RELATIVE_ACCELERATOR_POSITION.value: OBD2Mapping(
        pid=OBD2_PIDS.RELATIVE_ACCELERATOR_POSITION.value,
        name="Relative accelerator position",
        format=first_byte_to_percentage,
        unit="%",
    ),
    OBD2_PIDS.ENGINE_OIL_TEMPERATURE.value: OBD2Mapping(
        pid=OBD2_PIDS.ENGINE_OIL_TEMPERATURE.value,
        name="Engine oil temperature",
        format=offset_first_byte_to_int(-40),
        unit="°C",
    ),
    OBD2_PIDS.ENGINE_FUEL_RATE.value: OBD2Mapping(
        pid=OBD2_PIDS.ENGINE_FUEL_RATE.value,
        name="Engine fuel rate",
        format=lambda bytes: bytearray_to_int(bytes[0:2]) / 20,
        unit="L/h",
    ),
    OBD2_PIDS.SUPPORTED_PIDS_61_7F.value: OBD2Mapping(
        pid=OBD2_PIDS.SUPPORTED_PIDS_61_7F.value,
        name="Supported PIDs: 61 - 7F",
        format=supported_pids_formatter(start=0x61),
    ),
    OBD2_PIDS.TOTAL_ENGINE_RUNTIME.value: OBD2Mapping(
        pid=OBD2_PIDS.TOTAL_ENGINE_RUNTIME.value,
        name="Total engine runtime",
        format=lambda bytes: bytearray_to_int(bytes),
        unit="s",
    ),
    OBD2_PIDS.SUPPORTED_PIDS_81_9F.value: OBD2Mapping(
        pid=OBD2_PIDS.SUPPORTED_PIDS_81_9F.value,
        name="Supported PIDs: 81 - 9F",
        format=supported_pids_formatter(start=0x81),
    ),
    OBD2_PIDS.SUPPORTED_PIDS_A1_BF.value: OBD2Mapping(
        pid=OBD2_PIDS.SUPPORTED_PIDS_A1_BF.value,
        name="Supported PIDs: A1 - BF",
        format=supported_pids_formatter(start=0xA1),
    ),
    OBD2_PIDS.GEAR_RATIO.value: OBD2Mapping(
        pid=OBD2_PIDS.GEAR_RATIO.value,
        name="Gear ratio",
        format=lambda bytes: (bytearray_to_int(bytes[2:3])) / 1000,
    ),
    OBD2_PIDS.ODOMETER.value: OBD2Mapping(
        pid=OBD2_PIDS.ODOMETER.value,
        name="Odometer",
        format=lambda bytes: bytearray_to_int(bytes) / 10,
        unit="km",
    ),
}
