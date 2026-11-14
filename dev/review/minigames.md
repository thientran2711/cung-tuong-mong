# Kiểm duyệt bộ giao diện: review/minigames @ 4f5e8e6 — FAIL

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Đã gộp với origin/main (a4fbec0), dựng không lỗi.

## Đạt
- 15 môn, mỗi môn một trò riêng, không còn trắc nghiệm (đúng luật chủ 11/14). Test của thợ (dev/test/minigames91.js) chạy ở 755x1000@2: 15/15 xong, chạm/kéo/giữ thật tới được trò, không lỗi trang, không tràn ngang, không cắt chữ.
- Khung trò: kitGameFrame (ấn TÀI NGHỆ, Cách chơi, ô HUD), kết quả kitGameResult, nút .kgbtn. CSS j82 chỉ là bố cục.
- Game cũ ở main vẫn chạy: 6 cỡ không lỗi, save cũ nạp được.

## Lỗi chặn
1. **Ảnh vẽ bằng code ở chỗ cần tranh** (luật chủ 11/14: "Never ship code-drawn art where a painting is expected; if something looks crude, redraw it").
   Mọi đồ vật trong bàn chơi đang vẽ bằng canvas, hình khối phẳng, thô: bình cắm hoa + hoa 5 cánh (hoa), nồi + bếp lửa + ngọn lửa tam giác (banh),
   bình đầu hồ + mũi tên (dauho), khung đèn lồng đỏ (doden), bia bắn (ban), bàn cờ, sợi chỉ/nút (kim), lư hương + khói (huong), nền giấy kẻ sọc.
   Ảnh: dev/shots/minigames/hoa-755x1000@2-2play.jpg, banh-…, dauho-…, doden-… (của chính thợ).
   Sửa: vẽ tranh thật theo dev/art/STYLE_ANCHOR.md (Magnific gpt-2-6, 1 ref phong cách, không mặt người): mỗi môn một nền bàn chơi (sân/án thư/bếp…)
   + các mảnh rời (sprite nền trong suốt: bình, cành hoa theo 3 độ dài, nồi, bếp, nguyên liệu, đèn lồng, bia, lư hương, quân cờ…). Canvas chỉ còn
   vẽ phần động nhỏ (vệt ngắm, vạch nhịp, dải giai điệu, nét đồ) và đặt sprite. Đặt ảnh vào img/kit/mg-<môn>-*.webp, ghi vào KIT.md mục 13
   (chủ bộ giao diện xác nhận "KIT READY" trước khi dùng).
2. Chữ "BẢNG ĐIỂM": lỗi đã biết, không chặn lần này (sửa cùng lượt nếu tiện; VP: dùng "Phần", không "điểm").

## Ghi chú nhỏ (không chặn)
- HUD "Hồi" đang hiện "Lần 2/6", "Bình 1/3", "Bước 2/4", "Đèn 2/2": theo VANPHONG một lần trong trò nhỏ là "hồi"; có thể để "Hồi 2/6 · bình thứ nhất".
- Đối chiếu khi gộp: review/kit-podium (j90) đã gộp vào main trước; giữ thứ tự j82, j91, j90 trong assemble.py và j84 cuối cùng.
