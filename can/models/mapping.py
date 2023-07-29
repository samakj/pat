from typing import Any, Callable, Optional
from pydantic import BaseModel


class CANMapping(BaseModel):
    arbitration_id: int
    name: str
    bits: tuple[int, int]
    format: Callable[[bytearray], Any]


class OBD2Mapping(BaseModel):
    pid: int
    name: str
    format: Callable[[bytearray], Any]
    unit: Optional[str] = None
