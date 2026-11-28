# E-S8-bd_san-R7-lover3 — end-of-life review (player + reviewer, persona: lover = chases romance/gifts)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md followed. Harness f65d019b (iPad 1180x820 real taps, jsClicks 0), seed 3289187395, fresh life, profile deleted first, no resume; **unpinned LIVE github.io, build 5fb13d60+ (8af7b3429f38)** from first load to the end → clean, not mixed.

## 1. Summary
- origin bd, road bd_san, iPad, persona lover (bot `sens`). Đường Thanh Ca, Quý nhân (rank 2), 18 tuổi, Trường Xuân cung · Vĩnh Xuân hiên; Sắc 84 Tài 40 Tâm cơ 37 Đức 9 Danh 0 Sủng 1, Bạc 389→456, Sức 93/93→78/93, mood «Bình thản +9».
- 1 game year (tháng chạp, hạ tuần), 120 buổi, 2259 taps, 10 turns, 20 boards (ban/hat/mua/doden; hat boards end 0.00 raw with 2–6/10 moves, mua 10/10), offers 30/22 picked. Ending: **Hồng nhan bạc mệnh — «Lao phổi nguy kịch, không qua khỏi»** (illness, game-imposed; the top bar showed «Lao phổi · nguy kịch» and «Hôm nay mặt mộc»), end card «Liễu yếu gặp sương · Mở Sổ luân hồi» + «Tiếp theo» (shot end.png). exitPick none, jsClicks 0, stuck 0, dead buttons 1, 3 bug rows. audit VALID.

## 2. Scores (evidence: moment log, shots m-look-120.png, end.png)
- a. First 15 min 6. b. Pacing 3 — dead after 120 buổi / 1 year; all boards are quick. c. UI 7 — the Mệnh truyện / Sổ ghi page is rich and readable (Ân sủng panel: Tai mắt, Có thai, Lật thẻ, Ân tình; Nguy hiểm chung 55 / Xét phẩm thiếu 4) but the «Danh hiệu mới» «Để sau» button does nothing. d. Story 4 — a rank-2 Quý nhân with a Tài/Đức/Sủng-poor start dies of lao phổi in year 1 with a clear warning chip («Lao phổi · nguy kịch»); abrupt. e. Characters 5 (Xuân Yến portrait; Đường Thanh Ca). f. Choices 5 (the «Kỳ nguyệt sự» card: Báo đúng ngày / Báo lùi vài hôm / Báo sớm / Giấu, không báo — clear Tốn/Được lines). g. Rewards 4. h. Mini-games 6 (20 boards; hat raw 0.00 on all 7 hat boards looks like the board gives no score to a bot that plays 2–6 moves — worth a look). i. Visuals 8. j. n/a.
## 3. Loved: the Sổ ghi page; the clear illness chip; the end card. Hated: dying at 18 in year 1; a «Để sau» that does not close.
## 4. BUGS (3 rows)
- **DEAD / no-effect close**: `.dlg «Danh hiệu mới» «Để sau»` tapped 3× for real, dialog stays (same as E-S2 random1-h).
- **Softlock** «Sang ngày mới» tapped 3× but the buổi does not turn, dialog queue Q=1 «Có người bán tin».
- SAVE STALE («the stored save stopped following the live game», no setItem error).
- No crash.
## 5. Suggestions (freeze → recorded): illness early in a rank-2 start needs a cure path; check the hat board scoring (raw 0.00).
