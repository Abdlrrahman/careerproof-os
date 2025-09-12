# Product Requirements Document (PRD) — CareerProof OS

## 1. Product Overview
**CareerProof OS** is a bilingual, evidence-driven career operating system engineered to showcase Abdlrrahman Shibani's qualifications, verified technical capabilities, and leadership track record for high-impact international remote roles.

The platform answers critical recruiter questions within **60 seconds** through dynamic role lenses, transparent evidence-based skill scoring, an interactive Proof Graph, an intelligent Job-Fit Analyzer, and a portfolio-grounded AI assistant.

It also provides a private **Job Command Center** (`/dashboard`) for opportunity tracking, application generation, interview preparation, and full content management.

---

## 2. Target Personas & Primary Objectives

### 2.1 Primary External Personas
1. **Executive Recruiter / Head of Talent**: Seeking fast (<60s) validation of seniority, role alignment, timezone overlap, and direct contact options.
2. **Engineering Director / VP of Engineering**: Reviewing architectural depth, technical stacks, system designs, leadership scope (up to 15 engineers), and code quality.
3. **Product & Program Leader**: Evaluating digital transformation, cross-functional delivery, international development programs, and business outcomes.
4. **Domain Consulting Lead (Energy, Telecom, Banking, Gov)**: Looking for specialized sector experience (e.g. GeoFusion AI, exploration analytics, municipal ERPs).

### 2.2 Primary Internal Persona
* **Abdlrrahman Shibani**: Managing active remote job pipelines, tailoring applications with zero unsupported claims, practicing STAR interview stories, analyzing search conversion rates, and administering portfolio content.

---

## 3. Brand & Positioning Guidelines
- **Primary Title**: Founder & Engineering Lead | Software, AI and Digital Transformation
- **Supporting Value Proposition**: *I build reliable technology products and lead multidisciplinary teams across AI, software engineering, telecom, energy, banking, governance, and humanitarian programs.*
- **Tone & Voice**: Intelligent, direct, technically credible, globally employable, evidence-driven, human & approachable, confident without exaggeration. No empty buzzwords ("ninja", "rockstar", "passionate guru").
- **Core Identity Rules**:
  - Languages: Arabic (Native), English (Fluent).
  - Location: Tripoli, Libya / Doha, Qatar (Targeting remote & internationally distributed teams).
  - Strict Privacy: No personal home addresses, private identification numbers, private phone numbers, or confidential client data.

---

## 4. Key Functional Features

### 4.1 Public Recruiter Experience
1. **60s / 3m / 10m Recruiter Viewing Modes**: Tailors density and depth depending on recruiter time constraints.
2. **10 Dynamic Role Lenses**:
   - AI/ML Engineer
   - Senior Full-Stack Engineer
   - Backend Engineer
   - Technical Lead
   - Engineering Manager
   - Digital Transformation Lead
   - Technical Product Manager
   - ICT/Information Systems Manager
   - Humanitarian Technology Specialist
   - Technology Consultant
   *(Reorganizes emphasis and relevant proof without fabricating experience).*
3. **Interactive Proof Graph**: Node-link visualization of connections between Skills, Projects, Roles, Achievements, and Credentials. Includes an accessible list/table alternative.
4. **Deterministic Evidence-Based Skill Engine**: Every published skill has a dynamic proficiency tier (`Familiar`, `Applied`, `Proven`, `Advanced`, `Leadership`) calculated from tangible evidence records (code, systems, roles, certifications, impact). No subjective percentage bars.
5. **Job-Fit Analyzer**: Paste any Job Description (JD) to receive an instant, evidence-backed match report with matched skills, gaps, risks, relevant projects, and recommended résumé version.
6. **"Ask My Portfolio" AI Assistant**: Grounded RAG assistant with inline citations to portfolio records, prompt injection guards, and zero hallucination.
7. **Comprehensive Résumé Center**: ATS single-column mode, visual human mode, JSON Resume export, and Print/PDF formatting for all 10 role lenses.
8. **Measurable Achievements & Verified Impact**: Metrics with explicit verification badges (`Verified`, `Verification Required`).
9. **Bilingual Support (EN & AR)**: True bidirectional layout (LTR & RTL), typography pairing, and localized formatting.

### 4.2 Private Job Command Center (`/dashboard`)
1. **Opportunity Inbox**: Multi-format import (manual, paste JD, URL, CSV) with duplicate detection.
2. **Opportunity Scoring**: Multi-factor scoring (skills, evidence, seniority, domain, remote/timezone, strategic value).
3. **11-Stage Application Pipeline**: Kanban & table views (Discovered → Reviewing → Prioritized → Preparing → Applied → Assessment → Interview → Offer → Rejected → Withdrawn → Archived).
4. **Application Studio**: Grounded generation of tailored résumés, cover letters, outreach messages, and recruiter emails with warnings for unsupported statements.
5. **Interview Room**: STAR story suggestions, technical Q&A, company research checklist, and interview reflection notes.
6. **Job Search Analytics**: Weekly application velocity, conversion funnel, lens performance, and skill gap identification.
7. **Admin Content Management & Audit Log**: Full CRUD for all profile entities, translations, settings, and change tracking.

---

## 5. Non-Functional Requirements
- **Performance**: Lighthouse Performance ≥ 90, minimal layout shift, fast initial bundle.
- **Accessibility**: WCAG 2.2 AA compliant, keyboard navigable, screen-reader friendly, `prefers-reduced-motion` respected.
- **Security**: Strict input sanitization, CSRF/Rate limiting, secure headers, prompt injection defenses, zero private credential leaks.
- **Reliability**: Zero-config local execution with rich seed data; optional cloud PostgreSQL/Supabase & AI provider API keys.
