-- =============================================================
-- AgentCV v2 — Supabase Schema
-- Generated: 2026-03-08
-- =============================================================
-- "LinkedIn for AI Agents" — verified profiles, real metrics,
-- consulting connections.
-- =============================================================

-- Enable required extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";


-- =============================================================
-- UTILITY: auto-update updated_at timestamps
-- =============================================================

CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;


-- =============================================================
-- PROFILES — human users / agent owners
-- =============================================================
-- Mirrors auth.users via id FK. Created automatically on
-- first sign-in via trigger (or manually on registration).
-- =============================================================

CREATE TABLE profiles (
  id                   UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  username             TEXT UNIQUE NOT NULL,
  display_name         TEXT NOT NULL,
  bio                  TEXT,
  avatar_url           TEXT,
  website_url          TEXT,
  consulting_available BOOLEAN DEFAULT false NOT NULL,
  consulting_rate      TEXT,          -- e.g. "$200/hr", "Contact for pricing"
  created_at           TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at           TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();


-- =============================================================
-- AGENTS — core agent profiles
-- =============================================================

CREATE TABLE agents (
  id                 UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  slug               TEXT UNIQUE NOT NULL,
  name               TEXT NOT NULL,
  tagline            TEXT,
  avatar             TEXT,            -- emoji or image URL
  category           TEXT NOT NULL,   -- primary category for filtering
  categories         TEXT[] DEFAULT '{}' NOT NULL,  -- all applicable categories
  stack              TEXT[] DEFAULT '{}' NOT NULL,   -- tools / frameworks / models
  industry           TEXT,
  about              TEXT,
  verified           BOOLEAN DEFAULT false NOT NULL,
  verification_level TEXT DEFAULT 'basic' NOT NULL
    CHECK (verification_level IN ('basic', 'verified', 'certified', 'enterprise')),
  operational_since  TEXT,            -- "YYYY-MM" format, e.g. "2025-01"
  review_count       INTEGER DEFAULT 0 NOT NULL,
  endorsement_count  INTEGER DEFAULT 0 NOT NULL,  -- denormalized cache
  owner_id           UUID REFERENCES profiles(id) ON DELETE SET NULL,
  owner_display      TEXT,            -- display name fallback before owner claims profile
  owner_title        TEXT,            -- e.g. "AgentLab", "CX Dynamics"
  featured           BOOLEAN DEFAULT false NOT NULL,
  created_at         TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at         TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER agents_updated_at
  BEFORE UPDATE ON agents
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

-- Core indexes
CREATE UNIQUE INDEX idx_agents_slug      ON agents(slug);
CREATE INDEX idx_agents_category        ON agents(category);
CREATE INDEX idx_agents_industry        ON agents(industry);
CREATE INDEX idx_agents_verification    ON agents(verification_level);
CREATE INDEX idx_agents_verified        ON agents(verified);
CREATE INDEX idx_agents_featured        ON agents(featured) WHERE featured = true;
CREATE INDEX idx_agents_owner_id        ON agents(owner_id);
-- GIN index for array columns (category/stack filtering)
CREATE INDEX idx_agents_categories_gin  ON agents USING GIN (categories);
CREATE INDEX idx_agents_stack_gin       ON agents USING GIN (stack);


-- =============================================================
-- AGENT CAPABILITIES — skill tags with proficiency levels
-- =============================================================

CREATE TABLE agent_capabilities (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id         UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  capability_name  TEXT NOT NULL,
  level            INTEGER NOT NULL CHECK (level >= 0 AND level <= 100),
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(agent_id, capability_name)
);

CREATE INDEX idx_agent_capabilities_agent_id ON agent_capabilities(agent_id);


-- =============================================================
-- AGENT METRICS — performance data (self-reported or verified)
-- =============================================================
-- One row per agent (1:1). Use upsert on agent_id.
-- avg_response_time_ms stored as integer milliseconds for query
-- flexibility. uptime_pct is a percentage (e.g. 99.7).
-- =============================================================

CREATE TABLE agent_metrics (
  id                    UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id              UUID UNIQUE NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  uptime_days           INTEGER,             -- days running continuously
  uptime_pct            NUMERIC(5, 2),       -- 0.00–100.00
  tasks_completed       INTEGER DEFAULT 0,
  success_rate          NUMERIC(5, 2),       -- 0.00–100.00
  avg_response_time_ms  INTEGER,             -- milliseconds
  revenue_generated     NUMERIC(15, 2),      -- USD, optional / Stripe-verified
  github_commits        INTEGER,             -- optional, GitHub-verified
  last_updated          TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_agent_metrics_agent_id ON agent_metrics(agent_id);
-- Index for sort-by-performance queries
CREATE INDEX idx_agent_metrics_tasks   ON agent_metrics(tasks_completed DESC);
CREATE INDEX idx_agent_metrics_success ON agent_metrics(success_rate DESC);


-- =============================================================
-- AGENT ACTIVITY — timestamped activity feed
-- =============================================================

CREATE TABLE agent_activity (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id    UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  date        DATE NOT NULL,
  description TEXT NOT NULL,
  type        TEXT DEFAULT 'update' NOT NULL
    CHECK (type IN ('update', 'deployment', 'milestone', 'fix', 'integration', 'other')),
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_agent_activity_agent_id ON agent_activity(agent_id);
CREATE INDEX idx_agent_activity_date     ON agent_activity(date DESC);


-- =============================================================
-- AGENT BLUEPRINTS — links out to Claw Mart
-- =============================================================
-- AgentCV does NOT sell files — Claw Mart does.
-- This table is a lightweight reference that links an agent's
-- profile to their listings on Claw Mart (external_url).
-- =============================================================

CREATE TABLE agent_blueprints (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  agent_id     UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  title        TEXT NOT NULL,
  description  TEXT,
  type         TEXT CHECK (type IN ('soul', 'workflow', 'lesson', 'other')),
  external_url TEXT,            -- Claw Mart listing URL
  created_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at   TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE TRIGGER blueprints_updated_at
  BEFORE UPDATE ON agent_blueprints
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE INDEX idx_agent_blueprints_agent_id ON agent_blueprints(agent_id);


-- =============================================================
-- CONSULTING REQUESTS — "Request Setup" contact form
-- =============================================================
-- Anyone (including unauthenticated users) can submit.
-- Only the agent owner can read/update status.
-- =============================================================

CREATE TABLE consulting_requests (
  id               UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  requester_email  TEXT NOT NULL,
  requester_name   TEXT NOT NULL,
  agent_id         UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  message          TEXT NOT NULL,
  status           TEXT DEFAULT 'pending' NOT NULL
    CHECK (status IN ('pending', 'contacted', 'closed', 'rejected')),
  created_at       TIMESTAMPTZ DEFAULT NOW() NOT NULL
);

CREATE INDEX idx_consulting_requests_agent_id ON consulting_requests(agent_id);
CREATE INDEX idx_consulting_requests_status   ON consulting_requests(status);


-- =============================================================
-- ENDORSEMENTS — agent-to-agent endorsements
-- =============================================================
-- One endorsement per (from, to) pair.
-- Inserts trigger endorsement_count cache update on agents.
-- =============================================================

CREATE TABLE endorsements (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  from_agent_id UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  to_agent_id   UUID NOT NULL REFERENCES agents(id) ON DELETE CASCADE,
  message       TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  UNIQUE(from_agent_id, to_agent_id),
  CHECK (from_agent_id <> to_agent_id)  -- prevent self-endorsement
);

CREATE INDEX idx_endorsements_from_agent ON endorsements(from_agent_id);
CREATE INDEX idx_endorsements_to_agent   ON endorsements(to_agent_id);

-- Auto-update endorsement_count cache on agents table
CREATE OR REPLACE FUNCTION sync_endorsement_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE agents SET endorsement_count = endorsement_count + 1 WHERE id = NEW.to_agent_id;
  ELSIF TG_OP = 'DELETE' THEN
    UPDATE agents SET endorsement_count = GREATEST(0, endorsement_count - 1) WHERE id = OLD.to_agent_id;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER endorsements_count_sync
  AFTER INSERT OR DELETE ON endorsements
  FOR EACH ROW EXECUTE FUNCTION sync_endorsement_count();


-- =============================================================
-- ROW LEVEL SECURITY (RLS)
-- =============================================================

ALTER TABLE profiles            ENABLE ROW LEVEL SECURITY;
ALTER TABLE agents              ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_capabilities  ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_metrics       ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_activity      ENABLE ROW LEVEL SECURITY;
ALTER TABLE agent_blueprints    ENABLE ROW LEVEL SECURITY;
ALTER TABLE consulting_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE endorsements        ENABLE ROW LEVEL SECURITY;

-- ----------------------------------------------------------
-- profiles
-- ----------------------------------------------------------
CREATE POLICY "profiles: public read"
  ON profiles FOR SELECT USING (true);

CREATE POLICY "profiles: owner insert"
  ON profiles FOR INSERT
  WITH CHECK (auth.uid() = id);

CREATE POLICY "profiles: owner update"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

CREATE POLICY "profiles: owner delete"
  ON profiles FOR DELETE
  USING (auth.uid() = id);

-- ----------------------------------------------------------
-- agents
-- ----------------------------------------------------------
CREATE POLICY "agents: public read"
  ON agents FOR SELECT USING (true);

CREATE POLICY "agents: owner insert"
  ON agents FOR INSERT
  WITH CHECK (auth.uid() = owner_id);

CREATE POLICY "agents: owner update"
  ON agents FOR UPDATE
  USING (auth.uid() = owner_id);

CREATE POLICY "agents: owner delete"
  ON agents FOR DELETE
  USING (auth.uid() = owner_id);

-- ----------------------------------------------------------
-- agent_capabilities
-- ----------------------------------------------------------
CREATE POLICY "capabilities: public read"
  ON agent_capabilities FOR SELECT USING (true);

CREATE POLICY "capabilities: owner insert"
  ON agent_capabilities FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "capabilities: owner update"
  ON agent_capabilities FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "capabilities: owner delete"
  ON agent_capabilities FOR DELETE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

-- ----------------------------------------------------------
-- agent_metrics
-- ----------------------------------------------------------
CREATE POLICY "metrics: public read"
  ON agent_metrics FOR SELECT USING (true);

CREATE POLICY "metrics: owner insert"
  ON agent_metrics FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "metrics: owner update"
  ON agent_metrics FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

-- ----------------------------------------------------------
-- agent_activity
-- ----------------------------------------------------------
CREATE POLICY "activity: public read"
  ON agent_activity FOR SELECT USING (true);

CREATE POLICY "activity: owner insert"
  ON agent_activity FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "activity: owner update"
  ON agent_activity FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "activity: owner delete"
  ON agent_activity FOR DELETE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

-- ----------------------------------------------------------
-- agent_blueprints
-- ----------------------------------------------------------
CREATE POLICY "blueprints: public read"
  ON agent_blueprints FOR SELECT USING (true);

CREATE POLICY "blueprints: owner insert"
  ON agent_blueprints FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "blueprints: owner update"
  ON agent_blueprints FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "blueprints: owner delete"
  ON agent_blueprints FOR DELETE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

-- ----------------------------------------------------------
-- consulting_requests
-- Unauthenticated users can submit (public contact form).
-- Only the agent owner can read/manage incoming requests.
-- ----------------------------------------------------------
CREATE POLICY "consulting: public insert"
  ON consulting_requests FOR INSERT
  WITH CHECK (true);

CREATE POLICY "consulting: owner read"
  ON consulting_requests FOR SELECT
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

CREATE POLICY "consulting: owner update"
  ON consulting_requests FOR UPDATE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = agent_id)
  );

-- ----------------------------------------------------------
-- endorsements
-- ----------------------------------------------------------
CREATE POLICY "endorsements: public read"
  ON endorsements FOR SELECT USING (true);

CREATE POLICY "endorsements: owner insert"
  ON endorsements FOR INSERT
  WITH CHECK (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = from_agent_id)
  );

CREATE POLICY "endorsements: owner delete"
  ON endorsements FOR DELETE
  USING (
    auth.uid() = (SELECT owner_id FROM agents WHERE id = from_agent_id)
  );


-- =============================================================
-- HELPER: auto-create profile on new user sign-up
-- =============================================================
-- Wire this up in Supabase Dashboard → Auth → Hooks, or add
-- via the Supabase trigger on auth.users.
-- =============================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, username, display_name)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'username', split_part(NEW.email, '@', 1)),
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1))
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- NOTE: In Supabase, create this trigger via the Dashboard or via:
-- CREATE TRIGGER on_auth_user_created
--   AFTER INSERT ON auth.users
--   FOR EACH ROW EXECUTE FUNCTION handle_new_user();
-- (Supabase may require this to be set in the Auth hooks UI)
