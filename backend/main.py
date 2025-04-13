from fastapi import FastAPI, WebSocket , Body , WebSocketDisconnect, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from fastapi.middleware.cors import CORSMiddleware
from mqtt import web_socket_handler, mqtt_client
import database as db
from datetime import timedelta
from auth import create_access_token, verify_token, hash_password,verify_password

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.websocket("/ws")
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
        await web_socket_handler.remove_websocket(websocket)
        
@app.get("/")
def read_root():
    
    return {"message": "WebSocket and MQTT server is running!"}


@app.post("/send/{device}")
async def send_data(device:int ,data: dict = Body(...), username: str = Depends(verify_token)):
    ada_feed = await db.fetch_device_names(device)
    if ada_feed is None:
        return {"message": f"Device {device} not found"}
    mqtt_client.send_message(ada_feed.ada_feed, data["value"])
    
    return {"message": f"Sent {data['value']} to {ada_feed.name}"}


@app.get("/device/",)
async def get_device(username: str = Depends(verify_token)):
    devices = await db.get_devices()
    return(devices)

@app.post("/device/")
async def add_device_new(device: dict = Body(...), username: str = Depends(verify_token)):
    await db.add_device(device["name"], device["ada_feed"], device["type"])
    # print(device)
    return {"message": f"Device added by {username}", "device": device}




@app.post("/user/register")
async def register_users(infor: dict = Body(...)):
    return  await db.register_user(infor['username'], infor['password'])

@app.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.get_user(form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": form_data.username}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}


