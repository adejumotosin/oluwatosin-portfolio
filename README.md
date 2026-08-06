# Oluwatosin Adejumo — Portfolio

Standalone portfolio for **Oluwatosin Adejumo**, Social Media Manager & Content Strategist.

## Included

- React interface and interactive case-study components.
- GSAP + ScrollTrigger for hero motion, scroll reveals, animated statistics and process storytelling.
- React Bits-inspired micro-interactions: magnetic CTAs, spotlight cards and animated counters.
- Structured case studies for CongaTV, Career Gospel and Lagos4Rent.
- Social Signal Scan at `/social-audit`.
- Responsive layout and `prefers-reduced-motion` support.

## Architecture

The portfolio is standalone and no longer proxies the previous ChatGPT Site.

- `index.html` — production entry point.
- `styles.css` — portfolio styles.
- `app.js` — small runtime loader.
- `runtime/app-01.txt` … `runtime/app-07.txt` — the browser application source, loaded in order by `app.js`.
- `vercel.json` — SPA rewrite for `/social-audit`.
- `package.json` — project metadata.

The entry point loads React/ReactDOM from UNPKG and GSAP/ScrollTrigger from jsDelivr, then loads the portfolio application from the local runtime files. There is no dependency on the previous ChatGPT Site or a server-side proxy.

## Routes

- `/` — portfolio homepage.
- `/social-audit` — Social Signal Scan.

## Deployment

The existing live Vercel project is `oluwatosin-portfolio` and is connected directly to this GitHub repository through Vercel's native Git integration.

`vercel.json` preserves static assets normally and rewrites only `/social-audit` to `index.html`.

## Git workflow

`main` is the production branch. Pushes to `main` trigger Vercel production deployments automatically, while pull requests and non-production branches can generate preview deployments through Vercel's native Git integration.
