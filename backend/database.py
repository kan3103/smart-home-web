from sqlalchemy.ext.asyncio import AsyncSession, create_async_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.future import select
from sqlalchemy import func, delete
from models import Device, HomeStatus, Member, AccessRecord, Notification
from auth import hash_password
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




async def register_user(username: str, password: str, dob: str = None, level: str = None):
    async with SessionLocal() as session:
        # Kiểm tra username đã tồn tại chưa
        result = await session.execute(select(Member).where(Member.username == username))
        existing_user = result.scalar()
        if existing_user:
            return {"error": "Username already exists"}

        hashed_password = hash_password(password)

        user = Member(username=username, password=hashed_password, dob=dob, level=level)

        session.add(user)
        await session.commit()
        await session.refresh(user)  # load lại từ DB nếu cần ID hoặc thông tin khác

        return {"message": "User registered successfully", "user_id": user.id}
    
async def delete_user(user_id: int):
    async with SessionLocal() as session:
        user = await session.get(Member, user_id)
        if not user:
            return {"error": "User not found"}
        await session.delete(user)
        await session.commit()
        return {"message": "User deleted successfully"}

async def get_member(username: str):
    async with SessionLocal() as session:
        # Kiểm tra username và mật khẩu
        result = await session.execute(select(Member).where(Member.username == username))
        user = result.scalar_one_or_none()
        return user
    
async def get_all_users():
    async with SessionLocal() as session:
        stmt = select(Member.id, Member.username, Member.dob, Member.level)
        result = await session.execute(stmt)
        users = result.all()  
        
        user_dicts = [
            {"id": u.id, "username": u.username, "dob": u.dob, "level": u.level}
            for u in users
        ]
        return user_dicts
    
async def add_access_record(id: str):
    async with SessionLocal() as session:
        if not id:
            record = AccessRecord( user_id = id, dangerous = True)
            session.add(record)
            await session.commit()
            await session.refresh(record)  
        else:
            record = AccessRecord(user_id = id, dangerous = False)
            session.add(record)
            await session.commit()
        return record

async def get_access_records():
    async with SessionLocal() as session:
        result = await session.execute(
            select(
                AccessRecord.dangerous,
                AccessRecord.id,
                AccessRecord.timestamp,
                Member.username
            )
            .join(Member, AccessRecord.user_id == Member.id, isouter=True)
            .order_by(AccessRecord.timestamp.desc())
        )

        records = result.all()
        print(records)
        return [
            {
                "dangerous": r[0],
                "id": r[1],
                "timestamp": r[2],
                "username": r[3],
            }
            for r in records
        ]


async def create_notification(member_id: int, message: str):
    async with SessionLocal() as session:
        notification = Notification(member_id=member_id, message=message)
        session.add(notification)
        await session.commit()
        await session.refresh(notification)  
        return notification

async def get_notification(noti_id: int):
    async with SessionLocal() as session:
        result = await session.execute(
            select(Notification).where(Notification.id == noti_id)
        )
        notification = result.scalar_one_or_none()
        return notification
    
async def get_notifications(member_id: int):
    async with SessionLocal() as session:
        result = await session.execute(
            select(Notification).where(Notification.member_id == member_id).order_by(Notification.created_at.desc())
        )
        notifications = result.scalars().all()
        return notifications

async def delete_notification(noti_id: int):
    async with SessionLocal() as session:
        await session.execute(
            delete(Notification).where(Notification.id == noti_id)
        )
        await session.commit()
        return {"messase": "Xóa thành công"}

async def mark_notification_as_read(notification_id: int):
    async with SessionLocal() as session:
        result = await session.execute(
            select(Notification).where(Notification.id == notification_id)
        )
        notification = result.scalar_one_or_none()

        if notification:
            notification.is_read = True
            await session.commit() 
            await session.refresh(notification)  
            return notification
        return None

