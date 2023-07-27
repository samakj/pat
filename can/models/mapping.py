from typing import Any, Callable
from pydantic import BaseModel


class DataMapping(BaseModel):
    name: str
    arbitration_id: int
    bits: tuple[int, int]
    format: Callable[[str], Any]
