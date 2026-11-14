# Part C1: cung nữ m01–m26 mặc thang áo phi tần t1–t8 + lãnh cung (nhánh review/maid-art-c)

- File: img/fig-maid-mNN-tK-aAA.webp + img/por-maid-mNN-tK-aAA.webp (por 256x256, crop lấy mặt làm tâm: tìm tóc đen ở đầu hình, tâm = phần dưới khối tóc);
  bản ghi img/FIGURES-servants.json role "maid", tier "t1".."t8"/"cold", sheet "C-mNN-tK" (bg, magnificUrl như Part A/B).
- Công cụ: dev/figwork/maidC1/ (cjobs.py = prompt; vv.py = phần thay đổi; cproc.py = tách 4 tuổi + por; sheet.py = tấm xem trước 1 lineup;
  pub.sh = đồng bộ origin/review/maid-art-c rồi gộp bản ghi CỦA MÌNH vào FIGURES-servants.json, đẩy; addbg.sh; ledgers gens.txt, bg.txt).
- Prompt: luật tuổi mới 19/24/32/48 (48 tóc vẫn đen), thang áo LAD (spec5) t1–t8, tư thế động POSES/L30/L42/L55 của spec5 (họ tư thế xoay vòng theo người,
  mỗi người một đạo cụ riêng), màu áo chủ đạo = họ màu của lineup cung nữ gốc; ref danh tính = lineup cung nữ gốc; style ref consort-01/05/12/18 luân phiên.
- Hoa điền: dev/figwork/HUADIAN_C.md. Không nốt ruồi.
- Xem trước: dev/figwork/sheets/C_mNN_tK.jpg (một lineup/tấm, cột trái = cung nữ gốc).

## Trạng thái
- t1 XONG cả m01–m26 (26 lineup, 104 hình + por). Tấm xem trước: dev/figwork/sheets/C_mNN_t1.jpg.
  - m02–m09 vẽ trước khi có bảng 84 kiểu hoa điền -> sửa riêng hoa điền bằng gpt-2-6 edit (8 lần).
  - Edit gpt-2-6 KHÔNG ăn với việc thu nhỏ hoa điền / xoá nốt ruồi (m06, m13 thử 3 lần không đổi) -> sửa tại chỗ bằng script (free):
    spot.py (xoá nốt ruồi: m13, m26 — mặt cung nữ gốc của hai người này có nốt ruồi; prompt từ t2 dặn bỏ), huafix.py (m06: thay hoa điền
    thành thanh ngọc dọc nhỏ son đỏ). Ảnh gốc giữ ở scratchpad (bg/orig-*).
  - por: crop lấy mặt làm tâm (khối tóc, giới hạn chiều cao đầu để tóc xoã dài không kéo lệch).
  - Tín dụng t1: 27 lineup vẽ (1 lần 503 phải vẽ lại) + 12 edit = 39×270 ≈ 10.5k + tách nền ~0.1k ≈ 10.6k.
- 11/14 SẾP BỎ LUẬT ĐỘNG (OWNER REVERSAL ở origin/review/consort-art PROGRESS.md): Part C chuyển sang dáng ĐỨNG YÊN (khối STILL + G19/G24/G32/G48
  của spec5 consort-art, câu opaque "all fabrics opaque silk, NO sheer see-through gauze, NO floating stole", ~7.5 đầu). LAD t4–t8 + luật màu lấy
  từ spec5 consort-art (lad2.py). C1 VẼ LẠI t1 m01–m26 theo dáng tĩnh (đang chạy). Thợ C2 tự vẽ lại phần m27–m52 của mình (t1 + t2 m27–m32 đang là dáng động).
- HUADIAN_C.md: pub.sh của C1 trước đây ghi đè mất bảng C2 (lỗi, đã sửa: giờ chỉ thay phần m01–m26, giữ nguyên phần C2). Bảng C2 khôi phục từ 33f778f.
  C1 đổi 14 kiểu bị trùng với C2 (m02 m03 m05 m07 m08 m09 m10 m11 m15 m16 m18 m23 m24 m25). Kích thước theo bậc: theo bảng 8 nấc HUADIAN.md (consort-art).
- t1 TĨNH: m01–m24 xong và đã đẩy (m25, m26 đang vẽ). Tín dụng vẽ lại t1 tĩnh: 28 lineup (gồm 2 lần làm lại m02/m03 vì đổi hoa điền) ≈ 7.6k.
- QUY TRÌNH SAU TÁCH NỀN (luật mới, cho cả C1 và C2 — thợ C2 lưu ý): cutcheck.py -> fixalpha.py cho hình bị cờ (vá vải mỏng trong suốt) ->
  porcrop.py (por 384x506 canh giữa mặt, cần pip install "opencv-python-headless==4.10.0.84") -> sheet. Công cụ gốc ở origin/review/cutout-fix (955f51c);
  bản C1 gói trong dev/figwork/maidC1/post.sh. rematte.py (tách nền từng người) chưa cần: cutcheck chỉ báo "ghost" nhẹ (vải mỏng), fixalpha xử lý.
- Hoa điền t2+: theo 8 nấc HL/HS của spec6.py (consort-art): t2 son rõ hình, t3 thêm nhụy/gân, t4 viền vàng, t5 vàng lá, t6 + 1 ngọc trai, t7 filigree + đá đỏ,
  t8 phượng filigree + thuý lam; cỡ to dần ~5%/bậc, t8 ≈ 1.4× t1.
- Tiếp: t2 (m01–m06 đang vẽ) … t8 -> cold.
