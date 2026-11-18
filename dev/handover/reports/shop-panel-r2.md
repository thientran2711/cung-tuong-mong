# shop-panel-r2 report (worker, branch review/shop-panel-r2 @ 9f61f1c2, from origin/main d3ea24e8)

PRIORITY #1 CHECK: OD 0 (+ L1879, new OD 18/11 ~18:30Z points 1-4) | main 15 kitShop/kitShopNvp live 5e6490b4 (reused, no new kit part) | review/* none open | claims shop-panel-r2 = this session.

## Owner points -> change (all in the shared kit, dev/build/jinv.js; pet gain row jpet.js)
1. Tile gain row: `kitShopEff` returns only the gains joined « · » («Sắc +2 · Danh +1»); the slot / kind word (đeo tay, cài tóc, đeo eo, dùng, may áo) is gone; one line, ellipsis. Tile eff row is now 1 line high (was 2).
2. Picture strip on top of the shop panel: hidden (`.kdlgart.kdpban` display:none inside `.kshopd`), kpmain starts at row 1.
3. «Ta có N bạc» removed from `kitShopBody`; the tabs «Mua» | «Bán» are the first thing in the right column.
4. Bán tile price = «25 bạc» only (no «bán», no «có N»).
KIT.md updated in place (28.13d right-column text + shop layout paragraph; old strip / "Ta có" lines overwritten).

## Scan table (every buy / sell place; Fold 755x1000 + iPad 1180x820)
| place | strip before->after | bạc line | kind word | gain row |
|---|---|---|---|---|
| Nội vụ phủ «Để ta xem» (kitShopNvp) | yes -> none | yes -> none | «đeo tay: Sắc +2, Danh +1» -> «Sắc +2 · Danh +1» | 1 row |
| Tư trang «Nhờ thái giám mua đồ» (same kitShopNvp) | yes -> none | yes -> none | same | 1 row |
| Pet shop (petShop, buy only) | yes -> none | yes -> none | «Chắc · Sắc +1 · đ…» (odds+use, cut) -> «Sắc +1» | 1 row |
| Bán tab (nvp / Tư trang) | yes -> none | yes -> none | – | price «25 bạc» |
| jgpick / jwkr pick grids (not buy/sell) | n/a | n/a | share the 1-row eff style | – |
| j29 chợ đen, per-item Bán buttons, dead j8 PEND.shop | not panels, untouched | | | |

## Tests
- dev/test/shop-panel.js (updated: hides boot cover #kboot/#kbootw so shots show the panel; waits 2.5 s after clicks, file:// is slow): 755x1000@2 + 1180x820@2 ALL PASS (3 places, 3 cols, tabs, figure left, buy chest+1/bạc-price, sell chest-1/bạc+price at 25, no overflow, 0 page errors).
- quickcheck.sh 9f61f1c2: QUICKCHECK PASS (core gates PASS, time-spill PASS, open 0 errors, old save plays a buổi).
- Phone 412x1058 is the unsupported portrait («Xoay ngang…»), no claim.

## Shots (looked at 3x, Fold + iPad together)
CDN upload refused (proxy 403 on the R2 API), so per root53-common the shots are on the handover branch: dev/handover/shots/shop-panel-r2/ : nvp-buy / nvp-sell / pet, each -755x1000.jpg and -1180x820.jpg (delete after the verdict).
Looked: no strip, tabs at top, 3 columns, one gain row on every tile, sell shows «25 bạc». Pet shop keeps its long seller paragraph (r1 note, not in this order).
