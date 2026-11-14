# Kiểm duyệt bộ giao diện: review/maid-art @ fa8c1e2 (phần A, chỉ ảnh) — FAIL

Ngày 2026-11-14. Soi mẫu rộng 80 por (48 ngẫu nhiên mọi bậc/tuổi + 32 ngẫu nhiên tuổi a51) ở cỡ 384x506 và phóng mặt ×2.

## Đạt
- 5 lineup vá nhầm đã làm lại: mắt, miệng, cằm bình thường ở cả mẫu (m13, m26 bản mới sạch).
- Không hoa điền trên cung nữ; tóc a51 đen như tuổi 32 (đúng luật "~48, 2–3 sợi bạc"); áo theo bậc m0–m4 đúng; por 384x506.
- Không đè tệp nào main đã đổi (chỉ FIGURES-servants.json trùng, gộp được).

## Lỗi chặn
1. **Còn nốt ruồi** (luật chủ: không nốt ruồi trên mặt bất kỳ ai): por-maid-m52-tm4-a51 (má phải), por-maid-m39-tm0-a51 (má trái),
   por-maid-m52-tm2-a51 (chấm đỏ má phải). Mẫu ngẫu nhiên đã bắt 3 / 80, nên phải quét lại cả 832 por + fig (vd dò chấm sẫm nhỏ trên vùng má).
2. **Tuổi a51 mất tuổi** — tóc đen là đúng luật, nhưng mặt phải ra ~48 ("minimal faint lines, graceful"), không được như 18–30.
   Trông dưới 35 trong mẫu: m37-tm0-a51 (như a18), m33-tm2-a51, m36-tm4-a51, m50-tm4-a51, m12-tm4-a51, m33-tm4-a51, m41-tm2-a51, m26-tm2-a51,
   m51-tm4-a51, m49-tm4-a51, m40-tm4-a51, m01-tm4-a51, m13-tm0-a51. So với bản a51 cũ trên main (tóc bạc) thì nay a51 gần như trùng a26.
   Sửa: chỉnh mặt (không đổi tóc) cho a51: nếp nhẹ khóe mắt / rãnh mũi má, gò má đầy hơn, dáng chín chắn; soát cả 208 a51.

Ảnh soi: tạo bằng git show (không có trong nhánh); người kiểm có thể dựng lại theo tên tệp trên.
