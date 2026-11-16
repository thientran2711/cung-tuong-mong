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
