# TEKVANZA — Release Package Review

## Static checks completed
- 5 HTML pages present: index, projects, careers, privacy, 404.
- JavaScript syntax check passed.
- No duplicate HTML IDs found.
- No missing local href/src targets found inside the package.
- No images without alt attributes found.
- Sitemap XML and manifest JSON parse successfully.
- JSON-LD blocks parse as JSON.
- Active GA4 / gtag / GTM scripts are absent.
- Contact form points to the configured Formspree endpoint and includes `_gotcha`.
- Careers page correctly uses email submission with manual CV attachment.
- Social preview image rebuilt at 1200 × 630 with all text inside safe margins.

## Important limitations / not verified
- Formspree recipient configuration and real message delivery cannot be confirmed from static files.
- The Careers mailto workflow depends on the visitor's email client; CV attachment is manual.
- The legal adequacy of the Privacy Policy requires review against actual company practices and Egyptian requirements.
- Business hours, warranty terms, phone number, project permissions and all marketing claims must be confirmed by the owner.
- Search ranking, Google indexing, Core Web Vitals and social preview rendering require post-deployment checks.

## Deployment blocker
The connected GitHub repository currently has an older revision and does not contain all image assets referenced by this release package. A partial text-only update would cause broken images. Deploy the complete package including the full `assets/` directory in one synchronized update.
