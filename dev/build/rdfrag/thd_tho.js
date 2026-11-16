/* ---------- thd_tho · Danh hiệu Tài nữ ---------- */
/* BAL.road keys needed: none (deadlines are event-bound: "trước khi danh sách niêm yết", "trước ngày yết bảng").
   Cast: v = the rival from .4 (carried), {n1} = the Hàn lâm, dad's old student (.4 A.n1 is not carried by jroad: fallback is the role
   "Hàn lâm học trò của cha"; if the lead carries .4's n1 into S.st.f14.n1 the name shows instead). Story-only role: the uncle of {v},
   a Thị độc of the Hàn lâm viện (never named, register as ROAD_MAP §5.4 row). .7 is a normal hồi (no j67 arc calls playArt). */
rdDef("thd_tho",5,{t:"Lời thơ vượt tường cung",w:"emp",sj:"kỳ Xuân thí của Hàn lâm viện",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hàn lâm viện mở kỳ Xuân thí: thơ phi tần sẽ được chọn vào tập Ngự tuyển, bài đứng đầu đặt ở trang thứ nhất. Chú của {v} là Thị độc trong viện, tay nắm danh sách dự thí. Giữ được tên mình trên bảng mà không để ai nắm thóp.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thơ in lén ngoài phố",w:"maid",if:RDW(1),t:"Từ kỳ thi Tài nữ, thơ ngươi được chép truyền khắp kinh thành. Một hiệu sách phố Đông khắc lén thơ ngươi bán lấy lời, đề là “Thơ Tài nữ trong cung”, sai mất mấy chữ.",o:[
  {n:"Xin Hàn lâm viện cấm bản in lén",c:{suc:-2},o:()=>45+S.danh/5,w:{danh:3},sc:1,f:"clean",wx:"thơ ngươi giữ đúng chữ",l:{danh:-2},lx:"người ta bảo Tài nữ tham danh",rt:"Bản khắc bị thu, hiệu sách phải in lại cho đúng.",rf:"Hiệu sách đóng cửa ba ngày rồi lại bán."},
  {n:"Để mặc, chỉ xin ghi tên cha dạy chữ",c:{suc:-2},w:{duc:3,danh:1},wx:"tên thầy đồ quê vang theo thơ con",lx:"thơ in sai chữ cứ thế truyền đi",rt:"Bản in sau có thêm dòng: “Học trò của thầy đồ làng.”"},
  {n:"Bỏ bạc mua lại bản khắc",c:{bac:-40},w:{mat:1},wx:"không ai in thơ ngươi khi chưa hỏi",lx:"tốn bạc, mà bản chép tay vẫn truyền",rt:"Ván khắc gỗ được đem vào cung, cất trong rương."}]},
 s2:{h:"Tài nữ quê",w:"v",if:RDW(0),t:"Sau kỳ thi Tài nữ, trong các buổi thỉnh an người ta vẫn ngâm nhại thơ ngươi. {v} gọi ngươi là “Tài nữ quê”, cả điện cười.",o:[
  {n:"Cười mà nhận cái tên",c:{danh:-2},w:{duc:3},wx:"lời nhại mất vui",lx:"cái tên dính theo ngươi",rt:"Ngươi nâng chén: “Quê thì quê, chữ vẫn là chữ.”"},
  {n:"Đáp một câu thơ",c:{suc:-2},o:()=>35+S.tai/3+(S.arts&&S.arts.thi||0)*5,sc:1,w:{danh:3},wx:"cả điện lặng đi",l:{danh:-3},lx:"thơ vụng thêm, cười thêm",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Câu đáp gọn mà sắc, {v} đỏ mặt.",rf:"Ngươi vấp một chữ, tiếng cười to hơn."},
  {n:"Đóng cửa luyện thơ",c:{suc:-6},w:{tai:3},wx:"thơ sắc hơn",lx:"ngoài kia không ai nói giúp ngươi",rt:"Giấy nháp chất đầy án thư."}]},
 c1:{h:"Danh sách dự thí",w:"v",need:["v"],t:"Chỉ năm phi tần được dự Xuân thí. Danh sách do chú của {v} trình lên, và tên ngươi chưa có. Danh sách sẽ niêm yết sau tuần trăng này.",o:[
  {n:"Dâng thơ lên Hoàng thượng xin dự",c:{suc:-3},o:()=>35+S.sung/3,sc:1,w:{sung:2},wx:"ngài tự ghi tên ngươi",l:{sung:-3},lx:"ngài cho là ngươi tranh danh",rt:"Hoàng thượng phê một chữ bên lề: “Cho.”",rf:"Hoàng thượng bảo việc ấy để Hàn lâm viện lo."},
  {n:"Nhờ {n1} tiến cử",c:{bac:-30},o:()=>45+S.danh/5,w:{danh:1},sc:1,f:"ally",wx:"có người trong viện",lx:"phải lo lễ trước khi danh sách niêm yết",l:{danh:-2},rt:"{n1} trình thêm một tên, chú của {v} không cản được.",rf:"Tờ tiến cử bị gác lại."},
  {n:"Xin Thái hậu cho dự",need:["th"],c:{suc:-2},o:()=>35+(S.th||0)/3,sc:1,w:{th:3},wx:"Thái hậu nhớ đến ngươi",l:{th:-2},lx:"Thái hậu ngại chuyện văn chương",rt:"Thái hậu sai người nói một câu với Hàn lâm viện.",rf:"Thái hậu chỉ cười."}]},
 c2:{h:"{v} biết đề trước",w:"maid",need:["v"],t:"{maid} nghe lỏm: cung nữ của {v} chép đi chép lại những bài vịnh hoa mai. Đề Xuân thí còn niêm phong, mà nàng đã biết.",o:[
  {n:"Báo Hàn lâm viện đổi đề",c:{suc:-2},w:{duc:3},sc:1,f:"clean",wx:"kỳ thi sạch",lx:"{v} biết ai phá việc của nàng",go:A=>{rdOan(A,"v",6)},rt:"Một học sĩ lặng lẽ nhận lời."},
  {n:"Cũng luyện vịnh mai cho chắc",c:{suc:-4},w:{tai:2},f:"know",wx:"không thua thiệt",l:{duc:-2},lx:"biết đề lộ mà im là đồng lõa",rt:"Ngươi viết mười bài vịnh mai."},
  {n:"Lặng im, ghi nhớ",c:{suc:-2},w:{tamco:2},wx:"cầm một lá bài",lx:"đề vẫn lộ",rt:"Ngươi ghi vào sổ riêng ngày giờ nghe được."}]},
 t1:{h:"Thư cha từ quê",w:"maid",t:"Thư cha đến: trò nhỏ trường làng thuộc lòng thơ con, mà mái trường dột, cha không có bạc sửa. Cuối thư cha dặn: “Đừng vì danh mà quên chữ.”",o:[
  {n:"Gửi bạc về sửa trường",c:{bac:-50},w:{duc:3,danh:1},wx:"trường làng có mái mới",lx:"tốn bạc giữa lúc cần lo lễ",rt:"Cha hồi thư, nét chữ run: “Trò nhỏ đọc thơ con dưới mái mới.”"},
  {n:"Gửi thơ mới cho trò làng chép",c:{suc:-2},w:{tai:1,danh:1},wx:"thơ ngươi có người đọc thật lòng",lx:"mái trường vẫn dột",rt:"Cha chép thơ con lên vách lớp."},
  {n:"Xin Hoàng thượng ban chữ cho trường làng",c:{suc:-2},o:()=>35+S.sung/4,sc:1,w:{danh:4},wx:"trường làng có biển ngự ban",l:{sung:-3},lx:"ngài cho là ngươi mượn ân riêng",rt:"Hoàng thượng viết bốn chữ “Hữu giáo vô loại”.",rf:"Hoàng thượng bảo: “Việc nhỏ, để sau.”"}]},
 x1:{h:"Đề Xuân thí",w:"emp",t:"Trước khi danh sách niêm yết, ngươi phải quyết: chuyện đề bị lộ, để yên hay làm lớn.",o:[
  {n:"Tâu Hoàng thượng đề đã lộ",c:{suc:-4},o:A=>35+(A.f.clean?10:0)+S.danh/6,e:["win","lose"],rt:"Hoàng thượng sai đổi đề trong đêm. Tên ngươi đứng thứ năm trên bảng.",rf:"Hoàng thượng hỏi: “Sao nàng biết đề?” Câu hỏi treo lơ lửng."},
  {n:"Nhờ {n1} lặng lẽ xin đổi đề",c:{bac:-20},o:A=>40+(A.f.ally?15:0)+S.tamco/5,e:["win","mid"],rt:"Đề được đổi mà không ai biết vì sao.",rf:"{n1} không dám, đề vẫn giữ nguyên."},
  {n:"Giữ kín, luyện đúng đề ấy",c:{duc:-2},o:A=>45+(A.f.know?10:0),e:["mid","lose"],lx:"ngươi thi trên một đề bẩn",rt:"Ngươi vào thi với mười bài vịnh mai trong đầu.",rf:"Có kẻ đồn chính ngươi mua đề."}]}},
 E:{win:{k:1,tag:"Đề đổi, tên ngươi trên bảng",w:"emp",t:"Đề Xuân thí được đổi thành “Vịnh trúc”. Tên ngươi đứng trên bảng dự thí, và cung {v} có người đập vỡ một chén trà.",fx:{danh:4,tai:1},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Có tên, mà đề còn lộ",t:"Ngươi được dự thi, nhưng biết rằng có kẻ đã đọc đề trước ngươi.",fx:{danh:1}},
  lose:{k:-1,tag:"Bị nghi làm lộ đề",t:"Lời đồn đổi chiều: kẻ biết đề lộ là ngươi, vậy kẻ làm lộ cũng có thể là ngươi. Hàn lâm viện cho người dò cung ngươi.",fx:{danh:-4,sung:-2}}}});

