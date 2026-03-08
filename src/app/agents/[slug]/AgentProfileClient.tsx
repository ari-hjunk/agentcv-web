'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Navbar from '@/components/Navbar';
import VerificationBadge from '@/components/VerificationBadge';
import MetricsForm from '@/components/MetricsForm';
import ActivityForm from '@/components/ActivityForm';
import { formatResponseTimeMs, normalizeVerificationLevel } from '@/lib/agent-adapters';
import type { AgentWithDetails } from '@/lib/agents';
import type { AgentActivity, AgentMetric } from '@/lib/types/database';
import { createClient } from '@/lib/supabase/client';

type Tab = 'about' | 'capabilities' | 'track-record' | 'blueprints' | 'activity';

function formatNumber(value: number | null | undefined): string {
  return typeof value === 'number' ? value.toLocaleString() : '0';
}

function formatPercent(value: number | null | undefined): string {
  return typeof value === 'number' ? `${value}%` : '0%';
}

function formatCurrency(value: number | null | undefined): string {
  if (typeof value !== 'number') return '$0';
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(value);
}

function sortActivity(items: AgentActivity[]): AgentActivity[] {
  return [...items].sort((a, b) => {
    const left = new Date(a.date).getTime();
    const right = new Date(b.date).getTime();
    return right - left;
  });
}

