# jlost-kyngo REVIEW — E42r (opus BIG), opened by FOREMAN E #26
PRIORITY #1 CHECK ('jlost|Kỳ ngộ|loFind|loGoneOwner|lostReturn'): OD 8 | ledger 2 | claims 8 (E42 session_01DgYSWo2PtuCgvYCBtqoEdV; this review row 841) | main 15 (jlost.js / jky.js / jil.js / j92.js / jcoopworld.js) | review/* review/jlost-kyngo 2fa2e667 (reviewed), review/dresscode-fix-r4 27537307 (jky kyLc lines; merge checked) | harness reused: E42's lost-one-home-scan / coop-lost-scan + E30r3 COOP_SKEW idea (coop-dresscode-scan).

## VERDICT: PASS 8527f09c4778b2ca325f9a34786efecdd12589a8 (review/jlost-kyngo-r1 = 2fa2e667 + review test commit 3aeff00f + final merge LIVE origin/main ba9b6243; FF on ba9b6243)

## Laws checked (START_CORE ★)
| law | result |
|---|---|
| 6c REAL OBJECTS | PASS — root cause confirmed in code: jky passed the case's bare `c.e` (no `lo` mark) to `lostReturn`, which only looked the case up by `e.lo` → «case gone» branch → fresh `loClean` «dead» copy in the box per call while the case stayed open. Fix finds the case by identity (`loCaseOf`) and moves the case's own piece only while the case holds it (`loHolds`). |
| 11 WHOLE GROUP | PASS — every lost-case move road read in code (grep lostReturn / loGoneOwner / keep pushes over dev/build): thief keep (loLose) → loKeepBy; ilRob → loKeepBy (rob flag kept, tip kept); Kỳ ngộ «Giữ lại» → loKeepBy (wrapper; same text, same case fields); loGoneOwner only for a never-found case (`!c.at`); ilCensus dead holder → lostReturn, same id; guest loHolder → nobody → Nội vụ phủ «fix». Roads 8–10 (hearings, askback/giveback/handin/sneak, holder hands in, Soát rương, plantItem, wdFrameTake, famApply) all take the holder copy (marked lo) out first → unchanged and correct with the new lostReturn. |
| 1 TWO-WAY + CO-OP LAND GATE (OD L594) | PASS solo + both seats (scans below). R1 decided below. |
| 4 ONE CORE | PASS — no new number (one-core-guard / bind / text / textrule PASS in quickcheck). |
| 7 WORDING | PASS — no new player word on this build except the unchanged texts; no option label changed (ge-guard n/a). |
| 9 KIT | n/a — no UI change. |