rdDef("thd_tho",6,{t:"Tập nháp bị trộm",w:"maid",sj:"tập thơ nháp của ngươi",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Tập thơ nháp ngươi chép từ thuở ở quê, có cả những câu chưa đưa ai xem, biến mất khỏi án thư. Không có nó, ngươi không chứng được bài nào là của mình. Tìm lại trước kỳ Xuân thí.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đề đổi, có kẻ tức",w:"maid",if:RDW(1),t:"Ba ngày sau khi đề đổi thành “Vịnh trúc”, tập nháp của ngươi biến mất. Trong đó có hai mươi bài vịnh trúc ngươi viết từ hồi ở quê.",o:[
  {n:"Khóa cửa, tra từng người hầu",c:{suc:-3},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"biết ai vào phòng hôm ấy",l:{danh:-2},lx:"người hầu oán ngươi nghi oan",rt:"Một cung nữ mới đổi đến đã xin nghỉ về quê từ hôm qua.",rf:"Ai cũng khai không biết."},
  {n:"Lặng lẽ cho người dò ngoài cung",c:{bac:-20},w:{tamco:2},wx:"kẻ trộm không biết đã bị dò",lx:"chậm hơn",rt:"Người của ngươi ra phố sách ngồi nghe ngóng."},
  {n:"Viết ngay bài mới, mặc tập cũ",c:{suc:-5},w:{tai:3},wx:"thơ mới không ai có",lx:"thơ cũ trôi đi mất",rt:"Ngươi viết thâu đêm."}]},
 s2:{h:"Kẻ gian giấu đồ gian",w:"maid",if:RDW(0),t:"Chuyện đề thi chưa yên thì tập nháp biến mất. Ngoài hành lang có tiếng xì xào: “Mất thật hay tự giấu đi cho khỏi bị khám?”",o:[
  {n:"Báo Cung chính ty bị mất đồ",c:{},o:()=>40+S.danh/4,sc:1,w:{danh:2},wx:"việc mất đồ có sổ ghi",l:{danh:-2},lx:"người ta càng tin ngươi giấu",rt:"Cung chính ty ghi nhận, ngày giờ rõ ràng.",rf:"Quan coi sổ cười khẩy, viết qua loa."},
  {n:"Im lặng tự tìm",c:{suc:-3},w:{tamco:2},wx:"không thêm tiếng xấu",lx:"không ai làm chứng ngươi đã mất",rt:"Ngươi tự lật từng góc cung."},
  {n:"Viết thư hỏi cha có giữ bản chép",c:{suc:-1},w:{duc:2},wx:"cha có thể còn giữ vài bài",lx:"thư đi đường xa",rt:"Cha hồi: vài bài cha còn chép trên vách lớp."}]},
 c1:{h:"Cung nữ lạ mặt",w:"maid",t:"Cung nữ mới do Nội vụ phủ đưa đến đã xin về quê. Người cùng phòng kể: trước khi đi, nàng có một túi bạc nặng.",o:[
  {n:"Cho người đuổi theo trước khi nàng ra khỏi kinh",c:{bac:-30},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"bắt được người lấy",l:{bac:-10},lx:"tốn bạc mà về tay không",f:"chase",rt:"Nàng bị giữ ở trạm ngựa ngoài cửa thành, khai có người trong cung sai.",rf:"Nàng đã đi đường thủy, mất dấu."},
  {n:"Hỏi Nội vụ phủ ai cử nàng",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,w:{tamco:2},wx:"lần ra người cử",l:{danh:-1},lx:"Nội vụ phủ báo lại cho kẻ cử",rt:"Tên người cử là một thái giám hầu ở cung {v}.",rf:"Sổ Nội vụ phủ chỉ ghi “theo lệ”."},
  {n:"Bỏ qua, giữ người cũ cho chặt",c:{suc:-2},w:{duc:2},wx:"cung yên",lx:"kẻ sai khiến không bị động đến",rt:"Ngươi chỉ cho người hầu cũ đứng hầu án thư."}]},
 c2:{h:"Tro giấy ở cung {v}",w:"v",need:["v"],t:"Một cung nữ quét lò ở cung {v} lén mang đến một mẩu giấy cháy dở. Trên đó còn nửa câu thơ, nét chữ của ngươi.",o:[
  {n:"Giữ mẩu giấy làm chứng",c:{bac:-10},w:{tamco:2},sc:1,wx:"có một vật chứng",lx:"nửa câu thơ chưa đủ buộc tội",rt:"Ngươi ép mẩu giấy vào giữa hai trang sách."},
  {n:"Đem mẩu giấy đến hỏi thẳng {v}",c:{},o:()=>35+S.danh/4,sc:1,w:{danh:2},wx:"{v} biết ngươi đã biết",l:{sung:-2},lx:"{v} cười, bảo ngươi tự đốt thơ mình",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"{v} tái mặt, rồi lạnh lùng tiễn khách.",rf:"{v} bảo: “Thơ ngươi đáng đem đốt thật.”"},
  {n:"Trả công người báo tin, dặn nàng im",c:{bac:-20},w:{mat:1},wx:"có tai mắt trong cung {v}",lx:"nàng có thể bán tin hai đầu",rt:"Cung nữ quét lò cúi đầu nhận bạc."}]},
 t1:{h:"Người chép thuê",w:"maid",t:"Người của ngươi ngoài phố tìm thấy một thư sinh nghèo chép thuê. Hắn được thuê chép thơ trong một tập nháp sang giấy cũ, nét chữ khác, đề ngày tháng từ ba năm trước.",o:[
  {n:"Mua lời khai của hắn",c:{bac:-40},o:()=>45+S.tamco/4,sc:1,w:{tamco:2},f:"wit",wx:"có người khai ai thuê",l:{bac:-10},lx:"hắn đòi thêm",rt:"Hắn khai người thuê là gia nhân nhà chú của {v}.",rf:"Hắn nhận bạc rồi trốn."},
  {n:"Nhờ {n1} giữ hắn lại",c:{suc:-2},o:()=>40+S.danh/5,w:{tamco:1},sc:1,f:"ally",wx:"có Hàn lâm làm chứng",l:{danh:-2},lx:"{n1} bị kéo vào vòng",rt:"{n1} giữ hắn làm người chép sách trong viện.",rf:"{n1} ngại, không dám nhận."},
  {n:"Để hắn đi, chỉ ghi lại tên",c:{suc:-2},w:{duc:1},wx:"không dây dưa",lx:"bản chép đề ngày giả vẫn còn đâu đó",rt:"Ngươi chép tên hắn vào sổ riêng."}]},
 x1:{h:"Lấy lại tập nháp",w:"v",t:"Tập nháp đang ở đâu đó trong cung {v}. Trước kỳ Xuân thí, ngươi chỉ còn một nước để đi.",o:[
  {n:"Xin Cung chính ty khám cung {v}",c:{suc:-5},o:A=>35+(A.f.chase?10:0)+S.danh/6,e:["win","lose"],rt:"Tập nháp được tìm thấy dưới đáy rương đồ của một cung nữ bên {v}.",rf:"Khám không ra gì. {v} khóc trước Hoàng hậu vì bị làm nhục."},
  {n:"Bỏ bạc chuộc lại qua tay người chép",c:{bac:-60},o:A=>40+(A.f.wit?15:0)+S.tamco/5,e:["win","mid"],rt:"Tập nháp về tay, gói trong vải dầu.",rf:"Chỉ chuộc được nửa tập, nửa kia đã chép xong."},
  {n:"Viết lại từ trí nhớ, mặc nó",c:{suc:-4},w:{tai:2},e:"mid",lx:"thơ cũ của ngươi nằm trong tay kẻ khác",rt:"Ngươi viết lại được mười hai bài."}]}},
 E:{win:{k:1,tag:"Tập nháp về tay",w:"maid",t:"Tập nháp về lại án thư ngươi, từng trang còn nguyên. Nhưng ngươi biết: kẻ lấy đã có đủ thời gian để chép.",fx:{danh:3,tai:1},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Viết lại từ trí nhớ",t:"Ngươi có lại một phần thơ, phần kia trôi đi đâu không biết.",fx:{tai:1}},
  lose:{k:-1,tag:"Tập nháp nằm trong tay {v}",t:"Khám không ra. {v} được Hoàng hậu an ủi, còn ngươi bị nhắc nhở. Thơ ngươi giờ nằm trong tay người ghét ngươi nhất.",fx:{danh:-4,hh:-3},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",7,{t:"Vòng thi Ngự hoa viên",w:"emp",sj:"vòng thi Xuân thí",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Xuân thí mở ở Ngự hoa viên. Hoàng thượng ngồi trên, Hàn lâm viện chấm thơ dưới, một nén hương cho một bài. {v} ngồi cách ngươi ba chỗ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Bước vào vườn",w:"emp",if:RDW(1),t:"Tập nháp đã về tay, ngươi bước vào vườn lòng nhẹ. {v} nhìn ngươi, mắt không chớp.",o:[
  {n:"Chào {v} trước mặt mọi người",c:{},o:()=>40+S.duc/4,sc:1,w:{danh:2},wx:"cả vườn thấy ngươi rộng lượng",l:{danh:-1},lx:"{v} không đáp, ngươi mất mặt",go:(A,ok)=>{rdRel(A,"v",ok?5:-3)},rt:"{v} buộc phải đáp lễ.",rf:"{v} quay đi như không thấy."},
  {n:"Ngồi yên, nhắm mắt định thần",c:{danh:-2},w:{tai:2},wx:"lòng tĩnh",lx:"người ta bảo ngươi kiêu",rt:"Tiếng chim trong vườn rõ dần."},
  {n:"Dâng Thái hậu một chén trà",need:["th"],c:{suc:-2},o:()=>40+(S.th||0)/4,sc:1,w:{th:3},wx:"Thái hậu nhớ mặt ngươi",l:{th:-2},lx:"chen lấn trước giờ thi",rt:"Thái hậu gật đầu.",rf:"Thái hậu chỉ nhấp môi."}]},
 s2:{h:"Thơ mình trong tay người",w:"emp",if:RDW(0),t:"Ngươi biết có bài thơ của mình đang nằm trong tay kẻ khác. Mỗi câu ngươi định viết, có thể đã có người viết trước bằng chính lời ngươi.",o:[
  {n:"Bỏ hết thơ cũ, chỉ viết điều mới",c:{suc:-4},w:{tai:3},f:"new",wx:"không ai chép được ý mới",lx:"không có bài nào luyện sẵn",rt:"Ngươi gạt hết những câu quen trong đầu."},
  {n:"Viết bài cũ hay nhất, mặc ai chép",c:{suc:-2},w:{duc:2},f:"old",wx:"thơ của mình thì mình viết",lx:"có thể đụng bài của kẻ khác",rt:"Ngươi nhớ lại từng chữ."},
  {n:"Báo trước với {n1}",c:{suc:-2},o:()=>40+S.danh/5,w:{tamco:1},sc:1,f:"ally",wx:"giám khảo biết mà đề phòng",l:{danh:-2},lx:"lời báo lọt ra thành lời gièm",rt:"{n1} gật nhẹ.",rf:"Có người nghe thấy, bảo ngươi đi đêm giám khảo."}]},
 c1:{h:"{v} ngâm một bài quen",w:"v",need:["v"],if:()=>rdPrev()!=="win",t:"Hương mới cháy nửa, {v} đã nộp bài. Học sĩ đọc to: từng câu là câu trong tập nháp của ngươi, chỉ đổi vài chữ.",o:[
  {n:"Đứng dậy nói đó là thơ của ngươi",c:{suc:-3},o:()=>30+S.danh/4+S.tai/5,sc:1,w:{danh:3},wx:"lời ngươi được ghi vào biên bản",l:{danh:-4},lx:"bị cho là làm loạn vườn thi",go:A=>{rdOan(A,"v",8)},rt:"Chưởng viện cho ghi lại, giữ bài {v} riêng.",rf:"Thái hậu cau mày: “Không có chứng thì im.”"},
  {n:"Ngồi yên, viết bài khác hay hơn",c:{suc:-4},w:{tai:2},wx:"thắng bằng chữ, không bằng lời",lx:"bài của {v} được chấm như thường",rt:"Ngươi cắn môi, cầm bút lại."},
  {n:"Ghi lại từng chữ nàng đổi",c:{danh:-2},w:{tamco:2},wx:"có chứng về sau",lx:"hôm nay không ai biết",rt:"Ngươi chép vào tay áo những chữ nàng sửa."}]},
 c2:{h:"Nghiên mực bị tráo",w:"maid",t:"Nghiên mực trên án của ngươi bị pha nước, mực loang như khóc. Còn non nửa nén hương.",o:[
  {n:"Xin đổi nghiên",c:{suc:-2},o:()=>45+S.danh/5,sc:1,w:{danh:1},wx:"có nghiên mới",l:{suc:-2},lx:"mất thời gian quý",rt:"Thái giám mang nghiên mới đến ngay.",rf:"Nghiên mới đến khi hương sắp tàn."},
  {n:"Viết bằng mực loãng, chữ nhỏ lại",c:{suc:-3},w:{tai:2},wx:"chữ nhỏ mà thanh",lx:"giám khảo khó đọc",rt:"Nét chữ mảnh như lá trúc."},
  {n:"Mượn nghiên của {v}",c:{},o:()=>35+S.tamco/4,sc:1,w:{tamco:2},wx:"cả vườn thấy {v} có tật",l:{danh:-2},lx:"{v} từ chối giữa vườn",go:(A,ok)=>{rdOan(A,"v",ok?6:3)},rt:"{v} không dám từ, mặt tái mét.",rf:"{v} bảo nghiên nàng vừa cạn."}]},
 c3:{h:"Thái hậu hỏi quê",w:"th",need:["th"],t:"Thái hậu hỏi ngươi giữa giờ thi: “Thầy đồ dạy con thơ gì đầu tiên?”",o:[
  {n:"Kể thật bài thơ đầu cha dạy",c:{danh:-2},w:{th:3,duc:2},wx:"Thái hậu cảm động",lx:"lộ cái nghèo trước cả vườn",rt:"Thái hậu khẽ đọc theo câu ngươi kể."},
  {n:"Đọc một câu kinh điển cho trang trọng",c:{},o:()=>45+S.tai/4,sc:1,w:{danh:2},wx:"cả vườn nể học vấn",l:{th:-2},lx:"Thái hậu thấy ngươi giấu quê",rt:"Học sĩ Hàn lâm gật gù.",rf:"Thái hậu nói: “Ta hỏi thơ của cha con kia mà.”"},
  {n:"Xin Thái hậu cho viết xong rồi thưa",c:{th:-2},w:{tai:1},wx:"không phân tâm",lx:"Thái hậu thấy ngươi khô",rt:"Thái hậu phẩy tay cho viết tiếp."}]},
 t1:{h:"{n1} trong hàng giám khảo",w:"emp",t:"{n1} ngồi trong hàng giám khảo. Ánh mắt y lướt qua ngươi một lần rồi thôi. Chú của {v} ngồi ngay bên cạnh y.",o:[
  {n:"Không nhìn {n1} lấy một lần",c:{suc:-2},w:{duc:3},wx:"không ai nói được ngươi đi đêm",lx:"y không biết ngươi cần gì",rt:"Ngươi cúi xuống trang giấy."},
  {n:"Ra hiệu nhờ y để mắt bài {v}",c:{duc:-2},o:()=>40+S.tamco/4,sc:1,w:{tamco:2},f:"sign",wx:"y đọc kỹ bài {v}",l:{danh:-3},lx:"chú của {v} thấy",rt:"{n1} giữ bài {v} lâu hơn mọi bài.",rf:"Chú của {v} hừ một tiếng."},
  {n:"Xin Hoàng thượng cho chấm tên che",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:3},f:"blind",wx:"bài nào cũng che tên",l:{sung:-3},lx:"ngài thấy ngươi lắm chuyện",rt:"Hoàng thượng cười: “Ý hay.” Bài nào cũng dán giấy che tên.",rf:"Hoàng thượng bảo Hàn lâm viện có phép của Hàn lâm viện."}]},
 x1:{h:"Nén hương cuối",w:"emp",t:"Hương còn một đốt tay. Bài của ngươi phải nộp lên án.",o:[
  {n:"Viết về tuyết trên mái trường làng",c:{suc:-5},o:A=>30+S.tai/4+(S.arts&&S.arts.thi||0)*4+(A.f.new?8:0),e:["win","mid"],rt:"Hoàng thượng đọc xong, đặt bài ngươi lên trên cùng.",rf:"Bài hay, nhưng Hàn lâm viện chê lời quê."},
  {n:"Viết theo lối cung đình cho chắc",c:{suc:-4},o:A=>40+S.tai/5+(A.f.blind?10:0),e:["mid","lose"],lx:"chắc mà nhạt",rt:"Bài ngươi đứng ngang bài {v}.",rf:"Bài ngươi chìm giữa những bài giống nhau."},
  {n:"Viết một bài đáp thẳng bài {v}",c:{suc:-5,duc:-2},o:A=>30+(A.f.sign?10:0)+S.tamco/5,e:["win","lose"],rt:"Cả vườn nhận ra bài {v} chỉ là cái bóng của bài ngươi.",rf:"Hoàng thượng thấy ngươi đem thơ ra đấu khẩu."}]}},
 E:{win:{k:1,tag:"Đứng đầu vòng thi",w:"emp",t:"Bài ngươi đứng đầu vòng Xuân thí. Hoàng thượng cho chép lại treo ở Ngự thư phòng. {v} rời vườn trước khi tan.",fx:{danh:6,sung:3,tai:1},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Đồng hạng với {v}",t:"Bài ngươi và bài {v} cùng hạng. Hàn lâm viện hẹn chấm lại khi yết bảng.",fx:{danh:2}},
  lose:{k:-1,tag:"{v} đứng đầu",t:"{v} đứng đầu vòng Xuân thí, bằng những câu ngươi biết rõ là của mình.",fx:{danh:-3},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",8,{t:"Lời vu đạo thơ",w:"v",sj:"lời tố ngươi đạo thơ",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Chú của {v} dâng tờ trình lên Hàn lâm viện: thơ ngươi dự thi chép từ một tập thơ có trước, chứng là những trang chép tay đề ngày từ ba năm trước. Bảng Xuân thí tạm hoãn. Đạo thơ là tội làm ô danh cả viện.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Mực chưa ráo",w:"v",if:RDW(1),t:"Bài thơ đứng đầu của ngươi treo ở Ngự thư phòng chưa đầy mười ngày thì bị gỡ xuống, chờ xét.",o:[
  {n:"Xin vào gặp Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{sung:3},wx:"ngài nghe ngươi trước",l:{sung:-3},lx:"ngài bảo chờ viện xét",rt:"Hoàng thượng nói: “Trẫm đọc thơ nàng, trẫm biết. Nhưng phải có chứng.”",rf:"Thái giám nói ngài đang bận."},
  {n:"Bình thản chờ xét",c:{danh:-2},w:{duc:3},wx:"không tỏ ra hoảng",lx:"lời đồn chạy trước",rt:"Ngươi vẫn thỉnh an như mọi ngày."},
  {n:"Cho người dò tờ trình",c:{bac:-20},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"biết chứng của họ là gì",l:{danh:-1},lx:"bị nói là đi dò quan",rt:"Tờ trình kèm mười hai trang giấy ngả vàng.",rf:"Người dò bị đuổi khỏi cửa viện."}]},
 s2:{h:"Kẻ trộm tố người mất",w:"v",if:RDW(0),t:"{v} được chấm ngang ngươi, hoặc hơn ngươi, bằng chính những câu thơ của ngươi. Nay nàng còn tố ngươi chép thơ nàng, lấy chính tập nháp bị trộm làm chứng.",o:[
  {n:"Nói thẳng với Hoàng hậu",need:["hh"],c:{suc:-2},o:()=>35+(S.hh||0)/4,sc:1,w:{hh:2},wx:"Hoàng hậu nghe một phía khác",l:{hh:-3},lx:"Hoàng hậu thấy hai cung cãi nhau",rt:"Hoàng hậu bảo sẽ không để Hàn lâm viện xử vội.",rf:"Hoàng hậu bảo việc văn chương đừng đem vào Trung cung."},
  {n:"Nuốt giận, gom chứng",c:{danh:-2},w:{tamco:2},wx:"lòng lạnh lại",lx:"mấy ngày đầu không ai bênh ngươi",rt:"Ngươi ngồi soạn lại mọi giấy tờ."},
  {n:"Gửi thư về hỏi cha",c:{suc:-1},w:{duc:2},wx:"cha có thể nhớ những câu con viết xưa",lx:"thư đi đường xa",rt:"Thư đi trong đêm."}]},
 c1:{h:"Mười hai trang giấy vàng",w:"maid",t:"Ngươi được cho xem những trang chứng: giấy ngả vàng, ngày tháng từ ba năm trước, nét chữ lạ. Có điều giấy thơm mùi hồ mới.",o:[
  {n:"Xin Hàn lâm viện thử giấy",c:{suc:-2},o:()=>40+S.tai/4,sc:1,w:{danh:3},f:"paper",wx:"giấy bị nghi là mới hun khói",l:{danh:-2},lx:"viện chưa chịu thử",rt:"Học sĩ già bẻ một góc giấy: lõi trắng.",rf:"Viện bảo giấy cũ hay mới không chứng được gì."},
  {n:"Ghi nhớ, chưa nói",c:{danh:-2},w:{tamco:2},f:"paper",wx:"giữ lá bài cho buổi xét",lx:"lời đồn vẫn chạy",rt:"Ngươi nhớ kỹ mùi hồ."},
  {n:"Nói đây là giấy giả",c:{},o:()=>30+S.danh/4,sc:1,w:{danh:2},wx:"lời ngươi được ghi",l:{danh:-3},lx:"không chứng thì thành vu ngược",go:A=>{rdOan(A,"v",4)},rt:"Chưởng viện cho ghi lại.",rf:"Chú của {v} cười: “Kẻ đạo thơ nào cũng nói vậy.”"}]},
 c2:{h:"Thầy đồ viết thay",w:"v",need:["v"],t:"Lời đồn mới trong cung: thơ ngươi là do cha ngươi, một thầy đồ quê, viết thay gửi vào. “Con gái thầy đồ thì có gì ngoài chữ của cha?”",o:[
  {n:"Ứng tác trước buổi thỉnh an",c:{suc:-3},o:()=>30+S.tai/3+(S.arts&&S.arts.thi||0)*5,sc:1,w:{danh:4},wx:"miệng đời im",l:{danh:-3},lx:"thơ vụng thì lời đồn thêm chắc",rt:"Cả điện lặng đi khi ngươi ngừng bút.",rf:"Bài thơ gượng ép, có người bật cười."},
  {n:"Đáp: chữ của cha, lòng của con",c:{danh:-2},w:{duc:3},wx:"người ta thấy ngươi hiếu",lx:"chưa rửa được tiếng",rt:"Có người gật gù."},
  {n:"Tìm ra ai tung tin",c:{bac:-20},o:()=>45+S.mat*5,sc:1,w:{mat:1},wx:"lần đến cung {v}",l:{danh:-1},lx:"đuổi theo lời đồn chỉ thêm ồn",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Lời đồn đi ra từ một ma ma bên {v}.",rf:"Lời đồn không có gốc."}]},
 c3:{h:"{n1} bị gọi hỏi",w:"emp",t:"Hàn lâm viện gọi {n1} hỏi: y là học trò của cha ngươi, liệu y có thiên vị khi chấm. Y có thể rút khỏi việc xét.",o:[
  {n:"Khuyên y rút ra cho trong sạch",c:{suc:-2},w:{duc:3},wx:"việc xét không ai bắt bẻ",lx:"mất người hiểu thơ ngươi trong viện",rt:"{n1} xin rút."},
  {n:"Xin y ở lại làm chứng",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"ally",wx:"có người trong viện đứng về phía ngươi",l:{danh:-3},lx:"bị cho là kéo bè",rt:"{n1} đứng ra: “Ta từng thấy nàng viết bài ấy từ hồi còn ở trường làng.”",rf:"Chưởng viện gạt lời {n1} vì là người nhà."},
  {n:"Không nói gì với y",c:{suc:-2},w:{tamco:1},wx:"y tự quyết",lx:"y không biết ngươi cần gì",rt:"{n1} im lặng ngồi lại."}]},
 t1:{h:"Buổi hỏi ở Hàn lâm viện",w:"emp",t:"Chưởng viện Hàn lâm hỏi ngươi qua rèm: “Bài thơ này nàng viết khi nào, ở đâu, bên cạnh có ai?”",o:[
  {n:"Kể thật từng chi tiết",c:{suc:-2},w:{duc:3},sc:1,f:"truth",wx:"lời khai khớp từ đầu đến cuối",lx:"có chi tiết không ai làm chứng được",rt:"Ngươi kể cả tiếng mưa trên mái trường đêm ấy."},
  {n:"Chỉ đáp điều chứng được",c:{suc:-2},w:{tamco:2},wx:"không sơ hở",lx:"nghe như giấu",rt:"Chưởng viện gật đầu chậm."},
  {n:"Hỏi ngược lại về giấy chứng",c:{suc:-2},o:()=>35+S.tamco/3,sc:1,w:{tamco:2},wx:"viện phải xét cả hai bên",l:{danh:-3},lx:"bị cho là hỗn",rt:"Chưởng viện ghi: “Giấy chứng cần thử.”",rf:"Chưởng viện gõ án: “Nàng là người bị hỏi.”"}]},
 x1:{h:"Trước mặt Chưởng viện",w:"v",t:"Buổi xét đầu. Chú của {v} đứng bên trái, ngươi ngồi sau rèm bên phải. Chưởng viện chờ ngươi nói.",o:[
  {n:"Xin so nét chữ và thử giấy",c:{suc:-4},o:A=>35+(A.f.paper?12:0),e:["win","lose"],rt:"Giấy chứng lõi trắng, nét chữ chép vụng. Tờ trình lung lay.",rf:"Viện bảo giấy cũ hay mới không làm chứng được."},
  {n:"Tố ngược {v} lấy trộm tập nháp",c:{suc:-5},o:A=>30+S.mat*4,e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Chưởng viện cho tra cả cung {v}.",rf:"Không có chứng, lời tố ngược thành lời vu."},
  {n:"Xin hoãn để gom chứng",c:{},w:{duc:2},e:"mid",lx:"tên ngươi vẫn bị treo",rt:"Viện cho hoãn đến trước ngày yết bảng."}]}},
 E:{win:{k:1,tag:"Lời vu lung lay",w:"emp",t:"Tờ trình của chú {v} có chỗ hở. Viện chưa xử, nhưng ai cũng thấy cán cân đã lệch về phía ngươi.",fx:{danh:4},go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Cả hai bên cùng bị xét",t:"Viện treo việc lại. Thơ ngươi và thơ {v} cùng nằm trên án chờ chứng.",fx:{danh:-1}},
  lose:{k:-1,tag:"Tên ngươi bị gạch tạm",t:"Tên ngươi bị gạch khỏi bảng chờ xét. Trong cung, người ta gọi ngươi là “Tài nữ chép thơ”.",fx:{danh:-6,sung:-2}}}});

rdDef("thd_tho",9,{t:"Chứng minh",w:"emp",sj:"chứng cứ thơ là của ngươi",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hàn lâm viện cho ngươi đến trước ngày yết bảng để đưa chứng. Giấy quê, thư cha, lời {n1}, và chính ngòi bút của ngươi. Mỗi chứng tốn một thứ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cán cân lệch",w:"emp",if:RDW(1),t:"Viện đã thấy chỗ hở của tờ trình. Chú của {v} vội tìm thêm chứng mới, còn ngươi cần chứng nào đủ để đóng việc lại.",o:[
  {n:"Đóng cửa soạn bản tường trình",c:{suc:-4},w:{tai:2},wx:"lời lẽ chặt chẽ",lx:"không đi gặp ai",rt:"Bản tường trình dài mười trang."},
  {n:"Mời học sĩ già thử giấy đến cung",c:{bac:-30},o:()=>45+S.danh/5,sc:1,w:{danh:2},f:"paper",wx:"có người am giấy đứng về phía ngươi",l:{danh:-1},lx:"bị nói là mua người",rt:"Học sĩ già hứa ra làm chứng.",rf:"Học sĩ già cáo bệnh."},
  {n:"Dặn người hầu giữ miệng",c:{danh:-2},w:{mat:1},wx:"không ai bắt được lời",lx:"cung ngươi lạnh như băng",rt:"Cửa cung khép lại."}]},
 s2:{h:"Tên đang bị gạch",w:"emp",if:RDW(0),t:"Tên ngươi còn treo trên bảng chờ. Người đến thỉnh an thưa dần.",o:[
  {n:"Vẫn thỉnh an Hoàng hậu mỗi sáng",need:["hh"],c:{suc:-2},w:{hh:2,duc:2},wx:"không ai nói ngươi trốn",lx:"phải nghe lời xì xào",rt:"Hoàng hậu nhìn ngươi lâu hơn thường lệ."},
  {n:"Xin Hoàng thượng một buổi đối thơ",c:{suc:-3},o:()=>35+S.sung/3,sc:1,w:{sung:3},f:"duel",wx:"ngài thấy tài thật",l:{sung:-3},lx:"ngài bảo đang có án",rt:"Ngài hẹn sau ngày xét.",rf:"Ngài từ chối."},
  {n:"Cắn răng gom chứng",c:{suc:-2},w:{tamco:2},wx:"lòng lạnh",lx:"một mình",rt:"Ngươi xếp từng tờ thư cũ."}]},
 c1:{h:"Giấy dó làng",w:"maid",t:"Tập nháp ngươi viết trên giấy dó của lò giấy làng. Lò giấy ấy đóng dấu nước riêng. Gửi người về làng lấy sổ lò giấy, phải về trước ngày yết bảng.",o:[
  {n:"Thuê ngựa trạm về làng",c:{bac:-50},o:()=>50+S.mat*4,sc:1,w:{tamco:2},f:"dzo",wx:"có sổ lò giấy ghi năm bán",l:{bac:-10},lx:"ngựa về muộn",rt:"Sổ lò giấy về kịp, ghi rõ năm cha mua giấy cho con.",rf:"Ngựa về khi bảng đã sắp yết."},
  {n:"Nhờ {n1} xin công văn gọi sổ",c:{suc:-2},o:()=>40+S.danh/5,w:{tamco:1},sc:1,f:"ally",wx:"sổ về bằng đường quan",l:{danh:-2},lx:"chú của {v} biết trước",rt:"Công văn đi bằng ngựa trạm của viện.",rf:"Chú của {v} giữ công văn lại."},
  {n:"Tự đối chiếu dấu nước",c:{suc:-4},o:()=>35+S.tai/3,sc:1,w:{tai:1},f:"dzo",wx:"chỉ ra dấu nước trên từng trang",l:{suc:-2},lx:"mắt mỏi mà không chắc",rt:"Trang nào của ngươi cũng có dấu nước lò làng.",rf:"Dấu nước mờ, khó chỉ."}]},
 c2:{h:"Thư cha xưa",w:"maid",t:"Cha giữ mọi thư con gửi từ ngày con vào cung. Có bức chép nguyên hai câu đầu bài thơ bị tố, kèm ngày tháng.",o:[
  {n:"Xin cha gửi thư lên",c:{bac:-20},o:()=>50+S.duc/5,sc:1,w:{duc:2},f:"letter",wx:"có chứng ngày tháng",l:{duc:-1},lx:"thư riêng của cha con đem ra trước viện",rt:"Thư cha về, giấy mỏng, chữ rõ.",rf:"Thư cha bị ướt mưa dọc đường."},
  {n:"Không đem thư nhà ra viện",c:{suc:-2},w:{duc:3},wx:"giữ chuyện nhà",lx:"mất một chứng",rt:"Ngươi để thư cha ở yên."},
  {n:"Xin cha tự lên kinh làm chứng",c:{bac:-40},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"dad",wx:"thầy đồ quê đứng trước Hàn lâm viện",l:{danh:-2},lx:"cha già đi đường xa",rt:"Cha lên đường ngay, đi bộ nửa chặng.",rf:"Cha ốm dọc đường, không đến kịp."}]},
 t1:{h:"{v} gửi lời",w:"v",need:["v"],t:"Đêm trước buổi xét, {v} sai người đến: nếu ngươi rút đơn tố nàng trộm tập nháp, nàng sẽ bảo chú rút tờ trình.",o:[
  {n:"Nhận lời, hai bên cùng rút",c:{},o:()=>45+S.tamco/4,sc:1,w:{duc:2},f:"deal",wx:"tên ngươi được trả lại bảng",l:{danh:-3},lx:"không ai biết thơ là của ai",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} giữ lời.",rf:"{v} nhận lời rồi nuốt lời."},
  {n:"Từ chối, xét đến cùng",c:{suc:-2},w:{tamco:2},sc:1,f:"firm",wx:"không ai mặc cả được thơ ngươi",lx:"{v} càng hận",go:A=>{rdOan(A,"v",8)},rt:"Ngươi trả lời: “Thơ không đem đổi.”"},
  {n:"Đem lời đề nghị lên viện",c:{suc:-2},o:()=>40+S.danh/4,sc:1,w:{danh:3},wx:"lời mặc cả thành chứng",l:{danh:-2},lx:"người đưa tin chối",go:A=>{rdOan(A,"v",10)},rt:"Chưởng viện ghi lời đề nghị vào hồ sơ.",rf:"Người đưa tin khai là tự ý."}]},
 x1:{h:"Ứng tác trước ngai",w:"emp",t:"Hoàng thượng thân đến buổi xét. Ngài ra đề ngay tại chỗ: “Thơ bị nghi, ai viết thì viết tiếp được. Nàng viết tiếp bốn câu.”",o:[
  {n:"Viết tiếp bằng giọng của bài cũ",c:{suc:-5},o:A=>30+S.tai/4+(S.arts&&S.arts.thi||0)*4+(A.f.dzo?6:0)+(A.f.letter?6:0),e:["win","lose"],rt:"Bốn câu nối liền mạch như cùng một hơi. Hoàng thượng gật đầu.",rf:"Bốn câu hay, nhưng khác giọng bài cũ."},
  {n:"Dâng chứng giấy và thư, xin không phải thử",c:{suc:-3},o:A=>40+(A.f.dzo?12:0)+(A.f.letter?10:0)+(A.f.dad?8:0),e:["win","mid"],rt:"Chứng đủ, Hoàng thượng phẩy tay: “Khỏi thử.”",rf:"Chứng có, nhưng ngài vẫn muốn nghe thơ."},
  {n:"Xin cả {v} cùng viết tiếp",c:{suc:-4},o:A=>35+S.tamco/5,e:["win","lose"],go:A=>{rdOan(A,"v",8)},rt:"{v} cầm bút run, không viết nổi một câu.",rf:"{v} viết được, dù vụng. Hai bên ngang nhau."}]}},
 E:{win:{k:1,tag:"Thơ là của ngươi",w:"emp",t:"Viện công nhận thơ là của ngươi. Tờ trình của chú {v} bị trả về, kèm một dòng phê đỏ.",fx:{danh:6,sung:2},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Chứng có, lòng người còn ngờ",t:"Viện thôi xét, tên ngươi về lại bảng. Nhưng trong cung vẫn có người nhếch môi khi nghe tên ngươi.",fx:{danh:1}},
  lose:{k:-1,tag:"Không chứng được",t:"Chứng không đủ. Viện để tên ngươi treo đến ngày yết bảng, và Hoàng thượng rời buổi xét không nói một lời.",fx:{danh:-4,sung:-3}}}});

rdDef("thd_tho",10,{t:"Ngày yết bảng",w:"emp",sj:"bảng Xuân thí",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Bảng Xuân thí sắp dán ở cửa Hàn lâm viện. Ai đứng đầu tập Ngự tuyển, ai bị gạch tên, ai bị phạt vì vu cáo: tất cả quyết trong mấy ngày này.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phe {v} rạn",w:"v",if:RDW(1),t:"Sau dòng phê đỏ, chú của {v} xin cáo bệnh. {v} không ra khỏi cung ba ngày.",o:[
  {n:"Gửi thuốc thăm chú của {v}",c:{bac:-20},o:()=>40+S.duc/4,sc:1,w:{duc:3},wx:"cả viện thấy ngươi không thù dai",l:{danh:-1},lx:"bị cho là đắc ý",go:(A,ok)=>{rdRel(A,"v",ok?6:-2)},rt:"Phủ y nhận thuốc, không hồi đáp.",rf:"Thuốc bị trả lại nguyên gói."},
  {n:"Đòi viện xử tội vu cáo",c:{suc:-3},o:()=>40+S.danh/4,sc:1,w:{danh:3},f:"hard",wx:"lời vu phải có giá",l:{duc:-2},lx:"người ta bảo ngươi đánh kẻ ngã",go:A=>{rdOan(A,"v",8)},rt:"Viện hứa xét cùng ngày yết bảng.",rf:"Viện bảo chuyện ấy để sau."},
  {n:"Lặng im chờ bảng",c:{suc:-2},w:{duc:2},wx:"giữ thể diện",lx:"phe {v} có thời gian gượng dậy",rt:"Ngươi đóng cửa chép kinh."}]},
 s2:{h:"Bảng chờ, tên treo",w:"v",if:RDW(0),t:"Chú của {v} hối viện yết bảng sớm, trước khi ngươi kịp đưa thêm chứng.",o:[
  {n:"Xin hoãn yết bảng",c:{suc:-3},o:()=>35+S.sung/4,sc:1,w:{danh:1},wx:"thêm thời gian",l:{sung:-3},lx:"ngài thấy ngươi níu kéo",rt:"Hoàng thượng cho hoãn năm ngày.",rf:"Ngài bảo: “Đủ rồi.”"},
  {n:"Gửi tập nháp gốc cho viện giữ",c:{suc:-2},w:{duc:2},wx:"chứng nằm ở nơi công",lx:"tập nháp rời tay ngươi",rt:"Tập nháp được niêm trong hòm viện."},
  {n:"Viết thư xin lỗi {v} cho yên",c:{duc:-2},o:()=>40+S.tamco/4,sc:1,w:{sung:1},wx:"{v} nhẹ tay",l:{danh:-3},lx:"thư thành chứng ngươi nhận tội",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} không nhắc thêm.",rf:"{v} đem thư khoe khắp cung."}]},
 c1:{h:"Sổ điểm bị sửa",w:"emp",t:"{n1} lén báo: sổ điểm Xuân thí có chỗ cạo sửa. Điểm của ngươi bị hạ một bậc, điểm của {v} được nâng.",o:[
  {n:"Xin Hoàng thượng cho chấm lại công khai",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:4},f:"open",wx:"sổ điểm được chấm lại trước mặt mọi người",l:{sung:-3},lx:"ngài phiền vì viện lục đục",rt:"Chấm lại, điểm ngươi về như cũ.",rf:"Ngài bảo viện tự lo."},
  {n:"Giữ bản sao sổ điểm",c:{bac:-30},w:{tamco:2},wx:"cầm chứng gian lận trong tay",lx:"{n1} chịu tiếng chép trộm sổ",rt:"{n1} chép cho ngươi một bản."},
  {n:"Để {n1} tự tâu",c:{},o:()=>40+S.danh/5,w:{danh:2},sc:1,f:"ally",wx:"người ngoài cung lên tiếng",l:{danh:-2},lx:"{n1} bị trù dập",rt:"{n1} dâng sớ, chú của {v} bị gọi hỏi.",rf:"{n1} bị điều đi chép sử ở phủ xa."}]},
 c2:{h:"{v} đến cửa",w:"v",need:["v"],t:"{v} đến cung ngươi một mình, không mang cung nữ. Nàng nói chú nàng ép nàng làm, nàng chỉ muốn yên thân.",o:[
  {n:"Tin nàng, cho nàng một lối lui",c:{},o:()=>40+S.duc/4,sc:1,w:{duc:3},f:"mercy",wx:"có thể bớt một kẻ thù",l:{danh:-2},lx:"có thể bị lừa lần nữa",go:(A,ok)=>{rdRel(A,"v",ok?15:-6)},rt:"{v} cúi đầu thật sâu.",rf:"{v} ra về, kể khác đi với Hoàng hậu."},
  {n:"Bắt nàng viết lời khai",c:{suc:-3},o:()=>40+S.tamco/4,sc:1,w:{tamco:3},wx:"có lời khai của chính {v}",l:{danh:-2},lx:"nàng hận ngươi suốt đời",go:A=>{rdOan(A,"v",10)},rt:"{v} run tay viết, ký tên.",rf:"{v} xé giấy, bỏ đi."},
  {n:"Không tiếp",c:{suc:-2},w:{mat:1},wx:"không sa bẫy",lx:"nàng ra về trắng tay, càng cùng đường",go:A=>{rdOan(A,"v",4)},rt:"Cửa cung không mở."}]},
 t1:{h:"Cha lên kinh",w:"maid",t:"Tin báo: cha ngươi đã lên kinh, trọ ở một quán trọ gần cửa Hàn lâm viện, nói chỉ muốn tận mắt thấy bảng.",o:[
  {n:"Gửi bạc lo chỗ trọ cho cha",c:{bac:-30},w:{duc:3},wx:"cha có chỗ ở tử tế",lx:"tốn bạc",rt:"Cha nhận, gửi lại một bài thơ ngắn."},
  {n:"Xin cho cha vào xem lễ yết bảng",c:{suc:-3},o:()=>35+S.danh/4,sc:1,w:{danh:3},f:"dadin",wx:"thầy đồ quê đứng trước cửa Hàn lâm",l:{danh:-2},lx:"người ta cười áo vải",rt:"Viện cho cha đứng hàng đầu.",rf:"Thị vệ đuổi cha ra khỏi cửa viện."},
  {n:"Khuyên cha về quê, tránh sóng",c:{duc:-1},w:{mat:1},wx:"cha không bị kéo vào",lx:"cha buồn lòng",rt:"Cha gật đầu, lặng lẽ lên đường."}]},
 x1:{h:"Trước bảng vàng",w:"emp",t:"Bảng dán. Hoàng thượng hỏi ngươi trước mặt Hàn lâm viện: “Kẻ vu nàng, nàng muốn trẫm xử ra sao?”",o:[
  {n:"Xin xử đúng luật",c:{suc:-4},o:A=>35+(A.f.open?10:0)+(A.f.hard?5:0),e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Chú của {v} bị cách chức, {v} bị cấm túc một mùa.",rf:"Viện xin tha vì chứng còn mỏng. Ngài cau mày với cả hai bên."},
  {n:"Xin tha cho {v}, chỉ cần trả tên",c:{},o:A=>45+(A.f.mercy?15:0)+S.duc/5,e:["win","mid"],lx:"kẻ vu không trả giá",go:A=>{rdRel(A,"v",8)},rt:"Hoàng thượng khen ngươi độ lượng, tên ngươi đứng đầu bảng.",rf:"Tên ngươi về bảng, nhưng ở hàng thứ ba."},
  {n:"Thưa: thiếp chỉ xin giữ chữ",c:{},w:{duc:3},e:"mid",lx:"bảng thế nào cũng nhận",rt:"Hoàng thượng nhìn ngươi lâu, rồi phẩy tay."}]}},
 E:{win:{k:1,tag:"Đứng đầu bảng Xuân thí",w:"emp",t:"Tên ngươi đứng đầu bảng, thơ ngươi sẽ mở trang thứ nhất tập Ngự tuyển. Cả kinh thành bàn về con gái thầy đồ.",fx:{danh:8,sung:3}},
  mid:{k:0,tag:"Bảng yết, chuyện khép hờ",t:"Tên ngươi có trên bảng, không cao nhất. Lời vu được bỏ qua, không ai bị phạt.",fx:{danh:2}},
  lose:{k:-1,tag:"Tên ngươi xuống cuối bảng",t:"Bảng yết, tên ngươi ở hàng cuối, kèm dòng chú “còn nghi”. {v} được chọn mở tập Ngự tuyển.",fx:{danh:-5},go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",11,{t:"Tài nữ",w:"emp",sj:"danh hiệu Tài nữ sau cùng",cast(A){A.n1=(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hoàng thượng sắp ban chiếu về tập Ngự tuyển: ai là Tài nữ của Đại Hy, ai chỉ là người có thơ in. Tên ngươi, và tên người cha nghèo dạy ngươi chữ, sẽ đứng ở đâu. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Trang thứ nhất",w:"emp",if:RDW(1),t:"Hàn lâm viện xin ngươi chọn bài mở tập Ngự tuyển. Một bài đã đứng đầu Xuân thí, hay một bài chưa ai đọc.",o:[
  {n:"Chọn bài đã đứng đầu",c:{suc:-2},w:{danh:2},wx:"chắc tay",lx:"không có gì mới",rt:"Bài cũ được khắc lên ván đầu."},
  {n:"Chọn bài viết cho cha",c:{suc:-2},o:()=>40+S.tai/4,sc:1,w:{danh:3,duc:2},f:"dad",wx:"thiên hạ biết thầy đồ dạy con",l:{danh:-2},lx:"viện chê lời quê",rt:"Bài thơ về mái trường làng mở đầu tập Ngự tuyển.",rf:"Viện đặt bài ấy xuống trang thứ ba."},
  {n:"Nhường trang đầu cho người khác",c:{danh:-2},w:{duc:4},wx:"không ai ghen",lx:"tập thơ không mở bằng tên ngươi",rt:"Ngươi chỉ xin một chỗ ở giữa tập."}]},
 s2:{h:"Gượng dậy",w:"emp",if:RDW(0),t:"Sau ngày yết bảng, thơ ngươi chỉ còn một chỗ nhỏ trong tập Ngự tuyển. Nhưng chiếu Tài nữ chưa ban.",o:[
  {n:"Dâng Hoàng thượng một bài mới",c:{suc:-4},o:()=>35+S.tai/3+(S.arts&&S.arts.thi||0)*4,sc:1,w:{sung:3,danh:2},wx:"ngài đọc lại thơ ngươi",l:{sung:-2},lx:"ngài bảo đã đọc đủ",rt:"Hoàng thượng giữ bài thơ lại bên gối.",rf:"Bài thơ bị gác dưới chồng tấu."},
  {n:"Thôi tranh, dạy chữ cho cung nữ",c:{suc:-2},w:{duc:4},wx:"người dưới thương ngươi",lx:"danh Tài nữ trôi xa",rt:"Mỗi chiều cung nữ ngồi quanh ngươi học chữ."},
  {n:"Xin Thái hậu một lời",need:["th"],c:{suc:-2},o:()=>35+(S.th||0)/3,sc:1,w:{th:3},wx:"Thái hậu nhắc tên ngươi",l:{th:-2},lx:"Thái hậu chán chuyện văn chương",rt:"Thái hậu nói: “Thơ con bé thầy đồ, ta nhớ.”",rf:"Thái hậu bảo việc ấy của Hoàng thượng."}]},
 c1:{h:"Lời đề tựa",w:"emp",t:"Tập Ngự tuyển cần một lời đề tựa. Chưởng viện muốn tự viết; {n1} xin để ngươi viết.",o:[
  {n:"Nhận viết đề tựa",c:{suc:-4},o:()=>35+S.tai/3,sc:1,w:{danh:4},f:"pref",wx:"tên ngươi đứng đầu tập",l:{danh:-3},lx:"Chưởng viện thấy ngươi cướp việc",rt:"Lời tựa ngắn, được chép khắp viện.",rf:"Chưởng viện sửa lời tựa đến không còn là của ngươi."},
  {n:"Nhường Chưởng viện",c:{danh:-2},w:{duc:3},wx:"Hàn lâm viện nợ ngươi một lần",lx:"mất dịp ghi tên",rt:"Chưởng viện cảm ơn, giọng dịu hẳn."},
  {n:"Xin để cha viết",c:{bac:-20},o:()=>35+S.danh/4,sc:1,w:{danh:3,duc:2},f:"dad",wx:"chữ thầy đồ quê vào sách ngự",l:{danh:-2},lx:"viện cho là chuyện nhà",rt:"Lời tựa của cha được in, nét chữ già mà vững.",rf:"Viện từ chối khéo."}]},
 c2:{h:"{v} sau cùng",w:"v",need:["v"],t:"{v} đứng trước cửa cung ngươi lúc chạng vạng, không vào. Nàng chỉ gửi vào một bài thơ, lời lẽ như xin hòa.",o:[
  {n:"Họa lại một bài",c:{suc:-2},o:()=>40+S.tai/4,sc:1,w:{duc:3},f:"peace",wx:"hai cung thôi đối đầu",l:{danh:-1},lx:"người ta bảo ngươi mềm",go:(A,ok)=>{rdRel(A,"v",ok?15:-4)},rt:"{v} đọc bài họa, khóc.",rf:"{v} đọc xong, xé đôi."},
  {n:"Gửi trả bài thơ",c:{suc:-2},w:{tamco:2},wx:"không mắc nợ",lx:"{v} thấy bị khinh",go:A=>{rdOan(A,"v",6)},rt:"Bài thơ về lại cung {v}."},
  {n:"Đem bài thơ lên Hoàng hậu",need:["hh"],c:{},o:()=>40+(S.hh||0)/4,sc:1,w:{hh:3},wx:"Hoàng hậu thấy ngươi minh bạch",l:{hh:-2},lx:"Hoàng hậu ngại chuyện cũ",go:A=>{rdOan(A,"v",8)},rt:"Hoàng hậu giữ bài thơ.",rf:"Hoàng hậu bảo đừng làm lớn."}]},
 t1:{h:"Cha ở kinh",w:"maid",t:"Cha nhắn: ông muốn về làng trước khi chiếu ban. “Cha đến để nhìn bảng, không phải để nhận ơn.”",o:[
  {n:"Giữ cha ở lại đến ngày ban chiếu",c:{bac:-30},w:{duc:2,danh:2},wx:"cha thấy con được phong",lx:"cha ngại ở lâu",rt:"Cha ở lại, ngày nào cũng ngồi trước cửa viện."},
  {n:"Để cha về",c:{suc:-2},w:{duc:3},wx:"cha giữ được cái thanh",lx:"cha không thấy ngày ấy",rt:"Ngươi tiễn cha bằng một bài thơ."},
  {n:"Xin Hoàng thượng gặp cha",c:{suc:-4},o:()=>30+S.sung/3,sc:1,w:{sung:3,danh:3},f:"meet",wx:"thầy đồ quê được vào chầu",l:{sung:-3},lx:"ngài thấy ngươi đòi hỏi",rt:"Hoàng thượng hỏi cha về sách, cha đáp không run một chữ.",rf:"Ngài bảo không có lệ ấy."}]},
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
