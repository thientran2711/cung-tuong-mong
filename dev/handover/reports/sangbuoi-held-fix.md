# sangbuoi-held-fix — «Sang buổi» never silently does nothing while cards wait unpainted (Robot M4)

PRIORITY #1 CHECK: OD flight-modal-deadlock rows (day-queue held card unpainted) | main dev/build/jdayq.js:77-78 (LIVE ee37ab5f/9f72524b) | review/tainghe-open-fix(-rv) f8cb11b2 (jflip busy() only, base of this branch) | claims: TAINGHE-OPEN-FIX session_01V1ZZH4uyCCyRueugyGEVwf handed it over; rv 2yv2CZAt analyses (M4 dumps) folded in.

Branch `review/sangbuoi-held-fix`, based on f8cb11b2 (review/tainghe-open-fix-rv = tainghe fix on LIVE ee37ab5f). Tier BIG (time/buổi).

## 1. The bug (Robot M4, Fold 755x1000, solo seed 104, Tháng tám trung tuần năm 1, Buổi trưa, 4 khắc spent)
Q = [«Có người đến — Tần Tạ Nhạn hồi giá», «Kỳ ngộ — Thái y viện đêm khuya»], #modal hidden, «Sang buổi» enabled, real taps do nothing; a tab tap paints the card.
Dump: DQ {want null, mt 0, dropped 0, newsHold 1, modalHeld 74}. Night dump (rv): buổi tối, S.nfX.st "open", cfBusy true, Q=[news], newsHold 1 → ~80 s mutual wait.

## 2. Roots — one family: «a queue nobody paints» (LAW 11)
| # | exit | before | after |
|---|------|--------|-------|
| 1 | **solo #next button** — j6 wired `#next.onclick` to the BARE j9 nextBuoi before any wrapper (jcoopworld reroutes co-op only), so a solo tap skips every nextBuoi wrapper and j9 returns on `Q.length` | silent return (M4 dead tap) | jdayq wraps the button: a hidden queue is painted first (dqPaintQ), otherwise the old route unchanged |
| 2 | jdayq outermost nextBuoi (auto-advance / programmatic calls) | no paint | paints a hidden queue first |
| 3 | jdayq dqWait tick: turn dropped when Q non-empty | `render()` only | render + dqPaintQ; also paints while still waiting (a scene queued behind an unpainted card) |
| 4 | jdayq dqArmModal tick ONE-SHOT (rv): an inner showModal gate swallows its paint, nothing re-arms (M4 mt 0) | stays hidden until a tab tap | re-arms while the queue is still unpainted, bounded by BAL.dayq.rearm (600 looks × poll 300 ms ≈ 3 min; any paint / empty Q resets) |
| 5 | jdayq kmFree newsHold ⇄ jnf night gate (rv night dump): jdayq holds the queued flip for the news card, jnf holds the news card for the flip | ~80 s mutual wait | (a) jnf gate lets through the «Tin trong cung» card jdayq holds the queued, NOT yet on screen flip for (window.dqNewsPass, only while cfBusy and no scene on screen) → news paints first, the flip plays right after its close, the choice follows the scene as before (OD 16/11 22:45Z = no dialog while the scene is ON SCREEN); (b) generic breaker: kmFree newsHold paints the news card, and if a gate still swallows it lets the scene through (stat newsLet) |
| 6 | render net: any render that leaves a hidden queue (cards pushed without showModal) | nothing | arms dqArmModal (solo) |
dqQHidden() = Q non-empty, #modal REALLY hidden (DQ_HID), no S.mg, Q[0] not playing in the jdfv stage, Q[0] not in the jdfv visitor face-wait (`__dfWait===1`, ≤4 s own poll). Every paint goes through the full showModal chain, so #dawn / activity / night gates still hold on screen-visible terms.
Co-op untouched (dqUi solo only for 1/2/6; co-op has jcoopworld wantB/reshowQ which already paint + keep her intent).

## 3. Scans (before = f8cb11b2 index.html, after = this branch)
- `python3 dev/test/sangbuoi-exit-scan.py index.html` — every nextBuoi wrapper exit + every jdayq hold exit + the #next button: before **FAIL (7 unsafe)**, after **PASS**.
- `python3 dev/test/modal-hold-scan.py index.html` (extended per rv: kmFree wrapper flags newsHold / actKm / kmTap are blockers): before **FAIL** (newsHold no breaker, jnf pass missing), after **PASS**.

## 4. Real-tap test `dev/test/sangbuoi-held.js` (Fold 755x1000 + iPad 1180x820)
A robot state (4 khắc spent, 2 hidden cards, «Sang buổi» enabled) → tap paints a card → after both, the buổi advances · B turn held by a scene, cards land unpainted, scene closes → card shows by itself · C newsHold + scene queued behind an unpainted news card → news ≤1 s, then the scene, then «Sang buổi» advances · D khắc left → tap paints, second tap advances · E card held by an activity, first paint SWALLOWED → painter re-arms, card shows, no tap · F night mutual wait (S.nfX open, flip queued, news in Q, newsHold) → news paints ≤1 s (asserted), flip plays after its close, «Sang buổi» advances.
RESULTS: see §6.
BEFORE (f8cb11b2, Fold): A FAIL (tap hits «Sang buổi», Q=2, nothing painted = M4) · B pass · C FAIL (news unpainted, KMQ 1) · D FAIL · E FAIL (one-shot painter, mt 0 = M4 dump) · F FAIL (news not painted in 3 s, cfBusy true, nfX open = rv night dump).

