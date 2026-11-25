# KẾT HIẾM · CƠ DUYÊN HIẾM — danh mục (j97)

Mã: `dev/build/j97.js` (bọc j67, đứng trước j84 trong assemble.py). Quyết định chủ: OWNER_DECISIONS 2026-11-14 "Every story arc has at least one RARE ending".

## Cơ chế
- Mỗi tuyến trong ARC67 (36 xuất thân + 8 tuyến chung + 3 tuyến giữa đời = 47) có 1 kết hiếm. Tuyến tình "Thanh mai trúc mã" (j96) có kết hiếm riêng của thợ khác; j96 đăng ký vào sổ bằng `RARE97.add(id,{t,tag})` và `RARE97.meet(id,tag)`.
- **Điều kiện ẩn** (xét lúc hồi cao trào được ra): chọn đúng hướng (cột *Chuỗi lựa chọn*) ít nhất *np* lần trong các hồi trước; chọn một lựa chọn ở cột *Phá* là mất cơ duyên của tuyến ấy; Lợi thế (A.sc) đạt mức; thêm một điều kiện số đo / quan hệ / con cái.
- **Gieo một lần** khi đủ điều kiện: xác suất *p* × núm chung `R97CFG.p` (hiện 0,9: thực tế 9–13,5 %). Kết quả lưu trên tuyến (`A.r97`), không gieo lại.
- Trúng: hồi cao trào có thêm lựa chọn `✦ …` viền vàng sáng (kit `.ksel`), dòng thẻ chỉ ghi chi phí và "(Cơ duyên hiếm)". Không hiện kết quả, không hiện bậc may rủi. Chọn là chắc thành.
- Kết hiếm là một kết cục thắng (k=1) của tuyến (`ARC67[id].E.r97`): thay đổi số đo + hệ quả riêng + 1 món **Ngự tứ** (không bán, không tặng) + **danh hiệu kiếp này** + phần thưởng chương thường lệ.
- **Sổ luân hồi**: `localStorage "ctm-rare97"` ghi các kết hiếm đã gặp qua các kiếp, hiện "x/y kết hiếm đã gặp" ở cuối Sổ luân hồi. Chỉ để nhớ: không mang gì sang kiếp sau. Dòng kiếp trong Sổ luân hồi ghi thêm "Kết hiếm: …".
- Món Ngự tứ dùng khóa của kho trang phục j92 (review/wardrobe): `nt_nhuy` Trâm ngọc như ý, `nt_haiduong` Bộ diêu «Hải đường xuân thụy», `nt_dongchau` Trâm đông châu (j97 đăng ký nếu chưa có), cùng `ngocboi` Ngọc bội ngự ban, `bienngu` Biển ngự bút có sẵn.
- Thợ vẽ: mỗi kết hiếm cần 1 tranh kết (cột *Tranh*: cảnh chính, người hiện mặt). Mã sự kiện đề xuất cho j89: `arc:<tuyến>:r97`.

## Danh mục


### Con gái Tể tướng

#### Quân cờ trong tay cha (`tt_co`) — ✦ Ấn tướng phủ về tay ngọc

- Lựa chọn hiện ở hồi cuối: «Xin cha giao sổ môn sinh vào tay ngươi» · chi phí: Sức -4, Bạc -60
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Nhắc tên người khác»; «mua chuộc nàng»; «Báo cho {v} đề phòng»; «Tự đến xin Hoàng hậu»; «Đưa tin giả cho cha»; «Tự đứng vững»
- Phá: «Làm theo lời cha»; «Nhận, để cha yên tâm»; «Liếc trộm»; «Bỏ bạc lo lót»
- Điều kiện thêm: Lợi thế ≥ 2, Tâm cơ từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Đêm ấy {dad} lặng nhìn ngươi rất lâu, rồi tự tay đặt cuốn sổ môn sinh lên bàn: “Cha già rồi. Từ nay phủ Tể tướng nghe con.” Ông dâng sớ cáo lão, về quê được ban ngựa xe vinh hiển; người trong triều ai muốn tiến thân đều phải gõ cửa cung ngươi.
- Thay đổi: Danh +12, Bạc +150, Tai mắt +2 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Chủ ấn phủ Tể tướng»
- Tranh: phụ thân — Ấn tướng phủ về tay ngọc

#### Phủ Tể tướng mắc oan (`tt_oan`) — ✦ Ngự bút rửa oan

- Lựa chọn hiện ở hồi cuối: «Dâng kèm nét chữ thật của kẻ làm sổ giả» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Lặng lẽ cho người dò sổ»; «giữ hắn làm chứng»; «Tự đối chiếu nét chữ»; «Nhờ Hàn lâm viện»; «Gom đủ chứng cứ»
- Phá: «Giữ khoảng cách với phủ»; «Đốt thư»; «Gặp riêng {v}, đề nghị dàn xếp»
- Điều kiện thêm: Lợi thế ≥ 2, Đức từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Giữa triều, nét chữ trong sổ giả khớp từng nét với thư tay của viên thị lang Hộ bộ. Hoàng thượng đập án, sai trói hắn tại chỗ. Ba hôm sau, tấm biển ngự bút treo trước phủ, cha ngươi được phong Thái sư. Ngài nói: “Nhà này sinh được một đứa con gái hơn mười đứa con trai.”
- Thay đổi: Danh +12, Sủng +6, Thái hậu với ngươi +5 + hệ quả riêng · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Hiếu nữ phủ Thái sư»
- Tranh: Hoàng thượng — Ngự bút rửa oan

#### Phủ Tể tướng chia đôi (`tt_tranh`) — ✦ Cốt nhục đoàn viên

- Lựa chọn hiện ở hồi cuối: «Mời cha và huynh cùng vào cung, ngồi chung một mâm» · chi phí: Sức -3, Bạc -80
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Viết thư hỏi thẳng huynh»; «hai phần lễ ngang nhau»; «Khuyên cha chia cho êm»; «Gửi quà giữ chân»; «Âm thầm trả nợ cho huynh»; «Xin Hoàng thượng thăng»
- Phá: «Lặng lẽ kết thân với {v}»; «Để sớ đi»; «Để huynh chịu phạt»
- Điều kiện thêm: Lợi thế ≥ 2, Đức từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Mâm cơm trong cung ngươi đêm ấy chỉ có ba người. Đến tuần rượu thứ ba, huynh trưởng đứng dậy, quỳ xuống trước ngươi và cha: “Muội gánh cả nhà, huynh lại đi đặt cược vào người ngoài.” Từ đó cả họ chỉ có một phe, và người cầm cờ là ngươi.
- Thay đổi: Danh +10, Bạc +120, Đức +3 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Người giữ lửa họ ngoại»
- Tranh: phụ thân — Cốt nhục đoàn viên

#### Mật ước với Hoàng hậu (`tt_mat`) — ✦ Phượng ấn trao tay

- Lựa chọn hiện ở hồi cuối: «Đến Càn Ninh cung một mình, nói chuyện như tỷ muội» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Đọc kỹ, chép lại»; «Nhận lễ, lựa lời dò ý»; «Hỏi thẳng cha»; «Chép kinh tận tâm»; «Kéo {v} làm đồng minh»; «Gặp Hoàng hậu nói chuyện»
- Phá: «Cảnh cáo {v}»; «Chép qua loa»
- Điều kiện thêm: Lợi thế ≥ 2, Hoàng hậu với ngươi từ 40, Hoàng hậu còn tại vị
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng hậu đốt tờ mật ước trước mặt ngươi: “Cha muội và bổn cung đều tính thiệt hơn. Chỉ muội là đến đây tay không.” Bà xin Hoàng thượng cho ngươi hiệp lý lục cung, nắm sổ sách Nội vụ phủ cùng bà. Cả hậu cung hiểu: ai muốn qua Trung cung phải qua ngươi.
- Thay đổi: Hoàng hậu với ngươi +25, Danh +12, Tai mắt +2 · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Hiệp lý lục cung»
- Tranh: Hoàng hậu — Phượng ấn trao tay


