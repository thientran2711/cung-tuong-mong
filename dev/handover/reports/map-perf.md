# map-perf — Dư đồ opens slowly on a played save + «phone map settle» (MAP-PERF, worker session_01V1ZZH1LjcZxsUARKRyfdN1, for MAIN 116)

PRIORITY #1 CHECK: OD 0 hits (kmSolve / mapSolC) | main dev/build/j38.js:19 kmSolve, j38.js:83 cache window.__mapSolC2 (8 keys) | review/* map-label-overlap-r b7598e72 (LANDED = LIVE base of this branch), review/robot10-lag 9001e14c (harness, reused unchanged) | claims MAP-PERF = this session.
START: depth 1, START_CTX ~3 %.

Branch `review/map-perf` @ **d6c2b4d4** from origin/main b7598e72. Only file of game code touched: `dev/build/j38.js` (+ rebuilt index.html / sw.js / assets.json). No kit part, no CSS, no wording, no BAL number.

## Root cause (one cause for both tickets)
`mapFit` (the only caller of the tag solver `kmSolve`) runs on ~10 triggers around an open (render, the next frame, picture load, fonts, rows settle, ResizeObserver x2, MutationObserver, settle check up to 6 re-fits, periodic re-renders) and:
1. every fit solved **twice**: a no-viewport pass inside `place()` whose result the viewport pass right after always threw away;
2. the cache key held **screen px** (scroll position, frame offset) and its 8 slots were filled by those passes → on re-open / re-render / scroll nothing was ever reused (measured: 48 solver calls, 9 distinct layouts per open);
3. the first fit inside `render()` measured the tags **before** the rows around the map existed and before the rank-title painter (j79, one frame later) rewrapped a name → 2–3 different layouts per open, each a full solve;
4. after a scroll clamp the stored position (`__mapPos2`, from the async scroll event) was an in-between value → the next fit restored another scroll → another visible box → another solve;
5. on a **played** save no clean layout exists, so each solve ran all 8 stages from scratch with their own time boxes: ~5 s per fit at CPU×1.
Together: 11–21 s at ×1, 35–69 s at ×4 on the first open, 6–13 s on a re-open; and the settle check / re-renders kept re-solving with slightly different inputs, so the map **re-laid out every 5–6 s for 20 s** (the «phone map settle» ticket: same mechanism, worst on the phone where every solve reaches the last-resort stages; main phone run: max settle 18.6 s, 6 cases never settled within 15 s).

## Fix (whole group: the one shared solver, every map view — portrait kv1 + landscape kv2 + every zoom step; courtyards .kpmv never solve; every device)
- no throw-away pass: one solve per fit (viewport pass only);
- solver works in **map-frame coordinates**; cache key = frame-relative geometry; **LRU 16** (`window.__mapSolC3`): same layout = 0 ms whatever the scroll / re-render / re-open;
- the fit inside `render()` only **reuses** a stored solution (never solves a layout about to change); on the switch into the tab only the next-frame fit runs (still before the first paint);
- the text painters (`kitRankPaint` / `kitNameTone` / `kitMarkPaint`) run on the map before it is measured (tags measured in their final shape);
- the fit stores the scroll it chose at once;
- `kmChain`: the stage chain (same stages, map-label-overlap RX1–3 kept) under **one 400 ms time box** (`KMAP_SOLVE_MS`), every later stage warm-starts from the best layout so far: base (40 %) → the loosest clean stage 200/16 (25 %): if even it cannot clear the tags the stricter ones cannot either → straight to RX1 (≥ 75 %) → RX2/RX3 (rest); if it clears them, the stricter clean stages are tried in their old order while the box lasts and the first clean one wins (same preference as before);
- exact speed-ups in `kmSolve` (same result, checked on 98 recorded solver calls with a fake clock: 98/98 identical): bounding-box skip of far tags in `hardAt`, best-so-far cut-off in `search`/`costAt`, SA re-counts only tags near the moved one, scratch `geo` result, repair skips a tag whose search inputs did not change.

## Before / after
Save = robot repro save dev/handover/robot/saves/20261123-2308-004 (year 14, rank 5, Quý phi, 26 places). Box = this 4-CPU software-GL container (same class as the robot run).

