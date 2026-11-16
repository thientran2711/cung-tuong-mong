/* ================= jrd_tt: the four full roads of «Con gái Tể tướng» (tt), chapters .5–.11 (ROAD_MAP.md §4.1) =================
   Pilot origin of jroad.js. Same arc shape as j67 (p = pools of hồi: mở đầu / rắc rối / bước ngoặt / cao trào; B = hồi; E = kết cục).
   Openings read how the chapter before ended (rdK: 1 won, 0 middle, −1 lost), so the same road does not read the same twice (OD:L1253).
   The road's people are cast once and carried (rdCast). Hostile roles are real both ways (relAdd / oanAdd, OD:L1247). */
const rdRel=(A,k,n)=>{const v=rv67(A,k);if(v)relAdd(S,v,n);return v};
const rdOan=(A,k,n)=>{const v=rv67(A,k);if(v)oanAdd(v,S,n);return v};
const RDW=k=>()=>rdK()>0===(k>0)&&(k>0||rdK()<=0);/* opening filter: RDW(1) after a won chapter, RDW(0) after a middle or lost one */

/* ---------- tt_co · Quân cờ trong tay cha ---------- */
rdDef("tt_co",5,{t:"Môn sinh của cha",w:"dad",sj:"môn sinh của phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Môn sinh của {dad} ngồi khắp lục bộ. Người thì gõ cửa cung ngươi xin một lời nói giúp, kẻ thì chỉ nghe lệnh cha. Ai là người của ngươi, ai là tai mắt của cha, phải tự phân.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Môn sinh đến cửa",w:"dad",if:RDW(1),t:"Từ ngày phủ Tể tướng nghe theo ngươi, một Thị lang bộ Hộ lén gửi lễ vào cung: hắn muốn ngươi nhắc tên hắn khi Thượng thư cáo lão.",o:[
  {n:"Nhận lễ, hứa nói giúp",c:{duc:-3},w:{bac:60},wx:"có thêm một người trong bộ Hộ",lx:"nhận lễ là để lại dấu",f:"buy",rt:"Thị lang cúi đầu tạ ơn, từ nay việc bộ Hộ đều qua tai ngươi."},
  {n:"Trả lễ, bảo hắn tự lập công",c:{},w:{duc:3,danh:2},wx:"tiếng thanh liêm",lx:"hắn quay về nương cha",f:"clean",rt:"Ngươi trả lễ nguyên phong. Hắn đỏ mặt lui ra."},
  {n:"Thử tài hắn bằng một việc nhỏ",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"own",wx:"biết người dùng được",l:{danh:-2},lx:"hắn làm hỏng việc, tiếng xấu vương lên ngươi",rt:"Hắn làm việc gọn gàng, không để lại dấu.",rf:"Hắn khoe khắp bộ rằng có người trong cung chống lưng."}]},
 s2:{h:"Cha không hỏi ý ngươi nữa",w:"dad",if:RDW(0),t:"Thư nhà thưa dần. Ngươi nghe tin {dad} đã gả cháu gái cho con một Thượng thư, kết thêm một nhà thông gia mà không báo ngươi một lời.",o:[
  {n:"Viết thư hỏi cha",c:{suc:-2},o:A=>40+(A.f.own?0:10)+S.danh/5,w:{danh:2},sc:1,wx:"cha nhớ ra ngươi còn hữu dụng",lx:"cha đáp lạnh nhạt",rt:"Cha hồi thư dài, kể cả những điều chưa từng kể.",rf:"Cha chỉ gửi lại một chữ “Biết”."},
  {n:"Tự kết giao với nhà thông gia mới",c:{bac:-40},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"own",wx:"một nhà quyền thần biết đến ngươi",l:{sung:-3},lx:"cha cho là ngươi đi sau lưng ông",rt:"Phu nhân nhà Thượng thư vào cung thỉnh an ngươi.",rf:"Nhà ấy khéo léo từ chối."},
  {n:"Để mặc cha",c:{},w:{duc:2},wx:"lòng yên",lx:"ngoài triều không ai nhắc tên ngươi",f:"cold",rt:"Ngươi gấp thư lại, không hồi âm."}]},
 c1:{h:"Một môn sinh nhận hối lộ",w:"dad",t:"Ngự sử bắt được một môn sinh của cha nhận hối lộ. Hắn nói hắn là người “của nương nương trong cung”.",o:[
  {n:"Chối thẳng, để luật xử hắn",c:{},w:{duc:4},wx:"giữ tay sạch",lx:"cha mất một người, trách ngươi",f:"clean",rt:"Hắn bị cách chức. Ngự sử khen ngươi biết giữ phép."},
  {n:"Bỏ bạc lo cho hắn thoát",c:{bac:-60,duc:-3},o:()=>45+S.mat*5,sc:1,f:"buy",wx:"hắn nợ ngươi cả đời",l:{danh:-5},lx:"bị lộ là ngươi che tham quan",rt:"Án được xử nhẹ, hắn bị điều về huyện xa.",rf:"Ngự sử dâng sớ nhắc đến cung ngươi."},
  {n:"Bắt hắn khai ai đứng sau",c:{suc:-4},o:()=>40+S.tamco/3,w:{tamco:3},sc:1,f:"own",wx:"nắm thóp kẻ khác trong phủ",l:{sung:-3},lx:"phủ cha bị khuấy động",rt:"Hắn khai ra một quản gia của cha ăn chặn.",rf:"Hắn cắn lưỡi không khai, cả phủ sợ ngươi."}]},
 c2:{h:"{v} dò la thư nhà",w:"v",need:["v"],t:"{v} cho người làm thân với cung nữ đưa thư của ngươi. Nàng muốn biết phủ Tể tướng đang tính gì.",o:[
  {n:"Đổi người đưa thư",c:{bac:-20},w:{mat:1},wx:"thư nhà kín đáo",lx:"{v} biết ngươi đã đề phòng",f:"clean",go:A=>{rdOan(A,"v",5)},rt:"Đường thư được thay, {v} mất dấu."},
  {n:"Để {v} đọc thư giả",c:{suc:-3},o:()=>45+S.tamco/3,w:{tamco:3},sc:1,f:"own",wx:"{v} đi sai nước",l:{danh:-3},lx:"thư giả bị nhận ra",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"{v} tin thư giả, dâng lời sai trước mặt Hoàng thượng.",rf:"{v} biết bị lừa."},
  {n:"Hẹn gặp {v} nói thẳng",c:{},o:()=>35+S.danh/4,w:{duc:2},sc:1,wx:"hai bên hiểu nhau",l:{sung:-2},lx:"{v} cười nhạt",go:(A,ok)=>{rdRel(A,"v",ok?12:-8)},rt:"{v} lặng đi, hứa không đụng đến thư nhà ngươi.",rf:"{v} nói: “Muốn yên thì bảo cha ngươi lui.”"}]},
 t1:{h:"Ai là người của ai",w:"dad",t:"Quản gia của cha lén báo: trong mười môn sinh thì sáu người thật lòng theo cha, ba người theo ai trả nhiều hơn, một người là tai mắt của Hoàng hậu.",o:[
  {n:"Xin danh sách mười người",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,wx:"biết ai dùng được",l:{danh:-2},lx:"cha biết quản gia nói với ngươi",rt:"Quản gia đưa danh sách, có cả tên kẻ hai lòng.",rf:"Quản gia bị cha đuổi về quê."},
  {n:"Báo cha diệt kẻ hai lòng",c:{},w:{danh:2},wx:"cha tin ngươi",lx:"Hoàng hậu mất một tai mắt, sẽ tìm ra ai",f:"obey",rt:"Kẻ hai lòng bị đẩy ra khỏi phủ."},
  {n:"Giữ im, chờ dùng sau",c:{},w:{tamco:2},wx:"cầm một lá bài",lx:"không làm gì thì không ai mang ơn",rt:"Ngươi ghi tên kẻ ấy vào sổ riêng."}]},
 x1:{h:"Lại bộ trống ghế",w:"dad",t:"Thượng thư bộ Lại cáo lão. Cha muốn ghế ấy cho môn sinh của ông; Hoàng thượng hỏi ý ngươi về một người ngoài phủ.",o:[
  {n:"Tiến cử môn sinh của chính ngươi",c:{suc:-5},o:A=>35+(A.f.own?15:0)+S.tamco/5,e:["win","lose"],rt:"Người của ngươi ngồi ghế Lại bộ.",rf:"Hoàng thượng thấy ngươi tham quyền."},
  {n:"Nói giúp người của cha",c:{hh:-5},o:A=>40+(A.f.obey?15:0)+S.sung/6,e:["mid","lose"],rt:"Môn sinh của cha nhận ấn.",rf:"Hoàng thượng chọn người khác."},
  {n:"Không nói, để Hoàng thượng tự chọn",c:{},w:{duc:4},e:"mid",lx:"không ai nợ ngươi",rt:"Ngươi chỉ cúi đầu: “Thiếp không dám bàn việc triều.”"}]}},
 E:{win:{k:1,tag:"Người của ngươi ở Lại bộ",w:"dad",t:"Từ nay có một người trong triều đi theo ngươi chứ không theo cha. Môn sinh cũ của phủ bắt đầu nhìn ngươi khác.",fx:{danh:6,tamco:2},go:()=>e67dad(4)},
  mid:{k:0,tag:"Ghế Lại bộ về tay cha",t:"Cha giữ được thế. Ngươi vẫn là quân cờ của ông, chỉ là quân cờ được nể hơn.",fx:{danh:2}},
  lose:{k:-1,tag:"Hoàng thượng nghi phủ Tể tướng",t:"Hoàng thượng chọn người ngoài, và từ đó nhìn ngươi như nhìn con gái Tể tướng, không phải như nhìn ái phi.",fx:{sung:-5,danh:-3},go:()=>e67dad(-4)}}});

rdDef("tt_co",6,{t:"Kẻ đọc trộm thư",w:"maid",sj:"kẻ đọc trộm thư nhà",cast(A){return rdCast(A,["v"])},
 g:"Có kẻ trong cung ngươi chép thư nhà đưa ra ngoài. Tìm ra nó, mà không để cả cung biết ngươi bị phản.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một lá thư đến tay người lạ",w:"maid",if:RDW(1),t:"Người của ngươi ở Lại bộ báo: có bản chép thư nhà của ngươi đang truyền tay trong triều. Chữ chép mới, mực còn thơm.",o:[
  {n:"Lặng lẽ cho người dò",c:{bac:-20},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"có manh mối",l:{danh:-2},lx:"kẻ chép biết bị dò",rt:"Bản chép là nét chữ của một cung nữ hầu mực.",rf:"Kẻ chép đốt hết giấy."},
  {n:"Đổi hết người hầu bút mực",c:{suc:-3},w:{mat:1},wx:"chặn ngay đường rò",lx:"người vô tội cũng bị đuổi",rt:"Ba cung nữ bị đưa đi chỗ khác."},
  {n:"Viết thư giả để nhử",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"own",wx:"nhử được kẻ ăn cắp",lx:"thư giả lọt ra ngoài thì cha mất mặt",rt:"Thư giả đi đúng đường cũ.",rf:"Thư giả lại đến tay cha."}]},
 s2:{h:"Cha trách ngươi lộ thư",w:"dad",if:RDW(0),t:"{dad} gửi thư trách: điều ông dặn riêng ngươi, nay cả triều đều biết. Ông cho là ngươi hớ hênh.",o:[
  {n:"Nhận lỗi, hứa tìm kẻ gian",c:{},w:{duc:2},wx:"cha nguôi giận",lx:"cha giữ lại một nửa điều muốn nói",rt:"Cha hồi thư ngắn: “Tìm cho ra.”"},
  {n:"Nói với cha có kẻ trong phủ ông",c:{suc:-2},o:()=>40+S.danh/4,sc:1,wx:"cha dò phía ông",l:{danh:-2},lx:"cha cho là ngươi đổ lỗi",rt:"Cha cho người canh lại người đưa thư.",rf:"Cha càng giận hơn."},
  {n:"Thôi viết thư nhà",c:{},w:{mat:1},wx:"không còn gì để lộ",lx:"cha con xa nhau thêm",f:"cold",rt:"Ngươi khóa nghiên mực lại."}]},
 c1:{h:"Cung nữ hầu mực",w:"maid",t:"Cung nữ hầu mực khóc lóc: nàng có mẹ già ngoài cung, có người trả bạc để nàng chép thư.",o:[
  {n:"Tha cho nàng, bắt nàng làm hai mang",c:{bac:-20},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"đường rò thành đường nhử",l:{mat:-1},lx:"nàng phản lần nữa",rt:"Nàng thề đưa thư nào ngươi bảo.",rf:"Nàng bỏ trốn khỏi cung."},
  {n:"Giao Thận hình ty xử",c:{},w:{danh:2},wx:"cả cung biết phép",lx:"kẻ đứng sau biết ngươi đã biết",rt:"Nàng bị đánh ba mươi trượng, đưa xuống Tân Giả khố."},
  {n:"Cho bạc nuôi mẹ nàng, giữ nàng ở lại",c:{bac:-40},w:{duc:3},wx:"nàng hết lòng với ngươi",lx:"tốn bạc",rt:"Nàng dập đầu đến rướm máu."}]},
 c2:{h:"Bạc từ cung nào",w:"v",need:["v"],t:"Bạc trả cho kẻ chép thư là bạc thỏi có dấu của cung {v}.",o:[
  {n:"Đưa thỏi bạc lên Hoàng hậu",c:{},o:()=>40+S.danh/4+S.hh/5,sc:1,wx:"{v} bị khiển trách",l:{hh:-4},lx:"Hoàng hậu thấy ngươi rắc rối",go:(A,ok)=>{rdOan(A,"v",ok?14:8)},rt:"Hoàng hậu phạt {v} chép kinh một tháng.",rf:"{v} nói thỏi bạc bị trộm từ trước."},
  {n:"Giữ thỏi bạc, chờ dịp",c:{},w:{tamco:2},sc:1,wx:"cầm chứng cứ trong tay",lx:"{v} chưa bị gì",rt:"Ngươi gói thỏi bạc trong khăn lụa."},
  {n:"Gửi trả thỏi bạc cho {v}",c:{},w:{duc:2},wx:"{v} biết ngươi không muốn gây",lx:"{v} cho là ngươi sợ",go:A=>{rdRel(A,"v",6)},rt:"{v} nhận lại, không nói gì."}]},
 t1:{h:"Kẻ thật sự trả bạc",w:"v",t:"Lần theo người đưa bạc, ngươi thấy {v} chỉ là người chuyển tay. Bạc gốc đến từ một phủ đối đầu với cha ngoài triều.",o:[
  {n:"Báo cha biết kẻ đối đầu",c:{},w:{danh:2},wx:"cha nợ ngươi một lần",lx:"triều đình thêm sóng",f:"obey",go:()=>e67dad(2),rt:"Cha gật đầu, ghi tên phủ ấy."},
  {n:"Tự nắm lấy manh mối",c:{suc:-3},w:{tamco:3},sc:1,f:"own",wx:"lá bài của riêng ngươi",lx:"cha không biết, không giúp được",rt:"Ngươi giữ kín tên phủ ấy."},
  {n:"Bỏ qua, chỉ giữ cung mình kín",c:{},w:{duc:2},wx:"yên chuyện",lx:"kẻ đứng sau còn đó",rt:"Ngươi khép cửa cung."}]},
 x1:{h:"Bắt tận tay",w:"v",t:"Đêm nay người của {v} sẽ đến lấy bản chép cuối cùng. Ngươi có thể bắt tận tay, hoặc để nó đi.",o:[
  {n:"Cho thị vệ phục sẵn",c:{suc:-5},o:A=>40+A.sc*8+S.mat*4,e:["win","lose"],rt:"Người của {v} bị bắt cùng bản chép.",rf:"Kẻ đến lấy thư chạy thoát, chỉ còn lời ngươi nói."},
  {n:"Để nó lấy thư giả đi",c:{},o:A=>40+(A.f.own?15:0)+S.tamco/4,e:["win","mid"],rt:"Thư giả đến tay kẻ đứng sau, hắn đi sai một nước lớn.",rf:"Thư giả bị nhận ra, nhưng đường rò đã bị chặn."},
  {n:"Đóng cửa, không bắt ai",c:{},w:{duc:3},e:"mid",lx:"không ai bị trừng trị",rt:"Ngươi thôi viết thư, đường rò tự tắt."}]}},
 E:{win:{k:1,tag:"Bắt được kẻ đọc trộm thư",w:"v",t:"Người của {v} bị bắt tận tay. Từ nay chẳng ai dám đưa tay vào cung ngươi.",fx:{danh:5,mat:1},go:A=>{rdOan(A,"v",10);return ""}},
  mid:{k:0,tag:"Đường rò đã chặn",t:"Thư nhà kín lại, nhưng kẻ đứng sau vẫn chưa lộ mặt.",fx:{mat:1}},
  lose:{k:-1,tag:"Thư nhà lọt ra triều",t:"Một bức thư thật của cha lọt đến tay Ngự sử. Phủ Tể tướng bị dị nghị, và cha cho là lỗi tại ngươi.",fx:{danh:-4},go:()=>e67dad(-5)}}});

