from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from routes import websocket, token, devices, users, record


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(websocket.router)
app.include_router(token.router)
app.include_router(devices.router)
app.include_router(users.router)
app.include_router(record.router)