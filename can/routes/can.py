from fastapi import Depends, WebSocket, Request

from sniffer.mappings import can_mappings, obd2_mappings
from models.mapping import CANMapping, OBD2Mapping
from speedyapi import APIRouter
from speedyapi.websockets import Websockets

CAN_V0_ROUTER = APIRouter(prefix="/v0/can", tags=["can"])


@CAN_V0_ROUTER.get("/mappings", response_model=dict[int, CANMapping])
async def list_mappings() -> dict[int, CANMapping]:
    return can_mappings


@CAN_V0_ROUTER.get("/obd2/mappings", response_model=dict[int, OBD2Mapping])
async def list_obd2_mappings() -> dict[int, OBD2Mapping]:
    return obd2_mappings


@CAN_V0_ROUTER.get("/obd2/support", response_model=dict[int, bool])
async def list_obd2_support(request: Request) -> dict[int, bool]:
    return request.app.sniffer.supported_pids


@CAN_V0_ROUTER.websocket("/ws")
async def can_websocket(
    websocket: WebSocket,
    websockets: Websockets = Depends(Websockets),
) -> None:
    connection = await websockets.add_websocket(scope="can")
    await connection.listen()
