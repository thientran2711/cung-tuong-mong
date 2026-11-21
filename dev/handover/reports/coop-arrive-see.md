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

## REVIEW r1 (opus BIG reviewer, 11/21/2026) — branch review/coop-arrive-see-r1
PRIORITY #1 CHECK: OD-CO1 = GAP_LIST row (map-places r2) | main jcoopworld refreshHere/keepFriendPos (reused) | review/*: coop-host-lag-r2 (jcoophl.js only), coop-thin-g-f1 (jcoopworld +90/-?), coop-guest-names(-r1) (j61.js only) | claims: this worker only.
START_CTX ~8 %.
**Root cause verified, but only for thin level 7+.** The worker's cause (host-side lists from a stale S.where, no keepFriendPos before the host's goTo, the other list not refreshed, ref-lost friend entry doubled) is real at level 7+ and the fix works there.
**Missing: level 0 = the LIVE default.** The room level is min(host want, caps); want() is 0 unless the dev flag `ctm-thin` / `?thin=` is set (jcoopthin.js:29, coop/worker thinLevel) — real players play at level 0. presAll() was gated on level 7, so at level 0 the fault stayed exactly as OD-CO1: BEFORE (8ee5f709, new L0 harness) L0 swap0 **20/26**, swap1 **20/25** — every "second arriver sees the first" check FAIL (host-first: her phone misses him; her-first: host misses her) + the buổi-step rows. Cause at level 0: each phone's goTo builds its list from its own S.where, then the jplx goTo wrapper rebuilds tgk/nth/pd lists without the friend, and nothing refreshes the arriver's list afterwards (onPos refreshes only when the FRIEND moves).
### r1 fix (jcoopworld.js only, no UI, no number)
- presAll(): below level 7 (and on the host at any level < 7) = ONE key-gated refreshHere of THIS seat's own list (key: week, buổi, place, who is in the list, the friend's place in S.where, dead) on BOTH phones; level 7+ host path unchanged; her phone at 7+ unchanged (lens7).
- dev/test/coop-arrive-see.js: level 0 mode (L0: no lens check, her person staged on her phone, the "host's copy of her" row = her phone).
### Code checks
- Name match (ref-lost friend entry): only entries with ref null AND the friend's full name / «Hoàng hậu <name>»; coop-name-clash on main keeps one living full name per person across both seats (nmFix), so no live NPC shares it; an NPC with a valid ref is never matched by name; a wrongly dropped NPC would be re-added from liveRivals by its ref. coop-guest-names(-r1) touches j61 keys/masks only — no overlap. Safe.
- goTo reads co-op places from S.where only (recAt is off in co-op, j2.js:122), the same source as refreshHere: the refresh never drops a person goTo placed.
- Perf: presAll runs at every render but is key-gated (string join of ≤ ~10 entries); quickcheck perf new/live render 303/287 ms, tab 643/653, buổi 1504/1533 (median of 3, within noise).
- Old saves: nothing saved changes (CW.presK is runtime only); quickcheck old save ok.
- Levels: 0 (live) / 7 (F2) / 9 (F4) tested; CAP is 9 in this build (no level 13 here).
### Tests — first on 564737f1 (contains LIVE ba9b6243), then re-run on PASS sha a1c0a55e (contains LIVE 419079d7, which changed jcooptimer.js)
| test | result |
|---|---|
| coop-arrive-see L0 swap0 RUNS=2 | 41/41 (BEFORE 20/26) |
| coop-arrive-see L0 swap1 RUNS=2 | 40/41 → rerun RUNS=1 26/26 (one visitPal walk on her phone did not leave home — timing, passed on rerun and on BEFORE) (BEFORE 20/25) |
| coop-arrive-see L7 swap0 RUNS=2 | 41/41 |
| coop-arrive-see L9 swap0 / swap1 RUNS=5 | 89/89 · 90/90 |
| coop-places L9 swap1 | 19/19 |
| coop-places L9 swap0 | 18/19 ×2: G3 (host buổi steps during her walk) — PRE-EXISTING: origin/main ba9b6243 gives the same 18/19; it fails exactly when the harness has to play a setup week (worker's run skipped it: 18/18). Harness follow-up, not this branch. |
| coop-e2e (tt/nc) · COOP_NC_FORCE=1 | 94/94 · 96/96 |
| role-parity (alone) | ALL PASS |
| undef-scan | PASS (268 names) |
| quickcheck 564737f1 | run 1: core gate G4 coop-one-world seed 3 FAIL once (R.evm 1) → probe alone 6/6 PASS (flake); run 2 PASS; run 3 (--runs 5) PASS |
| perf | solo path untouched (every new line sits behind CW.on); buổi per-run spread 1228–4783 ms (random events) → medians 1504/1533, 2208/1590, 2535/1637 = noise; render 303/287, 268/272, 302/305 |
| merge with coop-guest-names-r1 d45076b6 (Foreman B ask) | coop-arrive-see L0 swap0 25/25, L0 swap1 25/25, L9 swap1 26/26 · coop-places swap1 18/18, swap0 18/19 (G3 pre-existing, setup week) — no conflict but index/sw |
| **re-run on a1c0a55e** | coop-arrive-see RUNS=2: L0 swap0 41/41, L0 swap1 41/41, L9 swap0 41/41, L9 swap1 40/41 (her visitPal walk did not start: place stays home — harness flake, also seen once at L0 swap1 and passed on rerun; follow-up: the test should assert the walk began) · coop-places swap0 18/18, swap1 18/18 · coop-e2e 94/94 · NC_FORCE 96/96 · role-parity ALL PASS · undef-scan PASS (276) · quickcheck PASS (old save ok, core gates PASS, render 339/276 tab 639/568 buổi 1676/1401 = noise band above) |
Laws: 1 two-way (both seats, both orders, SWAP, level 0 + 7 + 9) · 4 no number · 6b the friend is where she really is, at the live level · 9 no UI (no shots needed) · 11 whole family: every path now ends in a render/goTo → presAll on every level.
Overlap: coop-thin-g-f1 changes jcoopworld.js (+90 lines; goTo/render wrappers region possible) — whichever lands second re-runs the other's tests (this branch: coop-arrive-see L0/L9 both swaps, coop-places). coop-host-lag-r2 = jcoophl.js only (wraps render: no textual conflict; rerun coop-arrive-see L0 after it lands).
VERDICT: **PASS a1c0a55e** (review/coop-arrive-see-r1; = worker fix + r1 level-0 fix + test L0 mode; contains LIVE 419079d7). Landing: ff main to a1c0a55e if main has not moved; else re-merge (index.html/sw.js rebuild) and re-run coop-arrive-see L0 both swaps.
