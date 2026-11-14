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

---

# Kiểm lại: review/maid-art-b @ efe8e102 — FAIL (gộp sẽ đè 200 hình cung nữ bậc thường của main)

## Thử gộp (cục bộ, không đẩy): main → + review/maid-art (6a842cd9) → + review/maid-art-b
- A rồi B: KHÔNG xung đột; tệp phần A (img/*maid-m*-tm*, dev/figwork/maid, PROGRESS.md) của B trùng y blob của A → không đè A. Tốt.
- NHƯNG lượt gộp B đổi 200 tệp bậc thường fig/por-maid-mNN-a18/a26/a36/a51 (50 nàng, trừ m13 m26 m39 m52) về bản CŨ trước cutout-fix (955f51c):
  vd img/por-maid-m01-a18.webp thành 256x256 (main 384x506), img/fig-maid-m03-a18.webp blob 79c2ebb (main 08af67b, bản tách nền đã sửa).
  Nguyên nhân: commit 0e4a9535 "trả tệp phần A về bản review/maid-art" chép cả các tệp bậc thường mà cây của review/maid-art còn giữ bản cũ
  (A không đổi chúng nên gộp A thì giữ bản main; B đổi tường minh nên gộp B thì đè). Sửa: trả 200 tệp đó về đúng blob origin/main
  (`git checkout origin/main -- img/fig-maid-m??-a??.webp img/por-maid-m??-a??.webp`, rồi kiểm diff 3 chấm với main không còn tệp maid-m*-a*).
- Ngoài ra lượt gộp B chỉ đổi: ảnh consort-cNN-tm*, img/FIGURES.json (hợp lệ, 1296 mục), công cụ/sheet phần B, dev/review/maid-art-b.md.

## Tranh (mẫu 8 nàng × 8 ô: c22 c24 c28 c29 c30 = lô cuối, c17 c07 c01; dev/shots/review/maid-art-b/B.jpg)
- a51 nay ra ~48–55 ở mọi bậc (cả 28 lineup lô cuối), tóc đen, vẫn đẹp; a18/a26/a36 đúng dải. Đạt.
- Không hoa điền trên phi tần mặc áo cung nữ (đúng luật: không hoa điền cho bậc cung nữ). Tách nền sạch trên mẫu.
- Nốt ruồi: c17-tm0-a51 còn một chấm sẫm trên gò má trái cạnh đuôi mắt (moleB.jpg ô 3) — vá. c30-tm3-a51 có vài đốm nhỏ như tàn nhang ở má trái (ô 1) — nên làm mịn.
- c30-tm2-a51 nếp hơi sâu (~55–58), chấp nhận.

## Việc cho thợ
1) Trả 200 tệp bậc thường maid-mNN-aXX về blob main; 2) vá c17-tm0-a51 (fig + por), làm mịn c30-tm3-a51; 3) báo lại — phần còn lại đạt.
