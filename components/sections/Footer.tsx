import Link from 'next/link';

export function Footer({ brand, city }: { brand: string; city: string }) {
  return (
    <footer className="border-t">
      <div className="section-wrap py-8 text-sm text-zinc-600">
        <p>{brand} — Senior AI služby pre {city}</p>
        <div className="mt-2 space-x-4">
          <Link href="/privacy" className="underline">Súkromie</Link>
          <Link href="/terms" className="underline">Podmienky</Link>
        </div>
      </div>
    </footer>
  );
}
