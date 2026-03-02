"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";

type Phase = {
  id: string;
  title: string;
  durationDays: number;
  steps: { status: string }[]; // kept for compatibility (not displayed)
};

function anchorId(phaseId: string) {
  return `phase-${phaseId}`;
}

function shortTitle(title: string) {
  return title.length > 46 ? title.slice(0, 46) + "…" : title;
}

function dotColor(idx: number) {
  const colors = [
    "bg-violet-500",
    "bg-sky-500",
    "bg-emerald-500",
    "bg-amber-500",
  ];
  return colors[idx % colors.length];
}

/**
 * PhaseRail:
 * - "focusedPhaseId" tracks the phase section currently most visible on the page
 * - clicking a phase scrolls the MAIN page to that section + keeps the rail item visible
 */
export function PhaseRail({ phases }: { phases: Phase[] }) {
  const ids = useMemo(() => phases.map((p) => anchorId(p.id)), [phases]);

  const [focusedPhaseId, setFocusedPhaseId] = useState<string>(ids[0] ?? "");
  const [selectedPhaseId, setSelectedPhaseId] = useState<string>(ids[0] ?? "");

  const railScrollRef = useRef<HTMLDivElement | null>(null);

  // Adjust if you have a sticky header (e.g., navbar)
  const SCROLL_OFFSET_PX = 96;

  // Keep selected/focused in sync if phases change
  useEffect(() => {
    const first = ids[0] ?? "";
    setSelectedPhaseId((prev) => (prev && ids.includes(prev) ? prev : first));
    setFocusedPhaseId((prev) => (prev && ids.includes(prev) ? prev : first));
  }, [ids]);

  // Observe the real page sections (phase-xxx) to update focusedPhaseId.
  useEffect(() => {
    if (!ids.length) return;

    const els = ids
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    if (!els.length) return;

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort(
            (a, b) => (b.intersectionRatio ?? 0) - (a.intersectionRatio ?? 0)
          )[0];

        if (visible?.target?.id) setFocusedPhaseId(visible.target.id);
      },
      {
        root: null,
        rootMargin: "-20% 0px -70% 0px",
        threshold: [0.1, 0.25, 0.5, 0.75],
      }
    );

    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, [ids]);

  function scrollMainToPhase(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    // scrollIntoView doesn't support offsets well, so we do manual scroll
    const top =
      el.getBoundingClientRect().top + window.scrollY - SCROLL_OFFSET_PX;

    window.scrollTo({
      top: Math.max(0, top),
      behavior: "smooth",
    });
  }

  function keepRailButtonVisible(id: string) {
    const rail = railScrollRef.current;
    if (!rail) return;

    const btn = rail.querySelector<HTMLButtonElement>(
      `button[data-phase-id="${id}"]`
    );
    if (!btn) return;

    const railRect = rail.getBoundingClientRect();
    const btnRect = btn.getBoundingClientRect();

    if (btnRect.top < railRect.top + 8) {
      rail.scrollBy({
        top: btnRect.top - railRect.top - 16,
        behavior: "smooth",
      });
    } else if (btnRect.bottom > railRect.bottom - 8) {
      rail.scrollBy({
        top: btnRect.bottom - railRect.bottom + 16,
        behavior: "smooth",
      });
    }
  }

  function handleSelect(id: string) {
    setSelectedPhaseId(id);

    // 1) scroll MAIN page to that phase section
    scrollMainToPhase(id);

    // 2) keep rail item in view (scrolls only the rail)
    requestAnimationFrame(() => keepRailButtonVisible(id));
  }

  return (
    <section className="relative overflow-hidden rounded-2xl border border-white/10 bg-zinc-950 p-4 shadow-[0_12px_60px_-25px_rgba(0,0,0,0.9)]">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -left-24 -top-24 h-64 w-64 rounded-full bg-violet-600/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 -bottom-24 h-64 w-64 rounded-full bg-sky-500/20 blur-3xl" />

      {/* header */}
      <div className="relative flex items-start justify-between gap-4">
        <div className="min-w-0">
          <div className="text-sm font-semibold text-white">Phases</div>
          <div className="mt-1 text-xs text-white/60">
            Scroll to browse. Clicking a phase jumps to that section.
          </div>
        </div>

        <div className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-white/70">
          {phases.length} total
        </div>
      </div>

      {/* scrollable stepper */}
      <div
        ref={railScrollRef}
        className="relative mt-4 max-h-[360px] overflow-y-auto pr-1"
      >
        {/* timeline spine */}
        <div className="pointer-events-none absolute left-[11px] top-2 bottom-2 w-px bg-white/10" />

        <ul className="space-y-2">
          {phases.map((p, idx) => {
            const id = anchorId(p.id);

            const isFocused = id === focusedPhaseId; // current phase on the page
            const isSelected = id === selectedPhaseId; // selected in the rail

            return (
              <motion.li
                key={p.id}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="relative"
              >
                <button
                  type="button"
                  data-phase-id={id}
                  onClick={() => handleSelect(id)}
                  className={[
                    "group relative flex w-full items-start gap-3 rounded-xl px-3 py-3 text-left transition",
                    "focus:outline-none focus:ring-2 focus:ring-sky-500/40",
                    isSelected ? "bg-white/8" : "hover:bg-white/5",
                  ].join(" ")}
                >
                  {/* dot */}
                  <div className="relative mt-[2px] flex w-6 items-center justify-center">
                    <span
                      className={[
                        "h-2.5 w-2.5 rounded-full shadow-sm transition",
                        isFocused
                          ? "bg-white"
                          : `${dotColor(
                              idx
                            )} opacity-90 group-hover:opacity-100`,
                      ].join(" ")}
                    />
                    {/* halo for focused (current on page) */}
                    {isFocused ? (
                      <span className="absolute h-6 w-6 rounded-full bg-white/10 blur-[2px]" />
                    ) : null}
                  </div>

                  {/* content */}
                  <div className="min-w-0 flex-1">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <div
                          className={[
                            "truncate text-sm font-semibold transition",
                            isFocused ? "text-white" : "text-white/90",
                          ].join(" ")}
                        >
                          {shortTitle(p.title)}
                        </div>
                        <div className="mt-1 text-xs text-white/60">
                          {p.durationDays} days
                        </div>
                      </div>

                      {/* badge for focused phase */}
                      {isFocused ? (
                        <span className="shrink-0 rounded-full border border-white/10 bg-white/5 px-2 py-1 text-[11px] text-white/80">
                          In view
                        </span>
                      ) : null}
                    </div>
                  </div>
                </button>
              </motion.li>
            );
          })}
        </ul>
      </div>

      {/* footer hint */}
      <div className="mt-3 text-[11px] text-white/50">
        <span className="text-white/70">Focused phase</span> updates
        automatically as you scroll the main page.
      </div>
    </section>
  );
}
