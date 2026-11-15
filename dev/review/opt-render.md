# Kiểm duyệt: review/opt-render (a8ec98511) gộp lên main 70c792d4 — FAIL

Nhánh gộp: `review/opt-render-r6` (gộp sạch, không xung đột). Dựng bằng `dev/site/build_site.sh` (không commit bản dựng).

## Đạt
- `dev/test/opt-render.js` 1180x820@2: 0 fails, 0 lỗi trang. Mọi dialog PEND (mkP/pushDil): chỉ Tốn/Cần + 1 dòng Gợi ý (không số) + nhãn rủi ro; không Được/Mất/thang.
- Gợi ý rõ dần theo Tâm cơ (5/30/70): vague → plain → sharp (giu: "lòng người trên" → "người trên hài lòng" → "Thái hậu hài lòng").
- Thẻ kết quả: không gieo ("sure") → "KẾT QUẢ", không dấu đóng; true → THÀNH, false → HỎNG; ghen của 12 phi tần → 1 dòng Kèm gộp, chạm mở tên, người chưa quen không lộ tên.
- Việc chủ động: Hành sự 15/15 thẻ đủ Được/Mất, 0 gợi ý; thẻ người đủ số; cửa hàng (kitShop) đủ số, 0 gợi ý.
- 755x1000, 1000x755, 1180x820, 1366x1024, 844x390: 0 tràn ngang, 0 cắt chữ, 0 lỗi trang (dialog night2 + thẻ kết quả).

## FAIL
1. Sự kiện dựng thẳng vào Q (không pid/pp/hideOut) VẪN hiện đủ số, lọt chế độ giá (§28.6): "Thái hậu triệu" (approachOne, all.js ~2538: "Được Thái hậu → ta: thiện cảm +3"), "Kẻ hầu xin", "Một ánh mắt", và 7 lễ FESTEV (Tết Nguyên đán, Nguyên tiêu, Thanh minh, Trung thu, Giao thừa, Hội Phượng, Lạp bát: Được/Mất đủ). Quét tĩnh còn: Lời mời / Hội thi (j7), Lời cảnh báo, Nội vụ phủ đưa người, Việc của kẻ hầu, Xuất gia?, Ban cung, Thánh thượng ban thưởng... `opt-render.js` không bắt (chỉ duyệt PEND; visitors: 0). Cần sửa cả nhóm ở `kitIsEventChoice` (vd. thêm evOptional/OPTT trừ "Hàng chợ đen", cờ fest cho FESTEV) + test duyệt approachOne/FESTEV/mọi builder.
2. Gợi ý không trung thực/không dùng được — hàm `kitHintPhrase` rơi vào "chuyện khác" cho kết quả chính: tt1 "cha hài lòng/phật ý", tt3 "cả họ bị tru di", nc1 "lộ là chết", ch2 "bị ban chết", vase "Lòng cung nữ +30", "bị đánh 20 trượng", night1 "đêm vui/đêm nhạt" (4 lựa chọn night1 gợi ý Y HỆT nhau → bot đọc gợi ý không thể hơn bot bừa, trái 15:10Z). giu: "Cúi đầu tuân lệnh" (mất thai lần này) ghi "có lợi … [an toàn]" còn "Đút bạc xin giữ" ghi "chẳng được gì rõ" — bỏ mất cái được chính (giữ thai), dắt người chơi sai.
3. Chữ: "có lợi về thế đối thủ" (đọc như giúp đối thủ); "nhưng có cái giá" ngay dưới "Tốn: không" (mâu thuẫn); "có lợi về chuyện khác" vô nghĩa.
4. Picker việc chủ động bị gắn gợi ý rác: vlget/vlcraft/vlnvp/vlout (Mạng che mặt, Tự tay kết mạng), runner — "có lợi về chuyện khác" từ "chơi được 5 phần: Thường", "che kín"…; việc chủ động phải đủ số (15:05Z).
5. LUẬT KIT (16:50Z): nhãn rủi ro `.krisk` là chip riêng, màu tự đặt (#3f7a52/#8a6420/#a0301e) trong khối style `k-hint`, không dùng `chip()`/`kitChip` của kit; `.kakem`, `.neu .seal`, `.khint` cũng CSS riêng. Phải là thành phần kit (KIT.md + trang mẫu kit) qua điều phối.
6. KIT.md §28.6 trỏ `dev/review/event-balance.md` — không tồn tại; rà cân bằng bằng bot (14:30Z/15:10Z) chưa làm. Không có dev/PROGRESS_review-opt-render.md.
7. Bạc −5 của đêm thị tẩm (13:30Z "phải truy nguồn") chưa truy; test tự trừ Bạc −5.