### Con gái Đại tướng quân

#### Khói lửa Nhạn Môn (`dtq_bien`) — ✦ Tên khắc bia Nhạn Môn

- Lựa chọn hiện ở hồi cuối: «Xin ra Phụng Tiên điện quỳ tụng kinh suốt ba đêm trận» · chi phí: Sức -8
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Bán trang sức góp quân lương»; «Tự may áo rét»; «Gửi Thái y giỏi nhất»; «Cầu an cho cha»; «Báo ngay cho cha»; «Tìm chứng cứ Binh bộ»
- Phá: «Đốt thư, coi như không thấy»
- Điều kiện thêm: Lợi thế ≥ 2, Sủng từ 35
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Tin thắng trận về kinh cùng một tấm bia: tướng sĩ Nhạn Môn khắc tên ngươi bên tên cha, vì những tấm áo rét và thuốc men ngươi gửi ra ải. Hoàng thượng đứng trước bia rất lâu, rồi ban cho ngươi phong hiệu “Trung Liệt”. Từ đó trong quân, nhắc đến ngươi ai cũng đứng thẳng lưng.
- Thay đổi: Sủng +8, Danh +12 + hệ quả riêng · Ngự tứ: Ngọc bội ngự ban · Danh hiệu: «Phong hiệu Trung Liệt»
- Tranh: Hoàng thượng — Tên khắc bia Nhạn Môn

#### Bức thư mưu phản (`dtq_vu`) — ✦ Đan thư thiết khoán

- Lựa chọn hiện ở hồi cuối: «Dẫn kẻ khắc ấn giả vào ngay giữa phiên xử» · chi phí: Sức -4, Bạc -50
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Xin xem kỹ nét chữ»; «Cho người giữ mạng hắn»; «Tìm thợ khắc ấn»; «Xin Hoàng thượng so ấn»; «Để nàng chép, theo dõi»; «Gom hết chứng cứ»
- Phá: «Quỳ thề lấy mạng»; «Mặc kệ»; «Đe {v}»
- Điều kiện thêm: Lợi thế ≥ 2, Tâm cơ từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Lão thợ khắc ấn run rẩy chỉ tay vào kẻ đã thuê hắn. Cả triều lặng ngắt. Hoàng thượng ban cho nhà ngươi một tấm đan thư thiết khoán: con cháu họ ngươi đời đời được miễn tội chết một lần. Cha ngươi khóc như trẻ nhỏ trước ngự án.
- Thay đổi: Danh +12, Sủng +5 + hệ quả riêng · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Nhà có đan thư thiết khoán»
- Tranh: Hoàng thượng — Đan thư thiết khoán

#### Binh phù và long ngai (`dtq_binh`) — ✦ Nửa mảnh binh phù

- Lựa chọn hiện ở hồi cuối: «Xin ngài cho cha và vua cùng giữ một nửa binh phù» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 3 trong: «Đáp: cha chỉ giữ hộ»; «Thưa thật: cha già rồi»; «Dò xem ai khuyên ngài»; «Hồi thư khuyên cha tự lui»; «Kết giao với nhà tướng trẻ»; «Chúc mừng tướng trẻ»; «chia quân»; «Khuyên cha về một mình»; «Đỡ lời cha»
- Phá: «Hứa với cha sẽ giữ»; «Tìm lỗi của tướng trẻ»; «Để cha mang thân binh»
- Điều kiện thêm: Lợi thế ≥ 2, Sủng từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng thượng bẻ đôi binh phù ngay trên ngự án, một nửa đưa cha ngươi, một nửa đặt vào tay ngươi: “Trẫm tin cha nàng, vì trẫm tin nàng.” Từ đó, muốn điều quân phải có đủ hai nửa; và nửa kia nằm trong hộp gấm ở cung ngươi.
- Thay đổi: Sủng +10, Danh +8 + hệ quả riêng · Ngự tứ: Ngọc bội ngự ban · Danh hiệu: «Nửa mảnh binh phù»
- Tranh: Hoàng thượng — Nửa mảnh binh phù

#### Người anh nơi đất giặc (`dtq_huynh`) — ✦ Hòa thư đưa huynh về

- Lựa chọn hiện ở hồi cuối: «Gửi cho huynh chiếc trâm của mẹ làm tín vật bỏ trốn» · chi phí: Sức -3, Bạc -80
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Tự gom bạc chuộc»; «Xin gặp riêng sứ giặc»; «Nhờ Lễ bộ dò ý»; «Dâng kế đổi tù binh»; «Lấy thư của huynh»; «Bỏ bạc mua đường cứu»
- Phá: «Tránh mặt sứ giặc»; «Mặc kệ»
- Điều kiện thêm: Lợi thế ≥ 2, Bạc từ 100
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Huynh trưởng trốn về giữa mùa tuyết, trong áo giấu bản đồ doanh trại và một bức hòa thư của chính công chúa nước giặc, người đã mở cửa ngục cho huynh. Hai nước nghị hòa. Huynh được phong Trấn Bắc hầu; ngày nhận ấn, huynh quay về phía cung ngươi mà lạy ba lạy.
- Thay đổi: Danh +12, Sủng +5 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Muội muội của Trấn Bắc hầu»
- Tranh: Hoàng thượng — Hòa thư đưa huynh về


### Con gái nhà buôn muối

#### Mua tước cho cha (`muoi_tuoc`) — ✦ Thương hội mang ấn rồng

- Lựa chọn hiện ở hồi cuối: «Xin Thái hậu cho nhà ngươi đứng ra lập thương hội cho triều đình» · chi phí: Sức -4, Bạc -100
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Dâng bạc vào quốc khố»; «Tặng {v} hũ muối»; «Xin nhà ngươi gánh hết»; «Góp một phần»; «Đưa sổ sách sạch»; «Xin chờ tước thật»
- Phá: «Nhận hư hàm»; «Đưa bạc»
- Điều kiện thêm: Lợi thế ≥ 2, Thái hậu với ngươi từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Thái hậu đặt chén trà xuống: “Bạc nhà con, lòng con, ai gia đều thấy.” Thánh chỉ ban xuống: lập Thương hội mang ấn rồng lo muối, trà, tơ cho nội đình, nhà ngươi đứng tên hội trưởng đời đời. Kẻ từng chê mùi muối nay xếp hàng xin vào hội.
- Thay đổi: Danh +10, Bạc +200, Thái hậu với ngươi +5 · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Người lập Thương hội mang ấn rồng»
- Tranh: Thái hậu — Thương hội mang ấn rồng

#### Thuyền muối đêm (`muoi_lau`) — ✦ Phá lưới muối lậu

- Lựa chọn hiện ở hồi cuối: «Dâng sổ tay của quản sự gian kèm danh sách thuyền đêm» · chi phí: Sức -4, Bạc -40
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Dò xem cha có thật bị oan»; «Tâu xin minh xét»; «Giữ hắn làm chứng»; «Bắt hắn viết lời khai»; «Cho người kiểm khoang»; «Khéo từ chối, để ý nàng»; «Lật đến cùng»
- Phá: «Giữ khoảng cách»; «Đổi im lặng»
- Điều kiện thêm: Lợi thế ≥ 2, Tai mắt từ 2 hoặc Tâm cơ từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Sổ tay của quản sự gian lật ra cả một mạng lưới: chính quan Hộ bộ cài muối lậu vào thuyền các nhà buôn để tống tiền. Hoàng thượng chém đầu cả bọn, rồi giao cho cha ngươi chức Diêm vận sứ, coi muối khắp Giang Nam. Cái tên từng bị bôi đen nay sáng nhất bến Giang Khẩu.
- Thay đổi: Danh +12, Bạc +120 · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Con gái Diêm vận sứ»
- Tranh: Hoàng thượng — Phá lưới muối lậu

