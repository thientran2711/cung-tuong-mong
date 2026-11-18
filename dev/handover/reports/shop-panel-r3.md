# shop-panel-r3 report (worker, branch review/shop-panel-r3 @ c4fff3cc, from review/shop-panel-r2 f9449133 + merged main 94d11623)

PRIORITY #1 CHECK: OD 0 / shop L1879 + 18:30Z + 18:50Z + 18:55Z sub-tabs | main kitSubTabs/kitTabRowHTML (jtabs.js, jk3.js) + kitShop (jinv.js) + chest groups KINV_CATS/KEQ_TT (reused, no new chip) | review/* shop-panel-r2 (base) | claims shop-panel-r3 = this session.

## What
Owner 18:55Z: small tabs by item kind under «Mua» | «Bán». ONE more row of the kit tab row (`.pctabs.kcattabs.kshkinds`, `kitTabRowHTML` = same part as Tư trang chest tabs / kitSubTabs), in `kitShopBody` (dev/build/jinv.js) so every buy/sell place gets it.
- Groups = the chest's own (`KINV_CATS`: Trang sức, Y phục, Vải vóc, Thuốc men, Hương liệu, Lễ vật, Thư từ, Tác phẩm, Tạp vật); Trang sức split by wear slot (`KEQ_TT`: Cài tóc, Đeo tay, Đeo eo, Túi thơm…). `kitShopCat(k, crafted)` gives each item its `cat` (buy items, sell items, ilShopTiles in jil.js).
- First tab «Tất cả» (the chest already uses it → not invented); only kinds present in the current list; count per tab; no row when the list has a single kind (pet shop). Choice kept per mode (`o.cat[mode]`): Mua and Bán each keep theirs. Selected kind filters the 3-col grid.
- KIT.md shop entry updated in place.

## Scan table
| place | kind row |
|---|---|
| Nội vụ phủ «Để ta xem» (kitShopNvp), Mua | yes (Tất cả + kinds present) |
| same, Bán | yes |
| Tư trang «Nhờ thái giám mua đồ» (same kitShopNvp) | yes |
| Pet shop (buy only, one kind) | none by design |

## Tests
- dev/test/shop-panel.js (added kind-row, filter-to-kind, Mua + Bán assertions): 755x1000@2 + 1180x820@2 ALL PASS (27 checks, 0 page errors).
- quickcheck.sh at c4fff3cc: QUICKCHECK PASS (core gates PASS).
## Shots (looked at, Fold + iPad together)
CDN refused as in r2 → handover branch dev/handover/shots/shop-panel-r3/ : nvp-buy(-kind1 Đeo tay, -kind2 Trang sức), nvp-sell(-kind1 Đeo tay, -kind2 Trang sức), pet; each -755x1000.jpg and -1180x820.jpg (delete after verdict).
Note: in the modal the kind row wraps to 2 lines when narrow (the kit's horizontal scroll rule applies only inside #panel).
