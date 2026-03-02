// components/home/RightRail.tsx
"use client";

export function RightRail() {
  return (
    <aside className="rounded-2xl border bg-white p-5 shadow-sm space-y-4">
      {/* Quick tips */}
      <div>
        <h3 className="text-sm font-semibold text-zinc-900">Quick tips</h3>
        <ul className="mt-2 space-y-2 text-xs text-zinc-600">
          <li>• Start with the template → edit steps as you learn.</li>
          <li>• Use TODO/DOING/DONE daily to keep momentum.</li>
          <li>• Later we’ll add AI to turn plain notes into steps.</li>
        </ul>
      </div>

      <div className="h-px bg-zinc-100" />

      {/* How it works */}
      <div>
        <div className="flex items-start justify-between gap-4">
          <div>
            <h3 className="text-md font-bold text-zinc-900">How it works</h3>
            <p className="mt-1 text-xs text-zinc-600">
              A simple loop: generate → execute daily → review weekly.
            </p>
          </div>
        </div>
        <div className="mt-2 h-px bg-zinc-100" />

        <div className="mt-4 grid gap-3">
          <HowCard
            title="Generate plan"
            desc="Template by default. Paste JSON to create phases & steps automatically."
            badge="Fast"
          />
          <HowCard
            title="Execute daily"
            desc="Mark steps TODO → DOING → DONE. Keep momentum with small wins."
            badge="Clarity"
          />
          <HowCard
            title="Review weekly"
            desc="Track what shipped, what blocked, and set next-week targets."
            badge="Consistency"
          />
        </div>
      </div>
    </aside>
  );
}

function HowCard({
  title,
  desc,
  badge,
}: {
  title: string;
  desc: string;
  badge: string;
}) {
  const badgeClass =
    badge === "Fast"
      ? "bg-violet-50 text-violet-700"
      : badge === "Clarity"
      ? "bg-sky-50 text-sky-700"
      : "bg-emerald-50 text-emerald-700";

  return (
    <div className="space-y-1.5">
      {/* single compressed row */}
      <div className="flex items-center justify-between gap-3">
        <div className="text-xs font-semibold text-zinc-900">{title}</div>

        <span
          className={[
            "shrink-0 rounded-full px-2 py-0.5 text-[11px] font-medium",
            badgeClass,
          ].join(" ")}
        >
          {badge}
        </span>
      </div>

      {/* description */}
      <p className="text-xs leading-5 text-zinc-600">{desc}</p>

      {/* subtle divider */}
      <div className="h-px bg-zinc-100" />
    </div>
  );
}
