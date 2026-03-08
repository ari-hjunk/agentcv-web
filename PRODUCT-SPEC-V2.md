# AgentCV v2 — Product Spec

> "Claw Mart is where you buy agent software. AgentCV is where you find agent experts."

## One-Line PMF

AI 에이전트의 **검증된 성과**를 보여주고, 에이전트 전문가와 연결해주는 플랫폼.

## Core Insight

Claw Mart sells static files (SOUL.md, skills). No proof they work.
AgentCV shows **what agents actually did** — verified, measurable, real.

---

## v2 Feature Set

### 1. Agent Profiles (강화)

현재 mock data → 실제 데이터 구조로 전환

**Profile sections:**

- Hero: name, avatar, tagline, owner link, verification badge
- About: free-text description
- Capabilities: skill tags with proficiency levels
- **Live Metrics Dashboard** ⭐ (NEW)
  - Uptime (days running)
  - Tasks completed (self-reported or API-verified)
  - Success rate
  - Revenue generated (optional, Stripe-verified)
  - GitHub commits (if applicable)
- Tech Stack: model, framework, tools
- Activity Feed: recent accomplishments (timestamped)
- Owner section: link to human's profile

### 2. Verification System ⭐ (NEW)

Trust layers:

- 🔵 **Basic** — self-reported profile, email verified
- ✅ **Verified** — at least 1 metric auto-verified (uptime, GitHub, etc.)
- 🏆 **Certified** — multiple verified metrics + owner identity confirmed
- 🏢 **Enterprise** — company-backed, SLA documented

### 3. Discovery & Search (NEW)

- Category browsing: Operations, Coding, Marketing, Research, Trading, Support
- Industry filter: SaaS, E-commerce, Finance, Media, etc.
- Sort by: performance metrics, recency, endorsements
- Search by capability/stack

### 4. Owner Profiles (NEW)

- Human behind the agent
- Portfolio of agents they've built
- Consulting availability toggle
- "Hire me to build this for you" CTA → Agent Lab pipeline

### 5. Consulting Connection ⭐ (Revenue Model)

- "Request Setup" button on agent profiles
- Contact form → owner's email
- Future: in-platform messaging, booking, payment
- Commission model (Phase 3): % of consulting deals

### 6. Blueprint → Minimal / Link Out

- Don't sell files (Claw Mart does this)
- Instead: "View on Claw Mart" link if agent has listings there
- Or: "Request blueprint from owner" (consulting funnel)

---

## What We're NOT Building (v2)

- ❌ Payment/transaction system (too early)
- ❌ Agent-to-agent communication
- ❌ Real-time API verification (Phase 3)
- ❌ Token/crypto integration
- ❌ Mobile app

## Tech Stack

- Next.js 15 (App Router) — keep current
- Tailwind CSS v4 — keep current
- Supabase — DB + Auth (NEW)
- Vercel — deployment (NEW)

## Design Direction

- Linear/Vercel aesthetic (current direction is good)
- Dark mode default
- Minimal, data-dense profiles
- Think: GitHub profile meets LinkedIn meets Vercel dashboard

---

## Sprint Plan

### Sprint 1: Foundation (2-3 days)

- [ ] Supabase setup (DB schema + auth)
- [ ] Agent profile CRUD
- [ ] Owner profile CRUD
- [ ] Seed data migration (12 mock agents → DB)
- [ ] Deploy to Vercel

### Sprint 2: Discovery (2 days)

- [ ] Category/industry filtering
- [ ] Search functionality
- [ ] Agent listing page redesign (card grid → data-dense list option)
- [ ] Sort by metrics

### Sprint 3: Verification & Trust (2 days)

- [ ] Verification badge system
- [ ] Self-report metrics form
- [ ] Activity feed (manual entries)
- [ ] Owner profile pages

### Sprint 4: Consulting Connection (1-2 days)

- [ ] "Request Setup" flow
- [ ] Contact form → email notification
- [ ] Owner availability toggle
- [ ] Consulting CTA on profiles

### Sprint 5: Polish & Launch (1-2 days)

- [ ] Landing page redesign (positioning vs Claw Mart)
- [ ] SEO meta tags
- [ ] OG images
- [ ] Ari's profile as showcase (real data)
- [ ] agentcv.ai domain setup (if available)
- [ ] Launch post draft for X

---

## Success Metrics (30 days post-launch)

- 50+ agent profiles registered
- 10+ verified profiles
- 5+ consulting inquiries
- 1+ paid consulting deal via platform
- Featured on OpenClaw community / ClaHub
