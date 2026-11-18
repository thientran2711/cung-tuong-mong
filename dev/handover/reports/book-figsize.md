# book-figsize report (worker, MAIN s42) — branch review/book-figsize @ cf415829

PRIORITY #1 CHECK: OD 16 + 18/11 ~09:00Z (book figure size), KIT 34.6 one-body rule; main jkit kitBookFig / jsl kitBookFigClamp; no other review/* touched it.

## Root cause
jsl.js `kitBookFigClamp` sized the body by the one rule, then multiplied by `kk = column width / the figure's own painted width` (column 220 px on Fold vs 230..470 px painted). So every figure got a different shrink: wide Hoàng hậu gown ~.46 of standard, slim ones ~.9, silhouette .77 (owner p.7 small, p.8 bigger, p.5 biggest). Not the crown, not Fold-only, same path for her page and person pages.

## Fix (the ONE kit part)
- jsl.js: no per-figure shrink. Standard body = min(column height / KIT_FIG.man, column width / KIT_BOOK.wmax) x fac (same for every figure of one fac). Wider art is centred on the column and cut at both edges (KIT 32.2a), narrower art keeps left alignment.
- jkit.js: `KIT_BOOK={wmax:.5}` (catalog scan 499 figs: painted width / body p50 .36, p90 .48, p99 .59).
- j87.js: `KBK_FIG_COL` .36 -> .42 so the uniform body stays readable (Fold body 514 px = .65 of column height; before it ranged .44..935).
- KIT.md 34.6c added. Plate pages (kitBookPicFit, stage rule) unchanged.
- OWNER-TUNABLE: if she wants bigger figures, lower `KIT_BOOK.wmax` (.46 -> body ~560) or raise KBK_FIG_COL; wide hems are then cut more.

## Scan (dev/test/book-figsize-scan.js, 37 kinds: consorts incl. widest, thaihau, emperor, eunuch, kid, maid, mama, man, official, physician, player, 3 silhouettes + her own SELF)
BEFORE (main):
755x1000 fac 1.00: n 22 min 348.6 max 741.5 spread 53.0 %
755x1000 fac 1.07: n 14 min 493.0 max 730.3 spread 32.5 %
1180x820 fac 1.00: n 22 min 290.0 max 590.0 spread 50.8 %
1180x820 fac 1.07: n 14 min 410.0 max 607.6 spread 32.5 %
AFTER:
755x1000 fac 1.00: n 23 min 514.2 max 514.3 spread 0.0 %
755x1000 fac 1.07: n 14 min 538.9 max 539.0 spread 0.0 %
1180x820 fac 1.00: n 23 min 426.1 max 426.2 spread 0.0 %
1180x820 fac 1.07: n 14 min 446.6 max 446.7 spread 0.0 %
fac 1.07 (men) are 7 % taller than women BY THE EXISTING RULE (KIT_FIG.man), spread inside each fac group 0 %. Per-figure table before/after: scan output (before.txt / after.txt kept by the worker, not committed).

## Tests
book-figsize-scan ALL OK (Fold 755x1000 + iPad 1180x820); old dev/test/book-fig-scale.js was FAIL 5 at main, now ALL OK; aspect error <1 % everywhere. media-check + img-allowlist OK (build_site ran; built files not committed, coordinator rebuilds). No dev/test/quickcheck.sh exists on main (checked).

## Shots (CDN, delete after verdict) — LOOKED at all
Fold after (Thái hậu / wide pink gown / her own figure / silhouette side by side): https://ctm-img.victoria-tntt.workers.dev/img/_review/book-figsize/sheet.jpg
single: .../img/_review/book-figsize/755x1000-fig-thaihau-1.webp.jpg , 755x1000-fig-consort-c15-t7-a51.webp.jpg , 755x1000-fig-consort-c08-tm0-a36.webp.jpg , 755x1000-SELF.jpg , 755x1000-SIL-f.jpg , 755x1000-fig-eunuch-u22-r3-a51.webp.jpg , 1180x820-SELF.jpg
BEFORE = owner screenshots refs/owner-1811-0900-book-figsize-1..3.jpg. Not done: a zoom-3x before shot (the old build was not re-rendered; the numeric before table replaces it).

~95% xong / ~90% chơi được (needs her look at the size/column taste).
