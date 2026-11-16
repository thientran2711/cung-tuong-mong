/* ================= jrd_thd: the four full roads of «Con gái thầy đồ nghèo» (thd), chapters .5–.11 (ROAD_MAP.md §4.8) =================
   Pattern = jrd_tt.js (rdDef / rdCast / RDW openings on the previous chapter's ending / RD97L rare finale). {dad} = her father, the poor
   village teacher (the ONE family record of this life). Hostile roles are real both ways (rdRel / rdOan, OD:L1247). */

/* ---------- thd_tho · Danh hiệu Tài nữ ---------- */
/* BAL.road keys needed: none (deadlines are event-bound: "trước khi danh sách niêm yết", "trước ngày yết bảng").
   Cast: v = the rival from .4 (carried), {n1} = the Hàn lâm, dad's old student (.4 A.n1 is carried by the engine in S.st.f14.n1; fallback is the role
   "Hàn lâm học trò của cha"). Story-only role: the uncle of {v},
   a Thị độc of the Hàn lâm viện (never named, register as ROAD_MAP §5.4 row). .7 is a normal hồi (no j67 arc calls playArt). */
rdDef("thd_tho",5,{t:"Lời thơ vượt tường cung",w:"emp",sj:"kỳ Xuân thí của Hàn lâm viện",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hàn lâm viện mở kỳ Xuân thí: thơ phi tần sẽ được chọn vào tập Ngự tuyển, bài đứng đầu đặt ở trang thứ nhất. Chú của {v} là Thị độc trong viện, tay nắm danh sách dự thí. Giữ được tên mình trên bảng mà không để ai nắm thóp.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thơ in lén ngoài phố",w:"maid",if:RDW(1),t:"Từ kỳ thi Tài nữ, thơ ngươi được chép truyền khắp kinh thành. Một hiệu sách phố Đông khắc lén thơ ngươi bán lấy lời, đề là “Thơ Tài nữ trong cung”, sai mất mấy chữ.",o:[
  {n:"Xin Hàn lâm viện cấm bản in lén",c:{suc:-2},o:()=>45+S.danh/5,w:{danh:3},sc:1,f:"clean",wx:"thơ ngươi giữ đúng chữ",l:{danh:-2},lx:"người ta bảo Tài nữ tham danh, tiếng tăm sứt mẻ",rt:"Bản khắc bị thu, hiệu sách phải in lại cho đúng.",rf:"Hiệu sách đóng cửa ba ngày rồi lại bán."},
  {n:"Để mặc, chỉ xin ghi tên cha dạy chữ",c:{suc:-2},w:{duc:3,danh:1},wx:"tên thầy đồ quê vang theo thơ con",lx:"đêm thức chép tên cha lên từng tờ, hao sức; thơ in sai chữ cứ thế truyền đi",rt:"Bản in sau có thêm dòng: “Học trò của thầy đồ làng.”"},
  {n:"Bỏ bạc mua lại bản khắc",c:{bac:-40},w:{mat:1},wx:"không ai in thơ ngươi khi chưa hỏi",lx:"tốn bạc, mà bản chép tay vẫn truyền",rt:"Ván khắc gỗ được đem vào cung, cất trong rương."}]},
 s2:{h:"Tài nữ quê",w:"v",if:RDW(0),t:"Sau kỳ thi Tài nữ, trong các buổi thỉnh an người ta vẫn ngâm nhại thơ ngươi. {v} gọi ngươi là “Tài nữ quê”, cả điện cười.",o:[
  {n:"Cười mà nhận cái tên",c:{danh:-2},w:{duc:3},wx:"lời nhại mất vui",lx:"cái tên dính theo ngươi, tiếng tăm sứt mẻ",rt:"Ngươi nâng chén: “Quê thì quê, chữ vẫn là chữ.”"},
  {n:"Đáp một câu thơ",c:{suc:-2},o:()=>35+S.tai/3+(S.arts&&S.arts.thi||0)*5,sc:1,w:{danh:3},wx:"cả điện lặng đi",l:{danh:-3},lx:"thơ vụng thì cười thêm, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Câu đáp gọn mà sắc, {v} đỏ mặt.",rf:"Ngươi vấp một chữ, tiếng cười to hơn."},
  {n:"Đóng cửa luyện thơ",c:{suc:-6},w:{tai:3},wx:"thơ sắc hơn",lx:"đóng cửa luyện đến kiệt sức, ngoài kia không ai nói giúp ngươi",rt:"Giấy nháp chất đầy án thư."}]},
 c1:{h:"Danh sách dự thí",w:"v",need:["v"],t:"Chỉ năm phi tần được dự Xuân thí. Danh sách do chú của {v} trình lên, và tên ngươi chưa có. Danh sách sẽ niêm yết sau tuần trăng này.",o:[
  {n:"Dâng thơ lên Hoàng thượng xin dự",c:{suc:-3},o:()=>35+S.sung/3,sc:1,w:{sung:2},wx:"ngài tự ghi tên ngươi",l:{sung:-3},lx:"ngài cho là ngươi tranh danh, Hoàng thượng phật ý",rt:"Hoàng thượng phê một chữ bên lề: “Cho.”",rf:"Hoàng thượng bảo việc ấy để Hàn lâm viện lo."},
  {n:"Nhờ {n1} tiến cử",c:{bac:-30},o:()=>45+S.danh/5,w:{danh:1},sc:1,f:"ally",wx:"có người trong viện",lx:"{n1} tiến cử không thành, người ta bảo ngươi chạy cửa, tiếng tăm sứt mẻ",l:{danh:-2},rt:"{n1} trình thêm một tên, chú của {v} không cản được.",rf:"Tờ tiến cử bị gác lại."},
  {n:"Xin Thái hậu cho dự",need:["th"],c:{suc:-2},o:()=>35+(S.th||0)/3,sc:1,w:{th:3},wx:"Thái hậu nhớ đến ngươi",l:{th:-2},lx:"Thái hậu ngại chuyện văn chương, phật lòng",rt:"Thái hậu sai người nói một câu với Hàn lâm viện.",rf:"Thái hậu chỉ cười."}]},
 c2:{h:"{v} biết đề trước",w:"maid",need:["v"],t:"{maid} nghe lỏm: cung nữ của {v} chép đi chép lại những bài vịnh hoa mai. Đề Xuân thí còn niêm phong, mà nàng đã biết.",o:[
  {n:"Báo Hàn lâm viện đổi đề",c:{suc:-2},w:{duc:3},sc:1,f:"clean",wx:"kỳ thi sạch",lx:"chạy đi báo tin, hao sức; {v} biết ai phá việc của nàng",go:A=>{rdOan(A,"v",6)},rt:"Một học sĩ lặng lẽ nhận lời."},
  {n:"Cũng luyện vịnh mai cho chắc",c:{suc:-4,duc:-2},w:{tai:2},f:"know",wx:"không thua thiệt",lx:"luyện đến khuya mà hao sức; biết đề lộ mà im là đồng lõa, tổn đức",rt:"Ngươi viết mười bài vịnh mai."},
  {n:"Lặng im, ghi nhớ",c:{suc:-2},w:{tamco:2},wx:"cầm một lá bài",lx:"thức đêm canh từng tin, hao sức; đề vẫn lộ",rt:"Ngươi ghi vào sổ riêng ngày giờ nghe được."}]},
 t1:{h:"Thư cha từ quê",w:"maid",t:"Thư cha đến: trò nhỏ trường làng thuộc lòng thơ con, mà mái trường dột, cha không có bạc sửa. Cuối thư cha dặn: “Đừng vì danh mà quên chữ.”",o:[
  {n:"Gửi bạc về sửa trường",c:{bac:-50},w:{duc:3,danh:1},wx:"trường làng có mái mới",lx:"tốn bạc giữa lúc cần lo lễ",rt:"Cha hồi thư, nét chữ run: “Trò nhỏ đọc thơ con dưới mái mới.”"},
  {n:"Gửi thơ mới cho trò làng chép",c:{suc:-2},w:{tai:1,danh:1},wx:"thơ ngươi có người đọc thật lòng",lx:"chép thơ suốt đêm, hao sức; mái trường vẫn dột",rt:"Cha chép thơ con lên vách lớp."},
  {n:"Xin Hoàng thượng ban chữ cho trường làng",c:{suc:-2},o:()=>35+S.sung/4,sc:1,w:{danh:4},wx:"trường làng có biển ngự ban",l:{sung:-3},lx:"ngài cho là ngươi mượn ân riêng, Hoàng thượng phật ý",rt:"Hoàng thượng viết bốn chữ “Hữu giáo vô loại”.",rf:"Hoàng thượng bảo: “Việc nhỏ, để sau.”"}]},
 x1:{h:"Đề Xuân thí",w:"emp",t:"Trước khi danh sách niêm yết, ngươi phải quyết: chuyện đề bị lộ, để yên hay làm lớn.",o:[
  {n:"Tâu Hoàng thượng đề đã lộ",c:{suc:-4},o:A=>35+(A.f.clean?10:0)+S.danh/6,e:["win","lose"],rt:"Hoàng thượng sai đổi đề trong đêm. Tên ngươi đứng thứ năm trên bảng.",rf:"Hoàng thượng hỏi: “Sao nàng biết đề?” Câu hỏi treo lơ lửng."},
  {n:"Nhờ {n1} lặng lẽ xin đổi đề",c:{bac:-20},o:A=>40+(A.f.ally?15:0)+S.tamco/5,e:["win","mid"],rt:"Đề được đổi mà không ai biết vì sao.",rf:"{n1} không dám, đề vẫn giữ nguyên."},
  {n:"Giữ kín, luyện đúng đề ấy",c:{duc:-2},o:A=>45+(A.f.know?10:0),e:["mid","lose"],lx:"ngươi thi trên một đề bẩn",rt:"Ngươi vào thi với mười bài vịnh mai trong đầu.",rf:"Có kẻ đồn chính ngươi mua đề."}]}},
 E:{win:{k:1,tag:"Đề đổi, tên ngươi trên bảng",w:"emp",t:"Đề Xuân thí được đổi thành “Vịnh trúc”. Tên ngươi đứng trên bảng dự thí, và cung {v} có người đập vỡ một chén trà.",fx:{danh:4,tai:1},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Có tên, mà đề còn lộ",t:"Ngươi được dự thi, nhưng biết rằng có kẻ đã đọc đề trước ngươi.",fx:{danh:1}},
  lose:{k:-1,tag:"Bị nghi làm lộ đề",t:"Lời đồn đổi chiều: kẻ biết đề lộ là ngươi, vậy kẻ làm lộ cũng có thể là ngươi. Nội vụ phủ được lệnh dò cung ngươi.",fx:{danh:-4,sung:-2}}}});

rdDef("thd_tho",6,{t:"Tập nháp bị trộm",w:"maid",sj:"tập thơ nháp của ngươi",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Tập thơ nháp ngươi chép từ thuở ở quê, có cả những câu chưa đưa ai xem, biến mất khỏi án thư. Không có nó, ngươi không chứng được bài nào là của mình. Tìm lại trước kỳ Xuân thí.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đề đổi, có kẻ tức",w:"maid",if:RDW(1),t:"Ba ngày sau khi đề đổi thành “Vịnh trúc”, tập nháp của ngươi biến mất. Trong đó có hai mươi bài vịnh trúc ngươi viết từ hồi ở quê.",o:[
  {n:"Khóa cửa, tra từng người hầu",c:{suc:-3},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"biết ai vào phòng hôm ấy",l:{danh:-2},lx:"người hầu oán ngươi nghi oan, tiếng tăm sứt mẻ",rt:"Một cung nữ mới đổi đến đã xin nghỉ về quê từ hôm qua.",rf:"Ai cũng khai không biết."},
  {n:"Lặng lẽ cho người dò ngoài cung",c:{bac:-20},w:{tamco:2},wx:"kẻ trộm không biết đã bị dò",lx:"tốn bạc thuê người dò, mà chậm hơn",rt:"Người của ngươi ra phố sách ngồi nghe ngóng."},
  {n:"Viết ngay bài mới, mặc tập cũ",c:{suc:-5},w:{tai:3},wx:"thơ mới không ai có",lx:"viết suốt đêm đến kiệt sức, thơ cũ trôi đi mất",rt:"Ngươi viết thâu đêm."}]},
 s2:{h:"Kẻ gian giấu đồ gian",w:"maid",if:RDW(0),t:"Chuyện đề thi chưa yên thì tập nháp biến mất. Ngoài hành lang có tiếng xì xào: “Mất thật hay tự giấu đi cho khỏi bị khám?”",o:[
  {n:"Báo Cung chính ty bị mất đồ",c:{},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"việc mất đồ có sổ ghi",l:{danh:-2},lx:"người ta càng tin ngươi giấu, tiếng tăm sứt mẻ",rt:"Cung chính ty ghi nhận, ngày giờ rõ ràng.",rf:"Quan coi sổ cười khẩy, viết qua loa."},
  {n:"Im lặng tự tìm",c:{suc:-3},w:{tamco:2},wx:"không thêm tiếng xấu",lx:"lục tìm một mình đến rã rời, không ai làm chứng ngươi đã mất",rt:"Ngươi tự lật từng góc cung."},
  {n:"Viết thư hỏi cha có giữ bản chép",c:{suc:-1},w:{duc:2},wx:"cha có thể còn giữ vài bài",lx:"ngồi viết thư trong đêm, hao chút sức; thư đi đường xa",rt:"Cha hồi: vài bài cha còn chép trên vách lớp."}]},
 c1:{h:"Cung nữ lạ mặt",w:"maid",t:"Cung nữ mới do Nội vụ phủ đưa đến đã xin về quê. Người cùng phòng kể: trước khi đi, nàng có một túi bạc nặng.",o:[
  {n:"Cho người đuổi theo trước khi nàng ra khỏi kinh",c:{bac:-30},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"bắt được người lấy",l:{bac:-10},lx:"ngựa thuê đi về tay không, tốn thêm bạc",f:"chase",rt:"Nàng bị giữ ở trạm ngựa ngoài cửa thành, khai có người trong cung sai.",rf:"Nàng đã đi đường thủy, mất dấu."},
  {n:"Hỏi Nội vụ phủ ai cử nàng",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},wx:"lần ra người cử",l:{danh:-1},lx:"Nội vụ phủ báo lại cho kẻ cử, người ta bảo ngươi bới chuyện, tiếng tăm sứt mẻ",rt:"Tên người cử là một thái giám hầu ở cung {v}.",rf:"Sổ Nội vụ phủ chỉ ghi “theo lệ”."},
  {n:"Bỏ qua, giữ người cũ cho chặt",c:{suc:-2},w:{duc:2},wx:"cung yên",lx:"thức đêm canh người cũ, hao sức; kẻ sai khiến không bị động đến",rt:"Ngươi chỉ cho người hầu cũ đứng hầu án thư."}]},
 c2:{h:"Tro giấy ở cung {v}",w:"v",need:["v"],t:"Một cung nữ quét lò ở cung {v} lén mang đến một mẩu giấy cháy dở. Trên đó còn nửa câu thơ, nét chữ của ngươi.",o:[
  {n:"Giữ mẩu giấy làm chứng",c:{bac:-10},w:{tamco:2},sc:1,wx:"có một vật chứng",lx:"tốn bạc giữ kín mẩu giấy và người mang nó; nửa câu thơ chưa đủ buộc tội",rt:"Ngươi ép mẩu giấy vào giữa hai trang sách."},
  {n:"Đem mẩu giấy đến hỏi thẳng {v}",c:{},o:()=>35+S.danh/4,sc:1,w:{danh:2},wx:"{v} biết ngươi đã biết",l:{sung:-2},lx:"{v} cười, bảo ngươi tự đốt thơ mình; Hoàng thượng nghe chuyện, phật ý",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"{v} tái mặt, rồi lạnh lùng tiễn khách.",rf:"{v} bảo: “Thơ ngươi đáng đem đốt thật.”"},
  {n:"Trả công người báo tin, dặn nàng im",c:{bac:-20},w:{mat:1},wx:"có tai mắt trong cung {v}",lx:"tốn bạc trả công, mà nàng có thể bán tin hai đầu",rt:"Cung nữ quét lò cúi đầu nhận bạc."}]},
 t1:{h:"Người chép thuê",w:"maid",t:"Người của ngươi ngoài phố tìm thấy một thư sinh nghèo chép thuê. Hắn được thuê chép thơ trong một tập nháp sang giấy cũ, nét chữ khác, đề ngày tháng từ ba năm trước.",o:[
  {n:"Mua lời khai của hắn",c:{bac:-40},o:()=>45+S.tamco/4,sc:1,w:{tamco:2},f:"wit",wx:"có người khai ai thuê",l:{bac:-10},lx:"hắn đòi thêm, tốn thêm bạc",rt:"Hắn khai người thuê là gia nhân nhà chú của {v}.",rf:"Hắn nhận bạc rồi trốn."},
  {n:"Nhờ {n1} giữ hắn lại",c:{suc:-2},o:()=>40+S.danh/5,w:{tamco:1},sc:1,f:"ally",wx:"có Hàn lâm làm chứng",l:{danh:-2},lx:"{n1} bị kéo vào vòng, người ta bảo ngươi dùng người quen, tiếng tăm sứt mẻ",rt:"{n1} giữ hắn làm người chép sách trong viện.",rf:"{n1} ngại, không dám nhận."},
  {n:"Để hắn đi, chỉ ghi lại tên",c:{suc:-2},w:{duc:1},wx:"không dây dưa",lx:"chạy theo dò tên hắn, hao sức; bản chép đề ngày giả vẫn còn đâu đó",rt:"Ngươi chép tên hắn vào sổ riêng."}]},
 x1:{h:"Lấy lại tập nháp",w:"v",t:"Tập nháp đang ở đâu đó trong cung {v}. Trước kỳ Xuân thí, ngươi chỉ còn một nước để đi.",o:[
  {n:"Xin Cung chính ty khám cung {v}",c:{suc:-5},o:A=>35+(A.f.chase?10:0)+S.danh/6,e:["win","lose"],rt:"Tập nháp được tìm thấy dưới đáy rương đồ của một cung nữ bên {v}.",rf:"Khám không ra gì. {v} khóc trước Hoàng hậu vì bị làm nhục."},
  {n:"Bỏ bạc chuộc lại qua tay người chép",c:{bac:-60},o:A=>40+(A.f.wit?15:0)+S.tamco/5,e:["win","mid"],rt:"Tập nháp về tay, gói trong vải dầu.",rf:"Chỉ chuộc được nửa tập, nửa kia đã chép xong."},
  {n:"Viết lại từ trí nhớ, mặc nó",c:{suc:-4},w:{tai:2},e:"mid",lx:"viết lại đến kiệt sức; thơ cũ của ngươi nằm trong tay kẻ khác",rt:"Ngươi viết lại được mười hai bài."}]}},
 E:{win:{k:1,tag:"Tập nháp về tay",w:"maid",t:"Tập nháp về lại án thư ngươi, từng trang còn nguyên. Nhưng ngươi biết: kẻ lấy đã có đủ thời gian để chép.",fx:{danh:3,tai:1},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Viết lại từ trí nhớ",t:"Ngươi có lại một phần thơ, phần kia trôi đi đâu không biết.",fx:{tai:1}},
  lose:{k:-1,tag:"Tập nháp nằm trong tay {v}",t:"Khám không ra. {v} được Hoàng hậu an ủi, còn ngươi bị nhắc nhở. Thơ ngươi giờ nằm trong tay người ghét ngươi nhất.",fx:{danh:-4,hh:-3},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",7,{t:"Vòng thi Ngự hoa viên",w:"emp",sj:"vòng thi Xuân thí",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Xuân thí mở ở Ngự hoa viên. Hoàng thượng ngồi trên, Hàn lâm viện chấm thơ dưới, một nén hương cho một bài. {v} ngồi cách ngươi ba chỗ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Bước vào vườn",w:"emp",if:RDW(1),t:"Tập nháp đã về tay, ngươi bước vào vườn lòng nhẹ. {v} nhìn ngươi, mắt không chớp.",o:[
  {n:"Chào {v} trước mặt mọi người",c:{},o:()=>40+S.duc/4,sc:1,w:{danh:2},wx:"cả vườn thấy ngươi rộng lượng",l:{danh:-1},lx:"{v} không đáp giữa vườn, ngươi mất mặt",go:(A,ok)=>{rdRel(A,"v",ok?5:-3)},rt:"{v} buộc phải đáp lễ.",rf:"{v} quay đi như không thấy."},
  {n:"Ngồi yên, nhắm mắt định thần",c:{danh:-2},w:{tai:2},wx:"lòng tĩnh",lx:"người ta bảo ngươi kiêu, tiếng tăm sứt mẻ",rt:"Tiếng chim trong vườn rõ dần."},
  {n:"Dâng Thái hậu một chén trà",need:["th"],c:{suc:-2},o:()=>40+(S.th||0)/4,sc:1,w:{th:3},wx:"Thái hậu nhớ mặt ngươi",l:{th:-2},lx:"chen lấn trước giờ thi, Thái hậu phật lòng",rt:"Thái hậu gật đầu.",rf:"Thái hậu chỉ nhấp môi."}]},
 s2:{h:"Thơ mình trong tay người",w:"emp",if:RDW(0),t:"Ngươi biết có bài thơ của mình đang nằm trong tay kẻ khác. Mỗi câu ngươi định viết, có thể đã có người viết trước bằng chính lời ngươi.",o:[
  {n:"Bỏ hết thơ cũ, chỉ viết điều mới",c:{suc:-4},w:{tai:3},f:"new",wx:"không ai chép được ý mới",lx:"viết mới từ đầu đến kiệt sức, không có bài nào luyện sẵn",rt:"Ngươi gạt hết những câu quen trong đầu."},
  {n:"Viết bài cũ hay nhất, mặc ai chép",c:{suc:-2},w:{duc:2},f:"old",wx:"thơ của mình thì mình viết",lx:"viết vội trước giờ thi, hao sức; có thể đụng bài của kẻ khác",rt:"Ngươi nhớ lại từng chữ."},
  {n:"Báo trước với {n1}",c:{suc:-2},o:()=>40+S.danh/5,w:{tamco:1},sc:1,f:"ally",wx:"giám khảo biết mà đề phòng",l:{danh:-2},lx:"lời báo lọt ra thành lời gièm, tiếng tăm sứt mẻ",rt:"{n1} gật nhẹ.",rf:"Có người nghe thấy, bảo ngươi đi đêm giám khảo."}]},
 c1:{h:"{v} ngâm một bài quen",w:"v",need:["v"],if:()=>rdPrev()!=="win",t:"Hương mới cháy nửa, {v} đã nộp bài. Học sĩ đọc to: từng câu là câu trong tập nháp của ngươi, chỉ đổi vài chữ.",o:[
  {n:"Đứng dậy nói đó là thơ của ngươi",c:{suc:-3},o:()=>30+S.danh/4+S.tai/5,sc:1,w:{danh:3},wx:"lời ngươi được ghi vào biên bản",l:{danh:-4},lx:"bị cho là làm loạn vườn thi, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",8)},rt:"Chưởng viện cho ghi lại, giữ bài {v} riêng.",rf:"Thái hậu cau mày: “Không có chứng thì im.”"},
  {n:"Ngồi yên, viết bài khác hay hơn",c:{suc:-4},w:{tai:2},wx:"thắng bằng chữ, không bằng lời",lx:"viết lại cả bài trong nửa nén hương, kiệt sức; bài của {v} được chấm như thường",rt:"Ngươi cắn môi, cầm bút lại."},
  {n:"Ghi lại từng chữ nàng đổi",c:{danh:-2},w:{tamco:2},wx:"có chứng về sau",lx:"im lặng nuốt nhục trước cả vườn, mất mặt",rt:"Ngươi chép vào tay áo những chữ nàng sửa."}]},
 c2:{h:"Nghiên mực bị tráo",w:"maid",t:"Nghiên mực trên án của ngươi bị pha nước, mực loang như khóc. Còn non nửa nén hương.",o:[
  {n:"Xin đổi nghiên",c:{suc:-2},o:()=>45+S.danh/5,sc:1,w:{danh:1},wx:"có nghiên mới",l:{suc:-2},lx:"mất thời gian quý, viết vội đến hao sức",rt:"Thái giám mang nghiên mới đến ngay.",rf:"Nghiên mới đến khi hương sắp tàn."},
  {n:"Viết bằng mực loãng, chữ nhỏ lại",c:{suc:-3},w:{tai:2},wx:"chữ nhỏ mà thanh",lx:"cúi sát giấy viết chữ nhỏ, hao sức; giám khảo khó đọc",rt:"Nét chữ mảnh như lá trúc."},
  {n:"Mượn nghiên của {v}",c:{},o:()=>35+S.tamco/4,sc:1,w:{tamco:2},wx:"cả vườn thấy {v} có tật",l:{danh:-2},lx:"{v} từ chối giữa vườn, ngươi mất mặt",go:(A,ok)=>{rdOan(A,"v",ok?6:3)},rt:"{v} không dám từ, mặt tái mét.",rf:"{v} bảo nghiên nàng vừa cạn."}]},
 c3:{h:"Thái hậu hỏi quê",w:"th",need:["th"],t:"Thái hậu hỏi ngươi giữa giờ thi: “Thầy đồ dạy con thơ gì đầu tiên?”",o:[
  {n:"Kể thật bài thơ đầu cha dạy",c:{danh:-2},w:{th:3,duc:2},wx:"Thái hậu cảm động",lx:"lộ cái nghèo trước cả vườn, mất mặt",rt:"Thái hậu khẽ đọc theo câu ngươi kể."},
  {n:"Đọc một câu kinh điển cho trang trọng",c:{},o:()=>45+S.tai/4,sc:1,w:{danh:2},wx:"cả vườn nể học vấn",l:{th:-2},lx:"Thái hậu thấy ngươi giấu quê, phật lòng",rt:"Học sĩ Hàn lâm gật gù.",rf:"Thái hậu nói: “Ta hỏi thơ của cha con kia mà.”"},
  {n:"Xin Thái hậu cho viết xong rồi thưa",c:{th:-2},w:{tai:1},wx:"không phân tâm",lx:"Thái hậu thấy ngươi khô khan, phật lòng",rt:"Thái hậu phẩy tay cho viết tiếp."}]},
 t1:{h:"{n1} trong hàng giám khảo",w:"emp",t:"{n1} ngồi trong hàng giám khảo. Ánh mắt y lướt qua ngươi một lần rồi thôi. Chú của {v} ngồi ngay bên cạnh y.",o:[
  {n:"Không nhìn {n1} lấy một lần",c:{suc:-2},w:{duc:3},wx:"không ai nói được ngươi đi đêm",lx:"ngồi căng người cả buổi, hao sức; y không biết ngươi cần gì",rt:"Ngươi cúi xuống trang giấy."},
  {n:"Ra hiệu nhờ y để mắt bài {v}",c:{duc:-2},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},f:"sign",wx:"y đọc kỹ bài {v}",l:{danh:-3},lx:"chú của {v} thấy, người ta bảo ngươi gian lận, tiếng tăm sứt mẻ",rt:"{n1} giữ bài {v} lâu hơn mọi bài.",rf:"Chú của {v} hừ một tiếng."},
  {n:"Xin Hoàng thượng cho chấm tên che",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:3},f:"blind",wx:"bài nào cũng che tên",l:{sung:-3},lx:"ngài thấy ngươi lắm chuyện, Hoàng thượng phật ý",rt:"Hoàng thượng cười: “Ý hay.” Bài nào cũng dán giấy che tên.",rf:"Hoàng thượng bảo Hàn lâm viện có phép của Hàn lâm viện."}]},
 x1:{h:"Nén hương cuối",w:"emp",t:"Hương còn một đốt tay. Bài của ngươi phải nộp lên án.",o:[
  {n:"Viết về tuyết trên mái trường làng",c:{suc:-5},o:A=>30+S.tai/4+(S.arts&&S.arts.thi||0)*4+(A.f.new?8:0),e:["win","mid"],rt:"Hoàng thượng đọc xong, đặt bài ngươi lên trên cùng.",rf:"Bài hay, nhưng Hàn lâm viện chê lời quê."},
  {n:"Viết theo lối cung đình cho chắc",c:{suc:-4},o:A=>40+S.tai/5+(A.f.blind?10:0),e:["mid","lose"],lx:"chắc mà nhạt",rt:"Bài ngươi đứng ngang bài {v}.",rf:"Bài ngươi chìm giữa những bài giống nhau."},
  {n:"Viết một bài đáp thẳng bài {v}",c:{suc:-5,duc:-2},o:A=>30+(A.f.sign?10:0)+S.tamco/5,e:["win","lose"],rt:"Cả vườn nhận ra bài {v} chỉ là cái bóng của bài ngươi.",rf:"Hoàng thượng thấy ngươi đem thơ ra đấu khẩu."}]}},
 E:{win:{k:1,tag:"Đứng đầu vòng thi",w:"emp",t:"Bài ngươi đứng đầu vòng Xuân thí. Hoàng thượng cho chép lại treo ở Ngự thư phòng. {v} rời vườn trước khi tan.",fx:{danh:6,sung:3,tai:1},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Đồng hạng với {v}",t:"Bài ngươi và bài {v} cùng hạng. Hàn lâm viện hẹn chấm lại khi yết bảng.",fx:{danh:2}},
  lose:{k:-1,tag:"{v} đứng đầu",t:"{v} đứng đầu vòng Xuân thí, bằng những câu ngươi biết rõ là của mình.",fx:{danh:-3},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",8,{t:"Lời vu đạo thơ",w:"v",sj:"lời tố ngươi đạo thơ",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Chú của {v} dâng tờ trình lên Hàn lâm viện: thơ ngươi dự thi chép từ một tập thơ có trước, chứng là những trang chép tay đề ngày từ ba năm trước. Bảng Xuân thí tạm hoãn. Đạo thơ là tội làm ô danh cả viện.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Mực chưa ráo",w:"v",if:RDW(1),t:"Bài thơ đứng đầu của ngươi treo ở Ngự thư phòng chưa đầy mười ngày thì bị gỡ xuống, chờ xét.",o:[
  {n:"Xin vào gặp Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{sung:3},wx:"ngài nghe ngươi trước",l:{sung:-3},lx:"ngài bảo chờ viện xét, Hoàng thượng phật ý vì bị làm phiền",rt:"Hoàng thượng nói: “Trẫm đọc thơ nàng, trẫm biết. Nhưng phải có chứng.”",rf:"Thái giám nói ngài đang bận."},
  {n:"Bình thản chờ xét",c:{danh:-2},w:{duc:3},wx:"không tỏ ra hoảng",lx:"ngồi yên để lời đồn chạy trước, tiếng tăm sứt mẻ",rt:"Ngươi vẫn thỉnh an như mọi ngày."},
  {n:"Cho người dò tờ trình",c:{bac:-20},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"biết chứng của họ là gì",l:{danh:-1},lx:"bị nói là đi dò quan, tiếng tăm sứt mẻ",rt:"Tờ trình kèm mười hai trang giấy ngả vàng.",rf:"Người dò bị đuổi khỏi cửa viện."}]},
 s2:{h:"Kẻ trộm tố người mất",w:"v",if:RDW(0),t:"{v} được chấm ngang ngươi, hoặc hơn ngươi, bằng chính những câu thơ của ngươi. Nay nàng còn tố ngươi chép thơ nàng, lấy chính tập nháp bị trộm làm chứng.",o:[
  {n:"Nói thẳng với Hoàng hậu",need:["hh"],c:{suc:-2},o:()=>35+(S.hh||0)/4,sc:1,w:{hh:2},wx:"Hoàng hậu nghe một phía khác",l:{hh:-3},lx:"Hoàng hậu thấy hai cung cãi nhau, phật lòng",rt:"Hoàng hậu bảo sẽ không để Hàn lâm viện xử vội.",rf:"Hoàng hậu bảo việc văn chương đừng đem vào Trung cung."},
  {n:"Nuốt giận, gom chứng",c:{danh:-2},w:{tamco:2},wx:"lòng lạnh lại",lx:"mấy ngày đầu không ai bênh ngươi, tiếng tăm sứt mẻ",rt:"Ngươi ngồi soạn lại mọi giấy tờ."},
  {n:"Gửi thư về hỏi cha",c:{suc:-1},w:{duc:2},wx:"cha có thể nhớ những câu con viết xưa",lx:"ngồi viết thư trong đêm, hao chút sức; thư đi đường xa",rt:"Thư đi trong đêm."}]},
 c1:{h:"Mười hai trang giấy vàng",w:"maid",t:"Thái giám Ngự thư phòng mang đến cho ngươi xem bản sao những trang chứng: giấy ngả vàng, ngày tháng từ ba năm trước, nét chữ lạ. Có điều giấy thơm mùi hồ mới.",o:[
  {n:"Xin Hàn lâm viện thử giấy",c:{suc:-2},o:()=>40+S.tai/4,sc:1,w:{danh:3},f:"paper",wx:"giấy bị nghi là mới hun khói",l:{danh:-2},lx:"viện chưa chịu thử, người ta bảo ngươi cãi chày, tiếng tăm sứt mẻ",rt:"Học sĩ già bẻ một góc giấy: lõi trắng.",rf:"Viện bảo giấy cũ hay mới không chứng được gì."},
  {n:"Ghi nhớ, chưa nói",c:{danh:-2},w:{tamco:2},f:"paper",wx:"giữ lá bài cho buổi xét",lx:"giữ miệng mà để lời đồn vẫn chạy, tiếng tăm sứt mẻ",rt:"Ngươi nhớ kỹ mùi hồ."},
  {n:"Nói đây là giấy giả",c:{},o:()=>30+S.danh/4,sc:1,w:{danh:2},wx:"lời ngươi được ghi",l:{danh:-3},lx:"không chứng thì thành vu ngược, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",4)},rt:"Lời ngươi viết gửi sang, Chưởng viện cho ghi vào hồ sơ.",rf:"Chú của {v} cười: “Kẻ đạo thơ nào cũng nói vậy.”"}]},
 c2:{h:"Thầy đồ viết thay",w:"v",need:["v"],t:"Lời đồn mới trong cung: thơ ngươi là do cha ngươi, một thầy đồ quê, viết thay gửi vào. “Con gái thầy đồ thì có gì ngoài chữ của cha?”",o:[
  {n:"Ứng tác trước buổi thỉnh an",c:{suc:-3},o:()=>30+S.tai/3+(S.arts&&S.arts.thi||0)*5,sc:1,w:{danh:4},wx:"miệng đời im",l:{danh:-3},lx:"thơ vụng thì lời đồn thêm chắc, tiếng tăm sứt mẻ",rt:"Cả điện lặng đi khi ngươi ngừng bút.",rf:"Bài thơ gượng ép, có người bật cười."},
  {n:"Đáp: chữ của cha, lòng của con",c:{danh:-2},w:{duc:3},wx:"người ta thấy ngươi hiếu",lx:"chưa rửa được tiếng, người ta càng tin cha viết thay",rt:"Có người gật gù."},
  {n:"Tìm ra ai tung tin",c:{bac:-20},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"lần đến cung {v}",l:{danh:-1},lx:"đuổi theo lời đồn chỉ thêm ồn, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Lời đồn đi ra từ một ma ma bên {v}.",rf:"Lời đồn không có gốc."}]},
 c3:{h:"{n1} bị gọi hỏi",w:"emp",t:"Hàn lâm viện gọi {n1} hỏi: y là học trò của cha ngươi, liệu y có thiên vị khi chấm. Theo lệ, y có thể xin hồi tị.",o:[
  {n:"Khuyên y xin hồi tị cho trong sạch",c:{suc:-2},w:{duc:3},wx:"việc xét không ai bắt bẻ",lx:"nhắn tin qua lại mấy đêm, hao sức; mất người hiểu thơ ngươi trong viện",rt:"{n1} xin hồi tị."},
  {n:"Xin y ở lại làm chứng",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"ally",wx:"có người trong viện đứng về phía ngươi",l:{danh:-3},lx:"bị cho là kéo bè, tiếng tăm sứt mẻ",rt:"{n1} đứng ra: “Ta từng thấy nàng viết bài ấy từ hồi còn ở trường làng.”",rf:"Chưởng viện gạt lời {n1} vì là người nhà."},
  {n:"Không nói gì với y",c:{suc:-2},w:{tamco:1},wx:"y tự quyết",lx:"ngồi chờ không yên, hao sức; y không biết ngươi cần gì",rt:"{n1} im lặng ngồi lại."}]},
 t1:{h:"Câu hỏi của Hàn lâm viện",w:"emp",t:"Phi tần không bước vào Hàn lâm viện. Chưởng viện gửi câu hỏi qua thái giám Ngự thư phòng, xin ngươi đáp bằng giấy: “Bài thơ này nàng viết khi nào, ở đâu, bên cạnh có ai?”",o:[
  {n:"Kể thật từng chi tiết",c:{suc:-2},w:{duc:3},sc:1,f:"truth",wx:"lời khai khớp từ đầu đến cuối",lx:"viết kể từng chi tiết đến khuya, hao sức; có chi tiết không ai làm chứng được",rt:"Ngươi kể cả tiếng mưa trên mái trường đêm ấy."},
  {n:"Chỉ đáp điều chứng được",c:{suc:-2},w:{tamco:2},wx:"không sơ hở",lx:"cân từng chữ trong tờ đáp, hao sức; nghe như giấu",rt:"Chưởng viện đọc tờ đáp, gật đầu chậm."},
  {n:"Hỏi ngược lại về giấy chứng",c:{suc:-2},o:()=>35+S.tamco/3,sc:1,w:{tamco:2},wx:"viện phải xét cả hai bên",l:{danh:-3},lx:"bị cho là hỗn với quan viện, tiếng tăm sứt mẻ",rt:"Chưởng viện ghi: “Giấy chứng cần thử.”",rf:"Chưởng viện phê bên lề: “Nàng là người bị hỏi.”"}]},
 x1:{h:"Tờ đáp gửi Chưởng viện",w:"v",t:"Buổi xét đầu ở Hàn lâm viện. Chú của {v} đứng trình tờ trình; phi tần không được vào viện, lời ngươi chỉ đến bằng tờ đáp do thái giám Ngự thư phòng mang sang. Chưởng viện chờ tờ đáp ấy.",o:[
  {n:"Xin so nét chữ và thử giấy",c:{suc:-4},o:A=>35+(A.f.paper?12:0),e:["win","lose"],rt:"Giấy chứng lõi trắng, nét chữ chép vụng. Tờ trình lung lay.",rf:"Viện bảo giấy cũ hay mới không làm chứng được."},
  {n:"Tố ngược {v} lấy trộm tập nháp",c:{suc:-5},o:A=>30+S.mat*4,e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Chưởng viện tâu lên, Hoàng thượng cho Nội vụ phủ tra cung {v}.",rf:"Không có chứng, lời tố ngược thành lời vu."},
  {n:"Xin hoãn để gom chứng",c:{},w:{duc:2},e:"mid",lx:"tên ngươi vẫn bị treo",rt:"Viện cho hoãn đến trước ngày yết bảng."}]}},
 E:{win:{k:1,tag:"Lời vu lung lay",w:"emp",t:"Tờ trình của chú {v} có chỗ hở. Viện chưa xử, nhưng ai cũng thấy cán cân đã lệch về phía ngươi.",fx:{danh:4},go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Cả hai bên cùng bị xét",t:"Viện treo việc lại. Thơ ngươi và thơ {v} cùng nằm trên án chờ chứng.",fx:{danh:-1}},
  lose:{k:-1,tag:"Tên ngươi bị gạch tạm",t:"Tên ngươi bị gạch khỏi bảng chờ xét. Trong cung, người ta gọi ngươi là “Tài nữ chép thơ”.",fx:{danh:-6,sung:-2}}}});

