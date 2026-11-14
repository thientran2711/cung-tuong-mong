# Xóa nốt ruồi + hoa điền (nhánh review/no-moles)

Luật: dev/HANDOVER.md "OWNER RULES ADDED 11/14" (không nốt ruồi trên mặt ai; hoa điền chỉ phi tần, lãnh cung không có).
Kiểu hoa điền + 8 nấc: dev/figwork/HUADIAN.md (nhánh review/consort-art).

## Cách làm
1. Soát mặt: sheet cận mặt từ por-*.webp (tất cả ảnh không phải phi tần trên main + face-*.webp).
2. Sửa trên lineup gốc (magnificUrl trong FIGURES*.json) bằng gpt-2-6 edit, một lần cho cả 4 tuổi, folder Magnific ba4aecfe-…;
   phi tần: cùng một edit vừa xóa nốt ruồi vừa thêm hoa điền đúng kiểu/nấc; người khác: chỉ xóa nốt ruồi (+ bỏ trang sức/chấm trên trán nếu có).
3. Tách nền: images_remove_background trên lineup mới -> split.py (cắt 4 người, 900px cao).
4. gpt-2-6 hay bỏ sót nốt ruồi to/đậm (thái giám u22–u27, cung nữ m13/m52): tẩy cục bộ trên fig 900px bằng fixspots.py
   (toạ độ đọc từ lưới phóng to), vết mờ trên trán bằng fixbox.py. Thử lại gpt-2-6 riêng ("paint the dot out") cũng không ăn.
5. por: tạo lại bằng porcrop.py (384x506). Ghi magnificUrl/bg mới vào FIGURES*.json.

## Tiến độ
- [x] Phi tần t4 (18 người không vẽ lại: c02–c06, c08–c18, c25, c30) — commit 79a4bde.
- [x] Phi tần t1–t3, t4 của c01 c07 c19 c20–c24 c26–c29 c31 c32, t6 c01–c16: bỏ qua (thợ phi tần vẽ lại). Main chưa có t5–t8 / tcold.
- [x] Thái giám u21–u30 (40 ảnh): xóa nốt ruồi (lineup gpt-2-6 + tẩy cục bộ).
- [x] Cung nữ m13, m26, m39, m52 (16 ảnh).
- [x] Con f13 (4 tuổi, bỏ trang sức/vết trên trán), f11-a9, f24-a20 (bỏ mặt dây trán).
- [x] Thái hậu h2-a51, h3-a51 (bỏ chấm trên trán).
- [x] kid-p10-a9, kid-f02-a4: cắt lại một người từ lineup gốc + remove_background (hết lỗ trên áo).
- Soát xong, sạch: emperor, mama, man, official, physician, player, eunuch u01–u20, maid còn lại, kid còn lại, thaihau còn lại, face-*.
- Còn để ý: face-consort-34 có vết sẹo/mực trên má (ảnh mặt cũ 256px, không có lineup) — chưa sửa; face-consort-03 tàn nhang (không phải nốt ruồi).
- Hoàng hậu trên bục vinh danh: dùng ảnh t4 của phi tần (main chưa có t8); nếu là c01/c07/c19–c24/c26–c29/c31/c32 thì chờ thợ phi tần vẽ lại.
