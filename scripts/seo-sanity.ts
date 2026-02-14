import { readFile } from 'node:fs/promises';

async function main() {
  const seo = JSON.parse(await readFile('content/seo.json', 'utf8')) as { title: string; description: string };
  const copy = JSON.parse(await readFile('content/copy.sk.json', 'utf8')) as { hero: { title: string } };

  const issues: string[] = [];
  if (seo.title.length < 20 || seo.title.length > 65) {
    issues.push(`Title length out of range: ${seo.title.length}`);
  }

  if (seo.description.length < 80 || seo.description.length > 170) {
    issues.push(`Description length out of range: ${seo.description.length}`);
  }

  if (!copy.hero.title) {
    issues.push('Missing hero title / H1');
  }

  if (issues.length) {
    console.error('SEO sanity failed:\n' + issues.join('\n'));
    process.exit(1);
  }

  console.log('SEO sanity passed.');
}

main();
