# Kiểm duyệt bộ giao diện: review/minigames @ fe63a6f (lần 3) — PASS

Ngày 2026-11-14. Gộp origin/main 2bed83a (xung đột assemble.py; thứ tự … j82, j91, j90, j93, j94, jk2b, j98, j84), dựng không lỗi.
Bộ thử của nhánh (dev/test/minigames91.js, chạm thật qua CDP + tự chơi): 686x880@2.2 sáu trò (Điều hương, Cắm hoa, Thơ, Câu đối, Vẽ, Nấu ăn),
1180x820@2 ba trò (Điều hương, Câu đối, Cắm hoa); 755x1000@2 xem ảnh Điều hương, Cắm hoa, Thơ, Câu đối.
- HUD không vượt trần: hudOver = 0 ở mọi trò (Điều hương "Phần 7/10" hồi 2/3).
- Không chữ đè chữ: textOverText và domOverlap rỗng; "Khớp hương mẫu!" nay nằm đúng chỗ dòng gợi ý.
- Không lỗi trang, không tràn ngang, không cắt chữ, không "có thể"; save cũ nạp được ở 6 cỡ. Ảnh: dev/shots/review/minigames/lan3-686-1180.jpg.

---

# Kiểm duyệt bộ giao diện: review/minigames @ 6e859ae (lần 2) — FAIL

Ngày 2026-11-14. Gộp với origin/main 7a18690 (j94 cảnh mùa): xung đột assemble.py, thứ tự đúng `… 'j82.js', 'j91.js', 'j90.js', 'j94.js', 'j84.js'`; dựng không lỗi.
Bộ thử của nhánh (dev/test/minigames91.js, 755x1000@2, cả 15 trò): 15/15 xong, chạm thật tới trò, 0 lỗi trang, 0 tràn ngang, 0 "có thể".

## Đạt
- Đồ vật bàn chơi nay là tranh gpt-2-6 (nền thi, nền học, mảnh rời): bia, bình đầu hồ, bàn cờ, đèn đố, nồi canh, khung thêu, lư hương… hết hình khối canvas thô.
- "Hồi x/y", "Bảng định thứ"; ảnh tổng 15 trò: dev/shots/review/minigames/755x1000-15-tro.jpg.

## Lỗi chặn
1. **Điều hương: ô PHẦN hiện "20/10"** (vượt trần) ở hồi 2/3 — số phần cộng dồn qua các lư mà mẫu số vẫn 10. Sửa: mẫu số = tổng tối đa của cả trò
   (vd 30 cho 3 lư) hoặc quy về thang 10 như các trò khác; kiểm cả 15 trò không trò nào vượt trần.
2. **Điều hương: chữ đè chữ** — lời báo "Khớp hương mẫu!" nằm chồng lên dòng gợi ý "Mẫu nặng về Đàn hương · độ khớp: khớp", không đọc được.
   Đặt lời báo ở chỗ riêng (hoặc ẩn dòng gợi ý khi lời báo hiện). Soát các trò có lời báo nổi (Cờ "Ăn 3 quân!", Đố đèn…) cùng luật: không đè chữ khác.
   Ảnh: dev/shots/review/minigames/755x1000-huong-20tren10-chu-de.jpg.

## Ghi chú (không chặn)
- Khói hai lư hương là đốm màu mờ vẽ bằng mã (phần động: màu thay theo pha) — chấp nhận, nhưng nếu được nên dùng sprite khói vẽ sẵn tô màu.
- Hát: chữ lời ca trôi ra mép phải bị cắt ("Xươ…") là chữ đang trôi vào khung — chấp nhận.

---

# Kiểm duyệt bộ giao diện: review/minigames @ 4f5e8e6 — FAIL

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Đã gộp với origin/main (a4fbec0), dựng không lỗi.

## Đạt
- 15 môn, mỗi môn một trò riêng, không còn trắc nghiệm (đúng luật chủ 11/14). Test của thợ (dev/test/minigames91.js) chạy ở 755x1000@2: 15/15 xong, chạm/kéo/giữ thật tới được trò, không lỗi trang, không tràn ngang, không cắt chữ.
- Khung trò: kitGameFrame (ấn TÀI NGHỆ, Cách chơi, ô HUD), kết quả kitGameResult, nút .kgbtn. CSS j82 chỉ là bố cục.
- Game cũ ở main vẫn chạy: 6 cỡ không lỗi, save cũ nạp được.

## Lỗi chặn
1. **Ảnh vẽ bằng code ở chỗ cần tranh** (luật chủ 11/14: "Never ship code-drawn art where a painting is expected; if something looks crude, redraw it").
   Mọi đồ vật trong bàn chơi đang vẽ bằng canvas, hình khối phẳng, thô: bình cắm hoa + hoa 5 cánh (hoa), nồi + bếp lửa + ngọn lửa tam giác (banh),
   bình đầu hồ + mũi tên (dauho), khung đèn lồng đỏ (doden), bia bắn (ban), bàn cờ, sợi chỉ/nút (kim), lư hương + khói (huong), nền giấy kẻ sọc.
   Ảnh: dev/shots/minigames/hoa-755x1000@2-2play.jpg, banh-…, dauho-…, doden-… (của chính thợ).
   Sửa: vẽ tranh thật theo dev/art/STYLE_ANCHOR.md (Magnific gpt-2-6, 1 ref phong cách, không mặt người): mỗi môn một nền bàn chơi (sân/án thư/bếp…)
   + các mảnh rời (sprite nền trong suốt: bình, cành hoa theo 3 độ dài, nồi, bếp, nguyên liệu, đèn lồng, bia, lư hương, quân cờ…). Canvas chỉ còn
   vẽ phần động nhỏ (vệt ngắm, vạch nhịp, dải giai điệu, nét đồ) và đặt sprite. Đặt ảnh vào img/kit/mg-<môn>-*.webp, ghi vào KIT.md mục 13
   (chủ bộ giao diện xác nhận "KIT READY" trước khi dùng).
2. Chữ "BẢNG ĐIỂM": lỗi đã biết, không chặn lần này (sửa cùng lượt nếu tiện; VP: dùng "Phần", không "điểm").

## Ghi chú nhỏ (không chặn)
- HUD "Hồi" đang hiện "Lần 2/6", "Bình 1/3", "Bước 2/4", "Đèn 2/2": theo VANPHONG một lần trong trò nhỏ là "hồi"; có thể để "Hồi 2/6 · bình thứ nhất".
- Đối chiếu khi gộp: review/kit-podium (j90) đã gộp vào main trước; giữ thứ tự j82, j91, j90 trong assemble.py và j84 cuối cùng.
