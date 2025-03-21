import asyncio
import json
import paho.mqtt.client as mqtt
import os
from dotenv import load_dotenv
from database import save_temp_humi, get_ada_feeds , get_devices
main_loop = asyncio.get_event_loop()
# Load biến môi trường từ file .env
load_dotenv()
# Cấu hình Adafruit IO
ADAFRUIT_IO_USERNAME = os.getenv("ADAFRUIT_IO_USERNAME")
ADAFRUIT_IO_KEY = os.getenv("ADAFRUIT_IO_KEY")
ADAFRUIT_IO_FEED = ["bbc-temperature", "bbc-humidity","bbc-button","bbc_led"]

class MQTTObserver:
    async def update(self, topic: str, message: str):
        pass  

class MQTTClient:
    _instance = None

    def __init__(self, websockets):
        self.websockets = websockets
        self.feeds = {}

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
        asyncio.run_coroutine_threadsafe(
            MQTTClient._load_data(),
            main_loop
        )
        

    @staticmethod
    def _on_message(client, userdata, msg):
        message = msg.payload.decode()
        print(f"Received message: {message} from {msg.topic}") 
        asyncio.run_coroutine_threadsafe(
            MQTTClient._broadcast_message(msg.topic, message),
            main_loop
        )
        
    @classmethod
    async def _load_data(cls):
        feeds = await get_ada_feeds()
        for feed in feeds:
            cls._instance.client.subscribe(f"{ADAFRUIT_IO_USERNAME}/feeds/{feed}")
            cls._instance.client.publish(f"{ADAFRUIT_IO_USERNAME}/feeds/{feed}" + "/get", "")
            print(f"Subscribed to {feed}")
            
    @classmethod
    async def getdata(cls,topic):
        cls._instance.client.publish(f"{ADAFRUIT_IO_USERNAME}/feeds/{topic}" + "/get", "")
        print(f"Sent message: {topic} to {topic}")
        
    @classmethod
    async def _broadcast_message(cls, topic, message):
        for ws in cls._instance.websockets:
            await ws.update(topic, message)


    @classmethod
    def send_message(cls, topic, message):
        cls._instance.client.publish(f"{ADAFRUIT_IO_USERNAME}/feeds/{topic}", message)
        print(f"Sent message: {message} to {topic}")
        
# class FeedHandler:
#     def __init__(self, feed_name, mqtt_client):
#         self.feed_name = feed_name
#         self.mqtt_client = mqtt_client
#         self.mqtt_client.register_feed(feed_name, self)

#     def handle_message(self, message):
#         print(f"Feed {self.feed_name} received: {message}")

#     def send_data(self, value):
#         self.mqtt_client.publish(self.feed_name, value)
        
        

        
class WebSocketHandler(MQTTObserver):
    websockets = set()
    _last_message = ["0", "0"]

    async def add_websocket(self, websocket):
        self.websockets.add(websocket)
        try:
            await MQTTClient._load_data()
            # Gửi dữ liệu cũ về client khi mới kết nối
            # await self.update("temperature", self._last_message[0])
            # await self.update("humidity", self._last_message[1])
        except Exception as e:
            print(f"Error when adding websocket: {e}")

    def remove_websocket(self, websocket):
        self.websockets.remove(websocket)

    async def update(self, topic: str, message: str):
        topic = topic.split("-")[-1]
        data = {}
        if topic == "temperature":
            self._last_message[0] = message
            data = {"topic": topic, "message": message}
        elif topic == "humidity":
            self._last_message[1] = message
            data = {"topic": topic, "message": message}
        else:
            data = await get_devices('bbc-'+topic)
            data = {"topic": topic, "value": message, "name": data.name, "type": data.type, "id": data.id}
            print(data)
            
        
        
        data = json.dumps(data)
        for websocket in self.websockets:
            await websocket.send_text(data) 
        print(f"[WebSocket] Sent {topic}: {message} to frontend.")

class DatabaseHandler(MQTTObserver):
    async def update(self, topic: str, message: str):
        topic = topic.split("-")[-1]
        if topic == "temperature" or topic == "humidity":
            await save_temp_humi(topic, message)
            print(f"[Database] Saved {topic}: {message} to database.")
        elif topic == "face":
            pass
        

web_socket_handler = WebSocketHandler()
mqtt_client = MQTTClient([web_socket_handler, DatabaseHandler()])


