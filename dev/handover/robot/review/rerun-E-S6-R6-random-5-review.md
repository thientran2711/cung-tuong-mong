# R6-random-5 (fold, bot=sens, seed 3552077722, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build»
Ending **Lãnh cung — «Phát điên trong lãnh cung»**, age 30, year 13, rank 0, **buổi 1843**, 6649 real taps, 0 JS clicks, 6 bug rows, 1 dead button. robot-audit VALID (game-imposed natural ending). Written from the result JSON + moment log, not played by eye. Fresh rerun on LIVE github.io (the first R6-random-5 run was INVALID under the owner's robot rules), harness f65d019b.
## Builds
Game build 9ab008eb74f9 at start; one OOM page crash at b1214, resumed from ckpt with build0 synced to LIVE (flag «mixed build» as a precaution; no mismatch reported). No save-quota error (save peaked ≈ 3.9M chars).
## Findings
1. GAME: dead close button — «Danh hiệu mới» dialog, «Để sau» does nothing after 3 real taps (year 9, age 26, rank 0).
2. GAME: item pick grid — the confirm «kipgo» stays off-screen after 8 real scrolls (×2, incl. «Biếu quà làm lành»): the confirm button is below the fold.
3. GAME (JS): page error «sx is not defined» once.
4. DESIGN: same quiet-decline shape (rank 0 from year ≈ 9, Lãnh cung at 30; 148 offers seen, 75 picked = 51 %).
5. HARNESS: area tap blocked because a button appeared under the point («Thường Son sáp…»), by design.
