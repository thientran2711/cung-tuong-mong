# flight2-s4 END-OF-LIFE REVIEW (player review per dev/handover/briefs/ROBOT-PLAYER-REVIEW.md §B)
Runner: sonnet life runner slot 4. Honest limit: the moment log only existed from harness 95718760 (year 8, buổi 1130); years 1-7 ran under earlier shas and I looked at shots only on stuck/bug events. Scores below are from what I really saw (stuck shots, 12 every-20-buổi looks, the dump files), not invented for the missing years. No harness bug counted as a game finding unless noted.

## 1. Summary
- Persona: cautious (careful planner), bot=cautious, iPad 1180x820, seed 2866901044, origin cnv, road cnv_mat (cung nữ of a rival consort), life name flight2-s4d-cnv_mat-cautious (s4, s4b, s4c voided by harness bugs).
- Years: 12 (game year 1 to 12), age 18 to 30, 1570 buổi, 41,220 harness steps, 1210 real taps counted by the harness, ~7 h real time (05:58Z to 12:58Z including 3 voided starts, harness switches by ckpt+resume).
- Max rank: 0 (Cung nữ) for the WHOLE life. Ending: «Xuất cung tuổi 30» (game-imposed age limit for cung nữ; exitPick null, the age-25 «Xin ở lại» was taken). VALID per the 25/11 rules (real taps, no cap, ended by the game).
- Real counts: dead buttons 72 (70 = #dawn div.kne.kne-beat story-beat layer logged before 4523381f, likely false positives), stuck 0, game bugs 4 (see §4).

## 2. Scores (1-10)
a. First 15 minutes: 6. Title → solo → new life → roulette → identity worked, but the first minutes I could not use for real: a person «Tâm trạng» dialog without backdrop made the first three starts stuck (harness, not scored against the game); the dawn screen's buttons were reported covered by a story-beat layer (kne-beat).
b. Gameplay loop & pacing: 3. Years 8-11 are the same Hầu hạ / Nghỉ ngơi cards on Tích Cần viện every buổi (shots m-look-1140…1540: same 2-4 chores, only the mistress changes). Nothing is new for ~1000 buổi; the only variety is the big ceremony dialogs (Đại tuyển tú nữ, Đại lễ tế Giao, Thu săn, Yến đầy tháng).
c. Buttons & UI: 4. Sang buổi taps that do not turn the buổi twice (y8, y11); a hint popup (#kpop) that cannot be dismissed (y11); but the kit looks consistent and the tab strip is clear. Cards say «Cần 1 khắc (còn 4)» clearly.
d. Story & drama: 4. Big court events fire (Đổi chủ, Đại án vu cổ, Tuyển tú) but the cung nữ barely participates; mistress changed (Tân Cố Yên La → Hoàng hậu Đường Tư Dao) and nothing in my chores changed. «Ta biết thêm 2-4 điều» pops are the only story feedback.
e. Characters & interactions: 5. People exist and move («đang ở Càn Ninh cung», «đi vắng»), the roster changes (Ở đây còn 2 → 21 người), figure art is good. But Hàn Cẩm Tâm, Quản sự ma ma Đồng Tương Quân… never react to what I did over years.
f. Choices & fairness: 3. At age 25 the dialog gives «Xuất cung về quê (kết thúc kiếp)» vs «Xin ở lại (Chủ tin dưới 60: chủ không giữ · ở thêm đến 30)»; with Chủ tin 12 the stay is a 5-year dead end — no promotion road is visible to a cung nữ with low Chủ tin (tiến cử needs Chủ tin ≥35, Hoàng thượng roads need S.nt which chores do not raise). Equal-value / gain-and-loss laws (2, 3) look broken for this state. Sức drained to 0-4/100 in y11 (cards cost Sức -5 each) so «Dâng trà» was locked; no clear way to see why.
g. Rewards, feedback & emotion: 4. Chủ tin +1 and Công lao +0.5 per chore are shown, but 12 years of Công lao 10/10-13/10 never turned into a rank. Wins are small and invisible.
h. Mini-games: n/a (none offered to the cung nữ in the part I watched; harness plays them to the end from 95718760 on).
i. Visuals & sound: 8. Art is lovely and consistent (palace, figures, rank outfits, season lighting). Sound not heard.
j. Co-op: n/a (solo).

## 3. TOP 3 loved / hated; replay?
- Loved: (1) the Tích Cần viện scene art and figures; (2) the cổ trang wording on cards and the season/weather chip; (3) the big ceremony dialogs with Ta biết thêm… hints.
- Hated: (1) «Sang buổi» silently doing nothing (twice) with a hidden queued dialog; (2) 8+ years at rank 0 with no visible way up; (3) the same two chores for 1000 buổi.
- Would I play another life? As a careful player: only with a different origin; this road felt like a waiting room.

## 4. BUGS (each with repro, shot, save)
1. [game] «Sang buổi» tapped 150× does not turn the buổi, year 8 tháng 1 (turn 93, buổi chiều, Tích Cần viện, Sức 100/100, Bạc 3). Evidence: handover b7b20b20 dev/handover/robot/flight2-s4d-loop1/ (save, dump, bug entry); recovered only by the unstick ladder.
2. [game] same symptom year 11 tháng sáu (turn 123, Sức 0/100, Chủ tin 87) with dialog queue Q=1 «Có người đến» not shown. Evidence: handover 37cfc029 dev/handover/robot/flight2-s4d-loop3/.
3. [game?] #kpop hint «Lĩnh đồ ở Nội vụ phủ · Đã làm hôm nay — mai chia bài mới» stays open after 3 real taps (y11). Shot on the runner box info-noeffect-1795610247707.png.
4. [game design] cung nữ road dead end: rank 0 for 12 years, see §2f and dev/handover/robot/flight2-s4d-dead.md (handover 81c58047).
5. [harness, fixed by the fixers] person «Tâm trạng» dialog without backdrop (s4/s4b), poisoned save with thousands of queued dialogs (s4b), #dawn kne-beat cover, no-clock tab ping-pong.
Also: save grows ~+1.7k chars/buổi → 2.51M chars at buổi 1560 (fixture handover 0941c3ac dev/handover/fixtures/save-growth/s4d-cnv-y11-save.json). Renderer memory grew to ~1.5 GB at buổi 590 (rss log in the JSON).

## 5. Suggestions (as a player; law 18 freeze → MAIN files them in PARKING_LOT)
- Give a low-Chủ tin cung nữ ONE visible way up or a clear warning at age 25 that staying means no rank; show what raises «Hoàng thượng để ý».
- Show a «hôm nay chưa làm gì» hint when Sang buổi is blocked by a hidden dialog; never swallow the tap.
- Vary the chore cards by season/mistress so years 8-11 are not identical.
