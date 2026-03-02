import { db } from "@/lib/db";
import { PlanHeader } from "@/components/plan/PlanHeader";
import { PhaseList } from "@/components/plan/PhaseList";

export default async function PlanPage() {
  const plan = await db.plan.findFirst({
    where: { product: "SHSAT" },
    include: {
      phases: {
        orderBy: { order: "asc" },
        include: { steps: { orderBy: { order: "asc" } } },
      },
    },
  });

  if (!plan) {
    return <div className="p-6">No plan found. Run seed.</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <PlanHeader name={plan.name} product={plan.product} />
      <PhaseList phases={plan.phases} />
    </div>
  );
}
