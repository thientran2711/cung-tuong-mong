PRIORITY #1 CHECK: OD 20/11 ~06:55Z (Chải chuốt no green zone) | main j92.js kg92Groom env.zw | review/mg-env 4f3b78f | claims mg-env
# REVIEW mg-env — PASS 6c45e65b257fc23abf28ee15ad3c2929d7183180 (review/mg-env-rv)
Merged newest origin/main 70bea3d3 into 4f3b78f (only index.html/sw.js conflicted; rebuilt by build_site.sh). FF-check OK (origin/main is ancestor).
- ONE CORE: default width = wdGroomW(live S or {}) -> WD.groom* (j92 BAL-style table), no typed number. OK.
- Whole group: re-scanned grep env.* over dev/build/j*.js: lv/end/hud/kind passed by kg82Play; zw fixed; v (jsgame) safe via sgThr default; tut optional; jlooks B.env.* is a different object. Honest.
- dev/test/mg-env.js: on origin/main build FAIL (469 NaN, zone 0px x3) -> on merged build ALL OK (Fold + iPad).
- LOOKED shots Fold 755x1000 + iPad 1180x820, Thử tay Chải chuốt AND real round (wdGroomUI -> Bắt đầu): green «Đúng phẩm» zone visible in all 4.
- mg-ready-guide PASS 9/9; ag-mgcal ALL OK; quickcheck PASS (171 s, core gates, old save ok).
- Observation (not this branch, pre-existing, for main): on Fold the round-portrait collapses to a small round avatar that overlaps the «Cài trâm» label in Thử tay and the how-text in the real round. Suggest a separate layout fix.
- Shots session-local (not in git/CDN).
