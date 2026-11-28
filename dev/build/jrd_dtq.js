/* ================= jrd_dtq: the four full roads of «Con gái Đại tướng quân» (dtq), chapters .5–.11 (ROAD_MAP.md §4.2) =================
   Same arc shape as j67 (p = pools of hồi: mở đầu / rắc rối / bước ngoặt / cao trào; B = hồi; E = kết cục). Openings read how the chapter
   before ended (RDW / rdPrev / rdEnd, OD:L1253); the road's people are cast once and carried (rdCast); hostile roles real both ways (rdRel /
   rdOan, OD:L1247); every option has a real gain AND a real loss (review road-map-r1); chapter-level numbers in BAL.road.<road> (ONE CORE).
   Engine + shared helpers: jroad.js. History rules: a consort is never in a court hall or at a trial (road-history pass 1). */
/* ---------- dtq_bien · Khói lửa Nhạn Môn ---------- */
/* Road of «Con gái Đại tướng quân» (ROAD_MAP §4.2). Chapter .4 = ARC67.dtq_bien (win: Quốc công / mid: biên ải tạm yên / lose: cha bại, triệu về).
   The rival {v} enters at .5: a consort whose house is thông gia of the Binh bộ thượng thư (seeded in .4 c2), carried to .11.
   BAL.road.dtq_bien.grain = months before Hộ bộ closes the spring books (.5); .speak = rank index allowed to send a memorial to the desk (.9). */
const DTQBN_GR=()=>BAL.road.dtq_bien.grain,DTQBN_SPK=()=>BAL.road.dtq_bien.speak;
/* how many earlier chapters of this road ended won (odds at .10/.11 read the whole road) */
const DTQBN_WON=()=>[5,6,7,8,9].filter(n=>rdEnd(n)==="win").length;
RDQ.dtqbnWon=()=>DTQBN_WON();RDQ.dtqvWon=()=>DTQV_WON();/* named counts the odds terms in BAL.road.fx read (rdOdds "k") */

