# Bàn giao phiên chính 15/11 (10:30Z) — đọc file này TRƯỚC, rồi TAKEOVER_PROMPT.md, HANDOVER.md, OWNER_DECISIONS.md (mới nhất ở cuối), KIT.md, VANPHONG.md

Gọi chủ là "sếp", xưng "em", tiếng Việt, ngắn. Báo cáo kèm "% xong / % chơi được" (~95% / ~88%).
Mọi quyết định của sếp ghi ngay vào dev/OWNER_DECISIONS.md trên nhánh claude/cung-tuong-mong-handover-hj0h8w, commit+push.
Brief chung cho thợ: dev/handover/WORKER_BRIEF.md (copy của scratchpad/brief.txt — dùng nó khi giao việc).

## Việc đang dở NGAY LÚC BÀN GIAO
1. **Gộp main = lên live đợt 1 (giao diện sách + chơi 2 người):** origin/review/coop @ 77913f83 đã PASS kiểm duyệt (dev/review/coop-release.md).
   Bản gộp thử đã làm trong worktree scratchpad (chưa push). Làm lại: worktree từ origin/main, `git merge --no-ff origin/review/coop`,
   `bash dev/site/build_site.sh` (BẮT BUỘC, nếu không live không có "Chơi cùng bạn"), kiểm `grep -c "Chơi cùng bạn" index.html` > 0,
   chơi thử Fold 686x880@2.2 + iPad 1180x820@2 (coord_smoke: Fold đã đạt 0 lỗi, iPad chưa xong), commit, `git push origin HEAD:main`.
   Báo sếp đã lên live + gửi lại hướng dẫn mời bạn (dev/coop/HUONGDAN.md; sửa câu "chọn ở nhà làm tiểu thư" — tuyến tiểu thư CHƯA gộp).
2. **Đợt 2 (ngay sau):** origin/review/book-release @ 4bbed569 (+ fold-layout 7fbc5b08 đã gộp vào): iPad 3 người / Fold 2 (nàng tính vào),
   KIT_FIG.maxPx 542 (1366 người .61 — có khoảng trống trên, theo dõi sếp có chê không), hộp thoại chỉ cuộn phần lựa chọn (KIT 32.5),
   người đứng trên tranh trong hộp thoại (KIT 32.6), nàng hiện ở mọi nơi, sửa trùng #panel khi lật. Cần kiểm duyệt rồi gộp main (trên đợt 1).
3. **Lật trang kiểu nguyên tờ** (sếp vừa chê: nội dung phải dính theo tờ, xoay quanh gáy, như ảnh dev/owner-shots/1115-turn-ref-1/2.jpg):
   thợ page-curl đang làm trên review/page-curl (f40f8d45 là bản cũ). Phải pull book-release (jbook prep() bỏ id).

## Thợ đang chạy trong phiên cũ (sẽ báo về phiên cũ, KHÔNG báo được sang phiên mới)
Phiên mới: kiểm nhánh trên origin, nếu thợ chưa xong thì giao thợ mới tiếp từ nhánh + file PROGRESS.
- review/page-curl — lật trang nguyên tờ (xem mục 3).
- review/routes @978ff81f — nhánh truyện: tư tình, trốn cung, rời cung đúng phép, sống ẩn; trích huyết nghiệm thân + hoạt cảnh/mini game. dev/STORY_ROUTES_PLAN.md.
- review/scheme-games — 3 mini game trừu tượng (Nghe ngóng, Truyền lời, Mặc cả) + "Thời cơ" (hại nặng, hoàn toàn trừu tượng). Lần đầu bị bộ lọc an toàn dừng vì trò liều thuốc độc → TUYỆT ĐỐI không làm chi tiết độc/cách hại.
- review/men @714e4e56 XONG (nam nhân theo kế hoạch, không hên xui; 4 thị vệ thive-1..4; thẻ đủ được mất). Chờ kiểm duyệt. Khi gộp: bỏ bản kitFigBody trong jk4 của men (dùng bản jkit).
- review/inventory-origin @c92da910 XONG (Tư trang ô vuông, ô trang bị 6 ô, Xa xỉ N số, không hiện mức cho phép, "Ngự", Luân hồi thẻ úp). Chờ kiểm duyệt.
- review/palace-map @9717707e XONG (Dư đồ → sân cung Phượng Lệnh bậc nhất theo phẩm chủ vị → phòng; dãy nhà cung nhân). Chờ kiểm duyệt.
- review/residence-art @2c39d1ca XONG (25 phòng × 16 tranh, jres.js). Đã gộp vào palace-map.
- Còn chờ gộp: lost-items 77679b52, emotion 527e534a (biểu tượng nữ cổ trang đã duyệt; gắn vào giao diện sách), difficulty 5a664492 (Khó 20% HH),
  outside 0062c04d (tuyến tiểu thư; chưa đo HH; áo khuê các chưa vẽ), loading 6e0888dc (màn tải), appearance e67def05 (ốm/độc/tát/mẩn; đã bỏ biểu cảm code),
  balance dcb23148, schedules2 3e55eb5, kit-j95 33e5016, consort-art (ĐÃ lên main).
- Robot đào sâu trungsinhgame (dev/research/TRUNGSINH_COMPARE.md "Đào sâu") — có thể chưa xong.

## Câu hỏi sếp CHƯA trả lời
- Phi tần khác đi lại theo lịch/tính nết thay vì xếp ngẫu nhiên (placeWhere j9)?
- Thêm ô Tai mắt lên thanh trên cùng?
- Vẽ hoa tai / giày hoa (4–6 hình)? Áo thị vệ 4 đổi xanh chàm (~40 credit)? Vẽ lại da c02-t1-a18 (xám)?

## Luật sếp mới trong ngày (đủ trong OWNER_DECISIONS)
Một kit chung, ảnh gửi sếp phải trên giao diện đã duyệt; tỷ lệ người chuẩn = ảnh dev/shots/curl2/ipad1180-tab-45-ref-ratio.jpg (.79, nam ×1.07);
thẻ lựa chọn luôn đủ Cần/Tốn/Được/Mất + cơ may; không chữ Hán, không viết tắt; không hên xui vô cớ (mọi chuyện có nguyên nhân thật);
không vẽ lại thứ sếp không bảo; đừng bắt bẻ thứ sếp không chê (dáng váy ok); lấy tranh Phượng Lệnh (repo thientran2711/phuong-lenh-art) thay vì vẽ mới khi có.

## Hạ tầng
Co-op worker: https://ctm-coop.victoria-tntt.workers.dev (Cloudflare acct trong dev/coop/CLOUDFLARE.md). Magnific folder ba4aecfe-efce-47e2-b53f-30d292091886, model gpt-2-6.
Máy chậm (nhiều thợ) — Playwright ít lượt, reducedMotion. Đĩa ~7 GB: dọn worktree thợ xong bằng `git worktree remove --force --force`.
