"use client";

import { useTransition } from "react";
import { cycleStepStatus } from "@/lib/plan/actions";

type Step = {
  id: string;
  title: string;
  status: "TODO" | "DOING" | "DONE" | string;
  description: string | null;
};

function pill(status: string) {
  if (status === "DONE")
    return "border-emerald-200 bg-emerald-50 text-emerald-700";
  if (status === "DOING") return "border-sky-200 bg-sky-50 text-sky-700";
  return "border-zinc-200 bg-zinc-50 text-zinc-700";
}

export function StepRow({
  step,
  highlight = false,
}: {
  step: Step;
  highlight?: boolean;
}) {
  const [pending, startTransition] = useTransition();

  return (
    <li
      className={[
        "rounded-xl border px-3 py-2 transition",
        highlight
          ? "border-sky-200 bg-gradient-to-r from-sky-50 via-white to-violet-50 shadow-sm ring-1 ring-sky-100"
          : "border-zinc-200 bg-white/60 hover:bg-white",
      ].join(" ")}
    >
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 min-w-0">
          <span
            className={[
              "h-2.5 w-2.5 rounded-full",
              step.status === "DONE"
                ? "bg-emerald-500"
                : step.status === "DOING"
                ? "bg-sky-500"
                : "bg-zinc-300",
            ].join(" ")}
          />
          <div className="truncate text-sm text-zinc-900">{step.title}</div>
        </div>

        <button
          type="button"
          disabled={pending}
          onClick={() => startTransition(() => cycleStepStatus(step.id))}
          className={[
            "rounded-full border px-2 py-1 text-[11px] font-medium transition hover:opacity-90 disabled:opacity-60",
            pill(step.status),
          ].join(" ")}
          title="Click to cycle status (TODO → DOING → DONE)"
        >
          {pending ? "..." : step.status}
        </button>
      </div>

      {step.description ? (
        <p className="mt-2 whitespace-pre-wrap text-xs leading-5 text-zinc-600">
          {step.description}
        </p>
      ) : null}
    </li>
  );
}
