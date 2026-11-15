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
- 15/11 (chủ: "chỗ lật trang, ảnh trang sau không hiện lên"): trang mới vẽ sẵn bên dưới, bản chụp trang cũ cong đi ở trên;
  góc nhấc cao hơn (lift .42h, lật tab .5h) và nhịp "búng" kitCurlLift (1−(1−t)^1.6) nên trang sau lộ ngay từ những khung đầu;
  mặt sau tờ giấy trơn có bóng chữ ngược mờ (ghost .075) khi lật tab. Sổ tuần và lật lùi dùng cùng nhịp.
- 15/11 muộn (chủ chê lật góc, mẫu app binder 1115-turn-ref-*): đổi tab = CẢ TỜ quay quanh gáy (kitSheetTurn: một tờ hai mặt
  preserve-3d, mặt trước = trang cũ, mặt sau = trang mới, chữ in trên tờ nên quay/nghiêng theo tờ; nghiêng nhẹ + skew giữa lượt,
  bóng trên trang dưới; 760 ms; cắt trên/dưới khung trang). Bản sao (kclPrep) bỏ mọi id (gộp book-release) và tự mang bố cục tính sẵn.
  Sổ tuần vẫn dùng kitCurl (góc gấp, mặt sau = trang kế).
- DỪNG Ở ĐÂY (1fdc37c2, đã đẩy): kitSheetTurn chạy, Fold 686 + iPad 1180 không lỗi. Còn lại: (1) gửi ảnh 25/45/65 % cho chủ
  (dev/shots/curl2/{fold686,ipad1180}-tab-*.jpg) chờ duyệt; (2) KIT.md §32/34 chưa ghi kitSheetTurn; (3) ở 65 % iPad trang thật bên dưới
  thoáng lệch chữ (thẻ người đang đo lại) — kiểm lại trên máy thật; (4) lật lùi (dir −1) quay quanh mép phải, chưa soi kỹ ảnh back-45;
  (5) sổ tuần chưa chuyển sang cả tờ (vẫn kitCurl) — hỏi chủ có muốn giống không.

## v3 NGUYÊN TỜ (15/11, thợ mới, nối từ 0e8cb4ef; luật sếp 06:25Z + 07:50Z + 10:00Z, ảnh mẫu dev/owner-shots/1115-turn-ref-1/2.jpg)
- `kitSheetTurn` viết lại (jbook): trục gáy = mép TRÁI tờ (luôn), p 0→1 = lật tới; lật lùi = cùng chuyển động chạy 1→0 (tờ mang trang mới
  quay ngược qua gáy, đáp đúng lên trang mới; bản chụp trang cũ nằm dưới `under` tới khi bị phủ). Bỏ kiểu cũ "lật lùi quay quanh mép phải".
  Tùy chọn x/y (gáy trong host), p đầu, shadeL/shadeR (bóng hai bên đất), vanish (mờ 18 % cuối), setFront/setBack.
- `kitCurl` = `kitSheetTurn` (sổ tuần j87 + kitBookSpread tự đổi sang nguyên tờ); bộ gấp góc cũ giữ tên `kitCurlFold` (không dùng).
- SỬA LỖI: lớp `.kst` của tờ lật TRÙNG lớp ô chỉ số `.kst` (jk4/j79) → ô chỉ số thanh trên bị `pointer-events:none` + absolute.
  Đổi họ lớp tờ lật thành `.ksht*`.
