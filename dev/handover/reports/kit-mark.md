# kit-mark — KIT KEEPER report (root74-kit-mark)
PRIORITY #1 CHECK: OD 20/11 ~07:15Z (owner OK) + C-AG #29 KIT REQUESTS | main: kitGameClock j79.js, kitCoopClock jcooptimer.js, mgPace jmgt.js | review/*: `review/mg-score-same` NOT on origin yet (no `mgLive` anywhere) | claims: this worker.

Branch `review/kit-mark` @ 1c134a6f (from origin/main 37e4a68f; build files rebuilt). No `mgLive` exists yet, so the chip reads `mgLive(kind)` when it exists and otherwise the graded shown score (`mgGrade`) — when mg-score-same lands, merge and the chip follows automatically (no code change here).

## What
- §13.9 `kitGameMark` (j79): ONE chip «n/10» (`.kgmk`, kit `.kchip.n`) in the game title line left of the clock; number only; pop (`.kgmk-pop`) only when it drops; hidden before «Sẵn sàng». Wired once in `kitGameSet` (all engines already report via env.hud → kg82Set), so all 31 kinds follow; `KG82.cur` = running env (set in j82 kg82Play, j92, jsgame). "–/10" = 0; "a/b" (Chải chuốt 2/3) = 10·a/b. PHẦN/HỒI/CÒN row stays hidden.
- Amber clock: `kitGameClock` → `.kchip.w` + `.kgclk-amber` once elapsed > `mgFast(env,kind)` × round length; `mgFast` (jmgt) is the `lev[kind].fast` window that `mgPace` itself now uses (ONE CORE). Kinds without `lev[kind].fast` never go amber; new round (left back to full) = normal. `kitCoopClock({tone})` added; co-op clock unchanged.
- KIT.md §13.9 + kit page sample «§13.9».

## Tests
- `node dev/test/kit-mark.js` (Fold 755x1000): KIT-MARK PASS, all 31 kinds (chip, graded value, pop on drop only, amber/normal clock, chip after end = graded last score). iPad 1180x820: also PASS (exit 0).
- oldsave-r1 (main build save → new build, 3 viewports): 16/16. No save field touched.
- mg-ready-guide (Fold): PASS 9/9.
- Shots LOOKED (Fold + iPad, normal + amber, Cờ «Ăn quân»): chip 5/10 + dark-dot clock; chip 2/10 + gold clock. Shots kept in session scratch, not in git/CDN.

## Notes for main / mg-score-same
- `kim` (Khéo tay): `lev.kim.fast=[0,0]` = window 0, so its clock is amber from the first tick — data-true; if undesirable change BAL.mgTier.lev.kim.fast (numbers family).
- After mg-score-same lands, re-run kit-mark: the "chip = graded last score" assert becomes "chip = mgLive" with no change to the kit.
- Not done (outside the brief): gold round pop when time-cut.
KIT READY kit-mark 1c134a6f

## RE-REVIEW round (LIVE dbddaed2 noword-kit merged) — branch review/kit-mark @ 372e2a18
- Merged origin/main dbddaed2 (mg-score-same 892e5bb0 + mg-back + noword-kit). Hand-merged: kitGameClock keeps the amber body (window only when mgFast > 0, tone w/n) AND the number-only `.replace(/Còn\s*/,"").replace(/\s*giây/,"")` (owner 20/11 ~05:10Z); j82 kg82Play / j92 / jsgame env lines take main's version + `KG82.cur=`; KIT §13.9 on main is now «Quay lại» (mg-back), so this part is renumbered KIT §13.10 (+ kit page sample «§13.10»).
- Chip reads the HUD mark only (already graded by mgLive) — no second grading (the Cờ 8 → 5 double-grade is gone).
- Tests (all on 372e2a18): kit-mark PASS Fold 755x1000 + iPad 1180x820 (31 kinds); mg-ready-guide 9/9; mg-noword-kit PASS 31 kinds 0 words (the chip is digits only); mg-score-same-scan 35 cells via the ONE grade, 0 raw; QUICKCHECK PASS 232 s (core gates PASS, old save ok, perf render 244/236, tab 571/483, buổi 1845/1592, tasks>200ms 23/22). golive.sh not run (auto-mode refused; quickcheck.sh is its check).
- Shots: not retaken after this merge (code identical for the chip/clock; the earlier Fold/iPad shots stand).