rdDef("thd_tho",9,{t:"Chứng minh",w:"emp",sj:"chứng cứ thơ là của ngươi",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hàn lâm viện cho ngươi nộp chứng qua tay thái giám Ngự thư phòng trước ngày yết bảng. Giấy quê, thư cha, lời {n1}, và chính ngòi bút của ngươi. Mỗi chứng tốn một thứ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cán cân lệch",w:"emp",if:RDW(1),t:"Viện đã thấy chỗ hở của tờ trình. Chú của {v} vội tìm thêm chứng mới, còn ngươi cần chứng nào đủ để đóng việc lại.",o:[
  {n:"Đóng cửa soạn bản tường trình",c:{suc:-4},w:{tai:2},wx:"lời lẽ chặt chẽ",lx:"đóng cửa viết đến kiệt sức, không đi gặp ai",rt:"Bản tường trình dài mười trang."},
  {n:"Mời học sĩ già thử giấy đến cung",c:{bac:-30},o:()=>45+S.danh/5,sc:1,w:{danh:2},f:"paper",wx:"có người am giấy đứng về phía ngươi",l:{danh:-1},lx:"bị nói là mua người, tiếng tăm sứt mẻ",rt:"Học sĩ già hứa ra làm chứng.",rf:"Học sĩ già cáo bệnh."},
  {n:"Dặn người hầu giữ miệng",c:{danh:-2},w:{mat:1},wx:"không ai bắt được lời",lx:"cung ngươi lạnh như băng, người ta bảo ngươi có tật giật mình, tiếng tăm sứt mẻ",rt:"Cửa cung khép lại."}]},
 s2:{h:"Tên đang bị gạch",w:"emp",if:RDW(0),t:"Tên ngươi còn treo trên bảng chờ. Người đến thỉnh an thưa dần.",o:[
  {n:"Vẫn thỉnh an Hoàng hậu mỗi sáng",need:["hh"],c:{suc:-2},w:{hh:2,duc:2},wx:"không ai nói ngươi trốn",lx:"ngày nào cũng đi thỉnh an, nghe lời xì xào, hao sức",rt:"Hoàng hậu nhìn ngươi lâu hơn thường lệ."},
  {n:"Xin Hoàng thượng một buổi đối thơ",c:{suc:-3},o:()=>35+S.sung/3,sc:1,w:{sung:3},f:"duel",wx:"ngài thấy tài thật",l:{sung:-3},lx:"ngài bảo đang có án, Hoàng thượng phật ý",rt:"Ngài hẹn sau ngày xét.",rf:"Ngài từ chối."},
  {n:"Cắn răng gom chứng",c:{suc:-2},w:{tamco:2},wx:"lòng lạnh",lx:"gom chứng một mình đến rã rời",rt:"Ngươi xếp từng tờ thư cũ."}]},
 c1:{h:"Giấy dó làng",w:"maid",t:"Tập nháp ngươi viết trên giấy dó của lò giấy làng. Lò giấy ấy đóng dấu nước riêng. Gửi người về làng lấy sổ lò giấy, phải về trước ngày yết bảng.",o:[
  {n:"Thuê ngựa trạm về làng",c:{bac:-50},o:()=>50+S.mat*4,sc:1,w:{tamco:2},f:"dzo",wx:"có sổ lò giấy ghi năm bán",l:{bac:-10},lx:"ngựa về muộn, tốn thêm bạc trả trạm",rt:"Sổ lò giấy về kịp, ghi rõ năm cha mua giấy cho con.",rf:"Ngựa về khi bảng đã sắp yết."},
  {n:"Nhờ {n1} xin công văn gọi sổ",c:{suc:-2},o:()=>40+S.danh/5,w:{tamco:1},sc:1,f:"ally",wx:"sổ về bằng đường quan",l:{danh:-2},lx:"chú của {v} biết trước, người ta bảo ngươi mượn quan riêng, tiếng tăm sứt mẻ",rt:"Công văn đi bằng ngựa trạm của viện.",rf:"Chú của {v} giữ công văn lại."},
  {n:"Tự đối chiếu dấu nước",c:{suc:-4},o:()=>35+S.tai/3,sc:1,w:{tai:1},f:"dzo",wx:"chỉ ra dấu nước trên từng trang",l:{suc:-2},lx:"mắt mỏi mà không chắc, sức kiệt thêm",rt:"Trang nào của ngươi cũng có dấu nước lò làng.",rf:"Dấu nước mờ, khó chỉ."}]},
 c2:{h:"Thư cha xưa",w:"maid",t:"Cha giữ mọi thư con gửi từ ngày con vào cung. Có bức chép nguyên hai câu đầu bài thơ bị tố, kèm ngày tháng.",o:[
  {n:"Xin cha gửi thư lên",c:{bac:-20},o:()=>50+S.duc/5,sc:1,w:{duc:2},f:"letter",wx:"có chứng ngày tháng",l:{duc:-1},lx:"thư riêng của cha con đem ra trước viện, người ta chê ngươi bất hiếu, tổn đức",rt:"Thư cha về, giấy mỏng, chữ rõ.",rf:"Thư cha bị ướt mưa dọc đường."},
  {n:"Không đem thư nhà ra viện",c:{suc:-2},w:{duc:3},wx:"giữ chuyện nhà",lx:"ngồi canh chồng thư cũ, hao sức; mất một chứng",rt:"Ngươi để thư cha ở yên."},
  {n:"Xin cha tự lên kinh làm chứng",c:{bac:-40},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"dad",wx:"thầy đồ quê đứng trước Hàn lâm viện",l:{danh:-2},lx:"cha già đi đường xa mà không kịp, người ta cười nhà thầy đồ, tiếng tăm sứt mẻ",rt:"Cha lên đường ngay, đi bộ nửa chặng.",rf:"Cha ốm dọc đường, không đến kịp."}]},
 t1:{h:"{v} gửi lời",w:"v",need:["v"],t:"Đêm trước buổi xét, {v} sai người đến: nếu ngươi rút đơn tố nàng trộm tập nháp, nàng sẽ bảo chú rút tờ trình.",o:[
  {n:"Nhận lời, hai bên cùng rút",c:{},o:()=>45+S.tamco/4,sc:1,w:{duc:2},f:"deal",wx:"tên ngươi được trả lại bảng",l:{danh:-3},lx:"{v} nuốt lời thì không ai biết thơ là của ai, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} giữ lời.",rf:"{v} nhận lời rồi nuốt lời."},
  {n:"Từ chối, xét đến cùng",c:{suc:-2},w:{tamco:2},sc:1,f:"firm",wx:"không ai mặc cả được thơ ngươi",lx:"thức đêm chờ đòn sau, hao sức; {v} càng hận",go:A=>{rdOan(A,"v",8)},rt:"Ngươi trả lời: “Thơ không đem đổi.”"},
  {n:"Đem lời đề nghị lên viện",c:{suc:-2},o:()=>40+S.danh/4,sc:1,w:{danh:3},wx:"lời mặc cả thành chứng",l:{danh:-2},lx:"người đưa tin chối, ngươi mang tiếng bịa chuyện, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",10)},rt:"Chưởng viện ghi lời đề nghị vào hồ sơ.",rf:"Người đưa tin khai là tự ý."}]},
 x1:{h:"Ứng tác ở Ngự thư phòng",w:"emp",t:"Hoàng thượng cho gọi ngươi vào Ngự thư phòng, tự tay trải giấy ra đề: “Thơ bị nghi, ai viết thì viết tiếp được. Nàng viết tiếp bốn câu; trẫm sẽ gửi sang viện.”",o:[
  {n:"Viết tiếp bằng giọng của bài cũ",c:{suc:-5},o:A=>30+S.tai/4+(S.arts&&S.arts.thi||0)*4+(A.f.dzo?6:0)+(A.f.letter?6:0),e:["win","lose"],rt:"Bốn câu nối liền mạch như cùng một hơi. Hoàng thượng gật đầu.",rf:"Bốn câu hay, nhưng khác giọng bài cũ."},
  {n:"Dâng chứng giấy và thư, xin không phải thử",c:{suc:-3},o:A=>40+(A.f.dzo?12:0)+(A.f.letter?10:0)+(A.f.dad?8:0),e:["win","mid"],rt:"Chứng đủ, Hoàng thượng phẩy tay: “Khỏi thử.”",rf:"Chứng có, nhưng ngài vẫn muốn nghe thơ."},
  {n:"Xin cả {v} cùng viết tiếp",c:{suc:-4},o:A=>35+S.tamco/5,e:["win","lose"],go:A=>{rdOan(A,"v",8)},rt:"{v} cầm bút run, không viết nổi một câu.",rf:"{v} viết được, dù vụng. Hai bên ngang nhau."}]}},
 E:{win:{k:1,tag:"Thơ là của ngươi",w:"emp",t:"Viện công nhận thơ là của ngươi. Tờ trình của chú {v} bị trả về, kèm một dòng phê đỏ.",fx:{danh:6,sung:2},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Chứng có, lòng người còn ngờ",t:"Viện thôi xét, tên ngươi về lại bảng. Nhưng trong cung vẫn có người nhếch môi khi nghe tên ngươi.",fx:{danh:1}},
  lose:{k:-1,tag:"Không chứng được",t:"Chứng không đủ. Viện để tên ngươi treo đến ngày yết bảng, và Hoàng thượng gấp tờ thơ lại, không nói một lời.",fx:{danh:-4,sung:-3}}}});

rdDef("thd_tho",10,{t:"Ngày yết bảng",w:"emp",sj:"bảng Xuân thí",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Bảng Xuân thí sắp dán ở cửa Hàn lâm viện. Ai đứng đầu tập Ngự tuyển, ai bị gạch tên, ai bị phạt vì vu cáo: tất cả quyết trong mấy ngày này.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phe {v} rạn",w:"v",if:RDW(1),t:"Sau dòng phê đỏ, chú của {v} xin cáo bệnh. {v} không ra khỏi cung ba ngày.",o:[
  {n:"Gửi thuốc thăm chú của {v}",c:{bac:-20},o:()=>40+S.duc/4,sc:1,w:{duc:3},wx:"cả viện thấy ngươi không thù dai",l:{danh:-1},lx:"bị cho là đắc ý, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-2)},rt:"Phủ y nhận thuốc, không hồi đáp.",rf:"Thuốc bị trả lại nguyên gói."},
  {n:"Đòi viện xử tội vu cáo",c:{suc:-3},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"hard",wx:"lời vu phải có giá",l:{duc:-2},lx:"người ta bảo ngươi đánh kẻ ngã, tổn đức",go:A=>{rdOan(A,"v",8)},rt:"Viện hứa xét cùng ngày yết bảng.",rf:"Viện bảo chuyện ấy để sau."},
  {n:"Lặng im chờ bảng",c:{suc:-2},w:{duc:2},wx:"giữ thể diện",lx:"ngồi chờ không yên, hao sức; phe {v} có thời gian gượng dậy",rt:"Ngươi đóng cửa chép kinh."}]},
 s2:{h:"Bảng chờ, tên treo",w:"v",if:RDW(0),t:"Chú của {v} hối viện yết bảng sớm, trước khi ngươi kịp đưa thêm chứng.",o:[
  {n:"Xin hoãn yết bảng",c:{suc:-3},o:()=>35+S.sung/4,sc:1,w:{danh:1},wx:"thêm thời gian",l:{sung:-3},lx:"ngài thấy ngươi níu kéo, Hoàng thượng phật ý",rt:"Hoàng thượng cho hoãn năm ngày.",rf:"Ngài bảo: “Đủ rồi.”"},
  {n:"Gửi tập nháp gốc cho viện giữ",c:{suc:-2},w:{duc:2},wx:"chứng nằm ở nơi công",lx:"chép lại một bản trước khi gửi, hao sức; tập nháp rời tay ngươi",rt:"Tập nháp được niêm trong hòm viện."},
  {n:"Viết thư xin lỗi {v} cho yên",c:{duc:-2},o:()=>40+S.tamco/4,sc:1,w:{sung:1},wx:"{v} nhẹ tay",l:{danh:-3},lx:"thư thành chứng ngươi nhận tội, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} không nhắc thêm.",rf:"{v} đem thư khoe khắp cung."}]},
 c1:{h:"Sổ điểm bị sửa",w:"emp",t:"{n1} lén báo: sổ điểm Xuân thí có chỗ cạo sửa. Điểm của ngươi bị hạ một bậc, điểm của {v} được nâng.",o:[
  {n:"Xin Hoàng thượng cho chấm lại công khai",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:4},f:"open",wx:"sổ điểm được chấm lại trước mặt mọi người",l:{sung:-3},lx:"ngài phiền vì viện lục đục, Hoàng thượng phật ý",rt:"Chấm lại, điểm ngươi về như cũ.",rf:"Ngài bảo viện tự lo."},
  {n:"Giữ bản sao sổ điểm",c:{bac:-30},w:{tamco:2},wx:"cầm chứng gian lận trong tay",lx:"tốn bạc cho {n1} chép sổ, y chịu tiếng chép trộm",rt:"{n1} chép cho ngươi một bản."},
  {n:"Để {n1} tự tâu",c:{},o:()=>40+S.danh/5,w:{danh:2},sc:1,f:"ally",wx:"người ngoài cung lên tiếng",l:{danh:-2},lx:"{n1} bị trù dập, người ta bảo ngươi đẩy người khác ra chịu, tiếng tăm sứt mẻ",rt:"{n1} dâng sớ, chú của {v} bị gọi hỏi.",rf:"{n1} bị điều đi chép sử ở phủ xa."}]},
 c2:{h:"{v} đến cửa",w:"v",need:["v"],t:"{v} đến cung ngươi một mình, không mang cung nữ. Nàng nói chú nàng ép nàng làm, nàng chỉ muốn yên thân.",o:[
  {n:"Tin nàng, cho nàng một lối lui",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:3},f:"mercy",wx:"có thể bớt một kẻ thù",l:{danh:-2},lx:"bị lừa lần nữa thì cả cung cười, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?15:-6)},rt:"{v} cúi đầu thật sâu.",rf:"{v} ra về, kể khác đi với Hoàng hậu."},
  {n:"Bắt nàng viết lời khai",c:{suc:-3},o:()=>40+S.tamco/4,sc:1,w:{tamco:3},wx:"có lời khai của chính {v}",l:{danh:-2},lx:"nàng xé giấy bỏ đi kể khắp cung, tiếng tăm sứt mẻ; nàng hận ngươi suốt đời",go:A=>{rdOan(A,"v",10)},rt:"{v} run tay viết, ký tên.",rf:"{v} xé giấy, bỏ đi."},
  {n:"Không tiếp",c:{suc:-2},w:{mat:1},wx:"không sa bẫy",lx:"đứng sau cửa nghe nàng khóc, lòng mỏi, hao sức; nàng càng cùng đường",go:A=>{rdOan(A,"v",4)},rt:"Cửa cung không mở."}]},
 t1:{h:"Cha lên kinh",w:"maid",t:"Tin báo: cha ngươi đã lên kinh, trọ ở một quán trọ gần cửa Hàn lâm viện, nói chỉ muốn tận mắt thấy bảng.",o:[
  {n:"Gửi bạc lo chỗ trọ cho cha",c:{bac:-30},w:{duc:3},wx:"cha có chỗ ở tử tế",lx:"tốn bạc thuê chỗ trọ tử tế",rt:"Cha nhận, gửi lại một bài thơ ngắn."},
  {n:"Xin cho cha vào xem lễ yết bảng",c:{suc:-3},o:()=>35+S.danh/4,sc:1,w:{danh:3},f:"dadin",wx:"thầy đồ quê đứng trước cửa Hàn lâm",l:{danh:-2},lx:"người ta cười áo vải của cha, tiếng tăm sứt mẻ",rt:"Viện cho cha đứng hàng đầu.",rf:"Thị vệ đuổi cha ra khỏi cửa viện."},
  {n:"Khuyên cha về quê, tránh sóng",c:{duc:-1},w:{mat:1},wx:"cha không bị kéo vào",lx:"cha buồn lòng vì con đẩy cha đi, tổn đức",rt:"Cha gật đầu, lặng lẽ lên đường."}]},
 x1:{h:"Trước bảng vàng",w:"emp",t:"Bảng dán ở cửa Hàn lâm viện. Tối ấy, ở Ngự thư phòng, Hoàng thượng hỏi ngươi: “Kẻ vu nàng, trẫm sẽ xử. Nàng có điều gì muốn xin?”",o:[
  {n:"Xin xử đúng luật",c:{suc:-4},o:A=>35+(A.f.open?10:0)+(A.f.hard?5:0),e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Hoàng thượng phê: chú của {v} bị cách chức, {v} bị cấm túc một mùa.",rf:"Viện xin tha vì chứng còn mỏng. Ngài cau mày với cả hai bên."},
  {n:"Xin tha cho {v}, chỉ cần trả tên",c:{},o:A=>45+(A.f.mercy?15:0)+S.duc/5,e:["win","mid"],lx:"kẻ vu không trả giá",go:A=>{rdRel(A,"v",8)},rt:"Hoàng thượng khen ngươi độ lượng, tên ngươi đứng đầu bảng.",rf:"Tên ngươi về bảng, nhưng ở hàng thứ ba."},
  {n:"Thưa: thiếp chỉ xin giữ chữ",c:{},w:{duc:3},e:"mid",lx:"bảng thế nào cũng nhận",rt:"Hoàng thượng nhìn ngươi lâu, rồi phẩy tay."}]}},
 E:{win:{k:1,tag:"Đứng đầu bảng Xuân thí",w:"emp",t:"Tên ngươi đứng đầu bảng, thơ ngươi sẽ mở trang thứ nhất tập Ngự tuyển. Cả kinh thành bàn về con gái thầy đồ.",fx:{danh:8,sung:3}},
  mid:{k:0,tag:"Bảng yết, chuyện khép hờ",t:"Tên ngươi có trên bảng, không cao nhất. Lời vu được bỏ qua, không ai bị phạt.",fx:{danh:2}},
  lose:{k:-1,tag:"Tên ngươi xuống cuối bảng",t:"Bảng yết, tên ngươi ở hàng cuối, kèm dòng chú “còn nghi”. {v} được chọn mở tập Ngự tuyển.",fx:{danh:-5},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",11,{t:"Tài nữ",w:"emp",sj:"danh hiệu Tài nữ sau cùng",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hoàng thượng sắp ban chiếu về tập Ngự tuyển: ai là Tài nữ của Đại Hy, ai chỉ là người có thơ in. Tên ngươi, và tên người cha nghèo dạy ngươi chữ, sẽ đứng ở đâu. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Trang thứ nhất",w:"emp",if:RDW(1),t:"Hàn lâm viện xin ngươi chọn bài mở tập Ngự tuyển. Một bài đã đứng đầu Xuân thí, hay một bài chưa ai đọc.",o:[
  {n:"Chọn bài đã đứng đầu",c:{suc:-2},w:{danh:2},wx:"chắc tay",lx:"chép lại bài cũ cho đẹp, hao sức; không có gì mới",rt:"Bài cũ được khắc lên ván đầu."},
  {n:"Chọn bài viết cho cha",c:{suc:-2},o:()=>40+S.tai/4,sc:1,w:{danh:3,duc:2},f:"dad",wx:"thiên hạ biết thầy đồ dạy con",l:{danh:-2},lx:"viện chê lời quê, tiếng tăm sứt mẻ",rt:"Bài thơ về mái trường làng mở đầu tập Ngự tuyển.",rf:"Viện đặt bài ấy xuống trang thứ ba."},
  {n:"Nhường trang đầu cho người khác",c:{danh:-2},w:{duc:4},wx:"không ai ghen",lx:"tập thơ không mở bằng tên ngươi, danh lùi một bước",rt:"Ngươi chỉ xin một chỗ ở giữa tập."}]},
 s2:{h:"Gượng dậy",w:"emp",if:RDW(0),t:"Sau ngày yết bảng, thơ ngươi chỉ còn một chỗ nhỏ trong tập Ngự tuyển. Nhưng chiếu Tài nữ chưa ban.",o:[
  {n:"Dâng Hoàng thượng một bài mới",c:{suc:-4},o:()=>35+S.tai/3+(S.arts&&S.arts.thi||0)*4,sc:1,w:{sung:3,danh:2},wx:"ngài đọc lại thơ ngươi",l:{sung:-2},lx:"ngài bảo đã đọc đủ, Hoàng thượng phật ý",rt:"Hoàng thượng giữ bài thơ lại bên gối.",rf:"Bài thơ bị gác dưới chồng tấu."},
  {n:"Thôi tranh, dạy chữ cho cung nữ",c:{suc:-2},w:{duc:4},wx:"người dưới thương ngươi",lx:"dạy cung nữ mỗi tối, hao sức; danh Tài nữ trôi xa",rt:"Mỗi chiều cung nữ ngồi quanh ngươi học chữ."},
  {n:"Xin Thái hậu một lời",need:["th"],c:{suc:-2},o:()=>35+(S.th||0)/3,sc:1,w:{th:3},wx:"Thái hậu nhắc tên ngươi",l:{th:-2},lx:"Thái hậu chán chuyện văn chương, phật lòng",rt:"Thái hậu nói: “Thơ con bé thầy đồ, ta nhớ.”",rf:"Thái hậu bảo việc ấy của Hoàng thượng."}]},
 c1:{h:"Lời đề tựa",w:"emp",t:"Tập Ngự tuyển cần một lời đề tựa. Chưởng viện muốn tự viết; {n1} xin để ngươi viết.",o:[
  {n:"Nhận viết đề tựa",c:{suc:-4},o:()=>35+S.tai/3,sc:1,w:{danh:4},f:"pref",wx:"tên ngươi đứng đầu tập",l:{danh:-3},lx:"Chưởng viện thấy ngươi cướp việc, tiếng tăm sứt mẻ",rt:"Lời tựa ngắn, được chép khắp viện.",rf:"Chưởng viện sửa lời tựa đến không còn là của ngươi."},
  {n:"Nhường Chưởng viện",c:{danh:-2},w:{duc:3},wx:"Hàn lâm viện nợ ngươi một lần",lx:"mất dịp ghi tên, danh lùi một bước",rt:"Chưởng viện cảm ơn, giọng dịu hẳn."},
  {n:"Xin để cha viết",c:{bac:-20},o:()=>35+S.danh/4,sc:1,w:{danh:3,duc:2},f:"dad",wx:"chữ thầy đồ quê vào sách ngự",l:{danh:-2},lx:"viện cho là chuyện nhà, người ta bảo ngươi kéo cha vào, tiếng tăm sứt mẻ",rt:"Lời tựa của cha được in, nét chữ già mà vững.",rf:"Viện từ chối khéo."}]},
 c2:{h:"{v} sau cùng",w:"v",need:["v"],t:"{v} đứng trước cửa cung ngươi lúc chạng vạng, không vào. Nàng chỉ gửi vào một bài thơ, lời lẽ như xin hòa.",o:[
  {n:"Họa lại một bài",c:{suc:-2},o:()=>40+S.tai/4,sc:1,w:{duc:3},f:"peace",wx:"hai cung thôi đối đầu",l:{danh:-1},lx:"người ta bảo ngươi mềm, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?15:-4)},rt:"{v} đọc bài họa, khóc.",rf:"{v} đọc xong, xé đôi."},
  {n:"Gửi trả bài thơ",c:{suc:-2},w:{tamco:2},wx:"không mắc nợ",lx:"ngồi viết lời trả mấy lần, hao sức; {v} thấy bị khinh",go:A=>{rdOan(A,"v",6)},rt:"Bài thơ về lại cung {v}."},
  {n:"Đem bài thơ lên Hoàng hậu",need:["hh"],c:{},o:()=>40+(S.hh||0)/4,sc:1,w:{hh:3},wx:"Hoàng hậu thấy ngươi minh bạch",l:{hh:-2},lx:"Hoàng hậu ngại chuyện cũ, phật lòng",go:A=>{rdOan(A,"v",8)},rt:"Hoàng hậu giữ bài thơ.",rf:"Hoàng hậu bảo đừng làm lớn."}]},
 t1:{h:"Cha ở kinh",w:"maid",t:"Cha nhắn: ông muốn về làng trước khi chiếu ban. “Cha đến để nhìn bảng, không phải để nhận ơn.”",o:[
  {n:"Giữ cha ở lại đến ngày ban chiếu",c:{bac:-30},w:{duc:2,danh:2},wx:"cha thấy con được phong",lx:"tốn bạc giữ cha ở trọ; cha ngại ở lâu",rt:"Cha ở lại, ngày nào cũng ngồi trước cửa viện."},
  {n:"Để cha về",c:{suc:-2},w:{duc:3},wx:"cha giữ được cái thanh",lx:"tiễn cha ra cổng, lòng mỏi, hao sức; cha không thấy ngày ấy",rt:"Ngươi tiễn cha bằng một bài thơ."},
  {n:"Xin Hoàng thượng gặp cha",c:{suc:-4},o:()=>30+S.sung/3,sc:1,w:{sung:3,danh:3},f:"meet",wx:"thầy đồ quê được vào chầu",l:{sung:-3},lx:"ngài thấy ngươi đòi hỏi, Hoàng thượng phật ý",rt:"Hoàng thượng hỏi cha về sách, cha đáp không run một chữ.",rf:"Ngài bảo không có lệ ấy."}]},
 x1:{h:"Chiếu Ngự tuyển",w:"emp",t:"Hoàng thượng cầm chiếu, hỏi ngươi lần cuối: “Danh Tài nữ, nàng muốn gì đi kèm?”",o:[
  {n:"Xin chỉ danh, không xin gì thêm",c:{suc:-4},o:A=>35+S.tai/5+(A.f.pref?8:0),e:["win","mid"],rt:"Chiếu ban: ngươi là Tài nữ của Đại Hy.",rf:"Chiếu ban danh hiệu cho người khác, ngươi được một dòng khen."},
  {n:"Xin ban chữ cho trường làng của cha",c:{suc:-3},o:A=>40+(A.f.dad?12:0)+(A.f.meet?8:0)+S.duc/6,e:["win","mid"],lx:"danh của ngươi nhường chỗ cho tên cha",rt:"Chiếu ban danh Tài nữ, kèm biển ngự bút cho trường làng.",rf:"Ngài ban biển cho trường, danh hiệu để sau."},
  {n:"Xin xóa hẳn tiếng đạo thơ cho cả {v}",c:{duc:-1},o:A=>30+(A.f.peace?15:0),e:["win","lose"],rt:"Hoàng thượng khen: “Tài mà độ lượng.” Chiếu ban danh Tài nữ.",rf:"Ngài thấy ngươi bao che kẻ vu. Chiếu gác lại."}]}},
 E:{win:{k:1,tag:"Tài nữ của Đại Hy",w:"emp",gi:["nghien","emp"],t:"Chiếu ban: ngươi là Tài nữ của Đại Hy. Tập Ngự tuyển in tên ngươi và tên người thầy đồ đã dạy ngươi chữ. Ở trường làng, trò nhỏ đọc thơ ngươi mỗi sáng.",fx:{danh:12,sung:5,tai:2}},
  mid:{k:0,tag:"Thơ có tên, danh hiệu không",t:"Thơ ngươi có trong tập Ngự tuyển, người đọc nhớ. Danh Tài nữ về tay người khác, nhưng không ai còn gọi ngươi là kẻ chép thơ.",fx:{danh:4,duc:2}},
  lose:{k:-1,tag:"Gác bút",t:"Chiếu gác lại, tiếng đạo thơ không rửa hết. Ngươi vẫn là phi tần của Hoàng thượng, nhưng từ đó không còn đề thơ trên quạt.",fx:{danh:-6,sung:-2}}}});
RD97L.push({a:"thd_tho_11",tag:"Ngươi biên tập Ngự tuyển thi tập",w:"emp",p:.12,n:"Xin Hoàng thượng cho ngươi tự tay biên tập Ngự tuyển",c:{suc:-4},
 path:["Chọn bài viết cho cha","Nhận viết đề tựa","Xin để cha viết","Họa lại một bài","Xin Hoàng thượng gặp cha","Dâng Hoàng thượng một bài mới"],np:2,bad:["Gửi trả bài thơ","Thôi tranh"],sc:2,x:[()=>S.tai>=45,"Tài từ 45"],
 t:"Hoàng thượng đặt cả chồng thơ trước mặt ngươi: “Hàn lâm viện chọn thơ theo tên người. Nàng chọn thơ theo chữ.” Tập Ngự tuyển ra đời dưới tay ngươi, có thơ phi tần, có thơ cung nữ, có cả mấy câu của một thầy đồ làng.",
 fx:{danh:14,sung:6,tai:2},rw:"nt_nhuy",ti:"Người biên Ngự tuyển thi tập"});

/* ---------- thd_sach · Bản thảo của cha ---------- */
/* BAL.road keys needed: none (deadlines are event-bound: "trước mùa lũ", "trước phiên chợ tới", "trước ngày kinh diên", "trước phiên thẩm").
   Cast: {n1} = the Thượng thư named by the book (.4 A.n1 is carried by the engine in S.st.f14.n1; fallback "Thượng thư"), v = {n1}'s daughter in the palace (cast at .5 with rdCast, real hatred both ways via rdOan/rdRel).
   Story-only role: the old dyke clerk of Hoài Bắc ("lão thư lại coi đê Hoài Bắc", never named) who kept the true ledger — register in §5.4.
   .9 = HISTORY CHECK (văn tự ngục: a book charged as phỉ báng triều đình, the author fetched by Đại Lý tự). */
