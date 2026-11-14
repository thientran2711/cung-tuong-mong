# PROGRESS: tranh nơi ở (review/residence-art) — THỬ NGHIỆM, chờ chủ duyệt

Nhánh `review/residence-art` từ origin/review/page-curl. CHƯA gắn vào game (chỉ mockup trang tranh bên trái của sách, KIT §32.4 Hậu cung › Phi tần).

## Thử nghiệm (đã vẽ, đã tự xem từng ảnh)
Magnific gpt-2-6, thư mục ba4aecfe; 3:2, 4k (3504x2336); webp q90 trong `dev/shots/residence/`:
- `canh-phuc-cung-xuan-sang.webp` — chính điện Cảnh Phúc cung (chủ vị). Bản sắc: ngọc bích/men ngọc + kem + vàng nhạt, rèm lụa xanh ngọc,
  bình phong trúc–hạc, cửa trăng nhìn ra sân có cây ngọc lan trắng, ao sen cá vàng, đèn đá. Mã Magnific w4hmfeQ7EI. Thảm giữa sàn trống cho người đứng.
- `canh-phuc-cung-xuan-toi.webp` — cùng phòng, SỬA từ bản sáng (giữ bố cục): trăng, đèn lồng, nến. Mã 79vhEILJAL.
- `canh-phuc-cung-dong-phoi-xuan-sang.webp` — Đông phối điện (thiên điện cho người ở chung, bậc thấp): phòng nhỏ hơn, xà gỗ, tường vôi kem,
  sàn gỗ, giường rèm lụa bạc hà, bàn trang điểm, khung thêu, bộ trà men ngọc, cửa sổ nhìn ra cành ngọc lan — cùng họ màu với cung, ít vàng/ít chạm hơn, không nghèo. Mã tCi62RkmZJ.
- Tham chiếu: style = phi-tan-cung-xuan-sang, image = khon-ninh-cung-xuan-sang (tải lên Magnific: XmPyNuqBfo, CqGAYrVEEy). Tối/trưa/chiều/mùa = SỬA từ bản xuân-sáng (cách làm của 160 cảnh mùa × buổi, không trôi bố cục).
- Tốn: 3 × 80 = 240 tín dụng.

## Mockup iPad (dev/test/residence-mock.js; dev/shots/residence/mock/)
`node dev/test/residence-mock.js http://mock.local/dev/index.html 1180x820@2 <out> ipad11` (tự phục vụ tệp trong Playwright, không cần máy chủ).
ipad11-* (1180x820@2), ipad13-* (1366x1024@2): chuvi-sang, chuvi-toi (chủ vị trong chính điện), phoidien-sang (phi tần bậc thấp trong Đông phối điện).
Trang tranh dọc cắt giữa ảnh ngang theo `ax` (KIT_FANCHOR) như mọi cảnh khác.

## Ai ở đâu (theo mã j27 palFix / palaceOf / residents, j9, j6 SCIMG, j21, j42)
| Người | Nơi ở | Tranh hiện có |
|---|---|---|
| Hoàng thượng | Dưỡng Hòa điện (dtd) | duong-tam-dien ×16 |
| Thái hậu | Đức Thọ cung (tn) | tu-ninh-cung ×16 |
| Hoàng hậu | Càn Ninh cung (kn) — ở một mình (chủ 11/14) | khon-ninh-cung ×16 |
| Hoàng quý phi / Quý phi / Phi (rank ≥ 4 = chủ vị, palHeadOK) | một trong 8 cung MAPH.rivalSlots: Cảnh Phúc, Khải Tường, Chung Tú, Hàm An, Thừa Minh, Diên Huy, Vĩnh Hòa, Trường Xuân (S.pal / v.pal) | chung phi-tan-cung ×16 → MỚI: chính điện riêng mỗi cung |
| Tần / Quý nhân / Thường tại / Đáp ứng (rank < 4) | thiên điện trong cung của một chủ vị (resHead, ≤3 người/chủ vị) | chung phi-tan-cung → MỚI: phối điện (Đông/Tây) của cung đó, dùng chung cho người ở cùng |
| Người chơi trước khi làm chủ vị | Ngọc Thanh các (home) | tam-cung-dem ×16 |
| Người chơi khi làm chủ vị | được ban một trong 8 cung (S.pal) | → chính điện của cung đó |
| Phi tần thất sủng | Trường Môn viện (lc, lãnh cung) | lanh-cung ×16 |
| Cung nữ, ma ma | theo chủ nhân (ở dãy nhà cung nhân trong cung chủ); cnv: cung nữ của một phi tần; phạt: Tân Giả khố | chưa có → MỚI: dãy nhà cung nhân (chung) |
| Thái giám | theo chủ / Kính sự phòng, Nội vụ phủ | kinh-su-phong ×16 (chỗ làm); MỚI tùy chọn: dãy nhà thái giám |
| Thái y | Thái y viện (tyv) | thai-y-vien ×16 |
Ghi chú: mã hiện tính chủ vị = rank ≥ 4 (Phi trở lên); quyết định chủ 11/14 nói Tần cũng là chủ vị — người gộp cần thống nhất (không đổi ở đây).

