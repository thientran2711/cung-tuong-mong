# flight2-s11 (real-tap harness fd9218fe, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s11 | Hồng nhan bạc mệnh — Năm 17, Hoàng thượng niên hiệu Vĩnh An băng hà, thọ 37 tuổi. Tân Thái hậu Viên Tố Huyên xét lại chuyện cũ (khả năng: rất thấp), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế | 34 | 2454 | 2835 | 1 | 0 | 4 | — | 30 / 10 (exam 2, decree 28) |

## Dead buttons

- .dlg «Nhờ thái giám tìm thú nuôi» «Lui» covered by tapped 3× for real, dialog stays · noeffect-1795669444465.png

## Bugs

- [freeze] ×1 page froze: no harness step for 10 min (page.evaluate hung) at buổi 63
- [harness, fixed in ad5e1265] ×4 dialog scrolled to the end has no close / next button: .kmov «» (pre-fix false positive: tap-to-skip cinematic «Thẻ bài được dâng lên Hoàng thượng», all 4 on 4d7a22c6; 0 since d2e03d80)
- [game, KK32 case] [dead] ×1 close button has no effect: .dlg «Nhờ thái giám tìm thú nuôi» «Lui»
- [harness guard note, not a fault] ×1 area tap would have landed on a button (it appeared under the point) — blocked: «Nghe chuyện cũ, dò tin lục cung Tùy duyên TỐN Sức »

## Run notes
- Life ran on LIVE origin/main 5e013076 (GAME BUILD 3762da08+ fa8da73cecdc), dev=fold bot=rand seed=2026112522; harness 496b6b66 → 8dc395ba → 4d7a22c6 → d2e03d80 → fd9218fe (same life, resumed from fresh ckpts; 1 container restart ~02:25Z, nothing lost).
- Saves/ckpt/shots not in git (runner box /home/user/wt/s11-out). Moments log: flight2-s11-moments.md.
- Ending: Hồng nhan bạc mệnh, age 34, buổi 2454, taps 2835, rank 0 whole life, promotion roads 30 seen / 10 taken (exam 2, decree 28).
