# kit-display-room report
PRIORITY #1 CHECK: OD 13 (no shelf UI) | main: Dư đồ §85 + kitInvGrid/kitItemCard reused | review/display-shelf (data API, jshelf.js; matches shelfOf/shelfPut/shelfTake/shelfWhyNot/shelfGrp/BAL.shelf.groups/shelfView) | claims kit-display-room.
Branch review/kit-display-room, sha c35952b7 (from origin/main e503c53e). KIT §87 kitDisplayRoom, dev/build/jdisp.js (last module), KIT.md + kit page sample §87, KIT_NUMBERS, KIT_REQUESTS (art requests).
Built: rail icon "Nơi trưng bày" (kitStageRail id disp; hidden until real shelf API on main; placeholder ico-room); full-screen room between hud and bar (kv2 = 2 cols x 6, else 1 col x 12 scrolling); cut-out piece on plank, no item frame, dashed empty; drawer (only that group's owned pieces, Tư trang slot grid, Xa xỉ, "Vượt phẩm" mark, imperial may be placed) -> kitItemCard act "Trưng bày"; placed piece -> "Cất xuống"; read-only NPC view (no drawer; known from shelfView).
Test: node dev/test/display-room.js <url> - [fold,ipadAir,ipadPro,foldLand]: all PASS (HOST mode, fixture data, 0 page errors). media-check 0, img-allowlist OK.
Shots: CDN img/_review/kit-display-room/ (disp-fold, disp-fold-drawer, disp-ipadAir, disp-ipadAir-drawer .jpg). Verdict giver wipes them.
Not done / for main: BAL.shelf.ui flip + removing interim shelfOpen is the display-shelf builder's step after review; NPC entry point (person card / visit) not wired; painted backdrop/plank/icon = ART REQUESTS (KIT_REQUESTS). Never shows sc vs allowance. 1366x1024 = ipadPro PASS; 412x1058 / 390x844 skipped (narrow portrait = rotate prompt, OD:L339).
START_CTX est. ~10% -> ended ~40%; no rollover needed.
~85% xong / ~70% chơi được (waits on display-shelf API landing + art).
