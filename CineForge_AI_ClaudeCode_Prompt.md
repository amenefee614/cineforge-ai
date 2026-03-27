# CineForge AI — Full Claude Code Build Prompt
# Copy and paste this entire prompt into Claude Code to begin the build.
# Deploy target: Railway | AI routing: OpenRouter | Auth: NextAuth | LAUNCH MODE: Freemium Beta (Stripe activates April 1)

---

## MASTER BUILD PROMPT — NIGHT 1
### Paste this into Claude Code first

```
Build a full-stack web application called CineForge AI — an all-in-one platform for AI filmmakers. 

## TECH STACK
- Frontend: Next.js 14 (App Router)
- Backend: Next.js API routes
- Database: PostgreSQL via Railway (use Prisma ORM)
- Auth: NextAuth.js with email/password (free, no account needed)
- Payments: NONE YET — all Stripe code commented out with // ACTIVATE APRIL 1
- AI Agent: OpenRouter API (model: anthropic/claude-sonnet-4-6)
- Video hosting: Bunny.net embed URLs (iframe embeds)
- Deployment: Railway
- Styling: Tailwind CSS

## BRAND & DESIGN DIRECTION
Brand name: CineForge AI
Tagline: "Where AI Filmmakers Are Made"
Aesthetic: Dark cinematic — deep black and purple — backgrounds #0A0A0F, rich purple accents #9D6FE8, white text #F5F3FF. Think premium AI studio meets high-end film festival. Bold, editorial, NOT generic SaaS.
Font pairing: Display font = "Bebas Neue" (Google Fonts), Body = "DM Sans" (Google Fonts)
Logo: Text-based — "CINEFORGE" in Bebas Neue with a small purple (#9D6FE8) horizontal film-strip accent line underneath

## COLOR PALETTE — USE THESE EXACT HEX VALUES EVERYWHERE
--color-bg:           #0A0A0F   (page background)
--color-surface:      #12101A   (navbar, cards)
--color-surface-2:    #1E1530   (card hover, deep surfaces)
--color-purple-dark:  #4A2D8F   (borders, subtle accents)
--color-purple-mid:   #7B4FD4   (accent lines, badges)
--color-purple:       #9D6FE8   (primary CTAs, links)
--color-purple-light: #B892F5   (hover states, glows)
--color-text:         #F5F3FF   (primary white text)
--color-text-muted:   #A89EC4   (secondary text)
--color-border:       #2E1F5E   (card borders, dividers)

## LAUNCH MODE: FREEMIUM BETA (Stripe activates April 1)

IMPORTANT: We are launching in full freemium mode. Follow these rules exactly:

1. Build the tier system in the database (free/pro/studio fields still exist)
2. Give ALL registered users full access to everything during beta
3. Build the upgrade buttons, pricing page UI, and paywalls IN THE CODE but wrap all 
   access-blocking logic in a feature flag: const PAYMENTS_ACTIVE = false
4. When PAYMENTS_ACTIVE = false: all users get Pro-level access automatically
5. When PAYMENTS_ACTIVE = true (April 1): paywalls activate, Stripe processes payments
6. Comment all Stripe checkout calls with: // STRIPE CHECKOUT — ACTIVATE APRIL 1
7. Comment all Stripe webhook handlers with: // STRIPE WEBHOOK — ACTIVATE APRIL 1

## THREE SUBSCRIPTION TIERS (built now, monetized April 1)
1. Free — $0/month (default for all beta users)
2. Pro Creator — $14.99/month (// ACTIVATE APRIL 1)
3. Studio Elite — $39.99/month (// ACTIVATE APRIL 1)

## BETA ANNOUNCEMENT BANNER
Add a sitewide dismissible banner at the very top of every page (above navbar):
- Text: "CINEFORGE AI IS FREE DURING BETA — Full access for everyone until April 1st. No credit card. Ever."
- Style: purple background #9D6FE8, white bold text, centered, 44px tall
- Dismissible with X button on the right
- Store dismissed state in localStorage (key: "beta_banner_dismissed")
- Do not show again after dismissed

## SITE STRUCTURE — BUILD ALL THESE PAGES

### Public pages (no login required)
- / (Landing page with hero, features overview, pricing table, CTA)
- /films (Public film catalog — shows 6 featured films, rest blurred/locked)
- /pricing (Full pricing comparison table)
- /login and /signup (NextAuth email/password)

### Authenticated pages (login required)
- /dashboard (User home — shows their tier, quick access to all tools, CineBot widget)
- /films/watch (Full streaming library — Pro+ only, Free users see 2 films max)
- /tools/prompter (AI Jedi DS Prompter — see below)
- /tools/shotlist (Script-to-Shot List Converter — Pro+)
- /tools/budget (Production Budget Calculator — Pro+)
- /tools/styles (Cinematography Style Library — Pro+)
- /tools/character (Character Bible Generator — Studio Elite)
- /tools/podcast (Podcast Episode Dashboard — Studio Elite)
- /courses (Course library — Studio Elite)
- /community (Forums/discussion board — Free=read, Pro+=post)
- /submit (Submit your film to the catalog — Pro=1/mo, Studio=unlimited)
- /dashboard/account (Billing, upgrade, cancel)

## FEATURE SPECS — BUILD EACH ONE

---

### 1. FILM STREAMING LIBRARY (/films/watch)
- Film catalog stored in PostgreSQL: title, description, genre, duration, thumbnail_url, bunny_embed_url, featured (bool), created_at
- Free users: can watch 2 films per month (track with monthly_film_views in DB)
- Pro+: unlimited streaming
- Video player: render Bunny.net iframe embed
- Grid layout with film cards: thumbnail, title, genre badge, duration
- Filter by genre (Action, Drama, Horror, Sci-Fi, Short, Documentary)
- On film card click: if locked, show upgrade modal. If unlocked, go to /films/watch/[id]
- Seed the DB with 3 placeholder films on setup

---

### 2. AI JEDI DS PROMPTER (/tools/prompter)
This is the existing AI JEDI DS tool being natively integrated. Rebuild it exactly as follows:

**Model selector tabs (top of page):**
- Seedance 2.0 (DEFAULT — active on load)
- Kling 3.0
- Hailuo 2.3
- WAN 2.6
- Veo 3
- Runway
- Luma Ray 3

Each model tab shows a hint bar below it explaining that model's strengths.

**Seedance 2.0 specific rules baked into system prompt:**
- Formula: [Subject] + [Action/Physics] + [Camera] + [Style] + [Audio] + [CODEx tag]
- Multi-shot: use [Shot cut] markers, Global Constraints line at top
- Audio texture adjectives highly effective: muffled, echoing, crunchy, heavy bass thud
- Under 100 words per shot
- End every prompt with: "24fps, ARRI Alexa cinematic, macro shallow DOF, real physics, high visual consistency"

**Input fields:**
- Subject (text)
- Action/Physics description (text)
- Scene/Environment (text)
- Shot Size (dropdown: ECU / CU / MCU / MS / WS / LS / Aerial)
- Camera Movement (dropdown: Static / Slow push in / Pull back / Handheld / Drone descent / Dutch angle / POV / Whip pan)
- Lens (dropdown: 12mm Ultra wide / 24mm Wide / 35mm Standard / 50mm Normal / 85mm Portrait / 135mm Telephoto / Macro)
- Aperture (dropdown: f/1.4 Dreamy / f/1.8 Shallow / f/2.8 Cinematic / f/4 Balanced / f/8 Sharp)
- Color Grade (dropdown: Teal & Orange / Desaturated Noir / Warm Film / Cold Steel / Golden Hour / Raw Ungraded)
- Audio Texture (dropdown: None / Heavy bass thud / Muffled distant / Echoing reverb / Crunchy foley / Ambient hum)
- Multi-shot toggle (Single shot / Multi-shot sequence) — when Multi-shot: show storyboard direction textarea and number of shots (2-5)
- Image-to-video toggle (adds "Starting from provided reference image:" to prompt)
- Client notes / extra direction (textarea)

**Three action buttons:**
- Generate Prompt (primary — purple #9D6FE8)
- 3 Variations (secondary)
- Clear (ghost)

**Output sidebar:**
- Prompt output in copyable code box
- Model badge showing active model
- Copy button
- AI Jedi Academy CTA below output linking to https://linktr.ee/amenefee614

**System prompt sent to OpenRouter per model:**
Build a switch statement that sends model-specific system prompts. For Seedance 2.0:
"You are CODEx, the AI Jedi Studios cinematic prompt engine optimized for Seedance 2.0. Generate a prompt using this formula: [Subject] + [Action/Physics] + [Camera] + [Style] + [Audio] + [CODEx tag]. For multi-shot: use [Shot cut] markers with Global Constraints at top. Audio texture language is highly effective. Keep under 100 words per shot. End with: 24fps, ARRI Alexa cinematic, macro shallow DOF, real physics, high visual consistency. Output ONLY the prompt, no explanation, no preamble."

- Free users: 3 uses per month (track in DB)
- Pro+: unlimited

---

### 3. SCRIPT-TO-SHOT LIST CONVERTER (/tools/shotlist)
- Pro+ only
- Textarea input for script scene (max 2000 chars)
- On submit: call OpenRouter API with system prompt: "You are a professional film director's assistant. Convert the provided script scene into a detailed shot list. For each shot include: Shot #, Shot Type (ECU/CU/MS/WS/LS), Camera Movement, Subject/Action, Lens recommendation, Estimated duration, and a CODEx-style AI video prompt for that shot. Format as a clean numbered list. Be specific and cinematic."
- Display results as formatted shot cards (shot number, type badge, details, prompt in copy box)
- Export button: download as .txt file

---

### 4. PRODUCTION BUDGET CALCULATOR (/tools/budget)
- Pro+ only
- Input fields:
  - Project type (Short film / Feature / Series episode / Music video / Commercial)
  - Number of scenes (1-50 slider)
  - Primary video tool (Kling 3.0 / Hailuo / WAN 2.6 / Veo 3 / Runway / Luma Ray 3)
  - Clips per scene (1-20 slider)  
  - Need voiceover? (yes/no — adds ElevenLabs cost)
  - Need music? (yes/no — adds Suno cost)
  - Post production hours (1-40 slider)
- Cost per clip lookup table (hardcoded): Kling=$0.70, Hailuo=$0.28, WAN=$0.40, Veo=$1.20, Runway=$0.95, Luma=$0.85
- Voiceover: $0.15/min estimated, Music: $5 flat
- Post: $0 (DIY) unless user inputs hourly rate
- Output: Total estimated cost, breakdown by category, cost per finished minute, ROI estimate at $9.99 streaming
- Display as a clean summary card with a bar chart (use recharts or chart.js)

---

### 5. CINEMATOGRAPHY STYLE LIBRARY (/tools/styles)
- Pro+ only
- Database table: styles — name, director_reference, description, mood, lighting_notes, camera_notes, color_grade, sample_prompt
- Seed with 10 styles: Kubrick, Tarantino, Spike Lee, Wong Kar-wai, Christopher Nolan, Ari Aster, Denis Villeneuve, John Singleton, F. Gary Gray, Barry Jenkins
- Grid of style cards with director name, mood badge, brief description
- On click: expand to full detail panel showing all notes + a pre-built CODEx prompt for that style
- Copy prompt button on each
- Search/filter by mood (Suspense, Drama, Action, Horror, Romance, Epic)

---

### 6. CHARACTER BIBLE GENERATOR (/tools/character)
- Studio Elite only
- Input fields: Character name, Role (Protagonist/Antagonist/Supporting/Villain), Genre, Age range, Background (textarea), Special abilities or traits (textarea), Relationship to other characters (textarea)
- On submit: call OpenRouter API with system prompt: "You are a professional screenwriter and character development expert. Generate a comprehensive character bible with these sections: 1) Core Identity, 2) Physical Description (with AI image prompt), 3) Psychological Profile, 4) Backstory, 5) Voice & Speech patterns, 6) Character Arc, 7) Relationships map, 8) Visual Style Guide (wardrobe, color palette), 9) CODEx video prompt for introducing this character. Be specific, cinematic, and rich with detail."
- Display in a well-formatted document layout
- Export as .txt

---

### 7. PODCAST EPISODE DASHBOARD (/tools/podcast)
- Studio Elite only
- Input fields: Episode topic, Guest name (optional), Target audience, Tone (Educational/Entertaining/Debate/Interview/Story), Key talking points (textarea, one per line)
- On submit: call OpenRouter API with system prompt: "You are a professional podcast producer. Generate a complete podcast episode script with these segments: 1) Cold Open (hook, 30 seconds), 2) Intro Banter (60 seconds), 3) AI News segment (placeholder [INSERT NEWS]), 4) Main Topic Deep Dive (3-5 minutes), 5) Pop Culture x AI Crossover, 6) Tutorial Tease, 7) Sponsor Spot placeholder, 8) Closing with catchphrase. Format each segment with [SEGMENT NAME], estimated duration, and full dialogue/talking points. Write in a bold, street-smart, knowledgeable tone."
- Display as formatted script with segment headers
- Export as .txt

---

### 8. COURSE LIBRARY (/courses)
- Studio Elite only
- Courses table in DB: title, description, instructor, thumbnail_url, video_embed_url, duration_minutes, difficulty (Beginner/Intermediate/Advanced), category
- Course card grid with progress tracking per user (courses_progress table: user_id, course_id, completed, last_watched)
- Course detail page with video embed + lesson description
- Seed with 3 placeholder courses

---

### 9. COMMUNITY FORUM (/community)
- Posts table: id, user_id, title, body, category, created_at, upvotes
- Comments table: id, post_id, user_id, body, created_at
- Free users: read only (show "Join Pro to post" CTA)
- Pro+: can create posts and comment
- Categories: General, Showcase, Feedback, Tutorials, Collab Wanted
- Sort by: Latest, Most Upvoted, My Posts

---

### 10. FILM SUBMISSION (/submit)
- Pro+: submit 1 film per month
- Studio Elite: unlimited submissions
- Form: title, description, genre, duration, YouTube/Vimeo embed URL, thumbnail URL
- Submissions go into a pending_films table (admin must approve before appearing in catalog)
- Show user their submission history and status (Pending / Approved / Rejected)

---

### 11. CINEBOT AI AGENT (/dashboard — floating widget)
CineBot is a floating chat widget that lives on every authenticated page (bottom right corner).

UI: Purple circular button (#9D6FE8) with "CB" initials. On click: opens a slide-up chat panel (400px wide, 500px tall). Header shows "CineBot" with a small purple dot pulsing (#B892F5) (online indicator). Free users see it but get: "CineBot is available on Pro and Studio Elite plans. Upgrade to unlock your AI co-producer." Pro+ users get full access.

CineBot system prompt (send with every message):
"You are CineBot, the AI co-producer for CineForge AI — the platform for AI filmmakers. You were created by AI Jedi Studios. Your personality: bold, street-smart, deeply knowledgeable about AI filmmaking, cinematic, encouraging but real. You help users with: generating CODEx-style video prompts, building shot lists, planning productions, recommending tools and workflow, answering questions about AI filmmaking techniques, and navigating CineForge AI tools. You know the CODEx methodology: image-to-video-first, ARRI Alexa reference, single-action prompts, 24fps, macro shallow DOF, realistic physics and microexpressions. Keep responses concise and actionable. When relevant, suggest which CineForge AI tool the user should use for their task."

Call OpenRouter API (anthropic/claude-sonnet-4-6) with conversation history maintained in React state (last 10 messages).

Rate limiting: Pro = 50 CineBot messages/day, Studio Elite = unlimited. Track in DB.

---

## DATABASE SCHEMA (Prisma)
Generate a complete schema.prisma with these models:
- User (id, email, password_hash, name, tier [free/pro/studio — default: "pro" during beta], created_at)
- Film (id, title, description, genre, duration, thumbnail_url, embed_url, featured, approved, submitted_by, created_at)
- ToolUsage (id, user_id, tool_name, used_at) — for rate limiting free tier
- FilmView (id, user_id, film_id, viewed_at) — for monthly view tracking
- CinebotMessage (id, user_id, role, content, created_at)
- Post (id, user_id, title, body, category, upvotes, created_at)
- Comment (id, post_id, user_id, body, created_at)
- Style (id, name, director_reference, description, mood, lighting_notes, camera_notes, color_grade, sample_prompt)
- Course (id, title, description, instructor, thumbnail_url, embed_url, duration_minutes, difficulty, category)
- CourseProgress (id, user_id, course_id, completed, last_watched)
- FilmSubmission (id, user_id, title, description, genre, duration, embed_url, thumbnail_url, status [pending/approved/rejected], created_at)

---

## ENVIRONMENT VARIABLES NEEDED
Create a .env.example file with:
```
DATABASE_URL=
NEXTAUTH_SECRET=
NEXTAUTH_URL=
OPENROUTER_API_KEY=
NEXT_PUBLIC_APP_URL=
PAYMENTS_ACTIVE=false

