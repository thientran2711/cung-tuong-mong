# review/spread-events-r3 — independent review of review/spread-events-r2 @ ee684b8d (D13 spread world events across the buổi, fix pass for r1 FAIL, Foreman B)

Reviewer branch: **review/spread-events-r3 @ 1c4ea5810b79efd8a9c4da4d52ee0f8ad95af80d** = review/spread-events-r2 ee684b8d + origin/main **50299942** (latest at writing; merges of 0ee35a63, 5682ce6f, 50299942) + 2 reviewer fixes. Site rebuilt.
Merge conflicts: dev/build/assemble.py (main's list kept; jk95 after jk2b; j95, j95b, j95c, jqsave, jspread just before jkpc, as before) and built files (rebuilt). New main modules since r2: jnwp/jnwq/jlant/jtitle/jpres (before jspread) and jmood/jcmaid/jcoopask/jpromsv (after); only jmood wraps endTurn (runs inside nextBuoi → planned); none wraps nextBuoi/showModal/evGate, none has a Q-length gate.

## DEPENDS ON / LANDING ORDER (read first)
This branch carries review/schedules3-r2 code (jk95, j95, j95b, j95c, jqsave: identical to schedules3-r2 4ea772f3 and schedules3-r3 ec649e19). schedules3 is **NOT on main and NOT PASSED** (CLAIMS: schedules3-r3 reviewer session_011xDdVSrR85tR6K2xGkaryw RUNNING, no report yet).
**schedules3 must PASS and land first (or both land together after a schedules3 PASS). Do not fast-forward main to this sha before that.** Two schedules3 items found here, for Foreman C / the schedules3-r3 reviewer:
- **S1 bot TIMEOUT is schedules3's, not main's and not D13** (the worker's r2 claim "main's bug" is wrong). rand bots, 8 lives per run, same harness (dev/measure/spread_hist.js, inpage6):
  | build | lives | TIMEOUT lives |
  |---|---|---|
  | origin/main 0ee35a63 alone (shards 0, 1, 2, 4) | 32 | **0** (lost cards 0) |
  | schedules3-r3 ec649e19 alone, no jspread (shards 1, 2) | 16 | **6** |
  | this branch, D13 OFF (`__spreadOff`) (shards 0, 1, 2, 4) | 32 | **10** |
  | this branch, D13 ON | 32 | 8 |
  Stuck state each time: the jsgame (D34) scheme overlay stays open on its intro ("Tung tin đồn: Truyền lời … Phần 0/10 Hồi – Còn –", or "Thời cơ"), Q empty, nothing pressable for the bot. Intermittent (a later 24 lives on schedules3-r3 had 0), so it may be a harness/timing interaction, but it only appears with the schedules3 code; schedules3 must find out whether a player can be stuck too.
- **S2 roster_audit (g) — main's new card kinds not declared to the j95b motive gate:** rand 6 shard 4: `sgpick` (jsgame, already reported in r1) 1; sens 6 shard 0 on main 5682ce6f: `cmBrawl` 1 + `cmScorn` 2 (main's new jcmaid.js). Same family: schedules3 must declare every card kind that carries a consort (scan all, LUẬT SỬA CẢ NHÓM) when it re-merges main.

## r1 FAIL items — verified
1. **Q-length gates see the same queue as with D13 off — yes.** Scan (`grep -E 'Q\.length *[<>=!]+ *[1-9]'` over every assembled module): j70 show70, j68 e68Tick, j72 q72Tick, jpet petMonth, jkc kcWeek, jthaiy routine, j71 merit, jreign — the worker's list is complete; main's new modules add none. Root fix (sp13Pre: dry evGate + j95bPurgeWarn at each blocked showModal; the modal READS open from the first card) checked in code: Q is never shifted by showModal (j3), so the sifted Q equals OFF. Gate pass rates (calls with Q<=2), my runs: e68Tick OFF 66 % / ON 65 %; show70 42 % / 41 %; jthaiy Q<3 OFF 74–80 % / ON 77–79 %.
   Per-generator table, my runs (cards created per 100 tuần; per-shard spread in brackets):
   | generator | sens OFF (11 runs, 3 174 tuần) | sens ON (11 runs, 3 131 tuần) | rand OFF (4, 778) | rand ON (4, 806) |
   |---|---|---|---|---|
   | j3 dilemma | 14.1 (11–19) | 13.4 (12–16) | 11.4 | 9.7 |
   | j68 e68Tick | 11.7 (8–15) | 11.9 (8–15) | 10.8 | 9.7 |
   | j70 show70 (all) | 17.2 (14–22) | 16.0 (11–19) | 8.0 | 7.7 |
   | j70 "seen" (Mưu hại, she learns a plot) | 6.0 (4–8) | 5.9 (5–8) | 1.0 | 1.2 |
   | j70 "aft" | 9.0 | 8.0 | 0.3 | 0 |
   | j71 merit | 5.0 | 5.0 | 5.4 | 5.6 |
   | jpet petMonth | 1.5 | 1.7 | 0.1 | 0.1 |
   | jthaiy routine | 23.3 (20–27) | 22.2 (19–24) | 19.0 | 16.4 |
   | reviewer's count: pending seen/warn plot stopped by the Q gate | 351/1 319 (27 %) | 303/1 224 (25 %) | 9/29 | 3/27 |
   All within noise (per-shard ranges overlap; differences change sign between batches, e.g. jthaiy ON −2.4 in batch 1, +3.3 in the final batch). jthaiy checked directly: the gap is in how often routine() runs (servant / out-of-palace lives), not in its Q gate. The r1 defect (seen 2–4× fewer) is gone.
2. **Re-run on the merged build** — histogram (world cards per buổi, sens 11 runs): sáng 3.29 → 1.62 mean, 3+ **58.8 % → 1.3 %**; trưa 0.43 → 1.12 (3+ 0 %); chiều 0.59 → 1.03 (3+ 0.8 → 1.1 %); tối 0.54 → 0.93, 3+ **1.6 % → 6.3 %**. rand: sáng 3+ 12.3 % → 0.2 %, tối 3+ 0 → 1.0 %. Lost 0, late 0, early 0, page errors 0 in every sens run (rand "lost" = cards of TIMEOUT lives, see S1).

## Reviewer fixes on review/spread-events-r3 (commit 836917161)
| # | finding | fix |
|---|---|---|
| a | r2's dry `evGate(1)` goes through j61's evGate wrapper, which calls `k61Shown(Q[0])` = a face-reveal / "meeting" (log line "Người ấy hiện ra trước mặt ngươi") for a card that is not drawn; when D13 then moves that card to a later buổi, she meets the person buổi(s) before the dialog (4 per 108 tuần, e.g. "Mưu hại", "Quà tặng", festival "Lời mời"). Breaks the face-reveal r1 rule ("only the dialog that is really drawn"). | j61: `evGate=function(dry){…if(!dry)k61Shown(Q[0])…}`. After: k61 on a moved card **0** (2 900+ tuần). |
| b | j95b `after()` (after nextBuoi / endTurn) calls its INNER showModal when a false warning is purged and the modal reads open → the modal is really painted in the middle of the change (≈4 per 290 tuần), before planning; if planning then moved that card, the screen would show card A while Q[0] = B (options act on B). Measured displaced 0, but nothing prevented it. | jspread nextBuoi wrapper: remember the card really on screen before sp13Tick; if Q[0] changed, repaint. Guard only; displaced still 0. |
Also noted, harmless: the modal READS open with an empty Q after a dry sift empties it (~100 per 290 tuần) — callers only skip a showModal that would do nothing; jspread shows the next card after the change.

## Other checks (final build)
| check | result |
|---|---|
| spread-e2e A (755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@2, 390x844@3), B (origin/main 50299942 save → this build), C (reload keeps waiting card, shown later 1/1) | **PASS** on each of the 3 merges, 0 page errors, no overflow (file:// base) |
| coop-e2e (live Worker) | **59/59** (twice: main 0ee35a63 and 5682ce6f merges); D13 off in co-op |
| roster_audit | sens 6 shard 0: (a)–(r) 0 except (g) 3 (cmBrawl/cmScorn, main's jcmaid — S2); rand 6 shard 4: (g) 1 (sgpick — S2) + TIMEOUT lives (S1). None is D13. |
| screenshots 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390, 390x844 (looked at each) | game screen + a world card open; 0 page errors; documentElement no horizontal overflow; 390x844 shows "Xoay ngang điện thoại để chơi" |
| kit / VANPHONG | no UI, no player-visible text added by D13 (diff) |
| one core | BAL.spread only (cap 2, maxWait 4, codeWait 2) |
| old saves | B above; saves without S.sp13 load |

## Open question 3 (festival-day cap) — my judgement
tối 3+ rises from ~1.6 % to ~6–7 % of tối buổi (sens). Of the heavy tối buổi sampled, ~70 % are festival days (fixed-day must cards "… · Lời mời", "Thi …"), the rest are tuần-bound warnings ("Tai mắt báo tin", "Mưu hại", "Sau vụ mưu hại") forced at the last buổi of their tuần by r1 fix a. Acceptable: the morning pile (58 % of mornings with 3+) is gone and tối 3+ stays rare; not a blocker. Recommendation unchanged: festival days allow cap+1 in sáng/trưa so their cards do not spill to tối (owner/coordinator call).

## Verdict
**PASS 1c4ea5810b79efd8a9c4da4d52ee0f8ad95af80d** for D13 (descends from origin/main 50299942) — **land only after schedules3 PASSes and lands (or together)**; the schedules3 items S1 (TIMEOUT in jsgame overlays, schedules3 code only) and S2 (sgpick, cmBrawl, cmScorn not declared to the j95b gate) belong to schedules3, not to this branch. If main moves again before landing, re-merge (built files + assemble.py only so far) and re-run spread-e2e.
