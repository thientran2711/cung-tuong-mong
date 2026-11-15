# Kiểm duyệt kit: review/loading @ 74c1544e (+ 1 sửa nhỏ của người kiểm) — PASS

Ngày 2026-11-15. Người kiểm độc lập. Gộp thử lên main 1277c232 (đã có book-release đợt 2 + sửa dải tím/Fold .79): xung đột assemble.py
(giữ jcoop/jcooplobby/jcoopworld, thêm jload.js trước j84) + index.html/sw.js (dựng lại bằng dev/site/build_site.sh — từ nay mọi script dựng đi qua nó).

## Sửa nhỏ (người kiểm)
- Chip thỉnh tranh nền `.kloadchip` (góc dưới trái) che nhãn tên dưới sân khấu (Fold 755 và iPad 1180: "Cung nữ / Thái giám …" bị che;
  ở trạng thái "Tạm ngưng" chip ở đó mãi). jload placeChip: nâng chip lên trên hàng tên (#stage .tag, #j59metag, › N) khi chạm. Ảnh sau sửa: tên đủ.

## Thử chuyển bản (dev/test/sw-serve.js + sw-update.js, người kiểm tự chạy trên bản gộp)
- ab (Fold 755): A → B: hộp thoại đang mở thì KHÔNG mở lại; đóng → thẻ "Có bản mới" → tự mở B (~12 s); sổ y nguyên (hclh-save-v2-1), nạp được; 0 lỗi, 0 tràn.
- main (iPad 1180, sw cũ ctm-<giờ> của main 1277c232): mở lại 1 lần → bản mới (2–3 s, 1 lần điều hướng); bộ đệm cũ chuyển sang ctm-assets (1195 tệp, 0 thỉnh lại); sổ y nguyên.
- main STALE=1 (index cũ từ bộ đệm HTTP): trang cũ tự mở lại bản mới (2 lần điều hướng, ~8 s); sổ nạp được; 0 lỗi.
- Bản gộp: 755/1180/1366 sổ cũ của main nạp, 0 lỗi trang, 0 tràn, 0 cắt chữ; coop-e2e trên Worker sống (xem LOG).

## Kit / VANPHONG
- Thẻ "Có bản mới": kpanel + kpHeader("notice") BÁO + kpnote + một kbtn — đúng kit §35.2; chữ "bản mới / Mở bản mới / Sổ đã ghi vẫn giữ nguyên" — không "tải lại trang/phiên bản/cập nhật".
- Màn tải §35: nền title + một khung kit, kitProgress, "thỉnh", không "%". Có đơn vị "MB" (chữ ngoại; KIT §35 chấp nhận là đơn vị duy nhất) — ghi nhận.

## Đáng lo
- Thẻ "Có bản mới" đè giữa sân khấu 3 giây (chấp nhận được, tự đi).
- assets.json liệt kê cả tranh fig chưa dùng (635 MB nền) — máy chật bộ nhớ sẽ thấy "Máy hết chỗ cất tranh".
Ảnh: dev/shots/review/loading/.
