# Kiểm duyệt bộ giao diện: review/kit-2b @ 3a977e3 (jk2b + j92 phần 1) — FAIL

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Gộp với origin/main cdf36d3 (j59, j77, j82, j90 bục vinh danh), dựng không lỗi.
92cd3d1 (mục 6/6b: thẻ thân phận, kitRoulette) đến sau khi kiểm xong: chưa kiểm, sẽ kiểm cùng lần sửa.

## Đạt
- 755x1000@2, 1180x820@2, 1366x1024@2: không lỗi trang, không tràn ngang, không cắt chữ (bộ đo), thẻ việc cùng cỡ.
- Save cũ nạp được: bản v6 cũ (hclh-save-v2-2, Quý nhân) và một bản ghi từ main hiện tại sau 3 tuần chơi.
- Chế độ 'cost': lựa chọn sự kiện (pushDil/mkP, thử "vase") chỉ còn dòng Tốn, không thước may rủi, không dòng Được/Mất/Kèm.
- Chip Thái hậu / Hoàng hậu trên thanh đầu; khối Trong cung và Tư chất đã rời sân khấu.
- Trang trí đỉnh (crest-*) là tranh gpt-2-6, đúng phong cách, mỗi khung một trang trí.
- Mạng che + dấu cào hiện ở khung lớn, khung nhỏ và người trên sân khấu (kveil2/kscar), mặt vẫn nhận ra.

## Lỗi chặn
1. **Fold 755x1000 (máy chính): thẻ người không cho thấy thông tin chính, thanh không bao giờ hiện cạnh nút việc.**
   Luật chủ: "main info visible without scrolling on Fold" và "portrait + relation/stat bars stay visible (sticky) while scrolling actions".
   Ở tab Hậu cung, sân khấu vẫn cao ~40% màn, thêm tab con + dải mặt, thẻ người bắt đầu ở y≈756/1000: khung chân dung đến 1048, thanh (.kpbars) ở
   1093–1196, tên + tước nằm dưới mép màn. Cuộn phần việc (.pc) xong thanh vẫn ở 1080 (ngoài màn); chỉ thấy nửa trên khung + Phượng.
   Ảnh: dev/shots/review/kit-2b/755x1000_2-the-nguoi-cuon.jpg (ảnh D-the-cuon của chính nhánh cũng cho thấy thanh bị cắt).
   Sửa gợi ý: ở Fold trên tab thẻ (Hậu cung, Cung nhân, Hoàng tự) thu sân khấu như phone (24%, KIT 28.3 hiện chỉ áp <600 px), hoặc cho dải
   .kpstrip (khung nhỏ + tên + tước + thanh) hiện ngay từ đầu ở Fold khi thẻ không đủ chỗ. Tiêu chí: ở 755x1000, không cuộn, thấy tên, tước, thanh
   Ghen / thiện cảm / Oán và hàng nút việc đầu tiên; cuộn nút việc thì thanh vẫn trong màn.
2. **1180x820: nhãn tên người thứ hai trên sân khấu bị đáy sân khấu cắt** ("Cung nữ Bích Ngọc" chỉ còn nửa trên) khi người đứng to hết sân khấu.
   Ảnh: dev/shots/review/kit-2b/1180x820_2-nhan-ten-bi-cat.jpg. Luật: không chữ cắt; KIT 28.2 hứa "room under the feet for the name tags".
3. **j92.js mang logic trang phục vào main lẻ.** Luật cổng: logic trang phục đi vào main qua review/balance, không gộp lẻ.
   j92.js ở nhánh này là bản e4a8a72 của review/wardrobe: ngoài KIT_VEIL/KIT_SCAR còn danh mục WD, wdOf (gán p.wd cho mọi người, ghi vào save),
   bọc wearBonus và wear, vpItems. jk2b không dùng hàm wd* nào. Sửa: chỉ giữ KIT_VEIL + KIT_SCAR (dữ liệu ảnh) trong một module kit riêng
   (vd jk2b-veil.js hoặc đầu jk2b.js), bỏ j92.js khỏi nhánh; j92 đầy đủ sẽ đến qua review/balance.
4. **Thứ tự module: jk2b.js nạp sau j84.** Luật: j84 (văn phong) phải ở cuối assemble.py. Khi gộp main mới thứ tự đúng là
   `… 'j86.js', 'j82.js', 'j90.js', <kit veil/scar>, 'jk2b.js', 'j84.js'` (người kiểm đã thử thứ tự này: chạy được, không lỗi).
5. Tệp rác: dev/figwork/__pycache__/porcrop.cpython-313.pyc và dev/figwork/stories/__pycache__/*.pyc bị commit: bỏ đi.

## Lỗi phụ (sửa cùng lượt)
- crest-consort-2/3/4/5 còn vụn ảnh rời trong kênh trong suốt (mảnh nhỏ dưới trang trí, xem dev/shots/review/kit-2b/crest-vun.jpg, hàng trên cột 3–6):
  xóa các mảnh rời nhỏ hơn ~2% diện tích.
- KIT.md: mục "26. KIT 2b" trùng số với "26. BỤC VINH DANH" trên main (27 đã dành cho week-book): đổi thành 28 khi gộp main.
- Chân dung trên thẻ ở iPad: cột trái dài hơn thẻ nên dòng thanh cuối ("Không oán · 0") bị mép thẻ che một nửa khi chưa cuộn cột trái.

## Ghi chú (không do nhánh này)
- Một số tranh phi tần cũ còn tay áo bay / nốt ruồi (Hoa Họa Mi): việc của review/no-moles và vẽ lại, không chặn kit-2b.
