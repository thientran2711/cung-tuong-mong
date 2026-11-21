# FACEPAGE1 — 2 trang tick mặt (owner L1919: mặt cung nữ quá baby)
0 gen. Nguồn: dev/art/face-pages/ (build.py, template.html, crop_kho.py, faces/, 2 html).
- TRANG 1 "Danh sách mặt cung nữ": https://claude.ai/artifact/4jD7WE84Dgb8MSyvhn5sKF — 6 mặt m09 Sắc sảo, m10 Đoan trang, m11 Công chúa Tươi tắn, m12 Công chúa Tinh nghịch, m13 Tươi tắn (đang trong kho), m18 Dịu dàng. Tick ✗ = LOẠI BỎ.
- TRANG 2 "Mặt dự phòng": https://claude.ai/artifact/7dv7xgmv261DvwFyZ9PjDv — 32 mặt KHO (KHO_L697.md; nhóm gốc ghi trên thẻ): m13 m15 m17 m21 m23 m26 m27 m31–m52 (trừ…) + c17 c23 c29. Tick ✓ = CHỌN.
- Đọc tick: ArtifactData list collection `picks` của từng trang; doc id = mã người; field on:true = đã tick; action = remove (trang 1) / choose (trang 2).
- Nhóm lấy từ OWNER_GROUPS_L686 + KHO_L697 (nhóm gốc); m13 hiện ghi "Kho" nên dùng nhóm LOOK_GROUPS (Tươi tắn). Ảnh = crop từ cut id (FACE_MAP/FACE_CUTS_L703), base64 trong trang.
- Kiểm tra: Playwright 390px sáng/tối, không tràn ngang. db chưa thử ghi từ trình duyệt thật (chưa ai tick).
Page 1 refs maid: m09 gOm4HrsSXO, m10 O6ERgEUynm, m11 Syh9qs6Ub8, m12 xSB7FTWjfW, m13 VX7IB7sMMU, m18 s7IPw0Ll8e.

## L1938 update
Bỏ mọi mặt nhóm Sắc sảo (trang 1: m09; trang 2: c17 c23 c29); Kiêu kỳ/Lạnh lùng không có sẵn. Thêm tab lọc theo nhóm. Republish cùng URL (v2), tick cũ giữ nguyên (doc id không đổi). Trang 1 còn 5 mặt, trang 2 còn 29.

## L1971 update
Trang 1 republish v3 cùng URL: đủ m01–m52 trừ nhóm ẩn = 51 mặt (m09 Sắc sảo ẩn; Kiêu kỳ 0, Lạnh lùng 0), tab lọc theo nhóm, 5 mặt đang dùng (m10 m11 m12 m13 m18) có nhãn «đang dùng», mặt trong kho ghi «· trong kho».

L1925: m11 đổi nhãn «đang dùng» → «đã bỏ» (v4).

## JOB L2013 — bảng màu hoa (0 gen, không sửa prompt, chờ owner duyệt)
- dev/art/face-common/flower_colours_L2013.json: 90 người × 4 mùa (palettes_season_L1726) → tone soft/medium/vivid (114/167/79 trên 360 bộ), hoa thêu hex+tên VN, hoa tóc hex+tên VN, hair_by_tier t1..t6. Script make_flower_colours_L2013.py (OKLCH: độ rực hoa bị chặn theo tone, không trùng áo chính dE>=14, không vàng/xanh lá, màu phụ của áo làm gốc hue nếu hợp).
- Trang màu (private): https://claude.ai/artifact/9CPDiiiEqgAwaq2tZESbjx (nguồn dev/art/face-pages/flower_swatches.html, build_flowers.py) — lọc theo nhóm mặt + độ rực, 390px OK.
- Rule nháp: dev/art/face-common/flower_rule_draft_L2013.md (F20, chưa add).
- Giới hạn: thuật toán, chưa có mắt chủ nhân; chưa xét từng cấp ngoài ramp t1–t6; t7/t8 chỉ thêu (F2) dùng cột hoa thêu. Chưa so với s62 REVERT1 từng cấp (s62 thu cùng họ hồng nhạt).
