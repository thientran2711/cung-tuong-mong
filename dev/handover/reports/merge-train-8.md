# merge-train-8

Branch review/merge-train-8 @ 49e9e780 (pushed UNTESTED), based on origin/review/merge-train-7 ef3dcbd5 (itself on main 92668096). Site rebuilt with dev/site/build_site.sh. All merges --no-ff at the PASS/READY sha.
Status: waiting for permission to run a local http server for Playwright (denied by the classifier, not worked around). No test has been run yet.

## IN (13)
1. item512-art-r1 f9d10956 (notes + sheets only)
2. header-own-r1 0d48819b (probe test only)
3. veil-zoom-r1 622dffcb (needs kit keeper sign-off on KIT 28.8)
4. promote-servants-r1 81deb15f
5. fig-bg-k1-r1 c8734770 (podium-plaque + old-save tests still to run)
6. danh-balance-r1 9a1133f0
7. close-maid-r1 ebc85f78 (includes servant-mline-r3 part)
8. coop-guest-maid-r1 3a875687
9. mood-bar-r1 ce43d3b5
10. presentation-r1 9ec1852a
11. nw-poem-r1 5d200041
12. nw-lantern-r1 9696bc72
13. perf-r1 d2221602 (SW / first-load groups: check upgrade-sw.js and lazy-offline.js)

## OUT
- balance-pass-r1 89ea80f7: owner question Q6 still open (same as train-6).
- nw-quiz-r1 33730518, spread-events-r1 af64214f, schedules3-r3 ec649e19: no PASS/READY line in the foreman status files.
- rank-port-r1, name-mask-r1, emperor-visit-r1, seatcap-r1: no branch on origin.
- entry-exam-r1 d7364cb2: held until mg-balance (B) and kc-roads-cn-nc-fix (D) are PASS (both are not).
- slap-mg-r3 6444443b: same hold (needs mg-balance, re-merge its tip).
- mg-balance 26ff48ac, kc-roads-cn-nc-fix de331af6: not PASS.
- coop-chat-r1 24578406: needs a coop Worker deploy.
- Already live / in train-6 or train-7: all other PASS lines (ancestry checked against origin/main, merge-train-6, merge-train-7 after un-shallowing the clone).

