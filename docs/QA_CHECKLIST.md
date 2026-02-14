# QA_CHECKLIST.md

## Functional
- [ ] All enabled sections in `site.spec.json` render in configured order.
- [ ] Disabled sections do not render.
- [ ] CTA button scrolls to form.
- [ ] Form validates required fields and consent.
- [ ] Successful submit redirects to `/dakujem`.

## SEO
- [ ] Exactly one H1 on home page.
- [ ] Title includes `AI konzultant Košice`.
- [ ] Meta description is present and meaningful.
- [ ] Canonical URL present.
- [ ] JSON-LD `ProfessionalService` present.
- [ ] JSON-LD `FAQPage` present when FAQ section enabled.
- [ ] `/dakujem` has noindex.
- [ ] `sitemap.xml` and `robots.txt` exist.

## Performance
- [ ] Content rendered statically (SSG/export).
- [ ] No unnecessary client JS for static text sections.
- [ ] Images optimized and sized.
- [ ] Fonts self-hosted with `display: swap`.

## Legal
- [ ] `/privacy` page published.
- [ ] `/terms` page published (if required).
- [ ] Consent checkbox text links to privacy policy.

## Prospecting Tool
- [ ] `tools/leads/generate_leads.py` creates CSV with expected columns.
- [ ] Supports city and segment inputs.
- [ ] Overpass provider works without API key.
