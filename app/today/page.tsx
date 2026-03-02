import Link from "next/link";
import { getTodaySteps } from "@/lib/plan/queries";
import { StepRow } from "@/components/plan/StepRow";

export default async function TodayPage() {
  const steps = await getTodaySteps(15);

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-5xl p-6 space-y-6">
        <header className="rounded-2xl border bg-white p-5 shadow-sm">
          <h1 className="text-2xl font-bold text-zinc-900">Today</h1>
          <p className="mt-1 text-sm text-zinc-600">
            Focus on what’s in progress, then the next few actions.
          </p>
        </header>

        {steps.length === 0 ? (
          <div className="rounded-2xl border bg-white p-5 text-sm text-zinc-600 shadow-sm">
            Nothing queued yet. Go to a plan and set a step to <b>DOING</b>.
          </div>
        ) : (
          <section className="rounded-2xl border bg-white p-5 shadow-sm">
            <div className="mb-3 flex items-center justify-between">
              <h2 className="text-sm font-semibold text-zinc-900">
                Next actions
              </h2>
              <span className="text-xs text-zinc-500">
                {steps.length} items
              </span>
            </div>

            <ul className="space-y-2">
              {steps.map((s: any) => (
                <div key={s.id} className="space-y-2">
                  <div className="flex items-center justify-between text-xs text-zinc-500">
                    <span>{s.phase?.title ?? "Phase"}</span>
                    <Link
                      className="hover:underline"
                      href={`/plan/${s.phase.plan.id}`}
                    >
                      Open plan →
                    </Link>
                  </div>
                  <StepRow step={s} />
                </div>
              ))}
            </ul>
          </section>
        )}
      </div>
    </main>
  );
}
