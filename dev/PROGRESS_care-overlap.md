# PROGRESS care-overlap (branch review/care-overlap, base main 12f52db7 + merge review/pet-lifespan-r1 0e8e3684)
START_CTX ~8% (worker). Status: SẴN SÀNG KIỂM 7c02ff56.
- Bug: pet care screen "Chăm <name>": the banner picture (tea cup) covered the 4 bars, rows and first act card.
- ROOT CAUSE: shop/care dialogs (class kshopd, jinv.js) put .kpmain in grid row 1/-1 of the KIT 50 person-dialog grid; KIT 50 (jk4.js, OD:L448) puts the default banner (kdpban) in row 1 of the same column -> body and banner share row 1.
- GROUP (all kshopd + kdper + kdpban dialogs): pet care (all stages), pet shop, errand shop (kitShopNvp). kitStatRow is used only by pet care.
- FIX (kit, jinv.js, one rule): `.dlg.kshopd.kdper.kdpbanner>#mb>.kpb>.kpmain{grid-row:2/-1;overflow-y:auto;overscroll-behavior:contain}`. KIT.md §50 note added. No per-screen CSS.
- Tests: dev/test/care-scan.js + care-cases.js (overlap probe, 4 cases x Fold 755x1000 + iPad 1180x820): before = overlap in 4/4 at both sizes, after = 0/4. 0 page errors. Shots dev/review/care-overlap/{before,after}/.
- Old-save load: dev/test/care-oldsave.js — save made by the pre-fix build loads in the fixed build (2 pets), care screen opens, no overlap, 0 page errors (pets-fix.js harness itself timed out on the night-card overlay, unrelated).
