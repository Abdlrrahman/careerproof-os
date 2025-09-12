# Deployment Guide — CareerProof OS

## 1. Quickstart (Zero-Setup Demo Mode)

To run CareerProof OS locally without requiring external databases or paid API keys:

```bash
# 1. Install dependencies
npm install

# 2. Run the development server
npm run dev

# 3. Open in browser
http://localhost:3000
```

The system automatically initializes an in-memory repository pre-loaded with full seed data for Abdlrrahman Shibani, enabling complete exploration of the public portfolio, interactive Proof Graph, Job-Fit Analyzer, and private Job Command Center.

---

## 2. Production Deployment (Vercel + Supabase)

### 2.1 Set Up Supabase
1. Create a new Supabase project.
2. Run the SQL schema and RLS policies from `supabase/schema.sql`.
3. Obtain your Supabase Project URL, Anon Key, and Service Role Key.

### 2.2 Configure Environment Variables in Vercel
Set the following environment variables in your Vercel project settings:

```env
NEXT_PUBLIC_SITE_URL=https://careerproof.abdlrrahman.dev
NEXT_PUBLIC_DEFAULT_LOCALE=en

# AI Providers (Optional - local heuristic engine used if omitted)
GEMINI_API_KEY=your_gemini_api_key_here
OPENAI_API_KEY=your_openai_api_key_here

# Supabase Production Database
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# Admin Authentication
ADMIN_PASSWORD=your_secure_admin_password
```

### 2.3 Deploy via Vercel CLI or GitHub Integration
```bash
vercel --prod
```

---

## 3. Custom Domain & DNS Configuration
- Add `A` record pointing to Vercel's IP `76.76.21.21`
- Add `CNAME` record pointing to `cname.vercel-dns.com`
