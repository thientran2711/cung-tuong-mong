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

---
# Re-review cfe819b — PASS cfe819b
PRIORITY #1 CHECK: OD L1475 + L1327 | main none | review/hall-names cfe819b (FIX 1 of b5315ff) | claims E3 session_01DgYSWpUv86PhL9wq2MeDFC

Independent (own scan + own run, report not trusted). origin/main (9bbd78b) is an ancestor of cfe819b (merge 4ae2758), so the coordinator can fast-forward.

## Earlier fixes, each checked in code
1. cnh: dev/build/jplx.js:17 `n:HALL_SRV` ("Tích Cần viện"); role only in the place function word `fn`; plxPlaceMsg (jplx.js:72) = HALL_SRV + " vắng, …". DONE. Dư đồ pin reads "Tích Cần viện" (iPad shot, looked at).
2. Nam Chiếu: jkc2.js:19 `P.dien:HALL_NC` = "Quân Ân điện" (jhall.js:25); jhall loads before jkc2 in assemble.py (no TDZ). Bắc Địch "Kim trướng của phụ hãn" is not a bare role. DONE.
3. hall-names-scan.js now also flags bare "Chính điện"/"Dãy nhà cung nhân" and checks HALL_NC/HALL_SRV: own run = 13 palaces, 42 plaques unique, OK. My own grep of dev/build for 'Dãy nhà|phối điện|Chính điện': remaining hits are comments, proper names (Cần Chính điện, Dưỡng Hòa điện) and generic nouns in sentences ("giữa chính điện" in jworld.js:94) — no place label left. DONE.
4. Shots: see below (partly done, non-blocking).

## Tests
- bash dev/tools/quickcheck.sh: PASS · 172 s · open 1475 ms · old save ok · perf render 180/233 ms, tab 414/489, buổi 1132/932, tasks>200ms 15/17 · core gates PASS.
- Rebuild (assemble.py) leaves the tree clean; index.html holds "Quân Ân điện" and "Tích Cần viện".
- palace-map.js iPad 1180x820@2 (file:// URL, CDN 401 → grey/no pictures): 0 page errors, no overflow; hall list spots "Thể Hòa điện / Dưỡng Xuân hiên / Thanh Thu trai" (+ bóng người chips); room title "Dưỡng Xuân hiên · Cảnh Phúc cung" (+ role "Đông phối điện." as the small line after it); LOOKED at the room shot and the Dư đồ shot (pin "Tích Cần viện · 2 bóng · 2 khắc" readable). No kit/CSS diff in jpm.js (only strings/hallName calls).
- VANPHONG: no % / odds words added.

## Not done / limits (honest)
- The iPad shots of the hall list and detail came out covered by the title art / a Thánh chỉ modal from the test's promotion; hall-list names verified from DOM text instead. Fold 755x1000@2 not re-shot this round (parallel run timed out under CPU load; earlier round already shot Fold). Sổ line: code path only.
- Edge-clipped iPad hotspot labels: cannot be judged without the real pictures (CDN 401). The diff does not touch any hotspot box (b.x/y/w/h, KPM_DATA unchanged); label text length is comparable ("Thanh Thu trai" vs "Tây phối điện"), so any clipping is pre-existing placement. Non-blocking; Foreman C / next reviewer with CDN access should look at real pictures.
- Shots stayed local scratch, none in git, nothing uploaded.

## Verdict: PASS cfe819b
