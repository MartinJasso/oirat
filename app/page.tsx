import copy from '@/content/copy.sk.json';
import siteSpecRaw from '@/content/site.spec.json';
import { siteSpecSchema } from '@/lib/spec';
import { buildFaqJsonLd, buildProfessionalServiceJsonLd } from '@/lib/seo';
import { Hero } from '@/components/sections/Hero';
import { ValueProps } from '@/components/sections/ValueProps';
import { Packages } from '@/components/sections/Packages';
import { Proof } from '@/components/sections/Proof';
import { UseCasesTabs } from '@/components/sections/UseCasesTabs';
import { Process } from '@/components/sections/Process';
import { FAQ } from '@/components/sections/FAQ';
import { CTAForm } from '@/components/sections/CTAForm';
import { Footer } from '@/components/sections/Footer';

const siteSpec = siteSpecSchema.parse(siteSpecRaw);

export default function HomePage() {
  const sections = siteSpec.sections.filter((section) => section.enabled);

  return (
    <main>
      {sections.map((section) => {
        switch (section.type) {
          case 'hero':
            return <Hero key={section.type} {...copy.hero} />;
          case 'valueProps':
            return <ValueProps key={section.type} items={copy.valueProps.items} />;
          case 'packages':
            return <Packages key={section.type} items={copy.packages.items} />;
          case 'proof':
            return <Proof key={section.type} title={copy.proof.title} bullets={copy.proof.bullets} />;
          case 'useCasesTabs':
            return <UseCasesTabs key={section.type} cases={copy.useCasesTabs} />;
          case 'process':
            return <Process key={section.type} steps={copy.process.steps} />;
          case 'faq':
            return <FAQ key={section.type} items={copy.faq.items} />;
          case 'ctaForm':
            return (
              <CTAForm
                key={section.type}
                endpoint={siteSpec.form.endpoint}
                segments={copy.form.segments}
              />
            );
          case 'footer':
            return <Footer key={section.type} brand={siteSpec.brand.name} city={siteSpec.brand.city} />;
          default:
            return null;
        }
      })}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildProfessionalServiceJsonLd()) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(buildFaqJsonLd()) }}
      />
    </main>
  );
}
