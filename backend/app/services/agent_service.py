from ..db.database import db
from ..models.agent import Agent

async def create_agent(agent_data):
    new_agent = Agent(**agent_data.dict())
    result = await db.agents.insert_one(new_agent.dict())
    return {"id": str(result.inserted_id)}
