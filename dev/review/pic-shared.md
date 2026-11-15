# Tranh hộp thoại dùng chung / tranh mặc định (review/gift-ui, sếp 11/15)

Phạm vi: hộp thoại, popup, thiệp lễ hội / lời mời, tin trong cung, hộp quà, sự kiện NPC (E68), việc nhờ (T72), tranh mặc định. Thẻ việc, Sổ tuần (Tuần lục) và dòng kết quả việc đã có ở review/act-pics2 (`dev/art/ACT_PIC_ALL.md`, 713 nghĩa) — không lặp lại ở đây. Đối chiếu theo tên tệp: một nghĩa dưới đây không trùng khóa `act-<khóa>` nào của danh sách đó.

Công cụ: `node dev/tools/pic_usage.js <url> out.json` (mở từng hộp thoại trong game, ghi tranh), `python3 dev/tools/pic_usage_report.py out.json dev/review/pic-shared.md`.

## Số liệu
- hộp thoại đã mở: 290 (nghĩa khác nhau: 120) · tranh khác nhau: 23
- tranh bị 2+ nghĩa dùng chung: **16** · nghĩa cần tranh riêng: **121** (trong đó rơi vào tranh mặc định / không có tranh riêng: **79**)

## Bảng tranh → các nghĩa dùng nó (chỉ tranh dùng chung)
| tranh | số nghĩa | các nghĩa (id · tiêu đề) |
|---|---|---|
| `act-cat-giao-thiep.webp` | 32 | tt1 (tt1) · tt3 (tt3) · nc1 (nc1) · td1 (td1) · night2 (night2) · giftpick (giftpick) · taintpick (taintpick) · evpick (evpick) · j70thr (j70thr) · e68:spoiledFood (Chuyện trong cung) · e68:letterHome (Chuyện trong cung) · e68:heatStroke (Thời tiết) … |
| `act-cat-hau-ha.webp` | 18 | prep (prep) · night1 (night1) · shop (shop) · plantsv (plantsv) · vlnvp (vlnvp) · e68:sickServant (Kẻ hầu) · e68:proudVisit (Có người đến) · e68:servLeave (Kẻ hầu) · e68:fortuneNun (Chuyện trong cung) · e68:servHero (Kẻ hầu) · q72:qua_tet (Việc nhờ) · q72:mama_nghi (Việc nhờ) … |
| `act-cat-hoc-tap.webp` | 15 | vlcraft (vlcraft) · e68:giftArrive (Chuyện trong cung) · e68:leakRoof (Thời tiết) · e68:embroidery (Chuyện trong cung) · e68:painter (Có người đến) · e68:musician (Có người đến) · e68:rumorEmpLove (Tin đồn) · e68:borrowDress (Có người đến) · q72:tho_te (Việc nhờ) · q72:quat_rv (Việc nhờ) · q72:tu_nu (Việc nhờ) · q72:kho_tet (Việc nhờ) … |
| `act-cat-di-lai.webp` | 12 | ch1 (ch1) · ch2 (ch2) · e68:thMama (Có người đến) · e68:docCheck (Có người đến) · e68:newGirlAdvice (Có người đến) · e68:autumnMoon (Thời tiết) · e68:poisonedFish (Chuyện lạ cần tra) · e68:hhSummons (Có người đến) · e68:doubtVisit (Có người đến) · q72:mat_tram2 (Việc nhờ) · q72:off_con (Việc nhờ) · j71f:thanhtho (Thánh thọ Thái hậu · Yến tiệc) |
| `act-cat-trieu-chinh.webp` | 8 | tt2 (tt2) · e68:famineDonate (Tin triều đình) · e68:borderNews (Tin triều đình) · e68:clanFather (Tin triều đình) · e68:officialWife (Tin triều đình) · e68:envoyGift (Tin triều đình) · q72:off_hoa (Việc nhờ) · q72:emp_co (Việc nhờ) |
| `act-cat-le-nghi.webp` | 8 | e68:kindVisit (Có người đến) · e68:snowDay (Thời tiết) · e68:templeRite (Chuyện trong cung) · e68:rumorTH (Tin đồn) · q72:th_kinh2 (Việc nhờ) · j71f:vantho (Tiết Vạn thọ · Lễ) · j71f:thanhtho (Thánh thọ Thái hậu · Lễ) · j71f:lapbat (Lễ Lạp bát · Lời mời thi khéo tay) |
| `act-cat-buon-ban.webp` | 5 | vlget (vlget) · vlout (vlout) · e68:silkAllot (Chuyện trong cung) · e68:lotusSeason (Thời tiết) · q72:tin_doi (Việc nhờ) |
| `ev-le-thu.webp` | 4 | trungcuu (trungcuu) · vulan (vulan) · j71f:vulan (Lễ Vu Lan · Lễ) · j71f:trungcuu (Tết Trùng cửu · Lời mời thi thơ) |
| `act-cat-muu-ke.webp` | 4 | plantpick (plantpick) · runner (runner) · e68:rumorPreg (Tin đồn) · e68:rumorFavor (Tin đồn) |
| `ev-le-dong.webp` | 3 | dongchi (dongchi) · j71f:dongchi (Tiết Đông chí · Lễ) · j71f:giaothua (Đêm Giao thừa · Lời mời thi câu đối) |
| `act-cat-cham-con.webp` | 3 | e68:strayCat (Chuyện trong cung) · e68:eunRequest (Có người đến) · q72:hh_doanngo (Việc nhờ) |
| `ev-le-xuan-2.webp` | 3 | j71f:newyear (Tết Nguyên đán · Lời mời thi câu đối) · j71f:nguyentieu (Tết Nguyên tiêu · Lời mời thi đố đèn) · j71f:thanhminh (Tiết Thanh minh · Lời mời thi thơ) |
| `act-cat-hai-nguoi.webp` | 2 | thd1 (thd1) · e68:allyOffer (Có người đến) |
| `ev-di-san.webp` | 2 | phoenix (phoenix) · j71f:phoenix (Hội Phượng (thi cưỡi ngựa bắn cung) · Lờ) |
| `ev-le-ha.webp` | 2 | doanngo (doanngo) · j71f:doanngo (Tết Đoan ngọ · Đặt cược) |
| `item-tp-mon-b2.webp` | 2 | wkgive (wkgive) · giftpick:item (Tặng quà) |

