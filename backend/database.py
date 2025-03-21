from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from sqlalchemy import func
from models import Device, HomeStatus

# Kết nối đến PostgreSQL
DATABASE_URL = "postgresql+asyncpg://postgres:310304@localhost:5432/smarthome"
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def fetch_device_names(id: int):
    async with SessionLocal() as session:
        result = await session.execute(
            select(Device).where(Device.id == id)
        )

        ada_feed = result.scalar_one_or_none()  
        return ada_feed 

async def get_devices():
    async with SessionLocal() as session:
        result = await session.execute(
            select(Device)
        )
        devices = result.scalars().all()
        return devices
    
    
async def get_ada_feeds():
    async with SessionLocal() as session:
        result = await session.execute(
            select(Device.ada_feed)
        )
        ada_feeds = result.scalars().all()
        return ada_feeds
# async def getmember():
#     async with SessionLocal() as session:
#         result = await session.execute(
#             select(User.username,User.name)
#         )
#         devices = result.scalars().all()
#         return devices


async def add_device(name: str, ada_feed: str, type: str):
    async with SessionLocal() as session:
        device = Device(name=name, ada_feed=ada_feed, type=type)
        device =session.add(device)
        await session.commit()
        return device

async def save_temp_humi(topic: str, message: str):
    async with SessionLocal() as session:
        result = await session.execute(
            select(HomeStatus).where(HomeStatus.timestamp == func.current_date())
        )
        home_status = result.scalar_one_or_none()
        if home_status is None:
            home_status = HomeStatus(humidity_max = float(message) if topic == "humidity" else None, humidity_min= float(message) if topic == "humidity" else None, temperature_max=float(message) if topic == "temperature" else None, temperature_min=float(message) if topic == "temperature" else None)
            home_status = session.add(home_status)
            await session.commit()
        else:
            if topic == "humidity":
                home_status.humidity_max = max(home_status.humidity_max, float(message)) if home_status.humidity_max is not None else float(message)
                home_status.humidity_min = min(home_status.humidity_min, float(message)) if home_status.humidity_min is not None else float(message)
            elif topic == "temperature":
                home_status.temperature_max = max(home_status.temperature_max, float(message)) if home_status.temperature_max is not None else float(message)
                home_status.temperature_min = min(home_status.temperature_min, float(message)) if home_status.temperature_min is not None else float(message)
            await session.commit()


    # async with SessionLocal() as session:
    #     session.add(device)
    #     await session.commit()
    #     return device