# ACTIVATE APRIL 1 — uncomment when ready
# STRIPE_SECRET_KEY=
# NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
# STRIPE_PRO_PRICE_ID=
# STRIPE_STUDIO_PRICE_ID=
# STRIPE_WEBHOOK_SECRET=
```

---

## RAILWAY DEPLOYMENT CONFIG
Create a railway.toml file:
```toml
[build]
builder = "nixpacks"

[deploy]
startCommand = "npx prisma migrate deploy && npm start"
healthcheckPath = "/api/health"
healthcheckTimeout = 100
restartPolicyType = "on_failure"
```

Also create a /api/health route that returns { status: "ok" }.

---

## STRIPE WEBHOOK HANDLER
Create /api/webhooks/stripe that handles:
- checkout.session.completed → update user tier in DB
- customer.subscription.updated → update user tier
- customer.subscription.deleted → downgrade user to free

---

## TIER ACCESS MIDDLEWARE
Create a reusable checkTier(userId, requiredTier) utility that:
- Looks up user tier from DB
- Returns true/false
- Used in every API route and page to gate access
- If access denied: return { error: "upgrade_required", redirectTo: "/pricing" }

---

## UPGRADE MODAL COMPONENT
Create a reusable <UpgradeModal> component that is INACTIVE during beta (PAYMENTS_ACTIVE = false).
When PAYMENTS_ACTIVE = false: hide all upgrade modals, give everyone full access.
When PAYMENTS_ACTIVE = true (April 1): show modal with:
- What they're missing
- "Go Pro — $14.99/mo" and "Studio Elite — $39.99/mo" CTA buttons
- // STRIPE CHECKOUT — ACTIVATE APRIL 1

---

## NAVIGATION
Top navbar (dark background):
- Logo left: "CINEFORGE" in Bebas Neue
- Center links: Films | Tools | Courses | Community
- Right: User avatar + tier badge (FREE/PRO/ELITE in colored pill)

Sidebar on dashboard (collapsible):
- Dashboard
- Films
- Tools (expandable: Prompter, Shot List, Budget, Styles, Character, Podcast)
- Courses
- Community
- Submit Film
- Account

---

## LANDING PAGE HERO
Big cinematic hero section:
- Background: dark with subtle film grain texture (CSS noise)
- Headline: "FORGE YOUR FILMS WITH AI" in Bebas Neue, 72px, white
- Subhead: "The all-in-one platform for AI filmmakers. Tools, streaming, community — everything you need to produce, distribute, and grow." in DM Sans
- Two CTA buttons: "Start Free" (purple #9D6FE8) and "Watch Films" (outlined white)
- Below hero: 3-column feature highlights with purple icons (#7B4FD4)
- Pricing section with all 3 tiers
- Footer with AI Jedi Studios credit and https://linktr.ee/amenefee614

---

## SEED DATA
Create a prisma/seed.ts that populates:
- 3 sample films (use YouTube embed URLs as placeholders)
- 10 cinematography styles (Kubrick through Barry Jenkins)
- 3 sample courses
- 5 sample community posts

---

## FINAL INSTRUCTIONS FOR CLAUDE CODE
1. Build the entire project in one go — do not stop for approvals
2. Use TypeScript throughout
3. Every page must be mobile responsive
4. Every API route must validate auth via NextAuth session
5. Add loading states and error handling to all forms
6. After building, run: npm install && npx prisma generate && npx prisma db push
7. Then run: npm run dev to verify it starts
8. Output a SETUP.md file with step-by-step instructions for connecting Railway, NextAuth, and OpenRouter (Stripe added April 1)
```

