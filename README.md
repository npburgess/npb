# npb.me

The personal site of Nathaniel Burgess — a systematic, typographic portfolio
(Swiss-grid layout, oklch light/dark theme, single terracotta accent).

## Stack

Astro 5 (static, pure Astro — no framework runtime) · Tailwind v4 ·
MDX content collections · self-hosted fonts (`@fontsource`) · EmailJS ·
deployed to GitHub Pages at **npb.me**. Interactivity (theme toggle, contact
modal, back-to-top) is vanilla JS.

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
(`title`, `summary`, `type: work | hobby`, `featured`, `liveUrl`, `repoUrl`,
`tech`, `date`, and an optional `cover` screenshot). The home page and
`/projects` read them via the content collection; each becomes `/projects/<slug>`.
On a case-study page, `cover` renders a sticky preview panel (optimized via
`astro:assets`); pages without one render single-column.

## Environment

The contact form uses EmailJS (client-side, public by design). Astro only exposes
`PUBLIC_`-prefixed env vars to client code. Local dev reads `.env`; the deploy
build reads GitHub Actions secrets:

- `PUBLIC_EMAILJS_SERVICE_ID`
- `PUBLIC_EMAILJS_TEMPLATE_ID`
- `PUBLIC_EMAILJS_PUBLIC_KEY`

## Deploy

Pushing to `main` triggers `.github/workflows/deploy.yml` (build with
`withastro/action`, publish with `actions/deploy-pages`). One-time setup:

1. Repo **Settings → Pages → Source: GitHub Actions**.
2. Add the three `PUBLIC_EMAILJS_*` values as repo **secrets**.
3. Custom domain `npb.me` is preserved via `public/CNAME`.
