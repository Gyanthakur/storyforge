import motor.motor_asyncio
import os
from dotenv import load_dotenv

load_dotenv()  # Load environment variables

MONGO_URL = os.getenv("MONGO_URL")
client = motor.motor_asyncio.AsyncIOMotorClient(MONGO_URL)
db = client.get_database()  # Gets the default database
