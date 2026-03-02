"use client";

// components/plan/PhaseTimeline.tsx
import * as React from "react";
import { ProgressRing, StepRowLite, phaseTheme } from "@/lib/helpers";

type Step = {
  id: string;
  title: string;
  status: string;
  description: string | null;
  order: number;
};

type Phase = {
  id: string;
  title: string;
  durationDays: number;
  steps: Step[];
  order: number;
};

function phaseAnchorId(phaseId: string) {
  return `phase-${phaseId}`;
}

export function PhaseTimeline({ phases }: { phases: Phase[] }) {
  const sortedPhases = [...(phases ?? [])].sort((a, b) => a.order - b.order);

  // When PhaseRail updates the hash (#phase-xxx), open the correct <details>
  React.useEffect(() => {
    const openFromHash = () => {
      const id = window.location.hash.replace("#", "");
      if (!id) return;

      const el = document.getElementById(id);
      if (!el) return;

      if (el instanceof HTMLDetailsElement) {
        el.open = true;
      } else {
        const details = el.closest("details");
        if (details instanceof HTMLDetailsElement) details.open = true;
      }
    };

    openFromHash();
    window.addEventListener("hashchange", openFromHash);
    return () => window.removeEventListener("hashchange", openFromHash);
  }, []);

  return (
    <section className="relative rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4">
        <h2 className="text-sm font-semibold text-zinc-900">Roadmap</h2>
        <p className="mt-1 text-xs text-zinc-600">
          Phases are milestones. Click a phase to expand its steps. DOING steps
          are highlighted.
        </p>
      </div>

      <div className="space-y-5">
        {sortedPhases.map((p, idx) => {
          const steps = [...(p.steps ?? [])].sort((a, b) => a.order - b.order);
          const total = steps.length;
          const done = steps.filter((s) => s.status === "DONE").length;
          const doing = steps.filter((s) => s.status === "DOING").length;
          const pct = total === 0 ? 0 : Math.round((done / total) * 100);

          const nextStep =
            steps.find((s) => s.status === "DOING") ??
            steps.find((s) => s.status === "TODO") ??
            null;

          const t = phaseTheme(idx);
          const anchorId = phaseAnchorId(p.id);

          return (
            <details
              key={p.id}
              id={anchorId}
              className={`group overflow-hidden rounded-2xl border ${t.border} bg-gradient-to-b ${t.card} shadow-sm`}
              open={idx === 0}
            >
              {/* summary MUST be the first direct child of details */}
              <summary
                className={[
                  "cursor-pointer select-none list-none",
                  "focus:outline-none",
                  "[&::-webkit-details-marker]:hidden",
                ].join(" ")}
              >
                {/* top strip */}
                <div className={`h-1.5 w-full bg-gradient-to-r ${t.strip}`} />

                <div className="p-4">
                  <div className="flex items-start justify-between gap-4">
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2">
                        <span className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-[11px] font-semibold text-zinc-800 backdrop-blur">
                          <span className={`h-2 w-2 rounded-full ${t.dot}`} />#
                          {idx + 1}
                        </span>

                        <h3 className="text-sm font-semibold text-zinc-900">
                          {p.title}
                        </h3>

                        <span
                          className={`rounded-full border px-2 py-1 text-[11px] ${t.badge}`}
                        >
                          {p.durationDays} days
                        </span>

                        {doing > 0 ? (
                          <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-1 text-[11px] text-sky-700">
                            {doing} doing
                          </span>
                        ) : null}
                      </div>

                      <p className="mt-1 text-xs text-zinc-600">
                        {done}/{total} steps done
                        {nextStep ? (
                          <>
                            {" "}
                            • Next:{" "}
                            <span className="font-medium text-zinc-800">
                              {nextStep.title}
                            </span>
                          </>
                        ) : null}
                      </p>

                      <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-white/70">
                        <div
                          className="h-full rounded-full bg-gradient-to-r from-violet-600 via-sky-500 to-emerald-500"
                          style={{ width: `${pct}%` }}
                        />
                      </div>

                      <div className="mt-2 text-[11px] text-zinc-500">
                        <span className="group-open:hidden">
                          Click to expand
                        </span>
                        <span className="hidden group-open:inline">
                          Click to collapse
                        </span>
                      </div>
                    </div>

                    <ProgressRing value={pct} from={t.ringFrom} to={t.ringTo} />
                  </div>
                </div>
              </summary>

              {/* Expanded content */}
              <div className="px-4 pb-4">
                <div className="rounded-2xl border border-white/60 bg-white/60 p-3">
                  <div className="flex gap-3">
                    <div className="flex-1 space-y-2">
                      {steps.length === 0 ? (
                        <div className="rounded-xl border border-white/60 bg-white/70 px-3 py-2 text-xs text-zinc-600">
                          No steps yet.
                        </div>
                      ) : (
                        steps.map((s) => (
                          <StepRowLite
                            key={s.id}
                            step={s}
                            highlight={s.status === "DOING"}
                          />
                        ))
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </details>
          );
        })}
      </div>
    </section>
  );
}
