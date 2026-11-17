# PROGRESS tut-followups (worker, review/tut-followups, base review/tut-quests-r1 66f598de)
Follow-ups of dev/handover/reports/review-tut-quests-r1.md. Report: dev/handover/reports/tut-followups.md (handover branch).
1. bd had no chapter 1–3: jorigins (registers bd) loads AFTER j67, whose wrap of every STORY slot into the chapter frame ran before
   STORY.bd existed -> a67init never ran for bd (v1 story, no f14, no quests). Fix: j67 wrap is now story67Wrap(k) (+ story67Acts(k)),
   idempotent; jorigins calls story67Wrap("bd"). bd = consort variant (same quests as nc/tt). Old bd saves keep their v1 story.
2. Typed ✓/✗ step lists -> kit §46 kitChecks: j67 card67 + rows67 «Các bước» (both copies) via steps67(); card67 puts a checks row in
   its own kit section; jroute Tư tình / Trốn khỏi cung ladders via kitChecks; dead helper in j6 removed.
   KIT REQUEST: j72 Việc nhờ step list has 3 states (done ✓ / now ▸ / next ·) -> needs a generic kit step list (generalise §69.3 kitCoopSteps).
3. Found while shooting: j42 srvRoadHTML printed the raw srvRows array (since srvRows became kit rows) on the cung nữ «Thân phận» tab
   (pre-existing on main) -> kitRows(srvRows()).
Tests: dev/test/tut-origins-scan.js, dev/test/tut-followups.js, tut-quests.js (TQ_ORIGIN=bd), dev/measure/typed-checks-scan.py.
