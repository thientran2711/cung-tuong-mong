# review/j59-fix-r1 (reviewer)
- Merged origin/review/j59-fix da15718ce onto origin/main f53bdade0 (only sw.js/index.html/assets.json generated conflicts; rebuilt).
- Next: run stage-slots, small-bugs-2.js, rank-title.js, month-cal.js, ts-oldsave.js; shots 1-5 people at 844x390 etc; check painting at 844x390.
- 21:41Z pushed merge c8867715d (fix J59SWMIN present in built index.html). Verified so far: merge clean, build OK. Running stage-slots 844x390 (n1,n2,n3,n5,ksp) now.
- LEFT: small-bugs-2.js, rank-title.js (844x390 + 755x1000), month-cal.js, ts-oldsave.js, shots 1-5 people at 844x390/1000x755/755x1000@2/1180x820, painting-at-844 check.
- Local helper files (not committed): _main.html = origin/main index.html for old-save tests; own server PID in .srv.pid.

## session-8 reviewer (continued)
- Re-merged origin/main f012058f3 (generated-file conflicts only; rebuilt; j59.js diff vs main = the fix only). Result commit pushed.
- stage-slots (with a harness copy that skips the first-open loader and waits 15 s for figure art) direct 844x390, merged build: n1 2 slots; n2/n3/n5/ksp 1 per page + page chips; 0 checks failed, 0 page errors, old save from main loads (month 4). Main at 844x390: slots 77.6/122.8 apart, 5 tag overlaps + chips covering tags (regression reproduced, fixed here).
- Scene painting at 844x390: present in every shot (Ngự hoa viên, Kính sự phòng).
- NOTE: the live site at 844x390 runs the design canvas (rot.js host, frame 1180x820 scaled 0.4756); only direct mode (tests, ?khost=0) lays out at 844 px. At 1180x820 branch == main (same slots in every laid-out case); the fix only acts when a slot < 68 px.
- rank-title.js 844x390 + 755x1000@2: bad [] in day/night/rain/cold/dp/kit, no errors. small-bugs-2.js 844x390: road/met/game empty, portrait checks only "nw 0" (CDN images not yet loaded on the slow test line; not touched by this branch).
- 755x1000@2 / 1000x755 / 1366x1024@2 stage-slots: laid-out cases clean; runs before figure art arrives show the pre-layout stage on both main and branch (env/network, pre-existing).
- 390x844: host mode loads; rotate tip unchanged (rot.js not touched).