## 5. Not changed / notes for MAIN
- Solo «Sang buổi» tap runs the BARE j9 nextBuoi (every nextBuoi wrapper — jdayq hold (a), jspread, j68 evRelease, jagent … — only runs on the auto-advance path or in co-op). This branch only adds the hidden-queue paint on the button; routing solo taps through the wrapped chain is a bigger behaviour change → ticket for MAIN to decide.
- jdfv visitor face-wait (≤4 s, `__dfWait`) is a timed wait with no on-screen cue (rv asked for a kit progress cue on intended timed waits) → kit request candidate, not built here (kit first).

## 6. Test results (sha fdbd44c6)
| test | result |
|---|---|
| dev/test/sangbuoi-held.js Fold 755x1000 + iPad 1180x820 | ALL PASS 12/12 · F timing: news painted 133 ms (Fold) / 193 ms (iPad), flip after 177 / 212 ms |
| dev/test/sangbuoi-exit-scan.py | before FAIL 7 unsafe → after PASS |
| dev/test/modal-hold-scan.py (extended) | before FAIL → after PASS |
| dev/test/modal-open-buoi.js Fold + iPad | ALL PASS (both) |
| dev/test/dayq-hold.js (root index.html; dev/index.html has no charset meta → mis-decoded over python http.server) | PASS 46 |
| dev/test/dayq-hold-coop.js | PASS 17/17 |
| dev/test/dayq-order.js | PASS |
| dev/test/coop-e2e.js | 142/142 · COOP_SWAP=1 142/142 |
| dev/tools/quickcheck.sh HEAD | QUICKCHECK PASS (old save ok, core gates PASS, perf render 221/234, buổi 1376/1329 ms) |
Shots (Fold + iPad, A1/B1/C1/E1/F1/F2): CDN img/_review/sangbuoi-held/ (https://ctm-img.victoria-tntt.workers.dev/img/_review/sangbuoi-held/755x1000-A1-card.jpg …); verdict giver wipes: python3 dev/site/cdn_sync.py --wipe-review sangbuoi-held.
Files: dev/build/jdayq.js, dev/build/jnf.js (one gate condition), dev/build/jbal2.js (BAL.dayq.rearm), dev/test/sangbuoi-held.js, dev/test/sangbuoi-exit-scan.py, dev/test/modal-hold-scan.py, index.html/sw.js rebuilt.

## 7. HANDOVER (rollover, 11/25 ~09:30Z) — r2 asked by MAIN 137: solo «Sang buổi» skips every nextBuoi wrapper
Worker is at its context ceiling; MAIN opens the successor. r1 = fdbd44c6 (LAND READY, rv 2yv2CZAt reviewing).
- Fact (probe on fdbd44c6): j6.js:97 `$("next").onclick=nextBuoi` runs BEFORE every wrapper file (assemble order j9, j10, j6 …), so the button holds the bare j9 nextBuoi. jcoopworld.js:1085 reroutes only `CW.on`; jdayq (r1) wraps the button only to paint a hidden queue. The render auto-advance (j6.js:10, `setTimeout(()=>nextBuoi(),350)` when khắc are spent) calls the GLOBAL (wrapped) chain — so solo players get the wrappers only when they spend all khắc, never when they tap «Sang buổi» with khắc left.
- To do (LAW 11 family): (1) list every nextBuoi wrapper (`grep -n "nextBuoi=function" dev/build/j*.js`, ~40) with its real effect (jspread D13 spread, j68 evRelease, jagent agDrain, jky npcPass, jagknow, jptime, jexam ticks, jpromo, jgift, jfe, jclose greet/wxSync, jerr, jlooks, j76 carry, j77 stay, jdayq hold (a) …) and mark which a solo tap misses; (2) change the button to `n.onclick=function(e){return window.nextBuoi()}` (keep jdayq's hidden-queue paint first; keep jcoopworld's co-op route) — or do it once in jdayq install, the outermost layer; (3) risks to test: re-entry (jaudit depth, jagknow KN.turn, jspread SP13.nb try/finally), double paint (j70/jmen/j42 call showModal/render after base), jdayq hold (a) now applies to taps (a tap during a pending reward scene is HELD, not run — that is the owner's flight rule, intended), co-op unchanged (CW.on path already wrapped), bots (window.__bot) unchanged; (4) tests: a solo tap with khắc left must run the same wrapper effects as the auto-advance (compare a stat/trace per wrapper: e.g. SP13.stat, evRelease count, KN.turn, DQ.stat.held), plus re-run sangbuoi-held.js, modal-open-buoi.js, dayq-hold/-coop/-order, coop-e2e both orders (COOP_SWAP=1), quickcheck, old save.
- Tools: dev/test/sangbuoi-held.js (tapAny/drain/newLife/diag helpers; CASES=… env filter, TRACE=1), python http.server needs the ROOT index.html (dev/index.html has no charset meta).
