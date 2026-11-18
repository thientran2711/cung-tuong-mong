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


# RE-CHECK r2 (part 1 + part 2 combined) — 18/11 ~22:40Z: **PASS → LAND READY f458b20df25615229fd2d5f61da3633838b02a8e**
PRIORITY #1 CHECK: OD 18/11 ~21:30Z ROLE PARITY | main 884ce97c (live at verdict) | review/* review/role-parity-2 f2b8fb0c (ROLE-PARITY #2) | claims none other.
Branch review/role-parity-r2 = f2b8fb0c + live main e16e1d6 (assemble.py: main's module list + jagacts4.js) + 2 reviewer fixes (bc8b3c1) + final-merge live 884ce97c (doc-90-women, comments only) + rebuilt root site.

## My fix list (a)–(e)
| item | result |
|---|---|
| (a) seed the whole page | DONE by worker: addInitScript LCG Math.random + crypto.getRandomValues, frozen performance.now / Date.now, start() under its own seeded LCG. **Proof: two full scans on the same build → byte-identical JSON and MD (md5 fc3b24f8…)**; test run 3 = same 150 gaps |
| (b) force per-rank TARGET states | PARTIAL: new symmetric worlds (rouge, men, malice, seen) close the §4 families; per-rank target rows (harm:pushp t2–t7, tat t4/t5/t7/hh, trip t2/t3, follow t7, mediate) stay OPEN in the baseline — stable now that the scan is seeded, so they gate honestly. Successor item, not blocking |
| (c) baseline keyed role\|key\|side + cap | NOT done by worker → **reviewer fix bc8b3c1**: role-parity.test.js keys open rows role\|key\|side and asserts OPEN.length ≤ OPEN_MAX = 150 (only shrinks) |
| (d) «Chuyện cũ» | not seen in the seeded world but unhandled → **reviewer fix**: exempt (person-card kit tab, jpcf.js data-pct, UI only) |
| (e) promotion EXACT | PASS both sides (onlyRisen = onlyBorn = [] NPC and player); the scan now compares the act set from the rank-world pass, not her real-needs draws |

## Part 2 code (laws)
- Law 1 two-way + law 4 one core: jagacts4 cx4:* runs the PLAYER's own builders, refactored to f(p,…): j25 kidCareOk/Do + kidGuardOk/Do (guard now shields any mother, decrements for NPCs too), jcycle cyHideCards(p), jration lxBorrowCard/lxBegCard/lxStealCard(p,v) (an NPC asking HER = her answer card lxAskHer; stealing from her = lxStolenNote), j83 IROUTE + illBuy routes, j22 manCards(p,m,k) + trystNpc (same odds odA of the doer, same death if caught; his tình ý per woman). Typed numbers moved to BAL (BAL.manRd, BAL.btn.kidGuard.mo/blk, BAL.ag.par4 = worth/gates only).
- Law 6a real evidence: flat monthly rolls removed (canon overwrite): NPC affair start (roll 2) and death (roll 3), clever-rival cycle hide, rouge borrow/ask/steal, monthly poison buy → day-plan choices; an NPC affair is now exposed only by proof (seen within seenW → evA), the book, or a tryst caught in the act — same as hers.
- Law 6c: rouge / poison items move between real inventories (lxGive, illBuy); NPC khăn tay counted per woman like hers (m.lw / m.letters).
- Law 7 VANPHONG: no % / banned words in added strings; odds via word()/chanceW(). No new UI parts (law 9 n/a).

## Gates (r2)
| gate | r2 | live main | note |
|---|---|---|---|
| quickcheck | **PASS** on fa3e9f80, bc8b3c1, and the LAND sha f458b20 (core gates incl. one-core-guard, old save ok, perf ≈ live) | | |
| role-parity.test.js (with reviewer cap) | **ALL PASS** (11/11): 0 new gaps, baseline 150 (was 278), promotion EXACT, riseCore numbers | | 2 extra scans identical |
| agmaid_check | 1 FAIL «Tiến cử option text» | **same 1 FAIL on e16e1d6** | pre-existing |
| ag-par3 | ALL PASS | | (flaky on main, proven r1) |
| ag-stf2 + 13 ag-*.test.js | all PASS (ag-all 21/21) | | |
| deeds (ag2perf-deeds 160 buổi, r2 harness incl. AG4) | s1 603, s2 529, s3 596, s4 628, s5 697, s6 634 | s1 615, s2 569, s3 594, s4 609, s5 514, s6 231 (died t6) | per seed −2.0 / −7.0 / +0.3 / +3.1 / +35.6 / (base died); comparable seeds 1–4 total 2387 → 2356 = **−1.3 %** (mean of ratios −1.4 %) → within ±3 %. Single seeds are chaotic (any changed draw shifts the life); flagged for MAIN |
| coop-e2e | BLOCKED (co-op host) | | not faked |

Open for a successor (not blocking): the 150 baseline rows (mostly probe limits, §4.3 of the worker report) + per-rank target worlds (b).
- (18/11 ~23:00Z) REVIEWER role-parity (opus): LAND READY e12a91c82d5c1980cdda757c0c1b946f38b76629 (review/role-parity-r2 = f458b20 + final-merge LIVE ddbf9c7; quickcheck PASS + role-parity.test ALL PASS on this sha). coop-e2e BLOCKED = sandbox proxy only: the live co-op Worker ctm-coop.victoria-tntt.workers.dev is refused (CONNECT 403), the test cannot start. The branch touches NO co-op/sync file (no jcoop*/COOPW/sw sync code); its new code is host-only (agReg/agRunReg providers skip x.coop guests, as before) and adds NPC record fields (v.cyHide, v.kidGuard, v.lxBeg, m.tw/lw/afw) that ride in the host world. Quickcheck's coop-one-world probe PASSED, but a live two-browser co-op run of these fields is untested.
- (18/11 ~23:10Z) REVIEWER role-parity (opus): LAND READY f2f5c069017639eab6a9ef01374f50e2ce862d0e (review/role-parity-r2 = e12a91c + final-merge LIVE 53544bd8 coop-thin-f1; quickcheck PASS on this sha; replaces e12a91c). coop-e2e BLOCKED = sandbox proxy 403 to the co-op Worker only; branch touches no co-op/sync file.


# RE-CHECK r3 — part-1 fix (b) by ROLE-PARITY #3 72fbb3fb — 18/11 ~23:40Z: **PASS → LAND READY #2 1d29d229168ee6751ff36d924def45e0fbfa15fa** (supersedes #1 f2f5c069, which it contains; #1 was not landed)
PRIORITY #1 CHECK: OD 18/11 ~21:30Z | main 1130a49e (live at verdict) | review/role-parity-2 72fbb3fb, review/role-parity-r2 f2f5c069 | claims ROLE-PARITY #3 done.
Branch review/role-parity-r3 = f2f5c069 (LAND READY #1) + merge 72fbb3fb + final-merge LIVE 1130a49e (coop-c4-stuck) + rebuilt.
- Merge: 72fbb3fb changes only dev/tools (scan, open/exempt json, table) + dev/test/role-parity.test.js — NO game code. Test conflict resolved: reviewer side-key test kept, OPEN_MAX = 111 (= merged baseline); one «Chuyện cũ» exempt kept (#3's).
- (b) code: TARGET LADDER — one fixed target set at every rank (Đáp ứng … Hoàng quý phi + Hoàng hậu seat), as-is and in the deed's state (same place HA.here, a stealable piece, an oán to a third person, no slap mark), applied by the SAME ladder() to her gates and the NPC gates (symmetric, cannot favour one side); staff-state world for the household acts; AG.sc cache reset per probe; no network in the scan page. Restores every mutated field (finally/UNDO). Laws: tool only, no player-visible text, no numbers (law 4 n/a), law 1 judged symmetrically.
- Gates on 1d29d229: quickcheck **PASS** (core gates incl. one-core-guard + coop-one-world; perf ≈ live); role-parity.test **ALL PASS** (0 new gaps, baseline 111 ≤ OPEN_MAX 111, promotion EXACT both sides, riseCore numbers); 2 full scans byte-identical; ag-all 21/21. (One earlier quickcheck on 731757ab failed coop-one-world while 2 scans ran in parallel; both seeds then PASS alone on r3 and r2, and the final quickcheck PASS includes it → load flake.)
- Game code = LAND READY #1 + live main's own changes, so #1's results stand: ag-stf2 + 13 ag-*.test + ag-par3 PASS, agmaid 1 FAIL pre-existing on main, deeds seeds 1–4 −1.3 %.
- coop-e2e BLOCKED = sandbox proxy only (CONNECT 403 to ctm-coop.victoria-tntt.workers.dev); the branch touches no co-op/sync file; new NPC record fields (v.cyHide, v.kidGuard, v.lxBeg, m.tw/lw/afw) ride in the host world, untested in a live 2-browser co-op run.

## FINAL OPEN ROWS (role-parity-open.json, for Foreman B's B3): count | family | side key
TOTAL 111
27 | lessons / kid teaching (art-tab + j53 kid card buttons not probed) | N-ONLY cx3:teachD, N-ONLY cx3:teachV, N-ONLY cx:study
25 | item-detail menu acts (itemAct not probed) | N-ONLY cx3:sell, N-ONLY cx3:test, P-ONLY cx3:use
16 | harm deeds (target/state per rank) | N-ONLY harm:accuse, N-ONLY harm:banphe, N-ONLY harm:expose, P-ONLY harm:gift, N-ONLY harm:tieuhuy, N-ONLY harm:trinhth, N-ONLY harm:uyhiep, P-ONLY harm:xinhh
16 | maid column (NPC maid state in s.st / master away) | P-ONLY harm:spyk, P-ONLY maid:accuse, N-ONLY maid:ask, N-ONLY maid:beside, P-ONLY maid:betray, N-ONLY maid:books, N-ONLY maid:empTea, P-ONLY maid:errand, N-ONLY maid:follow, P-ONLY maid:frame, P-ONLY maid:gift, P-ONLY maid:groom, P-ONLY maid:med, P-ONLY maid:rest, P-ONLY maid:tellMis, P-ONLY maid:tonic
9 | cx3:facDiv | P-ONLY cx3:facDiv
4 | defence orders (cx3:def_*) | P-ONLY cx3:def_canh, P-ONLY cx3:def_giuchung, P-ONLY cx3:def_theodoi, P-ONLY cx3:def_thudoc
3 | Empress acts needing evidence / over-rank items | P-ONLY hh:conf, P-ONLY hh:cutpay, P-ONLY hh:judge
2 | cx2:chest | N-ONLY cx2:chest
2 | cx3:talkGossip | P-ONLY cx3:talkGossip
2 | cx4:rougeSteal | N-ONLY cx4:rougeSteal
1 | cx2:maidTalk | P-ONLY cx2:maidTalk
1 | household staff acts (cx3:staff*) | P-ONLY cx3:staffHoi
1 | cx4:rougeBorrow | N-ONLY cx4:rougeBorrow
1 | cx:hhShield | P-ONLY cx:hhShield
1 | cx:maidR | P-ONLY cx:maidR
- (18/11 ~23:45Z) REVIEWER role-parity (opus): LAND READY 40d05b76473d085618947982464956277b7a15b7 (review/role-parity-r3 = LAND READY #2 1d29d229 + final-merge LIVE b60c1102 stage-rightcol r8; quickcheck PASS on this sha; sent to ROOT-59; replaces 1d29d229 / f2f5c069 / e12a91c). coop-e2e BLOCKED = sandbox proxy 403 only, no co-op/sync file touched.
