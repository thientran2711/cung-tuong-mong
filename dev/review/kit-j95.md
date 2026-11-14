# Kiểm duyệt bộ giao diện: review/kit-j95 @ 6ecba9ec (lần 2) — FAIL

Ngày 2026-11-14 (người kiểm #3). Dựng lại all.js từ nhánh (thứ tự `… jk2b, jk95, j98, j84`), dữ liệu giả lập API j95
(habitsKnown, j95habitsMine có `told:false`, j95followers, j95mapSigns, countAt tăng 7/14). Thử 686x880@2.2 và 1180x820@2 (đã đủ để FAIL; chưa chạy 4 cỡ còn lại).
Không lỗi trang, không tràn ngang. Ảnh: dev/shots/review/kit-j95/lan2-*.jpg.

## Đã sửa (đạt)
- "N người theo hầu" hiện trên nhãn j59 (dòng thứ hai `.kfol`, cả nhãn của ngươi `#j59metag`); trình theo dõi không chạy vòng (2 lần gọi / 4 giây khi đứng yên).
- Không còn "có thể": chip trung tính "tin cũ · N tuần trước" / "tin cũ".
- Kẻ rình = chip đỏ `kitChip(…,"r")`, không ✗.
- "Thói quen" và "Nơi ngươi hay đến" nằm trong `.pc > .pcr`, trong viền, trước nhóm tab (đo ở cả 2 cỡ); mục `told:false` bị ẩn.
- KIT §31; đã gộp main e9e2248 (main nay chỉ hơn 2 commit dựng site/maid-art-c, không xung đột mã).

## Lỗi chặn
1. **Bản đồ vẫn đếm người HAI chỗ** (KIT §31 tự ghi "ONE chip per place"; chủ 16:25Z "một việc, một chỗ"): nhãn nơi vẫn có chữ "7 bóng · 3 khắc"
   (j26/j27 `<i>${n} bóng</i>`) và ngay dưới là chip bóng người "7 đông" của jk95 → cùng một con số hai lần ở mọi nơi có người
   (Đức Thọ cung, Càn Ninh cung, Dưỡng Hòa điện "14 rất đông", Ngự hoa viên "1 bóng" + 1 bóng). Sửa cả nhóm: số người chỉ ở chip kit; nhãn chỉ còn "3 khắc".
   Chữ trong chip đọc "7 đông" — nên "7 · đông" hoặc chỉ "đông/rất đông" kèm số trong tooltip.
2. **Hàng kit có chip lệch đường chân chữ**: trong `.kpkb` (kitRows), hàng nào có chip thì nhãn buổi cao hơn chữ nơi chốn ~2 px CSS
   (686: Chiều 690.7 vs 692.8, Tối 713.9 vs 716; 1180: Tối 476.1 vs 478.2; thẻ của ngươi Sáng 176.2 vs 177.3); hàng không chip thì khớp (±0.1).
   Hàng CẦN/TỐN của thẻ hành sự (chip trong hàng) thì khớp — tức `.kpkb` thiếu canh theo baseline. Sửa ở kit (`.kpkb` align-items: baseline hoặc
   canh nhãn như hàng thẻ hành sự) để mọi bảng kpkb có chip đều đúng, không vá riêng `.khab`.
3. **1180x820: chip "tin cũ · 3 tuần trước" rớt xuống một dòng riêng** dưới "Phật đường · Chính ngươi thấy", thụt lề như một hàng mồ côi
   (cột phải thẻ 354 px). Chữ chip dài; rút gọn ("cũ 3 tuần") hoặc cho chip nằm cùng hàng bằng cách thu dòng nguồn — không để hàng 2 dòng lệch.

## Ghi chú
- **Cho người gộp**: KIT.md §31 cũng được review/fold-layout dùng — khi gộp phải đánh lại số một bên.
- Lời khuyên "Đi đâu quen một giờ…": "giờ" nên đổi lối cổ trang (vd "Đi đâu thành lệ thì kẻ thù dễ đón đường…") theo VANPHONG.
- Chưa thử chế độ chip gọn j59c / dải người cuộn (sân khấu thử chỉ có 2–6 người); lần sau thợ chụp cả hai.
- Không phải lỗi nhánh này (main): Fold ngươi đứng trên giường ở Ngọc Thanh các/Phòng cung nữ, hình nhỏ (đã có trong danh sách fold-layout).

---

# Kiểm duyệt bộ giao diện: review/kit-j95 @ 5b787e1 — FAIL

Ngày 2026-11-14. Dựng jk95.js trên origin/main 2bed83a (nạp sau jk2b, trước j98/j84), dữ liệu giả lập theo API j95
(habitsKnown, j95habitsMine, j95mapSigns, j95followers). 6 cỡ (755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2):
không lỗi trang, không tràn ngang; dấu hai bóng người hiện trên bản đồ; mục "Thói quen" và "Nơi ngươi hay đến" có hiện.

## Lỗi chặn
1. **"· N người theo hầu" không bao giờ hiện**: jk95 tìm `#tokens .tok .tag`, nhưng sân khấu hiện nay (j59) không vẽ nhãn trong `.tok`
   (đo: 1 `.tok`, 0 `.kfol` dù j95followers trả 2 người). Phải gắn vào nhãn tên của j59 (cả dải người cuộn và chip "còn N").
2. **Văn phong / KIT: "đã lâu, có thể đã đổi"** — KIT cấm "có thể" trong chữ người chơi đọc (KIT 7, 13…). Viết thật: vd "đã lâu (tuần thứ …)" hoặc chip "tin cũ".
3. **Chip "✗ 2 kẻ đang rình chỗ này"**: dùng `kitChip(…,"no")` là chip ĐIỀU KIỆN CHƯA ĐỦ (dấu ✗ của hàng Cần) để báo nguy — sai nghĩa kit.
   Dùng chip cảnh báo/số đỏ của kit (KIT 28.9 chip số) không có dấu ✗.
4. **"Nơi ngươi hay đến" nằm ngoài khung thẻ**: selfCardHTML() được nối thêm đuôi nên mục này rơi xuống DƯỚI khung thẻ người (ngoài viền), trông như dán thêm.
   Phải vào cột thông tin của thẻ (`.kpfacts`/`.pcl`) như "Thói quen" của người khác.
5. **KIT.md trùng số mục 29** (main đã có 29 = màn tựa j74). Đánh lại số (31 nếu landscape-art lấy 30).
6. Nhánh dựng trên kit-2b 927a8dc, cũ hơn main nhiều commit: gộp origin/main, giữ thứ tự `… jk2b, jk95, j98, j84`.

## Ghi chú
- Mục "Thói quen" trên thẻ người bị render lại liên tục (phần tử bị tháo khỏi DOM giữa hai lần đo) — kiểm khi có j95 thật.
- Ảnh của thợ (dev/shots/kit2b/j95-thoiquen-755x1000.jpg) không cho thấy mục Thói quen (nằm dưới, chưa cuộn tới): lần sau chụp đúng phần.
