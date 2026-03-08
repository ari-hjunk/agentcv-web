# CLAUDE.md - AgentCV

## Project

**AgentCV.ai** — "LinkedIn for AI Agents"
AI 에이전트의 **검증된 성과**를 보여주고, 에이전트 전문가와 연결해주는 플랫폼.

> "Claw Mart is where you buy agent software. AgentCV is where you find agent experts."

**Tech Stack:** Next.js 15 (App Router) · TypeScript (strict) · Tailwind CSS v4 · Supabase (DB + Auth) · Vercel

---

## v2 Product Direction

We are rebuilding from a static mock-data MVP into a Supabase-backed platform.

**Core Value Proposition:**

- Agent profiles with **verifiable, measurable metrics** (not just claims)
- Trust through a tiered **Verification System**: Basic → Verified → Certified → Enterprise
- **Consulting connection** as the revenue model — "Request Setup" → owner gets the lead
- Blueprints are **links to Claw Mart** (no file selling here)

**What we're NOT building in v2:**

- ❌ Payment/transaction system
- ❌ Agent-to-agent communication
- ❌ Real-time API verification (Phase 3)
- ❌ Mobile app

---

## Database Schema Overview

Schema defined in `docs/schema.sql`. Apply before any Supabase work.

### Tables

| Table                 | Purpose                                                                                                              |
| --------------------- | -------------------------------------------------------------------------------------------------------------------- |
| `profiles`            | Human users / agent owners. Linked to `auth.users` via id FK.                                                        |
| `agents`              | Core agent profiles. slug, name, tagline, avatar, category, categories[], stack[], industry, verification, owner_id. |
| `agent_capabilities`  | Many-to-many. (agent_id, capability_name, level 0–100). Unique per agent.                                            |
| `agent_metrics`       | 1:1 with agents. uptime_pct, tasks_completed, success_rate, avg_response_time_ms, revenue_generated, github_commits. |
| `agent_activity`      | Activity feed entries. (agent_id, date, description, type).                                                          |
| `agent_blueprints`    | Lightweight references linking to Claw Mart (external_url).                                                          |
| `consulting_requests` | Contact form submissions. Public insert, owner-only read.                                                            |
| `endorsements`        | Agent-to-agent. Unique pair, self-endorsement blocked via CHECK. Triggers endorsement_count cache on agents.         |

### Key Design Decisions

- **avg_response_time stored as milliseconds** (integer) — enables sorting/filtering. Display layer converts to "1.2s".
- **categories[] is a Postgres array** with a GIN index — enables `@>` contains queries for multi-category filtering.
- **endorsement_count is a denormalized cache** on agents — updated via trigger. Avoids COUNT(\*) on every page load.
- **owner_id can be NULL** — seed agents are "unclaimed". Owners claim via a future /api/claim-agent endpoint.
- **RLS**: Public read on all agent data. Owner-only write (via `auth.uid() = owner_id`). Consulting requests are public-insert / owner-read.

---

## Sprint Plan

### Sprint 1: Foundation (2–3 days) ← CURRENT

- [ ] Supabase project setup (apply schema.sql)
- [ ] Agent profile CRUD (Supabase client)
- [ ] Replace mock data imports with Supabase queries
- [ ] Seed DB (run seed.sql)
- [ ] Deploy to Vercel with env vars

### Sprint 2: Discovery (2 days)

- [ ] Category/industry filtering (GIN index queries)
- [ ] Search functionality (pg_trgm or Supabase full-text)
- [ ] Agent listing page: card grid + data-dense list toggle
- [ ] Sort by metrics (tasks_completed, success_rate)

### Sprint 3: Verification & Trust (2 days)

- [ ] Verification badge rendering (Basic/Verified/Certified/Enterprise)
- [ ] Self-report metrics form (owner can update agent_metrics)
- [ ] Activity feed — manual entry form
- [ ] Owner profile pages (`/owners/[username]`)
- [ ] Agent claim flow (/api/claim-agent)

### Sprint 4: Consulting Connection (1–2 days)

- [ ] "Request Setup" form → insert consulting_requests
- [ ] Email notification to owner on new request (Resend or SMTP)
- [ ] Owner availability toggle (consulting_available on profiles)
- [ ] Consulting CTA variant on profiles

### Sprint 5: Polish & Launch (1–2 days)

- [ ] Landing page — position vs Claw Mart
- [ ] SEO meta tags + OG images
- [ ] Ari's profile as showcase (real data, verified)
- [ ] agentcv.ai domain setup
- [ ] Launch post draft for X

---

## Implementation Notes

### Codex is used for implementation

All application code is written by **Codex CLI** (`/usr/local/bin/codex`), not by Claude directly.
Claude's role: architecture, schema design, task decomposition, QA review.

### Supabase Client Pattern

```typescript
// lib/supabase.ts
import { createBrowserClient } from '@supabase/ssr';
import { Database } from '@/types/supabase'; // generated types

export const supabase = createBrowserClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);
```

### Data Fetching Pattern (Server Components)

```typescript
// app/agents/[slug]/page.tsx
import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

const supabase = createServerClient(...)
const { data: agent } = await supabase
  .from('agents')
  .select(`*, agent_metrics(*), agent_capabilities(*), agent_activity(*)`)
  .eq('slug', params.slug)
  .single()
```

### avg_response_time Display Helper

```typescript
// Store as ms integer, display as human-readable
export function formatResponseTime(ms: number): string {
  if (ms < 1000) return `${ms}ms`;
  return `${(ms / 1000).toFixed(1)}s`;
}
```

---

## Design Philosophy

- **100% English UI** — global/US market only. No Korean text in the UI.
- **Linear/Vercel aesthetic** — dark mode default, minimal, data-dense, premium
- Think: GitHub profile meets LinkedIn meets Vercel dashboard
- Agent cards: prioritize metrics visibility over decoration

---

## Quality Rules (MANDATORY — NO EXCEPTIONS)

```bash
npm run build     # must pass with zero errors
npx tsc --noEmit  # TypeScript strict mode — must pass
```

- All UI changes must be described in commit message
- Pre-commit hooks auto-format on commit
- **"Build passes" ≠ done. Browser check = done.**
- After every commit: verify deployed URL actually renders, no console errors

### TypeScript Rules

- `strict: true` in tsconfig.json (already set)
- No `any` types — use `unknown` + type guard if needed
- Generate Supabase types: `npx supabase gen types typescript --local > src/types/supabase.ts`
- All DB query results must be typed via generated types

---

## File Structure

```
agentcv/
├── docs/
│   ├── schema.sql       ← Supabase schema (apply first)
│   └── seed.sql         ← Seed data (12 mock agents → DB)
├── src/
│   ├── app/             ← Next.js App Router pages
│   ├── components/      ← Shared UI components
│   ├── data/
│   │   └── agents.ts    ← DEPRECATED in v2 (keep for reference, remove after migration)
│   ├── lib/
│   │   └── supabase.ts  ← Supabase client (to be created)
│   └── types/
│       └── supabase.ts  ← Generated Supabase types (to be created)
└── CLAUDE.md            ← This file
```

---

## Environment Variables Required

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=   # server-only, never expose to client
```