rdDef("tt_co",7,{t:"Lời đàn hặc",w:"emp",sj:"tờ sớ đàn hặc phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Ngự sử đài dâng sớ đàn hặc {dad} kết bè, mượn con gái trong cung để dò ý vua. Thư nhà của ngươi bị đem ra làm chứng. Giữ cha, hay giữ mình.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tờ sớ nêu tên ngươi",w:"emp",if:RDW(1),t:"Tờ sớ dẫn một câu trong thư cha gửi ngươi. Nhưng bức thư ấy chính là thư giả ngươi đã nhử kẻ gian.",o:[
  {n:"Tâu rõ đó là thư giả",c:{suc:-3},o:A=>45+A.sc*6+S.danh/5,sc:1,w:{danh:3},wx:"Ngự sử mất mặt",l:{sung:-4},lx:"Hoàng thượng thấy ngươi biết quá nhiều mưu",rt:"Hoàng thượng cười: “Cũng có tâm cơ.”",rf:"Hoàng thượng hỏi: “Sao ái phi lại phải viết thư giả?”"},
  {n:"Im lặng, để cha tự giải",c:{},w:{duc:2},wx:"không dính vào",lx:"cha một mình chống sớ",rt:"Cha dâng sớ tự biện."},
  {n:"Nhờ người ở Lại bộ lên tiếng",c:{bac:-30},o:()=>40+S.tamco/3,sc:1,f:"own",wx:"triều có người nói giúp",l:{danh:-3},lx:"lộ ngươi có người ở triều",rt:"Một Thị lang dâng sớ phản bác.",rf:"Ngự sử hặc luôn cả Thị lang."}]},
 s2:{h:"Tờ sớ nêu tên ngươi",w:"emp",if:RDW(0),t:"Tờ sớ dẫn nguyên một bức thư thật của cha gửi ngươi. Hoàng thượng đọc xong, không triệu ngươi suốt mười ngày.",o:[
  {n:"Xin vào gặp, nhận lỗi",c:{suc:-3},o:()=>35+S.sung/3,sc:1,w:{sung:3},wx:"Hoàng thượng nguôi",l:{sung:-4},lx:"bị đuổi về",rt:"Hoàng thượng chỉ nói: “Lần sau đừng để trẫm đọc thư nhà của nàng trên triều.”",rf:"Cửa Dưỡng Tâm điện đóng."},
  {n:"Viết thư cắt nghĩa cho cha",c:{},w:{danh:1},wx:"cha biết ngươi không cố ý",lx:"thêm một bức thư, thêm một rủi ro",rt:"Cha hồi: “Không trách con.”"},
  {n:"Đóng cửa cung, chép kinh",c:{},w:{duc:3},wx:"tỏ lòng thành",lx:"chẳng ai nói giúp ngươi",rt:"Ngươi chép kinh suốt mười ngày."}]},
 c1:{h:"Ngự sử đến tận cửa",w:"emp",t:"Một vị Ngự sử già xin gặp người hầu của ngươi để hỏi chuyện thư từ. Theo lệ, hắn không được vào hậu cung, nhưng hắn có chiếu chỉ tra xét.",o:[
  {n:"Cho người hầu trả lời thật",c:{},w:{duc:3},wx:"tỏ ra không giấu gì",lx:"lời thật cũng có thể bị bóp méo",rt:"Ngự sử ghi chép rồi lui."},
  {n:"Dặn người hầu nói ít",c:{},o:()=>45+S.tamco/4,sc:1,w:{tamco:2},wx:"không lộ thêm điều gì",l:{danh:-3},lx:"Ngự sử cho là ngươi giấu",rt:"Ngự sử về tay không.",rf:"Ngự sử ghi: “Cung ấy khép miệng.”"},
  {n:"Biếu Ngự sử chút lễ",c:{bac:-50,duc:-3},o:()=>25+S.mat*4,sc:1,wx:"Ngự sử nhẹ tay",l:{danh:-6},lx:"hối lộ Ngự sử là tội nặng",rt:"Ngự sử nhận lễ, tờ tấu sau nhẹ hẳn.",rf:"Ngự sử dâng luôn lễ vật lên Hoàng thượng."}]},
 c2:{h:"{v} thêm dầu vào lửa",w:"v",need:["v"],t:"Trong buổi thỉnh an, {v} nói to: “Con gái nhà quyền thần, nằm bên gối vua mà lòng ở phủ cha.”",o:[
  {n:"Đáp lại sắc bén",c:{},o:()=>40+S.tai/4+S.danh/5,sc:1,w:{danh:3},wx:"cả điện nể ngươi",l:{danh:-3},lx:"thành ra cãi nhau trước Hoàng hậu",go:(A,ok)=>{rdOan(A,"v",8)},rt:"Ngươi đáp một câu, {v} đỏ mặt im lặng.",rf:"Hoàng hậu phạt cả hai."},
  {n:"Cúi đầu im lặng",c:{},w:{duc:3},wx:"giữ thể diện",lx:"lời gièm cứ thế lan",rt:"Ngươi chỉ khẽ nâng chén trà."},
  {n:"Sau buổi, tìm {v} nói chuyện riêng",c:{suc:-2},o:()=>35+S.duc/3,sc:1,wx:"{v} thôi gièm",l:{sung:-2},lx:"{v} càng hăng",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} thở dài: “Ta cũng chỉ là quân cờ của nhà ta.”",rf:"{v} quay lưng bỏ đi."}]},
 t1:{h:"Cha hỏi một câu",w:"dad",t:"Thư cha đến giữa đêm: “Nếu Hoàng thượng hỏi, con có nhận những thư ấy không?”",o:[
  {n:"Nhận, để giữ cha",c:{sung:-3},w:{danh:2},sc:1,f:"obey",wx:"cha thấy con hiếu thảo",lx:"Hoàng thượng thấy ngươi đứng về phía cha",rt:"Ngươi đáp: “Con nhận.”"},
  {n:"Không nhận, để giữ mình",c:{},w:{sung:2},f:"own",wx:"Hoàng thượng thấy ngươi biết phận",lx:"cha một mình gánh",go:()=>e67dad(-2),rt:"Ngươi đáp: “Con không biết những thư ấy.”"},
  {n:"Xin cha tự lui một bước",c:{suc:-3},o:()=>40+S.danh/4,sc:1,w:{duc:3},wx:"cả nhà còn đường lùi",l:{danh:-2},lx:"cha giận ngươi dạy ông",rt:"Cha im lặng hai ngày, rồi xin nghỉ phép dưỡng bệnh.",rf:"Cha xé thư."}]},
 x1:{h:"Hoàng thượng hỏi",w:"emp",t:"Hoàng thượng đặt tờ sớ trước mặt ngươi: “Nàng nói đi. Trẫm nghe.”",o:[
  {n:"Tâu thật, xin xử công bằng cho cha",c:{suc:-4},o:A=>40+A.sc*7+S.duc/5,e:["win","lose"],rt:"Hoàng thượng gật đầu: “Trẫm sẽ xét cho công bằng.” Tờ sớ được gác lại.",rf:"Hoàng thượng lặng thinh, rồi phạt bổng cha một năm."},
  {n:"Khéo léo đổ lỗi cho kẻ đọc trộm thư",c:{},o:A=>40+(A.f.own?10:0)+S.tamco/4,e:["win","mid"],rt:"Hoàng thượng truy kẻ chép thư, không truy cha.",rf:"Hoàng thượng chỉ nói: “Trẫm biết rồi.”"},
  {n:"Quỳ xin Hoàng thượng đừng hỏi",c:{sung:-4},w:{duc:2},e:"mid",lx:"chuyện không rõ trắng đen",rt:"Hoàng thượng phẩy tay cho ngươi lui."}]}},
 E:{win:{k:1,tag:"Tờ sớ bị gác lại",w:"emp",t:"Hoàng thượng thấy ngươi thẳng thắn. Ngự sử thôi hặc, cha được giữ ghế, và ông biết ai đã giữ cho ông.",fx:{sung:4,danh:4},go:()=>e67dad(3)},
  mid:{k:0,tag:"Sóng lặng mà chưa yên",t:"Tờ sớ chìm xuống, nhưng trong triều ai cũng nhớ: con gái Tể tướng có viết thư về phủ.",fx:{danh:-1}},
  lose:{k:-1,tag:"Cha bị phạt bổng",t:"Cha bị phạt bổng một năm, phủ Tể tướng mất mặt, và Hoàng thượng thôi kể chuyện triều chính với ngươi.",fx:{sung:-5,danh:-3},go:()=>e67dad(-6)}}});

