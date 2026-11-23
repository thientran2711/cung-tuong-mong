# review/kit-odds-row — odds meter = bar + word on ONE row (MAIN110-W2, kit keeper) — 23/11

PRIORITY #1 CHECK: OD 23/11 ~20:30Z (verbatim «xuống hàng chi cho tốn chỗ») + 21/11 ~04:00Z (L2133–2135, meter on the title row) | main KIT.md §11 (kitOdds→.kodm, j79), §6.2b-1 (kodstk stack = the thing removed), kit-opt-title-wrap.js, dialog-fixed.js | review/* none | claims none.

Branch `review/kit-odds-row` = **f3eb43bb7201354f0b8e48feaa57b84427705fc1** (from origin/main b1033eb). Files: dev/build/j79.js (kit part), dev/kit/KIT.md (§5 GENERAL LAYOUT LAW + §6.2b rows overwritten), dev/test/odds-one-row.js (new), dev/test/dialog-fixed.js (accepts kodrow), index.html/sw.js/assets.json rebuilt.

## What changed (kit part only, every host at once)
1. `.kodm` is `flex-direction:row; white-space:nowrap!important` for bar AND word (id-free but `.kodm.kodm` weighted) — card, popover, person card, hud. The stacked form (`kodstk`) is **removed**; `kitOdFit1` only decides `kodrow` (WHOLE meter, still bar+word on one row, under the title at the right) when the title would get < min(one-line width, 7.5 em). A `kodrow` card reports the whole row as title room, so `kitOptTier` keeps iPad 2 columns.
2. Ladder popover (`kpPop`) widens to its longest row — «Năm ăn năm thua  nửa thành nửa hỏng» was wrapping its meaning to a 2nd line at 300 px (a needless wrap found by the scan; fixed in the kit).
3. KIT.md §5 «GENERAL LAYOUT LAW — NO NEEDLESS WRAP» (owner words quoted, canon overwrite); §6.2b/§6.2b-1 text that described the stack rewritten.
4. Regression: `node dev/test/odds-one-row.js <url> <out>` — every visible `.kodm` on the bar's row, word one line, no `kodstk`; exit 1 otherwise.

## Before / after (odds-one-row.js, same seeded world; meters whose word sits BELOW the bar / word wrapped)
| device | meters scanned before→after* | word BELOW bar before | after | word wrapped before | after | kodrow (whole meter under title, bar+word one row) before→after |
|---|---|---|---|---|---|---|
| Fold 755x1000 | 37→37 | 28 | **0** | 7 | **0** | 7→25 |
| iPad 1180x820 | 61→91* | 28 | **0** | 7 | **0** | 7→25 |
| phone 390x844 | 39→39 | 32 | **0** | 8 | **0** | 14→29 |
(*the tapped-popover scene scans every meter on the page behind it, so its count differs by scene state; below/wrapped are over all scenes: option dialogs ×2 at col auto/460/320/260 px, popover, Hành sự act, person card, staff, rv.)
Other needless wraps found + fixed: ladder popover meaning (1). Short label pairs elsewhere (chips Tốn/Được, `.kef1` stat items) already nowrap by K-EF-UNIT — no change.

## Honest trade-off for MAIN / owner
With the word beside the bar the meter is ~130 px wide on «Năm ăn năm thua», so on narrow cards (Fold dialog column ~310 px, iPad 2-col) the title room beside it is under 7.5 em and the meter drops under the title (right-aligned, bar+word still ONE row): 25 meter placements at Fold/iPad (was 7). If the owner prefers the meter always beside the title and a 2–3 line title, the single knob is `KIT_ODFIT.min` (j79, 7.5 em) — lower it; no other change.

## Tests run (build: `CTM_IMG_BASE= bash dev/site/build_site.sh`, served locally; CDN pictures absent so card pictures are empty boxes)
- odds-one-row: Fold / iPad / phone PASS. kit-opt-title-wrap (REP=1): 755 + 1180 PASS. oldsave-r1 (old main build → new): 16/16, no page errors, no overflow.
- dialog-fixed: 4 FAIL, **identical to origin/main baseline** (#80 event picture top, #56 no card without picture — both need CDN pictures offline); the 4 new FAILs the first run showed (odds-on-title-row ×2, iPad 2 columns ×2) fixed by the kodrow room + test accepting the documented `kodrow` fallback.
- LOOKED at: Fold dialog (after/before), iPad dialog, iPad Hành sự act with ladder popover, Fold popover — word right beside the bar everywhere; popover rows one line.

~100% xong (kit) / ~100% chơi được (UI only; needs reviewer).
