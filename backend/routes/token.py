from fastapi import APIRouter, Depends, Body, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from datetime import timedelta
from auth import create_access_token, verify_token, verify_password, blacklist
import database as db

router = APIRouter()

@router.post("/token")
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = await db.get_member(form_data.username)
    if not user or not verify_password(form_data.password, user.password):
        raise HTTPException(status_code=400, detail="Incorrect username or password")
    access_token = create_access_token(data={"sub": form_data.username, "level": user.level}, expires_delta=timedelta(minutes=30))
    return {"access_token": access_token, "token_type": "bearer"}

@router.post("/token/revoke")
async def revoke_token(token: dict = Body(...), username: str = Depends(verify_token)):
    blacklist(token["token"])
    return {"message": "Token revoked"}
