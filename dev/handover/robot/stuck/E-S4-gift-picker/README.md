# E-S4 gift picker «Biếu quà làm lành» — stuck dumps for Foreman F / MAIN (26/11)
VIỆC «Biếu quà làm lành» (pick a gift for a Quý nhân to make peace): item grid (several items greyed), ✕ at top-right, no «Biếu» button in view; 15+ min without a clock step on BOTH devices.
- greedy-4-ipad-stuck-7-dump.json.gz = R5-greedy-4 ipad (seed 3802600038, bot bold; Đáp ứng Độc Cô Tuyết Dao, 31 y, year 14, buổi ≈1972; harness 8ea10d7e; build bf6dd041+/0281bf7bcef6). Parked 26/11 ~19:15Z after ~1.5 h without progress (earlier the same life cleared an identical picker once after ~15 min).
- speed-3-fold-stuck-1-dump.json.gz = R5-speed-3 fold (seed 3642137656, bot bold; Đáp ứng Cố Tinh Diêu 35 y, year 18, buổi 2659; harness 08a4ff8b); that stall cleared itself after ~20 min.
- Each dump is JSON: {at, url, ls (localStorage incl. hclh-save-v2-1 = the game save), S, coop, Q}. gunzip, then load dump.ls into a fresh context (see ../es4-loinho-tap/probe.js for a loader: «Một mình → Tiếp tục kiếp này»).
- Shots (not in git): /home/user/wt/e-s4-out/shots-E-S4-R5-greedy-4-ipad/stuck-1.png (iPad), shots-E-S4-R5-speed-3-fold/stuck-1.png (Fold).
- Hypothesis (unconfirmed): every item in the grid is not a valid gift (greyed) and ✕ re-opens the same VIỆC, or the harness does not tap ✕ / an enabled item. Seed + resume=1 reproduces the picker within ~2 buổi of the ckpt.
