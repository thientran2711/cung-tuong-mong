# Kiểm duyệt kit: review/book-release @ 013829d0 — FAIL (một điểm chặn)

Ngày 2026-11-15 ~00:25Z. Bắt đầu kiểm ở 19c8d06f, rồi chuyển sang đầu mới 013829d0 (= 19c8d06f + page-curl 93e44af2; chỉ đổi jbook.js/j87.js,
nên kết quả bố cục và hình người của 19c8d06f vẫn đúng). Gộp thử vào origin/main không có xung đột (`git merge-tree`). `dev/site/build_site.sh` ra
index.html y hệt bản đã commit (chỉ sw.js đổi số phiên bản).
Chơi thật bằng Playwright (reducedMotion, trừ phần kiểm lật trang) ở 686x880@2.2, 1180x820@2, 1366x1024@2: đường phi tần (8 tab), đường cung nữ ở 1180 (5 tab),
thẻ người Hậu cung, Dư đồ, nơi chốn có 2–3 người (Ngự hoa viên, cung phi tần; khách là người lạ và người đã biết),
lật tab có chuyển động ở 1180 và 686 (`dev/test/curl-live.js`), save cũ dựng từ index.html của origin/main (ô 2) nạp được ở cả 3 cỡ.
Kết quả: 0 lỗi trang, 0 tràn ngang, 0 chữ bị cắt hay có dấu ba chấm ở mọi màn đã chơi. Ảnh ở dev/shots/review/book-release/.

## ĐIỂM CHẶN
1. **iPad, nơi chốn: chỉ 1 người trọn vẹn trên sân khấu.** Chủ muốn ít nhất 2 người đứng cạnh nhau theo tỉ lệ đã duyệt (ảnh ipad1180-tab-45 có 2 người).
   - 1180, Ngự hoa viên, 2 khách là người lạ (bóng `unknown-fig-f`): 1 bóng ở .792, bóng thứ hai bị đẩy ra sau "› 1" → `c1180-pl-vuon-2.jpg`.
     Ở 1366 cũng vậy → `c1366-pl-vuon-2.jpg`. Cùng kết quả ở cung phi tần (r2/r3).
   - 1180 và 1366, 3 người đã biết: chỉ 1 người (Hoàng hậu) + "› 2" → `k1180-pl-vuon-3.jpg`. Cũng 2 người đó lúc không có dải thì vẫn đứng vừa
     (x 11 và 275 trên sân khấu rộng 596). Như vậy khi phải dùng dải, ô mỗi người bị tính quá rộng (theo người rộng nhất, áo choàng hay bóng người lạ,
     cộng phần cột bảng bên phải), nên chỉ còn 1 ô.
   - Cách sửa (để người làm quyết định): ô trong dải tính theo bề rộng thân thật nhìn thấy, không theo khung ảnh trong suốt hay bóng áo rộng;
     người được đứng lấn dưới cột bảng phải (KIT §33 luật 2) cả trong chế độ dải; trên iPad (sân khấu ≥ ~560 px) dải phải có ít nhất 2 ô.
     Kiểm lại ở 1180 và 1366 với 2 người lạ, 3 người đã biết và 2 người có 1 nam.

## Đạt (kiểm theo luật chủ 11/14–11/15)
- Một kit: thanh trên dùng ô kitStatCell, nhãn và số thẳng hàng. Không có nút "Bảng phẩm vị" (đếm nút: 0 ở mọi tab).
- Hành sự: có tab nhóm (Tất cả / Tranh sủng / Lễ nghi …); các thẻ việc hiện trọn, không bị cắt. Hàng tab nhóm cuộn ngang được, ở 1180 chip cuối "Học tập…"
  hiện một phần ở mép phải — đây là cuộn ngang, không coi là chặn.
- Hàng tab dưới cùng: 8 tab + Qua buổi lấp đầy hàng, ở 686 chia 2 hàng, không bị cắt.
- Dải chọn ở Hậu cung: tên cung ghi trên đầu cột, người đang chọn có viền vàng sáng; thẻ người trên iPad đúng bố cục đã duyệt (ảnh bên trái, cột hành động
  bên phải, các chip Ghen/Oán… nằm dưới ảnh).
- Sách: iPad mở hai trang (trang trái là phòng có người, trang phải là bảng); điện thoại chỉ một trang (Fold 686 có nút "‹ Phòng").
  Lật tab là lật chéo từ góc, mặt sau thấy chữ ngược mờ, trang sau hiện ngay dưới góc lật: 25/45/65 %, lật lùi và đi vòng các tab đều 0 lỗi;
  tắt hiệu ứng thì không lật (rm=0).
- Dư đồ: bản đồ da trải kín khung, không còn dải thông tin (strip display none). Chỗ khóa (Dưỡng Hòa điện, Cần Chính điện) dùng nhãn thường + dấu khóa,
  không có hộp xám.
- Thước người: nữ .790 chiều cao sân khấu ở mọi tab và cả 3 cỡ; nam (thái giám, đường cung nữ 1180) .845 ≈ ×1.07. Có 2 người thì không thu nhỏ.
  Nhãn tên hai dòng (phẩm/vai ở trên, tên ở dưới), tô màu theo phẩm.
- Mỗi sân khấu chỉ có một nền.
- Save cũ của origin/main (dựng bằng save()) nạp được ở 686, 1180 và 1366 qua deser; chuyển rv/go/act không lỗi, không tràn.

## Không chặn (ghi lại)
- Đầu mới 013829d0: lúc lật khoảng 45 %, góc trang nhấc cao che phần trên phải của thanh trên (Bạc/Sức ở 1180, Tâm cơ/Bạc ở 686) chừng ~0,3 giây.
  Chuyển động ngắn nên chấp nhận được, nhưng nên giới hạn tờ lật trong vùng sách (dưới thanh trên) → `i1180-tab-45.jpg`, `f686-tab-45.jpg`.
- Commit 93e44af2 / 013829d0 ghi đè dev/shots/curl2/ipad1180-tab-45.jpg, chính là ảnh chủ dùng để duyệt tỉ lệ hình người (KIT §33 trỏ tới ảnh này).
  Nên khôi phục bản a51a155f dưới tên riêng (vd. dev/owner-shots/approved-fig-ratio-1180.jpg) và trỏ KIT §33 sang đó.
- Ở Fold, nhãn Dư đồ góc trên phải chồng nhau (Trường Xuân/Hàm An/Trường Môn viện) — đã biết, có từ trước. Chip "› N" đè lên váy ở 1180 — đã biết.
- Phòng cung nữ ở 1180: dòng tiêu đề nơi chốn dài, xuống 2 dòng đè lên tranh (vẫn đọc được).
