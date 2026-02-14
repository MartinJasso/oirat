export function Process({ steps }: { steps: string[] }) {
  return (
    <section className="section-wrap border-t">
      <h2 className="h2">Proces spolupráce</h2>
      <ol className="mt-6 grid gap-4 md:grid-cols-4">
        {steps.map((step, idx) => (
          <li key={step} className="rounded-xl border p-5">
            <p className="text-sm text-zinc-500">Krok {idx + 1}</p>
            <p className="mt-2">{step}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
