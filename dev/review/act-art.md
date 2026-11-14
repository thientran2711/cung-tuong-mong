# Kiểm duyệt bộ giao diện: review/act-art @ 74f87cd — FAIL (chỉ lỗi dữ liệu, tranh đạt)

Người kiểm: kiểm duyệt kit (phiên chính 2), 2026-11-14.

## Tranh: ĐẠT
- 108 act + 30 info + 8 art + 4 vir + 4 book + veil-por: đều 384x506 (đúng ô ảnh khung chung, 3:4), 6–71 KB.
- Không có mặt người rõ (người quay lưng, ở xa, lính đội mũ trụ), cùng một phong cách, ảnh tối cho mưu kế/hại người.
- Ảnh tổng: dev/shots/review/act-art/act-1.jpg, act-2.jpg, info-art-vir-book.jpg.

## Lỗi phải sửa (FAIL)
1. **img/ACTS.json sai định dạng của kit, trong game không hiện được tranh nào.** Kit (j79 `kitActArt`, KIT.md 6.1) đọc
   `{"acts":{"<tên thẻ việc>|<slug>":"<key>"}, "cats":{...}, "have":["act-cat-<cat>",...]}`. Bản của nhánh là
   `{"<key>":{file,cat,names,ids}, "cat-<cat>":{...}}`, không có `acts`/`have` → `kitActArt` luôn trả về ô gấm có chữ loại việc.
   Đồng thời **xung đột gộp** với img/ACTS.json đã có trên main (bản mẫu của kit, có `_doc`, `cats`).
   Sửa: `manifest.py` xuất đúng định dạng kit, giữ `_doc` và `cats` của main:
   - `acts`: mỗi tên thẻ (không có dấu `*`) → key (vd `"Đánh đàn ở ngự hoa viên":"dan-dem-trang"`); thêm slug (`kpSlug`) nếu cần;
   - `have`: `["act-cat-hau-ha", ...]` cho mỗi ảnh `act-cat-*.webp` có thật.
2. **Tên có tiền tố `*`** (vd `"Phô tài: *"`) và **tra theo id**: kit không hỗ trợ. Hoặc liệt kê đủ tên thật, hoặc nhờ chủ kit
   thêm tra tiền tố/id vào `kitActArt` (KIT READY trước) — thợ tranh không tự sửa j79.
3. **17 loại việc của nhánh vs 9 loại của kit** (`kitActCat`: hau-ha hoc-tap giao-thiep muu-ke hai-nguoi nghi-ngoi buon-ban le-nghi di-lai).
   Các ảnh `act-cat-<loại ngoài 9>` (vd tai-nghe) không bao giờ được dùng làm ảnh dự phòng. Đổi về 9 loại, hoặc xin chủ kit thêm loại vào KIT.md 6.1 trước.
4. Gộp lại origin/main trước khi gửi duyệt lại (nhánh đang chậm 31 commit), dựng `python3 dev/build/assemble.py` không lỗi, rồi chụp thẻ việc ở 755x1000@2 và 1180x820@2 cho thấy tranh hiện trong ô tranh thẻ việc.

img/INFO.json `{"have":[...]}`: chưa có module nào đọc; để kit-2 (KIT_INFO) quyết định, không chặn.
