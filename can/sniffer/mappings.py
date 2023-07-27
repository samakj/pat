from models.mapping import DataMapping

mappings = [
    DataMapping(name="handbrake", arbitration_id=1477, bits=(5, 6), format="bool"),
    DataMapping(name="boot open", arbitration_id=1549, bits=(0, 1), format="bool"),
    DataMapping(
        name="drivers door open", arbitration_id=1549, bits=(3, 4), format="bool"
    ),
    DataMapping(
        name="passenger door open", arbitration_id=1549, bits=(4, 5), format="bool"
    ),
    DataMapping(name="side lights on", arbitration_id=1549, bits=(5, 6), format="bool"),
    DataMapping(name="head lights on", arbitration_id=1549, bits=(6, 7), format="bool"),
    DataMapping(
        name="left indicator on", arbitration_id=1549, bits=(10, 11), format="bool"
    ),
    DataMapping(
        name="right indicator on", arbitration_id=1549, bits=(11, 12), format="bool"
    ),
]
