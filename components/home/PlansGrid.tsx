// components/home/PlansGrid.tsx
import Link from "next/link";
import { db } from "@/lib/db";
import { DeletePlanButton } from "@/components/home/DeletePlanButton";

function percent(n: number) {
  return Math.round(n * 100);
}

export async function PlansGrid() {
  const plans = await db.plan.findMany({
    orderBy: { createdAt: "desc" },
    include: {
      phases: {
        include: {
          steps: true,
        },
      },
    },
    take: 12,
  });

  if (plans.length === 0) return null;

  const cards = plans.map((plan) => {
    const steps = plan.phases.flatMap((p) => p.steps);
    const total = steps.length;
    const done = steps.filter((s) => s.status === "DONE").length;
    const progress = total === 0 ? 0 : done / total;

    return {
      id: plan.id,
      name: plan.name,
      product: plan.product,
      total,
      done,
      progress,
      createdAt: plan.createdAt,
    };
  });

  return (
    <section className="space-y-3">
      <div className="flex items-end justify-between gap-4">
        <div>
          <h2 className="text-sm font-semibold text-zinc-900">Your plans</h2>
          <p className="text-xs text-zinc-600">
            Click a plan to continue execution.
          </p>
        </div>

        <div className="text-xs text-zinc-500">
          Showing {cards.length} plan{cards.length > 1 ? "s" : ""}
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((c) => (
          <div
            key={c.id}
            className="group relative rounded-2xl border bg-white p-4 shadow-sm transition hover:shadow-md"
          >
            {/* Clickable area */}
            <Link href={`/plan/${c.id}`} className="block">
              <div className="flex items-start justify-between gap-3">
                <div className="min-w-0">
                  <div className="truncate text-sm font-semibold text-zinc-900">
                    {c.product}
                  </div>
                  <div className="truncate text-xs text-zinc-600">{c.name}</div>
                </div>

                <span className="rounded-full border bg-zinc-50 px-2 py-1 text-[11px] text-zinc-700">
                  {percent(c.progress)}%
                </span>
              </div>

              <div className="mt-3">
                <div className="h-2 w-full overflow-hidden rounded-full bg-zinc-100">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-violet-600 to-sky-500"
                    style={{ width: `${percent(c.progress)}%` }}
                  />
                </div>

                <div className="mt-2 flex items-center justify-between text-[11px] text-zinc-600">
                  <span>
                    {c.done}/{c.total} steps done
                  </span>
                  <span className="opacity-70">
                    {new Date(c.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-zinc-700 opacity-0 transition group-hover:opacity-100">
                Open → continue where you left off
              </div>
            </Link>

            {/* Delete button NOT inside Link */}
            <div className="absolute bottom-3 right-3 opacity-0 transition group-hover:opacity-100">
              <DeletePlanButton
                planId={c.id}
                product={c.product}
                planName={c.name}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
