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
