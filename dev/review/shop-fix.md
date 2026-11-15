# Kiểm duyệt: review/shop-fix (144f28bc4, chứa review/act-pics b2d2deae4) gộp lên main — PASS có sửa của người duyệt

Ngày 2026-11-15. Nhánh gộp: `review/shop-fix-merged`, dựng trên origin/main **6e6c2ae6d** (gộp lần đầu trên d69030384; main đổi hai lần giữa chừng:
218a591fd hoang-tu, 6e6c2ae6d act-audit → gộp lại mỗi lần, chỉ xung đột index.html/sw.js/assets.json = dựng lại; thử lại shop-fix 3 khổ + sổ cũ 1000 trên bản cuối). review/econ CHƯA ở main → tab Bán chạy bằng dự phòng của jinv
(`kitShopSellable` / `kitShopPrice`); khi econ gộp, `kitShopSellList` tự dùng `econSellable` (mã đã viết sẵn, chưa thử được).

## Gộp
- Xung đột: `assets.json` (dựng lại), `img/ACTS.json` (main đã bỏ img/ khỏi git). `img/ACTS.json` và `img/fig-eunuch-ndp-tray.webp` của
  nhánh BỎ khỏi git: ACTS.json trên CDN trùng md5 với bản nhánh; thái giám bưng khay trên CDN là cùng tranh (mã hóa lại, 54 640 B).
- 117 khóa ảnh act-* mà ACTS.json trỏ tới (acts, prefix, log, have): HEAD 200 trên CDN, trừ `ev:hoang-de-dem` / `scene:rv` — không phải tệp
  act mà là khóa loại (j87 `kbkKeySrc` đọc ev:/scene:), đúng.
- `index.html`/`sw.js`/`assets.json` dựng bằng `dev/site/build_site.sh`. Thứ tự module giữ của main (… jinv, jwdinv, jk4, jmen, … jht, jload, jplace, j84).

## Sửa của người duyệt
1. **Chip tên người bán nằm trên đầu thay vì dưới chân** (gặp ở 1000/1180/844 và mọi lần mở lại cửa hàng): khi tranh người đã đo
   (kitFigBody có sẵn), `kitEsFit` (33.6) chạy trước lúc `.kdper` được gắn và để lại `position:relative` + `max-width` trên `.kpsn`;
   kiểu nội tuyến thắng luật `position:absolute` của chip 32.7. Sửa ở `kitDpFit` (jk4): khi dời chip vào cột thì gỡ position / z-index /
   max-width. Lỗi này thuộc mã chung của main (mọi hộp thoại 32.7 mở lần hai với cùng người), không riêng cửa hàng. Sau sửa: 3 lần mở liền
   ở 1180, chip đáy cột (capB 763 / cột 765), position absolute.
2. **Tên thái giám chưa quen** hiện "Thái giám Nội vụ phủ / thái giám ???" (j61 che tên rồi thêm lại tước): `kitShopNvp` đưa "???" khi
   `k61Named` sai → "Thái giám Nội vụ phủ / ???".
3. Lời: "dâng lên cho nương nương chọn" (lời kể, sai luật "ta" và sai phẩm dưới Tần) → "dâng lên cho ta chọn: “…xin tiểu chủ / nương nương
   xem qua.”" theo phẩm; "(tab Tài nghệ)" → "(mục Tài nghệ)" (VANPHONG cấm "tab"); nhãn/tooltip ✕ "Đóng" → "Lui" (KIT 32.10 sửa theo).

## Kết quả thử (máy chung tải ~50–60, tranh lấy từ CDN; chặn tải nền `ctmload` để đo, vì hàng đợi 650 MB tranh làm tranh người bán chờ >12 s)
- `dev/test/shop-fix.js` 4 khổ (755x1000@2, 1000x755@2, 1180x820@2, 844x390@3): mỗi hàng ô lệch **0 px** (tranh, tên, dòng dùng, đáy giá,
  bộ đếm, nút, chiều cao ô); 3 cột, 8 ô; không cắt chữ, không chữ bị kẹp; chỉ `.kshg` cuộn; 0 "Thôi"; ✕ ở đầu và đóng được; "Ta có 70 bạc";
  + → "Mua · 40 bạc", huy hiệu ×2, mua → Tư trang ×2, bạc 70→30, cửa hàng vẫn mở; ô thiếu bạc xám "Thiếu bạc"; chạm tranh → thẻ món nổi
  trong hộp có ✕, ✕ đóng thẻ; tab Bán: "Bán · 20 bạc", ×2, bán hết → dòng trống; 0 lỗi trang, 0 tràn ngang.
- Khung trùng khít: cửa hàng = hộp thoại 32.7 thường cùng người bán **±0 px** ở 755 [31,140,694,720] và 1180 [243,50,694,720]; 1000 / 844
  cùng công thức (cột người 224 / 155 + 470, cao min(100dvh−32, 720)). Tỉ lệ người / cột 0,845 (KIT_FIG), mọi khổ.
- Sổ cũ (dựng bằng main d69030384, xuất thân ch) nạp ở 4 khổ: "loaded … turn 1", 8 tab không tràn/cắt/%/chữ Hán, 0 lỗi; mở cửa hàng
  từ sổ cũ: tab Bán hiện đồ cũ trong rương (Váy sa xanh ngọc "bán 10 bạc · có 1", Nhân sâm "bán 30 bạc · có 2"); sau ✕ hộp thoại kế tiếp vẫn
  hiện bình thường. Ảnh: `dev/shots/review/shop-fix/sosocu-ban-<khổ>.jpg`.
- `dev/test/act-pics.js` (Fold, 2 tuần, hạt 7): 0 lỗi, 0 ảnh hỏng/HTTP≥400, 0 tràn; 1 cặp liền kề cùng tranh nhưng cùng nghĩa
  ("Điểm trang lộng lẫy" / "Điểm trang: Sắc đêm nay +3") — đạt.
- `node dev/test/kit_dupes.js`: OK.
- `dev/test/coop-e2e.js` trên Worker thật: **59/59** (lần đầu đứt vì page.goto quá 30 s do máy quá tải; chạy lại với hạn điều hướng 180 s).
- Lúc tranh người chưa đo xong, hộp rộng theo cột mặc định 240 px (710 thay 694) rồi co về 694 khi đo xong — chung cho mọi hộp 32.7.

## Đáng lo (không chặn)
- Tranh người trong mọi hộp thoại 32.7 chờ `kitFigBody`: lần đầu, khi jload đang thỉnh tranh nền, tranh người có thể chưa hiện vài giây
  (chip ở đầu cột đến khi đo xong). `kitFigBody` tải ảnh CDN không `crossOrigin` → canvas bị khóa → thân người lấy cả khung (t0 b1 l0 r1):
  cỡ người vẫn theo KIT_FIG nhưng đo lõi/đầu không chính xác. Nên thêm `im.crossOrigin="anonymous"` ở jkit (Worker đã trả CORS *).
- Màu tên phẩm "Thường" xám nhạt dễ trông như món không mua được (theo KIT_GRADE, không đổi ở đây).
- review/kit-close cũng làm kit-x (32.10) riêng: gộp sau nhánh này sẽ xung đột jinv/jk2b/jk4 — người gộp kit-close giữ một bản kit-x.
