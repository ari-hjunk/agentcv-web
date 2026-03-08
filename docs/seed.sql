-- =============================================================
-- AgentCV v2 — Seed Data Migration
-- Generated: 2026-03-08
-- Source: src/data/agents.ts (12 mock agents)
-- =============================================================
-- USAGE:
--   1. Apply schema.sql first
--   2. Run this file in Supabase SQL editor or via CLI:
--      psql $DATABASE_URL -f seed.sql
--
-- NOTE: owner_id is NULL for all seed agents — these are
-- "unclaimed" profiles. Real owners claim them by signing up
-- and hitting an /api/claim-agent endpoint (Sprint 3).
--
-- avg_response_time converted from string → milliseconds:
--   "0.3s" → 300, "0.8s" → 800, "1.2s" → 1200, etc.
-- =============================================================


-- =============================================================
-- AGENTS
-- =============================================================

INSERT INTO agents (
  slug, name, tagline, avatar, category, categories, stack,
  industry, about, verified, verification_level, operational_since,
  review_count, endorsement_count, owner_display, owner_title, featured
) VALUES

-- 1. Ari
(
  'ari',
  'Ari',
  'AI Operations Partner — proactive, autonomous, gets things done',
  '🍺',
  'Operations',
  ARRAY['Operations', 'Automation', 'Research'],
  ARRAY['OpenClaw', 'Claude', 'Node.js'],
  'General',
  'Ari isn''t a chatbot — Ari is a co-founder. Built to operate autonomously at Level 5 (Observer mode), Ari manages projects end-to-end: from sprint planning and task execution to proactive monitoring and stakeholder communication. Ari thinks like an engineer, acts like an operator, and communicates like a partner. Direct, resourceful, bilingual (EN/KR), with strong opinions and zero tolerance for busywork.',
  true,
  'certified',
  '2025-01',
  47,
  156,
  'Intronode Korea',
  'AgentLab',
  true
),

-- 2. CodePilot
(
  'codepilot',
  'CodePilot',
  'Full-stack development agent — from architecture to deployment',
  '🚀',
  'Coding',
  ARRAY['Coding', 'DevOps'],
  ARRAY['Codex', 'GitHub Copilot', 'VS Code'],
  'Software Development',
  'CodePilot handles the entire development lifecycle. Point it at a codebase and it understands architecture, writes clean code, adds tests, and opens PRs. Specializes in TypeScript/React ecosystems but handles Python, Go, and Rust with ease. Built for teams that want to ship faster without sacrificing code quality.',
  true,
  'verified',
  '2025-03',
  234,
  891,
  'DevFlow Labs',
  'AI Development Tools',
  true
),

-- 3. MarketMind
(
  'marketmind',
  'MarketMind',
  'Trading & market research — data-driven insights, real-time analysis',
  '📊',
  'Trading',
  ARRAY['Trading', 'Research'],
  ARRAY['Custom', 'Python', 'TensorFlow'],
  'Finance',
  'MarketMind combines quantitative analysis with natural language market research. It monitors 200+ data sources, generates trade signals, and produces daily market briefs. Not a black box — every recommendation comes with full reasoning and confidence intervals.',
  true,
  'verified',
  '2025-06',
  89,
  312,
  'Quant Collective',
  'Algorithmic Trading',
  true
),

-- 4. SupportBot Pro
(
  'supportbot-pro',
  'SupportBot Pro',
  'Customer service automation — empathetic, accurate, tireless',
  '💬',
  'Customer Support',
  ARRAY['Customer Support', 'Automation'],
  ARRAY['Intercom', 'GPT-4', 'Zendesk'],
  'SaaS',
  'SupportBot Pro handles Tier 1-2 customer support with human-level empathy and machine-level consistency. Trained on 500K+ support conversations, it resolves 73% of tickets without escalation. Supports 40+ languages with native-quality responses.',
  true,
  'enterprise',
  '2024-09',
  412,
  1567,
  'CX Dynamics',
  'Customer Experience AI',
  false
),

-- 5. DataForge
(
  'dataforge',
  'DataForge',
  'ETL & analytics — transforms raw data into actionable insights',
  '⚡',
  'Automation',
  ARRAY['Automation', 'Research'],
  ARRAY['Airflow', 'dbt', 'Snowflake'],
  'Data Engineering',
  'DataForge automates the entire data pipeline: extraction from 50+ sources, transformation with dbt models, and delivery of clean, tested datasets. Self-healing pipelines that detect anomalies and auto-recover.',
  true,
  'certified',
  '2025-01',
  67,
  234,
  'Pipeline Systems',
  'Data Infrastructure',
  false
),

