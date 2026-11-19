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
  {n:"Nhường nửa khoang cho lụa nhà {v}",/* pt6c: ship space, not an object; the silk is {v}'s house goods and sails with the envoy ship */wx:"{v} nợ ngươi một lần",lx:"kinh sách bớt chỗ",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gửi sang một hộp trà sen cảm ơn."},
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
  {n:"Nhường khoang cho hàng của triều",/* pt6c: ship space; the court goods stay the Nội vụ phủ's */e:"mid",lx:"thầy không gửi được gì",rt:"Khoang thuyền chở lụa và đồ sứ của Nội vụ phủ."}]}},
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
  {n:"Đưa nó vào cung làm tiểu thái giám, xa chùa",/* pt6c: a person, not an object — an unnamed novice who becomes a servant of her palace (servant pool, fb pt_tang.detu) */wx:"không còn ai nhắc chuyện",lx:"người ta nói ngươi giấu người làm chứng",rt:"Đệ tử nhỏ theo {maid} vào cung, từ đó hầu ở cung ngươi.",go:()=>{RD_FL("pt_tang.detu","cung");return""}}]},
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
  {n:"Giữ ba hạt sỏi làm chứng",wx:"có chứng vật",lx:"chứng vật nhỏ, dễ bị nói là bịa",rt:"Ba hạt sỏi gói trong khăn lụa, cất cùng thư của thầy.",go:()=>ptO("soi","ta")},
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

/* =====================================================================================================================================
   pt_dang · Hải tặc và thương nhân (Mưu sinh · Quyền mưu). People: {emp}, {v}, {maid}; Kim Hựu Thành (PTP.huuthanh, Tân La merchant: bến Minh Châu →
   kinh → bến), Ô Cửu (PTP.ocuu, chief of the giặc biển Đông Hải: trên biển → ngục / bến / dead at .10), unnamed: Minh Châu thứ sử, Thị bạc sứ, quan Binh bộ.
   Objects (PTO): ruongbac (the silver of her dowry ship, taken by Ô Cửu), hangdao (the sword crates Kim Hựu Thành saved), thugiac (Ô Cửu's letter),
   ngoctrai (her pearls, the ransom), sothibac (the Thị bạc ty ledger), daochem (the iron-cutting sword in the crates), haido (the pirates' sea chart).
   Chapter flags: bien (the sea's way: deal with merchant and pirate) · phep (the court's law) · muu (a scheme, leverage).
   GE intents: ge1 Chủ bến Minh Châu, ge2 Lời hứa với kẻ biển (mercy, the pirate pardoned), ge3 Mượn dao giặc (pirates / ledgers used as a knife), ge4 Luật biển.
   ===================================================================================================================================== */