rdDef("tt_co",8,{t:"Ái phi hay con gái Tể tướng",w:"emp",sj:"lòng ngươi đứng về phía ai",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng bắt đầu thử ngươi: những điều ngài nói bên gối có đến tai {dad} hay không. Mỗi lời ngươi giữ hay để lọt đều được ngài ghi nhớ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một tin giả bên gối",w:"emp",if:RDW(1),t:"Hoàng thượng nói như vô tình: “Trẫm định đưa Tể tướng đi trấn Lưỡng Quảng.” Ngươi đoán ngài đang thử.",o:[
  {n:"Giữ kín, không báo cha",c:{},w:{sung:3},wx:"Hoàng thượng tin ngươi",lx:"nếu là thật, cha bị bất ngờ",f:"own",rt:"Mười ngày sau, không ai ngoài cung nhắc chuyện Lưỡng Quảng."},
  {n:"Báo cha cẩn thận",c:{},o:()=>30+S.tamco/4,sc:1,f:"obey",wx:"cha đề phòng",l:{sung:-6},lx:"Hoàng thượng biết tin đã lọt",rt:"Cha dâng sớ khéo, không lộ là biết trước.",rf:"Cha vội dâng sớ xin ở lại kinh. Hoàng thượng mỉm cười lạnh."},
  {n:"Hỏi thẳng Hoàng thượng có thật không",c:{},o:()=>40+S.sung/4,sc:1,w:{sung:2},wx:"ngài thích sự thẳng thắn",l:{sung:-3},lx:"ngài thấy ngươi quá để tâm việc nhà",rt:"Hoàng thượng cười: “Không thật. Trẫm chỉ muốn xem nàng.”",rf:"Hoàng thượng không đáp."}]},
 s2:{h:"Hoàng thượng thôi kể chuyện triều",w:"emp",if:RDW(0),t:"Đã ba tháng Hoàng thượng không nhắc một lời việc triều khi ở cung ngươi. Ngài vẫn đến, nhưng chỉ nói chuyện hoa cỏ.",o:[
  {n:"Cũng chỉ nói chuyện hoa cỏ",c:{},w:{sung:2},wx:"ngài thấy nhẹ lòng",lx:"ngươi mù tịt việc triều",rt:"Hoàng thượng ở lại lâu hơn mọi khi."},
  {n:"Khéo hỏi một chuyện nhỏ",c:{},o:()=>35+S.tamco/4,sc:1,wx:"biết được hướng gió",l:{sung:-4},lx:"ngài thấy ngươi dò",rt:"Ngài kể một chuyện ở bộ Binh, không giấu.",rf:"Ngài đặt chén trà xuống: “Nàng hỏi cho ai?”"},
  {n:"Thưa thật: thiếp không muốn ngài nghi",c:{suc:-2},o:()=>40+S.duc/4,sc:1,w:{sung:3,duc:2},wx:"ngài cảm động",l:{sung:-2},lx:"ngài cho là lời khéo",rt:"Hoàng thượng nắm tay ngươi rất lâu.",rf:"Hoàng thượng chỉ gật đầu."}]},
 c1:{h:"Cha đòi tin",w:"dad",t:"{dad} nhắn: “Lễ bộ sắp mở kỳ tuyển tú. Con hỏi Hoàng thượng xem ngài muốn tuyển nhà nào.”",o:[
  {n:"Hỏi cho cha",c:{sung:-3},o:()=>40+S.sung/5,sc:1,f:"obey",wx:"cha có tin",l:{sung:-3},lx:"Hoàng thượng biết ngươi hỏi cho ai",go:()=>e67dad(2),rt:"Ngươi biết được hai nhà trong danh sách.",rf:"Hoàng thượng hỏi lại: “Ai muốn biết?”"},
  {n:"Đáp cha: con không hỏi được",c:{},w:{duc:2},f:"own",wx:"giữ lòng Hoàng thượng",lx:"cha lạnh nhạt",go:()=>e67dad(-1),rt:"Cha không hồi âm."},
  {n:"Hỏi Hoàng hậu thay vì hỏi vua",c:{hh:-3},o:()=>40+S.hh/4,sc:1,wx:"có tin mà không phạm vua",l:{hh:-4},lx:"Hoàng hậu biết nhà ngươi muốn chen",rt:"Hoàng hậu nói qua một câu, đủ để ngươi hiểu.",rf:"Hoàng hậu chỉ cười."}]},
 c2:{h:"{v} tâu chuyện thư nhà",w:"v",need:["v"],t:"{v} khóc trước Hoàng thượng: nàng sợ những điều ngài nói ở cung nàng cũng lọt ra như ở cung ngươi.",o:[
  {n:"Cầu Hoàng thượng tra cả hai cung",c:{suc:-3},o:()=>40+S.duc/4,sc:1,w:{danh:3},wx:"ngươi trong sạch",l:{danh:-3},lx:"tra ra chuyện cũ",go:(A,ok)=>{rdOan(A,"v",ok?10:4)},rt:"Tra xong, cung ngươi không có gì.",rf:"Tra ra một bức thư cũ của cha."},
  {n:"Nhẫn, không đáp",c:{},w:{duc:2},wx:"không thêm sóng",lx:"lời gièm ở lại trong lòng vua",rt:"Ngươi chỉ cúi đầu."},
  {n:"Kể một chuyện xấu của nhà {v}",c:{duc:-3},o:()=>40+S.mat*5,sc:1,wx:"{v} thôi lên tiếng",l:{sung:-4},lx:"thành ra hai cung đấu nhau",go:A=>{rdOan(A,"v",12)},rt:"{v} tái mặt, xin lui.",rf:"Hoàng thượng chán cả hai."}]},
 t1:{h:"Một lời thề",w:"emp",t:"Đêm khuya, Hoàng thượng hỏi khẽ: “Nếu một ngày trẫm và Tể tướng không đứng chung, nàng đứng bên nào?”",o:[
  {n:"Thiếp đứng bên Hoàng thượng",c:{},w:{sung:4},sc:1,f:"own",wx:"ngài nhớ lời này",lx:"lời thề thì phải giữ",rt:"Hoàng thượng không nói gì, chỉ kéo chăn đắp cho ngươi."},
  {n:"Thiếp xin ngài đừng bắt chọn",c:{},w:{duc:3},wx:"thật lòng",lx:"ngài thấy ngươi do dự",rt:"Hoàng thượng thở dài."},
  {n:"Cha thiếp cũng là bề tôi của ngài",c:{},o:()=>40+S.tai/4,sc:1,w:{danh:2},wx:"ngài thấy ngươi khéo",l:{sung:-3},lx:"ngài thấy ngươi lẩn tránh",rt:"Hoàng thượng bật cười.",rf:"Hoàng thượng quay mặt vào trong."}]},
 x1:{h:"Phép thử cuối",w:"emp",t:"Hoàng thượng giao ngươi giữ một bản tấu mật về phủ Tể tướng, dặn: “Ba ngày, nàng giữ hộ trẫm.”",o:[
  {n:"Giữ nguyên niêm, trả lại sau ba ngày",c:{},o:A=>45+A.sc*7+S.duc/5,e:["win","mid"],rt:"Niêm nguyên vẹn. Hoàng thượng nhìn ngươi rất lâu rồi nói: “Trẫm tin nàng.”",rf:"Niêm nguyên vẹn, nhưng có kẻ báo ngươi đã mở hộp xem."},
  {n:"Mở xem, báo cha",c:{duc:-4},o:A=>35+(A.f.obey?10:0)+S.tamco/4,e:["mid","lose"],rt:"Cha kịp lo trước, Hoàng thượng không biết.",rf:"Niêm bị động. Hoàng thượng biết."},
  {n:"Xin Hoàng thượng đừng giao cho thiếp",c:{},w:{duc:2},e:"mid",lx:"phép thử bỏ dở",rt:"Hoàng thượng thu lại hộp tấu."}]}},
 E:{win:{k:1,tag:"Hoàng thượng tin ngươi",w:"emp",t:"Từ đây Hoàng thượng kể việc triều với ngươi như với một người tri kỷ. Cha biết, và cha bắt đầu sợ ngươi.",fx:{sung:6,danh:3}},
  mid:{k:0,tag:"Ngờ vực chưa tan",t:"Hoàng thượng vẫn thương ngươi, nhưng có những đêm ngài im lặng khi ngươi nhắc đến nhà.",fx:{sung:1}},
  lose:{k:-1,tag:"Hoàng thượng đề phòng ngươi",t:"Niêm tấu bị động. Hoàng thượng không nói ra, nhưng ngài thôi đến cung ngươi một mùa.",fx:{sung:-8},go:()=>e67dad(2)}}});

