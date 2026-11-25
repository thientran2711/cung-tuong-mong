# flight2-1R end-of-life review (real-tap harness 10fbc51c, LIVE, Fold 755x1000)
## 1. Summary
Persona: cnv_mat skilled (core gamer), village girl «Chân Sơ Ảnh» (Thôn nữ làng Hạ Trang), seed 3839386041 (= s1d rerun). Road: cnv / cnv_mat. 2 years, max rank 0 (never selected into the palace), ending «Làm người ở nhà lý trưởng» (debt-servant, game-imposed, type death, age 19, buổi 157). Real taps 770, JS clicks 0, dead buttons 0, stuck 0, exitPick none. robot-audit.js: VALID (offers 184 seen / 9 picked). Real minutes ≈ 20.
## 2. Scores
a. First 15 min 7/10 — the origin choice «Vào cung ngay / Ở quê chờ lệnh tuyển» is clear; HUD (stats, Nợ nhà, countdown «Ngày tuyển còn n tháng») readable.
b. Gameplay loop & pacing 4/10 — buổi 80 shows the same 3 action cards; little change over 157 buổi; the debt only rises.
c. Buttons & UI 7/10 — 0 dead buttons in 770 taps; two harness «no close» flags were false positives (choice dialog and mini-game intro with their own primary buttons).
d. Story & drama 5/10 — year-2 sequence (Yến đầy tháng hoàng tử, Sứ đoàn vào triều, Chủ nợ đến nhà) is atmospheric but unconnected to my choices.
e. Characters & interactions 4/10 — household of 1–3 people; little reaction to what I did.
f. Choices & fairness 4/10 — «Chủ nợ đến nhà» offers three options that all end the life; with rank 0 and debt 93 no winning line was visible (law 2/3 check needed).
g. Rewards, feedback & emotion 5/10 — odds words (Rất vững) and costs/gains shown per card; ending art strong but mismatched to a non-death text.
h. Mini-games 6/10 — «Chạm dấu» intro rules clear; played to the end by the harness.
i. Visuals & sound 8/10 — art consistent, Fold layout clean.
j. Co-op n/a.
## 3. Loved: (1) cổ trang art and ending scene; (2) clear card costs/gains/odds; (3) zero dead buttons. Hated: (1) debt never repaid whatever I did; (2) forced all-losing «Chủ nợ» choice; (3) repetitive Hành sự cards. Another life: yes, but only with another origin (cnv_mat felt on rails).
## 4. Bugs
- [harness/game false positive] «dialog scrolled to the end has no close / next button» on #modal «Thân phận kiếp này» and .kfoc (mini-game intro «Luật chơi · Chạm dấu»): buttons exist (options / «Sẵn sàng bắt đầu chơi»). Shots: noclose-1795611056876.png, noclose-1795611445720.png (container /home/user/wt/rt1r-out/shots-flight2-1R/, not in git). Same family as #kmrew «Nhận».
- [game wording] «Thêu khăn» CẦN chip repeats the action sentence instead of naming the missing item (buổi 80).
- [game design to check] «Chủ nợ đến nhà»: every option ends the life at rank 0 (laws 2/3).
## 5. Suggestions (parking lot): let early-village roads earn bạc faster than debt grows; show the debt countdown before the creditor event.
