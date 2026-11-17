/* ---------- thd_tho · Danh hiệu Tài nữ ---------- */
/* BAL.road keys: thd_tho.cam = months of cấm túc the Emperor gives {v} when .10 x1 «Xin xử đúng luật» wins (applied with jrd_cn CN_CAM,
   printed with kitNumVi). Deadlines are event-bound: "trước khi danh sách niêm yết", "trước ngày yết bảng".
   Cast: v = the rival from .4 (carried), {n1} = the Hàn lâm, dad's old student (.4 A.n1 is carried by the engine in S.st.f14.n1; fallback is the role
   "Hàn lâm học trò của cha"). Story-only role: the uncle of {v},
   a Thị độc of the Hàn lâm viện (never named, register as ROAD_MAP §5.4 row). .7 is a normal hồi (no j67 arc calls playArt). */
rdDef("thd_tho",5,{t:"Lời thơ vượt tường cung",w:"emp",sj:"kỳ Xuân thí của Hàn lâm viện",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hàn lâm viện mở kỳ Xuân thí: thơ phi tần sẽ được chọn vào tập Ngự tuyển, bài đứng đầu đặt ở trang thứ nhất. Chú của {v} là Thị độc trong viện, tay nắm danh sách dự thí. Giữ được tên mình trên bảng mà không để ai nắm thóp.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thơ in lén ngoài phố",w:"maid",if:RDW(1),t:"Từ kỳ thi Tài nữ, thơ ngươi được chép truyền khắp kinh thành. Một hiệu sách phố Đông khắc lén thơ ngươi bán lấy lời, đề là “Thơ Tài nữ trong cung”, sai mất mấy chữ.",o:[
  {n:"Xin Hàn lâm viện cấm bản in lén",sc:1,f:"clean",wx:"thơ ngươi giữ đúng chữ",lx:"người ta bảo Tài nữ tham danh, tiếng tăm sứt mẻ",rt:"Bản khắc bị thu, hiệu sách phải in lại cho đúng.",rf:"Hiệu sách đóng cửa ba ngày rồi lại bán."},
  {n:"Để mặc, chỉ xin ghi tên cha dạy chữ",wx:"tên thầy đồ quê vang theo thơ con",lx:"đêm thức chép tên cha lên từng tờ, hao sức; thơ in sai chữ cứ thế truyền đi",rt:"Bản in sau có thêm dòng: “Học trò của thầy đồ làng.”"},
  {n:"Bỏ bạc mua lại bản khắc",wx:"không ai in thơ ngươi khi chưa hỏi",lx:"tốn bạc, mà bản chép tay vẫn truyền",rt:"Ván khắc gỗ được đem vào cung, cất trong rương."}]},
 s2:{h:"Tài nữ quê",w:"v",if:RDW(0),t:"Sau kỳ thi Tài nữ, trong các buổi thỉnh an người ta vẫn ngâm nhại thơ ngươi. {v} gọi ngươi là “Tài nữ quê”, cả điện cười.",o:[
  {n:"Cười mà nhận cái tên",wx:"lời nhại mất vui",lx:"cái tên dính theo ngươi, tiếng tăm sứt mẻ",rt:"Ngươi nâng chén: “Quê thì quê, chữ vẫn là chữ.”"},
  {n:"Đáp một câu thơ",sc:1,wx:"cả điện lặng đi",lx:"thơ vụng thì cười thêm, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Câu đáp gọn mà sắc, {v} đỏ mặt.",rf:"Ngươi vấp một chữ, tiếng cười to hơn."},
  {n:"Đóng cửa luyện thơ",wx:"thơ sắc hơn",lx:"đóng cửa luyện đến kiệt sức, ngoài kia không ai nói giúp ngươi",rt:"Giấy nháp chất đầy án thư."}]},
 c1:{h:"Danh sách dự thí",w:"v",need:["v"],t:"Chỉ năm phi tần được dự Xuân thí. Danh sách do chú của {v} trình lên, và tên ngươi chưa có. Danh sách sẽ niêm yết sau tuần trăng này.",o:[
  {n:"Dâng thơ lên Hoàng thượng xin dự",sc:1,wx:"ngài tự ghi tên ngươi",lx:"ngài cho là ngươi tranh danh, Hoàng thượng phật ý",rt:"Hoàng thượng phê một chữ bên lề: “Cho.”",rf:"Hoàng thượng bảo việc ấy để Hàn lâm viện lo."},
  {n:"Nhờ {n1} tiến cử",sc:1,f:"ally",wx:"có người trong viện",lx:"{n1} tiến cử không thành, người ta bảo ngươi chạy cửa, tiếng tăm sứt mẻ",rt:"{n1} trình thêm một tên, chú của {v} không cản được.",rf:"Tờ tiến cử bị gác lại."},
  {n:"Xin Thái hậu cho dự",need:["th"],sc:1,wx:"Thái hậu nhớ đến ngươi",lx:"Thái hậu ngại chuyện văn chương, phật lòng",rt:"Thái hậu sai người nói một câu với Hàn lâm viện.",rf:"Thái hậu chỉ cười."}]},
 c2:{h:"{v} biết đề trước",w:"maid",need:["v"],t:"{maid} nghe lỏm: cung nữ của {v} chép đi chép lại những bài vịnh hoa mai. Đề Xuân thí còn niêm phong, mà nàng đã biết.",o:[
  {n:"Báo Hàn lâm viện đổi đề",sc:1,f:"clean",wx:"kỳ thi sạch",lx:"chạy đi báo tin, hao sức; {v} biết ai phá việc của nàng",go:A=>{rdOan(A,"v",6)},rt:"Một học sĩ lặng lẽ nhận lời."},
  {n:"Cũng luyện vịnh mai cho chắc",f:"know",wx:"không thua thiệt",lx:"luyện đến khuya mà hao sức; biết đề lộ mà im là đồng lõa, tổn đức",rt:"Ngươi viết mười bài vịnh mai."},
  {n:"Lặng im, ghi nhớ",wx:"cầm một lá bài",lx:"thức đêm canh từng tin, hao sức; đề vẫn lộ",rt:"Ngươi ghi vào sổ riêng ngày giờ nghe được."}]},
 t1:{h:"Thư cha từ quê",w:"maid",t:"Thư cha đến: trò nhỏ trường làng thuộc lòng thơ con, mà mái trường dột, cha không có bạc sửa. Cuối thư cha dặn: “Đừng vì danh mà quên chữ.”",o:[
  {n:"Gửi bạc về sửa trường",wx:"trường làng có mái mới",lx:"tốn bạc giữa lúc cần lo lễ",rt:"Cha hồi thư, nét chữ run: “Trò nhỏ đọc thơ con dưới mái mới.”"},
  {n:"Gửi thơ mới cho trò làng chép",wx:"thơ ngươi có người đọc thật lòng",lx:"chép thơ suốt đêm, hao sức; mái trường vẫn dột",rt:"Cha chép thơ con lên vách lớp."},
  {n:"Xin Hoàng thượng ban chữ cho trường làng",sc:1,wx:"trường làng có biển ngự ban",lx:"ngài cho là ngươi mượn ân riêng, Hoàng thượng phật ý",rt:"Hoàng thượng viết bốn chữ “Hữu giáo vô loại”.",rf:"Hoàng thượng bảo: “Việc nhỏ, để sau.”"}]},
 x1:{h:"Đề Xuân thí",w:"emp",t:"Trước khi danh sách niêm yết, ngươi phải quyết: chuyện đề bị lộ, để yên hay làm lớn.",o:[
  {n:"Tâu Hoàng thượng đề đã lộ",e:["win","lose"],rt:"Hoàng thượng sai đổi đề trong đêm. Tên ngươi đứng thứ năm trên bảng.",rf:"Hoàng thượng hỏi: “Sao nàng biết đề?” Câu hỏi treo lơ lửng."},
  {n:"Nhờ {n1} lặng lẽ xin đổi đề",e:["win","mid"],rt:"Đề được đổi mà không ai biết vì sao.",rf:"{n1} không dám, đề vẫn giữ nguyên."},
  {n:"Giữ kín, luyện đúng đề ấy",e:["mid","lose"],lx:"ngươi thi trên một đề bẩn",rt:"Ngươi vào thi với mười bài vịnh mai trong đầu.",rf:"Có kẻ đồn chính ngươi mua đề."}]}},
 E:{win:{k:1,tag:"Đề đổi, tên ngươi trên bảng",w:"emp",t:"Đề Xuân thí được đổi thành “Vịnh trúc”. Tên ngươi đứng trên bảng dự thí, và cung {v} có người đập vỡ một chén trà.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Có tên, mà đề còn lộ",t:"Ngươi được dự thi, nhưng biết rằng có kẻ đã đọc đề trước ngươi."},
  lose:{k:-1,tag:"Bị nghi làm lộ đề",t:"Lời đồn đổi chiều: kẻ biết đề lộ là ngươi, vậy kẻ làm lộ cũng có thể là ngươi. Nội vụ phủ được lệnh dò cung ngươi."}}});

