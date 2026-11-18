# PROGRESS review/act-split-w2-r1 (reviewer, opus, Foreman D s3)
Reviewed: origin/review/act-split-w2 @ 30c0931d42fa75ce27f0005e3415c85ecbabf07a, merged onto origin/main 399483e3.
START_CTX ~5 % (get_session read 0; own estimate). Result: PASS (sha in dev/handover/reports/review-act-split-w2-r1.md).

## Merge
- Conflicts: dev/build/assemble.py (file list), index.html, sw.js. Took main's list + 'jact2.js' after 'jact.js'; rebuilt assemble.py + build_site.sh.
- jact.js / jbal2.js auto-merged; diff vs main = only the worker's changes (jact.js first slots + hooks, BAL.ad, jact2.js new).

## Tests (merged build, one at a time)
- act-split-w2.js 755x1000@2: 0 FAIL; 1180x820@2: 0 FAIL (stroll "!" 8 -> 27..30 in 300 buoi, always slot 1, max 2; old save loads; 0 page errors).
- act-split-scan.js: DUP_AFTER 0 (31 -> 0), every festival 2 -> 1 dialog at day start (+1 at its place), errs 0.
- act-split-vp.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 412x1058 (rotate), 1024x768@2, 390x844 rotate: FAIL 0, no h-scroll, 0 page errors. Shots looked at.
- panel-size.js 5 viewports: exit 0. coop-e2e.js: 59/59.

## Checks
- Kit: only kitHapMark / kit dialogs / kit option rows / tsOpt; no private CSS. OK.
- Whole family: 12 festivals with light acts -> one place each (thu/vuon/tn/cnh); Thất tịch + Vạn thọ have only j71 (no light act). No other festival dialog home found (grep festToday in all j*.js: only context reads). OK.
- Gain + loss: night sneak +BAL.ad.nightSneak odds / BAL.ad.nightCaught Danh, printed from BAL. Cầu con keeps the card's Bạc -10. Watch option = no gain, no loss. OK.
- VANPHONG: no %, odds words from the ladder. OK.
- Animation-ends-with-button (OD L1261): no animation scene touched.
- Co-op: festival + cold-palace "!" are deterministic from shared world state (same for both); random slots incl. the stroll stay a personal roll per player (wave-1 design on main, unchanged). Noted in report.
- A small wording fix tried by the reviewer (sneak line brackets) garbled the kit row split on " · " -> reverted; worker text kept.
