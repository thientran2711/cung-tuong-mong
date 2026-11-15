# Kiểm duyệt: review/brand (bc1c7f324) gộp lên main 70c792d4 — PASS có sửa của người duyệt

Ngày 2026-11-15. Nhánh duyệt: `review/brand-r6`. Gộp: chỉ xung đột `assemble.py` (giữ thứ tự của main, có jwhy/jaudit, thêm jseal sau jk4)
và các tệp dựng (index.html / sw.js / assets.json dựng lại bằng `dev/site/build_site.sh`).

## Đúng lời sếp (12:35Z)
- Biểu tượng app: cô gái mũ phượng đỏ ở giữa tranh màn tải (img/title-key.webp = nền 'title' của màn tải), có any 192/512, maskable 192/512
  (chân dung tròn nằm trong vòng an toàn 80 %), apple 180, favicon. Đã xem tranh gốc và icon-preview.png: đúng người, rõ ở 48 px.
- Ấn "Trân nữ" (port từ seal.js, SVG vẽ bằng mã) ở góc phải trên thanh đầu trang, không che quẻ (khoảng cách ≥ 12 px ở cả 5 khổ).

## Sửa của người duyệt
1. **Ấn đọc thành "TRÂN NƠ"**: dấu ngã của Ữ dính vào hai nét U sau bộ lọc mực → chữ U khép lại thành Ơ, mất dấu ngã. Nhấc dấu ngã lên
   (khoảng trên 6.2, sóng sâu hơn) → đọc rõ "NỮ" ở 300 px và 38 px (jseal.js KSEAL_MARK "~", kitSealWord top).
2. **Chip "Có bản mới" đè lên thẻ "Hoàng thượng" của sân khấu ở 1000/1180** (chỗ dự phòng "ngay dưới thanh" của nhánh). Thêm chỗ thứ 3
   trong thanh: bên phải dòng "Buổi …", soát với mọi hình chữ trong thanh và ấn (swreg.js place()). Nay chip ở trong thanh ở cả 5 khổ.

## Kết quả thử (dev/test/brand-seal.js, quẻ dài nhất "Quẻ Thượng thượng (Giao thiệp)", có chip)
| khổ | ấn | ấn→quẻ | chip | khối giờ→ô chỉ số | chồng | tràn | lỗi |
|---|---|---|---|---|---|---|---|
| 755x1000@2 | 38 | 12 | cạnh tuổi | — | 0 | không | 0 |
| 1000x755 | 34 | 334.6 | cạnh "Buổi chiều" (trước: đè thẻ Hoàng thượng) | 17.6 | 0 | không | 0 |
| 1180x820@2 | 38 | 497.5 | cạnh "Buổi chiều" (trước: đè thẻ Hoàng thượng) | 18.7 | 0 | không | 0 |
| 1366x1024@2 | 38 | 589.3 | cạnh tuổi | 110.5 | 0 | không | 0 |
| 844x390@3 | 30 | 12 | cạnh tuổi | — | 0 | không | 0 |
- Sổ cũ (dựng bằng bản đang chạy trên trang, mk-oldsave.js) nạp ở 755x1000 và 390x844: 0 lỗi, không tràn, có ấn. 390x844 dọc vẫn hiện cả
  trò chơi (không có lời nhắc xoay máy — việc của main, không thuộc nhánh này).
- `node dev/test/kit_dupes.js`: OK. Không đụng co-op (chỉ đổi place() của chip trong swreg.js), nên không chạy coop-e2e.

## Đáng lo (không chặn)
- 1000–1179 px: ô chỉ số chỉ còn hình (tên trong tooltip) để quẻ dài không chạy vào ô (đã chạm 58 px trước nhánh). Đổi bố cục này là quyết định
  của thợ; nếu sếp muốn giữ chữ, cần bố cục khác cho thanh một hàng.
- Android đã cài PWA có thể giữ icon cũ đến khi cài lại.
