# Kiểm duyệt bộ giao diện: review/stories @ c78669f (j67 Mệnh truyện ~14 chương) — PASS về kit (KHÔNG gộp main; logic vào main qua review/balance)

Người kiểm: kiểm duyệt kit (phiên chính 2), 2026-11-14. Thử trên bản gộp với main mới (j79 + j84), 6 cỡ, chơi ~6 tuần mỗi cỡ.
- Không lỗi trang, không tràn ngang, không cắt chữ; save cũ (hclh-save-v2) nạp được ở cả 6 cỡ.
- Tab Mệnh: hàng nhãn bằng `kitRows` (.kb/.kr/.krl/.krv, nhãn chữ nhỏ kit), "Nếu bỏ mặc" đỏ, bước ✓/✗ xanh/đỏ. Ảnh: dev/shots/review/stories/.
- Thẻ chương, nhắc hạn chót ("còn một tháng tới hạn"), phần thưởng chương: đều qua `card67()` → `kitPanel({kind,title,sections:[{rows}],subject,btn:"Đã hiểu"})` — đúng khung bảng kit (đọc mã; trong 6 tuần thử chưa tới hạn chương nên chưa chụp được bảng hạn chót).
- Đầu mục Hành sự dùng `.srvhead` có sẵn.

Ghi chú nhỏ (không chặn):
1. Hai chỗ `style="margin:0"` trong j67: bỏ, để kit lo khoảng cách.
2. Tiêu đề "Chương N: …" và "Điều kiện sắc phong …" là `h3` của bảng truyện cũ (`.story`): khi chủ kit có tiêu đề mục (`.kpst`) cho tab thì đổi sang.
3. Thẻ «Mệnh truyện» ở Hành sự chưa thấy ở chương 1 (lúc đầu kiếp): kiểm lại khi tích hợp balance rằng thẻ ra đúng lúc và là `button.ka.kcard`.
