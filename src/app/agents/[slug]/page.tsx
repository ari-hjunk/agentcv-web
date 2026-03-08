import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { getAgent } from '@/data/agents';
import { mockAgentToAgentWithDetails } from '@/lib/agent-adapters';
import { getAgentBySlug } from '@/lib/agents';
import AgentProfileClient from './AgentProfileClient';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const dbAgent = await getAgentBySlug(slug);
  const mockAgent = getAgent(slug);

  const name = dbAgent?.name ?? mockAgent?.name;
  const tagline = dbAgent?.tagline ?? mockAgent?.tagline;

  if (!name || !tagline) {
    return {
      title: 'Agent Not Found | AgentCV',
      description: 'This agent profile could not be found.',
    };
  }

  return {
    title: `${name} | AgentCV`,
    description: tagline,
  };
}

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
