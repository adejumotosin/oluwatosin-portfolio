# Oluwatosin Adejumo — Portfolio

Standalone portfolio for **Oluwatosin Adejumo**, Social Media Manager & Content Strategist.

## Included

- Native React interface and case-study components.
- GSAP + ScrollTrigger for hero motion, scroll reveals, animated statistics and process storytelling.
- React Bits-inspired micro-interactions: magnetic CTAs, spotlight cards and animated counters.
- Structured case studies for CongaTV, Career Gospel and Lagos4Rent.
- Social Signal Scan at `/social-audit`.
- Responsive layout and `prefers-reduced-motion` support.

## Architecture

The portfolio is standalone and no longer proxies the previous ChatGPT Site.

- `index.html` — production entry point.
- `src/main.jsx` — editable React application source.
- `src/styles.css` — editable source styles.
- `app.js` — browser-compatible application bundle used by the standalone source package.
- `styles.css` — current compiled stylesheet.
- `reference/` — case-study reference screenshots.
- `vercel.json` — Vercel SPA routing configuration.

The production entry point loads React/ReactDOM from UNPKG and GSAP/ScrollTrigger from jsDelivr, then initializes the application in the browser. This keeps the current production deployment independent of a server-side build step.

## Routes

- `/` — portfolio homepage.
- `/social-audit` — Social Signal Scan.

## Deployment

The live project is deployed on Vercel as `oluwatosin-portfolio`. `vercel.json` rewrites application routes to `index.html` so client-side routes work correctly.

## Next deployment workflow

This repository is the source of truth for future portfolio changes. Once it is linked to the existing Vercel project, updates to the production branch can deploy through the normal GitHub → Vercel workflow.
