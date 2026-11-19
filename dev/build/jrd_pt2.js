/* ================= jrd_pt2: Phù Tang's roads, writer 2 — pt_tang · Tăng sư vượt biển and pt_dang · Hải tặc và thương nhân (ROAD_MAP §4.5c) =================
   Same shape as jrd_pt.js: .4 premise arc ARC67.<id> via ptArc (o:"pf", BAL.arc.fx) + rdDef .5–.11 (BAL.road.fx) + PT97 .4 rare + RD97L .11 rare.
   Uses the shared books of jrd_pt.js: PTP / ptP / ptAlive / ptMove / ptKill / ptMeet / ptMan / ptWhere (people, law 6b) and ptO (objects, law 6c).
   Numbers: the writer-2 block of jbalpt.js (ONE CORE). */

/* =====================================================================================================================================
   pt_tang · Tăng sư vượt biển (Tín ngưỡng · Nhân từ). People: {emp}, {v}, {maid}; Tịnh Viên (PTP.tinhvien, Phù Tang monk, kinh → chùa / ngục / sea),
   Pháp sư Trí Viễn (PTP.trivien, Đại Hy master, the Ganjin shape: kinh ⇄ bến Minh Châu, eyes fail at .7), unnamed: viên quan Từ bộ, Quán chủ Thái Thanh quán,
   Minh Châu thứ sử. Objects (PTO): hopkinh (the sutra case), hatgiong (tea seeds), dodiep (Tịnh Viên's ordination paper), xaloi (the relic urn),
   daotang (her dowry sword from {pv}), thuthay (Trí Viễn's letter of vow). Chapter flags: phap (open faith) · le (the court's way) · tu (quiet / private).
   GE intents: ge1 Người dựng giới đàn (the temple she founds), ge2 Đôi mắt của thầy (mercy, she cares for the master),
   ge3 Kinh đổi lấy quyền (faith used as a lever, the Đạo faction framed), ge4 Thầy sang bể (the master crosses to {land}).
   ===================================================================================================================================== */
const PTTVK=()=>ptAlive("trivien")&&ptP("trivien","w")==="kinh";/* the master is in the capital and can act there */
const PTTNK=()=>ptAlive("tinhvien")&&ptP("tinhvien","w")==="kinh";/* Tịnh Viên is free in the capital */
const PTKINH=()=>({ta:"Hộp kinh khóa đồng vẫn nằm trong rương của ngươi.",tinhvien:"Hộp kinh khóa đồng vẫn trong tay Tịnh Viên.",chua:"Hộp kinh khóa đồng đặt trên án chùa Pháp Vân.",kho:"Hộp kinh khóa đồng nằm trong kho Nội vụ phủ, có niêm phong."})[ptO("hopkinh")]||"";
RTHEME67.pt_tang="court";
ARC67.pt_tang=ptArc("pt_tang",{o:"pf",t:"Lời thỉnh bên kia bể",w:"emp",sj:"lời thỉnh thầy sang {land}",cast(A){ptMeet("tinhvien");if(!ptO("hopkinh"))ptO("hopkinh","tinhvien");return rdCast(A,["v"])},
 g:"Tăng sư Tịnh Viên theo sứ đoàn {land} sang học đạo đã mười năm. Nay y xin gặp ngươi: {pv} nhờ y thỉnh một bậc thầy giới luật về truyền giới bên kia bể. Người y chọn là Pháp sư Trí Viễn ở chùa Pháp Vân, mà phép Đại Hy cấm tăng nhân tự ý vượt biển.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tăng sư ngoài cửa cung",w:"maid",t:"{maid} vào báo: một tăng sư {land} đứng chờ ngoài cửa cung đã ba ngày, tay ôm hộp kinh khóa đồng, không chịu nói với ai ngoài ngươi.",o:[
  {n:"Mời Tịnh Viên vào, nghe y nói hết",f:"phap",wx:"biết rõ lời thỉnh của {pv}",lx:"cung nhân đồn ngươi tiếp tăng lạ",rt:"Tịnh Viên lạy ba lạy, kể chuyện bên kia bể chùa nhiều mà chưa có giới đàn.",rf:"Y nói nửa chừng thì thái giám gác cửa vào giục."},
  {n:"Sai {maid} ra nhận thư, hẹn gặp ở chùa",f:"le",wx:"không ai bắt được lỗi",lx:"Tịnh Viên phải chờ thêm",rt:"{maid} mang về một lá thư viết bằng chữ Hán rất ngay ngắn."},
  {n:"Bảo y trình lời thỉnh qua Hồng Lư tự",f:"tu",wx:"việc đi đúng đường quan",lx:"lời thỉnh qua nhiều tay",rt:"Tịnh Viên cúi đầu, ôm hộp kinh đi về phía Hồng Lư tự."}]},
 s2:{h:"Thư của {mh}",w:"maid",t:"Thuyền sứ mang thư {mh} sang: “Bên này người xuất gia nhiều, mà không ai truyền giới cho đúng phép. {pv} đêm nào cũng hỏi đến chuyện ấy.”",o:[
  {n:"Hồi thư hứa sẽ giúp",f:"phap",wx:"{mh} yên lòng",lx:"một lời hứa khó giữ",rt:"Ngươi viết hồi thư bằng giọng con gái, không bằng giọng công chúa."},
  {n:"Đưa thư cho Hoàng thượng xem",f:"le",wx:"ngài biết ngươi không giấu",lx:"thư nhà thành chuyện của triều",rt:"Ngài đọc xong, gõ ngón tay lên án: “Bên ấy muốn thầy, hay muốn cả kinh sách?”",rf:"Ngài đặt thư xuống, không nói gì."},
  {n:"Cất thư, lặng lẽ hỏi về Pháp sư Trí Viễn",f:"tu",wx:"biết người trước khi xin",lx:"chậm một mùa gió",rt:"{maid} dò được: thầy giữ giới rất nghiêm, đã từng từ chối chức Tăng chính."}]},
 c1:{h:"{v} nói về tăng lạ",w:"v",need:["v"],t:"Trong buổi thỉnh an, {v} nói như vô tình: “Nghe đâu cung công chúa {land} có tăng lạ ra vào. Chẳng biết là tăng, hay là người dò đường của bể.”",o:[
  {n:"Mời {v} cùng nghe Tịnh Viên giảng kinh",wx:"{v} không còn cớ nói mập mờ",lx:"{v} nghe được việc của ngươi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} ngồi nghe trọn một quyển, ra về không nói gì nữa.",rf:"{v} ngáp giữa buổi giảng, ra về kể là tăng ấy nói tiếng lạ."},
  {n:"Đáp: y có độ điệp của Từ bộ, ai cũng xem được",wx:"lời đồn dừng lại",lx:"độ điệp phải đưa ra",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return ptO("dodiep","tinhvien")},rt:"{v} mím môi. Độ điệp của Tịnh Viên có ấn Từ bộ rõ ràng."},
  {n:"Cười: cung {v} cũng có đạo sĩ ra vào đấy thôi",wx:"trả lại đúng lời ấy",lx:"{v} ghi thêm một mối",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Cả điện cười khẽ. {v} đỏ mặt, đổi sang chuyện hoa."}]},
 c2:{h:"Viên quan Từ bộ",w:"emp",t:"Viên quan Từ bộ coi việc tăng ni sai người đến hỏi: độ điệp của Tịnh Viên chỉ cho trú học, mùa gió tới là hết hạn.",o:[
  {n:"Bỏ bạc lo gia hạn độ điệp",wx:"Tịnh Viên ở lại được",lx:"bạc ra",rt:"Độ điệp có thêm một dấu son.",go:()=>ptO("dodiep","tinhvien")},
  {n:"Nhờ sứ thần {land} viết thư bảo lãnh",wx:"giấy tờ đàng hoàng",lx:"sứ đoàn biết ngươi lo việc chùa",rt:"Thư bảo lãnh đến Từ bộ trước mùa gió.",rf:"Thư đi mà Từ bộ chưa trả lời.",go:()=>ptO("dodiep","tinhvien")},
  {n:"Bảo Tịnh Viên tự đến Từ bộ trình bày",wx:"không ai nói ngươi xen việc chùa",lx:"y một mình trước quan",rt:"Tịnh Viên ngồi chờ ở Từ bộ từ sáng đến tối, rồi được cho ở lại.",go:()=>ptO("dodiep","tinhvien")}]},
 t1:{h:"Pháp sư Trí Viễn",w:"emp",t:"Ngươi theo xa giá đến dâng hương chùa Pháp Vân. Pháp sư Trí Viễn đã ngoài sáu mươi, mắt đã mờ, ngồi nghe tiếng ngươi mà hỏi: “Bên ấy người muốn học, hay chỉ vua muốn có thầy?”",o:[
  {n:"Thưa thật: dân bên ấy khát pháp",f:"phap",wx:"thầy thấy ngươi nói thật",lx:"thầy biết việc nặng hơn ngươi nói",rt:"Thầy lần tràng hạt rất lâu: “Biển thì xa, mà lòng người thì gần.”",rf:"Thầy lặng đi: “Lòng người không qua biển bằng một lời.”",go:()=>ptMeet("trivien")},
  {n:"Thưa: {pv} muốn có giới đàn cho đúng phép",f:"le",wx:"thầy thấy việc có danh phận",lx:"thầy e đó chỉ là việc của vua",rt:"Thầy gật đầu: “Có phép thì có người giữ phép.”",go:()=>ptMeet("trivien")},
  {n:"Mời thầy uống trà, chưa nói việc thỉnh",f:"tu",wx:"thầy bớt đề phòng",lx:"chưa xong việc",rt:"Thầy khen trà {land} đắng mà ngọt hậu, hỏi ngươi hạt giống từ đâu.",go:()=>ptMeet("trivien")}]},
 x1:{h:"Trước ngự tọa",w:"emp",t:"Buổi chầu sớm, Hoàng thượng hỏi ngay trước triều: “Một cao tăng của Đại Hy, cớ gì phải vượt biển làm thầy cho nước khác?” Quan Từ bộ cúi đầu chờ. Tịnh Viên quỳ ở cuối điện.",o:[
  {n:"Tâu xin ban chiếu cho thầy sang bể, như một ân của Đại Hy",e:["win","lose"],rt:"Hoàng thượng trầm ngâm rồi phán: “Thầy muốn đi, Đại Hy không cản. Đợi gió.”",rf:"Quan Từ bộ tâu: “Tăng nhân xuất cảnh, xưa nay chưa có lệ.” Ngài phẩy tay bãi chầu."},
  {n:"Tâu xin cho Tịnh Viên ở lại chùa Pháp Vân học giới luật trước",e:["win2","mid"],rt:"Ngài chuẩn. Tịnh Viên được vào chùa Pháp Vân làm đệ tử của thầy.",rf:"Ngài chỉ nói: “Để Từ bộ xét.”"},
  {n:"Thưa: việc nhà chùa, thiếp không dám xin",e:"mid",lx:"lời thỉnh của {pv} còn treo",rt:"Ngài gật đầu. Tịnh Viên lạy rồi lui ra."}]}},
 E:{win:{tag:"Một lời của Đại Hy",w:"emp",t:"Cả triều biết Hoàng thượng đã hứa không cản. Từ nay chùa Pháp Vân có một con đường ra bể, và con đường ấy đi qua cung ngươi."},
  win2:{tag:"Đệ tử bên kia bể",w:"emp",t:"Tịnh Viên vào chùa Pháp Vân học giới luật. Thầy Trí Viễn hỏi thăm ngươi qua mỗi lá thư của y."},
  mid:{tag:"Lời thỉnh còn treo",t:"Lời thỉnh của {pv} vẫn nằm đó. Tịnh Viên vẫn đến chùa mỗi sáng, và vẫn chờ."},
  lose:{tag:"Tăng lạ trong cung",w:"v",t:"{v} kể khắp hậu cung: công chúa {land} giấu tăng lạ, định đưa người của Đại Hy sang bể."}}});
