# Kiểm duyệt bộ giao diện: review/maid-art-b @ b9b42d2 (phần B, chỉ ảnh) — FAIL

Ngày 2026-11-14. Soi mẫu rộng 80 por (48 ngẫu nhiên + 32 a51 phi tần mặc áo cung nữ) ở 384x506, phóng mặt ×2.

## Đạt
- Mặt phi tần đúng người, mắt/miệng/cằm bình thường ở mẫu; không hoa điền trên áo cung nữ; tóc a51 đen, mặt a51 ra ~40–50 (tốt hơn phần A).

## Lỗi chặn
1. **Nhánh mang 640 ảnh cung nữ CŨ của phần A** (img/*maid-m*: 638 tệp khác bản mới ở review/maid-art fa8c1e2, vd por-maid-m13-tm3-a18 cũ còn
   nốt ruồi, por-maid-m02/m13/m15 cũ bị phóng to, mờ). Gộp nhánh này sẽ đè/xung đột bản đã sửa của phần A.
   Sửa: bỏ mọi img/*maid-m* và dev/figwork/maid khỏi nhánh (lấy theo review/maid-art), chỉ giữ consort-*-tm* + FIGURES.json của phần B; gộp origin/main mới.
2. **Còn nốt ruồi**: por-consort-c28-tm3-a26 (má trái), por-consort-c07-tm4-a18 (trán trái), por-consort-c28-tm2-a51 (má trái).
   Quét lại cả 960 por + fig phần B (c28 có thể ở mọi bậc tm0–tm4).

## Ghi chú (không chặn)
- a51 vài người còn trẻ (c04-tm2-a51, c11-tm4-a51, c17-tm2-a51 trông ~35): nên thêm nếp nhẹ khi làm lại.
