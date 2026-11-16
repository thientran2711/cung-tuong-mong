# review/spread-events-r1 — independent review of review/spread-events @ 44c7f074 (D13 spread events across buổi, Foreman B)

Reviewer branch: **review/spread-events-r1 @ af64214f8205a73ac4e36b0cd538a931fe7275e3**. It is:
origin/main **b85cdb1e** + review/schedules3-r2 **4ea772f3** (the current D29 fix pass; schedules3-r1 was FAIL, r2 is not reviewed yet) + review/spread-events 44c7f074 + reviewer fixes. Site rebuilt (dev/site/build_site.sh).
Merge conflicts: only dev/build/assemble.py (main's list kept; jk95 after jk2b; j95, j95b, j95c, jqsave, **jspread** just before jkpc, as both workers set), dev/build/jbal2.js (BAL.psk from main + BAL.spread, both kept), built files. New main modules after jspread that wrap the same functions: jkc (nextBuoi, only on the khuê các road), jkpc (showModal, layout only), jcycle/jne (endTurn, run inside nextBuoi, so their cards are planned). jmort/jne sit before jspread. No order problem found.

## Why FAIL
1. **D13 suppresses plot warnings (j70 "Mưu hại" = she learns a plot targets her), and the same risk exists for every generator that gates on `Q.length`.**
   j70 `show70()` (j70.js:265) pushes a pending plot card only `if Q.length<=2`. It runs in endTurn, i.e. inside nextBuoi. jspread blocks showModal during the buổi change (`SP13.nb`), so the showModal-time holds / purges / merges of other modules (j68 hold, j95bPurgeWarn, thrify70 …) have not run yet and Q is longer when j70 looks at it. Bots (sens, same shard, ON vs `__spreadOff`, final build), counting the reason `show70` skips a pending "seen" plot:
   | run | "seen" plot cards pushed | show70 skipped "seen" because Q>2 | plots known to target her |
   |---|---|---|---|
   | sens 4 lives shard 3, OFF | 13 | 32 | — |
   | sens 4 lives shard 3, ON | **3** | **63** | — |
   | sens 6 lives shard 3, OFF / ON | 14 / **2** | — | 25 / 27 |
   | sens 6 lives shard 1, OFF / ON | 15 / **4** | — | — |
   | sens 6 lives shard 2, OFF / ON | 20 / **9** | — | 36 / 30 |
   The card is never created, so the worker's "lost 0" check cannot see it. Effect for the player: plots against her run without the warning card (2–4× fewer), a real gameplay change, not pacing.
   **LUẬT SỬA CẢ NHÓM — same family (gate on Q length inside the buổi change), fix all and measure each ON vs OFF:**
   | module:line | gate | what it may stop |
   |---|---|---|
   | j70.js:265 `show70` | `Q.length>2&&!urgent` | plot "seen"/"warn"/"npc"/"serv" cards (measured above) |
   | j68.js:90 | `Q.length>2` | j68 world events |
   | j72.js:232 | `Q.length>3` | Thái hậu errands / q72 offers |
   | jpet.js:129 | `Q.length>2` | pet cards |
   | jkc.js:305 `kcWeek` | `Q.length>2` | khuê các weekly events (D13 is on there too) |
   Suggested root fix (worker decides): under D13 these gates should see the queue the player will actually get this buổi — e.g. a jspread helper `sp13QLen()` (cards due now, after planning) used by each gate while `SP13.nb`, or a re-run of the gated generators after `sp13Tick`. Then a table per generator: cards created per 100 tuần OFF vs ON (sens + rand), all within noise.
2. Re-run the worker's table on the merged build with the item 1 fix (histogram before/after, lost, page errors, roster_audit, spread-e2e, coop-e2e), plus the per-generator table above.

## Reviewer fixes already on review/spread-events-r1 (commit 71d27c2a, keep them)
| # | finding | fix |
|---|---|---|
| a | `SP13DAY` was declared but never used and `end` was never set, so warnings / plots / aftermath / tells / festival-day cards could be carried into the NEXT tuần — the worker report said they stay in their tuần. Bots (sens 8, shard 0): **8 of 67** such cards shown one tuần late ("Sau vụ mưu hại b36→40", "Mưu hại b48→52", "Tai mắt báo tin b72→76" …); rand 8 shard 4: 1 of 21 | `sp13End()`: such a card gets end = the last buổi of its tuần; due never later; forced at that buổi. Festival-day titles (" · Lời mời", " · Lễ", " · Dâng lễ", " · Thi ", " · Trò vui", " · Đặt cược", "Tết/Tiết/Lễ/Hội …") added to SP13DAY. After: **0 of 83** (sens 8), **0 of 87** (sens 8, final build), **0 of 45** (sens 6 shard 3), 0 of 13 (rand 8) |
| b | fallback numbers `||2`, `||4`, `:2` beside BAL.spread (OD:L1267 one core) | cap / maxWait / codeWait read BAL.spread only |
PROGRESS_spread-events.md has a "Review r1" section with the same.

## Histogram (world cards shown per buổi; dev/measure/spread_hist.js + reviewer hooks; my runs, not the worker's)
| run | sáng mean / 3+ | trưa | chiều | tối mean / 3+ | lost | page err |
|---|---|---|---|---|---|---|
| sens 8 shard 0, OFF (before) | 3.28 / 52.7 % | 0.47 / 0 % | 0.70 / 4.2 % | 0.65 / 4.2 % | 0 | 0 |
| sens 8 shard 0, worker's jspread | 1.31 / 9.5 % | 1.22 / 0 % | 1.13 / 2.4 % | 0.93 / 0 % | 0 | 0 |
| sens 8 shard 0, + fix a (main a5d9d2bc) | 1.00 / 2.4 % | 1.32 / 0 % | 1.16 / 1.0 % | 1.07 / **10.7 %** | 0 | 0 |
| sens 6 shard 3, OFF / + fix a (final build) | 2.96 / 50.2 % → 1.01 / 2.7 % | 0.37 → 1.19 / 0 % | 0.48 → 1.10 / 0.9 % | 0.48 → 0.87 / **6.0 %** | 0 | 0 |
| rand 8 shard 4, OFF / + fix a | 1.32 / 4.5 % → 0.89 / 0 % | 0.45 → 0.81 | 0.42 → 0.67 | 0.23 → 0.54 / 1.4 % | see note | 0 |
The worker's before/after direction is confirmed (morning pile 50 % → 3 %). Fix a moves part of the remaining 3+ buổi to tối: the heavy tối buổi are festival days (must-cards "Tết … · Lời mời", "Thi tài …", never moved) plus a morning card that waited all day ("Thỉnh bình an mạch", "Bổng lộc tháng" shown at tối). That is the worker's open question 3 (festival days); owner/coordinator call, not a blocker.
Note (main, not this branch): rand bots on current main end lives by TIMEOUT; the harness then counts the cards of that life as "lost" (OFF 394, ON 279/58). It happens with D13 off too, so it is not a D13 loss; the worker's "rand lost 0" was on an older main.

## Other checks
| check | result |
|---|---|
| spread-e2e A (755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3), B (origin/main save → this build at 755x1000 + 1180x820), C (save with waiting cards → reload → same cards wait and are shown 2/2) — final build | **PASS**, 0 page errors, no horizontal overflow (run with file:// base: python http.server serves dev/index.html without charset and the page breaks) |
| coop-e2e (live Worker), final build | **59/59** (also 59/59 on the two earlier merges). D13 is off in co-op (`SP13.off()` on `COOPW.on`); shared buổi timer untouched |
| roster_audit sens 6 shard 0 (D29 + D13), main a5d9d2bc build | 5 728 checks, all (a)–(r) 0, page err 0 |
| roster_audit rand 6 shard 4, main 9ddb3f6c build | 20 447 checks, (g) **4**: `sgpick` cards (main's new jsgame.js, D34) carry a consort and are not declared to the j95b motive gate. Not D13: schedules3-r2 was built before jsgame reached main → **schedules3 must cover sgpick** when it re-merges main |
| numbers in BAL | yes after fix b (BAL.spread in jbal2.js) |
| kit / VANPHONG | no UI, no player-visible text added (checked the diff); a screenshot at 755x1000 and 1180x820 mid-game: no page error, no overflow (the night card-flip overlay was on screen) |
| old saves | B above: PASS; saves without S.sp13 load (z.q absent → empty list) |
| j68 interplay | optional cards left to j68 (as the worker says); j68 cooldown drops 177→196, hold-full drops 167→67 (sens 8) |

## Owner / coordinator questions from the worker (unchanged; my view)
1. D13 in co-op once the ledger is shared (D21): yes, with the ledger.
2. j68 "hold full" drops into the D13 queue: recommend yes (drops fall 167→67 already with D13).
3. Festival-day cap: see histogram note; recommend festival days allow cap+1 rather than pushing morning cards to tối.

DEPENDS ON: review/schedules3 (D29 ledger, its jk95/j95/j95b/j95c/jqsave files are inside this branch). schedules3-r1 = FAIL, schedules3-r2 (4ea772f3) = fix pass, NOT yet reviewed. A future PASS of spread-events needs schedules3-r2 (or later) PASSed and landed first, or both landed together; schedules3 also needs main's jsgame `sgpick` declared to the j95b gate (roster_audit (g) 4 above).

FAIL
1. D13 makes j70 skip plot-warning cards ("Mưu hại" seen: 2–4× fewer, show70 Q-length gate sees the unplanned queue during the buổi change); fix at the root for the whole family of Q-length gates (j70:265, j68:90, j72:232, jpet:129, jkc:305) and give a per-generator cards-created table OFF vs ON (sens + rand).
2. Start from review/spread-events-r1 af64214f (keeps reviewer fixes a + b), re-run the full table (histogram, cross-tuần check = 0, lost, roster_audit, spread-e2e, coop-e2e) on the re-merged build.
