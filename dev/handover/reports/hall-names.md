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

## FIX 1 (review E3r FAIL b5315ff) — head cfe819b (origin/main 9bbd78b merged in, no force push)
1. jplx.js: place `cnh` n = HALL_SRV "Tích Cần viện", fn = "dãy nhà cung nhân, chỗ ăn ngủ…" (role in the existing place function word); plxPlaceMsg → "Tích Cần viện vắng, …". Dư đồ pin reads "Tích Cần viện" (iPad shot, looked at). act-split-scan PLN updated.
2. jkc2.js Nam Chiếu court: P.dien = HALL_NC "Quân Ân điện" (added in jhall.js). Bắc Địch keeps "Kim trướng của phụ hãn" (not a bare role).
3. hall-names-scan.js also flags bare "Chính điện" / "Dãy nhà cung nhân" strings in dev/build and checks HALL_NC/HALL_SRV uniqueness: 42 plaques unique, 0 leaks, OK. index.html/sw.js rebuilt.
4. Shots: CDN 401 and images not in git → local only (/home/user/wt/hn-shots, iPad 1180x820@2 + Fold 755x1000@2 earlier). Looked at: Dư đồ pin "Tích Cần viện", hall list rows with role subtitle, room title "Dưỡng Xuân hiên · Cảnh Phúc cung". The test's Thánh chỉ modal covers part of the screens. Edge-clipped iPad hotspot labels could not be judged without real pictures (CDN 401); placement is pre-existing, untouched. Sổ line verified by code reading only.

---
# ROOT-63 JOB 2 re-issue (19/11, worker session_01Rc5AsJqjDM27hysYd7E48b, child of C-AG #20) — head c294e1d (on origin/main f43a2ba6)
START_CTX ~3 % (get_session read 0; own estimate). depth 8.
PRIORITY #1 CHECK ('tên điện'): OD 0 | ledger 0 | claims 0 | main 0 | review/* 0 | archive 0 (foreman's line) — FINER keywords: ('Chính điện|chinh dien') OD 8 | main 15 | archive 9; ('phối điện') OD 6 | main 15; ('residence|palace name|hall name') OD 23 | ledger 7 | claims 8 | main 15 | review/* 7.
→ GATE ZERO FINDING: PARKING LOT row 3 was ALREADY BUILT AND LANDED: E3's review/hall-names (above, PASS cfe819b) is on main as dev/build/jhall.js (HALL_PN one table, hallName/hallRole, HALL_SRV "Tích Cần viện", HALL_NC), wired into jpm (hall list, Dư đồ pins, room title), jres resRoomName, jplx, jkc2; jmapz adds Càn Ninh + Đức Thọ halls. History expert report = hall-names-history.md. The parking-lot row was never marked "moved out", so it was re-issued. Nothing rebuilt. MAIN: please mark PARKING_LOT row 3 "BUILT 18/11 (E3, jhall.js on main)".

## What this re-issue added (gaps only, small)
1. RED TEST FIXED: dev/test/hall-names-scan.js was FAILING on main since map-zones r2 (7e398b9) trimmed 13 → 10 palaces — the test regex read the dropped palaces from a jpal.js comment. Now reads the live list (j26 rivalSlots + the `const PAL_WEST=` code line) and also checks the Càn Ninh / Đức Thọ hall sets from jmapz.js: 10 palaces, 38 plaques unique, OK.
2. RESIDENCE LINES (OD:L1474 "residence lines" — whole group): people lines still said generic "thiên điện <cung>" though each co-resident lives in a known Đông/Tây hall.
   - jres.js `resHallOf(p)` = plaque of p's side hall (from residenceOf, null otherwise).
   - j27 `houseName(p)` side resident → "<plaque> · <palace>" (fallback "thiên điện <palace>" only when unknown). Used by palace-move log lines (jpal), tai mắt line (jtsb), epidemic etc.
   - j27 palace list line (Dư đồ / place list `d`): " · thiên điện: A, B" → " · Nhã Vận hiên: A · Thanh Thu trai: B".
   - j27 palace-screen visit line: "(Thường tại, thiên điện)" → "(Thường tại, Nhã Vận hiên)".
   - Same-house sentences (j6 rvButtons, j15, j78, jhc): "Cùng thiên điện X với ngươi" → "Cùng <palace> với ngươi" via new `houseCung(p)` (two housemates live in DIFFERENT halls of one palace; "cùng cung" 同宮 is the court phrase — history check below). Scan test now flags any "Cùng ${houseName(" leak.
   Not changed: palName "thiên điện của <name>" for a lone low consort's own r<id> house and the j65 roster group "thiên điện riêng" (no hall exists for those houses); jpal "^Ở thiên điện" prefix (other code matches it).

