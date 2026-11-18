# errand-scene — report (sha d1da71f on review/errand-scene)
PRIORITY #1 CHECK: OD errand/dò la hits (20:05Z entry) | main: no walk-off motion existed (j93 has none) | review/*: none | claims: this row only.

## What
New last module `dev/build/jerr.js` (+ assemble.py entry, KIT §90, MOTION item 10). Time rule untouched. For every errand sent to a servant:
1. runner (bestSent, else her maid) walks OFF the stage to the left (clone of `.figimg`, real token hidden);
2. beat ~1 s: `renderHUD()` + `.pip` pulse (khắc ticks, bạc/stat floats show) + kit pill `kitLine` «đang đi dò la…» (`errWord`, ERRV table);
3. walks back ON; 4. report (render / showModal / resultShow) released.
~2.3 s, tap anywhere = skip, reduced motion/Gọn = pill beat only, bots/co-op/servant road = none. Action runs once (no double charge); report held via jrbatch `RB.d` + deferred `resultShow`. Ledger: `S.roster.P[id][khắc spent]=["ngoai","errand"…]` (law 6b).

## Scan (dev/test/errand-scan.js, table in shots/errand-scene/scan.md)
covered 46 (all ACT via runAct + scout, invite, h54Act thu, tdAct gift) · in-person/self-only 11 (ACT_NOSEND + spyk) · NOT covered 2: jht `htAct ask` (function IIFE-local; needs jht to expose it) and the maid-road (she is the servant; out of scope).

## Tests
`dev/test/errand-scene.js` (SLOW=16 for mid-scene frames). Verified: report card (#rtoast) hidden during scene and shown after; khắc charged once (used 0→2 spy, 0→1 scout/invite); ledger errand rows; tap-skip (live→false, RB.d=0); reduced motion = shield+pill, no layer; no page errors. Shots (Fold 755x1000, iPad 1180x820): shots/errand-scene/{spy,scout}-{1off,2beat,3on,4report}-*.jpg (frame timing drifts with screenshot latency).
NOT DONE / honest gaps: (a) quickcheck and old-save load not run; (b) Fold full run crashed at the skip step (no scene in that random life), iPad full run passed; (c) shots of the figure mid-walk are weak — clear evidence of walk (layer present, token hidden) is in the logs, frames mostly caught beat/end; (d) iPad frames show the runner was a eunuch not drawn (+9 chip) → pill beat only.

## Known limitation / decision for main
When the runner is not drawn on the stage (crowded stage "+N", or resting elsewhere) there is no figure to walk, so only the pill beat plays. Fix needs stage-here / j59 to always draw the runner (or main allows walking the on-stage maid instead — rejected by me: wrong name vs log, law 6b). Coordination: touched no stage background code; no merge with review/stage-here needed.
Not committed: index.html/sw.js (lander rebuilds).
