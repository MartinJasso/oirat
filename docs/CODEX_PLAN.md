# CODEX_PLAN.md

## 1. Bootstrap
- Initialize Next.js (App Router) + TypeScript + Tailwind.
- Configure static export for v0 deployment (`output: 'export'`).
- Add routes: `/`, `/dakujem`, `/privacy`, optional `/terms`.

## 2. Spec system
- Create zod schemas in `lib/spec.ts` for `site.spec.json`, `copy.sk.json`, `seo.json`, and `FORM.json`.
- Load and validate config at build time.
- Implement a section registry and render loop in `app/(site)/page.tsx` based on enabled sections/order.

## 3. SEO system
- Build metadata generator in `lib/seo.ts` from `content/seo.json`.
- Emit JSON-LD for `ProfessionalService` + `FAQPage` derived from copy FAQ.
- Add static `sitemap.xml` and `robots.txt` generation.

## 4. Sections
- Implement typed components:
  - `Hero`
  - `ValueProps`
  - `Packages`
  - `Credibility`
  - `UseCasesTabs`
  - `Process`
  - `FAQ`
  - `CTAForm`
  - `Footer`
- Ensure all primary content is semantic HTML text, not image text.

## 5. Form
- Implement `CTAForm` with client-side validation.
- Implement submit adapter in `lib/form.ts` using mode from `site.spec.json` / `FORM.json`.
- v0 target: Formspree endpoint; redirect to `/dakujem` on success.
- Keep adapter interface ready for v1 `/api/lead`.

## 6. Quality gates
- Add scripts: `npm run lint`, `npm run build`.
- Add `npm run seo:sanity` script to check:
  - single H1
  - title length
  - missing meta description
  - missing canonical
  - missing FAQ JSON-LD when FAQ enabled
- Verify Lighthouse goals for clean static deployment.
