import asyncio
from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from models import Device, User

# Kết nối đến PostgreSQL
DATABASE_URL = "postgresql+asyncpg://postgres:310304@localhost:5432/smarthome"
engine = create_async_engine(DATABASE_URL, echo=True)
SessionLocal = sessionmaker(bind=engine, class_=AsyncSession, expire_on_commit=False)


# Base = declarative_base()

# class Device(Base):
#     __tablename__ = "device"

#     id = Column(Integer, primary_key=True, index=True)
#     name = Column(String, index=True)
#     ada_feed = Column(String)
#     status = Column(String)

async def fetch_device_names(id: int):
    async with SessionLocal() as session:
        result = await session.execute(
            select(Device.ada_feed).where(Device.id == id)
        )
        ada_feed = result.scalar_one_or_none()  # Trả về giá trị đầu tiên hoặc None
        return ada_feed  # None nếu không tìm thấy

async def getmember():
    async with SessionLocal() as session:
        result = await session.execute(
            select(User.username,User.name)
        )
        devices = result.scalars().all()
        return devices

