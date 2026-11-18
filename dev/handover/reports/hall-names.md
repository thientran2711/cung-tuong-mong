# E3 hall-names — report
PRIORITY #1 CHECK: OD L1475 + L1327 + 20:20Z names rule | main none (generic role strings only) | review/* none (review/names-unique not present on origin) | claims E3 only.
Branch review/hall-names @ b5315ff (from origin/main 94a9375). History: hall-names-history.md.

## What
- `dev/build/jhall.js` (new, assembled before jres.js): ONE table `HALL_PN` (13 palaces + Càn Ninh cung → unique court names; chính=điện, Đông=hiên, Tây=trai; servants' row = Tích Cần viện), `hallName(palace,part)`, `hallRole(part)`. Display-only; ids/slots/saves untouched; unknown palace falls back to the old role (never blank).
- Wired: `kpmParts` (hall list rows + Dư đồ hotspot labels), `placeOf` room title in jpm.js; `resRoomName` (Sổ / residence line) in jres.js; KPM_PN/RES_PART_N now alias HALL_ROLE. Role = small subtitle: first words of the existing `.kpm-rs` row line, hotspot title, room line after the place name (KIT §15.1). No new kit part, no new CSS.
- KIT.md §76 note added. Test `node dev/test/hall-names-scan.js`: 13 palaces, 41 plaques unique and ≠ palace names, 0 leftover bare role strings → OK.

## Before / after (scan)
| place | before | after |
|---|---|---|
| hall row / hotspot | Chính điện / Đông phối điện / Tây phối điện | Thể Hòa điện / Dưỡng Xuân hiên / Thanh Thu trai (Cảnh Phúc), subtitle = role |
| room title | Cảnh Phúc cung · Đông phối điện | Dưỡng Xuân hiên · Cảnh Phúc cung |
| Sổ residence | Đông phối điện · palace | hall name · palace |
| Càn Ninh | Chính điện | Mẫu Nghi điện · Càn Ninh cung |
| servants' row | Dãy nhà cung nhân | Tích Cần viện (role subtitle) |

## Not changed (reason)
Palaces, Cần Chính điện, Dưỡng Hòa điện, Ngự hoa viên spots (Thiên Thu, Thủy Tạ, Thái Dịch trì…) are already proper names. Sentences "cùng thiên điện X với ngươi" (houseName) use "thiên điện" as a generic noun for the house, not a place label — left.

## Tests / shots
palace-map.js on Fold 755x1000@2 and iPad 1180x820@2: no page errors, no overflow, titles/rows as above (shot fold-2-detail shows the 3 rows with subtitles). Shots kept outside git (/home/user/wt/hn-shots); NOT uploaded to CDN (stayed local — foreman may re-run `node dev/test/palace-map.js`). Shots still carry a Thánh chỉ modal from the test's promotion; names visible. 1366/412/390 not run.
Old saves: no data change. index.html/sw.js rebuilt.

~ done / ready for check.
