/* ================= jorigins: XUẤT THÂN NGOẠI QUỐC (D18, review/origins; branch form review/origin-bd-branch) =================
   - bd = "Công chúa Bắc Địch hòa thân": the second COUNTRY BRANCH of the one hòa thân origin (nc; Nam Chiếu is the first). Harder than Nam Chiếu
     (rank Quý nhân, Thái hậu ưa -20, no silver cushion), own story road (QUEST67.bd + 4 arcs), own family letter (j72 fam_bd), branch share of the
     hòa thân roll in BAL.orig.br (j69), home money in BAL.home (jecon).
   - ORIGIN_LORE: for EVERY origin a short backstory + how the court treats her; shown under the identity card text (kpIdentity), no new UI part:
     the same .kpidt text slot the card already uses.
   Pictures: img/origin-wide-bd.webp (16:9) and img/bg-origin-bd.webp (3:4), CDN. Missing kit part: emblem img/kit/origin-bd.webp (KIT REQUEST). */
/* Bắc Địch is a COUNTRY BRANCH of the hòa thân origin nc (owner OD:L1213–L1216; j1 ORIGIN_BR), never a 10th origin: no roulette card of its own */
ORIGIN_BR.bd={par:"nc",k:"bd",land:"Bắc Địch",n:"Công chúa Bắc Địch hòa thân",r:2,o:BAL.orig.bd.o,hh:0,th:BAL.orig.bd.th,art:{vu:1},t:"Con gái Khả hãn Bắc Địch, gả sang làm tin cho hòa ước mười năm."};

/* v1 story slot (every origin needs one: the chapter line j67 lives in QUEST67/ARC67 below) */
STORY.bd={t:"Hòa thân Bắc Địch",n:3,goal:"Ngươi là tờ hòa ước còn sống. Giữ cho hai nước yên, và giữ cho mình khỏi bị coi là con tin.",
 init(){S.st.m=0},hint:()=>"Theo từng chương của Mệnh truyện",month(){return""}};
/* the 14-chapter frame wraps this slot by itself (j67 regEach over STORY, jreg sweep at the script end): no hand call here */

QUEST67.bd={t:"Tờ hòa ước còn sống",e:[["Công chúa của hai nước",BAL.orig.quest[0],"Bắc Địch và Đại Hy đều gọi tên ngươi khi nhắc đến hòa bình."],["Con tin được tha thứ",BAL.orig.quest[1],"Ngươi đứng được ở Đại Hy, dù chẳng ai quên ngươi từ đâu đến."],["Mãi là con tin",BAL.orig.quest[2],"Hai bên đều coi ngươi là quân cờ; ngươi chỉ còn dựa vào chính mình."]]};
Object.assign(RTHEME67,{bd_hoa:"emp",bd_ngua:"emp",bd_tuc:"court",bd_hoang:"emp"});

