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
