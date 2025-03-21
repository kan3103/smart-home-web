from fastapi import FastAPI, WebSocket , Body
from mqtt import web_socket_handler, mqtt_client
from database import fetch_device_names, add_device , get_devices
app = FastAPI()


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    await web_socket_handler.add_websocket(websocket)
    try:
        while True:
            await websocket.receive_text()  
    except:
        pass
    finally:
        web_socket_handler.remove_websocket(websocket)

@app.get("/")
def read_root():
    return {"message": "WebSocket and MQTT server is running!"}


@app.post("/send/{device}")
async def send_data(device:int ,data: dict = Body(...)):
    ada_feed = await fetch_device_names(device)
    if ada_feed is None:
        return {"message": f"Device {device} not found"}
    mqtt_client.send_message("BBC_"+ada_feed.ada_feed, data["value"])
    
    return {"message": f"Sent {data['value']} to {ada_feed.name}"}

@app.get("/device/")
async def get_device():
    devices = await get_devices()
    for device in devices:
        await mqtt_client.getdata("BBC_"+device.ada_feed)
    return(devices)

@app.post("/device/")
async def add_device_new(device: dict = Body(...)):
    await add_device(device["name"], device["ada_feed"],device["type"])
    print(device)
    # await save_controlled_device(device)
    return {"message": "Device added", "device": device}






