import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function PATCH(req: NextRequest) {
  const supabase = await createClient();

  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  if (authError || !user) {
    return NextResponse.json({ error: 'Authentication required.' }, { status: 401 });
  }

  // Parse optional explicit value; if not provided, toggle current
  let body: { consulting_available?: boolean } = {};
  try {
    const raw = await req.json() as { consulting_available?: unknown };
    if (typeof raw.consulting_available === 'boolean') {
      body = { consulting_available: raw.consulting_available };
    }
  } catch {
    // No body is fine — we'll toggle
  }

  let newValue: boolean;

  if (typeof body.consulting_available === 'boolean') {
    newValue = body.consulting_available;
  } else {
    // Toggle: read current value
    const { data: profile, error: readError } = await supabase
      .from('profiles')
      .select('consulting_available')
      .eq('id', user.id)
      .maybeSingle();

    if (readError || !profile) {
      return NextResponse.json({ error: 'Profile not found.' }, { status: 404 });
    }

    newValue = !profile.consulting_available;
  }

  const { error: updateError } = await supabase
    .from('profiles')
    .update({ consulting_available: newValue, updated_at: new Date().toISOString() })
    .eq('id', user.id);

  if (updateError) {
    console.error('[profile/consulting] update error:', updateError);
    return NextResponse.json({ error: 'Failed to update availability.' }, { status: 500 });
  }

  return NextResponse.json({ consulting_available: newValue });
}
