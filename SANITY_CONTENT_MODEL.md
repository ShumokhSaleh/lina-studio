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

Query (newest first, exhibitions without a `startDate` last — same order as the Studio):
`*[_type == "exhibition"] | order(defined(startDate) desc, startDate desc)`
(plain `order(startDate desc)` would put the undated ones **first**.)

The number next to each exhibition ("01", "02", …) is **not stored** — the website
generates it from the item's position in that list (index + 1, padded to 2 digits).

The status label is **not stored** — the website computes it from the dates
(same rule as `exhibitionStatus` in `schemaTypes/exhibition.js`):
- "today" = the **local** date in Qatar, not UTC (e.g. `new Date().toLocaleDateString('en-CA')`)
- no `startDate` → no label
- today < `startDate` → "قريبًا" / "Upcoming"
- today > `endDate` (or `startDate` if no end) → "عُرض سابقًا" / "Past"
- otherwise → "معروض حاليًا" / "On view now"

## selectedWorks (singleton, document id `selectedWorks`) — shown in the Studio as "أعمال مختارة"
The small eyebrow label "أعمال مختارة" above the heading is hard-coded in the website, not stored.
- `heading_ar` (required), `heading_en` — e.g. "حوار بين الذاكرة والمكان"
- `intro_ar`, `intro_en` (text) — the line next to the heading
- `works` (array, max 6, in display order), each item has:
  - `image` (image, required, with hotspot) — has optional `image.alt_ar`, `image.alt_en`
    (alt text for screen readers; fall back to the work title if empty)
  - `title_ar` (required), `title_en`
  - `detail_ar`, `detail_en` — small extra text next to the title (e.g. "2026" or "البحر والذاكرة")

The number on each work ("01", "02", …) is **not stored** — the website generates it
from the item's position in `works` (index + 1, padded to 2 digits).

Query: `*[_id == "selectedWorks"][0]{ heading_ar, heading_en, intro_ar, intro_en, works[]{ _key, image, title_ar, title_en, detail_ar, detail_en } }`

## aboutArtist (singleton, document id `aboutArtist`) — shown in the Studio as "عن الفنانة"
The small eyebrow label "عن الفنانة" above the quote is hard-coded in the website, not stored.
- `quote_ar` (required), `quote_en` (text) — the big quote, e.g. "التراث لا يُستنسخ، بل يُعاد اكتشافه."
- `bio_ar` (required), `bio_en` (text) — paragraphs are separated by an empty line;
  the website splits on blank lines (e.g. `bio.split(/\n\s*\n/)`) and renders each as a `<p>`.
- `award` (object, **optional** — may be missing or empty; hide the row if there's no `year`/`title_ar`):
  - `year` (number, integer) — e.g. 2024
  - `title_ar`, `title_en` — e.g. "سفيرة التواصل الاجتماعي في الفن"

Query: `*[_id == "aboutArtist"][0]{ quote_ar, quote_en, bio_ar, bio_en, award }`

## milestones (singleton, document id `milestones`) — shown in the Studio as "محطات مختارة"
The small eyebrow label "محطات مختارة" above the heading is hard-coded in the website, not stored.
- `heading_ar` (required), `heading_en` — the big heading, e.g. "من الدوحة إلى العالم"
- `items` (array, max 20), each item has:
  - `year` (number, required, integer) — e.g. 2026
  - `title_ar` (required), `title_en` — e.g. "متحف الفن الإسلامي، الدوحة"
  - `description_ar`, `description_en` (text, optional) — short line under the title

Display order is **newest year first**. The order in the Studio does not matter — sort in the query:
`*[_id == "milestones"][0]{ heading_ar, heading_en, "items": items | order(year desc){ _key, year, title_ar, title_en, description_ar, description_en } }`

## contact (singleton, document id `contact`) — shown in the Studio as "تواصل"
The eyebrow "للتعاون", the heading "لنصنع أثرًا يبقى." and the line under it are hard-coded in the website, not stored.
- `instagram` (url, required) — always starts with `https://www.instagram.com/` (or `https://instagram.com/`).
  The button text (e.g. "@linaalaali ↗") is not stored — derive the handle from the URL path.
- `email` (email, optional) — hide the email link if it's empty.

Query: `*[_id == "contact"][0]{ instagram, email }`