const PTHT=()=>ptAlive("huuthanh")&&ptP("huuthanh","w")==="kinh";/* the merchant is in the capital and can act there */
const PTOC=()=>ptAlive("ocuu")?ptP("ocuu","w"):"chet";/* where Ô Cửu is: hb at sea · nguc · cang (pardoned, guarding the port) · chet */
const PTBAC=()=>({ocuu:"Rương bạc hồi môn vẫn nằm trong tay Ô Cửu.",ta:"Rương bạc hồi môn đã về đến cung ngươi.",kho:"Rương bạc hồi môn đã nộp kho Hộ bộ.",huuthanh:"Rương bạc hồi môn đang trong khoang thuyền Kim Hựu Thành."})[ptO("ruongbac")]||"";
RTHEME67.pt_dang="court";
ARC67.pt_dang=ptArc("pt_dang",{o:"pf",t:"Thuyền hồi môn",w:"emp",sj:"chiếc thuyền chở của hồi môn",cast(A){if(ptP("huuthanh","w")==="cang")ptMove("huuthanh","kinh");ptMeet("huuthanh");
  if(!ptO("ruongbac"))ptO("ruongbac","ocuu");if(!ptO("hangdao"))ptO("hangdao","huuthanh");if(!ptO("thugiac"))ptO("thugiac","huuthanh");return rdCast(A,["v"])},
 g:"Chiếc thuyền thứ hai chở của hồi môn của ngươi bị giặc biển Đông Hải chặn ngoài quần đảo Chu San. Thuyền buôn của thương chủ Tân La Kim Hựu Thành cứu được người và mấy hòm đao {land}; rương bạc thì nằm trong tay đầu lĩnh Ô Cửu. Kim Hựu Thành vào kinh, mang theo một lá thư của giặc.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thương chủ Tân La",w:"maid",t:"Kim Hựu Thành chờ ở Hồng Lư tự, xin được gặp ngươi. Y nói tiếng Đại Hy lơ lớ, tay đeo nhẫn ngọc, và nói ngay: “Cứu người là việc nghĩa. Cứu hàng là việc buôn.”",o:[
  {n:"Mời Kim Hựu Thành vào cung, hỏi y muốn gì",f:"bien",wx:"biết giá của y",lx:"người ta nói ngươi tiếp lái buôn",rt:"Y muốn một tờ giấy cho thuyền Tân La được buôn ở Minh Châu mà khỏi thuế hai lần.",rf:"Y chỉ cười, nói chuyện gió mùa."},
  {n:"Cảm tạ y qua Hồng Lư tự, theo lễ",f:"phep",wx:"việc đúng phép",lx:"y thấy ngươi giữ khoảng cách",rt:"Hồng Lư tự ghi công y vào sổ."},
  {n:"Sai {maid} xem sổ hàng trên thuyền y",f:"muu",wx:"biết y cứu được những gì",lx:"y biết ngươi dò",rt:"Sổ hàng ghi: sáu hòm đao, không có rương bạc."}]},
 s2:{h:"Tin từ bến",w:"maid",t:"{maid} nghe người nhà sứ đoàn kể: thuyền hồi môn chở bạc, đao và một trăm người. Chỉ sáu mươi người về được bến.",o:[
  {n:"Gửi bạc lo cho người sống sót",f:"bien",wx:"người {land} biết ngươi lo cho họ",lx:"bạc ra",rt:"Người sống sót có cơm ăn, áo mặc ở bến Minh Châu."},
  {n:"Xin Hồng Lư tự lập danh sách người mất",f:"phep",wx:"mọi người được ghi tên",lx:"việc chậm",rt:"Danh sách người mất được dán ở cửa Hồng Lư tự."},
  {n:"Hỏi kỹ người sống sót: giặc đi về hướng nào",f:"muu",wx:"biết sào huyệt giặc",lx:"người sống sót sợ hãi, nói lẫn",rt:"Họ nói thuyền giặc chạy về phía các đảo đá ở đông nam.",rf:"Không ai nhớ rõ."}]},
 c1:{h:"{v} nói chuyện đao",w:"v",need:["v"],t:"{v} nói trong buổi thỉnh an: “Của hồi môn gì mà chở đao cả hòm? Phi tần buôn binh khí, chẳng phải chuyện nhỏ.”",o:[
  {n:"Đáp: đao là quà {pv} gửi Hoàng thượng",wx:"lời đồn mất cớ",lx:"đao thành quà phải dâng",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Cả điện gật gù. {v} im lặng.",rf:"{v} hỏi: “Quà sao không có trong quốc thư?”"},
  {n:"Mời {v} xem sổ hàng của thuyền",wx:"{v} thấy không có gì giấu",lx:"việc của ngươi ra trước mắt {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} xem xong, nói nhạt: “Thì ra chỉ là đao.”"},
  {n:"Hỏi lại: nhà {v} chở muối lậu qua sông thì gọi là gì?",wx:"trả đúng miếng",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} đỏ mặt, cáo lui sớm."}]},
 c2:{h:"Thị bạc sứ đòi thuế",w:"emp",t:"Thị bạc sứ ở Minh Châu gửi công văn: hòm đao vào bến phải nộp thuế một phần mười như hàng buôn, không thì giữ lại.",o:[
  {n:"Bỏ bạc nộp thuế cho xong",wx:"hòm đao được thả",lx:"bạc ra",rt:"Hòm đao được đóng dấu Thị bạc ty."},
  {n:"Tâu rằng đó là của hồi môn, không phải hàng buôn",wx:"giữ được lệ của hòa thân",lx:"Thị bạc sứ ghi nhớ ngươi",rt:"Hộ bộ phê: hồi môn không đánh thuế.",rf:"Hộ bộ chưa phê, hòm đao còn nằm ở bến."},
  {n:"Để Kim Hựu Thành tự lo với Thị bạc sứ",wx:"ngươi khỏi dính vào",lx:"Kim Hựu Thành nợ thêm một lần",rt:"Kim Hựu Thành lo xong, không nói giá."}]},
 t1:{h:"Thư của Ô Cửu",w:"emp",t:"Kim Hựu Thành trình lá thư Ô Cửu nhờ y mang vào: “Bạc của công chúa, ta giữ. Muốn lấy, đem chuộc. Ta không cần ân, chỉ cần một bến không ai đuổi.”",o:[
  {n:"Đưa thư lên Hoàng thượng",f:"phep",wx:"ngài thấy ngươi không giấu",lx:"việc thành việc của triều",rt:"Ngài đọc thư, sầm mặt: “Giặc mà đòi bến.”",go:()=>ptO("thugiac","vua")},
  {n:"Giữ thư, nhờ Kim Hựu Thành dò ý Ô Cửu",f:"bien",wx:"có một đường nói chuyện với giặc",lx:"nếu lộ thì là thông giặc",rt:"Kim Hựu Thành nhận lời, nói sẽ nhắn qua thuyền cá.",go:()=>ptO("thugiac","ta")},
  {n:"Giữ thư làm chứng, chưa trả lời",f:"muu",wx:"có chứng giặc đòi gì",lx:"giặc chờ",rt:"Lá thư nằm trong hộp gỗ của ngươi.",go:()=>ptO("thugiac","ta")}]},
 x1:{h:"Trước ngự tọa",w:"emp",t:"Hoàng thượng cho bàn việc thuyền hồi môn. Binh bộ muốn đánh, Hộ bộ muốn bỏ, Hồng Lư tự sợ mất lòng {land}. Ngài quay sang ngươi.",o:[
  {n:"Xin ngài sai thủy quân Minh Châu ra bể đánh giặc",e:["win","lose"],rt:"Ngài phán: thủy quân Minh Châu ra bể trước tháng Chạp. Cả triều biết của hồi môn của ngươi là việc của Đại Hy.",rf:"Binh bộ tâu thuyền thủy quân chưa sửa. Ngài nói: “Đợi.”"},
  {n:"Xin ngài cho Kim Hựu Thành đứng ra chuộc bạc",e:["win2","mid"],rt:"Ngài chuẩn, cho Kim Hựu Thành một tờ giấy đi lại giữa các đảo.",rf:"Ngài nói: “Lái buôn mà làm việc của triều?”",go:(A,ok)=>{if(ok)ptO("giaythonghanh","huuthanh");return""}},
  {n:"Thưa: rương bạc mất thì thôi, không đáng phiền triều",e:"mid",lx:"bạc vẫn trong tay giặc",rt:"Ngài gật đầu. Hộ bộ thở ra."}]}},
 E:{win:{tag:"Thủy quân ra bể",w:"emp",t:"Lệnh ban xuống Minh Châu. Bến cảng rộn tiếng búa sửa thuyền; ai cũng biết vì sao."},
  win2:{tag:"Giấy của thương nhân",w:"emp",t:"Kim Hựu Thành cầm giấy của triều đi lại giữa các đảo. Y nói với ngươi: “Giờ thì ta làm ăn với công chúa.”"},
  mid:{tag:"Bạc ở lại bể",t:"Rương bạc ở lại trong tay giặc. Người ta quên dần, trừ Ô Cửu."},
  lose:{tag:"Phi tần và hòm đao",w:"v",t:"{v} kể khắp hậu cung: công chúa {land} chở đao vào kinh, còn qua lại với lái buôn và giặc biển."}}});
PT97.push({a:"pt_dang",tag:"Chén rượu gửi giặc",w:"emp",n:"Gửi Ô Cửu một vò rượu {land} kèm một lời hẹn: trả bạc thì có bến",
 path:["Mời Kim Hựu Thành vào","Hỏi kỹ người sống sót","Hỏi lại: nhà","Giữ thư, nhờ Kim Hựu Thành","Xin ngài cho Kim Hựu Thành"],bad:["Thưa: rương bạc mất thì thôi","Bỏ bạc nộp thuế"],x:[()=>S.tamco>=BAL.arc.rare.pt_dang.bar,`Tâm cơ từ ${BAL.arc.rare.pt_dang.bar}`],
 t:"Ngươi không xin quân, không xin bạc, chỉ gửi theo thuyền cá một vò rượu {land} và một lời: “Trả bạc thì có bến.” Mười ngày sau, rương bạc được đặt trước cửa Thị bạc ty Minh Châu, niêm phong còn nguyên, kèm một tờ giấy viết vụng: “Ô Cửu chờ bến.” Hoàng thượng nghe chuyện, cười rất lâu.",
 go:(_A,_ok,G)=>{ptO("ruongbac","ta");return e67bien(G[0])},rw:"nt_dongchau",ti:"Chén rượu gửi giặc"});

rdDef("pt_dang",5,{t:"Hàng đao và bạc",w:"emp",sj:"sáu hòm đao {land} ở bến",cast(A){if(PTHT())ptMeet("huuthanh");return rdCast(A,["v"])},
 g:()=>"Sáu hòm đao {land} đã lên bờ. Binh bộ nói: đao tư không được vào kinh, phải nộp kho. Hộ bộ đòi thuế. Kim Hựu Thành đòi công cứu hàng. "+PTBAC()+" Ai giữ sáu hòm đao ấy, người đó có tiếng nói ở bến Minh Châu.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Quan Binh bộ đến",w:"emp",if:RDW(1),t:"Một viên quan Binh bộ đến tận cung ngươi, rút một thanh trong hòm ra xem, rồi nói: “Đao thế này, cấm quân còn chưa có.”",o:[
  {n:"Mời quan Binh bộ thử đao trước mặt ngươi",f:"phep",wx:"Binh bộ thấy đao là quà, không phải hàng lậu",lx:"Binh bộ thèm đao",rt:"Lưỡi đao chém đứt một cây giáo gỗ như chém cỏ."},
  {n:"Tặng y một thanh, xin y bớt lời",f:"muu",wx:"Binh bộ nợ ngươi",lx:"một thanh đao rời hòm",rt:"Viên quan nhận đao, cười: “Hòm này của hồi môn, không ai bàn.”",go:()=>ptO("dao_bb","binhbo")},
  {n:"Thưa: đao chờ Hoàng thượng phân xử",f:"bien",wx:"không ai lấy được đao trước ngài",lx:"Binh bộ không vui",rt:"Viên quan lui ra, mặt lạnh."}]},
 s2:{h:"Hòm đao bị giữ ở bến",w:"maid",if:RDW(0),t:"Thị bạc ty giữ sáu hòm đao ở kho bến, nói chờ chỉ. Mỗi ngày nằm kho là một ngày tiền canh.",o:[
  {n:"Bỏ bạc trả tiền canh kho",f:"bien",wx:"hòm đao được canh cẩn thận",lx:"bạc ra",rt:"Kho bến cử hai người canh riêng."},
  {n:"Xin Hộ bộ một tờ phê thả hòm",f:"phep",wx:"giấy tờ đàng hoàng",lx:"chậm",rt:"Hộ bộ phê thả sau mười ngày.",rf:"Hộ bộ nói: “Chờ Binh bộ.”"},
  {n:"Nhờ Kim Hựu Thành chở lén hòm đao lên kinh",f:"muu",if:()=>PTHT(),wx:"hòm đao về nhanh",lx:"nếu lộ là chở đao lậu",rt:"Sáu hòm đao nằm dưới khoang muối của thuyền Tân La.",rf:"Lính bến khám thuyền, thấy hòm đao."},
  {n:"Sai {maid} xuống bến trông hòm đao",f:"muu",if:()=>!PTHT(),wx:"có người của ngươi ở kho",lx:"cung thiếu người",rt:"{maid} ngồi trong kho bến đếm từng hòm."}]},
 c1:{h:"Kim Hựu Thành đòi công",w:"maid",if:()=>PTHT(),t:"Kim Hựu Thành xin gặp: “Cứu sáu hòm đao, thuyền ta mất một cánh buồm và ba người. Công chúa trả công bằng gì?”",o:[
  {n:"Trả công y bằng bạc",wx:"không nợ ai",lx:"bạc ra nhiều",rt:"Kim Hựu Thành nhận bạc, cúi đầu cảm tạ."},
  {n:"Hứa xin cho y một tờ giấy buôn ở Minh Châu",wx:"y nợ ngươi một lần",lx:"một lời hứa với lái buôn",rt:"Y cười: “Lời công chúa, ta ghi vào sổ.”",rf:"Y lắc đầu: “Lời hứa không trả được tiền buồm.”"},
  {n:"Cho y chọn một thanh đao đẹp nhất làm công",wx:"y được thứ y thích",lx:"đao vào tay lái buôn",rt:"Kim Hựu Thành lật từng thanh, chọn thanh có vân như sóng.",go:()=>ptO("dao_ht","huuthanh")}]},
 c2:{h:"{v} mua đao",w:"v",need:["v"],t:"Người nhà {v} đến hỏi mua một hòm đao cho anh trai nàng ta đang làm phó tướng ở biên ải.",o:[
  {n:"Tặng nhà {v} một thanh, không bán",wx:"{v} nợ ngươi",lx:"đao rời hòm",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return ptO("dao_v","v")},rt:"{v} gửi lời cảm ơn, giọng khác hẳn mọi khi."},
  {n:"Từ chối: đao là hồi môn, không bán",wx:"giữ đủ hòm",lx:"{v} phật lòng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Người nhà {v} ra về không chào."},
  {n:"Bán cho họ một thanh, ghi vào sổ, có người làm chứng",wx:"được bạc mà không ai bắt lỗi",lx:"{v} có đao của ngươi trong tay",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return ptO("dao_v","v")},rt:"Giấy bán có ấn của ngươi và của nhà {v}.",rf:"Nhà {v} trả giá thấp, rồi kể là ngươi bán đao."}]},
 t1:{h:"Hoàng thượng hỏi đao",w:"emp",t:"Hoàng thượng hỏi: “Sáu hòm đao của cha nàng, nàng định làm gì?”",o:[
  {n:"Thưa: xin dâng cả lên ngài",f:"phep",wx:"ngài vui",lx:"đao rời tay ngươi",rt:"Ngài cười: “Trẫm nhận một thanh, còn lại nàng giữ.”",go:()=>ptO("dao_vua","vua")},
  {n:"Thưa: thiếp muốn dùng đao đổi lấy bạc bị giặc giữ",f:"bien",wx:"ngài thấy ngươi tính xa",lx:"ngài nghi ngươi thương lượng với giặc",rt:"Ngài nhìn ngươi lâu: “Nàng nghĩ giặc thích đao hơn bạc?”",rf:"Ngài nói: “Đem đao cho giặc là nuôi giặc.”"},
  {n:"Thưa: thiếp chưa nghĩ, xin ngài dạy",f:"muu",wx:"ngài vui vì được hỏi",lx:"việc theo ý ngài",rt:"Ngài nói: “Cứ giữ. Đao trong tay mình thì người khác phải hỏi mình.”"}]},
 x1:{h:"Sáu hòm đao về đâu",w:"emp",t:"Cuối tháng, Binh bộ, Hộ bộ và Kim Hựu Thành đều chờ một lời của ngươi trước khi Hoàng thượng phê.",o:[
  {n:"Dâng cả sáu hòm lên Hoàng thượng làm quà của {pv}",e:["win","lose"],rt:"Ngài nhận, sai Binh bộ cất vào kho ngự, ghi tên {pv} trên sổ.",rf:"Binh bộ tâu đao lạ chưa thử, ngài cho cất vào kho Binh bộ.",go:(A,ok)=>ptO("hangdao",ok?"vua":"kho")},
  {n:"Bán sáu hòm cho Kim Hựu Thành, lấy bạc nộp thuế và trả công",if:()=>PTHT(),e:["win2","mid"],rt:"Kim Hựu Thành mua cả, trả bằng bạc Tân La. Thuế đóng đủ, công trả xong.",rf:"Hộ bộ nói: bán đao cho lái buôn ngoại quốc, phải xét.",go:(A,ok)=>{if(ok)ptO("hangdao","huuthanh");return""}},
  {n:"Gửi sáu hòm vào kho Nội vụ phủ dưới tên ngươi",if:()=>!PTHT(),e:["win2","mid"],rt:"Nội vụ phủ ghi sổ: hồi môn của công chúa {land}, sáu hòm đao.",rf:"Nội vụ phủ nhận mà không ghi tên ngươi.",go:()=>ptO("hangdao","kho")},
  {n:"Để Binh bộ giữ, chờ chỉ",e:"mid",lx:"đao không còn là của ngươi",rt:"Sáu hòm đao nằm trong kho Binh bộ.",go:()=>ptO("hangdao","kho")}]}},
 E:{win:{tag:"Quà của {pv}",w:"emp",t:"Sáu hòm đao {land} nằm trong kho ngự. Binh bộ nhắc đến chúng, là nhắc đến ngươi."},
  win2:{tag:"Bạc Tân La",w:"emp",t:"Kim Hựu Thành mang đao đi, để lại bạc và một lời: “Bến Minh Châu nhớ công chúa.”"},
  mid:{tag:"Đao vào kho",t:"Sáu hòm đao vào kho. Ngươi còn tên trên sổ, nhưng chìa khóa không ở trong tay ngươi."},
  lose:{tag:"Đao lạ trong kho Binh bộ",w:"v",t:"{v} nói: đao của công chúa {land} sắc hơn đao Đại Hy, chẳng biết bên ấy gửi sang để làm gì."}}});

