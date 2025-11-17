from fastapi import APIRouter
from pydantic import BaseModel
import openai  # Ensure OpenAI is properly set up
from dotenv import load_dotenv  # To load environment variables from .env file
import os  # For accessing environment variables

# Load environment variables from the .env file
load_dotenv()

# Get the OpenAI API key from the environment variables
openai.api_key = os.getenv("OPENAI_API_KEY")

# Ensure the API key is loaded
if openai.api_key is None:
    raise ValueError("OpenAI API key not found. Make sure to set it in the .env file.")

router = APIRouter()

class Question(BaseModel):
    question: str

@router.post("/ask-agent/")
async def ask_agent(question: Question):
    try:
        # Use the correct method for chat completions
        response = openai.ChatCompletion.create(
            model="gpt-4",  # You can use "gpt-4", "gpt-3.5-turbo", or "gpt-4.0" depending on availability
            messages=[{
                "role": "user",
                "content": question.question
            }]
        )

        # Get the response from OpenAI
        answer = response['choices'][0]['message']['content'].strip()

        if not answer:
            raise ValueError("No answer provided by the model.")

        return {"answer": answer}

    except Exception as e:
        return {"error": f"Error occurred: {str(e)}"}
