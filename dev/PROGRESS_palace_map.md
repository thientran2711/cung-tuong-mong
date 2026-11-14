# PROGRESS: bản đồ chi tiết cung (review/palace-map)

Nhánh `review/palace-map` từ origin/review/page-curl (32e5ff81) + gộp origin/review/residence-art (9eef1e3f).

## Yêu cầu chủ (11/15)
Dư đồ → chạm 1 trong 8 cung phi tần → bản đồ chi tiết cung (Chính điện, Đông phối điện, Tây phối điện; chip "N bóng người" = số người thật
buổi này) → chạm một phần → tranh phòng ấy với đúng những người ở đó → quay lại: phòng → cung → Dư đồ.

## Tranh
- Điều phối (chủ quyết): KHÔNG vẽ Magnific; dùng tranh L2 của Phượng Lệnh (repo thientran2711/phuong-lenh-art commit a9becbe,
  places/palace/nhat/x/L2/<dir>/<state>.webp; nghiên cứu: dev/research/PHUONG_LENH_ART_REUSE.md trên nhánh claude/cung-tuong-mong-handover-hj0h8w).
  Chủ chốt (11/15): CHỈ bậc nhat; sân theo PHẨM chủ vị hiện tại (bảng rankDir trong img/pl2/hotspots.json): Hoàng hậu → can-ninh,
  Hoàng quý phi → vinh-hoa, Quý phi → quy-cung, Phi → phi-cung, Tần → cac, không chủ vị → spare-cung. Cùng phẩm dùng chung tranh (chủ chấp nhận).
  Đã lấy 6 thư mục nhat (can-ninh, vinh-hoa, quy-cung, phi-cung, cac: 28 trạng thái = 16 mùa×buổi + 12 lễ; spare-cung: 17) = 157 tệp
  → img/pl2/nhat-<form>-<state>.webp (1792 px, q80, ~45 MB). Tín dụng Magnific đã dùng: 0.
  Soát mắt (dev/shots/palace-map/sheet-*.jpg): ổn; lưu ý: bản dong-chieu mọi sân ngả kem nhạt; khung hình vài trạng thái (spare-cung, cac
  mùa đông) xê dịch nhẹ so với xuân-sáng → điểm chạm đặt rộng; cac không vẽ rõ hai phối điện (điểm chạm đặt ở hai dãy tường bên).
- Phòng: tranh residence xuân-sáng (24 phòng) thu về 1920x1280 q80 → img/res/. Bản mùa/buổi khi thợ residence vẽ xong: đặt cùng tên
  <cung>-cung[-dong-phoi|-tay-phoi]-<mùa>-<buổi>.webp vào img/res/ rồi chạy `python3 dev/tools/pl2_sync.py` (tự nhận).

## Mã
- `dev/build/jpm.js` (module cuối, sau j84): kitPalaceMap + điều hướng + đếm + phòng. KIT.md §33.
- `img/pl2/hotspots.json` (điểm chạm từng tranh) ⇄ chép vào jpm.js bằng `dev/tools/pl2_sync.py`.
- Thử: `node dev/test/palace-map.js <W>x<H>@dpr <out> <tag>` → dev/shots/palace-map/.

## Trạng thái — SẴN SÀNG KIỂM (bc03bb84 + sau)
- Thử 686x880@2.2, 1180x820@2, 1366x1024@2 (dev/shots/palace-map/{fold,ipad11,ipad13}-{1-map,2-detail,3-room,4-back}.jpg):
  Σ chip 3 phần = countAt (5=5), người trong phòng = người của phòng (2/2), quay lại phòng→cung→Dư đồ đúng, không tràn ngang, 0 lỗi trang.
- Điện thoại (kitPhoneShell): tới phòng thì hiện PHÒNG (bấm "‹ Phòng" hộ), không phải trang việc.
- Còn lại / đề xuất: các nơi khác (Ngọc Thanh các→cac, Dưỡng Hòa→duong-hoa, Đức Thọ→duc-tho, Trường Môn→truong-mon, Ngự hoa viên→garden,
  Kính sự phòng→noi-thi, Đông cung) chưa gắn — chỉ cần thêm tranh + điểm chạm vào hotspots.json; dòng chữ ghé thăm trong phòng vẫn liệt kê
  cả cung (j27), có thể rút gọn.

## Vòng 2 (theo điều phối, sau bc03bb84/9b6ae92d)
- (1) iPad 1180 hàng phần dưới tranh bị cắt → tranh sân co theo chỗ còn lại (container units), hàng luôn đủ; đo không cắt ở 686/755/1180/1366.
- (2) Dòng chữ đầu phòng: chỉ "Ở đây có N người. Người ở: <người ở phòng này>".
- (3) Nơi khác: Ngọc Thanh các→cac, Dưỡng Hòa→duong-hoa, Đức Thọ→duc-tho, Trường Môn→truong-mon, Ngự hoa viên→garden, Kính sự phòng→noi-thi
  (nhat, đủ mùa×buổi + lễ có sẵn; 117 tệp mới; img/pl2 tổng ~96 MB). Mỗi nơi một điểm chạm (toà chính) → vào nơi ấy như cũ (tranh phòng sẵn có).
  Đông cung: game chưa có nơi này → chưa gắn. Soát mắt: dev/shots/palace-map/sheet-*.jpg (truong-mon xuân-sáng cắt gần hơn các bản khác).
- (4) Thử save cũ: dev/test/palace-oldsave.js (chơi 2 buổi ở bản page-curl, lưu ô 3, mở bản mới, "Tiếp tục kiếp này").
- Tỉ lệ người: dùng sân khấu kit sẵn có (j59/kitFigScale khi review/fold-layout gộp) — jpm không đặt cỡ riêng.