rdDef("pt_dang",6,{t:"Thuyền giặc",w:"emp",sj:"thuyền giặc ngoài cửa bến Minh Châu",cast(A){return rdCast(A,["v"])},
 g:"Ba chiếc thuyền buồm đen thả neo ngoài cửa bến Minh Châu, cờ không có chữ. Ô Cửu cho người chèo xuồng vào bến, nhắn: y giữ cả người Tân La lẫn người {land}, muốn nói chuyện với người có quyền. Minh Châu thứ sử muốn đánh để lập công; Kim Hựu Thành xin đừng đánh khi người còn trên thuyền giặc.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thủy quân đã sẵn",w:"emp",if:RDW(1),t:"Thủy quân Minh Châu đã sửa xong thuyền theo lệnh tháng trước. Thứ sử tâu về: chỉ chờ một chữ là ra bể.",o:[
  {n:"Xin ngài cho thủy quân vây mà chưa đánh",f:"phep",wx:"giặc biết triều có quân",lx:"tốn lương thủy quân",rt:"Mười chiến thuyền dàn ngang cửa bến."},
  {n:"Nhắn thứ sử chờ ngươi nói chuyện với giặc trước",f:"bien",wx:"người trên thuyền giặc còn sống",lx:"thứ sử thấy ngươi giành công",rt:"Thứ sử trả lời: chờ mười ngày."},
  {n:"Cho thủy quân đánh úp ban đêm",f:"muu",wx:"giặc bị bất ngờ",lx:"người trên thuyền giặc có thể chết",rt:"Một chiếc thuyền giặc bị đốt; hai chiếc kia chạy ra xa.",rf:"Giặc đã biết trước, thủy quân đánh vào khoảng không."}]},
 s2:{h:"Thủy quân chưa có",w:"maid",if:RDW(0),t:"Thủy quân Minh Châu chưa sửa xong thuyền. Thứ sử gửi thư về kinh xin thêm bạc, còn dân bến thì đóng cửa không dám ra bể.",o:[
  {n:"Bỏ bạc giúp thủy quân sửa thuyền",f:"phep",wx:"thủy quân có thuyền",lx:"bạc ra nhiều",rt:"Thợ đóng thuyền làm cả đêm."},
  {n:"Nhờ Kim Hựu Thành cho mượn thuyền Tân La",f:"bien",if:()=>PTHT(),wx:"có thuyền ngay",lx:"thêm một món nợ với y",rt:"Ba thuyền Tân La treo cờ Đại Hy, đậu cạnh thủy quân."},
  {n:"Cho thuê thuyền cá của dân bến làm thuyền canh",f:"bien",if:()=>!PTHT(),wx:"có thuyền ngay",lx:"dân bến sợ giặc trả thù",rt:"Hai mươi thuyền cá canh quanh cửa bến."},
  {n:"Tung tin thủy quân đã sẵn để dọa giặc",f:"muu",wx:"giặc dè chừng",lx:"nếu giặc biết là tin giả",rt:"Thuyền giặc lùi ra xa một dặm.",rf:"Giặc cho xuồng vào dò, thấy bến trống."}]},
 c1:{h:"Người của Ô Cửu",w:"maid",t:"Người chèo xuồng của Ô Cửu được dẫn đến trước thứ sử. Hắn nói Ô Cửu cho người trên thuyền ăn đủ, không đánh ai, nhưng chỉ chờ đến rằm.",o:[
  {n:"Cho người mang gạo và thuốc ra thuyền giặc cho người bị giữ",wx:"người bị giữ không đói",lx:"giặc cũng ăn gạo của ngươi",rt:"Xuồng giặc chở gạo về thuyền. Ô Cửu gửi lại một lời cảm ơn."},
  {n:"Giữ người chèo xuồng lại làm tin",wx:"có một người của giặc trong tay",lx:"giặc giận",rt:"Thứ sử giam hắn trong kho bến.",rf:"Hắn nhảy xuống nước trốn mất."},
  {n:"Dò hắn xem sào huyệt giặc ở đâu",wx:"biết đường đến hang giặc",lx:"hắn nói dối được",rt:"Hắn vẽ ra một tấm hải đồ các đảo đá, có đánh dấu một vịnh kín.",rf:"Hắn vẽ bừa một tấm hải đồ, không ai tin.",go:(A,ok)=>{if(ok)ptO("haido","ta");return""}}]},
 c2:{h:"{v} nói chuyện giặc",w:"v",need:["v"],t:"{v} tâu với Hoàng hậu: giặc biển đến tận cửa bến là vì bạc của công chúa {land}; người {land} mang họa theo thuyền.",o:[
  {n:"Đáp: giặc đến vì bến giàu, không vì một người",wx:"bá quan thấy lý",lx:"{v} ghi hận",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Hoàng hậu gật đầu.",rf:"Hoàng hậu nói: “Giặc đến khi bạc đến, thì cũng là vì bạc.”"},
  {n:"Im lặng, xin Hoàng hậu cho lo việc bến",wx:"không cãi nhau",lx:"{v} nói được nhiều hơn",rt:"Hoàng hậu không xét thêm."},
  {n:"Nhắc trước điện: anh trai {v} vừa mua đao của giặc ở chợ biên",wx:"{v} phải lo cho nhà mình",lx:"phải có chứng",go:(A,ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng hậu cho người hỏi nhà {v}.",rf:"Nhà {v} đưa ra giấy mua đao của ngươi."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Hoàng thượng hỏi: “Giặc muốn nói chuyện với người có quyền. Trẫm sai ai?”",o:[
  {n:"Thưa: xin ngài sai thứ sử, có chỉ trong tay",f:"phep",wx:"việc đúng phép",lx:"thứ sử muốn đánh hơn muốn nói",rt:"Ngài viết chỉ cho thứ sử."},
  {n:"Thưa: xin cho thiếp viết thư, nhờ Kim Hựu Thành mang ra",f:"bien",if:()=>PTHT(),wx:"giặc nghe lời người họ cần",lx:"ngài thấy ngươi dính vào giặc",rt:"Ngài gật: “Thư của nàng, chỉ của trẫm.”",rf:"Ngài nói: “Phi tần viết thư cho giặc?”"},
  {n:"Thưa: xin cho thiếp viết thư, gửi theo xuồng của giặc",f:"bien",if:()=>!PTHT(),wx:"giặc nghe lời người họ cần",lx:"ngài thấy ngươi dính vào giặc",rt:"Ngài gật: “Thư của nàng, chỉ của trẫm.”",rf:"Ngài nói: “Phi tần viết thư cho giặc?”"},
  {n:"Thưa: không nói, cứ để giặc chờ đến rằm",f:"muu",wx:"giặc nóng ruột trước",lx:"người trên thuyền giặc chờ thêm",rt:"Ngài cười: “Nàng muốn giặc tự lộ.”"}]},
 x1:{h:"Đêm rằm ở cửa bến",w:"emp",t:()=>"Đêm rằm, ba ngọn đuốc sáng trên thuyền giặc. "+(ptO("haido")==="ta"?"Tấm hải đồ vịnh kín nằm trên án của thứ sử. ":"")+"Ô Cửu chờ câu trả lời.",o:[
  {n:"Xin chỉ cho thủy quân vây chặt, buộc giặc thả người",e:["win","lose"],rt:"Thủy quân khép vòng. Ô Cửu thả người Tân La xuống xuồng, rồi giương buồm chạy ra khơi.",rf:"Giặc phá vòng vây, bắt thêm một thuyền cá chạy theo."},
  {n:"Hẹn Ô Cửu: thả người trước, rồi bàn chuyện bạc",e:["win2","mid"],rt:"Ô Cửu thả người {land} trước. Y nhắn: “Bạc thì chờ người có quyền.”",rf:"Ô Cửu không thả ai, chỉ nhắn: “Chờ.”"},
  {n:"Để thủy quân giữ cửa bến, không ra bể",e:"mid",lx:"người vẫn trên thuyền giặc",rt:"Thuyền giặc chờ đến sáng, rồi chạy về phía các đảo đá."}]}},
 E:{win:{tag:"Giặc thả người",w:"emp",t:"Người Tân La về đến bến, quỳ trước Thị bạc ty mà khóc. Kim Hựu Thành nói: “Ơn này, thuyền Tân La nhớ.”",go:()=>{RD_FL("pt_dang.tanla",1);return""}},
  win2:{tag:"Người {land} về bến",w:"emp",t:"Người {land} về bến. Ô Cửu giữ lại người Tân La và rương bạc, chờ một cuộc nói chuyện.",go:()=>{RD_FL("pt_dang.phutang",1);return""}},
  mid:{tag:"Thuyền giặc đi",t:"Thuyền giặc chạy về các đảo đá, mang theo người và bạc."},
  lose:{tag:"Giặc phá vòng vây",w:"v",t:"Giặc phá vòng vây, bắt thêm một thuyền cá. Cả bến Minh Châu nói: việc của công chúa {land} làm khổ dân bến.",go:()=>{RD_FL("pt_dang.thuyenca",1);return""}}}});

rdDef("pt_dang",7,{t:"Tiền chuộc",w:"maid",sj:"tiền chuộc người trên thuyền giặc",cast(A){if(!ptO("ngoctrai"))ptO("ngoctrai","ta");return rdCast(A,["v"])},
 g:()=>"Thư Ô Cửu đến lần thứ hai: "+(RD_FL("pt_dang.tanla")?"người Tân La đã về, nhưng y còn giữ người {land} và rương bạc":RD_FL("pt_dang.phutang")?"người {land} đã về, nhưng y còn giữ người Tân La, có cả cháu trai Kim Hựu Thành":"y còn giữ cả người {land} lẫn người Tân La")+(RD_FL("pt_dang.thuyenca")?", thêm mười dân chài":"")+". Y đòi chuộc bằng ngọc trai, không lấy bạc: “Bạc thì ta đã có.”",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hộp ngọc trai của {mh}",w:"maid",if:RDW(1),t:"Trong rương hồi môn của ngươi có một hộp ngọc trai {mh} trao lúc ra bến. {maid} mở hộp, ngọc sáng như trăng.",o:[
  {n:"Quyết đem ngọc chuộc người",f:"bien",wx:"người bị giữ có đường về",lx:"mất vật của {mh}",rt:"Ngươi đếm ngọc, đủ chuộc bốn mươi người."},
  {n:"Giữ ngọc, xin Hộ bộ một khoản chuộc",go:()=>ptO("ngoctrai","ta"),f:"phep",wx:"của triều chuộc dân triều",lx:"Hộ bộ chậm",rt:"Hộ bộ nhận đơn, hứa xét trong tháng.",rf:"Hộ bộ nói: “Triều không chuộc người với giặc.”"},
  {n:"Cho thợ làm ngọc giả trộn vào hộp",f:"muu",wx:"giữ được ngọc của {mh}",lx:"nếu giặc biết là ngọc giả",rt:"Thợ ngọc làm hai mươi hạt giả, giống như thật.",go:()=>{RD_FL("pt_dang.ngocgia",1);return""}}]},
 s2:{h:"Dân chài kêu",w:"maid",if:RDW(0),t:"Vợ con những người bị giữ kéo đến cửa Thị bạc ty kêu khóc. Có người nói: “Công chúa có ngọc, sao không chuộc?”",o:[
  {n:"Gửi gạo và bạc cho nhà người bị giữ",f:"bien",wx:"dân bến bớt oán",lx:"bạc ra",rt:"Nhà nào cũng có gạo qua tháng."},
  {n:"Xin thứ sử dán cáo thị: triều đang lo",f:"phep",wx:"dân bến yên lòng",lx:"cáo thị không chuộc được người",rt:"Cáo thị dán ở cửa bến."},
  {n:"Cho người tung tin giặc sắp bị đánh, dân đừng kêu",f:"muu",wx:"dân bến im",lx:"tin giả",rt:"Dân bến im, chờ.",rf:"Giặc nghe tin, dọa giết người."}]},
 c1:{h:"Kim Hựu Thành xin ứng tiền",w:"maid",if:()=>PTHT(),t:"Kim Hựu Thành nói: thuyền Tân La năm nay nợ Thị bạc ty một khoản thuế lớn. Nếu triều cho y lấy khoản ấy chuộc người, y chuộc cả hai bên.",o:[
  {n:"Xin ngài cho Kim Hựu Thành lấy thuế thuyền chuộc người",wx:"chuộc người mà không mất ngọc",lx:"Hộ bộ mất một khoản thuế",rt:"Ngài phê: “Lấy thuế chuộc dân, được.”",rf:"Hộ bộ cãi: thuế là của triều."},
  {n:"Từ chối: thuế là thuế, chuộc là chuộc",wx:"không ai nói ngươi bán thuế",lx:"Kim Hựu Thành phật lòng",rt:"Kim Hựu Thành cúi đầu, không nói thêm."},
  {n:"Bỏ bạc riêng góp với y",wx:"chuộc nhanh",lx:"bạc ra",rt:"Bạc của ngươi và bạc Tân La gói chung một bọc."}]},
 c2:{h:"{v} hỏi chuyện ngọc",w:"v",need:["v"],t:"{v} hỏi khéo: “Nghe nói công chúa có hộp ngọc của mẫu hậu. Chuộc giặc bằng ngọc của hoàng gia bên kia, không biết có phải phép không?”",o:[
  {n:"Đáp: ngọc là của {mh}, chuộc người là ý của {mh}",wx:"{v} hết cớ",lx:"việc ngọc thành chuyện cả cung",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"{v} cười nhạt, không hỏi thêm.",rf:"{v} nói: “Thì ra bên ấy chuộc giặc quen rồi.”"},
  {n:"Mời {v} góp một phần chuộc dân chài",wx:"{v} được tiếng nhân từ",lx:"{v} chia công",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gửi sang một túi bạc, sai người kể khắp cung."},
  {n:"Để {v} nói, không đáp",wx:"không thêm chuyện",lx:"lời của {v} đi xa",rt:"Ngươi uống trà, nhìn ra hiên."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Hoàng thượng hỏi: “Chuộc giặc là nuôi giặc. Không chuộc thì dân chết. Nàng chọn gì?”",o:[
  {n:"Thưa: chuộc người trước, đánh giặc sau",f:"bien",wx:"ngài thấy ngươi thương dân",lx:"ngài lo giặc được thể",rt:"Ngài gật: “Người sống mới đánh được giặc.”"},
  {n:"Thưa: theo phép, triều không chuộc",f:"phep",wx:"ngài thấy ngươi giữ phép",lx:"người bị giữ chờ thêm",rt:"Ngài nói: “Thế thì phải đánh cho nhanh.”",rf:"Ngài im lặng: “Nàng nói như quan Hộ bộ.”"},
  {n:"Thưa: chuộc mà gài người theo dò hang giặc",f:"muu",wx:"chuộc người mà biết đường đánh",lx:"người đi dò có thể chết",rt:"Ngài cười: “Nàng giống người bên kia bể hơn trẫm nghĩ.”"}]},
 x1:{h:"Ngày trao chuộc",w:"emp",t:()=>"Ngày trao chuộc, xuồng của Ô Cửu đậu ở bãi cát ngoài bến. "+(ptO("ngoctrai")==="ta"?"Hộp ngọc của {mh} nằm trong tay ngươi.":"")+" Người bị giữ đứng trên mạn thuyền giặc nhìn vào bờ.",o:[
  {n:"Trao hộp ngọc của {mh}, đổi lấy người",if:()=>ptO("ngoctrai")==="ta",e:["win","lose"],rt:"Ô Cửu đếm ngọc, rồi thả người xuống xuồng. Y nhìn vào bờ, lần đầu cúi đầu.",rf:()=>RD_FL("pt_dang.ngocgia")?"Ô Cửu đếm ra ngọc giả, giữ lại một nửa số người.":"Ô Cửu chê ngọc ít, giữ lại một nửa số người.",go:()=>ptO("ngoctrai","ocuu")},
  {n:"Trao bạc chuộc, đổi lấy người",if:()=>ptO("ngoctrai")!=="ta",e:["win","lose"],rt:"Ô Cửu cân bạc, rồi thả người xuống xuồng.",rf:"Ô Cửu chê bạc, giữ lại một nửa số người."},
  {n:"Cho người bơi lén ra cắt dây thuyền giặc trong lúc trao chuộc",e:["win2","mid"],rt:"Thuyền giặc trôi dạt vào bãi. Người bị giữ nhảy xuống nước bơi vào bờ; Ô Cửu giương buồm chạy.",rf:"Người bơi bị phát hiện. Ô Cửu chạy ra khơi, không ai bị giết, không ai được thả."},
  {n:"Hoãn trao chuộc, chờ chỉ của triều",e:"mid",lx:"người vẫn bị giữ",rt:"Xuồng giặc chờ đến chiều, rồi quay ra khơi."}]}},
 E:{win:{tag:"Người về bờ",w:"emp",t:"Người bị giữ về bờ. Dân bến Minh Châu gọi ngươi là “công chúa chuộc người”.",go:()=>{RD_FL("pt_dang.chuoc",1);return""}},
  win2:{tag:"Thuyền giặc trôi vào bãi",w:"emp",t:"Người bị giữ tự bơi vào bờ. Ô Cửu mất người mà không mất bạc; y biết ai đã cho người cắt dây.",go:()=>{RD_FL("pt_dang.chuoc",1);RD_FL("pt_dang.oclua",1);return""}},
  mid:{tag:"Người còn trên thuyền giặc",t:"Người vẫn trên thuyền giặc. Ô Cửu chờ; giặc biển không vội."},
  lose:{tag:"Chuộc hỏng",w:"v",t:"Một nửa số người bị giữ lại. {v} nói: công chúa {land} chuộc giặc mà giặc còn chê."}}});

rdDef("pt_dang",8,{t:"Thị bạc ty",w:"emp",sj:"sổ thu của Thị bạc ty Minh Châu",cast(A){if(!ptO("sothibac"))ptO("sothibac","tbs");return rdCast(A,["v"])},
 g:()=>(PTHT()?"Kim Hựu Thành tìm đến ngươi, mặt tái: ":"Thư Kim Hựu Thành từ bến gửi lên: ")+"Thị bạc sứ ở Minh Châu bắt thuyền Tân La nộp thuế hai lần, lần sau vào túi riêng. Người trong ty còn kể: Thị bạc sứ bán giấy thông hành cho cả thuyền giặc. Cuốn sổ thu thật nằm trong rương của y.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một thư lại trong ty",w:"maid",if:RDW(1),t:"Một thư lại của Thị bạc ty, vợ con từng bị giặc bắt mà được ngươi chuộc, lén nhắn: y chép được mấy trang sổ thu thật.",o:[
  {n:"Bảo y chép tiếp, giấu kỹ",f:"muu",wx:"có bản chép trong tay",lx:"y có thể bị phát hiện",rt:"Mỗi tuần một trang chép về đến cung ngươi.",rf:"Thị bạc sứ đổi rương khóa, y không chép được nữa."},
  {n:"Đưa y vào kinh làm người chứng",f:"phep",wx:"người chứng an toàn",lx:"Thị bạc sứ biết mất người",rt:"Thư lại về kinh, ở nhà khách Hồng Lư tự."},
  {n:"Cho y bạc, bảo y đừng dính vào",f:"bien",wx:"y không gặp nạn",lx:"mất một người chứng",rt:"Thư lại cúi lạy, về quê."}]},
 s2:{h:"Thị bạc sứ gửi quà",w:"maid",if:RDW(0),t:"Thị bạc sứ gửi vào cung ngươi một hộp trầm hương, kèm lời: “Việc bến cảng, công chúa đừng bận lòng.”",o:[
  {n:"Nhận quà, gửi lời cảm tạ",f:"muu",wx:"y yên tâm, lơi tay",lx:"có của của y trong tay",rt:"Hộp trầm hương đặt trên án.",go:()=>ptO("tramhuong","ta")},
  {n:"Trả quà, nói rõ không nhận",f:"phep",wx:"không ai nói ngươi ăn của y",lx:"y biết ngươi không phải người của y",rt:"Hộp trầm hương về lại Minh Châu.",go:()=>ptO("tramhuong","tbs")},
  {n:"Nhận quà, đưa ngay sang Hộ bộ làm chứng",f:"bien",wx:"có chứng y đút lót",lx:"y biết ngươi không đùa",rt:"Hộ bộ ghi: quà của Thị bạc sứ gửi phi tần.",go:()=>ptO("tramhuong","kho")}]},
 c1:{h:"Kim Hựu Thành xin che",w:"maid",t:()=>PTHT()?"Kim Hựu Thành xin ngươi một lời với Hộ bộ: thuyền Tân La chỉ nộp thuế một lần như mọi thuyền.":"Thư Kim Hựu Thành xin ngươi một lời với Hộ bộ: thuyền Tân La chỉ nộp thuế một lần như mọi thuyền.",o:[
  {n:"Viết thư cho Hộ bộ xin xét",wx:"Hộ bộ biết có chuyện",lx:"Thị bạc sứ biết ngươi đứng sau",rt:"Hộ bộ cho người xuống Minh Châu.",rf:"Thư nằm ở Hộ bộ, chưa ai mở."},
  {n:"Bảo y chịu thêm một mùa, chờ chứng",wx:"không đánh động",lx:"thuyền Tân La thiệt",rt:"Kim Hựu Thành thở dài, nhận lời."},
  {n:"Bỏ bạc trả bớt phần thuế thứ hai cho y",wx:"y đỡ thiệt",lx:"bạc ra",rt:"Kim Hựu Thành cảm tạ, ghi ơn vào sổ Tân La."}]},
 c2:{h:"Nhà {v} và Thị bạc sứ",w:"v",need:["v"],t:"{maid} nghe được: Thị bạc sứ là anh họ bên ngoại của {v}. Mỗi năm nhà {v} nhận một rương quà từ bến.",o:[
  {n:"Cho người dò rương quà nhà {v}",wx:"biết của từ đâu",lx:"{v} biết bị dò",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Rương quà năm nay có cả bạc Tân La.",rf:"Người dò bị bắt gặp ở cửa nhà {v}."},
  {n:"Gặp {v}, khuyên nàng tránh xa việc bến",wx:"{v} có đường lui",lx:"{v} biết ngươi biết",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} im lặng rất lâu, rồi gật đầu."},
  {n:"Giữ chuyện này, chờ lúc cần",/* pt6c: a secret kept, not an object */wx:"có một con bài",lx:"việc bến chưa xong",rt:"Ngươi ghi một dòng vào sổ riêng."}]},
 t1:{h:"Cuốn sổ thật",w:"maid",t:"Đêm ấy, người của ngươi lấy được cuốn sổ thu thật từ rương Thị bạc sứ, thay vào một cuốn sổ trắng. Trang cuối ghi: ba giấy thông hành bán cho thuyền buồm đen.",o:[
  {n:"Giữ sổ trong cung, chưa nói với ai",f:"muu",wx:"sổ an toàn",lx:"giữ sổ ăn cắp là tội",rt:"Cuốn sổ nằm dưới đáy rương áo.",go:()=>ptO("sothibac","ta")},
  {n:"Đưa sổ cho Hộ bộ ngay",f:"phep",wx:"việc theo phép",lx:"Hộ bộ có người của Thị bạc sứ",rt:"Hộ bộ nhận sổ, niêm phong.",rf:"Hộ bộ nhận sổ, rồi nói sổ bị nước làm nhòe.",go:()=>ptO("sothibac","kho")},
  {n:"Gửi Kim Hựu Thành giữ bản chép, ngươi giữ bản thật",f:"bien",if:()=>PTHT(),wx:"hai nơi giữ, khó mất",lx:"Kim Hựu Thành biết hết",rt:"Kim Hựu Thành cất bản chép trong khoang thuyền.",go:()=>ptO("sothibac","ta")},
  {n:"Cho {maid} chép một bản, ngươi giữ bản thật",f:"bien",if:()=>!PTHT(),wx:"hai bản, khó mất",lx:"{maid} biết hết",rt:"{maid} chép suốt đêm.",go:()=>ptO("sothibac","ta")}]},
 x1:{h:"Thị bạc sứ vào kinh",w:"emp",t:()=>"Thị bạc sứ được gọi vào kinh trình sổ. Y mang theo cuốn sổ đẹp đẽ, mặt không đổi sắc. "+(ptO("sothibac")==="ta"?"Cuốn sổ thật nằm trong tay ngươi.":ptO("sothibac")==="kho"?"Cuốn sổ thật nằm trong kho Hộ bộ.":"Cuốn sổ thật vẫn ở trong rương của y."),o:[
  {n:"Dâng sổ thật lên Hoàng thượng, xin xét Thị bạc sứ",e:["win","lose"],rt:"Ngài so hai cuốn sổ, ném cuốn đẹp xuống đất. Thị bạc sứ bị lột mũ, giải đi.",rf:"Thị bạc sứ nói sổ của ngươi là sổ giả. Ngài cho Hộ bộ xét lại, việc kéo dài.",go:(A,ok)=>{if(ptO("sothibac")==="ta")ptO("sothibac","vua");return""}},
  {n:"Gặp riêng Thị bạc sứ, buộc y nghe lời ngươi từ nay",e:["win2","mid"],rt:"Thị bạc sứ quỳ xuống: từ nay thuyền nào vào bến Minh Châu, ngươi nói một câu là xong.",rf:"Thị bạc sứ không sợ, nói: “Công chúa cũng ăn trộm sổ.”"},
  {n:"Trả sổ lại, chỉ xin bớt thuế cho thuyền Tân La",e:"mid",lx:"Thị bạc sứ vẫn ngồi ghế",rt:"Thuyền Tân La được nộp một lần. Thị bạc sứ cúi đầu cảm ơn ngươi.",go:()=>{if(ptO("sothibac")==="ta")ptO("sothibac","tbs");return""}}]}},
 E:{win:{tag:"Thị bạc sứ bị giải",w:"emp",t:"Thị bạc sứ bị giải về Hình bộ. Bến Minh Châu có người mới ngồi ghế, và người ấy chào ngươi trước."},
  win2:{tag:"Thị bạc sứ nghe lời",w:"emp",t:()=>ptO("sothibac")==="ta"?"Thị bạc sứ vẫn ngồi ghế, nhưng cuốn sổ thật nằm trong tay ngươi. Bến Minh Châu nghe lời ngươi mà không ai biết vì sao.":"Thị bạc sứ vẫn ngồi ghế, nhưng biết ngươi nắm được việc của y. Bến Minh Châu nghe lời ngươi mà không ai biết vì sao."},
  mid:{tag:"Thuế một lần",t:"Thuyền Tân La nộp thuế một lần. Những giấy thông hành cho thuyền buồm đen thì không ai hỏi đến."},
  lose:{tag:"Sổ bị nói là giả",w:"v",t:"Thị bạc sứ còn ngồi ghế. Người nhà {v} kể khắp kinh: công chúa {land} sai người trộm sổ của quan."}}});

