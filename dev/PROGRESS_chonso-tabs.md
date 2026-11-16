# PROGRESS chonso-tabs (branch review/chonso-tabs, base origin/main 2934bede)
Owner (16/11, dev/handover/refs/owner-chonso-tabs.jpg): split title "Chọn sổ" into TWO tabs: solo (3 sổ) | co-op (3 phòng hảo hữu).
- [x] dev/build/j74.js: drawSlots() = kit tab row (`.pctabs.kcattabs.kcstabs` via kitTabRowHTML, same part as shop Mua/Bán, KIT 46) + active pane. "Một mình" = 3 sổ, "Cùng hảo hữu" = 3 phòng (CTM_ROOMS.html). Phúc duyên (#pdwrap) stays under the pane on both tabs.
- [x] Subtitle per tab (SUBH.slots / SUBH.slotsco), set at open and on tab switch.
- [x] Opens on last-played mode: localStorage `ctm-chonso-tab` (set to solo on load/new sổ, to coop on COOP "start"); default = coop only when no solo sổ exists and a room is listed.
- [x] Group scan: only j74 Chọn sổ mixed solo + co-op lists (jcloud Sổ mây only syncs; jcooplobby is actions, not lists). No other panel changed.
- [x] dev/test/save-slots.js: old "6 cards in one list" assertion replaced by tab asserts (tabs, 3+3 cards, subtitle, Phúc duyên reachable, last-mode open, old save/rooms still show).
- [x] site rebuilt (dev/site/build_site.sh).
