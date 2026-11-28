# flight2-s20c (real-tap harness f65d019b, ipad)

| life | ending | age | buổi | taps | dead buttons | stuck | bugs | exit pick | promotion roads seen / taken |
|---|---|---|---|---|---|---|---|---|---|
| flight2-s20c | Hồng nhan bạc mệnh — Năm 20, Hoàng thượng niên hiệu Khang Định băng hà, thọ 40 tuổi. Tân Thái hậu Khâu Như Sương xét lại chuyện cũ (cơ may: Hiểm), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế | 37 | 2871 | 4602 | 3 | 0 | 6 | — | 417 / 303 (decree 405, select 12) |

## Dead buttons

- .dlg «Danh hiệu mới» «Để sau» covered by tapped 3× for real, dialog stays · noeffect-1795782517257.png
- .dlg «Danh hiệu lên bậc» «Để sau» covered by tapped 3× for real, dialog stays · noeffect-1795783387077.png
- .dlg «Danh hiệu mới» «Để sau» covered by tapped 3× for real, dialog stays · noeffect-1795793667992.png

## Bugs

- [dead] ×2 close button has no effect: .dlg «Danh hiệu mới» «Để sau»
- [dead] ×1 close button has no effect: .dlg «Danh hiệu lên bậc» «Để sau»
- [game] ×6 SAVE REWIND: the game went back to an older save (the buổi since its last good save are lost)
- [game] ×1 item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ()
- [game] ×481 QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
- [game] ×1 SAVE STALE: the stored save stopped following the live game (QuotaExceededError)