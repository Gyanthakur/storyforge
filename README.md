# StoryForge — maestro-ai

**Multi‑agent creative studio** — Next.js frontend + FastAPI backend + MongoDB + Gemini (via ADK)

StoryForge (repo name: `maestro-ai`) is a multi‑agent system for co‑creating interactive fiction: plot, characters, world details, images and short music cues — all orchestrated by specialized agents. This README explains how the project is organized and how to run it locally and in Docker, plus notes on architecture, environment variables, and how to extend the system.

---

## Quick links

* Frontend: `frontend/` (Next.js + TypeScript + Tailwind)
* Backend: `backend/` (FastAPI + ADK + Motor for MongoDB)
* Notebooks: `notebooks/` (demo & quickstart examples)
* Infra: `infra/` (k8s / cloudrun manifests)

---

## Goals

* Demonstrate a multi‑agent orchestration pattern (sequential & parallel agents)
* Integrate tools (image/audio generation, code execution, web search) via ADK
* Provide session & long‑term memory (MongoDB Memory Bank)
* Offer observability (structured logs, QA scoring)
* Provide a reproducible demo (Next.js UI + backend API)

---

## Prerequisites

* Node.js 18+ and npm
* Python 3.10+
* Docker & Docker Compose (optional but recommended)
* MongoDB (local or cloud)
* ADK / Gemini credentials (add to `.env` as shown below)

---

## Environment variables

Create `.env` in `backend/` and `.env.local` in `frontend/`. Example keys:

**backend/.env**

```
FASTAPI_HOST=0.0.0.0
FASTAPI_PORT=8000
MONGO_URI=mongodb://localhost:27017
MONGO_DB=maestro_ai
ADK_API_KEY=your_adk_api_key_here
GEMINI_MODEL=gemini-2025-large
STORAGE_PROVIDER=s3
S3_BUCKET=storyforge-assets
LOG_LEVEL=info
```

**frontend/.env.local**

```
NEXT_PUBLIC_BACKEND_URL=http://localhost:8000
NEXT_PUBLIC_ADK_KEY=your_adk_api_key_here
```

> **Security:** Never commit real API keys or secrets. Use secrets managers for production.

---

## Local development (recommended)

### Option A — Using Docker Compose (quick)

From project root:

```bash
# Build and start backend, frontend, and a local MongoDB
docker-compose up --build
```

