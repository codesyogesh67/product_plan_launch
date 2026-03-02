// components/home/actions.ts
"use server";

import { revalidatePath } from "next/cache";
import { db } from "@/lib/db";

export async function createPlanAction(formData: FormData) {
  const productName = String(formData.get("productName") || "");
  const planName = String(formData.get("planName") || "");

  // TODO: your existing create logic here (db insert, redirect, revalidatePath, etc.)
  // return something if you need it
}

export async function deletePlanAction(planId: string) {
  if (!planId) return;

  // Safe delete even if cascade isn't configured
  await db.$transaction(async (tx) => {
    // delete steps under phases
    await tx.step.deleteMany({
      where: { phase: { planId } },
    });

    // delete phases
    await tx.phase.deleteMany({
      where: { planId },
    });

    // delete plan
    await tx.plan.delete({
      where: { id: planId },
    });
  });

  revalidatePath("/");
}
