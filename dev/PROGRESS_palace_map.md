# PROGRESS: bản đồ chi tiết cung (review/palace-map)

Nhánh `review/palace-map` từ origin/review/page-curl (32e5ff81) + gộp origin/review/residence-art (9eef1e3f).

## Yêu cầu chủ (11/15)
Dư đồ → chạm 1 trong 8 cung phi tần → bản đồ chi tiết cung (Chính điện, Đông phối điện, Tây phối điện; chip "N bóng người" = số người thật
buổi này) → chạm một phần → tranh phòng ấy với đúng những người ở đó → quay lại: phòng → cung → Dư đồ.

## Tranh
- Điều phối (chủ quyết): KHÔNG vẽ Magnific; dùng tranh L2 của Phượng Lệnh (repo thientran2711/phuong-lenh-art commit a9becbe,
  places/palace/nhat/x/L2/<dir>/<state>.webp; nghiên cứu: dev/research/PHUONG_LENH_ART_REUSE.md trên nhánh claude/cung-tuong-mong-handover-hj0h8w).
  Đã lấy 5 thư mục: phi-cung, quy-cung, vinh-hoa, can-ninh (28 trạng thái: 16 mùa×buổi + 12 lễ), spare-cung (17) = 129 tệp → img/pl2/ (1792 px, q80).
  Ánh xạ: Cảnh Phúc/Khải Tường/Chung Tú/Hàm An → phi-cung · Thừa Minh/Diên Huy → quy-cung · Vĩnh Hòa → vinh-hoa · Trường Xuân → spare-cung
  (tranh sạch sẽ, không hoang phế → giữ) · Càn Ninh → can-ninh. Tín dụng Magnific đã dùng: 0.
- Phòng: tranh residence xuân-sáng (24 phòng) thu về 1920x1280 q80 → img/res/. Bản mùa/buổi khi thợ residence vẽ xong: đặt cùng tên
  <cung>-cung[-dong-phoi|-tay-phoi]-<mùa>-<buổi>.webp vào img/res/ rồi chạy `python3 dev/tools/pl2_sync.py` (tự nhận).

## Mã
- `dev/build/jpm.js` (module cuối, sau j84): kitPalaceMap + điều hướng + đếm + phòng. KIT.md §33.
- `img/pl2/hotspots.json` (điểm chạm từng tranh) ⇄ chép vào jpm.js bằng `dev/tools/pl2_sync.py`.
- Thử: `node dev/test/palace-map.js <W>x<H>@dpr <out> <tag>` → dev/shots/palace-map/.

## Trạng thái
(xem cuối tệp)
