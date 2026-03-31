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
  agentId?: string;
  agentName?: string;
  endpoint?: string;
  labels?: {
    name: string;
    email: string;
    budget: string;
    timeline: string;
    message: string;
    submit: string;
    submitting: string;
    successTitle: string;
    successDescription?: string;
    genericError: string;
    unexpectedError: string;
  };
  placeholders?: {
    name: string;
    email: string;
    message: string;
  };
  budgetOptions?: { value: string; label: string }[];
  timelineOptions?: { value: string; label: string }[];
};

type FormState = {
  name: string;
  email: string;
  message: string;
  budget_range: string;
  timeline: string;
};

const DEFAULT_LABELS: NonNullable<Props['labels']> = {
  name: 'Your name',
  email: 'Email address',
  budget: 'Budget range',
  timeline: 'Timeline',
  message: 'What do you need help with?',
  submit: 'Send Request',
  submitting: 'Sending...',
  successTitle: "We've sent your request to the agent owner",
  genericError: 'Failed to submit request. Please try again.',
  unexpectedError: 'Unexpected error. Please try again.',
};

const DEFAULT_PLACEHOLDERS: NonNullable<Props['placeholders']> = {
  name: 'Alex Johnson',
  email: 'alex@example.com',
  message: 'Describe your project, goals, and any specific requirements...',
};

export default function ConsultingRequestForm({
  agentId,
  agentName,
  endpoint = '/api/consulting-requests',
  labels = DEFAULT_LABELS,
  placeholders = DEFAULT_PLACEHOLDERS,
  budgetOptions = BUDGET_OPTIONS,
  timelineOptions = TIMELINE_OPTIONS,
}: Props) {
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
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, ...(agentId ? { agent_id: agentId } : {}) }),
      });

      const payload = (await res.json()) as { error?: string };

      if (!res.ok) {
        setError(payload.error ?? labels.genericError);
        return;
      }

      setSuccess(true);
    } catch {
      setError(labels.unexpectedError);
    } finally {
      setSubmitting(false);
    }
  }

  if (success) {
    const successDescription =
      labels.successDescription
        ?.replace('{agentName}', agentName ?? 'this agent')
        .replace('{email}', form.email) ??
      `The owner of ${agentName ?? 'this agent'} will get back to you at ${form.email}.`;

    return (
      <div className="rounded-xl border border-accent/30 bg-accent/5 p-6 text-center">
        <div className="mb-2 text-2xl">✅</div>
        <p className="font-medium text-text-primary">{labels.successTitle}</p>
        <p className="mt-1 text-sm text-text-tertiary">{successDescription}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="consulting-name"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {labels.name}
          </label>
          <input
            id="consulting-name"
            name="name"
            type="text"
            required
            value={form.name}
            onChange={handleChange}
            placeholder={placeholders.name}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
          />
        </div>
        <div>
          <label
            htmlFor="consulting-email"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {labels.email}
          </label>
          <input
            id="consulting-email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={handleChange}
            placeholder={placeholders.email}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
          />
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="consulting-budget"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {labels.budget}
          </label>
          <select
            id="consulting-budget"
            name="budget_range"
            required
            value={form.budget_range}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
          >
            {budgetOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label
            htmlFor="consulting-timeline"
            className="mb-1.5 block text-sm font-medium text-text-secondary"
          >
            {labels.timeline}
          </label>
          <select
            id="consulting-timeline"
            name="timeline"
            required
            value={form.timeline}
            onChange={handleChange}
            className="w-full rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary focus:border-accent focus:outline-none"
          >
            {timelineOptions.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label
          htmlFor="consulting-message"
          className="mb-1.5 block text-sm font-medium text-text-secondary"
        >
          {labels.message}
        </label>
        <textarea
          id="consulting-message"
          name="message"
          required
          rows={4}
          value={form.message}
          onChange={handleChange}
          placeholder={placeholders.message}
          className="w-full resize-none rounded-lg border border-border bg-surface px-3 py-2 text-sm text-text-primary placeholder:text-text-tertiary focus:border-accent focus:outline-none"
        />
      </div>

      {error && <p className="text-sm text-red-400">{error}</p>}

      <button
        type="submit"
        disabled={submitting}
        className="w-full rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent/90 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? labels.submitting : labels.submit}
      </button>
    </form>
  );
}
