# QA_CHECKLIST.md

## Functional
- [ ] All enabled sections from `site.spec.json` render in correct order.
- [ ] Disabled section does not render.
- [ ] CTA button scrolls or links correctly to form.
- [ ] Form validates required fields.
- [ ] Successful submission reaches `/dakujem`.

## SEO
- [ ] Exactly one H1 on homepage.
- [ ] Title includes local intent (`Košice`, `AI`, `automatizácia`).
- [ ] Meta description is present and human-readable.
- [ ] Canonical URL present.
- [ ] JSON-LD contains `ProfessionalService`.
- [ ] JSON-LD contains `FAQPage` when FAQ is enabled.
- [ ] `/dakujem` is `noindex`.
- [ ] Sitemap and robots are generated.

## Performance
- [ ] Static generation/export succeeds.
- [ ] Hero media optimized (dimensions set).
- [ ] No unnecessary client-side JS in static sections.
- [ ] Fonts use `display: swap`.

## Legal
- [ ] Privacy page exists and is linked in footer.
- [ ] Terms page exists (if enabled by spec).
- [ ] Consent checkbox text visible near submit button.

## Content safety
- [ ] No invented claims in proof section.
- [ ] Placeholders clearly marked where proof is missing.
