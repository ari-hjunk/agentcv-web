import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

export async function POST(request: Request) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (!isRecord(payload) || typeof payload.slug !== 'string' || payload.slug.trim() === '') {
    return NextResponse.json({ error: 'slug is required.' }, { status: 400 });
  }

  const slug = payload.slug.trim();

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

  if (agent.owner_id) {
    return NextResponse.json({ error: 'This agent is already claimed.' }, { status: 409 });
  }

  const { error: updateError } = await supabase
    .from('agents')
    .update({ owner_id: user.id })
    .eq('id', agent.id)
    .is('owner_id', null);

  if (updateError) {
    return NextResponse.json({ error: 'Failed to claim agent.' }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
