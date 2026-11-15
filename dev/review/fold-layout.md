# Kiểm duyệt kit: review/fold-layout @ 33eb8165 (lượt 3) — FAIL (một điểm chặn)

Ngày 2026-11-14 khuya (đồng hồ máy 23:xx Z). Gộp thử vào origin/main 1ebb0bb6 (có phi tần t5–t8): chỉ xung đột dev/review/LOG.md + sw.js
(tệp dựng) — lấy main, chạy dev/site/build_site.sh: node --check qua, 3 script trong index.html parse được. `node dev/test/kit_dupes.js` → OK.
Chơi thật (Playwright, animations tắt) trên bản gộp: 686x880@2.2, 1180x820@2, 1366x1024@2 (+ đo thanh trên 755x1000@2):
màn thân phận, phòng, chip Thái hậu, Hành sự (tab nhóm + làm một việc → thẻ kết quả), Dư đồ, Hậu cung (dải chọn + thẻ người), Qua buổi ×4,
đường cung nữ (srvInit: phòng, Phận sự, thẻ). Save cũ (dựng từ index.html của main) nạp được ở 686, chơi tiếp không lỗi.
0 lỗi trang ở 686/1180 và ở đường cung nữ 1366 (1 lỗi 'reading mp' ở 1366 là do script ép S.srv=null trên nhân vật gốc cung nữ — không tính).
0 tràn ngang, 0 chữ bị cắt/ellipsis ở mọi màn (chỉ nhãn cung trên Dư đồ nằm ngoài khung xem — bản đồ kéo được, đúng). Ảnh: dev/shots/review/fold-layout/r3-*.

## Các điểm chặn lượt 2 (1bf3f138)
1. Tư chất thanh trên — ĐẠT. 8 ô đều `.kst` (kitStatCell, jk4), một cỡ chữ (số 16.32 px / nhãn 11.2 px); đo đáy chữ nhãn và đáy chữ số:
   chênh lệch 0 px ở 686, 755, 1180, 1366, cả đường phi tần lẫn cung nữ. Không còn .st/.k3tcv/#k3ts trong DOM.
2. Đường cung nữ cắt người — ĐẠT ở 686 (3 người trọn) và 1180 (2 người trọn, tên đủ); KHÔNG ĐẠT ở 1366 (xem chặn mới).
3. Dải chọn phi tần 686 — ĐẠT: tên cung trên đầu cột, cột cuối không bị "1/18" đè, viền vàng sáng khi chọn, không có dấu tích.
4. Chip triều cũ .kcchips — ĐẠT: đã gỡ, kit_dupes canh.
Phụ lượt 2: dòng địa danh không chui dưới chip (1180 xuống hai dòng); dòng nhắc thành "Mới biết tên ⓘ"/"Chưa biết là ai ⓘ"; đều đạt.

## Luật chủ 11/14–11/15 — kiểm trong game
- Một bộ kit / không tự vẽ: kit_dupes OK; thanh trên = kitStatCell; thẻ người dùng kst-chip.
- Phòng toàn màn trên Fold; thẻ người kiểu iPad ở cả Fold và iPad (hai cột: chân dung + Ghen/Oán/Thiện cảm/Nàng với ngươi + ô số | nhóm việc).
- Dải chọn: tên cung + viền vàng, không dấu tích; không có nút "Bảng phẩm vị" (đếm 0 ở mọi màn).
- Hành sự: tab nhóm có đếm (Tất cả 10/12, Tranh sủng 0/2…), cuộn ngang một hàng; thẻ kết quả gạch đầu dòng + thanh Được/Mất.
- Một nền sân khấu: chỉ một canvas nền phủ kín khung ở các phòng đã chạy.
- Tần làm chủ vị: PAL_HEAD=3 dùng chung palHeadOK/palFix/houseOf/assignHouses (đọc mã; không chơi tới Tần).
- Chip Thái hậu mở thẻ người của Thái hậu (Đức Thọ cung, "Mới biết tên ⓘ"), không mở tab Giao tình — đạt.

