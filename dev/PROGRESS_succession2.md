# PROGRESS review/succession2 (thợ KẾ VỊ)
Task: owner 11/14 22:00Z — succession choice (Hoàng thái hậu / Nhiếp chính / Nữ đế) + epilogue + endings. Design: dev/SUCCESSION_PLAN.md.
Module: dev/build/j99succ.js (before j84 in assemble.py). Debug: succDebug("a"|"b"|"c"|"", prepOnly) in console.
Test: node dev/test/succession.js <url> 686x880@2.2 <outdir>  (serve repo root over http with a <meta charset=utf-8> wrapper of dev/index.html).
## Done
- plan; module: choice card (PEND succ0, Cần/Tốn/Được/Mất/Kèm + odds, disabled with reasons), 3-chapter epilogue per path (PEND succC,
  event choices = costs only), 12 endings incl. 3 rare (glow .ksel), PD_END values, Sổ luân hồi line (ctm-succ-book) + RARE97 hook,
  NPC dowager regency (two-way), world frozen during epilogue, save/reload mid-epilogue verified, old save loads.
- Logic checks: rare a/b/c, c failure (ban chết), b failure → path a, NPC regency text.
## Open
- Test 686x880@2.2 + 1180x820@2: 0 errors, no overflow, no %, no "Chắc chắn", no "…"; reload mid-epilogue OK; old save OK. Shots dev/review/succession2/.
- Art (SUCCESSION_PLAN §7) awaits coordinator approval; SUCC_ART empty.
- End card label "Chết vì" (j79/j52 end card, not this module) reads oddly for living endings — kit owner.
## Status: SẴN SÀNG KIỂM
- (20:30Z) Pilot art: img/ev-tien-de-bang-ha.webp (gpt-2-6 edit of duong-tam-dien-thu-chieu, Magnific creation 'Tiên đế băng hà' + creative upscale 2x); high-res dev/review/succession2/ev-tien-de-bang-ha-2688.jpg. Wired as m.sceneArt → wide band via kitSceneArt (drawn only once the kit piece from review/identity-card is on the branch).
- (21:10Z) Owner 00:25Z: event art too saturated → REDONE muted (gpt-2-6 edit of the old picture with origin-wide-td + origin-wide-nc as style refs, 2 candidates, picked the one with a clear jade seal; ultra-sublime 2x upscale). Avg HSV saturation 156 → 78 (origin pictures 64–97). img/ev-tien-de-bang-ha.webp 1920x1074 + dev/review/succession2/ev-tien-de-bang-ha-2688.jpg. Rule added to dev/art/EVENT_ART.md (Bảng màu).
- (21:30Z) Owner: bản tông dịu mất vàng (như gỗ nâu); rồi đổi hướng: tranh sự kiện theo lối Mệnh truyện st-*. VẼ MỚI gpt-2-6 (tham chiếu st-dtq-bien-ket-win + st-dtq-bien-c3, lời theo st_prompt.py), 2 bản, chọn bản ngọc tỷ rõ trên án phủ trắng (Magnific 'Images 1 and 2 are STYLE references only'), phóng 2x ultra-photo (trung thực). Điện thiết triều chiều tà: ngai rồng vàng trống, bình phong rồng vàng, cột son rồng vàng, phướn tang trắng, bá quan quỳ (nhìn sau), phi tần áo tang trắng đứng quay lưng. img/ev-tien-de-bang-ha.webp 1920x1074, dev/review/succession2/ev-tien-de-bang-ha-2688.jpg (2688x1504), so sánh cũ|dịu|mới: dev/review/succession2/ev-tien-de-bang-ha-compare.jpg. EVENT_ART.md: luật Phong cách & bảng màu = theo st-*. (Hai bản sửa 'vàng dịu' trước đó bỏ, không dùng.)
- (21:40Z) Chủ game duyệt bản st-* nhưng muốn: bá quan quỳ một bên (TRÁI), phi tần hậu cung quỳ bên kia (PHẢI) — áo tang trắng, quay lưng, không lộ mặt, kiểu tóc khác nhau thanh nhã, chỉ dải lụa trắng/trâm trắng-bạc. Sửa gpt-2-6 từ bản cũ (Magnific tCi61MDmZJ, tham chiếu kiểu st-dtq-bien-ket-win), lượt 2 làm tóc đa dạng hơn (5jVTiCyKxe), phóng 2x ultra-photo (LwBXn2mswO). Giữ nguyên phần còn lại. img/ev-tien-de-bang-ha.webp 1920x1074 + dev/review/succession2/ev-tien-de-bang-ha-2688.jpg.
