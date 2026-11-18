# REVIEW role-parity PART 1 (reviewer opus, foreman C-AG #15) — 18/11
PRIORITY #1 CHECK: OD 18/11 ~21:30Z ROLE PARITY (brief dev/handover/briefs/role-parity.md) | main fa411d6f (ag-deed-perf r6), no role-parity code on main | review/* review/role-parity d6c2dc17 (this one), no other | claims none other | reused the worker report §1–§4 + reports/ag-all-parity.md.
START_CTX ~5 % of 1M.

## VERDICT: FAIL (review/role-parity d6c2dc17; reviewer merge branch review/role-parity-r1 75f9dd84 = d6c2dc17 + live main fa411d6f + rebuilt root site, pushed for reuse)

### The FAIL (one blocking family)
1. **The role-parity gate is nondeterministic → "the test fails on any NEW gap" and "promotion = EXACT" are not proven.**
   dev/tools/role-parity-scan.js line 126 builds each world with `start()` under the page's UNSEEDED Math.random; `SEED(7)` only starts after (lines 69/95). Every run draws a different harem (ranks, staff, targets), so state-gated rows move between ranks and sides. Four runs, four different gap sets, every one FAIL:
   | run | build | NEW gaps (first 25 shown) | open rows "now closed" | promotion EXACT |
   |---|---|---|---|---|
   | A | r1 (merged) | cx2:fert t1–t7, hh cx2:maidTalk, hh cx3:staffThuong, cx3:staffUp t2–t7, up cx3:tell / harm:accuse / banphe / expose / tieuhuy / trinhth, harm:tat t4–t6, t1 harm:trip | 18 | ok |
   | B | r1 (same build) | cx2:maidTalk t1–t7, hh cx3:staffThuong, up N-ONLY harm:accuse / banphe / expose / tieuhuy / trinhth / uyhiep, t1 harm:phonghoa, t2 N-RANK harm:tat, maid maid:errand / maid:pil | 24 | ok |
   | C | **worker tip d6c2dc17 (unmerged)** | cx2:fert t1–t7, hh/up cx2:maidTalk, harm:accuse / banphe / blockf / expose / tieuhuy / trinhth / uyhiep, hh hh:judge, **label:Chuyện cũ t1–t7** | 28 | **FAIL: NPC risen maid lacks harm:blockf vs her born clone** |
   (run C also OOM-killed once when two scans ran in parallel; rerun alone.) The same build flips a row P-ONLY ↔ N-ONLY (run A vs B, up harm:accuse…), so the baseline was frozen from ONE random draw and cannot gate anything.
   **Fix (worker):**
   a. Seed the WHOLE page before load like dev/test/ag2perf-deeds.js does (addInitScript: Math.random LCG + crypto.getRandomValues, frozen Date) so `start()` is deterministic; then prove it: two full runs on the same build give byte-identical JSON.
   b. Better still, make the world-dependent rows world-independent: the scan already forces symmetric "VAR" worlds on the DOER; also force the TARGETS per rank (a target of each rank/state for tat/trip/pushp/mediate/staff*), so a row's verdict depends on the rules, not on who was drawn.
   c. Regenerate role-parity-open.json from the seeded scan; key the open list by role|key|**side** (today role|key, so a P-ONLY → N-ONLY flip passes silently); add a cap `OPEN.length <= <current count>` in the test so the baseline can only shrink without a reviewer seeing the edit.
   d. Re-check `label:Chuyện cũ` (an unmapped player button seen in run C, t1–t7): map it (KEYLAB) or exempt it with a reason — it is not in the baseline.
   e. Promotion exact-set: re-prove with the seeded scan (run C showed harm:blockf only on the born clone).

### What PASSED (keep; no rework needed)
- **Code (law 1 + law 4):** riseCore (jagmaid) is ONE function for srvRise, amRise and the j14 eye path; numbers in BAL.ag.maid.rise {b,d,danh,bac,ghen} + BAL.mline.riseLoy/riseRel. Her relation numbers unchanged (BAL.eff.j42.srvRise [25,−25] = riseRel 25, tin ≥ 60 = riseLoy 60); Sủng = 15 + S.sung/5 = old 15 + nt/5 (S.nt is an alias of S.sung while she is a maid, jagmaid amAlias). NPC side now gains the same Danh/Bạc and the old master's ghen — two-way. adSrv / j83 works card: `S.srv && !S.srv.risen` — a risen player maid gets the consort doors. No player-visible text added (VANPHONG n/a), no UI (kit n/a).
- role-parity.test.js riseCore block: ok (Sủng 23 / Danh 5 / Bạc 20 / ghen 5 both sides) on every run.
- Scan honesty (apart from the seed): NPC side reads the live AGREG providers of agGrp; player side reads the live builders; unmapped player buttons surface as `label:` gaps (not hidden); exemptions (role-parity-exempt.json, 28 entries) each carry a reason and match the ag-all-parity exemption lists. Swallowed provider errors can only ADD gaps, not hide them.

### Gates (r1 = d6c2dc17 + main fa411d6f, rebuilt)
| gate | r1 | live main fa411d6f | note |
|---|---|---|---|
| quickcheck | **PASS** (core gates one-core-guard / rules-one-source / kit-conform / coop-one-world, time-spill, open 1447 ms, old save ok, perf render 215/210 ms, buổi 1176/963 ms, tasks>200 14/14) | — | CDN reachable here |
| role-parity.test.js | **FAIL** (above) | — | tip d6c2dc17 FAIL too |
| agmaid_check | 1 FAIL «Tiến cử option text: no invented odds» | **same 1 FAIL** | pre-existing, proven |
| ag-par3 | run1 1 FAIL «Nhờ giúp đỡ», run2 1 FAIL «Mời đến cung ta» | run1 2 FAIL (same two), run2 ALL PASS | pre-existing flake, proven |
| ag-stf2 | 23/23 | | |
| ag-*.test.js (13) | all PASS; ag-all 1 FAIL once then PASS; ag-know 1 FAIL once («TIN BÁO API») then 25/25 ×2 | ag-know 1 FAIL once («8 khắc chain») then PASS | flakes on both |
| deeds ±3 % (ag2perf-deeds 160 buổi) | seed1 607, seed2 569 | seed1 615, seed2 569 | −1.3 % / 0 % PASS |
| coop-e2e | BLOCKED (co-op host not in this env) | | not faked |

Shots: none taken (no UI change). Worktrees cleaned after verdict.
