# monthly-ration review (E4r) — FAIL a0f3f53
PRIORITY #1 CHECK ('phấn son|sonphan|rash|nổi mẩn|ration'): OD L762, L1577 (owner 08:25Z ration), PL #5 | main: jstip.js, jtoil.js, j8 TAINT/bestow, **jrash.js (existing nổi mẩn system incl. son phấn rash + "Bỏ phấn lạ" act)**, j8 `sonphan` "Son phấn Dương Châu" (still sold/bestowed/gifted) | review/* review/monthly-ration a0f3f53 | claims E4 session_01DgYSWp99V1RuDJRSBs4SyJ
Reviewer session_01DgYSWm8bfGptYDVPCJ69bw, depth 1, START_CTX ~4 %.

## Tests run (worktree a0f3f53, assemble.py rebuild = no diff)
- dev/test/monthly-ration.js: ALL PASS (39) Fold 755x1000@2 + iPad 1180x820@2, no page errors.
- dev/test/stipend.js: exit 0, no errors (ration line shows "1 hộp Son hoa hồng", skim "thiếu Thanh đại" OK).
- makeup-theme.js / makeup-lux.js: started, no output after 20+ min (hung/slow on this box) — re-run on the fix round. quickcheck, coop-toil-look, stipend-oldsave: not run (verdict already FAIL on design; run on re-review).
- Own measures (scripts kept at /home/user/wt/e4r-tools/): rmeasure.js (her ration-only face coverage per rank, 24 months, 3 sittings/month = wk()), rnpc.js + rreal.js (NPCs over 12 real monthTicks, __bot).

## Measures
Her ration only, share of sittings that reach the aimed level (24 months):
| rank | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 |
|---|---|---|---|---|---|---|---|---|
| Đoan trang | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 | 1.00 |
| Kiều diễm | 0.04 | 0.04 | 0.04 | 0.21 | 0.21 | 0.38 | 0.38 | 0.38 |
Silver to top up Kiều diễm every sitting with Thường boxes (8 bạc / 3 lần): rank 0 ≈ 32 bạc/month = 80 % of pay 40; rank 7 ≈ 24 bạc = 9 % of pay 280.
NPCs, real month loop: in band (they buy with pay; all keep 2–4 parts). Without silver, ration boxes are spent in the same tick they arrive (lxNpcMonth runs after the issue) → low-rank NPCs fall to 0 parts.

## FAIL — numbered fixes
1. **Face shows a colour she does not own** (brief point 7 = FAIL). iPad mirror shot: Son môi missing, the portrait still wears red lips (default `haiduong`). Missing parts must not be painted: e.g. `col.no=[parts]` (or null part) honoured by toilMkLayer/toilMkDraw (skip lips / blush / lids / brows layer, part in the cache key), for her mirror preview, the day look, and NPC faces (lxNpcCap). Get the makeup owner to do the jtoil draw part if needed.
2. **Balance law C broken** (OD 08:25Z (C): high ranks must feel as tight as low ranks). Table above: Kiều diễm coverage 0.04 → 0.38 by rank, and top-up cost 80 % → 9 % of pay. Report's claim "≈ ½ at every rank" is not what the numbers give. Make the slack flat: e.g. `uses` flat across tiers (tier = finer look / lux, not more lần), and/or higher ranks are expected to wear a finer tier (a Thường box at rank ≥ N reads thiếu lễ / caps lower), and/or rush/shop price by her rank. Target: ration-only coverage per level within ±0.05 across ranks, and top-up silver as share of pay within ±10 points. Add a measure script to dev/measure and its table to the report.
3. **PRIORITY #1 / reuse: a second allergy system.** jrash.js already owns "nổi mẩn" (timed p.rash, overlay picture, Thái y heal, two-way act "Bỏ phấn lạ", tainted son phấn → rash). lxAllergy adds a flat Sắc −4 + p.lxRash with no picture/duration/heal. Route a tainted lx box (chi / ngua) and the ordinary RASH.cos chance through `rashGive` (same as sonphan in jrash useItem hook). Also the log prints `Sắc ${A.sac}` (−4) even for pha chì where the effect is chiSac −1 / Sức −3 → text ≠ effect (ONE CORE).
4. **Two cosmetic families (LUẬT SỬA CẢ NHÓM).** `sonphan` "Son phấn Dương Châu" is still in SHOP_ALL, BEST.night, BEST.dau, j24 gift, jts gifts/tags, jcui, jlux, jrash, TAINT.chi — the player can buy/receive "son phấn" that never feeds the mirror. Fold it in (map sonphan to an lx box / retire it from every giver with a scan script + before/after table; old-save `sonphan` pieces converted or kept as a sellable keepsake with clear text).
5. NPC order: spend the past month BEFORE the new issue (or spend at the sitting), so an issued box is not used up the moment it arrives.
6. Small: item text "Hộp phấn mắt dùng khi điểm trang (phấn mắt)" repeats the part — drop the bracket where it equals the label; `bestow(S,"sinhthan")` (her birthday) has no tribute chance while `birthday` does — check intended keys.
7. Shots: Fold mirror shot is covered by the item-gain reveal; retake Fold 755x1000@2 + iPad 1180x820@2 of mirror (owned colours only, missing part NOT painted), ration chest line, borrow / beg / steal option cards and the "Sang mượn son phấn" event card; run makeup-theme, makeup-lux, coop-toil-look (host + guest), stipend-oldsave, quickcheck.

OK as built (no change needed): KIT FIRST (kitRows note, kitSwatches rows filtered, kg82Btn, Q event card with kitRows — no new CSS); VANPHONG (odds via word(), no %, "lần dùng"); BAL.ration holds the numbers (clamps 5/95 follow the j2 chest convention); NPC two-way roads exist; jstip skim/down map covers boxes.

Shots: local only (CDN upload refused on account E, 401) — /home/user/wt/e4r-out/mr/ (from the E4 test run on this box). Nothing uploaded, nothing to wipe.
