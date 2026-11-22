# BEDSIZE1 — kích thước giường mọi phòng ngủ (owner L2316) — 0 cr, không vẽ lại
depth 1 · START_CTX ~3 % (roll at ~28 %, ceiling 60 %) · worker of ROOT-C1 session_01D3E3NX4Gc3XCtkhsnipEAS

## Cách đo
- 48 ảnh phòng ngủ trên CDN (img/_review/place-rank/{,pr13,pr19,pr20,pr21}/*-ngu*-ha-sang.webp, tất cả 2688×1386).
- Khung giường (cột/màn ngoài cùng, đỉnh màn, mép dưới bệ/bậc) đọc BẰNG MẮT trên tờ có lưới 5 % (tự động không được: màn/vách lẫn tường); sai số ±2 % ảnh. Số đo nằm trong dev/art/place-rank/bed_measure.py (B = {...}).
- Cỡ người trong game = sân khấu iPad thật (stage_exact/nf_tags.py: 1162×599, cả ảnh hiện ra; người cao 438.7 px = 73.2 % chiều cao ảnh = 37.7 % chiều rộng ảnh; chân cách đáy 69.7 px).
- "rộng ÷ cao người" = bề ngang giường / chiều cao nhân vật trong game. R:C = tỉ lệ ngang:cao của khối giường (px) — < 1.0 = "vuông/hộp" (cao hơn ngang).
- Trạng thái: M = mẫu đã duyệt (L16: bộ Cảnh Phúc, HQP v7, Khôn Ninh, Thừa Minh đông phối v6) · D = chủ OK/duyệt (L23 phối, PR19–21 Tần, M2294-11..15 L2299) · S = đã gửi, chủ nói không cần chờ duyệt (L2300) · O = bản cũ không còn dùng.

## Bảng (python3 dev/art/place-rank/bed_measure.py table)
| hạng | phòng | trạng thái | rộng %ảnh | cao %ảnh | rộng ÷ cao người | cao ÷ cao người | R:C | ghi chú |
|---|---|---|---|---|---|---|---|---|
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/ham-an-cung-tay-phoi-ngu | D | 30 | 58 | 0.79 | 0.79 | 1.00 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/khai-tuong-cung-tay-phoi-ngu | D | 30 | 60 | 0.79 | 0.82 | 0.97 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/vinh-hoa-cung-tay-phoi-ngu | D | 29 | 63 | 0.77 | 0.86 | 0.89 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/dien-huy-cung-dong-phoi-ngu | D | 28 | 70 | 0.74 | 0.96 | 0.78 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/ham-an-cung-dong-phoi-ngu | D | 28 | 62 | 0.74 | 0.85 | 0.88 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/canh-phuc-cung-tay-phoi-ngu | D | 27 | 50 | 0.71 | 0.68 | 1.05 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/chung-tu-cung-tay-phoi-ngu | D | 27 | 56 | 0.71 | 0.76 | 0.94 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/dien-huy-cung-tay-phoi-ngu | D | 27 | 62 | 0.71 | 0.85 | 0.84 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/khai-tuong-cung-dong-phoi-ngu | D | 27 | 60 | 0.71 | 0.82 | 0.87 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/thua-minh-cung-tay-phoi-ngu | D | 27 | 55 | 0.71 | 0.75 | 0.95 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | thua-minh-cung-dong-phoi-ngu | M | 26 | 73 | 0.69 | 1.00 | 0.69 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/truong-xuan-cung-tay-phoi-ngu | D | 25 | 68 | 0.66 | 0.93 | 0.71 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/truong-xuan-cung-dong-phoi-ngu | D | 22 | 85 | 0.58 | 1.16 | 0.50 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/canh-phuc-cung-dong-phoi-ngu | D | 21 | 55 | 0.56 | 0.75 | 0.74 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/chung-tu-cung-dong-phoi-ngu-r3 | D | 20 | 58 | 0.53 | 0.79 | 0.67 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/vinh-hoa-cung-dong-phoi-ngu | D | 20 | 70 | 0.53 | 0.96 | 0.55 |  |
| 4 Tần | pr21/chung-tu-cung-tan-ngu | D | 51 | 77 | 1.35 | 1.05 | 1.28 |  |
| 4 Tần | pr20/chung-tu-cung-tan-ngu | O | 48 | 77 | 1.27 | 1.05 | 1.21 |  |
| 4 Tần | pr13/ham-an-cung-tan-ngu | D | 42 | 70 | 1.11 | 0.96 | 1.16 |  |
| 4 Tần | pr13/khai-tuong-cung-tan-ngu | D | 42 | 70 | 1.11 | 0.96 | 1.16 |  |
| 4 Tần | pr20/dien-huy-cung-tan-ngu | D | 42 | 77 | 1.11 | 1.05 | 1.06 |  |
| 4 Tần | pr20/vinh-hoa-cung-tan-ngu | D | 42 | 75 | 1.11 | 1.02 | 1.09 |  |
| 4 Tần | pr19/chung-tu-cung-tan-ngu | O | 41 | 68 | 1.09 | 0.93 | 1.17 |  |
| 4 Tần | pr13/thua-minh-cung-tan-ngu | D | 40 | 74 | 1.06 | 1.01 | 1.05 |  |
| 4 Tần | pr19/ham-an-cung-tan-ngu | O | 40 | 74 | 1.06 | 1.01 | 1.05 |  |
| 4 Tần | canh-phuc-cung-tan-ngu | M | 38 | 77 | 1.01 | 1.05 | 0.96 | vuông/hộp |
| 4 Tần | pr13/truong-xuan-cung-tan-ngu | S | 38 | 70 | 1.01 | 0.96 | 1.05 |  |
| 4 Tần | pr19/khai-tuong-cung-tan-ngu | O | 38 | 68 | 1.01 | 0.93 | 1.08 |  |
| 5 Phi | canh-phuc-cung-phi-ngu | M | 42 | 76 | 1.11 | 1.04 | 1.07 |  |
| 5 Phi | pr13/chung-tu-cung-phi-ngu | D | 42 | 66 | 1.11 | 0.90 | 1.23 |  |
| 5 Phi | pr13/khai-tuong-cung-phi-ngu | D | 40 | 70 | 1.06 | 0.96 | 1.11 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/thua-minh-cung-phi-ngu | S | 39 | 70 | 1.03 | 0.96 | 1.08 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/truong-xuan-cung-phi-ngu | S | 39 | 80 | 1.03 | 1.09 | 0.95 | nhỏ hơn mốc B 43%, vuông/hộp |
| 5 Phi | pr13/vinh-hoa-cung-phi-ngu | S | 38 | 73 | 1.01 | 1.00 | 1.01 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/ham-an-cung-phi-ngu | S | 35 | 65 | 0.93 | 0.89 | 1.04 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/dien-huy-cung-phi-ngu | S | 35 | 70 | 0.93 | 0.96 | 0.97 | nhỏ hơn mốc B 43%, vuông/hộp |
| 6 Quý phi | canh-phuc-cung-quyphi-ngu | M | 44 | 80 | 1.17 | 1.09 | 1.07 |  |
| 6 Quý phi | pr13/dien-huy-cung-quyphi-ngu | S | 41 | 70 | 1.09 | 0.96 | 1.14 | nhỏ hơn mốc B 46% |
| 6 Quý phi | pr13/chung-tu-cung-quyphi-ngu | S | 39 | 72 | 1.03 | 0.98 | 1.05 | nhỏ hơn mốc B 46% |
| 6 Quý phi | pr13/ham-an-cung-quyphi-ngu | S | 37 | 73 | 0.98 | 1.00 | 0.98 | nhỏ hơn mốc B 46%, vuông/hộp |
| 6 Quý phi | pr13/truong-xuan-cung-quyphi-ngu | S | 37 | 70 | 0.98 | 0.96 | 1.03 | nhỏ hơn mốc B 46% |
| 6 Quý phi | pr13/khai-tuong-cung-quyphi-ngu | S | 33 | 74 | 0.87 | 1.01 | 0.86 | nhỏ hơn mốc B 46%, vuông/hộp |
| 6 Quý phi | pr13/thua-minh-cung-quyphi-ngu | S | 33 | 75 | 0.87 | 1.02 | 0.85 | nhỏ hơn mốc B 46%, vuông/hộp |
| 6 Quý phi | pr13/vinh-hoa-cung-quyphi-ngu | S | 33 | 74 | 0.87 | 1.01 | 0.86 | nhỏ hơn mốc B 46%, vuông/hộp |
| 7 Hoàng quý phi | truong-xuan-cung-hqp-ngu | M | 34 | 80 | 0.90 | 1.09 | 0.82 | nhỏ hơn mốc B 49%, vuông/hộp |
| 8 Hoàng hậu | khon-ninh-cung-ngu | M | 52 | 87 | 1.38 | 1.19 | 1.16 |  |

## Kết quả chính
- Mẫu đã duyệt: Cảnh Phúc Quý phi 44 % (1.17× người, R:C 1.07), Khôn Ninh HH 52 % (1.38×, R:C 1.16), Cảnh Phúc Phi 42 %, Cảnh Phúc Tần 38 %.
- 7 phòng Quý phi mới (M2300-05..21) đều NHỎ HƠN mẫu Quý phi đã duyệt (33–41 % so với 44 %) — tức là hiện tại Quý phi mới còn nhỏ hơn Tần (Tần đã duyệt 40–51 %). Thừa Minh QP (M2300-11) và Vĩnh Hòa QP (M2300-15) = 33 % (0.87× người), R:C 0.85 → đúng "nhỏ, vuông, hộp" như chủ thấy. Khải Tường QP (M2300-05) cũng 33 %, R:C 0.86.
- Phi mới: 35–40 %, Diên Huy Phi (M2300-01) và Hàm An Phi (M2299-12) 35 % nhỏ nhất.

## Hai phương án (gửi chủ)
- (A) MỘT cỡ cho mọi phòng 1 giường: khung giường rộng ≥ 44 % bề ngang ảnh (= mẫu Cảnh Phúc Quý phi, ~1.2× chiều cao nhân vật), ngang hơn cao (R:C ≥ 1.05).
- (B) GIƯỜNG LỚN THEO BẬC (khuyến nghị — đúng ý chủ + luật L1): Tần ≥ 40 % (1.05× người) · Phi ≥ 43 % (1.15×) · Quý phi ≥ 46 % (1.2×) · Hoàng quý phi ≥ 49 % (1.3×) · Hoàng hậu 52 % (1.38×, = Khôn Ninh đã duyệt, giữ nguyên). Mọi giường R:C ≥ 1.05 (ngang hơn cao). Phối 2 giường: giữ như đã OK (~27–30 % mỗi giường).
- Neo: Khôn Ninh (52 %) + Cảnh Phúc Quý phi (44 %); hầu hết Tần đã duyệt đã đạt mốc B.

## Danh sách KHUYẾN NGHỊ VẼ LẠI theo (B) (L21 — chưa vẽ, chờ chủ chọn)
Ưu tiên 1 (Quý phi, dưới mốc 46 % nhiều + vuông hộp): M2300-11 Thừa Minh QP 33 % R:C 0.85 · M2300-15 Vĩnh Hòa QP 33 % 0.86 · M2300-05 Khải Tường QP 33 % 0.86 · M2300-09 Hàm An QP 37 % 0.98 · M2300-21 Trường Xuân QP 37 % · M2300-07 Chung Tú QP 39 % · M2300-13 Diên Huy QP 41 %.
Ưu tiên 2 (Phi, dưới 43 %): M2300-01 Diên Huy Phi 35 % R:C 0.97 · M2299-12 Hàm An Phi 35 % · M2300-03 Vĩnh Hòa Phi 38 % · M2300-19 Trường Xuân Phi 39 % R:C 0.95 · M2299-14 Thừa Minh Phi 39 % · (M2294-13 Khải Tường Phi 40 % — chủ đã duyệt L2299; theo L23 giữ, chỉ vẽ nếu chủ gọi tên).
Ghi chú: HQP v7 (Trường Xuân HQP) 34 %, R:C 0.82 — là mẫu đã duyệt nên theo L23 giữ nguyên, chỉ báo chủ biết nó nhỏ hơn mốc B 49 %. Tần: tất cả đạt (Trường Xuân Tần M2300-17 38 % sát mốc, trong sai số).
Cách sửa khi chủ đồng ý (A17, chỉ một chỗ): thêm câu cỡ giường vào prompt phòng đó, ví dụ "the canopy bed is wide and grand, its frame spanning about 46 % of the picture width, wider than tall" — chưa sửa prompt nào.

## Tờ so sánh
https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/bedsize/bedsize-compare.jpg (2366×1468, 1.1 MB) — Cảnh Phúc QP (mẫu) · Khôn Ninh (mẫu) · M2300-11 · M2300-15, mỗi ảnh có 1 nhân vật đúng cỡ + chỗ đứng game iPad, khung xanh = khung giường đo. Đã xem.

## Gens: 0. Không đổi prompt, không vẽ lại.
