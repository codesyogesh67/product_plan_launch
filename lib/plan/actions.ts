"use server";

import { db } from "../db";

type PhaseInput = {
  title: string;
  durationDays?: number;
  steps?: { title: string; notes?: string; order?: number }[];
};

type PlanInput = {
  product?: string;
  name?: string;
  phases?: PhaseInput[];
};

function defaultTemplate(product: string, name: string) {
  return {
    product,
    name,
    phases: [
      {
        title: "Phase 1 — Foundation",
        durationDays: 5,
        steps: [
          { title: "Audit onboarding flow" },
          { title: "Ensure diagnostic works end-to-end" },
          { title: "Auto-generate study plan after diagnostic" },
        ],
      },
      {
        title: "Phase 2 — Offer & Positioning",
        durationDays: 5,
        steps: [
          { title: "Write calm parent-focused landing page" },
          { title: "Add 14-day trial logic" },
        ],
      },
      {
        title: "Phase 3 — Distribution Warm-Up",
        durationDays: 5,
        steps: [
          { title: "Write 10 educational TikTok scripts" },
          { title: "Join 5 NYC parent communities" },
        ],
      },
      {
        title: "Phase 4 — Feedback & Proof",
        durationDays: 15,
        steps: [
          { title: "Collect 5 parent feedback messages" },
          { title: "Capture 2 testimonials (text)" },
        ],
      },
    ],
  };
}

function tryParseJson(input: string): PlanInput | null {
  const trimmed = input.trim();
  if (!trimmed) return null;
  if (!(trimmed.startsWith("{") || trimmed.startsWith("["))) return null;

  try {
    const parsed = JSON.parse(trimmed);
    // Allow either object or array-of-phases
    if (Array.isArray(parsed)) return { phases: parsed };
    return parsed;
  } catch {
    return null;
  }
}

export async function createPlanFromPaste(params: {
  productName: string;
  planName?: string;
  paste: string;
}) {
  const product = params.productName.trim() || "Untitled Product";
  const name = (params.planName?.trim() || `${product} Launch Plan`).slice(
    0,
    120
  );

  const parsed = tryParseJson(params.paste);

  // If JSON pasted and contains phases, build from it
  if (parsed?.phases?.length) {
    const plan = await db.plan.create({
      data: {
        product: parsed.product?.trim() || product,
        name: parsed.name?.trim() || name,
        phases: {
          create: parsed.phases.map((p, phaseIdx) => ({
            title: p.title || `Phase ${phaseIdx + 1}`,
            order: phaseIdx + 1,
            durationDays: p.durationDays ?? 5,
            steps: {
              create: (p.steps ?? []).map((s, stepIdx) => ({
                title: s.title || `Step ${stepIdx + 1}`,
                description: s.notes?.trim() || null,
                order: s.order ?? stepIdx + 1,
              })),
            },
          })),
        },
      },
      select: { id: true },
    });

    return { planId: plan.id };
  }

  // If plain text (or invalid JSON): create template + store the paste as a note on first step
  const tpl = defaultTemplate(product, name);

  const plan = await db.plan.create({
    data: {
      product: tpl.product,
      name: tpl.name,
      phases: {
        create: tpl.phases.map((p, phaseIdx) => ({
          title: p.title,
          order: phaseIdx + 1,
          durationDays: p.durationDays,
          steps: {
            create: p.steps.map((s, stepIdx) => ({
              title: s.title,
              description:
                phaseIdx === 0 && stepIdx === 0 && params.paste.trim()
                  ? `SOURCE NOTES (paste):\n\n${params.paste.trim()}`
                  : null,
              order: stepIdx + 1,
            })),
          },
        })),
      },
    },
    select: { id: true },
  });

  return { planId: plan.id };
}

const ORDER = ["TODO", "DOING", "DONE"] as const;

export async function cycleStepStatus(stepId: string) {
  const step = await db.step.findUnique({ where: { id: stepId } });
  if (!step) return;

  const idx = ORDER.indexOf(step.status as any);
  const next = ORDER[(idx + 1) % ORDER.length];

  await db.step.update({
    where: { id: stepId },
    data: { status: next },
  });
}
