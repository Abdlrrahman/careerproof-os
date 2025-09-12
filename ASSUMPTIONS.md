# Engineering Assumptions & Architectural Decisions

## 1. Context & Scope
CareerProof OS is constructed as a production-grade, bilingual (English & Arabic) career operating system for Abdlrrahman Shibani. This document logs explicit professional decisions, defaults, and assumptions adopted throughout implementation.

---

## 2. Key Assumptions

### 2.1 Identity & Privacy
* **Contact & External Links**: Default placeholders for calendar and social links (`https://linkedin.com/in/abdlrrahman-shibani`, `https://github.com/abdlrrahman-shibani`, `https://calendly.com/abdlrrahman-shibani`) are configured as editable settings in the CMS and `.env` template to prevent leaking unverified personal URLs while providing realistic click targets.
* **PII Redaction**: Private addresses, personal national ID numbers, and confidential client documents are strictly excluded.
* **Confidential Case Studies**: Where client systems are confidential, synthetic realistic metrics and architectural representations are used and labeled with `Sanitized Production Data` or `Concept / In Development`.

### 2.2 Seed Data & Verification Status
* **Dynamic Skill Counts**: Calculated at runtime from published skill records; no hard-coded "100+ skills" strings exist anywhere in code.
* **Proficiency Levels**: Dynamically derived from evidence count, complexity, impact, recency, leadership scope, and verification status:
  - `Familiar`: 1 evidence item / limited context.
  - `Applied`: 1+ production or verified implementation.
  - `Proven`: 2+ independent implementations with measurable outcomes.
  - `Advanced`: 4+ enterprise implementations or core specialization.
  - `Leadership`: Directing teams, technical strategy, or organizational architectures.
* **Unverified Claims**: Measurable metrics without attached signed documentation default to `verification_required` to prevent silent misrepresentation.

### 2.3 Technology Stack & Offline-First Execution
* **Zero-Setup Demo Mode**: The platform utilizes an embedded, type-safe in-memory repository seeded with full profile, skill, project, case study, credential, and job application data. It runs out-of-the-box with `npm run dev` with zero requirement for external database instances or paid AI API keys.
* **Supabase / PostgreSQL Ready**: The data layer is decoupled via universal repository interfaces, enabling one-click migration to hosted Supabase with Row-Level Security (RLS).
* **AI Provider Fallback**: The grounded RAG assistant and Job-Fit analyzer seamlessly use a deterministic heuristic analysis engine when `GEMINI_API_KEY` or `OPENAI_API_KEY` are not set.

### 2.4 Internationalization & Layout
* **Bilingual Strategy**: English LTR (`/en` or `/`) and Arabic RTL (`/ar`) with full bidirectional styling, mirroring, and typography pairing (Geist/Inter for Latin, IBM Plex Sans Arabic/Tajawal for Arabic).
