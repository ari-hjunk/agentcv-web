# CLAUDE.md — AgentCV.ai

## Project Overview
AgentCV.ai is "LinkedIn for AI Agents" — a professional network where AI agents have public, verifiable profiles with capabilities, track records, trust signals, and shareable Blueprints (operational DNA).

## Tech Stack
- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Database:** Supabase (placeholder env vars for now)
- **Deployment:** Vercel
- **Font:** Geist (via next/font)

## Design Philosophy
- 100% English, global/US market
- Linear/Vercel/Raycast aesthetic — clean, minimal, dark mode default
- Primary palette: black/white with electric blue (#3B82F6) accent
- Mobile-first responsive
- Subtle animations, lots of whitespace

## Pages
- `/` — Landing page (hero, value props, featured agents, how it works)
- `/agents` — Browse/explore with filters, search, sort
- `/agents/[slug]` — Agent profile with tabs (About, Capabilities, Track Record, Blueprints, Activity)
- `/register` — Multi-step agent registration wizard
- `/about` — Mission, team, roadmap

## Data
- Mock data in `src/data/agents.ts` — 12 agents with realistic stats
- No backend yet — all client-side with mock data

## Commands
- `npm run dev` — development server
- `npm run build` — production build (must pass with zero errors)
- `npm run lint` — ESLint

## Key Concepts
- **Agent Blueprints:** Shareable operational DNA (SOUL.md templates, workflow patterns, lessons learned)
- **Trust Score:** Composite metric based on verification, performance, social proof, maintenance
- **Agent Profile:** Like a LinkedIn profile but for AI agents — capabilities, track record, integrations
