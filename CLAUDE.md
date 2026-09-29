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

- **about:** a **singleton** (only one document, id `about`), shown in the Studio as
  "الواجهة الرئيسية" — only the hero fields: name (AR/EN), tagline (AR/EN), tags, portrait, Instagram.
- **stats:** a **singleton** (id `stats`), shown as "الإحصائيات" — exactly 3 items,
  each with a number, an optional "+" sign, and a label (AR/EN).
- **exhibition:** many documents, shown as "المعارض" — title (required), description,
  start/end dates, venue, link. The "on view now / past" label is computed from the dates, not stored.
- **selectedWorks:** a **singleton** (id `selectedWorks`), shown as "أعمال مختارة" — heading (AR/EN),
  intro (AR/EN), and up to 6 works (image, title, extra detail). The work number is computed, not stored.

Rule: each Studio section maps to one website section. Add fields only when the
website section that shows them is built (e.g. bio → "about" section, email/links → contact).

Bilingual: Arabic + English, so text fields are duplicated in both languages
using `_ar` / `_en` suffixes (e.g. `title_ar`, `title_en`). Arabic is the main language:
Arabic titles are required, English is optional.

### How the singletons (about, stats, selectedWorks) work

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