const PTDC=()=>ptO("daochem");/* the iron-cutting sword: it lies in the six crates (holder = hangdao's holder) until .9 takes it out */
rdDef("pt_dang",9,{t:"Thanh đao chém sắt",w:"emp",sj:"thanh đao chém sắt trong sáu hòm đao",cast(A){if(!ptO("daochem"))ptO("daochem",ptO("hangdao")||"kho");return rdCast(A,["v"])},
 g:()=>"Binh bộ mở hội thử binh khí. Trong sáu hòm đao {land} có một thanh khắc dấu thợ rèn bên kia bể, chém đứt một lưỡi đao Đại Hy làm hai. "+({vua:"Thanh đao ấy nằm trong kho ngự.",kho:"Thanh đao ấy nằm trong kho.",huuthanh:"Thanh đao ấy Kim Hựu Thành mang theo, chưa bán."})[PTDC()]+" Ngay hôm sau, {v} tâu: thanh đao ấy vốn được rèn để bán cho giặc.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Binh bộ hỏi thợ rèn",w:"emp",if:RDW(1),t:"Quan Binh bộ hỏi ngươi: thợ rèn thanh đao ấy là ai, có thể mời sang Đại Hy dạy nghề không.",o:[
  {n:"Viết thư cho {pv} xin gửi thợ rèn sang",f:"phep",wx:"hai nước có thêm một mối",lx:"bên kia có thể không muốn lộ nghề",rt:"Thư đi theo thuyền Tân La.",rf:"Thư đi mà không có hồi âm."},
  {n:"Thưa: thợ rèn là người của {pv}, không thể cho",f:"bien",wx:"giữ được bí quyết của {land}",lx:"Binh bộ không vui",rt:"Quan Binh bộ cười nhạt: “Thì ra bên ấy giữ nghề.”"},
  {n:"Hứa với Binh bộ, đổi lấy một lời bênh trước triều",f:"muu",wx:"Binh bộ đứng về phía ngươi",lx:"một lời hứa chưa chắc giữ được",rt:"Quan Binh bộ gật đầu: “Đao tốt thì không phải đao giặc.”"}]},
 s2:{h:"Đao bị nghi",w:"maid",if:RDW(0),t:"Cấm quân đến xem thanh đao, lắc đầu: đao tốt quá, giặc mà có thì thủy quân khó đánh.",o:[
  {n:"Mời cấm quân thử đao với giáp Đại Hy",f:"phep",wx:"thấy rõ đao chém được gì",lx:"đao càng bị sợ",rt:"Lưỡi đao rạch qua giáp, không mẻ."},
  {n:"Nói rõ đao đến từ thuyền hồi môn, có sổ",f:"bien",wx:"đao có gốc",lx:"phải đưa sổ ra",rt:"Cấm quân xem sổ hàng, gật đầu."},
  {n:"Cho người nói khẽ: đao giặc có là do Thị bạc ty bán giấy",f:"muu",wx:"mũi dùi quay sang chỗ khác",lx:"phải có chứng",rt:"Cấm quân bàn tán về Thị bạc ty.",rf:"Không ai tin."}]},
 c1:{h:"{v} tâu chuyện đao",w:"v",need:["v"],t:"{v} tâu với Hoàng hậu: có người thấy thuyền buồm đen chở đao {land} ở các đảo đá. Đao của công chúa, sao lại ở trong tay giặc?",o:[
  {n:"Xin Hoàng hậu cho đếm lại sáu hòm đao",wx:"đếm là biết thiếu hay đủ",lx:"phải mở hòm trước mọi người",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:()=>"Hòm đếm đủ, chỉ thiếu những thanh có giấy: "+(ptO("dao_vua")?"một thanh dâng Hoàng thượng, ":"")+(ptO("dao_v")?"một thanh ở nhà {v}, ":"")+(ptO("dao_ht")?"một thanh ở chỗ Kim Hựu Thành, ":"")+(ptO("dao_bb")?"một thanh ở Binh bộ, ":"")+"còn lại không sót thanh nào.",rf:"Hòm đếm đủ, nhưng {v} nói: “Đếm đủ thì đao giặc ở đâu ra?”"},
  {n:"Hỏi lại: đao ở nhà {v} có giấy, còn đao giặc thì giấy ở đâu?",if:()=>ptO("dao_v")==="v",wx:"{v} câm lời",lx:"thù hai nhà sâu thêm",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} tái mặt. Thanh đao nhà nàng có ấn của ngươi."},
  {n:"Hỏi lại: người thấy thuyền giặc là ai, sao không báo thủy quân?",if:()=>ptO("dao_v")!=="v",wx:"{v} lúng túng",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} không nói được tên người ấy."},
  {n:"Im lặng, xin Hoàng thượng xét",wx:"không cãi nhau",lx:"{v} nói trước",rt:"Hoàng hậu cho đợi ý ngài."}]},
 c2:{h:"Thư của giặc làm chứng",w:"maid",t:()=>({ta:"Lá thư của Ô Cửu vẫn trong hộp gỗ của ngươi.",vua:"Lá thư của Ô Cửu nằm trong Ngự thư phòng.",huuthanh:"Lá thư của Ô Cửu vẫn ở chỗ Kim Hựu Thành."})[ptO("thugiac")]+" Trong thư, giặc đòi bạc, không đòi đao.",o:[
  {n:"Đem thư ra làm chứng",wx:"có chứng giặc không cần đao",lx:"phải nói rõ vì sao có thư giặc",rt:"Lá thư được đặt cạnh sổ hàng.",rf:"Người ta hỏi: sao công chúa giữ thư giặc lâu thế?"},
  {n:"Giữ thư, không đem ra",wx:"không ai hỏi chuyện thư",lx:"mất một chứng",rt:"Lá thư nằm yên."},
  {n:"Bỏ bạc mời thầy đồ đọc chữ giặc trước triều",wx:"người đọc là người ngoài",lx:"bạc ra",rt:"Thầy đồ đọc từng chữ: bạc, bến, không đao."}]},
 t1:{h:"Hoàng thượng cầm đao",w:"emp",t:"Hoàng thượng cầm thanh đao lên, nhìn lưỡi rất lâu: “Đao này nàng muốn ai giữ?”",o:[
  {n:"Thưa: xin ngài giữ",f:"phep",wx:"đao trong tay ngài thì không ai nói",lx:"đao rời tay ngươi",rt:"Ngài treo đao trong Ngự thư phòng.",go:()=>ptO("daochem","vua")},
  {n:"Thưa: xin trả đao về cho thợ rèn bên kia bể",f:"bien",wx:"bí quyết ở lại bên ấy",lx:"Binh bộ tiếc",rt:"Ngài gật: “Đao về nhà, thì không ai nói nó là đao giặc.”",go:()=>ptO("daochem","tn")},
  {n:"Thưa: xin tặng Thống lĩnh thủy quân Minh Châu để đánh giặc",f:"muu",wx:"thủy quân nợ ngươi",lx:"đao vào tay người khác",rt:"Ngài cười: “Lấy đao người ta sợ đi đánh người ta.”",go:()=>ptO("daochem","thuyquan")}]},
 x1:{h:"Phiên xét thanh đao",w:"emp",t:"Binh bộ mở phiên xét. Thanh đao đặt trên án, {v} đứng một bên, ngươi đứng một bên.",o:[
  {n:"Trình thư của giặc và sổ hàng: giặc đòi bạc, không đòi đao",if:()=>["ta","vua","huuthanh"].includes(ptO("thugiac")),e:["win","lose"],rt:"Binh bộ đọc thư, so sổ, rồi phán: đao không phải đao giặc. {v} lui ra trước.",rf:"Binh bộ nói thư giặc ai cũng viết được.",go:()=>{if(ptO("thugiac")==="huuthanh")ptO("thugiac","vua");return""}},
  {n:"Xin Binh bộ mở sổ hàng của thuyền hồi môn ra đối chứng",if:()=>!["ta","vua","huuthanh"].includes(ptO("thugiac")),e:["win","lose"],rt:"Sổ hàng ghi đủ sáu hòm. Binh bộ phán: đao không phải đao giặc.",rf:"Binh bộ nói sổ hàng do người nhà công chúa ghi."},
  {n:"Xin Hoàng thượng phán, thiếp không cãi",e:["win2","mid"],rt:"Ngài phán: đao của {pv}, không phải đao giặc. Ai nói nữa thì xét người nói.",rf:"Ngài nói: “Để Binh bộ xét.”"},
  {n:"Nhận lỗi giữ đao trái phép, xin nộp cả sáu hòm vào kho",e:"mid",lx:"đao không còn là của ngươi",rt:"Sáu hòm đao vào kho Binh bộ. Không ai nói thêm.",go:()=>{if(["ta","vua"].includes(ptO("hangdao")))ptO("hangdao","kho");return""}}]}},
 E:{win:{tag:"Đao không phải đao giặc",w:"emp",t:"Phiên xét khép lại. Thanh đao chém sắt được gọi là “đao hồi môn”, và kẻ nói nó là đao giặc phải im.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  win2:{tag:"Lời của Hoàng thượng",w:"emp",t:"Ngài nói một lời, cả triều thôi bàn. Nhưng ai cũng biết: lời ấy là ngài che cho ngươi."},
  mid:{tag:"Đao vào kho",t:"Đao vào kho, chuyện đao thôi bàn. Ngươi mất đao mà giữ được yên."},
  lose:{tag:"Đao giặc",w:"v",t:"Phiên xét không kết. {v} kể khắp nơi: đao của công chúa {land} và đao của giặc rèn cùng một lò."}}});

