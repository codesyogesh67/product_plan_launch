// app/page.tsx
import { Hero } from "@/components/home/Hero";
import { CreatePlanCard } from "@/components/home/CreatePlanCard";
import { PlansGrid } from "@/components/home/PlansGrid";
import { RightRail } from "@/components/home/RightRail";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 via-white to-zinc-50">
      <div className="mx-auto max-w-5xl p-6 space-y-6">
        <Hero />

        <PlansGrid />

        <div className="grid gap-6 lg:grid-cols-[1.2fr_0.8fr]">
          <CreatePlanCard />
          <RightRail />
        </div>

        <footer className="pb-10 text-center text-xs text-zinc-500">
          Built for focused launches — not hype.
        </footer>
      </div>
    </main>
  );
}