rdDef("thd_tho",6,{t:"Tập nháp bị trộm",w:"maid",sj:"tập thơ nháp của ngươi",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Tập thơ nháp ngươi chép từ thuở ở quê, có cả những câu chưa đưa ai xem, biến mất khỏi án thư. Không có nó, ngươi không chứng được bài nào là của mình. Tìm lại trước kỳ Xuân thí.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đề đổi, có kẻ tức",w:"maid",if:RDW(1),t:"Ba ngày sau khi đề đổi thành “Vịnh trúc”, tập nháp của ngươi biến mất. Trong đó có hai mươi bài vịnh trúc ngươi viết từ hồi ở quê.",o:[
  {n:"Khóa cửa, tra từng người hầu",sc:1,wx:"biết ai vào phòng hôm ấy",lx:"người hầu bất bình vì bị nghi oan, tiếng tăm sứt mẻ",rt:"Một cung nữ mới đổi đến đã xin nghỉ về quê từ hôm qua.",rf:"Ai cũng khai không biết."},
  {n:"Lặng lẽ cho người dò ngoài cung",wx:"kẻ trộm không biết đã bị dò",lx:"tốn bạc thuê người dò, mà chậm hơn",rt:"Người của ngươi ra phố sách ngồi nghe ngóng."},
  {n:"Viết ngay bài mới, mặc tập cũ",wx:"thơ mới không ai có",lx:"viết suốt đêm đến kiệt sức, thơ cũ trôi đi mất",rt:"Ngươi viết thâu đêm."}]},
 s2:{h:"Kẻ gian giấu đồ gian",w:"maid",if:RDW(0),t:"Chuyện đề thi chưa yên thì tập nháp biến mất. Ngoài hành lang có tiếng xì xào: “Mất thật hay tự giấu đi cho khỏi bị khám?”",o:[
  {n:"Báo Cung chính ty bị mất đồ",sc:1,wx:"việc mất đồ có sổ ghi",lx:"người ta càng tin ngươi giấu, tiếng tăm sứt mẻ",rt:"Cung chính ty ghi nhận, ngày giờ rõ ràng.",rf:"Quan coi sổ cười khẩy, viết qua loa."},
  {n:"Im lặng tự tìm",wx:"không thêm tiếng xấu",lx:"lục tìm một mình đến rã rời, không ai làm chứng ngươi đã mất",rt:"Ngươi tự lật từng góc cung."},
  {n:"Viết thư hỏi cha có giữ bản chép",wx:"cha có thể còn giữ vài bài",lx:"ngồi viết thư trong đêm, hao chút sức; thư đi đường xa",rt:"Cha hồi: vài bài cha còn chép trên vách lớp."}]},
 c1:{h:"Cung nữ lạ mặt",w:"maid",t:"Cung nữ mới do Nội vụ phủ đưa đến đã xin về quê. Người cùng phòng kể: trước khi đi, nàng có một túi bạc nặng.",o:[
  {n:"Cho người đuổi theo trước khi nàng ra khỏi kinh",sc:1,wx:"bắt được người lấy",lx:"ngựa thuê đi về tay không, tốn thêm bạc",f:"chase",rt:"Nàng bị giữ ở trạm ngựa ngoài cửa thành, khai có người trong cung sai.",rf:"Nàng đã đi đường thủy, mất dấu."},
  {n:"Hỏi Nội vụ phủ ai cử nàng",sc:1,wx:"lần ra người cử",lx:"Nội vụ phủ báo lại cho kẻ cử, người ta bảo ngươi bới chuyện, tiếng tăm sứt mẻ",rt:"Tên người cử là một thái giám hầu ở cung {v}.",rf:"Sổ Nội vụ phủ chỉ ghi “theo lệ”."},
  {n:"Bỏ qua, giữ người cũ cho chặt",wx:"cung yên",lx:"thức đêm canh người cũ, hao sức; kẻ sai khiến không bị động đến",rt:"Ngươi chỉ cho người hầu cũ đứng hầu án thư."}]},
 c2:{h:"Tro giấy ở cung {v}",w:"v",need:["v"],t:"Một cung nữ quét lò ở cung {v} lén mang đến một mẩu giấy cháy dở. Trên đó còn nửa câu thơ, nét chữ của ngươi.",o:[
  {n:"Giữ mẩu giấy làm chứng",sc:1,wx:"có một vật chứng",lx:"tốn bạc giữ kín mẩu giấy và người mang nó; nửa câu thơ chưa đủ buộc tội",rt:"Ngươi ép mẩu giấy vào giữa hai trang sách."},
  {n:"Đem mẩu giấy đến hỏi thẳng {v}",sc:1,wx:"{v} biết ngươi đã biết",lx:"{v} cười, bảo ngươi tự đốt thơ mình; Hoàng thượng nghe chuyện, phật ý",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"{v} tái mặt, rồi lạnh lùng tiễn khách.",rf:"{v} bảo: “Thơ ngươi đáng đem đốt thật.”"},
  {n:"Trả công người báo tin, dặn nàng im",wx:"có tai mắt trong cung {v}",lx:"tốn bạc trả công, mà nàng có thể bán tin hai đầu",rt:"Cung nữ quét lò cúi đầu nhận bạc."}]},
 t1:{h:"Người chép thuê",w:"maid",t:"Người của ngươi ngoài phố tìm thấy một thư sinh nghèo chép thuê. Hắn được thuê chép thơ trong một tập nháp sang giấy cũ, nét chữ khác, đề ngày tháng từ ba năm trước.",o:[
  {n:"Mua lời khai của hắn",sc:1,f:"wit",wx:"có người khai ai thuê",lx:"hắn đòi thêm, tốn thêm bạc",rt:"Hắn khai người thuê là gia nhân nhà chú của {v}.",rf:"Hắn nhận bạc rồi trốn."},
  {n:"Nhờ {n1} giữ hắn lại",sc:1,f:"ally",wx:"có Hàn lâm làm chứng",lx:"{n1} bị kéo vào vòng, người ta bảo ngươi dùng người quen, tiếng tăm sứt mẻ",rt:"{n1} giữ hắn làm người chép sách trong viện.",rf:"{n1} ngại, không dám nhận."},
  {n:"Để hắn đi, chỉ ghi lại tên",wx:"không dây dưa",lx:"chạy theo dò tên hắn, hao sức; bản chép đề ngày giả vẫn còn đâu đó",rt:"Ngươi chép tên hắn vào sổ riêng."}]},
 x1:{h:"Lấy lại tập nháp",w:"v",t:"Tập nháp đang ở đâu đó trong cung {v}. Trước kỳ Xuân thí, ngươi chỉ còn một nước để đi.",o:[
  {n:"Xin Cung chính ty khám cung {v}",e:["win","lose"],rt:"Tập nháp được tìm thấy dưới đáy rương đồ của một cung nữ bên {v}.",rf:()=>qOn()?"Khám không ra gì. {v} khóc trước Hoàng hậu vì bị làm nhục.":"Khám không ra gì. {v} khóc trước Hoàng thượng vì bị làm nhục."},
  {n:"Bỏ bạc chuộc lại qua tay người chép",e:["win","mid"],rt:"Tập nháp về tay, gói trong vải dầu.",rf:"Chỉ chuộc được nửa tập, nửa kia đã chép xong."},
  {n:"Viết lại từ trí nhớ, mặc nó",e:"mid",lx:"viết lại đến kiệt sức; thơ cũ của ngươi nằm trong tay kẻ khác",rt:"Ngươi viết lại được mười hai bài."}]}},
 E:{win:{k:1,tag:"Tập nháp về tay",w:"maid",t:"Tập nháp về lại án thư ngươi, từng trang còn nguyên. Nhưng ngươi biết: kẻ lấy đã có đủ thời gian để chép.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Viết lại từ trí nhớ",t:"Ngươi có lại một phần thơ, phần kia trôi đi đâu không biết."},
  lose:{k:-1,tag:"Tập nháp nằm trong tay {v}",t:()=>`Khám không ra. {v} được ${qOn()?"Hoàng hậu":"Hoàng thượng"} an ủi, còn ngươi bị nhắc nhở. Thơ ngươi giờ nằm trong tay người ghét ngươi nhất.`,
   /* the comforter's displeasure falls on Hoàng hậu favour only while she sits, else on Sủng (review road-b3-r1 item 5) */
   go:A=>{rdOan(A,"v",6);const d=qOn()?rdGo("thd_tho_6",0):rdGo("thd_tho_6",1);ap67(d);return fmt(d)}}}});

