export function PlanOverviewCard({
  goal,
  timeframeDays,
  successMetrics,
}: {
  goal: string | null;
  timeframeDays: number | null;
  successMetrics: string[];
}) {
  const items = successMetrics?.filter(Boolean) ?? [];

  if (!goal && !timeframeDays && items.length === 0) return null;

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h3 className="text-sm font-semibold text-zinc-900">Plan overview</h3>
          {timeframeDays ? (
            <p className="mt-1 text-xs text-zinc-600">
              Timeframe: {timeframeDays} days
            </p>
          ) : null}
        </div>
      </div>

      {goal ? (
        <div className="mt-3 rounded-xl border bg-zinc-50 p-4">
          <div className="text-xs font-semibold text-zinc-800">Goal</div>
          <p className="mt-1 text-sm text-zinc-700">{goal}</p>
        </div>
      ) : null}

      {items.length ? (
        <div className="mt-4">
          <div className="text-xs font-semibold text-zinc-800">
            Success metrics
          </div>
          <ul className="mt-2 space-y-2 text-sm text-zinc-700">
            {items.map((m, i) => (
              <li key={`${m}-${i}`} className="flex gap-2">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-emerald-500" />
                <span>{m}</span>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </section>
  );
}
