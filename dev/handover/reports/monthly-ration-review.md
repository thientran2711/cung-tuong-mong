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

---
# PASS e5d989b — re-review E4r2 (session_01DgYSWpv1jjW7qnecCmZG3c, depth 1, START_CTX ~4 %) · fast-forward sha **a394546** (review/monthly-ration-r6, ancestor = origin/main 09b1bba)
PRIORITY #1 CHECK ('sonphan|rashGive|lxAllergy|toilMkLayer|ration|kitQuick'): OD L762, L1576 (owner 08:25Z ration, law C), PARKING_LOT #5 | main: jstip.js, jtoil.js, j8 TAINT/bestow/IT_ALIAS, jrash rashGive, jtoil kitQuick "Điểm trang nhanh" (new on main 18/11) | review/* review/monthly-ration e5d989b | claims E4f session_01DgYSWpaM3yuPRsuWXP8kqd

## r6 merges (mine)
- e5d989b → origin/main 4cb3a9e: conflicts assemble.py (main's jreveal + jration after jlux), jtoil toilMakeupSvg cache key (main's v[8] + branch's noBl), index.html/sw.js rebuilt.
- → origin/main d219fce: jtoil mirror buttons (main added "Điểm trang nhanh" kitQuick): kept lx note / filtered rows / Mua gấp, quick button shown only when she owns a part (like "Trang điểm").
- **Small fix (reviewer)**: the quick path (also on the dress step, skips the mirror) saved default colours → `lxCapRec` now sets every painted part to a colour she OWNS (fullest box); probe: default son haiduong → owned dotham, missing parts in col.no. Same code fixes NPC preset colours vs their boxes.
- → origin/main 09b1bba (coop-thin-e), generated files rebuilt.

## The 7 fixes of E4r — verified
1. Face never paints a missing part: col.no in toilMkLayer key, toilMkDraw skips brow/lid+shimmer/lip+gloss/blush, toilMakeupSvg skips blush/lip. My shots face-ab Fold/iPad: thiếu son = lips unpainted, thiếu má = no blush, thiếu mày+mắt = lighter. DONE (+ quick-path fix above).
2. Law C flat: my run of dev/measure/ration-lawc.js = worker's table (cov Đoan trang 1 / Kiều diễm 0.67 every rank, top-up 60.0–61.8 % of bổng, spread 1.8 pts; NPC 3.83–3.92 parts, 0 empty months). DONE. Note: holding Kiều diễm every sitting by mua gấp costs ~60 % of bổng at every rank (flat = the law; rush is the dear road, hàng rong is cheaper) — Foreman D may tune buyK/rush later, not a blocker.
3. One allergy: lxAllergy → jrash rashGive (+ taintHit for pha chì); flat Sắc −4 / p.lxRash gone; jrash sonphan hook retired. DONE.
4. One cosmetic family: sonphan-scan PASS on the merged tree (0 givers; left = definition, art row, j98 grade, jecon priceTier, alias). Old save from main with 2 sonphan (one tainted) → 2 lxson0, taint kept, NPCs initialised, 3 monthTicks no error. DONE.
5. NPC order: lxNpcSpend before issue, lxNpcMonth after; test npcIssueFull PASS. DONE.
6. Item text bracket dropped; sinhthan tribute added. DONE.
7. Shots + runs: below. DONE.

## Tests (merged tree; served with charset=utf-8)
monthly-ration.js ALL PASS (also after each merge) · monthly-ration-shots.js ALL PASS Fold + iPad (1st run Fold: 2 FAIL with S turned servant mid-run = test flake, re-run PASS) · sonphan-scan PASS · stipend.js Fold+iPad exit 0 · stipend-oldsave (fresh main save) no errors · makeup-theme 1180 + 755 fail [] · makeup-lux 1180 fail [] · coop-toil-look 29/29 · mg-skip PASS · quickcheck on a394546 PASS (core gates PASS, old save ok; one earlier run had a G3 "tutorial 0 intro pages" float flake, gate re-run clean).
KIT FIRST: kitRows note, kitSwatches rows filtered, kg82Btn, kitQuick, kit option cards / event card — no new CSS. VANPHONG: odds words only, no %, "có rủi ro" = kitRisk word. ONE CORE: numbers from BAL.ration / BAL.pay.

## Shots (LOOKED; local only /home/user/wt/e4r2-out/, nothing uploaded): mirror-noson 755x1000 + 1180x820 (no son row, note, Mua gấp, quick button), face-ab both, cards, askher.

## Notes (not blocking)
- monthly-ration-shots.js should pin a consort life (srv flake).
- An NPC Hoàng hậu can send to borrow son phấn from a low rank (lxNpcMonth asks her at any rank) — maybe limit "ask her" to rank ≤ hers + 1 later.
- Worker shots were committed as JPG under dev/handover/shots/monthly-ration/ (E-common fallback) — owner OD 17/11 ~14:15Z says never commit images; Foreman E to decide/remove.
- Pre-existing on main: j24 "Chắc chắn · thành:" (VANPHONG bans "Chắc chắn"); c18 t1 mk-fit lip layer misplacement (worker's FOR MAIN).
