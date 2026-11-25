# PLAYER REVIEW — E-S1-R1-lover-1-1915499756 (thd / thd_tho, iPad, persona lover = romance player)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B followed; moments in rerun-E-S1-E-S1-R1-lover-1-1915499756-moments.md. Honest scope: the runner is an AI driving a real-tap harness; it looked at ~10 shots (first screens, rank changes, stuck shots, ending) and the full harness log/bug table, not every buổi.

## 1. Summary
- Persona lover (harness bot `sens`), origin thd (thân dân) · road thd_tho, seed 1915499756, dev iPad 1180x820 (real taps, jsClicks 0).
- Years 6 (age 18→23 at death), 1119 buổi, 1980 real taps, max rank 1 (rank 0→1→0→1), ending «Hồng nhan bạc mệnh — Lao phổi nguy kịch, không qua khỏi» (death, VALID per robot-audit).
- Real time: ~8 h wall clock (started ~11:40Z 25/11, ended ~19:50Z), resumed several times (1 PAGE FROZE at buổi 607 on this life, the others = harness upgrades).
- Builds: LIVE github.io Build 6a87c26fe0f5 (main ee37ab5f) for the whole life (resumes kept the old browser profile). Harness: 93812531 → 69e41729 → 64d62d9b/d417d3bb → b4b181f8 (READY).

## 2. Scores (1–10)
a. First 15 minutes — 4. Five pop-ups before the first free tap (Tin trong cung buổi này, Có người bán tin, Ân thưởng, Xem quan hệ…); the goal is never stated; the first merchant card greys «Mua tin» (Bạc 18 < 35) without saying why.
b. Gameplay loop & pacing — 3. 1119 buổi for 6 years and rank 1 at best: the same «Tâm trạng», «Tin báo», Lịch tháng cards repeat; «Sang ngày mới» softlocks ×18 (nothing turns, no cue); 12+ times the robot looped 150 taps on a map page without a clock step.
c. Buttons & UI — 2. Soft-locks: «Sang ngày mới» does not turn (Q=1 «Tin trong cung buổi này»); «Có tin đang chờ · xo» disabled with 5–12 hidden dialogs in the queue; «Tin báo» with every button below the screen; «Phụ tuyến · Tân quân lập uy · Chương 2» card clipped (no option reachable) stuck ×8; «Lui» pops one of up to 35 duplicate «Tâm trạng · Hoàng hậu Khương Diệu Hoa» copies (dialog queue has no dedupe). Dead button: «Lui» on «Tâm trạng» (noeffect shot).
d. Story & drama — 5. The cổ-trang event text reads well (Lễ tấn phong, Hội Phượng, Tết Trùng cửu, Lễ Vu Lan) but I never saw a consequence of my choices; rank went 1→0 with only the dawn banner as an explanation.
e. Characters & interactions — 5. Many named people (Hoàng hậu Khương Diệu Hoa, Thiệu Nhu Tắc, Tề Thải Vi) but as a lover-player I got no romance beat; people mostly show up as «Tâm trạng» look-ups.
f. Choices & fairness — 6. Gift/offer cards show three equal-looking options with «Tốn»/«Được» lines and odds words (Vững, Rất vững, Tùy duyên) — law 7 holds; but several cards show a single option «Tắm gội chờ giá»-style (no choice, law 2).
g. Rewards, feedback & emotion — 4. Stipend dialogs list items and Bạc, fine; wins/losses (rank change, death) get a banner only.
h. Mini-games — n/a (harness never entered a mini-game on this life: offers 182 / picked 13; mgQuit 0).
i. Visuals & sound — 6. Art is gorgeous (figures, scene art behind dialogs); one dialog is semi-transparent and its text collides with the scene (m-look-740). Sound not testable by the robot.
j. Co-op — n/a (solo).

## 3. Top 3 loved · top 3 hated · replay?
Loved: (1) the art and cổ-trang wording of festival/promotion cards; (2) «Lễ tấn phong» gift choices that feel equal; (3) odds words on every option.
Hated: (1) cannot end a buổi / cannot close dialogs (soft-locks, 35 copies of «Tâm trạng»); (2) the endless repetition of the same info dialogs; (3) rank goes down with no explanation.
Replay another life? Only after the soft-locks are fixed — as a casual player I would have quit in year 1.

## 4. BUGS found (repro, shot, save in the runner out dir; shots not in git)
1. GAME — popup over the END card: at death the monthly «Bổng lộc tháng chín» dialog (list + «Nhận») opens over the end-of-life card («KIẾP … Liễu yếu gặp sương…»). Shot end.png. Fast lane (flight priority).
2. GAME (known, fix-8) — «Sang ngày mới» / «Sang buổi» tapped, buổi does not turn, Q=1 «Tin trong cung buổi này» (×18) / «Có người đến».
3. GAME — «Có tin đang chờ · xo» disabled with no dialog on screen, hidden queue Q=5–12 (family of the evidence pushed at af6ca680).
4. GAME (known, KK29) — iPad «Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1»: no option reachable → stuck ×8 on LIVE 6a87c26fe0f5 (rerun of the parked cautious life on 4763d410aa0d is the check).
5. GAME — «Tin báo» no way out: «Để ta xem» / «Để sau» below the screen, nothing scrolls.
6. GAME (known) — dialog queue has no dedupe: up to 35 copies of one «Tâm trạng» dialog; «Lui» closes one.
7. PERF/GAME — PAGE FROZE ×1 on this life at buổi 607 (renderer 4.2 GB) and ×4 on the sibling life 1077992375 (renderer 3.9–4.7 GB): the page grows without bound after ~600 buổi.
8. HARNESS — «ReferenceError: bareTap is not defined» on 64d62d9b (fixed in d417d3bb/b4b181f8).

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- A one-line «what do I do now» hint for the first 3 buổi. · Say why a button is greyed («Bạc không đủ»). · Explain a rank drop on the dawn card. · Collapse the same person's «Tâm trạng» queue into one. · Mark an end-of-buổi state when «Sang ngày mới» is blocked by a pending dialog.