rdDef("pt_dang",10,{t:"Bến cảng",w:"emp",sj:"số phận Ô Cửu ở bến Minh Châu",cast(A){if(ptAlive("ocuu")&&ptP("ocuu","w")==="hb"){ptMove("ocuu","nguc");RD_FL("pt_dang.bat",ptO("haido")==="ta"?"hd":"hang")}
  if(ptO("ruongbac")==="ocuu")ptO("ruongbac","thusu");return rdCast(A,["v"])},
 g:()=>(RD_FL("pt_dang.bat")==="hd"?"Thủy quân Minh Châu theo tấm hải đồ vây vịnh kín, bắt sống Ô Cửu. ":"Sau một trận bão, thuyền buồm đen vỡ mạn; Ô Cửu tự chèo xuồng vào bến xin hàng. ")+"Y bị giam trong ngục Minh Châu, rương bạc hồi môn nằm trong kho của thứ sử. Thứ sử muốn chém để răn, Kim Hựu Thành xin một phường cho thuyền Tân La, còn dân bến thì chờ xem triều xử kẻ biển ra sao.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ô Cửu xin gặp",w:"maid",if:()=>RDW(1)()&&PTOC()==="nguc",t:"Ngục tốt Minh Châu gửi thư lên: Ô Cửu xin được nói với công chúa một lời, qua người của nàng.",o:[
  {n:"Sai {maid} xuống ngục nghe y nói",f:"bien",wx:"biết y muốn gì",lx:"người ta nói ngươi qua lại với giặc",rt:"Ô Cửu nói: “Ta cướp vì không có bến. Cho ta một bến, ta giữ bến cho các người.”"},
  {n:"Để thứ sử hỏi cung theo phép",f:"phep",wx:"việc đúng phép",lx:"thứ sử hỏi theo ý thứ sử",rt:"Bản cung của Ô Cửu được gửi lên kinh."},
  {n:"Cho người dọa y: khai nhà {v} mua đồ cướp thì được sống",f:"muu",wx:"có lời khai đánh vào nhà {v}",lx:"lời khai ép là lời khai dễ lật",rt:"Ô Cửu cười, rồi khai đúng như người ta muốn nghe.",rf:"Ô Cửu nhổ xuống đất: “Ta là giặc, không phải chó săn.”",go:(A,ok)=>{if(ok)RD_FL("pt_dang.khaiv",1);return""}}]},
 s2:{h:"Thứ sử muốn chém",w:"emp",if:RDW(0),t:"Minh Châu thứ sử dâng sớ xin chém Ô Cửu ngay ở cửa bến cho dân xem. Sớ viết: chém một tên, bể yên mười năm.",o:[
  {n:"Xin ngài hoãn chém, cho xét kỹ",f:"phep",wx:"việc không vội",lx:"thứ sử phật lòng",rt:"Ngài phê: hoãn một tháng."},
  {n:"Gửi thư hỏi dân bến muốn gì",f:"bien",wx:"nghe tiếng dân",lx:"dân bến có người muốn chém, có người không",rt:"Dân chài nói: giặc có tội, nhưng giặc cũng là người bến cũ."},
  {n:"Để mặc thứ sử",f:"muu",wx:"không dính vào",lx:"Ô Cửu có thể chết trước khi ngươi kịp nói",rt:"Ngươi không gửi thư nào."}]},
 c1:{h:"Phường Tân La",w:"maid",if:()=>PTHT(),t:"Kim Hựu Thành xin ngươi tâu giúp: cho thuyền Tân La một phường riêng ở bến Minh Châu, có người Tân La tự xử việc trong phường.",o:[
  {n:"Hứa tâu giúp y",wx:"Kim Hựu Thành thành người của ngươi ở bến",lx:"thứ sử không vui",rt:"Kim Hựu Thành cúi lạy: “Phường Tân La sẽ mang ơn công chúa.”"},
  {n:"Khuyên y xin qua Hồng Lư tự",wx:"việc đúng đường",lx:"y thấy ngươi không giúp hết lòng",rt:"Kim Hựu Thành viết đơn gửi Hồng Lư tự."},
  {n:"Đòi y một phần lời của phường mỗi năm",wx:"có một nguồn bạc ở bến",lx:"người ta nói ngươi ăn chia với lái buôn",rt:"Kim Hựu Thành nhìn ngươi lâu, rồi gật đầu."}]},
 c2:{h:"{v} và lời khai",w:"v",need:["v"],t:()=>RD_FL("pt_dang.khaiv")?"Lời khai của Ô Cửu về nhà {v} đã đến tai {v}. Nàng ta đến cung ngươi, mặt trắng bệch.":"{v} nói với Hoàng hậu: chém ngay tên giặc ấy đi, kẻo y khai bừa hại người trong cung.",o:[
  {n:"Đốt lời khai trước mặt {v}, đổi lấy một lời hứa",if:()=>RD_FL("pt_dang.khaiv"),wx:"{v} nợ ngươi cả nhà",lx:"mất một chứng",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nhìn tờ giấy cháy, gật đầu: từ nay không động đến ngươi."},
  {n:"Dâng lời khai lên Hoàng hậu",if:()=>RD_FL("pt_dang.khaiv"),wx:"nhà {v} bị xét",lx:"lời khai ép có thể bị lật",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Hoàng hậu cho xét nhà {v}.",rf:"Ô Cửu bị hỏi lại, khai rằng bị ép."},
  {n:"Đáp: y khai gì thì cứ để triều nghe",if:()=>!RD_FL("pt_dang.khaiv"),wx:"không ai nói ngươi che giặc",lx:"{v} lo",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} im lặng."},
  {n:"Đồng ý với {v}: việc giặc nên xong nhanh",if:()=>!RD_FL("pt_dang.khaiv"),wx:"{v} thấy ngươi cùng ý",lx:"Ô Cửu gần cái chết hơn",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} cười, lần đầu cười thật với ngươi."},
  {n:"Không đáp",wx:"không thêm chuyện",lx:"{v} nói nhiều hơn",rt:"Ngươi uống trà."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Hoàng thượng hỏi: “Tên giặc ấy cướp của nàng. Nàng muốn trẫm xử y thế nào?”",o:[
  {n:"Thưa: tha y, cho y giữ bến",f:"bien",wx:"ngài thấy ngươi rộng lòng",lx:"ngài lo thả hổ về rừng",rt:"Ngài nói: “Nàng không sợ y trở mặt?”",rf:"Ngài lắc đầu: “Giặc mà giữ bến?”"},
  {n:"Thưa: theo luật mà xử",f:"phep",wx:"ngài thấy ngươi không thiên vị",lx:"Ô Cửu gần cái chết",rt:"Ngài gật: “Luật là luật.”"},
  {n:"Thưa: giữ y sống, để y khai hết bọn mua đồ cướp",f:"muu",wx:"ngài thấy một mối lợi",lx:"y sống thì còn chuyện",rt:"Ngài cười: “Nàng muốn dùng giặc bắt kẻ mua của giặc.”"}]},
 x1:{h:"Tờ phán ở cửa bến",w:"emp",t:()=>"Tờ phán sắp gửi xuống Minh Châu. "+PTBAC()+" Hoàng thượng chờ lời cuối của ngươi.",o:[
  {n:"Xin tha Ô Cửu, cho y và người của y giữ bến làm thủy binh",e:["win","lose"],rt:"Ô Cửu ra khỏi ngục, quỳ ở cửa bến nhận cờ thủy binh. Rương bạc được trả về cho ngươi.",rf:"Thứ sử can, ngài cho giam Ô Cửu thêm một năm.",go:(A,ok)=>{if(ok){ptMove("ocuu","cang");if(ptO("ruongbac")==="thusu")ptO("ruongbac","ta")}return""}},
  {n:"Xin giam Ô Cửu chờ xét, trả bạc về cho chủ",e:["win2","mid"],rt:"Ô Cửu ở lại ngục. Rương bạc hồi môn về đến cung ngươi, niêm phong còn nguyên.",rf:"Ô Cửu ở lại ngục. Rương bạc nộp kho Hộ bộ.",go:(A,ok)=>{if(ptO("ruongbac")==="thusu")ptO("ruongbac",ok?"ta":"kho");return""}},
  {n:"Để thứ sử chém theo luật",e:"mid",lx:"bể mất một người biết đường",rt:"Ô Cửu bị chém ở cửa bến. Rương bạc nộp kho Hộ bộ.",go:()=>{ptKill("ocuu");if(ptO("ruongbac")==="thusu")ptO("ruongbac","kho");return""}}]}},
 E:{win:{tag:"Giặc giữ bến",w:"emp",t:"Ô Cửu đứng ở cửa bến Minh Châu với lá cờ thủy binh. Dân bến nói: từ nay giặc biết mặt nhau, không ai dám vào."},
  win2:{tag:"Bạc về chủ",w:"emp",t:"Rương bạc hồi môn về đến cung ngươi. Ô Cửu ngồi trong ngục, chờ một ngày xét."},
  mid:{tag:"Một tờ phán",t:()=>ptAlive("ocuu")?"Ô Cửu ngồi trong ngục. Bến Minh Châu yên, nhưng chưa ai biết yên được bao lâu.":"Đầu Ô Cửu treo ở cửa bến ba ngày. Bến Minh Châu yên, nhưng người của y còn trên các đảo đá."},
  lose:{tag:"Tha mà không được",w:"v",t:"Lời xin tha giặc của ngươi bị bác. {v} kể khắp nơi: công chúa {land} xin tha cho kẻ đã cướp chính mình, chắc có chuyện gì."}}});

rdDef("pt_dang",11,{t:"Luật biển",w:"emp",sj:"luật biển cho bến Minh Châu",cast(A){return rdCast(A,["v"])},
 g:()=>"Hoàng thượng sai soạn luật biển cho bến Minh Châu: thuyền nào được vào, thuế thu mấy lần, giặc ra hàng thì xử sao. "+({cang:"Ô Cửu đang giữ cửa bến dưới cờ thủy binh.",nguc:"Ô Cửu vẫn ngồi trong ngục Minh Châu.",chet:"Ô Cửu đã chết; người của y còn trên các đảo đá."})[PTOC()]+" Bản thảo đầu tiên đặt trên án của ngươi, vì ai cũng biết bến ấy đã thay đổi từ ngày thuyền hồi môn của ngươi gặp nạn.",
 p:[["s1","s2"],["c1","c2","c3","c4"],["t1"],["x1"]],
 B:{s1:{h:"Bản thảo của Hộ bộ",w:"emp",if:RDW(1),t:"Hộ bộ gửi bản thảo luật: thuyền ngoại quốc nộp thuế một lần ở Thị bạc ty, có giấy thì được buôn, không giấy thì giữ thuyền.",o:[
  {n:"Thêm một điều: thuyền gặp nạn được cứu, không bị coi là hàng buôn",f:"bien",wx:"người đi bể được che",lx:"Hộ bộ mất một khoản",rt:"Hộ bộ ghi thêm điều ấy, đặt tên là “điều thuyền hồi môn”."},
  {n:"Giữ nguyên bản của Hộ bộ",/* pt6c: a draft text left unchanged; the draft stays with Hộ bộ */f:"phep",wx:"Hộ bộ nể ngươi",lx:"luật chẳng có gì mới",rt:"Hộ bộ cảm tạ."},
  {n:"Thêm một điều: Thị bạc sứ phải nộp sổ thật mỗi mùa lên kinh",f:"muu",wx:"Thị bạc ty khó ăn bớt",lx:"Thị bạc ty ghét ngươi",rt:"Điều ấy được viết thêm bằng mực son."}]},
 s2:{h:"Luật chưa có ai soạn",w:"maid",if:RDW(0),t:"Hộ bộ đùn cho Hồng Lư tự, Hồng Lư tự đùn cho Binh bộ. Bản thảo luật biển ba tháng vẫn trắng.",o:[
  {n:"Tự viết một bản, dâng lên Hoàng thượng",f:"bien",wx:"luật có hình hài",lx:"người ta nói phi tần soạn luật",rt:"Ngươi viết mười điều, mỗi điều một dòng."},
  {n:"Xin ngài giao hẳn cho Hộ bộ",f:"phep",wx:"việc có người lo",lx:"luật theo ý Hộ bộ",rt:"Ngài giao Hộ bộ, hạn một tháng."},
  {n:"Bỏ bạc mời một lão thư lại bến cũ lên kinh soạn giúp",f:"muu",wx:"người hiểu bến soạn luật bến",lx:"bạc ra",rt:"Lão thư lại kể cả đêm chuyện bến xưa, sáng ra có ba điều luật."}]},
 c1:{h:"Ô Cửu giữ bến",w:"maid",if:()=>PTOC()==="cang",t:"Từ cửa bến Minh Châu, Ô Cửu gửi lên một tờ giấy viết vụng: thủy binh của y bắt được hai thuyền buồm đen mới, xin triều xử theo luật mới.",o:[
  {n:"Xin luật mới cho giặc ra hàng được sống",wx:"giặc có đường về",lx:"dân bến có người không bằng lòng",rt:"Hai thuyền giặc ra hàng, nhập vào thủy binh của Ô Cửu."},
  {n:"Xin luật mới xử giặc như cũ",wx:"luật nghiêm",lx:"Ô Cửu thấy bị phản",rt:"Ô Cửu nhận lệnh, không nói gì."},
  {n:"Thưởng Ô Cửu bạc, bảo y giữ chặt bến",wx:"Ô Cửu càng trung",lx:"bạc ra",rt:"Ô Cửu treo thêm một ngọn đèn ở cửa bến."}]},
 c2:{h:"Ô Cửu trong ngục",w:"maid",if:()=>PTOC()==="nguc",t:"Vợ con những người theo Ô Cửu kéo đến cửa ngục Minh Châu, hỏi luật mới có cho người cũ của giặc ra hàng không.",o:[
  {n:"Xin luật mới cho người theo giặc được ra hàng",wx:"các đảo đá bớt người",lx:"người ta nói ngươi nương tay với giặc",rt:"Mười thuyền nhỏ từ các đảo đá vào bến nộp giáo."},
  {n:"Xin luật mới không tha người theo giặc",wx:"luật nghiêm",lx:"các đảo đá còn người",rt:"Cửa ngục đóng. Vợ con người theo giặc về đảo."},
  {n:"Gửi gạo cho vợ con họ",wx:"dân bến thấy ngươi thương người",lx:"bạc ra",rt:"Gạo phát ở cửa ngục ba ngày."}]},
 c3:{h:"Người của Ô Cửu",w:"maid",if:()=>PTOC()==="chet",t:"Người của Ô Cửu còn trên các đảo đá, không đầu lĩnh, cướp cả thuyền cá. Thứ sử xin thêm quân.",o:[
  {n:"Xin luật mới cho kẻ ra hàng được sống",wx:"các đảo đá có đường ra",lx:"dân bến có người không bằng lòng",rt:"Ba thuyền nhỏ ra hàng."},
  {n:"Xin thêm quân cho thứ sử",wx:"các đảo đá bị quét",lx:"quân phí",rt:"Thủy quân đi ba tháng, đảo đá vắng."},
  {n:"Bỏ bạc treo thưởng cho ai bắt được đầu lĩnh mới",wx:"giặc cắn nhau",lx:"bạc ra",rt:"Hai đầu lĩnh mới bị chính người của chúng trói nộp."}]},
 c4:{h:"{v} nước cờ cuối",w:"v",need:["v"],t:"{v} tâu: luật biển do phi tần ngoại quốc soạn, chẳng khác gì mở cửa bể cho người nước ngoài.",o:[
  {n:"Đáp: luật để thuyền Đại Hy cũng được che khi gặp nạn ở bể người",wx:"bá quan thấy lý",lx:"{v} ghi hận",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Hoàng thượng gật đầu.",rf:"Có quan tán thành {v}."},
  {n:"Mời nhà {v} góp một điều vào luật",wx:"{v} có phần, thôi cản",lx:"luật có một điều của nhà {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Nhà {v} góp điều thuế muối, {v} thôi tâu."},
  {n:"Nhắc chuyện anh họ {v} từng làm Thị bạc sứ",wx:"{v} câm lời",lx:"thù hai nhà sâu thêm",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} tái mặt, lui ra."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Đêm ấy Hoàng thượng hỏi: “Luật biển này, nàng muốn nó che ai?”",o:[
  {n:"Thưa: che người đi bể, của nước nào cũng vậy",f:"bien",wx:"ngài thấy lòng ngươi rộng",lx:"ngài lo Đại Hy thiệt",rt:"Ngài nói: “Bể không có biên giới, luật cũng thế.”",rf:"Ngài nói: “Che người nước khác, ai che người nước mình?”"},
  {n:"Thưa: che bến của Đại Hy",f:"phep",wx:"ngài yên lòng",lx:"người {land} thấy ngươi đứng hẳn về một bên",rt:"Ngài gật: “Bến của trẫm.”"},
  {n:"Thưa: che những người giữ lời",f:"muu",wx:"ngài thấy một cách nhìn mới",lx:"khó viết thành luật",rt:"Ngài cười: “Người giữ lời thì luật nào cũng che.”"}]},
 x1:{h:"Ngày ban luật",w:"emp",t:"Ngày ban luật, tờ chiếu đặt trên án. Hộ bộ, Binh bộ và Hồng Lư tự đứng chờ. Hoàng thượng hỏi lời cuối của ngươi.",o:[
  {n:"Xin ngài ban luật: bến mở cho mọi thuyền buôn, giặc ra hàng được tha",e:["win","lose"],rt:"Chiếu ban xuống. Cửa bến Minh Châu dựng bia đá khắc luật biển, có cả chữ Tân La và chữ {land}.",rf:"Binh bộ can: tha giặc là nuôi giặc. Ngài bỏ điều tha."},
  {n:"Xin ngài giao phường Tân La cho Kim Hựu Thành giữ, dưới Thị bạc ty",if:()=>ptAlive("huuthanh"),e:["win2","mid"],rt:"Ngài chuẩn. Kim Hựu Thành về bến Minh Châu giữ phường Tân La, sổ thu mỗi mùa gửi lên kinh.",rf:"Ngài nói: “Lái buôn giữ phường thì phải xét thêm.”"},
  {n:"Để Hộ bộ soạn luật theo lệ cũ",e:"mid",lx:"bến Minh Châu như cũ",rt:"Luật biển ra đời, giống hệt lệ cũ, thêm vài chữ."}]}},
 E:{win:{tag:"Bia luật biển",w:"emp",t:"Bia đá ở cửa bến Minh Châu khắc luật biển. Thuyền Tân La, thuyền {land}, thuyền Đại Hy cùng neo một bến; người đi bể gọi đó là “luật của công chúa”.",go:(_A,G)=>{if(PTHT())ptMove("huuthanh","cang");return e67bien(G[0])}},
  win2:{tag:"Phường Tân La",w:"emp",t:"Kim Hựu Thành giữ phường Tân La ở bến Minh Châu. Mỗi mùa gió, sổ của phường đến kinh trước sổ của Thị bạc ty.",go:()=>ptMove("huuthanh","cang")},
  mid:{tag:"Lệ cũ",t:"Bến Minh Châu theo lệ cũ. Ngươi vẫn có tên trên bản thảo đầu tiên, dù không ai đọc."},
  lose:{tag:"Luật bị bỏ dở",w:"v",t:"Luật biển bị gác lại. {v} nói: phi tần ngoại quốc thì đừng mong soạn luật Đại Hy.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"pt_dang_11",tag:"Ngọn đèn ba nước",w:"emp",n:"Xin dựng ở cửa bến Minh Châu một ngọn đèn biển, ba nước cùng giữ",
 path:["Mời Kim Hựu Thành vào","Giữ thư, nhờ Kim Hựu Thành","Thưa: thiếp muốn dùng đao","Hẹn Ô Cửu","Quyết đem ngọc chuộc người","Dâng sổ thật","Trình thư của giặc","Xin tha Ô Cửu","Thêm một điều"],
 bad:["Để thứ sử chém","Để Hộ bộ soạn luật","Thưa: rương bạc mất thì thôi"],x:[()=>S.tamco>=RR("pt_dang_11").bar,"Tâm cơ từ "+RR("pt_dang_11").bar],
 t:"Ngươi không xin thêm một điều luật nào, chỉ xin dựng ở cửa bến Minh Châu một ngọn đèn biển: dầu do thuyền Tân La góp, bấc do thuyền {land} góp, tháp do Đại Hy xây. Đêm đầu tiên đèn sáng, thuyền ba nước đều kéo buồm chào. Hoàng thượng đặt tên tháp là “Đăng Hải”, và cho khắc tên ngươi dưới chân tháp.",
 go:(_A,G)=>{if(PTHT())ptMove("huuthanh","cang");return e67bien(G[0])},rw:"nt_dongchau",ti:"Người thắp đèn biển"}));
