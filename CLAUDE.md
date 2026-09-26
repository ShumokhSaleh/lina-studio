# CLAUDE.md — Lina Al-Aali Control Panel (Sanity Studio)

> This file explains the project to any AI assistant working on it. Read it first.

## About the project

This is the **Sanity Studio** — the control panel the artist **Lina Al-Aali (لينا العالي)**
uses to add and edit her website content (artworks, categories, the "about" page).

Visitors **never see this folder** — it is for administration only.
The public website visitors see is a separate project: `lina-portfolio` (built with Astro).

Personal volunteer project, **completely separate from any government employer**.
The account belongs to Lina.

## Stack

- **Sanity Studio** — content editing panel
- **JavaScript only** — no TypeScript
  - projectId: `8t1sl8zv`
  - dataset: `production`
- Content definitions live in the `schemaTypes` folder.

## Content model (defined here)

- **artwork:** image (+ alt text AR/EN), title (AR/EN), description (AR/EN),
  category (reference), year, display order.
- **category:** title (AR/EN), short description (AR/EN), display order.
  Lina can add and edit categories freely.
- **exhibition:** title (AR/EN), venue (AR/EN), year (required), short description (AR/EN).
  Used as a timeline of her exhibitions.
- **about:** a **singleton** (only one document, id `about`) — name (AR/EN), tagline (AR/EN),
  tags, bio (AR/EN), portrait, Instagram, email, other links.

Bilingual: Arabic + English, so text fields are duplicated in both languages
using `_ar` / `_en` suffixes (e.g. `title_ar`, `title_en`). Arabic is the main language:
Arabic titles are required, English is optional.

### How the "about" singleton works

- `sanity.config.js` hides it from "Create new" and removes delete/duplicate actions.
- `structure.js` makes the sidebar open that single document directly.
- To add another singleton, add its name to `singletonTypes` and add it to `structure.js`.

Exact field names for every type: see [SANITY_CONTENT_MODEL.md](SANITY_CONTENT_MODEL.md).

## How I like to work (developer preferences — Shumokh)

- **Explain in Arabic.**
- **Keep it simple — I'm a beginner.** Avoid heavy jargon, go step by step.
- **Give terminal commands one at a time**, not batched; wait for confirmation before the next.
- **No TypeScript** — plain JavaScript.

## Useful commands

    npm run dev      # run the Studio locally (localhost:3333)
