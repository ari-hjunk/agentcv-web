import { NextRequest, NextResponse } from 'next/server';
import { exec } from 'child_process';
import { createClient } from '@/lib/supabase/server';
import { createClient as createSupabaseClient } from '@supabase/supabase-js';

const VALID_BUDGET_RANGES = ['<$500', '$500-2000', '$2000-5000', '$5000+'];
const VALID_TIMELINES = ['ASAP', '1 week', '2-4 weeks', 'flexible'];

function sanitize(value: unknown): string {
  if (typeof value !== 'string') return '';
  return value.trim().replace(/"/g, '\\"');
}

function execAsync(command: string): Promise<void> {
  return new Promise((resolve) => {
    exec(command, (err) => {
      if (err) {
        console.error('[consulting-requests] email exec error:', err.message);
      }
      resolve();
    });
  });
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body.' }, { status: 400 });
  }

  if (typeof body !== 'object' || body === null) {
    return NextResponse.json({ error: 'Invalid request body.' }, { status: 400 });
  }

  const {
    agent_id,
    name: requester_name,
    email: requester_email,
    message,
    budget_range,
    timeline,
  } = body as Record<string, unknown>;

  // Validate required fields
  if (!agent_id || typeof agent_id !== 'string') {
    return NextResponse.json({ error: 'agent_id is required.' }, { status: 400 });
  }
  if (!requester_name || typeof requester_name !== 'string' || requester_name.trim().length === 0) {
    return NextResponse.json({ error: 'name is required.' }, { status: 400 });
  }
  if (!requester_email || typeof requester_email !== 'string' || !requester_email.includes('@')) {
    return NextResponse.json({ error: 'A valid email is required.' }, { status: 400 });
  }
  if (!message || typeof message !== 'string' || message.trim().length === 0) {
    return NextResponse.json({ error: 'message is required.' }, { status: 400 });
  }
  if (budget_range !== undefined && !VALID_BUDGET_RANGES.includes(budget_range as string)) {
    return NextResponse.json({ error: 'Invalid budget_range value.' }, { status: 400 });
  }
  if (timeline !== undefined && !VALID_TIMELINES.includes(timeline as string)) {
    return NextResponse.json({ error: 'Invalid timeline value.' }, { status: 400 });
  }

  const supabase = await createClient();

  // Verify agent exists and fetch owner info
  const { data: agent, error: agentError } = await supabase
    .from('agents')
    .select('id, name, owner_id')
    .eq('id', agent_id)
    .maybeSingle();

  if (agentError || !agent) {
    return NextResponse.json({ error: 'Agent not found.' }, { status: 404 });
  }

  // Insert consulting request
  const { error: insertError } = await supabase.from('consulting_requests').insert({
    agent_id: agent.id,
    requester_name: (requester_name as string).trim(),
    requester_email: (requester_email as string).trim(),
    message: (message as string).trim(),
    budget_range: typeof budget_range === 'string' ? budget_range : null,
    timeline: typeof timeline === 'string' ? timeline : null,
    status: 'pending',
  });

  if (insertError) {
    console.error('[consulting-requests] insert error:', insertError);
    return NextResponse.json({ error: 'Failed to save request.' }, { status: 500 });
  }

  // Send email notification to owner if available
  if (agent.owner_id) {
    const { data: ownerProfile } = await supabase
      .from('profiles')
      .select('id, display_name')
      .eq('id', agent.owner_id)
      .maybeSingle();

    // Get owner email from auth.users via service role key
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
    let ownerEmail: string | undefined;
    if (serviceRoleKey && process.env.NEXT_PUBLIC_SUPABASE_URL) {
      const adminClient = createSupabaseClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        serviceRoleKey,
        { auth: { autoRefreshToken: false, persistSession: false } }
      );
      const { data: userData } = await adminClient.auth.admin.getUserById(agent.owner_id);
      ownerEmail = userData?.user?.email;
    }

    if (ownerEmail) {
      const ownerName = ownerProfile?.display_name ?? 'Agent Owner';
      const agentName = sanitize(agent.name);
      const senderName = sanitize((requester_name as string).trim());
      const senderEmail = sanitize((requester_email as string).trim());
      const msgBody = sanitize((message as string).trim());
      const budgetInfo = budget_range ? `Budget: ${sanitize(budget_range as string)}` : '';
      const timelineInfo = timeline ? `Timeline: ${sanitize(timeline as string)}` : '';

      const emailBody = [
        `Hi ${sanitize(ownerName)},`,
        ``,
        `You have a new consulting request for your agent "${agentName}".`,
        ``,
        `From: ${senderName} <${senderEmail}>`,
        budgetInfo,
        timelineInfo,
        ``,
        `Message:`,
        msgBody,
        ``,
        `Log in to AgentCV to respond.`,
      ]
        .filter((line) => line !== undefined)
        .join('\\n');

      const subject = `New consulting request for ${agentName}`;
      const cmd = `node /Users/aribot/.openclaw/workspace/scripts/send-email.js "${sanitize(ownerEmail)}" "${sanitize(subject)}" "${emailBody}"`;

      void execAsync(cmd);
    }
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
