# Kiểm duyệt: review/sub-odds @ 96d7c2df — PASS (sửa nhỏ)

Ngày 2026-11-15. Gộp lên main cfd321e9 rồi main 14967f89 (cdn-images). Xung đột: j19 (giữ ducWarnTxt theo hhNeed/BAL; chú giải ngày "4 buổi";
nhãn "Thái hậu quý ngươi", "Hoàng hậu quý ngươi"), j6 (ducWarn một nguồn; danh sách cardtab có court/men; chanceLvl cho "Có thai"),
j42 (Hầu trà b:B4L + chanceW), j65 (giữ bản rules-one-source).
## Kiểm
- dev/test/sub-odds.js: thẻ việc chỉ ghi hiệu ứng thật, "khả năng …" cho cơ may phụ, thứ tự làm được trước và giữ yên sau khi làm; 0 lỗi.
  Dò tĩnh còn 5 chỗ `: ${word(` — 3 là cơ may chính của việc (đúng thang), 2 từ module balance: j75 "dịp được lật thẻ" (cơ may phụ) → sửa
  sang chanceLvl; jveil "hỏng thì X với ngươi" → "quý ngươi".
- dev/test/rel-audit.js: mọi dòng quý/oán khớp số thật (Khiêu khích −15 …).
- dev/test/an-sung.js 390–1180: khối Ân sủng dưới chip triều, thẻ mở đủ; người kiểm sửa chip triều jk3 "với ngươi" → "quý ngươi" (sau luật
  naming thành "quý ta"), và luật VP j84 cho dòng sự kiện cũ "Thái hậu/Hoàng hậu với ngươi ±n" → "… quý …".
- Kit 8 tab 755x1000, 1000x755, 1180x820, 844x390: 0 lỗi, 0 tràn, 0 cắt chữ, 1 #panel, 0 ảnh vỡ, 0 chữ "ngươi" sót. Sổ cũ (main 14967f89) nạp. coop-e2e 59/59.
## Đáng lo
- 844x390: cột chip triều + Ân sủng phủ lên người bên phải sân khấu (đầu và tên "Tiểu Đào") — vẫn còn sau khi cả hai nhánh vào; chờ stage-slots.
Ảnh: dev/shots/review/sub-odds/.
