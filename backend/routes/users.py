from fastapi import APIRouter, Depends, Body, HTTPException
from auth import get_current_admin , verify_token
import database as db

router = APIRouter()

@router.post("/user/register")
async def register_users(infor: dict = Body(...), username: str = Depends(get_current_admin)):
    if not infor.get('username') or not infor.get('password'):
        raise HTTPException(status_code=400, detail="Username and password are required")
    return await db.register_user(infor['username'], infor['password'])

@router.get("/user")
async def get_user(username: str = Depends(verify_token)):
    users = await db.get_all_users()
    return users

@router.delete("/user/delete/{user_id}")
async def delete_user(user_id: int, username: str = Depends(get_current_admin)):
    return await db.delete_user(user_id)
