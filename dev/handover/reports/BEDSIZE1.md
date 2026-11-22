# BEDSIZE1 — kích thước giường mọi phòng ngủ (owner L2316) — 0 cr, không vẽ lại
depth 1 · START_CTX ~3 % (roll at ~28 %, ceiling 60 %) · worker of ROOT-C1 session_01D3E3NX4Gc3XCtkhsnipEAS

## Cách đo
- 48 ảnh phòng ngủ trên CDN (img/_review/place-rank/{,pr13,pr19,pr20,pr21}/*-ngu*-ha-sang.webp, tất cả 2688×1386).
- Khung giường (cột/màn ngoài cùng, đỉnh màn, mép dưới bệ/bậc) đọc BẰNG MẮT trên tờ có lưới 5 % (tự động không được: màn/vách lẫn tường); sai số ±2 % ảnh. Số đo nằm trong dev/art/place-rank/bed_measure.py (B = {...}).
- Cỡ người trong game = sân khấu iPad thật (stage_exact/nf_tags.py: 1162×599, cả ảnh hiện ra; người cao 438.7 px = 73.2 % chiều cao ảnh = 37.7 % chiều rộng ảnh; chân cách đáy 69.7 px).
- "rộng ÷ cao người" = bề ngang giường / chiều cao nhân vật trong game. R:C = tỉ lệ ngang:cao của khối giường (px) — < 1.0 = "vuông/hộp" (cao hơn ngang).
- Trạng thái: M = mẫu đã duyệt (L16: bộ Cảnh Phúc, HQP v7, Khôn Ninh, Thừa Minh đông phối v6) · D = chủ OK/duyệt (L23 phối, PR19–21 Tần, M2294-11..15 L2299) · S = đã gửi, chủ nói không cần chờ duyệt (L2300) · O = bản cũ không còn dùng.

## SỬA LẦN 3 (owner L2329 qua ROOT-C1) — LUẬT L29 + PROMPT SẴN SÀNG VẼ LẠI (0 cr, chưa vẽ)
### (1) Sửa đánh dấu "đã duyệt" sai
- Chung Tú Tần pr21 (pr21/chung-tu-cung-tan-ngu): chủ CHƯA từng duyệt, còn chê xấu → trạng thái X (bị chê), bỏ khỏi mọi danh sách mốc/đã duyệt. Nguồn lỗi = CHÍNH bảng B trong bed_measure.py của mình (lần 1 mình đoán "D" cho các phòng Tần pr19–21 từ báo cáo PR mà không có lời duyệt của chủ). Không có file chung nào khác (FOREMAN_C_STATUS / ART_RULES) ghi nó là đã duyệt; ROOMPF1.md gọi "PR20 TONE v2 + PR21 CL rất nhẹ" là công thức (recipe) đã duyệt — đó là cách tô màu L1669, không phải duyệt ảnh này.
- Cùng nhóm, sửa luôn (D → S = đã gửi, KHÔNG tìm thấy lời OK): pr20/dien-huy-cung-tan-ngu, pr20/vinh-hoa-cung-tan-ngu (đợt 2 pr20, chủ dừng "nâu nâu"); phối không tìm thấy OK: thua-minh tây phối (phòng 1), khai-tuong đông (6), khai-tuong tây (8, chỉ là khuyến nghị vẽ lại), vinh-hoa đông (23), vinh-hoa tây (25), truong-xuan đông (27), truong-xuan tây (29, đợt 6 không thấy kết luận).
- Còn D (có lời chủ): Tần pr13 khai-tuong (31) + ham-an (35) (PR19 "ảnh 1 ok … 5 ok"); M2294-11..15 (L2299 "Duyệt"); phối 3, 5 (L24 mẫu D/E), 10-r3, 13, 15, 16–19 (L835 / L859), Diên Huy tây (đợt 5, L869 "4 phòng ok").
- Phòng pr20/pr21 Tần đã bỏ khỏi tờ so sánh; tờ v3 thay bằng Hoàng quý phi trực diện.
### (2) Luật mới L29 (rule.py add, Lượt 2329, lời chủ nguyên văn) + DESIGN_BIBLE §2 "Others"
Mốc = Cảnh Phúc Phi trực diện UPve2vXwny 43 % bề ngang ảnh (~1,14× người, ngang hơn cao). Tần = Phi = Quý phi ≥ 43 %; Hoàng quý phi ~47 %; Hoàng hậu ~51 %; mọi giường ngang hơn cao; 3 bậc thấp (phối, 2 giường) nhỏ hơn, không đo. bed_measure.py LADDER = 43/43/43/47/51, TOL 0.
### (3) Prompt sửa (KHÔNG vẽ) — dev/art/place-rank/bedsize_L29/<code>_<key>.txt (+ .base.txt = prompt đã vẽ, + .keep) và gộp prompts_roompf1_L29_bedsize.json (giữ code/refs/layout gốc). File json M2299/M2300 gốc KHÔNG sửa (là bản ghi đã vẽ).
Câu thêm (ngay sau câu BED "…never a slim narrow bed."):
" BED WIDTH (owner Lượt 2329, rule L29): the canopy bed is wide and grand: its whole canopy frame spans about 43 % of the picture width, a little less than half of the picture, and the bed block is clearly WIDER than it is tall, never a narrow, square, boxy bed."
Chỉ riêng M2300-01 thêm: " OPEN FLOOR (owner Lượt 2317: this room's floor was too narrow): keep a clearly visible strip of open floor in front of the bed platform and the stools, like the other rooms, never furniture pushed down towards the bottom edge."
13 phòng: M2299-12 ham-an Phi · M2299-14 thua-minh Phi · M2300-01 dien-huy Phi · -03 vinh-hoa Phi · -19 truong-xuan Phi · -05 khai-tuong QP · -07 chung-tu QP · -09 ham-an QP · -11 thua-minh QP · -13 dien-huy QP · -15 vinh-hoa QP · -21 truong-xuan QP · -17 truong-xuan Tần (38 %). keep_check --sidecar 13× PASS (0 drops), room_gate.py 13× PASS. Giữ nguyên (đã duyệt L2299): M2294-11 TM Tần 40 %, M2294-13 KT Phi 40 %, M2294-15 CT Phi 42 %.
LƯU Ý cho foreman (chưa làm, A17): ảnh 3 của cả 13 prompt = cpS5YIl0eP (Khôn Ninh B3, giường 38 %) hoặc bản lật 1ldYySkr4r; prompt nói ảnh 3 hướng dẫn "camera distance … people scale" → rất có thể chính ảnh 3 giữ giường nhỏ (PR12 đã gặp: giường QP ở 31 % qua 3 lần thử vì ảnh 3). Nếu lần vẽ đầu giường vẫn < 43 %, cân nhắc đổi ảnh 3 sang UPve2vXwny (giường 43 %; nhưng sàn 20.3 rộng → giữ câu FLOOR AMOUNT) — quyết định của foreman/chủ.
### Tờ so sánh v3 (chỉ ảnh trực diện; không còn Chung Tú Tần)
https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/bedsize/bedsize-compare-v3.jpg — CP Phi 3w (mốc L29) · HQP F-r2 · Khôn Ninh B3 · CP QP F · M2300-11 · M2300-15. Đã xem.
### Bảng hiện tại (L29)
| hạng | phòng | trạng thái | rộng %ảnh | cao %ảnh | rộng ÷ cao người | cao ÷ cao người | R:C | sàn floor_c % | ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/ham-an-cung-tay-phoi-ngu | D | 30 | 58 | 0.79 | 0.79 | 1.00 | 14.3 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/khai-tuong-cung-tay-phoi-ngu | S | 30 | 60 | 0.79 | 0.82 | 0.97 | 10.4 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/vinh-hoa-cung-tay-phoi-ngu | S | 29 | 63 | 0.77 | 0.86 | 0.89 | 12.1 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/dien-huy-cung-dong-phoi-ngu | D | 28 | 70 | 0.74 | 0.96 | 0.78 | 16.0 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/ham-an-cung-dong-phoi-ngu | D | 28 | 62 | 0.74 | 0.85 | 0.88 | 18.2 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/canh-phuc-cung-tay-phoi-ngu | D | 27 | 50 | 0.71 | 0.68 | 1.05 | 11.7 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/chung-tu-cung-tay-phoi-ngu | D | 27 | 56 | 0.71 | 0.76 | 0.94 | 13.0 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/dien-huy-cung-tay-phoi-ngu | D | 27 | 62 | 0.71 | 0.85 | 0.84 | 19.0 | sàn rộng |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/khai-tuong-cung-dong-phoi-ngu | S | 27 | 60 | 0.71 | 0.82 | 0.87 | 14.3 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/thua-minh-cung-tay-phoi-ngu | S | 27 | 55 | 0.71 | 0.75 | 0.95 | 23.4 | sàn rộng |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/truong-xuan-cung-tay-phoi-ngu | S | 25 | 68 | 0.66 | 0.93 | 0.71 | 10.8 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/truong-xuan-cung-dong-phoi-ngu | S | 22 | 85 | 0.58 | 1.16 | 0.50 | 14.7 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/canh-phuc-cung-dong-phoi-ngu | D | 21 | 55 | 0.56 | 0.75 | 0.74 | 19.0 | sàn rộng |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/chung-tu-cung-dong-phoi-ngu-r3 | D | 20 | 58 | 0.53 | 0.79 | 0.67 | 16.0 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/vinh-hoa-cung-dong-phoi-ngu | S | 20 | 70 | 0.53 | 0.96 | 0.55 | 18.6 | sàn rộng |
| 4 Tần | pr21/chung-tu-cung-tan-ngu | X | 51 | 77 | 1.35 | 1.05 | 1.28 | 15.6 |  |
| 4 Tần | pr13/ham-an-cung-tan-ngu | D | 42 | 70 | 1.11 | 0.96 | 1.16 | 12.6 | nhỏ hơn mốc L29 43% |
| 4 Tần | pr13/khai-tuong-cung-tan-ngu | D | 42 | 70 | 1.11 | 0.96 | 1.16 | 16.0 | nhỏ hơn mốc L29 43% |
| 4 Tần | pr20/dien-huy-cung-tan-ngu | S | 42 | 77 | 1.11 | 1.05 | 1.06 | 18.6 | nhỏ hơn mốc L29 43%, sàn rộng |
| 4 Tần | pr20/vinh-hoa-cung-tan-ngu | S | 42 | 75 | 1.11 | 1.02 | 1.09 | 19.0 | nhỏ hơn mốc L29 43%, sàn rộng |
| 4 Tần | pr13/thua-minh-cung-tan-ngu | D | 40 | 74 | 1.06 | 1.01 | 1.05 | 15.6 | nhỏ hơn mốc L29 43% |
| 4 Tần | pr13/truong-xuan-cung-tan-ngu | S | 38 | 70 | 1.01 | 0.96 | 1.05 | 13.0 | nhỏ hơn mốc L29 43% |
| 5 Phi | v10/canh-phuc-cung-phi-ngu-3w | M | 43 | 67 | 1.14 | 0.91 | 1.24 | 20.3 | sàn rộng |
| 5 Phi | pr13/chung-tu-cung-phi-ngu | D | 42 | 66 | 1.11 | 0.90 | 1.23 | 13.0 | nhỏ hơn mốc L29 43% |
| 5 Phi | pr13/khai-tuong-cung-phi-ngu | D | 40 | 70 | 1.06 | 0.96 | 1.11 | 15.6 | nhỏ hơn mốc L29 43% |
| 5 Phi | pr13/thua-minh-cung-phi-ngu | S | 39 | 70 | 1.03 | 0.96 | 1.08 | 11.7 | nhỏ hơn mốc L29 43%, sàn hẹp |
| 5 Phi | pr13/truong-xuan-cung-phi-ngu | S | 39 | 80 | 1.03 | 1.09 | 0.95 | 12.6 | nhỏ hơn mốc L29 43%, vuông/hộp |
| 5 Phi | pr13/vinh-hoa-cung-phi-ngu | S | 38 | 73 | 1.01 | 1.00 | 1.01 | 17.3 | nhỏ hơn mốc L29 43% |
| 5 Phi | pr13/ham-an-cung-phi-ngu | S | 35 | 65 | 0.93 | 0.89 | 1.04 | 15.2 | nhỏ hơn mốc L29 43% |
| 5 Phi | pr13/dien-huy-cung-phi-ngu | S | 35 | 70 | 0.93 | 0.96 | 0.97 | 10.0 | nhỏ hơn mốc L29 43%, vuông/hộp, sàn hẹp |
| 6 Quý phi | pr13/dien-huy-cung-quyphi-ngu | S | 41 | 70 | 1.09 | 0.96 | 1.14 | 14.3 | nhỏ hơn mốc L29 43% |
| 6 Quý phi | pr13/chung-tu-cung-quyphi-ngu | S | 39 | 72 | 1.03 | 0.98 | 1.05 | 16.5 | nhỏ hơn mốc L29 43% |
| 6 Quý phi | v11f/canh-phuc-cung-quyphi-ngu-F | M | 37 | 69 | 0.98 | 0.94 | 1.04 | 10.8 | nhỏ hơn mốc L29 43%, sàn hẹp |
| 6 Quý phi | pr13/ham-an-cung-quyphi-ngu | S | 37 | 73 | 0.98 | 1.00 | 0.98 | 18.2 | nhỏ hơn mốc L29 43%, vuông/hộp |
| 6 Quý phi | pr13/truong-xuan-cung-quyphi-ngu | S | 37 | 70 | 0.98 | 0.96 | 1.03 | 14.3 | nhỏ hơn mốc L29 43% |
| 6 Quý phi | pr13/khai-tuong-cung-quyphi-ngu | S | 33 | 74 | 0.87 | 1.01 | 0.86 | 13.4 | nhỏ hơn mốc L29 43%, vuông/hộp |
| 6 Quý phi | pr13/thua-minh-cung-quyphi-ngu | S | 33 | 75 | 0.87 | 1.02 | 0.85 | 17.7 | nhỏ hơn mốc L29 43%, vuông/hộp |
| 6 Quý phi | pr13/vinh-hoa-cung-quyphi-ngu | S | 33 | 74 | 0.87 | 1.01 | 0.86 | 12.1 | nhỏ hơn mốc L29 43%, vuông/hộp, sàn hẹp |
| 7 Hoàng quý phi | v12/truong-xuan-cung-hqp-ngu-F-r2 | M | 40 | 85 | 1.06 | 1.16 | 0.91 | 9.5 | nhỏ hơn mốc L29 47%, vuông/hộp, sàn hẹp |
| 8 Hoàng hậu | v9/khon-ninh-cung-ngu-B3 | M | 38 | 68 | 1.01 | 0.93 | 1.08 | 11.7 | nhỏ hơn mốc L29 51%, sàn hẹp |

## SỬA LẦN 2 (owner L2318 qua ROOT-C1: Khôn Ninh v6/v7 góc xéo là mẫu ĐÃ BỎ; mọi phòng TRỰC DIỆN — L14)
- Bỏ các ảnh cũ ở thư mục gốc (Cảnh Phúc Tần/Phi/QP v5–v7 góc xéo, Khôn Ninh v6/v7, HQP v7, Thừa Minh đông phối v6) và bản cũ pr19 / pr20 Chung Tú Tần.
- Mẫu TRỰC DIỆN hiện tại (đối chiếu mã ảnh + floor_c trong place-rank-sample.md): Khôn Ninh HH = v9/khon-ninh-cung-ngu-B3 (cpS5YIl0eP, floor 11.7 khớp) · HQP = v12/truong-xuan-cung-hqp-ngu-F-r2 (ov6w4kO829, 9.5 khớp) · Quý phi = v11f/canh-phuc-cung-quyphi-ngu-F (eIPlheldqL, 10.8 khớp) · Phi = v10/canh-phuc-cung-phi-ngu-3w (UPve2vXwny, 20.3 khớp; Phi v9 4RFIyNR9Aa là góc xéo nên không dùng). Không tìm thấy file Cảnh Phúc Tần trực diện → Tần lấy theo các phòng Tần đã duyệt.
- SỐ MỚI: Khôn Ninh HH 38 % (1.01× người) · HQP 40 % (R:C 0.91, cao hơn ngang) · Cảnh Phúc QP 37 % · Cảnh Phúc Phi 43 % (1.14×, R:C 1.24). → Giường Hoàng hậu trực diện hiện tại NHỎ hơn giường Tần đã duyệt (40–51 %); không mẫu trực diện nào lớn dần theo bậc. Không dùng được Khôn Ninh làm mốc "to nhất".
- MỐC MỚI: giường đẹp nhất đã duyệt = Cảnh Phúc Phi 3w (43 %, ngang rõ) + Chung Tú Tần pr21 (51 %). (A) một cỡ ≥ 43 %. (B) giữ: Tần 40 · Phi 43 (= Phi 3w) · QP 46 · HQP 49 · HH 52 (+3 mỗi bậc; HQP/HH là số đề xuất, không còn ảnh duyệt nào to cỡ đó).
- Thêm vào danh sách (chỉ báo, đã duyệt → L23 giữ trừ khi chủ gọi tên): Khôn Ninh HH 38 % (dưới 52), HQP 40 % vuông, Cảnh Phúc QP 37 %.

## Bảng (python3 dev/art/place-rank/bed_measure.py table DLDIR) — chỉ ảnh hiện tại, có cột sàn floor_c
| hạng | phòng | trạng thái | rộng %ảnh | cao %ảnh | rộng ÷ cao người | cao ÷ cao người | R:C | sàn floor_c % | ghi chú |
|---|---|---|---|---|---|---|---|---|---|
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/ham-an-cung-tay-phoi-ngu | D | 30 | 58 | 0.79 | 0.79 | 1.00 | 14.3 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/khai-tuong-cung-tay-phoi-ngu | D | 30 | 60 | 0.79 | 0.82 | 0.97 | 10.4 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/vinh-hoa-cung-tay-phoi-ngu | D | 29 | 63 | 0.77 | 0.86 | 0.89 | 12.1 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/dien-huy-cung-dong-phoi-ngu | D | 28 | 70 | 0.74 | 0.96 | 0.78 | 16.0 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/ham-an-cung-dong-phoi-ngu | D | 28 | 62 | 0.74 | 0.85 | 0.88 | 18.2 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/canh-phuc-cung-tay-phoi-ngu | D | 27 | 50 | 0.71 | 0.68 | 1.05 | 11.7 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/chung-tu-cung-tay-phoi-ngu | D | 27 | 56 | 0.71 | 0.76 | 0.94 | 13.0 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/dien-huy-cung-tay-phoi-ngu | D | 27 | 62 | 0.71 | 0.85 | 0.84 | 19.0 | sàn rộng |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/khai-tuong-cung-dong-phoi-ngu | D | 27 | 60 | 0.71 | 0.82 | 0.87 | 14.3 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/thua-minh-cung-tay-phoi-ngu | D | 27 | 55 | 0.71 | 0.75 | 0.95 | 23.4 | sàn rộng |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/truong-xuan-cung-tay-phoi-ngu | D | 25 | 68 | 0.66 | 0.93 | 0.71 | 10.8 | sàn hẹp |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/truong-xuan-cung-dong-phoi-ngu | D | 22 | 85 | 0.58 | 1.16 | 0.50 | 14.7 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/canh-phuc-cung-dong-phoi-ngu | D | 21 | 55 | 0.56 | 0.75 | 0.74 | 19.0 | sàn rộng |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/chung-tu-cung-dong-phoi-ngu-r3 | D | 20 | 58 | 0.53 | 0.79 | 0.67 | 16.0 |  |
| 1-3 Đáp ứng/Thường tại/Quý nhân | pr13/vinh-hoa-cung-dong-phoi-ngu | D | 20 | 70 | 0.53 | 0.96 | 0.55 | 18.6 | sàn rộng |
| 4 Tần | pr21/chung-tu-cung-tan-ngu | D | 51 | 77 | 1.35 | 1.05 | 1.28 | 15.6 |  |
| 4 Tần | pr13/ham-an-cung-tan-ngu | D | 42 | 70 | 1.11 | 0.96 | 1.16 | 12.6 |  |
| 4 Tần | pr13/khai-tuong-cung-tan-ngu | D | 42 | 70 | 1.11 | 0.96 | 1.16 | 16.0 |  |
| 4 Tần | pr20/dien-huy-cung-tan-ngu | D | 42 | 77 | 1.11 | 1.05 | 1.06 | 18.6 | sàn rộng |
| 4 Tần | pr20/vinh-hoa-cung-tan-ngu | D | 42 | 75 | 1.11 | 1.02 | 1.09 | 19.0 | sàn rộng |
| 4 Tần | pr13/thua-minh-cung-tan-ngu | D | 40 | 74 | 1.06 | 1.01 | 1.05 | 15.6 |  |
| 4 Tần | pr13/truong-xuan-cung-tan-ngu | S | 38 | 70 | 1.01 | 0.96 | 1.05 | 13.0 |  |
| 5 Phi | v10/canh-phuc-cung-phi-ngu-3w | M | 43 | 67 | 1.14 | 0.91 | 1.24 | 20.3 | sàn rộng |
| 5 Phi | pr13/chung-tu-cung-phi-ngu | D | 42 | 66 | 1.11 | 0.90 | 1.23 | 13.0 |  |
| 5 Phi | pr13/khai-tuong-cung-phi-ngu | D | 40 | 70 | 1.06 | 0.96 | 1.11 | 15.6 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/thua-minh-cung-phi-ngu | S | 39 | 70 | 1.03 | 0.96 | 1.08 | 11.7 | nhỏ hơn mốc B 43%, sàn hẹp |
| 5 Phi | pr13/truong-xuan-cung-phi-ngu | S | 39 | 80 | 1.03 | 1.09 | 0.95 | 12.6 | nhỏ hơn mốc B 43%, vuông/hộp |
| 5 Phi | pr13/vinh-hoa-cung-phi-ngu | S | 38 | 73 | 1.01 | 1.00 | 1.01 | 17.3 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/ham-an-cung-phi-ngu | S | 35 | 65 | 0.93 | 0.89 | 1.04 | 15.2 | nhỏ hơn mốc B 43% |
| 5 Phi | pr13/dien-huy-cung-phi-ngu | S | 35 | 70 | 0.93 | 0.96 | 0.97 | 10.0 | nhỏ hơn mốc B 43%, vuông/hộp, sàn hẹp |
| 6 Quý phi | pr13/dien-huy-cung-quyphi-ngu | S | 41 | 70 | 1.09 | 0.96 | 1.14 | 14.3 | nhỏ hơn mốc B 46% |
| 6 Quý phi | pr13/chung-tu-cung-quyphi-ngu | S | 39 | 72 | 1.03 | 0.98 | 1.05 | 16.5 | nhỏ hơn mốc B 46% |
| 6 Quý phi | v11f/canh-phuc-cung-quyphi-ngu-F | M | 37 | 69 | 0.98 | 0.94 | 1.04 | 10.8 | nhỏ hơn mốc B 46%, sàn hẹp |
| 6 Quý phi | pr13/ham-an-cung-quyphi-ngu | S | 37 | 73 | 0.98 | 1.00 | 0.98 | 18.2 | nhỏ hơn mốc B 46%, vuông/hộp |
| 6 Quý phi | pr13/truong-xuan-cung-quyphi-ngu | S | 37 | 70 | 0.98 | 0.96 | 1.03 | 14.3 | nhỏ hơn mốc B 46% |
| 6 Quý phi | pr13/khai-tuong-cung-quyphi-ngu | S | 33 | 74 | 0.87 | 1.01 | 0.86 | 13.4 | nhỏ hơn mốc B 46%, vuông/hộp |
| 6 Quý phi | pr13/thua-minh-cung-quyphi-ngu | S | 33 | 75 | 0.87 | 1.02 | 0.85 | 17.7 | nhỏ hơn mốc B 46%, vuông/hộp |
| 6 Quý phi | pr13/vinh-hoa-cung-quyphi-ngu | S | 33 | 74 | 0.87 | 1.01 | 0.86 | 12.1 | nhỏ hơn mốc B 46%, vuông/hộp, sàn hẹp |
| 7 Hoàng quý phi | v12/truong-xuan-cung-hqp-ngu-F-r2 | M | 40 | 85 | 1.06 | 1.16 | 0.91 | 9.5 | nhỏ hơn mốc B 49%, vuông/hộp, sàn hẹp |
| 8 Hoàng hậu | v9/khon-ninh-cung-ngu-B3 | M | 38 | 68 | 1.01 | 0.93 | 1.08 | 11.7 | nhỏ hơn mốc B 52%, sàn hẹp |

## Kết quả chính
- (lần 1, ĐÃ THAY bằng mục SỬA LẦN 2) mẫu cũ góc xéo: CP QP 44 %, Khôn Ninh 52 % — không dùng nữa.
- 7 phòng Quý phi mới (M2300-05..21) đều NHỎ HƠN mẫu Quý phi đã duyệt (33–41 % so với 44 %) — tức là hiện tại Quý phi mới còn nhỏ hơn Tần (Tần đã duyệt 40–51 %). Thừa Minh QP (M2300-11) và Vĩnh Hòa QP (M2300-15) = 33 % (0.87× người), R:C 0.85 → đúng "nhỏ, vuông, hộp" như chủ thấy. Khải Tường QP (M2300-05) cũng 33 %, R:C 0.86.
- Phi mới: 35–40 %, Diên Huy Phi (M2300-01) và Hàm An Phi (M2299-12) 35 % nhỏ nhất.

## SÀN (owner L2317 qua ROOT-C1: sàn đẹp nhất = M2300-05 Khải Tường QP + M2300-03 Vĩnh Hòa Phi; hẹp quá = M2300-01 Diên Huy Phi)
- floor_c (độ sâu sàn trống giữa ảnh, % chiều cao): M2300-05 = 13.4 · M2300-03 = 17.3 · M2300-01 = 10.0 → khoảng sàn tốt 12.5–18.5 %.
- Phòng mới dưới 12.5 (sàn hẹp): M2300-01 Diên Huy Phi 10.0 · M2299-14 Thừa Minh Phi 11.7 · M2300-15 Vĩnh Hòa QP 12.1 (sát). Các phòng mới khác 12.6–18.2 = ổn.
- Phòng đã OK (phối, Tần pr20) có vài cái ngoài khoảng (10.4–23.4) → chỉ báo, giữ theo L23.
- Các mẫu cũ ở thư mục gốc (Cảnh Phúc ×3, Khôn Ninh, HQP v7, Thừa Minh đông phối v6) đo ra 2.6–7.8: KHÔNG tin được — sàn có thảm/hoa văn/bóng phản chiếu nên script dừng sớm (nhìn ảnh thì sàn trống ~15–20 %). Không dùng làm mốc sàn.
- Neo giường theo M2300-05/-03 thì KHÔNG hợp lý: giường M2300-05 33 % vuông hộp (cùng lỗi chủ chê), M2300-03 38 %. → Sàn neo M2300-05/-03; cỡ giường neo Khôn Ninh + Cảnh Phúc QP (phương án B giữ nguyên).

## Hai phương án (gửi chủ)
- (A) MỘT cỡ cho mọi phòng 1 giường: khung giường rộng ≥ 44 % bề ngang ảnh (= mẫu Cảnh Phúc Quý phi, ~1.2× chiều cao nhân vật), ngang hơn cao (R:C ≥ 1.05).
- (B) GIƯỜNG LỚN THEO BẬC (khuyến nghị — đúng ý chủ + luật L1): Tần ≥ 40 % (1.05× người) · Phi ≥ 43 % (1.15×) · Quý phi ≥ 46 % (1.2×) · Hoàng quý phi ≥ 49 % (1.3×) · Hoàng hậu 52 % (1.38×, = Khôn Ninh đã duyệt, giữ nguyên). Mọi giường R:C ≥ 1.05 (ngang hơn cao). Phối 2 giường: giữ như đã OK (~27–30 % mỗi giường).
- Neo: Khôn Ninh (52 %) + Cảnh Phúc Quý phi (44 %); hầu hết Tần đã duyệt đã đạt mốc B.

## Danh sách KHUYẾN NGHỊ VẼ LẠI theo (B) (L21 — chưa vẽ, chờ chủ chọn)
Ưu tiên 1 (Quý phi, dưới mốc 46 % nhiều + vuông hộp): M2300-11 Thừa Minh QP 33 % R:C 0.85 · M2300-15 Vĩnh Hòa QP 33 % 0.86 · M2300-05 Khải Tường QP 33 % 0.86 · M2300-09 Hàm An QP 37 % 0.98 · M2300-21 Trường Xuân QP 37 % · M2300-07 Chung Tú QP 39 % · M2300-13 Diên Huy QP 41 %.
Ưu tiên 2 (Phi, dưới 43 %): M2300-01 Diên Huy Phi 35 % R:C 0.97 + SÀN HẸP 10.0 (chủ L2317 nói hẹp quá) — sửa cả giường lẫn sàn · M2299-12 Hàm An Phi 35 % · M2300-03 Vĩnh Hòa Phi 38 % · M2300-19 Trường Xuân Phi 39 % R:C 0.95 · M2299-14 Thừa Minh Phi 39 % (sàn 11.7 hơi hẹp) · (M2294-13 Khải Tường Phi 40 % — chủ đã duyệt L2299; theo L23 giữ, chỉ vẽ nếu chủ gọi tên).
Ghi chú: HQP v7 (Trường Xuân HQP) 34 %, R:C 0.82 — là mẫu đã duyệt nên theo L23 giữ nguyên, chỉ báo chủ biết nó nhỏ hơn mốc B 49 %. Tần: tất cả đạt (Trường Xuân Tần M2300-17 38 % sát mốc, trong sai số).
Khi vẽ lại: giữ sàn trong 12.5–18.5 % như M2300-05/-03 (room_gate/measure_floor kiểm sau khi vẽ).
Cách sửa khi chủ đồng ý (A17, chỉ một chỗ): thêm câu cỡ giường vào prompt phòng đó, ví dụ "the canopy bed is wide and grand, its frame spanning about 46 % of the picture width, wider than tall" — chưa sửa prompt nào.

## Tờ so sánh v2 (chỉ ảnh trực diện hiện tại): https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/bedsize/bedsize-compare-v2.jpg — CP Phi 3w · CT Tần pr21 · Khôn Ninh B3 · CP QP F · M2300-11 · M2300-15. Tờ v1 bên dưới dùng Khôn Ninh đã bỏ → bỏ qua.
## Tờ so sánh v1 (CŨ, chỉ iPad — Fold chờ PEOPLE1 stage_exact/fold755.json)
https://ctm-img.victoria-tntt.workers.dev/img/_review/place-rank/bedsize/bedsize-compare.jpg (2366×1468, 1.1 MB) — Cảnh Phúc QP (mẫu) · Khôn Ninh (mẫu) · M2300-11 · M2300-15, mỗi ảnh có 1 nhân vật đúng cỡ + chỗ đứng game iPad, khung xanh = khung giường đo. Đã xem.

## Gens: 0. Không đổi prompt, không vẽ lại.
