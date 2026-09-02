# iKITES — Marketing Site

Static marketing site for iKITES. `index.html` is the **parent iKITES corporate
homepage** ("From research to reality"); `services.html` is the **Services arm**
landing page. Plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
.
├── index.html              # iKITES corporate home (parent identity)
├── services.html           # Services arm landing page (formerly index.html)
├── success-stories.html    # Services case studies / "what we've built"
├── README.md
└── assets/
    ├── css/
    │   └── styles.css       # "Kinetic Precision" design system
    ├── js/
    │   └── main.js          # scroll reveal, sticky header, mobile nav
    └── img/
        ├── ikites-logo.png
        ├── ikites-logo-white.png
        ├── favicon.png
        └── navy-texture.png
```

## Links / routing

The corporate home links straight to each arm (nav, arm cards, footer):

| Arm | Link target |
|-----|-------------|
| Services | `services.html` (the local Services page) |
| Products | `https://products.ikites.ai` |
| Clinics  | `https://clinics.ikites.ai` |

- The **iKITES logo** links to `index.html` (the corporate home) on every page.
- **Ecosystem** (corporate nav) scrolls to the in-page `#ecosystem` ("Three arms") section.
- All **Connect with us / Contact / Start a project / Get in touch** actions point to
  `https://www.ikites.ai/contact-us`.
- **Services page (`services.html`)**: the hero **"See what we've built"** button and the
  nav **Success Stories** link point to `success-stories.html`; **Capabilities** / **Process**
  use `services.html#…` anchors.
- Placeholders to confirm before publishing (corporate home): footer email
  (`hello@ikites.ai`), LinkedIn/Instagram URLs, and the Privacy-policy link (`#`).
  Search `index.html` for `TODO:`.

## Preview locally

```bash
# from the repo root
python3 -m http.server 8000
# open http://localhost:8000
```

## Push to GitHub

```bash
git init
git add .
git commit -m "iKITES Services marketing site"
git branch -M main
git remote add origin https://github.com/<your-org>/<your-repo>.git
git push -u origin main
```

## Deploy

Any static host works (Netlify, GitHub Pages, Cloudflare Pages, Vercel).
- **Netlify / Cloudflare Pages:** no build command; publish directory = repo root.
- **GitHub Pages:** Settings → Pages → deploy from `main` / root.

### Clean `/success-stories` URL (optional)
This repo serves the page at `/success-stories.html`. To get the exact
`/success-stories` path, either rename to `success-stories/index.html`
(and adjust the asset paths to `../assets/...`), or add a redirect:

`_redirects` (Netlify):
```
/success-stories   /success-stories.html   200
```

## Notes
- Footer year reads `© 2024` (as supplied) — update to the current year when publishing.
- Success-story copy is adapted from www.ikites.ai/success-stories; images were
  not carried over (see below).
- To add story images, drop them in `assets/img/` and add an `<img>` at the top
  of each `.story-card`.
