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

## BIG REVIEW (rv session_01V1ZZH13YzNeAK6hT1mU9ZN, successor of rv 2yv2CZAt) — r1 fdbd44c6: FAIL (r2 required)
PRIORITY #1 CHECK: OD 16/11 22:45Z (no dialog under/over the flip scene) | main jdayq.js kmFree, jnf.js:271 night gate, j6.js:97 `$("next").onclick=nextBuoi` | review/* sangbuoi-held-fix fdbd44c6, tainghe-open-fix-rv f8cb11b2 (not landed; included via fdbd44c6) | claims SANGBUOI-HELD-FIX 3zq7i35Q (rolled) → r2 worker session_01V1ZZGzWMXPB5U9tSX79ouA.
Merge: fdbd44c6 onto LIVE 9f72524b (visitor-fix-r10) = local f4c19834 (conflicts index.html/sw.js only, rebuilt). Not pushed: the final verdict is on r2.

### MAIN 137 EXTRA — CONFIRMED on LIVE and on the merge (LAW 11 family → r2)
Probe (scratch, real `page.tap('#next')`, solo, buổi 1 with khắc left; outermost window.nextBuoi + wrapper effect functions counted):
| build | path | outer nextBuoi | agDrain | evRelease | knCarryOut | ptTick |
|---|---|---|---|---|---|---|
| LIVE 9f72524b Fold/iPad | tap «Sang buổi» | 0 | 0 | 0 | 0 | 0 |
| LIVE 9f72524b Fold/iPad | window.nextBuoi() (auto-advance path) | 1 | 2 | 1 | 1 | 1 |
| merge f4c19834 Fold/iPad | tap | 0 | 0 | 0 | 0 | 0 |
| merge f4c19834 Fold/iPad | window.nextBuoi() | 1 | 2 | 1 | 1 | 1 |
The buổi advances on a tap, but NPC agents (jagent), events (j68), knowledge carry (jagknow) and palace time (jptime) never run for a solo player who taps with khắc left. Cause: j6 binds the bare j9 nextBuoi at load, before all ~37 wrappers (index.html offset 1264342 vs first wrapper 1809340).

