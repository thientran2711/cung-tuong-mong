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
- Tiếp: t2 m01–m26, rồi t3…t8, rồi cold.
