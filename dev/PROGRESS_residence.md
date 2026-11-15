# PROGRESS: tranh nơi ở (review/residence-art)

## TRẠNG THÁI
- Chủ duyệt thử nghiệm ("Nền ok"), chọn phương án A, đủ 16 bản (4 mùa × sáng/trưa/chiều/tối) cho MỌI phòng (chính điện, phối điện, cung nhân).
- BƯỚC 1 XONG: xuân-sáng đủ 25 phòng (8 chính điện + 16 phối điện Đông/Tây + dãy nhà cung nhân); dãy nhà thái giám tạm bỏ.
  Bảng ghép có nhãn: `dev/shots/residence/sheet-xuan-sang.jpg` (3396x7563; dựng lại: `python3 dev/art/residence_sheet.py xuan-sang`).
  Mã Magnific từng ảnh: `dev/shots/residence/gens.txt`. Đã tự xem từng ảnh: không người, đúng nét vẽ, mỗi cung một bản sắc, phối điện nhỏ/giản hơn mà không nghèo, hai phối điện của một cung khác bố cục.
  Tín dụng bước 1: 23 × 80 = 1.840 (cộng thử nghiệm 240 → 2.080).
- BƯỚC 2 (CHỜ chủ duyệt bảng ghép): 15 bản còn lại mỗi phòng = SỬA từ bản xuân-sáng (1 tham chiếu ảnh = chính nó), 2k (65/ảnh): 25 × 15 = 375 ảnh ≈ 24.400 (+20% ≈ 29.000). Thứ tự: tối → chiều → trưa, rồi Hạ/Thu/Đông.
  Bố cục phối điện (để giữ khác nhau): CP Đ phòng ngủ+bàn trang điểm, T sập cửa sổ+đàn; KT Đ giường trong vòm trăng, T phòng trà; CT Đ phòng nhạc, T phòng ngủ+khung thêu; HA Đ thư phòng nhỏ, T phòng ngủ+bình phong; TM Đ phòng cắm hoa, T phòng ngủ+bàn cờ; DH Đ phòng ngủ+bàn trang điểm, T phòng vẽ; VH Đ phòng trà mở ra rừng trúc, T phòng ngủ sau vách vòm; TX Đ phòng thêu nhìn cầu, T phòng ngủ+góc đọc sách.

## BƯỚC 2 (chủ duyệt bảng xuân-sáng) — 15 bản còn lại × 25 phòng + gắn vào game
- Vẽ: 375 bản SỬA (gpt-2-6, 2k, 3:2; 1 tham chiếu = bản xuân-sáng của phòng; lời nhắc `dev/art/residence_prompts.txt`), thứ tự tối → chiều → trưa, rồi hạ, thu, đông.
  Mã từng ảnh: `dev/shots/residence/gens.txt` (400 dòng = 25 phòng × 16). Tải về bằng projects_download_zip (≤50 mã/lần) rồi
  `python3 dev/art/residence_proc.py <zip> [xem trước]` → `img/<phòng>-<mùa>-<buổi>.webp` (1620x1080, q72). Bản gốc 4k chỉ giữ cho xuân-sáng (dev/shots/residence/*.webp).
  Đã xem từng bảng 25 ảnh/biến thể: giữ bố cục, đúng mùa/buổi, không người. Không phải vẽ lại ảnh nào.
- Bảng ghép theo mùa: `dev/shots/residence/sheet-<mùa>.jpg` (25 phòng × 4 buổi) — `python3 dev/art/residence_season_sheet.py <mùa>`.
- Mã: `dev/build/jres.js` (assemble: sau jk4, trước j84). RES_VAR viết lại bằng `python3 dev/art/gen_res_var.py`.
  API cho thợ bản đồ cung: `residenceArt(palaceKey, 'chinh'|'dong'|'tay'|'cungnhan', mùa, buổi)` → đường ảnh (thiếu → cùng mùa buổi gần → xuân → xuân-sáng);
  `residenceOf(p)`, `roomResidents(pal,part)`, `roomPeople(pal,part)` (ai đang ở nhà buổi này theo S.where), `resRoomName(r)`.
  Luật phòng: chủ vị (rank ≥ PAL_HEAD=Tần, có pal) = chính điện; người ở chung (resHead) xếp theo khóa: 2 người đầu Đông phối điện, sau đó Tây;
  Hoàng hậu Càn Ninh (khon-ninh-cung), lãnh cung lanh-cung, người chơi chưa làm chủ vị = Ngọc Thanh các (tam-cung-dem; mã palFix giữ nàng ở đó), cnv/cung nhân = cung-nhan.
  Sân khấu: "home" và thăm cung "r<id>" tính phòng TƯƠI mỗi lần vẽ (renderStage, pxScene, evArt); thăm "Đến cung nàng thăm" = phòng của chính người đó,
  chỉ người của phòng đó (+ khách ở chính điện); phòng của nàng có bạn cùng phòng đang ở nhà thì hiện cùng.
  Sửa j11 (PIXI): ảnh nền tải chậm của lần trước không còn đè ảnh mới (PX.src) — trước đây đổi phòng cùng buổi có thể kẹt ảnh cũ.
- Thử: `node dev/test/residence-live.js 686x880@2.2|1180x820@2 dev/shots/residence/game <tag>`: Thường tại ở Ngọc Thanh các → phong Tần → chính điện cung mình
  (đổi ngay); thăm Đông phối điện có 2 người cùng phòng; tối. Không lỗi trang, không tràn ngang.

# (thử nghiệm ban đầu)

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
