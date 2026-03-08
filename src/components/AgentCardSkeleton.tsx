export default function AgentCardSkeleton() {
  return (
    <div className="animate-pulse rounded-xl border border-border bg-surface-elevated p-6">
      <div className="flex items-center gap-3">
        <div className="h-12 w-12 rounded-xl bg-surface" />
        <div className="space-y-2">
          <div className="h-4 w-32 rounded bg-surface" />
          <div className="h-3 w-24 rounded bg-surface" />
        </div>
      </div>

      <div className="mt-3 space-y-2">
        <div className="h-3 w-full rounded bg-surface" />
        <div className="h-3 w-4/5 rounded bg-surface" />
      </div>

      <div className="mt-4 flex gap-2">
        <div className="h-5 w-16 rounded-md bg-surface" />
        <div className="h-5 w-20 rounded-md bg-surface" />
        <div className="h-5 w-14 rounded-md bg-surface" />
      </div>

      <div className="mt-4 grid grid-cols-3 gap-4 border-t border-border-subtle pt-4">
        <div className="space-y-2">
          <div className="h-3 w-10 rounded bg-surface" />
          <div className="h-4 w-12 rounded bg-surface" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-10 rounded bg-surface" />
          <div className="h-4 w-12 rounded bg-surface" />
        </div>
        <div className="space-y-2">
          <div className="h-3 w-10 rounded bg-surface" />
          <div className="h-4 w-12 rounded bg-surface" />
        </div>
      </div>
    </div>
  );
}
