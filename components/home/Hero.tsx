// components/home/Hero.tsx
export function Hero() {
  return (
    <header className="relative overflow-hidden rounded-2xl border bg-white/60 p-6 shadow-sm backdrop-blur">
      <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-gradient-to-br from-violet-500/25 to-sky-400/25 blur-2xl" />
      <div className="absolute -bottom-28 -left-24 h-72 w-72 rounded-full bg-gradient-to-tr from-amber-400/20 to-emerald-400/20 blur-2xl" />

      <div className="relative space-y-3">
        <div className="inline-flex items-center gap-2 rounded-full border bg-white/70 px-3 py-1 text-xs font-medium text-zinc-700">
          <span className="h-2 w-2 rounded-full bg-emerald-500" />
          Launch Planner • template + paste → plan
        </div>

        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 md:text-4xl">
          Build a launch plan that actually moves you forward.
        </h1>

        <p className="max-w-2xl text-sm leading-6 text-zinc-600 md:text-base">
          Create a structured plan in minutes. Start from a proven framework, or
          paste JSON to generate phases, timeframes, and steps. Then execute
          daily — with clarity.
        </p>

        <div className="flex flex-wrap gap-2 pt-2">
          {[
            "4-phase framework",
            "Editable steps",
            "Timeframes",
            "Progress tracking (next)",
          ].map((t) => (
            <span
              key={t}
              className="rounded-full border bg-white/70 px-3 py-1 text-xs text-zinc-700"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </header>
  );
}
