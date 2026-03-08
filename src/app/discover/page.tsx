import { Suspense } from 'react';
import type { Metadata } from 'next';
import Navbar from '@/components/Navbar';
import { agents as mockAgents, categories as mockCategories, stacks as mockStacks } from '@/data/agents';
import { getAgentsFiltered, type AgentSortOption } from '@/lib/agents';
import { mockAgentToAgentWithDetails, toCardAgent } from '@/lib/agent-adapters';
import DiscoverClient from './DiscoverClient';

export const metadata: Metadata = {
  title: 'Discover Agents — AgentCV',
  description: 'Browse battle-tested AI agents with verified profiles and real performance data.',
};

type SearchParams = Promise<{
  search?: string;
  role?: string;
  framework?: string;
  verified?: string;
  sort?: string;
}>;

export default async function DiscoverPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const params = await searchParams;

  const search = params.search;
  const role = params.role;
  const framework = params.framework;
  const verifiedParam = params.verified;
  const sort = (params.sort ?? 'newest') as AgentSortOption;

  const verified =
    verifiedParam === 'true' ? true : verifiedParam === 'false' ? false : undefined;

  // Fetch from DB with filters
  const result = await getAgentsFiltered({ search, role, framework, verified, sort });

  // Fall back to mock data if DB is empty
  let agents = result.agents.map(toCardAgent);
  let total = result.total;

  if (agents.length === 0 && total === 0) {
    let mocked = mockAgents.map(mockAgentToAgentWithDetails);

    if (search?.trim()) {
      const q = search.trim().toLowerCase();
      mocked = mocked.filter(
        (a) =>
          a.name.toLowerCase().includes(q) ||
          (a.tagline ?? '').toLowerCase().includes(q) ||
          (a.about ?? '').toLowerCase().includes(q)
      );
    }
    if (role && role !== 'all') {
      mocked = mocked.filter((a) => a.category === role || a.categories.includes(role));
    }
    if (framework && framework !== 'all') {
      mocked = mocked.filter((a) => a.stack.includes(framework));
    }
    if (typeof verified === 'boolean') {
      mocked = mocked.filter((a) => a.verified === verified);
    }

    switch (sort) {
      case 'performance':
      case 'popular':
      case 'rated':
        mocked = [...mocked].sort((a, b) => b.endorsement_count - a.endorsement_count);
        break;
      case 'alpha':
        mocked = [...mocked].sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        mocked = [...mocked].sort(
          (a, b) =>
            new Date(b.operational_since ?? 0).getTime() -
            new Date(a.operational_since ?? 0).getTime()
        );
    }

    agents = mocked.map(toCardAgent);
    total = mocked.length;
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pt-24 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-10">
            <p className="mb-2 text-sm font-medium uppercase tracking-widest text-accent">
              Marketplace
            </p>
            <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
              Discover Agents
            </h1>
            <p className="mt-2 text-text-secondary">
              Browse battle-tested AI agents with verified profiles and real performance data
            </p>
          </div>

          <Suspense>
            <DiscoverClient
              agents={agents}
              total={total}
              categories={mockCategories}
              stacks={mockStacks}
              currentSearch={search ?? ''}
              currentRole={role ?? 'all'}
              currentFramework={framework ?? 'all'}
              currentSort={sort}
              currentVerified={verified}
            />
          </Suspense>
        </div>
      </main>
    </>
  );
}
