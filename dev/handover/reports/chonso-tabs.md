# Report: Chọn sổ two tabs (review/chonso-tabs)
What: title "Chọn sổ" now has the kit tab row (`kitTabRowHTML`, KIT 46, same part as shop Mua/Bán) at the top: "Một mình" (3 sổ) | "Cùng hảo hữu" (3 phòng). Phúc duyên box stays under the list on both tabs. Per-tab subtitle. Opens on the last-played mode (`ctm-chonso-tab`: solo on load/new sổ, coop on co-op start; first visit: coop only if no sổ and a room exists).
Files: dev/build/j74.js (only code), dev/test/save-slots.js (tab asserts), site rebuilt.
Group scan: no other title/menu panel lists solo + co-op together (jcloud = sync, jcooplobby = actions).
Tests: kit-conform 755x1000 + 1180x820: 0 MIXED/CUSTOM, floats none. save-slots.js 755x1000 + 1180x820 ALL OK (solo/co-op start+continue, old sổ + old room code, 0 page errors, no h-overflow). Shots: dev/handover/reports/chonso-tabs/chonso-{solo,coop}-{755x1000,1180x820}.jpg.
KNOWN GAP (KIT REQUEST, not done): with 3 FULL rows (Kiếp/Tuổi/Ngày + buttons) the iPad 1180x820 panel scrolls inside itself (3 empty/short rows and Phúc duyên fit; Phúc duyên reachable by scroll — tested). Fixing it = compact 2-column rows in the shared `.kslot` card (kit keeper change, both tabs the same).
Handover: nothing pending; START_CTX low, finished well under ceiling.
