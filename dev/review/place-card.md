# Kiểm duyệt kit: review/place-card @ 1207f3f1 (thẻ nơi chốn §32.8, kitOptLayout §32.9) — PASS (1 sửa nhỏ)

Ngày 2026-11-15. Gộp lên main 482a99f9 (balance-unified). Xung đột: assemble.py (giữ thứ tự main, thêm jplace trước j84; KHÔNG thêm lại j80 —
đã nằm trong j76 từ balance), j77 dòng 63–64 (lấy bản place-card "Qua ngày" / "Sang buổi", đêm = buổi B4L của 4 buổi).
- dev/test/place-card.js 755 / 1180 / 844x390 (etq, rank, last, night, spill, sneak): tranh nơi đúng mùa/buổi, thông tin, nút theo kitOptLayout,
  0 cắt, 0 tràn, vừa khung, 0 lỗi.
- Kit 7 tab 755x1000, 1000x755, 1180x820, 844x390: 0 lỗi, 0 tràn, 0 cắt chữ, 1 #panel. Sổ cũ (main 482a99f9) nạp. coop-e2e 59/59.
## Sửa nhỏ
- 844x390: chip "Thỉnh tranh nhân vật" (jload) nằm đè lên chữ trong thẻ ("… phải được mời." bị che). jload: chip lánh đi khi có hộp thoại / trò chơi mở.
## Đáng lo
- Nút "Thôi" (kback, KIT 32.9) vẫn còn trong thẻ nơi chốn và khắp game; quyết định mới của sếp (OWNER_DECISIONS): bỏ mọi "Thôi"/"Lui"/"Đóng",
  mỗi bảng có nút ✕ góc trên phải — cần một việc kit chung (không riêng nhánh này).
- 844x390: tranh nơi trong thẻ co còn dải mỏng (~43 px) để chừa chỗ cho nút.
Ảnh: dev/shots/review/place-card/.
