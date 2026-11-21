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

## RELAND r2 (opus reviewer-lander, Foreman B ROOT-7; ORDER MAIN 97 21/11 17:01Z)
PRIORITY #1 CHECK ('ui-leftover-fold'): OD 18 | ledger 2 | claims 8 | main 15 | review/* review/ui-leftover-fold + -rv a6b5fd3c | archive 17 — reused that branch, nothing rebuilt.
START_CTX ~8 %; no rollover needed.
Branch review/ui-leftover-fold-r2 @ da27c7e24 = a6b5fd3c + merge origin/main 6d31d6d2 + item-info test fix + merge origin/main 0faf7a05 (FF of 0faf7a05). LIVE moved on to 70375dbf (kit-ef-unit, kit-win-pay) during the last gates: the lander's usual SELF-MERGE of LIVE is needed (index.html/sw.js only conflict, rebuild).

ROOT CAUSE of the land FAIL (buổi 2984 vs LIVE 1426): NOISE in the perf probe, not the branch.
- The branch diff touches no buổi path: jtoil.js runs only inside toilOpen() (the player opens Điểm trang; the quickcheck BUOI probe only presses «Sang buổi» and dismisses Q modals, it never opens the mirror); jk4 adds 2 static CSS rules (`.pc>.pcr .pcb>.kpl/.kpkb`, no :has, no JS, no per-buổi work).
- The BUOI probe plays a NEW RANDOM life each run and its time is mostly the probe's own sleeps (40 ms per modal, 200–300 ms waits): single runs swing 1.0–4.5 s on BOTH builds (LIVE runs this session: 4284, 2600, 4467 ms; new: 3429, 3047 ms). One slow run of 3 lifts the median over the +1500 ms gate.
- Machine was idle (load < 1, 4 cores, quickcheck alone).

Before/after perf (median of 3, new/live, ms; gate buổi = live + max(1500, 50 %)):
| run | sha | render | tab | buổi | tasks>200 | verdict |
|---|---|---|---|---|---|---|
| land FAIL (MAIN 97) | a6b5fd3c | – | – | 2984 / 1426 | – | FAIL (noise) |
| r2 #1 | 7b402b3d | 260 / 312 | 480 / 660 | 1194 / 1786 | 20 / 23 | PASS |
| r2 #2 | 7b402b3d | 230 / 231 | 497 / 459 | 1291 / 1398 | 20 / 19 | PASS |
| r2 #3 | da27c7e2 | 252 / 239 | 549 / 506 | 1456 / 1120 | 20 / 21 | PASS |
| r2 #4 | da27c7e2 | 226 / 241 | 491 / 512 | 1279 / 1327 | 22 / 22 | PASS |
No code fix needed; PASS content kept unchanged (MG12, KP05, KP14, M17).
Note for MAIN (not done, gate file = MAIN's): the buổi gate is flaky by design (random life); a fixed seed or median of 5 for buoiMs would stop false FAILs.

GATES on da27c7e2: quickcheck ×2 PASS (core gates, time-spill, old save ok, perf); coop-e2e 124/124; mg-ui-rest 39/39; kit-opt-text 5/5; kit-dress-picker 19, mg-signs-preplay 6, hoa-dien ALL OK (on 7b402b3d).
- Test fix: item-info.js step 1 opened Điểm trang and waited for the dress without pressing the new «Sẵn sàng» (the worker fixed only step 3) → now clicks #toilrdy too. After it, item-info stops at the same later point as on LIVE (TypeError reading textContent) = PRE-EXISTING on LIVE, not this branch. monthly-ration times out identically on LIVE 6d31d6d2 = PRE-EXISTING. Both flagged for MAIN, not fixed here (out of scope).
- Shots Fold 755x1000@2 + iPad 1180x820@2, LOOKED 3×: Hoàng tự trong cung card — mother block ABOVE the facts on both (mom x = facts x: Fold 273/273, iPad 828/828), no h-overflow; Điểm trang opens on the kit rules screen («Sẵn sàng», used=0), no overflow, 0 page errors. Shots local only.
CO-OP GATE: coop-e2e 124/124 PASS; both-seat n/a (UI only).
LAWS touched: 9/10 KIT FIRST (kit CSS in jk4 kit-pc-fill only, KIT §6.3e, §13.7) OK; 11 whole group (scan by r1) OK; 12 two devices OK; 7 wording unchanged.

## RELAND r3 (opus reviewer-lander; ORDER MAIN 100 20:01Z via Foreman B ROOT-7)
LAND CHAIN 3 FAIL on da27c7e2 = real conflict dev/build/jk4.js vs LIVE (kit-mark-fix r6 9d6005b8/1013d49b).
Branch review/ui-leftover-fold-r3 @ bca0052c3 = da27c7e2 + merge LIVE d0f75fa4.
Conflict resolution (LAW 14 one rule, LAW 9 kit first): LIVE kit-mark-fix already holds the SAME M17 fix as a general kit rule (mark 17: `.pc>.pcr>.pcb>:not(button.ka){grid-column:1/-1}` → every .pcb child spans the row, mother ALWAYS above the facts) plus mark 38 (thin scrollbar + kpmore «more below» fade). Kept LIVE's block whole; dropped the branch's narrower duplicate M17 rule (2 selectors + margin), so jk4 = LIVE. Branch diff vs LIVE is now jtoil.js (MG12 rules screen) + 6 tests only.
Shots Fold 755x1000@2 + iPad 1180x820@2 looked 3×: Hoàng tự / Công chúa card mother block ABOVE facts on both (mom x = facts x: Fold 273/273, iPad 828/828; gap 8 px), iPad shows the LIVE kpmore fade at the card bottom, no h-overflow; Điểm trang opens on the kit rules screen («Sẵn sàng», used=0), 0 page errors.
GATES on bca0052c: quickcheck ×2 PASS (buổi new/live 1137/1349, 1303/1166 ms; render 281/263, 269/245; tab 450/461, 421/470; core gates PASS; old save ok); mg-ui-rest 39/39; kit-opt-text 5/5; coop-e2e 124/124.
CO-OP GATE: coop-e2e PASS + both-seat n/a (UI only).
LIVE moved to e804edfc (home-chapters) after the gates: git merge-tree = only index.html/sw.js conflict (build files), no source conflict → usual SELF-MERGE + rebuild at land.
