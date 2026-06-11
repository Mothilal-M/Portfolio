# mothilal.xyz

Animated 3D portfolio for **Mothilal M** — Software Engineer (Python · FastAPI · GCP) at 10xscale.ai.

Live: https://mothilal.xyz

## Stack

- **Next.js 16** (App Router, React 19, TypeScript)
- **React Three Fiber + drei** — interactive hero scene (particle field with cursor repulsion, distorted icosahedron)
- **GSAP** (ScrollTrigger, SplitText) + **Lenis** — scroll choreography, pinned skills deck, masked text reveals
- **Tailwind CSS v4** — design tokens in `app/globals.css` `@theme`

## Editing content

All copy and data live in [`lib/content.ts`](lib/content.ts) — projects, skills, experience, contact channels, SEO strings. Edit there; the components are presentation only. Structured data (JSON-LD) is generated from the same file via [`lib/jsonld.ts`](lib/jsonld.ts).

To retheme, swap `--color-accent` in [`app/globals.css`](app/globals.css) — the whole site follows the single accent token.

## Development

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm run lint
```

## Architecture notes

- The R3F canvas is dynamic-imported with `ssr: false` — three.js stays out of the initial bundle; WebGL-less and reduced-motion visitors get a static fallback.
- Lenis is driven by the GSAP ticker (`SmoothScroll` provider) so ScrollTrigger stays in sync.
- All motion lives inside `gsap.matchMedia` — `prefers-reduced-motion` users get static content with native scroll.
- The preloader is gated behind a `.js` html class set by an inline script, so no-JS visitors never see it; it plays once per session.
- The contact form posts to FormSubmit (`lib/content.ts` → `site.formEndpoint`) with a honeypot field.

## Deployment

Deployed on Vercel; the `mothilal.xyz` apex and `www` point at Vercel DNS. Legacy GitHub Pages URLs (`/index.html`, `/animated-portfolio.html`, `/mothilal.png`) 301 to their new homes via `next.config.ts`.

The old static site is preserved under [`legacy/`](legacy/) until the cutover is verified, then it can be deleted.
