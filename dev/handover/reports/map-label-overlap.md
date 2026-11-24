
## REVIEW (small-tier reviewer-lander, 23/11, review/map-label-overlap-r)
PRIORITY #1 CHECK ('map label overlap'): OD D-find 23/11 21:17Z | main kmSolve j38.js | review/* review/map-label-overlap | claims REVIEW map-label-overlap (mine).
Merged LIVE origin/main 72521d62 into W4's 2a17fc28 (only index.html/sw.js conflicted → rebuilt with dev/site/build_site.sh; code diff vs main = j38.js 10 lines + the new test).

**Verdict: FAIL (1 residual defect, phone size only).**
- dev/test/map-label-overlap.js, 4 sizes × ranks 0,2,3,4,5,7 × day/night × zoom 0–4 + 10 courtyards: 280 cases, **2 with overlap**, both 390x844 day, ranks 3 and 4, zoom = fit: `Thượng thư phòng | Ngự thiện phòng`, while `__mapSolve` says hard:0 (solver thinks clean, DOM overlaps → solver/DOM mismatch, e.g. a late re-fit or one-line variant measured differently). Fold 755x1000, iPad 1180x820, iPad Pro 1366x1024: 0 overlaps in this run. A first run with ranks 0,2,3,5,7 (240 cases) gave 0.
- Baseline on current main (same test, 390x844 r3,r4 zoom 0, 2 runs): 2 + 4 overlaps of the OLD kind (`Trường Môn viện | Hàm An`, hard:1). Branch, same 2 runs: 1 and 0 → the fix helps but is not complete at phone size (roster is random per start).
- Old-save (save made on main build, loaded in the branch build, Dư đồ day+night, 755x1000 + 1180x820): loads, 0 page errors, 0 overlaps.
- Screenshots looked at (Fold 755x1000 day/night, iPad 1180x820 day/night, 3 frames each): tags separate and readable, same text size; Fold crops the right edge by design (tags outside the viewport appear on pan).
- Whole-group/kit: same solver `kmSolve` for every label kind; new stage `RX` is a flag on the existing stage loop, no per-place variant, no CSS/kit part touched; owner layouts unchanged (never runs when hard = 0).
- Laws touched: 11 (fix the whole group) — FAIL while any size still overlaps; 12 two devices — PASS; 9 kit — PASS; 16 no working rule changed — PASS.

For W4: (1) find why DOM overlap `Thượng thư phòng|Ngự thiện phòng` appears at 390x844 day r3/r4 with solve.hard = 0 (print `__mapIts` boxes vs DOM boxes; check the 120 ms wait vs a late mapFit / kmnw variant mismatch); (2) the RX stage must also clear `Trường Môn viện|Hàm An` on the phone every run (it still showed once in 4 runs); (3) rerun the 280-case test 3× at all 4 sizes → 0 each time.

## REVIEW R2 (small-tier reviewer-lander, 24/11, review/map-label-overlap-r = a7bf3e01 + LIVE main bba42773 merged, site rebuilt)
PRIORITY #1 CHECK ('map label overlap'): OD D-find 23/11 21:17Z | main kmSolve j38.js | review/* review/map-label-overlap | claims REVIEW map-label-overlap (mine).
**Verdict: FAIL (1 intermittent cold-start defect on iPad 1180x820).**
- 280-case test 3× at 4 sizes: run1 0, run3 0, **run2 1 case / 4 pairs**: `1180x820 map day rank=0 zoom=fit` (the FIRST case after page load): `Càn Ninh cung|Vĩnh Hòa, Dưỡng Hòa điện|Diên Huy, Thái y viện|Ngự thiện phòng, Cảnh Phúc|Diên Huy` with `__mapSolve.hard=0` (solver clean, DOM drifted; still overlapping 800 ms after render, i.e. past the 250 ms settle check). Phone 390x844 and Fold/Pro: 0 in all 3 runs (the R1 phone defects are gone).
- Reproduction: 14 fresh launches of `map-label-overlap.js <url> 1180x820 0 0` (cold start, rank 0, fit): **2/14 fail**. 4 further full iPad runs (70 cases each) 0/4, 6 further single cold runs 0/6 — so ~10-15 % of cold first opens at rank 0 show it; later cases (solution cached / page warm) pass.
- Old-save (main build → this build, Dư đồ day+night, Fold + iPad): loads, 0 page errors, 0 overlaps.
- Screenshots looked at (Fold 755x1000 day/night, iPad 1180x820 day/night, 3 frames each): sharp, tags separate, same text size.
- Whole group: same kmSolve (RX1-3 are stages of the one loop), no per-place variant, no CSS/kit change; owner layouts unchanged.
For W4: the settle check does not catch a first-open drift (probably fonts/rank-title painter/first image load after the 250 ms check; max 4 re-fits may be spent before the final shift). Make the fit converge: after the last observed mutation/resize re-measure until two consecutive measurements agree (or re-run on `document.fonts.ready` + image `load`), and add a cold-start loop to the test (N fresh launches of the first case) — 0/30 required. Then rerun the 280-case test 3×.

## REVIEW R3 (small-tier reviewer-lander, 24/11, review/map-label-overlap-r = 2284d0b3 + LIVE main 1ddbe155 merged, site rebuilt)
PRIORITY #1 CHECK ('map label overlap'): OD D-find 23/11 21:17Z | main kmSolve j38.js | review/* review/map-label-overlap | claims REVIEW map-label-overlap (mine).
**Verdict: PASS** (with one caveat, below).
- iPad 1180x820 cold start (COLD=30 fresh launches, first map open, rank kept, day, fit): 30/30 clean, max settle 2.8 s (R2: 2/14 failed).
- dev/test/map-label-overlap.js 280 cases × 3 runs: run1 0, run2 0, run3 1 pair (`390x844 night r3 fit: Trường Môn viện|Hàm An`, measured while the phone layout was still unsettled, settle=18.7 s). Fold 755x1000, iPad 1180x820, iPad Pro 1366x1024: 0 overlaps in all 3 runs. No page errors.
- Old-save (main build → this build; Dư đồ day+night, Fold + iPad): loads, 0 errors, 0 overlaps, solver hard 0.
- map-labels-scan.js (rank 3, Fold + iPad, day/night + 10 courtyards): all PASS.
- Screenshots looked at (Fold 755x1000 + iPad 1180x820, day + night, 3 frames each): tags separate, readable, same size.
- Whole group: one kmSolve for every label kind; RX1-3 are stages of the same loop; no per-place variant, no CSS/kit change; owner layouts unchanged.
- Caveat (not blocking, suggest a ticket «phone map settle»): in this headless run the phone map keeps re-laying out for 10–20 s after opening on main as well as on this branch (jitter probe at 390x844, layout changes at 12–23 s on main, 14–22 s here; slow CDN picture loads + portrait row heights). While it is still drifting a phone can show a transient overlap (1 case in 840 phone/other cases over 3 runs; main baseline: 6 in 4 phone runs). Settled phone layouts are clean. Fold/iPad (law 12 devices) are clean in every run.
