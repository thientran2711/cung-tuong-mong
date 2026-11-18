# REVIEW emo-seal-vanish — PASS 22891730
PRIORITY #1 CHECK: brief briefs/emo-seal-vanish.md + report reports/emo-seal-vanish.md read; OD 18/11 05:50Z bug line read; review/* none overlapping; claims row MAIN.
Reviewed review/emo-seal-vanish 631ad03. It was NOT a fast-forward of live main (550dd1b); only index.html/sw.js conflicted (generated). I merged main, rebuilt with build_site.sh, pushed review/emo-seal-vanish-r6 = 22891730 (ancestor: origin/main 550dd1b, so FF-able).
## Checks
- Own repro (room stage, Hành sự tab, real #tokens .tok.fig seals, tap seal -> kitModalClose, also reopen + Esc): MAIN 550dd1b FAILS at Fold 755x1000@1 and iPad 1180x820@2 (maid seal gone, 4 mismatches). FIX passes 0 fails at 755x1000@1/@2, 1180x820@2, 1366x1024@2, 390x844@2.
- Place stage with 4 rival seals (1180x820@2) + 755x1000@2: every seal tapped, count same after close, 0 fails.
- emo-seal-persist.js at 755x1000@2: 0 fails (room 5/5, place 7/7, event 8/8).
- Box now shows the maid's real name (was "???"); code: k61StageDesc used in kOf61/k61St/k61PortEnt only, no layout/CSS change, one-core guard PASS.
- quickcheck PASS (core gates, time-spill, open 1277 ms, old save ok, perf 143/144 render). Page errors: none from my repro; pre-existing "f.rk.split is not a function" only in kitPopSample('event') (also on main, not this change).
## Non-blocking notes
1. emo-seal-persist.js "room" run uses goTo('home'), whose screenshot is an empty stage; its 5 counted seals are card/rail seals, not stage seals. The real stage proof is my repro (above). Suggest the worker later point it at the Hành sự tab (#tokens .tok.fig).
2. The maid's mood box shows a grey silhouette instead of her figure (descriptor has no portrait); same on main, not caused by this fix.
3. Elder/serv/npc descriptors show no seal (no emotion data) on main and fix alike.
Shots: scratch only, none uploaded to CDN (nothing to wipe).
