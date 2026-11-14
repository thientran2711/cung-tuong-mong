# Cảnh nền theo MÙA × BUỔI (nhánh review/scene-seasons)

## Phạm vi (đã kiểm trong mã)
- 10 ảnh nền cảnh: 9 trong SCIMG (j6) + tẩm cung người chơi `tam-cung-dem` (j21 `SCIMG.home`).
  duong-tam-dien, khon-ninh-cung, kinh-su-phong, lanh-cung, ngu-hoa-vien, ngu-thu-phong, phi-tan-cung, tam-cung-dem, thai-y-vien, tu-ninh-cung.
- Biến thể sẵn có: chỉ `tam-cung-dem` (bản đêm). Không có bản khác.
- Mùa: SEASON[S.month-1] (j1) → xuan/ha/thu/dong.
- Buổi: main hiện có 3 buổi (BUOI j1: Sáng/Chiều/Tối, S.buoi 0..2); chủ báo sắp đổi sang 4 buổi Sáng/Trưa/Chiều/Tối (S.buoi 0..3). Vẽ đủ 4: sang, trua, chieu, toi. j94 tự nhận thang 3 hay 4 buổi qua BUOI.length.
- Tên tệp: img/<tên>-<mùa>-<buổi>.webp. Bản gốc img/<tên>.webp giữ làm dự phòng.

## Số lượng và tín dụng ước tính (ghi TRƯỚC khi vẽ hàng loạt)
- 10 cảnh × 4 mùa × 4 buổi = **160 ảnh** (ban đầu 4 mùa = 40, rồi 3 buổi = 120, nay 4 buổi = 160).
- Magnific gpt-2-6 EDIT trên ảnh gốc (giữ bố cục/đường sàn): 40 tín dụng/ảnh (simulate_cost, exact).
- 160 × 40 = 6.400 tín dụng; dự trù vẽ lại ~20% → **~7.700 tín dụng** (tài khoản còn ~2,09 triệu).
- Thứ tự: 4 mùa buổi SÁNG cho mọi cảnh → TỐI → CHIỀU → TRƯA.
- Mỗi ảnh EDIT thẳng từ ảnh gốc (không nối tiếp ảnh đã sửa) để không trôi bố cục. Không dùng style ref (ảnh gốc đã là chuẩn phong cách). Đầu ra 1344x752 → cắt-co về 1280x720, webp q~80.

## Tiến độ
- [x] SÁNG: 40/40 (10 cảnh × 4 mùa), đã xem từng ảnh: bố cục, phối cảnh, sàn giữ nguyên; không có người. 40 lượt × 40 = 1.600 tín dụng (thêm 0 lượt vẽ lại).