## Kế hoạch triển khai (đủ 16 bản: sáng/trưa/chiều/tối × 4 mùa, VẼ thật, không phủ màu — chủ 11/14)
Hình: chỉ iPad ngang (trang tranh trái của sách); điện thoại/Fold không có trang tranh (KIT §32) → một hình 3:2 dùng cho cả 1180x820 và 1366x1024.
Cách vẽ: mỗi phòng 1 bản gốc xuân-sáng (vẽ mới, 80) + 15 bản SỬA từ bản gốc (giữ bố cục).
Giá (simulate_cost, chính xác): vẽ mới 4k = 80; sửa 4k = 80, 2k = 65, 1k = 40 (160 cảnh cũ là 1k/1280x720).
Đề xuất 2k cho bản sửa (trang tranh iPad @2 cao ~1500 px; 1k không đủ nét).

| Phòng | Số phòng | Ảnh (×16) |
|---|---|---|
| Chính điện 8 cung (chủ vị) | 8 | 128 |
| Phối điện Đông + Tây mỗi cung (người ở chung dùng chung một phối điện; 2 phối điện/cung đủ cho ≤3 người, hai nhà kế nhau khác phòng) | 16 | 256 |
| Dãy nhà cung nhân (cung nữ, ma ma; chung) | 1 | 16 |
| Dãy nhà thái giám (tùy chọn) | 1 | 16 |
| **Tổng phương án A** | 26 | **416** |
Tín dụng A: 26 × 80 (gốc) + 390 × 65 (sửa 2k) = 2.080 + 25.350 = **27.430**; dự trù vẽ lại 20% → **~33.000** (sửa 4k: ~40.000; sửa 1k: ~21.000).
Phương án B (tiết kiệm): 1 phối điện/cung → 8+8+1+1 = 18 phòng = **288 ảnh**: 1.440 + 270 × 65 = 18.990 → ~**23.000** với dự trù.
(Đã trừ: thử nghiệm 240. Tài khoản còn ~1,67 triệu.)
Thứ tự: 8 chính điện + phối điện xuân-sáng trước (bảng ghép cho chủ duyệt bản sắc từng cung) → tối → chiều → trưa → 3 mùa còn lại.

## Gợi ý bản sắc 8 cung (mỗi cung: màu, cây, bố cục khác nhau)
Cảnh Phúc: ngọc bích/men ngọc, ngọc lan trắng, cửa trăng + ao cá (đã vẽ) · Khải Tường: đỏ son + vàng, lựu đỏ, sân đá có giếng · Chung Tú: lam
thanh + bạc, tử đằng, hành lang nước · Hàm An: vàng hổ phách + nâu, quế/mộc tê, thư phòng giá sách · Thừa Minh: trắng ngà + xanh lam, mai trắng,
cửa sổ tròn nhìn non bộ · Diên Huy: hồng đào + vàng kim, mẫu đơn, đình sân · Vĩnh Hòa: xanh lá trúc + nâu, rừng trúc, hiên gỗ · Trường Xuân:
san hô + xanh ngọc, hải đường, cầu nhỏ + hồ sen.

## Còn lại
- Chờ chủ duyệt thử nghiệm. Sau đó mới vẽ hàng loạt và gắn (chọn ảnh theo palSlot/resHead + mùa/buổi như j94).