rdDef("tt_co",9,{t:"Tự cầm quân cờ",w:"dad",sj:"phe cánh riêng của ngươi",cast(A){return rdCast(A,["v"])},
 g:"Đã đến lúc ngươi có người của mình ở ngoài triều, không qua tay {dad}: một vị quan trẻ, một nhà thông gia, một thái giám giữ ấn. Mỗi người là một món nợ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Vị quan trẻ",w:"dad",if:RDW(1),t:"Một Hàn lâm trẻ vừa đỗ Thám hoa, nghèo mà thẳng. Cha muốn mua hắn; ngươi muốn hắn theo ngươi.",o:[
  {n:"Lo cho mẹ hắn chữa bệnh",c:{bac:-50},w:{duc:3},wx:"hắn mang ơn ngươi, không mang ơn cha",lx:"tốn bạc",rt:"Mẹ hắn khỏi bệnh. Hắn quỳ ngoài cửa cung lạy ba lạy."},
  {n:"Để cha mua hắn",c:{},w:{bac:30},f:"obey",wx:"cha chia ngươi phần",lx:"hắn thành người của cha",rt:"Hắn vào phủ Tể tướng làm môn khách."},
  {n:"Tiến cử hắn với Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/5,sc:1,w:{danh:3},f:"own",wx:"hắn biết ai nói giúp",l:{sung:-3},lx:"Hoàng thượng chê ngươi bàn việc triều",rt:"Hắn được vào thư phòng hầu bút.",rf:"Hoàng thượng gạt đi."}]},
 s2:{h:"Không ai đứng sau ngươi",w:"dad",if:RDW(0),t:"Một lần ngươi cần người nói giúp ngoài triều, cả triều im lặng. Ai cũng chờ ý {dad}.",o:[
  {n:"Tự gây dựng, bắt đầu từ thái giám giữ ấn",c:{bac:-40},o:()=>40+S.mat*5,sc:1,f:"own",wx:"có người giữ ấn trong tay",l:{mat:-1},lx:"hắn ăn hai đầu",rt:"Thái giám giữ ấn nhận lễ, hứa báo tin.",rf:"Hắn báo luôn với cha."},
  {n:"Quay về xin cha",c:{},w:{bac:30},f:"obey",wx:"cha giúp",lx:"ngươi lại là quân cờ",go:()=>e67dad(2),rt:"Cha gửi người, kèm một bức thư dạy dỗ."},
  {n:"Chờ thời",c:{},w:{duc:2},wx:"không mắc nợ ai",lx:"thời không chờ ai",rt:"Ngươi lặng lẽ chờ."}]},
 c1:{h:"Nhà thông gia",w:"dad",t:"Một nhà Thượng thư muốn kết thân: con trai họ cưới em họ ngươi. Cha phản đối vì nhà ấy không theo ông.",o:[
  {n:"Tác thành mối thân",c:{suc:-3},o:()=>40+S.danh/4,sc:1,f:"own",wx:"một nhà quyền thần đứng sau ngươi",l:{danh:-2},lx:"cha giận",go:(A,ok)=>{if(ok)e67dad(-3)},rt:"Hôn sự thành. Thượng thư gửi lễ tạ vào cung.",rf:"Cha phá ngang hôn sự."},
  {n:"Nghe cha, từ chối",c:{},w:{danh:1},f:"obey",wx:"cha vui",lx:"mất một nhà đồng minh",rt:"Ngươi khước từ khéo."},
  {n:"Đề nghị một mối khác",c:{bac:-30},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},wx:"cả hai bên đều vừa ý",l:{bac:-20},lx:"thêm tốn kém",rt:"Hai nhà kết thân qua một người cháu khác.",rf:"Không bên nào ưng."}]},
 c2:{h:"{v} cũng gây phe",w:"v",need:["v"],t:"{v} đang kéo những phi tần thấp phẩm về phía nàng, nói xấu ngươi là “con cờ của Tể tướng”.",o:[
  {n:"Kéo người về phía mình",c:{bac:-40},o:()=>40+S.danh/4,sc:1,w:{danh:3},wx:"có người trong hậu cung",l:{danh:-2},lx:"tốn bạc mà không được",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Hai Đáp ứng đến thỉnh an ngươi mỗi sáng.",rf:"Họ nhận quà rồi vẫn theo {v}."},
  {n:"Bắt tay với {v}",c:{suc:-2},o:()=>35+S.duc/4,sc:1,wx:"bớt một đối thủ",l:{sung:-2},lx:"{v} lợi dụng ngươi",go:(A,ok)=>{rdRel(A,"v",ok?15:-5)},rt:"{v} nhận lời: “Hậu cung đủ rộng cho hai người.”",rf:"{v} nhận rồi đem chuyện ra cười."},
  {n:"Mặc kệ",c:{},w:{duc:2},wx:"không tốn gì",lx:"phe {v} lớn dần",rt:"Ngươi không đáp lời gièm."}]},
 t1:{h:"Cha biết",w:"dad",t:"{dad} biết ngươi đang gây phe riêng. Ông viết: “Con đi đường con, đừng trách cha không che chở.”",o:[
  {n:"Đáp: con vẫn là con của cha",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:2},wx:"cha nguôi",l:{danh:-2},lx:"cha vẫn giận",go:(A,ok)=>{e67dad(ok?1:-2)},rt:"Cha gửi một hộp mứt quê, không kèm thư.",rf:"Cha không hồi âm."},
  {n:"Đáp: con đi đường con",c:{},w:{tamco:3},sc:1,f:"own",wx:"rõ ràng",lx:"mất chỗ dựa ở phủ",go:()=>e67dad(-3),rt:"Từ đó thư nhà thưa hẳn."},
  {n:"Xin gặp cha khi cha vào chầu",c:{suc:-3},o:()=>40+S.danh/4,sc:1,wx:"nói được điều thư không nói",l:{sung:-2},lx:"bị lời ra tiếng vào",rt:"Hai cha con nói với nhau một khắc dưới mái hiên.",rf:"Cha không đến."}]},
 x1:{h:"Phe của ngươi ra mặt",w:"v",t:"Triều hội bàn việc lập kho Thường bình. Người của ngươi, người của cha, người của {v} đều muốn nắm.",o:[
  {n:"Để người của ngươi đứng ra",c:{suc:-5},o:A=>35+A.sc*8+S.tamco/5,e:["win","lose"],rt:"Người của ngươi được giao lập kho. Cả triều biết trong cung có một phe mới.",rf:"Người của ngươi bị đánh bật. Phe ngươi tan."},
  {n:"Nhường cho người của cha",c:{},o:A=>45+(A.f.obey?10:0),e:["mid","lose"],rt:"Cha nắm kho, chia cho ngươi chút thể diện.",rf:"Người của {v} nắm kho."},
  {n:"Giữ phe ngươi ẩn thêm",c:{},w:{duc:2},e:"mid",lx:"chưa có gì trong tay",rt:"Ngươi dặn người của mình im lặng."}]}},
 E:{win:{k:1,tag:"Một phe của riêng ngươi",w:"dad",t:"Ngoài triều có người theo ngươi, trong hậu cung có người thỉnh an ngươi. Ngươi không còn là quân cờ của ai.",fx:{danh:6,tamco:3},go:()=>e67dad(-2)},
  mid:{k:0,tag:"Phe còn non",t:"Ngươi có vài người, nhưng chưa đủ để đứng một mình.",fx:{danh:2}},
  lose:{k:-1,tag:"Phe cánh tan rã",t:"Người của ngươi bị đánh bật, cha cười, {v} cười. Ngươi phải bắt đầu lại.",fx:{danh:-4},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("tt_co",10,{t:"Đêm trước triều hội",w:"emp",sj:"cuộc đối đầu giữa Hoàng thượng và Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng muốn chia quyền Tể tướng làm ba; {dad} sẽ không chịu. Triều hội sáng mai sẽ quyết. Đêm nay cả hai đều chờ ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hai lá thư một đêm",w:"dad",if:RDW(1),t:"Chạng vạng, thư cha đến: “Con khuyên Hoàng thượng hoãn lại.” Canh hai, thái giám truyền: Hoàng thượng đến cung ngươi.",o:[
  {n:"Đốt thư cha trước khi vua đến",c:{},w:{sung:2},f:"own",wx:"không để lại gì",lx:"cha không biết ngươi chọn gì",rt:"Tro thư bay qua song cửa."},
  {n:"Đưa thư cha cho Hoàng thượng xem",c:{suc:-2},o:()=>40+S.sung/4,sc:1,w:{sung:4},wx:"ngài thấy ngươi không giấu",l:{danh:-3},lx:"cha biết ngươi đem thư ông ra",go:(A,ok)=>{if(ok)e67dad(-3)},rt:"Hoàng thượng đọc, rồi gấp lại: “Trẫm biết.”",rf:"Hoàng thượng nhíu mày: “Nàng đưa trẫm xem làm gì?”"},
  {n:"Giữ thư, chờ xem ý vua",c:{},w:{tamco:2},wx:"còn đường lui",lx:"giữ thư là giữ lửa",rt:"Ngươi giấu thư vào hộp trang điểm."}]},
 s2:{h:"Đêm không ai đến",w:"dad",if:RDW(0),t:"Đêm trước triều hội, không ai đến cung ngươi. Cha không viết, vua không ghé. Ngươi chỉ nghe tin qua cung nữ.",o:[
  {n:"Sai người mang canh đến Dưỡng Tâm điện",c:{bac:-10},o:()=>35+S.sung/3,sc:1,w:{sung:3},wx:"ngài nhớ đến ngươi",l:{sung:-2},lx:"canh bị trả về",rt:"Hoàng thượng cho gọi ngươi đến.",rf:"Canh nguội ngoài cửa điện."},
  {n:"Viết thư cho cha",c:{},o:()=>40+S.danh/4,sc:1,wx:"cha nghe một lời",l:{danh:-2},lx:"thư đến muộn",rt:"Cha hồi: “Con nói đi.”",rf:"Thư không kịp đến."},
  {n:"Đóng cửa, thắp hương",c:{},w:{duc:3},wx:"lòng yên",lx:"không ai biết ý ngươi",rt:"Ngươi ngồi bên đèn đến sáng."}]},
 c1:{h:"Thượng thư bộ Binh đứng đâu",w:"dad",t:"Thượng thư bộ Binh còn lưỡng lự. Một lời của ngươi qua phu nhân ông có thể nghiêng cán cân.",o:[
  {n:"Nhắn ông đứng về phía Hoàng thượng",c:{suc:-3},o:()=>40+S.danh/4,sc:1,f:"own",wx:"Hoàng thượng thêm một phiếu",l:{danh:-2},lx:"cha biết ngươi kéo người",go:(A,ok)=>{if(ok)e67dad(-2)},rt:"Phu nhân Thượng thư gật đầu.",rf:"Phu nhân chỉ cười, không hứa."},
  {n:"Nhắn ông đứng về phía cha",c:{suc:-3},o:()=>40+S.danh/4,sc:1,f:"obey",wx:"cha thêm một phiếu",l:{sung:-3},lx:"Hoàng thượng biết",go:(A,ok)=>{if(ok)e67dad(2)},rt:"Phu nhân Thượng thư gật đầu.",rf:"Phu nhân đem chuyện kể với Hoàng hậu."},
  {n:"Không nhắn gì",c:{},w:{duc:2},wx:"không nhúng tay",lx:"cán cân tự nghiêng",rt:"Ngươi để mặc."}]},
 c2:{h:"{v} cũng chờ",w:"v",need:["v"],t:"Người của {v} rình ngoài cung ngươi. Nàng chờ một sơ suất để tâu rằng ngươi gặp người của phủ Tể tướng ban đêm.",o:[
  {n:"Bắt kẻ rình",c:{suc:-3},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"cung ngươi sạch",l:{danh:-2},lx:"ầm ĩ giữa đêm",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Kẻ rình bị bắt, khai là người của {v}.",rf:"Kẻ rình chạy thoát."},
  {n:"Cho kẻ rình thấy một cảnh vô hại",c:{},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},wx:"{v} tâu sai",l:{danh:-2},lx:"{v} thêu dệt",rt:"{v} tâu rằng ngươi ngồi chép kinh suốt đêm.",rf:"{v} vẫn thêu dệt chuyện có người lạ."},
  {n:"Mặc kệ",c:{},w:{duc:1},wx:"không động",lx:"{v} tự do thêu dệt",rt:"Ngươi không để ý."}]},
 t1:{h:"Cha đến cửa cung",w:"dad",t:"Trước giờ triều hội, {dad} xin vào thỉnh an — điều chưa từng có. Ông chỉ nói: “Con gái, cha già rồi.”",o:[
  {n:"Khuyên cha lui một bước",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:3},wx:"cha nghe",l:{danh:-2},lx:"cha thấy con không cần cha",rt:"Cha lặng lẽ gật đầu.",rf:"Cha đi ra, không ngoái lại."},
  {n:"Hứa giữ cha",c:{sung:-3},w:{danh:2},sc:1,f:"obey",wx:"cha yên lòng",lx:"lời hứa nặng",rt:"Cha cười, lần đầu tiên sau nhiều năm."},
  {n:"Không gặp",c:{},w:{tamco:2},f:"own",wx:"không bị lay",lx:"cha đau lòng",go:()=>e67dad(-2),rt:"Cha đứng ngoài cửa một lúc rồi đi."}]},
 x1:{h:"Triều hội",w:"emp",t:"Triều hội bắt đầu. Hoàng thượng cho phép ngươi ngồi sau rèm cùng Thái hậu — một ân điển hiếm có. Ngài liếc về phía rèm trước khi phán.",o:[
  {n:"Gửi ra một mảnh giấy: “Chia mà không bỏ”",c:{suc:-4},o:A=>35+A.sc*8+S.tai/5,e:["win","lose"],rt:"Hoàng thượng chia quyền Tể tướng, nhưng giữ cha ở ghế cao nhất. Cả hai bên đều còn mặt mũi.",rf:"Mảnh giấy bị Thái hậu thấy trước. Bà nghiêm mặt."},
  {n:"Ngồi yên, không ra hiệu",c:{},o:A=>45+(A.f.own?10:0),e:["mid","lose"],rt:"Hoàng thượng tự quyết. Cha mất một nửa quyền.",rf:"Cha phản kháng giữa triều, bị phạt."},
  {n:"Xin Thái hậu nói giúp cha",c:{},o:A=>40+S.th/4+(A.f.obey?10:0),e:["mid","lose"],rt:"Thái hậu nói một câu, Hoàng thượng hoãn lại.",rf:"Thái hậu từ chối, còn trách ngươi."}]}},
 E:{win:{k:1,tag:"Chia mà không bỏ",w:"emp",t:"Hoàng thượng biết ngươi giữ được cả vua lẫn cha. Từ hôm ấy, triều thần gọi cung ngươi là “nửa cái ấn Tể tướng”.",fx:{danh:7,sung:3},go:()=>e67dad(-2)},
  mid:{k:0,tag:"Cha mất nửa quyền",t:"Cha vẫn ngồi ghế Tể tướng, nhưng chỉ còn một nửa. Ông không trách ngươi, cũng không cảm ơn.",fx:{danh:1},go:()=>e67dad(-5)},
  lose:{k:-1,tag:"Cha bị phạt giữa triều",t:"Cha cãi vua giữa triều. Hoàng thượng phạt ông, và nhìn về phía rèm như hỏi: con gái ông có biết không.",fx:{sung:-5,danh:-4},go:()=>e67dad(-8)}}});

rdDef("tt_co",11,{t:"Kết ván cờ",w:"dad",sj:"ván cờ của phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Ván cờ của {dad} đi đến nước cuối. Ông muốn trao lại hoặc giữ chặt. Hoàng thượng chờ xem ngươi là người của ai. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cha mời ngươi về thăm nhà",w:"dad",if:RDW(1),t:"{dad} xin Hoàng thượng cho ngươi về phủ một ngày nhân dịp thọ của mẹ. Ông nói có chuyện chỉ nói được trong nhà.",o:[
  {n:"Xin về",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:2},wx:"nghe được lời thật của cha",l:{sung:-2},lx:"bị nói là nhớ nhà hơn nhớ vua",rt:"Hoàng thượng cho về, còn ban lễ mừng thọ.",rf:"Hoàng thượng không cho."},
  {n:"Gửi lễ, không về",c:{bac:-30},w:{duc:2},wx:"giữ phép cung",lx:"cha đành viết thư",rt:"Mẹ ngươi khóc khi nhận lễ."},
  {n:"Mời cha vào cung",c:{},o:()=>35+S.danh/4,sc:1,f:"own",wx:"nói chuyện ở đất của ngươi",l:{danh:-2},lx:"cha cho là con lên mặt",rt:"Cha đến, ngồi dưới ngươi một bậc theo phép cung.",rf:"Cha cáo bệnh."}]},
 s2:{h:"Cha ngã bệnh",w:"dad",if:RDW(0),t:"Tin từ phủ: {dad} ngã bệnh sau triều hội. Ông nằm liệt, nhưng vẫn đòi đọc tấu.",o:[
  {n:"Xin cho thái y đến phủ",c:{suc:-2},o:()=>40+S.sung/4,sc:1,w:{duc:3},wx:"cha biết con thương",l:{sung:-2},lx:"Hoàng thượng thấy ngươi lấy việc nhà làm phiền",rt:"Thái y đến phủ, cha qua cơn nguy.",rf:"Hoàng thượng chỉ ban thuốc."},
  {n:"Gửi sâm và thư",c:{bac:-40},w:{duc:2},wx:"tròn đạo hiếu",lx:"tốn bạc",rt:"Cha đọc thư, sai người cất kỹ."},
  {n:"Nhờ người dò ai đang nắm phủ",c:{suc:-2},o:()=>40+S.mat*5,sc:1,w:{tamco:2},wx:"biết phủ đang trong tay ai",l:{danh:-2},lx:"bị nói là lạnh lùng",rt:"Quản gia cũ đang giữ ấn phủ.",rf:"Không ai dám nói."}]},
 c1:{h:"Sổ môn sinh",w:"dad",t:"Cuốn sổ ghi tên mọi môn sinh của cha là thứ quý nhất phủ Tể tướng. Ai cầm nó, người ấy có nửa triều.",o:[
  {n:"Xin cha giao sổ",c:{suc:-4},o:A=>35+A.sc*6+S.danh/5,sc:1,f:"own",wx:"nửa triều trong tay",l:{danh:-3},lx:"cha thấy con tham",rt:"Cha đặt cuốn sổ lên bàn, không nói một lời.",rf:"Cha cất sổ vào rương."},
  {n:"Khuyên cha đốt sổ",c:{},w:{duc:4},wx:"không còn ai bị nắm thóp",lx:"mất một lá bài",rt:"Cha lặng nhìn ngọn lửa."},
  {n:"Để sổ ở lại phủ",c:{},w:{duc:1},f:"obey",wx:"không dính",lx:"người khác sẽ cầm",rt:"Ngươi không nhắc đến sổ."}]},
 c2:{h:"{v} nhắm vào phủ",w:"v",need:["v"],t:"Nhà {v} đã chuẩn bị sẵn một xấp sớ: hễ Tể tướng lui là họ hặc cả phủ.",o:[
  {n:"Chặn trước, nói với Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:2},wx:"sớ bị gác",l:{sung:-3},lx:"Hoàng thượng chán chuyện bè phái",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"Hoàng thượng dặn Ngự sử đài không nhận sớ hặc người đã cáo lão.",rf:"Hoàng thượng phẩy tay."},
  {n:"Gặp {v} dàn xếp",c:{bac:-40},o:()=>35+S.duc/4,sc:1,wx:"hai nhà tạm yên",l:{danh:-2},lx:"{v} nắm thóp",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} nhận lời, cất sớ đi.",rf:"{v} nhận bạc rồi vẫn để nhà nàng dâng sớ."},
  {n:"Để mặc",c:{},w:{duc:1},wx:"không tốn gì",lx:"phủ hứng sớ",rt:"Ngươi không làm gì."}]},
 t1:{h:"Lời cuối của cha",w:"dad",t:"{dad} hỏi: “Cả đời cha dạy con đánh cờ. Giờ con muốn làm quân cờ, làm người đánh cờ, hay bỏ bàn cờ?”",o:[
  {n:"Làm người đánh cờ",c:{},w:{tamco:3},sc:1,f:"own",wx:"cha hiểu",lx:"gánh nặng trên vai",rt:"Cha gật đầu chậm rãi."},
  {n:"Làm con của cha",c:{},w:{duc:3},f:"obey",wx:"cha cười",lx:"vẫn trong ván cờ của ông",rt:"Cha đặt tay lên đầu ngươi như thuở nhỏ."},
  {n:"Bỏ bàn cờ",c:{},w:{duc:4},f:"cold",wx:"lòng nhẹ",lx:"mất chỗ dựa",rt:"Cha nhìn ngươi rất lâu: “Có lẽ con đúng.”"}]},
 x1:{h:"Nước cờ cuối",w:"dad",t:"Cha dâng sớ cáo lão. Hoàng thượng hỏi ngươi: “Phủ Tể tướng giao cho ai?”",o:[
  {n:"Xin giao cho người của ngươi",c:{suc:-5},o:A=>35+A.sc*8+S.tamco/5,e:["win","lose"],rt:"Người của ngươi lên ghế. Phủ Tể tướng, từ nay, là phủ của ngươi.",rf:"Hoàng thượng thấy ngươi muốn nắm cả triều."},
  {n:"Xin để Hoàng thượng chọn người hiền",c:{},o:A=>50+S.duc/5,e:["mid","lose"],rt:"Hoàng thượng chọn người ngoài, ban cha vinh hiển về quê.",rf:"Người được chọn là kẻ thù của nhà ngươi."},
  {n:"Xin giữ cha ở lại",c:{sung:-3},o:A=>40+(A.f.obey?15:0)+S.sung/6,e:["mid","lose"],rt:"Hoàng thượng giữ cha thêm một năm.",rf:"Hoàng thượng phê: chuẩn cáo lão."}]}},
 E:{win:{k:1,tag:"Người cầm quân cờ",w:"dad",t:"Cha về quê vinh hiển. Phủ Tể tướng và nửa triều nghe theo ngươi. Ván cờ của cha thành ván cờ của ngươi.",fx:{danh:10,tamco:3},go:()=>e67dad(6)},
  mid:{k:0,tag:"Cha về quê, nhà yên",t:"Cha về quê dưỡng già. Phủ Tể tướng không còn quyền như xưa, nhưng cũng không còn ai nhắm vào. Ngươi tự đi đường mình.",fx:{duc:4,danh:2}},
  lose:{k:-1,tag:"Phủ Tể tướng sa sút",t:"Ghế Tể tướng về tay nhà đối đầu. Môn sinh của cha tan mỗi người một ngả. Ngươi vẫn là phi tần của Hoàng thượng, nhưng sau lưng không còn ai.",fx:{danh:-6},go:()=>e67dad(-10)}}});
