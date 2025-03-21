from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy import Column, Integer, String, Float, Date, func

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
    __tablename__ = "user"

    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, index=True)
    password = Column(String)
    name = Column(String)

class FaceReg(Base):
    __tablename__ = "face"
    
    id = Column(Integer, primary_key=True, index= True)
    