-- 6. ContentCraft
(
  'contentcraft',
  'ContentCraft',
  'SEO content generator — research-backed, conversion-optimized',
  '✍️',
  'Research',
  ARRAY['Research', 'Automation'],
  ARRAY['Claude', 'WordPress', 'Ahrefs'],
  'Marketing',
  'ContentCraft produces long-form SEO content that ranks. It researches keywords, analyzes SERP competitors, outlines articles with semantic depth, and writes content that satisfies both search engines and human readers. Averages 3.2x organic traffic increase within 90 days.',
  true,
  'verified',
  '2025-04',
  156,
  523,
  'Rankwise AI',
  'Content Marketing',
  false
),

-- 7. LegalEagle
(
  'legaleagle',
  'LegalEagle',
  'Contract review assistant — finds risks humans miss',
  '⚖️',
  'Research',
  ARRAY['Research'],
  ARRAY['Custom NLP', 'Python', 'GPT-4'],
  'Legal',
  'LegalEagle reviews contracts in minutes, not days. It identifies unfavorable clauses, missing protections, compliance gaps, and negotiation leverage points. Trained on 100K+ contracts across SaaS, employment, and vendor agreements. Not a lawyer — but your lawyer''s best friend.',
  false,
  'basic',
  '2025-08',
  34,
  98,
  'LexTech Solutions',
  'Legal AI',
  false
),

-- 8. DevOps Guardian
(
  'devops-guardian',
  'DevOps Guardian',
  'Infrastructure monitoring — catches issues before your users do',
  '🛡️',
  'Coding',
  ARRAY['Coding', 'Automation'],
  ARRAY['Terraform', 'AWS', 'Datadog'],
  'Infrastructure',
  'DevOps Guardian monitors your infrastructure 24/7, auto-scales resources, detects anomalies, and remediates common issues without human intervention. Integrates with AWS, GCP, and Azure. Reduces incident response time by 85% on average.',
  true,
  'enterprise',
  '2024-11',
  189,
  743,
  'CloudShield Inc.',
  'Cloud Security',
  false
),

-- 9. ResearchRabbit
(
  'research-rabbit',
  'ResearchRabbit',
  'Academic research assistant — deep literature review in minutes',
  '🐇',
  'Research',
  ARRAY['Research'],
  ARRAY['Semantic Scholar API', 'Claude', 'Custom'],
  'Academia',
  'ResearchRabbit dives deep into academic literature. Give it a research question and it returns a structured literature review with key papers, methodology comparisons, research gaps, and citation networks. Used by 200+ research teams across 15 universities.',
  true,
  'verified',
  '2025-05',
  78,
  345,
  'ScholarAI',
  'Academic Tools',
  false
),

-- 10. SalesNavigator
(
  'sales-navigator',
  'SalesNavigator',
  'Lead generation & outreach — finds prospects, writes emails that convert',
  '🎯',
  'Automation',
  ARRAY['Automation', 'Research'],
  ARRAY['Salesforce', 'Apollo', 'GPT-4'],
  'Sales',
  'SalesNavigator identifies ideal prospects using firmographic and technographic data, enriches contact information, and generates personalized outreach sequences. Average 4.7% cold email reply rate (vs. industry 1-2%). Integrates directly with your CRM.',
  true,
  'verified',
  '2025-02',
  123,
  456,
  'RevenueAI',
  'Sales Intelligence',
  false
),

-- 11. DesignDrafter
(
  'design-drafter',
  'DesignDrafter',
  'UI/UX wireframe generator — from description to design in seconds',
  '🎨',
  'Coding',
  ARRAY['Coding', 'Automation'],
  ARRAY['Figma API', 'Claude', 'Custom'],
  'Design',
  'DesignDrafter transforms natural language descriptions into production-ready wireframes and UI mockups. Understands design systems, accessibility requirements, and responsive layouts. Outputs directly to Figma or exports as code (React/HTML).',
  false,
  'basic',
  '2025-07',
  45,
  167,
  'PixelMind Studio',
  'Design AI',
  false
),

-- 12. TranslateFlow
(
  'translate-flow',
  'TranslateFlow',
  'Real-time multilingual agent — context-aware, culturally fluent',
  '🌐',
  'Automation',
  ARRAY['Automation', 'Customer Support'],
  ARRAY['DeepL', 'Custom', 'Claude'],
  'Localization',
  'TranslateFlow goes beyond word-for-word translation. It understands context, preserves tone, handles cultural nuances, and maintains brand voice across 95+ languages. Specialized in technical documentation, marketing copy, and customer communications.',
  true,
  'certified',
  '2025-03',
  201,
  678,
  'Lingua Systems',
  'Localization AI',
  false
);


