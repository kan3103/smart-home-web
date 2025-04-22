from fastapi import APIRouter, Depends, Body
from auth import verify_token
import database as db
from mqtt import mqtt_client

router = APIRouter()

@router.post("/send/{device}")
async def send_data(device: int, data: dict = Body(...), username: str = Depends(verify_token)):
    ada_feed = await db.fetch_device_names(device)
    if ada_feed is None:
        return {"message": f"Device {device} not found"}
    mqtt_client.send_message(ada_feed.ada_feed, data["value"])
    return {"message": f"Sent {data['value']} to {ada_feed.name}"}

@router.get("/device/")
async def get_device(username: str = Depends(verify_token)):
    devices = await db.get_devices()
    return devices

@router.post("/device/")
async def add_device_new(device: dict = Body(...), username: str = Depends(verify_token)):
    await db.add_device(device["name"], device["ada_feed"], device["type"])
    return {"message": f"Device added by {username}", "device": device}
