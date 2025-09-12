# Security & Privacy Policy — CareerProof OS

## 1. Security Architecture

### 1.1 Boundary Separation
- **Public Surface (`/`, `/about`, `/skills`, `/projects`, `/proof`, `/fit`, etc.)**: Completely read-only endpoints and static pages serving only sanitized, approved, published content.
- **Private Surface (`/dashboard`, `/api/admin/*`, `/api/applications/*`)**: Protected by session token authentication and role-based permissions.

### 1.2 Confidentiality & Redaction
- Private identification numbers, personal home addresses, private mobile numbers, and confidential client assets are strictly excluded from all source code, seeds, and database models.
- Client projects under NDA use synthetic, sanitized operational data labeled `Sanitized Production Data`.

### 1.3 AI Safety & Injection Guardrails
- RAG retrieval is restricted to public approved documents.
- Prompts include system-level isolation rules preventing user prompt injection from overriding core guidelines or leaking unpublished notes.
- Rate limiting is applied to all AI and form endpoints.

---

## 2. Vulnerability Reporting
For any security or privacy findings, please file an issue or email `contact@careerproof-os.local`.
