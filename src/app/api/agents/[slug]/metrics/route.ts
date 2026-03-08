import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { AgentMetric } from '@/lib/types/database';

type MetricsPayload = {
  uptime_pct?: number | null;
  tasks_completed?: number | null;
  success_rate?: number | null;
  avg_response_time_ms?: number | null;
  revenue_generated?: number | null;
  github_commits?: number | null;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function toNullableNumber(value: unknown): number | null {
  if (value === null || value === undefined || value === '') return null;
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error('Expected a number value.');
  }
  return value;
}

function validateRange(value: number | null, key: string, min: number, max: number) {
  if (value === null) return;
  if (value < min || value > max) {
    throw new Error(`${key} must be between ${min} and ${max}.`);
  }
}

function validateNonNegative(value: number | null, key: string, integerOnly = false) {
  if (value === null) return;
  if (value < 0) {
    throw new Error(`${key} must be greater than or equal to 0.`);
  }
  if (integerOnly && !Number.isInteger(value)) {
    throw new Error(`${key} must be an integer.`);
  }
}

function parseMetricsPayload(payload: unknown): MetricsPayload {
  if (!isRecord(payload)) {
    throw new Error('Request body must be a JSON object.');
  }

  const parsed: MetricsPayload = {};
  const keys: Array<keyof MetricsPayload> = [
    'uptime_pct',
    'tasks_completed',
    'success_rate',
    'avg_response_time_ms',
    'revenue_generated',
    'github_commits',
  ];

  for (const key of keys) {
    if (key in payload) {
      parsed[key] = toNullableNumber(payload[key]);
    }
  }

  validateRange(parsed.uptime_pct ?? null, 'uptime_pct', 0, 100);
  validateRange(parsed.success_rate ?? null, 'success_rate', 0, 100);
  validateNonNegative(parsed.tasks_completed ?? null, 'tasks_completed', true);
  validateNonNegative(parsed.avg_response_time_ms ?? null, 'avg_response_time_ms', true);
  validateNonNegative(parsed.revenue_generated ?? null, 'revenue_generated');
  validateNonNegative(parsed.github_commits ?? null, 'github_commits', true);

  return parsed;
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  const { slug } = await params;
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  const { data: agent, error: agentError } = await supabase
    .from('agents')
    .select('id, owner_id')
    .eq('slug', slug)
    .maybeSingle();

  if (agentError) {
    return NextResponse.json({ error: 'Failed to fetch agent.' }, { status: 500 });
  }

  if (!agent) {
    return NextResponse.json({ error: 'Agent not found.' }, { status: 404 });
  }

  if (agent.owner_id !== user.id) {
    return NextResponse.json({ error: 'Only the owner can update metrics.' }, { status: 403 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  let updates: MetricsPayload;
  try {
    updates = parseMetricsPayload(payload);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Invalid metrics payload.';
    return NextResponse.json({ error: message }, { status: 400 });
  }

  const { data: metrics, error: updateError } = await supabase
    .from('agent_metrics')
    .upsert(
      {
        agent_id: agent.id,
        ...updates,
        last_updated: new Date().toISOString(),
      },
      { onConflict: 'agent_id' }
    )
    .select('*')
    .single();

  if (updateError) {
    return NextResponse.json({ error: 'Failed to update metrics.' }, { status: 500 });
  }

  return NextResponse.json({ metrics: metrics as AgentMetric });
}
