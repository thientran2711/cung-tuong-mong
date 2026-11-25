# End-of-life review — flight2-s8 (robot player review, ROBOT-PLAYER-REVIEW.md §B)

Basis: the runner (AI) did not watch every buổi live. It read the harness moment log (about 200 lines, incl. 80 every-20-buổi looks), the results JSON, the log, and looked at the shots it quotes. Scores are therefore a player's impression from those, not a full playthrough. Player quotes stay Vietnamese.

## 1. Summary
- Persona: bold (skilled/core-gamer style bot), origin thd, road thd_tho, seed 372282412, iPad 1180x820, LIVE site, real taps only (JS clicks 0).
- Character: Thạch Tú Uyển, started as Phế phi · lãnh cung, age 21 at buổi 169. Years played: 13 game years (turn 175). Max rank: 0 (never left lãnh cung). Danh 1, Sủng 0, Bạc 7-22 at every look.
- Ending (game-imposed, counts): «Hồng nhan bạc mệnh» — Năm 13, Hoàng thượng niên hiệu Vĩnh An băng hà, thọ 34; Tân Thái hậu Vương Yên Nhiên xét lại chuyện cũ (khả năng: rất thấp), ban lụa trắng, ép tuẫn táng. Age 32 at death in harness line. buổi 1931, 3641 taps.
- Real time: about 9 h from the s8 #2 resume (10:19Z to 19:25Z, buổi 169 to 1931); the predecessor ran buổi 0-169 before. Rate 2-3 buổi/min after harness 64cd9fcf; no cap.
- Harness chain on this life: 1a29f470, 64cd9fcf, 1ffae8bb, 6d3a128f, 93812531, 10fbc51c, 594fa1ee, 34314d23, 64d62d9b, d417d3bb, 7ca6b369, b4b181f8 (95718760 and 27c4d924 in between). Life ran on one save, resume=1; the ckpt is removed from the repo so nobody resumes an ended life.
- Totals: 97 bug entries, 16 dead buttons, 5 stuck, 0 JS clicks. No exit-road tap (not needed; ending is the game's).

## 2. Scores (1-10)
a. First 15 minutes: 7. iPad layout is roomy and readable (shot at year 1 tháng sáu: scene, bars, tabs all legible). The goal in lãnh cung is not obvious: the highlighted tab «Tư trang» while the scene shows lãnh cung action cards confused me, and the header chip «Quê Thượng thượng (Con cái)» did not explain itself.
b. Gameplay loop and pacing: 4. For 13 years the loop was almost the same: Trường Môn viện page, Tin báo, Lịch tháng, Tâm trạng, Sang buổi. The Dư đồ/Giao tình screens (phe Lữ gia, Càn Ninh, Khương gia) look good but the character never gets a road out, so the bar rank 0 / Sủng 0 stays flat from year 1 to year 13 (see every look at buổi ~340, ~1120, ~1920).
c. Buttons and UI: 3. Many problems: Lui does nothing in person «Tâm trạng» dialogs (Trưởng Tôn Cẩm Sắt, Nhan Lăng Ba, Kiều Ngọc Hành, Thôi Lan Âm, Lữ Hi Nguyệt, Niên Ninh Hương, Ta, Thường tại Thôi Lan Âm), Tin báo and Lịch tháng; the dialog queue holds many copies of the same dialog so each Lui only pops one (24-25 copies of «Tâm trạng · Phi Khương Hồng Ngọc» at year 4); «Sang ngày mới» and «Có tin đang chờ» disabled with no dialog on screen while the queue holds 3-25 dialogs; .kmov has a «?» button of zero size and kmov/kmrew dialogs with no close.
d. Story and drama: 5. Chapter dialogs came on schedule (Chương 4 Danh hiệu Tài nữ, 5 Lời thơ vượt tường cung, 6 Tập nháp bị trộm, 7 Vòng thi Ngự hoa viên, 8 Lời vu đạo thơ, 9 Chứng minh) and the ending (new Thái hậu reopens an old case, white silk) follows from the emperor's death, which is strong. But as a lãnh cung player I felt like a spectator: «Chứng minh» and «Lễ tấn phong Phi Lâm Ngưng Sương» happen to other people.
e. Characters and interactions: 5. People do act on their own (tấn phong, new Thái hậu, faction heads with thế lực), and the Phe phái panel is clear. Odd: names shown as «???» in Tin báo («giao cho cung nữ ??? việc canh chừng cung»), and the Tâm trạng panel lists «Nguyên do chưa rõ» for 4 of 5 rows, so a schemer has nothing to use.
f. Choices and fairness: 4. In lãnh cung there were few real choices; the mood bar read «Phiền muộn» (−25 to −27) for years. As a bold player I found no clear gain path; nothing told me why.
g. Rewards, feedback, emotion: 5. Bổng lộc dialogs with chest and item cards are nice (Vải thô, Yên chi giấy, Nến mỡ dê), and the ending fade at night is atmospheric. Odd: during the ending fade the previous Bổng lộc dialog shows as a ghost layer on top of the bedroom scene (m-look-1920).
h. Mini-games: 5. I only saw them through the harness (it plays them to the end under 95718760); I cannot judge fun or difficulty. Not scored in depth.
i. Visuals and sound: 8 on visuals (painted scenes, two-figure lãnh cung scene, kit frames consistent on iPad), sound not judged (no audio in the harness).
j. Co-op: not applicable (solo).

## 3. Top 3 loved / hated / replay
Loved: (1) the painted scenes and layout on iPad; (2) the Phe phái screen (who leads which faction, thế lực, who is hostile to me with a number); (3) the ending: it follows from the court's story.
Hated: (1) dialogs that cannot be closed and the stacked duplicate dialogs; (2) «Sang ngày mới» locked behind an invisible queue; (3) 13 years at rank 0 with Sủng 0 and no road out.
Would I play another life: yes, but not thd_tho in lãnh cung; a start with a road upward (a different origin) I would try, because the screens look worth exploring while this one felt like waiting.

## 4. Bugs (these go to the bug fast lane; counts are from the results JSON)
- Lui in person «Tâm trạng» dialogs does nothing (≥10 persons), plus Tin báo ×2, Lịch tháng ×3. Cause seen in the log: the same dialog is queued many times, each Lui pops one. Repro: open any person Tâm trạng several times, press Lui. Shots on the runner only (noeffect-*.png).
- Q-softlock: «Sang ngày mới» / «Có tin đang chờ» disabled with no dialog on screen while the dialog queue holds 1-25 hidden dialogs (≈45 distinct events and ×105 «tapped 3× but the buổi does not turn, queue Q=1: Tin trong cung buổi này»). Known family; fix button-crawl-fix-5 reported in review by F #11.
- No-clock loops: 150 taps without a clock step on Trường Môn viện page (×85), Lịch tháng, Tin báo, Chương 4, Thiên mệnh, .mapsc (×6), Tâm trạng of Hoàng thượng / Thái hậu / Tể tướng Hạ Quý Ngọc.
- .kmov: «?» button with zero size (dead-ipad shot), 21× kmov dialog scrolled to the end with no close/next, #kmrew and Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1 without close (stuck 15 min).
- «???» names in Tin báo text.
- Ghost layer of the previous dialog over the ending fade.
- Harness (not game): «bareTap is not defined» at unstick level 2 on 64d62d9b, fixed in d417d3bb.

## 5. Suggestions (as a player; feature freeze law 18, MAIN files new ones in PARKING_LOT)
- A visible road out of lãnh cung, or at least a line saying why Sủng stays 0 (new feature, parking lot).
- Show the reason behind each mood row (replace «Nguyên do chưa rõ»), so a schemer can act on it (new feature, parking lot).
- Collapse duplicate dialogs in the queue (this is a bug fix, not a feature).
