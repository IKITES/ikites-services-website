# iKITES Services — Marketing Site

Static marketing site for iKITES Services (deep-tech engineering studio).
Plain HTML/CSS/JS — no build step, no dependencies.

## Structure

```
.
├── index.html              # Home page
├── success-stories.html    # Case studies / "what we've built"
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

- All **Contact**, **Start a project**, and **Get in touch** actions point to
  `https://www.ikites.ai/contact-us`.
- The hero **"See what we've built"** button and the nav **Success Stories**
  link point to `success-stories.html`.

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
