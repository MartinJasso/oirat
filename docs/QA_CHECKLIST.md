# QA_CHECKLIST.md

## Functional
- [ ] Only enabled sections render.
- [ ] Section order follows `content/site.spec.json`.
- [ ] CTA button scrolls to form.
- [ ] Form validates required fields and consent.
- [ ] Successful submit redirects to `/dakujem`.

## SEO
- [ ] Exactly one H1 on homepage.
- [ ] `<title>` contains `AI konzultant Košice`.
- [ ] Meta description present and meaningful.
- [ ] Canonical is present on indexable pages.
- [ ] `ProfessionalService` JSON-LD present.
- [ ] `FAQPage` JSON-LD matches FAQ section content.
- [ ] `/dakujem` marked `noindex`.
- [ ] Sitemap and robots exist.

## Performance
- [ ] Static HTML for content sections.
- [ ] No unnecessary client bundles.
- [ ] Hero image optimized and sized.
- [ ] Images below fold lazy-loaded.
- [ ] Fonts self-hosted with `display: swap`.

## Legal
- [ ] Privacy page available from footer.
- [ ] Terms page linked if present.
- [ ] Consent text visible near submit action.

## Content integrity
- [ ] No fabricated proof claims.
- [ ] Proof section hidden or placeholder if evidence missing.
- [ ] Local intent keywords used naturally (Košice, AI audit, automatizácia).
