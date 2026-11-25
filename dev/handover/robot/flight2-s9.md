# flight2-s9 (real-tap harness 594fa1ee, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick |
|---|---|---|---|---|---|---|---|---|
| flight2-s9 | Xuất gia — Xuất gia làm ni cô | 23 | 707 | 2144 | 3 | 5 | 29 | — |

## Dead buttons

- .kmov «?» covered by zero size · dead-fold-1795600857804.png
- .dlg «Tâm trạng · Ta» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795602645426.png
- .kmov «?» covered by zero size · dead-fold-1795610310528.png

## Bugs

- [stuck] ×1 no progress 15 min on .dlg «Kính sự phòng báo tin»
- [dead] ×1 close button has no effect: .dlg «Tâm trạng · Ta» «Lui»
- [stuck] ×2 no-clock loop: 150 taps without a clock step on page «Chung Tú cung · Minh Hòa hiên · Ở đây còn 2 người.»
- [stuck] ×1 no-clock loop: 150 taps without a clock step on .dlg «Danh hiệu»
- [stuck] ×7 no-clock loop: 150 taps without a clock step on page «Chung Tú cung · Minh Hòa hiên · Ở đây còn 1 người.»
- [game] ×1 dialog queue holds 7 copies of «Tin báo» (each close pops one; looks like a dead ✕)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on .dlg «Tin chờ người sai đi»
- [stuck] ×4 no progress 15 min on .dlg «Tin báo»
- [stuck] ×6 no-clock loop: 150 taps without a clock step on .mapsc «»
- [stuck] ×1 no-clock loop: 150 taps without a clock step on .dlg «Tin báo»
- [js] ×1 page error: Cannot read properties of undefined (reading 'off')
- [stuck] ×2 no-clock loop: 150 taps without a clock step on page «Chung Tú cung · Minh Hòa hiên · Ở đây còn 3 người.»
- [game] ×1 dialog scrolled to the end has no close / next button: #kmrew «»
- [game] ×1 dialog scrolled to the end has no close / next button: .mapsc «»
- [game] ×1 softlock: «Sang ngày mới» disabled with no dialog on screen (dialog queue Q=7: Tin chờ người sai đi / Tin chờ người sai đi / Chương 3 · Học quy củ trong cung / Tin báo / Tin chờ người sai đi / Tin báo)
- [game] ×1 dialog scrolled to the end has no close / next button: .kmov «»
- [game] ×1 dialog scrolled to the end has no close / next button: .kfoc «»
- [game] ×2 softlock: «Sang ngày mới» disabled with no dialog on screen (dialog queue Q=1: Tin trong cung buổi này)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on page «Ngọc Thanh các · Ở đây còn 3 người.»
- [game] ×2 softlock: «Sang buổi» tapped but the buổi does not turn with no dialog on screen (dialog queue Q=1: Có người đến)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on page «Thái y viện · Ở đây còn 1 người.»
- [stuck] ×2 no-clock loop: 150 taps without a clock step on page «Ngọc Thanh các · Ở đây còn 1 người.»
- [game] ×7 softlock: «Sang ngày mới» tapped but the buổi does not turn with no dialog on screen (dialog queue Q=1: Tin trong cung buổi này)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on page «Ngọc Thanh các · Ở đây còn 2 người.»
- [stuck] ×6 no-clock loop: 150 taps without a clock step on page «Thừa Minh cung · Duyệt Xuân hiên · Ở đây còn 1 ngư»
- [game] ×1 softlock: «Sang ngày mới» disabled with no dialog on screen (dialog queue Q=7: Tin báo / Tin báo / Đã biết về Hoàng hậu Cố Yên Nhiên / Tin báo / Tin báo / Tin báo)
- [stuck] ×1 no-clock loop: 150 taps without a clock step on page «Thừa Minh cung · Duyệt Xuân hiên · Ở đây còn 3 ngư»
- [game] ×12 softlock: «Sang ngày mới» tapped 3× in one buổi but the buổi does not turn (dialog queue Q=1: Tin trong cung buổi này)
- [game] ×1 softlock: «Sang ngày mới» disabled with no dialog on screen (dialog queue Q=6: Tin báo / Tin báo / Tin báo / Tin chờ người sai đi / Tin chờ người sai đi / Tin trong cung buổi này)
## RUNNER NOTE (A-SOLO, 25/11 15:15Z)
- LIFE DONE flight2-s9 «Xuất gia làm ni cô» age 23 (game year 5, rank 1 Thường tại), buổi 707, ≈ 09:28–15:14Z real time (5h46, incl. long harness stalls), real taps 2144 recorded in the last harness run (json counters reset on every resume), 0 JS clicks, no exit pick recorded (exitPick null). Last taps before the ending: «Kính sự phòng báo tin → Cáo bệnh» (Rất vững, dưỡng sức), «Giữ chân Hoàng thượng» card, a Bổng lộc tháng giêng card; the ending itself was game-imposed as far as the log shows.
- Harness heads used (all resume=1 from ckpt, same life, 13 switches): d5545202 → 1ffae8bb → 6d3a128f (+ my local #kpzoom-close patch buổi 21–27, logged) → 27c4d924 → 93812531 → 95718760 → 10fbc51c → 594fa1ee. The json «harness.sha» field only shows the first head.
- Save size curve (chars at ckpt): 196k@50 · 650k@181 · 1.15M@490 · 1.28M@579 · 1.39M@629 · 1.46M@679 (≈ +2.2k chars/buổi).
- Game-side findings (flight2-s9.json bugs): js `Cannot read properties of undefined (reading 'off')` at chooseM; «Sang ngày mới/Sang buổi» no-turn / disabled softlocks with non-empty dialog queues (Q=1, Q=6, Q=7); dialog queue holding 7 copies of «Tin báo»; frames without close/next (#kmrew, .mapsc, .kmov, .kfoc); «Tâm trạng · Ta» «Lui» no effect; thumbnail tap opens #kpzoom (harness issue, fixed in 93812531).
