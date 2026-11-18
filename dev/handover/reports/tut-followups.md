# tut-followups (worker, opus) — SẴN SÀNG KIỂM

Branch `review/tut-followups` @ aa391edf7823c4646f174d9c045a3ce329f7ed00 (base review/tut-quests-r1 66f598de, PASS, not yet on main). Site rebuilt.
Rules read: PREAMBLE, START_CORE, START_WORKER, topic story-roads (tutorial/origin lines), OD:L1447 CO-OP FIRST, OD:L1477 priority ch 1–3/4.
Inputs: dev/handover/reports/review-tut-quests-r1.md, tut-quests.md, ROAD_MAP (bd = branch of nc, consort).

## 1. Origin bd had no tutorial chapter (fixed)
Cause: jorigins.js (registers bd + STORY.bd) is assembled AFTER j67.js; j67 wraps every STORY slot into the chapter frame at load
(Object.keys(STORY).forEach) — STORY.bd did not exist yet, so a new bd life ran the old v1 init (no S.st.f14, no chapter 1–3, no quests).
Fix (one source, no copy): j67 wrap is now `story67Wrap(k)` (+ `story67Acts(k)`), idempotent; jorigins calls `story67Wrap("bd")`.
bd gets the consort variant (same as nc/tt). Old bd saves (v1) keep their old story (wrapper returns the old slot when !v267()).
Scan `dev/test/tut-origins-scan.js` (new life per origin):
| origin | before (66f598de) | after |
|---|---|---|
| tt dtq muoi cn nc td ch thd | wrapped, f14, ch1 nhap14, quests an,di,trang (c) | same |
| cnv | f14, ch1 nhap14, quests hau,le,di (s) | same |
| **bd** | NOT wrapped, no frame, no ch1, no quests | wrapped, f14, ch1 nhap14, an,di,trang (c) |
Result: before 9/10, after 10/10, 0 page errors.

## 2. Typed ✓/✗ step/check lists -> kit §46 kitChecks (whole family)
Scan `dev/measure/typed-checks-scan.py` (every ✓✗✔✘ in dev/build/j*.js, classed KIT / KITPATH / COMMENT / OTHER / KITREQ / HAND):
| place | before | after |
|---|---|---|
| j67 msStart67 chapter card (card67 «Các bước», 2 copies l.86/1779) | typed "✓ x<br>" | `steps67()` = kitChecks; card67 puts it in its own kit section |
| j67 panel67 Mệnh truyện rows67 «Các bước» (2 copies l.210/1813; live on the cung nữ road tab) | typed | kitChecks in the kit row |
| jroute rtStoryHTML Tư tình / Trốn khỏi cung ladders | typed | kitChecks |
| j6 old story tab helper `c()` | typed (dead, never called) | removed |
| j72 Việc nhờ steps (✓ done / ▸ now / · next) | hand list | **KIT REQUEST** (below), untouched |
| jmcal, jchap, jgoal, jtq14, jreign | kitChecks already | — |
| j63/jfx/jk3/j99succ (act-card «Cần» chips via data-kneed/.kwhy), jcooptimer §69 kitCoopSteps, j79 kit parts, glyphs (jload/jstatus), j91 canvas | kit / kit path / not a list | — |
HAND count: before 6, after 0.
**KIT REQUEST:** a generic 3-state step list (done / now / next) for j72 Việc nhờ steps — kitChecks has only met/unmet; §69.3 kitCoopSteps
already draws exactly that for co-op → generalise it (e.g. kitSteps([[state,text,value]])) in the kit, then j72 switches.

## 3. Found while shooting (pre-existing on main 08725411, fixed, same group "kit rows")
Cung nữ «Thân phận» tab (j42 srvRoadHTML) printed the raw srvRows array ("Thân phận,Cung nữ của…,tCông lao,0/10…,t") since srvRows became
kit rows (§51) → `kitRows(srvRows())`. Checked on origin/main build: same raw text there.

## Tests (this build)
| test | result |
|---|---|
| tut-origins-scan.js | 10/10 origins start ch1 + quests |
| tut-quests.js (tt) | 35/35 PASS, 0 page errors (no shots dir → 35 checks) |
| tut-quests.js TQ_ORIGIN=bd (bd plays ch 1–3 by tapping, ch4 = a bd road; new check "chapter 4 is the road of HER origin") | 35/35 PASS |
| tut-followups.js (new): old bd save from 66f598de loads, keeps v1 story, 3 months pass; chapter card + Mệnh truyện «Các bước» = kitChecks, no typed marks, no h-overflow (1180x820, 755x1000@2, 1180x820@2); cung nữ tab no raw array | all PASS, 0 page errors |
| story14-frame.js (MAIN = origin/main 08725411) | 27/27 PASS |
| story14-view.js 755x1000 + 1180x820 | PASS |
| coop-e2e.js (live Worker) | 59/59 PASS (first run 57/59: 2 reborn-friend steps "A sees the reborn friend by her new name" / "Người lạ" — not reproduced on re-run, nothing in this branch touches co-op rebirth → flaky) |
| typed-checks-scan.py | HAND 0 |
Shots looked at (scratch only, not uploaded): chapter card Fold 755x1000@2, Mệnh truyện tab iPad 1180x820@2, cung nữ tab Fold + iPad @2 before/after.

## Notes
- tutorial.js replay crash and the flaky tm96c fast-bot stall (reviewer notes) not touched.
- START_CTX ~3 %; finished well under the rollover ceiling. Worktrees deleted after push.
