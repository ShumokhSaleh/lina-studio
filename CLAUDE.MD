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

- **artwork:** image, title (AR/EN), description (AR/EN), category, display order.
- **category:** groups artworks. Lina can add and edit categories freely.
- **about:** portrait, bio (AR/EN), contact links.

Bilingual: Arabic + English, so text fields are duplicated in both languages.

## How I like to work (developer preferences — Shumokh)

- **Explain in Arabic.**
- **Keep it simple — I'm a beginner.** Avoid heavy jargon, go step by step.
- **Give terminal commands one at a time**, not batched; wait for confirmation before the next.
- **No TypeScript** — plain JavaScript.

## Useful commands

    npm run dev      # run the Studio locally (localhost:3333)