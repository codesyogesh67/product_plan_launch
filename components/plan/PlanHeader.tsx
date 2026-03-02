export function PlanHeader({
  name,
  product,
}: {
  name: string;
  product: string;
}) {
  return (
    <header className="space-y-1">
      <h1 className="text-2xl font-bold">{name}</h1>
      <p className="text-sm opacity-70">Product: {product}</p>
    </header>
  );
}
