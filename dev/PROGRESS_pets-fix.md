# PROGRESS review/pets-fix — sửa review/pets (+ ts-b) sau FAIL kiểm duyệt (dev/review/pets.md trên origin/review/kiem2-notes 7edeb353e)

Nền: **origin/review/pets-gop-thu ce255da65** (gộp thử pets lên main + sửa "Chắc chắn ·" của người duyệt). Làm tiếp trên **review/pets-fix**.

## ĐÃ LÀM
- 5c5787e26 Gộp **origin/review/pet-care 3b3aaba5c** (chăm thú jpetcare, 4 độ lớn Non/Thiếu niên/Trưởng thành/Linh thú, 88 tranh, bỏ rùa,
  roster mới của pets-art). Xung đột: assemble.py (giữ danh sách main + `jpetcare.js` ngay sau `jpet.js`), jpet.js thẻ Thu săn (giữ
  `pp.ts.map(petK)` của pet-care + "Chắc chắn · " của người duyệt), index.html/sw.js/assets.json lấy bản ours (phải dựng lại site).
- df3faee40 Gộp **origin/review/shop-fix 144f28bc4** (kitShop = hộp thoại có người, lưới ô mua trên ô, KIT 28.13d/e) — shop-fix CHƯA vào main,
  nên nhánh này mang theo shop-fix (phải vào main cùng/sau shop-fix). img/ACTS.json + img/fig-eunuch-ndp-tray.webp của shop-fix bỏ khỏi git
  (img/ ở CDN; tranh thái giám bưng khay đã có trên CDN; ACTS.json trên CDN: người gộp shop-fix kiểm lại bản trên CDN có các mục act mới chưa).
- (commit WIP cuối) jpet.js:
  - (1) **Bảng mua thú = kitShop** (`petShop()`, `petShopItems()`, `petBuyOne()`): ô có tranh thú (bản Non vì mua về còn nhỏ), khung + màu phẩm,
    tên, dòng công dụng (chữ cơ may + Tư chất + công dụng), giá, nút Mua trên ô; chạm tranh → thẻ món (Phẩm / Cơ may / Được / Mất / Ghi chú);
    carry = số ô thú còn trống; stock 1 mỗi loài; "Hết khắc" / "Đã có" làm mờ ô; người bán = thái giám Nội vụ phủ (S.court.ped, không có thì
    tranh thái giám bưng khay). petDo("buy") gọi chung petBuyOne.
  - (3) **Tranh theo độ lớn**: `petPSrc(P,big)` dùng `petcStageSrc` (jpetcare) cho ô Thú nuôi và thẻ thú; `petSrc(k,big,sfx)` thêm hậu tố;
    thẻ Ngự ban / quà (con mới về) dùng tranh -non.
  - CHƯA THỬ trong trình duyệt (chỉ node --check + assemble).

## CÒN LẠI (đúng các yêu cầu điều phối 15/11)
1. Bảng mua thú: chạy thử trên 5 cỡ (755x1000, 1000x755, 1180x820, 1366x1024, 844x390): ô thẳng hàng ±1 px (bài dev/test/shop-fix.js của
   shop-fix đo lưới ô — chạy với key "pet"), mua được, ô mờ đúng, thẻ món nổi đúng; chụp ảnh dev/shots/pets-fix/.
2. **Hàng ô Thú nuôi lệch ~17 px**: con đang theo hầu có thêm chip "Đức +1" (`mini` trong petHTML: `kitChip(PET_SN…)` + dòng `.keql2`) nên dòng
   "theo hầu · Khỏe" thấp hơn các ô khác. Sửa: giữ chỗ cố định cho dòng chip ở MỌI ô (ô không theo hầu có chip ẩn `visibility:hidden` cùng cỡ)
   hoặc đưa chip vào dòng trạng thái; đo ±1 px trên 5 cỡ.
3. Tranh độ lớn: kiểm ô Thú nuôi / thẻ thú / màn Chăm hiện đúng -non/-tn/(trưởng thành)/-lt theo petStage (tranh đã trên CDN; thiếu thì
   petcStageSrc có fb). Nếu không hợp: báo điều phối.
4. **Bài thử hỏng trên main** (dev/test/pets.js, dev/test/mk-oldsave-pets.js): màn Luân hồi (#kroul) và màn tải (#kload) chặn chạm. Sửa phần
   dựng như fix-float đã sửa rules-one-source: đặt `window.__nlInner` (bỏ luân hồi), gỡ #kload / .krbox, chặn service worker
   (`serviceWorkers:'block'`). mk-oldsave-pets.js nên dựng sổ bằng index.html của main (sổ cũ thật), không bằng tsbPetAdd.
5. Dựng lại site: `python3 dev/build/assemble.py && bash dev/site/build_site.sh`, commit index.html/sw.js/assets.json.
6. Ghi chú nhỏ của người duyệt (ts-b): thẻ "Lần đầu gặp mặt" câu 2–3 hiện chân dung người chơi thay vì phi tần đang nói — jtsb nên truyền người nói.
7. Báo điều phối "SẴN SÀNG KIỂM" kèm sha + ảnh + số đo.

## Lỗi biết
- Chưa chạy thử gì sau hai lần gộp; index.html/sw.js/assets.json trong git là bản cũ (chưa dựng lại).
- pets-fix chứa shop-fix (chưa duyệt vào main).

## Lệnh thử
- `python3 dev/build/assemble.py` (node --check all.js) · `bash dev/site/build_site.sh`
- `node dev/test/pets.js <url> 755x1000@2 dev/shots/pets-fix <tag> <oldsave>` (sau khi sửa phần dựng, mục 4)
- `node dev/test/shop-fix.js …` (đo lưới ô kitShop; xem đầu tệp)
- Mẫu dựng trang không cần server: dev/test/brand-seal.js / emo-men.js (route http://x.local/ → gốc repo, gỡ .krbox, chặn SW).
