# book-figsize report (worker, MAIN s42) — branch review/book-figsize @ a302d5e6 (r4)

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

## r2 (MAIN s42 feedback: no crop, real pages)
- Silhouette was cut on the left: kitFigBody reports grey silhouettes as a standard figure (l/r override), their real art fills the whole picture width (painted w/body .54..57). Now silhouettes use 0..1 and `KIT_BOOK={wmax:.65 (catalog max .63), fmax:1.07}`; KBK_FIG_COL .36 -> .50 (Fold column 306 px); standard body = column / (wmax x fmax). ZERO crop: scan checks crop px per figure (0.0 for all 38 cases both devices) and a never-seen wider figure would be scaled (kfit flag; scan fails on it; none seen). Spread per fac 0.0 %.
- Fold body now 440 px (.555 of column height), iPad 365 (.58): smaller than r1 because the widest robe/silhouette must fit with zero crop. TUNABLE by owner: wider column (KBK_FIG_COL) = bigger figures, text column narrower.
- Shots (CDN, delete after verdict): Fold zoom 3x columns side by side (Hoàng hậu thaihau, tall-crown wide pink consort, blue consort, her own SELF, widest maid, silhouette): https://ctm-img.victoria-tntt.workers.dev/img/_review/book-figsize/cols-fold.jpg ; whole pages sheet-755x1000.jpg , sheet-1180x820.jpg ; per figure <dev>-<name>.jpg and <dev>-<name>-col.png in the same folder. Pages are the real kitBook person-page renderer with real catalog figures (no live save with her real Tuần lục data in the sandbox). LOOKED: all same height, no figure touches/cuts a column edge, feet and crowns whole.

## r3 (MAIN s42/s43: r2 REJECTED — nobody may be shrunk; target = her live Tổng lược size)
- Measured her live figure on main (same SELF, scan): Fold 755x1000 body 641 px (.81 of column height), iPad 1180x820 567 px (.90). KIT_BOOK.r0=.33: standard women body = min(column h x .935, base column / .33) -> Fold 667 (+4 % vs live), iPad 555 (-2 %); men x1.07 by rule. Spread per fac 0.0 % (all 38 kinds, both devices). Nobody smaller than that; the old per-figure shrink is gone.
- Wide robes / grey silhouette: NO crop and NO shrink — that page's figure column (--porf, j87 personBody) = the figure's true painted width at the standard body (cap 80 % of inner width; max kid p16 art fits), the text frame takes the rest, so text never goes under a figure (scan textOvl 0 for every case, crop 0.0, no fit-scale). Her own page: column 221 vs live 220 (identical layout).
- Cost: on pages with a wide robe the text column is narrower (Fold 306..~190 px), more "(tiếp theo)" pages; slim figures unchanged. Owner may trade: lower KIT_BOOK.r0 = bigger figures; cap in j87 = text minimum.
- Shots (CDN, delete after verdict) in https://ctm-img.victoria-tntt.workers.dev/img/_review/book-figsize/ : AFTER r3-sheet-after-755x1000.jpg, r3-sheet-after-1180x820.jpg (Hoàng hậu thaihau, wide pink consort, blue consort, her own SELF, widest maid, silhouette, one image per page also r3-<dev>-<name>.jpg). BEFORE (main, same figures): r3-sheet-before-755x1000.jpg, r3-sheet-before-1180x820.jpg, r3-main-<dev>-<name>.jpg + owner screenshots refs/owner-1811-0900-book-figsize-1..3.jpg. Pages are the real kitBook person-page renderer with real catalog figures (no live save in the sandbox). LOOKED: same height, feet+crowns whole, no figure touches an edge, no text under a figure.

## r4 (MAIN s43: target = HER live p.5 body EXACTLY, per device)
- `kitBookStd(Hc, base)` (jkit.js): the standard body is derived from HER figure (kitStageFig(S)) exactly as the live clamp sizes it: Hs = min(Hc, base column / (her painted-width-to-body ratio x .935)); body of any figure = Hs x its --kfr. So her page = live: scan (same fixed figure, deterministic HER=fig-consort-c02-ty8-a18) live 641.6 / 534.0 vs new 642.2 / 534.2 (Fold / iPad; +-0.1 %, ar rounding); with another figure c32: 480.0 vs 480.5, 399.0 vs 399.8, 1366x1024 464.6 vs 463.1, 412x1058 268.1 vs 268.6, 390x844 253.0 vs 253.4 (<= 0.3 %). Her column 220/183 as live.
- Every other figure = her body (spread 0.0 % per fac, 38 kinds x 5 devices: 755x1000, 1180x820, 1366x1024, 412x1058, 390x844); fac 1.07 men +7 % by rule. No crop (0 px), no text under a figure, no fit-scale; wide robe / silhouette = own page column = painted width (text takes the rest, cap 80 %).
- HONEST NOTE: "her size" follows HER CURRENT OUTFIT (the live rule shrinks a wide-skirted figure to the 36 % column), so the standard moves with her figure (wide fur cloak: 480 Fold; slim hanfu as in her p.5 shot: 642). Everyone is exactly her size, nobody else smaller than her. Alternative if she wants a fixed size independent of her outfit: constant KIT_BOOK (decision for owner/MAIN).
- Hoàng hậu thaihau-1 was 671 (own gown less wide), becomes 642 = her size (-4 %, unavoidable if all = her). Wide consort c15 was 405 -> 642.
- Shots (CDN, delete after verdict): https://ctm-img.victoria-tntt.workers.dev/img/_review/book-figsize/r4-before-after-755x1000.jpg and r4-before-after-1180x820.jpg (top row BEFORE = main: her p.5 / Hoàng hậu / wide Quý phi-type; bottom row AFTER), r4-maid-silhouette-755x1000.jpg, -1180x820.jpg; one image per page: r4-before-<dev>-<name>.jpg, r4-after-<dev>-<name>.jpg. Real kitBook renderer + real catalog figures (no live owner save).
