# KẾ VỊ · BA ĐƯỜNG (owner 11/14 22:00Z) — j99succ.js

Owner: Nữ đế is NOT a rare roll. When the Emperor dies and her son inherits (or she, as Hoàng hậu / đích mẫu, holds the
succession), she CHOOSES: (a) Con làm vua → Hoàng thái hậu · (b) Nhiếp chính, buông rèm nghe chính · (c) Tự làm vua → Nữ đế.
Each path then plays a short EPILOGUE (3 chapters, story-chapter style, ~3 in-game years each) with its own endings,
at least one RARE ending per path, all recorded in Sổ luân hồi with a title and Phúc duyên.

## 1. When the card appears
- Hook: `emperorDies` (outermost wrapper; j51's heir rule is applied first: Thái tử, else đích tử, else trưởng tử).
- Card shows when the heir is HER son (`!h.v`), or she is Hoàng hậu (rank 7, đích mẫu) and the heir's birth mother is dead /
  in lãnh cung / does not claim the curtain (two-way rule below).
- Otherwise the old endings stand (Thái phi, tuẫn táng…), with the NPC-regency change of §5.
- While the card or an epilogue chapter is open the world is frozen (`S.succ`): no new week, no week book, no other panels.
  Every card is a PEND item (`succ0`, `succC`), so it survives Ghi sổ / Nạp sổ and a reload.

## 2. The choice card (kit ACT CARD rows, odds per ladder; disabled options say why in Cần)
Support counted from live state:
- Nhà quyền thần đứng sau ngươi = each of the 5 houses (j55 `S.trieu.H`) whose head is her father or backs her (`af.me ≥ 40`); `supPow` = sum of their Thế lực.
- Binh quyền = house Đại tướng quân backs her, or the Thị vệ (cấm quân) man is close to her (af or tình ≥ 40).
- Vương gia: ally if tình ≥ 60 (j24 `vgAlly`), else a threat to (b)/(c).
- Phe: members of her harem faction + consorts with thiện cảm ≥ 40 (`allies`).
- Thái hậu → becomes Thái hoàng thái hậu: "không phản đối" = đã băng hà or Thái hậu với ngươi ≥ 60 (≥ 50 for b).

| | Cần | Tốn | Odds (clamped, ladder word) | Được | Mất (hỏng) / Kèm |
|---|---|---|---|---|---|
| (a) Con làm vua | — | — | sure (no word) | Hoàng thái hậu, an hưởng ở Từ Ninh cung | — |
| (b) Nhiếp chính | tân đế < 16 tuổi; Danh ≥ 50; Tâm cơ ≥ 35; ≥ 1 nhà quyền thần; không ở lãnh cung | Bạc −100, Sức −10 | 35 + supPow/5 + (Danh−50)/2 + (Tâm cơ−35)/3 + 3·allies ± Thái hậu (+8/−10) ± vương gia (+5/−8), 15–92 | buông rèm đến khi tân đế 16 tuổi, Danh +8 | hỏng: đại thần không phục, Danh −10, chỉ làm Hoàng thái hậu · kèm: tân đế lớn lên sinh oán vì ngươi giữ quyền |
| (c) Tự làm vua | phẩm Phi trở lên; Danh ≥ 70; Tâm cơ ≥ 60; ≥ 2 nhà quyền thần; binh quyền; Thái hậu không phản đối; Bạc ≥ 300; không ở lãnh cung | Bạc −300, Sức −20 | 20 + supPow/6 + (Danh−70)/2 + (Tâm cơ−60)/2 + 2·allies + 8 (cả hai binh quyền) ± vương gia (+8/−12) − 10 (tân đế đã 16), 5–80 | lên ngôi Nữ đế, đổi niên hiệu | hỏng: binh biến bại lộ, bị phế, ban chết · kèm: vương gia, đại thần dễ khởi binh, thích khách rình rập |

## 3. Epilogue (3 chapters each; chapter choices are EVENT choices → only costs shown, result card shows numbers)
Hidden epilogue meters on `S.succ`: quyền `q`, nguy `an`, lòng người `tam`, mẫu tử `hoa`. Each chapter: +3 years (her age, son, year).
- (a) Hoàng thái hậu: 1 Lễ tôn phong ở Từ Ninh cung · 2 Ngoại thích · 3 Chuyện cũ hậu cung (the living consort who hates her most).
- (b) Nhiếp chính: 1 Buông rèm ở Dưỡng Tâm điện · 2 Vương gia và đại thần · 3 Tân đế mười sáu tuổi (trả rèm hay giữ rèm).
- (c) Nữ đế: 1 Đăng cơ (giữ con làm Thái tử / phế con / đại xá) · 2 Vương gia khởi binh · 3 Thích khách đêm Nguyên tiêu.
(b) failed at the card → path (a) with nguy +1.

## 4. Endings (title = `over()` heading = Sổ luân hồi title; PD via j52 `PD_END`)
| path | ending (title) | when | PD |
|---|---|---|---|
| a | Hoàng thái hậu (Mẫu hậu Hoàng thái hậu if đích mẫu) | default | 40 (30) |
| a | Thái hậu bị giam lỏng | nguy ≥ 4 and mẫu tử ≤ 0 | 20 |
| a | ✦ Thái hoàng thái hậu (RARE) | Đức ≥ 60, mẫu tử ≥ 3, nguy ≤ 1 → 12 % once | 80 |
| b | Nhiếp chính Thái hậu | trả rèm | 55 |
| b | Thái hậu chấp chính | giữ rèm, quyền ≥ 6 and lòng người ≥ 2 | 45 |
| b | Bị ép trả rèm | giữ rèm otherwise | 20 |
| b | ✦ Nhị thánh lâm triều (RARE) | mẫu tử ≥ 3, lòng người ≥ 3, Đức ≥ 50, Tâm cơ ≥ 55 → 10 % once | 90 |
| c | Nữ đế | giữ ngôi, quyền ≥ 6, nguy < 5 | 100 |
| c | Nữ đế thoái vị | nhường ngôi, or giữ ngôi with quyền < 6 | 70 |
| c | Nữ đế bị phế (dies) | giữ ngôi with nguy ≥ 5 | 10 |
| c | ✦ Thiên cổ nhất đế (RARE, bia không chữ) | lòng người ≥ 4, nguy ≤ 2, Danh ≥ 80, Đức ≥ 50 → 8 % once | 150 |
| c | Mưu nghịch bất thành (dies) | (c) roll failed | 5 |
Rare = hidden conditions + one small roll stored on `S.succ.r`; shown as a glowing `✦ … · Cơ duyên hiếm` option (kit `.ksel`).
Sổ luân hồi: localStorage `ctm-succ-book` → "Kết cục kế vị đã gặp: x/12 · kết hiếm x/3" under Các kiếp trước; if j97
`RARE97` is present the three rare endings are also registered there. No carry-over.

## 5. Two-way rule (NPC dowager)
When the heir's birth mother is a living NPC consort and the new emperor is under 16, she takes the curtain by the same
conditions (Danh ≥ 50, Tâm cơ ≥ 35, or trait Tham vọng/Hiểm độc/Kiêu ngạo). Then: the player's pardon roll is 12 harder
(she now holds the court) and the ending text says Tân Thái hậu X buông rèm nhiếp chính; if the player is đích mẫu (Hoàng hậu)
she keeps the title Mẫu hậu Hoàng thái hậu but only "hư vị". If the NPC does not claim and the player is đích mẫu, the card is hers.

## 6. Debug
`succDebug("a"|"b"|"c"|"")` in the console: gives her a son, makes him Thái tử, sets stats for the path, and kills the Emperor.

## 7. Art list (NOT generated yet — coordinator approves; gpt-2-6, folder ba4aecfe, STYLE_ANCHOR rules, portrait + landscape)
Code reads `SUCC_ART[key]` (empty now) → `item.art` in the kit art frame; without it the panel shows her portrait.
1. `succ-card` — DRAWN (pilot): img/ev-tien-de-bang-ha.webp, 16:9, edit of duong-tam-dien-thu-chieu; shown as a wide band via kitSceneArt. Linh cữu tiên đế, ngọc tỷ trên án, ba con đường (card art; night, candles).
2. `succ-a1` — Lễ tôn phong Hoàng thái hậu ở Từ Ninh cung (her 36–50/51+, Thái hậu robe, kim sách).
3. `succ-a2` — Họ ngoại vào triều bái kiến (officials, calm).
4. `succ-a3` — Chuyện cũ hậu cung: phi tần tiên đế quỳ trước điện (calm).
5. `succ-a-end` / `succ-a-rare` — Từ Ninh cung an hưởng · bế cháu đích tôn ngày cháu đăng cơ.
6. `succ-b1` — Buông rèm: rèm châu trước ngai, tân đế nhỏ ngồi trước, nàng sau rèm.
7. `succ-b2` — Vương gia vào điện (men never pink/purple).
8. `succ-b3` — Trả rèm: tân đế 16 tuổi nhận ngọc tỷ.
9. `succ-b-rare` — Nhị thánh lâm triều: hai ngai song song.
10. `succ-c1` — Nữ đế đăng cơ: her in dragon robe (long bào vàng, mũ miện), calm standing, triều thần quỳ.
11. `succ-c2` — Đại tướng dẹp loạn, cờ quân ngoài cổng thành.
12. `succ-c3` — Đêm Nguyên tiêu, đèn lồng, cấm quân hộ giá.
13. `succ-c-end` / `succ-c-rare` — Nữ đế trên ngai rồng · bia không chữ ở lăng.
Each in portrait AND landscape compositions (owner 16:05Z rule for full-screen; panel art 3:4 384x506 for the kit frame).