rdDef("thd_sach",5,{t:"In hay giấu",w:"maid",sj:"quyển hạ của Trị quốc sách",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Cha gửi vào cung quyển hạ của ‘Trị quốc sách’: những trang kể tên từng người nhận bạc đê điều. In ngay thì kịp trước mùa lũ tới; giấu lại thì cha còn yên thân. Trong cung, {v} là con gái {n1}.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Sĩ tử đòi quyển hạ",w:"maid",if:RDW(1),t:"Quyển thượng đã khắc in, {n1} bị cách chức tra xét. Sĩ tử kinh thành chép tay nhau đọc, ai cũng hỏi quyển hạ. Cha gửi bản thảo vào cung cho ngươi giữ: “Ở chỗ con, sách an toàn hơn ở nhà cha.”",o:[
  {n:"Đọc trọn, chép một bản dự phòng",c:{suc:-4},w:{tai:2},f:"copy",wx:"có bản thứ hai nếu bản gốc mất",lx:"chép bảy đêm liền, sức hao; thêm một bản là thêm một chỗ hở",rt:"Ngươi chép xong trong bảy đêm."},
  {n:"Niêm phong, giấu sau bài vị",c:{suc:-2},w:{mat:1},wx:"sách an toàn",lx:"khuân rương lúc nửa đêm, hao sức; chưa biết hết trong sách có gì",rt:"Rương sách nằm sau bài vị tổ tiên."},
  {n:"Hồi thư khuyên cha thong thả",c:{suc:-2},w:{duc:2},wx:"cha nghe con một lần",lx:"viết thư khuyên trong đêm, hao sức; sĩ tử chê nhà thầy đồ sợ",rt:"Cha hồi: “Lũ không chờ ai.”"}]},
 s2:{h:"Nửa cuốn sách còn lại",w:"maid",if:RDW(0),t:"Sách cha chỉ còn nửa trên đời, phần kia bị chặn. Cha vẫn viết tiếp ở quê, lén gửi bản thảo vào cung: “Ở chỗ con, sách an toàn hơn ở nhà cha.”",o:[
  {n:"Nhận giữ, không nói với ai",c:{suc:-2},w:{mat:1},f:"copy",wx:"sách có chỗ nương",lx:"khâu bản thảo vào áo suốt đêm, hao sức; giữ sách là giữ lửa",rt:"Ngươi khâu bản thảo vào lớp lót áo bông."},
  {n:"Khuyên cha thôi viết",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:2},wx:"cha yên thân",l:{danh:-2},lx:"cha giận con nhát, sĩ tử chê nhà thầy đồ, tiếng tăm sứt mẻ",rt:"Cha gác bút một mùa.",rf:"Cha viết: “Con không hiểu chữ của cha.”"},
  {n:"Tự đọc, sửa những chỗ quá lời",c:{suc:-3},o:()=>40+S.tai/3,sc:1,w:{tai:2},wx:"sách bớt chỗ để người bắt bẻ",l:{duc:-2},lx:"cha giận con sửa chữ của cha, người ta chê con bất hiếu, tổn đức",rt:"Ngươi gạch mềm ba câu nặng lời.",rf:"Sửa xong, sách mất cái khí của cha."}]},
 c1:{h:"Nhà khắc sách Giang Nam",w:"maid",t:"Một nhà khắc sách Giang Nam nhắn vào: họ khắc trọn quyển hạ, in bán khắp phương nam, chỉ cần ngươi góp tiền ván gỗ trước mùa lũ.",o:[
  {n:"Góp tiền ván gỗ",c:{bac:-60},o:()=>50+S.mat*3,sc:1,w:{danh:3},f:"south",wx:"sách có đường ra khỏi kinh",l:{bac:-10},lx:"nhà khắc đòi thêm, tốn thêm bạc",rt:"Ván gỗ đầu tiên đã khắc xong.",rf:"Nhà khắc lấy bạc rồi xin chờ."},
  {n:"Từ chối, sách in phải có phép",c:{suc:-2},w:{duc:3},wx:"không ai bắt được lỗi in lậu",lx:"từ chối rồi thức đêm lo đường khác, hao sức; sách nằm im",rt:"Người nhà khắc cúi chào ra về."},
  {n:"Dò xem nhà khắc là người của ai",c:{bac:-20},o:()=>45+S.mat*5,sc:1,w:{tamco:2},wx:"biết họ có sạch không",l:{danh:-1},lx:"người dò lộ mặt, người ta bảo ngươi nghi kẻ buôn sách, tiếng tăm sứt mẻ",rt:"Nhà khắc sạch, chỉ ham lời.",rf:"Người dò về tay không."}]},
 c2:{h:"{v} đến thăm",w:"v",need:["v"],t:"{v}, con gái {n1}, mang bánh đến thỉnh an, cười nói như chị em. Mắt nàng cứ liếc về phía án thư.",o:[
  {n:"Tiếp ngoài hiên, không mời vào",c:{suc:-2},w:{mat:1},wx:"không để nàng thấy gì",lx:"ngồi ngoài hiên tiếp khách cả buổi, hao sức; nàng thấy bị khinh, thêm oán",go:A=>{rdOan(A,"v",4)},rt:"{v} ngồi một khắc rồi về."},
  {n:"Nói thẳng chuyện sách với nàng",c:{suc:-2},o:()=>35+S.duc/4,sc:1,w:{duc:2},wx:"nàng biết ngươi không ghét riêng nàng",l:{danh:-2},lx:"nàng đem lời về phủ, tiếng tăm sứt mẻ; nàng thêm ghét",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} lặng đi: “Cha ta cũng là cha.”",rf:"{v} cười nhạt, về ngay."},
  {n:"Để nàng thấy một bản thảo giả",c:{suc:-3},o:()=>40+S.tamco/3,sc:1,w:{tamco:3},wx:"phủ {n1} lo nhầm chỗ",l:{danh:-2},lx:"nàng nhận ra là giả, đem kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"{v} liếc thấy tờ giấy ngươi để hớ trên án.",rf:"{v} đọc mấy dòng, bật cười."}]},
 c3:{h:"Thư mẹ",w:"maid",t:"Mẹ gửi thư riêng: đêm nào cha cũng thắp đèn viết, có người lạ đứng đầu ngõ nhìn vào. Mẹ xin con đừng giục cha.",o:[
  {n:"Gửi bạc cho mẹ thuê người canh",c:{bac:-30},w:{duc:2},wx:"nhà có người canh",lx:"tốn bạc thuê người canh nhà",rt:"Hai học trò lớn của cha đến ngủ ở nhà ngoài."},
  {n:"Viết thư an ủi mẹ",c:{suc:-1},w:{duc:2},wx:"mẹ yên lòng",lx:"viết thư an ủi trong đêm, hao chút sức; người lạ vẫn đứng đầu ngõ",rt:"Mẹ hồi thư, nét chữ đỡ run."},
  {n:"Dò người lạ là ai",c:{bac:-20},o:()=>40+S.mat*5,sc:1,w:{mat:1},wx:"biết ai rình nhà",l:{danh:-1},lx:"người lạ biết bị dò, đồn ngươi rình người, tiếng tăm sứt mẻ",rt:"Người lạ là gia đinh phủ {n1}.",rf:"Người lạ biến mất."}]},
 t1:{h:"Một trang không nên có",w:"maid",t:"Giữa quyển hạ có một trang ghi tên một người họ ngoại của {hh} cũng nhận bạc đê điều. Trang ấy đúng, nhưng in ra là đụng đến Trung cung.",o:[
  {n:"Giữ nguyên trang ấy",c:{hh:-3},w:{duc:3},sc:1,f:"whole",wx:"sách cha không bị cắt",lx:"giữ trang ấy là đụng Trung cung, Hoàng hậu phật lòng",rt:"Ngươi để trang ấy nằm yên."},
  {n:"Cắt trang ấy ra",c:{duc:-2},w:{hh:2},f:"cut",wx:"không đụng Trung cung",lx:"cắt chữ đúng của cha cho vừa lòng người trên, tổn đức",rt:"Ngươi gấp trang ấy cất riêng."},
  {n:"Viết thư hỏi cha",c:{suc:-1},o:()=>45+S.duc/5,sc:1,w:{tamco:1},wx:"cha tự quyết chữ của cha",l:{danh:-1},lx:"thư đi lâu mà không về, người ta bảo ngươi chần chừ, tiếng tăm sứt mẻ",rt:"Cha hồi: “Chữ đúng thì để. Con đừng gánh thay cha.”",rf:"Thư không về kịp."}]},
 x1:{h:"In hay giấu",w:"emp",t:"Mùa lũ sắp đến. Quyển hạ phải ra đời bây giờ, hoặc nằm lại trong rương.",o:[
  {n:"Dâng quyển hạ cho Hàn lâm viện khắc",c:{suc:-4},o:A=>35+S.danh/6+(A.f.whole?5:0),e:["win","lose"],rt:"Hàn lâm viện nhận khắc. Quyển hạ ra đời có ấn của viện.",rf:"Có kẻ trong viện báo phủ {n1} trước, bản thảo bị giữ lại."},
  {n:"Để nhà khắc Giang Nam in",c:{bac:-20},o:A=>40+(A.f.south?15:0)+S.mat*3,e:["win","mid"],rt:"Sách bán khắp phương nam trước khi kinh thành kịp chặn.",rf:"Nhà khắc sợ, chỉ in vài trăm bản."},
  {n:"Giấu, chờ thời",c:{},w:{mat:1},e:"mid",lx:"lũ đến mà sách chưa ra",rt:"Rương sách lại nằm sau bài vị."}]}},
 E:{win:{k:1,tag:"Quyển hạ ra đời",w:"maid",t:"Quyển hạ ‘Trị quốc sách’ được in. Sĩ tử bàn tán, quan lại tái mặt. Phủ {n1} đóng cửa ba ngày, và {v} thôi cười với ngươi.",fx:{danh:6,duc:2},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Sách nằm trong rương",t:"Sách chưa ra hết. Cha vẫn viết, ngươi vẫn giữ, phủ {n1} vẫn rình.",fx:{mat:1}},
  lose:{k:-1,tag:"Bản thảo lọt vào tay phủ {n1}",t:"Một bản thảo lọt vào tay phủ {n1}. Họ đã biết sách viết gì, và biết nó nằm ở cung ngươi.",fx:{danh:-3},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_sach",6,{t:"Kẻ bị chỉ mặt",w:"v",sj:"đòn trả của phủ {n1}",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Phủ {n1} đánh trả. Ngoài triều, môn sinh của họ dâng sớ chê sách cha là lời thầy đồ quê vu khống mệnh quan; trong cung, {v} bắt đầu ra tay với ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Phủ {n1} mất mặt",w:"v",if:RDW(1),t:"Quyển hạ ra đời ba tuần, sĩ tử dán câu trong sách lên tường phủ {n1}. {v} khóc trước Hoàng thượng rằng nhà nàng bị thầy đồ quê bôi nhọ.",o:[
  {n:"Xin vào hầu, thưa lại sự thật",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{sung:3},wx:"ngài nghe cả hai bên",l:{sung:-3},lx:"ngài chán đàn bà bàn chuyện triều, Hoàng thượng phật ý",rt:"Hoàng thượng nói: “Sách thì để triều xét.”",rf:"Ngài bảo cả hai đều ồn."},
  {n:"Gửi lời an ủi {v}",c:{},o:()=>35+S.duc/4,sc:1,w:{duc:3},wx:"cả cung thấy ngươi không hả hê",l:{danh:-1},lx:"nàng cho là ngươi giễu, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} không đáp, nhưng không khóc nữa.",rf:"{v} xé thư trước mặt cung nữ."},
  {n:"Im lặng",c:{suc:-2},w:{mat:1},wx:"không cho ai bắt lời",lx:"đóng cửa nén giận, hao sức; nước mắt {v} chiếm phần thắng",rt:"Ngươi không bước ra khỏi cung."}]},
 s2:{h:"Phủ {n1} nắm thế",w:"v",if:RDW(0),t:"Phủ {n1} biết sách viết gì, biết nó ở đâu. {v} gặp ngươi trong vườn, cười: “Nhà thầy đồ mà cũng đòi dạy triều đình.”",o:[
  {n:"Đáp lại sắc bén",c:{},o:()=>40+S.tai/4,sc:1,w:{danh:3},wx:"nàng im",l:{danh:-3},lx:"cãi nhau giữa vườn, tiếng tăm sứt mẻ; nàng thêm oán",go:A=>{rdOan(A,"v",6)},rt:"Ngươi đáp một câu kinh sử, {v} không theo được.",rf:"{hh} phạt cả hai chép kinh."},
  {n:"Cúi đầu đi qua",c:{suc:-2},w:{duc:3},wx:"không thêm sóng",lx:"cúi đầu nuốt giận, hao sức; nàng thấy ngươi sợ",rt:"Ngươi đi qua, không ngoái lại."},
  {n:"Đổi chỗ giấu sách ngay đêm ấy",c:{suc:-2},w:{mat:1},f:"hide",wx:"sách không ở chỗ cũ",lx:"thức trắng đêm dời sách, hao sức; cả cung thấy ngươi lục đục",rt:"Sách chuyển sang hộp kim chỉ."}]},
 c1:{h:"Sớ chê sách",w:"emp",t:"Ba Ngự sử, đều là môn sinh {n1}, dâng sớ: sách của thầy đồ quê là lời vu cáo, xin cấm.",o:[
  {n:"Nhờ Hàn lâm viện viết lời bình",c:{bac:-30},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"hl",wx:"sĩ lâm lên tiếng giữ sách",l:{danh:-2},lx:"Hàn lâm viện không dám dính, người ta bảo sách cha không ai bênh, tiếng tăm sứt mẻ",rt:"Hai học sĩ dâng lời bình: sách có chứng, không có vu.",rf:"Viện im lặng."},
  {n:"Xin Hoàng thượng đọc sách trước khi xét sớ",c:{suc:-3},o:()=>35+S.sung/4,sc:1,w:{sung:2},wx:"ngài tự đọc",l:{sung:-3},lx:"ngài thấy ngươi dạy vua, Hoàng thượng phật ý",rt:"Hoàng thượng sai mang sách vào Ngự thư phòng.",rf:"Ngài bảo không rảnh."},
  {n:"Để mặc, sớ tự chìm",c:{suc:-2},w:{duc:2},wx:"không tỏ ra hoảng",lx:"ngồi nhìn sớ chồng thêm, lòng mỏi, hao sức",rt:"Ngươi không làm gì."}]},
 c2:{h:"Nội vụ phủ cắt phần",w:"v",need:["v"],t:"Than sưởi, giấy mực, vải mùa đông của cung ngươi về chậm, về thiếu. Thái giám Nội vụ phủ chỉ nói “theo lệ”. Người đứng sau là {v}.",o:[
  {n:"Tự bỏ bạc mua bù",c:{bac:-40},w:{duc:2},wx:"cung không thiếu gì",lx:"tốn bạc mua bù, {v} biết đòn đã trúng",rt:"Ngươi sai người mua than ngoài cung."},
  {n:"Tâu lên {hh}",need:["hh"],c:{},o:()=>40+(S.hh||0)/4,sc:1,w:{hh:2},wx:"Trung cung chấn chỉnh Nội vụ phủ",l:{hh:-2},lx:"Trung cung phiền vì chuyện nhỏ, phật lòng",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Nội vụ phủ đem bù đủ trong ba ngày.",rf:"Trung cung bảo việc nhỏ."},
  {n:"Chịu lạnh, ghi sổ từng lần",c:{suc:-3},w:{tamco:2},wx:"có sổ làm chứng",lx:"chịu lạnh suốt mùa, sức hao",rt:"Sổ ghi đã dày ba trang."}]},
 c3:{h:"Lão thư lại đê Hoài Bắc",w:"maid",t:"Một lão thư lại coi đê Hoài Bắc lặn lội lên kinh, nhờ người đưa vào cung một lời: ông còn giữ sổ thật của đê, sổ mà phủ {n1} tưởng đã đốt.",o:[
  {n:"Gửi bạc giấu ông ở chỗ an toàn",c:{bac:-40},o:()=>45+S.mat*5,sc:1,w:{tamco:2},f:"clerk",wx:"có nhân chứng sống",l:{bac:-10},lx:"chỗ trọ bị lộ, tốn thêm bạc dời ông đi",rt:"Lão thư lại trọ ở chùa ngoài cửa thành.",rf:"Lão phải đổi chỗ, sợ hãi."},
  {n:"Xin ông gửi sổ cho cha giữ",c:{suc:-2},w:{duc:2},f:"clerk",wx:"sổ ở tay người tin được",lx:"viết thư dặn đường cả đêm, hao sức; sổ đi đường xa",rt:"Sổ đi theo gánh hàng rong về quê."},
  {n:"Từ chối, sợ là bẫy",c:{suc:-2},w:{mat:1},wx:"không sa bẫy",lx:"nghi ngờ đến mất ngủ, hao sức; mất một nhân chứng",rt:"Người đưa tin ra về."}]},
 t1:{h:"Lời đề nghị lần hai",w:"v",t:"Phủ {n1} nhắn qua {v}: rút chương cuối, cải chính một lời, thì nhà ngươi yên, {v} cũng để ngươi yên.",o:[
  {n:"Từ chối thẳng",c:{suc:-2},w:{duc:3},sc:1,f:"firm",wx:"giữ khí tiết cha",lx:"đối mặt đến kiệt sức; đòn sau sẽ nặng hơn, nàng thêm oán",go:A=>{rdOan(A,"v",8)},rt:"Ngươi đáp: “Chữ đã in, không rút được.”"},
  {n:"Hẹn trả lời sau",c:{suc:-2},w:{tamco:2},wx:"kéo thêm thời gian",lx:"thức đêm cân nhắc, hao sức; phủ {n1} biết ngươi dao động",rt:"{v} gật đầu, mắt nheo lại."},
  {n:"Nhận, xin cha cải chính một lời",c:{duc:-4},w:{bac:40},f:"deal",wx:"nhà được yên một thời",lx:"cha mất mặt với sĩ lâm vì con, tổn đức",go:A=>{rdRel(A,"v",8)},rt:"Cha cải chính một câu, nét chữ run."}]},
 x1:{h:"Đỡ đòn",w:"emp",t:"Sớ chê sách đã chồng ba tấc trên án vua. Hôm nay Hoàng thượng phê.",o:[
  {n:"Tâu Hoàng thượng phủ {n1} chèn ép",c:{suc:-5},o:A=>35+(A.f.hl?10:0),e:["win","lose"],go:A=>{rdOan(A,"v",8)},rt:"Hoàng thượng phê: sớ trả về, sách để đó.",rf:"Ngài phê: đàn bà đừng xen chính sự."},
  {n:"Âm thầm đưa sổ đê lên Ngự thư phòng",c:{suc:-3},o:A=>35+(A.f.clerk?18:0)+S.tamco/5,e:["win","mid"],rt:"Hoàng thượng đọc sổ đê, gác hết sớ chê sách.",rf:"Sổ chưa đến tay ngài, nhưng sớ cũng chưa được phê."},
  {n:"Lùi một bước, xin cho sách ngừng bán",c:{danh:-2},w:{duc:2},e:"mid",lx:"sách ngừng giữa chừng, tiếng nhà thầy đồ sứt mẻ",rt:"Sớ chê sách thôi chồng thêm."}]}},
 E:{win:{k:1,tag:"Đòn trả bị đỡ",w:"emp",t:"Sớ chê sách bị trả về. Phủ {n1} mất một lượt, và họ biết người đỡ đòn ở trong cung.",fx:{danh:5},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Hai bên gườm nhau",t:"Không ai thắng. Sách nằm đó, sớ nằm đó, và phủ {n1} tìm đường khác.",fx:{danh:1}},
  lose:{k:-1,tag:"Sách cha bị chê khắp triều",t:"Hoàng thượng phê sớ, khiển trách sách cha là “lời quê chưa xét”. Sĩ lâm im, phủ {n1} mở tiệc.",fx:{danh:-5,sung:-3}}}});

rdDef("thd_sach",7,{t:"Cha bị đe dọa",w:"maid",sj:"an nguy của cha ở quê",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Trường làng của cha bị đốt một góc. Trước cổng có giấy dán: “Thầy đồ im miệng thì sống lâu.” Kẻ dán hẹn quay lại vào phiên chợ tới. Cha không chịu rời làng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tin từ làng",w:"maid",if:RDW(1),t:"Sớ chê sách bị trả về được mười ngày thì trường làng bốc cháy. Phủ {n1} không đánh được ở triều, đánh ở quê.",o:[
  {n:"Gửi bạc dựng lại trường",c:{bac:-50},w:{duc:3},wx:"trò nhỏ có chỗ học",lx:"tốn bạc dựng trường, kẻ đốt chưa bắt được",rt:"Mái mới lợp xong trước mưa."},
  {n:"Nhờ người dò kẻ đốt",c:{bac:-30},o:()=>45+S.mat*5,sc:1,w:{mat:1},f:"trace",wx:"lần ra kẻ đốt",l:{bac:-10},lx:"dò mãi không ra, tốn thêm bạc",rt:"Kẻ đốt là tay chân một tên lý trưởng.",rf:"Kẻ đốt đã trốn khỏi huyện."},
  {n:"Viết thư khuyên cha nghỉ dạy một mùa",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:2},wx:"cha bớt lộ mặt",l:{danh:-1},lx:"cha giận con bảo nghỉ dạy, người làng bảo nhà thầy đồ sợ, tiếng tăm sứt mẻ",rt:"Cha cho trò nghỉ mười ngày.",rf:"Cha vẫn dạy, dưới mái cháy."}]},
 s2:{h:"Họ đã tìm đến nhà",w:"maid",if:RDW(0),t:"Sách cha bị chê trên triều chưa đủ, phủ {n1} còn sai người về tận làng. Trường làng cháy một góc, và mẹ không dám ra chợ.",o:[
  {n:"Gửi bạc cho mẹ",c:{bac:-40},w:{duc:3},wx:"nhà không thiếu ăn",lx:"tốn bạc, mà bạc không chặn được lửa",rt:"Mẹ hồi: “Con đừng lo.”"},
  {n:"Xin Hoàng thượng cho về thăm nhà",c:{suc:-3},o:()=>30+S.sung/3,sc:1,w:{sung:2},wx:"ngươi tận mắt thấy",l:{sung:-3},lx:"ngài thấy ngươi đặt nhà trên cung, Hoàng thượng phật ý",rt:"Ngài cho về ba ngày, kèm bốn thị vệ.",rf:"Ngài bảo không có lệ ấy."},
  {n:"Dặn học trò lớn của cha canh nhà",c:{suc:-2},w:{tamco:1},wx:"nhà có người canh",lx:"viết thư dặn dò cả đêm, hao sức; học trò chỉ có tay không",rt:"Ba học trò lớn thay nhau thức."}]},
 c1:{h:"Tri huyện làm ngơ",w:"maid",t:"Tri huyện là môn sinh cũ của {n1}. Đơn của cha nằm trên án hắn đã nửa tháng, chưa mở.",o:[
  {n:"Viết thư cho Tri phủ trên hắn",c:{bac:-20},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"Tri phủ hối Tri huyện",l:{danh:-1},lx:"Tri phủ cũng ngại, đồn ngươi cậy thế ép quan, tiếng tăm sứt mẻ",rt:"Tri huyện mở đơn ngay hôm sau.",rf:"Tri phủ hồi: “Việc huyện để huyện.”"},
  {n:"Đút lót Tri huyện",c:{bac:-50,duc:-3},o:()=>45+S.mat*3,w:{mat:1},sc:1,wx:"hắn giả vờ lo",l:{danh:-3},lx:"hắn nhận cả hai đầu rồi khoe khắp huyện, tiếng tăm sứt mẻ",rt:"Tri huyện cho hai lính canh cổng trường.",rf:"Hắn báo luôn với phủ {n1}."},
  {n:"Ghi tên hắn, chờ ngày tính",c:{duc:-1},w:{tamco:2},wx:"thêm một tên trong sổ",lx:"nuốt giận ghi tên chờ ngày trả, tổn đức; cha không có ai che",rt:"Ngươi ghi tên Tri huyện vào sổ riêng."}]},
 c2:{h:"{v} biết tin trước",w:"v",need:["v"],t:"Buổi thỉnh an, {v} hỏi khéo: “Nghe nói quê tỷ năm nay khô hanh, dễ cháy lắm nhỉ?” Nàng biết trước khi tin đến cung ngươi.",o:[
  {n:"Nắm lấy câu ấy, tâu lên",c:{suc:-3},o:()=>35+S.danh/4,sc:1,w:{danh:3},wx:"cả điện nghe nàng nói hớ",l:{danh:-2},lx:"một câu nói không làm chứng được, ngươi mang tiếng vu nàng, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",8)},rt:"{hh} nhìn {v} rất lâu.",rf:"{v} cười: “Ta hỏi thăm thôi mà.”"},
  {n:"Đáp nhẹ, nhớ kỹ",c:{suc:-2},w:{tamco:2},wx:"nàng không biết ngươi đã hiểu",lx:"cười mà nén giận, hao sức; nàng đắc ý",rt:"Ngươi cười: “Đa tạ muội lo.”"},
  {n:"Gặp riêng {v}, xin tha cho cha",c:{},o:()=>35+S.duc/4,sc:1,w:{duc:2},wx:"có thể nàng nói giúp",l:{danh:-3},lx:"nàng đem lời xin về phủ cười, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} im lâu, rồi nói: “Ta không đốt trường.”",rf:"{v} bảo: “Bảo cha tỷ rút sách.”"}]},
 c3:{h:"Học trò canh cổng",w:"maid",t:"Học trò cũ của cha kéo về làng, đêm đêm cầm gậy canh cổng trường. Có đứa còn đòi đi đánh trả.",o:[
  {n:"Gửi bạc nuôi cơm học trò",c:{bac:-30},w:{duc:2},f:"guard",wx:"cổng có người canh",lx:"tốn bạc nuôi cơm học trò",rt:"Cơm nấu ở sân trường, mười đứa thay nhau thức."},
  {n:"Dặn cha cấm học trò đánh trả",c:{suc:-2},w:{duc:3},wx:"không ai có cớ bắt cha",lx:"viết thư dặn cha giữa đêm, hao sức; học trò ấm ức",rt:"Cha gọi cả bọn lại, giảng một bài về chữ Nhẫn."},
  {n:"Cho học trò dò về kẻ đốt",c:{},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},f:"trace",wx:"lần ra kẻ đốt",l:{danh:-1},lx:"học trò bị đánh, người ta bảo ngươi xui trò gây sự, tiếng tăm sứt mẻ",rt:"Học trò bắt được một kẻ lạ đêm rình.",rf:"Một học trò bị đánh gãy tay."}]},
 t1:{h:"Đón cha lên kinh?",w:"maid",t:"Ở làng, cha không ai che. Ở kinh, cha ở ngay dưới mắt phủ {n1}, nhưng cũng gần ngươi.",o:[
  {n:"Xin cha lên kinh",c:{bac:-30},o:()=>40+S.duc/5,sc:1,w:{duc:2},f:"city",wx:"cha ở gần con",l:{duc:-1},lx:"cha không chịu bỏ trò, giận con ép, tổn đức",rt:"Cha gật đầu: “Cha đi, nhưng trò đi theo.”",rf:"Cha nói: “Cha bỏ làng thì ai dạy chữ?”"},
  {n:"Để cha ở lại, gửi người canh",c:{bac:-20},w:{tamco:1},f:"stay",wx:"cha giữ được trường",lx:"tốn bạc thuê người canh, cha ở xa tầm tay",rt:"Hai người canh đến làng."},
  {n:"Để cha tự quyết",c:{suc:-2},w:{duc:2},wx:"cha thấy con tôn trọng",lx:"thức đêm lo cho cha, hao sức; cha chọn ở lại, không ai canh",rt:"Cha ở lại."}]},
 x1:{h:"Đêm trước phiên chợ",w:"maid",t:"Phiên chợ tới là ngày kẻ dán giấy hẹn quay lại. Đêm nay ngươi phải quyết.",o:[
  {n:"Xin Hoàng thượng chiếu cho quan phủ bảo hộ",c:{suc:-5},o:A=>30+S.sung/5,e:["win","lose"],rt:"Chiếu về huyện, Tri phủ thân đến làng. Kẻ đốt bị bắt giữa chợ.",rf:"Ngài bảo việc huyện để huyện. Đêm ấy làng không ai ngủ."},
  {n:"Thuê tiêu cục hộ tống cha lên kinh",c:{bac:-80},o:A=>45+(A.f.city?15:0)+S.mat*3,e:["win","mid"],rt:"Cha lên kinh an toàn, trọ trong một ngõ gần Hàn lâm viện.",rf:"Cha đi, nhưng mẹ ở lại, trường bỏ trống."},
  {n:"Khuyên cha đốt bản thảo giữ mạng",c:{duc:-3},w:{mat:1},e:"mid",lx:"khuyên cha đốt chữ của chính mình, tổn đức; chữ của cha thành tro",rt:"Cha đốt bản nháp, giữ lại bản đã in."}]}},
 E:{win:{k:1,tag:"Cha bình an",w:"maid",t:"Cha bình an. Kẻ đốt trường khai tên một quản sự phủ {n1}. Lần đầu tiên, phủ ấy để lại dấu tay.",fx:{danh:4,duc:2},go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Cha tạm yên",t:"Cha tạm yên, nhưng trường làng vắng tiếng đọc. Phủ {n1} chờ dịp khác.",fx:{duc:1}},
  lose:{k:-1,tag:"Cha bị thương, trường cháy",t:"Phiên chợ ấy, trường làng cháy rụi. Cha bị đánh gãy tay phải, tay cầm bút. Ông nhắn: “Tay trái cha vẫn viết được.”",fx:{danh:-2,duc:-2},go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("thd_sach",8,{t:"Dâng sách",w:"emp",sj:"bộ sách dâng lên ngự lãm",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Kinh diên mùa thu, Hoàng thượng cho học sĩ giảng sách. Đây là dịp đưa trọn bộ ‘Trị quốc sách’ lên ngự lãm. Bản dâng phải chép sạch, đóng bìa đúng phép trước ngày kinh diên.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Phủ {n1} để lại dấu tay",w:"emp",if:RDW(1),t:"Lời khai của kẻ đốt trường nằm trong tay ngươi. Cha nói: “Đừng dâng lời khai. Dâng sách. Sách nói thay mọi lời.”",o:[
  {n:"Nghe cha, chỉ dâng sách",c:{suc:-2},w:{duc:3},f:"pure",wx:"bản dâng sạch, không mùi thù",lx:"thức chép bản dâng, hao sức; lời khai nằm yên",rt:"Ngươi cất lời khai vào hộp."},
  {n:"Kẹp lời khai vào cuối sách",c:{suc:-2},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},f:"proof",wx:"ngài đọc sách sẽ thấy cả tội",l:{danh:-2},lx:"bị cho là mượn sách để tố, tiếng tăm sứt mẻ",rt:"Lời khai nằm dưới trang cuối.",rf:"Cha phát hiện, giận ngươi."},
  {n:"Gửi lời khai cho Đại Lý tự",c:{bac:-20},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"việc đốt trường có án",l:{danh:-1},lx:"Đại Lý tự có người của {n1}, lời khai bị gác, tiếng tăm sứt mẻ",rt:"Đại Lý tự mở án.",rf:"Lời khai bị gác dưới đáy hòm."}]},
 s2:{h:"Dâng sách khi sách bị chê",w:"emp",if:RDW(0),t:"Sách cha đang mang tiếng, cha đang khốn. Dâng sách lúc này là đánh cược: được thì rửa hết, mất thì mất hết.",o:[
  {n:"Vẫn dâng",c:{suc:-2},w:{tamco:2},f:"bet",wx:"không lùi",lx:"chép tiếp mấy đêm cho kịp, hao sức; nặng tay",rt:"Ngươi bắt đầu chuẩn bị bản dâng."},
  {n:"Dâng một chương thôi",c:{sung:-2},w:{duc:2},f:"part",wx:"bớt chỗ cho người bắt bẻ",lx:"ngài không thấy trọn, Hoàng thượng phật ý vì sách dâng nửa vời",rt:"Ngươi chọn chương đê điều."},
  {n:"Hỏi ý Thái hậu trước",need:["th"],c:{suc:-2},o:()=>35+(S.th||0)/3,sc:1,w:{th:3},wx:"Thái hậu chỉ đường",l:{th:-2},lx:"Thái hậu ngại chuyện triều, phật lòng",rt:"Thái hậu nói: “Dâng vào ngày giảng ‘Thượng thư’, ngài sẽ đọc.”",rf:"Thái hậu bảo: “Đàn bà dâng sách, xưa nay hiếm.”"}]},
 c1:{h:"Chép bản dâng",w:"maid",t:"Bản dâng phải chép chữ chân, giấy Tuyên, bìa gấm vàng nhạt. Tự chép thì kịp, nhưng chữ ngươi chưa đủ đẹp; thuê thư thủ giỏi thì tốn.",o:[
  {n:"Thuê thư thủ giỏi nhất kinh",c:{bac:-60},o:()=>55+S.mat*2,sc:1,w:{danh:2},f:"fine",wx:"bản dâng đẹp như sách ngự",l:{bac:-10},lx:"thư thủ đòi thêm, tốn thêm bạc",rt:"Bản dâng xong trước kinh diên năm ngày.",rf:"Thư thủ chậm, xong sát ngày."},
  {n:"Tự chép",c:{suc:-6},w:{tai:2,duc:2},f:"self",wx:"chữ con chép sách cha",lx:"tự chép đến kiệt sức, nét chữ chưa thật đẹp",rt:"Ngươi chép đến mờ mắt, kịp ngày."},
  {n:"Nhờ học trò của cha chép",c:{bac:-20},o:()=>45+S.danh/5,sc:1,w:{duc:1},wx:"học trò góp tay",l:{danh:-1},lx:"chữ không đều, bản dâng bị chê, tiếng tăm sứt mẻ",rt:"Năm học trò mỗi người chép một chương.",rf:"Một học trò chép sai, phải chép lại."}]},
 c2:{h:"{v} dò bản dâng",w:"v",need:["v"],t:"Thư thủ được ngươi thuê bị người của {v} gạ bạc: chỉ cần chép sai mười chữ trong chương đê điều.",o:[
  {n:"Đổi thư thủ ngay",c:{bac:-30},w:{mat:1},wx:"bản dâng sạch",lx:"tốn bạc thuê người mới, chậm lại mấy ngày; {v} thêm oán",go:A=>{rdOan(A,"v",4)},rt:"Thư thủ mới bắt đầu chép lại từ đầu."},
  {n:"Giữ hắn, đọc soát từng chữ",c:{suc:-4},o:()=>45+S.tai/4,sc:1,w:{tamco:2},wx:"bắt quả tang chữ sai",l:{suc:-2},lx:"soát mỏi mắt mà sót, sức kiệt thêm",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Ngươi bắt được bảy chữ sai, hắn quỳ khai người gạ.",rf:"Sót ba chữ."},
  {n:"Trả bạc gấp đôi để hắn trung thành",c:{bac:-50},w:{mat:1},wx:"hắn thành người của ngươi",lx:"tốn bạc mua lòng thư thủ",rt:"Hắn nhận, xin chép cẩn thận gấp đôi."}]},
 c3:{h:"Sổ đê của lão thư lại",w:"maid",t:"Lão thư lại đê Hoài Bắc hỏi: có nên đính sổ đê thật vào sau bản dâng không. Sổ ấy là chứng sống của chương cuối.",o:[
  {n:"Đính sổ vào",c:{},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},f:"ledger",wx:"sách có chứng đi kèm",l:{danh:-2},lx:"bản dâng nặng mùi tố cáo, tiếng tăm sứt mẻ",rt:"Sổ đê nằm sau trang cuối, bọc lụa.",rf:"Lão thư lại sợ, rút sổ về."},
  {n:"Giữ sổ riêng cho ngày xét",c:{bac:-10},w:{mat:1},f:"keep",wx:"chứng còn trong tay",lx:"tốn bạc thuê chỗ giấu sổ; bản dâng thiếu chứng",rt:"Sổ đê nằm trong rương của ngươi."},
  {n:"Xin lão tự dâng lên Đại Lý tự",c:{suc:-2},w:{duc:2},wx:"chứng đi đường công",lx:"lo cho lão đến mất ngủ, hao sức; lão một mình trước Đại Lý tự",rt:"Lão gật đầu, run run."}]},
 t1:{h:"Ai đem sách vào",w:"emp",t:"Phi tần không dâng sách thẳng vào kinh diên. Phải qua tay một học sĩ, hoặc qua Thái giám Ngự thư phòng.",o:[
  {n:"Qua tay học sĩ Hàn lâm",c:{bac:-20},o:()=>45+S.danh/5,sc:1,w:{danh:2},f:"hl",wx:"sách vào bằng cửa sĩ lâm",l:{danh:-1},lx:"học sĩ sợ, rút lui, người ta bảo sách không ai dám đỡ, tiếng tăm sứt mẻ",rt:"Học sĩ nhận lời giảng một chương.",rf:"Học sĩ cáo bệnh sát ngày."},
  {n:"Qua thái giám Ngự thư phòng",c:{bac:-40},o:()=>45+S.mat*4,sc:1,w:{mat:1},f:"eun",wx:"sách nằm trên án vua",l:{bac:-10},lx:"thái giám ăn hai đầu, tốn thêm bạc",rt:"Sách nằm ngay trên án.",rf:"Thái giám nhận bạc rồi để sách dưới đáy chồng."},
  {n:"Tự dâng vào ngày ngài đến cung",c:{suc:-3},o:()=>35+S.sung/3,sc:1,w:{sung:2},f:"own",wx:"ngài nhận từ tay ngươi",l:{sung:-3},lx:"ngài không thích chuyện triều bên gối, Hoàng thượng phật ý",rt:"Ngài nhận, đặt cạnh gối.",rf:"Ngài bảo: “Đem đến Ngự thư phòng.”"}]},
 x1:{h:"Ngày kinh diên",w:"emp",t:"Kinh diên mở ở Văn Hoa điện. Phi tần không được bước vào; ngươi chờ tin ở cung, bản dâng đã nằm trong tay người đem vào. Học sĩ giảng xong một chương ‘Thượng thư’, Hoàng thượng hỏi: “Ai còn sách muốn dâng?”",o:[
  {n:"Để bản dâng tự nói",c:{suc:-4},o:A=>35+(A.f.fine?8:0)+(A.f.pure?8:0)+(A.f.hl?6:0),e:["win","mid"],rt:"Hoàng thượng đọc trọn chương đê điều giữa điện, rồi bảo đem cả bộ vào.",rf:"Ngài nhận sách, gật đầu, rồi bàn việc khác."},
  {n:"Xin học sĩ đọc to chương cuối",c:{suc:-4},o:A=>30+(A.f.ledger?12:0)+(A.f.proof?8:0),e:["win","lose"],rt:"Chương cuối vang giữa điện. Phe {n1} không ai dám ngẩng.",rf:"Phe {n1} đứng dậy phản bác ngay giữa kinh diên."},
  {n:"Rút lại, dâng vào dịp khác",c:{},w:{mat:1},e:"mid",lx:"công chép uổng một mùa",rt:"Bản dâng về lại hộp gấm."}]}},
 E:{win:{k:1,tag:"Hoàng thượng đọc trọn bộ",w:"emp",t:"Hoàng thượng thức ba đêm đọc trọn ‘Trị quốc sách’. Ngài gạch đỏ hai mươi chỗ, và hỏi: “Thầy đồ này là cha nàng?”",fx:{danh:6,sung:4}},
  mid:{k:0,tag:"Sách nằm trên án, chưa mở",t:"Sách đã đến án vua. Ngài chưa đọc, cũng chưa trả.",fx:{danh:1}},
  lose:{k:-1,tag:"Bản dâng gây tranh cãi",t:"Kinh diên thành nơi cãi vã. Hoàng thượng phẩy tay: “Sách này để Hình bộ xem.”",fx:{danh:-4,sung:-3},go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("thd_sach",9,{t:"Văn tự ngục",w:"emp",sj:"tội danh phỉ báng triều đình",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Một Ngự sử môn sinh của {n1} dâng sớ, dẫn một câu trong sách: “Vua sáng chẳng dùng tôi tham” — cắt nửa câu, đọc thành lời chê vua dùng tôi tham. Sớ buộc sách thầy đồ tội phỉ báng triều đình. Đại Lý tự đã cho người đi giải cha về kinh. Gom chứng trước phiên thẩm.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Đọc xong mới bị tố",w:"emp",if:RDW(1),t:"Hoàng thượng đọc trọn sách chưa được một tuần trăng, phe {n1} đã tố sách phỉ báng. Họ sợ chính điều ngài đã đọc.",o:[
  {n:"Xin Hoàng thượng nhớ lời ngài phê",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{sung:3},f:"emp",wx:"ngài nhớ chỗ gạch đỏ",l:{sung:-3},lx:"ngài không muốn bị nhắc, Hoàng thượng phật ý",rt:"Ngài nói: “Trẫm đọc, trẫm biết.”",rf:"Ngài bảo: “Có án thì xử án.”"},
  {n:"Chép lại hai mươi chỗ ngài gạch",c:{suc:-3},w:{tamco:2},f:"red",wx:"có chứng ngài đã khen",lx:"chép từng dòng đến khuya, hao sức; việc ngài làm, ngươi đem ra dùng",rt:"Ngươi chép từng dòng, kèm ngày tháng."},
  {n:"Giữ yên, lo cho cha trước",c:{bac:-20},w:{duc:2},wx:"cha có áo ấm khi bị giải",lx:"tốn bạc lo áo ấm cho cha; không ai lo phần sách",rt:"Áo bông theo xe giải đi trước."}]},
 s2:{h:"Sách đến tay Hình bộ",w:"emp",if:RDW(0),t:"Sách cha đã sang tay Hình bộ. Phe {n1} chỉ cần một câu là đủ, và họ đã tìm ra câu ấy.",o:[
  {n:"Tìm nguyên văn câu bị trích",c:{suc:-3},o:()=>40+S.tai/4,sc:1,w:{tai:2},f:"full",wx:"câu bị cắt nửa",l:{suc:-2},lx:"lật cả bộ chưa ra, sức kiệt thêm",rt:"Nguyên câu là: “Vua sáng chẳng dùng tôi tham, nên đê vững.”",rf:"Bản trong tay ngươi in khác bản của Hình bộ."},
  {n:"Gửi bạc lo cho cha trên đường giải",c:{bac:-40},w:{duc:3},wx:"cha không bị đánh",lx:"tốn bạc, mà bạc vào túi lính giải",rt:"Cha đến kinh, tay chân lành lặn."},
  {n:"Xin gặp Hoàng hậu",need:["hh"],c:{suc:-2},o:()=>35+(S.hh||0)/4,sc:1,w:{hh:2},wx:"Trung cung biết chuyện",l:{hh:-2},lx:"Trung cung không muốn dính, phật lòng",rt:"Hoàng hậu hứa nói một câu.",rf:"Hoàng hậu bảo việc triều không đến hậu cung."}]},
 c1:{h:"Câu văn bị cắt chữ",w:"maid",t:"Câu bị tố nằm giữa trang. Đọc trọn câu thì là lời khen vua sáng; cắt nửa thì thành lời chê.",o:[
  {n:"Đem bản in gốc đối chiếu",c:{bac:-20},o:()=>45+S.danh/5,sc:1,w:{danh:3},f:"full",wx:"câu bị cắt lộ ra",l:{danh:-1},lx:"bản gốc khó tìm, người ta bảo ngươi bới chữ chạy tội, tiếng tăm sứt mẻ",rt:"Ba bản in ba nơi đều có nửa câu sau.",rf:"Bản gốc đã bị thu hết."},
  {n:"Nhờ học sĩ Hàn lâm giảng câu ấy",c:{suc:-2},o:()=>40+S.danh/4,sc:1,w:{danh:2},f:"hl",wx:"sĩ lâm đứng ra giảng",l:{danh:-2},lx:"học sĩ sợ vạ lây, từ chối khắp nơi, tiếng tăm sứt mẻ",rt:"Học sĩ viết một bài giảng câu ấy theo sách Mạnh Tử.",rf:"Học sĩ nói: “Chuyện văn tự ngục, ai dám.”"},
  {n:"Im, chờ phiên thẩm mới nói",c:{suc:-2},w:{tamco:2},wx:"lời để dành cho chỗ cần",lx:"ngồi nén lời đến mất ngủ, hao sức; lời tố lan khắp triều trước",rt:"Ngươi gấp trang sách lại."}]},
 c2:{h:"{v} đứng ra làm chứng",w:"v",need:["v"],t:"Phi tần không ra Đại Lý tự. Phủ {n1} nộp sang đó một tờ khai do thái giám cung {v} chép lời nàng: nàng từng nghe ngươi đọc câu ấy, rồi cười mà nói “Hoàng thượng nên đọc kỹ”.",o:[
  {n:"Viết lời bác từng câu khai của {v}",c:{suc:-4},o:()=>35+S.tamco/4+S.danh/6,sc:1,w:{danh:3},wx:"lời khai của nàng lung lay",l:{danh:-3},lx:"bác không nổi thì mang tiếng chối tội, tiếng tăm sứt mẻ; nàng thêm oán",go:A=>{rdOan(A,"v",10)},rt:"{v} nhầm ngày, nhầm chỗ, lời khai vỡ.",rf:"{v} khóc, người nghe tin nàng."},
  {n:"Gặp riêng {v}, nhắc nàng chuyện phủ nàng",c:{},o:()=>35+S.duc/4,sc:1,w:{duc:2},f:"talk",wx:"nàng có thể rút lời",l:{danh:-2},lx:"nàng đem lời gặp riêng thành chứng mới, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} lặng lẽ xin sửa lời khai.",rf:"{v} khai thêm: ngươi đến dọa nàng."},
  {n:"Không đáp lời khai",c:{suc:-2},w:{duc:2},wx:"không thêm lửa",lx:"ngồi im nghe lời khai lan, hao sức; lời khai đứng nguyên",rt:"Ngươi để lời khai nằm đó."}]},
 c3:{h:"Người của Đại Lý tự",w:"maid",t:"Một chủ sự Đại Lý tự, họ xa của phủ {n1}, nhắn: hắn giữ hồ sơ án sách, có thể để sót vài tờ, nếu có bạc trước phiên thẩm.",o:[
  {n:"Đưa bạc",c:{bac:-60,duc:-4},o:()=>40+S.mat*4,w:{tamco:1},sc:1,f:"bribe",wx:"hồ sơ nhẹ đi",l:{danh:-5},lx:"lộ thì thành tội mua án, tiếng tăm sứt mẻ nặng",rt:"Hai tờ sớ nặng lời biến khỏi hồ sơ.",rf:"Hắn nhận bạc, báo luôn với phe {n1}."},
  {n:"Từ chối, ghi tên hắn",c:{suc:-2},w:{duc:3,tamco:1},wx:"tay sạch",lx:"viết tên hắn mà lòng nặng trĩu, hao sức; hồ sơ nặng nguyên",rt:"Ngươi ghi tên chủ sự vào sổ."},
  {n:"Nhờ một Ngự sử xin cho chủ sự ấy hồi tị",c:{suc:-2},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"án thêm một người sạch",l:{danh:-1},lx:"Đại Lý tự khanh cho là không cần hồi tị, người ta bảo nhà ngươi nghi oan quan án, tiếng tăm sứt mẻ",rt:"Chủ sự là họ xa của phủ {n1}, phải hồi tị, bị đổi khỏi án.",rf:"Đại Lý tự khanh bảo họ đã xa, không cần hồi tị."}]},
 t1:{h:"Cha trong ngục",w:"maid",t:"Cha bị giam ở ngục Đại Lý tự. Ông nhắn ra một câu, viết bằng tay trái: “Đừng vì cha mà quỳ trước ai.”",o:[
  {n:"Gửi bạc lo cơm áo trong ngục",c:{bac:-30},w:{duc:3},wx:"cha không đói rét",lx:"tốn bạc, phần lớn vào túi cai ngục",rt:"Cha có chăn ấm, có giấy bút."},
  {n:"Xin Hoàng thượng cho vào thăm",c:{suc:-3},o:()=>30+S.sung/3,sc:1,w:{sung:2,duc:2},f:"visit",wx:"nghe lời cha tận mặt",l:{sung:-3},lx:"ngài thấy ngươi xin quá phận, Hoàng thượng phật ý",rt:"Ngài cho thăm một khắc. Cha chỉ hỏi con có đủ áo không.",rf:"Ngài bảo không có lệ."},
  {n:"Nghe lời cha, không quỳ",c:{danh:-2},w:{tamco:2},sc:1,f:"stand",wx:"đứng thẳng mà đánh",lx:"người ta bảo con gái lạnh với cha, tiếng tăm sứt mẻ",rt:"Ngươi gấp lá thư vào tay áo."}]},
 x1:{h:"Phiên thẩm đầu",w:"emp",t:"Phiên thẩm đầu ở Đại Lý tự. Ngươi không được dự, nhưng chứng ngươi gom được sẽ đi vào thay ngươi.",o:[
  {n:"Gửi nguyên văn câu và bài giảng",c:{suc:-4},o:A=>35+(A.f.full?12:0)+(A.f.hl?6:0),e:["win","lose"],rt:"Đại Lý tự đọc trọn câu, tội phỉ báng không đứng được.",rf:"Đại Lý tự bảo: văn có hai nghĩa thì xét theo nghĩa xấu."},
  {n:"Xin Hoàng thượng tự xét án",c:{suc:-5},o:A=>30+(A.f.emp?10:0)+(A.f.red?8:0)+S.sung/8,e:["win","mid"],rt:"Hoàng thượng thu án về tay ngài.",rf:"Ngài để Đại Lý tự xét tiếp, nhưng dặn không được dùng hình."},
  {n:"Xin cho cha nhận một lỗi nhẹ",c:{duc:-2},w:{duc:1},e:"mid",lx:"cha mang tiếng có lỗi với chữ, ngươi để cha nhận tội không có, tổn đức",rt:"Cha nhận lỗi “lời lẽ thiếu cẩn trọng”."}]}},
 E:{win:{k:1,tag:"Tội phỉ báng bị bác",w:"emp",t:"Tội phỉ báng không đứng được. Cha vẫn bị giữ chờ phiên sau, nhưng ai cũng thấy phe {n1} đã chọn sai câu.",fx:{danh:5},go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Tội nhẹ đi, cha còn bị giữ",t:"Tội nhẹ đi, cha còn ở ngục chờ Hoàng thượng xét. Sách cha bị niêm, cấm lưu hành.",fx:{danh:-1}},
  lose:{k:-1,tag:"Sách bị đốt trước Ngọ môn",t:"Đại Lý tự nghị tội phỉ báng, Hoàng thượng chuẩn. Sách bị cấm lưu hành, ván khắc bị thu, mấy trăm bản ‘Trị quốc sách’ bị đốt trước Ngọ môn. Cha còn trong ngục; Hoàng thượng nể tình, không bắt tội lây đến ngươi.",fx:{danh:-6,sung:-2},go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("thd_sach",10,{t:"Bảo vệ cha",w:"emp",sj:"bản án của cha",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Mai Hoàng thượng tự xét án sách ở Cần Chánh điện: cha quỳ dưới thềm, {n1} đứng trong hàng quan — chỗ ấy phi tần không được bước tới. Đêm nay ngài cho gọi ngươi vào Ngự thư phòng và cho ngươi nói một lần. Phán thế nào là việc của ngài.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phe {n1} cùng đường",w:"emp",if:RDW(1),t:"Tội phỉ báng bị bác, phe {n1} quay sang tội khác: cha “tự ý bàn chính sự, xúi sĩ tử chống quan”.",o:[
  {n:"Gom lời sĩ tử làm chứng",c:{bac:-30},o:()=>45+S.danh/5,sc:1,w:{danh:3},f:"scholars",wx:"sĩ tử đứng ra làm chứng",l:{danh:-2},lx:"chứng thành bè phái, tiếng tăm sứt mẻ",rt:"Năm mươi sĩ tử ký tên.",rf:"Sĩ tử bị dọa, rút tên."},
  {n:"Chuẩn bị lời nói duy nhất",c:{suc:-4},w:{tai:2},f:"words",wx:"lời gọn mà nặng",lx:"viết rồi xóa đến khuya, hao sức; không gặp ai",rt:"Ngươi viết rồi xóa đến bảy lần."},
  {n:"Gửi sâm vào ngục",c:{bac:-30},w:{duc:3},wx:"cha có sức quỳ",lx:"tốn bạc mua sâm",rt:"Cha nhận sâm, nhắn: “Con nói ngắn thôi.”"}]},
 s2:{h:"Sách đã cháy",w:"emp",if:RDW(0),t:"Sách cha đã cháy hoặc bị niêm. Còn lại chỉ có người: cha, và ngươi.",o:[
  {n:"Khôi phục sách từ bản chép tay",c:{suc:-4},o:()=>40+S.tai/4,sc:1,w:{tai:2},f:"words",wx:"sách còn trên giấy",l:{suc:-2},lx:"thiếu nhiều trang, chép mãi đến kiệt sức",rt:"Ngươi chép lại từ trí nhớ và bản dự phòng.",rf:"Thiếu gần nửa bộ."},
  {n:"Xin Thái hậu che chở",need:["th"],c:{suc:-2},o:()=>35+(S.th||0)/3,sc:1,w:{th:3},f:"th",wx:"Thái hậu để mắt",l:{th:-3},lx:"Thái hậu không muốn dính, phật lòng",rt:"Thái hậu nói: “Thầy đồ già thì tha được.”",rf:"Thái hậu bảo ngươi về chép kinh."},
  {n:"Chuẩn bị nhận lỗi thay cha",c:{sung:-2},w:{duc:3},wx:"cha có thể được nhẹ",lx:"viết tờ nhận lỗi thay cha, Hoàng thượng nhìn ngươi khác đi, phật ý",rt:"Ngươi viết sẵn tờ xin chịu tội."}]},
 c1:{h:"Sổ đê đem ra",w:"maid",t:"Sổ đê thật vẫn còn: trong rương ngươi, ở nhà cha, hoặc trong tay lão thư lại. Đem ra hôm xét là đổi án sách thành án tham ô.",o:[
  {n:"Đem sổ ra",c:{suc:-3},o:()=>40+S.tamco/4,sc:1,w:{tamco:3},f:"ledger",wx:"án đổi chiều",l:{danh:-2},lx:"lão thư lại bị lộ mặt, người ta bảo ngươi đem người già ra đỡ, tiếng tăm sứt mẻ",rt:"Sổ đi vào điện bằng tay một Ngự sử sạch, nhân danh y.",rf:"Ngự sử bị chặn ở cửa điện."},
  {n:"Để lão thư lại tự dâng",c:{},o:()=>35+S.mat*5,sc:1,w:{duc:2},f:"ledger",wx:"nhân chứng sống nói trước điện",l:{danh:-1},lx:"lão sợ, không dám nói, chứng thành lời đồn, tiếng tăm sứt mẻ",rt:"Lão quỳ, run mà nói rõ từng con số.",rf:"Lão bị người lạ chặn đường."},
  {n:"Không đem sổ, chỉ giữ cha",c:{suc:-2},w:{duc:2},f:"only",wx:"án gọn, chỉ xoay quanh cha",lx:"ngồi giữ cha mà lòng rối, hao sức; {n1} vô sự",rt:"Sổ đê nằm yên trong rương."}]},
 c2:{h:"{v} chờ dưới hành lang",w:"v",need:["v"],t:"Trên đường đến Ngự thư phòng, {v} đứng chờ dưới hành lang, không mang cung nữ. Nàng khẽ nói: “Nếu cha ta đổ, ta cũng không còn gì.”",o:[
  {n:"Hứa giữ nàng nếu cha nàng đổ",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:3},f:"vpromise",wx:"nàng có thể không cản",l:{danh:-1},lx:"lời hứa nặng mà nàng không tin, đem kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?15:-4)},rt:"{v} cúi đầu, không nói gì nữa.",rf:"{v} cười khẩy: “Ngươi giữ được ai?”"},
  {n:"Lặng im",c:{suc:-2},w:{tamco:1},wx:"không lộ ý",lx:"nén lời đến mỏi, hao sức; nàng còn đường làm loạn",rt:"Ngươi đi qua, nhìn thẳng về phía Ngự thư phòng."},
  {n:"Đáp: cha ngươi tự chọn",c:{suc:-2},w:{tamco:2},wx:"nàng biết ngươi không lùi",lx:"nói thẳng mà lòng nặng, hao sức; nàng hận",go:A=>{rdOan(A,"v",10)},rt:"{v} siết khăn trong tay."}]},
 t1:{h:"Cha dặn",w:"maid",t:"Trước giờ xét, thái giám đưa vào một mảnh giấy của cha: “Nếu phải chọn giữa sách và cha, con chọn sách. Cha già rồi, sách còn sống lâu.”",o:[
  {n:"Nghe cha, giữ sách",c:{suc:-2},w:{duc:3},f:"book",wx:"chữ của cha còn",lx:"thức trắng mà chọn, hao sức; cha có thể bị giam",rt:"Ngươi gấp mảnh giấy, cất vào ngực."},
  {n:"Không nghe, giữ cha",c:{suc:-2},w:{duc:2},f:"dad",wx:"cha ra khỏi ngục",lx:"thức trắng mà chọn, hao sức; sách có thể mất",rt:"Ngươi đốt mảnh giấy."},
  {n:"Tìm cách giữ cả hai",c:{suc:-3},w:{tamco:2},f:"both",wx:"không chịu mất gì",lx:"nghĩ đến tận chuông điểm, kiệt sức; tham hai thì dễ mất cả",rt:"Ngươi nghĩ đến tận lúc chuông điện điểm."}]},
 x1:{h:"Lời của con gái",w:"emp",t:"Ngự thư phòng chỉ còn một ngọn đèn. Hoàng thượng gác bút: “Mai trẫm xét án. Nàng nói đi. Một lần.”",o:[
  {n:"Thưa: sách đúng, xin xét kẻ bị sách chỉ mặt",c:{suc:-5},o:A=>30+(A.f.ledger?15:0)+(A.f.book?5:0),e:["win","lose"],rt:"Sáng hôm sau, Hoàng thượng sai mở án tham ô đê điều. {n1} bị tháo mũ ngay giữa điện.",rf:"Ngài phẩy tay: “Đây là án sách, không phải án đê.”"},
  {n:"Thưa: xin tha cho cha, sách tùy ngài",c:{suc:-3},o:A=>45+(A.f.dad?12:0)+S.sung/6,e:["mid","lose"],lx:"sách có thể bị cấm",rt:"Hôm sau, Hoàng thượng tha cha, cấm sách lưu hành.",rf:"Ngài bảo không tha được người khi sách còn có tội."},
  {n:"Thưa: xin ngài đọc lại trang đã gạch đỏ",c:{suc:-4},o:A=>30+(A.f.both?8:0)+(A.f.words?8:0)+(rdEnd(8)==="win"?12:0),e:["win","mid"],rt:"Ngài lật đến trang ấy, im lâu, rồi phán: “Sách không có tội.”",rf:"Ngài đọc, rồi thở dài: “Trẫm khen sách, nhưng triều chưa sẵn.”"}]}},
 E:{win:{k:1,tag:"Án lật, {n1} lộ mặt",w:"emp",t:"Hoàng thượng phán: cha được thả. Án sách thành án tham ô đê điều. {n1} bị giam chờ xét, phủ ấy niêm phong. {v} đóng cửa cung khóc ba ngày.",fx:{danh:8,sung:3,duc:2},go:A=>{rdOan(A,"v",12);return ""}},
  mid:{k:0,tag:"Cha được tha, sách bị cấm",t:"Cha ra khỏi ngục, gầy rộc. Sách bị cấm lưu hành, ván khắc bị thu. {n1} vẫn đứng trong hàng quan.",fx:{danh:1,duc:2}},
  lose:{k:-1,tag:"Cha bị giam",t:"Cha bị giữ lại chờ xét tiếp, sách bị cấm lưu hành, ván khắc bị thu. Hoàng thượng nể tình, không bắt tội lây đến ngươi. Ngươi rời Ngự thư phòng, không khóc trước mặt ai.",fx:{danh:-5,sung:-3}}}});

rdDef("thd_sach",11,{t:"Chữ nghĩa",w:"emp",sj:"số phận của sách cha",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Thượng thư";return rdCast(A,["v"])},
 g:"Án sách đi đến hồi cuối. Hoàng thượng sắp ban chiếu: ‘Trị quốc sách’ là sách triều đình, sách cấm, hay tro. Cha ngươi ra sao theo sách ấy. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sau ngày án lật",w:"emp",if:RDW(1),t:"Cha ở tạm trong kinh. Sĩ tử kéo đến cửa trọ xin chữ. Hàn lâm viện cho người đến nhà trọ hỏi: nếu có chiếu triệu, cha có ra làm quan không. Cha nhờ mẹ gửi thư hỏi ngươi nên thưa lại thế nào.",o:[
  {n:"Thưa: cha chỉ muốn dạy học",c:{suc:-2},w:{duc:3},f:"humble",wx:"giữ cái thanh của nhà thầy đồ",lx:"viết lời thưa cẩn thận, hao sức; cha bỏ một cái ghế",rt:"Viện ghi lại, kính nể."},
  {n:"Thưa: cha nhận nếu được giữ sách",c:{suc:-2},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"office",wx:"cha có ghế, sách có người giữ",l:{danh:-2},lx:"người ta bảo nhà thầy đồ cũng ham quan, tiếng tăm sứt mẻ",rt:"Viện nhận lời trình lên.",rf:"Viện bảo việc ấy phải chờ chiếu."},
  {n:"Để cha tự đáp",c:{duc:-1},w:{tamco:1},wx:"không ai nói ngươi xen",lx:"đứng ngoài để cha tự lo, tổn đức; không lo được gì cho cha",rt:"Cha chỉ cười, không đáp."}]},
 s2:{h:"Cha còn trong ngục",w:"emp",if:RDW(0),t:"Sách bị cấm, cha còn ở ngục hoặc vừa ra, gầy như que củi. Chiếu cuối chưa ban.",o:[
  {n:"Xin chịu giáng phần bổng thay cha",c:{bac:-40},o:()=>40+S.duc/4,sc:1,w:{duc:4},f:"pay",wx:"cha được nhẹ một phần",l:{sung:-2},lx:"ngài thấy ngươi mặc cả án, Hoàng thượng phật ý",rt:"Ngài nhận, ghi vào án.",rf:"Ngài bảo án không đổi bằng bạc."},
  {n:"Chép kinh cầu an cho cha",c:{suc:-3},w:{duc:3},wx:"lòng yên",lx:"chép kinh cả tuần trăng, hao sức; không ai đọc kinh của ngươi",rt:"Ngươi chép xong bộ kinh trong một tuần trăng."},
  {n:"Nhờ sĩ lâm dâng sớ xin tha",c:{bac:-30},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"scholars",wx:"triều nghe sĩ lâm",l:{danh:-2},lx:"sớ bị chê là bè đảng, tiếng tăm sứt mẻ",rt:"Hai mươi sĩ tử dâng sớ.",rf:"Sớ bị gác."}]},
 c1:{h:"Ván khắc gỗ",w:"maid",t:"Ván khắc gỗ ‘Trị quốc sách’ còn nằm ở nhà khắc. Ai giữ ván, người ấy quyết sách còn hay mất về sau.",o:[
  {n:"Bỏ bạc chuộc ván về cung",c:{bac:-60},o:()=>45+S.mat*4,sc:1,w:{mat:1},f:"blocks",wx:"sách không thể mất hẳn",l:{bac:-10},lx:"chỉ chuộc được nửa số ván, tốn thêm bạc",rt:"Ván khắc nằm trong kho cung ngươi.",rf:"Chỉ chuộc được nửa số ván."},
  {n:"Xin dâng ván lên Hàn lâm viện",c:{},o:()=>40+S.danh/4,sc:1,w:{danh:2},f:"hlblocks",wx:"sách về nơi công",l:{danh:-1},lx:"viện không nhận ván sách đang có án, người ta bảo ngươi đem sách cấm đi gửi, tiếng tăm sứt mẻ",rt:"Viện nhận ván, cất vào kho sách.",rf:"Viện không nhận ván sách đang có án."},
  {n:"Để ván ở nhà khắc",c:{suc:-2},w:{duc:1},wx:"không dính thêm",lx:"ngồi lo cho ván đến mất ngủ, hao sức; phủ {n1} có thể mua đốt",rt:"Ngươi không nhắc đến ván."}]},
 c2:{h:"{v} sau cùng",w:"v",need:["v"],t:"Phủ {n1} lung lay. {v} đến cung ngươi, không trang điểm: “Ngươi thắng hay thua thì nhà ta cũng đã tan một nửa.”",o:[
  {n:"Xin Hoàng thượng đừng liên lụy {v}",c:{suc:-2},o:()=>40+S.duc/4,sc:1,w:{duc:4},f:"spare",wx:"oán thôi truyền sang đời sau",l:{danh:-1},lx:"người ta bảo ngươi nuôi hổ, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?20:-4)},rt:"{v} quỳ, lạy ngươi một lạy.",rf:"{v} bảo không cần ngươi thương."},
  {n:"Tiễn nàng ra, không nói",c:{suc:-2},w:{tamco:2},wx:"không mềm lòng",lx:"tiễn nàng mà lòng nặng, hao sức; thù còn nguyên, nàng thêm oán",go:A=>{rdOan(A,"v",6)},rt:"Cửa cung khép sau lưng {v}."},
  {n:"Hỏi nàng điều phủ nàng còn giấu",c:{suc:-2},o:()=>35+S.tamco/4,sc:1,w:{tamco:3},f:"vtell",wx:"biết thêm một tội của {n1}",l:{danh:-2},lx:"nàng thấy bị dồn, đem kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",10);else rdRel(A,"v",-4)},rt:"{v} buột miệng nói ra nơi giấu sổ bạc.",rf:"{v} bỏ về."}]},
 t1:{h:"Cha muốn về làng",w:"maid",t:"Cha nhắn: “Án xong thì cha về làng. Chữ là của thiên hạ, cha chỉ là người viết.”",o:[
  {n:"Tiễn cha về làng",c:{suc:-2},w:{duc:3},wx:"cha giữ được trường",lx:"tiễn cha mà lòng nặng, hao sức; cha xa kinh, xa con",rt:"Cha về, mang theo một gói giấy dó."},
  {n:"Xin cha ở lại kinh",c:{bac:-30},w:{danh:2},f:"stay",wx:"cha gần sách, gần con",lx:"tốn bạc nuôi cha ở kinh; cha không vui ở kinh",rt:"Cha ở lại, buồn mà không nói."},
  {n:"Xin Hoàng thượng cho cha mở trường ở kinh",c:{suc:-3},o:()=>35+S.sung/4,sc:1,w:{danh:3},f:"school",wx:"cha dạy học giữa kinh thành",l:{sung:-3},lx:"ngài thấy ngươi xin quá, Hoàng thượng phật ý",rt:"Ngài ban một nếp nhà gần Quốc Tử giám.",rf:"Ngài bảo chờ án xong."}]},
 x1:{h:"Chiếu về sách",w:"emp",t:"Đêm trước khi ban chiếu, Hoàng thượng để bản thảo chiếu trên án Ngự thư phòng, hỏi ngươi như hỏi chuyện nhà: “Sách của cha nàng, nàng muốn xin trẫm điều gì?” Chiếu là của ngài; ngươi chỉ được xin.",o:[
  {n:"Xin cho sách được khắc in lại",c:{suc:-5},o:A=>30+(A.f.blocks||A.f.hlblocks?10:0)+S.danh/8,e:["win","lose"],rt:"Chiếu ban: ‘Trị quốc sách’ được khắc lại, cha được ban mũ áo.",rf:"Ngài bảo sách này còn làm triều chia rẽ. Chiếu giữ lệnh cấm."},
  {n:"Xin tha cha, sách để ngài định",c:{},o:A=>50+(A.f.pay?10:0)+S.duc/6,e:["mid","lose"],lx:"sách cha có thể mãi bị cấm",rt:"Cha được tha về quê. Sách vẫn cấm, nhưng không ai còn truy.",rf:"Án cha chưa khép, cha còn bị giữ."},
  {n:"Xin ngài giữ sách trong Ngự thư phòng",c:{suc:-3},o:A=>40+(rdEnd(10)==="win"?12:0),e:["win","mid"],lx:"sách không đến tay thiên hạ",rt:"Ngài cười: “Trẫm giữ, và trẫm in.”",rf:"Ngài giữ sách, không in."}]}},
 E:{win:{k:1,tag:"Sách cha thành sách triều đình",w:"emp",gi:["nghien","emp"],t:"‘Trị quốc sách’ được khắc in bằng ván của triều. Cha được ban mũ áo, về làng dạy học trong tiếng kính nể. Hoàng thượng gọi ngươi là “con gái nhà chữ”.",fx:{danh:12,sung:4,duc:4}},
  mid:{k:0,tag:"Sách cấm, cha bình an về quê",t:"Sách cha còn cấm, nhưng cha bình an về làng. Đêm đêm, học trò vẫn chép tay sách cha dưới đèn dầu.",fx:{danh:2,duc:3}},
  lose:{k:-1,tag:"Cha bị giam, ngươi giữ được ngôi",t:"Cha còn trong ngục chờ ân xá. Sách bị cấm lưu hành, ván khắc bị thu. Hoàng thượng nể tình, không bắt tội lây đến ngươi: ngươi giữ được ngôi vị, và giữ trong rương một bản chép tay không ai biết.",fx:{danh:-6,sung:-2}}}});
