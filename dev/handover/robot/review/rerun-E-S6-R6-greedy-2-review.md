# R6-greedy-2 (ipad, bot=sens, seed 333164740, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build»
Death **Hồng nhan bạc mệnh — «Giả mang thai bị thái y khác bắt mạch phát hiện, tội khi quân»** (the fake-pregnancy plot is found out), age 30, year 13, **buổi 1822**, 3569 real taps, 0 JS clicks, 1 bug row, 18 dead-button rows. robot-audit VALID (natural, game-imposed death). Written from the result JSON + moment log, not played by eye.
## Builds / harness
Started 11-26 on game b7dcbbd06e03 with the old harness 2df8f5fa, parked at ckpt b1594 for RAM, resumed ≈ 36 h later on LIVE with ckpt build0 synced (flag «mixed build»); the last 230 buổi ran on harness f65d019b+. No save-quota error.
## Findings
1. GAME: SAVE REWIND ×2 (b1668→b1667, b1818→b1817; 1 buổi lost each) — the stored save lags the live game by the last buổi (same family as speed-4 / lover-3).
2. GAME: dead close button, «Danh hiệu mới» «Để sau» (same as random-5 / speed-4 / lover-3).
3. NEEDS A LOOK (old harness, before the resume): 17 dead-button rows on the `.mapsc` day-map rows («Chung Tú … bóng · n khắc», e.g. «bái kiến»): taps on those rows had no effect in the rows recorded. Not re-checked on the current harness; either a harness tap-target issue on the map scene or a real dead row.
4. DESIGN: greedy persona dies of an exposed pregnancy lie at 30 — a rare dramatic end after 13 years (279 offers seen / 135 picked = 48 %).
