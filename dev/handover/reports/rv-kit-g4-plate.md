# rv-kit-g4-plate — PASS

PRIORITY #1 CHECK: grepped OWNER_DECISIONS/CLAIMS/reports for dialog-fixed #54 (title plate on the event picture, owner marks #44 #47 #49 + 21/11 dialog frame), rv kit-dialog reports; kit part only (jdh.js 5 lines: ONE MutationObserver on #modal re-running the idempotent kitDhCap on the next frame), no custom chip.

Branch: review/kit-g4-plate-rv = keeper#2 03181881 + LIVE d2b97854 (index/sw rebuilt; LIVE has since moved to 0046a920 hao-huu — you self-merge), sha 42d5985e4f8b1b176ce9c419d5ad862f302dc6cd.

Reproduced and verified the fix:
- dialog-fixed.js «1180x820 (#54) the new-title plate sits ON the event picture»: idle machine → LIVE and branch both ok (3/3); UNDER CPU LOAD (8 busy loops on 4 cpus) LIVE FAILS 2 of 4 runs ({"ev":true,"kt3":[kszfig,kpsec],"kdh":1 …} = plate left as a band under the picture), branch 4 of 4 ok → the flaky G4 is real and fixed.
- No loop: #modal mutation records while a title dialog is open and idle = 99 per 3 s on LIVE and 96–102 per 3 s on the branch (ambient animation, same rate) — the observer re-runs kitDhCap once per change and does not feed itself.
- Looked at the Fold + iPad «Danh hiệu mới» dialog shots: the plate «Hiền tướng hậu cung» sits on the event picture at the bottom edge on both sizes.
- coop-e2e 94/94. QUICKCHECK PASS 281 s incl. core gate G4 80-dialog-fixed (render 281/291, tab 591/535, buổi 1592/1795, tasks>200ms 24/26, core gates PASS, old save ok). No stray images.
