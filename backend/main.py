from fastapi import FastAPI, WebSocket
from mqtt import web_socket_handler
app = FastAPI()

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    web_socket_handler.add_websocket(websocket)
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
