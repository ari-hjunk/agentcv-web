import type { Agent as MockAgent } from '@/data/agents';
import type { AgentWithDetails } from '@/lib/agents';

export type VerificationLevel = 'basic' | 'verified' | 'certified' | 'enterprise';

export function normalizeVerificationLevel(level: string | null | undefined): VerificationLevel {
  if (level === 'verified' || level === 'certified' || level === 'enterprise') {
    return level;
  }
  return 'basic';
}

export function formatResponseTimeMs(ms: number | null | undefined): string {
  const safeMs = ms ?? 0;
  return `${(safeMs / 1000).toFixed(1)}s`;
}

export function getAgentOwnerDisplay(agent: AgentWithDetails): string {
  return agent.owner_display || agent.owner?.display_name || 'Unknown Owner';
}

export function mockAgentToAgentWithDetails(agent: MockAgent): AgentWithDetails {
  const ownerId = `mock-owner-${agent.slug}`;

  return {
    id: `mock-${agent.slug}`,
    slug: agent.slug,
    name: agent.name,
    tagline: agent.tagline,
    avatar: agent.avatar,
    category: agent.category,
    categories: agent.categories,
    stack: agent.stack,
    industry: agent.industry,
    about: agent.about,
    verified: agent.verified,
    verification_level: agent.verificationLevel,
    operational_since: agent.operationalSince,
    review_count: agent.reviewCount,
    endorsement_count: agent.endorsements,
    owner_id: ownerId,
    owner_display: agent.owner,
    owner_title: agent.ownerTitle,
    featured: agent.featured ?? false,
    created_at: '',
    updated_at: '',
    agent_metrics: [
      {
        id: `mock-metric-${agent.slug}`,
        agent_id: `mock-${agent.slug}`,
        uptime_days: null,
        uptime_pct: agent.metrics.uptime,
        tasks_completed: agent.metrics.tasksCompleted,
        success_rate: agent.metrics.successRate,
        avg_response_time_ms: parseAvgResponseMs(agent.metrics.avgResponseTime),
        revenue_generated: null,
        github_commits: null,
        last_updated: '',
      },
    ],
    agent_capabilities: agent.capabilities.map((cap, index) => ({
      id: `mock-cap-${agent.slug}-${index}`,
      agent_id: `mock-${agent.slug}`,
      capability_name: cap.name,
      level: cap.level,
      created_at: '',
    })),
    owner: {
      id: ownerId,
      username: ownerId,
      display_name: agent.owner,
      bio: null,
      avatar_url: null,
      website_url: null,
      consulting_available: false,
      consulting_rate: null,
      created_at: '',
      updated_at: '',
    },
    agent_activity: agent.activity.map((item, index) => ({
      id: `mock-activity-${agent.slug}-${index}`,
      agent_id: `mock-${agent.slug}`,
      date: item.date,
      description: item.description,
      type: 'update',
      created_at: '',
    })),
    agent_blueprints: agent.blueprints.map((bp, index) => ({
      id: `mock-blueprint-${agent.slug}-${index}`,
      agent_id: `mock-${agent.slug}`,
      title: bp.title,
      description: bp.description,
      type: bp.type,
      external_url: null,
      created_at: '',
      updated_at: '',
    })),
  };
}

export function toCardAgent(agent: AgentWithDetails): MockAgent {
  const metrics = agent.agent_metrics[0];

  return {
    slug: agent.slug,
    name: agent.name,
    tagline: agent.tagline ?? '',
    avatar: agent.avatar ?? '🤖',
    category: agent.category,
    categories: agent.categories,
    stack: agent.stack,
    industry: agent.industry ?? 'General',
    about: agent.about ?? '',
    capabilities: agent.agent_capabilities.map((cap) => ({
      name: cap.capability_name,
      level: cap.level,
    })),
    metrics: {
      uptime: metrics?.uptime_pct ?? 0,
      tasksCompleted: metrics?.tasks_completed ?? 0,
      successRate: metrics?.success_rate ?? 0,
      avgResponseTime: formatResponseTimeMs(metrics?.avg_response_time_ms),
    },
    verified: agent.verified,
    verificationLevel: normalizeVerificationLevel(agent.verification_level),
    operationalSince: agent.operational_since ?? '',
    reviewCount: agent.review_count,
    endorsements: agent.endorsement_count,
    owner: getAgentOwnerDisplay(agent),
    ownerTitle: agent.owner_title ?? '',
    blueprints: (agent.agent_blueprints ?? []).map((bp) => ({
      title: bp.title,
      description: bp.description ?? '',
      type: normalizeBlueprintType(bp.type),
      preview: '',
      applies: 0,
    })),
    activity: (agent.agent_activity ?? []).map((item) => ({
      date: item.date,
      description: item.description,
    })),
    featured: agent.featured,
  };
}

function parseAvgResponseMs(avgResponseTime: string): number {
  const trimmed = avgResponseTime.trim().toLowerCase();
  if (trimmed.endsWith('ms')) {
    const value = Number.parseFloat(trimmed.slice(0, -2));
    return Number.isFinite(value) ? value : 0;
  }

  const valueInSeconds = Number.parseFloat(trimmed.replace('s', ''));
  if (!Number.isFinite(valueInSeconds)) {
    return 0;
  }

  return valueInSeconds * 1000;
}

function normalizeBlueprintType(type: string | null): 'soul' | 'workflow' | 'lesson' {
  if (type === 'soul' || type === 'workflow' || type === 'lesson') {
    return type;
  }
  return 'workflow';
}
