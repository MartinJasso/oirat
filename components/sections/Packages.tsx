type Package = { name: string; price: string; description: string };

export function Packages({ items }: { items: Package[] }) {
  return (
    <section className="section-wrap border-t">
      <h2 className="h2">Balíky služieb</h2>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <article key={item.name} className="rounded-xl border p-5">
            <h3 className="text-xl font-semibold">{item.name}</h3>
            <p className="mt-2 text-accent">{item.price}</p>
            <p className="mt-3 text-zinc-700">{item.description}</p>
          </article>
        ))}
      </div>
    </section>
  );
}
