# Review — cnv-cnv_ban-cautious-5 (cautious planner)
Run rerun-cnv-cnv_ban · harness 93812531 (fold, real taps, 0 JS clicks) · born cnv, road cnv_ban · seed 3797927877.
Summary: Tiết Lạc Yên, 6 years, rank 0 (Phế phi · lãnh cung at 24), ending «Hồng nhan bạc mệnh» (forced death by the new Thái hậu, no exit pick), 850 buổi, 5607 taps, ~13 h wall clock across 2 h job restarts. VALID real death.
Caveat: scores come from harness logs, trace and shots I opened after play. I did not watch live.

## Scores
- a. First 15 minutes: n/a from logs (a one-line harness start); not scored.
- b. Gameplay loop & pacing: 4/10. 850 buổi for 6 years, with long stretches of «Sang buổi» and notice dialogs. 16 no-clock loops on «Trường Môn viện» (150 taps, no clock step) show the loop stalls.
- c. Buttons & UI: 2/10. 17 dead «Lui»/«Xem …» buttons: «Tin báo» ×4, «Tâm trạng …» ×2, «Danh hiệu», «Tin chờ người sai đi», 9 pet buttons covered. 10 stuck events; the unstick ladder was needed every time.
- d. Story & drama: 5/10. The Hoàng thượng-dies → Thái hậu → white silk chain is dramatic. The end card prints «(khả năng: rất thấp)», an odds word in story text.
- e. Characters & interactions: 5/10. Rivals act on their own (Đáp ứng Khương Bích Lạc smashes porcelain, Bích Lạc Bạc −12), but 127 gossip lines in one «Tin báo» drown it.
- f. Choices & fairness: 3/10. As a cautious bot in cold palace all taps were "Sang buổi"; I saw no equal-value choice that mattered.
- g. Rewards, feedback & emotion: 4/10. Losses show numbers; wins are rare at rank 0; death comes without a visible warning chain I could follow.
- h. Mini-games: n/a (none played by the bot).
- i. Visuals & sound: 6/10. Night courtyard art is good; the notice picture panel is blurred; no sound heard (headless).
- j. Co-op: n/a.

## Top 3 loved
1. Night courtyard scene art (loop-16.png).
2. Rival gossip that names real people and their moves (Khương Bích Lạc / Sử Tịch Nhan).
3. The grim end card for a fallen concubine.

## Top 3 hated
1. «Tin báo» stacking (up to 6 copies) and one 127-line dialog; ✕ looks dead.
2. «Nhờ thái giám tìm thú nuôi»: buttons under a cover.
3. «Lui» does nothing on «Tâm trạng …», «Danh hiệu», «Tin chờ người sai đi».
Would I play another life? Not until the dialog queue is fixed.

## Bugs (fast lane sent to D)
1. «Tin báo» queue stacks 2–6 copies; ✕ pops one at a time; 15-min stuck ×8, 150-tap no-clock loops ×3. Shots stuck-1.png, loop-16.png.
2. JS `f.rk.split is not a function` ×2 (step 3651).
3. Dead «Lui» ×8 across 5 dialogs (noeffect-*.png).
4. Pet-cover dead buttons ×9 (dead-fold-*.png).
5. No-clock loop family: «Cầm», «Kỳ», «Vũ», .mapsc, .kshdc, «Trường Môn viện» (loop-4/5/10/22/24.png).
6. #kmrew 15-min stuck (stuck-2.png). Screen unidentified.
7. Wording: end card prints «(khả năng: rất thấp)» (VANPHONG odds ladder only).

## Suggestions (recorded for MAIN → PARKING_LOT)
- Cap or merge notice lists (e.g. "127 tin" → grouped by person).
- Let «Sang buổi» skip consecutive empty «Tin báo» screens.
