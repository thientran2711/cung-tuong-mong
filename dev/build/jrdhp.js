/* ================= jrdhp: QUESTLINE Q3 — HELPERS IN HER ROAD, data only (owner D-Q1 = "1", OD 18/11 07:56Z; QUESTLINES_AUDIT §4 Q3) =================
   Engine: jroad.js rdHp* (res67 / PEND.j67 / opts67 wrappers). Numbers: BAL.road.hp (jbal2.js). Road files jrd_*.js / j67 premise arcs are NOT edited.
   RDHP["<arc id>:<beat key>:<option index in that beat's o array>"] = {hp: "<cast key or role>"} — one entry per «Nhờ …» option of her road
   (the .4 premise arc id = the road id, e.g. "tt_co"; chapters .5–.11 = "<road>_<n>"). An option with no entry rolls as before (old saves, new options).
   hp = a cast key of the chapter (v, v2, mis, man, eun, maid, n1, foe, dad) or a role: bro (huynh trưởng), mom (mẫu thân), fam (người nhà, gia đinh,
   quản gia, nhà ngoại, người thế giao…), th, hh, emp, srv (another's servant: ma ma, tiểu thái giám, cung nữ ấy), doc (thái y, lương y), off (quan:
   Ngự sử, Hàn lâm, Lễ bộ, sứ thần, phó tướng, thầy kiện…), go (an unnamed «người»: a go-between she does not know).
   Not tagged on purpose (they ask nobody): «Cảm tạ, không dám nhờ» dtq_vu_6:c2:2 · «Gửi chứng cứ qua người nhà ông, không kèm lời nhờ» dtq_vu_9:c1:0 ·
   «Không nhờ ai» muoi_no_7:c2:2 · «Họ cha, nhờ công trận» td_song_9:x1:1 ("nhờ" = thanks to, no helper).
   Scan (every «Nhờ» tagged, every tag on a «Nhờ», every tagged hồi keeps an option that asks nobody): dev/test/roadhp-scan.js.
   RDHPL[type][full|half|no|sab|lk] = the helper's answer line (VANPHONG cổ trang; xưng hô ONLY through {goi} {Goi} {xung} {Xung}, filled by
   jvoice kSay from the helper to her; {hn} = the helper's name, {ri} = the road's rival, else «người khác»). One line per answer kind per helper
   type, no line shared (sab = phá ngầm; lk = mách lẻo, said instead of sab by a Nhiều chuyện helper). */
