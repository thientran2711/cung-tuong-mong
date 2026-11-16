# Mọi nghĩa trong game → một tranh riêng (review/act-pics2, sếp 15/11: "MỖI NGHĨA KHÁC NHAU = MỘT TRANH RIÊNG")

Nguồn: quét tĩnh toàn bộ mã (acorn, 93 module: mọi `log(...)`, mọi chuỗi trả về/`+=` có câu, mọi thẻ việc `{n,c,o,run}`/`A(id,tên)`/`pbtn`, mọi lựa chọn sự kiện `{n,fx}`) → chạy câu mẫu qua đúng hàm chọn tranh của game (j87 `kbkCands`, j79 `kitActKey`) để biết tranh hiện tại → áp luật nghĩa `dev/figwork/acts/meanings.py` (một luật = một nghĩa = một tranh `img/act-<khóa>.webp`; thứ tự luật = thứ tự game dùng trong ACTS.json `log`). Công cụ: `dev/figwork/acts/meanings_check.py`, `meanings_table.py`.

**Tổng: 713 nghĩa** · giữ tranh đã có đúng nghĩa: **96** · **tranh mới cần vẽ: 617** · trước khi sửa: 612 nghĩa đang mượn tranh chung/khác nghĩa.

Câu không thành nghĩa riêng (không cần tranh): chữ nút điều hướng (Thôi, Đi, Đợi buổi sau…), tên đồ/xuất thân/phẩm, dòng chỉ có số (Sủng +3…), và **câu thứ hai trở đi trong cùng một dòng nhật ký** (phản ứng/kết quả: "Lan Tần cảm động.", "Hắn giấu vội vào tay áo."…): j87 gộp vào dòng của câu đầu, một dòng = một việc = một tranh. Danh sách các mẫu này ở đầu `meanings.py` (khóa "-").

Cột "tranh hiện tại" = tranh game đang chọn cho câu mẫu (Sổ tuần, trang Việc của ngươi), "(thẻ)" = tranh trên thẻ việc. Khóa có cảnh để trống = giữ tranh đã có.

