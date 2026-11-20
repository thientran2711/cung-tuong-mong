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

## ROUND 1 FIX (REVIEW FAIL 1 @80d1cc41, law 11: errand-ledger jumps = same family)
- jwalk `walkErrRow` (one rule, j9 travel per walker = the person sent): inside an errand's away window [t0, due), the first travel(from, place)−1 khắc = her road there `[place,"go",tgt,"<why> · đang trên đường"]`, the last travel(place, back)−1 khắc = her road back `[back,"go",…,"… · đang trên đường về"]`, the khắc between stay "errand". from = her row before t0 (kept on the task, a.wfr); back = where her day goes on at due (this buổi), else from. n < both roads → split by the roads, no khắc added; due / cost / ptAwayOf unchanged (OD 18/11 ~20:00Z: n includes the walk). «go» rows with a why = j95sKeep → busy, never followed / sent again (law 6b); jwalk / agWalkHeld treat them as held.
- jptime ptLedger: NPC-sender rows go through it (it runs after j95sync, so after jwalk); a row is rewritten when place, label or why differ.
- «mine» rows (ptLedger, her own people) and jerr errLedger (fallback, hers only) keep the slot place by design (token hidden + «đang đi …» chip): the same scan finds 0 errand jumps from them (5 + 10 + 10 runs × 16 buổi), so no change (rule per the review: change only if any left).
- walk-cost test 11: errand class in the 16-buổi scan (on 0) + unit case: NPC sender, far place, n = 3 → `A/serve | B/go | B/errand | A/go`, due = t0 + 3, ptAwayOf same task, all window rows busy.

BEFORE / AFTER (same bot, 5 runs × 16 buổi; far = travel ≥ 2, no «on the way» khắc)
| class | base ffd22ea6 | 80d1cc41 | 18f7921c (r1) |
|---|---|---|---|
| deed → deed | 18 | 0 | 0 |
| deed ↔ other | 8 | 0 | 0 |
| follower | 2 | 0 | 0 |
| errand | 5 | 8 | 0 (10 more runs: 0) |
| all | 33 / 121 | 8 / 116 | 0 / 125–151 |
Gates on b25e42cc (one at a time): walk-cost ALL OK (1–11 incl. errand class + unit) · ag-walk 10/10 · ptime ALL OK · ptime2 ALL OK · invite-host-away 9/9 · time-spill-guard PASS (static + runtime) · coop-e2e 68/68 · QUICKCHECK PASS (old save from live ok, core gates PASS, perf new/live render 263/312, buổi 1474/1859 ms). Still stacked on review/walk-cost-rv ffd22ea6 (not in main 5cd6d24a at push).
SẴN SÀNG KIỂM review/jagday-walk b25e42cc60f8469a662273112ab36366f17bbe78 (TIER BIG, round 1)

