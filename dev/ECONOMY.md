# KINH TẾ (owner 15/11, balance v12) — dev/build/jecon.js, mọi số trong BAL (jbal)

Một nguồn: `BAL.pay, wage, duty, banThuong, dutySkip, home, homeEvery, nightBac, patronRel, patronPay, sellPct, noivuPct, craftSell, craftLv,
craftGift, giftLeak, giftHit, priceTier`. j20 (BL, blCard, stipend) và j83 (WVAL, wkSellVal) đọc qua jecon. Mọi phi tần cùng luật.

## 1. Tháng: bổng − công kẻ hầu − lễ nghĩa (free silver ~3–4× từ Đáp ứng tới Hoàng hậu, không phải 10×)
| Bậc | Bổng | Lễ nghĩa | Ban thưởng phi tần dưới | Kẻ hầu (theo phẩm, × 3 bạc) |
|---|---|---|---|---|
| Đáp ứng | 40 | 0 | 0 | ít |
| Thường tại | 55 | 4 | 0 | |
| Quý nhân | 70 | 10 | 0 | |
| Tần | 95 | 18 | 0 | |
| Phi | 125 | 30 | 0 | |
| Quý phi | 165 | 48 | 0 | |
| Hoàng quý phi | 215 | 72 | 20 | |
| Hoàng hậu | 280 | 100 | 40 | nhiều |
- Lễ nghĩa = lễ tiết, thưởng người hầu, tiếp khách. Ban thưởng (HQP, HH) là bạc thật chia cho 2 phi tần dưới mà nàng quý nhất (họ quý nàng hơn +2).
- Thẻ tháng "Bổng lộc tháng …": Bổng +X · Công kẻ hầu −Z · Nhà gửi vào / Việc vặt / Ân thưởng · Còn bạc; có lễ nghĩa thì 2 lựa chọn đủ Tốn/Được/Mất:
  "Chu toàn lễ nghĩa" (Bạc −Y) / "Bớt lễ nghĩa" (Danh −(1 + bậc/2), Đức −1). NPC: đủ bạc thì lo, thiếu thì bớt với cùng giá.
- Lãnh cung 5 bạc, không lễ nghĩa. Cấm túc: nửa bổng, không lễ nghĩa. Khất bổng (Hoàng hậu ghét): × 0,7.

## 2. Thu nhập có nguyên cớ (không may rủi)
- Nhà mẹ đẻ gửi bạc mỗi 3 tháng theo thân phận: Tể tướng 30, Đại tướng quân 20, nhà buôn muối 40, Nam Chiếu 25, cháu Thái hậu 20, thầy đồ 5,
  cung nữ được sủng / tội thần / cung nữ tuyển: 0.
- Đêm tốt: Hoàng thượng ban thưởng kèm 20 bạc (mọi phi tần).
- Người bảo trợ: phi tần cao hơn ≥ 2 bậc, quý nàng (thiện cảm ≥ 40) và có ≥ 40 bạc, trả công việc vặt mỗi tháng 10–22 bạc (bạc thật từ túi người đó).
- Bán tác phẩm tự tay (j83, không phải hệ thứ hai) — xem mục 4.

## 3. Giá chia bậc (BAL.priceTier)
- Thường ngày 3–15: son phấn 8, hương trầm 10, túi thơm 6, đệm gấm 12, thuốc an thai 15.
- Vừa 20–60: yến sào 25, a giao 35, lụa Hàng Châu 30, trâm ngọc 30, vòng ngọc 50, nhân sâm 60, nghiên mực 60, xạ hương 50, thuốc giải độc 60, bột ngứa 30.
- Xa xỉ 100–400: bộ diêu vàng 140, vòng vàng 180, trâm phượng 360, gấm Tô Châu 120, gấm minh hoàng 300, tranh cổ 150, đàn cổ 200, hạc đỉnh hồng 150.
- Đồ có phẩm (IT.rk) dùng trên phẩm vẫn là "vượt phẩm" (dễ bị tố). Trâm / y phục j92: giá theo phẩm WD_PR 12–320.
- Học: phí theo bậc người dạy (5 + bậc × 5, sẵn có ở j2/j23/j83/j85). Chưa đổi.

## 4. Bán đồ — một API cho giao diện (thợ act-pics) và mọi NPC
- `econSellable(p)` → [{ix, k, name, grade, src, price, via, risk, no}] · `econPrice(p,e)` · `econRisk(p,e)` · `econSell(p,ix)` ·
  `econSellUI(ix)` (1 khắc) · `econSellBtn(ix)` (thẻ việc kit đủ Tốn/Được/Kèm).
