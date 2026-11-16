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
# REVIEW review/seatcap-r1 (reviewer opus, game rules/numbers, for Foreman D)
Result: PASS. Base: review/seatcap @48e5a9c7 merged onto origin/main e9c6021d (only conflicts: assemble.py file list + built index.html/sw.js;
resolved = main's list + jseat.js last, site rebuilt with dev/site/build_site.sh). No code change by the reviewer; added dev/test/seatcap-scan.py.

## Whole-family scan (LUẬT SỬA CẢ NHÓM): dev/test/seatcap-scan.py = every rank write in dev/build/j*.js (71 hits) on the merged tree
| road | where | goes through the seat rule? |
|---|---|---|
| promotion (her + NPC monthly, exam pass) | j8 promoteP ← j3 promote, j8 rivalsMonth, jexam exDone | yes: promoReqP has the j30 seat-free row (contest bypass __seatPick only after seatHas) |
| seat contest / single candidate | j34 contestOpen/contestEnd | yes: seatHas first, full → seatComp |
| grace exam / son direct rank | jexam exGraceUp / exDirectUp via promoReward | yes (promo-skip-r1, on main) |
| Hoàng hậu by decree / outsider queen | j8:409-410, j34:53, jbal:43 | only when the seat is empty (queenP() null) |
| demotion, punish, fall, father executed, story drops, reign purge | j30 demote, j8 punish/fall, j4, j67, jreign | yes: seatDown |
| out of lãnh cung | j14 restore, j72 letter | yes: seatDown, Hoàng hậu only if seat empty; NPC pardons → rank 0 (no cap) |
| entry exam ceiling | jkc kcEnter (≤2) | yes: seatDown |
| death / vacancy | holders() = consorts() (alive, not out) | seat frees itself |
| co-op guest / friend | jcoopworld:77/100/118 | guest net off (host decides); friend never pushed out (see note) |
| new life / roster / debug | j2 start (BAL.ps.harem), j99succ succDebug | seatSettle on start; debug only |
New main modules since 18fb8252 (jmort, jroute, jcycle, jorigins, jeitem…) write no rank: 0 hits.
ONE CORE: BAL.seatCap === SEATCAP (same object), no second literal.

## Tests re-run by the reviewer (built root index.html; dev/index.html alone does not boot, use the site file)
| test | result |
|---|---|
| seatcap-sim idle, 21 lives × 120 months (lives 0-20, all 9 origins) | max holders 3:5 4:4 5:2 6:1 7:1 · 0 over-cap months · tracer hits only one-statement artefacts (seatPut queen flag, j14 pardon out→rank0) |
| seatcap-oldsave (save from origin/main build, rank 6 ×3, 5 ×4) | settled on load 6→1, 5→2, she kept her rank, 4 NPCs moved with Bạc +700 + phong hiệu, 24 months 0 over, 0 errors |
| coop-e2e (live Worker) | run 1: 59/60 (FAIL "fold #next enabled … Chờ hảo hữu" timing right after rebirth; next check "week after rebirth advances" ok) · run 2: 59/59 → flake, not this branch |
| 6 viewports 755x1000@2, 1000x755, 1180x820@2, 1366x1024, 844x390, 390x844 | 0 page errors, no horizontal overflow; branch has no UI/kit change |
| VANPHONG | new texts ("ghế … đã đủ người, lui về …", "thắng, nhưng ghế … đã có người ngồi trước") cổ trang, no %, no numbers typed |
Active smart bot not re-run (worker: 2 lives / 281 months 0 over; ~29 min/life).

## Notes (non-blocking)
1. Co-op: a friend Hoàng hậu enters as rank ≤6 (jcoopworld:77); if she and the friend both sit at a cap-1 rank the net cannot move either (only NPCs move). Already passed to the coop-b1b5-p2 worker as a co-op rule question.
2. j8 son-birth fallback `rank++` (j8:321) runs only if promoReward is missing (it never is).
Re-merge: origin/main moved to 0ee35a63 during the review (merge-train-7 + skin-norosy-r1, adds jmline.js/jact2.js). Re-merged (assemble list = main + jseat.js last),
site rebuilt; scan unchanged (71 rank writes, no new road; maid → consort enters at rank 0 = no cap); idle sim 2 lives × 120 months 0 over, 0 errors.