rdDef("dtq_bien",5,{t:"Lương thảo mùa sau",w:"emp",sj:"lương thảo cho ải Nhạn Môn",cast(A){return rdCast(A,["v"])},
 g:"Giặc lui về bắc, nhưng tuyết tan là chúng trở lại. Hộ bộ giữ lương ải Nhạn Môn, nói kho đã cạn. Lương phải lên đường trước kỳ Hộ bộ khóa sổ mùa xuân.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tước mới, lương cũ",w:"emp",if:RDW(1),t:"Cha vừa được phong Quốc công thì Hộ bộ dâng sớ: biên ải đã yên, xin cắt nửa lương Nhạn Môn trả về công khố. Thư huynh trưởng viết: giặc chỉ lui, chưa tan.",o:[
  {n:"Tâu: giặc lui chứ chưa tan",f:"warn",wx:"Hoàng thượng giữ lương",lx:"ngài cho là nhà ngươi được voi đòi tiên",rt:"Hoàng thượng phê son: lương Nhạn Môn giữ nguyên.",rf:"Hoàng thượng cười nhạt: “Quốc công còn chê ít sao?”"},
  {n:"Xin cha dâng trả bổng lộc tước mới",wx:"tiếng khiêm cung, Hộ bộ hết cớ",lx:"nhà ngươi mất bổng lộc một năm",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha dâng trả bổng lộc, xin đổi thành lương cho quân. Triều thần không ai nói thêm được."},
  {n:"Để cha tự lo việc ngoài triều",wx:"không mang tiếng can chính",lx:"nửa lương bị cắt",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi chỉ chúc mừng cha, không nói một lời về lương."}]},
 s2:{h:"Ải lạnh, kho trống",w:"maid",if:RDW(0),t:()=>rdPrev()==="lose"?"Cha bị triệu về kinh chờ tội, quân cũ của cha giữ ải dưới tay phó tướng. Hộ bộ buông một câu: tướng có tội thì quân khỏi cần ăn no.":"Quân giữ ải qua đông bằng cháo loãng. Thư cha chỉ một dòng: “Ngựa đã ăn đến rơm mái trại.”",o:[
  {n:"Viết huyết thư xin lương cho quân",wx:"cả cung cảm động",lx:"bị chê làm quá",rt:"Hoàng thượng đọc xong, lặng đi hồi lâu, rồi sai xuất kho.",rf:"Có người rỉ tai: con gái tướng dùng máu để ép vua."},
  {n:"Bán của hồi môn đổi gạo",wx:"quân có gạo qua tháng",lx:"tư trang vơi, nhà {v} cười sau lưng",rt:"Ba xe gạo rời kinh, cắm cờ hiệu nhà ngươi."},
  {n:"Nhẫn, chờ Hộ bộ xét",wx:"không ai bắt bẻ được ngươi",lx:"quân ở ải đói thêm",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi nuốt nước mắt, chép kinh cầu an cho quân."}]},
 c1:{h:"Sổ kho Hộ bộ",w:"maid",t:()=>`Hộ bộ nói kho trống. Còn ${kitNumVi(DTQBN_GR())} tháng nữa là khóa sổ mùa xuân, sau đó lương nào cũng phải đợi sang thu.`,o:[
  {n:"Cho người dò sổ xuất nhập kho",f:"so",wx:"biết kho Thông Châu còn đầy",lx:"Hộ bộ biết bị dò",rt:"Sổ ghi kho Thông Châu còn hai mươi vạn thạch, chưa hề động đến.",rf:"Người dò bị đuổi khỏi Hộ bộ, tên ngươi bị nhắc."},
  {n:"Biếu quà Thị lang giữ sổ",wx:"Thị lang ký xuất kho trước",lx:"để lại dấu đút lót",rt:"Thị lang ký một tờ xuất kho, im như thóc.",rf:"Thị lang nhận quà rồi vẫn không ký."},
  {n:"Tâu xin hoãn kỳ khóa sổ",wx:"thêm nửa tháng",lx:"ngài phiền vì việc sổ sách",rt:"Hoàng thượng cho hoãn khóa sổ nửa tháng.",rf:"Hoàng thượng chỉ nói: “Việc của Hộ bộ.”"}]},
 c2:{h:"Lời ở tiệc thưởng mai",w:"v",need:["v"],t:"Trong tiệc thưởng mai, {v} cười: “Nuôi một đạo quân ngoài ải tốn bằng nuôi cả hậu cung. Thiếp nghe Binh bộ có tướng khác xin đi, chỉ cần nửa lương.”",o:[
  {n:"Đáp: nửa lương thì nửa quân về được",wx:"cả tiệc lặng thinh",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cả tiệc lặng đi. Hoàng thượng đặt chén xuống: “Nói phải.”",rf:"Lời ngươi đanh quá, Hoàng thượng chau mày."},
  {n:"Hỏi khéo tướng ấy là ai",wx:"biết người Binh bộ muốn đưa đi",lx:"{v} biết ngươi dò",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} buột miệng: cháu ruột Binh bộ thượng thư."},
  {n:"Mời {v} cùng góp áo rét",wx:"{v} khó từ chối trước mặt mọi người",lx:"{v} giận vì bị ép",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} cắn môi góp mười tấm áo, rồi khen ngươi trước mọi người.",rf:"{v} cười: nhà nàng đã góp cho Binh bộ rồi."}]},
 c3:{h:"Kho riêng Đức Thọ cung",w:"th",need:["th"],t:"Thái hậu có kho riêng, gạo tiến của các châu. Ma ma hầu nói khéo: Thái hậu thương người biết chép kinh.",o:[
  {n:"Chép kinh dâng Thái hậu",wx:"Thái hậu mở kho riêng",lx:"Thái hậu thấy ngươi có ý cầu",rt:"Thái hậu sai xuất năm nghìn thạch gạo tiến.",rf:"Thái hậu nhận kinh, không nhắc đến gạo."},
  {n:"Thẳng thắn xin Thái hậu",wx:"Thái hậu nể lòng thẳng",lx:"Thái hậu không thích bị xin",rt:"Thái hậu gật đầu: “Nhà trung liệt, ai gia không để đói.”",rf:"Thái hậu nói: “Hậu cung không bàn việc lương.”"},
  {n:"Không làm phiền Thái hậu",wx:"Thái hậu giữ ý tốt về ngươi",lx:"bỏ lỡ một kho lương",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi chỉ thỉnh an rồi lui."}]},
 t1:{h:"Đường lương",w:"maid",t:"Lương đã gom, nhưng đường lên ải có hai lối: đường sông nhanh mà có thủy tặc, đường núi chậm mà yên. Một thương hội ở kinh xin chở thuê.",o:[
  {n:"Đi đường sông cho kịp",wx:"lương đến sớm",lx:"mất một đoàn thuyền",go:(A,ok,G)=>ok?"":e67bien(G[0]),rt:"Thuyền lương qua khúc sông hiểm êm ả.",rf:"Thủy tặc cướp một đoàn thuyền giữa đêm."},
  {n:"Đi đường núi, chậm mà yên",wx:"lương không mất hạt nào",lx:"chậm mười ngày",rt:"Xe lương lăn chậm qua đèo, không mất một bao."},
  {n:"Thuê thương hội chở",wx:"nhanh và có người áp tải",lx:"nợ thương hội một ân",rt:"Thương hội cắm cờ nhà ngươi trên từng xe lương."}]},
 x1:{h:"Tờ sớ kho cạn",w:"emp",t:"Trước kỳ khóa sổ, Hộ bộ thượng thư dâng sớ: kho đã cạn. Đêm ấy ở Ngự thư phòng, Hoàng thượng ném tờ sớ lên án, hỏi ngươi đang mài mực bên cạnh.",o:[
  {n:"Dâng ngài sổ kho Thông Châu",e:["win","lose"],rt:"Sáng hôm sau, Hoàng thượng đặt cuốn sổ trước triều. Hộ bộ thượng thư quỳ sụp xuống.",rf:"Hộ bộ tâu sổ ấy đã cũ. Hoàng thượng lạnh nhạt với ngươi: hậu cung xen việc triều."},
  {n:"Xin chuẩn lương đã gom được",e:["win","mid"],rt:"Hoàng thượng chuẩn, còn bắt Hộ bộ bù phần thiếu.",rf:"Hoàng thượng chuẩn phần đã gom, không bắt Hộ bộ bù."},
  {n:"Lặng im, để cha dâng sớ",e:"mid",lx:"lương đến muộn, không ai nhớ công ngươi",rt:"Cha dâng sớ, lương đi muộn nửa tháng."}]}},
 E:{win:{tag:"Lương đến ải trước tuyết tan",w:"emp",t:"Lương lên ải trước tuyết tan. Hộ bộ thượng thư bị phạt bổng, cả triều biết nhà {v} đứng sau ông ta.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67bien(G[1])}},
  mid:{tag:"Lương đến muộn",t:"Lương đến muộn nửa tháng. Quân đói mà không loạn; cha viết thư cảm ơn ngươi, nét chữ run vì lạnh.",go:(_A,G)=>e67bien(G[0])},
  lose:{tag:"Ải Nhạn Môn đói",w:"v",t:"Hộ bộ thắng. Quân giữ ải ăn vỏ cây qua mùa xuân, còn {v} cười với ngươi ở Ngự hoa viên.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" ")}}});

rdDef("dtq_bien",6,{t:"Thư huynh trưởng",w:"maid",sj:"kẻ bán tin trong trại",cast(A){return rdCast(A,["v"])},
 g:"Huynh trưởng gửi thư riêng: đường lương, giờ đổi gác, chỗ đặt kho đều đến tai giặc trước. Trong trại có kẻ bán tin, và kẻ ấy có người đỡ ở kinh.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Kho tây cháy",w:"maid",if:RDW(1),t:"Lương đến ải, huynh trưởng gửi lời tạ. Cuối thư có một dòng mực khác: đêm qua kho lương phía tây bị đốt, đúng chỗ chỉ ba người biết.",o:[
  {n:"Hỏi huynh tên ba người ấy",wx:"thu hẹp kẻ khả nghi",lx:"thư hỏi bị chặn đọc",rt:"Huynh hồi thư: một giáo úy, một quân nhu quan, và chính phó tướng.",rf:"Thư hỏi đi mà không thấy hồi; có kẻ chặn giữa đường."},
  {n:"Gửi bạc dựng lại kho",wx:"quân yên lòng",lx:"chưa tìm được kẻ đốt",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Kho mới dựng xong trong mười ngày."},
  {n:"Báo ngay Hoàng thượng",wx:"ngài sai thị vệ ngầm ra ải",lx:"ngài nghi cha ngươi trị quân lỏng",rt:"Hoàng thượng sai hai thị vệ thân tín cải trang ra Nhạn Môn.",rf:"Hoàng thượng hỏi: “Đại tướng quân giữ trại kiểu gì vậy?”"}]},
 s2:{h:"Đoàn lương bị cướp",w:"maid",if:RDW(0),t:"Đoàn lương muộn lại bị cướp giữa đèo. Huynh trưởng viết, mực nhòe vết máu: giặc biết giờ xe qua. Trong trại có kẻ bán tin.",o:[
  {n:"Viết thư hỏi huynh ai biết giờ xe",wx:"có danh sách người biết",lx:"thư có thể lọt",rt:"Huynh kể: chỉ quân nhu quan và hai lính trạm biết giờ xe.",rf:"Thư hồi đến muộn, chữ đã bị bóc niêm."},
  {n:"Gom bạc mua lương bù",wx:"quân không đói thêm",lx:"bạc cạn, kẻ bán tin vẫn đó",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Lương bù đi bằng đường khác, đến nơi trọn vẹn."},
  {n:"Nhịn, không làm lớn chuyện",wx:"kẻ bán tin không biết ngươi đã biết",lx:"quân ngờ vực lẫn nhau",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi đốt thư, giữ kín trong lòng."}]},
 c1:{h:"Kẻ bám theo thân binh",w:"maid",t:"Thân binh mang thư của huynh nói có kẻ bám theo từ cửa ải đến tận kinh. {maid} thấy hắn lảng vảng trước cửa bắc hoàng thành.",o:[
  {n:"Nhờ gia đinh nhà bắt kẻ bám theo",f:"bat",wx:"có người để tra",lx:"bắt nhầm người, mang tiếng",rt:"Kẻ bám theo bị bắt, trong áo có giấy vẽ đường trạm.",rf:"Gia đinh bắt nhầm một người bán than."},
  {n:"Đổi đường đưa thư",wx:"thư nhà kín đáo",lx:"kẻ bám theo biết bị phát hiện",rt:"Thư nhà từ nay đi qua một tiệm thuốc ngoài thành."},
  {n:"Để thân binh làm mồi",wx:"lần ra kẻ đứng sau",lx:"thân binh bị đánh trọng thương, ngươi mang tiếng đem người nhà làm mồi",rt:"Kẻ bám theo dẫn thẳng đến một phủ có người làm ở Binh bộ.",rf:"Thân binh bị đánh trọng thương, kẻ bám theo biến mất."}]},
 c2:{h:"Thái giám của {v} hỏi han",w:"v",need:["v"],t:"{maid} bắt gặp thái giám của {v} hỏi người đưa thư nhà ngươi: thư huynh trưởng đến ngày nào, ai nhận.",o:[
  {n:"Bắt tận tay, đưa đến Hoàng hậu",need:["hh"],wx:"{v} bị khiển trách",lx:"{v} nói chỉ hỏi thăm",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng hậu phạt thái giám ấy hai mươi trượng.",rf:"{v} khóc: “Thiếp chỉ lo cho biên ải thôi mà.”"},
  {n:"Để hắn nghe một tin giả",f:"nhu",wx:"biết tin đi đến đâu",lx:"tin giả lọt đến tai cha, trại cha rối",go:(A,ok,G)=>{if(ok){rdOan(A,"v",G[0]);return ""}return e67bien(G[1])},rt:"Ba ngày sau, tin giả ấy được nhắc ở Binh bộ.",rf:"Tin giả quay về tận trại cha, làm cha rối."},
  {n:"Tặng quà, nhờ {v} đừng tò mò",wx:"{v} nể mặt",lx:"{v} biết ngươi có điều giấu",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cười nhận quà, thái giám kia thôi lảng vảng."}]},
 c3:{h:"Hoàng thượng hỏi thư nhà",w:"emp",t:"Hoàng thượng hỏi ngươi có thư nhà không. Ngài muốn nghe tin biên ải từ người nhà, không phải từ tấu chương.",o:[
  {n:"Đưa thư thật cho ngài đọc",wx:"ngài tin nhà ngươi thật thà",lx:"huynh trưởng bị trách coi trại lỏng",rt:"Hoàng thượng đọc, gật đầu: “Huynh nàng viết thật.”",rf:"Hoàng thượng gấp thư: “Trại của cha nàng như cái sàng.”"},
  {n:"Kể lại, bỏ bớt chuyện bán tin",wx:"ngài vui",lx:"ngài biết bị giấu thì giận",rt:"Hoàng thượng nghe, cười, không hỏi thêm.",rf:"Hôm sau tấu chương nói đủ chuyện bán tin; ngài nhìn ngươi lạnh tanh."},
  {n:"Thưa: nhà không có thư",wx:"thư nhà không ra ngoài",lx:"lộ ra thì thành khi quân",rt:"Hoàng thượng nhìn ngươi lâu một chút, rồi thôi.",rf:"Thị vệ ngài sai ra ải đã thấy thư; ngài cho là ngươi khi quân."}]},
 t1:{h:"Tên kẻ bán tin",w:"maid",t:"Thư thứ hai của huynh: quân nhu quan mới đến mùa thu, người do Binh bộ cử, đêm đêm thả bồ câu về phía bắc.",o:[
  {n:"Bảo huynh bắt ngay",wx:"chặn đường tin",lx:"nhà {v} đánh hơi, ghi oán, kịp xóa dấu",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Huynh trói quân nhu quan giữa trại."},
  {n:"Bảo huynh để yên, nhử bằng tin giả",f:"nhu",wx:"giặc sẽ nhận tin sai",lx:"hắn đánh hơi được",rt:"Huynh cho hắn thấy một tờ quân lệnh giả.",rf:"Hắn nghi, hai đêm liền không thả bồ câu."},
  {n:"Tra xem ai ở Binh bộ cử hắn",f:"bb",wx:"biết tên kẻ cử",lx:"Binh bộ biết ngươi tra",rt:"Tờ cử do một lang trung ký, là người nhà {v}.",rf:"Sổ cử người của Binh bộ đã bị xé mất trang."}]},
 x1:{h:"Trước chuyến bồ câu tới",w:"emp",t:"Huynh trưởng báo: đêm rằm hắn sẽ thả bồ câu chuyến nữa. Ngươi phải chọn trước đêm ấy.",o:[
  {n:"Tâu Hoàng thượng, xin chiếu bắt",e:["win","lose"],rt:"Chiếu đến ải. Quân nhu quan bị bắt cùng lồng bồ câu và khai ra người ở kinh.",rf:"Chiếu đến chậm một đêm, hắn đã trốn qua ải."},
  {n:"Nhử nội gián bằng tin giả",e:["win","mid"],rt:"Giặc nhận tin giả, đánh vào trại trống, mất một nghìn kỵ.",rf:"Giặc không mắc mưu, nhưng đường tin đã bị cắt."},
  {n:"Bảo huynh lặng lẽ đuổi hắn đi",e:"mid",lx:"kẻ đứng sau ở kinh vô sự",rt:"Hắn bị đuổi về quê, không ai hỏi vì sao."}]}},
 E:{win:{tag:"Kẻ bán tin sa lưới",w:"emp",t:"Kẻ bán tin sa lưới, đường tin của giặc bị cắt. Lời khai dẫn về một người ở Binh bộ có họ với nhà {v}.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67bien(G[1])}},
  mid:{tag:"Đường tin bị cắt",t:"Trại sạch kẻ bán tin, nhưng người đứng sau ở kinh vẫn yên vị.",go:(_A,G)=>e67bien(G[0])},
  lose:{tag:"Kẻ bán tin trốn sang giặc",t:"Quân nhu quan trốn qua ải, mang theo sơ đồ trại. Huynh trưởng bị trách, cha phải đổi hết chỗ đóng quân.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" ")}}});

rdDef("dtq_bien",7,{t:"Viện binh",w:"emp",sj:"viện binh cho Nhạn Môn",cast(A){return rdCast(A,["v"])},
 g:"Tuyết tan, giặc kéo hơn mười vạn kỵ xuống phía nam. Cha xin năm vạn viện binh. Binh bộ muốn viện binh đi dưới cờ tướng khác, cháu nhà thông gia của {v}.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Binh bộ cần gỡ thể diện",w:"emp",if:RDW(1),t:"Kẻ bán tin đã khai, Binh bộ thượng thư mất mặt giữa triều. Ông ta càng muốn tướng của mình cầm viện binh để gỡ lại.",o:[
  {n:"Nhắc Hoàng thượng lời khai của kẻ bán tin",wx:"ngài dè chừng tướng Binh bộ",lx:"ngài cho là ngươi đòi trả thù",rt:"Hoàng thượng gõ ngón tay lên án: “Người Binh bộ cử, trẫm phải xem lại.”",rf:"Hoàng thượng nói: “Chuyện ấy xong rồi.”"},
  {n:"Gửi lễ an ủi phủ Binh bộ",wx:"Binh bộ: oán −",lx:"nhà {v} cho là ngươi sợ",rt:"Phu nhân Binh bộ thượng thư nhận lễ, gửi lời cảm tạ khách sáo."},
  {n:"Lặng im xem triều cãi",wx:"không lộ ý",lx:"triều không ai nói thay cha",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngươi chỉ nghe, không nói."}]},
 s2:{h:"Quân báo ba lần một ngày",w:"emp",if:RDW(0),t:"Giặc biết rõ trại cha thiếu người. Quân báo khẩn đến ba lần một ngày, mà triều còn cãi nhau ai cầm quân.",o:[
  {n:"Quỳ ngoài Dưỡng Tâm điện xin viện binh",wx:"Hoàng thượng thấy lòng nhà ngươi",lx:"bị chê hậu cung can chính",rt:"Hoàng thượng bước ra, đỡ ngươi dậy.",rf:"Ngươi quỳ đến tối, cửa điện không mở."},
  {n:"Viết thư hỏi cha cần gì nhất",wx:"biết đúng chỗ thiếu",lx:"thư đi về mất nửa tháng",rt:"Cha hồi: không cần đông, chỉ cần ba nghìn kỵ binh tinh nhuệ."},
  {n:"Chờ triều tự quyết",wx:"không ai trách ngươi",lx:"ải mất thêm một trạm gác",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi chờ, mỗi đêm đều mơ thấy lửa."}]},
 c1:{h:"Hai đạo sớ",w:"emp",t:"Trên án có hai đạo sớ: cha xin viện binh về dưới cờ mình; Binh bộ xin cử tướng khác cầm riêng. Hoàng thượng hỏi ngươi: “Nàng thấy sao?”",o:[
  {n:"Thưa: một trận không thể hai tướng",f:"mot",wx:"ngài nghiêng về cha",lx:"ngài thấy ngươi bênh nhà",rt:"Hoàng thượng gật: “Binh pháp cũng nói vậy.”",rf:"Hoàng thượng cười: “Nàng nói như cha nàng.”"},
  {n:"Thưa: thần thiếp không dám bàn việc binh",wx:"ngài khen ngươi biết phận",lx:"không ai nói giúp cha",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Hoàng thượng gấp sớ, không hỏi nữa."},
  {n:"Đề nghị cho tướng Binh bộ làm phó",f:"pho",wx:"cả hai bên đều có phần",lx:"thành thì tai mắt Binh bộ vào trại cha; hỏng thì ngài thấy ngươi bày việc",go:(A,ok,G)=>ok?e67dad(G[0]):"",rt:"Hoàng thượng thấy hợp lý, Binh bộ cũng không cãi được.",rf:"Binh bộ đòi làm chủ soái, không chịu làm phó."}]},
 c2:{h:"{v} đến thăm",w:"v",need:["v"],t:"{v} mang quà đến cung ngươi, ngỏ ý: nếu cha ngươi chịu để cháu nhà nàng làm phó soái, nhà nàng sẽ thôi gây khó.",o:[
  {n:"Nhận lời, mời cháu nàng làm phó",f:"pho",wx:"Binh bộ thôi cản",lx:"người nhà {v} đứng trong trại cha",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cười tươi, nắm tay ngươi thật chặt."},
  {n:"Từ chối thẳng",wx:"giữ trại cha sạch",lx:"{v} về rỉ tai Hoàng thượng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đứng dậy, không uống nốt chén trà.",rf:"Đêm ấy Hoàng thượng hỏi ngươi sao lại hẹp hòi với {v}."},
  {n:"Hứa khéo, chờ cha quyết",wx:"kéo dài thời gian",lx:"{v} biết ngươi chưa thật lòng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi nói: “Việc quân phải để cha định.”"}]},
 c3:{h:"Lão tướng ở Đức Thọ cung",w:"th",need:["th"],t:"Thái hậu nhắc: có một lão tướng về hưu từng giữ Nhạn Môn hai mươi năm trước, nay ngày ngày đánh cờ với các thái giám già.",o:[
  {n:"Xin Thái hậu tiến cử lão tướng",f:"lao",wx:"có một tướng ngoài cả hai phe",lx:"Thái hậu ngại xen việc binh",rt:"Thái hậu sai người mời lão tướng vào cung uống trà.",rf:"Thái hậu nói: “Ông ấy già rồi, để yên.”"},
  {n:"Tự đến thỉnh giáo lão tướng",wx:"học được cách giặc đánh",lx:"lão tướng không chịu ra",rt:"Lão tướng vẽ trên bàn cờ lối giặc hay vòng qua sau Nhạn Môn."},
  {n:"Dâng lễ tạ, không dám làm phiền",wx:"Thái hậu thấy ngươi biết ý",lx:"tốn lễ tạ, bỏ một người tài",rt:"Thái hậu gật, không nhắc lại."}]},
 t1:{h:"Giám quân",w:"emp",t:"Hoàng thượng muốn sai một thái giám thân tín mang hổ phù viện binh đi cùng làm giám quân.",o:[
  {n:"Can: giám quân trói tay tướng",f:"nogq",wx:"không có giám quân",lx:"ngài nghĩ nhà ngươi muốn độc quyền",rt:"Hoàng thượng thôi, chỉ sai một văn quan ghi chép.",rf:"Hoàng thượng lạnh giọng: “Trẫm phải tin ai đây?”"},
  {n:"Biếu lễ giám quân trước",wx:"giám quân dễ nói chuyện",lx:"dấu đút lót trong tay hoạn quan",rt:"Giám quân nhận lễ, hứa không cản quân lệnh."},
  {n:"Thuận theo ý ngài",wx:"ngài yên lòng",lx:"cha bị một hoạn quan kèm cặp",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Giám quân lên đường cùng viện binh."}]},
 x1:{h:"Đêm định viện binh",w:"emp",t:"Giặc đã áp sát. Triều cãi đến tối vẫn chưa xong; Hoàng thượng về Ngự thư phòng, phải chọn người cầm năm vạn viện binh trước sáng, và ngài cho gọi ngươi đến hầu mực.",o:[
  {n:"Xin viện binh về dưới cờ cha",e:["win","lose"],rt:"Hổ phù viện binh được trao cho sứ giả của cha.",rf:"Hoàng thượng nổi giận: “Cả thiên hạ là của nhà nàng sao?” Viện binh bị giữ lại."},
  {n:"Đề cử lão tướng cầm viện binh",if:A=>A.f.lao,e:["win","mid"],rt:"Lão tướng nhận hổ phù, việc đầu tiên là gửi thư hỏi cha ngươi.",rf:"Lão tướng nhận hổ phù nhưng đi chậm, chỉ kịp đến sau."},
  {n:"Chịu tướng Binh bộ làm phó",if:A=>A.f.pho,e:["win","mid"],rt:"Viện binh về dưới cờ cha, tướng Binh bộ đứng hàng phó.",rf:"Tướng Binh bộ chỉ nhận làm phó trên giấy, ra đến ải thì đóng quân riêng."},
  {n:"Để Binh bộ cầm viện binh",e:"mid",lx:"viện binh không nghe lệnh cha",rt:"Năm vạn quân lên đường dưới cờ Binh bộ."}]}},
 E:{win:{tag:"Viện binh về dưới cờ cha",w:"emp",t:"Năm vạn viện binh về dưới cờ cha. Ải Nhạn Môn có đủ người giữ, và Binh bộ biết ngươi không dễ bắt nạt.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" ")},
  mid:{tag:"Viện binh đi dưới cờ người khác",t:"Viện binh có đến, nhưng mỗi lệnh của cha phải qua tay người khác.",go:(_A,G)=>e67bien(G[0])},
  lose:{tag:"Viện binh bị giữ lại",w:"v",t:"Viện binh nằm lại kinh thành. Cha giữ ải bằng quân cũ đã mỏi, còn {v} được Hoàng thượng thưởng một đôi vòng ngọc.",go:(A,G)=>{rdRel(A,"v",G[0]);return e67bien(G[1])}}}});

rdDef("dtq_bien",8,{t:"Mất một thành",w:"emp",sj:"thành Ứng Châu thất thủ",cast(A){return rdCast(A,["v"])},
 g:"Thành Ứng Châu sau lưng Nhạn Môn thất thủ. Ngự sử dâng sớ: tội ở Đại tướng quân. Muốn gỡ tội cho cha, phải biết thành mất vì ai.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Cổng thành mở lúc nửa đêm",w:"emp",if:RDW(1),t:"Viện binh về dưới cờ cha, vậy mà Ứng Châu vẫn mất: tướng giữ thành mở cổng lúc nửa đêm. Ngự sử vẫn quy tội người cầm ấn soái.",o:[
  {n:"Xin Hoàng thượng chờ tra rõ",wx:"ngài hoãn xét tội cha",lx:"ngài cho là ngươi bao che",rt:"Hoàng thượng phê: đợi tra xong sẽ định.",rf:"Hoàng thượng nói: “Ấn soái ở tay ai, tội ở tay người ấy.”"},
  {n:"Viết thư hỏi cha tướng giữ thành là ai",wx:"biết lai lịch kẻ mở cổng",lx:"thư đi lâu, sớ hặc dồn lên",rt:"Cha hồi: tướng ấy do Binh bộ cử, đến trước ngày viện binh."},
  {n:"Đóng cửa cung, ăn chay cầu an",wx:"cả cung thấy lòng hiếu",lx:"ăn chay Sức −, không ai nói giúp cha",rt:"Ngươi ăn chay ba tuần."}]},
 s2:{h:"Ứng Châu cháy",w:"emp",if:RDW(0),t:()=>rdPrev()==="lose"?"Không có viện binh, cha rút quân giữ Nhạn Môn, bỏ Ứng Châu. Ngự sử dâng sớ: bỏ thành là tội chém.":"Viện binh dừng lại cách Ứng Châu ba mươi dặm, không vào cứu. Thành mất trong hai ngày, sớ hặc lại đổ lên đầu cha.",o:[
  {n:"Tâu: không có quân thì không giữ được thành",wx:"có người nhớ ai giữ viện binh",lx:"ngài thấy bị trách",rt:"Hoàng thượng im lặng, rồi bảo Ngự sử đợi đã.",rf:"Hoàng thượng đập án: “Nàng trách trẫm sao?”"},
  {n:"Gửi bạc lo cho dân Ứng Châu chạy nạn",wx:"dân nhớ ơn nhà ngươi",lx:"bạc cạn",rt:"Lều cháo dựng ngoài cửa tây kinh thành, cắm cờ nhà ngươi."},
  {n:"Viết thư khuyên cha tự dâng sớ nhận lỗi",wx:"Hoàng thượng thấy cha biết điều",lx:"cha nhận tội thay kẻ khác",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha dâng sớ, lời lẽ khiêm cung."}]},
 c1:{h:"Dân chạy nạn",w:"maid",t:"Dân Ứng Châu kéo về kinh, kể đủ điều. Lời họ có thể cứu cha, cũng có thể chôn cha.",o:[
  {n:"Cho người ghi lời dân chạy nạn",f:"loi",wx:"có lời chứng cổng mở từ trong",lx:"lời dân rối, khó dùng",rt:"Ba người dân cùng kể: cổng mở từ bên trong, không có trận nào.",rf:"Mỗi người kể một kiểu, không ai khớp ai."},
  {n:"Phát cháo, không hỏi gì",wx:"tiếng nhân từ",lx:"không được lời chứng nào",rt:"Dân chạy nạn khấu đầu trước cổng cung."},
  {n:"Tránh xa đám đông",wx:"không bị ai lợi dụng",lx:"Ngự sử gom lời dân trước",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngự sử đến lều cháo trước ngươi."}]},
 c2:{h:"{v} xin ngươi tự giáng",w:"v",need:["v"],t:"Trong buổi thỉnh an, {v} nói như vô tình: “Con gái nhà tướng mất thành, nên tự xin giáng bậc cho cha đỡ tội.”",o:[
  {n:"Đáp: tội chưa định, ai dám giáng",wx:"{v} cứng họng",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cả phòng lặng đi. Một phi tần lớn tuổi nói khẽ: “Tội chưa định thì chưa ai được nói.”",rf:"Mấy phi tần khác che miệng cười."},
  {n:"Cúi đầu, không đáp",wx:"không mắc khích",lx:"lời {v} lan khắp hậu cung",rt:"Ngươi uống trà, như không nghe."},
  {n:"Hỏi lại: Ứng Châu do ai cử giữ",wx:"cả phòng nhớ ra tướng ấy là người Binh bộ",lx:"{v} biết ngươi đã biết",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt, đặt chén xuống.",rf:"{v} cười: “Thiếp đâu biết chuyện ngoài triều.”"}]},
 c3:{h:"Hoàng thượng thôi triệu",w:"emp",t:"Sớ hặc chất cao trên án. Mười ngày nay Hoàng thượng không triệu ngươi.",o:[
  {n:"Xin vào gặp, dâng canh đêm",wx:"ngài nghe ngươi nói",lx:"bị đuổi về",rt:"Hoàng thượng uống canh, hỏi nhỏ: “Cha nàng có khỏe không?”",rf:"Thái giám chặn ngươi ngoài cửa."},
  {n:"Chép kinh gửi đến Dưỡng Tâm điện",wx:"ngài nhớ đến ngươi",lx:"không được nói một lời nào",rt:"Kinh ngươi chép nằm trên án, cạnh sớ hặc."},
  {n:"Chờ, không cầu",wx:"giữ thể diện",lx:"Hoàng thượng nghe lời người khác, nhạt với ngươi",rt:"Ngươi ngồi thêu suốt mười ngày."}]},
 t1:{h:"Người lính giữ cổng",w:"maid",t:"Một lính giữ cổng Ứng Châu trốn về kinh, tìm đến người nhà ngươi: hắn thấy tướng giữ thành nhận một rương vàng từ người bên kia.",o:[
  {n:"Giấu hắn trong phủ, giữ làm chứng",f:"wit",wx:"có nhân chứng sống",lx:"giấu người là tội nếu lộ",rt:"Hắn được giấu trong kho củi phủ nhà ngươi."},
  {n:"Nhờ huynh trưởng đưa hắn đến Hình bộ",wx:"lời khai vào hồ sơ",lx:"Hình bộ giam hắn, nhà ngươi mang tiếng xen việc ngoài",rt:"Lời khai được ghi, có dấu của Hình bộ.",rf:"Hình bộ giam hắn, bảo đợi xét."},
  {n:"Cho bạc để hắn đi xa",wx:"cứu một mạng",lx:"mất nhân chứng",rt:"Hắn khóc, quỳ lạy rồi đi về nam."}]},
 x1:{h:"Ai chịu tội mất thành",w:"emp",t:"Mai triều nghị định tội mất Ứng Châu. Đêm nay Hoàng thượng đến cung ngươi, mệt mỏi: “Nàng có điều gì muốn nói thì nói đi.”",o:[
  {n:"Để huynh trưởng đưa nhân chứng ra trước triều",e:["win","lose"],rt:"Huynh trưởng dẫn người lính vào triều; hắn quỳ kể rương vàng. Tướng giữ thành bị bắt giải về kinh.",rf:"Nhân chứng run quá, nói trước quên sau. Ngự sử bảo nhà tướng mua người."},
  {n:"Nhờ Thái hậu nói một lời",need:["th"],e:["win","mid"],rt:"Thái hậu nói với Hoàng thượng: “Ai mở cổng thì người ấy chịu.” Sáng hôm sau ngài phán theo lời ấy.",rf:"Thái hậu chỉ nói: “Xét cho công bằng.” Cha bị phạt nhẹ."},
  {n:"Xin cha nhận một phần lỗi",e:"mid",lx:"cha mất bổng lộc một năm",rt:"Cha nhận lỗi trị quân không nghiêm. Hoàng thượng dịu giọng."}]}},
 E:{win:{tag:"Tội mất thành không về cha",w:"emp",t:"Tướng giữ Ứng Châu bị xử, người cử hắn ở Binh bộ bị giáng. Ngự sử rút sớ, cha giữ ấn soái.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Cha bị phạt bổng",t:"Cha bị phạt bổng một năm, ấn soái vẫn giữ. Ứng Châu còn trong tay giặc.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Cha bị giáng tước",w:"emp",t:"Cha bị giáng một tước, vẫn cầm quân nhưng dưới mắt Ngự sử. Trong cung, người ta thôi gọi ngươi là con nhà trung liệt.",go:(_A,G)=>[e67dad(G[0]),e67bien(G[1])].join(" ")}}});

rdDef("dtq_bien",9,{t:"Lời can gián",w:"emp",sj:"chuyện Hoàng thượng định ngự giá thân chinh",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng muốn ngự giá thân chinh ra Nhạn Môn. Triều thần nửa can nửa chiều. Hậu cung không được bàn việc triều, mà lời ngươi có thể giữ ngài lại, hoặc làm ngài giận.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ngài nóng lòng",w:"emp",if:RDW(1),t:"Tội mất thành đã gỡ. Hoàng thượng phấn chấn, muốn tự mình ra Nhạn Môn đón thắng trận, khắc tên lên bia đá ải bắc.",o:[
  {n:"Khen ngài anh dũng, xin nghĩ thêm",wx:"ngài chịu nghe tiếp",lx:"ngài thấy ngươi nói vòng",rt:"Hoàng thượng cười: “Nàng muốn nói gì thì nói đi.”",rf:"Hoàng thượng đã quay đi bàn với thị vệ."},
  {n:"Viết thư hỏi cha nên hay không",f:"cha",wx:"có lời của tướng ngoài ải",lx:"thư đi về mất nửa tháng",rt:"Cha hồi: “Giá ngự ra ải, cha phải chia nửa quân giữ ngài.”"},
  {n:"Im lặng, mừng cùng ngài",wx:"ngài vui",lx:"giá ngự càng gần ải",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi nâng chén chúc ngài khải hoàn."}]},
 s2:{h:"Lời đại thần",w:"emp",if:RDW(0),t:"Một vị đại thần tâu: Đại tướng quân không đáng tin, chỉ thiên tử ra trận mới giữ được quân tâm. Hoàng thượng động lòng.",o:[
  {n:"Xin gặp riêng ngài trong đêm",wx:"ngài chịu nghe",lx:"ngài nghĩ ngươi lo cho cha hơn cho vua",rt:"Hoàng thượng cho ngươi vào, ngồi nghe đến canh ba.",rf:"Hoàng thượng nói: “Nàng lo cho cha nàng thì có.”"},
  {n:"Dò xem đại thần ấy là người phe nào",wx:"biết ai muốn vua ra ải",lx:"tốn bạc, phe kia biết ngươi dò",rt:"Vị đại thần ấy đỗ cùng khoa với Binh bộ thượng thư, hai nhà qua lại thân thiết."},
  {n:"Đành để ngài định",wx:"không mang tiếng can chính",lx:"giá ngự sắp lên đường",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi về cung, đêm không ngủ."}]},
 c1:{h:"Thái hậu gọi",w:"th",need:["th"],t:"Thái hậu gọi ngươi đến Đức Thọ cung: “Ai gia không cản được con mình. Con là con gái nhà tướng, con nói xem trận mạc ra sao.”",o:[
  {n:"Kể thật những gì cha viết",f:"th",wx:"Thái hậu đứng về phía ngươi",lx:"Thái hậu sợ hãi, trách nhà ngươi",rt:"Thái hậu lặng đi: “Vậy thì không được đi.”",rf:"Thái hậu khóc, trách cha ngươi không giữ nổi biên ải."},
  {n:"Thưa: thần thiếp không hiểu việc binh",wx:"giữ phận",lx:"Thái hậu thất vọng, bỏ một chỗ dựa",rt:"Thái hậu thở dài, cho lui."},
  {n:"Xin Thái hậu cùng can",f:"th",wx:"có Thái hậu đứng cùng",lx:"Thái hậu không thích bị kéo vào",rt:"Thái hậu gật: “Ai gia sẽ nói.”",rf:"Thái hậu nói: “Con muốn ai gia cãi con trai mình sao?”"}]},
 c2:{h:"{v} xin theo hầu",w:"v",need:["v"],t:"{v} xin theo hầu giá ngự ra biên. Ai cũng biết: đi theo là được sủng suốt chuyến.",o:[
  {n:"Cũng xin theo hầu",wx:"được ở cạnh ngài",lx:"{v} oán, cả hậu cung bàn tán",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng gật: “Hai nàng cùng đi.”",rf:"Hoàng thượng chỉ cho {v} theo."},
  {n:"Can: hậu cung theo ra ải là điềm xấu",wx:"giá ngự bớt một lý do để đi",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Lễ bộ phụ họa, giá ngự bớt rình rang.",rf:"{v} cười: “Tỷ tỷ sợ ngài sủng thiếp hơn chăng?”"},
  {n:"Để {v} đi, giữ mình ở kinh",wx:"không tranh",lx:"{v} được sủng suốt chuyến",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cảm ơn ngươi, mắt sáng rỡ."}]},
 c3:{h:"Lời Tổng quản",w:"eun",t:"Tổng quản {eun} nói khéo: các đời trước, phi tần can việc binh đều không có kết tốt. Nhưng ông cũng nói: Hoàng thượng thường đọc thư khi đêm đã khuya.",o:[
  {n:"Biếu lễ, nhờ ông đặt thư lên án lúc khuya",f:"thu",wx:"thư đến tay ngài đúng lúc",lx:"lễ mất trắng nếu ông không đặt",rt:"Tổng quản gật: “Nô tài biết giờ nào ngài dễ đọc.”",rf:"Tổng quản nhận lễ, thư vẫn nằm dưới chồng tấu."},
  {n:"Tặng chút quà, cảm tạ lời khuyên",wx:"Tổng quản quý ngươi",lx:"tốn quà, bỏ một đường đưa thư",rt:"Tổng quản cúi đầu tiễn ngươi."},
  {n:"Hỏi ông ai muốn vua ra ải",wx:"biết phe xúi giục",lx:"Tổng quản cảnh giác, giữ khoảng cách với ngươi",rt:"Tổng quản khẽ nói: người Binh bộ ra vào Dưỡng Tâm điện nhiều hơn trước.",rf:"Tổng quản cười: “Nô tài chỉ biết hầu trà.”"}]},
 t1:{h:"Bậc của ngươi",w:"emp",t:()=>`Lệ cung: phi tần từ bậc ${RANKS[Math.min(DTQBN_SPK(),RANKS.length-1)].n} trở lên mới được dâng thư lên ngự án. Ngươi đang ở bậc ${meRankN()}.`,o:[
  {n:"Dâng thư can lên ngự án",if:()=>S.rank>=DTQBN_SPK(),f:"thu",wx:"lời ngươi đến tay ngài đúng lệ",lx:"ngài đọc trong cơn bực",rt:"Hoàng thượng đọc thư hai lần, đặt dưới chặn giấy.",rf:"Hoàng thượng đọc lướt, gạt sang bên."},
  {n:"Nhờ Hoàng hậu chuyển lời",need:["hh"],f:"thu",wx:"lời ngươi đi qua Trung cung",lx:"Hoàng hậu biết ngươi nợ nàng",rt:"Hoàng hậu nói với ngài đúng ý ngươi.",rf:"Hoàng hậu chuyển lời, nhưng bớt đi một nửa."},
  {n:"Thêu một tấm bản đồ ải bắc",wx:"ngài thấy ải hiểm thế nào",lx:"tốn công, ngài có xem hay không chưa biết",rt:"Tấm bản đồ treo trong thư phòng, ngài đứng nhìn rất lâu."},
  {n:"Giữ lời, chờ ngài hỏi",wx:"không phạm lệ cung",lx:"lời can đến muộn, giá ngự đã sửa soạn",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi chờ."}]},
 x1:{h:"Đêm trước ngày định",w:"emp",t:"Đêm trước ngày định giá ngự, Hoàng thượng đến cung ngươi, ngồi im rất lâu rồi hỏi: “Nàng nói thật đi. Trẫm có nên đi không?”",o:[
  {n:"Quỳ can: thiên tử không thể ra ải",e:["win","lose"],rt:"Hoàng thượng đỡ ngươi dậy: “Trẫm ở lại. Ngoài ải giao hết cho cha nàng.”",rf:"Hoàng thượng đứng phắt dậy: “Hậu cung can chính!” Ngài bỏ đi trong đêm."},
  {n:"Khuyên ngài dừng ở hành cung phía bắc",e:["win","mid"],rt:"Hoàng thượng gật: “Hành cung đủ gần để quân thấy cờ, đủ xa để cha nàng khỏi phải giữ trẫm.”",rf:"Hoàng thượng đi đến hành cung, rồi đòi đi tiếp."},
  {n:"Không can, chỉ xin ngài giữ mình",e:"mid",lx:"giá ngự ra gần ải, cha phải chia quân giữ ngài",rt:"Hoàng thượng nắm tay ngươi: “Trẫm sẽ về.”"}]}},
 E:{win:{tag:"Hoàng thượng ở lại kinh",w:"emp",t:"Hoàng thượng ở lại kinh, giao toàn quyền ngoài ải cho cha. Ngài nói với Tổng quản: “Con gái nhà tướng biết điều hơn cả triều.”",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Giá ngự dừng ở hành cung",t:"Giá ngự đóng ở hành cung phía bắc. Quân thấy cờ vua mà vững lòng, nhưng mỗi quân lệnh phải chờ ngựa trạm chạy về hỏi."},
  lose:{tag:"Bị coi là can chính",w:"emp",t:"Hoàng thượng cho rằng ngươi can chính, nửa tháng không đặt chân đến cung ngươi. Ngài sai một thái giám thân tín ra trại cha làm giám quân.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_bien",10,{t:"Trận quyết chiến",w:"emp",sj:"trận quyết chiến ngoài Nhạn Môn",cast(A){return rdCast(A,["v"])},
 g:"Giặc dồn hết kỵ binh vào một trận. Cha giữ ải, huynh trưởng cầm tiền quân. Mọi lương thảo, viện binh, lời can ngươi gom được, nay đặt lên một bàn cờ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Toàn quyền ngoài ải",w:"dad",if:RDW(1),t:"Hoàng thượng giao toàn quyền. {dad} gửi về một lá thư ngắn: “Trận này cha đánh bằng tất cả những gì con gửi ra.”",o:[
  {n:"Hồi thư, chép lời lão tướng về lối vòng sau ải",f:"keo",wx:"cha biết đường giặc vòng",lx:"thư lọt thì lộ kế",rt:"Cha hồi: “Cha đã đặt phục binh ở khe sau.”",rf:"Cha hồi: “Con lo việc trong cung thôi.”"},
  {n:"Gửi áo giáp mềm cho cha và huynh",wx:"cha con yên lòng",lx:"bạc cạn trước trận",rt:"Hai tấm giáp mềm đi theo ngựa trạm."},
  {n:"Chỉ hồi một chữ: Bình an",wx:"thư không thể bị lợi dụng",lx:"cha không có thêm gì",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Cha đọc chữ ấy, cất vào ngực áo."}]},
 s2:{h:"Kẻ đứng giữa vua và tướng",w:"emp",if:RDW(0),t:()=>rdPrev()==="lose"?"Thái giám giám quân đã đến trại cha. Hắn chưa từng cầm gươm, nhưng lời hắn là lời vua.":"Giá ngự đóng ở hành cung. Mỗi quân lệnh của cha phải chờ ngựa trạm chạy đi chạy về.",o:[
  {n:"Xin Hoàng thượng cho cha quyền tùy cơ",f:"quyen",wx:"cha khỏi phải chờ lệnh",lx:"ngài càng nghi",rt:"Hoàng thượng viết bốn chữ “tùy cơ ứng biến” gửi ra ải.",rf:"Hoàng thượng nói: “Trẫm còn sống, sao phải để tướng tự quyết?”"},
  {n:"Gửi quà cho giám quân",wx:"giám quân bớt cản",lx:"dấu đút lót trong tay hoạn quan",rt:"Giám quân nhận quà, ngủ suốt ngày trong lều.",rf:"Giám quân nhận quà, vẫn đòi duyệt từng quân lệnh."},
  {n:"Để cha tự xoay xở",wx:"không thêm tội can chính",lx:"cha bị trói tay",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi chỉ cầu an."}]},
 c1:{h:"Huynh trưởng xin đánh úp",w:"maid",t:"Thư huynh trưởng: huynh muốn dẫn ba nghìn kỵ đánh úp trại lương giặc, cha không cho. Huynh hỏi ngươi nên nghe ai.",o:[
  {n:"Khuyên huynh nghe cha",wx:"cha con một lòng",lx:"bỏ một dịp lớn",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Huynh hồi: “Muội nói phải.”"},
  {n:"Khuyên huynh xin cha thêm một lần",f:"up",wx:"cha chuẩn kế đánh úp",lx:"cha giận huynh vượt lời, Danh −−",go:(A,ok,G)=>ok?"":e67dad(G[0]),rt:"Cha cho huynh đi, dặn: không đốt được kho thì quay về.",rf:"Cha phạt huynh mười quân côn vì nói lại."},
  {n:"Giữ thư, không đáp",wx:"không xen vào việc quân",lx:"huynh bực, cãi cha giữa trại",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngươi cất thư."}]},
 c2:{h:"Kẻ hỏi đường trạm",w:"maid",t:"{maid} báo: có kẻ trong cung hỏi nàng giờ ngựa trạm về và quân báo đưa vào cửa nào. Kẻ ấy không phải người của {v}.",o:[
  {n:"Lần theo kẻ hỏi đường trạm",f:"gian",wx:"thấy kẻ ấy gặp một người buôn da phương bắc",lx:"kẻ ấy biết bị theo",rt:"Kẻ ấy ra cửa hông, gặp một người buôn da lông phương bắc.",rf:"Kẻ ấy rẽ vào Nội vụ phủ rồi mất dấu."},
  {n:"Báo Tổng quản canh cửa",wx:"cửa cung chặt hơn",lx:"tốn lễ Tổng quản, kẻ ấy nằm im khó bắt",rt:"Tổng quản đổi người giữ ba cửa hông."},
  {n:"Mặc kệ kẻ hỏi han",wx:"đỡ một việc",lx:"tin quân báo lọt ra ngoài",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Ngươi dặn {maid} đừng nói gì, rồi thôi."}]},
 c3:{h:"{v} rỉ tai",w:"v",need:["v"],t:"{v} rỉ tai Hoàng thượng: Đại tướng quân cố đánh một trận lớn để đòi phong vương.",o:[
  {n:"Tâu: cha chỉ xin về quê sau trận",wx:"ngài hết nghi",lx:"lời hứa ấy trói cha",rt:"Hoàng thượng cười: “Vậy để xem.”",rf:"Hoàng thượng nói: “Lời ấy để cha nàng tự nói.”"},
  {n:"Vạch người nhà {v} ở Binh bộ",wx:"lời {v} mất sức",lx:"thành ra cãi nhau trước vua",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng nhìn {v}: “Nàng cũng có người nhà ngoài triều nhỉ.”",rf:"Hoàng thượng phất tay: “Đủ rồi, cả hai lui.”"},
  {n:"Không đáp, để chiến công nói",wx:"giữ thể diện",lx:"lời {v} còn lởn vởn, ngài nhạt với ngươi",rt:"Ngươi chỉ cúi đầu."}]},
 t1:{h:"Đêm trước trận",w:"emp",t:"Quân báo: giặc sẽ đánh lúc tuyết đầu mùa. Đêm nay ngươi có thể gửi một điều cuối cùng ra ải.",o:[
  {n:"Gửi kế hỏa công trong thư nhà",wx:"cha có thêm một kế",lx:"kế không hợp địa thế, cha bỏ",rt:"Cha đọc, sai quân chất cỏ khô ở khe núi.",rf:"Cha hồi: “Gió ở ải thổi ngược, không dùng được.”"},
  {n:"Cầu đảo ở Phụng Tiên điện suốt đêm",wx:"cả cung biết lòng ngươi",lx:"Sức −− (ngày trận)",rt:"Ngươi quỳ đến khi chuông sớm điểm."},
  {n:"Xin Hoàng thượng ban rượu ngự cho quân",wx:"quân sĩ hăng hái",lx:"ngài thấy ngươi đòi ân cho nhà",rt:"Ba trăm vò rượu ngự lên đường ra ải.",rf:"Hoàng thượng nói: “Đánh thắng rồi hãy uống.”"}]},
 x1:{h:"Tin từ chiến trường",w:"emp",t:"Ngựa trạm về lúc nửa đêm: hai quân đã giáp nhau dưới chân Nhạn Môn. Hoàng thượng hỏi ngươi: lệnh cuối gửi ra nên là gì?",o:[
  {n:"Tâu: cho cha đánh theo ý mình",e:["win","lose"],rt:"Cha mở cổng ải, kỵ binh của huynh đánh thốc vào sườn giặc. Giặc tan.",rf:"Cha đánh ra, giặc giả thua dụ vào khe núi. Huynh trưởng trúng tên."},
  {n:"Tâu: giữ ải, chỉ đánh tạt",e:["win","mid"],rt:"Giặc đánh mãi không vào, lương cạn, bị cha đuổi theo chém tan hậu quân.",rf:"Giặc rút về bắc, hai bên đều hao."},
  {n:"Tâu: cầu hòa, đổi lấy ải yên",e:"mid",lx:"triều chê nhà tướng nhát",rt:"Sứ hòa ra ải. Giặc nhận vàng lụa, lui quân."}]}},
 E:{win:{tag:"Phá giặc ngoài Nhạn Môn",w:"emp",t:"Đại quân phá giặc dưới chân Nhạn Môn, thu lại Ứng Châu. Kinh thành treo đèn ba đêm.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" ")},
  mid:{tag:"Giặc lui, quân ta hao",t:"Giặc lui về bắc, quân ta cũng hao một nửa. Không ai gọi đây là thắng, cũng không ai dám gọi là thua.",go:(_A,G)=>e67bien(G[0])},
  lose:{tag:"Huynh trưởng trúng tên, quân lui",w:"emp",t:"Huynh trưởng trúng tên, được khiêng về trại. Quân lui vào sau ải; cha dâng sớ xin chịu tội.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" ")}}});

rdDef("dtq_bien",11,{t:"Khải hoàn hay bại trận",w:"dad",sj:"ngày cha trở về kinh",cast(A){return rdCast(A,["v"])},
 g:"Chiến sự đã xong. Cha trở về kinh, dưới cờ khải hoàn hoặc trước sớ hặc. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3","c4"],["t1"],["x1"]],
 B:{s1:{h:"Đèn đón đại quân",w:"emp",if:RDW(1),t:"Kinh thành treo đèn đón đại quân. Hoàng thượng đứng trên lầu Ngọ môn rất lâu mà không cười: quân reo tên cha ngươi, không reo tên ngài.",o:[
  {n:"Khuyên cha xuống ngựa từ ngoài cổng",f:"khiem",wx:"Hoàng thượng thấy cha biết phận",lx:"quân sĩ thấy tướng mình bị nhún",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha xuống ngựa, đi bộ qua Ngọ môn, quỳ trước lầu."},
  {n:"Dâng rượu mừng ngài đêm ấy",wx:"vinh quang của nhà là của ngài",lx:"ngài nghe ra ý khoe công",rt:"Ngươi nâng chén: “Thắng trận là phúc của bệ hạ.” Hoàng thượng cười, uống cạn.",rf:"Hoàng thượng đặt chén xuống: “Phúc của trẫm, hay công của cha nàng?”"},
  {n:"Ở trong cung, không ra đón",wx:"không ai bảo ngươi khoe",lx:"ngài thấy ngươi hờ hững với vinh quang ngài trao",rt:"Ngươi nghe tiếng trống từ xa."}]},
 s2:{h:"Sớ chờ ở cổng thành",w:"emp",if:RDW(0),t:"Cha về kinh, áo giáp còn vết máu, tóc bạc thêm. Ngự sử chờ sẵn ở cổng thành với ba tờ sớ.",o:[
  {n:"Ra tận cổng cung đón cha",wx:"cả cung thấy lòng con hiếu",lx:"Ngự sử nói ngươi làm áp lực",rt:"Cha ôm ngươi, không nói được lời nào."},
  {n:"Xin Hoàng thượng cho cha nghỉ trước khi xét",wx:"cha có thời gian dưỡng thương",lx:"ngài thấy ngươi đòi ân",rt:"Hoàng thượng cho cha nghỉ một tháng.",rf:"Hoàng thượng nói: “Xét xong rồi nghỉ.”"},
  {n:"Nhờ người dò ba tờ sớ",f:"so",wx:"biết sớ dựa vào đâu",lx:"Ngự sử đài biết ngươi dò",rt:"Hai tờ sớ chép lại lời một vị đại thần phe Binh bộ."}]},
 c1:{h:"Tước vương",w:"emp",if:()=>rdEnd(10)!=="lose",t:"Triều thần bàn phong cha làm Trấn Bắc vương. Ai cũng biết: tước vương cho tướng còn cầm quân là điều vua kỵ nhất.",o:[
  {n:"Xin cha dâng sớ từ chối tước vương",f:"tu",wx:"vua thôi nghi",lx:"nhà ngươi mất một tước lớn",rt:"Cha dâng ba sớ từ chối. Hoàng thượng chuẩn ở sớ thứ ba."},
  {n:"Để cha nhận, giữ vinh cho nhà",wx:"nhà ngươi lên tước vương",lx:"vua bắt đầu đếm quân của cha",go:(A,ok,G)=>ok?e67dad(G[0]):"",rt:"Sắc phong được đọc trước điện.",rf:"Hoàng thượng nhận lời rồi lại không ban sắc."},
  {n:"Xin đổi tước thành ruộng cho quân sĩ",wx:"quân sĩ nhớ ơn",lx:"Hộ bộ kêu ca, ngài phiền lòng",rt:"Ba nghìn mẫu ruộng chia cho lính già về quê.",rf:"Hộ bộ nói không đủ ruộng chia."}]},
 c2:{h:"{v} cúi đầu",w:"v",need:["v"],t:"{v} đến cung ngươi, lần đầu cúi đầu thật thấp: nhà nàng sắp bị liên lụy theo Binh bộ thượng thư.",o:[
  {n:"Tha cho {v}, không truy",wx:"{v} nợ ngươi một mạng",lx:"kẻ từng hại cha thoát",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} khóc, lạy ngươi ba lạy."},
  {n:"Đưa chứng cứ cũ lên Hoàng thượng",wx:"nhà {v} chịu tội",lx:"bị cho là đánh kẻ ngã",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cha {v} bị cách chức.",rf:"Hoàng thượng nói: “Thôi, trận đã xong.”"},
  {n:"Đòi {v} một lời hứa",wx:"{v} hứa đứng về phía ngươi",lx:"{v} hứa rồi trở mặt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} thề trước tượng Phật.",rf:"{v} gật đầu, rồi đêm ấy sai người báo hết về phủ cha nàng."}]},
 c3:{h:"Huynh trưởng ở lại",w:"maid",if:()=>rdEnd(10)!=="lose",t:"Huynh trưởng xin ở lại biên ải, không về kinh nhận thưởng. Thư huynh: “Muội nói giúp huynh một lời với cha.”",o:[
  {n:"Khuyên cha để huynh ở lại",wx:"nhà ngươi còn người giữ ải",lx:"vua thấy nhà ngươi vẫn bám quân",rt:"Cha gật: “Nó giống cha hồi trẻ.”"},
  {n:"Khuyên huynh về kinh",wx:"vua yên lòng",lx:"ải mất một tướng giỏi",go:(_A,_ok,G)=>e67bien(G[0]),rt:"Huynh về kinh, ngồi im suốt bữa tiệc mừng."},
  {n:"Xin Hoàng thượng phong huynh chức nhỏ ở ải",wx:"huynh có danh phận riêng",lx:"ngài thấy ngươi xin cho nhà",rt:"Huynh nhận chức Phó tổng binh.",rf:"Hoàng thượng nói: “Để sau.”"}]},
 c4:{h:"Vết tên của huynh",w:"maid",if:()=>rdEnd(10)==="lose",t:"Huynh trưởng nằm dưỡng thương ở phủ, vết tên chưa liền miệng. Ngự sử nói: người cầm tiền quân để quân lui cũng phải chịu tội.",o:[
  {n:"Gửi Thái y giỏi nhất đến phủ",wx:"huynh qua cơn nguy",lx:"tốn bạc, Ngự sử vẫn chờ",rt:"Thái y ở lại phủ ba đêm. Huynh tỉnh, đòi giấy viết thư cho cha."},
  {n:"Xin Hoàng thượng miễn xét huynh",wx:"huynh khỏi bị xét",lx:"ngài thấy ngươi xin cho nhà",rt:"Hoàng thượng phê: người bị thương vì nước, miễn xét.",rf:"Hoàng thượng nói: “Thua là thua.”"},
  {n:"Khuyên huynh tự dâng sớ nhận lỗi",wx:"triều thấy nhà ngươi biết phận",lx:"huynh mang vết trên công trạng",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Huynh gượng dậy viết sớ nhận lỗi, chữ run mà lời thẳng."}]},
 t1:{h:"Binh phù",w:"dad",t:"Đêm gia yến, {dad} hỏi nhỏ: “Binh phù này, cha nên giữ hay dâng lại?”",o:[
  {n:"Khuyên cha dâng lại binh phù",f:"phu",wx:"vua thôi kỵ",lx:"nhà ngươi mất binh quyền",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha gói binh phù vào khăn vàng."},
  {n:"Khuyên cha giữ, chờ vua đòi",wx:"nhà còn chỗ dựa",lx:"vua nghe được lời này",rt:"Cha gật, cất binh phù.",rf:"Có kẻ nghe trộm, sáng hôm sau Hoàng thượng đã biết."},
  {n:"Thưa: việc ấy cha tự quyết",wx:"không gánh lỗi nếu sai",lx:"cha con xa cách, phủ thôi dựa vào ngươi",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha nhìn ngươi lâu, rồi thở dài."}]},
 x1:{h:"Đêm trước buổi luận công",w:"emp",t:"Mai là buổi đại triều luận công. Đêm nay ở Ngự thư phòng, Hoàng thượng hỏi ngươi: “Nàng nói xem, trẫm nên thưởng phạt cha nàng thế nào?” Định đoạt vẫn là ở ngài.",o:[
  {n:"Xin thưởng quân sĩ, cha dâng binh phù",e:["win","mid"],rt:"Hoàng thượng nhận binh phù, rồi trả lại: “Trẫm tin nhà nàng.”",rf:"Hoàng thượng nhận binh phù, ban cha một tòa phủ yên tĩnh."},
  {n:"Xin cho cha giữ ải trọn đời",e:["win","lose"],rt:"Hoàng thượng chuẩn: “Nhạn Môn còn, nhà nàng còn.”",rf:"Hoàng thượng lạnh giọng: “Ải là của trẫm.” Cha bị giáng chức, thu ấn."},
  {n:"Xin cha từ quan về quê",e:"mid",lx:"nhà ngươi rời triều, ngươi tự đi đường mình",rt:"Hoàng thượng chuẩn, ban cha áo gấm về làng."}]}},
 E:{win:{tag:"Khải hoàn, vua trọng mà dè",w:"emp",t:"Cha được phong tước, tên khắc trên bia Nhạn Môn. Hoàng thượng trọng nhà ngươi, và cũng từ đó đếm từng bước của cha. Ngươi là con gái nhà trung liệt.",go:(_A,G)=>[e67dad(G[0]),e67bien(G[1])].join(" ")},
  mid:{tag:"Biên ải yên, cha lui về",t:"Biên ải tạm yên, cái giá đã trả không nhỏ. Cha lui về phủ, binh phù nằm trong kho vua. Nhà ngươi bình an, không còn ai sợ.",go:(_A,G)=>[e67dad(G[0]),e67bien(G[1])].join(" ")},
  lose:{tag:"Cha bị giáng, đường ngươi còn mở",w:"emp",t:"Cha bị giáng chức, thu ấn soái, về phủ đóng cửa. Ngươi không còn chỗ dựa ngoài triều, nhưng ngôi của ngươi vẫn giữ, và con đường trong cung vẫn còn mở.",go:(_A,G)=>e67dad(G[0])}}});
RD97L.push(rdRare({a:"dtq_bien_11",tag:"Bắt gián điệp giặc trong cung",w:"emp",n:"Dâng tên gián điệp giặc ẩn trong cung",
 path:["Nhờ gia đinh nhà bắt kẻ bám theo","Hỏi ông ai muốn vua ra ải","Lần theo kẻ hỏi đường trạm","Nhử nội gián","Hỏi huynh tên ba người","Tra xem ai ở Binh bộ","Nhờ người dò ba tờ sớ","Khuyên cha dâng lại binh phù","Xin cha dâng sớ từ chối tước vương"],bad:["Mặc kệ kẻ hỏi han","Bảo huynh lặng lẽ đuổi hắn đi","Khuyên cha giữ, chờ vua đòi"],x:[()=>S.tamco>=RR("dtq_bien_11").bar,"Tâm cơ từ "+RR("dtq_bien_11").bar],
 t:"Ngươi dâng lên một cuốn sổ nhỏ: tên một thái giám Nội vụ phủ, giờ hắn gặp người buôn da phương bắc, và mười hai bức quân báo hắn đã chép lén. Hoàng thượng đọc xong, đứng dậy: “Trận này, nàng thắng trước cả cha nàng.”",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" "),rw:"ngocboi",ti:"Người bắt gián điệp Bắc"}));

/* ---------- dtq_vu · Bức thư mưu phản ---------- */
/* Road of «Con gái Đại tướng quân» (ROAD_MAP §4.2). Chapter .4 = ARC67.dtq_vu (win: thư giả bị vạch, nhà {v} mất chức / mid: cha mất binh quyền,
   làm nhàn quan / lose: cha bị tước ấn, giam lỏng). The rival {v} (cast in .4, rank ≥ 1) is carried to .11.
   The road: the HAND that wrote the letter (.5), the COURIER (.6), cha recalled (.7), the palace HAND that carried it in (.8),
   the hearing at Đại Lý tự (.9, HISTORY CHECK), the last proof: paper, ink, seal (.10), the verdict (.11).
   BAL.road.dtq_vu.lim = months left before Đại Lý tự opens the hearing (.9). */
const DTQV_LIM=()=>BAL.road.dtq_vu.lim;
/* how many earlier chapters of this road ended won */
const DTQV_WON=()=>[5,6,7,8,9,10].filter(n=>rdEnd(n)==="win").length;

rdDef("dtq_vu",5,{t:"Nét chữ giả",w:"emp",sj:"bàn tay đã viết bức thư giả",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Bức thư giả bắt chước nét chữ của cha đến từng nét móc. Người viết được như thế không nhiều: ký thất trong trại, thư thủ Hàn lâm viện, hay một kẻ từng ngày ngày chép thư cho cha. Tìm ra bàn tay ấy.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Bức thư thứ hai",w:"emp",if:RDW(1),t:"Nhà {v} đã mất chức, nhưng đến cùng không ai khai ai cầm bút. Tháng trước, một bức thư thứ hai cùng nét chữ ấy lại xuất hiện ở Binh bộ.",o:[
  {n:"Xin Hoàng thượng cho xem thư thứ hai",wx:"thấy cùng một bàn tay",lx:"ngài phiền vì chuyện cũ khơi lại",rt:"Hoàng thượng cho xem. Vẫn chữ ‘quốc’ thiếu nét như lần trước.",rf:"Hoàng thượng nói: “Án đã xong, nàng còn muốn gì?”"},
  {n:"Viết thư hỏi cha ai từng chép thư cho ông",f:"ds",wx:"có danh sách người quen nét chữ cha",lx:"thư nhà bị dòm ngó, tốn sức",rt:"Cha hồi: bốn người, trong đó có một ký thất bị đuổi ba năm trước."},
  {n:"Lặng im, sợ khơi lại án",wx:"triều thấy nhà ngươi không thù dai",lx:"tiếng nhà vẫn còn vết",rt:"Ngươi im lặng. Bức thư thứ hai nằm yên ở Binh bộ."}]},
 s2:{h:"Không có lửa sao có khói",w:"maid",if:RDW(0),t:()=>rdEnd(4)==="lose"?"Cha bị giam lỏng trong phủ chờ xét. Bức thư giả nằm ở Đại Lý tự, mà chưa ai hỏi xem ai đã viết nó.":"Cha về kinh làm nhàn quan. Ngoài triều người ta vẫn nói: không có lửa sao có khói. Muốn rửa sạch, phải tìm ra bàn tay đã viết thư.",o:[
  {n:"Nhờ người chép lại bức thư giả",f:"ban",wx:"có bản chép để đối chiếu",lx:"Đại Lý tự biết ngươi dò hồ sơ",rt:"Một thư lại Đại Lý tự chép cho ngươi từng nét.",rf:"Thư lại báo lên quan trên rằng có người trong cung dò hồ sơ."},
  {n:"Viết thư hỏi cha ai quen nét chữ ông",f:"ds",wx:"có danh sách người quen nét chữ cha",lx:"tốn sức, thư nhà bị dòm ngó",rt:"Cha hồi: bốn người, trong đó có một ký thất bị đuổi ba năm trước."},
  {n:"Chép kinh cầu cho cha",wx:"cả cung thấy lòng hiếu",lx:"Sức −, án vẫn treo",rt:"Ngươi chép kinh, mực nhòe nước mắt."}]},
 c1:{h:"Ký thất cũ của cha",w:"maid",t:"Ký thất từng chép thư cho cha mười năm, bị đuổi vì ăn bớt bổng quân. Ba năm nay không ai thấy hắn, chỉ nghe nói hắn sống sung túc lạ thường.",o:[
  {n:"Cho người tìm nhà hắn",f:"mau",wx:"lấy được giấy tờ có nét chữ hắn",lx:"hắn biết bị tìm, trốn kỹ hơn",rt:"Trong nhà hắn có một chồng giấy tập viết, toàn là nét chữ của cha ngươi.",rf:"Nhà trống trơn, bếp còn ấm tro."},
  {n:"Hỏi người hàng xóm ai nuôi hắn",wx:"biết bạc từ đâu đến",lx:"lời đồn lan ra phố",rt:"Hàng xóm kể: mỗi tháng có xe ngựa đến, rèm thêu hoa văn của một phủ quyền quý.",rf:"Hàng xóm sợ, đóng cửa không nói."},
  {n:"Nhờ huynh trưởng báo Hình bộ truy nã hắn",wx:"việc đi đúng phép",lx:"cả kinh biết, kẻ đứng sau kịp chuẩn bị",rt:"Hình bộ dán bảng truy nã khắp cửa thành."}]},
 c2:{h:"Hàn lâm viện",w:"emp",t:"Thư thủ Hàn lâm viện chép chiếu chỉ, nét nào cũng bắt chước được. Một vị học sĩ già ở đó từng đọc thư cha ngươi gửi về triều suốt hai mươi năm.",o:[
  {n:"Nhờ huynh trưởng xin học sĩ già đối chiếu nét chữ",f:"hl",wx:"có lời một bậc túc nho",lx:"học sĩ từ chối, lời đồn ngươi ép người",rt:"Học sĩ nhìn một lúc: “Người viết thư này học chữ cha nàng, nhưng tay hắn quen chữ Khải hơn chữ Thảo.”",rf:"Học sĩ nói: “Lão già rồi, mắt kém.”"},
  {n:"Xin Hoàng thượng cho Hàn lâm viện xét",wx:"việc xét có danh chính",lx:"ngài thấy ngươi làm lớn chuyện",rt:"Hoàng thượng chuẩn, giao Hàn lâm viện xét trong một tháng.",rf:"Hoàng thượng nói: “Hàn lâm viện không phải chỗ xử án.”"},
  {n:"Tự đối chiếu bằng thư nhà",wx:"tự thấy chỗ khác",lx:"thức trắng, Sức −",rt:"Dưới đèn, ngươi thấy: cha viết nét ngang từ trái sang, kẻ giả thì kéo ngược."}]},
 c3:{h:"Thầy dạy chữ nhà {v}",w:"v",need:["v"],t:"Trong buổi thưởng hoa, {v} khoe: nhà nàng từng nuôi một thầy dạy chữ, nét của ai hắn cũng chép được, đến Thái hậu còn khen.",o:[
  {n:"Hỏi khéo thầy ấy giờ ở đâu",wx:"biết thầy ấy là ai",lx:"{v} biết ngươi dò",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} buột miệng: “Thầy ấy theo cha ngươi ra trại năm nào, sau bị đuổi.”",rf:"{v} cười: “Tỷ tỷ hỏi làm gì?”"},
  {n:"Vờ khen, xin mượn thầy ấy",wx:"{v} có thể lộ dấu",lx:"{v} biết ngươi muốn gì",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} lỡ lời: “Thầy ấy giờ không tiện ra mặt.”",rf:"{v} đổi sắc mặt, đứng dậy cáo lui."},
  {n:"Không để ý lời khoe",wx:"không gây thêm thù",lx:"lỡ một manh mối",rt:"Ngươi khen hoa đẹp, không hỏi gì."}]},
 t1:{h:"Chữ ‘quốc’ thiếu nét",w:"maid",t:"Chữ ‘quốc’ trên thư giả thiếu một nét chấm. Cha ngươi chưa từng viết vậy; nhưng ký thất cũ thì có thói ấy từ thời đi học.",o:[
  {n:"Gom giấy tờ cũ của ký thất",f:"mau",wx:"có mẫu chữ thật của hắn",lx:"giấy tờ ở Binh bộ, người ta biết ngươi lấy",rt:"Sổ lương cũ của trại có hơn trăm chữ ‘quốc’ do hắn viết, chữ nào cũng thiếu chấm.",rf:"Sổ lương cũ đã bị lấy mất từ trước."},
  {n:"Hỏi những người cùng học với hắn",wx:"có người làm chứng thói chữ",lx:"tốn công, lời người làm chứng yếu",rt:"Hai đồng môn cũ nhớ: “Hắn viết chữ ‘quốc’ thiếu chấm, thầy đánh mãi không sửa.”"},
  {n:"Giữ kín điều này",wx:"kẻ giả không biết ngươi đã thấy",lx:"chưa ai biết chỗ sai ấy",rt:"Ngươi chỉ ghi vào sổ riêng."}]},
 x1:{h:"Đối chiếu nét chữ",w:"emp",t:"Hoàng thượng chuẩn cho Hàn lâm học sĩ và Đại Lý tự khanh đối chiếu nét chữ. Ngươi không được có mặt; những gì ngươi tìm được phải đến tay họ qua người nhà.",o:[
  {n:"Nhờ huynh trưởng nộp mẫu chữ của ký thất",e:["win","lose"],rt:"Đặt cạnh nhau, chữ ‘quốc’ thiếu chấm hiện ra ở cả hai. Đại Lý tự khanh gật đầu.",rf:"Đại Lý tự khanh nói: thiếu một nét chấm thì ai cũng có thể thiếu."},
  {n:"Xin Hoàng thượng giao Hàn lâm viện đối chiếu",e:["win","mid"],rt:"Học sĩ già đọc to từng chỗ khác. Cả điện im lặng.",rf:"Hàn lâm viện chỉ nói: nét chữ “có chỗ đáng ngờ”."},
  {n:"Xin ngài đợi thêm chứng cứ",e:"mid",lx:"án treo thêm, cha thêm ngày bị nghi",rt:"Hoàng thượng gật: “Được, trẫm đợi.”"}]}},
 E:{win:{tag:"Tìm ra bàn tay viết thư",w:"emp",t:"Bàn tay viết thư là ký thất cũ của cha. Hình bộ dán bảng truy nã tên hắn; triều thần thôi xì xào về nét chữ của Đại tướng quân.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Nghi một người, chưa có chứng",t:"Ai cũng ngờ ký thất cũ, nhưng chưa ai đủ chứng để bắt. Án của cha vẫn treo."},
  lose:{tag:"Bàn tay viết thư biến mất",w:"emp",t:"Ký thất cũ biến mất như chưa từng có. Ngự sử nói: không tìm được ai viết, thì người viết chính là Đại tướng quân.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_vu",6,{t:"Kẻ đưa thư",w:"maid",sj:"người lính trạm đã mang thư",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Bức thư không tự bay từ trại về kinh. Có một lính trạm nhận thư từ tay ký thất và đưa nó vào kinh. Hắn còn sống, đang trốn, và cả hai bên đều đang tìm hắn.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ký thất khai một chuyện",w:"maid",if:RDW(1),t:"Tờ truy nã làm ký thất cũ sợ. Hắn nhắn người đến: thư giả hắn viết đã giao cho một lính trạm, rồi lính trạm ấy biến mất.",o:[
  {n:"Hứa tha cho ký thất nếu khai thêm",f:"tram",wx:"biết tên và quê lính trạm",lx:"hứa tha kẻ làm giả, tiếng không đẹp",rt:"Ký thất viết ra tên lính trạm và tên làng hắn.",rf:"Ký thất sợ, không đến chỗ hẹn."},
  {n:"Nhờ huynh trưởng báo Hình bộ bắt ký thất",wx:"giữ kẻ làm giả trong ngục",lx:"hắn nghẹn lời, không khai thêm",rt:"Ký thất bị bắt ở một quán trọ ngoài thành.",rf:"Hình bộ đến chậm, quán trọ đã trống."},
  {n:"Cho người theo dõi hắn",wx:"hắn dẫn đường",lx:"tốn bạc, hắn có thể nhận ra",rt:"Ký thất ra ngoại thành, vào một ngôi chùa đổ."}]},
 s2:{h:"Lời đồn về lính trạm",w:"maid",if:RDW(0),t:"{maid} nghe ở chợ: có một lính trạm trốn khỏi trạm Lư Câu đúng tuần bức thư giả vào kinh, ai hỏi đến cũng bị dọa.",o:[
  {n:"Cho người về trạm Lư Câu dò",f:"tram",wx:"biết quê lính trạm",lx:"người của ngươi bị trạm trưởng đuổi",rt:"Trạm trưởng nói nhỏ tên và quê của hắn.",rf:"Trạm trưởng nói không có ai bỏ trốn cả."},
  {n:"Nhờ {maid} hỏi người nhà bếp các phủ",wx:"có lời đồn về chỗ hắn trốn",lx:"{maid} bị nghi",rt:"Một bà bếp kể: có người lạ trốn ở chùa đổ phía tây.",rf:"{maid} bị gác cửa cung hạch hỏi."},
  {n:"Chờ người khác tìm ra",wx:"không tự dấn thân",lx:"bên kia có thể tìm ra trước",rt:"Ngươi chờ."}]},
 c1:{h:"Vợ con lính trạm",w:"maid",t:"Vợ con lính trạm ở làng, ngày ngày ra đầu ngõ ngóng chồng. Có người lạ đã đến hỏi họ hai lần.",o:[
  {n:"Đưa vợ con hắn về chỗ an toàn",f:"nha",wx:"hắn sẽ tin ngươi",lx:"tốn bạc, giữ người là việc lớn",rt:"Vợ con lính trạm được đưa đến một trang trại của nhà ngươi."},
  {n:"Dùng vợ con hắn dụ hắn ra",wx:"hắn tự lộ diện",lx:"tiếng ác nếu lộ",rt:"Đêm ấy, có bóng người lén về làng.",rf:"Người lạ kia đến trước, vợ con hắn bị đưa đi."},
  {n:"Để họ yên",wx:"không động đến người vô tội",lx:"bên kia có thể dùng họ",rt:"Ngươi không động đến làng ấy."}]},
 c2:{h:"Sổ ra vào cửa thành",w:"eun",t:"Tổng quản {eun} có người quen giữ sổ ra vào cửa thành. Tuần bức thư vào kinh, sổ ghi một lính trạm được ai đó dẫn vào.",o:[
  {n:"Biếu lễ, xin xem sổ",f:"so",wx:"biết ai dẫn hắn vào",lx:"nợ Tổng quản một ân",rt:"Sổ ghi: dẫn vào là một thái giám có thẻ bài hậu cung.",rf:"Trang sổ tuần ấy đã bị rọc mất."},
  {n:"Xin Hoàng thượng cho tra sổ",wx:"tra có lệnh vua",lx:"ngài thấy ngươi làm lớn",rt:"Ngự tiền thị vệ mang sổ đến tận Dưỡng Tâm điện.",rf:"Hoàng thượng nói: “Sổ cửa thành thì liên quan gì?”"},
  {n:"Cảm tạ, không dám nhờ",wx:"Tổng quản quý ngươi",lx:"tốn lễ tạ, lỡ một manh mối",rt:"Tổng quản cúi đầu, không nhắc lại."}]},
 c3:{h:"Người của {v} cũng đi tìm",w:"v",need:["v"],t:"{maid} báo: thái giám của {v} xin xuất cung ba lần trong một tháng, mỗi lần đều về phía tây thành.",o:[
  {n:"Cho người bám theo thái giám ấy",wx:"biết bên kia tìm đến đâu",lx:"bị phát hiện, {v} kêu oan",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"Thái giám ấy hỏi đường đến chùa đổ phía tây.",rf:"Thái giám ấy quay lại, nhìn thẳng người của ngươi."},
  {n:"Báo Hoàng hậu: thái giám xuất cung quá nhiều",need:["hh"],wx:"{v} bị giữ chân",lx:"Hoàng hậu thấy ngươi soi mói",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hoàng hậu cấm thái giám ấy xuất cung một tháng.",rf:"Hoàng hậu nói: “Việc cung nào cung ấy lo.”"},
  {n:"Mặc kệ",wx:"không lộ ý",lx:"bên kia đi trước một bước",rt:"Ngươi giả như không biết."}]},
 t1:{h:"Chùa đổ phía tây",w:"maid",t:"Lính trạm trốn trong một ngôi chùa đổ phía tây thành. Hắn run rẩy: “Ai bắt tiểu nhân về, tiểu nhân chết chắc.”",o:[
  {n:"Hứa bảo toàn cả nhà hắn",f:"tin",wx:"hắn chịu theo ngươi",lx:"hắn không tin, bỏ chạy lần nữa",rt:"Hắn quỳ xuống: “Tiểu nhân xin theo {N}.”",rf:"Hắn trèo tường sau chùa, chạy mất."},
  {n:"Nhờ gia đinh nhà canh chùa, chờ",wx:"hắn không thoát được",lx:"tốn bạc nuôi người, bên kia có thể ra tay trước",rt:"Hai gia đinh nhà ngươi giả làm khất cái ngồi trước cổng chùa."},
  {n:"Ép hắn viết lời khai ngay",f:"khai",wx:"có lời khai trên giấy",lx:"lời khai bị ép, dễ bị bác",rt:"Hắn viết: nhận thư từ ký thất, giao cho một thái giám ở cửa hông hoàng thành.",rf:"Hắn viết rồi xé, khóc không thành tiếng."}]},
 x1:{h:"Đưa hắn về",w:"maid",t:"Bên kia đã biết chỗ chùa đổ. Đêm nay phải đưa lính trạm đi, hoặc mất hắn.",o:[
  {n:"Nhờ huynh trưởng đưa thẳng vào Hình bộ",e:["win","lose"],rt:"Lính trạm vào Hình bộ lúc trời rạng, có dấu nhận và tên quan coi ngục.",rf:"Giữa đường có kẻ chém ngã xe. Lính trạm không qua khỏi."},
  {n:"Giấu hắn ở trang trại nhà ngươi",e:["win","mid"],rt:"Hắn ở trang trại với vợ con, sống, an toàn, chờ ngày khai.",rf:"Hắn sống, nhưng sợ quá, chỉ chịu khai trên giấy."},
  {n:"Chỉ lấy lời khai viết tay, thả hắn đi",e:"mid",lx:"mất nhân chứng sống",rt:"Hắn điểm chỉ vào lời khai, rồi đi về nam."}]}},
 E:{win:{tag:"Nhân chứng sống trong tay",w:"maid",t:"Lính trạm sống, khai rõ: thư giả đi từ tay ký thất đến tay một thái giám có thẻ bài hậu cung.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Chỉ có lời khai trên giấy",t:"Có lời khai điểm chỉ, nhưng không có người đứng ra nói trước công đường."},
  lose:{tag:"Lính trạm chết dọc đường",t:"Lính trạm chết giữa đường. Hình bộ ghi: bị cướp giết. Người ta nói nhỏ: ai dính vào án Đại tướng quân đều không sống.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_vu",7,{t:"Cha bị triệu về",w:"dad",sj:"thánh chỉ triệu cha về đối chất",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Ngự sử đài dâng sớ: án thư giả phải xử trước công đường. Thánh chỉ triệu {dad} về kinh đối chất. Phủ nhà ngươi bị canh ngày đêm.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Xe cha vào thành",w:"dad",if:RDW(1),t:()=>rdEnd(4)==="mid"?"Cha đang làm nhàn quan thì cấm quân vây phủ, mời ông lên kiệu về Đại Lý tự. Ngươi có nhân chứng trong tay, nhưng chưa ai cho ngươi nói.":"Xe cha vào cổng thành giữa hai hàng cấm quân. Ngươi có nhân chứng trong tay, nhưng chưa ai cho ngươi nói.",o:[
  {n:"Xin Hoàng thượng cho nhân chứng ra trước",f:"truoc",wx:"cha khỏi bị giam ngục",lx:"ngài cho là ngươi giành quyền Đại Lý tự",rt:"Hoàng thượng chuẩn: cha giam ở phủ, chờ nhân chứng ra công đường.",rf:"Hoàng thượng nói: “Đâu ra đó.”"},
  {n:"Giữ nhân chứng kín, chờ ngày xử",wx:"bên kia không biết ngươi có gì",lx:"cha chịu nhục thêm mấy tháng",rt:"Ngươi không nhắc đến nhân chứng với ai."},
  {n:"Gửi áo ấm, thức ăn cho cha",wx:"cha biết con còn đó",lx:"tốn bạc, không đổi được gì",rt:"Cha nhận áo, gửi lại một câu: “Giữ mình.”"}]},
 s2:{h:"Phủ bị vây",w:"dad",if:RDW(0),t:()=>rdEnd(4)==="lose"?"Cha đang bị giam lỏng thì có chỉ chuyển về Đại Lý tự. Mẹ ngươi đứng ở cổng phủ nhìn theo, không khóc.":"Cấm quân vây phủ, áp giải cha về Đại Lý tự. Người nhà không ai được ra vào.",o:[
  {n:"Quỳ ngoài Dưỡng Tâm điện xin cho cha giữ thể diện",wx:"cha khỏi đeo gông",lx:"bị nói là ép vua",rt:"Hoàng thượng sai tháo gông cho cha.",rf:"Ngươi quỳ đến tối, chỉ có Tổng quản ra khuyên về."},
  {n:"Gửi bạc lo cho coi ngục",wx:"cha không bị làm khó",lx:"để lại dấu đút lót",rt:"Coi ngục dọn cho cha một gian sạch, có đèn đọc sách."},
  {n:"Viết thư an ủi mẹ",wx:"nhà còn vững",lx:"không giúp được cha",rt:"Mẹ hồi thư: “Con lo việc của con.”"}]},
 c1:{h:"Quân cũ của cha",w:"maid",t:"Tin cha bị áp giải lan ra biên ải. Bộ tướng cũ của cha dâng thư đòi về kinh xin cho chủ soái.",o:[
  {n:"Viết thư can họ giữ ải",wx:"Hoàng thượng thấy nhà ngươi không cậy quân",lx:"bộ tướng cho là ngươi bỏ cha",rt:"Bộ tướng lặng lẽ giữ ải, chỉ gửi một lá thư có hàng vạn lính ký tên."},
  {n:"Để thư bộ tướng dâng lên",wx:"thanh thế của cha",lx:"Hoàng thượng sợ quân theo cha",rt:"Hoàng thượng đọc, im lặng hồi lâu: “Cha nàng được lòng người.”",rf:"Hoàng thượng đập án: “Quân đội của ai đây?”"},
  {n:"Báo Hoàng thượng trước khi thư đến",wx:"ngài thấy ngươi thật thà",lx:"bộ tướng cho là ngươi tố họ",rt:"Hoàng thượng gật: “Nàng nói trước, trẫm nhớ.”",rf:"Bộ tướng biết ngươi báo trước, gửi thư trách."}]},
 c2:{h:"{v} đến thăm",w:"v",need:["v"],t:"{v} đến cung ngươi, mang theo trà ngon: “Nghe nói cha tỷ tỷ vào Đại Lý tự rồi. Muội lo lắm.”",o:[
  {n:"Đáp lạnh: không dám phiền",wx:"không để lộ gì",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đặt trà xuống, cười nhạt rồi về."},
  {n:"Giả yếu đuối để nàng sơ ý",wx:"{v} lỡ lời",lx:"{v} không mắc",rt:"{v} buột miệng: “Thái giám bên muội nói Đại Lý tự đã có đủ chứng rồi.”",rf:"{v} chỉ an ủi qua loa."},
  {n:"Hỏi thẳng nàng có dính vào không",wx:"{v} hoảng",lx:"{v} khóc đến Hoàng thượng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt, đánh rơi chén trà.",rf:"Đêm ấy, {v} khóc trước Hoàng thượng rằng ngươi vu cho nàng."}]},
 c3:{h:"Hoàng thượng dặn",w:"emp",t:"Hoàng thượng dặn ngươi: án đang xét, không được qua lại phủ nhà, không được gửi thư cho Đại Lý tự.",o:[
  {n:"Tuân chỉ, đóng cửa cung",wx:"ngài yên lòng",lx:"cha một mình trước công đường",rt:"Ngươi khép cửa cung, chép kinh."},
  {n:"Xin ngài cho gặp cha một lần",f:"gap",wx:"được gặp cha",lx:"ngài phật ý",rt:"Hoàng thượng gật: “Một lần, có thị vệ đi cùng.”",rf:"Hoàng thượng nói: “Đã dặn rồi.”"},
  {n:"Vâng dạ, nhưng lén gửi thư",wx:"cha biết ngươi có chứng",lx:"lộ ra là kháng chỉ",rt:"Thư đến tay cha trong giỏ cơm.",rf:"Coi ngục bắt được thư, dâng lên ngài."}]},
 t1:{h:"Gặp cha",w:"dad",t:"{dad} ngồi trong gian giam, tóc bạc trắng chỉ sau một tháng. Ông hỏi: “Con có chắc kẻ hại cha là ai không?”",o:[
  {n:"Kể hết những gì đã tìm được",f:"cha",wx:"cha biết cách đối đáp",lx:"tai vách mạch rừng",rt:"Cha nghe xong, gật đầu: “Đủ. Cha biết phải nói gì.”"},
  {n:"Khuyên cha nhận phần trị quân lỏng",f:"nhan",wx:"tội nhẹ đi",lx:"cha mang một vết trên công trạng",rt:"Cha cười buồn: “Được, cha nhận phần ấy.”"},
  {n:"Chỉ hỏi han sức khỏe",wx:"cha yên lòng",lx:"bỏ lỡ dịp bàn kế",rt:"Hai cha con nói chuyện nhà đến khi thị vệ gõ cửa."}]},
 x1:{h:"Chỗ giam của cha",w:"emp",t:"Đại Lý tự xin giam cha trong ngục để tiện tra hỏi. Hoàng thượng hỏi ý ngươi trước khi phê.",o:[
  {n:"Xin cho cha giam ở phủ",e:["win","lose"],rt:"Hoàng thượng phê: giam ở phủ, Đại Lý tự đến hỏi tại phủ.",rf:"Hoàng thượng phê: vào ngục. Ngài cho là ngươi xin quá phận."},
  {n:"Nhờ Thái hậu nói giúp",need:["th"],e:["win","mid"],rt:"Thái hậu nói: “Công thần già, giam ngục thì lạnh lòng tướng sĩ.” Cha được giam ở phủ.",rf:"Thái hậu chỉ xin cho cha một gian ngục sạch."},
  {n:"Để Đại Lý tự định",e:"mid",lx:"cha vào ngục",rt:"Ngươi chỉ cúi đầu: “Thần thiếp không dám xen việc án.”"}]}},
 E:{win:{tag:"Cha giữ được thể diện",w:"dad",t:"Cha được giam tại phủ, áo mũ còn nguyên. Tướng sĩ ngoài ải biết Hoàng thượng chưa định tội chủ soái của họ.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha vào ngục, được đối đãi tử tế",t:"Cha vào ngục Đại Lý tự, gian sạch, có đèn. Ngày xử còn xa.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Cha vào ngục, bị tra hỏi",w:"emp",t:"Cha vào ngục và bị tra hỏi ba đêm liền. Trong cung, người ta tránh đi qua cửa cung ngươi.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_vu",8,{t:"Bàn tay trong cung",w:"v",sj:"thái giám đã đưa thư giả vào cung",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Thư giả qua cửa hông hoàng thành trong tay một thái giám có thẻ bài hậu cung. Thẻ bài ấy thuộc cung {v}. Bắt được hắn là bắt được bàn tay trong cung.",
 p:[["s1","s2"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Thẻ bài cung {v}",w:"v",need:["v"],if:RDW(1),t:"Cha giữ được thể diện, Đại Lý tự đến phủ hỏi rất dè dặt. Bên kia vội: thái giám cung {v} xin nghỉ bệnh đúng hôm ấy.",o:[
  {n:"Sai người đến hỏi thăm bệnh",wx:"biết hắn không bệnh",lx:"{v} biết ngươi để ý",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Người đi thăm thấy hắn đang gói ghém đồ đạc.",rf:"Người của {v} chặn ngoài cửa."},
  {n:"Xin Tổng quản giữ hắn trong cung",f:"giu",wx:"hắn không ra được cửa cung",lx:"Tổng quản không dám đụng cung {v}",rt:"Tổng quản ra lệnh: không thái giám nào được xuất cung tháng này.",rf:"Tổng quản nói: “Nô tài không có cớ.”"},
  {n:"Chưa động, chờ thời",wx:"hắn chưa biết bị nghi",lx:"hắn có thể trốn",rt:"Ngươi chưa động gì."}]},
 s2:{h:"Gốc cây ở cửa hông",w:"maid",if:RDW(0),t:"Cha trong ngục. {maid} nghe người quét sân cửa hông kể: tuần ấy có thái giám đứng chờ dưới gốc hòe cả buổi, đeo thẻ bài hậu cung.",o:[
  {n:"Hỏi người quét sân thẻ bài màu gì",wx:"biết thẻ bài cung nào",lx:"người quét sân sợ, đi kể khắp nơi",rt:"Người quét sân nhớ: thẻ bài có tua xanh, của cung {v}.",rf:"Người quét sân lắc đầu, không nhớ."},
  {n:"Xin xem sổ thẻ bài ở Nội vụ phủ",f:"the",wx:"có sổ ghi ai mượn thẻ",lx:"Nội vụ phủ báo cho các cung",rt:"Sổ ghi: hôm ấy thẻ bài cung {v} được một thái giám mượn đi.",rf:"Nội vụ phủ nói sổ đang sửa."},
  {n:"Lo trước cho cha trong ngục",wx:"cha được ăn ấm",lx:"bạc đi, việc tra không tiến",rt:"Cơm nóng đến tay cha mỗi ngày."}]},
 c1:{h:"Thái giám ấy là ai",w:"eun",t:"Tổng quản {eun} cho biết: thái giám ấy vào cung từ nhỏ, có một người cháu trai đang học ở Quốc Tử giám, sống bằng bạc của ai đó.",o:[
  {n:"Lo cho cháu hắn, đổi lấy lời khai",f:"chau",wx:"hắn có lý do để khai",lx:"hắn coi như bị mua, lời khai yếu",rt:"Cháu hắn nhận được học bổng, và một mẩu giấy: “Có người lo cho con.”",rf:"Cháu hắn từ chối bạc lạ."},
  {n:"Dọa sẽ làm hỏng đường học của cháu hắn",wx:"hắn sợ",lx:"tiếng ác nếu lộ",rt:"Hắn run tay đánh rơi khay trà.",rf:"Hắn báo ngay với {v}."},
  {n:"Không động đến người nhà hắn",wx:"tay sạch",lx:"hắn không có lý do để khai",rt:"Ngươi gạt ý ấy đi."}]},
 c2:{h:"{v} thăm dò",w:"v",need:["v"],t:"{v} cho người mời ngươi ngắm trăng, giọng ngọt như mật: “Tỷ tỷ gầy đi nhiều. Án của cha tỷ tỷ… có cần muội nói giúp không?”",o:[
  {n:"Nhận lời, xem nàng đòi gì",f:"deal",wx:"biết cái giá nàng đưa ra",lx:"người ta thấy ngươi thân {v} giữa lúc án",rt:"{v} nói: chỉ cần cha ngươi nhận tội nhẹ, nhà nàng sẽ không nói thêm.",rf:"{v} cười, chỉ nói chuyện trăng."},
  {n:"Từ chối, không đi",wx:"không để bị lợi dụng",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi sai người trả lời: đang chép kinh."},
  {n:"Đi, mang theo {maid} ghi lời",wx:"có người nghe lời nàng",lx:"{v} nhận ra, im lặng",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"{maid} nhớ từng chữ {v} nói về ‘thư’.",rf:"{v} thấy {maid}, đổi sang nói chuyện thêu thùa."}]},
 c3:{h:"Kẻ sắp trốn",w:"maid",t:"Đêm qua, thái giám ấy hỏi mượn áo của một người nấu bếp. Có lẽ hắn định trốn theo xe chở nước sáng mai.",o:[
  {n:"Chặn xe nước",f:"chan",wx:"hắn không ra được",lx:"chặn nhầm, mang tiếng làm loạn",rt:"Hắn bị lôi ra từ giữa hai thùng nước.",rf:"Xe nước không có ai, hắn đã đi cửa khác."},
  {n:"Báo Tổng quản canh cửa",wx:"cửa cung đóng chặt",lx:"tốn lễ, hắn biết đã bị để ý",rt:"Tổng quản cho đổi giờ xe nước."},
  {n:"Để hắn đi, cho người bám theo",wx:"hắn dẫn đến người đứng sau",lx:"mất dấu thì mất người",rt:"Hắn ra khỏi cung, đi thẳng đến một phủ ở phía đông.",rf:"Người bám theo mất dấu ở chợ."}]},
 t1:{h:"Bàn tay trong cung",w:"v",need:["v"],t:"Mọi dấu đều về cung {v}. Nhưng thái giám ấy mà khai, {v} chỉ cần nói: “Là tên nô tài ấy tự ý làm.”",o:[
  {n:"Gom đủ dấu vết quanh {v}",f:"ev",wx:"chứng không chỉ dựa vào một người",lx:"{v} biết, ghi oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi xếp từng thứ vào một tráp: thẻ bài, sổ, lời người quét sân."},
  {n:"Gặp riêng {v}, cho nàng một lối lui",f:"deal",wx:"{v} có thể bỏ người đứng sau",lx:"{v} cắn ngược",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} cúi đầu: “Muội chỉ làm theo lời cha.”",rf:"{v} cười nhạt: “Tỷ tỷ có chứng gì?”"},
  {n:"Chỉ nhắm vào thái giám",wx:"không gây chiến với cả một cung",lx:"{v} thoát thân",rt:"Ngươi chỉ ghi tên một người."}]},
 t2:{h:"Thẻ bài không chủ",w:"eun",if:A=>!rv67(A,"v"),t:"Cung từng giữ thẻ bài ấy nay không còn chủ. Thái giám kia biết thế, càng cứng miệng: không ai đứng sau thì hắn cũng chẳng có ai để khai.",o:[
  {n:"Gom đủ dấu vết quanh thẻ bài",f:"ev",wx:"chứng không chỉ dựa vào một người",lx:"mất sức mà dấu vết đã nguội",rt:"Ngươi xếp từng thứ vào một tráp: thẻ bài, sổ, lời người quét sân."},
  {n:"Cho người dò ai trả bạc cho hắn",wx:"lần ra kẻ trả bạc",lx:"tin dò la lọt ra ngoài",rt:"Người của ngươi lần ra một món bạc gửi từ ngoài cung.",rf:"Kẻ trả bạc đã cắt đứt mối."},
  {n:"Chỉ nhắm vào thái giám",wx:"việc gọn",lx:"kẻ đứng sau thoát thân",rt:"Ngươi chỉ ghi tên một người."}]},
 x1:{h:"Bắt bàn tay trong cung",w:"emp",t:"Hoàng thượng cho phép tra thái giám ấy. Ngươi chọn cách để hắn mở miệng.",o:[
  {n:"Xin Thận hình ty tra hỏi công khai",e:["win","lose"],rt:"Thái giám khai: chính {v} đưa thư cho hắn, dặn đặt vào chồng tấu.",rf:"Thái giám nhận hết về mình rồi cắn lưỡi không nói nữa."},
  {n:"Gặp riêng hắn, nói về người cháu",e:["win","mid"],rt:"Hắn khóc, viết lời khai, điểm chỉ, chịu ra công đường.",rf:"Hắn khai, nhưng không chịu ra công đường."},
  {n:"Giao Tổng quản tự xử",e:"mid",lx:"hắn bị đuổi khỏi cung, không khai gì",rt:"Tổng quản đuổi hắn về quê."}]}},
 E:{win:{tag:"Thái giám cung {v} khai",w:"v",t:"Lời khai có tên {v}. Nàng quỳ trước Hoàng thượng, khóc rằng chỉ nghe lời nhà mẹ đẻ.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Bàn tay trong cung đã lộ, chưa khai",t:"Ai cũng biết thái giám ấy là người cung {v}, nhưng không có lời nào đứng trước công đường."},
  lose:{tag:"Thái giám chết ở giếng",t:"Sáng hôm sau, người ta vớt thái giám ấy lên từ giếng sau Ngự thiện phòng. {v} sai người tụng kinh cho hắn ba ngày.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}}}});

/* HISTORY CHECK: (1) Đại Lý tự as the hearing court for a treason case against a general — or a Tam pháp ty joint hearing (Hình bộ +
   Đô sát viện + Đại Lý tự) as in Minh/Thanh? (2) a consort may not appear or petition the court herself (hậu cung bất đắc can chính):
   her evidence must reach it through a proper hand (Ngự sử dâng sớ, Thái hậu, the throne). (3) đối chất = confrontation of accused and
   witnesses before the judges — fits a general under arrest. */
rdDef("dtq_vu",9,{t:"Đối chất",w:"emp",sj:"phiên đối chất ở Đại Lý tự",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Đại Lý tự sắp mở phiên đối chất. Hậu cung không được đặt chân đến công đường, không được dâng chứng thẳng. Chứng cứ của ngươi phải đến tay quan xử qua một bàn tay đúng phép.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Chứng trong tay, cửa đóng",w:"emp",if:RDW(1),t:()=>`Lời khai thái giám cung {v} nằm trong tráp của ngươi. Còn ${kitNumVi(DTQV_LIM())} tháng nữa Đại Lý tự mở phiên, mà hậu cung không có đường đến công đường.`,o:[
  {n:"Sao lời khai làm ba bản",f:"sao",wx:"mất một bản còn hai",lx:"thêm bản thì thêm chỗ lọt",rt:"Ba bản sao, mỗi bản một nơi cất."},
  {n:"Xin Hoàng thượng tự đọc lời khai",f:"vua",wx:"ngài biết trước phiên xử",lx:"ngài cho là ngươi đi tắt",rt:"Hoàng thượng đọc xong, gõ lên án: “Để Đại Lý tự xét. Trẫm sẽ nghe tâu lại.”",rf:"Hoàng thượng nói: “Đưa đến đúng chỗ của nó.”"},
  {n:"Giữ kín đến phút cuối",wx:"bên kia không kịp lo",lx:"chưa ai đỡ lời cho cha",rt:"Ngươi khóa tráp, đeo chìa trong cổ."}]},
 s2:{h:"Hạn đã gần",w:"maid",if:RDW(0),t:()=>`Còn ${kitNumVi(DTQV_LIM())} tháng nữa Đại Lý tự mở phiên đối chất. Chứng cứ của ngươi mỏng, mà hậu cung lại không được dâng chứng thẳng.`,o:[
  {n:"Gom lại mọi lời khai trên giấy",f:"sao",wx:"đủ một tập hồ sơ",lx:"tốn sức, giấy dễ bị bác",rt:"Tập hồ sơ dày một tấc, buộc dây đỏ."},
  {n:"Bỏ bạc tìm thêm nhân chứng",wx:"thêm một người dám nói",lx:"bị nói mua chứng",rt:"Người nấu bếp cửa hông chịu ra làm chứng.",rf:"Người được tìm đến lấy bạc rồi biến mất."},
  {n:"Cầu xin Thái hậu che chở",need:["th"],wx:"có người lớn đứng sau",lx:"Thái hậu không thích bị kéo vào",rt:"Thái hậu gật: “Ai gia sẽ để ý phiên ấy.”",rf:"Thái hậu nói: “Án là việc của triều.”"}]},
 c1:{h:"Một Ngự sử thẳng tính",w:"emp",t:"Ngự sử đài có một người nổi tiếng thẳng, từng hặc cả Thân vương. Chứng cứ qua tay ông thì danh chính ngôn thuận, nhưng ông ghét người trong cung nhờ vả.",o:[
  {n:"Gửi chứng cứ qua người nhà ông, không kèm lời nhờ",f:"ngu",wx:"Ngự sử tự đọc, tự dâng sớ",lx:"ông nghi bị lợi dụng",rt:"Ba hôm sau, Ngự sử dâng sớ xin Đại Lý tự xét lời khai thái giám.",rf:"Ngự sử gửi trả: “Ta không nhận đồ trong cung.”"},
  {n:"Biếu lễ, xin ông giúp",wx:"ông có thể nhận",lx:"ông hặc luôn ngươi tội hối lộ",rt:"Ông nhận, nhưng gửi lễ vào kho cứu đói.",rf:"Ông dâng sớ hặc: phi tần đút lót Ngự sử."},
  {n:"Không dùng đến Ngự sử",wx:"không mang tiếng can án",lx:"bỏ một bàn tay đúng phép",rt:"Ngươi để ông yên."}]},
 c2:{h:"Đại Lý tự khanh",w:"v",need:["v"],t:"{maid} nghe: nhà {v} vừa gửi một xe lễ đến phủ Đại Lý tự khanh, nói là quà mừng thọ mẹ ông.",o:[
  {n:"Xin Hoàng thượng giao Tam ty cùng xử",f:"tam",wx:"một người không quyết được án",lx:"ngài thấy ngươi nghi quan của ngài",rt:"Hoàng thượng ban chỉ: Tam ty (Hình bộ, Ngự sử đài, Đại Lý tự) cùng ngồi xét.",rf:"Hoàng thượng nói: “Trẫm tin người trẫm dùng.”"},
  {n:"Nhờ Ngự sử xin Đại Lý tự khanh lui khỏi án",wx:"người nhận lễ phải lui khỏi án",lx:"{v} biết ai đứng sau",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngự sử dâng sớ nêu xe lễ; Đại Lý tự khanh xin lui khỏi án, giao lại cho Thiếu khanh.",rf:"Ngự sử không chịu nêu, tin đồn bị dập, chỉ còn tiếng ngươi ganh ghét."},
  {n:"Cũng gửi lễ mừng thọ",wx:"không để một bên nặng",lx:"tốn bạc, hai nhà cùng đút lót",rt:"Lễ của ngươi được nhận, như lễ của mọi nhà."}]},
 c3:{h:"Lời Tổng quản",w:"eun",t:"Tổng quản {eun} nói nhỏ: xong phiên đối chất, Đại Lý tự khanh sẽ vào Ngự thư phòng tâu lại. Ai được hầu mực tối ấy, người ấy nghe được tất cả.",o:[
  {n:"Xin chờ ở gian sau Ngự thư phòng tối ấy",f:"rem",wx:"nghe được lời tâu qua vách",lx:"ngài thấy ngươi muốn chen vào án",rt:"Hoàng thượng gật: “Ở gian sau thì được, không được lên tiếng.”",rf:"Hoàng thượng nói: “Tối ấy nàng ở cung.”"},
  {n:"Biếu Tổng quản, nhờ ông kể lại",wx:"biết từng lời trong phiên",lx:"nợ Tổng quản một ân",rt:"Tổng quản gật: “Nô tài sẽ nhớ từng chữ.”"},
  {n:"Không xin gì",wx:"giữ phép cung",lx:"phải đợi tin như mọi người",rt:"Ngươi cảm tạ, lui về."}]},
 t1:{h:"Niêm phong",w:"maid",t:"Bên kia có thể đánh tráo chứng cứ trên đường đến công đường. Phải niêm phong cho chắc.",o:[
  {n:"Nhờ mẹ niêm bằng gia ấn",f:"niem",wx:"không ai mở trộm được",lx:"tốn lễ người đưa, mẹ biết hết nội dung",rt:"Mẹ ngươi vào cung thỉnh an, đóng gia ấn đỏ đè lên dây buộc tráp."},
  {n:"Nhờ Thái hậu giữ tráp đến ngày xử",need:["th"],f:"niem",wx:"tráp nằm ở Đức Thọ cung",lx:"Thái hậu phiền",rt:"Tráp đặt trên án thờ Đức Thọ cung.",rf:"Thái hậu không muốn giữ đồ của án."},
  {n:"Gửi về để mẹ đệ đơn kèm chứng cứ",f:"me",wx:"gia thuộc đệ đơn là đúng phép",lx:"tráp ra khỏi cung, bị khám thì ngươi mang tội",rt:"Mẹ ngươi mặc áo mệnh phụ, tự tay đệ đơn và tráp ở cửa Đại Lý tự.",rf:"Thị vệ cửa cung khám ra tráp, báo lên Hoàng thượng."}]},
 x1:{h:"Phiên đối chất",w:"emp",t:"Hôm nay Đại Lý tự mở phiên đối chất: cha một bên, người nhà {v} một bên. Ngươi ngồi trong cung chờ tin; chứng cứ phải đến bàn quan xử bằng một trong những đường đã dọn.",o:[
  {n:"Để Ngự sử dâng chứng cứ lên quan xử",e:["win","lose"],rt:"Ngự sử mở tráp, đọc to lời khai. Người nhà {v} biến sắc.",rf:"Người nhà {v} hô: chứng cứ này từ hậu cung đưa ra. Quan xử bác: không đúng phép."},
  {n:"Xin Hoàng thượng ban chỉ cho đọc lời khai",e:["win","mid"],rt:"Thái giám mang chỉ đến Đại Lý tự. Không quan nào dám bác chứng cứ vua sai đọc.",rf:"Chỉ cho đọc, nhưng dặn quan xử xét thêm."},
  {n:"Chỉ để mẹ nộp lời khai, không làm lớn",e:"mid",lx:"lời khai nằm giữa chồng hồ sơ",rt:"Lời khai được ghi vào hồ sơ, như mọi tờ giấy khác."}]}},
 E:{win:{tag:"Đối chất nghiêng về cha",w:"emp",t:"Quan xử ghi: thư giả đi qua tay thái giám cung {v}. Nhà nàng phải trả lời trước công đường, cha được ngồi ghế thay vì quỳ.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Đối chất bỏ ngỏ",t:"Hai bên đều có chứng, không bên nào thắng hẳn. Đại Lý tự xin thêm thời gian."},
  lose:{tag:"Chứng cứ bị bác",w:"emp",t:"Chứng cứ bị bác vì đến từ hậu cung. Ngự sử còn dâng sớ trách phi tần can án.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_vu",10,{t:"Chứng cứ cuối cùng",w:"maid",sj:"tờ giấy, thỏi mực và khuôn ấn của bức thư giả",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Lời khai có thể bị chối. Chỉ vật chứng mới không biết nói dối: tờ giấy thư được viết lên, thỏi mực đã dùng, khuôn ấn đã đóng. Tìm cho ra cả ba.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Đại Lý tự đòi vật chứng",w:"emp",if:RDW(1),t:"Phiên đối chất nghiêng về cha, nhưng Đại Lý tự khanh nói: lời khai chưa đủ, phải có vật chứng trước phiên phán án.",o:[
  {n:"Xin Hoàng thượng cho xem lại bức thư",f:"xem",wx:"được cầm thư trong tay",lx:"ngài nghĩ ngươi đòi hỏi nhiều",rt:"Hoàng thượng cho xem trong một khắc, ngay trước mặt ngài.",rf:"Hoàng thượng nói: “Thư nằm ở Đại Lý tự.”"},
  {n:"Nhờ huynh trưởng hỏi Hàn lâm học sĩ về giấy mực",wx:"biết cách xem giấy mực",lx:"tốn lễ, học sĩ già lắm lời",rt:"Học sĩ nói: soi giấy dưới nắng thì thấy vân, ngửi mực thì biết hương."},
  {n:"Để Đại Lý tự tự tìm",wx:"không mang tiếng can án",lx:"quan xử không biết tìm ở đâu",rt:"Ngươi chờ tin từ Đại Lý tự."}]},
 s2:{h:"Lời khai bị chối",w:"maid",if:RDW(0),t:"Nhà {v} chối hết: lời khai là bị ép, nhân chứng là bị mua. Chỉ còn vật chứng mới nói được.",o:[
  {n:"Xin Hoàng thượng cho xem lại bức thư",f:"xem",wx:"được cầm thư trong tay",lx:"ngài nghĩ ngươi không chịu thua",rt:"Hoàng thượng cho xem trong một khắc.",rf:"Hoàng thượng nói: “Đủ rồi.”"},
  {n:"Cho người dò Nội vụ phủ",wx:"biết các kho giấy mực",lx:"Nội vụ phủ báo các cung",rt:"Người của ngươi chép được sổ cấp giấy mực ba tháng ấy.",rf:"Nội vụ phủ đóng cửa kho, nói đang kiểm."},
  {n:"Thôi, lo giữ mình",wx:"không thêm thù",lx:"án nghiêng về phía kia",rt:"Ngươi khép cửa cung."}]},
 c1:{h:"Tờ giấy",w:"maid",t:"Soi dưới nắng, giấy thư có vân sóng nhỏ. Loại giấy ấy chỉ Nội vụ phủ cấp cho các cung trong hoàng thành, ngoài trại không thể có.",o:[
  {n:"Xin Nội vụ phủ đối chiếu vân giấy",f:"giay",wx:"chứng thư được viết trong cung",lx:"Nội vụ phủ biết ngươi tra",rt:"Quản sự Nội vụ phủ gật: đúng giấy của kho trong, đợt cấp mùa xuân.",rf:"Quản sự nói: giấy ấy ngoài phố cũng bán."},
  {n:"Lấy giấy của chính cung ngươi so",wx:"có mẫu để so",lx:"giấy cung ngươi cũng bị đem ra xét",rt:"Vân giấy giống hệt. Ngươi hiểu: thư không viết ở biên ải."},
  {n:"Bỏ qua tờ giấy",wx:"đỡ một việc",lx:"mất một vật chứng",rt:"Ngươi gác tờ giấy sang bên."}]},
 c2:{h:"Thỏi mực",w:"v",need:["v"],t:"Mực trên thư có mùi xạ hương. Mực xạ là đồ tiến, năm ấy chỉ ban cho ba cung, trong đó có cung {v}.",o:[
  {n:"Xin Nội vụ phủ đưa sổ ban mực",f:"muc",wx:"có sổ ban mực",lx:"{v} biết ngươi đã ngửi ra",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Sổ ghi: cung {v} nhận mười thỏi, nay còn tám.",rf:"Sổ ban mực năm ấy bị mối ăn."},
  {n:"Sai người lấy mẫu mực ở cung {v}",f:"muc",wx:"có mực để so",lx:"bị bắt thì thành trộm",rt:"Một mẩu mực xạ được gói trong khăn, mùi trùng khớp.",rf:"Người của ngươi bị bắt ở cửa cung {v}."},
  {n:"Không đụng đến cung {v}",wx:"không gây chiến công khai",lx:"mực chỉ còn là nghi",rt:"Ngươi chỉ ghi lại mùi hương."}]},
 c3:{h:"Khuôn ấn",w:"maid",t:"Dấu ấn trên thư dày viền hơn ấn thật một ly. Khuôn ấn giả ấy được khắc ở đâu, ai giữ nó bây giờ?",o:[
  {n:"Tìm lại thợ khắc ấn Công bộ",f:"an",wx:"thợ khắc chỉ chỗ giấu khuôn",lx:"thợ khắc báo cho người thuê",rt:"Thợ khắc khai: khuôn ấn được chôn dưới gốc đào ở một biệt viện phía đông.",rf:"Thợ khắc đã bị đưa đi biên ải lao dịch."},
  {n:"Lần theo phủ phía đông",f:"an",wx:"có thể tìm ra khuôn",lx:"bên kia kịp đào lên",rt:"Biệt viện phía đông là của nhà ngoại {v}.",rf:"Biệt viện đã đổi chủ."},
  {n:"Xin Hoàng thượng cho so ấn trước triều",wx:"cả triều thấy viền ấn khác",lx:"chỉ thấy khác, không biết của ai",rt:"Đặt cạnh nhau, viền ấn giả dày hơn thấy rõ.",rf:"Quan xử nói: chênh một ly thì do mực đóng đậm."}]},
 t1:{h:"Ai giữ ba thứ",w:"maid",t:"Giấy trong cung, mực của ba cung, khuôn ở biệt viện phía đông. Ba sợi chỉ đều chạy về một chỗ, nhưng chưa sợi nào buộc chặt.",o:[
  {n:"Gom tất cả vào một bản trình",f:"gom",wx:"quan xử thấy cả ba cùng lúc",lx:"tốn sức, sai một chỗ là đổ cả",rt:"Ngươi viết bản trình, từng vật một, có dấu ấn của người làm chứng."},
  {n:"Bí mật đào khuôn ấn đêm nay",f:"dao",wx:"có khuôn ấn trong tay",lx:"đào trộm đất nhà người là tội",rt:"Khuôn ấn đồng còn dính đất, trên đáy khắc ngược tên cha ngươi.",rf:"Gia đinh biệt viện bắt được người của ngươi."},
  {n:"Nhờ huynh trưởng báo Đại Lý tự đi tìm",wx:"đúng phép",lx:"bên kia có thể nghe tin trước",rt:"Đại Lý tự nhận bản kê, hứa sẽ xét."}]},
 x1:{h:"Trình vật chứng",w:"emp",t:"Trước phiên phán án, Hoàng thượng cho triệu ngươi: “Nàng nói có vật chứng. Trẫm cho nàng một lần.”",o:[
  {n:"Trình cả ba vật chứng cùng lúc",e:["win","lose"],rt:"Giấy, mực, khuôn ấn nằm cạnh nhau trên ngự án. Hoàng thượng đứng dậy.",rf:"Một vật bị bác, cả ba vật bị nghi theo."},
  {n:"Trình vật chắc nhất, giữ lại phần còn lại",e:["win","mid"],rt:"Một vật mà không ai chối được. Quan xử ghi vào án.",rf:"Vật chứng được nhận, nhưng chưa chỉ tận tay ai."},
  {n:"Giao vật chứng cho Đại Lý tự, không trình",e:"mid",lx:"vật chứng đi qua tay quan, có thể bị bỏ quên",rt:"Thư lại Đại Lý tự nhận đồ, ghi biên nhận."}]}},
 E:{win:{tag:"Đủ vật chứng",w:"emp",t:"Giấy trong cung, mực của cung {v}, khuôn ấn ở biệt viện nhà ngoại nàng. Hoàng thượng lặng đi rất lâu, rồi sai giữ người nhà {v}.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Có vật chứng, chưa trọn",t:"Vật chứng có, nhưng chưa trọn. Án nghiêng về cha mà chưa ngã hẳn."},
  lose:{tag:"Kho Nội vụ phủ bốc cháy",t:"Đêm trước phiên phán án, kho giấy mực Nội vụ phủ bốc cháy. Sổ ban mực, sổ cấp giấy đều thành tro.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_vu",11,{t:"Oan khuất sáng tỏ",w:"emp",sj:"bản án của cha",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Ngày phán án đã định. Bản án sẽ nói cha ngươi trung hay phản, và ai phải trả giá cho bức thư giả. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Vật chứng trên ngự án",w:"emp",if:RDW(1),t:"Vật chứng đã nằm trên ngự án. Triều thần đến phủ cha ngươi nhiều hơn, nụ cười ai cũng vội.",o:[
  {n:"Khuyên cha đóng cửa, không tiếp ai",f:"kin",wx:"không ai nói nhà ngươi kéo bè",lx:"mất lòng những người đến chúc",rt:"Cổng phủ đóng, chỉ treo một ngọn đèn."},
  {n:"Xin Hoàng thượng định ngày phán sớm",wx:"bên kia không kịp xoay",lx:"ngài thấy ngươi giục vua",rt:"Hoàng thượng định ngày phán ngay tháng này.",rf:"Hoàng thượng nói: “Không vội.”"},
  {n:"Tạ ơn những người đã giúp",wx:"người giúp ngươi thấy được nhớ ơn",lx:"tốn bạc lễ tạ",rt:"Lễ tạ đến Ngự sử, Tổng quản, học sĩ già."}]},
 s2:{h:"Chứng cứ mỏng",w:"maid",if:RDW(0),t:"Chứng cứ của ngươi mỏng. Ngoài triều, người ta đã bàn nên xử cha thế nào cho vừa: tử hay lưu.",o:[
  {n:"Viết thư xin cha bình tâm",wx:"cha không làm gì dại dột",lx:"tốn sức, chứng vẫn mỏng",rt:"Cha hồi: “Cha không sợ chết, chỉ sợ con bị liên lụy.”"},
  {n:"Xin Hoàng thượng nhớ công cha",f:"cong",wx:"ngài nhớ hai mươi năm giữ ải",lx:"ngài thấy ngươi đổi chứng bằng tình",rt:"Hoàng thượng lặng đi: “Trẫm nhớ.”",rf:"Hoàng thượng nói: “Công là công, tội là tội.”"},
  {n:"Bỏ bạc lo hậu sự cho nhà",wx:"nhà có đường lui",lx:"tốn bạc, như đã chịu thua",rt:"Mẹ ngươi được đưa về quê ngoại."}]},
 c1:{h:"{v} cầu xin",w:"v",need:["v"],t:"{v} quỳ trước cửa cung ngươi: “Muội chỉ nghe lời cha. Xin tỷ tỷ tha cho nhà muội một con đường.”",o:[
  {n:"Tha cho {v}, chỉ truy kẻ cầm bút",f:"tha",wx:"{v} nợ ngươi cả đời",lx:"người từng hại cha thoát tội",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} dập đầu đến rướm máu."},
  {n:"Bắt nàng viết lời khai người đứng sau",f:"sau",wx:"có lời khai về kẻ trả bạc",lx:"{v} cắn ngược",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} run tay viết: cha nàng nhận bạc của Binh bộ thượng thư.",rf:"{v} đứng dậy: “Tỷ tỷ cứ việc.”"},
  {n:"Đóng cửa, không gặp",wx:"không mềm lòng",lx:"{v}: oán +",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} quỳ đến tối rồi được thái giám dìu về."}]},
 c2:{h:"Ký thất xin đổi",w:"maid",t:"Ký thất cũ trong ngục nhắn: hắn sẽ khai người trả bạc, nếu được tha tội chết.",o:[
  {n:"Xin Hoàng thượng tha tội chết cho hắn",f:"sau",wx:"hắn khai tên người trả bạc",lx:"ngài không thích mặc cả với tội nhân",rt:"Hoàng thượng gật: “Khai thật thì sống.”",rf:"Hoàng thượng nói: “Kẻ làm giả thư vua, không tha.”"},
  {n:"Không mặc cả với kẻ làm giả",wx:"giữ phép nước",lx:"kẻ trả bạc có thể không bị gọi tên",rt:"Ngươi gửi trả lời: phép nước không đổi chác."},
  {n:"Cho bạc nuôi mẹ hắn, xin hắn khai",wx:"hắn mềm lòng",lx:"bị nói mua lời khai",rt:"Hắn viết một cái tên lên vách ngục.",rf:"Hắn nhận bạc, không viết gì."}]},
 c3:{h:"Bộ tướng chờ tin",w:"dad",t:"Bộ tướng của cha đóng quân ở ải, ngày ngày cho ngựa trạm về hỏi tin. Có kẻ nói: phán sai thì họ sẽ không nhận chủ soái mới.",o:[
  {n:"Thư cho bộ tướng: phán thế nào cũng tuân",wx:"Hoàng thượng thấy nhà ngươi trung",lx:"tướng sĩ cho là ngươi bỏ cha",rt:"Bộ tướng hồi: “Mạt tướng xin tuân.”"},
  {n:"Để Hoàng thượng thấy lòng quân",wx:"ngài nể quân tâm",lx:"ngài sợ binh quyền nhà ngươi",rt:"Hoàng thượng đọc lá thư hàng vạn lính ký tên, gật đầu.",rf:"Hoàng thượng nói: “Họ dọa trẫm sao?”"},
  {n:"Im lặng chờ phán",wx:"không ai nói ngươi xúi quân",lx:"lời đồn quân sắp loạn lan rộng",rt:"Ngươi không gửi thư nào."}]},
 t1:{h:"Lời trong chiếu",w:"emp",t:"Hoàng thượng cho soạn chiếu phán án. Lời trong chiếu có thể rửa sạch, hoặc chỉ khép lại.",o:[
  {n:"Xin chiếu ghi rõ cha bị vu",f:"chieu",wx:"tiếng nhà sạch",lx:"ngài không muốn làm to",rt:"Chiếu ghi: Đại tướng quân bị vu, trung thành không đổi.",rf:"Chiếu chỉ ghi: án đã xét xong."},
  {n:"Xin chiếu ban thưởng người làm chứng",wx:"lính trạm, người quét sân được thưởng",lx:"triều cho là ngươi lo việc vặt",rt:"Lính trạm được thưởng ruộng, người quét sân được lên một bậc.",rf:"Hoàng thượng không nhắc đến họ."},
  {n:"Để chiếu khép lại êm",wx:"triều yên",lx:"tiếng nhà chưa sạch hẳn",rt:"Chiếu khép lại, lời lẽ êm ả."}]},
 x1:{h:"Đêm trước ngày phán án",w:"emp",t:"Đại Lý tự đã dâng bản nghị án; định đoạt là ở Hoàng thượng. Đêm trước ngày phán, ngài ở lại cung ngươi, tờ chiếu chưa đóng ấn để trên án: “Nàng còn gì muốn nói?”",o:[
  {n:"Xin trị đúng kẻ làm giả và người sai khiến",e:["win","lose"],rt:"Hoàng thượng đọc chiếu: cha ngươi vô tội, kẻ làm giả và người sai khiến đều bị trị.",rf:"Hoàng thượng thấy ngươi đòi quá, chiếu phán cha có tội trị quân lỏng."},
  {n:"Chỉ xin trả lại trong sạch cho cha",e:["win","mid"],rt:"Chiếu phán cha vô tội, trả lại ấn tín.",rf:"Chiếu phán cha vô tội, nhưng cho về nhàn chức."},
  {n:"Xin cho cha cáo lão về quê",e:"mid",lx:"cha bỏ binh quyền, nhà rời triều",rt:"Hoàng thượng chuẩn, ban cha áo gấm về làng."}]}},
 E:{win:{tag:"Cha sạch án, kẻ làm giả bị trị",w:"emp",t:A=>`Cha ngươi được trả ấn, ban ngự tửu. Kẻ cầm bút và người sai khiến đều bị trị${A&&A.f&&A.f.tha?"; riêng {v} được tha như lời ngươi xin":""}. Cả triều nhớ: con gái Đại tướng quân rửa oan cho cha bằng chứng cứ.`,go:(A,G)=>{const v=A.f.tha?null:rv67(A,"v");return [e67dad(G[0]),v?e67drop(v,"liên lụy vì án thư giả"):""].join(" ")}},
  mid:{tag:"Sạch án, về nhàn chức",t:"Cha được phán vô tội nhưng không cầm quân nữa. Nhà ngươi bình yên, xa triều chính. Ngươi tự đi đường mình trong cung.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Cha mang tội, được tha chết",w:"emp",t:"Cha bị phán tội trị quân lỏng, tước hết chức. Theo luật, án dính đến mưu phản thì cả nhà liên đới; Hoàng thượng nể công cũ, tha chết cho cha về quê và miễn tội liên đới cho ngươi. Ngươi vẫn giữ ngôi, nhưng sau lưng không còn ai.",go:(_A,G)=>e67dad(G[0])}}});
RD97L.push(rdRare({a:"dtq_vu_11",tag:"Kẻ làm giả khai người trả bạc",w:"emp",n:"Đưa lời khai người trả bạc lên Hoàng thượng",
 path:["Hỏi người hàng xóm ai nuôi hắn","Hứa tha cho ký thất nếu khai thêm","Để hắn đi, cho người bám theo","Lần theo phủ phía đông","Bắt nàng viết lời khai người đứng sau","Xin Hoàng thượng tha tội chết cho hắn","Cho bạc nuôi mẹ hắn","Xin chiếu ghi rõ cha bị vu","Khuyên cha đóng cửa","Xin trị đúng kẻ làm giả"],bad:["Không mặc cả với kẻ làm giả","Để chiếu khép lại êm","Bỏ bạc lo hậu sự"],x:[()=>S.tamco>=RR("dtq_vu_11").bar,"Tâm cơ từ "+RR("dtq_vu_11").bar],
 t:"Trước Đại Lý tự, ký thất cũ khai ra cái tên: Binh bộ thượng thư, người muốn binh quyền của cha ngươi. Hoàng thượng tự tay viết lên biển “Trung liệt thế gia”, sai treo trước cổng phủ Đại tướng quân.",go:(A,G)=>{const v=A&&A.f&&A.f.tha?null:rv67(A,"v");return [e67dad(G[0]),v?e67drop(v,"liên lụy vì án thư giả"):""].join(" ")},rw:"bienngu",ti:"Con gái nhà trung liệt"}));

/* ---------- dtq_binh · Binh phù và long ngai ---------- */
/* Road rival {v}: the consort whose clan backs phó soái họ Lục (the young general raised in .4 to replace her father). Cast in .5, carried to .11.
   Chapter numbers: BAL.road.dtq_binh.mon = months the Emperor gives for the camp half of the tiger tally to reach the capital (.5). */
const DTQB_MON=()=>kitNumVi(BAL.road.dtq_binh.mon);

rdDef("dtq_binh",5,{t:"Hổ phù",w:"emp",sj:"nửa hổ phù còn ở doanh Bắc",cast(A){return rdCast(A,["v"])},
 g:()=>`Hổ phù chia hai nửa: một nửa trong ngự thư phòng, một nửa vẫn nằm ở doanh Bắc. Hoàng thượng cho hạn ${DTQB_MON()} tháng, trước kỳ đại duyệt mùa thu, để hai nửa khớp nhau trong tay ngài.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Nửa hổ phù trong ngự thư phòng",w:"emp",if:RDW(1),t:()=>`Việc binh phù vừa yên, Hoàng thượng đã mở hộp gấm cho ngươi xem nửa hổ phù bằng đồng: “Nửa kia vẫn ở doanh Bắc. Trong ${DTQB_MON()} tháng, trẫm muốn thấy hai nửa khớp nhau một lần.”`,o:[
  {n:"Hứa tự viết thư xin cha gửi về",f:"king",wx:"ngài thấy ngươi đứng về phía ngài",lx:"cha hồi thư lạnh nhạt, ngài biết ngươi nói suông",rt:"Hoàng thượng đặt tay lên tay ngươi: “Trẫm chờ.”",rf:"Thư cha chỉ có một dòng: “Việc quân, con chớ hỏi.”"},
  {n:"Xin ngài cho người của ngài đi nhận",wx:"tay ngươi sạch, không ai bảo ngươi giữ binh cho cha",lx:"cha thấy ngươi đẩy việc cho người ngoài, Sức −",rt:"Hoàng thượng gật đầu, cho gọi {eun}."},
  {n:"Đùa rằng đồng nặng, cha già mang không nổi",wx:"ngài cười, chuyện nhẹ đi",lx:"ngài thấy ngươi né",rt:"Hoàng thượng bật cười, khép hộp gấm.",rf:"Hoàng thượng không cười: “Trẫm không đùa.”"}]},
 s2:{h:"Doanh Bắc không trả",w:"maid",if:RDW(0),t:"Cha đã rời binh quyền, nhưng nửa hổ phù ở doanh Bắc không về kinh. Phó tướng già của cha nói chỉ giao khi có thư tay của cha. Trong cung, người ta bắt đầu gọi cung ngươi là “cửa sau của doanh Bắc”.",o:[
  {n:"Viết thư khuyên phó tướng giao",f:"king",wx:"phó tướng nghe lời con gái chủ soái",lx:"thư lọt ra ngoài, bị nói là ngươi ra lệnh cho quân",rt:"Phó tướng hồi thư: “Có lời tiểu thư, mạt tướng xin chờ chiếu.”",rf:"Thư bị Binh bộ chặn lại, bóc ra đọc trước triều."},
  {n:"Gửi bạc nhờ cha giữ yên doanh trại",f:"dad",wx:"quân Bắc không náo động",lx:"bạc từ cung ra doanh trại là chuyện người ta sẽ nhớ",rt:"Cha nhận bạc, chia cho lính già về quê."},
  {n:"Đóng cửa cung, không dính vào",wx:"không ai bắt được lỗi",lx:"Hoàng thượng thấy ngươi đứng ngoài",rt:"Ngươi khép cửa cung, chép kinh."}]},
 c1:{h:"{v} xin hổ phù cho nhà Lục",w:"v",need:["v"],t:"{v}, em họ phó soái họ Lục, tâu trong yến: “Nửa hổ phù kia cứ để biểu huynh của thiếp lên doanh Bắc nhận, khỏi phiền nhà Đại tướng quân.”",o:[
  {n:"Cười đáp: hổ phù không phải của hồi môn",wx:"{v} bẽ mặt trước cả yến",lx:"Hoàng thượng thấy hai nhà giành binh ngay trước mặt",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Cả yến cười. {v} đỏ mặt, cúi đầu uống rượu.",rf:"Hoàng thượng đặt chén xuống: “Đủ rồi.”"},
  {n:"Mời {v} sang cung uống trà",wx:"biết nhà Lục định gì",lx:"{v} cho là ngươi sợ",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} buột miệng: biểu huynh của nàng ta đã gửi người lên doanh Bắc từ trước.",rf:"{v} uống trà, nói chuyện thêu thùa, không hở một lời."},
  {n:"Nhờ Hoàng hậu gác lời ấy",need:["hh"],wx:"lời {v} không đến tai triều",lx:"Hoàng hậu thấy ngươi kéo bà vào việc binh",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng hậu nói: “Việc binh, hậu cung không bàn.” {v} im.",rf:"Hoàng hậu không muốn dính vào."}]},
 c2:{h:"Thư cha giữa đêm",w:"dad",t:"{dad} gửi thư: “Hổ phù là mạng của nhà ta. Giao rồi, ai giữ lưng cho mẹ con, cho huynh con?”",o:[
  {n:"Hồi thư: vua giữ lưng cho nhà ta",f:"king",wx:"cha bắt đầu nghĩ lại",lx:"cha cho là ngươi đã quên họ mình",rt:"Cha hồi thư, nét chữ đã mềm hơn.",rf:"Cha không hồi thư."},
  {n:"Hứa giữ cho cha thêm một mùa",f:"dad",wx:"cha tin ngươi, gửi bạc vào cung",lx:"Hoàng thượng mà biết ngươi hứa sẽ nghi",rt:"Cha gửi kèm bạc và một chữ “Được”."},
  {n:"Đốt thư, không hồi âm",wx:"không để lại chữ nào cho kẻ gian",lx:"cha giận, nghĩ con gái đã xa, Sức −",rt:"Thư cha thành tro trong lò hương."}]},
 c3:{h:"Hộp gấm bị mở",w:"eun",t:"{eun} khẽ báo: đêm qua có người mở hộp gấm đựng nửa hổ phù trong ngự thư phòng. Không mất gì, nhưng Hoàng thượng đang nghĩ đến nhà ai.",o:[
  {n:"Tự xin ngài cho tra",f:"box",wx:"tìm ra kẻ mở hộp",lx:"ngài thấy ngươi sốt sắng quá",rt:"Kẻ mở hộp là tiểu thái giám nhận bạc của nhà Lục.",rf:"Không tra ra ai, chỉ còn lời ngươi."},
  {n:"Biếu {eun} để biết ai trực đêm ấy",f:"box",wx:"có tên người trực",lx:"{eun} biết ngươi lo, bạc mất trắng nếu hắn không nói thật",rt:"{eun} đưa tên ba người trực đêm.",rf:"{eun} nhận bạc, đưa toàn tên người đã chết."},
  {n:"Im lặng, để ngài tự tra",wx:"không ai bảo ngươi nhúng tay",lx:"nghi ngờ cứ treo trên nhà ngươi",rt:"Ngươi giả như không nghe."}]},
 t1:{h:"Phó tướng già về kinh",w:"dad",t:"Phó tướng già của cha mang nửa hổ phù về kinh, dừng ở cổng thành. Ông nhắn vào cung qua {eun}: “Mạt tướng chỉ trao vào tay người nhà chủ soái.”",o:[
  {n:"Nhờ {eun} mang thư khuyên ông trao thẳng cho vua",f:"king",wx:"phó tướng nghe ngươi",lx:"thư hậu cung ra ngoài cổng là phạm cung quy, lộ thì mất sủng",rt:"Ông đọc thư, lạy về phía cung ngươi một lạy rồi vào triều.",rf:"Ông không chịu, ngồi lì ở cổng thành."},
  {n:"Xin cha tự ra nhận rồi dâng",f:"dad",wx:"đúng lễ quân, cha giữ thể diện",lx:"Hoàng thượng thấy hổ phù đi qua tay nhà ngươi",rt:"Cha ra cổng thành, nhận hộp gỗ trong tay phó tướng."},
  {n:"Xin Hoàng thượng sai Lễ bộ ra đón",wx:"việc đi đúng phép",lx:"tốn bạc lễ, phó tướng cho là nhà chủ soái đã bỏ ông",rt:"Lễ bộ ra cổng với kiệu và nhạc."}]},
 x1:{h:"Hai nửa khớp nhau",w:"emp",t:"Đêm ấy trong Ngự thư phòng, chỉ có ngài và ngươi. Hai nửa hổ phù đặt trên án. Hoàng thượng nửa đùa nửa thật: “Nàng ghép đi.”",o:[
  {n:"Tự tay ghép hai nửa",e:["win","lose"],rt:"Hai nửa khớp vào nhau một tiếng nhỏ. Hoàng thượng mỉm cười.",rf:"Tay ngươi run, nửa hổ phù rơi xuống nền gạch. Sáng hôm sau, {v} đã kể chuyện ấy khắp cung."},
  {n:"Xin ngài để cha vào triều tự dâng",e:["win","mid"],rt:"Hôm sau cha vào triều, tự tay dâng nửa hổ phù. Ngài ghép trước mặt bá quan.",rf:"Cha ghép xong rồi lui ngay, không nhìn vua lấy một lần."},
  {n:"Thưa: việc này của Binh bộ",e:"mid",lx:"ngài thấy ngươi không dám nhận lòng tin của ngài",rt:"Ngài cất hổ phù, hôm sau giao Thượng thư Binh bộ."}]}},
 E:{win:{tag:"Hổ phù về tay vua êm ả",w:"emp",t:"Hai nửa hổ phù khớp trong tay Hoàng thượng. Ngài nói trước bá quan: nhà Đại tướng quân trả binh như trả một món nợ ân tình.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Hổ phù về Binh bộ",t:"Hổ phù về kinh, cất ở Binh bộ. Không ai nhớ ơn ai, nhưng cũng không ai bắt lỗi ai."},
  lose:{tag:"Nửa hổ phù rơi trong Ngự thư phòng",w:"v",t:"Chuyện nửa hổ phù rơi khỏi tay ngươi truyền khắp cung. Nhà Lục nói đó là điềm: nhà Đại tướng quân không muốn buông tay.",go:(A,G)=>{rdRel(A,"v",G[0]);return e67dad(G[1])}}}});

rdDef("dtq_binh",6,{t:"Bộ tướng của cha",w:"dad",sj:"huyết thư của chư tướng doanh Bắc",cast(A){return rdCast(A,["v"])},
 g:"Chư tướng doanh Bắc dâng huyết thư xin giữ cha ngươi làm chủ soái. Trong mắt người ngoài là lòng trung; trong mắt vua, có thể là phản. Ngươi phải làm cho ngài đọc nó đúng nghĩa.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Huyết thư đến kinh",w:"emp",if:RDW(1),t:"Hổ phù vừa về tay vua thì từ doanh Bắc gửi đến một tờ huyết thư, ba mươi sáu bộ tướng điểm chỉ: “Không có Đại tướng quân, quân Bắc không ngủ yên.”",o:[
  {n:"Xin đọc huyết thư cùng ngài",f:"king",wx:"ngài đọc nó với ngươi bên cạnh",lx:"ngài thấy ngươi muốn chen vào việc quân",rt:"Hoàng thượng đọc xong, chỉ nói: “Lòng người đáng quý.”",rf:"Hoàng thượng cất tờ thư vào tay áo, không cho ngươi xem."},
  {n:"Viết thư hỏi cha có biết trước",wx:"biết cha có đứng sau hay không",lx:"thư hỏi bị coi là cha con bàn mưu",rt:"Cha hồi thư: ông không biết, ông đã mắng phó tướng.",rf:"Thư ngươi bị chép lại, đưa đến tay {v}."},
  {n:"Im lặng chờ",wx:"không để lại dấu",lx:"cha một mình gánh lời nghi",rt:"Ngươi không nhắc đến huyết thư."}]},
 s2:{h:"Tướng cũ kéo về kinh",w:"maid",if:RDW(0),t:"Mấy bộ tướng cũ của cha rời doanh không lệnh, mang huyết thư về kinh, quỳ trước cửa Ngọ Môn. Cấm quân đã rút gươm.",o:[
  {n:"Sai {maid} mang nước và áo rét ra",wx:"tướng cũ biết nhà chủ soái còn nhớ họ",lx:"bị nói là cung trong nuôi quân ngoài",rt:"Các tướng già lặng lẽ khoác áo, không ai hô hoán nữa.",rf:"Cấm quân thấy người của ngươi, báo thẳng lên ngự tiền."},
  {n:"Xin Hoàng thượng đừng trị tội họ",f:"dad",wx:"tướng cũ giữ được mạng",lx:"ngài giận ngươi bênh kẻ rời doanh",rt:"Hoàng thượng phẩy tay: “Cho họ về.”",rf:"Hoàng thượng nói: “Nàng là phi tần của trẫm, hay con gái Đại tướng quân?”"},
  {n:"Viết thư bảo cha gọi họ về",f:"king",wx:"đúng phép, việc êm",lx:"tướng cũ cho là nhà chủ soái phụ họ, Sức −",rt:"Cha ra Ngọ Môn, mắng các tướng lui."}]},
 c1:{h:"Ngự sử gọi là kết đảng",w:"emp",t:"Một Ngự sử dâng sớ: huyết thư là bằng chứng Đại tướng quân kết đảng trong quân, xin giải giáp ba mươi sáu bộ tướng.",o:[
  {n:"Nhờ người trong Hàn lâm viện viết sớ biện",wx:"có tiếng nói khác trong triều",lx:"lộ ra là cung ngươi bỏ bạc",rt:"Một tờ sớ biện đến ngự án, lời lẽ đâu vào đó.",rf:"Người viết sớ khoe tên người trả bạc."},
  {n:"Khuyên cha tự xin giải giáp một nửa",f:"king",wx:"cắt đường cho lời kết đảng",lx:"thành thì chư tướng giận nhà chủ soái; hỏng thì cha cãi lời ngươi trước họ hàng",go:(A,ok,G)=>ok?e67dad(G[0]):"",rt:"Cha dâng sớ tự xin giải giáp mười tám người. Ngự sử cứng họng.",rf:"Cha không chịu: “Họ theo ta hai mươi năm.”"}]},
 c2:{h:"{v} nói huyết thư là cha viết",w:"v",need:["v"],t:"{v} nói khắp nơi: huyết thư là do cha ngươi đọc cho thư lại chép, máu chỉ là máu gà.",o:[
  {n:"Xin ngài cho Thái y nghiệm máu",wx:"lời {v} tự đổ",lx:"nghiệm không ra, Lời đồn +",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Thái y nói đó là máu người, ba mươi sáu dấu tay khác nhau.",rf:"Máu đã khô quá, Thái y không nói được gì."},
  {n:"Tìm người tung tin cho {v}",wx:"nắm được đường tin của nhà Lục",lx:"bạc mất, {v} biết ngươi đang dò",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"Kẻ tung tin là một thư lại Binh bộ ăn lương nhà Lục.",rf:"Kẻ tung tin trốn mất."},
  {n:"Mặc kệ lời {v}",wx:"không vướng vào chuyện đàn bà cãi nhau",lx:"lời đồn bám lấy tên cha",rt:"Lời đồn rồi cũng nhạt dần."}]},
 c3:{h:"Bộ tướng xin gặp",w:"maid",t:"Một bộ tướng trẻ trong huyết thư lén nhờ {maid} chuyển lời: chư tướng chỉ cần một câu của nhà chủ soái là sẽ lui.",o:[
  {n:"Gửi lời: hãy lui và chờ chiếu",f:"king",wx:"chư tướng lui êm",lx:"lời ngươi đến tai Hoàng thượng như mệnh lệnh",rt:"Bộ tướng trẻ truyền lời, doanh trại yên.",rf:"Lời ngươi bị kể lại thành “nương nương ra lệnh cho quân”."},
  {n:"Không nhận lời nhắn",wx:"tay ngươi sạch",lx:"chư tướng nghĩ nhà chủ soái lạnh lòng, Sức −",rt:"{maid} trả lại người đưa tin."}]},
 t1:{h:"Người đứng đầu huyết thư",w:"emp",t:"Hoàng thượng hỏi tên người viết đầu tiên trong huyết thư: chính là phó tướng già của cha. “Trẫm nên phong thưởng ông ta, hay chém?”",o:[
  {n:"Thưa: thưởng ông vì trung, rồi cho về hưu",f:"king",wx:"ngài có lối ra đẹp",lx:"ngài thấy ngươi đã nghĩ sẵn lời",rt:"Hoàng thượng gật đầu: “Thưởng một trăm lượng, cho về quê.”",rf:"Hoàng thượng cười nhạt: “Nàng lo cho người của cha nàng quá.”"},
  {n:"Thưa: thần thiếp không dám bàn",wx:"không để lại lời",lx:"phó tướng già không ai nói đỡ, Sức −",rt:"Hoàng thượng thở ra, không hỏi nữa."},
  {n:"Xin ngài để cha tự xử người của cha",f:"dad",wx:"cha giữ thể diện với quân",lx:"ngài nghe ra cha ngươi vẫn có “người của mình”",rt:"Hoàng thượng cho cha ngươi tự định.",rf:"Hoàng thượng nhìn ngươi rất lâu."}]},
 x1:{h:"Đêm trước triều nghị",w:"emp",t:"Mai triều đình bàn huyết thư. Đêm nay Hoàng thượng ở Ngự thư phòng, gọi ngươi đến mài mực, rồi hỏi như tình cờ: “Nàng đọc nó là trung hay là phản?”",o:[
  {n:"Khuyên ngài mai đốt huyết thư trước triều",e:["win","lose"],rt:"Hoàng thượng đốt huyết thư: “Trẫm tin tướng sĩ, không cần giấy.” Cả triều quỳ tung hô.",rf:"Lửa vừa bén, có kẻ hô: “Đốt chứng cứ để che!” Triều nghị rối loạn."},
  {n:"Khuyên ngài giữ huyết thư làm công trạng của quân",e:["win","mid"],rt:"Huyết thư cất vào Binh bộ, ba mươi sáu tướng được ghi công.",rf:"Huyết thư cất đi, nhưng tên ba mươi sáu tướng bị ghi vào sổ riêng."},
  {n:"Chỉ mài mực, không đáp",e:"mid",lx:"triều tự đọc, và nhà ngươi không có lời",rt:"Ngươi mài mực đến khuya, không nói một lời."}]}},
 E:{win:{tag:"Huyết thư hóa lòng trung",w:"emp",t:"Triều đình gọi chư tướng doanh Bắc là “tướng trung nghĩa”. Lời nghi kết đảng tắt, và Hoàng thượng nhớ ai đã giúp ngài nói câu ấy.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Chư tướng bị điều tản",t:"Ba mươi sáu bộ tướng bị điều đi khắp nơi, mỗi người một trấn. Không ai bị tội, nhưng doanh Bắc không còn là của nhà ngươi.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Bộ tướng của cha bị bắt",w:"v",t:"Phó tướng già bị giải về Hình bộ. Nhà Lục cho người thay khắp doanh Bắc, và trong cung ai cũng nhìn ngươi như nhìn con gái một kẻ kết đảng.",go:(A,G)=>{rdRel(A,"v",G[0]);return e67dad(G[1])}}}});

/* HISTORY CHECK: .7 retells the Song founder's "cup of wine releases military power" (杯酒釋兵權, Tống Thái Tổ, 961): a feast, the
   Emperor's sigh that he cannot sleep, the generals asking leave to resign in exchange for land, wealth and marriage ties. Verify the
   order of the scene and that such a feast with consorts behind a screen is plausible for a fictional Đại Hy court. */
rdDef("dtq_binh",7,{t:"Chén rượu thu binh quyền",w:"emp",sj:"yến rượu Hoàng thượng mời chư tướng",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng mở ngự yến mời cha ngươi và các lão tướng. Ai cũng hiểu: binh quyền sẽ được xin lại bằng một chén rượu, không bằng gươm. Yến của đàn ông, ngươi không có mặt: chỉ còn lời bên gối, một món quà, một mảnh giấy qua tay người.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ngài hỏi ý về yến",w:"emp",if:RDW(1),t:"Đêm ấy Hoàng thượng nằm nghĩ, buột miệng: “Rằm này trẫm mời các lão tướng. Trẫm muốn họ uống say mà về, không phải sợ mà về. Nàng nói xem nên thế nào?”",o:[
  {n:"Xin ngài dùng rượu quê doanh Bắc",f:"warm",wx:"lão tướng thấy được nhớ đến",lx:"bạc riêng của ngươi bỏ ra chở rượu, Nội vụ phủ kêu ngươi phô trương",rt:"Rượu cao lương từ biên ải về kịp đêm yến."},
  {n:"Gợi ý khúc nhạc “Quy điền”",f:"king",wx:"nhạc nói thay vua điều khó nói",lx:"lão tướng nghe ra lời đuổi khéo",rt:"Nhạc công tập khúc quy điền, lời về ruộng vườn, con cháu.",rf:"Có kẻ chê khúc nhạc là sỉ nhục công thần."},
  {n:"Xin ngài cho cha ngồi gần ngự tọa",f:"dad",wx:"cha được trọng trước mặt chư tướng",lx:"các lão tướng khác thấy mình kém",rt:"Hoàng thượng gật đầu: “Phải thế.”"}]},
 s2:{h:"Tin yến đến muộn",w:"maid",if:RDW(0),t:"{maid} nghe lỏm ở Ngự thiện phòng: đêm mười lăm có yến mời các lão tướng, cung ngươi không được báo. Thư cha đến cùng lúc: “Rượu vua mời, cha uống hay không?”",o:[
  {n:"Hồi thư: uống, và nói lời thật",f:"king",wx:"cha vào yến với lòng đã định",lx:"cha cho là ngươi đẩy ông ra",rt:"Cha hồi thư: “Được. Cha uống.”",rf:"Cha hồi thư: “Con lo cho vua, ai lo cho cha?”"},
  {n:"Xin Thái hậu ban cho cha một món trong yến",need:["th"],f:"warm",wx:"cha thấy trong cung còn người nhớ ông",lx:"Thái hậu thấy ngươi tò mò việc triều",rt:"Thái hậu sai dâng cha một bát canh sâm, nói là “của Đức Thọ cung”.",rf:"Thái hậu nói: “Yến của đàn ông, con đừng nhúng tay.”"},
  {n:"Hồi thư: cha tự quyết",f:"dad",wx:"cha thấy con không ép",lx:"cha một mình vào yến, Sức −",rt:"Cha không hồi âm."}]},
 c1:{h:"{v} xin cho anh họ dự yến",w:"v",need:["v"],t:"{v} xin Hoàng thượng cho phó soái họ Lục ngồi cùng bàn các lão tướng: “Để biểu huynh của thiếp học hỏi.”",o:[
  {n:"Thưa: yến tiễn người già, không phải đón người mới",wx:"nhà Lục không được chen vào",lx:"ngài thấy ngươi ghen với nhà Lục",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng thượng cười: “Nàng nói phải.” {v} cắn môi.",rf:"Hoàng thượng cho Lục ngồi cùng, còn liếc ngươi."},
  {n:"Khuyên ngài xếp Lục ngồi cạnh cha",f:"warm",wx:"cha và Lục có dịp nói chuyện",lx:"Lục làm cha bẽ mặt trước chư tướng",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Cha rót cho Lục một chén, dặn dò về gió Bắc.",rf:"Lục hỏi cha một câu về trận thua năm xưa."}]},
 c2:{h:"Cha muốn đeo kiếm vào yến",w:"dad",t:"Cha muốn đeo kiếm vua ban năm xưa vào yến: “Kiếm này do tiên đế ban, cha có quyền mang.”",o:[
  {n:"Xin cha để kiếm lại",f:"king",wx:"cha vào yến tay không, lòng vua yên",lx:"cha cho là ngươi coi ông như kẻ có tội",rt:"Cha tháo kiếm, đặt lên bàn thờ nhà.",rf:"Cha vẫn mang kiếm, ngươi chỉ khuyên được ông tháo vỏ."},
  {n:"Xin ngài cho cha dâng kiếm trong yến",f:"warm",wx:"kiếm trả lại vua thành một nghi lễ đẹp",lx:"ngài thấy ngươi bày trò",rt:"Hoàng thượng ngẫm một lúc: “Hay. Trẫm sẽ nhận bằng hai tay.”",rf:"Hoàng thượng nói: “Kiếm ở đâu cứ để đó.”"},
  {n:"Để cha mang",f:"dad",wx:"cha giữ được oai",lx:"cấm quân sẽ nhìn chằm chằm cả đêm, Sức −",rt:"Cha đeo kiếm bước vào cổng cung."}]},
 c3:{h:"Các lão tướng đến hỏi",w:"maid",t:"Hai lão tướng khác cho vợ vào cung thỉnh an ngươi, hỏi khéo: đêm yến nên uống hay nên từ.",o:[
  {n:"Khuyên họ cứ uống, ân vua là thật",f:"king",wx:"lão tướng nghe ngươi, yến sẽ êm",lx:"nếu yến có biến, họ sẽ trách ngươi",rt:"Hai phu nhân lạy tạ, về nhà khuyên chồng.",rf:"Một phu nhân kể lời ngươi với nhà Lục."},
  {n:"Tặng quà, không nói gì",wx:"giữ được tình mà không để lại lời",lx:"tốn bạc, họ về nhà vẫn rối",rt:"Hai phu nhân về với hai hộp trà."}]},
 t1:{h:"Ngài than không ngủ được",w:"eun",t:"Đêm rằm, ngươi ngồi trong cung chờ tin. {eun} lén sai tiểu thái giám chạy về báo: rượu đã ba tuần, Hoàng thượng đặt chén thở dài “trẫm chưa đêm nào ngủ yên”. Các lão tướng tái mặt.",o:[
  {n:"Sai Ngự thiện phòng dâng ngài canh an thần",f:"warm",wx:"không khí dịu lại",lx:"có người cho là ngươi chen vào yến của vua",rt:"Bát canh “của cung ngươi” dâng lên, Hoàng thượng cười: “Còn có người lo cho giấc ngủ của trẫm.” Lão tướng thở ra.",rf:"Bát canh dâng lên đúng lúc ngài muốn nói tiếp. Ngài cau mày."},
  {n:"Nhờ {eun} nhắn cha: uống ít, tạ ơn nhiều",f:"king",wx:"cha là người đầu tiên hiểu ý vua",lx:"tốn bạc lót tay, lời nhắn lọt ra là tội thông tin vào ngự yến",rt:"Cha nghe lời nhắn, đứng lên: “Bệ hạ muốn gì, thần xin nghe.”",rf:"Lời nhắn đến tai cấm quân, ngài biết cung ngươi gửi tin vào yến."},
  {n:"Ngồi yên chờ",wx:"không để lại dấu tay nào",lx:"kẻ khác sẽ đứng lên trước cha, Sức −",rt:"Ngươi siết khăn tay bên đèn."}]},
 x1:{h:"Chén rượu thứ tư",w:"eun",t:"Tin thứ hai: ngài nói “Các khanh giao binh, nhận tước cao, mua ruộng tốt, kết thông gia với hoàng thất, chẳng sướng hơn sao?” Cha ngươi cầm chén, chưa uống. Tiểu thái giám còn đứng chờ ở cửa.",o:[
  {n:"Gửi vào một mảnh giấy: con xin cha uống",e:["win","lose"],rt:"Cha đọc mảnh giấy, uống cạn, quỳ xin giao binh. Các lão tướng lần lượt quỳ theo.",rf:"Mảnh giấy rơi giữa bàn tiệc, người đọc to lên. Có kẻ nói: “Đến con gái cũng phải nhắn vào ép cha.”"},
  {n:"Gửi ngài một bình rượu quê cha, kèm lời chúc",e:["win","mid"],rt:"Ngài hiểu ý, rót rượu quê cho cha, ban ruộng, tước cao và hôn ước cho cháu nội. Cha uống chén ấy.",rf:"Hoàng thượng ban ruộng, nhưng cha chỉ uống nửa chén."},
  {n:"Bảo tiểu thái giám lui, chờ trong cung",e:"mid",lx:"cha một mình trước chén rượu, nhà ngươi không có công",rt:"Cha uống, chậm rãi, không nói một lời."}]}},
 E:{win:{tag:"Một chén rượu, binh quyền về triều",w:"emp",t:"Các lão tướng giao binh trong tiếng cười. Cha ngươi được tước cao không binh, ruộng tốt, hôn ước với hoàng thất. Trong sử triều sẽ chép: yến đêm ấy không đổ một giọt máu.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Chư tướng giao binh, cha còn chần chừ",t:"Các lão tướng đều giao binh, riêng cha ngươi xin thêm thời hạn. Hoàng thượng không nói gì, chỉ ghi nhớ."},
  lose:{tag:"Yến tan trong nghi kỵ",w:"v",t:"Yến tan sớm. Nhà Lục kể khắp kinh thành rằng con gái Đại tướng quân phải nhắn tin vào ngự yến ép cha. Cha giận ngươi, vua cũng không vui.",go:(A,G)=>{rdRel(A,"v",G[0]);return e67dad(G[1])}}}});

rdDef("dtq_binh",8,{t:"Lời gièm pha",w:"v",sj:"lời gièm cha giấu quân riêng",cast(A){return rdCast(A,["v"])},
 g:"Nhà Lục và {v} gièm rằng cha ngươi đã giao binh phù nhưng vẫn nuôi quân riêng ở quê. Ngươi đáp lại, hay im lặng để lời gièm tự tắt.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Lời gièm sau ngày vui",w:"v",if:RDW(1),t:"Yến rượu vừa được khen khắp kinh thì {v} đã tâu nhỏ: ruộng vua ban cho cha ngươi có ba nghìn trai tráng cày cấy, “cày ruộng hay luyện quân, ai biết”.",o:[
  {n:"Mời Hoàng thượng đi xem ruộng",f:"open",wx:"ngài tự thấy",lx:"ngài cho là ngươi thách ngài",rt:"Hoàng thượng cười: “Mùa gặt trẫm sẽ ghé.”",rf:"Hoàng thượng nói: “Trẫm không có thì giờ đi xem ruộng.”"},
  {n:"Gửi thư bảo cha giải tán bớt người",f:"king",wx:"lời gièm mất chỗ bám",lx:"người theo cha mất kế sinh nhai, Sức −",rt:"Cha cho một nghìn người về quê."},
  {n:"Cười cho qua",wx:"{v} không ai hưởng ứng",lx:"lời gièm có thời gian lan",rt:"Ngươi cười: “Ruộng nhà ta còn nhiều cỏ hơn quân.” Cả phòng cười.",rf:"Không ai cười. Lời {v} ở lại trong lòng người nghe."}]},
 s2:{h:"Lời gièm đã thành sớ",w:"emp",if:RDW(0),t:"Lời gièm không dừng ở hậu cung: một Ngự sử thân nhà Lục dâng sớ nói cha ngươi giao binh phù giả, quân thật vẫn ở trong tay.",o:[
  {n:"Nhờ cha xin Binh bộ đếm quân trước triều",f:"open",wx:"sổ quân nói thay cha",lx:"đếm ra lệch một chút cũng thành tội",rt:"Binh bộ nhận lệnh đếm lại quân doanh Bắc.",rf:"Binh bộ đếm, lệch ba trăm người."},
  {n:"Nhờ cha dâng biểu tạ tội trước",f:"king",wx:"vua thấy cha biết điều",lx:"nhận lỗi không có thì như nhận thật, Sức −",rt:"Cha dâng biểu, lời lẽ khiêm cung."},
  {n:"Lặng lẽ dò nhà Lục",wx:"biết ai cấp tin cho Ngự sử",lx:"bạc mất, người dò bị bắt, nhà Lục có cớ kêu",rt:"Người cấp tin là thư lại Binh bộ ăn lương nhà Lục.",rf:"Người của ngươi bị nhà Lục bắt, đánh đuổi."}]},
 c1:{h:"Sổ lương thiếu năm nghìn suất",w:"emp",t:"Hộ bộ báo: doanh Bắc mười năm qua lĩnh dư năm nghìn suất lương. {v} hỏi to: “Năm nghìn miệng ăn ấy ở đâu?”",o:[
  {n:"Viết thư hỏi cha sự thật",f:"truth",wx:"biết năm nghìn suất đi đâu",lx:"cha giận vì bị con gái tra",rt:"Cha hồi thư: lương dư nuôi lính tàn phế và cô nhi tử sĩ, có sổ từng tên.",rf:"Cha chỉ viết: “Không có gì phải hỏi.”"},
  {n:"Bỏ bạc bù sổ cho êm",wx:"sổ sạch ngay",lx:"bù sổ là nhận có sai",rt:"Bạc vào Hộ bộ, sổ khép."},
  {n:"Hỏi lại {v}: sao biết sổ Hộ bộ",wx:"{v} lộ là có người trong Hộ bộ",lx:"Hoàng thượng thấy hai người đấu nhau",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} lúng túng, không đáp được.",rf:"{v} đáp: “Cả kinh thành đều biết.”"}]},
 c2:{h:"Nhân chứng buôn ngựa",w:"v",need:["v"],t:"{v} đưa đến một lái buôn ngựa: hắn khai đã bán cho người nhà ngươi hai trăm chiến mã sau ngày giao binh phù.",o:[
  {n:"Xin ngài cho Hình bộ đối chất lái buôn",wx:"lời khai lung lay",lx:"đối chất hỏng thì lời gièm thành thật",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hỏi ba câu, lái buôn không nói được màu lông ngựa.",rf:"Lái buôn đã được dặn kỹ, khai trôi chảy."},
  {n:"Tìm sổ chợ ngựa",f:"truth",wx:"có giấy tờ",lx:"sổ chợ có thể đã bị sửa",rt:"Sổ chợ ghi: hai trăm ngựa ấy bán cho nhà Lục.",rf:"Sổ chợ năm ấy “bị chuột cắn”."},
  {n:"Thừa nhận nhà có mua ngựa kéo cày",wx:"lời thật, không ai bắt được chối",lx:"chữ “ngựa” nằm trong sổ nghi của vua",rt:"Ngươi nói rõ: ngựa già, kéo cày, có giấy."}]},
 c3:{h:"Thái hậu hỏi chuyện",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi: “Ai gia nghe chuyện ruộng và ngựa. Con nói ai gia nghe.”",o:[
  {n:"Kể hết, xin bà phân xử",wx:"Thái hậu đứng về phía ngươi",lx:"Thái hậu thấy ngươi mang chuyện triều vào Đức Thọ cung",rt:"Thái hậu gật: “Công thần không nên bị bới móc.”",rf:"Thái hậu chỉ nói: “Con giữ mình.”"},
  {n:"Thưa nhẹ: chuyện người ngoài thêu dệt",wx:"bà thấy ngươi điềm tĩnh",lx:"bà không có lý do nói giúp, Sức −",rt:"Thái hậu cười, ban ngươi đĩa bánh."}]},
 t1:{h:"Sự thật ở đồn điền",w:"maid",t:"Người của ngươi về báo: ba nghìn người trên ruộng cha là lính già, lính tàn phế, góa phụ tử sĩ. Có cả sổ tên từng người.",o:[
  {n:"Xin sổ tên đưa vào cung",f:"truth",wx:"có chứng cứ trong tay",lx:"sổ bị nhà Lục chặn dọc đường",rt:"Cuốn sổ dày đến tay ngươi, mép giấy ngả vàng.",rf:"Người mang sổ bị chặn, sổ bị mất một nửa."},
  {n:"Nhờ nhà mời một Ngự sử trung lập về xem",f:"open",wx:"người ngoài nói thay nhà ngươi",lx:"Ngự sử về nói theo ý nhà Lục",rt:"Ngự sử về, dâng tờ sớ ngắn: “Ruộng cày, không có giáo mác.”",rf:"Ngự sử về, chỉ nói “còn phải xét”."},
  {n:"Giữ kín, không muốn phơi lính tàn phế",wx:"giữ thể diện cho người già",lx:"không có gì để đáp lại lời gièm",rt:"Ngươi khép thư, không cho ai xem."}]},
 x1:{h:"Trước mặt Hoàng thượng",w:"emp",t:"Hoàng thượng cho gọi ngươi và {v} đến Dưỡng Tâm điện: “Hai nàng nói hai lời. Trẫm nghe ai?”",o:[
  {n:"Dâng sổ đồn điền, đọc từng tên",e:["win","lose"],rt:"Ngươi đọc tên một góa phụ tử sĩ. Hoàng thượng giơ tay: “Đủ rồi.” {v} quỳ xuống.",rf:"Sổ có tên trùng, {v} chỉ ra ngay. Ngài nhíu mày."},
  {n:"Xin ngài tự cử người đi xem",e:["win","mid"],rt:"Người của ngài về, nói đúng như ngươi.",rf:"Người của ngài về chậm, chuyện đã nguội."},
  {n:"Không cãi, xin ngài xét",e:"mid",lx:"lời {v} không ai bác",rt:"Ngươi cúi đầu. {v} cũng không nói thêm."}]}},
 E:{win:{tag:"Lời gièm đổ trước sổ tên",w:"emp",t:"Hoàng thượng ban cho đồn điền của cha một tấm biển “Dưỡng sĩ”. {v} bị phạt chép kinh, nhà Lục mất mặt.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Lời gièm treo lơ lửng",t:"Không ai thắng. Lời gièm không thành tội, nhưng cũng không ai rửa nó đi."},
  lose:{tag:"Đồn điền bị tịch thu",w:"v",t:()=>`${rdEnd(7)==="win"?"Hoàng thượng thu ruộng ban":"Hoàng thượng sai quan huyện thu đồn điền nhà ngươi ở quê"}, cho người già về quê. Cha ngươi im lặng, nhưng đêm ấy đốt cả đống thư cũ.`,go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_binh",9,{t:"Vua hay cha",w:"emp",sj:"lời nhắn ngươi mang giữa vua và cha",cast(A){return rdCast(A,["v"])},
 g:"Vua và cha không còn nói thẳng với nhau, chỉ nói qua ngươi. Lời nào ngươi mang đi nguyên vẹn, lời nào ngươi sửa, sẽ quyết nhà ngươi còn đứng hay đổ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ngài nhờ một lời",w:"emp",if:RDW(1),t:"Hoàng thượng nói nhỏ: “Trẫm muốn cha nàng nhận chức Thái phó, ở kinh dạy hoàng tử. Nàng nói với ông giúp trẫm.” Ai cũng hiểu: Thái phó thì không cầm quân.",o:[
  {n:"Nhận lời, hứa nói nguyên văn",f:"king",wx:"ngài tin ngươi mang lời đúng",lx:"cha sẽ biết ai đưa lời đến",rt:"Hoàng thượng đặt vào tay ngươi một chén trà."},
  {n:"Xin ngài tự nói, thần thiếp chỉ đứng bên",wx:"ngươi không phải người đưa tin",lx:"ngài cho là ngươi tránh việc",rt:"Hoàng thượng gật: “Được, nàng ngồi bên.”",rf:"Hoàng thượng nói: “Trẫm nhờ nàng, vì trẫm không muốn tự nói.”"},
  {n:"Hỏi ngài: nếu cha từ chối thì sao",wx:"biết đường lui của vua",lx:"ngài thấy ngươi mặc cả",rt:"Hoàng thượng im một lúc: “Thì trẫm sẽ phải tìm lời khác.”",rf:"Hoàng thượng không trả lời."}]},
 s2:{h:"Hai lá thư một đêm",w:"maid",if:RDW(0),t:"Cùng một đêm, {maid} mang đến hai lá thư: một của Hoàng thượng gửi ngươi chuyển cho cha, một của cha gửi ngươi chuyển cho vua. Cả hai đều niêm.",o:[
  {n:"Bóc cả hai ra đọc trước",f:"read",wx:"biết cả hai bên muốn gì",lx:"dấu niêm bị phát hiện đã mở",rt:"Vua muốn cha lên kinh; cha muốn vua cho ông ở lại biên ải.",rf:"Niêm thư của vua không khép lại được như cũ."},
  {n:"Chuyển nguyên niêm cả hai",wx:"tay sạch, không ai trách",lx:"không biết mình đang mang gì, Sức −",rt:"Ngươi giao hai lá thư, không đọc một chữ."},
  {n:"Chỉ chuyển thư của vua",f:"king",wx:"ngài biết ngươi chọn ngài",lx:"cha chờ mãi không thấy hồi âm, Sức −",rt:"Thư cha nằm lại trong ngăn kéo của ngươi."}]},
 c1:{h:"Cha hỏi ý vua",w:"dad",t:"Cha xin vào cung thăm ngươi, hỏi thẳng: “Vua muốn cha chết, hay muốn cha sống mà không còn binh quyền?”",o:[
  {n:"Nói thật: vua muốn cha yên",f:"king",wx:"cha bình tâm hơn",lx:"cha cho là ngươi đã thành người của vua",rt:"Cha gật đầu, lần đầu không cãi.",rf:"Cha đứng dậy: “Con nói như thái giám.”"},
  {n:"Nói thật: vua sợ cha",f:"dad",wx:"cha hiểu phải làm gì để vua bớt sợ",lx:"lời ngươi đến tai vua",rt:"Cha ngồi lặng thật lâu: “Vậy cha phải tự tay giao hết binh quyền thôi.”",rf:"Có cung nhân đứng ngoài cửa nghe được."},
  {n:"Nói chuyện nhà, không đáp",wx:"giữ được bữa cơm cha con",lx:"cha về với lòng nghi",rt:"Cha ăn hết bát canh, không hỏi lại."}]},
 c2:{h:"Chiếu niêm trong tay ngươi",w:"emp",t:"Hoàng thượng đưa ngươi một tờ chiếu niêm kín: “Đưa cho cha nàng. Đừng mở.” {v} thấy, nói to: “Phi tần lại cầm chiếu việc triều?”",o:[
  {n:"Đưa nguyên niêm, không mở",f:"king",wx:"ngài thử lòng và ngươi qua",lx:"{v} có cớ nói ngươi tham dự việc triều",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi giao chiếu, dấu niêm còn nguyên."},
  {n:"Xin ngài giao cho {eun} mang",wx:"không ai nói được gì",lx:"ngài thấy ngươi không muốn được tin",rt:"Hoàng thượng cười: “Nàng biết giữ mình.”",rf:"Hoàng thượng cất chiếu đi, không nói gì."},
  {n:"Đáp {v}: thần thiếp chỉ là con gái đưa thư nhà",wx:"{v} cụt lời",lx:"lời ấy đến tai Ngự sử",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Cả phòng cười. {v} quay đi.",rf:"{v} cười nhạt: “Thư nhà có ấn ngọc tỷ sao?”"}]},
 c3:{h:"Tai mắt quanh {maid}",w:"maid",t:"{maid} bị một thái giám lạ hỏi han mãi về thư từ của cung ngươi. Không biết là người của vua, hay người của nhà Lục.",o:[
  {n:"Cho {maid} nói dối một câu thử",wx:"biết hắn là người của ai",lx:"hắn biết bị thử, {maid} bị để mắt, đường dò của ngươi lộ",rt:"Câu dối đến tai nhà Lục ngay hôm sau.",rf:"Hắn biết bị thử, không đến nữa."},
  {n:"Đổi người đưa thư",wx:"đường thư kín hơn",lx:"không biết ai đã dò",rt:"Ngươi giao thư cho một cung nữ mới."}]},
 t1:{h:"Đêm cha con trong vườn",w:"dad",t:"Cha được ân vào vườn Ngự uyển gặp ngươi lần cuối trước khi quyết. Ông hỏi: “Con là con gái cha, hay là phi tần của vua?”",o:[
  {n:"Đáp: con là cả hai, nên cha phải tin con",f:"both",wx:"cha giao cho ngươi quyết",lx:"cha thấy con nói khéo, không nói thật",rt:"Cha nắm tay ngươi: “Được. Cha nghe con.”",rf:"Cha buông tay: “Cả hai thì không là gì cả.”"},
  {n:"Đáp: con là phi tần của vua",f:"king",wx:"lời thật, vua sẽ biết",lx:"cha quay lưng, Sức −",rt:"Cha gật đầu, mắt đỏ, không nói gì."},
  {n:"Đáp: con là con gái cha",f:"dad",wx:"cha yên lòng",lx:"lời ấy có thể đến tai vua",rt:"Cha ôm ngươi như hồi ngươi còn nhỏ."}]},
 x1:{h:"Lời mang đến ngự tiền",w:"emp",t:"Sáng hôm sau, Hoàng thượng hỏi: “Cha nàng trả lời trẫm thế nào?”",o:[
  {n:"Thưa nguyên văn, cả lời giận của cha",e:["win","lose"],rt:"Hoàng thượng nghe xong, bật cười: “Ông ta vẫn thẳng như thế. Thế mới đáng tin.”",rf:"Hoàng thượng nghe đến câu giận, đặt chén xuống, không nói nữa."},
  {n:"Thưa ý cha, bỏ bớt lời gắt",e:["win","mid"],rt:"Hoàng thượng gật đầu: “Thế thì được.”",rf:"Hoàng thượng nhìn ngươi: “Ông ta không nói thế đâu.”"},
  {n:"Xin ngài hỏi thẳng cha",e:"mid",lx:"lời không qua tay ngươi, ngài không còn nhờ ngươi",rt:"Hoàng thượng cho gọi cha ngươi vào triều."}]}},
 E:{win:{tag:"Lời đi đúng lòng cả hai",w:"emp",t:"Cha nhận chức Thái phó, vua giữ lời cho ông về biên ải mỗi mùa thu. Hai người đàn ông ngươi thương nhất nói chuyện được với nhau, qua ngươi.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Lời đến, lòng chưa đến",t:"Lời được mang đi, nhưng cả vua lẫn cha đều thấy thiếu một điều gì. Từ nay họ nói thẳng với nhau, không qua ngươi nữa."},
  lose:{tag:"Cha con cách mặt",w:"dad",t:"Cha cho là ngươi bán lời ông cho vua; vua cho là ngươi giấu lời cha. Thư nhà thôi gửi, và Hoàng thượng thưa đến cung ngươi.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_binh",10,{t:"Ngày giao binh phù",w:"dad",sj:"ngày cha giao ấn soái",cast(A){return rdCast(A,["v"])},
 g:"Ngày cha giao ấn soái cuối cùng đã định. Lính cũ đổ về cổng thành tiễn chủ soái, nhà Lục nóng lòng nhận ấn. Một tiếng hô sai cũng thành binh biến.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ngày đã định",w:"emp",if:RDW(1),t:"Hoàng thượng cho chọn ngày lành. Cha ngươi sẽ giao ấn soái trước cửa Đông Hoa, có cả văn võ bá quan. Phi tần không được ra, nhưng đêm trước ngài hỏi ngươi muốn gửi gì cho cha.",o:[
  {n:"Xin ngài tự tay rót chén tiễn cha",f:"king",wx:"quân thấy nhà chủ soái được vua trọng",lx:"có kẻ nói phi tần sắp đặt cả nghi lễ của triều",rt:"Hoàng thượng gật đầu: “Trẫm sẽ rót.”",rf:"Lễ quan tâu không hợp lễ, ngài thôi."},
  {n:"Gửi cha tấm áo bào tự tay khâu",f:"dad",wx:"lính cũ thấy nhà chủ soái không bỏ họ",lx:"ngài thấy ngươi chọn đứng phía cha",rt:"Cha mặc áo bào ấy ra cổng, lính cũ nhận ra đường kim của con gái chủ soái.",rf:"Áo đến tay cha, nhưng ngài hỏi: “Nàng khâu áo cho cha, có khâu cho trẫm không?”"},
  {n:"Ở lại cung cầu an",wx:"không ai nói được gì",lx:"ngày lớn của nhà mình mà ngươi vắng mặt, Sức −",rt:"Ngươi thắp hương ở Phụng Tiên điện."}]},
 s2:{h:"Ngày giao ấn bị ép sớm",w:"v",if:RDW(0),t:"{v} xin Hoàng thượng dời ngày giao ấn lên sớm nửa tháng, “kẻo lâu sinh biến”. Ngài đồng ý. Cha ngươi chưa kịp dặn dò quân.",o:[
  {n:"Xin ngài giữ ngày cũ",wx:"cha có thời gian dặn quân",lx:"ngài thấy ngươi cản",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hoàng thượng ngẫm, giữ ngày cũ.",rf:"Hoàng thượng nói: “Đã định rồi.”"},
  {n:"Gửi thư bảo cha dặn quân ngay",f:"dad",wx:"quân biết trước, không bất ngờ",lx:"thư gửi gấp có thể lọt",rt:"Cha gửi thư khắp các doanh trong một đêm."},
  {n:"Để ngày sớm, không cãi",f:"king",wx:"vua thấy ngươi thuận",lx:"quân cũ bị bất ngờ, Sức −",rt:"Ngươi chỉ cúi đầu."}]},
 c1:{h:"Lính cũ ngoài cổng thành",w:"maid",t:"Thị vệ báo: hơn một nghìn lính cũ tự kéo về đóng ngoài cổng thành, nói chỉ muốn tiễn chủ soái. Cấm quân đã giương cung.",o:[
  {n:"Gửi rượu và lời ra cổng",wx:"lính cũ yên, uống rượu tiễn",lx:"cung trong gửi rượu cho quân ngoài thành, ai cũng nhìn",rt:"Lính cũ nhận rượu, hô một tiếng “Tiễn chủ soái” rồi ngồi xuống.",rf:"Rượu đến, có kẻ say hô bậy."},
  {n:"Xin Hoàng thượng cho họ đứng tiễn",f:"king",wx:"vua biến đám đông thành nghi lễ",lx:"ngài thấy ngươi bênh quân",rt:"Ngài cho lính cũ xếp hàng hai bên đường.",rf:"Ngài bảo: “Đuổi về.”"},
  {n:"Báo cha tự ra giải tán",wx:"lính nghe chủ soái",lx:"lính cũ thấy chủ soái quay lưng, Sức −",rt:"Cha ra cổng, nói một câu, lính cũ khóc rồi tản."}]},
 c2:{h:"Nhà Lục khiêu khích",w:"v",need:["v"],t:"Phó soái họ Lục cho thân binh mặc giáp mới diễu qua cổng nơi lính cũ đứng. {v} cười: “Quân mới phải cho quân cũ thấy chứ.”",o:[
  {n:"Xin Hoàng hậu cấm diễu binh trong ngày lễ",need:["hh"],wx:"tránh được va chạm",lx:"Hoàng hậu thấy ngươi việc gì cũng nhờ",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hoàng hậu truyền lệnh, thân binh nhà Lục phải lui.",rf:"Hoàng hậu nói: “Việc của Binh bộ.”"},
  {n:"Nói thẳng với {v}",wx:"{v} biết ngươi nhìn thấu",lx:"hai người cãi nhau trước cung nhân",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} tái mặt: “Ai bảo muội xúi?” Rồi cho người báo biểu huynh lui.",rf:"{v} cười to hơn."},
  {n:"Bảo lính cũ quay mặt đi",wx:"không ai thấy ai",lx:"lính cũ thấy nhục",rt:"Lính cũ quay mặt vào tường thành."}]},
 c3:{h:"Vết thương cũ của cha",w:"dad",t:"Ba ngày trước lễ, thư nhà báo: vết thương cũ của cha trở trời, cha xin nằm nghỉ. Nhà Lục nói ông giả bệnh để hoãn.",o:[
  {n:"Gửi Thái y giỏi nhất của Thái y viện",wx:"cha gượng dậy được",lx:"bạc mất, cha vẫn đau, phải để người dìu",go:(A,ok,G)=>ok?"":e67dad(G[0]),rt:"Cha uống ba thang, đứng dậy được.",rf:"Thuốc không đỡ, cha phải để người dìu."},
  {n:"Xin hoãn lễ",wx:"cha có thời gian dưỡng",lx:"lời “giả bệnh” thêm cánh",rt:"Hoàng thượng cho hoãn mười ngày.",rf:"Hoàng thượng nói: “Ngày đã định.”"},
  {n:"Viết thư cho cha: nằm cũng phải đến",wx:"không ai nói được ông giả bệnh",lx:"cha mệt, lòng con đau",rt:"Cha hồi thư: “Cha sẽ đến, dù phải khiêng.”"}]},
 t1:{h:"Tiếng hô ở cổng",w:"eun",t:"Ngươi ở trong cung chờ tin. Tiểu thái giám chạy về: đúng lúc cha trao ấn, lính cũ hô “Chủ soái không đi!”, cấm quân đã rút gươm. Hoàng thượng còn trên lầu cửa Đông Hoa.",o:[
  {n:"Nhờ {eun} đưa cha một dòng chữ",wx:"cha trấn được quân",lx:"người ta thấy cung ngươi nhúng tay chuyện ngoài cổng",rt:"Cha đọc dòng chữ, quay lại giơ tay. Lính cũ quỳ cả xuống.",rf:"Tiểu thái giám bị cấm quân giữ lại, dòng chữ đến tay Ngự sử."},
  {n:"Chạy sang Đức Thọ cung xin Thái hậu nhắn ngài",need:["th"],wx:"vua giữ cấm quân",lx:"ngài biết ngươi kéo Thái hậu vào việc binh",rt:"Thái hậu sai người lên lầu. Hoàng thượng giơ tay: “Thu gươm.”",rf:"Lời Thái hậu đến chậm một khắc."},
  {n:"Viết vội mấy chữ xin ngài đừng động binh",wx:"vua giữ cấm quân",lx:"ngài thấy hậu cung chen vào lúc nguy",rt:"Ngài đọc mấy chữ, giơ tay: “Thu gươm.”",rf:"Mấy chữ đến khi gươm đã vung."},
  {n:"Nín thở chờ",wx:"không ai nói ngươi xen vào",lx:"mọi chuyện nằm ngoài tay ngươi, Sức −",rt:"Ngươi siết chặt tràng hạt."}]},
 x1:{h:"Ấn soái đổi tay",w:"emp",t:"Đêm trước lễ, Hoàng thượng ngồi trong Ngự thư phòng, lật đi lật lại nghi thức trao ấn. Ngài hỏi như hỏi chính mình: “Ấn nên đi thế nào cho êm?”",o:[
  {n:"Thưa: để cha tự tay trao ấn",e:["win","lose"],rt:"Cha trao ấn, nói với Lục một câu chỉ hai người nghe. Lính cũ quỳ tiễn.",rf:"Cha trao ấn, tay run, ấn rơi xuống khay. Nhà Lục bảo là điềm gở."},
  {n:"Thưa: ngài nhận ấn trước rồi mới trao Lục",e:["win","mid"],rt:"Ấn qua tay vua, ai cũng hiểu binh là của vua.",rf:"Ấn qua tay vua, nhưng lính cũ không hiểu, xì xào."},
  {n:"Thưa: việc ấy để lễ quan lo",e:"mid",lx:"ngày lớn của nhà mình mà ngươi không có một lời",rt:"Lễ quan hô, ấn đổi tay, xong."}]}},
 E:{win:{tag:"Ấn soái đổi tay êm",w:"emp",t:"Ấn soái đổi tay trong tiếng trống. Lính cũ quỳ tiễn, cha ngươi bước xuống thềm không ngoảnh lại. Hoàng thượng nói: “Hôm nay trẫm mới ngủ được.”"},
  mid:{tag:"Ấn đổi tay, lòng quân chưa yên",t:"Ấn đã trao. Nhưng ở doanh Bắc, lính cũ vẫn gọi phó soái họ Lục là “người mới”.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Ngày giao ấn có máu",w:"v",t:"Một lính cũ bị cấm quân chém ngay cổng thành. Cha giao ấn xong thì quỵ xuống. Nhà Lục gọi đó là “dẹp loạn”.",go:(A,G)=>{rdRel(A,"v",G[0]);return e67dad(G[1])}}}});

rdDef("dtq_binh",11,{t:"Công thần về hưu",w:"dad",sj:"những ngày cuối cùng của cha ở triều",cast(A){return rdCast(A,["v"])},
 g:"Binh quyền đã trao, nhưng doanh Bắc vẫn gọi tên cha. Cha về vườn vinh hiển, hay bị gọi trở lại, hay bị gạch tên khỏi sử — đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Biểu xin về hưu",w:"dad",if:RDW(1),t:"Cha soạn biểu xin về hưu, gửi vào cung nhờ ngươi xem lời trước khi dâng: “Con hiểu vua hơn cha.”",o:[
  {n:"Sửa lời cho khiêm cung hơn",f:"king",wx:"biểu đến tay vua mềm như lụa",lx:"cha thấy con sửa cả khí phách ông",rt:"Biểu dâng lên, Hoàng thượng đọc hai lần.",rf:"Cha đọc bản sửa, gạch đi một nửa."},
  {n:"Giữ nguyên lời cha",f:"dad",wx:"lời thật của một lão tướng",lx:"vài câu cứng có thể làm vua phật lòng",rt:"Ngươi gửi lại biểu, không sửa một chữ."},
  {n:"Thêm một câu xin cho huynh trưởng",f:"bro",wx:"huynh trưởng có thể được nhắc",lx:"vua thấy nhà ngươi chưa buông",rt:"Câu ấy được giữ lại trong biểu.",rf:"Hoàng thượng gạch câu ấy bằng mực son."}]},
 s2:{h:"Cha bị gọi về hỏi tội",w:"emp",if:RDW(0),t:"Sau ngày giao ấn không yên, Binh bộ dâng sớ hỏi tội cha: để lính cũ tụ tập, làm náo cổng thành. Hoàng thượng chưa phê.",o:[
  {n:"Xin ngài để cha tự về hưu thay vì hỏi tội",f:"king",wx:"cha có lối ra trong danh dự",lx:"ngài thấy ngươi xin quá nhiều",rt:"Hoàng thượng phê: “Cho về hưu.”",rf:"Hoàng thượng chưa phê."},
  {n:"Nhờ mẹ dâng sổ tên lính cũ làm chứng",f:"dad",wx:"lính cũ đến vì tình, không vì loạn",lx:"tên lính cũ bị Binh bộ ghi lại",rt:"Sổ cho thấy lính cũ đến tay không, không ai mang giáo.",rf:"Binh bộ lấy sổ làm danh sách bắt người."},
  {n:"Để Binh bộ xét",wx:"tay ngươi sạch",lx:"cha một mình trước triều",rt:"Ngươi không nói gì."}]},
 c1:{h:"Lục thua trận ở biên",w:"emp",t:"Tin biên: phó soái họ Lục thua một trận nhỏ ở cửa ải. Trong triều có người nói: “Không có Đại tướng quân, quân Bắc như rắn mất đầu.”",o:[
  {n:"Khuyên ngài đừng gọi cha lại",f:"king",wx:"ngài thấy ngươi không mưu lợi cho nhà mình",lx:"cha mất dịp cuối cùng, Sức −",rt:"Hoàng thượng nhìn ngươi khác hẳn."},
  {n:"Gợi ý ngài hỏi cha một kế",f:"dad",wx:"cha giúp vua mà không cầm quân",lx:"vua nghe ra ý nhà ngươi muốn trở lại",rt:"Cha gửi vào một kế, Lục giữ được ải.",rf:"Hoàng thượng nói: “Trẫm có tướng của trẫm.”"},
  {n:"Im lặng",wx:"không ai bắt lỗi",lx:"nhà Lục đổ lỗi thua trận cho lính cũ của cha, Sức −",rt:"Ngươi khép cửa cung."}]},
 c2:{h:"Đòn cuối của {v}",w:"v",need:["v"],t:"{v} khóc trước Hoàng thượng: anh họ nàng ta thua vì lính cũ của Đại tướng quân không chịu nghe lệnh. Nàng ta xin trị tội cha ngươi.",o:[
  {n:"Đưa thư cha dặn lính cũ phải nghe Lục",wx:"lời {v} bị lật ngược",lx:"thư ấy không đủ sức",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng thượng đọc thư, quay sang {v}: “Nàng còn gì nói nữa?”",rf:"Hoàng thượng cất thư, không phán."},
  {n:"Đến cung {v} làm hòa",wx:"{v} thôi đánh",lx:"{v} cho là ngươi yếu thế",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận quà, nói nhỏ: “Biểu huynh của muội cũng mệt rồi.”",rf:"{v} trả quà về."},
  {n:"Không đáp, để {v} khóc",wx:"không thêm thù",lx:"nước mắt {v} có tác dụng, Sức −",rt:"Ngươi cúi đầu chờ."}]},
 c3:{h:"Huynh trưởng xin một lời",w:"dad",t:"Huynh trưởng vào thỉnh an ngươi: “Cha về hưu, nhà ta không còn ai cầm quân. Muội nói giúp ta một lời được không?”",o:[
  {n:"Hứa sẽ nhắc tên huynh",f:"bro",wx:"huynh có hy vọng",lx:"vua nghe tên huynh như nghe tên cha",rt:"Huynh lạy ngươi một lạy.",rf:"Huynh về, nghe tin vua cau mày."},
  {n:"Khuyên huynh tự lập công",wx:"huynh đi đường thẳng",lx:"huynh nghĩ muội lạnh lòng, Sức −",rt:"Huynh im lặng ra về."}]},
 t1:{h:"Ai cầm quân Bắc",w:"emp",t:"Một đêm trong Ngự thư phòng, Hoàng thượng than một mình: “Quân Bắc nên giao cho ai lâu dài? Lục, hay một tướng triều, hay…” Ngài bỏ lửng. Việc chọn tướng là của ngài; ngươi chỉ có thể khẽ nói một lời.",o:[
  {n:"Khẽ nhắc tên huynh trưởng",f:"bro",wx:"nhà ngươi có thể giữ quân Bắc qua đời sau",lx:"vua thấy nhà ngươi muốn giữ binh mãi",rt:"Hoàng thượng không nói, nhưng gật nhẹ.",rf:"Hoàng thượng nói: “Trẫm biết nàng sẽ nói thế.”"},
  {n:"Thưa: giữ Lục, cho ông thời gian",f:"king",wx:"vua thấy ngươi không tham",lx:"nhà Lục vững thêm, Sức −",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Hoàng thượng thở ra: “Nàng nói như một đại thần.”"},
  {n:"Thưa: việc của ngài",wx:"không để lại lời",lx:"ngài không biết ngươi nghĩ gì",rt:"Hoàng thượng không hỏi lại."}]},
 x1:{h:"Đêm trước buổi chầu cuối",w:"emp",t:"Mai cha vào chầu lần cuối. Đêm nay Hoàng thượng ghé cung ngươi, ngồi lâu không nói. Ân điển cho cha là của ngài; một lời bên gối có thể làm nó nặng hay nhẹ.",o:[
  {n:"Xin ngài mai tự rót chén tiễn cha",e:["win","lose"],rt:"Hoàng thượng đứng dậy cùng nâng chén. Cha uống, lạy ba lạy, đi giữa hai hàng bá quan.",rf:"Ngự sử biết lời xin ấy từ hậu cung, dâng sớ can. Buổi chầu tan trong lời xì xào."},
  {n:"Xin ngài để cha giữ một hàm võ",e:["win","mid"],rt:"Hoàng thượng cho cha giữ hàm Đại tướng quân, không quân, kèm tước Quốc công và ruộng ban. Lính cũ vẫn gọi ông là chủ soái, mà không ai nghi.",rf:"Hoàng thượng cho cha giữ quân thêm ba năm. Từ đó mọi ánh mắt nghi đổ về cung ngươi."},
  {n:"Chỉ pha trà, không xin gì",e:"mid",lx:"cha đi mà không có lời nào của con, vua cũng không nhắc tên nhà ngươi",rt:"Hôm sau ngươi chỉ nghe tin cha đã ra khỏi cửa Ngọ Môn."}]}},
 E:{win:{tag:"Cha về hưu vinh hiển",w:"dad",t:"Cha về quê với tước Quốc công, ruộng ban và tấm biển ngự bút. Nhà ngươi không còn binh quyền, nhưng cũng không ai dám động đến. Sử triều chép: một công thần trọn vẹn.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha còn giữ binh, ngươi bị nghi",t:"Cha giữ được hàm, hay giữ được quân thêm ít năm. Nhưng từ nay, mỗi lần biên ải có biến, ánh mắt trong cung lại nhìn về phía ngươi."},
  lose:{tag:"Cha bị gạch tên công thần",w:"v",t:"Cha về quê không tước, không biển. Nhà Lục cầm quân Bắc. Ngươi vẫn ở trong cung, đường lên vẫn còn, nhưng sau lưng không còn tiếng trống doanh Bắc.",go:(_A,G)=>e67dad(G[0])}}});
RD97L.push(rdRare({a:"dtq_binh_11",tag:"Binh phù trao tay huynh trưởng",w:"emp",n:"Xin ngài trao binh phù cho huynh trưởng",
 path:["Xin ngài để cha vào triều tự dâng","Thưa: thưởng ông vì trung","Xin ngài cho cha dâng kiếm trong yến","Đáp: con là cả hai","Xin Hoàng thượng cho họ đứng tiễn","Thêm một câu xin cho huynh","Hứa sẽ nhắc tên huynh","Khẽ nhắc tên huynh trưởng","Gợi ý ngài hỏi cha một kế","Đưa thư cha dặn lính cũ","Xin ngài mai tự rót chén tiễn cha","Thưa: để cha tự tay trao ấn"],bad:["Để Binh bộ xét","Khuyên huynh tự lập công","Chỉ pha trà, không xin gì"],x:[()=>S.sung>=RR("dtq_binh_11").bar,"Sủng từ "+RR("dtq_binh_11").bar],
 t:"Hoàng thượng cho triệu huynh trưởng vào Ngự thư phòng, tự tay trao nửa hổ phù: “Binh này trẫm giao cho khanh. Nhớ rằng nó đến từ trẫm.” Đêm ấy ngài nói với ngươi: “Lời nàng, trẫm nghe đã lâu.” Quân Bắc lại có người nhà chủ soái cầm cờ, mà lần này binh là của vua.",go:(_A,G)=>e67dad(G[0]),rw:"ngocboi",ti:"Người tiến cử tướng Bắc"}));

/* ---------- dtq_huynh · Người anh nơi đất giặc ---------- */
/* Road rival {v}: the consort whose father leads the war faction (.4 c1/c3: she spread "your brother turned"). Cast in .5, carried to .11.
   After .4 «win/win2/mid» the brother is home but his hundred personal guards are still held; after .4 «lose» he is held with them
   (DTQH_IN). The enemy also holds a surrender paper he signed under the knife to save his men: it surfaces in .6 and is judged in .9–.11.
   Chapter numbers: BAL.road.dtq_huynh.mon = months left before the Hắc Thủy river freezes and the ransom road closes (.5). */
const DTQH_MON=()=>kitNumVi(BAL.road.dtq_huynh.mon);
const DTQH_IN=()=>rdEnd(4)==="lose";
/* .5 c1 «Mượn bạc của {eun}» (flag no): the Tổng quản takes back BAL.road.dtq_huynh.owe bạc (loan + interest) when .5 ends, whatever the ending */
const DTQH_OWE=A=>{if(!A||!A.f||!A.f.no)return "";const n=BAL.road.dtq_huynh.owe;apply({bac:-n});return fill67(`{eun} đến đòi nợ, lấy lại ${kitNumVi(n)} lượng bạc cả vốn lẫn lãi.`,A)};
const DTQH_HOS=()=>DTQH_IN()?"huynh trưởng cùng trăm thân binh":"trăm thân binh của huynh trưởng";

rdDef("dtq_huynh",5,{t:"Tiền chuộc",w:"dad",sj:"tiền chuộc người nhà nơi đất giặc",cast(A){return rdCast(A,["v"])},
 g:()=>`Giặc đòi ba vạn lượng để thả ${DTQH_HOS()}. ${DTQH_MON()[0].toUpperCase()+DTQH_MON().slice(1)} tháng nữa sông Hắc Thủy đóng băng, đường chuộc khép lại. Nhà ngươi đã cạn bạc từ lần trước.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Huynh gọi tên người còn lại",w:"dad",if:RDW(1),t:()=>`Huynh trưởng đã về kinh, nhưng đêm nào cũng giật mình gọi tên thân binh. Giặc gửi thư: ba vạn lượng cho ${DTQH_HOS()}, trước khi sông Hắc Thủy đóng băng.`,o:[
  {n:"Hứa với huynh sẽ lo",wx:"huynh ngủ được một đêm yên",lx:"lời hứa nặng hơn túi bạc của ngươi",rt:"Huynh nắm tay ngươi, không nói được lời nào."},
  {n:"Xin Hoàng thượng ban bạc tuất cho thân binh",f:"permit",wx:"vua biết chuyện, không thể nói ngươi làm lén",lx:"vua bực vì chuyện tù binh lại đến tai ngài",rt:"Hoàng thượng thở dài: “Trẫm sẽ nghĩ.”",rf:"Hoàng thượng nói: “Nước không chuộc lính.”"},
  {n:"Khuyên huynh quên đi",wx:"nhà không dốc bạc vào chỗ không đáy",lx:"huynh nhìn ngươi như người lạ",rt:"Huynh đứng dậy ra về, không chào."}]},
 s2:{h:"Thư cha: bạc nhà đã cạn",w:"dad",if:RDW(0),t:()=>`Thư {dad}: bạc nhà đã dốc cả vào lần chuộc trước. Giặc lại đòi ba vạn lượng cho ${DTQH_HOS()}. “Con trong cung, có cách gì không?”`,o:[
  {n:"Gửi hết bạc riêng về nhà",wx:"nhà có một phần tiền chuộc",lx:"kho riêng của ngươi trống trơn",rt:"Bạc ra khỏi cung trong hộp đựng kinh."},
  {n:"Xin Hoàng thượng cho chuộc công khai",f:"permit",wx:"việc chuộc có chiếu, không ai bắt lỗi",lx:"phe đánh thấy ngươi xin vua làm nhục nước",rt:"Hoàng thượng phê một chữ “Chuẩn”.",rf:"Hoàng thượng gạt tấu đi."},
  {n:"Hồi thư: chờ triều đình",wx:"nhà không làm liều",lx:"thời gian trôi, sông sắp đông, Sức −",rt:"Cha không hồi âm nữa."}]},
 c1:{h:"Tổng quản cho vay",w:"eun",t:"{eun} khẽ nói: Nội vụ phủ có một khoản bạc chưa vào sổ, có thể cho mượn. Lãi thì tính sau, “{N} nhớ ơn là được”.",o:[
  {n:"Mượn bạc của {eun}",f:"no",wx:"có bạc ngay để lo việc chuộc",lx:"hết hồi này {eun} đòi lại cả vốn lẫn lãi",rt:"{eun} đưa bạc trong đêm, không có giấy: “Cuối mùa nô tài xin lại, kèm chút lãi.”"},
  {n:"Gửi trang sức nhờ {eun} bán",wx:"có bạc mà không mang nợ",lx:"{eun} ăn bớt, cung nhân đồn ngươi bán đồ ngự ban",rt:"Trâm ngọc thành bạc trong ba ngày.",rf:"{eun} trả về ít hơn một nửa giá."},
  {n:"Từ chối, nhắc hắn về sổ sách",wx:"{eun} biết ngươi nắm thóp hắn",lx:"{eun} oán, đường Nội vụ phủ khó đi",rt:"{eun} cười gượng, lui ra.",rf:"{eun} cười: “Sổ nào? Nô tài không biết.”"}]},
 c2:{h:"{v}: chuộc là nuôi giặc",w:"v",need:["v","hh"],t:"{v} nói trong buổi thỉnh an Hoàng hậu: “Ba vạn lượng ấy, giặc sẽ mua đao giết lính ta. Nhà nào chuộc riêng là nhà ấy nuôi giặc.”",o:[
  {n:"Đáp: nhà ta chuộc người, không chuộc đất",wx:"cả phòng nghe lẽ phải",lx:"Hoàng hậu thấy hai người cãi nhau ở cung bà",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng hậu gật đầu. {v} cắn môi.",rf:"Hoàng hậu nói: “Thôi, đây không phải chỗ bàn việc binh.”"},
  {n:"Im lặng, về cung mới tính",wx:"không thêm thù",lx:"lời {v} đọng lại trong lòng người nghe",rt:"Ngươi cúi đầu uống trà."},
  {n:"Gửi lễ sang cha {v} xin nương tay",wx:"phe đánh không dâng sớ cấm",lx:"bạc mất, phe đánh biết nhà ngươi sợ",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Cha {v} nhận lễ, im lặng một mùa.",rf:"Cha {v} trả lễ, kèm một câu mỉa."}]},
 c3:{h:"Cha muốn bán ruộng hương hỏa",w:"dad",t:"Cha viết: sẽ bán ruộng hương hỏa ba đời để chuộc người. Mẹ khóc, họ hàng phản đối: “Bán ruộng thờ, tổ tông ở đâu?”",o:[
  {n:"Khuyên cha bán",wx:"có đủ tiền chuộc",lx:"họ hàng trách nhà ngươi bất hiếu với tổ tông",rt:"Ruộng bán trong một tháng."},
  {n:"Khuyên cha cầm ruộng, không bán",wx:"có bạc mà ruộng còn chuộc lại được",lx:"nhà cầm đồ ép giá",rt:"Ruộng cầm cho một nhà buôn muối, hẹn ba năm chuộc.",rf:"Nhà cầm đồ ép giá, chỉ được một nửa."},
  {n:"Khuyên cha giữ ruộng",wx:"tổ tông yên",lx:"thiếu bạc chuộc",rt:"Cha nghe ngươi, giữ ruộng."}]},
 t1:{h:"Ai mang bạc qua ải",w:"maid",t:"Bạc đã gom gần đủ. Phải có người mang qua ải Hắc Thủy trước khi sông đông. {maid} báo có ba đường.",o:[
  {n:"Gửi theo đoàn buôn muối trà",f:"trade",wx:"giặc cần muối trà, đoàn buôn qua ải không ai nghi",lx:"đoàn buôn đòi thêm tiền mới chịu đi",rt:"Đoàn buôn nhận hòm bạc, giấu dưới bao muối.",rf:"Đoàn buôn nói “trời sắp đông”, đòi thêm tiền."},
  {n:"Nhờ cha xin Lễ bộ cho sứ triều đi cùng",f:"permit",wx:"bạc đi đường quan, có người làm chứng",lx:"chuyện chuộc riêng thành chuyện cả triều biết",rt:"Lễ bộ cho một viên quan nhỏ đi kèm.",rf:"Lễ bộ nói phải chờ chiếu."},
  {n:"Để huynh trưởng tự sai người",wx:"người nhà mang bạc nhà",lx:"người của huynh không quen đường buôn, Sức −",rt:"Huynh chọn mười lính cũ, lên đường ngay."}]},
 x1:{h:"Hoàng thượng biết chuyện",w:"emp",t:"Bạc sắp qua ải thì Hoàng thượng cho gọi ngươi: “Trẫm nghe nhà nàng chuộc người riêng. Nàng có điều gì muốn tâu?”",o:[
  {n:"Quỳ thưa thật, xin ngài cho phép",e:["win","lose"],rt:"Hoàng thượng im lặng, rồi nói: “Người của nước, nước phải đón. Trẫm cho phép.”",rf:"Hoàng thượng nói: “Nàng làm trước rồi mới tâu.” Ngài sai chặn bạc ở ải."},
  {n:"Thưa: đó là lễ vật buôn muối trà",e:["win","mid"],rt:"Hoàng thượng cười nhạt: “Muối trà nặng thật.” Ngài không hỏi thêm, bạc qua ải.",rf:"Ngài không tin, nhưng không chặn. Bạc đi chậm, chỉ đến được một nửa."},
  {n:"Nhờ cha nộp hết bạc vào Hộ bộ, xin triều lo",e:"mid",lx:"bạc nhà vào kho nước, người vẫn chờ",rt:"Hộ bộ nhận bạc, ghi vào sổ “nghĩa quyên”."}]}},
 E:{win:{tag:"Bạc chuộc qua ải kịp",w:"dad",t:()=>`Hòm bạc qua ải Hắc Thủy ba ngày trước khi sông đông. Giặc nhận bạc, hứa thả ${DTQH_HOS()} khi xuân về.`,go:(A,G)=>[e67dad(G[0]),DTQH_OWE(A)].join(" ")},
  mid:{tag:"Bạc vào kho, người còn chờ",t:"Bạc của nhà ngươi không qua ải hết. Một phần nằm ở Hộ bộ, một phần nằm trong tay giặc. Người vẫn chưa về.",go:A=>DTQH_OWE(A)},
  lose:{tag:"Bạc chuộc bị chặn ở ải",w:"v",t:"Quan ải chặn hòm bạc, báo về triều. Phe đánh có cớ nói nhà Đại tướng quân lén nuôi giặc. Sông Hắc Thủy đông lại, người vẫn bên kia.",go:(A,G)=>{rdRel(A,"v",G[0]);return [e67dad(G[1]),DTQH_OWE(A)].join(" ")}}}});

rdDef("dtq_huynh",6,{t:"Sứ giả bên giặc",w:"man",sj:"điều kiện riêng của sứ giặc",cast(A){return rdCast(A,["v"])},
 g:"Sứ giặc vào kinh lần nữa, mang theo một tờ giấy có ấn của huynh trưởng: thư xin hàng, huynh bị ép ký dưới lưỡi đao. Hắn muốn nói chuyện riêng với ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Giặc thả một nửa",w:"man",if:RDW(1),t:"Bạc đã qua ải, giặc thả năm mươi người. Nửa còn lại, sứ giặc nói, “còn tùy một chuyện riêng”. {man}, người được giao tiếp sứ, chuyển lời ấy đến cung ngươi.",o:[
  {n:"Nhờ {man} dò xem chuyện riêng là gì",f:"know",wx:"biết trước giặc muốn gì",lx:"{man} nhận bạc, nói nửa vời",rt:"{man} thì thầm: sứ giặc giữ một tờ hàng thư có ấn của huynh.",rf:"{man} chỉ nói: “Hắn muốn gặp {N}.”"},
  {n:"Báo ngay cho Hoàng thượng",f:"open",wx:"vua biết ngươi không giấu",lx:"vua thêm một mối lo về nhà ngươi",rt:"Hoàng thượng gật: “Nàng làm đúng.”",rf:"Hoàng thượng nói: “Lại chuyện nhà nàng.”"},
  {n:"Đón năm mươi người về trước",wx:"năm mươi gia đình mang ơn nhà ngươi",lx:"chậm một bước với sứ giặc",rt:"Năm mươi lính về kinh, lạy trước cổng phủ."}]},
 s2:{h:"Sứ giặc tự tìm đến",w:"man",if:RDW(0),t:"Bạc kẹt ở ải, nhưng sứ giặc vẫn vào kinh. Qua {man}, hắn gửi đến cung ngươi một hộp trầm hương, dưới đáy có bản chép một tờ hàng thư mang ấn của huynh.",o:[
  {n:"Giữ bản chép, không hồi đáp",f:"know",wx:"cầm được chứng cứ giặc đang dùng",lx:"giữ đồ của giặc trong cung là tội nếu bị lục, Sức −",rt:"Ngươi giấu bản chép trong hộp kinh."},
  {n:"Trả hộp, kèm lời mắng",wx:"giặc biết ngươi không sợ",lx:"giặc có thể tung hàng thư ra ngay",rt:"Sứ giặc nhận hộp trả về, im lặng ba ngày.",rf:"Sứ giặc cười: “Nương nương sẽ hối.”"},
  {n:"Đốt hộp ngay",wx:"không để lại dấu",lx:"mất luôn chứng cứ giặc đang cầm, Sức −",rt:"Trầm hương cháy, cả cung thơm ba ngày."}]},
 c1:{h:"{man} muốn làm người đưa lời",w:"man",t:"{man} nhắn vào: y có thể mang một mảnh giấy của ngươi đến sứ quán và mang lời đáp về. Không ai biết, “trừ khi có người muốn biết”.",o:[
  {n:"Gửi qua {man} một câu hỏi không ký tên",f:"meet",wx:"biết rõ điều kiện của giặc",lx:"giấy tờ qua lại với sứ giặc là tội tư thông nếu lộ",rt:"Lời đáp về trong hộp bánh, nét chữ sứ giặc rõ ràng.",rf:"Có kẻ thấy {man} ra vào sứ quán, ghi lại."},
  {n:"Từ chối, bảo {man} đừng nhắc lại",wx:"tay sạch",lx:"không biết giặc muốn gì, Sức −",rt:"{man} cúi đầu lui."},
  {n:"Trình Hoàng hậu, xin bà làm chứng",need:["hh"],f:"open",wx:"có Trung cung làm chứng ngươi không giấu",lx:"Hoàng hậu thấy ngươi kéo bà vào việc ngoài",rt:"Hoàng hậu ghi lại lời {man}, cất vào hộp của Trung cung.",rf:"Hoàng hậu nói: “Đừng dính vào là hơn.”"}]},
 c2:{h:"{v} thấy quà của giặc",w:"v",need:["v"],t:"{v} cho người canh cửa cung ngươi, thấy người của sứ giặc ra vào. Nàng ta cười: “Nhà Đại tướng quân giờ thân với giặc quá nhỉ.”",o:[
  {n:"Mời {v} xem quà, nói rõ đầu đuôi",wx:"{v} không còn gì để đồn",lx:"{v} thấy thêm điều để nói",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhìn hộp trầm, im lặng, rồi bỏ về.",rf:"{v} chép tên món quà, đi kể khắp nơi."},
  {n:"Cho người canh ngược lại {v}",wx:"biết {v} báo cho ai",lx:"bạc mất, người của ngươi bị bắt, cả cung bàn tán",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Người của {v} báo thẳng cho cha nàng ta, phe đánh.",rf:"Người của ngươi bị bắt ở cổng cung {v}."},
  {n:"Mặc kệ",wx:"không thêm thù",lx:"lời đồn có chỗ bám",rt:"Ngươi khép cửa cung."}]},
 c3:{h:"Lá thư trong tay áo",w:"maid",t:"Một tên hầu của sứ giặc lén nhét vào tay {maid} một lá thư. Nét chữ của huynh trưởng, run rẩy: “Muội, đừng nghe hắn.”",o:[
  {n:"Giữ thư làm bằng",f:"know",wx:"có chứng huynh bị ép",lx:"thư huynh trong cung, ai lục được là chuyện lớn, Sức −",rt:"Ngươi khâu lá thư vào lót áo."},
  {n:"Tìm tên hầu hỏi thêm",wx:"biết huynh bị ép ký thế nào",lx:"tên hầu bị sứ giặc phát hiện",rt:"Tên hầu kể: huynh ký để giặc không chém trăm người.",rf:"Tên hầu biến mất khỏi sứ quán."}]},
 t1:{h:"Điều kiện của sứ giặc",w:"man",t:"Sứ giặc nói qua {man}: “Mỗi tháng một lời về việc binh trong triều. Đổi lại, hàng thư sẽ không ai thấy, người sẽ được về.”",o:[
  {n:"Giả nhận lời để lấy bản gốc",f:"feint",wx:"có thể lấy được hàng thư gốc",lx:"nếu lộ, ngươi là kẻ bán tin cho giặc",rt:"Sứ giặc tin, hứa đưa bản gốc ở lần gặp sau.",rf:"Sứ giặc cười: “Nương nương nghĩ ta ngây thơ sao?”"},
  {n:"Từ chối thẳng",wx:"lòng ngươi sạch",lx:"giặc sẽ dùng hàng thư, Sức −",rt:"Ngươi bảo {man}: “Về nói với hắn: không.”"},
  {n:"Báo ngay Hoàng thượng, dâng bản chép",f:"open",wx:"vua biết trước khi giặc tung ra",lx:"vua đọc hàng thư có ấn của huynh",rt:"Hoàng thượng đọc xong, nói: “Một tờ giấy ký dưới đao chưa phải là hàng.”",rf:"Hoàng thượng đọc xong, im lặng rất lâu."}]},
 x1:{h:"Đêm trước buổi tiếp sứ",w:"emp",t:"Mai Hoàng thượng tiếp sứ giặc. Đêm nay ngài ghé cung ngươi, hỏi: “Nghe nói sứ giặc có gửi quà vào hậu cung?”",o:[
  {n:"Dâng ngài lá thư huynh và lời sứ",e:["win","lose"],rt:"Hôm sau ở điện, ngài nói với sứ giặc: “Dọa phi tần của trẫm? Về nói với chủ ngươi.” Sứ giặc bị đuổi khỏi kinh.",rf:"Ngài giận vì ngươi giấu đến giờ. Hôm sau ở điện, sứ giặc còn nói to: “Nương nương có gửi thư sao?”"},
  {n:"Qua {man} đưa sứ một lời giả",e:["win","mid"],rt:"Sứ giặc mang lời giả về, bản gốc hàng thư theo hắn đến tay ngươi để đổi.",rf:"Sứ giặc nhận lời giả nhưng không đưa bản gốc."},
  {n:"Lảng đi, để sứ về",e:"mid",lx:"hàng thư vẫn trong tay giặc",rt:"Ngươi chỉ nói chuyện quà bánh. Hôm sau sứ giặc lui."}]}},
 E:{win:{tag:"Lật ván của sứ giặc",w:"emp",t:"Sứ giặc rời kinh tay trắng, còn ngươi giữ được thư của huynh và lời sứ làm chứng. Hoàng thượng biết hàng thư trước khi kẻ khác kịp dùng nó."},
  mid:{tag:"Sứ giặc về tay không",t:"Sứ giặc về, không lấy được gì, cũng không trả gì. Tờ hàng thư vẫn nằm đâu đó bên kia ải."},
  lose:{tag:"Bị đồn tư thông sứ giặc",w:"v",t:"Cả kinh thành bàn chuyện phi tần gửi thư cho sứ giặc. {v} cười thầm, cha nàng ta chép chuyện ấy vào sớ.",go:(A,G)=>{rdRel(A,"v",G[0]);return ""}}}});

rdDef("dtq_huynh",7,{t:"Thể diện triều đình",w:"emp",sj:"triều nghị chuyện đổi tù binh",cast(A){return rdCast(A,["v"])},
 g:()=>`Triều đình nghị hòa với giặc. Phe đánh do cha {v} cầm đầu nói: đưa chuyện ${DTQH_HOS()} vào hòa ước là nhục quốc thể. Một lời đến tai vua đúng lúc có thể đổi được người.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Hòa nghị mở ra",w:"emp",if:RDW(1),t:"Sứ giặc đi rồi, giặc lại xin nghị hòa. Hoàng thượng nói với ngươi: “Nàng đã giữ được thể diện cho trẫm. Giờ đến lượt trẫm giữ người cho nàng, nếu triều cho.”",o:[
  {n:"Tạ ơn, xin ngài nhắc tên thân binh",wx:"thân binh có tên trong hòa ước",lx:"ngài thấy ngươi đòi ngay",rt:"Hoàng thượng gật: “Trẫm nhớ.”",rf:"Hoàng thượng cười: “Nàng không chờ được một ngày.”"},
  {n:"Thưa: thần thiếp không dám xin, chỉ xin ngài nhớ",wx:"ngài thấy ngươi biết điều",lx:"không có lời hứa rõ",rt:"Hoàng thượng đặt tay lên vai ngươi."},
  {n:"Khuyên huynh dâng biểu kể chuyện",f:"voice",wx:"triều nghe người trong cuộc",lx:"phe đánh hỏi huynh về hàng thư",rt:"Biểu của huynh kể trận Hắc Thủy, đọc ở triều, nhiều quan rơi lệ.",rf:"Phe đánh hỏi một câu, huynh không đáp được."}]},
 s2:{h:"Sớ của phe đánh",w:"v",if:RDW(0),t:"Cha {v} dâng sớ: “Chuộc tù binh là dạy giặc bắt người. Nhà nào cầu xin riêng là coi nhẹ quốc thể.” Ai cũng biết “nhà nào” là nhà ngươi.",o:[
  {n:"Nhờ cha mời người Hàn lâm viện viết sớ biện",f:"voice",wx:"có lời đáp trong triều",lx:"lộ ra là cung trong bỏ bạc",rt:"Sớ biện dẫn tích người xưa chuộc tướng, lời lẽ vững vàng.",rf:"Người viết sớ khoe khắp Hàn lâm viện."},
  {n:"Xin Thái hậu một lời",need:["th"],wx:"Thái hậu đứng sau ngươi",lx:"Thái hậu thấy ngươi đem việc triều vào Đức Thọ cung",rt:"Thái hậu nói: “Lính trung phải được đón về.”",rf:"Thái hậu nói: “Việc triều, ai gia không bàn.”"},
  {n:"Lặng thinh chờ",wx:"không thêm cớ cho phe đánh",lx:"sớ của phe đánh không ai đáp, Sức −",rt:"Ngươi chép kinh."}]},
 c1:{h:"Thượng thư Lễ bộ do dự",w:"emp",t:"Thượng thư Lễ bộ giữ bút soạn hòa ước. Ông chưa quyết có ghi chuyện đổi tù binh hay không.",o:[
  {n:"Gửi lễ đến phu nhân Thượng thư",f:"voice",wx:"phu nhân nói đỡ bên gối",lx:"lễ bị trả, lại có người biết",rt:"Phu nhân Thượng thư vào cung thỉnh an, hứa “sẽ nhắc ông nhà”.",rf:"Phu nhân trả lễ nguyên phong."},
  {n:"Gửi danh sách trăm thân binh, kèm quê quán",wx:"Thượng thư thấy đó là trăm con người, không phải một con số",lx:"tên thân binh lọt đến phe đánh",rt:"Thượng thư đọc danh sách đến tận đêm."}]},
 c2:{h:"{v} khóc trước vua",w:"v",need:["v"],t:"{v} khóc trước Hoàng thượng: anh nàng ta tử trận ở biên, “sao không ai chuộc xác huynh trưởng của thiếp, chỉ chuộc người nhà Đại tướng quân?”",o:[
  {n:"Xin ngài đưa cả hài cốt anh {v} vào hòa ước",wx:"{v} không còn lời trách",lx:"ngài thấy ngươi bày thêm việc",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} sững người, rồi lần đầu cúi đầu trước ngươi.",rf:"{v} nói: “Không cần lòng tốt giả.”"},
  {n:"Đáp: người sống phải đón trước",wx:"lẽ ấy không ai cãi được",lx:"ngài thấy ngươi lạnh lùng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng gật đầu. {v} lau nước mắt bỏ đi.",rf:"Hoàng thượng an ủi {v}, không nhìn ngươi."},
  {n:"Lặng im",wx:"không giành lời với người đang khóc",lx:"nước mắt {v} có hiệu quả, Sức −",rt:"Ngươi cúi đầu."}]},
 c3:{h:"Cha đòi ra trận",w:"dad",t:"Cha ngươi dâng sớ xin dẫn quân đánh Hắc Thủy cứu người, “không cần hòa ước”. Phe hòa hoảng, phe đánh mừng.",o:[
  {n:"Khuyên cha rút sớ",wx:"hòa nghị không đổ",lx:"cha giận ngươi nhát",rt:"Cha rút sớ, viết cho ngươi: “Lần này cha nghe con.”",rf:"Cha không rút, triều thêm rối."},
  {n:"Để cha giữ sớ, làm sức ép",f:"press",wx:"giặc nghe tin, sợ mà nhượng",lx:"triều thấy nhà ngươi muốn đánh, Sức −",rt:"Tin cha muốn ra trận đến tai giặc."}]},
 t1:{h:"Đêm trước triều nghị",w:"emp",t:"Đêm trước triều nghị, Hoàng thượng ghé cung ngươi, mệt mỏi: “Ghi chuyện tù binh vào hòa ước, trẫm mất thể diện. Không ghi, trẫm mất lòng tướng sĩ.”",o:[
  {n:"Thưa: gọi là “trao trả” thay vì “chuộc”",f:"word",wx:"một chữ giữ được cả thể diện lẫn người",lx:"ngài thấy ngươi khéo quá",rt:"Hoàng thượng bật cười: “Một chữ mà nặng hơn ba vạn lượng.”",rf:"Hoàng thượng lắc đầu: “Giặc không ngu đâu.”"},
  {n:"Thưa: lòng tướng sĩ là thể diện của ngài",wx:"ngài nghe ra lẽ ấy",lx:"ngài thấy ngươi dạy ngài",rt:"Hoàng thượng im lặng, rồi gật đầu.",rf:"Hoàng thượng nói: “Nàng nói như cha nàng.”"},
  {n:"Chỉ pha trà, không bàn",wx:"ngài được một đêm yên",lx:"ngài vào triều mà không có lời nào của ngươi",rt:"Hoàng thượng uống trà, ngủ thiếp đi."}]},
 x1:{h:"Triều nghị",w:"eun",t:"Triều nghị kéo đến trưa. {eun} lén báo: cha {v} đứng ra “xin chém sứ, không nghị hòa”; Hoàng thượng cho nghỉ, vào Ngự thư phòng một mình.",o:[
  {n:"Nhờ {eun} dâng ngài danh sách trăm thân binh",e:["win","lose"],rt:"Chiều ấy, Hoàng thượng đọc to mười cái tên trước triều. Triều lặng. Ngài phán: “Ghi vào hòa ước.”",rf:"Cha {v} biết tờ danh sách đến từ hậu cung, hô: “Hậu cung can chính!” Hoàng thượng phải gác lại."},
  {n:"Xin Thái hậu mời ngài sang dùng trà",need:["th"],e:["win","mid"],rt:"Thái hậu nói một câu bên chén trà. Chiều ấy, Hoàng thượng phán ghi “trao trả tù binh” vào hòa ước.",rf:"Thái hậu không muốn nói. Triều nghị kéo dài, không quyết."},
  {n:"Chờ trong cung",e:"mid",lx:"triều quyết mà không có lời nhà ngươi",rt:"Ngươi chép kinh đến chiều."}]}},
 E:{win:{tag:"Triều nghị cho trao trả người",w:"emp",t:()=>`Hòa ước ghi rõ: giặc trao trả ${DTQH_HOS()}. Phe đánh im tiếng. Tướng sĩ biên ải nghe tin, ai cũng nhắc tên nhà ngươi.`,go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Triều đình gác chuyện tù binh",t:"Hòa nghị đi tiếp nhưng không nhắc đến người. Nhà ngươi phải tự tìm đường khác."},
  lose:{tag:"Triều đình cấm chuộc riêng",w:"v",t:"Chiếu ban: không nhà nào được chuộc người riêng với giặc. Phe đánh thắng. Cha {v} được thưởng, cha ngươi bị nhắc nhở.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_huynh",8,{t:"Đường cứu lén",w:"maid",sj:"đường cứu người qua ải trong đêm",cast(A){return rdCast(A,["v"])},
 g:()=>`Còn lại một đường: lén cứu ${DTQH_HOS()} qua ải trong đêm. Có một thị vệ nợ huynh trưởng một mạng, và {man}, người biết lối mòn qua Hắc Thủy.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Giặc giữ lại người",w:"maid",if:RDW(1),t:"Hòa ước đã ký, nhưng giặc trả người nhỏ giọt, giữ lại hai mươi người khỏe nhất làm “con tin bảo đảm”. Một thị vệ từng được huynh cứu khỏi tên giặc xin gặp ngươi.",o:[
  {n:"Gặp thị vệ, nghe kế",f:"guard",wx:"có người dám đi",lx:"thị vệ ra vào cung ngươi, có người để ý",rt:"Thị vệ quỳ: “Mạng này của tướng quân. Nô tài xin đi.”",rf:"Thị vệ đến, nhưng cấm quân ghi tên hắn."},
  {n:"Nhờ cha đòi giặc theo hòa ước, qua Lễ bộ",wx:"đúng phép",lx:"giặc dây dưa, mùa đông đến, Sức −",rt:"Lễ bộ gửi văn thư. Giặc hồi âm: “Đang chuẩn bị.”"},
  {n:"Gửi bạc mua lính gác giặc",f:"bribe",wx:"lính gác bên kia mở mắt nhắm mắt",lx:"bạc qua tay giặc, khó đòi",rt:"Lính gác nhận bạc, hẹn đêm không trăng."}]},
 s2:{h:"Chỉ còn đường lén",w:"maid",if:RDW(0),t:"Triều đình không giúp. Một thị vệ từng được huynh cứu khỏi tên giặc lén nhắn: hắn biết một lối mòn băng qua Hắc Thủy, cần người dẫn đường và bạc.",o:[
  {n:"Nhận lời thị vệ",f:"guard",wx:"có người dám đi",lx:"việc lén qua ải là tội nặng nếu lộ",rt:"Thị vệ xin nghỉ phép về quê, lên đường.",rf:"Thị vệ bị cấm quân giữ hỏi vì sao xin phép gấp."},
  {n:"Gửi bạc mua lính gác giặc",f:"bribe",wx:"đường cứu có người mở cửa",lx:"bạc có thể mất trắng",rt:"Lính gác bên kia nhận bạc."},
  {n:"Viết thư hỏi cha có nên",wx:"cha biết, cha lo cùng",lx:"thư có thể lọt, Sức −",rt:"Cha hồi thư: “Đi. Cha cho mười lính già theo.”"}]},
 c1:{h:"{man} đòi giá",w:"man",t:"{man} biết lối mòn, nhưng đòi một giá: một lời nói giúp để y được thăng chức ở Hồng lô tự.",o:[
  {n:"Hứa nói giúp",f:"guide",wx:"có người dẫn đường",lx:"ngươi phải nói giúp {man} với Hoàng thượng, ngài phật ý",rt:"{man} vẽ lối mòn lên giấy dầu. Hôm sau ngươi nói giúp y một câu; Hoàng thượng nhíu mày."},
  {n:"Trả bằng bạc",f:"guide",wx:"sòng phẳng, không nợ lời",lx:"tốn bạc",rt:"{man} nhận bạc, vẽ lối mòn."},
  {n:"Tự tìm người dẫn đường khác",f:"guide",wx:"không mắc nợ {man}",lx:"người dẫn đường lạ, khó tin",rt:"Một lính già của cha thuộc lối ấy.",rf:"Không tìm ra ai."}]},
 c2:{h:"{v} nghe hơi",w:"v",need:["v"],t:"{v} hỏi ngươi giữa vườn: “Nghe nói thị vệ cung tỷ tỷ xin nghỉ phép về quê. Quê hắn ở Hắc Thủy à?”",o:[
  {n:"Cười: quê hắn ở Giang Nam",wx:"{v} không bám được",lx:"{v} cho người xem sổ quê",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} bĩu môi, đi chỗ khác.",rf:"{v} cười: “Để muội hỏi Binh bộ.”"},
  {n:"Nói thật, xin {v} giữ kín",wx:"{v} có thể thành người cùng giữ bí mật",lx:"{v} đi báo cha nàng ta",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} im lặng thật lâu: “Huynh trưởng của muội cũng chết ở đó. Muội không nói.”",rf:"{v} gật đầu, rồi đi thẳng đến Binh bộ."},
  {n:"Tránh mặt {v}",wx:"không để lại lời",lx:"{v} càng nghi",rt:"Ngươi rẽ sang lối khác."}]},
 c3:{h:"Sông sắp đông",w:"maid",t:"Tin biên: sông Hắc Thủy đã đóng băng mép. Băng mỏng thì người qua được, ngựa thì không.",o:[
  {n:"Gửi áo da và dây thừng",wx:"người cứu có đồ qua băng",lx:"tốn bạc, hàng đi chậm",rt:"Ba mươi áo da đến kịp."},
  {n:"Bảo họ đi ngay, không chờ",wx:"đi trước khi băng dày, giặc chưa canh",lx:"đi vội, thiếu đồ, có người chết rét, Sức −",rt:"Thị vệ lên đường trong đêm.",rf:"Hai người ngã xuống băng."}]},
 t1:{h:"Đêm không trăng",w:"maid",t:"Đêm không trăng. Tin bồ câu: đã đến trại giặc, cửa ngục mở, nhưng có một tên gác không nhận bạc.",o:[
  {n:"Nhắn thị vệ: trói hắn, không giết",f:"clean",wx:"đường cứu không đổ máu, hòa ước không vỡ",lx:"trói vụng, hắn kêu được, Sức −",rt:"Tên gác bị trói, nhét giẻ vào miệng.",rf:"Tên gác kêu được một tiếng trước khi bị trói."},
  {n:"Nhắn thị vệ: làm gì cũng được",wx:"đường cứu thông",lx:"máu giặc trên tay người của ngươi, hòa ước lung lay",rt:"Tên gác không kêu được nữa."},
  {n:"Nhắn thị vệ: rút về",wx:"không ai chết",lx:"bao công sức đổ sông",rt:"Thị vệ rút về bên này sông."}]},
 x1:{h:"Qua băng",w:"maid",t:"Người đã ra khỏi ngục, đang qua băng sông Hắc Thủy. Đuốc giặc đã thắp ở bờ bên kia.",o:[
  {n:"Nhắn thị vệ: qua hết, không bỏ ai",e:["win","lose"],rt:"Người cuối cùng lên bờ đúng lúc băng nứt sau lưng. Đuốc giặc dừng ở bờ kia.",rf:"Băng nứt giữa sông. Giặc đuổi kịp, bắt lại hơn nửa."},
  {n:"Cho người khỏe qua trước",e:["win","mid"],rt:"Người khỏe dìu người yếu, ai cũng qua được.",rf:"Người khỏe qua được, người yếu bị bỏ lại."},
  {n:"Báo quan ải ra đón, lộ việc",e:"mid",lx:"việc cứu lén thành chuyện cả triều biết",rt:"Quan ải mở cổng, đón người, rồi viết báo về triều."}]}},
 E:{win:{tag:"Cứu được người về",w:"maid",t:()=>`${DTQH_HOS()[0].toUpperCase()+DTQH_HOS().slice(1)} về đến bờ bên này trong đêm. Không ai biết đường cứu đi qua cung ngươi, trừ những người đã được cứu.`,go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Về được một nửa",t:"Một nửa số người về được. Nửa kia vẫn bên kia sông, hoặc nằm lại dưới băng. Giặc biết có người đã vào."},
  lose:{tag:"Đường cứu bị lộ",w:"v",t:"Giặc bắt lại người, còn gửi thư sang triều: “Đây là cách nhà Đại tướng quân giữ hòa ước?” Thị vệ bị tống giam.",go:(A,G)=>{rdRel(A,"v",G[0]);return e67dad(G[1])}}}});

rdDef("dtq_huynh",9,{t:"Anh trở về, bị nghi",w:"emp",sj:"tờ hàng thư mang ấn huynh trưởng",cast(A){return rdCast(A,["v"])},
 g:"Tờ hàng thư mang ấn huynh trưởng đã đến triều. Huynh ký nó dưới lưỡi đao để giặc không chém trăm người, nhưng giấy không biết nói điều ấy.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tiệc mừng và tờ giấy",w:"v",if:RDW(1),t:()=>`${DTQH_IN()?"Huynh trưởng đã về":"Thân binh đã về"}. Nhà còn chưa tan tiệc mừng thì trong cung, {v} dâng lên Hoàng thượng một tờ hàng thư có ấn của huynh, nói là “cha thiếp mua được từ biên”. Ngài cho gọi ngươi đến Ngự thư phòng.`,o:[
  {n:"Xin ngài cho Hàn lâm viện so dấu ấn",f:"seal",wx:"dấu ấn mờ, ai cũng thấy nó ký vội",lx:"dấu ấn rõ, tội như đóng đinh",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Ấn đóng lệch, mực nhòe như bị ấn tay người khác đè.",rf:"Ấn rõ từng nét. Ngài lặng đi."},
  {n:"Thưa: thần thiếp đã biết tờ giấy này từ trước",f:"known",wx:"vua thấy ngươi không giấu",lx:"ngài hỏi sao biết mà không tâu",rt:"Hoàng thượng gật: “Phải, nàng đã tâu.”",rf:"Hoàng thượng hỏi: “Biết từ khi nào?”"},
  {n:"Nhắn huynh đóng cửa phủ chờ",wx:"huynh không phải đối mặt trước đám đông",lx:"đóng cửa là như nhận, Sức −",rt:"Huynh đóng cửa phủ, lưng vẫn thẳng."}]},
 s2:{h:"Câu hỏi của Binh bộ",w:"emp",if:RDW(0),t:()=>`${DTQH_IN()?"Giặc tự thả huynh trưởng về, không đòi gì":"Người về không đủ, giặc lại tung tin"}. Binh bộ hỏi: giặc được gì? Câu trả lời đến cùng một tờ hàng thư mang ấn của huynh.`,o:[
  {n:"Nhờ cha xin Binh bộ cho huynh tự trình",f:"voice",wx:"huynh được nói trước khi bị kết",lx:"huynh nói vụng, thành nhận",rt:"Huynh trình bày, giọng không run.",rf:"Huynh chỉ nói được: “Thần có ký.”"},
  {n:"Lặng lẽ tìm thân binh làm chứng",f:"witness",wx:"có người thấy huynh ký dưới đao",lx:"thân binh sợ, không dám ra mặt",rt:"Ba thân binh xin làm chứng.",rf:"Thân binh nói họ không nhớ."},
  {n:"Đóng cửa cung, chờ",wx:"không bị kéo vào",lx:"huynh một mình trước Binh bộ, Sức −",rt:"Ngươi khép cửa cung."}]},
 c1:{h:"Huynh thú thật",w:"dad",t:"Huynh lén vào thỉnh an, thú thật: “Ta có ký. Chúa giặc kề đao vào cổ thân binh thứ nhất, ta ký trước khi đao hạ.”",o:[
  {n:"Khuyên huynh tự tâu trước",f:"truth",wx:"huynh nhận trước, vua thấy thật lòng",lx:"tự nhận là cho phe đánh cớ",rt:"Huynh gật: “Ta sẽ tự tâu.”",rf:"Huynh tâu, phe đánh hô ngay: “Đã nhận rồi!”"},
  {n:"Khuyên huynh chối là giấy giả",f:"lie",wx:"tờ giấy có thể bị gạt đi",lx:"lời chối bị lật thì mất cả",rt:"Huynh nghe ngươi, nhưng mắt không dám nhìn.",rf:"Huynh lắc đầu: “Ta không nói dối vua.”"},
  {n:"Ôm huynh, không khuyên gì",wx:"huynh biết muội không bỏ",lx:"huynh vào triều không có kế",rt:"Huynh khóc như hồi nhỏ."}]},
 c2:{h:"{v} rải tin",w:"v",need:["v"],t:"{v} rải tin: huynh ngươi về là để làm nội ứng, đêm nào cũng gửi thư sang Hắc Thủy.",o:[
  {n:"Xin Hoàng thượng cho lục phủ huynh",wx:"lục không ra gì, lời {v} đổ",lx:"lục ra một lá thư cũ của giặc",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Lục ba ngày, chỉ thấy sách binh và áo rách.",rf:"Lục ra lá thư sứ giặc gửi năm trước."},
  {n:"Tìm kẻ đưa tin cho {v}",wx:"biết đường tin của phe đánh",lx:"bạc mất, không ai nói",rt:"Người đưa tin là một quan ải ăn lương cha {v}.",rf:"Người đưa tin đã đi xa."},
  {n:"Mặc kệ",wx:"không thêm sóng",lx:"tin đồn bám vào tên huynh",rt:"Ngươi im."}]},
 c3:{h:"Cha muốn tự lên triều",w:"dad",t:"Cha ngươi chống gậy định lên triều: “Con ta không hàng. Ai nói hàng, bước ra đây.”",o:[
  {n:"Khuyên cha ở nhà",wx:"không để cha thành cái đích",lx:"cha thấy con coi ông là già",rt:"Cha ngồi xuống, đập gậy xuống nền.",rf:"Cha vẫn lên triều, cãi nhau với cha {v}."},
  {n:"Để cha lên",wx:"uy cha làm nhiều kẻ im",lx:"vua thấy nhà ngươi dùng uy ép triều",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha đứng giữa triều, không ai dám bước ra."}]},
 t1:{h:"Ngài hỏi ngươi",w:"emp",t:"Đêm ấy Hoàng thượng hỏi thẳng: “Nàng nói trẫm nghe: huynh nàng có hàng không?”",o:[
  {n:"Thưa thật: huynh có ký, để cứu trăm người",f:"truth",wx:"vua nghe sự thật từ ngươi trước",lx:"ngài nghe chữ “ký”",rt:"Hoàng thượng im lặng thật lâu: “Trẫm cũng có lính. Trẫm hiểu.”",rf:"Hoàng thượng đứng dậy: “Ký là ký.”"},
  {n:"Thưa: thần thiếp tin huynh không hàng",wx:"lời gọn, không sai",lx:"ngài biết ngươi tránh câu hỏi, Sức −",rt:"Hoàng thượng gật đầu, không hỏi nữa."},
  {n:"Thưa: xin ngài để Đại Lý tự xét",wx:"ngươi không xen vào việc xử",lx:"ngài thấy ngươi bỏ huynh",rt:"Hoàng thượng nói: “Được.”"}]},
 x1:{h:"Tờ hàng thư trên ngự án",w:"emp",t:"Mai triều đình bàn tờ hàng thư; cha {v} sẽ xin tống giam huynh trưởng. Đêm nay, trong Ngự thư phòng, Hoàng thượng để ngươi nói một lời. Quyết là của ngài.",o:[
  {n:"Xin ngài cho thân binh vào triều kể lại đêm ấy",e:["win","lose"],rt:"Hôm sau, một thân binh cụt tay quỳ kể giữa triều. Đến câu “tướng quân ký để chúng thần sống”, cả triều cúi mặt.",rf:"Thân binh run, nói lộn xộn. Cha {v} cười: “Lính nhà ấy, nói gì chẳng được.”"},
  {n:"Xin ngài so ấn với các ấn khác của huynh",e:["win","mid"],rt:"Ấn lệch, mực nhòe, khác hẳn mọi ấn thật của huynh. Hoàng thượng phán: ấn đóng dưới đao, không phải lòng hàng. Tờ hàng thư bị gác lại.",rf:"Ấn chỉ hơi lệch. Hoàng thượng cho giữ huynh ở phủ chờ xét, không tống ngục."},
  {n:"Không nói lời nào",e:"mid",lx:"ngài vào triều không có lời nhà ngươi",rt:"Ngươi chỉ rót trà, không nói gì."}]}},
 E:{win:{tag:"Hàng thư bị gác lại",w:"emp",t:"Hoàng thượng phán: “Ký dưới đao để cứu lính không phải hàng.” Tờ hàng thư bị gác lại, chờ Đại Lý tự khép án cho đúng phép.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Huynh bị giữ chờ xét",t:"Huynh bị giữ ở phủ, không được ra ngoài, chờ Đại Lý tự xét hỏi."},
  lose:{tag:"Huynh bị tống ngục",w:"v",t:"Huynh bị giải vào ngục Đại Lý tự. Phe đánh mừng. Mẹ ngươi ngã bệnh.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_huynh",10,{t:"Xét hỏi",w:"emp",sj:"phiên xét hỏi ở Đại Lý tự",cast(A){return rdCast(A,["v"])},
 g:"Đại Lý tự mở phiên xét hỏi huynh trưởng. Lời khai của huynh, của thân binh, và một lời của ngươi đặt đúng chỗ sẽ quyết huynh là trung thần hay hàng tướng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Huynh được ra ngoài chờ xét",w:"dad",if:RDW(1),t:"Huynh không bị giam, chỉ phải trình diện Đại Lý tự mỗi tháng. Quan xét án là người nổi tiếng thẳng, không nhận lễ ai.",o:[
  {n:"Gửi quan xét án bộ sách luật của cha",wx:"ông biết nhà ngươi tôn phép",lx:"ông coi đó là quà, trả lại kèm lời trách",rt:"Quan xét án nhận sách, nói: “Sách thì ta đọc.”",rf:"Quan xét án trả sách: “Không nhận quà của nhà bị xét.”"},
  {n:"Khuyên huynh soạn lời khai từng chữ",f:"prep",wx:"lời khai chặt chẽ",lx:"lời học thuộc nghe như bịa",rt:"Huynh viết lại đêm Hắc Thủy, ba lần."},
  {n:"Để mọi việc tự nhiên",wx:"không ai nói nhà ngươi can thiệp",lx:"không chuẩn bị gì, Sức −",rt:"Ngươi chỉ gửi cho huynh một bình trà."}]},
 s2:{h:"Huynh trong ngục",w:"maid",if:RDW(0),t:"Huynh bị giữ, không ai được thăm. {maid} nghe nói ngục tốt Đại Lý tự cho ăn cơm thiu, đêm lạnh không chăn.",o:[
  {n:"Gửi chăn áo qua ngục tốt",wx:"huynh đủ ấm, đủ sức khai",lx:"ngục tốt ghi tên người gửi",rt:"Chăn áo đến tay huynh."},
  {n:"Xin Hoàng thượng cho thăm một lần",f:"prep",wx:"gặp huynh, bàn lời khai",lx:"ngài thấy ngươi can vào án",rt:"Hoàng thượng cho ngươi một khắc.",rf:"Hoàng thượng nói: “Án đang xét.”"},
  {n:"Không làm gì, giữ mình",wx:"không ai nói ngươi lo lót",lx:"huynh nghĩ muội bỏ mình, Sức −",rt:"Ngươi không gửi gì."}]},
 c1:{h:"Phe đánh mua nhân chứng",w:"v",need:["v"],t:"Người của cha {v} dắt đến Đại Lý tự một tên lính trốn, khai đã thấy huynh uống rượu với chúa giặc.",o:[
  {n:"Tìm hỏi ai nuôi tên lính trốn",f:"buy",wx:"biết hắn ăn tiền ai",lx:"bạc mất, dấu vết bị xóa",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Tên lính trốn ở nhờ trang trại của cha {v}.",rf:"Tên lính trốn đổi chỗ ở mỗi đêm."},
  {n:"Đến cung {v} nói thẳng",wx:"{v} có thể rút tay",lx:"{v} cười vào mặt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} cúi đầu: “Việc của cha muội, muội không ngăn được, nhưng sẽ thử.”",rf:"{v} nói: “Muốn yên thì bảo huynh của tỷ tỷ nhận.”"},
  {n:"Để Đại Lý tự tự xét",wx:"tay ngươi sạch",lx:"nhân chứng giả không ai bóc, Sức −",rt:"Ngươi không động."}]},
 c2:{h:"Thân binh bị dọa",w:"maid",t:"Ba thân binh định làm chứng cho huynh bị kẻ lạ dọa: “Khai bừa thì nhà các ngươi biết tay.”",o:[
  {n:"Đưa nhà họ vào trang trại của cha",f:"witness",wx:"nhân chứng yên lòng khai",lx:"một nhà không chịu đi, người ta nói nhà ngươi giữ nhân chứng",rt:"Ba nhà dọn về trang trại của cha, có lính già canh.",rf:"Một nhà sợ quá, không chịu đi."},
  {n:"Nhờ cha báo Đại Lý tự có kẻ dọa",wx:"quan xét án biết có người nhúng tay",lx:"không chứng thì thành vu",rt:"Quan xét án cho người canh ba nhà.",rf:"Quan xét án hỏi: “Ai dọa? Có chứng không?”"},
  {n:"Khuyên thân binh đừng khai",wx:"thân binh không gặp nguy",lx:"huynh mất người làm chứng, Sức −",rt:"Thân binh rút lời."}]},
 c3:{h:"Thư từ Hắc Thủy",w:"emp",t:"Một lá thư lạ từ Hắc Thủy gửi thẳng Đại Lý tự: chúa giặc “cảm ơn tướng quân đã giữ lời”. Ai cũng biết đó là đòn của giặc, nhưng giấy là giấy.",o:[
  {n:"Xin so chữ thư với thư cũ của giặc",wx:"lộ ra thư do người trong ải viết",lx:"so không ra, thư thành chứng",rt:"Nét chữ là của một quan ải bên ta, không phải chữ của giặc.",rf:"Thư viết bằng chữ giặc, không ai đọc được."},
  {n:"Thưa: giặc muốn ta tự giết tướng mình",wx:"triều nghe ra mưu giặc",lx:"ngài thấy ngươi bàn việc binh",rt:"Hoàng thượng nói: “Nàng nói như một mưu sĩ.”",rf:"Không ai nghe lời phi tần trong án."}]},
 t1:{h:"Quan xét án gọi ngươi",w:"emp",t:()=>`Quan xét án dâng sớ xin Hoàng thượng cho hỏi ngươi một câu bằng giấy, qua tay ${qOn()?"Hoàng hậu":"Tổng quản thái giám"}: “Nương nương có biết tờ hàng thư trước khi nó đến triều không?”`,o:[
  {n:"Thưa thật, kể cả lời sứ giặc",f:"honest",wx:"lời ngươi khớp với mọi chứng",lx:"ngươi tự nhận đã biết mà không tâu ngay",rt:"Quan xét án gật: “Lời nương nương khớp với lời sứ quán.”",rf:"Quan xét án ghi: “Phi tần biết trước, không tâu.”"},
  {n:"Thưa: không biết",wx:"ngươi đứng ngoài án",lx:"nếu lộ, ngươi khai gian trước Đại Lý tự",rt:"Quan xét án ghi lại, không hỏi thêm."},
  {n:"Xin đứng ngoài án, vì là người nhà",wx:"đúng lễ tránh hiềm",lx:"án thiếu một lời có thể cứu huynh",rt:"Quan xét án ghi: “Người nhà xin đứng ngoài án, phải lẽ.”"}]},
 x1:{h:"Phán án",w:"emp",t:"Mai Đại Lý tự mở phiên cuối, rồi dâng án để Hoàng thượng phê. Đêm nay ngươi chỉ còn một lời: nhắn huynh qua thư nhà, hay nói với ngài bên gối.",o:[
  {n:"Nhắn huynh đọc tên trăm thân binh trước án",e:["win","lose"],rt:"Huynh đọc từng tên, đến tên người chết thì dừng. Quan xét án gấp hồ sơ: “Không phải hàng.” Hoàng thượng phê y án.",rf:"Huynh đọc được nửa thì nghẹn. Phe đánh nói: “Nước mắt không phải chứng.”"},
  {n:"Xin ngài, nếu phê, phê “bị ép, không tội, không công”",e:["win","mid"],rt:"Hoàng thượng phê như lời ngươi, còn thêm một dòng son: “Ký để cứu lính, không phải hàng.” Tờ hàng thư bị đốt trước án.",rf:"Hoàng thượng phê như lời ngươi. Huynh sạch tội, nhưng không ai nhắc công."},
  {n:"Không xin gì",e:"mid",lx:"án tự đi, không có lời nhà ngươi",rt:"Ngươi nhắm mắt chờ đến sáng."}]}},
 E:{win:{tag:"Lời khai đứng vững",w:"emp",t:"Đại Lý tự xét, Hoàng thượng phê: huynh trưởng không hàng giặc. Tờ hàng thư bị đốt trước án. Phe đánh im lặng ra về.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Án treo",t:"Án khép lửng: không tội, không công. Huynh được về nhà, nhưng tên huynh nằm trong một cuốn sổ ai cũng biết."},
  lose:{tag:"Huynh bị kết tội thất tiết",w:"v",t:"Đại Lý tự kết huynh tội “thất tiết trước giặc”. Hoàng thượng nể công cha, tha tội chết, miễn liên đới cho nhà ngươi: huynh bị cách chức, giáng làm thứ dân. Không chém, nhưng nhục hơn chém.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("dtq_huynh",11,{t:"Huynh muội",w:"dad",sj:"đường đi của huynh trưởng sau án",cast(A){return rdCast(A,["v"])},
 g:"Án đã khép, nhưng đời huynh trưởng còn dài. Được dùng lại hay bị bỏ quên, đứng thẳng hay cúi đầu — đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Huynh vào cung tạ ơn",w:"dad",if:RDW(1),t:"Huynh trưởng vào cung tạ ơn vua, rồi ghé cung ngươi. Huynh gầy đi, nhưng mắt sáng lại: “Muội, ta muốn trở về biên.”",o:[
  {n:"Ủng hộ huynh, hứa nói giúp",f:"back",wx:"huynh có người đứng sau",lx:"vua thấy nhà ngươi vội",rt:"Huynh cười, lần đầu sau hai năm.",rf:"Huynh cười, nhưng ngươi biết đường không dễ."},
  {n:"Khuyên huynh ở kinh dưỡng sức",wx:"huynh được nghỉ, nhà yên",lx:"huynh thấy muội không tin mình, Sức −",rt:"Huynh im lặng gật đầu."},
  {n:"Hỏi huynh: ở trại giặc đã thấy gì",f:"plan",wx:"biết huynh nhớ gì về trận địa giặc",lx:"huynh không muốn nhắc lại",rt:"Huynh cầm bút, vẽ trại giặc lên giấy, từng lều.",rf:"Huynh nói: “Đừng hỏi ta về chỗ ấy.”"}]},
 s2:{h:"Huynh không ra khỏi phòng",w:"dad",if:RDW(0),t:"Từ sau án, huynh không ra khỏi phòng. Mẹ viết: “Nó ngồi cả ngày nhìn thanh kiếm cũ. Con nói với nó một lời.”",o:[
  {n:"Xin phép về phủ thăm huynh",f:"back",wx:"huynh gặp được muội",lx:"vua không vui vì ngươi về nhà người bị xét",rt:"Ngươi về phủ, ngồi với huynh đến tối.",rf:"Hoàng thượng không cho."},
  {n:"Viết thư nhắc huynh về trăm thân binh",wx:"huynh nhớ ra còn người cần mình",lx:"thư không thay được người, Sức −",rt:"Huynh hồi thư một chữ: “Nhớ.”"},
  {n:"Gửi bạc, không viết gì",wx:"nhà có bạc lo thuốc thang",lx:"huynh thấy muội xa",rt:"Bạc đến, huynh không nhận."}]},
 c1:{h:"Biên ải lại có biến",w:"emp",t:"Giặc Hắc Thủy lại quấy biên. Triều cần một tướng hiểu trại giặc. Phe đánh nói: “Không thể dùng kẻ từng ký hàng thư.”",o:[
  {n:"Gợi ý ngài: người hiểu giặc nhất vừa ở trại giặc về",f:"plan",wx:"tên huynh đến tai vua đúng lúc",lx:"ngài thấy ngươi lại xin cho nhà mình",rt:"Hoàng thượng dừng bút: “Nàng nói phải.”",rf:"Hoàng thượng nói: “Nàng lại nói cho nhà nàng.”"},
  {n:"Im lặng, để triều tự nhớ",wx:"không ai nói nhà ngươi chen",lx:"triều quên huynh",rt:"Ngươi chép kinh cầu an cho biên ải."}]},
 c2:{h:"{v} giơ tay",w:"v",need:["v"],t:"{v} đến cung ngươi, mang theo hộp trà: “Cha muội mệt rồi. Huynh trưởng của muội nằm lại Hắc Thủy. Muội không muốn thêm một người nằm lại nữa.”",o:[
  {n:"Nhận trà, làm hòa",wx:"phe đánh thôi chặn đường huynh",lx:"có người bảo ngươi bắt tay kẻ đã hại nhà mình",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} ngồi lại, hai người uống hết ấm trà.",rf:"{v} ngồi được một lúc rồi đứng dậy, vẫn còn khoảng cách."},
  {n:"Đòi {v} xin lỗi huynh trước",wx:"tiếng nhà ngươi được rửa",lx:"{v} bỏ về, oán ++",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} cắn môi, rồi gật đầu.",rf:"{v} đặt hộp trà xuống, đi thẳng."},
  {n:"Từ chối gặp",wx:"không mắc nợ ai",lx:"đường hòa bị đóng, Sức −",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{maid} ra cửa trả hộp trà."}]},
 c3:{h:"Thân binh xin theo huynh",w:"maid",t:"Trăm thân binh, kẻ còn người mất, gửi vào cung ngươi một lá thư chung: “Tướng quân đi đâu, chúng thần theo đó.”",o:[
  {n:"Dâng thư lên Hoàng thượng",wx:"vua thấy lòng lính với huynh",lx:"vua nghe ra “quân riêng”",rt:"Hoàng thượng đọc, gật: “Tướng như thế mới đáng dùng.”",rf:"Hoàng thượng nói: “Lính theo tướng, không theo vua?”"},
  {n:"Giữ thư, chỉ đưa huynh",wx:"huynh vững lòng",lx:"vua không biết lòng lính",rt:"Huynh đọc thư, lặng người."}]},
 t1:{h:"Ngài hỏi về huynh",w:"emp",t:"Một đêm, Hoàng thượng hỏi: “Nếu trẫm cho huynh nàng cầm quân lại, nàng có dám bảo đảm không?”",o:[
  {n:"Thưa: thần thiếp lấy cả cung mình bảo đảm",f:"vouch",wx:"vua tin vì ngươi dám đặt cược",lx:"nếu huynh sai, ngươi cùng chịu",rt:"Hoàng thượng nhìn ngươi lâu, rồi gật đầu.",rf:"Hoàng thượng nói: “Đừng hứa điều nàng không giữ được.”"},
  {n:"Thưa: huynh sẽ tự chứng tỏ",wx:"lời khiêm, không ràng buộc",lx:"không có gì thêm để vua quyết, Sức −",rt:"Hoàng thượng gật nhẹ."},
  {n:"Thưa: xin ngài cho huynh nghỉ",wx:"nhà ngươi không còn ai trong vòng nghi",lx:"huynh mất đường binh nghiệp",rt:"Hoàng thượng thở ra: “Cũng được.”"}]},
 x1:{h:"Huynh muội trước ngự tiền",w:"emp",t:"Mai Hoàng thượng triệu huynh vào Ngự thư phòng; trên ngự án có một tờ chiếu chưa ghi tên. Đêm nay ngài ghé cung ngươi. Chọn người là việc của ngài; ngươi chỉ có một lời.",o:[
  {n:"Xin ngài cho huynh trình kế phá trại giặc",e:["win","lose"],rt:"Huynh trải giấy, vẽ trại giặc từng lều. Hoàng thượng cầm bút ghi tên huynh lên chiếu.",rf:"Huynh vẽ đến giữa thì một đại thần hỏi: “Ngươi nhớ rõ thế, ở đó bao lâu?” Ngự án lặng đi."},
  {n:"Xin ngài cho huynh một chức văn ở kinh",e:["win","mid"],rt:"Huynh nhận chức Thị lang Binh bộ, ngày ngày bàn việc biên với các tướng. Một năm sau, chính tay huynh soạn kế giữ Hắc Thủy, và triều gọi huynh là tướng lại.",rf:"Huynh nhận chức ở Binh bộ, không cầm quân. Một đời yên."},
  {n:"Để ngài tự quyết",e:"mid",lx:"huynh nhận gì cũng không có lời của muội",rt:"Ngươi cúi đầu, không nói."}]}},
 E:{win:{tag:"Huynh được minh oan, thăng chức",w:"emp",t:"Huynh trưởng được phong tướng, lại ra biên với trăm thân binh. Ngày đi, huynh dừng ngựa trước cổng cung, nhìn lên lầu nơi ngươi đứng. Truyện xuất thân của ngươi khép lại bằng tiếng vó ngựa ấy.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" ")},
  mid:{tag:"Huynh sạch tội, không cầm quân",t:"Huynh sạch tội, làm một chức văn ở kinh. Thanh kiếm cũ treo trên tường. Nhà ngươi yên, nhưng tiếng trống biên không còn gọi tên nhà ngươi."},
  lose:{tag:"Huynh mang nhục suốt đời",w:"dad",t:"Huynh về quê làm ruộng, không ai nhắc tên. Nhà ngươi mất thế. Ngươi vẫn ở trong cung, đường lên vẫn còn, nhưng mỗi lần nghe tin biên, ngươi lại nhớ đến người anh ấy.",go:(_A,G)=>e67dad(G[0])}}});
RD97L.push(rdRare({a:"dtq_huynh_11",tag:"Huynh mang về thế trận của giặc",w:"emp",n:"Xin ngài xem tấm bản đồ huynh vẽ từ trí nhớ",
 path:["Tìm tên hầu hỏi thêm","Giả nhận lời để lấy bản gốc","Gửi danh sách trăm thân binh","Hỏi huynh: ở trại giặc đã thấy gì","Gợi ý ngài: người hiểu giặc nhất","Xin ngài cho thân binh vào triều kể","Thưa thật: huynh có ký","Thưa thật, kể cả lời sứ giặc","Nhắn huynh đọc tên trăm thân binh","Xin ngài cho huynh trình kế"],bad:["Khuyên huynh chối là giấy giả","Thưa: không biết","Khuyên thân binh đừng khai"],x:[()=>S.tamco>=RR("dtq_huynh_11").bar,"Tâm cơ từ "+RR("dtq_huynh_11").bar],
 t:"Trong hai năm ở trại giặc, huynh đã thuộc từng lều, từng giờ đổi gác. Tấm bản đồ huynh vẽ từ trí nhớ đưa kỵ binh vào thẳng đại trại Hắc Thủy trong một đêm. Tờ hàng thư năm xưa giờ thành chuyện cười: kẻ “hàng giặc” ấy đã đem cả trại giặc về dâng vua.",go:(_A,G)=>[e67bien(G[0]),e67dad(G[1])].join(" "),rw:"bienngu",ti:"Muội muội của người phá Hắc Thủy"}));

