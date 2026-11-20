# wear-slots — GAP IT03 wear slots «Hoa tai» + «Giày» (worker session_01N1tNP54h4MaGv7EfQy7u43, Foreman B ROOT)
PRIORITY #1 CHECK ('Hoa tai|Giày|KEQ_TT|wear slot|hoatai|giay'): OD 4 (L175) | ledger 1 | claims 6 | main 15 (jinv.js:302 KEQ_TT, j98.js:20 art keys, archive KIT REQUEST K7) | review/* 0 | archive 9 → no existing build; reused the existing paintings + the generic IT.sl wear rules.
depth: worker · START_CTX ~3 % (est.; 1M window) · now ~13 %.

## SẴN SÀNG KIỂM review/wear-slots 56f00454 (base LIVE 90b7e797 merged) — BIG review (save)
What:
- **BAL.wearSlots** (jbal2.js, law 4): 4 pieces on the existing D45 paintings — hoatai «Hoa tai ngọc trắng» (Sắc +2, rk 0, pr 40), hoataivang «Hoa tai vàng khảm trân châu» (Sắc +3 Danh +2, from Tần, pr 130), giayhoa «Giày thêu hoa mai» (Sắc +1, rk 0, pr 15), giaygam «Giày gấm mẫu đơn đính trân châu» (Sắc +2 Danh +1, from Quý nhân, pr 70). Item text prints the BAL numbers.
- **Owner rules applied**: earrings are REWARDS only (Lượt 1054 "vào cung … được thưởng những cái hoa tai") → not in SHOP_ALL, in BEST night/birthday/contest/promo (rank-filtered by bestow); shoes are sold (SHOP_ALL) + rewards. Girls on the home road get none (girlChest unchanged).
- **Rules = the existing generic ones** (same model as Đeo tay/Đeo eo/Túi thơm): one piece per slot (j8 wear), wearBonus ×1.5 above rank, vượt phẩm above IT.rk → vpItems/tố, luxury via luxVal/luxOf (grade + pr/10), ghen/Thái hậu frown through luxMonth.
- **Law 1 NPC parity**: NPCs get them from bestow and put them on in the j8 monthly auto-wear; their person card shows them. **Law 6c**: a worn piece stays an entry of p.inv (e.w=1): stealable, confiscable (kd Trang sức), giftable, traceable.
- **Whole group (3 wear-slot places)**: Tư trang KEQ_TT (+ kitItemHint), Chọn y phục TOIL_SL (+ item filter), person card DS_SLOTS (K1 row now 8 slots + pet = 9 tiles). Shop sub-tabs «Hoa tai» / «Giày» come from KEQ_TT (kitShopCat). KIT.md lines updated in place.
- **Save**: no migration needed (new keys only); an old save without them loads, slots empty (tested).
- **Co-op**: no new action — the wear action is already the co-op relayed reg8("wear") and p.inv is synced state; checked by code, NOT run in a 2-phone test.
- **«Đeo» in Tư trang**: the existing kit item panel (kinvOpen) shows «Đeo» / «Tháo»; shown in the shots.

OPEN:
- **KIT REQUEST (KIT_REQUESTS.md 20/11 wear-slots, to MAIN kit keeper)**: iPad 1180x820 — the wear column (8 slots + pet box) ends 96 px below the panel (old 6 slots: 16 px inside) → panel scrolls, Giày + pet box under the fold. Fold 755x1000 and iPad 1366x1024 fit. Needs a kit rule (2-column wear column when one column cannot fit). Test prints it as OPEN.
- **For Foreman C**: the worn earring on her figure/portrait/avatar (EAR1 overlay) is NOT wired — EAR1 anchors/layers exist only for 3 demo figures (c09/c11/c22) in dev/art/earring-test on the handover branch, not on CDN/main for the ~90 figures. Shoes: no figure art (hidden under robes).
- Weather item giaycoi «Giày đế cỏ» (jweather, Tạp vật, rain gear) stays outside the Giày slot (own rule).

Tests (host build, 755x1000@2 + 1180x820@2):
- NEW dev/test/wear-slots.js: PASS (BAL→IT, swap, ×1.5, vượt phẩm, luxury, 3 places, shop sub-tab, reward-only earrings, NPC wear + bestow + card, old save, «Đeo», page overflow).
- dress-offence.js / small-art-wire.js: counts updated (7→9 cells; earrings now IT). Remaining FAILs (8d maid dò la; servant road; rank-up chest; servant pouch) and econ-items FAILs are the SAME on LIVE main dbddaed2 (baseline run) — pre-existing, not from this branch.
Shots (LOOKED; delete after verdict: python3 dev/site/cdn_sync.py --wipe-review wear-slots):
- https://ctm-img.victoria-tntt.workers.dev/img/_review/wear-slots/755x1000-tutrang.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/wear-slots/1180x820-tutrang.png (shows the overflow)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/wear-slots/755x1000-card.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/wear-slots/1180x820-card.png (NPC wearing Hoa tai ngọc trắng + Giày thêu hoa mai)
- https://ctm-img.victoria-tntt.workers.dev/img/_review/wear-slots/755x1000-earring-panel.png · https://ctm-img.victoria-tntt.workers.dev/img/_review/wear-slots/1180x820-earring-panel.png

