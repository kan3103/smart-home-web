from fastapi import FastAPI, WebSocket
from mqtt import web_socket_handler, mqtt_client
import asyncio
from pydantic import BaseModel
from database import fetch_device_names
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


class DataModel(BaseModel):
    value: str  

@app.post("/send/{device}")
async def send_data(device:int ,data:DataModel):
    ada_feed = await fetch_device_names(device)
    print(ada_feed)
    mqtt_client.send_message("BBC_"+ada_feed, data.value)
    return {"message": f"Sent {data.value} to bbc-temperature"}

@app.get("/member/")
async def get_member():
    
    return {"message": "Hello member!"}