ARC67.bd_hoa=arcFx("bd_hoa",{o:"bd",t:"Hòa ước mười năm",w:"emp",sj:"hòa ước Bắc Địch",g:"Mười năm yên biên ải được đổi bằng một cô gái. Nếu ngươi sai một bước, quân Bắc Địch lại xuống phía nam.",
 p:[["s1","s2"],["c1","c2","G.rumor","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Sứ đoàn hộ tống về",w:"emp",t:"Sứ đoàn Bắc Địch chờ ngoài cổng thành, hỏi: công chúa có được đối đãi đúng lễ hòa ước không.",o:[
  {n:"Mời sứ đoàn vào yết kiến Hoàng thượng",c:BAL.orig.hoa.s1a.c,w:BAL.orig.hoa.s1a.w,wx:"sứ đoàn yên lòng",f:"open",rt:"Hoàng thượng ban yến, sứ đoàn nâng chén."},
  {n:"Nhờ sứ đoàn nhắn: ta vẫn bình an",w:BAL.orig.hoa.s1b.w,f:"quiet",wx:"phụ hãn bớt nghi",l:BAL.orig.hoa.s1b.l,lx:"triều thần ngờ ngươi thông tin",rt:"Lời nhắn đi và về trong ba tuần.",rf:"Người của Lễ bộ chặn lời nhắn, hỏi ngươi nói gì."}]},
 s2:{h:"Đêm tân hôn lạnh",w:"me",t:"Đêm đầu trong cung, cung nữ nhìn ngươi như nhìn một con thú lạ giữa lồng.",o:[
  {n:"Tự tay nấu trà sữa ngựa quê nhà mời các cung nữ",c:BAL.orig.hoa.s2a.c,w:BAL.orig.hoa.s2a.w,wx:"cung nữ bớt sợ",rt:"Cung nữ nếm thử, khẽ cười.",rf:"Cung nữ nhăn mặt, không dám nói."},
  {n:"Giữ phép tắc Đại Hy, không nhắc quê nhà",w:BAL.orig.hoa.s2b.w,f:"bend",wx:"yên chuyện",lx:"nhớ thảo nguyên",rt:"Ngươi ngồi thẳng đến sáng."}]},
 c1:{h:"Quân Bắc Địch vượt ải",w:"emp",t:"Tin cấp báo: một toán quân Bắc Địch đánh cướp hai thôn gần ải. Triều thần nhìn ngươi.",o:[
  {n:"Viết thư xin phụ hãn trừng trị toán cướp",c:BAL.orig.hoa.c1a.c,w:BAL.orig.hoa.c1a.w,f:"keep",wx:"biên ải yên",l:BAL.orig.hoa.c1a.l,lx:"bị nghi thông đồng",rt:"Phụ hãn gửi đầu mục toán cướp đến cửa ải.",rf:"Thư đến muộn, ba thôn nữa cháy."},
  {n:"Xin Hoàng thượng đừng động binh",c:BAL.orig.hoa.c1b.c,w:BAL.orig.hoa.c1b.w,wx:"hoãn được binh đao",l:BAL.orig.hoa.c1b.l,rt:"Hoàng thượng hoãn binh thêm một tháng.",rf:"Hoàng thượng đáp: “Ngươi đang bênh người nhà.”"}]},
 c2:{h:"Con tin xin về thăm cha",w:"emp",t:"Phụ hãn ốm. Ngươi muốn xin về thăm, nhưng ai cũng biết một công chúa về là một lần hòa ước lung lay.",o:[
  {n:"Xin về, hẹn ngày trở lại",c:BAL.orig.hoa.c2a.c,w:BAL.orig.hoa.c2a.w,f:"keep",wx:"Hoàng thượng thấy ngươi thẳng thắn",l:BAL.orig.hoa.c2a.l,lx:"bị coi như muốn bỏ trốn",rt:"Hoàng thượng cho về, kèm một đội cấm quân.",rf:"Hoàng thượng im lặng, rồi lắc đầu."},
  {n:"Gửi thuốc và áo ấm về thay mình",c:BAL.orig.hoa.c2b.c,w:BAL.orig.hoa.c2b.w,f:"bend",wx:"tròn đạo hiếu mà không mạo hiểm",rt:"Thuốc đi cùng đoàn thương nhân."}]},
 t1:{h:"Hòa ước bị xé một nửa",w:"emp",t:"Đại Hy tăng thuế muối ở chợ biên, Bắc Địch dọa xé hòa ước. Cả hai bên cùng viết thư cho ngươi.",o:[
  {n:"Đề nghị giảm nửa thuế, đổi nửa ngựa",c:BAL.orig.hoa.t1a.c,wx:"hai bên lùi nửa bước",l:BAL.orig.hoa.t1a.l,rt:"Cả hai bên cùng lùi nửa bước.",rf:"Hai bên đều chê ngươi thiên vị."},
  {n:"Tâu thẳng với Hoàng thượng, xin chia lợi",c:BAL.orig.hoa.t1b.c,w:BAL.orig.hoa.t1b.w,f:"bend",wx:"được ghi công",rt:"Hoàng thượng nghe, gật đầu."}]},
 x1:{h:"Ngày ký hòa ước",w:"emp",t:"Sứ hai nước đã ngồi vào bàn. Hoàng thượng và Khả hãn đều chờ ngươi đọc lời thề, và lời thề ấy sẽ nói ngươi đứng về đâu.",o:[
  {n:"Đọc lời thề bằng cả hai thứ tiếng",c:BAL.orig.hoa.x1a.c,e:["win","lose"],rt:"Cả hai bên nghe ngươi đọc lời thề của chính họ.",rf:"Ngươi vấp một chữ; sứ đoàn Bắc Địch cau mày."},
  {n:"Đứng cạnh Hoàng thượng, để Lễ bộ đọc",c:BAL.orig.hoa.x1b.c,e:["win2","mid"],rt:"Hoàng thượng đặt tay lên vai ngươi trước mặt sứ hai nước.",rf:"Sứ Bắc Địch nhìn ngươi như nhìn một người đã đổi áo."},
  {n:"Dâng lễ vật quý, đứng sau",c:BAL.orig.hoa.x1c.c,w:BAL.orig.hoa.x1c.w,e:"mid",lx:"không ai nhớ ngươi đã đứng đó",rt:"Lễ vật lẫn trong trăm lễ."}]}},
 E:{win:{tag:"Người bảo đảm hòa ước",w:"emp",t:"Hòa ước mười năm ký xong, trong đó có tên ngươi làm người bảo đảm. Sứ hai nước sang, đều đến cung ngươi trước.",fx:BAL.orig.hoa.win},
  win2:{tag:"Hoàng thượng đứng bên ngươi",w:"emp",t:"Hoàng thượng công khai coi ngươi là người của Đại Hy; sứ Bắc Địch thôi dò xét.",fx:BAL.orig.hoa.win2},
  mid:{tag:"Hòa ước giữ được, ngươi vẫn là con tin",t:"Hòa ước còn đó, nhưng mọi người vẫn nhớ ngươi là tờ giấy ký tên.",fx:BAL.orig.hoa.mid},
  lose:{tag:"Hòa ước lung lay",w:"emp",t:"Lời thề của ngươi bị coi là qua loa. Sứ Bắc Địch bỏ ra về, triều thần nhìn ngươi lạnh nhạt.",fx:BAL.orig.hoa.lose}}});

