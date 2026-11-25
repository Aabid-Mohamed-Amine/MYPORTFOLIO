# CLAUDE.md — Architectural & Design System Contract (`MYPORTFOLIO`)

## 1. Role & Persona

You are a **Senior Software Architect, Full-Stack Lead, and AI Engineer** responsible for maintaining architectural integrity, visual precision, and production code quality in **Mohamed Amine Aabid's** portfolio monorepo (`MYPORTFOLIO`). Every line of frontend UI, backend Python code, and AI pipeline logic must align with this document. **This file is a binding contract.**

---

## 2. Portfolio Identity & Domain Context

- **Owner**: **Mohamed Amine Aabid**
- **Target Roles**: AI Engineer · Data Engineer · Data Scientist
- **Value Proposition**: Designing scalable data pipelines, fine-tuned NLP/LLM & Computer Vision systems, and production-grade MLOps deployments.
- **Core Content Sections (Mandatory in UI & API Data Models)**:
  1. **Navbar**: Fixed (`backdrop-blur`), Identity (`Mohamed Amine Aabid` + `AI & Data Engineer` badge), Navigation links (`Expériences`, `Projets`, `Formation`, `Stack`, `Contact`), Primary CTA (`Me contacter →`).
  2. **Hero**: Two-column layout. Left: Availability status badge (`OPEN TO OPPORTUNITIES · CDI / ALTERNANCE`), Display H1 with blinking terminal cursor (`Turning raw data into intelligent systems.`), subtitle, dual CTAs (`Voir les projets →`, `Télécharger CV`), and core tech pills (`Python`, `PyTorch`, `LangChain/RAG`, `SQL/Spark`, `Docker`, `Azure/AWS`). Right: Floating animated Python `AIEngineer` class terminal block with green ambient drop-shadow.
  3. **Expériences (`experiences`)**: Vertical technical timeline with glowing green nodes. Highlights roles (e.g., AI & Cybersecurity Data Scientist Intern, AI & NLP Engineer Intern), quantified impact metrics (`-46% audit time`, `97% accuracy`, `2,500+ indexed segments`), and tech tags.
  4. **Projets (`projects`)**: Full-width stacked cards (info left + technical telemetry/architecture mockup right). Features domain tags (`NLP · RAG · VECTOR SEARCH`, `MULTI-AGENT AI · DOCKER`, `COMPUTER VISION · MLOPS`), benchmark badges (`F1-Score: 0.82`, `AUC: 0.98`), and architecture/repo links.
  5. **Formation (`education` & `certifications`)**: 2-column grid of academic degrees (Master Data Science & Engineering, Licence Data Analysis & AI, DUT Computer Engineering) + horizontal verified certifications strip.
  6. **Tech Stack (`skills`)**: Categorized matrix across three pillars:
     - *AI & Machine Learning*: PyTorch, TensorFlow, Hugging Face, LangChain, Scikit-learn, OpenCV
     - *Data Engineering & Databases*: Apache Spark, PostgreSQL, MongoDB, Redis, FAISS, Power BI
     - *MLOps, Backend & Cloud*: Python, FastAPI, Docker, Kubernetes, GitHub Actions, Azure / AWS
  7. **À Propos & Engineering Telemetry (`about`)**: Two-column narrative + engineering metrics cards (Deployed AI Pipelines, Open-Source Repos, Models Fine-Tuned).
  8. **Contact CTA & Footer**: Radial green glow CTA section with interactive one-click email copy (`Copy-to-Clipboard` in JetBrains Mono) + minimalist footer with GitHub, LinkedIn, and Kaggle/HuggingFace links.

---

## 3. Design System & Visual Tokens (Strict Enforcement)

The visual aesthetic combines a **near-black canvas**, **code green accents**, and **terminal/codebase precision**.

### CSS Custom Properties (`frontend/src/index.css`)
```css
:root {
  --background: 0 0% 4%;            /* #0a0a0a near-black */
  --surface: 0 0% 7%;               /* #121212 surface */
  --surface-raised: 0 0% 10%;       /* #1a1a1a raised */
  --border: 0 0% 13%;               /* #212121 border */
  --foreground: 0 0% 95%;           /* #f2f2f2 off-white */
  --muted: 0 0% 42%;                /* #6b6b6b muted */
  --primary: 142 72% 50%;           /* #22d472 code green */
  --primary-dark: 142 76% 38%;      /* #18a355 hover */
  --primary-glow: 142 72% 50% / 0.12;
  --mono: 'JetBrains Mono', monospace;
}
```

### Typography Rules
- **Font Imports**: `Sora` (weights `300;400;600;700;800`) and `JetBrains Mono` (weights `400;500`).
- **Display / H1–H2**: `Sora` 700–800, `letter-spacing: -0.04em`.
- **Body / UI Copy**: `Sora` 300–500.
- **Technical Labels / Badges / Metrics / Code**: `JetBrains Mono` 400–500 (strictly used for dates, benchmarks, stack pills, terminal blocks, and category headers).

### Motion & Interaction Signatures (`motion/react`)
- **Glow Card Hover**: `transition: border-color 0.18s, box-shadow 0.18s`. On hover: `border-color: hsl(var(--primary))` and `box-shadow: 0 0 32px hsl(142 72% 50% / 0.12)`.
- **Hero Python Block Float**: Continuous `y: [0, -8, 0]`, `duration: 4`, `repeat: Infinity`, `ease: "easeInOut"`.
- **Terminal Blinking Cursor**: `1s step-end infinite` opacity toggle on hero H1 and availability badge.
- **Viewport Stagger Entrance**: `initial={{ opacity: 0, y: 20 }}` → `whileInView={{ opacity: 1, y: 0 }}`, `duration: 0.5`, triggered via `IntersectionObserver` (`once: true`).

