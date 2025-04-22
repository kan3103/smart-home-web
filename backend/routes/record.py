from fastapi import APIRouter, Body, HTTPException
import database as db
from mqtt import web_socket_handler


router = APIRouter()

@router.post("/record")
async def add_record(record: dict = Body(...)):
    user = await db.get_member(record["username"])
    if not user:
        tempRecord = await db.add_access_record(None)
    else: 
        tempRecord = await db.add_access_record(user.id)
    if tempRecord.dangerous:
        await sendnotification("Có nguời lạ trước nhà bạn")
    return tempRecord

async def sendnotification(message: str):
    await web_socket_handler.update("noti", message)
    