var RDHP=window.RDHP||(window.RDHP={});var RDHPL=window.RDHPL||(window.RDHPL={});
Object.assign(RDHP,{
/* ---------- tt · Con gái Tể tướng (19) ---------- */
"tt_oan:c2:1":{hp:"off"},/* Nhờ Hàn lâm viện giám định */
"tt_co_7:s1:2":{hp:"off"},/* Nhờ người ở Lại bộ lên tiếng */
"tt_co_11:s2:2":{hp:"go"},/* Nhờ người dò ai đang nắm phủ */
"tt_oan_5:c1:0":{hp:"srv"},/* Nhờ thái giám Nội vụ phủ tra */
"tt_oan_6:s1:2":{hp:"dad"},/* Nhờ cha lo */
"tt_oan_8:t1:1":{hp:"off"},/* Nhờ Ngự sử thanh liêm hỏi giúp */
"tt_oan_9:s1:0":{hp:"off"},/* Nhờ một Ngự sử ngoài hội thẩm */
"tt_oan_9:s1:1":{hp:"bro"},/* Nhờ huynh trưởng */
"tt_oan_9:s2:0":{hp:"srv"},/* Nhờ thái giám giữ ấn đưa vào */
"tt_tranh_6:s1:0":{hp:"fam"},/* Nhờ lão giữ sổ phủ */
"tt_tranh_7:c2:1":{hp:"dad"},/* Nhờ cha phân xử */
"tt_tranh_8:s1:2":{hp:"fam"},/* Nhờ quản gia giữ ấn */
"tt_tranh_9:c1:1":{hp:"go"},/* Nhờ người nói giúp ở triều */
"tt_tranh_10:c2:2":{hp:"dad"},/* Nhờ cha lên tiếng */
"tt_tranh_11:s2:1":{hp:"fam"},/* Nhờ chị dâu */
"tt_mat_6:x2:2":{hp:"dad"},/* Nhờ cha chuộc lại bản ước */
"tt_mat_9:s1:2":{hp:"th"},/* Nhờ Thái hậu sắp chỗ */
"tt_mat_9:s3:2":{hp:"th"},/* Nhờ Thái hậu sắp chỗ */
"tt_mat_11:t1:1":{hp:"dad"},/* Nhờ cha xin nhà Trung cung cũ xóa điều khoản */
/* ---------- dtq · Con gái Đại tướng quân (46) ---------- */
"dtq_bien:c1:1":{hp:"th"},/* Nhờ Thái hậu nói giúp */
"dtq_bien:c2:2":{hp:"go"},/* Nhờ người dò nhà {v} vì sao nói vậy */
"dtq_binh:c2:0":{hp:"th"},/* Nhờ Thái hậu nói đỡ */
"dtq_huynh:s2:1":{hp:"off"},/* Nhờ Lễ bộ dò ý sứ */
"dtq_huynh:c2:1":{hp:"dad"},/* Nhờ cha dâng kế */
"dtq_bien_6:c1:0":{hp:"fam"},/* Nhờ gia đinh nhà bắt kẻ bám theo */
"dtq_bien_6:c2:2":{hp:"v"},/* Tặng quà, nhờ {v} đừng tò mò */
"dtq_bien_8:t1:1":{hp:"bro"},/* Nhờ huynh trưởng đưa hắn đến Hình bộ */
"dtq_bien_8:x1:1":{hp:"th"},/* Nhờ Thái hậu nói một lời */
"dtq_bien_9:c3:0":{hp:"eun"},/* Biếu lễ, nhờ ông đặt thư lên án lúc khuya */
"dtq_bien_9:t1:1":{hp:"hh"},/* Nhờ Hoàng hậu chuyển lời */
"dtq_bien_11:s2:2":{hp:"go"},/* Nhờ người dò ba tờ sớ */
"dtq_vu_5:s2:0":{hp:"go"},/* Nhờ người chép lại bức thư giả */
"dtq_vu_5:c1:2":{hp:"bro"},/* Nhờ huynh trưởng báo Hình bộ truy nã hắn */
"dtq_vu_5:c2:0":{hp:"bro"},/* Nhờ huynh trưởng xin học sĩ già đối chiếu nét chữ */
"dtq_vu_5:x1:0":{hp:"bro"},/* Nhờ huynh trưởng nộp mẫu chữ của ký thất */
"dtq_vu_6:s1:1":{hp:"bro"},/* Nhờ huynh trưởng báo Hình bộ bắt ký thất */
"dtq_vu_6:s2:1":{hp:"maid"},/* Nhờ {maid} hỏi người nhà bếp các phủ */
"dtq_vu_6:t1:1":{hp:"fam"},/* Nhờ gia đinh nhà canh chùa, chờ */
"dtq_vu_6:x1:0":{hp:"bro"},/* Nhờ huynh trưởng đưa thẳng vào Hình bộ */
"dtq_vu_7:x1:1":{hp:"th"},/* Nhờ Thái hậu nói giúp */
"dtq_vu_9:c2:1":{hp:"off"},/* Nhờ Ngự sử xin Đại Lý tự khanh hồi tị */
"dtq_vu_9:c3:1":{hp:"eun"},/* Biếu Tổng quản, nhờ ông kể lại */
"dtq_vu_9:t1:0":{hp:"mom"},/* Nhờ mẹ niêm bằng gia ấn */
"dtq_vu_9:t1:1":{hp:"th"},/* Nhờ Thái hậu giữ tráp đến ngày xử */
"dtq_vu_10:s1:1":{hp:"bro"},/* Nhờ huynh trưởng hỏi Hàn lâm học sĩ về giấy mực */
"dtq_vu_10:t1:2":{hp:"bro"},/* Nhờ huynh trưởng báo Đại Lý tự đi tìm */
"dtq_binh_5:s2:1":{hp:"dad"},/* Gửi bạc nhờ cha giữ yên doanh trại */
"dtq_binh_5:c1:2":{hp:"hh"},/* Nhờ Hoàng hậu gác lời ấy */
"dtq_binh_5:t1:0":{hp:"eun"},/* Nhờ {eun} mang thư khuyên ông trao thẳng cho vua */
"dtq_binh_6:c1:0":{hp:"off"},/* Nhờ người trong Hàn lâm viện viết sớ biện */
"dtq_binh_7:t1:1":{hp:"eun"},/* Nhờ {eun} nhắn cha: uống ít, tạ ơn nhiều */
"dtq_binh_8:s2:0":{hp:"dad"},/* Nhờ cha xin Binh bộ đếm quân trước triều */
"dtq_binh_8:s2:1":{hp:"dad"},/* Nhờ cha dâng biểu tạ tội trước */
"dtq_binh_8:t1:1":{hp:"fam"},/* Nhờ nhà mời một Ngự sử trung lập về xem */
"dtq_binh_10:t1:0":{hp:"eun"},/* Nhờ {eun} đưa cha một dòng chữ */
"dtq_binh_11:s2:1":{hp:"mom"},/* Nhờ mẹ dâng sổ tên lính cũ làm chứng */
"dtq_huynh_5:c1:1":{hp:"eun"},/* Gửi trang sức nhờ {eun} bán */
"dtq_huynh_5:t1:1":{hp:"dad"},/* Nhờ cha xin Lễ bộ cho sứ triều đi cùng */
"dtq_huynh_5:x1:2":{hp:"dad"},/* Nhờ cha nộp hết bạc vào Hộ bộ, xin triều lo */
"dtq_huynh_6:s1:0":{hp:"man"},/* Nhờ {man} dò xem chuyện riêng là gì */
"dtq_huynh_7:s2:0":{hp:"dad"},/* Nhờ cha mời người Hàn lâm viện viết sớ biện */
"dtq_huynh_7:x1:0":{hp:"eun"},/* Nhờ {eun} dâng ngài danh sách trăm thân binh */
"dtq_huynh_8:s1:1":{hp:"dad"},/* Nhờ cha đòi giặc theo hòa ước, qua Lễ bộ */
"dtq_huynh_9:s2:0":{hp:"dad"},/* Nhờ cha xin Binh bộ cho huynh tự trình */
"dtq_huynh_10:c2:1":{hp:"dad"},/* Nhờ cha báo Đại Lý tự có kẻ dọa */
/* ---------- muoi · Nhà buôn muối (23) ---------- */
"muoi_tuoc_5:s1:2":{hp:"th"},/* Nhờ Thái hậu nhắc một lời */
"muoi_tuoc_5:s2:2":{hp:"eun"},/* Nhờ {eun} dò người */
"muoi_tuoc_5:x1:1":{hp:"bro"},/* Nhờ huynh trưởng nộp sổ nghĩa quyên */
"muoi_tuoc_6:s1:2":{hp:"hh"},/* Nhờ Hoàng hậu hỏi về tờ sớ */
"muoi_tuoc_8:x1:0":{hp:"dad"},/* Nhờ cha mời Ngự sử đến tận làng */
"muoi_lau_5:s1:1":{hp:"bro"},/* Nhờ huynh trưởng thuê người chép sổ */
"muoi_lau_5:s2:0":{hp:"off"},/* Nhờ thầy kiện xin sao sổ */
"muoi_lau_5:s2:1":{hp:"bro"},/* Nhờ huynh trưởng cải trang vào kho */
"muoi_lau_5:t1:0":{hp:"fam"},/* Nhờ người nhà cứu trang sổ ấy */
"muoi_lau_5:t1:1":{hp:"dad"},/* Nhờ cha báo Tuần diêm Ngự sử niêm phong */
"muoi_lau_6:s1:0":{hp:"dad"},/* Nhờ cha nộp sổ lên Hình bộ */
"muoi_lau_7:s1:0":{hp:"dad"},/* Nhờ cha đưa hai tờ cho Tuần diêm Ngự sử */
"muoi_lau_7:t1:1":{hp:"hh"},/* Nhờ Hoàng hậu tâu xin kiểm kho */
"muoi_lau_9:x1:1":{hp:"off"},/* Nhờ Ngự sử xin cho lão khai kín */
"muoi_lau_10:s1:2":{hp:"bro"},/* Nhờ huynh trưởng gặp thay, ghi lại */
"muoi_lau_10:x1:1":{hp:"off"},/* Nhờ thầy kiện xin xử riêng tội nợ thuế */
"muoi_lau_11:t1:1":{hp:"dad"},/* Nhờ cha giao cho Tuần diêm Ngự sử */
"muoi_doi_6:s1:2":{hp:"bro"},/* Nhờ huynh trưởng hỏi quê từng người */
"muoi_doi_6:c2:1":{hp:"bro"},/* Nhờ huynh trưởng trả gấp đôi để dân nói thật */
"muoi_doi_9:s1:0":{hp:"bro"},/* Nhờ huynh trưởng về huyện đếm lại */
"muoi_no_5:c1:2":{hp:"dad"},/* Nhờ cha báo quan bắt lão trộm sổ */
"muoi_no_5:t1:1":{hp:"emp"},/* Nhờ Hoàng thượng hỏi Nội vụ phủ */
"muoi_no_7:c2:1":{hp:"eun"},/* Nhờ {eun} làm chứng kẻ mua bí mật */
/* ---------- cn · Cung nữ được sủng hạnh (20) ---------- */
"cn_tinh:s2:0":{hp:"go"},/* Nhờ người hỏi lấy lại thư */
"cn_than:s2:0":{hp:"off"},/* Đem ngọc nhờ thợ cung xem */
"cn_than:c1:0":{hp:"go"},/* Nhờ người chép hồ sơ */
"cn_chu_8:c1:2":{hp:"off"},/* Nhờ đồng liêu cũ kể chuyện thật */
"cn_tinh_5:s1:1":{hp:"off"},/* Bỏ bạc nhờ đội trưởng canh phòng hắn */
"cn_tinh_5:c1:1":{hp:"eun"},/* Nhờ {eun} kiểm trại, mượn cớ khác */
"cn_tinh_6:c2:0":{hp:"srv"},/* Nhờ cung nữ ấy lấy trộm */
"cn_tinh_6:c2:1":{hp:"srv"},/* Chỉ nhờ xem thư thật hay giả */
"cn_tinh_7:c2:1":{hp:"eun"},/* Nhờ {eun} cho bà gặp con */
"cn_tinh_10:s2:1":{hp:"hh"},/* Nhờ Hoàng hậu cho hỏi đúng phép */
"cn_tinh_11:s2:1":{hp:"th"},/* Nhờ Thái hậu nói một lời */
"cn_ban_5:s2:1":{hp:"eun"},/* Nhờ {eun} đổi chưởng sự */
"cn_ban_6:c3:0":{hp:"doc"},/* Nhờ thái y quen chép dòng ấy */
"cn_ban_7:s2:0":{hp:"srv"},/* Nhờ ma ma cũ ở Nội vụ phủ */
"cn_ban_7:c2:1":{hp:"go"},/* Nhờ hắn chỉ mặt kẻ đem trâm */
"cn_ban_10:s2:1":{hp:"off"},/* Nhờ Ngự sử nói ngoài triều */
"cn_than_6:c3:0":{hp:"off"},/* Nhờ người trong Hộ bộ đối chiếu */
"cn_than_7:c3:1":{hp:"doc"},/* Chép phương, nhờ thái y kê */
"cn_than_9:c1:1":{hp:"fam"},/* Nhờ lão quản gia làm chứng thay */
"cn_than_10:s2:0":{hp:"off"},/* Nhờ lão Ngự sử đồng khoa thúc */
/* ---------- nc · Công chúa hòa thân (8) ---------- */
"nc_gian_7:c2:2":{hp:"go"},/* Nhờ người nói xấu nhà {v} một câu */
"nc_gian_9:s2:0":{hp:"go"},/* Nhờ người hỏi xem ai thẩm án */
"nc_gian_9:t1:2":{hp:"off"},/* Nhờ sứ thần {land} lo */
"nc_su_6:c1:0":{hp:"off"},/* Nhờ {pa} giữ y lại hỏi */
"nc_tuc_8:s2:1":{hp:"off"},/* Nhờ sứ quán cố hương lên tiếng */
"nc_vuong_5:c2:1":{hp:"emp"},/* Nhờ Hoàng thượng hỏi đến */
"nc_vuong_6:s2:2":{hp:"off"},/* Nhờ phu nhân Thượng thư Lễ bộ chuyển lời */
"nc_vuong_9:c1:1":{hp:"off"},/* Nhờ phu nhân Thượng thư Lễ bộ chuyển lời */
/* ---------- bd · Hòa thân · Bắc Địch (10) ---------- */
"bd_hoa_6:c1:0":{hp:"off"},/* Nhờ {pa} giữ y lại hỏi */
"bd_ngua_7:c2:2":{hp:"go"},/* Nhờ người nói xấu nhà {v} một câu */
"bd_ngua_9:s2:0":{hp:"go"},/* Nhờ người hỏi xem ai thẩm án */
"bd_ngua_9:t1:2":{hp:"off"},/* Nhờ sứ thần {land} lo */
"bd_tuc_8:s2:1":{hp:"off"},/* Nhờ sứ quán cố hương lên tiếng */
"bd_hoang_5:c2:1":{hp:"emp"},/* Nhờ Hoàng thượng hỏi đến */
"bd_hoang_6:s2:2":{hp:"off"},/* Nhờ phu nhân Thượng thư Lễ bộ chuyển lời */
"bd_hoang_9:c1:1":{hp:"off"},/* Nhờ phu nhân Thượng thư Lễ bộ chuyển lời */
"bd_hoa:s1:1":{hp:"off"},/* Nhờ sứ đoàn nhắn: ta vẫn bình an */
"bd_ngua:s1:1":{hp:"off"},/* Giữ cả đàn, nhờ Thái bộc nuôi */
/* ---------- td · Con gái tội thần (37) ---------- */
"td_an:s1:0":{hp:"off"},/* Bỏ bạc nhờ ông chép lại */
"td_an:c2:1":{hp:"go"},/* Nhờ người trong cung {foe} lục tìm */
"td_song:c1:0":{hp:"go"},/* Nhờ người xin cho em làm hỏa đầu quân */
"td_an_5:s3:2":{hp:"th"},/* Nhờ Thái hậu hỏi giúp một lời */
"td_an_5:c1:1":{hp:"eun"},/* Nhờ {eun} sai hắn */
"td_an_5:t1:1":{hp:"go"},/* Nhờ người đối chiếu với ấn thật ở Binh bộ */
"td_an_8:s2:1":{hp:"fam"},/* Nhờ người quen xếp sổ ấy lên xe gần lối đi */
"td_an_8:c1:1":{hp:"off"},/* Nhờ Ngự sử xin Binh bộ sao y có đóng dấu */
"td_an_8:c2:2":{hp:"off"},/* Nhờ Ngự sử dâng thay */
"td_an_8:x1:1":{hp:"off"},/* Nhờ người đủ cao xin giữ sổ */
"td_an_10:s2:0":{hp:"off"},/* Nhận lời xét, nhờ Ngự sử nộp hết chứng cứ */
"td_an_10:c1:0":{hp:"fam"},/* Nhờ lão quản gia nộp thêm lời khai của thư lại */
"td_an_10:c1:1":{hp:"off"},/* Nhờ Ngự sử xin mời sư chùa Giang Nam làm chứng tờ cung khai */
"td_an_10:c2:0":{hp:"off"},/* Nhờ Ngự sử xin đối chiếu sổ xuất ấn Binh bộ */
"td_an_10:c2:1":{hp:"off"},/* Nhờ Ngự sử xin gọi thợ khắc ấn ra đối chất */
"td_an_10:c3:0":{hp:"off"},/* Nhờ Ngự sử nộp bản sớ gốc có son phê */
"td_an_10:c3:1":{hp:"off"},/* Nhờ Ngự sử xin gọi thợ khắc ấn lên công đường */
"td_an_10:t1:1":{hp:"off"},/* Nhờ Ngự sử già nhắc khéo quan Đại Lý tự */
"td_ke_5:s2:2":{hp:"off"},/* Nhờ Ngự sử năm xưa dò tiếp */
"td_ke_5:c2:0":{hp:"eun"},/* Nhờ {eun} tra sổ Nội vụ phủ */
"td_ke_5:t1:1":{hp:"go"},/* Nhờ người đối chiếu triện */
"td_ke_8:s2:1":{hp:"off"},/* Nhờ Ngự sử năm xưa nối dây */
"td_ke_8:c3:2":{hp:"off"},/* Nhờ ông dò trong Ngự sử đài */
"td_ke_9:s2:0":{hp:"eun"},/* Nhờ {eun} giúp một tay */
"td_ke_10:s2:1":{hp:"th"},/* Nhờ Thái hậu nói giúp */
"td_song_5:s2:0":{hp:"off"},/* Nhờ lái buôn đưa em đổi doanh */
"td_song_5:t1:1":{hp:"off"},/* Nhờ phó tướng giữ em bên mình */
"td_song_6:c3:1":{hp:"off"},/* Nhờ trạm dịch quân đưa thư */
"td_song_8:s1:2":{hp:"off"},/* Nhờ phó tướng đưa em về hậu doanh */
"td_song_8:c2:2":{hp:"off"},/* Nhờ đoàn quân lương */
"td_song_8:t1:2":{hp:"off"},/* Nhờ phó tướng xin rút đội em */
"td_song_9:c3:1":{hp:"off"},/* Nhờ lão quan bộ Lễ dâng sớ trước */
"td_tha_6:t1:2":{hp:"foe"},/* Nhờ {foe} nói với họ hàng */
"td_tha_7:x1:1":{hp:"go"},/* Tự chép lời nàng, nhờ người làm chứng */
"td_tha_11:s1:1":{hp:"fam"},/* Nhờ người thế giao đứng tên dâng thay */
"td_tha_11:s2:1":{hp:"off"},/* Nhờ lão Ngự sử môn sinh cũ của cha nói thay */
"td_tha_11:c2:2":{hp:"fam"},/* Nhờ người thế giao đứng đơn xin trả ruộng hương hỏa */
/* ---------- ch · Cháu gái Thái hậu (12) ---------- */
"ch_benh:c1:0":{hp:"doc"},/* Lén đổi thuốc, nhờ lương y xem */
"ch_benh_8:c1:0":{hp:"emp"},/* Nhờ Hoàng thượng nhớ lại ngươi bằng một món quà */
"ch_benh_9:c1:1":{hp:"eun"},/* Nhờ Tổng quản thái giám */
"ch_ho_5:s2:2":{hp:"srv"},/* Nhờ ma ma Đức Thọ cung khuyên nàng */
"ch_ho_6:c1:1":{hp:"fam"},/* Nhờ nhà ngoại gửi người làm bánh vào */
"ch_ho_8:s2:2":{hp:"th"},/* Nhờ Thái hậu viết một dòng */
"ch_ho_8:c1:2":{hp:"v"},/* Nhờ {v} cùng nói */
"ch_ho_9:s2:2":{hp:"fam"},/* Nhờ người nhà báo tin cho Ngự sử về đất phong */
"ch_bi_5:c1:2":{hp:"eun"},/* Nhờ Tổng quản đổi người giữ cửa */
"ch_bi_5:t1:0":{hp:"fam"},/* Nhờ nhà ngoại đối chiếu nét chữ với sổ Hàn lâm */
"ch_bi_8:c1:1":{hp:"eun"},/* Nhờ Tổng quản cấm hộp ra cổng ba ngày */
"ch_bi_10:s2:0":{hp:"fam"},/* Nhờ nhà ngoại cho người canh cửa Ngự sử đài */
/* ---------- thd · Con gái thầy đồ (23) ---------- */
"thd_tho:c1:1":{hp:"n1"},/* Nhờ {n1} minh oan */
"thd_tro:c2:1":{hp:"off"},/* Nhờ học sĩ Hàn lâm */
"thd_tho_5:c1:1":{hp:"n1"},/* Nhờ {n1} tiến cử */
"thd_tho_5:x1:1":{hp:"n1"},/* Nhờ {n1} lặng lẽ xin đổi đề */
"thd_tho_6:t1:1":{hp:"n1"},/* Nhờ {n1} giữ hắn lại */
"thd_tho_7:t1:1":{hp:"go"},/* Ra hiệu nhờ y để mắt bài {v} */
"thd_tho_9:c1:1":{hp:"n1"},/* Nhờ {n1} xin công văn gọi sổ */
"thd_sach_6:c1:0":{hp:"off"},/* Nhờ Hàn lâm viện viết lời bình */
"thd_sach_7:s1:1":{hp:"go"},/* Nhờ người dò kẻ đốt */
"thd_sach_8:c1:2":{hp:"off"},/* Nhờ học trò của cha chép */
"thd_sach_9:c1:1":{hp:"off"},/* Nhờ học sĩ Hàn lâm giảng câu ấy */
"thd_sach_9:c3:2":{hp:"off"},/* Nhờ một Ngự sử xin cho chủ sự ấy hồi tị */
"thd_sach_11:s2:2":{hp:"off"},/* Nhờ sĩ lâm dâng sớ xin tha */
"thd_tro_5:s2:0":{hp:"n1"},/* Gửi bạc nhờ {n1} dò giúp */
"thd_tro_5:c1:1":{hp:"n1"},/* Nhờ {n1} báo Ngự sử đài */
"thd_tro_5:t1:1":{hp:"n1"},/* Nhờ {n1} so dấu son ở Hàn lâm viện */
"thd_tro_6:s1:2":{hp:"n1"},/* Nhờ {n1} hỏi đồng khoa của {n2} */
"thd_tro_6:s2:1":{hp:"dad"},/* Nhờ cha ghi lại lời ông */
"thd_tro_7:c1:2":{hp:"dad"},/* Nhờ cha đệ đơn xin Hình bộ nhận án sớm */
"thd_tro_7:t1:0":{hp:"go"},/* Nhờ hắn báo tin mỗi đêm */
"thd_tro_7:t1:2":{hp:"go"},/* Nhờ hắn đưa {n1} vào thành */
"thd_tro_10:s1:2":{hp:"dad"},/* Nhờ cha ở lại kèm hắn */
"thd_hoc_9:c1:1":{hp:"dad"},/* Nhờ {dad} viết thư giải nghĩa */
/* ---------- cnv · Cung nữ tuyển vào (18) ---------- */
"cnv_mat:t1:1":{hp:"go"},/* Nhờ người báo cho Hoàng thượng */
"cnv_ma:x1:1":{hp:"srv"},/* Nhờ ma ma nâng đỡ */
"cnv_chu_8:c2:1":{hp:"go"},/* Nhờ người nói đỡ */
"cnv_ban_5:c2:1":{hp:"go"},/* Nhờ người chép sổ tiệm */
"cnv_ban_11:s2:2":{hp:"mis"},/* Nhờ {mis} che chở nàng */
"cnv_mat_5:s1:1":{hp:"srv"},/* Nhờ tiểu thái giám truyền tin cho Hoàng thượng */
"cnv_mat_6:s2:3":{hp:"go"},/* Nhờ người dâng ngài một bình trà */
"cnv_mat_6:s2:4":{hp:"go"},/* Nhờ người dâng ngài một bình trà */
"cnv_mat_7:s2:0":{hp:"go"},/* Nhờ người dò ai giữ lại */
"cnv_mat_7:t1:2":{hp:"go"},/* Nhờ người thân cận ngài nhắc tên */
"cnv_mat_7:t1:3":{hp:"go"},/* Nhờ người thân cận ngài nhắc tên */
"cnv_mat_10:c1:1":{hp:"fam"},/* Nhờ người đồng hương làm chứng */
"cnv_mat_11:s2:3":{hp:"v"},/* Nhờ {v} nói giúp một câu */
"cnv_mat_11:s2:4":{hp:"v"},/* Nhờ {v} nói giúp một câu */
"cnv_ma_6:s2:1":{hp:"srv"},/* Nhờ tiểu thái giám giữ kho mở cửa */
"cnv_ma_6:c1:0":{hp:"go"},/* Nhờ người ngoài cung mua lại một tấm làm chứng */
"cnv_ma_8:c2:1":{hp:"srv"},/* Nhờ ma ma Càn Ninh cung nói giúp */
"cnv_ma_11:t1:2":{hp:"fam"},/* Chỉ nhờ ba người thân nhất */
});
Object.assign(RDHPL,{
 dad:{full:"Thư nhà về, nét chữ của cha vững vàng: việc ấy phủ lo trọn, dặn ngươi cứ yên lòng.",
  half:"Thư nhà về chỉ vài dòng: cha nói sẽ liệu, mà lời lẽ dè dặt như người không muốn dính vào.",
  no:"Thư nhà về: cha khuyên ngươi chớ nhúng tay vào chuyện ấy, phủ không tiện ra mặt lúc này.",
  sab:"Cha nhận lời, nhưng người trong phủ đem chuyện bàn ra ngoài; tin ấy đến tai {ri} trước khi việc kịp thành.",
  lk:"Cha kể chuyện ấy với khách khứa trong phủ như kể chuyện nhà; chẳng mấy chốc {ri} đã hay."},
 fam:{full:"Người nhà nhận việc ngay, đi lại suốt mấy hôm không quản khó nhọc.",
  half:"Người nhà ừ hữ cho qua, làm được nửa chừng thì bỏ dở.",
  no:"Người nhà thưa rằng việc ấy quá sức, không dám nhận, xin ngươi tìm đường khác.",
  sab:"Người nhà nhận lời rồi lén báo cho bên kia; {ri} biết rõ từng bước ngươi định đi.",
  lk:"Người nhà kể lể khắp xóm, chuyện ngươi nhờ chẳng còn là chuyện kín; {ri} cũng nghe được."},
 th:{full:"Thái hậu gật đầu: «Chuyện này để {xung} lo liệu, {goi} cứ an tâm.»",
  half:"Thái hậu lần tràng hạt, chậm rãi: «{Xung} sẽ để ý. Thành hay không, còn xem ý trời.»",
  no:"Thái hậu khép mắt: «{Xung} già rồi, chuyện ấy {goi} tự liệu lấy.»",
  sab:"Thái hậu nhận lời, rồi đem chuyện ấy bàn với người ngoài Đức Thọ cung; lời đến tai {ri}.",
  lk:"Trong bữa trà, Thái hậu buột miệng nhắc chuyện ngươi nhờ; cung nhân nghe được, truyền đến {ri}."},
 emp:{full:"Hoàng thượng cười nhẹ: «Việc nhỏ, {xung} sẽ hỏi đến.»",
  half:"Hoàng thượng gật đầu cho qua: «Để {xung} xem.» Rồi chính sự bộn bề, ngài chỉ nhớ được một nửa.",
  no:"Hoàng thượng chau mày: «Hậu cung chớ hỏi chuyện ngoài, {goi} lui đi.»",
  sab:"Hoàng thượng đem lời ngươi hỏi lại người bên cạnh; chuyện lọt ra, {ri} biết trước.",
  lk:"Hoàng thượng nhắc chuyện ấy giữa tiệc như chuyện vui; cả bàn đều nghe, {ri} cũng nghe."},
 hh:{full:"Hoàng hậu đặt chén trà xuống: «{Xung} cai quản lục cung, chuyện này {xung} làm chủ cho {goi}.»",
  half:"Hoàng hậu mỉm cười: «{Xung} biết rồi.» Rồi việc ấy cứ nằm yên trên án ở Khôn Ninh cung.",
  no:"Hoàng hậu nói khẽ: «Hậu cung có phép tắc, {xung} không thể vì {goi} mà phá lệ.»",
  sab:"Hoàng hậu nhận lời trước mặt mọi người, sau lưng lại sai người báo cho {ri}.",
  lk:"Hoàng hậu đem chuyện ngươi nhờ ra nói trong buổi thỉnh an, ai nấy đều nghe; {ri} cũng biết."},
 eun:{full:"{hn} khom lưng: «{Xung} xin lo trọn, {goi} cứ yên tâm.»",
  half:"{hn} nhận lễ, chép miệng: «{Xung} sẽ cố.» Việc được làm qua quýt cho phải phép.",
  no:"{hn} xua tay: «Việc ấy trái phép cung, {xung} không dám.»",
  sab:"{hn} nhận lễ của ngươi, rồi lại nhận thêm một phần từ {ri}; việc của ngươi hỏng ngay từ cửa.",
  lk:"{hn} kể chuyện ấy với đám thái giám dưới tay; chỉ một đêm, {ri} đã biết."},
 srv:{full:"Kẻ hầu ấy nhận lời, lặng lẽ làm đến nơi đến chốn.",
  half:"Kẻ hầu ấy làm cho có, gặp khó là thôi.",
  no:"Kẻ hầu ấy quỳ xuống thưa phải bẩm chủ tử trước, không dám tự ý.",
  sab:"Kẻ hầu ấy nhận bạc của ngươi rồi đem chuyện bẩm lên; {ri} biết cả.",
  lk:"Kẻ hầu ấy kể với đồng liêu ngoài hành lang; tin lan đến tai {ri}."},
 maid:{full:"{hn}: «{Xung} xin dốc lòng, {goi} cứ yên tâm.»",
  half:"{hn} cúi đầu: «{Xung} sẽ thử.» Mà giọng nàng ta không mấy chắc.",
  no:"{hn} quỳ xuống: «{Xung} sợ làm hỏng việc của {goi}, xin {goi} nghĩ lại.»",
  sab:"{hn} vâng dạ rồi lén đem chuyện bán cho người của {ri}.",
  lk:"{hn} lỡ miệng với cung nữ cung khác; chuyện đến tai {ri}."},
 doc:{full:"Thái y chắp tay: «{Xung} xin giữ kín, {goi} cứ an lòng.»",
  half:"Thái y ngập ngừng: «{Xung} chỉ dám làm đến đó.» Việc thành chừng một nửa.",
  no:"Thái y lắc đầu: «Mạch án phải ghi sổ, {xung} không dám trái phép.»",
  sab:"Thái y nhận lời, rồi chép hết vào mạch án; sổ ấy đến tay {ri}.",
  lk:"Thái y kể với đồng liêu ở Thái y viện; tin ấy đến tai {ri}."},
 off:{full:"Vị quan ấy nhận lời: «{Xung} sẽ làm cho đến nơi.»",
  half:"Vị quan ấy hứa suông: «{Xung} sẽ liệu.» Rồi chỉ làm lấy lệ.",
  no:"Vị quan ấy từ chối: «Việc này phải theo phép triều đình, {xung} không dám.»",
  sab:"Vị quan ấy nhận lời rồi đem chuyện dâng lên người phe {ri}; việc của ngươi đổ vỡ.",
  lk:"Vị quan ấy nhắc chuyện ấy giữa triều như chuyện lạ; {ri} nghe được."},
 rv:{full:"{hn}: «Chuyện của {goi} cũng là chuyện của {xung}, cứ yên tâm.»",
  half:"{hn}: «{Xung} sẽ thử. Còn thành hay không, phải xem ý trời.»",
  no:"{hn}: «Không phải {xung} không muốn, chỉ là việc này {xung} không tiện nhúng tay.»",
  sab:"{hn}: «{Goi} yên tâm.» Nhưng nàng ta đem chuyện kể lại với {ri}, việc của ngươi hỏng từ gốc.",
  lk:"{hn} buột miệng kể chuyện ấy trong buổi thỉnh an; {ri} nghe được."},
 man:{full:"{hn}: «{Xung} xin tận lực, {goi} chớ lo.»",
  half:"{hn}: «{Xung} sẽ hỏi thử.» Rồi chỉ hỏi được dăm câu.",
  no:"{hn}: «Chuyện ấy {xung} không dám dò, xin {goi} thứ lỗi.»",
  sab:"{hn} nhận lời, rồi đem chuyện kể với người của {ri} để lấy lòng bên ấy.",
  lk:"{hn} kể chuyện ấy với đồng bạn lúc đổi ca; tin đến tai {ri}."},
 n1:{full:"{hn} nhận lời ngay, nói ơn xưa còn chưa trả hết.",
  half:"{hn} nhận lời mà lòng còn ngại, việc chỉ làm được phân nửa.",
  no:"{hn} viết thư từ chối, nói thân phận nhỏ mọn, không dám nhúng tay.",
  sab:"{hn} nhận lời, rồi đem chuyện bán cho {ri} để cầu đường thăng tiến.",
  lk:"{hn} kể chuyện ấy trong buổi bình văn; {ri} nghe được."},
 go:{full:"Người được nhờ làm việc kín kẽ, không để lộ dấu.",
  half:"Người được nhờ nhận lễ rồi làm cho có.",
  no:"Người được nhờ lắc đầu, trả lại lễ, không dám nhận việc.",
  sab:"Người được nhờ nhận bạc của ngươi, lại bán tin cho {ri}.",
  lk:"Người được nhờ nói lại với kẻ khác; tin đến tai {ri}."},
 foe:{full:"Lần này {hn} nể mặt, chịu nói giúp với họ hàng.",
  half:"{hn} nói qua loa vài câu cho xong chuyện.",
  no:"{hn} cười nhạt, không nhận lời.",
  sab:"{hn} nhận lời rồi nói ngược, họ hàng càng thêm ghét ngươi.",
  lk:"{hn} đem chuyện ngươi nhờ ra làm trò cười trước họ hàng."}});
