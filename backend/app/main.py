# # from fastapi import FastAPI
# # from .routers import user_router, chat_router, agent_router
# # import os
# # from dotenv import load_dotenv

# # # Load environment variables
# # load_dotenv()

# # app = FastAPI()



# # # Include routers for different functionality
# # app.include_router(user_router.router)
# # app.include_router(chat_router.router)
# # app.include_router(agent_router.router)

# # @app.get("/")
# # def read_root():
# #     return {"message": "Welcome to Maestro AI!"}

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from .routers import user_router, chat_router, agent_router
# import os
# from dotenv import load_dotenv

# # Load environment variables
# load_dotenv()

# app = FastAPI()

# # CORS Middleware Configuration
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["http://localhost:3000"],  # Update this to your frontend URL (e.g., Next.js frontend)
#     allow_credentials=True,
#     allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
#     allow_headers=["*"],  # Allow all headers
# )

# # Include routers for different functionality
# app.include_router(user_router.router)
# app.include_router(chat_router.router)
# app.include_router(agent_router.router)

# @app.get("/")
# def read_root():
#     return {"message": "Welcome to Maestro AI!"}

from fastapi import FastAPI
from .routers import user_router, chat_router, agent_router
import os
from dotenv import load_dotenv
from fastapi.middleware.cors import CORSMiddleware

# Load environment variables
load_dotenv()

app = FastAPI()
# CORS Middleware Configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Update this to your frontend URL (e.g., Next.js frontend)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods (GET, POST, OPTIONS, etc.)
    allow_headers=["*"],  # Allow all headers
)

# Include routers for different functionality
app.include_router(user_router.router)
app.include_router(chat_router.router)
app.include_router(agent_router.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Maestro AI!"}
