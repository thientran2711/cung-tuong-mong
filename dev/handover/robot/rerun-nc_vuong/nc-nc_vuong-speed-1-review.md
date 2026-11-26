# Player review — nc-nc_vuong-speed-1
Persona: bold, seed 2920246405; road nc_vuong (origin nc, fold 755x1000, real taps). Harness: a4m bac25389 (F10 watchdog; kc2End rule not applied, exitPick None so no impact). No bot exit (exitPick None).
Ending: Hồng nhan bạc mệnh — Năm 14, Hoàng thượng niên hiệu Chính Đức băng hà, thọ 34 tuổi. Tân Thái hậu Khổng Ngưng Sương xét lại chuyện cũ (khả năng: rất thấp), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế (age 33), buổi 2020.
Scores (1–10) are friction scores from automated observation only (no human feel): flow 7 · button clarity 6 · dialogs closable 5 · crashes 9.
Dead buttons 4, stuck 0, bug entries 4. Bug families:
- [freeze] ×1 page froze: no harness step for 10 min (page.evaluate hung) at buổi 66
- [dead] ×1 close button has no effect: .dlg «Nhờ thái giám tìm thú nuôi» «Lui»
- [stuck] ×2 no-clock loop: 150 taps without a clock step on page «Trường Môn viện · Gió lùa qua song cửa mục. Ở đây »
- [game] ×1 softlock: «Sang ngày mới» tapped but the buổi does not turn with no dialog on screen (dialog queue Q=1: Tâm bệnh · nhẹ)
Top hated: pet-finder dialog «Nhờ thái giám tìm thú nuôi» buttons covered / «Lui» no effect (queue not deduped). Top loved: reaches a real ending with no exit pick.
Suggestions: dedupe person/pet-dialog queue; close all copies on ✕; fix covered «Xem …» buttons (see bugs/BUGS.md).
