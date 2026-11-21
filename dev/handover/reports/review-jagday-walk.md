# REVIEW jagday-walk (BIG, FOREMAN D #10) — reviewer session_01964izEnq6kRCcTsDx7Rd4S
PRIORITY #1 CHECK ('agWalkShort|agWalkGuard|ptLedger|errand|travel|walkNpcPass'): OD L1976 (walks cost khắc) + OD 18/11 ~20:00Z/~20:05Z (errand n includes the walk; seen walking off and back) + LAW 1 / 6b / 11 | main dd248d5d: jptime.js:109 ptLedger, jerr.js:54 errLedger, jwalk.js walkNpcPass (no road for errand rows written into the khắc now) | review/* walk-cost-rv ffd22ea6 (base, LAND READY), jagday-walk 80d1cc41 (this) | claims JAGDAY-WALK #1 session_01964izFMBWywRUbAg2MV1QH.
START_CTX ≈ 3 % of 1M (get_session reads 0; own estimate).

## ROUND 1 — review/jagday-walk 80d1cc41 → VERDICT: FAIL (1 item, law 11 whole group)

### What holds (checked independently, own probes on built base ffd22ea6 vs branch 80d1cc41; seeded Math.random, the deed landing queue flushed every khắc)
(a) No deed lost silently (law 6b). Deeds landed per run, 16 buổi, seeds 1–10:
| | base | branch |
|---|---|---|
| all NPC deeds landed (seeds 1–5 / 6–10) | 921 / 880 | 926 / 872 |
| consort deeds per run (mean of 10) | 32.4 (SD ≈ 7) | 29.7 (SD ≈ 5) — inside the seed spread |
| servant / Emperor / Thái hậu (1–10) | 1445 / 19 / 13 | 1468 / 21 / 12 |
| person-days with ≥ 1 deed | 1530 | 1552 |
| agWalkGuard moves / drops (80 + 80 buổi) | — | 1 / 2 (each drop counted in AG.stat.drop + AGD.stat.walkDrop, agTouch → she re-plans) |
| agent / walk errors, page errors | 0 | 0 |
Code read: the guard moves only deeds not yet started (p.kh > khắc now, not p.cont); agShClear clears the old window; agSpan rewrites the new one; a host's ag_with rows are written at landing, so a moved deed leaves none behind. A spilled deed takes p.key = R.key + window → it is held. A running deed stays in pend until agK1 < khắc now → its rows stay held. Only a day-plan label with no deed behind it becomes free. The guard sits before the jwalk pass (jwalk wraps j95fixHouse last).
(b) Her own walk is not touched (no goTo/walkGo/accWalk change; jwalk still skips "me" and «follow me» rows; the j95s retinue change only keeps a follower's «go» row toward her mistress). It runs on the host only (agOn / j95fixHouse); a co-op guest reads the host's record. Numbers: travel() per walker = BAL.walk.near/far/pen; off = BAL.walk.npc; no typed number (law 4). Two-way (law 1): NPC walks cost khắc like hers.
Far-jump scan (own, 5 seeds × 16 buổi, travel ≥ 2, no «on the way» khắc): base deed→deed 33, deed↔other 12, follower 5, errand 5 (169 far moves) → branch 0 / 0 / 0 / **6** (125). Gates I re-ran on the branch build: walk-cost ALL OK (1–11; test 11 on 0 vs off 2), ag-walk 10/10.

### FAIL items (fixer = worker session_01964izFMBWywRUbAg2MV1QH)
1. **Errand-ledger jumps are the SAME family → in this job (law 11, MAIN ROOT-78 «whole»).** It is the same defect: an NPC crosses a far road in one khắc with no «on the way» khắc. It is not a separate system that needs its own design: the owner already ruled the time (OD 18/11 ~20:00Z: the errand's n khắc INCLUDE the walk; ~20:05Z: she is seen walking off and back). Only the row picture inside the window is wrong. Example (branch, seed 1): `mm:4  r4/serve | kn/errand | kn/errand | r4/nightw`. The maid is at kn the khắc she is sent and back at r4 the khắc she is due, with no road either way. Why jwalk cannot fix it: ptLedger runs AFTER j95sync (jptime.js:123 wraps j95sync), so it overwrites the jwalk pass, and t0 is the khắc now. «It may break the landed ptime gates» is what the gates are there to catch; it is not a reason to leave the jumps.
   Fix pointer (every errand-ledger writer, one rule):
   - jptime.js ptLedger (line ~109), NPC-sender rows (`a.by!=="me"`, place = a.place): inside [t0, due), let t = travel(from, a.place, walker), where from = her row before t0, walker = walkWho(a.who) (j9 per walker, BAL.walk.*).
     - The first t−1 khắc = [a.place, "go", a.tgt, "<why> · đang trên đường"]. A «go» row with a why is j95sKeep, so she stays busy and is never followed or sent again (law 6b).
     - The last travel(a.place, back)−1 khắc before due = [back, "go", …] on her way home.
     - The middle khắc stay "errand" at a.place.
     - If n < the two walks, split the window by the walks, without adding khắc (n is the whole trip). Due and the cost do not change.
   - jptime ptLedger rows for her own people (`mine`) and jerr.js:54 errLedger: they keep the slot place, so there is no position jump by design (the token is hidden with the kit chip «đang đi …»). Check them with the same scan; base showed `s42 r14/ag_maid:sweep | home/errand` (a slot-place row right after a far deed). If any are left, apply the same rule.
   - Make sure jwalk/agWalkHeld treat these «go» errand rows as held (they are: j95sKeep «go» with a why), so the deed guard routes around them.
   - Test: extend walk-cost test 11's 16-buổi scan to count errand far moves (class «errand» = 0 on, vs off), plus a unit case where an NPC sender sends a maid 2 far khắc away: rows = go | errand … | go, due unchanged, ptAwayOf unchanged. Re-run ptime, ptime2, invite-host-away, walk-cost, ag-walk, time-spill-guard, coop-e2e, quickcheck (old save).
   - Report a before/after table with the same classes as above (all far-jump classes must be 0).

Nothing else to fix: once item 1 is done, the rest of 80d1cc41 can PASS as it is.
Stacking: walk-cost-rv ffd22ea6 is not in main yet (main dd248d5d). The fix goes on review/jagday-walk (stacked on walk-cost); the PASS branch will be the final merge of the then-current main («lands right after walk-cost»).

STATUS: FAIL review/jagday-walk 80d1cc41 — 1 item (errand-ledger jumps = same family, fix in ptLedger/errLedger); deeds not lost (921→926 / 880→872 landed; guard 2 drops re-planned); fixer session_01964izFMBWywRUbAg2MV1QH.

## ROUND 2 — review/jagday-walk b25e42cc (r1 fix of FAIL 1) → VERDICT: FAIL (1 new item; FAIL 1 fixed)
PRIORITY #1 CHECK ('walkErrRow|ptLedger|"back"|invite-host-away'): OD L1976 + OD 18/11 ~20:00Z/~20:05Z | main dd248d5d | review/walk-cost-rv ffd22ea6 (WITHDRAWN per D #10, WALK-COST #3 on review/walk-cost-regate) | claims JAGDAY-WALK #1 session_01964izFMBWywRUbAg2MV1QH.
1. FIXED (round 1 item 1). jwalk walkErrRow + ptLedger: an NPC sender's errand window = road there | errand | road back; due, cost, ptAwayOf unchanged; road rows are «go» with a why (j95sKeep → busy). Rows by her own people are unchanged by design. Own scan, 5 seeds × 16 buổi: far moves 112, every jump class 0 (errand 5 → 0; deed 45 → 0; follower 5 → 0). Gates on b25e42cc: walk-cost ALL OK (11 incl. errand unit + errand class), ptime ALL OK, ptime2 ALL OK.
2. **NEW FAIL — invite-host-away test C regressed by this branch** (10 runs each, same box):
   | build | C fails | E fails |
   |---|---|---|
   | base walk-cost-rv ffd22ea6 | 0/10 | 1/10 (pre-existing flake) |
   | branch b25e42cc | **6/10** | 0/10 |
   Failing detail: the guest decides to LEAVE at the last khắc; her row is expected as the walk-back row [her palace, "back", …, «… quay về»]. The branch writes `["kn","go",null,"đang trên đường"]`. Cause: jwalk's new «move decided IN the khắc now starts its walk now» rule (round 0, jwalk.js walkNpcPass `now`) rewrites her current-khắc «back» row through the arrive-later loop. That loop writes the generic «đang trên đường» and drops the row's own why. invite-host-away was not in the worker's gate list.
   Fix pointer:
   - (a) In walkNpcPass's arrive-later loop, keep the row's own why (and target) when rewriting a row into «go», as the follower case already does: a «back» row → [place, "go", x[2], x[3] (the leave reason) + " · đang trên đường"].
   - (b) Update test C to OD L1976: she is on her road home, so the leave row is [her palace, "back" OR "go" carrying the leave reason]. Keep every other C assert (left, loss = 1, notice, whereHome ≠ home).
   - (c) Gates: invite-host-away ≥ 10 runs with C 10/10 (report the E rate). Also run walk-cost, ag-walk, ptime, ptime2, time-spill-guard, coop-e2e, quickcheck (old save).
Note: E did not fail on this branch (0/10 vs 1/10 on base). It is the walk-cost E flake, not caused here.
Base: walk-cost-rv is withdrawn → after WALK-COST #3 passes, the worker rebases onto review/walk-cost-regate and I do the final gate (no LAND READY before that).

STATUS: FAIL review/jagday-walk b25e42cc — FAIL 1 fixed (errand jumps 0); NEW item 2: invite-host-away C 6/10 (base 0/10), jwalk now-rule rewrites the leaving guest's «back» row into a why-less «go»; fixer session_01964izFMBWywRUbAg2MV1QH.

## ROUND 3 — review/jagday-walk 29c59bdc (r2 fix of FAIL 2) → VERDICT: PASS-PENDING-BASE (logic PASS; no LAND READY until rebased onto the re-passed walk-cost and final-gated)
PRIORITY #1 CHECK ('walkRoadWhy|walkTimed|ptAwayOf|invite-host-away'): OD L1976 + OD 18/11 ~20:00Z | main dd248d5d | review/walk-cost-rv ffd22ea6 WITHDRAWN → WALK-COST #3 on review/walk-cost-regate | claims JAGDAY-WALK #1 session_01964izFMBWywRUbAg2MV1QH.
2. FIXED. A row jwalk turns into «on the way» keeps its own why and target (walkRoadWhy: the guest's leave reason, whom a follower follows). The khắc-now rule skips timed-ledger rows (visit / back / anyone ptAwayOf), whose khắc already hold the walk. The only test change is that C reads its notice from 8 log lines instead of 4 (cards on her walk home log lines after it); every other C assert is unchanged.
   invite-host-away 10 runs on 29c59bdc: C 10/10, E fails 1/10 (base ffd22ea6: C 10/10, E 1/10) → C regression gone; E = the pre-existing walk-cost flake, same rate.
Re-check that the skip brings back no far jump (own scan, travel ≥ 2 with no road, 6 runs over seeds 1–15 × 16 buổi ≈ 480 buổi):
- 4 runs: 0.
- Run 1 (seeds 1–5): deed↔other 2, errand 3. Two of the errand rows are the «ngoai» stand-in row of jerr/«mine» errands (J95OUT_, not a real place, token hidden by design, skipped by jwalk on purpose), so 1 real.
- Run 2: errand 1 (mm:9 r4/errand → tgk/errand: two back-to-back errands with different places).
- Repeat runs over the same seeds did not reproduce run 1's deed↔other pair (async landing timing).
⇒ ≈ 3 real residual jumps in 480 buổi vs base ≈ 50 per 80 buổi. Recorded as a watch item for the final gate: if the final-gate scan shows a sample, it must be named and fixed there.
Deeds (seeds 1–5): landed 159/144/188/171/176, consorts 28/29/34/32/28 (base 39/46/26/21/34), walkDrop 0, errors 0.
Gates I ran on 29c59bdc (one at a time): walk-cost ALL OK (11: deed 0 vs off 4, errand 0 vs off 1) · ag-walk 10/10 · ptime ALL OK · ptime2 ALL OK · invite-host-away ×10 above.
FINAL GATE (after WALK-COST #3 passes and the worker rebases onto it): final-merge the then-current origin/main → review/jagday-walk-rv. Then re-run walk-cost, ag-walk, ptime, ptime2, invite-host-away ×10, time-spill-guard, coop-e2e, quickcheck (old save) and the far-jump scan; then LAND READY.

STATUS: PASS-PENDING-BASE review/jagday-walk 29c59bdc — FAIL 1 + 2 fixed (errand roads; invite-host-away C 10/10, E 1/10 = base rate); residual ≈ 3 rare jumps / 480 buổi to watch at the final gate; LAND READY only after rebase onto re-passed walk-cost + final gate.

## HANDOVER (reviewer session_01964izEnq6kRCcTsDx7Rd4S → next reviewer; 20/11 ~20:20Z)
Context 24.8 % of 1M (START_CTX 3 % → line 28 %); a final gate does not fit, so I roll over before it (D #11 asked for this).
TODO = ROUND 4 FINAL GATE of review/jagday-walk-r2 004521054c44d752f05716eb6df4cc5bb16255b9 (JAGDAY-WALK #2 session_01964izErhGdgkwJLtAAq7VF; = 29c59bdc + merge walk-cost-rv2 bd2b1c59 + residual fixes + merge LIVE 415b9ca0).
Check:
1. Diff 29c59bdc..00452105 (dev/build + dev/test):
   - walkTimed now skips only khắc inside the jptime away window [t0, due).
   - New jwalk walkLeadIn before j95 secret meetings / trysts: no deed or tryst may be lost or moved silently (law 6b).
   - walk-cost tests 5 and 11 + the scan now use travel PER WALKER. Confirm this is honest: an NPC's road must use the NPC's own penalty, never her «đi chậm» (law 1). Rerun the same scan with plain travel(a,b) and explain every extra hit by her penalty alone, else FAIL as a weakened measure.
   - Test 5 bars: 0.4 on ALL rows + 0.6 tripwire + 0.1 jwalk-own.
   - iwBind walk-back-only bind (IHA C/F).
2. Final-merge the newest origin/main into review/jagday-walk-rv (index.html / sw.js conflicts → take theirs, then `python3 dev/build/assemble.py` + `bash dev/site/build_site.sh`).
3. Gates, one at a time: walk-cost, ag-walk, ptime, ptime2, invite-host-away ×10 (C must be 10/10; E rate vs base was 1/10), time-spill-guard, coop-e2e, quickcheck (old save).
4. Own far-jump scan + deed count vs main. Probes kept at /home/user/wt/rv-jw-probe (if the container survives):
   - jumps2.js <index.html> <seeds> <buổi> = far moves with travel ≥ 2 and no road, by class; «ngoai» = J95OUT_, not a place.
   - deeds.js = deeds landed per NPC with seeded Math.random + AGL flush.
   Round 3 watch: ≈ 3 rare residual jumps / 480 buổi (errand → errand chain; an unreproduced deed ↔ other pair). The worker says the residual fixes give 0 in all classes; confirm.
5. walk-cost-rv2 bd2b1c59 is not LIVE yet; jagday-walk-r2 contains it. PASS = «LAND READY review/jagday-walk-rv <sha> (covers walk-cost-rv2 bd2b1c59 too)» in FOREMAN_D_STATUS.md + ROUND 4 here, then send_message D #11 (session_01964izEy8y3SFtp96at4o7u). FAIL → numbered list; fixer = JAGDAY-WALK #2.
Rollover rules (verbatim):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).

## ROUND 4 — FINAL GATE review/jagday-walk-r2 00452105 → review/jagday-walk-rv 64750121 (merge of LIVE 27a7dcf5) → VERDICT: FAIL (1 item; every gate green)
Reviewer: REVIEW jagday-walk #2 session_01964izCAkPLwbFgegsZ7v5u (child of D #12, depth 4). START_CTX ≈ 4 % of 1M.
PRIORITY #1 CHECK ('walkLeadIn|walkTimed|agWalkGuard|walkDrop|travel per walker'): OD L1976 + OD 18/11 ~20:00Z/~20:05Z + law 1 / 6b / 11 | main 27a7dcf5 (no jwalk walkLeadIn, no agWalkGuard) | review/* jagday-walk-r2 00452105 (this), walk-cost-rv2 bd2b1c59 (inside it) | claims JAGDAY-WALK #2 session_01964izErhGdgkwJLtAAq7VF.
Merge: origin/main 27a7dcf5 into 00452105. The only conflicts were index.html and sw.js: I took theirs, then ran assemble.py + build_site.sh. Pushed as review/jagday-walk-rv 64750121, which has LIVE as an ancestor.

### Code read (29c59bdc..00452105, the worker's own commits a30be97f + d3051334): OK
- walkTimed now holds only the khắc inside the jptime away window [t0, due). After due, her next move walks like any other move.
- walkLeadIn: the khắc before a j95 secret meeting / tryst become her road (and her servant's road). Kept rows (walkKeepRow) are never overwritten, and neither is the khắc now or an earlier one of a record already shown. A road that does not fit is counted in JWALK.stat.miss. No deed or tryst is moved or lost (law 6b OK).
- Travel per walker in walk-cost tests 5/11 is honest (law 1). travel(a,b) with no walker defaults to S, which adds HER «đi chậm» to every NPC road. walkWho(id) gives the NPC's own penalty, which test 10 pins. In my scan, the plain travel(a,b) variant gave plainExtra = 0 over 160 buổi, so the change hides no jump.
- Reading ag_tell as road is honest: jagday agTell writes «ag_tell» only on the bearer's khắc between seeing and due (due = ks + agWalk), at her master's place.
- Test 5: the 0.4 bar is back on all rows, with the 0.6 tripwire and the 0.1 jwalk-own bar kept. The iwBind walk-back bind (IHA C/F) comes from bd2b1c59 and is unchanged here.

### Gates on 64750121 (run one at a time)
| gate | result |
|---|---|
| walk-cost | ALL OK (5: all rows 0/50 vs off 77/79; 11: deed 0 vs off 4, errand 0 vs off 1) |
| ag-walk | 10/10 |
| ptime / ptime2 | ALL OK / ALL OK |
| invite-host-away ×10 | 10/10 runs 9/9: C 10/10, E 10/10 (base E rate was 1/10) |
| time-spill-guard | PASS (static + runtime, 76 checks) |
| coop-e2e (LIVE Worker) | 68/68 |
| quickcheck --cpu 4 | PASS: core gates PASS, old save ok, perf new/live render 257/278, tab 463/499, buổi 1118/1344 ms |

### Own far-jump scan + deeds (seeded Math.random, AGL flushed every khắc, 16 buổi per seed; class = the row pair around a far move with travel ≥ 2 per walker and no road)
| build | seeds | far moves | bare jumps (deed / deed↔other / follow / errand / other) | deeds landed | consort deeds | walkDrop |
|---|---|---|---|---|---|---|
| main 27a7dcf5 | 1–5 | 307 | 307 (21 / 180 / 92 / 4 / 10) | 822 | 139 | 0 |
| 64750121 | 1–5 | 183 | **2** (0 / 2 / 0 / 0 / 0) | 767 | 146 | 50 |
| 64750121 | 6–10 | 176 | **5** (2 / 2 / 1 / 0 / 0) | 759 | 132 | 50 |
| 00452105 (pre-merge) | 1–5 | 203 | 7 (2 / 3 / 1 / 1 / 0) | 795 | 130 | 59 |
| 29c59bdc (round 3) | 1–5 | 181 | 2 (1 / 1 / 0 / 0 / 0) | 691 | 122 | 60 |
Deeds: walkDrop ≈ 50–60 per 80 buổi is the same on round-3 29c59bdc, so it is not new. Each drop is counted (AG.stat.drop + AGD.stat.walkDrop) and its doer re-plans (agTouch). Deeds landed are −7 % vs main, and consort deeds are within the seed spread. That fits "walks cost khắc" (OD L1976). No agent / walk / page errors.

### FAIL items (fixer = JAGDAY-WALK #2 session_01964izErhGdgkwJLtAAq7VF; the base is now review/jagday-walk-rv 64750121)
1. **Residual far jumps are still there: 7 per 160 buổi, not 0.** This is the round-3 watch item. The rule was «a sample at the final gate must be named and fixed there». The worker reported 0 in all classes, but the scan above finds 2 + 5. Samples (row = khắc 0 | 1 | 2 | 3):
   - s15 (seed 2, b1): `r4/shift | r2/go «Bạch Tuyết Dao sang Cảnh…» | r4/ag_maid:nvp | r4/ag_maid:nvp`. Instrumented: at khắc 2 agWalkShort ran with kh = cur and returned 0. With kh = cur it reads row[cur] (the deed's own row, r4) as her start, not row[cur−1] (r2), where she really was.
   - s17 (seed 4, b4): `kn/follow | kn/go «Mạnh Bạch Lộ sang Càn Ninh…» | r5/ag_srv:chat | r5/ag_srv:chat`
   - s20 (seed 6, b6): `r3/shift | r3/shift | vuon/go «Diệp Tử Yên sang Ngự hoa…» | r3/ag_maid:nvp`
   - s11 (seed 6, b6) deed→deed: `r3/ag_maid:embro | vuon/ag_maid:follow ×3`. s3 (seed 10, b10): `r5/ag_maid:scout | kn/ag_maid:sweep ×3`.
   - s42 (seed 2, b2) follow: `r14/brk | r14/go | vuon/follow «Thẩm Băng Tâm sang Ngự hoa…» | vuon/follow`
   One root: a row next to a not-yet-started deed is written AFTER agWalkGuard ran in that khắc. Cases: a mistress's move that lands later (agLater / agent slice after j95sync) rewrites her maid's retinue «go/follow» row in the khắc now; a carried deed at khắc 0 of a new buổi. By the next khắc the deed has started (p.kh > cur fails), so the guard skips it, and jwalk never rewrites a kept deed row.
   Fix pointer:
   - (a) Re-run agWalkGuard on the record after every write that can change a deed's neighbour: the end of an AGL landing batch, agSpill / carry at khắc 0, and the j95s retinue rewrite.
   - (b) In agWalkShort, when kh === cur, take her start from row[cur−1] (where she was) and not from row[cur]. A deed decided in the khắc now starts its walk now, the same as jwalk's now-rule.
   - (c) For the follow class: a retinue «follow» row written after the jwalk pass needs the same road. One option is to run the jwalk pass after j95sPass for rows changed in the khắc now.
   - Test: extend walk-cost test 11 (or a new 12) to seeds 1–10 × 16 buổi with seeded Math.random and an AGL flush every khắc. All classes must be 0. Report a before/after table with my classes. Then re-run every gate in the table above.
Nothing else fails. Everything else in 00452105 (and walk-cost-rv2 bd2b1c59 inside it) can PASS as it is, once item 1 is 0.

STATUS: FAIL review/jagday-walk-rv 64750121 (= jagday-walk-r2 00452105 + LIVE 27a7dcf5). All 8 gates green. The far-jump scan finds 7 bare jumps per 160 buổi (main 307 per 80), all from rows written after agWalkGuard in the khắc. Fixer: JAGDAY-WALK #2.

### ROUND 4 addendum: co-op seat check (owner CO-OP LAND GATE, D #12 21:21Z), on 64750121
I ran a two-seat probe (coop-thin-f2 setup, LIVE Worker, level 7, 10 buổi steps) comparing S.roster NPC rows host vs guest. Result: there is no record on EITHER seat. The cause is j95.js:28 `j95on()` = false whenever COOPW.on, and j95sync returns at its first line (j95.js:297).
So in a co-op room nothing this branch adds runs: no jwalk walkNpcPass / walkErrRow / walkLeadIn, no agWalkGuard, no ptLedger road rows. Both seats see the same thing (nothing): no difference, no page errors.
What does run in co-op: her own walk cost (walk-cost-rv2: goTo → travel / BAL.walk). On the guest it is a host intent (F2), and coop-e2e 68/68 covers it.
Seat-check verdict: solo = the scan above; 2 players = identical by construction (the record is off). This was pre-existing design, not changed here. Whether NPC walks should exist in co-op at all is a MAIN / owner question for later (parking lot), not this branch.
At the re-gate: re-run the probe (both seats, record absent or equal) + coop-e2e.

## ROUND 5: RE-GATE review/jagday-walk-rv 1dab9933 (= 64750121 + fix 5390905c + LIVE 548dcd0d) → VERDICT: FAIL (1 item: ag-walk «4 carry NEAR» flake); round-4 FAIL 1 FIXED
PRIORITY #1 CHECK ('agWalkGuard|walkIsRoad|agWalkCut|knCarryOut|4 carry'): OD L1976 + law 1 / 6b / 11 | main 548dcd0d | review/* jagday-walk-rv 1dab9933 (this) | claims JAGDAY-WALK #3 session_01964izFxPbxKJAN3n8Je4g4 (done) → #4 opened by D.
Code read of 5390905c:
- The guard now runs in the jwalk j95fixHouse wrapper, after j95sPass / j95sGuard and before the road pass.
- On a fresh khắc, deeds that start now are checked from row kh−1.
- An «ag_» row that no pend deed holds is free.
- A carried deed with no road is not spilled: agLand lands it now, so it is not lost.
- agWalkCut ends a running deed one khắc early so she can walk to a later meeting. The deed still lands.
- Roads (walkIsRoad) are never repainted.
- The «mine» errand row keeps one place per buổi.
OK on laws 1 / 6b / 11.
The build is its own: rebuilt, only CTM_BI differs.
### Gates on 1dab9933 (one at a time)
| gate | result |
|---|---|
| walk-cost | ALL OK (12: seeds 1–10 × 16, bare jumps 0 of 188 far; deeds landed 1616) |
| ag-walk ×8 | **7/8**: run 5 FAIL «4 carry NEAR». main 548dcd0d ×8 = 8/8 |
| ptime / ptime2 | ALL OK / ALL OK |
| invite-host-away ×10 | 10/10 runs 9/9 (C 10/10, E 10/10) |
| time-spill-guard | PASS |
| coop-e2e | 68/68 |
| quickcheck --cpu 4 | PASS: old save ok; render 272/259, tab 532/523, buổi 1527/1179 ms; core gates PASS |
| own far-jump scan (my driver, seeds 1–10 × 16) | **0** bare jumps / 411 far moves (all classes 0, plain-travel extra 0); deeds landed 1658, consorts 312; walkDrop 7 (was 50); JWALK.miss 37 (roads that could not fit; none left a bare jump) |
| co-op seat check | record off in co-op (j95.js:28): both seats equal by construction (ROUND 4 addendum) |
### FAIL item (fixer = JAGDAY-WALK #4, opened by D #12)
1. **ag-walk «4 carry NEAR» flake starts on this branch line.** Branch 1dab9933: 7/8. Main 548dcd0d: 8/8, and 16/16 counting the worker's runs. The worker's base 64750121 also fails 1–2/8.
   Failing shape (run 5): `{"walk":1,"C":[{"id":"0-1:ksp:gossip:…:c","due":0}],"due":0,"at":["-","-","-","-"]}`. The carried item is computed with due 0 and should land at khắc 1. It never appears in tinBaoList at any khắc of the next buổi. FAR in the same run is fine.
   Reproduced in one page with probe dev/handover/reports/probes/rv-jw-agwalk-carry.js (14 carries in a row, NEAR only, near = tyv): 1/14 lost. In that case BOTH knCarryOut calls (the test's own and the nextBuoi wrapper's) still had `tyv:gossip@0` in S.tb.C. So the loss happens AFTER knCarryOut: in knCarryIn / knCarryTick, or in a knTb reset or rewrite during the buổi turn.
   The probe's later runs log `b x->y W … K … C` after nextBuoi; 28 more carries did not fail. Next step: run the probe in a loop until it fails and read the dbg line (is the item in T.W, in T.K, or in neither; did S.buoi move once).
   Suspects:
   - (a) something in the jagday-walk chain (agSpill / agLand / agWalkCut, or a j95sync inside nextBuoi) re-enters nextBuoi or rebuilds S.tb before knCarryIn;
   - (b) knCarryTick runs with agKh() > due and an item is deleted by a later pass;
   - (c) the deed «pend» that the test pushes is dropped / landed by the new walk-guard path, so adHapNow no longer lists h and something clears T.W.
   Fix the root cause, not the test (law 6b: a news item must never vanish). Then ag-walk ≥ 16/16 and the probe ≥ 50 carries with 0 lost.
Everything else PASSES. Once item 1 is fixed, re-run ag-walk ×16 + the probe + a quick walk-cost; then LAND READY.

STATUS: FAIL review/jagday-walk-rv 1dab9933. Round-4 jumps are fixed (0 / 411). The one item is the ag-walk «4 carry NEAR» flake (main 8/8, branch 7/8; a carried news item is lost after knCarryOut). All other gates green, co-op seat check equal.

## HANDOVER (reviewer session_01964izCAkPLwbFgegsZ7v5u → next reviewer; 20/11 ~22:50Z)
Context 28.2 % of 1M (START_CTX 4 % → line 29 %), so I roll over. D #12 opens the next reviewer.
TODO = ROUND 6 re-gate after JAGDAY-WALK #4 fixes ROUND 5 item 1 (ag-walk «4 carry NEAR» flake):
1. Read the fix diff. It must fix the cause (no carried tin báo item lost, law 6b), not loosen the test.
2. Final-merge the newest origin/main into review/jagday-walk-rv (index.html / sw.js conflicts → take theirs, then assemble.py + build_site.sh).
3. Gates, one at a time:
   - ag-walk ×16 (must be 16/16; main is 8/8)
   - the probe dev/handover/reports/probes/rv-jw-agwalk-carry.js ≥ 50 NEAR carries, 0 lost (copy it into dev/test/ to run, it reads ./coop-serve-free paths only; delete after)
   - walk-cost (incl. 12)
   - ptime, ptime2
   - invite-host-away ×10
   - time-spill-guard
   - coop-e2e
   - quickcheck --cpu 4
   - far-jump scan: dev/handover/reports/probes/rv-jw-jumps.js <index.html> 1 10 16, all classes 0
   - co-op seat check: the record is off in co-op (j95.js:28 j95on false when COOPW.on). Re-check that it is still off, or, if it is now on, compare S.roster NPC rows host vs guest with a two-client probe built from the coop-thin-f2 setup lines 9–53.
4. PASS → «LAND READY review/jagday-walk-rv <sha> (covers walk-cost-rv2 bd2b1c59), coop-e2e PASS + co-op check» in FOREMAN_D_STATUS.md + ROUND 6 here; send_message D #12 session_01964izBwRw7YgvQWHVn4wG2. FAIL → numbered list, tell D #12.
Already green on 1dab9933 (ROUND 5): everything except ag-walk. If the fix only touches the carry path, the walk-cost / scan results need only a quick recheck.
Rollover rules (verbatim):
- The "Lượt n/30" counter from the owner's global chat preferences is ONLY a display counter here. It is NOT the rollover trigger for the Cung Tường Mộng main chat or any foreman. Never hand over because n reached 30.
- Trigger = context (owner OD:L1217 + ceiling 16/11 08:15Z s13): at session start note your starting context as a % of the window (START_CTX; get_session context_usage.used_tokens, or your own estimate when it reads 0) in your first handover line. Roll over when context >= START_CTX % + 25 % of the window, and NEVER above 60 % of the window (hard ceiling). Then write the handover, open the next session yourself (create_session), and stop.
- Every takeover prompt you write MUST copy these three lines verbatim. Workers roll over too (owner 16/11 08:22Z s14, option 1): at START_CTX % + 25 % of the window, ceiling 60 %; a worker may finish if only push + report remain; it writes its handover in its report file and tells its coordinator, and the COORDINATOR opens the successor (never the worker).
LINEAGE (owner 17/11; threshold overwritten by owner 18/11, verbatim: "Ủa ai ra cái luật là tầng 6 trở lên là bị cấm mở quảng đốc. Tầng 8 của mày là maximum thì cùng lắm là đâu đó tầng 7 là mới không mở quảng đốc thôi chứ."): your first STATUS/HANDOVER line states "depth <get_session lineage.depth>"; open workers as your children; ALWAYS roll over by opening your own child (create_session) at EVERY depth the system allows, up to the limit (8) — never stop early; ONLY when create_session is refused (limit reached or any error) write the handover — write the handover + a FOR MAIN line so the owner opens a ROOT from claude.ai. Every takeover prompt copies this line.

## ROUND 6: RE-GATE review/jagday-walk-rv 20c8adbf (JAGDAY-WALK #4 fix) + final-merge LIVE → VERDICT: PASS → LAND READY
Reviewer session_01964izGHdj1g2LVwM27Nc3K (depth 4, START_CTX ≈ 4 %).
PRIORITY #1 CHECK ('knCarryOut|knCarryIn|knTb|KN.turn|agDrain|4 carry'): OD L1976 + law 6c / 11 | main b1033eb0 → f15146ea → a4fdb642 (same jagknow carry code, no turn guard) | review/* jagday-walk-rv 20c8adbf (this), walk-cost-rv2 bd2b1c59 (inside) | claims CLAIMS.md jagday-walk row (D).
### Code read (1dab9933 → 20c8adbf)
- Game code only: jagknow.js (knTb / knCarryOut / knCarryIn / nextBuoi wrapper). jagent.js changed in 55af281b and was reverted in 20c8adbf (net 0). ag-walk.test.js is unchanged. The new test is ag-carry-turn.test.js (6 checks).
- Law 6c (no item vanishes): (B) no knTb rebuild at the half-turned key while KN.turn, one rebuild after the turn at the real key + khắc; (A) a refused turn keeps C (merge by id under the same bkey, Cb); knCarryOut drains AGL first so last-khắc deeds are read; W items left on the road land at once, then C. The turn counter is decremented in finally, so it is safe on throw / re-entry.
- Law 11: the whole carry group (knTb / knCarryOut / knCarryIn / knCarryTick / wrapper) is covered. No other carry path exists (grep knCarry*).
- FAR items: C keeps its due, so FAR still lands at khắc 2. ag-walk «4 carry FAR» is green in every run (16 + 8 + 4, plus 4 probe runs). Only items left in W (she ended the buổi early) now land at khắc 0; before, they were dropped. No regression.
- Reviewer fix 2431fe94: the post-turn knTb() rebuild now runs only when knOn(). Before, it wrote S.tb on a co-op guest / with ag off, where tinBaoList never builds it.
### Final merge
Main kept landing during the gates, so I merged it in turn: b1033eb0 (88412cb1), f15146ea (7740bfa4), a4fdb642 (24c309f5), 4f34f461 (21f5f018), e4fd4dcf (fada0907), 8c8b8b6b (af735ff7, the LIVE D #13 named), c3a398dd (9a0c3191, LIVE per MAIN 84 02:18Z), 64d2e094 (239b22c5 = HEAD; assemble.py conflicted too: main's list (+ jtc.js) with jwalk.js kept last). On 9a0c3191: ag-carry-turn 6/6, ag-walk 2/2, walk-cost ALL OK, coop-e2e 68/68, quickcheck PASS (5 runs: buổi 946/941, core gates PASS). For each: index.html / sw.js take theirs, then assemble.py + build_site.sh. The build has jwalk + the knOn guard. No conflict markers.
### Gates (one at a time)
| gate | 88412cb1 (LIVE b1033eb0) | 7740bfa4 (f15146ea) | 24c309f5 / 21f5f018 / fada0907 / **af735ff7 HEAD** |
|---|---|---|---|
| ag-carry-turn | 6/6 | 6/6 | 6/6 each |
| ag-walk | **16/16** | 8/8 | 4/4 · 2/2 · 2/2 · 2/2 |
| probe rv-jw-agwalk-carry.js | **56 NEAR carries, 0 lost** (4 runs × 14), FAR/NEAR test rows all ok | – | – |
| walk-cost | ALL OK (12: 0 bare far of 192; deeds 1671) | ALL OK (0 of 177; deeds 1666) | ALL OK on 24c309f5 (0 of 194) |
| far-jump scan rv-jw-jumps.js 1 10 16 | **0 in all classes** / 347 far; land 1644, walkDrop 2, pageErr 0 | – | – |
| ptime / ptime2 | ALL OK / ALL OK | ALL OK / ALL OK | – |
| invite-host-away | **×10 = 10/10** (9/9 each; no E/F flake seen) | ×3 = 3/3 | 1/1 (24c309f5) |
| time-spill-guard | PASS (static + runtime) | – | – |
| coop-e2e | **68/68** | 68/68 | 68/68 each |
| quickcheck --cpu 4 | PASS, old save ok; render 193/215, tab 382/366, buổi 1193/1134 ms | PASS, old save ok | PASS / PASS / see note / **PASS (5 runs: buổi 1056/1152, core gates PASS)** |
IHA note: the worker saw 9/10 once (E/F) and the base 1dab9933 2/10 red. Here the branch is 10/10 + 3/3 + 1/1 on 24c309f5. So there is no branch-only regression.
### Co-op seat check (owner CO-OP LAND GATE), on 88412cb1
- Two-client probe (coop-thin-f2 setup lines 1–60, LIVE Worker, level 7, then 2 full weeks on both seats), 15/15. On both seats at S0 / S1 / S2: j95on() = false (record off in co-op, j95.js:28) and S.roster is absent and equal (0 rows both). JWALK.stat stays {fix 0, late 0, miss 0, now 0} on both, so no NPC walk runs. KN.turn is back to 0 on both. No page errors. Host agOn / knOn = true, guest false: pre-existing (agGuest), and her tin báo stays the host's own. NPC record off in co-op on both seats = equal.
- Her walk cost = host intent: coop-thin-f2 all ok. In P1, from the guest, every place: run once on the host, khắc = travel() (BAL.walk), place / visit / khắc the same on both phones (18/18; 6 behind a decision card, local). P10 net loss: khắc paid once. P8 no local walk. No page errors.
Quickcheck note (fada0907, main e4fd4dcf): two 3-run quickchecks went red, once on G4 coop-one-world and twice on perf (buổi 2885 / 3475 vs live 1000).
- coop-one-world alone passed 3/3. A 5-run quickcheck on the same sha PASSED (buổi 1013/1004, core gates PASS).
- The slow buổi is a mode on main too: e4fd4dcf alone had 2372 ms and 1922 ms runs.
- I logged the cards at CPU ×4, 10 runs each. Branch median ≈ 2.5 s, live ≈ 2.8 s. On both, the slow runs are the ones with an extra card («Có người đến», «Có người bán tin», «Chọn cung nữ thân tín»).
- So this is not a branch regression. I use 5 runs from then on.
On 239b22c5 = HEAD:
- ag-carry-turn 6/6, ag-walk 4/4, walk-cost ALL OK (12: 0 of 230), ptime ALL OK, IHA 2/2, coop-e2e 68/68.
- quickcheck PASS (5 runs). The buổi median was 2305 vs live 1357. Runs: branch 1082 / 1122 / 3821 / 4120 / 2305, live 1357 / 1448 / 3424 / 1058 / 1260.
- Direct check at CPU ×4, 12 runs each: nextBuoi compute is 426 vs 409 ms median (+4 %; the max is 538 vs 794). The whole step is 3395 vs 3145 ms, driven by the cards.
- No perf regression.
NOTE FOR MAIN: if main moves again, assemble.py can conflict (the module list). Keep main's list and append 'jwalk.js' last. Then take theirs for index.html / sw.js, run assemble + build_site + coop-e2e.
STATUS: PASS → LAND READY review/jagday-walk-rv 239b22c5b9554fbb12e44a23456165a7e1904553 (covers walk-cost-rv2 bd2b1c59), coop-e2e PASS + co-op seat check.
<<<<<<< HEAD

### ROUND 6 addendum: final-merge LIVE 32c0e33b (D #13 order, 21/11 ~03:00Z) → LAND READY f0660492
- Merges: 32c0e33b (3c96ad5e), then 56ff0db0 (f06604929e49a3c43c66cdb0914d7d4e7f28960a = HEAD). For 32c0e33b, assemble.py conflicted: main's list (+ jname.js, jnamefix.js) with jwalk.js appended last. index.html / sw.js took theirs both times, then assemble + build_site.
- LIVE-revert audit (history deepened 400, merge base 64d2e094 correct):
  - (1) The files differing from LIVE (28, excl. index / sw) are the same set before and after each merge. Each file's ± lines are identical to the branch's diff at the previous merge, except assemble.py, whose diff is only + 'jwalk.js'.
  - (2) Of 90 lines HEAD removes from LIVE, 87 are removed by the branch's own non-merge commits. The other 3 are walk-cost conflict resolutions from earlier merges, and each keeps LIVE's text: j77 «home too» spill; j41 k===S.place with LIVE's j77When kept; jbal BAL.walk + npc:1, pen:1 (an insertion only).
  - Clean: no LIVE hunk is reverted.
- Gates on 3c96ad5e: ag-carry-turn 6/6 · ag-walk 4/4 · walk-cost ALL OK (12: 0 of 254) · coop-e2e 92/92 (main's suite grew) · quickcheck PASS (5 runs, buổi 1260/1287, old save ok, core gates PASS).
- Gates on f0660492: ag-carry-turn 6/6 · ag-walk 2/2 · coop-e2e 92/92 · quickcheck PASS (5 runs, buổi 1023/1354).
- Main then moved to 9c1dd605 (kit-pcrow-square). merge-tree finds conflicts in index.html / sw.js only, not in assemble.py.
STATUS: PASS → LAND READY review/jagday-walk-rv f06604929e49a3c43c66cdb0914d7d4e7f28960a (covers walk-cost-rv2 bd2b1c59), coop-e2e PASS (92/92) + co-op seat check (ROUND 6), LIVE-revert audit clean.
=======
>>>>>>> 60c0578d (B ROOT-4 claim map-places mem fix)
