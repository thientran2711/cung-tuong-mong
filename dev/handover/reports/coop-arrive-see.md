# coop-arrive-see (GAP OD-CO1) — worker report
PRIORITY #1 CHECK ('OD-CO1|refreshHere|applyWhere|keepFriendPos|presence'): OD 0 | ledger 0 | CLAIMS: only this row + map-places-r2 r1 (filed OD-CO1) | main: jcoopworld refreshHere/keepFriendPos/applyWhere (reused, extended) | review/*: no branch on this fault | archive 0.
START_CTX ~12 %. Branch review/coop-arrive-see, READY sha **8ee5f709** (merged origin/main 75ad237d; index.html/sw.js rebuilt). TIER BIG.

## Real cause (two faults, both on the host, where both persons live at thin level 7+)
1. **Stale friend place in the walker's own S.where.** goTo builds the people list from S.where. Her walk runs on the host in her context;
   there `S.where[<host entry>]` was set only by keepFriendPos on her buổi step (placeWhere / nextBuoi), i.e. the host's place of the LAST
   buổi step, never his walk since. So when the host was already at X, her list missed him (her copy and her phone: `fw:"r2"` = his palace
   while he stood at tgk). The same on the outer seat for the host's walk after hers (no keepFriendPos before goTo). Nothing refreshed the
   OTHER person's list after a walk either, except herMoved (outer only).
2. **The friend entry in her stored person loses its ref.** Her store keeps refs as {$r:id}; the friend entry (the host's stand-in) is re-made
   in every withSeat, so her old entry of him comes back with `ref:null`. refreshHere then neither removed it (he went home → still listed)
   nor recognised it (a second copy pushed beside it: "X, X" on her phone).
   Also found on the way: jplx's goTo wrapper (tgk/nth/pd...) rebuilds the list after the presence pass; a length-only key missed it.

## Fix (jcoopworld.js only; no new UI, no new number)
- goTo wrapper: `keepFriendPos()` BEFORE the walk (the arriver's list reads the friend's live place), `presAll()` after it.
- `presAll()` (host, level 7+): ONE presence refresh of BOTH persons (outer + withSeat(her): keepFriendPos + refreshHere), gated by a key of
  places / buổi / WHO is in each list; run at every host render and after every goTo; onPos with new live stats forces it.
- refreshHere: a rival/hh entry with a lost ref whose name is the friend's counts as the friend (removed / re-added once, never doubled).
- refreshHere is a no-op on her phone at level 7+ (`lens7`): her visit is the host's (one source); her own pass + the patch doubled him.
- jcoopthine placeWhere (her buổi step in her context): keepFriendPos before refreshHere.
- Tried and DROPPED: presAll inside the thin delta timer/flush (jcoopthin) — it desynced her phone (coop-places G1/G2/R1 FAIL); reverted.

## Scan (law 11): `python3 dev/test/coop-arrive-scan.py` — 70 sites that set S.place / S.visit
BEFORE: friend shown to the arriver only if a later goTo/nextBuoi/placeWhere hook ran on that seat, and her copy never with the host's live
place. AFTER: every site is followed by a host render or a goTo → presAll refreshes both seats. Paths tested live: walk (goTo, map), walk after
a buổi step, return home (both ways), visit the friend's palace (visitPal, both ways), host seat + guest seat, SWAP devices.

| path | BEFORE (main) | AFTER |
|---|---|---|
| host at X first, she arrives | host sees her; **her phone misses him** | both see |
| she at X first, host arrives | **host misses her** (map-places r2 note) | both see |
| leave home while the other stays | left one still listed on her side | gone on both |
| buổi step at X / then join | stale until next walk | matches places |
| visitPal friend's palace | ok | ok |

## Tests (sha 8ee5f709 unless said)
- NEW dev/test/coop-arrive-see.js (live Worker, level 9): RUNS=5 × {host-first, her-first} × {tgk, nth} + buổi step + home + visitPal:
  swap0 **89/89**, swap1 **89/89**, 0 miss. On main before the fix: 13/23 (RUNS=1).
- coop-places swap0 18/18, swap1 18/18 · coop-e2e (COOP_A_ORIGIN=tt COOP_B_ORIGIN=nc) 94/94 · quickcheck PASS (old save ok, core gates PASS,
  perf new/live render 220/232 ms) · role-parity ALL PASS, undef-scan PASS, one-core gates (pre-merge sha 0d858b4b; quickcheck core gates re-ran one-core-guard post-merge).
- No UI change → no device shots.
Laws: 1 two-way (both seats, both orders, SWAP) · 4 no number · 6b real people (the friend is where she really is) · 9 no UI · 11 scan above.
