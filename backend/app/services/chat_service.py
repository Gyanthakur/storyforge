from ..db.database import db
from ..models.chat import Chat

async def create_chat(chat_data):
    new_chat = Chat(**chat_data.dict())
    result = await db.chats.insert_one(new_chat.dict())
    return {"id": str(result.inserted_id)}
