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

## exhibition (many documents) — shown in the Studio as "المعارض"
Lina can add as many as she wants. Only `title_ar` is required.
- `title_ar` (required), `title_en`
- `description_ar`, `description_en` (text)
- `startDate`, `endDate` (date, `YYYY-MM-DD`; `endDate` must be ≥ `startDate`)
- `venue_ar`, `venue_en` — venue name, shown as the link text (e.g. "متحف الفن الإسلامي ↗")
- `link` (url)

Suggested query (newest first): `*[_type == "exhibition"] | order(startDate desc)`

The number next to each exhibition ("01", "02", …) is **not stored** — the website
generates it from the item's position in that list (index + 1, padded to 2 digits).

The status label is **not stored** — the website computes it from the dates
(same rule as `exhibitionStatus` in `schemaTypes/exhibition.js`):
- no `startDate` → no label
- today < `startDate` → "قريبًا" / "Upcoming"
- today > `endDate` (or `startDate` if no end) → "عُرض سابقًا" / "Past"
- otherwise → "معروض حاليًا" / "On view now"
