# review/spread-events-r2 (D13 spread events, fix pass after reviewer FAIL r1, Foreman B) — worker report
Branch **review/spread-events-r2 @ ee684b8d67aa1431748617c759d14c91528538fa**. Start: review/spread-events-r1 af64214f (reviewer fixes a + b kept).
Merged origin/main **ee5d33de** (conflicts only assemble.py + built files: main's list, jk95 after jk2b, j95/j95b/j95c/jqsave/jspread before jkpc).
schedules3: review/schedules3-r3 ec649e19 = r2 4ea772f3 + an older main merge, no new code, so nothing to rebase on; this branch still carries
schedules3-r2's files (DEPENDS ON schedules3 as before). Full tables: dev/PROGRESS_spread-events.md "Fix pass r2".

## FAIL 1 — fixed at the root for the whole family
Scan of absolute queue-length gates in code that runs inside a buổi change: j70 show70 (Q>2), j68 e68Tick (Q>2), j72 q72Tick (Q>3), jpet petMonth
(Q>2), jkc kcWeek (Q>2), jthaiy routine (Q<3), j71 merit (Q<=5), jreign (Q<=1); j3 dilemma is relative (not affected). Main's new modules add none.
Cause: without D13 the first showModal of the change sifts the queue (j68 evGate holds/drops extra optional cards, j95b drops false warnings) and
then the modal is open, so callers skip/re-call showModal; D13 blocked that showModal, so the gates saw the unsifted pile.
Fix (jspread.js + a `dry` flag on j68 evGate): a blocked showModal in the change runs the same sifting without marking anything shown, and from the
first card the modal READS as open to game code (JS getter on #modal.hidden while SP13.vo; no DOM change, nothing painted; cleared when the
outermost nextBuoi returns). So every gate, current or future, sees the same queue as without D13; D13 paces only after the generators ran.
| sens bots, merged build, 864 tuần each side (before = r1 build, 576 tuần) | OFF | ON before (r1) | ON after (r2) |
|---|---|---|---|
| e68Tick gate passes (Q<=2) | 66 % | 12 % | 67 % |
| show70 gate passes (Q<=2) | 41 % | 7 % | 47 % |
| reviewer's count: pending seen/warn plot stopped by the Q gate (s2+s5) | 50/202 (25 %) | 95/249 (38 %) | 56/234 (24 %) |
| cards / 100 tuần: j68 e68Tick | 13.1 | 2.3 | 13.0 |
| j70 show70 (all beats) | 15.9 | 8.2 | 19.0 |
| j70 "seen" (Mưu hại, she learns a plot targets her) | 5.9 | 1.4 | 8.1 |
| jpet petMonth / jthaiy routine / j71 merit / j3 dilemma | 1.0 / 22.5 / 4.6 / 13.5 | 2.1 / 23.3 / 6.6 / 12.2 | 1.9 / 22.9 / 5.6 / 13.4 |
| pre-merge (3 sens runs, q72 on in one): j72 q72Tick / jreign | 40 / 13 | 18 / 1 | 46 / 12 |
| rand (shard 4, ~190 tuần): show70 / e68Tick | 29 / 23 | 5 / 2 | 29 / 11 |
| kcWeek (kcbot sens, 18 home lives, per 100 weeks) | 38.2 | — | 34.8 |
After-gate counts also depend on evBusy / rolls / plot trajectories and move both ways between runs (seen 57→37 pre-merge, 51→70 merged): within noise.

## FAIL 2 — tables on the merged build
| run (8 lives) | sáng mean / 3+ | tối mean / 3+ | trưa, chiều 3+ | lost | late/early | page err |
|---|---|---|---|---|---|---|
| sens s3 OFF → r2 | 3.09 / 56.7 % → 1.53 / 0.7 % | 0.47 / 0 → 0.87 / 4.9 % | ≤ 0.7 % | 0 | 0 | 0 |
| sens s2 OFF → r1 → r2 | 3.19/54.5 % → 1.05/3.7 % → 1.60/1.0 % | 0.51/1.0 % → 1.10/13.5 % → 1.03/8.3 % | ≤ 4.8 % → ≤ 0.7 % | 0 | 0 | 0 |
| sens s5 OFF → r1 → r2 | 3.20/58.2 % → 1.06/4.4 % → 1.62/0 % | 0.52/0.3 % → 1.14/12.8 % → 0.90/4.5 % | ≤ 4.1 % → ≤ 1.0 % | 0 | 0 | 0 |
| rand s4 OFF → r2 | 1.54/19.2 % → 1.10/0 % | 0.20/0 → 0.60/2.4 % | 0 | 0 / 210* | 0 | 0 |
*rand lost = cards of lives ending TIMEOUT: the bot is stuck on main's "Dò la: Nghe ngóng" minigame overlay (state dump); not D13.
tối 3+ (reviewer's 6–10.7 %): r1 12.8–13.5 % → r2 4.5–8.3 % (OFF ≤ 1 %). 54 of 64 sampled are festival days (fixed-day must cards), the rest hold a
morning card that waited all day or a warning kept in its tuần → open question 3 (festival-day cap), owner/coordinator call.
| test (merged build) | result |
|---|---|
| roster_audit sens 6 shard 0 | 6 277 checks, (a)–(r) all 0, page err 0 (pre-merge rand 6 shard 4: 2 249, all 0) |
| spread-e2e A (755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3), B (main ee5d33de save → this build), C (reload keeps waiting cards 1/1) | PASS, 0 page errors, no overflow; 390x844 shows the rotate prompt |
| coop-e2e (live Worker) | 59/59 (pre-merge 59/60: one 20 s friend-wait timeout, re-run 59/59); D13 stays off in co-op |
| site | rebuilt (index.html, sw.js, assets.json) |

## KIT REQUEST
None (no UI, no player-visible text).

## Open questions (unchanged from r1): 1 D13 in co-op with the ledger (D21); 2 j68 "hold full" drops into the D13 queue; 3 festival-day cap (see tối 3+).
DEPENDS ON: review/schedules3 (r2/r3) passing and landing first or together (as in r1).

SẴN SÀNG KIỂM ee684b8d67aa1431748617c759d14c91528538fa
