# act-split waves 2 + 3 (owner-approved split 16/11: Hậu cung = AI · Hành sự = VIỆC · Dư đồ = ĐI ĐÂU) — review/act-split-w2

Rules followed: OD 16/11 L1123, L1137, L1146 ("!" approved), L1152 (person pop-up on the scene), L1153 (3 waves); wave-1 design notes
(dev/PROGRESS_act-dedupe.md "Wave 2/3 design notes"); flag (2) of the wave-1 report (stroll first slot). ONE CORE: new numbers in `BAL.ad`
(dev/build/jbal2.js), texts print them. Code: `dev/build/jact2.js` (after jact.js) + small change in `dev/build/jact.js` (first slots).

## Inventory (BEFORE) — method
`dev/test/act-split-inv.js`: every festival day (14 FEST keys) × 3 buổi × 2 states: Hành sự deck, every place's pop-up options, the festival
dialogs of the day (j31 FESTEV, j71 fDay7 all variants, jts lantern night), the "!" happenings; plus a plain day vs the night (deck, pop-ups,
locked places). Static grep for outing / sneaking / eavesdropping acts (xuất cung, du ngoạn, chùa, săn, lẻn, nghe lén, rình).

Found (before):
| # | family | copies (before) | note |
|---|---|---|---|
| F1 | festival dialogs | up to THREE for one festival: j71 festival dialog (fixed day, all 14) + j31 FESTEV light event (7: Nguyên đán, Nguyên tiêu, Thanh minh, Hội Phượng, Trung thu, Giao thừa, Lạp bát; pushed at day start) + j7 month event (5: Đoan ngọ, Trùng cửu, Vu Lan, Đông chí, Thánh thọ; any tuần of that month, random pool) | 12 festivals had 2 dialogs |
| F2 | same act in two festival dialogs | Dâng câu đối chúc Tết / Viết câu đối ↔ j71 Thi câu đối; Giải câu đố đèn ↔ Thi đố đèn; Hiến khúc đàn ↔ Thi đàn; Xin thử một mũi tên ↔ Thi bắn; Đặt cược tay thiện xạ / thuyền rồng ↔ j71 Đặt cược; Tự tay nấu cháo ↔ Thi nấu cháo; Làm thơ Trùng cửu ↔ Thi thơ; Tự thêu trăm chữ Thọ ↔ Thi thêu; Gói bánh / Dâng bánh ↔ Thi bánh; Dâng ngọc / Lễ mọn ↔ j71 Dâng lễ | scan: 31 duplicate pairs over all variants |
| F3 | Thả đèn | Hành sự card "Thả đèn hoa đăng" (jts, Bạc -10, wishes) + FESTEV Nguyên tiêu "Thả đèn cầu con" (Bạc -10) on the same night | same act, two homes |
| F4 | outings with the Emperor | Xin theo hầu lễ tế (Đông chí), Theo ngài lên núi (Trùng cửu), Xin về tảo mộ (Thanh minh), Xin thử một mũi tên (Hội Phượng) — only inside F1 dialogs | move with F1 |
| N1 | sneaking | "Lẻn vào" = the locked-place card (j41/j77, map chip + place card, one function accSneak) | already one home; no night rule |
| N2 | cold-palace call | j7 "coldvisit" (text happens AT Trường Môn viện) fired as a random weekly event wherever she was | place act outside its place |
| N3 | eavesdropping at a place | person pop-up "Nghe lén câu chuyện" on EVERY consort's pop-up at a place (one copy per person) + the "!" Nghe lỏm chuyện | same act, N copies |
| — | Xin ân chuẩn về thăm (letter event), j70 "Lẻn vào lúc vắng người" (NPC plot step), jkc outside-road places (chùa Hộ Quốc …, pre-palace map) | single homes | unchanged |

## AFTER — every act and its one home
| # | act (before: where) | after: its one home | how |
|---|---|---|---|
| F1 | j71 festival dialog | unchanged: THE festival dialog of the day (fixed day) | — |
| F1 | j31 FESTEV light events (7) | Dư đồ: the festival's place carries "!" on the festival day, open to her that day; arriving there opens the same options (same numbers), once per festival per year | `AS_LIGHT`, `AD_HAP_FIX`, `AD_HAP_FIRE.fest`; S.festDone still set at day start (Phúc duyên "dự lễ", co-op world key) |
| F1 | j7 festival events (5) | same as above (out of the random pool; PEND kept for old saves) | `freshEvents` filter, `AS_J7F` |
| F2 | light-event option = this year's j71 act | left out that day (the j71 dialog is its home); if fewer than 2 options remain, "Đứng xem rồi về" (không được không mất) is added | `AS_SAME`, `asLightOpts` |
| F3 | FESTEV "Thả đèn cầu con" | Hành sự "Thả đèn hoa đăng" → wish "Cầu con" (Nguyên tiêu; card cost Bạc -10 as before; dễ có thai thêm một tháng) | `tsPanel` wrap |
| F4 | outings with the Emperor | inside the festival light acts at the place (Cần Chính điện / Đức Thọ cung) | moved with F1 |
| N1 | Lẻn vào | unchanged home; at night (last buổi): odds + `BAL.ad.nightSneak` (10), caught: Danh + `BAL.ad.nightCaught` (-4) on top of the place's penalty; the line says so | `accSneakO`, `accSneakPen`, `accSneakLine` wraps |
| N2 | j7 coldvisit | Dư đồ Trường Môn viện, night-only "!" "Tiếng khóc ở Trường Môn viện" (same options, same 12-month rest) | `AD_HAP_FIX`, `AD_HAP_FIRE.cold` |
| N3 | Nghe lén câu chuyện (every pop-up) + Nghe lỏm chuyện ("!") | one door per place per buổi: doing one greys the others ("đã nghe lén ở đây buổi này") | `S.adDoor.__nghe` |
| flag 2 | Emperor's stroll "!" | takes the FIRST slot when he is in the garden (`BAL.ad.strollP` 80); still ≤2 per buổi | jact.js `adHapRoll` |

