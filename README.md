# Bit Lab — interactive webinar presentations

One site for all **78 webinar topics** (HTML, CSS, Bootstrap, Tilda & Git, JS, React).
Each lesson is a full-screen interactive presentation for a **YouTube live stream**: the mentor shares the
browser window and clicks, the students (10–17) take part through the chat.
Languages: **Oʻzbekcha** (default), **Русский**, **English**.

## Run

```bash
npm install
npm run dev          # http://localhost:5173
npm run check        # typecheck + production build
```

## Presenting

Open a lesson, press **P** to open the presenter window on your second screen (notes, timers, next scene) and share only the main window.

| Key | Action |
|---|---|
| → / Space / PageDown | next step / next scene (works with a clicker) |
| ← / PageUp | back |
| 1–9 | pick an option in the current poll / tab |
| R | reset the current scene |
| H | hint |
| O | overview of all scenes |
| P | presenter window |
| N | notes on top of the stage (single screen only — visible on stream!) |
| F | fullscreen |

Scene state is kept while you go back and forth and survives an accidental reload.

## Adding a lesson

See `src/engine/ENGINE.md`. In short: create `src/lessons/<module>/<slug>/` (content in `ru/uz/en`, one file per scene), add one line to `READY` in `src/lessons/registry.ts`, then run:

```bash
npm run check
npm i --no-save playwright && npx playwright install chromium
npm run smoke -- <lesson-id>     # every scene × 3 languages: errors, overflow, dead ends, screenshots in .smoke/
```

## Deploy

Import the repository in [Vercel](https://vercel.com/new) (framework: Vite) — every push to `main` updates the site and every pull request gets a preview link. `vercel.json` already contains the SPA rewrite.

## Structure

```
src/engine/     player, presenter window, scene components, interactions, code tools
src/catalog/    home page and module pages
src/lessons/    topics.ts (all 78 topics), registry.ts, one folder per lesson
src/i18n/       interface strings in uz / ru / en
scripts/smoke.mjs
```
