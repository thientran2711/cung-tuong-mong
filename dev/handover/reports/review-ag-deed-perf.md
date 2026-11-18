# REVIEW ag-deed-perf (opus reviewer, child of C-AG #14 → now C-AG #15 session_01Rc5AsKLUrafEXHt5QpbRC2), 18/11 ~20:30Z
PRIORITY #1 CHECK: OD L1637 (ag2-perf) | main 13bb8c88 has no ag-deed-perf | review/ag-deed-perf 9e0e1928 (AG-DEED-PERF #2) reused, merged | reports/ag2-perf.md § AG-DEED-PERF + #2 read | claims: AG-DEED-PERF #2 row. START_CTX ~4 %.

## VERDICT: PASS fa411d6f (review/ag-deed-perf-r6; FF over live main 93660286; was c67d248d over 13bb8c88) — coop-e2e BLOCKED in env (accepted by MAIN ROOT-54 for this perf-only branch)

Head c67d248d = 9e0e1928 + merge of live 13bb8c88 (shop-panel r3). Only index.html / sw.js conflicted → rebuilt with dev/site/build_site.sh; the CDN host IS reachable in this reviewer container, so the build is the normal full build (assets.json unchanged, sw.js precache list from the live CDN index).

## Diff vs live 13bb8c88 (code)
| file | change | behaviour / BAL / player-visible |
|---|---|---|
| dev/build/jagday.js | agTell takes the news line as a thunk; built once (memo) only when a servant actually tells; both callers in agRdTick pass `()=>\`…\``. agPlaceTxt already has try/catch → no error-path change | none (same string, same RNG) |
| dev/build/jplst.js | renderStage wrapper: inside a sim step (window.__rdefer>0) lay2 (layout reads + entry/name placement) goes through jlag2 renderAfter("plst-lay") = next frame, coalesced, flushed by any render(); else at once as before | none in S; positions set ≤1 frame later inside a sim step only |
| dev/test/ag2perf-diff.js, ag2perf-prof.js | K= khắc steps; profiler | tools only |
| index.html, sw.js | rebuild | – |
Note: the brief summary also names "agOptsG in agHeard, agWatch/agLand" — those are NOT in the code; the worker report says they were left out because they draw Math.random (not outcome-identical). Code = L1 + L2 only.

## Gates (all run by me on c67d248d vs live 13bb8c88)
| gate | result |
|---|---|
| FF over newest live main | YES (13bb8c88 ancestor of c67d248d; re-checked before push) |
| seeded ag2perf-diff K=3, seeds 1/2/3 × 160 (same script for both builds) | **0 / 0 / 0**, final state same, RNG draws 56153/60237/55021 both, deeds 491/543/448 both |
| 4x per-khắc timing, ag2perf-probe 40 buổi × 3 khắc, 9 rounds alternating live/head, one run at a time | khắc mean 4.71 → **3.96 (−16 %)**, khắc median 2.37 → **2.21 (−7 %)**, buổi mean 167.1 → 164.8 (−1 %), buổi median 84.8 → 79.9 (−6 %); 0 page errors, 40/40 buổi every run. Target ≤ +10 %: MET |
| quickcheck --cpu 4 --runs 3 | **PASS** · open 1690 ms · old save ok · core gates PASS (one-core-guard · rules-one-source · **G3 kit-conform** · hooks 5 = 40-odds-cap, 50-coop-one-world, 60-mk-layer-scan, **70-manifest-guard (G4)**, anchor-table) · time-spill guard PASS · not-built check PASS |
| quickcheck perf smoke | run 1 buổi 2353/1198 (one unseeded buổi per run); re-run --runs 5: render 221/252, tab 404/415, **buổi 1116/1378**, tasks>200 15/18 → noise, both builds show a ~3.4 s outlier |
| one-core-guard (law 4) | PASS; the diff adds no number, reads no BAL key, computes nothing of its own |
| coop-one-world | PASS (quickcheck hook 50) |
| ag suites 12 | 12/12 PASS: betray 20, carry 9, know 25, later 9, paywin 9, sell 19, soft 20, taimat 25, taimat2 16, truth 11, walk 10, ag-all 21. ag-all had 1 red (perf p95 10.6 > 8 ms) in the 2-parallel batch; alone 3×: head 6.3 / 6.4 / 7.8 ms PASS, live 7.0 / 7.6 / 6.6 ms → load flake, not this branch |
| coop-e2e | **BLOCKED**: needs the live co-op Worker ctm-coop.victoria-tntt.workers.dev, refused by this container's egress proxy (CONNECT 403). Needs an environment whose network allows that host. Accepted for this branch by MAIN ROOT-54 |

## 18 laws touched
Law 4 (one core): PASS (no number added). Laws 7/9–12 (wording/kit/UI): no player-visible text or UI part changed. Law 6: outcome-identical proof above (same deeds).

## Note for the lander
fullbody-frame-s5 af700c81 (LAND READY from 94d11623) may land first; if main moves, re-merge (only index.html / sw.js expected) and re-run the seeded diff (run BOTH builds with the branch's dev/test/ag2perf-diff.js — main's copy ignores K=).
Scratch (container only): /home/user/wt/rvout (diff json, bench logs, suite logs).

## Re-merge 18/11 ~20:50Z (C-AG #15 order: live moved to 93660286 kit-subtabs-overflow, CSS-only)
fa411d6f = c67d248d + merge 93660286; index.html / sw.js conflicted only → rebuilt (commit message says "only sw.js": index.html also, both rebuilt). Code diff vs live unchanged (jagday L2 + jplst L1 + 2 test tools).
| gate | result |
|---|---|
| seeded diff K=3 seeds 1/2/3 × 160 vs 93660286 (branch script, both builds) | 0 / 0 / 0, RNG 56153/60237/55021 both, deeds 491/543/448 |
| quickcheck --cpu 4 --runs 3 | PASS · core gates PASS (one-core, rules-one-source, G3 kit-conform, hooks 5 incl. G4 manifest-guard + coop-one-world) · time-spill PASS · old save ok · render 235/254 · tab 396/418 · buổi 1253/1300 |
Timing + 12 ag suites not re-run (CSS-only main change does not touch the sim path).
