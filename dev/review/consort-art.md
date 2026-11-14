# Kiểm duyệt bộ giao diện: review/consort-art @ d1e6e06 — FAIL

Ngày 2026-11-14. Xem tờ dev/figwork/sheets/art10/, chân dung 384x506, cutcheck bậc 8, ghép hình lên cảnh thật cỡ trong game, thử gộp với origin/main 2bed83a.

## Đạt
- Hoa điền bậc 4–8 khác nhau rõ, nhỏ cỡ c03 t1, t8 lớn hơn bằng chất liệu chứ không to hơn; không thấy nốt ruồi trên mặt phi tần trong tờ c03/c19/c26.
- Bậc 8 (ngọc trai rủ): cutcheck cao nhất 13.4 (c11-t8), 11.9 (c08-t8), nhưng ghép lên cảnh tẩm cung đêm cỡ thật trong game không thấy viền/quầng — chấp nhận
  (dev/shots/review/consort-art/t8-ngoc-trai-tren-canh.jpg). Chân dung đúng 384x506.

## Lỗi chặn
1. **Nốt ruồi quay lại ở chân dung KHÔNG phải phi tần.** Nhánh cắt lại (porcrop) cả por-eunuch (40), por-maid (24), por-thaihau (9), por-player (4),
   por-physician (1) từ hình CŨ trước review/no-moles, nên đè mất bản đã tẩy trên main: u21-a36, u22-a36 (thái giám), m52-a51, m39-a51, m26-a26 (cung nữ)…
   có lại nốt ruồi. Ảnh: not-ruoi-quay-lai-main-trai-nhanh-phai.jpg (cột 1, 3 = main; cột 2, 4 = nhánh).
   Sửa: bỏ mọi thay đổi por-* không phải consort (lấy lại bản main); nhánh này chỉ được đụng fig/por-consort và phần consort của FIGURES.json.
2. **Nhánh chậm 305 commit so với main, gộp ra 726 xung đột** (135 fig-consort, 512 por-consort, 78 por khác, FIGURES.json).
   Phải gộp main và giải từng nhóm: consort lấy bản nhánh (vẽ mới) nhưng kiểm lại t4 đã tẩy nốt ruồi trên main (no-moles 20a6346) không bị đè bằng bản có nốt;
   FIGURES.json gộp tay (giữ bản ghi của main cho người khác).
3. **a51 (48 tuổi) trông cùng tuổi a18** ở nhiều phi tần (c05, c09, c12, c17, c22, c31 t1; nhiều t8): không sợi bạc thái dương, không nét trưởng thành.
   Luật chủ: 4 lứa tuổi phải NHÌN ra tuổi (cùng lỗi đã trả review/maid-art). Ảnh: a18-a51-cung-tuoi.jpg (mỗi cặp: trái a18, phải a51).

## Ghi chú
- Phần thợ đã nêu (c24-t5 bạch quả rộng, c04-t6 giọt đá như ngọc, c30-t5 sóng rộng): xem lại khi sửa a51.
- Hoa điền t1–t3 gần như giống nhau (chấm hoa đỏ nhỏ): luật chủ là 8 nấc phân biệt — xem lại.