RD97L.push({a:"tt_co_11",tag:"Cha truyền ấn, vua trao lòng tin",w:"emp",p:.12,n:"Xin Hoàng thượng cho cha truyền sổ môn sinh vào tay ngài",c:{suc:-4},
 path:["Đáp: con đi đường con","Làm người đánh cờ","Khuyên cha đốt sổ","Xin cha giao sổ","Tâu thật"],np:2,bad:["Mở xem, báo cha","Bỏ bạc lo cho hắn thoát"],sc:2,x:[()=>S.duc>=40,"Đức từ 40"],
 t:"Ngươi dâng cuốn sổ môn sinh lên Hoàng thượng. Ngài lật từng trang, rồi trả lại: “Trẫm không cần sổ. Trẫm cần người giữ sổ mà không dùng nó để hại trẫm.” Từ đó cả triều biết: lời ngươi là lời có ngài đứng sau.",
 fx:{danh:12,sung:6},go:()=>e67dad(4),rw:"nt_dongchau",ti:"Người giữ sổ môn sinh"});

/* ---------- tt_oan · Phủ Tể tướng mắc oan ---------- */
rdDef("tt_oan",5,{t:"Sau cơn oan",w:"dad",sj:"kẻ làm sổ sách giả",cast(A){return rdCast(A,["v"])},
 g:"Vụ sổ sách giả đã qua một hồi, nhưng kẻ viết sổ vẫn chưa ai bắt. Kẻ đã đặt bẫy một lần sẽ đặt bẫy lần nữa. Tìm ra hắn trước.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cha được minh oan, mà kẻ gian còn đó",w:"dad",if:RDW(1),t:"Cha đã được rửa oan, nhưng tên thư lại viết sổ giả bỗng xin nghỉ về quê rồi biến mất.",o:[
  {n:"Cho người đuổi theo về quê hắn",c:{bac:-40},o:()=>45+S.mat*5,sc:1,wx:"bắt được dấu",l:{bac:-20},lx:"đuổi hụt",rt:"Người của ngươi tìm thấy hắn trốn trong một ngôi chùa.",rf:"Hắn đã đi khỏi quê từ trước."},
  {n:"Báo cha tự lo",c:{},w:{danh:1},f:"obey",wx:"cha có người",lx:"cha lo theo cách của cha",rt:"Cha cho gia đinh đi tìm."},
  {n:"Tra sổ ra vào cổng kinh thành",c:{suc:-3},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},f:"own",wx:"biết hắn đi đâu",l:{danh:-2},lx:"bị nói là xen việc quan",rt:"Hắn ra cửa Bắc, đi về phía một trang trại có chủ.",rf:"Sổ cổng thành bị xé mất một trang."}]},
 s2:{h:"Cha mất chức, kẻ gian thì thăng",w:"dad",if:RDW(0),t:"Cha thoát tội mà mất quyền, hoặc bị giáng. Còn tên thư lại viết sổ giả thì được thăng làm Chủ sự.",o:[
  {n:"Ghi tên hắn, chờ dịp",c:{},w:{tamco:2},sc:1,wx:"không lộ ý",lx:"hắn yên ổn thêm",rt:"Ngươi ghi tên hắn vào sổ riêng."},
  {n:"Cho người làm thân với hắn",c:{bac:-40},o:()=>40+S.mat*5,sc:1,wx:"lấy được lời",l:{mat:-1},lx:"hắn đề phòng",rt:"Hắn say rượu, nói lỡ một cái tên.",rf:"Hắn nhận quà rồi cười."},
  {n:"Viết thư an ủi cha",c:{},w:{duc:3},wx:"cha bớt buồn",lx:"không tiến thêm",rt:"Cha đáp: “Cha còn sống là còn đường.”"}]},
 c1:{h:"Mực của sổ giả",w:"maid",t:"Sổ giả viết bằng loại mực chỉ Hộ bộ và vài phủ lớn dùng. Muốn biết phủ nào mua, phải tra sổ mua của Nội vụ phủ.",o:[
  {n:"Nhờ thái giám Nội vụ phủ tra",c:{bac:-30},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"có tên phủ mua mực",l:{danh:-2},lx:"thái giám nói ra ngoài",rt:"Ba phủ mua mực ấy trong năm.",rf:"Thái giám nói sổ bị thất lạc."},
  {n:"Tự xem sổ khi đi ngang",c:{suc:-3},o:()=>35+S.tamco/3,sc:1,w:{tamco:2},wx:"không ai biết",l:{danh:-4},lx:"bị bắt gặp",rt:"Ngươi đọc nhanh mấy dòng.",rf:"Quản sự Nội vụ phủ bắt gặp ngươi."},
  {n:"Bỏ qua đường mực",c:{},w:{duc:1},wx:"khỏi mạo hiểm",lx:"mất một manh mối",rt:"Ngươi để đó."}]},
 c2:{h:"Nhà {v} giàu lên",w:"v",need:["v"],t:"Từ sau vụ oan, nhà {v} được giao giữ kho muối ở Giang Bắc — món béo mà cha ngươi từng giữ.",o:[
  {n:"Dò nhà {v} có dính không",c:{suc:-3},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"thấy dấu",l:{danh:-2},lx:"{v} biết bị dò",go:(A,ok)=>{rdOan(A,"v",ok?6:10)},rt:"Quản sự kho muối từng là người nhà {v}.",rf:"{v} biết ngươi dò nhà nàng."},
  {n:"Làm thân với {v}",c:{bac:-30},o:()=>35+S.duc/4,sc:1,wx:"nghe được chuyện nhà nàng",l:{danh:-2},lx:"{v} nghi",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} kể chuyện kho muối như khoe.",rf:"{v} lạnh nhạt."},
  {n:"Không nghi oan cho ai",c:{},w:{duc:3},wx:"lòng sạch",lx:"có thể bỏ sót",rt:"Ngươi không nghĩ thêm."}]},
 t1:{h:"Một lá thư nặc danh",w:"maid",t:"Có kẻ nhét vào cửa cung ngươi một lá thư: “Muốn biết ai viết sổ, hỏi người giữ kho bạc ở ngân khố.”",o:[
  {n:"Tin, cho người hỏi",c:{bac:-20},w:{mat:1},sc:1,wx:"đi theo manh mối",lx:"có thể là bẫy",rt:"Người giữ kho bạc tên Triệu, sợ hãi nhưng chịu gặp."},
  {n:"Dò ai gửi thư trước",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},wx:"biết người tốt hay kẻ gài",l:{danh:-1},lx:"chậm một bước",rt:"Thư từ một thái giám già từng hầu cha.",rf:"Không tìm ra."},
  {n:"Đốt thư",c:{},w:{duc:1},wx:"tránh bẫy",lx:"bỏ một manh mối",rt:"Lá thư cháy thành tro."}]},
 x1:{h:"Tên thư lại",w:"dad",t:"Người của ngươi đã tìm được tên thư lại viết sổ giả. Hắn chịu khai nếu được bảo đảm sống.",o:[
  {n:"Hứa che chở hắn",c:{bac:-50},o:A=>40+A.sc*8+S.mat*3,e:["win","lose"],rt:"Hắn khai: sổ giả được đặt viết, bạc trả qua một người trong ngân khố.",rf:"Hắn được hứa, nhưng đêm ấy bị kẻ khác bắt đi."},
  {n:"Giao hắn cho cha",c:{},o:A=>45+(A.f.obey?10:0),e:["mid","lose"],rt:"Cha tra hắn, có được vài lời.",rf:"Cha nóng nảy, hắn chết trong ngục nhà."},
  {n:"Thả hắn đi",c:{},w:{duc:3},e:"mid",lx:"mất nhân chứng",rt:"Hắn lạy rồi trốn biệt."}]}},
 E:{win:{k:1,tag:"Có lời khai của kẻ viết sổ",w:"dad",t:"Tên thư lại khai ra đường bạc. Kẻ đặt bẫy cha ngươi ở cao hơn ngân khố.",fx:{tamco:2,mat:1}},
  mid:{k:0,tag:"Manh mối lửng lơ",t:"Ngươi biết có kẻ đứng sau, nhưng chưa nắm được lời nào chắc.",fx:{mat:1}},
  lose:{k:-1,tag:"Nhân chứng mất tích",t:"Tên thư lại biến mất. Kẻ đứng sau biết ngươi đang lần.",fx:{danh:-3}}}});

