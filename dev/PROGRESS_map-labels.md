# review/map-labels (queue C46) — Dư đồ place labels

Owner 16/11: "Chữ nhỏ quá, mờ nữa" (ref `dev/handover/refs/owner-map-labels-small.jpg`). Rule: every map label is a readable kit name tag, same size + contrast for all places,
light paper chip, >= 13 px, never faint text on the art, never clipped by the lock icon or neighbours, same family at every zoom.

## Kit part used
KIT §34.1d "Map labels" (`.mspot .mlab`, one label family). No new kit part, section, frame or chip. §34.1d got a LOOK paragraph (same part, new skin). No KIT REQUEST.

## Cause (family, all one rule set in p1.html + 2 overrides)
- `.mlab` = dark translucent chip, 11.5 px; `.sm` (every rival palace slot) 9.6 px (8.3 px < 600 px); `.empty` (empty rival palaces) opacity .5 + 8 px; `.off` .75; `.srvno` .6; `.mmeta` 8.8 px dark chip.
- Lock mark inline with 4 px margin; names wider than their box were cut by the box / the map edge / neighbours.

## Changes
- `p1.html`: one `.mlab` look (paper #fffaf0, ink #2a1a12, gold hairline, shadow, 13 px, wraps at spaces `width:max-content;max-width:max(100%,4.4em)`); `i`/`em` 12 px; `.mmeta` and `.mres.more` same paper family 12 px; all `.sm`/`.empty`/`.off`/phone size + opacity cuts removed; "ở đây" ring kept (gold).
- `j41.js`: `.mlock` is a non-shrinking flex item (cannot cut the name), full colour.
- `j42.js`: `.srvno .mlab{opacity:.6}` removed.
- `j38.js` `mapFit`: the floor zoom is raised until no two labels touch (cap fit+2.5; skipped for the palace detail map `.kpmv`); re-run on image load, fonts ready (`document.fonts`) and size change (ResizeObserver) so late font/layout changes cannot leave labels touching. `window.__mapFit` = this floor (the "−" button uses it).
- `dev/test/map-labels.js`: the scan (per label: font px, contrast, opacity, cut by own box, overlap with another label, outside the map image) x 6 viewports x 4 zooms.

## Before / after (23 labels per map; worst label in each cell; zoom levels = floor, +.5, +1.5, +2.5)
| viewport | font px min before -> after | chip opacity min | labels touching another (before -> after, floor zoom) | labels cut at map edge (before -> after) |
|---|---|---|---|---|
| 755x1000 | 9.6 -> 13 | .75 / .5 -> 1 | 0 -> 0 | 4 -> 0 |
| 1180x820 | 9.6 -> 13 | -> 1 | 2 -> 0 | 0 -> 0 |
| 1366x1024 | 9.6 -> 13 | -> 1 | 0 -> 0 | 0 -> 0 |
| 1000x755 | 9.6 -> 13 | -> 1 | 3 -> 0 | 0 -> 0 |
| 844x390 | 9.6 -> 13 | -> 1 | 12 -> 0 | 1 -> 0 |
| 390x844 | 8.3 -> 13 | -> 1 | 3 -> 0 | 6 -> 0 |
(contrast ink/paper 16.1:1 at all places; `cut` (text cut by its own chip) 0 everywhere before and after; 0 page errors.) "Before" with the first chip version also showed 3-line chips; wrap tuned to 2 lines.
Floor zoom now: 755x1000 x2.0 (was x1.95), 1180x820 x1.25, 1366x1024 x1.16, 1000x755 x1.50, 844x390 x1.75, 390x844 x3.78 (was x2.5).

## D30 (review/palace-map-port, jpm.js)
Not a code conflict (merge-tree clean for my files). jpm hall rows keep their own `.kpm-spot .mlab` rules (font .78rem = 12.5 px, nowrap, max-width:none) and inherit the new chip colours. When D30 lands: raise its `.kpm-spot .mlab` size to 13 px; `mapFit` already skips `.kpmv`.

## Open
- Phone portrait (390x844) default map is wider (x3.78) so 13 px chips do not touch; owner may prefer a smaller map with fewer chips on phones. Not asked, left.
