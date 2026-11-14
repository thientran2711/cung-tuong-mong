# VĂN PHONG — chuẩn lời chữ cổ trang cho Cung Tường Mộng

Mọi chữ người chơi thấy (nút, tab, chỉ số, tên việc, lời kể, tin, sự kiện, bản đồ, sổ ghi, lời chú, màn đầu, kết cục) viết theo giọng cổ trang như bản dịch/lồng tiếng *Chân Hoàn truyện*, *Diên Hy công lược*. Rõ luật chơi vẫn quan trọng hơn hoa mỹ: con số, bậc may rủi, các dòng Tốn/Thành/Hỏng/Kèm giữ nguyên.

Thi hành: `dev/build/j84.js` (module cuối trong assemble.py) sửa dữ liệu và thay chữ trên màn hình theo bảng `window.VP`. Module mới nên viết thẳng theo chuẩn này; khi lỡ, VP sẽ vá trên màn hình. Gọi `VP.fix(str)` để chuẩn hóa một chuỗi, `VP.date(m,y,tuan,buoi)` để viết ngày tháng.

## 1. Bảng thuật ngữ (một khái niệm, một chữ)

| Khái niệm | Dùng | Không dùng |
|---|---|---|
| Đơn vị thời gian | buổi (sáng / chiều / tối), khắc (4 khắc một buổi), tuần (thượng / trung / hạ tuần), tháng, năm | lượt, turn, ngày (khi ý là buổi), vòng |
| Một lần trong trò nhỏ (đàn, múa, lật bài) | hồi: "Hồi 2/5" | lượt, round |
| Ngày tháng (đầy đủ) | Tháng ba, năm thứ nhất, thượng tuần, buổi chiều | T3/1, Năm 1 · Tháng 3, 3/1 |
| Ngày tháng (ngắn, thanh trên cùng, sổ ghi) | Tháng ba · thượng tuần · năm thứ nhất | T3/1 |
| Tên tháng | giêng, hai, ba, tư, năm, sáu, bảy, tám, chín, mười, mười một, chạp | tháng 1, tháng 12 |
| Năm | năm thứ nhất, năm thứ hai, … (có thể kèm niên hiệu: "Cảnh Hòa năm thứ hai") | năm 1, Năm 2 |
| Nút chỉ để xác nhận đã đọc | Đã hiểu | OK, Đã rõ, Xong |
| Nút khép bảng / thẻ | Lui | Đóng, ✕ Đóng, Thoát |
| Thu / mở bảng | Thu lại / Mở ra | Thu gọn / Mở rộng |
| Lời dặn bảng nổi | Chạm để lui · đầy đủ trong Sổ ghi | Chạm để đóng · đầy đủ ở Nhật ký |
| Nút nhận thánh chỉ, ân thưởng | Tạ ơn / Tuân chỉ / Lĩnh chỉ | OK |
| Một kiếp chơi | kiếp | ván, game, màn |
| Chỗ ghi kiếp | sổ: "Sổ một, Sổ hai, Sổ ba"; chỗ chưa ghi: "Chưa ghi" | Ô 1, Trống, slot |
| Ghi / nạp kiếp | Ghi sổ / Nạp sổ | Lưu / Tải |
| Chép kiếp ra ngoài | Chép sổ · "chép kiếp này thành bản chép" | Xuất ván, mã |
| Nạp kiếp từ ngoài | Nạp sổ · "dán bản chép vào để nạp" | Nhập ván, dán mã |
| Bảng tùy chỉnh | Thiết lập | Cài đặt, Tùy chọn, Settings |
| Tiếng | Nhạc · Tiếng động · Giọng · Im tiếng · Rung · Cảnh động; nút: Mở tiếng / Im tiếng | Âm thanh, Hiệu ứng âm, Hiệu ứng hình, Bật/Tắt âm thanh, Tắt tiếng |
| Tab việc làm | Hành sự | Hành động |
| Tab bản đồ | Dư đồ (nút quay lại: "‹ Dư đồ") | Bản đồ, map |
| Tab quan hệ | Giao tình | Quan hệ |
| Tab truyện riêng của thân phận | Mệnh truyện | Tuyến truyện, storyline |
| Tab sổ việc đã qua | Sổ ghi | Nhật ký, log |
| Tab kẻ hầu | Cung nhân | Kẻ hầu (tên tab; trong câu vẫn dùng "kẻ hầu") |
| Tab con cái | Hoàng tự | Con cái (tên tab) |
| Tab rương | Tư trang (chữ ngắn cũng "Tư trang") | Rương đồ, Rương |
| Tab phe | Phe phái (chữ ngắn "Phe") | — |
| Tab ở chế độ cung nữ | Phận sự · Dư đồ · Đồng liêu · Thân phận · Sổ ghi; lời dặn "Mục Phận sự" | Việc |
| Nút thu bảng trên cùng | Tư chất | Chỉ số |
| Chữ ngắn của tab (màn dưới 1280 px) | Hành sự, Dư đồ, Phi tần, Giao tình, Phe, Cung nhân, Hoàng tự, Tư trang, Tài nghệ, Mệnh, Sổ ghi | Việc, Bản đồ, Quan hệ, Kẻ hầu, Con, Rương, Truyện, Nhật ký |
| Mưu người khác nhắm vào ngươi (sổ ghi) | «Hạ độc» nhắm vào ngươi (việc khó): không thành. | [Hạ độc · Khó · hỏng] |
| Bảng thi tài | bảng định thứ; "nàng mất 2 phần" | bảng điểm, điểm |
| Bậc tài nghệ | Bậc 1: … | B1: … |
| Soát đồ | Soát đồ, soát rương | Kiểm tra |
| Thái y xem đồ | nghiệm độc | xét nghiệm |
| Người quen thân | người quen, tri kỷ | bạn |
| Dịp tốt | cơ duyên, dịp | cơ hội |
| Số đo (Sắc, Tài, Sủng…) | gọi đúng tên; khi chung chung: "không đổi gì" | chỉ số, stat, điểm |
| Điểm thi (tuyển tú, thi tài) | phần: "nàng mất 2 phần" | điểm |
| Bậc may rủi | Liều / Khó / Năm ăn năm thua / Khá chắc / Chắc / Rất chắc / Nắm chắc (việc chắc không ghi chữ) | %, Chắc chắn, random |
| Chạm màn hình (lời dặn) | chạm | bấm, click, nhấn |
| Mở một tab (lời dặn) | Vào mục Phe phái | Mở tab Phe phái |
| Ngày đầu cuộc | Thân phận kiếp này · Nhận thân phận · Nhập cung | — |

