/**
 * /agent/[id] — Agent detail page accessed by UUID or slug.
 * Looks up by ID first, then by slug. Falls back to mock data.
 */
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { createClient } from '@/lib/supabase/server';
import { getAgent } from '@/data/agents';
import { toCardAgent } from '@/lib/agent-adapters';
import type { AgentWithDetails } from '@/lib/agents';
import AgentProfileClient from '@/app/agents/[slug]/AgentProfileClient';

const AGENT_FULL_SELECT = `
  *,
  agent_metrics(*),
  agent_capabilities(*),
  owner:profiles!owner_id(*),
  agent_activity(*),
  agent_blueprints(*)
`;

async function getAgentById(id: string): Promise<AgentWithDetails | null> {
  const supabase = await createClient();

  // Try by UUID id first
  const { data: byId } = await supabase
    .from('agents')
    .select(AGENT_FULL_SELECT)
    .eq('id', id)
    .maybeSingle();

  if (byId) return byId as AgentWithDetails;

  // Try by slug
  const { data: bySlug } = await supabase
    .from('agents')
    .select(AGENT_FULL_SELECT)
    .eq('slug', id)
    .maybeSingle();

  return (bySlug as AgentWithDetails | null) ?? null;
}

type Props = { params: Promise<{ id: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const dbAgent = await getAgentById(id);
  if (dbAgent) {
    return {
      title: `${dbAgent.name} — AgentCV`,
      description: dbAgent.tagline ?? undefined,
    };
  }
  const mock = getAgent(id);
  if (mock) {
    return { title: `${mock.name} — AgentCV`, description: mock.tagline };
  }
  return { title: 'Agent Not Found — AgentCV' };
}

export default async function AgentByIdPage({ params }: Props) {
  const { id } = await params;

  const dbAgent = await getAgentById(id);
  const agent = dbAgent ? toCardAgent(dbAgent) : getAgent(id);

  if (!agent) notFound();

  return <AgentProfileClient agent={agent} />;
}
