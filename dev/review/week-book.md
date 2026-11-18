# Kiểm duyệt bộ giao diện: review/week-book @ 13bccff (j87 kitBook) — FAIL (hai lỗi nhỏ, sửa nhanh)

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Gộp với origin/main mới (kit-2, face-84, event-art, cutout-fix, KIT.md 19–25),
dựng không lỗi. KIT.md: mục sổ tuần đổi số thành **27** (19–25 đã dùng cho kit 2, 26 cho bục vinh danh).

## Đạt
- kitBook là thành phần kit có khai báo (KIT.md 27); khối trong trang dùng kitRows/kitChips/kitFacts/pframe; tranh bìa/giấy là tranh thật.
- Chơi thật tới hết tuần ở 6 cỡ: sổ mở, lật hết trang, "Vào ngày mới" đóng sổ, ngày đi tiếp; không lỗi trang, không tràn ngang, không "…".
  Trang đôi ở 1180/1366, một trang ở 755/412/390. Game 6 cỡ: thẻ việc cùng cỡ, save cũ (hclh-save-v2-2) nạp được.

## Lỗi chặn
1. **Dòng "Hiện nay" bẻ số khỏi tên** ở trang người khi trang hẹp (412x1058@2 Fold màn ngoài, 390x844@3):
   hiện "Thiện cảm / −2 · Ghen / 6 · Oán 0" — đọc thành "−2 · Ghen", "6 · Oán": số dính sang tên sau, sai nghĩa.
   Ảnh: dev/shots/review/week-book/412x1058_2-hien-nay-tach-so.jpg, 390x844_3-hien-nay-tach-so.jpg.
   Sửa: mỗi cặp "tên số" không được ngắt giữa (white-space:nowrap trên từng `.ef`), cho cả cặp xuống dòng; hoặc dùng kitChips cho ba chỉ số.
   Trang người ở cỡ hẹp còn trống nhiều: có thể đưa "Hiện nay" xuống dưới khung khi trang < 440 px (như facts).
2. **Thẻ kết quả việc cuối đè lên bìa sổ**: làm việc ở khắc cuối → tự sang buổi → sổ tuần mở trong khi thẻ kết quả nổi (THÀNH …) vẫn còn,
   nằm đè lên bìa và che dòng hướng dẫn "Vuốt trang… để lật". Ảnh: 755x1000_2-the-ket-qua-de-bia.jpg.
   Sửa: khi mở sổ, tắt/ẩn thẻ kết quả nổi (hoặc sổ nằm trên nó); không thứ gì phủ lên sổ.

## Ghi chú (không chặn)
- Trang đôi 1180: "Tổng lược · tiếp theo" chỉ còn một dòng trong khi trang trước còn chỗ; chia trang hơi sớm.
