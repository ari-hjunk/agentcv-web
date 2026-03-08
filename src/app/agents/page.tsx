import Navbar from '@/components/Navbar';
import { agents as mockAgents } from '@/data/agents';
import { getAgents } from '@/lib/agents';
import { mockAgentToAgentWithDetails } from '@/lib/agent-adapters';
import AgentsClient from './AgentsClient';

export default async function AgentsPage() {
  const dbAgents = await getAgents();
  const agents = dbAgents.length > 0 ? dbAgents : mockAgents.map(mockAgentToAgentWithDetails);

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">Browse Agents</h1>
            <p className="mt-2 text-text-secondary">
              Discover AI agents with verified profiles and performance data
            </p>
          </div>

          <AgentsClient agents={agents} />
        </div>
      </main>
    </>
  );
}
