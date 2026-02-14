import copy from '@/content/copy.sk.json';
import seo from '@/content/seo.json';

export function buildProfessionalServiceJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: seo.brandName,
    description: seo.description,
    areaServed: seo.city,
    url: seo.siteUrl,
    address: {
      '@type': 'PostalAddress',
      addressLocality: seo.city,
      addressCountry: 'SK'
    }
  };
}

export function buildFaqJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: copy.faq.items.map((item) => ({
      '@type': 'Question',
      name: item.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.a
      }
    }))
  };
}
