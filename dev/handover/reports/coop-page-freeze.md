# coop-page-freeze — investigator report (B, opus, session_01N1tNP4fU4zVDRjW98oN6EC, depth 6, START_CTX ~5 %)
PRIORITY #1 CHECK: as brief b-coop-page-freeze.md (OD 2 kfoc | ledger 0 | claims 1 unrelated | main 15 kfoc code | review/* 0) — no other worker on this; reused dev/test/lib/device.js, coop-e2e.js helpers, the real harness 5edf09f6 + shared patch #13.

## VERDICT (25/11 ~23:30Z): NOT REPRODUCED — cause NOT proven; NO game fix written (no failing test possible without a repro).
What is proven:
1. Not a harness-made loop: SEATHANG = no R.steps for 5 min AND a 5 s `page.evaluate` got no answer. A harness re-tapping forever cannot block page.evaluate; every in-page harness loop (realtap.js wheel / focus scroll, robot-rt.js layerOf / clip) is bounded. So the page's main thread (or its renderer) was really stuck.
2. Not the kfoc flow by itself: jdfv dfTap / F.intro / F.play / dfGame (jdfg) / kfoc-x back have no unbounded loop; dfGame.destroy cancels its rAF and removes its canvas. Repro: solo iPad 1180x820 15x and a live co-op room (Fold host / iPad guest) 8x «Nghe ngóng chung → Sẵn sàng → Quay lại» on 512cfee6 rebuilt: no hang, no error.
3. Not a long-run memory blow-up (F s6d family) in these two cases: KJ2Z (U3b-2, seed 15, HOST iPad) hung at buổi 15 after ~12 min — last trace «Lui» on a .dlg whose title shows raw HTML («<span data-k61skip=…» — separate wording bug). Q4XY hung at buổi 54 after a tap on the kfoc act. Different screens; the only common factor: the iPad seat (1180x820, harness iPad = mouse pointer, no touch).
4. Q4XY watchdog stage 1 reload did not bring the seat back (2nd SEATHANG 330 s later, still «evaluate hung»); KJ2Z: SEATHANG stage 1 twice (1025 s, 1355 s) then stage 2 → page closed. A reload that does not free the page points to a wedged renderer/GPU (swiftshader) or a loop that restarts on load — cannot tell without a stack.
5. Own long repro: real harness 5edf09f6 + #13 (19535bcd), seed 54, Fold host / iPad guest, 512cfee6 rebuilt, with a CDP hang-grabber: 60 min, buổi 27, JS heap 65–150 MB, renderer RSS 0.75–1.5 GB, NO page hang (only the known «host on #title» and #coopfz stuck families, harness unstuck them).

## SIDE FINDING (affects every B runner)
review/robot-coop-stack-u3 512cfee6: the COMMITTED index.html is stale (built at c4163a93; grep kfoc-introgo = 0, no «Luật chơi» intro). U3c / U3b-2 serve a rebuilt site, so their runs are fine; a runner serving the committed file as-is plays an older game. Told U1c + ROOT 2.

## HARNESS FIX PROPOSAL (for U1c, the one patch editor) — dev/handover/robot/realtap-hanggrab-on-p13.diff (sha256 76610f3b, on top of patch #13)
robot-rt-coop.js seat loop: (a) a CDP session opened at seat start; (b) every 60 s a line in <out>/hangcap-<seat>.txt: buổi, steps, JS heap (Runtime.getHeapUsage), renderer + GPU process RSS/CPU (ps); (c) a probe every 30 s: page.evaluate(()=>1) with 15 s; 2 misses in a row → grab; (d) at SEATHANG with «evaluate hung» → grab BEFORE the reload. grab = Debugger.enable + Debugger.pause → top 40 frames + source text around the top 6, a 2nd pause 3 s later (same loop?) — «PAUSE TIMED OUT» = no JS frame reachable = renderer/GPU wedge, not a game loop. Cost: ~0 when healthy (one ps + one CDP call per minute). Self-tested 60 min on 2 seats: no false grab.
With it, the NEXT real freeze tells: game loop (file:line in the assembled page → dev/build/j*.js) vs renderer stall vs GC thrash (heap near limit). Ask every B runner to put it on and to push hangcap-*.txt with the dump.

## NEXT (if ROOT 2 wants more): iPad-HOST room on the grabber (KJ2Z shape, seed 15), 2 rooms max per 4-core box.
## STATUS: ~60 % done (cause class narrowed, capture tool ready) / game playable unaffected by this report.