RD97L.push({a:"thd_sach_11",tag:"Sách mở đường cải cách, cha vào Hàn lâm viện",w:"emp",p:.12,n:"Xin Hoàng thượng lấy sách cha làm phép trị đê",c:{suc:-4},
 path:["Thưa: cha nhận nếu được giữ sách","Bỏ bạc chuộc ván về cung","Xin dâng ván lên Hàn lâm viện","Xin Hoàng thượng đừng liên lụy","Xin Hoàng thượng cho cha mở trường","Nhờ sĩ lâm dâng sớ"],np:2,bad:["Để ván ở nhà khắc","Tiễn nàng ra, không nói"],sc:2,x:[()=>S.danh>=50,"Danh từ 50"],
 t:"Hoàng thượng đặt ‘Trị quốc sách’ lên án triều hội: “Đê Hoài Bắc sẽ đắp theo sách này.” Cha được triệu vào Hàn lâm viện, áo vải đứng giữa hàng áo gấm. Sĩ tử gọi phép đắp đê mới là “phép thầy đồ”.",
 fx:{danh:14,sung:5,duc:4},rw:"bienngu",ti:"Con gái người viết Trị quốc sách"});

/* ---------- thd_tro · Học trò của cha ---------- */
/* BAL.road keys needed: none (deadlines are written into the hồi text; no chapter-level constant).
   Story-only NPCs (ROAD_MAP §5.4): {n1} = the student of her father (same person as ARC67.thd_tro .4, carried by the engine in S.st.f14.n1);
   {n2} = the false Tiến sĩ of an earlier exam, elder cousin (biểu huynh) of {v}, from {v}'s maternal house (engine-carried S.st.f14.n2).
   Enemy house = {v}'s maternal house (bought the paper in .4); the official behind the leak = "Thị lang bộ Lễ" (Phó chủ khảo), never named. */
function thdTroCast(A){/* {n1}/{n2} are carried by the engine (jroad: S.st.f14.n1/n2, saved at each chapter end); a name is made only when none exists yet */
 try{const f=(S.st&&S.st.f14)||{};const nm=()=>pick(SURN)+" "+pick(MALEN);A.n1=A.n1||f.n1||nm();A.n2=A.n2||f.n2||nm()}catch(e){A.n1=A.n1||"học trò của cha";A.n2=A.n2||"biểu huynh của nàng ta"}
 return rdCast(A,["v"])}

