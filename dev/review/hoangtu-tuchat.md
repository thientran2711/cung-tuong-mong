# Kiểm duyệt: review/hoangtu-tuchat (d8e4fe943), PASS có sửa của người duyệt

Ngày 2026-11-15, người duyệt R6. Gộp vào origin/main **70c792d41** trên nhánh review/hoangtu-tuchat-r6, không xung đột.
Site dựng lại bằng `dev/site/build_site.sh`. Ảnh của thợ ở dev/shots/hoangtu-tuchat/. Người duyệt chỉ chụp vài ảnh @2 để xem, không commit.

## Sửa của người duyệt (j53.js, tháng)
**Lỗi:** con của nàng chưa ai "thưa" tư chất thì tháng sau nhũ mẫu thưa, kể cả khi con đã 7 hay 12 tuổi.
Trường hợp này gặp ở sổ cũ quy đổi, hoặc con có trước đó. Khi ấy câu thưa là "chậm biết nói, chậm biết đi" cho một đứa trẻ đã đi học.

**Sửa:** từ 6 tuổi thì thầy dạy thưa, với độ lệch nzOwn. Từ 3 đến 5 tuổi, đứa "chậm hiểu" được tả là "chậm hiểu lời".

Đã thử trên sổ cũ sau một tháng: 1 tuổi và 3 tuổi thì nhũ mẫu thưa, 7 tuổi thì thầy dạy thưa.

## Kiểm tra
- **dev/test/hoangtu-tuchat/test.js** chạy trên bản gộp, sổ cũ làm từ bản origin/main.
  - Kết quả 22/22 ở 755x1000, 1000x755, 1180x820, 1366x1024, 844x390. Không lỗi trang, không tràn ngang.
  - Sau khi sửa, chạy lại 1180x820: 22/22.
- **Ảnh @2** ở 1366x1024 (tab Con của ngươi, Kế vị, Hoàng tự trong cung, từ sổ cũ) và ảnh 844x390.
  - Không tràn, không chữ bị cắt, không có undefined/NaN.
  - Mọi dòng là chip kit: pcard, kitRows, kitPersonLine, chip. Không có CSS riêng: lớp mới chỉ có kr3note, ktbars, past, đều đã có sẵn.
- **"Tư chất ?"**: luật chip kit (jk2b §stat chip) cho chữ "chưa rõ" thành "?" mờ, chữ đầy đủ ở phần chạm. Đúng kit, không phải lỗi.
- **Tên mẹ "Phi ???"**: đúng KIT (người lạ ở bậc 0 trong danh sách hiện "<tước> ???").
- **390x844**: game không có lời nhắc xoay máy, cả trên main. Màn tựa hiện bình thường. Việc này không thuộc nhánh này.

## Còn lại (không chặn)
- Các sự kiện cũ (j67, j68f/g, j72) vẫn ghi "Tài năng của con +N".
  - Về số, ktSync chia đều phần cộng vào Văn, Võ, Đức, nên vẫn đúng.
  - Về chữ, nên đổi thành "Văn/Đức con +N" cho khớp. Cùng nhóm chữ, giao thợ sau.
- Câu nhũ mẫu "lanh lợi, tư chất tầm thường" hơi ngược ý. Có thể đổi theo bậc tư chất.
