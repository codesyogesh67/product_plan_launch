// components/home/CreatePlanCard.tsx
import { createPlanFromPaste } from "@/lib/plan/actions";
import { redirect } from "next/navigation";

export function CreatePlanCard() {
  async function onCreate(formData: FormData) {
    "use server";

    const productName = String(formData.get("productName") || "");
    const planName = String(formData.get("planName") || "");
    const paste = String(formData.get("paste") || "");

    const { planId } = await createPlanFromPaste({
      productName,
      planName,
      paste,
    });
    redirect(`/plan/${planId}`);
  }

  return (
    <section className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="mb-4 flex items-start justify-between gap-4">
        <div>
          <h2 className="text-lg font-semibold text-zinc-900">
            Create a launch plan
          </h2>
          <p className="mt-1 text-sm text-zinc-600">
            Paste notes or JSON. JSON creates steps automatically. Plain text is
            saved as source notes.
          </p>
        </div>
      </div>

      <form action={onCreate} className="space-y-4">
        <div className="grid gap-3 md:grid-cols-2">
          <Field label="Product name" hint="Required">
            <input
              name="productName"
              placeholder="SHSAT App"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
              required
            />
          </Field>

          <Field label="Plan name" hint="Optional">
            <input
              name="planName"
              placeholder="SHSAT Launch Plan (15–30 days)"
              className="w-full rounded-xl border px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
            />
          </Field>
        </div>

        <Field label="Paste notes or JSON" hint="Optional">
          <textarea
            name="paste"
            placeholder={`Plain notes...\n\nOR JSON like:\n{\n  "phases":[{ "title":"Phase 1", "durationDays":5, "steps":[{ "title":"..." }] }]\n}`}
            className="w-full min-h-[220px] rounded-xl border px-3 py-2 font-mono text-xs outline-none focus:ring-2 focus:ring-violet-300"
          />
        </Field>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="text-xs text-zinc-600">
            After creating, you’ll be redirected to your plan page.
          </div>

          <button className="inline-flex items-center justify-center rounded-xl bg-zinc-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-zinc-800 active:bg-zinc-950">
            Generate plan
          </button>
        </div>
      </form>
    </section>
  );
}

function Field({
  label,
  hint,
  children,
}: {
  label: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-baseline justify-between gap-2">
        <label className="text-sm font-medium text-zinc-900">{label}</label>
        {hint ? <span className="text-xs text-zinc-500">{hint}</span> : null}
      </div>
      {children}
    </div>
  );
}
