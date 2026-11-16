# PROGRESS review/act-dedupe (opus) — owner-approved split 16/11, WAVE 1
Rules: OWNER_DECISIONS 16/11 (L1137 Hành sự vs Dư đồ answer, L1146 corrections, L1152-1153 pop-up + split approved).

## Done (wave 1) — code `dev/build/jact.js` (loaded last), table `dev/review/act-dedupe.md` §(e)
1. Dedupe + Tài nghệ removal: no study cards in Hành sự; every pool card dealt (all daily tasks in view); grey card tap = reason popover (kpPop);
   shared doors (Thỉnh an ×2, Kính sự phòng bribe, maid spying/talk) with one lock; removed copies (Phát chẩn, Tụng kinh, Đánh đàn ở ngự hoa viên,
   Chữa bệnh cho con → Hoàng tự, Học hỏi y lý, Đưa cơm áo, maid "Tâm sự" twin); person-act twins renamed to the ACT name.
2. Place icons: kitPlaceIcon (KIT §78) on map labels, list tiles, stage title.
3. "!" happenings: S.adHap per buổi (≤2): Hoàng thượng dạo vườn (PEND.adStroll), hai phi tần cãi nhau (j7 rvquarrel), nghe lỏm (j78 intelLearn,
   free), có người nhờ việc (j72 q72Choose/q72Offer at the requester's place). Fired on arrival. j95 secrets is not on main (not reused).
4. Nội vụ phủ place + kitShopNvp + weekly rare item (S.adRare, stock 1).
Co-op: S.adDoor / S.adHap / S.adRare are personal keys; no world agency. Old saves: all lazy.

## KIT REQUEST (stop-list for the kit keeper)
- Missing place glyphs in the kit icon set: Kính sự phòng (thẻ bài), Lãnh cung, tẩm cung / cung phi tần. Ngự hoa viên uses `hoa` (plum + brush);
  a garden glyph would read better.
- KIT section number for kitPlaceIcon + kitHapMark (was provisional §71; FINAL §78 per kit keeper 16/11) and confirmation of the `.khap` look.
- ART REQUEST: Nội vụ phủ has no scene picture (uses the Kính sự phòng office picture, sc "ksp").

## Wave 2 design notes (outings, festivals) — separate branch later
- Outings: Dư đồ gains 1-2 outer places reachable only by permission (Ngự uyển ngoài, chùa Hộ Quốc) with a whole-buổi cost; reuse j71 festival
  map pictures (FEST) and j68 'fest'/'sea' families as the place happenings; a festival day marks its place with "!" automatically.
- Festivals: FEST days turn the map picture (exists) and add a fixed happening per festival at its place (yến tiệc → Múa trong yến tiệc there
  with a bonus; Thất tịch at Ngự hoa viên). No new currencies.
## Wave 3 design notes (night sneaking)
- Buổi tối: walking to a place she cannot enter uses the existing accSneak odds (j41 Lẻn vào) with night modifiers (fewer guards, more risk if seen);
  night-only happenings (gặp riêng, nghe lén ở Lãnh cung) from j68 'myst'. Respect co-op host authority (sneaking is her act; results are her state).

## Tests (see report)
- `act-dedupe-deck.js` (24 deals x 3 buổi x 5 states): Hành sự 26 → 23 names. Removed: 4 Tự học, Phát chẩn, Tụng kinh, Đánh đàn ở ngự hoa viên.
  Added: Sai cung nữ đi dò la, Nghe ngóng chung (maid acts, shared doors). Tài nghệ unchanged (3/3/3). 0 page errors.
- `act-dedupe-w1.js`: 19/19 ok (doors, removals, Nội vụ phủ + rare, icons, no faces, happenings 23/40 fired: quarrel/gossip/favour, re-roll).
- `act-dedupe-vp.js` 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: all ok (cards not clipped, grey tap → reason popover inside the screen,
  map/list icons + "!", shop opens with the rare item). 390x844 = rotate prompt (KIT §0).
- `act-dedupe-bot.js` 4 lives x 8 tuần: 0 dead ends, 0 page errors, no study card played, happenings fired (quarrel 3, gossip 1).
  The emperor-stroll happening needs Hoàng thượng in Ngự hoa viên (S.where.emp) — rare in 8 tuần; checked by code path only.
Build: `python3 dev/build/assemble.py` (jact.js appended last). Test page needs `<meta charset="utf-8">` when served by python http.server.
