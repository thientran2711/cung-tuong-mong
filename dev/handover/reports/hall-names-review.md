# hall-names review (E3r) — FAIL b5315ff

PRIORITY #1 CHECK: OD L1475 + L1327 | main none | review/* review/hall-names b5315ff | claims E3 session_01DgYSWpUv86PhL9wq2MeDFC

## Verdict: FAIL b5315ff (one whole-group miss; rest is good)

## Checks
1. Own scan of dev/build for 'phối điện' / 'Chính điện' / 'Dãy nhà' / role words:
   - OK: kpmParts (hall list + hotspot labels), placeOf room title, resRoomName (Sổ / residence line), Càn Ninh row read hallName(); KPM_PN / RES_PART_N alias HALL_ROLE.
   - MISS A (blocking): dev/build/jplx.js:17 `cnh:{n:"Dãy nhà cung nhân",...}` and jplx.js:72 `plxPlaceMsg` "Dãy nhà vắng, cung nhân đang làm việc." — the servants' row as a Hành sự / Dư đồ place still shows the bare role; the new table names this same building "Tích Cần viện". Place banner, place list and pin for cnh must read HALL_SRV (role as small subtitle).
   - MISS B (minor, decide/justify): dev/build/jkc2.js:19 `P.dien:"Chính điện"` (Nam Chiếu court label) is a bare role as a place label. Foreign court, outside HALL_PN scope — either give it a court name or note it as intentional in the report.
   - Scan test hall-names-scan.js only greps 'Đông/Tây phối điện'; extend it to also catch `Dãy nhà cung nhân` and `"Chính điện"` as place labels so MISS A/B cannot return.
2. Names: 41 unique, 13 palaces + Càn Ninh + Tích Cần viện, ≠ palace names, Hán-Việt court style, Đông=hiên/Tây=trai pattern, no Vietnamese flavour. PASS. Role only as small subtitle via existing `.kpm-rs` line / title attr / room line; no new CSS or kit part (diff has no CSS). PASS.
3. VANPHONG: no %, no odds words added. PASS.
4. Old save: quickcheck PASS (open 1413 ms, old save ok, 0 errors, core gates, time-spill guard); node dev/test/hall-names-scan.js OK.
5. Shots (own script, host mode, no-net grey pictures, local scratch, not uploaded, none in git): Fold 755x1000@2.6 and iPad 1180x820@2.6 — Dư đồ palace detail with hall list (3 rows, names + role subtitle), room title "Dưỡng Xuân hiên · Cảnh Phúc cung · Đông phối điện", 0 page errors, 0 overflow. LOOKED at each: names read correctly. Observation (non-blocking, probably pre-existing placement): on iPad the Tây/Đông hotspot labels sit at the very edge of the picture and are clipped ("Thu trai / g người", "Đ…"); worker should check with real pictures. Sổ residence-line shot not taken (no Sổ tab on this build path); code path resRoomName verified by reading.

## Numbered fixes for the worker
1. jplx.js cnh `n` (and plxPlaceMsg text, any banner/list built from it) → hallName/HALL_SRV "Tích Cần viện", subtitle = role "Dãy nhà cung nhân" through the existing kit caption.
2. jkc2.js P.dien: court name or documented exception.
3. Extend hall-names-scan.js to the generic roles named above; rerun; rebuild index.html/sw.js.
4. Upload Fold + iPad shots (hall list, Dư đồ, room title, Sổ line, cnh place banner) to CDN img/_review/hall-names/ and check the edge-clipped hotspot labels on iPad with real pictures.