* Frontend: [http://localhost:3000](http://localhost:3000)
* Backend: [http://localhost:8000/docs](http://localhost:8000/docs) (FastAPI OpenAPI)

### Option B — Manual (developer workflow)

**Backend**

```bash
cd backend
python -m venv venv
source venv/bin/activate    # use venv\Scripts\activate on Windows
pip install -r requirements.txt
uvicorn app.main:app --reload --port 8000
```

**Frontend**

```bash
cd frontend
npm install
npm run dev
```

---

## Basic usage

1. Start backend and frontend.
2. Open the Next.js UI, create a new project, and submit a one‑line prompt (e.g. "A cartographer discovers a floating island").
3. The frontend will call the backend API to run the orchestrator which sequences agents: Plot → Character → World → Art & Music (parallel) → QA → Export.
4. Generated assets are stored in the configured storage (S3 or local storage adapter) and referenced in the project document in MongoDB.

---

## Project structure (high level)

```
maestro-ai/
├─ frontend/         # Next.js App Router (TSX + Tailwind)
├─ backend/          # FastAPI app + agents + services
├─ notebooks/        # demo notebooks
├─ infra/            # k8s / cloud run manifests
├─ scripts/          # helper scripts (deploy, seed)
└─ README.md
```


## Frontend structure

```
maestro-ai/
├── frontend/                # Next.js 14 App Router
│   ├── app/                 # Main application directory
│   │   ├── layout.tsx       # Global layout (used for the structure of the app)
│   │   ├── page.tsx         # Home page or landing page
│   │   ├── api/             # API routes
│   │   │   └── agent/
│   │   │       └── route.ts # API route for agent-related requests (e.g., getting agent status)
│   │   ├── styles/
│   │   │   └── globals.css  # Global styles for the application
│   │   ├── dashboard/       # Dashboard-related pages and components
│   │   │   ├── page.tsx     # Dashboard main page
│   │   │   ├── AgentUI.tsx  # Agent UI component to interact with the agent
│   │   │   └── AgentHistory.tsx # Shows past interactions with the agent
│   │   └── components/      # Reusable UI components
│   │       ├── Navbar.tsx   # Navigation bar
│   │       ├── Sidebar.tsx  # Sidebar navigation
│   │       ├── ChatBox.tsx  # Chat interface for the user
│   │       ├── Message.tsx  # Individual message component for chat
│   │       └── Loader.tsx   # Loader/Spinner component
│   ├── components/          # Additional shared components
│   │   ├── AgentSelector.tsx # Selects agents for the user to interact with
│   │   ├── InputBar.tsx     # Input bar for sending messages
│   │   └── Card.tsx         # A card component for showing agent information
│   ├── hooks/               # Custom hooks to handle logic
│   │   ├── useAgent.ts      # Hook for managing agent data and interaction
│   │   ├── useChat.ts       # Hook for managing chat interactions
│   │   └── useStore.ts      # Hook for managing state in the app
│   ├── lib/                 # Utility functions
│   │   ├── api.ts           # Handles API calls to the backend
│   │   └── config.ts        # Configuration variables for frontend
│   ├── public/              # Static files (images, favicons, etc.)
│   │   ├── logo.png         # App logo
│   │   └── favicon.ico      # Favicon for the app
│   ├── .env.local           # Local environment variables for the frontend (e.g., API URL)
│   ├── next.config.js       # Next.js configuration file
│   ├── package.json         # Frontend dependencies and scripts
│   ├── tailwind.config.js   # Tailwind CSS configuration file
│   └── tsconfig.json        # TypeScript configuration
```

## Backeend structure

```
maestro-ai/
├── backend/                 # FastAPI Backend
│   ├── app/                 # Main app folder
│   │   ├── main.py          # Entry point of the FastAPI application
│   │   ├── db/              # Database connection and models
│   │   │   ├── database.py  # MongoDB database connection setup
│   │   │   └── __init__.py  # Initialize DB module
│   │   ├── models/          # Database models for MongoDB
│   │   │   ├── user.py      # User model schema
│   │   │   ├── chat.py      # Chat model schema
│   │   │   └── agent.py     # Agent model schema (includes the agent data structure)
│   │   ├── schemas/         # Pydantic schemas for validation
│   │   │   ├── user_schema.py # Schema for user data validation
│   │   │   ├── chat_schema.py # Schema for chat data validation
│   │   │   └── agent_schema.py # Schema for agent data validation
│   │   ├── routers/         # FastAPI routers for routing API requests
│   │   │   ├── user_router.py   # Routes for user-related actions
│   │   │   ├── chat_router.py   # Routes for chat-related actions
│   │   │   └── agent_router.py  # Routes for agent-related actions
│   │   ├── agents/           # Agent logic and tools
│   │   │   ├── maestro_agent.py # The core agent logic for Maestro AI
│   │   │   ├── tool_search.py   # Tool to search through data
│   │   │   ├── tool_code_execution.py # Tool to execute code (if needed)
│   │   │   ├── tool_memory_manager.py # Memory management for agents
│   │   │   └── tool_planner.py # Tool for planning agent tasks
│   │   ├── services/         # Services to handle business logic
│   │   │   ├── agent_service.py  # Business logic for agent operations
│   │   │   ├── user_service.py   # Business logic for user operations
│   │   │   └── chat_service.py   # Business logic for chat operations
│   │   ├── utils/            # Utility functions for logging and responses
│   │   │   ├── logger.py     # Logging utility
│   │   │   ├── response.py   # Response formatting utility
│   │   │   └── constants.py  # Constants used in the project
│   ├── .env                 # Backend environment variables
│   ├── requirements.txt      # Backend dependencies
│   └── venv/                # Virtual environment for backend
```


See the repository root for the full, expanded tree.

---

## Agents & Key Components

* **Prompt Manager** — compacts context, templates prompts, and prepares inputs for agents.
* **Plot Agent** — generates outlines and pacing for chapters.
* **Character Agent** — creates and maintains character bios/voice.
* **World Agent** — designs setting rules and continuity.
* **Art Agent** — generates character/scene images via ADK tools (or external image API).
* **Music Agent** — generates short cues or selects tracks for scenes.
* **QA Agent** — runs consistency checks and produces a quality score and suggested edits.
* **Export Agent** — bundles chapters + assets into ePub/PDF or an interactive HTML export.

Each agent implements a common `Agent` interface (see `backend/app/agents/base_agent.py`) and returns a structured `AgentResult` (content, assets, score, metadata).

---

## Observability & Evaluation

* **Logging:** Structured JSON logs (timestamps, request IDs, agent names).
* **QA scoring:** The QA agent returns simple metrics (continuity issues, tone drift, character contradictions).
* **Metrics:** Endpoint `/metrics` for Prometheus (optional) or lightweight health endpoints.

---

## Tests

Run backend tests with pytest:

```bash
cd backend
pytest
```

Unit tests live in `tests/backend/` and include agent unit tests and API integration tests.

---

## Deployment

* **Cloud Run / Agent Engine:** See `infra/cloudrun/` manifests — edit environment variables and image names.
* **Kubernetes:** `infra/k8s/` contains example manifests for backend, frontend and a MongoDB deployment.
* **CI/CD:** GitHub Actions workflows in `.github/workflows/` build and publish containers.

---

## Kaggle Capstone Submission Notes

* Create a `kaggle_writeup.md` (already included) that explains the problem, agent architecture, demo steps and how we used ADK/Gemini.
* Include a public GitHub link to the repo and a short demo notebook or deployment link.
* Optional: Upload a <=3 minute video demo and add the URL to the Kaggle submission.

---

## Extending the project

* Add more specialized agents (dialogue polishing, translation, accessibility annotations).
* Add an analytics dashboard for agent performance and user edits.
* Integrate paid/enterprise image or audio providers if higher fidelity is needed.

---

## Contributing

1. Fork the repo
2. Create a feature branch
3. Write tests for new behavior
4. Open a PR with a description of changes

---

## License

This project is released under the MIT License. See `LICENSE` for details.

---

## Acknowledgements

Built as a capstone/freestyle project idea for the Agents Intensive course. Uses ADK patterns, FastAPI, Next.js, and MongoDB.

Happy building — tell me which file or module you want generated next and I’ll create it now.