- Đồ thường: thái giám Nội vụ phủ mua công khai, 50 % giá (BAL.sellPct), không rủi ro.
- Tác phẩm (j83): hai kênh — Nội vụ phủ mua công khai 70 % (BAL.noivuPct), không rủi ro; "Bán ra ngoài cung" (cửa Thần Vũ, j83 wkSell) đủ giá,
  rủi ro buôn lậu của j83. Giá ngoài = (BAL.craftSell[phẩm] 8/14/24/40 + BAL.craftLv 3 × bậc tài nghệ) × cỡ tác phẩm. Phẩm do điểm trò chơi
  + bậc tài nghệ + vật liệu + Công (không xúc xắc). Tặng: quý theo phẩm BAL.craftGift 2/3/5/7; người nhận: Hoàng thượng, Thái hậu, mọi phi tần
  (kể cả Hoàng hậu), cung nữ thân tín — thẻ j83 hiện được bao nhiêu thiện cảm / Sủng / Ân tình.
- Rủi ro chỉ khi có nguyên cớ: bán đồ Hoàng thượng ban → 35 % lộ, Sủng −6 Danh −4 (bất kính); Thái hậu / Hoàng hậu ban → 25 %, quý ngươi −6
  Danh −2. Ngự tứ, kỷ vật: không bán. Trâm / y phục: bán lén qua ma ma / thái giám (j92, lộ ra là túng thiếu).
- Túi Tư trang: mỗi tác phẩm là một ô riêng (tab "Tác phẩm", nền phẩm Thường · Tinh phẩm · Trân phẩm · Tuyệt phẩm), chạm = khung món với
  Dâng/tặng · Bán cho Nội vụ phủ · Bán ra ngoài cung · Bày ở yến tiệc.

## 5. Chưa làm (cần thợ hành sự / act-pics)
- Mưu kế tốn bạc theo người bị nhắm (cao phẩm / canh phòng kỹ thì đắt hơn): giá thẻ ACT.c còn cố định (lygian 20, spy 15, bribe 40…); cần
  sửa chỗ thẻ đọc và trả ACT.c theo đích. Đề xuất: bạc × (1 + 0,15 × bậc đích + 0,1 × số kẻ hầu trung thành của đích).
- Đường không tốn bạc cho phẩm thấp (khắc, Tâm cơ, lòng kẻ hầu, ơn người khác nợ) và "phẩm cao bị nhiều mắt nhìn hơn": cần thiết kế thẻ việc.

## Số đo bot (e3: 40 đời, bot sensible, HHSTOP, 15/11)
HH 45 %, chết sớm 45 % (trong đích); năm tới HH 4,4 / 6,0 / 7,5. Bạc của nàng lúc nhận bổng: trung vị 3 ở mọi bậc (bot tiêu hết, ~13 nghìn bạc
vào/ra mỗi đời) — tiền không ứ ở bậc cao nữa.
Tiền rảnh mỗi tháng (bổng − công − lễ nghĩa, tháng không cấm túc), và mua được bao nhiêu mỗi tháng:
| Bậc | tháng đo | tiền rảnh | đồ thường (10) | đồ vừa (40) | xa xỉ (200) | mưu kế (~30) |
|---|---|---|---|---|---|---|
| Đáp ứng | 74 | 40 | 4 | 1 | 0,2 | 1,3 |
| Thường tại | 150 | 51 | 5 | 1,3 | 0,25 | 1,7 |
| Quý nhân | 210 | 60 | 6 | 1,5 | 0,3 | 2 |
| Tần | 309 | 77 | 7,7 | 1,9 | 0,4 | 2,6 |
| Phi | 237 | 95 | 9,5 | 2,4 | 0,5 | 3,2 |
| Quý phi | 244 | 117 | 12 | 2,9 | 0,6 | 3,9 |
| Hoàng quý phi | 234 | 123 | 12 | 3,1 | 0,6 | 4,1 |
| Hoàng hậu | (2, bot dừng ở HH) | ~140 theo luật | 14 | 3,5 | 0,7 | 4,7 |
Hoàng hậu / Đáp ứng ≈ 3,5× (trước: 320 / 30 = 10×). Ghi chú: kẻ hầu của nàng trong bot hầu như 0 (S.staff trống; cung nữ thân tín là S.maid,
không tính công) nên công kẻ hầu gần như không trừ — lễ nghĩa mới là phần tăng theo phẩm. Cấm túc rất hay (bổng nửa) ở bậc thấp.
Đo lại: `OUT=dir bash dev/measure/run5e.sh <game> <nhãn> 8`, rồi `python3 dev/measure/anecon.py dir/<nhãn>_?.json`, `python3 dev/measure/anx.py <nhãn> dir/<nhãn>_?.json`.
