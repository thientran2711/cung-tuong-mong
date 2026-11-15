# PROGRESS review/pets — thú nuôi có phẩm bậc + Xa xỉ (sếp 15/11 07:35Z)

Nhánh từ origin/review/ts-b (d29e3952c) + gộp origin/main (df5a6010). Mã: `dev/build/jpet.js` (sau jtsb, trước j84). Phần thú nuôi cũ của
jtsb (4 con) đã dời hết sang jpet; jtsb chỉ còn gọi `tsbPetWeek/tsbPetMonth/petGuard/tsbPetHTML`.

## ĐỔI DANH SÁCH (sếp 15/11, qua điều phối): Thường + Tinh phẩm = thú thật; Trân phẩm → Tuyệt phẩm → Ngự tứ = linh vật/thần thú nhỏ
(không sư tử, hổ, cáo thường). Bỏ: Mèo Ba Tư, Tế khuyển, Rùa vàng, Ngựa lùn, Khổng tước lam, Bạch hạc, Cáo tuyết, Tuyết điêu,
Bạch khổng tước. Vẹt ngũ sắc + Chó sư tử xuống Tinh phẩm (giữ khóa). Sổ cũ: `PET_OLD` (jpet.js) đổi con đã bỏ sang con gần nhất CÙNG PHẨM:
batu→linhmieu, tekhuyen→camke, rua→bachquy, ngua→lyngu, khongtuoc→phuong, bachac→kylan, caotuyet→cuuvi, tuyetdieu→ngoctho,
bachkt→thanhlong (đổi tại chỗ trong `tsbPets`, thẻ đang chờ đổi trong PEND; ảnh qua `petK`). 22 con = 5/6/4/4/3.

