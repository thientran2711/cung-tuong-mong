# Kiểm duyệt bộ giao diện: review/no-moles @ 0c1793b (chỉ ảnh) — FAIL

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Soi cũ/mới từng ảnh có đổi ở cỡ phóng to (por, mặt ×3–4).

## Đạt
- Tẩy cục bộ (inpaint) ở u23–u28, u30, m13, m52: soi ×4 không thấy vết nhòe; nốt ruồi cũ đã hết (ảnh dev/shots/review/no-moles/soi-nghi-van.jpg).
  Má hồng một bên của u28-a18 có từ ảnh cũ, không phải vết tẩy.
- Phi tần t4 (18 người): đã có hoa điền nhỏ, không còn nốt ruồi trên mặt.

## Lỗi chặn
1. **72 chân dung phi tần t4 là 256x256** (por-consort-{c02,c03,c04,c05,c06,c08..c18,c25,c30}-t4-a{18,26,36,51}.webp): nhánh làm trước review/cutout-fix,
   main đang có bản 384x506 canh giữa mặt. Gộp vào sẽ kéo lùi khung kit (và xung đột tệp). Sửa: gộp origin/main, cắt lại 72 tệp bằng
   `python3 dev/figwork/porcrop.py img/fig-…` (384x506), kiểm lại không còn por nào khác cỡ.
2. **Tách nền trượt cutcheck (điểm ≥ 8 phải cắt lại, luật HANDOVER)** — `python3 dev/figwork/cutcheck.py`:
   fig-consort-c30-t4-a18 (74.3), c04-t4-a18 (39.4), c04-t4-a51 (39.1), c04-t4-a36 (31.4), c04-t4-a26 (31.0), c02-t4-a18 (22.6), c11-t4-a26 (21.2),
   c30-t4-a36 (21.1), c30-t4-a51 (17.7), c11-t4-a36 (17.6), c25-t4-a26 (13.7), c25-t4-a18 (12.9), eunuch-u21-a36 (12.7), c25-t4-a51 (10.2), c25-t4-a36 (8.9).
   Ảnh: cutcheck-truot.jpg (khăn voan trong suốt mang quầng sáng/bóng nền). Sửa: cắt một người từ lineup gốc + remove-background riêng (rematte.py).
3. **eunuch-u22-a36 còn nốt ruồi nhỏ** trên má trái (soi-nghi-van.jpg, ô đầu).
4. **eunuch-u22-a51 mất tuổi**: ảnh mới trông như 26–35 (da căng, tóc gần như đen), ảnh cũ có tóc bạc + nếp nhăn. Bậc 51+ phải ra tuổi (u22-cu-moi trong u22-u25-cu-moi.jpg).

## Thẻ Hoàng hậu trên bản dựng (kiểm theo yêu cầu)
Hoàng hậu NPC dùng tranh phi tần t4 (thử 8 kiếp mới: c03, c04, c08, c17, c24, c25, c26 t4). Các t4 nhánh này BỎ QUA (chờ thợ phi tần vẽ lại) mà còn
nốt ruồi trên má, ghi để thợ phi tần sửa (ảnh hoang-hau-t4-con-not-ruoi.jpg, bản trên main):
- por/fig-consort-c01-t4-a18, -a26, -a36, -a51
- por/fig-consort-c07-t4-a18, -a26, -a36, -a51 (cả chấm trên trán)
- por/fig-consort-c23-t4-a18, -a26, -a36
- por/fig-consort-c28-t4-a36
Chưa thấy cái tên "Nhan Ngọc Dao" trong 8 kiếp thử; nếu người đó là c01/c07/c23 t4 thì đúng là ảnh trong danh sách trên.