## Gates (rerun by me)
| gate | build | result |
|---|---|---|
| lost-one-home-scan solo 108 tuần, seeds 12 / 31 / 77 | 2fa2e667 | ALL PASS ×3 — 0 dup · 0 vanish (seed 31: 115 losses, 23 steals, 27 plants, 14 robs, 44 UI acts, 25 Soát, 3 Kỳ ngộ her cards + 2 stale cards, 4 deaths) |
| coop-lost-scan 76 wk both seats (LIVE Worker) | 2fa2e667 | 89/89 — 0 dup · 0 vanish · ledger net 0 lost-case (3 «other» lines from mkt, outside jlost) · host 30 cases / guest 2 · friend-entry holder max 0 |
| coop-lost-scan COOP_SKEW=7 (guest clock 7 months ahead) | 2fa2e667 | lost checks all PASS (0 dup · 0 vanish · net 0 · 76/76 weeks merged); 90/91: one «#next enabled» harness stall at one buổi (two co-op scans + quickcheck at once, load 9) — not an item fault |
| lost-guest-probe (NEW, guest seat emulated: worldOn false) | merged r1 | ALL PASS — 12/12 her lost pieces → Nội vụ phủ (no NPC copy) → back in her chest once mended; Kỳ ngộ «Mang trả» / «Giữ lại» / stale cards = exactly one copy |
| combo main + jlost-kyngo + dresscode-fix-r4 (local merge, r4's own assemble.py/jbal2.js conflicts resolved union for the test only) | local | lost-one-home-scan seed 31 ALL PASS (kyStale 2) · kyngo-unit PASS |
| kyngo-unit | 2fa2e667 root + combo | PASS / PASS |
| quickcheck | merged r1 (fd8fcba8) | PASS: own build, old save ok, perf new/live render 148/225 tab 457/507 buổi 1639/1742, one-core ×4, odds-cap, coop-one-world, mk-layer, manifest, npc-purpose, anchor-table · FAIL only G4 80-dialog-fixed (#54 new-title plate on the event picture) — SAME 2 FAIL on LIVE origin/main e391b85f alone (ran the hook on a clean LIVE worktree): pre-existing, not this branch (R3) |
| coop-e2e (LIVE Worker) | merged r1 | 94/94 (suite grew from 92) |
| role-parity.test ×2 (alone) | merged r1 | ALL PASS ×2 |

## R1 decision (guest seat: her lost piece never turns up in an NPC chest) — NOT BLOCKING
- Law 6c holds: on the guest seat the piece goes to Nội vụ phủ («fix» box) and comes back to her chest after BAL fixW weeks (probe 12/12); before the fix it went into her COPY of a host NPC and vanished at the merge. Strict improvement.
- Law 1 two-way holds: what others do to her still reaches her on the guest seat through the host (jcoopworld famApply `rm how:"lost"` → a case held by the host NPC thief in the real world, `ret` brings it back), and she acts back through her own case roads. What is missing is only one random «where it turns up» outcome (a third NPC finds it) on the guest seat — a co-op protocol feature (seat-safe case id + host op), so under law 18 FEATURE FREEZE it goes to the parking lot, not this fix.
- Host side checked too: no host case was ever held by a friend entry (v.coop copy) in 76 weeks (new scan line).

## R2 — note only
dev/test/item-ledger.js crashes at its first step on main too (stale test).

## R3 — note for FOREMAN (pre-existing on LIVE)
quickcheck hook 80-dialog-fixed: «#54 the new-title plate sits ON the event picture» FAIL on 755x1000 + 1180x820 on LIVE e391b85f itself. Any LAND whose go-live runs full quickcheck will show it until the kit-dialog owner fixes #54.

## Small notes (no fix needed here)
- Without r4, a STALE «Mang trả» card still prints «… về lại tay …» while nothing moves (item side correct). r4's kyLc returns "" there; E42 left those jky lines to r4 on purpose (clean merge). Closes when r4 lands.
- dresscode-fix-r4 × jlost-kyngo: git merge-tree = only index.html/sw.js conflict. r4's kyLc (marked copy) + E42's lostReturn by identity work together; E42's «Giữ lại» wrapper overrides r4's untouched inline keep. r4 itself conflicts with LIVE main in dev/build/assemble.py (list: add jdc0/jdc) and dev/build/jbal2.js (both sides append BAL blocks: keep both) — E30d's re-merge.

## Review fixes pushed (test-only)
- coop-lost-scan.js: COOP_SKEW=N (guest life clock ahead, as E30r3's scan) + «no host lost case held by a friend entry in any week».
- NEW dev/test/lost-guest-probe.js (guest seat roads of her own lost case).

## Final re-gate on 8527f09c4778b2ca325f9a34786efecdd12589a8 (after merging LIVE ba9b6243: index.html/sw.js only, rebuilt)
lost-one-home-scan seed 12 ALL PASS · lost-guest-probe ALL PASS · kyngo-unit PASS · one-core-guard PASS · coop-e2e 94/94.

LAND READY jlost-kyngo 8527f09c4778b2ca325f9a34786efecdd12589a8 (review/jlost-kyngo-r1, BIG) FOR MAIN CHÍNH 93 session_01Rc5AsKcbi9rTmDK4pY2SeT. Shots: none (no UI change); scan outputs in scratch only.
