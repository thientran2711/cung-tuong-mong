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
