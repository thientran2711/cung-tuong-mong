# PROGRESS: kit sách · lật trang cong (review/page-curl)

KIT READY: page-curl (jbook.js + KIT.md §32; ảnh `dev/shots/book/`)

Nhánh `review/page-curl` từ origin/review/fold-layout (đã gộp tới e7debd1a). Không gộp main; chờ kiểm duyệt.

## Đã xong
- `dev/build/jbook.js` (assemble: sau j79, trước j87):
  - `kitCurl` / `kitCurlRun` / `kitCurlOff` / `kitCurlFade`: trang cong như giấy (10–18 dải dọc nối rotateY preserve-3d, mặt trước/sau,
    bóng sáng theo góc, bóng đổ chạy trên trang bên dưới), 560–600 ms; "Cảnh động" tắt / giảm chuyển động → mờ chéo.
    Bản sao trang: bỏ id, sticky → relative, giữ vị trí cuộn (không nhân đôi nhãn khi cuộn ngang).
  - `kitBookSpread(host,{pic,text,double})`: iPad ngang = hai trang (trái tranh, phải chữ, gáy sách, mép giấy); điện thoại = CHỈ trang phải
    (theo chủ 11/14: không trang tranh trên điện thoại, không nút "Mở trang"). `swap(fn,{dir})` = đổi tab bằng lật trang cong.
    `double` = bản đồ trải hai trang. `kitBookSpread.wantsPic(host)`.
  - `kitBookPic({...})`: trang tranh (cảnh theo KIT_FANCHOR, người toàn thân đứng trên đường chân, bóng người lạ, nhãn chú thích, ô thử đồ).
  - Da giấy `.kpaper` dùng chung.
- `j87` sổ tuần: thay lật cứng rotateY bằng `kitCurl` (vuốt theo ngón tay, nút ‹ ›, phím; spread trên iPad, một trang trên điện thoại).
- KIT.md §32 (API + bảng trang trái/phải đã duyệt) và §27 (dòng lật trang).
- Thử: `dev/test/page-curl.js` (khung giữa lật đóng băng rAF, lật lùi, kéo tay, giảm chuyển động), `dev/test/book-mock.js` (mockup).

## Kiểm thử (Playwright)
- page-curl: 1180x820@2, 1366x1024@2, 686x880@2.2, 755x1000@2 — không lỗi trang, không tràn ngang, giảm chuyển động = không cong (mờ chéo).
  390x844@3: khung giữa chụp được, trình duyệt thử bị sập ở bước kéo tay (máy thử load ~50, bộ nhớ) — cần chạy lại khi máy rảnh.
- Đếm khung hình thật ở máy thử không có nghĩa (load ~50 trên 4 lõi); chưa đo trên Fold/iPad thật.
- Mockup không gắn vào bố cục thật (chủ kit fold-layout sẽ gắn).

## Còn lại
- Gắn kitBookSpread vào bố cục thật (chủ kit fold-layout): host = vùng giữa thanh trên và thanh tab; tab → `swap()`.
- Đo mượt trên máy thật (Safari iPad, Chrome Fold); nếu nặng: giảm `n` dải (tham số `n`).
- Dư đồ: chạm một nơi → trang trái cảnh nơi đó + bóng người (kitBookPic có sẵn `dim`), chưa làm mockup bước này.
