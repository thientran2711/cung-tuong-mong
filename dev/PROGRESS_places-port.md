# PROGRESS: places leftovers (D42) — branch review/places-port

Built on review/palace-map-port-r1 (PASS 306de247, already contains current origin/main a523531da). Spec: OWNER_DECISIONS L82, L86, L87; dev/PLACES_PLAN.md (review/places).
Not re-ported from review/places: its rejected pilot art and its unapproved c3 candidate for "Dãy nhà cung nhân" (owner never approved it); the approved residence painting
`cung-nhan` (already on the CDN, owner-approved in D30) is used instead.

## What changed
- `dev/build/jplx.js` (assemble: last, after jpm). Five places on the whole-palace Dư đồ, boxes from PLACES_PLAN §1/§5:
  `cnh` Dãy nhà cung nhân (art `cung-nhan-*`, existing), `tgk` Tân Giả khố = Hoán y cục (art `tan-gia-kho-*`, existing; now reachable from the map),
  `ttp` Thượng thư phòng = học đường (new art), `acs` A ca sở (new art), `dc` Đông cung (new art).
  Wrapped (no old module edited): places, PLNAME, MAPH.places, mapPos (walk cost), mapHTMLgrid (list view), mapSpots (small labels), SCN_HAVE/SCIMG/KIT_FLOOR, ACC_ROLE, goTo, countAt, homePeople, pFaceOf, placeEnterHook.
- Children by age (OD L87), computed fresh every buổi, nothing stored (old saves load): under 6 with the mother; prince 6-17: sáng at Thượng thư phòng, other buổi at A ca sở;
  Thái tử (6+): at Đông cung (sáng at the study); princess 6-17: sáng at Thượng thư phòng, then with the mother. Children of every mother (hers + rivals') show in these rooms;
  her own kids who moved out are removed from the home stage/count. The Dư đồ count of each new place = the people shown on arrival (same list).
- Access (ACC_ROLE, VANPHONG words): cnh by day (night: closed, cung nhân only; maid road may always enter); tgk Quý nhân+ (else Lẻn vào); ttp/acs Tần+ or a mother of a student/prince, by day;
  dc mother of the Thái tử / Hoàng hậu (else Xin bái kiến); night closed.
- Co-op: only S.place / S.where travel (state only); the friend appears at these places through the existing where ledger. No graphics sent.
- Art (Magnific gpt-2-6, folder ba4aecfe..., EDITS of approved scenes: kinh-su-phong -> Thượng thư phòng, chung-tu-cung-dong-phoi -> A ca sở, chung-tu-cung -> Đông cung;
  2 base candidates each, looked at, chose ttp2 / acs2 / dc1; 15 season x buổi edits per room with dev/art/residence_prompts.txt wording; all 48 looked at on contact sheets
  dev/art/places_work/sheet-*.jpg). 51 files (48 + 3 fallbacks `<name>.webp`) 1280x720 q72, 8.9 MB total, uploaded with cdn_sync. Credits: 51 x 40 = ~2.0k.
  Gens/ids: dev/art/places_work/gens.txt; proc: dev/art/places_d42_proc.py.

## Not done / follow-ups
- Ngự thiện phòng, Phật đường, Nội vụ phủ (PLACES_PLAN rows nth/pd/nvp) have no map place or art in main (OWNER_LEDGER row 40 says "live": it is wrong for the map). Not in the D42 list given to me; left out.
- "Thăm con / Cho gọi con về", the monthly estrangement, Thái tử prestige bonus, and orphan children to Thái hậu/Hoàng hậu (PLACES_PLAN §5) need the j95 ledger (D29): not done.
- Sub-picture: Thượng thư phòng morning scrolls are blank in some variants (the "上書房" sign shows only in the spring-morning base).

## KIT REQUEST / KEEPER
No kit part added or changed (labels use the existing .mspot/.mlab; people via existing kit stage). New shared art for the keeper's list:
`thuong-thu-phong-*`, `a-ca-so-*`, `dong-cung-*` (16 + fallback each). KIT_FLOOR set per name (ttp/acs/dc .62).

## Tests (dev/test/places-d42.js; node, own http.server on a free port; 4 CPU box, one browser at a time)
| viewport | 5 spots on map | map count = people on arrival (5 places) | overflow x | page errors |
|---|---|---|---|---|
| 755x1000@2 | yes | yes | none | 0 |
| 1000x755@2 | yes | yes | none | 0 |
| 1180x820@1 | yes | yes | none | 0 |
| 1366x1024@2 | yes | yes | none | 0 |
| 844x390@2 | yes | yes | none | 0 |
| 390x844@2 | yes | yes | none | 0 |
Old save: palace-oldsave.js (previous main build -> this build) ok, new places on the map, 0 errors. Save JSON contains no new fields.
Access check: rank 0 -> tgk/ttp/acs closed (Lẻn vào card), dc Xin bái kiến; rank 4 -> tgk, ttp open, dc closed.