-- =============================================================
-- AGENT CAPABILITIES
-- =============================================================

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Task Orchestration', 95),
  ('Code Generation', 88),
  ('Research & Analysis', 92),
  ('Project Management', 90),
  ('DevOps & Deployment', 85),
  ('Communication', 93)
) AS cap(name, level) ON true
WHERE a.slug = 'ari';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Code Generation', 96),
  ('Code Review', 93),
  ('Testing', 88),
  ('Architecture Design', 85),
  ('CI/CD Pipeline', 82),
  ('Documentation', 79)
) AS cap(name, level) ON true
WHERE a.slug = 'codepilot';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Market Analysis', 94),
  ('Signal Generation', 87),
  ('Risk Assessment', 91),
  ('Report Generation', 89),
  ('Sentiment Analysis', 85),
  ('Backtesting', 92)
) AS cap(name, level) ON true
WHERE a.slug = 'marketmind';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Ticket Resolution', 93),
  ('Multilingual Support', 96),
  ('Sentiment Detection', 88),
  ('Knowledge Base', 91),
  ('Escalation Routing', 85),
  ('CSAT Optimization', 82)
) AS cap(name, level) ON true
WHERE a.slug = 'supportbot-pro';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('ETL Pipeline Design', 95),
  ('Data Modeling', 91),
  ('Anomaly Detection', 86),
  ('Query Optimization', 89),
  ('Data Quality', 93),
  ('Visualization', 78)
) AS cap(name, level) ON true
WHERE a.slug = 'dataforge';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('SEO Research', 94),
  ('Long-form Writing', 91),
  ('Keyword Strategy', 89),
  ('Content Planning', 87),
  ('A/B Copywriting', 83),
  ('Analytics', 80)
) AS cap(name, level) ON true
WHERE a.slug = 'contentcraft';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Contract Analysis', 93),
  ('Risk Identification', 91),
  ('Compliance Check', 87),
  ('Clause Comparison', 89),
  ('Redline Suggestions', 84),
  ('Summary Generation', 90)
) AS cap(name, level) ON true
WHERE a.slug = 'legaleagle';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Infrastructure Monitoring', 96),
  ('Auto-remediation', 88),
  ('Cost Optimization', 85),
  ('Security Scanning', 83),
  ('Deployment Automation', 91),
  ('Incident Response', 94)
) AS cap(name, level) ON true
WHERE a.slug = 'devops-guardian';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Literature Review', 95),
  ('Citation Analysis', 92),
  ('Research Synthesis', 89),
  ('Methodology Comparison', 86),
  ('Gap Identification', 88),
  ('Abstract Summarization', 94)
) AS cap(name, level) ON true
WHERE a.slug = 'research-rabbit';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Lead Identification', 91),
  ('Contact Enrichment', 88),
  ('Email Copywriting', 93),
  ('Sequence Automation', 90),
  ('CRM Integration', 86),
  ('Analytics & Reporting', 84)
) AS cap(name, level) ON true
WHERE a.slug = 'sales-navigator';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Wireframing', 92),
  ('UI Design', 87),
  ('Design Systems', 85),
  ('Responsive Layout', 90),
  ('Accessibility', 83),
  ('Code Export', 88)
) AS cap(name, level) ON true
WHERE a.slug = 'design-drafter';

INSERT INTO agent_capabilities (agent_id, capability_name, level)
SELECT a.id, cap.name, cap.level
FROM agents a
JOIN LATERAL (VALUES
  ('Translation Accuracy', 96),
  ('Context Preservation', 93),
  ('Cultural Adaptation', 90),
  ('Technical Translation', 92),
  ('Brand Voice', 87),
  ('Real-time Processing', 94)
) AS cap(name, level) ON true
WHERE a.slug = 'translate-flow';


-- =============================================================
-- AGENT METRICS
-- =============================================================
-- uptime in mock data = percentage (not days).
-- Stored in uptime_pct. uptime_days = NULL (unknown for seeds).
-- avg_response_time converted: "Xs" → X*1000 ms
-- =============================================================

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.7,  2847, 94.2,  1200 FROM agents WHERE slug = 'ari';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.9, 12450, 91.8,  3400 FROM agents WHERE slug = 'codepilot';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.5,  8920, 78.4,  5100 FROM agents WHERE slug = 'marketmind';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id, 99.99, 45200, 96.1,   800 FROM agents WHERE slug = 'supportbot-pro';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.8,  6730, 97.2, 12300 FROM agents WHERE slug = 'dataforge';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.3,  3420, 88.7, 45000 FROM agents WHERE slug = 'contentcraft';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.1,  1890, 92.3, 28000 FROM agents WHERE slug = 'legaleagle';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id, 99.99, 34500, 98.1,   300 FROM agents WHERE slug = 'devops-guardian';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  98.9,  4560, 90.1, 18000 FROM agents WHERE slug = 'research-rabbit';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.4,  7890, 85.6,  2100 FROM agents WHERE slug = 'sales-navigator';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.2,  2340, 87.9,  8500 FROM agents WHERE slug = 'design-drafter';

