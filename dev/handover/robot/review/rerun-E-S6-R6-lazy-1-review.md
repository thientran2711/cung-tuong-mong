# R6-lazy-1 — end-of-life review (E-S6 rerun, pf/pt_tang, iPad, bot=sens, seed 2176113731)
Written by the runner session from the harness moment log, the 3 shots I opened (stuck-1, m-look-400, end) — the other shots are only listed in the moment log and the result JSON. It is NOT a live, tap-by-tap play: scores below are provisional and marked where I did not see the screen myself.

## 1. Summary
Persona lazy (low-effort player; the harness has no lazy profile, so the bot is `sens` with the original seed). Origin pf / road pt_tang. Game origin/main 17835565, harness 93812531 → resumed on 69e41729 at buổi 102 (same life). Ending **Lãnh cung — «Phát điên trong lãnh cung»**, age 25, year 6, rank 0 for the whole life, 731 buổi, 4647 real taps, 0 JS clicks. Real time: see job.t in the JSON; about 1 h 50 min of unstick attempts are on one story dialog (two stall episodes). Audit: VALID (imposed ending; the exitPick «Bỏ cuộc» was logged as the only option).

## 2. Scores (1–10, provisional)
a. First 15 minutes — 6. 222 distinct screens appear in the log; the first buổi opens straight into «Có người đến» and «Kính sự phòng» choices with odds bars, understandable. Not judged live.
b. Loop & pacing — 5. 731 buổi without a single rank change (rank 0 from year 1 to the Lãnh cung); the look-shots every 20 buổi (e.g. m-look-400, year 3) show the same night/bedchamber transition scene each time.
c. Buttons & UI — 3. Real findings: (1) the story dialog «Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1» shows text and the Hoàng thượng / Thái hậu / Tể tướng cards but NO option or continue button; the robot tapped/scrolled it 100+ times over two stalls until level-3 unstick (stuck-1.png). A player would be locked in. (2) «Tâm trạng · <person>» dialogs queue duplicate copies (3, 6 and 5 copies for three consorts at year 1 buổi 3): each ✕ pops only one, so ✕ looks dead.
d. Story & drama — 5. The Lãnh cung closing is fitting («Ngươi u uất thành điên dại…»), but the plot beats I saw (Tân quân lập uy: Thái hậu sending prayer beads, Tể tướng sending a box with a warning) were not playable because of the missing buttons.
e. Characters — 5. Not enough sampled; names change between samples of the same dialog (Tể tướng Hạ Tử Do / Hách Cửu Tư in the same scene on two runs — check whether it is a different seed or a naming bug).
f. Choices & fairness — 4. Offers: 49 seen, 2 picked (thăng/tiến cử/phong/khảo/tuyển); rank stayed 0, so the climb never started. Not judged for equal value.
g. Rewards & feedback — 6. The monthly «Bổng lộc tháng giêng» chest (end.png) with items and «Nhận» is clear and pleasant.
h. Mini-games — n/a. Audit notes 1 mini-game quit, not played.
i. Visuals & sound — 7 for art (bedchamber night scene «Đêm không được triệu», chest); sound not evaluated.
j. Co-op — n/a.

## 3. Top 3
Loved: the «Đêm không được triệu / Lãnh cung đêm dài» night scene; the monthly bổng lộc chest card; the cổ trang text of the Lãnh cung ending.
Hated: the option-less «Tân quân lập uy» dialog (hard lock); duplicate «Tâm trạng» dialog copies; a life with no visible progress (rank 0 for 6 years).
Another life? Yes, but only once the lock is fixed.

## 4. Bugs
1. GAME (blocks play, iPad): «Phụ tuyến · Tân quân lập uy · Chương 2 · Hồi 1/1» no reachable option/continue. Repro: this seed (2176113731) on pf/pt_tang, ipad 1180×820, year 1, tháng tám trung tuần (the date on the dialog's book cover). Shot shots-R6-lazy-1/stuck-1.png, stuck-2.png, save + dump beside it. Also hit by R6-greedy-3 (iPad, same dialog, buổi ≈ 133).
2. GAME: person-dialog queue has no dedupe («Tâm trạng · Tần Tào Diệu Âm» ×3 …) — already filed by Foreman B/F as the dialog-dedupe family (button-crawl-fix-2).
3. ODD: Tể tướng name differs between two captures of the same scene (Hạ Tử Do vs Hách Cửu Tư) — verify.

## 5. Suggestions (parking lot, feature freeze)
Show rank progress hints when the robot-like casual player never takes an «offer» (49 offers seen, 2 picked): a nudge that a promotion is on offer.