rdDef("thd_tho",7,{t:"Vòng thi Ngự hoa viên",w:"emp",sj:"vòng thi Xuân thí",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Xuân thí mở ở Ngự hoa viên. Hoàng thượng ngồi trên, Hàn lâm viện chấm thơ dưới, một nén hương cho một bài. {v} ngồi cách ngươi ba chỗ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Bước vào vườn",w:"emp",if:RDW(1),t:"Tập nháp đã về tay, ngươi bước vào vườn lòng nhẹ. {v} nhìn ngươi, mắt không chớp.",o:[
  {n:"Chào {v} trước mặt mọi người",sc:1,wx:"cả vườn thấy ngươi rộng lượng",lx:"{v} không đáp giữa vườn, ngươi mất mặt",go:(A,ok)=>{rdRel(A,"v",ok?5:-3)},rt:"{v} buộc phải đáp lễ.",rf:"{v} quay đi như không thấy."},
  {n:"Ngồi yên, nhắm mắt định thần",wx:"lòng tĩnh",lx:"người ta bảo ngươi kiêu, tiếng tăm sứt mẻ",rt:"Tiếng chim trong vườn rõ dần."},
  {n:"Dâng Thái hậu một chén trà",need:["th"],sc:1,wx:"Thái hậu nhớ mặt ngươi",lx:"chen lấn trước giờ thi, Thái hậu phật lòng",rt:"Thái hậu gật đầu.",rf:"Thái hậu chỉ nhấp môi."}]},
 s2:{h:"Thơ mình trong tay người",w:"emp",if:RDW(0),t:"Ngươi biết có bài thơ của mình đang nằm trong tay kẻ khác. Mỗi câu ngươi định viết, có thể đã có người viết trước bằng chính lời ngươi.",o:[
  {n:"Bỏ hết thơ cũ, chỉ viết điều mới",f:"new",wx:"không ai chép được ý mới",lx:"viết mới từ đầu đến kiệt sức, không có bài nào luyện sẵn",rt:"Ngươi gạt hết những câu quen trong đầu."},
  {n:"Viết bài cũ hay nhất, mặc ai chép",f:"old",wx:"thơ của mình thì mình viết",lx:"viết vội trước giờ thi, hao sức; có thể đụng bài của kẻ khác",rt:"Ngươi nhớ lại từng chữ."},
  {n:"Báo trước với {n1}",sc:1,f:"ally",wx:"giám khảo biết mà đề phòng",lx:"lời báo lọt ra thành lời gièm, tiếng tăm sứt mẻ",rt:"{n1} gật nhẹ.",rf:"Có người nghe thấy, bảo ngươi đi đêm giám khảo."}]},
 c1:{h:"{v} ngâm một bài quen",w:"v",need:["v"],if:()=>rdPrev()!=="win",t:"Hương mới cháy nửa, {v} đã nộp bài. Học sĩ đọc to: từng câu là câu trong tập nháp của ngươi, chỉ đổi vài chữ.",o:[
  {n:"Đứng dậy nói đó là thơ của ngươi",sc:1,wx:"lời ngươi được ghi vào biên bản",lx:"bị cho là làm loạn vườn thi, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",8)},rt:"Chưởng viện cho ghi lại, giữ bài {v} riêng.",rf:()=>S.thDead?"Chưởng viện cau mày: “Không có chứng thì im.”":"Thái hậu cau mày: “Không có chứng thì im.”"},
  {n:"Ngồi yên, viết bài khác hay hơn",wx:"thắng bằng chữ, không bằng lời",lx:"viết lại cả bài trong nửa nén hương, kiệt sức; bài của {v} được chấm như thường",rt:"Ngươi cắn môi, cầm bút lại."},
  {n:"Ghi lại từng chữ nàng đổi",wx:"có chứng về sau",lx:"im lặng nuốt nhục trước cả vườn, mất mặt",rt:"Ngươi chép vào tay áo những chữ nàng sửa."}]},
 c2:{h:"Nghiên mực bị tráo",w:"maid",t:"Nghiên mực trên án của ngươi bị pha nước, mực loang như khóc. Còn non nửa nén hương.",o:[
  {n:"Xin đổi nghiên",sc:1,wx:"có nghiên mới",lx:"mất thời gian quý, viết vội đến hao sức",rt:"Thái giám mang nghiên mới đến ngay.",rf:"Nghiên mới đến khi hương sắp tàn."},
  {n:"Viết bằng mực loãng, chữ nhỏ lại",wx:"chữ nhỏ mà thanh",lx:"cúi sát giấy viết chữ nhỏ, hao sức; giám khảo khó đọc",rt:"Nét chữ mảnh như lá trúc."},
  {n:"Mượn nghiên của {v}",sc:1,wx:"cả vườn thấy {v} có tật",lx:"{v} từ chối giữa vườn, ngươi mất mặt",go:(A,ok)=>{rdOan(A,"v",ok?6:3)},rt:"{v} không dám từ, mặt tái mét.",rf:"{v} bảo nghiên nàng vừa cạn."}]},
 c3:{h:"Thái hậu hỏi quê",w:"th",need:["th"],t:"Thái hậu hỏi ngươi giữa giờ thi: “Thầy đồ dạy con thơ gì đầu tiên?”",o:[
  {n:"Kể thật bài thơ đầu cha dạy",wx:"Thái hậu cảm động",lx:"lộ cái nghèo trước cả vườn, mất mặt",rt:"Thái hậu khẽ đọc theo câu ngươi kể."},
  {n:"Đọc một câu kinh điển cho trang trọng",sc:1,wx:"cả vườn nể học vấn",lx:"Thái hậu thấy ngươi giấu quê, phật lòng",rt:"Học sĩ Hàn lâm gật gù.",rf:"Thái hậu nói: “Ta hỏi thơ của cha con kia mà.”"},
  {n:"Xin Thái hậu cho viết xong rồi thưa",wx:"không phân tâm",lx:"Thái hậu thấy ngươi khô khan, phật lòng",rt:"Thái hậu phẩy tay cho viết tiếp."}]},
 t1:{h:"{n1} trong hàng giám khảo",w:"emp",t:"{n1} ngồi trong hàng giám khảo, chú của {v} ngồi ngay bên cạnh y. Theo lệ hồi tị, giám khảo có người thân dự thi phải lui: {n1} là học trò của cha ngươi, chú của {v} là người nhà nàng. Chưởng viện chưa nhắc lệ ấy.",o:[
  {n:"Xin Chưởng viện cho cả hai hồi tị",sc:1,f:"recuse",wx:"{n1} và chú của {v} cùng rời hàng giám khảo",lx:"Chưởng viện cho là ngươi dạy viện làm việc, tiếng tăm sứt mẻ",rt:"Chưởng viện y lệ: {n1} và chú của {v} cùng lui khỏi hàng giám khảo.",rf:"Chưởng viện chỉ cho {n1} lui; chú của {v} vẫn ngồi."},
  {n:"Ra hiệu nhờ y để mắt bài {v}",sc:1,f:"sign",wx:"y đọc kỹ bài {v}",lx:"chú của {v} thấy, người ta bảo ngươi gian lận, tiếng tăm sứt mẻ",rt:"{n1} giữ bài {v} lâu hơn mọi bài.",rf:"Chú của {v} hừ một tiếng."},
  {n:"Xin Hoàng thượng cho chấm tên che",sc:1,f:"blind",wx:"bài nào cũng che tên",lx:"ngài thấy ngươi lắm chuyện, Hoàng thượng phật ý",rt:"Hoàng thượng cười: “Ý hay.” Bài nào cũng dán giấy che tên.",rf:"Hoàng thượng bảo Hàn lâm viện có phép của Hàn lâm viện."}]},
 x1:{h:"Nén hương cuối",w:"emp",t:"Hương còn một đốt tay. Bài của ngươi phải nộp lên án.",o:[
  {n:"Viết về tuyết trên mái trường làng",e:["win","mid"],rt:"Hoàng thượng đọc xong, đặt bài ngươi lên trên cùng.",rf:"Bài hay, nhưng Hàn lâm viện chê lời quê."},
  {n:"Viết theo lối cung đình cho chắc",e:["mid","lose"],lx:"chắc mà nhạt",rt:"Bài ngươi đứng ngang bài {v}.",rf:"Bài ngươi chìm giữa những bài giống nhau."},
  {n:"Viết một bài đáp thẳng bài {v}",e:["win","lose"],rt:"Cả vườn nhận ra bài {v} chỉ là cái bóng của bài ngươi.",rf:"Hoàng thượng thấy ngươi đem thơ ra đấu khẩu."}]}},
 E:{win:{k:1,tag:"Đứng đầu vòng thi",w:"emp",t:"Bài ngươi đứng đầu vòng Xuân thí. Hoàng thượng cho chép lại treo ở Ngự thư phòng. {v} rời vườn trước khi tan.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Đồng hạng với {v}",t:"Bài ngươi và bài {v} cùng hạng. Hàn lâm viện hẹn chấm lại khi yết bảng."},
  lose:{k:-1,tag:"{v} đứng đầu",t:"{v} đứng đầu vòng Xuân thí, bằng những câu ngươi biết rõ là của mình.",go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",8,{t:"Lời vu đạo thơ",w:"v",sj:"lời tố ngươi đạo thơ",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Chú của {v} dâng tờ trình lên Hàn lâm viện: thơ ngươi dự thi chép từ một tập thơ có trước, chứng là những trang chép tay đề ngày từ ba năm trước. Bảng Xuân thí tạm hoãn. Đạo thơ là tội làm ô danh cả viện.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Mực chưa ráo",w:"v",if:RDW(1),t:"Bài thơ đứng đầu của ngươi treo ở Ngự thư phòng chưa đầy mười ngày thì bị gỡ xuống, chờ xét.",o:[
  {n:"Xin vào gặp Hoàng thượng",sc:1,wx:"ngài nghe ngươi trước",lx:"ngài bảo chờ viện xét, Hoàng thượng phật ý vì bị làm phiền",rt:"Hoàng thượng nói: “Trẫm đọc thơ nàng, trẫm biết. Nhưng phải có chứng.”",rf:"Thái giám nói ngài đang bận."},
  {n:"Bình thản chờ xét",wx:"không tỏ ra hoảng",lx:"ngồi yên để lời đồn chạy trước, tiếng tăm sứt mẻ",rt:"Ngươi vẫn thỉnh an như mọi ngày."},
  {n:"Cho người dò tờ trình",sc:1,wx:"biết chứng của họ là gì",lx:"bị nói là đi dò quan, tiếng tăm sứt mẻ",rt:"Tờ trình kèm mười hai trang giấy ngả vàng.",rf:"Người dò bị đuổi khỏi cửa viện."}]},
 s2:{h:"Kẻ trộm tố người mất",w:"v",if:RDW(0),t:"{v} được chấm ngang ngươi, hoặc hơn ngươi, bằng chính những câu thơ của ngươi. Nay nàng còn tố ngươi chép thơ nàng, lấy chính tập nháp bị trộm làm chứng.",o:[
  {n:"Nói thẳng với Hoàng hậu",need:["hh"],sc:1,wx:"Hoàng hậu nghe một phía khác",lx:"Hoàng hậu thấy hai cung cãi nhau, phật lòng",rt:"Hoàng hậu bảo sẽ không để Hàn lâm viện xử vội.",rf:"Hoàng hậu bảo việc văn chương đừng đem vào Trung cung."},
  {n:"Nuốt giận, gom chứng",wx:"lòng lạnh lại",lx:"mấy ngày đầu không ai bênh ngươi, tiếng tăm sứt mẻ",rt:"Ngươi ngồi soạn lại mọi giấy tờ."},
  {n:"Gửi thư về hỏi cha",wx:"cha có thể nhớ những câu con viết xưa",lx:"ngồi viết thư trong đêm, hao chút sức; thư đi đường xa",rt:"Thư đi trong đêm."}]},
 c1:{h:"Mười hai trang giấy vàng",w:"maid",t:"Thái giám Ngự thư phòng mang đến cho ngươi xem bản sao những trang chứng: giấy ngả vàng, ngày tháng từ ba năm trước, nét chữ lạ. Có điều giấy thơm mùi hồ mới.",o:[
  {n:"Xin Hàn lâm viện thử giấy",sc:1,f:"paper",wx:"giấy bị nghi là mới hun khói",lx:"viện chưa chịu thử, người ta bảo ngươi cãi chày, tiếng tăm sứt mẻ",rt:"Học sĩ già bẻ một góc giấy: lõi trắng.",rf:"Viện bảo giấy cũ hay mới không chứng được gì."},
  {n:"Ghi nhớ, chưa nói",f:"paper",wx:"giữ lá bài cho buổi xét",lx:"giữ miệng mà để lời đồn vẫn chạy, tiếng tăm sứt mẻ",rt:"Ngươi nhớ kỹ mùi hồ."},
  {n:"Nói đây là giấy giả",sc:1,wx:"lời ngươi được ghi",lx:"không chứng thì thành vu ngược, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",4)},rt:"Lời ngươi viết gửi sang, Chưởng viện cho ghi vào hồ sơ.",rf:"Chú của {v} cười: “Kẻ đạo thơ nào cũng nói vậy.”"}]},
 c2:{h:"Thầy đồ viết thay",w:"v",need:["v"],t:"Lời đồn mới trong cung: thơ ngươi là do cha ngươi, một thầy đồ quê, viết thay gửi vào. “Con gái thầy đồ thì có gì ngoài chữ của cha?”",o:[
  {n:"Ứng tác trước buổi thỉnh an",sc:1,wx:"miệng đời im",lx:"thơ vụng thì lời đồn thêm chắc, tiếng tăm sứt mẻ",rt:"Cả điện lặng đi khi ngươi ngừng bút.",rf:"Bài thơ gượng ép, có người bật cười."},
  {n:"Đáp: chữ của cha, lòng của con",wx:"người ta thấy ngươi hiếu",lx:"chưa rửa được tiếng, người ta càng tin cha viết thay",rt:"Có người gật gù."},
  {n:"Tìm ra ai tung tin",sc:1,wx:"lần đến cung {v}",lx:"đuổi theo lời đồn chỉ thêm ồn, tiếng tăm sứt mẻ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Lời đồn đi ra từ một ma ma bên {v}.",rf:"Lời đồn không có gốc."}]},
 c3:{h:"{n1} bị gọi hỏi",w:"emp",t:"Hàn lâm viện gọi {n1} hỏi: y là học trò của cha ngươi, liệu y có thiên vị khi chấm. Theo lệ, y có thể xin hồi tị.",o:[
  {n:"Khuyên y xin hồi tị cho trong sạch",wx:"việc xét không ai bắt bẻ",lx:"nhắn tin qua lại mấy đêm, hao sức; mất người hiểu thơ ngươi trong viện",rt:"{n1} xin hồi tị."},
  {n:"Xin y ở lại làm chứng",sc:1,f:"ally",wx:"có người trong viện đứng về phía ngươi",lx:"bị cho là kéo bè, tiếng tăm sứt mẻ",rt:"{n1} đứng ra: “Ta từng thấy nàng viết bài ấy từ hồi còn ở trường làng.”",rf:"Chưởng viện gạt lời {n1} vì là người nhà."},
  {n:"Không nói gì với y",wx:"y tự quyết",lx:"ngồi chờ không yên, hao sức; y không biết ngươi cần gì",rt:"{n1} im lặng ngồi lại."}]},
 t1:{h:"Câu hỏi của Hàn lâm viện",w:"emp",t:"Phi tần không bước vào Hàn lâm viện. Chưởng viện gửi câu hỏi qua thái giám Ngự thư phòng, xin ngươi đáp bằng giấy: “Bài thơ này nàng viết khi nào, ở đâu, bên cạnh có ai?”",o:[
  {n:"Kể thật từng chi tiết",sc:1,f:"truth",wx:"lời khai khớp từ đầu đến cuối",lx:"viết kể từng chi tiết đến khuya, hao sức; có chi tiết không ai làm chứng được",rt:"Ngươi kể cả tiếng mưa trên mái trường đêm ấy."},
  {n:"Chỉ đáp điều chứng được",wx:"không sơ hở",lx:"cân từng chữ trong tờ đáp, hao sức; nghe như giấu",rt:"Chưởng viện đọc tờ đáp, gật đầu chậm."},
  {n:"Hỏi ngược lại về giấy chứng",sc:1,wx:"viện phải xét cả hai bên",lx:"bị cho là hỗn với quan viện, tiếng tăm sứt mẻ",rt:"Chưởng viện ghi: “Giấy chứng cần thử.”",rf:"Chưởng viện phê bên lề: “Nàng là người bị hỏi.”"}]},
 x1:{h:"Tờ đáp gửi Chưởng viện",w:"v",t:"Buổi xét đầu ở Hàn lâm viện. Chú của {v} đứng trình tờ trình; phi tần không được vào viện, lời ngươi chỉ đến bằng tờ đáp do thái giám Ngự thư phòng mang sang. Chưởng viện chờ tờ đáp ấy.",o:[
  {n:"Xin so nét chữ và thử giấy",e:["win","lose"],rt:"Giấy chứng lõi trắng, nét chữ chép vụng. Tờ trình lung lay.",rf:"Viện bảo giấy cũ hay mới không làm chứng được."},
  {n:"Tố ngược {v} lấy trộm tập nháp",e:["win","lose"],go:A=>{rdOan(A,"v",10)},rt:"Chưởng viện tâu lên, Hoàng thượng cho Nội vụ phủ tra cung {v}.",rf:"Không có chứng, lời tố ngược thành lời vu."},
  {n:"Xin hoãn để gom chứng",e:"mid",lx:"tên ngươi vẫn bị treo, người ta bảo ngươi chưa dám đối chứng, tiếng tăm sứt mẻ",rt:"Viện cho hoãn đến trước ngày yết bảng."}]}},
 E:{win:{k:1,tag:"Lời vu lung lay",w:"emp",t:"Tờ trình của chú {v} có chỗ hở. Viện chưa xử, nhưng ai cũng thấy cán cân đã lệch về phía ngươi.",go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Cả hai bên cùng bị xét",t:"Viện treo việc lại. Thơ ngươi và thơ {v} cùng nằm trên án chờ chứng."},
  lose:{k:-1,tag:"Tên ngươi bị gạch tạm",t:"Tên ngươi bị gạch khỏi bảng chờ xét. Trong cung, người ta gọi ngươi là “Tài nữ chép thơ”."}}});

