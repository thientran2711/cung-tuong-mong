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