## 22 con · 5 phẩm = thang đồ (sếp 10:10Z: Thường / Tinh phẩm / Trân phẩm / Tuyệt phẩm / Ngự tứ = thần thú; cùng khung islot, màu KIT_GRADE, dấu Ngự) (Xa xỉ N = [10,18,30,46,66][bậc] + giá/40)
| Bậc | Con (Xa xỉ) | +1 khi theo hầu | Công dụng (luật thật) | Mặt trái | Nguồn |
|---|---|---|---|---|---|
| Thường | Mèo mướp (11) | Sắc | đánh hơi đồ ăn lạ (yếu): chặn 1 lần Hạ độc / Hạ độc dần / Hạ độc con, nghỉ 8 tuần | rụng lông: chủ có hen Sức -2/tuần | mua 40 |
| Thường | Chó nhỏ lông xù (11) | Tâm cơ | canh cửa 10: Cài đồ vào rương, Bỏ xạ hương, Thả thú dữ, Phóng hỏa khó hơn; điềm báo mưu dễ thấy | sủa đêm: người ở chung cung oán +2 | mua 40 |
| Thường | Chim họa mi (11) | Tài | Sủng +1 mỗi đêm thị tẩm | dễ bị thả đi | mua 40, nam nhân |
| Thường | Thỏ ngọc (11) | Đức | mỗi tháng người oán nàng nhất bớt oán 2 | yếu rét (mùa đông mất khí lực nhanh) | mua 30, nam nhân |
| Thường | Cá vàng chậu sứ (11) | Tài | Sức +1 mỗi tuần | dễ bị bỏ thuốc vào chậu | mua 30 |
| Tinh phẩm | Mèo tuyết (21) | Sắc | đánh hơi (khá) | rụng lông | mua 120, Hoàng thượng, nam nhân |
| Tinh phẩm | Sáo nói (21) | Tâm cơ | canh cung 6 | nhại lời: Danh -1 (8/tháng) | mua 110, Hoàng thượng, nam nhân |
| Tinh phẩm | Đôi uyên ương (21) | Sắc | Ân tình +2 mỗi đêm thị tẩm | cần ao (dưới Tần khó nuôi) | mua 100, Hoàng thượng, nam nhân |
| Tinh phẩm | Cá chép gấm (22) | Danh | điềm: Danh +1 (12/tháng) | cần ao | mua 140, Hoàng thượng |
| Tinh phẩm | Vẹt ngũ sắc (22, từ Trân xuống) | Tâm cơ | nghe lén: 15/tháng nắm 1 chứng cứ kẻ thù | nàng từng bày mưu: 10/tháng kẻ thù nắm chứng cứ của nàng | mua 160, Hoàng thượng |
| Tinh phẩm | Chó sư tử lông vàng (20, từ Trân xuống) | Danh | canh cung 12 | sủa, cắn kẻ hầu (Lòng -1) | Hoàng hậu ban, Thu săn |
| Trân phẩm | Bạch quy vân văn (30) | Đức | Thái hậu quý nàng +1/tháng | mất nó: Thái hậu -8 | Thái hậu ban |
| Trân phẩm | Linh miêu mắt ngọc (37) | Sắc | đánh hơi rất tinh (75) | rụng lông, quý nên dễ ghen | mua 260 (Khó), Hoàng thượng, Hoàng hậu, cống phẩm |
| Trân phẩm | Cẩm kê (32) | Danh | canh cung 15 + đuổi thú dữ 20 | gáy sớm: người chung cung oán | Thu săn, cống phẩm |
| Trân phẩm | Long lý vảy vàng (32) | Tài | Sức +2/tuần, điềm Danh +1 (10/tháng) | dễ bị bỏ thuốc vào bồn | Hoàng thượng, cống phẩm |
| Tuyệt phẩm | Cửu vĩ hồ (49) | Sắc (+2) | Sắc +2 khi theo hầu | lời đồn hồ ly: Thái hậu -1 (40/tháng), Danh -1 (15) | Thu săn, cống phẩm |
| Tuyệt phẩm | Kỳ lân con (50) | Danh | canh 18 + đuổi thú dữ 25, điềm Danh +1 (10) | Bạc -8/tháng | Hoàng thượng (Sủng ≥80), cống phẩm |
| Tuyệt phẩm | Ngọc thố (49) | Đức | đánh hơi 88 + bớt oán 2/tháng | yếu rét | Hoàng thượng (Sủng ≥80), Thu săn |
| Tuyệt phẩm | Phượng hoàng non (50) | Sắc | Sủng +2 mỗi đêm thị tẩm | Bạc -8/tháng, kêu vang: người chung cung oán | Hoàng thượng (Sủng ≥80), cống phẩm |
| Ngự tứ | Bạch lộc (66) | Đức | ĐỠ MỘT MẠNG; điềm lành Danh +2 | rất dễ bị ghen, bị nhắm hại | Thu săn: Sủng ≥75, 5 phần trăm |
| Ngự tứ | Linh quy ngàn năm (66) | Đức | ĐỠ MỘT MẠNG; Thái hậu +1/tháng | mất: Thái hậu -8 | Thái hậu ban (Thái hậu ≥85, phẩm ≥ Phi, hiếm) |
| Ngự tứ | Thanh long con (66) | Danh | ĐỠ MỘT MẠNG; Sủng +2 mỗi đêm thị tẩm | rất dễ bị ghen | cống phẩm tháng giêng: người Sủng cao nhất, Sủng ≥75, 7 phần trăm |

Chung: bạc nuôi theo con (0–8/tháng; thiếu bạc: khí lực -25), khí lực giảm mỗi tuần (3–12; cần ao dưới Tần +5; thỏ mùa đông +6;
có kẻ hầu tin cẩn: nửa), chăm 1 khắc (khí lực 95, Sức +2), dưới 30 thẻ "biếng ăn" (Tự tay chăm / Giao kẻ hầu / Để sau), 0 thì mất.
Vào lãnh cung: Nội vụ phủ thu lại hết. Số ô theo phẩm: Đáp ứng–Thường tại 1, Quý nhân–Tần 2, Phi–Quý phi 3, Hoàng quý phi–Hoàng hậu 4.

