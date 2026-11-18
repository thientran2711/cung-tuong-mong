SẴN SÀNG KIỂM 48e5a9c71146726a002e84b467fa6a7b2bfe05b2

# seatcap — rank seat caps never exceeded (worker session_01DgYSWpxkS6i8grXTbHQnPF, Foreman D)
Branch review/seatcap = origin/main 18fb8252 + merge review/promo-skip-r1 c53abdec (reviewer PASS 7453911c; reused promoFullSeat =
the OD:L1228 full-seat compensation) + the seat fix. Site rebuilt (index.html, sw.js). Full tables: dev/PROGRESS_review-seatcap.md (copied below the line).

## What changed
- NEW dev/build/jseat.js (loaded last): ONE seat rule seatHas / seatDown / seatPut / seatUp / seatComp(=promoFullSeat) + seatSettle (net after
  every turn, on load (normAll) and on a new life (start)). BAL.seatCap === j30 SEATCAP (one object; no second literal).
- Roads routed through it: j8 punish + deathSentence (also the fallen Hoàng hậu, who was always set to rank 6), j8 fall, j4 father executed,
  j30 demote, j67 e67drop, jreign rgPurge, j14 restore (Hoàng hậu back only if the seat is empty), j72 letter pardon, j34 contestEnd
  (seat filled during the 3 rounds → compensation instead of a forced rank++), jkc kcEnter. Son direct rank + grace exam: promo-skip-r1.
- Old saves over cap: on load the NPC who came last steps down to the highest free rank + gets the full-seat compensation (gain/loss);
  her rank and the co-op friend's are never taken by the net; the co-op guest's net does nothing (host decides).

## Tests
Idle 21 lives × 120 months: max holders ≤ cap every month (before: rank 5 ×4, rank 6 ×3, 340 over-cap months in 3 lives).
Active smart bot 2 real lives / 281 months: 0 over. Old save (rank 6 ×3, 5 ×4): settled on load, 24 months 0 over.
coop-e2e 59/59. 0 page errors. No UI change, no kit part.

## Notes for the coordinator
1. Merge order: this branch contains review/promo-skip-r1 (PASS); ship that first or together.
2. Co-op (told the coop-b1b5-p2 worker): jcoopworld.js:77 lets a friend Hoàng hậu enter as rank ≤6 when the local world already has one,
   so the host net then moves an NPC out of rank 6 for her. Two Hoàng hậu in one room is a co-op rule question for that worker.
3. 20+ lives: 21 idle lives (10 years each) + 2 active lives; the active bot is slow (~29 min/life), so more active lives were not run.

---
# PROGRESS review/seatcap — rank seat caps never exceeded (Foreman D, worker session_01DgYSWpxkS6i8grXTbHQnPF)

Task: in long sims the j30 SEATCAP seats were over cap (rank 6 ×2–3, rank 5 ×3–4, rank 3 ×7), with the maid line off too. Find every road that
sets a consort's rank, make them all ask ONE seat check from the one table, repair old saves that are already over cap (gain and loss).

