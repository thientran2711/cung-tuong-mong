# kit-act-grid (KIT keeper, #24 = addendum 8, owner OD 21/11 ~02:52Z «nút to nút nhỏ» x3, OD L980–981)

Branch `review/kit-act-grid` 39cc5bc7 (from LIVE bd03747e). Her shot (Tài nghệ › Tứ đức): act cards «Tự học / Học với thầy / Các lỗi, sách phổ» in a 2-column grid with different heights and tiny pictures; Tư trang › Việc: 170x170 pictures, 2 per row on iPad.
**Change (kit part only, jk4 + one CSS line in j79):** the kit-pcrow-square card (square picture + title + Tốn/Được beside it, the rest in the full-width box under: `kitPcActSplit`) applies to EVERY compact act card outside dialogs — `.pc>.pcr` and every `.kpanec` host (Tài nghệ `.kskacts`, Tư trang › Việc `.rbtn`, quick acts, pop-ups). ONE picture size per DEVICE (`--kpa-d`): iPad (html.kv2) 96, Fold 84, narrow panel (html.kpnarrow, < 480 px measured on #panel by `kitActPicSize`) 72; ONE card per line (`.kskacts` one column, `.kpanec .rbtn` flex column). Not touched: big Hành sự deck `.cards`, dialog options `.kopt`. KIT.md §6.3g.
| host | before (Fold / iPad) | after |
|---|---|---|
| Tài nghệ (.kskacts) | 72x72 / 72x96 / 56x56 pictures, card heights 74 / 110 / 182, 2-col grid | 84 (Fold) / 96 (iPad) square, one column |
| Tư trang › Việc (.rbtn) | 170x170 picture, 2 cards per row on iPad | 84 / 96 square, one column, Tốn/Được beside, box under |
| person tabs / pop-up | 84 / 96 (kit-pcrow-square) | unchanged (same rule) |
Scan: `node dev/test/act-grid-scan.js <url> <out> 755x1000,1180x820 art,inv-viec,act,tab-rv,tab-staff,pop-maid` PASS (art 13 acts, inv-viec 6, tab-rv 4/5, tab-staff 3, pop-maid 3 on Fold 84 / iPad 96: square, one size, only Tốn/Được beside, box under and full width, nothing side by side). quickcheck 39cc5bc7 PASS (tab 474/518, render 263/254, buổi 1316/1566); coop-e2e 92/92.
