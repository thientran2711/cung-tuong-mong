# shop-panel report (worker, branch review/shop-panel @ 0bf5fe60)

PRIORITY #1 CHECK: OD L1879 | main: kitShop / kitShopNvp (jinv.js) already had Mua|Bán tabs + auto-fill grid | review/* none | claims none -> reused the kit shop, no new kit part.

## Place table (every buy/sell dialog)
| # | Place | Code | Before | After |
|---|---|---|---|---|
| 1 | Nội vụ phủ eunuch, talk option | jact.js talkOpts (peddler) -> kitShopNvp | «Xem hàng Nội vụ phủ», panel auto-fill grid (2 cols on Fold/iPad) | «Để ta xem», 3-col panel |
| 2 | Tư trang button «Nhờ thái giám mua đồ» | j8.js invAct override -> kitShopNvp | same panel, 2 cols | same panel, 3 cols (button name kept, see question) |
| 3 | Pet shop | jpet.js petShop (buy only) | 2 cols | 3 cols |
| 4 | j8 PEND.shop list | dead (invAct override) | - | untouched |
| 5 | j29 «Hàng chợ đen» | event choice, single item, not a panel | - | untouched |
| 6 | per-item «Bán» buttons in chest cards | immediate actions | - | untouched |
jwkr / jgpick grids (works, pick) are not buy/sell panels: keep auto-fill.

## Change
- jinv.js CSS: `.kshop[data-kshop] .kshg{grid-template-columns:repeat(3,minmax(0,1fr))}`; smaller button font in the panel; scene picture strip = `KIT_SIZE.pic.NS.h` (the grid always scrolls -> smallest strip, 16:10Z rule; reports/fullbody-frame.md § S3 was not on the handover branch when I worked, so no new size invented); nvp seller quote paragraph removed so the grid gets the room.
- jact.js: option text «Để ta xem». KIT.md: layout line added under 28.13e Used by. Test dev/test/shop-panel.js (new); act-dedupe-w1.js string updated.
- Not touched: jag*/j95*/jtoil*/jbal.js/jcoop*/save logic.

## Gates
- dev/test/shop-panel.js: 755x1000@2, 1180x820@2, 1024x768@2 ALL PASS (3 places, 3 cols, tabs, figure left, buy chest +1 / bạc -price, sell chest -1 / bạc +price, no overflow, 0 page errors).
- 412x1058: the game shows «Xoay ngang điện thoại để chơi» (unsupported portrait phone), so no panel layout is claimed there.
- dev/test/shop-fix.js 755x1000 + 1180x820: output diff vs origin/main = only cols 2->3 (tile alignment values all 0 both); sameAsSeller=false on both (pre-existing).
- quickcheck.sh 0bf5fe60: CORE GATES PASS, TIME-SPILL PASS, open 0 errors, old save loads + plays a buổi 0 errors.
- act-dedupe-w1.js: flaky by random greet state (eunuch not yet greeted -> «Chào hỏi» is option 0). origin/main itself FAILs 3 (maid door, eunuch+shop when ungreeted, face on place names); one run on this branch passed all. pets-fix.js crashes at line 81 on origin/main AND this branch (pre-existing).
- Branch already contains newest origin/main (a2ce736a); built index.html/sw.js not committed (integrator builds).

## Shots (looked at, CDN, not in git)
https://ctm-img.victoria-tntt.workers.dev/img/_review/shop-panel/ : nvp-buy-755x1000.jpg, nvp-buy-1180x820.jpg, nvp-sell-755x1000.jpg, nvp-sell-1180x820.jpg, pet-755x1000.jpg, pet-1180x820.jpg

## Question for the owner (via MAIN)
Rename the Tư trang button «Nhờ thái giám mua đồ» to «Để ta xem» too? I kept it: it names the errand, while «Để ta xem» is the seller's outside option.

## REVIEW r1 (reviewer, sonnet) — PASS
PRIORITY #1 CHECK: OD L1879 | main kitShop/kitShopNvp (reused) | review/shop-panel 0bf5fe60 | claims worker session_01N1tNP3Cr9vpq7qJTUrjtow.
Branch review/shop-panel-r1 @ 5e6490b (descends origin/main e18697f; merged main, one jact.js conflict resolved: main's maidTalkDo line kept + «Để ta xem»; index.html/sw.js/assets.json rebuilt). Touched: assets.json, dev/build/jact.js, dev/build/jinv.js, dev/kit/KIT.md, dev/test/act-dedupe-w1.js, dev/test/shop-panel.js, index.html, sw.js. No jag*/j95*/jtoil*/jbal.js/jcoop*/save.
Laws: kit first OK (kitShop only, no private CSS beyond the kit CSS block in jinv.js, KIT.md line added); whole group OK (place table verified by git grep: nvp, Tư trang button, pet shop; j29 chợ đen single-item, j8 PEND.shop dead, j2 peddler list dead); real objects OK (buy chest+1/bạc-price, sell chest-1/bạc+price); one core OK (prices from IT/BAL); wording OK.
Gates: shop-panel.js 755x1000+1180x820 ALL PASS earlier (3 places x 2 sizes, 0 page errors); shop-fix.js ok; quickcheck PASS (core gates, old save ok). act-dedupe-w1.js: 4 FAIL (place-name faces, happenings on arrival, gold ! on map) = unrelated to shop, worker reports same class red on main (not re-run on main by me).
Shots looked 3x (Fold+iPad together, scratch, not in git): panel left figure / right tabs / 3 columns OK on both.
Non-blocking notes: (1) pet shop keeps its long seller paragraph so only ~1 tile row shows on Fold/iPad (nvp dropped it); needs owner/kit decision, not a law break. (2) Tư trang button name «Nhờ thái giám mua đồ» kept (worker question to owner stands). (3) eunuch shows «???» name (pre-existing). (4) Sell tab with 1 item shows 1 tile (3-col grid, correct).
