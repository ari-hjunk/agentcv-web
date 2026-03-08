'use client';

import { useState, type FormEvent } from 'react';
import type { AgentMetric } from '@/lib/types/database';

type MetricsFormProps = {
  slug: string;
  metrics: AgentMetric | null;
  onUpdated: (metrics: AgentMetric) => void;
};

type FormState = {
  uptime_pct: string;
  tasks_completed: string;
  success_rate: string;
  avg_response_time_ms: string;
  revenue_generated: string;
  github_commits: string;
};

function toInitialState(metrics: AgentMetric | null): FormState {
  return {
    uptime_pct: metrics?.uptime_pct?.toString() ?? '',
    tasks_completed: metrics?.tasks_completed?.toString() ?? '',
    success_rate: metrics?.success_rate?.toString() ?? '',
    avg_response_time_ms: metrics?.avg_response_time_ms?.toString() ?? '',
    revenue_generated: metrics?.revenue_generated?.toString() ?? '',
    github_commits: metrics?.github_commits?.toString() ?? '',
  };
}

function parseOptionalNumber(value: string): number | null {
  const trimmed = value.trim();
  if (!trimmed) return null;
  const parsed = Number(trimmed);
  if (!Number.isFinite(parsed)) {
    throw new Error('All numeric fields must be valid numbers.');
  }
  return parsed;
}

export default function MetricsForm({ slug, metrics, onUpdated }: MetricsFormProps) {
  const [form, setForm] = useState<FormState>(toInitialState(metrics));
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);
    setSuccess(null);

    try {
      const payload = {
        uptime_pct: parseOptionalNumber(form.uptime_pct),
        tasks_completed: parseOptionalNumber(form.tasks_completed),
        success_rate: parseOptionalNumber(form.success_rate),
        avg_response_time_ms: parseOptionalNumber(form.avg_response_time_ms),
        revenue_generated: parseOptionalNumber(form.revenue_generated),
        github_commits: parseOptionalNumber(form.github_commits),
      };

      const response = await fetch(`/api/agents/${slug}/metrics`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = (await response.json()) as { metrics?: AgentMetric; error?: string };

      if (!response.ok || !data.metrics) {
        setError(data.error ?? 'Failed to update metrics.');
        return;
      }

      onUpdated(data.metrics);
      setForm(toInitialState(data.metrics));
      setSuccess('Metrics updated successfully.');
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : 'Unexpected error updating metrics.'
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface-elevated p-5">
      <h4 className="text-sm font-semibold text-text-primary">Update Self-Reported Metrics</h4>
      <p className="mt-1 text-xs text-text-tertiary">Only the owner can update these values.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-2">
        <label className="text-xs text-text-secondary">
          Uptime %
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={form.uptime_pct}
            onChange={(event) => setForm((prev) => ({ ...prev, uptime_pct: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs text-text-secondary">
          Success Rate %
          <input
            type="number"
            min="0"
            max="100"
            step="0.01"
            value={form.success_rate}
            onChange={(event) => setForm((prev) => ({ ...prev, success_rate: event.target.value }))}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs text-text-secondary">
          Tasks Completed
          <input
            type="number"
            min="0"
            step="1"
            value={form.tasks_completed}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, tasks_completed: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs text-text-secondary">
          Avg Response Time (ms)
          <input
            type="number"
            min="0"
            step="1"
            value={form.avg_response_time_ms}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, avg_response_time_ms: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs text-text-secondary">
          Revenue Generated (USD)
          <input
            type="number"
            min="0"
            step="0.01"
            value={form.revenue_generated}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, revenue_generated: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs text-text-secondary">
          GitHub Commits
          <input
            type="number"
            min="0"
            step="1"
            value={form.github_commits}
            onChange={(event) =>
              setForm((prev) => ({ ...prev, github_commits: event.target.value }))
            }
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>
      </div>

      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      {success && <p className="mt-3 text-sm text-green-400">{success}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-4 rounded-lg bg-accent px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-accent-hover disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? 'Saving...' : 'Save metrics'}
      </button>
    </form>
  );
}
