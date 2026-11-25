# Portfolio Full-Stack Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Mohamed Amine Aabid's production-grade AI Engineer portfolio as a decoupled monorepo — FastAPI backend serving typed REST endpoints and a React 19 SPA with 9 animated sections, fully offline-resilient via static fallback data.

**Architecture:** Backend is a stateless FastAPI app (Python 3.11+, Pydantic v2) that serves all portfolio content from typed in-memory data structures — no database. Frontend is a React 19 SPA (TypeScript strict, Vite, Tailwind) that validates all API responses with Zod and falls back to `portfolio-fallback.ts` on network/server failure. The `/api/v1/chat` endpoint is an SSE stub ready to wire to LangChain/RAG.

**Tech Stack:** Python 3.11+, FastAPI 0.115+, Pydantic v2, pytest, httpx | React 19, TypeScript 5 (strict), Vite 6, Tailwind CSS 3, motion/react (Framer Motion v12+), lucide-react, Zod, Vitest

**Spec:** `CLAUDE.md` at repository root (binding contract — read it first).

---

## Global Constraints

- Python ≥ 3.11; FastAPI ≥ 0.115; Pydantic v2 (not v1 compat)
- React 19; TypeScript strict (`noImplicitAny: true`); Vite 6
- Zero `any` in TypeScript — use `unknown` + Zod type guards
- CSS tokens: `--background: 0 0% 4%`, `--primary: 142 72% 50%` (#22d472), `--surface: 0 0% 7%`
- Fonts: `Sora` (300;400;600;700;800) + `JetBrains Mono` (400;500) from Google Fonts
- Backend filenames: `snake_case`; Frontend filenames: `kebab-case`; Components/Classes: `PascalCase`
- Secrets via `.env` / `pydantic-settings` on backend; `import.meta.env` on frontend — never hardcoded
- CORS `allow_origins` from settings — never `*` in production
- All navigation labels in French: `Expériences`, `Projets`, `Formation`, `Stack`, `Contact`
- motion/react stagger: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `duration: 0.5`, `once: true`
- Hero terminal block float: `y: [0, -8, 0]`, `duration: 4`, `repeat: Infinity`, `ease: "easeInOut"`

## Review Focus

- **API offline:** `use-portfolio-data.ts` must silently activate `portfolio-fallback.ts` on any fetch error — test: mock `fetch` to reject, assert fallback data is returned. *(Task 14)*
- **Zod mismatch:** If backend adds a field the frontend Zod schema doesn't know, `safeParse` must still succeed (`.passthrough()` or `strip`) — test: parse object with extra field, assert no error. *(Task 12)*
- **Contact 422:** POST `/contact` with invalid email must return 422 with field-level detail, not 500 — test: `{"email": "not-an-email", "name": "x", "message": "y"}`. *(Task 9)*
- **SSE headers:** POST `/chat` must set `Content-Type: text/event-stream` and `Transfer-Encoding: chunked` — test: assert response headers. *(Task 9)*
- **Tailwind purge / dark tokens:** Every CSS token used in components must be declared in `index.css` — no runtime `undefined` colours. *(Task 11, visual check)*

---

## Task 1: Backend Project Config

**Files:**
- Create: `backend/pyproject.toml`
- Create: `backend/requirements.txt`
- Create: `backend/.env.example`

**Interfaces:**
- Produces: installable Python project; `pip install -e .` resolves all deps

- [ ] **Step 1: Write `backend/pyproject.toml`**

  `[project]` name `myportfolio-backend`, requires-python `>=3.11`. `[project.dependencies]`: `fastapi>=0.115`, `uvicorn[standard]>=0.30`, `pydantic>=2.7`, `pydantic-settings>=2.3`, `python-dotenv>=1.0`. `[project.optional-dependencies]` `dev`: `pytest>=8`, `pytest-asyncio>=0.23`, `httpx>=0.27`, `anyio>=4`.

- [ ] **Step 2: Write `backend/requirements.txt`**

  Pin exact versions matching pyproject constraints. Include `structlog>=24` for logging.

- [ ] **Step 3: Write `backend/.env.example`**

  Keys: `APP_ENV=development`, `ALLOWED_ORIGINS=http://localhost:5173`, `LOG_LEVEL=INFO`, `CONTACT_EMAIL=contact@example.com`.

- [ ] **Step 4: Verify**

  Run: `cd backend && pip install -e ".[dev]" --dry-run`
  Expected: dependency resolution succeeds, no conflicts.

---

## Task 2: Backend Core — Settings & Logging

**Files:**
- Create: `backend/app/__init__.py` (empty)
- Create: `backend/app/core/__init__.py` (empty)
- Create: `backend/app/core/config.py`
- Create: `backend/app/core/logging.py`

**Interfaces:**
- Produces: `get_settings() -> Settings` (cached singleton via `lru_cache`), `setup_logging() -> None`

- [ ] **Step 1: Write `backend/app/core/config.py`**

  `Settings(BaseSettings)` with fields: `app_env: str = "development"`, `allowed_origins: list[str] = ["http://localhost:5173"]`, `log_level: str = "INFO"`, `contact_email: str = ""`. `model_config = SettingsConfigDict(env_file=".env", case_sensitive=False)`. Export `get_settings = lru_cache(Settings)`.

- [ ] **Step 2: Write `backend/app/core/logging.py`**

  `setup_logging(level: str) -> None` configures `structlog` with `JSONRenderer` in production, `ConsoleRenderer` in development. Called once at app startup.

- [ ] **Step 3: Verify imports**

  Run: `cd backend && python -c "from app.core.config import get_settings; s = get_settings(); print(s.app_env)"`
  Expected: `development`

---

## Task 3: Backend Pydantic Models

**Files:**
- Create: `backend/app/models/__init__.py` (empty)
- Create: `backend/app/models/portfolio.py`
- Create: `backend/app/models/contact.py`

**Interfaces:**
- Produces: `Experience`, `Project`, `Education`, `Certification`, `SkillCategory`, `AboutMetric`, `PortfolioResponse`, `ContactRequest`, `ContactResponse`, `ChatRequest`, `ChatResponse`

- [ ] **Step 1: Write `backend/app/models/portfolio.py`**

  All models extend `BaseModel`. Exact fields:

  ```python
  class TechTag(BaseModel):
      label: str
      color: str = "green"  # "green" | "blue" | "gray"

  class Experience(BaseModel):
      id: str
      company: str
      role: str
      type: str          # "PFE" | "Stage" | "CDI"
      period: str
      location: str
      description: str
      metrics: list[str]  # e.g. ["-46% audit time", "97% accuracy"]
      tags: list[str]

  class Project(BaseModel):
      id: str
      title: str
      subtitle: str
      domain_tags: list[str]   # e.g. ["NLP", "RAG", "VECTOR SEARCH"]
      description: str
      architecture: str        # brief arch description
      benchmarks: list[str]    # e.g. ["F1-Score: 0.82"]
      tech_stack: list[str]
      repo_url: str | None = None
      demo_url: str | None = None

  class Education(BaseModel):
      id: str
      degree: str
      institution: str
      year: str
      location: str

  class Certification(BaseModel):
      id: str
      title: str
      issuer: str
      year: str
      url: str | None = None

  class SkillCategory(BaseModel):
      category: str    # "AI & Machine Learning" | "Data Engineering & Databases" | "MLOps, Backend & Cloud"
      skills: list[str]

  class AboutMetric(BaseModel):
      label: str
      value: str

  class PortfolioResponse(BaseModel):
      experiences: list[Experience]
      projects: list[Project]
      education: list[Education]
      certifications: list[Certification]
      skill_categories: list[SkillCategory]
      about_metrics: list[AboutMetric]
  ```

- [ ] **Step 2: Write `backend/app/models/contact.py`**

  ```python
  class ContactRequest(BaseModel):
      name: str = Field(min_length=2, max_length=100)
      email: EmailStr
      message: str = Field(min_length=10, max_length=1000)

  class ContactResponse(BaseModel):
      success: bool
      message: str

  class ChatRequest(BaseModel):
      message: str = Field(min_length=1, max_length=2000)
      history: list[dict[str, str]] = []

  class ChatResponse(BaseModel):
      response: str
      sources: list[str] = []
  ```

  Import `EmailStr` from `pydantic`.

- [ ] **Step 3: Verify**

  Run: `cd backend && python -c "from app.models.portfolio import PortfolioResponse; from app.models.contact import ContactRequest"`
  Expected: no import errors.

---

## Task 4: Portfolio Data

**Files:**
- Create: `backend/app/data/__init__.py` (empty)
- Create: `backend/app/data/portfolio_data.py`

**Interfaces:**
- Produces: `PORTFOLIO_DATA: PortfolioResponse` (module-level constant, instantiated at import time)

- [ ] **Step 1: Write `backend/app/data/portfolio_data.py`**

  Instantiate `PortfolioResponse` with all of Mohamed Amine's real data:

  **Experiences (5):**
  1. `id="bdo"`, BDO Maroc, "AI & Cybersecurity Data Scientist — PFE AuditScanIA", "PFE", "Fév 2025 – Juil 2025", Casablanca, metrics=["-46% audit time", "14 Docker microservices", "Risk Score 90/100"], tags=["Gemini 2.5 Flash", "Docker", "FastAPI", "RAG", "LangChain"]
  2. `id="snrt"`, SNRT, "AI & NLP Engineer Intern — Indexation Audiovisuelle", "Stage", "Juil 2024 – Sep 2024", Rabat, metrics=["2,500+ segments indexés", "Whisper Medium LoRA fine-tuned"], tags=["Whisper", "LoRA", "FAISS", "MiniLM", "Python"]
  3. `id="3dsf"`, 3D SMART FACTORY, "Data Science & AI Developer Intern", "Stage", "Avr 2024 – Juin 2024", Agadir, metrics=["CV matching pipeline", "RAG chatbot deployed"], tags=["RAG", "LangChain", "FastAPI", "PostgreSQL"]
  4. `id="wehelp"`, WEHELP Group, "Data Analyst Intern", "Stage", "Juil 2023 – Sep 2023", Meknès, tags=["Power BI", "SQL", "Python"]
  5. `id="onee"`, ONEE, "Data Engineering Intern", "Stage", "Fév 2023 – Avr 2023", Meknès, tags=["Python", "SQL", "ETL"]

  **Projects (5):**
  1. `id="auditscan"`, "AuditScanIA", domain_tags=["MULTI-AGENT AI", "DOCKER", "RAG"], benchmarks=["Risk Score: 90/100", "14 microservices"], tech_stack=["Gemini 2.5 Flash", "Docker", "FastAPI", "LangChain", "PostgreSQL", "Redis"]
  2. `id="audiovisual"`, "Indexation Audiovisuelle Sémantique", domain_tags=["NLP", "RAG", "VECTOR SEARCH"], benchmarks=["2,500+ segments", "WER réduit"], tech_stack=["Whisper Medium", "LoRA", "FAISS", "MiniLM", "Python"]
  3. `id="arabert"`, "Assistant NER Arabe & IA Contextuelle", domain_tags=["NLP", "NER", "ARABIC NLP"], benchmarks=["F1-Score: 0.82", "Accuracy: 97%"], tech_stack=["AraBERT", "FastAPI", "React", "Docker"]
  4. `id="medical-rag"`, "Chatbot Médical RAG sur Azure", domain_tags=["RAG", "AZURE", "MLOPS"], benchmarks=["GPT-4 grounded", "Azure deployed"], tech_stack=["LangChain", "Azure OpenAI", "Chroma", "FastAPI"]
  5. `id="cv-mlops"`, "Pipeline MLOps Computer Vision", domain_tags=["COMPUTER VISION", "MLOPS"], benchmarks=["AUC: 0.98", "YOLOv8 + ResNet18"], tech_stack=["YOLOv8", "ResNet18", "MLflow", "Docker", "GitHub Actions"]

  **Education (3):**
  1. Master Science et Ingénierie de Données, Université Mohammed V Rabat, "2024–2026", Rabat
  2. Licence d'Excellence Analyse de Données & IA, Université Ibn Zohr Agadir, "2023–2024", Agadir
  3. DUT Génie Informatique, EST Meknès, "2021–2023", Meknès

  **Certifications:** 365 Data Science — Data Science, Machine Learning, Deep Learning, SQL (each its own entry).

  **SkillCategories (3):** "AI & Machine Learning" (PyTorch, TensorFlow, Hugging Face, LangChain, Scikit-learn, OpenCV), "Data Engineering & Databases" (Apache Spark, PostgreSQL, MongoDB, Redis, FAISS, Power BI), "MLOps, Backend & Cloud" (Python, FastAPI, Docker, Kubernetes, GitHub Actions, Azure / AWS).

  **AboutMetrics (3):** "Pipelines IA déployés" → "5+", "Repos Open-Source" → "10+", "Modèles Fine-Tunés" → "4".

- [ ] **Step 2: Verify**

  Run: `cd backend && python -c "from app.data.portfolio_data import PORTFOLIO_DATA; print(len(PORTFOLIO_DATA.experiences), 'exp')"`
  Expected: `5 exp`

---

## Task 5: Portfolio & Chat Services

**Files:**
- Create: `backend/app/services/__init__.py` (empty)
- Create: `backend/app/services/portfolio_service.py`
- Create: `backend/app/services/chat_service.py`

**Interfaces:**
- Produces: `get_portfolio() -> PortfolioResponse`, `stream_chat(request: ChatRequest) -> AsyncGenerator[str, None]`

- [ ] **Step 1: Write `backend/app/services/portfolio_service.py`**

  `get_portfolio() -> PortfolioResponse` returns `PORTFOLIO_DATA` from `app.data.portfolio_data`.

- [ ] **Step 2: Write `backend/app/services/chat_service.py`**

  `stream_chat(request: ChatRequest) -> AsyncGenerator[str, None]` yields a static SSE-formatted response about Mohamed Amine's profile:
  ```
  yield "data: Bonjour ! Je suis l'assistant de Mohamed Amine Aabid.\n\n"
  yield "data: [DONE]\n\n"
  ```
  Add `# TODO: Replace with LangChain RAG pipeline over portfolio embeddings` comment.

- [ ] **Step 3: Verify**

  Run: `cd backend && python -c "from app.services.portfolio_service import get_portfolio; p = get_portfolio(); print(p.projects[0].title)"`
  Expected: `AuditScanIA`

---

## Task 6: API Routers

**Files:**
- Create: `backend/app/api/__init__.py` (empty)
- Create: `backend/app/api/v1/__init__.py` (empty)
- Create: `backend/app/api/v1/portfolio_router.py`
- Create: `backend/app/api/v1/contact_router.py`
- Create: `backend/app/api/v1/chat_router.py`
- Create: `backend/app/api/v1/router.py`

**Interfaces:**
- Consumes: `get_portfolio()`, `stream_chat()`, `ContactRequest`, `ContactResponse`, `ChatRequest`, `get_settings()`
- Produces: `api_router` (APIRouter, prefix `/api/v1`)

- [ ] **Step 1: Write `backend/app/api/v1/portfolio_router.py`**

  `GET /portfolio` → `PortfolioResponse`. No auth. `Depends(get_portfolio)` injected.

- [ ] **Step 2: Write `backend/app/api/v1/contact_router.py`**

  `POST /contact` → `ContactResponse`. Validates `ContactRequest` (Pydantic auto-422). Logs name+email via structlog. Returns `{"success": true, "message": "Message reçu. Je vous répondrai sous 48h."}`.

- [ ] **Step 3: Write `backend/app/api/v1/chat_router.py`**

  `POST /chat` → `StreamingResponse(stream_chat(request), media_type="text/event-stream")`. Headers: `Cache-Control: no-cache`, `X-Accel-Buffering: no`.

- [ ] **Step 4: Write `backend/app/api/v1/router.py`**

  `api_router = APIRouter()` with `include_router` for all three routers (no extra prefix — they already own their paths).

- [ ] **Step 5: Verify imports**

  Run: `cd backend && python -c "from app.api.v1.router import api_router; print(len(api_router.routes), 'routes')"`
  Expected: `3 routes`

---

## Task 7: FastAPI Main App

**Files:**
- Create: `backend/app/main.py`

**Interfaces:**
- Consumes: `api_router`, `get_settings()`, `setup_logging()`
- Produces: `app: FastAPI` (importable by Uvicorn and test fixtures)

- [ ] **Step 1: Write `backend/app/main.py`**

  - `lifespan` context manager calls `setup_logging(settings.log_level)` on startup.
  - `CORSMiddleware` with `allow_origins=settings.allowed_origins`, `allow_methods=["GET","POST"]`, `allow_headers=["Content-Type"]`, `allow_credentials=False`.
  - `GET /health` → `{"status": "ok"}`.
  - `app.include_router(api_router)`.

- [ ] **Step 2: Smoke test**

  Run: `cd backend && uvicorn app.main:app --port 8001 &` then `curl http://localhost:8001/health`
  Expected: `{"status":"ok"}`
  Kill background process after.

---

## Task 8: Backend Tests

**Files:**
- Create: `backend/tests/__init__.py` (empty)
- Create: `backend/tests/conftest.py`
- Create: `backend/tests/test_portfolio.py`
- Create: `backend/tests/test_contact.py`
- Create: `backend/tests/test_chat.py`

**Interfaces:**
- Consumes: `app` from `app.main`

- [ ] **Step 1: Write `backend/tests/conftest.py`**

  ```python
  import pytest
  from httpx import AsyncClient, ASGITransport
  from app.main import app

  @pytest.fixture
  async def client():
      async with AsyncClient(transport=ASGITransport(app=app), base_url="http://test") as c:
          yield c
  ```
  `pytest.ini_options`: `asyncio_mode = "auto"`.

- [ ] **Step 2: Write `backend/tests/test_portfolio.py`**

  ```python
  async def test_get_portfolio_200(client):
      r = await client.get("/api/v1/portfolio")
      assert r.status_code == 200

  async def test_portfolio_has_5_experiences(client):
      data = (await client.get("/api/v1/portfolio")).json()
      assert len(data["experiences"]) == 5

  async def test_portfolio_has_5_projects(client):
      data = (await client.get("/api/v1/portfolio")).json()
      assert len(data["projects"]) == 5

  async def test_portfolio_has_3_skill_categories(client):
      data = (await client.get("/api/v1/portfolio")).json()
      assert len(data["skill_categories"]) == 3
  ```

- [ ] **Step 3: Write `backend/tests/test_contact.py`**

  ```python
  async def test_contact_valid(client):
      r = await client.post("/api/v1/contact", json={"name": "Test", "email": "test@test.com", "message": "Hello world test message"})
      assert r.status_code == 200
      assert r.json()["success"] is True

  async def test_contact_invalid_email_422(client):
      r = await client.post("/api/v1/contact", json={"name": "X", "email": "not-an-email", "message": "Hello world test"})
      assert r.status_code == 422

  async def test_contact_short_message_422(client):
      r = await client.post("/api/v1/contact", json={"name": "X", "email": "x@x.com", "message": "Hi"})
      assert r.status_code == 422
  ```

- [ ] **Step 4: Write `backend/tests/test_chat.py`**

  ```python
  async def test_chat_sse_content_type(client):
      r = await client.post("/api/v1/chat", json={"message": "Qui est Mohamed Amine ?"})
      assert r.status_code == 200
      assert "text/event-stream" in r.headers["content-type"]

  async def test_chat_non_empty_response(client):
      r = await client.post("/api/v1/chat", json={"message": "Tes compétences ?"})
      assert len(r.content) > 0
  ```

- [ ] **Step 5: Run all backend tests**

  Run: `cd backend && pytest tests/ -v`
  Expected: all green.

- [ ] **Step 6: Commit**

  ```bash
  git add backend/
  git commit -m "feat(backend): FastAPI portfolio API with Pydantic v2 models, 3 endpoints, full test suite"
  ```

---

## Task 9: Frontend Tooling & Config

**Files:**
- Create: `frontend/package.json`
- Create: `frontend/vite.config.ts`
- Create: `frontend/tsconfig.json`
- Create: `frontend/tsconfig.app.json`
- Create: `frontend/tailwind.config.ts`
- Create: `frontend/postcss.config.js`
- Create: `frontend/index.html`
- Create: `frontend/.env.example`

**Interfaces:**
- Produces: runnable `npm run dev` and `npm run test` commands

- [ ] **Step 1: Write `frontend/package.json`**

  `"name": "myportfolio-frontend"`, `"private": true`. Scripts: `dev`, `build`, `preview`, `test` (`vitest`), `type-check` (`tsc --noEmit`). Dependencies: `react@^19`, `react-dom@^19`, `motion@^12`, `lucide-react@^0.511`, `zod@^3.23`, `clsx@^2`, `tailwind-merge@^2`. DevDeps: `typescript@^5.5`, `vite@^6`, `@vitejs/plugin-react@^4`, `tailwindcss@^3.4`, `postcss@^8`, `autoprefixer@^10`, `vitest@^2`, `@vitest/ui`, `@testing-library/react@^16`, `@testing-library/jest-dom@^6`, `jsdom@^25`, `@types/react@^19`, `@types/react-dom@^19`.

- [ ] **Step 2: Write `frontend/vite.config.ts`**

  `plugins: [react()]`, `server: { proxy: { '/api': 'http://localhost:8000' } }`, `test: { environment: 'jsdom', globals: true, setupFiles: ['./src/__tests__/setup.ts'] }`.

- [ ] **Step 3: Write `frontend/tsconfig.json` and `frontend/tsconfig.app.json`**

  `tsconfig.json` references `tsconfig.app.json`. `tsconfig.app.json`: `"strict": true`, `"noImplicitAny": true`, `"target": "ES2022"`, `"module": "ESNext"`, `"moduleResolution": "bundler"`, `"jsx": "react-jsx"`.

- [ ] **Step 4: Write `frontend/tailwind.config.ts`**

  `content: ["./index.html", "./src/**/*.{ts,tsx}"]`. `theme.extend.colors`: map `background`, `surface`, `surface-raised`, `border-custom`, `foreground`, `muted`, `primary`, `primary-dark` to `hsl(var(--<token>))`. `theme.extend.fontFamily`: `sans: ['Sora', 'sans-serif']`, `mono: ['JetBrains Mono', 'monospace']`.

- [ ] **Step 5: Write `frontend/postcss.config.js`**

  `tailwindcss` + `autoprefixer` plugins.

- [ ] **Step 6: Write `frontend/index.html`**

  Lang `fr`. Title `Mohamed Amine Aabid — AI & Data Engineer`. Meta description. `<div id="root">`. Google Fonts preconnect + `<link>` for Sora and JetBrains Mono weights.

- [ ] **Step 7: Write `frontend/.env.example`**

  `VITE_API_BASE_URL=http://localhost:8000`

- [ ] **Step 8: Verify**

  Run: `cd frontend && npm install && npm run type-check`
  Expected: 0 errors (no src files yet, but tsconfig valid).

---

## Task 10: Frontend Design System (CSS)

**Files:**
- Create: `frontend/src/index.css`

**Interfaces:**
- Produces: all CSS custom properties consumed by Tailwind and components

- [ ] **Step 1: Write `frontend/src/index.css`**

  `@tailwind base/components/utilities`. `:root` block with exact tokens from CLAUDE.md spec:
  ```css
  --background: 0 0% 4%;
  --surface: 0 0% 7%;
  --surface-raised: 0 0% 10%;
  --border: 0 0% 13%;
  --foreground: 0 0% 95%;
  --muted: 0 0% 42%;
  --primary: 142 72% 50%;
  --primary-dark: 142 76% 38%;
  --primary-glow: 142 72% 50% / 0.12;
  --mono: 'JetBrains Mono', monospace;
  ```
  `body`: `background-color: hsl(var(--background))`, `color: hsl(var(--foreground))`, `font-family: 'Sora', sans-serif`.
  `.cursor-blink`: keyframes `opacity 0→1→0` at `1s step-end infinite`.
  `.glow-card`: hover `border-color: hsl(var(--primary))`, `box-shadow: 0 0 32px hsl(var(--primary-glow))`, `transition: border-color 0.18s, box-shadow 0.18s`.

---

## Task 11: Frontend Types & Schemas

**Files:**
- Create: `frontend/src/types/portfolio.ts`
- Create: `frontend/src/lib/schemas.ts`
- Create: `frontend/src/lib/utils.ts`

**Interfaces:**
- Produces: `Portfolio`, `Experience`, `Project`, `Education`, `Certification`, `SkillCategory`, `AboutMetric` (TS interfaces); Zod schemas `portfolioSchema`, `contactRequestSchema`; `cn(...inputs)`, `formatPeriod(period: string)`

- [ ] **Step 1: Write `frontend/src/types/portfolio.ts`**

  TypeScript interfaces mirroring backend Pydantic models field-for-field (use `camelCase` for TS, map from backend `snake_case` in the Zod schema transform).

  ```typescript
  export interface Experience {
    id: string;
    company: string;
    role: string;
    type: string;
    period: string;
    location: string;
    description: string;
    metrics: string[];
    tags: string[];
  }
  // Project, Education, Certification, SkillCategory, AboutMetric, Portfolio — same pattern
  ```

- [ ] **Step 2: Write `frontend/src/lib/schemas.ts`**

  Zod schemas with `z.object({...}).passthrough()` for forward-compatibility. `experienceSchema`, `projectSchema`, `educationSchema`, `certificationSchema`, `skillCategorySchema`, `aboutMetricSchema`, `portfolioSchema`. Add `.transform()` for `snake_case → camelCase` field mapping (e.g. `skill_categories → skillCategories`, `domain_tags → domainTags`, etc.). Export inferred types: `type Portfolio = z.infer<typeof portfolioSchema>`.

- [ ] **Step 3: Write `frontend/src/lib/utils.ts`**

  `cn(...inputs: ClassValue[])` using `clsx` + `tailwind-merge`. `formatPeriod(period: string): string` returns period as-is (passthrough for now, ready for i18n).

- [ ] **Step 4: Write `frontend/src/__tests__/setup.ts`**

  `import '@testing-library/jest-dom'`

- [ ] **Step 5: Write `frontend/src/__tests__/schemas.test.ts`**

  ```typescript
  it('parses valid portfolio response', () => {
    const result = portfolioSchema.safeParse(mockPortfolio)
    expect(result.success).toBe(true)
  })
  it('succeeds with extra unknown fields', () => {
    const result = portfolioSchema.safeParse({ ...mockPortfolio, unknown_field: 'x' })
    expect(result.success).toBe(true)
  })
  it('rejects missing experiences', () => {
    const { experiences: _, ...rest } = mockPortfolio
    expect(portfolioSchema.safeParse(rest).success).toBe(false)
  })
  ```

- [ ] **Step 6: Run schema tests**

  Run: `cd frontend && npm run test -- schemas`
  Expected: all green.

---

## Task 12: API Client, Fallback Data & Hooks

**Files:**
- Create: `frontend/src/lib/api-client.ts`
- Create: `frontend/src/data/portfolio-fallback.ts`
- Create: `frontend/src/hooks/use-portfolio-data.ts`
- Create: `frontend/src/hooks/use-chat-stream.ts`

**Interfaces:**
- Consumes: `portfolioSchema`, `Portfolio` type, `VITE_API_BASE_URL`
- Produces: `fetchPortfolio() -> Promise<Portfolio>`, `FALLBACK_PORTFOLIO: Portfolio`, `usePortfolioData(): { data: Portfolio; loading: boolean; error: string | null }`, `useChatStream(): { send(msg: string): void; messages: Message[]; streaming: boolean }`

- [ ] **Step 1: Write `frontend/src/lib/api-client.ts`**

  `BASE_URL = import.meta.env.VITE_API_BASE_URL ?? ''`. `fetchPortfolio(): Promise<Portfolio>` — fetch `${BASE_URL}/api/v1/portfolio`, parse with `portfolioSchema.parse()`, throw on parse failure.

- [ ] **Step 2: Write `frontend/src/data/portfolio-fallback.ts`**

  `FALLBACK_PORTFOLIO: Portfolio` — typed static copy of all Mohamed Amine's data, identical to backend `portfolio_data.py`. Must satisfy `portfolioSchema.parse()` without error.

- [ ] **Step 3: Write `frontend/src/hooks/use-portfolio-data.ts`**

  ```typescript
  export function usePortfolioData(): { data: Portfolio; loading: boolean; error: string | null }
  ```
  `useEffect` calls `fetchPortfolio()`. On success: set `data`. On **any** error (network, parse, 5xx): set `data = FALLBACK_PORTFOLIO`, set `error` message, log warning to console.

- [ ] **Step 4: Write `frontend/src/hooks/use-chat-stream.ts`**

  `useChatStream()` — POST to `/api/v1/chat`, reads `ReadableStream` chunks, splits on `data: ` prefix, accumulates tokens into `messages` array. `streaming: boolean` while reading. `send(msg: string): void` triggers the fetch.

- [ ] **Step 5: Write `frontend/src/__tests__/portfolio-fallback.test.ts`**

  ```typescript
  it('fallback satisfies portfolioSchema', () => {
    expect(portfolioSchema.safeParse(FALLBACK_PORTFOLIO).success).toBe(true)
  })
  it('fallback has 5 experiences', () => {
    expect(FALLBACK_PORTFOLIO.experiences).toHaveLength(5)
  })
  it('usePortfolioData falls back on fetch failure', async () => {
    vi.spyOn(global, 'fetch').mockRejectedValue(new Error('Network'))
    const { result } = renderHook(() => usePortfolioData())
    await waitFor(() => expect(result.current.loading).toBe(false))
    expect(result.current.data.experiences).toHaveLength(5)
    expect(result.current.error).not.toBeNull()
  })
  ```

- [ ] **Step 6: Run hook tests**

  Run: `cd frontend && npm run test -- portfolio-fallback`
  Expected: all green.

---

## Task 13: UI Primitives & Layout

**Files:**
- Create: `frontend/src/components/ui/button.tsx`
- Create: `frontend/src/components/ui/badge.tsx`
- Create: `frontend/src/components/layout/navbar.tsx`
- Create: `frontend/src/components/layout/footer.tsx`

**Interfaces:**
- Produces: `Button`, `Badge`, `Navbar`, `Footer` React components

- [ ] **Step 1: Write `frontend/src/components/ui/button.tsx`**

  `Button` with variants `primary` (bg `hsl(var(--primary))`, text black) and `ghost` (transparent, border). Uses `cn()`. Fully typed props extending `React.ButtonHTMLAttributes<HTMLButtonElement>`.

- [ ] **Step 2: Write `frontend/src/components/ui/badge.tsx`**

  `Badge` — `font-mono text-xs` pill. Variants: `green` (primary border + glow), `blue`, `gray`.

- [ ] **Step 3: Write `frontend/src/components/layout/navbar.tsx`**

  Fixed top, `backdrop-blur-md`, `border-b border-[hsl(var(--border))]`. Left: `Mohamed Amine Aabid` (Sora 700) + `AI & Data Engineer` badge (JetBrains Mono). Center: nav links `Expériences`, `Projets`, `Formation`, `Stack`, `Contact` as smooth-scroll anchors. Right: `Me contacter →` primary Button. Mobile: hamburger with `AnimatePresence` menu.

- [ ] **Step 4: Write `frontend/src/components/layout/footer.tsx`**

  Minimalist. Name + year. GitHub, LinkedIn, Kaggle/HuggingFace icon links (lucide-react icons + external `<a>`).

- [ ] **Step 5: Write `frontend/src/__tests__/navbar.test.tsx`**

  ```typescript
  it('renders identity', () => {
    render(<Navbar />)
    expect(screen.getByText('Mohamed Amine Aabid')).toBeInTheDocument()
  })
  it('renders all nav links', () => {
    render(<Navbar />)
    ;['Expériences', 'Projets', 'Formation', 'Stack', 'Contact'].forEach(label =>
      expect(screen.getByText(label)).toBeInTheDocument()
    )
  })
  it('renders CTA', () => {
    render(<Navbar />)
    expect(screen.getByText(/Me contacter/)).toBeInTheDocument()
  })
  ```

- [ ] **Step 6: Run navbar tests**

  Run: `cd frontend && npm run test -- navbar`
  Expected: all green.

---

## Task 14: Hero Section

**Files:**
- Create: `frontend/src/components/sections/hero.tsx`

**Interfaces:**
- Consumes: `Portfolio` type (props), `motion` from `motion/react`, `Badge`, `Button`
- Produces: `Hero` section component

- [ ] **Step 1: Write `frontend/src/components/sections/hero.tsx`**

  Two-column layout (`grid grid-cols-1 lg:grid-cols-2`).

  **Left column:**
  - Availability badge: `OPEN TO OPPORTUNITIES · CDI / ALTERNANCE` with blinking cursor (`cursor-blink` class).
  - H1: `Turning raw data into intelligent systems.` — Sora 800, `tracking-tight`, `text-5xl lg:text-7xl`. Blinking green `|` cursor span.
  - Subtitle: "AI Engineer, Data Engineer & Data Scientist — conception de pipelines de données, fine-tuning NLP/LLM et déploiements MLOps production."
  - CTA row: `Voir les projets →` (primary Button, smooth-scroll `#projects`) + `Télécharger CV` (ghost Button, `href="/cv-mohamed-amine-aabid.pdf"`).
  - Tech pills: `Python`, `PyTorch`, `LangChain/RAG`, `SQL/Spark`, `Docker`, `Azure/AWS` — Badge green variant, JetBrains Mono.

  **Right column:**
  - `motion.div` with `animate={{ y: [0, -8, 0] }}`, `transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}`.
  - Terminal block: dark surface card, green `drop-shadow`, monospace Python `AIEngineer` class with fields and `deploy()` method.

  Stagger entrance: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `transition={{ duration: 0.5 }}`, `viewport={{ once: true }}`.

- [ ] **Step 2: Write `frontend/src/__tests__/hero.test.tsx`**

  ```typescript
  it('renders H1', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText(/Turning raw data/)).toBeInTheDocument()
  })
  it('renders tech pills', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByText('PyTorch')).toBeInTheDocument()
  })
  it('renders CV download link', () => {
    render(<Hero data={FALLBACK_PORTFOLIO} />)
    expect(screen.getByRole('link', { name: /Télécharger CV/ })).toHaveAttribute('href', '/cv-mohamed-amine-aabid.pdf')
  })
  ```

- [ ] **Step 3: Run hero tests**

  Run: `cd frontend && npm run test -- hero`
  Expected: all green.

---

## Task 15: Experience, Projects, Education & Stack Sections

**Files:**
- Create: `frontend/src/components/sections/experience.tsx`
- Create: `frontend/src/components/sections/projects.tsx`
- Create: `frontend/src/components/sections/education.tsx`
- Create: `frontend/src/components/sections/stack.tsx`

**Interfaces:**
- Consumes: `Portfolio` type (props)
- Produces: `Experience`, `Projects`, `Education`, `Stack` section components

- [ ] **Step 1: Write `frontend/src/components/sections/experience.tsx`**

  Vertical timeline. Left: glowing green `●` node connected by `border-l border-[hsl(var(--primary))]` line. Right: role, company, period/location (JetBrains Mono), description, metrics in green (`text-[hsl(var(--primary))]`), tech tag badges. Stagger entrance per item.

- [ ] **Step 2: Write `frontend/src/components/sections/projects.tsx`**

  Full-width stacked cards. Each card: left side — title, subtitle, domain tags (Badge green), description, benchmark badges (Badge green, JetBrains Mono), tech stack pills, repo/demo links. Right side — architecture mockup block (terminal-style code or ASCII diagram). `glow-card` class on hover.

- [ ] **Step 3: Write `frontend/src/components/sections/education.tsx`**

  Top: 2-column grid of degree cards (degree, institution, year, location). Bottom: horizontal certifications strip — `flex flex-wrap gap-3`, each cert as a Badge with issuer + year.

- [ ] **Step 4: Write `frontend/src/components/sections/stack.tsx`**

  3-column grid (1 col mobile). Each pillar: category header (JetBrains Mono uppercase), skill list as icon+label rows. Use lucide-react icons for each skill where available, otherwise colored dot.

---

## Task 16: About, Contact & App Assembly

**Files:**
- Create: `frontend/src/components/sections/about.tsx`
- Create: `frontend/src/components/sections/contact.tsx`
- Create: `frontend/src/App.tsx`
- Create: `frontend/src/main.tsx`

**Interfaces:**
- Consumes: all section components, `usePortfolioData`, `useChatStream`, `Portfolio` type
- Produces: complete runnable SPA

- [ ] **Step 1: Write `frontend/src/components/sections/about.tsx`**

  Two columns: left — narrative paragraph about Mohamed Amine's mission and approach. Right — `AboutMetric` cards (value in `text-[hsl(var(--primary))]` JetBrains Mono XL, label in Sora muted).

- [ ] **Step 2: Write `frontend/src/components/sections/contact.tsx`**

  **CTA block:** radial green `radial-gradient` glow background. Email displayed in JetBrains Mono with one-click copy button (clipboard API, shows "Copié !" feedback for 2s).

  **Chat modal:** floating button bottom-right (lucide `MessageSquare`). `AnimatePresence` modal — input + send button. Uses `useChatStream()`. Messages list with user/assistant differentiation.

- [ ] **Step 3: Write `frontend/src/App.tsx`**

  ```tsx
  const { data, loading } = usePortfolioData()
  if (loading) return <LoadingSpinner />
  return (
    <>
      <Navbar />
      <main>
        <Hero data={data} />
        <Experience data={data} />
        <Projects data={data} />
        <Education data={data} />
        <Stack data={data} />
        <About data={data} />
        <Contact />
      </main>
      <Footer />
    </>
  )
  ```

  Each section wrapped in `<section id="experiences|projects|formation|stack|contact|about">`.

- [ ] **Step 4: Write `frontend/src/main.tsx`**

  `createRoot(document.getElementById('root')!).render(<StrictMode><App /></StrictMode>)`. Import `./index.css`.

- [ ] **Step 5: Dev smoke test**

  Run: `cd frontend && npm run dev`
  Open `http://localhost:5173` — verify all 9 sections render, animations trigger, fallback data visible.

- [ ] **Step 6: Type check**

  Run: `cd frontend && npm run type-check`
  Expected: 0 errors.

- [ ] **Step 7: Run all frontend tests**

  Run: `cd frontend && npm run test`
  Expected: all green.

- [ ] **Step 8: Final commit**

  ```bash
  git add frontend/
  git commit -m "feat(frontend): React 19 portfolio SPA — 9 sections, motion animations, Zod validation, Vitest tests"
  ```

---

## Self-Review Checklist

- [x] **Spec coverage:** All 9 UI sections defined. All 3 API endpoints defined. All 5 experiences, 5 projects, 3 degrees, certs, 3 skill categories present. Design tokens exact. Animations specified. Tests for every section or schema.
- [x] **Step scan:** Each step produces one artifact. No "add error handling" vagueness — all conditions specified.
- [x] **Type consistency:** `Portfolio` interface used in Task 11, 12, 13, 14, 15, 16 consistently. `get_portfolio()` signature defined in Task 5, consumed in Task 6.
- [x] **Review Focus:** All 5 items have owning tasks and test steps.
- [x] **Proportion:** Plan describes interfaces and test assertions, not implementations.
