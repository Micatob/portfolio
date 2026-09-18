# MICATECH — Session Snapshot — 2026-09-17
> snapshot created to resume later: say `continue Micatech portfolio` or `load SESSION.md`

## 1. Project identity
- **Brand:** MICATECH. (was CHAEL) — tagline *IT Solutions that Power Business*
- **Owner:** Michael Eromosele Ebibhazebhilo — **Micato** — CEO — Network • Cybersecurity Analyst • IT Support Specialist • 2 Years Experience
- **Positioning:** IT Solutions shop: Cybersecurity SOC, Networking & Infrastructure, IT Support, Web Development for small brands. Enterprise discipline at SME price.
- **Workspace:** `C:\Users\Hermes\Desktop\portfolio\` — vanilla HTML/CSS/JS, Python http.server, OpenCode + muse-spark-1.2
- **Live reference:** hiresphere.com.ng — **local services marketplace** where Nigerians buy & sell everyday services. Second reference: CHAEL — Cyber Defense & SOC Lab (reference build, not client).

## 2. Design system (current)
- **Dark:** gold-on-black `style.css:8` — `--bg #070709` `--bg-card #121214` `--border #232326` `--text #F2EDE3` `--accent #D4AF37`
- **Light:** warm cream `style.css:46` — `--bg #FFFBEB` `--bg-card #FFFFFF` `--border #E7E5E4` `--text #1C1917` `--accent #A16207`
- **Typography:** Inter 400-800, JetBrains Mono 400-600
- **Radius:** 14px/10px/pill, `max-w 1120px`, `nav-h 64px`, `section-pad 104px / 72px mobile`

## 3. Animation system
- **Nav:** `navIn 0.95s 0.15s`
- **Hero entrance:** `greeting 0.85s 0.35s → name 0.95s 0.62s → title 0.85s 0.92s → bio 0.85s 1.16s → btns 0.85s 1.42s → meta 1s 1.88s`
- **Reveal:** `[data-reveal] translateY(22px) opacity 0.82s` + `IntersectionObserver threshold 0.14 rootMargin -40px`
- **Page enter:** `body.page-enter fadeIn 0.95s 0.1s`
- **Hover alive:** logo lift, nav link lift, stat scale, project glow, skill icon rotate 6deg, cert scale 1.12, tool scale 1.03, exp period, timeline li slide, btn lift, **section title underline extend on hover**
- **NEW — Text scramble:** hero headline characters randomize and resolve on page load (`main.js:190`)
- **NEW — Counter animation:** stat numbers count up from 0 when scrolled into view (`main.js:218`)
- **NEW — Breathing glow:** gradient "IT Partner" text pulses glow (`breatheGlow 4s` keyframe)
- **NEW — Floating greeting:** hero greeting pill floats gently (`floatGreeting 3.5s`)
- **NEW — Typing cursor:** blinking cursor on hero title, fades after 3.5s
- **NEW — Image hover:** project card images zoom + shimmer slide on hover

## 4. File map (current)
- `index.html:256` — hero gold partner, stats (with `data-count` attrs for counter), What We Do **4 cards all with images** (SOC `soc-dashboard.webp`, Network `server.jpg`, IT Support `tech.jpg`, Web Dev `web.jpeg`), Why Micatech 3 cats, **#work** `work-grid` 2× `work-card` without browser mock, hiresphere marketplace + CHAEL lab
- `services.html:167` — page-hero + 5 exp-item, Bundled Packages, CTA
- `about.html:144` — Who We Are, How we work, Leadership Micato bio + 3 cards
- `certifications.html:192` — Stack & Credentials, cert-grid 6 cards, Core Stack 4 categories, Development, Selected References
- `contact.html:137` — Talk to Micato, contact-links, urgent box, form
- `style.css:1247` — gold-black + light cream, project card image styles `.project-card-img`, breatheGlow/floatGreeting/typewriterCursor/imgReveal/shimmerSlide keyframes, section-title hover underline, typing-cursor class
- `main.js:261` — theme, navbar hide/show + orb parallax, hamburger, active nav, form, reveal, **text scramble effect**, **counter animation**, **typing cursor**
- **Images in root:** `server.jpg`, `soc-dashboard.webp`, `tech.jpg`, `web.jpeg`
- `public/favicon.svg`, `public/icons.svg`
- `sitemap.xml`, `robots.txt`, `manifest.webmanifest`, `favicon.svg` (root), `README.md` — SEO + Vercel deploy switchboard (placeholder domain `micatech.vercel.app`)

## 5. Recent changes log
- 2026-09-09a: Axom-inspired premium + dark/light blend
- 2026-09-09b: Slowed entrances, alive hovers
- 2026-09-09c: Rebrand CHAEL→MICATECH, 4 pillars
- 2026-09-09d: Gold-on-black, Selected Work browser mock gallery
- 2026-09-09e: Removed browser mock, stack well-positioned, icons/emoji stripped
- **2026-09-17a:** Added `server.jpg` to Networking card, `soc-dashboard.webp` to Cybersecurity card — image containers with gradient overlay, hover zoom, shimmer slide, scroll reveal
- **2026-09-17b:** Text animation pass — text scramble on hero headline, counter animation on stats (`data-count`/`data-suffix`), breathing glow on gradient text, floating greeting pill, typing cursor on hero title, section title underline hover extend
- **2026-09-17c:** Added `tech.jpg` to IT Support card, `web.jpeg` to Web Dev card — all 4 pillars now have images
- **2026-09-18a:** SEO + deploy layer — `sitemap.xml`, `robots.txt`, `favicon.svg`, `manifest.webmanifest`, per-page canonical/OG/Twitter/theme-color, JSON-LD on index; renamed `soc dashboard.webp` → `soc-dashboard.webp`; full go-live steps in `README.md`

## 6. How to resume
1. Open `C:\Users\Hermes\Desktop\portfolio\` in OpenCode
2. Prompt: `continue Micatech portfolio` or `load SESSION.md`
3. Dev server: `python -m http.server 3000` — all 5 pages should 200
4. To edit styling: `style.css` image styles `.project-card-img`, keyframes `145`, section title `219`
5. To edit content: `index.html:87` pillars with images, `index.html:175` work

## 7. Open todos / ideas if continuing
- [ ] Optimize images — `server.jpg` and `tech.jpg` / `web.jpeg` may benefit from compression or WebP conversion
- [ ] Add `loading="lazy"` already present on all images — verify performance
- [ ] Consider adding `srcset` for responsive image sizes on mobile
- [ ] Add `sitemap.xml` or `robots.txt` for hiresphere SEO mention
- [ ] Check light theme image contrast — images may need brightness adjustment in light mode

## 8. Verification last run
- All 4 pillar cards have `<img>` tags with correct sources
- All images use `loading="lazy"` and have `alt` text
- Project card image CSS handles overflow, hover zoom, shimmer, overlay gradient
- Counter animation triggers via IntersectionObserver on stat cards
- Text scramble runs on hero name, preserves gradient span
- Breathing glow animates on `.hero-name span.gradient`
- Greeting pill floats via `floatGreeting 3.5s`

---
*Saved by OpenCode — 2026-09-17 — say `continue` to pick up.*