rdDef("tt_oan",6,{t:"Nhân chứng ngân khố",w:"dad",sj:"người giữ kho bạc ở ngân khố",cast(A){return rdCast(A,["v"])},
 g:"Người giữ kho bạc họ Triệu ở ngân khố biết ai đã lấy bạc trả cho kẻ viết sổ giả. Hắn sợ chết. Giữ cho hắn sống, và đừng để ai mua được hắn trước ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Triệu chịu gặp",w:"maid",if:RDW(1),t:"Có lời khai của tên thư lại, Triệu biết mình bị lộ. Hắn nhắn: muốn nói, nhưng phải có người che chở vợ con hắn.",o:[
  {n:"Đưa vợ con hắn về trang trại nhà ngươi",c:{bac:-50},w:{duc:2},sc:1,wx:"Triệu tin ngươi",lx:"tốn bạc, nhà ngươi gánh thêm rủi ro",rt:"Vợ con Triệu lên xe ngựa trong đêm."},
  {n:"Hứa suông cho yên lòng",c:{},o:()=>40+S.tamco/3,sc:1,wx:"không tốn gì",l:{danh:-2},lx:"hắn biết ngươi chỉ hứa",rt:"Triệu tạm tin.",rf:"Triệu bảo: lời hứa không che được ai."},
  {n:"Nhờ cha lo",c:{},w:{danh:1},f:"obey",wx:"phủ có người",lx:"phủ đang bị dòm",rt:"Cha cho gia đinh canh nhà Triệu."}]},
 s2:{h:"Triệu trốn tránh",w:"maid",if:RDW(0),t:"Manh mối dẫn đến Triệu, nhưng hắn đóng cửa không tiếp ai, nói mình bệnh.",o:[
  {n:"Gửi thái y đến xem bệnh",c:{suc:-2},o:()=>40+S.mat*5,sc:1,wx:"có cớ gặp hắn",l:{danh:-2},lx:"lộ ý",rt:"Thái y mang về một lời nhắn của Triệu.",rf:"Triệu đuổi thái y về."},
  {n:"Cho người đứng chờ ngoài ngõ",c:{bac:-20},w:{mat:1},wx:"biết ai ra vào",lx:"chậm",rt:"Có một người của phủ khác ghé nhà Triệu."},
  {n:"Bỏ, tìm đường khác",c:{},w:{duc:1},wx:"không ép người",lx:"mất nhân chứng tốt nhất",rt:"Ngươi tạm gác."}]},
 c1:{h:"Kẻ mua chuộc",w:"v",need:["v"],t:"Người nhà {v} đến nhà Triệu với một rương bạc. Họ muốn hắn câm.",o:[
  {n:"Trả cao hơn",c:{bac:-80},o:()=>45+S.mat*4,sc:1,wx:"Triệu ngả về ngươi",l:{bac:-20},lx:"bạc đổ sông",go:(A,ok)=>{rdOan(A,"v",8)},rt:"Triệu trả lại rương bạc nhà {v}.",rf:"Triệu nhận cả hai."},
  {n:"Cho Triệu biết bạc ấy là bạc gì",c:{},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},wx:"Triệu sợ bạc bẩn",l:{danh:-2},lx:"hắn càng sợ",rt:"Triệu run tay đẩy rương bạc ra cửa.",rf:"Triệu không tin ai nữa."},
  {n:"Báo Ngự sử bắt quả tang",c:{suc:-4},o:()=>35+S.danh/4,sc:1,w:{danh:3},wx:"{v} mất mặt",l:{danh:-3},lx:"vụ việc vỡ lớn",go:(A,ok)=>{if(ok)rdOan(A,"v",14)},rt:"Người nhà {v} bị bắt cùng rương bạc.",rf:"Ngự sử đến muộn, rương bạc đã đi."}]},
 c2:{h:"Hạn tra sổ",w:"emp",t:"Bộ Hộ sắp kết sổ năm. Qua kỳ kết sổ thì mọi giấy tờ cũ bị niêm, lời Triệu không còn đối chiếu được.",o:[
  {n:"Gấp rút lấy lời khai",c:{suc:-4},o:A=>40+A.sc*6,sc:1,wx:"kịp hạn",l:{danh:-2},lx:"vội thì sơ suất",rt:"Lời khai có kịp đối chiếu với sổ.",rf:"Lời khai thiếu chữ ký."},
  {n:"Xin Hoàng thượng hoãn kết sổ",c:{sung:-4},o:()=>35+S.sung/4,sc:1,wx:"có thêm thời gian",l:{sung:-2},lx:"Hoàng thượng nghi ngươi can việc bộ",rt:"Hoàng thượng cho hoãn mười ngày.",rf:"Hoàng thượng từ chối."},
  {n:"Bỏ đối chiếu, chỉ giữ lời khai",c:{},w:{duc:1},wx:"đỡ vội",lx:"lời khai yếu",rt:"Ngươi chỉ cất lời khai."}]},
 t1:{h:"Triệu kể",w:"maid",t:"Triệu kể: bạc trả kẻ viết sổ được lấy từ kho bạc tiến cống, có lệnh miệng của một người hắn không dám nói tên.",o:[
  {n:"Ép hắn nói tên",c:{suc:-3},o:()=>35+S.tamco/3,sc:1,w:{mat:1},wx:"có tên",l:{danh:-2},lx:"Triệu sợ, đổi lời",rt:"Triệu viết một chữ lên tay: họ của một nhà thông gia với nhà {v}.",rf:"Triệu khóc, không nói."},
  {n:"Không ép, chỉ ghi lời",c:{},w:{duc:2},sc:1,wx:"Triệu tin ngươi",lx:"thiếu một cái tên",rt:"Triệu ký vào lời khai."},
  {n:"Đưa hắn ra khỏi kinh",c:{bac:-40},w:{duc:2},wx:"hắn sống",lx:"xa thì khó gọi làm chứng",rt:"Triệu đi trong đêm."}]},
 x1:{h:"Đêm có kẻ đến",w:"maid",t:"Nửa đêm, có kẻ trèo tường vào nhà Triệu. Người của ngươi ở đó, người của cha cũng ở đó.",o:[
  {n:"Bắt sống kẻ đến",c:{suc:-5},o:A=>40+A.sc*8+S.mat*3,e:["win","lose"],rt:"Kẻ đến bị bắt sống, trong người có thư sai khiến.",rf:"Kẻ đến bị giết trước khi khai. Triệu bị thương."},
  {n:"Đưa Triệu chạy",c:{bac:-30},o:A=>50+S.mat*3,e:["mid","lose"],rt:"Triệu sống, nhưng kẻ đến chạy thoát.",rf:"Triệu bị thương nặng."},
  {n:"Để người của cha xử",c:{},o:A=>45+(A.f.obey?10:0),e:["mid","lose"],rt:"Gia đinh của cha đánh đuổi kẻ đến.",rf:"Gia đinh của cha giết kẻ đến, manh mối đứt."}]}},
 E:{win:{k:1,tag:"Triệu sống, có thư sai khiến",w:"dad",t:"Triệu sống, và ngươi có thêm bức thư sai khiến của kẻ muốn hắn chết. Mối dây đã dài thêm một đoạn.",fx:{mat:1,tamco:2}},
  mid:{k:0,tag:"Triệu sống",t:"Nhân chứng còn sống. Kẻ đứng sau biết ngươi đang giữ hắn.",fx:{mat:1}},
  lose:{k:-1,tag:"Nhân chứng bị thương",t:"Triệu bị thương nặng, lời khai của hắn có thể không kịp dùng.",fx:{danh:-2}}}});

rdDef("tt_oan",7,{t:"Ai được lợi",w:"v",sj:"nhà được lợi từ cái oan của cha",cast(A){return rdCast(A,["v"],{v:v=>v.rank>=1})},
 g:"Lần theo đường bạc, ngươi thấy nhà {v} là kẻ hưởng lợi nhiều nhất khi cha ngươi mắc oan. {v} biết ngươi đã thấy.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{v} ghé thăm",w:"v",if:RDW(1),t:"{v} mang trà ngon đến cung ngươi, nói như vô tình: “Nghe nói muội đang giữ một người họ Triệu.”",o:[
  {n:"Đáp thẳng: phải",c:{},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"{v} biết ngươi không sợ",l:{danh:-2},lx:"lộ hết bài",go:A=>{rdOan(A,"v",8)},rt:"{v} đặt chén xuống, không cười nữa.",rf:"{v} cười: “Gan thật.”"},
  {n:"Giả không hiểu",c:{},o:()=>45+S.tamco/3,sc:1,w:{tamco:2},wx:"{v} không đoán được",l:{danh:-1},lx:"{v} biết ngươi giả",rt:"{v} ra về với nửa câu hỏi.",rf:"{v} nhìn ngươi như nhìn kẻ dối."},
  {n:"Hỏi lại: tỷ nghe từ ai",c:{},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"biết đường tin của {v}",lx:"{v} cảnh giác",rt:"{v} buột miệng một cái tên thái giám.",rf:"{v} chối."}]},
 s2:{h:"{v} lên cao",w:"v",if:RDW(0),t:"{v} được tấn phong, nhà nàng được ban thưởng. Ai cũng biết phần thưởng ấy là phần của cha ngươi ngày trước.",o:[
  {n:"Đến chúc mừng",c:{bac:-30},w:{duc:2},wx:"giữ lễ",lx:"nuốt giận",go:A=>{rdRel(A,"v",4)},rt:"{v} nhận lễ, nụ cười rất mỏng."},
  {n:"Không đến",c:{},w:{tamco:1},wx:"không cúi",lx:"bị nói là ghen",go:A=>{rdOan(A,"v",4)},rt:"Ngươi đóng cửa cung."},
  {n:"Dò sổ thưởng của nhà {v}",c:{suc:-3},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"thấy dấu",l:{danh:-2},lx:"bị biết",rt:"Sổ thưởng có một khoản trùng ngày bạc rời kho.",rf:"Sổ thưởng bị khóa."}]},
 c1:{h:"Thư sai khiến",w:"maid",t:"Bức thư sai khiến kẻ giết Triệu viết bằng chữ của một môn khách nhà {v}.",o:[
  {n:"Đối chiếu nét chữ",c:{suc:-3},o:()=>40+S.tai/3,sc:1,w:{tai:1},wx:"chứng cứ chắc",l:{danh:-2},lx:"đối chiếu sai",rt:"Nét chữ khớp.",rf:"Nét chữ không chắc."},
  {n:"Giữ thư, chưa dùng",c:{},w:{tamco:2},sc:1,wx:"cầm bài",lx:"thư cũ đi thì chứng cứ yếu",rt:"Ngươi cất thư."},
  {n:"Gửi thư cho cha",c:{},w:{danh:1},f:"obey",wx:"cha có cớ",lx:"cha nóng nảy",rt:"Cha đọc thư, đập bàn."}]},
 c2:{h:"Mối thù thật",w:"v",need:["v"],t:"Hậu cung bắt đầu thấy hai cung ngươi và {v} không nhìn mặt nhau. Hoàng hậu gọi cả hai đến.",o:[
  {n:"Nói rõ trước Hoàng hậu",c:{suc:-3},o:()=>35+S.hh/4+S.danh/5,sc:1,w:{danh:3},wx:"Hoàng hậu biết lẽ phải",l:{hh:-4},lx:"Hoàng hậu ghét chuyện ầm ĩ",go:A=>{rdOan(A,"v",10)},rt:"Hoàng hậu nghe, rồi bảo {v}: “Nhà ngươi nên cẩn thận.”",rf:"Hoàng hậu phạt cả hai cấm túc."},
  {n:"Giữ hòa khí trước mặt",c:{},w:{duc:2},wx:"Hoàng hậu yên tâm",lx:"{v} cho là ngươi yếu",rt:"Hai người cùng cúi đầu."},
  {n:"Kể khổ, không nêu tên",c:{},o:()=>40+S.tai/4,sc:1,w:{hh:3},wx:"Hoàng hậu thương",l:{danh:-1},lx:"chẳng được gì",rt:"Hoàng hậu thưởng ngươi một hộp yến.",rf:"Hoàng hậu cho là ngươi than vãn."}]},
 t1:{h:"{v} đề nghị",w:"v",t:"{v} gặp riêng ngươi: “Nhà ta trả lại kho muối, nhà ngươi thôi truy. Hai bên coi như không có gì.”",o:[
  {n:"Nhận",c:{},w:{bac:60},wx:"cha có lại một phần",lx:"kẻ đứng sau thoát",go:A=>{rdRel(A,"v",8)},rt:"Nhà {v} trả lại kho muối Giang Bắc."},
  {n:"Từ chối",c:{},w:{tamco:2},sc:1,wx:"đi đến cùng",lx:"thù sâu thêm",go:A=>{rdOan(A,"v",10)},rt:"{v} đứng dậy: “Vậy thì đi đến cùng.”"},
  {n:"Đòi thêm: nói ra kẻ đứng trên",c:{suc:-3},o:()=>35+S.tamco/3,sc:1,w:{mat:1},wx:"có tên kẻ đứng trên",l:{danh:-2},lx:"{v} giận",rt:"{v} cắn môi, nói một cái tên.",rf:"{v} bỏ đi."}]},
 x1:{h:"Trình lên",w:"emp",t:"Ngươi có thư sai khiến, lời khai Triệu, sổ thưởng nhà {v}. Trình ngay, hay chờ thêm.",o:[
  {n:"Trình lên Hoàng thượng",c:{suc:-5},o:A=>35+A.sc*8+S.sung/6,e:["win","lose"],rt:"Hoàng thượng đọc, sai Đại Lý tự tra nhà {v}.",rf:"Hoàng thượng thấy chứng cứ chưa đủ, trách ngươi gây rối."},
  {n:"Đưa cho cha trình ở triều",c:{},o:A=>40+(A.f.obey?10:0)+S.danh/5,e:["mid","lose"],rt:"Cha trình, triều xôn xao.",rf:"Triều cho là cha trả thù riêng."},
  {n:"Giữ lại, chờ dịp lớn hơn",c:{},w:{tamco:2},e:"mid",lx:"chưa ai bị xử",rt:"Ngươi cất tất cả vào hộp."}]}},
 E:{win:{k:1,tag:"Nhà {v} bị tra",w:"emp",t:"Đại Lý tự tra nhà {v}. Cả hậu cung biết mối thù hai nhà từ nay là thật.",fx:{danh:5},go:A=>{rdOan(A,"v",12);return""}},
  mid:{k:0,tag:"Thù giữ trong lòng",t:"Hai nhà không ai động, nhưng ai cũng biết.",fx:{tamco:1},go:A=>{rdOan(A,"v",5);return""}},
  lose:{k:-1,tag:"Bị cho là gây rối",t:"Chứng cứ chưa đủ. Hoàng thượng trách ngươi gây chuyện, nhà {v} lên tiếng thương xót giả.",fx:{sung:-4,danh:-3},go:A=>{rdOan(A,"v",8);return""}}}});