#### Năm đói ở Giang Nam (`muoi_doi`) — ✦ Giang Nam lập sinh từ

- Lựa chọn hiện ở hồi cuối: «Xin được đội nón lá ra lều cháo cùng dân một ngày» · chi phí: Sức -8, Bạc -60
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «mở kho bán giá cũ»; «Lập lều cháo»; «Khuyên Hoàng thượng giảm thuế»; «Tự nguyện dâng thóc»; «Bảo cha bán rẻ»; «Tự ra lều phát thuốc»; «Gửi thuốc men»
- Phá: «Nhận bạc gấp đôi»; «Lo lót để gạch tên»; «Nghe cha»
- Điều kiện thêm: Lợi thế ≥ 2, Đức từ 50
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Năm sau được mùa, dân Giang Nam góp gạch dựng một sinh từ thờ ngươi khi còn sống. Ngự sử về tâu, Hoàng thượng cười mà phong cho ngươi chữ “Nhân” làm phong hiệu. Mỗi lần ngươi qua cổng, người ta thắp hương mà khấn tên ngươi.
- Thay đổi: Đức +6, Danh +12, Sủng +4 + hệ quả riêng · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Phong hiệu Nhân»
- Tranh: Hoàng thượng — Giang Nam lập sinh từ

#### Món nợ trong cung (`muoi_no`) — ✦ Kim lan Phụng Tiên

- Lựa chọn hiện ở hồi cuối: «Trả sổ nợ cho {v}, rồi xin cùng nàng kết nghĩa» · chi phí: Sức -3, Bạc -50
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Xóa nợ, kết ơn»; «Cho vay không điều kiện»; «Không bán, báo cho {v}»; «Đứng ra nói đó là quà»; «Cho thêm hạn»; «Nhắc khéo {v}»
- Phá: «Bán»; «Đòi bằng được»; «Cho vay, kèm điều kiện»
- Điều kiện thêm: Lợi thế ≥ 1, {v} có thiện cảm với ngươi từ 20
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: {v} cầm sổ nợ mà khóc. Trước bàn thờ Phụng Tiên điện, hai người thắp ba nén hương, kết làm tỷ muội kim lan. Từ hôm ấy, mọi lời {v} nói với Hoàng thượng đều có một câu nhắc đến ngươi, và phe nàng thành phe ngươi.
- Thay đổi: Danh +6, Đức +4 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Tỷ muội kim lan»
- Tranh: phi tần trong truyện — Kim lan Phụng Tiên


### Cung nữ được sủng hạnh

#### Chủ cũ (`cn_chu`) — ✦ Chén trà năm xưa

- Lựa chọn hiện ở hồi cuối: «Tự tay pha cho {v} chén trà năm xưa nàng thích» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Quỳ dâng trà, mỉm cười»; «Gửi bạc kết thân»; «Thừa nhận, xin lỗi»; «Đứng ra nói giúp chủ cũ»; «Nói tốt về {v}»; «Gửi lời làm hòa»
- Phá: «Đứng ngoài nhìn»; «Kể thật những gì đã chịu»; «Chuẩn bị đối phó»; «Đứng dậy đáp sắc sảo»
- Điều kiện thêm: Lợi thế ≥ 1, phẩm của ngươi không dưới {v}
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Chén trà năm xưa nay ngươi pha, {v} nhận lấy bằng hai tay rồi quỳ xuống: “Thuở ấy ta đối đãi muội chẳng ra gì.” Hoàng thượng biết chuyện, khen ngươi “không quên gốc”, ban cho ngươi một cây trâm. {v} từ đó theo ngươi như người nhà.
- Thay đổi: Danh +10, Đức +5, Sủng +4 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Ân chủ của chủ cũ»
- Tranh: phi tần trong truyện — Chén trà năm xưa

#### Mối tình thuở hầu trà (`cn_tinh`) — ✦ Cố nhân hộ giá

- Lựa chọn hiện ở hồi cuối: «Xin Hoàng thượng cho {n1} theo hộ giá chuyến săn mùa thu» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Gặp hắn một lần, nói rõ»; «Xin Nội vụ phủ đổi hắn»; «Nhờ người hỏi lấy lại thư»; «Cho {n1} xin ra biên»; «Âm thầm cứu hắn»; «Cười nói tự nhiên»; «Chuẩn bị lời giải thích»; «đánh tráo thư»
- Phá: «Lờ đi»; «Tin rằng hắn đã đốt»
- Điều kiện thêm: Lợi thế ≥ 2, Đức từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Trong cuộc săn, mãnh hổ lao vào ngự giá; {n1} chắn trước Hoàng thượng mà đỡ một vết vuốt. Ngài hỏi hắn muốn gì, hắn chỉ xin cưới một cung nữ ở quê. Đêm ấy Hoàng thượng nắm tay ngươi: “Người cũ của nàng cũng là trung thần của trẫm.” Thư cũ từ đó không còn ai dám nhắc.
- Thay đổi: Sủng +10, Danh +6 · Ngự tứ: Ngọc bội ngự ban · Danh hiệu: «Người Hoàng thượng tin tuyệt đối»
- Tranh: Hoàng thượng — Cố nhân hộ giá

#### Tri kỷ ở Tân Giả khố (`cn_ban`) — ✦ Tố Nga khoác áo nữ quan

- Lựa chọn hiện ở hồi cuối: «Xin Thái hậu cho Tố Nga vào Thượng cung cục» · chi phí: Sức -3, Bạc -60
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Lén gửi thuốc và bạc»; «Đến Tân Giả khố gặp nàng»; «Biếu chưởng sự»; «Hứa che chở»; «Lén mời thái y»; «Tự bốc thuốc»; «Nhận là bạn cũ»; «Xin Tố Nga về hầu»
- Phá: «Đốt khăn»; «Chối»; «Gửi bạc, phó mặc»
- Điều kiện thêm: Lợi thế ≥ 2, Thái hậu còn sống, với ngươi từ 30
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Thái hậu nghe xong chuyện cái giếng thì nhắm mắt rất lâu. Tố Nga được minh oan, phong làm chưởng ấn nữ quan Thượng cung cục, coi sổ sách y phục, đồ dùng cả lục cung. Từ nay, cung nào may áo gì, nhận đồ gì, ngươi đều biết trước một ngày.
- Thay đổi: Danh +8, Tai mắt +3, Thái hậu với ngươi +4 · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Ân nhân của Thượng cung cục»
- Tranh: cung nữ thân tín — Tố Nga khoác áo nữ quan

#### Thân thế thật (`cn_than`) — ✦ Huyện chúa họ Thẩm

- Lựa chọn hiện ở hồi cuối: «Đeo miếng ngọc ra mắt Thái hậu» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Hỏi thêm chi tiết»; «Lo hậu sự cho ma ma»; «Đem ngọc nhờ thợ cung»; «Nhờ người chép hồ sơ»; «Xin Hoàng thượng cho xem»; «Tiếp bà, cho bạc»; «Thử dò ý {v}»; «Giữ kín, theo dõi»; «Quyết nhận»
- Phá: «Từ chối gặp»
- Điều kiện thêm: Lợi thế ≥ 2, Thái hậu còn sống
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Thái hậu vừa thấy miếng ngọc đã đứng bật dậy: đó là ngọc bà ban cho người bạn thuở thiếu thời, phu nhân họ Thẩm. Án cũ được lật, cha ngươi được truy phong, còn ngươi được ghi vào tông phả, phong Huyện chúa. Kẻ từng gọi ngươi là “con bé bưng trà” nay phải hành lễ trước.
- Thay đổi: Danh +14, Thái hậu với ngươi +10 · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Huyện chúa họ Thẩm»
- Tranh: Thái hậu — Huyện chúa họ Thẩm


### Công chúa nước Nam Chiếu hòa thân

#### Mật lệnh cố quốc (`nc_gian`) — ✦ Hòa ước khắc danh