rdDef("thd_tho",9,{t:"Chứng minh",w:"emp",sj:"chứng cứ thơ là của ngươi",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hàn lâm viện cho ngươi nộp chứng qua tay thái giám Ngự thư phòng trước ngày yết bảng. Giấy quê, thư cha, lời {n1}, và chính ngòi bút của ngươi. Mỗi chứng tốn một thứ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cán cân lệch",w:"emp",if:RDW(1),t:"Viện đã thấy chỗ hở của tờ trình. Chú của {v} vội tìm thêm chứng mới, còn ngươi cần chứng nào đủ để đóng việc lại.",o:[
  {n:"Đóng cửa soạn bản tường trình",wx:"lời lẽ chặt chẽ",lx:"đóng cửa viết đến kiệt sức, không đi gặp ai",rt:"Bản tường trình dài mười trang."},
  {n:"Mời học sĩ già thử giấy đến cung",sc:1,f:"paper",wx:"có người am giấy đứng về phía ngươi",lx:"bị nói là mua người, tiếng tăm sứt mẻ",rt:"Học sĩ già hứa ra làm chứng.",rf:"Học sĩ già cáo bệnh."},
  {n:"Dặn người hầu giữ miệng",wx:"không ai bắt được lời",lx:"cung ngươi lạnh như băng, người ta bảo ngươi có tật giật mình, tiếng tăm sứt mẻ",rt:"Cửa cung khép lại."}]},
 s2:{h:"Tên đang bị gạch",w:"emp",if:RDW(0),t:"Tên ngươi còn treo trên bảng chờ. Người đến thỉnh an thưa dần.",o:[
  {n:"Vẫn thỉnh an Hoàng hậu mỗi sáng",need:["hh"],wx:"không ai nói ngươi trốn",lx:"ngày nào cũng đi thỉnh an, nghe lời xì xào, hao sức",rt:"Hoàng hậu nhìn ngươi lâu hơn thường lệ."},
  {n:"Xin Hoàng thượng một buổi đối thơ",sc:1,f:"duel",wx:"ngài thấy tài thật",lx:"ngài bảo đang có án, Hoàng thượng phật ý",rt:"Ngài hẹn sau ngày xét.",rf:"Ngài từ chối."},
  {n:"Cắn răng gom chứng",wx:"lòng lạnh",lx:"gom chứng một mình đến rã rời",rt:"Ngươi xếp từng tờ thư cũ."}]},
 c1:{h:"Giấy dó làng",w:"maid",t:"Tập nháp ngươi viết trên giấy dó của lò giấy làng. Lò giấy ấy đóng dấu nước riêng. Gửi người về làng lấy sổ lò giấy, phải về trước ngày yết bảng.",o:[
  {n:"Thuê ngựa trạm về làng",sc:1,f:"dzo",wx:"có sổ lò giấy ghi năm bán",lx:"ngựa về muộn, tốn thêm bạc trả trạm",rt:"Sổ lò giấy về kịp, ghi rõ năm cha mua giấy cho con.",rf:"Ngựa về khi bảng đã sắp yết."},
  {n:"Nhờ {n1} xin công văn gọi sổ",sc:1,f:"ally",wx:"sổ về bằng đường quan",lx:"chú của {v} biết trước, người ta bảo ngươi mượn quan riêng, tiếng tăm sứt mẻ",rt:"Công văn đi bằng ngựa trạm của viện.",rf:"Chú của {v} giữ công văn lại."},
  {n:"Tự đối chiếu dấu nước",sc:1,f:"dzo",wx:"chỉ ra dấu nước trên từng trang",lx:"mắt mỏi mà không chắc, sức kiệt thêm",rt:"Trang nào của ngươi cũng có dấu nước lò làng.",rf:"Dấu nước mờ, khó chỉ."}]},
 c2:{h:"Thư cha xưa",w:"maid",t:"Cha giữ mọi thư con gửi từ ngày con vào cung. Có bức chép nguyên hai câu đầu bài thơ bị tố, kèm ngày tháng.",o:[
  {n:"Xin cha gửi thư lên",sc:1,f:"letter",wx:"có chứng ngày tháng",lx:"thư riêng của cha con đem ra trước viện, người ta chê ngươi bất hiếu, tổn đức",rt:"Thư cha về, giấy mỏng, chữ rõ.",rf:"Thư cha bị ướt mưa dọc đường."},
  {n:"Không đem thư nhà ra viện",wx:"giữ chuyện nhà",lx:"ngồi canh chồng thư cũ, hao sức; mất một chứng",rt:"Ngươi để thư cha ở yên."},
  {n:"Xin cha tự lên kinh làm chứng",sc:1,f:"dad",wx:"thầy đồ quê đứng trước Hàn lâm viện",lx:"cha già đi đường xa mà không kịp, người ta cười nhà thầy đồ, tiếng tăm sứt mẻ",rt:"Cha lên đường ngay, đi bộ nửa chặng.",rf:"Cha ốm dọc đường, không đến kịp."}]},
 t1:{h:"{v} gửi lời",w:"v",need:["v"],t:"Đêm trước buổi xét, {v} sai người đến: nếu ngươi rút đơn tố nàng trộm tập nháp, nàng sẽ bảo chú rút tờ trình.",o:[
  {n:"Nhận lời, hai bên cùng rút",sc:1,f:"deal",wx:"tên ngươi được trả lại bảng",lx:"{v} nuốt lời thì không ai biết thơ là của ai, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} giữ lời.",rf:"{v} nhận lời rồi nuốt lời."},
  {n:"Từ chối, xét đến cùng",sc:1,f:"firm",wx:"không ai mặc cả được thơ ngươi",lx:"thức đêm chờ đòn sau, hao sức; {v} càng hận",go:A=>{rdOan(A,"v",8)},rt:"Ngươi trả lời: “Thơ không đem đổi.”"},
  {n:"Đem lời đề nghị lên viện",sc:1,wx:"lời mặc cả thành chứng",lx:"người đưa tin chối, ngươi mang tiếng bịa chuyện, tiếng tăm sứt mẻ",go:A=>{rdOan(A,"v",10)},rt:"Chưởng viện ghi lời đề nghị vào hồ sơ.",rf:"Người đưa tin khai là tự ý."}]},
 x1:{h:"Ứng tác ở Ngự thư phòng",w:"emp",t:"Hoàng thượng cho gọi ngươi vào Ngự thư phòng, tự tay trải giấy ra đề: “Thơ bị nghi, ai viết thì viết tiếp được. Nàng viết tiếp bốn câu; trẫm sẽ gửi sang viện.”",o:[
  {n:"Viết tiếp bằng giọng của bài cũ",e:["win","lose"],rt:"Bốn câu nối liền mạch như cùng một hơi. Hoàng thượng gật đầu.",rf:"Bốn câu hay, nhưng khác giọng bài cũ."},
  {n:"Dâng chứng giấy và thư, xin không phải thử",e:["win","mid"],rt:"Chứng đủ, Hoàng thượng phẩy tay: “Khỏi thử.”",rf:"Chứng có, nhưng ngài vẫn muốn nghe thơ."},
  {n:"Xin cả {v} cùng viết tiếp",e:["win","lose"],go:A=>{rdOan(A,"v",8)},rt:"{v} cầm bút run, không viết nổi một câu.",rf:"{v} viết được, dù vụng. Hai bên ngang nhau."}]}},
 E:{win:{k:1,tag:"Thơ là của ngươi",w:"emp",t:"Viện công nhận thơ là của ngươi. Tờ trình của chú {v} bị trả về, kèm một dòng phê đỏ.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Chứng có, lòng người còn ngờ",t:"Viện thôi xét, tên ngươi về lại bảng. Nhưng trong cung vẫn có người nhếch môi khi nghe tên ngươi."},
  lose:{k:-1,tag:"Không chứng được",t:"Chứng không đủ. Viện để tên ngươi treo đến ngày yết bảng, và Hoàng thượng gấp tờ thơ lại, không nói một lời."}}});

