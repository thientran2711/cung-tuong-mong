# Kiểm duyệt: review/kit-close (1bd240a54) gộp lên main 70c792d41 — PASS (người duyệt R6)

Ngày 2026-11-15. Nhánh: `review/kit-close-r6`, dựng trên bản gộp dở của R5 `review/kit-close-merged-wip` 9e3ab039a (gộp lên main 70c792d41,
rồi gộp thêm main 114887bc1 (brand, hoangtu-tuchat; chỉ xung đột index.html/sw.js/assets.json/LOG = dựng lại). Dựng lại site: index.html trùng khít bản gộp (assets.json/sw.js chỉ khác theo máy, không lấy).

## Kết quả thử (máy chung tải 14–17; tranh từ CDN, chặn `ctmload`)
- `dev/test/kit-close2.js` 755x1000@2, 1000x755@2, 1180x820@2, 844x390@3: chạm lọt — thẻ kết quả, thẻ tin, thẻ chọn, thẻ mình, cửa hàng, thẻ món:
  chạm (touch) và chuột vào nút bên dưới chỉ ĐÓNG thẻ, việc không chạy (khắc/Sức/Bạc/Sủng/sổ không đổi) ở mọi khổ (cửa hàng ở 1000/844
  phủ cả màn: không có nút bên dưới để thử). Tư trang: hai mục "Túi đồ*" / "Việc"; Việc 6 thẻ, làm được trước. Thẻ tin
  "Tin trong cung buổi này": 1 ✕, 0 nút Đã hiểu/Lui/Thôi, 0 dòng "X → X", không "Sủng nàng", tranh "Hoàng thượng ngự giá" khớp tin lật thẻ bài
  (không Triều chính), chạm ngoài đóng và không chạy gì. 0 lỗi trang.
- `dev/test/kit-close.js` 4 khổ + sổ cũ (dựng bằng bản live): info / chọn có Thôi / thẻ mình / Hoàng thượng / nơi chốn ngày-đêm / cửa hàng / thẻ món /
  ô cài tóc / ô đeo tay: đúng 1 ✕ góc trên phải, ✕ / chạm ngoài / Esc đều đóng, kéo không đóng, 0 nút đóng chữ; thẻ bắt buộc: không ✕, chạm ngoài
  và Esc không đóng; thẻ người trong phòng ✕ + chạm cảnh trống; Sổ tuần ✕ góc trên phải, 0 "Lui"; nút đỏ "Sang buổi" / "Sang ngày mới";
  sổ cũ nạp "ok"; 0 tràn ngang; 0 lỗi. (1180: ô cài tóc/đeo tay "no slot" — đời ngẫu nhiên không có món, đã thấy đạt ở 3 khổ kia.)
- Ảnh tự chụp 755x1000@2, 1000x755, 1180x820@2, 1366x1024@2, 844x390@3: màn chính, Túi đồ, Việc, thẻ món, thẻ tin, thẻ kết quả, sổ cũ Tư trang:
  0 tràn ngang, 0 nút Thôi/Lui/Đóng/Đã hiểu hiện, 0 chữ bị cắt, 0 lỗi. Ô Đang mang thấy ngay không cuộn ở 755/1000/1180/1366.
- 390x844: bản main chưa có màn "xoay ngang" (rot.js ở review/game-feel) — không thuộc nhánh này.
- coop: nhánh chỉ đổi chữ "Qua ngày/Qua đêm" → "Sang ngày mới" trong jcoop*; không chạy coop-e2e (máy quá tải, đĩa đầy).

## Thử lại trên bản gộp main 114887bc1
- kit-close2 755x1000@2 + 844x390@3: 0 chạm lọt, Túi đồ*/Việc (6, làm được trước), thẻ tin 1 ✕ 0 nút chữ, chạm ngoài đóng; tranh tin
  khớp tin (lật thẻ bài → "Hoàng thượng ngự giá", nói xấu với cung nhân → "Chuyện kẻ hầu"); 0 lỗi.
- kit-close 1180x820@2 + 1000x755@2 + sổ cũ: mọi bảng ✕/chạm ngoài/Esc đóng, bắt buộc không đóng, Sổ tuần ✕, thẻ người phòng ✕,
  "Sang buổi"/"Sang ngày mới", sổ cũ ok, 0 tràn, 0 lỗi.

## Sửa của người duyệt
- `kit-close.js` / `kit-close2.js` kcWait: chờ đời mới ổn định 1,5 s rồi mới xét, bỏ cả đời cung nữ (origin cnv) — trước đó thử đôi khi rơi
  vào đời cung nữ (không có tab Tư trang) và chết ở `[data-kinvsub=viec]`; kit-close2 còn đổi đời ngay trước mục B nếu vẫn là cung nữ.

## Đáng lo (không chặn)
1. 844x390: khung Tư trang chỉ cao ~250 px nên ô "Đang mang" nằm dưới lưới túi, phải cuộn (lưới tối thiểu 2 hàng). Muốn thấy ngay ở điện thoại
   ngang cần thu lưới còn 1 hàng hoặc đặt Đang mang cạnh lưới.
2. Thẻ kết quả (#rtoast, THÀNH/HỎNG) không có ✕ — chỉ tự tắt / chạm ngoài (tấm chắn #kxcatch). KIT 32.10 coi đây là thẻ nổi; nếu sếp muốn ✕ ở
   mọi thẻ thì thêm vào kit. Dấu mộc THÀNH đè lên cuối tên việc và "(+2)" (có từ trước, không do nhánh này).
3. 1000x755: dòng quẻ "Quẻ Thượng thượng (Danh)" ở HUD đè lên số Sắc (HUD không đổi trong nhánh này — lỗi có sẵn của main).
4. `#popx` còn aria-label "Đóng" (ẩn, không hiện chữ); kit-x mặc định là "Lui".
