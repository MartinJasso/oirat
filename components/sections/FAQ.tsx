type FAQItem = { q: string; a: string };

export function FAQ({ items }: { items: FAQItem[] }) {
  return (
    <section className="section-wrap border-t">
      <h2 className="h2">FAQ</h2>
      <div className="mt-6 space-y-4">
        {items.map((item) => (
          <details key={item.q} className="rounded-xl border p-4">
            <summary className="cursor-pointer font-medium">{item.q}</summary>
            <p className="mt-2 text-zinc-700">{item.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
