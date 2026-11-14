# Cảnh nền theo MÙA × BUỔI (nhánh review/scene-seasons)

## Phạm vi (đã kiểm trong mã)
- 10 ảnh nền cảnh: 9 trong SCIMG (j6) + tẩm cung người chơi `tam-cung-dem` (j21 `SCIMG.home`).
  duong-tam-dien, khon-ninh-cung, kinh-su-phong, lanh-cung, ngu-hoa-vien, ngu-thu-phong, phi-tan-cung, tam-cung-dem, thai-y-vien, tu-ninh-cung.
- Biến thể sẵn có: chỉ `tam-cung-dem` (bản đêm). Không có bản khác.
- Mùa: SEASON[S.month-1] (j1) → xuan/ha/thu/dong. Buổi: BUOI (j1) có 3 buổi Sáng/Chiều/Tối (S.buoi 0..2), KHÔNG có Trưa riêng → sang/chieu/toi (như BUK ở j26).
- Tên tệp: img/<tên>-<mùa>-<buổi>.webp. Bản gốc img/<tên>.webp giữ làm dự phòng.

## Số lượng và tín dụng ước tính (ghi TRƯỚC khi vẽ hàng loạt)
- 10 cảnh × 4 mùa × 3 buổi = **120 ảnh**.
- Magnific gpt-2-6 EDIT trên ảnh gốc (giữ bố cục/đường sàn): 40 tín dụng/ảnh (simulate_cost, exact).
- 120 × 40 = 4.800 tín dụng; dự trù vẽ lại ~20% → **~5.800 tín dụng**.
- Thứ tự: 4 mùa buổi SÁNG cho mọi cảnh → CHIỀU → TỐI.

## Tiến độ