rdDef("thd_tro",5,{t:"Đề thi bị bán",w:"maid",sj:"kẻ bán đề thi trong Lễ bộ",cast:thdTroCast,
 g:"Khoa án của {n1} đã khép, mà đề thi vẫn có người bán. Có kẻ trong Lễ bộ chép đề ra ngoài trước ngày thi. Tìm ra kẻ bán trước khi hắn bán tiếp cho khoa sau.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đề thi Hương rao ở chợ sách",w:"maid",if:RDW(1),t:"{n1} nay đã làm quan ở Hàn lâm viện. Hắn gửi vào cung một tờ giấy: đề thi Hương năm nay đang được rao bán ở chợ sách ngoài cửa Chính Dương, ba trăm lạng một bản.",o:[
  {n:"Mua một bản làm chứng",c:{bac:-40},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"paper",wx:"có tận tay đề bị bán",l:{danh:-2},lx:"kẻ bán đánh hơi, đồn có người trong cung mua đề, tiếng tăm sứt mẻ",rt:"Bản đề mua về khớp từng chữ với đề niêm trong Lễ bộ.",rf:"Kẻ bán đưa đề giả rồi biến mất."},
  {n:"Bảo {n1} báo ngay Lễ bộ",c:{danh:-2},w:{duc:2},wx:"giữ đúng phép",lx:"tin báo lọt về tai kẻ bán, người ta bảo ngươi đánh rắn động cỏ, tiếng tăm sứt mẻ",f:"clean",rt:"Lễ bộ đổi đề trong một đêm. Kẻ bán im hơi lặng tiếng."},
  {n:"Lặng lẽ theo dấu bạc",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"trail",wx:"biết bạc chảy về đâu",l:{sung:-2},lx:"Hoàng thượng nghe ngươi cho người ra chợ, phật ý",rt:"Bạc bán đề chảy về một hiệu cầm đồ của nhà ngoại {v}.",rf:"Người theo dấu bị lạc giữa chợ."}]},
 s2:{h:"Kẻ mua đề vẫn ung dung",w:"maid",if:()=>rdK()===0,t:"{n1} được ghi tên bảng vàng, nhưng nhà mua đề không ai bị xử. Hắn nhắn vào cung: ở Quốc Tử Giám người ta đã rao đề của kỳ sau.",o:[
  {n:"Gửi bạc nhờ {n1} dò giúp",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"trail",wx:"có người dò ở Quốc Tử Giám",l:{danh:-2},lx:"{n1} bị để ý, đồn ngươi dùng quan riêng, tiếng tăm sứt mẻ",rt:"{n1} biết được tên hiệu sách nhận đặt đề.",rf:"Giám sinh thấy {n1} hỏi han, đi báo thầy."},
  {n:"Khuyên {n1} yên phận làm quan",c:{danh:-2},w:{duc:2},wx:"học trò của cha được yên",lx:"khuyên học trò của cha lùi bước, sĩ lâm chê, tiếng tăm sứt mẻ; kẻ bán đề càng lộng",rt:"{n1} cúi đầu vâng lời, nhưng thư sau hắn vẫn nhắc chuyện đề."},
  {n:"Viết thư hỏi {dad}",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"cha nhớ ra một người quen cũ ở Lễ bộ",l:{duc:-1},lx:"cha già lo lắng mất ngủ vì con, tổn đức",rt:"Cha hồi thư: người khắc đề ở Lễ bộ xưa kia từng học trường làng cạnh nhà.",rf:"Thư đi chậm, cha hồi khi việc đã nguội."}]},
 s3:{h:"Học trò sắp về quê",w:"maid",if:()=>rdK()<0,t:"Từ ngày ngươi bị trách xen việc triều, nhà ngoại {v} khoe khắp kinh. {n1} trượt bảng, sắp về quê, nhưng hắn nhớ một điều: tờ đề trong tay kẻ mua có dấu son của Lễ bộ.",o:[
  {n:"Giữ {n1} ở lại kinh",c:{bac:-30},w:{duc:3},wx:"còn nhân chứng ở kinh",lx:"tốn bạc nuôi {n1} ở kinh; {v} biết ngươi chưa buông, thêm oán",go:A=>{rdOan(A,"v",4)},rt:"{n1} thuê lại căn gác cũ gần Quốc Tử Giám."},
  {n:"Để hắn về, chỉ xin hắn vẽ lại dấu son",c:{suc:-2},w:{mat:1},f:"paper",wx:"có hình dấu son",lx:"ngồi chép lại dấu son đến khuya, hao sức; mất nhân chứng ở kinh",rt:"{n1} vẽ lại dấu son trên mảnh giấy dó, rồi lên đường về quê."},
  {n:"Tạ lỗi với Hoàng thượng trước đã",c:{suc:-3},o:()=>35+S.sung/3,w:{sung:3},sc:1,wx:"Hoàng thượng nguôi giận",l:{sung:-2},lx:"ngài nhắc lại lời trách, Hoàng thượng phật ý",rt:"Hoàng thượng chỉ nói: “Việc của nàng là hậu cung.” Nhưng ngài ở lại dùng bữa.",rf:"Ngài phẩy tay cho lui."}]},
 c1:{h:"Thư lại khắc đề",w:"maid",t:"Đề thi do phòng khắc in của Lễ bộ khắc bản. Một tên thư lại ở đó vừa mua nhà mới — lương mười năm của hắn không đủ trả một gian. Phải hỏi được hắn trước khi Lễ bộ khóa sổ cuối năm.",o:[
  {n:"Cho người hỏi chuyện vợ hắn",c:{bac:-20},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"biết ai đưa bạc",l:{danh:-2},lx:"vợ hắn kể lại với chồng, đồn ngươi tra hỏi đàn bà, tiếng tăm sứt mẻ",rt:"Vợ hắn khoe: bạc mua nhà là “quà của quan trên”.",rf:"Vợ hắn đóng cửa không tiếp."},
  {n:"Nhờ {n1} báo Ngự sử đài",c:{suc:-3},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"clean",wx:"việc ra ánh sáng",l:{danh:-2},lx:"kẻ đứng sau kịp bịt miệng, Ngự sử về tay không, tiếng tăm sứt mẻ",rt:"Ngự sử nhận lời tra phòng khắc in.",rf:"Ngự sử đến thì sổ khắc đã bị thay."},
  {n:"Mua chuộc hắn khai",c:{bac:-50,duc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"paper",wx:"có lời khai viết tay",l:{bac:-20},lx:"hắn nhận bạc hai đầu, tốn thêm bạc",rt:"Hắn viết một tờ khai, điểm chỉ đỏ lòm.",rf:"Hắn nhận bạc rồi chạy đi báo quan trên."}]},
 c2:{h:"Lễ vật của {v}",w:"v",need:["v"],t:"{v} sai người mang lễ sang: lụa, trà, và một câu nhắn: “Chuyện thi cử là việc đàn ông ngoài triều. Muội đừng mệt.”",o:[
  {n:"Nhận lễ, giả như nghe lời",c:{duc:-2},w:{bac:40},f:"feint",wx:"{v} tưởng ngươi đã lùi",lx:"nhận lễ của kẻ mua đề, tổn đức; nhận lễ là để lại dấu",rt:"{v} cười hài lòng, thôi sai người rình cung ngươi."},
  {n:"Trả lễ, nói thẳng",c:{danh:-1},w:{duc:2},wx:"giữ tay sạch",lx:"nói thẳng mà mất lòng cả cung, tiếng tăm sứt mẻ; {v} thêm oán",go:A=>{rdOan(A,"v",6)},rt:"Lễ được trả nguyên phong. {v} đập vỡ chén trà."},
  {n:"Mời {v} uống trà, dò ý",c:{suc:-2},o:()=>35+S.duc/4,w:{tamco:1},sc:1,wx:"biết nàng biết đến đâu",l:{sung:-2},lx:"{v} đi kể ngươi bới chuyện nhà nàng, Hoàng thượng nghe, phật ý",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} buột miệng: “Nhà ngoại ta chỉ nhờ người quen trong Lễ bộ thôi.”",rf:"{v} chỉ cười, không đáp."}]},
 t1:{h:"Dấu son trên tờ đề",w:"dad",t:"Dấu son trên tờ đề bị bán là dấu riêng của quan Phó chủ khảo — chính Thị lang bộ Lễ. {dad} nhìn hình dấu, lặng đi: năm xưa, hắn cùng khoa thi với cha, và cha trượt.",o:[
  {n:"Giữ tờ đề, chưa động",c:{duc:-2},w:{tamco:2},wx:"cầm một lá bài",lx:"biết mà chưa nói, tổn đức; Thị lang còn thời gian xóa dấu",rt:"Ngươi cất tờ đề vào hộp trang sức."},
  {n:"Nhờ {n1} so dấu son ở Hàn lâm viện",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"paper",wx:"dấu son được đối chiếu",l:{danh:-2},lx:"Thị lang biết có người so dấu, đồn {n1} làm việc riêng cho ngươi, tiếng tăm sứt mẻ",rt:"Dấu son khớp với dấu trên một tờ trình cũ của Thị lang.",rf:"Người giữ hồ sơ không cho mượn."},
  {n:"Hỏi cha chuyện khoa thi năm xưa",c:{danh:-2},w:{duc:2},wx:"hiểu mối hận cũ của cha",lx:"vết thương cũ của cha bị khơi lại, người làng bàn tán, tiếng tăm sứt mẻ",rt:"Cha kể: năm ấy bài của cha bị chấm trượt, còn bài của hắn đỗ — với một câu văn của cha."}]},
 x1:{h:"Ba ngày trước khi thư lại bị đưa đi",w:"maid",t:"Lễ bộ bất ngờ điều tên thư lại khắc đề đi Vân Nam. Ba ngày nữa hắn lên đường. Lời khai của hắn chỉ còn lấy được trước hôm ấy.",o:[
  {n:"Giữ hắn lại, lấy lời khai",c:{suc:-5},o:A=>35+S.mat*4,e:["win","lose"],rt:"Hắn khai trước mặt Ngự sử: đề được chép ra theo lệnh Thị lang bộ Lễ, bán qua nhà ngoại {v}.",rf:"Đêm trước hôm khai, hắn đã bị đưa đi sớm."},
  {n:"Mua bản sao sổ khắc đề",c:{bac:-60},o:A=>40+(A.f.paper?15:0)+S.tamco/5,e:["win","mid"],rt:"Sổ khắc đề ghi rõ ai đã mượn bản khắc đêm trước ngày thi.",rf:"Bản sao thiếu đúng trang cần."},
  {n:"Để hắn đi, chỉ ghi lại tên",c:{},w:{duc:2},e:"mid",lx:"lời khai đi theo hắn",rt:"Ngươi ghi tên hắn vào sổ riêng."}]}},
 E:{win:{k:1,tag:"Lần ra kẻ bán đề",w:"v",t:"Đầu mối đã rõ: Thị lang bộ Lễ cho chép đề, nhà ngoại {v} bán ra. Từ hôm nay, cả hai nhà ấy biết tên ngươi.",fx:{danh:5,mat:1},go:A=>{rdOan(A,"v",8);return""}},
  mid:{k:0,tag:"Biết tên mà chưa có chứng",t:"Ngươi biết ai bán đề, nhưng trong tay chỉ có vài tờ giấy. Kẻ bán vẫn ngồi ghế cũ.",fx:{tamco:1}},
  lose:{k:-1,tag:"Manh mối đứt",t:"Thư lại đi Vân Nam, sổ khắc đã bị thay. Nhà ngoại {v} cười, và {n1} thấy mình bị người lạ theo dõi.",fx:{danh:-3},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",6,{t:"Bảng vàng",w:"v",sj:"bảng vàng khoa trước",cast:thdTroCast,
 g:"Đề bị bán không chỉ một khoa. Khoa trước, {n2} — biểu huynh của {v} — đỗ Tiến sĩ, nay làm Tri huyện. Muốn lật bảng vàng cũ là phải lật cả nhà ngoại {v}.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời khai nêu thêm một tên",w:"maid",if:RDW(1),t:"Lời khai của thư lại có một dòng ngươi suýt bỏ qua: khoa trước, đề cũng được chép ra, và người mua là nhà ngoại {v} — cho {n2}.",o:[
  {n:"Lấy danh sách khoa trước",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"paper",wx:"biết ai đỗ khoa ấy",l:{danh:-2},lx:"Lễ bộ biết có người lục bảng cũ, tiếng tăm sứt mẻ",rt:"Tên {n2} đứng thứ ba bảng Tiến sĩ, chữ trong quyển thi đẹp như chữ một người khác.",rf:"Người giữ bảng nói bảng cũ đã cất vào kho."},
  {n:"Giữ kín, chờ thêm chứng",c:{duc:-2},w:{tamco:2},wx:"không động rừng",lx:"ngồi im nhìn kẻ gian giữ ghế, tổn đức; {n2} vẫn ngồi ghế quan",rt:"Ngươi chép dòng ấy vào sổ riêng."},
  {n:"Nhờ {n1} hỏi đồng khoa của {n2}",c:{bac:-20},o:()=>40+S.danh/4,w:{danh:1},sc:1,wx:"có lời đồng khoa",l:{duc:-1},lx:"{n1} bị kéo sâu thêm, ngươi day dứt, tổn đức",rt:"Một đồng khoa kể: {n2} làm thơ ở yến Quỳnh Lâm mà không thành câu.",rf:"Đồng khoa sợ, không ai nói."}]},
 s2:{h:"Một sĩ tử già gõ cửa nhà cha",w:"dad",if:RDW(0),t:"Một sĩ tử già lặn lội đến nhà {dad} ở quê, kể: khoa trước, {n2} — biểu huynh của {v} — chữ còn viết sai mà đỗ Tiến sĩ, nay làm Tri huyện.",o:[
  {n:"Đón sĩ tử già lên kinh",c:{bac:-30},w:{duc:2},f:"witness",wx:"thêm một người làm chứng",lx:"tốn bạc nuôi người",rt:"Ông lão trọ ở chùa ngoài thành, ngày ngày chép kinh chờ."},
  {n:"Nhờ cha ghi lại lời ông",c:{suc:-2},w:{mat:1},f:"paper",wx:"có giấy trắng mực đen",lx:"ngồi chép lời kể cùng cha, hao sức; lời kể chưa phải bằng chứng",rt:"Cha chép lời ông lão, ký tên làm chứng."},
  {n:"Khuyên ông lão đừng nói nữa",c:{duc:-2},w:{tamco:1},wx:"không động nhà {v}",lx:"ông lão thất vọng về cha con ngươi, tổn đức",rt:"Ông lão chống gậy ra về, không ngoảnh lại."}]},
 c1:{h:"Quyển thi trong kho Lễ bộ",w:"maid",t:"Quyển thi cũ còn trong kho Lễ bộ: bản mực do thí sinh tự viết, bản son do thư lại chép lại. Cuối năm kho sẽ đốt quyển cũ — phải lấy được trước ngày ấy.",o:[
  {n:"Lo cho người giữ kho mở cửa",c:{bac:-50},o:()=>45+S.mat*4,w:{mat:2},sc:1,f:"paper",wx:"có quyển mực của {n2}",l:{danh:-3},lx:"lấy đồ trong kho là tội, chuyện lộ, tiếng tăm sứt mẻ",rt:"Bản mực của {n2} viết bằng một nét chữ không phải của hắn.",rf:"Người giữ kho nhận bạc rồi báo Thị lang."},
  {n:"Xin Hoàng thượng cho Hàn lâm viện xem lại quyển cũ",c:{suc:-3},o:()=>35+S.sung/4,w:{danh:2},sc:1,f:"clean",wx:"việc làm theo phép",l:{sung:-3},lx:"ngài thấy ngươi lại xen việc khoa cử, Hoàng thượng phật ý",rt:"Hoàng thượng cho Hàn lâm viện mượn quyển, không hỏi lý do.",rf:"Ngài hỏi: “Nàng lại muốn lật bảng nào?”"},
  {n:"Để mặc kho đốt quyển",c:{danh:-2},w:{duc:1},wx:"không phạm phép",lx:"chứng cứ thành tro, sĩ lâm bảo ngươi bỏ cuộc, tiếng tăm sứt mẻ",rt:"Khói kho Lễ bộ bay suốt một buổi chiều."}]},
 c2:{h:"{v} mời ngươi dự tiệc",w:"v",need:["v"],t:"{v} mời ngươi dự tiệc mừng nhà ngoại nàng được ban biển. Ở tiệc, nàng nói khẽ: “Biểu huynh ta là người hiếu nghĩa. Ai làm hại huynh ấy, ta không quên.”",o:[
  {n:"Dự tiệc, nói lời mừng",c:{bac:-20},w:{duc:2},wx:"giữ hòa khí",lx:"tốn bạc sắm lễ mừng, nuốt giận cười",go:A=>{rdRel(A,"v",4)},rt:"{v} rót cho ngươi một chén, mắt không cười."},
  {n:"Đáp: người hiếu nghĩa thì không sợ bảng vàng bị xem lại",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,wx:"cả tiệc nể ngươi",l:{sung:-2},lx:"thành ra cãi nhau giữa tiệc, Hoàng thượng nghe, phật ý; {v} thêm oán",go:A=>{rdOan(A,"v",8)},rt:"Cả tiệc lặng đi. {v} tái mặt.",rf:"{v} tâu với Hoàng hậu là ngươi phá tiệc."},
  {n:"Cáo bệnh không dự",c:{duc:-1},w:{tamco:1},wx:"không để lộ ý",lx:"khinh lễ người ta, tổn đức; {v} thêm oán",go:A=>{rdOan(A,"v",3)},rt:"Ngươi gửi một bình hoa thay mình."}]},
 t1:{h:"{n2} xin bái sư",w:"dad",t:"{n2} gửi lễ hậu về quê, xin bái {dad} làm thầy. Ai cũng hiểu: có danh là học trò của cha ngươi, hắn sẽ khó bị lật.",o:[
  {n:"Khuyên cha nhận, giữ hắn gần",c:{duc:-2},w:{bac:30},f:"near",wx:"biết hắn tính gì",lx:"để cha nhận lễ kẻ gian, tổn đức; danh cha bị hắn mượn",rt:"Cha nhận lễ, giao hắn chép một trang Luận ngữ. Chữ hắn vụng như trẻ lên mười."},
  {n:"Khuyên cha từ chối",c:{danh:-1},w:{duc:3},wx:"tay cha sạch",lx:"người ta bảo nhà thầy đồ kiêu, tiếng tăm sứt mẻ; nhà {v} thêm một mối hận",go:A=>{rdOan(A,"v",4)},rt:"Cha trả lễ: “Thầy đồ nghèo không dạy nổi quan Tri huyện.”"},
  {n:"Để cha thử tài hắn trước mặt người làng",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"witness",wx:"cả làng thấy hắn không viết nổi",l:{danh:-2},lx:"hắn biết bị thử, kể khắp huyện rằng thầy đồ làm nhục quan, tiếng tăm sứt mẻ",rt:"{n2} cầm bút run tay, viết sai hai chữ.",rf:"Hắn cáo bận, không đến."}]},
 x1:{h:"Thơ mừng thọ ở Hàn lâm viện",w:"emp",t:"Hoàng thượng triệu các Tiến sĩ khoa trước về Hàn lâm viện làm thơ mừng thọ Thái hậu; {n2} cũng có tên. Ngài hỏi ngươi: “Đề nên ra thế nào cho thú?”",o:[
  {n:"Xin ra đề làm thơ ngay tại chỗ",c:{suc:-4},o:A=>35+S.tai/5,e:["win","lose"],rt:"{n2} cầm bút cả canh giờ, nộp tờ giấy chỉ có bốn câu sai luật. Hoàng thượng nhíu mày.",rf:"{n2} đã được nhắc bài trước, thơ trơn tru. Hoàng thượng khen hắn, còn nhìn ngươi lạ lùng."},
  {n:"Lặng lẽ trao quyển mực cũ cho Hàn lâm viện",c:{bac:-20},o:A=>40+(A.f.paper?15:0)+S.mat*3,e:["win","mid"],rt:"Học sĩ Hàn lâm so chữ, thấy chữ trong quyển cũ không phải chữ {n2}.",rf:"Học sĩ nhận quyển nhưng không dám nói."},
  {n:"Thưa: đề do Hoàng thượng ra mới quý",c:{},w:{sung:2},e:"mid",lx:"bỏ lỡ dịp vạch mặt",rt:"Hoàng thượng ra đề về hoa cúc, {n2} làm bài tầm thường mà qua."}]}},
 E:{win:{k:1,tag:"Bảng vàng lộ vết",w:"emp",t:"Hoàng thượng sai giữ {n2} ở kinh chờ xét. Nhà ngoại {v} rối loạn, và lần đầu tiên nàng không cười khi gặp ngươi.",fx:{danh:5,sung:2},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Nghi mà chưa lật",t:"Trong Hàn lâm viện người ta thì thầm về chữ của {n2}, nhưng hắn vẫn về huyện làm quan.",fx:{danh:1}},
  lose:{k:-1,tag:"Nhà ngoại {v} đứng vững",t:"{n2} được khen trước điện. Nhà ngoại {v} biết ai đã muốn hại hắn, và họ bắt đầu ra tay trước.",fx:{sung:-3,danh:-2},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("thd_tro",7,{t:"Học trò bị truy",w:"maid",sj:"lệnh truy bắt {n1}",cast:thdTroCast,
 g:"Nhà ngoại {v} không đợi bị lật. Chúng vu cho {n1} tội đánh người ở tửu lâu, phủ Thuận Thiên phát trát bắt. Vào ngục rồi, một học trò nghèo có thể chết trước khi được xét.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ lạ ngã vỡ đầu",w:"maid",if:RDW(1),t:"Ba hôm sau buổi thơ, có kẻ lạ gây sự với {n1} ở tửu lâu rồi tự lao đầu vào cột. Sáng ra, trát bắt đã dán ở cửa thành.",o:[
  {n:"Tìm người làm chứng ở tửu lâu",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"witness",wx:"có người thấy tận mắt",l:{danh:-2},lx:"kẻ vu biết ngươi tìm người, đồn ngươi mua chứng, tiếng tăm sứt mẻ",rt:"Tiểu nhị tửu lâu thấy kẻ lạ tự đập đầu.",rf:"Tiểu nhị đã bị đuổi về quê."},
  {n:"Giấu {n1} ngay trong đêm",c:{bac:-20},w:{duc:2},f:"hide",wx:"hắn chưa bị bắt",lx:"tốn bạc thuê chỗ giấu; trốn là mang tiếng có tội",rt:"{n1} trốn vào hậu viện một ngôi chùa ngoài thành."},
  {n:"Khuyên hắn ra trình diện",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"tỏ ra không sợ",l:{duc:-2},lx:"đặt mạng hắn vào tay phủ Thuận Thiên, ngươi day dứt, tổn đức",rt:"Phủ doãn thấy học trò tự đến, cho tại ngoại chờ xét.",rf:"Hắn bị giam ngay."}]},
 s2:{h:"Trát bắt dán ở cửa thành",w:"maid",if:RDW(0),t:"{n2} vẫn ngồi vững, và giờ đến lượt nhà ngoại {v} ra tay: một kẻ lạ tố {n1} đánh người ở tửu lâu. Trát bắt đã dán ở cửa thành.",o:[
  {n:"Giấu {n1} ở nhà cha",c:{bac:-20},w:{duc:2},f:"hide",wx:"xa kinh, khó tìm",lx:"tốn bạc đưa hắn về quê; liên lụy đến cha",rt:"{n1} về quê, ở gian chái nhà {dad}."},
  {n:"Cho người dò kẻ tố",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"witness",wx:"biết kẻ tố là ai",l:{danh:-2},lx:"bị nói là che tội phạm, tiếng tăm sứt mẻ",rt:"Kẻ tố là gia nhân nhà ngoại {v}.",rf:"Kẻ tố đã đổi chỗ ở."},
  {n:"Mặc cho phủ Thuận Thiên xét",c:{duc:-2},w:{tamco:1},wx:"không dính vào",lx:"bỏ mặc học trò của cha, tổn đức; {n1} một mình chống án",rt:"Ngươi chỉ gửi ra một gói bạc nhỏ cho hắn tiêu."}]},
 c1:{h:"Mười ngày của trát bắt",w:"maid",t:"Trát bắt có hạn mười ngày; quá hạn không bắt được thì án phải trình lên Hình bộ, nơi nhà {v} không có người. Giữ {n1} cho qua mười ngày ấy.",o:[
  {n:"Lo lót cho bộ khoái chậm chân",c:{bac:-50,duc:-2},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"qua được mười ngày",l:{danh:-3},lx:"lo lót bộ khoái là tội, chuyện lộ, tiếng tăm sứt mẻ",rt:"Bộ khoái lục soát sai chỗ ba lần.",rf:"Bộ khoái nhận bạc rồi vẫn đi đúng chỗ."},
  {n:"Đổi chỗ trốn mỗi đêm",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"hide",wx:"không ai đoán được",l:{duc:-1},lx:"{n1} kiệt sức, chạy giữa đêm mưa, ngươi day dứt, tổn đức",rt:"Mười ngày, mười chỗ ngủ. {n1} gầy rộc mà vẫn sống.",rf:"Một chỗ trốn bị lộ, hắn phải chạy giữa đêm mưa."},
  {n:"Nhờ cha đệ đơn xin Hình bộ nhận án sớm",c:{},o:()=>35+S.danh/4,w:{danh:2},sc:1,f:"clean",wx:"án về nơi công tâm",l:{sung:-2},lx:"Hoàng thượng thấy tên ngươi sau lá đơn của cha, phật ý",rt:"Hình bộ nhận án, phủ Thuận Thiên hết quyền bắt.",rf:"Hình bộ bảo phải đợi đủ hạn."}]},
 c2:{h:"{v} đến cung ngươi",w:"v",need:["v"],t:"{v} đến thăm, đặt lên bàn một tờ giấy: lệnh bãi trát bắt, chỉ thiếu chữ ký. “Muội bỏ chuyện bảng vàng, ta lo xong chuyện tửu lâu.”",o:[
  {n:"Nhận lời, đổi lấy mạng {n1}",c:{duc:-3},w:{tamco:1},wx:"{n1} được bãi trát",lx:"đổi lẽ phải lấy mạng người, tổn đức; bảng vàng cũ được yên",f:"deal",go:A=>{rdRel(A,"v",8)},rt:"Ba ngày sau, trát bắt được gỡ khỏi cửa thành."},
  {n:"Từ chối",c:{danh:-1},w:{duc:2},wx:"không bán lẽ phải",lx:"từ chối mà mang tiếng bỏ mặc học trò, tiếng tăm sứt mẻ; {v} thêm oán",go:A=>{rdOan(A,"v",8)},rt:"{v} cầm tờ giấy đi: “Vậy thì mặc trời.”"},
  {n:"Giả vờ nghĩ thêm, giữ tờ giấy làm chứng",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"witness",wx:"có chữ của nhà {v} trên tờ lệnh",l:{sung:-2},lx:"{v} biết bị lừa, khóc với Hoàng thượng, ngài phật ý",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Tờ lệnh có ấn của một Chủ sự là người nhà ngoại {v}.",rf:"{v} giật lại tờ giấy."}]},
 t1:{h:"Thị vệ cùng quê",w:"maid",t:"Một thị vệ gác cửa Tây Hoa là người cùng làng với {dad}, từng học vỡ lòng ở trường cha. Hắn nói nhỏ: “Đêm mai phủ Thuận Thiên lục soát chùa ngoài thành.”",o:[
  {n:"Nhờ hắn báo tin mỗi đêm",c:{bac:-20},w:{mat:1},wx:"có tai mắt ở cửa thành",lx:"tốn bạc nuôi tai mắt; hắn liều mạng vì ngươi",rt:"Thị vệ gật đầu: “Ơn thầy dạy chữ, con chưa trả.”"},
  {n:"Không để hắn dính vào",c:{danh:-2},w:{duc:2},wx:"không ai vì ngươi mà mất việc",lx:"người làng bảo ngươi quên ơn quê, tiếng tăm sứt mẻ; mất một đường tin",rt:"Ngươi chỉ gửi hắn ít tiền về cho mẹ già."},
  {n:"Nhờ hắn đưa {n1} vào thành",c:{suc:-3},o:()=>40+S.tamco/4,w:{tamco:2},sc:1,f:"hide",wx:"chỗ nguy nhất là chỗ an",l:{danh:-3},lx:"đưa người bị truy vào thành là tội, chuyện lộ, tiếng tăm sứt mẻ",rt:"{n1} nấp trong kho cỏ của trại thị vệ, ngay dưới mũi phủ Thuận Thiên.",rf:"Cửa thành đổi phiên, kế hoạch hỏng."}]},
 x1:{h:"Đêm lục soát",w:"maid",t:"Đêm cuối của trát bắt. Đuốc phủ Thuận Thiên đã sáng ở đầu ngõ.",o:[
  {n:"Đưa nhân chứng tửu lâu đến trước phủ doãn",c:{suc:-5},o:A=>35+(A.f.witness?15:0),e:["win","lose"],rt:"Tiểu nhị khai trước công đường: kẻ lạ được trả bạc để tự ngã. Phủ doãn hủy trát.",rf:"Nhân chứng run sợ nói lắp, phủ doãn không tin."},
  {n:"Giấu {n1} cho qua đêm cuối",c:{bac:-30},o:A=>40+(A.f.hide?20:0)+S.mat*3,e:["mid","lose"],rt:"Trời sáng, trát hết hạn. {n1} còn sống, nhưng vẫn mang tiếng trốn án.",rf:"Bộ khoái tìm ra chỗ trốn lúc canh tư."},
  {n:"Quỳ xin Hoàng thượng một lời khoan",c:{sung:-4},o:A=>40+S.sung/4,e:["mid","lose"],rt:"Hoàng thượng phê một chữ “Hoãn”. Án chờ Hình bộ.",rf:"Ngài không muốn can án của phủ Thuận Thiên."}]}},
 E:{win:{k:1,tag:"Vạch trần vụ vu",w:"maid",t:"Án tửu lâu bị lật. Kẻ lạ khai ra gia nhân nhà ngoại {v}. {n1} được trả tự do, và sĩ tử khắp kinh bắt đầu nói về nhà ấy.",fx:{danh:5,duc:2},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Giữ được người, chưa sạch tiếng",t:"{n1} còn sống, còn tự do, nhưng trên giấy tờ hắn vẫn là kẻ có án treo.",fx:{duc:2}},
  lose:{k:-1,tag:"{n1} bị bắt vào ngục",t:"{n1} bị giam ở ngục phủ Thuận Thiên. Hắn còn sống, nhưng mỗi ngày trong ngục là một ngày nhà ngoại {v} có thể ra tay.",fx:{danh:-3,duc:-1},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",8,{t:"Đơn kêu oan",w:"emp",sj:"lá đơn kêu oan của sĩ tử",cast:thdTroCast,
 g:"Sĩ tử khắp kinh soạn một lá đơn kêu oan, ký hơn trăm tên, kể tội mua bán đề thi. Đơn không qua được cửa Lễ bộ; sĩ tử thử đánh trống Đăng Văn cũng bị thị vệ chặn trước Ngọ Môn. Con đường còn lại là qua tay ngươi đến ngự án; nếu ngài phê, án sẽ giao Tam pháp ty — Hình bộ, Ngự sử đài, Đại Lý tự cùng xét.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lá đơn trăm chữ ký",w:"maid",if:RDW(1),t:"Được tự do, {n1} viết lá đơn kêu oan, trăm sĩ tử ký tên dưới. Hắn gửi vào cung, kèm một câu: “Xin nương nương đừng vì con mà liều.”",o:[
  {n:"Đọc kỹ từng chữ",c:{suc:-2},w:{mat:1},f:"read",wx:"biết lá đơn mạnh yếu chỗ nào",lx:"đọc từng chữ đến khuya, hao sức; mất thêm ngày",rt:"Lá đơn chặt chẽ, chỉ có một câu nhắc đến Thị lang hơi quá lời."},
  {n:"Gửi lời cảm ơn trăm sĩ tử",c:{bac:-30},w:{danh:3},wx:"sĩ lâm nhớ ơn",lx:"tốn bạc cảm ơn sĩ tử; nhà {v} biết ngươi đứng sau, thêm oán",go:A=>{rdOan(A,"v",4)},rt:"Sĩ tử truyền nhau: trong cung có người nghe họ."},
  {n:"Bảo {n1} giữ đơn thêm ít ngày",c:{duc:-2},w:{tamco:2},wx:"chờ thời",lx:"giữ đơn của người bị oan, tổn đức; sĩ tử nóng ruột",rt:"{n1} cất lá đơn vào ống tre."}]},
 s2:{h:"Cha lên kinh",w:"dad",if:RDW(0),t:"Nghe tin học trò gặp nạn, {dad} chống gậy lên kinh. Ông ký tên đầu lá đơn: “Thầy của {n1}”.",o:[
  {n:"Xin cho cha vào cung gặp mặt",c:{suc:-3},o:()=>40+S.sung/4,w:{duc:3},sc:1,wx:"cha con gặp nhau",l:{sung:-2},lx:"bị nói là đem chuyện nhà vào cung, Hoàng thượng phật ý",rt:"Cha đứng dưới hiên, chỉ nói: “Con đừng sợ. Cha già rồi.”",rf:"Hoàng thượng không cho."},
  {n:"Khuyên cha gạch tên mình",c:{duc:-2},w:{tamco:1},wx:"cha khỏi bị liên lụy",lx:"bảo cha gạch tên thầy dưới đơn trò, tổn đức; lá đơn yếu đi",rt:"Cha không gạch. Ông nói: “Thầy không bỏ trò.”"},
  {n:"Gửi bạc lo chỗ trọ cho cha",c:{bac:-30},w:{duc:2},wx:"cha yên chỗ ở",lx:"tốn bạc lo chỗ trọ cho cha",rt:"Cha ở trọ cạnh Quốc Tử Giám, sáng nào cũng nghe sĩ tử đọc sách."}]},
 c1:{h:"Câu chữ trong đơn",w:"maid",t:"Lá đơn nêu thẳng tên Thị lang bộ Lễ và nhà ngoại {v}. Một Hàn lâm già khuyên: nêu tên quan đại thần mà không đủ chứng là tội vu cáo.",o:[
  {n:"Giữ nguyên tên",c:{},o:()=>40+S.mat*5,w:{danh:3},sc:1,f:"bold",wx:"lá đơn sắc như dao",l:{danh:-3},lx:"dễ bị bắt lỗi vu cáo, tiếng tăm sứt mẻ",rt:"Ngươi giữ từng chữ.",rf:"Có kẻ đã chép lá đơn đưa sang phủ Thị lang."},
  {n:"Bỏ tên, chỉ kể việc",c:{danh:-2},w:{duc:2},f:"soft",wx:"không ai bắt lỗi được",lx:"bỏ tên để yên thân, sĩ tử chê ngươi nhát, tiếng tăm sứt mẻ",rt:"Lá đơn chỉ còn kể việc, không chỉ mặt ai."},
  {n:"Đính kèm chứng cứ đã có",c:{suc:-2},o:()=>45+S.tamco/4,w:{mat:1},sc:1,f:"paper",wx:"đơn có chứng đi kèm",l:{mat:-1},lx:"chứng cứ lộ ra trước giờ, mất một tai mắt",rt:"Tờ khai, tờ đề, quyển mực — xếp gọn dưới lá đơn.",rf:"Một tờ chứng bị thất lạc trên đường."}]},
 c2:{h:"{v} khóc trước Thái hậu",w:"th",need:["v","th"],t:"{v} khóc ở Đức Thọ cung: có kẻ trong cung xúi sĩ tử làm loạn, bôi nhọ nhà ngoại nàng. Thái hậu cho gọi ngươi đến.",o:[
  {n:"Thưa thật với Thái hậu",c:{suc:-3},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"Thái hậu thấy ngươi ngay thẳng",l:{sung:-2},lx:"Thái hậu ghét chuyện ầm ĩ, kể lại với Hoàng thượng, ngài phật ý",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thái hậu nghe xong, bảo {v}: “Nhà ngươi nên tự xét.”",rf:"Thái hậu phạt cả hai chép kinh."},
  {n:"Nhận lỗi, xin Thái hậu bớt giận",c:{danh:-2},w:{duc:2},wx:"Thái hậu nguôi",lx:"nhận lỗi không có, mất mặt trước cả cung; {v} được thể",go:A=>{rdRel(A,"v",3)},rt:"Thái hậu phẩy tay cho lui, chuyện tạm lắng."},
  {n:"Hỏi {v} vì sao sợ một lá đơn",c:{},o:()=>40+S.tai/4,w:{tamco:2},sc:1,wx:"{v} lỡ lời",l:{danh:-2},lx:"Thái hậu chê ngươi sắc sảo, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",6)},rt:"{v} buột miệng: “Vì trong đơn có tên Thị lang!” — mà đơn chưa ai đọc.",rf:"{v} khóc to hơn."}]},
 t1:{h:"Trống Đăng Văn",w:"maid",t:"Sĩ tử nóng ruột, muốn kéo nhau đánh trống Đăng Văn trước cửa Ngọ Môn. Đánh trống là đơn tới thẳng vua, nhưng kẻ đánh trống phải chịu đòn trước.",o:[
  {n:"Can họ, để ngươi đưa đơn",c:{danh:-2},w:{duc:2},wx:"sĩ tử khỏi chịu đòn",lx:"người ta bảo hậu cung giữ đơn sĩ tử, tiếng tăm sứt mẻ; mọi chuyện đè lên vai ngươi",rt:"Sĩ tử về, chờ tin ngươi."},
  {n:"Để họ đánh trống",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"drum",wx:"cả kinh thành nghe tiếng",l:{duc:-2},lx:"người đánh trống chịu đòn, ngươi day dứt, tổn đức",rt:"Ba hồi trống vang qua Ngọ Môn. Cả triều biết có oan khoa cử.",rf:"Thị vệ bắt người trước khi trống kịp vang."},
  {n:"Xin cha đứng ra đánh trống",c:{suc:-3},o:()=>45+S.duc/4,w:{duc:3},sc:1,f:"drum",wx:"một thầy đồ già, ai nỡ đánh",l:{danh:-2},lx:"cha già chịu nhục trước Ngọ Môn, tiếng tăm sứt mẻ",rt:"Thị vệ thấy ông lão tóc bạc, không ai dám vung roi.",rf:"Cha bị đánh mười roi trước khi đơn được nhận."}]},
 x1:{h:"Đến ngự án",w:"emp",t:"Đêm ấy Hoàng thượng đến cung ngươi. Lá đơn nằm trong ống tay áo. Đưa hay không, đưa thế nào, chỉ trong một đêm.",o:[
  {n:"Dâng cả đơn và chứng",c:{suc:-5},o:A=>35+(A.f.paper?15:0),e:["win","lose"],rt:"Hoàng thượng đọc đến canh ba, rồi phê: “Giao Tam pháp ty tra xét.”",rf:"Hoàng thượng gấp đơn lại: “Hậu cung lại dính vào khoa cử?”"},
  {n:"Chỉ thưa có lá đơn, xin ngài tự đọc",c:{},o:A=>45+(A.f.drum?15:0)+S.sung/6,e:["win","mid"],lx:"không nói thì không ai biết ngươi tin gì",rt:"Ngài đọc đơn ở Dưỡng Tâm điện, sáng hôm sau giao Tam pháp ty.",rf:"Đơn được nhận, nhưng nằm trong chồng tấu."},
  {n:"Không đưa, để sĩ tử tự lo",c:{},w:{sung:2},e:"mid",lx:"sĩ tử thấy ngươi bỏ họ",rt:"Ngươi giữ ống tay áo im lặng cả đêm."}]}},
 E:{win:{k:1,tag:"Lá đơn đến ngự án",w:"emp",t:"Hoàng thượng giao Tam pháp ty tra án khoa cử. Sĩ tử khắp kinh quỳ trước Quốc Tử Giám tạ ơn, và ai cũng biết lá đơn đi qua tay ai.",fx:{danh:7,duc:2},go:A=>{rdOan(A,"v",8);return""}},
  mid:{k:0,tag:"Đơn được nhận, chưa phê",t:"Lá đơn nằm trên ngự án, chưa có lời phê. Mỗi ngày chờ, nhà ngoại {v} lại có thêm thời gian xóa dấu.",fx:{danh:2}},
  lose:{k:-1,tag:"Lá đơn bị trả về",t:"Hoàng thượng trả đơn, trách ngươi để sĩ tử dựa vào hậu cung. Nhà ngoại {v} mở tiệc.",fx:{sung:-6,danh:-2},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",9,{t:"Triều đình chấn động",w:"emp",sj:"khoa án rung chuyển Lễ bộ",cast:thdTroCast,
 g:"Án khoa cử lan ra ngoài triều. Lễ bộ run sợ, Thị lang tìm người gánh tội thay, nhà ngoại {v} chạy khắp các cửa quan. Có chỉ của Hoàng thượng thì án về Tam pháp ty — Hình bộ, Ngự sử đài, Đại Lý tự cùng xét. Chuyện không còn là của một học trò nữa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư lại treo cổ",w:"maid",if:RDW(1),t:"Chỉ vừa ban, Tam pháp ty vừa mở án thì tin đến: một thư lại phòng khắc in treo cổ trong nhà, để lại thư nhận hết tội. Ai cũng hiểu đó là con dê thế tội.",o:[
  {n:"Cho người khám lá thư tuyệt mệnh",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:2},sc:1,f:"paper",wx:"thấy chữ trong thư không phải của hắn",l:{danh:-2},lx:"bị nói là tò mò việc ma chay, tiếng tăm sứt mẻ",rt:"Chữ trong thư tuyệt mệnh giống chữ một môn khách của Thị lang.",rf:"Thư đã nộp lên Tam pháp ty, không ai được xem."},
  {n:"Lo hậu sự cho nhà hắn",c:{bac:-40},w:{duc:3},wx:"vợ con hắn mang ơn",lx:"tốn bạc lo hậu sự",rt:"Vợ hắn khóc: chồng bà không biết chữ đủ để viết lá thư ấy."},
  {n:"Im lặng, để Tam pháp ty tự xét",c:{duc:-2},w:{tamco:1},wx:"không dính thêm",lx:"để người chết gánh tội thay, tổn đức; con dê thế tội được dùng",rt:"Ngươi thắp một nén hương cho người chết."}]},
 s2:{h:"Ngự sử tự tìm đến",w:"emp",if:RDW(0),t:"Lá đơn chưa được phê, nhưng tin đã lan. Một Ngự sử trẻ tự dâng sớ đàn hặc Lễ bộ, xin tra khoa cử. Hắn nhắn vào cung, xin một chứng cứ.",o:[
  {n:"Trao chứng cho Ngự sử",c:{suc:-3},o:()=>40+S.mat*5,w:{danh:3},sc:1,f:"paper",wx:"sớ có chứng",l:{danh:-2},lx:"lộ ngươi là nguồn chứng, tiếng tăm sứt mẻ",rt:"Sớ của Ngự sử khiến Hoàng thượng phải mở án.",rf:"Chứng đến muộn, sớ đã bị gác."},
  {n:"Để Ngự sử tự lo",c:{danh:-2},w:{duc:2},wx:"tay ngươi sạch",lx:"sớ yếu, sĩ lâm bảo ngươi đứng ngoài, tiếng tăm sứt mẻ",rt:"Ngự sử dâng sớ với những gì hắn có."},
  {n:"Khuyên Ngự sử đợi thời",c:{duc:-2},w:{tamco:2},wx:"không bắn trượt",lx:"ghìm người ngay lại, tổn đức; thời không chờ ai",rt:"Ngự sử cất sớ, không vui."}]},
 c1:{h:"Danh sách của Thị lang",w:"maid",t:"Thị lang bộ Lễ cho người lén đưa vào cung một danh sách: hai mươi Tiến sĩ ba khoa gần đây cũng mua đề, có cả con Thượng thư, cháu Đô đốc. “Lật hắn thì lật cả triều. Nương nương tính kỹ.”",o:[
  {n:"Giữ danh sách, không đáp",c:{duc:-2},w:{tamco:3},wx:"nắm thóp nửa triều",lx:"giữ danh sách để nắm thóp người, tổn đức; cầm danh sách là cầm lửa",rt:"Ngươi khóa danh sách trong hộp ngọc."},
  {n:"Trả lại, nhắn: chỉ cần công bằng cho một người",c:{danh:-2},w:{duc:2},f:"narrow",wx:"Thị lang thấy ngươi không tham",lx:"bỏ lỡ một lá bài, người ta bảo ngươi mềm tay, tiếng tăm sứt mẻ",rt:"Thị lang nhận lại, im lặng ba ngày."},
  {n:"Đưa danh sách lên Hoàng thượng",c:{suc:-4},o:()=>35+S.sung/4,w:{sung:3},sc:1,f:"wide",wx:"ngài thấy ngươi không giấu",l:{danh:-4},lx:"nửa triều thành kẻ thù, tiếng tăm sứt mẻ nặng",rt:"Hoàng thượng đọc rồi khóa danh sách vào tủ ngự.",rf:"Hoàng thượng hỏi: “Ai đưa nàng danh sách này?”"}]},
 c2:{h:"{v} quỳ trước Hoàng thượng",w:"v",need:["v"],t:"{v} tháo trâm, quỳ trước Dưỡng Tâm điện xin tha cho nhà ngoại. Hoàng thượng chưa nói gì; cả hậu cung nhìn xem ngươi làm gì.",o:[
  {n:"Quỳ cạnh nàng, xin tha cho người già trẻ nhỏ",c:{suc:-3},w:{duc:4},wx:"cả cung thấy ngươi rộng lượng",lx:"quỳ cả buổi trên thềm đá, hao sức; thành ra như xin tha cho kẻ có tội",go:A=>{rdRel(A,"v",10)},rt:"{v} nhìn ngươi, không hiểu."},
  {n:"Đứng ngoài, không xen",c:{duc:-2},w:{tamco:1},wx:"không mắc nợ ai",lx:"người ta nói ngươi lạnh, tổn đức",rt:"Ngươi đóng cửa cung chép kinh."},
  {n:"Tâu: có tội thì xét, không tội thì tha",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"Hoàng thượng thấy ngươi công tâm",l:{sung:-2},lx:"{v} cho là ngươi đẩy nàng xuống, Hoàng thượng chán cả hai, phật ý",go:A=>{rdOan(A,"v",6)},rt:"Hoàng thượng gật đầu, cho {v} về cung.",rf:"Hoàng thượng chán cả hai."}]},
 t1:{h:"Lời của Thái hậu",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi đến Đức Thọ cung: “Triều đình đang rung. Hậu cung mà rung theo thì xã tắc nghiêng. Ngươi biết dừng ở đâu chưa?”",o:[
  {n:"Thưa: thiếp chỉ xin công bằng cho sĩ tử",c:{},o:()=>40+S.duc/4,w:{duc:3},sc:1,wx:"Thái hậu nể",l:{danh:-2},lx:"Thái hậu cho là ngươi cứng, phạt chép Nữ huấn, tiếng tăm sứt mẻ",rt:"Thái hậu im lặng hồi lâu, rồi cho lui.",rf:"Thái hậu phạt ngươi chép Nữ huấn."},
  {n:"Xin Thái hậu chỉ dạy",c:{sung:-2},w:{danh:1},f:"narrow",wx:"Thái hậu hài lòng",lx:"bị dắt theo ý bà, Hoàng thượng thấy ngươi theo Thái hậu, ân sủng nhạt đi",rt:"Thái hậu dặn: “Xử kẻ đầu sỏ thôi. Đừng đụng đến những nhà khác.”"},
  {n:"Lặng im nghe",c:{duc:-2},w:{tamco:2},wx:"không để lộ ý",lx:"im lặng trước người hỏi thật lòng, tổn đức; Thái hậu không biết ngươi nghĩ gì",rt:"Ngươi cúi đầu đến khi Thái hậu cho lui."}]},
 x1:{h:"Hoàng thượng hỏi đến đâu",w:"emp",t:"Đêm khuya ở Ngự thư phòng, Hoàng thượng đặt trước mặt ngươi bản tấu án khoa cử — Tam pháp ty đã theo chỉ ngài mà xét: “Xử đến đâu là việc của trẫm. Nàng nghĩ sao, nói thử.”",o:[
  {n:"Xử kẻ đầu sỏ, tha kẻ bị lôi theo",c:{suc:-4},o:A=>40+(A.f.narrow?15:0),e:["win","mid"],rt:"Thị lang bộ Lễ bị cách chức tra xét. Hai mươi nhà kia thở phào và nhớ ơn ngươi.",rf:"Thị lang thoát, chỉ vài thư lại bị xử."},
  {n:"Xử tất cả, khoa trường mới sạch",c:{suc:-4},o:A=>35+(A.f.wide?15:0)+S.danh/6,e:["win","lose"],rt:"Thị lang bị cách, ba khoa thi được xét lại. Cả triều run.",rf:"Nửa triều dâng sớ nói hậu cung khuấy triều chính."},
  {n:"Thưa: việc triều, thiếp không dám bàn",c:{},w:{duc:3},e:"mid",lx:"để người khác quyết thay",rt:"Hoàng thượng thở dài, tự phê."}]}},
 E:{win:{k:1,tag:"Thị lang bộ Lễ bị cách chức",w:"emp",t:"Thị lang bị cách chức chờ xét, nhà ngoại {v} bị niêm phong sổ sách. Sĩ lâm khắp nơi biết tên ngươi.",fx:{danh:7,sung:2},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Chỉ kẻ nhỏ bị xử",t:"Vài thư lại bị xử, Thị lang được giữ ghế. Án chưa khép, ai cũng chờ nước sau.",fx:{danh:1}},
  lose:{k:-1,tag:"Ngươi bị nghi khuấy triều",t:"Triều thần dâng sớ nói hậu cung khuấy triều chính. Hoàng thượng thôi bàn chuyện khoa cử với ngươi.",fx:{sung:-6,danh:-3},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",10,{t:"Thi lại",w:"emp",sj:"kỳ thi lại trong điện",cast:thdTroCast,
 g:"Hoàng thượng cho thi lại ngay trong điện: mọi Tiến sĩ bị nghi, cả {n2}, phải làm bài trước mặt ngài; {n1} cũng được gọi để tỏ thực tài. Một ngày thi, hai số phận.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếu thi lại",w:"emp",if:RDW(1),t:"Chiếu ban: mười ngày nữa thi lại ở điện Bảo Hòa. Hoàng thượng nói với ngươi: “Trẫm muốn tự mắt xem ai có chữ.”",o:[
  {n:"Gửi sách cho {n1} ôn",c:{bac:-20},w:{duc:2},wx:"hắn yên tâm học",lx:"tốn bạc mua sách; bị nói là ngươi lo cho hắn",rt:"{n1} đọc sách thâu đêm ở căn gác cũ."},
  {n:"Dặn {n1} giữ mình, ăn ngủ cẩn thận",c:{suc:-2},w:{mat:1},f:"guard",wx:"hắn đề phòng",lx:"viết thư dặn dò cả đêm, hao sức; hắn lo sợ thêm",rt:"{n1} thôi ăn ở quán, tự nấu cơm."},
  {n:"Nhờ cha ở lại kèm hắn",c:{suc:-2},o:()=>45+S.danh/5,w:{danh:2},sc:1,wx:"thầy trò cùng ôn",l:{duc:-1},lx:"cha già thức khuya rồi ngã bệnh, ngươi day dứt, tổn đức",rt:"Cha ra đề cho {n1} mỗi tối như thuở ở trường làng.",rf:"Cha ngã bệnh vì gió kinh thành."}]},
 s2:{h:"Thi lại vì sĩ tử làm ầm",w:"emp",if:RDW(0),t:"Án chưa khép, sĩ tử vẫn tụ trước Quốc Tử Giám. Để yên lòng thiên hạ, Hoàng thượng cho thi lại ở điện Bảo Hòa — nhưng ngài không hỏi ý ngươi lần nào.",o:[
  {n:"Xin cho thái giám báo tin ngày thi",c:{suc:-3},o:()=>35+S.sung/3,w:{sung:2},sc:1,wx:"biết tin trong điện từng khắc",l:{sung:-3},lx:"ngài thấy ngươi để tâm quá, Hoàng thượng phật ý",rt:"Hoàng thượng gật đầu: “Trẫm cho một thái giám chạy tin cho nàng.”",rf:"Ngài bảo: “Thi là việc ngoài triều. Nàng ở cung.”"},
  {n:"Lo cho {n1} giữ sức",c:{bac:-20},w:{duc:2},f:"guard",wx:"hắn khỏe mạnh vào thi",lx:"tốn bạc lo cơm thuốc cho {n1}",rt:"{n1} được ăn no ngủ đủ mười ngày."},
  {n:"Đứng ngoài hẳn",c:{duc:-2},w:{tamco:2},wx:"không ai nói được ngươi",lx:"bỏ mặc học trò của cha lúc nguy, tổn đức; không ai giúp {n1}",rt:"Ngươi không hỏi một lời về kỳ thi."}]},
 c1:{h:"Tờ phao trong tay áo",w:"maid",t:"Người của ngươi nghe được: nhà ngoại {v} đã mua một tên tạp dịch điện Bảo Hòa. Ngày thi, hắn sẽ nhét tờ phao vào tay áo {n1} rồi hô bắt. Phải chặn trước ngày thi.",o:[
  {n:"Đổi tên tạp dịch ấy đi",c:{bac:-30},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"mối nguy được dời",l:{danh:-2},lx:"nhà {v} biết ngươi đã biết, đồn ngươi lộng quyền điều người, tiếng tăm sứt mẻ",rt:"Tên tạp dịch bị điều đi quét Ngự hoa viên.",rf:"Hắn được thay bằng một kẻ khác ngươi không biết."},
  {n:"Dặn {n1} mặc áo không tay rộng",c:{duc:-2},w:{tamco:2},f:"guard",wx:"chẳng có chỗ nhét phao",lx:"để hắn chịu lạnh cả buổi thi, tổn đức",rt:"{n1} vào thi trong áo vải bó tay, run cả buổi sáng."},
  {n:"Để chúng làm, bắt quả tang",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"trap",wx:"bắt được người nhà {v}",l:{danh:-3},lx:"liều cả danh {n1}, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Thị vệ của ngươi giữ tay tên tạp dịch khi tờ phao còn trong tay hắn.",rf:"Tạp dịch nhanh tay hơn."}]},
 c2:{h:"{v} xin ngươi tha cho {n2}",w:"v",need:["v"],t:"{v} đến không mang lễ, chỉ mang nước mắt: “Biểu huynh ta là trụ cột nhà mẹ ta. Trượt kỳ này thì cả nhà chết. Ngươi muốn gì, ta đổi.”",o:[
  {n:"Xin nàng đổi lấy lời khai về Thị lang",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:2},sc:1,wx:"có chứng mới",l:{duc:-2},lx:"ép người lúc cùng đường, tổn đức",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} kể: Thị lang lấy ba phần mười bạc bán đề.",rf:"{v} bỏ đi: “Ngươi tàn nhẫn hơn ta tưởng.”"},
  {n:"Hứa không làm gì thêm với nhà nàng",c:{danh:-2},w:{duc:3},wx:"{v} dịu lại",lx:"hứa buông kẻ mua đề, sĩ lâm chê, tiếng tăm sứt mẻ; {n2} có thể lại thoát",go:A=>{rdRel(A,"v",12)},rt:"{v} cúi đầu cảm ơn, lần đầu tiên."},
  {n:"Từ chối: thi là thi",c:{sung:-1},w:{danh:2},wx:"giữ thẳng",lx:"từ chối giữa lúc nàng khóc, Hoàng thượng nghe, ân sủng nhạt đi; {v} cùng đường thì liều",go:A=>{rdOan(A,"v",8)},rt:"{v} lau nước mắt, ánh mắt lạnh đi."}]},
 t1:{h:"Đề thi do ai ra",w:"emp",t:"Hoàng thượng hỏi đùa: “Nàng là con thầy đồ. Nếu nàng ra đề, nàng ra đề gì?”",o:[
  {n:"Đề về dân sinh, không ai học vẹt được",c:{},o:()=>40+S.tai/4,w:{sung:3},sc:1,f:"theme",wx:"ngài thích ý ấy",l:{sung:-2},lx:"ngài thấy ngươi bàn quá việc, Hoàng thượng phật ý",rt:"Hoàng thượng chép câu ngươi nói vào tay áo.",rf:"Ngài cười: “Đề thì để trẫm.”"},
  {n:"Thưa: đề là việc của vua",c:{danh:-2},w:{duc:2},wx:"giữ phận",lx:"mất dịp chọn đề công bằng, sĩ lâm bảo ngươi lùi, tiếng tăm sứt mẻ",rt:"Hoàng thượng gật đầu."},
  {n:"Xin ngài ra đề ngay trước giờ thi",c:{duc:-2},w:{tamco:2},f:"theme",wx:"không ai kịp mua đề",lx:"nghi cả Lễ bộ, tổn đức; Lễ bộ thấy ngươi nghi họ",rt:"Ngài cười: “Ý hay. Trẫm cũng chẳng tin ai.”"}]},
 x1:{h:"Điện Bảo Hòa",w:"emp",t:"Ngày thi lại. Ba mươi thí sinh quỳ trong điện Bảo Hòa, Hoàng thượng ngồi trên. Phi tần không được bước vào; ngươi ngồi ở cung, chỉ có thái giám chạy tin qua lại. Mọi điều chuẩn bị đều dồn vào một buổi.",o:[
  {n:"Gửi ra một mảnh giấy xin ngài ra đề tại chỗ",c:{suc:-4},o:A=>35+(A.f.theme?15:0),e:["win","lose"],rt:"Đề ra tại chỗ. {n1} viết kín giấy; {n2} nộp giấy trắng.",rf:"Thái giám thấy mảnh giấy, tâu ngươi xen vào kỳ thi."},
  {n:"Ngồi yên, tin vào {n1}",c:{},o:A=>45+(A.f.guard?15:0)+(A.f.trap?5:0),e:["win","mid"],lx:"không làm gì nếu có biến",rt:"{n1} làm bài trôi chảy, {n2} viết lủng củng.",rf:"Cả hai đều đỗ, bảng chưa rõ ai hơn ai."},
  {n:"Ở cung chờ tin, không gửi gì",c:{},w:{duc:2},e:"mid",lx:"không ai che chở nếu có biến",rt:"Ngươi ở cung, chờ tin."}]}},
 E:{win:{k:1,tag:"{n1} đứng đầu kỳ thi lại",w:"emp",t:"{n1} đứng đầu kỳ thi lại, {n2} bị tước danh Tiến sĩ. Tin về đến cung ngươi trước cả bảng.",fx:{danh:7,sung:3},go:A=>{rdOan(A,"v",10);return""}},
  mid:{k:0,tag:"Cả hai cùng đỗ",t:"{n1} và {n2} đều đỗ. Bảng mới vẫn có tên kẻ mua đề, nhưng giờ cũng có tên người bị oan.",fx:{danh:2}},
  lose:{k:-1,tag:"Kỳ thi lại hỏng",t:"Mảnh giấy của ngươi bị bắt. Kỳ thi bị nói là có hậu cung nhúng tay, kết quả treo lại.",fx:{sung:-5,danh:-4},go:A=>{rdOan(A,"v",4);return""}}}});

rdDef("thd_tro",11,{t:"Công bằng khoa cử",w:"emp",sj:"công bằng cho khoa trường",cast:thdTroCast,
 g:"Án khoa cử đi đến hồi kết. Hoàng thượng sẽ định tội, định công, và định cả phép thi về sau. Đây là kết cục truyện xuất thân của ngươi: con gái một thầy đồ nghèo, đứng giữa chữ nghĩa và quyền thế.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sĩ lâm chờ một lời",w:"emp",if:RDW(1),t:"Sĩ tử khắp nơi gửi thơ vào kinh ca tụng kỳ thi lại. Hoàng thượng đọc một bài, cười: “Họ ca nàng nhiều hơn ca trẫm.”",o:[
  {n:"Thưa: công là của bệ hạ",c:{danh:-2},w:{sung:3},wx:"ngài vui",lx:"công của mình nhường hết, danh lùi một bước",rt:"Hoàng thượng gõ nhẹ quạt lên tay ngươi."},
  {n:"Xin ngài cấm sĩ tử nhắc tên thiếp",c:{danh:-2},w:{duc:3},wx:"tránh tiếng chuyên quyền",lx:"sĩ lâm bớt nhớ ngươi, danh lùi một bước",rt:"Chiếu ban: thơ ca kỳ thi chỉ ca ơn vua."},
  {n:"Im lặng, mỉm cười",c:{},o:()=>40+S.sung/4,w:{danh:2},sc:1,wx:"ngài thấy ngươi đáng yêu",l:{sung:-2},lx:"ngài thấy ngươi tự đắc, Hoàng thượng phật ý",rt:"Hoàng thượng cười theo.",rf:"Ngài đặt bài thơ xuống, không cười nữa."}]},
 s2:{h:"Án treo lơ lửng",w:"emp",if:RDW(0),t:"Án khoa cử treo đã nửa năm. {dad} viết từ quê: “Cha già rồi, chỉ mong trước khi nhắm mắt thấy học trò được trả tên.”",o:[
  {n:"Xin Hoàng thượng định án trước Tết",c:{suc:-3},o:()=>40+S.sung/4,w:{danh:2},sc:1,wx:"án có hạn chót",l:{sung:-3},lx:"ngài thấy ngươi giục, Hoàng thượng phật ý",rt:"Hoàng thượng gật đầu: “Trước Tết.”",rf:"Ngài không đáp."},
  {n:"Gửi thư an ủi cha",c:{danh:-2},w:{duc:2},wx:"cha yên lòng",lx:"ngồi viết thư mà án vẫn treo, sĩ lâm bảo ngươi buông, tiếng tăm sứt mẻ",rt:"Cha hồi: “Có con là đủ.”"},
  {n:"Gom lại mọi chứng cứ còn lại",c:{bac:-30},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"paper",wx:"chứng đủ để định án",l:{danh:-2},lx:"nhà {v} biết ngươi chưa dừng, đồn ngươi làm án thay quan, tiếng tăm sứt mẻ",rt:"Ngươi xếp lại tờ khai, quyển mực, tờ phao — đủ cả.",rf:"Vài tờ chứng đã bị đánh tráo."}]},
 c1:{h:"Số phận {n2}",w:"v",t:"Tam pháp ty — Hình bộ, Ngự sử đài, Đại Lý tự — nghị theo luật: mua đề thì chém. Hoàng thượng chưa phê; {n2} sẽ bị xử theo luật, trừ khi ngài gia ân.",o:[
  {n:"Xin tha chết, đày đi biên ải",c:{suc:-2},w:{duc:4},f:"mercy",wx:"giữ đức cho mình",lx:"quỳ xin mà hao sức; kẻ có tội còn sống",go:A=>{rdRel(A,"v",10)},rt:"Hoàng thượng giảm tội: {n2} được tha chết, bị đày đi Quỳnh Châu. {v} khóc, không biết nên hận hay nên cảm ơn."},
  {n:"Để luật xử",c:{sung:-1},w:{danh:3},f:"law",wx:"phép nước nghiêm",lx:"để luật xử mà không xin một lời, Hoàng thượng thấy ngươi lạnh, ân sủng nhạt đi; nhà {v} hận đến chết",go:A=>{rdOan(A,"v",12)},rt:"Ngươi không nói một lời nào cho {n2}."},
  {n:"Đổi mạng {n2} lấy lời khai về Thị lang",c:{suc:-3},o:()=>40+S.tamco/3,w:{mat:2},sc:1,f:"law",wx:"kẻ đứng đầu không thoát",l:{duc:-2},lx:"mặc cả mạng người, tổn đức",go:(A,ok)=>{rdRel(A,"v",ok?4:-6)},rt:"{n2} khai hết trước Tam pháp ty, được Hoàng thượng giảm tội, tha chết.",rf:"{n2} không dám khai, vẫn bị xử."}]},
 c2:{h:"{v} lần cuối",w:"v",need:["v"],t:"{v} đến cung ngươi, không trang điểm. “Nhà mẹ ta sắp mất tất cả. Ngươi thắng rồi. Ngươi còn muốn gì?”",o:[
  {n:"Muốn nàng thôi hận",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"có thể bớt một kẻ thù",l:{danh:-1},lx:"nàng không tin, đem kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?15:-4)},rt:"{v} ngồi rất lâu, rồi nói: “Ta sẽ thử.”",rf:"{v} cười khan: “Ngươi tưởng dễ thế sao?”"},
  {n:"Không muốn gì",c:{duc:-1},w:{tamco:2},wx:"giữ thế trên",lx:"đẩy người cùng đường ra cửa, tổn đức; nàng về với lòng hận",go:A=>{rdOan(A,"v",6)},rt:"Ngươi rót trà, không nói gì thêm."},
  {n:"Hứa giữ cho người già trẻ nhỏ nhà nàng",c:{bac:-40},w:{duc:4},wx:"người vô tội được yên",lx:"tốn bạc lo cho nhà kẻ thù",go:A=>{rdRel(A,"v",10)},rt:"{v} quỳ xuống trước ngươi, lần đầu và lần cuối."}]},
 t1:{h:"Lời của cha",w:"dad",t:"{dad} gửi lên kinh một cuộn giấy: một đời dạy học, ông chỉ mong học trò thi đỗ bằng chữ của chính mình. “Con giúp được nhiều người hơn cha, thì giúp.”",o:[
  {n:"Xin Hoàng thượng đổi phép thi",c:{suc:-2},w:{danh:2},f:"reform",wx:"cả thiên hạ được lợi",lx:"viết tấu đến khuya, hao sức; Lễ bộ coi ngươi là cái gai",rt:"Ngươi chép lời cha vào một tờ tấu nhỏ."},
  {n:"Chỉ lo cho học trò của cha",c:{danh:-2},w:{duc:2},f:"narrow",wx:"việc vừa sức",lx:"phép thi cũ vẫn còn kẽ hở, sĩ lâm bảo ngươi chỉ lo người nhà, tiếng tăm sứt mẻ",rt:"Ngươi gấp cuộn giấy, cất đi."},
  {n:"Mời cha vào cung bái kiến Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/4,w:{danh:3},sc:1,f:"reform",wx:"vua nghe tận tai lời thầy đồ",l:{sung:-2},lx:"bị nói là đưa người nhà tiến thân, Hoàng thượng phật ý",rt:"Hoàng thượng nghe cha nói một khắc, rồi ban trà.",rf:"Hoàng thượng bận việc, không tiếp."}]},
 x1:{h:"Định án khoa cử",w:"emp",t:"Sau buổi chầu, ở Ngự thư phòng, Hoàng thượng đặt bút: định tội Thị lang, định danh {n1}, định phép thi về sau. Ngài nhìn ngươi: “Nàng còn điều gì muốn tâu?”",o:[
  {n:"Tâu: xin rọc phách, chép lại bài để quan chấm không thấy tên",c:{suc:-5},o:A=>35+(A.f.reform?15:0)+S.danh/8,e:["win","lose"],rt:"Chiếu ban phép thi mới. Kẻ mua đề bị xử, {n1} được trả bảng vàng.",rf:"Lễ bộ cùng dâng sớ phản đối, Hoàng thượng gác cả án lẫn phép mới."},
  {n:"Tâu: chỉ xin trả tên cho người bị oan",c:{},o:A=>50+(A.f.paper?10:0)+(A.f.narrow?10:0),e:["mid","lose"],lx:"phép thi cũ còn nguyên",rt:"{n1} được trả tên, án khép lặng lẽ.",rf:"Án bị gác lại, không ai được trả tên."},
  {n:"Tâu: thiếp không dám bàn, xin ngài tự định",c:{},w:{duc:3},e:"mid",lx:"để người khác quyết",rt:"Hoàng thượng tự phê: {n1} được trả tên, Thị lang về hưu."}]}},
 E:{win:{k:1,tag:"Khoa trường trong sạch",w:"emp",t:"Thị lang bộ Lễ bị xử, nhà ngoại {v} mất hết bảng vàng mua được. {n1} được trả danh, phép thi mới được ban khắp thiên hạ. Ở quê, {dad} đọc chiếu rồi khóc.",fx:{danh:12,sung:4,duc:3},go:A=>{rdOan(A,"v",6);return""}},
  mid:{k:0,tag:"Học trò được trả tên",t:"{n1} được trả tên, làm quan. Kẻ mua đề phần lớn lặng lẽ về hưu. Chuyện khép lại mà không ai hô to.",fx:{danh:4,duc:3}},
  lose:{k:-1,tag:"Khoa án bị chôn vùi",t:"Án khoa cử bị gác mãi. {n1} về quê dạy học cạnh {dad}. Ngươi vẫn giữ ngôi vị trong cung, nhưng sĩ lâm thôi nhắc tên ngươi.",fx:{danh:-6,sung:-2},go:A=>{rdOan(A,"v",4);return""}}}});
RD97L.push({a:"thd_tro_11",tag:"Học trò thành Ngự sử, một lòng với ngươi",w:"emp",p:.12,n:"Xin Hoàng thượng cho {n1} vào Ngự sử đài",c:{suc:-4},
 path:["Mua một bản làm chứng","Mua bản sao sổ khắc đề","Lấy danh sách khoa trước","Đưa nhân chứng tửu lâu","Dâng cả đơn và chứng","Xử kẻ đầu sỏ","Gửi ra một mảnh giấy","rọc phách"],np:3,bad:["Nhận lời, đổi lấy mạng","Mua chuộc hắn khai","Lo lót cho bộ khoái","Không đưa, để sĩ tử tự lo"],sc:2,x:[()=>S.danh>=45,"Danh từ 45"],
 t:"Hoàng thượng chuẩn cho {n1} làm Giám sát Ngự sử. Ngày nhận ấn, hắn quỳ ngoài cửa cung ngươi lạy ba lạy: “Đời con, ngòi bút này không cong.” Từ đó trên triều có một Ngự sử chỉ biết phép nước và ơn thầy.",
 fx:{danh:12,sung:4},go:A=>{rdOan(A,"v",4);return""},rw:"nt_haiduong",ti:"Ân nhân của khoa trường"});

/* ---------- thd_hoc · Thầy giáo trong cung ---------- */
/* BAL.road keys needed: none (no chapter-level constant; the child condition is a presence check, not a number).
   Condition copied from ARC67.thd_hoc .4: {v} = a live consort WITH a live child (castRv67 filter v.kids alive); the road keeps the same {v};
   a chapter whose {v} has no live child any more cannot run (cast → false) and the engine gives a shared arc instead; ok = some royal child alive.
   Children are REAL children of this life (allKids): {n1} = {v}'s child (the pupil of the road; the engine carries the name in S.st.f14.n1);
   {n2} = another live royal child (the clever pupil, prefers a rival's child, else hers; engine-carried S.st.f14.n2). No story-only NPC. */
function thdHocKids(){try{return allKids().filter(([k])=>k&&k.alive)}catch(e){return[]}}
function thdHocCast(A){const vf=v=>(v.kids||[]).some(k=>k.alive);
 /* the carried mother lost her last child: she leaves the road, another mother of a live child is cast (the engine tells the recast) */
 let gone=null;try{const K=S.st.f14&&S.st.f14.act,v0=K&&K.v!=null?RV(K.v):null;if(v0&&!vf(v0)){gone=v0;delete K.v}}catch(e){}
 if(!rdCast(A,["v"],{v:vf}))return false;const v=rv67(A,"v");if(!v||!vf(v))return false;
 /* told to the player like the engine recast (review road-b3-r1: deleting K.v made rdCast silent) */
 if(gone&&gone.id!==v.id)try{const L=`${gone.name} ${gone.alive?"không còn con theo học":"nay đã khuất"}, người mẹ có con trong lớp nay là ${v.name}.`;(A.rc=A.rc||[]).push(L);log(`<i>${L}</i>`)}catch(e){}
 try{const f=(S.st&&S.st.f14)||{};const L=thdHocKids();const vk=(v.kids||[]).filter(k=>k.alive);
  let a=f.n1&&vk.some(k=>k.name===f.n1)?f.n1:vk[0].name;
  let b=f.n2&&f.n2!==a&&L.some(([k])=>k.name===f.n2)?f.n2:null;
  if(!b){const o=L.filter(([k])=>k.name!==a);const o2=o.filter(([,m])=>m);const p=o2[0]||o[0];b=p?p[0].name:null}
  A.n1=a;A.n2=b||"một công chúa nhỏ"}catch(e){A.n1=A.n1||"hoàng tự nhỏ";A.n2=A.n2||"một công chúa nhỏ"}
 return true}
const thdHocOk=()=>thdHocKids().length>0;

rdDef("thd_hoc",5,{t:"Học trò nhỏ",w:"emp",sj:"hai học trò nhỏ ở Thượng thư phòng",ok:thdHocOk,cast:thdHocCast,
 g:"Theo chỉ của Hoàng thượng, ngươi làm giáo tập buổi sáng nhỏ ở Thượng thư phòng: dạy vỡ lòng các hoàng tử chưa vào học chính; kinh sử vẫn do các sư phó Hàn lâm giảng. Có hai đứa trẻ khiến ngươi mất ngủ: {n1}, con của {v}, sáng dạ mà lười; và {n2}, chăm đến mức các anh em ganh. Dạy được một đứa đã khó; dạy cả hai mà không ai oán còn khó hơn.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Học trò trốn học",w:"emp",if:RDW(1),t:"Sau kỳ khảo hạch, Hoàng thượng giao hẳn buổi học vỡ lòng sáng sớm ở Thượng thư phòng cho ngươi. Ngay hôm đầu, {n1} trốn học ra Ngự hoa viên bắt dế.",o:[
  {n:"Ra vườn bắt dế cùng nó",c:{suc:-2},w:{duc:2},f:"gentle",wx:"nó chịu theo ngươi về lớp",lx:"chạy theo trò khắp vườn, hao sức; các thầy khác chê ngươi chiều trò",rt:"Bắt được con dế, {n1} ngoan ngoãn theo ngươi về, tay còn nắm ống tre."},
  {n:"Phạt nó chép bài",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,f:"strict",wx:"cả lớp biết phép",l:{duc:-1},lx:"{v} nghe con bị phạt, kể khắp cung thầy khắt khe, tổn đức",go:(A,ok)=>{if(!ok)rdOan(A,"v",3)},rt:"{n1} chép xong mười trang, mắt đỏ mà không khóc.",rf:"{n1} xé giấy, chạy về mách mẹ."},
  {n:"Cho người báo {v} đến đón con",c:{duc:-2},w:{tamco:1},wx:"không gánh trách một mình",lx:"đứa trẻ giận ngươi mách mẹ, thấy thầy không giữ lời, tổn đức",go:A=>{rdRel(A,"v",2)},rt:"{v} đến, kéo con đi, ngoái lại nhìn ngươi một cái."}]},
 s2:{h:"Đứa trẻ tìm đến cung ngươi",w:"v",if:()=>rdK()===0,t:"Không ai khen to công dạy của ngươi, nhưng {n1} cứ trốn sang cung ngươi đòi nghe kể chuyện. {v} biết, không vui.",o:[
  {n:"Kể chuyện, rồi dắt nó về tận cung mẹ",c:{suc:-2},w:{duc:3},f:"gentle",wx:"đứa trẻ quý ngươi",lx:"kể chuyện rồi dắt bộ đến tận cung mẹ, hao sức; {v} thấy con quấn người khác",go:A=>{rdRel(A,"v",3)},rt:"Đến cửa cung {v}, {n1} còn níu tay áo ngươi."},
  {n:"Không cho nó vào nữa",c:{duc:-2},w:{tamco:1},wx:"tránh điều tiếng",lx:"đóng cửa với một đứa trẻ, tổn đức; đứa trẻ tủi thân",rt:"{n1} đứng ngoài cửa một lúc rồi đi."},
  {n:"Sang thưa với {v}",c:{},o:()=>40+S.duc/4,w:{duc:2},sc:1,wx:"{v} hiểu ý tốt",l:{danh:-1},lx:"{v} cho là ngươi lên mặt, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} gật đầu: “Nó thích ngươi thì cứ để nó học.”",rf:"{v} chỉ nói: “Con ta, ta tự lo.”"}]},
 s3:{h:"Dạy lại một đứa trẻ",w:"emp",if:()=>rdK()<0,t:"Hoàng thượng đã thôi giao việc dạy cho ngươi. Nhưng thầy mới quá nghiêm, {n1} khóc không chịu đến lớp. Ngài bực mình, sai ngươi kèm riêng đứa trẻ ấy — thử thêm một lần.",o:[
  {n:"Nhận lời, dạy ở cung mình",c:{suc:-3},w:{duc:2},f:"gentle",wx:"còn một cơ hội",lx:"kèm riêng mỗi tối, hao sức; thất bại lần nữa thì hết",rt:"{n1} ngồi bên bàn ngươi, lần đầu cầm bút mà không khóc."},
  {n:"Xin dạy ngay tại Thượng thư phòng",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"strict",wx:"lấy lại chỗ đứng",l:{sung:-2},lx:"thầy mới ghét ngươi, tâu ngươi giành việc, Hoàng thượng phật ý",rt:"Hoàng thượng chuẩn. Thầy mới đành nhường một góc lớp.",rf:"Ngài bảo: “Dạy được một đứa đã rồi hẵng nói.”"},
  {n:"Từ chối khéo",c:{sung:-2},w:{tamco:1},wx:"khỏi gánh việc khó",lx:"ngài thấy ngươi giận dỗi, phật ý",rt:"Hoàng thượng cau mày, rồi tự giao cho người khác."}]},
 c1:{h:"Bút nghiên bị giấu",w:"emp",t:"{n2} đọc thuộc cả thiên Đại học. Các anh em ganh, giấu bút nghiên của nó, và {n1} cũng góp tay.",o:[
  {n:"Phạt cả lớp chép phạt",c:{sung:-1},w:{danh:2},f:"strict",wx:"phép lớp nghiêm",lx:"bọn trẻ đều về mách mẹ, các mẹ kêu lên Hoàng thượng, ân sủng nhạt đi",go:A=>{rdOan(A,"v",2)},rt:"Cả lớp chép bài đến trưa, không ai dám giấu đồ ai nữa."},
  {n:"Cho {n1} và {n2} ngồi chung một bàn",c:{suc:-2},o:()=>40+S.duc/4,w:{duc:3},sc:1,f:"gentle",wx:"hai đứa thân nhau",l:{danh:-1},lx:"hai đứa cãi nhau suốt buổi, người ta bảo thầy không giữ được lớp, tiếng tăm sứt mẻ",rt:"Đến chiều, {n1} đã mượn bút của {n2}.",rf:"Hai đứa giật nhau cái nghiên vỡ đôi."},
  {n:"Làm như không biết",c:{duc:-2},w:{tamco:1},wx:"không động mẹ nào",lx:"làm ngơ cho trẻ bị bắt nạt, tổn đức; {n2} tủi thân",rt:"{n2} lặng lẽ viết bằng que tre."}]},
 c2:{h:"Điểm tâm của {v}",w:"v",need:["v"],t:"{v} gửi sang một hộp điểm tâm và một lời nhắn: “Con ta phải đứng đầu lớp. Ngươi biết phải làm sao.”",o:[
  {n:"Nhận hộp, hứa kèm thêm",c:{suc:-3},w:{bac:20},wx:"{v} hài lòng",lx:"kèm thêm mỗi chiều, hao sức; thành ra thiên vị",go:A=>{rdRel(A,"v",6)},rt:"{v} gửi thêm một xấp lụa."},
  {n:"Trả hộp, nhắn: đứng đầu phải tự học",c:{danh:-1},w:{duc:2},wx:"giữ công bằng",lx:"trả lễ, {v} phật ý, kể ngươi kiêu, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",5)},rt:"Hộp điểm tâm về nguyên. {v} ném nó cho cung nữ."},
  {n:"Nhận hộp, chia cho cả lớp",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"cả lớp vui, {v} không bắt bẻ được",l:{danh:-1},lx:"{v} thấy bị coi thường, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?2:-4)},rt:"Bọn trẻ cảm ơn {v} đồng thanh, nàng không nói được gì.",rf:"{v} biết chuyện, giận đỏ mặt."}]},
 t1:{h:"Vết roi trên tay",w:"v",t:"Ngươi thấy lòng bàn tay {n1} có vết roi. Nó nói nhỏ: “Không đứng đầu thì mẹ đánh.”",o:[
  {n:"Sang khuyên {v}",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"đứa trẻ bớt đòn",l:{danh:-2},lx:"{v} cho là ngươi xen chuyện nhà, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-8)},rt:"{v} cúi đầu: “Ta cũng chỉ sợ nó thua người.”",rf:"{v} đóng cửa: “Ngươi dạy chữ, đừng dạy ta.”"},
  {n:"Thoa thuốc, không nói gì",c:{bac:-10},w:{duc:2},f:"gentle",wx:"đứa trẻ tin ngươi",lx:"tốn bạc mua thuốc; vết roi vẫn còn đó",rt:"{n1} để yên cho ngươi thoa thuốc, rồi ngủ gục trên bàn."},
  {n:"Tâu Hoàng thượng",c:{},o:()=>35+S.sung/4,w:{sung:2},sc:1,wx:"Hoàng thượng để ý đứa trẻ",l:{sung:-2},lx:"{v} khóc với Hoàng thượng rằng ngươi bới chuyện, ngài phật ý",go:A=>{rdOan(A,"v",8)},rt:"Hoàng thượng dặn {v}: “Con của trẫm, nàng đừng đánh.”",rf:"Ngài bảo chuyện dạy con là của mẹ nó."}]},
 x1:{h:"Buổi bình văn đầu tháng",w:"emp",t:"Đầu tháng, Hoàng thượng ghé Thượng thư phòng nghe bọn trẻ đọc bài. {v} đứng sau ngài.",o:[
  {n:"Để {n1} đọc bài nó thích",c:{suc:-3},o:A=>40+(A.f.gentle?15:0),e:["win","lose"],rt:"{n1} đọc bài thơ về con dế, giọng vang. Hoàng thượng cười to.",rf:"{n1} quên giữa chừng, đứng khóc."},
  {n:"Để {n2} đọc trước, {n1} đọc sau",c:{},o:A=>45+(A.f.strict?10:0)+S.danh/6,e:["win","mid"],lx:"{v} thấy con bị xếp sau",rt:"{n2} đọc hay, {n1} không chịu thua, đọc càng hay.",rf:"{n2} đọc hay, {n1} lí nhí."},
  {n:"Xin ngài nghe cả lớp đọc chung",c:{},w:{duc:2},e:"mid",lx:"không đứa nào nổi bật",rt:"Cả lớp đồng thanh. Hoàng thượng gật đầu rồi đi."}]}},
 E:{win:{k:1,tag:"Đứa trẻ chịu học",w:"v",t:"{n1} chịu ngồi yên học chữ. {v} không nói ra, nhưng gửi sang cung ngươi một chậu lan.",fx:{danh:4,duc:2},go:A=>{rdRel(A,"v",6);return""}},
  mid:{k:0,tag:"Lớp học còn lộn xộn",t:"Bọn trẻ vẫn nghịch, nhưng đã biết sợ thầy. Chưa ai khen, chưa ai trách.",fx:{duc:1}},
  lose:{k:-1,tag:"{n1} bẽ mặt trước cha",t:"{n1} khóc trước mặt Hoàng thượng. {v} dắt con về, không chào ngươi.",fx:{sung:-3,danh:-2},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("thd_hoc",6,{t:"Mẹ của học trò",w:"v",sj:"lòng nghi của {v}",ok:thdHocOk,cast:thdHocCast,
 g:"{v} tin rằng ngươi thiên vị {n2}. Một người mẹ trong cung không chỉ lo con học chữ: nàng lo cho con một chỗ đứng. Và nàng có thể làm nhiều điều hơn một lời than.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{v} ngồi dự giờ",w:"v",if:RDW(1),t:"{n1} chịu học, nhưng điều đầu tiên nó khoe với mẹ lại là: “Thầy khen {n2} viết đẹp hơn con.” Hôm sau, {v} đến Thượng thư phòng ngồi xem cả buổi.",o:[
  {n:"Dạy như mọi ngày",c:{danh:-2},w:{duc:2},wx:"không giả dối",lx:"{v} soi từng lời khen rồi kể ra ngoài, tiếng tăm sứt mẻ",rt:"Ngươi khen {n2} một lần, {n1} hai lần. {v} đếm cả."},
  {n:"Mời {v} ra đề cho bọn trẻ",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} thấy mình được trọng",l:{danh:-1},lx:"đề của nàng làm khó {n2}, người ta bảo thầy để mẹ trò dạy thay, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-2)},rt:"{v} ra đề, {n1} làm được. Nàng mỉm cười lần đầu.",rf:"{v} ra đề hiểm, {n2} làm sai, cả lớp cười."},
  {n:"Khen {n1} nhiều hơn hôm ấy",c:{duc:-2},w:{sung:1},wx:"{v} vui",lx:"khen lệch lòng mình, tổn đức; {n2} buồn",go:A=>{rdRel(A,"v",4)},rt:"{v} về, bảo cung nữ: “Thầy ấy cũng biết điều.”"}]},
 s2:{h:"Cung nữ đứng ngoài cửa lớp",w:"v",if:RDW(0),t:"Sau buổi bình văn, {v} sai một cung nữ đứng ngoài cửa Thượng thư phòng, ghi lại từng lời ngươi nói với con nàng.",o:[
  {n:"Mời cung nữ vào ngồi nghe cho rõ",c:{danh:-2},w:{duc:2},wx:"không có gì phải giấu",lx:"lớp có thêm một tai mắt, người ta bảo thầy sợ mẹ trò, tiếng tăm sứt mẻ",rt:"Cung nữ ngồi ghi, chữ nàng ta viết sai be bét."},
  {n:"Đuổi cung nữ đi",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"giữ phép lớp",l:{danh:-2},lx:"{v} có cớ nói ngươi giấu, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",5)},rt:"Cung nữ lui. {v} không dám làm to.",rf:"{v} tâu với Hoàng hậu là ngươi có điều mờ ám."},
  {n:"Nói chuyện thẳng với {v}",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"hai bên hiểu nhau hơn",l:{sung:-1},lx:"{v} càng nghi, khóc với Hoàng thượng, ân sủng nhạt đi",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} thở dài: “Ta chỉ có một đứa con.”",rf:"{v} nói: “Ngươi dạy con ai thì lo con người ấy.”"}]},
 c1:{h:"Lễ tạ thầy",w:"v",need:["v"],t:"{v} gửi sang một lễ tạ thầy nặng tay: bạc, ngọc, và một lời: “Từ nay mong thầy để tâm đến {n1} hơn.”",o:[
  {n:"Nhận lễ",c:{duc:-3},w:{bac:60},wx:"{v} yên lòng",lx:"nhận lễ là mắc nợ, tổn đức",go:A=>{rdRel(A,"v",6)},rt:"{v} cho là đã mua được thầy."},
  {n:"Nhận một phần, trả phần còn lại",c:{},o:()=>40+S.tamco/3,w:{bac:20,duc:1},sc:1,wx:"giữ lễ mà không mắc nợ",l:{danh:-1},lx:"{v} không hiểu ý, kể ngươi chê lễ, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?3:-3)},rt:"{v} hiểu: thầy nhận lòng, không nhận giá.",rf:"{v} cho là ngươi chê lễ mỏng."},
  {n:"Trả hết",c:{danh:-1},w:{duc:3},wx:"tay sạch",lx:"trả hết, {v} thấy bị khinh, kể khắp cung, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",6)},rt:"Lễ về nguyên. {v} lặng thinh."}]},
 c2:{h:"Lời gièm ở buổi thỉnh an",w:"hh",need:["hh","v"],t:"Ở buổi thỉnh an, {v} than với Hoàng hậu: “Thầy dạy chữ mà có lòng riêng, con của các tỷ muội chịu thiệt.”",o:[
  {n:"Xin Hoàng hậu cho người đến xem lớp",need:["hh"],c:{suc:-2},o:()=>40+S.hh/4,w:{danh:2},sc:1,wx:"có người làm chứng ngươi công bằng",l:{hh:-2},lx:"Hoàng hậu thêm việc, phật lòng",go:(A,ok)=>{if(ok)rdOan(A,"v",3)},rt:"Ma ma của Trung cung xem ba buổi, về thưa: thầy công bằng.",rf:"Hoàng hậu bảo: “Việc nhỏ, tự lo.”"},
  {n:"Nhận lời trách, hứa để tâm",c:{danh:-2},w:{hh:2},wx:"Hoàng hậu hài lòng",lx:"nhận lời trách như nhận mình thiên vị, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",3)},rt:"Hoàng hậu gật đầu cho qua."},
  {n:"Đáp: thầy chỉ có một lòng là dạy",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,wx:"cả điện nể",l:{hh:-2},lx:"thành ra cãi nhau trước Hoàng hậu, Trung cung phật lòng",go:A=>{rdOan(A,"v",5)},rt:"Không ai đáp lại được câu ấy.",rf:"Hoàng hậu phạt cả hai im lặng."}]},
 t1:{h:"Đứa trẻ hỏi",w:"v",t:"{n1} kéo áo ngươi: “Thầy ơi, mẹ con bảo thầy ghét con. Có thật không?”",o:[
  {n:"Ôm nó, nói thầy thương nó",c:{danh:-2},w:{duc:2},f:"gentle",wx:"đứa trẻ yên lòng",lx:"nó kể lại với mẹ, mẹ nó càng ghen, đồn thầy dụ trò, tiếng tăm sứt mẻ",rt:"{n1} cười, chạy đi khoe với {n2}."},
  {n:"Nói: thầy thương trò nào chăm",c:{sung:-2},w:{danh:1},f:"strict",wx:"đứa trẻ có mục tiêu",lx:"nó thấy mình chưa được thương, kể với phụ hoàng, ngài phật ý",rt:"{n1} ngồi xuống, mở sách ra."},
  {n:"Bảo nó hỏi mẹ vì sao nghĩ vậy",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"{v} phải tự nghĩ lại",l:{danh:-1},lx:"{v} cho là ngươi xúi con, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?5:-5)},rt:"Tối ấy {v} ngồi rất lâu bên giường con.",rf:"{v} cho là ngươi dạy con cãi mẹ."}]},
 x1:{h:"Gặp nhau ở Ngự hoa viên",w:"v",t:"Chiều ấy, {v} chặn ngươi ở Ngự hoa viên, hai đứa trẻ đứng sau lưng hai người. “Hôm nay ngươi nói cho rõ: con ta là gì trong mắt ngươi?”",o:[
  {n:"Mời {v} cùng dạy một buổi",c:{suc:-4},o:A=>35+S.duc/5,e:["win","lose"],rt:"{v} ngồi cạnh con, cùng đọc một trang sách. Lần đầu nàng thấy con mình học giỏi đến thế.",rf:"{v} thấy bị đem ra làm trò cười trước hai đứa trẻ."},
  {n:"Cử {n1} làm trưởng lớp",c:{danh:-2},o:A=>45+(A.f.gentle?10:0)+S.tamco/6,e:["win","mid"],rt:"{v} hài lòng; {n1} lần đầu biết giữ phép cho các em.",rf:"{v} nhận, nhưng {n2} và các mẹ khác không vui."},
  {n:"Thưa: trong lớp, đứa nào cũng như nhau",c:{},w:{duc:3},e:"mid",lx:"{v} chưa nguôi",rt:"{v} nhìn ngươi rất lâu, rồi dắt con đi."}]}},
 E:{win:{k:1,tag:"{v} nguôi lòng",w:"v",t:"{v} thôi sai người rình lớp. Nàng không nói lời cảm ơn, nhưng bảo con: “Nghe lời thầy.”",fx:{danh:4,duc:3},go:A=>{rdRel(A,"v",10);return""}},
  mid:{k:0,tag:"Nghi ngờ còn đó",t:"{v} không làm gì thêm, nhưng cũng không tin ngươi hơn.",fx:{duc:1}},
  lose:{k:-1,tag:"{v} coi ngươi là kẻ thù",t:"{v} bỏ về, từ đó gặp ngươi là quay mặt. Nàng bắt đầu kể với các cung khác rằng thầy dạy chữ có lòng riêng.",fx:{danh:-3},go:A=>{rdOan(A,"v",10);return""}}}});

rdDef("thd_hoc",7,{t:"Kỳ khảo hạch",w:"emp",sj:"kỳ khảo hạch hoàng tự trước triều thần",ok:thdHocOk,cast:thdHocCast,
 g:"Cuối xuân, Hoàng thượng khảo hạch các hoàng tự trước triều thần. Ai cũng biết: đứa nào đối đáp giỏi, đứa ấy được nhìn như người gánh được việc lớn. Mẹ nào cũng muốn con mình đứng đầu; thầy thì chỉ có một.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Chiếu khảo hạch",w:"emp",if:RDW(1),t:"Hoàng thượng báo trước ba tháng: kỳ khảo năm nay có cả Lục bộ Thượng thư ngồi nghe. Ngài nói riêng với ngươi: “Trẫm muốn xem đứa nào biết nghĩ, không phải đứa nào thuộc lòng.”",o:[
  {n:"Dạy bọn trẻ tự đặt câu hỏi",c:{suc:-3},w:{duc:2},f:"think",wx:"bọn trẻ biết nghĩ",lx:"dạy chậm từng câu, tốn công, hao sức",rt:"Ba tháng, {n1} hỏi ngươi nhiều câu hơn cả năm trước."},
  {n:"Ra đề luyện mỗi ngày",c:{sung:-2},w:{danh:2},f:"drill",wx:"bài nào cũng thuộc",lx:"bọn trẻ mệt, mách phụ hoàng, ngài phật ý",rt:"Bàn của bọn trẻ cao chồng giấy."},
  {n:"Hỏi Hoàng thượng ngài muốn nghe gì",c:{},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"biết ý vua",l:{sung:-2},lx:"ngài thấy ngươi dò đề, Hoàng thượng phật ý",rt:"Ngài cười: “Nghe chúng nói thật.”",rf:"Ngài nhíu mày: “Thầy mà cũng đi hỏi đề?”"}]},
 s2:{h:"Các mẹ đến tận lớp",w:"v",if:RDW(0),t:"Tin khảo hạch vừa ra, các mẹ thay nhau đến lớp. {v} đến sớm nhất, mang theo một thầy dạy riêng của nhà ngoại.",o:[
  {n:"Cho thầy riêng của {v} kèm thêm buổi chiều",c:{duc:-2},w:{tamco:1},wx:"{v} yên lòng",lx:"để thầy ngoài chen vào lớp, trò rối, tổn đức",go:A=>{rdRel(A,"v",5)},rt:"Chiều chiều {n1} học thêm, sáng ra ngủ gật."},
  {n:"Từ chối: lớp chỉ một thầy",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"giữ phép Thượng thư phòng",l:{danh:-2},lx:"{v} giận, kể khắp cung thầy độc đoán, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",5)},rt:"{v} đưa thầy riêng về.",rf:"{v} xin Hoàng thượng, ngài cho thầy riêng ở lại."},
  {n:"Hẹn các mẹ một buổi nói chung",c:{suc:-2},w:{duc:2},wx:"mọi mẹ nghe cùng một lời",lx:"nói chuyện với các mẹ đến khàn giọng, hao sức; mẹ nào cũng muốn hơn mẹ khác",rt:"Các mẹ ngồi nghe, ai cũng gật, ai cũng nghi."}]},
 c1:{h:"Đề khảo bị bán",w:"eun",t:"Một thái giám hầu ngự thư phòng lén tìm ngươi: hắn có bản đề khảo năm nay, giá năm mươi lạng, phải trả trước khi ngự thư phòng niêm đề.",o:[
  {n:"Mua đề",c:{bac:-50,duc:-4},o:()=>50+S.mat*3,w:{tamco:2},sc:1,f:"cheat",wx:"biết trước đề",l:{sung:-6},lx:"mua đề là tội lớn, lộ ra thì Hoàng thượng ghét bỏ",rt:"Bản đề thật. Ngươi biết bọn trẻ sẽ bị hỏi gì.",rf:"Bản đề giả, và thái giám đi kể khắp nơi."},
  {n:"Báo Hoàng thượng",c:{suc:-2},o:()=>40+S.sung/4,w:{sung:3},sc:1,wx:"ngài tin ngươi",l:{sung:-2},lx:"có người cho là ngươi cũng đã xem, Hoàng thượng nghi, phật ý",rt:"Hoàng thượng đổi đề, phạt thái giám.",rf:"Ngài hỏi: “Sao hắn lại tìm đến nàng?”"},
  {n:"Đuổi hắn đi, không nói ai",c:{danh:-2},w:{duc:2},wx:"tay sạch",lx:"hắn đem đề bán cho mẹ khác, ngươi mang tiếng biết mà không báo, tiếng tăm sứt mẻ",rt:"Thái giám lủi đi. Đêm ấy có tiếng gõ cửa cung {v}."}]},
 c2:{h:"{n1} ngã bệnh",w:"v",need:["v"],t:"{v} bắt {n1} học đến canh ba. Đứa trẻ sốt, mà nàng không cho nghỉ một buổi nào trước ngày khảo.",o:[
  {n:"Xin {v} cho con nghỉ",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:3},sc:1,wx:"đứa trẻ được nghỉ",l:{danh:-2},lx:"{v} cho là ngươi ngáng đường con nàng, kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} để con ngủ hai ngày. {n1} dậy, đòi đến lớp.",rf:"{v} đáp: “Ngươi muốn con ta thua?”"},
  {n:"Mời thái y đến xem",c:{bac:-20},w:{duc:2},wx:"thái y ra lệnh nghỉ",lx:"tốn bạc mời thái y; {v} biết ai mời",go:A=>{rdOan(A,"v",2)},rt:"Thái y kê đơn, dặn nghỉ năm ngày. {v} không cãi được thái y."},
  {n:"Dạy nhẹ đi trong lớp",c:{duc:-2},w:{tamco:1},f:"think",wx:"đứa trẻ thở được ở lớp",lx:"dạy nhẹ cho riêng một đứa, tổn đức; ở nhà nó vẫn bị ép",rt:"Ở lớp, ngươi cho {n1} vẽ tranh thay chép bài."}]},
 t1:{h:"{n2} sẽ vượt mặt",w:"emp",t:"{n2} giỏi hơn {n1} thấy rõ. Ngày khảo, nếu {n2} đứng đầu, {v} sẽ cho là ngươi cố ý.",o:[
  {n:"Để {n2} cứ tỏa sáng",c:{sung:-1},w:{danh:2},f:"fair",wx:"công bằng",lx:"các mẹ kêu thầy để một đứa lấn hết, Hoàng thượng phật ý; {v} sẽ oán",go:A=>{rdOan(A,"v",4)},rt:"Ngươi giao {n2} bài khó nhất."},
  {n:"Bảo {n2} nhường một chút",c:{duc:-3},w:{tamco:1},wx:"{v} không bị bẽ mặt",lx:"dạy trò giấu tài, tổn đức",go:A=>{rdRel(A,"v",4)},rt:"{n2} gật đầu, mắt buồn."},
  {n:"Mỗi đứa giữ một môn",c:{suc:-2},o:()=>45+S.tai/5,w:{duc:2},sc:1,f:"fair",wx:"đứa nào cũng có chỗ đứng",l:{danh:-1},lx:"chia môn mà không khéo thì lộ, tiếng tăm sứt mẻ",rt:"{n2} giữ phần kinh nghĩa, {n1} giữ phần cưỡi ngựa bắn cung.",rf:"Bọn trẻ tranh nhau môn của đứa khác."}]},
 x1:{h:"Ngày khảo hạch",w:"emp",t:"Điện Văn Hoa. Lục bộ Thượng thư ngồi hai bên, Hoàng thượng ngồi trên, bọn trẻ quỳ thành hàng. Phi tần không được bước vào điện; ngươi chỉ kịp dặn bọn trẻ một lời ở cửa Thượng thư phòng, rồi ngồi chờ thái giám chạy tin.",o:[
  {n:"Để bọn trẻ đối đáp tự do",c:{suc:-4},o:A=>35+(A.f.think?15:0)+S.tai/6,e:["win","lose"],rt:"{n1} trả lời một câu về đê điều làm cả triều ngẩn người. Hoàng thượng gõ bàn khen.",rf:"Bọn trẻ nói lan man, một Thượng thư bật cười."},
  {n:"Cho bọn trẻ đọc bài đã luyện",c:{suc:-4},o:A=>45+(A.f.drill?15:0)+(A.f.cheat?10:0),e:["win","mid"],rt:"Không đứa nào sai một chữ. Triều thần gật gù.",rf:"Thuộc làu mà không đứa nào nói được ý mình."},
  {n:"Xin Hoàng thượng chấm cả lớp như một",c:{},w:{duc:3},e:"mid",lx:"không đứa nào được khen riêng",rt:"Hoàng thượng ban cả lớp mỗi đứa một cây bút."}]}},
 E:{win:{k:1,tag:"Cả lớp đối đáp lưu loát",w:"emp",t:"Triều thần ra về bàn tán về Thượng thư phòng. {n1} được Hoàng thượng xoa đầu trước điện. Tối ấy {v} sang Thượng thư phòng, lần đầu cúi chào ngươi.",fx:{danh:6,sung:3},go:A=>{rdRel(A,"v",8);return""}},
  mid:{k:0,tag:"Khảo hạch qua êm",t:"Không đứa nào nổi bật, không đứa nào hỏng. Hoàng thượng gật đầu, rồi quên.",fx:{danh:1}},
  lose:{k:-1,tag:"Khảo hạch rối loạn",t:"Một Thượng thư bật cười giữa điện. {v} đổ lỗi cho ngươi, và lần này các mẹ khác cũng gật đầu theo.",fx:{danh:-4,sung:-2},go:A=>{rdOan(A,"v",8);return""}}}});

rdDef("thd_hoc",8,{t:"Đứa trẻ bị phạt",w:"v",sj:"đứa trẻ bị phạt trong giờ ngươi dạy",ok:thdHocOk,cast:thdHocCast,
 g:"Một đứa trẻ bị phạt trong giờ ngươi dạy. Ở Thượng thư phòng, phép phạt của thầy là phép; ra khỏi cửa lớp, phép phạt ấy là chuyện của mẹ nó.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đứa trẻ sinh kiêu",w:"v",if:RDW(1),t:"Được khen trước điện, {n1} sinh kiêu. Giữa lớp, nó xé vở của {n2}, cười: “Phụ hoàng khen ta, không khen ngươi.”",o:[
  {n:"Bắt nó xin lỗi trước lớp",c:{},o:()=>45+S.danh/5,w:{danh:2},sc:1,f:"strict",wx:"phép lớp còn",l:{duc:-1},lx:"nó thấy bị làm nhục, tổn đức",rt:"{n1} lí nhí xin lỗi, mặt đỏ tía.",rf:"{n1} chạy ra khỏi lớp."},
  {n:"Gọi riêng nó ra nói chuyện",c:{suc:-2},w:{duc:2},f:"gentle",wx:"nó hiểu lỗi",lx:"ngồi nói với trò cả buổi, hao sức; {n2} thấy thầy bênh {n1}",rt:"Ngồi ngoài hiên, {n1} khóc: “Mẹ bảo con phải hơn hết mọi người.”"},
  {n:"Cho {n2} tự xử",c:{duc:-2},w:{tamco:1},wx:"{n2} học cách tự đứng",lx:"để trẻ tự xử, hai đứa đánh nhau, tổn đức",rt:"{n2} lặng lẽ dán lại vở, rồi xé đôi tờ bài của {n1}."}]},
 s2:{h:"Đứa trẻ bị chế giễu",w:"v",if:RDW(0),t:"Sau kỳ khảo, {n1} bị anh em chế giễu. Nó lao vào đánh một hoàng tự lớn hơn, cả hai sứt đầu ngay trong giờ ngươi dạy.",o:[
  {n:"Can ra, băng bó cho cả hai",c:{bac:-10},w:{duc:2},wx:"không đứa nào nặng thêm",lx:"tốn bạc thuốc men; chuyện vẫn lan ra",rt:"Hai đứa ngồi hai đầu lớp, mắt còn tóe lửa."},
  {n:"Phạt cả hai đứng góc lớp",c:{sung:-1},w:{danh:2},f:"strict",wx:"giữ phép",lx:"hai mẹ đều giận, kêu lên Hoàng thượng, ân sủng nhạt đi",go:A=>{rdOan(A,"v",3)},rt:"Hai đứa đứng đến trưa, không đứa nào chịu khóc."},
  {n:"Hỏi rõ ai gây trước",c:{suc:-2},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"biết đầu đuôi",l:{danh:-1},lx:"bọn trẻ bao che nhau, người ta bảo thầy tra trò như tra tội, tiếng tăm sứt mẻ",rt:"Hoàng tự lớn chọc trước: “Con của {v} dốt.”",rf:"Không đứa nào chịu nói."}]},
 c1:{h:"Phép của Thượng thư phòng",w:"emp",t:"Phép cũ của Thượng thư phòng: không ai được đánh hoàng tự; trò phạm lỗi thì quỳ chép sách, mười lượt. Thầy không phạt thì thầy mang lỗi.",o:[
  {n:"Bắt quỳ chép đủ mười lượt",c:{sung:-1},w:{danh:3},f:"strict",wx:"giữ phép như thầy đồ",lx:"đứa trẻ quỳ đến tê chân, Hoàng thượng xót con, ân sủng nhạt đi; {v} thêm oán",go:A=>{rdOan(A,"v",6)},rt:"Quỳ đến lượt cuối, {n1} cắn môi không kêu. Ngươi đau hơn nó."},
  {n:"Cho ngồi chép ba lượt",c:{},o:()=>45+S.tamco/4,w:{duc:2},sc:1,wx:"giữ phép mà nương tay",l:{danh:-2},lx:"bị nói là sợ mẹ trò, tiếng tăm sứt mẻ",rt:"Ba lượt chép, {n1} hiểu thầy nương tay.",rf:"Có người tâu thầy không giữ phép."},
  {n:"Ngồi kèm trò chép bài",c:{suc:-2},w:{duc:3},f:"gentle",wx:"đứa trẻ khỏi phải quỳ",lx:"ngồi kèm trò chép bài đến tối, hao sức; không đúng phép cũ",rt:"{n1} chép một trăm lần chữ “Nhẫn”, đến chữ cuối viết đẹp nhất."}]},
 c2:{h:"{v} xông vào lớp",w:"v",need:["v"],t:"{v} xông vào Thượng thư phòng, kéo con ra sau lưng: “Ai cho ngươi động vào con ta?”",o:[
  {n:"Quỳ xuống thưa rõ đầu đuôi",c:{danh:-2},o:()=>40+S.duc/4,w:{duc:3},sc:1,wx:"{v} nghe được lẽ phải",lx:"thầy quỳ trước mẹ trò, mất mặt",go:(A,ok)=>{rdRel(A,"v",ok?8:-4)},rt:"{v} nghe xong, buông tay con.",rf:"{v} không nghe, dắt con đi."},
  {n:"Đứng thẳng: đây là lớp, không phải cung nàng",c:{},o:()=>40+S.danh/4,w:{danh:3},sc:1,wx:"giữ uy thầy",l:{danh:-2},lx:"{v} thấy bị khinh trước con, kể khắp cung, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",8)},rt:"{v} lùi ra cửa, không nói được lời nào.",rf:"{v} hét lên trước mặt cả lớp."},
  {n:"Để {n1} tự nói với mẹ",c:{duc:-2},w:{tamco:2},wx:"đứa trẻ nhận lỗi",lx:"đặt đứa trẻ vào giữa, tổn đức",go:A=>{rdRel(A,"v",2)},rt:"{n1} níu áo mẹ: “Con sai trước.”"}]},
 t1:{h:"Đứa trẻ sốt đêm",w:"doc",t:"Đêm ấy {n1} lên cơn sốt. {v} cho là vì bị phạt. Thái y viện chưa ai dám kết luận.",o:[
  {n:"Sang thức trông nó",c:{suc:-4},w:{duc:4},wx:"đứa trẻ nắm tay thầy",lx:"thức trông trò cả đêm, kiệt sức",go:A=>{rdRel(A,"v",6)},rt:"Gần sáng, {n1} hạ sốt, mở mắt gọi: “Thầy.”"},
  {n:"Mời thái y giỏi nhất xem bệnh",c:{bac:-30},o:()=>50+S.mat*3,w:{danh:2},sc:1,wx:"thái y nói không phải do bị phạt",l:{danh:-2},lx:"thái y nói mập mờ, người ta bảo ngươi mời thái y để chạy tội, tiếng tăm sứt mẻ",rt:"Thái y nói: trẻ bị cảm từ ba hôm trước.",rf:"Thái y chỉ nói: “Trẻ con yếu.”"},
  {n:"Ở yên trong cung mình",c:{duc:-2},w:{tamco:1},wx:"không cho {v} cớ",lx:"người ta nói thầy vô tình, tổn đức",rt:"Ngươi chỉ gửi sang một bát cháo."}]},
 x1:{h:"Ai chịu lỗi",w:"emp",t:"Chuyện đến tai Hoàng thượng. Ngài cho gọi ngươi và {v}: “Con trẫm bị phạt quỳ trong lớp, về cung thì sốt. Lỗi ở ai?”",o:[
  {n:"Thầy chịu lỗi thay trò",c:{suc:-4},o:A=>40+(A.f.gentle?10:0)+S.duc/6,e:["win","mid"],rt:"Ngươi quỳ nhận hết. {n1} chạy ra quỳ cạnh: “Là con sai.” Hoàng thượng phẩy tay tha cả hai.",rf:"Hoàng thượng quở ngươi một câu trước lớp, chuyện khép lại."},
  {n:"Tâu thật: trò sai, thầy giữ phép",c:{},o:A=>40+(A.f.strict?15:0)+S.danh/5,e:["win","lose"],lx:"{v} bị bẽ trước vua",rt:"Hoàng thượng gật đầu: “Thầy nghiêm thì trò nên người.”",rf:"Hoàng thượng thấy ngươi cứng, {v} khóc to."},
  {n:"Xin ngài tha cho cả lớp",c:{sung:-2},w:{duc:2},e:"mid",lx:"xin tha mà chẳng rõ trắng đen, Hoàng thượng phật ý",rt:"Hoàng thượng cho lui, không nói thêm."}]}},
 E:{win:{k:1,tag:"Thầy chịu thay trò",w:"v",t:"{n1} từ hôm ấy gọi ngươi là thầy bằng cả tấm lòng. {v} không còn cớ để trách, và lần đầu nàng sai người mang trà sang cảm ơn.",fx:{danh:4,duc:4},go:A=>{rdRel(A,"v",10);return""}},
  mid:{k:0,tag:"Chuyện khép mà chưa lành",t:"Không ai bị phạt nặng. {n1} vẫn đến lớp, nhưng {v} dặn con đừng thân thầy quá.",fx:{duc:1}},
  lose:{k:-1,tag:"{v} tố ngươi hành con nàng",t:"{v} kể khắp hậu cung rằng ngươi phạt con nàng đến sốt. Có người tin. Nàng thề không bỏ qua.",fx:{danh:-4,sung:-3},go:A=>{rdOan(A,"v",12);return""}}}});

