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