| # | khóa tranh (img/act-…) | nghĩa (câu / tên thẻ, X = tên người, N = số) | tranh hiện tại | tranh mới: cảnh |
|---|---|---|---|---|
| 1 | `biet-so-thich-ht` | Ngươi biết được | act-cat-giao-thiep | **MỚI** — Phi tần đọc mảnh giấy ghi chép sở thích Hoàng thượng, bên cạnh là món điểm tâm và bình hoa ngài thích |
| 2 | `to-vuot-pham` | Ngươi tố X vượt phẩm · Ngươi tố X vượt phẩm, Hoàng hậu bỏ qua · Ngươi tố X vượt phẩm, Hoàng thượng bỏ qua · Ngươi tố X vượt phẩm, ngươi · (+6) | act-cat-hai-nguoi, act-to-giac | **MỚI** — Phi tần chỉ chiếc trâm vượt phẩm trên đầu người khác, trước Hoàng hậu |
| 3 | `say-thai` | Ngươi sảy thai · Ngươi động thai, sảy mất đứa bé · X sảy thai · X động thai, sảy mất đứa bé | ev-hai-thai, act-cat-giao-thiep | **MỚI** — Phi tần nằm giường, thái y lắc đầu, cung nữ cúi đầu, chiếc nôi trống |
| 4 | `uy-hiep-thanh` | Hắn run sợ, nộp N lạng bạc xin ngươi giữ kín | act-cat-buon-ban | **MỚI** — Thái giám run sợ quỳ dâng túi bạc, phi tần cầm lá thư bằng chứng |
| 5 | `uy-hiep-khong-thanh` | Hắn cứng cổ không chịu, từ nay ôm hận ngươi | act-cat-giao-thiep | **MỚI** — Thị vệ trẻ đứng thẳng khoanh tay từ chối, phi tần cầm lá thư đứng đối diện |
| 6 | `khoi-benh` | Bệnh đỡ, còn X · Ngươi khỏi bệnh · X khỏi bệnh | ev-benh-tat | **MỚI** — Phi tần ngồi dậy bên cửa sổ, nắng, bát thuốc đã cạn |
| 7 | `tra-hai-nhi` | Đêm “lâm bồn”, bà đỡ lén đưa vào một hài nhi từ ngoài cung | act-cat-di-lai | **MỚI** — Đêm, bà đỡ ôm một hài nhi quấn khăn lẻn qua cửa sau phòng sinh |
| 8 | `cha-thang-tran` | Tin thắng trận từ biên ải | ev-thang-tran | **MỚI** — Kỵ binh mang cờ thắng trận phi qua cổng thành, dân chúng reo đón |
| 9 | `ket-minh` | Kết minh · Ngươi và X kết thành X · Ngươi và ngươi kết thành X · Nhận lời · (+2) | act-cat-giao-thiep, act-ket-giao | **MỚI** — Hai phi tần nắm tay nhau trước bàn thờ, thề kết minh |
| 10 | `gia-say-thai` | Ngươi sai người bỏ xạ hương vào thuốc của X; X nhân đó giả sảy thai, t · Ngươi sai người bỏ xạ hương vào thuốc của X; ngươi nhân đó giả sảy tha · Ngươi sai người bỏ xạ hương vào thuốc của ngươi; X nhân đó giả sảy tha · Ngươi sai người bỏ xạ hương vào thuốc của ngươi; ngươi nhân đó giả sảy · (+2) | ev-hai-thai | **MỚI** — Phi tần giả thai nằm sau màn, cung nữ bưng bát thuốc ra, thái y cúi đầu (vở kịch kết thúc) |
| 11 | `vo-nghe` | Mời thầy cưỡi ngựa bắn cung · Mời thầy cưỡi ngựa bắn cung dạy X | act-vo-nghe, act-vo-nghe(thẻ) | giữ |
| 12 | `moi-thay-day-nghe` | Mời danh sư vào cung dạy · Mời thầy dạy nghệ | act-day-con-hoc, act-day-con-hoc(thẻ) | **MỚI** — Một nữ nhạc sư đặt cây đàn trước đứa trẻ, mẹ ngồi xem |
| 13 | `ba-do-bi-bat` | Bà đỡ do X cài vào cung X bị bắt quả tang · Bà đỡ do X cài vào định tráo hài nhi bằng một con mèo lột da · Bà đỡ do ngươi cài vào cung X bị bắt quả tang | act-cat-di-lai, ev-con-tre-2 | **MỚI** — Thị vệ giữ tay bà đỡ đang ôm chiếc giỏ phủ khăn ở cửa sau phòng sinh, đêm |
| 14 | `noi-trong-yeu-vat` | Cả cung đồn ngươi sinh ra yêu vật · XNgươi tỉnh lại thì bên cạnh là một con mèo chết lột da · XX lâm bồn, bên cạnh chỉ có một con mèo chết lột da; cả cung đồn nàng  · XXNgươi tỉnh lại thì bên cạnh là một con mèo chết lột da · (+1) | ev-con-tre-2, act-cat-di-lai | **MỚI** — Chiếc nôi chạm trống phủ khăn đỏ trong phòng sinh tối, các cung nữ lùi lại sợ hãi (không thấy xác vật) |
| 15 | `bi-bat-gap-luc-ruong` | Bị cung nhân bắt gặp · Cung nhân của Hoàng hậu X bắt gặp ngươi lục rương · Cung nhân của X bắt gặp ngươi lục rương · Cung nhân của ngươi bắt gặp ngươi lục rương | ev-hinh-phat, ev-cung-nhan | **MỚI** — Cung nữ cầm đèn đứng ở cửa, phi tần đang mở rương áo người khác quay lại |
| 16 | `bi-bat-gap` | Bị bắt gặp | act-cat-giao-thiep | **MỚI** — Thái giám cầm đèn bắt gặp phi tần và nam nhân đứng gần nhau sau hòn non bộ |
| 17 | `luc-duoc-thu` | Lục được thư từ của X | act-cat-giao-thiep | **MỚI** — Phi tần lấy ra xấp thư buộc dây từ đáy rương |
| 18 | `thai-da-lo` | Bụng đã lộ, cả cung biết ngươi có thai · X có thai đã lộ | ev-sinh-no | **MỚI** — Phi tần mang thai bụng đã rõ đi dạo vườn, các phi tần khác nhìn theo |
| 19 | `biet-co-thai` | Mấy hôm sau ngươi biết mình có thai; ngày tháng trùng đêm thị tẩm | ev-hoang-de-dem | **MỚI** — Phi tần đặt tay lên bụng, nhìn cuốn lịch trên bàn, vẻ lo nghĩ |
| 20 | `can-gian` | Can gián thẳng thắn | act-cat-giao-thiep | **MỚI** — Phi tần đứng thẳng tâu lời can gián, Hoàng thượng ngồi long ỷ nhíu mày |
| 21 | `noi-do-vien-quan` | Nói đỡ cho viên quan | act-cat-giao-thiep | **MỚI** — Phi tần nói đỡ cho một viên quan đang quỳ ngoài điện, túi bạc trên bàn nàng |
| 22 | `khong-ban-chinh-su` | “Hậu cung không bàn chính sự” | act-cat-giao-thiep | **MỚI** — Phi tần khép tấu chương lại, đặt sang bên, dâng chén trà cho Hoàng thượng |
| 23 | `cha-thua-tran` | Cha ngươi thua một trận ở Nhạn Môn quan | act-cat-giao-thiep | **MỚI** — Lá cờ tướng rách trên ải Nhạn Môn trong gió bụi, quân lính rút về |
| 24 | `nam-chieu-chien` | Chiến tranh với Nam Chiếu · Nam Chiếu thua trận | act-cat-giao-thiep, ev-bien-ai-2 | **MỚI** — Hai đạo quân dàn trận trước núi rừng phương nam, cờ hai nước |
| 25 | `nam-chieu-thang` | Nam Chiếu thắng trận nhờ tin ngươi gửi về · Đại Hy cầu hòa, cố quốc gửi vàng bạc tạ ơn | ev-thang-tran, act-cat-buon-ban | **MỚI** — Sứ giả Nam Chiếu dâng rương vàng bạc tạ ơn trước cổng cung |
| 26 | `dung-ve-dai-hy` | Ngươi đứng hẳn về phía Đại Hy, cả triều kính phục | act-cat-trieu-chinh | **MỚI** — Công chúa Nam Chiếu cúi đầu trước Hoàng thượng giữa triều, quan lại gật đầu |
| 27 | `trieu-than-nghi` | Cả triều nghi ngươi, nhưng không bắt được chứng cứ · Triều thần nghi ngươi hai lòng | act-cat-trieu-chinh | **MỚI** — Các đại thần chụm đầu bàn tán trong triều, liếc về phía hậu cung |
| 28 | `kham-cung` | Cung Chính ti khám cung X, tìm thấy X; tra ra do X cài vào · Cung Chính ti khám cung X, tìm thấy X; tra ra do ngươi cài vào · Cung Chính ti khám cung ngươi, tìm thấy X; tra ra do X cài vào · Cung Chính ti khám cung ngươi, tìm thấy X; tra ra do ngươi cài vào · (+2) | act-cat-giao-thiep, act-cat-di-lai | **MỚI** — Quan Cung Chính ti cùng thị vệ lục soát tẩm cung, giơ lên món đồ tìm được |
| 29 | `hh-tra-thu` | Hoàng hậu hận ngươi hơn · Không còn ai che chở, Hoàng hậu bắt đầu trả thù | act-cat-giao-thiep | **MỚI** — Hoàng hậu ngồi trên ghế phượng nhìn xuống lạnh lùng (mặt bình thản), phi tần đứng dưới cô độc |
| 30 | `su-than-cau-hon` | Hoàng thượng muốn thuận mối này · Hòa thân Bắc Địch · Sứ thần Bắc Địch vào kinh dâng ngựa quý, xin cưới một vị công chúa đã  | ev-su-than-2, ev-con-tre-2 | **MỚI** — Sứ thần Bắc Địch áo lông dắt ngựa quý vào điện, cúi chào Hoàng thượng |
| 31 | `su-than-ve` | XSứ thần Bắc Địch về nước tay không | ev-su-than-2 | **MỚI** — Đoàn sứ Bắc Địch cưỡi ngựa ra khỏi cổng thành, không có kiệu hoa |
| 32 | `het-han-tra-xet` | Hết hạn tra xét | act-cat-di-lai | **MỚI** — Quan Hình bộ gấp hồ sơ, đặt dấu niêm, án khép lại |
| 33 | `kho-ho-so-chay` | Kho hồ sơ Hình bộ bốc cháy trong đêm · Một chứng cứ án cũ mất | ev-hoa-hoan, act-cat-giao-thiep | **MỚI** — Kho hồ sơ bốc cháy trong đêm, quan lại xách nước |
| 34 | `thoat-than-no-ty` | Không ai còn dám gọi ngươi là nô tỳ · Ngươi đã là X | act-cat-giao-thiep, ev-cung-nhan | **MỚI** — Cựu cung nữ nay mặc áo phi tần, các cung nữ cúi chào nàng |
| 35 | `nghe-len-khong-duoc` | Không nghe được gì | act-cat-giao-thiep | **MỚI** — Người nghe lén áp tai vào cửa, trong phòng tối đèn, không bóng người |
| 36 | `nha-the-luc` | NNhà X thế lực +N · NNhà X thế lực -N · Nhà N thế lực +N; phi tần nhà ấy được thơm lây · Nhà N thế lực +N; trong cung chưa có phi tần nhà ấy · (+1) | act-cat-trieu-chinh | **MỚI** — Phủ đệ một nhà quyền quý, xe ngựa ra vào, đèn lồng đỏ |
| 37 | `biet-bi-do-nha` | Ngươi biết chuyện X sai người dò nhà mình · Ngươi biết chuyện ngươi sai người dò nhà mình · X biết chuyện X sai người dò nhà mình · X biết chuyện ngươi sai người dò nhà mình | act-cat-giao-thiep | **MỚI** — Một phi tần cầm lá thư nhà, nhíu mày nhìn về phía cung người dò mình |
| 38 | `rot-ho-nhiem-lanh` | Ngươi bị đẩy xuống hồ sen, ướt sũng, nhiễm lạnh · X trượt chân rơi xuống hồ sen, ướt sũng, nhiễm lạnh | act-cat-hai-nguoi, act-cat-giao-thiep | **MỚI** — Phi tần ướt sũng quấn chăn ngồi bên lò sưởi, cung nữ lau tóc |
| 39 | `gia-nhap-phe` | Ngươi gia nhập X · X gia nhập X | act-cat-giao-thiep | **MỚI** — Phi tần mới được đặt một chén trà ở bàn chung của một phe, các phi tần mỉm cười |
| 40 | `sinh-doi` | X sinh đôi | act-cat-giao-thiep | **MỚI** — Hai đứa trẻ sơ sinh trong hai khăn đỏ đặt trong một nôi chạm, mẹ nằm nghỉ |
| 41 | `sinh-ha` | Ngươi sinh hạ X · X sinh hạ X | ev-sinh-no | **MỚI** — Bà đỡ bế đứa trẻ sơ sinh quấn khăn đỏ đưa cho mẹ trên giường |
| 42 | `kho-chiu-sau-qua` | Ngươi thấy trong người khó chịu từ khi nhận quà; nên kiểm tra đồ | ev-khach-den-2 | **MỚI** — Phi tần ôm trán ngồi tựa, hộp quà mở trên bàn bên cạnh |
| 43 | `xin-xam` | Ngươi thắp hương, xin một quẻ mới · Xin xăm ở Phật đường | act-xin-xam, act-xin-xam(thẻ) | giữ |
| 44 | `ra-tay-khong-thanh` | Ngươi định ra tay nhưng không thành · X định ra tay nhưng không thành | act-cat-di-lai | **MỚI** — Bàn tay cầm gói bột rụt lại khi có tiếng bước chân ngoài cửa |
| 45 | `hoang-de-lo-quoc-su` | Quốc khố, biên phòng đều nguy, ngài không vui nổi | act-cat-giao-thiep | **MỚI** — Hoàng thượng ngồi một mình trước chồng tấu chương dưới đèn khuya, trầm ngâm |
| 46 | `tai-mat-nghe-duoc` | Tai mắt nghe được | ev-tai-mat | **MỚI** — Thái giám tai mắt nấp sau bình phong lắng nghe hai người nói |
| 47 | `tho-truyen-ra-ngoai` | Thơ ngươi truyền ra ngoài cung · X, học trò cũ của cha ngươi, đem bình khắp kinh thành | act-cat-hoc-tap, ev-tai-nghe | **MỚI** — Các văn nhân trong trà lâu kinh thành chuyền tay đọc một cuộn thơ |
| 48 | `thu-cu-lot` | Thư cũ giữa ngươi và X lọt đến tay Hoàng thượng | act-cat-di-lai | **MỚI** — Hoàng thượng cầm xấp thư cũ buộc chỉ đỏ, nhìn lạnh |
| 49 | `tra-ra-muu-dong-cung` | Tra ra X muốn dọn đường cho con mình là X lên ngôi Đông cung | ev-con-tre-2 | **MỚI** — Quan tra án dâng hồ sơ lên Hoàng thượng, bên ngoài là Đông cung |
| 50 | `giu-ngoi-thai-tu` | XHoàng thượng giữ X ở ngôi Thái tử | act-cat-giao-thiep | **MỚI** — Thái tử thiếu niên đứng bên Hoàng thượng, ngài đặt tay lên vai |
| 51 | `loi-don-ac-y` | Trong cung rộ lời đồn ác ý về ngươi; nghe nói phát ra từ đám người ngo · Trong cung rộ lời đồn ác ý về ngươi; nghe nói phát ra từ đám thị vệ từ | ev-tin-don | **MỚI** — Các cung nữ thị vệ túm tụm xì xào ở cổng, chỉ trỏ về một cung |
| 52 | `mua-ve-cung` | X bị X mua về cung mình · X bị ngươi mua về cung mình | act-cat-buon-ban | **MỚI** — Cung nữ mang tay nải theo thái giám cung khác đi, chủ cũ đứng nhìn |
| 53 | `chet-trong-nguc` | X bị đánh chết trong ngục Thận Hình ti | act-cat-giao-thiep | **MỚI** — Cửa ngục Thận Hình ti khép, tấm vải trắng trên cáng ngoài hành lang tối (không máu) |
| 54 | `gia-thai-bi-lat` | X giả mang thai bị lật tẩy | ev-sinh-no | **MỚI** — Thái y giơ chiếc gối bông nhỏ, phi tần quỳ cúi đầu trước Hoàng hậu |
| 55 | `bat-gap-mot-minh` | X ở X, ngươi bắt gặp Hoàng hậu đi lại một mình, không có thái giám dẫn · X ở X, ngươi bắt gặp X đi lại một mình, không có thái giám dẫn đường · X ở X, ngươi bắt gặp một nam nhân áo vàng đi lại một mình, không có th · X ở X, ngươi bắt gặp một phi tần áo bậc X đi lại một mình, không có th · (+2) | ev-cung-nhan | **MỚI** — Phi tần thấy một bóng người đi một mình qua hành lang vắng không thái giám dẫn |
| 56 | `bat-gap-noi-khe` | X ở X, ngươi bắt gặp X đứng nói khẽ với Hoàng hậu; tay nàng vừa giấu v · X ở X, ngươi bắt gặp X đứng nói khẽ với X; tay nàng vừa giấu vội vật g · X ở X, ngươi bắt gặp X đứng nói khẽ với một nam nhân áo vàng; tay nàng · X ở X, ngươi bắt gặp X đứng nói khẽ với một phi tần áo bậc X; tay nàng · (+2) | act-cat-muu-ke | **MỚI** — Hai người đứng nói khẽ dưới hiên, một người vội giấu vật gì vào tay áo |
| 57 | `bat-gap-sat-ben` | X ở X, ngươi bắt gặp X đứng sát bên Hoàng hậu sau hòn giả sơn; thấy độ · X ở X, ngươi bắt gặp X đứng sát bên X sau hòn giả sơn; thấy động, hai  · X ở X, ngươi bắt gặp X đứng sát bên một nam nhân áo vàng sau hòn giả s · X ở X, ngươi bắt gặp X đứng sát bên một phi tần áo bậc X sau hòn giả s · (+2) | act-cat-buon-ban | **MỚI** — Sau hòn giả sơn hai bóng người đứng sát nhau vội tách ra |
| 58 | `thoang-thay-gia-son` | X ở X, ngươi thoáng thấy Hoàng hậu đứng khuất sau hòn giả sơn; hình nh · X ở X, ngươi thoáng thấy X đứng khuất sau hòn giả sơn; hình như có bón · X ở X, ngươi thoáng thấy một nam nhân áo vàng đứng khuất sau hòn giả s · X ở X, ngươi thoáng thấy một phi tần áo bậc X đứng khuất sau hòn giả s · (+2) | act-cat-giao-thiep | **MỚI** — Qua kẽ đá giả sơn thấp thoáng vạt áo phi tần và một bóng khác |
| 59 | `thanh-thong-gia` | X thành thông gia | act-cat-giao-thiep | **MỚI** — Hai gia đình quyền quý trao canh thiếp và lễ vật trong sảnh phủ |
| 60 | `con-tron-tuoi` | X tròn N tuổi · X tròn N tuổi, vào Thượng thư phòng học chung | ev-tai-nghe, ev-con-tre-2 | **MỚI** — Đứa trẻ hoàng tộc mặc áo mới cúi lạy mẹ ngày sinh nhật, bánh thọ trên bàn |
| 61 | `con-ve-du-yen` | X về cung dự yến, nói đỡ cho ngươi trước Hoàng thượng | ev-yen-tiec | **MỚI** — Hoàng tử trưởng thành nâng chén trong yến, nói với Hoàng thượng, mẹ ngồi bên |
| 62 | `xui-cha-dang-so` | X xúi cha nàng dâng sớ | act-cat-trieu-chinh | **MỚI** — Phi tần viết thư nhà dưới đèn, niêm phong gửi đi |
| 63 | `nhan-toi-thay-chu` | X đứng ra nhận hết tội thay chủ, bị đưa vào Thận Hình ti | act-cat-di-lai | **MỚI** — Cung nữ trung thành quỳ nhận tội, thị vệ Thận Hình ti dẫn đi, chủ đứng sau |
| 64 | `tan-phong-hh` | X được tấn phong Hoàng hậu · Được tấn phong Hoàng hậu | ev-tan-phong | **MỚI** — Phi tần đội phượng quan nhận kim sách kim ấn giữa điện lớn, bá quan quỳ |
| 65 | `tan-phong` | X được tấn phong X · Được tấn phong X | ev-tan-phong | **MỚI** — Thái giám đọc thánh chỉ tấn phong, phi tần quỳ nhận, cung nữ dâng áo mới |
| 66 | `khoi-benh-seo` | XNgươi khỏi X, nhưng mặt để lại sẹo | act-cat-giao-thiep | **MỚI** — Phi tần đeo mạng lụa mỏng che mặt ngồi bên cửa sổ, gương úp xuống |
| 67 | `bao-cung-chinh-ti` | X báo Cung Chính ti · X báo Cung Chính ti chuyện ở X; X chối phăng, chỉ X bị đánh trượng, đu · X báo Cung Chính ti chuyện ở X; ngươi chối phăng, chỉ X bị đánh trượng · X báo thị vệ · (+2) | act-cat-giao-thiep, ev-hinh-phat | **MỚI** — Cung nữ dẫn thị vệ cầm đèn chạy về phía vườn đêm |
| 68 | `trinh-khong-du-chung` | X trình Cung Chính ti chuyện ở X, nhưng không đủ chứng | ev-tai-mat | **MỚI** — Quan Cung Chính ti lắc đầu, khép sổ trước người trình |
| 69 | `con-co-net` | X có nết X | act-cat-giao-thiep | **MỚI** — Đứa trẻ hoàng tộc chơi trong sân, mẹ ngồi hiên nhìn theo |
| 70 | `chu-sa-sam` | X thấy Hoàng thượng nhìn ngươi, sa sầm nét mặt | act-cat-giao-thiep | **MỚI** — Chủ nhân ngồi bên Hoàng thượng quay mặt đi, cung nữ đứng hầu cúi đầu |
| 71 | `xet-toi` | Hoàng hậu X xét tội X theo N chứng cứ · Hoàng hậu X xét tội ngươi theo N chứng cứ · Ngươi, ngôi Hoàng hậu, xét tội X theo N chứng cứ · Ngươi, ngôi Hoàng hậu, xét tội ngươi theo N chứng cứ | act-cat-giao-thiep | **MỚI** — Hoàng hậu ngồi xét tội, bằng chứng bày trên án, người bị xét quỳ |
| 72 | `tra-chung-cu` | Trả chứng cứ lấy lòng · X trả lại N chứng cứ cho Hoàng hậu X; nàng mang ơn · X trả lại N chứng cứ cho X; nàng mang ơn · X trả lại N chứng cứ cho ngươi; nàng mang ơn | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Phi tần trả lại phong thư cho người kia, người ấy cúi tạ |
| 73 | `hoc-voi-thay-con` | Mời X · Mời X dạy X · Mời thầy dạy N · Mời thầy dạy N cho X · (+2) | act-day-con-hoc, act-day-con-hoc(thẻ) | **MỚI** — Thầy dạy cúi chào bước vào phòng học của đứa trẻ hoàng tộc |
| 74 | `len-bac` | X bậc N · X lên bậc N | act-cat-giao-thiep | **MỚI** — Phi tần đặt bút xuống, nữ sư gật đầu khen bài vừa xong |
| 75 | `cung-nu-trom-bac` | Cung nữ X của X bị X mua chuộc, lấy trộm N lượng · Cung nữ X của X bị ngươi mua chuộc, lấy trộm N lượng · Cung nữ X của ngươi bị X mua chuộc, lấy trộm N lượng · Cung nữ X của ngươi bị ngươi mua chuộc, lấy trộm N lượng · (+1) | ev-cung-nhan, act-cat-buon-ban | **MỚI** — Cung nữ lén mở hòm bạc của chủ trong đêm |
| 76 | `thi-tam` | Thị tẩm | ev-hoang-de-dem | **MỚI** — Đêm thị tẩm: tẩm cung màn đỏ buông, đèn lồng đỏ, Hoàng thượng áo vàng và phi tần ngồi bên mép giường nhìn nhau (xa, kín đáo, trang nhã) |
| 77 | `khen-mot-cau` | Khen một câu | ev-hoang-de-dem | **MỚI** — Bên án trà đêm, phi tần nghiêng người khen một câu, Hoàng thượng mỉm cười cầm chén trà |
| 78 | `xoa-vai` | Lặng lẽ xoa vai, nghe ngài kể | ev-hoang-de-dem | **MỚI** — Phi tần đứng sau lưng Hoàng thượng đang ngồi, hai tay nhẹ xoa vai ngài, ngài kể chuyện, đèn ấm |
| 79 | `tua-vai` | Im lặng, tựa vai ngài | ev-hoang-de-dem | **MỚI** — Hoàng thượng và phi tần ngồi bên cửa sổ trăng, nàng tựa nhẹ đầu lên vai ngài, im lặng |
| 80 | `rot-ruou-nung-niu` | Rót rượu, nũng nịu | ev-hoang-de-dem | **MỚI** — Phi tần rót rượu vào chén ngọc cho Hoàng thượng, nghiêng mình nũng nịu, đèn đỏ ấm |
| 81 | `ban-tho-van` | Bàn thơ văn, cầm kỳ | act-lam-tho-v2 | **MỚI** — Hoàng thượng và phi tần cùng cúi xem một cuộn thơ trên án, bút nghiên, đêm đèn |
| 82 | `ban-thien-ha` | Bàn chuyện thiên hạ | act-cat-giao-thiep | **MỚI** — Hoàng thượng chỉ lên tấm bản đồ sơn hà treo vách, phi tần đứng bên lắng nghe |
| 83 | `thi-tham-noi-xau` | Thì thầm nói xấu X | act-cat-giao-thiep | **MỚI** — Trong màn the, phi tần ghé sát tai Hoàng thượng thì thầm, ngài khẽ nhíu mày |
| 84 | `xin-cho-nguoi` | Xin cho X | act-cat-giao-thiep | **MỚI** — Phi tần chắp tay cúi đầu xin ân cho một người trước Hoàng thượng đang ngồi trên sập |
| 85 | `xin-an-gia-dinh` | Xin ân cho gia đình | act-xin-an-dien | **MỚI** — Phi tần dâng lá thư nhà lên Hoàng thượng, xin ân cho gia đình |
| 86 | `xin-tha-cung-nu` | Xin tha cho cung nữ bị phạt | ev-hinh-phat | **MỚI** — Phi tần cúi người xin Hoàng thượng tha cho cung nữ đang quỳ ngoài cửa |
| 87 | `cui-dau-tuan-lenh` | Cúi đầu tuân lệnh | act-cat-giao-thiep | **MỚI** — Phi tần cúi đầu nhận lệnh trước Hoàng thượng đứng giơ tay ra lệnh |
| 88 | `dut-bac-xin-giu` | Đút bạc xin giữ | act-cat-buon-ban | **MỚI** — Phi tần kín đáo dúi túi bạc vào tay thái giám Kính sự phòng đứng ngoài cửa tẩm cung |
| 89 | `cau-xin-hoang-thuong` | Cầu xin Hoàng thượng | act-xin-an-dien | **MỚI** — Phi tần nắm tay áo Hoàng thượng cầu xin, ngài nhìn xuống |
| 90 | `tam-cho-gia` | Tắm gội chờ giá | act-cat-nghi-ngoi | **MỚI** — Bồn tắm gỗ hơi nước bốc lên, khăn lụa và lược ngọc, chờ ngự giá |
| 91 | `tam-canh-hoa` | Tắm cánh hoa, xông hương | act-cat-nghi-ngoi | **MỚI** — Bồn tắm đầy cánh hoa hồng, lư hương xông khói, áo lụa vắt bình phong |
| 92 | `diem-trang` | Điểm trang lộng lẫy | act-duong-nhan | **MỚI** — Phi tần ngồi trước gương đồng, cung nữ cài trâm vàng, đánh phấn son lộng lẫy |
| 93 | `de-moc` | Để mộc, tự nhiên | act-duong-nhan | **MỚI** — Phi tần để mặt mộc, tóc vấn đơn giản, cài một đóa hoa tươi, ngồi bên cửa sổ |
| 94 | `tap-truoc` | Tập trước X | act-luyen-cam-ky | **MỚI** — Phi tần luyện đàn trước một mình trong phòng đèn, chuẩn bị hiến nghệ |
| 95 | `tien-cu-hau-thay` | Tiến cử X hầu thay | act-chon-nguoi | **MỚI** — Phi tần dẫn cung nữ xinh đẹp ra trước, cúi mời Hoàng thượng để nàng hầu thay |
| 96 | `cao-benh-dem` | Cáo bệnh | act-gia-benh | **MỚI** — Phi tần nằm sau màn, cung nữ ra cửa cúi đầu báo với thái giám là chủ đang bệnh |
| 97 | `hoang-de-nhiu-may` | Hoàng thượng nhíu mày nhìn N | act-cat-giao-thiep | **MỚI** — Hoàng thượng ngồi trên sập nhíu mày quay đi, phi tần đứng lặng |
| 98 | `thap-den-hau-ruou` | Thắp đèn hầu rượu | act-cat-hau-ha | **MỚI** — Phi tần thắp đèn lồng, dâng bình rượu cho Hoàng thượng ngồi một mình đêm khuya |
| 99 | `khuyen-giu-long-the` | Khuyên ngài giữ long thể | act-cat-giao-thiep | **MỚI** — Phi tần dâng bát thuốc, khuyên Hoàng thượng mệt mỏi nghỉ ngơi |
| 100 | `thinh-an-th` | Thỉnh an, chép kinh | act-thinh-an-th, act-thinh-an-th(thẻ) | giữ |
| 101 | `thinh-an-hh` | Thỉnh an | act-thinh-an-hh, act-thinh-an-hh(thẻ) | giữ |
| 102 | `bai-kien` | Bái kiến Hoàng hậu rồi vào · Bái kiến X rồi vào · Hành lễ · Xin bái kiến · (+1) | act-bai-kien, act-bai-kien(thẻ) | giữ |
| 103 | `chao-hoi-dung-le` | Chào hỏi · Chào hỏi đúng lễ | act-bai-kien, act-bai-kien(thẻ) | **MỚI** — Hai phi tần gặp nhau giữa hành lang, một người vạn phúc chào đúng lễ |
| 104 | `xin-vao-bi-tu-choi` | Xin vào X | act-cat-di-lai, act-bai-kien | **MỚI** — Thái giám đứng chắn trước cổng cung khép hờ, cúi đầu từ chối phi tần |
| 105 | `cui-chao-bai-kien` | Ngươi cúi chào, bái kiến Hoàng hậu X ở X · Ngươi cúi chào, bái kiến Hoàng hậu X ở thiên điện của X · Ngươi cúi chào, bái kiến X ở X · Ngươi cúi chào, bái kiến X ở thiên điện của X | act-cat-le-nghi | **MỚI** — Phi tần vạn phúc trước chủ vị ngồi trên ghế trong chính điện một cung khác |
| 106 | `vao-khong-chao` | Vào X không chào chủ vị X · Vào thiên điện của X không chào chủ vị X · Vào thẳng, không bái kiến | phi-tan-cung-xuan-sang | **MỚI** — Phi tần bước thẳng vào điện, không chào, chủ vị trên ghế nhìn theo, cung nữ ngỡ ngàng |
| 107 | `nho-thai-giam-dan` | Nhờ thái giám dẫn vào · Nhờ thái giám dẫn vào X | ev-cung-nhan | **MỚI** — Thái giám cúi người dẫn đường, phi tần theo sau qua cổng nguyệt môn |
| 108 | `den-can-chinh-bi-duoi` | Đến Cần Chính điện, bị đuổi về | ngu-thu-phong-xuan-sang | **MỚI** — Thị vệ chắn bậc thềm Cần Chính điện, phi tần quay về |
| 109 | `len-vao` | Lẻn vào | act-len-vao, act-len-vao(thẻ) | giữ |
| 110 | `len-vao-trot-lot` | Lẻn vào X trót lọt | act-len-vao | **MỚI** — Bóng phi tần áo choàng sẫm lẻn qua cửa ngách đã vào trong sân tối, đèn xa |
| 111 | `len-vao-bi-bat` | Lẻn vào X, bị thị vệ bắt được | act-len-vao | **MỚI** — Hai thị vệ cầm đèn chặn bắt người mặc áo choàng sẫm ở cửa ngách đêm |
| 112 | `bi-thay-truong-mon` | Bị thấy lui tới Trường Môn viện | act-cat-giao-thiep | **MỚI** — Cổng Trường Môn viện tiêu điều, có cung nữ đứng xa nhìn theo phi tần đi ra |
| 113 | `biet-danh-tinh` | Ngươi đã biết | act-cat-giao-thiep | **MỚI** — Cung nữ ghé tai phi tần thì thầm tên một quý nhân đang đi xa ngoài hành lang |
| 114 | `duoc-thay-mat` | Ngươi đã được thấy mặt X | act-cat-giao-thiep | **MỚI** — Phi tần đứng hàng dưới thềm, ngẩng nhìn một quý nhân trên cao đang bước qua |
| 115 | `thay-mat-chua-biet-ten` | Ngươi đã thấy mặt X; chưa biết tên | act-cat-giao-thiep | **MỚI** — Qua hàng liễu, phi tần thoáng thấy một người lạ đi qua cầu, chưa rõ là ai |
| 116 | `da-quen-biet` | Ngươi đã quen biết X | act-cat-giao-thiep | **MỚI** — Hai phi tần ngồi chung bàn trà, đã quen thân, chuyện trò |
| 117 | `hoi-nguoi-hau` | Hỏi người hầu: đó là ai? | act-cat-hau-ha, act-cat-hau-ha(thẻ) | **MỚI** — Phi tần nghiêng đầu hỏi cung nữ, tay chỉ về phía người đi xa |
| 118 | `hoi-danh-tinh` | Hỏi danh tính · Kính cẩn hỏi danh tính | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Phi tần cúi chào và hỏi danh tính một quý phụ lạ ở vườn |
| 119 | `cung-khong-biet-la-ai` | X cũng không biết Hoàng hậu ấy là ai · X cũng không biết một nam nhân áo vàng ấy là ai · X cũng không biết một phi tần áo bậc X ấy là ai · X cũng không biết một phế phi ấy là ai · (+2) | act-cat-giao-thiep, ev-cung-nhan | **MỚI** — Cung nữ lắc đầu, cả hai nhìn bóng người lạ đi khuất |
| 120 | `lam-nhu-khong-thay` | Ngươi làm như không thấy Hoàng hậu ở X, quay bước đi nơi khác · Ngươi làm như không thấy X ở X, quay bước đi nơi khác · Ngươi làm như không thấy một nam nhân áo vàng ở X, quay bước đi nơi kh · Ngươi làm như không thấy một phi tần áo bậc X ở X, quay bước đi nơi kh · (+2) | act-cat-di-lai | **MỚI** — Phi tần nghiêng mặt quay bước đi đường khác, bóng người ở xa sau hòn non bộ |
| 121 | `tai-mat-bao-nam-nhan` | Muốn thấy tận mắt thì có mặt ở đó lúc ấy · Tai mắt báo | ev-tai-mat, act-cat-giao-thiep | **MỚI** — Cung nữ quỳ ghé tai phi tần báo tin dưới đèn, ngoài cửa sổ là bức tường cung đêm |
| 122 | `tai-mat-khong-do-ra` | Tai mắt không dò ra X ở đâu | ev-tai-mat | **MỚI** — Thái giám tai mắt quỳ lắc đầu trước phi tần, tay không |
| 123 | `tai-mat-bao-noi-o` | Tai mắt X trong cung X báo · Tai mắt báo · Tai mắt thấy | ev-tai-mat, ev-sinh-no | **MỚI** — Thái giám tai mắt cúi người báo tin trong góc hành lang, chỉ tay về một cung xa |
| 124 | `tai-mat-bat-gap-len-gap` | Tai mắt bắt gặp X lén gặp X | ev-tai-mat | **MỚI** — Từ sau cột đỏ, một cung nữ rình thấy hai bóng người lén gặp ở vườn đêm |
| 125 | `mat-thu-bi-chan` | Mật thư bị chặn, may chưa tra ra ngươi | act-cat-di-lai | **MỚI** — Thị vệ giơ lá mật thư niêm sáp vừa chặn được bên cổng thành đêm |
| 126 | `thai-giam-ke-ngoai-trieu` | Hỏi thái giám tin ngoại triều · Thái giám kể | ev-cung-nhan | **MỚI** — Thái giám già đứng bên phi tần kể tin ngoại triều, tay chỉ về phía điện Thái Hòa xa |
| 127 | `giam-canh-kho` | Ngươi giẫm phải cành khô; X giật mình tản đi · Ngươi giẫm phải cành khô; X và X giật mình tản đi · Ngươi giẫm phải cành khô; một phế phi và X giật mình tản đi | act-cat-giao-thiep | **MỚI** — Chân giẫm gãy cành khô, hai bóng người phía trước giật mình tản ra |
| 128 | `nang-thay-nghe-len` | Nàng đã thấy ngươi nghe lén | ev-tai-mat | **MỚI** — Một phi tần quay lại nhìn thẳng về chỗ người nghe lén nấp sau cột |
| 129 | `han-thay-mat` | Hắn đã thấy mặt ngươi | act-cat-giao-thiep | **MỚI** — Người đàn ông áo xanh sẫm ngoái lại nhìn qua vai trong vườn đêm |
| 130 | `han-mang-on` | Hắn mang ơn ngươi; chuyện này thành bí mật trong tay ngươi | act-cat-giao-thiep | **MỚI** — Người đàn ông áo xanh cúi đầu tạ ơn phi tần trước cửa ngách |
| 131 | `dan-ra-cua-ngach` | Ngươi sai người dẫn X ra cửa ngách · Ngươi sai người dẫn X ra cửa ngách, che cho X | act-cat-di-lai | **MỚI** — Thái giám cầm đèn dẫn người đàn ông áo sẫm ra cửa ngách cung đêm |
| 132 | `giau-bi-thay` | Ngươi giấu X, nhưng bị người thấy | act-cat-muu-ke | **MỚI** — Phi tần kéo rèm che người sau bình phong, ngoài cửa có cung nữ ngó vào |
| 133 | `thay-noi-chuyen-rieu-rao` | Hoàng hậu X thấy ngươi nói chuyện riêng với X ở X và đem chuyện đi rêu · X thấy ngươi nói chuyện riêng với X ở X và đem chuyện đi rêu rao | act-cat-giao-thiep | **MỚI** — Cung nữ nấp sau cây thấy phi tần nói chuyện riêng với nam nhân, rồi chạy đi kể |
| 134 | `co-nguoi-thay-voi` | Có người thấy ngươi với X · Lời ra tiếng vào | act-cat-giao-thiep, act-cat-di-lai | **MỚI** — Hai cung nữ chụm đầu xì xào, liếc về phía phi tần ở xa |
| 135 | `co-ke-thay-liec-mat` | Có kẻ thấy ngươi liếc mắt với X | act-cat-giao-thiep | **MỚI** — Cung nữ nấp sau rèm thấy phi tần đưa mắt về phía chàng trai ở bên kia hồ |
| 136 | `xi-xao-che-mat` | Có kẻ xì xào ngươi che mặt để giấu điều gì | act-cat-muu-ke | **MỚI** — Cung nữ xì xào sau lưng phi tần đeo mạng che mặt |
| 137 | `xi-xao-xa-xi` | Hậu cung xì xào ngươi ăn mặc quá xa xỉ, nhiều người ghen | ev-tranh-sung | **MỚI** — Các phi tần quạt che miệng nhìn một phi tần áo gấm lộng lẫy quá mức |
| 138 | `an-mac-gian-di` | Ngươi ăn mặc giản dị, được khen có đức | act-cat-giao-thiep | **MỚI** — Phi tần áo lụa nhạt giản dị, Thái hậu gật đầu khen |
| 139 | `thai-hau-che-pho-truong` | Thái hậu chê ngươi phô trương | act-cat-giao-thiep | **MỚI** — Thái hậu ngồi nhíu mày nhìn phi tần đội đầy trâm vàng |
| 140 | `tin-tai-mat-chung` | Ngươi có tin để bẩm chủ · X kể cho ngươi chuyện trong cung X | act-cat-giao-thiep | **MỚI** — Cung nữ bước nhanh qua hành lang về cung chủ, tay nắm vạt áo, mang tin |
| 141 | `ke-nho-chuyen-cung` | X kể nhỏ với ngươi chuyện trong cung X | act-cat-giao-thiep | **MỚI** — Hai cung nữ ngồi bên giếng, một người kể nhỏ chuyện trong cung |
| 142 | `ke-chuyen-nghe-tu` | X kể chuyện nghe từ X bên cung X | act-cat-giao-thiep | **MỚI** — Cung nữ quỳ kể với chủ chuyện nghe được từ bạn bên cung khác |
| 143 | `ke-chuyen-cua` | X kể chuyện của Hoàng hậu X · X kể chuyện của X · X kể chuyện của ngươi | act-cat-giao-thiep | **MỚI** — Cung nữ cúi đầu kể chuyện của một phi tần cho chủ nghe bên bàn trà |
| 144 | `ke-chuyen-xau` | Phế phi kể chuyện xấu của X · X kể chuyện xấu của X | act-cat-giao-thiep | **MỚI** — Phế phi áo vải ngồi bên song cửa lãnh cung kể chuyện xấu của người khác |
| 145 | `thi-tham` | X thì thầm | act-cat-giao-thiep | **MỚI** — Hai cung nữ thì thầm sau cánh cửa khép hờ |
| 146 | `khong-biet-gi-moi` | X không biết gì mới | act-cat-giao-thiep | **MỚI** — Cung nữ lắc đầu, hai tay không, đứng trước chủ |
| 147 | `chi-cuoi` | X chỉ cười, không nói gì | act-cat-giao-thiep | **MỚI** — Thái giám Kính sự phòng chỉ cười, khoanh tay trong tay áo, không nói |
| 148 | `he-lo-so-thich` | Thầy dạy kể một sở thích của Hoàng thượng · X hé lộ một sở thích của Hoàng thượng | act-cat-giao-thiep | **MỚI** — Thái giám già ghé tai kể sở thích Hoàng thượng, trên bàn là đĩa bánh và bình hoa ngài thích |
| 149 | `thay-buot-mieng` | Thầy dạy buột miệng chuyện của X | act-cat-giao-thiep | **MỚI** — Thầy dạy đàn lỡ lời, đưa tay áo che, phi tần học trò nghe chăm chú |
| 150 | `doan-hoang-thuong-trong` | Qua chuyện trò, ngươi đoán được Hoàng thượng trọng X | act-cat-giao-thiep | **MỚI** — Phi tần trò chuyện bên Hoàng thượng, ngài nhắc đến một điều quý, nàng lặng ghi nhớ |
| 151 | `doan-thai-hau-trong` | Qua chuyện trò, ngươi đoán được Thái hậu trọng X | act-cat-giao-thiep | **MỚI** — Phi tần trò chuyện bên Thái hậu, Thái hậu lần tràng hạt nói điều mình trọng |
| 152 | `lai-nghe-doi-thuc` | Lại nghe đồn X và X đối thực | act-cat-giao-thiep | **MỚI** — Hai cung nữ thì thầm, chỉ về phía một thái giám và một cung nữ đứng gần nhau xa xa |
| 153 | `nguoi-quen-che-cho` | X là người quen cũ, sẵn lòng che chở ngươi | act-cat-giao-thiep | **MỚI** — Một phi tần lớn tuổi nắm tay phi tần mới, người quen cũ, mỉm cười che chở |
| 154 | `de-y-bay-muu` | Ngươi để ý thấy X đang bày mưu hại người | act-cat-hai-nguoi | **MỚI** — Cung nữ quét sân ngẩng lên thấy qua cửa sổ một người đang bỏ bột vào chén |
| 155 | `lo-mieng-ke` | X lỡ miệng kể chuyện trong cung ngươi ra ngoài | act-cat-di-lai | **MỚI** — Cung nữ lỡ miệng kể chuyện với thái giám ngoài cổng, rồi giật mình che miệng bằng khăn |
| 156 | `nghe-ban-ke` | X nghe bạn là X kể chuyện cung X · X nghe bạn là X kể chuyện cung ngươi | act-cat-giao-thiep | **MỚI** — Hai cung nữ bạn bè ngồi giặt đồ bên giếng kể chuyện cung khác |
| 157 | `nhan-ra-dieu-la` | Ngươi nhận ra điều lạ | act-cat-di-lai | **MỚI** — Phi tần cầm chén trà soi dưới ánh đèn, nhận ra màu nước lạ |
| 158 | `do-duoc-net` | X dò được nết của X | act-cat-giao-thiep | **MỚI** — Cung nữ khẽ thuật lại với chủ tính nết của một người, chủ gật đầu |
| 159 | `den-gap` | Đến gặp X | act-den-tham, act-den-tham(thẻ) | **MỚI** — Phi tần bước đến cổng cung người khác, cung nữ ra đón |
| 160 | `scene:rv` | Đến cung nàng thăm | phi-tan-cung-xuan-sang, act-den-tham(thẻ) | giữ |
| 161 | `moi-den-cung` | Mời đến cung ta | act-den-tham, act-den-tham(thẻ) | **MỚI** — Cung nữ cầm thiếp mời đỏ cúi trao cho cung nữ cung khác ở cổng |
| 162 | `sai-nguoi-moi` | Ngươi sai người mời X buổi sau sang cung | act-cat-giao-thiep | **MỚI** — Thiếp mời đỏ trên khay sơn mài, cung nữ chuẩn bị mang đi |
| 163 | `nhan-loi-sang-cung` | X nhận lời, sang cung ngươi buổi này | act-cat-di-lai | **MỚI** — Hai phi tần ngồi đối diện bên bàn trà trong cung, khách vừa đến |
| 164 | `tu-choi-loi-moi` | Ngươi khéo từ chối lời mời của X · Ngươi khéo từ chối lời mời của ngươi · X khéo từ chối lời mời của X · X khéo từ chối lời mời của ngươi · (+1) | act-cat-giao-thiep | **MỚI** — Cung nữ cung khác cúi đầu trả lại thiếp mời đỏ |
| 165 | `moi-sang-cung-nang` | X sai người mời ngươi sang cung nàng chơi buổi này | act-cat-giao-thiep | **MỚI** — Cung nữ cung khác quỳ dâng thiếp mời lên phi tần |
| 166 | `sang-tham-hoi` | X sang cung ngươi thăm hỏi | act-cat-giao-thiep | **MỚI** — Phi tần khách mang hộp quà đến, chủ nhà ra đón ở cửa |
| 167 | `sang-tham-di-vang` | X sang cung ngươi thăm, ngươi đi vắng; X không nói ngươi đi đâu · X sang cung ngươi thăm, ngươi đi vắng; X lỡ miệng nói ngươi ở X | act-cat-giao-thiep | **MỚI** — Phi tần khách đứng trước cửa cung vắng chủ, cung nữ cúi đầu đáp |
| 168 | `den-cho-han` | Đến chỗ hắn | act-den-tham, act-den-tham(thẻ) | **MỚI** — Phi tần đến gặp người đàn ông áo xanh nơi góc vườn vắng |
| 169 | `den-ngay` | Đến ngay | act-cat-di-lai | **MỚI** — Phi tần vội bước theo cung nữ cầm đèn qua hành lang |
| 170 | `sai-tai-mat-do-noi-o` | Sai tai mắt dò nơi ở | act-nghe-len, act-nghe-len(thẻ) | **MỚI** — Phi tần dặn thái giám tai mắt, chỉ tay về các mái cung xa |
| 171 | `tang-qua` | Tặng · Tặng quà | act-tang-qua, act-tang-qua(thẻ) | giữ |
| 172 | `bieu-qua` | Biếu X chút quà · Biếu quà | act-tang-qua, act-tang-qua(thẻ) | **MỚI** — Cung nữ hai tay biếu một hộp gấm nhỏ cho cung nữ khác |
| 173 | `bieu-bac` | Biếu · Biếu X N lượng | act-tang-qua, act-tang-qua(thẻ) | **MỚI** — Phi tần đưa túi bạc biếu thái giám đang cúi người |
| 174 | `sai-nguoi-tang` | X sai người mang X sang tặng ngươi | ev-khach-den-2 | **MỚI** — Cung nữ cung khác cúi dâng hộp quà trên khay vào cung |
| 175 | `tang-cho` | Ngươi tặng X cho X · X tặng X cho X | ev-khach-den-2 | **MỚI** — Một phi tần trao chiếc trâm trong hộp gấm cho phi tần khác |
| 176 | `nhan-qua-co-van-de` | X nhận X của X nhưng người của nàng phát hiện đồ có vấn đề · X nhận X của ngươi nhưng người của nàng phát hiện đồ có vấn đề | act-cat-giao-thiep | **MỚI** — Cung nữ mở hộp quà, nhíu mày cầm món đồ soi, chủ đứng sau |
| 177 | `tra-lai-qua` | Trả lại quà | ev-khach-den-2 | **MỚI** — Cung nữ cầm hộp quà trả lại, cúi người ở cổng |
| 178 | `ket-giao` | Kết giao · Ngươi kết giao với X · Ngươi kết giao với ngươi · X kết giao với X · (+1) | ev-mat-uoc, act-ket-giao | giữ |
| 179 | `chua-nhan-vao-phe` | Ngươi chưa nhận X vào phe · Ngươi chưa nhận ngươi vào phe · X chưa nhận X vào phe · X chưa nhận ngươi vào phe | act-cat-trieu-chinh | **MỚI** — Phi tần đứng đầu phe khoanh tay, lắc đầu nhẹ trước người xin vào |
| 180 | `nhan-loi-vao-phe` | Nhận lời vào phe | act-cat-trieu-chinh | **MỚI** — Phi tần cúi đầu nhận chén trà từ người đứng đầu phe |
| 181 | `roi-phe` | Ngươi rời X · X rời X | act-cat-giao-thiep | **MỚI** — Phi tần đặt chén trà xuống, đứng dậy rời bàn của một phe |
| 182 | `tam-su` | Tâm sự | act-thi-tham, act-thi-tham(thẻ) | **MỚI** — Hai phi tần ngồi sát nhau trên ghế đá, một người tâm sự, người kia nắm tay |
| 183 | `chia-se-bi-mat` | Chia sẻ bí mật | act-thi-tham, act-thi-tham(thẻ) | **MỚI** — Phi tần trao một mảnh giấy gấp cho phi tần thân, cả hai nhìn quanh |
| 184 | `canh-bao` | Cảnh báo X · Cảnh báo nàng | act-thi-tham, act-thi-tham(thẻ) | **MỚI** — Phi tần nắm tay áo phi tần kia kéo lại, chỉ về phía có người đáng ngại |
| 185 | `ban-tan` | Bàn tán về X | act-thi-tham, act-thi-tham(thẻ) | **MỚI** — Ba phi tần quạt che miệng bàn tán dưới gốc liễu |
| 186 | `hoi-han` | Hỏi han sức khỏe | act-hoi-han, act-hoi-han(thẻ) | giữ |
| 187 | `mang-chan-thuoc` | Mang chăn ấm, thuốc men | act-hoi-han | **MỚI** — Cung nữ ôm chăn bông, phi tần xách hộp thuốc đến lãnh cung lạnh |
| 188 | `khen-tai-nghe` | Khen tài nghệ nàng | act-tro-chuyen-hoang-thuong, act-tro-chuyen-hoang-thuong(thẻ) | **MỚI** — Phi tần vỗ tay khen phi tần khác vừa đàn xong |
| 189 | `nho-giup-do` | Nhờ giúp đỡ | act-xin-che-cho, act-xin-che-cho(thẻ) | **MỚI** — Phi tần cúi đầu nhờ một phi tần cao phẩm giúp đỡ |
| 190 | `giup-do-nang` | Giúp nàng · Giúp đỡ nàng | act-thuong, act-thuong(thẻ) | **MỚI** — Phi tần đỡ một cung nữ ngã dậy, nhặt đồ rơi giúp nàng |
| 191 | `tro-chuyen-hoang-thuong` | Trò chuyện | act-tro-chuyen-hoang-thuong, act-tro-chuyen-hoang-thuong(thẻ) | giữ |
| 192 | `tro-chuyen-voi` | Trò chuyện với X | act-tro-chuyen-hoang-thuong | **MỚI** — Cung nữ trò chuyện vui vẻ với một thái giám bên cửa hông |
| 193 | `tang-boc` | Tâng bốc | act-tro-chuyen-hoang-thuong, act-tro-chuyen-hoang-thuong(thẻ) | **MỚI** — Phi tần khom người tươi cười nói lời ngọt, Hoàng thượng phẩy tay áo hài lòng |
| 194 | `noi-that-long` | Nói thật lòng | act-tro-chuyen-hoang-thuong | **MỚI** — Phi tần nhìn thẳng Hoàng thượng nói thật, ngài lắng nghe nghiêm |
| 195 | `hoi-chuyen` | Hỏi chuyện | act-tro-chuyen-hoang-thuong, act-tro-chuyen-hoang-thuong(thẻ) | **MỚI** — Phi tần ngồi bên bàn trà hỏi chuyện một cung nữ đứng hầu |
| 196 | `ta-loi` | Tạ lỗi | act-ta-loi, act-ta-loi(thẻ) | giữ |
| 197 | `nhun-nhuong` | Nhún nhường | act-ta-loi, act-ta-loi(thẻ) | **MỚI** — Phi tần lùi nửa bước, cúi đầu nhường đường cho phi tần cao phẩm |
| 198 | `tha-loi` | Nhận lời xin lỗi · Tha lỗi | act-tha-loi, act-tha-loi(thẻ) | giữ |
| 199 | `tha-loi-cung-nhan` | Tha lỗi cho X | act-tha-loi | **MỚI** — Phi tần đưa tay đỡ cung nữ đang quỳ dậy, tha lỗi |
| 200 | `lanh-lung` | Lạnh lùng | act-cat-giao-thiep | **MỚI** — Phi tần quay mặt đi, khách cúi đầu xin lỗi bị bỏ đứng |
| 201 | `nhin-loi-mia` | Nhẫn nhịn · Nhịn | act-nhin-loi-mia | giữ |
| 202 | `dap-tra-mia` | Đáp trả sắc sảo | act-khieu-khich | **MỚI** — Hai phi tần đứng đối mặt, một người phe phẩy quạt đáp trả sắc sảo |
| 203 | `khieu-khich` | Khiêu khích | act-khieu-khich | giữ |
| 204 | `trut-gian` | Trút giận | act-khieu-khich | **MỚI** — Phi tần hất đổ chén trà xuống sàn, cung nữ quỳ nhặt mảnh vỡ |
| 205 | `cho-muon` | Cho mượn | act-cho-muon | giữ |
| 206 | `cho-bac` | Cho N lượng | act-cho-muon | **MỚI** — Phi tần đặt nén bạc vào tay một phi tần nghèo đang cúi tạ |
| 207 | `tra-no` | X trả lại N lượng đã mượn | act-cho-muon | **MỚI** — Phi tần khác đến cúi đầu trả lại túi bạc đã mượn |
| 208 | `tu-choi` | Khéo từ chối · Từ chối · Từ chối khéo | act-tu-choi | giữ |
| 209 | `tu-choi-bam-chu` | Từ chối, bẩm chủ | act-tu-choi | **MỚI** — Cung nữ đẩy túi bạc lại, quay về bẩm chủ |
| 210 | `tu-choi-im-lang` | Từ chối, im lặng | act-tu-choi | **MỚI** — Cung nữ khẽ lắc đầu từ chối túi bạc, mím môi im lặng |
| 211 | `tu-choi-tu-gay-the` | Từ chối, tự gây thế lực | act-tu-choi | **MỚI** — Phi tần đứng thẳng trước Thái hậu, xin tự lo, các cung nữ của nàng sau lưng |
| 212 | `tiep-dai-lanh-nhat` | Tiếp đãi lạnh nhạt | act-tu-choi | **MỚI** — Phi tần ngồi uống trà không nhìn khách, khách tân nhân đứng ngượng |
| 213 | `duoi-di` | Đuổi hắn đi · Đuổi về · Đuổi đi | act-tu-choi, ev-khach-den-2 | **MỚI** — Phi tần phẩy tay, thái giám dẫn kẻ lạ ra khỏi cổng cung |
| 214 | `tang-tram-ket-than` | Tặng trâm, kết thân | ev-khach-den-2 | **MỚI** — Phi tần cài trâm ngọc lên tóc tân nhân, cả hai mỉm cười |
| 215 | `dan-mat` | Dằn mặt ngay buổi đầu | act-cat-giao-thiep | **MỚI** — Phi tần ngồi cao nhìn xuống tân nhân đang vạn phúc, vẻ uy nghiêm |
| 216 | `dan-dem-trang` | Đánh đàn ở ngự hoa viên | act-dan-dem-trang, act-dan-dem-trang(thẻ) | giữ |
| 217 | `phuong-cau-hoang` | Đàn khúc Phượng cầu hoàng | act-dan-dem-trang, act-dan-dem-trang(thẻ) | **MỚI** — Phi tần gảy đàn tỳ bà trong đình, Hoàng thượng dừng chân nghe ở cầu xa |
| 218 | `hien-khuc-trang` | Hiến khúc đàn dưới trăng | act-dan-dem-trang | **MỚI** — Đêm Trung thu trăng tròn, phi tần đàn cổ cầm trên thuyền rồng, đèn lồng trên nước |
| 219 | `pho-tai` | Phô tài · Phô tài: X | act-cat-giao-thiep, act-dan-dem-trang(thẻ) | **MỚI** — Phi tần trổ tài trên bục trước Hoàng thượng và các phi tần ngồi xem trong vườn |
| 220 | `dang-canh` | Dâng canh ở ngự thư phòng | act-dang-canh, act-dang-canh(thẻ) | giữ |
| 221 | `dang-chao` | Dâng cháo lên Hoàng thượng | act-dang-canh | **MỚI** — Phi tần bưng bát cháo nóng mùa đông vào ngự thư phòng, tuyết ngoài hiên |
| 222 | `mua-yen` | Múa trong yến tiệc | act-mua-yen | giữ |
| 223 | `kinh-hong-vu` | Kinh hồng vũ | act-mua-yen | **MỚI** — Phi tần múa Kinh hồng giữa sân lát đá đầy hoa, tay áo nước dài (không bay loạn), quan khách xem |
| 224 | `cam-hoa` | Cắm hoa dâng Hoàng thượng | act-cam-hoa, act-cam-hoa(thẻ) | giữ |
| 225 | `dang-hoa` | Dâng một cành hoa | act-cat-hau-ha, act-cat-hau-ha(thẻ) | **MỚI** — Cung nữ hai tay dâng một cành mai cho Hoàng thượng đi ngang vườn |
| 226 | `dang-vat` | Dâng X | act-cat-hau-ha, act-cat-hau-ha(thẻ) | **MỚI** — Phi tần hai tay dâng món quý trên khay lụa lên Hoàng thượng |
| 227 | `dang-len-hoang-thuong` | Ngươi dâng X lên Hoàng thượng · X dâng X lên Hoàng thượng | act-cat-hau-ha | **MỚI** — Phi tần dâng hộp gấm lên Hoàng thượng ngồi trong điện |
| 228 | `dang-len-thai-hau` | Ngươi dâng X lên Thái hậu · X dâng X lên Thái hậu | act-cat-hau-ha | **MỚI** — Phi tần dâng hộp gấm lên Thái hậu ngồi trên bảo tọa |
| 229 | `danh-co` | Đánh cờ với Hoàng thượng | act-danh-co, act-danh-co(thẻ) | giữ |
| 230 | `ban-trieu-chinh` | Bàn chuyện triều chính | act-ban-trieu-chinh, act-ban-trieu-chinh(thẻ) | giữ |
| 231 | `xin-an-dien` | Xin ân điển | act-xin-an-dien, act-xin-an-dien(thẻ) | giữ |
| 232 | `khat-bong-loc` | Khất bổng lộc | act-xin-an-dien, act-xin-an-dien(thẻ) | **MỚI** — Phi tần cầm sổ bổng lộc trình Hoàng hậu, xin cắt bổng của người khác |
| 233 | `sai-khat-bong` | Hoàng hậu X sai Nội vụ phủ khất bổng lộc của ngươi tháng tới · Ngươi sai Nội vụ phủ khất bổng lộc của X tháng tới | act-cat-giao-thiep | **MỚI** — Thái giám Nội vụ phủ gạch tên trong sổ bổng lộc, Hoàng hậu đứng sau |
| 234 | `xin-an-xa` | Xin Hoàng thượng ân xá | act-xin-an-dien | **MỚI** — Phi tần quỳ trước điện xin ân xá cho người trong lãnh cung |
| 235 | `chan-ngu-gia` | Chặn ngự giá | act-chan-ngu-gia, act-chan-ngu-gia(thẻ) | giữ |
| 236 | `chan-ngu-gia-thanh` | Ngươi chặn ngự giá giữa đường, Hoàng thượng sang cung X thay vì X · Ngươi chặn ngự giá giữa đường, Hoàng thượng sang cung X thay vì ngươi · Ngươi chặn ngự giá giữa đường, Hoàng thượng sang cung ngươi thay vì X · Ngươi chặn ngự giá giữa đường, Hoàng thượng sang cung ngươi thay vì ng | ev-hoang-de-dem | **MỚI** — Kiệu rồng dừng giữa đường cung, phi tần vạn phúc trước kiệu, ngài vén rèm |
| 237 | `tranh-sung` | Tranh sủng | act-lat-the, act-lat-the(thẻ) | **MỚI** — Phi tần nằm tựa sập ôm ngực, cung nữ cầm đèn chạy ra đêm xanh về phía điện xa |
| 238 | `bao-dau-tim` | Ngươi sai người báo đau tim, Hoàng thượng sang cung ngươi thay vì X · Ngươi sai người báo đau tim, Hoàng thượng sang cung ngươi thay vì ngươ | act-cat-di-lai | **MỚI** — Hoàng thượng rời kiệu bước vội vào một cung đèn sáng, cung nữ dẫn đường |
| 239 | `gianh-dem-khong-thanh` | Ngươi định giành đêm của X nhưng Hoàng thượng không động lòng · Ngươi định giành đêm của ngươi nhưng Hoàng thượng không động lòng · X định giành đêm của X nhưng Hoàng thượng không động lòng · X định giành đêm của ngươi nhưng Hoàng thượng không động lòng | act-cat-giao-thiep | **MỚI** — Kiệu rồng đi thẳng qua cổng một cung, phi tần đứng chờ ở cổng |
| 240 | `rut-the` | Rút thẻ bài | act-lat-the, act-lat-the(thẻ) | **MỚI** — Khay bạc với những thẻ bài xanh, một bàn tay rút một thẻ |
| 241 | `dut-lot-lat-the` | Ngươi đút lót Kính sự phòng · X đút lót Kính sự phòng · Đút lót lật thẻ | ev-hoi-lo, act-lat-the | **MỚI** — Phi tần dúi nén bạc vào tay áo thái giám Kính sự phòng bưng khay thẻ bài |
| 242 | `hoi-so-thich` | Hỏi sở thích Hoàng thượng | act-so-thi-tam | **MỚI** — Phi tần hỏi chuyện thái giám già Kính sự phòng bên hiên, hắn cười kể |
| 243 | `xem-so-thi-tam` | Hỏi Kính sự phòng · Sổ thị tẩm · Xem sổ thị tẩm | ev-hoang-de-dem, act-cat-giao-thiep | **MỚI** — Cuốn sổ thị tẩm mở trên án, thái giám lật trang dưới đèn |
| 244 | `so-thi-tam` | Hối lộ Kính sự phòng sửa sổ | act-so-thi-tam | giữ |
| 245 | `tong-quan-ksp-dem-chuyen` | Tổng quản Kính sự phòng nhận bạc của X rồi đem chuyện kể với X · Tổng quản Kính sự phòng nhận bạc của X rồi đem chuyện kể với ngươi · Tổng quản Kính sự phòng nhận bạc của ngươi rồi đem chuyện kể với X · Tổng quản Kính sự phòng nhận bạc của ngươi rồi đem chuyện kể với ngươi | act-cat-buon-ban | **MỚI** — Tổng quản Kính sự phòng cầm túi bạc cúi trình chuyện trước Hoàng hậu |
| 246 | `hau-thuoc` | Hầu thuốc Hoàng thượng | act-hau-thuoc | giữ |
| 247 | `long-the-bat-an` | Long thể bất an, Hoàng thượng ít vào hậu cung | act-cat-di-lai | **MỚI** — Hoàng thượng nằm nghỉ sau màn vàng, thái y bắt mạch, các phi tần đứng ngoài |
| 248 | `long-the-da-an` | Long thể đã an | act-cat-giao-thiep | **MỚI** — Hoàng thượng khỏe lại dạo vườn, thái giám theo sau, nắng sớm |
| 249 | `hoang-thuong-bo-qua` | Hoàng thượng bỏ qua | act-cat-giao-thiep | **MỚI** — Hoàng thượng phẩy tay cho lui, mặt bình thản |
| 250 | `hoang-thuong-khong-cho` | Hoàng thượng không cho | act-cat-giao-thiep | **MỚI** — Hoàng thượng lắc đầu, khép tấu chương lại |
| 251 | `hoang-thuong-dong-long-tong-nu` | Hoàng thượng động lòng, gả một tông nữ sang Bắc Địch thay X · Hoàng thượng động lòng, gả một tông nữ thay · X quỳ xin giữ X lại; Hoàng thượng động lòng, gả một tông nữ sang Bắc Đ | act-cat-giao-thiep, ev-hinh-phat | **MỚI** — Hoàng thượng đặt tay lên vai phi tần đang quỳ, một tông nữ đứng sau sứ đoàn |
| 252 | `hoang-thuong-khong-nghe-hoa-than` | Hoàng thượng không nghe lời xin; X vẫn phải sang Bắc Địch · Hoàng thượng không đổi ý; X theo sứ đoàn sang Bắc Địch · X quỳ xin giữ con nhưng Hoàng thượng không nghe | ev-hinh-phat, act-cat-di-lai | **MỚI** — Phi tần quỳ khóc lặng giữa sân, xa xa kiệu hoa công chúa theo sứ đoàn ra cổng |
| 253 | `nhan-tong-nu` | Hoàng thượng nhận tông nữ ngươi tiến cử; X ở lại | act-cat-giao-thiep | **MỚI** — Một tông nữ áo đỏ cúi chào Hoàng thượng, công chúa đứng sau mẹ yên lòng |
| 254 | `hoang-thuong-dang-nghe` | Hoàng thượng đành nghe theo | act-cat-hoc-tap | **MỚI** — Hoàng thượng thở dài ngồi trên long ỷ, các đại thần quỳ dưới |
| 255 | `hoang-thuong-khong-vui-phat` | Hoàng thượng không vui vì người ngài thương bị phạt | ev-hinh-phat | **MỚI** — Hoàng thượng đứng quay lưng bên cửa sổ, nhìn ra sân nơi người bị phạt |
| 256 | `hoang-thuong-cam-kich` | Hoàng thượng cảm kích, ban thưởng X · Hoàng thượng cảm kích, ban thưởng ngươi | ev-dai-xa | **MỚI** — Hoàng thượng trao hộp ngọc cho phi tần, nàng cúi tạ ơn |
| 257 | `hoang-thuong-thu-gia` | Hoàng thượng cho là thư giả, trách ngươi gây chuyện | act-cat-giao-thiep | **MỚI** — Hoàng thượng ném lá thư xuống án, phi tần quỳ cúi đầu |
| 258 | `thai-y-bat-mach-co-thai` | Thái y bắt mạch | ev-sinh-no | **MỚI** — Thái y quỳ bắt mạch cổ tay phi tần qua khăn lụa, cung nữ đứng chờ mừng rỡ |
| 259 | `thai-y-khac-bat-mach` | Thái y khác bắt mạch | ev-benh-tat | **MỚI** — Một thái y khác bắt mạch, thái y trước đứng lùi sau cúi đầu |
| 260 | `bao-tin-co-thai` | Báo tin có thai | act-bao-tin-co-thai | giữ |
| 261 | `gia-mang-thai` | Giả mang thai | act-gia-mang-thai | giữ |
| 262 | `an-thai` | An thai | act-an-thai | giữ |
| 263 | `tu-bao-che-an-thai` | Tự bào chế thuốc an thai | act-an-thai | **MỚI** — Phi tần mang thai tự cân thuốc bằng cân tiểu ly, bên lò sắc thuốc |
| 264 | `cau-tu` | Cầu tự ở Phụng Tiên điện | act-cau-tu | giữ |
| 265 | `bai-thuoc-thu-thai` | Bài thuốc dễ thụ thai | act-thai-y | **MỚI** — Thái y trao một gói thuốc buộc chỉ đỏ cho phi tần, bên cạnh tủ thuốc nhiều ngăn |
| 266 | `thai-y-tam-phuc` | Mời làm thái y tâm phúc | act-thai-y | **MỚI** — Phi tần trao túi bạc cho thái y trẻ đang cúi chào, hộp thuốc bên chân |
| 267 | `thai-y` | Truyền thái y · Xin chữa bệnh | act-thai-y, act-thai-y(thẻ) | giữ |
| 268 | `day-con-hoc` | Dạy X học · Dạy chữ · Dạy công chúa học chữ · Dạy hoàng tử học chữ · (+1) | act-day-con-hoc, act-day-con-hoc(thẻ) | giữ |
| 269 | `day-do-con` | Dạy dỗ công chúa · Dạy dỗ hoàng tử | ev-con-tre-2 | **MỚI** — Phi tần ngồi kể chuyện dạy con lễ nghĩa, đứa trẻ khoanh tay nghe |
| 270 | `tu-tay-day` | Ngươi tự tay dạy X · Tự tay dạy X · Tự tay dạy X học chữ | ev-con-tre-2 | **MỚI** — Phi tần cầm tay con dạy viết chữ trên giấy hồng |
| 271 | `tu-day-tai-nghe` | Tự dạy con N · Tự dạy con tài nghệ | act-day-con-hoc, act-day-con-hoc(thẻ) | **MỚI** — Phi tần dạy con gảy đàn, đứa trẻ ngồi lòng mẹ |
| 272 | `thoi-moi-thay` | Thôi mời thầy X · Thầy X của X thôi dạy | act-cat-giao-thiep, act-day-con-hoc | **MỚI** — Thầy đồ cúi chào rời phòng học, mang hòm sách |
| 273 | `doi-thay` | Thầy X (đổi thầy) | act-cat-giao-thiep, act-cat-buon-ban(thẻ) | **MỚI** — Thầy mới cúi chào bước vào phòng học, thầy cũ đứng nhường |
| 274 | `cho-con-hoc-chung` | Cho con học chung · X về học lớp chung của Thượng thư phòng, không tốn học phí | ev-con-tre-2, act-cat-cham-con(thẻ) | **MỚI** — Nhiều hoàng tử, công chúa ngồi hàng bàn trong Thượng thư phòng |
| 275 | `xin-dai-hoc-si` | Hoàng thượng chuẩn tấu, cử một Đại học sĩ dạy X; học phí chỉ Bạc X mỗi · Xin Hoàng thượng cử Đại học sĩ | act-day-con-hoc, act-day-con-hoc(thẻ) | **MỚI** — Đại học sĩ áo xanh đội mũ quan cúi chào đứa trẻ hoàng tộc, sách vở trên bàn |
| 276 | `xin-thai-hau-hoc-cung` | Học cùng Thái hậu X · Xin Thái hậu cho học cùng | act-day-con-hoc, act-day-con-hoc(thẻ) | **MỚI** — Thái hậu ngồi dạy viết thư pháp, phi tần trẻ ngồi bên mài mực |
| 277 | `thoi-hoc-vo` | Thôi học võ · X thôi học võ riêng | act-vo-nghe, act-vo-nghe(thẻ) | **MỚI** — Cây cung treo lên giá, đứa trẻ cúi chào võ sư rời sân tập |
| 278 | `tham-con` | Về tẩm cung thăm con | act-tham-con, act-tham-con(thẻ) | giữ |
| 279 | `gui-thu-qua-con` | Gửi thư, quà thăm con · Ngươi gửi thư và quà cho X | act-tham-con, act-tham-con(thẻ) | **MỚI** — Cung nữ ôm hộp quà và lá thư đi qua cổng cung về phủ hoàng tử |
| 280 | `chua-benh-con` | Chữa bệnh cho con | act-chua-benh-con | giữ |
| 281 | `cham-soc-con` | Chăm sóc · Chăm sóc X | act-chua-benh-con, act-chua-benh-con(thẻ) | **MỚI** — Phi tần ngồi bên giường con, đắp khăn mát lên trán đứa trẻ ngủ |
| 282 | `xin-thuoc-cho` | Xin thuốc cho X | act-chua-benh-con | **MỚI** — Phi tần nhận gói thuốc từ thái y ở cửa Thái y viện |
| 283 | `dan-con-thinh-an` | Đưa con đến thỉnh an Hoàng thượng | act-dan-con-thinh-an | giữ |
| 284 | `dan-di-thinh-an` | Dẫn X thỉnh an · Dẫn đi thỉnh an Hoàng thượng | act-dan-con-thinh-an, act-dan-con-thinh-an(thẻ) | **MỚI** — Phi tần dắt tay con qua sân lớn tới điện của Hoàng thượng |
| 285 | `thinh-an-ban-khong-gap` | Dẫn X đi thỉnh an, Hoàng thượng bận không gặp | ev-thinh-an | **MỚI** — Thái giám cúi người trước cửa điện đóng, mẹ con đứng chờ |
| 286 | `canh-con` | Canh giữ các con · Ngươi cắt người canh giữ các con N tháng | act-canh-con, act-canh-con(thẻ) | giữ |
| 287 | `nho-con-noi-giup` | Nhờ con vào cung nói giúp | act-xin-che-cho, act-xin-che-cho(thẻ) | **MỚI** — Phi tần dặn dò người con trưởng thành mặc triều phục trước khi vào điện |
| 288 | `con-noi-tot` | X vào cung hầu chuyện Hoàng thượng, khéo nói tốt cho ngươi | act-cat-hau-ha | **MỚI** — Hoàng tử trưởng thành đứng nói với Hoàng thượng, ngài gật đầu cười |
| 289 | `con-chi-hoi-han` | Nói giúp không thành · X vào cung, Hoàng thượng chỉ hỏi han con vài câu | ev-con-tre-2, act-cat-giao-thiep | **MỚI** — Hoàng thượng chỉ hỏi han hoàng tử vài câu, phẩy tay áo cho lui |
| 290 | `con-quy-xin-cho-me` | X vào cung quỳ xin cho mẹ; Hoàng thượng giảm cấm túc của X một tháng · X vào cung quỳ xin cho mẹ; Hoàng thượng giảm cấm túc của ngươi một thá | ev-hinh-phat | **MỚI** — Hoàng tử trưởng thành quỳ trước long ỷ dập đầu xin cho mẹ |
| 291 | `ban-hon-su` | Bàn hôn sự | act-hon-su, act-hon-su(thẻ) | **MỚI** — Phi tần và bà mối ngồi xem tranh chân dung các công tử trải trên bàn |
| 292 | `ga-quyen-than` | Gả X vào nhà quyền thần · Hứa gả cho X · X, con ngươi, được hứa gả cho X, con trai X · X, con ngươi, được hứa gả cho X, con trai X; nhà ấy chống lưng X · (+1) | ev-con-tre-2, act-hon-su | **MỚI** — Hai bên trao canh thiếp đỏ trên khay, thư từ hôn ước, nến hỷ |
| 293 | `chua-ban-hon` | Chưa bàn vội · Ngươi chưa vội bàn hôn sự cho X | act-cat-giao-thiep | **MỚI** — Phi tần gấp quyển tranh chân dung lại, đặt sang bên |
| 294 | `hoang-thuong-chi-hon` | Hoàng thượng tự chỉ hôn | ev-con-tre-2 | **MỚI** — Thái giám đọc thánh chỉ chỉ hôn, công chúa quỳ nhận |
| 295 | `xuat-gia-phu-ma` | X xuất giá về phủ phò mã X | act-cat-giao-thiep | **MỚI** — Kiệu hoa đỏ rời cổng cung, đoàn rước dài, pháo hoa giấy |
| 296 | `xin-lay-nguoi-thuong` | Xin Hoàng thượng cho con lấy người con thương | ev-con-tre-2 | **MỚI** — Phi tần cùng con gái quỳ xin trước Hoàng thượng |
| 297 | `khong-chuan-lay` | Hoàng thượng không chuẩn cho X lấy X | act-cat-giao-thiep | **MỚI** — Hoàng thượng quay đi, công chúa cúi đầu buồn lặng đứng sau mẹ |
| 298 | `con-biet-me-xin` | Con biết ngươi đã xin | ev-con-tre-2 | **MỚI** — Công chúa nắm tay mẹ cảm ơn bên hiên |
| 299 | `dang-con-hoa-than` | Dâng con đi hòa thân Bắc Địch · X khóc từ biệt mẫu thân, theo đoàn sứ lên phương bắc · X, con ngươi, theo sứ đoàn sang Bắc Địch hòa thân | ev-hoa-than, act-cat-giao-thiep | **MỚI** — Công chúa áo cưới đỏ cúi chào mẹ lần cuối trước xe ngựa sứ đoàn phương bắc |
| 300 | `quy-xin-giu-con` | Quỳ xin giữ con lại | ev-hinh-phat | **MỚI** — Phi tần quỳ trước Hoàng thượng, ôm chặt con gái bên cạnh |
| 301 | `thuan-y-hoang-thuong` | Thuận theo ý Hoàng thượng | act-cat-giao-thiep | **MỚI** — Phi tần cúi đầu thuận ý, công chúa đứng bên |
| 302 | `tien-cu-tong-nu` | Tiến cử một tông nữ · Tiến cử một tông nữ, tự lo hồi môn | act-chon-nguoi | **MỚI** — Phi tần dẫn một tông nữ áo hồng đến trình Hoàng thượng |
| 303 | `thuan-dai-cuc` | Thuận theo đại cục | act-cat-giao-thiep | **MỚI** — Phi tần đứng trên lầu thành nhìn đoàn xe sứ đi xa |
| 304 | `de-con-thu-tu` | Ngươi để X thư từ với X · Để con qua lại thư từ | act-cat-giao-thiep, ev-con-tre-2 | **MỚI** — Công chúa đọc lá thư bên song cửa, mỉm cười |
| 305 | `cam-con-gap` | Cấm con gặp lại · Ngươi cấm X gặp lại X | act-cat-giao-thiep, ev-con-tre-2 | **MỚI** — Phi tần cầm lá thư gấp lại, công chúa cúi đầu đứng trước mẹ |
| 306 | `ran-day-pho-ma` | Hoàng thượng răn dạy phò mã X; X vui hơn · Xin Hoàng thượng răn dạy phò mã | act-cat-giao-thiep | **MỚI** — Hoàng thượng răn dạy phò mã đang quỳ, công chúa đứng sau |
| 307 | `khuyen-con-nhan-nhin` | Khuyên con nhẫn nhịn · Ngươi khuyên X nhẫn nhịn | act-cat-giao-thiep, ev-con-tre-2 | **MỚI** — Mẹ nắm tay con gái đã xuất giá, khuyên nhủ bên bàn trà |
| 308 | `cho-con-du-thi` | Cho con dự thi | ev-con-tre-2 | **MỚI** — Đứa trẻ hoàng tộc cúi chào trước bàn giám khảo, giấy bút bày sẵn |
| 309 | `cao-benh-cho-con` | Cáo bệnh cho con ở nhà | act-gia-benh | **MỚI** — Đứa trẻ nằm trên giường đắp chăn, mẹ ngồi bên, cửa đóng |
| 310 | `bat-con-doc-sach` | Bắt con đóng cửa đọc sách | ev-con-tre-2 | **MỚI** — Hoàng tử thiếu niên ngồi đọc sách trong phòng đóng cửa |
| 311 | `de-con-ket-giao` | Để con tiếp tục kết giao | ev-con-tre-2 | **MỚI** — Hoàng tử thiếu niên cưỡi ngựa cùng các công tử ngoài vườn săn |
| 312 | `con-di-tuan-bien` | Xin cho con đi tuần biên | ev-con-tre-2 | **MỚI** — Hoàng tử mặc giáp nhẹ cúi chào mẹ trước khi lên ngựa ra biên |
| 313 | `dang-nghe-cong-chua` | Cho X dâng X · X, các công chúa dâng nghệ | ev-con-tre-2, act-cat-hau-ha | **MỚI** — Các công chúa nhỏ múa dâng nghệ trước Hoàng thượng trong yến |
| 314 | `bong-con` | Xin bế con nàng về nuôi | act-bong-con, act-bong-con(thẻ) | giữ |
| 315 | `be-con-chua-chuan` | Ngươi xin bế X về nuôi; Hoàng thượng chưa chuẩn · X xin bế X về nuôi; Hoàng thượng chưa chuẩn | act-cat-cham-con | **MỚI** — Hoàng thượng lắc đầu, phi tần đứng bên chiếc nôi trống |
| 316 | `duoc-be-con` | Hoàng hậu được chuẩn bế X về nuôi, vì phẩm vị X còn thấp · Hoàng hậu được chuẩn bế X về nuôi, vì phẩm vị ngươi còn thấp · Ngươi được chuẩn bế X về nuôi, vì phẩm vị X còn thấp · Ngươi được chuẩn bế X về nuôi, vì phẩm vị ngươi còn thấp · (+2) | act-cat-cham-con | **MỚI** — Phi tần cao phẩm bế đứa trẻ trong khăn đỏ ra khỏi cung, mẹ ruột đứng nhìn |
| 317 | `lap-thai-tu` | Hoàng thượng lập X, con của X, làm Thái tử · Hoàng thượng lập X, con của ngươi, làm Thái tử · Ngươi là mẹ Thái tử, danh vọng thêm cao · XHoàng thượng phế X, lập X làm Thái tử | ev-con-tre-2, act-cat-giao-thiep | **MỚI** — Thái tử nhỏ đội mũ ngọc quỳ nhận kim sách giữa điện |
| 318 | `phe-thai-tu` | Ngôi Đông cung bỏ trống · X bị phế ngôi Thái tử | act-cat-giao-thiep | **MỚI** — Mũ ngọc Thái tử đặt trên khay, cửa Đông cung khép lại |
| 319 | `thai-tu-trung-doc` | Bát chè độc dâng X bị thử ra, tra đến người của X · Bát chè độc dâng X bị thử ra, tra đến người của ngươi | act-cat-hau-ha | **MỚI** — Thái giám thử độc giơ chiếc trâm bạc đã đen bên bát chè |
| 320 | `luyen-cam-ky` | Luyện cầm kỳ thi họa · Luyện tập | act-luyen-cam-ky, act-luyen-cam-ky(thẻ) | giữ |
| 321 | `tu-hoc` | Tự học · Tự học X | act-luyen-cam-ky, act-luyen-cam-ky(thẻ) | **MỚI** — Phi tần ngồi một mình bên án thư đọc sách đàn, sách mở |
| 322 | `hoc-voi-thay` | Học với thầy · Học với thầy X | act-day-con-hoc, act-day-con-hoc(thẻ) | **MỚI** — Phi tần học đàn với một nữ sư lớn tuổi trong thư phòng |
| 323 | `hoc-tai-nghe` | Học X | ev-tai-nghe | **MỚI** — Phi tần chăm chú tập viết dưới sự chỉ dẫn của nữ sư |
| 324 | `doc-binh-thu` | Đọc binh thư, sử sách | act-doc-binh-thu, act-doc-binh-thu(thẻ) | giữ |
| 325 | `lam-tho-v2` | Làm thơ dâng lên | act-lam-tho-v2, act-lam-tho-v2(thẻ) | giữ |
| 326 | `gui-bai-tho-cu` | Gửi bài thơ cũ | act-lam-tho-v2 | **MỚI** — Cuộn thơ cũ buộc dây đỏ đặt trên khay, cung nữ cầm mang đi |
| 327 | `lam-tho-trung-cuu` | Làm thơ Trùng cửu | act-lam-tho-v2 | **MỚI** — Tiết Trùng cửu: phi tần viết thơ bên bình hoa cúc vàng trên núi giả |
| 328 | `giu-bai-tho` | Giữ bài thơ, đáp lại | act-lam-tho-v2 | **MỚI** — Phi tần cất bài thơ của người gửi vào hộp, cầm bút viết thư đáp |
| 329 | `dot-tho` | Đốt đi, làm ngơ | act-cat-giao-thiep | **MỚI** — Tờ thư cháy trong chậu than, phi tần quay đi |
| 330 | `ve-tranh` | Vẽ chân dung tặng Thái hậu | act-ve-tranh, act-ve-tranh(thẻ) | giữ |
| 331 | `theu-thua` | Luyện thêu thùa, chữ nghĩa | act-theu-thua, act-theu-thua(thẻ) | giữ |
| 332 | `tu-theu-chu-tho` | Tự thêu trăm chữ Thọ | ev-tai-nghe | **MỚI** — Phi tần thêu tấm gấm đỏ hoa văn chúc thọ bằng chỉ vàng (không chữ), khung thêu |
| 333 | `ung-tac` | Ứng tác ngay trước mặt Hoàng thượng | act-cat-giao-thiep | **MỚI** — Phi tần đứng ngâm thơ ứng khẩu giữa yến, Hoàng thượng và quan văn ngồi nghe |
| 334 | `thi-tai-nu` | Dự thi Tài nữ ở Hàn lâm viện | act-thi-tai-nu | giữ |
| 335 | `bi-tuoc-tai-nu` | Cả cung tin ngươi đạo thơ · Ngươi bị tước danh hiệu Tài nữ | act-cat-giao-thiep, act-cat-hoc-tap | **MỚI** — Quan Hàn lâm thu lại cuộn bằng khen, phi tần cúi đầu |
| 336 | `rua-tieng-oan-tho` | Ngươi rửa được tiếng oan, X bẽ mặt | act-cat-giao-thiep | **MỚI** — Phi tần đứng thẳng giữa sân Hàn lâm, các quan gật đầu, người vu cáo cúi mặt |
| 337 | `khac-sach` | Xin khắc in sách của cha | act-khac-sach | giữ |
| 338 | `dan-bi-cat-day` | Đàn của ngươi bị cắt dây trước buổi diễn | act-cat-hoc-tap | **MỚI** — Cây đàn cổ cầm dây đứt nằm trên bàn, kéo bỏ quên bên cạnh |
| 339 | `pha-thi` | Mưu phá việc học của X bị lộ · Ngươi phá X · Ra tay với X · X phá X | act-cat-hai-nguoi, ev-tai-nghe | **MỚI** — Bàn tay lén bỏ một hạt cát vào ống tay áo múa của người khác trong phòng thay đồ |
| 340 | `ra-tay-bi-bat` | Ngươi ra tay với X bị bắt quả tang · Ngươi ra tay với ngươi bị bắt quả tang · X ra tay với X bị bắt quả tang · X ra tay với ngươi bị bắt quả tang | ev-tan-phong | **MỚI** — Thái giám nắm cổ tay người đang lén phá đồ của thí sinh, mọi người quay lại |
| 341 | `vong-tai-nghe` | Vòng Tài nghệ | ev-tai-nghe | **MỚI** — Sân thi tài nghệ: các phi tần ngồi hàng, một người đàn trên bục |
| 342 | `vong-duc-hanh` | Vòng Đức hạnh | act-cat-giao-thiep | **MỚI** — Thái hậu hỏi đáp, các phi tần đứng hàng cúi đầu trả lời |
| 343 | `vong-the-luc` | Vòng Thế lực | act-cat-trieu-chinh | **MỚI** — Các đại thần quỳ dâng tấu tiến cử, phi tần đứng chờ |
| 344 | `tranh-ghe-xong` | Tranh ghế xong | ev-tan-phong | **MỚI** — Thái giám tuyên kết quả, phi tần thắng cúi tạ, người khác lui |
| 345 | `van-dong-do-dau` | Vận động người đỡ đầu | act-cat-giao-thiep | **MỚI** — Phi tần gửi lễ vật đến phủ một vị phu nhân quyền quý |
| 346 | `duong-nhan` | Dưỡng nhan | act-duong-nhan, act-duong-nhan(thẻ) | giữ |
| 347 | `chai-chuot-nhan-sac` | Chải chuốt, giữ nhan sắc | act-duong-nhan, act-duong-nhan(thẻ) | **MỚI** — Cung nữ chải mái tóc dài của chủ bằng lược ngọc trước gương |
| 348 | `nghi-ngoi` | Nghỉ ngơi dưỡng sức | act-nghi-ngoi, act-nghi-ngoi(thẻ) | giữ |
| 349 | `nghi-lay-suc` | Nghỉ lấy sức | act-nghi-ngoi, act-nghi-ngoi(thẻ) | **MỚI** — Cung nữ ngồi tựa cột hành lang nhắm mắt nghỉ, chổi dựng bên |
| 350 | `o-yen-nghi` | Ở yên trong cung nghỉ ngơi | act-nghi-ngoi | **MỚI** — Ngày Tết, phi tần ngồi bên lò sưởi trong cung đọc sách, câu đối đỏ ngoài cửa (không chữ) |
| 351 | `tinh-duong` | Tĩnh dưỡng | act-nghi-ngoi | **MỚI** — Phi tần nằm nghỉ trên giường, bát thuốc bên cạnh, rèm che nửa |
| 352 | `ngu-dem` | Ngủ đêm hồi sức | act-ngu-dem | giữ |
| 353 | `ngu-som` | Ngủ sớm | act-ngu-dem | **MỚI** — Đêm giao thừa, phi tần đã ngủ, đèn tắt, ngoài cửa pháo hoa xa |
| 354 | `o-cung-giu-am` | Ở cung giữ ấm | act-cat-giao-thiep | **MỚI** — Phi tần ngồi bên lò than, khoác áo choàng lông, tuyết rơi ngoài cửa |
| 355 | `nghi-tay` | Nghỉ tay một lát | act-nghi-tay, act-nghi-tay(thẻ) | giữ |
| 356 | `thuong` | Thưởng cung nữ | act-thuong, act-thuong(thẻ) | giữ |
| 357 | `ban-thuong` | Ban thưởng · Ngươi ban thưởng cho X | act-thuong, act-thuong(thẻ) | **MỚI** — Phi tần trên ghế, thái giám bưng khay bạc trao thưởng cho phi tần thấp phẩm |
| 358 | `thuong-vi` | Thưởng X vì X · Thưởng vì X | act-thuong, act-cat-ban-thuong(thẻ) | **MỚI** — Phi tần trao vòng bạc cho cung nữ đang quỳ tạ |
| 359 | `thuong-vo-co` | Thưởng X · Thưởng X vô cớ · Thưởng vô cớ | act-cat-ban-thuong, act-cat-ban-thuong(thẻ) | **MỚI** — Phi tần thả nén bạc vào tay cung nữ ngỡ ngàng |
| 360 | `phat-vi` | Phạt X vì X · Phạt vì X | ev-khach-den-2, act-cat-trung-phat(thẻ) | **MỚI** — Cung nữ quỳ chịu phạt giữa sân, chủ đứng trên thềm |
| 361 | `phat-vo-co` | Phạt X · Phạt X vô cớ · Phạt vô cớ | ev-cung-nhan, ev-khach-den-2 | **MỚI** — Cung nữ quỳ úp mặt, chủ quay lưng bỏ đi |
| 362 | `tra-khao` | Tra khảo · Tra khảo X | act-tra-khao, act-tra-khao(thẻ) | giữ |
| 363 | `xu-toi` | Xử tội | act-tra-khao, act-tra-khao(thẻ) | **MỚI** — Hoàng hậu ngồi xử tội, phi tần phạm tội quỳ dưới, thái giám cầm sổ |
| 364 | `an-xa` | Ngươi ân xá cho X · Ân xá | act-an-xa, act-an-xa(thẻ) | giữ |
| 365 | `chuong-su-tra-xet` | Chưởng sự tra xét cung nữ · X tra xét cung nữ | act-tra-khao, act-tra-khao(thẻ) | **MỚI** — Ma ma chưởng sự cầm sổ đi qua hàng cung nữ đứng cúi đầu |
| 366 | `them-cung-nu` | Thêm cung nữ | act-chon-nguoi, act-chon-nguoi(thẻ) | **MỚI** — Ma ma Nội vụ phủ dẫn một cung nữ mới đến cúi chào |
| 367 | `them-thai-giam` | Thêm thái giám | act-chon-nguoi, act-chon-nguoi(thẻ) | **MỚI** — Tổng quản dẫn một tiểu thái giám mới đến cúi chào |
| 368 | `doi-nguoi` | Nội vụ phủ đưa X đến thay · Trả X về Nội vụ phủ · Trả X về Nội vụ phủ; Nội vụ phủ đưa X đến thay · XNội vụ phủ đưa cung nữ X đến hầu thay · (+1) | act-cat-giao-thiep, act-cat-di-lai | **MỚI** — Cung nữ cũ mang tay nải đi ra, cung nữ mới bước vào |
| 369 | `xem-nguoi` | Xem người | act-chon-nguoi, act-chon-nguoi(thẻ) | **MỚI** — Phi tần ngồi xem hàng cung nữ đứng trong sân |
| 370 | `tien-cu` | Tiến cử · Tiến cử X lên Nội vụ phủ | act-chon-nguoi, act-chon-nguoi(thẻ) | **MỚI** — Phi tần đưa thư tiến cử cho tổng quản Nội vụ phủ, cung nữ đứng bên |
| 371 | `che-cho-than-hinh` | Che chở (đang bị bắt tội) · Che chở X trước Thận Hình ti | act-xin-che-cho, act-xin-che-cho(thẻ) | **MỚI** — Phi tần đứng chắn trước cung nữ, thị vệ Thận Hình ti dừng lại |
| 372 | `cai-nguoi-vao-cung` | Cài người vào cung khác · Ngươi cài X vào cung X làm tai mắt · Ngươi cài X vào cung ngươi làm tai mắt · X cài X vào cung X làm tai mắt · (+1) | ev-tai-mat, act-cai-tai-mat | **MỚI** — Cung nữ mang tay nải vào cổng một cung khác, ngoái nhìn chủ cũ từ xa |
| 373 | `mua-chuoc` | Mua chuộc · Mua chuộc cung nữ | act-cai-tai-mat, act-cai-tai-mat(thẻ) | **MỚI** — Phi tần kín đáo dúi nén bạc vào tay cung nữ cung khác sau cột đỏ |
| 374 | `cai-tai-mat` | Cài tai mắt | act-cai-tai-mat, act-cai-tai-mat(thẻ) | giữ |
| 375 | `nghe-loi-tai-mat` | Nghe lời, làm tai mắt | act-cai-tai-mat | **MỚI** — Cung nữ cúi đầu nhận lời, nắm chặt túi bạc vừa nhận |
| 376 | `nhan-bac-tai-mat` | Nhận bạc, làm tai mắt | act-cai-tai-mat | **MỚI** — Cung nữ giấu túi bạc vào tay áo, nhìn quanh |
| 377 | `nhan-lam-tai-mat` | Nhận làm tai mắt · Thu làm tai mắt | ev-tai-mat | **MỚI** — Phi tần gật đầu, tiểu thái giám quỳ dập đầu nhận việc |
| 378 | `doa-to-doi-thuc` | Dọa tố đối thực · Ngươi dọa tố chuyện đối thực của X; hắn/nàng sợ hãi, thành tai mắt · X dọa tố chuyện đối thực của X; hắn/nàng sợ hãi, thành tai mắt | ev-tai-mat, act-to-giac | **MỚI** — Phi tần giơ chiếc khăn tay thêu làm bằng chứng, thái giám cúi đầu sợ hãi |
| 379 | `tu-choi-bac-mach-chu` | Cung nữ X từ chối bạc của X và báo cho chủ · Cung nữ X từ chối bạc của ngươi và báo cho chủ · X từ chối bạc của X và mách chủ · X từ chối bạc của ngươi và mách chủ | ev-cung-nhan, act-cat-buon-ban | **MỚI** — Cung nữ đẩy túi bạc lại, quay đi về phía cung chủ |
| 380 | `cung-nu-bi-mua-khai` | Cung nữ X của X bị ngươi mua chuộc, khai ra mưu kế của chủ · Cung nữ X của ngươi bị X mua chuộc, khai ra mưu kế của chủ · Cung nữ X của ngươi bị ngươi mua chuộc, khai ra mưu kế của chủ | ev-cung-nhan | **MỚI** — Cung nữ nhận bạc của người lạ sau cột, thì thầm tiết lộ |
| 381 | `ban-dung` | Ngươi bán đứng X, đem chuyện của X dâng lên Hoàng thượng · X bán đứng X, đem chuyện của X dâng lên Hoàng thượng | act-cat-hau-ha | **MỚI** — Cung nữ quỳ trước Hoàng thượng trình chuyện của chủ cũ |
| 382 | `ban-dung-hh` | Ngươi bán đứng X, đem chuyện của X dâng lên Hoàng hậu · X bán đứng X, đem chuyện của X dâng lên Hoàng hậu | act-cat-hau-ha | **MỚI** — Cung nữ quỳ trước Hoàng hậu trình chuyện của chủ cũ |
| 383 | `ban-dung-ta` | Ngươi bán đứng X, đem chuyện của X dâng lên ngươi · X bán đứng X, đem chuyện của X dâng lên ngươi | act-cat-hau-ha | **MỚI** — Cung nữ cung khác quỳ trước phi tần, dâng chuyện của chủ mình |
| 384 | `ban-tin-phat-oan` | X, kẻ từng bị ngươi phạt oan, lén bán tin cho X | ev-khach-den-2 | **MỚI** — Cung nữ bị phạt oan lén đưa thư cho người cung khác qua khe cửa |
| 385 | `tieu-duc-tu-ban-chuyen` | Tiểu Đức Tử mang chuyện cung ngươi đi bán | act-cat-buon-ban | **MỚI** — Tiểu thái giám nhận bạc ở cửa hông, thì thầm với người lạ |
| 386 | `tieu-thai-giam-bat-nat` | Tiểu thái giám Nội vụ phủ bắt nạt, bắt ngươi xách thêm hai gánh nước | ev-cung-nhan | **MỚI** — Cung nữ gánh hai thùng nước nặng, tiểu thái giám đứng chống nạnh |
| 387 | `quen-o-noi-vu` | Ở Nội vụ phủ ngươi quen X, X của X · Ở Nội vụ phủ ngươi quen X, X của ngươi | act-cat-giao-thiep | **MỚI** — Hai cung nữ chào nhau bên quầy Nội vụ phủ đầy đồ |
| 388 | `linh-luong` | Lĩnh lương tháng | act-cat-giao-thiep | **MỚI** — Cung nữ nhận túi bạc lương ở quầy Nội vụ phủ |
| 389 | `linh-do` | Lĩnh đồ ở Nội vụ phủ · Nhận X từ Nội vụ phủ | act-cat-giao-thiep, act-linh-do | giữ |
| 390 | `noi-vu-thay-la` | Nội vụ phủ thấy lạ, X không nhận X · Nội vụ phủ thấy lạ, ngươi không nhận X | act-cat-giao-thiep | **MỚI** — Thái giám Nội vụ phủ cầm phiếu nhìn nghi ngờ, lắc đầu |
| 391 | `noi-vu-chua-co-nguoi` | Nội vụ phủ chưa có người thay · Nội vụ phủ chưa duyệt việc trả X về | act-cat-giao-thiep | **MỚI** — Thái giám Nội vụ phủ dở sổ, lắc đầu, chưa có người |
| 392 | `bi-duoi-ve-noi-vu` | X bị đuổi về Nội vụ phủ · Đuổi khỏi cung | ev-khach-den-2 | **MỚI** — Cung nữ ôm tay nải bị thái giám dẫn ra cổng |
| 393 | `xin-chuyen-hau` | X xin chuyển sang hầu X, cung có phẩm cao hơn | act-cat-hau-ha | **MỚI** — Cung nữ mang tay nải cúi chào ở cổng một cung lớn hơn |
| 394 | `ve-hau` | X Ngươi về hầu Hoàng hậu X · X Ngươi về hầu X | act-cat-hau-ha | **MỚI** — Cung nữ mới cúi chào chủ mới trong chính điện |
| 395 | `bi-day-tan-gia-kho` | X Ngươi bị đày xuống Tân Giả khố X tuần | act-cat-giao-thiep | **MỚI** — Cung nữ áo vải chà giặt bên chồng chậu gỗ ở Tân Giả khố |
| 396 | `vao-cung-cung-nu` | Ngươi vào cung làm cung nữ, hầu Hoàng hậu X · Ngươi vào cung làm cung nữ, hầu X | ev-cung-nhan | **MỚI** — Cung nữ mới vào cung đứng hàng trong sân Nội vụ phủ, ma ma điểm danh |
| 397 | `duoc-thang-cung-nu` | X được thăng X · Được thăng X | ev-tan-phong | **MỚI** — Cung nữ cúi nhận lệnh bài mới từ ma ma, các cung nữ khác chúc mừng |
| 398 | `thuong-bac-cung-nu` | X chia cho ngươi ít bánh trái và N lạng bạc · X vui lòng, thưởng ngươi N lạng bạc | act-cat-ban-thuong, act-cat-buon-ban | **MỚI** — Chủ nhân mỉm cười đặt bạc vào tay cung nữ |
| 399 | `chu-nho-on` | Chủ mềm lòng · Chủ nhân nhớ ơn | act-cat-giao-thiep | **MỚI** — Chủ nhân đỡ cung nữ dậy, vẻ hiền hòa |
| 400 | `chu-cang-buc` | Chủ càng bực | act-cat-giao-thiep | **MỚI** — Chủ nhân quay lưng phất tay áo, cung nữ quỳ |
| 401 | `bi-danh-truong` | X bị đánh bốn mươi trượng · X sai thái giám đánh ngươi hai mươi trượng | ev-hinh-phat | **MỚI** — Ghế dài và gậy trượng trong sân hình, thái giám đứng chờ, không máu |
| 402 | `bi-phat-quy` | Bị phạt quỳ giữa sân · X sai người phạt ngươi quỳ trên đá vụn | ev-hinh-phat | **MỚI** — Cung nữ quỳ một mình giữa sân đá lớn dưới nắng, các cung nữ khác đi qua |
| 403 | `khong-tin-danh-don` | X không tin ngươi, sai đánh đòn | ev-khach-den-2 | **MỚI** — Chủ nhân chỉ tay, thái giám kéo cung nữ ra ngoài |
| 404 | `thanh-minh-duoc` | Ngươi thanh minh được; X bị phạt vì vu cáo | ev-vu-oan | **MỚI** — Cung nữ đứng thẳng, kẻ vu cáo bị thái giám dẫn đi |
| 405 | `gian-la-loi` | X biết chuyện, giận ngươi lả lơi | act-cat-giao-thiep | **MỚI** — Chủ nhân nhìn cung nữ giận dữ, chiếc khăn tay rơi dưới đất |
| 406 | `o-lai-lam-ma-ma` | Ngươi ở lại cung làm ma ma · Ở lại làm ma ma | ev-cung-nhan | **MỚI** — Ma ma trung niên đẹp dạy các cung nữ trẻ xếp áo |
| 407 | `xin-giu-lai` | Chủ xin Nội vụ phủ giữ ngươi lại · X xin Nội vụ phủ giữ ngươi lại · Xin chủ giữ lại · Xin ở lại | act-cat-giao-thiep | **MỚI** — Chủ nhân nói với thái giám Nội vụ phủ, cung nữ đứng sau mừng rỡ |
| 408 | `xin-o-lai-hau-chu` | Xin ở lại hầu chủ | act-cat-hau-ha | **MỚI** — Cung nữ quỳ xin ở lại, chủ nhân đặt tay lên vai nàng |
| 409 | `ta-on-xuat-gia` | Tạ ơn, xuất giá | act-cat-giao-thiep | **MỚI** — Cung nữ áo đỏ cúi tạ chủ trước khi lên kiệu nhỏ |
| 410 | `xuat-cung-ve-que` | Xuất cung về quê | act-cat-giao-thiep | **MỚI** — Cung nữ mang tay nải đi ra cổng Thần Vũ, cánh đồng xa |
| 411 | `xuat-cung-thanh-than` | Xuất cung thành thân với X | act-cat-giao-thiep | **MỚI** — Cung nữ và chàng thị vệ cúi chào trước cổng cung |
| 412 | `theo-ve-vuong-phu` | Theo về vương phủ | act-cat-giao-thiep | **MỚI** — Cung nữ theo kiệu vương gia ra khỏi cổng cung |
| 413 | `ban-ga` | X, cung nữ của X, được chủ ban gả cho X · X, cung nữ của ngươi, được chủ ban gả cho X | ev-cung-nhan | **MỚI** — Cung nữ áo đỏ quỳ tạ chủ, chàng thị vệ đứng bên |
| 414 | `tu-tinh-cung-nu-lo` | X, cung nữ của X, tư tình với X bị lộ · X, cung nữ của ngươi, tư tình với X bị lộ | ev-cung-nhan, ev-bien-ai-2 | **MỚI** — Thị vệ bắt một cung nữ và chàng thị vệ ở góc vườn đêm |
| 415 | `cung-nu-lot-mat-xanh` | Cung nữ X của X hầu thay, được sủng hạnh, phong X và trở mặt với chủ c · Cung nữ X của X hầu thay, được sủng hạnh, phong X và vẫn nhớ ơn chủ cũ · Cung nữ X của ngươi hầu thay, được sủng hạnh, phong X và trở mặt với c · Cung nữ X của ngươi hầu thay, được sủng hạnh, phong X và vẫn nhớ ơn ch · (+4) | act-cat-giao-thiep, ev-cung-nhan | **MỚI** — Cung nữ cúi đầu bên Hoàng thượng, áo mới phi tần, chủ cũ đứng xa |
| 416 | `cung-nu-hau-thay-mot-dem` | Cung nữ X của X hầu thay một đêm rồi được thả ra cung với chút bạc · Cung nữ X của ngươi hầu thay một đêm rồi được thả ra cung với chút bạc | ev-cung-nhan | **MỚI** — Cung nữ mang tay nải nhỏ ra cổng cung sáng sớm |
| 417 | `giat-do` | Giặt đồ | act-giat-do | giữ |
| 418 | `quet-san` | Quét sân, lau điện | act-cat-hau-ha | **MỚI** — Cung nữ quét lá trong sân điện, một người lau cột |
| 419 | `doc-thuc-quet-don` | Đốc thúc cung nữ quét dọn | ev-cung-nhan | **MỚI** — Chưởng sự cung nữ đứng chỉ tay, các cung nữ quét dọn |
| 420 | `dang-tra` | Dâng trà, hầu điểm tâm | act-dang-tra | giữ |
| 421 | `hau-tra-ngu-gia` | Hầu trà khi ngự giá | act-dang-tra | **MỚI** — Cung nữ bưng khay trà tới bàn Hoàng thượng và chủ đang ngồi đêm |
| 422 | `rot-ruou-ngu-toa` | Rót rượu gần ngự tọa | act-dang-tra | **MỚI** — Cung nữ rót rượu cho Hoàng thượng ở yến tiệc, đứng nghiêng người |
| 423 | `theo-hau` | Theo hầu chủ | act-theo-hau | giữ |
| 424 | `viec-chu-sai` | Việc chủ sai | act-theo-hau | **MỚI** — Cung nữ cầm thư của chủ đi nhanh qua hành lang |
| 425 | `dung-sau-hau-chu` | Lui về sau chủ · Đứng sau hầu chủ | act-cat-giao-thiep, act-theo-hau | **MỚI** — Cung nữ đứng sau lưng chủ, cúi đầu, ở yến tiệc |
| 426 | `hoc-le` | Học lễ nghi với cô cô | act-hoc-le | giữ |
| 427 | `day-le-nghi` | Dạy lễ nghi | act-hoc-le, act-hoc-le(thẻ) | **MỚI** — Ma ma dạy một cung nữ trẻ cách vạn phúc, đứng chỉnh tay |
| 428 | `so-sach` | Quản sổ sách trong cung | act-so-sach | giữ |
| 429 | `binh-phong` | Lui sau bình phong | act-binh-phong, act-binh-phong(thẻ) | giữ |
| 430 | `cau-xin-quan-su` | Cầu xin quản sự | act-xin-che-cho | **MỚI** — Cung nữ cúi xin ma ma quản sự đang cầm roi mây |
| 431 | `quan-su-gat-dau` | Quản sự gật đầu | act-cat-giao-thiep | **MỚI** — Ma ma quản sự gật đầu, cung nữ thở phào |
| 432 | `bi-quan-su-bat-gap` | Bị quản sự bắt gặp | act-cat-giao-thiep | **MỚI** — Ma ma quản sự bắt gặp cung nữ đang ngồi nghỉ sau chồng chậu |
| 433 | `cui-dau-nhan-loi` | Cúi đầu nhận lỗi · Nhận tội, xin tha | act-cat-giao-thiep | **MỚI** — Cung nữ quỳ cúi đầu nhận lỗi trước chủ |
| 434 | `khoc-xin-tha` | Khóc lóc xin tha | act-cat-giao-thiep | **MỚI** — Cung nữ quỳ chắp tay xin tha (mặt cúi, không thấy nước mắt) |
| 435 | `cai-lai` | Cãi lại | ev-tranh-sung | **MỚI** — Cung nữ ngẩng đầu đáp lời, chủ nhân giận đập bàn |
| 436 | `vang-lenh` | Vâng lệnh | act-cat-giao-thiep | **MỚI** — Cung nữ cúi đầu nhận lệnh, chủ chỉ tay |
| 437 | `mat-bao-hh` | Mật báo Hoàng hậu · Mật báo cho Hoàng hậu | ev-tai-mat | **MỚI** — Cung nữ quỳ thì thầm trước Hoàng hậu trong phòng kín |
| 438 | `mat-bao-cho` | Mật báo cho X | ev-tai-mat | **MỚI** — Cung nữ đưa mảnh giấy gấp cho cung nữ khác qua khe cửa |
| 439 | `len-bao-tin` | Lén báo tin cho X · Ngươi lén báo cho X mưu của X | act-cat-muu-ke, act-tung-tin | **MỚI** — Cung nữ chạy nhanh qua hành lang đêm cầm đèn, báo tin |
| 440 | `thanh-minh` | Thanh minh | act-cat-giao-thiep | **MỚI** — Cung nữ quỳ thẳng lưng, giơ tay chỉ về phía kẻ vu cáo |
| 441 | `dut-bac-rut-loi` | Đút bạc cho X rút lời | act-cat-buon-ban | **MỚI** — Cung nữ dúi bạc cho cung nữ khác sau gốc cây |
| 442 | `cui-dau-thua-ten` | Cúi đầu thưa tên | act-cat-giao-thiep | **MỚI** — Cung nữ cúi đầu thưa tên trước Hoàng thượng đứng hỏi trong vườn |
| 443 | `bi-bat-tra-khao` | Bị bắt và tra khảo, ngươi cắn răng không khai | act-cat-di-lai | **MỚI** — Cung nữ bị trói tay ngồi trong phòng tối, thái giám cầm đèn hỏi cung |
| 444 | `viec-khong-thanh` | Việc không thành, may chưa ai thấy | act-cat-giao-thiep | **MỚI** — Cung nữ cầm gói bột lén quay về, cửa khép, không ai thấy |
| 445 | `nang-so-viec-nguy` | Nàng sợ vì bị sai việc nguy hiểm | act-cat-giao-thiep | **MỚI** — Cung nữ ôm vai run sợ trong góc, chủ vừa ra lệnh |
| 446 | `doan-ra-do-minh` | X đoán ra ngươi sai người dò mình | act-cat-di-lai | **MỚI** — Phi tần đứng trên hiên nhìn thẳng về phía tên thái giám đang rình |
| 447 | `bat-gap-trao-anh-mat` | Ngươi bắt gặp X lén trao đổi ánh mắt với X | act-cat-buon-ban | **MỚI** — Cung nữ ngó qua rèm thấy phi tần và thị vệ nhìn nhau |
| 448 | `nhan-toi-thay` | Nhận tội thay nàng | act-cat-giao-thiep | **MỚI** — Phi tần đứng ra trước Hoàng hậu, cung nữ quỳ phía sau |
| 449 | `de-nang-chiu-don` | Để nàng chịu đòn | act-cat-giao-thiep | **MỚI** — Phi tần quay mặt đi, cung nữ bị thái giám dẫn ra ngoài |
| 450 | `lam-ngo` | Làm ngơ | act-cat-giao-thiep | **MỚI** — Phi tần cầm quạt đi qua, không nhìn về chuyện bên cạnh |
| 451 | `mua-lay` | Mua lấy | act-mua-hang | **MỚI** — Phi tần đưa bạc mua một phong thư từ tay thái giám lén lút |
| 452 | `phat-chan` | Phát chẩn cho cung nhân | act-phat-chan, act-phat-chan(thẻ) | giữ |
| 453 | `dua-com-ao` | Đưa cơm áo | act-phat-chan, act-phat-chan(thẻ) | **MỚI** — Cung nữ mang giỏ cơm và áo bông đến cho phế phi ở lãnh cung |
| 454 | `li-xi` | Lì xì cung nhân | act-phat-chan | **MỚI** — Phi tần trao bao lì xì đỏ cho các cung nữ quỳ chúc Tết |
| 455 | `nau-chao-phat` | Tự tay nấu cháo phát cho cung nhân | act-phat-chan | **MỚI** — Phi tần múc cháo từ nồi lớn phát cho cung nhân ngày đông |
| 456 | `nau-che-mung` | Nấu chè mừng cả cung | act-cat-hau-ha | **MỚI** — Phi tần nấu nồi chè lớn, cung nữ múc chè ra bát mừng lễ |
| 457 | `tung-kinh` | Tụng kinh, làm việc thiện | act-tung-kinh, act-tung-kinh(thẻ) | giữ |
| 458 | `chep-kinh` | Chép kinh, giữ đức | act-tung-kinh, act-tung-kinh(thẻ) | **MỚI** — Phi tần áo trơn chép kinh bên ngọn đèn trong lãnh cung (không chữ đọc được) |
| 459 | `trong-rau` | Trồng rau | act-trong-rau, act-trong-rau(thẻ) | giữ |
| 460 | `theu-khan-ban` | Thêu khăn bán ra ngoài | act-theu-khan-ban, act-theu-khan-ban(thẻ) | giữ |
| 461 | `theu-khan-ban-lc` | Thêu khăn bán | act-theu-khan-ban, act-theu-khan-ban(thẻ) | **MỚI** — Phế phi áo trơn ngồi thêu khăn bên song cửa lãnh cung |
| 462 | `trai-gioi` | Trai giới cầu đảo | act-cat-le-nghi | **MỚI** — Phi tần áo trắng quỳ trước bàn thờ cầu mưa, lư hương |
| 463 | `le-tru-ta` | Mời sư làm lễ trừ tà | act-cat-le-nghi | **MỚI** — Nhà sư gõ mõ làm lễ trước cung, khói hương, cung nữ đứng xem |
| 464 | `rinh-bat-gia-ma` | Rình bắt kẻ giả ma | ev-tai-mat | **MỚI** — Thái giám cầm đèn nấp sau cột chờ, bóng trắng giả ma ở góc hành lang |
| 465 | `ke-gia-ma` | Kẻ giả ma là cung nữ của X | ev-cung-nhan | **MỚI** — Thái giám kéo tấm vải trắng khỏi một cung nữ, đèn soi |
| 466 | `goi-banh-u` | Gói bánh ú dâng Thái hậu | act-cat-hau-ha | **MỚI** — Phi tần gói bánh ú lá tre bên bàn, giỏ bánh dâng Thái hậu |
| 467 | `tui-ngai` | Đeo túi ngải cho các con | ev-con-tre-2 | **MỚI** — Phi tần đeo túi ngải thêu lên cổ đứa con nhỏ, Tết Đoan ngọ |
| 468 | `cuoc-thuyen-rong` | Đặt cược thuyền rồng | act-cat-giao-thiep | **MỚI** — Thuyền rồng đua trên hồ, phi tần trên lầu đặt bạc cược |
| 469 | `thuyen-ve-nhat` | Thuyền ngươi cược về nhất | act-cat-giao-thiep | **MỚI** — Thuyền rồng cắm cờ đỏ về đích, phi tần reo vui trên lầu (mặt thanh thản) |
| 470 | `theo-len-nui` | Theo ngài lên núi | act-cat-giao-thiep | **MỚI** — Hoàng thượng và phi tần leo bậc đá lên núi mùa thu, lá đỏ |
| 471 | `ruou-cuc` | Dâng rượu cúc chúc thọ Thái hậu | act-cat-hau-ha | **MỚI** — Phi tần dâng chén rượu cúc lên Thái hậu, hoa cúc vàng |
| 472 | `tha-den-cau-sieu` | Thả đèn cầu siêu | act-cat-le-nghi | **MỚI** — Phi tần thả đèn hoa sen trên sông đêm Vu Lan |
| 473 | `cung-phi-tan-oan` | Cúng các phi tần bạc mệnh · Cúng các phi tần chết oan | act-cat-le-nghi, act-cat-buon-ban | **MỚI** — Phi tần thắp hương trước bàn thờ nhỏ ở góc cung, hoa trắng |
| 474 | `muon-le-do-hoi` | Mượn lễ dò hỏi cung nhân | ev-cung-nhan | **MỚI** — Phi tần trò chuyện với cung nhân già bên mâm cúng, hỏi han |
| 475 | `muon-dip-do-tin` | Mượn dịp dò tin | act-nghe-len | **MỚI** — Ngày Thanh minh, phi tần hỏi chuyện thái giám bên đường đi tảo mộ |
| 476 | `theo-hau-le-te` | Xin theo hầu lễ tế | act-cat-hau-ha | **MỚI** — Đoàn lễ tế trước Thái miếu, phi tần đi theo sau Hoàng thượng |
| 477 | `dang-ngoc-nhu-y` | Dâng ngọc Như Ý | act-cat-hau-ha | **MỚI** — Phi tần dâng ngọc Như Ý trên khay gấm lên Thái hậu mừng thọ |
| 478 | `le-mon` | Lễ mọn cho phải phép | act-cat-le-nghi | **MỚI** — Cung nữ dâng một hộp quà nhỏ ở bàn lễ vật mừng thọ |
| 479 | `dang-cau-doi` | Dâng câu đối chúc Tết | act-cat-hau-ha | **MỚI** — Phi tần dâng cuộn giấy đỏ chúc Tết (không chữ) lên Hoàng thượng |
| 480 | `giai-cau-do-den` (rename → `thap-den-thi`) | Thắp đèn thi · Ra phố thắp đèn thi | act-cat-giao-thiep | **MỚI** — Lễ Nguyên tiêu, phi tần đứng dưới dãy đèn lồng nhiều dáng nhiều màu (no riddle slips; nw-lantern 11/16) |
| 481 | `dao-den` | Dạo đèn cùng một phi tần | act-cat-di-lai | **MỚI** — Hai phi tần cầm đèn lồng dạo vườn đêm Nguyên tiêu |
| 482 | `tha-den-cau-con` | Thả đèn cầu con | ev-con-tre-2 | **MỚI** — Phi tần thả đèn lồng giấy đỏ trôi trên hồ cầu con |
| 483 | `tao-mo` | Xin về tảo mộ tổ tiên | act-cat-giao-thiep | **MỚI** — Phi tần quỳ xin Hoàng hậu cho về tảo mộ, cành liễu Thanh minh |
| 484 | `banh-trung-thu` | Dâng bánh trung thu Thái hậu | act-cat-hau-ha | **MỚI** — Phi tần dâng hộp bánh trung thu lên Thái hậu dưới trăng |
| 485 | `lam-banh-cho-con` | Làm bánh cho các con | ev-con-tre-2 | **MỚI** — Phi tần nặn bánh trung thu cùng các con nhỏ |
| 486 | `don-giao-thua` | Thức đón giao thừa bên ngài | act-cat-giao-thiep | **MỚI** — Hoàng thượng và phi tần đứng hiên nhìn pháo hoa giao thừa |
| 487 | `viet-cau-doi` | Viết câu đối mới cho cung | act-cat-giao-thiep | **MỚI** — Phi tần viết lên giấy đỏ (nét trừu tượng, không chữ đọc được), cung nữ dán cửa |
| 488 | `thu-mui-ten` | Xin thử một mũi tên | act-vo-nghe | **MỚI** — Phi tần giương cung nhắm bia ở trường săn, Hoàng thượng xem |
| 489 | `cuoc-thien-xa` | Đặt cược tay thiện xạ | act-vo-nghe | **MỚI** — Các phi tần trên đài đặt bạc cược, xa xa thị vệ bắn cung |
| 490 | `nghe-len` | Nghe lén câu chuyện | act-nghe-len, act-nghe-len(thẻ) | giữ |
| 491 | `do-la` | Dò la · Dò la Hoàng hậu X · Dò la X · Dò la ngươi · (+4) | ev-tai-mat, act-nghe-len | **MỚI** — Thái giám áo sẫm đứng nép cửa sổ cung khác ghi nhớ, đêm |
| 492 | `sai-di-do-la` | Sai đi dò la | act-nghe-len | **MỚI** — Phi tần dặn tiểu thái giám, chỉ về phía cung khác, hắn cúi đầu |
| 493 | `nho-do-tin` | Nhờ dò tin | act-nghe-len, act-nghe-len(thẻ) | **MỚI** — Cung nữ nhờ thái giám bạn dò tin, đưa một gói bánh |
| 494 | `do-la-duoc` | Ngươi dò la được chuyện của X, về bẩm X | ev-tai-mat | **MỚI** — Cung nữ quỳ bẩm chủ, chủ nghiêng tai nghe |
| 495 | `nghe-len-duoc` | X nghe lén chuyện của Hoàng hậu X · X nghe lén chuyện của X · X nghe lén chuyện của ngươi · X nghe lén được chuyện của X | ev-tai-mat | **MỚI** — Bóng người áp tai vào cửa giấy, trong phòng đèn có hai bóng nói chuyện |
| 496 | `nap-nghe-bi-bat` | X nấp nghe ngoài cửa sổ X thì bị người của Hoàng hậu X bắt gặp, bị phạ · X nấp nghe ngoài cửa sổ X thì bị người của X bắt gặp, bị phạt quỳ ngoà · X nấp nghe ngoài cửa sổ X thì bị người của ngươi bắt gặp, bị phạt quỳ  | ev-hinh-phat | **MỚI** — Cung nữ nấp nghe ngoài cửa sổ bị một ma ma nắm tay áo kéo ra |
| 497 | `cai-do` | Cài đồ vào rương nàng | act-cai-do, act-cai-do(thẻ) | giữ |
| 498 | `cai-do-ruong` | Cài đồ vào rương · Ngươi lén cài X · Ngươi lén cài X vào rương X · Ngươi lén cài X vào rương ngươi · (+1) | act-cat-giao-thiep, act-cat-di-lai | **MỚI** — Bàn tay đặt chiếc ngọc bội vào đáy rương áo người khác trong phòng tối |
| 499 | `len-cai` | Ngươi lén X vào X · X lén X vào X | act-cat-di-lai | **MỚI** — Bàn tay giấu gói nhỏ vào gối thêu trên giường người khác |
| 500 | `ke-len-cai-bi-bat` | Kẻ lẻn vào cung X cài X bị bắt, khai ra ngươi · Kẻ lẻn vào cung ngươi cài X bị bắt, khai ra X · Kẻ lẻn vào cung ngươi cài X bị bắt, khai ra ngươi | act-cat-muu-ke | **MỚI** — Thị vệ bắt tiểu thái giám đang lẻn ra khỏi cung với hòm trống |
| 501 | `vu-oan` | Vu oan | act-cai-do, act-cai-do(thẻ) | **MỚI** — Hình nhân vải giấu dưới gầm giường, bàn tay đặt vào, đêm |
| 502 | `tim-thay-hinh-nhan` | Hình nhân bùa ngải được tìm thấy trong tẩm cung X · Trong tẩm cung X tìm thấy hình nhân bùa ngải · Trong tẩm cung ngươi tìm thấy hình nhân bùa ngải | ev-vu-oan | **MỚI** — Thái giám lôi hình nhân vải ra từ dưới gầm giường, mọi người lùi lại |
| 503 | `vu-oan-bi-lo` | Ngươi vu oan X bị lộ · Ngươi vu oan ngươi bị lộ · X vu oan X bị lộ · X vu oan ngươi bị lộ | ev-vu-oan | **MỚI** — Hoàng hậu giơ hình nhân vải, kẻ vu oan quỳ cúi đầu |
| 504 | `dao-duoc-hinh-nhan-trieu` | Trong phòng X đào được hình nhân trù ẻo Hoàng thượng | ev-vu-oan | **MỚI** — Thị vệ đào được hộp gỗ dưới gốc cây trong sân, mở ra có hình nhân vải |
| 505 | `hinh-nhan-lan-goc` | Hình nhân trù ẻo bị lần ra gốc gác | ev-vu-oan | **MỚI** — Thái giám cầm hình nhân vải đi theo dấu đến cửa một cung |
| 506 | `bua-chu` | Vu con nàng trù ẻo | act-bua-chu, act-bua-chu(thẻ) | giữ |
| 507 | `tung-tin` | Tung tin đồn | act-tung-tin, act-tung-tin(thẻ) | giữ |
| 508 | `khap-cung-don` | Khắp cung đồn X tư thông · Khắp cung đồn ngươi tư thông | act-cat-giao-thiep | **MỚI** — Cung nữ khắp các hành lang chụm đầu xì xào, liếc nhìn về một cung |
| 509 | `loi-don-khong-ai-tin` | Lời đồn X tung ra về X không ai tin · Lời đồn X tung ra về ngươi không ai tin · Lời đồn ngươi tung ra về X không ai tin · Lời đồn ngươi tung ra về ngươi không ai tin | ev-tin-don | **MỚI** — Hai cung nữ lắc đầu cười, bỏ đi, người tung tin đứng một mình |
| 510 | `loi-don-phung-phi` | Lời đồn ngươi phung phí lan khắp cung | ev-tin-don | **MỚI** — Cung nữ xì xào bên rương gấm vàng tràn đầy |
| 511 | `ly-gian` | Ly gián · Ngươi ly gián X và X · Ngươi ly gián X và ngươi · Ngươi ly gián ngươi và X · (+3) | act-cat-hai-nguoi, act-tung-tin | **MỚI** — Phi tần nghiêng người thì thầm vào tai Hoàng thượng, chỉ về phía một phi tần đang đi |
| 512 | `ly-gian-khong-tin` | Lời ly gián của X không ai tin · Lời ly gián của ngươi không ai tin · Mưu ly gián của X bị X nhìn thấu · Mưu ly gián của X bị ngươi nhìn thấu · (+2) | act-cat-hai-nguoi | **MỚI** — Hoàng thượng phẩy tay áo không tin, người ly gián cúi đầu |
| 513 | `ha-doc` | Hạ độc | act-ha-doc, act-ha-doc(thẻ) | giữ |
| 514 | `ha-doc-dan` | Hạ độc dần | act-ha-doc, act-ha-doc(thẻ) | **MỚI** — Bàn tay rắc chút bột vào ấm trà mỗi ngày, lịch treo tường |
| 515 | `ngam-doc-dan` | X ngấm độc dần, người gầy rộc · ngươi ngấm độc dần, người gầy rộc | ev-benh-tat | **MỚI** — Phi tần gầy yếu nằm trên giường, bát thuốc bên cạnh |
| 516 | `ha-doc-con` | Hạ độc con nàng | act-ha-doc, act-ha-doc(thẻ) | **MỚI** — Bàn tay nhỏ bột vào bát chè của đứa trẻ trên khay |
| 517 | `trung-doc` | Ngươi trúng độc, nôn ra máu · X trúng độc, thập tử nhất sinh | ev-dau-doc | **MỚI** — Thái y quỳ bên giường phi tần trúng độc, cung nữ hoảng hốt (không máu) |
| 518 | `trung-doc-thuoc-giai` | Ngươi trúng độc, may có thuốc giải trong rương · X trúng độc, may có thuốc giải trong rương | ev-dau-doc | **MỚI** — Cung nữ lấy lọ thuốc giải từ rương, đỡ chủ uống |
| 519 | `thuoc-doc-bi-phat-hien` | Thuốc bổ có vị lạ; thái y kịp phát hiện độc dược ngấm dần · Thuốc độc nhắm vào X bị phát hiện, tra ra người của X · Thuốc độc nhắm vào X bị phát hiện, tra ra người của ngươi · Thuốc độc nhắm vào ngươi bị phát hiện, tra ra người của X · (+1) | ev-dau-doc, ev-benh-tat | **MỚI** — Thái y giơ trâm bạc thử độc đã đen trên bát thuốc |
| 520 | `bat-thuoc-bi-do` | Bát thuốc bị đổ đi, mưu không thành | ev-benh-tat | **MỚI** — Bát thuốc đổ dưới gốc cây, cung nữ cầm khay không |
| 521 | `hoang-hau-bang-ha-tra` | Hoàng hậu X băng hà sau chén trà chiều | ev-quoc-tang | **MỚI** — Chén trà đổ trên án, rèm vàng buông, cung nhân quỳ khóc (mặt cúi) |
| 522 | `xa-huong` | Bỏ xạ hương | act-xa-huong, act-xa-huong(thẻ) | giữ |
| 523 | `mua-chuoc-ba-do` | Mua chuộc bà đỡ | act-mua-chuoc-ba-do, act-mua-chuoc-ba-do(thẻ) | giữ |
| 524 | `cai-ba-do` | Ngươi cài bà đỡ vào cung X, chờ ngày nàng lâm bồn · Ngươi cài bà đỡ vào cung ngươi, chờ ngày nàng lâm bồn · X cài bà đỡ vào cung X, chờ ngày nàng lâm bồn · X cài bà đỡ vào cung ngươi, chờ ngày nàng lâm bồn | act-cat-di-lai | **MỚI** — Bà đỡ trung niên mang hòm đồ bước vào cổng cung phi tần có thai |
| 525 | `pha-viec-hoc` | Phá việc học | act-pha-viec-hoc, act-pha-viec-hoc(thẻ) | giữ |
| 526 | `pha-hoc-lo` | Ngươi mua chuộc thầy dạy, X học hành sa sút · X mua chuộc thầy dạy, X học hành sa sút | ev-tai-nghe | **MỚI** — Thầy dạy nhận túi bạc ở cửa sau, sách học rơi |
| 527 | `day-ho` | Đẩy nàng xuống hồ sen · Đẩy xuống hồ sen | act-day-ho, act-day-ho(thẻ) | giữ |
| 528 | `day-con-xuong-ho` | Đẩy con nàng xuống hồ | act-day-ho, act-day-ho(thẻ) | **MỚI** — Mép hồ sen, chiếc giày nhỏ của trẻ con rơi bên lan can |
| 529 | `bi-day-xuong-ho` | Kẻ định đẩy X xuống hồ bị bắt, khai ra X · Kẻ định đẩy X xuống hồ bị bắt, khai ra ngươi · X bị đẩy xuống hồ sen, may được vớt lên | act-cat-hai-nguoi | **MỚI** — Thái giám vớt phi tần ướt sũng lên bờ hồ sen, các cung nữ đỡ |
| 530 | `ngang-chan` | Ngáng chân · Ngáng chân nàng | act-ngang-chan, act-ngang-chan(thẻ) | giữ |
| 531 | `to-giac` | Tố giác | act-to-giac, act-to-giac(thẻ) | giữ |
| 532 | `to-giac-truoc-hh` | Ngươi tố giác ngươi trước Hoàng hậu | ev-vu-oan | **MỚI** — Phi tần quỳ trình bằng chứng trước Hoàng hậu ngồi trên ghế phượng |
| 533 | `to-giac-truoc-ht` | Ngươi tố giác ngươi trước Hoàng thượng · Tố lên Hoàng thượng | ev-vu-oan, act-cat-hai-nguoi | **MỚI** — Phi tần quỳ dâng phong thư bằng chứng lên Hoàng thượng trong điện |
| 534 | `to-giac-truoc` | Ngươi tố giác ngươi trước ngươi | ev-vu-oan | **MỚI** — Phi tần quỳ trình bằng chứng trước Thái hậu |
| 535 | `to-giac-khong-thanh` | Ngươi tố X nhưng không đủ chứng, bị chê nhiều chuyện · Ngươi tố giác X không thành; chứng cứ bị hủy · Ngươi tố giác ngươi không thành; chứng cứ bị hủy · Ngươi tố ngươi nhưng không đủ chứng, bị chê nhiều chuyện · (+4) | ev-vu-oan, act-cat-hai-nguoi | **MỚI** — Hoàng hậu gạt bằng chứng sang bên, người tố quỳ cúi đầu |
| 536 | `to-toi-that` | Ngươi tố X tội X · Ngươi tố ngươi tội X · Tố tội thật · X tố X tội X · (+1) | ev-hinh-phat, act-cat-hai-nguoi | **MỚI** — Phi tần trình sổ chứng cứ trước Hoàng hậu, kẻ có tội quỳ |
| 537 | `boc-tu-tinh` | Bóc chuyện tư tình | act-to-giac, act-to-giac(thẻ) | **MỚI** — Phi tần giơ chiếc khăn tay thêu của nam nhân trước Hoàng thượng |
| 538 | `to-loi-voi-chu` | Ngươi tố X lười nhác; X phạt hắn · Tố lỗi với chủ | act-to-giac, act-to-giac(thẻ) | **MỚI** — Cung nữ bẩm chủ, chỉ về một cung nữ đang ngủ gật |
| 539 | `to-khong-tin` | Ngươi tố X nhưng X không tin, còn trách ngươi gây chuyện | act-cat-hai-nguoi | **MỚI** — Chủ nhân lắc đầu trách cung nữ tố cáo |
| 540 | `ke-toi` | Kể tội X · Kể tội một phi tần | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Phi tần kể tội một người với Thái hậu, Thái hậu nghe nghiêm |
| 541 | `xin-hh-giang` | Xin Hoàng hậu giáng | ev-hinh-phat, act-cat-trung-phat(thẻ) | **MỚI** — Phi tần dâng tấu trước Hoàng hậu, xin giáng một người |
| 542 | `hh-nghe-giang` | Hoàng hậu nghe lời X, tâu xin giáng X · Hoàng hậu nghe lời X, tâu xin giáng ngươi · Hoàng hậu nghe lời ngươi, tâu xin giáng X · Hoàng hậu nghe lời ngươi, tâu xin giáng ngươi | ev-hinh-phat | **MỚI** — Hoàng hậu ra điện tâu Hoàng thượng, cầm tấu chương |
| 543 | `hh-gat-loi` | Hoàng hậu gạt lời X đi · Hoàng hậu gạt lời ngươi đi | act-cat-giao-thiep | **MỚI** — Hoàng hậu phẩy tay, người tâu cúi đầu lui |
| 544 | `hh-bac-chung-cu` | Hoàng hậu bác chứng cứ Hoàng hậu X trình về Hoàng hậu X · Hoàng hậu bác chứng cứ Hoàng hậu X trình về X · Hoàng hậu bác chứng cứ Hoàng hậu X trình về ngươi · Hoàng hậu bác chứng cứ ngươi trình về Hoàng hậu X · (+8) | ev-tai-mat | **MỚI** — Bằng chứng bị đặt trả lại khay, người trình cúi lui |
| 545 | `trinh-chung-cu-hh` | Trình Hoàng hậu | ev-tai-mat, act-cat-giao-thiep(thẻ) | **MỚI** — Phi tần dâng hộp chứng cứ lên Hoàng hậu |
| 546 | `trinh-chung-cu-th` | Trình Thái hậu · X trình chứng cứ lên Thái hậu | ev-tai-mat, act-cat-giao-thiep(thẻ) | **MỚI** — Phi tần dâng hộp chứng cứ lên Thái hậu |
| 547 | `trinh-len-ht` | Chứng cứ trình lên · Trình lên Hoàng thượng · Tự trình lên Hoàng thượng | ev-tai-mat | **MỚI** — Phi tần quỳ dâng phong thư lên Hoàng thượng |
| 548 | `uy-hiep-doi-bac` | Uy hiếp hắn · Uy hiếp đòi bạc | ev-hoi-lo, act-cat-buon-ban(thẻ) | **MỚI** — Phi tần giơ lá thư bằng chứng, người kia đưa túi bạc |
| 549 | `ban-chung-cu` | Bán cho phe khác · X bán N chứng cứ về Hoàng hậu X cho Hoàng hậu X lấy N lượng bạc · X bán N chứng cứ về Hoàng hậu X cho X lấy N lượng bạc · X bán N chứng cứ về Hoàng hậu X cho ngươi lấy N lượng bạc · (+3) | act-cat-buon-ban, act-cat-trieu-chinh | **MỚI** — Phong thư bằng chứng đổi lấy túi bạc trong góc tối |
| 550 | `so-lo-chuoc-chung-cu` | X sợ chuyện lộ, đưa Hoàng hậu X N lượng bạc để chuộc lại một chứng cứ · X sợ chuyện lộ, đưa X N lượng bạc để chuộc lại một chứng cứ · X sợ chuyện lộ, đưa ngươi N lượng bạc để chuộc lại một chứng cứ | act-cat-buon-ban | **MỚI** — Người sợ lộ chuyện dúi bạc chuộc lại phong thư |
| 551 | `khong-chiu-dua-bac` | X không chịu đưa bạc cho Hoàng hậu X, còn rêu rao bị uy hiếp · X không chịu đưa bạc cho X, còn rêu rao bị uy hiếp · X không chịu đưa bạc cho ngươi, còn rêu rao bị uy hiếp | ev-hoi-lo | **MỚI** — Người bị uy hiếp xé lá thư đe dọa, quay đi kể |
| 552 | `giu-chung-cu` | Ngươi giữ tập chứng cứ về X · X giữ tập chứng cứ về X | act-cat-giao-thiep | **MỚI** — Tập thư buộc dây cất vào hộp bí mật dưới ván sàn |
| 553 | `ghi-nho-chung-cu` | Ghi nhớ làm chứng cứ | act-cat-giao-thiep | **MỚI** — Phi tần ghi vào cuốn sổ nhỏ dưới đèn |
| 554 | `cat-giu-con-tin` | Cất giữ làm con tin | ev-con-tre-2 | **MỚI** — Lá thư tình cất vào hộp khóa |
| 555 | `chung-cu-bi-huy` | Chứng cứ bị thu hủy | act-cat-giao-thiep | **MỚI** — Tập hồ sơ cháy trong lò, thái giám đứng nhìn |
| 556 | `hop-muu` | X hợp mưu hạ X · X hợp mưu hạ ngươi | act-cat-muu-ke | **MỚI** — Ba phi tần chụm đầu bàn mưu trong phòng tối |
| 557 | `hop-muu-lo` | X hợp mưu hạ X bị lộ, cả phe bị phạt · X hợp mưu hạ ngươi bị lộ, cả phe bị phạt | ev-hinh-phat | **MỚI** — Ba phi tần quỳ trước Hoàng hậu, bằng chứng trên khay |
| 558 | `bi-phat-giac-dinh` | Ngươi chặn kịp và nắm N chứng cứ · Ngươi chặn kịp và nắm N chứng cứ với N · Người của X phát giác X định X; X nắm N chứng cứ của X · Người của X phát giác X định X; X nắm N chứng cứ của ngươi · (+2) | act-cat-giao-thiep | **MỚI** — Cung nữ chặn tay người đang bỏ đồ vào chén, nắm lấy bằng chứng |
| 559 | `tu-thong-ban-chet` | Chuyện tư tình bại lộ · X tư thông bị phát giác, bị ban chết | act-cat-giao-thiep | **MỚI** — Dải lụa trắng trên khay sơn mài, cửa điện tối (không người) |
| 560 | `dut-bac-bit-mieng` | Bịt miệng thầy tướng · Đút bạc bịt miệng | act-cat-buon-ban, act-cat-giao-thiep | **MỚI** — Phi tần dúi bạc cho người đàn ông, đặt ngón tay lên môi ra hiệu im lặng |
| 561 | `diet-khau` | Diệt khẩu hỏng, lời đồn đã lan · Diệt khẩu tên thái giám | ev-tin-don, ev-cung-nhan | **MỚI** — Giếng đá sau cung đêm, chiếc mũ thái giám trôi trên mặt nước (không xác) |
| 562 | `thai-giam-chet-duoi` | Tên thái giám chết đuối ở giếng sau | ev-cung-nhan | **MỚI** — Thị vệ cầm đèn đứng quanh miệng giếng đêm |
| 563 | `xac-lao-vuong` | Xác lão Vương nổi trên sông Kim Thủy | act-cat-giao-thiep | **MỚI** — Bờ sông Kim Thủy sương sớm, thị vệ đứng nhìn xuống nước, đèn lồng |
| 564 | `dut-bac-dap-don` | Đút bạc dập lời đồn | ev-tin-don | **MỚI** — Phi tần trao bạc cho thái giám đầu bếp để dập lời đồn |
| 565 | `tim-ke-tung-tin` | Kẻ tung tin là người của X · Tìm kẻ tung tin | act-cat-muu-ke | **MỚI** — Phi tần cầm đèn hỏi từng cung nữ đứng hàng |
| 566 | `de-loi-don-lan` | Để lời đồn lan xa | ev-tin-don | **MỚI** — Thầy tướng số nói lớn giữa sân, cung nữ vây nghe, phi tần mỉm cười đứng xa |
| 567 | `khiem-nhuong-choi-tu` | Khiêm nhường chối từ | act-cat-giao-thiep | **MỚI** — Phi tần lắc đầu khiêm nhường trước thầy tướng số |
| 568 | `bay-ke-phan-gian` | Bày kế phản gián | act-cat-muu-ke | **MỚI** — Phi tần trao lá thư giả cho cung nữ đã bị mua, dặn dò |
| 569 | `bo-bac-chuoc` | Bỏ bạc chuộc người | act-cat-buon-ban | **MỚI** — Phi tần đưa bạc chuộc cung nữ bị giam ra khỏi Thận Hình ti |
| 570 | `bo-mac` | Bỏ mặc | act-cat-giao-thiep | **MỚI** — Phi tần đóng cửa sổ, quay lưng |
| 571 | `tra-bac-thay` | Trả bạc thay ông | act-cat-buon-ban | **MỚI** — Phi tần đặt túi bạc lên bàn cho thái y già cúi tạ |
| 572 | `diet-ke-tong-tien` | Diệt kẻ tống tiền | ev-hoi-lo | **MỚI** — Bóng người áo choàng chờ trong ngõ tối, đèn tắt |
| 573 | `de-ong-tu-lo` | Để ông tự lo | act-cat-giao-thiep | **MỚI** — Thái y già bước đi một mình qua sân vắng |
| 574 | `mua-chuoc-khtg` | Mua chuộc Khâm Thiên giám | act-cai-tai-mat | **MỚI** — Phi tần gửi bạc cho quan Khâm Thiên giám đứng cạnh thiên cầu |
| 575 | `mua-chuoc-ccti` | Mua chuộc Cung Chính ti | act-cai-tai-mat | **MỚI** — Phi tần đưa bạc cho quan Cung Chính ti cầm sổ |
| 576 | `can-rang-chiu` | Cắn răng chịu tiếng | act-cat-giao-thiep | **MỚI** — Phi tần đứng một mình dưới mưa ở sân, tay nắm quạt |
| 577 | `dung-ra-noi-do` | Đứng ra nói đỡ | act-cat-giao-thiep | **MỚI** — Phi tần bước lên nói đỡ cho người bị trách |
| 578 | `do-them-dau` | Đổ thêm dầu vào lửa | act-cat-di-lai | **MỚI** — Phi tần phe phẩy quạt nói thêm, Hoàng hậu giận nhìn người bị trách |
| 579 | `im-lang` | Im lặng | act-cat-giao-thiep | **MỚI** — Phi tần đứng lặng cúi mắt, quạt khép trong tay |
| 580 | `quy-xin-tha-cho-nang` | Quỳ xin tha cho nàng | act-thu-toi | **MỚI** — Phi tần quỳ xin cho phi tần đang bị phạt trước Hoàng hậu |
| 581 | `dung-xem` | Đứng xem, mặt không đổi sắc | act-cat-buon-ban | **MỚI** — Phi tần đứng xem người bị phạt quỳ, mặt bình thản |
| 582 | `them-loi-buoc-toi` | Thêm một lời buộc tội | act-cat-giao-thiep | **MỚI** — Phi tần chỉ tay nói thêm trước Hoàng hậu, người bị tội quỳ |
| 583 | `len-gui-bac-nha` | Lén gửi bạc cho nhà nàng | act-cat-buon-ban | **MỚI** — Cung nữ mang túi bạc lẻn ra cổng Thần Vũ |
| 584 | `khong-can-du` | Không can dự · Không dính vào · Đứng ngoài, giữ mình | act-cat-giao-thiep | **MỚI** — Phi tần khép cửa cung, ngồi uống trà một mình |
| 585 | `quay-lung-bo-di` | Quay lưng bỏ đi | act-cat-giao-thiep | **MỚI** — Phi tần quay lưng rời cổng lãnh cung |
| 586 | `truy-ngu-thien` | Truy đến cùng Ngự thiện phòng · Đầu bếp khai ra người của X | act-cat-di-lai | **MỚI** — Bếp Ngự thiện phòng, đầu bếp quỳ khai, nồi niêu |
| 587 | `doi-nguoi-nau` | Đổi người nấu, giấu chuyện | act-chon-nguoi | **MỚI** — Đầu bếp mới cúi chào trong bếp, đầu bếp cũ đi ra |
| 588 | `khoc-ke-ht` | Khóc kể với Hoàng thượng | act-cat-giao-thiep | **MỚI** — Phi tần tựa vào Hoàng thượng kể lể (mặt nghiêng che khăn, không nước mắt) |
| 589 | `dot-ngay-lan-dau` | Dấu giày dưới gốc quế dẫn về cung X · Đốt ngay, lần dấu kẻ chôn | act-cat-giao-thiep | **MỚI** — Dấu giày trên đất dưới gốc quế, đèn soi |
| 590 | `keu-oan` | Kêu oan, xin tra người đưa quà · Tra ra tiểu thái giám đưa quà đã bị mua chuộc; ngươi được minh oan | ev-cung-nhan, ev-khach-den-2 | **MỚI** — Phi tần quỳ kêu oan trước điện, thái giám đưa quà bị dẫn đến |
| 591 | `nho-th-dung-ra` | Nhờ Thái hậu đứng ra | act-cat-giao-thiep | **MỚI** — Thái hậu đặt tay lên vai phi tần, che chở trước Hoàng hậu |
| 592 | `day-toi-cung-nu` | Đẩy tội cho cung nữ | ev-cung-nhan | **MỚI** — Phi tần chỉ về cung nữ, thái giám kéo cung nữ đi |
| 593 | `xin-ht-tra-xet` | Xin Hoàng thượng tra xét | act-cat-di-lai | **MỚI** — Phi tần quỳ xin Hoàng thượng tra xét, thị vệ đứng hai bên |
| 594 | `thu-long` | Thử lòng hắn trước | act-cat-giao-thiep | **MỚI** — Phi tần đặt chén trà có chút bạc dưới đáy, quan sát thái giám |
| 595 | `mat-tau` | Mật tâu Hoàng thượng | act-cat-giao-thiep | **MỚI** — Phi tần quỳ thì thầm mật tâu bên long ỷ, đêm |
| 596 | `theo-cha-muu` | Theo cha mưu đại sự | act-cat-muu-ke | **MỚI** — Phi tần đọc mật thư của cha bên ngọn nến rồi đốt |
| 597 | `cam-quan-vay-cung` | Cấm quân vây cung | act-cat-giao-thiep | **MỚI** — Cấm quân giáp sắt cầm đèn bao vây cổng cung đêm |
| 598 | `hh-bi-phe` | Hoàng hậu X bị phế · Ngôi trung cung bỏ trống | act-cat-giao-thiep | **MỚI** — Phượng quan đặt trên khay lụa, cửa Càn Ninh cung khép |
| 599 | `vien-co-thoai-thac` | Thoái thác · Viện cớ thoái thác | act-cat-giao-thiep | **MỚI** — Phi tần cúi người viện cớ, giơ tay ra hiệu khó |
| 600 | `bo-bac-lo-lot` | Bỏ bạc lo lót triều thần | act-cat-trieu-chinh | **MỚI** — Rương bạc gửi ra phủ quan ngoài cung, thái giám khiêng |
| 601 | `vang-menh` | Vâng mệnh · Vâng mệnh cô tổ | act-cat-giao-thiep | **MỚI** — Phi tần cúi đầu vâng mệnh trước Thái hậu |
| 602 | `trung-co-quoc` | Trung với cố quốc | act-cat-giao-thiep | **MỚI** — Công chúa Nam Chiếu đứng bên cửa sổ nhìn về phương nam, cầm ngọc bội quê |
| 603 | `mat-thu` | Gửi mật thư về Nam Chiếu | act-mat-thu | giữ |
| 604 | `phong-tuc` | Giảng giải phong tục Nam Chiếu | act-phong-tuc | giữ |
| 605 | `giau-ong` | Giấu ông ở Tân Giả Khố | act-cat-muu-ke | **MỚI** — Ông lão nhân chứng ngồi khuất sau chồng chậu ở Tân Giả khố, cung nữ đưa cơm |
| 606 | `tim-chung-cu-cha` | Tìm chứng cứ cha trung thành | act-luc-ruong | **MỚI** — Phi tần lục hồ sơ cũ trong kho sách, tìm thư của cha |
| 607 | `dieu-tra-an-cu` | Điều tra án cũ | act-luc-ruong | **MỚI** — Phi tần đọc hồ sơ án cũ trên án thư, đèn khuya |
| 608 | `tim-chung-cu-minh-oan` | Tìm chứng cứ minh oan | act-luc-ruong | **MỚI** — Phế phi trong lãnh cung lục rương tìm thư tay |
| 609 | `luc-ruong` | Lục rương tìm chứng cứ | act-luc-ruong, act-luc-ruong(thẻ) | giữ |
| 610 | `hoi-chuyen-cu` | Hỏi chuyện cũ | act-luc-ruong | **MỚI** — Phi tần ngồi hỏi chuyện cũ với ma ma già bên lò sưởi |
| 611 | `dang-so` | Dâng sớ lật án | act-dang-so | giữ |
| 612 | `dang-thu-ht` | Dâng thư lên Hoàng thượng | act-dang-so | **MỚI** — Phi tần trao lá thư kêu oan cho thái giám đem vào ngự thư phòng |
| 613 | `nho-dua-thu-keu-oan` | Nhờ X đưa thư kêu oan | act-dang-so | **MỚI** — Phế phi đưa lá thư qua khe cổng lãnh cung cho cung nữ |
| 614 | `bi-bat-mang-thu-lanh-cung` | X bị bắt vì mang thư lãnh cung, bị xử trảm | ev-lanh-cung-3 | **MỚI** — Thị vệ giật lá thư từ tay cung nữ ở cổng lãnh cung |
| 615 | `an-cu-duoc-lat` | Cả nhà ngươi được rửa oan, truy phong · Án cũ được lật | act-cat-giao-thiep | **MỚI** — Thánh chỉ vàng tuyên đọc trước bàn thờ gia tộc, hương khói |
| 616 | `lat-an-tien-de` | Hoàng thượng nổi giận vì ngươi lật án của tiên đế | act-cat-giao-thiep | **MỚI** — Hoàng thượng đứng giận dữ, tấu chương rơi xuống sàn |
| 617 | `xu-tram` | Cha ngươi bị xử trảm, ngươi bị giáng xuống X · N bị xử trảm · X bị xử trảm | act-cat-giao-thiep, ev-hinh-phat | **MỚI** — Pháp trường xa ngoài thành dưới trời xám, cờ đen, đám đông (không máu, không chém) |
| 618 | `dang-bac` | Dâng bạc vào quốc khố | act-dang-bac | giữ |
| 619 | `phong-tuoc` | Xin phong tước cho cha | act-phong-tuoc | giữ |
| 620 | `tau-xin-nguoi-cua-cha` | Tâu xin cho người của cha | act-phong-tuoc | **MỚI** — Phi tần trình tờ tiến cử lên Hoàng thượng, nhắc tên một quan |
| 621 | `buon-ban-len` | Buôn bán lén trong cung | act-buon-ban-len, act-buon-ban-len(thẻ) | giữ |
| 622 | `bi-bat-buon-lau` | Bị bắt buôn lậu lần thứ hai · Cả cung khinh rẻ ngươi | act-cat-buon-ban, act-cat-giao-thiep | **MỚI** — Thị vệ giữ bó lụa buôn lậu ở cổng, cung nữ cúi đầu |
| 623 | `ban-len` | Bán lén | act-cat-buon-ban, act-cat-buon-ban(thẻ) | **MỚI** — Cung nữ chuyển món trang sức qua khe cổng cho người buôn |
| 624 | `cam-co` | Cầm cố | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Món trang sức đặt trên quầy hiệu cầm đồ, người chủ hiệu cân bạc |
| 625 | `chuoc-lai` | Chuộc lại | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Phi tần nhận lại hộp trang sức ở hiệu cầm đồ, trả bạc |
| 626 | `ban` | Bán · Bán X · Bán X ×N · Ngươi bán X · (+1) | act-cat-buon-ban, act-cat-buon-ban(thẻ) | **MỚI** — Cung nữ bưng món đồ ra quầy Nội vụ phủ bán, thái giám cân bạc |
| 627 | `mua-hang` | Mua · Mua X · Mua X ×N · Mua thuốc bổ | act-mua-hang, act-mua-hang(thẻ) | giữ |
| 628 | `may-ao` | May áo · Ngươi may áo mới bằng X · X may áo mới bằng X | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Thợ may đo áo cho phi tần, súc gấm trải trên bàn |
| 629 | `tam-doc` | Tẩm | act-cat-giao-thiep, act-cat-giao-thiep(thẻ) | **MỚI** — Bàn tay tẩm thứ nước lạ vào cây trâm trên khay trong đêm |
| 630 | `nghiem-doc` | Nghiệm độc · Thái y xét X · Đem đến Thái y viện xét nghiệm | ev-benh-tat, act-cat-giao-thiep | **MỚI** — Thái y soi món đồ dưới đèn, kim bạc và chén nước |
| 631 | `thai-y-phat-hien` | Thái y phát hiện X · Thái y phát hiện X của X · Thái y phát hiện X; dấu vết dẫn về X | ev-benh-tat | **MỚI** — Thái y giơ món đồ có độc, trâm bạc đen, chỉ ra dấu vết |
| 632 | `thai-y-khong-thay-la` | Thái y không thấy gì lạ ở X | ev-benh-tat | **MỚI** — Thái y lắc đầu trả lại món đồ trong hộp |
| 633 | `kiem-tra-ruong` | Kiểm tra rương đồ, tìm thấy | act-cat-di-lai | **MỚI** — Cung nữ lấy ra món lạ từ đáy rương áo, chủ nhìn |
| 634 | `kiem-tra-ruong-sach` | Kiểm tra rương đồ | act-cat-di-lai | **MỚI** — Cung nữ mở rương áo xếp gọn, không có gì lạ |
| 635 | `tich-thu-co-co` | Hoàng hậu sai người tịch thu N của ngươi, trách ngươi xa xỉ · Tịch thu trang sức (có cớ) | ev-khach-den-2, act-cat-trung-phat(thẻ) | **MỚI** — Thái giám của Hoàng hậu thu hộp trang sức, phi tần đứng nhìn |
| 636 | `tich-thu-vo-co` | Hoàng hậu tịch thu N của X · Ngươi tịch thu N của X · Tịch thu vô cớ | ev-khach-den-2, act-cat-trung-phat(thẻ) | **MỚI** — Thái giám giằng hộp trang sức từ tay cung nữ |
| 637 | `hh-ban-cho` | Hoàng hậu ban cho ngươi X · Thái hậu ban X cho X | act-cat-ban-thuong, act-cat-giao-thiep | **MỚI** — Hoàng hậu trao hộp quà cho phi tần đang cúi nhận |
| 638 | `duoc-ban` | X được Hoàng thượng ban X · X được Hoàng thượng ban X, ban hiệu X · Được ban X · Được ban X, ban hiệu X | act-cat-giao-thiep | **MỚI** — Thái giám tuyên ban thưởng, khay gấm có ngọc bội, phi tần quỳ nhận |
| 639 | `an-thuong` | Ân thưởng · Ân thưởng X | ev-tranh-sung | **MỚI** — Hộp ngọc và lụa ban thưởng từ Hoàng thượng đặt trên án |
| 640 | `hh-thuong-hien-thuc` | Hoàng hậu X ban thưởng ngươi N bạc vì hiền thục | ev-dai-xa | **MỚI** — Hoàng hậu trao túi bạc cho phi tần đang vạn phúc |
| 641 | `tro-ve-lanh-cung-nuoi` | Dọn sang X · Ngươi dời khỏi X · Tâu xin, được dời sang X | act-cat-di-lai, act-cat-giao-thiep | **MỚI** — Cung nữ khiêng rương đồ qua cổng cung mới |
| 642 | `bi-giang` | Ngươi X, bị giáng xuống X · Ngươi bị giáng xuống Hoàng hậu vì X · Ngươi bị giáng xuống X vì X · X bị giáng xuống Hoàng hậu vì X · (+2) | ev-hinh-phat | **MỚI** — Thái giám tuyên chỉ giáng chức, phi tần tháo bớt trâm đặt lên khay |
| 643 | `bi-cam-tuc` | Ngươi bị cấm túc N tháng vì X · Ngươi bị cấm túc; Thái hậu -N, Hoàng hậu -N với ngươi · Ngươi bị cấm túc; Thái hậu -N, Hoàng hậu -N với nàng · X bị cấm túc N tháng vì X · (+2) | ev-hinh-phat | **MỚI** — Cổng cung đóng chặt, thị vệ đứng gác, bên trong phi tần ngồi một mình |
| 644 | `bi-ban-chet` | X bị ban chết | act-cat-giao-thiep | **MỚI** — Khay sơn mài với chén rượu và dải lụa trắng trong điện tối (không người) |
| 645 | `tha-toi-chet` | Lần sau sẽ không tha · Niệm tình mới vào cung, Hoàng thượng tha tội chết | ev-hinh-phat, act-cat-giao-thiep | **MỚI** — Hoàng thượng phẩy tay tha, người có tội dập đầu |
| 646 | `vao-lanh-cung` | Hoàng thượng nhân từ, đày vào lãnh cung · Ngươi bị đưa vào lãnh cung · X bị phế, đày vào lãnh cung · X, bị phế vào lãnh cung · (+1) | ev-lanh-cung-3 | **MỚI** — Cổng lãnh cung cũ kỹ mở ra, người áo trơn mang tay nải bước vào |
| 647 | `roi-lanh-cung` | Ngươi được rời lãnh cung, phục vị X · X được tha khỏi lãnh cung, phục vị X | ev-lanh-cung-3 | **MỚI** — Phi tần bước ra khỏi cổng lãnh cung, cung nữ đón với áo mới |
| 648 | `dem-dong-lanh-cung` | Đêm đông giá buốt, lãnh cung không than sưởi | ev-lanh-cung-3 | **MỚI** — Phế phi áo trơn ngồi co trong lãnh cung tuyết rơi, lò than nguội |
| 649 | `duoc-an-xa-ve-cung` | X được ân xá, về cung làm X | ev-dai-xa | **MỚI** — Thái giám tuyên chỉ ân xá trước cổng lãnh cung, người áo trơn quỳ nhận |
| 650 | `thai-hau-quo-trach` | X bị Thái hậu quở trách, mất sủng | ev-khach-den-2 | **MỚI** — Thái hậu nghiêm nghị quở trách, phi tần quỳ dưới |
| 651 | `vuong-gia-quo-trach` | X là vương gia, chỉ bị Hoàng thượng quở trách | ev-khach-den-2 | **MỚI** — Hoàng thượng quở trách một vương gia đang cúi đầu |
| 652 | `cach-chuc-bien-ai` | X bị cách chức, đày ra biên ải · Xin cho hắn ra biên ải | ev-bien-ai-2 | **MỚI** — Người đàn ông đội nón lên ngựa ra cửa ải xa |
| 653 | `thai-hau-bang-ha` | Hoàng hậu X băng hà vì bệnh · Thái hậu băng hà · Thái hậu băng hà vì bệnh | ev-quoc-tang | **MỚI** — Cung điện treo trắng, Hoàng thượng và phi tần áo tang quỳ (mặt cúi) |
| 654 | `nhan-sac-phai` | Năm mới, ngươi N tuổi; nhan sắc phai dần | act-cat-giao-thiep | **MỚI** — Phi tần trung niên vẫn đẹp soi gương, mùa xuân ngoài cửa |
| 655 | `gai-ngua-yen-tiec` | X gãi ngứa giữa yến tiệc, mất hết thể diện | ev-yen-tiec | **MỚI** — Phi tần đứng dậy rời yến, kéo tay áo che cổ tay, khách nhìn |
| 656 | `dich-dau-mua` | Dịch đậu mùa phát ở X · Dịch đậu mùa phát ở cung X | act-cat-giao-thiep | **MỚI** — Cổng cung treo vải vàng cách ly, thái y bịt khăn mang thuốc |
| 657 | `nhiem-benh` | Ngươi mắc X · X nhiễm bệnh | ev-benh-tat, act-cat-giao-thiep | **MỚI** — Phi tần nằm giường sốt, khăn trên trán, cung nữ quạt |
| 658 | `benh-chua-giam` | Bệnh chưa thuyên giảm · Thang thuốc của thái y làm bệnh nặng thêm | ev-benh-tat | **MỚI** — Thái y nhíu mày bắt mạch lần nữa, bát thuốc đầy |
| 659 | `tu-boc-thuoc` | Tự bốc thuốc | act-boc-thuoc | **MỚI** — Phi tần tự cân thuốc trên cân tiểu ly, tủ thuốc nhiều ngăn |
| 660 | `boc-thuoc` | Học hỏi y lý | act-boc-thuoc | giữ |
| 661 | `hau-benh-ca-thang` | Hầu bệnh cả tháng | ev-benh-tat | **MỚI** — Phi tần ngồi bên giường Thái hậu ốm, đút thuốc |
| 662 | `gui-le-van-an` | Gửi lễ vật vấn an | ev-thinh-an | **MỚI** — Cung nữ mang lễ vật đến cửa cung Thái hậu |
| 663 | `gui-bac-chua-benh` | Gửi N lượng chữa bệnh | ev-benh-tat | **MỚI** — Cung nữ gói bạc vào khăn gửi về nhà chữa bệnh cho mẹ |
| 664 | `xin-an-ve-tham` | Xin ân chuẩn về thăm | act-cat-giao-thiep | **MỚI** — Phi tần quỳ xin Hoàng hậu cho về thăm nhà |
| 665 | `viet-thu-hoi-han` | Viết thư hỏi han | act-cat-giao-thiep | **MỚI** — Phi tần viết thư nhà bên cửa sổ, bút lông |
| 666 | `bo-yen-thuc-ben-con` | Bỏ yến, thức trắng bên con | ev-yen-tiec | **MỚI** — Phi tần ngồi bên giường con ốm suốt đêm, ngọn nến cháy dở, áo yến vắt ghế |
| 667 | `moi-thai-y-du-yen` | Mời thái y, vẫn dự yến | ev-benh-tat | **MỚI** — Thái y bắt mạch đứa trẻ, mẹ áo yến đứng ở cửa sắp đi |
| 668 | `lao-vao-cuu` | Lao vào cứu người | act-cat-di-lai | **MỚI** — Phi tần dìu một cung nữ ra khỏi điện đang có khói lửa |
| 669 | `chi-huy-dap-lua` | Chỉ huy cung nhân dập lửa | ev-cung-nhan | **MỚI** — Phi tần đứng chỉ huy, cung nhân xách thùng nước dập lửa ở mái điện |
| 670 | `tra-ke-phong-hoa` | Dấu dầu hỏa dẫn về người của X · Ngầm tra kẻ phóng hỏa | act-cat-giao-thiep, act-cat-di-lai | **MỚI** — Thái giám soi đèn vào vết dầu đổ trên sàn gỗ cháy xém |
| 671 | `bao-cho` | Báo cho X | act-cat-giao-thiep | **MỚI** — Phi tần nói nhỏ với phi tần khác ở hành lang, chỉ về phía kia |
| 672 | `giup-mot-tay` | Giúp X một tay | act-cat-giao-thiep | **MỚI** — Phi tần đưa gói bột cho phi tần khác, che bằng tay áo |
| 673 | `dung-ra-can` | Đứng ra can ngăn | act-cat-di-lai | **MỚI** — Phi tần đứng giữa hai phi tần đang tranh cãi, giơ tay can |
| 674 | `dung-ve-phia` | Đứng về phía X | act-cat-giao-thiep | **MỚI** — Phi tần đứng cạnh một phi tần trong cuộc tranh chấp, nắm tay nàng |
| 675 | `mach-hh` | Mách Hoàng hậu | act-cat-giao-thiep | **MỚI** — Phi tần thì thầm với Hoàng hậu, chỉ về hai phi tần đang tranh cãi |
| 676 | `mach` | Mách X | act-cat-giao-thiep | **MỚI** — Phi tần nói nhỏ với phi tần khác về mưu của người thứ ba |
| 677 | `gop-bac-giau-the` | Góp bạc, giấu cả thẻ nàng | act-cat-muu-ke | **MỚI** — Hai phi tần cùng đặt bạc lên khay thẻ bài của thái giám Kính sự phòng |
| 678 | `tuyen-tu` | Sớ xin tuyển tú · Theo lời ngươi tâu, cung tuyển thêm tú nữ · Tuyển tú · Đợt tuyển tú mới | ev-tuyen-tu | **MỚI** — Hàng tú nữ áo hồng đứng trong sân điện, Thái hậu và Hoàng hậu ngồi chọn |
| 679 | `tau-tuyen-it` | Tâu nên tuyển ít | act-cat-giao-thiep | **MỚI** — Phi tần tâu Hoàng thượng, giơ một ngón tay ý ít người |
| 680 | `tau-tuyen-nhieu` | Tâu nên tuyển nhiều | act-cat-giao-thiep | **MỚI** — Phi tần cười tâu Hoàng thượng, chỉ tay về hàng tú nữ |
| 681 | `vao-cung-phong` | X vào cung, khóc suốt đêm sau buổi bái kiến · X vào cung, phong X · X vào cung, phong X, người nhà N · X vào cung, phong X; nàng mến ngươi | ev-thu-nha, act-cat-di-lai | **MỚI** — Tân nhân vạn phúc nhận phong trước Hoàng hậu, áo hồng mới |
| 682 | `dau-ba-quan` | X đứng đầu bá quan | act-cat-giao-thiep | **MỚI** — Đại thần áo đỏ đứng đầu hàng bá quan trong triều |
| 683 | `so-hac-can-chinh` | NNgự sử dâng sớ hặc X can dự chính sự · NNgự sử dâng sớ hặc ngươi can dự chính sự · Sớ hặc can chính | act-cat-trieu-chinh | **MỚI** — Ngự sử quỳ dâng sớ hặc trong triều, Hoàng thượng cầm tấu |
| 684 | `so-khen` | Sớ khen | act-cat-trieu-chinh | **MỚI** — Quan văn dâng sớ khen, Hoàng thượng mỉm cười đọc |
| 685 | `hen-gap` | Hẹn gặp riêng | act-hen-gap, act-hen-gap(thẻ) | giữ |
| 686 | `liec-mat` | Liếc mắt đưa tình | act-liec-mat | giữ |
| 687 | `trao-khan` | Trao khăn tay | act-trao-khan | giữ |
| 688 | `dut-tinh` | Cắt đứt | act-dut-tinh | giữ |
| 689 | `pha-thai` | Uống thuốc phá thai | act-pha-thai | giữ |
| 690 | `thu-toi` | Thú tội với Hoàng thượng | act-thu-toi | giữ |
| 691 | `quy-xin-tha` | Quỳ xin tha | act-thu-toi | **MỚI** — Người có tội quỳ dập đầu xin tha trước Hoàng thượng trong điện |
| 692 | `xuat-gia` | Xuất gia · Xuất gia, kết thúc kiếp này | act-xuat-gia | giữ |
| 693 | `xin-che-cho` | Xin Hoàng hậu che chở | act-xin-che-cho | giữ |
| 694 | `xin-th-do-loi` | Xin Thái hậu đỡ lời | act-xin-che-cho, act-xin-che-cho(thẻ) | **MỚI** — Phi tần quỳ bên chân Thái hậu, Thái hậu nắm tay nàng |
| 695 | `cau-xin` | Cầu xin | act-xin-che-cho | **MỚI** — Phế phi quỳ ở cổng lãnh cung chắp tay cầu xin thái giám truyền lời |
| 696 | `nho-nguoi-ben-ngoai` | Nhờ người bên ngoài | act-xin-che-cho | **MỚI** — Phế phi đưa trâm cuối cùng cho cung nữ qua khe cổng nhờ đưa tin ra ngoài |
| 697 | `nho-cau-xin` | Nhờ X cầu xin | act-xin-che-cho | **MỚI** — Phi tần đến lãnh cung thăm, phế phi nắm tay nhờ cầu xin |
| 698 | `nho-minh-oan` | Nhờ X minh oan | act-cat-giao-thiep | **MỚI** — Phi tần nhờ một quan Hàn lâm đọc lại bài thơ để minh oan |
| 699 | `gia-benh` | Giả bệnh | act-gia-benh | giữ |
| 700 | `dang-bac-n` | Dâng N lượng | act-cat-hau-ha | **MỚI** — Phi tần dâng hai nén bạc trên khay vào quỹ cứu tế |
| 701 | `cat-bong-de-dang` | Cắt bổng lộc cung nhân để dâng | ev-cung-nhan | **MỚI** — Ma ma cầm sổ bớt bạc trong túi lương của cung nhân |
| 702 | `tu-dung` | Ngươi dùng X | act-cat-giao-thiep | **MỚI** — Phi tần mở hộp thuốc bổ dùng một viên, cung nữ bưng nước |
| 703 | `tu-choi-ket-chi-em` | (chỉ gặp khi chơi) /^Khéo từ chối \(.*kết làm chị em/ |  | **MỚI** — Phi tần khẽ lắc đầu mỉm cười, khách cầm hộp quà đứng dậy cáo lui |
| 704 | `quy-xin-tha-cung-nu` | (chỉ gặp khi chơi) /^Quỳ xin tha \(Một cung nữ/ |  | **MỚI** — Phi tần quỳ trước Hoàng hậu xin tha cho một cung nữ cung khác đang bị thái giám giữ |
| 705 | `su-than-trieu-cong` | (chỉ gặp khi chơi) /^Sứ thần các nước vào triều cống/ |  | **MỚI** — Sứ thần các nước dâng lễ vật quý trước điện, Hoàng thượng ngồi long ỷ hài lòng |
| 706 | `mang-tin-ve` | (chỉ gặp khi chơi) /^Mang tin về/ |  | **MỚI** — Tiểu thái giám thân tín cúi người báo tin cho chủ bên hiên |
| 707 | `pho-tai-dem` | (chỉ gặp khi chơi) /^Phô tài(\./$/ \()/ |  | **MỚI** — Phi tần múa tay áo dài dưới đèn trước Hoàng thượng ngồi xem |
| 708 | `thay-mat-thai-hau` | (chỉ gặp khi chơi) /thấy mặt Thái hậu/trước mặt Thái hậu/ |  | **MỚI** — Thái hậu từ bảo tọa nhìn xuống mỉm cười, lần đầu nhận mặt phi tần mới đang vạn phúc |
| 709 | `nghe-lom-gia-son` | (chỉ gặp khi chơi) /^Núp sau hòn giả sơn/ |  | **MỚI** — Phi tần núp sau hòn giả sơn lắng nghe hai người nói chuyện bên kia |
| 710 | `lat-the` | (chỉ gặp khi chơi) /thẻ bài của .+ được lật/ |  | giữ |
| 711 | `chon-nguoi` | (chỉ gặp khi chơi) /^Chọn người/ |  | giữ |
| 712 | `hoi-phuong` | (chỉ gặp khi chơi) /^Hội Phượng/ |  | **MỚI** — Đài Hội Phượng cờ đỏ, phi tần cưỡi ngựa diễu |
| 713 | `huy-dung` | (chỉ gặp khi chơi) /^Hủy dung/ |  | giữ |

## Kiểm chéo bằng chơi thật
`dev/test/act-pics.js` 12 tuần (hạt 11, Fold 755x1000@2) → `meanings_runcheck.py`: 169 câu đầu dòng, **169 có luật nghĩa, 0 sót** (62 nghĩa xuất hiện).
Lượt này tìm thêm 4 nghĩa quét tĩnh không thấy (câu lựa chọn mang ngữ cảnh "(…)"): đã thêm luật; các dòng "(chỉ gặp khi chơi)" trong bảng là loại này.
Quét tĩnh còn 21 mẫu không khớp luật: đều là mẩu ghép rỗng (`X`, `N`, "Đến X" = tranh nơi đến, "Xin xăm"/"Gieo lại" = Sổ tuần bỏ qua).

## Đề xuất làm (sau khi duyệt)
- Vẽ **617 tranh mới** (đã có 4 mẫu: khen-mot-cau, xoa-vai, de-moc, biet-danh-tinh → còn 613), gpt-2-6, 3:4 1k, 40 tín dụng/lượt (simulate_cost: 40, chính xác).
  613 × 40 = **24 520**; dự phòng vẽ lại ~20% → **≈ 29 500 tín dụng** (tài khoản còn ~1,58 triệu). Thời gian: 8 lượt song song ~1 phút/lượt + tự soi từng tranh → vài giờ.
- j87: câu thứ hai trở đi của cùng một dòng nhật ký gộp vào dòng câu đầu (một dòng = một việc = một tranh); ACTS.json `log` = toàn bộ luật `meanings.py`
  (biên dịch một lần), `acts` = mọi tên thẻ việc → khóa của nghĩa đó; không còn rơi về act-cat-* / ev-* dùng chung.
- Kiểm: Playwright Tuần lục nhiều tuần ở 755x1000@2, 1000x755@2, 1180x820@2: 0 nghĩa dùng chung một tranh, 0 ảnh vỡ, 0 lỗi trang.
- Ảnh không vào git: điều phối chạy `python3 dev/site/cdn_sync.py img/act-<khóa>.webp … img/ACTS.json` (danh sách đầy đủ sẽ gửi khi vẽ xong).
