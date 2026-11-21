# ui-leftover-fold (SONNET, SMALL) — branch review/ui-leftover-fold @ b98bb227c (merged origin/main 94cbe0cd6)
PRIORITY #1 CHECK ('mg-ui-rest|M17|Hoàng tự'): reused mg-ui-rest (kgReady, seal MƯU) and kit-opt-text (KP14, §13.13); nothing rebuilt. No new kit part.
START_CTX ~ low (fresh session). No rollover needed.

| Item | Before (Playwright, Fold 755x1000@2 + iPad 1180x820@2) | After |
|---|---|---|
| MG12 Điểm trang | toilOpen went straight to Hồi 1 (dress); no rules screen (`.kgr` absent) | first screen = kit kgReady (Luật chơi, demo, «Sẵn sàng»); khắc untouched until «Sẵn sàng», then Hồi 1. jtoil.js `toilRules()` |
| KP05 scheme games | seal MƯU OK (mg-ui-rest 39/39); rules screen has Sẵn sàng / Hướng dẫn / Giao cho người làm; HUD = kit chips | nothing to fix. Boards are plain kit canvas: ART REQUEST below |
| KP14 option grids Fold | scan (70 turns of event modals + 13 panel tabs, cut text / tile<150 / text col<150): 0 bad; kit-opt-text 5/5 PASS | nothing to fix |
| M17 Hoàng tự card | Fold: mother block LEFT of facts (`.pcb` 2-col grid); iPad: ABOVE | jk4.js (KIT §6.3e rule, CSS in `kit-pc-fill`): `.pc>.pcr .pcb>.kpl,.kpkb{grid-column:1/-1}` → mother ABOVE facts on both devices |

Fixed tests that open Điểm trang (now click `#toilrdy` first): hoa-dien, item-info, kit-dress-picker, mg-signs-preplay, monthly-ration.

OPEN / FLAGS
- **Điểm trang has no «Hướng dẫn» guided round**: kgReady only shows it when the game has a tutor engine; makeup (brow/blush/lip canvas) has none. Not a kit part — needs an engine tutor mode (KG82.peek hints from TOIL.geo). Not done (SMALL tier). MAIN decide.
- **ART REQUEST for Foreman C**: scheme (mưu) boards have no painted board (`img/kit/mg-<kind>-bg.webp` missing): `mg-nghe-bg` (Nghe ngóng), `mg-truyen-bg` (Truyền lời), `mg-mac-bg` (Mặc cả), `mg-thoico-bg` (Thời cơ). I drew nothing.
- «Để trời định» is not on the new Điểm trang rules screen (the quick roll still sits on the later dress-result / colour screens, unchanged).

GATES: quickcheck 622a09ae CORE GATES PASS + TIME-SPILL PASS + old save OK (0 errors); coop-e2e 94/94; mg-ui-rest 39/39 (also after merge); Fold + iPad shots LOOKED (rules screens, Hoàng tự kin, scheme rumor).
Shots are local only (not committed, not on CDN).

## REVIEW r1 (sonnet small reviewer, 21/11)
Verdict: PASS ui-leftover-fold a6b5fd3c (= worker b98bb227 + merge of newest origin/main 31fcfe30; branch review/ui-leftover-fold-rv).
- SMALL confirmed: diff = jk4.js (3 CSS lines), jtoil.js, 5 tests, built index.html/sw.js. No BAL / save / co-op / time / progression.
- M17 (KIT FIRST): rule already in KIT.md §6.3e ("mother block ABOVE facts, Fold and iPad"); the fix is the shared CSS in jk4 kit-pc-fill, no per-screen variant. Scan of every person tab (kid/kvo/kin/hon/qt/staff/court/rv…, 4 faces each) at Fold 755x1000@2 + iPad 1180x820@2: the only card kind with `.kpl` directly in `.pcb` is Hoàng tự kin; 8/8 cards mother above facts, same column (mom x = facts x). No other card changed. Shots LOOKED 3× (Fold, iPad 1180, 1366 shots).
- MG12: Fold + iPad: toilOpen → kit rules screen (Luật chơi + demo + «Sẵn sàng»), used=0 before «Sẵn sàng», then Hồi 1 dress. No overflow, 0 page errors. Shots LOOKED 3×.
- KP05: mg-ui-rest 39/39 on merged build. KP14: kit-opt-text 5/5; own scan 791 option tiles (event modals over 14 turns + 6 panel tabs) at Fold 755x1000: 0 tile <150 px, 0 clipped.
- Tests: hoa-dien, item-info, kit-dress-picker (19), mg-signs-preplay (6), monthly-ration OK. quickcheck a6b5fd3c PASS (core gates, time-spill, old save, perf), coop-e2e 94/94.
FLAGS (not blockers for SMALL, for MAIN): (1) Điểm trang rules screen has no «Hướng dẫn» and no «Để trời định» (brief asked for the pet/plant parity); (2) its demo picture is the generic 3-dot hand (pic:""), no makeup picture; a tutor engine exists for kind «chai» (j-kg92Groom) and could be reused. (3) ART REQUEST for Foreman C (mg-nghe/truyen/mac/thoico-bg) stands from the worker report.
