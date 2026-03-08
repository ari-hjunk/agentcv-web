'use client';

import { useState, type FormEvent } from 'react';
import type { AgentActivity } from '@/lib/types/database';

type ActivityType = 'deployment' | 'update' | 'achievement' | 'milestone' | 'partnership';

type ActivityFormProps = {
  slug: string;
  onCreated: (entry: AgentActivity) => void;
};

const ACTIVITY_TYPES: ActivityType[] = [
  'deployment',
  'update',
  'achievement',
  'milestone',
  'partnership',
];

export default function ActivityForm({ slug, onCreated }: ActivityFormProps) {
  const today = new Date().toISOString().slice(0, 10);
  const [date, setDate] = useState(today);
  const [description, setDescription] = useState('');
  const [type, setType] = useState<ActivityType>('update');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSuccess(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/agents/${slug}/activity`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ date, description, type }),
      });

      const payload = (await response.json()) as { activity?: AgentActivity; error?: string };

      if (!response.ok || !payload.activity) {
        setError(payload.error ?? 'Failed to publish activity.');
        return;
      }

      onCreated(payload.activity);
      setDescription('');
      setType('update');
      setDate(today);
      setSuccess('Activity posted.');
    } catch {
      setError('Unexpected error while publishing activity.');
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-xl border border-border bg-surface-elevated p-5">
      <h4 className="text-sm font-semibold text-text-primary">Add Activity</h4>
      <p className="mt-1 text-xs text-text-tertiary">Post updates to your public activity feed.</p>

      <div className="mt-4 grid gap-3 md:grid-cols-3">
        <label className="text-xs text-text-secondary">
          Date
          <input
            type="date"
            value={date}
            onChange={(event) => setDate(event.target.value)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          />
        </label>

        <label className="text-xs text-text-secondary md:col-span-2">
          Type
          <select
            value={type}
            onChange={(event) => setType(event.target.value as ActivityType)}
            className="mt-1 w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm"
          >
            {ACTIVITY_TYPES.map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>
        </label>

        <label className="text-xs text-text-secondary md:col-span-3">
          Description
          <textarea
            value={description}
            onChange={(event) => setDescription(event.target.value)}
            rows={3}
            placeholder="Describe what shipped or changed"
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
        {isSubmitting ? 'Publishing...' : 'Publish activity'}
      </button>
    </form>
  );
}
