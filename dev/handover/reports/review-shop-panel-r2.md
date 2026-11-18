# review-shop-panel-r2 (small reviewer)

PRIORITY #1 CHECK: OD L1879 + 18/11 ~18:30Z points 1-4 | main kitShop/kitShopNvp live (reused, no new kit part) | review/* review/shop-panel-r2 9f61f1c2 | claims shop-panel-r2 worker session_01Rc5AsMyVsQxLMS5ePwwpjT

Verdict on 9f61f1c2, merged with origin/main 94d11623 -> f9449133 (index.html + sw.js conflicts: took main, rebuilt with build_site.sh; dev/test/shop-panel.js conflict resolved = main's nlNew() + worker's boot-cover hide).

## Owner points (verbatim OD 18/11 ~18:30Z)
1 one gain row, no kind word: PASS (Nvp, Tu trang, pet shop; "Sac +2 · Danh +1"; long name "Cho nho long xu" wraps in the 2-line name slot, gain row stays 1 line)
2 picture strip gone: PASS (Fold + iPad)
3 no "Ta co N bac", tabs Mua|Ban first in right column: PASS (pet shop has no tabs, its seller paragraph stays, outside this order)
4 Ban price = "25 bac" only: PASS
## KIT FIRST: change only in kitShop/kitShopEff/kitShopTile + pet eff string; every caller (Nvp, Tu trang, pet) changed together; no private part. KIT.md updated in place.
## 18 laws: 4 ONE CORE (no typed numbers; prices from item data), 6c REAL OBJECTS PASS (test: buy chest +1 / bac -price, sell chest -1 / bac +25), 7 VANPHONG (no %), 9 kit, 11 whole group (scan table in worker report), 12 both devices.
## Tests (own run, file://, merged build)
- dev/test/shop-panel.js 755x1000@2 + 1180x820@2: ALL PASS (3 cols, tabs, figure left, no overflow, 0 page errors). Only console noise: CDN tunnel failures (sandbox).
- quickcheck: QUICKCHECK PASS 179 s, open 1466 ms, old save loads + plays a buoi (0 errors), core gates PASS, perf render 249/240 tab 437/401 buoi 1420/968 (new/live).
- Shots looked at: nvp-buy, nvp-sell, pet on Fold and iPad (long name tile + pet tiles included). Nothing cut, no strip, no Ta co line. Note: tiles with a 1-line name leave a small gap before the gain row (fixed 2-line name slot, kit grid rule), same on every tile.

PASS LAND READY f9449133 (FF from 94d11623)
