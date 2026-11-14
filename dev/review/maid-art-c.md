# Kiểm duyệt kit/tranh — review/maid-art-c @ 05f4e07c — FAIL

Người kiểm: kit reviewer (thay người trước), 2026-11-14 ~19:00Z.
Mẫu: 22 nàng (m08 m14 m29 m41 m49 m50 m33 m34 bắt buộc + 14 ngẫu nhiên: m39 m19 m32 m48 m45 m44 m38 m31 m02 m18 m30 m43 m25 m12),
mỗi nàng đủ 9 bộ (t1–t8 + lãnh cung) ở a26, thêm 4 tuổi của 1 bậc ngẫu nhiên + lãnh cung; soát riêng t7 a26 cả 52 nàng, t6 a51 m01–m26.
Tấm xem: dev/shots/review/maid-art-c/ (age_0, age_1 = tuổi; fh_2 = hoa điền từng bậc; t7_0 = t7 m01–m26; cut = cỡ thật trên nền tối/sáng).

## Đạt
- Lãnh cung: áo trơn, không thêu, không hoa tai/trang sức (chỉ trâm gỗ giữ tóc), không hoa điền; tuổi 48 nay ra đúng ~45–50 mà vẫn đẹp (m08 m29 m33 m34 m50 m19 m25…). Tốt.
- Không thấy nốt ruồi trên mẫu.
- Hoa điền: mỗi nàng một kiểu giữ suốt t1–t8, vẽ phẳng trên da, cỡ t1 ngang c03 t1. t6 các "chấm nhỏ dưới hoa điền" (m08 m14 m29 m41 m49 m50) là chấm phẳng liền hoa văn, không thành dây/hạt treo — CHẤP NHẬN. t8 m33/m34 phượng xấp xỉ khoảng giữa hai đầu mày — CHẤP NHẬN (m33 cao tới gần chân tóc nhưng mảnh).
- Tách nền sạch ở cỡ thật trên nền tối và sáng (10 hình ngẫu nhiên), không viền, không sót nền.
- FIGURES-servants.json hợp lệ: 2112 mục, 1872 mới (52 × 9 bộ × 4 tuổi), không trùng, mọi file/por tồn tại.

## Không đạt (chặn)
1. TUỔI ở mọi bậc phi tần t1–t8: a51 (tuổi 48) vẫn mặt ~20–25, giống hệt a26; a36 (32) cũng không chín chắn hơn a26.
   Thấy ở mọi nàng trong mẫu có bậc t: m08-t6, m14-t3, m29-t7, m49-t2, m50-t2, m33-t6, m34-t1, m19-t1, m32-t2, m45-t7, m44-t2, m38-t4, m48-t7, m30-t2, m43-t4, m25-t1, m12-t7, m18-t1, m02-t7; hình toàn thân m24-t7, m39-t1, m13-t8 a51 cũng vậy.
   (Chỉ vài nàng có ít tóc bạc, mặt vẫn trẻ: m41-t1, m38-t4, m48-t7.) Bản sửa chỉ làm tuổi cho lãnh cung; cách làm ở lãnh cung (sửa gpt-2-6 trên lưới 4 đầu, dán ô 48) cần áp cho 52 × 8 bộ bậc t, ít nhất a51 và a36.
   Luật chủ: 4 dải tuổi phải TRÔNG đúng tuổi; đây cũng là lý do FAIL của maid-art phần A.
2. t7 còn nét/dây dọc lên chân tóc (cùng lỗi đã sửa ở m06 m27 m35, nhưng chưa soát hết phần C1): m03-t7, m12-t7 (mọi tuổi; m12 a18–a51 đều có vạch dọc nối lên tóc). m05-t7 cần xem lại (vật ở chân tóc).
3. t6 (phải: không dây): m24-t6 a51 vòng tròn có nét mảnh chạy lên chân tóc; m15-t6 a51 có vạch mờ lên trên — xem lại cả 4 tuổi.

## Phụ (không chặn, nên sửa cùng lúc)
- t6 vài kiểu không được vẽ lại vẫn trông như ngọc nổi (m01 bốn cánh trắng như ngọc trai, m02 dơi có hạt, m11 hạt trai, m21) — còn nhỏ nên chấp nhận, nhưng khác giọng "vẽ phẳng" của các t6 mới.
- m48-t3 hoa điền hình đèn lồng to hơn t4–t7 của chính nàng (nét viền, có móc treo) — nên thu nhỏ.
- m33-t8 tóc ngả xám-tím ở mọi tuổi (kể cả a18) do ánh màu áo — tuổi 18 trông như tóc muối tiêu khi nhỏ.
- Hoa điền t1–t6 của vài nàng gần như giống nhau giữa các bậc (m50, m45, m31, m38) — đúng thiết kế "chỉ đổi chất liệu" (HUADIAN_C.md) nên không chặn.
- Gộp: img/FIGURES-servants.json trên nhánh mang bản cũ 16 mục m13/m26/m39/m52 (bậc thường); main (no-moles 0c1793b) đã đổi magnificUrl + bg. Khi gộp phải giữ 16 mục của main (ảnh không đổi, chỉ siêu dữ liệu).

## Việc cho thợ
Làm tuổi a36/a51 cho t1–t8 (52 nàng); bỏ vạch dọc t7 m03 m12 (xem m05); bỏ nét lên tóc t6 m24 m15; rồi soát lại toàn bộ t6/t7 cả 52 nàng ở 4 tuổi (không chỉ C-B); cập nhật FIGURES-servants.json theo main cho 16 mục trên.
