import type { ReactNode } from 'react';

export type VerificationTier = 'basic' | 'verified' | 'certified' | 'enterprise';
type VerificationSize = 'sm' | 'md' | 'lg';

type VerificationBadgeProps = {
  tier: VerificationTier;
  size?: VerificationSize;
};

type TierConfig = {
  label: string;
  description: string;
  text: string;
  border: string;
  bg: string;
  icon: ReactNode;
};

const SIZE_CLASSES: Record<VerificationSize, { wrapper: string; icon: string; text: string }> = {
  sm: { wrapper: 'h-5 px-2 gap-1', icon: 'w-3 h-3', text: 'text-[11px]' },
  md: { wrapper: 'h-6 px-2.5 gap-1.5', icon: 'w-3.5 h-3.5', text: 'text-xs' },
  lg: { wrapper: 'h-7 px-3 gap-1.5', icon: 'w-4 h-4', text: 'text-sm' },
};

const TIER_CONFIG: Record<VerificationTier, TierConfig> = {
  basic: {
    label: 'Basic',
    description: 'Basic profile. Identity and metrics are self-reported.',
    text: 'text-slate-300',
    border: 'border-slate-500/40',
    bg: 'bg-slate-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <circle cx="12" cy="12" r="6" />
      </svg>
    ),
  },
  verified: {
    label: 'Verified',
    description: 'Verified profile. Ownership has been confirmed.',
    text: 'text-blue-300',
    border: 'border-blue-400/40',
    bg: 'bg-blue-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9.2 16.6 4.7 12l-1.4 1.4 5.9 5.9L21 7.7l-1.4-1.4z" />
      </svg>
    ),
  },
  certified: {
    label: 'Certified',
    description: 'Certified profile. Additional evidence and quality checks completed.',
    text: 'text-amber-300',
    border: 'border-amber-400/40',
    bg: 'bg-amber-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="m12 3.5 2.6 5.3 5.9.9-4.2 4.1 1 5.8-5.3-2.8-5.3 2.8 1-5.8-4.2-4.1 5.9-.9z" />
      </svg>
    ),
  },
  enterprise: {
    label: 'Enterprise',
    description: 'Enterprise profile. Highest trust tier with advanced validation.',
    text: 'text-purple-300',
    border: 'border-purple-400/40',
    bg: 'bg-purple-500/10',
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M12 2.5 21.5 12 12 21.5 2.5 12z" />
      </svg>
    ),
  },
};

export default function VerificationBadge({ tier, size = 'md' }: VerificationBadgeProps) {
  const style = SIZE_CLASSES[size];
  const config = TIER_CONFIG[tier];

  return (
    <span className="group relative inline-flex">
      <span
        className={`inline-flex items-center rounded-full border font-medium ${style.wrapper} ${style.text} ${config.text} ${config.border} ${config.bg}`}
      >
        <span className={style.icon}>{config.icon}</span>
        <span>{config.label}</span>
      </span>
      <span className="pointer-events-none absolute left-1/2 top-full z-10 mt-2 w-64 -translate-x-1/2 rounded-md border border-border bg-surface-elevated px-2.5 py-1.5 text-center text-xs text-text-secondary opacity-0 shadow-md transition-opacity group-hover:opacity-100">
        {config.description}
      </span>
    </span>
  );
}
