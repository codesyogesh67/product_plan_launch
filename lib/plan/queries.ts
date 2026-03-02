import { db } from "@/lib/db";

export async function getTodaySteps(limit = 12) {
  const steps = await db.step.findMany({
    where: { status: { in: ["DOING", "TODO"] } },
    orderBy: [{ status: "desc" }, { order: "asc" }],
    take: limit,
    include: {
      phase: {
        select: {
          title: true,
          order: true,
          plan: { select: { product: true, name: true, id: true } },
        },
      },
    },
  });

  // Sort: DOING first, then TODO. Within those, by phase order, then step order
  const weight = (s: any) => (s.status === "DOING" ? 0 : 1);

  return steps.sort((a: any, b: any) => {
    const w = weight(a) - weight(b);
    if (w !== 0) return w;
    const p = (a.phase?.order ?? 999) - (b.phase?.order ?? 999);
    if (p !== 0) return p;
    return (a.order ?? 999) - (b.order ?? 999);
  });
}