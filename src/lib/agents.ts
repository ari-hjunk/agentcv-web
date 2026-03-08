import { createClient } from '@/lib/supabase/server';
import type {
  Agent,
  AgentActivity,
  AgentBlueprint,
  AgentCapability,
  AgentMetric,
  Profile,
} from '@/lib/types/database';

export type AgentWithDetails = Agent & {
  agent_metrics: AgentMetric[];
  agent_capabilities: AgentCapability[];
  owner: Profile | null;
  agent_activity?: AgentActivity[];
  agent_blueprints?: AgentBlueprint[];
};

const AGENT_LIST_SELECT = `
  *,
  agent_metrics(*),
  agent_capabilities(*),
  owner:profiles!owner_id(*)
`;

const AGENT_FULL_SELECT = `
  ${AGENT_LIST_SELECT},
  agent_activity(*),
  agent_blueprints(*)
`;

export async function getAgents(): Promise<AgentWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('agents').select(AGENT_LIST_SELECT);

  if (error) {
    console.error('Error fetching agents:', error);
    return [];
  }

  return (data ?? []) as AgentWithDetails[];
}

export async function getAgentBySlug(slug: string): Promise<AgentWithDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('agents')
    .select(AGENT_FULL_SELECT)
    .eq('slug', slug)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching agent by slug "${slug}":`, error);
    return null;
  }

  return (data as AgentWithDetails | null) ?? null;
}

export async function getFeaturedAgents(): Promise<AgentWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('agents')
    .select(AGENT_LIST_SELECT)
    .eq('featured', true);

  if (error) {
    console.error('Error fetching featured agents:', error);
    return [];
  }

  return (data ?? []) as AgentWithDetails[];
}