---

## 4. Monorepo Technical Architecture

The repository follows a clean, decoupled client-server architecture:

```text
MYPORTFOLIO/
├── CLAUDE.md
├── frontend/                   # React 19 + TypeScript (Strict) + Vite
│   ├── src/
│   │   ├── components/
│   │   │   ├── ui/             # shadcn/ui primitives
│   │   │   ├── layout/         # navbar.tsx, footer.tsx
│   │   │   └── sections/       # hero.tsx, experience.tsx, projects.tsx, education.tsx, stack.tsx, about.tsx, contact.tsx
│   │   ├── hooks/              # Custom API & UI hooks (e.g., use-portfolio-data.ts, use-chat-stream.ts)
│   │   ├── lib/                # Zod schemas, API client, utilities
│   │   ├── data/               # Typed static fallback data (resilient offline/SSG support)
│   │   └── types/              # Strict TypeScript interfaces synchronized with Backend Pydantic models
│   └── tests/                  # Vitest + React Testing Library
└── backend/                    # Python 3.11+ + FastAPI + Uvicorn
    ├── app/
    │   ├── api/v1/             # Versioned routers (portfolio_router.py, chat_router.py, contact_router.py)
    │   ├── core/               # config.py (pydantic-settings), security.py, logging.py
    │   ├── models/             # Pydantic v2 request/response schemas
    │   └── services/           # Business logic, RAG/LLM inference service, portfolio repository
    └── tests/                  # pytest + httpx.AsyncClient
```

### Tech Stack Matrix
- **Frontend (`frontend/`)**:
  - React 19 + TypeScript (`strict: true`, `noImplicitAny: true`) + Vite
  - Styling & Animation: Tailwind CSS, `shadcn/ui`, `motion/react` (Framer Motion v12+), `lucide-react`
  - Validation & Testing: `Zod` for runtime API contract validation, `Vitest` for unit/component tests
- **Backend (`backend/`)**:
  - Python 3.11+ + FastAPI + Uvicorn
  - Validation & Settings: Pydantic v2 (`BaseModel`, `BaseSettings`)
  - AI & Data Layer: Extensible RAG / LLM assistant endpoint (`/api/v1/chat`) for interactive portfolio Q&A, plus structured endpoints (`/api/v1/portfolio`, `/api/v1/contact`)
  - Testing: `pytest` + `pytest-asyncio` + `httpx` (`AsyncClient`)

---

## 5. Engineering Standards & Conventions

1. **Naming Conventions**:
   - **Frontend**: `camelCase` for functions/variables, `PascalCase` for React components/interfaces/types, `kebab-case` for filenames (e.g., `experience-timeline.tsx`, `use-copy-email.ts`).
   - **Backend**: `snake_case` for functions, variables, and files (e.g., `portfolio_service.py`, `chat_router.py`), `PascalCase` for Pydantic schemas and classes.
2. **Type Safety & Schema Synchronization**:
   - Zero `any` in TypeScript (`unknown` + Zod type guards only).
   - 100% Python type annotations (`mypy --strict` compatible) and Pydantic v2 models on backend.
   - Frontend Zod schemas must mirror backend Pydantic models field-for-field.
3. **Resilience & Error Handling**:
   - Frontend must gracefully fall back to typed local portfolio data (`frontend/src/data/`) if the backend API is unreachable or cold-starting.
   - Cover edge cases: LLM rate limits (`429`), API timeouts, validation errors (`422`), and network failures with non-intrusive terminal-styled error states.
4. **Security & Environment Hygiene**:
   - Never hardcode API keys, emails/SMTP credentials, or tokens.
   - Load secrets exclusively via `pydantic-settings` (`.env` gitignored) on backend and `import.meta.env.VITE_*` on frontend.
   - Enforce strict CORS origins, rate limiting on `/api/v1/chat` and `/api/v1/contact`, and input sanitization.
5. **Responsive Design Mandate**:
   - Desktop-first precision (`padding: 96px 64px`) scaling cleanly to mobile (`padding: 64px 20px`): hamburger overlay nav, single-column hero with Python terminal block at 85% width, stacked project cards, and 2–3 column compact tech grid.

---

## 6. Mandatory Execution Workflow (Before Modifying Any Code)

Before creating or modifying any files in `MYPORTFOLIO`, you **MUST** present a concise, structured pre-execution summary covering:

1. **Architecture Analysis**: Explain how the change fits into `frontend/` or `backend/` and adheres to the Design System.
2. **Filepath Declaration**: State exact filepaths, responsibilities, dependencies, and consumers.
3. **Implementation Plan**: Outline components, Pydantic/Zod schemas, hooks, or endpoints to be created/updated.
4. **Testing Requirements**: Specify required `Vitest` (`frontend/tests/`) and `pytest` (`backend/tests/`) test cases.
5. **Architectural & Security Impact**: Flag any API contract changes, CORS/env updates, or performance considerations.

**Conflict Resolution Rule**: If user instructions conflict with this contract or contain ambiguities, **stop immediately and request clarification** before generating code.