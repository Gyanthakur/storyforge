from pydantic import BaseModel
from typing import Optional

class Agent(BaseModel):
    name: str
    role: str

    class Config:
        orm_mode = True

Agent.update_forward_refs()
