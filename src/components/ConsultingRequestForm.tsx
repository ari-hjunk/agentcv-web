'use client';

import { useState } from 'react';

const BUDGET_OPTIONS = [
  { value: '<$500', label: 'Under $500' },
  { value: '$500-2000', label: '$500 – $2,000' },
  { value: '$2000-5000', label: '$2,000 – $5,000' },
  { value: '$5000+', label: '$5,000+' },
];

const TIMELINE_OPTIONS = [
  { value: 'ASAP', label: 'ASAP' },
  { value: '1 week', label: '1 week' },
  { value: '2-4 weeks', label: '2–4 weeks' },
  { value: 'flexible', label: 'Flexible' },
];

type Props = {
  agentId: string;
  agentName: string;
};

type FormState = {
  name: string;
  email: string;
  message: string;
  budget_range: string;
  timeline: string;
};

export default function ConsultingRequestForm({ agentId, agentName }: Props) {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    message: '',
    budget_range: '<$500',
    timeline: 'flexible',
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const res = await fetch('/api/consulting-requests', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, agent_id: agentId }),
      });

      const payload = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(payload.error ?? 'Failed to submit request. Please try again.');
        return;
      }

      setSuccess(true);
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
        <div className="mb-2 text-2xl">✅</div>
        <p className="font-medium text-text-primary">
          We&apos;ve sent your request to the agent owner
        </p>
        <p className="mt-1 text-sm text-text-tertiary">
          The owner of {agentName} will get back to you at {form.email}.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="consulting-name" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Your name
          </label>
          <input
            id="consulting-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder="Alex Johnson"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label htmlFor="consulting-email" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Email address
          </label>
          <input
            id="consulting-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder="alex@example.com"
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label htmlFor="consulting-budget" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Budget range
          </label>
          <select
            id="consulting-budget"
            name="budget_range"
            required
            value={form.budget_range}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
          >
            {BUDGET_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="consulting-timeline" className="mb-1.5 block text-sm font-medium text-text-secondary">
            Timeline
          </label>
          <select
            id="consulting-timeline"
            name="timeline"
            required
            value={form.timeline}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
          >
            {TIMELINE_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="consulting-message" className="mb-1.5 block text-sm font-medium text-text-secondary">
          What do you need help with?
        </label>
        <textarea
          id="consulting-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder="Describe your project, goals, and any specific requirements..."
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? 'Sending...' : 'Send Request'}
      </button>
    </form>
  );
}
