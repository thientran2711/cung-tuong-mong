# Kiểm duyệt bộ giao diện: review/title-screen @ a477a02 (j74, bản sửa 4f56abb) — FAIL

Người kiểm: kiểm duyệt kit (phiên chính 2), 2026-11-14. Thử trên bản gộp với main mới (có j79 + j84), 6 cỡ.
Đạt: màn đầu là bảng cảnh của kit (kitModal scene, .kbtn / .kbtn.alt), tranh trọn, không lỗi trang, không tràn ngang, save cũ nạp được ("Tiếp tục").

## Lỗi phải sửa
1. **Màn phụ "Chọn ô lưu" không tách**: bấm "Bắt đầu" ra lại nguyên bảng kem cũ — logo, tên game, câu giới thiệu, ba ô, Phúc duyên,
   VÀ cả Chép sổ/Nạp sổ + thanh tiếng (của "Cài đặt"). `tag()` đặt `data-tp` nhưng CSS không có luật ẩn theo `#title[data-pg] [data-tp]`
   (bản sửa đã bỏ mất). Ảnh: dev/shots/review/title-screen/755x1000_2-01b-slots.jpg, 1180x820_2-01b-slots.jpg.
   Mỗi màn phụ chỉ hiện phần của nó; logo/H1/sub ẩn ở màn phụ.
2. **Văn phong (VANPHONG.md)**: "Chọn ô lưu" → "Chọn sổ"; "chọn ô lưu, xem Phúc duyên" → "chọn sổ, xem Phúc duyên"; "Cài đặt" → "Thiết lập";
   "‹ Quay lại" → "‹ Lui"; `nm?…:"Ô "+n` → "Sổ …". (j84 không vá "Cài đặt"/"ô lưu".)
3. **Kiểu riêng**: `.thead` (tiêu đề serif vàng riêng), `.tback` không có trong KIT.md. Màn phụ nên là `kitPanel({scene:true})` của kit
   (tiêu đề ở .kph, nút lui = `.kbtn.alt`), hoặc chủ kit khai báo thành phần "màn phụ màn đầu" trong KIT.md trước.
4. Ấn triện "KIẾP" (kind:"end") cho màn đầu: KIẾP là ấn kết cục kiếp; xin chủ kit chọn ấn đúng nghĩa (hoặc bỏ ấn).