- Lựa chọn hiện ở hồi cuối: «Viết một bức thư cho cả hai vua, đóng hai ấn» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Dâng thư lên Hoàng thượng»; «Đổi nàng về phe mình»; «sửa sai đi khi gửi»; «Biếu Tổng quản»; «Gửi một tin nhỏ vô hại»; «Báo cho Hoàng thượng chuẩn bị»; «Gửi tin giả»
- Phá: «Ghi nhớ một phần»
- Điều kiện thêm: Lợi thế ≥ 2, Tâm cơ từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Bức thư hai ấn của ngươi đến tay cả phụ vương lẫn Hoàng thượng cùng một ngày. Hai nước dừng binh bên sông Lan Thương, ký hòa ước mười năm, và trong hòa ước có tên ngươi làm người bảo đảm. Từ đó sứ hai nước sang, đều qua cung ngươi trước.
- Thay đổi: Danh +12, Sủng +6 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Người bảo đảm hòa ước»
- Tranh: Hoàng thượng — Hòa ước khắc danh

#### Sứ đoàn cố quốc (`nc_su`) — ✦ Chợ biên Vĩnh Hòa

- Lựa chọn hiện ở hồi cuối: «Dâng tấm bản đồ chợ biên tự tay ngươi vẽ» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Dạy hoàng huynh lễ nghi»; «Âm thầm thay bằng ngọc»; «Tra xem ai đánh tráo»; «Khuyên huynh đổi cống»; «Nói giúp với Hoàng thượng»; «Bồi thường riêng»; «Thưa: con của hai nước»; «Đứng ra mai mối»
- Phá: «Để sứ đoàn giữ lễ cố quốc»
- Điều kiện thêm: Lợi thế ≥ 2, Tài từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng thượng trải tấm bản đồ ra, nhìn rất lâu những con đường ngươi vẽ từ trí nhớ thuở nhỏ. Chợ biên Vĩnh Hòa được mở; bạc trà, ngựa, ngọc chảy qua hai nước. Ngài cho chợ mang phong hiệu của ngươi, và mỗi mùa thu, thuế chợ có một phần gửi về cung ngươi.
- Thay đổi: Danh +10, Bạc +150, Sủng +5 · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Vĩnh Hòa phu nhân»
- Tranh: Hoàng thượng — Chợ biên Vĩnh Hòa

#### Người ngoại tộc (`nc_tuc`) — ✦ Chim công của Thái hậu

- Lựa chọn hiện ở hồi cuối: «Múa cho Thái hậu xem trong áo lông công của mẹ» · chi phí: Sức -6
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Giải thích ý nghĩa chim công»; «Dâng một phần lên Thái hậu»; «Xin dâng thuốc quê nhà»; «Mời các phi tần cùng chơi»; «Viết thơ bằng chữ Nam Chiếu»; «Kể chuyện Phật giáo»
- Phá: «Đổi sang y phục Đại Hy»; «Thôi nấu»; «Không dám, sợ mang họa»
- Điều kiện thêm: Lợi thế ≥ 2, Thái hậu còn sống; Vũ bậc 2 hoặc Sắc từ 55
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Điệu múa dứt, Thái hậu tự tay khoác cho ngươi tấm áo choàng của chính bà: “Ai gia sống đến tuổi này mới biết, người ngoài là người chưa ai chịu hiểu.” Điệu chim công được ghi vào nhạc phủ, và từ đó ai chê y phục Nam Chiếu là chê Đức Thọ cung.
- Thay đổi: Thái hậu với ngươi +20, Danh +8, Sắc +2 · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Chim công của Đức Thọ cung»
- Tranh: Thái hậu — Chim công của Thái hậu

#### Ngai vàng cố quốc (`nc_vuong`) — ✦ Nữ vương Nam Chiếu

- Lựa chọn hiện ở hồi cuối: «Mở phong thư thứ ba, thư của các trưởng lão Nam Chiếu» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Xin Hoàng thượng cho để tang»; «Đọc kỹ, dò xem ai được lòng dân»; «Trả lại»; «Vận động Lễ bộ»; «Quỳ xin Hoàng thượng cứu»; «Gửi bạc riêng giúp huynh»; «Nói thật những gì đã dò»
- Phá: «Nhận vàng»; «Vận động Binh bộ»
- Điều kiện thêm: Lợi thế ≥ 2, Sủng từ 45
- Xác suất khi đủ điều kiện: 10 % × 0,9 = 9,0 %
- Kết quả: Phong thư thứ ba đóng dấu của mười hai trưởng lão: hoàng huynh và hoàng thúc đều đã mất lòng dân, họ xin rước ngươi về làm nữ vương. Hoàng thượng đọc xong, im lặng đến canh ba, rồi nói: “Đi hay ở, trẫm để nàng chọn. Ở lại, Đại Hy phong nàng làm Nam Chiếu trưởng công chúa.”
- Thay đổi: Danh +12 · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Nam Chiếu trưởng công chúa» · rời cung được: «Về cố quốc lên ngôi nữ vương» (kết thúc kiếp này) hoặc ở lại
- Tranh: Hoàng thượng — Nữ vương Nam Chiếu


### Con gái tội thần

#### Lật lại án cũ (`td_an`) — ✦ Nữ quan thảo chiếu

- Lựa chọn hiện ở hồi cuối: «Tự tay viết bản sớ lật án, không nhờ ai chấp bút» · chi phí: Sức -5
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Bỏ bạc nhờ ông chép»; «Bịa một quê quán»; «Giấu ông ở Tân Giả khố»; «Đưa ông ra khỏi kinh»; «Mua chuộc gia nhân»; «Nhờ người trong cung»; «Dồn sức lấy lòng»; «Lấy lòng Thái hậu»; «Cho người cứu hồ sơ»
- Phá: «Mặc kệ»
- Điều kiện thêm: Lợi thế ≥ 2, Tài từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Bản sớ ngươi viết khiến cả triều không ai cãi nổi một chữ. Án cũ được lật, {foed} bị tống ngục. Rồi Hoàng thượng làm một việc chưa từng có: phong ngươi làm nữ quan thảo chiếu, ngồi bên ngự án chấp bút thánh chỉ. Con gái tội thần năm nào nay viết lời của thiên tử.
- Thay đổi: Danh +15, Tài +4, Tai mắt +2 + hệ quả riêng · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Nữ quan thảo chiếu»
- Tranh: Hoàng thượng — Nữ quan thảo chiếu

#### Kẻ đứng sau màn (`td_ke`) — ✦ Kim bài tra án hậu cung

- Lựa chọn hiện ở hồi cuối: «Xin Hoàng thượng một đêm, nghe hết từ đầu» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Lần theo người giả ấn»; «Hỏi thẳng {foe}»; «Tìm lại người đưa bạc»; «Nhận sổ, giữ kỹ»; «Trình hộp quà»; «Hứa che chở nhà nàng»; «Nhắm vào {n1}»
- Phá: «Thôi, không đào sâu»; «Từ chối: ngươi không tha»
- Điều kiện thêm: Lợi thế ≥ 2, Tâm cơ từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng thượng nghe đến sáng. Kẻ đứng sau màn bị tước hết chức tước, cả nhà {foed} lẫn {n1} cùng chịu tội. Ngài đặt vào tay ngươi một tấm kim bài: “Từ nay hậu cung có án, nàng được tra.” Những ai từng có lỗi bắt đầu tìm đến cung ngươi mà tạ tội trước.
- Thay đổi: Danh +12, Tai mắt +3, Tâm cơ +3 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Người cầm kim bài tra án»
- Tranh: Hoàng thượng — Kim bài tra án hậu cung

#### Người em còn sống (`td_song`) — ✦ Đệ đệ khoác chiến bào

