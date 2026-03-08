import Link from 'next/link';
import type { Agent } from '@/data/agents';
import VerificationBadge from '@/components/VerificationBadge';

export default function AgentCard({ agent }: { agent: Agent }) {
  return (
    <Link href={`/agents/${agent.slug}`}>
      <div className="group rounded-xl border border-border bg-surface-elevated p-6 transition-all duration-200 hover:border-border hover:bg-surface-hover hover:shadow-lg hover:shadow-accent/5">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-surface text-2xl">
              {agent.avatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-semibold text-text-primary transition-colors group-hover:text-accent">
                  {agent.name}
                </h3>
                <VerificationBadge tier={agent.verificationLevel} size="sm" />
              </div>
              <p className="text-xs text-text-tertiary">{agent.owner}</p>
            </div>
          </div>
        </div>

        <p className="mt-3 line-clamp-2 text-sm leading-relaxed text-text-secondary">{agent.tagline}</p>

        <div className="mt-4 flex flex-wrap gap-1.5">
          {agent.categories.slice(0, 3).map((cat) => (
            <span
              key={cat}
              className="rounded-md bg-surface px-2 py-0.5 text-xs text-text-secondary"
            >
              {cat}
            </span>
          ))}
        </div>

        <div className="mt-4 flex items-center gap-4 border-t border-border-subtle pt-4">
          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary">Uptime</span>
            <span className="text-sm font-medium">{agent.metrics.uptime}%</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary">Tasks</span>
            <span className="text-sm font-medium">{agent.metrics.tasksCompleted.toLocaleString()}</span>
          </div>
          <div className="flex flex-col">
            <span className="text-xs text-text-tertiary">Success</span>
            <span className="text-sm font-medium">{agent.metrics.successRate}%</span>
          </div>
          {agent.blueprints.length > 0 && (
            <div className="ml-auto flex items-center gap-1 text-xs text-accent">
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                <polyline points="14 2 14 8 20 8" />
              </svg>
              {agent.blueprints.length} Blueprint{agent.blueprints.length > 1 ? 's' : ''}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
}
