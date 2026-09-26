# Sanity content model

Exact field names as defined in `schemaTypes/` (use these in GROQ queries).
Sanity projectId: `8t1sl8zv` — dataset: `production`.
All text fields are bilingual: `_ar` = Arabic, `_en` = English.

## category
- `title_ar` (required), `title_en`
- `description_ar`, `description_en`
- `order` (number)

## artwork
- `image` (image, required) — with sub-fields `alt_ar`, `alt_en` (alt text)
- `title_ar` (required), `title_en`
- `description_ar`, `description_en`
- `category` (reference → `category`)
- `year` (number)
- `order` (number)

## exhibition
- `title_ar` (required), `title_en`
- `venue_ar`, `venue_en`
- `year` (number, required)
- `description_ar`, `description_en`

## about (singleton, document id `about`)
- `name_ar`, `name_en`
- `tagline_ar`, `tagline_en`
- `tags_ar`, `tags_en` (arrays of strings)
- `bio_ar`, `bio_en`
- `portrait` (image)
- `instagram` (url)
- `email` (string)
- `other_links` (array of `{label, url}`)
