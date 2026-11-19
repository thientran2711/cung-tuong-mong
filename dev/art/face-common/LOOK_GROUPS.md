# Nhóm mặt (LOOK GROUPS) — owner Lượt 299 (19/11)

Luật chia: người thứ n → nhóm LOOKS[(n-1)%6]. Thiếu nữ m01–m52 = ĐÃ VẼ theo nhóm này (dòng Expression trong face-common/mNN.v3.txt). Dấu * = ĐỀ XUẤT, chưa vẽ theo nhóm (32 phi tần đang trong game c01–c32; 3 công chúa).
Dùng cho game: skin (trang phục) gom theo nhóm mặt — chọn nhân vật thuộc nhóm nào thì mọi bộ trang phục của người cùng nhóm thành skin của nhân vật đó (mặt đổi theo bộ đồ cũng được).

## Tươi tắn (16 người)
m01, m07, m13, m19, m25, m31, m37, m43, m49, c01*, c07*, c13*, c19*, c25*, c31*, nc1 Ba Tư*

## Dịu dàng (15 người)
m02, m08, m14, m20, m26, m32, m38, m44, m50, c02*, c08*, c14*, c20*, c26*, c32*

## Trong trẻo (15 người) → GỘP vào Tươi tắn (owner Lượt 684)
m03, m09, m15, m21, m27, m33, m39, m45, m51, c03*, c09*, c15*, c21*, c27*, nc2 Cao Ly*

## Đoan trang (14 người)
m04, m10, m16, m22, m28, m34, m40, m46, m52, c04*, c10*, c16*, c22*, c28*

## Sắc sảo (14 người)
m05, m11, m17, m23, m29, m35, m41, m47, c05*, c11*, c17*, c23*, c29*, nc3 Phù Tang*

## Tinh nghịch (13 người)
m06, m12, m18, m24, m30, m36, m42, m48, c06*, c12*, c18*, c24*, c30*

## Kiêu kỳ (MỚI — owner Lượt 643, giữ) — 0 người
Chưa có người. Câu mặt: TYPES_v4.md / make_nf3.py TYPES_B["Kiêu kỳ"] (mẫu s01, cằm ngẩng vừa phải, Lượt 640).

## Lạnh lùng (MỚI — owner Lượt 643, giữ) — 0 người
Chưa có người. Câu mặt: TYPES_v4.md / make_nf3.py TYPES["Lạnh lùng"] (mẫu s02).

## Quyến rũ (MỚI — owner Lượt 647/657, dùng) — 0 người
Chưa có người. Câu mặt: TYPES_v4.md / make_nf3.py TYPES_C["Quyến rũ"] (mẫu s03 v4c: bỏ ửng hồng mí, môi "soft rose tint", Lượt 648).

## Trạng thái kiểu mặt (owner Lượt 657)
- DÙNG (nhóm mới): Kiêu kỳ, Lạnh lùng, Quyến rũ.
- KHÔNG DÙNG: Anh khí (s04), Thư hương (s05), Yêu kiều (s06 — Thư hương và Yêu kiều quá giống nhau). Câu mặt + ảnh mẫu giữ làm lịch sử (TYPES_v4.md, make_nf3.py), không vẽ thêm.
- Lượt 680 gộp Trong trẻo vào Dịu dàng → HUỶ ở Lượt 682: tách lại như cũ.
- GỘP (owner Lượt 684): Trong trẻo GỘP VÀO Tươi tắn — một nhóm, tên "Tươi tắn". Dịu dàng giữ riêng.
- CHƯA QUYẾT: nhóm cũ Tươi tắn (đã gộp Trong trẻo), Dịu dàng, Đoan trang (không đánh "BỎ").
- GIỮ: Sắc sảo, Tinh nghịch.


## Chia lại nhóm (owner Lượt 673–680)
Chủ tự chia lại m01–m52 + c01–c32 trên trang tick https://claude.ai/artifact/MYJSqYG4dyLpfo4VA9KnK3 (db picks/<id>.group). Kết quả trang đó THAY cho chia theo (n-1)%6.

## KẾT QUẢ CHỦ CHIA LẠI (owner Lượt 686, trang tick MYJSqYG4dyLpfo4VA9KnK3; người không bấm = giữ nhóm đang gán; Trong trẻo đã gộp vào Tươi tắn) — THAY mọi danh sách trên
File máy đọc: dev/art/face-common/OWNER_GROUPS_L686.json
- Tươi tắn (29): m01 m03 m05 m06 m07 m11 m13 m15 m17 m21 m27 m31 m33 m35 m37 m38 m39 m41 m45 m47 m49 m51 c01 c07 c13 c15 c19 c21 c31
- Dịu dàng (17): m02 m08 m14 m18 m19 m20 m23 m26 m32 m44 m50 c02 c08 c14 c20 c26 c32
- Đoan trang (17): m04 m10 m16 m22 m28 m29 m34 m36 m40 m43 m46 m52 c04 c10 c16 c22 c28
- Sắc sảo (7): m09 c05 c11 c17 c23 c27 c29  ← chủ: quá ít, mặt chưa đủ sắc; cần câu tả mạnh hơn. c27 = NGƯỜI MỚI Sắc sảo (owner Lượt 686, NF4: c27.v4)
- Tinh nghịch (14): m12 m24 m25 m30 m42 m48 c03 c06 c09 c12 c18 c24 c25 c30
- Kiêu kỳ / Lạnh lùng / Quyến rũ: 0 người
- c27: bị lé → làm NGƯỜI MỚI hoàn toàn (mặt mới). c06 c14 c19 c31: hở răng → vẽ lại môi khép.

## NF4 (owner Lượt 686) — kiểu mặt v5 + c27 mới
- Câu mặt + biểu cảm MẠNH HƠN cho 8 nhóm: TYPES_v5.md (nguồn: make_nf4.py TYPES5). Sắc sảo mẫu: c27.v4, s07.v5, s08.v5, s09.v5.
- c27 chuyển Tươi tắn → Sắc sảo (người mới, mặt mới; màu/đồ/vật theo hạng giữ nguyên).
- Hở răng c06 c14 c19 c31: vẽ lại bằng câu miệng khép mạnh hơn (cNN.v3t). Sheet: dev/handover/review-sheets/new-faces-v4/nf4_teeth_c27_sacsao.jpg
## Lượt 689 (chủ, qua ROOT-54) — CHỈ 4 NHÓM CHO NGƯỜI MỚI
- Sản xuất người MỚI chỉ thuộc 4 nhóm: Sắc sảo, Kiêu kỳ, Lạnh lùng, Quyến rũ. KHÔNG vẽ thêm người mới cho Tươi tắn / Dịu dàng / Đoan trang / Tinh nghịch.
- Viết lại prompt 4 nhóm này (tả mặt + tính cách thật mạnh), gửi chủ mẫu 3 người mỗi nhóm (12 người) → NF4.
- Vẫn giữ: sửa răng c06 c14 c19 c31 (môi khép), c27 người mới.

## Lượt 695 (chủ) — sau khi sửa răng + duyệt Sắc sảo
- c06 → Tươi tắn (từ Tinh nghịch). c14 → Đoan trang (từ Dịu dàng). c19, c31 → Tươi tắn (giữ).
- Sắc sảo DUYỆT: c27 (người mới), s07, s08, s09 (người mới). Đã ghi vào OWNER_GROUPS_L686.json.
