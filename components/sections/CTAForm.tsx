'use client';

import { FormEvent, useState } from 'react';
import { submitLead } from '@/lib/form';

export function CTAForm({ endpoint, segments }: { endpoint: string; segments: string[] }) {
  const [status, setStatus] = useState<'idle' | 'ok' | 'error'>('idle');

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);

    try {
      await submitLead(endpoint, {
        name: String(form.get('name') ?? ''),
        company: String(form.get('company') ?? ''),
        contact: String(form.get('contact') ?? ''),
        segment: String(form.get('segment') ?? ''),
        message: String(form.get('message') ?? ''),
        consent: form.get('consent') === 'on'
      });
      setStatus('ok');
      event.currentTarget.reset();
    } catch {
      setStatus('error');
    }
  }

  return (
    <section className="section-wrap border-t" id="cta">
      <h2 className="h2">Získajte plán do 24h</h2>
      <form onSubmit={onSubmit} className="mt-6 grid gap-3 md:grid-cols-2">
        <input required name="name" placeholder="Meno" className="rounded-lg border px-3 py-2" />
        <input required name="company" placeholder="Firma" className="rounded-lg border px-3 py-2" />
        <input required name="contact" placeholder="E-mail alebo telefón" className="rounded-lg border px-3 py-2" />
        <select required name="segment" className="rounded-lg border px-3 py-2">
          {segments.map((segment) => <option key={segment}>{segment}</option>)}
        </select>
        <textarea required name="message" placeholder="Čo chcete zlepšiť?" className="rounded-lg border px-3 py-2 md:col-span-2" rows={4} />
        <label className="md:col-span-2 text-sm">
          <input type="checkbox" required name="consent" className="mr-2" />
          Súhlasím so spracovaním údajov podľa zásad ochrany súkromia.
        </label>
        <button className="rounded-xl bg-ink px-5 py-3 text-white md:col-span-2" type="submit">Odoslať</button>
      </form>
      {status === 'ok' && <p className="mt-3 text-green-700">Ďakujeme, ozveme sa čoskoro.</p>}
      {status === 'error' && <p className="mt-3 text-red-700">Odoslanie sa nepodarilo, skúste to znova.</p>}
    </section>
  );
}