robot10-lag harness `probe()` (review/robot10-lag dev/measure/robot10-lag.js, unchanged; click → 2nd frame; 2 probes, «Sang ngày mới» between them = a new buổi = a new map):
| device | CPU | Dư đồ probe 1 BEFORE (main) | probe 2 BEFORE | probe 1 AFTER | probe 2 AFTER |
|---|---|---|---|---|---|
| Fold 755x1000 | ×1 | 21 568 ms | 13 087 | **1 326** | **278** |
| Fold 755x1000 | ×4 | 69 234 | 1 514* | **2 533** | **1 484** |
| iPad 1180x820 | ×1 | 10 202 | 12 970 | **1 451** | **1 280** |
| iPad 1180x820 | ×4 | 56 654 | 38 581 | **3 063** | **3 513** |
(*before, probe 2 at ×4 hit a still-running settle loop). Other tabs in the same probes: Hành sự 0.5–1.0 s, Tư trang 0.5–1.0 s at ×1 — Dư đồ is now in the same band.

Map-perf probe (one open, 20 s watch; re-open after Hành sự, same buổi):
| | Fold ×1 before → after | iPad ×1 before → after | Fold ×4 | iPad ×4 |
|---|---|---|---|---|
| open (tap → 2nd frame) | 11.5 s → **1.0–1.3 s** | 11 s → **1.2–1.5 s** | 38.1 → **2.3 s** | 35.3 → **2.7 s** |
| re-open | 6.1 s → **0.24–0.29 s** | 6 s → **0.21–0.31 s** | 22.5 → **0.94** | 13.8 → **0.92** |
| solver calls in 20 s | 46 → 3–5 (one chain) | 37 → 4–5 | 42 → 3 | 37 → 4 |
| tags moved after settle (8–20 s) | yes → **no** | yes → **no** | yes → no | yes → no |
| solver hard (tags touching) | 0 → 0 | 0 → 0 | 0 → 0 | 0 → 0 |
Of the remaining ~1.2 s at ×1: tab render ~350 ms (other modules) + one solve 0.6–0.9 s + paint ~0.2 s. Target «< 1 s at ×1» is met for re-open (0.2–0.3 s) and on Fold in the probe run (0.99 s with a 350 ms box); with the 400 ms box needed to keep map-labels-scan quality (below) first open on a new buổi is **1.0–1.5 s at ×1** (iPad up to ~1.8 s on a busy box) — honest gap, see Notes. Table rows AFTER = build 8e86028d (same fit fixes, box 400 ms); final d6c2b4d4 only reorders the clean stages.

«Phone map settle» (map-label-overlap.js, fresh life, ranks 0,2,3,5,7 × day/night × zoom 0–4 = 60 cases + 10 courtyards per size):
| size | BEFORE max settle / unsettled > 15 s | AFTER max settle / unsettled | overlaps before → after |
|---|---|---|---|
| Fold 755x1000 | 4.7 s / 0 | **1.4 s / 0** | 0 → 0 |
| iPad 1180x820 | 7.0 s / 0 | **1.9 s / 0** | 0 → 0 |
| iPad Pro 1366x1024 | — | **1.6 s / 0** | → 0 |
| Phone 390x844 | **18.6 s / 6** | **1.6 s / 0** | 0 → 0 |

## Tests (final build d6c2b4d4)
- dev/test/map-label-overlap.js, ranks 0,2,3,5,7 × day/night × zoom 0–4 + 10 courtyards: Fold 755x1000 / iPad 1180x820 / iPad Pro 1366x1024 / phone 390x844 = **0 overlaps in 240 map cases + 40 courtyards**, no page errors, max settle 1.0 / 1.9 / 1.5 / 1.6 s, unsettled 0 (main: phone 18.6 s, 6 unsettled).
- iPad 1180x820 **cold start COLD=30: 30/30 clean**, max settle 1.3 s (R3 on main: 2.8 s). Fold COLD=10 (earlier build): 10/10.
- dev/test/map-labels-scan.js ranks 2,3,5 Fold + iPad (day/night + courtyards): **3 runs 14/14 PASS** (+ 1 extra iPad 3,5 run: 2 «dot within 16 px» nits on night r3/r5, no overlap). Baseline main on the same box is flaky on that same case too: 4 runs → 1 run with an actual tag overlap (`lc|home`, `r5|r4`, day r5) + 1 run with a dot nit. Not a regression; the case is time-boxed in both.
- Solver exactness: the speed-ups in kmSolve give byte-identical results on 98 recorded calls (fake clock).
- **QUICKCHECK PASS** (dev/tools/quickcheck.sh, 659 s: open 1.8 s, old save from LIVE loads + plays, perf new/live render 287/308, tab 450/506, buổi 1584/2798 ms, core gates PASS).
- Old save: the robot repro save (older build, year 14) loads and opens Dư đồ with 0 errors in every probe above; quickcheck old-save from LIVE ok.
- Final harness re-run on d6c2b4d4 (busy box, other tabs ~30 % slower than the table): Fold ×1 go 1193 / 514 ms, ×4 3373 / 3318; iPad ×1 1435 / 1788 (iPad ×4 not re-run: local server timed out).

