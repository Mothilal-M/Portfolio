# Deploying mothilal.dev to Vercel

These steps need your Vercel account and your domain registrar — do them in order. The site is fully QA-able before any DNS change, so there is zero downtime.

## 1. Push and merge

```bash
git push -u origin rebuild/next16
# open a PR, review, merge to main (or push main directly)
```

## 2. Import into Vercel

1. Go to [vercel.com/new](https://vercel.com/new) → Import `Mothilal-M/Portfolio` from GitHub.
2. Framework is auto-detected as Next.js — **no configuration needed**, no env vars.
3. Deploy. You get a `*.vercel.app` URL.

## 3. QA on vercel.app BEFORE touching DNS

- [ ] Hero 3D scene loads on desktop; particles react to cursor
- [ ] Mobile (real phone): no custom cursor, reduced particle count, smooth scroll
- [ ] Skills section pins and stacks on desktop; plain list on mobile
- [ ] Contact form: send a real message → arrives at mothilal044@gmail.com
- [ ] `https://<project>.vercel.app/animated-portfolio.html` → redirects to `/`
- [ ] DevTools → Rendering → "Emulate prefers-reduced-motion" → calm static variant
- [ ] Lighthouse (mobile, incognito): Perf ≥ 90, SEO 100, A11y ≥ 95
- [ ] Share preview: paste the URL in [opengraph.xyz](https://www.opengraph.xyz) — the dark OG card should show

## 4. DNS cutover (at your registrar)

1. Vercel project → **Settings → Domains** → add `mothilal.dev` and `www.mothilal.dev` (set www → redirect to apex). Vercel shows the exact records — use those values; the current standard is:
   - Apex `A` record → `76.76.21.21`
   - `www` `CNAME` → `cname.vercel-dns.com`
2. **Delete** any obsolete GitHub Pages A records.
3. ⚠️ **Do NOT touch the `10xmindplay` subdomain record** — `10xmindplay.mothilal.dev` is on its own DNS record.
4. Wait for propagation (check [dnschecker.org](https://dnschecker.org)); Vercel auto-issues TLS once the record resolves.

## 5. After cutover

- [ ] GitHub repo → Settings → Pages → set Source to **None** (disable GitHub Pages)
- [ ] `curl -I https://mothilal.dev/animated-portfolio.html` → 308/301 to `/`
- [ ] Google Search Console: property should verify → submit `https://mothilal.dev/sitemap.xml` → request re-crawl of `/`
- [ ] Delete the `legacy/` folder and this checklist's step is done:

```bash
git rm -r legacy && git commit -m "Remove legacy static site after cutover"
```
