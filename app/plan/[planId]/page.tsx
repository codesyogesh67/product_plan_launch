import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { PlanDetailHeader } from "@/components/plan/PlanDetailHeader";
import { PhaseStack } from "@/components/plan/PhaseStack";
import { PlanOverviewCard } from "@/components/plan/PlanOverviewCard";
import { PlanProgressHeader } from "@/components/plan/PlanProgressHeader";

import { PhaseRail } from "@/components/plan/PhaseRail";
import { PhaseTimeline } from "@/components/plan/PhaseTimeline";

export default async function PlanDetailPage({
  params,
}: {
  params: Promise<{ planId?: string }>;
}) {
  const { planId } = await params;

  if (!planId) return notFound();

  const plan = await db.plan.findUnique({
    where: { id: planId },
    include: {
      phases: {
        orderBy: { order: "asc" },
        include: { steps: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!plan) return notFound();

  const steps = plan.phases.flatMap((p) => p.steps);
  const totals = {
    total: steps.length,
    done: steps.filter((s) => s.status === "DONE").length,
    doing: steps.filter((s) => s.status === "DOING").length,
    todo: steps.filter((s) => s.status === "TODO").length,
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-violet-50/30 via-white to-sky-50/20">
      {" "}
      <div className="mx-auto max-w-5xl px-6 py-6 space-y-6">
        <PlanProgressHeader
          plan={{
            product: plan.product,
            name: plan.name,
            timeframeDays: plan.timeframeDays ?? null,
          }}
          totals={totals}
        />
        <PhaseRail phases={plan.phases as any} />
        <PhaseTimeline phases={plan.phases as any} />

        <PlanOverviewCard
          goal={plan.goal ?? null}
          timeframeDays={plan.timeframeDays ?? null}
          successMetrics={plan.successMetrics ?? []}
        />
      </div>
    </main>
  );
}
