# PROGRESS — review/items-earned (đồ phải có được)

Owner rule 11/14 19:30Z: items are never free/automatic — craft, buy or be given; same for NPCs. Full audit + design: dev/ITEMS_EARNED.md.

## Base
- Branch from origin/main e9e2248f, then merged origin/review/balance 093a869a (the only place j70 hủy dung, j92 trang phục, j83 tác phẩm logic lives). assemble.py = balance order + main's jbd.js (after jkitctl). Root index.html / sw.js kept as main (site not rebuilt here).
- When review/balance reaches main, the diff of this branch is only: dev/build/jveil.js, dev/build/jearn.js, 2 names in assemble.py (after j98, before j84), dev/ITEMS_EARNED.md, this file, dev/shots/items-earned/.

## Done
- jveil.js: veil items (mc<P><g>, mcnt), Tư trang › Mạng che mặt block (kitItem, kpsec, act cards), dialogs Tìm mạng che mặt → Tự tay kết (playArt theu) / Đặt ở Nội vụ phủ / Mua lén ngoài cung / Xin Hoàng hậu, Thái hậu ban; weekly scar card option becomes Đeo / Tháo / Tìm; grade → cover; Vượt phẩm via j92 status (hidden); hặc confiscates; NPC monthly obtain + wear; friends' gifts; emperor bestowal; heal → back to chest; old-save migration (scar.veil → Thường veil of own phẩm).
- jearn.js: wdColInfo stand-in (pre-existing ReferenceError on review/balance); wardrobe base outfit → real starting kit + spare, no phantom candidate, chest replacement after confiscation (plain Nội vụ phủ issue as last resort), Tháo y phục removed, old-save base → real.
- Tests (Playwright, scratchpad items/t2 t4 t5): 686x880@2.2 and 1180x820@2 — new game, scar, buy at Nội vụ phủ, wear; craft through the mini-game (skip) and wear from the scar card; NPC obtains + wears; old save made with the OLD build (free veil flag + base outfits) loads in the new build → veils become items, outfits real; confiscation path; 3–6 buổi played; no page errors, no horizontal overflow.

## Open / for others
- Balance worker: knob notes in ITEMS_EARNED.md (NPC veils slightly raise scarred rivals' Sắc; poison act item-less dose recommendation #15, not changed).
- Kit owner: veil overlay on room-scene figures can sit off the face (jk2b kitFigFx); portraits are fine.
- Wardrobe worker: j92cat (collection) missing on review/balance; jearn's stand-in should be dropped when it lands.
- The modal option renderer shows only costs on every dialog option (hidden-outcome rule); odds for Xin ban / Mua lén are written in the dialog text instead.

SẴN SÀNG KIỂM
