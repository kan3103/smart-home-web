import asyncio
import json
import paho.mqtt.client as mqtt
import os
from dotenv import load_dotenv

# Load biến môi trường từ file .env
load_dotenv()
# Cấu hình Adafruit IO
ADAFRUIT_IO_USERNAME = os.getenv("ADAFRUIT_IO_USERNAME")
ADAFRUIT_IO_KEY = os.getenv("ADAFRUIT_IO_KEY")
ADAFRUIT_IO_FEED = ["bbc-temperature", "bbc-led"]

class MQTTObserver:
    async def update(self, topic: str, message: str):
        pass  

class MQTTClient:
    _instance = None

    def __init__(self, websockets):
        self.websockets = websockets

    def __new__(cls, websockets):
        if cls._instance is None:
            cls._instance = super(MQTTClient, cls).__new__(cls)
            cls._instance.client = mqtt.Client()
            cls._instance.client.username_pw_set(ADAFRUIT_IO_USERNAME, ADAFRUIT_IO_KEY)
            cls._instance.client.on_connect = cls._on_connect
            cls._instance.client.on_message = cls._on_message
            cls._instance.client.connect("io.adafruit.com", 1883, 60)
            cls._instance.client.loop_start()
            cls._instance.websockets = websockets  
        return cls._instance

    @staticmethod
    def _on_connect(client, userdata, flags, rc):
        print("Connected to Adafruit IO with result code", rc)
        for feed in ADAFRUIT_IO_FEED:
            client.subscribe(f"{ADAFRUIT_IO_USERNAME}/feeds/{feed}")
            print(f"Subscribed to {feed}")

    @staticmethod
    def _on_message(client, userdata, msg):
        message = msg.payload.decode()
        print(f"Received message: {message} from {msg.topic}")
        
        asyncio.run(MQTTClient._instance._broadcast_message(msg.topic, message))

    @classmethod
    async def _broadcast_message(cls, topic, message):
        await cls._instance.websockets.update(topic, message)

class WebSocketHandler(MQTTObserver):
    websockets = set()

    def add_websocket(self, websocket):
        self.websockets.add(websocket)

    def remove_websocket(self, websocket):
        self.websockets.remove(websocket)

    async def update(self, topic: str, message: str):
        data = {"topic": topic, "message": message}
        data = json.dumps(data)
        print(data)
        for websocket in self.websockets:
            await websocket.send_text(data) 
        print(f"[WebSocket] Sent {topic}: {message} to frontend.")

web_socket_handler = WebSocketHandler()
mqtt_client = MQTTClient(web_socket_handler)
