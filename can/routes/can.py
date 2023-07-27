from fastapi import Depends, WebSocket

from models.mapping import DataMapping
from speedyapi import APIRouter
from speedyapi.websockets import Websockets

CAN_V0_ROUTER = APIRouter(prefix="/v0/can", tags=["can"])

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


@CAN_V0_ROUTER.get("/mappings", response_model=list[DataMapping])
async def list_mappings() -> list[DataMapping]:
    return mappings


@CAN_V0_ROUTER.websocket("/ws")
async def measurements_websocket(
    websocket: WebSocket,
    websockets: Websockets = Depends(Websockets),
) -> None:
    connection = await websockets.add_websocket(scope="can")
    await connection.listen()
