# Sanity content model

Exact field names as defined in `schemaTypes/` (use these in GROQ queries).
Sanity projectId: `8t1sl8zv` — dataset: `production`.
All text fields are bilingual: `_ar` = Arabic, `_en` = English.

## about (singleton, document id `about`) — shown in the Studio as "الواجهة الرئيسية"
Only the fields used by the website's hero section.
- `name_ar`, `name_en`
- `tagline_ar`, `tagline_en`
- `tags_ar`, `tags_en` (arrays of strings)
- `portrait` (image)
- `instagram` (url)

## stats (singleton, document id `stats`) — shown in the Studio as "الإحصائيات"
- `items` (array, exactly 3, in display order), each item has:
  - `number` (number, required, integer ≥ 0)
  - `plus` (boolean, default false) — show a "+" next to the number
  - `label_ar` (required), `label_en`
