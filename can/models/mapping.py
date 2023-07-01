from typing import Literal, Union
from pydantic import BaseModel


class DataMapping(BaseModel):
    name: str
    arbitration_id: int
    bits: tuple[int, int]
    format: Union[Literal["binary"], Literal["hex"], Literal["int"]]
