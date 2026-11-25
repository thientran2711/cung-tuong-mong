# Player review — flight2-s5 (life flight2-s5d)

Honest scope note: I (the runner AI) drove a Fold 755x1000 life and looked at ~10 screens (every ~50-100 buổi, not every 20); scores rest on those plus the harness log. Not a full playthrough read.

## 1. Summary
- Persona: schemer (drama/intrigue lover), bot=quiet. Origin cnv, road cnv_mat, seed 241163178, Fold.
- Character: Vân Kính Nghi, Cung nữ tam đẳng from age 18 to 25 (never promoted; rank 0). Years: 7 (year 1 to 7). Max rank: Cung nữ tam đẳng.
- Ending: «Xuất cung, mở tiệm nhỏ ở kinh thành» at age 25, 307 lạng, buổi 843. Game-imposed at the age of release (no bot exit pick recorded: exitPick null; last tap was «Xin ở lại»).
- Real minutes of the final life: ~88 (07:05Z to 08:33Z on s5d). Earlier runs s5/s5b/s5c were voided (harness bugs) and do not count.
- Harness: 63f87747 → 4523381f (resume buổi 33) → 5edf09f6 (resume buổi 819); same life. Taps 226, JS clicks 0, stuck 1, dead buttons 63 (all #ktut / #dawn gates = harness false positives), real bugs 1.

## 2. Scores
a. First 15 minutes: 5/10. The Lời dặn tutorial (Tống ma ma) is clear and charming, but dims the whole screen; I could only tap the glowing card. Then a Tâm trạng dialog with «bị Tần ??? làm nhục» (unknown name) confused me.
b. Gameplay loop & pacing: 4/10. Seven years passed with almost no agency: the Tuần lục (weekly book) is the screen I saw most, 11-15 pages per week, page 1 ~70% empty, filler lines («Trời bỗng đổ mưa rào», «dế kêu đêm hè»), the same «Mấy việc vặt trong tuần chưa ghi riêng» twice on one page.
c. Buttons & UI: 5/10. Name labels at the right edge wrap one word per line under the HUD (year 1 and later); hint «Chạm để bỏ qua» overlaps the Tài nghệ tab; toast «… đi vắng, đang ở Trường Môn viện» covers the mood label. BUG: Lệ tháng «Ghi chú» popup repeated «còn 6 lần dùng» ~40× and covered the rows (year 5 tháng bảy, buổi ~600, stuck 15 min); at buổi ~750 the same dialog was fine, so state-dependent.
d. Story & drama: 3/10. As a schemer I got no intrigue hook in 7 years. People appear in the digest I never met («Lão Hỉ Tử», «Tin chờ người sai đi») with nothing to tap. Phương Thanh Ca rose Phi → Tĩnh quý phi with no visible cause for me.
e. Characters & interactions: 4/10. Person page (Thẩm Hân Duyệt) shows Thiện cảm -8, Oán 0, Ghen 99 in red and nothing I can do about it; text «Ngài nhìn … lâu hơn một chút» is unclear (who is Ngài when I am a cung nữ). The «Vì sao» line reads like debug output («tính Kín đáo, Xảo quyết → thiện cảm → ta: thiện cảm +3»), not cổ trang.
f. Choices & fairness: 4/10. Rank stayed 0 and Danh fell 14 → 9 over six years while Bạc grew to 248-307 with no meaningful spend. I could not tell which of my choices mattered. At 25 the dialog offered «Xin ở lại» («Rất vững») but the life ended with Xuất cung anyway: check whether the stay option really works.
g. Rewards, feedback & emotion: 6/10. Empress entrance scene («Hoàng hậu Tiết Bích Lạc giá đáo!») felt grand; ending art is lovely; but numbers changing (Sức +1, Bạc +3) carry little feeling.
h. Mini-games: n/a (the quiet bot did not meet any in what I looked at; none logged).
i. Visuals & sound: 8/10 visuals. Dawn paintings per season (xuân, đông) and the Tuần lục scroll look excellent. Sound not assessed (headless).
j. Co-op: n/a.

## 3. Top 3 / Top 3 / again
- Loved: (1) the four-season dawn paintings; (2) the Hoàng hậu entrance scene; (3) the ending image at the palace gate.
- Hated: (1) a weekly book that is mostly empty/filler and 11-15 pages long; (2) no promotion / no intrigue for a schemer in 7 years; (3) tutorial overlay and hint popups that hide the screen.
- Another life? Maybe: only if early choices clearly changed rank and gave plots to join.

## 4. Bugs
1. REAL: Lệ tháng (#kmrew) «Ghi chú» popup repeats «còn 6 lần dùng» ~40×, covers dialog, 15 min stuck. Evidence on handover: dev/handover/robot/flight2-s5d-stuck1-shot.png + -save.json (c5aeb79a). Owned by M-FIX-2.
2. Name labels wrap one word per line at the right edge and overlap the HUD (Fold).
3. «???» as the offender's name in Tâm trạng («bị Tần ??? làm nhục»).
4. Hint «Chạm để bỏ qua» overlaps the bottom tab bar during scene fades.
5. Check: «Xin ở lại» at age 25 leads to Xuất cung anyway.
6. Harness (not game): #ktut tutorial gate and #dawn layer flagged as dead buttons (63); 4 early runs voided by harness bugs (Tâm trạng dialog re-open, checkpoint/resume, CDN 429).
7. Save size grew to 1.36M chars by buổi 819 (+~55-95k per 50 buổi); watch the storage limit.

## 5. Suggestions (feature freeze: recorded, MAIN files new-feature ones in PARKING_LOT)
- Collapse the weekly book to the pages that changed; skip filler lines.
- Give a schemer a visible plot hook per year; show why a rival rose.
- Tap target on named people in Tuần lục.
- Clarify «Ngài» and rewrite the «Vì sao» line in cổ trang.
