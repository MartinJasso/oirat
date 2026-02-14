type HeroProps = {
  title: string;
  subtitle: string;
  ctaLabel: string;
};

export function Hero({ title, subtitle, ctaLabel }: HeroProps) {
  return (
    <section className="section-wrap pt-24" id="top">
      <h1 className="h1">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-zinc-700">{subtitle}</p>
      <a href="#cta" className="mt-8 inline-block rounded-xl bg-ink px-6 py-3 text-white hover:opacity-90">
        {ctaLabel}
      </a>
    </section>
  );
}
