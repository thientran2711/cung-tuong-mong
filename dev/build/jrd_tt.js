/* ================= jrd_tt: the four full roads of «Con gái Tể tướng» (tt), chapters .5–.11 (ROAD_MAP.md §4.1) =================
   Pilot origin of jroad.js. Same arc shape as j67 (p = pools of hồi: mở đầu / rắc rối / bước ngoặt / cao trào; B = hồi; E = kết cục).
   Openings read how the chapter before ended (rdK: 1 won, 0 middle, −1 lost), so the same road does not read the same twice (OD:L1253).
   The road's people are cast once and carried (rdCast). Hostile roles are real both ways (relAdd / oanAdd, OD:L1247). */
/* rdRel / rdOan / RDW live in jroad.js (engine, shared by every jrd_<origin>.js) */
/* cast-guards (review road-map-r1 item 3): a hồi that states the rival's rank, rise or child runs only when it is true in this life */
const TT_VUP=A=>{const v=rv67(A,"v");return !!v&&v.rank>S.rank},TT_VKID=A=>{const v=rv67(A,"v");return !!v&&(v.kids||[]).some(k=>k.alive)},TT_VHI=A=>{const v=rv67(A,"v");return !!v&&v.rank>=2};

/* ---------- tt_co · Quân cờ trong tay cha ---------- */
rdDef("tt_co",5,{t:"Môn sinh của cha",w:"dad",sj:"môn sinh của phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Môn sinh của {dad} ngồi khắp lục bộ. Người thì gõ cửa cung ngươi xin một lời nói giúp, kẻ thì chỉ nghe lệnh cha. Ai là người của ngươi, ai là tai mắt của cha, phải tự phân.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Môn sinh đến cửa",w:"dad",if:RDW(1),t:"Từ ngày phủ Tể tướng nghe theo ngươi, một Thị lang bộ Hộ lén gửi lễ vào cung: hắn muốn ngươi nhắc tên hắn khi Thượng thư cáo lão.",o:[
  {n:"Nhận lễ, hứa nói giúp",wx:"có thêm một người trong bộ Hộ",lx:"nhận lễ là để lại dấu",f:"buy",rt:"Thị lang cúi đầu tạ ơn, từ nay việc bộ Hộ đều qua tai ngươi."},
  {n:"Trả lễ, bảo hắn tự lập công",wx:"tiếng thanh liêm",lx:"hắn quay về nương cha, bộ Hộ mất một tai mắt của ngươi",f:"clean",rt:"Ngươi trả lễ, niêm còn nguyên. Hắn đỏ mặt lui ra."},
  {n:"Thử tài hắn bằng một việc nhỏ",f:"own",wx:"biết người dùng được",lx:"hắn làm hỏng việc, Danh −",rt:"Hắn làm việc gọn gàng, không để lại dấu.",rf:"Hắn khoe khắp bộ rằng có người trong cung chống lưng."}]},
 s2:{h:"Cha không hỏi ý ngươi nữa",w:"dad",if:RDW(0),t:"Thư nhà thưa dần. Ngươi nghe tin {dad} đã gả cháu gái cho con một Thượng thư, kết thêm một nhà thông gia mà không báo ngươi một lời.",o:[
  {n:"Viết thư hỏi cha",wx:"cha nhớ ra ngươi còn hữu dụng",lx:"cha đáp lạnh nhạt",rt:"Cha hồi thư dài, kể cả những điều chưa từng kể.",rf:"Cha chỉ gửi lại một chữ “Biết”."},
  {n:"Tự kết giao với nhà thông gia mới",f:"own",wx:"một nhà quyền thần biết đến ngươi",lx:"cha cho là ngươi đi sau lưng ông",rt:"Phu nhân nhà Thượng thư vào cung thỉnh an ngươi.",rf:"Nhà ấy khéo léo từ chối."},
  {n:"Để mặc cha",wx:"Lòng +",lx:"ngoài triều không ai nhắc tên ngươi",f:"cold",rt:"Ngươi gấp thư lại, không hồi âm."}]},
 c1:{h:"Một môn sinh nhận hối lộ",w:"dad",t:"Ngự sử bắt được một môn sinh của cha nhận hối lộ. Hắn nói hắn là người “của nương nương trong cung”.",o:[
  {n:"Chối thẳng, để luật xử hắn",wx:"giữ tay sạch",lx:"cha mất một người, môn sinh trong triều thôi nói giúp ngươi",f:"clean",rt:"Hắn bị cách chức. Ngự sử khen ngươi biết giữ phép."},
  {n:"Bỏ bạc lo cho hắn thoát",f:"buy",wx:"hắn nợ ngươi cả đời",lx:"bị lộ là ngươi che tham quan",rt:"Án được xử nhẹ, hắn bị điều về huyện xa.",rf:"Ngự sử dâng sớ nhắc đến cung ngươi."},
  {n:"Bắt hắn khai ai đứng sau",f:"own",wx:"nắm thóp kẻ khác trong phủ",lx:"phủ cha bị khuấy động",rt:"Hắn khai ra một quản gia của cha ăn chặn.",rf:"Hắn cắn lưỡi không khai, cả phủ sợ ngươi."}]},
 c2:{h:"{v} dò la thư nhà",w:"v",need:["v"],t:"{v} cho người làm thân với cung nữ đưa thư của ngươi. Nàng muốn biết phủ Tể tướng đang tính gì.",o:[
  {n:"Đổi người đưa thư",wx:"thư nhà kín đáo",lx:"{v} biết ngươi đã đề phòng",f:"clean",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Đường thư được thay, {v} mất dấu."},
  {n:"Để {v} đọc thư giả",f:"own",wx:"{v} đi sai nước",lx:"thư giả bị nhận ra",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"{v} tin thư giả, dâng lời sai trước mặt Hoàng thượng.",rf:"{v} biết bị lừa."},
  {n:"Hẹn gặp {v} nói thẳng",wx:"hai bên hiểu nhau",lx:"{v} cười nhạt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} lặng đi, hứa không đụng đến thư nhà ngươi.",rf:"{v} nói: “Muốn yên thì bảo cha ngươi lui.”"}]},
 t1:{h:"Ai là người của ai",w:"dad",t:()=>qOn()?"Quản gia của cha lén báo: trong mười môn sinh thì sáu người thật lòng theo cha, ba người theo ai trả nhiều hơn, một người là tai mắt của Hoàng hậu.":"Quản gia của cha lén báo: trong mười môn sinh thì sáu người thật lòng theo cha, ba người theo ai trả nhiều hơn, một người là tai mắt của một cung khác.",o:[
  {n:"Xin danh sách mười người",wx:"biết ai dùng được",lx:"cha biết quản gia nói với ngươi",rt:"Quản gia đưa danh sách, có cả tên kẻ hai lòng.",rf:"Quản gia bị cha đuổi về quê."},
  {n:"Báo cha diệt kẻ hai lòng",need:["hh"],wx:"cha tin ngươi",lx:"Hoàng hậu mất một tai mắt, nàng nhớ ai đã làm",f:"obey",rt:"Kẻ hai lòng bị đẩy ra khỏi phủ."},
  {n:"Báo cha diệt kẻ hai lòng",if:()=>!qOn(),wx:"cha tin ngươi",lx:"cung kia mất một tai mắt, khắp cung đồn ngươi tay nặng",f:"obey",rt:"Kẻ hai lòng bị đẩy ra khỏi phủ."},
  {n:"Giữ im, chờ dùng sau",wx:"cầm một lá bài",lx:"kẻ hai lòng còn trong phủ, tin của ngươi vẫn lọt ra",rt:"Ngươi ghi tên kẻ ấy vào sổ riêng."}]},
 x1:{h:"Lại bộ trống ghế",w:"dad",t:"Thượng thư bộ Lại cáo lão. Cha muốn ghế ấy cho môn sinh của ông. Đêm ấy Hoàng thượng nhắc như vô tình rằng ghế Lại bộ còn trống, rồi im lặng chờ xem ngươi có mở lời.",o:[
  {n:"Khẽ nhắc tên môn sinh của chính ngươi",e:["win","lose"],rt:"Người của ngươi ngồi ghế Lại bộ.",rf:"Hoàng thượng thấy ngươi tham quyền."},
  {n:"Nói giúp người của cha",wx:"phủ cha nợ ngươi một lời",e:["mid","lose"],rt:"Môn sinh của cha nhận ấn.",rf:"Hoàng thượng chọn người khác."},
  {n:"Không nói, để Hoàng thượng tự chọn",e:"mid",lx:"không ai nợ ngươi; môn sinh của cha thấy ngươi đứng ngoài",rt:"Ngươi chỉ cúi đầu: “Thần thiếp không dám bàn việc triều.”"}]}},
 E:{win:{tag:"Người của ngươi ở Lại bộ",w:"dad",t:"Từ nay có một người trong triều đi theo ngươi chứ không theo cha. Môn sinh cũ của phủ bắt đầu nhìn ngươi khác.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Ghế Lại bộ về tay cha",t:"Cha giữ được thế. Ngươi vẫn là quân cờ của ông, chỉ là quân cờ được nể hơn."},
  lose:{tag:"Hoàng thượng nghi phủ Tể tướng",t:"Hoàng thượng chọn người ngoài, và từ đó nhìn ngươi như nhìn con gái Tể tướng, không phải như nhìn ái phi.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_co",6,{t:"Kẻ đọc trộm thư",w:"maid",sj:"kẻ đọc trộm thư nhà",cast(A){return rdCast(A,["v"])},
 g:"Có kẻ trong cung ngươi chép thư nhà đưa ra ngoài. Tìm ra nó, mà không để cả cung biết ngươi bị phản.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một lá thư đến tay người lạ",w:"maid",if:RDW(1),t:"Người của ngươi ở Lại bộ báo: có bản chép thư nhà của ngươi đang truyền tay trong triều. Chữ chép mới, mực còn thơm.",o:[
  {n:"Lặng lẽ cho người dò",wx:"có manh mối",lx:"kẻ chép biết bị dò",rt:"Bản chép là nét chữ của một cung nữ hầu mực.",rf:"Kẻ chép đốt hết giấy."},
  {n:"Đổi hết người hầu bút mực",wx:"chặn ngay đường rò",lx:"người vô tội cũng bị đuổi",rt:"Ba cung nữ bị đưa đi chỗ khác."},
  {n:"Viết thư giả để nhử",f:"own",wx:"nhử được kẻ ăn cắp",lx:"thư giả lọt ra ngoài thì cha mất mặt",rt:"Thư giả đi đúng đường cũ.",rf:"Thư giả lại đến tay cha."}]},
 s2:{h:"Cha trách ngươi lộ thư",w:"dad",if:RDW(0),t:"{dad} gửi thư trách: điều ông dặn riêng ngươi, nay cả triều đều biết. Ông cho là ngươi hớ hênh.",o:[
  {n:"Nhận lỗi, hứa tìm kẻ gian",wx:"cha nguôi giận",lx:"nhận lỗi là nhận tiếng hớ hênh với cả phủ",rt:"Cha hồi thư ngắn: “Tìm cho ra.”"},
  {n:"Nói với cha có kẻ trong phủ ông",wx:"cha dò phía ông",lx:"cha cho là ngươi đổ lỗi",rt:"Cha cho người canh lại người đưa thư.",rf:"Cha càng giận hơn."},
  {n:"Thôi viết thư nhà",wx:"không còn gì để lộ",lx:"cha con xa nhau thêm, phủ thôi nói giúp ngươi ngoài triều",f:"cold",rt:"Ngươi khóa nghiên mực lại."}]},
 c1:{h:"Cung nữ hầu mực",w:"maid",t:"Cung nữ hầu mực khóc lóc: nàng có mẹ già ngoài cung, có người trả bạc để nàng chép thư.",o:[
  {n:"Tha cho nàng, bắt nàng làm hai mang",wx:"đường rò thành đường nhử",lx:"nàng phản lần nữa",rt:"Nàng thề đưa thư nào ngươi bảo.",rf:"Nàng bỏ trốn khỏi cung."},
  {n:"Giao Thận hình ty xử",wx:"cả cung biết phép",lx:"người hầu trong cung sợ ngươi, kẻ đứng sau biết ngươi đã biết",rt:"Nàng bị đánh ba mươi trượng, đưa xuống Tân Giả khố."},
  {n:"Cho bạc nuôi mẹ nàng, giữ nàng ở lại",wx:"nàng hết lòng với ngươi",lx:"tốn bạc",rt:"Nàng dập đầu đến rướm máu."}]},
 c2:{h:"Bạc từ cung nào",w:"v",need:["v"],t:"Bạc trả cho kẻ chép thư là bạc thỏi có dấu của cung {v}.",o:[
  {n:"Đưa thỏi bạc lên Hoàng hậu",need:["hh"],wx:"{v} bị khiển trách",lx:"Hoàng hậu thấy ngươi rắc rối",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng hậu phạt {v} chép kinh một tháng.",rf:"{v} nói thỏi bạc bị trộm từ trước."},
  {n:"Giữ thỏi bạc, chờ dịp",wx:"cầm chứng cứ trong tay",lx:"{v} chưa bị gì, đường tin của nàng trong cung ngươi còn nguyên",rt:"Ngươi gói thỏi bạc trong khăn lụa."},
  {n:"Gửi trả thỏi bạc cho {v}",wx:"{v} biết ngươi không muốn gây",lx:"{v} cho là ngươi sợ, khắp cung nói ngươi yếu thế",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận lại, không nói gì."}]},
 t1:{h:"Kẻ thật sự trả bạc",w:"v",t:"Lần theo người đưa bạc, ngươi thấy {v} chỉ là người chuyển tay. Bạc gốc đến từ một phủ đối đầu với cha ngoài triều.",o:[
  {n:"Báo cha biết kẻ đối đầu",wx:"cha nợ ngươi một lần",lx:"triều đình thêm sóng, Hoàng thượng phiền lòng vì phủ cha",f:"obey",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha gật đầu, ghi tên phủ ấy."},
  {n:"Tự nắm lấy manh mối",f:"own",wx:"lá bài của riêng ngươi",lx:"cha không biết, không giúp được",rt:"Ngươi giữ kín tên phủ ấy."},
  {n:"Bỏ qua, chỉ giữ cung mình kín",wx:"yên chuyện",lx:"kẻ đứng sau còn đó, đường tin của ngươi vẫn bị dòm",rt:"Ngươi khép cửa cung."}]},
 x1:{h:"Bắt tận tay",w:"v",t:"Đêm nay người của {v} sẽ đến lấy bản chép cuối cùng. Ngươi có thể bắt tận tay, hoặc để nó đi.",o:[
  {n:"Cho thị vệ phục sẵn",e:["win","lose"],rt:"Người của {v} bị bắt cùng bản chép.",rf:"Kẻ đến lấy thư chạy thoát, chỉ còn lời ngươi nói."},
  {n:"Để nó lấy thư giả đi",e:["win","mid"],rt:"Thư giả đến tay kẻ đứng sau, hắn đi sai một nước lớn.",rf:"Thư giả bị nhận ra, nhưng đường rò đã bị chặn."},
  {n:"Đóng cửa, không bắt ai",e:"mid",lx:"không ai bị trừng trị",rt:"Ngươi thôi viết thư, đường rò tự tắt."}]}},
 E:{win:{tag:"Bắt được kẻ đọc trộm thư",w:"v",t:"Người của {v} bị bắt tận tay. Từ nay chẳng ai dám đưa tay vào cung ngươi.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Đường rò đã chặn",t:"Thư nhà kín lại, nhưng kẻ đứng sau vẫn chưa lộ mặt."},
  lose:{tag:"Thư nhà lọt ra triều",t:"Một bức thư thật của cha lọt đến tay Ngự sử. Phủ Tể tướng bị dị nghị, và cha cho là lỗi tại ngươi.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_co",7,{t:"Lời đàn hặc",w:"emp",sj:"tờ sớ đàn hặc phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Ngự sử đài dâng sớ đàn hặc {dad} kết bè, mượn con gái trong cung để dò ý vua. Thư nhà của ngươi bị đem ra làm chứng. Giữ cha, hay giữ mình.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tờ sớ nêu tên ngươi",w:"emp",if:RDW(1),t:"Tờ sớ dẫn một câu trong thư cha gửi ngươi — đúng câu trong bản chép kẻ gian lấy đi, câu cha chưa từng viết.",o:[
  {n:"Tâu rõ đó là thư giả",wx:"Ngự sử mất mặt",lx:"Hoàng thượng thấy ngươi biết quá nhiều mưu",rt:"Hoàng thượng cười: “Cũng có tâm cơ.”",rf:"Hoàng thượng hỏi: “Sao thư nhà của ái phi lại đến tay kẻ gian?”"},
  {n:"Im lặng, để cha tự giải",wx:"không dính vào",lx:"cha một mình chống sớ, triều thấy con gái đứng ngoài",rt:"Cha dâng sớ tự biện."},
  {n:"Nhờ người ở Lại bộ lên tiếng",f:"own",wx:"triều có người nói giúp",lx:"lộ ngươi có người ở triều",rt:"Một Thị lang dâng sớ phản bác.",rf:"Ngự sử hặc luôn cả Thị lang."}]},
 s2:{h:"Tờ sớ nêu tên ngươi",w:"emp",if:RDW(0),t:()=>rdEnd(6)==="lose"?"Tờ sớ dẫn nguyên một bức thư thật của cha gửi ngươi. Hoàng thượng đọc xong, không triệu ngươi suốt mười ngày.":"Tờ sớ dẫn lời đồn rằng thư nhà ngươi từng lọt ra ngoài cung. Hoàng thượng đọc xong, không triệu ngươi suốt mười ngày.",o:[
  {n:"Xin vào gặp, nhận lỗi",wx:"Hoàng thượng nguôi",lx:"bị đuổi về",rt:"Hoàng thượng chỉ nói: “Lần sau đừng để trẫm đọc thư nhà của nàng trên triều.”",rf:"Cửa Dưỡng Tâm điện đóng."},
  {n:"Viết thư cắt nghĩa cho cha",wx:"cha biết ngươi không cố ý",lx:"thêm một bức thư nhà, Hoàng thượng càng nghi",rt:"Cha hồi: “Không trách con.”"},
  {n:"Đóng cửa cung, chép kinh",wx:"tỏ lòng thành",lx:"mười ngày chép kinh Sức −, chẳng ai nói giúp ngươi",rt:"Ngươi chép kinh suốt mười ngày."}]},
 c1:{h:"Ngự sử đến tận cửa",w:"emp",t:"Một vị Ngự sử già xin gặp người hầu của ngươi để hỏi chuyện thư từ. Theo lệ, hắn không được vào hậu cung, nhưng hắn có chiếu chỉ tra xét.",o:[
  {n:"Cho người hầu trả lời thật",wx:"tỏ ra không giấu gì",lx:"lời thật bị Ngự sử bóp méo trong tờ tấu",rt:"Ngự sử ghi chép rồi lui."},
  {n:"Dặn người hầu nói ít",wx:"không lộ thêm điều gì",lx:"Ngự sử cho là ngươi giấu",rt:"Ngự sử về tay không.",rf:"Ngự sử ghi: “Cung ấy khép miệng.”"},
  {n:"Biếu Ngự sử chút lễ",wx:"Ngự sử nhẹ tay",lx:"hối lộ Ngự sử là tội nặng",rt:"Ngự sử nhận lễ, tờ tấu sau nhẹ hẳn.",rf:"Ngự sử dâng luôn lễ vật lên Hoàng thượng."}]},
 c2:{h:"{v} thêm dầu vào lửa",w:"v",need:["v"],t:"Trong buổi thỉnh an, {v} nói to: “Con gái nhà quyền thần, nằm bên gối vua mà lòng ở phủ cha.”",o:[
  {n:"Đáp lại sắc bén",wx:"cả điện nể ngươi",lx:"thành ra cãi nhau giữa buổi thỉnh an",go:(A,ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi đáp một câu, {v} đỏ mặt im lặng.",rf:"Cả điện cho là hai người cãi nhau, ai cũng lắc đầu."},
  {n:"Cúi đầu im lặng",wx:"giữ thể diện",lx:"lời gièm cứ thế lan khắp lục cung",rt:"Ngươi chỉ khẽ nâng chén trà."},
  {n:"Sau buổi, tìm {v} nói chuyện riêng",wx:"{v} thôi gièm",lx:"{v} càng hăng",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} thở dài: “Ta cũng chỉ là quân cờ của nhà ta.”",rf:"{v} quay lưng bỏ đi."}]},
 t1:{h:"Cha hỏi một câu",w:"dad",t:"Thư cha đến giữa đêm: “Nếu Hoàng thượng hỏi, con có nhận những thư ấy không?”",o:[
  {n:"Nhận, để giữ cha",f:"obey",wx:"cha thấy con hiếu thảo",lx:"Hoàng thượng thấy ngươi đứng về phía cha",rt:"Ngươi đáp: “Con nhận.”"},
  {n:"Không nhận, để giữ mình",f:"own",wx:"Hoàng thượng thấy ngươi biết phận",lx:"cha một mình gánh, môn sinh thấy ngươi bỏ nhà",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngươi đáp: “Con không biết những thư ấy.”"},
  {n:"Xin cha tự lui một bước",wx:"cả nhà còn đường lùi",lx:"cha giận ngươi dạy ông",rt:"Cha im lặng hai ngày, rồi xin nghỉ phép dưỡng bệnh.",rf:"Cha xé thư."}]},
 x1:{h:"Hoàng thượng hỏi",w:"emp",t:"Hoàng thượng đặt tờ sớ trước mặt ngươi: “Nàng nói đi. Trẫm nghe.”",o:[
  {n:"Tâu thật, xin xử công bằng cho cha",e:["win","lose"],rt:"Hoàng thượng gật đầu: “Trẫm sẽ xét cho công bằng.” Tờ sớ được gác lại.",rf:"Hoàng thượng lặng thinh, rồi phạt bổng cha một năm."},
  {n:"Khéo léo đổ lỗi cho kẻ đọc trộm thư",lx:"đẩy tội cho kẻ dưới, lòng không yên",e:["win","mid"],rt:"Hoàng thượng truy kẻ chép thư, không truy cha.",rf:"Hoàng thượng chỉ nói: “Trẫm biết rồi.”"},
  {n:"Quỳ xin Hoàng thượng đừng hỏi",e:"mid",lx:"chuyện không rõ trắng đen",rt:"Hoàng thượng phẩy tay cho ngươi lui."}]}},
 E:{win:{tag:"Tờ sớ bị gác lại",w:"emp",t:"Hoàng thượng thấy ngươi thẳng thắn. Ngự sử thôi hặc, cha được giữ ghế, và ông biết ai đã giữ cho ông.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Sóng lặng mà chưa yên",t:"Tờ sớ chìm xuống, nhưng trong triều ai cũng nhớ: con gái Tể tướng có viết thư về phủ."},
  lose:{tag:"Cha bị phạt bổng",t:"Cha bị phạt bổng một năm, phủ Tể tướng mất mặt, và Hoàng thượng thôi kể chuyện triều chính với ngươi.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_co",8,{t:"Ái phi hay con gái Tể tướng",w:"emp",sj:"lòng ngươi đứng về phía ai",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng bắt đầu thử ngươi: những điều ngài nói bên gối có đến tai {dad} hay không. Mỗi lời ngươi giữ hay để lọt đều được ngài ghi nhớ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một tin giả bên gối",w:"emp",if:RDW(1),t:"Hoàng thượng nói như vô tình: “Trẫm định đưa Tể tướng đi trấn Lưỡng Quảng.” Ngươi đoán ngài đang thử.",o:[
  {n:"Giữ kín, không báo cha",wx:"Hoàng thượng tin ngươi",lx:"nếu là thật, cha bị bất ngờ và phủ trách ngươi giấu",f:"own",rt:"Mười ngày sau, không ai ngoài cung nhắc chuyện Lưỡng Quảng."},
  {n:"Báo cha cẩn thận",f:"obey",wx:"cha đề phòng",lx:"Hoàng thượng biết tin đã lọt",rt:"Cha dâng sớ khéo, không lộ là biết trước.",rf:"Cha vội dâng sớ xin ở lại kinh. Hoàng thượng mỉm cười lạnh."},
  {n:"Hỏi thẳng Hoàng thượng có thật không",wx:"ngài thích sự thẳng thắn",lx:"ngài thấy ngươi quá để tâm việc nhà",rt:"Hoàng thượng cười: “Không thật. Trẫm chỉ muốn xem nàng.”",rf:"Hoàng thượng không đáp."}]},
 s2:{h:"Hoàng thượng thôi kể chuyện triều",w:"emp",if:RDW(0),t:"Đã ba tháng Hoàng thượng không nhắc một lời việc triều khi ở cung ngươi. Ngài vẫn đến, nhưng chỉ nói chuyện hoa cỏ.",o:[
  {n:"Cũng chỉ nói chuyện hoa cỏ",wx:"ngài thấy nhẹ lòng",lx:"ngươi mù tịt việc triều, mưu gì cũng thiếu tin tức",rt:"Hoàng thượng ở lại lâu hơn mọi khi."},
  {n:"Khéo hỏi một chuyện nhỏ",wx:"biết được hướng gió",lx:"ngài thấy ngươi dò",rt:"Ngài kể một chuyện ở bộ Binh, không giấu.",rf:"Ngài đặt chén trà xuống: “Nàng hỏi cho ai?”"},
  {n:"Thưa thật: thần thiếp không muốn ngài nghi",wx:"ngài cảm động",lx:"ngài cho là lời khéo",rt:"Hoàng thượng nắm tay ngươi rất lâu.",rf:"Hoàng thượng chỉ gật đầu."}]},
 c1:{h:"Cha đòi tin",w:"dad",t:"{dad} nhắn: “Lễ bộ sắp mở kỳ tuyển tú. Con hỏi Hoàng thượng xem ngài muốn tuyển nhà nào.”",o:[
  {n:"Hỏi cho cha",f:"obey",wx:"cha có tin",lx:"Hoàng thượng biết ngươi hỏi cho ai",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngươi biết được hai nhà trong danh sách.",rf:"Hoàng thượng hỏi lại: “Ai muốn biết?”"},
  {n:"Đáp cha: con không hỏi được",f:"own",wx:"giữ lòng Hoàng thượng",lx:"cha lạnh nhạt, phủ thôi nói giúp ngươi",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha không hồi âm."},
  {n:"Hỏi Hoàng hậu thay vì hỏi vua",need:["hh"],wx:"có tin mà không phạm vua",lx:"Hoàng hậu biết nhà ngươi muốn chen",rt:"Hoàng hậu nói qua một câu, đủ để ngươi hiểu.",rf:"Hoàng hậu chỉ cười."}]},
 c2:{h:"{v} tâu chuyện thư nhà",w:"v",need:["v"],t:"{v} khóc trước Hoàng thượng: nàng sợ những điều ngài nói ở cung nàng cũng lọt ra như ở cung ngươi.",o:[
  {n:"Cầu Hoàng thượng tra cả hai cung",wx:"ngươi trong sạch",lx:"tra ra chuyện cũ",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Tra xong, cung ngươi không có gì.",rf:"Tra ra một bức thư cũ của cha."},
  {n:"Nhẫn, không đáp",wx:"không thêm sóng",lx:"lời gièm ở lại trong lòng vua",rt:"Ngươi chỉ cúi đầu."},
  {n:"Kể một chuyện xấu của nhà {v}",wx:"{v} thôi lên tiếng",lx:"thành ra hai cung đấu nhau",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt, xin lui.",rf:"Hoàng thượng chán cả hai."}]},
 t1:{h:"Một lời thề",w:"emp",t:"Đêm khuya, Hoàng thượng hỏi khẽ: “Nếu một ngày trẫm và Tể tướng không đứng chung, nàng đứng bên nào?”",o:[
  {n:"Thần thiếp đứng về phía Hoàng thượng",f:"own",wx:"ngài nhớ lời này",lx:"lời thề thì phải giữ; phủ cha biết ngươi đã chọn vua",rt:"Hoàng thượng không nói gì, chỉ kéo chăn đắp cho ngươi."},
  {n:"Thần thiếp xin bệ hạ đừng bắt thần thiếp chọn",wx:"thật lòng",lx:"ngài thấy ngươi do dự",rt:"Hoàng thượng thở dài."},
  {n:"Cha thần thiếp cũng là bề tôi của bệ hạ",wx:"ngài thấy ngươi khéo",lx:"ngài thấy ngươi lẩn tránh",rt:"Hoàng thượng bật cười.",rf:"Hoàng thượng quay mặt vào trong."}]},
 x1:{h:"Phép thử cuối",w:"emp",t:"Hoàng thượng sắp đi tế Giao. Ngài giao ngươi một hộp tấu niêm phong về phủ Tể tướng, dặn: “Hộp này nàng trông giúp trẫm ba ngày. Chìa trẫm giữ.”",o:[
  {n:"Giữ nguyên niêm, trả lại sau ba ngày",lx:"canh hộp ba ngày ba đêm, mất ăn mất ngủ",e:["win","mid"],rt:"Niêm nguyên vẹn. Hoàng thượng nhìn ngươi rất lâu rồi nói: “Trẫm tin nàng.”",rf:"Niêm nguyên vẹn, nhưng có kẻ báo ngươi đã mở hộp xem."},
  {n:"Mở xem, báo cha",wx:"cha biết trước, nợ ngươi một lần",lx:"phá niêm hộp tấu của vua là tội lớn",go:(A,ok,G)=>ok?e67dad(G[0]):"",e:["mid","lose"],rt:"Cha kịp lo trước, Hoàng thượng không biết.",rf:"Niêm bị động. Hoàng thượng biết."},
  {n:"Xin Hoàng thượng đừng giao cho thần thiếp",e:"mid",lx:"phép thử bỏ dở, ngài thấy ngươi né",rt:"Hoàng thượng thu lại hộp tấu."}]}},
 E:{win:{tag:"Hoàng thượng tin ngươi",w:"emp",t:"Từ đây Hoàng thượng kể việc triều với ngươi như với một người tri kỷ. Cha biết, và cha bắt đầu sợ ngươi."},
  mid:{tag:"Ngờ vực chưa tan",t:"Hoàng thượng vẫn thương ngươi, nhưng có những đêm ngài im lặng khi ngươi nhắc đến nhà."},
  lose:{tag:"Hoàng thượng đề phòng ngươi",t:"Niêm tấu bị động. Hoàng thượng không nói ra, nhưng ngài thôi đến cung ngươi một mùa.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_co",9,{t:"Tự cầm quân cờ",w:"dad",sj:"phe cánh riêng của ngươi",cast(A){return rdCast(A,["v"])},
 g:"Đã đến lúc ngươi có người của mình ở ngoài triều, không qua tay {dad}: một vị quan trẻ, một nhà thông gia, một thái giám giữ ấn. Mỗi người là một món nợ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Vị quan trẻ",w:"dad",if:RDW(1),t:"Một Hàn lâm trẻ vừa đỗ Thám hoa, nghèo mà thẳng. Cha muốn mua hắn; ngươi muốn hắn theo ngươi.",o:[
  {n:"Lo cho mẹ hắn chữa bệnh",wx:"hắn mang ơn ngươi, không mang ơn cha",lx:"tốn bạc",rt:"Mẹ hắn khỏi bệnh. Hắn quỳ ngoài cửa cung lạy ba lạy."},
  {n:"Để cha mua hắn",f:"obey",wx:"cha chia ngươi phần",lx:"hắn thành người của cha, ngoài triều chỉ biết tên cha",rt:"Hắn vào phủ Tể tướng làm môn khách."},
  {n:"Tiến cử hắn với Hoàng thượng",f:"own",wx:"hắn biết ai nói giúp",lx:"Hoàng thượng chê ngươi bàn việc triều",rt:"Hắn được vào thư phòng hầu bút.",rf:"Hoàng thượng gạt đi."}]},
 s2:{h:"Không ai đứng sau ngươi",w:"dad",if:RDW(0),t:"Một lần ngươi cần người nói giúp ngoài triều, cả triều im lặng. Ai cũng chờ ý {dad}.",o:[
  {n:"Tự gây dựng, bắt đầu từ thái giám giữ ấn",f:"own",wx:"có người giữ ấn trong tay",lx:"hắn ăn hai đầu",rt:"Thái giám giữ ấn nhận lễ, hứa báo tin.",rf:"Hắn báo luôn với cha."},
  {n:"Quay về xin cha",f:"obey",wx:"cha giúp",lx:"ngươi lại là quân cờ, triều chỉ thấy tay cha",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha gửi người, kèm một bức thư dạy dỗ."},
  {n:"Chờ thời",wx:"không mắc nợ ai",lx:"thời không chờ ai, ngoài triều quên tên ngươi",rt:"Ngươi lặng lẽ chờ."}]},
 c1:{h:"Nhà thông gia",w:"dad",t:"Một nhà Thượng thư muốn kết thân: con trai họ cưới em họ ngươi. Cha phản đối vì nhà ấy không theo ông.",o:[
  {n:"Tác thành mối thân",f:"own",wx:"một nhà quyền thần đứng sau ngươi",lx:"cha giận",go:(A,ok,G)=>{if(ok)e67dad(G[0])},rt:"Hôn sự thành. Thượng thư gửi lễ tạ vào cung.",rf:"Cha phá ngang hôn sự."},
  {n:"Nghe cha, từ chối",f:"obey",wx:"cha vui",lx:"mất một nhà đồng minh, mất luôn tai mắt bên ấy",rt:"Ngươi khước từ khéo."},
  {n:"Đề nghị một mối khác",wx:"cả hai bên đều vừa ý",lx:"thêm tốn kém",rt:"Hai nhà kết thân qua một người cháu khác.",rf:"Không bên nào ưng."}]},
 c2:{h:"{v} cũng gây phe",w:"v",need:["v"],if:A=>TT_VHI(A),t:"{v} đang kéo những phi tần thấp phẩm về phía nàng, nói xấu ngươi là “con cờ của Tể tướng”.",o:[
  {n:"Kéo người về phía mình",wx:"có người trong hậu cung",lx:"tốn bạc mà không được",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hai phi tần thấp phẩm đến thỉnh an ngươi mỗi sáng.",rf:"Họ nhận quà rồi vẫn theo {v}."},
  {n:"Bắt tay với {v}",wx:"bớt một đối thủ",lx:"{v} lợi dụng ngươi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận lời: “Hậu cung đủ rộng cho hai người.”",rf:"{v} nhận rồi đem chuyện ra cười."},
  {n:"Mặc kệ",wx:"giữ bạc, {v} không lợi dụng được ngươi",lx:"phe {v} lớn dần, lời gièm bám tên ngươi",rt:"Ngươi không đáp lời gièm."}]},
 t1:{h:"Cha biết",w:"dad",t:"{dad} biết ngươi đang gây phe riêng. Ông viết: “Con đi đường con, đừng trách cha không che chở.”",o:[
  {n:"Đáp: con vẫn là con của cha",wx:"cha nguôi",lx:"cha vẫn giận",go:(A,ok,G)=>{e67dad(ok?G[0]:G[1])},rt:"Cha gửi một hộp mứt quê, không kèm thư.",rf:"Cha không hồi âm."},
  {n:"Đáp: con đi đường con",f:"own",wx:"rõ ràng",lx:"mất chỗ dựa ở phủ, môn sinh của cha quay lưng",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Từ đó thư nhà thưa hẳn."},
  {n:"Xin gặp cha khi cha vào chầu",wx:"nói được điều thư không nói",lx:"bị lời ra tiếng vào",rt:"Hai cha con nói với nhau một khắc dưới mái hiên.",rf:"Cha không đến."}]},
 x1:{h:"Phe của ngươi ra mặt",w:"v",t:"Triều hội bàn việc lập kho Thường bình. Người của ngươi, người của cha, người của {v} đều muốn nắm.",o:[
  {n:"Để người của ngươi đứng ra",e:["win","lose"],rt:"Người của ngươi được giao lập kho. Cả triều biết trong cung có một phe mới.",rf:"Người của ngươi bị đánh bật. Phe ngươi tan."},
  {n:"Nhường cho người của cha",wx:"cha nể ngươi",e:["mid","lose"],rt:"Cha nắm kho, chia cho ngươi chút thể diện.",rf:"Người của {v} nắm kho."},
  {n:"Giữ phe ngươi ẩn thêm",e:"mid",lx:"chưa có gì trong tay, người của ngươi chờ lâu sinh chán",rt:"Ngươi dặn người của mình im lặng."}]}},
 E:{win:{tag:"Một phe của riêng ngươi",w:"dad",t:"Ngoài triều có người theo ngươi, trong hậu cung có người thỉnh an ngươi. Ngươi không còn là quân cờ của ai.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Phe còn non",t:"Ngươi có vài người, nhưng chưa đủ để đứng một mình."},
  lose:{tag:"Phe cánh tan rã",t:"Người của ngươi bị đánh bật, cha cười, {v} cười. Ngươi phải bắt đầu lại.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("tt_co",10,{t:"Đêm trước triều hội",w:"emp",sj:"cuộc đối đầu giữa Hoàng thượng và Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng muốn chia quyền Tể tướng làm ba; {dad} sẽ không chịu. Triều hội sáng mai sẽ quyết. Đêm nay cả hai đều chờ ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hai lá thư một đêm",w:"dad",if:RDW(1),t:"Chạng vạng, thư cha đến: “Con khuyên Hoàng thượng hoãn lại.” Canh hai, thái giám truyền: Hoàng thượng đến cung ngươi.",o:[
  {n:"Đốt thư cha trước khi vua đến",f:"own",wx:"không để lại gì",lx:"cha không được hồi âm, phủ cho là ngươi bỏ nhà",rt:"Tro thư bay qua song cửa."},
  {n:"Đưa thư cha cho Hoàng thượng xem",wx:"ngài thấy ngươi không giấu",lx:"cha biết ngươi đem thư ông ra",go:(A,ok,G)=>{if(ok)e67dad(G[0])},rt:"Hoàng thượng đọc, rồi gấp lại: “Trẫm biết.”",rf:"Hoàng thượng nhíu mày: “Nàng đưa trẫm xem làm gì?”"},
  {n:"Giữ thư, chờ xem ý vua",wx:"còn đường lui",lx:"giữ thư là ôm mầm họa, Hoàng thượng thấy ngươi còn giấu",rt:"Ngươi giấu thư vào hộp trang điểm."}]},
 s2:{h:"Đêm không ai đến",w:"dad",if:RDW(0),t:"Đêm trước triều hội, không ai đến cung ngươi. Cha không viết, vua không ghé. Ngươi chỉ nghe tin qua cung nữ.",o:[
  {n:"Sai người mang canh đến Dưỡng Tâm điện",wx:"ngài nhớ đến ngươi",lx:"canh bị trả về",rt:"Hoàng thượng cho gọi ngươi đến.",rf:"Canh nguội ngoài cửa điện."},
  {n:"Viết thư cho cha",wx:"cha nghe một lời",lx:"thư đến muộn",rt:"Cha hồi: “Con nói đi.”",rf:"Thư không kịp đến."},
  {n:"Đóng cửa, thắp hương",wx:"Lòng +",lx:"không ai biết ý ngươi, đêm ấy vua không nhớ đến ngươi",rt:"Ngươi ngồi bên đèn đến sáng."}]},
 c1:{h:"Thượng thư bộ Binh đứng đâu",w:"dad",t:"Thượng thư bộ Binh còn lưỡng lự. Một lời của ngươi qua phu nhân ông có thể nghiêng cán cân.",o:[
  {n:"Nhắn ông đứng về phía Hoàng thượng",f:"own",wx:"Hoàng thượng có thêm một người đứng về phía mình",lx:"cha biết ngươi kéo người",go:(A,ok,G)=>{if(ok)e67dad(G[0])},rt:"Phu nhân Thượng thư gật đầu.",rf:"Phu nhân chỉ cười, không hứa."},
  {n:"Nhắn ông đứng về phía cha",f:"obey",wx:"cha thêm một phiếu",lx:"Hoàng thượng biết",go:(A,ok,G)=>{if(ok)e67dad(G[0])},rt:"Phu nhân Thượng thư gật đầu.",rf:()=>qOn()?"Phu nhân đem chuyện kể với Hoàng hậu.":"Phu nhân đem chuyện kể khắp các phủ."},
  {n:"Không nhắn gì",wx:"không nhúng tay",lx:"cán cân tự nghiêng, không bên nào nhớ ơn ngươi",rt:"Ngươi để mặc."}]},
 c2:{h:"{v} cũng chờ",w:"v",need:["v"],t:"Người của {v} rình ngoài cung ngươi. Nàng chờ một sơ suất để tâu rằng ngươi gặp người của phủ Tể tướng ban đêm.",o:[
  {n:"Bắt kẻ rình",wx:"cung ngươi sạch",lx:"ầm ĩ giữa đêm",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Kẻ rình bị bắt, khai là người của {v}.",rf:"Kẻ rình chạy thoát."},
  {n:"Cho kẻ rình thấy một cảnh vô hại",wx:"{v} tâu sai",lx:"{v} thêu dệt",rt:"{v} tâu rằng ngươi ngồi chép kinh suốt đêm.",rf:"{v} vẫn thêu dệt chuyện có người lạ."},
  {n:"Mặc kệ",wx:"không động",lx:"{v} tự do thêu dệt chuyện cung ngươi",rt:"Ngươi không để ý."}]},
 t1:{h:"Cha đến cửa cung",w:"dad",t:"Trước giờ triều hội, {dad} xin vào thỉnh an — điều chưa từng có. Ông chỉ nói: “Con gái, cha già rồi.”",o:[
  {n:"Khuyên cha lui một bước",wx:"cha nghe",lx:"cha thấy con không cần cha",rt:"Cha lặng lẽ gật đầu.",rf:"Cha đi ra, không ngoái lại."},
  {n:"Hứa giữ cha",f:"obey",wx:"cha yên lòng",lx:"lời hứa nặng",rt:"Cha cười, lần đầu tiên sau nhiều năm."},
  {n:"Không gặp",f:"own",wx:"không bị lay",lx:"cha đau lòng, người trong cung nói ngươi bất hiếu",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha đứng ngoài cửa một lúc rồi đi."}]},
 x1:{h:"Ngự thư phòng",w:"emp",t:"Tảo triều vừa tan. Hoàng thượng giữ ngươi lại ở Ngự thư phòng, bảo ngươi mài mực. Ngài đặt bản tâu của Tể tướng ra giữa án, liếc nhìn ngươi trước khi phê.",o:[
  {n:"Để lại một mảnh giấy dưới nghiên mực: “Chia mà không bỏ”",e:["win","lose"],rt:"Hoàng thượng chia quyền Tể tướng, nhưng giữ cha ở ghế cao nhất. Cả hai bên đều còn mặt mũi.",rf:()=>S.thDead?"Mảnh giấy bị Tổng quản thái giám thấy trước, tâu lên Hoàng thượng. Ngài nghiêm mặt.":"Mảnh giấy bị Tổng quản thái giám thấy trước, tâu lên Thái hậu. Bà nghiêm mặt."},
  {n:"Lặng lẽ mài mực, không nói",e:["mid","lose"],rt:"Hoàng thượng tự quyết. Cha mất một nửa quyền.",rf:"Cha phản kháng giữa triều, bị phạt."},
  {n:"Xin Thái hậu nói giúp cha",need:["th"],e:["mid","lose"],rt:"Thái hậu nói một câu, Hoàng thượng hoãn lại.",rf:"Thái hậu từ chối, còn trách ngươi."}]}},
 E:{win:{tag:"Chia mà không bỏ",w:"emp",t:"Hoàng thượng biết ngươi giữ được cả vua lẫn cha. Từ hôm ấy, triều thần gọi cung ngươi là “nửa cái ấn Tể tướng”.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha mất nửa quyền",t:"Cha vẫn ngồi ghế Tể tướng, nhưng chỉ còn một nửa. Ông không trách ngươi, cũng không cảm ơn.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Cha bị phạt giữa triều",t:"Cha cãi vua giữa triều. Hoàng thượng phạt ông, và nhìn về phía ngươi như hỏi: con gái ông có biết không.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_co",11,{t:"Kết ván cờ",w:"dad",sj:"ván cờ của phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Ván cờ của {dad} đi đến nước cuối. Ông muốn trao lại hoặc giữ chặt. Hoàng thượng chờ xem ngươi là người của ai. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cha mời ngươi về thăm nhà",w:"dad",if:RDW(1),t:"{dad} xin Hoàng thượng cho ngươi về phủ một ngày nhân dịp thọ của mẹ. Ông nói có chuyện chỉ nói được trong nhà.",o:[
  {n:"Xin về",wx:"nghe được lời thật của cha",lx:"bị nói là nhớ nhà hơn nhớ vua",rt:"Hoàng thượng cho về, còn ban lễ mừng thọ.",rf:"Hoàng thượng không cho."},
  {n:"Gửi lễ, không về",wx:"giữ phép cung",lx:"cha đành viết thư",rt:"Mẹ ngươi khóc khi nhận lễ."},
  {n:"Mời cha vào cung",f:"own",wx:"nói chuyện trong cung ngươi, ngươi làm chủ",lx:"cha cho là con lên mặt",rt:"Cha đến, ngồi dưới ngươi một bậc theo phép cung.",rf:"Cha cáo bệnh."}]},
 s2:{h:"Cha ngã bệnh",w:"dad",if:RDW(0),t:"Tin từ phủ: {dad} ngã bệnh sau triều hội. Ông nằm liệt, nhưng vẫn đòi đọc tấu.",o:[
  {n:"Xin cho thái y đến phủ",wx:"cha biết con thương",lx:"Hoàng thượng thấy ngươi lấy việc nhà làm phiền",rt:"Thái y đến phủ, cha qua cơn nguy.",rf:"Hoàng thượng chỉ ban thuốc."},
  {n:"Gửi sâm và thư",wx:"tròn đạo hiếu",lx:"tốn bạc",rt:"Cha đọc thư, sai người cất kỹ."},
  {n:"Nhờ người dò ai đang nắm phủ",wx:"biết phủ đang trong tay ai",lx:"bị nói là lạnh lùng",rt:"Quản gia cũ đang giữ gia ấn.",rf:"Không ai dám nói."}]},
 c1:{h:"Sổ môn sinh",w:"dad",t:"Cuốn sổ ghi tên mọi môn sinh của cha là thứ quý nhất phủ Tể tướng. Ai cầm nó, người ấy có nửa triều.",o:[
  {n:"Xin cha giao sổ",f:"own",wx:"nửa triều trong tay",lx:"cha thấy con tham",rt:"Cha đặt cuốn sổ lên bàn, không nói một lời.",rf:"Cha cất sổ vào rương."},
  {n:"Khuyên cha đốt sổ",wx:"không còn ai bị nắm thóp",lx:"mất một lá bài, nửa triều không còn lý do nghe ngươi",rt:"Cha lặng nhìn ngọn lửa."},
  {n:"Để sổ ở lại phủ",f:"obey",wx:"không dính",lx:"người khác sẽ cầm sổ, nửa triều không nghe ngươi",rt:"Ngươi không nhắc đến sổ."}]},
 c2:{h:"{v} nhắm vào phủ",w:"v",need:["v"],t:"Nhà {v} đã chuẩn bị sẵn một xấp sớ: hễ Tể tướng lui là họ hặc cả phủ.",o:[
  {n:"Chặn trước, nói với Hoàng thượng",wx:"sớ bị gác",lx:"Hoàng thượng chán chuyện bè phái",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hoàng thượng dặn Ngự sử đài không nhận sớ hặc người đã cáo lão.",rf:"Hoàng thượng phẩy tay."},
  {n:"Gặp {v} dàn xếp",wx:"hai nhà tạm yên",lx:"{v} nắm thóp",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận lời, cất sớ đi.",rf:"{v} nhận bạc rồi vẫn để nhà nàng dâng sớ."},
  {n:"Để mặc",wx:"đứng ngoài bè phái trước mặt Hoàng thượng, {v} chẳng nắm thóp được",lx:"phủ hứng sớ, Danh −−",rt:"Ngươi không làm gì."}]},
 t1:{h:"Lời cuối của cha",w:"dad",t:"{dad} hỏi: “Cả đời cha dạy con đánh cờ. Giờ con muốn làm quân cờ, làm người đánh cờ, hay bỏ bàn cờ?”",o:[
  {n:"Làm người đánh cờ",f:"own",wx:"cha hiểu",lx:"gánh nặng trên vai, tiếng hiền mỏng đi",rt:"Cha gật đầu chậm rãi."},
  {n:"Làm con của cha",f:"obey",wx:"cha cười",lx:"vẫn trong ván cờ của ông, mưu tính phải theo cha",rt:"Cha đặt tay lên đầu ngươi như thuở nhỏ."},
  {n:"Bỏ bàn cờ",f:"cold",wx:"Lòng +",lx:"mất chỗ dựa, triều thôi nể nhà ngươi",rt:"Cha nhìn ngươi rất lâu: “Có lẽ con đúng.”"}]},
 x1:{h:"Nước cờ cuối",w:"dad",t:"Cha dâng sớ cáo lão. Hoàng thượng hỏi cha: “Khanh tiến cử ai?” Đêm ấy ngài đến cung ngươi, không nói gì về triều, chỉ chờ xem ngươi có mở lời.",o:[
  {n:"Khẽ nhắc tên một môn sinh của cha",e:["win","lose"],rt:"Ngài nhớ cái tên ấy. Ít lâu sau, ghế Tể tướng về tay người của ngươi.",rf:"Hoàng thượng đặt chén xuống: “Nàng cũng tiến cử Tể tướng sao?”"},
  {n:"Xin Hoàng thượng nghe lời cha",e:["mid","lose"],rt:"Ngài chọn người cha tiến cử, ban cha vinh hiển về quê.",rf:"Ngài thấy cha con một lòng kết bè, chọn người ngoài."},
  {n:"Xin để Hoàng thượng chọn người hiền",e:["mid","lose"],rt:"Hoàng thượng chọn người ngoài, ban cha vinh hiển về quê.",rf:"Người được chọn là kẻ thù của nhà ngươi."},
  {n:"Xin giữ cha ở lại",e:["mid","lose"],rt:"Hoàng thượng giữ cha thêm một năm.",rf:"Hoàng thượng phê: chuẩn cáo lão."}]}},
 E:{win:{tag:"Người cầm quân cờ",w:"dad",t:"Cha về quê vinh hiển. Ghế Tể tướng về tay người của ngươi, và nửa triều nghe theo ngươi. Ván cờ của cha thành ván cờ của ngươi.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha về quê, nhà yên",t:"Cha về quê dưỡng già. Phủ Tể tướng không còn quyền như xưa, nhưng cũng không còn ai nhắm vào. Ngươi tự đi đường mình."},
  lose:{tag:"Phủ Tể tướng sa sút",t:"Ghế Tể tướng về tay nhà đối đầu. Môn sinh của cha tan mỗi người một ngả. Ngươi vẫn là phi tần của Hoàng thượng, nhưng sau lưng không còn ai.",go:(_A,G)=>e67dad(G[0])}}});
RD97L.push(rdRare({a:"tt_co_11",tag:"Cha truyền sổ môn sinh",w:"emp",n:"Xin Hoàng thượng cho cha truyền sổ môn sinh vào tay ngài",
 path:["Đáp: con đi đường con","Làm người đánh cờ","Khuyên cha đốt sổ","Xin cha giao sổ","Tâu thật"],bad:["Mở xem, báo cha","Bỏ bạc lo cho hắn thoát"],x:[()=>S.duc>=RR("tt_co_11").bar,"Đức từ "+RR("tt_co_11").bar],
 t:"Ngươi dâng cuốn sổ môn sinh lên Hoàng thượng. Ngài lật từng trang, rồi trả lại: “Trẫm không cần sổ. Trẫm cần người giữ sổ mà không dùng nó để hại trẫm.” Từ đó cả triều biết: lời ngươi là lời có ngài đứng sau.",go:(_A,G)=>e67dad(G[0]),rw:"nt_dongchau",ti:"Người giữ sổ môn sinh"}));

/* ---------- tt_oan · Phủ Tể tướng mắc oan ---------- */
rdDef("tt_oan",5,{t:"Sau cơn oan",w:"dad",sj:"kẻ làm sổ sách giả",cast(A){return rdCast(A,["v"])},
 g:"Vụ sổ sách giả đã qua một hồi, nhưng kẻ viết sổ vẫn chưa ai bắt. Kẻ đã đặt bẫy một lần sẽ đặt bẫy lần nữa. Tìm ra hắn trước.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cha được minh oan, mà kẻ gian còn đó",w:"dad",if:RDW(1),t:"Cha đã được rửa oan, nhưng tên thư lại viết sổ giả bỗng xin nghỉ về quê rồi biến mất.",o:[
  {n:"Cho người đuổi theo về quê hắn",wx:"bắt được dấu",lx:"đuổi hụt",rt:"Người của ngươi tìm thấy hắn trốn trong một ngôi chùa.",rf:"Hắn đã đi khỏi quê từ trước."},
  {n:"Báo cha tự lo",f:"obey",wx:"cha có người",lx:"cha lo theo cách của cha, người của ngươi mất dấu hắn",rt:"Cha cho gia đinh đi tìm."},
  {n:"Tra sổ ra vào cổng kinh thành",f:"own",wx:"biết hắn đi đâu",lx:"bị nói là xen việc quan",rt:"Hắn ra cửa Bắc, đi về phía một trang trại có chủ.",rf:"Sổ cổng thành bị xé mất một trang."}]},
 s2:{h:"Cha mất chức, kẻ gian thì thăng",w:"dad",if:RDW(0),t:"Cha thoát tội, nhưng quyền không còn như trước. Còn tên thư lại viết sổ giả thì được thăng làm Chủ sự.",o:[
  {n:"Ghi tên hắn, chờ dịp",wx:"không lộ ý",lx:"hắn yên ổn thêm, triều thấy nhà ngươi nuốt nhục",rt:"Ngươi ghi tên hắn vào sổ riêng."},
  {n:"Cho người làm thân với hắn",wx:"lấy được lời",lx:"hắn đề phòng",rt:"Hắn say rượu, nói lỡ một cái tên.",rf:"Hắn nhận quà rồi cười."},
  {n:"Viết thư an ủi cha",wx:"cha bớt buồn",lx:"không tiến thêm, kẻ gian được thăng trước mắt cả triều",rt:"Cha đáp: “Cha còn sống là còn đường.”"}]},
 c1:{h:"Mực của sổ giả",w:"maid",t:"Sổ giả viết bằng loại mực chỉ Hộ bộ và vài phủ lớn dùng. Muốn biết phủ nào mua, phải tra sổ mua của Nội vụ phủ.",o:[
  {n:"Nhờ thái giám Nội vụ phủ tra",wx:"có tên phủ mua mực",lx:"thái giám nói ra ngoài",rt:"Ba phủ mua mực ấy trong năm.",rf:"Thái giám nói sổ bị thất lạc."},
  {n:"Tự xem sổ khi đi ngang",wx:"không ai biết",lx:"bị bắt gặp",rt:"Ngươi đọc nhanh mấy dòng.",rf:"Quản sự Nội vụ phủ bắt gặp ngươi."},
  {n:"Bỏ qua đường mực",wx:"khỏi mạo hiểm",lx:"mất một manh mối, người dò của ngươi ở Nội vụ phủ bỏ đi",rt:"Ngươi để đó."}]},
 c2:{h:"Nhà {v} giàu lên",w:"v",need:["v"],t:"Từ sau vụ oan, nhà {v} được giao giữ kho muối ở Giang Bắc — món béo mà cha ngươi từng giữ.",o:[
  {n:"Dò nhà {v} có dính không",wx:"thấy dấu",lx:"{v} biết bị dò",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Quản sự kho muối từng là người nhà {v}.",rf:"{v} biết ngươi dò nhà nàng."},
  {n:"Làm thân với {v}",wx:"nghe được chuyện nhà nàng",lx:"{v} nghi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} kể chuyện kho muối như khoe.",rf:"{v} lạnh nhạt."},
  {n:"Không nghi oan cho ai",wx:"lòng sạch",lx:"có thể bỏ sót, tai mắt của ngươi thôi theo nhà {v}",rt:"Ngươi không nghĩ thêm."}]},
 t1:{h:"Một lá thư nặc danh",w:"maid",t:"Có kẻ nhét vào cửa cung ngươi một lá thư: “Muốn biết ai viết sổ, hỏi người giữ kho bạc ở ngân khố.”",o:[
  {n:"Tin, cho người hỏi",wx:"đi theo manh mối",lx:"có thể là bẫy",rt:"Người giữ kho bạc tên Triệu, sợ hãi nhưng chịu gặp."},
  {n:"Dò ai gửi thư trước",wx:"biết người tốt hay kẻ gài",lx:"chậm một bước",rt:"Thư từ một thái giám già từng hầu cha.",rf:"Không tìm ra."},
  {n:"Đốt thư",wx:"tránh bẫy",lx:"bỏ một manh mối, kẻ gửi thư thôi tin ngươi",rt:"Lá thư cháy thành tro."}]},
 x1:{h:"Tên thư lại",w:"dad",t:"Người của ngươi đã tìm được tên thư lại viết sổ giả. Hắn chịu khai nếu được bảo đảm sống.",o:[
  {n:"Hứa che chở hắn",e:["win","lose"],rt:"Hắn khai: sổ giả được đặt viết, bạc trả qua một người trong ngân khố.",rf:"Hắn được hứa, nhưng đêm ấy bị kẻ khác bắt đi."},
  {n:"Giao hắn cho cha",wx:"cha có công tra án",e:["mid","lose"],rt:"Cha tra hắn, có được vài lời.",rf:"Cha nóng nảy, hắn chết trong ngục nhà."},
  {n:"Thả hắn đi",e:"mid",lx:"mất nhân chứng, đường dò đứt",rt:"Hắn lạy rồi trốn biệt."}]}},
 E:{win:{tag:"Có lời khai của kẻ viết sổ",w:"dad",t:"Tên thư lại khai ra đường bạc. Kẻ đặt bẫy cha ngươi ở cao hơn ngân khố."},
  mid:{tag:"Manh mối lửng lơ",t:"Ngươi biết có kẻ đứng sau, nhưng chưa nắm được lời nào chắc."},
  lose:{tag:"Nhân chứng mất tích",t:"Tên thư lại biến mất. Kẻ đứng sau biết ngươi đang lần."}}});

rdDef("tt_oan",6,{t:"Nhân chứng ngân khố",w:"dad",sj:"người giữ kho bạc ở ngân khố",cast(A){return rdCast(A,["v"])},
 g:"Người giữ kho bạc họ Triệu ở ngân khố biết ai đã lấy bạc trả cho kẻ viết sổ giả. Hắn sợ chết. Giữ cho hắn sống, và đừng để ai mua được hắn trước ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Triệu chịu gặp",w:"maid",if:RDW(1),t:"Có lời khai của tên thư lại, Triệu biết mình bị lộ. Hắn nhắn: muốn nói, nhưng phải có người che chở vợ con hắn.",o:[
  {n:"Đưa vợ con hắn về trang trại nhà ngươi",wx:"Triệu tin ngươi",lx:"tốn bạc, nhà ngươi gánh thêm rủi ro",rt:"Vợ con Triệu lên xe ngựa trong đêm."},
  {n:"Hứa suông cho yên lòng",wx:"Triệu tạm im, nhà ngươi khỏi gánh rủi ro",lx:"hắn biết ngươi chỉ hứa",rt:"Triệu tạm tin.",rf:"Triệu bảo: lời hứa không che được ai."},
  {n:"Nhờ cha lo",f:"obey",wx:"phủ có người canh",lx:"phủ đang bị dòm, người ta nói nhà Tể tướng giấu nhân chứng",rt:"Cha cho gia đinh canh nhà Triệu."}]},
 s2:{h:"Triệu trốn tránh",w:"maid",if:RDW(0),t:"Manh mối dẫn đến Triệu, nhưng hắn đóng cửa không tiếp ai, nói mình bệnh.",o:[
  {n:"Gửi thái y đến xem bệnh",wx:"có cớ gặp hắn",lx:"lộ ý",rt:"Thái y mang về một lời nhắn của Triệu.",rf:"Triệu đuổi thái y về."},
  {n:"Cho người đứng chờ ngoài ngõ",wx:"biết ai ra vào",lx:"chậm",rt:"Có một người của phủ khác ghé nhà Triệu."},
  {n:"Bỏ, tìm đường khác",wx:"không ép người",lx:"mất nhân chứng tốt nhất, người canh ngõ phải rút",rt:"Ngươi tạm gác."}]},
 c1:{h:"Kẻ mua chuộc",w:"v",need:["v"],t:"Người nhà {v} đến nhà Triệu với một rương bạc. Họ muốn hắn câm.",o:[
  {n:"Trả cao hơn",wx:"Triệu ngả về ngươi",lx:"bạc đổ sông",go:(A,ok,G)=>{rdOan(A,"v",G[0])},rt:"Triệu trả lại rương bạc nhà {v}.",rf:"Triệu nhận cả hai."},
  {n:"Cho Triệu biết bạc ấy là bạc gì",wx:"Triệu sợ bạc bẩn",lx:"hắn càng sợ",rt:"Triệu run tay đẩy rương bạc ra cửa.",rf:"Triệu không tin ai nữa."},
  {n:"Báo Ngự sử bắt quả tang",wx:"{v} mất mặt",lx:"vụ việc vỡ lớn",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Người nhà {v} bị bắt cùng rương bạc.",rf:"Ngự sử đến muộn, rương bạc đã đi."}]},
 c2:{h:"Hạn tra sổ",w:"emp",t:"Bộ Hộ sắp kết sổ năm. Qua kỳ kết sổ thì mọi giấy tờ cũ bị niêm, lời Triệu không còn đối chiếu được.",o:[
  {n:"Gấp rút lấy lời khai",wx:"kịp hạn",lx:"vội thì sơ suất",rt:"Lời khai có kịp đối chiếu với sổ.",rf:"Lời khai thiếu chữ ký."},
  {n:"Xin Hoàng thượng hoãn kết sổ",wx:"có thêm thời gian",lx:"Hoàng thượng nghi ngươi can việc bộ",rt:"Hoàng thượng cho hoãn mười ngày.",rf:"Hoàng thượng từ chối."},
  {n:"Bỏ đối chiếu, chỉ giữ lời khai",wx:"đỡ vội, giữ sức",lx:"lời khai yếu, ra hội thẩm dễ bị bác",rt:"Ngươi chỉ cất lời khai."}]},
 t1:{h:"Triệu kể",w:"maid",t:"Triệu kể: bạc trả kẻ viết sổ được lấy từ kho bạc tiến cống, có lệnh miệng của một người hắn không dám nói tên.",o:[
  {n:"Ép hắn nói tên",wx:"có tên",lx:"Triệu sợ, đổi lời",rt:"Triệu viết một chữ lên tay: họ của một nhà thông gia với nhà {v}.",rf:"Triệu khóc, không nói."},
  {n:"Không ép, chỉ ghi lời",wx:"Triệu tin ngươi",lx:"thiếu một cái tên, đường dò dừng ở Triệu",rt:"Triệu ký vào lời khai."},
  {n:"Đưa hắn ra khỏi kinh",wx:"hắn sống",lx:"xa thì khó gọi làm chứng",rt:"Triệu đi trong đêm."}]},
 x1:{h:"Đêm có kẻ đến",w:"maid",t:"Nửa đêm, có kẻ trèo tường vào nhà Triệu. Người của ngươi ở đó, người của cha cũng ở đó.",o:[
  {n:"Bắt sống kẻ đến",e:["win","lose"],rt:"Kẻ đến bị bắt sống, trong người có thư sai khiến.",rf:"Kẻ đến bị giết trước khi khai. Triệu bị thương."},
  {n:"Đưa Triệu chạy",e:["mid","lose"],rt:"Triệu sống, nhưng kẻ đến chạy thoát.",rf:"Triệu bị thương nặng."},
  {n:"Để người của cha xử",e:["mid","lose"],rt:"Gia đinh của cha đánh đuổi kẻ đến.",rf:"Gia đinh của cha giết kẻ đến, manh mối đứt."}]}},
 E:{win:{tag:"Triệu sống, có thư sai khiến",w:"dad",t:"Triệu sống, và ngươi có thêm bức thư sai khiến của kẻ muốn hắn chết. Mối dây đã dài thêm một đoạn."},
  mid:{tag:"Triệu sống",t:"Nhân chứng còn sống. Kẻ đứng sau biết ngươi đang giữ hắn."},
  lose:{tag:"Nhân chứng bị thương",t:"Triệu bị thương nặng, lời khai của hắn có thể không kịp dùng."}}});

rdDef("tt_oan",7,{t:"Ai được lợi",w:"v",sj:"nhà được lợi từ cái oan của cha",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Lần theo đường bạc, ngươi thấy nhà {v} là kẻ hưởng lợi nhiều nhất khi cha ngươi mắc oan. {v} biết ngươi đã thấy.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{v} ghé thăm",w:"v",if:RDW(1),t:"{v} mang trà ngon đến cung ngươi, nói như vô tình: “Nghe nói muội đang giữ một người họ Triệu.”",o:[
  {n:"Đáp thẳng: phải",wx:"{v} biết ngươi không sợ",lx:"lộ hết bài",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đặt chén xuống, không cười nữa.",rf:"{v} cười: “Gan thật.”"},
  {n:"Giả không hiểu",wx:"{v} không đoán được",lx:"{v} biết ngươi giả",rt:"{v} ra về với nửa câu hỏi.",rf:"{v} nhìn ngươi như nhìn kẻ dối."},
  {n:"Hỏi lại: {tg} nghe từ ai",wx:"biết đường tin của {v}",lx:"{v} cảnh giác, rêu rao ngươi giữ người trái phép",rt:"{v} buột miệng một cái tên thái giám.",rf:"{v} chối."}]},
 s2:{h:"{v} lên cao",w:"v",if:A=>RDW(0)()&&TT_VUP(A),t:"{v} được tấn phong, nhà nàng được ban thưởng. Ai cũng biết phần thưởng ấy là phần của cha ngươi ngày trước.",o:[
  {n:"Đến chúc mừng",wx:"giữ lễ",lx:"nuốt giận",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận lễ, nụ cười rất mỏng."},
  {n:"Không đến",wx:"không cúi",lx:"bị nói là ghen",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi đóng cửa cung."},
  {n:"Dò sổ thưởng của nhà {v}",wx:"thấy dấu",lx:"bị biết, nhà {v} rêu rao ngươi ghen ăn",rt:"Sổ thưởng có một khoản trùng ngày bạc rời kho.",rf:"Sổ thưởng bị khóa."}]},
 s3:{h:"Nhà {v} được ban thưởng",w:"v",if:A=>RDW(0)()&&!TT_VUP(A),t:"Nhà {v} được ban thêm ruộng muối ở Giang Bắc. Ai cũng biết phần ấy là phần của cha ngươi ngày trước, và {v} đi đâu cũng nhắc như vô tình.",o:[
  {n:"Gửi lễ mừng nhà {v}",wx:"giữ lễ, không ai bắt bẻ được",lx:"nuốt giận, tốn bạc mừng kẻ hưởng phần nhà mình",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận lễ, cười rất mỏng: “Muội chu đáo quá.”"},
  {n:"Dò ruộng muối ấy ai trao",wx:"thấy tên người ký giấy trao ruộng",lx:"bị biết, nhà {v} rêu rao ngươi ghen ăn",rt:"Giấy trao ruộng ký đúng ngày bạc rời kho tiến cống.",rf:"Người giữ sổ ruộng đóng cửa không tiếp."},
  {n:"Nói thẳng trước mặt mọi người",wx:"cả cung biết phần ấy của ai",lx:"mang tiếng hẹp lượng; hỏng thì Hoàng thượng nghe ngươi kể lể",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi nói một câu, cả điện im. {v} tái mặt.",rf:"{v} khóc trước Hoàng thượng rằng ngươi ganh ghét."}]},
 c1:{h:"Thư sai khiến",w:"maid",t:"Bức thư sai khiến kẻ giết Triệu viết bằng chữ của một môn khách nhà {v}.",o:[
  {n:"Đối chiếu nét chữ",wx:"chứng cứ chắc",lx:"đối chiếu sai",rt:"Nét chữ khớp.",rf:"Nét chữ không chắc."},
  {n:"Giữ thư, chưa dùng",wx:"cầm bài",lx:"chưa dùng thư, nhà {v} có thời gian xóa dấu vết",rt:"Ngươi cất thư."},
  {n:"Gửi thư cho cha",f:"obey",wx:"cha có cớ",lx:"cha nóng nảy làm ầm, Hoàng thượng phiền lòng",rt:"Cha đọc thư, đập bàn."}]},
 c2:{h:"Mối thù thật",w:"v",need:["v","hh"],t:"Hậu cung bắt đầu thấy hai cung ngươi và {v} không nhìn mặt nhau. Hoàng hậu gọi cả hai đến.",o:[
  {n:"Nói rõ trước Hoàng hậu",wx:"Hoàng hậu biết lẽ phải",lx:"Hoàng hậu ghét chuyện ầm ĩ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng hậu nghe, rồi bảo {v}: “Nhà ngươi nên cẩn thận.”",rf:"Hoàng hậu quở cả hai làm rối hậu cung."},
  {n:"Giữ hòa khí trước mặt",wx:"Hoàng hậu yên tâm",lx:"{v} cho là ngươi yếu, khắp cung nói thế",rt:"Hai người cùng cúi đầu."},
  {n:"Kể khổ, không nêu tên",wx:"Hoàng hậu thương",lx:"chẳng được gì",rt:"Hoàng hậu thưởng ngươi một hộp yến.",rf:"Hoàng hậu cho là ngươi than vãn."}]},
 t1:{h:"{v} đề nghị",w:"v",t:"{v} gặp riêng ngươi: “Nhà ta trả lại kho muối, nhà ngươi thôi truy. Hai bên coi như không có gì.”",o:[
  {n:"Nhận",wx:"cha có lại một phần",lx:"kẻ đứng sau thoát; nhận đền là bán cái oan của cha",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Nhà {v} trả lại kho muối Giang Bắc."},
  {n:"Từ chối",wx:"đi đến cùng",lx:"đi đến cùng thì Sức −, oán ++",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đứng dậy: “Vậy thì đi đến cùng.”"},
  {n:"Đòi thêm: nói ra kẻ đứng trên",wx:"có tên kẻ đứng trên",lx:"{v} giận",rt:"{v} cắn môi, nói một cái tên.",rf:"{v} bỏ đi."}]},
 x1:{h:"Trình lên",w:"emp",t:"Ngươi có thư sai khiến, lời khai Triệu, sổ thưởng nhà {v}. Trình ngay, hay chờ thêm.",o:[
  {n:"Trình lên Hoàng thượng",e:["win","lose"],rt:"Hoàng thượng đọc, sai Đại Lý tự tra nhà {v}.",rf:"Hoàng thượng thấy chứng cứ chưa đủ, trách ngươi gây rối."},
  {n:"Đưa cho cha trình ở triều",wx:"nhà ngươi lên tiếng",e:["mid","lose"],rt:"Cha trình, triều xôn xao.",rf:"Triều cho là cha trả thù riêng."},
  {n:"Giữ lại, chờ dịp lớn hơn",e:"mid",lx:"chưa ai bị xử, nhà {v} có thời gian xóa dấu vết",rt:"Ngươi cất tất cả vào hộp."}]}},
 E:{win:{tag:"Nhà {v} bị tra",w:"emp",t:"Đại Lý tự tra nhà {v}. Cả hậu cung biết mối thù hai nhà từ nay là thật.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Thù giữ trong lòng",t:"Hai nhà không ai động, nhưng ai cũng biết.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  lose:{tag:"Bị cho là gây rối",t:"Chứng cứ chưa đủ. Hoàng thượng trách ngươi gây chuyện, nhà {v} lên tiếng thương xót giả.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("tt_oan",8,{t:"Cha vào ngục",w:"dad",sj:"cái án thứ hai của cha",cast(A){return rdCast(A,["v"])},
 g:"Một tờ sớ mới tố {dad} cướp ruộng dân ở quê. Lần này ông bị giải vào ngục Hình bộ. Giữ cho cha sống và cho nhà đứng vững cho đến ngày xử.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin dữ",w:"dad",if:RDW(1),t:"Nhà {v} bị tra chưa xong thì cha ngươi bị tố. Ai cũng hiểu đây là đòn trả.",o:[
  {n:"Xin Hoàng thượng xét kỹ",wx:"án được xét chậm lại",lx:"Hoàng thượng thấy ngươi cầu xin quá nhiều",rt:"Hoàng thượng dặn Hình bộ không được dùng hình.",rf:"Hoàng thượng không đáp."},
  {n:"Gửi người về quê dò ruộng",wx:"biết thật giả",lx:"người đi không về",rt:"Ruộng ấy cha mua có văn tự, người bán còn sống.",rf:"Người đi gặp nạn trên đường."},
  {n:"Bình tĩnh chờ",wx:"không nóng vội",lx:"cha một mình trong ngục, triều thấy con gái không lên tiếng",rt:"Ngươi chép kinh cầu cho cha."}]},
 s2:{h:"Lại bị tố",w:"dad",if:RDW(0),t:"Cha vừa thoát một vụ thì lại vướng vụ mới. Người trong cung bắt đầu tránh mặt ngươi.",o:[
  {n:"Vẫn đi thỉnh an như thường",wx:"giữ thể diện",lx:"chịu những ánh mắt, ngày nào cũng mệt",rt:"Ngươi ngẩng đầu đi qua hành lang."},
  {n:"Cáo bệnh ở yên trong cung",wx:"tránh lời ra tiếng vào",lx:"bị quên dần, Hoàng thượng thôi ghé",rt:"Ngươi đóng cửa."},
  {n:"Tìm người còn dám đứng cạnh ngươi",wx:"có người cạnh",lx:"tốn mà không ai đến",rt:"Một phi tần nhỏ nhận lời đi cùng ngươi.",rf:"Không ai đến."}]},
 c1:{h:"Bạc cho ngục",w:"maid",t:"Ngục Hình bộ lạnh, cơm thiu. Muốn cha có chăn ấm, có thuốc, phải có bạc cho cai ngục mỗi tháng.",o:[
  {n:"Gửi bạc đều tháng",wx:"cha khỏe",lx:"bạc cạn dần",rt:"Cha có chăn bông, có thuốc."},
  {n:"Xin thái y vào ngục",wx:"cha có người chữa",lx:"phạm lệ",rt:"Thái y vào ngục ba ngày một lần.",rf:"Hình bộ không cho."},
  {n:"Để nhà lo",wx:"giữ bạc",lx:"nhà đang khốn, mẹ bán trâm, người ta nói con gái giữ bạc",rt:"Mẹ ngươi bán trâm để lo."}]},
 c2:{h:"{v} rải tin",w:"v",need:["v"],t:"Người của {v} rải tin trong cung: con gái kẻ cướp ruộng dân không xứng hầu Hoàng thượng.",o:[
  {n:"Bắt kẻ rải tin",wx:"tin dừng",lx:"ầm ĩ thêm",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Kẻ rải tin bị phạt.",rf:"Kẻ rải tin chối."},
  {n:"Im lặng",wx:"không ăn miếng trả miếng",lx:"tin cứ lan",rt:"Ngươi không đáp."},
  {n:"Rải tin ngược về nhà {v}",wx:"{v} cũng mang tiếng",lx:"bị lần ra",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Tin về kho muối Giang Bắc lan khắp cung.",rf:"Người ta lần ra tin từ cung ngươi."}]},
 t1:{h:"Người bán ruộng",w:"dad",t:"Người bán ruộng cho cha còn sống, nhưng đã bị ai đó đưa đi giấu ở một trang trại khác.",o:[
  {n:"Cho người tìm",wx:"có nhân chứng",lx:"tìm hụt",rt:"Người bán ruộng được tìm thấy, còn giữ văn tự.",rf:"Trang trại trống không."},
  {n:"Nhờ Ngự sử thanh liêm hỏi giúp",wx:"có người ngoài làm chứng",lx:"Ngự sử không nhận",rt:"Ngự sử nhận lời, tự đi xem.",rf:"Ngự sử từ chối."},
  {n:"Bỏ qua",wx:"Bạc +, Sức +",lx:"thiếu chứng, người bán ruộng rơi vào tay kẻ khác",rt:"Ngươi để đó."}]},
 x1:{h:"Ngày giải thẩm",w:"emp",t:"Hình bộ định ngày giải thẩm. Ngươi chỉ còn kịp làm một việc trước ngày ấy.",o:[
  {n:"Đưa văn tự và nhân chứng đến Hình bộ",e:["win","lose"],rt:"Hình bộ nhận văn tự, cha được chuyển sang giam lỏng ở nhà.",rf:"Văn tự bị nói là giả."},
  {n:"Xin Hoàng thượng ân xá",e:["mid","lose"],rt:"Hoàng thượng cho cha tạm về nhà chờ xử.",rf:"Hoàng thượng nói: “Có tội thì xử, không tội thì tha. Trẫm không ân xá trước khi xử.”"},
  {n:"Chờ ngày giải thẩm",e:"mid",lx:"cha còn trong ngục, triều thấy con gái đứng ngoài",rt:"Ngươi chờ."}]}},
 E:{win:{tag:"Cha về nhà chờ xử",w:"dad",t:"Cha được về nhà giam lỏng. Có văn tự, có người làm chứng. Ngày xử sẽ khác.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha còn trong ngục",t:"Cha vẫn trong ngục, nhưng sống và khỏe. Ngày giải thẩm sắp đến."},
  lose:{tag:"Cha ốm trong ngục",t:"Cha ốm nặng trong ngục. Nhà ngươi bán ruộng để lo thuốc.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_oan",9,{t:"Tam ty hội thẩm",w:"emp",sj:"phiên hội thẩm án của cha",cast(A){return rdCast(A,["v"])},
 g:"Án của {dad} được giao ba nha môn cùng xét: Hình bộ, Ngự sử đài, Đại Lý tự. Phi tần không được bước vào công đường. Mọi chứng cứ phải đi qua tay người khác.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Người mang chứng cứ",w:"emp",if:RDW(1),t:"Ngươi cần một người ngoài cung mang chứng cứ đến hội thẩm. Người ấy phải sạch, và phải gan.",o:[
  {n:"Nhờ một Ngự sử ngoài hội thẩm",wx:"chứng cứ có người đứng tên",lx:"Ngự sử bị dọa",rt:"Ngự sử nhận lời.",rf:"Ngự sử xin rút."},
  {n:"Nhờ huynh trưởng",wx:"người nhà, không lo bị mua",lx:"chứng cứ do người nhà mang thì bị nói là thiên vị",rt:"Huynh trưởng nhận việc."},
  {n:"Gửi qua Thái hậu",need:["th"],wx:"Thái hậu đứng sau",lx:"Thái hậu không muốn dính",rt:"Thái hậu sai người đưa đi.",rf:"Thái hậu từ chối."}]},
 s2:{h:"Không ai dám",w:"emp",if:RDW(0),t:"Ngươi tìm mãi không ra người chịu mang chứng cứ đến công đường. Ai cũng sợ nhà {v}.",o:[
  {n:"Nhờ thái giám giữ ấn đưa vào",wx:"có đường đi",lx:"phạm lệ cung",rt:"Chứng cứ đến tay Hình bộ.",rf:"Thái giám bị bắt."},
  {n:"Viết tấu dâng thẳng",wx:"Hoàng thượng đọc",lx:"phi tần dâng tấu án quan",rt:"Hoàng thượng chuyển tấu xuống hội thẩm.",rf:"Tấu bị trả về."},
  {n:"Chờ",wx:"không phạm lệ",lx:"hội thẩm không có chứng của ngươi",rt:"Ngươi chờ."}]},
 c1:{h:"Một quan hội thẩm",w:"v",need:["v"],t:"Một trong ba quan hội thẩm là thông gia nhà {v}.",o:[
  {n:"Xin quan ấy hồi tị",wx:"hội thẩm công bằng hơn",lx:"phi tần bàn việc quan",rt:"Hoàng thượng chuẩn cho quan ấy hồi tị, đổi người khác.",rf:"Hoàng thượng phẩy tay: “Việc quan, nàng chớ bàn.”"},
  {n:"Tìm điểm yếu của hắn",wx:"hắn phải dè chừng",lx:"bị lộ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hắn có một khoản nợ cờ bạc.",rf:"Hắn sạch."},
  {n:"Để vậy",wx:"không động",lx:"một quan hội thẩm nghiêng về nhà {v}",rt:"Ngươi không làm gì."}]},
 c2:{h:"Nhân chứng run sợ",w:"maid",t:"Triệu và người bán ruộng nhận được thư dọa: ai nói thì nhà người ấy cháy.",o:[
  {n:"Cho người canh nhà họ",wx:"họ dám nói",lx:"tốn bạc",rt:"Nhà hai nhân chứng có người canh ngày đêm."},
  {n:"Hứa đền gấp đôi nếu có chuyện",wx:"họ yên lòng",lx:"hứa suông",rt:"Họ gật đầu.",rf:"Một người rút lời khai."},
  {n:"Đưa họ vào kinh ở gần",wx:"dễ giữ",lx:"dễ bị nhìn thấy",rt:"Hai nhân chứng ở trọ gần Hình bộ."}]},
 t1:{h:"Phiên hội thẩm thứ nhất",w:"emp",t:"Phiên đầu, quan hội thẩm hỏi về văn tự ruộng. Phía bên kia đưa ra một văn tự khác, ngày sớm hơn.",o:[
  {n:"Tìm người nhận ra văn tự giả",wx:"vạch được giả",lx:"không ai nhận",rt:"Một lão thầy đồ nhận ra mực của văn tự kia còn mới.",rf:"Không ai dám nói."},
  {n:"Để quan tự xét",wx:"không can thiệp",lx:"văn tự giả đứng ngang văn tự thật",rt:"Quan hội thẩm hoãn phiên."},
  {n:"Hỏi Triệu có biết ai làm",wx:"có manh mối",lx:"Triệu không biết, lại sợ, đóng cửa không gặp ai",rt:"Triệu biết: cùng người viết sổ giả năm trước.",rf:"Triệu lắc đầu."}]},
 x1:{h:"Phiên cuối",w:"emp",t:"Phiên cuối của hội thẩm. Ba quan chưa đồng ý với nhau. Một lời từ Hoàng thượng có thể nghiêng tất cả.",o:[
  {n:"Xin Hoàng thượng ban dụ cho hội thẩm xét kỹ",e:["win","lose"],rt:"Hoàng thượng ban khẩu dụ: xét cho công bằng. Không ai dám bẻ cong khi dụ của vua còn đó.",rf:"Hoàng thượng không ban dụ, còn nói phi tần không nên bàn án."},
  {n:"Tin vào chứng cứ",lx:"tai mắt canh nhân chứng đến phiên cuối, lộ dần",e:["win","mid"],rt:"Chứng cứ đủ, hai trong ba quan nghiêng về phía cha.",rf:"Hai quan tranh cãi, án treo lại."},
  {n:"Lặng lẽ dàn xếp với nhà {v}",e:["mid","lose"],rt:"Nhà {v} rút một nhân chứng, án nhẹ đi.",rf:"Nhà {v} nhận bạc rồi vẫn đẩy án."}]}},
 E:{win:{tag:"Hội thẩm nghiêng về cha",w:"emp",t:"Hội thẩm thấy văn tự kia là giả. Chỉ còn chờ phán."},
  mid:{tag:"Án treo",t:"Ba quan không đồng ý. Án treo lại, chờ Hoàng thượng phán."},
  lose:{tag:"Hội thẩm nghiêng về bên kia",t:"Hai trong ba quan nghiêng về bên tố. Cha ngươi khó thoát.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_oan",10,{t:"Ngày phán án",w:"emp",sj:"bản án của cha",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng sẽ phán án của {dad}. Những gì ngươi đã gom, đã giữ, đã mất, đều được đặt lên cân trong một ngày.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đêm trước ngày phán",w:"emp",if:RDW(1),t:"Hoàng thượng ở lại cung ngươi đêm trước ngày phán, nhưng ngài không nói một lời về án.",o:[
  {n:"Cũng không nhắc đến án",wx:"ngài thấy ngươi biết phận",lx:"không nói thêm được gì cho cha, nhà trách ngươi",rt:"Hai người chỉ đánh cờ đến khuya."},
  {n:"Khẽ xin ngài công bằng",wx:"ngài nghe",lx:"ngài thấy ngươi cầu",rt:"Ngài chỉ nói: “Trẫm biết.”",rf:"Ngài đứng dậy về điện."},
  {n:"Đánh đàn cho ngài nghe",wx:"ngài Lòng +",lx:"tiếng đàn buồn, ngài: Lòng −",rt:"Tiếng đàn làm ngài thiếp đi.",rf:"Tiếng đàn buồn quá, ngài thở dài."}]},
 s2:{h:"Ngày phán đến gần",w:"emp",if:RDW(0),t:"Hoàng thượng không gọi ngươi. Người ta nói ngài đã có ý.",o:[
  {n:"Xin gặp",wx:"được gặp",lx:"bị từ chối",rt:"Ngài cho vào, nghe ngươi nói hết.",rf:"Cửa điện đóng."},
  {n:"Gửi một bài thơ",wx:"ngài đọc",lx:"thơ nằm chưa mở, cung nhân cười ngươi níu kéo",rt:"Ngài đọc bài thơ ba lần.",rf:"Thơ nằm trên án, chưa mở."},
  {n:"Chờ",wx:"lặng lẽ",lx:"ngài quyết mà không nghe ngươi một lời",rt:"Ngươi chờ."}]},
 c1:{h:"Lời cuối của nhà {v}",w:"v",need:["v"],t:"Nhà {v} dâng một tờ sớ cuối, xin xử nặng để làm gương.",o:[
  {n:"Đáp bằng tờ sớ của Ngự sử thanh liêm",wx:"hai bên cân nhau",lx:"Ngự sử không chịu",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Tờ sớ của Ngự sử đến kịp.",rf:"Ngự sử từ chối."},
  {n:"Gặp {v} lần cuối",wx:"có thể hòa",lx:"{v} cười",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nói: “Ta không muốn cha ngươi chết.”",rf:"{v} cười nhạt."},
  {n:"Mặc",wx:"không động",lx:"sớ nhà {v} một mình nói, triều nghe một phía",rt:"Ngươi không làm gì."}]},
 c2:{h:"Mẹ ngươi xin vào cung",w:"dad",t:"Mẹ ngươi xin vào thỉnh an, muốn quỳ trước Hoàng thượng xin cho chồng.",o:[
  {n:"Đưa mẹ đến gặp Thái hậu",need:["th"],wx:"Thái hậu thương",lx:"phạm lệ",rt:"Thái hậu nắm tay mẹ ngươi.",rf:"Thái hậu không gặp."},
  {n:"Khuyên mẹ về",wx:"giữ thể diện",lx:"mẹ khóc mà về, người ta nói ngươi lạnh với nhà",rt:"Mẹ ngươi khóc mà về."},
  {n:"Để mẹ quỳ",wx:"Hoàng thượng động lòng",lx:"bị coi là ép vua",rt:"Hoàng thượng đỡ mẹ ngươi dậy.",rf:"Hoàng thượng cho người đưa mẹ ngươi về."}]},
 t1:{h:"Một chứng cứ muộn",w:"maid",t:"Sáng ngày phán, Triệu gửi đến một mảnh giấy: lệnh lấy bạc năm xưa có dấu ấn của người đứng trên nhà {v}.",o:[
  {n:"Trình ngay",wx:"chứng cứ cuối đến kịp",lx:"đến muộn bị cho là giả",rt:"Mảnh giấy đến án vua trước giờ phán.",rf:"Mảnh giấy bị chặn ở cửa."},
  {n:"Giữ lại cho sau",wx:"cầm lá bài lớn",lx:"án hôm nay thiếu nó, cha chịu xử nặng hơn",rt:"Ngươi cất mảnh giấy."},
  {n:"Đốt",wx:"không lôi kẻ lớn vào",lx:"mất bằng chứng, Triệu thôi tin ngươi",rt:"Mảnh giấy cháy."}]},
 x1:{h:"Phán",w:"emp",t:"Sáng nay Hoàng thượng phê án của cha ở triều. Ngươi ở trong cung, chỉ còn chờ tin.",o:[
  {n:"Ở cung chờ tin",e:["win","lose"],rt:"Hoàng thượng phán: cha ngươi vô tội, kẻ làm văn tự giả bị xử.",rf:"Hoàng thượng phán: cha ngươi có lỗi không xét kỹ ruộng, cách chức."},
  {n:"Gửi lời xin xử nhẹ",e:["mid","lose"],rt:"Cha bị phạt nhẹ, giữ chức.",rf:"Lời xin bị bỏ qua."},
  {n:"Không làm gì nữa",e:["mid","lose"],rt:"Án xử theo chứng cứ: cha giữ mạng, mất quyền.",rf:"Án xử nặng."}]}},
 E:{win:{tag:"Cha vô tội",w:"emp",t:"Cha vô tội. Kẻ làm giả bị xử. Nhà {v} không bị gọi tên, nhưng ai cũng hiểu.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha giữ mạng, mất quyền",t:"Cha về quê, giữ được mạng và tên. Phủ Tể tướng chỉ còn là một cái tên.",go:(_A,G)=>e67dad(G[0])},
  lose:{tag:"Cha bị cách chức",t:"Cha bị cách chức, đày đi biên. Ngươi vẫn giữ phẩm, nhưng sau lưng không còn nhà.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_oan",11,{t:"Rửa sạch tiếng nhà",w:"dad",sj:"tiếng tăm của phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Án đã phán, nhưng tiếng nhà ngươi vẫn chưa sạch. Kẻ đứng trên nhà {v} vẫn chưa bị gọi tên. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cha về triều",w:"dad",if:RDW(1),t:"Cha được trả chức. Triều thần đến chúc mừng, nhưng nụ cười ai cũng dè dặt.",o:[
  {n:"Khuyên cha khoan dung với kẻ đã hại",wx:"triều yên",lx:"kẻ hại nhởn nhơ, triều cho nhà ngươi yếu",rt:"Cha nghe ngươi, không truy thêm."},
  {n:"Khuyên cha truy đến cùng",wx:"kẻ đứng trên phải lo",lx:"triều sợ phủ ngươi",rt:"Cha gật đầu: “Đến cùng.”",rf:"Cha nói: “Cha mệt rồi.”"},
  {n:"Không bàn việc triều với cha",wx:"Hoàng thượng yên tâm",lx:"cha tự quyết, phủ không còn nghe ngươi",rt:"Ngươi chỉ hỏi han sức khỏe."}]},
 s2:{h:"Nhà sa sút",w:"dad",if:RDW(0),t:"Nhà ngươi sa sút. Người hầu bỏ đi, họ hàng tránh mặt. Mẹ ngươi viết: “Con giữ mình.”",o:[
  {n:"Gửi bạc nuôi nhà",wx:"nhà còn đứng",lx:"bạc của ngươi cạn",rt:"Nhà ngươi giữ được cổng."},
  {n:"Xin Hoàng thượng chút ân",wx:"nhà được ban thưởng nhỏ",lx:"bị coi là xin xỏ",rt:"Hoàng thượng ban cho mẹ ngươi bổng lộc hàng năm.",rf:"Hoàng thượng làm ngơ."},
  {n:"Tự lo thân",wx:"vững bản thân",lx:"nhà trách, cả cung nói ngươi bỏ cha mẹ lúc sa cơ",rt:"Ngươi không đáp thư mẹ."}]},
 c1:{h:"Kẻ đứng trên",w:"v",need:["v"],t:"Mảnh giấy có dấu ấn vẫn còn đó. Người có dấu ấn ấy là một Thân vương, chú của Hoàng thượng.",o:[
  {n:"Đưa mảnh giấy cho Hoàng thượng",wx:"kẻ đứng trên phải trả lời",lx:"đụng đến hoàng thân",rt:"Hoàng thượng đọc, im lặng, rồi cất vào tay áo.",rf:"Hoàng thượng nói: “Nàng có biết đây là ai không?”"},
  {n:"Gặp {v}, nói ngươi biết",wx:"{v} sợ",lx:"{v} báo cho Thân vương",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt.",rf:"{v} đi báo ngay."},
  {n:"Giữ kín cả đời",wx:"an toàn",lx:"kẻ đứng trên không bị gì, tiếng nhà vẫn còn vết",rt:"Ngươi cất mảnh giấy vào đáy rương."}]},
 c2:{h:"Người cũ của cha",w:"dad",t:"Những môn sinh từng bỏ cha giờ xin quay lại.",om3:"011",o:[
  {n:"Khuyên cha nhận lại",wx:"phủ đông người",lx:"người hai lòng vào phủ, tin nhà lại lọt",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Phủ đông khách trở lại."},
  {n:"Khuyên cha chỉ nhận người ở lại lúc khó",wx:"phủ trong sạch",lx:"ít người, phủ không còn đông thế",rt:"Cha chọn bốn người."}]},
 t1:{h:"Tờ chiếu",w:"emp",t:"Hoàng thượng cho soạn một tờ chiếu nói về vụ án. Lời lẽ trong chiếu có thể rửa sạch, hoặc chỉ khép lại.",o:[
  {n:"Xin chiếu nói rõ cha bị oan",wx:"tiếng nhà sạch",lx:"Hoàng thượng không muốn làm lớn",rt:"Chiếu nói rõ: Tể tướng bị vu.",rf:"Chiếu chỉ nói: án đã xong."},
  {n:"Để chiếu khép lại êm",wx:"triều yên",lx:"tiếng nhà chưa sạch",rt:"Chiếu khép lại êm."},
  {n:"Xin chiếu ban thưởng nhân chứng",wx:"Triệu được thưởng",lx:"Hoàng thượng thấy ngươi xin nhiều quá",rt:"Triệu được thăng một bậc.",rf:"Hoàng thượng không nhắc đến Triệu."}]},
 x1:{h:"Kết",w:"dad",t:"Mọi việc đi đến cuối. Cha gọi ngươi về nhà một lần, ngồi bên giếng cũ.",o:[
  {n:"Nói với cha: nhà ta sạch rồi",lx:"khép chuyện, kẻ đứng trên thôi bị truy",e:["win","mid"],rt:"Cha cười, lần đầu tiên sau bao năm.",rf:"Cha chỉ thở dài: “Sạch thì sạch, nhà đã khác rồi.”"},
  {n:"Xin cha từ quan về quê",wx:"nhà yên ổn",e:["mid","lose"],rt:"Cha gật đầu. Nhà ngươi về quê yên ổn.",rf:"Cha giận: “Con cũng muốn cha thua sao?”"},
  {n:"Hỏi cha có hối hận không",e:["win","lose"],rt:"Cha nói: “Không. Vì cha có con.”",rf:"Cha quay mặt đi."}]}},
 E:{win:{tag:"Tiếng nhà trong sạch",w:"dad",t:"Phủ Tể tướng đứng lại, sạch hơn trước. Cả triều nhớ: con gái Tể tướng đã giữ nhà bằng chứng cứ, không bằng bạc.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Nhà yên, quyền mất",t:"Nhà ngươi yên ổn nhưng không còn quyền như xưa. Ngươi tự đi đường mình trong cung."},
  lose:{tag:"Nhà tan",t:"Cha mang tiếng đến cuối đời. Nhà ngươi tan mỗi người một ngả. Ngươi vẫn là phi tần, nhưng sau lưng không còn ai.",go:(_A,G)=>e67dad(G[0])}}});
RD97L.push(rdRare({a:"tt_oan_11",tag:"Ngự bút đề biển Thanh liêm",w:"emp",n:"Xin Hoàng thượng ban cho phủ một tấm biển",
 path:["Đưa vợ con hắn","Không ép, chỉ ghi lời","Trình lên Hoàng thượng","Đưa văn tự và nhân chứng","Xin chiếu nói rõ","Xin chiếu ban thưởng"],bad:["Biếu Ngự sử","Lặng lẽ dàn xếp","Rải tin ngược"],x:[()=>S.duc>=RR("tt_oan_11").bar,"Đức từ "+RR("tt_oan_11").bar],
 t:"Hoàng thượng tự tay viết bốn chữ “Thanh liêm chính trực”, sai treo trước cổng phủ Tể tướng. Kẻ từng vu cha ngươi phải đi qua tấm biển ấy mỗi ngày lên triều.",go:(_A,G)=>e67dad(G[0]),rw:"nt_haiduong",ti:"Con gái nhà thanh liêm"}));

/* ---------- tt_tranh · Phủ Tể tướng chia đôi ---------- */
rdDef("tt_tranh",5,{t:"Người huynh trưởng chọn",w:"dad",sj:"vì sao huynh trưởng ngả về phía {v}",cast(A){return rdCast(A,["v"])},
 g:"Huynh trưởng của ngươi đứng sau {v} không phải vô cớ. Tìm ra món nợ, lời hứa hay mối hôn sự đã buộc huynh vào phe ấy.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Huynh trưởng đến thỉnh an",w:"dad",if:RDW(1),t:"Cả họ đã một lòng, nhưng huynh trưởng vẫn lui tới cung {v}. Hắn nói chỉ là giữ lễ.",o:[
  {n:"Hỏi thẳng huynh",wx:"huynh nói thật",lx:"huynh giận",rt:"Huynh thở dài: nhà vợ huynh nợ nhà {v} một ân lớn.",rf:"Huynh bảo: “Muội đừng tra hỏi ta.”"},
  {n:"Cho người theo huynh",wx:"biết huynh gặp ai",lx:"huynh phát hiện",rt:"Huynh gặp phụ thân {v} ở một quán trà.",rf:"Huynh bắt được người theo dõi."},
  {n:"Tin huynh",wx:"giữ tình huynh muội",lx:"có thể bị lừa, không ai theo dõi huynh nữa",rt:"Ngươi không hỏi thêm."}]},
 s2:{h:"Huynh trưởng tránh mặt",w:"dad",if:RDW(0),t:"Huynh trưởng không vào thỉnh an ngươi nữa. Mỗi lần vào cung, hắn đi thẳng đến cung {v}.",o:[
  {n:"Viết thư cho chị dâu",wx:"nghe chuyện từ phía khác",lx:"chị dâu kể với huynh",rt:"Chị dâu viết: nhà mẹ đẻ nàng mắc nợ nhà {v}.",rf:"Chị dâu không hồi âm."},
  {n:"Đến cung {v} cùng lúc huynh đến",wx:"cho huynh thấy ngươi không sợ",lx:"thành cảnh khó coi",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Huynh đỏ mặt cúi chào ngươi trước.",rf:"{v} mời trà, ngươi uống trong im lặng."},
  {n:"Để mặc",wx:"không ép",lx:"huynh xa thêm, cả cung thấy huynh đứng ở cung {v}",rt:"Ngươi để huynh đi đường huynh."}]},
 c1:{h:"Món nợ của nhà chị dâu",w:"maid",t:"Nhà mẹ chị dâu từng được nhà {v} cứu khỏi một vụ án. Ơn ấy buộc huynh trưởng.",o:[
  {n:"Trả ơn thay huynh",wx:"huynh không còn nợ",lx:"nhà {v} không nhận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Nhà {v} nhận lễ trả ơn. Món nợ khép lại.",rf:"Nhà {v} trả lại lễ: “Ơn không bán.”"},
  {n:"Tìm ra vụ án ấy có thật không",wx:"biết ơn thật hay giả",lx:"bị biết",rt:"Vụ án do chính nhà {v} dựng lên rồi tự gỡ.",rf:"Hồ sơ đã bị đốt."},
  {n:"Để huynh tự trả",wx:"không dính",lx:"huynh vẫn bị buộc vào nhà {v}",rt:"Ngươi không động."}]},
 c2:{h:"{v} giữ huynh",w:"v",need:["v"],if:A=>TT_VKID(A),t:"{v} hứa với huynh trưởng: nếu con nàng sau này được trọng, huynh sẽ là thầy dạy.",o:[
  {n:"Hứa với huynh một điều lớn hơn",wx:"huynh nghiêng về ngươi",lx:"lời hứa nặng",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Huynh im lặng rất lâu, rồi gật đầu.",rf:"Huynh không tin."},
  {n:"Cho huynh thấy lời hứa của {v} rỗng",wx:"huynh tỉnh",lx:"huynh cho là ngươi ghen",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Huynh biết {v} cũng hứa điều ấy với hai người khác.",rf:"Huynh giận ngươi."},
  {n:"Không tranh",wx:"giữ tình",lx:"huynh ở lại phe {v}",rt:"Ngươi để vậy."}]},
 c3:{h:"{v} hứa với huynh",w:"v",need:["v"],if:A=>!TT_VKID(A),t:"{v} hứa với huynh trưởng: nếu nàng được trọng, huynh sẽ có một ghế ở Hàn lâm viện, không phải nhờ cha.",o:[
  {n:"Hứa với huynh một điều lớn hơn",wx:"huynh nghiêng về ngươi",lx:"lời hứa nặng; hỏng thì huynh kể khắp nơi ngươi hứa suông",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Huynh im lặng rất lâu, rồi gật đầu.",rf:"Huynh không tin."},
  {n:"Cho huynh thấy ghế ấy {v} không trao nổi",wx:"huynh tỉnh",lx:"huynh cho là ngươi ghen, kể với cả họ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Huynh biết Hàn lâm viện không nghe lời một phi tần.",rf:"Huynh giận ngươi."},
  {n:"Không tranh",wx:"giữ tình",lx:"huynh ở lại phe {v}",rt:"Ngươi để vậy."}]},
 t1:{h:"Cha hỏi ý ngươi",w:"dad",t:"{dad} viết: “Huynh con đi sai đường. Con bảo cha nên làm gì với nó.”",o:[
  {n:"Xin cha khoan dung",wx:"nhà còn giữ được",lx:"huynh không đổi ngay, phủ vẫn chia hai",rt:"Cha gật đầu."},
  {n:"Xin cha răn huynh",wx:"huynh biết sợ",lx:"huynh oán, bỏ ra ở riêng, cả họ bàn tán",rt:"Cha gọi huynh về, nói chuyện suốt đêm.",rf:"Huynh bỏ nhà ra ở riêng."},
  {n:"Đáp: để con lo",wx:"việc trong tay ngươi",lx:"gánh thêm",rt:"Cha để ngươi lo."}]},
 x1:{h:"Huynh muội gặp nhau",w:"dad",t:"Huynh trưởng xin gặp ngươi ở Ngự hoa viên. Lần này hắn nói thật hết.",o:[
  {n:"Kéo huynh về phía mình",e:["win","lose"],rt:"Huynh nắm tay ngươi: “Từ nay huynh theo muội.”",rf:"Huynh nói: “Ta đã hứa với người ta rồi.”"},
  {n:"Để huynh giữ lời hứa, chỉ xin huynh đừng hại ngươi",e:["mid","lose"],rt:"Huynh hứa không hại ngươi.",rf:"Huynh không hứa gì."},
  {n:"Cắt đứt",e:"lose",lx:"mất huynh",rt:"Ngươi quay đi trước."}]}},
 E:{win:{tag:"Huynh trưởng quay về",w:"dad",t:"Huynh trưởng thôi đứng sau {v}. Nhà ngươi một lòng.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Huynh đứng giữa",t:"Huynh không hại ngươi, nhưng cũng không giúp. Phủ vẫn chia đôi."},
  lose:{tag:"Huynh vẫn theo {v}",t:"Huynh vẫn đứng sau {v}. Phủ Tể tướng hai phe, mỗi phe một người con.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_tranh",6,{t:"Phủ chia hai",w:"dad",sj:"người trong phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Quản gia, gia nhân, môn khách của phủ đang chọn phe giữa ngươi và huynh trưởng. Ai giữ được người, người ấy giữ được phủ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Quản gia già",w:"dad",if:RDW(1),t:"Lão quản gia hầu phủ ba mươi năm gửi thư: “Tiểu thư cần gì, lão có.”",o:[
  {n:"Nhờ lão giữ sổ phủ",wx:"nắm sổ phủ",lx:"lão già yếu, ngươi phải tự đỡ việc sổ",rt:"Lão quản gia nhận lời."},
  {n:"Gửi quà tạ lão",wx:"lão trung thành",lx:"tốn bạc",rt:"Lão khóc khi nhận quà."},
  {n:"Bảo lão đứng ngoài",wx:"không kéo lão vào",lx:"mất người giữ sổ trong phủ",rt:"Lão vâng lời."}]},
 s2:{h:"Gia nhân bỏ đi",w:"dad",if:RDW(0),t:"Mấy gia nhân thân của ngươi trong phủ bị huynh trưởng đuổi đi.",o:[
  {n:"Đón họ vào làm ở trang trại riêng",wx:"họ mang ơn",lx:"tốn bạc",rt:"Họ quỳ tạ."},
  {n:"Xin cha giữ họ lại",wx:"cha đứng về ngươi",lx:"cha không muốn làm lớn, gia nhân thấy ngươi mất thế",rt:"Cha giữ họ lại.",rf:"Cha nói việc phủ để huynh lo."},
  {n:"Bỏ qua",wx:"không làm lớn chuyện trong phủ",lx:"phủ mất người của ngươi",rt:"Ngươi không làm gì."}]},
 c1:{h:"Môn khách",w:"dad",t:"Ba môn khách giỏi nhất phủ đang lưỡng lự. Một người cần bạc, một người cần danh, một người cần tri kỷ.",o:[
  {n:"Cho bạc người cần bạc",wx:"có một người",lx:"người theo bạc thì đi theo bạc",rt:"Môn khách nhận bạc, theo ngươi.",rf:"Hắn nhận bạc của cả hai."},
  {n:"Tiến cử người cần danh",wx:"có người giỏi",lx:"bị nói là cài người",rt:"Môn khách được bổ chức nhỏ.",rf:"Tiến cử không thành."},
  {n:"Viết thư đàm đạo với người cần tri kỷ",wx:"có người thật lòng",lx:"thư không đến lòng, hắn kể với người ngoài ngươi khách sáo",rt:"Hắn hồi thư dài: “Tiểu thư hiểu lòng kẻ hèn này.”",rf:"Hắn thấy thư ngươi khách sáo."}]},
 c2:{h:"{v} gửi người vào phủ",w:"v",need:["v"],t:"{v} gửi một nữ quan vào phủ Tể tướng “giúp việc” cho chị dâu.",o:[
  {n:"Xin cha trả người về",wx:"phủ kín",lx:"cha nể {v} giữ lại, ngươi mất mặt trong phủ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Nữ quan bị trả về.",rf:"Cha nể {v}, giữ lại."},
  {n:"Mua chuộc nữ quan",wx:"tai mắt của {v} thành của ngươi",lx:"nàng báo {v}",rt:"Nữ quan nhận bạc.",rf:"Nữ quan báo lại {v}."},
  {n:"Để đó",wx:"không gây chuyện với {v}",lx:"{v} có tai mắt trong phủ, tin của ngươi lọt sang nàng",rt:"Ngươi để nữ quan ở lại."}]},
 t1:{h:"Đếm người",w:"dad",t:"Lão quản gia đếm: trong phủ, người theo ngươi và người theo huynh gần ngang nhau.",o:[
  {n:"Giữ người đã có",wx:"vững",lx:"không thêm",rt:"Người của ngươi ở lại."},
  {n:"Kéo thêm người",wx:"hơn huynh",lx:"tiền mất",rt:"Thêm năm gia nhân theo ngươi.",rf:"Bạc đi mà người không đến."},
  {n:"Đề nghị huynh chia phủ êm",wx:"không ầm ĩ",lx:"huynh không nhận, cả phủ biết ngươi xin hòa trước",rt:"Huynh đồng ý chia êm.",rf:"Huynh không đáp."}]},
 x1:{h:"Ngày giỗ tổ",w:"dad",t:"Ngày giỗ tổ, cả phủ tụ về. Ai đứng hàng đầu thắp hương sau cha, người ấy được coi là người nối phủ.",o:[
  {n:"Xin cha cho ngươi đứng hàng đầu",e:["win","lose"],rt:"Cha đưa nén hương cho ngươi trước.",rf:"Cha đưa nén hương cho huynh trưởng."},
  {n:"Nhường huynh, đứng cạnh",e:["mid","lose"],rt:"Hai huynh muội cùng thắp hương.",rf:"Huynh không chịu đứng cạnh."},
  {n:"Không về giỗ",wx:"không tranh phủ trước bàn thờ tổ",e:"lose",lx:"vắng mặt là nhường",rt:"Ngươi gửi lễ, không về."}]}},
 E:{win:{tag:"Phủ nghiêng về ngươi",w:"dad",t:"Cả phủ biết: người nối phủ là ngươi, dù ngươi ở trong cung.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Phủ hai người giữ",t:"Phủ không chia mà cũng không một. Hai huynh muội cùng giữ, mỗi người một nửa."},
  lose:{tag:"Huynh nối phủ",t:"Huynh trưởng nối phủ. Phủ Tể tướng giờ đứng sau {v}.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_tranh",7,{t:"Lời đồn trúng độc",w:"v",sj:"cơn bệnh lạ của {v}",cast(A){return rdCast(A,["v"])},
 g:"{v} lâm bệnh lạ sau một bữa tiệc có món điểm tâm từ phủ Tể tướng. Cả cung xì xào: nhà ngươi muốn trừ người huynh trưởng chọn.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Thái y đến",w:"doc",if:RDW(1),t:()=>qOn()?"Thái y nói {v} bị ngộ độc nhẹ. Hoàng hậu cho tra mọi món ăn ở bữa tiệc.":"Thái y nói {v} bị ngộ độc nhẹ. Hoàng thượng sai Thận hình ty tra mọi món ăn ở bữa tiệc.",o:[
  {n:"Tự nộp món điểm tâm cho tra",wx:"tỏ ra trong sạch",lx:"nhận món ấy là của nhà mình, tiếng nhà dính vào vụ tra",rt:"Món điểm tâm được đưa đi tra."},
  {n:"Cho người dò ai động vào món ăn",wx:"có manh mối",lx:"bị cho là phi tang",rt:"Một cung nữ của {v} đã cầm món ấy trước khi dâng.",rf:"Không ai nói."},
  {n:"Đến thăm {v}",wx:"tỏ lòng",lx:"bị đuổi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nằm, nhìn ngươi không nói.",rf:"Cung nữ của {v} chặn cửa."}]},
 s2:{h:"Ai cũng nhìn ngươi",w:"v",if:RDW(0),t:()=>rdEnd(6)==="lose"?"Huynh trưởng nối phủ và đứng sau {v}. Nay {v} bệnh, ai cũng nhìn về cung ngươi.":"Phủ còn chia hai, huynh trưởng giữ một nửa và hay lui tới cung {v}. Nay {v} bệnh, ai cũng nhìn về cung ngươi.",o:[
  {n:"Xin Hoàng hậu tra rõ",need:["hh"],wx:"Hoàng hậu tra công bằng",lx:"Hoàng hậu thấy phiền",rt:"Hoàng hậu cho tra.",rf:"Hoàng hậu chỉ bảo ngươi ở yên trong cung."},
  {n:"Đóng cửa cung",wx:"không thêm lời",lx:"im lặng như nhận",rt:"Ngươi đóng cửa."},
  {n:"Viết thư cho huynh",wx:"huynh tin ngươi",lx:"huynh nghi, đưa thư cho người khác xem",rt:"Huynh hồi: “Ta biết không phải muội.”",rf:"Huynh không hồi âm."}]},
 c1:{h:"Món điểm tâm",w:"doc",t:"Thái y tra thấy trong món điểm tâm có một vị thuốc lạ, không phải độc chết người, chỉ gây đau bụng.",o:[
  {n:"Tra xem ai mua vị thuốc ấy",wx:"lần ra",lx:"đường đứt",rt:"Vị thuốc được mua ở hiệu thuốc gần phủ nhà {v}.",rf:"Hiệu thuốc không nhớ."},
  {n:"Nói rõ: độc nhẹ thế này là tự hại để vu",wx:"cả cung nghĩ lại",lx:"bị cho là đổ ngược",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người tra án nhíu mày nhìn về phía {v}.",rf:"Ai cũng cho là ngươi đổ lỗi."},
  {n:"Im lặng chờ tra",wx:"không nói bừa",lx:"chậm, lời đồn chạy trước",rt:"Ngươi chờ."}]},
 c2:{h:"Huynh trưởng giận",w:"dad",t:"Huynh trưởng tin lời đồn, dâng thư lên cha đòi xử ngươi theo gia pháp.",o:[
  {n:"Gặp huynh giải thích",wx:"huynh nguôi",lx:"huynh không nghe",rt:"Huynh nghe, rồi ngồi xuống.",rf:"Huynh bỏ đi giữa chừng."},
  {n:"Nhờ cha phân xử",wx:"cha đứng về ngươi",lx:"cha khó xử, im lặng, cả phủ cho là cha nghi ngươi",rt:"Cha mắng huynh nóng vội.",rf:"Cha im lặng."},
  {n:"Mặc huynh",wx:"không tốn công sức",lx:"huynh càng giận, kể khắp họ",rt:"Ngươi không đáp."}]},
 t1:{h:"Cung nữ của {v}",w:"maid",t:"Cung nữ từng cầm món điểm tâm bỗng xin ra cung về quê.",o:[
  {n:"Giữ nàng lại",wx:"có nhân chứng",lx:"bị nói là ép người",rt:"Nàng bị giữ lại chờ tra.",rf:"Nàng đã đi."},
  {n:"Cho người theo nàng về quê",wx:"không mất dấu",lx:"tốn",rt:"Người của ngươi đi theo."},
  {n:"Để nàng đi",wx:"không ép",lx:"mất nhân chứng",rt:"Nàng đi."}]},
 x1:{h:"Hoàng hậu phán",w:"hh",need:["hh"],t:"Hoàng hậu gọi ngươi và {v} đến. Tra xét đã xong, chỉ chờ một lời.",o:[
  {n:"Đưa nhân chứng ra",e:["win","lose"],rt:"Cung nữ khai: {v} sai nàng bỏ thuốc để vu cho nhà ngươi.",rf:"Cung nữ khai không biết gì."},
  {n:"Xin Hoàng hậu bỏ qua cho cả hai",e:["mid","lose"],rt:"Hoàng hậu khép vụ, không ai bị phạt.",rf:"Hoàng hậu phạt ngươi vì món ăn từ nhà ngươi."},
  {n:"Nhận lỗi về phần nhà mình",e:"mid",lx:"mang tiếng",rt:"Hoàng hậu khen ngươi biết điều."}]},
 /* cast guard (review road-b1-r1 item 6): no Hoàng hậu → the Emperor hears the case (a harem matter, history rule 2) */
 x2:{h:"Hoàng thượng phán",w:"emp",if:()=>!qOn(),t:"Hoàng thượng gọi ngươi và {v} đến Dưỡng Tâm điện. Thận hình ty đã tra xong, chỉ chờ một lời của ngài.",o:[
  {n:"Đưa nhân chứng ra",e:["win","lose"],rt:"Cung nữ khai: {v} sai nàng bỏ thuốc để vu cho nhà ngươi.",rf:"Cung nữ khai không biết gì."},
  {n:"Xin Hoàng thượng bỏ qua cho cả hai",e:["mid","lose"],rt:"Hoàng thượng khép vụ, không ai bị phạt.",rf:"Hoàng thượng phạt ngươi vì món ăn từ nhà ngươi."},
  {n:"Nhận lỗi về phần nhà mình",e:"mid",lx:"mang tiếng",rt:"Hoàng thượng khen ngươi biết điều."}]}},
 E:{win:{tag:"Lời đồn bị lật",w:"v",t:"Cả cung biết {v} tự hại để vu ngươi. Huynh trưởng xấu hổ.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Vụ việc khép lại",t:"Không ai bị phạt, nhưng lời đồn còn đó."},
  lose:{tag:"Mang tiếng hại người",t:"Ngươi bị phạt chép kinh. Huynh trưởng tin ngươi hại {v}.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_tranh",8,{t:"Cha ngã bệnh",w:"dad",sj:"bệnh của cha và gia ấn",cast(A){return rdCast(A,["v"])},
 g:"{dad} ngã bệnh nặng. Gia ấn phủ Tể tướng chưa trao cho ai. Huynh trưởng ở bên giường cha, ngươi ở trong cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin cha bệnh",w:"dad",if:RDW(1),t:"Lão quản gia báo tin cha bệnh trước cả huynh trưởng.",o:[
  {n:"Xin thái y giỏi nhất đến phủ",wx:"cha được chữa tốt",lx:"phiền Hoàng thượng",rt:"Viện phán Thái y viện đến phủ.",rf:"Hoàng thượng chỉ ban thuốc."},
  {n:"Gửi sâm quý",wx:"cha biết con thương",lx:"tốn",rt:"Cha uống sâm, tỉnh lại một chút."},
  {n:"Nhờ quản gia giữ ấn",wx:"ấn không vào tay huynh",lx:"huynh biết",rt:"Lão quản gia cất ấn vào chỗ chỉ lão biết.",rf:"Huynh đã giữ ấn."}]},
 s2:{h:"Biết tin muộn",w:"dad",if:RDW(0),t:"Ba ngày sau ngươi mới biết cha bệnh. Huynh trưởng không báo.",o:[
  {n:"Xin về thăm",wx:"gặp cha",lx:"không được về",rt:"Hoàng thượng cho về nửa ngày.",rf:"Không được về."},
  {n:"Viết thư trách huynh",wx:"nói được điều phải nói",lx:"huynh càng xa, chuyện huynh muội cãi nhau lan ra",rt:"Huynh không đáp."},
  {n:"Gửi thuốc, không nói gì",wx:"tròn đạo hiếu",lx:"im lặng",rt:"Thuốc đến tay mẹ."}]},
 c1:{h:"Mẹ ngươi đứng đâu",w:"dad",t:"Mẹ ngươi, người giữ chìa khóa kho phủ, chưa nói theo ai.",o:[
  {n:"Viết thư cho mẹ",wx:"mẹ về phía ngươi",lx:"mẹ khó xử, kể với huynh rằng ngươi kéo mẹ",rt:"Mẹ hồi: “Mẹ theo cha. Cha theo con.”",rf:"Mẹ chỉ khóc."},
  {n:"Gửi quà cho mẹ",wx:"mẹ vui",lx:"không hỏi được gì",rt:"Mẹ nhận quà."},
  {n:"Để mẹ yên",wx:"thương mẹ",lx:"mẹ có thể nghiêng về huynh",rt:"Ngươi không hỏi."}]},
 c2:{h:"{v} nhắn huynh",w:"v",need:["v"],t:"{v} nhắn huynh trưởng: nếu cha mất, nhà nàng sẽ đứng sau huynh giữ ghế.",o:[
  {n:"Cho huynh thấy cái giá",wx:"huynh dè chừng",lx:"huynh không tin, cho là ngươi ghen với {v}",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Huynh hiểu: ghế giữ nhờ người khác là ghế của người khác.",rf:"Huynh vẫn tin {v}."},
  {n:"Tự tìm nhà khác đứng sau ngươi",wx:"cân lại",lx:"tốn",rt:"Một nhà Thượng thư hứa ủng hộ ngươi.",rf:"Không nhà nào dám."},
  {n:"Để mặc",wx:"không tranh",lx:"huynh có thêm người",rt:"Ngươi không làm gì."}]},
 t1:{h:"Cha tỉnh",w:"dad",t:"Cha tỉnh lại một đêm, gọi cả hai con. Ông hỏi: “Ấn này, hai con muốn cha trao ai?”",o:[
  {n:"Xin cha trao cho huynh, ngươi chỉ cần một lời hứa",wx:"huynh cảm động",lx:"ấn không về tay ngươi",rt:"Huynh nhìn ngươi, mắt đỏ hoe."},
  {n:"Xin cha trao cho ngươi",wx:"ấn về tay ngươi",lx:"huynh oán, cả họ nói ngươi giành ấn lúc cha bệnh",rt:"Cha nắm tay ngươi.",rf:"Cha nhắm mắt không đáp."},
  {n:"Xin cha đừng trao ai",wx:"không ai tranh",lx:"không ai giữ ấn, việc phủ rối",rt:"Cha cười yếu ớt."}]},
 x1:{h:"Cha qua cơn",w:"doc",t:"Cơn bệnh của cha đến hồi quyết.",o:[
  {n:"Ở bên cha",e:["win","lose"],rt:"Cha qua cơn, tỉnh dậy thấy ngươi đầu tiên.",rf:"Cha qua cơn, nhưng yếu hẳn, giao việc phủ cho huynh."},
  {n:"Lo việc phủ trong lúc cha bệnh",lx:"tốn bạc giữ phủ yên",e:["win","mid"],rt:"Phủ không loạn. Cha tỉnh dậy thấy mọi việc yên.",rf:"Phủ không loạn, nhưng huynh nói ngươi chỉ lo giữ phủ, chẳng lo thăm cha."},
  {n:"Cầu cho cha",e:"mid",lx:"không làm gì khác",rt:"Ngươi quỳ trước tượng Phật suốt đêm."}]}},
 E:{win:{tag:"Cha tin ngươi",w:"dad",t:"Cha qua cơn bệnh và từ đó việc lớn đều hỏi ngươi.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Cha yếu đi",t:"Cha qua cơn nhưng yếu. Gia ấn vẫn chưa trao."},
  lose:{tag:"Huynh giữ việc phủ",t:"Huynh trưởng giữ việc phủ thay cha. {v} có thêm chỗ dựa.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_tranh",9,{t:"Gia ấn phủ Tể tướng",w:"emp",sj:"cuộc tranh gia ấn phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Chuyện ai giữ gia ấn phủ Tể tướng lọt ra triều. Hoàng thượng để ý: phủ Tể tướng nghiêng về ai, triều nghiêng theo đó.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng hỏi",w:"emp",if:RDW(1),t:"Hoàng thượng hỏi như đùa: “Nghe nói nàng sắp làm Tể tướng?”",om3:"001",o:[
  {alt:{n:"Đáp đùa lại",rt:"Ngài cười: “Nàng mà làm Tể tướng thì trẫm khỏi lo.”",rf:"Ngài im lặng."},n:"Thưa thật mọi chuyện",wx:"ngài tin",lx:"ngài lo, thấy phủ Tể tướng quá gần hậu cung",rt:"Ngài nghe, gật đầu.",rf:"Ngài nhíu mày."},
  {n:"Lảng đi",wx:"không lộ",lx:"ngài nghi ngươi giấu",rt:"Ngươi nói sang chuyện khác."}]},
 s2:{h:"Hoàng thượng không hỏi",w:"emp",if:RDW(0),t:"Hoàng thượng không hỏi gì, nhưng ngài ghé cung {v} nhiều hơn.",o:[
  {n:"Gửi canh",wx:"ngài nhớ",lx:"canh nguội",rt:"Ngài ghé.",rf:"Ngài không ghé."},
  {n:"Chờ",wx:"giữ mình",lx:"xa ngài thêm",rt:"Ngươi chờ."},
  {n:"Tìm cách gặp ở Ngự hoa viên",wx:"được gặp",lx:"bị nói là đón đường",rt:"Hoàng thượng dừng lại nói chuyện.",rf:"Ngài đi qua."}]},
 c1:{h:"Triều thần bàn",w:"emp",t:"Ngự sử nói: gia ấn phủ Tể tướng là việc nhà, nhưng nhà ấy dính đến hậu cung thì là việc nước.",o:[
  {n:"Lùi lại, nói không tranh",wx:"triều yên",lx:"lùi là mất: triều thôi coi ngươi là người của phủ",rt:"Ngươi nhắn ra ngoài: “Thần thiếp không tranh ấn.”"},
  {n:"Nhờ người nói giúp ở triều",wx:"có tiếng nói",lx:"lộ ngươi có người",rt:"Một Thị lang nói đỡ.",rf:"Thị lang bị hặc."},
  {n:"Im lặng",wx:"không động",lx:"triều tự bàn, tên ngươi bị nhắc mà không ai bênh",rt:"Ngươi im."}]},
 c2:{h:"{v} tâu",w:"v",need:["v"],t:"{v} tâu với Hoàng thượng: con gái Tể tướng muốn nắm cả phủ cha lẫn hậu cung.",o:[
  {n:"Đáp lại trước mặt vua",wx:"vua thấy ngươi thẳng",lx:"cãi trước vua",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi nói một câu, {v} cứng họng.",rf:"Hoàng thượng phẩy tay cho cả hai lui."},
  {n:"Không đáp",wx:"giữ thể diện",lx:"lời tâu ở lại trong lòng vua",rt:"Ngươi cúi đầu."},
  {n:"Cho vua thấy {v} cũng đứng sau huynh ngươi",wx:"vua thấy cả hai",lx:"vua chán cả hai",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng nhìn {v} rất lâu.",rf:"Vua nói: “Hai nàng đều như nhau.”"}]},
 t1:{h:"Huynh trưởng tìm đến",w:"dad",t:"Huynh trưởng tìm đến: “Muội nhường gia ấn cho ta, ta hứa không để {v} dùng phủ.”",o:[
  {n:"Tin huynh, nhường",wx:"huynh muội hòa",lx:"ấn không về ngươi",rt:"Huynh nắm tay ngươi."},
  {n:"Đòi huynh viết giấy",wx:"có giấy làm bằng",lx:"huynh tự ái bỏ đi, cả phủ biết huynh muội không tin nhau",rt:"Huynh viết giấy.",rf:"Huynh bỏ đi."},
  {n:"Không nhường",wx:"giữ ấn",lx:"huynh oán, cả họ nói ngươi tham",rt:"Ngươi lắc đầu."}]},
 x1:{h:"Hoàng thượng định",w:"emp",t:"Hoàng thượng định giao việc phủ Tể tướng cho ai thay cha đang bệnh.",o:[
  {n:"Xin giao cho người ngươi chọn",e:["win","lose"],rt:"Hoàng thượng giao cho người ngươi chọn.",rf:"Hoàng thượng giao cho huynh trưởng."},
  {n:"Xin giao cho huynh",wx:"huynh nhớ ơn",e:["mid","lose"],rt:"Huynh nhận việc phủ, biết ơn ngươi.",rf:"Huynh nhận việc phủ, không biết ơn ai."},
  {n:"Không xin gì",e:"mid",lx:"để vua tự định, cả phủ thấy ngươi buông",rt:"Ngươi không nói."}]}},
 E:{win:{tag:"Gia ấn về tay ngươi",w:"emp",t:"Phủ Tể tướng do người ngươi chọn giữ. Huynh trưởng phải nghe.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Huynh giữ ấn, nhớ ơn",t:"Huynh giữ ấn. Hắn nhớ ngươi đã nhường."},
  lose:{tag:"Gia ấn về phe {v}",t:"Huynh giữ ấn, và đứng sau {v}.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}}}});

rdDef("tt_tranh",10,{t:"Gia yến đoàn viên",w:"dad",sj:"bữa gia yến cuối năm",cast(A){return rdCast(A,["v"])},
 g:"Cuối năm, Hoàng thượng cho phép phủ Tể tướng vào cung dự gia yến. Huynh trưởng, chị dâu, {v} và ngươi ngồi chung một mâm.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sắp chỗ ngồi",w:"dad",if:RDW(1),t:"Nội vụ phủ hỏi ngươi sắp chỗ ngồi thế nào.",o:[
  {n:"Cho huynh ngồi cạnh cha",wx:"huynh được nể",lx:"ngươi ngồi xa, khách thấy huynh là chủ",rt:"Huynh ngồi cạnh cha, nhìn ngươi cảm kích."},
  {n:"Ngồi cạnh cha",wx:"cả nhà thấy ai là chủ",lx:"huynh tự ái chen chỗ, cả nhà thấy ngươi giành",rt:"Ngươi ngồi cạnh cha.",rf:"Huynh kiếm cớ ngồi chen."},
  {n:"Để Nội vụ phủ sắp theo lệ",wx:"không ai trách",lx:"không ai nể",rt:"Nội vụ phủ sắp theo lệ."}]},
 s2:{h:"Ngươi ngồi cuối mâm",w:"dad",if:RDW(0),t:"Nội vụ phủ đã sắp: huynh trưởng ngồi đầu, ngươi ngồi gần cuối.",o:[
  {n:"Vui vẻ ngồi",wx:"giữ hòa khí",lx:"nuốt giận, khách thấy ngươi ngồi cuối",rt:"Ngươi cười, ngồi xuống."},
  {n:"Xin đổi chỗ",wx:"giữ thể diện",lx:"lộ bất bình",rt:"Nội vụ phủ đổi chỗ.",rf:"Nội vụ phủ nói lệnh đã ban."},
  {n:"Cáo bệnh không dự",wx:"khỏi ngượng, nghỉ được một hôm",lx:"vắng gia yến, cả nhà nói ngươi bỏ mâm",rt:"Ngươi cáo bệnh."}]},
 c1:{h:"Chén rượu của huynh",w:"dad",t:"Huynh trưởng nâng chén mời ngươi. Cả bàn im lặng chờ.",o:[
  {n:"Uống cạn",wx:"huynh muội hòa",lx:"rượu mạnh, ngươi mệt cả hôm sau",rt:"Huynh cũng uống cạn."},
  {n:"Mời lại huynh một chén",wx:"ngươi là người mời",lx:"huynh tự ái đặt chén xuống, cả bàn ngượng",rt:"Cả bàn vỗ tay.",rf:"Huynh đặt chén xuống."},
  {n:"Xin dùng trà thay rượu",wx:"giữ mình",lx:"huynh thấy bị từ chối trước mặt cả nhà",rt:"Huynh cười gượng."}]},
 c2:{h:"{v} kể chuyện cũ",w:"v",need:["v"],t:"{v} kể chuyện món điểm tâm năm trước, như vô tình.",o:[
  {n:"Đáp nhẹ nhàng",wx:"{v} mất mặt",lx:"không ai cười, ngươi thành kẻ bắt bẻ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi nói: “Chuyện cũ, {tg} còn nhớ kỹ thật.” Cả bàn cười.",rf:"Không ai cười."},
  {n:"Im lặng",wx:"giữ hòa khí",lx:"{v} đắc ý",rt:"Ngươi gắp thức ăn cho mẹ."},
  {n:"Nhờ cha lên tiếng",wx:"cha bênh",lx:"cha giả như không nghe, ngươi mất mặt",rt:"Cha nói: “Chuyện ấy đã xong.”",rf:"Cha giả như không nghe."}]},
 t1:{h:"Mẹ khóc",w:"dad",t:"Cuối bữa, mẹ ngươi khóc: “Nhà mình lại ngồi chung một mâm.”",o:[
  {n:"Ôm mẹ",wx:"cả nhà lặng đi",lx:"khóc trước mặt người hầu, mất dáng phi tần",rt:"Huynh trưởng quay mặt đi lau mắt."},
  {n:"Hứa với mẹ nhà sẽ hòa",wx:"mẹ yên lòng",lx:"lời hứa nặng, ngươi phải tự lo cho nhà hòa",rt:"Mẹ cười qua nước mắt."},
  {n:"Nhìn huynh",wx:"huynh hiểu",lx:"huynh tránh mắt, cả nhà thấy hai người còn xa",rt:"Huynh gật đầu với ngươi.",rf:"Huynh nhìn xuống."}]},
 x1:{h:"Lời chúc cuối",w:"dad",t:"Cha nâng chén cuối: “Ai nói lời chúc, người ấy nói thay cả nhà.”",o:[
  {n:"Đứng lên chúc cho cả nhà",e:["win","lose"],rt:"Lời chúc của ngươi làm cả bàn đứng dậy nâng chén.",rf:"Lời chúc vụng, huynh tiếp lời."},
  {n:"Mời huynh chúc",lx:"nhường lời là nhường chỗ đầu mâm",e:["win","mid"],rt:"Huynh chúc, rồi nói thêm: “Và cho muội ta.”",rf:"Huynh chúc cho nhà {v} trước."},
  {n:"Để cha chúc",e:"mid",lx:"không ai nói thay",rt:"Cha chúc."}]}},
 E:{win:{tag:"Một mâm một lòng",w:"dad",t:"Sau gia yến, huynh trưởng thôi lui tới cung {v}. Nhà ngươi lại một lòng.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}},
  mid:{tag:"Bữa yến êm",t:"Bữa yến êm, nhưng sau đó mỗi người về một ngả."},
  lose:{tag:"Mâm vẫn chia",t:"Bữa yến kết thúc. Huynh trưởng đi cùng người nhà {v} ra cổng.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_tranh",11,{t:"Một nhà một lòng",w:"dad",sj:"phủ Tể tướng sau cùng",cast(A){return rdCast(A,["v"])},
 g:"Cha già yếu, sắp từ quan. Phủ Tể tướng sẽ đi về đâu: theo ngươi, theo huynh, hay chia đôi mãi. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Huynh xin gặp",w:"dad",if:RDW(1),t:"Huynh trưởng xin gặp riêng. Hắn mang theo cuốn gia phả.",o:[
  {n:"Gặp",wx:"nghe huynh nói",lx:"huynh nói đến khuya, ngươi mệt lả",rt:"Huynh mở gia phả, chỉ vào tên ngươi."},
  {n:"Gặp cùng cha",wx:"có cha làm chứng",lx:"huynh không nói được hết, cho là ngươi mượn cha ép mình",rt:"Ba người ngồi với nhau.",rf:"Huynh im lặng."},
  {n:"Hẹn hôm khác",wx:"có thời gian nghĩ kỹ",lx:"huynh nghĩ ngươi tránh, kể với cả họ",rt:"Huynh về."}]},
 s2:{h:"Huynh không đến",w:"dad",if:RDW(0),t:"Cha sắp từ quan mà huynh trưởng không vào cung một lần.",o:[
  {n:"Viết thư cho huynh",wx:"huynh hồi đáp",lx:"huynh không đáp, cả họ biết ngươi bị làm ngơ",rt:"Huynh hồi một bức thư dài.",rf:"Thư không có hồi âm."},
  {n:"Nhờ chị dâu",wx:"có người hòa giải",lx:"chị dâu không dám",rt:"Chị dâu nói giúp.",rf:"Chị dâu từ chối."},
  {n:"Thôi",wx:"khỏi nhọc lòng",lx:"xa thêm, ngày cha từ quan huynh không đứng cạnh ngươi",rt:"Ngươi không làm gì."}]},
 c1:{h:"Nhà {v} ra giá",w:"v",need:["v"],t:"Nhà {v} ra giá cuối: họ sẽ thôi đứng sau huynh nếu ngươi thôi tranh sủng với {v}.",o:[
  {n:"Nhận",wx:"huynh được tự do",lx:"nhường sủng",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Nhà {v} rút khỏi phủ ngươi."},
  {n:"Từ chối",wx:"không bị ép",lx:"nhà {v} còn đứng sau huynh",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi từ chối."},
  {n:"Đề nghị điều khác",wx:"không mất sủng",lx:"nhà {v} không nhận",rt:"Nhà {v} nhận bạc, rút lui.",rf:"Nhà {v} cười."}]},
 c2:{h:"Gia phả",w:"dad",t:"Cha muốn ghi trong gia phả người nối phủ. Theo lệ là con trai trưởng.",o:[
  {n:"Ủng hộ lệ: ghi huynh",wx:"huynh biết ơn",lx:"ngươi không có tên trong gia phả",rt:"Cha ghi tên huynh."},
  {n:"Xin cha ghi cả hai",wx:"có tên",lx:"phá lệ, cả họ cho là ngươi tham",rt:"Cha ghi thêm: “Con gái giữ đạo, nhà nhờ ân.”",rf:"Cha nói: lệ là lệ."},
  {n:"Không bàn",wx:"không xen việc họ",lx:"gia phả ghi mà không có ý ngươi",rt:"Ngươi không nói."}]},
 t1:{h:"Huynh hỏi",w:"dad",t:"Huynh trưởng hỏi: “Nếu ta theo muội, muội có để ta làm người nối phủ không?”",o:[
  {n:"Có",wx:"huynh theo ngươi",lx:"ngươi chỉ đứng sau huynh",rt:"Huynh quỳ một gối: “Vậy ta theo muội.”"},
  {n:"Huynh phải tự giành",wx:"rõ ràng",lx:"huynh tự ái, cả họ thấy ngươi lạnh",rt:"Huynh đứng dậy."},
  {n:"Ta không cần phủ",wx:"nhẹ lòng",lx:"buông phủ, nhà không còn là chỗ dựa",rt:"Huynh nhìn ngươi rất lâu."}]},
 x1:{h:"Ngày cha từ quan",w:"dad",t:"Ngày cha dâng sớ từ quan. Cả phủ chờ xem hai người con đứng thế nào.",o:[
  {n:"Đứng cạnh huynh tiễn cha",lx:"đứng cạnh là chia phần với huynh",e:["win","mid"],rt:"Cả phủ thấy hai huynh muội đứng cạnh nhau.",rf:"Huynh đứng cạnh, nhưng không nhìn ngươi."},
  {n:"Để huynh đứng một mình, tự giữ phần mình",wx:"giữ phần mình",e:["mid","lose"],rt:"Mỗi người một phần, không ai giẫm lên ai.",rf:"Huynh đứng một mình, và đứng về phía {v}."},
  {n:"Xin Hoàng thượng giao phủ cho ngươi",e:["win","lose"],rt:"Hoàng thượng ban: con gái Tể tướng giữ gia nghiệp.",rf:"Hoàng thượng nói việc nhà để nhà tự lo."}]}},
 E:{win:{tag:"Một nhà một lòng",w:"dad",t:"Phủ Tể tướng một lòng đứng sau ngươi. Huynh trưởng giữ phủ, ngươi giữ lòng nhà.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Mỗi người một ngả",t:"Phủ không còn chia phe, nhưng cũng không còn là chỗ dựa lớn. Ngươi tự đi đường mình."},
  lose:{tag:"Phủ đứng sau {v}",t:"Huynh trưởng nối phủ và đứng sau {v}. Phủ Tể tướng từ nay là đối thủ của ngươi.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])}}}});
RD97L.push(rdRare({a:"tt_tranh_11",tag:"Huynh muội đồng lòng, phủ dâng cả phe cánh",w:"dad",n:"Mời huynh cùng quỳ dâng sổ phủ lên Hoàng thượng",
 path:["Hỏi thẳng huynh","Trả ơn thay huynh","Cho huynh thấy cái giá","Xin cha trao cho huynh","Tin huynh, nhường","Đứng cạnh huynh"],bad:["Cắt đứt","Không nhường","Cáo bệnh không dự"],x:[()=>S.duc>=RR("tt_tranh_11").bar,"Đức từ "+RR("tt_tranh_11").bar],
 t:"Hai huynh muội cùng quỳ trước Hoàng thượng, dâng sổ người của phủ. Ngài cười: “Một nhà như thế, trẫm dùng cả.” Huynh trưởng được bổ chức lớn, và mọi người của phe {v} trong phủ quay về theo hai người.",go:(A,G)=>{rdOan(A,"v",G[0]);return e67dad(G[1])},rw:"nt_haiduong",ti:"Huynh muội đồng tâm"}));

/* ---------- tt_mat · Mật ước với Hoàng hậu ---------- */
/* ONE CORE (review road-b1-r1 item 8): every RANKS index clamped */
const MATCAP=()=>BAL.road.cap.tt_mat,MATRK=()=>RANKS[Math.min(MATCAP(),RANKS.length-1)].n,MATME=()=>meRankN();
/* she already stands above the pact's cap: texts that say "the pact holds you under" read this (review road-b1-r1 item 4) */
const MATOVER=()=>S.rank>MATCAP();
/* the Hoàng hậu of the pact is on the seat (cast guard, review road-b1-r1 item 6). Without her (dead, deposed, or the player is Hoàng hậu)
   the pact paper stays with her birth family («nhà mẹ đẻ Trung cung cũ», its lady = «mẫu thân Trung cung cũ», a woman who may enter the
   inner palace); every hồi that needs the Hoàng hậu has need:["hh"] and an hh-free sibling (if:()=>!MATQ()) in the same pool */
const MATQ=()=>typeof qOn==="function"&&qOn();
/* a real rank rise where a text says "ngươi lên bậc" (review road-b1-r1 item 4): the long-road decree path (jexam exDirectUp, no exam),
   never past Hoàng quý phi, never into a full seat (j30 seatFree); A.f.up tells the texts what really happened */
const MATUP=A=>{A.f.up=0;try{if(S.out||S.rank>=6)return"";if(typeof seatFree==="function"&&!seatFree(S.rank+1))return"";const r0=S.rank;const t=exDirectUp(S,"Hoàng thượng ân điển",{fx:1});A.f.up=S.rank>r0?1:0;return t}catch(e){return""}};
/* tt_mat .8 won = {v} was kept out of the pact (texts of .10 read it) */
const MATVOUT=()=>rdEnd(8)==="win";
/* the Hoàng hậu is weak (ill or without a living child): the only case where her word on the Trung cung seat carries (road-history item 3) */
const TT_HHILL=()=>{try{const q=rivals[0];return !!(q&&(typeof illOf==="function"?illOf(q):q.ill))}catch(e){return false}};
const TT_HHWEAK=()=>{try{const q=rivals[0];return !!(q&&q.queen&&q.alive&&!q.out&&(TT_HHILL()||!(q.kids||[]).some(k=>k.alive)))}catch(e){return false}};
rdDef("tt_mat",5,{t:"Ân nợ Trung cung",w:"hh",sj:"điều Hoàng hậu và cha đã hứa",cast(A){return rdCast(A,["v"])},
 g:()=>MATQ()?"Sau chuyện mật ước, giữa ngươi và Hoàng hậu {hh} không còn như trước. Tìm cho ra mật ước viết những gì, trước khi người khác tìm ra.":"Sau chuyện mật ước, Trung cung đã đổi khác, nhưng bản ước vẫn còn. Tìm cho ra mật ước viết những gì, trước khi người khác tìm ra.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Hoàng hậu gọi",w:"hh",need:["hh"],if:()=>rdPrev()==="win",t:"Hoàng hậu {hh} gọi ngươi đến Càn Ninh cung, ban trà Long Tỉnh, nói chậm rãi: “Bản cung nhớ ơn muội. Nhưng ơn thì có hạn.”",o:[
  {n:"Hỏi thẳng mật ước viết gì",wx:"nghe từ chính miệng nàng",lx:"Hoàng hậu phật ý vì bị hỏi dồn",rt:"Hoàng hậu nói một nửa: “Cha muội hứa nhà muội không dựng ai lên ghế của bản cung.”",rf:"Hoàng hậu cười, đặt chén xuống: “Muội hỏi nhiều quá.”"},
  {n:"Tạ ơn, không hỏi",wx:"Hoàng hậu yên tâm về ngươi",lx:"cung nữ ngươi cài ở Càn Ninh cung bị đổi đi, ngươi không biết thêm gì",rt:"Hoàng hậu gật đầu hài lòng, sai người tiễn ngươi về."},
  {n:"Dò qua cung nữ của Hoàng hậu",wx:"biết mật ước cất ở đâu",lx:"cung nữ báo lại, Hoàng hậu biết ngươi dò",rt:"Cung nữ kể có một bức thư trong hộp gỗ trầm đặt sau bình phong.",rf:"Cung nữ nhận bạc rồi báo lại Hoàng hậu."}]},
 s2:{h:"Trung cung lung lay",w:"hh",need:["hh"],if:()=>rdPrev()==="win2",t:"Từ khi mật ước bị lật, Hoàng hậu {hh} như ngồi trên lửa. Nàng nhìn ngươi như nhìn kẻ thù, còn ngươi biết mật ước chưa nằm hết trên giấy.",o:[
  {n:"Gửi lễ xin hòa",wx:"Hoàng hậu: oán −",lx:"lễ bị trả về, cả cung biết ngươi cầu hòa không được",rt:"Hoàng hậu nhận lễ, không nói gì, nhưng thôi nhìn ngươi như kẻ thù.",rf:"Lễ bị trả về nguyên phong."},
  {n:"Giữ khoảng cách",wx:"không thêm vướng",lx:"thù còn đó, Hoàng hậu càng lạnh",rt:"Ngươi tránh đi qua Càn Ninh cung."},
  {n:"Tìm bản mật ước còn lại",wx:"nắm thêm một lá bài",lx:"người của ngươi bị bắt gặp lục tìm",rt:"Có một bản sao ở phủ cha, trong rương sách cũ.",rf:"Không tìm ra, mà chuyện ngươi tìm thì lọt ra."}]},
 s3:{h:"Mật ước chìm",w:"dad",if:()=>(rdPrev()!=="win"&&rdPrev()!=="win2")||!MATQ(),t:"Chuyện mật ước chìm xuống. Nhưng cha vẫn giữ một bản, và ngươi biết có người khác trong cung cũng biết.",o:[
  {n:"Xin cha bản mật ước",wx:"có bản trong tay",lx:"cha không đưa, mắng ngươi tò mò; chuyện cha con bất hòa lọt ra",rt:"Cha gửi bản sao, dặn đọc xong thì đốt.",rf:"Cha hồi: “Con không cần biết.”"},
  {n:"Dò ai khác biết",wx:"biết kẻ nguy hiểm",lx:"kẻ ấy biết ngươi dò",rt:"Một nữ quan cũ của Càn Ninh cung biết, và bà ta sắp ra cung.",rf:"Không ra manh mối nào."},
  {n:"Quên đi",wx:"Lòng +",lx:"việc không tự mất: kẻ biết mật ước vẫn dò, tai mắt của ngươi lơi",rt:"Ngươi không nghĩ đến nữa."}]},
 c1:{h:"Hộp gỗ trầm",w:"hh",need:["hh"],if:()=>rdPrev()!=="r97",t:"Bức thư mật ước nằm trong một hộp gỗ trầm ở Càn Ninh cung. Chìa hộp do một ma ma già giữ.",o:[
  {n:"Cho người lẻn vào xem",wx:"đọc được tận chữ",lx:"bị bắt là trọng tội",rt:"Người của ngươi chép được thư.",rf:"Người của ngươi bị bắt, khai ra ngươi."},
  {n:"Chờ Hoàng hậu tự cho xem",wx:"giữ lễ với Trung cung",lx:"chờ thì mất thế, ma ma giữ chìa đổi chỗ giấu",rt:"Ngươi chờ. Hoàng hậu thấy ngươi biết phận."},
  {n:"Hỏi cha",wx:"nghe từ phía cha",lx:"cha giấu, còn dặn người nhà canh thư ngươi",rt:()=>`Cha kể một điều: nhà ngươi hứa con gái sẽ không lên quá bậc ${MATRK()}.`,rf:"Cha không kể."}]},
 c2:{h:"{v} nghe phong thanh",w:"v",need:["v"],t:"{v} nghe phong thanh chuyện mật ước. Nàng muốn biết để dùng, và đã sai người hỏi quanh những người hầu cũ của Càn Ninh cung.",o:[
  {n:"Bịt miệng người kể",wx:"tin dừng ở đó",lx:"người kể nói thêm, có tên ngươi",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người kể nhận bạc, im bặt.",rf:"Người kể đã nói xong với {v}."},
  {n:"Cho {v} một tin sai",wx:"{v} đi lạc",lx:"{v} biết bị lừa, rêu rao ngươi giấu chuyện",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đi dò một mật ước không có thật.",rf:"{v} cười: “Muội tưởng ta ngốc?”"},
  {n:"Mặc",wx:"không để lộ ngươi đang lo",lx:"{v} biết thêm, đi đâu cũng úp mở chuyện nhà ngươi",rt:"Ngươi không động."}]},
 t1:{h:"Mật ước viết gì",w:"dad",t:()=>`Ngươi biết được: phủ Tể tướng ủng hộ Trung cung giữ ngôi; đổi lại, Trung cung che chở cha trên triều, và con gái Tể tướng không được lên quá bậc ${MATRK()}.`,o:[
  {n:"Giận cha",wx:"biết mình bị bán, không còn mơ hồ",lx:"cha con xa, người hầu thấy ngươi nặng lời với nhà",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngươi gấp thư, tay run."},
  {n:"Hiểu cho cha",wx:"cha con còn tình",lx:"chấp nhận bị bán, cam đứng dưới bậc mà ước cho phép",rt:"Ngươi thở dài, đốt thư."},
  {n:"Nghĩ cách dùng nó",wx:"mật ước thành lá bài",lx:"lòng lạnh, coi cả cha mình như quân bài",rt:"Ngươi cất thư vào tay áo."}]},
 x1:{h:"Nói với ai",w:"hh",need:["hh"],t:"Ngươi đã biết đủ. Nói với Hoàng hậu rằng ngươi biết, nói với cha, hay giữ riêng trong lòng.",o:[
  {n:"Nói với Hoàng hậu",e:["win","lose"],rt:"Hoàng hậu im lặng, rồi nói: “Vậy muội và ta nói chuyện như người lớn.”",rf:"Hoàng hậu cho là ngươi dọa."},
  {n:"Nói với cha",wx:"cha nợ ngươi một lời",e:["mid","lose"],rt:"Cha xin lỗi ngươi, lần đầu tiên.",rf:"Cha nói: “Vì nhà cả.” rồi kể với Hoàng hậu rằng ngươi đã biết."},
  {n:"Giữ riêng",e:"mid",lx:"không ai biết ngươi biết, cũng không ai nợ ngươi; tai mắt phải lo xóa dấu ngươi đã dò",rt:"Ngươi giữ kín."}]},
 x2:{h:"Nói với ai",w:"dad",if:()=>!MATQ(),t:"Ngươi đã biết đủ. Trung cung cũ không còn ở Càn Ninh cung, nhưng bản ước vẫn nằm trong tay nhà mẹ đẻ của nàng. Nói với nhà ấy rằng ngươi biết, nói với cha, hay giữ riêng trong lòng.",o:[
  {n:"Nhắn mẫu thân Trung cung cũ rằng ngươi biết",e:["win","lose"],rt:"Mẫu thân Trung cung cũ vào cung thỉnh an, nói khẽ: “Vậy nhà ta và nhà nương nương nói chuyện như người lớn.”",rf:"Bà cho là ngươi dọa, về kể khắp các phủ."},
  {n:"Nói với cha",wx:"cha nợ ngươi một lời",e:["mid","lose"],rt:"Cha xin lỗi ngươi, lần đầu tiên.",rf:"Cha nói: “Vì nhà cả.” rồi báo nhà mẹ đẻ Trung cung cũ rằng ngươi đã biết."},
  {n:"Giữ riêng",e:"mid",lx:"không ai biết ngươi biết, cũng không ai nợ ngươi; tai mắt phải lo xóa dấu ngươi đã dò",rt:"Ngươi giữ kín."}]}},
 E:{win:{tag:()=>MATQ()?"Ngang hàng với Trung cung":"Ngang hàng với nhà Trung cung cũ",w:"hh",t:()=>MATQ()?"Hoàng hậu biết ngươi biết. Từ nay hai người nói chuyện như hai người ngồi cùng bàn cờ.":"Nhà mẹ đẻ Trung cung cũ biết ngươi biết. Từ nay hai nhà nói chuyện như hai người ngồi cùng bàn cờ."},
  mid:{tag:"Biết mà im",t:"Ngươi biết mật ước. Chưa ai biết ngươi biết."},
  lose:{tag:()=>MATQ()?"Hoàng hậu đề phòng":"Nhà Trung cung cũ đề phòng",t:()=>MATQ()?"Hoàng hậu cho người canh cung ngươi. Cung nữ của ngươi đi đâu cũng có người theo.":"Nhà mẹ đẻ Trung cung cũ cho người dò nhà ngươi. Thư nhà đi đâu cũng có kẻ rình."}}});

rdDef("tt_mat",6,{t:"Cái giá là ngươi",w:"hh",sj:"điều khoản giữ ngươi dưới một bậc",cast(A){return rdCast(A,["v"])},
 g:()=>MATOVER()?`Mật ước giữ ngươi không lên quá bậc ${MATRK()}, mà ngươi đã ở bậc ${MATME()}. Bên kia ước coi đó là món nợ phải đòi. Chấp nhận, lách, hay phá — mỗi đường một cái giá.`:`Mật ước giữ ngươi không lên quá bậc ${MATRK()}. Chấp nhận, lách, hay phá — mỗi đường một cái giá.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1","x2"]],
 B:{s1:{h:"Một lần tấn phong bị gác",w:"emp",need:["hh"],if:RDW(1),t:"Hoàng thượng định tấn phong ngươi, nhưng Hoàng hậu {hh} khéo léo tâu “chờ thêm một mùa”. Ngươi biết vì sao.",o:[
  {n:"Chờ, giữ ước",f:"keep",wx:"Hoàng hậu thấy ngươi giữ lời",lx:"mất một lần tấn phong, Hoàng thượng thấy ngươi lùi",rt:"Ngươi cúi đầu tạ ơn Hoàng hậu đã nghĩ cho ngươi."},
  {n:"Nhắc khéo Hoàng thượng",f:"break",wx:"Hoàng thượng nhớ lời đã định",lx:"Hoàng hậu biết ngươi lách ước",rt:"Hoàng thượng cười: “Trẫm nhớ.”",rf:"Hoàng thượng quên, còn Hoàng hậu thì nghe được."},
  {n:"Gặp Hoàng hậu nói thẳng",wx:"rõ ràng giá cả",lx:"Hoàng hậu giận",rt:"Hoàng hậu nói: “Muội muốn lên thì phải cho ta thứ khác.”",rf:"Hoàng hậu lạnh mặt, cho ngươi lui."}]},
 s2:{h:"Bị giữ dưới",w:"hh",if:A=>RDW(0)()||!MATQ(),t:"Đã hai mùa Hoàng thượng không nhắc đến chuyện tấn phong ngươi. Có người đang giữ, và ngươi đoán được là ai.",o:[
  {n:"Chấp nhận",f:"keep",wx:"Lòng +",lx:"đứng yên, cả cung thấy ngươi bị bỏ quên",rt:"Ngươi không nghĩ đến bậc nữa."},
  {n:"Lập công để không ai giữ được",f:"break",wx:"công rõ ràng trước lục cung",lx:"công bị người khác nhận, ngươi thành trò cười",rt:"Ngươi chép xong bộ kinh mừng thọ trong cung. Cả cung nhắc tên ngươi.",rf:"Công của ngươi bị người khác nhận."},
  {n:"Hỏi cha",wx:"cha nói thật",lx:"cha né, người nhà nói ngươi đòi hỏi",rt:"Cha nói: “Đó là giá của nhà mình.”",rf:"Cha né."}]},
 c1:{h:"Ngươi đã ở sát bậc",w:"hh",need:["hh"],if:()=>S.rank>=MATCAP()-1&&S.rank<=MATCAP(),t:()=>S.rank===MATCAP()?`Ngươi đã đứng ở bậc ${MATRK()}. Một bước nữa là phá ước.`:`Ngươi chỉ còn một bước là đến bậc ${MATRK()}, bậc cao nhất ước cho phép. Hoàng hậu đã bắt đầu để mắt.`,o:[
  {n:"Từ chối tấn phong",f:"keep",wx:"Hoàng hậu tin",lx:"Hoàng thượng phật ý vì ngươi từ chối ân",rt:"Ngươi xin Hoàng thượng chờ."},
  {n:"Nhận tấn phong",f:"break",wx:()=>S.rank===MATCAP()?"lên bậc, phá ước":"lên bậc, chạm đúng bậc cao nhất ước cho phép",lx:"Hoàng hậu thù",go:A=>MATUP(A),rt:A=>A.f.up?"Ngươi nhận. Thánh chỉ ban xuống ngay trong ngày.":"Ngươi nhận ân, nhưng ghế trên đã đủ người; tấn phong phải chờ, còn Hoàng hậu thì đã biết ngươi muốn lên."},
  {n:"Đổi bằng thứ khác",wx:"Hoàng hậu nới ước",lx:"bạc mất, ước còn",rt:"Hoàng hậu nhận lễ, gật đầu.",rf:"Hoàng hậu nhận lễ, không gật."}]},
 c2:{h:"{v} được tấn phong",w:"v",need:["v"],if:A=>TT_VUP(A),t:"{v} được tấn phong, nay đứng trên ngươi. Nàng ghé cung ngươi khoe áo mới, như vô tình hỏi bao giờ đến lượt muội.",o:[
  {n:"Chúc mừng",wx:"giữ lễ",lx:"nuốt giận, cả cung thấy ngươi cúi trước {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cười, nụ cười đắc thắng."},
  {n:"Nhắc {v}: ghế cao thì gió lớn",wx:"{v} chột dạ",lx:"bị cho là ghen",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cười gượng.",rf:"{v} cười to hơn, kể khắp nơi."},
  {n:"Không tiếp",wx:"khỏi ngượng, ở yên trong cung",lx:"{v} kể khắp nơi ngươi cáo bệnh vì ghen",rt:"Ngươi cáo bệnh."}]},
 c3:{h:"{v} được khen",w:"v",need:["v"],if:A=>!TT_VUP(A),t:"Hoàng thượng khen {v} trước mặt lục cung, ban thêm bổng lộc. Lời khen ấy vốn đã đến lượt ngươi, nếu không có người giữ.",o:[
  {n:"Chúc mừng",wx:"giữ lễ",lx:"nuốt giận, cả cung thấy ngươi đứng sau {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận lời chúc, mắt liếc về phía Càn Ninh cung."},
  {n:"Tự xin Hoàng thượng một việc để lập công",wx:"ngài nhớ đến ngươi",lx:"lục cung thấy ngươi chen lên",rt:"Hoàng thượng giao ngươi lo yến thưởng hoa.",rf:"Hoàng thượng bảo việc ấy đã có người lo."},
  {n:"Không để tâm",wx:"lòng không gợn",lx:"Hoàng thượng quen không nhớ đến ngươi",rt:"Ngươi về cung thêu nốt bức bình phong."}]},
 t1:{h:"Cha nhắn",w:"dad",t:"Cha nhắn: “Ước là ước. Con nhịn một chút, nhà mình được cả.”",o:[
  {n:"Vâng lời cha",f:"keep",wx:"cha yên lòng",lx:"ngươi không yên; Hoàng thượng thấy ngươi lùi mãi",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Ngươi hồi: “Con biết.”"},
  {n:"Đáp: con không phải món hàng",f:"break",wx:"rõ lòng",lx:"cha giận, phủ thôi nói giúp ngươi",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha không hồi âm."},
  {n:"Đáp: con sẽ tìm cách khác",wx:"giữ được cả hai đầu",lx:"lời hứa nặng, tự gánh việc dò đường",rt:"Cha hồi: “Cẩn thận.”"}]},
 x1:{h:"Giữ hay phá",w:"hh",need:["hh"],t:()=>MATOVER()?`Thêm một ân tấn phong đến. Ngươi đã ở trên bậc ${MATRK()}; nhận thêm là chà đạp mật ước trước mặt Hoàng hậu.`:`Ân tấn phong đến. Nhận thì trong mắt Hoàng hậu, ngươi đã vượt bậc ${MATRK()}.`,o:[
  {n:"Giữ ước, chờ",e:["win","mid"],lx:"từ chối ân, Hoàng thượng phật ý",rt:"Hoàng hậu nợ ngươi thêm một lần. Nàng hứa sẽ trả.",rf:"Ngươi giữ ước, mà Hoàng hậu không cảm ơn."},
  {n:"Phá ước, nhận",e:["win","lose"],go:A=>MATUP(A),rt:A=>A.f.up?"Ngươi lên bậc, và Hoàng hậu không làm gì được.":"Ngươi nhận ân, nhưng ghế trên đã đủ người nên bậc chưa đổi. Hoàng hậu biết ngươi dám phá ước, mà không làm gì được.",rf:A=>A.f.up?"Ngươi lên bậc, Hoàng hậu bắt đầu trả đũa.":"Ngươi nhận ân, nhưng ghế trên đã đủ người nên bậc chưa đổi. Hoàng hậu bắt đầu trả đũa."},
  {n:"Xin Hoàng hậu tự đề cử ngươi",e:["win","lose"],rt:"Hoàng hậu tự tay đề cử ngươi. Ước được viết lại.",rf:"Hoàng hậu cười: “Muội đòi nhiều quá.”"}]},
 x2:{h:"Giữ hay phá",w:"emp",if:()=>!MATQ(),t:()=>MATOVER()?`Thêm một ân tấn phong đến. Trung cung cũ không còn, nhưng nhà mẹ đẻ của nàng vẫn giữ bản ước có dấu của cha ngươi. Ngươi đã ở trên bậc ${MATRK()}; nhận thêm là cho nhà ấy cớ tâu nhà ngươi kết bè.`:`Ân tấn phong đến. Trung cung cũ không còn, nhưng nhà mẹ đẻ của nàng vẫn giữ bản ước có dấu của cha ngươi. Nhận là vượt bậc ${MATRK()}, và nhà ấy có cớ tâu nhà ngươi kết bè.`,o:[
  {n:"Giữ ước, chờ",e:["win","mid"],lx:"từ chối ân, Hoàng thượng phật ý",rt:"Nhà mẹ đẻ Trung cung cũ thấy nhà ngươi giữ chữ tín, gửi trả bản ước về phủ cha.",rf:"Ngươi giữ ước, mà nhà ấy vẫn giữ bản ước làm con bài."},
  {n:"Phá ước, nhận",e:["win","lose"],go:A=>MATUP(A),rt:A=>A.f.up?"Ngươi lên bậc. Nhà ấy định đem bản ước ra, nhưng không ai còn muốn nghe.":"Ngươi nhận ân, nhưng ghế trên đã đủ người nên bậc chưa đổi. Nhà ấy định đem bản ước ra, nhưng không ai còn muốn nghe.",rf:A=>A.f.up?"Ngươi lên bậc, và nhà ấy đem bản ước rêu rao khắp các phủ.":"Ngươi nhận ân, nhưng ghế trên đã đủ người nên bậc chưa đổi; nhà ấy vẫn đem bản ước rêu rao khắp các phủ."},
  {n:"Nhờ cha chuộc lại bản ước",e:["win","lose"],rt:"Cha đem bạc chuộc lại bản ước. Từ nay không ai cầm được nó.",rf:"Nhà ấy nhận bạc mà không trả ước, còn rêu rao nhà ngươi chột dạ."}]}},
 E:{win:{tag:"Ước được nới",w:"hh",t:()=>MATQ()?"Hoàng hậu và ngươi tìm được một chỗ đứng chung. Bậc của ngươi không còn bị giữ.":"Bản ước không còn là sợi dây trói ngươi. Bậc của ngươi không còn bị giữ."},
  mid:{tag:"Giữ ước",t:()=>MATQ()?"Ngươi giữ ước. Hoàng hậu yên tâm. Ngươi đứng yên.":"Ngươi giữ ước. Nhà mẹ đẻ Trung cung cũ thôi dọa. Ngươi đứng yên."},
  lose:{tag:()=>MATQ()?"Hoàng hậu trả đũa":"Bản ước bị đem ra rêu rao",t:()=>MATQ()?"Hoàng hậu bắt đầu gạt ngươi ra khỏi những việc của Trung cung.":"Nhà mẹ đẻ Trung cung cũ rêu rao rằng nhà ngươi từng kết bè với Trung cung năm trước."}}});

rdDef("tt_mat",7,{t:"Hoàng hậu thử lòng",w:"hh",sj:"việc Hoàng hậu giao",cast(A){return rdCast(A,["v"])},
 g:()=>MATQ()?"Hoàng hậu {hh} giao ngươi lo lễ Thân tằm mùa xuân — lễ của Trung cung, Hoàng hậu dẫn lục cung hái dâu. Làm tốt là trung với ước; làm quá tốt là lấn Trung cung.":"Trung cung không còn chủ. Hoàng thượng giao ngươi lo lễ Thân tằm mùa xuân — lễ của Trung cung. Mẫu thân Trung cung cũ được mời dự lễ, và nhà bà vẫn giữ bản ước. Làm tốt là trọng chữ tín; làm quá tốt là lấn Trung cung cũ.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Nhận việc",w:"hh",need:["hh"],if:RDW(1),t:"Hoàng hậu giao việc trước mặt cả lục cung, khen ngươi chu đáo. Mấy phi tần nhìn nhau: được tin là được thử.",o:[
  {n:"Nhận, xin Hoàng hậu chỉ bảo",wx:"Hoàng hậu vui",lx:"làm dưới tay nàng, công lớn cũng thành công của Trung cung",rt:"Hoàng hậu gật đầu, chỉ cho ngươi từng bước lễ."},
  {n:"Nhận, tự lo trọn",wx:"tỏ tài trước lục cung",lx:"Sức −, Hoàng hậu thấy bị qua mặt",rt:"Ngươi nhận và tự lo từ giỏ dâu đến khay tơ."},
  {n:"Xin cùng {v} lo",wx:"chia gánh, chia rủi ro",lx:"Hoàng hậu thấy ngươi đùn việc",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0])},rt:"Hoàng hậu cho {v} giúp ngươi.",rf:"Hoàng hậu nói: một người lo là đủ."}]},
 s2:{h:"Việc khó",w:"hh",need:["hh"],if:RDW(0),t:"Hoàng hậu giao việc lễ Thân tằm — năm trước người lo việc này bị phạt vì trời mưa giữa lễ. Ai cũng hiểu đây là cái bẫy hay phép thử.",o:[
  {n:"Nhận, chuẩn bị kỹ",wx:"lo trước mọi đường",lx:"tốn bạc dựng lều che mưa",rt:"Ngươi cho dựng lều che mưa sẵn bên vườn dâu."},
  {n:"Xin Khâm thiên giám xem ngày",wx:"chọn được ngày nắng",lx:"Khâm thiên giám không dám nói, chuyện ngươi sợ mưa lan khắp cung",rt:"Khâm thiên giám chọn ngày.",rf:"Khâm thiên giám không dám nói."},
  {n:"Nhận, không lo xa",wx:"không tốn bạc, không tốn sức lo trước",lx:"nếu trời mưa, lễ hỏng và ngươi chịu tiếng",rt:"Trời nắng. Ngươi nhận việc nhẹ tênh.",rf:"Mưa đổ giữa lễ; ngươi chịu tiếng lo việc qua loa."}]},
 s3:{h:"Nhận việc thay Trung cung",w:"emp",if:()=>!MATQ(),t:"Hoàng thượng giao ngươi lo lễ Thân tằm năm nay. Mẫu thân Trung cung cũ cũng được mời, và bà ngồi đó như người giữ sổ cũ của Trung cung.",o:[
  {n:"Nhận, mời bà cùng xem lễ",wx:"bà thấy nhà ngươi trọng Trung cung cũ",lx:"nhường chỗ, lục cung thấy ngươi cúi trước một bà phu nhân",rt:"Bà nhận lời, ngồi xem lễ ở hàng đầu."},
  {n:"Nhận, tự lo trọn",wx:"tỏ tài trước lục cung",lx:"Sức −, bà thấy nhà ngươi lấn Trung cung cũ",rt:"Ngươi nhận và tự lo từ giỏ dâu đến khay tơ."},
  {n:"Xin Khâm thiên giám xem ngày",wx:"chọn được ngày nắng",lx:"Khâm thiên giám không dám nói, chuyện ngươi sợ mưa lan khắp cung",rt:"Khâm thiên giám chọn ngày.",rf:"Khâm thiên giám không dám nói."}]},
 c1:{h:"Tơ tằm",w:"maid",need:["hh"],t:"Nội vụ phủ đưa tơ tằm kém, sợi thô và vàng. Phải đổi, nhưng đổi thì phải qua tay Hoàng hậu.",o:[
  {n:"Xin Hoàng hậu cho đổi",wx:"đúng lệ",lx:"Hoàng hậu bảo dùng tạm, lễ kém dưới tay ngươi",rt:"Hoàng hậu cho đổi.",rf:"Hoàng hậu bảo dùng tạm."},
  {n:"Tự bỏ bạc mua tơ tốt",wx:"lễ đẹp",lx:"tốn bạc, Hoàng hậu thấy ngươi vượt quyền",rt:"Tơ tốt về kịp."},
  {n:"Dùng tạm",wx:"giữ lệ, Hoàng hậu không phật ý",lx:"tơ kém, lễ kém, người xem chê",rt:"Ngươi dùng tơ cũ."}]},
 c2:{h:"{v} phá đám",w:"v",need:["v"],t:"Sáng ngày lễ, người của {v} làm đổ giỏ dâu trước giờ dâng.",o:[
  {n:"Có sẵn giỏ thay",wx:"lễ không gián đoạn",lx:"tốn bạc giỏ dâu dự phòng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Giỏ dâu mới được mang ra."},
  {n:"Bắt người làm đổ",wx:"có người chịu tội",lx:"người ấy chạy mất, buổi lễ ầm ĩ vì ngươi",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Người làm đổ khai là người của {v}.",rf:"Người ấy chạy mất."},
  {n:"Bỏ qua",wx:"không gây chuyện ngày lễ",lx:"lễ thiếu nửa giỏ dâu, người xem chê",rt:"Lễ dùng nửa giỏ."}]},
 c3:{h:"Tơ tằm",w:"maid",if:()=>!MATQ(),t:"Nội vụ phủ đưa tơ tằm kém, sợi thô và vàng. Trung cung không có chủ, muốn đổi phải tâu Hoàng thượng.",o:[
  {n:"Tâu xin đổi",wx:"đúng lệ",lx:"Hoàng thượng bảo dùng tạm, lễ kém dưới tay ngươi",rt:"Hoàng thượng cho đổi.",rf:"Hoàng thượng bảo dùng tạm."},
  {n:"Tự bỏ bạc mua tơ tốt",wx:"lễ đẹp",lx:"tốn bạc",rt:"Tơ tốt về kịp."},
  {n:"Dùng tạm",wx:"khỏi chạy vạy",lx:"tơ kém, lễ kém, mẫu thân Trung cung cũ chê",rt:"Ngươi dùng tơ cũ."}]},
 t1:{h:"Thái hậu đến xem",w:"th",need:["th","hh"],t:"Thái hậu bất ngờ đến xem lễ, khen ngươi trước mặt Hoàng hậu.",o:[
  {n:"Tạ ơn, nói công là của Hoàng hậu",wx:"Hoàng hậu được thể diện",lx:"nhường công, cả cung không biết ngươi lo",rt:"Hoàng hậu nhìn ngươi, gật đầu nhẹ."},
  {n:"Nhận lời khen",wx:"Thái hậu nhớ ngươi",lx:"Hoàng hậu mất mặt trước Thái hậu",rt:"Thái hậu cười. Hoàng hậu cũng cười, nhưng không nhìn ngươi."},
  {n:"Cúi đầu im",wx:"không lấn ai",lx:"Thái hậu thấy ngươi nhạt, Thái hậu: thiện cảm −",rt:"Ngươi chỉ cúi đầu."}]},
 /* cast guard: no Thái hậu or no Hoàng hậu → the Emperor praises her (pool never empty) */
 t2:{h:"Lời khen giữa lễ",w:"emp",if:()=>!MATQ()||S.thDead,t:"Hoàng thượng ghé vườn dâu, khen ngươi lo lễ chu đáo trước mặt lục cung.",o:[
  {n:"Tạ ơn, nói công là của mọi người",wx:"lục cung không ghen",lx:"nhường công, không ai nhớ ngươi lo",rt:"Hoàng thượng gật đầu, lục cung dịu mặt."},
  {n:"Nhận lời khen",wx:"Hoàng thượng nhớ ngươi",lx:"nhận hết công, lục cung ghen",rt:"Hoàng thượng cười, ban ngươi một khay tơ."},
  {n:"Cúi đầu im",wx:"không lấn ai",lx:"Hoàng thượng thấy ngươi nhạt, Sủng −",rt:"Ngươi chỉ cúi đầu."}]},
 x1:{h:"Lễ Thân tằm",w:"hh",need:["hh"],t:"Ngày lễ. Hoàng hậu dẫn lục cung hái dâu, ngươi lo việc. Một sơ suất là của ngươi; một thành công là của ai?",o:[
  {n:"Lo trọn, để Hoàng hậu nổi bật",e:["win","mid"],lx:"nhường công cho Trung cung",rt:"Lễ trọn vẹn. Hoàng hậu được khen. Hoàng hậu biết nhờ ai.",rf:"Lễ ổn, không ai để ý ngươi."},
  {n:"Lo trọn, để mình nổi bật",e:["win","lose"],rt:"Cả cung nhắc tên ngươi. Hoàng hậu cười nhạt mà không bắt được lỗi.",rf:"Ngươi nổi bật, Hoàng hậu thấy bị lấn."},
  {n:"Lo vừa đủ",wx:"Sức +",e:"mid",lx:"lễ qua đi, không ai nhớ ngươi",rt:"Lễ qua đi."}]},
 x2:{h:"Lễ Thân tằm",w:"emp",if:()=>!MATQ(),t:"Ngày lễ. Không có Hoàng hậu dẫn đầu, lục cung hái dâu theo ngươi. Mẫu thân Trung cung cũ ngồi xem, chờ một sơ suất.",o:[
  {n:"Lo trọn, mời bà dâng giỏ dâu đầu",e:["win","mid"],lx:"nhường công cho nhà Trung cung cũ",rt:"Lễ trọn vẹn. Bà dâng giỏ dâu đầu, mắt đỏ hoe, và nhìn ngươi khác hẳn.",rf:"Lễ ổn, bà vẫn lạnh nhạt."},
  {n:"Lo trọn, để mình nổi bật",e:["win","lose"],rt:"Cả cung nhắc tên ngươi. Bà ngồi xem mà không bắt được lỗi.",rf:"Ngươi nổi bật, bà về kể khắp các phủ rằng nhà Tể tướng lấn Trung cung cũ."},
  {n:"Lo vừa đủ",wx:"Sức +",e:"mid",lx:"lễ qua đi, không ai nhớ ngươi",rt:"Lễ qua đi."}]}},
 E:{win:{tag:"Qua phép thử",w:"hh",t:()=>MATQ()?"Hoàng hậu tin ngươi giữ ước mà vẫn có tài. Nàng bắt đầu giao việc thật.":"Nhà mẹ đẻ Trung cung cũ thấy nhà ngươi trọng chữ tín mà vẫn có tài. Bà thôi đem bản ước ra dọa."},
  mid:{tag:"Lễ qua đi",t:()=>MATQ()?"Lễ qua đi. Hoàng hậu vẫn chưa tin hẳn.":"Lễ qua đi. Bản ước vẫn nằm trong tay nhà ấy."},
  lose:{tag:"Lấn Trung cung",t:()=>MATQ()?"Hoàng hậu thấy ngươi muốn nổi hơn nàng.":"Nhà mẹ đẻ Trung cung cũ rêu rao rằng ngươi muốn ngồi ghế của con gái họ."}}});

rdDef("tt_mat",8,{t:"Mật ước mới",w:"v",sj:"kẻ muốn chen vào mật ước",cast(A){return rdCast(A,["v"])},
 g:()=>MATQ()?"{v} đã biết đủ về mật ước để đòi một chỗ. Nàng muốn cùng Hoàng hậu viết một mật ước mới, và gạt nhà ngươi ra.":"{v} đã biết đủ về mật ước. Nàng muốn mua bản ước từ nhà mẹ đẻ Trung cung cũ để nắm thóp nhà ngươi.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"{v} lui tới Càn Ninh cung",w:"v",need:["hh"],if:RDW(1),t:"{v} lui tới Càn Ninh cung mỗi ngày, mang theo khi thì trà, khi thì kinh chép tay. Hoàng hậu bắt đầu gọi nàng là “muội muội”.",o:[
  {n:"Cũng lui tới",wx:"giữ chỗ bên Trung cung",lx:"Hoàng hậu thấy hai người tranh nhau",rt:"Hoàng hậu cũng gọi ngươi là muội muội.",rf:"Hoàng hậu lạnh nhạt."},
  {n:"Dò {v} mang gì đến",wx:"biết giá {v} trả",lx:"bị biết, {v} kể ngươi rình rập",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} hứa nhà nàng sẽ đứng sau Hoàng hậu giữ ngôi Trung cung.",rf:"Không ra gì."},
  {n:"Để mặc",wx:"không chen vào Càn Ninh cung",lx:"{v} chiếm chỗ, Hoàng hậu quen gọi nàng trước ngươi",rt:"Ngươi không động."}]},
 s2:{h:"Ngươi bị gạt ra",w:"v",need:["hh"],if:RDW(0),t:"Hoàng hậu bắt đầu giao việc cho {v} thay ngươi. Các phi tần thấp phẩm đổi đường thỉnh an.",o:[
  {n:"Tìm việc khác để giữ thể diện",wx:"không mất mặt",lx:"xa Trung cung thêm",rt:"Ngươi xin lo việc chép kinh cầu phúc."},
  {n:"Gặp Hoàng hậu",wx:"lấy lại chỗ",lx:"bị coi là ghen",rt:"Hoàng hậu nói: “Muội nghĩ nhiều rồi.”",rf:"Hoàng hậu không tiếp."},
  {n:"Nắm thóp {v}",wx:"có bài trong tay",lx:"không ra gì, lại mang tiếng bới chuyện nhà người",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Nhà {v} từng nhận lễ của một quan muối.",rf:"Không có gì."}]},
 s3:{h:"{v} gửi lễ ra ngoài",w:"v",if:()=>!MATQ(),t:"{v} gửi lễ đều đặn ra nhà mẹ đẻ Trung cung cũ, qua tay người nhà nàng. Mẫu thân Trung cung cũ bắt đầu nhắc tên nàng mỗi khi vào cung thỉnh an.",o:[
  {n:"Cũng gửi lễ qua tay cha",wx:"giữ chỗ với nhà ấy",lx:"hai nhà đua lễ, thành chuyện cười",rt:"Bà nhận lễ của nhà ngươi trước.",rf:"Bà nhận cả hai, không hứa gì."},
  {n:"Dò {v} gửi gì ra",wx:"biết giá {v} trả",lx:"bị biết, {v} kể ngươi rình rập",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} hứa nhà nàng sẽ lo cho nhà ấy một ghế ở triều.",rf:"Không ra gì."},
  {n:"Để mặc",wx:"không đua lễ",lx:"{v} chiếm chỗ, nhà ấy quen nghe nàng",rt:"Ngươi không động."}]},
 c1:{h:"Cha bị bỏ rơi",w:"dad",need:["hh"],t:"Hoàng hậu thôi che chở cha trên triều. Một tờ sớ hặc cha lọt qua.",o:[
  {n:"Xin Hoàng hậu giữ ước",wx:"ước còn hiệu lực",lx:"Hoàng hậu lạnh, nói ước đã hết",rt:"Hoàng hậu cho người rút sớ.",rf:"Hoàng hậu nói ước đã hết."},
  {n:"Tự lo cho cha",wx:"cha thoát",lx:"sớ vẫn lên, bạc mất mà cha vẫn bị hặc",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Sớ bị gác.",rf:"Sớ vẫn lên."},
  {n:"Để cha tự lo",wx:"không phải chạy vạy",lx:"cha bị phạt bổng, phủ mất mặt",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha bị phạt bổng."}]},
 c2:{h:"Bản mật ước cũ",w:"hh",need:["hh"],t:"Ngươi vẫn giữ bản sao mật ước cũ. Nếu lộ, cả Hoàng hậu lẫn cha đều mang tiếng kết bè.",o:[
  {n:"Giữ làm bài cuối",wx:"có bài cuối",lx:"giữ là ôm mầm họa: Hoàng hậu đoán ngươi còn giữ, sinh nghi",rt:"Ngươi cất kỹ trong ngăn kín."},
  {n:"Đốt",wx:"sạch tay",lx:"mất bài, mưu sau phải tính lại từ đầu",rt:"Bản sao cháy."},
  {n:"Cho Hoàng hậu biết ngươi giữ",wx:"Hoàng hậu dè chừng",lx:"Hoàng hậu thấy bị dọa",rt:"Hoàng hậu im lặng, rồi gạt {v} sang một bên.",rf:"Hoàng hậu giận."}]},
 c3:{h:"Cha mất chỗ dựa",w:"dad",if:()=>!MATQ(),t:"Trung cung cũ không còn để che chở cha trên triều. Một tờ sớ hặc cha lọt qua.",o:[
  {n:"Xin Hoàng thượng xét kỹ",wx:"sớ bị gác",lx:"Hoàng thượng thấy ngươi bàn việc triều",rt:"Hoàng thượng gác sớ.",rf:"Hoàng thượng để Ngự sử đài xét."},
  {n:"Tự lo cho cha",wx:"cha thoát",lx:"sớ vẫn lên, bạc mất mà cha vẫn bị hặc",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Sớ bị gác.",rf:"Sớ vẫn lên."},
  {n:"Để cha tự lo",wx:"không phải chạy vạy",lx:"cha bị phạt bổng, phủ mất mặt",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha bị phạt bổng."}]},
 t1:{h:"Ba người một bàn",w:"hh",need:["hh"],t:"Hoàng hậu mời cả ngươi và {v} dùng trà. Nàng muốn xem ai nhường ai.",o:[
  {n:"Nhường {v}",wx:"tiếng rộng lượng",lx:"{v} được thế, Hoàng hậu nghiêng về nàng",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} ngạc nhiên."},
  {n:"Không nhường",wx:"giữ chỗ",lx:"cãi nhau trước Hoàng hậu, nàng cho cả hai lui",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cúi đầu trước.",rf:"Hoàng hậu cho cả hai lui."},
  {n:"Đề nghị ba người cùng ước",wx:"không ai bị gạt",lx:"{v} phản đối, ngươi mất mặt trước Hoàng hậu",rt:"Hoàng hậu cười: “Muội khéo thật.”",rf:"{v} phản đối."}]},
 t2:{h:"Hai nhà một bàn",w:"v",if:()=>!MATQ(),t:"Mẫu thân Trung cung cũ vào cung thỉnh an, mời cả ngươi và {v} dùng trà. Bà muốn xem nhà nào trả giá cao hơn cho bản ước.",o:[
  {n:"Nhường {v}",wx:"tiếng rộng lượng",lx:"{v} được thế, bà nghiêng về nàng",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} ngạc nhiên."},
  {n:"Không nhường",wx:"giữ chỗ",lx:"cãi nhau trước mặt bà, bà đứng dậy cáo lui",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cúi đầu trước.",rf:"Bà đứng dậy cáo lui."},
  {n:"Nói thẳng: bản ước không bán",wx:"bà thấy nhà ngươi không sợ",lx:"bà phật ý, {v} cười",rt:"Bà im lặng rất lâu, rồi gật đầu.",rf:"Bà cười nhạt."}]},
 x1:{h:"Ai ở lại",w:"hh",need:["hh"],t:"Hoàng hậu quyết: mật ước mới sẽ viết với nhà nào.",o:[
  {n:"Giành lại chỗ",e:["win","lose"],rt:"Hoàng hậu giữ nhà ngươi, gạt {v}.",rf:"Hoàng hậu chọn {v}."},
  {n:"Để {v} vào, giữ phần nhỏ",wx:"không ai bị gạt hẳn",e:["mid","lose"],rt:"Ba nhà chung ước, nhà ngươi phần nhỏ.",rf:"Nhà ngươi bị gạt hẳn."},
  {n:"Rút khỏi ước",e:"mid",lx:"mất chỗ dựa Trung cung, triều thấy nhà ngươi lùi",rt:"Ngươi xin rút."}]},
 x2:{h:"Ai giữ bản ước",w:"v",if:()=>!MATQ(),t:"Nhà mẹ đẻ Trung cung cũ quyết: bản ước sẽ vào tay nhà nào.",o:[
  {n:"Giành lại bản ước",e:["win","lose"],rt:"Bản ước về tay nhà ngươi. {v} ra về tay trắng.",rf:"Bản ước vào tay nhà {v}."},
  {n:"Để {v} cùng giữ một bản sao",wx:"không ai bị gạt hẳn",e:["mid","lose"],rt:"Mỗi nhà giữ một bản, không ai nắm hẳn.",rf:"Nhà ngươi bị gạt hẳn."},
  {n:"Rút khỏi chuyện ước",e:"mid",lx:"mất bài, triều thấy nhà ngươi lùi",rt:"Ngươi nhắn cha thôi đòi bản ước."}]}},
 E:{win:{tag:"Giữ chỗ trong ước",w:"hh",t:()=>MATQ()?"Hoàng hậu giữ nhà ngươi. {v} ra về tay trắng, và nhớ mặt ngươi.":"Bản ước nằm trong tay nhà ngươi. {v} ra về tay trắng, và nhớ mặt ngươi.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Chia ước",t:()=>MATQ()?"Mật ước có thêm người. Nhà ngươi vẫn ở trong, nhưng không còn là duy nhất.":"Bản ước có thêm người giữ. Nhà ngươi không còn là nhà duy nhất cầm nó."},
  lose:{tag:"Bị gạt khỏi ước",t:()=>MATQ()?"Hoàng hậu viết ước mới với nhà {v}. Cha ngươi mất chỗ dựa.":"Bản ước vào tay nhà {v}. Cha ngươi bị nắm thóp.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_mat",9,{t:"Ba mặt một lời",w:"hh",sj:"cuộc gặp giữa ngươi, cha và Hoàng hậu",cast(A){return rdCast(A,["v"])},
 g:()=>MATQ()?"Nhân một buổi thọ yến trong cung, ngươi, {dad} và Hoàng hậu {hh} có một khắc ngồi riêng ở Noãn các. Ai cũng nói thật một nửa.":"Nhân một buổi thọ yến trong cung, ngươi, {dad} và mẫu thân Trung cung cũ có một khắc ngồi riêng ở Noãn các. Ai cũng nói thật một nửa.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Thọ yến",w:"emp",need:["hh"],if:RDW(1),t:"Hoàng thượng cho ngươi ngồi gần trong yến. Hoàng hậu và cha đều nhìn thấy.",o:[
  {n:"Mời cha và Hoàng hậu ra Noãn các",wx:"ngươi là người mời",lx:"họ không đến đủ, ngươi ngồi chờ trước mắt bao người",rt:"Cả hai đến.",rf:"Chỉ cha đến."},
  {n:"Chờ họ tìm ngươi",wx:"giữ thế",lx:"Hoàng hậu phải đi tìm ngươi, nàng phật ý",rt:"Hoàng hậu tìm ngươi trước."},
  {n:"Nhờ Thái hậu sắp chỗ",need:["th"],wx:"có Thái hậu che",lx:"Thái hậu thấy ngươi làm phiền",rt:"Thái hậu cười, sai người dẫn cả ba ra Noãn các.",rf:"Thái hậu không để ý."}]},
 s2:{h:"Bị gọi đến",w:"hh",need:["hh"],if:RDW(0),t:"Hoàng hậu gọi ngươi và cha ra Noãn các giữa thọ yến. Ngươi đến muộn một bước.",o:[
  {n:"Xin lỗi, ngồi xuống",wx:"giữ lễ",lx:"họ đã nói trước, ngươi chỉ nghe phần còn lại",rt:"Họ ngừng nói khi ngươi đến."},
  {n:"Hỏi họ đã nói gì",wx:"không bị gạt",lx:"Hoàng hậu cho là ngươi hỗn",rt:"Cha kể lại.",rf:"Hoàng hậu cười."},
  {n:"Đứng nghe",wx:"nghe trọn từng chữ",lx:"đứng suốt buổi, không ai mời ngồi",rt:"Ngươi đứng nghe."}]},
 s3:{h:"Thọ yến",w:"dad",if:()=>!MATQ(),t:"Thọ yến trong cung. Mẫu thân Trung cung cũ được mời dự; cha đứng chờ ở hành lang Noãn các.",o:[
  {n:"Mời cha và bà ra Noãn các",wx:"ngươi là người mời",lx:"họ không đến đủ, ngươi ngồi chờ trước mắt bao người",rt:"Cả hai đến.",rf:"Chỉ cha đến."},
  {n:"Chờ họ tìm ngươi",wx:"giữ thế",lx:"bà phải đi tìm ngươi, phật ý",rt:"Bà tìm ngươi trước."},
  {n:"Nhờ Thái hậu sắp chỗ",need:["th"],wx:"có Thái hậu che",lx:"Thái hậu thấy ngươi làm phiền",rt:"Thái hậu cười, sai người dẫn cả ba ra Noãn các.",rf:"Thái hậu không để ý."}]},
 c1:{h:"Cha nói dối",w:"dad",need:["hh"],t:"Cha nói với Hoàng hậu rằng ngươi không biết gì về mật ước.",o:[
  {n:"Im lặng giữ lời cha",wx:"cha được việc",lx:"Hoàng hậu biết ngươi biết, thấy ngươi nói dối theo cha",rt:"Hoàng hậu nhìn ngươi, không nói."},
  {n:"Nói thật ngươi biết",wx:"Hoàng hậu thấy ngươi thật",lx:"cha mất mặt; hỏng thì cả hai cùng giận",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Hoàng hậu gật đầu.",rf:"Cha đỏ mặt."},
  {n:"Đổi chủ đề",wx:"kéo câu chuyện khỏi chỗ hiểm",lx:"chuyện dở dang, Hoàng hậu thấy ngươi lảng",rt:"Ngươi nói chuyện thọ yến."}]},
 c2:{h:"Hoàng hậu nói dối",w:"hh",need:["hh"],t:"Hoàng hậu nói nàng chưa từng gặp {v} bàn chuyện ước.",o:[
  {n:"Nhắc khéo",wx:"Hoàng hậu biết ngươi biết",lx:"Hoàng hậu thấy bị bắt bài",rt:"Hoàng hậu cười: “Muội tinh thật.”",rf:"Hoàng hậu lạnh mặt."},
  {n:"Để vậy",wx:"giữ hòa khí",lx:"không ai dò tiếp, tin về {v} ở Càn Ninh cung bị bỏ",rt:"Ngươi không nói."},
  {n:"Hỏi thẳng",wx:"rõ ràng",lx:"phạm thượng",rt:"Hoàng hậu thừa nhận.",rf:"Hoàng hậu đứng dậy."}]},
 c3:{h:"Bà nói một nửa",w:"dad",if:()=>!MATQ(),t:"Mẫu thân Trung cung cũ nói bà đã đốt bản ước. Cha nhìn ngươi: ai cũng biết bà chưa đốt.",o:[
  {n:"Nhắc khéo",wx:"bà biết ngươi biết",lx:"bà thấy bị bắt bài, về kể các phủ",rt:"Bà cười: “Nương nương tinh thật.”",rf:"Bà lạnh mặt."},
  {n:"Để vậy",wx:"giữ hòa khí",lx:"không ai dò tiếp, bản ước vẫn nằm đâu đó",rt:"Ngươi không nói."},
  {n:"Xin cha hỏi thẳng",wx:"rõ ràng",lx:"bà phật ý, cho là nhà ngươi hỗn",rt:"Bà thừa nhận còn giữ.",rf:"Bà đứng dậy."}]},
 t1:{h:"Một nửa sự thật của ngươi",w:"hh",need:["hh"],t:"Đến lượt ngươi. Ngươi giữ bài gì, lộ bài gì.",o:[
  {n:"Lộ ra ngươi giữ bản sao",wx:"cả hai phải nể",lx:"Hoàng hậu thấy bị dọa",rt:"Cả hai im lặng rất lâu.",rf:"Hoàng hậu nói: “Muội đang dọa ta?”"},
  {n:"Nói ngươi chỉ muốn yên",wx:"họ yên tâm",lx:()=>MATOVER()?"không giành gì, tờ ước cũ vẫn còn đó để người ta nhắc":"không giành gì, ước cũ vẫn giữ ngươi dưới bậc",rt:"Cha thở ra."},
  {n:"Nói ngươi muốn ước mới, ngươi là một bên",wx:"được nhìn như người ngang hàng",lx:"cả hai không vui, Hoàng hậu cho là ngươi tham",rt:"Hoàng hậu gật đầu chậm.",rf:"Cha mắng ngươi hỗn."}]},
 t2:{h:"Một nửa sự thật của ngươi",w:"dad",if:()=>!MATQ(),t:"Đến lượt ngươi. Ngươi giữ bài gì, lộ bài gì.",o:[
  {n:"Lộ ra ngươi giữ bản sao",wx:"cả hai phải nể",lx:"bà thấy bị dọa",rt:"Cả hai im lặng rất lâu.",rf:"Bà nói: “Nương nương đang dọa nhà ta?”"},
  {n:"Nói ngươi chỉ muốn yên",wx:"họ yên tâm",lx:()=>MATOVER()?"không giành gì, tờ ước cũ vẫn còn đó để người ta nhắc":"không giành gì, ước cũ vẫn giữ ngươi dưới bậc",rt:"Cha thở ra."},
  {n:"Nói ngươi muốn ước mới, ngươi là một bên",wx:"được nhìn như người ngang hàng",lx:"cả hai không vui, bà cho là ngươi tham",rt:"Bà gật đầu chậm.",rf:"Cha mắng ngươi hỗn."}]},
 x1:{h:"Ba bên",w:"hh",need:["hh"],t:"Thọ yến sắp tàn. Một lời cuối quyết định ba bên đứng đâu.",o:[
  {n:"Đề nghị ba bên viết lại ước",e:["win","lose"],rt:"Ba người cùng gật đầu. Ước mới có tên ngươi.",rf:"Hoàng hậu bỏ ra trước."},
  {n:"Để cha và Hoàng hậu quyết",wx:"cha và Trung cung yên lòng",e:["mid","lose"],rt:"Ước cũ giữ nguyên.",rf:"Họ quyết gạt ngươi ra."},
  {n:"Rút lui",e:"mid",lx:"ước viết tiếp mà không có ý ngươi",rt:"Ngươi xin về chỗ."}]},
 x2:{h:"Ba bên",w:"dad",if:()=>!MATQ(),t:"Thọ yến sắp tàn. Một lời cuối quyết định nhà ngươi và nhà Trung cung cũ đứng đâu.",o:[
  {n:"Đề nghị ba bên viết lại ước",e:["win","lose"],rt:"Bà, cha và ngươi cùng gật đầu. Ước mới có tên ngươi.",rf:"Bà bỏ ra trước."},
  {n:"Để cha và bà quyết",wx:"cha yên lòng",e:["mid","lose"],rt:"Ước cũ giữ nguyên.",rf:"Họ quyết gạt ngươi ra."},
  {n:"Rút lui",e:"mid",lx:"ước viết tiếp mà không có ý ngươi",rt:"Ngươi xin về chỗ."}]}},
 E:{win:{tag:"Ngươi có tên trong ước",w:"hh",t:"Từ nay ngươi là một bên của mật ước, không còn là món hàng."},
  mid:{tag:"Ước cũ giữ nguyên",t:()=>(MATOVER()?"Ước cũ giữ nguyên. Ngươi đã vượt bậc ước, nhưng tờ ước vẫn còn đó":"Ước cũ giữ nguyên. Ngươi vẫn đứng dưới bậc ước")+(MATQ()?", cha vẫn có Trung cung che.":", còn cha thì không còn Trung cung nào che.")},
  lose:{tag:"Bị gạt ra",t:()=>MATQ()?"Cha và Hoàng hậu quyết mà không có ngươi. Ngươi ra khỏi Noãn các như người ngoài.":"Cha và mẫu thân Trung cung cũ quyết mà không có ngươi. Ngươi ra khỏi Noãn các như người ngoài.",go:(_A,G)=>e67dad(G[0])}}});

rdDef("tt_mat",10,{t:"Giữ hay phá",w:"hh",sj:"số phận của mật ước",cast(A){return rdCast(A,["v"])},
 g:()=>MATQ()?"Ngôi Trung cung lung lay vì một chuyện khác. Mật ước giờ có thể cứu Hoàng hậu, hoặc chôn nàng. Cứu hay chôn, một nửa nằm trong tay ngươi.":"Trung cung bỏ trống, triều bàn người lên ngôi. Bản mật ước có thể làm nhà ngươi mang tiếng kết bè với Trung cung cũ, hoặc làm chứng nhà ngươi trung. Đường nào, một nửa nằm trong tay ngươi.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Hoàng hậu cần ngươi",w:"hh",need:["hh"],if:RDW(1),t:"Hoàng hậu bị hặc là không hiền. Nàng nhắn: “Theo ước, nhà muội phải đứng sau bản cung.”",o:[
  {n:"Giữ ước, đứng sau",f:"keep",wx:"Hoàng hậu nợ ngươi lớn",lx:"cùng thuyền: Hoàng thượng thấy nhà ngươi đứng sau người đang bị hặc",rt:"Ngươi nhắn cha đứng sau Hoàng hậu."},
  {n:"Đòi thêm",f:"break",wx:"được giá",lx:"Hoàng hậu thấy bị ép",rt:"Hoàng hậu hứa nới bậc cho ngươi.",rf:"Hoàng hậu giận."},
  {n:"Chờ xem",wx:"chưa trói mình vào ai",lx:"Hoàng hậu thấy bị bỏ lúc cần",rt:"Ngươi chưa trả lời."}]},
 s2:{h:"Hoàng hậu sa cơ",w:"hh",need:["hh"],if:RDW(0),t:()=>MATVOUT()?"Hoàng hậu bị hặc. {v}, kẻ từng bị gạt khỏi ước, đứng ngoài cười.":"Hoàng hậu bị hặc. Nhà {v} — bên mới trong ước — đã rút lui.",o:[
  {n:"Đứng ra giữ nàng",f:"keep",wx:"Hoàng hậu nhớ ơn",lx:"đứng cạnh người sắp đổ; hỏng thì Hoàng thượng thấy ngươi bênh người bị hặc",rt:"Hoàng hậu cầm tay ngươi.",rf:"Lời ngươi chìm giữa những tờ sớ hặc."},
  {n:"Đứng ngoài",wx:"không dính vào",lx:"Hoàng hậu nhớ ngươi đứng ngoài lúc nàng sa cơ",rt:"Ngươi đứng ngoài."},
  {n:"Đẩy thêm",f:"break",wx:"Trung cung trống thế",lx:"bị lần ra thì mang tiếng bán đứng người cùng ước",rt:"Ngươi để lọt một chuyện cũ.",rf:"Bị lần ra."}]},
 s3:{h:"Triều bàn Trung cung",w:"dad",if:()=>!MATQ(),t:"Cha nhắn: triều đang bàn người lên ngôi Trung cung. Nhà mẹ đẻ Trung cung cũ đòi nhà ta đứng sau người họ chọn, nếu không họ đem bản ước ra.",o:[
  {n:"Nghe họ, đứng sau người họ chọn",f:"keep",wx:"nhà ấy thôi dọa",lx:"Hoàng thượng thấy nhà ngươi bị người ngoài dắt",rt:"Cha gật đầu với nhà ấy."},
  {n:"Đòi lại bản ước trước",f:"break",wx:"được giá",lx:"nhà ấy thấy bị ép, rêu rao trước",rt:"Nhà ấy hứa trả bản ước khi việc xong.",rf:"Nhà ấy giận."},
  {n:"Chờ xem",wx:"chưa trói mình vào ai",lx:"nhà ấy thấy bị lờ",rt:"Ngươi chưa trả lời."}]},
 c1:{h:"Cha muốn bán ước",w:"dad",need:["hh"],t:"Cha thấy Hoàng hậu sắp đổ, muốn đem mật ước dâng Hoàng thượng để lấy công.",o:[
  {n:"Ngăn cha",f:"keep",wx:"giữ chữ tín",lx:"cha không nghe, giận ngươi cản đường nhà",go:(A,ok,G)=>{if(!ok)e67dad(G[0])},rt:"Cha gác lại.",rf:"Cha không nghe."},
  {n:"Để cha làm",f:"break",wx:"cha có công với vua",lx:"bội ước, Hoàng hậu biết nhà ngươi bán nàng",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha chuẩn bị tấu."},
  {n:"Tự mình quyết thay cha",wx:"việc trong tay ngươi",lx:"Sức −, từ nay bản ước là việc của ngươi",rt:"Cha giao bản ước cho ngươi."}]},
 c2:{h:"{v} cũng cầm dao",w:"v",need:["v"],t:()=>MATVOUT()?"{v} không có tên trong ước, nhưng nàng biết đủ để tâu. Nàng chờ ai ra tay trước.":"{v} cũng có một bản ước — nàng đã ký cùng Trung cung. Nàng chờ ai ra tay trước.",o:[
  {n:"Giành lấy thứ {v} đang cầm",wx:"chỉ còn ngươi cầm dao",lx:"{v} giấu kỹ, lại biết ngươi đang săn",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Thứ {v} cầm vào tay ngươi.",rf:"{v} giấu kỹ."},
  {n:"Bắt tay {v}",wx:"cùng cầm dao, cùng giữ",lx:"{v} từ chối, kể khắp nơi ngươi đến cầu",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận.",rf:"{v} từ chối."},
  {n:"Mặc",wx:"không động dao",lx:"{v} ra tay trước, nói nhà ngươi giấu ước",rt:"Ngươi để vậy."}]},
 c3:{h:"Cha muốn dâng ước",w:"dad",if:()=>!MATQ(),t:"Cha muốn đem bản ước dâng Hoàng thượng để tỏ nhà mình trung, trước khi nhà Trung cung cũ kịp dùng nó.",o:[
  {n:"Ngăn cha",f:"keep",wx:"giữ chữ tín với Trung cung cũ",lx:"cha không nghe, giận ngươi cản đường nhà",go:(A,ok,G)=>{if(!ok)e67dad(G[0])},rt:"Cha gác lại.",rf:"Cha không nghe."},
  {n:"Để cha làm",f:"break",wx:"cha có công với vua",lx:"bội ước, nhà Trung cung cũ thù nhà ngươi",go:(_A,_ok,G)=>e67dad(G[0]),rt:"Cha chuẩn bị tấu."},
  {n:"Tự mình quyết thay cha",wx:"việc trong tay ngươi",lx:"Sức −, từ nay bản ước là việc của ngươi",rt:"Cha giao bản ước cho ngươi."}]},
 t1:{h:"Đêm cuối",w:"emp",need:["hh"],t:"Hoàng thượng hỏi: “Nàng có biết gì về Hoàng hậu mà trẫm nên biết?”",o:[
  {n:"Không, thưa Hoàng thượng",f:"keep",wx:"giữ ước",lx:"giấu vua; nếu sau này lộ, ngài nhớ đêm nay",rt:"Hoàng thượng gật đầu."},
  {n:"Có, và kể",f:"break",wx:"vua tin ngươi",lx:"bội ước, Hoàng hậu sẽ biết ai đã kể",go:A=>{A.f.told=1},rt:"Hoàng thượng nghe đến hết."},
  {n:"Thần thiếp không nên nói",wx:"giữ phận phi tần",lx:"vua đoán ngươi biết mà giấu",rt:"Hoàng thượng nhìn ngươi rất lâu."}]},
 t2:{h:"Đêm cuối",w:"emp",if:()=>!MATQ(),t:"Hoàng thượng hỏi: “Nhà nàng và nhà Trung cung cũ có điều gì trẫm nên biết?”",o:[
  {n:"Không, thưa Hoàng thượng",f:"keep",wx:"giữ ước",lx:"giấu vua; nếu sau này lộ, ngài nhớ đêm nay",rt:"Hoàng thượng gật đầu."},
  {n:"Có, và kể",f:"break",wx:"vua tin ngươi",lx:"bội ước, nhà ấy sẽ biết ai đã kể",go:A=>{A.f.told=1},rt:"Hoàng thượng nghe đến hết."},
  {n:"Thần thiếp không nên nói",wx:"giữ phận phi tần",lx:"vua đoán ngươi biết mà giấu",rt:"Hoàng thượng nhìn ngươi rất lâu."}]},
 x1:{h:"Giữ hay phá",w:"hh",need:["hh"],t:"Ngày triều đình định chuyện Trung cung. Mật ước nằm trong tay ngươi.",o:[
  {n:"Giữ ước, cứu Hoàng hậu",e:["win","lose"],rt:"Hoàng hậu giữ được ngôi. Nàng nợ ngươi cả đời.",rf:"Ngươi giữ ước mà Hoàng hậu vẫn bị phạt."},
  {n:"Phá ước, dâng vua",e:["win","lose"],rt:"Hoàng thượng thấy ngươi trung. Trung cung lung lay.",rf:"Hoàng thượng thấy ngươi là kẻ bán đứng người cùng ước."},
  {n:"Đốt ước",e:"mid",lx:"không ai được gì",rt:"Ngươi đốt mật ước."}]},
 x2:{h:"Giữ hay phá",w:"emp",if:()=>!MATQ(),t:"Ngày triều đình định người lên ngôi Trung cung. Bản ước nằm trong tay ngươi.",o:[
  {n:"Giữ ước, đứng sau nhà Trung cung cũ",e:["win","lose"],rt:"Nhà ấy giữ được thể diện. Họ nợ nhà ngươi cả đời.",rf:"Ngươi giữ ước, mà nhà ấy vẫn bị gạt ra."},
  {n:"Phá ước, dâng vua",e:["win","lose"],rt:"Hoàng thượng thấy ngươi trung. Nhà Trung cung cũ mất chỗ đứng.",rf:"Hoàng thượng thấy ngươi là kẻ bán đứng người cùng ước."},
  {n:"Đốt ước",e:"mid",lx:"không ai được gì",rt:"Ngươi đốt mật ước."}]}},
 E:{win:{tag:"Cầm số phận Trung cung",w:"hh",t:()=>MATQ()?"Dù giữ hay phá, từ nay Trung cung biết ai đã quyết.":"Dù giữ hay phá, từ nay cả triều biết ai đã quyết chuyện Trung cung."},
  mid:{tag:"Ước thành tro",t:"Mật ước không còn. Không ai nợ ai."},
  lose:{tag:"Mất cả hai phía",t:()=>MATQ()?"Hoàng hậu không tin, Hoàng thượng không trọng.":"Nhà Trung cung cũ không tin, Hoàng thượng không trọng."}}});

rdDef("tt_mat",11,{t:"Kết mật ước",w:"hh",sj:"mật ước sau cùng",cast(A){return rdCast(A,["v"])},
 g:()=>MATQ()?"Mật ước đi đến hồi kết. Hoàng hậu {hh}, {dad} và ngươi: ai giữ được gì. Đây là kết cục truyện xuất thân của ngươi.":"Mật ước đi đến hồi kết. Nhà Trung cung cũ, {dad} và ngươi: ai giữ được gì. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Hoàng hậu mời",w:"hh",need:["hh"],if:RDW(1),t:"Hoàng hậu mời ngươi đến Càn Ninh cung. Lần đầu tiên nàng tự tay rót trà cho ngươi.",o:[
  {n:"Nhận trà",wx:"hòa với Trung cung",lx:"cả cung thấy ngươi là người của Hoàng hậu",rt:"Hai người uống trà trong im lặng."},
  {n:"Rót lại cho nàng",wx:"ngang hàng mà vẫn đủ lễ",lx:"Hoàng hậu thấy bị lấn",rt:"Hoàng hậu cười.",rf:"Hoàng hậu nhìn tay ngươi, không nói."},
  {n:"Hỏi nàng muốn gì",wx:"rõ lòng Trung cung",lx:"hỏi thẳng Trung cung là thất lễ",rt:"Hoàng hậu nói: “Một tri kỷ trong cung.”"}]},
 s2:{h:"Hoàng hậu không mời",w:"hh",need:["hh"],if:RDW(0),t:"Đã nửa năm Hoàng hậu không nhìn ngươi trong những buổi thỉnh an.",o:[
  {n:"Đến thỉnh an như thường",wx:"giữ lễ",lx:"ngày nào cũng đến mà không được nhìn",rt:"Hoàng hậu nhận lễ."},
  {n:"Gửi thư",wx:"nàng đọc thư",lx:"thư không có hồi âm, cung nhân biết ngươi bị làm ngơ",rt:"Hoàng hậu hồi một chữ: “Đến.”",rf:"Thư không có hồi âm."},
  {n:"Thôi",wx:"khỏi nhọc lòng",lx:"Trung cung quên ngươi",rt:"Ngươi không tìm nữa."}]},
 s3:{h:"Hộp trà từ nhà Trung cung cũ",w:"dad",if:()=>!MATQ(),t:"Mẫu thân Trung cung cũ gửi vào cung một hộp trà, kèm lời: “Chuyện cũ, nhà ta muốn khép.”",o:[
  {n:"Nhận trà, hồi lễ",wx:"hai nhà hòa",lx:"tốn bạc hồi lễ",rt:"Bà nhận lễ hồi, nhắn lời cảm tạ."},
  {n:"Mời bà vào cung nói chuyện",wx:"nói được điều thư không nói",lx:"bà cáo bệnh, cung nhân biết ngươi mời hụt",rt:"Bà vào cung, ngồi với ngươi đến xế chiều.",rf:"Bà cáo bệnh không vào."},
  {n:"Không đáp",wx:"khỏi nhọc lòng",lx:"nhà ấy cho là nhà ngươi kiêu",rt:"Ngươi cất hộp trà, không hồi âm."}]},
 c1:{h:"Cha già",w:"dad",t:"Cha xin cáo lão. Mật ước sẽ theo ông về quê, hoặc ở lại với ngươi.",o:[
  {n:"Giữ lại",wx:"có bài trong tay",lx:()=>MATQ()?"ôm mầm họa: phải giấu kỹ, và Hoàng hậu biết ngươi giữ bản ước":"ôm mầm họa: phải giấu kỹ, và nhà Trung cung cũ biết ngươi giữ bản ước",rt:"Cha đưa ngươi bản ước."},
  {n:"Để cha mang về",wx:"nhẹ lòng",lx:"bản ước về quê, ngươi không còn bài",rt:"Cha mang về."},
  {n:"Đốt trước mặt cha",wx:"sạch nợ",lx:"đốt rồi thì không còn gì làm chứng cho nhà ngươi",rt:"Cha nhìn lửa, gật đầu."}]},
 c2:{h:"{v} hỏi",w:"v",need:["v"],t:"{v} chặn ngươi ở hành lang: “Rốt cuộc muội được gì từ cái ước ấy?”",o:[
  {n:"Đáp thật",wx:"{v} thấy ngươi thật lòng",lx:"nói thật là lộ bài với {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} lặng đi."},
  {n:"Cười không đáp",wx:"giữ kín bài",lx:"{v} bỏ đi, kể ngươi kiêu",rt:"{v} bỏ đi."},
  {n:"Hỏi lại {v}",wx:"{v} cứng họng trước mọi người",lx:"{v} đáp được, ngươi mất mặt",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} không đáp được.",rf:"{v} cười: “Ta được nhiều hơn muội.”"}]},
 t1:{h:"Bậc của ngươi",w:"emp",t:()=>MATOVER()?`Ngươi đang ở bậc ${MATME()}. Ước từng muốn giữ ngươi không quá bậc ${MATRK()}, mà ngươi đã vượt.`:`Ngươi đang ở bậc ${MATME()}. Ước giữ ngươi không quá bậc ${MATRK()}.`,o:[
  {n:"Xin Hoàng hậu xóa điều khoản",need:["hh"],wx:"bậc của ngươi tự do",lx:"Hoàng hậu nói ước là ước, thấy ngươi đòi",rt:"Hoàng hậu gật đầu.",rf:"Hoàng hậu nói: “Ước là ước.”"},
  {n:"Nhờ cha xin nhà Trung cung cũ xóa điều khoản",if:()=>!MATQ(),wx:"bậc của ngươi tự do",lx:"nhà ấy nói ước là ước, rêu rao nhà ngươi đòi",rt:"Nhà ấy gật đầu, trả lại bản ước.",rf:"Nhà ấy nói: “Ước là ước.”"},
  {n:"Không cần ai cho phép",need:["hh"],wx:"tự đi đường mình",lx:"Hoàng hậu không vui, thấy ngươi coi thường ước",rt:"Ngươi không nhắc."},
  {n:"Không cần ai cho phép",if:()=>!MATQ(),wx:"tự đi đường mình",lx:"nhà Trung cung cũ rêu rao ngươi coi thường ước",rt:"Ngươi không nhắc."},
  {n:"Giữ bậc như ước",if:()=>!MATOVER(),wx:"chữ tín",lx:"đứng yên ở bậc ước, Hoàng thượng thôi nhắc tấn phong",rt:"Ngươi giữ."}]},
 x1:{h:"Hồi kết",w:"hh",need:["hh"],t:"Hoàng hậu hỏi: “Từ nay muội và ta là gì của nhau?”",o:[
  {n:"Là tri kỷ",lx:"tri kỷ thì phải buông bài trong tay",e:["win","mid"],rt:"Hoàng hậu nắm tay ngươi. Từ nay Trung cung là chỗ dựa của ngươi.",rf:"Hoàng hậu cười buồn: “Tri kỷ trong cung, khó lắm.”"},
  {n:"Là hai người ngồi cùng bàn cờ",e:["win","lose"],rt:"Hoàng hậu cười: “Vậy thì ta chơi với muội.”",rf:"Hoàng hậu nói: “Bàn cờ chỉ có một người thắng.”"},
  {n:"Là người dưng",e:["mid","lose"],rt:"Hoàng hậu gật đầu: “Vậy thì mỗi người một đường.”",rf:"Hoàng hậu gật đầu, và từ đó coi ngươi là người phải đề phòng."}]},
 x2:{h:"Hồi kết",w:"dad",if:()=>!MATQ(),t:"Mẫu thân Trung cung cũ vào cung lần cuối, hỏi: “Từ nay nhà ta và nhà nương nương là gì của nhau?”",o:[
  {n:"Là hai nhà tri kỷ",lx:"tri kỷ thì phải buông bài trong tay",e:["win","mid"],rt:"Bà nắm tay ngươi. Từ nay nhà ấy là chỗ dựa của nhà ngươi.",rf:"Bà cười buồn: “Tri kỷ giữa hai nhà, khó lắm.”"},
  {n:"Là hai nhà ngồi cùng bàn cờ",e:["win","lose"],rt:"Bà cười: “Vậy thì nhà ta chơi với nhà nương nương.”",rf:"Bà nói: “Bàn cờ chỉ có một người thắng.”"},
  {n:"Là người dưng",e:["mid","lose"],rt:"Bà gật đầu: “Vậy thì mỗi nhà một đường.”",rf:"Bà gật đầu, và từ đó nhà ấy coi nhà ngươi là kẻ phải đề phòng."}]}},
 E:{win:{tag:()=>MATQ()?"Trung cung là chỗ dựa":"Nhà Trung cung cũ là chỗ dựa",w:"hh",t:()=>MATQ()?"Mật ước khép lại. Hoàng hậu và ngươi đứng chung. Cha về quê yên lòng.":"Mật ước khép lại. Nhà Trung cung cũ và nhà ngươi đứng chung. Cha về quê yên lòng.",go:(_A,G)=>e67dad(G[0])},
  mid:{tag:"Mật ước khép lại",t:"Mật ước không còn ràng buộc ai. Ngươi tự đi đường mình."},
  lose:{tag:()=>MATQ()?"Trung cung thành đối thủ":"Nhà Trung cung cũ thành đối thủ",t:()=>MATQ()?"Hoàng hậu coi ngươi là đối thủ. Cha mất chỗ dựa trên triều.":"Nhà Trung cung cũ coi nhà ngươi là đối thủ. Cha mất chỗ dựa trên triều.",go:(_A,G)=>e67dad(G[0])}}});
/* rare finale (road-history item 3): the Hoàng hậu, ill or without a child, RECOMMENDS; the Emperor only remembers it. Reward = hh bond + the
   flag S.st.f14.tienloi (Trung cung tiến lời) for ch13 «Tranh ngôi Trung cung" — never the seat itself (OD:L1250 rank earned).
   The text reads which of the two (ill / childless) is true in this life (review road-b1-r1 item 1c). */
RD97L.push(rdRare({a:"tt_mat_11",tag:"Hoàng hậu tiến lời, Hoàng thượng ghi nhớ",w:"hh",n:"Xin Hoàng hậu cùng dâng sớ xóa mật ước trước Hoàng thượng",
 path:["Giữ ước","Tạ ơn, không hỏi","Lo trọn, để Hoàng hậu nổi bật","Giữ ước, cứu Hoàng hậu","Là tri kỷ","Đề nghị ba bên"],bad:["Phá ước","Đẩy thêm","Cho người lẻn vào"],
 x:[()=>S.hh>=RR("tt_mat_11").bar&&TT_HHWEAK(),"Hoàng hậu quý ngươi từ "+RR("tt_mat_11").bar+", và Trung cung đang bệnh hoặc không có con"],
 t:()=>TT_HHILL()?"Hoàng hậu bệnh đã lâu, ho khan suốt mùa đông. Nàng cùng ngươi quỳ trước Hoàng thượng, dâng mật ước làm chứng lòng trung và xin xóa. Ngài đọc rồi cười: “Hai nàng giấu trẫm lâu thế.” Hoàng hậu tâu: nếu một ngày nàng không còn, người nên ngồi ghế ấy là ngươi. Hoàng thượng chỉ nói: “Trẫm nhớ lời nàng.”":"Hoàng hậu không có con nối dõi, lễ Phật cầu tự bao năm không thành. Nàng cùng ngươi quỳ trước Hoàng thượng, dâng mật ước làm chứng lòng trung và xin xóa. Ngài đọc rồi cười: “Hai nàng giấu trẫm lâu thế.” Hoàng hậu tâu: nếu một ngày Trung cung phải nhường ghế, người nên ngồi ghế ấy là ngươi. Hoàng thượng chỉ nói: “Trẫm nhớ lời nàng.”",go:(_A,G)=>{try{S.st.f14.tienloi=1}catch(e){}return e67dad(G[0])},rw:"nt_dongchau",ti:"Người được Trung cung tiến lời"}));
