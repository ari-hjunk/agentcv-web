'use client';

import { useState } from 'react';

type Props = {
  initialValue: boolean;
};

export default function ConsultingAvailabilityToggle({ initialValue }: Props) {
  const [available, setAvailable] = useState(initialValue);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleToggle() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/profile/consulting', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ consulting_available: !available }),
      });
      const payload = (await res.json()) as { consulting_available?: boolean; error?: string };
      if (!res.ok) {
        setError(payload.error ?? 'Failed to update.');
        return;
      }
      if (typeof payload.consulting_available === 'boolean') {
        setAvailable(payload.consulting_available);
      }
    } catch {
      setError('Unexpected error. Please try again.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <button
        type="button"
        onClick={handleToggle}
        disabled={loading}
        aria-pressed={available}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 focus:ring-offset-surface disabled:cursor-not-allowed disabled:opacity-60 ${
          available ? 'bg-accent' : 'bg-surface-elevated border border-border'
        }`}
      >
        <span
          className={`inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform ${
            available ? 'translate-x-6' : 'translate-x-1'
          }`}
        />
      </button>
      <span className="text-sm text-text-secondary">
        {available ? (
          <span className="text-accent font-medium">Open for consulting</span>
        ) : (
          'Consulting unavailable'
        )}
      </span>
      {error && <span className="ml-2 text-xs text-red-400">{error}</span>}
    </div>
  );
}
