# flight2-s2e end-of-life review (ROBOT-PLAYER-REVIEW.md §B)

PRIORITY #1 CHECK: brief F-robot-2511 + ROBOT-PLAYER-REVIEW.md read; life resumed from the B-SOLO ckpt (no new life started).

## HONESTY NOTE (read first)
The runner session (this AI) acted as a SUPERVISOR for buổi 50-1331: it restarted the runner, switched harnesses and pruned shots, but did NOT play or watch the screens. It looked at 2 shots only (end.png, m-look-1320.png). Scores below are therefore LOW CONFIDENCE and come from the harness log/moments/bug list, not from a real player's feelings. Areas with no evidence are marked N/A rather than invented. The moment log is the harness's auto lines only (no runner-added feelings).

## 1. Summary
- Persona bot=bold, Fold 755x1000, origin thd, road thd_tho, seed 2026112517, real-tap harness, 0 JS clicks, no cap, exit pick: none.
- Ending: «Hồng nhan bạc mệnh — Lao phổi nguy kịch, không qua khỏi» (death by illness, game-imposed), age 24, year 7, buổi 1331, 923 taps, max rank 0 (never promoted; promotion roads 8 real / 3 picked, all by decree 8).
- Wall time ≈ 11.7 h (start ~16:47Z 11/25, end 04:28Z 11/26) including gaps where the container was down; not an active-play figure. Harness changed mid-life: 64d62d9b → d417d3bb → 7ca6b369 → b4b181f8 → 496b6b66 → 8dc395ba → 4d7a22c6 (BIG PASS each, same save). Game = LIVE (build stamp fa8da73cecdc; F #17 confirmed = 5e013076 for the later part; earlier part ran on earlier LIVE).
- VALID by the 25/11 rules: death, real taps, no cap, no bot-chosen exit. Caveat: harness/game changed mid-life, so it is a mixed-version life.

## 2. Scores (1-10, low confidence)
a. First 15 minutes: N/A (done by the previous runner, no review kept).
b. Gameplay loop & pacing: 3. 1331 buổi in 7 years, rank never rose off 0. Pace fell from ~150 to ~50 buổi/h as the save grew to 2.2 MB (page getting heavy). 49 repeats of the «Sang ngày mới» softlock below.
c. Buttons & UI: 3. 0 dead buttons by the harness hit-check, but: «Sang ngày mới» tapped 3× without the buổi turning ×49; «Có tin đang chờ» disabled with no dialog; dialog queue held 4 copies of one «Tâm trạng» card (looks like a dead ✕); 5× 15-min stuck on dialog «Khoa thi Đình»; 2 no-clock loops (150 taps) on «Dực Khôn cung · Hòa Sướng hiên» and «Vĩnh Hòa cung · Hòa Chương hiên».
d. Story & drama: N/A (not read).
e. Characters: N/A.
f. Choices & fairness: 4 at best. Stipend screen (end.png, «Bổng lộc tháng chín», Nội vụ phủ cắt xén) pays only «Thường»/poor goods (Vải thô hàng kém, Trà mốc hàng kém, 3× Nến mỡ dê, Bạc +30): a rank-0 life in year 7 is still on the cheapest stipend; Khoa thi Đình never got completed (5 stuck).
g. Rewards/feedback: N/A. h. Mini-games: N/A (exam rounds appear only in the later harness; the exam stuck rows suggest the exam flow can hang).
i. Visuals: 7 from the two shots only: the stipend dialog and the bedroom with «Chạm để bỏ qua» fade look clean and cổ trang.
j. Co-op: n/a.

## 3. Top 3 loved / hated (from evidence only)
Loved: no dead button in 923 real taps; the game ends the life cleanly with a clear ending line and an end shot; save/resume survived 7 harness switches and ~12 container restarts.
Hated: «Sang ngày mới» softlock ×49; «Khoa thi Đình» dialog that makes the runner wait 15 min five times; 7 years without a single rank step.
Would I play another life? Not as a player at this pace; as a tester yes (needs the softlock fixed).

## 4. BUGS (details in flight2-s2e.bugs.md; shots on the runner VM only, not in git)
1. [game] «Sang ngày mới» tapped 3× in one buổi, buổi does not turn (queue Q=1 «Tin trong cung buổi này» / Q=2 «Tin báo» + «Tin trong cung buổi này») ×49 (+1 case «disabled with no dialog», queue Q=10).
2. [game] «Có tin đang chờ · xo» disabled with no dialog on screen (queue Q=8).
3. [game] dialog queue holds 4 copies of «Tâm trạng · Quý phi Lương Lăng Ba».
4. [stuck] ×5 no progress 15 min on .dlg «Khoa thi Đình».
5. [stuck] ×2 no-clock loop 150 taps (Dực Khôn cung · Hòa Sướng hiên; Vĩnh Hòa cung · Hòa Chương hiên).
6. [harness] ×4 area tap blocked because a button appeared under the point (Thường Vải thô, Thường Nến mỡ dê, 2 odd ids «j59sz»/«kfxon j59sz» = suspect leaked element ids shown as button text; check VANPHONG).
No dead-button rows from the harness.

## 5. Suggestions (as player; new-feature ones go to PARKING_LOT)
Fix the noturn softlock family first (whole group: any dialog queue that blocks the buổi turn). Make Khoa thi Đình always closable. Rank 0 after 7 years suggests the promotion path is hard to reach for this persona (8 roads seen, 3 taken, all by decree): worth an owner look at the pacing, not a new feature.
