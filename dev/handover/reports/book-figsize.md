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

## r4 REJECTED by owner (via s43) -> NUMBERS FOR THE DECISION (no choice made yet, per s43)
Order: ONE layout on every page (figure column + text column same x/width as HER page), every figure her body height, fitted INSIDE the fixed column, never under the "?" chip; remove per-page column code (j87 personBody `porf` block + KIT_BOOK/kitBookStd stay only if useful).
Fact: the fixed column (Fold 220 px, iPad 183 px = 36 % x .89 page) holds a figure of painted-width/body ratio <= HER ratio (her slim hanfu c02: .343; the standard body = column / her ratio = 642 Fold / 534 iPad). Catalog sample (266 figs, painted width / body):
- her ratio .343 (slim outfit, the p.5 shot): fit WITHOUT shrink only 32 % of figures (consort 27 %, maid 51 %, eunuch 43 %, kid 13 %, emperor 0 %); scale needed to fit inside the column: p10 .71, p25 .85, median .95, worst .54 (widest kid art), consort worst .63.
- her ratio .40: fit 74 % (consort 67 %, maid 92 %, eunuch 97 %); scale p10 .83, p25 .99; worst .63.
- her ratio .458 (wide fur cloak): fit 88 %; worst .73.
So "same height as hers AND inside the narrow column" is impossible for ~2/3 of figures when she wears a slim outfit (they would be shrunk to .54-.95 of her height, i.e. different heights); possible for all only if the column is widened for EVERY page to >= .63 x her body (Fold ~405 px of 612, text column left ~200 px), or the standard body is lowered to column / .63 (Fold ~349 = 44 % of the column height, far below her live 642).
DECISION NEEDED from owner/MAIN (options): (A) fixed wider column on ALL pages (same x/width everywhere, e.g. .50-.66 of inner width) + her body = standard (her page changes layout slightly but identical on every page); (B) keep column .36 and shrink wide figures to fit (heights differ, what she rejected first); (C) keep r3-like per-figure but she rejected; (D) hers as is, others at her height, wide robes overlap under the text (rejected).
Code state: branch review/book-figsize @ a302d5e6 contains the REJECTED per-page column (j87.js personBody `porf` block, jsl kitBookStd). Next worker: revert that block, then implement the chosen option; scan script dev/test/book-figsize-scan.js (env HER=<fig file> fixes her figure; SZ=[[W,H],..]; checks spread, crop, textOvl, kfit) — add a column-x/width check across all 38 kinds.

## HANDOVER (context ~near ceiling; main opens the successor)
START_CTX ~0 %; now above START_CTX+25 %. Everything above is pushed (branch a302d5e6, handover report). Open: owner/MAIN decision A/B above, then revert per-page column and re-scan, before|after full-page shots of her page / HH / pink QP / widest robe on Fold + iPad, CDN img/_review/book-figsize/ (delete after verdict).

# r5 (worker, successor; MAIN s43) — branch review/book-figsize-r5 @ 1c4579d4 (from live main)
PRIORITY #1 CHECK: OD L934 + L949 + 18/11 ~03:35Z + ~03:45Z UTC (verbatim read); main jsl.js kitBookFigClamp / jkit kitBookFig; r4 code (per-page column, a302d5e6) NOT on main = nothing to revert; no other review/* touches it.
## What (KIT 34.6, only jsl.js kitBookFigClamp + KIT.md)
- ONE layout: --porf = .36 of inner width (unchanged) = same x/width on every page.
- Body = Hc x .935 for EVERY adult (women and men: the +7 % men factor is not applied on a book page, it pushed hats above the column). Children keep the child factor (kid(age), smaller). Nobody is shrunk to fit.
- Wider than the column (robe, train, sleeves, child art, silhouette) = CROPPED at the column edge (.kbk-por overflow:hidden), centred on the body core cl..cr; narrower = live place (left edge).
- Emperor = exactly as live (fitted by painted width, no crop; his sizes identical before/after).
- Gap code no longer lowers a tall figure past the column floor (feet were cut).
## Scan dev/test/book-figsize-scan.js (+cases.json, 37 kinds incl. SELF/silhouettes/kids) Fold 755x1000 + iPad 1180x820 : column x/width identical (0), adult body spread 0.01 % (Fold 741.1..741.2, iPad 589.7..589.8), kids 629.6 / 501.0 (.85 of adult), face band crop 0, text overlap 0, feet cut 0, aspect +-1 %, crown cut <= 3.6 px (widest maid hat only). 1366x1024, 412x1058, 390x844 NOT scanned (time).
BEFORE (main) her figure 481.8 (wide cloak) / 640 (slim); Hoang hau 671; wide pink 412; kid 349; spread 31 %.
## OPEN POINT for owner/MAIN
"Her live p.5 body" moved with her outfit on main (the live rule shrank wide outfits to the column: 482..642). Now nobody is shrunk, so the standard is the kit rule = 0.935 x column height (Fold 741 / iPad 590) and her own figure is that size too (bigger than her live shot by 15..54 %). If she wants the smaller live size instead, lower the .935 in kitBookFig (one number).
Chip "?": sits at the right edge of the column; with the centred crop a wide crown can touch it (pink maid: tassels) — LOOK.
## Shots (CDN, delete after verdict; wipe: cdn_sync.py --wipe-review book-figsize) LOOKED 3x
https://ctm-img.victoria-tntt.workers.dev/img/_review/book-figsize/r5-<dev>-<name>.jpg , dev fold|ipad, name SELF | fig-thaihau-1 (Hoang hau) | fig-consort-c09-ty6-a36 | fig-emperor-a18-1 | fig-kid-p16-a51 (child art) | fig-maid-m50-t6-a51 (widest robe, pink). Left half BEFORE main, right AFTER; column at the same x in every AFTER. Pages = real kitBook renderer with real catalog figures (no live save in sandbox).
~90% xong / ~80% chơi được.

