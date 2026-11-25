# flight2-s2d — end-of-life player review (runner: B-SOLO s2d, persona rand = casual newcomer)
EVIDENCE LIMIT: the robot plays by real taps; I (the runner AI) watched the life through ~15 screenshots (start, 3 Tin báo cards, Lịch tháng, Lệ tháng chest, end screen) plus the harness moment log (172 lines) and logs. Areas I did not actually see are marked n/a — no invented scores.

## 1. Summary
Persona: casual newcomer (rand bot). Origin cnv / road cnv_mat, iPad 1180x820, LIVE github.io. Character Thiệu Văn Tình, cung nữ tam đẳng the whole life. 12 years (age 18→30), 1578 buổi, max rank Đáp ứng (rank 0), 0 hoàng tử / 0 công chúa, ending «Xuất cung tuổi 30 — Nội vụ phủ cho xuất cung theo lệ, 139 lạng bạc» (game-imposed; the bot declined the earlier exit offer «Xin ở lại»). Real time: ~10 h wall on this slot (incl. 3 voided harness runs s2/s2b/s2c and 11 harness switches; the s2d life itself ~9.6 h).

## 2. Scores (1–10)
a. First 15 minutes — n/a (the bot's first 15 min were spent stuck on a person dialog, a harness problem; I judge only what I saw: the Tâm trạng dialog is clear and cổ trang-toned, 7/10).
b. Gameplay loop & pacing — 3/10. 12 years at rank 0 with no promotion; Xét phẩm cuối tháng appears every month and the title stays «Cung nữ tam đẳng». As a player I felt «nothing I do moves me»; the same «Tin báo» card, «Có khách đến chơi», «Xét phẩm» repeat across years.
c. Buttons & UI — 2/10. The «Tin báo» news card (≥25 notices) has no visible ✕/Lui/Đã hiểu and cannot scroll → soft-lock (filed K-NOTICE-OPTS / MAIN 140). Person dialog without backdrop kept re-opening; a save poisoned by ~2.9k queued copies of that dialog was seen early (game bug, fix branch). Dead buttons 70, almost all #dawn / .kne-beat early (harness false positives fixed later).
d. Story & drama — 5/10 (limited): chapters 8→10 (Hồi, Đại án vu cổ, Lời đồn quyến rũ) fire on time; but I could not tell what in the plot followed from my choices.
e. Characters & interactions — 5/10 (limited): patron changed Hoàng hậu → Gia quý phi without feeling connected; the Tin báo news (who hates whom, who sends letters) reads alive and cổ trang, but it is too long (55–70 items).
f. Choices & fairness — n/a (no option comparison done).
g. Rewards, feedback & emotion — 6/10. The Lệ tháng reward chest (rương + 2 items + «Nhận») and the ending screen (Kiếp này, kẻ thù còn sống, kết cục) feel good.
h. Mini-games — n/a (only intro screens seen: Học Công/Vũ/Cầm, hà bao uyên ương, #kg82 «Sẵn sàng / Bỏ qua»).
i. Visuals & sound — 8/10 on art (portraits, scenes beautiful); sound not observable.
j. Co-op — n/a.

## 3. Top 3 loved / hated
Loved: (1) the art and cổ trang wording of dialogs; (2) the ending screen summary; (3) the Lệ tháng chest moment.
Hated: (1) the Tin báo card I cannot close; (2) 12 years with no rank change; (3) the same monthly cards repeated for years.
Would I play another life? Maybe — only if promotion actually moved; a rank-0 cung nữ life feels like a waiting room.

## 4. BUGS found
1. GAME softlock: «Tin báo» with ≥25 notices: no reachable close (screens stuck-4/5/6/7, CDN img/_review/s2d-tinbao/, handover flight2-s2d-stuck{2,3}-files). Real game bug (BIG REVIEWER #5; MAIN 140).
2. GAME: person «Tâm trạng» dialog without backdrop re-queues itself (save with ~2.9k copies) — filed by harness fixer.
3. HARNESS: false dead buttons under #dawn/.kne-beat; #kmrew «no close» false positive; Lịch tháng stuck (fixed f39770cd); ReferenceError «bareTap is not defined» in unstick at 64d62d9b (robot-rt.js:367) — crashed the runner once; guard resumed from ckpt.
4. SEED: the same seed 1508948518 gave a different character on each restart (Hoàng hậu Tăng Diệu Âm / Phi Vương Thư Dao / Phi Thẩm Linh Tê): roulette identity not seeded.
5. SAVE SIZE: save grew from 314k chars @buổi 50 to 2.28M @1575 (~+1.3k/buổi); no quota hit on this slot.

## 5. Suggestions (record only; feature freeze)
Make Tin báo summarise (top N + «Xem hết») with an always-visible ✕; show promotion progress at Xét phẩm; reduce repeated monthly cards.
