from fastapi import APIRouter
from ..schemas.user_schema import UserCreateSchema, UserUpdateSchema
from ..services.user_service import create_user, update_user, get_users

router = APIRouter()

@router.post("/users/")
async def create_new_user(user: UserCreateSchema):
    return await create_user(user)

@router.put("/users/{user_id}")
async def update_existing_user(user_id: str, user: UserUpdateSchema):
    return await update_user(user_id, user)

@router.get("/users/")
async def list_users():
    return await get_users()
