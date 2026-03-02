import { StepRow } from "./StepRow";

type Step = {
  id: string;
  title: string;
  status: string;
  description: string | null;
};
type Phase = { id: string; title: string; durationDays: number; steps: Step[] };

export function PhaseStack({ phases }: { phases: Phase[] }) {
  return (
    <div className="space-y-4">
      {phases.map((p) => (
        <section
          key={p.id}
          className="rounded-2xl border bg-white p-5 shadow-sm"
        >
          <div>
            <h2 className="text-sm font-semibold text-zinc-900">{p.title}</h2>
            <p className="mt-1 text-xs text-zinc-600">
              Timeframe: {p.durationDays} days
            </p>
          </div>

          <ul className="mt-4 space-y-2">
            {p.steps.map((s) => (
              <StepRow key={s.id} step={s} />
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
