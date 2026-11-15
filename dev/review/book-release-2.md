# Kiểm duyệt kit: review/book-release @ 4bbed569 (đợt 2) + 3 sửa nhỏ của người kiểm — PASS

Ngày 2026-11-15. Người kiểm độc lập. Gộp thử lên main 614b00ec (đợt 1, co-op): xung đột chỉ index.html/sw.js (bản dựng) → dựng lại bằng dev/site/wrap_root.sh; jcoop/jcooplobby/jcoopworld vẫn trong assemble.py.

## Sửa nhỏ trên nhánh (người kiểm)
1. **Dải tím lẻ giữa sân khấu và hàng tab** (sếp hỏi "Thanh gì đây", live 614b00ec): bìa sách `.kbk-board` nằm ở hàng #panel; ở khung dọc/điện thoại khi xem phòng (k3home) #panel ẩn (hàng 0 px) nên chỉ còn lề bìa -5/-6 px lộ thành một dải ~11 px. Sửa jbook: ẩn bìa khi #panel ẩn (`.k3ph:is(.k3home,.k3pop)`). Ngang iPad: bìa vẫn là viền đều quanh cả cuốn sách.
   Trước/sau: 810x1000 & 755x1000 — trước board [y 939, cao 11] giữa sân khấu (đáy 938) và tab (950); sau: không còn.
2. **KIT_FIG.maxPx thu nhỏ người trên Fold (thiết bị chính)**: 542 px áp mọi nơi nên Fold trong 755x1000 (sân khấu xem phòng cao 815) bị .66 (main đang .79). maxPx chỉ còn chặn khổ iPad (≥ 1000 px); Fold/điện thoại giữ .79.
3. Kèm (2): Fold cover 412x1058 — ở .79 nàng + 1 người có lúc không đứng trọn (main cũng vậy: người thứ hai bị cắt mép phải, tên "Tiểu Thú…"); nay khi nàng + người kế không vừa ở .79 thì lùi về chặn maxPx (đúng như bản 4bbed569) → 0 cắt (6 lượt ngẫu nhiên).
   KIT 33 ghi rõ.

## Kết quả (bản gộp main + nhánh, phục vụ http, Playwright reducedMotion)
| khổ | lỗi trang | tràn ngang | cắt chữ | thẻ việc | sân khấu (nàng + …) | › N trang | hộp thoại |
|---|---|---|---|---|---|---|---|
| 755x1000@2 | 0 | 0 | 0 | cùng cỡ 721x242 | .79, tối đa 2 | có, ‹ › | chỉ .opts cuộn; 2 người trên tranh .79 |
| 1180x820@2 | 0 | 0 | 0 | 550 rộng | .79, tối đa 3 | có | như trên |
| 1366x1024@2 | 0 | 0 | 0 | 641x242 | .61 (maxPx), tối đa 3 | có | như trên |
| 810x1000@2 | 0 | 0 | 0 | 776x242 | .79, 2 | có | như trên |
| 412x1058@2 | 0 | 0 | 0 | rộng bằng nhau, cao theo chữ | .79 / .66 khi chật, 2 | có | như trên |
| 390x844@3 | 0 | 0 | 0 | như trên | .79, 2 | có | như trên |
| 1024x768@2 | 0 | 0 | 0 | như trên | .79, 3 | có | như trên |
- Sổ cũ: lưu bằng index.html của main (hclh-save-v2-1) → bản gộp nạp đúng người ở cả 7 khổ, 0 lỗi; Qua buổi chạy.
- Hộp thoại 24 lựa chọn: .dlg/#mb không cuộn, chỉ `#mb > .opts` cuộn (overflow auto); tranh + người + lời kể đứng yên khi cuộn; tên trong tranh, không cắt. (main: cả hộp cuộn.)
- Lật trang (có chuyển động, 755 & 1180, 4 tab): luôn 1 #panel, 0 id trùng giữa chừng lật.
- Chơi 2 người: `node dev/test/coop-e2e.js` trên Worker sống — 59/59 trước sửa và 59/59 trên bản gộp cuối.
- Nàng đứng trên sân khấu ở mọi nơi (Ngự hoa viên: nàng đầu trái, nhãn màu phẩm).

## Đáng lo (không chặn)
- 1366x1024: người .61 (542 px) — khoảng trống trên đầu ~1/3 sân khấu; chờ sếp có chê không.
- Bóng người lạ (chưa gặp) có nhãn tên một dòng màu đen (không hai dòng màu phẩm) — có từ trước.
- Fold cover 412: người cỡ .79 hay .66 tùy cặp người (áo rộng hay hẹp).
Ảnh: dev/shots/review/book-release-2/.