rdDef("tt_oan",8,{t:"Cha vào ngục",w:"dad",sj:"cái án thứ hai của cha",cast(A){return rdCast(A,["v"])},
 g:"Một tờ sớ mới tố {dad} cướp ruộng dân ở quê. Lần này ông bị giải vào ngục Hình bộ. Giữ cho cha sống và cho nhà đứng vững cho đến ngày xử.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin dữ",w:"dad",if:RDW(1),t:"Nhà {v} bị tra chưa xong thì cha ngươi bị tố. Ai cũng hiểu đây là đòn trả.",o:[
  {n:"Xin Hoàng thượng xét kỹ",c:{sung:-3},o:()=>40+S.sung/4,sc:1,wx:"án được xét chậm lại",l:{sung:-3},lx:"Hoàng thượng thấy ngươi cầu xin quá nhiều",rt:"Hoàng thượng dặn Hình bộ không được dùng hình.",rf:"Hoàng thượng không đáp."},
  {n:"Gửi người về quê dò ruộng",c:{bac:-40},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"biết thật giả",l:{bac:-20},lx:"người đi không về",rt:"Ruộng ấy cha mua có văn tự, người bán còn sống.",rf:"Người đi gặp nạn trên đường."},
  {n:"Bình tĩnh chờ",c:{},w:{duc:2},wx:"không nóng vội",lx:"cha một mình trong ngục",rt:"Ngươi chép kinh cầu cho cha."}]},
 s2:{h:"Lại bị tố",w:"dad",if:RDW(0),t:"Cha vừa thoát một vụ thì lại vướng vụ mới. Người trong cung bắt đầu tránh mặt ngươi.",o:[
  {n:"Vẫn đi thỉnh an như thường",c:{},w:{danh:2},wx:"giữ thể diện",lx:"chịu những ánh mắt",rt:"Ngươi ngẩng đầu đi qua hành lang."},
  {n:"Cáo bệnh ở yên trong cung",c:{},w:{duc:2},wx:"tránh lời ra tiếng vào",lx:"bị quên dần",rt:"Ngươi đóng cửa."},
  {n:"Tìm người còn dám đứng cạnh ngươi",c:{bac:-30},o:()=>35+S.danh/4,sc:1,wx:"có người cạnh",l:{danh:-2},lx:"tốn mà không ai đến",rt:"Một Quý nhân nhỏ nhận lời đi cùng ngươi.",rf:"Không ai đến."}]},
 c1:{h:"Bạc cho ngục",w:"maid",t:"Ngục Hình bộ lạnh, cơm thiu. Muốn cha có chăn ấm, có thuốc, phải có bạc cho cai ngục mỗi tháng.",o:[
  {n:"Gửi bạc đều tháng",c:{bac:-60},w:{duc:2},wx:"cha khỏe",lx:"bạc cạn dần",rt:"Cha có chăn bông, có thuốc."},
  {n:"Xin thái y vào ngục",c:{suc:-3},o:()=>40+S.sung/5,sc:1,w:{duc:2},wx:"cha có người chữa",l:{sung:-2},lx:"phạm lệ",rt:"Thái y vào ngục ba ngày một lần.",rf:"Hình bộ không cho."},
  {n:"Để nhà lo",c:{},w:{},wx:"giữ bạc",lx:"nhà đang khốn",rt:"Mẹ ngươi bán trâm để lo."}]},
 c2:{h:"{v} rải tin",w:"v",need:["v"],t:"Người của {v} rải tin trong cung: con gái kẻ cướp ruộng dân không xứng hầu Hoàng thượng.",o:[
  {n:"Bắt kẻ rải tin",c:{suc:-3},o:()=>40+S.mat*5,sc:1,w:{danh:2},wx:"tin dừng",l:{danh:-2},lx:"ầm ĩ thêm",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Kẻ rải tin bị phạt.",rf:"Kẻ rải tin chối."},
  {n:"Im lặng",c:{},w:{duc:2},wx:"không ăn miếng trả miếng",lx:"tin cứ lan",rt:"Ngươi không đáp."},
  {n:"Rải tin ngược về nhà {v}",c:{duc:-3},o:()=>40+S.tamco/3,sc:1,wx:"{v} cũng mang tiếng",l:{danh:-3},lx:"bị lần ra",go:A=>{rdOan(A,"v",10)},rt:"Tin về kho muối Giang Bắc lan khắp cung.",rf:"Người ta lần ra tin từ cung ngươi."}]},
 t1:{h:"Người bán ruộng",w:"dad",t:"Người bán ruộng cho cha còn sống, nhưng đã bị ai đó đưa đi giấu ở một trang trại khác.",o:[
  {n:"Cho người tìm",c:{bac:-40},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"có nhân chứng",l:{bac:-10},lx:"tìm hụt",rt:"Người bán ruộng được tìm thấy, còn giữ văn tự.",rf:"Trang trại trống không."},
  {n:"Nhờ Ngự sử thanh liêm hỏi giúp",c:{suc:-3},o:()=>35+S.duc/4,sc:1,w:{danh:2},wx:"có người ngoài làm chứng",l:{danh:-2},lx:"Ngự sử không nhận",rt:"Ngự sử nhận lời, tự đi xem.",rf:"Ngự sử từ chối."},
  {n:"Bỏ qua",c:{},w:{},wx:"đỡ tốn",lx:"thiếu chứng",rt:"Ngươi để đó."}]},
 x1:{h:"Ngày giải thẩm",w:"emp",t:"Hình bộ định ngày giải thẩm. Ngươi còn một cơ hội trước ngày ấy.",o:[
  {n:"Đưa văn tự và nhân chứng đến Hình bộ",c:{suc:-5},o:A=>35+A.sc*8+S.danh/5,e:["win","lose"],rt:"Hình bộ nhận văn tự, cha được chuyển sang giam lỏng ở nhà.",rf:"Văn tự bị nói là giả."},
  {n:"Xin Hoàng thượng ân xá",c:{sung:-5},o:A=>35+S.sung/4,e:["mid","lose"],rt:"Hoàng thượng cho cha tạm về nhà chờ xử.",rf:"Hoàng thượng nói: “Có tội thì xử, không tội thì tha. Trẫm không ân xá trước khi xử.”"},
  {n:"Chờ ngày giải thẩm",c:{},w:{duc:2},e:"mid",lx:"cha còn trong ngục",rt:"Ngươi chờ."}]}},
 E:{win:{k:1,tag:"Cha về nhà chờ xử",w:"dad",t:"Cha được về nhà giam lỏng. Có văn tự, có người làm chứng. Ngày xử sẽ khác.",fx:{danh:3},go:()=>e67dad(2)},
  mid:{k:0,tag:"Cha còn trong ngục",t:"Cha vẫn trong ngục, nhưng sống và khỏe. Ngày giải thẩm sắp đến.",fx:{}},
  lose:{k:-1,tag:"Cha ốm trong ngục",t:"Cha ốm nặng trong ngục. Nhà ngươi bán ruộng để lo thuốc.",fx:{bac:-40,danh:-2},go:()=>e67dad(-4)}}});

rdDef("tt_oan",9,{t:"Tam ty hội thẩm",w:"emp",sj:"phiên hội thẩm án của cha",cast(A){return rdCast(A,["v"])},
 g:"Án của {dad} được giao cho ba nha môn cùng xét. Phi tần không được bước vào công đường. Mọi chứng cứ phải đi qua tay người khác.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Người mang chứng cứ",w:"emp",if:RDW(1),t:"Ngươi cần một người ngoài cung mang chứng cứ đến hội thẩm. Người ấy phải sạch, và phải gan.",o:[
  {n:"Nhờ Ngự sử thanh liêm",c:{suc:-3},o:()=>40+S.duc/4,sc:1,w:{danh:2},wx:"chứng cứ có người đứng tên",l:{danh:-2},lx:"Ngự sử bị dọa",rt:"Ngự sử nhận lời.",rf:"Ngự sử xin rút."},
  {n:"Nhờ huynh trưởng",c:{},w:{danh:1},wx:"người nhà",lx:"người nhà thì bị nói là thiên vị",rt:"Huynh trưởng nhận việc."},
  {n:"Gửi qua Thái hậu",c:{suc:-3},o:()=>35+S.th/4,sc:1,w:{th:3},wx:"Thái hậu đứng sau",l:{th:-3},lx:"Thái hậu không muốn dính",rt:"Thái hậu sai người đưa đi.",rf:"Thái hậu từ chối."}]},
 s2:{h:"Không ai dám",w:"emp",if:RDW(0),t:"Ngươi tìm mãi không ra người chịu mang chứng cứ đến công đường. Ai cũng sợ nhà {v}.",o:[
  {n:"Nhờ thái giám giữ ấn đưa vào",c:{bac:-40},o:()=>35+S.mat*5,sc:1,wx:"có đường đi",l:{danh:-3},lx:"phạm lệ cung",rt:"Chứng cứ đến tay Hình bộ.",rf:"Thái giám bị bắt."},
  {n:"Viết tấu dâng thẳng",c:{suc:-4},o:()=>30+S.sung/4,sc:1,wx:"Hoàng thượng đọc",l:{sung:-4},lx:"phi tần dâng tấu án quan",rt:"Hoàng thượng chuyển tấu xuống hội thẩm.",rf:"Tấu bị trả về."},
  {n:"Chờ",c:{},w:{duc:1},wx:"không phạm lệ",lx:"hội thẩm không có chứng của ngươi",rt:"Ngươi chờ."}]},
 c1:{h:"Một quan hội thẩm",w:"v",need:["v"],t:"Một trong ba quan hội thẩm là thông gia nhà {v}.",o:[
  {n:"Xin đổi quan",c:{suc:-3},o:()=>35+S.sung/4,sc:1,w:{danh:2},wx:"hội thẩm công bằng hơn",l:{sung:-3},lx:"bị nói là nghi ngờ triều đình",rt:"Hoàng thượng đổi người.",rf:"Hoàng thượng không đổi."},
  {n:"Tìm điểm yếu của hắn",c:{bac:-30},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"hắn phải dè chừng",l:{danh:-2},lx:"bị lộ",go:A=>{rdOan(A,"v",6)},rt:"Hắn có một khoản nợ cờ bạc.",rf:"Hắn sạch."},
  {n:"Để vậy",c:{},w:{duc:1},wx:"không động",lx:"một phiếu nghiêng về nhà {v}",rt:"Ngươi không làm gì."}]},
 c2:{h:"Nhân chứng run sợ",w:"maid",t:"Triệu và người bán ruộng nhận được thư dọa: ai nói thì nhà người ấy cháy.",o:[
  {n:"Cho người canh nhà họ",c:{bac:-50},w:{duc:2},sc:1,wx:"họ dám nói",lx:"tốn bạc",rt:"Nhà hai nhân chứng có người canh ngày đêm."},
  {n:"Hứa đền gấp đôi nếu có chuyện",c:{},o:()=>40+S.danh/4,sc:1,wx:"họ yên lòng",l:{danh:-2},lx:"hứa suông",rt:"Họ gật đầu.",rf:"Một người rút lời khai."},
  {n:"Đưa họ vào kinh ở gần",c:{bac:-30},w:{mat:1},wx:"dễ giữ",lx:"dễ bị nhìn thấy",rt:"Hai nhân chứng ở trọ gần Hình bộ."}]},
 t1:{h:"Phiên hội thẩm thứ nhất",w:"emp",t:"Phiên đầu, quan hội thẩm hỏi về văn tự ruộng. Phía bên kia đưa ra một văn tự khác, ngày sớm hơn.",o:[
  {n:"Tìm người nhận ra văn tự giả",c:{bac:-30},o:()=>40+S.tai/4,sc:1,w:{mat:1},wx:"vạch được giả",l:{danh:-2},lx:"không ai nhận",rt:"Một lão thầy đồ nhận ra mực của văn tự kia còn mới.",rf:"Không ai dám nói."},
  {n:"Để quan tự xét",c:{},w:{duc:2},wx:"không can thiệp",lx:"văn tự giả đứng ngang",rt:"Quan hội thẩm hoãn phiên."},
  {n:"Hỏi Triệu có biết ai làm",c:{},o:()=>40+S.mat*4,sc:1,w:{tamco:1},wx:"có manh mối",lx:"Triệu không biết",rt:"Triệu biết: cùng người viết sổ giả năm trước.",rf:"Triệu lắc đầu."}]},
 x1:{h:"Phiên cuối",w:"emp",t:"Phiên cuối của hội thẩm. Ba quan chưa đồng ý với nhau. Một lời từ Hoàng thượng có thể nghiêng tất cả.",o:[
  {n:"Xin Hoàng thượng đến nghe",c:{suc:-5},o:A=>35+A.sc*8+S.sung/6,e:["win","lose"],rt:"Hoàng thượng ngự đến hội thẩm. Không ai dám bẻ cong khi vua ngồi đó.",rf:"Hoàng thượng không đến, còn nói phi tần không nên bàn án."},
  {n:"Tin vào chứng cứ",c:{},o:A=>40+A.sc*6,e:["win","mid"],rt:"Chứng cứ đủ, hai trong ba quan nghiêng về phía cha.",rf:"Hai quan tranh cãi, án treo lại."},
  {n:"Lặng lẽ dàn xếp với nhà {v}",c:{bac:-60},o:A=>45+S.mat*3,e:["mid","lose"],rt:"Nhà {v} rút một nhân chứng, án nhẹ đi.",rf:"Nhà {v} nhận bạc rồi vẫn đẩy án."}]}},
 E:{win:{k:1,tag:"Hội thẩm nghiêng về cha",w:"emp",t:"Hội thẩm thấy văn tự kia là giả. Chỉ còn chờ phán.",fx:{danh:4}},
  mid:{k:0,tag:"Án treo",t:"Ba quan không đồng ý. Án treo lại, chờ Hoàng thượng phán.",fx:{}},
  lose:{k:-1,tag:"Hội thẩm nghiêng về bên kia",t:"Hai trong ba quan nghiêng về bên tố. Cha ngươi khó thoát.",fx:{danh:-3},go:()=>e67dad(-3)}}});

