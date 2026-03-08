import { NextRequest, NextResponse } from 'next/server';
import { agents as mockAgents, stacks } from '@/data/agents';
import { getAgentsFiltered, type AgentSortOption } from '@/lib/agents';
import { mockAgentToAgentWithDetails, toCardAgent } from '@/lib/agent-adapters';

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  const search = searchParams.get('search') ?? undefined;
  const role = searchParams.get('role') ?? undefined;
  const framework = searchParams.get('framework') ?? undefined;
  const verifiedParam = searchParams.get('verified');
  const sort = (searchParams.get('sort') ?? 'newest') as AgentSortOption;
  const limitParam = searchParams.get('limit');
  const offsetParam = searchParams.get('offset');

  const verified =
    verifiedParam === 'true' ? true : verifiedParam === 'false' ? false : undefined;
  const limit = limitParam ? Math.min(parseInt(limitParam, 10), 100) : 20;
  const offset = offsetParam ? parseInt(offsetParam, 10) : 0;

  const result = await getAgentsFiltered({
    search,
    role,
    framework,
    verified,
    sort,
    limit,
    offset,
  });

  // Fall back to mock data if DB is empty or unavailable
  if (result.agents.length === 0 && result.total === 0) {
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

    const paginated = mocked.slice(offset, offset + limit);
    return NextResponse.json({
      agents: paginated.map(toCardAgent),
      total: mocked.length,
      categories: stacks,
    });
  }

  return NextResponse.json({
    agents: result.agents.map(toCardAgent),
    total: result.total,
  });
}