## Không đạt (chặn)
1. iPad 1366x1024 — sân khấu vẫn chuyển sang dải cuộn và CẮT người ở mép dải, người nhỏ:
   đường cung nữ (srvInit chuẩn, Khải Tường cung, chỉ 3 người): dải dừng ở ~75 % bề ngang sân khấu, người thứ ba chỉ còn một mảnh dọc
   cạnh nút "› 2" (đo: hộp người thứ ba lố mép phải 12 px CSS khỏi sân khấu, phần thấy < 10 %); người cao chỉ ~30 % chiều cao sân khấu,
   nửa trên sân khấu trống (r3-1366-srv-strip-cut.jpg). Cùng lỗi ở phòng 5 người (r3-1366-room-strip-cut.jpg: "Cung nữ H…" bị cắt tên).
   Đây là đúng lỗi chặn #2 của lượt 2 ("dải cuộn luôn hiện trọn một người"), nay còn ở kích thước iPad ưu tiên; và trái luật "người trên sân
   khấu phải TO". 686 và 1180 không bị. Sửa ở j59 (phép tính free/rightR khi khung sân khấu cao hơn rộng), đo lại 1366 + 1024x768.

## Phụ (không chặn)
- Thẻ kết quả (bản main, không thuộc nhánh): dấu triện THÀNH đè lên số "Sức 80→70 (-10)" ở 1180 (r3-1180-result-stamp.jpg) — dời triện lên góc
  tiêu đề như BẠI ở 686. Thẻ Thành không có dòng Được ("chứng cứ án cũ +1" của thẻ việc) — số không khớp thẻ việc.
- Thẻ Thái hậu khi chưa gặp: nửa phải thẻ trống (686) — nên đặt dòng "Muốn gặp…" hoặc ô số vào cột phải.
- Dư đồ: ô điện bị khóa (Dưỡng Hòa / Cần Chính) — chữ thang cơ hội ("Khó/Liều") mờ dưới thanh, khó đọc.
- Còn mở theo KIT 32.4: kitBar, kitTabs, chip trạng thái, .btn cũ.

## Gộp main
merge origin/main → chỉ LOG.md (giữ cả hai phía) + sw.js (dựng lại). Không xung đột mã. Người gộp chạy dev/site/build_site.sh.

---

# Kiểm duyệt kit: review/fold-layout @ 3e180e2a (lượt đầu trên 3fb60080, kiểm lại phần đổi trên 3e180e2a) — FAIL

Ngày 2026-11-14 tối. Dựng lại site từ nguồn (index.html trên nhánh CHƯA dựng lại với jk3 mới — người gộp phải chạy dev/site/build_site.sh).
Chơi thật (Playwright) ở 686x880@2.2 và 1180x820@2 trên cả hai đầu nhánh: màn tựa, thẻ thân phận, phòng, 10 tab, thẻ người, làm một việc
(thẻ kết quả), Qua buổi ×3–6, đường cung nữ (srvInit), lãnh cung (cold), hộp thoại lựa chọn ngắn/dài + headArt; 755x1000 thẻ người/hộp thoại;
save cũ từ bản main nạp được (686 + 1180); bản gộp thử fold-layout ∪ review/balance (cục bộ). 0 lỗi trang, 0 tràn ngang ở mọi màn đã chạy.
755/1366/412/390/1024 chưa chạy đủ lượt (máy quá tải) — chạy ở lượt kiểm lại. Ảnh: dev/shots/review/fold-layout/.

## Đạt
- Thanh trên một hàng (+ hàng Tư chất), tuổi, ngày ngắn; phòng toàn màn trên Fold, tab mở toàn màn, "‹ Phòng" về phòng, Qua buổi về phòng.
- Chip triều (Hoàng thượng/Thái hậu/Hoàng hậu/người hầu) cạnh sân khấu, một sự thật một chỗ; Thái hậu đổi chân dung sau khi gặp.
- Hành sự / Phận sự chia tab nhóm (đếm làm được/tổng), một hàng cuộn ngang; khung tranh theo nhóm việc, không tua.
- Thẻ kết quả gạch đầu dòng + thanh Được/Mất; số khớp thẻ việc.
- Thẻ người: một thẻ cho Fold + iPad; hàng Ghen · Oán · Thiện cảm · Nàng với ngươi luôn có ("?").
- Hộp thoại: 'rows' + headArt (dài) và 'grid' (ngắn) chạy đúng; thẻ thân phận (chủ đã duyệt) giữ nguyên.
- Save cũ (bản main) nạp được ở 686 và 1180, chơi tiếp không lỗi.

