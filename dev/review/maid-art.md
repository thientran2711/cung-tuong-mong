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

---

# Kiểm lại: review/maid-art @ 4e070a84 (tiến nhanh từ wip/maid-art-fix) — FAIL (chỉ còn 2 nốt ruồi)

Ngày 2026-11-14 tối. Mẫu 24 nàng (14 nàng bị nêu lần trước + 10 ngẫu nhiên: m46 m08 m18 m31 m30 m22 m21 m09 m24 m43…), mỗi nàng 7 ô
(tm0 a26/a51, tm2 a36/a51, tm3 a51, tm4 a26/a51) = 120 ô a51; phóng to riêng 16 a51 của 4 nàng có nốt ruồi gốc (m13 m26 m39 m52).
Tấm xem: dev/shots/review/maid-art/ (A_0..A_2 tuổi, mole.jpg, cutA.jpg cỡ thật trên nền tối/sáng).

## Đạt
- a51 nay ra ~45–55 ở cả 13 hình bị nêu (m37-tm0, m33-tm2, m36/m50/m12/m33/m51/m49/m40/m01-tm4, m41-tm2, m26-tm2, m13-tm0) và cả mẫu ngẫu nhiên:
  nếp khoé mắt, rãnh mũi má, mặt đầy; tóc đen; vẫn hiền, đẹp. a36 khác a26 vừa đủ.
- 3 nốt ruồi lần trước (m52-tm4-a51, m39-tm0-a51, m52-tm2-a51) đã sạch; m26, m39, m52 a51 bốn bậc đều sạch.
- Không hoa điền trên cung nữ. Mạng che không vẽ trong tranh (lớp mạng KIT_VEIL do mã phủ, đúng luật m0–m1 ngà / m2–m4 hồng).
- Tách nền sạch ở cỡ thật (10 hình a51 vừa làm lại) trên nền tối và sáng.
- So main: chỉ thêm tệp + sửa PROGRESS.md và FIGURES-servants.json; JSON hợp lệ (1072 mục, không trùng, đủ tệp).

## Không đạt (chặn)
1. Còn nốt ruồi má trái: por/fig-maid-m13-tm0-a51 và por/fig-maid-m13-tm4-a51 (chấm sẫm rõ trên gò má trái, xem mole.jpg ô 1–2).
   m13 là nàng có nốt ruồi ở gen gốc; bản sửa chỉ vá tm2/tm3. Vá tại chỗ 2 hình (fig + por), soi lại m13 cả 4 bậc × 4 tuổi.

## Phụ / cho người gộp
- Một vài a51 hơi quá tuổi (~55–58, nếp sâu): m33-tm2, m37-tm2, m36-tm3 — chấp nhận (dải 51+), nhưng không nên già thêm.
- dev/figwork/maid/__pycache__/spfuncs.cpython-313.pyc bị commit — gỡ.
- FIGURES-servants.json: 16 mục bậc thường m13/m26/m39/m52 còn magnificUrl/bg cũ (main đã đổi ở no-moles 0c1793b) → khi gộp giữ bản main cho 16 mục đó.
  Nhánh đặt tier 'm1' cho bộ bậc thường (main: null) — phần C để null; người gộp chọn một cách thống nhất.
- XUNG ĐỘT VỚI PHẦN B: nhánh wip/maid-art-b-fix vẫn mang 160 ảnh a51 cung nữ phần A bản CŨ (trước khi làm già) + dev/figwork/PROGRESS.md cũ
  → gộp B sau A sẽ báo add/add hoặc đè bản già. B phải bỏ hẳn mọi img/*maid-m*-tm* và dev/figwork/maid*, PROGRESS.md của A khỏi nhánh.
