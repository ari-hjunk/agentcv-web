import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

interface RegisterRequestBody {
  name: string;
  tagline: string;
  category: string;
  ownerName: string;
  ownerEmail: string;
  about: string;
}

type RegisterSuccessResponse = {
  success: true;
  slug: string;
};

type RegisterErrorResponse = {
  error: string;
};

const REQUIRED_FIELDS: Array<keyof RegisterRequestBody> = [
  'name',
  'tagline',
  'category',
  'ownerName',
  'ownerEmail',
  'about',
];

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null;
}

function sanitizeText(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

function toSlug(name: string): string {
  const base = name
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-+|-+$/g, '');

  return base || 'agent';
}

async function createUniqueSlug(baseSlug: string): Promise<string> {
  const supabase = await createClient();
  let candidate = baseSlug;

  for (let index = 0; index < 10; index += 1) {
    const { data, error } = await supabase
      .from('agents')
      .select('id')
      .eq('slug', candidate)
      .maybeSingle();

    if (error) {
      throw error;
    }

    if (!data) {
      return candidate;
    }

    candidate = `${baseSlug}-${index + 1}`;
  }

  return `${baseSlug}-${Date.now()}`;
}

export async function POST(request: Request) {
  let payload: unknown;

  try {
    payload = await request.json();
  } catch {
    return NextResponse.json<RegisterErrorResponse>(
      { error: 'Invalid JSON body.' },
      { status: 400 }
    );
  }

  if (!isRecord(payload)) {
    return NextResponse.json<RegisterErrorResponse>(
      { error: 'Request body must be a JSON object.' },
      { status: 400 }
    );
  }

  const parsedBody: RegisterRequestBody = {
    name: sanitizeText(payload.name),
    tagline: sanitizeText(payload.tagline),
    category: sanitizeText(payload.category),
    ownerName: sanitizeText(payload.ownerName),
    ownerEmail: sanitizeText(payload.ownerEmail),
    about: sanitizeText(payload.about),
  };

  const missingField = REQUIRED_FIELDS.find((field) => parsedBody[field].length === 0);

  if (missingField) {
    return NextResponse.json<RegisterErrorResponse>(
      { error: `Missing required field: ${missingField}` },
      { status: 400 }
    );
  }

  if (!EMAIL_PATTERN.test(parsedBody.ownerEmail)) {
    return NextResponse.json<RegisterErrorResponse>(
      { error: 'ownerEmail must be a valid email address.' },
      { status: 400 }
    );
  }

  try {
    const supabase = await createClient();
    const slug = await createUniqueSlug(toSlug(parsedBody.name));

    const { data, error } = await supabase
      .from('agents')
      .insert({
        slug,
        name: parsedBody.name,
        tagline: parsedBody.tagline,
        category: parsedBody.category,
        about: parsedBody.about,
        owner_display: parsedBody.ownerName,
        owner_title: parsedBody.ownerEmail,
      })
      .select('slug')
      .single();

    if (error) {
      console.error('Error inserting agent registration:', error);
      return NextResponse.json<RegisterErrorResponse>(
        { error: 'Failed to register agent.' },
        { status: 500 }
      );
    }

    return NextResponse.json<RegisterSuccessResponse>(
      { success: true, slug: data.slug },
      { status: 201 }
    );
  } catch (error) {
    console.error('Unexpected error registering agent:', error);
    return NextResponse.json<RegisterErrorResponse>(
      { error: 'Unexpected server error.' },
      { status: 500 }
    );
  }
}
