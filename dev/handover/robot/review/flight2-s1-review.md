# Player review — flight2-s1 (cnv / cnv_mat, persona SKILLED = core gamer, Fold 755x1000, LIVE)
Honest scope: the robot taps the real UI; I (the runner AI) looked at ~7 screenshots (one every ~15 min + two stuck/dead shots) and at the harness numbers, not at every buổi. Scores are provisional and based on what I actually saw.

## 1. Summary
Persona skilled/core gamer · origin cnv, road cnv_mat · heroine Lôi Linh Vận (cung nữ tam đẳng → «Đáp ứng» in dialogs) · ~400 buổi, game year 3–4, age 22 · max rank 0–1 · ending «Được ban hôn» (age 22, buổi 400, ≈08:55Z) · ≈2h55 real time incl. 3 voided harness restarts · 2588 real taps, 0 JS clicks.

## 2. Scores (1–10)
- a. First 15 minutes: 6/10. HUD (Sắc/Tài/Tâm cơ/Đức/Danh/Chủ tin/Bạc/Sức), a bottom tab bar and «Sang buổi» are clear. But the first screenshot already had a person-mood dialog («Tâm trạng · Quý phi …») on top of my own screen with the title naming another person, so I did not know whose mood I was reading (m000/m001).
- b. Gameplay loop & pacing: 6/10. ~6 buổi/min at robot speed, four buổi a day, calendar with festival previews (Vu Lan) gives goals (m004, DELIGHTED). Repetition is the weak point: the «Tin báo» list (41 → 77 items) repeats one template «Nội vụ phủ bớt xén bổng lộc của X (Y có oán, sai Nội vụ phủ chèn ép); nàng ta đành nhịn» ×5 per screen (m005, m007) — BORED.
- c. Buttons & UI: 4/10. (1) «Tin báo» dialog has no visible ✕/Đóng on its first screen; the bot sat 15 min on it (stuck-1) — a frame that cannot be closed visibly. (2) On Fold the right icon column (4 round icons with red dots) covers the «Ân sủng» panel rows (Tai m…, Ngài…, Côn…, Lượn…) and clips the stage title «Tích C… viện» (m000, m003). (3) Figure name labels bottom-right wrap into stacked overlapping words (Cung nữ / Hoàng L… / Phú Sát Dao Quang) in every screenshot. (4) Day-part splash «Buổi trưa» is drawn over the HUD numbers while a dialog is open (m002). (5) #dawn story-beat layer covers the whole HUD (53 «dead button» entries, all this one cause, fixed in the harness as «a layer, not a dead button» — but a real player cannot tap the HUD during it either; may be by design).
- d. Story & drama: 5/10. Mistress promotions («Quý phi» → «Hoàng quý phi» Trình Linh Lung, later a different mistress «Tần Nghiêm Lan Ẩm») happen without a card I noticed; the news later says «Quý nhân Trình Linh Lung được tấn phong…» although she was already Hoàng quý phi eight months earlier (m004 vs m005) — either demotion without explanation or name reuse. Heroine is called «Đáp ứng» in the news dialog but «Cung nữ tam đẳng» in the HUD at the same time.
- e. Characters & interactions: 5/10 (limited evidence). News shows people acting (gift-giving, gossip, Nội vụ phủ squeezing salaries) which feels alive; but lines are generic and none addressed me.
- f. Choices & fairness: not enough evidence (the bot chose by its own scoring; I did not read option cards).
- g. Rewards, feedback & emotion: 5/10. A result toast «Tạm ngưng — Thỉnh tranh nhân vật: Tạm ngưng. ta không được gì, cũng không mất gì» left me not knowing what I had asked for (m003).
- h. Mini-games: not seen in my sampled screenshots.
- i. Visuals & sound: 7/10 visuals (rooms and costumes are beautiful, calendar and festival tooltip are polished); sound not heard (headless).
- j. Co-op: n/a.

## 3. Top 3 loved / hated
Loved: the festival calendar with Lễ Vu Lan preview (rewards, dress colours, days left) · the rooms/costume art · the clear HUD numbers.
Hated: «Tin báo» wall of 41–77 near-identical lines with no close button visible · overlapping labels/icons on Fold (Ân sủng panel, figure names) · moods/names of other people appearing as the first thing I see (mood card of the mistress).
Would I play another life? Yes, as a core gamer I want to see where the climb leads; but I would quit the news screen after the second visit.

## 4. BUGS (repro/shot/save in the box; sizes rule: not in git)
1. «Tin báo» dialog without visible close, Fold, Tư trang tab, year 3 tháng sáu (stuck-1; fixed in harness by scrolling; GAME question open). Files: flight2-s1d-stuck1-files/ (a08f94fa).
2. Fold right icon column covers the «Ân sủng» panel + clips «Tích Cẩn viên» title (m003).
3. Figure name labels overlap (every screenshot).
4. Rank word mismatch: «Đáp ứng» vs «Cung nữ tam đẳng» on the same screen; Trình Linh Lung «Hoàng quý phi» → «Quý nhân … được tấn phong».
5. Save size grows ≈ +2.4k chars/buổi in the first 400 buổi (963k at buổi 400): will hit the ≈5.2M localStorage quota (save-quota family, known).
6. Harness: resume from a ckpt written before the ending replays the end (my void run). Needs a rule «if ckpt older than status done, do not resume».

## 5. Suggestions (player view; new features go to PARKING_LOT)
- Group/summarise the «Tin báo» list («5 bớt xén bổng lộc» as one line), and put a ✕ on every dialog.
- Show a one-line rank-change card for my mistress when her rank changes.
