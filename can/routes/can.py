from fastapi import Depends, WebSocket

from sniffer.mappings import can_mappings
from models.mapping import CANMapping
from speedyapi import APIRouter
from speedyapi.websockets import Websockets

CAN_V0_ROUTER = APIRouter(prefix="/v0/can", tags=["can"])


@CAN_V0_ROUTER.get("/mappings", response_model=dict[int, CANMapping])
async def list_mappings() -> dict[int, CANMapping]:
    return can_mappings


@CAN_V0_ROUTER.websocket("/ws")
async def measurements_websocket(
    websocket: WebSocket,
    websockets: Websockets = Depends(Websockets),
) -> None:
    connection = await websockets.add_websocket(scope="can")
    await connection.listen()