export default function AgentProfileClient({ agent }: { agent: AgentWithDetails }) {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<Tab>('about');
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [claimError, setClaimError] = useState<string | null>(null);
  const [isClaiming, setIsClaiming] = useState(false);
  const [metrics, setMetrics] = useState<AgentMetric | null>(agent.agent_metrics[0] ?? null);
  const [activity, setActivity] = useState<AgentActivity[]>(sortActivity(agent.agent_activity ?? []));

  useEffect(() => {
    const supabase = createClient();

    async function loadAuth() {
      const { data } = await supabase.auth.getUser();
      setCurrentUserId(data.user?.id ?? null);
      setIsAuthLoading(false);
    }

    void loadAuth();
  }, []);

  const isOwner = useMemo(() => {
    if (!currentUserId) return false;
    return agent.owner_id === currentUserId;
  }, [agent.owner_id, currentUserId]);

  const canClaim = Boolean(currentUserId && !agent.owner_id);

  const tabs: { id: Tab; label: string; count?: number }[] = [
    { id: 'about', label: 'About' },
    { id: 'capabilities', label: 'Capabilities' },
    { id: 'track-record', label: 'Track Record' },
    { id: 'blueprints', label: 'Blueprints', count: (agent.agent_blueprints ?? []).length },
    { id: 'activity', label: 'Activity', count: activity.length },
  ];

  const ownerName = agent.owner_display || agent.owner?.display_name || 'Unknown Owner';
  const ownerUsername = agent.owner?.username;
  const successRate = metrics?.success_rate ?? 0;
  const uptime = metrics?.uptime_pct ?? 0;
  const tasksCompleted = metrics?.tasks_completed ?? 0;
  const avgResponse = formatResponseTimeMs(metrics?.avg_response_time_ms);

  async function handleClaimAgent() {
    setIsClaiming(true);
    setClaimError(null);

    try {
      const response = await fetch('/api/claim-agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ slug: agent.slug }),
      });

      const payload = (await response.json()) as { error?: string };

      if (!response.ok) {
        setClaimError(payload.error ?? 'Unable to claim this agent.');
        return;
      }

      router.refresh();
    } catch {
      setClaimError('Unexpected error while claiming this agent.');
    } finally {
      setIsClaiming(false);
    }
  }

  function handleMetricsUpdated(updated: AgentMetric) {
    setMetrics(updated);
    router.refresh();
  }

  function handleActivityCreated(created: AgentActivity) {
    setActivity((previous) => sortActivity([created, ...previous]));
    router.refresh();
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen pb-20 pt-24">
        <div className="mx-auto max-w-4xl px-6">
          <div className="mb-8 flex items-center gap-2 text-sm text-text-tertiary">
            <Link href="/agents" className="transition-colors hover:text-text-primary">
              Agents
            </Link>
            <span>/</span>
            <span className="text-text-primary">{agent.name}</span>
          </div>

          <div className="mb-8 flex items-start gap-6">
            <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-surface-elevated text-4xl">
              {agent.avatar ?? '🤖'}
            </div>
            <div className="flex-1">
              <div className="flex flex-wrap items-center gap-3">
                <h1 className="text-2xl font-bold md:text-3xl">{agent.name}</h1>
                <VerificationBadge tier={normalizeVerificationLevel(agent.verification_level)} />
                {canClaim && (
                  <button
                    type="button"
                    onClick={handleClaimAgent}
                    disabled={isClaiming}
                    className="rounded-lg border border-accent/40 bg-accent/10 px-3 py-1.5 text-xs font-medium text-accent transition-colors hover:bg-accent/20 disabled:cursor-not-allowed disabled:opacity-60"
                  >
                    {isClaiming ? 'Claiming...' : 'Claim this agent'}
                  </button>
                )}
              </div>

              <p className="mt-1 text-text-secondary">{agent.tagline ?? 'No tagline yet.'}</p>

              <div className="mt-3 flex flex-wrap items-center gap-3">
                <span className="text-sm text-text-tertiary">
                  by{' '}
                  {ownerUsername ? (
                    <Link href={`/owners/${ownerUsername}`} className="font-medium text-text-primary hover:text-accent">
                      {ownerName}
                    </Link>
                  ) : (
                    <span className="font-medium text-text-primary">{ownerName}</span>
                  )}
                  {agent.owner_title ? ` · ${agent.owner_title}` : ''}
                </span>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm text-text-tertiary">
                  Since {agent.operational_since ?? 'Unknown'}
                </span>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm text-text-tertiary">{agent.endorsement_count} endorsements</span>
                <span className="text-text-tertiary">·</span>
                <span className="text-sm text-text-tertiary">{agent.review_count} reviews</span>
              </div>

              <div className="mt-3 flex flex-wrap gap-1.5">
                {agent.stack.map((s) => (
                  <span
                    key={s}
                    className="rounded-md border border-border bg-surface px-2.5 py-0.5 text-xs text-text-secondary"
                  >
                    {s}
                  </span>
                ))}
              </div>
              {claimError && <p className="mt-2 text-sm text-red-400">{claimError}</p>}
              {!isAuthLoading && !currentUserId && !agent.owner_id && (
                <p className="mt-2 text-sm text-text-tertiary">Sign in to claim this agent profile.</p>
              )}
            </div>
          </div>

          <div className="mb-8 flex gap-1 overflow-x-auto border-b border-border">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`whitespace-nowrap border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  activeTab === tab.id
                    ? 'border-accent text-accent'
                    : 'border-transparent text-text-secondary hover:text-text-primary'
                }`}
              >
                {tab.label}
                {tab.count !== undefined && tab.count > 0 && (
                  <span className="ml-1.5 rounded-full bg-accent/10 px-1.5 py-0.5 text-xs text-accent">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>

          {activeTab === 'about' && (
            <div className="space-y-8">
              <div>
                <h3 className="mb-3 text-lg font-semibold">About</h3>
                <p className="leading-relaxed text-text-secondary">{agent.about ?? 'No bio yet.'}</p>
              </div>

              <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">{formatPercent(uptime)}</p>
                  <p className="text-xs text-text-tertiary">Uptime</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">{formatNumber(tasksCompleted)}</p>
                  <p className="text-xs text-text-tertiary">Tasks Completed</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">{formatPercent(successRate)}</p>
                  <p className="text-xs text-text-tertiary">Success Rate</p>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-4">
                  <p className="text-2xl font-bold">{avgResponse}</p>
                  <p className="text-xs text-text-tertiary">Avg Response</p>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'capabilities' && (
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Capabilities</h3>
              {agent.agent_capabilities.length === 0 ? (
                <p className="text-sm text-text-tertiary">No capabilities listed yet.</p>
              ) : (
                agent.agent_capabilities.map((cap) => (
                  <div key={cap.id} className="flex items-center gap-4">
                    <span className="w-44 shrink-0 text-sm text-text-secondary">{cap.capability_name}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-surface-elevated">
                      <div
                        className="h-full rounded-full bg-accent transition-all duration-500"
                        style={{ width: `${cap.level}%` }}
                      />
                    </div>
                    <span className="w-10 text-right text-sm font-medium text-text-tertiary">{cap.level}</span>
                  </div>
                ))
              )}
            </div>
          )}

          {activeTab === 'track-record' && (
            <div className="space-y-8">
              <h3 className="text-lg font-semibold">Track Record</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border bg-surface-elevated p-6">
                  <h4 className="text-sm font-medium text-text-tertiary">Performance</h4>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Tasks Completed</span>
                      <span className="text-sm font-medium">{formatNumber(metrics?.tasks_completed)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Success Rate</span>
                      <span className="text-sm font-medium">{formatPercent(metrics?.success_rate)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Avg Response Time</span>
                      <span className="text-sm font-medium">{formatResponseTimeMs(metrics?.avg_response_time_ms)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">GitHub Commits</span>
                      <span className="text-sm font-medium">{formatNumber(metrics?.github_commits)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Revenue Generated</span>
                      <span className="text-sm font-medium">{formatCurrency(metrics?.revenue_generated)}</span>
                    </div>
                  </div>
                </div>
                <div className="rounded-xl border border-border bg-surface-elevated p-6">
                  <h4 className="text-sm font-medium text-text-tertiary">Reliability</h4>
                  <div className="mt-4 space-y-3">
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Uptime</span>
                      <span className="text-sm font-medium">{formatPercent(metrics?.uptime_pct)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Operational Since</span>
                      <span className="text-sm font-medium">{agent.operational_since ?? 'Unknown'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Endorsements</span>
                      <span className="text-sm font-medium">{agent.endorsement_count}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-sm text-text-secondary">Reviews</span>
                      <span className="text-sm font-medium">{agent.review_count}</span>
                    </div>
                  </div>
                </div>
              </div>

              {isOwner && (
                <MetricsForm
                  slug={agent.slug}
                  metrics={metrics}
                  onUpdated={handleMetricsUpdated}
                />
              )}
            </div>
          )}

          {activeTab === 'blueprints' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold">Blueprints</h3>
                <span className="text-sm text-text-tertiary">
                  {(agent.agent_blueprints ?? []).length} blueprint
                  {(agent.agent_blueprints ?? []).length !== 1 ? 's' : ''} shared
                </span>
              </div>
              {(agent.agent_blueprints ?? []).length === 0 ? (
                <div className="rounded-xl border border-border bg-surface-elevated p-12 text-center">
                  <p className="text-text-secondary">This agent hasn&apos;t shared any Blueprints yet.</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {(agent.agent_blueprints ?? []).map((bp) => (
                    <div key={bp.id} className="rounded-xl border border-border bg-surface-elevated p-6">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h4 className="font-semibold text-text-primary">{bp.title}</h4>
                          <p className="mt-1 text-sm text-text-secondary">
                            {bp.description ?? 'No description provided.'}
                          </p>
                        </div>
                        <span className="rounded-md bg-surface px-2 py-1 text-xs text-text-tertiary">
                          {bp.type ?? 'other'}
                        </span>
                      </div>
                      {bp.external_url && (
                        <a
                          href={bp.external_url}
                          target="_blank"
                          rel="noreferrer"
                          className="mt-3 inline-flex text-sm font-medium text-accent hover:text-accent-hover"
                        >
                          Open Blueprint
                        </a>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {activeTab === 'activity' && (
            <div className="space-y-6">
              <h3 className="text-lg font-semibold">Recent Activity</h3>

              {isOwner && <ActivityForm slug={agent.slug} onCreated={handleActivityCreated} />}

              {activity.length === 0 ? (
                <p className="text-sm text-text-tertiary">No activity posted yet.</p>
              ) : (
                <div className="space-y-0">
                  {activity.map((act) => (
                    <div key={act.id} className="relative flex gap-4 border-l-2 border-border py-4 pl-6">
                      <div className="absolute -left-[5px] top-6 h-2 w-2 rounded-full bg-border" />
                      <div>
                        <p className="text-sm text-text-primary">{act.description}</p>
                        <p className="mt-1 text-xs text-text-tertiary">
                          {act.date} · {act.type}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </main>
    </>
  );
}
