# PLAYER REVIEW — E-S1-R1-lover-4-3774992119 (thd / thd_tho, iPad, persona lover = romance player)

PRIORITY #1 CHECK: ROBOT-PLAYER-REVIEW.md §B; moments in rerun-E-S1-E-S1-R1-lover-4-3774992119-moments.md. Scope: the runner (an AI driving a real-tap harness) looked at ~6 shots (origin card, one night scene, ending) plus the full harness log/bug table, not every buổi.

## 1. Summary
- Persona lover (harness `sens`), origin thd · road thd_tho, seed 3774992119, iPad 1180x820, real taps, jsClicks 0.
- Years 5 (age ~20→24), 663 buổi, 1416 real taps, max rank 0, ending «Xuất cung — Xuất cung về quê» (game-imposed: Hoàng thượng Khang Định dies at 25, the new emperor pardons childless consorts; last bot tap was «Ta biết rồi», not an exit choice; robot-audit VALID, exitPick none).
- ~4.5 h wall clock (started ~19:50Z 25/11 on Build 0dc642a71578; resumed once at buổi 471 on Build 13f84c70f2a3 = 5e013076). Harness b4b181f8 (READY).

## 2. Scores (1–10)
a. First 15 minutes — 6. A richly designed origin card (Vu Nhu Tắc, thầy đồ nghèo, «Thân phận hiểm», stats, road) and Tuyển chọn cards with odds words; but the road list hides behind «Kéo xuống» and the first screens are 5 pop-ups in a row.
b. Gameplay loop & pacing — 4. 663 buổi for 5 years: repetitive info dialogs (Tin báo, Lịch tháng, Tâm trạng); the night scene «Đêm không được triệu» is lovely once, but nothing I can do about it as a lover.
c. Buttons & UI — 3. On the old builds: «Sang ngày mới» no-turn (28×), «Có tin đang chờ · xo» disabled with 6–13 hidden dialogs (×3), a clipped no-way-out card; «Lui» on «Chương 4 · Danh hiệu Tài nữ» had no effect (dead button). After the resume on Build 13f84c70f2a3 (buổi 471→663) NO softlock line appeared.
d. Story & drama — 7. The ending is a real story beat (emperor dies at 25, heir enthroned, amnesty for childless consorts) and the text is cổ trang and coherent — the best moment of the life.
e. Characters & interactions — 5. Named people (Phùng Vân Khởi, Y Hoan, Đáp ứng Đào…) appear but a romance player gets no romance thread in 5 years.
f. Choices & fairness — 6. Offers show «Tốn»/«Được» and odds words (Rất vững…). «Đổi thân phận (-100 Phúc duyên)» is a cost-only side option, fair as an opt-in.
g. Rewards, feedback & emotion — 5. Stipend dialogs list items; the ending is told in text but the stipend dialog pops over it.
h. Mini-games — n/a (none entered: offers 120 / picked 9).
i. Visuals & sound — 8. Origin art, bamboo school painting, night bedroom: outstanding. Sound not testable.
j. Co-op — n/a.

## 3. Top 3 loved · top 3 hated · replay?
Loved: the origin card art/text; the night «Đêm không được triệu»; the emperor-dies ending.
Hated: the pop-up that covers the end card; no way to play a romance as a lover; dialogs repeating.
Replay another life? Yes if the opening is shorter — the ending made it feel worth it.

## 4. BUGS found (shots/saves in the runner out dir; shots not in git)
1. GAME — popup over the END card, 2nd repro (end.png): «Bổng lộc tháng tư» opens over «KIẾP Lòng son mở cửa / XUẤT CUNG» on Build 13f84c70f2a3. Fast lane.
2. GAME (old builds, fixed?) — «Sang ngày mới» no-turn ×28; «Có tin đang chờ · xo» disabled ×3 (hidden queue 6–13). None after the resume on Build 13f84c70f2a3.
3. GAME — «Lui» on «Chương 4 · Danh hiệu Tài nữ» no effect (dead button, noeffect shot).
4. GAME — 1 stuck loop «Trường Môn viện · Gió lùa qua song cửa mục» (150 taps no clock step).

## 5. Suggestions (player view; feature freeze, MAIN files new-feature ones)
- Let the stipend dialog wait until the end card is closed. · Give a lover persona a visible way to seek the emperor on a night with no summons. · Shorten the first five pop-ups.
