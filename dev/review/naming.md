# Kiểm duyệt: review/naming @ 842a2fc4 (tên cuối của sếp; người chơi xưng "ta" trên màn) — PASS

Ngày 2026-11-15. Gộp lên main 75ea33f8 (place-card). Xung đột: j6/jcoopworld (nút dưới: giữ ngưỡng 4 buổi B4L, chữ mới "Qua ngày"/"Sang buổi"),
j77 (giữ bản place-card), jhc (giữ KG có Việc nhờ + nhãn "Chí tôn" của nhánh).
- "ngươi" → "ta" chỉ trên màn (luật VP j84, lời thoại trong “…” giữ "ngươi"): dev/test/naming.js 755 + 1180 — 0 chữ "ngươi" sót ở 12 tab, màn đầu,
  thẻ kết quả ("Hoàng hậu nhìn ta … “Ngươi to gan thật.”").
- Biểu thức đọc sổ/log (j52, j55, j75, j79, j90 …) đọc dữ liệu gốc, không bị đổi. Thẻ người (jk2b đọc chữ DOM khi dựng) vẫn đủ chip:
  "Hoàng hậu quý ta · Bình thường -5 / Hoàng hậu oán ta / Ta quý Hoàng hậu / Ta oán Hoàng hậu" — so với main cùng số.
- Kit 10 tab 755x1000, 1000x755, 1180x820, 844x390: 0 lỗi, 0 tràn, 0 cắt chữ, 1 #panel. Sổ cũ (main 75ea33f8) nạp.
- coop-e2e: bộ thử bấm chữ cũ "Chơi cùng bạn"/"Mời bạn" → sửa bộ thử nhận cả "Cùng hảo hữu"/"Mời hảo hữu": 59/59.
## Đáng lo
- "Qua ngày" sẽ thành "Sang ngày mới" ở review/kit-close (điều phối).
Ảnh: dev/shots/review/naming/.
