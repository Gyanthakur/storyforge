from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    id: str
    name: str
    email: str

    class Config:
        orm_mode = True

User.update_forward_refs()