Festival places: Cần Chính điện (Nguyên đán, Giao thừa, Trùng cửu, Đông chí — the court gathers before the Emperor), Ngự hoa viên
(Nguyên tiêu, Trung thu, Hội Phượng, Đoan ngọ), Đức Thọ cung (Thanh minh, Thánh thọ), Dãy nhà cung nhân (Lạp bát, Vu Lan).
Thất tịch and Vạn thọ have only the j71 dialog (+ the Hành sự lantern card on Thất tịch), so no place mark.

## Family scan (LUẬT SỬA CẢ NHÓM) — `dev/test/act-split-scan.js`, every festival × every j71 variant
| festival | place (after) | festival dialogs on the day before → after (+ at the place) | j71 variants | duplicate acts before → after (sum over variants) | duplicated acts (before) |
|---|---|---|---|---|---|
| Tết Nguyên đán | Cần Chính điện | 2 → 1 (+1 when she goes) | 14 | 1 → 0 | Dâng câu đối chúc Tết |
| Tết Nguyên tiêu | Ngự hoa viên | 2 → 1 (+1 when she goes) | 13 | 15 → 0 | Giải câu đố đèn, Thả đèn cầu con |
| Tiết Thanh minh | Đức Thọ cung | 2 → 1 (+1 when she goes) | 13 | 0 → 0 | — |
| Tết Đoan ngọ | Ngự hoa viên | 2 → 1 (+1 when she goes) | 13 | 3 → 0 | Đặt cược thuyền rồng, Gói bánh ú dâng Thái hậu |
| Hội Phượng (thi cưỡi ngựa bắn cung) | Ngự hoa viên | 2 → 1 (+1 when she goes) | 13 | 4 → 0 | Xin thử một mũi tên, Đặt cược tay thiện xạ |
| Tết Thất tịch | — | 1 → 1 | 13 | 0 → 0 | — |
| Tết Trung thu | Ngự hoa viên | 2 → 1 (+1 when she goes) | 14 | 2 → 0 | Dâng bánh trung thu Thái hậu, Hiến khúc đàn dưới trăng |
| Tết Trùng cửu | Cần Chính điện | 2 → 1 (+1 when she goes) | 13 | 1 → 0 | Làm thơ Trùng cửu |
| Tiết Đông chí | Cần Chính điện | 2 → 1 (+1 when she goes) | 13 | 0 → 0 | — |
| Đêm Giao thừa | Cần Chính điện | 2 → 1 (+1 when she goes) | 13 | 1 → 0 | Viết câu đối mới cho cung |
| Lễ Vu Lan | Dãy nhà cung nhân | 2 → 1 (+1 when she goes) | 13 | 0 → 0 | — |
| Tiết Vạn thọ | — | 1 → 1 | 13 | 0 → 0 | — |
| Lễ Lạp bát | Dãy nhà cung nhân | 2 → 1 (+1 when she goes) | 13 | 1 → 0 | Tự tay nấu cháo phát cho cung nhân |
| Thánh thọ Thái hậu | Đức Thọ cung | 2 → 1 (+1 when she goes) | 13 | 3 → 0 | Dâng ngọc Như Ý, Lễ mọn cho phải phép, Tự thêu trăm chữ Thọ |
Result: duplicate acts after = **0** (before 31); festival dialogs at day start 2 → 1 for 12 festivals; 0 page errors.

## Tests
`act-split-w2.js` 0 FAIL · `act-split-scan.js` dup 31 → 0 · `act-split-vp.js` 6 viewports ok (390x844 rotate prompt) · `panel-size.js` exit 0 · `coop-e2e.js` 59/59 · 0 page errors.
Stroll over 300 buổi (same states, old vs new roll): before 8–11, after 33–37 (Emperor in the garden 42–49), always the first slot, ≤2 per buổi.

## Not done here (proposals, need the owner / art)
- Outer outing places (Ngự uyển ngoài, chùa Hộ Quốc) from the wave-1 notes: NOT added. They need a Dư đồ picture of the outer city, which
  must be TAKEN from Phượng Lệnh (never painted), and a stage picture (art paused tonight). The outings that exist today are all festival acts
  and now live at the festival place. → ART NEEDED.
- Pre-existing ONE CORE gap seen (not changed, other owner): `accSneakPen` (j77) types Danh -8 / -15 and `accSneakO` (j41) types its base odds
  in code, not in BAL.
