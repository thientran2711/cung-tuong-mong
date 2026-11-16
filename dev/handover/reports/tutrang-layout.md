# tutrang-layout report (worker, 11/16/2026)
Branch review/tutrang-layout, sha bf6258593 (base origin/main 0ce59361). START_CTX ~5%; no rollover needed.

## Change (shared kit only, dev/build/jinv.js)
- kitInvGrid gains side / sum / below: wear column LEFT, bag grid RIGHT (whole rows only, natural cell size), worn-bonus chips under the grid, pet strip below.
- kitEquipSlots gains col:true (vertical column: slot picture + small slot name; item name/chips live in tap panel + tooltip) and row:true (one strip: slot = bag-cell size, pet name + state beside it; empty = "Chưa nuôi con nào").
- kitInvFit sizes --kcell (bag cell) and --kside (wear slot = bag cell, shrunk so 6 slots + labels fit panel height, min 44px); free-height fill measures the bag column.
- Callers switched (all places with wear slots + bag): Tư trang (jinv keqTT + jwdinv override), Chọn y phục (jtoil), pet strip (jpet petHTML, jtsb no longer appends it). Person-card kitWearSlots (no bag) untouched.
## Measurements (CSS px)
Fold 755x1000: panel 769 tall, no scroll (scrollHeight=clientHeight); wear column 508 tall x 78 wide (6 slots, labels 0.58rem), bag 615, pet strip 78 (was 197). iPad 1180x820: right pane 580x621 no scroll, column 489 tall. No horizontal overflow; 0 page errors.
## Shots
dev/review-shots/tutrang-layout/{fold,ipad}-pet{0,1}.jpg (@2), fold-toil.jpg (@1, dress picker).
## Tests
kit-conform 755x1000: 91 CONFORMS, 15 MISSING (place:*, contest, cold-palace; not inventory, no errs; baseline not re-run). NOT run: game-feel, old-save load, inv-grade/pets-fix (pets-fix asserts the old keq subgrid pet row: needs updating to the strip). Site root index.html rebuilt; sw.js not rebuilt.
## Open
1km: veil label wraps to 2 lines at narrow widths; owner decides if she wants item names back in the column.
