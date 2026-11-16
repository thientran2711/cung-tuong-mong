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

## Status
In progress — see dev/handover/reports/seatcap.md on the handover branch for the final result.
