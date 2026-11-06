# TEKVANZA — Phase 3: Marketing & SEO

## Implemented in this package
- Page-specific titles and meta descriptions for Home, Projects, Careers and Privacy Policy.
- Canonical URLs aligned with the currently deployed GitHub Pages URL.
- Open Graph and X/Twitter metadata with a dedicated 1200×630 social preview image.
- Explicit index/follow directives for public pages; 404 remains noindex.
- Updated XML sitemap and robots.txt.
- Expanded homepage ProfessionalService/Organization structured data using only known business details.
- Breadcrumb structured data on secondary pages.
- LinkedIn profile normalized to the company URL supplied by the owner.
- No GA4 or third-party analytics code added.

## Keyword and page targeting
| Page | Primary topic | Supporting phrases |
|---|---|---|
| Home | IT infrastructure solutions Alexandria | business networking, IT support, IT infrastructure company Alexandria |
| Home / Services section | Network infrastructure | structured cabling, network installation, rack installation, patch panels |
| Home / Services section | CCTV installation | business CCTV, IP cameras, NVR installation, surveillance systems |
| Home / Services section | Firewall and network security | Sophos firewall, Fortinet firewall, VPN configuration, network segmentation |
| Projects | IT infrastructure projects | network rack projects, CCTV installations, access control projects |
| Careers | IT jobs and CV submissions | network technician, CCTV technician, IT support careers |

Use these phrases naturally in visible copy, headings, project descriptions and image alt text. Do not repeat keywords unnaturally or claim vendor certification/partnership unless verified.

## Important limitations / owner actions before launch
1. The site is still canonicalized to `https://titan-5807.github.io/tekvanza/`. If `tekvanza.com` is purchased and configured as the actual website domain, update canonical, Open Graph, JSON-LD, sitemap and Search Console property together. Do not switch these values before DNS and HTTPS work.
2. Arabic content is currently switched client-side on the same URLs. Proper Arabic search indexing needs separate crawlable Arabic URLs (for example `/ar/`) and reciprocal `hreflang` tags; do not add hreflang to the current single-URL language toggle.
3. Verify phone number, service area and all public business details before publishing. No street address, opening hours, ratings, prices or certifications have been invented.
4. Submit the sitemap in Google Search Console after verifying site ownership. Request indexing for the homepage, Projects and Careers pages.
5. Analytics remains disabled because the current GA4 property is not owned by TEKVANZA. Add a new company-owned property only after the owner creates it and approves the privacy/consent setup.
6. Validate structured data with Schema Markup Validator / Rich Results Test after deployment. Structured data does not guarantee a rich result.
7. Test social previews using Facebook Sharing Debugger and LinkedIn Post Inspector after deployment.

## Google Search Console checklist
- Create a Domain property if TEKVANZA controls the custom domain; otherwise verify the current URL-prefix property.
- Complete DNS or HTML verification as instructed by Google.
- Submit `https://titan-5807.github.io/tekvanza/sitemap.xml`.
- Inspect the canonical URL of each important page.
- Review Page indexing, HTTPS, Core Web Vitals and search queries periodically.

## Important distinction
This package improves on-page and technical SEO. It cannot guarantee rankings, indexed pages, leads or performance scores. Those depend on deployment, site ownership verification, content quality, competitors, backlinks, real user experience and ongoing measurement.
