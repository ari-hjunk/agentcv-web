import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import type { AgentActivity } from '@/lib/types/database';

type ActivityType = 'deployment' | 'update' | 'achievement' | 'milestone' | 'partnership';

const ALLOWED_TYPES: ActivityType[] = [
  'deployment',
  'update',
  'achievement',
  'milestone',
  'partnership',
];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function asTrimmedString(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function isValidDate(value: string): boolean {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) return false;
  const parsed = new Date(value);
  return !Number.isNaN(parsed.getTime());
}

export async function POST(
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
    return NextResponse.json({ error: 'Only the owner can post activity.' }, { status: 403 });
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!isRecord(payload)) {
    return NextResponse.json({ error: 'Request body must be a JSON object.' }, { status: 400 });
  }

  const date = asTrimmedString(payload.date);
  const description = asTrimmedString(payload.description);
  const type = asTrimmedString(payload.type) as ActivityType;

  if (!date || !isValidDate(date)) {
    return NextResponse.json({ error: 'date must be in YYYY-MM-DD format.' }, { status: 400 });
  }

  if (!description) {
    return NextResponse.json({ error: 'description is required.' }, { status: 400 });
  }

  if (!ALLOWED_TYPES.includes(type)) {
    return NextResponse.json({ error: 'Invalid activity type.' }, { status: 400 });
  }

  const { data: activity, error: insertError } = await supabase
    .from('agent_activity')
    .insert({
      agent_id: agent.id,
      date,
      description,
      type,
    })
    .select('*')
    .single();

  if (insertError) {
    return NextResponse.json({ error: 'Failed to create activity entry.' }, { status: 500 });
  }

  return NextResponse.json({ activity: activity as AgentActivity }, { status: 201 });
}