## Danh sách cần vẽ (mỗi dòng = một tranh mới, 3:4, không mặt người cận cảnh; khóa đề xuất `ev-<khóa>`)
| # | khóa đề xuất | id hộp thoại | tiêu đề | tranh đang dùng | lý do | cảnh (một dòng) |
|---|---|---|---|---|---|---|
| 1 | `e68-lotusseason` | e68:lotusSeason | Thời tiết | `act-cat-buon-ban.webp` | dùng chung với 4 nghĩa khác | Trịnh Nhược Lan muốn cùng ngươi làm bánh hạt sen mời Thái hậu. |
| 2 | `e68-silkallot` | e68:silkAllot | Chuyện trong cung | `act-cat-buon-ban.webp` | dùng chung với 4 nghĩa khác | Nội vụ phủ chia lụa may áo mùa mới; xấp đẹp nhất đến tay ngươi, còn Bạch Hồng Diệp nhận toàn màu cũ. |
| 3 | `q72-tin-doi` | q72:tin_doi | Việc nhờ | `act-cat-buon-ban.webp` | mặc định / không có tranh riêng | “Muội cho tỷ biết một tin trong cung. |
| 4 | `vlget` | vlget | vlget | `act-cat-buon-ban.webp` | mặc định / không có tranh riêng | Mạng che mặt phải tự làm, mua hoặc được ban. |
| 5 | `vlout` | vlout | vlout | `act-cat-buon-ban.webp` | mặc định / không có tranh riêng | Lão Quế Tử thưa: “Chợ ngoài cửa Thần Vũ có đủ kiểu mạng, rẻ hơn Nội vụ phủ, chỉ là không biết đồ phẩm nào.” |
| 6 | `e68-eunrequest` | e68:eunRequest | Có người đến | `act-cat-cham-con.webp` | dùng chung với 2 nghĩa khác | Lão Quế Tử xin ngươi đứng ra cho hắn nhận một tiểu thái giám làm con nuôi. |
| 7 | `e68-straycat` | e68:strayCat | Chuyện trong cung | `act-cat-cham-con.webp` | dùng chung với 2 nghĩa khác | Con mèo vàng của ai đó cắp mất con cá Hoàng thượng ban, chạy vào bụi trúc. |
| 8 | `q72-hh-doanngo` | q72:hh_doanngo | Việc nhờ | `act-cat-cham-con.webp` | mặc định / không có tranh riêng | “Đoan ngọ phải đeo túi ngũ sắc trừ tà cho trẻ nhỏ. |
| 9 | `ch1` | ch1 | ch1 | `act-cat-di-lai.webp` | mặc định / không có tranh riêng | Thái hậu gọi ngươi vào Đức Thọ cung: “Hoàng hậu bất tài. |
| 10 | `ch2` | ch2 | ch2 | `act-cat-di-lai.webp` | mặc định / không có tranh riêng | Thái hậu dúi vào tay ngươi một gói thuốc: “Bỏ vào trà của Hoàng hậu.” |
| 11 | `e68-autumnmoon` | e68:autumnMoon | Thời tiết | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Mùa cua béo, Chu Tú Uyển gửi sang một giỏ cua và rượu hoa cúc. |
| 12 | `e68-doccheck` | e68:docCheck | Có người đến | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Thái y Trương nhắc ngươi mùa này dễ nhiễm lạnh, khuyên dùng thang thuốc ôn bổ. |
| 13 | `e68-doubtvisit` | e68:doubtVisit | Có người đến | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Tạ Dao Cầm chặn ngươi giữa đường, hỏi sao cung nữ của ngươi lảng vảng gần cung nàng. |
| 14 | `e68-hhsummons` | e68:hhSummons | Có người đến | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Hoàng hậu Chu Tú Uyển hỏi ngươi có thấy cung nào chi tiêu quá lệ. |
| 15 | `e68-newgirladvice` | e68:newGirlAdvice | Có người đến | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Tống Ngọc Dao hỏi ngươi nên mặc gì cho yến tiệc tháng tới. |
| 16 | `e68-poisonedfish` | e68:poisonedFish | Chuyện lạ cần tra | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Chậu lan quý héo rũ chỉ sau một đêm, đất có mùi lạ. |
| 17 | `e68-thmama` | e68:thMama | Có người đến | `act-cat-di-lai.webp` | dùng chung với 11 nghĩa khác | Ma ma Đức Thọ cung đến, hỏi nhỏ chuyện các phi tần dạo này có ai hay lui tới Càn Thanh cung. |
| 18 | `j71f-thanhtho` | j71f:thanhtho | Thánh thọ Thái hậu · Yến tiệc | `act-cat-di-lai.webp` | mặc định / không có tranh riêng | Thánh thọ Thái hậu Mừng thọ Thái hậu, ngươi có thể đứng ra lo một bàn tiệc chay mời các cung. |
| 19 | `q72-mat-tram2` | q72:mat_tram2 | Việc nhờ | `act-cat-di-lai.webp` | mặc định / không có tranh riêng | “Chuyện mất đồ đến tai Hoàng hậu, người cho gọi muội hỏi. |
| 20 | `q72-off-con` | q72:off_con | Việc nhờ | `act-cat-di-lai.webp` | mặc định / không có tranh riêng | “Con gái lão phu phẩm vị thấp, vào cung còn non dại. |
| 21 | `e68-droughtprayer` | e68:droughtPrayer | Thời tiết | `act-cat-giao-thiep.webp` | dùng chung với 31 nghĩa khác | Giếng cung cạn dần, mỗi cung chỉ được chia nửa phần nước. |
| 22 | `e68-heatstroke` | e68:heatStroke | Thời tiết | `act-cat-giao-thiep.webp` | dùng chung với 31 nghĩa khác | Trời hầm hập, ngự hoa viên vắng tanh, chỉ có Hoàng thượng ngồi câu cá bên hồ. |
| 23 | `e68-letterhome` | e68:letterHome | Chuyện trong cung | `act-cat-giao-thiep.webp` | dùng chung với 31 nghĩa khác | Người nhà nhắn vào: em trai ngươi thi hỏng, muốn ngươi xin cho một chân thư lại. |
| 24 | `e68-spoiledfood` | e68:spoiledFood | Chuyện trong cung | `act-cat-giao-thiep.webp` | dùng chung với 31 nghĩa khác | Nội vụ phủ cấp than xuân toàn than ẩm khói mù, Lão Quế Tử ho sặc sụa. |
| 25 | `e68-springallergy` | e68:springAllergy | Thời tiết | `act-cat-giao-thiep.webp` | dùng chung với 31 nghĩa khác | Phấn hoa xuân bay khắp nơi, ngươi hắt hơi không dứt, mắt đỏ hoe. |
| 26 | `e68-stormnight` | e68:stormNight | Thời tiết | `act-cat-giao-thiep.webp` | dùng chung với 31 nghĩa khác | Gió lớn làm đổ giàn hoa, đè lên một tiểu thái giám. |
| 27 | `evpick` | evpick | evpick | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Tập chứng cứ này nói về ai? |
| 28 | `giftpick` | giftpick | giftpick | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Chọn món đồ để tặng. |
| 29 | `j70thr` | j70thr | j70thr | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Hoàng hậu Chu Tú Uyển: ghét ngươi, thiện cảm -10; mức nguy hiểm với ngươi: không. |
| 30 | `j71f-thanhtho` | j71f:thanhtho | Thánh thọ Thái hậu · Lời mời thi hát | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Lời mời · Thánh thọ Thái hậu (tuần tới) Thái hậu thích nghe hát; các cung tập một đoạn hát chúc thọ. |
| 31 | `j71f-vantho` | j71f:vantho | Tiết Vạn thọ · Lời mời thi hát | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Lời mời · Tiết Vạn thọ (tuần tới) Yến Vạn thọ có nhạc phường, các cung hát chúc thọ. |
| 32 | `j71x-sac` | j71x:sac | Yến tiệc đầu xuân · Lời mời | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Lời mời · Yến tiệc đầu xuân (đầu tháng giêng) Hoàng thượng cho các cung ghi tên dâng nghệ trong Yến tiệc đầu xuân; 12 ph |
| 33 | `j71x-tai` | j71x:tai | Thi tài ngày Thất tịch · Lời mời | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Lời mời · Thi tài ngày Thất tịch (đầu tháng bảy) Hoàng thượng cho các cung ghi tên dâng nghệ trong Thi tài ngày Thất tịc |
| 34 | `nc1` | nc1 | nc1 | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Mật sứ Nam Chiếu trao thư của phụ vương: muốn ngươi dò bố phòng biên ải Đại Hy. |
| 35 | `news-tin-trong-cung` | news:Tin trong cung | Tin trong cung | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Tin trong cung |
| 36 | `night2` | night2 | night2 | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Ngài có vẻ xa cách. |
| 37 | `q72-doi-thuoc` | q72:doi_thuoc | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Nhân sâm trong kho hụt hẳn mấy cân. |
| 38 | `q72-don-ta` | q72:don_ta | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Có người thưa với bổn cung rằng Tạ Dao Cầm oán bổn cung. |
| 39 | `q72-hh-trungthu` | q72:hh_trungthu | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Yến Trung thu năm nay Hoàng thượng muốn làm lớn. |
| 40 | `q72-loi-thoi` | q72:loi_thoi | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Muội vào cung chưa có ai thân. |
| 41 | `q72-maid-tet` | q72:maid_tet | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Tết sắp đến, nô tỳ muốn gửi ít quà về cho mẹ mà không có đường ra. |
| 42 | `q72-mat-tram` | q72:mat_tram | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Đôi hoa tai ngọc mẫu thân muội để lại biến mất mấy hôm nay. |
| 43 | `q72-ns-doi` | q72:ns_doi | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Thần xin chỉ tiểu chủ ngón vê dây của Quảng Lăng tán. |
| 44 | `q72-th-aodong` | q72:th_aodong | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Trời trở rét, mấy ma ma già trong Đức Thọ cung áo mỏng. |
| 45 | `q72-th-mai` | q72:th_mai | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Năm nào ai gia cũng cắm một bình mai đầu năm. |
| 46 | `q72-th-thanhminh` | q72:th_thanhminh | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Thanh minh sắp tới, ai gia muốn một bộ kinh Kim Cang chép tay đặt trước lăng tiên đế. |
| 47 | `q72-th-trungcuu` | q72:th_trungcuu | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Tết Trùng cửu, ai gia thèm chén rượu hoa cúc như hồi còn ở nhà. |
| 48 | `q72-tv-mua` | q72:tv_mua | Việc nhờ | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | “Hội Phượng thi cưỡi ngựa bắn cung, đội thần bị thương mấy người, thuốc ở Thái y viện phải có phi tần xin mới cấp. |
| 49 | `taintpick` | taintpick | taintpick | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Lén làm gì với Trâm ngọc bích ? |
| 50 | `td1` | td1 | td1 | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Lão thái giám họ Vương, nhân chứng còn sống của vụ án nhà ngươi, đang bị người của undefined truy sát. |
| 51 | `tt1` | tt1 | tt1 | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Thư nhà: cha ngươi đòi ngươi tâu xin cho môn sinh của ông giữ chức Thị lang Lại bộ. |
| 52 | `tt3` | tt3 | tt3 | `act-cat-giao-thiep.webp` | mặc định / không có tranh riêng | Cha ngươi ngầm điều cấm quân, định ép Hoàng thượng phế Hoàng hậu, lập ngươi thay. |
| 53 | `e68-allyoffer` | e68:allyOffer | Có người đến | `act-cat-hai-nguoi.webp` | dùng chung với 1 nghĩa khác | Lục Uyển Nhi gửi mật thư: muốn cùng ngươi tố Kiều Khinh Vũ chuyện chi tiêu xa xỉ. |
| 54 | `thd1` | thd1 | thd1 | `act-cat-hai-nguoi.webp` | mặc định / không có tranh riêng | Chu Tú Uyển tố ngươi chép thơ người xưa rồi nhận là của mình. |
| 55 | `e68-fortunenun` | e68:fortuneNun | Chuyện trong cung | `act-cat-hau-ha.webp` | dùng chung với 17 nghĩa khác | Đạo sĩ dâng bùa trừ tà cho lục cung, nói cung nào không treo sẽ gặp hạn. |
| 56 | `e68-proudvisit` | e68:proudVisit | Có người đến | `act-cat-hau-ha.webp` | dùng chung với 17 nghĩa khác | Trịnh Nhược Lan đến 'thăm', ngồi ghế chủ vị, sai cung nữ của ngươi pha trà lại vì 'nhạt'. |
| 57 | `e68-servhero` | e68:servHero | Kẻ hầu | `act-cat-hau-ha.webp` | dùng chung với 17 nghĩa khác | Đêm qua bếp cung bén lửa; Lão Quế Tử xông vào dập, bỏng cả tay. |
| 58 | `e68-servleave` | e68:servLeave | Kẻ hầu | `act-cat-hau-ha.webp` | dùng chung với 17 nghĩa khác | Lão Quế Tử xin ngươi cho nghỉ để chịu tang cha. |
| 59 | `e68-sickservant` | e68:sickServant | Kẻ hầu | `act-cat-hau-ha.webp` | dùng chung với 17 nghĩa khác | Lão Quế Tử ho ra máu, các cung nhân sợ lây, không ai dám lại gần. |
| 60 | `j71f-lapbat` | j71f:lapbat | Lễ Lạp bát · Lễ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Lễ Lạp bát Mồng tám tháng chạp, Phật đường nấu cháo lạp bát cúng dường; các cung góp gạo đậu. |
| 61 | `j71f-thanhtho` | j71f:thanhtho | Thánh thọ Thái hậu · Dâng lễ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Thánh thọ Thái hậu Thánh thọ Thái hậu: các cung dâng lễ chúc thọ; lễ được bà khen sẽ được nhắc cả năm. |
| 62 | `j71f-vantho` | j71f:vantho | Tiết Vạn thọ · Dâng lễ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Tiết Vạn thọ Tiết Vạn thọ mừng thánh đản Hoàng thượng; các cung dâng lễ chúc thọ, lễ được ngài khen sẽ được nhắc mãi. |
| 63 | `night1` | night1 | night1 | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Canh một, thái giám Kính sự phòng cởi xiêm ngoài, cuộn ngươi trong tấm chăn gấm thêu phượng, khiêng vào Dưỡng Hòa điện t |
| 64 | `plantsv` | plantsv | plantsv | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Cài người hầu của ngươi vào cung ai? |
| 65 | `prep` | prep | prep | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Kính sự phòng đã báo tin. |
| 66 | `q72-dich-thu` | q72:dich_thu | Việc nhờ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | “Thông ngôn của sứ đoàn ngã bệnh, quốc thư phải dâng trong tuần. |
| 67 | `q72-hh-trungcuu` | q72:hh_trungcuu | Việc nhờ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | “Trùng cửu là tết người già. |
| 68 | `q72-mama-nghi` | q72:mama_nghi | Việc nhờ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | “Nô tỳ năm nay 60 tuổi, hầu hạ trong cung đã mấy chục năm, chân tay rã rời. |
| 69 | `q72-qua-tet` | q72:qua_tet | Việc nhờ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | “Tết đến, năm nào trẫm cũng dâng mẫu hậu ngọc, bà chán rồi. |
| 70 | `q72-su-tet` | q72:su_tet | Việc nhờ | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | “Quốc vương nước thần gửi lễ Tết dâng Thái hậu. |
| 71 | `shop` | shop | shop | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Thái giám Nội vụ phủ bưng vào một khay đồ mua từ ngoài cung, dâng lên cho nương nương chọn: “Đồ mới mang vào, xin nương  |
| 72 | `vlnvp` | vlnvp | vlnvp | `act-cat-hau-ha.webp` | mặc định / không có tranh riêng | Thái giám Nội vụ phủ dâng sổ mẫu: “Mạng che theo phẩm của nương nương, xin người chọn.” |
| 73 | `e68-borrowdress` | e68:borrowDress | Có người đến | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Mộ Dung Họa Mi hỏi mượn cung nữ khéo tay nhất của ngươi chải tóc cho nàng. |
| 74 | `e68-embroidery` | e68:embroidery | Chuyện trong cung | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Cung nữ đồn Mộ Dung Họa Mi thêu áo tặng Hoàng thượng; ngươi có nên thêu một chiếc khác? |
| 75 | `e68-giftarrive` | e68:giftArrive | Chuyện trong cung | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Mộ Dung Họa Mi gửi sang một chậu lan quý, nói hoa nở đúng lúc nhớ đến ngươi. |
| 76 | `e68-leakroof` | e68:leakRoof | Thời tiết | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Gió giông thổi bật cánh cửa sổ, tranh chữ trên vách ướt nhòe. |
| 77 | `e68-musician` | e68:musician | Có người đến | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Nhạc sư Bùi Văn Uyên được cử sang hỏi ngươi có muốn tập múa cho buổi yến sắp tới. |
| 78 | `e68-painter` | e68:painter | Có người đến | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Họa sư Tống Hàn Phong được Nội vụ phủ cử đến tô lại bức bình phong cũ trong cung. |
| 79 | `e68-rumoremplove` | e68:rumorEmpLove | Tin đồn | `act-cat-hoc-tap.webp` | dùng chung với 14 nghĩa khác | Người bên cung Mộ Dung Họa Mi đồn: Hoàng thượng sắp phong Tạ Dao Cầm lên một bậc. |
| 80 | `j71f-lapbat` | j71f:lapbat | Lễ Lạp bát · Lời mời thi vẽ | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | Lời mời · Lễ Lạp bát (tuần tới) Các cung vẽ tranh Phật dâng chùa trong cung nhân ngày thành đạo. |
| 81 | `j71f-thanhtho` | j71f:thanhtho | Thánh thọ Thái hậu · Lời mời thi thêu | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | Lời mời · Thánh thọ Thái hậu (tuần tới) Các cung thi thêu chữ “Thọ” trên gấm đỏ dâng Thái hậu. |
| 82 | `j71f-vantho` | j71f:vantho | Tiết Vạn thọ · Lời mời thi múa | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | Lời mời · Tiết Vạn thọ (tuần tới) Yến Vạn thọ, các cung múa chúc thọ trước ngự tọa. |
| 83 | `q72-kho-tet` | q72:kho_tet | Việc nhờ | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | “Cuối năm Nội vụ phủ kiểm kho, sổ sách rối như canh hẹ. |
| 84 | `q72-quat-rv` | q72:quat_rv | Việc nhờ | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | “Hoàng thượng lâu rồi chẳng nhìn đến muội. |
| 85 | `q72-tho-te` | q72:tho_te | Việc nhờ | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | “Lễ tế trời đầu năm trẫm muốn có bài văn tế mới. |
| 86 | `q72-tu-nu` | q72:tu_nu | Việc nhờ | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | “Mộ Dung Họa Mi, Tống Ngọc Dao còn vụng lễ nghi. |
| 87 | `vlcraft` | vlcraft | vlcraft | `act-cat-hoc-tap.webp` | mặc định / không có tranh riêng | Tự tay kết mạng che mặt bằng trò thêu. |
| 88 | `e68-kindvisit` | e68:kindVisit | Có người đến | `act-cat-le-nghi.webp` | dùng chung với 7 nghĩa khác | Kiều Khinh Vũ rủ ngươi cùng chép kinh cầu phúc cho Thái hậu. |
| 89 | `e68-rumorth` | e68:rumorTH | Tin đồn | `act-cat-le-nghi.webp` | dùng chung với 7 nghĩa khác | Cung nhân đồn Thái hậu dạo này không ưa ngươi, chê ngươi lười thỉnh an. |
| 90 | `e68-snowday` | e68:snowDay | Thời tiết | `act-cat-le-nghi.webp` | dùng chung với 7 nghĩa khác | Tuyết dày chặn lối sang Đức Thọ cung, lễ thỉnh an sáng nay khó đi. |
| 91 | `e68-templerite` | e68:templeRite | Chuyện trong cung | `act-cat-le-nghi.webp` | dùng chung với 7 nghĩa khác | Rằm tháng này, Thái hậu lên Phật đường trong cung tụng kinh; các phi tần được mời theo hầu. |
| 92 | `j71f-lapbat` | j71f:lapbat | Lễ Lạp bát · Lời mời thi khéo tay | `act-cat-le-nghi.webp` | mặc định / không có tranh riêng | Lời mời · Lễ Lạp bát (tuần tới) Các cung thi cắt hoa giấy đón Tết; ai khéo nhất được thưởng. |
| 93 | `j71f-thanhtho` | j71f:thanhtho | Thánh thọ Thái hậu · Lễ | `act-cat-le-nghi.webp` | mặc định / không có tranh riêng | Thánh thọ Thái hậu Thánh thọ, các cung lên Phật đường tụng kinh cầu phúc thọ cho Thái hậu. |
| 94 | `j71f-vantho` | j71f:vantho | Tiết Vạn thọ · Lễ | `act-cat-le-nghi.webp` | mặc định / không có tranh riêng | Tiết Vạn thọ Thánh đản, các cung lên chùa trong cung tụng kinh cầu thánh thọ. |
| 95 | `q72-th-kinh2` | q72:th_kinh2 | Việc nhờ | `act-cat-le-nghi.webp` | mặc định / không có tranh riêng | “Bộ kinh lần trước ai gia cho đặt trên bàn thờ. |
| 96 | `e68-rumorfavor` | e68:rumorFavor | Tin đồn | `act-cat-muu-ke.webp` | dùng chung với 3 nghĩa khác | Có kẻ bảo thẻ bài của ngươi bị Kính sự phòng giấu xuống dưới. |
| 97 | `e68-rumorpreg` | e68:rumorPreg | Tin đồn | `act-cat-muu-ke.webp` | dùng chung với 3 nghĩa khác | Người bên cung Chu Tú Uyển rỉ tai: Vân Như Ý có mang đã hai tháng, đang giấu. |
| 98 | `plantpick` | plantpick | plantpick | `act-cat-muu-ke.webp` | mặc định / không có tranh riêng | Sai người lẻn vào cung Chu Tú Uyển, cài món gì vào rương nàng? |
| 99 | `runner` | runner | runner | `act-cat-muu-ke.webp` | mặc định / không có tranh riêng | Ai làm người chạy việc? |
| 100 | `j71f-thanhtho` | j71f:thanhtho | Thánh thọ Thái hậu · Lời mời thi điều hương | `act-cat-nghi-ngoi.webp` | mặc định / không có tranh riêng | Lời mời · Thánh thọ Thái hậu (tuần tới) Thái hậu khó ngủ; các cung thi điều hương an thần dâng bà. |
| 101 | `ksp` | ksp | ksp | `act-cat-sung-ai.webp` | mặc định / không có tranh riêng | Tối nay Hoàng thượng lật thẻ bài của ngươi. |
| 102 | `e68-bordernews` | e68:borderNews | Tin triều đình | `act-cat-trieu-chinh.webp` | dùng chung với 7 nghĩa khác | Chiến báo từ biên ải: quân ta thua một trận, Hoàng thượng thức trắng ở Dưỡng Tâm điện. |
| 103 | `e68-clanfather` | e68:clanFather | Tin triều đình | `act-cat-trieu-chinh.webp` | dùng chung với 7 nghĩa khác | Bạch Hồng Diệp khoe cha nàng vừa được thăng chức, cả nhà mở tiệc ba ngày. |
| 104 | `e68-envoygift` | e68:envoyGift | Tin triều đình | `act-cat-trieu-chinh.webp` | dùng chung với 7 nghĩa khác | Sứ thần tặng một cây đàn lạ, ngài muốn xem phi tần nào gảy được. |
| 105 | `e68-faminedonate` | e68:famineDonate | Tin triều đình | `act-cat-trieu-chinh.webp` | dùng chung với 7 nghĩa khác | Thái hậu ăn chay cầu mưa, các phi tần được mời cùng giữ chay một tháng. |
| 106 | `e68-officialwife` | e68:officialWife | Tin triều đình | `act-cat-trieu-chinh.webp` | dùng chung với 7 nghĩa khác | Phu nhân một vị thượng thư vào cung thỉnh an, xin ngươi giới thiệu với Thái hậu. |
| 107 | `q72-emp-co` | q72:emp_co | Việc nhờ | `act-cat-trieu-chinh.webp` | mặc định / không có tranh riêng | “Việc triều làm trẫm bực bội. |
| 108 | `q72-off-hoa` | q72:off_hoa | Việc nhờ | `act-cat-trieu-chinh.webp` | mặc định / không có tranh riêng | “Nhà lão phu với nhà Tể tướng đấu đá mãi, triều đình rối ren. |
| 109 | `tt2` | tt2 | tt2 | `act-cat-trieu-chinh.webp` | mặc định / không có tranh riêng | Họ ngoại của Hoàng hậu dâng sớ hặc tội cha ngươi kết bè kéo cánh. |
| 110 | `j71f-phoenix` | j71f:phoenix | Hội Phượng (thi cưỡi ngựa bắn cung) · Lời mời thi  | `ev-di-san.webp` | mặc định / không có tranh riêng | Lời mời · Hội Phượng (thi cưỡi ngựa bắn cung) (tuần tới) Hội Phượng: phi tần cũng được bắn bia ở sân tàu ngựa; ai trúng  |
| 111 | `j71f-dongchi` | j71f:dongchi | Tiết Đông chí · Lễ | `ev-le-dong.webp` | mặc định / không có tranh riêng | Tiết Đông chí Đông chí, Hoàng thượng ra đàn Nam Giao tế trời; các cung theo hầu lễ. |
| 112 | `j71f-giaothua` | j71f:giaothua | Đêm Giao thừa · Lời mời thi câu đối | `ev-le-dong.webp` | mặc định / không có tranh riêng | Lời mời · Đêm Giao thừa (tuần tới) Đêm giao thừa, Hoàng thượng ra vế đối tiễn năm cũ; vế đối hay nhất được treo ở cửa Cà |
| 113 | `j71f-doanngo` | j71f:doanngo | Tết Đoan ngọ · Đặt cược | `ev-le-ha.webp` | mặc định / không có tranh riêng | Tết Đoan ngọ Thuyền rồng của bốn đội thị vệ đua trên Thái Dịch trì; cả hậu cung đặt cược. |
| 114 | `j71f-trungthu` | j71f:trungthu | Tết Trung thu · Lời mời thi thơ | `ev-le-thu-2.webp` | mặc định / không có tranh riêng | Lời mời · Tết Trung thu (tuần tới) Yến thưởng trăng bên hồ: Hoàng thượng ra đề làm thơ “Vọng nguyệt”. |
| 115 | `j71f-thattich` | j71f:thattich | Tết Thất tịch · Lời mời thi khéo tay | `ev-le-thu-3.webp` | mặc định / không có tranh riêng | Lời mời · Tết Thất tịch (tuần tới) Đêm Thất tịch, các cung thi xâu kim dưới trăng (khất xảo); ai xâu nhanh nhất được thư |
| 116 | `j71f-trungcuu` | j71f:trungcuu | Tết Trùng cửu · Lời mời thi thơ | `ev-le-thu.webp` | mặc định / không có tranh riêng | Lời mời · Tết Trùng cửu (tuần tới) Lên Cảnh Sơn ngắm cúc, Hoàng thượng ra đề làm thơ “Đăng cao”. |
| 117 | `j71f-vulan` | j71f:vulan | Lễ Vu Lan · Lễ | `ev-le-thu.webp` | mặc định / không có tranh riêng | Lễ Vu Lan Rằm tháng bảy, chùa trong cung mở đại lễ Vu Lan; các cung cúng dường cầu siêu. |
| 118 | `vulan` | vulan | vulan | `ev-le-thu.webp` | dùng chung với 3 nghĩa khác | Rằm tháng bảy, lễ Vu Lan. |
| 119 | `j71f-newyear` | j71f:newyear | Tết Nguyên đán · Lời mời thi câu đối | `ev-le-xuan-2.webp` | mặc định / không có tranh riêng | Lời mời · Tết Nguyên đán (tuần tới) Sáng mồng một, Hoàng thượng ra vế đối Tết, các cung đối lại; vế hay nhất được treo ở |
| 120 | `j71f-nguyentieu` | j71f:nguyentieu | Tết Nguyên tiêu · Lời mời thi đố đèn | `ev-le-xuan-2.webp` | mặc định / không có tranh riêng | Lời mời · Tết Nguyên tiêu (tuần tới) Đèn lồng treo khắp ngự hoa viên, mỗi chiếc mang một câu đố; ai giải nhiều nhất được |
| 121 | `j71f-thanhminh` | j71f:thanhminh | Tiết Thanh minh · Lời mời thi thơ | `ev-le-xuan-2.webp` | mặc định / không có tranh riêng | Lời mời · Tiết Thanh minh (tuần tới) Tiết Thanh minh, mưa phùn trên liễu; Hoàng thượng ra đề làm thơ “Thanh minh vũ”. |
