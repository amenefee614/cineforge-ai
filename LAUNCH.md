# CineForge AI — Launch Guide

## Live URL
**https://cineforge-ai.up.railway.app**

---

## Environment Variables

| Variable | Required | Description |
|---|---|---|
| `DATABASE_URL` | Yes | SQLite path: `file:./dev.db` (auto-created at start) |
| `NEXTAUTH_SECRET` | Yes | Random string for JWT signing (generate with `openssl rand -base64 32`) |
| `NEXTAUTH_URL` | Yes | `https://cineforge-ai.up.railway.app` |
| `OPENROUTER_API_KEY` | Yes | OpenRouter API key for AI features (CineBot, Prompter, Shot List) |
| `NEXT_PUBLIC_APP_URL` | Yes | `https://cineforge-ai.up.railway.app` |
| `RESEND_API_KEY` | Optional | Resend.com API key for transactional emails. Falls back to console.log if not set. |
| `ADMIN_EMAIL` | Optional | Email of admin user. If not set, admin dashboard runs in dev mode (no auth required). |
| `STRIPE_SECRET_KEY` | Future | Stripe secret key. Set when activating payments May 1st. |
| `STRIPE_WEBHOOK_SECRET` | Future | Stripe webhook signing secret. |

---

## How to Activate Stripe on May 1st

1. Create a Stripe account and get your API keys
2. Set environment variables on Railway:
   - `STRIPE_SECRET_KEY` = your Stripe secret key
   - `STRIPE_WEBHOOK_SECRET` = your webhook signing secret
3. Create Stripe products/prices for Pro ($19/mo) and Studio ($49/mo) tiers
4. In `src/app/(dashboard)/dashboard/account/page.tsx`:
   - Uncomment the Stripe subscription management button
   - Remove the disabled upgrade button
5. In `src/app/api/auth/signup/route.ts`:
   - Uncomment the referral reward creation code (marked `// ACTIVATE WITH STRIPE`)
6. In `src/app/api/webhooks/stripe/route.ts`:
   - Update to handle subscription events and referral rewards
7. Update `PAYMENTS_ACTIVE` flag in account pages
8. Redeploy

---

## How to Set ADMIN_EMAIL for Production

1. On Railway dashboard, add environment variable:
   ```
   ADMIN_EMAIL=your-admin@email.com
   ```
2. The admin must sign up / have an account with that exact email
3. The `/admin` page will then require authentication and only allow that email
4. Redeploy for changes to take effect

---

## How to Add Real Films to the Catalog

### Option 1: Admin API (via curl/Postman)
```bash
curl -X POST https://cineforge-ai.up.railway.app/api/films \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Film Title",
    "description": "Film description",
    "genre": "Sci-Fi",
    "duration": "3:45",
    "embedUrl": "https://youtube.com/embed/VIDEO_ID",
    "thumbnailUrl": "https://...",
    "approved": true,
    "featured": false
  }'
```

### Option 2: User Submissions
1. Users submit films at `/submit` with embed URL, description, genre
2. Admin reviews at `/admin` — Approve or Reject
3. Approved films automatically appear in the Film Library

### Option 3: Database Seed
Edit `prisma/seed.ts` and run `npm run seed`

---

## Post-Launch Monitoring Checklist

- [ ] Verify homepage loads at https://cineforge-ai.up.railway.app
- [ ] Test signup flow: /signup → auto-login → /dashboard
- [ ] Test CineBot: open chat, send message, verify AI response
- [ ] Test Prompter: fill fields → Generate → verify prompt output
- [ ] Test Shot List: enter script → generate → verify breakdown
- [ ] Test Budget Calculator: adjust sliders → calculate → verify breakdown
- [ ] Test Style Library: verify styles load from database
- [ ] Test Film Library: verify film cards display (if films exist)
- [ ] Test Film Reviews: submit a rating + review on a film
- [ ] Test Referral Link: /join?ref=CODE → redirects to signup with ref stored
- [ ] Test Account Page: verify referral code, stats, tier badge
- [ ] Test Share Button: dashboard "Share CineForge AI" copies referral link
- [ ] Test Press Page: /press loads with correct info
- [ ] Test Admin Dashboard: /admin loads with stats (dev mode or with ADMIN_EMAIL)
- [ ] Verify /sitemap.xml returns 20 routes
- [ ] Verify /robots.txt blocks /api/ and /admin/
- [ ] Check Railway logs for any runtime errors
- [ ] Verify all 13 sidebar links navigate without errors
- [ ] Test mobile responsiveness on phone/tablet
- [ ] Verify beta banner appears and is dismissible
- [ ] Test community: create post, upvote, comment

---

## Architecture

- **Framework**: Next.js 14 (App Router)
- **Database**: SQLite via Prisma (ephemeral on Railway — resets each deploy)
- **Auth**: NextAuth.js with JWT + Credentials provider
- **AI**: OpenRouter API (Claude Sonnet)
- **Email**: Resend (optional, graceful fallback)
- **Hosting**: Railway (auto-deploys on push to main)
- **Repo**: github.com/amenefee614/cineforge-ai

---

## Key Routes

| Route | Type | Description |
|---|---|---|
| `/` | Public | Landing page with hero, tools, testimonials |
| `/signup` | Public | User registration |
| `/login` | Public | User login |
| `/join?ref=CODE` | Public | Referral redirect → signup |
| `/press` | Public | Press/media page |
| `/pricing` | Public | Pricing tiers |
| `/films` | Public | Public film listing |
| `/dashboard` | Auth | User studio dashboard |
| `/dashboard/account` | Auth | Account settings, referrals, usage |
| `/tools/prompter` | Auth | CODEx AI Prompter |
| `/tools/shotlist` | Auth | Script-to-Shot List |
| `/tools/budget` | Auth | Budget Calculator |
| `/tools/styles` | Auth | Cinematography Style Library |
| `/tools/character` | Auth | Character Bible Generator |
| `/tools/podcast` | Auth | Podcast Script Generator |
| `/films/watch` | Auth | Film library browser |
| `/films/watch/[id]` | Auth | Film player + reviews |
| `/courses` | Auth | Course catalog |
| `/community` | Auth | Community forum |
| `/submit` | Auth | Film submission |
| `/admin` | Admin | Admin dashboard |

---

Built by **AI Jedi Studios** | [linktr.ee/amenefee614](https://linktr.ee/amenefee614)