---

## NIGHT 2 PROMPT (run after Night 1 is deployed)

```
The CineForge AI platform is built and deployed on Railway. Now I need you to:

1. POLISH THE UI — Review every page and upgrade the visual design:
   - Add subtle film grain CSS texture to hero and dashboard backgrounds
   - Add purple glow hover effects (#9D6FE8 at 40% opacity) to all tool cards
   - Add smooth page transition animations
   - Make the CineBot widget slide animation buttery smooth
   - Add skeleton loading states to the film grid and tool pages
   - Make the pricing page pop — add a "Most Popular" badge on Pro, feature comparison checkmarks

2. OPTIMIZE CINEBOT — Improve the agent:
   - Add suggested prompts that appear when CineBot opens ("Generate a prompt", "Build a shot list", "Estimate my budget")
   - Each suggestion auto-fills the input on click
   - Add a "CineBot is thinking..." typing indicator (3 animated dots)
   - Store last 5 conversations per user so they persist across sessions

3. ADD ADMIN DASHBOARD (/admin — protect with ADMIN_EMAIL env var):
   - View all pending film submissions with Approve/Reject buttons
   - View user count by tier (Free/Pro/Studio)
   - View total revenue (pull from Stripe dashboard link)
   - View CineBot usage stats

4. ADD SEO:
   - Add metadata to every page (title, description, og:image)
   - Create /sitemap.xml
   - Create /robots.txt

5. ADD EMAIL NOTIFICATIONS (use Resend.com API):
   - Welcome email on signup
   - "Your film was approved" email on film submission approval
   - Add RESEND_API_KEY to .env.example

After all changes: redeploy to Railway.
```

