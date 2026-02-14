export function Proof({ title, bullets }: { title: string; bullets: string[] }) {
  return (
    <section className="section-wrap border-t">
      <h2 className="h2">{title}</h2>
      <ul className="mt-6 list-disc space-y-2 pl-5 text-zinc-700">
        {bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
      </ul>
    </section>
  );
}
