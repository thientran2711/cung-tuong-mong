# map-label-overlap (W4) — report

PRIORITY #1 CHECK: OD 93 (labels readable, kept: no size change) · main `git grep` "Dư đồ"/mapFit/kmSolve → single shared solver `kmSolve` in dev/build/j38.js (KIT §85.7 TAG SOLVER) · review/* 0 · claims map-labels-missing (landed) / duodo-focus: none open on overlap · existing dev/test/map-labels-scan.js (checks rank 2 only) is untouched and still PASSes.

Branch: `review/map-label-overlap` @ 2a17fc28 (from origin/main 225c5c0, site rebuilt).

## Root cause
The shared tag solver left 1 hard violation in a cramped row of the map (Trường Xuân r3 · Vĩnh Hòa r4/r5 · Hàm An = her home · Trường Môn viện lc): the row's buildings are ~65 px apart while the tags are 75–130 px wide.
Her home tag is "protected" (never moves unless it hits another protected tag) and the lc building sits under the home tag, so lc's leader dot would land inside the home tag (banned) and lc cannot stay (boxes overlap). Every other tag was tried; no clean layout exists, the solver kept the overlap and went on.
It shows only at rank ≥ 3 (more people in those palaces → wider info rows), and only after the map settles (the first synchronous pass was clean, the re-fit after image/fonts was not), which is why a quick scan at rank 2 never saw it.

## Fix (shared placement, no per-label hack) — dev/build/j38.js `kmSolve`
New last-resort stage `RX`, run by mapFit only when every existing stage (60/28 → 60/16 → 120/16 → 200/16) still has a hard violation:
- leader dot / line near another tag costs 20 points instead of being forbidden; tag-box overlap and too-long leaders stay HARD;
- protected tags (her home, "!" places) may move in that stage when they still violate.
Nothing else changed: label size (`--mls` floor), clean layouts, courtyard level, zoom, and every layout that already solved are identical (the new stage never runs when `hard` is already 0). Pure solver geometry, no DOM, no CSS, no kit part touched (law 9/16: nothing approved moved beyond the fault).

## Test — dev/test/map-label-overlap.js
`node dev/test/map-label-overlap.js <url> [WxH,..] [ranks] [zoomSteps]` — per size × rank × day/night × zoom step (fit, +0.5 … as the +/- buttons) on the whole map, plus every palace courtyard (.kpmv). Box = union of `.mlab`+`.mmeta`; counts pairs overlapping > 1 px; exit 1 on any. Prints the failing pair and `__mapSolve`.

## Before / after (ranks 0,2,3,5,7 × day/night × zoom steps 0–4; 60 map cases + 10 courtyards per size)
| size | cases | overlap cases BEFORE (main 225c5c0) | overlap cases AFTER | pairs before → after |
|---|---|---|---|---|
| Fold 755x1000 | 70 | 1 (night r3: Hàm An \| Trường Xuân) | 0 | 1 → 0 |
| iPad 1180x820 | 70 | 3 (night r3, r5, r7: Trường Môn viện \| Hàm An) | 0 | 3 → 0 |
| iPad Pro 1366x1024 | 70 | 0 | 0 | 0 → 0 |
| Phone 390x844 | 70 | 1 (night r3: Trường Môn viện \| Hàm An) | 0 | 1 → 0 |
| **total** | 280 | **5** | **0** | **5 → 0** |
(Day failures also reproduced earlier at 1180x820 r3–r7 in other world states: the roster is random per start, so counts differ run to run; AFTER stayed 0 in every run.) Both map levels covered: whole map at 5 zoom steps; courtyards 10/10 clean. Existing map-labels-scan.js (rank 3, 755x1000 + 1180x820, day/night + courtyards) PASS. No page errors.

## Looked at
Fold 755x1000 night r3 and iPad 1180x820 night r3 screenshots after the fix: Trường Xuân / Vĩnh Hòa / Hàm An / Trường Môn viện all separate and readable, same text size, other tags where they were.

## Notes for main
- Solve time at night in the worst case is ~1.7 s (RX stage budget 400 ms on top of the earlier stages); it is cached per layout key, so only on first open/resize.
- The layout is not a shipped image: index.html/sw.js were rebuilt (`dev/site/build_site.sh`); coordinator may rebuild again at land.
- Not touched: OD 93 sizes, kit, VANPHONG words.

~100% xong / ~100% chơi được cho lỗi này.
