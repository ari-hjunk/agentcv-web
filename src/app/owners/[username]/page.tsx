import { notFound } from 'next/navigation';
import AgentCard from '@/components/AgentCard';
import { createClient } from '@/lib/supabase/server';
import type { AgentWithDetails } from '@/lib/agents';
import { toCardAgent } from '@/lib/agent-adapters';
import type { Profile } from '@/lib/types/database';
import ConsultingAvailabilityToggle from '@/components/ConsultingAvailabilityToggle';

const OWNER_AGENT_SELECT = `
  *,
  agent_metrics(*),
  agent_capabilities(*),
  owner:profiles!owner_id(*),
  agent_blueprints(*)
`;

function toTwitterHref(value: string | null | undefined): string | null {
  if (!value) return null;
  const trimmed = value.trim();
  if (!trimmed) return null;
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://')) return trimmed;
  return `https://x.com/${trimmed.replace(/^@/, '')}`;
}

export default async function OwnerProfilePage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();

  const { data: profile, error: profileError } = await supabase
    .from('profiles')
    .select('*')
    .eq('username', username)
    .maybeSingle();

  if (profileError || !profile) {
    notFound();
  }
  const typedProfile = profile as Profile;

  const { data: ownerAgents } = await supabase
    .from('agents')
    .select(OWNER_AGENT_SELECT)
    .eq('owner_id', typedProfile.id)
    .order('created_at', { ascending: false });

  // Check if the viewing user is the profile owner (for toggle)
  const {
    data: { user: viewerUser },
  } = await supabase.auth.getUser();
  const isOwnProfile = viewerUser?.id === typedProfile.id;

  const twitterHref = toTwitterHref(typedProfile.twitter_url);
  const agents = ((ownerAgents ?? []) as AgentWithDetails[]).map(toCardAgent);

  return (
    <main className="mx-auto min-h-screen max-w-6xl px-6 py-24">
      <div className="rounded-2xl border border-border bg-surface-elevated p-6">
        <div className="flex flex-wrap items-start gap-4">
          <div className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-surface text-2xl">
            {typedProfile.avatar_url ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={typedProfile.avatar_url}
                alt={typedProfile.display_name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span>{typedProfile.display_name.charAt(0).toUpperCase()}</span>
            )}
          </div>
          <div className="flex-1">
            <h1 className="text-2xl font-bold text-text-primary">{typedProfile.display_name}</h1>
            <p className="text-sm text-text-tertiary">@{typedProfile.username}</p>
            <p className="mt-3 text-sm leading-relaxed text-text-secondary">
              {typedProfile.bio ?? 'No bio available yet.'}
            </p>
            <div className="mt-4 flex flex-wrap gap-3 text-sm">
              {typedProfile.website_url && (
                <a
                  href={typedProfile.website_url}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-3 py-1.5 text-text-secondary hover:text-text-primary"
                >
                  Website
                </a>
              )}
              {twitterHref && (
                <a
                  href={twitterHref}
                  target="_blank"
                  rel="noreferrer"
                  className="rounded-lg border border-border px-3 py-1.5 text-text-secondary hover:text-text-primary"
                >
                  Twitter/X
                </a>
              )}
            </div>
            {isOwnProfile && (
              <div className="mt-4 border-t border-border pt-4">
                <p className="mb-2 text-xs font-medium uppercase tracking-wider text-text-tertiary">
                  Consulting availability
                </p>
                <ConsultingAvailabilityToggle initialValue={typedProfile.consulting_available} />
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-text-primary">
          Agents by {typedProfile.display_name}
        </h2>
        <span className="text-sm text-text-tertiary">
          {agents.length} agent{agents.length === 1 ? '' : 's'}
        </span>
      </div>

      {agents.length === 0 ? (
        <div className="mt-6 rounded-xl border border-border bg-surface-elevated p-8 text-center text-text-tertiary">
          No agents published by this owner yet.
        </div>
      ) : (
        <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {agents.map((agent) => (
            <AgentCard key={agent.slug} agent={agent} />
          ))}
        </div>
      )}
    </main>
  );
}
