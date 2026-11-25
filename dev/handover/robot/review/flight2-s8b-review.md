# End-of-life review — flight2-s8b (robot player review, ROBOT-PLAYER-REVIEW.md §B)

Basis: the runner (AI) did not watch every buổi live. It read the harness moment log (about 540 lines, 38 every-20-buổi looks, 533 NEW SCREEN lines), the results JSON and log, and looked at the end shot. Scores are a player's impression from those, not a full playthrough. Player quotes stay Vietnamese.

## 1. Summary
- Persona: random (casual newcomer bot), temperament balanced, seed 2026112520, Fold 755x1000, LIVE site, real taps only (JS clicks 0), no origin/road forced.
- Years: 5 game years (turn 49), buổi 740, 1885 taps. Rank at every look: 0 (event «Nhập cung» rank 1 → 0 at the start). Max rank: 0.
- Ending (game-imposed, counts): «Thái phi — Thành Thái phi», age 23; ending screen «Tà dương cung cũ»: the emperor (niên hiệu Khang …) died at 26 and the character became Thái phi, then the life closed with «Chuyển kiếp». Loop exited by itself (code 0), no exit-road tap.
- Real time: 19:31Z to 23:05Z, about 3.5 h (incl. 3 harness restarts and one 2 h task-limit restart; buổi 417 and 507 and 559 resumes).
- Harness: b4b181f8 until buổi 507, then 496b6b66. Same life, same save.
- Totals: 8 bug entries, 4 dead buttons, 0 stuck over 15 min, 1 harness freeze (10 min page.evaluate hang at buổi 65).

## 2. Scores (1-10)
a. First 15 minutes: 6. Fold layout is clear, and the first events («Tết Trung thu · Thi bày mâm cỗ, cắm hoa quế», «Lỡ hẹn», «Kiết lỵ · nhẹ») arrive early. But the first-days goal is not stated; I saw rank go 1 → 0 at «Nhập cung» without a visible reason.
b. Gameplay loop and pacing: 4. 5 years went by with rank 0 at every look (buổi 720, 740 same page «Trường Môn viện · Gió lùa qua song cửa mục»), the same Tin báo / Lịch tháng / «Xét phẩm cuối tháng» loop. As a casual player I would have felt nothing was happening.
c. Buttons and UI: 3. 19 times «Sang ngày mới» tapped 3× but the buổi does not turn while the queue shows only «Tin trong cung buổi này» (Q=1); «Có tin đang chờ» disabled with no dialog on screen (Q=6); the pet dialog «Nhờ thái giám tìm thú nuôi»: cards «Xem Mèo mướp», «Xem Chó nhỏ lông xù», «Xem Chim họa mi» are covered by span.kitb / b.kidn inside #mb (taps land on the overlay child) and «Lui» has no effect; an area-tap on «kemo» button blocked by the harness (appeared under the point).
d. Story and drama: 5. Events and an emperor's death with Thái phi title follow from the court clock, which is a real plot point. But rank 0 for 5 years and no story that was about me.
e. Characters and interactions: 4. Not enough visible reactions at Fold level from the moment log; I cannot judge more.
f. Choices and fairness: 4. «Xét phẩm cuối tháng · Thường tại» repeats and the choices I saw did not change anything visible (no rank or Sủng movement).
g. Rewards, feedback, emotion: 4. A Bổng lộc chest dialog («Nội vụ phủ phát», Bạc +5) opens ON TOP of the end-of-life summary «Tà dương cung cũ» (end.png): a stipend for a life that has just ended, which breaks the moment.
h. Mini-games: not judged (harness plays them; no fun/difficulty read).
i. Visuals and sound: 7 on visuals (chest art, kit frames, items readable on Fold); sound not judged.
j. Co-op: not applicable.

## 3. Top 3 loved / hated / replay
Loved: (1) the Bổng lộc chest with item cards (Vải thô, Than đen, Phấn gạo, Nến mỡ dê) — each item says what it does; (2) the early festival events; (3) a clear end screen with «Chuyển kiếp».
Hated: (1) «Sang ngày mới» that does not turn the buổi; (2) the pet dialog with covered cards and a dead Lui; (3) 5 years at rank 0.
Would I play another life: maybe, if the first year gave me a goal that moved the rank bar. The ending at 23 felt abrupt for a newcomer.

## 4. Bugs (to the bug fast lane; counts from the results JSON)
- «Sang ngày mới» ×19 does not turn the buổi (Q=1: «Tin trong cung buổi này»), ×2 more with Q=3; «Có tin đang chờ» disabled with Q=6 — Q-softlock family (fix button-crawl-fix-5 reported by F #11).
- Pet dialog «Nhờ thái giám tìm thú nuôi»: 3 dead buttons (cards covered by .kitb / .kidn child layers in #mb) + Lui no effect. Same family as F #15's option-card tap point (child elements covering the card centre); shots dead-fold-1795647598627/604976/611344.png, noeffect-1795647626595.png (runner only).
- No-clock loops on «Xét phẩm cuối tháng · Thường tại» and on page «Chung Tú cung · Minh Hòa hiên» (150 taps, no clock step).
- Bổng lộc chest dialog over the ending screen.
- Harness: page.evaluate hang at buổi 65 (10 min freeze), recovered.

## 5. Suggestions (as a player; feature freeze law 18, MAIN files new ones in PARKING_LOT)
- Say in the first year what moves the rank bar (new feature, parking lot).
- Do not issue the monthly stipend dialog after the life is over (bug: ordering of end-of-life vs monthly dialogs).
