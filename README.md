# Mothilal Portfolio

Production portfolio website for **Mothilal M** (Software Engineer, Python/FastAPI backend developer).

## Live Site
- Primary portfolio: https://mothilal.xyz/
- Animated demo: https://mothilal.xyz/animated-portfolio.html

## Repository Structure
- `index.html` — primary portfolio (canonical experience)
- `animated-portfolio.html` — animated demo experience
- `sitemap.xml` — sitemap entries for public pages
- `robots.txt` — crawl directives
- `deployment.yaml` — optional Kubernetes deployment scaffold

## Local Development
This project is static HTML/CSS/JS and does not require a build step.

1. Open the repo directory:
   ```bash
   cd /home/runner/work/Portfolio/Portfolio
   ```
2. Start a local server:
   ```bash
   python -m http.server 8000
   ```
3. Visit: `http://localhost:8000`

## Contact Form Behavior
- The contact form in `index.html` posts to `https://formsubmit.co/ajax/mothilal044@gmail.com`.
- If endpoint delivery fails, it falls back to `mailto:` so inquiries are still captured.
- reCAPTCHA token generation is included and can be validated server-side if a verification endpoint is deployed.

## Deployment Notes
- Designed for static hosting (GitHub Pages / Netlify / Vercel / CDN static host).
- `CNAME` is configured for `mothilal.xyz`.
- If Kubernetes is used, complete `deployment.yaml` with ConfigMap/Service/Ingress resources before production use.

## Author
- Mothilal M
- LinkedIn: https://www.linkedin.com/in/mothilal-m-04803a227
- GitHub: https://github.com/mothilal