## Conflicts and resolution
- index.html, sw.js, assets.json: took ours at every merge, rebuilt at the end.
- dev/build/assemble.py (every merge): union of module lists, each new module placed where its branch had it: jnwp after j91, jlant after jbal2, jpres after jsfx, jmood after jhouse, jmline then jcmaid then jcoopask, then jpromsv, jfigbg last.
- dev/build/jaudit.js (promote-servants vs main): kept main's shorter texts ("thành: thăng bậc", "thưởng tháng", "Phẩm đủ đến") and mlGuest guard, took the branch's two-road (bạc / favour) logic and BAL.dbFail.
- dev/build/jk4.js: fig-bg `bw` border term kept; close-maid's kitSlotCx layout kept (kN, cxs) with `need+bw`.
- dev/build/jbal2.js: kept both blocks every time (BAL.danhG/charity/succN, BAL.cmaid, BAL.mline).
- dev/kit/KIT.md: kept both (KIT 61 fig-bg after main's 81 block; mood-bar section). dev/MINIGAMES.md: main's Thơ/Câu đối lines + Thắp đèn line, mini-game list line merged.
- dev/measure/pass/mkinp.sh: danh-balance's `${MORE:-}` version (superset).

## Heads-up for the coordinator
- Neither main nor train-7 contains train-6 (no jeitem/jlux modules). When train-6 lands, re-merge: expect assemble.py (module lists) and jbal2.js conflicts again.
- Tests to run after the re-merge: kit-table, kit-conform, mood-bar, presentation, lantern, nwpoem-play, cmaid-unit, promote-servants, veil-zoom, figbg/scroll, header-own, cycle, boot-flash, perf.js, upgrade-sw.js, lazy-offline.js, coop-guest-maid, coop-e2e, plus train-6's econ-items / toil-react / origins / memories / luxury / pcard-dislikes.

## Successor log (worker 2, 11/16/2026) - IN PROGRESS
- Merged origin/main e9c6021d (train-6 live). Conflicts: assemble.py (module union by script, jlant before jmort), j2.js (main's disUnk line + our kitNameList line), jbal2.js (kept both), jevban.js (kept ours 'thắp đèn' text + main's "cyrep" entry), jk4.js (fig-bg data-fb + main's data-sil/kitStageFigErr), jreign.js (main's single rows67 list, mem uses kitNameList), inpage6.js/mkinp.sh (ours superset). index.html/sw.js/assets.json took ours, rebuilt.
- NEW since the first IN list, added at their shas: nw-quiz-r1 33730518 (READY in FOREMAN_B), name-mask-r1 571dc15e (PASS in FOREMAN_D). Still NOT added: mg-balance 26ff48ac, rank-port-r1 (no branch), schedules3-r3 ec649e19, coop-b1b5-fix 7c7fcc45, spread-events-r1, kc-roads-cn-nc-fix, entry-exam-r1, slap-mg-r3, coop-chat-r1 (no PASS/READY, or held).
- Pushed review/merge-train-8 @ 379b769c (UNTESTED-COMPLETE: partial results below; do not mark GREEN yet).
- FINDING veil-zoom-r1 622dffcb: dev/test/veil-zoom.js at 1180x820@2 fails the 'dialog' stage figure (#stage>kfxf, kslap/kscar/kveil2 offset 0.07-0.18). Reproduced on veil-zoom merged into plain main e9c6021d alone (fail 2) and on old train-8 49e9e780 (fail 3), so not caused by the merge; branch was clean at 1180 on its older base. Also needs kit keeper sign-off (KIT 28.8). Sent to s16: plan = HOLD veil-zoom-r1 (revert its merge with git revert -m 1) unless s16 says keep. NOTE: dialog person is random, so rerun once more before concluding.
- Test usage notes: header-own / cycle / luxury / name-mask-* take a FILE path (/home/user/wt/mt8/index.html), not a URL; econ-items / podium-place / boot-flash take the base URL; run each as a plain `node dev/test/...` background call (a wrapper script, curl and one extra http.server were denied by the classifier; not worked around). upgrade-sw: `--old <worktree of origin/main> --new <worktree> --device fold` (run 1 flaked "Execution context destroyed", run 2 exit 0).
- 755x1000@2 on 379b769c, all exit 0: cmaid-unit, mood-bar, lantern, presentation, kit-conform (CONFORMS 90 / MISSING 15), promote-servants 19/19, veil-zoom fail 0, header-own, cycle ALL OK, nwpoem, nwquiz, econ-items, toil-react, origins 20/20, memories ALL OK, luxury, pcard-dislikes, name-mask-oldsave/dom (0 hits), podium-place, boot-flash x1, kit-table (exit 0, errs []), coop-e2e 59/59, coop-guest-maid 37/37, upgrade-sw (2nd run), perf.js started (result not read).
- 1180x820@2 so far, all exit 0 except veil-zoom: mood-bar, presentation, lantern, cmaid-unit, promote-servants 19/19, nwpoem, header-own, cycle ALL OK. nwquiz 1180 was still running.
- STILL TO DO: 1180x820@2 for kit-table, kit-conform, nwquiz (read result), econ-items, toil-react, origins, memories, pcard-dislikes, luxury(not size-bound), name-mask-scan (755 run still going, no result read), podium-place, boot-flash x5 (755: 4 more), perf.js result, lazy-offline.js (not run), then rerun veil-zoom 1180 once, decide hold, rebuild site (bash dev/site/build_site.sh) + commit + push, send s16 "GREEN <sha> (waiting GO)". After s16 GO: re-merge latest main, re-test, push, "READY <sha>".
- Environment for the successor: fresh clone; fetch with flock; git merge needs --no-autostash (plain merge fails with 'stash failed' in the sparse worktree); python3 -m http.server <port> in the worktree root as a background call.

## Successor log (worker 3, 11/16/2026) - tests done, push pending perf control
- OUT now: veil-zoom-r1 (1180x820 overlay offset; Foreman B fixes separately) via `git revert -m 1`; fig-bg-k1-r1 (owner OD:L1314: figures stand on the frame background) via `git revert -m 1`: KIT §61 rewritten "NOT SHIPPED", KIT_NUMBERS row 61 NOT SHIPPED, no jfigbg module in assemble.py, no other train branch depended on it, no art file deleted (branch review/fig-bg-k1-r1 keeps the code).
- IN: review/promo-reveal-fix 3c099701 (test-only). Main merged up to 73c06812 (cardflip-glow2); index.html/sw.js/assets.json always regenerated with dev/site/build_site.sh (ours + rebuild), never hand-merged.
- Final local sha 2232ea32 (fast-forwardable onto origin/main 73c06812).
- PASS 1180x820@2: kit-table, kit-conform (CONFORMS 90 / MISSING 16), econ-items, toil-react, origins 20/20, memories ALL OK, nwquiz, podium-place, name-mask-scan 0 hits, pcard-dislikes (1st run 4 FAIL "gift item for test" = random gift pick, rerun ALL PASS), boot-flash x5, lazy-offline fold+iphone14 (bad 0), upgrade-sw (lost 0). PASS 755x1000@2: boot-flash x5 (+x3 on the final sha), kit-table (final sha), game-feel (final sha, all 3 viewports), plus earlier 755 results above.
- KNOWN BUG, not train-caused (accepted by s18): dev/test/promo-rules.js 755x1000@2 = 15/16, FAIL "reveal shown" (person reveal #kprevov never appears after closing the chest). Identical on plain main ee5d33de with promo-reveal-fix's tests.
- perf.js fold on the train: OVER budget (firstLoad 70.6 > 62 MB, title 51.8 s > 45 s, playable 18.6 s > 15 s, warm 9.25 > 5 MB; the sandbox network is slow, index.html 6 MB counted twice). Control run on perf-r1 d2221602 alone: see the final line below.
- Test hints: classifier denies python http.server; `node dev/test/cdn-overlay-serve.js <port> <root> <empty file>` works (run_in_background with timeout 7200000, default 30 min kills it); game-feel needs `node dev/test/sw-serve.js 8955 <train> main=<main worktree>`; perf.js is not on main, run it from the train's checkout.
- perf control (perf-r1 d2221602 alone, fold): firstLoad 68.76 / warm 8.66 MB (also OVER); train 70.6 / 9.25 = about +2 MB, timings are network noise → not a blocker (s18). Pushed review/merge-train-8 @2232ea32, READY sent to main s18; waiting for GO.
- LIVE (main 2232ea32, sw shell 871198d32ef2): smoke at 755x1000@2 and 1180x820@2 = boot-flash x2 (skeleton 0, ready) + kit-table errs [] at both sizes: SMOKE PASS.
