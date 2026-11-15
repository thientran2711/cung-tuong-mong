# Story deadlines · routes without silver · banners (owner 15/11 17:06Z) — audit

Script: `dev/review/story_audit.js` (reads ARC67 / GB67 / T72 / j4 PEND in the built page). Re-run after any story change.

## Rules now in the game (jstory.js)
- Label on every story dialog: `Chính tuyến · <quest of her origin> · Bước i/n` (j67), `… · Cơ duyên hiếm` (j97), `Phụ tuyến · <việc> · Lời nhờ (n bước)` (j72), old saves `Chính tuyến · <quest> · Bước n` (j4).
- Price by rank: chapter Bạc costs × BAL.cost67 = [0.6,0.7,0.8,0.9,1,1.1,1.25,1.4,1.5] (rank 0 Đáp ứng … 8), rounded to 5.
- Deadline by severity when she cannot pay now: khẩn BAL.dl67Khan = 4 buổi · vừa dl67Vua = 9 buổi (3 ngày) · lớn dl67Lon = 21 buổi (7 ngày). Option "<việc>: nhận lời, lo liệu trong N"; countdown chip in the top-bar state row + Mệnh truyện tab; tap = the same choice again (pay, or another route, or "Để sau"). Fails only when the deadline passes (resolves as giving up, Danh −2).
- Every chapter beat with a Bạc option also offers a route without silver (hand-written in ALT67, else "Nhờ người quen lo liệu, không dùng bạc": Sức −6, odds of the silver route −15 + Tai mắt + Lòng cung nữ).

## Summary
- Chính tuyến beats: 365; with a Bạc option: 179; of those with a route without silver BEFORE (a non-give-up option without Bạc): 146; AFTER (native or added): 179.
- Severity of the 179 silver beats: khẩn 4 · vừa 139 · lớn 34.
- Phụ tuyến (j72) quests with a Bạc step: 34 (they already have a deadline in tuần, fail only when it passes, countdown in the Việc nhờ tab). Steps with a Bạc cost and a free branch: 34.
- Old story (j4, saves before chapters) beats with Bạc: 2 (td1 lão Vương got a route without silver + rank price).
- Chapter beats WITHOUT their own banner picture (fall back to the arc cover or a room picture): 305 of 365 (list at the end, for act-pics2).

## Chính tuyến beats with a Bạc option

