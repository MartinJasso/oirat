# CODEX_PLAN.md

## 1) Bootstrap
- Create Next.js app with App Router, TypeScript, Tailwind.
- Configure static export mode (`output: 'export'`) for v0 deployment.
- Add scripts: `lint`, `build`, `seo:sanity`.

## 2) Spec system
- Implement `lib/spec.ts` with zod schema for `site.spec.json`, `copy.sk.json`, `seo.json`, `FORM.json`.
- Add typed loader utilities that fail fast on invalid config.
- Build section registry mapping `sections[].type` to React components.

## 3) SEO system
- Build metadata generator from `content/seo.json`.
- Emit JSON-LD for `ProfessionalService` + `FAQPage` (from FAQ section content).
- Add static `sitemap.xml` and `robots.txt` generation.
- Ensure `/dakujem` is `noindex`.

## 4) Sections
- Implement components:
  - `Hero`, `ValueProps`, `Packages`, `Proof`, `UseCasesTabs`, `Process`, `FAQ`, `CTAForm`, `Footer`.
- Render by iterating through enabled sections in `site.spec.json`.
- Keep section content as semantic HTML text for crawlability.

## 5) Form
- Build static-compatible form adapter (`formspree` mode first).
- Add client validation for required fields and consent.
- On success: route to `/dakujem`, optionally show calendar CTA.
- Keep adapter interface ready for v1 `/api/lead` migration.

## 6) Quality gates
- Run and pass `npm run lint` and `npm run build`.
- Add `scripts/seo-sanity.ts` checks:
  - single H1 present,
  - title length reasonable,
  - meta description exists,
  - canonical exists,
  - FAQ JSON-LD rendered when FAQ enabled.
- Confirm Lighthouse goals baseline: Perf 95+, SEO 100, Best Practices 100.
