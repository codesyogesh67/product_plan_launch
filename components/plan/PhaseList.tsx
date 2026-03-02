type Step = { id: string; title: string; status: string };
type Phase = { id: string; title: string; durationDays: number; steps: Step[] };

export function PhaseList({ phases }: { phases: Phase[] }) {
  return (
    <div className="space-y-4">
      {phases.map((p) => (
        <section key={p.id} className="border rounded-lg p-4 space-y-3">
          <div className="flex items-baseline justify-between gap-4">
            <h2 className="font-semibold">{p.title}</h2>
            <span className="text-xs opacity-60">{p.durationDays} days</span>
          </div>

          <ul className="space-y-2">
            {p.steps.map((s) => (
              <li
                key={s.id}
                className="flex items-center justify-between text-sm"
              >
                <span>{s.title}</span>
                <span className="text-xs opacity-60">{s.status}</span>
              </li>
            ))}
          </ul>
        </section>
      ))}
    </div>
  );
}
