export function PlanDetailHeader({
  plan,
}: {
  plan: { product: string; name: string };
}) {
  return (
    <header className="rounded-2xl border bg-white p-5 shadow-sm">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <div className="text-xs text-zinc-500">Product</div>
          <h1 className="text-2xl font-bold tracking-tight text-zinc-900">
            {plan.product}
          </h1>
          <p className="mt-1 text-sm text-zinc-600">{plan.name}</p>
        </div>

        <div className="flex gap-2">
          <span className="rounded-full border bg-zinc-50 px-3 py-1 text-xs text-zinc-700">
            Read-only (next: edit)
          </span>
        </div>
      </div>
    </header>
  );
}
