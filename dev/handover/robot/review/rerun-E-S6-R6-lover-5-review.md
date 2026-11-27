# R6-lover-5 (fold, bot=sens, seed 860050663, pf/pt_tang) — end-of-life notes — COUNTED, flag «mixed build (pin-server resume)»
Ending **Xuất gia — «Xuất gia làm ni cô»**, age 31, year 12, rank 0, **buổi 1720**, real taps, 0 JS clicks, 2 bug rows, 0 dead buttons. robot-audit VALID: game-imposed (the last bot tap was the non-exit option «Ta biết rồi»). Written from the result JSON + moment log, not played by eye.
## Builds / harness
≈ 40 h on github.io, several LIVE moves (start d402e37a51ed → 1b5137935266 → 5a7a9c4004c1 → 9ab008eb74f9); ckpt build0/mixedBuild edited at each, per Foreman E: flag «mixed build». Old-build kitScrollCues freeze at b64 (fixed by F's head), OOM page crash at b1677, resumed from ckpt.
## Findings
1. DESIGN: rank 0 for years, then a forced Xuất gia at 31 with no earlier warning in the last buổi (same quiet-decline shape as cautious-2/lazy-4).
2. GAME (minor): /img/kit/emo-choang, emo-hon, emo-hanghai .webp 404 on LIVE (CDN images; console errors).
3. HARNESS: «BOARD hat» rounds run 22 s at 6/10 moves with raw 0.00 (area 0) — the board path counts moves but never reads the cells.
