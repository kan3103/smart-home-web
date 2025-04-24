from fastapi import APIRouter, Body, HTTPException , Depends
import database as db
from mqtt import web_socket_handler
from auth import verify_token

router = APIRouter()

@router.post("/record")
async def add_record(record: dict = Body(...)):
    user = await db.get_member(record["username"])
    if not user:
        tempRecord = await db.add_access_record(None)
    else: 
        tempRecord = await db.add_access_record(user.id)
    if tempRecord.dangerous:
        user = await db.get_all_users()
        for u in user:
            await db.create_notification(u["id"], "Có nguời lạ trước nhà bạn")
        await sendnotification("Có nguời lạ trước nhà bạn")
    return tempRecord

@router.get("/notifications/all")
async def get_all_notifications(username: str = Depends(verify_token)):
    user = await db.get_member(username=username)
    notifications = await db.get_notifications(user.id)
    if not notifications:
        raise HTTPException(status_code=404, detail="No notifications found")
    return notifications

@router.get("/notifications/{id}")
async def watch_record(id: int, username: str = Depends(verify_token)):
    user = await db.get_member(username=username)
    record = await db.get_notification(id)
    if record.member_id != user.id:
        raise HTTPException(status_code=403, detail="You do not have permission to access this notification")
    record = await db.mark_notification_as_read(id)
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    return record

@router.post("/notification/delete")
async def delete_notifications(id: dict = Body(...),username: str = Depends(verify_token)):
    user = await db.get_member(username=username)
    record = await db.get_notification(id["noti_id"])
    if record.member_id != user.id:
        raise HTTPException(status_code = 403 , detail ="You do not have permission to access this record")
    return await db.delete_notification(id["noti_id"])


@router.get("/access")
async def get_access_records(username: str = Depends(verify_token)):
    records = await db.get_access_records()
    return records

    

async def sendnotification(message: str):
    await web_socket_handler.update("noti", message)
