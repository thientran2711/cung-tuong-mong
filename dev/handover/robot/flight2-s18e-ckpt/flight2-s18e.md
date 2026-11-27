# flight2-s18e (real-tap harness f65d019b, fold)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s18e | HARNESS |  | 1045 |  | 2 | 0 | 8 | — | 104 / 75 (decree 104) |

## Dead buttons

- .dlg «Danh hiệu mới» «Để sau» covered by tapped 3× for real, dialog stays · noeffect-1795804454138.png
- .dlg «Danh hiệu mới» «Để sau» covered by tapped 3× for real, dialog stays · noeffect-1795812350321.png

## Bugs

- [stuck] ×1 no-clock loop: 150 taps without a clock step on .dlg «Đông sở»
- [game] ×1 KG82.phase stays «play» after the round ended: board hat shows its result / next («✕») — the game never set phase «result»
- [harness] ×2 area tap would have landed on a button (it appeared under the point) — blocked: «Thường Phấn gạo Hộp phấn mắt dùng khi điểm trang: »
- [game] ×2 SAVE REWIND: the game went back to an older save (the buổi since its last good save are lost)
- [dead] ×2 close button has no effect: .dlg «Danh hiệu mới» «Để sau»
- [game] ×1 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ()
- [game] ×1 KG82.phase stays «play» after the round ended: board mua shows its result / next («✕») — the game never set phase «result»
- [harness] ×1 runner error: page.waitForTimeout: Target page, context or browser has been closed