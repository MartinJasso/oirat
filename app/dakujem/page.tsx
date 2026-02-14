import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Ďakujeme za správu | Senior AI Košice',
  robots: { index: false, follow: false }
};

export default function ThankYouPage() {
  return (
    <main className="section-wrap">
      <h1 className="h1">Ďakujeme</h1>
      <p className="mt-4 text-zinc-700">Ozveme sa vám do 24 hodín.</p>
      <a className="mt-6 inline-block underline" href="/">Späť na hlavnú stránku</a>
    </main>
  );
}