ARC67.bd_ngua=arcFx("bd_ngua",{o:"bd",t:"Ngựa chiến phương Bắc",w:"emp",sj:"đàn ngựa của ngươi",g:"Ngươi lớn lên trên lưng ngựa. Trong cung này, đó là điều lạ lùng, có thể là tài hoặc là tội.",
 p:[["s1","s2"],["c1","c2","G.rumor","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Của hồi môn là ba trăm con ngựa",w:"emp",t:"Phụ hãn gửi theo ba trăm con ngựa làm của hồi môn. Quan Thái bộc chưa biết nên nuôi ở đâu.",o:[
  {n:"Dâng một nửa cho Hoàng thượng",c:BAL.orig.ngua.s1a.c,w:BAL.orig.ngua.s1a.w,f:"gift",wx:"Hoàng thượng vui lòng",rt:"Hoàng thượng thân chọn con ngựa trắng."},
  {n:"Giữ cả đàn, nhờ Thái bộc nuôi",c:BAL.orig.ngua.s1b.c,w:BAL.orig.ngua.s1b.w,f:"keep",wx:"có đàn ngựa riêng",l:BAL.orig.ngua.s1b.l,lx:"triều thần ngờ ngươi nuôi quân",rt:"Đàn ngựa gặm cỏ ở bãi sau ngự uyển.",rf:"Thái bộc tâu: bãi cỏ không đủ cho cả đàn."}]},
 s2:{h:"Con ngựa không ai cưỡi nổi",w:"emp",t:"Con ngựa ô của Hoàng thượng hất ngã ba người quản mã. Ngươi nhìn và thấy ngay nó đau chân.",o:[
  {n:"Tự tay chữa chân cho nó",c:BAL.orig.ngua.s2a.c,w:BAL.orig.ngua.s2a.w,f:"keep",wx:"ngài thấy ngươi có tài",l:BAL.orig.ngua.s2a.l,rt:"Con ngựa chịu để ngươi cầm cương.",rf:"Ngựa hất ngươi ngã giữa sân."},
  {n:"Chỉ cho quản mã cách chữa",w:BAL.orig.ngua.s2b.w,wx:"không ai bị thương",rt:"Quản mã làm theo, ngựa khỏi sau mười ngày."}]},
 c1:{h:"Đại hội săn thu",w:"emp",t:"Hoàng thượng mở cuộc săn thu. Ai cũng chờ xem công chúa Bắc Địch có dám lên ngựa không.",o:[
  {n:"Cưỡi ngựa theo ngự giá",c:BAL.orig.ngua.c1a.c,w:BAL.orig.ngua.c1a.w,f:"keep",wx:"cả đoàn săn kinh ngạc",l:BAL.orig.ngua.c1a.l,lx:"bị chê thất lễ",rt:"Ngươi đuổi kịp ngự giá, không một ai nói gì.",rf:"Mũ ngươi rơi, các phi tần cười khẽ."},
  {n:"Ngồi kiệu xem, khen ngợi người thắng",w:BAL.orig.ngua.c1b.w,f:"bend",wx:"giữ đúng lễ Đại Hy",lx:"nhớ gió thảo nguyên",rt:"Thái hậu gật gù từ xa."}]},
 c2:{h:"Quản mã tham ô cỏ",w:"emp",t:"Ngươi phát hiện quản mã bán bớt cỏ khô của ngựa ngự để bỏ túi.",o:[
  {n:"Tâu thẳng lên Hoàng thượng",w:BAL.orig.ngua.c2a.w,wx:"được ghi công",l:BAL.orig.ngua.c2a.l,lx:"quản mã ghi hận",rt:"Quản mã bị cách chức.",rf:"Quản mã khóc lóc, ngươi hóa thành kẻ hại người."},
  {n:"Âm thầm bắt hắn trả lại cỏ",c:BAL.orig.ngua.c2b.c,w:BAL.orig.ngua.c2b.w,f:"bend",wx:"có thêm tai mắt nơi chuồng ngựa",rt:"Quản mã từ đó nghe lời ngươi."}]},
 t1:{h:"Tin giặc từ phía bắc",w:"emp",t:"Biên ải cần chiến mã gấp. Cả triều biết trong cung có đàn ngựa Bắc Địch của ngươi.",o:[
  {n:"Dâng cả đàn ngựa còn lại",c:BAL.orig.ngua.t1a.c,wx:"được ghi công",l:BAL.orig.ngua.t1a.l,rt:"Đàn ngựa lên đường ra biên ải.",rf:"Ngựa quá thuần cho trận mạc, bị trả về."},
  {n:"Dâng một nửa, giữ nửa phòng thân",c:BAL.orig.ngua.t1b.c,w:BAL.orig.ngua.t1b.w,f:"bend",wx:"được coi là biết điều",rt:"Hoàng thượng chấp nhận."}]},
 x1:{h:"Trận ngựa trước ngự giá",w:"emp",t:"Sứ nhiều nước đến dự lễ mừng thọ. Hoàng thượng muốn thi mã; người ta đang chờ xem ngươi có dám ra sân.",o:[
  {n:"Tự mình ra sân, cưỡi ngựa Bắc Địch",c:BAL.orig.ngua.x1a.c,e:["win","lose"],rt:"Ngươi vượt cả cấm quân, cả sân vỗ tay.",rf:"Ngươi chậm một bước, nhiều người ngoảnh đi."},
  {n:"Dạy cấm quân cưỡi theo kiểu Bắc Địch",c:BAL.orig.ngua.x1b.c,e:["win2","mid"],rt:"Cấm quân thắng trận thi mã, ngài ban thưởng cho ngươi.",rf:"Cấm quân ngượng, thua đoàn sứ."},
  {n:"Ở lại chỗ ngồi, nâng chén chúc thọ",w:BAL.orig.ngua.x1c.w,e:"mid",lx:"không ai nhớ tài của ngươi",rt:"Ngươi ngồi yên đến cuối yến."}]}},
 E:{win:{tag:"Nữ kỵ của Hoàng thượng",w:"emp",t:"Hoàng thượng gọi ngươi là ‘nữ kỵ của trẫm’ ngay giữa đại lễ; cả triều thôi coi tài cưỡi ngựa là tội.",fx:BAL.orig.ngua.win},
  win2:{tag:"Thầy dạy ngựa của cấm quân",w:"emp",t:"Cấm quân học cách cưỡi của ngươi, trận thi mã thắng đoàn sứ. Ngươi được ban thưởng, mặc áo cưỡi ngựa vào cung.",fx:BAL.orig.ngua.win2},
  mid:{tag:"Ngựa được dùng, người chưa được nhớ",t:"Đàn ngựa có ích cho Đại Hy, nhưng chẳng ai nhớ chủ của chúng.",fx:BAL.orig.ngua.mid},
  lose:{tag:"Con ngựa hoang của hậu cung",w:"emp",t:"Người ta cười ngươi cưỡi ngựa như đàn ông. Đàn ngựa bị thu về Thượng tứ viện.",fx:BAL.orig.ngua.lose}}});

