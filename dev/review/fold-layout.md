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
