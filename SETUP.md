# CineForge AI — Setup Guide

## Prerequisites
- Node.js 18+
- npm

## Local Development

### 1. Install dependencies
```bash
npm install
```

### 2. Set up environment
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Required variables:
- `DATABASE_URL` — SQLite for local dev: `file:./dev.db`
- `NEXTAUTH_SECRET` — Any random string for JWT signing
- `OPENROUTER_API_KEY` — Your OpenRouter API key

### 3. Set up database
```bash
npx prisma generate
npx prisma db push
```

### 4. Seed the database
```bash
npx prisma db seed
```

This creates:
- 3 sample films
- 10 cinematography styles (Kubrick, Tarantino, Spike Lee, etc.)
- 3 courses
- 5 community posts
- 1 demo user (demo@cineforge.ai / demo123456)

### 5. Start dev server
```bash
npm run dev
```

Visit http://localhost:3000

### 6. Sign up or use demo account
- Create a new account at /signup
- Or use: demo@cineforge.ai / demo123456

## Railway Deployment

### 1. Switch database to PostgreSQL
In `prisma/schema.prisma`, change:
```prisma
datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}
```

### 2. Set environment variables in Railway
- `DATABASE_URL` — Railway PostgreSQL connection string
- `NEXTAUTH_SECRET` — Strong random secret
- `NEXTAUTH_URL` — Your Railway domain (e.g., https://cineforge-ai.up.railway.app)
- `OPENROUTER_API_KEY` — Your OpenRouter API key
- `NEXT_PUBLIC_APP_URL` — Same as NEXTAUTH_URL

### 3. Deploy
Railway auto-deploys from GitHub. The `railway.toml` handles:
- Build with Nixpacks
- Run migrations on deploy
- Health check at `/api/health`

## Project Structure
```
src/
  app/
    (public)/        — Public pages (films, pricing, login, signup)
    (dashboard)/     — Authenticated pages with sidebar layout
    api/             — API routes
  components/        — Shared components
  lib/               — Utilities (prisma, auth, openrouter, prompts)
prisma/
  schema.prisma      — Database schema
  seed.ts            — Seed data
```

## Beta Mode
- `PAYMENTS_ACTIVE = false` — All users get Pro access
- Stripe code commented with `// ACTIVATE APRIL 1`
- Default user tier: "pro"
