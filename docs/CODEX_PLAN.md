# CODEX_PLAN.md

## 1) Bootstrap
- Create Next.js app (App Router), TypeScript, Tailwind.
- Configure static export for v0 (`output: 'export'`).
- Add routes: `/`, `/dakujem`, `/privacy`, `/terms`.

## 2) Spec system
- Implement zod schema for `content/site.spec.json`.
- Add typed loaders for `site.spec.json`, `copy.sk.json`, `seo.json`, `FORM.json`.
- Build section registry and dynamic rendering of enabled sections in configured order.

## 3) SEO system
- Build metadata generator from `content/seo.json`.
- Emit JSON-LD for `ProfessionalService` and `FAQPage`.
- Generate static `sitemap.xml` and `robots.txt`.
- Enforce single H1 in rendered landing page.

## 4) Sections
- Implement section components:
  - Hero
  - ValueProps
  - Packages
  - Proof
  - UseCasesTabs
  - Process
  - FAQ
  - CTAForm
  - Footer
- Ensure all primary content is textual HTML for indexability.

## 5) Form
- Implement CTA form UI with these fields: name, company, contact, segment, message, consent.
- Implement v0 submit adapter (Formspree/Tally/Basin) based on `content/FORM.json`.
- Add client-side validation and post-submit redirect to `/dakujem`.
- Keep adapter interface compatible with v1 serverless `/api/lead` migration.

## 6) Quality gates
- Add scripts: `npm run lint`, `npm run build`.
- Add simple SEO sanity script checking:
  - title presence + length
  - canonical presence
  - H1 count
  - FAQ JSON-LD presence when FAQ enabled
- Add QA checklist execution note before release.