## r5b (MAIN s43 feedback: SIZE = owner's p.5 size) — review/book-figsize-r5 @ bac50f39
- Size is ONE fixed BAL number now: BAL.bookFigW=.343 (jbal2.js): adult body = figure column width / .343 (capped by column height), independent of her outfit and of kind. Fold 641.4 / iPad 533.5 (her shot 642 / 534). Children x age factor (smaller), emperor as live.
- Scan 37 kinds x 5 devices (755x1000, 1180x820, 1366x1024, 412x1058, 390x844): ALL OK on all 5: column x/width identical on every kind, adult spread 0.0 % (body 641.4 / 533.5 / 618.1 / 358.6 / 338.2), face band crop 0, text overlap 0, feet cut 0, aspect ok, crown cut <= 6 px. (First run of 390 failed only on a mis-timed first case; two warm-up renders added, re-run ALL OK.)
- Shots (CDN img/_review/book-figsize/r5-<fold|ipad>-<name>.jpg, left BEFORE main, right AFTER; SELF, Hoang hau, wide pink, emperor, child art, widest robe pink): LOOKED, text column at the same x on every AFTER, her figure = her shot size, wide robes cropped at the column edge with face whole. Delete after verdict: python3 dev/site/cdn_sync.py --wipe-review book-figsize.
~95% xong / ~90% chơi được.

## r5c (ROOT-44 fail: "?" chip on the figure) — review/book-figsize-r5 @ ce8a6d48
- Root cause: the "?" chip is the kit mood seal (jfigseal.js kitFigSeal), placed beside the head from the figure's width profile and clamped into the figure column; on a book page (figure 641 px, wide shoulders/sleeves, cropped column) it landed on shoulder / crown tassels / fur.
- Fix (kit part, whole group): on every .kbk-person.kbk-full the seal is a child of the page (kfsHost) and sits in ONE fixed slot = right end of the name row of the text column (<=46 px); .kbk-phead gets padding-right 52 px on every page (j87.js) so no text runs under it. Never on a figure, same slot on every page/kind.
- Scan (book-figsize-scan.js, new check chip overlap with the figure column + text = 0): 37 kinds x 5 devices ALL OK (755x1000, 1180x820, 1366x1024, 412x1058, 390x844): column x/width identical, adult body spread 0.0 % (641.4 / 533.5 / 618.0 / 358.6 / 338.1), chip overlap 0 (seal present on 34 kinds, the 3 silhouettes have none by kit rule), face crop 0, text overlap 0, feet cut 0.
- Shots (CDN, replaced r5-*): fold|ipad x SELF, fig-thaihau-1 (Hoang hau), fig-consort-c09-ty6-a36, fig-emperor-a18-1, fig-kid-p16-a51, fig-maid-m50-t6-a51; LOOKED: chip in the name row, nothing on the figure. Wipe after verdict: python3 dev/site/cdn_sync.py --wipe-review book-figsize.
~97% xong / ~92% chơi được.

## HANDOVER (worker r5, ROOT-47 order fullbody-frame-s1 received, NOT started)
START_CTX ~0 %; at the order context was 34 % of the window (> START_CTX+25 %) → rollover; ROOT-47 opens the successor.
- book-figsize r5c is DONE and pushed: review/book-figsize-r5 @ ce8a6d48 (superseded by ROOT-47's fullbody-frame order: the crop rule is overwritten). Code touched: dev/build/jsl.js (kitBookFigClamp: fixed size BAL.bookFigW=.343, crop centred on body core, emperor as live, gap code never lowers), jbal2.js (BAL.bookFigW), jfigseal.js (kfsHost + book seal slot), j87.js (.kbk-phead padding-right 52px), KIT.md 34.6, dev/test/book-figsize-scan.js + book-figsize-cases.json (37 kinds x 5 devices, env SZ / SHOTS=1 / CASES / HER / DUMP; checks column x/width, adult spread, kids, face band, feet, crown, text + chip overlap).
- Scan harness tips: run one process per device in background (each ~15-25 min, prints only at the end), use a Monitor until-loop on the output file (not sleep chains); container may restart and kill background jobs; the first book render is a warm-up (script renders it twice).
- Next (successor): read dev/handover/briefs/fullbody-frame-s1.md on this branch, branch review/fullbody-frame from origin/main 1c3abe3, step 1 = Tuần lục sample shots only (Fold 755x1000@2 + iPad 1180x820@2, c03 t1 + t8 + one old wide live figure, before|after), LOOK 3x, CDN img/_review/fullbody-frame/. Reuse book-figsize-scan.js (copy from review/book-figsize-r5). CDN img/_review/book-figsize/ still holds r5 shots: wipe with python3 dev/site/cdn_sync.py --wipe-review book-figsize once ROOT-47 says so.
- OWNER UPDATE to fullbody-frame step 1 (relayed by ROOT-47, OD 18/11 ~06:55Z): the 1520x2688 canvas still has empty margin; cut the frame as TIGHT as possible, widest box = standard. Measured alpha>16 bbox on all 8 c03 a18 PNGs: widest t6 (x 117..1409). Union t1..t8 = x 117..1409, y 0..2678 → STANDARD FRAME 1292 x 2678 px, aspect 0.4824 (centre x 763 ~ canvas centre 760). Every c03 tier at the SAME scale with crop box (x offset -117, y 0), nothing cut (t6 touches both sides, t7/t8 crown touches top). Text column takes the saved width. Same shots as the brief + t6.
