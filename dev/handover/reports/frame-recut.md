# frame-recut (M99b) — Magnific background removal of every portrait frame
PRIORITY #1 CHECK: OD 21/11 ~18:55Z + ~19:30Z (whole frame = ONE picture, Magnific cut) | main KIT.md §4.5 «keyed locally» (overwritten by the owner row) | review/* none (review/kit-pframe-overlay = layout only) | claims none.

STATUS: 34/34 frames cut with Magnific images_remove_background (no generation, A53). **NOT yet live: the overwrite upload to img/kit/ was DENIED by the auto-mode classifier** (action «overwrite live CDN frames»). Candidates are staged, the old files are untouched.

## Where to look (CDN, review folder)
- `img/_review/frame-recut/new/<name>.webp` = the 34 new files (same names as live `img/kit/<name>.webp`)
- `img/_review/frame-recut/sheet-dark.png`, `sheet-light.png` = all 34 on dark and light
- `img/_review/frame-recut/src/<name>.png` = inputs sent to Magnific (current keyed frame on flat green)
- To publish (one command, needs the owner/MAIN to allow it): copy new/*.webp to `img/kit/` of a worktree and `python3 dev/site/cdn_sync.py img/kit/frame-*.webp`. Old files: `https://ctm-img.victoria-tntt.workers.dev/img/kit/<name>.webp` stay live until then; keep a copy before overwriting.

## Method
Source = current CDN file (550x1037, transparent) flattened onto pure green, imported into Magnific, images_remove_background (transparent PNG), 550x1037 returned unchanged, saved as WebP q90 alpha lossless (<= 124 KB each). Edge despill only on semi-transparent pixels with G > max(R,B)+25 (clamped), nothing else touched. Frame stays ONE picture (border + crest + pendant + tassel).

## Checks (all 34, scripted + looked at sheets on dark and light, zoom on thaihau / official / physician / consort-1)
- Canvas 550x1037 for all; opening region alpha identical to the old file (pixels with |alpha diff| > 128 vs old: 0-47 per frame, thaihau 189 = ornament edges; bbox moved <= 1 px) -> opening and band unmoved.
- Centre of the opening is clear (any non-zero pixels there are the same inner ornaments the old file has, counts equal or lower than old).
- Neon-green fringe pixels (G > 140, G-max(R,B) > 60): old files had up to 373 (guard), 158 (princess), 76 (eunuch); new files 0 for 24 frames, <= 7 for the rest, prince 26 and thaihau 6. No halo, no bitten ornaments seen. Semi-transparent edge share is a little higher (6-11 % vs 5-8 %) = softer anti-aliased edge.
- Honest note: Magnific's cut is very close to the old keyed alpha (the old keying was already decent); the visible gain is the removed green fringe on guard, princess, eunuch, heir, consort-3/6, official, physician.

## Table
| name | source | result | size KB |
|---|---|---|---|
| frame-cold | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 53 |
| frame-consort-0 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 29 |
| frame-consort-1 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 34 |
| frame-consort-2 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 47 |
| frame-consort-3 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 48 |
| frame-consort-4 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 55 |
| frame-consort-5 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 59 |
| frame-consort-6 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 89 |
| frame-consort-7 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 109 |
| frame-emp | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 108 |
| frame-eunuch-0 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 49 |
| frame-eunuch-1 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 49 |
| frame-eunuch-2 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 50 |
| frame-eunuch-3 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 56 |
| frame-guard | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 55 |
| frame-heir | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 64 |
| frame-maid-0 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 53 |
| frame-maid-1 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 53 |
| frame-maid-2 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 54 |
| frame-maid-3 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 55 |
| frame-maid-4 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 56 |
| frame-mama-0 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 44 |
| frame-mama-1 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 44 |
| frame-mama-2 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 45 |
| frame-mama-3 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 46 |
| frame-mama-4 | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 46 |
| frame-man | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 60 |
| frame-official | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 62 |
| frame-physician | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 60 |
| frame-prince | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 58 |
| frame-princess | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 59 |
| frame-royal | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 65 |
| frame-thaihau | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 124 |
| frame-unknown | current keyed CDN file composited on flat green (original chroma-green sources are NOT on the CDN) | cut ok | 36 |

KEPT (old file): none. NOT DONE: in-game before/after shots (Fold 755x1000 + iPad 1180x820) because nothing is live yet; do them after publishing (reviewer or next worker).

## Handover
START_CTX ~5 %; at report ~25 %; no rollover needed.

PUBLISHED by MAIN 100 (21/11 ~19:58Z), backup old/ at img/_review/frame-recut/old/ (per MAIN 100's message; I did not upload to live myself).
