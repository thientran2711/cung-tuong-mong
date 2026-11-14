# Part C2 — cung nữ m27–m52 mặc thang áo phi tần t1–t8 + lãnh cung (thợ C2, nhánh review/maid-art-c)

- Files: img/fig-maid-mNN-tK-aAA.webp + img/por-maid-mNN-tK-aAA.webp (K = t1..t8 / cold), FIGURES-servants.json role "maid", tier "t1".."t8"/"cold", sheet "C-mNN-tK", palette = họ màu.
- Tools: dev/figwork/maidC2/ — mjobs.py (prompt: style prefix + identity ref = lineup cung nữ gốc a18 của chính người đó; áo: t1–t3 như spec4, t4–t8 LAD spec5; tư thế động POSES/L30/L42/L55 spec5 pose_for; tuổi 19/24/32/48, 48 tóc vẫn đen; không nốt ruồi; hoa điền theo HUADIAN_C.md),
  pproc.py (tách nền → 4 tuổi, por lấy mặt làm tâm bằng YuNet face detector haar/yunet.onnx — tải từ huggingface opencv/face_detection_yunet), merge.py + pub.sh (luôn fetch, đặt lại theo origin/review/maid-art-c, chỉ ghi bản ghi của mình rồi push).
- GPT 2.6 (gpt-2-6), 2:1, 4k, high, style ref consort-01/05/12/18 luân phiên + ref danh tính; 270 tín dụng/lineup + 3 tách nền.
- Sheets: dev/figwork/sheets/C_mNN_tK.jpg (một lineup/tấm).

## Status
- Mẻ 1 (t1 m27–m34, 8 lineup): xong, sheets C_m27_t1..C_m34_t1. Tín dụng: 8×270 + 8×3 = 2184; thêm 2160 cho 8 bản nháp đầu bị bỏ (hoa điền trùng kiểu c01–c32, đổi bảng HUADIAN_C.md).