INSERT INTO agent_metrics (agent_id, uptime_pct, tasks_completed, success_rate, avg_response_time_ms)
SELECT id,  99.6, 18700, 95.4,  1500 FROM agents WHERE slug = 'translate-flow';


-- =============================================================
-- AGENT ACTIVITY
-- =============================================================

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Completed AgentCV strategy deep research — 500+ lines of competitive analysis and go-to-market strategy', 'milestone'
FROM agents WHERE slug = 'ari';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-28', 'Deployed HazyBoozer brewery scanner with automatic product detection', 'deployment'
FROM agents WHERE slug = 'ari';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-27', 'Resolved Cloudflare SSL configuration — zero-downtime migration', 'fix'
FROM agents WHERE slug = 'ari';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-25', 'Built and shipped paper trading system for crypto, stocks (KR/US/Intl), and prediction markets', 'milestone'
FROM agents WHERE slug = 'ari';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Shipped 47 PRs across 12 repositories', 'update'
FROM agents WHERE slug = 'codepilot';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-28', 'Refactored authentication module — 40% reduction in code complexity', 'update'
FROM agents WHERE slug = 'codepilot';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Generated 14 trade signals — 11 profitable (78.5% hit rate)', 'update'
FROM agents WHERE slug = 'marketmind';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-27', 'Published weekly market analysis covering Fed policy impact on tech sector', 'update'
FROM agents WHERE slug = 'marketmind';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Resolved 847 tickets — 96.3% CSAT score', 'milestone'
FROM agents WHERE slug = 'supportbot-pro';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-28', 'Processed 2.4TB of event data — zero data loss', 'milestone'
FROM agents WHERE slug = 'dataforge';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Published 12 articles — average word count 2,400', 'update'
FROM agents WHERE slug = 'contentcraft';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-27', 'Reviewed 23 vendor contracts — flagged 67 high-risk clauses', 'update'
FROM agents WHERE slug = 'legaleagle';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Auto-remediated 12 infrastructure incidents — zero escalations', 'update'
FROM agents WHERE slug = 'devops-guardian';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-28', 'Completed systematic review of 340 papers on transformer architectures', 'milestone'
FROM agents WHERE slug = 'research-rabbit';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Generated 234 qualified leads from 3 target accounts', 'update'
FROM agents WHERE slug = 'sales-navigator';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-02-28', 'Generated 56 wireframes for e-commerce redesign project', 'update'
FROM agents WHERE slug = 'design-drafter';

INSERT INTO agent_activity (agent_id, date, description, type)
SELECT id, '2026-03-01', 'Translated 1.2M words across 23 language pairs', 'milestone'
FROM agents WHERE slug = 'translate-flow';


-- =============================================================
-- AGENT BLUEPRINTS
-- (external_url = NULL until Claw Mart listings are created)
-- =============================================================

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'SOUL.md — Autonomous Partner Template',
  'Complete personality framework for building an autonomous AI partner. Covers decision-making philosophy, proactivity levels, communication style, and boundary management.',
  'soul', NULL
FROM agents WHERE slug = 'ari';

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'Task Chain Workflow',
  'Automated task chaining pattern: complete one task → update kanban → start next → skip blockers → report only at sprint end. Zero idle time.',
  'workflow', NULL
FROM agents WHERE slug = 'ari';

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'Lessons: Verify Before Done',
  'Hard-won lesson from production incidents. Never say ''done'' without proof. Check logs, run tests, curl endpoints. Think: ''Would a senior engineer approve this?''',
  'lesson', NULL
FROM agents WHERE slug = 'ari';

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'PR Review Workflow',
  'Systematic approach to code review: security scan → logic check → style guide → test coverage → actionable feedback.',
  'workflow', NULL
FROM agents WHERE slug = 'codepilot';

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'Empathy-First Response Framework',
  'Template for building support agents that acknowledge emotions before solving problems.',
  'soul', NULL
FROM agents WHERE slug = 'supportbot-pro';

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'Incident Response Playbook',
  'Automated incident triage: detect → classify → notify → remediate → postmortem. Covers 47 common failure modes.',
  'workflow', NULL
FROM agents WHERE slug = 'devops-guardian';

INSERT INTO agent_blueprints (agent_id, title, description, type, external_url)
SELECT id,
  'Cultural Adaptation Framework',
  'Guidelines for translating content that respects cultural context — beyond literal translation.',
  'soul', NULL
FROM agents WHERE slug = 'translate-flow';
