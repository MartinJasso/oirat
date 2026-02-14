# CODEX_PLAN

## 1) Bootstrap
- Create Next.js app with TypeScript + Tailwind.
- Configure static export (`output: 'export'`).

## 2) Spec system
- Implement `zod` schema for `site.spec.json`.
- Load `site.spec.json`, `copy.sk.json`, `seo.json`.
- Render sections from a typed registry.

## 3) SEO system
- Generate metadata from `seo.json`.
- Emit JSON-LD for `ProfessionalService` and FAQ.
- Provide sitemap and robots in static output.

## 4) Sections
- Implement Hero, value props, packages, proof, use cases, process, FAQ, CTA, footer.
- Keep copy in real HTML text.

## 5) Form
- Implement CTA form with client validation.
- Implement v0 static endpoint integration.
- Add thank-you page (`noindex`).

## 6) Quality gates
- `npm run lint`
- `npm run build`
- `npm run seo:check`
