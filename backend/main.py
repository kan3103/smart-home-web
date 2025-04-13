from fastapi import FastAPI, WebSocket , Body , WebSocketDisconnect
from mqtt import web_socket_handler, mqtt_client
from database import fetch_device_names, add_device , get_devices
app = FastAPI()
from fastapi import FastAPI, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from datetime import timedelta
from auth import create_access_token, verify_token, hash_password,verify_password

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Hoặc chỉ định frontend của bạn, ví dụ: ["http://localhost:3000"]
    allow_credentials=True,
    allow_methods=["*"],  # Cho phép tất cả các phương thức (POST, GET, OPTIONS, ...)
    allow_headers=["*"],
)


@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    # token = websocket.query_params.get("token")  # Lấy token từ query params
    # if not verify_token(token):  # Kiểm tra token
    #     await websocket.close(code=1008)  # Đóng kết nối với mã lỗi 1008 (policy violation)
    #     return
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
        await web_socket_handler.remove_websocket(websocket)
        
@app.get("/")
def read_root():
    return {"message": "WebSocket and MQTT server is running!"}


@app.post("/send/{device}")
async def send_data(device:int ,data: dict = Body(...)):
    ada_feed = await fetch_device_names(device)
    if ada_feed is None:
        return {"message": f"Device {device} not found"}
    mqtt_client.send_message(ada_feed.ada_feed, data["value"])
    
    return {"message": f"Sent {data['value']} to {ada_feed.name}"}


@app.get("/device/")
async def get_device():
    devices = await get_devices()
    # for device in devices:
    #     await mqtt_client.getdata("BBC_"+device.ada_feed)
    return(devices)

@app.post("/device/")
async def add_device_new(device: dict = Body(...)):
    await add_device(device["name"], device["ada_feed"], device["type"])
    print(device)
    # return {"message": f"Device added by {username}", "device": device}



fake_users_db = {
    "admin": {
        "username": "admin",
        "hashed_password": hash_password("admin123"),
    }
}

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = fake_users_db.get(form_data.username)
    if not user or not verify_password(form_data.password, user["hashed_password"]):
        raise HTTPException(status_code=400, detail="Incorrect username or password")

    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}


