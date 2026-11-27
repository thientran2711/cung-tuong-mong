# R6-lover-3 (ipad, bot=sens, seed 2308033329, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build»
Death **Hồng nhan bạc mệnh — «Kiết lỵ nguy kịch, không qua khỏi»** (illness), age 27, year 10, **buổi 1358**, 8623 real taps, 0 JS clicks, 5 bug rows, 1 dead button. robot-audit VALID (natural death). Written from the result JSON + moment log, not played by eye. Fresh rerun on LIVE github.io (the first R6-lover-3 run was INVALID under the owner's robot rules), harness f65d019b.
## Builds
Start ef5d32d4ff1e; one OOM page crash (b610), resumed from ckpt with build0 synced to LIVE: flag «mixed build». No save-quota error.
## Findings
1. **GAME: SAVE REWIND ×4 on reload** (b606→b604, b713→b711, b909→b906 ×2; 2-3 buổi lost each) plus one «game went back to an older save». Pattern: the stored save lags the live game by the last 1-3 buổi (same as speed-4, which lost 1); worse after a crash/resume.
2. GAME: dead close button, «Danh hiệu mới» «Để sau» (same as random-5 / speed-4).
3. GAME: item pick grid, the confirm «kipgo» stays off-screen after 8 real scrolls (same family).
4. GAME (JS): page error «sx is not defined» (same as random-5).
5. DESIGN: a lover persona dying of illness at 27 (194 offers seen / 124 picked = 64 %); the death came with no warning beat, as for the other Xuất gia / Lãnh cung endings.