- Lựa chọn hiện ở hồi cuối: «Xin Hoàng thượng cho gặp chàng lính trẻ ấy một lần» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Gửi bạc ra biên»; «Tra xem lái buôn»; «Nói có một người họ xa»; «làm hỏa đầu quân»; «Để em nhận công»; «Khen chàng lính trẻ»; «Chuẩn bị xin ân xá»
- Phá: «Tin vào số mệnh»; «Cho em trốn đi xa»
- Điều kiện thêm: Lợi thế ≥ 2, Sủng từ 35
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Chàng lính trẻ quỳ trước ngự giá, ngẩng lên, và Hoàng thượng nhìn ngươi, rồi nhìn hắn: hai gương mặt giống nhau như hai giọt nước. Ngài không hỏi gì, chỉ ban chiếu: lính phu ấy lập công cứu ải, phong Du kích tướng quân, cho khôi phục họ cũ. Đêm ấy hai chị em khóc trọn một canh.
- Thay đổi: Danh +10, Sủng +6 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Tỷ tỷ của tướng quân»
- Tranh: Hoàng thượng — Đệ đệ khoác chiến bào

#### Thù hay tha (`td_tha`) — ✦ Oan gia giải kết

- Lựa chọn hiện ở hồi cuối: «Đưa {foe} đến bàn thờ cha mẹ ngươi» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Lén gửi bài thuốc»; «Bước ra an ủi»; «Ngăn {maid} lại»; «Trả thư cho {foe}»; «Gửi lễ mừng»; «Nói hết nỗi đau»
- Phá: «Để mặc trời định»; «Chỉ phao tin»; «Giữ thư làm chứng»; «Cảnh cáo nàng»
- Điều kiện thêm: Lợi thế ≥ 1, Đức từ 50
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: {foe} thắp hương trước bài vị cha mẹ ngươi, rồi về khuyên cha tự thú. {foed} dâng sớ nhận tội, xin minh oan cho nhà ngươi trước khi chịu phạt. Hai người con gái của hai nhà thù kết làm tỷ muội. Hoàng thượng nói: “Trẫm chưa thấy ai trả thù đẹp như thế.”
- Thay đổi: Đức +8, Danh +10, Sủng +4 + hệ quả riêng · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Người cởi oan nghiệt»
- Tranh: con gái kẻ thù — Oan gia giải kết


### Cháu gái Thái hậu

#### Quân cờ của cô tổ (`ch_co`) — ✦ Nghĩa nữ của Thái hậu

- Lựa chọn hiện ở hồi cuối: «Quỳ thưa với cô tổ: con không muốn làm quân cờ, con muốn làm con» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Thưa khéo: con còn non»; «Lấy lòng ma ma»; «Từ chối thẳng»; «Nhận thuốc rồi lén đổ»; «Khéo xin tự lo»; «Ngầm bắt tay Hoàng hậu»; «con muốn tự đứng được»
- Phá: «Uống thuốc của cô tổ»
- Điều kiện thêm: Lợi thế ≥ 2, Thái hậu còn sống, với ngươi từ 50, Thái hậu còn sống
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Thái hậu lặng đi, rồi kéo ngươi vào lòng như ngày ngươi còn bé. Hôm sau bà ra ý chỉ: nhận ngươi làm nghĩa nữ, ghi vào ngọc điệp, đổi theo họ của bà. Từ đó ngươi gọi bà là mẫu hậu, và cả hậu cung hiểu Đức Thọ cung chỉ có một người con gái.
- Thay đổi: Thái hậu với ngươi +30, Danh +12 · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Nghĩa nữ của Thái hậu»
- Tranh: Thái hậu — Nghĩa nữ của Thái hậu

#### Thái hậu lâm bệnh (`ch_benh`) — ✦ Tạm cầm phượng ấn

- Lựa chọn hiện ở hồi cuối: «Dâng chén thuốc đã cho lương y thử trước mặt cả cung» · chi phí: Sức -5
- Chuỗi lựa chọn: chọn ít nhất 3 trong: «Xin vào hầu thuốc»; «Tìm thái y giỏi bên ngoài»; «Xin Hoàng thượng phân xử»; «Lén đổi thuốc»; «Tự tay sắc thuốc»; «Ghi nhớ, không nói»; «Đề nghị {hh} đi cùng»; «Mời lương y vào châm cứu»; «Quỳ ngoài điện»
- Phá: «Nhịn»
- Điều kiện thêm: Lợi thế ≥ 2, Y thuật bậc 1 hoặc Tâm cơ từ 45, Thái hậu còn sống
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Chén thuốc của Thái y viện đổi màu trong tay lương y. Cả điện quỳ rạp. Thái hậu khỏi bệnh, việc đầu tiên bà làm là đòi phượng ấn về Đức Thọ cung, rồi trao tạm vào tay ngươi: “Chừng nào ai gia còn sống, lục cung có chuyện thì hỏi con.”
- Thay đổi: Thái hậu với ngươi +15, Danh +12, Tai mắt +2 · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Nhiếp lục cung sự»
- Tranh: Thái hậu — Tạm cầm phượng ấn

#### Hai người cháu (`ch_ho`) — ✦ Song phượng Đức Thọ cung

- Lựa chọn hiện ở hồi cuối: «Nắm tay {v}, cùng quỳ trước Thái hậu» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Nhường {v} dâng trước»; «Đề nghị họ ủng hộ cả hai»; «Gặp Thái hậu giải thích»; «Xin bà cứu {v}»; «Nhường {v}»; «Bắt tay»
- Phá: «Thưa: để nàng tự chịu»; «Từ chối»
- Điều kiện thêm: Lợi thế ≥ 1, {v} có thiện cảm với ngươi từ 25
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Thái hậu nhìn hai đứa cháu quỳ cạnh nhau, bật cười lần đầu sau nhiều năm: “Ai gia sợ nhà mình chia hai, hóa ra lại được đôi phượng.” Bà xin Hoàng thượng ban cho hai người phong hiệu cặp đôi, cùng ra vào Đức Thọ cung. Từ đó trong cung, đụng một người là đụng cả hai.
- Thay đổi: Thái hậu với ngươi +15, Danh +8, Đức +3 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Song phượng Đức Thọ cung»
- Tranh: Thái hậu — Song phượng Đức Thọ cung

#### Bí mật năm xưa (`ch_bi`) — ✦ Cố nhân còn tại thế

- Lựa chọn hiện ở hồi cuối: «Đưa lão cung nữ đến gặp Thái hậu lúc không có ai» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Giữ kỹ, không cho ai biết»; «Tìm gặp lão cung nữ»; «Biếu Tổng quản»; «Dò ngược lại»; «Thưa thật với bà»; «Tìm cách lấy lại»; «Đưa lão cung nữ về bên mình»
- Phá: «Chối»; «Đốt ngay»
- Điều kiện thêm: Lợi thế ≥ 2, Đức từ 40, Thái hậu còn sống
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Lão cung nữ gỡ khăn: chính là vị phi tần năm xưa được cho là đã chết, sống sót nhờ Thái hậu lén thả đi. Hai bà lão nhìn nhau, khóc như hai thiếu nữ. Bí mật hóa ra là một ân tình. Thái hậu nói với ngươi: “Ai gia nợ con một mạng của tình xưa.”
- Thay đổi: Thái hậu với ngươi +20, Đức +5, Danh +6 · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Người giữ ân tình Đức Thọ cung»
- Tranh: Thái hậu — Cố nhân còn tại thế


### Con gái thầy đồ nghèo

#### Danh hiệu Tài nữ (`thd_tho`) — ✦ Nữ học sĩ Hàn lâm

- Lựa chọn hiện ở hồi cuối: «Xin đề bài thơ ấy lên vách Hàn lâm viện» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Viết thư cảm tạ»; «Xin Hoàng thượng thứ lỗi»; «Thức đêm luyện thơ»; «Mời thầy Hàn lâm»; «Ứng tác ngay»; «Từ chối, báo Hàn lâm viện»; «Đối ngay»; «Đem nộp Hàn lâm viện»
- Phá: «Mua đề»
- Điều kiện thêm: Lợi thế ≥ 2, Thi bậc 2 hoặc Tài từ 55
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Bài thơ về tuyết quê nghèo được khắc lên vách Hàn lâm viện, cạnh thơ của các bậc tiền triều. Hoàng thượng phá lệ phong ngươi Nữ học sĩ, cho dạy thơ các công chúa. Ở quê, người cha nghèo của ngươi được quan huyện đến tận nhà vái chào.
- Thay đổi: Danh +12, Tài +5 · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Nữ học sĩ Hàn lâm viện»
- Tranh: Hoàng thượng — Nữ học sĩ Hàn lâm