rdDef("tt_oan",10,{t:"Ngày phán án",w:"emp",sj:"bản án của cha",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng sẽ phán án của {dad}. Những gì ngươi đã gom, đã giữ, đã mất, đều được đặt lên cân trong một ngày.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đêm trước ngày phán",w:"emp",if:RDW(1),t:"Hoàng thượng ở lại cung ngươi đêm trước ngày phán, nhưng ngài không nói một lời về án.",o:[
  {n:"Cũng không nhắc đến án",c:{},w:{sung:3},sc:1,wx:"ngài thấy ngươi biết phận",lx:"không nói thêm được gì",rt:"Hai người chỉ đánh cờ đến khuya."},
  {n:"Khẽ xin ngài công bằng",c:{},o:()=>40+S.sung/4,sc:1,w:{sung:1},wx:"ngài nghe",l:{sung:-3},lx:"ngài thấy ngươi cầu",rt:"Ngài chỉ nói: “Trẫm biết.”",rf:"Ngài đứng dậy về điện."},
  {n:"Đánh đàn cho ngài nghe",c:{},o:()=>35+S.tai/3,sc:1,w:{sung:3},wx:"ngài lòng nhẹ",l:{},lx:"tiếng đàn buồn",rt:"Tiếng đàn làm ngài thiếp đi.",rf:"Tiếng đàn buồn quá, ngài thở dài."}]},
 s2:{h:"Ngày phán đến gần",w:"emp",if:RDW(0),t:"Hoàng thượng không gọi ngươi. Người ta nói ngài đã có ý.",o:[
  {n:"Xin gặp",c:{suc:-3},o:()=>35+S.sung/3,sc:1,wx:"được gặp",l:{sung:-3},lx:"bị từ chối",rt:"Ngài cho vào, nghe ngươi nói hết.",rf:"Cửa điện đóng."},
  {n:"Gửi một bài thơ",c:{},o:()=>35+S.tai/3,sc:1,w:{sung:2},wx:"ngài đọc",l:{},lx:"thơ không đến tay",rt:"Ngài đọc bài thơ ba lần.",rf:"Thơ nằm trên án, chưa mở."},
  {n:"Chờ",c:{},w:{duc:2},wx:"lặng lẽ",lx:"không có gì",rt:"Ngươi chờ."}]},
 c1:{h:"Lời cuối của nhà {v}",w:"v",need:["v"],t:"Nhà {v} dâng một tờ sớ cuối, xin xử nặng để làm gương.",o:[
  {n:"Đáp bằng tờ sớ của Ngự sử thanh liêm",c:{suc:-3},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"hai bên cân nhau",l:{danh:-2},lx:"Ngự sử không chịu",go:A=>{rdOan(A,"v",6)},rt:"Tờ sớ của Ngự sử đến kịp.",rf:"Ngự sử từ chối."},
  {n:"Gặp {v} lần cuối",c:{},o:()=>35+S.duc/4,sc:1,wx:"có thể hòa",l:{danh:-1},lx:"{v} cười",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} nói: “Ta không muốn cha ngươi chết.”",rf:"{v} cười nhạt."},
  {n:"Mặc",c:{},w:{duc:1},wx:"không động",lx:"sớ nhà {v} một mình",rt:"Ngươi không làm gì."}]},
 c2:{h:"Mẹ ngươi xin vào cung",w:"dad",t:"Mẹ ngươi xin vào thỉnh an, muốn quỳ trước Hoàng thượng xin cho chồng.",o:[
  {n:"Đưa mẹ đến gặp Thái hậu",c:{suc:-3},o:()=>40+S.th/4,sc:1,w:{th:3},wx:"Thái hậu thương",l:{th:-2},lx:"phạm lệ",rt:"Thái hậu nắm tay mẹ ngươi.",rf:"Thái hậu không gặp."},
  {n:"Khuyên mẹ về",c:{},w:{duc:2},wx:"giữ thể diện",lx:"mẹ buồn",rt:"Mẹ ngươi khóc mà về."},
  {n:"Để mẹ quỳ",c:{},o:()=>30+S.sung/5,sc:1,w:{sung:1},wx:"Hoàng thượng động lòng",l:{danh:-3},lx:"bị coi là ép vua",rt:"Hoàng thượng đỡ mẹ ngươi dậy.",rf:"Hoàng thượng cho người đưa mẹ ngươi về."}]},
 t1:{h:"Một chứng cứ muộn",w:"maid",t:"Sáng ngày phán, Triệu gửi đến một mảnh giấy: lệnh lấy bạc năm xưa có dấu ấn của người đứng trên nhà {v}.",o:[
  {n:"Trình ngay",c:{suc:-3},o:A=>40+A.sc*6,sc:1,w:{danh:2},wx:"chứng cứ cuối đến kịp",l:{danh:-2},lx:"đến muộn bị cho là giả",rt:"Mảnh giấy đến án vua trước giờ phán.",rf:"Mảnh giấy bị chặn ở cửa."},
  {n:"Giữ lại cho sau",c:{},w:{tamco:2},wx:"cầm lá bài lớn",lx:"án hôm nay thiếu nó",rt:"Ngươi cất mảnh giấy."},
  {n:"Đốt",c:{},w:{duc:1},wx:"không lôi kẻ lớn vào",lx:"mất bằng chứng",rt:"Mảnh giấy cháy."}]},
 x1:{h:"Phán",w:"emp",t:"Hoàng thượng ngự triều, cầm bản án.",o:[
  {n:"Đứng sau rèm, chờ",c:{},o:A=>35+A.sc*8+S.sung/6+(rdEnd(9)==="win"?10:0),e:["win","lose"],rt:"Hoàng thượng phán: cha ngươi vô tội, kẻ làm văn tự giả bị xử.",rf:"Hoàng thượng phán: cha ngươi có lỗi không xét kỹ ruộng, cách chức."},
  {n:"Gửi lời xin xử nhẹ",c:{sung:-3},o:A=>45+S.sung/5,e:["mid","lose"],rt:"Cha bị phạt nhẹ, giữ chức.",rf:"Lời xin bị bỏ qua."},
  {n:"Không làm gì nữa",c:{},o:A=>40+A.sc*6,e:["mid","lose"],rt:"Án xử theo chứng cứ: cha giữ mạng, mất quyền.",rf:"Án xử nặng."}]}},
 E:{win:{k:1,tag:"Cha vô tội",w:"emp",t:"Cha vô tội. Kẻ làm giả bị xử. Nhà {v} không bị gọi tên, nhưng ai cũng hiểu.",fx:{danh:6},go:()=>e67dad(5)},
  mid:{k:0,tag:"Cha giữ mạng, mất quyền",t:"Cha về quê, giữ được mạng và tên. Phủ Tể tướng chỉ còn là một cái tên.",fx:{danh:1},go:()=>e67dad(-4)},
  lose:{k:-1,tag:"Cha bị cách chức",t:"Cha bị cách chức, đày đi biên. Ngươi vẫn giữ phẩm, nhưng sau lưng không còn nhà.",fx:{danh:-5},go:()=>e67dad(-10)}}});

rdDef("tt_oan",11,{t:"Rửa sạch tiếng nhà",w:"dad",sj:"tiếng tăm của phủ Tể tướng",cast(A){return rdCast(A,["v"])},
 g:"Án đã phán, nhưng tiếng nhà ngươi vẫn chưa sạch. Kẻ đứng trên nhà {v} vẫn chưa bị gọi tên. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cha về triều",w:"dad",if:RDW(1),t:"Cha được trả chức. Triều thần đến chúc mừng, nhưng nụ cười ai cũng dè dặt.",o:[
  {n:"Khuyên cha khoan dung với kẻ đã hại",c:{},w:{duc:3},wx:"triều yên",lx:"kẻ hại nhởn nhơ",rt:"Cha nghe ngươi, không truy thêm."},
  {n:"Khuyên cha truy đến cùng",c:{},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},wx:"kẻ đứng trên phải lo",l:{danh:-2},lx:"triều sợ phủ ngươi",rt:"Cha gật đầu: “Đến cùng.”",rf:"Cha nói: “Cha mệt rồi.”"},
  {n:"Không bàn việc triều với cha",c:{},w:{sung:2},wx:"Hoàng thượng yên tâm",lx:"cha tự quyết",rt:"Ngươi chỉ hỏi han sức khỏe."}]},
 s2:{h:"Nhà sa sút",w:"dad",if:RDW(0),t:"Nhà ngươi sa sút. Người hầu bỏ đi, họ hàng tránh mặt. Mẹ ngươi viết: “Con giữ mình.”",o:[
  {n:"Gửi bạc nuôi nhà",c:{bac:-60},w:{duc:3},wx:"nhà còn đứng",lx:"bạc của ngươi cạn",rt:"Nhà ngươi giữ được cổng."},
  {n:"Xin Hoàng thượng chút ân",c:{sung:-3},o:()=>35+S.sung/4,sc:1,w:{danh:2},wx:"nhà được ban thưởng nhỏ",l:{sung:-2},lx:"bị coi là xin xỏ",rt:"Hoàng thượng ban cho mẹ ngươi bổng lộc hàng năm.",rf:"Hoàng thượng làm ngơ."},
  {n:"Tự lo thân",c:{},w:{tamco:2},wx:"vững bản thân",lx:"nhà trách",rt:"Ngươi không đáp thư mẹ."}]},
 c1:{h:"Kẻ đứng trên",w:"v",need:["v"],t:"Mảnh giấy có dấu ấn vẫn còn đó. Người có dấu ấn ấy là một Thân vương, chú của Hoàng thượng.",o:[
  {n:"Đưa mảnh giấy cho Hoàng thượng",c:{suc:-4},o:()=>30+S.sung/4,sc:1,w:{danh:4},wx:"kẻ đứng trên phải trả lời",l:{sung:-5},lx:"đụng đến hoàng thân",rt:"Hoàng thượng đọc, im lặng, rồi cất vào tay áo.",rf:"Hoàng thượng nói: “Nàng có biết đây là ai không?”"},
  {n:"Gặp {v}, nói ngươi biết",c:{},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},wx:"{v} sợ",l:{danh:-2},lx:"{v} báo cho Thân vương",go:A=>{rdOan(A,"v",6)},rt:"{v} tái mặt.",rf:"{v} đi báo ngay."},
  {n:"Giữ kín cả đời",c:{},w:{duc:2},wx:"an toàn",lx:"kẻ đứng trên không bị gì",rt:"Ngươi cất mảnh giấy vào đáy rương."}]},
 c2:{h:"Bạn cũ của cha",w:"dad",t:"Những môn sinh từng bỏ cha giờ xin quay lại.",o:[
  {n:"Khuyên cha nhận lại",c:{},w:{danh:2},wx:"phủ đông người",lx:"người hai lòng",go:()=>e67dad(2),rt:"Phủ đông khách trở lại."},
  {n:"Khuyên cha chỉ nhận người ở lại lúc khó",c:{},w:{duc:3},wx:"phủ trong sạch",lx:"ít người",rt:"Cha chọn bốn người."},
  {n:"Không xen vào",c:{},w:{},wx:"giữ tay sạch",lx:"không định hướng",rt:"Ngươi để cha tự quyết."}]},
 t1:{h:"Tờ chiếu",w:"emp",t:"Hoàng thượng cho soạn một tờ chiếu nói về vụ án. Lời lẽ trong chiếu có thể rửa sạch, hoặc chỉ khép lại.",o:[
  {n:"Xin chiếu nói rõ cha bị oan",c:{suc:-3},o:()=>35+S.sung/4,sc:1,w:{danh:4},wx:"tiếng nhà sạch",l:{sung:-3},lx:"Hoàng thượng không muốn làm lớn",rt:"Chiếu nói rõ: Tể tướng bị vu.",rf:"Chiếu chỉ nói: án đã xong."},
  {n:"Để chiếu khép lại êm",c:{},w:{duc:2},wx:"triều yên",lx:"tiếng chưa sạch",rt:"Chiếu khép lại êm."},
  {n:"Xin chiếu ban thưởng nhân chứng",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:3},wx:"Triệu được thưởng",l:{},lx:"",rt:"Triệu được thăng một bậc.",rf:"Hoàng thượng không nhắc đến Triệu."}]},
 x1:{h:"Kết",w:"dad",t:"Mọi việc đi đến cuối. Cha gọi ngươi về nhà một lần, ngồi bên giếng cũ.",o:[
  {n:"Nói với cha: nhà ta sạch rồi",c:{},o:A=>35+A.sc*8+S.danh/5+(rdEnd(10)==="win"?10:0),e:["win","mid"],rt:"Cha cười, lần đầu tiên sau bao năm.",rf:"Cha chỉ thở dài: “Sạch thì sạch, nhà đã khác rồi.”"},
  {n:"Xin cha từ quan về quê",c:{},o:A=>50+S.duc/5,e:["mid","lose"],rt:"Cha gật đầu. Nhà ngươi về quê yên ổn.",rf:"Cha giận: “Con cũng muốn cha thua sao?”"},
  {n:"Hỏi cha có hối hận không",c:{},o:A=>40+S.tai/4,e:["win","lose"],rt:"Cha nói: “Không. Vì cha có con.”",rf:"Cha quay mặt đi."}]}},
 E:{win:{k:1,tag:"Tiếng nhà trong sạch",w:"dad",t:"Phủ Tể tướng đứng lại, sạch hơn trước. Cả triều nhớ: con gái Tể tướng đã giữ nhà bằng chứng cứ, không bằng bạc.",fx:{danh:10,duc:3},go:()=>e67dad(6)},
  mid:{k:0,tag:"Nhà yên, quyền mất",t:"Nhà ngươi yên ổn nhưng không còn quyền như xưa. Ngươi tự đi đường mình trong cung.",fx:{duc:4,danh:2}},
  lose:{k:-1,tag:"Nhà tan",t:"Cha mang tiếng đến cuối đời. Nhà ngươi tan mỗi người một ngả. Ngươi vẫn là phi tần, nhưng sau lưng không còn ai.",fx:{danh:-6},go:()=>e67dad(-10)}}});
RD97L.push({a:"tt_oan_11",tag:"Ngự bút đề biển Thanh liêm",w:"emp",p:.12,n:"Xin Hoàng thượng ban cho phủ một tấm biển",c:{suc:-4},
 path:["Đưa vợ con hắn","Không ép, chỉ ghi lời","Trình lên Hoàng thượng","Đưa văn tự và nhân chứng","Xin chiếu nói rõ","Xin chiếu ban thưởng"],np:2,bad:["Biếu Ngự sử","Lặng lẽ dàn xếp","Rải tin ngược"],sc:2,x:[()=>S.duc>=45,"Đức từ 45"],
 t:"Hoàng thượng tự tay viết bốn chữ “Thanh liêm chính trực”, sai treo trước cổng phủ Tể tướng. Kẻ từng vu cha ngươi phải đi qua tấm biển ấy mỗi ngày lên triều.",
 fx:{danh:12,duc:4},go:()=>e67dad(8),rw:"nt_haiduong",ti:"Con gái nhà thanh liêm"});
