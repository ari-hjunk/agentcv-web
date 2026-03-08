import { notFound } from 'next/navigation';
import { getAgent } from '@/data/agents';
import { mockAgentToAgentWithDetails } from '@/lib/agent-adapters';
import { getAgentBySlug } from '@/lib/agents';
import AgentProfileClient from './AgentProfileClient';

export default async function AgentProfilePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const dbAgent = await getAgentBySlug(slug);

  if (dbAgent) {
    return <AgentProfileClient agent={dbAgent} />;
  }

  const mockAgent = getAgent(slug);
  if (!mockAgent) {
    notFound();
  }

  return <AgentProfileClient agent={mockAgentToAgentWithDetails(mockAgent)} />;
}
