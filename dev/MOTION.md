# Chuyển động (game feel): đã làm và đề xuất

Chủ kit chuyển động, nhánh `review/kit-motion`. Thành phần dùng chung mô tả ở `dev/kit/KIT.md`, mục "CHUYỂN ĐỘNG". Mã: `dev/build/j93.js`.

## Đã làm (đã gắn vào game)
1. Lật thẻ thị tẩm: 5 thẻ bài xanh, thẻ giữa nhấc lên và lật 3D, mặt thẻ có phẩm và tên. Chỉ hiện trọn khi thẻ của nàng được lật (có ánh vàng); thẻ người khác chỉ hiện một dòng báo ngắn dưới thanh trên, không chặn màn.
2. Quẻ tuần: ống xăm lắc, một que nhảy ra, chữ quẻ bật lên (xanh tốt, đỏ xấu). Chạy trong bảng tuần mới, khi gieo lại và khi xin xăm ở Phật đường.
3. Kết quả hành động: dấu son chữ Việt "THÀNH" hoặc "BẠI" đóng lên thẻ kết quả, số được/mất bay lên (xanh cộng, đỏ trừ), thanh chỉ số chạy từ số cũ tới số mới.
4. Thăng phẩm: thánh chỉ mở ra, khung chân dung đổi sang khung bậc mới dưới vệt sáng, chip phẩm mới bật lên. Cung nữ được phong Đáp ứng cũng có. Giáng phẩm và vào lãnh cung: màn tối dần, lá khô rơi.
5. Qua buổi: dải trời đổi màu (sáng, chiều, tối) và nén nhang cháy cạnh chữ buổi. Qua tuần: tờ lịch lật sang tuần mới rồi bảng tuần hiện lên.
6. Có thai, sinh con: hoa mẫu đơn nở, cánh hoa bay. Chết: mực loang khắp màn, rồi mở bảng Kiếp này / Sổ luân hồi.
7. Ban thưởng và quà: mâm sơn son phủ khăn gấm (thưởng nhỏ), rương gỗ chạm vàng (thưởng lớn), rương rồng phượng vàng (ngự tứ), hộp gấm (quà người khác tặng). Chạm để mở, rương rung, nắp bật, ánh sáng ấm mềm tỏa từ trong lòng rương (không tia, không hào quang), từng món nhảy ra theo vòng cung với viền màu theo phẩm cấp (món hiếm ra sau cùng), đồng bạc nảy ra. Bên dưới là tên, công dụng, nút Nhận. Đồ tự mua thì bay vào tab Tư trang.
8. Bảng, thẻ mở ra cùng một kiểu (trồi lên nhẹ); mọi nút, lựa chọn, thẻ việc lún xuống khi chạm.
9. Thời tiết: chip có biểu tượng vẽ ở dải trạng thái; chạm xem tác động thật của thời tiết (lấy đúng từ mã). Hạt mưa, tuyết, lá, hoa trên sân khấu to và đậm hơn để thấy rõ; trong cung của nàng thì nhạt hơn (như nhìn qua cửa sổ).
Thêm theo quy ước game: viền đỏ nhói khi có việc nguy hiểm tìm đến.

Tất cả: 0.3–2 giây, chạm để bỏ qua, tôn trọng "giảm chuyển động" và công tắc "Cảnh động", không chặn thao tác lâu hơn khoảnh khắc.

## Đề xuất thêm (để bàn với sếp)
Mức ưu tiên: A nên làm ngay, B làm sau, C tùy sếp.

### Ăn mừng
- A. Mở khóa: lần đầu được vào một nơi mới trên bản đồ, học được tài nghệ bậc mới, mở tab mới: con dấu "Mở khóa" + nơi đó sáng lên trên bản đồ.
- A. Lên bậc tài nghệ: thanh kinh nghiệm đầy, vạch bậc bật sáng, chữ bậc mới (Sơ học, Thành thạo…) bật lên như chip phẩm.
- A. Thắng tranh ghế, thắng hội thi: đã có bục vinh danh của chủ kit #3; em thêm tiếng chiêng và pháo giấy ở khoảnh khắc được trao ghế.
- B. Thiện cảm, Chủ tin, Lòng vượt mốc (40, 60, 80): trái tim/ngọc bội nhỏ bay lên chân dung người đó.
- B. Được Thái hậu khen, Hoàng thượng khen ở yến tiệc: hoa giấy nhẹ quanh chân dung nàng trên sân khấu.
- B. Con cái: con biết đi, đọc chữ, được phong tước: cuộn giấy nhỏ mở ra với tên tước.
- B. Lên ngôi Hoàng hậu: phiên bản lớn của thánh chỉ, kim sách kim ấn hạ xuống, phượng hoàng vàng bay qua.
- C. Mỗi năm qua (sinh thần): pháo hoa ngoài cửa sổ cảnh trong cung.

### Đáng sợ
- A. Bị hạ độc, trúng kế: màn chao nghiêng, viền tím, chén trà vỡ (cần vẽ chén vỡ).
- A. Bị tố giác, bị bắt quả tang: tiếng trống, khung đỏ siết vào giữa, con dấu "Định tội".
- A. Sức xuống dưới 30, dưới 10: thanh Sức nhấp nháy đỏ, nhịp tim chậm (có sẵn tiếng tim).
- B. Sảy thai, mất con: cánh hoa rụng héo (ngược với hoa nở).
- B. Kẻ thù chuyển sang mức "Sát hại": chân dung kẻ đó trong danh sách có viền đỏ nhói một lần.
- C. Bị phạt quỳ, cấm túc: song cửa đóng lại trên sân khấu.

### Nhận tin, điều hướng
- A. Tin trong cung mới: dải lụa đỏ trượt xuống với chuông nhỏ, chạm để mở.
- A. Người đến thăm: bóng người hiện ở cửa cung trước rồi mới hiện thẻ người.
- B. Chuyển tab: trang giấy trượt ngang; chuyển nơi trên bản đồ: bước chân nhỏ chạy theo đường đi.
- B. Đếm số tiền, chỉ số trên dải trạng thái: số chạy (đã có cho Bạc, Sức, Sủng, Danh; nên thêm cho Sắc, Tài, Tâm cơ, Đức).
- C. Rút thẻ việc mới đầu tuần: các thẻ việc chia ra như chia bài.

### Thời tiết (chỉ hiển thị, không thêm luật)
- B. Chớp giông: thêm lóe sáng nhẹ ở bản đồ khi đang mở Dư đồ (hiện chỉ trên sân khấu).
- B. Bản đồ: lớp mưa/tuyết mỏng phủ lên ảnh bản đồ theo thời tiết đang có.

## Cần sếp quyết
- (Đã làm theo kiểm duyệt) Lật thẻ: trọn hiệu ứng chỉ khi thẻ của nàng; người khác chỉ một dòng báo ngắn.
- Cung nữ được thăng bậc cung nữ (đại cung nữ, chưởng sự…) hiện chưa có thánh chỉ; đề xuất dùng bản nhỏ của thánh chỉ với lệnh bài cung nữ.
