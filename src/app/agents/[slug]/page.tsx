import { notFound } from 'next/navigation';
import { getAgent } from '@/data/agents';
import { toCardAgent } from '@/lib/agent-adapters';
import { getAgentBySlug } from '@/lib/agents';
import AgentProfileClient from './AgentProfileClient';

export default async function AgentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbAgent = await getAgentBySlug(slug);
  const agent = dbAgent ? toCardAgent(dbAgent) : getAgent(slug);

  if (!agent) {
    notFound();
  }

  return <AgentProfileClient agent={agent} />;
}
