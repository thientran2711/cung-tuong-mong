# jlost-kyngo — one home for every lost-case piece (E42, opus, FOREMAN E #26)
PRIORITY #1 CHECK ('jlost|Kỳ ngộ|loFind|loGoneOwner|lost case'): OD 8 | ledger 2 | claims 8 (none on this fault) | main 15 (jlost.js, jky.js, jil.js) | review/* 0 code fix (review/dresscode-fix-r3 aa3c6854 = the harness reused: coop-dresscode-scan / dresscode-loan-scan helpers copied, not rebuilt) | archive 49.
Branch review/jlost-kyngo from origin/main 32c63abc. Head: 2fa2e667 (code 9a61722f + test-only commit). jky.js ret/ev lines left exactly as main for review/dresscode-fix-r4 (kyLc, E30c/E30d): «Giữ lại» goes through loKeepBy by a wrapper after KY.TITLE; git merge-tree with r4 = only index.html/sw.js conflict (rebuild at merge). Both shapes work together (lostReturn takes the lo-marked copy or the bare case object)..

## Root cause (law 6c REAL OBJECTS)
jky.js passed the CASE's own piece (`c.e`, never marked `lo`) to `lostReturn`. `lostReturn` looked the case up only by `e.lo`, found none, took the
"closed case, owner gone" branch and wrote a fresh «dead» copy (`loClean` = a new object, so `ilAt` never stopped it) into the Nội vụ phủ box
(own "" → logged as "me") — while the case stayed st "lost". The next finder (Kỳ ngộ again, or «Giữ lại») moved the real piece → 2–7 copies.
Same in SOLO (not co-op only): the solo scan on main finds 23–31 duplicated pieces in 108 tuần. «Giữ lại» also never checked the case still held the piece.

## Fix — ONE owner change (jlost.js), every road through it (law 11 whole group)
- `loCaseOf(e)` (by `e.lo`, else by identity `c.e===e`) + `loHolds(c)` (st "lost", nobody holds it).
- `lostReturn(e,how)` → owner. The case's own piece moves only while the case holds it; a stale road moves nothing and returns false.
- `loKeepBy(c,p,how)` → kept by p (marks lo/gh/by, case held). Used by: loLose thief-keep, jil ilRob (robber), jky «Giữ lại».
- `loGoneOwner`: only a case that never left (no `c.at`) writes its piece to the box; a held case whose copy left was routed with that copy.
- jky: «Mang trả» / «Giữ lại» / «Của mình tìm lại» go through lostReturn / loKeepBy; stale card → «X đã có người tìm thấy trước» (no move).
- jil ilCensus: a DEAD holder's lost-case piece handed back to its owner keeps the SAME id (before: an owner listed later found the id "seen"
  → fresh id = trace broken, the scans' 2–7 "vanish"); logged «di vật về chủ».
- Guest seat (co-op): `loHolder` returns nobody when !worldOn() → the found piece goes to Nội vụ phủ (loFind «nvp») instead of HER COPY of a
  host NPC (lived nowhere after the merge: coop-lost-scan guest vanish).
No new number (law 4: one-core PASS). New player words: «… đã có người tìm thấy trước» (cổ trang, no %).

### Every road that moves a lost-case piece (scan script + before/after)
| # | road | where | before | after |
|---|---|---|---|---|
| 1 | Kỳ ngộ «Mang trả» / «Của mình tìm lại» | jky SPEC.item/ev | lostReturn(c.e): no case found → «dead» box copy per call, case stays open | lostReturn finds the case; stale → nothing |
| 2 | Kỳ ngộ «Giữ lại» (NPC + her card) | jky SPEC.item | own copy, no "still there?" check | loKeepBy (only while the case holds it) |
| 3 | thief keeps (steal and keep, loKeepPick) | jlost loLose | own inline copy | loKeepBy |
| 4 | robber (cướp y phục) | jil ilRob | own inline copy | loKeepBy |
| 5 | owner gone / case expired | jlost loWeek → loGoneOwner | box copy even when a holder's copy existed elsewhere | only a never-found case |
| 6 | holder dies | jil ilCensus → lostReturn | piece re-numbered (trace lost) | same id, logged |
| 7 | found: home / holder / Nội vụ phủ | jlost loFind | guest: into her NPC copy (vanished) | guest: Nội vụ phủ; host/solo unchanged |
| 8 | hearings, askback, giveback, handin, sneak, holder hands in, owner asks, plant on owner, j92 wdFrameTake, Soát rương | jlost / j92 | holder copy taken out then lostReturn(e.lo) | unchanged (already one home) |
| 9 | stale case closed (piece already in a chest) | jil ilStaleCases | — | unchanged |
| 10 | co-op NPC thief on her (famApply rm lost / ret) | jcoopworld | «ret» pushes a copy of c.e without checking the piece is home (dup); «rm» itemAt falls back to any piece of that kind (vanish) — found by E30d coop-dresscode-scan | **OPEN → E44** (review/coop-famops, stacked on 2fa2e667); my table had it wrong as «unchanged» |
| 11 | dresscode loans (dcOwnFit / loOk e.bor) | not on main | guarded on review/dresscode-fix-r3 | n/a |

## Scans (NEW dev/test/lost-one-home-scan.js solo · NEW dev/test/coop-lost-scan.js 2 seats, LIVE Worker)
Census = every chest / worn / veil / pawn of everyone + ledger box + an open case still holding its piece + a dialog offering it; host world + the guest's own S.
| scan | main 32c63abc (before) | review/jlost-kyngo (after) |
|---|---|---|
| solo lost-one-home-scan, 108 tuần, every road | 23–31 pieces duplicated (704–813 piece-tuần), 2–3 vanished | 0 dup · 0 vanish · 0 lost-case net (6 runs, seeds 12–22, after the census fix) |
| co-op coop-lost-scan, 76 weeks, both seats | 25 pieces dup (592 piece-weeks), 7 vanished, host net +3 | 0 dup · 0 vanish · 88/88 (head build); 1 net line outside jlost (y_maudon from mkt, host w71) |
| co-op, first fix only (c311e458, before the census fix) | — | 0 dup, 1 vanish (dead holder → id renumbered) → fixed in ffa41f94 |

## Gates
| gate | result |
|---|---|
| quickcheck (806d7910; code after it is the jky wrapper only) | QUICKCHECK PASS · core gates PASS · old save ok · perf new/live render 279/255 tab 486/502 buổi 1450/1896 |
| one-core-guard | PASS (fails 0) |
| coop-e2e (LIVE Worker) | 92/92 |
| coop-lost-scan 76 wk both seats (NEW) | 88/88, 0 dup, 0 vanish |
| lost-one-home-scan solo 108 tuần (NEW) | ALL PASS ×6 seeds |
| role-parity.test ×2 (alone) | ALL PASS ×2 |
| kyngo-unit | PASS |
| lost-items 755x1000 | same 44 checks as main, 0 differ |
| item-ledger.js | crashes at its first step on main too (R2) |
| ge-guard | n/a (no option label changed; jky stale text now = r4's "") |

## Open (FOR FOREMAN)
- R1 law 1 parity, co-op guest: her lost piece cannot turn up in an NPC's chest on the guest (it goes to Nội vụ phủ; before it went into her NPC copy and vanished). Full parity needs a host op that places her piece in the world NPC with a seat-safe case id (case ids are per seat) — a co-op protocol feature, not done here.
- R2 dev/test/item-ledger.js crashes at its first step («setting 'ret'») on main too (stale test, not this change).