#### Di cảo của cha (`thd_sach`) — ✦ Sách cha vào Quốc Tử Giám

- Lựa chọn hiện ở hồi cuối: «Dâng kèm lời bình của chính ngươi ở từng chương» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Đọc kỹ, chép thêm bản»; «Từ chối»; «Cho xem»; «Dâng chương sách về đê điều»; «Giấu sách ở Phụng Tiên điện»; «Để sách giả làm mồi»
- Phá: «Nhận quà, nói sách đã mất»; «Nhận»
- Điều kiện thêm: Lợi thế ≥ 2, Tài từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng thượng đọc bộ sách ba đêm liền. Kẻ quyền thế bị chỉ mặt bị cách chức tra xét; sách cha ngươi được khắc in, đem dạy ở Quốc Tử Giám, cha được truy tặng Thái phó. Trên trang đầu, cạnh tên cha, có thêm một dòng: “Con gái chú giải.”
- Thay đổi: Danh +14, Tài +3, Đức +3 · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Người chú giải sách Thái phó»
- Tranh: Hoàng thượng — Sách cha vào Quốc Tử Giám

#### Học trò của cha (`thd_tro`) — ✦ Trò cũ đỗ Trạng nguyên

- Lựa chọn hiện ở hồi cuối: «Xin Hoàng thượng mở một kỳ ân khoa, tự ngài ra đề» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Gửi bạc giúp hắn»; «Dò xem lời hắn có thật»; «Khuyên Hoàng thượng phúc khảo»; «Giữ kín, gom chứng cứ»; «Mua chuộc người giữ kho»; «Nhờ học sĩ Hàn lâm»; «Mời thầy thuốc, giấu hắn»; «Gửi lời động viên»
- Phá: «Khuyên hắn về quê»; «Không xen vào»
- Điều kiện thêm: Lợi thế ≥ 2, Danh từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Kỳ ân khoa do chính Hoàng thượng ra đề. {n1} đỗ Trạng nguyên, cưỡi ngựa dạo phố ba ngày. Ngày vào triều, hắn quỳ hướng về hậu cung mà lạy, và cả triều biết vị Trạng nguyên mới là người của ai. Kẻ mua đề năm trước bị lưu đày.
- Thay đổi: Danh +12, Tai mắt +2, Sủng +4 · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Ân sư của Trạng nguyên»
- Tranh: Hoàng thượng — Trò cũ đỗ Trạng nguyên

#### Thầy giáo trong cung (`thd_hoc`) — ✦ Nữ sư của Đông cung

- Lựa chọn hiện ở hồi cuối: «Dẫn bọn trẻ ra Ngự hoa viên, học bằng những gì chúng thấy» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Dạy bằng chuyện kể»; «Kèm riêng»; «Mời {v} đến dự giờ»; «Kèm thêm cho con nàng»; «Để đứa chậm nhất đọc»; «Đối xử như mọi đứa»; «Nhận lỗi, xin chăm sóc»
- Phá: «Dạy nghiêm, phạt đứng»; «Báo với mẹ nó»
- Điều kiện thêm: Lợi thế ≥ 2, Tài từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Ngày khảo hạch, đứa chậm nhất đứng lên đọc trôi chảy cả một chương. Hoàng thượng vỗ án khen, rồi phong ngươi làm nữ sư của Thượng thư phòng, ngày ngày dạy cả hoàng tử lớn nhất. Các bà mẹ từng nghi ngờ ngươi nay mang lễ đến xin gửi con.
- Thay đổi: Danh +12, Tài +3, Đức +4 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Nữ sư Thượng thư phòng»
- Tranh: Hoàng thượng — Nữ sư của Đông cung


### Cung nữ tuyển vào cung

#### Bí mật của chủ nhân (`cnv_chu`) — ✦ Chủ tớ thành tỷ muội

- Lựa chọn hiện ở hồi cuối: «Quỳ xin chủ nhân để nô tỳ gánh cùng» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Hỏi chủ có cần giúp»; «Quỳ xuống: nô tỳ không thấy gì»; «Lén lấy một ít đem hỏi»; «Từ chối, báo chủ»; «Lén đổ thuốc đi»; «Quỳ xin chủ đừng làm»; «Thưa khéo cho chủ»; «Một mình nhận hết»
- Phá: «Bán một tin vặt»; «Khai thật với Nội vụ phủ»
- Điều kiện thêm: Lợi thế ≥ 2, Chủ tin từ 50
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: {mis} ôm lấy ngươi mà khóc: gói thuốc ấy là để tự hại mình, vì một nỗi oan không ai biết. Ngươi ở bên chủ suốt mùa đông, đến khi nàng đứng dậy được. Ngày xuân, nàng nhận ngươi làm nghĩa muội và tự mình tiến cử ngươi lên Hoàng thượng.
- Thay đổi: Danh +6, Chủ tin +20 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Nghĩa muội của chủ nhân»
- Tranh: chủ nhân — Chủ tớ thành tỷ muội

#### Chị em đồng hương (`cnv_ban`) — ✦ Tỷ muội cùng vào Thượng cung

- Lựa chọn hiện ở hồi cuối: «Đưa chiếc khăn có thêu tên Thu Cúc ra trước chưởng sự» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Đến xin cho nàng»; «Lặng lẽ dò xem ai lấy vòng»; «Rình bắt Thu Cúc»; «Nói thẳng với Thu Cúc»; «Lén mang thuốc»; «Bênh bạn»; «Lấy lại khăn»; «Báo trước với chưởng sự»; «Tìm người làm chứng»
- Phá: «Không dám»; «Thưa không rõ»
- Điều kiện thêm: Lợi thế ≥ 2, Tài từ 30 hoặc Tai mắt từ 1
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Chiếc khăn lật ngược cả phiên xử. Xuân Đào được minh oan, và chưởng sự Thượng cung cục, người ngồi nghe từ đầu, xin cả hai chị em về làm việc dưới trướng bà: một người coi kim chỉ, một người coi sổ sách. Từ cô gái giặt áo, ngươi thành người được cả lục cục kính nể.
- Thay đổi: Danh +6 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Nữ quan Thượng cung cục»
- Tranh: cung nữ thân tín — Tỷ muội cùng vào Thượng cung

#### Ánh mắt nơi hành lang (`cnv_mat`) — ✦ Phá lệ phong Quý nhân

- Lựa chọn hiện ở hồi cuối: «Hát lại khúc hát nơi hậu viện, chỉ cho một người nghe» · chi phí: Sức -4
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «nhìn ngài một khoảnh khắc»; «Xin chủ tiến cử»; «Pha trà ngài thích»; «Hát tiếp»; «Nhờ người báo cho Hoàng thượng»; «Thưa: nô tỳ chỉ làm phận sự»
- Phá: «Ngầm nhận lời»; «Tránh mặt»
- Điều kiện thêm: Lợi thế ≥ 2, Hoàng thượng để ý từ 25
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Khúc hát vừa dứt, Hoàng thượng đứng sau rặng trúc bước ra. Sáng hôm sau, thánh chỉ phá lệ: cung nữ {me} không qua Đáp ứng, Thường tại, phong thẳng Quý nhân, ban hiệu theo khúc hát. Cả Nội vụ phủ lật sổ ba đời cũng không tìm ra tiền lệ.
- Thay đổi: Danh +8 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Quý nhân phá lệ»
- Tranh: Hoàng thượng — Phá lệ phong Quý nhân