## REVIEW r1 (opus BIG, session_01N1tNP5gHxMtpFZ6rmVrtsc) — **PASS e71918c0** (review/wear-slots-r1 = 56f00454 + r1 tests + merges of LIVE 8cf6b7d7, 0aaf8152, 99bdba82, 713d96dc; only index.html/sw.js conflicts after the first, rebuilt)
PRIORITY #1 CHECK ('wear-slots|wearSlots'): OD 0 | ledger 0 | claims 7 | main 8 | review/* 1 (review/wear-slots) | archive 1 → reviewed the existing branch, nothing rebuilt.
START_CTX ~12 % (est.).
Laws:
- L1 two-way / NPC parity OK: NPCs get earrings/shoes from bestow (BEST lists, rank filter `itm(k).rk<=rkOf(p)`; 13/300 night rewards gave an earring), put them on in the real j8 rivalsMonth line (j8.js:446, generic on IT.sl), person card DS_SLOTS shows them. Player and NPC share wear()/wearBonus/vpItems/luxWorn.
- L2/L3 OK: per slot the dearer piece gives more stat AND more luxury (Xa xỉ → ghen / Thái hậu frown) + vượt phẩm above IT.rk; shoes in shop at the same price ratio as tramngoc (15 bạc/Sắc); selling an Emperor-given earring carries the existing «đồ Hoàng thượng ban: lộ ra là bất kính» loss. No cost-only option.
- L4 OK: every number in BAL.wearSlots; item text prints BAL values; one-core-guard PASS (fails 0). (×1.5 above rank is the pre-existing wearBonus rule, not new.)
- L6c OK: worn piece stays a p.inv entry (e.w=1), giftable/sellable/stealable. Earrings reward-only verified VERBATIM in FOREMAN_C_STATUS.md:415 (Lượt 1054: "vào cung thì mình mới có cái option là được thưởng những cái hoa tai") + :416 FOR MAIN line. Not in SHOP_ALL; weekly rare item (jact adRare, BAL.ad.rareMinGrade 3) cannot pick them (grades 1/2); restock/svMarket use SHOP_ALL / `il` only. girlChest unchanged (thiếu nữ: no earring).
- L7 VANPHONG OK (no %, cổ trang labels). L9 KIT OK: only existing kitEquipSlots / kitItem / kitWearSlots / kit shop sub-tabs; shop tabs appear only for kinds present (no empty «Hoa tai» buy tab). Whole group = 3 places (KEQ_TT, TOIL_SL, DS_SLOTS) + kitItemHint + toil item filter + KIT.md lines in place.
Tests on the merged sha (and 56f00454):
- QUICKCHECK on e4aaf610 --cpu 4 --runs 5 PASS: render 214/192, tab 440/403, buổi 1265/1365, tasks>200ms 19/22 (a --runs 3 run on the same sha read buổi 3278/1161 = box noise; median of 5 clean). QUICKCHECK on 571a492b (LIVE 99bdba82) --runs 5 PASS: render 193/251, tab 423/445, buổi 1039/1504. On e71918c0 (LIVE 713d96dc, build-only merge): one-core-guard PASS + wear-slots.js PASS. Earlier QUICKCHECK PASS on 56f00454 and bf80a7ac · core gates PASS · time-spill PASS · old save from LIVE loads + plays a buổi · perf new/live render 224/189, tab 409/429, buổi 1494/1141 (box noisy: first run 1313/1742; no hot path touched).
- wear-slots.js PASS (Fold + iPad) · one-core-guard PASS · undef-scan PASS.
- CO-OP (PASS criterion): coop-e2e 68/68 · coop-thin-f1 L6 22/22 · NEW dev/test/wear-slots-coop.js PASS (live Worker, host Fold + guest iPad): each player wears Hoa tai + Giày through itemAct «Đeo» (reg8 wear); after one merged week the OTHER phone sees both pieces worn (p.inv) and in the friend's person-card wear row; no page errors. (Worker had only checked co-op by code — closed here.)
- Pre-existing FAILs identical on LIVE main (worktree of 90b7e797, same runs): dress-offence only 8d (+ a seed-dependent 7-fail run that also happens on main 1 in 4), small-art-wire 5 same FAILs (servant road, rank-up chest ×3, servant pouch), econ-items same FAIL. role-parity.test FAILs on main too (different gap set each run: maid/hh/up acts, none touches wear) → not from this branch.
r1 changes (tests only, no game code): wear-slots.js opens the earring panel from the real chest entry (kinvItems; before, the shot showed «Thường» instead of the painting's «Tinh phẩm» and on Fold could catch the boot cover) + asserts the grade; NEW wear-slots-coop.js. Merge LIVE 8cf6b7d7 (KIT_REQUESTS.md both sections kept) + LIVE 0aaf8152; index.html/sw.js rebuilt; wear-slots.js PASS again on e4aaf610.
Shots LOOKED 3× (Fold 755x1000@2 + iPad 1180x820@2: Tư trang, person card, earring panel). Known OPEN, confirmed filed (not a FAIL per order): KIT_REQUESTS 20/11 wear-slots — iPad 1180x820 wear column runs below the panel (Giày + pet box under the fold, panel scrolls); earring on figure/portrait not wired → Foreman C (EAR1 only 3 demo figures).
CDN img/_review/wear-slots/ wiped after verdict.
