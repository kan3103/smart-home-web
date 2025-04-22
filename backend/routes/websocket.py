from fastapi import WebSocket, WebSocketDisconnect
from auth import verify_token
from mqtt import web_socket_handler
from fastapi import APIRouter

router = APIRouter()


@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    token = websocket.query_params.get("token")  
    if not verify_token(token):  
        await websocket.close(code=1008)  
        return
    await websocket.accept()
    await web_socket_handler.add_websocket(websocket)
    
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received: {data}")  
    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"WebSocket error: {e}")
    finally:
        web_socket_handler.remove_websocket(websocket)