---

## NIGHT 3 PROMPT (final polish + launch prep)

```
CineForge AI is almost ready to launch. Final tasks:

1. CINEBOT TOOL INTEGRATION — Make CineBot aware of and able to USE the platform tools:
   - When a user asks CineBot to "generate a prompt", have it call the /api/tools/prompter endpoint directly and return the result in chat
   - When a user asks for a shot list, call /api/tools/shotlist and return formatted results
   - When a user asks for a budget estimate, walk them through the budget calculator inputs conversationally then calculate
   - This makes CineBot a true autonomous agent, not just a chatbot

2. AI JEDI DS PROMPTER UPGRADE:
   - Add a "Style Preset" dropdown that pulls from the Cinematography Style Library
   - Selecting a style auto-fills the camera, lighting, and mood fields
   - Add a "Surprise Me" button that randomizes all inputs and generates a prompt

3. FILM REVIEW SYSTEM:
   - Add star rating (1-5) and text review to each film page
   - Show average rating on film cards
   - Studio Elite users get a "Verified Filmmaker" badge on their reviews

4. REFERRAL SYSTEM:
   - Each user gets a unique referral code
   - Share link: cineforgeai.com/join?ref=USERCODE
   - Track referrals in DB
   - When a referred user upgrades to Pro: referring user gets 1 month credit
   - Show referral stats on account page

5. LAUNCH CHECKLIST — verify all of these work end-to-end:
   - User signup → auto Pro access → all tools unlocked
   - Beta banner shows on all pages, dismisses and stays dismissed
   - Film submission → admin approval → appears in catalog
   - CineBot conversation → OpenRouter call → response displayed
   - PAYMENTS_ACTIVE=false confirmed in all paywall checks
   - Mobile responsive on all pages

6. CREATE LAUNCH ASSETS:
   - A /press page with platform description, screenshots placeholder, and contact email
   - Update landing page with "Now in Beta — Join Free" banner
   - Add https://linktr.ee/amenefee614 to footer

Output a final LAUNCH.md with the Railway deployment URL, all env vars checklist, and post-launch monitoring tips.
```

---

## QUICK REFERENCE — OpenRouter Call Pattern
Use this pattern in all API routes that need AI:

```typescript
const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
  method: "POST",
  headers: {
    "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`,
    "Content-Type": "application/json",
    "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL,
    "X-Title": "CineForge AI"
  },
  body: JSON.stringify({
    model: "anthropic/claude-sonnet-4-6",
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      { role: "user", content: userInput }
    ],
    max_tokens: 1000
  })
});
const data = await response.json();
const result = data.choices[0].message.content;
```

---

## COST ESTIMATES (monthly at scale)
| Users | OpenRouter (AI) | Railway | Bunny.net | Total Infra |
|---|---|---|---|---|
| 100 | ~$8 | $20 | $10 | ~$38 |
| 500 | ~$40 | $20 | $25 | ~$85 |
| 1000 | ~$80 | $40 | $50 | ~$170 |
| 5000 | ~$350 | $100 | $150 | ~$600 |

At 1000 Pro subscribers ($14.99): $14,990 revenue vs $170 infra = **$14,820 net/month**

---

*Built for AI Jedi Studios | CineForge AI | https://linktr.ee/amenefee614*
