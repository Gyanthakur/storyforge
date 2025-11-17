from pydantic import BaseModel
from typing import List

class AgentCreateSchema(BaseModel):
    agent_name: str
    capabilities: List[str]
