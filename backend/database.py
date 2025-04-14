from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from sqlalchemy import func
from models import Device, HomeStatus ,Member, Guest, User
from passlib.context import CryptContext

# Kết nối đến PostgreSQL
DATABASE_URL = "postgresql+asyncpg://postgres:saturn@localhost:5432/smarthome"
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


async def fetch_device_names(id: int):
    async with SessionLocal() as session:
        result = await session.execute(
            select(Device).where(Device.id == id)
        )

        ada_feed = result.scalar_one_or_none()  
        return ada_feed 

async def get_devices(ada_feed = None):
    async with SessionLocal() as session:
        
        result = await session.execute(
            select(Device)
        ) if ada_feed is None else await session.execute(
            select(Device).where(Device.ada_feed == ada_feed)
        )
        device = result.scalar_one_or_none() if ada_feed is not None else result.scalars().all()
        return device

    
async def get_ada_feeds():
    async with SessionLocal() as session:
        result = await session.execute(
            select(Device.ada_feed)
        )
        ada_feeds = result.scalars().all()
        return ada_feeds

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
    
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
async def register_user(username: str, password: str):
    async with SessionLocal() as session:
        # Kiểm tra username đã tồn tại chưa
        result = await session.execute(select(Member).where(Member.username == username))
        existing_user = result.scalar()
        if existing_user:
            return {"error": "Username already exists"}

        # Hash mật khẩu
        hashed_password = pwd_context.hash(password)

        # Tạo user mới
        user = Member(username=username, password=hashed_password)

        session.add(user)
        await session.commit()
        await session.refresh(user)  # load lại từ DB nếu cần ID hoặc thông tin khác

        return {"message": "User registered successfully", "user_id": user.id}
    
async def get_user(username: str):
    async with SessionLocal() as session:
        # Kiểm tra username và mật khẩu
        result = await session.execute(select(Member).where(Member.username == username))
        user = result.scalar_one_or_none()
        return user