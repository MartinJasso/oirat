export function Footer({ brand, city }: { brand: string; city: string }) {
  return (
    <footer className="border-t">
      <div className="section-wrap py-8 text-sm text-zinc-600">
        <p>{brand} — Senior AI služby pre {city}</p>
        <div className="mt-2 space-x-4">
          <a href="/privacy" className="underline">Súkromie</a>
          <a href="/terms" className="underline">Podmienky</a>
        </div>
      </div>
    </footer>
  );
}