ARC67.bd_tuc=arcFx("bd_tuc",{o:"bd",t:"Phong tục thảo nguyên",w:"th",sj:"phong tục Bắc Địch của ngươi",g:"Thái hậu gọi ngươi là ‘người rợ’. Sữa ngựa, lều nỉ, tóc tết: mỗi thứ đều bị soi, và mỗi thứ đều là một dịp để tỏ mình.",
 p:[["s1","s2"],["c1","c2","G.rumor","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Lời chê lều nỉ",w:"th",need:["th"],t:"Ngươi dựng một chiếc lều nỉ nhỏ ở sân sau để thấy gần quê. Thái hậu cau mày: “Trong cung không có chỗ cho lều trại.”",o:[
  {n:"Dỡ lều, giữ lại tấm nỉ làm gối",c:BAL.orig.tuc.s1a.c,w:BAL.orig.tuc.s1a.w,f:"bend",wx:"Thái hậu hài lòng",lx:"mất một góc quê nhà",rt:"Thái hậu khẽ gật."},
  {n:"Mời Thái hậu vào ngồi thử",w:BAL.orig.tuc.s1b.w,f:"keep",wx:"Thái hậu thấy ấm và lạ",l:BAL.orig.tuc.s1b.l,rt:"Thái hậu ngồi xuống, nói: “Ấm hơn ta nghĩ.”",rf:"Thái hậu phẩy tay, sai người dỡ lều."}]},
 s2:{h:"Món sữa ngựa lên men",w:"maid",t:"Ngươi uống sữa ngựa lên men như ở quê. Mùi lan khắp hành lang, người khen kẻ chê.",o:[
  {n:"Dâng một bình lên Thái hậu",c:BAL.orig.tuc.s2a.c,w:BAL.orig.tuc.s2a.w,f:"keep",wx:"Thái hậu nếm thử",l:BAL.orig.tuc.s2a.l,rt:"Thái hậu nhấp một ngụm, không nói.",rf:"Thái hậu đặt chén xuống, nhăn mặt."},
  {n:"Thôi uống cho đỡ điều tiếng",w:BAL.orig.tuc.s2b.w,f:"bend",wx:"yên chuyện",lx:"nhớ nhà",rt:"Bình sữa cất vào hộc kín."}]},
 c1:{h:"Thái hậu đau đầu gối",w:"th",need:["th"],t:"Thái hậu đau đầu gối mỗi khi trở trời. Ngươi biết cách chườm mỡ cừu và cỏ thuốc của người thảo nguyên.",o:[
  {n:"Xin chườm thuốc quê nhà",c:BAL.orig.tuc.c1a.c,w:BAL.orig.tuc.c1a.w,f:"keep",wx:"Thái hậu đỡ đau",l:BAL.orig.tuc.c1a.l,lx:"thuốc không hợp",rt:"Thái hậu ngủ được một giấc ngon.",rf:"Thái hậu ngứa rát cả đêm."},
  {n:"Không dám, sợ mang họa",w:BAL.orig.tuc.c1b.w,wx:"không rủi ro",lx:"bỏ lỡ cơ duyên",rt:"Ngươi im lặng."}]},
 c2:{h:"Tết quê nhà",w:"maid",t:"Đến tiết Tết lớn của Bắc Địch. Ngươi muốn làm một lễ nhỏ hát và múa theo thảo nguyên.",o:[
  {n:"Mời các phi tần cùng múa",c:BAL.orig.tuc.c2a.c,w:BAL.orig.tuc.c2a.w,wx:"thêm người quen",l:BAL.orig.tuc.c2a.l,lx:"Thái hậu chê ồn",rt:"Cả hậu cung cười vui.",rf:"Thái hậu sai người dẹp."},
  {n:"Lặng lẽ thắp hương một mình hướng bắc",c:BAL.orig.tuc.c2b.c,w:BAL.orig.tuc.c2b.w,f:"bend",wx:"tròn lễ mà không ồn",rt:"Ngươi thắp hương hướng về phương Bắc."}]},
 t1:{h:"Thái hậu hỏi về tổ tiên",w:"th",need:["th"],t:"Thái hậu bỗng hỏi: “Người Bắc Địch thờ gì?” Bà muốn nghe, hay muốn bắt lỗi, ngươi không rõ.",o:[
  {n:"Kể truyện trời xanh và con sói tổ",wx:"Thái hậu tò mò",l:BAL.orig.tuc.t1a.l,rt:"Thái hậu nghe say mê.",rf:"Thái hậu bảo ngươi đừng nói những chuyện ấy."},
  {n:"Nói Bắc Địch cũng kính trời đất như Đại Hy",c:BAL.orig.tuc.t1b.c,w:BAL.orig.tuc.t1b.w,f:"bend",wx:"Thái hậu thấy ngươi biết điều",rt:"Thái hậu gật đầu."}]},
 x1:{h:"Yến mừng thọ Thái hậu",w:"th",t:"Đại thọ Thái hậu. Mỗi phi tần dâng một lễ. Lễ của ngươi sẽ nói ngươi là ai.",o:[
  {n:"Dâng bài ca thảo nguyên cầu thọ",c:BAL.orig.tuc.x1a.c,e:["win","lose"],rt:"Thái hậu đứng dậy vỗ tay, gọi ngươi là ‘con sơn ca của ai gia’.",rf:"Thái hậu cau mày, cả yến im bặt."},
  {n:"Dâng bức thêu chữ Thọ do chính tay làm",c:BAL.orig.tuc.x1b.c,e:["win2","mid"],rt:"Thái hậu khen ngươi nay đã là con dâu Đại Hy.",rf:"Thái hậu nhận lễ, không nói gì."},
  {n:"Dâng lễ vật quý, đứng sau",c:BAL.orig.tuc.x1c.c,w:BAL.orig.tuc.x1c.w,e:"mid",lx:"không ai nhớ lễ của ngươi",rt:"Lễ vật đặt lẫn trong trăm lễ."}]}},
 E:{win:{tag:"Sơn ca của Thái hậu",w:"th",t:"Thái hậu thương ngươi như con. Giữ được mình mà vẫn được chấp nhận: ngươi là người Bắc Địch đầu tiên làm được thế.",fx:BAL.orig.tuc.win},
  win2:{tag:"Con dâu Đại Hy",w:"th",t:"Thái hậu coi ngươi là người nhà. Ngươi đã thành người Đại Hy, dù lòng còn nhớ thảo nguyên.",fx:BAL.orig.tuc.win2},
  mid:{tag:"Được dung, chưa được thương",t:"Thái hậu thôi gọi ngươi là người rợ, nhưng cũng chưa gọi tên.",fx:BAL.orig.tuc.mid},
  lose:{tag:"Mãi là người rợ",t:"Thái hậu chán ghét ngươi hơn. Trong cung người ta gọi ngươi là ‘con sói cái phương Bắc’.",fx:BAL.orig.tuc.lose}}});

