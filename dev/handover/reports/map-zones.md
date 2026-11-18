# map-zones — Dư đồ zones + zoom/fog + Càn Ninh / Đức Thọ second level + her people where they really are
PRIORITY #1 CHECK: OD 18/11 ~19:25Z (zones), L1409 (courtyard level), L1316 (one ledger S.roster), 19:05Z/19:15Z (grey look-only, «Lẻn vào») | main: j26 MAPH, jpal (5 west), j27 mapSpots, j38 mapFit, jmapc §85, jpm kitPalaceMap (courtyard incl. a painted Càn Ninh courtyard nhat-can-ninh used as ONE hall only), j95 S.roster (every servant has a place + activity per khắc), jplfs kplBack (kit left-rail back) | review/*: map-labels-missing r2 01256d36 (merged, its grey state reused) | claims: none other.

Branch **review/map-zones @ 5692c687** (main 94d11623 + map-labels-missing r2 01256d36). New module dev/build/jmapz.js (last in assemble.py); scan dev/test/map-labels-scan.js extended; KIT.md §85.10.

## What
1. **Zones on the overview** (one kit tag each, same slip, "N bóng" = sum of the members' countAt): **Đông lục cung** (8 east palaces + Trường Môn viện, which stands among them), **Tây lục cung** (5 west), **Nội vụ** (Nội vụ phủ, Tân Giả khố, Tích Cần viện), **Hoàng tử sở** (Đông cung, A ca sở, Thượng thư phòng). Own tags (not grouped): Cần Chính điện, Càn Ninh, Đức Thọ, Dưỡng Hòa điện, Ngự hoa viên, Thái y viện, Ngoại triều, **Kính sự phòng**, her residence + the place she stands in (pulled out of their zone so her crest stays).
   - Change to main's split: **Kính sự phòng stays its own tag**. The painting forced this: it sits at the bottom of the map, far from the other Nội vụ places on the west edge, so a Nội vụ zoom would cover ~70 % x 50 % of the map, which is hardly a zoom. **Trường Môn viện** (lãnh cung) was not in either list; it stands inside the east block, so it goes to Đông lục cung.
   - Names (L1327 check, from memory, no web): Đông/Tây lục cung = the real 東/西六宮 quarters (the game has 8 + 5 palaces, the quarter name is kept); Kính sự phòng, Tân Giả khố and Nội vụ phủ were all offices of 內務府, hence "Nội vụ"; A ca sở = 阿哥所 (the princes' quarters), so the zone is "Hoàng tử sở".
2. **Tap a zone** → the same Dư đồ zooms/pans onto it (FLIP 460 ms x kitPace, reduced motion = instant). Everything else goes under ONE kit fog layer .kmfog: light paper fog by day, dark veil in the buổi tối, feathered edge. Inside the zone every place keeps its own tag with all r2 rules (grey, lock, «Lẻn vào», walk-spill) because they are the same buttons. The cartouche shows the zone name; +/− still work. Back = the kit left-rail back button (§33.11 kplBack) or a tap outside the zone (fog/sky).
3. **Second level Càn Ninh + Đức Thọ** (kitPalaceMap, 3 painted halls; new plaques Mẫu Nghi điện / Khôn Hòa hiên / Thục Thận trai, Từ Khang điện / Di Xuân hiên / An Thọ trai). Each hall = "N bóng người" (unchanged map count) + "K cung nhân" = that household's servants from S.roster, placed by the activity the record gives them (serve → chính; clean/brew/work → Đông; rest/sleep/eat/own deeds ag_* → Tây). The chính row adds "Cung nhân: X trong cung · Y đi vắng". Counts only, no names (hữu duyên). The courtyard only opens while she can walk in. Locked or out of khắc → the old one-hall tap (place card with «Lẻn vào» / walk-spill); r2's lock test caught this and it is fixed.
4. **Her palace**: the servants' row (or her own hall row when she lives in a side hall) names her people where the ledger puts them: "Trong cung: … · Đi vắng: <tên> (ở Thái y viện)". A servant on an errand is already left off her stage (j95 hsvList), so nobody teleports.

## Tests
- dev/tools/quickcheck.sh: **PASS** (open, old save ok, perf new/live render 275/284, tab 535/543, buổi 1785/1733 ms).
- map-labels-scan (r2 checks + zone checks), Fold 755x1000 + iPad 1180x820, day + night: **all PASS**; 4 zones x 2 buổi x 2 sizes, each inner check OK: members visible, 0 overlaps, nothing from outside, fog present, zone total = sum of members; courtyards 13 PASS.
- map-full PASS (5 sizes); map-frame-kit PASS. map-portrait: Fold "hereIn" FAIL is the same on main 94d11623 (baseline run); iPad/1366 PASS.

## Shots (LOOKED 3x) — the CDN refused (proxy 403), so per root53-common they are on the handover branch: dev/handover/shots/map-zones/
fold-/ipad- 1-overview-day, 2-overview-night, 3-zone-dong-fog-day, 4-zone-noivu-fog-night, 5-can-ninh-2nd-level, 6-her-palace-maid-away (all @2). Delete the folder after the verdict.

## Scan table (overview tags, iPad day, one life)
| | before (main) | after |
|---|---|---|
| place tags on the overview | 28–32 | 13 (9 own + 4 zones) |
| label scale at fit (iPad) | .85 (floor) | 1.0 |
| overlaps Fold (map-portrait) | 2 | 0 |

## Open items / for main
- **ART REQUEST (Foreman C)**: Đức Thọ courtyard painting (3 halls). It uses the Càn Ninh courtyard with the kit "tạm" chip until then.
- **C-AG item**: household servants have place-level locations in S.roster but no in-palace daily rhythm (rest/sleep/meals). The rooms come only from the activity code, so Tây phối điện is usually empty; Thái hậu's household is always "serve". The stage draws no household servants of other palaces (j95vis), so a side-hall room line says "N cung nhân đang … ở đây" while the stage stays empty.
- **Existing family issue, not new**: on the courtyard level the side-hall tags at the far left/right of the panned painting are cut at the page edge (every consort courtyard on main does this; the hall rows below list every hall). Belongs to the map-labels courtyard family.
