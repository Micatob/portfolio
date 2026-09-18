# Micatech Portfolio — Deploy & SEO switchboard

Single place for the live URL and go-live steps. Change the domain in exactly 3 spots when you buy one.

## Live URL

- **Placeholder (Vercel free):** `https://micatech.vercel.app` — will be live the moment you push, before any domain.
- If your Vercel **project name** differs from `micatech`, that subdomain changes (e.g. project `micatech-site` → `micatech-site.vercel.app`).

## Change this ONE thing later (custom domain)

Search-and-replace `micatech.vercel.app` in these 3 files:

1. `sitemap.xml`
2. `robots.txt`
3. Every `<head>`'s `canonical` + `og:url` + `og:image` in: `index.html`, `services.html`, `about.html`, `certifications.html`, `contact.html`

## SEO assets (already added)

- `sitemap.xml` — all 5 pages
- `robots.txt` — points crawlers to sitemap
- `favicon.svg` — gold Micatech mark (tab + browser identity)
- `manifest.webmanifest` — installable app identity
- Per-page: canonical, Open Graph, Twitter cards, theme-color, JSON-LD structured data (index)

## Go live checklist (one time)

1. `git init` — already done; commit all files.
2. Create a repo on **GitHub** (name: `portfolio`, make it **Public**).
3. Push: `git push -u origin main`
4. Go to **vercel.com** → Sign in with GitHub → Import your `portfolio` repo → Deploy.
5. Vercel detects a static site automatically; deploy finishes in ~1 min.
6. Verify: open the `*.vercel.app` URL, then visit `/sitemap.xml` and `/robots.txt`.
7. Submit sitemap to **Google Search Console** (property type "Domain" or "URL prefix" using the vercel.app URL) → URL Inspection → Request indexing.

## Update-going-forward

- Make an edit locally → `git add .` → `git commit -m "update"` → `git push`. Vercel redeploys automatically. No FTP, no dashboard step.