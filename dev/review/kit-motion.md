# Kiểm duyệt bộ giao diện: review/kit-motion @ 57f340c (j93) — FAIL

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Có "KIT READY: motion" trong PROGRESS_motion.md.
Thứ tự module khi gộp (phiên chính chỉ định): `… 'j86.js', … 'j93.js', 'j94.js', 'j84.js'` (j84 cuối).

## Lỗi chặn
1. **Tia sáng nan quạt sau rương ban thưởng.** Sếp đã CẤM kiểu tia nan quạt tỏa ra ("như hào quang Phật") ở bục vinh danh; luật áp cho MỌI hiệu ứng.
   j93 `.kmrays` = `repeating-conic-gradient(...)` + quay vô hạn (`kmSpin 9s infinite`). Ảnh chính nhánh: dev/shots/motion/755x1000-17-ban-thuong-nhan.webp
   (tia lệch hẳn về góc phải sau rương: `kmSpin` ghi đè `transform: translate(-50%,-50%)` nên tâm tia trôi khỏi giữa).
   Sửa: bỏ conic/tia; thay bằng ánh sáng mềm tỏa từ TRONG LÒNG RƯƠNG (radial-gradient ấm, mờ dần, có thể "thở" nhẹ bằng opacity/scale), CÂN GIỮA miệng rương;
   giữ translate khi có animation (gộp translate vào keyframes hoặc dùng `translate` riêng). Soát mọi chỗ khác dùng conic/rays trong j93 (mâm, hộp gấm, ngự tứ, thăng phẩm).
2. **Lật thẻ mỗi tuần làm phiền.** Hiện hiệu ứng lật thẻ toàn màn (5 thẻ, thẻ giữa lật 3D, "Chạm để bỏ qua") chạy cả khi thẻ được lật là của NGƯỜI KHÁC
   (dev/shots/motion/755x1000-02-lat-the-nguoi-khac.webp: cung nữ chơi, Hoàng thượng lật thẻ Hoàng hậu). Quyết định của phiên chính:
   chỉ hiện TRỌN hiệu ứng khi thẻ được lật là của người chơi; thẻ người khác chỉ hiện một dòng báo ngắn (kitChip/tin trên thanh, không chặn màn, không bắt chạm).
3. Cùng ảnh 02: chữ tiêu đề "Hoàng thượng lật thẻ bài" bị đầu thẻ giữa (đang nhấc lên) che mất giữa chữ. Đặt tiêu đề cao hơn tầm nhấc của thẻ hoặc lớp chữ trên thẻ.

## Kiểm lại khi sửa
- Gộp main mới (cdf36d3+: j59, j77, j82, j90) và review/scene-seasons nếu đã vào; dựng; 755x1000@2, 1180x820@2 trước rồi 1366x1024@2, 412x1058@2, 390x844@3, 1024x768@2.
- Ảnh thử mới cho rương/mâm/hộp gấm/ngự tứ (đóng, mở, nhận), lật thẻ của nàng và của người khác (dòng báo ngắn), giảm chuyển động.
