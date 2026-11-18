# monthly-ration (PARKING LOT #5 "phấn son theo lệ") — E4 report
PRIORITY #1 CHECK ('phần lệ|ration|phấn son theo lệ|toil.box'): OD 3 (L762 luxury system, L1577 owner 08:25Z ration spec, PL #5) | ledger 0 | claims 0 (only this row) | main 15 — REUSED: jstip.js (monthly goods per rank, skimming, NPC rule, chest), jtoil.js (mirror palette TOIL_COL, levels), j8 TAINT/bestow/SHOP_ALL, j2 talkOpts, jitd item detail | review/* 0. BAL.toil.box did not exist (was a proposal) → BAL.ration.
START_CTX ~3 % (depth 1).

**Branch** review/monthly-ration **sha a0f3f53** (from origin/main 94a9375). One new module `dev/build/jration.js` (after jlux in assemble.py) + 4 hook lines in jtoil.js + jstip goods drop `sonphan` (replaced by cosmetic boxes).

## What
1. **Items** (into IT, one bag p.inv): 16 = 4 palette parts (mày / son / má / phấn mắt = the mirror's 4 rows) × 4 tiers (Thường…Tuyệt phẩm), names from item-list-ration.md (Than liễu…Loa tử đại; Son sáp…Son thiên chu cống; Yên chi giấy…Yên chi tiến cống; Phấn gạo…Phấn trân châu ngự). Each piece in the bag carries colour `c` (a TOIL_COL key) + uses left `u`. Item detail shows "màu X: còn N lần dùng".
2. **Ration**: via `stipList` (so rank text, chest reveal, skimming one tier down / missing, NPCs all reuse jstip): BAL.ration.n = 2 boxes/month every rank, tier by rank [0,0,0,1,1,2,2,2] (higher = finer, not more — balance law C); parts rotate by month (mày+son / má+mắt); colour "as issued" (hash). Lãnh cung 1 Thường box. First sight (new life / old save): one issue so the mirror is never empty.
3. **Use**: one makeup a day unchanged. Mirror shows ONLY owned colours (kitSwatches rows filtered — no kit change); presets only if all 4 colours owned. Missing part → kitRows note (Thiếu / Dung nhan đẹp nhất … / Đường kiếm) and the face is capped (BAL.ration.cap by parts owned: 4 Khuynh thành, 3 Kiều diễm, 1–2 Đoan trang, 0 mặt mộc only — "Trang điểm" button hidden). Spend per part per sitting BAL.ration.use (Vụng/Đoan trang 1, Kiều diễm/Khuynh thành 2, +1 Kiểu cầu kỳ); box removed when empty. Bot/auto path the same (toilAuto).
4. **Roads**: mua gấp at the mirror (Nội vụ phủ, Thường box × rush 1.5); hàng rong carries tier 0–1; **Mượn son phấn** on a rival visit (odds = base + thiện cảm + nết + ghen + whim of the day; half her box); **Xin son phấn** Hoàng hậu / Thái hậu (jveil odds shape, 2-month cooldown, fail costs favour); **Lấy trộm son phấn** at a rival's chest (plant odds; caught: Danh -4, Đức -2, oán +10, bổng khất 1 month). All odds as ladder words.
5. **NPCs, two-way** (month tick, after their goods): spend BAL.ration.npc.use per part; out → buy / borrow from a friend / ask HER (event card: chia nửa / khéo từ chối) / steal when jealous or Xảo quyệt (from her too: she always gets a notice; who did it only via newsAdd/Tai mắt). NPC face capped by their boxes (toilNpc hook).
6. **Poison**: TAINT.chi now also on cosmetics; new TAINT.ngua "trộn bột ngứa" (needs botngua) → allergy at the sitting (Sắc -4) — existing taint/plant/gift/Thái y roads.
7. **Tribute**: bestow(promo/son/contest/birthday/night) may add a Tuyệt phẩm cosmetic (e.g. Loa tử đại) from Hoàng thượng; others' ghen +3. NPCs the same.
8. `BAL.ration.on=false` = old behaviour (full palette, nothing spent).

## Tests
- `node dev/test/monthly-ration.js <worktree> <out>` (serves in-process): **ALL PASS** Fold 755x1000@2 + iPad 1180x820@2 — items/names/art placeholder, init (her + NPCs), ration lines by rank, cold, goods with c/u, skim down map, spend by level + bold, cap 3 parts→Kiều diễm, 0→mặt mộc, rush buy, NPC cap+spend, borrow/steal/beg cards (no %, no "lượt"), caught penalty, borrow gives, tribute, taint + allergy, old-save fix, off switch, mirror rows = owned colours, no h-scroll, no page errors.
- `bash dev/tools/quickcheck.sh` on a0f3f53: **QUICKCHECK PASS** (core gates PASS incl. one-core-guard; old save ok; perf new/live render 187/214, tab 360/347, buổi 872/819 ms).
- NOT run (context): dev/test/stipend.js, makeup-theme/lux, coop-toil-look → reviewer please run (jstip goods + jtoil hooks touched).

## Shots: CDN cdn_sync refused (HTTP 401) and the img-allowlist hook (rightly) refuses images in git → shots kept on this box at /home/user/wt/e4-shots/ (shared /home/user/wt, readable by the reviewer): mirror-1180x820 (Son môi missing: note + only owned colours + Mua gấp), mirror-rush-1180x820 / -755x1000 (after rush). LOOKED: iPad clean; Fold mirror shot is covered by the kit item-gain reveal triggered by the test's bag edits (not a bug: the same reveal any gain shows) — reviewer may retake on Fold.

## Known limits / for review
- A missing part still RENDERS its default colour on the face layer (the cap lowers the level; hiding a part's layer needs jtoil TOIL_MKS work — makeup owner).
- Servants (maids/eunuchs) have no bag in the game model: their lệ stays the existing wage (BAL.wage) — no cosmetics for servants.
- Balance numbers are first values (coverage of a plain-every-day month ≈ ½ at every rank by design); Foreman D bot measure per rank still needed (makeup days per month, silver slack).

## NEW ICONS for Foreman C (placeholder now = item-sonphan picture at the tier's grade frame; listed in CTM_MISSING_PICS kind "item")
img/item-<key>.webp (+ item512): lxmay0 Than liễu, lxmay1 Thanh đại, lxmay2 Họa mi đại, lxmay3 Loa tử đại · lxson0 Son sáp, lxson1 Son hoa hồng, lxson2 Son điểm giáng, lxson3 Son thiên chu cống · lxma0 Yên chi giấy, lxma1 Yên chi bánh, lxma2 Yên chi hoa hồng, lxma3 Yên chi tiến cống · lxmat0 Phấn gạo, lxmat1 Phấn hoa lài, lxmat2 Phấn ngọc trâm, lxmat3 Phấn trân châu ngự. Visual keys: item-list-ration.md §B (C1–C4). When painted: add the key to `LX_ART` in jration.js.

## Scan (group): every place a cosmetic is given goes through IT keys + lxFix (stipGoods, goodsGive, shop buy, borrow, steal, tribute, old save) — test covers each.

---
# FIX 1 (E4f session_01DgYSWpaM3yuPRsuWXP8kqd, depth 1, START_CTX ~4 %) — review E4r FAIL a0f3f53, all 7 points
PRIORITY #1 CHECK ('sonphan|rashGive|lxAllergy|toilMkLayer|IT_ALIAS|BAL.pay'): OD L762, L1577 (08:25Z ration, law C), PL #5 | main: jrash.js rashGive (REUSED for the allergy), j8 IT_ALIAS + itClean (REUSED to fold sonphan), j8 taintHit (REUSED for pha chì), jtoil toilMkLayer/toilMkDraw/toilMakeupSvg (shared render path, extended), jecon BAL.pay (law C price), jbal BAL.thy.cost (same "share of bổng" pattern) | review/* review/monthly-ration only | claims E4 rolled over, E4r FAIL.

**Branch** review/monthly-ration **sha e5d989b** (rebased on origin/main a95e8d4; generated index.html/sw.js taken from main then rebuilt with build_site.sh).

## The 7 fixes
1. **A part she does not own is not painted.** One new field on the look's colours: `col.no` = parts she lacks (jration lxCapRec at the sitting, lxColPick for the mirror preview). jtoil (makeup owner = MAIN; minimal change, inside the shared render path so EVERY face of that kind follows): `toilColFix` keeps `no`; `toilMkLayer` puts it in the cache key; `toilMkDraw` skips the brow (may), lid + shimmer (mat), lip + gloss (son), blush blobs (ma) layers; the mesh-less SVG fallback `toilMakeupSvg` skips blush (ma) and lip (son). The record travels (S.toilette.col, co-op friend rec), so her stage figure, avatar, close-up and the friend's view all match. NPC faces are not painted by jtoil today (toilLookOfP → null for NPCs); their record carries `no` too.
2. **Law C flat.** `uses` flat 6 at every tier (tier = finer name/look, dearer box, never more lần); `n` 2 boxes every rank (unchanged); price of a box = max(floor price by tier, ceil(BAL.ration.buyK 0.2 × BAL.pay[buyer rank])) — `lxPrice`, read through a getter on IT[k].pr so shop, buy, sell, gift value and mua gấp show the ONE number ("giá theo thể diện người mua", like BAL.thy.cost ≈ share of bổng). Mua gấp gives a box of her rank's tier; NPCs buy at their own rank's price. Measure `node dev/measure/ration-lawc.js <worktree>` (bot per rank, real page: 24 months × 3 sittings, ration only; top-up = mua gấp to hold Kiều diễm every sitting; NPC 12 real months):
| rank | bổng | cov Đoan trang | cov Kiều diễm | top-up Kiều diễm / bổng | NPC parts | NPC 0-part months |
|---|---|---|---|---|---|---|
| 0 | 40 | 1 | 0.67 | 60.0 phần trăm | 3.83 | 0 |
| 1 | 55 | 1 | 0.67 | 61.8 phần trăm | 3.92 | 0 |
| 2 | 70 | 1 | 0.67 | 60.0 phần trăm | 3.92 | 0 |
| 3 | 95 | 1 | 0.67 | 61.1 phần trăm | 3.83 | 0 |
| 4 | 125 | 1 | 0.67 | 60.8 phần trăm | 3.92 | 0 |
| 5 | 165 | 1 | 0.67 | 60.6 phần trăm | 3.92 | 0 |
| 6 | 215 | 1 | 0.67 | 60.5 phần trăm | 3.83 | 0 |
| 7 | 280 | 1 | 0.67 | 60.0 phần trăm | 3.92 | 0 |
spread: cov Đoan trang 0, cov Kiều diễm 0, top-up 1.8 points
   Spread: ration-only coverage 0 (target ±0.05), top-up share ≤ 2 points (target ±10). Before (E4r): Kiều diễm 0.04 → 0.38, top-up 80 % → 9 % of bổng.
3. **One allergy system.** `lxAllergy` now calls jrash `rashGive` (timed rash, picture, Thái y card, Sắc by severity): bột ngứa → severity by BAL.ration.allergy.nguaW; pha chì → chiW + j8 `taintHit` (the same lead hurt as every tainted item); the first use of a clean box rolls RASH.cos (sev 1, "son phấn không hợp", as the old sonphan hook). Old flat Sắc −4 / p.lxRash removed; the text is rashGive's own (text = effect). jrash's dead sonphan useItem hook retired (comment points to jration).
4. **One cosmetic family.** `IT_ALIAS.sonphan = "lxson0"` (itClean renames old pieces on load, taint kept; lxFix also converts any piece met before itClean). Givers moved to lx boxes: SHOP_ALL (removed; jration adds lx tiers 0–1), BEST.night → lxson1, BEST.dau → lxma1, j24 gift → lxma0, jts gifts → lxson0, jts themes phu/huong/xuan tags → lx keys, TS_SLOT "Hương, phấn" + jlux luxThemeTags → any lx box, jcui Hương khôi prize → lxma2, TAINT.chi.on → lx only, jstip down/unit sonphan rows dropped. IT.sonphan stays defined (old saves before rename, art stand-in). Scan `python3 dev/test/sonphan-scan.py --base origin/main`: **before 22 lines / 18 givers → after 11 lines / 0 givers** (left: item definition, ITIMG art row, j98 grade row, jecon priceTier row, comments, alias).
5. **NPC order.** stipGoods wrapper: `lxNpcSpend(v)` (the past month's sittings) runs BEFORE the issue, `lxNpcMonth(v)` (buy / borrow / ask her / steal) after it; test `npcIssueFull` (issued boxes arrive full). jstip's NPC goods trim never drops lx boxes.
6. **Small.** Item text drops the bracket when it repeats the label ("Hộp phấn mắt dùng khi điểm trang: …"); tribute chance added for `sinhthan` (her birthday, 50 like Vạn thọ `birthday`).
7. **Shots + runs** below.

## Tests (sha e5d989b)
- `node dev/test/monthly-ration.js <wt> <out>`: **ALL PASS** (49 checks, Fold 755x1000@2 + iPad 1180x820@2; new: allergy/allergyChi via rash, alias, oldSonphan, noGiver, lawC shares 0.2 at every rank, colNo, txt, npcIssueFull).
- `node dev/test/monthly-ration-shots.js <wt> <out>` (new): **ALL PASS** Fold + iPad — mirror col.no=son, face A/B layers keyed by col.no, ration line names the boxes, visit cards (no %), ask-her event, no h-scroll, no page errors.
- `python3 dev/test/sonphan-scan.py --base origin/main`: PASS.
- dev/test/stipend.js (Fold + iPad): exit 0, no page errors.
- dev/test/makeup-theme.js 1180x820@2: fail [] · makeup-lux.js 1180x820@2: fail [] · coop-toil-look.js (host + guest): 29/29 passed. (Why they "hung" for E4r: served by `python3 -m http.server`, which sends dev/index.html without a charset → the page fails to parse ("Invalid or unexpected token") and the test waits forever; serve with charset=utf-8, e.g. a 3-line node server.)
- stipend-oldsave: not run separately (needs a mk-oldsave fixture); old save covered by quickcheck (live-build save loads and plays) + monthly-ration test oldFix / oldSonphan.
- `bash dev/tools/quickcheck.sh` on e5d989b: **QUICKCHECK PASS** · old save ok · core gates PASS · perf new/live render 184/231, tab 364/380, buổi 854/1003 ms.

## Shots (CDN 401 on account E → handover branch dev/handover/shots/monthly-ration/; LOOKED at each)
- face-ab-{755x1000,1180x820}.jpg — the shared colour layer over her portrait: đủ 4 thứ · thiếu son môi (lips stay her own) · thiếu phấn má (no blush) · thiếu mày + phấn mắt. NOTE (pre-existing, not this branch): on this portrait (por-consort-c18-t1-a18) the face mesh puts the lip layer on the right cheek and a brow ghost on the forehead — the streak disappears exactly when son is missing, so it is the lip layer misplaced. On c14 the layers sit right. → FOR MAIN (makeup owner): check img/mk-fit for consort-c18 t1.
- mirror-noson-{755x1000,1180x820}.jpg — Son môi missing: only owned colours, note (Thiếu / Dung nhan / Đường kiếm), Mua gấp (Bạc −17 at Thường tại = lxPrice × rush), reveal cleared (Fold no longer covered).
- cards-{755x1000,1180x820}.jpg — Mượn / Xin / Lấy trộm son phấn as kit option cards (shown together in one card for the shot), odds words only.
- askher-{755x1000,1180x820}.jpg — "Sang mượn son phấn" event (Chia cho nàng một nửa / Khéo từ chối).

Art list for Foreman C unchanged (16 icons, see above).
