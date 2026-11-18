SẴN SÀNG KIỂM 3a022369 review/phone-bars

# phone-bars — one-page (Fold portrait) bottom tab bar

Worker session_01UV1SzgIQ... (sonnet) · branch review/phone-bars from review/design-scale-p2-r1 d8950434 · owner OD 16/11 13:25Z (C).
Sheet: dev/handover/reports/phone-bars/before-after.jpg (755x1000@2, live main vs this branch; shots after-755x1000-home/tab.png; numbers before-/after-measure.json).

## Change (kit bar only, one rule, kv1 via :where(.kv1))
- p1.html `:where(.kv1) .bar/.tabs/.bar .main` + j57.js `tabsFit`: on kitView().pages===1 the 8 tabs are TWO ROWS of ceil(n/2)=4 (36 px rows, label .86 rem), "Sang buổi" is ONE tall 84 px button spanning both rows at the right. Spread keeps one row (unchanged).
- KIT.md §0.0 bullet "BOTTOM BAR on the one page" + kit sample §0b (jk3.js). Test: dev/test/phone-bars.js (own server, measures rects/clip/overlap, shots; PB_ROOT=<dir> for another build).
- Top bar NOT changed further: design-scale-p2-r1 already made it 128.7 px, one row of whole items, no overlap/clip at 755x1000 (live main: 132 px, time block 3 lines). Readable in the sheet.

## Numbers (755x1000@2, CSS px in the 590x820 page)
| | live main | this branch |
|---|---|---|
| tab button | 61 x 44, label 9.4 px | 120 x 36, label 13.8 px |
| Sang buổi | 66 x 44 | 84 x 76 |
| bottom bar height | 44 | 76 |
| top bar | 132 | 128.7 |
| #panel (open tab) | 582 x 620 | 582 x 591 |
iPad 1180x820, 1366x1024 and rotated 412x1058, 390x844: bars identical (nav 44, panel 582x623.3, tabs 128.6 x 44).

## Tests
phone-bars.js 5 sizes: no overlap/clip/page errors, exit 0 · tab-pairs 755x1000: 56 pairs, 0 mismatches · kit-conform 755x1000 / 1180x820: CONFORMS 84 / 82, MISSING 15 / 18 (not CUSTOM/MIXED), no floats, exit 0 · game-feel: exit 0, old save loads, offline ok · design-scale: devices all ok (6 sizes, 0 errs, no overflow).
**Expected diff:** design-scale A "page = spread" match fell 98 % → 38 % (page box 582x563 vs spread 582x596, −33 px) — the intended price of the 2-row bar; reviewer: either accept (page content area is 5 % shorter) or ask me to use 32 px rows (+~8 px). Servant mode (fewer tabs) also splits in two rows (not checked).
NOT run: coop-e2e, boot/game-feel at 412/390 other than design-scale, scene-end.
Context at finish ~35 % of window.
