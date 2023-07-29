from typing import Callable


def bytearray_to_int(bytes: bytearray, msb: str = "big") -> int:
    return int.from_bytes(bytes, msb)


def bytearray_to_float(bytes: bytearray, offset: int = 0, msb: str = "big") -> float:
    return bytearray_to_int(bytes, msb) / (10**offset)


def bytearray_to_bool(bytes: bytearray) -> bool:
    return bytearray_to_int(bytes) > 0


def bytearray_to_bit_string(bytes: bytearray, separator: str = "") -> str:
    return separator.join([format(byte, "08b") for byte in bytes])


def bytearray_to_hex_string(bytes: bytearray, separator: str = "") -> str:
    return separator.join([format(byte, "02x") for byte in bytes])


def first_byte_to_percentage(bytes: bytearray) -> float:
    return bytearray_to_int(bytes[0:1]) / 2.55


def offset_first_byte_to_int(offset: int) -> Callable[[bytearray], float]:
    def fn(bytes: bytearray) -> float:
        return bytearray_to_int(bytes[0:1]) + offset

    return fn


def supported_pids_formatter(start: int) -> Callable[[bytearray], dict[int, bool]]:
    def fn(bytes: bytearray) -> dict[int, bool]:
        pids = {}
        for no, bit in enumerate(bytearray_to_bit_string(bytes)):
            pids[start + no] = bit == "1"
        return pids

    return fn
