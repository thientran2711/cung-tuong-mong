# day-queue (FLIGHT-DAYQ) — owner bug (5) of OD 24/11 ~18:05Z — report

Worker: FLIGHT-DAYQ session_01V1ZZH3gRpyiEtyMHxaDzFg (opus, depth 1, START_CTX ~3 %). Coordinator: MAIN CHÍNH 125.
Branch **review/day-queue** (from origin/main 502c48c9) — head **b3d580e6** (pushed). Tier **BIG** (time / buổi turn + popup queue).

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

## Gates (final head b3d580e6)
- dayq-order (her path): LIVE **FAIL** both devices / branch **PASS** both devices (8 runs over the builds, last on the final build).
- coop-e2e: default order **142/142**, swap order (COOP_SWAP=1) **142/142** on ec170482 (= final build; b3d580e6 only edits a test). History: builds that held cards in co-op gave 139/138/141/141 in the default order → co-op excluded. LIVE baseline 142/142 ×2.
- quickcheck: **PASS** 265 s · open 2078 ms · old save ok · perf new/live render 268/322 ms, tab 650/574 ms, buổi 1566/2055 ms · core gates PASS (one-core-guard, rules-one-source, kit-conform, coop-one-world, time-spill guard).
- family scan dev/measure/dayq-family.js: table above (every NO → yes).
- 0 page errors in every run.

## For MAIN / reviewer
- BIG tier. Lander: index.html + sw.js are rebuilt in the branch (dcb3272d).
- Not done here (other items of the same OD row are other workers'): red strip, reward size, mood seal, Tin báo rows.
- In co-op the old-day hold is off (the room's night/week gates own the turn); the book/news order (b) holds on both seats.