#### Ma ma dạy việc (`cnv_ma`) — ✦ Kế nhiệm Lưu ma ma

- Lựa chọn hiện ở hồi cuối: «Xin ma ma cho học nốt bài cuối: cách giữ chìa khóa kho» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Tập đến khi được»; «Báo ma ma»; «Chăm bà»; «Gửi thuốc rồi về»; «Tìm người làm chứng»; «Không động đến»; «Giữ kín cho ma ma»; «Khuyên ma ma tự nhận»
- Phá: «Lén đổ bớt trà»; «Cất giùm vào tủ»
- Điều kiện thêm: Lợi thế ≥ 2, Chủ tin từ 40 hoặc Đức từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Lưu ma ma trao cho ngươi chùm chìa khóa đã đeo bên hông bà bốn mươi năm: “Kho này, sổ này, người này, từ nay là của con.” Ngươi thành chưởng sự cô cô trẻ nhất Nội vụ phủ từ trước đến nay; những kẻ từng ghen ngươi nay phải xin ngươi phân việc.
- Thay đổi: Danh +6, Chủ tin +10 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Chưởng sự trẻ nhất Nội vụ phủ»
- Tranh: cung nữ thân tín — Kế nhiệm Lưu ma ma


### Tuyến chung

#### Người thân thất lạc (`s_than`) — ✦ Từ mẫu chưa khuất

- Lựa chọn hiện ở hồi cuối: «Hỏi hắn câu cuối: mẹ ta có hát ru bài gì» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Hỏi những chuyện chỉ người nhà biết»; «Đề phòng, theo dõi»; «Nhận»; «Phản đòn: hỏi ai đưa hắn vào»; «Đứng ra bảo lãnh»; «Tha thứ, cho hắn làm tai mắt»
- Phá: «Cho là trùng hợp»
- Điều kiện thêm: Lợi thế ≥ 2, Tai mắt từ 1 hoặc Đức từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hắn hát được bài ru ấy, và hắn biết thêm một điều không ai biết: mẹ ngươi chưa chết trong trận lụt, bà sống ở một am nhỏ ngoài kinh. Hoàng thượng nghe chuyện, sai kiệu đón bà vào cung một ngày. Ngươi gục đầu vào lòng mẹ mà khóc như năm lên sáu.
- Thay đổi: Đức +5, Danh +6, Sủng +6 · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Người đoàn viên»
- Tranh: Hoàng thượng — Từ mẫu chưa khuất

#### Bức mật thư (`s_thu`) — ✦ Nắm thóp kẻ bề trên

- Lựa chọn hiện ở hồi cuối: «Đặt cả hai bức thư cạnh một bản sớ cũ của Trung cung» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Giữ thư, dò nét chữ»; «Báo ngay cho {v2}»; «Theo dõi cung nữ ấy»; «Cho người canh thuốc»; «Ngầm cho nàng biết»; «Đề phòng, đổi người hầu»; «Đưa cả hai thư cho Tổng quản»; «Chuẩn bị tố»
- Phá: «Mặc kệ, đây không phải chuyện»
- Điều kiện thêm: Lợi thế ≥ 2, Tâm cơ từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Nét chữ trong thư không phải của {v}: nàng chỉ là người chép lại. Bàn tay viết thư thật ở cao hơn nhiều. Ngươi không tố ai cả; ngươi chỉ gửi đến người ấy một bản chép. Từ hôm đó, mọi mưu nhắm vào ngươi trong hậu cung đều lặng lẽ dừng lại.
- Thay đổi: Tâm cơ +4, Tai mắt +3, Danh +6 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Người nắm thóp kẻ đứng trên»
- Tranh: cung nữ thân tín — Nắm thóp kẻ bề trên

#### Đêm cháy Tây cung (`s_hoa`) — ✦ Cứu ngự họa tiên đế

- Lựa chọn hiện ở hồi cuối: «Quay lại gian trong của Tây cung lấy cuộn tranh» · chi phí: Sức -8
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Dẫn người của mình đi cứu»; «Giấu nàng, hỏi kỹ»; «Đưa nàng lên Tổng quản»; «Đưa người làm chứng»; «Bắt hắn khai»; «Đề nghị dùng bạc»; «Tìm phần sổ sót lại»
- Phá: «Thôi, chuyện cũ đã cháy»
- Điều kiện thêm: Lợi thế ≥ 2, Sức từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Ngươi ôm ra khỏi đám cháy cuộn chân dung tiên hoàng hậu, mẫu thân của Hoàng thượng, bức tranh duy nhất còn lại. Tóc ngươi cháy sém, tay phồng rộp. Hoàng thượng ôm cuộn tranh mà không nói được lời nào; đêm ấy ngài ngồi bên giường ngươi đến sáng.
- Thay đổi: Sủng +12, Danh +8 · Ngự tứ: Ngọc bội ngự ban · Danh hiệu: «Người cứu ngự họa»
- Tranh: Hoàng thượng — Cứu ngự họa tiên đế

#### Sứ thần phương Tây (`s_su`) — ✦ Lưu danh sử nước Tây

- Lựa chọn hiện ở hồi cuối: «Tặng sứ thần một bài thơ và nhờ ông dịch» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Đáp lễ theo lối của họ»; «Dâng lên Thái hậu»; «Vạch ngay giữa yến»; «Lặng lẽ báo Lễ bộ»; «đổi lấy y thuật và lịch pháp»; «Mời sứ thần sửa»; «Đứng ra bảo đảm»
- Phá: «Giữ làm của riêng»
- Điều kiện thêm: Lợi thế ≥ 2, Tài từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Sứ thần về nước mang theo bài thơ của ngươi và một bức chân dung do họa sĩ trong đoàn vẽ. Mười năm sau, sứ đoàn khác đến, dâng lên Hoàng thượng một cuốn sách in ở phương Tây: trang đầu là chân dung ngươi, chép rằng “Hoàng phi phương Đông, người thông tuệ nhất chúng tôi từng gặp”.
- Thay đổi: Danh +14, Tài +3 · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Hoàng phi trong sử nước Tây»
- Tranh: Hoàng thượng — Lưu danh sử nước Tây

#### Mùa dịch đậu mùa (`s_dich`) — ✦ Tên khắc miếu Dược Vương

- Lựa chọn hiện ở hồi cuối: «Tự chủng đậu cho mình trước để mọi người tin» · chi phí: Sức -8
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Đóng cửa cung mình»; «Đến Thái y viện xin giúp»; «Dâng phương lên Thái y viện»; «Thử cho người trong cung mình»; «Gửi thuốc và người chăm»; «Mời Thái y khám công khai»; «Xin vào hầu»; «Đứng ra điều phối»; «Góp bạc mua thuốc»
- Phá: «Tránh xa»
- Điều kiện thêm: Lợi thế ≥ 2, Y thuật bậc 1 hoặc Đức từ 50
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Ngươi sốt ba ngày rồi khỏi, trên tay chỉ còn một vết sẹo nhỏ. Cả kinh thành đổ đi chủng đậu theo phương của ngươi; mùa dịch tắt trước Tết. Hoàng thượng cho dựng miếu Dược Vương, trên bia khắc tên ngươi cạnh các danh y, phong hiệu “Từ Tế”.
- Thay đổi: Đức +6, Danh +14, Sủng +5 · Ngự tứ: Biển ngự bút «Trung hiếu lưỡng toàn» · Danh hiệu: «Phong hiệu Từ Tế»
- Tranh: Thái y — Tên khắc miếu Dược Vương

#### Cám dỗ (`s_tinh`) — ✦ Khúc thơ tiễn biên ải

