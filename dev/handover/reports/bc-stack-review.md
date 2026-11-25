# REVIEW + STACK LAND bc-stack-r 5c062a05 — BIG REVIEWER #4 (session_01UV1Szh4xkQ1qFN3jffTKyr), 25/11
PRIORITY #1 CHECK ('button-crawl-fix-4|fix-1-r2|press-keep|kfCls|pcPort rk|toilrdy giveUp'): F #10 orders 10:44Z + 10:55Z | review/button-crawl-fix-4 b3605b12, review/button-crawl-fix-1-r2 9259f352, review/button-crawl-fix-3 6b401cfc, review/robot-realtap-r2 5e504d79 | reports button-crawl.md, button-crawl-fix-3-review.md, robot-realtap-review.md.

## VERDICT: PASS — ONE land sha review/bc-stack-r 5c062a05 (fast-forward of LIVE origin/main 9f72524b, checked on origin; index.html/sw.js rebuilt by dev/site/build_site.sh)
Stack = fix-3 6b401cfc + robot-realtap 93812531 (as r2 5e504d79) + fix-4 b3605b12 + fix-1-r2 9259f352.
Overlap: fix-3 (j59/jrail), fix-4 (jfx/jopic/jlag2/j57/jseal), fix-1-r2 (j15/jtoil) touch different build files — no code overlap. Conflicts only in generated index.html/sw.js (rebuilt), dev/test/realtap.js add/add (kept the newest robot-realtap 93812531 version; same API make/tap/stats; button-crawl.js adapter and press-keep.js use only make/tap) and quickcheck.d/README.md (kept both rows 90 + 93).

## fix-4 (priority: real player stuck on iPad «Tuyển chọn»)
- Code: kfCls(el) = className without the transient press class .kfdown; every «changed?» signature (jopic kitOptSig / kitOptTierSig, jlag2 kaNorm1 sig, j57 tabsFit) reads it, so a press no longer rebuilds the option card under the finger; kitOptTierSig uses offsetHeight (press scale is not a size change). jseal: classList.remove only when the class is there (the remove of an absent class still wrote the attribute → own observer loop). Family scan: remaining className signatures (jk3 stage, j57 container) are not press targets.
- press-keep.js: LIVE 9f72524b FAIL 5 (Fold row covered by #klife at start, «Tuyển chọn» «Cúi đầu chờ xét» node left the page during the press Fold+iPad, idle dialog 12/6 writes) → stack PASS (2/2 runs alone). One run under 4 parallel browsers showed 2 idle kseal writes on Fold (data-c/data-sz from the 400/1200 ms later() pass slipping into the 2 s window = CPU load); not reproduced alone.
## fix-1-r2
- pcPort reads f.rk as text (number rk from the jk2b small-frame wrap threw «f.rk.split is not a function» on a Hậu cung person tap); only pcPort used .rk.split/.slice. Toilette rules ✕ «Quay lại» now takes the mirror's own lose path (KG82.giveUp → KG82.quit) like the other kg82 games (j82/jroute/jsgame already do). KIT REQUEST K-KDTX-BAND filed (not styled by hand) + known-row in button-crawl-known.txt.
- button-crawl.js --fast (Fold, real taps): LIVE 9f72524b GATE FAIL 1 («Chưa điểm trang» → Điểm trang ✕ «Quay lại» did not close its layer) → stack GATE PASS 0 sure faults (1 soft «no effect» row, not gating).
## Whole stack, real taps (built index.html)
toil-overlay Fold+iPad rc 0 (33 checks, 0 bad, 0 DEAD / 27 taps) · toilette Fold+iPad rc 0 · hoa-dien Fold+iPad rc 0 · care-oldsave (LIVE save → stack) ok, 0/0 errors · robot-rt slices Fold 37 taps / iPad 26 taps, 0 dead, 0 stuck, 0 bugs.
Laws: kit (no new parts; K-KDTX-BAND requested from the kit keeper), wording unchanged, no numbers, whole family checked per fix. Shots: scratch only, deleted; none in git.
Supersedes for landing: fix-3 6b401cfc and robot-realtap-r2 5e504d79 are both inside 5c062a05 (land 5c062a05 alone).

## UPDATE 25/11 ~11:50Z — harness 93812531..95718760 merged: NEW LAND SHA review/bc-stack-r 893c42f8 (FF on LIVE 9f72524b; test files only, no rebuild)
PRIORITY #1 CHECK ('robot-realtap 95718760|mgGiveUp|moment log|softlock'): F #10 order 11:22Z | review/robot-realtap 95718760 | dev/PROGRESS_robot-realtap.md (HARNESS FIXER #4 batch).
VERDICT: PASS. Code read: mini-game back ✕ never a move outside the result phase, «Bỏ cuộc?» → «Chơi tiếp», give-up only after 6 min (logged as harness bug, never exitPick); moment log; softlock detector (#next disabled with Q/S.mg, no dialog) → game bug + same-save reload; co-op lobby never leaves the room, both seats rejoin; still 0 .click(/dispatchEvent in play (only page.mouse.click / touchscreen.tap at hit-checked points). robot-rt-coop.js node --check OK.
Self-test on the stack (real taps, slice 6 buổi): Fold 53 taps · iPad 73 taps — 0 dead, 0 stuck, 0 bugs, jsClicks 0, cap none, exitPick none; one mini-game screen per run, no «Bỏ cuộc»; moment logs written. Land 893c42f8 alone (supersedes 5c062a05).

## UPDATE 25/11 ~12:20Z — perfgate-days fbc8ef90 PASS, stacked: NEW LAND SHA review/bc-stack-r b6560234 (FF on LIVE 9f72524b; tools only, no rebuild)
PRIORITY #1 CHECK ('perfgate dayLife|S.selx2|MAIN 130'): F #10 order 11:36Z | review/perfgate-days fbc8ef90, review/selection-scene-rv18 30d9d044 (fixer's day-life check) | dev/PROGRESS_robot-realtap.md (fixer #2/#3 perfgate notes).
- Code read: perfgate.json dayLife {flag S.selx2, ceilings longTasks200 72} (MAIN 130 ruling); quickcheck.js marks a run «day» when the flag is true, judges day runs alone vs the day ceilings, medians + live gate from non-day runs (all runs when every run is a day life; then the day-ceiling keys skip the normal ceiling/live gate). LIVE has no S.selx2 → old runs never «day». Nit (not blocking): in a mixed set the day runs are judged only on the dayLife keys, not on the other ceilings.
- perfgate-days alone vs LIVE: quickcheck --runs 2 PASS (no day lives on main; tasks>200 32/32).
- Whole stack b6560234 vs LIVE: --runs 2 once FAIL «longTaskMaxMs 4354 vs live 2635 (limit 4216)» (single-run max; LIVE itself measured 5394 in the earlier run = noise) → --runs 3 twice: PASS, PASS (render 273/284, 294/343 ms; tasks>200 28/27, 25/29; old save ok).
Land b6560234 alone (supersedes 893c42f8 / 5c062a05).
