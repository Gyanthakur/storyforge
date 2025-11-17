from fastapi import APIRouter
from ..schemas.chat_schema import ChatCreateSchema
from ..services.chat_service import create_chat

router = APIRouter()

@router.post("/chats/")
async def create_chat_message(chat: ChatCreateSchema):
    return await create_chat(chat)
