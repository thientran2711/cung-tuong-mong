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

## Nổi mẩn (dị ứng) — jrash.js (coordinator request after the veil)
- p.rash {sev 1–3, until tuần, how, by, tr} for everyone. Causes: j68f springAllergy event choices (15/30/55% by choice), monthly spring pollen roll (4%), bad luck (1%), Son phấn Dương Châu (5%; tainted "pha chì" always), hostile act "Bỏ phấn lạ" (Hại nhỏ, band ≥1 motive gate, Bạc 15, Đức −4, caught()/evidence like other schemes; NPC mindMenu weight 1.2, ×1.5 if target prettier).
- Effects: effSac − 5/10/16 while it lasts (nights/contests follow from Sắc); heals 1/2/3–4 tuần; one tuần faster per tuần under Thái y medicine (Bạc 15, 2 tuần) or self-brewed herbs (odds by Y thuật) or Y thuật ≥2; NPCs 30%/tuần or Y ≥2.
- Veil works for rash (jveil vlNeed = scar or rash): same grade cover, same Vượt phẩm rule; healed → veil back to chest.
- Her card "Nổi mẩn" (every 3 tuần while it lasts): thái y / thảo mộc / đeo-tháo-tìm mạng / để tự khỏi. Person-card chip "Nổi mẩn (vừa) · còn N tuần" when known.
- Overlay art PILOT (gpt-2-6, Magnific folder ba4aecfe; red-on-white paintings turned transparent, edge fade): img/rash-1..3.png; placed from veil-fit boxes (KIT_RASH.style); layer portrait < rash < scar < veil < frame. Pilot sheets: dev/shots/rash-pilot/pilot-c05.jpg, pilot-c18.jpg (lành / nhẹ / vừa / nặng / nặng + mạng). KIT_RASH.ready=false until approved → logic live, picture hidden. To ship: set ready true.
- (15/11, owner 00:25Z) Nấc 1 (nhẹ) trông như má hồng → vẽ lại img/rash-1.png (gpt-2-6, ref = raw nấc 2 + raw nấc 1 cũ): cụm nốt đỏ nhỏ rời, hơi nổi trên hai má + 5–7 nốt ở trán + vài nốt cằm, chỉ một lớp hồng rất nhạt giữa các nốt; cùng mkalpha.py (gain 1). Nấc 2, 3 đã duyệt, giữ nguyên. Tờ thử c05/c18 vẽ lại.
- Tests 686x880@2.2 + 1180x820@2: act (caught path), card, veil cover 16→8, heal → veil to chest, NPC rash → obtains veil; no errors/overflow.
