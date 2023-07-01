from fastapi import Depends, WebSocket

from models.mapping import DataMapping
from speedyapi import APIRouter
from speedyapi.websockets import Websockets

CAN_V0_ROUTER = APIRouter(prefix="/v0/can", tags=["can"])

mappings = [DataMapping(name="test", arbitration_id=0, bits=(1, 2), format="binary")]


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
