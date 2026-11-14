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
- Mẻ 1 (t1): m01–m05, m07–m09 xong (8 lineup, 32 hình). m02–m09 vẽ trước bảng hoa điền 84 kiểu nên đã sửa riêng hoa điền bằng gpt-2-6 edit
  (giữ nguyên mọi thứ khác); m06 hoa điền ra to quá -> đang sửa nhỏ lại. Tín dụng mẻ 1 ≈ 9×270 (vẽ) + 9×270 (sửa hoa điền) + 3/bg ≈ 4.9k.
- Đang vẽ: m06 (sửa), m10–m17 t1.