rdDef("thd_hoc",9,{t:"Bài học đạo lý",w:"emp",sj:"bài giảng Mạnh Tử của ngươi",ok:thdHocOk,cast:thdHocCast,
 g:"Ngươi dạy bọn trẻ một câu của Mạnh Tử: “Dân là quý, xã tắc thứ hai, vua là nhẹ.” Đến bữa tối, {n1} đem câu ấy đọc trước mặt Hoàng thượng. Một câu chữ trong lớp, nay thành chuyện ngoài triều.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng bật cười",w:"emp",if:RDW(1),t:"Hoàng thượng nghe {n1} đọc, bật cười: “Vua là nhẹ? Vậy con giải nghĩa cho phụ hoàng nghe.” Đứa trẻ giải được, ngài kể lại ở triều.",o:[
  {n:"Thưa: thiếp chỉ dạy theo sách",c:{danh:-2},w:{duc:2},wx:"khiêm nhường",lx:"công dạy bị giấu đi, danh lùi một bước",rt:"Hoàng thượng gật đầu: “Sách hay, thầy cũng hay.”"},
  {n:"Xin ngài khen {n1} trước mặt mẹ nó",c:{suc:-2},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"{v} được nở mày",l:{sung:-1},lx:"các mẹ khác ganh, kêu lên Hoàng thượng, ân sủng nhạt đi",go:(A,ok)=>{if(ok)rdRel(A,"v",6)},rt:"Hoàng thượng khen {n1} trước {v}. Nàng đỏ mắt.",rf:"Ngài bận, quên mất."},
  {n:"Dặn {n1} đừng đọc câu ấy ngoài lớp",c:{duc:-2},w:{tamco:2},wx:"bớt sóng gió",lx:"dạy trò giấu chữ, tổn đức",rt:"{n1} gật đầu, không hiểu vì sao."}]},
 s2:{h:"{v} mang câu ấy đến ngự tiền",w:"v",if:RDW(0),t:"{v} dắt con đến trước Hoàng thượng, bắt nó đọc lại câu ấy: “Bệ hạ nghe xem, thầy dạy con ta coi nhẹ vua cha.”",o:[
  {n:"Xin ngài cho thiếp giảng trọn câu",c:{suc:-3},o:()=>40+S.tai/4,w:{danh:3},sc:1,wx:"lẽ phải sáng ra",l:{sung:-2},lx:"ngài không muốn nghe, Hoàng thượng phật ý",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Ngươi giảng: vua coi dân là quý thì xã tắc bền. Hoàng thượng gật gù.",rf:"Ngài phẩy tay: “Thôi, đừng dạy câu ấy nữa.”"},
  {n:"Nhận lỗi, bỏ câu ấy khỏi bài",c:{danh:-2},w:{sung:2},wx:"ngài yên lòng",lx:"thầy bỏ sách vì sợ, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",2)},rt:"Câu ấy biến khỏi bài học, {n2} hỏi mãi vì sao."},
  {n:"Im lặng nhìn {v}",c:{duc:-1},w:{tamco:2},wx:"để nàng tự lộ",lx:"im lặng để lời gièm còn đó, tổn đức",go:A=>{rdOan(A,"v",3)},rt:"{v} nói thêm vài câu, rồi tự thấy mình quá lời."}]},
 c1:{h:"Sớ của Thị giảng Hàn lâm",w:"emp",t:"Một Thị giảng Hàn lâm viện, vốn mong được dạy hoàng tự, dâng sớ: phi tần dạy Mạnh Tử cho hoàng tự là “vượt phận”.",o:[
  {n:"Mời Thị giảng đến dự giờ",c:{suc:-2},o:()=>40+S.tai/4,w:{danh:3},sc:1,wx:"Thị giảng thấy ngươi dạy đúng",l:{danh:-2},lx:"Thị giảng bới lỗi, ghi thêm vào sớ, tiếng tăm sứt mẻ",rt:"Thị giảng nghe một buổi, về rút sớ.",rf:"Thị giảng ghi thêm ba lỗi vào sớ."},
  {n:"Nhờ {dad} viết thư giải nghĩa",c:{sung:-2},w:{danh:2},wx:"lời của một thầy đồ già có sức nặng",lx:"kéo cha vào chuyện triều, Hoàng thượng phật ý",rt:"Thư của cha được chép truyền trong Hàn lâm viện."},
  {n:"Mặc sớ",c:{danh:-2},w:{duc:1},wx:"không gây thêm",lx:"sớ để lâu thành thật, tiếng tăm sứt mẻ",rt:"Ngươi vẫn dạy như cũ."}]},
 c2:{h:"{v} kết với Thị giảng",w:"v",need:["v"],t:"Người của ngươi thấy cung nữ của {v} đưa thư cho người nhà Thị giảng. Hai bên đang góp lời.",o:[
  {n:"Bắt tận tay bức thư",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,wx:"có chứng {v} xúi sớ",l:{danh:-2},lx:"ầm ĩ trong cung, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Bức thư viết: “Đuổi được thầy ấy thì Thị giảng vào dạy.”",rf:"Cung nữ nuốt luôn bức thư."},
  {n:"Gặp {v}, hỏi nàng muốn gì",c:{suc:-2},o:()=>35+S.duc/4,w:{duc:2},sc:1,wx:"biết lòng {v}",l:{sung:-1},lx:"{v} cười nhạt, khóc với Hoàng thượng, ân sủng nhạt đi",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} nói thật: “Ta muốn con ta có thầy là đàn ông, là quan.”",rf:"{v} không nhận."},
  {n:"Để mặc",c:{duc:-2},w:{tamco:1},wx:"không động",lx:"để mặc người gièm, tổn đức; hai bên tự do góp lời",rt:"Ngươi giả như không thấy."}]},
 t1:{h:"Câu hỏi của {n2}",w:"emp",t:"Trong lớp, {n2} giơ tay: “Thầy ơi, nếu vua sai thì sao?” Cả lớp im phăng phắc.",o:[
  {n:"Đáp: thì có bề tôi ngay thẳng dám can",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,f:"brave",wx:"bọn trẻ hiểu đạo can gián",l:{danh:-2},lx:"câu trả lời lọt ra ngoài, tiếng tăm sứt mẻ",rt:"Bọn trẻ chép chuyện bề tôi can vua trong sách sử vào vở.",rf:"Có đứa kể lại với mẹ, mẹ nó kể lại với Thị giảng."},
  {n:"Đáp: vua không sai",c:{danh:-2},w:{sung:1},f:"safe",wx:"an toàn",lx:"dạy trò nói dối, tiếng tăm sứt mẻ",rt:"{n2} ngồi xuống, không hỏi nữa."},
  {n:"Đáp: để thầy hỏi lại các con",c:{suc:-2},w:{duc:2},f:"brave",wx:"bọn trẻ tự nghĩ",lx:"để trò hỏi tới hỏi lui đến khàn giọng, hao sức; bọn trẻ nói lung tung",rt:"{n1} nói: “Thì con cũng sai theo.” {n2} nói: “Thì phải có người dám nói.”"}]},
 x1:{h:"Giảng trước ngự tiền",w:"emp",t:"Hoàng thượng cho gọi ngươi vào Ngự thư phòng. Sớ của Thị giảng nằm mở trên án: “Nàng giảng lại câu ấy cho trẫm nghe. Trả lời sớ này thế nào, trẫm tự định.”",o:[
  {n:"Giảng trọn câu, dẫn cả sách",c:{suc:-4},o:A=>35+(A.f.brave?10:0)+S.tai/5,e:["win","lose"],rt:"Hoàng thượng nghe hết, nói: “Thầy dạy con trẫm biết thương dân. Thế là đủ.” Hôm sau ngài gác sớ của Thị giảng.",rf:"Ngài chỉ vào một dòng trong sớ: Thị giảng bắt đúng một chữ ngươi giảng lệch."},
  {n:"Để {n1} và {n2} tự giảng",c:{},o:A=>40+(A.f.safe?0:10),e:["win","mid"],lx:"đặt cả thầy lẫn trò vào hiểm",rt:"Hai đứa trẻ giảng, mỗi đứa một ý, ý nào cũng đúng sách.",rf:"Hai đứa ấp úng, nhưng không ai bắt được lỗi."},
  {n:"Xin bỏ bài ấy, dạy lại Hiếu kinh",c:{danh:-3},w:{sung:2},e:"mid",lx:"thầy lùi trước Thị giảng, tiếng tăm sứt mẻ",rt:"Hoàng thượng gật đầu. Hôm sau Thị giảng nghe tin, mỉm cười."}]}},
 E:{win:{k:1,tag:"Bài học đến tai vua",w:"emp",t:"Hoàng thượng sai chép bài giảng của ngươi vào sách dạy hoàng tự. Thị giảng rút sớ, và {v} lần đầu thấy con mình được triều thần khen.",fx:{danh:7,sung:2},go:A=>{rdRel(A,"v",4);return""}},
  mid:{k:0,tag:"Bài học bị gác",t:"Không ai bị phạt, nhưng câu ấy không còn trong lớp. Bọn trẻ vẫn nhớ.",fx:{duc:2}},
  lose:{k:-1,tag:"Bị trách dạy điều quá phận",t:"Hoàng thượng trách ngươi dạy điều quá phận. Thị giảng được vào dạy một buổi mỗi tuần, {v} mãn nguyện.",fx:{danh:-5,sung:-3},go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("thd_hoc",10,{t:"Kết khóa",w:"emp",sj:"lời nhận xét của người thầy",ok:thdHocOk,cast:thdHocCast,
 g:"Năm học khép lại. Hoàng thượng muốn nghe từ chính miệng người thầy: trong đám trẻ, đứa nào gánh được việc lớn. Một câu của ngươi có thể nghiêng cả chuyện Đông cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sách của thầy",w:"emp",if:RDW(1),t:"Bài giảng của ngươi được chép thành sách. Các mẹ đua nhau xin một bản, và ai cũng muốn trang khen con mình dày hơn.",o:[
  {n:"Viết mỗi đứa một trang như nhau",c:{suc:-3},w:{duc:3},f:"fair",wx:"không mẹ nào trách",lx:"viết mỗi đứa một trang đến khuya, hao sức; không mẹ nào thật vui",rt:"Mỗi đứa một trang, chữ ngươi nắn nót."},
  {n:"Viết thật, đứa nào hơn thì khen hơn",c:{sung:-2},w:{danh:2},f:"truth",wx:"lời thầy có giá",lx:"các mẹ đếm chữ, kêu lên Hoàng thượng, ân sủng nhạt đi",rt:"Trang của {n2} dày nhất, trang của {n1} đứng thứ hai."},
  {n:"Gửi sách lên Hoàng thượng trước",c:{},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"ngài xem trước",l:{sung:-1},lx:"các mẹ thấy bị qua mặt, kêu lên Hoàng thượng, ân sủng nhạt đi",rt:"Hoàng thượng đọc trang của {n1} hai lần.",rf:"Ngài để sách lại, chưa đọc."}]},
 s2:{h:"Lớp vắng dần",w:"emp",if:RDW(0),t:"Gần cuối khóa, vài mẹ đã cho con học thầy khác. Lớp của ngươi vắng dần, chỉ {n1} và {n2} ngày nào cũng đến.",o:[
  {n:"Dạy hai đứa như dạy cả lớp",c:{suc:-2},w:{duc:3},f:"fair",wx:"hai đứa tiến bộ vượt bậc",lx:"dạy hai đứa mà lòng mỏi, hao sức; tiếng thầy vắng trò",rt:"Hai đứa đọc thuộc Mạnh Tử trước cả các anh lớn."},
  {n:"Đi mời các trò cũ quay lại",c:{bac:-20},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"lớp đông lại",l:{danh:-2},lx:"bị nói là thầy đi xin trò, tiếng tăm sứt mẻ",rt:"Ba đứa quay lại, mang theo quà của mẹ.",rf:"Các mẹ đóng cửa."},
  {n:"Xin Hoàng thượng cho nghỉ sớm",c:{danh:-2},w:{suc:4},wx:"được nghỉ ngơi",lx:"khóa học khép không trọn, tiếng tăm sứt mẻ",rt:"Ngài cho phép, không hỏi thêm."}]},
 c1:{h:"Lễ tạ thầy cuối khóa",w:"emp",t:"Cuối khóa, các mẹ gửi lễ tạ thầy. Lễ của {v} nặng nhất, kèm một lời: “Mong thầy nói tốt cho con ta trước Hoàng thượng.”",o:[
  {n:"Nhận lễ chung, trả lễ riêng",c:{danh:-1},w:{duc:2,bac:20},wx:"giữ thể diện cho các mẹ",lx:"{v} thấy lễ mình bị trả, kể khắp cung, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",3)},rt:"Lễ chung được nhận, lễ riêng của {v} trả nguyên phong."},
  {n:"Nhận hết",c:{duc:-3},w:{bac:60},wx:"được bạc",lx:"mắc nợ cả lớp, tổn đức",go:A=>{rdRel(A,"v",4)},rt:"Kho cung ngươi đầy thêm, lòng ngươi nặng thêm."},
  {n:"Dùng lễ mua sách cho Thượng thư phòng",c:{sung:-2},w:{danh:3},wx:"lễ thành của chung",lx:"các mẹ không được ghi ơn riêng, kêu lên Hoàng thượng, ân sủng nhạt đi",rt:"Thượng thư phòng có thêm hai tủ sách."}]},
 c2:{h:"{v} xin một lời",w:"v",need:["v"],t:"{v} đến không mang lễ: “Nếu Hoàng thượng hỏi, chỉ cần ngươi nói tên con ta. Ta sẽ nhớ ơn ngươi cả đời.”",o:[
  {n:"Hứa nói thật về {n1}",c:{danh:-2},w:{duc:2},wx:"không hứa điều sai",lx:"hứa nói thật, {v} không biết thật là tốt hay xấu, đồn ngươi úp mở, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",3)},rt:"{v} nhìn ngươi, gật đầu chậm."},
  {n:"Hứa sẽ nói tên {n1}",c:{duc:-2},w:{tamco:2},f:"promise",wx:"{v} thành đồng minh",lx:"hứa trái với lòng thầy, tổn đức; lời hứa phải giữ",go:A=>{rdRel(A,"v",10)},rt:"{v} nắm tay ngươi: “Từ nay hai ta là người một nhà.”"},
  {n:"Từ chối: thầy không chọn vua",c:{sung:-1},w:{danh:2},wx:"giữ thẳng",lx:"từ chối: thầy không chọn vua, Hoàng thượng nghe, ân sủng nhạt đi; {v} thấy bị phụ",go:A=>{rdOan(A,"v",6)},rt:"{v} đứng dậy: “Vậy ngươi đừng trách ta.”"}]},
 t1:{h:"{n1} xin thầy ở lại",w:"v",t:"Biết sắp đổi thầy, {n1} chạy sang cung ngươi, ôm chân không chịu về: “Con chỉ học thầy thôi.”",o:[
  {n:"Hứa vẫn dạy nó mỗi tuần một buổi",c:{suc:-3},w:{duc:3},f:"bond",wx:"đứa trẻ yên lòng",lx:"thêm một buổi dạy mỗi tuần, hao sức",go:A=>{rdRel(A,"v",4)},rt:"{n1} ngoéo tay với ngươi, rồi mới chịu về."},
  {n:"Dạy nó biết chia tay",c:{sung:-2},w:{danh:1},wx:"đứa trẻ lớn thêm",lx:"nó khóc cả đêm, mách phụ hoàng, ngài phật ý",rt:"Ngươi viết cho nó một chữ “Biệt”, giảng nghĩa đến khi nó thôi khóc."},
  {n:"Gửi nó về cho {v}",c:{duc:-2},w:{tamco:1},wx:"không để {v} nói ngươi giữ con nàng",lx:"đứa trẻ thấy bị bỏ, tổn đức",rt:"{n1} đi, ngoái lại ba lần."}]},
 x1:{h:"Câu hỏi của Hoàng thượng",w:"emp",t:"Đêm cuối khóa, Hoàng thượng hỏi khẽ: “Nàng dạy chúng cả năm. Đứa nào có thể gánh việc lớn?”",o:[
  {n:"Tâu tên {n1}",c:{suc:-4},o:A=>35+(A.f.bond?10:0)+(A.f.promise?5:0),e:["win","lose"],lx:"các mẹ khác sẽ biết",rt:"Hoàng thượng gật đầu: “Trẫm cũng thấy thế.” Hôm sau ngài cho {n1} theo hầu buổi chầu.",rf:"Hoàng thượng nhíu mày: “Thầy mà cũng chọn phe?”"},
  {n:"Tâu: mỗi đứa một tài, xin ngài xem từng đứa",c:{},o:A=>45+(A.f.fair?15:0)+(A.f.truth?5:0),e:["win","mid"],lx:"{v} không được câu nàng muốn",rt:"Ngươi kể tài từng đứa. Hoàng thượng nghe đến khuya, rồi nói: “Thầy này biết người.”",rf:"Hoàng thượng nghe, nhưng không nhớ được gì."},
  {n:"Tâu tên {k}",need:["kid"],c:{sung:-3},o:A=>35+S.sung/5,e:["mid","lose"],lx:"ai cũng biết thầy nói cho con mình",rt:"Hoàng thượng cười: “Mẹ nào cũng thế.” Nhưng ngài vẫn để ý {k}.",rf:"Hoàng thượng lạnh mặt: “Trẫm hỏi thầy, không hỏi mẹ.”"},
  {n:"Thưa: thiếp chỉ dạy chữ",c:{},w:{duc:2},e:"mid",lx:"lời thầy không được nghe",rt:"Hoàng thượng thở dài, không hỏi nữa."}]}},
 E:{win:{k:1,tag:"Lời thầy nặng ký",w:"emp",t:"Từ đó, mỗi lần bàn chuyện các hoàng tự, Hoàng thượng đều hỏi: “Thầy của chúng nói sao?” {v} biết, và ngả về phía ngươi.",fx:{danh:6,sung:3},go:A=>{rdRel(A,"v",6);return""}},
  mid:{k:0,tag:"Khóa học khép êm",t:"Năm học khép lại không sóng gió. Bọn trẻ lớn thêm một tuổi, ngươi già thêm một năm.",fx:{duc:2}},
  lose:{k:-1,tag:"Lời thầy bị nghi",t:"Hoàng thượng cho là thầy cũng có phe. Ngài thôi hỏi ngươi chuyện các hoàng tự, và {v} cho là ngươi đã phụ nàng.",fx:{sung:-5,danh:-3},go:A=>{rdOan(A,"v",8);return""}}}});

