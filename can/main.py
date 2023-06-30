from config import config
from speedyapi import SpeedyAPI
from speedyapi.websockets import WebsocketsStore
from sniffer import CANSniffer

app = SpeedyAPI()
app.config = config
app.websockets = WebsocketsStore()
app.sniffer = CANSniffer(websockets=app.websockets, logger=app.logger)


@app.on_event("startup")  # type: ignore
async def startup() -> None:
    await app.sniffer.start()


@app.on_event("shutdown")  # type: ignore
async def shutdown() -> None:
    await app.sniffer.stop()