## Không đạt (chặn)
1. LUẬT MỚI (chủ): Tư chất trên thanh trên tự vẽ riêng, không dùng ô số của Bạc/Sức/Sủng/Danh.
   iPad 1180: `span.k3tcv` (nhãn small + b) khác `div.st` của Bạc… — số Tư chất thấp hơn số Bạc/Sức 4 px CSS (đáy 58 so với 54), nhãn thấp hơn 7 px
   → lệch đường chân chữ thấy rõ (1180-topbar.jpg). Fold: hàng Tư chất là kiểu thứ ba (chữ sans đậm 11.8 px, bỏ nhãn).
   Phải dùng CHUNG một thành phần ô số (cùng DOM/CSS) cho 8 ô, chung đường chân chữ.
2. Đường cung nữ — sân khấu cắt đôi người: người thứ hai (chủ của nàng) bị cắt dọc tại mép dải cuộn "› 2" ở CẢ 686 và 1180
   (686: hộp hình vượt mép phải sân khấu 123 px; 1180: chỉ còn mảnh váy). Nhãn tên chỉ còn "Thường tại", mất tên. (686-/1180-srv-figure-cut.jpg)
3. Dải chọn phi tần ở 686: cột cuối bị bộ đếm "1/18" đè — tên cung "Thừa M…" và nhãn "Người…" bị cắt (686-card-picker-clip-*.jpg).
4. Bản cài cũ còn trong DOM: chip triều kiểu cũ `.kcchips .kcchip` (ẩn, chữ "chưa rõ") song song chip mới `.k3c` — hai cách làm cùng một thứ; gỡ bản cũ.

## Phụ (nên sửa cùng lượt)
- Hộp thoại lưới khi trộn ngắn/dài để lại ô trống (một lựa chọn ngắn đứng một mình, lựa chọn sau chiếm cả hàng) — xếp ngắn liền nhau trước.
- Hàng địa danh trên sân khấu đường cung nữ ("Phòng cung nữ · … · Quý nhân ??? đi vắng, đang ở C…") chạy luồn dưới chip triều ở 1180 (bản 3fb6008).
- Thẻ người: dòng nhắc dài "Mới biết tên: …/Chưa biết người này là ai…" vẫn hiện nguyên câu ở cột trái iPad (31.17 nói chỉ "Mới biết tên ⓘ").
- Lãnh cung: chip phẩm trên thanh vẫn ghi "Đáp ứng" trong khi nhãn dưới hình ghi "Phế phi · lãnh cung".
- Hình người chơi (Tống Bạch Lộ, áo hồng) có chấm trên trán/má (việc tranh, không thuộc nhánh này).
- Đã biết còn mở (thợ kit #3): khoảng trống trên khung chân dung (686: ~70 px CSS trống trên khung), panel theo khung chứa, kitEventStage, khung theo loại sự kiện.

## Gộp với review/balance (thử cục bộ, merge-tree)
- Xung đột: dev/build/assemble.py (danh sách tệp), index.html, sw.js (tệp dựng — dựng lại).
- assemble.py: lấy danh sách của balance (jtime4, j67–j72, j75, j76, j70, j83, j85, j69, jpal, jtime4z, jbal2, j92, jwd92b, jkiep, jage, jcmood, j97, j96)
  + thêm jbd.js sau jkitctl.js + jk3.js ngay trước j84.js. KHÔNG thêm j80.js: balance đã bỏ j80 (j76 khai báo lại SUC_FLOOR → node --check lỗi
  "Identifier 'SUC_FLOOR' has already been declared" nếu giữ cả hai).
- Bản gộp dựng được (node --check qua), 686: 0 lỗi trang, thẻ người + hộp thoại chạy, save cũ nạp được.
  Nhưng ô tư trang j92 (Trâm phượng cửu vĩ / Phượng bào… "TUYỆT PHẨM", khung tím riêng) chen vào cột trái thẻ người, đẩy hàng Ghen/Oán/chỉ số
  xuống dưới mép màn Fold — j92 vẽ ô riêng (không phải kit) và phá bố cục 31.17; cần đưa về kit khi gộp balance.
- KIT.md: nhánh kit-j95 cũng đánh số §31 — trùng số với §31 của fold-layout; người gộp phải đánh lại.
