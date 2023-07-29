from fastapi import Depends, WebSocket

from speedyapi import APIRouter
from speedyapi.websockets import Websockets

BASE_V0_ROUTER = APIRouter(prefix="/v0", tags=["data"])


@BASE_V0_ROUTER.websocket("/ws")
async def data_websocket(
    websocket: WebSocket,
    websockets: Websockets = Depends(Websockets),
) -> None:
    connection = await websockets.add_websocket(scope="data")
    await connection.listen()
