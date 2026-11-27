# R6-skilled-4 (fold, bot=sens, seed 207980214, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build»
Death **Hồng nhan bạc mệnh — «Năm 10, Hoàng thượng niên hiệu Thiên Hựu băng hà, thọ 32 tuổi…»** (the emperor dies, the consort does not outlive him), age 27, year 10, **buổi 1331**, 13581 real taps, 0 JS clicks, 7 bug rows, 1 dead button. robot-audit VALID (natural, game-imposed). Written from the result JSON + moment log, not played by eye.
## Builds / harness
Start game dd1ce3d0ffa1 (11-26), kitScrollCues freeze at b290 on the old build, parked ≈ 35 h for RAM, resumed on LIVE with ckpt build0 synced (flag «mixed build»); harness d2e03d80 → f65d019b+. No save-quota error.
## Findings
1. **GAME: SAVE REWIND ×6 on reload** (b650 ×2, b712, b1270, b1284, b1303; 1-2 buổi lost each) + one «game went back to an older save». The stored save lags the live game by the last 1-2 buổi (same family as speed-4 / lover-3 / greedy-2).
2. GAME: dead close button, «Nhờ thái giám tìm thú nuôi» «Lui» (a new dialog; the earlier dead one was «Danh hiệu mới» «Để sau»).
3. GAME: item pick grid re-opened 3× by «Tiếp ▸» with no gift given (every item locked / the confirm never usable); and the «kipgo» confirm off-screen after 8 real scrolls (same family).
4. DESIGN: death of a skilled persona from the emperor's natural death at year 10 — the 88/132 picked (67 %) did not matter; no way to save the consort in the offers seen.
5. HARNESS: two area taps blocked because a button appeared under the point, by design.