ARC67.bd_hoang=arcFx("bd_hoang",{o:"bd",t:"Ngai Khả hãn",w:"emp",sj:"cuộc tranh ngôi Bắc Địch",g:"Khả hãn băng hà. Hai huynh trưởng của ngươi tranh ngôi, và cả hai đều xin Đại Hy ủng hộ, bằng cách nhắm vào ngươi.",
 p:[["s1","s2"],["c1","c2","G.rumor","G.hh"],["t1"],["x1"]],
 B:{
 s1:{h:"Tin tang từ thảo nguyên",w:"emp",t:"Người đưa tin quỳ ngoài cung, mũ còn đẫm tuyết: Khả hãn đã băng hà, trong tay còn nắm chiếc vòng ngà của ngươi.",o:[
  {n:"Xin Hoàng thượng cho để tang ba ngày",c:BAL.orig.hoang.s1a.c,w:BAL.orig.hoang.s1a.w,f:"open",wx:"Hoàng thượng thương cảm",rt:"Hoàng thượng cho miễn lễ, đến tận cửa cung an ủi ngươi."},
  {n:"Nén đau, hỏi người đưa tin ai đang giữ trướng vàng",w:BAL.orig.hoang.s1b.w,f:"keep",wx:"biết rõ hai huynh trưởng",l:BAL.orig.hoang.s1b.l,lx:"bị coi là lạnh lùng",rt:"Người đưa tin kể hết chuyện hai huynh trưởng.",rf:"Người đưa tin sợ, không dám nói."}]},
 s2:{h:"Hai bức thư cùng một đêm",w:"me",t:"Hai bức thư của hai huynh trưởng đến cùng một đêm. Cả hai đều xin ngươi tâu với Hoàng thượng giúp mình.",o:[
  {n:"Giữ thư lại, chưa tâu",w:BAL.orig.hoang.s2a.w,f:"quiet",wx:"giữ được chủ động",lx:"phải im lặng thêm",rt:"Hai bức thư nằm dưới đáy hộp trang sức."},
  {n:"Đưa cả hai thư cho Hoàng thượng đọc",w:BAL.orig.hoang.s2b.w,f:"open",wx:"Hoàng thượng tin ngươi",l:BAL.orig.hoang.s2b.l,lx:"hai huynh trưởng đều oán",rt:"Hoàng thượng nói: “Ngươi thành thật hơn các huynh ngươi.”",rf:"Hoàng thượng hỏi: “Ngươi giữ bản sao nào?”"}]},
 c1:{h:"Sứ của huynh trưởng",w:"emp",t:"Sứ của trưởng huynh dâng ngọc quý, xin ngươi nói tốt với Hoàng thượng.",o:[
  {n:"Từ chối ngọc, nói thẳng điều đúng",w:BAL.orig.hoang.c1a.w,f:"keep",wx:"giữ được sạch sẽ",l:BAL.orig.hoang.c1a.l,rt:"Sứ ngạc nhiên rồi cúi chào.",rf:"Sứ mang ngọc đi, kể xấu ngươi khắp triều."},
  {n:"Nhận ngọc, hứa suông",c:BAL.orig.hoang.c1b.c,w:BAL.orig.hoang.c1b.w,f:"bend",wx:"có thêm bạc",lx:"mang nợ với trưởng huynh",rt:"Ngươi cất ngọc vào hòm."}]},
 c2:{h:"Thúc phụ gửi mật thư",w:"emp",t:"Thúc phụ của ngươi gửi mật thư: nếu ngươi giúp, người sẽ cho ngươi quyền cai quản một bộ lạc.",o:[
  {n:"Nộp thư cho Hoàng thượng",w:BAL.orig.hoang.c2a.w,wx:"được ghi công",l:BAL.orig.hoang.c2a.l,rt:"Hoàng thượng đọc thư, mỉm cười lạnh.",rf:"Hoàng thượng hỏi: “Sao đến giờ ngươi mới nộp?”"},
  {n:"Viết thư từ chối, giữ kín",c:BAL.orig.hoang.c2b.c,w:BAL.orig.hoang.c2b.w,f:"quiet",wx:"giữ được đường lui",rt:"Thư từ chối đi lúc nửa đêm."}]},
 t1:{h:"Phong thư của các trưởng lão",w:"emp",t:"Một phong thư đóng dấu của chín trưởng lão đến tay ngươi, giấu trong lớp lót hộp phấn.",o:[
  {n:"Mở thư, đọc cho Hoàng thượng nghe",c:BAL.orig.hoang.t1a.c,wx:"không bị nghi",l:BAL.orig.hoang.t1a.l,rt:"Hoàng thượng nghe đến cuối mới lên tiếng.",rf:"Hoàng thượng nghi: “Thư này đến bằng đường nào?”"},
  {n:"Giữ kín, chờ xem ai thắng",w:BAL.orig.hoang.t1b.w,f:"bend",wx:"không để lộ",rt:"Ngươi gấp thư lại."}]},
 x1:{h:"Phán xử ngôi Khả hãn",w:"emp",t:"Hoàng thượng triệu tập sứ hai bên. Ngài hỏi thẳng ngươi: ‘Ai nên ngồi trướng vàng?’ Lời ngươi sẽ nói ngươi là ai.",o:[
  {n:"Tâu: cả hai đều không, chín trưởng lão sẽ chọn",c:BAL.orig.hoang.x1a.c,e:["win","lose"],rt:"Hoàng thượng đứng dậy: “Nói đúng. Đại Hy sẽ ủng hộ trưởng lão.”",rf:"Hoàng thượng cau mày; cả hai sứ cùng quay đi."},
  {n:"Tâu: nên ủng hộ trưởng huynh, người mạnh hơn",c:BAL.orig.hoang.x1b.c,e:["win2","mid"],rt:"Hoàng thượng gật đầu, ban ấn cho trưởng huynh.",rf:"Hoàng thượng nghĩ ngươi nghiêng về người nhà."},
  {n:"Xin Hoàng thượng tự quyết, ngươi không dám nói",w:BAL.orig.hoang.x1c.w,e:"mid",lx:"bỏ lỡ dịp cất tiếng",rt:"Hoàng thượng nhìn ngươi rất lâu."}]}},
 E:{win:{tag:"Trưởng công chúa Bắc Địch",w:"emp",t:"Các trưởng lão chọn một người cai trị đúng ý, Đại Hy ủng hộ. Từ đó sứ hai nước đều gọi ngươi là ‘trưởng công chúa’.",fx:BAL.orig.hoang.win},
  win2:{tag:"Người chọn Khả hãn",w:"emp",t:"Trưởng huynh lên ngôi nhờ Đại Hy, và nhớ ơn ngươi. Mỗi mùa thu ngựa quý lại về cung.",fx:BAL.orig.hoang.win2},
  mid:{tag:"Ngai vàng xong, ngươi vẫn ở lại",t:"Ngôi Khả hãn đã có chủ, ngươi vẫn ở lại Đại Hy, không thêm không bớt.",fx:BAL.orig.hoang.mid},
  lose:{tag:"Mất cả hai huynh",w:"emp",t:"Cả hai huynh trưởng đều oán ngươi. Từ nay thư nhà về ngày một thưa.",fx:BAL.orig.hoang.lose}}});

