# R6-lazy-2 (fold, bot=sens, seed 2705686082, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build»
Death **Hồng nhan bạc mệnh — «Năm 8, Hoàng thượng niên hiệu Thừa Bình băng hà, thọ 32 tuổi…»** (the emperor dies, the consort follows), age 27, year 8, **buổi 1145**, 13276 real taps, 0 JS clicks, 3 bug rows, 1 dead button. robot-audit VALID (natural, game-imposed). Written from the result JSON + moment log, not played by eye.
## Builds / harness
Started 11-25; kitScrollCues freeze at b65 on the old build; parked ≈ 48 h at ckpt b61; resumed on LIVE d9ca7892+ (86170222adab) with ckpt build0 synced (flag «mixed build»); harness f65d019b+ / b4b181f8. No save-quota error, no save rewind.
## Findings
1. **GAME: SOFTLOCK — «Sang ngày mới» tapped 3× in one buổi but the buổi does not turn (dialog queue Q=1: «Tin trong cung buổi này»)**; the robot's unstick got out. Not the harness: a queued dialog holds the turn.
2. GAME: dead close button, «Danh hiệu mới» «Để sau» (same as random-5 / speed-4 / lover-3).
3. DESIGN: the second lazy/skilled life in a row where the emperor dies (year 8 here, year 10 in skilled-4) and the consort dies with him — a short, early, unavoidable ending for a persona that never rises (138 offers seen / 94 picked = 68 %).
