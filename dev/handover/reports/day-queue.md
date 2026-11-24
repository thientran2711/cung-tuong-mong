# day-queue (FLIGHT-DAYQ) — owner bug (5) of OD 24/11 ~18:05Z — report

Worker: FLIGHT-DAYQ session_01V1ZZH3gRpyiEtyMHxaDzFg (opus, depth 1, START_CTX ~3 %). Coordinator: MAIN CHÍNH 125.
Branch **review/day-queue** (from origin/main 502c48c9) — head **7c819a37** (pushed). Tier **BIG** (time / buổi turn + popup queue).

PRIORITY #1 CHECK: OD 15/11 ~23:20Z «spread events across buổi … per-buổi cap» = D13 **jspread.js already on main** (reused, not rebuilt) + OD 24/11 ~18:05Z item (5) | main: turn = j9 nextBuoi → endTurn → curtain → dawn (jne kitNewDay title card → j87 Tuần lục book); cards = Q + showModal; big moments = j93 kmPush/KMQ (kitGain «Nhận», kitReward, night card, card-flip); j68 evGate (optional events, hard `roll(50)` at day start); dev/measure/spread_hist.js (reused) | review/*: kit-daytitle 3424b927 (#kdaytc card on dawn — counted as part of the new-day host here, compatible) | claims: none.

## Root cause (her path: Tài nghệ › Vũ › Múa ends the last buổi)
1. Lesson callback = `S.mg=null; wkFinishLesson(); render()`. render (j6 + j25) arms the auto turn (2.6 s) when `used>=khắc && !Q.length && !S.mg`. The «Tác phẩm tự tay · Nhận» reveal is a **kmPush scene** (jfx kitGain), not a Q card → nothing told the turn to wait → the day turned under the reveal.
2. kmFree (j93) already kept motion scenes off the book, but **showModal had no such gate**: cards built at the turn (news, events) were painted over the title card and over the open Tuần lục book (f4–f6). «Tin trong cung» was not forced first (LIVE repro: «Hội phối đồ: báo đề» came first, over the book).
3. Mornings: j68 let half of the optional events through at day start (`roll(50)`); jspread let unslotted cards (e.g. «Phụ tuyến … Lời nhờ», title set only at show time) and carried-over cards show at the first buổi.

