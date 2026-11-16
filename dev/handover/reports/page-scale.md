# page-scale — Fold page = iPad right page, scaled (owner 16/11 17:00Z s20)

Branch `review/page-scale` @ 1f4912486 (base origin/main 2e9615fb1 + merge of review/tutrang-layout 57d698fe8). Worker s20 fast lane. SẴN SÀNG KIỂM.
Owner: "ô hành trang là có tới 7 hàng, còn một bên là ô hành trang chỉ có 4 hàng". Rule: OD:L345 + OD:L1278, KIT §0.0 (new §0.0a).

## Root cause (measured, not guessed)
The one-page canvas was 590x820, but its bottom bar is 32 px taller than the spread's (two rows of 4 tabs = 76 px, owner 13:25Z (C); spread = one row, 44 px).
So the open page box was **582x591 on Fold vs 582x623 on iPad** on EVERY tab. Everything that sizes itself from the free pixel height then laid out
differently: `kitInvFit` (bag adds whole rows of empty cells into free height, then tries one more column), equipment slot size `--keqsz`, and with
review/tutrang-layout (bag fills the whole right side) the row count: measured **7x5 on iPad vs 7x4 on Fold** for the same save (owner saw 7 vs 4 on her save).
Second, smaller cause: 50 CSS sizes in `N vh / N dvh` (kit panel height `--kph`, dialog art bands, reward tabs, pickers…) — any canvas-height change makes them differ.

## Fix (kit/layout only, one place, whole group)
1. `KIT_FRAME.page` = **590 x 852** (rot.js + kvfallback.js) = spread height + the one page's extra chrome; new `KIT_FRAME.box` = 582x623 = the page box in both
   modes. The Fold canvas is still scaled uniformly (s 1.2195 → **1.1737**, side paper bars 18 → 31 px). No page code changed.
2. `--kvh` = 1 % of the SPREAD height (8.2 px) in both modes; codemod replaced every `N vh/dvh` (N≠100) in dev/build CSS by `calc(N*var(--kvh,1vh))`
   (50 sizes, 17 files: j50 j59 j79 j90 j93 jcui jflip jgpick jk2b jk3 jk4 jne jopic jpdlg jtoil jts p1). `100vh/100dvh` (fill the canvas) unchanged.
3. Build guard: `dev/measure/media-check.js` now also fails on a new `N vh/dvh` size. KIT §0.0 + new §0.0a + table + bottom-bar note updated.
RULE written in KIT §0.0a: change chrome height in one mode → change `KIT_FRAME.page.h` by the same amount; page code never reads page height for rows/columns.

## Mismatch table (dev/test/page-scale.js: same seeded save, spread 1180x820 right page vs one page; box, grids cols x rows, first-screen rects ±2 px)
| tab | BEFORE (main): page box Fold vs iPad · same rects | AFTER: box · same rects · grids |
|---|---|---|
| Hành sự | 582x591 vs 582x623 · 96.4 % | 582x623 = · 98.8 % · 0 diff |
| Dư đồ | full-canvas map (1164 wide on iPad) — KIT §0 exempt | exempt |
| Hậu cung (+3 sub-tabs) | 591 vs 623 · 90–95 % | = · 100 % · 0 |
| Giao tình (+1) | 591 vs 623 · 99 % | = · 100 % · 0 |
| Hoàng tự | 591 vs 623 · 94 % | = · 100 % · 0 |
| Tư trang (+9 categories) | 591 vs 623 · 53–57 % (equip slots sized by free height); with tutrang-layout bag **7x5 vs 7x4** | = · 100 % · bag 7x5 = 7x5 |
| Tài nghệ (+3) | 591 vs 623 · 100 % (list, height only) | = · 100 % · 0 |
| Mệnh truyện (+4) | 591 vs 623 · 99–100 % | = · 100 % · 0 |
| pop-ups: item panel, ☰ menu | 560x337 / 560x250 both | same |
AFTER: **36/36 PASS** (Dư đồ SKIP). BEFORE: 2 PASS (pop-ups), 34 FAIL. Sheets (BEFORE row = main, AFTER row = branch; left Fold page, right iPad right page):
`dev/handover/reports/page-scale/*.jpg` (act, court, rel, kid, inv, inv-1 Trang sức, inv-pop, art, story, story-pop, go).

## Tests (branch)
- page-scale.js: 36/36 PASS (new test; `node dev/test/page-scale.js <url> <out> [shots]`; fails on box/grid/rect mismatch).
- design-scale.js: pageCanvas 590x852, spread, rotated, oneAtATime room→page→room, noErrors, rightPageMatch **98.1 %** (was the known-low index), leftPageMatch 100 %, sameBox true.
  `ready()` now waits for document load (S-undefined race seen on iPad pass).
- tab-pairs.js: 1180x820 and 755x1000 · 56 pairs each · 0 mismatches · 0 errors.
- kit-conform.js 755x1000 + 1180x820: same kinds as main; only differences are flaky place/PEND openings flipping both ways (place:tyv MISSING on one size in each build).
- game-feel phase 4: old save written by MAIN loads on the branch (ok, inv 2), offline ok (pixi + overlay). Same S-race fix in the test's waits.
- perf (fold, ipadAir; bytes unchanged ≈ 69 MB both; over-budget items are the same on main): main fold title 46.8 s / playable 9.3 s, main ipadAir 60.0 / 6.6 s; branch fold run 1 80.5 / 6.5 s, run 2 54.0 / 29.3 s, branch ipadAir 46.3 / 8.3 s; first load 68.9–69.1 MB and warm 9.3–10.1 MB on both builds. Times swing 2–4x between runs of the SAME build here (CDN pictures over the session proxy, runs overlapping) — no change attributable to this branch (it only changes two constants and CSS units; bytes identical). Long task max 475–815 ms on both.
- media-check: 0 breakpoints, 0 vh sizes.

## Not done / for the coordinator
- Dư đồ: map spans both pages on iPad (maptab) and one page on Fold — allowed by KIT §0 (full-canvas screen); if the owner wants the map = right page, that is a design decision.
- KIT §0 "OPEN" per-mode modal rules (jpdlg .kpdlg, j79 .kpsc scene card, j93 kitReward, jpm, jgpick .kipd2, jtoil, jcooptimer) are unchanged: pop-ups wider than one page
  on the spread cannot be identical on one page; needs a kit-keeper decision per component.
- review/tutrang-layout worker session was inactive (message bounced); its branch is merged here unchanged. If it pushes more, re-merge.