PT97.push({a:"pt_tang",tag:"Ngọn đèn trước tượng",w:"emp",n:"Thắp đèn trước tượng, nguyện ăn chay ba năm thay cho chuyến đi của thầy",
 path:["Mời Tịnh Viên vào","Hồi thư hứa","cùng nghe Tịnh Viên giảng","Thưa thật: dân bên ấy","Tâu xin ban chiếu"],bad:["Thưa: việc nhà chùa","Bảo Tịnh Viên tự đến"],x:[()=>S.duc>=BAL.arc.rare.pt_tang.bar,`Đức từ ${BAL.arc.rare.pt_tang.bar}`],
 t:"Ngươi không tâu thêm lời nào, chỉ xin đến chùa Pháp Vân thắp một ngọn đèn trước tượng và nguyện ăn chay ba năm. Đèn cháy suốt bảy ngày không tắt dù gió bể thổi vào. Hoàng thượng nghe chuyện, sai mang đến chùa một bức hoành tự tay ngài viết: “Đèn qua bể”.",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_nhuy",ti:"Ngọn đèn qua bể"});

rdDef("pt_tang",5,{t:"Một khoang thuyền",w:"emp",sj:"khoang thuyền dành cho {land}",cast(A){if(!ptO("hatgiong"))ptO("hatgiong","ta");return rdCast(A,["v"])},
 g:"Thuyền sứ {land} sắp về theo gió mùa. Hoàng thượng cho ngươi một khoang để gửi quà về cố quốc. Thầy Trí Viễn muốn khoang ấy chở kinh sách đã chép, Tịnh Viên muốn chở hạt giống trà và thuốc, còn nhà {v} xin chở lụa.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thầy gửi lời",w:"maid",if:()=>RDW(1)()&&rdPrev()!=="win2",t:"Thầy Trí Viễn gửi lời qua Tịnh Viên: “Một khoang kinh đến trước, giới đàn dựng sau mới có gốc. Người đi sau mà kinh không có, thì giới truyền bằng miệng.”",o:[
  {n:"Nhận lời thầy, xếp kinh sách vào khoang",f:"phap",wx:"thầy thấy ngươi giữ lời",lx:"khoang chật, quà nhà ít đi",rt:"Mười rương kinh chép tay được buộc dây gai, đánh dấu chữ “Pháp”."},
  {n:"Xin thầy cho chép thêm, gửi chuyến sau",f:"le",wx:"kinh đủ bộ mới gửi",lx:"chậm một mùa gió",rt:"Thầy gật đầu: “Chậm mà đủ còn hơn nhanh mà thiếu.”"},
  {n:"Tự tay chép một quyển gửi kèm",f:"tu",wx:"có một quyển của chính ngươi",lx:"mất nhiều đêm",rt:"Ngươi chép quyển Phạm Võng dưới đèn mười đêm liền.",rf:"Mắt mỏi, ngươi chép sai ba chữ, phải chép lại."}]},
 s2:{h:"Tịnh Viên học xong mùa đầu",w:"maid",if:()=>rdPrev()==="win2",t:"Tịnh Viên đã học xong mùa đầu ở chùa Pháp Vân. Y xin ngươi cho khoang thuyền chở hạt giống trà trên đồi chùa: “Có trà, người tu bên ấy mới thức mà tụng kinh.”",o:[
  {n:"Cho y mang hạt giống trà",f:"phap",wx:"Tịnh Viên được việc",lx:"khoang kinh bớt đi",rt:"Hai bao hạt trà khô được đặt cạnh rương kinh.",go:()=>ptO("hatgiong","tinhvien")},
  {n:"Xin thầy chọn giúp",f:"le",wx:"không ai nói ngươi thiên vị",lx:"thầy phải lo thêm việc",rt:"Thầy chọn nửa kinh, nửa trà."},
  {n:"Giữ hạt giống, trồng thử trong cung trước",f:"tu",wx:"biết hạt có sống không",lx:"trà phải chờ năm sau",rt:"{maid} gieo hạt trong chậu sứ dưới hiên.",go:()=>ptO("hatgiong","ta")}]},
 s3:{h:"Thầy không gửi lời",w:"maid",if:RDW(0),t:"Từ buổi chầu ấy, thầy Trí Viễn không gửi lời nào. Tịnh Viên nói thầy không giận, chỉ là thầy không muốn ngươi khó xử trước triều.",o:[
  {n:"Tự đến chùa Pháp Vân hỏi ý thầy",f:"phap",wx:"thầy thấy ngươi vẫn lo việc",lx:"người ta thấy ngươi ra chùa",rt:"Thầy nói một câu: “Kinh trước, người sau.”"},
  {n:"Nhờ Tịnh Viên hỏi giúp",f:"le",wx:"không ồn ào",lx:"lời qua miệng người khác",rt:"Tịnh Viên mang về một danh mục kinh thầy muốn gửi."},
  {n:"Chọn quà theo ý mình",f:"tu",wx:"việc xong nhanh",lx:"thầy không được hỏi",rt:"Ngươi chọn kinh chép tay và mấy bức thư nhà."}]},
 c1:{h:"Nhà {v} xin khoang thuyền",w:"v",need:["v"],t:"{v} cho người đến nói khéo: nhà nàng ta có hai mươi xấp lụa muốn gửi sang {land} bán, chỉ cần nửa khoang thuyền của ngươi.",o:[
  {n:"Nhường nửa khoang cho lụa nhà {v}",wx:"{v} nợ ngươi một lần",lx:"kinh sách bớt chỗ",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gửi sang một hộp trà sen cảm ơn."},
  {n:"Từ chối: khoang thuyền là ân của Hoàng thượng, không để buôn",wx:"không ai nói ngươi buôn bán",lx:"{v} mất một mối lời",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Người nhà {v} ra về không chào."},
  {n:"Chỉ nhà {v} sang thuê thuyền buôn Tân La",wx:"cả hai cùng xong việc",lx:"mất công lo hộ",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Nhà {v} thuê được thuyền Tân La, còn rẻ hơn.",rf:"Thuyền Tân La đòi giá cao, nhà {v} cho là ngươi chỉ sai chỗ."}]},
 c2:{h:"Nội vụ phủ kiểm hàng",w:"emp",t:"Nội vụ phủ đến kiểm khoang thuyền. Quan coi kho nói: kinh sách của Đại Hy là của quý, mang ra khỏi nước phải có chỉ.",o:[
  {n:"Xin Hoàng thượng một tờ chỉ cho kinh sách",wx:"giấy tờ đủ",lx:"ngài thấy ngươi đòi nhiều",rt:"Ngài phê: “Kinh là để người đọc.”",rf:"Ngài nói: “Đợi qua mùa.”"},
  {n:"Bỏ bạc nhờ quan coi kho làm sổ cho nhanh",wx:"hàng xuống thuyền đúng hẹn",lx:"bạc ra, lại có người nắm thóp",rt:"Sổ ghi rõ: kinh chép tay, không phải bản gốc."},
  {n:"Để lại hộp kinh khóa đồng trong kho làm tin",wx:"Nội vụ phủ yên lòng",lx:"hộp kinh nằm trong kho",rt:"Hộp kinh khóa đồng được niêm phong trong kho Nội vụ phủ.",go:()=>ptO("hopkinh","kho")}]},
 t1:{h:"Hoàng thượng hỏi khoang thuyền",w:"emp",t:"Đêm ấy Hoàng thượng hỏi: “Khoang thuyền trẫm cho, nàng định gửi gì về cho {pv}?”",o:[
  {n:"Thưa: gửi kinh, để {land} có giới đàn",f:"phap",wx:"ngài thấy ngươi không lo riêng",lx:"ngài nghĩ ngươi lo cho bên kia nhiều hơn",rt:"Ngài cười: “Nàng gửi kinh của trẫm đi làm quà cho cha nàng.”",rf:"Ngài im lặng: “Nàng nhớ bên ấy lắm.”"},
  {n:"Thưa: gửi hạt giống, để bên ấy trồng được trà",f:"le",wx:"ngài thấy món quà nhỏ mà lâu dài",lx:"ngài cho là việc vặt",rt:"Ngài gật: “Cây sống lâu hơn sách.”"},
  {n:"Xin ngài chọn giúp",f:"tu",wx:"ngài vui vì được hỏi",lx:"việc theo ý ngài",rt:"Ngài chọn kinh, rồi thêm một bức thư của chính ngài."}]},
 x1:{h:"Ngày thuyền nhổ neo",w:"emp",t:"Thuyền sắp nhổ neo. Danh mục khoang thuyền phải trình lên Nội vụ phủ trước giờ Thìn. Thầy Trí Viễn, Tịnh Viên và người nhà {v} đều chờ ở cửa cung.",o:[
  {n:"Trình danh mục: cả khoang là kinh sách",e:["win","lose"],rt:"Mười rương kinh xuống thuyền. Thầy Trí Viễn chắp tay về phía cung ngươi.",rf:"Nội vụ phủ giữ lại sáu rương vì thiếu chỉ. Thuyền đi với bốn rương."},
  {n:"Trình danh mục: nửa kinh, nửa hạt giống trà",e:["win2","mid"],rt:"Kinh và trà cùng xuống thuyền. Tịnh Viên viết thư dặn bên kia gieo hạt ở núi có sương.",rf:"Hạt giống bị ẩm, Tịnh Viên phải giữ lại một nửa.",go:(A,ok)=>{if(ok)ptO("hatgiong","tn");return""}},
  {n:"Nhường khoang cho hàng của triều",e:"mid",lx:"thầy không gửi được gì",rt:"Khoang thuyền chở lụa và đồ sứ của Nội vụ phủ."}]}},
 E:{win:{tag:"Kinh qua bể",w:"emp",t:"Kinh sách Đại Hy sang {land} trước thầy. {mh} viết thư: chùa nào cũng xin chép lại."},
  win2:{tag:"Kinh và trà",w:"emp",t:"Thuyền chở cả kinh lẫn hạt trà. Thầy Trí Viễn nói: “Có trà thì người tu không ngủ gục.”"},
  mid:{tag:"Khoang thuyền của triều",t:"Thuyền đi, khoang của ngươi chở hàng của triều. Thầy vẫn chờ một chuyến khác."},
  lose:{tag:"Kinh bị giữ lại",w:"v",t:"Sáu rương kinh nằm lại kho Nội vụ phủ. {v} nói ngươi định lén mang của quý Đại Hy ra nước ngoài."}}});

rdDef("pt_tang",6,{t:"Chuyến vượt biển bị chặn",w:"emp",sj:"chuyến đi lén của thầy Trí Viễn",cast(A){if(ptP("trivien","w")==="kinh"){ptMove("trivien","cang");ptMove("tinhvien","cang")}return rdCast(A,["v"])},
 g:"Không đợi chỉ, thầy Trí Viễn cùng Tịnh Viên lặng lẽ xuống bến Minh Châu, thuê một thuyền buôn ra bể. Đêm trước ngày đi, một đệ tử nhỏ sợ thầy chết đuối, chạy đi báo quan. Minh Châu thứ sử giữ thuyền, giam thầy trong chùa bến. Tin về kinh trong ba ngày.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của Tịnh Viên",w:"maid",if:RDW(1),t:"Thư Tịnh Viên viết vội từ chùa bến: “Thầy không trách ai. Thầy chỉ nói: lần này không được thì lần sau.” Dưới thư có dấu tay của thầy.",o:[
  {n:"Gửi thuốc và áo ấm xuống chùa bến",f:"phap",wx:"thầy biết ngươi không bỏ",lx:"người ta biết ngươi dính vào",rt:"Áo ấm đến chùa bến trước đợt gió lạnh."},
  {n:"Tâu ngay với Hoàng thượng",f:"le",wx:"ngài nghe từ ngươi trước",lx:"ngài giận vì việc lén",rt:"Ngài nghe hết, chỉ hỏi: “Thầy có sao không?”",rf:"Ngài đập tay xuống án: “Trẫm đã hứa, sao còn đi lén?”"},
  {n:"Sai {maid} dò xem ai đã báo quan",f:"tu",wx:"biết kẻ trong chùa",lx:"việc dò người dễ lộ",rt:"{maid} dò ra: đệ tử nhỏ ấy là cháu một viên quan Từ bộ."}]},
 s2:{h:"Tin dữ từ bến",w:"maid",if:RDW(0),t:"Người đưa tin nói: thầy Trí Viễn bị giữ, Tịnh Viên bị trói ở cửa chùa bến như kẻ dụ dỗ người Đại Hy ra nước ngoài.",o:[
  {n:"Gửi bạc xuống bến lo cho Tịnh Viên",f:"phap",wx:"Tịnh Viên được cởi trói",lx:"bạc ra",rt:"Thứ sử nhận bạc, cho Tịnh Viên ngồi trong chùa với thầy."},
  {n:"Xin Từ bộ cho người xuống xét",f:"le",wx:"việc theo phép",lx:"chậm",rt:"Từ bộ cử một viên chủ sự xuống Minh Châu."},
  {n:"Viết thư cho thứ sử bằng lời công chúa",f:"tu",wx:"thứ sử phải nể",lx:"thư thành chứng ngươi dính vào",rt:"Thứ sử trả lời: sẽ hậu đãi hai vị tăng.",rf:"Thứ sử giữ thư lại, không trả lời."}]},
 c1:{h:"Đệ tử nhỏ",w:"maid",t:"Đệ tử nhỏ báo quan quỳ khóc ở cổng chùa Pháp Vân. Nó nói nó chỉ sợ thầy chết, không muốn hại thầy.",o:[
  {n:"Cho người đón nó về chùa, không trách",wx:"chùa yên, thầy vui",lx:"kẻ báo quan không bị phạt",rt:"Đệ tử nhỏ quét sân chùa từ sáng đến tối, không dám ngẩng đầu."},
  {n:"Bắt nó khai ai xui nó báo quan",wx:"biết kẻ đứng sau",lx:"nó sợ, nói lung tung",rt:"Nó khai: một viên quan Từ bộ hứa cho nó độ điệp.",rf:"Nó khóc quá, không nói được gì."},
  {n:"Đưa nó vào cung làm tiểu thái giám, xa chùa",wx:"không còn ai nhắc chuyện",lx:"người ta nói ngươi giấu người làm chứng",rt:"Đệ tử nhỏ theo {maid} vào cung."}]},
 c2:{h:"{v} dâng lời",w:"v",need:["v"],t:"{v} tâu với Hoàng hậu: công chúa {land} dụ một cao tăng Đại Hy bỏ nước. Lén xuất cảnh là tội, kẻ đứng sau còn nặng hơn.",o:[
  {n:"Xin Hoàng hậu cho đối chất ngay",wx:"không để lời đồn đi trước",lx:"phải đứng trước mặt {v}",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Ngươi đưa thư của thầy ra: thầy tự đi, không ai dụ.",rf:"Hoàng hậu nói: “Thư ấy ai viết cũng được.”"},
  {n:"Im lặng, để Hoàng thượng phán",wx:"không cãi nhau trong hậu cung",lx:"{v} nói được nhiều hơn",rt:"Hoàng hậu không xét thêm, chờ ý ngài."},
  {n:"Cho người khơi chuyện nhà {v} từng buôn lụa lậu qua bể",wx:"{v} phải lo cho nhà mình",lx:"ngươi dùng cách của {v}",go:(A,ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hậu cung quay sang bàn chuyện lụa nhà {v}.",rf:"Không ai tin chuyện lụa lậu."}]},
 t1:{h:"Hoàng thượng hỏi tội",w:"emp",t:"Hoàng thượng gọi ngươi đến Ngự thư phòng. Tấu của Minh Châu thứ sử đặt trên án: “Tăng nhân Trí Viễn lén xuất cảnh, đồng đảng là tăng {land} Tịnh Viên.”",o:[
  {n:"Thưa: thầy đi vì lời nguyện, không vì ai",f:"phap",wx:"ngài thấy lòng thầy",lx:"ngài thấy ngươi bênh thầy",rt:"Ngài đọc lại tấu, rồi nói: “Lời nguyện của tăng, triều không xử được.”",rf:"Ngài nói: “Nguyện thì nguyện, phép nước thì phép nước.”"},
  {n:"Thưa: thiếp có lỗi không giữ được thầy",f:"le",wx:"ngài thấy ngươi nhận phần mình",lx:"tội chia về ngươi",rt:"Ngài nhìn ngươi lâu rồi nói: “Nàng nhận lỗi, trẫm còn phạt ai?”"},
  {n:"Thưa: có người trong Từ bộ cố tình ép thầy phải đi lén",f:"tu",wx:"ngài nghi Từ bộ",lx:"phải có chứng",rt:"Ngài cho gọi viên quan Từ bộ đến hỏi.",rf:"Ngài hỏi: “Chứng đâu?”"}]},
 x1:{h:"Chiếu về Minh Châu",w:"emp",t:"Trước khi chiếu về Minh Châu được viết, Hoàng thượng cho ngươi nói một lời.",o:[
  {n:"Xin cho thầy và Tịnh Viên về lại chùa Pháp Vân, không truy tội",e:["win","lose"],rt:"Chiếu viết: “Cao tăng tuổi già, lòng cầu đạo, tha.” Hai vị tăng được đưa về kinh.",rf:"Ngài nói: “Thầy thì tha. Tăng {land} phải giữ lại để răn.”"},
  {n:"Xin ngài cấp giấy cho thầy đi chuyến sau, đúng phép",e:["win2","mid"],rt:"Ngài cho Từ bộ làm giấy xuất cảnh, đợi mùa gió năm sau.",rf:"Ngài nói: “Về đã, rồi xét.”"},
  {n:"Thưa: để Minh Châu xử theo phép",e:"mid",lx:"thầy về kinh dưới mắt Từ bộ",rt:"Thứ sử cho hai vị tăng về kinh, có lính đi kèm."}]}},
 E:{win:{tag:"Tha cho người cầu đạo",w:"emp",t:"Thầy và Tịnh Viên về lại chùa Pháp Vân. Ai cũng biết lời xin là của ngươi.",go:()=>{ptMove("trivien","kinh");ptMove("tinhvien","kinh");return""}},
  win2:{tag:"Một tờ giấy xuất cảnh",w:"emp",t:"Từ bộ làm giấy cho thầy đi chuyến sau. Thầy gửi ngươi một lá thư nguyện, nét chữ đã run.",go:()=>{ptMove("trivien","kinh");ptMove("tinhvien","kinh");ptO("thuthay","ta");return""}},
  mid:{tag:"Về dưới mắt Từ bộ",t:"Hai vị tăng về kinh, có người của Từ bộ đứng ở cổng chùa ngày đêm.",go:()=>{ptMove("trivien","kinh");ptMove("tinhvien","kinh");return""}},
  lose:{tag:"Tăng {land} bị giam",w:"v",t:"Tịnh Viên bị giam ở ngục Minh Châu. Thầy Trí Viễn không chịu về kinh, ngồi lại chùa bến tụng kinh cho y.",go:()=>{ptMove("tinhvien","nguc");return""}}}});

rdDef("pt_tang",7,{t:"Mắt thầy",w:"maid",sj:"đôi mắt của thầy Trí Viễn",cast(A){if(ptAlive("trivien")&&ptP("trivien","w")!=="kinh"){ptMove("trivien","kinh");RD_FL("pt_tang.tvve",1)}
  if(ptAlive("tinhvien")&&ptP("tinhvien","w")!=="kinh"){ptMove("tinhvien","kinh");RD_FL("pt_tang.tnve",1)}return rdCast(A,["v"])},
 g:()=>(RD_FL("pt_tang.tvve")?"Thầy Trí Viễn bị cảm gió ở chùa bến, Từ bộ cho khiêng về kinh. ":"")+(RD_FL("pt_tang.tnve")?"Tịnh Viên được tha khỏi ngục Minh Châu để theo hầu thầy. ":"")+"Sau chuyến gió bể, thầy sốt ba ngày, mở mắt ra chỉ thấy một màn sương. Ngự y nói mắt thầy còn cứu được nếu chữa ngay; Tịnh Viên nói bên {land} có phép chườm lá. Ngoài chùa, người ta bắt đầu nói: thầy bỏ nước nên Phật phạt.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thầy hỏi tiếng ngươi",w:"maid",if:RDW(1),t:"Ngươi đến chùa Pháp Vân. Thầy ngồi bên cửa sổ, quay mặt về phía ánh sáng, nghe bước chân mà gọi đúng tên ngươi.",o:[
  {n:"Ngồi lại đọc kinh cho thầy nghe",f:"phap",wx:"thầy yên lòng",lx:"cung ngươi vắng chủ cả ngày",rt:"Thầy lần theo từng câu, sửa cho ngươi hai chữ đọc sai."},
  {n:"Xin Hoàng thượng cho ngự y đến chùa",f:"le",wx:"thầy có người chữa giỏi",lx:"ngài thấy ngươi lo việc chùa quá nhiều",rt:"Ngự y đến ngay chiều ấy.",rf:"Ngài nói: “Thái y viện chữa cho cung, không chữa cho chùa.”"},
  {n:"Sai {maid} ở lại chùa hầu thuốc",f:"tu",wx:"thầy có người hầu sát bên",lx:"ngươi thiếu người trong cung",rt:"{maid} sắc thuốc ba lần mỗi ngày."}]},
 s2:{h:"Chùa đóng cửa",w:"maid",if:RDW(0),t:"Từ bộ cho đóng cửa chùa Pháp Vân, không tiếp khách, nói là để thầy dưỡng bệnh. Tịnh Viên đứng sau cổng nhìn ra.",o:[
  {n:"Xin Từ bộ cho vào thăm",f:"le",wx:"cửa chùa mở cho ngươi",lx:"Từ bộ ghi tên ngươi",rt:"Viên quan Từ bộ miễn cưỡng mở cổng.",rf:"Viên quan Từ bộ nói: “Lệnh trên.”"},
  {n:"Gửi thuốc qua cổng sau",f:"tu",wx:"thuốc đến tay thầy",lx:"việc lén lút",rt:"Tịnh Viên nhận gói thuốc qua khe cổng."},
  {n:"Đứng ngoài cổng tụng kinh cùng các tăng",f:"phap",wx:"cả chùa thấy ngươi",lx:"người ta bàn tán",rt:"Tiếng tụng kinh trong ngoài hòa làm một."}]},
 c1:{h:"Phép chườm lá của {land}",w:"maid",t:"Tịnh Viên nói bên {land} chữa đau mắt bằng cách chườm lá ngải hơ nóng, mỗi đêm một lần. Ngự y bảo đó là phép nhà quê.",o:[
  {n:"Cho Tịnh Viên chườm lá theo phép {land}",wx:"thầy đỡ đau",lx:"ngự y phật lòng",rt:"Đêm thứ ba, thầy ngủ được trọn giấc.",rf:"Lá nóng quá, mắt thầy sưng thêm."},
  {n:"Theo lời ngự y, không chườm lá",wx:"không ai trách được ngươi",lx:"Tịnh Viên buồn",rt:"Ngự y kê thuốc uống, thầy uống không sót."},
  {n:"Bỏ bạc mời một thầy thuốc dân gian xem cả hai phép",wx:"có người phân xử",lx:"bạc ra",rt:"Thầy thuốc dân gian nói: lá thì chườm, thuốc thì uống."}]},
 c2:{h:"Lời đồn Phật phạt",w:"v",need:["v"],t:"Người cung {v} đi khắp nơi nói: thầy Trí Viễn bỏ nước nên mù, ai dính vào việc đưa thầy sang bể cũng mang họa.",o:[
  {n:"Mời {v} cùng đi lễ chùa cầu cho thầy",wx:"{v} khó nói xấu nữa",lx:"phải đi cùng {v}",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} quỳ cạnh ngươi trước tượng, không nói gì.",rf:"{v} cáo bệnh, không đi."},
  {n:"Bắt kẻ tung tin, nộp Cung chính ty",wx:"lời đồn dừng",lx:"{v} biết ngươi đánh người của nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hai cung nữ bị phạt quỳ ở Cung chính ty."},
  {n:"Cho tung lại lời: kẻ nói Phật phạt mới mang khẩu nghiệp",wx:"lời đồn quay đầu",lx:"ngươi dùng đúng cách của {v}",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Cung nữ cung {v} không dám nhắc chuyện ấy nữa."}]},
 t1:{h:"Thầy xin một việc",w:"maid",t:"Thầy gọi ngươi lại gần: “Mắt này có lẽ không giữ được. Ta chỉ xin một việc: đừng vì ta mà người ta bỏ việc thỉnh giới.”",o:[
  {n:"Hứa với thầy: việc thỉnh giới không dừng",f:"phap",wx:"thầy vững lòng",lx:"một lời hứa nặng",rt:"Thầy cười, lần đầu từ ngày bệnh."},
  {n:"Thưa: xin thầy lo mắt trước, việc sau tính",f:"le",wx:"thầy chịu chữa",lx:"thầy lo việc bị chậm",rt:"Thầy gật đầu, uống hết bát thuốc."},
  {n:"Xin thầy viết lời nguyện, ngươi giữ",f:"tu",wx:"có lời của thầy trong tay",lx:"thầy viết khó nhọc",rt:"Thầy viết từng nét to, run mà thẳng.",go:()=>ptO("thuthay","ta")}]},
 x1:{h:"Đêm thầy sốt lại",w:"maid",t:"Đêm rằm, thầy sốt lại. Ngự y nói phải chích máu ở thái dương, nếu sai tay thì mất cả hai mắt. Tịnh Viên quỳ ở cửa, chờ ngươi quyết.",o:[
  {n:"Để ngự y chích máu ngay",e:["win","lose"],rt:"Sáng ra thầy mở mắt, thấy được bóng ngọn đèn. Một mắt còn giữ được.",rf:"Máu ra nhiều, thầy lả đi. Sáng ra, cả hai mắt chỉ còn màn sương."},
  {n:"Ngồi đọc kinh cho thầy đến sáng, chờ cơn sốt qua",e:["win2","mid"],rt:"Cơn sốt lui lúc gà gáy. Mắt thầy không sáng lại, nhưng lòng thầy sáng: “Đường bể không cần mắt.”",rf:"Cơn sốt lui, nhưng thầy lặng im cả ngày."},
  {n:"Giao thầy cho chùa tự lo",e:"mid",lx:"ngươi không ở bên thầy đêm ấy",rt:"Các tăng thay nhau canh. Sáng ra thầy qua cơn sốt."}]}},
 E:{win:{tag:"Một mắt còn sáng",w:"emp",t:"Thầy còn thấy được bóng đèn. Ngự y được thưởng, và cả kinh thành biết ai đã xin ngự y đến chùa."},
  win2:{tag:"Đường bể không cần mắt",w:"emp",t:"Thầy mù hẳn, mà ngày nào cũng tụng kinh như cũ. Tịnh Viên nói: thầy giờ nhìn bằng tai, và nghe thấy cả tiếng sóng."},
  mid:{tag:"Thầy qua cơn bệnh",t:"Thầy qua cơn bệnh, mắt mờ hẳn. Việc thỉnh giới chậm lại một mùa."},
  lose:{tag:"Mất cả hai mắt",w:"v",t:"Thầy mù hẳn. Người cung {v} nói: ngự y chích máu là do công chúa {land} giục, hại thầy để thầy khỏi đi."}}});

rdDef("pt_tang",8,{t:"Phe Phật, phe Đạo",w:"emp",sj:"cuộc tranh giữa chùa và quán trong triều",cast(A){if(!ptO("dodiep"))ptO("dodiep","tinhvien");return rdCast(A,["v"])},
 g:"Quán chủ Thái Thanh quán dâng sớ: tăng ni hao kho, tăng ngoại quốc ăn lộc Đại Hy mà không đóng thuế, xin thu độ điệp của mọi tăng ngoại quốc. Người đầu tiên bị gọi tên là Tịnh Viên. Hoàng thượng cho mở một buổi luận đạo trước triều.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Quán chủ đến thăm",w:"maid",if:RDW(1),t:"Quán chủ Thái Thanh quán tự đến cung ngươi, mang theo một hộp đan dược làm quà: “Nghe nói công chúa lo cho mắt một vị tăng già. Đan của quán chữa được mọi bệnh.”",o:[
  {n:"Nhận hộp đan, cảm tạ",f:"tu",wx:"Quán chủ không có cớ nói ngươi khinh quán",lx:"trong tay có đồ của phe kia",rt:"Hộp đan được cất vào tủ thuốc.",go:()=>ptO("hopdan","ta")},
  {n:"Từ chối khéo: thầy đã có ngự y",f:"le",wx:"không mắc nợ phe Đạo",lx:"Quán chủ biết ngươi đứng về phía chùa",rt:"Quán chủ cười, mang hộp đan về.",go:()=>ptO("hopdan","quan")},
  {n:"Nhận hộp đan, đưa ngay sang Thái y viện thử",f:"phap",wx:"biết đan có gì",lx:"Quán chủ biết ngươi nghi",rt:"Thái y viện thử đan: thủy ngân nhiều hơn thuốc.",rf:"Thái y viện nói đan vô hại.",go:()=>ptO("hopdan","thaiy")}]},
 s2:{h:"Từ bộ gọi tên",w:"emp",if:RDW(0),t:"Từ bộ dán bảng ở cổng chùa Pháp Vân: tăng {land} Tịnh Viên phải nộp độ điệp trong mười ngày để xét lại.",o:[
  {n:"Bảo Tịnh Viên nộp độ điệp đúng hạn",f:"le",wx:"không ai bắt được lỗi",lx:"độ điệp ra khỏi tay y",rt:"Độ điệp nằm trên án Từ bộ.",go:()=>ptO("dodiep","kho")},
  {n:"Giữ độ điệp trong cung ngươi, xin hoãn",f:"tu",wx:"độ điệp an toàn",lx:"Từ bộ nói ngươi che chở",rt:"Độ điệp được cất trong rương của ngươi.",go:()=>ptO("dodiep","ta")},
  {n:"Xin Hoàng thượng cho Tịnh Viên trình độ điệp ngay trước triều",f:"phap",wx:"việc ra giữa ánh sáng",lx:"y phải đứng trước bá quan",rt:"Ngài chuẩn: độ điệp sẽ được xem trong buổi luận đạo."}]},
 c1:{h:"{v} đứng về phía quán",w:"v",need:["v"],t:"Nhà {v} xưa nay cúng Thái Thanh quán. {v} xin Hoàng hậu cho các phi tần cùng đến nghe luận đạo, và nói trước: “Phật là đạo của người ngoài.”",o:[
  {n:"Đáp: Phật hay Đạo đều dạy người hiền",wx:"không ai thấy ngươi gây chuyện",lx:"{v} cho là ngươi yếu thế",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Hoàng hậu gật đầu khen câu ấy."},
  {n:"Nhắc trước điện: chính nhà {v} vừa cúng tượng Phật ở chùa Bảo Ninh",wx:"{v} hết lời",lx:"{v} mất mặt, thêm oán",go:(A,ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} tái mặt. Ai cũng biết chuyện tượng Phật ấy.",rf:"{v} nói: “Cúng tượng là việc của mẫu thân, không phải của ta.”"},
  {n:"Mời {v} ngồi cạnh trong buổi luận",wx:"giữ {v} trong tầm mắt",lx:"phải nghe {v} nói suốt buổi",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} ngồi cạnh ngươi, cười mà không nói."}]},
 c2:{h:"Hộp đan của quán",w:"maid",t:"{maid} nghe được: Quán chủ dâng đan cho nhiều cung, có cung nữ uống vào thì nôn ra máu. Không ai dám nói vì Quán chủ được Hoàng thượng tin.",o:[
  {n:"Tìm cung nữ ấy, xin lời khai",wx:"có người chứng thật",lx:"cung nữ sợ bị trả thù",rt:"Cung nữ khai: đan là của Thái Thanh quán, uống ba viên thì nôn.",rf:"Cung nữ chối, nói chỉ bị cảm."},
  {n:"Sai người tráo đan độc vào hộp quà Quán chủ dâng, rồi tố",wx:"Quán chủ khó chối",lx:"nếu lộ thì tội nặng nhất là ngươi",rt:"Hộp đan có thêm ba viên trộn thạch tín. Chỉ {maid} biết.",rf:"Người tráo đan làm rơi một viên ngoài hiên.",go:()=>{RD_FL("pt_tang.trao",1);return""}},
  {n:"Để yên, chờ Quán chủ tự sai",wx:"không dính vào",lx:"người uống đan vẫn uống",rt:"Ngươi không nói gì. Hộp đan vẫn đi khắp các cung."}]},
 t1:{h:"Buổi luận đạo",w:"emp",t:"Điện Tập Hiền chật người. Quán chủ nói trước, rồi Hoàng thượng quay sang ngươi: “Nàng là người bên kia bể, nàng nói xem Phật có ích gì cho nước?”",o:[
  {n:"Thưa: Phật dạy người bỏ ác, nước nào cũng cần",f:"phap",wx:"bá quan gật đầu",lx:"Quán chủ ghi hận",rt:"Cả điện im. Hoàng thượng gõ nhẹ lên tay ngai.",rf:"Quán chủ hỏi vặn: “Bỏ ác thì sao bên ấy còn giặc biển?”"},
  {n:"Thưa: thiếp không dám bàn đạo, chỉ xin xét người theo phép",f:"le",wx:"ngài thấy ngươi biết thân phận",lx:"không ai nhớ lời ngươi",rt:"Ngài gật đầu: “Phải xét người, không xét đạo.”"},
  {n:"Thưa: xin ngài xem đan của quán trước khi xem độ điệp của chùa",f:"tu",if:()=>ptO("hopdan")==="thaiy"||RD_FL("pt_tang.trao"),wx:"mũi dùi quay sang Quán chủ",lx:"phải có chứng",rt:"Ngài cho gọi Thái y viện mang đan đến.",rf:"Thái y viện chưa kịp đến, buổi luận đã tan."},
  {n:"Thưa: xin ngài hỏi những người đã uống đan của quán",f:"tu",if:()=>ptO("hopdan")!=="thaiy"&&!RD_FL("pt_tang.trao"),wx:"mũi dùi quay sang Quán chủ",lx:"không có chứng trong tay",rt:"Ngài cho gọi cung nữ đã uống đan.",rf:"Không ai dám đứng ra."}]},
 x1:{h:"Chiếu về tăng ngoại quốc",w:"emp",t:"Cuối buổi, Hoàng thượng hỏi ngươi lần chót: thu hay không thu độ điệp của tăng ngoại quốc?",o:[
  {n:"Xin cho Tịnh Viên và thầy đối luận với Quán chủ ngay trước ngự tọa",e:["win","lose"],rt:"Thầy Trí Viễn mù mà đọc thuộc từng điều giới. Quán chủ cứng lời. Ngài phán: độ điệp giữ nguyên.",rf:"Quán chủ hỏi một câu về thuế, thầy không đáp được. Ngài cho thu độ điệp."},
  {n:"Xin ngài để tăng ngoại quốc ở lại dưới sổ Từ bộ, mỗi mùa trình một lần",e:["win2","mid"],rt:"Ngài chuẩn. Tịnh Viên được ở lại, mỗi mùa ghi tên ở Từ bộ.",rf:"Ngài nói: “Để Từ bộ làm lệ.”"},
  {n:"Thưa: thiếp theo ý Hoàng thượng",e:"mid",lx:"chùa và quán vẫn giằng co",rt:"Ngài cho hoãn việc xét, để qua năm."}]}},
 E:{win:{tag:"Chùa thắng một ván",w:"emp",t:()=>"Độ điệp của Tịnh Viên được đóng thêm ấn son. "+(RD_FL("pt_tang.trao")?"Hộp đan tráo được Thái y viện thử ra thạch tín; Quán chủ bị đuổi về núi. Chỉ ngươi và {maid} biết thật giả.":"Quán chủ về quán, không dâng đan cho cung nào nữa."),go:()=>{if(ptO("dodiep")==="kho")ptO("dodiep","tinhvien");if(RD_FL("pt_tang.trao"))ptO("hopdan","thaiy");return""}},
  win2:{tag:"Sổ Từ bộ",w:"emp",t:"Tăng ngoại quốc ở lại, tên ghi trong sổ Từ bộ. Không ai thắng, nhưng chùa còn đứng.",go:()=>{if(ptO("dodiep")==="kho")ptO("dodiep","tinhvien");return""}},
  mid:{tag:"Hoãn sang năm",t:"Việc xét độ điệp hoãn sang năm. Quán chủ vẫn đến các cung, và vẫn mang theo đan."},
  lose:{tag:"Độ điệp bị thu",w:"v",t:"Độ điệp của Tịnh Viên bị Từ bộ thu và đốt trước cổng chùa. Y vẫn ở trong chùa, nhưng chỉ như một người khách.",go:()=>ptO("dodiep","chay")}}});

const PTXL=()=>ptO("xaloi");/* the relic grains: v (taken by {v}'s people at .9 cast) · chua (back in the Pháp Vân stupa) · v (taken by {v}'s people) · ta · vua · trivien */
rdDef("pt_tang",9,{t:"Xá lợi",w:"emp",sj:"ba hạt xá lợi của tháp Pháp Vân",cast(A){if(!ptO("xaloi"))ptO("xaloi","v");return rdCast(A,["v"])},
 g:"Thầy Trí Viễn xin mang theo ba hạt xá lợi trong tháp chùa Pháp Vân sang {land}, để giới đàn bên ấy có gốc. Nội đạo tràng trong cung nói xá lợi là của triều. Đêm trước lễ rước, người giữ tháp thấy bình lưu ly vẫn còn, mà bên trong là ba hạt sỏi trắng.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Người giữ tháp",w:"maid",if:RDW(1),t:"Người giữ tháp chạy đến cung ngươi lúc nửa đêm, run rẩy: chiều qua có một thái giám mang lệnh bài Nội đạo tràng lên tháp xem bình, không ai dám cản.",o:[
  {n:"Giữ người giữ tháp lại trong cung làm chứng",f:"le",wx:"có người chứng an toàn",lx:"người ta nói ngươi giấu người",rt:"Người giữ tháp ở lại phòng sau, kể đi kể lại hình dạng thái giám ấy."},
  {n:"Sai {maid} xem sổ ra vào Nội đạo tràng",f:"tu",wx:"biết lệnh bài của ai",lx:"đụng đến sổ của cung",rt:"Sổ ghi: lệnh bài mượn từ cung {v}.",rf:"Trang sổ chiều qua đã bị xé."},
  {n:"Lên tháp ngay, tự tay xem bình",f:"phap",wx:"thấy tận mắt",lx:"đêm khuya ra chùa",rt:"Dưới đáy bình còn một vệt sáp đỏ, loại sáp chỉ cung phi dùng niêm thư."}]},
 s2:{h:"Tin đồn tháp rỗng",w:"maid",if:RDW(0),t:"Sáng ra cả kinh thành đồn: tháp Pháp Vân rỗng, xá lợi đã bị tăng {land} lấy trộm để mang sang bể.",o:[
  {n:"Mời Từ bộ đến niêm phong tháp ngay",f:"le",wx:"giữ hiện trường",lx:"Từ bộ nắm việc",rt:"Tháp được niêm phong, bình lưu ly để nguyên."},
  {n:"Cho Tịnh Viên đóng cửa phòng, không ra ngoài",f:"tu",wx:"không ai đổ thêm cho y",lx:"trông như có tật giật mình",rt:"Tịnh Viên ngồi trong phòng tụng kinh, cửa khép."},
  {n:"Ra chùa nói trước dân chúng: xá lợi sẽ được tìm ra",f:"phap",wx:"dân chúng bớt giận",lx:"một lời hứa trước đông người",rt:"Dân chúng dạt ra cho ngươi đi.",rf:"Có người ném đá vào cổng chùa."}]},
 c1:{h:"Thái giám cầm lệnh bài",w:"v",need:["v"],t:"Thái giám mang lệnh bài lên tháp là người hầu cung {v}. Hắn nói hắn chỉ đi xem bình theo lệnh Nội đạo tràng.",o:[
  {n:"Xin Hoàng hậu cho khám phòng hắn",wx:"có thể tìm ra xá lợi",lx:"{v} biết ngươi nhắm vào nàng",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);if(ok)ptO("xaloi","ta");return""},rt:"Trong gối của hắn có một túi gấm nhỏ, ba hạt xá lợi còn nguyên.",rf:"Phòng hắn sạch trơn. {v} nói ngươi vu cho người vô tội."},
  {n:"Gặp riêng {v}, đổi xá lợi lấy im lặng",wx:"xá lợi về mà không ồn ào",lx:"{v} nắm được ngươi một việc",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);ptO("xaloi","ta");return""},rt:"{v} cho người mang túi gấm sang. Hai người không nói thêm một lời."},
  {n:"Để Từ bộ xét hắn",wx:"việc theo phép",lx:"xá lợi chưa về",rt:"Từ bộ đưa hắn đi. Túi gấm chưa thấy đâu."}]},
 c2:{h:"Ba hạt sỏi trắng",w:"maid",t:"Tịnh Viên nói: ba hạt sỏi trong bình là sỏi bãi biển Minh Châu, loại chỉ có ở chùa bến. Kẻ tráo đã chuẩn bị từ chuyến đi lén.",o:[
  {n:"Giữ ba hạt sỏi làm chứng",wx:"có chứng vật",lx:"chứng vật nhỏ, dễ bị nói là bịa",rt:"Ba hạt sỏi gói trong khăn lụa, cất cùng thư của thầy."},
  {n:"Sai người xuống chùa bến hỏi ai đã nhặt sỏi",wx:"lần đến tận gốc",lx:"chậm, tốn bạc",rt:"Một chú tiểu chùa bến nhớ có người lạ đến nhặt sỏi.",rf:"Không ai nhớ gì."},
  {n:"Bảo Tịnh Viên đừng nói chuyện sỏi với ai",wx:"kẻ tráo không biết ngươi đã biết",lx:"mất một manh mối",rt:"Tịnh Viên gật đầu."}]},
 t1:{h:"Hoàng thượng hỏi xá lợi",w:"emp",t:()=>"Hoàng thượng cho gọi ngươi: “Lễ rước định vào ngày mồng tám. Xá lợi ở đâu?” "+(PTXL()==="ta"?"Túi gấm đang nằm trong tay áo ngươi.":"Ngươi chưa có xá lợi trong tay."),o:[
  {n:"Thưa: xá lợi phải về tay thầy, mới đúng lời nguyện",f:"phap",wx:"ngài thấy lòng thầy",lx:"ngài nghĩ ngươi chỉ lo cho bên kia",rt:"Ngài gật đầu: “Nếu thầy đi, xá lợi đi theo thầy.”",rf:"Ngài nói: “Xá lợi của tháp Đại Hy, ở lại Đại Hy.”"},
  {n:"Thưa: xin ngài giữ xá lợi trong Nội đạo tràng cho yên",f:"le",wx:"không ai tráo được nữa",lx:"thầy không mang được",rt:"Ngài cho dựng một khám vàng trong Nội đạo tràng.",go:()=>{if(PTXL()==="ta")ptO("xaloi","vua");return""}},
  {n:"Thưa: xin ngài cho thiếp ba ngày",f:"tu",wx:"có thời gian lần kẻ tráo",lx:"ngài chờ kết quả",rt:"Ngài nói: “Ba ngày.”"}]},
 x1:{h:"Ngày lễ rước",w:"emp",t:()=>"Mồng tám, đoàn rước đã đứng chật sân chùa Pháp Vân. "+({ta:"Xá lợi thật nằm trong tay ngươi.",vua:"Xá lợi thật nằm trong khám vàng của Nội đạo tràng.",v:"Xá lợi vẫn trong tay người cung {v}."})[PTXL()]+" Bình lưu ly trên kiệu vẫn còn sỏi.",o:[
  {n:"Trình xá lợi thật trước Hoàng thượng, chỉ mặt kẻ tráo",if:()=>PTXL()==="ta",e:["win","lose"],rt:"Ba hạt xá lợi sáng lên dưới nắng. Thái giám cung {v} quỳ xuống, khai người sai. Ngài sai đặt xá lợi vào tay thầy.",rf:"Thái giám khai lung tung, đổ cho người giữ tháp. Ngài cho dừng lễ.",go:(A,ok)=>{if(ok)ptO("xaloi","trivien");return""}},
  {n:"Tâu xin khám cung kẻ tráo ngay trong ngày lễ",if:()=>PTXL()!=="ta",e:["win","lose"],rt:()=>PTXL()==="v"?"Túi gấm được tìm thấy trong cung {v}. Ngài sai đặt xá lợi vào tay thầy.":"Ngài sai mở khám vàng, tự tay trao xá lợi cho thầy.",rf:"Ngài nói: “Ngày lễ mà khám cung, không ra thể thống.”",go:(A,ok)=>{if(ok)ptO("xaloi","trivien");return""}},
  {n:"Lặng lẽ đổi lại xá lợi vào bình, không truy kẻ tráo",e:["win2","mid"],rt:()=>({v:"Đêm trước, {v} lặng lẽ cho người trả túi gấm. Ngươi tự tay đặt lại vào bình. Lễ rước đi đúng giờ.",vua:"Ngươi xin Nội đạo tràng mở khám vàng, tự tay đặt lại ba hạt xá lợi vào bình. Lễ rước đi đúng giờ."})[PTXL()]||"Ngươi tự tay đặt lại ba hạt xá lợi vào bình. Lễ rước đi đúng giờ.",rf:"Kiệu đi rồi mới đặt lại kịp, người ta thấy ngươi lúng túng.",go:(A,ok)=>{if(ok)ptO("xaloi","chua");return""}},
  {n:"Thưa: xá lợi thật giả, chỉ Phật biết",e:"mid",lx:"xá lợi không về tay thầy",rt:"Lễ rước đi với bình lưu ly. Không ai mở ra xem."}]}},
 E:{win:{tag:"Xá lợi về tay thầy",w:"emp",t:"Thầy Trí Viễn chắp tay đón ba hạt xá lợi, sờ từng hạt. Cả kinh thành biết kẻ tráo là ai.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  win2:{tag:"Lễ rước yên lành",w:"emp",t:"Lễ rước yên lành. Xá lợi ở lại tháp chờ ngày thầy đi. Kẻ tráo không bị gọi tên, nhưng nợ ngươi một lần."},
  mid:{tag:"Bình lưu ly",t:"Lễ rước đi qua. Bình lưu ly vẫn đặt trên tháp, chỉ vài người biết bên trong là gì."},
  lose:{tag:"Lễ rước dở dang",w:"v",t:"Lễ rước dừng giữa chừng. Cả kinh thành nói: tăng {land} mang họa đến chùa Pháp Vân."}}});

const PTDK=()=>ptO("daotang")==="kho"?"Nội vụ phủ mở hộp gỗ, trả thanh đao cho ngươi mang đi. ":"";/* .10: the sword comes out of the store before it is offered */
rdDef("pt_tang",10,{t:"Thanh đao dâng chùa",w:"maid",sj:"thanh đao hồi môn của {pv}",cast(A){if(!ptO("daotang"))ptO("daotang","ta");return rdCast(A,["v"])},
 g:"Theo lệ {land}, người muốn cầu yên cho chuyến vượt biển phải dâng một vật quý nhất mình có. Vật quý nhất của ngươi là thanh đao {pv} trao lúc lên thuyền, lưỡi sáng như nước. Nhưng ở Đại Hy, phi tần giữ đao trong cung đã là chuyện để người ta nói.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tịnh Viên hỏi lệ cũ",w:"maid",if:RDW(1),t:"Tịnh Viên kể: bên {land}, trước mỗi chuyến thuyền sứ, người ta dâng đao lên đền Thần cầu biển lặng. Y hỏi ngươi có muốn làm theo lệ ấy ở chùa Pháp Vân không.",o:[
  {n:"Nhận lời, chọn ngày dâng đao",f:"phap",wx:"lệ {land} được giữ",lx:"đao rời tay ngươi",rt:"Tịnh Viên xem lịch, chọn ngày rằm."},
  {n:"Hỏi thầy Trí Viễn trước: chùa có nhận đao không",f:"le",wx:"không làm trái phép chùa",lx:"thầy có thể từ chối",rt:"Thầy nói: “Đao dâng để cầu yên thì không còn là đao.”",rf:"Thầy nói: “Chùa không nhận binh khí.”"},
  {n:"Lau đao, cất lại, chưa quyết",f:"tu",wx:"giữ được vật của {pv}",lx:"lời nguyện chưa thành",rt:"Ngươi lau lưỡi đao dưới đèn, thấy bóng mình trong đó."}]},
 s2:{h:"Có người hỏi về đao",w:"maid",if:RDW(0),t:"Thống lĩnh cấm quân cho người đến hỏi khéo: nghe nói trong cung công chúa {land} có một thanh đao bên kia bể, chém được sắt.",o:[
  {n:"Đưa đao cho người ấy xem, nói rõ là vật hồi môn",f:"le",wx:"không ai nói ngươi giấu",lx:"cấm quân biết đao ở đâu",rt:"Người ấy xem đao, khen, rồi về."},
  {n:"Đáp: đao đã định dâng chùa",f:"phap",wx:"đao có danh phận",lx:"phải dâng thật",rt:"Người ấy cúi đầu: “Dâng chùa thì không ai dám hỏi.”"},
  {n:"Đáp: không có đao nào",f:"tu",wx:"việc dừng ở đây",lx:"nếu lộ thì là nói dối",rt:"Người ấy về, không hỏi thêm.",rf:"Người ấy nói: “Có người thấy rồi.”"}]},
 c1:{h:"{v} tâu chuyện đao",w:"v",need:["v"],t:"{v} tâu với Hoàng hậu: công chúa {land} giữ đao trong nội cung, không biết để làm gì.",o:[
  {n:"Mời Hoàng hậu xem đao và thư của {pv}",wx:"Hoàng hậu thấy là vật hồi môn",lx:"đao phải đưa ra trước mọi người",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Hoàng hậu đọc thư của {pv}, gật đầu cho giữ.",rf:"Hoàng hậu nói: “Hồi môn thì cất vào kho.”"},
  {n:"Hỏi lại: trong cung {v} có cung tên của nhà nàng, sao không ai tâu?",wx:"đổi mũi dùi",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng hậu cho thôi bàn chuyện binh khí."},
  {n:"Gửi đao vào kho Nội vụ phủ cho yên",wx:"không còn ai tâu",lx:"đao nằm trong kho",rt:"Thanh đao được niêm trong hộp gỗ, cất vào kho.",go:()=>ptO("daotang","kho")}]},
 c2:{h:"Thầy Trí Viễn hỏi ngươi",w:"maid",if:()=>PTTVK(),t:"Thầy hỏi: “Con dâng đao, là cầu cho ta, hay cầu cho con?”",o:[
  {n:"Thưa: cầu cho thầy qua bể bình an",wx:"thầy cảm động",lx:"lời nguyện ràng buộc",rt:"Thầy đặt tay lên đầu ngươi, im lặng rất lâu."},
  {n:"Thưa: cầu cho hai nước",wx:"thầy thấy ngươi nghĩ rộng",lx:"thầy e ngươi gánh nặng quá",rt:"Thầy nói: “Hai nước thì nặng. Con cầu cho một người thôi.”"},
  {n:"Thưa: cầu cho con được về thăm mẹ",wx:"thầy thấy ngươi thật lòng",lx:"lộ lòng nhớ nhà",rt:"Thầy cười: “Thế mới là lời nguyện.”"}]},
 t1:{h:"Hoàng thượng thấy đao",w:"emp",t:()=>"Hoàng thượng đến cung ngươi, "+({ta:"thấy thanh đao đặt trên giá. Ngài cầm lên, ướm thử: “Đao này nặng hơn đao Đại Hy.”",kho:"nghe chuyện thanh đao đã vào kho. Ngài hỏi: “Đao của cha nàng, sao để kho giữ?”"})[ptO("daotang")||"ta"],o:[
  {n:"Thưa: thiếp muốn dâng đao lên chùa cầu yên cho thầy",f:"phap",wx:"ngài thấy lòng ngươi",lx:"ngài tiếc thanh đao",rt:"Ngài đặt đao xuống: “Đao chém sắt mà dâng chùa, chỉ người bên kia bể mới nghĩ ra.”"},
  {n:"Thưa: xin dâng đao lên ngài",f:"le",wx:"ngài vui",lx:"đao rời khỏi tay ngươi",rt:"Ngài cười: “Trẫm giữ hộ, khi nào nàng cần thì lấy.”"},
  {n:"Thưa: đao là của {pv}, thiếp chỉ giữ",f:"tu",wx:"ngài hiểu lòng con gái",lx:"ngài thấy ngươi không chịu rời",rt:"Ngài gật đầu, không hỏi thêm."}]},
 x1:{h:"Ngày rằm",w:"emp",t:"Ngày rằm, chùa Pháp Vân đông người. Thầy Trí Viễn ngồi trên pháp tòa. Cả chùa chờ xem công chúa {land} dâng gì.",o:[
  {n:"Dâng thanh đao lên chùa Pháp Vân làm lễ nguyện",e:["win","lose"],rt:()=>PTDK()+"Thầy nhận đao, sai treo trong chánh điện, lưỡi quay vào trong. Cả chùa niệm Phật.",rf:"Từ bộ ngăn lại: chùa không giữ binh khí. Thanh đao bị đưa vào kho.",go:(A,ok)=>ptO("daotang",ok?"chua":"kho")},
  {n:"Dâng thanh đao lên Hoàng thượng, xin ngài thay ngươi nguyện",e:["win2","mid"],rt:()=>PTDK()+"Ngài nhận đao, sai khắc lên chuôi bốn chữ “Bể lặng thuyền yên”.",rf:"Ngài nhận đao mà không nói gì về lời nguyện.",go:()=>ptO("daotang","vua")},
  {n:"Giữ đao, chỉ dâng hương",e:"mid",lx:"lời nguyện nhỏ hơn",rt:()=>ptO("daotang")==="kho"?"Ngươi dâng ba nén hương. Thanh đao vẫn nằm trong kho Nội vụ phủ.":"Ngươi dâng ba nén hương. Thanh đao vẫn nằm trong rương."}]}},
 E:{win:{tag:"Thanh đao trong chánh điện",w:"emp",t:"Thanh đao của {pv} treo trong chánh điện chùa Pháp Vân. Người ta gọi đó là “đao cầu bể”."},
  win2:{tag:"Bể lặng thuyền yên",w:"emp",t:"Thanh đao nằm trong cung Hoàng thượng, chuôi khắc bốn chữ. Ai cũng biết đó là lời nguyện của ngươi."},
  mid:{tag:"Ba nén hương",t:"Lời nguyện chỉ có ba nén hương. Thanh đao vẫn ở chỗ cũ."},
  lose:{tag:"Đao vào kho",w:"v",t:"Thanh đao của {pv} nằm trong kho Nội vụ phủ. {v} nói: binh khí bên kia bể suýt vào đến chánh điện."}}});

const PTSAIL=()=>{ptMove("trivien","hb");if(PTTNK()&&ptO("dodiep")!=="chay")ptMove("tinhvien","hb");for(const k of ["xaloi","hopkinh"])if(["ta","chua","tinhvien"].includes(ptO(k)))ptO(k,"trivien");return""};/* .11 win: the master sails, the relics and the sutra case go with him */
rdDef("pt_tang",11,{t:"Thầy đi hay ở",w:"emp",sj:"chuyến thuyền cuối của thầy Trí Viễn",cast(A){return rdCast(A,["v"])},
 g:()=>"Gió mùa đông bắc đã về. Thuyền sứ {land} neo ở bến Minh Châu, mười ngày nữa nhổ neo. Thầy Trí Viễn đã mù, đã già, mà vẫn xin đi. "+PTKINH()+" Lần này, lời của ngươi là lời cuối cùng Hoàng thượng nghe trước khi phê.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Thầy gọi ngươi",w:"maid",if:RDW(1),t:"Thầy cho gọi ngươi đến chùa, đưa tay lần lên mặt ngươi như để nhớ: “Lần này ta đi. Con đừng xin cho ta ở lại.”",o:[
  {n:"Hứa với thầy: sẽ xin cho thầy đi",f:"phap",wx:"thầy yên lòng",lx:"một lời hứa trước triều",rt:"Thầy gật đầu, lần tràng hạt."},
  {n:"Thưa: xin thầy để con xin cả đường lui",f:"le",wx:"có đường cho cả hai",lx:"thầy e ngươi giữ chân",rt:"Thầy cười: “Đường lui của tăng là chùa nào cũng được.”"},
  {n:"Ngồi im bên thầy, không hứa gì",f:"tu",wx:"thầy hiểu lòng ngươi",lx:"không có lời nào để giữ",rt:"Hai người ngồi đến khi chuông chiều đổ."}]},
 s2:{h:"Từ bộ tâu",w:"emp",if:RDW(0),t:"Từ bộ tâu: thầy Trí Viễn mù, đi bể là đi tìm cái chết; triều cho đi là mang tiếng bỏ một cao tăng.",o:[
  {n:"Xin vào chầu, nói thay thầy",f:"phap",wx:"ngài nghe lời thầy qua miệng ngươi",lx:"bá quan thấy ngươi cãi Từ bộ",rt:"Ngài nghe hết, rồi nói: “Để trẫm nghĩ.”",rf:"Ngài nói: “Từ bộ nói có lý.”"},
  {n:"Đồng ý với Từ bộ: xin cho thầy an dưỡng",f:"le",wx:"Từ bộ không làm khó ngươi",lx:"thầy buồn",rt:"Từ bộ khen ngươi biết điều."},
  {n:"Lặng lẽ gửi thư cho sứ đoàn chuẩn bị chỗ cho thầy",f:"tu",wx:"thuyền có sẵn chỗ",lx:"việc làm sau lưng triều",rt:"Sứ đoàn dành một khoang ấm ở đuôi thuyền."}]},
 c1:{h:"{v} nước cờ cuối",w:"v",need:["v"],t:"{v} tâu: thầy Trí Viễn sang bể là mang theo kinh sách, xá lợi và cả lòng dân Đại Hy; nước khác được thầy, Đại Hy được gì?",o:[
  {n:"Đáp: Đại Hy được tiếng là nước có thầy cho người khác học",wx:"bá quan thấy lý",lx:"{v} ghi hận",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Hoàng thượng gật đầu. {v} lùi lại.",rf:"Có quan tán thành {v}: “Tiếng thì không ăn được.”"},
  {n:"Gặp riêng {v}, hứa để nhà nàng chở lụa theo thuyền sứ năm sau",wx:"{v} thôi cản",lx:"một món nợ với nhà {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} không tâu thêm."},
  {n:"Đưa ra chuyện xá lợi bị tráo bởi người cung {v}",wx:"{v} không còn lời",lx:"thù hai nhà sâu thêm",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} tái mặt, cáo lui."}]},
 c2:{h:"Tịnh Viên xin một việc",w:"maid",if:()=>PTTNK()&&ptO("dodiep")!=="chay",t:"Tịnh Viên xin ngươi: nếu thầy đi, y xin được ngồi cạnh thầy suốt chuyến, không về khoang của sứ đoàn.",o:[
  {n:"Xin sứ đoàn cho y ngồi cạnh thầy",wx:"thầy có người dắt suốt chuyến",lx:"phải nhờ sứ đoàn",rt:"Sứ đoàn dành cho hai thầy trò một góc ở đuôi thuyền.",rf:"Sứ đoàn nói khoang đã chật."},
  {n:"Bỏ bạc cho y theo thuyền buôn Tân La đi trước",wx:"y tới bên kia chờ thầy",lx:"bạc ra, đường riêng",rt:"Tịnh Viên lạy ngươi, theo thuyền Tân La ra bể trước.",go:()=>ptMove("tinhvien","hb")},
  {n:"Bảo y ở lại chùa, giữ hương đèn",wx:"chùa Pháp Vân có người",lx:"thầy đi không có người quen",rt:"Tịnh Viên cúi đầu nhận lời."}]},
 c3:{h:"Tịnh Viên không có độ điệp",w:"maid",if:()=>PTTNK()&&ptO("dodiep")==="chay",t:"Độ điệp của Tịnh Viên đã bị đốt. Không có độ điệp, y không được lên thuyền sứ, mà thầy không thể đi bể nếu không có y dắt.",o:[
  {n:"Xin Từ bộ cấp lại độ điệp cho y",wx:"y đi cùng thầy đúng phép",lx:"phải nhờ Từ bộ",rt:"Tờ độ điệp mới có dấu son.",rf:"Giấy chưa xong khi thuyền sắp đi.",go:(A,ok)=>{if(ok)ptO("dodiep","tinhvien");return""}},
  {n:"Bỏ bạc cho y theo thuyền buôn Tân La đi trước",wx:"y tới bên kia chờ thầy",lx:"bạc ra, đường riêng",rt:"Tịnh Viên lạy ngươi, theo thuyền Tân La ra bể trước.",go:()=>ptMove("tinhvien","hb")},
  {n:"Bảo y ở lại chùa, giữ hương đèn",wx:"chùa Pháp Vân có người",lx:"thầy đi không có người quen",rt:"Tịnh Viên cúi đầu nhận lời."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Đêm ấy Hoàng thượng đến, cầm tờ tấu của Từ bộ: “Nếu trẫm cho thầy đi, nàng có muốn theo thuyền về thăm {land} không?”",o:[
  {n:"Thưa: thiếp ở lại, chỉ xin thầy được đi",f:"phap",wx:"ngài thấy ngươi không vì mình",lx:"ngươi không về",rt:"Ngài nắm tay ngươi: “Nàng ở lại, trẫm cho thầy đi.”",rf:"Ngài nói: “Nàng ở lại, mà lòng đã đi.”"},
  {n:"Thưa: thiếp xin dựng giới đàn ở kinh, để người {land} sang đây",f:"le",wx:"ngài thấy một cách giữ thầy mà không cản",lx:"thầy có thể buồn",rt:"Ngài gật: “Thế thì Đại Hy là nơi người ta qua bể mà đến.”"},
  {n:"Thưa: thiếp không biết",f:"tu",wx:"ngài không thấy ngươi nói dối",lx:"ngài lo",rt:"Ngài im lặng rất lâu."}]},
 x1:{h:"Tờ chiếu cuối",w:"emp",t:"Sáng hôm sau, tờ chiếu nằm trên án, chỉ còn thiếu một nét son. Hoàng thượng nhìn ngươi.",o:[
  {n:"Xin ngài cho thầy sang bể theo thuyền sứ",e:["win","lose"],rt:"Nét son hạ xuống. Mười ngày sau, thầy Trí Viễn được dắt lên thuyền ở bến Minh Châu, mặt hướng ra bể.",rf:"Từ bộ quỳ can. Ngài gác bút: “Thầy ở lại.”"},
  {n:"Xin ngài dựng giới đàn ở chùa Pháp Vân, để người {land} sang thụ giới",e:["win2","mid"],rt:()=>"Ngài chuẩn. Giới đàn dựng trong một tháng; người {land} đầu tiên thụ giới là "+(PTTNK()?"Tịnh Viên.":"một tăng {land} vừa theo thuyền sứ sang."),rf:"Ngài nói: “Dựng thì dựng, nhưng không lớn.”"},
  {n:"Thưa: thầy đã mù, xin để thầy an dưỡng",e:"mid",lx:"lời thỉnh của {pv} không thành",rt:"Thầy ở lại chùa Pháp Vân. Thuyền sứ đi không có thầy."}]}},
 E:{win:{tag:"Thầy sang bể",w:"emp",t:"Thầy Trí Viễn sang bể. Một năm sau, thư {mh} đến: bên ấy đã có giới đàn, người ta gọi thầy là “vị thầy mù từ bên kia sóng”, và nhắc tên ngươi trong mỗi lời nguyện.",go:(_A,G)=>{PTSAIL();return e67bien(G[0])}},
  win2:{tag:"Giới đàn ở kinh",w:"emp",t:"Giới đàn chùa Pháp Vân mở cửa cho người {land} sang thụ giới. Thầy ở lại, mà đạo thì qua bể.",go:()=>{if(PTTNK()&&ptO("dodiep")!=="chay")ptMove("tinhvien","hb");return""}},
  mid:{tag:"Thầy ở lại",t:"Thầy ở lại chùa Pháp Vân, ngày ngày ngồi bên cửa sổ hướng ra bể. Lời thỉnh của {pv} thành một chuyện người ta kể."},
  lose:{tag:"Thuyền đi không có thầy",w:"v",t:"Thuyền sứ nhổ neo không có thầy. Bên kia bể, {pv} gửi thư hỏi vì sao; triều Đại Hy không trả lời.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"pt_tang_11",tag:"Giới đàn bên kia bể",w:"emp",n:"Xin theo xa giá ra tận bến, tự tay dắt thầy lên thuyền",
 path:["Nhận lời thầy","Cho y mang hạt giống","Gửi thuốc và áo ấm","Ngồi lại đọc kinh","Thưa: Phật dạy người","Lên tháp ngay","Dâng thanh đao lên chùa","Hứa với thầy","Xin ngài cho thầy sang bể"],
 bad:["Giao thầy cho chùa","Thưa: thầy đã mù","Sai người tráo đan"],x:[()=>S.duc>=RR("pt_tang_11").bar,"Đức từ "+RR("pt_tang_11").bar],
 t:"Ngươi xin theo xa giá ra bến Minh Châu, tự tay dắt thầy Trí Viễn lên ván thuyền. Thầy dừng ở đầu ván, quay về phía ngươi mà chắp tay. Hoàng thượng đứng trên bến, sai Từ bộ ghi vào sử: cao tăng Đại Hy sang bể truyền giới, có công chúa {land} tiễn chân. Bên kia bể, giới đàn đầu tiên khắc tên hai nước.",
 go:(_A,G)=>{PTSAIL();return e67bien(G[0])},rw:"ngocboi",ti:"Người tiễn thầy qua bể"}));