Base: origin/main 18fb8252 + merge review/promo-skip-r1 c53abdec (reviewer PASS 7453911c; it brings promoFullSeat = the OD:L1228 full-seat
compensation, which this branch reuses instead of writing a second rule; it also puts seat checks on the son's direct rank and the grace exam).

## Root causes found (tracer in dev/test/seatcap-sim.js: every write that pushed a rank over cap, with its source)
| # | road | before | fix |
|---|---|---|---|
| 1 | grace exam passed (jexam exGraceUp, son/daughter grace) | rank++ with no seat check | promo-skip-r1: seatFree before exGraceUp |
| 2 | first prince direct rank (jexam exDirectUp via exSonUp) | rank++ with no seat check | promo-skip-r1 promoReward: full seat → promoFullSeat |
| 3 | punish / deathSentence one rank down (j8) | rank-- into a full rank; a fallen Hoàng hậu always set to rank 6 | seatPut(p, seatDown(p, rank-1)) |
| 4 | fall (proven crime) two ranks down (j8), father executed (j4) | rank-2 into a full rank | seatDown |
| 5 | demotion review (j30 demote) | rank-- into a full rank | seatDown |
| 6 | story drops: j67 e67drop, jreign rgPurge | rank-1 into a full rank | seatDown |
| 7 | out of lãnh cung with a rank: her restore (j14), j72 letter to the Emperor | old rank back even if the seat was taken (also a 2nd Hoàng hậu) | seatDown; Hoàng hậu back only if the seat is empty |
| 8 | seat contest end (j34 contestEnd) | forced rank++ after 3 rounds even if another road filled the seat meanwhile | seatHas first; full → promoFullSeat (no rank) |
| 9 | palace maid entering as consort (jkc kcEnter) | rank ≤2 (no cap) | seatDown (harmless, same rule) |
| 10 | NPC pardons (j7, j8, j14 coldMonth) | to Đáp ứng | no cap at rank 0: unchanged |
| 11 | old saves already over cap; any road not listed | — | seatSettle on load (normAll), on new life (start) and after every turn |

## ONE CORE
- Seat counts: j30 `SEATCAP` = `BAL.seatCap` (same object, jbal2). No other literal.
- jseat.js (loaded last): `seatHas(p,r)`, `seatDown(p,r)`, `seatPut(p,r)`, `seatUp(p,r)`, `seatComp(p)` (= promoFullSeat), `seatSettle()`.
- Net rule (seatSettle): rank with too many holders → the NPC who came to it last (lastPromo, then lowest seatPickW) steps down to the
  highest rank with a free seat and gets the full-seat compensation (Bạc ×stipend, gifts, phong hiệu, family; the others' oán = the loss).
  The player and the co-op friend entry are never pushed out by the net; on the co-op guest the net does nothing (host decides the world).

## Tests (see the report for the tables)
- dev/test/seatcap-sim.js (idle, kept alive; per-month max holders per rank + tracer)
- dev/test/seatcap-active.js (measure smart bot inpage6 "sens", real lives)
- dev/test/seatcap-oldsave.js (save made on origin/main with rank 6 ×3, rank 5 ×4 → load here)

## Results (cap: Hoàng hậu 1 · Hoàng quý phi 1 · Quý phi 2 · Phi 4 · Tần 6)
Max holders per rank over all months of all lives (idle = she does nothing, kept alive, 120 months each, origins rotate over all 9):
| run | lives × months | Tần (3) | Phi (4) | Quý phi (5) | Hoàng quý phi (6) | Hoàng hậu (7) | months over cap |
|---|---|---|---|---|---|---|---|
| BEFORE origin/main (idle) | 3 × 120 | 5 | 5 | **4** | **3** | 1 | rank 4: 3 · rank 5: 163 · rank 6: 174 |
| promo-skip-r1 only (idle) | 3 × 120 | 4 | 3 | 2 | **2** | 1 | rank 6: 20 |
| AFTER review/seatcap (idle) | 21 × 120 (2520 months) | 6 | 4 | 2 | 1 | 1 | **0** |
| AFTER, active smart bot (measure inpage6 "sens", real lives + save round trips) | 2 lives, 281 months | 3 | 2 | 2 | 1 | 1 | **0** |
| AFTER, old save over cap (rank 6 ×3, rank 5 ×4 incl. her) | load + 24 months | settled on load: 6→1, 5→2 (she kept Quý phi); 4 NPCs moved down, each Bạc +700, a phong hiệu | | | | | **0** |
Tracer after the fix: only one-statement artefacts (a cold-palace pardon flips `out` the line before rank=0; seatPut clears `queen`
the line before the rank) — no road leaves a rank over cap at the end of a turn; seatSettle moved nobody in the idle runs.
coop-e2e: 59/59 passed. No page errors in any run. No UI change (texts go through log/news; no new kit part).
Note: __mloff (maid line) is not on main yet; the over-cap seen with __mloff=1 came from roads 1–8 above, which do not depend on it.

## Status
SẴN SÀNG KIỂM (see dev/handover/reports/seatcap.md on the handover branch).