## Luật
- Xa xỉ: `luxOf` (jinv) được bọc: + Xa xỉ thú (con theo hầu đủ, con ở tẩm cung nửa) → cùng mức Giản dị/Vừa/Xa hoa/Quá xa xỉ, cùng hậu quả
  luxMonth (ghen theo tính, Thái hậu chê, lời đồn) cho cả NPC. Mức cho phép không hiện (sếp 08:10Z); Đang mang hiện tổng, ô thú hiện "+N".
- Đỡ một mạng: `die()` (Bệnh nặng / nguy kịch / Khó sinh), `rivalsTurn` (Sức 0 cuối tuần, trước khi endTurn xét chết), `dieIf` (NPC),
  `birthP` (gieo rủi ro sinh một lần; thần thú chịu thay, con vẫn sinh). Không đỡ: ban chết, lãnh cung, tự uống thuốc phá thai, đòn phạt.
  Thú mất, Sức về 30, bệnh khỏi; thẻ "Linh thú đỡ mạng" (tranh thú, lời trang trọng). Đếm `window.PETSTAT`.
- Nguồn hằng tháng (người chơi = thẻ, NPC = tự nhận, cùng ngưỡng): Hoàng thượng ban Sủng ≥55 (4/tháng, bậc theo Sủng), Thái hậu ban
  Thái hậu ≥60 (2,5), Hoàng hậu ban Hoàng hậu ≥60 (2,5), nam nhân tình ý ≥50 (5, chỉ người chơi, có rủi ro lộ), Thu săn tháng chín (2 người
  Sủng cao nhất ≥50), cống phẩm tháng giêng (1 năm 2 lần, người Sủng cao nhất), NPC dư bạc tự mua.
- Hại thú (act `thaopet`, Hại nhỏ): nhắm con quý nhất, cơ may theo Tâm cơ kẻ hại − canh cung − bậc thú; ghen nhắm thú quý nhiều hơn.

## Giao diện (kit)
Tư trang: dưới "Đang mang" có khối kitEquipSlots "Thú nuôi (n/max)" (ô Theo hầu + ô Tẩm cung, ô trống = bóng mờ), tổng Xa xỉ + bạc nuôi.
Chạm ô thú → kitModal (tranh lớn, Bậc/Được/Mất/Ghi chú, nút Chăm / Cho theo hầu / Gửi về Ngự thú viên). Chạm ô trống → thẻ mua (đủ Tốn/Được/
Mất/Kèm + cơ may theo Tai mắt) + nơi có con quý. Thẻ sự kiện: Ngự ban / Thái hậu ban / Hoàng hậu ban / Cống phẩm / Quà gửi lén / Thu săn /
Thú nuôi biếng ăn (tranh thú ở đầu thẻ). Lời dặn lần đầu (khi có con đầu tiên). Thẻ kết quả: wrapR("petDo").

## Tranh
22 tranh, Magnific gpt-2-6, thư mục dự án ba4aecfe…, 1 ảnh phong cách = lưới vật phẩm đã duyệt "A" (lJ8MTvEgv9). Hai lưới: P1 4x3
(ksDpMXb16B → tách nền jUXBXPtLD0), P2 5x2 (rgedpIkxtc → lJ8I8Ojgv9). Cắt theo thành phần liền → vuông, 90 phần trăm → `img/pet-<k>.webp`
256 + `img/pet512/pet-<k>.webp` 512 (KHÔNG trong git; .gitignore). Tờ ghép: dev/shots/pets/all.jpg. cutcheck: không có residue/flat;
"ghost" chỉ là lông/lông vũ mềm (công, cáo).

## Kiểm
- `node dev/test/pets.js <url> 755x1000@2|1180x820@2 dev/shots/pets <tag> <oldsave>` (sổ cũ: dev/test/mk-oldsave-pets.js trên bản ts-b có
  chó + họa mi + thẻ tsbPetGift đang chờ): Fold + iPad 0 lỗi trang, 0 tràn ngang, 0 chữ cắt, 0 tranh thú vỡ; sổ cũ nạp, qua 6 buổi, thú cũ
  giữ nguyên (cho, hoami). Ảnh: dev/shots/pets/{fold,ipad}-*.jpg. Đỡ mạng: Sức 0 → không chết, Sức 30, thần thú mất (đã kiểm).
