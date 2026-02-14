export function UseCasesTabs({ cases }: { cases: Record<string, string> }) {
  return (
    <section className="section-wrap border-t">
      <h2 className="h2">Použitia podľa segmentu</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-2">
        {Object.entries(cases).map(([segment, text]) => (
          <article key={segment} className="rounded-xl border p-5">
            <h3 className="text-lg font-semibold capitalize">{segment}</h3>
            <p className="mt-2 text-zinc-700">{text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
