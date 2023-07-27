from models.mapping import DataMapping


def bool_formatter(bits: str) -> bool:
    return "1" in bits


mappings = {
    1477: [
        DataMapping(
            name="handbrake", arbitration_id=1477, bits=(5, 6), format=bool_formatter
        )
    ],
    1549: [
        DataMapping(
            name="boot open", arbitration_id=1549, bits=(0, 1), format=bool_formatter
        ),
        DataMapping(
            name="drivers door open",
            arbitration_id=1549,
            bits=(3, 4),
            format=bool_formatter,
        ),
        DataMapping(
            name="passenger door open",
            arbitration_id=1549,
            bits=(4, 5),
            format=bool_formatter,
        ),
        DataMapping(
            name="side lights on",
            arbitration_id=1549,
            bits=(5, 6),
            format=bool_formatter,
        ),
        DataMapping(
            name="head lights on",
            arbitration_id=1549,
            bits=(6, 7),
            format=bool_formatter,
        ),
        DataMapping(
            name="left indicator on",
            arbitration_id=1549,
            bits=(10, 11),
            format=bool_formatter,
        ),
        DataMapping(
            name="right indicator on",
            arbitration_id=1549,
            bits=(11, 12),
            format=bool_formatter,
        ),
    ],
}