- Vuốt ngang trên trang (#panel) = sang tab kế / tab trước (trái = tới); bỏ qua bản đồ, hộp thoại, ô nhập, thứ cuộn ngang.
- `kitCurlSwap.hold(p)` / `.end()` = móc thử (không còn đóng băng rAF toàn trang → trang dưới đo bố cục bình thường).
- KIT.md §34.0 LUẬT LẬT TRANG (7 điểm) + §27 dòng lật sổ tuần; §34.1 cũ ghi là lịch sử.
- Thử: `dev/test/sheet-turn.js` → ảnh `dev/shots/page-curl2/<tag>-fwd-{20,45,70}.jpg`, `-back-{60,30}.jpg`.
- Sếp 01:50Z "cho animation lật trang chậm lại": MỘT hằng số `KIT_TURN_MS` = 1300 ms (cũ: lật tab 760, sổ tuần 680, sách 700),
  nhịp `kitTurnEase` (nhấc chậm, quay đều, đáp êm dài). Bấm khi đang lật: lượt đang chạy nhảy tới cuối rồi lượt mới chạy (sổ tuần: flush()).
- Lật tab vẫn chạy khi khung #panel xê dịch vài px giữa hai tab (iPad 1366 lần đầu); chỉ bỏ lật khi đổi bố cục lớn (>40 px / >12 %).
- KẾT QUẢ THỬ (máy thử load ~20): sheet-turn.js Fold 755x1000@2, iPad 1180x820@2, 1366x1024@2: lật tới/lùi có tờ, 1 #panel, 0 id trùng,
  không tràn ngang, 0 lỗi trang, bấm nhanh 12 lần không kẹt (0 tờ sót), vuốt trái → Cung nhân / vuốt phải → Hậu cung, nút tab lật được,
  Cảnh động tắt = 0 tờ. page-curl.js (sổ tuần) Fold 755: nguyên tờ, lật lùi, kéo tay, giảm chuyển động = không tờ, 0 lỗi.
- Không sửa mã lưu/nạp (sổ cũ không bị đụng).
- DỪNG (SẴN SÀNG KIỂM). Còn lại nếu sếp muốn: trên Fold (một trang) mặt sau tờ chỉ thấy thoáng qua vì nửa sau đi ra ngoài mép trái màn hình
  (trục gáy = mép trái trang); iPad thấy rõ mặt sau đáp lên trang tranh.

## v4 CONG THEO NGÓN TAY (review/drag-curl, sếp 08:10Z Sổ tuần trên Fold/iPad: "Tại sao trang vẫn lật bị đơ… nó phải CONG")
- `kitSheetTurn` v4 (jbook): tờ UỐN như giấy, bản lề ở gáy. Góc quay theo bề ngang u: φ(u)=π·clamp01(C(u−1)+p(1+C)) → phẳng tới nếp,
  rồi cuộn MỘT bán kính (w/πC); mép tự do dẫn và cuộn qua, rồi gốc nhấc khỏi gáy, tờ đáp sang trái. C=`stiff`: giấy 1.6, bìa sổ/bìa sau .7
  (cứng, cong ít). Vẽ bằng n DẢI dọc cố định trên tờ (~26 px/dải, 10–32), mỗi dải là cửa sổ 3D đặt trên dây cung của đoạn cong, hai mặt
  (trước = trang cũ, sau = trang mới; cùng bản chụp kclPrep, không id), backface ẩn. Mỗi dải tự chiếu phối cảnh (một mắt trên gáy),
  xếp chồng theo độ cao (z-index), KHÔNG dùng chung preserve-3d (sắp chiều sâu của trình duyệt làm mép bậc thang + khe sáng giữa dải).
  Cắt trên/dưới (và gáy khi vanish) bằng hộp overflow, không clip-path. Mỗi khung chỉ đổi transform + opacity bóng
  (bóng theo góc ánh sáng từng dải: một lớp đặc + một lớp dốc → bóng liền mạch qua chỗ cong; bóng đổ trên trang dưới cạnh chỗ cuộn).
  Tờ luôn đục (nền giấy `.ksht-pp`), cắt ở gáy (vanish) như cũ. API mới: `tip(p)`, `pAt(edgeX)`, `dragTo(frac,fwd,two)`, `stiff`, `flat`.
- Giữ + kéo: mép tờ theo ngón từng chút, dừng tay là đứng yên (không chạy hoạt cảnh). Thả: quá nửa đường HOẶC hất (≥ .45 px/ms) → lật hẳn
  theo đà (`kitTurnSettleMs`, ease-out); chưa → bật về êm (tab cũ được đặt lại dưới tờ). `kitTurnDone/kitTurnSettleMs/kitSettleEase`.
  - Sổ tuần j87: kéo trên sách (cả bìa: cứng), nút ‹ ›/chạm mép = lật cong KIT_TURN_MS.
  - Game: kéo NGANG trên #panel = sang tab kế/trước (`kitCurlSwap(...,{drag})` trả bộ điều khiển to/set/settle); dọc = cuộn trang
    (quyết sau 12 px, ngang khi |dx|>1.3|dy|; touchmove không thụ động CHỈ trên #panel + chính đích chạm, vì đích chạm bị vẽ lại khi đổi tab).
    Chạm nút/thẻ = bấm (chỉ lật khi đã kéo ngang rõ, rồi nuốt cú bấm). Bỏ qua bản đồ, hộp thoại, ô nhập, minigame, thứ cuộn ngang.
  - Cảnh động tắt/giảm chuyển động: bấm = đổi ngay (mờ chéo); KÉO vẫn dời trang (`flat`: trượt phẳng một trang / lật phẳng hai trang).
- KIT.md §34.0 viết lại (luật 1, 4, 5b, 6, 7). Thử: `dev/test/drag-curl.js` (chạm thật qua CDP), ảnh `dev/shots/drag-curl/`.
- Không sửa mã lưu/nạp.

## Kiểm thử (Playwright)
- page-curl: 1180x820@2, 1366x1024@2, 686x880@2.2, 755x1000@2 — không lỗi trang, không tràn ngang, giảm chuyển động = không cong (mờ chéo).
  390x844@3: khung giữa chụp được, trình duyệt thử bị sập ở bước kéo tay (máy thử load ~50, bộ nhớ) — cần chạy lại khi máy rảnh.
- Đếm khung hình thật ở máy thử không có nghĩa (load ~50 trên 4 lõi); chưa đo trên Fold/iPad thật.
- Mockup không gắn vào bố cục thật (chủ kit fold-layout sẽ gắn).

## Còn lại
- Gắn kitBookSpread vào bố cục thật (chủ kit fold-layout): host = vùng giữa thanh trên và thanh tab; tab → `swap()`.
- Đo mượt trên máy thật (Safari iPad, Chrome Fold); nếu nặng: giảm `n` dải (tham số `n`).
- Dư đồ: chạm một nơi → trang trái cảnh nơi đó + bóng người (kitBookPic có sẵn `dim`), chưa làm mockup bước này.
