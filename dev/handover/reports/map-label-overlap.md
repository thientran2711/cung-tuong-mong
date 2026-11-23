
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