Từ đã cổ trang, giữ nguyên: Bạc, Sức, Sủng, Danh, Sắc, Tài, Tâm cơ, Đức, Tai mắt, Ân tình, Phúc duyên, Lòng, Chủ tin, thiện cảm, oán, ghen, khắc, quẻ, thẻ bài, thị tẩm, tấn phong, sắc phong, lãnh cung, cấm túc, ân thưởng, bổng lộc, Phi tần, Phe phái, Kẻ hầu, Con cái, Rương đồ, Tài nghệ, Bảng phẩm vị.

## 2. Xưng hô (theo phẩm, theo người nói)

| Người nói | Tự xưng | Gọi người chơi |
|---|---|---|
| Lời kể (người kể chuyện) | — | ngươi (giữ như hiện có) |
| Người chơi trước Hoàng thượng / Thái hậu / Hoàng hậu | thần thiếp | — |
| Người chơi (phẩm Tần trở lên) với người dưới | bổn cung | — |
| Người chơi (dưới Tần) với kẻ hầu | ta | — |
| Hoàng thượng | trẫm | ái phi (khi có sủng) / tên hiệu / "ngươi" khi giận |
| Thái hậu | ai gia | con (khi thương) / "ngươi" |
| Hoàng hậu | bổn cung | muội muội / theo phẩm |
| Phi tần ngang hàng | muội / tỷ (tỷ tỷ, muội muội); "hai ta" được | — |
| Thái giám | nô tài | tiểu chủ (người chơi dưới Tần) · nương nương (Tần trở lên) |
| Cung nữ, ma ma | nô tỳ | tiểu chủ / nương nương như trên |
| Kẻ hầu nói về chủ mình với người khác | "chủ tử nhà nô tỳ / nô tài" | — |
| Chế độ cung nữ (người chơi là kẻ hầu) | nô tỳ | người trên gọi: ngươi |

Quy tắc phẩm: Đáp ứng, Thường tại, Quý nhân = **tiểu chủ**; Tần, Phi, Quý phi, Hoàng quý phi = **nương nương**; Hoàng hậu = **Hoàng hậu nương nương**. Không bao giờ dùng: bạn, tôi, em, anh, chị (trừ "chị em" nghĩa kết nghĩa), mình (trừ "một mình", "mình" phản thân trong lời kể).

## 3. Không có trên màn hình

- Chữ ngoại: OK, buff, stat, level, combo, random, bot, test, game, click, tab, slot.
- Ký hiệu máy: %, "B1:", "T3/1", thẻ nội bộ trong ngoặc vuông kiểu "[Tung tin đồn · Năm ăn năm thua · hỏng]" (thay bằng câu: "Tung tin đồn — hỏng").
- Từ hiện đại: điểm, chỉ số, cơ hội, kiểm tra, xét nghiệm, tải lại trang, cài đặt, lưu, dữ liệu, phiên bản, hệ thống.

## 4. Giữ rõ luật chơi

- Con số giữ nguyên và đứng sau tên: "Sủng +6", "Bạc -30", "Sủng 28 → 31".
- Các dòng của bộ giao diện (Cần / Tốn / Được / Mất / Kèm / Ghi chú; Tốn / Thành / Hỏng / Kèm trên thẻ việc) là của chủ bộ giao diện: không ai tự đổi. Đề xuất chữ cổ (chờ chủ bộ giao diện duyệt):

| Hiện tại | Đề xuất |
|---|---|
| Cần | Phải có |
| Tốn | Hao |
| Được / Thành | Đắc / Thành |
| Mất / Hỏng | Thất / Hỏng |
| Kèm | Hệ lụy |
| Ghi chú | Lời chua |

- Câu ngắn, rõ; mỗi lời dặn nói được ngay phải làm gì.
- Không cắt chữ (không "…"): đổi chữ phải vừa ô ở 390 px.

## 5. Ví dụ

| Trước | Sau |
|---|---|
| T3/1 · thượng tuần | Tháng ba · thượng tuần |
| Năm 1, tháng 3, trung tuần (Xuân) | Tháng ba, năm thứ nhất, trung tuần (Xuân) |
| Đã rõ | Đã hiểu |
| ✕ Đóng | ✕ Lui |
| Ô 1 · Trống | Sổ một · Chưa ghi |
| Xuất ván · chép ván thành mã chữ | Chép sổ · chép kiếp này thành bản chép |
| Lượt 2/5: múa lại 4 bước | Hồi 2/5: múa lại 4 bước |
| B3: Mở «Phượng cầu hoàng»: cơ hội được thị tẩm | Bậc 3: Mở «Phượng cầu hoàng»: thêm dịp được thị tẩm |
| Đem đến Thái y viện xét nghiệm | Đem đến Thái y viện nghiệm độc |
| “Không có khẩu dụ, nương nương xin hồi cung.” (người chơi là Thường tại) | “Không có khẩu dụ, tiểu chủ xin hồi cung.” |
