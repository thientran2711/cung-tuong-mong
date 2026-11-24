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

## R2 — fix of REVIEW FAIL (branch `review/map-label-overlap` @ a7bf3e01, on top of reviewer merge 6e2bb041)

PRIORITY #1 CHECK: unchanged (same shared solver `kmSolve`/`mapFit`, dev/build/j38.js; no new feature; review/map-label-overlap-r read).

### Findings answered
1. **DOM overlap while `__mapSolve.hard=0` (solver/DOM mismatch) — ACCEPTED, 3 causes found and fixed in the shared fit, not per place.** The solver measures every tag once; things that change a tag's size/position AFTER that measure leave the DOM different from the solution:
   - the rank-title painter (`kitRankPaint`, j79, a rAF MutationObserver) wraps a title inside a place name («Thượng thư» phòng → `b.kname>.kti`); inside the column-flex `.mlab` that turns one line into 3 (117×41 → 74×54), 9 ms after the fit;
   - the map frame (`.mapw`) changing size with no change of the scroll box (columns/picture/fonts settling);
   - any other late layout shift (found at 1180x820 night rank 0, first case after boot: every tag 3–42 px off its solved place, solver `hard=0`).
   Fix: (a) MutationObserver on text/children inside `.mlab/.mmeta` → one debounced re-fit; (b) ResizeObserver on `.mapw` → re-fit when its size is not the size the last fit measured; (c) **settle check** 250 ms after every fit: each tag is compared with where the solver expects it (`window.__mapVer`), the median shift (plain scroll) removed; any tag off by > 3 px → fit again (max 4 in a row per map). Caps stop loops; own edits (class, translate, `.mlead`) are outside the observers.
2. **`Trường Môn viện | Hàm An` still once on the phone — ACCEPTED, fixed.** On the phone (map zoom 2.6, tags 130–227 px wide over 36–70 px buildings) with the TRUE (painted) geometry the normal stages fail in ~23 of 24 cases; RX alone was not enough (its limits: leaders ≤ 90, tags may not touch the visible edge, 300 px radius). Stages now: RX1 leader dot/line near a tag = small cost, leaders ≤ 90 px, protected tags movable; RX2 leaders ≤ 200 px, a tag cut by the visible edge costs a little (she pans); RX3 only tag boxes count, search radius 600 px, any leader. Budget 800 ms per RX stage, run only in the final (viewport) pass.
3. **Rerun 3× at all 4 sizes → 0 each time — DONE**: 3 runs × 4 sizes (755x1000, 1180x820, 1366x1024, 390x844) × (5 ranks × day/night × 5 zoom steps + 10 courtyards) = **720 cases, 0 overlaps, 0 page errors** (4 browsers in parallel = harsher timing than one). Test now waits 800 ms for the map to settle before measuring and has `DUMP=file` (failing layouts incl. solver items + DOM boxes), `DUMPALL`, `REP=n`.

### Cost / performance
- Solution cache keeps 8 layouts (was 1: every fit solved twice); the interim no-viewport pass skips the RX stages. Phone first-open solve: ms 1.7–2.0 s (baseline 2.2 s), iPad rank ≥3 0.7–1.7 s (RX stage), Fold 30–370 ms.

### Side effect to know (honest)
- On the PHONE night rank 3 the older `map-labels-scan.js` quality rules (leader through another tag / dot within 16 px / leader > 92 px) can now FAIL (e.g. `home>r5` one leader through a tag, 94 px): the old solver "passed" there only because it measured the layout before the painter changed the tag widths. Zero tag-box overlap is guaranteed; leader polish on the phone in the last-resort case is the cost. Phone is not a priority device (law 12). Fold 755x1000 and iPad 1180x820: existing scan rank 2,3,5 day/night + courtyards **12/12 PASS** after the change; iPad Pro: PASS earlier in R1, no change in kind.
- Screenshots looked (Fold + iPad night rank 3): all tags separate, same size, readable.

~100% xong / ~100% chơi được cho lỗi này (chờ reviewer).
