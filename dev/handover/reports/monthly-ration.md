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
