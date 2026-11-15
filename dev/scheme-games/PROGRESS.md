# PROGRESS · review/scheme-games (trò mưu)

Plan: dev/SCHEME_MINIGAMES_PLAN.md. Kit notes: dev/kit/KIT.md §13.2. Code: dev/build/jsgame.js.

## Lượt 1 (thợ cũ, @0c894835)
4 trò dựng xong (Nghe ngóng, Truyền lời, Mặc cả, Thời cơ), hộp chọn Tự ra tay / Giao cho người làm / Thôi, ấn MƯU, tranh có sẵn. Chưa kiểm đủ.

## Lượt 2 (thợ mới, 15/11)
- Gộp origin/review/book-release 4bbed569 (giao diện sách đã duyệt), dựng lại site.
- Luật sếp: kết quả trò CHỈ dịch cơ may một bậc trên thang (sgShift; Phần 7+ lên, 4–6 giữ, 0–3 xuống). Bỏ hệ số ±N, bỏ đổi phát giác, bỏ đổi giá bạc.
- Mặc cả làm lại: thanh giá không số (Ít → Rất hậu), ngưỡng ẩn theo lòng trung + tính nết cung nữ (tham bạc / khôn lỏi / thật thà / nhát gan, hiện ở trang đầu);
  bạc tốn luôn = thẻ việc (cùng giá với NPC); bỏ sgNoDeal và móc giá trong ACT.bribe.
- Thời cơ: màn chơi không nêu tên việc (tiêu đề "<tên nàng>: Thời cơ", hộp chọn tiêu đề "Thời cơ"); không chữ độc/thuốc/cách làm (bộ kiểm dò chữ).
- Hộp chọn: việc không tốn bạc ghi "Tốn: không tốn bạc"; câu hỏi Mặc cả không còn tên cung nữ "???".
- HUD: ô Hồi chỉ ghi "2/3" (không lặp chữ Hồi); "lần lượt" (VP đổi thành "lần hồi") → "từng người một".
- Bộ kiểm dev/test/schemegames.js viết lại: mỗi trò THẮNG / THUA / BỎ QUA, đo bậc cơ may trước → sau đúng một bậc, SG.mod chỉ sống trong doAct,
  NPC odds không đổi khi bậc đang sống, bạc tốn = 0 hoặc đúng thẻ, không %, không …, không tràn, không cắt chữ. Thêm KG82.peekBad (người chơi vụng) cho Mặc cả, Thời cơ.
- Ảnh cũ (686x880, giao diện cũ) đã xóa; ảnh mới mỗi trò 1 tấm: dev/shots/scheme-games/<khóa>-755x1000@2.jpg, <khóa>-1180x820@2.jpg.

## Kết quả kiểm
Chạy từng trình duyệt một, server `python3 -m http.server` ở gốc repo, `bash dev/site/build_site.sh` trước:
`node dev/test/schemegames.js http://localhost:8771/index.html 755x1000@2 dev/shots/scheme-games 0` (thêm `reduce` thay `0` cho giảm chuyển động; tham số cuối = danh sách khóa).
- Fold 755x1000@2: spy, rumor, bribe, poison × thắng / thua / bỏ qua: 0 lỗi trang, 0 hỏng; bậc cơ may lên / xuống đúng một bậc, bỏ qua giữ nguyên.
- iPad 1180x820@2: như trên, 0 lỗi trang, 0 hỏng (rumor + bribe + poison chạy lại sau sửa canh lỗi P() trong Truyền lời).
- Fold giảm chuyển động (reduce): spy, rumor, bribe, poison 0 lỗi (trước khi sửa HUD).
- Sổ cũ: dev/test/schemesave.js với bản main (origin/main index.html) → bản mới nạp được (tên, bạc giữ), hộp chọn sgpick sống qua ghi/nạp, 0 lỗi.
- Thời gian một trò: Nghe ngóng 30 giây, Truyền lời 10–45, Mặc cả 4–15, Thời cơ 9–21.

## Còn có thể làm sau
- j78 overhear, j9 placeHarms, bribeServ (j29) gắn SG.K cùng cách.
