# PROGRESS: kit sách · lật trang cong (review/page-curl)

KIT READY: page-curl v2 (jbook.js + KIT.md §34.1/34.1b; ảnh `dev/shots/curl2/`)

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
- KIT.md §34 (API + bảng trang trái/phải đã duyệt) và §27 (dòng lật trang).
- Thử: `dev/test/page-curl.js` (khung giữa lật đóng băng rAF, lật lùi, kéo tay, giảm chuyển động), `dev/test/book-mock.js` (mockup).

## v2 (15/11, theo OWNER_DECISIONS 03:30Z + 04:00Z)
- `kitCurl` v2 (jbook.js): góc trang nhấc trước, gấp theo đường CHÉO, nghiêng khi lật, lộ mặt sau với bóng cong (tối ở nếp gấp → ánh sáng → mép tối),
  bóng của tờ đang lật đổ lên trang dưới, bóng dọc nếp gấp trên trang được mở ra. Mẫu: dev/owner-shots/1115-curl-ref-*.jpg.
  Hình học: góc A=(w,h) đi tới C(p)=(w−2wp, h−lift·sin πp); nếp = trung trực A–C, kẹp để không gấp gáy. Mỗi khung chỉ đổi transform/opacity
  (hộp nửa mặt phẳng overflow:hidden thẳng theo nếp; không clip-path, không layout). Bỏ cách cũ 10–18 dải rotateY (cuộn trụ dọc).
  Tùy chọn mới: `mirror` (góc trái-dưới dẫn, lật lùi trên một trang), `vanish` (mờ dần 28% cuối), `keepId`. Lớp CSS mới `.kcl-*`
  (đổi tên khỏi `.kpc` vì j90 pháo giấy cũng dùng `.kpc`).
- `kitCurlSwap(el, fn, {dir})`: lật trang SỐNG — bản sao #panel cong đi trên nội dung mới. Gắn vào game (cuối jbook, bọc render() sau mọi
  module): đổi tab (thanh tab, tab con Hậu cung/Mệnh truyện) = lật cong 720 ms; tab bên phải → góc phải-dưới; tab bên trái → gương.
  Không lật khi khung #panel đổi kích thước (vào/ra Dư đồ) hoặc ẩn (điện thoại ở phòng); giảm chuyển động → mờ chéo.
- Sổ tuần j87: 680 ms; kitBookSpread.swap 700 ms.
- Dư đồ = BẢN ĐỒ DA (kitLeather, CSS, không vẽ mới): da thuộc có vân, mép cháy, viền da không đều, chỉ khâu, hai đầu cuộn, tranh bản đồ
  đặt trên da; đầy khung, không gáy/không trang. BỎ dải thông tin trên bản đồ (mùa · còn khắc · chú thích đi lại · chip lễ tết).
  Vào Dư đồ: bản đồ trải ra từ giữa (kitUnroll 620 ms). kitBookSpread `double` cũng là bản đồ da phủ cả sách.
- KIT.md §34.1 (v2) + §34.1b kitLeather. Thử: `dev/test/curl-live.js` (game thật: bản đồ, khung giữa lật tab, lật lùi, đi hết các tab,
  giảm chuyển động), `dev/test/page-curl.js` (sổ tuần).
- SÁCH SỐNG (kitBookLive, 15/11 theo lệnh ưu tiên): game thật = cuốn sách mở. iPad ngang: sân khấu phòng = trang tranh trái, bảng tab = trang
  chữ phải, gáy giữa, bìa chàm phía sau; điện thoại: một trang giấy. Mọi tab, cả đường cung nữ. Dư đồ không phải trang (da).
- MỘT PHÔNG phòng: j11 Pixi chỉ vẽ bản sao phòng khi đúng tranh + khung của #scimg (kể cả tranh dọc -p) và phủ kín; không thì ẩn, chỉ CSS.
- Đã gộp origin/review/fold-layout (27d79926).
- Thử: `dev/test/book-live.js <base> <WxH@dpr> <out> <tag> [srv] [tabs]` (ảnh từng tab, đếm phông, tràn ngang, lỗi).

## Kiểm thử (Playwright)
- page-curl: 1180x820@2, 1366x1024@2, 686x880@2.2, 755x1000@2 — không lỗi trang, không tràn ngang, giảm chuyển động = không cong (mờ chéo).
  390x844@3: khung giữa chụp được, trình duyệt thử bị sập ở bước kéo tay (máy thử load ~50, bộ nhớ) — cần chạy lại khi máy rảnh.
- Đếm khung hình thật ở máy thử không có nghĩa (load ~50 trên 4 lõi); chưa đo trên Fold/iPad thật.
- Mockup không gắn vào bố cục thật (chủ kit fold-layout sẽ gắn).

## Còn lại
- Gắn kitBookSpread vào bố cục thật (chủ kit fold-layout): host = vùng giữa thanh trên và thanh tab; tab → `swap()`.
- Đo mượt trên máy thật (Safari iPad, Chrome Fold); nếu nặng: giảm `n` dải (tham số `n`).
- Dư đồ: chạm một nơi → trang trái cảnh nơi đó + bóng người (kitBookPic có sẵn `dim`), chưa làm mockup bước này.
