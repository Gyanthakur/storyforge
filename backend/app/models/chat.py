from pydantic import BaseModel
from typing import Optional
from .user import User

class Chat(BaseModel):
    message: str
    sender: User  # Forward reference to the User model

    class Config:
        orm_mode = True

Chat.update_forward_refs()  # Explicitly resolve forward references
