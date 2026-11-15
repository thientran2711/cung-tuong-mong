# Kiểm duyệt kit: review/hau-cung-ui @ d562fe84 (jhc.js, KIT §36) — PASS

Ngày 2026-11-15. Gộp lên main-next 312b6b40 (= main 5c1007a6 + court-rules). Không xung đột mã (jk3 nút "‹ <tên nơi>" của court-rules và jk2b
roulette/pc-size giữ nguyên); bản dựng bằng build_site.sh.

## Kiểm theo kit (bản gộp, reducedMotion, 13 tab: act, go, court, rv, men, staff, rel, fac, kid, inv, art, story, log)
| khổ | lỗi trang | tràn ngang | cắt chữ | #panel | ảnh vỡ | nền tím |
|---|---|---|---|---|---|---|
| 755x1000@2, 1180x820@2, 1366x1024@2, 412x1058@2 | 0 | 0 | 0 | 1 | 0 | 0 |
- dev/test/hau-cung-ui.js 755 + 1180: Ân oán, Cung nhân, Thánh thượng, Thái hậu, Nam nhân, Phi tần các phẩm 3–7 (khung không nhảy), sổ tuần
  0–3, chip tải trên 4 tab — 0 tràn, 0 cắt, 0 che, 0 lỗi; tên nam nhân không trùng.
- Sổ cũ (main 5c1007a6) nạp ở 4 khổ, Qua buổi chạy, 0 lỗi.
- coop-e2e Worker sống: lần 1 57/59 (2 kiểm "thấy bạn là người" lúc đầu — thời gian), lần 2 máy sập giữa chừng (thiếu bộ nhớ), lần 3 59/59.

## Đáng lo
- Ân oán thẻ "Ngươi": cột phải trống (không có "Đã biết" về chính mình) → khoảng trống lớn ở 755.
- Thanh quý/oán: thanh giữa 0 (âm đỏ, dương xanh) — đọc được nhưng "-3" vẽ nửa thanh đỏ.
Ảnh: dev/shots/review/hau-cung-ui/.
