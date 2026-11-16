# PROGRESS review/servant-mline-r3 (reviewer of review/servant-mline-r2 @c3e1cacd, Foreman D)
START_CTX ~4 % of the window. Result: PASS (sha in dev/handover/reports/review-servant-mline-r3.md on the handover branch).
Built as: review/servant-mline-r2 c3e1cacd + merge origin/main 18fb8252 (conflicts only in generated files + assemble list: kept main's list incl. jpdlg.js, added jmline.js; site rebuilt).

## Reviewer fixes (same values)
1. ONE CORE: jmline mlFeud fight `roll(50)` -> BAL.mline.fightLose 50; caught poison deed weight `2` -> BAL.mline.poisonW 2. jmline.js now has no rule literal (only 0/1/100 clamps, /2 median).
2. Wording: "chứng cứ trên X +n" (new, used nowhere else) -> "chứng cứ về X +n", the form used by the rest of the game (4 places).
3. Tests: dev/test/mline-shots-r3.js (env FORCE = BAL.mline overrides, two forced months -> Sổ ghi shot); dev/test/coop-e2e.js env COOP_MLINE=1 (guest's own maids targeted on the guest, her proof survives merges, host proof untouched) and COOP_MLINE_ONLY=1 (stop after week 3).

## Runs (server on a free port, one test at a time, <=2 browsers)
- sim_maidline_r2.js 5 runs x 300 months, Tai mắt 3, 3 maids of hers: see report table. 0 errors.
- mline-guest.js 36 months: guest NPC merit/rise/refill/loyalty 0 (host 560/3/415/454). PASS.
- mline-oldsave.js (origin/main build save -> this build, 24 months): ok, 0 errors.
- coop-e2e.js (live Worker, Fold host + iPad guest): standard steps 60/60 ok; COOP_MLINE check 2 of 3 runs hit her maids (run 1: no ml counter at all on the guest, consistent with her not being a consort that life); proof 0->3 and 0->6 kept after merges; host proof 0->0.
- Shots (forced caught lines) 755x1000@2 and 1180x820@2: no overflow, 0 page errors, no %, "cung ta" on screen.