rdDef("thd_tho",10,{t:"Ngày yết bảng",w:"emp",sj:"bảng Xuân thí",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Bảng Xuân thí sắp dán ở cửa Hàn lâm viện. Ai đứng đầu tập Ngự tuyển, ai bị gạch tên, ai bị phạt vì vu cáo: tất cả quyết trong mấy ngày này.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Phe {v} rạn",w:"v",if:RDW(1),t:"Sau dòng phê đỏ, chú của {v} xin cáo bệnh. {v} không ra khỏi cung ba ngày.",o:[
  {n:"Gửi thuốc thăm chú của {v}",sc:1,wx:"cả viện thấy ngươi không thù dai",lx:"bị cho là đắc ý, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-2)},rt:"Phủ y nhận thuốc, không hồi đáp.",rf:"Thuốc bị trả lại nguyên gói."},
  {n:"Đòi viện xử tội vu cáo",sc:1,f:"hard",wx:"lời vu phải có giá",lx:"người ta bảo ngươi đánh kẻ ngã, tổn đức",go:A=>{rdOan(A,"v",8)},rt:"Viện hứa xét cùng ngày yết bảng.",rf:"Viện bảo chuyện ấy để sau."},
  {n:"Lặng im chờ bảng",wx:"giữ thể diện",lx:"ngồi chờ không yên, hao sức; phe {v} có thời gian gượng dậy",rt:"Ngươi đóng cửa chép kinh."}]},
 s2:{h:"Bảng chờ, tên treo",w:"v",if:RDW(0),t:"Chú của {v} hối viện yết bảng sớm, trước khi ngươi kịp đưa thêm chứng.",o:[
  {n:"Xin hoãn yết bảng",sc:1,wx:"thêm thời gian",lx:"ngài thấy ngươi níu kéo, Hoàng thượng phật ý",rt:"Hoàng thượng cho hoãn năm ngày.",rf:"Ngài bảo: “Đủ rồi.”"},
  {n:"Gửi tập nháp gốc cho viện giữ",wx:"chứng nằm ở nơi công",lx:"chép lại một bản trước khi gửi, hao sức; tập nháp rời tay ngươi",rt:"Tập nháp được niêm trong hòm viện."},
  {n:"Viết thư xin lỗi {v} cho yên",sc:1,wx:"{v} nhẹ tay",lx:"thư thành chứng ngươi nhận tội, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?10:-4)},rt:"{v} không nhắc thêm.",rf:"{v} đem thư khoe khắp cung."}]},
 c1:{h:"Sổ điểm bị sửa",w:"emp",t:"{n1} lén báo: sổ điểm Xuân thí có chỗ cạo sửa. Điểm của ngươi bị hạ một bậc, điểm của {v} được nâng.",o:[
  {n:"Xin Hoàng thượng cho chấm lại công khai",sc:1,f:"open",wx:"sổ điểm được chấm lại trước mặt mọi người",lx:"ngài phiền vì viện lục đục, Hoàng thượng phật ý",rt:"Chấm lại, điểm ngươi về như cũ.",rf:"Ngài bảo viện tự lo."},
  {n:"Giữ bản sao sổ điểm",wx:"cầm chứng gian lận trong tay",lx:"tốn bạc cho {n1} chép sổ, y chịu tiếng chép trộm",rt:"{n1} chép cho ngươi một bản."},
  {n:"Để {n1} tự tâu",sc:1,f:"ally",wx:"người ngoài cung lên tiếng",lx:"{n1} bị trù dập, người ta bảo ngươi đẩy người khác ra chịu, tiếng tăm sứt mẻ",rt:"{n1} dâng sớ, chú của {v} bị gọi hỏi.",rf:"{n1} bị điều đi chép sử ở phủ xa."}]},
 c2:{h:"{v} đến cửa",w:"v",need:["v"],t:"{v} đến cung ngươi một mình, không mang cung nữ. Nàng nói chú nàng ép nàng làm, nàng chỉ muốn yên thân.",o:[
  {n:"Tin nàng, cho nàng một lối lui",sc:1,f:"mercy",wx:"có thể bớt một kẻ thù",lx:"bị lừa lần nữa thì cả cung cười, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?15:-6)},rt:"{v} cúi đầu thật sâu.",rf:()=>qOn()?"{v} ra về, kể khác đi với Hoàng hậu.":"{v} ra về, kể khác đi khắp các cung."},
  {n:"Bắt nàng viết lời khai",sc:1,wx:"có lời khai của chính {v}",lx:"nàng xé giấy bỏ đi kể khắp cung, tiếng tăm sứt mẻ; nàng hận ngươi suốt đời",go:A=>{rdOan(A,"v",10)},rt:"{v} run tay viết, ký tên.",rf:"{v} xé giấy, bỏ đi."},
  {n:"Không tiếp",wx:"không sa bẫy",lx:"đứng sau cửa nghe nàng khóc, lòng mỏi, hao sức; nàng càng cùng đường",go:A=>{rdOan(A,"v",4)},rt:"Cửa cung không mở."}]},
 t1:{h:"Cha lên kinh",w:"maid",t:"Tin báo: cha ngươi đã lên kinh, trọ ở một quán trọ gần cửa Hàn lâm viện, nói chỉ muốn tận mắt thấy bảng.",o:[
  {n:"Gửi bạc lo chỗ trọ cho cha",wx:"cha có chỗ ở tử tế",lx:"tốn bạc thuê chỗ trọ tử tế",rt:"Cha nhận, gửi lại một bài thơ ngắn."},
  {n:"Xin cho cha vào xem lễ yết bảng",sc:1,f:"dadin",wx:"thầy đồ quê đứng trước cửa Hàn lâm",lx:"người ta cười áo vải của cha, tiếng tăm sứt mẻ",rt:"Viện cho cha đứng hàng đầu.",rf:"Thị vệ đuổi cha ra khỏi cửa viện."},
  {n:"Khuyên cha về quê, tránh sóng",wx:"cha không bị kéo vào",lx:"cha buồn lòng vì con đẩy cha đi, tổn đức",rt:"Cha gật đầu, lặng lẽ lên đường."}]},
 x1:{h:"Trước bảng vàng",w:"emp",t:"Bảng dán ở cửa Hàn lâm viện. Tối ấy, ở Ngự thư phòng, Hoàng thượng hỏi ngươi: “Kẻ vu nàng, trẫm sẽ xử. Nàng có điều gì muốn xin?”",o:[
  {n:"Xin xử đúng luật",e:["win","lose"],
   /* the cấm túc the verdict names is applied (jrd_cn CN_CAM: p.confined months, BAL.road.thd_tho.cam) */
   go:(A,ok)=>{rdOan(A,"v",10);if(ok)return CN_CAM(rv67(A,"v"),BAL.road.thd_tho.cam)},rt:()=>`Hoàng thượng phê: chú của {v} bị cách chức, {v} bị cấm túc ${kitNumVi(BAL.road.thd_tho.cam)} tháng.`,rf:"Viện xin tha vì chứng còn mỏng. Ngài cau mày với cả hai bên."},
  {n:"Xin tha cho {v}, chỉ cần trả tên",e:["win","mid"],lx:"kẻ vu không trả giá, người ta bảo ngươi mềm tay",go:A=>{rdRel(A,"v",8)},rt:"Hoàng thượng khen ngươi độ lượng, tên ngươi đứng đầu bảng.",rf:"Tên ngươi về bảng, nhưng ở hàng thứ ba."},
  {n:"Thưa: thiếp chỉ xin giữ chữ",e:"mid",lx:"bảng thế nào cũng nhận; Hoàng thượng thấy ngươi chối ân, phật ý",rt:"Hoàng thượng nhìn ngươi lâu, rồi phẩy tay."}]}},
 E:{win:{k:1,tag:"Đứng đầu bảng Xuân thí",w:"emp",t:"Tên ngươi đứng đầu bảng, thơ ngươi sẽ mở trang thứ nhất tập Ngự tuyển. Cả kinh thành bàn về con gái thầy đồ."},
  mid:{k:0,tag:"Bảng yết, chuyện khép hờ",t:"Tên ngươi có trên bảng, không cao nhất. Lời vu được bỏ qua, không ai bị phạt."},
  lose:{k:-1,tag:"Tên ngươi xuống cuối bảng",t:"Bảng yết, tên ngươi ở hàng cuối, kèm dòng chú “còn nghi”. {v} được chọn mở tập Ngự tuyển.",go:A=>{rdOan(A,"v",6);return ""}}}});

rdDef("thd_tho",11,{t:"Tài nữ",w:"emp",sj:"danh hiệu Tài nữ sau cùng",cast(A){A.n1=A.n1||(S.st.f14&&S.st.f14.n1)||"Hàn lâm học trò của cha";return rdCast(A,["v"])},
 g:"Hoàng thượng sắp ban chiếu về tập Ngự tuyển: ai là Tài nữ của Đại Hy, ai chỉ là người có thơ in. Tên ngươi, và tên người cha nghèo dạy ngươi chữ, sẽ đứng ở đâu. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Trang thứ nhất",w:"emp",if:RDW(1),t:"Hàn lâm viện xin ngươi chọn bài mở tập Ngự tuyển. Một bài đã đứng đầu Xuân thí, hay một bài chưa ai đọc.",o:[
  {n:"Chọn bài đã đứng đầu",wx:"chắc tay",lx:"chép lại bài cũ cho đẹp, hao sức; không có gì mới",rt:"Bài cũ được khắc lên ván đầu."},
  {n:"Chọn bài viết cho cha",sc:1,f:"dad",wx:"thiên hạ biết thầy đồ dạy con",lx:"viện chê lời quê, tiếng tăm sứt mẻ",rt:"Bài thơ về mái trường làng mở đầu tập Ngự tuyển.",rf:"Viện đặt bài ấy xuống trang thứ ba."},
  {n:"Nhường trang đầu cho người khác",wx:"không ai ghen",lx:"tập thơ không mở bằng tên ngươi, danh lùi một bước",rt:"Ngươi chỉ xin một chỗ ở giữa tập."}]},
 s2:{h:"Gượng dậy",w:"emp",if:RDW(0),t:"Sau ngày yết bảng, thơ ngươi chỉ còn một chỗ nhỏ trong tập Ngự tuyển. Nhưng chiếu Tài nữ chưa ban.",o:[
  {n:"Dâng Hoàng thượng một bài mới",sc:1,wx:"ngài đọc lại thơ ngươi",lx:"ngài bảo đã đọc đủ, Hoàng thượng phật ý",rt:"Hoàng thượng giữ bài thơ lại bên gối.",rf:"Bài thơ bị gác dưới chồng tấu."},
  {n:"Thôi tranh, dạy chữ cho cung nữ",wx:"người dưới thương ngươi",lx:"dạy cung nữ mỗi tối, hao sức; danh Tài nữ trôi xa",rt:"Mỗi chiều cung nữ ngồi quanh ngươi học chữ."},
  {n:"Xin Thái hậu một lời",need:["th"],sc:1,wx:"Thái hậu nhắc tên ngươi",lx:"Thái hậu chán chuyện văn chương, phật lòng",rt:"Thái hậu nói: “Thơ con bé thầy đồ, ta nhớ.”",rf:"Thái hậu bảo việc ấy của Hoàng thượng."}]},
 c1:{h:"Lời đề tựa",w:"emp",t:"Tập Ngự tuyển cần một lời đề tựa. Chưởng viện muốn tự viết; {n1} xin để ngươi viết.",o:[
  {n:"Nhận viết đề tựa",sc:1,f:"pref",wx:"tên ngươi đứng đầu tập",lx:"Chưởng viện thấy ngươi cướp việc, tiếng tăm sứt mẻ",rt:"Lời tựa ngắn, được chép khắp viện.",rf:"Chưởng viện sửa lời tựa đến không còn là của ngươi."},
  {n:"Nhường Chưởng viện",wx:"Hàn lâm viện nợ ngươi một lần",lx:"mất dịp ghi tên, danh lùi một bước",rt:"Chưởng viện cảm ơn, giọng dịu hẳn."},
  {n:"Xin để cha viết",sc:1,f:"dad",wx:"chữ thầy đồ quê vào sách ngự",lx:"viện cho là chuyện nhà, người ta bảo ngươi kéo cha vào, tiếng tăm sứt mẻ",rt:"Lời tựa của cha được in, nét chữ già mà vững.",rf:"Viện từ chối khéo."}]},
 c2:{h:"{v} sau cùng",w:"v",need:["v"],t:"{v} đứng trước cửa cung ngươi lúc chạng vạng, không vào. Nàng chỉ gửi vào một bài thơ, lời lẽ như xin hòa.",o:[
  {n:"Họa lại một bài",sc:1,f:"peace",wx:"hai cung thôi đối đầu",lx:"người ta bảo ngươi mềm, tiếng tăm sứt mẻ",go:(A,ok)=>{rdRel(A,"v",ok?15:-4)},rt:"{v} đọc bài họa, khóc.",rf:"{v} đọc xong, xé đôi."},
  {n:"Gửi trả bài thơ",wx:"không mắc nợ",lx:"ngồi viết lời trả mấy lần, hao sức; {v} thấy bị khinh",go:A=>{rdOan(A,"v",6)},rt:"Bài thơ về lại cung {v}."},
  {n:"Đem bài thơ lên Hoàng hậu",need:["hh"],sc:1,wx:"Hoàng hậu thấy ngươi minh bạch",lx:"Hoàng hậu ngại chuyện cũ, phật lòng",go:A=>{rdOan(A,"v",8)},rt:"Hoàng hậu giữ bài thơ.",rf:"Hoàng hậu bảo đừng làm lớn."}]},
 t1:{h:"Cha ở kinh",w:"maid",t:"Cha nhắn: ông muốn về làng trước khi chiếu ban. “Cha đến để nhìn bảng, không phải để nhận ơn.”",o:[
  {n:"Giữ cha ở lại đến ngày ban chiếu",wx:"cha thấy con được phong",lx:"tốn bạc giữ cha ở trọ; cha ngại ở lâu",rt:"Cha ở lại, ngày nào cũng ngồi trước cửa viện."},
  {n:"Để cha về",wx:"cha giữ được cái thanh",lx:"tiễn cha ra cổng, lòng mỏi, hao sức; cha không thấy ngày ấy",rt:"Ngươi tiễn cha bằng một bài thơ."},
  {n:"Xin Hoàng thượng gặp cha",sc:1,f:"meet",wx:"thầy đồ quê được vào chầu",lx:"ngài thấy ngươi đòi hỏi, Hoàng thượng phật ý",rt:"Hoàng thượng hỏi cha về sách, cha đáp không run một chữ.",rf:"Ngài bảo không có lệ ấy."}]},
 x1:{h:"Chiếu Ngự tuyển",w:"emp",t:"Hoàng thượng cầm chiếu, hỏi ngươi lần cuối: “Danh Tài nữ, nàng muốn gì đi kèm?”",o:[
  {n:"Xin chỉ danh, không xin gì thêm",e:["win","mid"],rt:"Chiếu ban: ngươi là Tài nữ của Đại Hy.",rf:"Chiếu ban danh hiệu cho người khác, ngươi được một dòng khen."},
  {n:"Xin ban chữ cho trường làng của cha",e:["win","mid"],lx:"danh của ngươi nhường chỗ cho tên cha",rt:"Chiếu ban danh Tài nữ, kèm biển ngự bút cho trường làng.",rf:"Ngài ban biển cho trường, danh hiệu để sau."},
  {n:"Xin xóa hẳn tiếng đạo thơ cho cả {v}",e:["win","lose"],rt:"Hoàng thượng khen: “Tài mà độ lượng.” Chiếu ban danh Tài nữ.",rf:"Ngài thấy ngươi bao che kẻ vu. Chiếu gác lại."}]}},
 E:{win:{k:1,tag:"Tài nữ của Đại Hy",w:"emp",gi:["nghien","emp"],t:"Chiếu ban: ngươi là Tài nữ của Đại Hy. Tập Ngự tuyển in tên ngươi và tên người thầy đồ đã dạy ngươi chữ. Ở trường làng, trò nhỏ đọc thơ ngươi mỗi sáng."},
  mid:{k:0,tag:"Thơ có tên, danh hiệu không",t:"Thơ ngươi có trong tập Ngự tuyển, người đọc nhớ. Danh Tài nữ về tay người khác, nhưng không ai còn gọi ngươi là kẻ chép thơ."},
  lose:{k:-1,tag:"Gác bút",t:"Chiếu gác lại, tiếng đạo thơ không rửa hết. Ngươi vẫn là phi tần của Hoàng thượng, nhưng từ đó không còn đề thơ trên quạt."}}});
RD97L.push(rdRare({a:"thd_tho_11",tag:"Ngươi biên tập Ngự tuyển thi tập",w:"emp",n:"Xin Hoàng thượng cho ngươi tự tay biên tập Ngự tuyển",
 path:["Chọn bài viết cho cha","Nhận viết đề tựa","Xin để cha viết","Họa lại một bài","Xin Hoàng thượng gặp cha","Dâng Hoàng thượng một bài mới"],bad:["Gửi trả bài thơ","Thôi tranh"],x:[()=>S.tai>=RR("thd_tho_11").bar,"Tài từ "+RR("thd_tho_11").bar],
 t:"Hoàng thượng đặt cả chồng thơ trước mặt ngươi: “Hàn lâm viện chọn thơ theo tên người. Nàng chọn thơ theo chữ.” Tập Ngự tuyển ra đời dưới tay ngươi, có thơ phi tần, có thơ cung nữ, có cả mấy câu của một thầy đồ làng.",
 rw:"nt_nhuy",ti:"Người biên Ngự tuyển thi tập"}));