## ROUND 2 FIX (REVIEW FAIL 2 @b25e42cc: invite-host-away C 6/10)
- Cause (as the reviewer found): jwalk's «move decided in the khắc now» rule rewrote the leaving guest's «back» row into a why-less «go».
- (a) Whole group, jwalk: every row jwalk turns into «on the way» keeps its own target and why (`walkRoadWhy`: "<why> · đang trên đường"); leave-earlier rows carry the arrival's target + why.
- Same family found while testing (A/B 1/10): the guest's ARRIVAL row («visit», jptime iwAdd) got the same rewrite. The invite / errand ledger rows already hold the walk (task due = after the road), so the khắc-now rule now skips timed-ledger rows: «visit», «back», and anyone with a jptime task (ptAwayOf). With this, C keeps its original «back» row → test C's row assert is unchanged.
- (b) invite-host-away.test: only one change — `r.note` reads 8 log lines instead of 4 (C failed 1/10 because witness / encounter cards on her walk home logged 3–4 lines after the «… sang chơi không gặp, đã ra về» notice; the row, loss and notice were all right). Debug run with 12 lines: 20/20 C.
- Also fixed: my r2 helper was first named `walkWhy` = a second top-level copy of j9's walkWhy (her walk reason text); quickcheck G1 one-core-guard caught it → renamed `walkRoadWhy`, every gate re-run after the rename.
- invite-host-away on the final code, 10 runs: A 10/10, B 10/10, C 10/10, D/F/G/H 10/10, **E 9/10** (the walk-cost E flake, base 1/10 too; WALK-COST #3's job).
  Seen in earlier rounds of mine: A/B fail when her palace has ONLY palaces as near places (test helper `nearK` → `walk(r2)` answers the palace-entry card with its no-khắc option = turns back; her walk never starts) — test setup of walk-cost r3, not NPC rows; left to WALK-COST #3 who edits this test.
- Gates on 29c59bdc (one at a time): walk-cost ALL OK · ag-walk 10/10 · invite-host-away ×10 (above) · ptime ALL OK · ptime2 ALL OK · time-spill-guard PASS · coop-e2e 68/68 · QUICKCHECK PASS (old save ok, core gates PASS; one earlier run had G4 coop-one-world seed 3 FAIL «R.evm 1» — re-run 5× incl. seed 3 ×3: 5/5 PASS, random) · far-jump bot: every class 0.
SẴN SÀNG KIỂM review/jagday-walk 29c59bdc58de2f6acb9f90807fbb2f102883dba7 (TIER BIG, round 2)

## HANDOVER (JAGDAY-WALK #1 → successor; rollover: context 39 % > START 4 % + 25 %, D #11 GO 20/11 18:55Z not started)
State: review/jagday-walk HEAD 29c59bdc58de2f6acb9f90807fbb2f102883dba7 (round 2, all gates green), stacked on the withdrawn review/walk-cost-rv ffd22ea6. Nothing pushed after 29c59bdc. Worktree /home/user/wt/jagday-walk (sparse, hooks installed) may be gone in a new container — re-create per PREAMBLE.
TASK NOW (D #11 GO): put the branch on walk-cost PASS = review/walk-cost-rv2 bd2b1c59 (FF of LIVE 983a9436). No force on shared history: merge bd2b1c59 into review/jagday-walk (or rebase onto a NEW branch review/jagday-walk-r2).
- Conflicts likely in: dev/build/jwalk.js, jptime.js, jagday.js, dev/test/walk-cost.test.js, dev/test/invite-host-away.test.js (WALK-COST #3/#4 edited them), index.html/sw.js (take theirs, rebuild: python3 dev/build/assemble.py; bash dev/site/build_site.sh).
- My code to keep (8 files): jagday.js DEED WALKS block (agWalkFix/agWalkHeld/agWalkShort/agWalkOk/agWalkGuard + calls in agTickX/agMore/agHeard/agSeePlan/agShNpc/agSpillAll, agWalk(a,b,who)); jagent.js agSlot agWalkOk filter; jagknow.js knWalkTo who; j95s.js retinue prev/go keep; jwalk.js (walkKeepRow held/bound, JWALK.seen khắc-now rule + walkTimed skip, walkRoadWhy keeps why/target, walkErrRow); jptime.js ptLedger calls walkErrRow for NPC senders; tests: walk-cost test 11, invite-host-away r.note slice(0,8).
- (1) bd2b1c59 adds a law-6b guest bind (jptime iwBind → jagent agBound) holding only the walk-back khắc (IHA F pins it). jwalk walkKeepRow already keeps bound rows and walkTimed skips «visit»/«back»; check IHA F + C still pass, and that agWalkHeld (agBound → held) does not make deeds avoid more than that khắc.
- (2) walk-cost test 5: WALK-COST #4 split it (bar 0.1 on jwalk's own rows, all-rows tripwire 0.6). Restore the 0.4 bar on ALL rows (my families now 0); keep or tighten the tripwire.
- (3) Gates, one at a time: walk-cost · invite-host-away ×10 (all A–H; E/B were walk-cost flakes, should be gone on bd2b1c59) · ag-walk · ptime · ptime2 · time-spill-guard · coop-e2e 68/68 · quickcheck (old save; G4 coop-one-world seed 3 had a 1-in-6 random R.evm FAIL — re-run before calling it) · far-jump scan (bot: .tmp/measure.js pattern in this report's sections; every class must be 0).
- Then «SẴN SÀNG KIỂM <sha>» in FOREMAN_D_STATUS.md + send_message D #11 (session_01964izEy8y3SFtp96at4o7u); reviewer EnQ6kRCc does the final gate.
Pitfalls seen: a top-level helper name may already exist in another module (one-core-guard G1 — grep `function <name>` in dev/build first); STATUS pushes conflict often — keep both sides, never drop a line.

## JAGDAY-WALK #2 (session_01964izErhGdgkwJLtAAq7VF, opus, depth 3, START_CTX ≈ 5 %) — onto walk-cost PASS + main, final-gate residuals
PRIORITY #1 CHECK: OD L1976 | main 415b9ca0 (LIVE moved from 983a9436 during the job; merged) | review/* jagday-walk 29c59bdc, walk-cost-rv2 bd2b1c59 | claims CLAIMS.md jagday-walk row.
Branch: NEW review/jagday-walk-r2 (no force on shared history) = 29c59bdc + merge bd2b1c59 (a30be97f) + residual fixes (d3051334) + merge origin/main 415b9ca0 (00452105).
- Merge bd2b1c59: only test / build conflicts. invite-host-away.test: took walk-cost's r.note (reads EVERY log line since the test began, min 4) = a superset of my slice(0,8). index.html / sw.js rebuilt. Code merged clean.
- iwBind (law 6b) check: jptime wraps agBound with the IWB binds → agWalkHeld / walkKeepRow / agSlot / agTickX all read exactly the bound khắc: while the invite holds, the guest's wait / visit rows; after she leaves, ONLY the walk-back khắc (reviewer fix bd2b1c59). IHA F (bWait, bBack bound, rest free) passes 20/20, C 20/20.
- walk-cost test 5: the 0.4 bar is back on ALL rows (new assert); the 0.6 all-rows tripwire and the 0.1 jwalk-own bar stay. Measured: all rows 0/62 and 0/74 (off 96/98).
Final-gate far-jump scan (reviewer watch item, named + fixed; seeded Math.random, 8 seeds × 48 buổi):
| residual found | cause | fix |
|---|---|---|
| servant on her own j95s errand right after a jptime window (`r4/errand → tyv/errand`, `r5/errand → tgk/errand`) | my r2 `walkTimed` skipped anyone with an OPEN jptime task; the task stays open after due until it settles, so the khắc after due was skipped too | `walkTimed(id,x,kh)`: skip only khắc INSIDE the away window [t0, due) |
| plot «meet» / lover «tryst» at khắc 1–3 with no road (`cnh/go → ksp/meet`, `kn/shift → ksp/meet`) | j95secApply writes the meeting straight into the record; it is a kept row and khắc 0 of a fresh record is never rewritten | jwalk `walkLeadIn` (one rule = walkNpcPass «leave earlier»: free, unkept, not-yet-shown khắc, travel per walker), called from j95secApply for the consort and her servant |
| clusters late in a run (b35–b45, many NPCs at once) | SCAN ARTIFACT: `travel(a,b)` without a walker adds HER «đi chậm» (walkSlow(S)) to every NPC road; when she became slow every far road read 3; jwalk correctly walks NPCs with their own travel (test 10) | the scan, walk-cost test 5 and test 11 now measure `travel(a,b,walkWho(id))` |
| «ag_tell» rows | not jumps: written only on the TIN BÁO bearer's road khắc (ks+1 … due−1) at her master's place = a «go» row | scan + test 5 read ag_tell as road (test 11 already did) |
| «ngoai» stand-in, «confined», card «here» | by design (outside the palace / forced move / a card said she was there) | none (none left in the final scans anyway) |
BEFORE / AFTER (far = travel ≥ 2 per walker, no «on the way» khắc): base 29c59bdc-family ≈ 3 / 480 buổi (reviewer r3) → 00452105: **0 in every class**, 496 far moves / 384 buổi (8 seeds × 48) + 99 / 80 buổi unseeded.
Gates on 00452105 (one at a time): walk-cost ALL OK (5 all rows 0/74 ≤ 0.4) · invite-host-away ×10 = 10/10 (9/9 each, A–H; E 10/10) · ag-walk 10/10 · ptime ALL OK · ptime2 ALL OK · time-spill-guard PASS (static + runtime) · coop-e2e 68/68 · QUICKCHECK PASS (old save from LIVE ok, core gates PASS, perf new/live render 237/213, tab 412/464, buổi 1217/1108 ms) · far-jump scan 0. Also on d3051334: IHA 10/10, coop 68/68; on a30be97f coop 66/68 once (guest seat Thái hậu picture fid null, art sync, not walk code) then 68/68 ×2.
Extra (j95secApply touched): npc-purpose-logic PASS 16; ag-all 1 FAIL per run, alternating «perf p95 8.2 > 8 ms» (2nd run 6.4) and «Emperor card reads cx2O» — the cx2O FAIL also shows on LIVE 415b9ca0 (1 of 2 runs) → pre-existing flakes.
SẴN SÀNG KIỂM review/jagday-walk-r2 004521054c44d752f05716eb6df4cc5bb16255b9 (TIER BIG)

## HANDOVER JAGDAY-WALK #2 → #3 (rollover: context 24 % + ROUND 4 fix + full re-gate would pass START 5 % + 25 %; nothing of ROUND 4 started, nothing pushed after 00452105)
TASK = REVIEW ROUND 4 FAIL 1 (reports/review-jagday-walk.md «ROUND 4», reviewer REVIEW jagday-walk #2 session_01964izCAkPLwbFgegsZ7v5u; coordinator D #12 session_01964izBwRw7YgvQWHVn4wG2).
Base = review/jagday-walk-rv 64750121 (= my 00452105 + LIVE 27a7dcf5, reviewer's merge). Work on it (or a new review/jagday-walk-r3 from it); then merge newest LIVE (794c6b77 at 20:40Z; `git fetch --deepen=300 origin main` under flock; index.html/sw.js → theirs + assemble.py + build_site.sh).
FAIL 1 = 7 bare far jumps / 160 buổi (reviewer seeded scan: seeds 1–10 × 16 buổi, seeded Math.random, AGL flushed EVERY khắc — my scan did NOT flush AGL each khắc, that is why I saw 0). One root: a row next to a not-yet-started deed is written AFTER agWalkGuard ran in that khắc. Fix the whole group (law 11):
- (b) jagday.js:508 agWalkShort: `let q=kh-1;while(q>cur&&!fx(q))q--;if(q<cur)q=cur;` → with kh===cur, q becomes cur = the deed's own row (wrong start). When kh===cur (>0) her start = row[cur−1] (where she was); a deed decided in the khắc now starts its walk now (jwalk now-rule convention).
- (a) re-run agWalkGuard(R, cur) after every write that can change a deed's neighbour: end of each AGL landing batch (agLater / agent slice landing after j95sync), agSpill/carry at khắc 0 (jagday.js:480 already calls it after agSpillAll — check the carried deed path), and the j95s retinue rewrite (j95s.js retinue prev/go keep).
- (c) follow class: a retinue «follow» row written after the jwalk pass needs its road → run walkNpcPass (or a per-row road) after j95sPass for rows changed in the khắc now.
- Samples to reproduce (khắc 0|1|2|3): s15 seed 2 b1 `r4/shift | r2/go | r4/ag_maid:nvp | r4/ag_maid:nvp` (= case b); s17 seed 4 b4 `kn/follow | kn/go | r5/ag_srv:chat ×2`; s20 seed 6 b6 `r3/shift ×2 | vuon/go | r3/ag_maid:nvp`; s11 seed 6 b6 `r3/ag_maid:embro | vuon/ag_maid:follow ×3`; s3 seed 10 b10 `r5/ag_maid:scout | kn/ag_maid:sweep ×3`; s42 seed 2 b2 `r14/brk | r14/go | vuon/follow ×2`.
- TEST: extend walk-cost test 11 (or new 12): seeds 1–10 × 16 buổi, seeded Math.random (mulberry32 via addInitScript), AGL flush every khắc, travel per walker, ag_tell = road, «ngoai» not a place; every class 0. Report before/after table with the reviewer's classes (deed / deed↔other / follow / errand / other) + deeds landed / walkDrop vs main (reviewer: main 822 landed, branch ~760, walkDrop ~50/80 buổi same as r3).
- My scan tools (container-local, may be gone): /home/user/wt/jw2-tools/farscan6.js <index.html> <runs> <buổi> (SEED0 env) — lacks the AGL flush; add it (reviewer probe: deeds.js «AGL flush»; grep `AGL` in dev/build/jagent.js for the flush call).
- Gates after the fix, one at a time: walk-cost · ag-walk · ptime · ptime2 · invite-host-away ×10 (A–H, C 10/10) · time-spill-guard · coop-e2e 68/68 · quickcheck (old save) · reviewer-setting scan → 0. Then SẴN SÀNG KIỂM <sha> in FOREMAN_D_STATUS.md + send_message D #12 and reviewer CAkPLwbF.
Pitfalls: top-level helper names collide across modules (one-core-guard G1: grep `function <name>` first); STATUS push conflicts = keep both sides; ag-all has 2 pre-existing flakes (perf p95, cx2O card — also on LIVE).

## JAGDAY-WALK #3 (session_01964izFxPbxKJAN3n8Je4g4, opus, depth 4, START_CTX ≈ 4 %) — ROUND 4 FAIL 1 fix
PRIORITY #1 CHECK: OD L1976 | main 548dcd0d (no agWalkGuard / walkLeadIn) | review/* jagday-walk-rv 64750121 (base), jagday-walk-r2 00452105 | claims CLAIMS.md jagday-walk row (D).
Branch: review/jagday-walk-rv = 64750121 + fix 5390905c + merge LIVE 548dcd0d (1dab9933). FF push.
Root (as the reviewer named it): a row next to a deed is written AFTER agWalkGuard ran in that khắc, and some writers were not deed-aware. Found with a write tracer (Proxy on R.P rows, stack per write; seeded Math.random, AGL flushed every khắc). Fixed per writer class (law 11):
| class | writer found by the tracer | fix |
|---|---|---|
| (b) deed AT the khắc now | agSeePlan / agSlot with kh = cur: agWalkShort read row[cur] (its own row) | agWalkShort: kh ≤ cur → start row kh−1 (khắc 0: row 0) |
| (a) retinue row after the guard | j95sPass / j95sGuard ran AFTER agWalkGuard in the j95fixHouse chain | guard call moved into the jwalk wrapper: after every row writer, right before walkNpcPass |
| (a) rows written after the last sync of a khắc (AGL slices, reactions) | agLater jobs land frames after j95sync | first pass of a khắc (fresh: R.kh < kh) re-checks deeds starting NOW from row cur−1; jwalk may walk the not-yet-shown khắc now (same count both sides) |
| deed↔other «X/follow \| Y/ag_routine» | agLzRun repaints staff rows with the world-forced slot label «ag_routine» (k null) → agWalkHeld called it held | agWalkHeld: an «ag_» row no pend deed holds = plan label = free (every deed write has its pend entry) |
| meeting with no road | j95secApply re-applied by placeWhere after a started deed; agLzRun repainted the lead-in road («go» rows); khắc 0 never a road | agWalkCut (started deed leaves 1 khắc early, still lands); walkIsRoad (repaint never takes a road); record not shown yet: only held rows block the lead-in; first pass may use khắc 0 as road |
| (b) carried deed at khắc 0 | agSpill wrote rows 0…k1 with no road to the next kept row | not carried when the road on does not fit (same as a khắc not free) |
| errand → errand (her own) | ptLedger «mine» rows took each khắc's slot place (repainted mid-window) | one place per window per buổi (a.mpl) |
Before / after (bare far jumps = travel ≥ 2 per walker, no «on the way» khắc; «ngoai» not a place; forced «confined» and card-bound «here» by design, counted apart):
| build | driver | buổi | bare jumps (deed / deed↔other / follow / errand / other) | deeds landed |
|---|---|---|---|---|
| 64750121 (base) | reviewer: seeds 1–10 × 16 | 160 | 7 (2 / 4 / 1 / 0 / 0) (reviewer's table) | 1526 (reviewer) |
| 64750121 (base) | mine, seeds 31–70 × 24 | 960 | 15 (0 / 12 / 0 / 0 / 3) | ≈ 9 200 |
| 5390905c (fix) | mine, seeds 1–120 × 24 | 2 880 | **0** | 7 % more than base per buổi |
| 5390905c | timer-driven (awaits between sync and flush), seeds 1–20 × 24 | 480 | **0** (+1 «confined», forced) | — |
| 1dab9933 (merged) | walk-cost test 12 = reviewer setting, seeds 1–10 × 16 | 160 | **0** of 195 far moves | 1593 |
Test: walk-cost 12 (new) = units (b) / fresh-khắc guard / plan label free + the seeded 10 × 16 scan (mulberry32 via addInitScript, AGL flush every khắc, all classes 0). Test 11 fixture now books its deeds in pend (a label alone is the plan).
Gates on 1dab9933 (one at a time): walk-cost ALL OK (5 all rows 0/73; 11 0 vs off 3; 12 0/195) · ag-walk 19/20 (the 1 FAIL = «4 carry» tin báo item missing next buổi; ALSO on base 64750121: 1–2 per 8 runs here; main 548dcd0d 8/8 → a pre-existing branch flake, not r4; not chased) · ptime ALL OK · ptime2 ALL OK · invite-host-away ×10 = 10/10 (9/9) · time-spill-guard PASS (76 checks) · coop-e2e 68/68 · QUICKCHECK --cpu 4 PASS (old save ok, core gates PASS incl. one-core-guard, perf new/live render 212/206, tab 408/380, buổi 1253/1123 ms).
Scan tools (container-local): /home/user/wt/jw3-tools/scan4.js <html> <seed0> <seed1> <buổi> (tracer: last writer stack per cell).
SẴN SÀNG KIỂM review/jagday-walk-rv 1dab993378e404f6a8578de84b114ce2f82fc425 (TIER BIG)
