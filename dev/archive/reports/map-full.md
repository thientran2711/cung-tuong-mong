# map-full report (worker map-full, 11/17/2026)
PRIORITY #1 CHECK: OD 40 | ledger 7 | claims 8 | main 15 (jmapc.js, jplfs.js) | review/* map-frame-kit (reused, KIT section 85 rewritten in place).
Branch review/map-full @ 44f65e81 (from origin/main). Quickcheck PASS (perf render 250/225 ms, tab 286/296, tasks>200ms 11/11). Trial merge with review/app-edge: branch not on origin yet, not done (to do at review).

Root cause: jplfs.js (33.11) gave every child of .mapv.kside margin-left 56 px and margin-right = column width + 8, so the plan shrank to 509 of 745 px on the Fold; jmapc.js (85.3) put the tools row in a 38 px band above the map; the plan also had a 14 px edge-fade mask.
Fix (one shared part, jmapc.js, KIT 85.1/85.3/85.6): map = position:absolute inset:0 of .mapv, margins neutralised, mask/outline removed; tools row, #krail and #kshR are overlays on it. Courtyard level (.kpmv): painting covers the area (centred, pan sideways), hall rows overlay at the bottom. Place painting level was already full screen. Canvas/scale rule untouched (app-edge owns the side bands: .mapv is 745 of 755 on the Fold because of the shell, not this part).
Scan (node dev/test/map-full.js), map width / page (.mapv) width, before -> after:
- 755x1000: 68.3 % (509/745) -> 100 %, height 95 % (731/769) -> 100 %
- 1180x820, 1366x1024, 412x1058, 390x844: after 100 % / 100 %, tools row overlay, columns inside the page, no horizontal scroll, both palace map and courtyard level (before shots only taken at 755x1000).
Looked at shots: Fold map + courtyard, iPad map, 412 courtyard. Not committed. map-frame-kit.js: toolsAbove now means overlay on the map; PASS at 755 and 1180.
Open points: tap on a courtyard hall label that is off-screen is reached through the bottom hall rows; tools row has no band background (buttons carry their own paper look).
SẴN SÀNG KIỂM 44f65e81 review/map-full
