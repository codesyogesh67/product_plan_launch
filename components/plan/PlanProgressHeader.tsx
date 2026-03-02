export function PlanProgressHeader({ plan, totals }: any) {
  const percent =
    totals.total === 0 ? 0 : Math.round((totals.done / totals.total) * 100);

  const remaining = totals.total - totals.done;

  const pace =
    plan.timeframeDays && plan.timeframeDays > 0
      ? Math.max(0, Math.ceil(remaining / plan.timeframeDays))
      : null;

  return (
    <header className="space-y-4">
      <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
        <div>
          <div className="text-xs text-zinc-500">Product</div>
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            {plan.product}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">{plan.name}</p>
        </div>

        <div className="flex flex-wrap gap-2">
          <Pill label="Progress" value={`${percent}%`} />
          <Pill label="Done" value={`${totals.done}/${totals.total}`} />
          <Pill label="Doing" value={`${totals.doing}`} />
          <Pill label="Remaining" value={`${remaining}`} />
          {plan.timeframeDays ? (
            <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] text-zinc-700 backdrop-blur">
              Timeframe: {plan.timeframeDays} days
              {pace !== null ? ` • Pace: ~${pace} step/day` : ""}
            </span>
          ) : null}
        </div>
      </div>

      <div className="rounded-2xl border border-zinc-200/60 bg-white/70 p-4 shadow-sm backdrop-blur">
        <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
          <div
            className="h-full rounded-full bg-gradient-to-r from-violet-600 via-sky-500 to-emerald-500"
            style={{ width: `${percent}%` }}
          />
        </div>

        <div className="mt-2 flex flex-wrap items-center justify-between gap-2 text-xs text-zinc-600">
          <span>
            {totals.doing > 0
              ? `You have ${totals.doing} step(s) in progress.`
              : "Start one step as DOING to focus."}
          </span>
          <span className="text-[11px] text-zinc-500">
            Click status pills to cycle: TODO → DOING → DONE
          </span>
        </div>
      </div>
    </header>
  );
}

function Pill({ label, value }: { label: string; value: string }) {
  return (
    <span className="rounded-full border border-zinc-200 bg-white/70 px-3 py-1 text-[11px] text-zinc-700 backdrop-blur">
      <span className="text-zinc-500">{label}:</span>{" "}
      <span className="font-semibold text-zinc-900">{value}</span>
    </span>
  );
}