| arc | beat | silver option (base) | route without silver: before | added | severity → deadline |
|---|---|---|---|---|---|
| Quân cờ trong tay cha (tt_co) | s2 Cha cài người vào cung ngươi | Nhận, rồi mua chuộc nàng (-40) | Nhận, để cha yên tâm; Gửi trả về phủ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Quân cờ trong tay cha (tt_co) | c2 Hoàng hậu hặc phủ Tể tướng | Bỏ bạc lo lót (-60) | Tự đến xin Hoàng hậu nương tay | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Quân cờ trong tay cha (tt_co) | t1 Cha tính đường lui | Tự đứng vững, không cần cha (-30) | Viết thư nhắc cha công lao của ngươi; Để mặc | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Quân cờ trong tay cha (tt_co) | x1 Ván cờ lớn của cha | Từ chối, cắt đứt dây cờ (-40) | Đặt điều kiện: cha theo ngươi, không phải ngươi theo cha; Khuyên Hoàng thượng như lời cha | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Phủ Tể tướng mắc oan (tt_oan) | s1 Tin dữ từ triều | Lặng lẽ cho người dò sổ sách (-40) | Quỳ xin Hoàng thượng minh xét; Giữ khoảng cách với phủ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng mắc oan (tt_oan) | s2 Thư cầu cứu của mẹ | Gửi bạc cho mẹ lo liệu (-50) | Đến gặp thẳng Liễu Lan Chi; Đốt thư, tránh liên lụy | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng mắc oan (tt_oan) | c1 Một thư lại muốn làm chứng | Cho bạc, giữ hắn làm chứng (-60) | Ép hắn viết lời khai ngay; Không tin hắn | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng mắc oan (tt_oan) | c2 Nét chữ trong sổ | Nhờ Hàn lâm viện giám định (-40) | Tự đối chiếu nét chữ; Giữ bản chép, chờ thời | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng mắc oan (tt_oan) | x1 Ngày tra án | Theo lời dàn xếp, xin Hoàng thượng khoan hồng (-40) | Dâng chứng cứ trước triều; Xin cho cha cáo lão về quê | — |  →  |
| Phủ Tể tướng chia đôi (tt_tranh) | s1 Huynh trưởng gặp riêng {v} | Lặng lẽ kết thân với {v} (-40) | Viết thư hỏi thẳng huynh trưởng; Báo cho cha | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng chia đôi (tt_tranh) | s2 Gia yến chia phe | Gửi lễ cho cha trước (-30); Gửi hai phần lễ ngang nhau (-50); Gửi lễ cho huynh trưởng (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng chia đôi (tt_tranh) | c1 Huynh trưởng đòi chia gia sản | Khuyên cha chia cho êm (-20) | Khuyên cha giữ chặt | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng chia đôi (tt_tranh) | c2 Con của {v} được đem ra làm cớ | Đề nghị phủ khen cả con ngươi (-30) | Ngăn sớ ấy lại; Để sớ đi, đổi lấy ơn của Hạ Yên Nhiên | — |  →  |
| Phủ Tể tướng chia đôi (tt_tranh) | c3 Môn sinh của cha lung lay | Gửi quà giữ chân họ (-50) | Xin Hoàng thượng thăng cho một người; Mặc họ đi | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Phủ Tể tướng chia đôi (tt_tranh) | t1 Huynh trưởng sa cơ | Âm thầm trả nợ cho huynh (-60) | Để huynh chịu phạt | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Mật ước với Hoàng hậu (tt_mat) | s1 Hộp thư bị đánh tráo | Dò hỏi người đưa lễ (-30) | Đọc kỹ, chép lại; Gửi trả nguyên vẹn | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mật ước với Hoàng hậu (tt_mat) | s2 Hoàng hậu bỗng tốt với ngươi | Đáp lễ, tỏ ra thân thiết (-30) | Nhận lễ, lựa lời dò ý | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mật ước với Hoàng hậu (tt_mat) | c3 Phi tần khác ngửi thấy mùi | Kéo {v} làm đồng minh phòng khi trở mặt (-40) | Lấp liếm; Cảnh cáo một phi tần đừng xen vào | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Khói lửa Nhạn Môn (dtq_bien) | s1 Quân báo khẩn | Bán trang sức góp quân lương (-60) | Khuyên Hoàng thượng thúc Hộ bộ; Cầu an cho cha ở Phụng Tiên điện | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Khói lửa Nhạn Môn (dtq_bien) | s2 Thư riêng của cha | Tự may áo rét gửi ra (-50) | Trình thư lên Hoàng thượng; Giữ thư, chờ thời | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Khói lửa Nhạn Môn (dtq_bien) | c1 Binh bộ giữ lương | Tìm chứng cứ Binh bộ ăn bớt (-30); Nhờ Thái hậu nói giúp (-30) | Im lặng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Khói lửa Nhạn Môn (dtq_bien) | c2 Một phi tần nói cha ngươi giữ binh | Nhờ người dò nhà {v} vì sao nói vậy (-30) | Đáp: cha ta đổ máu cho xã tắc; Cười cho qua, ghi nhớ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Khói lửa Nhạn Môn (dtq_bien) | t1 Tin cha bị thương | Gửi Thái y giỏi nhất ra biên (-60) | Xin ngài cho cha giữ quân | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Bức thư mưu phản (dtq_vu) | s2 Kẻ mang thư bị bắt | Cho người giữ mạng hắn (-50) | Đến Hình bộ hỏi cung | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bức thư mưu phản (dtq_vu) | c1 Ấn tín bị làm giả | Tìm thợ khắc ấn (-40) | Xin Hoàng thượng so ấn | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bức thư mưu phản (dtq_vu) | c2 {v} nhanh nhảu | Để nàng chép, theo dõi bản chép (-20) | Xin chính ngươi chép thay; Không để ý | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Binh phù và long ngai (dtq_binh) | s2 Thư cha dặn | Dò xem ai khuyên ngài (-30) | Hồi thư khuyên cha tự lui; Hứa với cha sẽ giữ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Binh phù và long ngai (dtq_binh) | c1 Một tướng trẻ được trọng dụng | Kết giao với nhà tướng trẻ (-40) | Tìm lỗi của tướng trẻ; Chúc mừng tướng trẻ trước mặt vua | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Binh phù và long ngai (dtq_binh) | c2 Đại thần đòi thu binh | Nhờ Thái hậu nói đỡ (-30) | Đề nghị một lối giữa: chia quân | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người anh nơi đất giặc (dtq_huynh) | s1 Tin dữ ngoài ải | Tự gom bạc chuộc (-60) | Quỳ xin Hoàng thượng cứu huynh; Viết thư an ủi cha | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người anh nơi đất giặc (dtq_huynh) | s2 Sứ giặc vào kinh | Nhờ Lễ bộ dò ý sứ (-30) | Xin gặp riêng sứ giặc; Tránh mặt sứ giặc | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người anh nơi đất giặc (dtq_huynh) | c1 Triều đình bàn chuyện chuộc | Vận động phe chuộc (-40) | Xin một phi tần khuyên cha nàng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người anh nơi đất giặc (dtq_huynh) | c2 Kế đổi tù binh | Nhờ cha dâng kế (-20) | Dâng kế đổi tù binh | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người anh nơi đất giặc (dtq_huynh) | t1 Huynh trốn thoát? | Bỏ bạc mua đường cứu (-60) | Chờ triều đình | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Mua tước cho cha (muoi_tuoc) | s1 Cha gửi bạc vào cung | Dâng bạc vào quốc khố cứu tế (-80) | Giữ bạc, nuôi người trong cung; Viết thư khuyên cha chờ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mua tước cho cha (muoi_tuoc) | s2 Lời chê mùi muối | Tặng {v} hũ muối hoa thượng hạng (-20) | Lặng im; Đáp thẳng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mua tước cho cha (muoi_tuoc) | c1 Thái hậu sửa chùa | Xin nhà ngươi gánh hết (-100); Góp một phần (-40) | Không góp | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mua tước cho cha (muoi_tuoc) | c2 Quan Lễ bộ đòi lễ | Đưa bạc (-60) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mua tước cho cha (muoi_tuoc) | c3 Muối lậu của nhà khác | Đưa sổ sách sạch của nhà ra (-20) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mua tước cho cha (muoi_tuoc) | t1 Một tước hư hay một tước thật | Xin chờ tước thật (-30) | Nhận hư hàm, đỡ phiền | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Mua tước cho cha (muoi_tuoc) | x1 Thánh chỉ phong tước | Dâng thêm một vạn thạch thóc cứu đói (-120) | Xin Thái hậu nói giúp | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Thuyền muối đêm (muoi_lau) | s1 Thuyền bị bắt | Tin cha, gửi bạc lo kiện (-50); Dò xem cha có thật bị oan (-30) | Giữ khoảng cách | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thuyền muối đêm (muoi_lau) | s2 Hộ bộ nhắm vào nhà ngươi | Chủ động xin phạt nhà mình (-60) | Tâu xin minh xét | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thuyền muối đêm (muoi_lau) | c1 Quản sự gian | Giữ hắn làm chứng (-40) | Bắt hắn viết lời khai rồi thả | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thuyền muối đêm (muoi_lau) | c2 Thuyền muối thứ tư | Cho người kiểm khoang trước (-30) | Để quan khám | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thuyền muối đêm (muoi_lau) | x1 Xử án muối lậu | Nộp phạt thay cha, xin tha (-100) | Đưa nhân chứng, vạch kẻ hãm hại | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Năm đói ở Giang Nam (muoi_doi) | s1 Thư cha về kho thóc | Khuyên cha mở kho bán giá cũ (-40) | Nhận bạc gấp đôi; Im lặng chờ xem | Nhờ người quen lo liệu, không dùng bạc | khẩn → 4 buổi |
| Năm đói ở Giang Nam (muoi_doi) | s2 Dân đói kéo về kinh | Lập lều cháo bằng bạc riêng (-60) | Khuyên Hoàng thượng giảm thuế Giang Nam; Đóng cửa cung, cầu kinh | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Năm đói ở Giang Nam (muoi_doi) | c1 Triều đình đòi trưng thu thóc | Tự nguyện dâng thóc (-80); Lo lót để gạch tên (-50) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Năm đói ở Giang Nam (muoi_doi) | c2 Đầu cơ của nhà khác | Bảo cha bán rẻ, kéo giá xuống (-50) | Tố với Hộ bộ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Năm đói ở Giang Nam (muoi_doi) | c3 Dịch bệnh sau đói | Gửi thuốc men ra lều (-50) | Tự ra lều phát thuốc | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Năm đói ở Giang Nam (muoi_doi) | x1 Hoàng thượng xét công tội | Dâng nốt kho thóc cuối (-100) | Tâu rõ những gì nhà đã làm; Lặng im, không kể công | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Món nợ trong cung (muoi_no) | s1 Sổ nợ của hiệu buôn | Xóa nợ, kết ơn (-40) | Nhắc khéo Lâm Linh Lung trả nợ; Giữ sổ, chưa nói | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Món nợ trong cung (muoi_no) | s2 {v} vay thêm | Cho vay, kèm điều kiện (-40); Cho vay không điều kiện (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Món nợ trong cung (muoi_no) | c3 {v} đề nghị trả nợ bằng tin | Nhận tin thay bạc (-20) | Không cần, cứ giữ nợ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Món nợ trong cung (muoi_no) | t1 Nợ đến hạn cuối | Cho thêm hạn (-20) | Đòi bằng được | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Món nợ trong cung (muoi_no) | x1 Món nợ ngã ngũ | Đốt sổ nợ trước mặt nàng (-60) | Dùng sổ nợ ép nàng theo ngươi; Trả sổ cho cha, rút tay | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Chủ cũ (cn_chu) | s2 Kẻ hầu cũ biết chuyện | Gửi bạc kết thân (-30); Xin nàng sang hầu ngươi (-40) | Không dính vào | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Chủ cũ (cn_chu) | t1 Ngươi sắp vượt {v} | Gửi lời làm hòa (-30) | Chuẩn bị đối phó | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Mối tình thuở hầu trà (cn_tinh) | s1 Người cũ gác cửa | Xin Nội vụ phủ đổi hắn đi (-40) | Gặp hắn một lần, nói rõ; Lờ đi | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mối tình thuở hầu trà (cn_tinh) | s2 Bức thư cũ | Nhờ người hỏi lấy lại thư (-30) | Tin rằng hắn đã đốt | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mối tình thuở hầu trà (cn_tinh) | c1 Một thái giám đánh hơi | Đút bạc bịt miệng (-50); Cho {n1} xin ra biên ải (-20) | Tố hắn lười việc với Tổng quản | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mối tình thuở hầu trà (cn_tinh) | c2 {n1} gặp nạn | Âm thầm cứu hắn (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | khẩn → 4 buổi |
| Mối tình thuở hầu trà (cn_tinh) | t1 Thư cũ lộ ra | Tìm cách đánh tráo thư (-40) | Chuẩn bị lời giải thích | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Tri kỷ ở Tân Giả khố (cn_ban) | s1 Lời nhắn từ Tân Giả khố | Lén gửi thuốc và bạc (-30) | Đến Tân Giả khố gặp nàng; Đốt khăn | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Tri kỷ ở Tân Giả khố (cn_ban) | s2 Kẻ đã đày Tố Nga | Biếu chưởng sự để nàng được nhẹ việc (-40) | Tố chưởng sự với Tổng quản | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Tri kỷ ở Tân Giả khố (cn_ban) | c2 Tố Nga ốm nặng | Lén mời thái y (-40); Gửi bạc, phó mặc (-20) | Tự bốc thuốc gửi xuống | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Tri kỷ ở Tân Giả khố (cn_ban) | t1 Đưa Tố Nga ra khỏi Tân Giả khố | Xin Tố Nga về hầu (-40) | Chờ thời cơ khác | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Tri kỷ ở Tân Giả khố (cn_ban) | x1 Sự thật về cái giếng | Xin cho Tố Nga xuất cung về quê (-40) | Đưa Tố Nga ra làm chứng trước Thái hậu; Giữ bí mật, dùng Tố Nga làm tai mắt | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Thân thế thật (cn_than) | s1 Lời trăng trối | Lo hậu sự cho ma ma (-30) | Hỏi thêm chi tiết | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thân thế thật (cn_than) | s2 Miếng ngọc | Đem ngọc nhờ thợ cung xem (-20) | Cất kỹ, chưa cho ai biết | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thân thế thật (cn_than) | c1 Hồ sơ án cũ | Nhờ người chép hồ sơ (-40) | Xin Hoàng thượng cho xem | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thân thế thật (cn_than) | c2 Một người nhận là thân thích | Tiếp bà, cho bạc (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mật lệnh cố quốc (nc_gian) | s2 Người hầu cố quốc | Đổi nàng về phe mình (-40) | Xin Nội vụ phủ đổi nàng đi | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mật lệnh cố quốc (nc_gian) | c2 Cấm quân để ý | Biếu Tổng quản, hỏi kẻ nào mách (-50) | Ngừng gửi thư | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Sứ đoàn cố quốc (nc_su) | s2 Lễ vật bị đánh tráo | Âm thầm thay bằng ngọc của ngươi (-80) | Tra xem ai đánh tráo | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Sứ đoàn cố quốc (nc_su) | c2 Sứ đoàn gây gổ | Bồi thường riêng cho êm (-50) | Xin xử theo luật Đại Hy | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người ngoại tộc (nc_tuc) | s2 Món ăn quê nhà | Dâng một phần lên Thái hậu (-10) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người ngoại tộc (nc_tuc) | c2 Lễ hội té nước | Mời các phi tần cùng chơi (-30) | Lặng lẽ thắp hương một mình | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người ngoại tộc (nc_tuc) | x1 Đại thọ Thái hậu | Dâng lễ vật quý, đứng sau (-60) | Dâng điệu múa chim công cầu thọ; Dâng bộ kinh chép tay | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Ngai vàng cố quốc (nc_vuong) | s2 Hai phong thư | Đọc kỹ, dò xem ai được lòng dân (-30) | Trình cả hai thư lên Hoàng thượng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ngai vàng cố quốc (nc_vuong) | c2 Triều đình chia phe | Vận động Lễ bộ (-40); Vận động Binh bộ (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ngai vàng cố quốc (nc_vuong) | c3 Hoàng huynh gặp nguy | Gửi bạc riêng giúp huynh (-60) | Quỳ xin Hoàng thượng cứu | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Lật lại án cũ (td_an) | s1 Kho hồ sơ Hình bộ | Bỏ bạc nhờ ông chép lại (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Lật lại án cũ (td_an) | c1 Nhân chứng bị truy sát | Giấu ông ở Tân Giả khố (-40); Đưa ông ra khỏi kinh (-60) | — (only giving up) | Nhờ Lam Ngọc giấu ông trong kho củi sau cung; Xin Thái y viện nhận ông làm người sắc thuốc | khẩn → 4 buổi |
| Lật lại án cũ (td_an) | c2 Thư tay của {foed} | Mua chuộc gia nhân phủ hắn (-50); Nhờ người trong cung {foe} lục tìm (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Lật lại án cũ (td_an) | c3 Phải lên cao mới dâng được sớ | Lấy lòng Thái hậu (-40) | Dồn sức lấy lòng Hoàng thượng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Lật lại án cũ (td_an) | t1 {foed} ra tay trước | Cho người cứu hồ sơ (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Kẻ đứng sau màn (td_ke) | s1 Một chi tiết không khớp | Lần theo người giả ấn (-40) | Hỏi thẳng kẻ thù, xem nàng biết gì | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Kẻ đứng sau màn (td_ke) | s2 Người gửi tiền cho ngươi | Tìm lại người đưa bạc (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Kẻ đứng sau màn (td_ke) | c2 {n1} cảnh cáo | Tăng người canh cung (-40) | Trình hộp quà lên Thái hậu | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người em còn sống (td_song) | s1 Chiếc vòng bạc | Gửi bạc ra biên lo cho em (-50); Tra xem lái buôn là ai (-20) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người em còn sống (td_song) | c1 Em bị bắt lính đánh trận | Nhờ người xin cho em làm hỏa đầu quân (-50) | Tin vào số mệnh | Nhờ người quen lo liệu, không dùng bạc | khẩn → 4 buổi |
| Người em còn sống (td_song) | t1 Thân phận em bị tra | Cho em trốn đi xa (-60) | Chuẩn bị xin ân xá | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Người em còn sống (td_song) | x1 Số phận người em | Xin cho em vào chùa tu (-40) | Quỳ nhận em, xin ân xá vì công trận; Phủ nhận, để em tự lo | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Thù hay tha (td_tha) | c3 {foe} có thai | Gửi lễ mừng (-30) | Lạnh nhạt | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Quân cờ của cô tổ (ch_co) | s2 Cô tổ chọn người hầu cho ngươi | Lấy lòng ma ma, kéo về phe mình (-40) | Kính trọng ma ma | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thái hậu lâm bệnh (ch_benh) | s1 Đức Thọ cung đóng cửa | Tìm thái y giỏi bên ngoài (-60) | Xin vào hầu thuốc | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thái hậu lâm bệnh (ch_benh) | s2 Hoàng hậu nắm quyền | Nhịn (-30) | Xin Hoàng thượng phân xử | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thái hậu lâm bệnh (ch_benh) | c1 Thuốc của Thái y viện | Lén đổi thuốc, nhờ lương y xem (-30) | Tự tay sắc thuốc | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Hai người cháu (ch_ho) | s2 Nhà ngoại muốn chọn một người | Gửi lễ cho các trưởng bối (-60) | Đề nghị họ ủng hộ cả hai | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Hai người cháu (ch_ho) | c1 {v} gài bẫy | Dâng một món quà khác thật quý (-50) | Gặp Thái hậu giải thích | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bí mật năm xưa (ch_bi) | s2 Có người biết chuyện | Tìm gặp lão cung nữ (-30); Biếu Tổng quản để ông giữ kín (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bí mật năm xưa (ch_bi) | c3 Bản sao thư đến tay Hoàng hậu | Tìm cách lấy lại (-50) | Báo Thái hậu đề phòng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bí mật năm xưa (ch_bi) | t1 Sự thật năm xưa | Đưa lão cung nữ về bên mình (-30) | Chỉ giữ thư | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Danh hiệu Tài nữ (thd_tho) | s2 Luyện thơ | Mời thầy Hàn lâm dạy (-50) | Thức đêm luyện thơ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Danh hiệu Tài nữ (thd_tho) | c1 {v} tố ngươi đạo thơ | Nhờ {n1} minh oan (-30) | Ứng tác ngay một bài khác | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Danh hiệu Tài nữ (thd_tho) | c2 Đề thi bị lộ | Mua đề (-50) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Di cảo của cha (thd_sach) | c2 Lũ lụt ở Hoài Bắc | Góp bạc cứu lụt (-50) | Dâng chương sách về đê điều | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Di cảo của cha (thd_sach) | c3 Người lạ lục phòng | Để sách giả làm mồi (-20) | Giấu sách ở Phụng Tiên điện | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Học trò của cha (thd_tro) | s1 Lá thư của học trò | Gửi bạc giúp hắn ở lại kinh (-30); Dò xem lời hắn có thật (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Học trò của cha (thd_tro) | c1 Nhà quan mua đề | Giữ kín, gom chứng cứ (-30) | Đối chất với một phi tần | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Học trò của cha (thd_tro) | c2 Bài thi gốc | Mua chuộc người giữ kho (-50) | Nhờ học sĩ Hàn lâm | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Học trò của cha (thd_tro) | c3 {n1} bị dọa | Mời thầy thuốc, giấu hắn (-40) | Khuyên hắn về quê | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thầy giáo trong cung (thd_hoc) | t1 Một đứa trẻ bị ốm sau giờ học | Mời thái y chứng minh không phải do học (-30) | Nhận lỗi, xin chăm sóc | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Bí mật của chủ nhân (cnv_chu) | s2 Gói thuốc lạ | Lén lấy một ít đem hỏi (-5) | Để nguyên chỗ cũ | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bí mật của chủ nhân (cnv_chu) | x1 Số phận của bí mật | Xin chuyển sang hầu cung khác (-10) | Giữ trọn bí mật cho chủ; Trình lên Hoàng hậu | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Chị em đồng hương (cnv_ban) | s1 Xuân Đào bị bắt | Lặng lẽ dò xem ai lấy vòng (-5) | Đến xin cho nàng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Chị em đồng hương (cnv_ban) | c1 Xuân Đào ốm trong ngục | Lén mang thuốc (-5) | Không dám | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Chị em đồng hương (cnv_ban) | t1 Ngày xử | Tìm người làm chứng (-10) | Chuẩn bị lời bênh | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Ánh mắt nơi hành lang (cnv_mat) | c1 Ngài lại ghé | Pha trà ngài thích (-5) | Tránh mặt | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ánh mắt nơi hành lang (cnv_mat) | t1 Chủ ra tay | Nhờ người báo cho Hoàng thượng (-10) | Quỳ xin chủ tha | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Ma ma dạy việc (cnv_ma) | c1 Ma ma ốm | Gửi thuốc rồi về làm việc (-5) | Chăm bà | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ma ma dạy việc (cnv_ma) | c2 Đồng liêu ghen | Tự đi nhận lỗi để êm (-10) | Tìm người làm chứng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ma ma dạy việc (cnv_ma) | x1 Ngày khảo việc | Nhờ ma ma nâng đỡ (-10) | Làm hết sức, không cầu cạnh; Xin hoãn khảo | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Người thân thất lạc (s_than) | s1 Một tiểu thái giám tìm ngươi | Cho hắn bạc, hẹn gặp lại (-20) | Hỏi những chuyện chỉ người nhà biết | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người thân thất lạc (s_than) | s2 Ai đưa hắn vào cung | Đề phòng, theo dõi (-20) | Cho là trùng hợp | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người thân thất lạc (s_than) | c1 Hắn xin việc ở cung ngươi | Nhận (-20) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người thân thất lạc (s_than) | c3 Hắn gặp nạn | Đứng ra bảo lãnh (-30) | Để Tổng quản xử | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Người thân thất lạc (s_than) | x1 Ván cờ người thân | Chặn trước: xin Tổng quản đưa hắn đi xa (-40) | Để một phi tần tố bằng tin giả rồi lật lại; Nhận hắn công khai, xin Hoàng thượng thương | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Bức mật thư (s_thu) | s2 Ai đánh rơi thư | Theo dõi cung nữ ấy (-20) | Giả vờ không biết | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bức mật thư (s_thu) | c1 Đêm rằm sắp đến | Cho người canh thuốc của {v2} (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Bức mật thư (s_thu) | c3 Thư thứ hai | Đề phòng, đổi người hầu (-30) | Đưa cả hai thư cho Tổng quản | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Đêm cháy Tây cung (s_hoa) | s2 Bóng người trong lửa | Giấu nàng, hỏi kỹ (-20) | Đưa nàng lên Tổng quản | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Đêm cháy Tây cung (s_hoa) | c3 Tây cung xây lại | Góp bạc (-50) | Đề nghị dùng bạc của kẻ phóng hỏa | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Sứ thần phương Tây (s_su) | c3 Đồng hồ hỏng | Mời sứ thần sửa (-20) | Bảo đó là trời bảo ngài nghỉ ngơi | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Sứ thần phương Tây (s_su) | x1 Yến tiễn sứ | Đáp lễ bằng tơ lụa và thơ (-30) | Đáp lễ bằng vàng thật nhiều; Để Lễ bộ lo | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Mùa dịch đậu mùa (s_dich) | s1 Dịch vào cung | Đóng cửa cung mình, xông ngải (-30) | Đến Thái y viện xin giúp | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mùa dịch đậu mùa (s_dich) | c1 Hoàng tự lâm bệnh | Gửi thuốc và người chăm (-40) | Tránh xa | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mùa dịch đậu mùa (s_dich) | c2 Tin đồn ngươi mang bệnh | Mời Thái y khám công khai (-20) | Phản đòn | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Mùa dịch đậu mùa (s_dich) | t1 Dịch lên đỉnh | Góp bạc mua thuốc (-50) | Đứng ra điều phối | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Cám dỗ (s_tinh) | c3 Có kẻ biết | Đút bạc bịt miệng (-50) | Quát hắn, dọa tố | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Cám dỗ (s_tinh) | t1 {man} muốn đưa ngươi trốn | Xin hắn rời cung, để ngươi yên (-40) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Lão thái giám (s_thay) | s2 Ông muốn gì | Giúp (-20) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Lão thái giám (s_thay) | t1 Ông già yếu | Đến thăm, nhận sổ (-20); Gửi quà tiễn (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Kẻ thù hóa tri kỷ (s_ban) | c2 {v2} lại ra tay | Giúp {v} bắt kẻ gài (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Kẻ thù hóa tri kỷ (s_ban) | x1 Đối mặt {v2} | Một mình đề phòng (-30) | Cùng Trịnh Tuyết Dao lật ngược đòn; Phản Trịnh Tuyết Dao, bắt tay Lâm Linh Lung | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Gây dựng thế lực (st_the) | s1 Lời mời của {v} | Nhận lời kết nghĩa (-30) | Khéo giữ khoảng cách | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Gây dựng thế lực (st_the) | s2 Cài tai mắt | Chăm lo cho họ (-40) | Không cần | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Gây dựng thế lực (st_the) | c1 Một nhà quyền thần dò ý | Đáp lễ, hứa nâng đỡ người của họ (-40) | Giữ tay sạch, không dính triều chính | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Gây dựng thế lực (st_the) | c3 Ân thưởng chia đều | Chia cho kẻ hầu và đồng minh (-20) | Giữ lại | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Gây dựng thế lực (st_the) | x1 Ngày phe cánh lên tiếng | Huy động cả phe cánh (-40) | Chỉ nhờ người thân nhất; Không cần ai, tự lo | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Con đường của con (st_con) | s1 Chọn thầy cho con | Lão Hàn lâm nghiêm khắc (-30); Tiến sĩ trẻ được ngài chuộng (-30) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Con đường của con (st_con) | s2 Con ốm | Tự thức canh, mời thái y khác (-30) | Để thái y trực lo | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Con đường của con (st_con) | c1 Có kẻ nhắm vào con | Tăng người canh (-30) | Gặp một phi tần cảnh cáo | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Con đường của con (st_con) | t1 Một lời đồn về con | Tìm kẻ tung tin (-30) | Xin Hoàng thượng làm lễ nhỏ chứng minh | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Ngôi Đông cung (st_dong) | c2 Thái hậu nói một câu | Dâng lễ lên Đức Thọ cung (-50) | Đưa con đến hầu Thái hậu mỗi ngày | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ngôi Đông cung (st_dong) | c3 Khảo hạch các hoàng tử | Mời thầy giỏi kèm riêng (-50) | Tự dạy con | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Ngôi Đông cung (st_dong) | t1 Một âm mưu nhắm vào con | Đổi người nấu, giăng bẫy bắt (-30) | Tự nấu cho con | Nhờ người quen lo liệu, không dùng bạc | lớn → 7 ngày |
| Thanh mai trúc mã: Ngày từ biệt (tm96a) | a1 Ngày từ biệt | Nhờ người gửi trả tín vật, dặn chàng quên mình (-10) | Giữ tín vật, coi như lời hẹn kiếp sau; Viết một dòng: “Hãy lập công danh” | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Ngày từ biệt (tm96a) | a2 Gặp lại ở {lvp} | Sai cung nữ chuyển lời: “Đừng tìm ta” (-10) | Cúi đầu đi qua như người lạ; Dừng lại hỏi một câu xã giao | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Ngày từ biệt (tm96a) | a3 Tín vật trở lại | Gửi trả kèm một câu thật lạnh (-10) | Giữ lại, giấu thật kỹ; Đốt mảnh giấy, cất tín vật vào kho chung | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Ngày từ biệt (tm96a) | a5 Người hầu đã biết | Tin nàng, nhờ nàng canh cửa (-20) | Dặn nàng quên chuyện này; Đổi nàng sang việc khác cho yên | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Ngày từ biệt (tm96a) | a6 Đêm rằm tháng tám | Gửi trả tín vật, xin chàng quên ta (-10) | Giữ lời hẹn trong tim, không để ai biết | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lửa thử vàng (tm96b) | b1l Kẻ nắm thóp đòi giá | Đưa bạc cho nàng ta im miệng (-80) | Giả vờ không hiểu nàng nói gì; Thu thập chứng cứ nàng ta, nắm lại thóp | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lửa thử vàng (tm96b) | b2a Chàng vì ngươi mà liều | Lén gửi lời ngăn chàng lại (-20); Để chàng làm, âm thầm đỡ đòn phía sau (-50) | Đòi chàng cắt hẳn mọi liên lạc | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lửa thử vàng (tm96b) | b3a Kẻ thù để ý | Bỏ bạc mua người của nàng ta (-60) | Tạm ngừng mọi liên lạc với chàng; Đánh lạc hướng: để lộ một chuyện vô hại | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lửa thử vàng (tm96b) | b3b Thái giám đánh hơi | Đút bạc bịt miệng (-50) | Dọa tố hắn với Tổng quản | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lựa chọn cuối (tm96c) | c1o Người bị giáng | Lén gửi bạc giúp chàng (-60) | Xin Hoàng thượng phục chức cho chàng; Để mặc, giữ mình | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lựa chọn cuối (tm96c) | c2 Hôn sự của chàng | Âm thầm ngăn cản mối hôn (-60) | Tán thành, khen đôi lứa xứng đôi; Im lặng | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lựa chọn cuối (tm96c) | c4b Sóng ngầm trong triều | Âm thầm lo lót cứu chàng (-80) | — (only giving up) | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| Thanh mai trúc mã: Lựa chọn cuối (tm96c) | c5 Chuẩn bị cho ngày cuối | Lo đường lui cho chàng trên triều (-60) | Đốt hết thư từ, xóa mọi dấu vết | Nhờ người quen lo liệu, không dùng bạc | vừa → 3 ngày |
| beat chung (G) | G.rumor Lời đồn về {sj} | Bỏ bạc dập lời đồn (-40) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |
| beat chung (G) | G.hh Hoàng hậu hỏi đến {sj} | Xin Hoàng hậu đứng ra che chở (-30) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |
| beat chung (G) | G.th Thái hậu để ý đến {sj} | Dâng lễ, khéo xin bà đừng nhúng tay (-40) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |
| beat chung (G) | G.spy Một kẻ gạ bán tin về {sj} | Mua tin (-50) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |
| beat chung (G) | G.ill Lo nghĩ về {sj} làm ngươi sinh bệnh | Mời thái y giỏi, uống thuốc quý (-45) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |
| beat chung (G) | G.rival Một phi tần muốn lợi dụng {sj} | Kéo {v2} về phe mình (-40) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |
| beat chung (G) | G.srv Đồng liêu dò hỏi về {sj} | Biếu bánh trái để họ thôi tò mò (-5) | — (only giving up) | (nhờ người quen, tự thêm) | vừa → 3 ngày |

## Phụ tuyến (j72 Việc nhờ) with a Bạc step

| quest | deadline (tuần) | steps | Bạc steps | Bạc steps with a free branch |
|---|---|---|---|---|
| Tìm vị thuốc cho Thái hậu | 4 | 2 | 1. Tìm vị thuốc | 1 |
| Xin thuốc cho {A} đang mắc bệnh | 3 | 2 | 1. Xin thuốc ở Thái y viện | 1 |
| Cùng {A} thăm {B} đang ốm | 3 | 2 | 1. Chuẩn bị thuốc bổ | 1 |
| Lén mang thuốc cho {A} đang bị cấm túc | 3 | 2 | 1. Lấy thuốc | 1 |
| Mời thái y tin cẩn cho con của {A} | 3 | 2 | 1. Mời thái y tin cẩn | 1 |
| Thuyết phục {B} buông tha {A} | 4 | 2 | 2. {B} ra điều kiện | 1 |
| Mời {B} cùng {A} uống trà | 4 | 2 | 2. Bày trà, chuyện trò | 1 |
| Tìm số bạc lương {A} bị mất | 4 | 2 | 2. X=>`Ngươi biết sự thật: ${X.p.cn} lấy bạc` | 1 |
| Chuộc lại gia bảo {A} đem cầm | 5 | 2 | 1. Chuộc vòng | 1 |
| Chọn quà Tết dâng Thái hậu cùng Hoàng thượng | 3 | 2 | 1. Chọn quà | 1 |
| Lo áo bông cho quân biên ải | 6 | 2 | 1. Tổ chức may áo | 1 |
| Dò xem cha {B} có tham ô không | 6 | 2 | 1. Dò sổ sách qua thái giám | 1 |
| Vay {A} 60 bạc, hẹn trả | 8 | 1 | 1. Trả {A} 66 bạc kèm lời cảm tạ | 1 |
| Giúp {A} qua cơn túng thiếu | 3 | 1 | 1. Cho vay | 1 |
| Phối túi hương an thần cho {A} | 5 | 2 | 1. Phối hương | 1 |
| Canh chừng quanh cung {A} đang mang thai | 6 | 3 | 1. Sai người canh chừng | 1 |
| Mang áo ấm vào lãnh cung cho {A} | 4 | 2 | 1. Chuẩn bị áo bông | 1 |
| Mượn tiền dành dụm của {A} | 6 | 1 | 1. Trả {A} 30 bạc | 1 |
| {A} xin được thưởng thêm | 2 | 1 | 1. Thưởng | 1 |
| Che chuyện tình của {A} | 3 | 1 | 1. Chuyện của {A} | 1 |
| Xin Tổng quản ghi hẹn ước cho {A} | 6 | 1 | 1. Xin Tổng quản ghi hẹn ước | 1 |
| Góp của hồi môn cho {A} | 5 | 1 | 1. Hồi môn | 1 |
| Thắt nút đồng tâm Thất tịch cùng {A} | 2 | 2 | 1. Mua chỉ đỏ | 1 |
| Cứu {A} khỏi chủ cũ | 5 | 2 | 2. Đưa {A} đi đâu | 1 |
| Ủ rượu hoa cúc Trùng cửu cho Thái hậu | 5 | 4 | 2. Ủ rượu | 1 |
| Lo bày biện yến Trung thu | 5 | 3 | 2. Bạc yến không đủ | 1 |
| Thêu bình phong mừng thọ Trùng cửu dâng Thái hậu | 6 | 3 | 2. Chỉ vàng thiếu | 1 |
| Khâu túi ngũ sắc Đoan ngọ cho các hoàng tử, công chúa | 4 | 2 | 1. Khâu túi ngũ sắc | 1 |
| May áo bông cho cung nhân già | 6 | 2 | 1. Cắt may áo | 1 |
| Xin thuốc trị thương sau Hội Phượng | 3 | 1 | 1. Xin thuốc trị thương | 1 |
| Gửi quà Tết về nhà cho {A} | 2 | 1 | 1. Gửi quà theo người ra cung | 1 |
| Thư nhà: xin quyền buôn muối ở trấn mới | 5 | 1 | 1. Nhờ Tổng quản đưa lời đến Hộ bộ | 1 |
| Đồng liêu cũ ở Càn Thanh cung nhờ giúp | 4 | 1 | 1. Xin Tổng quản | 1 |
| Tin nhà: người hầu cũ của nhà ngươi túng quẫn | 5 | 2 | 1. Gom bạc gửi ra | 1 |

## Old story j4 (only saves from before chapters)

| beat | Bạc option | other options |
|---|---|---|
| tt2 | Bỏ bạc lo lót triều thần (-60) | Đứng ngoài, giữ mình |
| td1 | Giấu ông ở Tân Giả Khố (-30) | Nhờ Lam Ngọc giấu ông trong kho củi; Mặc kệ |

## Banners missing (story events may show people) → act-pics2

305 chapter beats have no own picture (`EVENTS.json stories.<arc>.files.<beat>`); they show the arc cover (bìa) when there is one, else a room picture. Arcs without even a cover: dtq_huynh, muoi_lau, muoi_doi, muoi_no, cn_chu, cn_tinh, cn_ban, cn_than, nc_gian, nc_su, nc_tuc, nc_vuong, td_an, td_ke, td_song, td_tha, ch_co, ch_benh, ch_ho, ch_bi, thd_tho, thd_sach, thd_tro, thd_hoc, cnv_chu, cnv_ban, cnv_mat, cnv_ma, s_than, s_thu, s_hoa, s_su, s_dich, s_tinh, s_thay, s_ban, st_the, st_con, st_dong, tm96a, tm96b, tm96c.

| arc | beats without own picture |
|---|---|
| Người anh nơi đất giặc (dtq_huynh) | c3 Tin đồn huynh hàng giặc; t1 Huynh trốn thoát?; x1 Ngày quyết định |
| Thuyền muối đêm (muoi_lau) | s1 Thuyền bị bắt; s2 Hộ bộ nhắm vào nhà ngươi; c1 Quản sự gian; c2 Thuyền muối thứ tư; c3 {v} ra vẻ thương cảm; t1 Đường dây lộ ra; x1 Xử án muối lậu |
| Năm đói ở Giang Nam (muoi_doi) | s1 Thư cha về kho thóc; s2 Dân đói kéo về kinh; c1 Triều đình đòi trưng thu thóc; c2 Đầu cơ của nhà khác; c3 Dịch bệnh sau đói; t1 Cha không chịu nghe; x1 Hoàng thượng xét công tội |
| Món nợ trong cung (muoi_no) | s1 Sổ nợ của hiệu buôn; s2 {v} vay thêm; c1 Có người đòi mua sổ nợ; c2 Nợ lộ ra; c3 {v} đề nghị trả nợ bằng tin; t1 Nợ đến hạn cuối; x1 Món nợ ngã ngũ |
| Chủ cũ (cn_chu) | s1 Chén trà trước mặt mọi người; s2 Kẻ hầu cũ biết chuyện; c1 Chuyện xưa bị khơi lại; c2 {v} gặp nạn; c3 Hoàng thượng hỏi về chủ cũ; t1 Ngươi sắp vượt {v}; x1 Ngày ngồi ngang hàng |
| Mối tình thuở hầu trà (cn_tinh) | s1 Người cũ gác cửa; s2 Bức thư cũ; c1 Một thái giám đánh hơi; c2 {n1} gặp nạn; c3 Hoàng thượng thấy ánh mắt; t1 Thư cũ lộ ra; x1 Ngày quá khứ gõ cửa |
| Tri kỷ ở Tân Giả khố (cn_ban) | s1 Lời nhắn từ Tân Giả khố; s2 Kẻ đã đày Tố Nga; c1 Bí mật của Tố Nga; c2 Tố Nga ốm nặng; c3 Có người hỏi về Tố Nga; t1 Đưa Tố Nga ra khỏi Tân Giả khố; x1 Sự thật về cái giếng |
| Thân thế thật (cn_than) | s1 Lời trăng trối; s2 Miếng ngọc; c1 Hồ sơ án cũ; c2 Một người nhận là thân thích; c3 Kẻ thù của họ Thẩm; t1 Nhận tổ hay không; x1 Ngày trình thân thế |
| Mật lệnh cố quốc (nc_gian) | s1 Mật sứ trong đêm; s2 Người hầu cố quốc; c1 Bản đồ bố phòng; c2 Cấm quân để ý; c3 Sứ thần cố quốc dò hỏi; t1 Phụ vương đòi một tin lớn; x1 Mùa thu binh lửa |
| Sứ đoàn cố quốc (nc_su) | s1 Hoàng huynh vào kinh; s2 Lễ vật bị đánh tráo; c1 Hoàng huynh đòi giảm cống; c2 Sứ đoàn gây gổ; c3 Thái hậu thử ngươi; t1 Hoàng huynh nhờ một việc riêng; x1 Yến tiễn sứ |
| Người ngoại tộc (nc_tuc) | s1 Lời chê áo váy; s2 Món ăn quê nhà; c1 Thái hậu đau lưng; c2 Lễ hội té nước; c3 Học chữ Hán; t1 Thái hậu mời ngươi chép kinh; x1 Đại thọ Thái hậu |
| Ngai vàng cố quốc (nc_vuong) | s1 Tin phụ vương băng hà; s2 Hai phong thư; c1 Hoàng thúc gửi lễ; c2 Triều đình chia phe; c3 Hoàng huynh gặp nguy; t1 Ai đáng làm vua; x1 Đại Hy chọn phe |
| Lật lại án cũ (td_an) | s1 Kho hồ sơ Hình bộ; s2 {foe} để ý ngươi; c1 Nhân chứng bị truy sát; c2 Thư tay của {foed}; c3 Phải lên cao mới dâng được sớ; t1 {foed} ra tay trước; x1 Dâng sớ lật án |
| Kẻ đứng sau màn (td_ke) | s1 Một chi tiết không khớp; s2 Người gửi tiền cho ngươi; c1 Ngự sử giúp sức; c2 {n1} cảnh cáo; c3 {foe} cũng là con cờ; t1 Hai kẻ thù, một sớ tấu; x1 Đêm dâng sớ |
| Người em còn sống (td_song) | s1 Chiếc vòng bạc; s2 Kẻ dò la; c1 Em bị bắt lính đánh trận; c2 Em lập công; c3 Hoàng thượng hỏi chuyện biên ải; t1 Thân phận em bị tra; x1 Số phận người em |
| Thù hay tha (td_tha) | s1 {foe} ngã bệnh; s2 Nỗi đau của {foe}; c1 Cơ hội hại {foe}; c2 {foed} gửi thư cho con gái; c3 {foe} có thai; t1 {foe} biết ngươi là ai; x1 Lựa chọn cuối |
| Quân cờ của cô tổ (ch_co) | s1 Việc đầu tiên; s2 Cô tổ chọn người hầu cho ngươi; c1 Gói thuốc; c2 Cô tổ muốn ngươi có con; c3 Hoàng hậu cầu hòa; t1 Cô tổ hỏi lòng ngươi; x1 Ván cờ cuối của cô tổ |
| Thái hậu lâm bệnh (ch_benh) | s1 Đức Thọ cung đóng cửa; s2 Hoàng hậu nắm quyền; c1 Thuốc của Thái y viện; c2 Các phi tần xoay chiều; c3 Chùa Hộ Quốc cầu an; t1 Đêm nguy kịch; x1 Thái hậu tỉnh dậy |
| Hai người cháu (ch_ho) | s1 Hai chén trà; s2 Nhà ngoại muốn chọn một người; c1 {v} gài bẫy; c2 {v} gặp họa; c3 Thái hậu muốn tác hợp con cháu; t1 {v} tìm gặp ngươi; x1 Thái hậu chọn người |
| Bí mật năm xưa (ch_bi) | s1 Lá thư trong hộp gấm; s2 Có người biết chuyện; c1 Một phi tần dò hỏi; c2 Thái hậu linh cảm; c3 Bản sao thư đến tay Hoàng hậu; t1 Sự thật năm xưa; x1 Bí mật bị đem ra |
| Danh hiệu Tài nữ (thd_tho) | s1 Bài thơ lọt ra ngoài; s2 Luyện thơ; c1 {v} tố ngươi đạo thơ; c2 Đề thi bị lộ; c3 Hoàng thượng thử tài; t1 Đêm trước kỳ thi; x1 Kỳ thi Tài nữ |
| Di cảo của cha (thd_sach) | s1 Rương sách cũ; s2 {n1} nghe phong thanh; c1 Hàn lâm viện muốn xem sách; c2 Lũ lụt ở Hoài Bắc; c3 Người lạ lục phòng; t1 {n1} đề nghị; x1 Sách ra đời hay không |
| Học trò của cha (thd_tro) | s1 Lá thư của học trò; s2 Sĩ tử náo động; c1 Nhà quan mua đề; c2 Bài thi gốc; c3 {n1} bị dọa; t1 Phúc khảo; x1 Định đoạt khoa án |
| Thầy giáo trong cung (thd_hoc) | s1 Buổi học đầu; s2 Đứa trẻ chậm hiểu; c1 {v} không bằng lòng; c2 Hoàng thượng xét bài; c3 Con ngươi cùng học; t1 Một đứa trẻ bị ốm sau giờ học; x1 Ngày khảo hạch |
| Bí mật của chủ nhân (cnv_chu) | s1 Đêm trực; s2 Gói thuốc lạ; c1 Người khác dò hỏi; c2 Chủ sai việc nguy; c3 Hoàng thượng hỏi chuyện; t1 Bí mật sắp lộ; x1 Số phận của bí mật |
| Chị em đồng hương (cnv_ban) | s1 Xuân Đào bị bắt; s2 Kẻ thật sự lấy vòng; c1 Xuân Đào ốm trong ngục; c2 Chủ hỏi ngươi; c3 Thu Cúc ra tay trước; t1 Ngày xử; x1 Phiên xử ở sân sau |
| Ánh mắt nơi hành lang (cnv_mat) | s1 Chiếc ô dưới mưa; s2 Chủ nghe phong thanh; c1 Ngài lại ghé; c2 Một phi tần khác muốn mua ngươi; c3 Bài hát nơi hậu viện; t1 Chủ ra tay; x1 Đêm Trung thu |
| Ma ma dạy việc (cnv_ma) | s1 Bài học đầu; s2 Sổ sách Nội vụ phủ; c1 Ma ma ốm; c2 Đồng liêu ghen; c3 Ma ma thử lòng; t1 Ma ma có bí mật; x1 Ngày khảo việc |
| Người thân thất lạc (s_than) | s1 Một tiểu thái giám tìm ngươi; s2 Ai đưa hắn vào cung; c1 Hắn xin việc ở cung ngươi; c2 {v} nhắc khéo; c3 Hắn gặp nạn; t1 Sự thật lộ ra; x1 Ván cờ người thân |
| Bức mật thư (s_thu) | s1 Bức thư trong vườn; s2 Ai đánh rơi thư; c1 Đêm rằm sắp đến; c2 {v} dò hỏi; c3 Thư thứ hai; t1 Bằng chứng gom đủ; x1 Quyết định về bức thư |
| Đêm cháy Tây cung (s_hoa) | s1 Lửa giữa đêm; s2 Bóng người trong lửa; c1 Người ta đổ cho ngươi; c2 Tên thái giám tưới dầu; c3 Tây cung xây lại; t1 Vì sao lửa cháy; x1 Kết vụ cháy |
| Sứ thần phương Tây (s_su) | s1 Yến tiếp sứ; s2 Món quà kỳ lạ; c1 Thông dịch bịa lời; c2 Sứ thần xin truyền đạo; c3 Đồng hồ hỏng; t1 Sứ thần sắp về; x1 Yến tiễn sứ |
| Mùa dịch đậu mùa (s_dich) | s1 Dịch vào cung; s2 Đơn thuốc cổ; c1 Hoàng tự lâm bệnh; c2 Tin đồn ngươi mang bệnh; c3 Hoàng thượng sốt; t1 Dịch lên đỉnh; x1 Dịch qua |
| Cám dỗ (s_tinh) | s1 Ánh mắt ở Ngự hoa viên; s2 Bài thơ không tên; c1 Hẹn gặp; c2 Hoàng thượng lạnh nhạt; c3 Có kẻ biết; t1 {man} muốn đưa ngươi trốn; x1 Hồi kết của cám dỗ |
| Lão thái giám (s_thay) | s1 Lời khuyên đầu tiên; s2 Ông muốn gì; c1 Bài học về chữ nhẫn; c2 Ông bị nghi; c3 Ông thử ngươi; t1 Ông già yếu; x1 Di sản của lão thái giám |
| Kẻ thù hóa tri kỷ (s_ban) | s1 Cùng bị vu; s2 Kẻ đứng sau; c1 {v} tìm gặp; c2 {v2} lại ra tay; c3 Hai người cùng yến; t1 Liên minh hay không; x1 Đối mặt {v2} |
| Gây dựng thế lực (st_the) | s1 Lời mời của {v}; s2 Cài tai mắt; c1 Một nhà quyền thần dò ý; c2 {v2} chia rẽ; c3 Ân thưởng chia đều; t1 Phe cánh bị thử thách; x1 Ngày phe cánh lên tiếng |
| Con đường của con (st_con) | s1 Chọn thầy cho con; s2 Con ốm; c1 Có kẻ nhắm vào con; c2 Hoàng thượng thử tài con; c3 Con muốn chơi với con của đối thủ; t1 Một lời đồn về con; x1 Ngày con được định vị |
| Ngôi Đông cung (st_dong) | s1 Sớ xin lập Thái tử; s2 Nhà quyền thần đặt cược; c1 Mẹ hoàng tử khác ra tay; c2 Thái hậu nói một câu; c3 Khảo hạch các hoàng tử; t1 Một âm mưu nhắm vào con; x1 Ngày lập Thái tử |
| Thanh mai trúc mã: Ngày từ biệt (tm96a) | a1 Ngày từ biệt; a2 Gặp lại ở {lvp}; a3 Tín vật trở lại; a4 Bức thư không ký tên; a5 Người hầu đã biết; a6 Đêm rằm tháng tám |
| Thanh mai trúc mã: Lửa thử vàng (tm96b) | b1l Kẻ nắm thóp đòi giá; b1h Tin chàng thăng chức; b1d Ánh mắt từ xa; b2a Chàng vì ngươi mà liều; b2b Chàng chọn tiền đồ; b3a Kẻ thù để ý; b3b Thái giám đánh hơi; b4 Tang vật trong cung ngươi; b5 Hoàng thượng thử lòng; b6 Phiên tra hỏi |
| Thanh mai trúc mã: Lựa chọn cuối (tm96c) | c1n Mắt ở khắp nơi; c1o Người bị giáng; c1t Người được trọng dụng; c2 Hôn sự của chàng; c3a “Theo ta đi”; c3b Xin một lời dứt khoát; c4a Đòn cuối của kẻ thù; c4b Sóng ngầm trong triều; c5 Chuẩn bị cho ngày cuối; c6 Lựa chọn cuối |
