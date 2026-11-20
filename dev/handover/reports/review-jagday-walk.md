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
