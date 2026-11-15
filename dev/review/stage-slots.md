# Kiểm duyệt kit: review/stage-slots @ 8034f407 (KIT 33.7 khuôn ô sân khấu, j59 + j38) — PASS sau sửa

Ngày 2026-11-15, người duyệt 3. Gộp lên main 6e6c2ae6d (cdn-images, naming, place-card, sub-odds, act-audit…); xung đột chỉ index.html / sw.js (dựng lại
bằng dev/site/build_site.sh; assets.json lấy mục lục ảnh từ CDN). Nhánh gộp: review/stage-slots-merged.

## Đạt (đo bằng máy, dev/test/stage-slots.js 5 ca × 5 khổ: 755x1000@2, 1000x755@2, 1180x820@2, 1366x1024@2, 844x390@3)
- Nàng hiện đúng một lần (ô 1 trang 1); mọi người khác đều được thấy qua các trang; "+N" (N = người chưa hiện) và "‹".
- Một nguồn đếm: tiêu đề "Ở đây còn N người." = chip trang = Dư đồ (countAt) = kitHereCount ở mọi ca; stage-counts.js (128 lượt đường
  phi tần, 47 lượt đường cung nữ, 12 lần xáo chỗ) — 0 lệch, 0 lỗi.
- Thẳng hàng: tâm thân người − tâm ô ≤ 0,1 px; tâm chip tên − tâm ô ≤ 0,1 px; chân cùng một đường (lệch ≤ 0,1 px trong trang VÀ giữa các trang
  sau sửa 1); đỉnh chip tên lệch ≤ 0,1 px; chip tên không chồng nhau, chip trang không che tên.
- Không còn ảnh nhỏ trên sân khấu: người không có tranh = hình bóng cỡ thật (Thị vệ "Mạc Thừa Vũ" trong Kính sự phòng); người lạ = bóng xám
  "Người lạ"; nam ×1,07.
- Chức vụ có tên riêng (Tổng quản Kính sự phòng / tên cổ trang ở dòng 2; ổn định trong kiếp, lưu theo sổ).
- Sổ cũ (main) nạp ở cả 5 khổ; kit 14 tab ở 5 khổ: 0 lỗi trang, 0 tràn ngang, 1 #panel, 0 ảnh vỡ. coop-e2e (Worker thật) 59/59 trên bản gộp d69030384 (máy tải ~50: phải nới hạn chờ mở trang 30 → 120 s trong bản chạy tạm, không đổi tệp thử).

## Người duyệt đã sửa
1. **Đường chân nhảy giữa các trang** (844x390, trang 3 của 5 người: chân thấp hơn 19 px, người to hơn 15 %, chip "‹" thò ra ngoài sân khấu):
   j59lay đo chiều cao chip tên chỉ của trang đang hiện (chip ẩn = 0 px) → dải sàn đổi theo trang. Sửa: đo MỌI chip (mọi trang) trước khi tính.
2. **Cột chip phải (chip triều + cung nữ + khối Ân sủng của sub-odds) che mặt/tên người ở ô phải** (1180x820: người thứ ba đứng dưới cột, đầu
   khuất). Điều phối 11/15: khuôn ô phải chừa cột. Sửa: khi cột chạm tới đầu người, ô dừng ở mép trái cột + 6 px; chip "+N" đứng trong vùng
   chừa dưới cột (không thêm rãnh phải). KIT 33.7 mục 1 ghi lại. Kết quả: 1000x755 và 1366x1024 vẫn 3 ô cả khi sang trang; 1180x820 3 ô khi
   mọi người vừa một trang, 2 ô mỗi trang khi phải sang trang (cột Ân sủng chiếm ~1/4 sân khấu); 755 giữ 2 ô.
3. **Dư đồ đếm nhầm cung của nàng** (stage-counts sau khi gộp main d6903038: "home 2→1"): countAt('home') cộng cả người có S.where = home
   nhưng sân khấu cung nàng chỉ có homePeople() (cung nữ + con). Sửa: countAt('home') = homePeople() đếm như sân khấu.
4. Chú giải Dư đồ "không tính ngươi" → "không tính ta" (sếp 05:05Z: giao diện gọi nàng là "ta").

## Đáng lo (không chặn)
- 844x390 (sân khấu chật `.j59c`) vẫn để người đứng dưới cột chip phải như luật cũ (tên người ô phải bị cột che một phần): thử chừa cột ở
  khổ này làm người còn .56 và tên xuống dòng, nên để lô game-feel (bố cục iPad thu nhỏ cho điện thoại ngang).
- Nhãn "Hoàng hậu <tên>" vẫn một dòng (tước + tên chung một dòng) — có từ trước trên main, không do lô này.
- Thẻ chip triều còn ghi "với ngươi"/"quý ta" tùy bản — theo main.
Ảnh: dev/shots/review/stage-slots/ (sau-*.jpg trên bản gộp; truoc-sua-844x390-n5-p3.jpg = lỗi 1 trước khi sửa); ảnh trước (main) của thợ ở
dev/shots/stage-slots/before-*.
