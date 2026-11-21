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
