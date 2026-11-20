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
