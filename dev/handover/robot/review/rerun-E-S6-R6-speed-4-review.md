# R6-speed-4 (fold, bot=sens, seed 13314017, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build»
Ending **Lãnh cung — «Phát điên trong lãnh cung»**, age 33, year 15, rank 0, **buổi 2057**, 13903 real taps, 0 JS clicks, 5 bug rows, 1 dead button. robot-audit VALID (natural ending). Written from the result JSON + moment log, not played by eye. Fresh rerun on LIVE github.io (the first R6-speed-4 run was INVALID under the owner's robot rules), harness f65d019b.
## Builds
Start 9ab008eb74f9; one OOM page crash at b757, resumed from ckpt with build0 synced to LIVE 128ec6b7d5fa: flag «mixed build». No save-quota error (peak ≈ 4.4M chars).
## Findings
1. GAME: SAVE REWIND ×2 — a reload (crash-resume) went back 1 buổi (b942→b941, b1808→b1807): the stored save lags the live game by the last buổi.
2. GAME: dead close button, «Danh hiệu mới» «Để sau» (same as random-5).
3. GAME: item pick grid, the confirm «kipgo» stays off-screen after 8 real scrolls («Biếu quà làm lành») (same as random-5).
4. DESIGN: 15 years to a Lãnh cung ending again (256 offers seen / 134 picked = 52 %); the «Phát điên trong lãnh cung» wording is the same ending as random-5.
5. HARNESS: two area taps blocked because a button appeared under the point («Tháo», a «Thường Trà…» card), by design.
