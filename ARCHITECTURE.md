# System Architecture — CareerProof OS

## 1. High-Level Architecture Overview

CareerProof OS is constructed with a modular, decoupled architecture adhering to Clean Architecture principles. It separates the presentation layer, business domain engines, storage persistence, and external AI integrations.

```
+-------------------------------------------------------------------------+
|                  Client Presentation Layer (Next.js 15 App Router)      |
|  - Radix UI & Accessible Primitives    - Motion Engine (Emil Kowalski)  |
|  - Interactive D3 / SVG Proof Graph    - RTL / LTR Bilingual Engine     |
+-------------------------------------------------------------------------+
                                    |
                                    v
+-------------------------------------------------------------------------+
|                  Core Domain Logic & Analytics Engine                   |
|  - Evidence Scoring Engine             - Deterministic Job Match Engine |
|  - Grounded Portfolio Assistant        - Application Package Generator  |
|  - Application Pipeline State Machine  - Verification Rule Validator    |
+-------------------------------------------------------------------------+
                                    |
                  +-----------------+-----------------+
                  |                                   |
                  v                                   v
+------------------------------------+  +---------------------------------+
|   Data Access & Storage Gateway    |  |       AI Provider Gateway       |
|  - Universal Repository Interface  |  |  - Google Gemini 1.5/2.0 API    |
|  - Embedded In-Memory Data Store   |  |  - OpenAI GPT-4o API            |
|  - Supabase / PostgreSQL Client    |  |  - Deterministic Offline Fallback|
+------------------------------------+  +---------------------------------+
```

---

## 2. Core Subsystems

### 2.1 Evidence-Based Skill Engine (`src/lib/skills/`)
- Computes proficiency tiers dynamically based on:
  - Total tangible evidence items (Code repositories, production deployments, degrees, certs)
  - Complexity weighting (Enterprise scale, mission-critical systems)
  - Measurable impact (efficiency metrics, user base, revenue/funding)
  - Recency & duration of use
  - Direct leadership / architecture scope
- Outputs transparent scoring cards explaining exactly why a skill is classified as `Familiar`, `Applied`, `Proven`, `Advanced`, or `Leadership`.

### 2.2 Job-Fit Analyzer & Matcher (`src/lib/matching/`)
- Tokenizes and extracts skill and role requirements from unstructured Job Descriptions.
- Computes multi-dimensional alignment:
  - Skill coverage (Verified vs. Partial vs. Missing)
  - Seniority and leadership match
  - Domain compatibility (Energy, Telecom, Banking, Gov, etc.)
  - Timezone and remote work eligibility
- Produces transparent risk assessments and recommends the optimal résumé version.

### 2.3 Grounded AI Assistant & RAG Engine (`src/lib/ai/`)
- Indexes approved public portfolio records (Projects, Experience, Skills, Credentials).
- Strictly prevents hallucination by enforcing citation constraints: every positive claim must point to an existing portfolio record ID.
- Includes defense against prompt injection (system prompt hardening + input filtering).
- Operates in offline/demo heuristic mode when no external API key is provided.

### 2.4 Data Persistence & Security (`src/lib/db/`)
- Dual-mode data repository:
  - **Embedded Mode**: In-memory / local storage with complete seed data for instant development and offline evaluation.
  - **Production Mode**: Hosted Supabase / PostgreSQL with Row-Level Security (RLS) policies protecting private dashboard data while exposing public read-only views.
