from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Date, func , ForeignKey , Boolean, Text, DateTime
from sqlalchemy.orm import relationship


Base = declarative_base()

class Device(Base):
    __tablename__ = "device"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(255), nullable=False)
    type = Column(String(50), nullable=False)  
    ada_feed = Column(String(100), unique=True, nullable=False)

class HomeStatus(Base):
    __tablename__ = "homestatus"

    id = Column(Integer, primary_key=True, index=True)
    timestamp = Column(Date, default=func.current_date(), index=True) 
    humidity_max = Column(Float)
    humidity_min = Column(Float)
    temperature_max = Column(Float)
    temperature_min = Column(Float)
    
class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    sex = Column(String)
    type = Column(String)  # 'member' hoặc 'guest'

    __mapper_args__ = {
        'polymorphic_identity': 'user',
        'polymorphic_on': type
    }
    access_records = relationship("AccessRecord", back_populates="user")

class Member(User):
    __tablename__ = "members"

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    username = Column(String, unique=True, index=True)
    password = Column(String)
    dob = Column(Date)
    level = Column(String, default="member") 

    __mapper_args__ = {
        'polymorphic_identity': 'member',
    }
    notifications = relationship("Notification", back_populates="user")
class Guest(User):
    __tablename__ = "guests"

    id = Column(Integer, ForeignKey('users.id'), primary_key=True)
    num_visited = Column(Integer)
    member_rel = Column(String)

    __mapper_args__ = {
        'polymorphic_identity': 'guest',
    }

class AccessRecord(Base):
    __tablename__ = "access_records"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id", ondelete="SET NULL"), nullable=True)
    timestamp = Column(DateTime, default=func.now())
    dangerous = Column(Boolean)

    user = relationship("User", back_populates="access_records")
    
class Notification(Base):
    __tablename__ = "notifications"

    id = Column(Integer, primary_key=True, index=True)
    member_id = Column(Integer, ForeignKey("members.id", ondelete="CASCADE"), nullable=False)
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=func.now())

    user = relationship("Member", back_populates="notifications")
