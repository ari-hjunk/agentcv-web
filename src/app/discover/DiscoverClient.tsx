'use client';

import { useRouter, useSearchParams, usePathname } from 'next/navigation';
import { useCallback, useTransition } from 'react';
import AgentCard from '@/components/AgentCard';
import type { Agent } from '@/data/agents';
import type { AgentSortOption } from '@/lib/agents';

type Props = {
  agents: Agent[];
  total: number;
  categories: string[];
  stacks: string[];
  currentSearch: string;
  currentRole: string;
  currentFramework: string;
  currentSort: AgentSortOption;
  currentVerified: boolean | undefined;
};

const SORT_OPTIONS: { value: AgentSortOption; label: string }[] = [
  { value: 'newest', label: 'Newest' },
  { value: 'performance', label: 'Performance' },
  { value: 'alpha', label: 'A → Z' },
];

export default function DiscoverClient({
  agents,
  total,
  categories,
  stacks,
  currentSearch,
  currentRole,
  currentFramework,
  currentSort,
  currentVerified,
}: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  const updateParam = useCallback(
    (updates: Record<string, string | undefined>) => {
      const params = new URLSearchParams(searchParams.toString());
      for (const [key, value] of Object.entries(updates)) {
        if (value === undefined || value === '' || value === 'all') {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      }
      startTransition(() => {
        const qs = params.toString();
        router.push(`${pathname}${qs ? `?${qs}` : ''}`);
      });
    },
    [searchParams, pathname, router]
  );

  return (
    <div className={isPending ? 'opacity-60 pointer-events-none transition-opacity' : ''}>
      {/* Search bar */}
      <div className="relative mb-4">
        <svg
          className="absolute left-3 top-1/2 -translate-y-1/2 text-text-tertiary"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          placeholder="Search agents by name, description..."
          defaultValue={currentSearch}
          onChange={(e) => {
            const val = e.target.value;
            const t = setTimeout(() => updateParam({ search: val || undefined }), 350);
            return () => clearTimeout(t);
          }}
          className="w-full rounded-lg border border-border bg-surface-elevated py-2.5 pl-10 pr-4 text-sm text-text-primary placeholder-text-tertiary outline-none transition-colors focus:border-accent"
        />
      </div>

      {/* Filters row */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Category / Role */}
        {categories.length > 1 && (
          <select
            value={currentRole || 'all'}
            onChange={(e) => updateParam({ role: e.target.value })}
            className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-text-secondary outline-none focus:border-accent"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat === 'All' ? 'all' : cat}>
                {cat}
              </option>
            ))}
          </select>
        )}

        {/* Stack / Framework */}
        {stacks.length > 1 && (
          <select
            value={currentFramework || 'all'}
            onChange={(e) => updateParam({ framework: e.target.value })}
            className="rounded-lg border border-border bg-surface-elevated px-3 py-2 text-sm text-text-secondary outline-none focus:border-accent"
          >
            {stacks.map((s) => (
              <option key={s} value={s === 'All' ? 'all' : s}>
                {s === 'All' ? 'All Frameworks' : s}
              </option>
            ))}
          </select>
        )}

        {/* Verified */}
        <label className="flex cursor-pointer items-center gap-2 text-sm text-text-secondary">
          <input
            type="checkbox"
            checked={currentVerified === true}
            onChange={(e) =>
              updateParam({ verified: e.target.checked ? 'true' : undefined })
            }
            className="accent-accent h-4 w-4"
          />
          Verified only
        </label>

        {/* Sort tabs */}
        <div className="ml-auto flex items-center gap-1.5">
          {SORT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => updateParam({ sort: opt.value })}
              className={`rounded-lg px-3 py-1.5 text-sm font-medium transition-all ${
                currentSort === opt.value
                  ? 'bg-accent text-white'
                  : 'border border-border bg-surface-elevated text-text-secondary hover:text-text-primary'
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>

        {/* Count */}
        <span className="text-sm text-text-tertiary whitespace-nowrap">
          {total} agent{total !== 1 ? 's' : ''}
        </span>
      </div>

      {/* Agent grid */}
      {agents.length === 0 ? (
        <div className="py-20 text-center">
          <p className="text-5xl mb-4">🤖</p>
          <h3 className="text-lg font-semibold text-text-primary">No agents found</h3>
          <p className="mt-2 text-sm text-text-secondary">Try adjusting your search or filters.</p>
          <button
            type="button"
            onClick={() => router.push(pathname)}
            className="mt-4 text-sm font-medium text-accent hover:text-accent-hover"
          >
            Clear all filters
          </button>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      )}
    </div>
  );
}
