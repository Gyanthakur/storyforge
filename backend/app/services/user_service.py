from ..db.database import db
from ..models.user import User

async def create_user(user_data):
    new_user = User(**user_data.dict())
    result = await db.users.insert_one(new_user.dict())
    return {"id": str(result.inserted_id)}

async def update_user(user_id: str, user_data):
    updated_user = await db.users.find_one_and_update(
        {"_id": user_id},
        {"$set": user_data.dict()},
        return_document=True
    )
    return updated_user

async def get_users():
    users = await db.users.find().to_list(100)
    return users