### Gate list (r1 merge)
| gate | result |
|---|---|
| (a) news ≤1 s in M4 night state, flip after (sangbuoi-held F) | PASS Fold 154 ms / flip 160 ms · iPad 338 ms / 235 ms |
| (b) dqArmModal re-arm bounded by BAL.dayq.rearm (law 4: in jbal2.js:557, not typed) + dqWait drop paints | PASS (E both devices) |
| (c) dqNewsPass/newsLet never paints over a flip ON SCREEN (own test: real .kmov.kcf.km-full on screen, nfX open, news held; showModal + render + dqArmModal + nextBuoi + #next tap, 3 s) | PASS: 0 frames card-over-scene, dqNewsPass false 30/30, newsLet 0; news paints 151 ms (Fold) / 75 ms (iPad) after the scene closes |
| (d) co-op unchanged | PASS: coop-e2e 142/142 + COOP_SWAP 142/142, dayq-hold-coop 17/17 both orders, coop-one-world PASS |
| (e) timed wait cue | no new timed wait. Pre-existing jdfv visitor face-wait ≤4 s has no cue AND hard-codes 4000 (jdfv.js:72, law 4) → KK26 note + BAL key, not this branch |
| (f) modal-hold-scan / sangbuoi-exit-scan | PASS on merge, FAIL on LIVE (both) |
| (g) modal-open-buoi Fold + iPad | ALL PASS both · flip-newlife ALL OK · dead-card PASS · dayq-hold 46 PASS · dayq-order PASS · quickcheck PASS (alone; buổi 2516/3767 ms; a run beside other browsers gave a perf FAIL = load) |
| (h) real-tap shots | Fold A1/F1 looked at: kit card, no cut/overflow. F1 is a synthetic night (HUD says Buổi trưa) → a REAL night shot is still owed on r2 |
| sangbuoi-held.js | **FLAKY case B**: merge 4 runs → 2 FAIL (Fold «scene closed: NO card painted, Q=2, next disabled, dropped=1» = a stuck screen; iPad «cards closed but the buổi did not advance»); fdbd44c6 alone 4 runs → 2 FAIL (Fold + iPad «did not advance»). Not from the merge |
Kit: no UI added (0 style/markup lines in the diff). Law 4 OK (BAL.dayq.rearm). OD 16/11 22:45Z respected (gate c).

### FAIL list for r2 (worker 01V1ZZGzWMXPB5U9tSX79ouA)
1. One entry point: the solo «Sang buổi» tap must run the OUTERMOST wrapped nextBuoi (keep jdayq's hidden-queue paint first, keep jcoopworld's co-op route). Regression proof: the table above must show equal wrapper effects for tap vs auto-advance (Fold + iPad), plus re-entry checks (jaudit depth, jagknow KN.turn, jspread SP13.nb).
2. Case B must be stable: 10/10 per device. First find whether «did not advance» is a real held turn (dqWait first exit `!dqUi()||bkey()!==w` drops the turn WITHOUT painting) or test timing; the Fold «NO card painted, next disabled» is a softlock if real. Under CPU load is when it shows: run with another browser busy.
3. (h) a REAL night (buổi tối, real jflip scene, a real «Tin trong cung» card) + «Sang buổi» tapped, Fold 755x1000 + iPad 1180x820, looked at; one pair to img/_review/sangbuoi-held/pair.jpg.
4. Re-run every gate above on r2 merged onto the newest LIVE.
Notes: jdfv face-wait 4000 ms typed (law 4) + no cue → MAIN for KK26 (not blocking this branch).

## 8. r2 (worker session_01V1ZZGzWMXPB5U9tSX79ouA) — one entry point for «Sang buổi»; rv FAIL list 1-4
PRIORITY #1 CHECK: OD 16/11 22:45Z (no dialog under/over the flip scene), OD 11/15 06:45Z (she STAYS where she is when the buổi turns) | main j6.js:97 `$("next").onclick=nextBuoi` (bare j9), jcoopworld.js:1085 co-op route, jdayq.js outermost nextBuoi | review/* sangbuoi-held-fix fdbd44c6 (r1) | claims SANGBUOI-HELD-FIX → this worker.
Branch `review/sangbuoi-held-fix`: r2 c6500ac1 + merge of LIVE 9f72524b = **7fd80044 (r2 c6500ac1 + merge LIVE 9f72524b b14cef02 + net d3246312 + tests 59d1c5c0/7fd80044)**.

### 8.1 Root + change (LAW 11 family = every path that turns the buổi)
`git grep` of every `=nextBuoi` binding that is not a wrapper: ONE — j6.js:97 bound the button at load, BEFORE every wrapper file (assemble order j9, j10, j6 …). Every other caller (j6/j25 auto-advance, j9 walk-spill, j77 «Sang buổi» option, jdayq dqWait, jptime, jnf, co-op) calls the GLOBAL `nextBuoi()` at call time = the wrapped chain.
| file | change |
|---|---|
| j6.js:97 | `$("next").onclick=()=>nextBuoi()` — the global (outermost) chain at tap time. jcoopworld's co-op route unchanged (it calls the same global). |
| jdayq.js button | r1's own paint on the button removed (the outermost jdayq nextBuoi it now reaches paints a hidden queue first — one paint, not two); kept only a re-entry guard: a click dispatched while her tap is still running is dropped (`DQ.stat.tapRe`). |
| jdayq.js outermost nextBuoi | NEW after-turn paint: a card an inner wrapper queued WITHOUT painting during the turn is painted (`DQ.stat.afterPaint`). Found by case B×10: jagent agDrain (runs first in the chain) pushes «Có người tìm đến», then j9 returns on Q.length → hidden card, «Sang buổi» disabled, painter not armed = softlock (also on LIVE's auto-advance path). |
| jdayq.js net (d3246312) | whole family «a card pushed into Q with no showModal and no render after it»: a look every BAL.dayq.net (=1000 ms, jbal2.js) arms dqArmModal (which still waits for dawn / activity / night gates). Found by sangbuoi-wrap P setup (iPad: Q=1, modal hidden, «Sang buổi» disabled, no scene). Stat DQ.stat.netTick, last card DQ.netT. |
| jdayq.js dqWait | rv item: the first exit (`!dqUi()||bkey()!==w`, the buổi turned another way while held) now paints a hidden queue instead of dropping silently. |
| dev/test/sangbuoi-exit-scan.py | the #next row now checks the r2 wiring (r1 fdbd44c6 → FAIL 2 unsafe, r2 → PASS). |
| dev/test/sangbuoi-wrap.js (NEW) | instruments every nextBuoi wrapper entry (45, map from dev/build in assemble order, counts must match) + spies wrapper effects; real tap vs auto-advance, Fold + iPad; case P = a tap at a non-home place. |
| dev/tools/quickcheck.js | BUOI: after its one click, finish what is on screen like a player (#ov hidden, roulette/podium removed as NEWLIFE does, scenes tapped, cards closed) — the tap is now HELD while the old buổi's moment is pending (proved: #ov mini-game screen open + a km-gate scene queued + a #kroul roulette; LIVE advanced the buổi UNDER the open screen). |
| dev/test/sangbuoi-held.js | F: takes a life where the night choice is on (nfOn). case B: a REAL scene the world queues meanwhile (reward chest) is tapped through like a player, then the card must show by itself; REPEAT=N env (stability gate). |
Co-op untouched (dqUi solo only; CW.on path was already the wrapped chain). Bots unchanged. jdayq hold (a) now also applies to her tap: a tap while the old buổi's big moment is pending is HELD (DQ.want) — the owner's flight rule, same as auto-advance.

### 8.2 Audit — what a solo tapper LOST on LIVE (tap with khắc left; before = fdbd44c6/LIVE, the tap entered 1/45 = bare j9 only)
| wrapper (file:line) | effect a solo tap skipped on LIVE |
|---|---|
| jdayq.js (outermost) | hold of the turn while the old buổi's big moment is pending (flight rule); hidden-queue paint |
| jagent.js:207 | agDrain: NPC agents' pending deeds of the buổi never ran |
| jky.js:277 | npcPass: kỳ ngộ NPC pass at the end of the buổi |
| jagknow.js:172 | knCarryOut + knTb: knowledge carry and its tin báo |
| j41.js:77 | __accStay/__accSilent: she must STAY where she is (OD 11/15 06:45Z). PROVEN (sangbuoi-wrap P, before): tap at Ngự hoa viên chiều→tối sent her HOME with a «Ngự hoa viên — Không vào được lúc này: đóng cửa tối · Lẻn vào …» card; auto-advance kept her there |
| j77.js:258 | «Sang buổi … · ngươi vẫn ở …» stay line |
| jstagehere.js:82 | stayRoll (a place closed at the new buổi: the sneak roll) |
| j68.js:177 | evRelease: held events released |
| jspread.js:100 | sp13Tick: spread of the buổi's cards (D13) |
| j70.js:475 | thrify70 (warning cards merged) + repaint |
| jmen.js:157 | men-road watch at her place before the turn |
| jroute.js:214 | rtRefresh + rtNpcMeet + render |
| jaudit.js:6 | «Trong cung vừa qua» result card (what changed her numbers while time passed) |
| jclose.js:33 / :77 | greeting reminder line / wxSync |
| jweather.js:68 | storm clears to drizzle |
| jexam.js:197 / :281 | exTick / exSrvTick (exam clocks) |
| jpromo.js:112 | prNpcScan + prCheck + capSweep (promotions) |
| jstory.js:83 | pl67Lapse (story beat lapses at its due) |
| jgift.js:236 | buổi trưa: the consort who seeks the Emperor (seekEmp) |
| jfe.js:27 | entering buổi tối: the night card flip at once (LIVE fell back to the jfe render hook one tick later) |
| jint.js:20 | intAll (whole-number stats) |
| jlooks.js:95 | lkSweep (looks items wear) |
| jptime.js:123 / :246 | ptTick + ptLedger (palace time) / iwTick (who waits where) |
| jerr.js:189 | errand scene tick / ledger / sync |
| jkyc.js:47 | kycMark |
| j76.js:64 / :121 | long-walk khắc carry into the next buổi / deck reset |
| j95.js:518 / :583, j95b.js:285, j95c.js:55, jmoodknow.js:268 | roster sync, final renderStage, false-warning purge, visit fix, mood-know step |
| jlogsync.js:116 | log label «Sang buổi mới» |
| j42.js:252, jkc.js:304, jkc2.js:176 | servant / khoa cử modes: deal + render on the turn |
| jcoopworld.js:1077, jcoopone.js:55, jcoopthinc.js:167, jcoopthine.js:252, jagstaff.js:217 | co-op only (pass-through solo; co-op already used the wrapped chain) |
Proof: sangbuoi-wrap.js before (fdbd44c6) = tap 1/45 wrapper entries vs auto 45; spies on tap: agDrain 0, evRelease 0, knCarryOut 0, ptTick 0, intAll 0, sp13Tick 0, lkSweep 0, rtRefresh 0, rsnap 0 (auto: all ≥1). After (merged build): tap 45/45 wrapper entries = auto 45/45 on Fold and iPad; every always-run effect present on the tap; j9 base entered once per tap (no re-entry); case P: her tap keeps her in Ngự hoa viên (goTo with __accStay=1, no access card) — Fold + iPad PASS.

### 8.3 Results (merged build 7fd80044 (r2 c6500ac1 + merge LIVE 9f72524b b14cef02 + net d3246312 + tests 59d1c5c0/7fd80044))
| gate | result |
|---|---|
| sangbuoi-wrap.js (NEW) Fold + iPad | ALL PASS (before fdbd44c6: FAIL — tap 1/45, P: sent home + «Không vào được lúc này» card, both devices) |
| sangbuoi-held.js A-F Fold + iPad | ALL PASS (held2, 7fd80044 tests) |
| sangbuoi-held.js CASES=B REPEAT=10, beside a busy browser (sangbuoi-wrap looping) | **20/20 PASS** (10 Fold + 10 iPad). Before the after-turn paint: 19/20 (the jagent «Có người tìm đến» hidden card) |
| sangbuoi-exit-scan.py / modal-hold-scan.py | PASS / PASS (fdbd44c6 → exit-scan FAIL 2: button bare) |
| modal-open-buoi.js Fold / iPad | ALL PASS / ALL PASS |
| dayq-hold.js / dayq-order.js / time-spill-guard | PASS 46 / PASS / PASS static + runtime |
| dayq-hold-coop.js both orders | 17/17 · 17/17 |
| coop-e2e.js / COOP_SWAP=1 | 142/142 · swap run 1: 140/142 (2× K61MAP «Tả đô ngự sử ???» title mask on an hPool person — j61 code came with the LIVE merge, nothing nextBuoi) · swap run 2: 136/144 (co-op step / world-equality / maid names) — NOT YET compared with plain LIVE 9f72524b → see §9 |
| quickcheck | run 1 FAIL «buổi did not advance» (the held tap, see quickcheck row above) → tool fixed → re-run pending (§9) |
| REAL night pair | NOT DONE (script night-shot.js timed out on the 2nd device's new-life card) → §9 |

### 9. HANDOVER r2 → r3 (rollover at the context ceiling, 25/11 ~13:50Z)
Branch pushed: review/sangbuoi-held-fix @ 7fd80044 (contains LIVE 9f72524b). The r2 code is done (§8.1); remaining are GATES only:
1. quickcheck: `bash dev/tools/quickcheck.sh HEAD` on 7fd80044 (BUOI fix in the tool). If «buổi did not advance» again, probe what holds (dqOldPending: KMQ / #ov / #kpodov / [id^=kroul]) — a pending moment nobody plays in the tool is a tool gap; a KMQ scene with kmFree() true and kmBusy false would be a real softlock.
2. coop-e2e COOP_SWAP=1: run on 7fd80044 AND on plain LIVE 9f72524b (same machine, serially) 2× each; r2 changes nothing on the co-op path (dqUi solo-only; CW.on already called the global nextBuoi), so a failure present on LIVE too is not this branch.
3. REAL night pair: scratch script /home/user/wt/sbh2-out/night-shot.js (real taps to buổi tối; shoots the real .kmov.kcf flip, the real «Tin trong cung», before/after the «Sang ngày mới» tap; per night resets if one is missing). Fix: its 2nd context timed out waiting for the new-life [data-nl=ok] card (wait for the title / call start() again). Look at the shots, build one Fold|iPad pair → img/_review/sangbuoi-held/pair.jpg (python3 dev/site/cdn_sync.py img/_review/sangbuoi-held).
4. Then send «LAND READY r2 <sha>» to MAIN 141 (session_01V1ZZH16HCco55nyV4XdPdw) and BIG rv session_01V1ZZH13YzNeAK6hT1mU9ZN.
Tools: serve the worktree root (`python3 -m http.server 8731 --bind 127.0.0.1`; ROOT index.html); sangbuoi-wrap.js needs URL ending /index.html (it instruments that route; BEFORE=<html> serves an old build); sangbuoi-held.js env CASES / REPEAT / TRACE.
