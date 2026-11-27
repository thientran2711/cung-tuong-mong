# R6-speed-2 (fold, bot=sens, seed 2881086999, pf/pt_tang) — end-of-life notes — COUNTED, flags «mixed build» + «save quota» + «save rewind»
Ending **Lãnh cung — «Tuổi xuân qua đi»**, age 40, year 23, **buổi 3210**, 5867 real taps since the last resume, 0 JS clicks, 17 bug rows, 3 dead-button rows. robot-audit VALID (natural end). Written from the result JSON + moment log, not played by eye; 464 offers seen / 294 picked (63 %). Fresh rerun on LIVE github.io (the first R6-speed-2 run was INVALID under the owner's robot rules).
## Builds / flags
Start 9ab008eb74f9; OOM crash at b838 resumed with ckpt build0 synced to LIVE (**«mixed build»**). At ≈ b2789 the 5.2M-char save reached the quota wall on the old in-memory build (QuotaExceededError ×200); I restarted from ckpt at 20:57Z on the packed-save LIVE: one failed write, then the game repacked to 0.4M and no quota error followed (**«save quota»**). Reload rewinds: 2 buổi at b1699 and **54 buổi at b2835** (the stale save, **«save rewind»**).
## Findings
1. GAME: SAVE REWIND ×2 on reload (2 and 54 buổi) and the quota wall — fixed on LIVE 24beb1a4 (packed save), verified on this life and on rebel-1.
2. GAME: dead close buttons — «Danh hiệu mới» «Để sau» and «Danh hiệu lên bậc» «Để sau» (the title dialogs again), and a .kscn whose close «Lui» stays after 3 real taps.
3. GAME: item pick grid, the confirm «kipgo» stays off-screen after 8 real scrolls (×2: «Biếu quà làm lành»).
4. GAME (JS): page error «sx is not defined» (fixed by LIVE 8330e8b8 per Foreman E).
5. DESIGN: the third Lãnh cung at age 40 (with cautious-2): 23 quiet years at rank 0 after the early rise — «Tuổi xuân qua đi» again with no mid-game recovery.
6. HARNESS: 4 picker stalls on a .kscn scene («Chuẩn bị thị tẩm», «Ta biết rồi» refused as «gone»), cleared by a real tap on the scene's own buttons; 3 area taps blocked by a button appearing under the point.
