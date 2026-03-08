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

export type AgentSortOption = 'newest' | 'performance' | 'alpha' | 'popular' | 'rated';

export type AgentFilters = {
  search?: string;
  /** Maps to DB `category` column */
  role?: string;
  /** Matched against DB `stack` array */
  framework?: string;
  verified?: boolean;
  sort?: AgentSortOption;
  limit?: number;
  offset?: number;
};

export type AgentListResult = {
  agents: AgentWithDetails[];
  total: number;
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

export async function getAgents(filters: AgentFilters = {}): Promise<AgentWithDetails[]> {
  const supabase = await createClient();

  const { data, error } = await supabase.from('agents').select(AGENT_LIST_SELECT);

  if (error) {
    console.error('Error fetching agents:', error);
    return [];
  }

  return (data ?? []) as AgentWithDetails[];
}

export async function getAgentsFiltered(
  filters: AgentFilters = {}
): Promise<AgentListResult> {
  const supabase = await createClient();
  const {
    search,
    role,
    framework,
    verified,
    sort = 'newest',
    limit = 20,
    offset = 0,
  } = filters;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let query: any = supabase
    .from('agents')
    .select(AGENT_LIST_SELECT, { count: 'exact' })
    .range(offset, offset + limit - 1);

  if (search?.trim()) {
    const term = search.trim();
    query = query.or(
      `name.ilike.%${term}%,tagline.ilike.%${term}%,about.ilike.%${term}%`
    );
  }

  if (role && role !== 'all') {
    query = query.eq('category', role);
  }

  if (framework && framework !== 'all') {
    query = query.contains('stack', [framework]);
  }

  if (typeof verified === 'boolean') {
    query = query.eq('verified', verified);
  }

  switch (sort) {
    case 'performance':
    case 'popular':
    case 'rated':
      query = query.order('endorsement_count', { ascending: false });
      break;
    case 'alpha':
      query = query.order('name', { ascending: true });
      break;
    case 'newest':
    default:
      query = query.order('created_at', { ascending: false });
      break;
  }

  const { data, error, count } = await query;

  if (error) {
    console.error('getAgentsFiltered error:', error);
    return { agents: [], total: 0 };
  }

  return {
    agents: (data as AgentWithDetails[]) ?? [],
    total: count ?? 0,
  };
}

export async function getAgentById(id: string): Promise<AgentWithDetails | null> {
  const supabase = await createClient();

  const { data, error } = await supabase
    .from('agents')
    .select(AGENT_FULL_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error(`Error fetching agent by id "${id}":`, error);
    return null;
  }

  return (data as AgentWithDetails | null) ?? null;
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
