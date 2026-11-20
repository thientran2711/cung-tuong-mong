# JAGDAY-WALK #1 — report (FOLLOW-UP GAP of walk-cost, MAIN ROOT-78 «GO … D job, whole», FOREMAN D #10)

PRIORITY #1 CHECK ('agWalkShort|deed walk|deed→deed|walk between deeds' + 'goTo|walk|travel'): OD L1976 (walks cost khắc) + LAW 1 / 6b | main: jagday.js agMore (old line 290) = the only deed placer that reserved travel(); jwalk.js never rewrites kept rows | review/* walk-cost-rv ffd22ea6 (base, LAND READY) — no other branch on this | claims none (prio1.sh: OD 0 | ledger 0 | main 0 | review/* 0).
START_CTX ≈ 4 % of 1M (get_session reads 0; own estimate).

Branch: review/jagday-walk from review/walk-cost-rv ffd22ea6 (walk-cost not yet in main at push time; main dd248d5 does not contain ffd22ea6). Commits: f37e8ce (fix + test 11) · 0ad4d4e (bearer walker) · 80d1cc4 (build).

## Cause (measured, not guessed)
A probe that keeps every row of every NPC khắc by khắc, plus hooks on agPlan / agPlanX / agSpill / agSeePlan / agSpan, found four writers of the bare deed jumps:
1. agSlot (jagent: day deed, jshelf «Ghé chơi», jagknow reactions) and agTickX (staff, Emperor, Thái hậu) picked a deed's khắc with NO walk from the row before / to the row after (only agMore did, kh = end + 1 + travel).
2. agSpill (a deed run on from the last buổi) took khắc 0 … AFTER the day deeds of the new buổi were already placed next to it.
3. The DAY PLAN labels her whole buổi «ag_<deed>» (agRow) before the deed is placed; where no deed was placed that label stayed — jwalk took it for a kept deed row and never walked her through it («ghost» deed rows).
4. agShNpc (host receives a visitor) turned a host's «on the way» rows into «ag_with» (she «received» while still walking); card-bound rows (J95B «here / visit») were neither kept by jwalk nor seen as fixed by the planner.

## Fix (one rule, jagday DEED WALKS block)
- `agWalkShort(R,id,kh,kc,at,walker,cur)` = the khắc short for a deed at `at`, khắc kh … kh+kc−1: from the last HELD row before it (whole khắc after it — agMore's convention) or the khắc now (spent walking — agHeard's convention), and on to the next held row after it. travel() per walker (BAL.walk.near / far + BAL.walk.pen of THAT person, j9). `agWalkOk` = short is 0.
- HELD row (`agWalkHeld`): a pending deed's window, a reaction (ag_see:*), a bearer's road (ag_tell), a host (ag_with), a card binding (agBound), a forced list / meeting (tryst, meet, offduty, laundry, confined, cold, called). A day-plan label with no deed behind it is FREE.
- Every deed placer asks it: agSlot (jagent), agTickX, agMore, agHeard (on-road part was there; now the walk ON fits too, and its walk uses the walker, was her penalty), agSeePlan (reactions), agShNpc (a host still on her road is not home to receive).
- GUARD `agWalkGuard` (j95fixHouse chain, before jwalk; and right after agSpillAll): a deed of this buổi NOT YET STARTED whose road was taken by a later fixed row moves to the first later khắc with road + free khắc (same deed, cost, place); none → dropped + agTouch (she re-plans, as any deed she can no longer do). A started deed never moves.
- jwalk: (a) «ag_» rows kept only when agWalkHeld says so (frees ghost plan labels), (b) card-bound rows are kept (were rewritable), (c) a move decided IN the khắc now (row of the khắc now changed since the last pass, JWALK.seen) starts its walk now (arrive-later from the current khắc); a follower keeps whom she follows; j95s retinue counts a follower on her way (go + oid) as in the retinue and does not overwrite her road.
- TIN BÁO bearer: agWalk / knWalkTo take the bearer (her own «đi chậm»); a passer-by / messenger stays null.
- Off switch: BAL.walk.npc = 0 (same knob as jwalk). No new number, nothing typed (LAW 4). Host only (agOn / jagday) — co-op guest reads the host's record. Her own walk untouched.

## BEFORE / AFTER (same bot, 5 runs × 16 buổi each, built base ffd22ea6 vs this branch; far = travel ≥ 2)
| class of far move without its «on the way» khắc | before (ffd22ea6) | after |
|---|---|---|
| deed → deed (both ends ag_) | **18** | **0** |
| deed ↔ other (one end ag_) | 8 | 0 |
| follower joining an outing | 2 | 0 |
| errand rows (jptime ledger / servant errand) | 5 | 8 |
| all far moves without the road | 33 / 121 | 8 / 116 |
walk-cost test 5 (the existing jwalk bot): on 0/19 and 0/36 vs off 35/37 and 29/29. New test 11, 16-buổi scan: deed → deed 0 (off: 2–3).
Remaining 8 = errand rows written INTO the current / past khắc: jptime ptLedger (a timed errand writes [t0, due) at the target place, incl. khắc already shown; OD 18/11 ~20:05Z «seen walking off and back» — the window already holds the trip) and the j95s servant errands. Not jagday rows; touching the ptime ledger risks the landed invite-host-away / ptime gates → proposed FOLLOW-UP GAP below, not done here.

## Perf A/B (same box, 3 runs × 12 buổi, median)
j95fixHouse chain (roster pass incl. jwalk + guard): 0.34 ms → 0.36 ms per sync · j95sync per khắc 2.56 → 2.02 ms · nextBuoi 253 → 273 ms (noise band of earlier runs 166–304).

## Tests (one at a time, on the branch build)
walk-cost.test ALL OK (1–11) · ag-walk 10/10 · ptime ALL OK · ptime2 ALL OK · time-spill-guard PASS (static + runtime 46/0) · coop-e2e 68/68 · QUICKCHECK PASS (old save from live ok, core gates PASS, perf new/live render 259/283 ms, buổi 1569/1753 ms). tier.js = BIG (expected: jagday / jwalk / j95s logic).

## FOLLOW-UP GAP (proposed, for D → MAIN)
FOLLOW-UP GAP | jptime ledger (ptLedger) + j95s servant errands | S | an NPC sent on a timed errand is written AT the target place from khắc t0 (and back home at due) with no «on the way» khắc (~8 far moves / 80 buổi); the window already holds the trip. Fix in ptLedger: the first / last travel()−1 khắc of an NPC's window = road rows (still «errand», still away — law 6b), same per-walker travel.

SẴN SÀNG KIỂM review/jagday-walk 80d1cc41fecdf1f7059505c09fd329525797011a (TIER BIG)
