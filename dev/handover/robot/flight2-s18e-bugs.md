# flight2-s18e bugs (final)

Life ended by QUOTA STOP (known, cured on LIVE): localStorage hclh-save-v2-1 hit QuotaExceededError at buoi ~2602 (5.2-5.3M chars), pinned old build 86170222adab. I stopped the runner at buoi 2648 (last ckpt 05:01Z); the final «runner error: browser closed» is my kill, not a game bug. Audit says INVALID (no natural ending), real verdict: QUOTA STOP, no death/ending reached.

## bugs

- [stuck|no-clock loop: 150 taps without a clock step on .dlg «Đông sở»] no-clock loop: 150 taps without a clock step on .dlg «Đông sở»
- [game|KG82.phase stays «play» after the round ended: board hat shows its result / next («✕») — the game never set phase «result»] KG82.phase stays «play» after the round ended: board hat shows its result / next («✕») — the game never set phase «result»
- [harness|area tap would have landed on a button (it appeared under the point) — blocked: «Thường Phấn gạo Hộp phấn mắt dùng khi điểm trang: »] area tap would have landed on a button (it appeared under the point) — blocked: «Thường Phấn gạo Hộp phấn mắt dùng khi điểm trang: »
- [game|SAVE REWIND: the game went back to an older save (the buổi since its last good save are lost)] SAVE REWIND: the game went back to an older save (the buổi since its last good save are lost)
- [dead|close button has no effect: .dlg «Danh hiệu mới» «Để sau»] close button has no effect: .dlg «Danh hiệu mới» «Để sau»
- [game|item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ()] item pick grid: the confirm «kipgo» stays off-screen after 8 real scrolls ()
- [game|KG82.phase stays «play» after the round ended: board mua shows its result / next («✕») — the game never set phase «result»] KG82.phase stays «play» after the round ended: board mua shows its result / next («✕») — the game never set phase «result»
- [game|QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)] QuotaExceededError: the game save no longer fits localStorage (j6 save() swallows it: every later save is lost)
- [game|SAVE STALE: the stored save stopped following the live game (QuotaExceededError)] SAVE STALE: the stored save stopped following the live game (QuotaExceededError)
- [None] runner error: page.waitForTimeout: Target page, context or browser has been closed

## dead buttons (2)

- .dlg «Danh hiệu mới» «Để sau» tapped 3× for real, dialog stays
- .dlg «Danh hiệu mới» «Để sau» tapped 3× for real, dialog stays
