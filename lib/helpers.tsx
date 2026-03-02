"use client";

// lib/helpers.ts
import * as React from "react";

/* ================================
   Types
================================ */
export type StepLite = {
  id: string;
  title: string;
  status: string; // "TODO" | "DOING" | "DONE"
  description: string | null;
  order: number;
};

export type PhaseTheme = {
  dot: string;
  ringFrom: string;
  ringTo: string;
  card: string;
  border: string;
  badge: string;
  strip: string;
  accent: string;
};

/* ================================
   Utils
================================ */
export function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export function phaseTheme(index: number): PhaseTheme {
  const themes: PhaseTheme[] = [
    {
      dot: "bg-violet-500",
      ringFrom: "#7c3aed",
      ringTo: "#0ea5e9",
      card: "from-violet-500/12 via-white to-sky-500/12",
      border: "border-violet-200/60",
      badge: "bg-violet-50 text-violet-700 border-violet-200",
      strip: "from-violet-500 to-sky-500",
      accent: "bg-violet-500",
    },
    {
      dot: "bg-sky-500",
      ringFrom: "#0ea5e9",
      ringTo: "#22c55e",
      card: "from-sky-500/10 via-white to-emerald-500/10",
      border: "border-sky-200/60",
      badge: "bg-sky-50 text-sky-700 border-sky-200",
      strip: "from-sky-500 to-emerald-500",
      accent: "bg-sky-500",
    },
    {
      dot: "bg-emerald-500",
      ringFrom: "#22c55e",
      ringTo: "#f59e0b",
      card: "from-emerald-500/10 via-white to-amber-500/10",
      border: "border-emerald-200/60",
      badge: "bg-emerald-50 text-emerald-700 border-emerald-200",
      strip: "from-emerald-500 to-amber-500",
      accent: "bg-emerald-500",
    },
    {
      dot: "bg-amber-500",
      ringFrom: "#f59e0b",
      ringTo: "#ef4444",
      card: "from-amber-500/10 via-white to-rose-500/10",
      border: "border-amber-200/60",
      badge: "bg-amber-50 text-amber-700 border-amber-200",
      strip: "from-amber-500 to-rose-500",
      accent: "bg-amber-500",
    },
  ];

  return themes[index % themes.length];
}

/* ================================
   UI
================================ */
export function ProgressRing({
  value,
  from,
  to,
}: {
  value: number; // 0..100
  from: string;
  to: string;
}) {
  const v = clamp(value, 0, 100);

  const style = {
    background: `conic-gradient(from 180deg, ${to}, ${from} ${v}%, rgba(244,244,245,1) 0)`,
  } as React.CSSProperties;

  return (
    <div className="relative h-11 w-11 rounded-full p-[2px]" style={style}>
      <div className="flex h-full w-full items-center justify-center rounded-full bg-white text-[11px] font-semibold text-zinc-900">
        {v}%
      </div>
    </div>
  );
}

export function StepRowLite({
  step,
  highlight,
}: {
  step: StepLite;
  highlight?: boolean;
}) {
  const isDoing = step.status === "DOING";
  const isDone = step.status === "DONE";

  const color = isDoing
    ? {
        dot: "bg-sky-500",
        border: "border-sky-200",
        bg: "bg-sky-50/40",
        text: "text-sky-700",
      }
    : isDone
    ? {
        dot: "bg-emerald-500",
        border: "border-emerald-200",
        bg: "bg-emerald-50/30",
        text: "text-emerald-700",
      }
    : {
        dot: "bg-zinc-400",
        border: "border-zinc-200",
        bg: "bg-white/80",
        text: "text-zinc-600",
      };

  return (
    <div
      className={[
        "rounded-xl border px-3 py-2 transition-colors",
        color.border,
        color.bg,
        highlight ? "ring-1 ring-sky-200" : "",
      ].join(" ")}
    >
      <div className="flex items-start gap-3">
        {/* Bullet */}
        <div
          className={["mt-1 h-2.5 w-2.5 shrink-0 rounded-full", color.dot].join(
            " "
          )}
        />

        {/* Content */}
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <div className="truncate text-sm font-medium text-zinc-900">
              {step.title}
            </div>

            {isDoing ? (
              <span className="rounded-full border border-sky-200 bg-sky-50 px-2 py-0.5 text-[11px] font-semibold text-sky-700">
                active
              </span>
            ) : null}
          </div>

          {step.description ? (
            <div className="mt-0.5 text-xs text-zinc-600">
              {step.description}
            </div>
          ) : null}
        </div>

        {/* Status */}
        <span
          className={[
            "shrink-0 rounded-full border px-2 py-0.5 text-[11px] font-semibold bg-white",
            color.border,
            color.text,
          ].join(" ")}
        >
          {step.status}
        </span>
      </div>
    </div>
  );
}