/* ---------- identity card: backstory + how the court treats her, for every origin (owner 16/11 D18) ---------- */
const ORIGIN_LORE={
 tt:["Cha ngươi là Tể tướng, đứng đầu triều thần. Ngươi được dạy thơ văn và cách đọc lòng người từ nhỏ.","Hoàng hậu coi ngươi là mối lo, nhưng cả phe văn thần cúi chào ngươi."],
 dtq:["Cha ngươi giữ binh quyền biên ải. Ngươi quen ngựa, quen roi, thân thể khỏe hơn các khuê tú.","Võ tướng quý ngươi; văn thần chê ngươi thô, nhưng chẳng ai dám nói trước mặt."],
 muoi:["Nhà ngươi buôn muối, bạc chất đầy kho nhưng xuất thân thấp. Ngươi biết giá của mọi thứ.","Các phi tần khinh ngươi mùi muối, nhưng cũng nhận quà của ngươi."],
 cn:["Ngươi từng hầu trà ở Càn Thanh cung, được Hoàng thượng để ý một đêm rồi được sủng hạnh.","Cung nhân cũ vẫn gọi ngươi là chị; phi tần cũ nhớ ngươi từng đứng sau lưng họ."],
 nc:["Ngươi là công chúa Nam Chiếu, được gả sang Đại Hy để đổi lấy hòa bình biên ải. Phụ vương ngươi muốn ngươi làm tai mắt.","Thái hậu không ưa người ngoại tộc; triều thần dè chừng ngươi, nhưng Hoàng thượng thấy ngươi là tờ hòa ước."],
 bd:["Ngươi lớn lên trên lưng ngựa giữa trướng nỉ thảo nguyên; phụ hãn gả ngươi sang để đổi mười năm yên biên ải.","Thái hậu gọi ngươi là người rợ; hậu cung xì xào, nhưng quân Bắc Địch chỉ yên khi ngươi còn yên."],
 td:["Cả nhà ngươi bị xử trảm vì một vụ án oan. Ngươi vào cung dưới tên khác để báo thù.","Không ai biết thân phận thật, nhưng kẻ thù vẫn ở trong cung."],
 ch:["Ngươi là cháu gái ruột Thái hậu, được bà đưa vào cung làm quân cờ.","Thái hậu chống lưng, Hoàng hậu e dè, và phi tần nào cũng nể ngươi ba phần."],
 thd:["Cha ngươi là thầy đồ nghèo. Ngươi có thơ văn hơn người, ngoài ra không có gì.","Cung nữ quý chữ nghĩa của ngươi; phi tần giàu coi ngươi là cô gái quê."],
 cnv:["Ngươi là con nhà thường dân, qua kỳ tuyển cung nữ của Nội vụ phủ, vào cung làm kẻ hầu.","Không ai gọi tên ngươi; ngươi phải đi từ cung nữ lên từng bậc."]};
window.originLore=function(k){return ORIGIN_LORE[k]||null};
if(typeof kpIdentity==="function")(function(){const k0=kpIdentity;kpIdentity=function(M,m){const r=k0.apply(this,arguments);
 try{const k=S&&S.origin&&S.origin.k,L=ORIGIN_LORE[k],t=M&&M.querySelector(".kpidt");
  if(L&&t&&!M.querySelector(".kpidl")){const d=document.createElement("div");d.className="kpidt kpidl";d.innerHTML=`<b>Gốc gác.</b> ${L[0]}<br><b>Triều đình đối đãi.</b> ${L[1]}`;t.after(d)}}catch(e){console.error("originLore",e)}return r}})();