- Bot: `GAME=… node dev/measure/runpets.js sens N out.json` (runb + petSaved/pets mỗi đời + PETSTAT); so bản base (HEAD trước jpet).

## Số đo bot (15/11 ~05:30Z, máy tải ~55 trên 4 nhân: ~1 đời / 10 phút mỗi luồng — mẫu nhỏ)
- base (HEAD trước jpet) n=10: HH 50 phần trăm, chết sớm 20 (bệnh 2).
- pets n=9: HH 33, chết sớm 22 (khó sinh 2). Đời có thú: 6/9; thần thú: 0/9; lần đỡ mạng: 0.
- Sai số với n≈10 là ±30 điểm: chưa kết luận được ±3. Tác động trực tiếp của đỡ mạng bị chặn trên bởi tỉ lệ đời được đỡ (0/9 ở mẫu này;
  nguồn thần thú: Thu săn Sủng ≥75 × 5, cống phẩm Sủng cao nhất ≥75 × 7 (năm 2 lần), Thái hậu ≥85 + phẩm ≥ Phi × 15 trong 2,5/tháng).
  Chênh HH giữa hai mẫu là nhiễu (khác nhau ở khó sinh, không do thú). VIỆC CÒN: chạy `runpets.js sens 40` mỗi bên khi máy rảnh.


## VẼ LẠI (review/pets-art, sếp 15/11: tranh cũ như ảnh chụp, ngồi đệm/đứng đá → bỏ)
- Magnific gpt-2-6, thư mục ba4aecfe…, 1 ảnh phong cách (gpt-2-6 chỉ nhận 1) = tranh cảnh đã duyệt 5jVD3wpKxe ("Two palace maids in soft green",
  gongbi/màu nước mềm). KHÔNG dùng tranh thú cũ. Mỗi con một ảnh 1:1 trên nền giấy trơn, không đệm/đá/bệ; chim trên giá/lồng, cá trong bồn.
- Tách nền: Magnific images_remove_background → scratchpad proc.py: điểm bán trong suốt lấy màu tranh gốc (không viền tối), bỏ đốm rời,
  lấp lỗ nhỏ, cắt vuông 90 phần trăm, 512 + 256 webp. Linh vật/thần thú: quầng sáng mềm (kylan vàng nhạt, bạch lộc trắng bạc).
- Mỗi con 4 tranh, mỗi bậc lớn một tranh (sếp 15/11): Non `img/pet-<k>-non.webp`, Thiếu niên `img/pet-<k>-tn.webp`, Trưởng thành
  `img/pet-<k>.webp`, Linh thú `img/pet-<k>-lt.webp` (mỗi cái cả pet512/). Linh thú = bản uy nghi, linh khí của chính con trưởng thành:
  thú thật → lông/vân sáng như tiên, sợi sáng, dáng đường bệ, có thể đeo ngọc/vàng; linh vật → hình đầy đủ hơn (cửu vĩ hồ hiện đủ chín
  đuôi, bờm/sừng lớn hơn…). Non/Thiếu niên/Linh thú vẽ với tranh trưởng thành làm ảnh tham chiếu (cùng một con). Tổng 88 tranh.
  ĐANG CHỜ sếp duyệt mẫu (hươu trắng tinh? vẹt to hơn trên giá?).
- Mẫu (chờ duyệt): dev/shots/pets/mau.jpg — Mèo mướp non + trưởng thành, Chó nhỏ lông xù, Vẹt ngũ sắc trên giá, Kỳ lân con, Bạch lộc.
  Magnific: mèo WDsgFxxcXe (cắt gOImT5DSXO), mèo non vQZAyUua47 (LwB808xswO), chó cplSHLy0eP (nVjsQ6MYQD), vẹt gOIm0IRSXO (tCiRUDcmZJ),
  kỳ lân EbzYPnzuuO (iGq5mJF3uK), bạch lộc s7oIWtnl8e (ksDeAQ316B). Chưa đẩy CDN (chờ duyệt).
