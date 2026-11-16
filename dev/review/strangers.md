# Kiểm duyệt bộ giao diện: review/strangers @ 65a5365 (j61) — FAIL

Ngày 2026-11-14. Người kiểm duyệt bộ giao diện (phiên chính 2). Gộp với origin/main mới (kit-2, face-84, event-art, cutout-fix), dựng không lỗi.

## Đạt
- 755x1000@2 và 1180x820@2: không lỗi trang, không tràn ngang, không cắt chữ, thẻ việc cùng cỡ; save cũ (hclh-save-v2-2) nạp được.
- Người chưa gặp: khung đá xám + bóng xám của kit, chỉ số "chưa rõ" (kitStatKnown), dải tên "???"; chỉ còn việc gặp mặt (Đến cung nàng thăm, Sai tai mắt dò, Mời nàng sang). Không thêm CSS.

## Lỗi chặn
1. **Tên công khai bị ghi đè thành "Người lạ" — hai chỗ nói khác nhau** (luật: chỉ tin thật, không mâu thuẫn).
   Hoàng hậu là người công khai (chính j61 nói: biết tên từ đầu, thấy mặt sau lần gặp/thỉnh an đầu). Dải chọn người ở tab Hậu cung ghi đúng
   "Ngọc Hành", `kitName()` trả "Hoàng hậu Tô Ngọc Hành", nhưng thẻ người bên dưới ghi to **"Người lạ"** và nhãn khung cũng "Người lạ".
   Nguyên nhân: j60 bọc `pcard`/`pframe` đổi tên thành "Người lạ" khi `kitIsKnown(p)` sai (chưa thấy mặt), không xét bậc "Biết tên" của j61.
   Ảnh: dev/shots/review/strangers/755x1000_2-hh-nguoi-la.jpg.
   Sửa (trong j61, không đụng j60): người ở bậc 2 "Biết tên" (và người công khai: Hoàng thượng, Thái hậu, Hoàng hậu) hiện bóng xám nhưng tên = `kitName(p)`
   ("Hoàng hậu Tô Ngọc Hành"), nhãn khung = tước; chỉ bậc 0 mới là "Người lạ" / "<tước> ???". Dải tên nên ghi cùng một cách với thẻ.
   Kiểm cả: HUD Hoàng thượng (đang đúng: tên + bóng xám), thẻ người, bảng phẩm vị, Giao tình, Sổ ghi, bục vinh danh (kitKnown).

## Ghi chú (không chặn)
- Chip "Danh 64" hiện với người lạ trong khi các chỉ số khác "chưa rõ": nếu Danh là tiếng tăm công khai thì được, ghi rõ ở KIT.md mục 22.
