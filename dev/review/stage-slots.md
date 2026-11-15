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

## Vòng r6 (người duyệt R6, 2026-11-15) — nhánh review/stage-slots-r6
- 8b4b51679 (stage-slots-merged) là con của main 70c792d41, nhưng main đã sang 114887bc1 rồi d50f5f772 → gộp lại hai lần (xung đột chỉ
  index.html/sw.js/assets.json, dựng lại bằng dev/site/build_site.sh; main không đụng phần khuôn ô của j59/jk3).
- Thử trên bản gộp cuối: stage-slots.js 1180x820@2 + 755x1000@2 — 5 ca đạt, 0 lỗi trang, sổ cũ (main d50f5f772) nạp "ok month 4";
  coop-e2e 59/59 (bản chạy tạm dev/test/_coop-tmp.js chỉ nới hạn chờ 30 → 120 s vì máy tải ~60; tệp thử không đổi).
- Sửa của người duyệt (lệnh điều phối, lỗi sếp 17:40Z, ảnh mẫu an-sung-ok.jpg): chip "Ân sủng ›" (khi cột phải chật) trên main mở
  kpPop `.kascard` NỔI, rộng 300 px, tràn khỏi cột/sân khấu (ảnh r6-ansung-main-1180x820-popover.jpg) — lỗi có sẵn trên main (jk3,
  đưa vào cùng act-audit/sub-odds), không do stage-slots. Nay: chạm → thẻ Ân sủng đầy đủ mở TẠI CHỖ trong cột phải, cùng bề rộng thẻ
  người, nhãn trái / giá trị phải; tiêu đề "Ân sủng ‹" thu lại; cột cuộn trong sân khấu khi mở; tự thu khi đổi nơi/buổi/tháng. KIT §33 ghi.
  Đo bằng dev/test/ansung-inplace.js (ép cột chật bằng thẻ cao) ở 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: không popover,
  bề rộng thẻ Ân sủng = bề rộng thẻ người (147/119/135/138/119 px), giá trị sát mép phải 0 px, 0 chữ bị cắt, cột trong sân khấu,
  0 tràn ngang, thu lại được. Ảnh r6-ansung-fix-*.jpg (thẻ người cao bất thường là do ép chật trong bài thử).
- Gộp tiếp main ee5758195 (jimg, jclose) rồi f500d0464 (tabs-kit r7; jk3 đổi kitActKey→kitActSortKey, không đụng Ân sủng) — chạy lại trên
  5edc1c938: stage-slots 1180/755 đạt, sổ cũ ok, Ân sủng tại chỗ 5/5 khổ, coop-e2e 59/59.