- Lựa chọn hiện ở hồi cuối: «Viết cho {man} một bài thơ tiễn, nhờ Hoàng thượng chuyển» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 3 trong: «Cảm ơn rồi đi ngay»; «Đốt»; «Từ chối»; «Dồn sức giành lại Hoàng thượng»; «Quát hắn, dọa tố»; «Từ chối, chọn con đường trong cung»; «Xin hắn rời cung»
- Phá: «Đứng lại trò chuyện»; «Giữ lại»; «Đến, chỉ để nói lời từ biệt»; «Tìm an ủi bên {man}»
- Điều kiện thêm: Lợi thế ≥ 1, Đức từ 50
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng thượng đọc bài thơ tiễn trước rồi mới sai người chuyển đi. {man} xin ra biên ải, về sau lập công lớn. Đêm ấy ngài nói: “Nàng có thể giấu trẫm, mà nàng lại đưa cho trẫm đọc.” Từ đó, lời gièm nào về ngươi đến tai ngài cũng bị gạt đi.
- Thay đổi: Sủng +10, Đức +5, Danh +4 · Ngự tứ: Ngọc bội ngự ban · Danh hiệu: «Người Hoàng thượng không nghi»
- Tranh: Hoàng thượng — Khúc thơ tiễn biên ải

#### Lão thái giám (`s_thay`) — ✦ Tai mắt lão Tổng quản

- Lựa chọn hiện ở hồi cuối: «Ngồi bên giường ông, đọc lại cho ông nghe cuốn sổ» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Nghe lời, đi lối khác»; «Hỏi vì sao»; «Giúp»; «Ghi lòng tạc dạ»; «Hỏi phi tần ấy là ai»; «Đứng ra nói giúp»; «Giữ kín»; «Đến thăm, nhận sổ»
- Phá: «Từ chối khéo»; «Dùng ngay»
- Điều kiện thêm: Lợi thế ≥ 2, Tai mắt từ 1 hoặc Tâm cơ từ 45
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Trước lúc nhắm mắt, lão Tổng quản dặn từng người một: các thái giám ở mười hai cung, ba cửa thành, Ngự thiện phòng, Kính sự phòng. “Từ nay các ngươi nghe nàng.” Tai mắt ba đời vua của ông, nay là của ngươi.
- Thay đổi: Tai mắt +4, Tâm cơ +4, Danh +4 · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Người kế thừa lão Tổng quản»
- Tranh: Tổng quản thái giám — Tai mắt lão Tổng quản

#### Kẻ thù hóa tri kỷ (`s_ban`) — ✦ Kim lan lật đổ {v2}

- Lựa chọn hiện ở hồi cuối: «Hẹn {v} uống rượu thề dưới gốc hải đường» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Đỡ lời cho cả {v}»; «Báo cho {v}»; «Mời trà, nói chuyện thật lòng»; «Giúp {v} bắt kẻ gài»; «Đỡ lời»; «Bắt tay»
- Phá: «Chỉ lo cho mình»; «Giữ kín»; «Tiếp khách sáo»; «Mặc kệ»; «Từ chối»
- Điều kiện thêm: Lợi thế ≥ 2, {v} có thiện cảm với ngươi từ 20
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Dưới gốc hải đường, hai người từng là kẻ thù uống chung một chén rượu thề. Ba tháng sau, mọi mưu của {v2} bị chính hai người lật ra trước mặt Hoàng thượng. Cả hậu cung kháo nhau: chọc vào một người là chọc vào cả đôi.
- Thay đổi: Danh +10, Tâm cơ +3 + hệ quả riêng · Ngự tứ: Trâm ngọc như ý ngự tứ · Danh hiệu: «Tỷ muội kim lan»
- Tranh: phi tần trong truyện — Kim lan lật đổ {v2}


### Giữa đời

#### Gây dựng thế lực (`st_the`) — ✦ Một hô trăm ứng

- Lựa chọn hiện ở hồi cuối: «Mở tiệc ở cung ngươi, mời mọi người từng chịu ơn ngươi» · chi phí: Sức -4, Bạc -80
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Nhận lời kết nghĩa»; «Chăm lo cho họ»; «Đáp lễ, hứa nâng đỡ»; «Gặp từng người giải thích»; «Chia cho kẻ hầu và đồng minh»; «Đứng ra bảo vệ»
- Phá: «Giữ lại»; «Để luật xử»
- Điều kiện thêm: Lợi thế ≥ 2, ít nhất 2 phi tần có thiện cảm với ngươi từ 40
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Tiệc đêm ấy đông đến mức phải bày thêm bàn ra sân. Phi tần, cung nữ, thái giám, cả người nhà các quan đều đến. Hoàng thượng đi ngang, đứng ở cửa nhìn rất lâu, rồi cười: “Trẫm chưa từng thấy ai có nhiều người thương đến vậy.” Từ đó, việc gì trong cung ngươi nói một câu là có trăm người làm.
- Thay đổi: Danh +12, Tai mắt +3, Sủng +5 + hệ quả riêng · Ngự tứ: Bộ diêu «Hải đường xuân thụy» ngự tứ · Danh hiệu: «Chủ một phe lục cung»
- Tranh: Hoàng thượng — Một hô trăm ứng

#### Con đường của con (`st_con`) — ✦ Hoàng thượng tự tay dạy con

- Lựa chọn hiện ở hồi cuối: «Để con tự dâng Hoàng thượng bài văn nó viết» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 2 trong: «Lão Hàn lâm nghiêm khắc»; «Tiến sĩ trẻ»; «Tự thức canh»; «Tăng người canh»; «Đêm trước kèm con»; «Để chúng chơi»; «Xin Hoàng thượng làm lễ nhỏ»; «Tìm kẻ tung tin»
- Phá: «Cấm»
- Điều kiện thêm: Lợi thế ≥ 2, có hoàng tử được Hoàng thượng thương từ 40, có hoàng tử
- Xác suất khi đủ điều kiện: 15 % × 0,9 = 13,5 %
- Kết quả: Hoàng thượng đọc bài văn của {k}, rồi gác cả tấu chương, tự tay cầm bút sửa từng chữ cho con. Từ hôm ấy, mỗi tối ngài gọi {k} vào ngự thư phòng. Triều thần nhìn nhau: chưa hoàng tử nào được vua tự dạy như thế.
- Thay đổi: Danh +10, Sủng +6 + hệ quả riêng · Ngự tứ: Ngọc bội ngự ban · Danh hiệu: «Mẫu thân của hoàng tử được vua tự dạy»
- Tranh: hoàng tử — Hoàng thượng tự tay dạy con

#### Ngôi Đông cung (`st_dong`) — ✦ Mật chiếu sau biển Chính đại quang minh

- Lựa chọn hiện ở hồi cuối: «Đêm ấy không xin gì, chỉ ngồi nghe ngài nói về giang sơn» · chi phí: Sức -3
- Chuỗi lựa chọn: chọn ít nhất 3 trong: «Thưa: chọn người hiền»; «Nhận lời»; «Cho con cưỡi ngựa bắn cung»; «Đưa con đến hầu Thái hậu»; «Dâng lễ lên Đức Thọ cung»; «Mời thầy giỏi kèm riêng»; «Tự dạy con»; «Đổi người nấu, giăng bẫy»; «Tự nấu cho con»
- Phá: «Lật lại chuyện con nàng»
- Điều kiện thêm: Lợi thế ≥ 3, có hoàng tử được thương từ 50, Sủng từ 50, có hoàng tử
- Xác suất khi đủ điều kiện: 10 % × 0,9 = 9,0 %
- Kết quả: Canh tư, Hoàng thượng một mình trèo lên điện Càn Thanh, đặt một hộp gấm sau tấm biển “Chính đại quang minh”. Sáng ra ngài chỉ nói với ngươi: “Nàng đã nghe trẫm cả đêm mà không xin gì. Trẫm biết phải viết tên ai.” Tên trong mật chiếu là {k}.
- Thay đổi: Danh +10, Sủng +8 + hệ quả riêng · Ngự tứ: Trâm đông châu ngự tứ · Danh hiệu: «Mẫu thân của Thái tử trong mật chiếu»
- Tranh: Hoàng thượng — Mật chiếu sau biển Chính đại quang minh
