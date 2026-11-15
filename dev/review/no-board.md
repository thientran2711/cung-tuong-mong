# Bỏ bìa tím dưới trang sách (lời sếp 02:35Z, iPad dọc/Fold Hậu cung: "Nó có cái nền tím gì ở dưới kìa") — PASS

Ngày 2026-11-15. Người duyệt kit + gộp. Trên main 355d6d58.
- Bỏ hẳn bìa vải tím/chàm: `.kbk-board` (bìa sau #panel, jbook) không còn được tạo, CSS `display:none!important`; `.kbs-book::before`
  (kitBookSpread) và `.kbk-book::before` (sổ tuần j87, var(--cloth)) → viền giấy mảnh kem-nâu `#e6d3ab → #c9ad7d`, 2 px (gáy sổ tuần một trang 4 px), bóng nâu nhạt.
  Bìa trước vẽ sẵn của sổ tuần (trang `k-cover`, tranh) giữ nguyên — đó là tranh bìa sổ, không phải nền.
- KIT §34.1c ghi luật: không bìa tối ở mọi tab, mọi khổ, phòng, sổ tuần; chỉ viền giấy mảnh cùng tông kit.

## Kiểm (Playwright, reducedMotion, 11 tab: Hành sự, Dư đồ, Phi tần, Giao tình, Phe phái, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh truyện, Sổ ghi + sổ tuần)
| khổ | mặt nền tím/chàm lớn | tràn ngang | cắt chữ | #panel | lỗi trang | khe trang–tab |
|---|---|---|---|---|---|---|
| 755x1000@2 | 0 (trước: `.kbk-board` 739x811 ở 10/11 tab) | 0 | 0 | 1 | 0 | 6 px nền game (như hàng tab) |
| 810x1000@2 | 0 | 0 | 0 | 1 | 0 | 6 |
| 1180x820@2 | 0 | 0 | 0 | 1 | 0 | 6 |
| 1366x1024@2 | 0 | 0 | 0 | 1 | 0 | 6 |
| 412x1058@2 | 0 | 0 | 0 | 1 | 0 | 6 |
| 390x844@3 | 0 | 0 | 0 | 1 | 0 | 6 |
Sổ tuần: chỉ còn nền trời đêm của cảnh rạng sáng (`.kbkdawn`, cảnh có chủ ý) quanh sổ; mép sổ là viền giấy mảnh.
Ảnh trước/sau: dev/shots/review/no-board/755x1000-hau-cung-TRUOC.jpg, -SAU.jpg (+ các khổ khác, sổ tuần, Hành sự).
