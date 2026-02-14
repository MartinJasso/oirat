export function ValueProps({ items }: { items: string[] }) {
  return (
    <section className="section-wrap border-t">
      <h2 className="h2">Čo získate</h2>
      <ul className="mt-6 grid gap-4 md:grid-cols-3">
        {items.map((item) => (
          <li key={item} className="rounded-xl border p-5">{item}</li>
        ))}
      </ul>
    </section>
  );
}
