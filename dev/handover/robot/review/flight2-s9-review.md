# Player review — flight2-s9 (thd / thd_tho, persona CAUTIOUS = careful planner, Fold 755x1000, LIVE github.io)
Honest scope: robot real taps; I (runner AI) looked at ~14 screenshots (one every ~15–30 min + stuck/ending shots) and the harness numbers — not every buổi. Scores are provisional; areas I did not see are marked.

## 1. Summary
Persona cautious/careful planner · origin thd, road thd_tho · heroine Dư Tố Tuyết, 19 → 23 · game year 1–5 · max rank Thường tại (rank 1, from Đáp ứng) · ending «Xuất gia làm ni cô» (age 23, year 5, buổi 707) · ≈5h46 real time (most of it lost to harness stalls on dialogs; clean play ≈ 3–4 buổi/min) · 29 harness bugs, 5 stuck, 0 JS clicks.

## 2. Scores (1–10)
- a. First 15 minutes: 5/10. The first screen I saw was already a result card «Trong cung vừa qua» (ĐƯỢC / MẤT / KÈM) after «Xin xăm»: great structure, but 3 gains/losses plus a 10-line «ghen −1 / oán +33» tail overload a first-timer (m001). The mini-game «Tranh sủng: Giữ hơi theo giai điệu» shows no instruction at all.
- b. Gameplay loop & pacing: 5/10. Calendar + festivals (Vu Lan, Tết Trung thu) give goals, each buổi has a clear action tab bar. But the loop is clogged by repeated small dialogs: «Tin báo» (94–138 unread), «Tin chờ người sai đi», «Người được sai đi (có mới)», Ân thưởng; the bot (and a player) answers the same cards again and again and the clock does not move (1 buổi/min for long stretches).
- c. Buttons & UI: 3/10. (1) «Tin báo» again with no visible ✕/Đóng (also seen in s1d). (2) Mật báo «Kính sự phòng báo tin» with ONE option card that does not look like a button; its thumbnail opens a full-screen zoom with no close hint (tap anywhere). (3) «Sang ngày mới» DISABLED or not turning with no dialog on screen while the dialog queue is non-empty (Q=1/6/7; at least 4 times) = I would be stuck with nothing to tap. (4) 4 frames without close/next (#kmrew, .mapsc, .kmov, .kfoc). (5) «Tâm trạng · Ta» «Lui» has no effect. (6) The green title ribbon (e.g. «Diệu thủ hồi xuân») overprints my own rank/name label on every stage screen.
- d. Story & drama: 6/10. Beats are charming («Hoàng thượng đổi ý, ngự giá đang sang cung ta. Tắm gội trang điểm cho kịp!»; Tết Trung thu lantern contest) and the news shows a living court (ghét ra mặt, khen ăn vận giản dị, gửi chút bạc đáp lễ). But none of the 14 visible news lines in two Tin báo screens was about ME; a «Nguy hiểm chung» number rises to 86–93 in red with no explanation.
- e. Characters & interactions: 6/10. People act on their own (rivals whisper, mistress/Thái y/eunuch appear with portraits), my maid Hàn Bội Nhi stands beside me; but reactions to what I did are not visible to me.
- f. Choices & fairness: 7/10. Option cards with odds chips + Tốn / Được / Mất blocks (Tết Trung thu: «Ghi tên dự thi khéo tay — Mong manh — Được: đoạt giải, được để mắt; Mất: hao sức, chuốc lòng ghen» vs «Không dự — Rất vững») let a careful planner decide in seconds — the best part of the UI. The dense paragraph above the options is not needed.
- g. Rewards, feedback & emotion: 5/10. Result cards say clearly what I got/lost, but Sủng sat at 0 for ~4 game years (buổi 579–619) with no hint how to earn it; promotion to Thường tại was not announced on screen where I looked.
- h. Mini-games: 3/10 (seen once): beautiful stage, no instruction, unexplained «3/10» and «◔ 4» chips.
- i. Visuals & sound: 8/10 visuals (rooms, window light, costumes, moonlit maple stage are the best screens of the round); sound not heard (headless).
- j. Co-op: n/a.

## 3. Top 3 loved / hated
Loved: the Tốn/Được/Mất option cards with odds chips · the lavish room art and portraits · the festival calendar with rewards and days left.
Hated: the dialog pile-up (Tin báo / Tin chờ người sai đi / Kính sự phòng) that stops the day · «Sang ngày mới» dead with nothing on screen · numbers I cannot act on (Nguy hiểm chung 86, Sủng 0).
Would I play another life? Yes for the story/festivals, but I would stop after the 3rd news pile-up unless the queue is merged and every dialog has a ✕.

## 4. BUGS (repro: save/shots in the box /home/user/wt/outS9; fixer folders on the handover branch)
1. «Sang ngày mới» / «Sang buổi» disabled or no-turn with no dialog on screen, dialog queue Q=1/6/7 (flight2-s9-noturn/, 324ce4a9; shots loop-19..30).
2. JS error `Cannot read properties of undefined (reading 'off')` in chooseM (stack in flight2-s9.json).
3. Dialog queue holds 7 copies of «Tin báo»; each ✕ pops one.
4. Frames without close/next: #kmrew, .mapsc, .kmov, .kfoc; «Tin báo» no visible ✕; «Tâm trạng · Ta» «Lui» no effect.
5. Option thumbnail inside a Mật báo option opens #kpzoom (full-screen, no hint) — harness-side fixed, but a real player can open it by accident.
6. Title ribbon overprints the player's name/rank label on stage screens.
7. Save size ≈ +2.2k chars/buổi (1.46M at buổi 679) → quota ≈5.2M at ≈buổi 2500 (known save-growth family).

## 5. Suggestions (player view; features → PARKING_LOT)
- Merge repeated cards («Tin báo ×7») into one, with a ✕ on every dialog; show «Tin liên quan đến ta» first.
- Add one line of instruction to mini-games; explain «Nguy hiểm chung» and how to raise Sủng.