## Fix (smallest safe change; one module + 3 one-line BAL hooks)
- **dev/build/jdayq.js** (new, assembled LAST, wrappers installed after every setTimeout(0) wrapper = outermost):
  - SOLO ONLY: in a co-op room jdayq is off and the room is exactly as before (its own book gate jcoopworld reshowQ, night / week gates; both seats draw random numbers in the same order — an earlier build that held cards in co-op made the seats' worlds drift: S.fidUsed / S.nmReg diffs, a night stall; LIVE 2/2 clean under the same load).
  - (a) OLD DAY FIRST: `nextBuoi` is HELD while the old buổi has a pending big moment — kmPush scene open or queued (incl. a scene still preloading, stale guard `BAL.dayq.stale`), mini-game screen `#ov`, podium, roulette. The held turn runs by itself once it is closed (`BAL.dayq.poll`). Not in a co-op room (room paces its own turn), not for bots.
  - (b) ONE ORDER: while the new-day host is up (#dawn title card / Tuần lục book / future #kdaytc), `showModal` paints nothing (a kitModal she opens herself with a tap still shows); when the book closes: «Tin trong cung» moved to the front and shown; new-day motion scenes (stipend chest, rewards) wait in kmFree until the news card is closed.
- **j68.js**: day-start hold of optional events = `BAL.spread.dawnOpt` (100 = always; was hard `roll(50)`); the roll is still drawn exactly as before (co-op seats stay in step).
- **dev/test/time-spill-guard.js**: its `clr()` (= she closed every card) also closes kit scenes now — the greeting result scene held the turn in the runtime case, which is the intended new rule.
- **jspread.js**: at the first buổi of a day an unslotted world card goes to `BAL.spread.dawnSlot` (1 = trưa), and carried-over cards are released at dawn only if they fit the morning (slot 0) or are forced (maxWait) — no card is lost.
- **jbal2.js**: `BAL.spread.dawnSlot:1, dawnOpt:100`, `BAL.dayq:{poll:300, stale:10000}`. No player-visible text, no UI part, no save data (old saves unaffected).

## Whole family (scan: `node dev/measure/dayq-family.js --before <LIVE dev/build>`)
| channel | call sites (files) | A: day waits — before | after | B: not over card/book — before | after |
|---|---|---|---|---|---|
| Q card (event / news / result / edict / stipend card, kitModal, kitPanel) | 402 (147) | yes | yes | **NO** | yes |
| kit motion scene via kmPush (kitGain «Nhận», kitReward, edict, gloom, bloom, ink, tablet flip, night card, card-flip …) | 16 (6) | **NO** | yes | yes | yes |
| mini-game screen + its result (#ov, openMG / kg82) | 29 (20) | **NO** | yes | yes | yes |
| podium (kitPodium, j90) / roulette | 6 (2) | **NO** | yes | yes | yes |
| «Tin trong cung» first after the book | 3 (3) | yes | yes | **NO** | yes |
| new-day motion scenes wait for «Tin trong cung» | 18 (10) | yes | yes | **NO** | yes |
| optional j68 event at the first buổi of a day | 2 (1) | yes | yes | **NO** | yes |
| unslotted / carried world card at the first buổi of a day (D13) | 2 (1) | yes | yes | **NO** | yes |
(A in co-op: not held by design; co-op keeps its own night/week gates.)

## Her exact path, scripted (dev/test/dayq-order.js; Fold 755x1000@2 + iPad 1180x820@2)
Plays to the last buổi, runs the Múa self-study callback (reveal «Nhận»), waits 3.5 s, taps Nhận, then goes on like a player (scene buttons, title card, decline mini-games), samples the screen every step.
- **LIVE 502c48c9: FAIL** both devices — the night started under the open reveal; «Hội phối đồ: báo đề» / «Tin trong cung» painted over the title card and over the book; book still up under the card.
- **review/day-queue: PASS 6/6 runs earlier + final build PASS** (both devices): during the reveal the turn is held (DQ.want), after Nhận the night/day turn runs; no card or scene over the title card or book; after closing the book the first card is «Tin trong cung»; the morning shows only that (optional events held in EVHOLD, others due at trưa).
- Shots (looked at, CDN): https://ctm-img.victoria-tntt.workers.dev/img/_review/day-queue/755x1000-before-after.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/day-queue/1180x820-before-after.webp (LIVE card over book | reward open, day waits | book alone | after book: news first).

## Popups per buổi, bots (spread_hist.js sens, 2 lives × 12 tuần = 24 days per row; VP env added)
| device | build | days | morning world cards: 0·1·2·3·4·5+ | mean world cards sáng / trưa / chiều / tối | visitor-type events at morning | optional dropped (j68 anti-flood) | lost | late | page err |
|---|---|---|---|---|---|---|---|---|---|
| 755x1000 | before (LIVE) | 24 | 2 · 5 · 18 · 0 · 0 · 0 | 1.64 / 1.36 / 1.12 / 0.667 | 3 | 30 | 16 | 0 | 0 |
| 755x1000 | after | 24 | 2 · 6 · 18 · 0 · 0 · 0 | 1.615 / 1.308 / 1.24 / 1.25 | 1 | 40 | 22 | 0 | 0 |
| 1180x820 | before (LIVE) | 24 | 2 · 5 · 18 · 1 · 0 · 0 | 1.692 / 1.28 / 0.958 / 0.833 | 3 | 23 | 13 | 0 | 0 |
| 1180x820 | after | 24 | 2 · 6 · 18 · 0 · 0 · 0 | 1.615 / 1.462 / 1.2 / 1.333 | 0 | 43 | 16 | 0 | 0 |
Reading: the morning keeps «Tin trong cung» + at most one card that fits the morning by her 15/11 rule (Bổng lộc tháng, Lễ, festival Lời mời, Điềm báo, court news); visitor/event cards (Có người…, Phụ tuyến, Ngươi bắt gặp, Quà gửi lén…) moved to later buổi (tối mean up). Cap 2/buổi unchanged. Honest notes: (1) more optional j68 events are dropped by j68's own hold limit (E68S.hold 4, by design → a log line), Fold 30→40, iPad 23→43 per 24 days — fewer optional popups overall; (2) "lost" (pre-existing harness count, LIVE has it too) 16→22 / 13→16 is within run-to-run noise (random lives, not seeded).

## Update 7c819a37 (j68 dawn-held cards never vanish)
- j68 evGate: a card held ONLY because it is the first buổi of a day always goes to EVHOLD (no drop for a full hold); evRelease shows it at a later buổi.
- Bots 24 days: evGate:holdfull drops Fold LIVE 28 → 5, iPad LIVE 11 → 14 (rest = j68's own non-dawn reasons). Morning world cards Fold 0·1·2·3·4 = 3·5·16·0·1, iPad 2·8·15·0·0. Harness "lost" examples are all at k 47–50 (the life-cap last buổi) in LIVE and branch alike = harness artefact.
- Gates on 7c819a37: dayq-order PASS Fold+iPad · coop-e2e 142/142 default + 142/142 swap · quickcheck PASS 274 s (old save ok; perf new/live render 297/316, tab 581/686, buổi 2955/2026 — buổi median noisier this run; previous run 1566/2055 on the same jdayq).

## Gates (head b3d580e6, kept for history)
- dayq-order (her path): LIVE **FAIL** both devices / branch **PASS** both devices (8 runs over the builds, last on the final build).
- coop-e2e: default order **142/142**, swap order (COOP_SWAP=1) **142/142** on ec170482 (= final build; b3d580e6 only edits a test). History: builds that held cards in co-op gave 139/138/141/141 in the default order → co-op excluded. LIVE baseline 142/142 ×2.
- quickcheck: **PASS** 265 s · open 2078 ms · old save ok · perf new/live render 268/322 ms, tab 650/574 ms, buổi 1566/2055 ms · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, time-spill guard).
- family scan dev/measure/dayq-family.js: table above (every NO → yes).
- 0 page errors in every run.

## For MAIN / reviewer
- BIG tier. Lander: index.html + sw.js are rebuilt in the branch (dcb3272d).
- Not done here (other items of the same OD row are other workers'): red strip, reward size, mood seal, Tin báo rows.
- In co-op the old-day hold is off (the room's night/week gates own the turn); the book/news order (b) holds on both seats.

## REVIEW (BIG, reviewer RV day-queue session_01V1ZZH1LA8QSoproNf1ie72, depth 1, START_CTX ~4 %) — **PASS 7c819a37**
PRIORITY #1 CHECK: worker report (this file) | OD 15/11 ~23:20Z (spread across buổi, per-buổi cap) + OD 24/11 ~18:05Z item (5) | main: D13 jspread, j9 nextBuoi, jne kitNewDay, j87 book, j93 kmPush/kmFree, j68 evGate/EVHOLD | review/kit-daytitle 3424b927 (#kdaytc counted by dqDawn) | claims none.
Base: origin/main 502c48c9 is an ancestor of 7c819a37 (FF OK, no merge needed; checked again right before this verdict). Reviewed b3d580e6 fully, then the worker's later 7c819a37 (j68 only) and re-ran every gate on it.

| check | result |
|---|---|
| diff / jdayq logic | (a) nextBuoi wrapper is outermost (installed after the setTimeout(0) wrappers); a held turn polls every BAL.dayq.poll and runs nextBuoi itself once no scene / KMQ / #ov / podium / roulette is pending; if cards are up it hands back to the normal render auto-turn. Stale kmBusy with no scene frees the hold after BAL.dayq.stale (probe: DQ ran the turn; the game's own kmPump queue then waits as in LIVE — pre-existing, not jdayq). (b) showModal held only while #dawn really shows .kbk/.kne (or #kdaytc); user-tap kitModal passes. No deadlock found. |
| reload mid-hold (probe) | reveal up, turn held (DQ.want 0-3) → save → reload → «Tiếp tục kiếp này»: same buổi, item kept (wkFinishLesson puts it in S.inv BEFORE the reveal), want cleared, day turns normally (wk 0→1, book up). OK |
| co-op untouched | dqUi() false when COOPW.on (no hold, no card gate, no news/km hold); jspread already off in co-op; j68 dawnOpt/never-drop runs on both seats with the same draws (roll still drawn). coop-e2e default **142/142** + COOP_SWAP **142/142** on b3d580e6 AND again on 7c819a37. |
| her path dev/test/dayq-order.js (Fold 755x1000@2 + iPad 1180x820@2) | LIVE 502c48c9 **FAIL** both (news card painted over title card + book, book stays up, «Hội phối đồ» first). Branch **PASS** both on b3d580e6 and on 7c819a37: reveal alone 3.5 s (turn held), after Nhận → title card → book (cover, closed) alone → «Tin trong cung» first, morning shows only it. 0 page errors. Shots looked at (R1/R3/R4 both builds). |
| quickcheck | b3d580e6 PASS (old save ok, core gates PASS); 7c819a37 **PASS** 194 s, old save ok, core gates PASS, perf new/live render 223/206, tab 388/487, buổi 1119/1324. (buổi median is bimodal ~0.9 s / ~2.6 s on BOTH builds by life content — noise, not jdayq.) |
| family scan dev/measure/dayq-family.js --before LIVE | reproduced the worker's table: every NO → yes (8 channels). |
| bots spread_hist sens 2×12 tuần (24 days) | see table below |

| device | build | shown | holdfull drops | cooldown drops | harness "lost" | page err |
|---|---|---|---|---|---|---|
| 755x1000 | LIVE 502c48c9 | 345 | 21 | 7 | 16 | 0 |
| 755x1000 | b3d580e6 | 434 | 27 | 17 | 19 | 0 |
| 755x1000 | **7c819a37** | 416 | **14** | 9 | 18 | 0 |
| 1180x820 | LIVE 502c48c9 | 435 | 22 | 7 | 19 | 0 |
| 1180x820 | b3d580e6 | 438 | 19 | 11 | 18 | 0 |
| 1180x820 | **7c819a37** | 425 | **12** | 13 (+1 evHoldRe) | 11 | 0 |

Side-effect judgment (law 3 / her spread rule "queue the rest to later buổi"): at b3d580e6 the extra drops were j68's existing hold cap (E68S.hold 4) and anti-repeat cooldown — existing rules, and my runs did not reproduce the worker's 23→43 (iPad 22→19). 7c819a37 goes further: a card held ONLY for the dawn is never dropped for a full hold, it moves to a later buổi (later it can still age out by the existing E68S.stale rule) → hold-cap drops now BELOW LIVE on both devices. Content is deferred, not lost. "lost" examples are all at k 48–49 (the life-cap last buổi) in LIVE and branch alike = harness artefact. Total shown not lower than LIVE.

Laws touched: 4 ONE CORE ✓ (BAL.spread.dawnSlot/dawnOpt, BAL.dayq; one-core-guard PASS) · 6c REAL OBJECTS ✓ (reward in inventory before «Nhận», survives reload) · 7/9/10 n/a (no text, no UI part) · 11 WHOLE GROUP ✓ (family scan) · 12 TWO DEVICES ✓ · 13 PRIORITY #1 ✓ · 14 ✓ (j68 roll(50) replaced in place) · 16 ✓ (her OD 15/11 rule obeyed, not changed).
Nits (non-blocking, for a later touch): jdayq.js header comment names `BAL.spread.dawnCap`, which does not exist (the keys are dawnSlot / dawnOpt); `||300` / `||10000` fallbacks repeat BAL.dayq values.
Verdict: **LAND READY (BIG PASS) 7c819a37** — FF of origin/main 502c48c9; index.html + sw.js are built in the branch.

### REVIEW addendum (MAIN 127 extra checks, on 7c819a37; LIVE still 502c48c9 → review/day-queue-rv = 7c819a371f50cd9f50badd7f8598ffb237614727, no merge needed)
- quickcheck --runs 6: **PASS** 412 s · old save ok · core gates PASS · perf median of 6 new/live: render 240/203, tab 429/471, **buổi 1315/1616 ms**, tasks>200 ms 24/25 → the earlier 2955/2026 was noise (single runs are bimodal ~0.9 s / ~2.6 s on both builds); no sang-buổi slowdown from the hold.
- (c) j68 dawn-held cards carry over (see table above: hold-cap drops below LIVE both devices). OK.
- (e) every new-day path, probe on clean pages, Fold + iPad: podium (#kpodov), roulette (#kroul), queued kit scene (kmPush) → turn HELD (DQ.want set, no night card), resumes by itself after close (DQ.stat.ran=1, night card «Kính sự phòng» starts). Her reveal path: the «Nhận» scene is queued by j93 kmDiff INSIDE render (same task that arms j25's 2.6 s turn timer) → always queued before the turn (measured 0.2–2.1 s even at 4× CPU; timer can't fire before the task ends) → held. Mini-game end: j5 «Xong» hides #ov BEFORE its callback and S.mg blocks the auto-turn while a mini-game is open; the callback (S.mg=null; wkFinishLesson; render) = the dayq-order path → held. Festival / contest results come through kitReward/kmPush or podium/roulette → covered above. Sleep/night: there is no separate sleep path; endTurn is called only from j9 nextBuoi (solo) and jcoopworld (co-op, room's own gates). The «Sang ngày mới» button (#next) is bound to the ORIGINAL nextBuoi (j6:97, pre-existing) but during the reveal it is covered by the scene (elementFromPoint ≠ #next; real tap at its centre did not turn the day).
- (d) «Tần ???» = LIVE base: unknown names print "???" by j61 kitKnownName on main; the branch does not touch it (kitNoUnk comes with review/flight-ui). iPad Tuần lục grey «Trung tuần» box: a transient j87 cover state in the first second; after 1.5 s the cover is identical and clean on LIVE and branch, both devices (re-shot with the LIVE card hidden). The branch does not touch j87 → pre-existing, not new.
- Verdict unchanged: **LAND READY review/day-queue-rv 7c819a371f50cd9f50badd7f8598ffb237614727 BIG PASS**.

## HANDOVER (FLIGHT-DAYQ worker, 24/11 ~22:10Z) — rollover by context (~41 % > START 3 % + 25 %); depth 1
Status: review/day-queue **7c819a37 BIG PASS** (reviewer session_01V1ZZH1LA8QSoproNf1ie72), stacked by MAIN 128 (step 7, 71c4c28f), LC12 landing. Nothing unpushed.
NEW JOB (not started) from MAIN 127, OD «24/11 ~22:02Z real» item (1), shot dev/handover/refs/owner-2411-viecnho/v9.jpg: she tapped Điểm trang → a new khắc began and a visitor scene («Quý phi … tiến lại») ran BEHIND the mini-game intro before she pressed «Sẵn sàng». Rule: no visitor/event scene starts or renders while she is inside an activity (mini-game intro/play, reward, any open scene); it waits until she finishes. Extend the jdayq hold from the day turn to EVERY khắc/buổi event, whole family; solo only.
Where to start (successor):
- dev/build/jdayq.js: `dqOldPending()` (what counts as "inside an activity") + the outermost `nextBuoi` wrapper (holds the turn, `dqWait` re-runs it). For khắc-level events find the code that starts a visitor/stage scene when khắc are spent (grep: `tiến lại`, jstagehere.js stayRoll/actPendRun, jvisit.js, jdfv.js stage "say" scenes, jcmaid/jagday walk-ins, j76 visit arrivals) and gate them on one predicate `dqBusy()` = dqOldPending() || an open activity card (#modal showing a mini-game intro: kg82 card with «Sẵn sàng», `#kg82`, `#ov`) — queue the start, run it when free (same poll as dqWait). Keep co-op OFF (`dqUi()` already returns false in a co-op room: worlds drift if timing changes).
- Nit from the reviewer to fix in the same commit: jdayq.js header names `BAL.spread.dawnCap` — the keys are dawnSlot / dawnOpt.
- Tests to reuse: dev/test/dayq-order.js (her day-turn path, serves via a utf-8 http server — python http.server needs `.html → text/html; charset=utf-8`, else "Invalid or unexpected token"); add her Điểm trang path. Gates: coop-e2e both orders (COOP_SWAP=1) — run sequentially, LIVE baseline was 142/142 ×2; quickcheck (commit index.html/sw.js from dev/site/build_site.sh first). time-spill-guard clr() already closes kit scenes.
- Report LAND READY <sha> to MAIN CHÍNH 128 session_01V1ZZH2eoaTpGJXoPfwK5DT (BIG; 128 opens the reviewer).


## DAYQ-2 (worker DAYQ-2 session_01V1ZZH4qKPudWMUYiixskpu, successor of FLIGHT-DAYQ; opened by MAIN CHÍNH 128) — OD «24/11 ~22:02Z real» item (1), shot v9
PRIORITY #1 CHECK: OD 24/11 ~22:02Z real item (1) (v9) + OD 15/11 ~23:20Z spread rule | main 502c48c9: j3 showModal (only painter of #modal), j93 kmPush/kmPump/kmFree, jdfv showModal → stage «say» encounter (NPC-initiated, OD 21/11 ~06:55Z), j82 kgReady «Sẵn sàng» in #ov, jtoil toil tap = spend(1 khắc) → toilOpen | review/day-queue 7c819a37 (BIG PASS, jdayq: reused + extended, not rebuilt) | claims: none (this job given by MAIN 127/128).
Branch **review/day-queue-2** (from review/day-queue 7c819a37; origin/main 502c48c9 is an ancestor = FF). Tier **BIG**.

### Root cause (her v9)
Her «Điểm trang» tap spends the khắc FIRST (spend → khắc hooks → a visitor card in Q → showModal → jdfv plays it as the stage «say» scene) and only then opens the mirror (#ov, kgReady «Sẵn sàng»). Nothing in the game knew she was inside an activity: every card / scene of the khắc was painted at once — behind or over the mini-game intro, over a reward scene, over the podium, and a visitor card even TOOK OVER the person view she had opened herself (jdfv swaps the focus). Measured on LIVE: 44/44 cases FAIL (matrix below).

### Fix (jdayq.js only — the same module, new gate (c); no BAL key, no text, no UI part, no save data)
- `dqActEl()` = she is inside an activity: mini-game screen #ov (intro «Sẵn sàng» / play / result), a kit scene ON screen (.kmov / #kmrew), podium #kpodov, roulette, the on-figure game DF.play or the person view she opened herself (dfOpen → DQ.fo).
- outermost `showModal`: while an activity is open no queued card is painted (centre card or jdfv stage encounter) — `DQ.stat.actHeld`; the card waits in Q and `dqArmModal` paints it, unchanged, the moment she finishes. A card she opens with a tap INSIDE the activity still shows (dqInside); the card already playing in the stage scene keeps playing (dqPlaying).
- `dqPull()` (MutationObserver on body children + #ov[hidden]): a card painted in the SAME tap that then opens the activity (her exact path: spend → card → mirror) is taken back — centre card hidden, the stage encounter closed with nothing chosen (m.dfSeen reset) — `DQ.stat.pulled`, and shown after.
- `kmFree`: no new kit scene starts while #ov or an on-figure game is open; a scene posted inside a tap waits one pump (250 ms) so it never starts before / under the screen that tap opens (`DQ.kmTap`).
- The day turn (gate (a)) already waited on these; render's auto-turn needs Q empty, so a held card also holds the turn (nothing lost, nothing skipped).
- SOLO ONLY (dqUi): co-op rooms unchanged, bots unchanged.
- Reviewer nit fixed: header named `BAL.spread.dawnCap` → now dawnSlot / dawnOpt; `dqPoll()` reads BAL.dayq.poll (no repeated 300 fallback).

### Whole family (node dev/measure/dayq-family.js --before <LIVE dev/build>) — new column C + every khắc / buổi event source
| channel | call sites (files) | A: day waits — before | after | B: not over card/book — before | after | C: not inside an activity — before | after |
|---|---|---|---|---|---|---|---|
| Q card (event / news / result / edict / stipend card, kitModal, kitPanel) | 402 (147) | yes | yes | **NO** | yes | **NO** | yes |
| kit motion scene via kmPush (kitGain «Nhận», kitReward chest/tray/gift, edict, gloom, bloom, ink, tablet flip, night card, card-flip …) | 16 (6) | **NO** | yes | yes | yes | **NO** | yes |
| mini-game screen + its result (#ov, openMG / kg82) | 29 (20) | **NO** | yes | yes | yes | **NO** | yes |
| podium (kitPodium, j90) / roulette | 6 (2) | **NO** | yes | yes | yes | **NO** | yes |
| person view she opened herself / its on-figure game (jdfv kitFocus) — a visitor card does not take it over | 3 (2) | yes | yes | yes | yes | **NO** | yes |
| visitor shown as the jdfv stage «say» scene (her v9 case) | 2 (2) | yes | yes | yes | yes | **NO** | yes |
| «Tin trong cung» first after the book | 3 (3) | yes | yes | **NO** | yes | n/a | n/a |
| new-day motion scenes wait for «Tin trong cung» (stipend chest, rewards) | 18 (10) | yes | yes | **NO** | yes | n/a | n/a |
| optional j68 event at the first buổi of a day | 2 (1) | yes | yes | **NO** | yes | n/a | n/a |
| unslotted world card at the first buổi of a day (D13 jspread) | 3 (1) | yes | yes | **NO** | yes | n/a | n/a |
Second table of the scan (in the script output): **74 source files** that hook the khắc / buổi clock (spend, endTurn, nextBuoi, dawn, agTick/agWatch, approaches, evRelease, gmTick, …) and post cards / scenes — every one goes Q → showModal or kmPush → kmPump; **direct #modal paints outside j3 showModal: 0** → every source is behind gate (C).

### Her path + matrix, scripted: dev/test/dayq-hold.js (Fold 755x1000@2 + iPad 1180x820@2)
Activities A1 Điểm trang (her tap; the card arrives INSIDE the tap's spend) · A2 j5 mini-game · A3 kitGain «Nhận» scene · A4 her own person view · A5 podium; sources S1 jgreet gmCard visitor on stage (real) · S2 j24 approaches (real; fallback card when none) · S3 released j68 held event · S4 other card · S5 new kit scene during a mini-game. Checks: nothing painted / started at 0.4 s and 1.6 s, card / scene shown after she finishes, 0 page errors.
- LIVE 502c48c9 (dev/index.html assembled from main): **FAIL 44/44** (A1×S1 = her v9: the stage visitor «… tiến lại» runs under «Sẵn sàng»; A4×S1/S2: the visitor takes over her person view).
- review/day-queue-2: **PASS 44/44**.
- Shots (looked at; LIVE | branch held | branch after she finished): https://ctm-img.victoria-tntt.workers.dev/img/_review/day-queue-2/755x1000-v9-before-after.webp · https://ctm-img.victoria-tntt.workers.dev/img/_review/day-queue-2/1180x820-v9-before-after.webp

### Other gates (state at handover)
- dayq-order (day turn): PASS on runs 2–6; ~2 of 12 Fold runs FAILED with "R2 held turn did not run": diagnosed = harness, not game: the card after «Nhận» was shown as a jdfv STAGE encounter (DF.F + DF.encM set, actHeld 3, pulled 1) and the old harness only recognised #modal cards, so it never answered it. Harness fixed (dev/test/dayq-order.js: a stage encounter counts as a shown card and is answered; dbg adds act element, DQ.stat, F/E/V). Re-loop 3×4 Fold runs was running at handover → see the loop line below.
- NOT yet run: quickcheck, coop-e2e default + COOP_SWAP=1, offline-all (solo-only change; co-op paths untouched by construction, still must be run).

## HANDOVER (DAYQ-2, 24/11 ~23:30Z) — rollover by context
Pushed: review/day-queue-2 **8a077f15** (code + test + scan + built site). Unpushed in /home/user/wt/dayq2: dev/test/dayq-order.js harness fix (stage encounter = shown card; dbg) — commit + push it (no game change, no rebuild needed).
Successor steps: (1) commit/push the dayq-order.js change; re-run `VPONLY=755x1000` dayq-order ~6× + both devices once (serve with a utf-8 server: /home/user/wt/dayq2-s/srv.py <port> <root>); if a fail remains read the dbg F/E/V flags (V = .kfoc visible). (2) `bash dev/tools/quickcheck.sh` (alone, perf). (3) coop-e2e default then COOP_SWAP=1 (sequential; baseline 142/142). (4) `node dev/test/offline-all.js`. (5) re-run dev/test/dayq-hold.js once on the final sha. (6) report LAND READY «review/day-queue-2 <40hex> BIG» to MAIN CHÍNH 128 session_01V1ZZH2eoaTpGJXoPfwK5DT + LC12 session_01V1ZZH2p2x7oNCrRuTq7RjF. Wipe img/_review/day-queue-2 only after the verdict (verdict giver).
Notes: LIVE comparison build = /home/user/wt/dayq2-s/livebuild (main dev/build assembled). dayq-hold debug filter: ONLY=A1:S1,A4:S2.