## Before / after
| place | before | after |
|---|---|---|
| houseName (logs, tai mắt) | thiên điện Cảnh Phúc cung | Dưỡng Xuân hiên · Cảnh Phúc cung |
| palace list line | Chủ vị Phi X · thiên điện: Y | Chủ vị Phi X · Nhã Vận hiên: Y |
| palace screen line | Y (Thường tại, thiên điện) | Y (Thường tại, Nhã Vận hiên) |
| housemate card note | Cùng thiên điện Cảnh Phúc cung (cung ngươi) với ngươi | Cùng Cảnh Phúc cung với ngươi |
| hall-names-scan.js | FAIL (3 dropped palaces) | OK, 38 plaques unique |

## History expert (law 8, subagent, run FIRST — verbatim gist)
1. Qing records name a lower consort's home by the palace ("某貴人住某宮") or "某宮東配殿/西配殿", or by her head ("隨某妃居住"); side-hall plaque names almost never appear in residence records — plaques were architectural names, not addresses. "<plaque> · <palace>" is a reasonable game convenience, not period speech.
2. "The people of ___" → palace name. 3. 同宮 / "cùng cung" is exactly right for two consorts in different side halls of one palace; the head is the 一宮主位 with loose oversight of 隨居者.
4. PLAQUE PATTERN CAVEAT: real side halls of the six palaces, when plaqued, were 殿 (Trường Xuân 綏壽殿/承禧殿, Dực Khôn 延洪殿/元和殿, Trữ Tú 養和殿/綏福殿); 軒/齋 exist (麗景軒, 漱芳齋, 倦勤齋) but on rear/leisure halls; servants lived in 圍房/耳房/值房 (a virtue-named 院 is not period).
   Recommendation: keep 軒/齋 as flavour or move side halls to 殿 names; show the plaque as a sign; use "cùng cung" between housemates.
→ Applied now: "cùng cung" (pt 3). NOT applied (changes a landed, PASSed table = law 16, owner/main call): side-hall suffix hiên/trai → điện, and "Tích Cần viện" → a 值房-style name. OPEN QUESTION FOR MAIN: rename the 20+2 side halls to "… điện" (data-only, one table, ~10 min) or keep the E3 pattern?

## Tests
- node dev/test/hall-names-scan.js → OK (10 palaces, 38 plaques unique, 0 leaks).
- node dev/test/hall-names-lines.js <url> 755x1000@2 / 1180x820@2 → HALL-NAMES LINES OK on both (0 page errors, no overflow).
- bash dev/tools/quickcheck.sh → QUICKCHECK PASS · open 1517 ms · old save ok · CORE GATES PASS · TIME-SPILL PASS (the "NOT BUILT" flag was the uncommitted rebuild; index.html/sw.js committed after).
- Shots (LOOKED): CDN img/_review/hall-names/fold-1-visit.jpg + ipad-1-visit.jpg — palace screen of Khải Tường cung (title "Sùng Đức điện · Khải Tường cung"); iPad toast reads "Khải Tường cung: Hạ Họa Mi (Phi, chủ vị), Lý Bạch Lộ (Thường tại, Nhã Vận hiên)." (Fold: toast already faded at shot time; text asserted by the test). Wipe after verdict.
- No new kit part, no CSS, no number (law 4/9 untouched). VANPHONG: no %, no odds words.

SẴN SÀNG KIỂM c294e1d (review/hall-names).
