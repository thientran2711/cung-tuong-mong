# Bot chơi chung: hai người, một năm, một thế giới

Bot `dev/test/coop-bot.js` (lệnh: `python3 dev/build/assemble.py && node dev/test/coop-bot.js 52`). Hai trình duyệt không màn hình,
A = chủ phòng ở cỡ Fold 755x1000, B = khách ở cỡ iPad 1180x820. Cả hai cùng vào một phòng thật trên Worker
https://ctm-coop.victoria-tntt.workers.dev. Mỗi buổi, bot làm mấy việc:
- trả lời hộp thoại ngẫu nhiên;
- chọn tối đa 3 thẻ việc;
- khoảng 35% số buổi tìm đến chỗ bạn đang đứng;
- khi đứng cùng chỗ thì ra tay với bạn y như với NPC: Tung tin đồn, Ngáng chân, Vu oan, Dò la, Kết giao;
- rồi bấm Qua buổi / Qua đêm.
Bot còn ép chết giữa chừng: tuần 10 khách chết (buổi sáng), tuần 20 chủ phòng chết (giữa tuần), tuần 30 khách chết (giữa tuần).

## Lượt chạy cuối (15/11, bản ebe6916 = book-release 1b90526 + co-op, phòng UXPF)
| đo | kết quả |
|---|---|
| tuần đã chơi | **52/52** (tháng ba năm thứ nhất → tháng tám năm thứ hai), 4,8 phút |
| tuần có thế giới lệch nhau (Hoàng thượng: niên hiệu, tuổi, tính; ngày; Thái hậu; 12–13 phi tần: mã, tên, phẩm, sống/chết, lãnh cung, con cái; bạn đúng tên và phẩm) | **0** |
| buổi đã so chỗ đứng của mọi NPC + Hoàng thượng | 152 buổi, **0 buổi lệch** |
| buổi mà chỗ người này thấy bạn đứng ≠ chỗ bạn thật đứng | **0** |
| buổi mà Sủng/Danh/Sức của bạn (người kia thấy) ≠ số thật của bạn | 4/152, chỉ trễ một nhịp ngay đầu buổi; tin `pos` tới sau chưa tới một giây là khớp |
| số lần đến gặp bạn | A 78 · B 79 |
| việc ra tay với bạn | A 39 (Ngáng chân 15, Tung tin đồn 12, Dò la 5, Kết giao 4, Vu oan 3) · B 47 |
| chết rồi đầu thai ngay trong cùng thế giới | 4 lần: A chết tự nhiên ở tuần 18; bot ép chết khách ở buổi sáng tuần 10, chủ phòng ở buổi tối tuần 20, khách ở buổi chiều tuần 30. Không ai phải đợi, tuần vẫn qua |
| biết mặt nhau (luật j61, k61St) | lúc đầu là **Người lạ** (0/0). Gặp nhau rồi mới biết (2 = biết tên). Đầu thai xong lại là người lạ |
| lỗi trang | A 0 · B 0 |
Nhật ký: `dev/coop/bot-year-log.txt`. Ảnh: `dev/shots/coop-bot/w1-*`, `w26-*`, `w52-*` (A Fold 755x1000, B iPad 1180x820).
Một lượt trước đó (bản 9a3f38b, phòng PSUB) cũng ra 52/52 tuần, 0 lệch, 178 buổi.

## Lỗi bot đã bắt được và đã sửa
1. Phép gộp cộng dồn cả các số trạng thái. Tâm trạng Hoàng thượng 1→3 (chủ) và 1→0 (khách) thành 2, rồi lệch ra ngoài bảng và
   làm hỏng thanh trên cùng. Sửa trong `merge.js`: tâm trạng, phẩm, ngày tháng, tuổi, mặt, mã… thì lấy bản của chủ phòng (NOADD).
2. Chỗ đứng NPC khác nhau giữa hai máy. Sửa: khách luôn dùng `where` của chủ phòng cho đúng tuần.buổi, kể cả khi trò chơi tự xếp lại
   chỗ đứng. Chủ phòng gửi lại `where` mỗi lần xếp lại.
3. Thấy chỉ số của bạn chậm cả tuần. Sửa: tin `pos` mang kèm Sủng/Danh/Sức/Sắc/Tài/Tâm cơ/Đức/phẩm/tuổi. Máy chủ chuyển nguyên tin.
4. Bạn hiện sẵn tên, sẵn mặt ngay từ đầu. Sửa: bạn theo luật j61 như mọi NPC, kiếp mới của bạn là một người lạ mới.
5. Kiếp mới vào phòng bị kẹt ở buổi sáng trong khi bạn đã sang buổi chiều/tối. Sửa: kiếp mới nhập đúng buổi hiện tại của phòng.
6. Hộp thoại còn trong hàng đợi nhưng bị ẩn sau khi dựng lại từ phòng, nên tuần đứng mãi. Sửa: tự hiện lại.
8. Chết sau khi đã chạm Qua đêm thì kiếp mới mang theo lượt "qua tuần" của kiếp cũ, nên tuần sau bắt đầu ở buổi tối. Sửa: kiếp mới bỏ
   lượt treo ấy và tự qua tuần. Tuần mới luôn bắt đầu buổi sáng.
9. Chủ phòng gửi chỗ đứng của tuần mới ngay giữa lúc qua đêm. Khách sống lại ở buổi tối thì chờ mãi chỗ đứng của buổi tối.
   Sửa: chủ phòng chỉ gửi chỗ đứng tuần mới sau khi tuần đã gộp xong.
7. Khách chạm "Đã hiểu" ở thư "Đợi bạn" lúc thế giới chưa dựng xong thì gây lỗi trang. Đã sửa.

## Chưa làm (bước sau)
- Tin "Trong cung" của tuần: khách chỉ thấy phần tin về thế giới do chủ phòng gửi sang (`cnews`). Chưa có sổ tin chung.
- Bạn là cung nữ: bạn có trong kẻ hầu của chủ nhân nàng. Đã so tên. Chỗ đứng của cung nữ chưa đưa vào phép so từng buổi.