## Looked at
Fold 755x1000 + iPad 1180x820, played save, before and after (scratch shots, not in git): every tag separate and readable, same size; iPad after has fewer long crossing leaders than main (3 vs 5) on this save (last-resort stage on both).

## Notes for main / tickets
- First open after a new buổi stays ~1.0–1.5 s at ×1 on this box because one full solve is still needed for a new map; options if sếp wants < 1 s there too: solve in a Web Worker off the main thread (tags appear a moment later), or remember solutions in localStorage across reloads. Not done (bigger change, possible visible tag jump).
- Phone 390x844 on the PLAYED save: no clean layout exists even with every stage (hard 5–10 before and after; same on main). Fresh-life phone cases are clean. Phone is not a law-12 device; ticket if wanted: smaller info rows on phone.
- The lotus «me» marker above her place is not part of the tag box (can sit on a neighbour's info row on Fold, same on main) — not touched.
- KIT §85.7 TAG SOLVER: new solver constant `KMAP_SOLVE_MS` (400 ms, j38) — kit keeper may record it in KIT.md (no visual change).
- Scratch tools used (not committed): saved-call dumper + node chain simulator + fake-clock equivalence check; can be added to dev/measure on request.

~100% xong / ~95% chơi được cho lỗi này (mở lại tức thì; mở lần đầu một buổi mới ~1–1,5 s).

## REVIEW r1 (SMALL tier, reviewer session for MAIN 118)
Verdict: **PASS** — LAND READY map-perf d6c2b4d41f8063fcf7a41a0ed917262ad5beef0b FOR LC9.
PRIORITY #1 CHECK: OD Dư đồ slow-open | main j38.js | review/map-perf d6c2b4d4 | claims MAP-PERF.
1. Merge-check vs origin/main 35647d5e: j38.js and every source file merge clean; only generated index.html / sw.js / assets.json conflict (rebuilt, as for any land). assemble.py + build_site.sh OK on the merge.
2. Re-measure, played save robot 004, Dư đồ tap → 2nd frame, CPU ×1 (this box), LIVE → branch: Fold 755x1000 open 14 044 / 14 820 ms → **1 291 / 1 133**, re-open 12 092 / 6 307 → **247 / 223**; iPad 1180x820 open 11 565 / 11 421 → **1 520 / 1 578**, re-open 249 / 254 → **225 / 212**. Claimed numbers confirmed. (CPU ×4 not re-run.) 0 page errors.
3. Looked at (side-by-side LIVE vs branch, Fold + iPad, modal closed, after 20 s): same places, same labels, same picture; tag positions differ slightly (solver) with the same readable result on both (played save = last-resort stage on both). map-label-overlap.js Fold + iPad, ranks 0,3,5, day/night, zoom 0–4 + courtyards: **80 cases, 0 overlaps, max settle 1.6 s, 0 unsettled**. map-frame-kit PASS both; map-place-mask clean; map-labels-2 (tap A ca sở → place card, travel cost shown) 0 errors, 27 spots. map-tap-go (3 FAIL) and map-portrait (Fold/phone FAIL, iPad PASS) fail **identically on LIVE** → pre-existing, not caused by this branch. Old save loads (quickcheck).
4. dev/tools/quickcheck.sh on the merge: **QUICKCHECK PASS** (open 1.99 s, old save ok, render 300/299, tab 558/502, buổi 1637/1535 ms, core gates PASS).
Nits (non-blocking): map-tap-go + map-portrait failures exist on LIVE — ticket for whoever owns them; first open of a new buổi stays ~1.1–1.6 s (known, in worker notes).

## HANDOVER (24/11 ~06:55Z, rollover by context: 34 % used ≥ START_CTX 3 % + 25 %) — for the successor the coordinator opens
- map-perf r1 = PASS (MAIN 118), LC10 lands d6c2b4d4. Nothing open on map-perf.
- NEXT JOB (from MAIN CHÍNH 118, not started): the map-perf reviewer found PRE-EXISTING fails on LIVE: `dev/test/map-tap-go.js` 3 FAIL and `dev/test/map-portrait.js` FAIL on Fold 755x1000 + phone 390x844. Root-cause on the newest LIVE (stale test vs real bug). Real bug → fix on `review/map-fix-2` (law 11: every map tap / portrait case); stale test → fix the test and write the reason. End with «SẴN SÀNG KIỂM <sha>» to MAIN 118 (session_01V1ZZH21QY1yjJ4RPZUHNC6).
- Useful from this job: serve a local http.server from /home/user/wt (background, timeout 7200000); played save = dev/handover/robot/saves/20261123-2308-004.json.gz (gunzip); load it through the title slot (see robot10.js loadSave). Map code = dev/build/j38.js (mapFit / solveTags / kmChain); `mapFit(true)` = the in-render reuse-only fit, the real fit runs in the next frame — tests that read layout synchronously right after render() must wait one frame (check this first for the tap/portrait fails if LIVE already has d6c2b4d4).

## MAP-FIX-2 (worker session_01V1ZZH1VfNwzBQ4xJTkMJxY, for MAIN 118) — map-tap-go + map-portrait fails on LIVE
PRIORITY #1 CHECK: OD 18/11 ~19:45Z (4) entourage picker, OD 18/11 ~22:10Z one notice system, OD:L1921 phone map rail buttons, OD 17/11 04:08Z her side hall | main j27.js mapHTML, j38.js mapFit, jres.js resMeHoused, j95s.js j95sEntNeed, jnotice.js, jk3.js kgfRail | review/map-perf d6c2b4d4 (not landed → base) | claims MAP-FIX-2 = this session.
START: depth 2, START_CTX ~3 %.

Branch `review/map-fix-2` @ **c87a40e1** = review/map-perf d6c2b4d4 + merge LIVE 0c0877a2 (1079a6d8, only index.html / sw.js conflicted, rebuilt) + the fix. Game code touched: `dev/build/j27.js`, `dev/build/jres.js`, `dev/build/j38.js` (one line) + rebuilt index.html / sw.js / assets.json. No kit part, no CSS, no wording, no BAL number.

### Root cause (identical on LIVE 0c0877a2 and LIVE + map-perf)
| test | fail | cause | verdict |
|---|---|---|---|
| map-tap-go «went at once, no card» ×2 | modal «Chọn người theo hầu» | owner OD 18/11 ~19:45Z (4): her FIRST departure of a day asks who follows (j95s, once a day; nobody free → no card). Test written before it. | STALE TEST |
| map-tap-go «blocked: reason toast» | toast «» | owner OD 18/11 ~22:10Z: every toast goes to kitNotice (top «!» box + #kntchip); srvToast is re-routed (jnotice). The game says «Đức Thọ cung: hết khắc trong ngày (đi 2 khắc)»; the test read the old #rtoast. | STALE TEST |
| map-portrait Fold / phone: cards 0, fitH | no 4 people cards above the map | owner OD:L1921 (18/11 ~21:40Z): on the phone/Fold map the cards / group bars are gone → two small rail buttons «Cung nhân» / «Chí tôn» + drop-down list (jk3 kgfRail/kgfDrop). The fitH formula also mixed page and map coordinates. | STALE TEST |
| map-portrait Fold / phone: hereIn false | her place not in the open view | **REAL BUG**: below Tần she lives in a chủ vị's phối điện (jres, OD 17/11 04:08Z) and the plan has no own spot for her (jres mapSpots drops «home»), but the plan marked her place only by `S.place===spot` → at home NO spot had `.here`, NO «ta ở đây» marker, no «Ta + N bóng» row, and mapFit could not centre on her (it left the map at its left end). | FIXED |
| (found while fixing) phone, random | her place off-screen 1 in 4 runs | mapFit's scroll key was `S.place|zoom|size` = «home|…» for every housed life → a re-fit restored the stored scroll of ANOTHER palace. | FIXED |

### Fix (whole group = every plan view of her place)
- `jres.js` `mapHereK()`: her place on the plan = the chủ vị's palace spot when she is at home and housed, else `S.place` (ONE key).
- `j27.js` mapHTML reads it for the `.here` class, the «ta ở đây» marker (kitMeMapMark) and her «Ta + N bóng · còn K khắc» row (N = people in her own room); that spot is never greyed as «đang ở đây». Tap on that spot is unchanged (walks into the chủ vị's main hall, 1 khắc, as before).
- `j38.js` mapFit: the scroll key holds mapHereK (a new palace = a new open view). Centring / tag solver already read `.mspot.here` → now work for housed ranks.
- Courtyard level (jpm kpmMine) and the list view (mapHTMLgrid «Tẩm cung» tile) already marked her room — unchanged. jkcg home-road map is a separate map — unchanged.
- Tests brought to the owner rules (reasons written in each test header): map-tap-go (picker case + «Đi một mình» goes at once; picker skipped when nobody of hers is free; «no card» = no place/confirm/picker card, a buổi-turn event after the last walk is allowed; toasts read kitNoticeList / #kntchip; the place-entry line is not an arrival toast); map-portrait (no cards row / no group bars, the two rail buttons when their lists are non-empty, map bottom 6 px above the Ân sủng row, her `.here` = mapHereK in view).
- New scan `dev/test/map-here-scan.js` (law 11): every rank × {home, Ngự hoa viên} × size.

### Before / after (map-here-scan, ranks 0–7 × home/away)
| size | LIVE 0c0877a2 | branch c87a40e1 |
|---|---|---|
| Fold 755x1000 | **3 FAIL** (Đáp ứng / Thường tại / Quý nhân at home: no .here, 0 markers, map at left end) | 16/16 PASS |
| iPad 1180x820 | (same 3 by code path) | 16/16 PASS |
| iPad Pro 1366x1024 | — | 16/16 PASS |
| phone 390x844 | — | 16/16 PASS |

### Tests (branch c87a40e1)
- map-tap-go: fold / ipadAir / iphone14 **ALL OK** (LIVE: 3 FAIL each); stable on 2 more runs fold + ipadAir.
- map-portrait 755x1000, 412x1058, 390x844, 1180x820, 1366x1024: **5/5 PASS** (LIVE: Fold, Fold cover, phone FAIL); phone 6/6 runs PASS after the key fix.
- map-label-overlap Fold + iPad, ranks 0,2,3,5 × day/night × zoom 0–4 + courtyards: **100 cases, 0 overlaps**, max settle 1.5 s, 0 unsettled.
- map-labels-scan Fold + iPad ranks 2,3,5: PASS (+ courtyards); map-frame-kit Fold + iPad PASS; map-place-mask clean; map-labels-2 Fold + iPad: tap A ca sở → place card, 27 spots, 0 errors.
- **QUICKCHECK PASS** (eeaca5d0 = same game code as c87a40e1; 686 s: open 2.1 s, old save from LIVE loads + plays, render 239/247, tab 485/537, buổi 1749/1463 ms, core gates PASS).
- Looked at Fold 755x1000 + iPad 1180x820 (Thường tại at home, scratch shots not in git): Dực Khôn carries her marker + «Ta + 4 bóng · còn 4 khắc», every tag readable, no overlap, rail «2 Cung nhân / 3 Chí tôn» on Fold, column on iPad.
Note: do not run quickcheck and the browser tests at the same time on one box (quickcheck rebuilds the site in the worktree: the parallel run gave false fails, a clean re-run passed).

SẴN SÀNG KIỂM c87a40e16ddb2acef43d3a5f2619abe57fdd547b → MAIN 118.
~100% xong / ~95% chơi được cho lỗi này.

## RV MAP-FIX-2 (small reviewer, for MAIN 119) — PASS
PRIORITY #1 CHECK: OD 18/11 19:45Z (4), 18/11 22:10Z, OD:L1921 (all three exist, quoted in the test headers) | main LIVE fd85907a | review/map-fix-2 c87a40e1 | claims MAP-FIX-2 (done).
Merged origin/main fd85907a into c87a40e1 (only index.html/sw.js conflicted → theirs + rebuild) = **ac4790f0** → pushed `review/map-fix-2-r1`.
- 3 test updates: follow the cited owner rules; not weakened (picker case + «Đi một mình» + nobody-free case ADDED; toasts read kitNoticeList/#kntchip; portrait now asserts 0 cards/0 bars, rail buttons == kitStageRail need, her .here == mapHereK, fitH vs Ân sủng row).
- Real fix whole (law 11): jres mapHereK one key → j27 mapHTML (.here, marker, «Ta + N bóng», not greyed) + j38 fit key. map-here-scan 64/64 PASS (Fold, iPad, phone, ranks 0-7 × home/vuon).
- map-tap-go fold/ipadAir/iphone14: 0 FAIL. map-portrait 755x1000, 412x1058, 390x844, 1180x820, 1366x1024: 5/5. map-label-overlap Fold+iPad ranks 0,2,3,5: 100 cases, 0 overlaps. map-frame-kit Fold+iPad PASS.
- QUICKCHECK PASS (556 s: old save ok, core gates PASS, perf ≈ live). coop-e2e 142/142 (fold+ipad seats, no page errors).
- Looked at Fold 755x1000 + iPad 1180x820 as Thường tại at home: her palace carries the glow marker + «Ta + N bóng · còn 4 khắc», view centred on it, no overlap; rail Cung nhân/Chí tôn (Fold left rail, iPad top-right). KIT: no private parts.
LAND READY map-fix-2-r1 ac4790f0f24a8f5f198b03ae581f70075ee28a10