rdDef("thd_hoc",11,{t:"Người thầy",w:"emp",sj:"điều người thầy để lại",ok:thdHocOk,cast:thdHocCast,
 g:"Các hoàng tự lớn dần, sắp sang học các Đại học sĩ Hàn lâm. Lớp của ngươi khép lại. Thầy để lại gì cho trò, và các mẹ nhớ ngươi thế nào — đây là kết cục truyện xuất thân của ngươi: con gái thầy đồ nghèo, làm thầy trong cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của cha",w:"dad",if:RDW(1),t:"{dad} nghe tin con gái dạy hoàng tự, viết lên kinh: “Cả đời cha dạy trẻ làng. Con dạy con vua. Nhớ: thầy giỏi là thầy dạy trò hơn mình.”",o:[
  {n:"Đọc thư cho bọn trẻ nghe",c:{danh:-2},w:{duc:2},f:"heart",wx:"bọn trẻ biết thầy cũng có thầy",lx:"các mẹ chê ngươi đem chuyện quê vào cung, tiếng tăm sứt mẻ",rt:"{n1} hỏi: “Cha của thầy có dạy con được không?”"},
  {n:"Gửi bạc về sửa trường làng cho cha",c:{bac:-40},w:{danh:2},wx:"trường làng có mái mới",lx:"tốn bạc sửa trường",rt:"Trường làng lợp lại ngói, học trò của cha có chỗ ngồi khô."},
  {n:"Cất thư, không nói với ai",c:{duc:-2},w:{tamco:1},wx:"giữ riêng điều quý",lx:"giấu lời dạy của cha, tổn đức; bọn trẻ không biết",rt:"Ngươi đặt thư dưới gối."}]},
 s2:{h:"Lớp cuối cùng",w:"emp",if:RDW(0),t:"Buổi học cuối, chỉ còn ít đứa đến. {n1} ngồi bàn đầu, lần đầu tiên đến sớm hơn thầy.",o:[
  {n:"Dạy trọn buổi như mọi ngày",c:{suc:-2},w:{duc:3},f:"heart",wx:"bọn trẻ nhớ thầy",lx:"dạy trọn buổi đến mỏi, hao sức; không ai ngoài lớp biết",rt:"Hết buổi, {n1} cúi lạy ngươi ba lạy, không ai bảo."},
  {n:"Mời các mẹ đến xem buổi cuối",c:{},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"các mẹ thấy công thầy",l:{danh:-1},lx:"chỉ vài mẹ đến, lớp vắng, tiếng tăm sứt mẻ",rt:"{v} đến, đứng ở cửa đến hết buổi.",rf:"Không mẹ nào đến."},
  {n:"Tặng mỗi đứa một cây bút",c:{bac:-20},w:{duc:2},wx:"bọn trẻ có vật nhớ thầy",lx:"tốn bạc mua bút",rt:"{n2} cầm bút, khóc."}]},
 c1:{h:"Đại học sĩ đến nhận lớp",w:"emp",t:"Vị Đại học sĩ sắp nhận lớp gửi vào, qua tay thái giám Thượng thư phòng, một tờ hỏi về từng đứa trẻ. Lời ngươi nói hôm nay sẽ theo chúng nhiều năm.",o:[
  {n:"Kể thật từng đứa, cả tật xấu",c:{suc:-2},w:{danh:2},f:"truth",wx:"thầy mới biết dạy",lx:"viết tật từng đứa đến khuya, hao sức; các mẹ sợ tật con bị ghi",rt:"Đại học sĩ chép lời ngươi vào sổ."},
  {n:"Chỉ kể điều tốt",c:{danh:-2},w:{duc:2},wx:"các mẹ vui",lx:"thầy mới không biết tật trò, Đại học sĩ cười, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",3)},rt:"Đại học sĩ cười: “Trò nào cũng giỏi thế sao?”"},
  {n:"Dặn riêng về {n1}",c:{},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"bond",wx:"{n1} có người hiểu nó",l:{danh:-1},lx:"bị nói là thầy thiên vị, tiếng tăm sứt mẻ",rt:"Đại học sĩ gật đầu: “Đứa trẻ cần khen nhiều hơn roi.”",rf:"Đại học sĩ không để tâm."}]},
 c2:{h:"{v} đến lần cuối",w:"v",need:["v"],t:"{v} đến cung ngươi, mang theo {n1}. “Con ta học ngươi mấy năm. Ta chưa nói một lời cảm ơn — hay một lời xin lỗi.”",o:[
  {n:"Nhận lời, rót trà mời nàng",c:{danh:-2},w:{duc:3},wx:"khép lại chuyện cũ",lx:"nhận lời, người ta bảo ngươi quên cũ, tiếng tăm sứt mẻ",go:A=>{rdRel(A,"v",12)},rt:"Hai người ngồi uống trà, {n1} ngủ gục trên đùi thầy."},
  {n:"Nhắc nàng chuyện roi vọt ngày trước",c:{},o:()=>40+S.duc/4,w:{danh:2},sc:1,wx:"{v} hứa không đánh con nữa",l:{danh:-1},lx:"{v} thấy bị trách, bỏ về kể khắp cung, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} cúi đầu: “Ta hứa.”",rf:"{v} đứng dậy: “Ta đến để cảm ơn, không đến để nghe dạy.”"},
  {n:"Từ chối gặp",c:{duc:-1},w:{tamco:1},wx:"giữ khoảng cách",lx:"đóng cửa với người đến xin lỗi, tổn đức; {v} về với lòng giận",go:A=>{rdOan(A,"v",6)},rt:"Cửa cung khép. {n1} đứng ngoài khóc."}]},
 t1:{h:"Bài học cuối",w:"emp",t:"Buổi học cuối, ngươi được chọn một điều để dạy. Bọn trẻ sẽ nhớ điều ấy lâu nhất.",o:[
  {n:"Dạy chữ “Nhân”",c:{danh:-2},w:{duc:3},f:"heart",wx:"bọn trẻ biết thương người",lx:"chữ ấy khó thấy kết quả, người ta bảo thầy dạy chữ suông, tiếng tăm sứt mẻ",rt:"{n1} viết chữ “Nhân” to nhất lớp, treo ở đầu giường."},
  {n:"Dạy chữ “Trung”",c:{danh:-2},w:{sung:2},f:"loyal",wx:"Hoàng thượng hài lòng",lx:"bọn trẻ học vẹt, người ta bảo thầy chiều ý vua, tiếng tăm sứt mẻ",rt:"Hoàng thượng nghe tin, gật đầu."},
  {n:"Dạy bọn trẻ tự chọn một chữ",c:{suc:-2},o:()=>40+S.tai/4,w:{danh:2},sc:1,f:"heart",wx:"mỗi đứa một chữ của riêng nó",l:{danh:-1},lx:"bọn trẻ chọn chữ lạ, người ta bảo thầy thả lỏng, tiếng tăm sứt mẻ",rt:"{n2} chọn chữ “Dũng”, {n1} chọn chữ “Sư” — thầy.",rf:"Bọn trẻ cãi nhau chọn chữ."}]},
 x1:{h:"Lễ bái sư",w:"emp",t:"Lễ chuyển lớp ở Thượng thư phòng. Bọn trẻ lạy thầy mới. Hoàng thượng quay sang ngươi: “Thầy cũ có lời gì dặn lại?”",o:[
  {n:"Dặn: thương trò như thương con",c:{suc:-4},o:A=>35+(A.f.heart?15:0)+S.duc/6,e:["win","lose"],rt:"Cả phòng lặng đi. {n1} quỳ lạy ngươi trước khi lạy thầy mới, các mẹ đều khóc.",rf:"Thầy mới cho là ngươi dạy đời, mặt lạnh tanh."},
  {n:"Dặn: nghiêm thì trò nên người",c:{},o:A=>45+(A.f.truth?10:0)+(A.f.loyal?5:0),e:["win","mid"],lx:"bọn trẻ thấy thầy cũ lạnh",rt:"Hoàng thượng gật đầu: “Lời thầy, trẫm ghi nhớ.”",rf:"Lời dặn trôi qua như thủ tục."},
  {n:"Cúi đầu, không dặn gì",c:{},w:{duc:2},e:"mid",lx:"công năm năm không thành lời",rt:"Ngươi lui ra, bọn trẻ nhìn theo."}]}},
 E:{win:{k:1,tag:"Người thầy được tôn kính",w:"emp",t:"Hoàng thượng ban cho ngươi chữ “Hiền sư”. Các mẹ, kể cả {v}, gửi lễ tạ. Bọn trẻ lớn lên, đứa nào cũng nhớ tên thầy đầu tiên của mình. Ở quê, {dad} treo bản sao chữ ấy giữa trường làng.",fx:{danh:12,sung:4,duc:3},go:A=>{rdRel(A,"v",10);return""}},
  mid:{k:0,tag:"Được tôn mà một mẹ còn hận",t:"Hoàng thượng khen công dạy của ngươi, bọn trẻ nhớ thầy. Chỉ {v} vẫn không quên những năm cũ, và nàng nói với con: “Thầy là thầy, mẹ là mẹ.”",fx:{danh:5,duc:2},go:A=>{rdOan(A,"v",4);return""}},
  lose:{k:-1,tag:"Thôi dạy Thượng thư phòng",t:"Hoàng thượng cho ngươi thôi dạy. Ngươi vẫn giữ ngôi vị trong cung, nhưng Thượng thư phòng không còn ai nhắc tên thầy cũ. {n1} lâu lâu vẫn lén gửi sang một trang chữ.",fx:{danh:-5,sung:-2},go:A=>{rdOan(A,"v",4);return""}}}});
