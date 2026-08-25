# npb.me

The personal site of Nathaniel Burgess — a cartographic "Waypoint" portfolio.

## Stack

Astro 5 (static) · React 19 islands · Tailwind v4 · MDX content collections ·
EmailJS · deployed to GitHub Pages at **npb.me**.

## Develop

```bash
npm install
cp .env.example .env   # fill in EmailJS keys (see below)
npm run dev            # http://localhost:4321
npm run build          # static output → dist/
npm run preview        # serve the build
```

## Content

Projects are MDX files in `src/content/projects/` with typed frontmatter
(`type: work | hobby`, `featured`, `liveUrl`, `tech`, `date`). The home page and
`/projects` read them via the content collection; each becomes `/projects/<slug>`.

## Environment

The contact form uses EmailJS (client-side, public by design). Local dev reads
`.env`; the deploy build reads GitHub Actions secrets:

- `VITE_EMAILJS_SERVICE_ID`
- `VITE_EMAILJS_TEMPLATE_ID`
- `VITE_EMAILJS_PUBLIC_KEY`

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (build with
`withastro/action`, publish with `actions/deploy-pages`). One-time setup:

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Add the three `VITE_EMAILJS_*` values as repo **secrets**.
3. Custom domain `npb.me` is preserved via `public/CNAME`.
