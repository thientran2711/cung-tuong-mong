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


---

# Lần 2: review/title-screen @ b6922b6 — FAIL

Ngày 2026-11-14. Gộp với origin/main mới (kit-podium, map-tap), dựng không lỗi. Thử 755x1000@2 (chính), không lỗi trang, không tràn ngang.

## Đã sửa đạt
- Mỗi màn phụ là một bảng cảnh kit riêng (kitModal scene): Chọn sổ chỉ có ba sổ + Phúc duyên; Thiết lập chỉ có tiếng + chép/nạp sổ; Sổ luân hồi riêng. Logo/tên không lặp.
- Văn phong: Chọn sổ, Sổ một/hai/ba, Chưa ghi, Thiết lập, ‹ Lui, Tiếp tục. Không còn .thead/.tback/.tpast, không còn ấn KIẾP ở màn đầu.
- Mượn phần tử: #slots, #pdwrap, .optwrap, .xiowrap luôn trả về .tbox khi vào game (Bắt đầu, Tiếp tục, nạp save cũ, chết → Chuyển kiếp, ☰ → màn đầu, có tin game chen vào lúc đang ở Thiết lập). Save cũ hclh-save-v2-2 nạp được qua "Tiếp tục".

## Lỗi chặn
1. **Nút xóa kiếp còn "lên cò" khi quay lại** (lọt trạng thái do mượn DOM): ở Chọn sổ bấm "Kiếp mới" của sổ đang chơi → nút thành "Chắc chắn? Kiếp đang chơi sẽ mất";
   bấm ‹ Lui về màn đầu rồi vào lại Chọn sổ: nút VẪN là "Chắc chắn?" (data-ask="2"), một chạm là mất kiếp, không hỏi lại.
   Trước đây showTitle vẽ lại #slots mỗi lần nên tự hết. Ảnh: dev/shots/review/title-screen/755x1000_2-r2-chac-chan-con-treo.jpg.
   Sửa: mỗi lần mở màn phụ (go("slots")) vẽ lại danh sách sổ (gọi phần vẽ của showTitle) hoặc park() trả mọi data-ask về "1" và chữ nút về như cũ.
   Tương tự ô dán "Nạp sổ" mở dở vẫn còn mở khi vào lại Thiết lập: nên đóng lại khi rời màn.
2. **Thiết lập dùng điều khiển trình duyệt, không phải kit**: thanh trượt Nhạc/Tiếng động/Giọng màu xanh mặc định, ô tích Im tiếng/Rung/Cảnh động mặc định,
   nút "Mở tiếng" kiểu .btn cũ, ô dán chữ máy (monospace). KIT.md chưa có thanh trượt / công tắc / ô nhập. Ảnh: 755x1000_2-r2-thiet-lap.jpg, 755x1000_2-r2-nap-so.jpg.
   Sửa (KIT-FIRST): xin chủ bộ giao diện làm thành phần thanh trượt + công tắc + ô nhập (màu kit, nhãn, cỡ chạm ≥ 36 px), báo "KIT READY", rồi dùng ở đây
   (và ở Thiết lập trong game). Bỏ trùng "Mở tiếng" với "Im tiếng" (một công tắc).

## Nên sửa cùng lượt (không chặn riêng)
- Chọn sổ vẫn là thẻ .slot cũ (chữ thân serif đậm khác bảng kit); dùng kitRows / thẻ kit cho tên sổ + ngày, nút giữ .kbtn.