RD97L.push({a:"thd_hoc_11",tag:"Học trò bái ngươi làm thầy trọn đời",w:"emp",p:.1,n:"Xin Hoàng thượng cho {n1} giữ lễ thầy trò với thiếp trọn đời",c:{suc:-4},
 path:["Ra vườn bắt dế","Mời {v} cùng dạy","Mỗi đứa giữ một môn","Để bọn trẻ đối đáp","Thầy chịu lỗi thay trò","Giảng trọn câu","Hứa vẫn dạy nó","Tâu: mỗi đứa một tài","thương trò như thương con"],np:3,bad:["Mua đề","Nhận lễ","Bảo {n2} nhường","Đánh đủ mười thước","Từ chối gặp"],sc:2,x:[()=>S.duc>=45,"Đức từ 45"],
 t:"Hoàng thượng chuẩn. Ở Thượng thư phòng, trước mặt ngài, {n1} dâng trà quỳ lạy ngươi làm thầy trọn đời — một lễ hoàng tự chỉ làm với thầy dạy vỡ lòng. {v} đứng sau, cúi đầu theo con. Từ đó, đứa trẻ ấy lớn lên đi đâu cũng gọi ngươi là “Sư phụ”, và trong triều ai bàn chuyện Đông cung cũng phải nhớ điều ấy.",
 fx:{danh:12,sung:4},go:A=>{rdRel(A,"v",15);return""},rw:"nt_dongchau",ti:"Sư phụ của hoàng tự"});
