# review-coop-b1-regress — reviewer r1 (sonnet, tests only)

PRIORITY #1 CHECK: OD trait pool (17/11 ~05:45Z, d296f3cd) | ledger 0 | claims B coop-b1-regress worker, CLAIMS:870 | main 03a776e44 | review/coop-b1-regress 24d8eb38.

## Verdict: PASS aea2f74f (review/coop-b1-regress-r1 = 24d8eb38 + 1 small fix + main 03a776e44)
- 0 game files changed (diff vs origin/main = 7 test files, +1 reviewer fix in 2 of them). Assembled index.html identical to main's.
- Every change is a TRUE update to the live rule (nết read from p.net / netQ / BAL.net.T), not a weakening — table below.
- One reviewer fix (below): the worker's emotion-acts setup left the other two pool slots random, which made 'gen' / 'out' flaky.

## Assertion table (test -> old -> new -> same strength)
| Test | Old | New | Same strength |
|---|---|---|---|
| coop-b1 / coop-r2 / coop-rev2 act() | turn every `x.tr==="trung"` runner into lanh for the forced act (roll forced true) | `netQ(p,"loyal")` = 0 for all my runners during the act, restored in finally | YES (proves the same: with the loyal refusal off, the forced act lands on both seats; netIs/nq/qv all read netQ, j29.js:6 netIs(sv,"loyal")). Slightly broader (every runner, not only trung) = safe. Assertions untouched |
| coop-r2:92 NPC runners | `x.tr='lanh'` (dead write) | loyal nết swapped for a non-loyal one of the same group in x.net | YES (was a no-op, now really removes the loyal runner) |
| night-steal-unit | Tham vọng wa > 3 x Hiền lành wk | Tham vọng > 3 x An phận (same group `ch`, other 2 nết kept) | YES, arguably stronger: An phận is Tham vọng's own opposite (p:"An phận"); same 3x bar; measured wa .586 vs wk .107 = 5.5x. Hiền lành -> Ân cần has no steal weight |
| emotion-acts out/gen/hit/lock, emotion-acts-2 plock | `S.pTr` / `v.trait` (dead) | that nết put in its slot of S.net / v.net | YES after reviewer fix (see below) |
| emotion-acts-2 hoitimid | timid "Nhu mì" | "Khiêm nhường" | YES: Nhu mì -> Khiêm nhường in BAL.net.old; Khiêm nhường is in T_TIMID (jemoact.js:94); "Nhu mì" no longer is |
| opt-render Hàng chợ đen | `s.tr="tham"` | `s.net=null; s.tr="tham"; netOf(s)` -> pool reseeds Ham lợi | YES, and better: on main the old test warned "C:Hàng chợ đen not produced"; on r1 the card is produced (warn gone) |

## Reviewer fix (96e0efae)
Worker's `netOf(p).slice()` kept the player's two OTHER random nết. T_STINGY (Tham vọng / Ham lợi / Xảo quyệt) in slot `ch` blocks "gen" (1180x820: gen tries 41, ok false); a timid ld word (Rộng lượng) turns "hot" into "even" for 'out'/'lock'. The old single S.pTr had no such noise. Fix: the other two slots are neutral filler ("Điềm tĩnh" / "Thanh liêm" / "Ham học" – in none of T_HOT / T_TIMID / T_GEN / T_STINGY) so only the tested nết counts. Intent restored, flake removed. emotion-acts PASS x2 at 755x1000@2 + 1180x820@2 after it.

## Runs (merged on main b5d109fe0, then main 03a776e44; flakes rerun)
- coop-b1: 43/43 x6 (+ 43/43 on 03a776e44). Two runs on b5d109fe0: 19/41 and 19/41 = "each has the other as a consort entry" (friend entry never placed, before any changed line; the known coop-stable class the worker also saw) then 43/43 on all later runs.
- coop-r2 47/47 · coop-e2e 63/63 · night-steal-unit PASS · emotion-acts PASS (x2 sizes) · emotion-acts-2 PASS.
- coop-rev2: 36/38 (1st), 27/38 and 28/38 (flake class above). Always FAIL "deferred flip (jcycle card)" + "deferred flip: guest has her night" — the UNCHANGED main test fails the same 2 (28/38) = pre-existing, not a nết read (tn w1 vs new week). Left for Foreman B.
- opt-render (755x1000@2): D:night "no night card" + 10-11 F:play "dialog neither event nor act" — identical on main's unchanged test (12 F:play there) = pre-existing; the only diff is the Hàng chợ đen warn gone.
- emotion-acts-2 first runs crashed at 'kinds' (`S.mood` undefined) when run 3 at once; same on main's test; clean when run alone. emotion-acts 'scold' failed once (BÁO card on top; unchanged code), PASS on reruns.
- quickcheck PASS (b5d109fe0: 118 s, open 1380 ms; 03a776e44: open 1417 ms, old save ok, perf render 134/135, buổi 769/751, core gates PASS).
- No images made or committed.

READY FF aea2f74f. ~100 % review done.
