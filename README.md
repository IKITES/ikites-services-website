# iKITES Services — Website

A pure HTML/CSS/JS marketing site for iKITES Services, built from the
"Kinetic Precision" design system. No React, no build step, no framework —
just static files you can drop into Netlify or any static host.

## Structure

```
index.html              # the full single-page site
assets/
  css/styles.css        # all styling, design tokens as CSS variables
  js/main.js            # scroll reveal, sticky-header shadow, mobile menu
  img/
    ikites-logo.png       # iKITES wordmark (dark) — used in the header
    ikites-logo-white.png # iKITES wordmark (white) — used in the footer
    ikites-mark.png       # boxed "iK" mark only — for square/social use
    favicon.png           # square favicon built from the mark
    ikites-logo-full.png  # original 500x500 source download (wordmark)
    ikites-logo-mark.png  # original 500x500 source download (mark)
    navy-texture.png      # abstract schematic texture for the dark navy bands
tools/
  gen_image.py          # helper to (re)generate images via the Gemini API
```

The only external dependency is Google Fonts (Montserrat, Open Sans,
IBM Plex Mono, Material Symbols), loaded via `<link>` in `index.html`.

## Preview locally

Open `index.html` directly in a browser, or serve the folder:

```bash
python -m http.server 8000
# then visit http://localhost:8000
```

## Deploy

**Netlify (current setup).** There's no build step — the whole site is static
files at the repo root. Config lives in `netlify.toml` (`publish = "."`, clean
URLs, basic security headers).

Two ways to deploy:

- **Drag & drop** — go to <https://app.netlify.com/drop> and drop this folder.
- **CLI** — `npm i -g netlify-cli`, then from this folder:

  ```bash
  netlify deploy           # preview deploy
  netlify deploy --prod    # publish to production
  ```

Relative asset paths are used throughout, so the site works correctly served
from a domain root or any sub-path.

**Custom domain (optional).** To serve at e.g. `services.ikites.ai`: in the
Netlify site → **Domain management → Add a domain**, enter the subdomain, then
add the DNS record Netlify shows you in **Wix → Domains → Manage DNS**.

**Other hosts.** Because it's plain static files, this also drops straight into
Cloudflare Pages, Vercel ("Other" preset, no build command), or any static host
if you ever want to switch.

## Design tokens

All colors, type scales, radii, and spacing live as CSS custom properties at
the top of `assets/css/styles.css` (`:root`). Change them there to re-theme
globally.

## Logo

The official iKITES logo (sourced from ikites.ai) is in `assets/img/`. The
header uses the dark wordmark on white; the footer uses a white version on the
navy background; the favicon is built from the boxed "iK" mark. The two
`*-full.png` / `*-mark.png` files are the untrimmed 500×500 originals, kept as
sources in case you need to regenerate sizes or colors.

## Generated imagery

The hero "ascent line" is hand-coded inline SVG (unchanged). The only raster
asset is `assets/img/navy-texture.png` — an abstract teal-on-navy "schematic"
texture generated with the Gemini API (model `gemini-3-pro-image-preview`). It
is layered, low-opacity, behind the re-engineering section (mirrored to the
left) and the CTA band (right). All imagery is abstract — no people or faces.

To regenerate or make more, set your key and run the helper:

```bash
export GEMINI_KEY="<your-key>"      # never commit this
python tools/gen_image.py "<prompt>" assets/img/<name>.png
```

## Notes / next steps

- Nav links and the footer "Company" links point to in-page anchors or `#`
  placeholders — wire them to real pages/sections as content grows.
- "Get in touch" uses a `mailto:hello@ikites.ai` placeholder — update to the
  real address or a contact form.
- The hero ascent line is an inline animated SVG (CSS `prefers-reduced-motion`
  is respected for the scroll reveals).
