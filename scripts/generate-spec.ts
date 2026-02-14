import { mkdir, readFile, writeFile } from 'node:fs/promises';

type Brief = {
  businessName: string;
  city: string;
  offer: string;
  audience: string;
  pains: string[];
  proof?: string[];
  styleWords?: string[];
  cta?: string;
};

function parseBrief(text: string): Brief {
  const lines = text.split('\n').map((line) => line.trim()).filter(Boolean);
  const getValue = (label: string) => lines.find((line) => line.toLowerCase().startsWith(label))?.split(':').slice(1).join(':').trim() ?? '';

  return {
    businessName: getValue('business name') || 'Your Brand',
    city: getValue('city') || 'Košice',
    offer: getValue('offer') || 'Senior AI služby',
    audience: getValue('audience') || 'lokálne firmy',
    pains: (getValue('pains') || 'pomalé procesy; manuálna administratíva; nízka konverzia').split(';').map((item) => item.trim()),
    proof: getValue('proof') ? getValue('proof').split(';').map((item) => item.trim()) : undefined,
    styleWords: getValue('style') ? getValue('style').split(',').map((item) => item.trim()) : ['minimal', 'direct'],
    cta: getValue('cta') || 'Získať plán do 24h'
  };
}

async function main() {
  const briefText = await readFile('BRIEF.md', 'utf8');
  const brief = parseBrief(briefText);

  const spec = {
    brand: {
      name: brief.businessName,
      city: brief.city,
      tone: brief.styleWords,
      theme: { radius: 'xl', density: 'tight' }
    },
    sections: [
      { type: 'hero', enabled: true },
      { type: 'valueProps', enabled: true },
      { type: 'packages', enabled: true },
      { type: 'proof', enabled: Boolean(brief.proof && brief.proof.length) },
      { type: 'useCasesTabs', enabled: true },
      { type: 'process', enabled: true },
      { type: 'faq', enabled: true },
      { type: 'ctaForm', enabled: true },
      { type: 'footer', enabled: true }
    ],
    form: {
      mode: 'formspree',
      endpoint: 'https://formspree.io/f/xxxx',
      fields: ['name', 'company', 'contact', 'segment', 'message', 'consent']
    }
  };

  const seo = {
    brandName: brief.businessName,
    city: brief.city,
    siteUrl: 'https://example.com',
    title: `AI konzultant ${brief.city} | ${brief.offer}`,
    description: `${brief.offer} pre ${brief.audience} v meste ${brief.city}.`,
    keywords: [`AI konzultant ${brief.city}`, 'AI audit', 'automatizácia procesov']
  };

  const codexPlan = `# CODEX PLAN\n\n1. Bootstrap Next.js + Tailwind + static export\n2. Zod schema + section registry\n3. SEO metadata + JSON-LD + sitemap/robots\n4. Implement section components\n5. CTA form adapter + dakujem page\n6. Run lint/build/seo sanity checks\n`;

  await mkdir('content', { recursive: true });
  await mkdir('docs', { recursive: true });
  await writeFile('content/site.spec.json', JSON.stringify(spec, null, 2));
  await writeFile('content/seo.json', JSON.stringify(seo, null, 2));
  await writeFile('docs/CODEX_PLAN.md', codexPlan);
}

main();
