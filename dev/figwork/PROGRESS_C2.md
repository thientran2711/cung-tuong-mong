# Part C2 — cung nữ m27–m52 mặc thang áo phi tần t1–t8 + lãnh cung (thợ C2, nhánh review/maid-art-c)

- Files: img/fig-maid-mNN-tK-aAA.webp + img/por-maid-mNN-tK-aAA.webp (K = t1..t8 / cold), FIGURES-servants.json role "maid", tier "t1".."t8"/"cold", sheet "C-mNN-tK", palette = họ màu.
- Tools: dev/figwork/maidC2/ — mjobs.py (prompt: style prefix + identity ref = lineup cung nữ gốc a18 của chính người đó; áo: t1–t3 như spec4, t4–t8 LAD spec5; tư thế động POSES/L30/L42/L55 spec5 pose_for; tuổi 19/24/32/48, 48 tóc vẫn đen; không nốt ruồi; hoa điền theo HUADIAN_C.md),
  pproc.py (tách nền → 4 tuổi, por lấy mặt làm tâm bằng YuNet face detector haar/yunet.onnx — tải từ huggingface opencv/face_detection_yunet), merge.py + pub.sh (luôn fetch, đặt lại theo origin/review/maid-art-c, chỉ ghi bản ghi của mình rồi push).
- GPT 2.6 (gpt-2-6), 2:1, 4k, high, style ref consort-01/05/12/18 luân phiên + ref danh tính; 270 tín dụng/lineup + 3 tách nền.
- Sheets: dev/figwork/sheets/C_mNN_tK.jpg (một lineup/tấm).

## Status
- Mẻ 1 (t1 m27–m34, 8 lineup): xong, sheets C_m27_t1..C_m34_t1. Tín dụng: 8×270 + 8×3 = 2184; thêm 2160 cho 8 bản nháp đầu bị bỏ (hoa điền trùng kiểu c01–c32, đổi bảng HUADIAN_C.md).
- Mẻ 2 (t1 m35–m42, 8 lineup): xong, sheets C_m35_t1..C_m42_t1. Tín dụng 2184.
- Mẻ 3 (t1 m43–m50, 8 lineup): xong, sheets C_m43_t1..C_m50_t1. Tín dụng 2184.
- Mẻ 4 (t1 m51–m52 → t1 XONG m27–m52; t2 m27–m32): xong. Tín dụng 2187 (1 lần tách nền lỗi, làm lại).

## OWNER REVERSAL (11/14): dáng ĐỨNG YÊN (G19/G24/G32/G48 + STILL + "opaque silk, no sheer gauze, no floating stole", ~7.5 đầu) — calm.py lấy từ spec5.py nhánh review/consort-art.
- Mọi lineup đã vẽ theo dáng động (t1 m27–m52, t2 m27–m32) phải VẼ LẠI. Bỏ 16 bản t2 m33–m48 dáng động chưa xử lý (4320 tín dụng phí).
- Hoa điền: cỡ chuẩn = hoa son c03 t1 ("about the size of a fingertip and clearly visible"). t2+ chờ HUADIAN.md 8 nấc mới.
- Vẽ lại dáng yên: C-m38-t1 (tấm thử đầu tiên, sheet C_m38_t1.jpg). 273 tín dụng.
- Vẽ lại dáng yên t1 m27–m34 (8 lineup, đè file cũ). Tín dụng 2184.
- Vẽ lại dáng yên t1 m35–m43 (trừ m38 đã xong), 8 lineup; por mới 384x506 bằng porcrop.py, cutcheck sạch. Tín dụng 2184.
