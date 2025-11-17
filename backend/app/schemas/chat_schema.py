from pydantic import BaseModel
from typing import List

class ChatCreateSchema(BaseModel):
    user_id: str
    message: str
    responses: List[str]
