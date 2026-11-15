# PROGRESS · Trung y (review/trung-y) — sếp 15/11 09:15Z

Khi ô Y phục của NÀNG trống (bị thu hồi, bị cướp, chưa có) → hình nàng ở mọi nơi mặc TRUNG Y theo nhóm phẩm.
NPC: cùng luật nhưng chỉ dữ liệu + tin đồn (không vẽ).

## Bước 1 — đếm + mẫu (XONG, chờ điều phối duyệt)
Nàng chọn được mặt từ bể 84 (j88: 32 consort c01–c32 + 52 maid m01–m52; sổ cũ không S.pid dùng 4 look cũ fig-player-look1..4).
Mỗi mặt có 4 tuổi (a18/a26/a36/a51), tranh gốc là 1 sheet 4 tuổi/1 creation Magnific (manifest: magnificUrl, sheet).
- Nhóm: G1 Đáp ứng–Thường tại (lụa trắng trơn) · G2 Quý nhân–Tần (lụa ngà, viền thêu chìm) · G3 Phi–Hoàng quý phi (lụa trắng ánh trăng/ngà hồng, viền chỉ bạc) · G4 Hoàng hậu (lụa vàng nhạt, viền mây phượng cùng màu).
- Cách ít tranh nhất mà giữ đúng mặt: gpt-2-6 SỬA sheet t1 gốc (giữ mặt/tuổi/dáng/vị trí, chỉ thay áo + tóc búi thấp xõa 1 trâm) → 1 lần sửa = 4 hình (4 tuổi).
  Chân dung por-* cắt từ fig bằng porcrop.py (không tốn vẽ).
- Số: 88 mặt × 4 nhóm = 352 lần sửa → 1408 fig + 1408 por. (Bỏ 4 look cũ: 336 lần → 1344 fig; sổ cũ không S.pid rơi về áo thường.)
- Tín dụng (simulate_cost): sửa gpt-2-6 4k 2:1 = 80/lần; tách nền 3/lần → 352×83 = 29 216; +10% vẽ lại ≈ 32 000. Số dư 1 575 664.
- Phương án khác: 8 bậc riêng = 704 lần ≈ 64 000 · 2 nhóm (trắng / vàng HH) = 176 lần ≈ 16 000.
- Ngoài phạm vi (đề xuất): lãnh cung giữ tranh cold (vốn áo trơn); nàng là cung nữ (cnv) giữ đồ cung nữ — nếu muốn: +84 lần (trung y không hoa điền) ≈ 7 000.
- Mẫu (c01, sửa từ sheet t1 mE3yQeWhJQ): trắng https://www.magnific.com/app/creation/cplSEDf0eP · Hoàng hậu https://www.magnific.com/app/creation/cplSEeE0eP
  Tờ so: dev/art/trung-y/trungy-mau.jpg (gốc / G1 / G4 + cận mặt 19 và 48 tuổi). Prompt: dev/art/trung-y/PROMPTS.md.

## Bước 2 — kế hoạch (CHỜ DUYỆT, chưa làm)
- Tệp: img/fig-<role>-<id>-ty<1..4>-<age>.webp + por-…; manifest MỚI img/FIGURES-ty.json (không đụng FIGURES*.json lớn); j39 FIGF thêm.
- Chọn tranh: bọc figFor(S) — wdOf(S).y trống (và không lãnh cung/không cung nữ) → bản ty của mặt đó theo nhóm phẩm; thiếu tranh → tranh thường (không vỡ).
- Chú ý luật cũ: jearn.js §1 hiện tự phát áo Nội vụ phủ khi bị thu ("Nobody is left without clothes") và wdOffUI chặn cởi áo — phải đổi:
  bị thu/cướp → ô trống thật đến khi nàng mặc bộ khác từ Tư trang (Nội vụ phủ cấp lại sau N tuần, số trong BAL).
- Luật (BAL một nguồn): ra khỏi cung mình / gặp người khi mặc trung y → mất Danh (đông người nặng hơn; trước Hoàng thượng/Thái hậu = tai tiếng), thiếu lễ;
  sự kiện cướp/giật y phục khi đi đường (đi đêm, nơi vắng, kẻ thù sai người; điềm báo; báo bằng thẻ) → mặc trung y về cung; mặc lại áo thì hết. NPC cùng luật (dữ liệu, tin đồn).
