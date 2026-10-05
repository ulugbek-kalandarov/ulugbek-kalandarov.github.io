# Change homepage title and social titles

## What changes
In `src/routes/index.tsx` (the homepage's `head()` only):
- Page `title` → `Ulugbek Kalandarov — Performance Marketing`
- `og:title` → `Ulugbek Kalandarov — Performance Marketing`
- Add `twitter:title` → `Ulugbek Kalandarov — Performance Marketing` (there is no explicit twitter:title today; `twitter:card` stays as-is)

Nothing else changes — no root metadata, other sections, styles, or layout.
