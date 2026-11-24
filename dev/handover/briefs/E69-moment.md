# E69 — PARKING #9 KHOẢNH KHẮC CHÂN DUNG (collectible special portraits) — expert first, then rules/data build (opus BIG)
PRIORITY #1 CHECK ('khoảnh khắc' / 'portrait moment' / 'keepsake'): OD 0 | main 0 (grep portrait-moment / keepsake collectible = 0) | review/* 0 | claims 0 — reports/parking-audit.md row 9.
Read first: dev/handover/briefs/E-common.md (Foreman E = session_01DgYSWm2Gu8SUSJpayKmy6E). OWNER (verbatim): dev/PARKING_LOT.md row 9 (20/11 ~06:35Z): "Khoảnh khắc chân dung mà, cái này khá là hay. Đưa vào trong bãi đổ." The idea: collectible special painted portraits of each consort (dưới tuyết mai, hồ sen đêm trăng, cầm lồng đèn Thượng Nguyên…), a rare reward like cards. Build order: OD 24/11 ~05:20Z «cứ lôi ra làm tiếp».
STEP 1 EXPERT (OD:L1327; short, in reports/moment.md): real palace painting customs (court painters, 行乐图 leisure portraits, festival scenes) and drama/game patterns for collectible moments. Fit them to the existing seasons, festivals and places.
STEP 2 RULES + DATA on review/moment from the latest origin/main. git grep first and REUSE: seasons, festivals, places, the gallery/Tư trang screens, ITEMS. Build:
- one BAL table of moments (consort × trigger: season/place/festival/event), with how each one is earned (rare; gain-only is fine, it costs khắc); harder at higher rank where it is a trial (law 5);
- the earned portrait really exists as an owned item (law 6c): it can be given, shown or stolen, and is traceable;
- NPCs collect too (law 1);
- show it in the existing gallery using KIT parts only. A card-album part is likely missing: file it in KIT_REQUESTS.md + a FOR MAIN line and STOP that UI piece until KIT READY.
- art: write the art list (consort × moment, prompt notes per dev/art/STYLE_ANCHOR.md) as an ART ORDER for Foreman C in the report + a FOR MAIN line. Do not draw. Until the art exists, use the consort's existing portrait with a «chưa vẽ» guard that never shows a blank.
TESTS: unit for earning + ownership + NPC parity, quickcheck + old save, role-parity ×2, Fold 755x1000 + iPad 1180x820 shots (look at them).
DONE: «SẴN SÀNG KIỂM moment <sha>» (rules/data; UI waits on KIT if needed) to Foreman E + a FOREMAN_E_STATUS line; report reports/moment.md.
