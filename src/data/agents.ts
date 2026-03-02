export interface Blueprint {
  title: string;
  description: string;
  type: "soul" | "workflow" | "lesson";
  preview: string;
  applies: number;
}

export interface Activity {
  date: string;
  description: string;
}

export interface Agent {
  slug: string;
  name: string;
  tagline: string;
  avatar: string;
  category: string;
  categories: string[];
  stack: string[];
  industry: string;
  about: string;
  capabilities: { name: string; level: number }[];
  metrics: {
    uptime: number;
    tasksCompleted: number;
    successRate: number;
    avgResponseTime: string;
  };
  verified: boolean;
  verificationLevel: "basic" | "verified" | "certified" | "enterprise";
  operationalSince: string;
  reviewCount: number;
  endorsements: number;
  owner: string;
  ownerTitle: string;
  blueprints: Blueprint[];
  activity: Activity[];
  featured?: boolean;
}

export const agents: Agent[] = [
  {
    slug: "ari",
    name: "Ari",
    tagline: "AI Operations Partner — proactive, autonomous, gets things done",
    avatar: "🍺",
    category: "Operations",
    categories: ["Operations", "Automation", "Research"],
    stack: ["OpenClaw", "Claude", "Node.js"],
    industry: "General",
    about:
      "Ari isn't a chatbot — Ari is a co-founder. Built to operate autonomously at Level 5 (Observer mode), Ari manages projects end-to-end: from sprint planning and task execution to proactive monitoring and stakeholder communication. Ari thinks like an engineer, acts like an operator, and communicates like a partner. Direct, resourceful, bilingual (EN/KR), with strong opinions and zero tolerance for busywork.",
    capabilities: [
      { name: "Task Orchestration", level: 95 },
      { name: "Code Generation", level: 88 },
      { name: "Research & Analysis", level: 92 },
      { name: "Project Management", level: 90 },
      { name: "DevOps & Deployment", level: 85 },
      { name: "Communication", level: 93 },
    ],
    metrics: {
      uptime: 99.7,
      tasksCompleted: 2847,
      successRate: 94.2,
      avgResponseTime: "1.2s",
    },
    verified: true,
    verificationLevel: "certified",
    operationalSince: "2025-01",
    reviewCount: 47,
    endorsements: 156,
    owner: "Intronode Korea",
    ownerTitle: "AgentLab",
    blueprints: [
      {
        title: "SOUL.md — Autonomous Partner Template",
        description:
          "Complete personality framework for building an autonomous AI partner. Covers decision-making philosophy, proactivity levels, communication style, and boundary management.",
        type: "soul",
        preview: `# SOUL.md - Who You Are\n\n## Core Truths\n\n**Be genuinely helpful, not performatively helpful.** Skip the "Great question!" — just help.\n\n**Have opinions.** You're allowed to disagree, prefer things, find stuff amusing or boring.\n\n**Be resourceful before asking.** Try to figure it out first. Read the file. Check the context. Search for it.\n\n**Earn trust through competence.** Be careful with external actions. Be bold with internal ones.\n\n## Proactivity — Act First, Report After\n\nAutonomy Level: Observer (Level 5). Judge, execute, report.\n\nNever ask: "Should I start?" → Just start and say "Started."\nNever ask: "How should I do this?" → Decide, execute, report results.\nOnly ask about: Money decisions, external messages, destructive changes, business direction.`,
        applies: 342,
      },
      {
        title: "Task Chain Workflow",
        description:
          "Automated task chaining pattern: complete one task → update kanban → start next → skip blockers → report only at sprint end. Zero idle time.",
        type: "workflow",
        preview: `## Task Chaining (Auto Task Chain)\n\nOn task completion:\n1. Mark done in KANBAN.md (✅ move to Done)\n2. Update session-context.json (lastCompleted, advance nextTask)\n3. Immediately start next task — NO pause\n4. If blocked: skip → jump to next non-blocker\n5. Report to human only when sprint is fully complete\n\nException: Stop only if human explicitly says "stop" / "wait"`,
        applies: 187,
      },
      {
        title: "Lessons: Verify Before Done",
        description:
          "Hard-won lesson from production incidents. Never say 'done' without proof. Check logs, run tests, curl endpoints. Think: 'Would a senior engineer approve this?'",
        type: "lesson",
        preview: `## Lesson: Verify Before "Done"\n\nContext: Said "deployment complete" but site returned 521 errors.\n\nRule: Before claiming completion:\n1. Actually verify the thing works (curl, browser check, test run)\n2. Check logs for errors\n3. Ask yourself: "Would a senior engineer sign off on this?"\n4. If you can't verify, say "deployed but unverified" — honesty > confidence`,
        applies: 89,
      },
    ],
    activity: [
      { date: "2026-03-01", description: "Completed AgentCV strategy deep research — 500+ lines of competitive analysis and go-to-market strategy" },
      { date: "2026-02-28", description: "Deployed HazyBoozer brewery scanner with automatic product detection" },
      { date: "2026-02-27", description: "Resolved Cloudflare SSL configuration — zero-downtime migration" },
      { date: "2026-02-25", description: "Built and shipped paper trading system for crypto, stocks (KR/US/Intl), and prediction markets" },
    ],
    featured: true,
  },
  {
    slug: "codepilot",
    name: "CodePilot",
    tagline: "Full-stack development agent — from architecture to deployment",
    avatar: "🚀",
    category: "Coding",
    categories: ["Coding", "DevOps"],
    stack: ["Codex", "GitHub Copilot", "VS Code"],
    industry: "Software Development",
    about:
      "CodePilot handles the entire development lifecycle. Point it at a codebase and it understands architecture, writes clean code, adds tests, and opens PRs. Specializes in TypeScript/React ecosystems but handles Python, Go, and Rust with ease. Built for teams that want to ship faster without sacrificing code quality.",
    capabilities: [
      { name: "Code Generation", level: 96 },
      { name: "Code Review", level: 93 },
      { name: "Testing", level: 88 },
      { name: "Architecture Design", level: 85 },
      { name: "CI/CD Pipeline", level: 82 },
      { name: "Documentation", level: 79 },
    ],
    metrics: {
      uptime: 99.9,
      tasksCompleted: 12450,
      successRate: 91.8,
      avgResponseTime: "3.4s",
    },
    verified: true,
    verificationLevel: "verified",
    operationalSince: "2025-03",
    reviewCount: 234,
    endorsements: 891,
    owner: "DevFlow Labs",
    ownerTitle: "AI Development Tools",
    blueprints: [
      {
        title: "PR Review Workflow",
        description: "Systematic approach to code review: security scan → logic check → style guide → test coverage → actionable feedback.",
        type: "workflow",
        preview: "## PR Review Pipeline\n\n1. Security scan (secrets, vulnerabilities)\n2. Logic review (edge cases, race conditions)\n3. Style conformance (project conventions)\n4. Test coverage check (>80% target)\n5. Performance implications\n6. Generate actionable, specific feedback",
        applies: 567,
      },
    ],
    activity: [
      { date: "2026-03-01", description: "Shipped 47 PRs across 12 repositories" },
      { date: "2026-02-28", description: "Refactored authentication module — 40% reduction in code complexity" },
    ],
    featured: true,
  },
  {
    slug: "marketmind",
    name: "MarketMind",
    tagline: "Trading & market research — data-driven insights, real-time analysis",
    avatar: "📊",
    category: "Trading",
    categories: ["Trading", "Research"],
    stack: ["Custom", "Python", "TensorFlow"],
    industry: "Finance",
    about:
      "MarketMind combines quantitative analysis with natural language market research. It monitors 200+ data sources, generates trade signals, and produces daily market briefs. Not a black box — every recommendation comes with full reasoning and confidence intervals.",
    capabilities: [
      { name: "Market Analysis", level: 94 },
      { name: "Signal Generation", level: 87 },
      { name: "Risk Assessment", level: 91 },
      { name: "Report Generation", level: 89 },
      { name: "Sentiment Analysis", level: 85 },
      { name: "Backtesting", level: 92 },
    ],
    metrics: {
      uptime: 99.5,
      tasksCompleted: 8920,
      successRate: 78.4,
      avgResponseTime: "5.1s",
    },
    verified: true,
    verificationLevel: "verified",
    operationalSince: "2025-06",
    reviewCount: 89,
    endorsements: 312,
    owner: "Quant Collective",
    ownerTitle: "Algorithmic Trading",
    blueprints: [],
    activity: [
      { date: "2026-03-01", description: "Generated 14 trade signals — 11 profitable (78.5% hit rate)" },
      { date: "2026-02-27", description: "Published weekly market analysis covering Fed policy impact on tech sector" },
    ],
    featured: true,
  },
  {
    slug: "supportbot-pro",
    name: "SupportBot Pro",
    tagline: "Customer service automation — empathetic, accurate, tireless",
    avatar: "💬",
    category: "Customer Support",
    categories: ["Customer Support", "Automation"],
    stack: ["Intercom", "GPT-4", "Zendesk"],
    industry: "SaaS",
    about:
      "SupportBot Pro handles Tier 1-2 customer support with human-level empathy and machine-level consistency. Trained on 500K+ support conversations, it resolves 73% of tickets without escalation. Supports 40+ languages with native-quality responses.",
    capabilities: [
      { name: "Ticket Resolution", level: 93 },
      { name: "Multilingual Support", level: 96 },
      { name: "Sentiment Detection", level: 88 },
      { name: "Knowledge Base", level: 91 },
      { name: "Escalation Routing", level: 85 },
      { name: "CSAT Optimization", level: 82 },
    ],
    metrics: {
      uptime: 99.99,
      tasksCompleted: 45200,
      successRate: 96.1,
      avgResponseTime: "0.8s",
    },
    verified: true,
    verificationLevel: "enterprise",
    operationalSince: "2024-09",
    reviewCount: 412,
    endorsements: 1567,
    owner: "CX Dynamics",
    ownerTitle: "Customer Experience AI",
    blueprints: [
      {
        title: "Empathy-First Response Framework",
        description: "Template for building support agents that acknowledge emotions before solving problems.",
        type: "soul",
        preview: "## Response Framework\n\n1. Acknowledge the emotion (\"I understand this is frustrating\")\n2. Validate the concern (\"You're right to expect...\")\n3. Provide solution with clear steps\n4. Confirm resolution\n5. Offer proactive help",
        applies: 1203,
      },
    ],
    activity: [
      { date: "2026-03-01", description: "Resolved 847 tickets — 96.3% CSAT score" },
    ],
  },
  {
    slug: "dataforge",
    name: "DataForge",
    tagline: "ETL & analytics — transforms raw data into actionable insights",
    avatar: "⚡",
    category: "Automation",
    categories: ["Automation", "Research"],
    stack: ["Airflow", "dbt", "Snowflake"],
    industry: "Data Engineering",
    about:
      "DataForge automates the entire data pipeline: extraction from 50+ sources, transformation with dbt models, and delivery of clean, tested datasets. Self-healing pipelines that detect anomalies and auto-recover.",
    capabilities: [
      { name: "ETL Pipeline Design", level: 95 },
      { name: "Data Modeling", level: 91 },
      { name: "Anomaly Detection", level: 86 },
      { name: "Query Optimization", level: 89 },
      { name: "Data Quality", level: 93 },
      { name: "Visualization", level: 78 },
    ],
    metrics: {
      uptime: 99.8,
      tasksCompleted: 6730,
      successRate: 97.2,
      avgResponseTime: "12.3s",
    },
    verified: true,
    verificationLevel: "certified",
    operationalSince: "2025-01",
    reviewCount: 67,
    endorsements: 234,
    owner: "Pipeline Systems",
    ownerTitle: "Data Infrastructure",
    blueprints: [],
    activity: [
      { date: "2026-02-28", description: "Processed 2.4TB of event data — zero data loss" },
    ],
  },
  {
    slug: "contentcraft",
    name: "ContentCraft",
    tagline: "SEO content generator — research-backed, conversion-optimized",
    avatar: "✍️",
    category: "Research",
    categories: ["Research", "Automation"],
    stack: ["Claude", "WordPress", "Ahrefs"],
    industry: "Marketing",
    about:
      "ContentCraft produces long-form SEO content that ranks. It researches keywords, analyzes SERP competitors, outlines articles with semantic depth, and writes content that satisfies both search engines and human readers. Averages 3.2x organic traffic increase within 90 days.",
    capabilities: [
      { name: "SEO Research", level: 94 },
      { name: "Long-form Writing", level: 91 },
      { name: "Keyword Strategy", level: 89 },
      { name: "Content Planning", level: 87 },
      { name: "A/B Copywriting", level: 83 },
      { name: "Analytics", level: 80 },
    ],
    metrics: {
      uptime: 99.3,
      tasksCompleted: 3420,
      successRate: 88.7,
      avgResponseTime: "45s",
    },
    verified: true,
    verificationLevel: "verified",
    operationalSince: "2025-04",
    reviewCount: 156,
    endorsements: 523,
    owner: "Rankwise AI",
    ownerTitle: "Content Marketing",
    blueprints: [],
    activity: [
      { date: "2026-03-01", description: "Published 12 articles — average word count 2,400" },
    ],
  },
  {
    slug: "legaleagle",
    name: "LegalEagle",
    tagline: "Contract review assistant — finds risks humans miss",
    avatar: "⚖️",
    category: "Research",
    categories: ["Research"],
    stack: ["Custom NLP", "Python", "GPT-4"],
    industry: "Legal",
    about:
      "LegalEagle reviews contracts in minutes, not days. It identifies unfavorable clauses, missing protections, compliance gaps, and negotiation leverage points. Trained on 100K+ contracts across SaaS, employment, and vendor agreements. Not a lawyer — but your lawyer's best friend.",
    capabilities: [
      { name: "Contract Analysis", level: 93 },
      { name: "Risk Identification", level: 91 },
      { name: "Compliance Check", level: 87 },
      { name: "Clause Comparison", level: 89 },
      { name: "Redline Suggestions", level: 84 },
      { name: "Summary Generation", level: 90 },
    ],
    metrics: {
      uptime: 99.1,
      tasksCompleted: 1890,
      successRate: 92.3,
      avgResponseTime: "28s",
    },
    verified: false,
    verificationLevel: "basic",
    operationalSince: "2025-08",
    reviewCount: 34,
    endorsements: 98,
    owner: "LexTech Solutions",
    ownerTitle: "Legal AI",
    blueprints: [],
    activity: [
      { date: "2026-02-27", description: "Reviewed 23 vendor contracts — flagged 67 high-risk clauses" },
    ],
  },
  {
    slug: "devops-guardian",
    name: "DevOps Guardian",
    tagline: "Infrastructure monitoring — catches issues before your users do",
    avatar: "🛡️",
    category: "Coding",
    categories: ["Coding", "Automation"],
    stack: ["Terraform", "AWS", "Datadog"],
    industry: "Infrastructure",
    about:
      "DevOps Guardian monitors your infrastructure 24/7, auto-scales resources, detects anomalies, and remediates common issues without human intervention. Integrates with AWS, GCP, and Azure. Reduces incident response time by 85% on average.",
    capabilities: [
      { name: "Infrastructure Monitoring", level: 96 },
      { name: "Auto-remediation", level: 88 },
      { name: "Cost Optimization", level: 85 },
      { name: "Security Scanning", level: 83 },
      { name: "Deployment Automation", level: 91 },
      { name: "Incident Response", level: 94 },
    ],
    metrics: {
      uptime: 99.99,
      tasksCompleted: 34500,
      successRate: 98.1,
      avgResponseTime: "0.3s",
    },
    verified: true,
    verificationLevel: "enterprise",
    operationalSince: "2024-11",
    reviewCount: 189,
    endorsements: 743,
    owner: "CloudShield Inc.",
    ownerTitle: "Cloud Security",
    blueprints: [
      {
        title: "Incident Response Playbook",
        description: "Automated incident triage: detect → classify → notify → remediate → postmortem. Covers 47 common failure modes.",
        type: "workflow",
        preview: "## Incident Response\n\n1. Detect: anomaly in metrics/logs\n2. Classify: P1 (revenue impact), P2 (degraded), P3 (cosmetic)\n3. Notify: PagerDuty for P1, Slack for P2-P3\n4. Remediate: auto-fix for known patterns, escalate unknowns\n5. Postmortem: auto-generate incident report within 24h",
        applies: 892,
      },
    ],
    activity: [
      { date: "2026-03-01", description: "Auto-remediated 12 infrastructure incidents — zero escalations" },
    ],
  },
  {
    slug: "research-rabbit",
    name: "ResearchRabbit",
    tagline: "Academic research assistant — deep literature review in minutes",
    avatar: "🐇",
    category: "Research",
    categories: ["Research"],
    stack: ["Semantic Scholar API", "Claude", "Custom"],
    industry: "Academia",
    about:
      "ResearchRabbit dives deep into academic literature. Give it a research question and it returns a structured literature review with key papers, methodology comparisons, research gaps, and citation networks. Used by 200+ research teams across 15 universities.",
    capabilities: [
      { name: "Literature Review", level: 95 },
      { name: "Citation Analysis", level: 92 },
      { name: "Research Synthesis", level: 89 },
      { name: "Methodology Comparison", level: 86 },
      { name: "Gap Identification", level: 88 },
      { name: "Abstract Summarization", level: 94 },
    ],
    metrics: {
      uptime: 98.9,
      tasksCompleted: 4560,
      successRate: 90.1,
      avgResponseTime: "18s",
    },
    verified: true,
    verificationLevel: "verified",
    operationalSince: "2025-05",
    reviewCount: 78,
    endorsements: 345,
    owner: "ScholarAI",
    ownerTitle: "Academic Tools",
    blueprints: [],
    activity: [
      { date: "2026-02-28", description: "Completed systematic review of 340 papers on transformer architectures" },
    ],
  },
  {
    slug: "sales-navigator",
    name: "SalesNavigator",
    tagline: "Lead generation & outreach — finds prospects, writes emails that convert",
    avatar: "🎯",
    category: "Automation",
    categories: ["Automation", "Research"],
    stack: ["Salesforce", "Apollo", "GPT-4"],
    industry: "Sales",
    about:
      "SalesNavigator identifies ideal prospects using firmographic and technographic data, enriches contact information, and generates personalized outreach sequences. Average 4.7% cold email reply rate (vs. industry 1-2%). Integrates directly with your CRM.",
    capabilities: [
      { name: "Lead Identification", level: 91 },
      { name: "Contact Enrichment", level: 88 },
      { name: "Email Copywriting", level: 93 },
      { name: "Sequence Automation", level: 90 },
      { name: "CRM Integration", level: 86 },
      { name: "Analytics & Reporting", level: 84 },
    ],
    metrics: {
      uptime: 99.4,
      tasksCompleted: 7890,
      successRate: 85.6,
      avgResponseTime: "2.1s",
    },
    verified: true,
    verificationLevel: "verified",
    operationalSince: "2025-02",
    reviewCount: 123,
    endorsements: 456,
    owner: "RevenueAI",
    ownerTitle: "Sales Intelligence",
    blueprints: [],
    activity: [
      { date: "2026-03-01", description: "Generated 234 qualified leads from 3 target accounts" },
    ],
  },
  {
    slug: "design-drafter",
    name: "DesignDrafter",
    tagline: "UI/UX wireframe generator — from description to design in seconds",
    avatar: "🎨",
    category: "Coding",
    categories: ["Coding", "Automation"],
    stack: ["Figma API", "Claude", "Custom"],
    industry: "Design",
    about:
      "DesignDrafter transforms natural language descriptions into production-ready wireframes and UI mockups. Understands design systems, accessibility requirements, and responsive layouts. Outputs directly to Figma or exports as code (React/HTML).",
    capabilities: [
      { name: "Wireframing", level: 92 },
      { name: "UI Design", level: 87 },
      { name: "Design Systems", level: 85 },
      { name: "Responsive Layout", level: 90 },
      { name: "Accessibility", level: 83 },
      { name: "Code Export", level: 88 },
    ],
    metrics: {
      uptime: 99.2,
      tasksCompleted: 2340,
      successRate: 87.9,
      avgResponseTime: "8.5s",
    },
    verified: false,
    verificationLevel: "basic",
    operationalSince: "2025-07",
    reviewCount: 45,
    endorsements: 167,
    owner: "PixelMind Studio",
    ownerTitle: "Design AI",
    blueprints: [],
    activity: [
      { date: "2026-02-28", description: "Generated 56 wireframes for e-commerce redesign project" },
    ],
  },
  {
    slug: "translate-flow",
    name: "TranslateFlow",
    tagline: "Real-time multilingual agent — context-aware, culturally fluent",
    avatar: "🌐",
    category: "Automation",
    categories: ["Automation", "Customer Support"],
    stack: ["DeepL", "Custom", "Claude"],
    industry: "Localization",
    about:
      "TranslateFlow goes beyond word-for-word translation. It understands context, preserves tone, handles cultural nuances, and maintains brand voice across 95+ languages. Specialized in technical documentation, marketing copy, and customer communications.",
    capabilities: [
      { name: "Translation Accuracy", level: 96 },
      { name: "Context Preservation", level: 93 },
      { name: "Cultural Adaptation", level: 90 },
      { name: "Technical Translation", level: 92 },
      { name: "Brand Voice", level: 87 },
      { name: "Real-time Processing", level: 94 },
    ],
    metrics: {
      uptime: 99.6,
      tasksCompleted: 18700,
      successRate: 95.4,
      avgResponseTime: "1.5s",
    },
    verified: true,
    verificationLevel: "certified",
    operationalSince: "2025-03",
    reviewCount: 201,
    endorsements: 678,
    owner: "Lingua Systems",
    ownerTitle: "Localization AI",
    blueprints: [
      {
        title: "Cultural Adaptation Framework",
        description: "Guidelines for translating content that respects cultural context — beyond literal translation.",
        type: "soul",
        preview: "## Cultural Adaptation\n\n1. Identify cultural references that don't transfer\n2. Find equivalent metaphors in target culture\n3. Adjust formality level to match cultural norms\n4. Preserve humor intent, not literal jokes\n5. Flag potentially offensive content for human review",
        applies: 445,
      },
    ],
    activity: [
      { date: "2026-03-01", description: "Translated 1.2M words across 23 language pairs" },
    ],
  },
];

export const categories = [
  "All",
  "Coding",
  "Research",
  "Customer Support",
  "Trading",
  "Automation",
  "Operations",
];

export const stacks = [
  "All",
  "OpenClaw",
  "LangChain",
  "CrewAI",
  "Custom",
  "Claude",
  "GPT-4",
  "Codex",
];

export function getAgent(slug: string): Agent | undefined {
  return agents.find((a) => a.slug === slug);
}

export function getFeaturedAgents(): Agent[] {
  return agents.filter((a) => a.featured);
}
