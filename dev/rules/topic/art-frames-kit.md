# art-frames-kit — verbatim owner rules

Holds: frames, ornaments, kit art.

Read only when your task touches this topic.

Format: [source:Lnn] = line in the source file (OD = dev/OWNER_DECISIONS.md on the docs branch); the text after the tag is the owner's line, copied unchanged by script. Every rule line lives in exactly ONE file under dev/rules/ (find a tag: grep -rn '\[OD:L123\]' dev/rules). CANON OVERWRITE (owner OD:L1232): when a rule changes, delete the old line and write the new one IN ITS PLACE in the same file; never keep the old one with a 'changed to' note. Headings '### OD:Lnn' are the OD section headings the lines sit under. Generated 11/16/2026 from dev/PRIORITY_RULES.md + dev/art/OWNER_ART_RULES.md (owner rule OD:L1241, low context).

### OD:L7 2026-11-14
[OD:L40] - Stage figures must be BIG (fill stage height, feet on floor, heads near top). One shared frame function for every portrait size — rank ornaments (phoenix, dragon…) visible everywhere (fix once = fixed everywhere). Every rank frame has its own top ornament filling the headroom (smaller for low ranks); portraits cropped tighter. Person card: portrait + relation/stat bars stay visible (sticky) while scrolling actions; bars animate on change. 'Trong cung' block removed from stage → small chips in the top bar (Thái hậu, Hoàng hậu next to Hoàng thượng), full version in Chỉ số sheet.
[OD:L161] - (03:30Z) Owner on Tư trang: act cards (Gánh hàng rong / Soát đồ) lost their bottom border (clipped) — fix in kit for all card rows. Item slots must use per-grade backgrounds, stronger than the pale tints: REUSE the existing consort portrait frame/background art per grade (no new drawing).
### OD:L840 15/11 (session 8) — Owner asks to see the shared pop-up kit
[OD:L841] - Owner (verbatim): "Gửi tôi ảnh kit chung pop up." The kit sample page (#kit) has NO pop-up (KIT §8 kpanel) sample → worker review/kit-popup-sample adds §8 samples (panel with small portrait subject, with event-stage figure, with options, result) to the kit page and produces screenshots for the owner.
### OD:L1090 16/11 (session 8) — KIT FIRST, for everyone (owner, strong)
[OD:L1091] - Owner (verbatim summary): "bạn không hề cập nhật kit chuẩn ... mỗi nơi mỗi thứ khác nhau ... chỗ mới cập nhật thì là hình vuông, nhưng những khung nhân vật ở trên này vẫn theo hình chữ nhật cũ ... bạn không hề làm ở trong một cái kit chuẩn chung. Bây giờ còn có thêm các quản đốc ... mỗi người mỗi ý nữa sao? ... tất cả mọi người, dù là quản đốc hay là chat chính, muốn làm bất cứ cái gì liên quan tới hình ảnh và giao diện là đều phải lấy từ trong kho cái chuẩn cái chung." Screenshot dev/handover/refs/owner-frame-inconsistent.jpg.
[OD:L1097] - Applied now: hc-portrait-34 must change the ONE portrait-frame kit part so header avatar, roster strip, person card and all other portrait frames share the same 3:4 shape.
### OD:L7 2026-11-14
[OD:L180] - (06:40Z) Owner: no Chinese characters in UI — ngự tứ seal shows Vietnamese 'Ngự' in the red square seal.
[OD:L21] - Portrait cards: big 3:4 frame (owner reference ~25% screen width on Fold); inner image SAME size for every rank; top ornaments (phoenix/dragon) fully visible in reserved headroom; main info visible without scrolling on Fold.
[OD:L23] - No round avatars anywhere — rectangles only.
[OD:L42] - Approved: draw a unique top ornament for every rank/role frame (all 8 consort ranks, maid ranks, mamas, eunuchs, Emperor dragon, Thái hậu, princes/princesses, officials, physicians, men, cold palace, stranger); higher = grander.
[OD:L66] - (19:10Z) Owner: identity card origin picture should be a wide landscape picture across the card top with a simple frame (current ornate small frame 'màu mè quá'). Group: same simple wide frame for scene pictures inside cards. Also found: player figure has a cheek mole (fix), 'Đổi thân phận (-100' truncated at 686.
[OD:L70] - (18:55Z) Owner: tassels (tua rua) only on people portraits; act/event/story/item/place pictures use a simple frame without tassel; act pictures larger in their area. Owner also: person-card portrait bigger, filling from card top to the action-tab row.
[OD:L79] - (20:10Z) Owner APPROVED the identity card (wide origin picture, simple frame, pinned choice buttons) — review/identity-card 360f138a; ships with the fold-layout build.
[OD:L80] - (20:15Z) Owner: selected state in face picker ugly (yellow box behind frame + check over crest). Kit: one selected style everywhere — glow following frame outline, slight enlarge, unselected dimmed, small check at bottom-right inside frame; no box.
[OD:L81] - (20:30Z) Owner: selected state = gold glow around the frame is OK; NO check badge.
[OD:L111] - (23:20Z) Owner: act/event pictures must keep a distinct frame per category/type (colour + ornament), no tassel.
[OD:L232] - (04:20Z) Owner: portrait frame (Quý phi) top ornament detached, misaligned → fix in the per-rank frame kit, ornament attached to the frame (review/hau-cung-ui).
[OD:L251] - (05:45Z) Owner: portrait frame — top ornament gaps away from the frame; switching person makes the frame jump, not smooth; position doesn't follow margins → portrait box fixed to one standard, ornament attached to frame, person switch fades 150–200 ms without shifting (review/hau-cung-ui).
### OD:L335 15/11 ~05:45Z (owner, annoyed that workers don't follow the kit)
[OD:L350] - (06:35Z) Portrait frame must show the full jade pendant + tassel (currently cut off at the bottom).
[OD:L365] - (07:50Z) Đáp ứng: settled on IVORY WHITE (warm ivory, not pure white); text/chips use a deeper ivory-champagne code for legibility.
[OD:L375] - (08:40Z) Đáp ứng frame: use the plum-branch wood frame + gold corners (the current Lãnh cung frame style, refreshed, nicely glossy) with ivory brocade inside; the Lãnh cung frame becomes a clearly withered/grey version. The Hoàng quý phi frame must be grander than Quý phi.
[OD:L380] - (09:10Z) Đáp ứng frame: gold too bright → paler, dimmer, smaller (champagne/silver), fitting the lowest rank.
[OD:L410] - (11:30Z) Đáp ứng frame: APPROVED A (old frame + ivory brocade).
[OD:L432] - (12:35Z) Red seal "Trân nữ" (Phượng Lệnh, seal.js, SVG) placed at the top RIGHT corner of the top-bar frame (where owner circled), not covering the quẻ text.
[OD:L530] - (~18:25Z, owner) Tuần lục title: picked vertical variant d4 (title-tuanluc-d4.webp). Replace the small plum-blossom seal at the bottom with the 'Trân nữ' seal (the game's own red seal, jseal.js / KIT §39). Then wire it on the book cover label.
[OD:L503] - [ ] (17:16Z) Small avatars (Tuần lục "Sổ này ghi" and every shared use) have an extra square border around the frame → remove the square, keep only the rank frame. Each person's name in a different colour → one kit style. Handed to session 6.
[OD:L528] - (~18:15Z, owner) Event dialogs just pop up — wants nicer entrance animations. Example: promotion = imperial edict scroll. Main-story (chính tuyến) dialogs: frame style tied to her ORIGIN identity — 9 origins = 9 frame styles, recognisable as main story at a glance. Side stories (phụ tuyến): too many events, asked for ideas. Coordinator sent proposals; waiting for her pick.
### OD:L618 15/11 ~20:15Z — Calendar ideas, Trân nữ seal on event frames, rosy skin mismatch (owner)
[OD:L621] - Event dialog frames: add the Trân nữ seal (kitSeal "TRÂN NỮ" stamp) in a corner of every event frame.
### OD:L640 15/11 ~20:40Z — NPC deaths/replacement, Phế phi họ Lý story, real side stories, fig-bg pick, event name tag (owner)
[OD:L646] - fig-bg: owner picks A = SILK HANGING SCROLL, drawn like a real vertical scroll with a rod at the top and a rod at the bottom (like an edict scroll held vertically); the person is painted ON the scroll. Fix: the Vương gia figure spills outside the scroll — figures too big. Inside the scroll ALL figures are the same size; the Emperor/men need not be taller than the others (tall men make the figure too big for the scroll).
### OD:L648 15/11 ~20:50Z — fig-bg crop rule + card-flip (lật thẻ bài) scene (owner)
[OD:L649] - fig-bg A (silk scroll): wide robes that would spill past the scroll edge are CROPPED to the scroll frame (accepted), never sticking out.
### OD:L1090 16/11 (session 8) — KIT FIRST, for everyone (owner, strong)
[OD:L1098] - (16/11, session 8) Owner (verbatim): "thôi khỏi đi, tôi không có cần cái hình vuông nhân vật này nữa, trả về như ban đầu đi ... chỉ cần dịch cái hình đó đi lên sát với cái tên ở trên là được." → revert the wide frame; card uses the standard frame like everywhere; keep only 'frame right under the name' + roster label fix → review/hc-portrait-revert (C50 replaced).
