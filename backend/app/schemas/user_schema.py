from pydantic import BaseModel
from typing import Optional

class UserCreateSchema(BaseModel):
    name: str
    email: str

class UserUpdateSchema(BaseModel):
    name: Optional[str]
    email: Optional[str]
