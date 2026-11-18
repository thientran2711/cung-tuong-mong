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

## HANDOVER (worker rollover, context ceiling; coordinator opens the successor)
START_CTX unknown; rolled over at ceiling. Branch review/errand-scene @ d1da71f = OLD blocking scene (void per OD 20:10Z). Successor TODO (ROOT-55 order 20:04Z):
1. Non-blocking redesign: tap = time moves at once; runner walks off in background, slot «đi dò la»; at due khắc walks back + kit «!» chip, tap = report. Remove RB hold / resultShow defer / shield from jerr.js; keep errWord, errAway, gate list, clone walk layer, scan script.
2. ONE state "person away until khắc K" + adapter fn (swap to Foreman D's review/parallel-time, worker session_01964izEDFWH8uK569yeSGJt, when ready).
3. Whole group per OD 20:20Z: every ask/send-another-person button (nhờ vả, hand gifts, messages, invitations, spying, eunuch buying); scan table act × walk-off/on × chip.
4. Runner always drawn when stage crowded "+N": one kit rule with stage-here worker session_01Rc5AsK9y5NbRATifWtFqG7.
5. Cover jht htAct (expose it); fix Fold skip failure with a FIXED seed (test picks random life); quickcheck + old save; merge main 13bb8c88; Fold+iPad shots looked. Report to ROOT-55 session_01Rc5AsNFnALGujUFYDSjs4g.
Tips: local server `python3 -m http.server` in worktree after `bash dev/site/build_site.sh`; test boot pattern in dev/test/errand-scene.js (remove #klife cover, OPT.fxon=true); never commit index.html/sw.js.

## r2 (sha cae6685 on review/errand-scene, main 13bb8c8 merged)
PRIORITY #1 CHECK: OD 18/11 20:05/20:10/20:15/20:20/21:15Z | main none | review/parallel-time be0d792 (jptime: PTIME/S.away, read via adapter) | claims errand-scene.
What: jerr.js rewritten NON-BLOCKING (no RB hold, no resultShow defer, no shield). Scene = picture of ONE state "person away until khắc K" through ONE adapter (errTasks/errAwayOf/errNews/errNow/errWhen): reads jptime (window.PTIME, S.away) when present, else same shape in S.erra (gates + landing on spend/nextBuoi + kit status icon «tin»). Walk-off at tap, slot chip «đang đi …» (kit chip), walk-back at due khắc, kit «!» chip on her, tap = kit status panel (no forced modal). Runner always drawn: kitErrandSpot + kitFigOf when her token is not in view (+N). BAL.errand {n:2,msWalk:650}. htAct exposed (jht.js) → "Dò hỏi gia thế" covered. Fixed bug: .kmfly (fixed 56x56) clipped the layer.
Tests: dev/test/errand-scene.js fixed seed, Fold 755x1000 38/38, iPad 1180x820 38/38 (time moves at once, no shield, one task, chip, landed, «!»/badge, tap opens panel, crowded runner drawn, reduced motion, old save, 40-act run, no page errors). Shots (LOOKED): /home/user/wt/errand-shots/{fold,ipad}/ — NOT on CDN (not uploaded; session-local).
Scan: errand-scan.js now 47 covered, 0 not covered (maid-road out of scope).
HONEST GAPS: (1) rumor act did not send in the fixed-seed life (needs a picker; not exercised by test); (2) quickcheck script is not in this tree — own tests only; (3) adapter's PTIME branch not run (parallel-time not in main): with it, fallback gates switch off (errOn) and my code only draws S.away rows by "me"; check after D lands; (4) stage-here worker session was inactive, could not message — kitErrandSpot documented in KIT §90; (5) fallback: result card still shows at once (as today); D's job makes it wait; (6) iPad crowded case: runner not in view → no slot chip, status icon 信 busy + red dot as «!».
HANDOVER: START_CTX ~4%, now ~25%; finishing. Nothing else pending.
