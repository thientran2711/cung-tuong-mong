# PROGRESS · review/book-release (gộp sách page-curl + fold-layout + main) — SẴN SÀNG KIỂM

## Gộp
- Gốc origin/review/page-curl a51a155f; gộp origin/review/fold-layout e63a27b7 rồi eea48059 (KIT 33.5 nhãn tên hai dòng); gộp origin/main 1ebb0bb6 (consort-art t5–t8, FIGURES.json y nguyên main).
- Xung đột: dev/build/j11.js — giữ luật MỘT nền của page-curl (bản Pixi chỉ vẽ khi đúng tranh + tỉ lệ #scimg, ngược lại chỉ #scimg) + luật phủ kín khung KIT_BD của fold-layout (phóng cho phủ, kẹp mép). assemble.py, LOG.md: giữ cả hai (LOG xung đột với main, giữ hết dòng). index.html/sw.js dựng lại bằng dev/site/build_site.sh.
- KIT.md: sách đổi thành §34 (34.1/34.1b/34.1c/34.2–34.5) vì §32 = kit 4, §33 = KIT_FIG; sửa tham chiếu trong jbook.js, j87.js, PROGRESS_page_curl.md. kitBookPic: cao người mặc định KIT_FIG.h (không cỡ riêng).
- kitPcSize sau bố cục: page-curl đã chạy lại, không thêm.

## Việc chủ 11/15 (qua điều phối)
- Thước người: chủ duyệt tỉ lệ trong dev/shots/curl2/ipad1180-tab-45.jpg — đo trên bản page-curl: nữ .787 chiều cao sân khấu. KIT_FIG.h = .79, nam ×1.07 (tự chặn dưới dải tên nơi chốn, KHÔNG kéo nữ nhỏ theo). Người dùng trọn bề ngang sân khấu, đứng dưới cột bảng phải (bảng nền đặc nổi trên). Bỏ thu nhỏ "nàng + 1"; chỉ dải "› N" quyết ai hiện.
- Dư đồ: chỗ khóa (Dưỡng Hòa điện, Cần Chính điện…) dùng nhãn chung (tên + N bóng · K khắc) + dấu khóa nhỏ; bỏ hộp xám, dòng lý do bị cắt, nút trên bản đồ. Chạm nhãn → thẻ lựa chọn kit (j77Card: lý do, Xin yết kiến/bái kiến, Lẻn vào có thang odds, khắc, mất gì). KIT §34.1d.

## Đo (ảnh dev/shots/book-release/; chiều cao hình người ÷ chiều cao sân khấu)
| viewport | phi tần (nàng + cung nữ) | cung nữ (nàng + thái giám) | cung nữ 3 người |
|---|---|---|---|
| 686x880@2.2 | .792 / .792 | .792 / .848 nam | — |
| 1180x820@2 | .792 / .792 | .792 / .848 nam | .792 .792 .848, rồi dải "› 2" khi thêm người |
| 1366x1024@2 | .792 / .792 | .792 / .847 nam | — |
| 1024x768@2 | .793 / .793 | .793 / .848 nam | — |
(page-curl gốc, ảnh chủ duyệt: 1180 .787)

## Kiểm
- 686x880@2.2, 1180x820@2, 1366x1024@2, hai đường (phi tần: act,go,rv,staff,kid,inv,art,story; cung nữ: act,go,staff,story,log) + thẻ người Hậu cung: 0 lỗi trang, 0 tràn ngang, 0 chữ cắt, 1 nền sân khấu, Dư đồ bản đồ da (kleather).
- Lật tab (dev/test/curl-live.js 1180, có chuyển động): lật 25/45/65 %, lật lùi, mở bản đồ — 0 lỗi; tắt hiệu ứng thì không lật.
- Save cũ (index.html của origin/main) nạp được ở cả 3 cỡ, 0 lỗi.
- Ngoài phạm vi (có từ trước): góc trên phải Dư đồ ở Fold (Trường Xuân / Hàm An / Trường Môn viện) nhãn chồng nhau ở mức thu phóng mặc định.
