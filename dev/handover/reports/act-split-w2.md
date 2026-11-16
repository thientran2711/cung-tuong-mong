# act-split waves 2 + 3 + Emperor-stroll first "!" slot — review/act-split-w2 @ 30c0931d42fa75ce27f0005e3415c85ecbabf07a (base main bad941b4). SẴN SÀNG KIỂM
Table + family scan: dev/review/act-split-w2.md (branch). Resume: dev/PROGRESS_review-act-split-w2.md. Code: dev/build/jact2.js (new, after jact.js), jact.js (first slots), numbers BAL.ad in jbal2.js.

## What moved (one home per act)
| family | before | after |
|---|---|---|
| festival dialogs | up to 3 per festival: j71 dialog + j31 FESTEV light event (7 festivals, day start) + j7 month event (5, random) | j71 = THE dialog of the day; the light acts (same options/numbers) live at the festival's place on Dư đồ: "!" on the day, place open that day, fire on arrival, once a year (Cần Chính điện: Nguyên đán, Giao thừa, Trùng cửu, Đông chí · Ngự hoa viên: Nguyên tiêu, Trung thu, Hội Phượng, Đoan ngọ · Đức Thọ cung: Thanh minh, Thánh thọ · Dãy nhà cung nhân: Lạp bát, Vu Lan). S.festDone still set at day start |
| same act twice on a festival day (câu đối, đố đèn, đàn, bắn, cược, cháo, thơ, thêu, bánh, dâng lễ) | 31 pairs over all j71 variants | 0 (light option left out when it is this year's j71 act; "Đứng xem rồi về" keeps ≥2 options) |
| Thả đèn | Hành sự card + FESTEV "Thả đèn cầu con" | Hành sự card only, new wish "Cầu con" (same cost/effect) |
| outings with the Emperor (theo hầu lễ tế, lên núi, tảo mộ, thử mũi tên) | inside the festival dialogs | move with them to the festival place |
| Lẻn vào | one home, no night rule | same home; night: odds +BAL.ad.nightSneak (10), caught Danh +BAL.ad.nightCaught (-4); line says so |
| cold-palace call (j7 coldvisit) | random weekly event anywhere | night-only "!" at Trường Môn viện "Tiếng khóc ở Trường Môn viện" (same options, same 12-month rest) |
| Nghe lén câu chuyện | on EVERY consort pop-up at a place + the gossip "!" | one door per place per buổi |
| Emperor stroll "!" | 8–11 in 300 buổi | 33–37 in 300 buổi (always slot 1, BAL.ad.strollP 80); ≤2 per buổi kept |

## Tests (final build)
act-split-w2.js 0 FAIL · act-split-scan.js dup 31 → 0 · act-split-vp.js 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390 ok, 390x844 rotate prompt ok, 0 page errors (shots looked at) · panel-size.js exit 0 · coop-e2e 59/59 · old save loads. Site rebuilt (index.html, sw.js, assets.json).

## ART NEEDED
- None for this branch (existing festival header pictures and place scenes reused).
- Not built: outer outing places (Ngự uyển ngoài, chùa Hộ Quốc) from the wave-1 notes — need an outer Dư đồ picture TAKEN from Phượng Lệnh + a stage picture (art paused). Owner/coordinator decision.

## KIT REQUEST
None (only existing parts: kitHapMark, kitPlaceIcon, kit dialogs, kit option rows).

## Notes
- Pre-existing ONE CORE gap (not changed): accSneakPen (j77) Danh -8/-15 and accSneakO (j41) base odds are typed in code, not BAL.
- The j71 festival dialog remains a fixed-day pop-up (unchanged rule); light acts now need a walk to the "!" place.
