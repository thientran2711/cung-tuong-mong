/* ================= jrd_muoi: the four full roads of «Con gái nhà buôn muối» (muoi), chapters .5–.11 (ROAD_MAP.md §4.3) =================
   Same arc shape as j67 (p = pools of hồi: mở đầu / rắc rối / bước ngoặt / cao trào; B = hồi; E = kết cục). Openings read how the chapter
   before ended (RDW / rdPrev / rdEnd, OD:L1253); the road's people are cast once and carried (rdCast); hostile roles real both ways (rdRel /
   rdOan, OD:L1247); every option has a real gain AND a real loss (review road-map-r1); chapter-level numbers in BAL.road.<road> (ONE CORE).
   Engine + shared helpers: jroad.js. History rules: a consort is never in a court hall or at a trial (road-history pass 1). */
/* ---------- muoi_tuoc · Mua tước cho cha ---------- */
/* ROAD_MAP §4.3. .4 = ARC67.muoi_tuoc (win: tước Tử already granted; mid: a hư hàm; lose: silver spent, nothing).
   The road grows the father's title into one that lasts (truyền đời) or loses it. Rival {v} (an old scholar-official house that scorns
   merchant money) is cast from .5 and carried. BAL.road.muoi_tuoc.rkSeat = rank index from which a consort may write on the lanterns (.7). */
rdDef("muoi_tuoc",5,{t:"Người chịu nói giúp",w:"th",sj:"người chịu đứng tên bảo cử nhà ngươi",cast(A){return rdCast(A,["v"])},
 g:"Lệ triều đình: muốn tước của nhà thường dân được truyền hay được phong, phải có một đại thần đứng tên bảo cử. Bạc nhà ngươi có, nhưng chưa ai dám ký tên cạnh chữ “con buôn”. Còn {v} thì đã nói khắp cung rằng ký tên ấy là bẩn tay.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tước mới, ghế trống",w:"maid",if:RDW(1),t:"Tước Tử vừa phong, phụ thân lên kinh tạ ơn mà không một nhà quan nào mời ông ngồi chung mâm. Muốn tước ấy truyền cho cháu chắt, phải có đại thần bảo cử thêm một lần.",o:[
  {n:"Mở tiệc mừng, mời khắp triều",c:{bac:-50},o:()=>40+S.danh/4,w:{danh:3},sc:1,wx:"có người chịu ngồi chung mâm",l:{danh:-3},lx:"ghế trống thành chuyện cười",rt:"Ba vị Thị lang đến dự, nâng chén mừng phụ thân.",rf:"Khách mời cáo bệnh gần hết, ghế trống cả dãy."},
  {n:"Khuyên cha tự đến thăm từng nhà",c:{suc:-3},w:{duc:2},sc:1,f:"humble",wx:"cha học được lễ của sĩ phu",lx:"cha bị đóng cửa vài lần, tủi thân",rt:"Phụ thân đội mưa đi khắp các phủ, có nhà mời vào uống trà."},
  {n:"Nhờ Thái hậu nhắc một lời",need:["th"],c:{suc:-2},o:()=>45+S.th/3,w:{danh:2},sc:1,f:"th",wx:"Đức Thọ cung đứng sau",l:{th:-3},lx:"Thái hậu thấy ngươi đòi hỏi",rt:"Thái hậu khẽ nói với Thượng thư Lễ bộ một câu, ai cũng nghe.",rf:"Thái hậu nói: “Tước đã cho rồi, còn muốn gì nữa?”"}]},
 s2:{h:"Thiếu một chữ ký",w:"maid",if:RDW(0),t:"Hư hàm hay trắng tay, nhà ngươi vẫn chưa có tước thật. Thư phụ thân: “Bạc cha có, chỉ thiếu một người dám ký tên.”",o:[
  {n:"Tìm một vị quan nghèo mà có tiếng",c:{bac:-30},o:()=>45+S.mat*5,sc:1,f:"clean",wx:"người bảo cử sạch tiếng",l:{danh:-2},lx:"lộ ra ngươi đi tìm người",rt:"Một vị Hàn lâm già, nhà dột, chịu nghe ngươi nói.",rf:"Vị ấy trả thư: “Lão không bán chữ ký.”"},
  {n:"Xin cha chờ, tích công trước",c:{danh:-2},w:{duc:3},f:"humble",wx:"không vội vàng mà hỏng",lx:"cha kể khắp họ hàng rằng ngươi không chịu lo",rt:"Phụ thân hồi thư ngắn: “Được, cha chờ.”"},
  {n:"Nhờ {eun} dò người",c:{suc:-2},o:()=>50+S.mat*3,sc:1,f:"eun",wx:"biết vị quan nào đang túng bạc",l:{danh:-2},lx:"Tổng quản nắm một sợi dây của ngươi",rt:"{eun} đưa một mảnh giấy ghi ba cái tên.",rf:"{eun} cười: “Lão đâu biết gì chuyện ngoài triều.”"}]},
 c1:{h:"{v} chặn đường",w:"v",need:["v"],t:"{v} cho người nói với các nhà quan: ai ký tên bảo cử nhà buôn muối là tự hạ mình ngang con buôn. Hai vị đã định ký thì rút lui.",o:[
  {n:"Đến xin {v} đừng làm khó",c:{danh:-2},o:()=>35+S.danh/4+S.duc/8,sc:1,wx:"{v} nới tay",lx:"{v} kể khắp nơi ngươi đến cầu xin",go:(A,ok)=>{rdRel(A,"v",ok?10:-5)},rt:"{v} hừ một tiếng, nhưng từ đó không nói thêm.",rf:"{v} cười to: “Muối cũng biết xin à?”"},
  {n:"Đáp trả bằng chuyện nhà nàng",c:{suc:-2},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,wx:"nhà {v} cũng có chuyện giấu",l:{danh:-3},lx:"{v} oán ngươi",go:(A,ok)=>{rdOan(A,"v",ok?8:5)},rt:"Ngươi nhắc khéo khoản nợ cũ của nhà {v}; nàng im bặt.",rf:"{v} kể lại thành chuyện ngươi vu khống nhà nàng."},
  {n:"Mặc kệ, tìm nhà khác",c:{danh:-2},w:{duc:2},wx:"không gây thêm thù",lx:"mất hai người định bảo cử, cả cung thấy ngươi lùi",rt:"Ngươi gạch hai cái tên, viết thêm hai cái tên khác."}]},
 c2:{h:"Giá của mỗi người",w:"maid",t:"{maid} dò về: có ba người chịu nghe. Một Thị lang Lễ bộ đòi bạc, một Ngự sử già muốn nhà ngươi dựng trường học ở quê ông, một vị Hầu tước muốn nhà ngươi bao muối cho phủ ông mãi mãi.",o:[
  {n:"Trả bạc cho Thị lang",c:{bac:-60},o:()=>50+S.mat*4,sc:2,f:"buy",wx:"chữ ký đến nhanh",l:{danh:-3},lx:"chữ ký mua là chữ ký dễ lộ",rt:"Thị lang ký, mực còn chưa khô đã đòi thêm trà.",rf:"Thị lang nhận bạc rồi cáo bệnh."},
  {n:"Dựng trường cho quê Ngự sử",c:{bac:-40,suc:-2},w:{duc:3,danh:2},sc:1,f:"clean",wx:"người bảo cử có tiếng sạch",lx:"phải chờ trường dựng xong mới có chữ ký",rt:"Ngự sử già đến tận nơi xem trường, rồi mới cầm bút."},
  {n:"Hứa bao muối cho phủ Hầu",c:{},o:()=>45+S.tamco/4,sc:1,f:"hau",wx:"chữ ký không tốn bạc ngay",l:{danh:-2},lx:"nợ phủ Hầu một ân không bao giờ dứt",rt:"Hầu tước ký, kèm một câu: “Muối nhà ngươi, ta ăn cả đời.”",rf:"Hầu tước chê muối nhà ngươi không đủ trắng."}]},
 t1:{h:"Ai ký trước",w:"eun",t:"{eun} nói nhỏ: “Chữ ký đầu tiên quyết định ai dám ký theo. {Xung} chọn người cho khéo.”",o:[
  {n:"Để người tiếng sạch ký đầu",c:{suc:-2},w:{danh:2},f:"clean",wx:"người sau ký theo không ngại",lx:"chậm, phụ thân sốt ruột",rt:"Tên vị quan thanh liêm đứng đầu tờ bảo cử."},
  {n:"Để người quyền lớn ký đầu",c:{bac:-30},o:()=>45+S.mat*4,sc:1,f:"buy",wx:"kẻ nhỏ sợ mà ký theo",l:{danh:-3},lx:"người ta nói nhà ngươi lấy quyền ép",rt:"Thấy tên vị quyền thần, bốn người ký theo trong một buổi.",rf:"Có kẻ đồn nhà ngươi mua cả người đứng đầu."},
  {n:"Xin chính nhà {v} ký",need:["v"],c:{suc:-2},o:()=>25+S.tamco/3+S.danh/8,sc:2,wx:"kẻ chặn đường thành người mở đường",l:{danh:-3},lx:"{v} cười vào mặt ngươi",go:(A,ok)=>{if(ok)rdRel(A,"v",8);else rdOan(A,"v",4)},rt:"Một vị trưởng bối làm quan của nhà {v} ký, chữ nhỏ mà rõ. Cả triều ngạc nhiên.",rf:"{v} đem chuyện ngươi xin chữ ký đi kể khắp cung."}]},
 x1:{h:"Tờ bảo cử dâng lên",w:"emp",t:"Tờ bảo cử dâng lên Lễ bộ. Thượng thư Lễ bộ hỏi người bảo cử: “Ai bảo đảm nhà này không mua chữ?” Ngươi ở trong cung, chỉ còn nhờ được người.",o:[
  {n:"Để người bảo cử tự đứng ra đáp",c:{suc:-4},o:A=>35+(A.f.clean?12:0)-(A.f.buy?6:0)+S.danh/6,e:["win","lose"],rt:"Người bảo cử đáp từng lời, không vấp một chữ.",rf:"Người bảo cử ấp úng, Thượng thư Lễ bộ gạch tên."},
  {n:"Nhờ huynh trưởng nộp sổ nghĩa quyên",c:{},o:A=>40+(A.f.humble?10:0)+(rdEnd(4)==="win"?8:0),e:["win","mid"],rt:"Sổ nghĩa quyên dày một gang tay, Lễ bộ không cãi được.",rf:"Lễ bộ nhận sổ, nói để xét sau."},
  {n:"Viết thư bảo cha rút tờ bảo cử",c:{},w:{duc:3},e:"mid",lx:"mất một mùa, người bảo cử nguội lòng",rt:"Ngươi xin rút tờ bảo cử về."}]}},
 E:{win:{k:1,tag:"Có người bảo cử",w:"emp",t:"Tờ bảo cử được Lễ bộ nhận. Lần đầu tiên, tên nhà buôn muối nằm cạnh tên các nhà sĩ phu mà không ai dám gạch.",fx:{danh:5,th:2},go:A=>{rdOan(A,"v",5);return ""}},
  mid:{k:0,tag:"Bảo cử còn dở",t:"Có người chịu ký, nhưng chưa đủ. Tờ bảo cử nằm lại Lễ bộ, chờ một cơ duyên khác.",fx:{duc:2}},
  lose:{k:-1,tag:"Không ai dám ký",t:"Những người đã hứa lần lượt rút tên. {v} cười: “Bạc mua được muối, không mua được chữ.”",fx:{danh:-4}}}});

rdDef("muoi_tuoc",6,{t:"Bạc mở cửa",w:"eun",sj:"những món lễ nhà ngươi đưa vào cung",cast(A){return rdCast(A,["v"])},
 g:"Tờ sớ phong tước phải qua tay Nội vụ phủ, Lễ bộ và Tổng quản {eun} trước kỳ khóa ấn cuối năm. Lễ và hối lộ chỉ cách nhau một tờ giấy, và có người đang ghi sổ từng món ngươi đưa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sớ nằm im",w:"eun",if:RDW(1),t:"Có người bảo cử, tờ sớ được đưa vào Nội vụ phủ. {eun} giữ sớ ba ngày chưa trình, cười bảo: “Sớ nhiều, mắt lão kém.”",o:[
  {n:"Biếu {eun} một hộp bạc",c:{bac:-50},o:()=>50+S.mat*4,sc:1,f:"bribe",wx:"sớ được trình sớm",l:{danh:-3},lx:"{eun} ghi tên ngươi vào sổ riêng",rt:"Sáng hôm sau, tờ sớ nằm trên ngự án.",rf:"{eun} nhận bạc mà sớ vẫn nằm đó."},
  {n:"Tặng lão thuốc bổ cho mẹ già",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,f:"gift",wx:"lễ nhỏ mà tình to",lx:"lão nhận rồi vẫn có thể chần chừ",rt:"{eun} cầm hộp thuốc, mắt đỏ lên: “Tiểu chủ có lòng.”",rf:"{eun} cảm ơn, rồi lại nói sớ nhiều."},
  {n:"Nhờ Hoàng hậu hỏi về tờ sớ",need:["hh"],c:{suc:-2},o:()=>45+S.hh/3,sc:1,f:"clean",wx:"sớ đi đường chính",l:{hh:-3},lx:"Hoàng hậu thấy ngươi nóng ruột",rt:"Hoàng hậu hỏi một câu, Nội vụ phủ trình ngay.",rf:"Hoàng hậu nói: “Việc của Nội vụ phủ, bản cung không xen.”"}]},
 s2:{h:"Rương của cha",w:"maid",if:RDW(0),t:"Không đủ người bảo cử, phụ thân tính đường tắt: gửi vào cung một rương đồ quý để ngươi “lo”. Rương đến tay ngươi, trước kỳ khóa ấn cuối năm chưa đầy một mùa.",o:[
  {n:"Mở rương chia lễ khắp nơi",c:{duc:-3},w:{mat:1},sc:1,f:"bribe",wx:"nhiều cửa hé mở",lx:"lễ đi nhiều thì dấu để lại nhiều",rt:"Trâm, ngọc, gấm đi khắp các cung trong một tuần."},
  {n:"Trả rương về, viết thư khuyên cha",c:{suc:-2},w:{duc:3},f:"clean",wx:"tay ngươi sạch",lx:"thư qua lại với phụ thân đang giận, mệt người",rt:"Rương về đến nhà còn nguyên niêm."},
  {n:"Đổi rương thành lễ mừng thọ Thái hậu",need:["th"],c:{},o:()=>45+S.th/3,sc:1,f:"gift",wx:"lễ thành lòng hiếu",l:{th:-2},lx:"Thái hậu biết đồ là nhà buôn gửi",rt:"Thái hậu ngắm bình ngọc, khen ngươi biết chọn.",rf:"Thái hậu hỏi: “Đồ này của con, hay của nhà con?”"}]},
 c1:{h:"Sổ lễ Nội vụ phủ",w:"eun",t:"Ngươi nghe tin Nội vụ phủ có một cuốn sổ chép mọi món lễ vào cung. Tên nhà ngươi có trong đó, ghi cả số bạc.",o:[
  {n:"Mua lại trang sổ ấy",c:{bac:-40},o:()=>40+S.mat*5,sc:1,f:"bribe",wx:"xóa được dấu",l:{danh:-4},lx:"kẻ bán sổ đem chuyện đi kể",rt:"Trang sổ được xé ra, đốt trong lò hương.",rf:"Kẻ giữ sổ nhận bạc rồi khoe với bạn rượu."},
  {n:"Để nguyên, ghi rõ là lễ mừng thọ",c:{suc:-2},w:{duc:2},f:"clean",wx:"lễ minh bạch, không sợ tra",lx:"số bạc lớn nằm đó, ai cũng đọc được",rt:"Bên số bạc có thêm một dòng: lễ mừng thọ."},
  {n:"Dò xem trong sổ còn tên ai",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:1,f:"dirt",wx:"biết những nhà khác cũng đưa lễ",l:{danh:-2},lx:"bị bắt gặp lục sổ",rt:"Trong sổ có cả tên những nhà thế gia hay chê nhà ngươi.",rf:"Người giữ sổ thấy, đóng sổ lại."}]},
 c2:{h:"Chiếc trâm đi lạc",w:"v",need:["v"],t:"{v} khoe trước mặt các phi tần một chiếc trâm do Nội vụ phủ “nhầm” đưa đến: đó là trâm trong rương lễ của nhà ngươi.",o:[
  {n:"Đòi lại trâm trước mọi người",c:{},o:()=>40+S.danh/4,w:{danh:2},wx:"{v} bẽ mặt",l:{danh:-3},lx:"ai cũng biết nhà ngươi đưa lễ",go:(A,ok)=>{rdOan(A,"v",ok?10:5)},rt:"{v} đỏ mặt trả trâm, cả phòng nín cười.",rf:"{v} hỏi to: “Trâm của tỷ tỷ sao lại nằm trong rương lễ?”"},
  {n:"Để nàng giữ, coi như quà",c:{danh:-2},w:{duc:2},wx:"{v} nợ ngươi một lần",lx:"cả cung thấy ngươi để mất trâm, nàng giữ vật chứng",go:A=>{rdRel(A,"v",6)},rt:"{v} cài trâm lên tóc, không nói gì thêm."},
  {n:"Lặng lẽ tra ai đưa nhầm",c:{suc:-3},o:()=>45+S.mat*4,w:{mat:1},sc:1,f:"dirt",wx:"bắt được kẻ ăn cắp trong Nội vụ phủ",lx:"kẻ ấy trốn, chuyện lan ra",rt:"Một thái giám Nội vụ phủ bị bắt, khai đã bán trâm cho người của {v}.",rf:"Thái giám ấy xin về quê trước khi bị hỏi."}]},
 t1:{h:"Phần cuối cùng",w:"eun",t:"{eun} nói thẳng: “{Xung} muốn sớ đến ngự án trước kỳ khóa ấn, thì cần thêm một phần. Không thì sang năm.”",o:[
  {n:"Đưa phần cuối",c:{bac:-60},sc:1,f:"bribe",wx:"sớ đến kịp năm nay",lx:"{eun} giữ một sợi dây trên cổ nhà ngươi",rt:"{eun} cất bạc vào tay áo, gật đầu."},
  {n:"Từ chối, chờ sang năm",c:{danh:-2},w:{duc:3},f:"clean",wx:"không để lại dấu",lx:"{eun} xếp sớ xuống cuối, mất một năm",rt:"Ngươi đáp: “Sang năm cũng được.” {eun} nhíu mày."},
  {n:"Nhắc khéo lão về cuốn sổ lễ",if:A=>A.f.dirt,c:{suc:-2},o:()=>45+S.tamco/3,sc:2,wx:"lão phải trình mà không dám đòi",l:{danh:-3},lx:"lão thành kẻ thù",rt:"{eun} cười gượng: “{Xung} nhớ kỹ thật.” Sớ được trình ngay.",rf:"{eun} lạnh mặt: “Sổ nào? Lão không biết.”"}]},
 x1:{h:"Sớ đến ngự án",w:"emp",t:"Tờ sớ đến ngự án đúng lúc Hoàng thượng đang đọc một tờ khác: Ngự sử tố có phi tần đưa lễ qua Nội vụ phủ.",o:[
  {n:"Đêm ấy tâu rõ từng món lễ",c:{suc:-4},o:A=>35+(A.f.clean?15:0)-(A.f.bribe?8:0)+S.danh/6,e:["win","lose"],rt:"Hoàng thượng nghe hết, gật đầu: “Lễ thì là lễ.”",rf:"Hoàng thượng nghe đến món thứ ba thì gác bút."},
  {n:"Để {eun} lo liệu như đã hứa",c:{bac:-30},o:A=>30+(A.f.bribe?12:0)+S.mat*3,e:["win","mid"],rt:"{eun} khéo đặt tờ sớ của ngươi lên trên tờ tố.",rf:"{eun} chỉ giữ được sớ khỏi bị xé."},
  {n:"Xin rút sớ, chờ yên chuyện",c:{},w:{duc:3},e:"mid",lx:"tước chậm thêm một năm",rt:"Ngươi xin rút sớ trước khi ai kịp hỏi."}]}},
 E:{win:{k:1,tag:"Sớ phong tước đến tay vua",w:"emp",t:"Tờ sớ đến ngự án sạch sẽ. Hoàng thượng phê một chữ “Xét”, đủ cho Lễ bộ biết phải làm gì.",fx:{danh:5,sung:2}},
  mid:{k:0,tag:"Sớ gác sang năm",t:"Tờ sớ không mất, nhưng phải chờ sang năm. Phụ thân viết: “Cha chờ được.”",fx:{duc:2}},
  lose:{k:-1,tag:"Tên nhà trong sổ lễ",t:"Ngự sử chép tên nhà ngươi vào tờ tố. Từ đó, mỗi lần nói đến tước, có người nhắc đến cuốn sổ lễ.",fx:{danh:-5}}}});

rdDef("muoi_tuoc",7,{t:"Con nhà buôn",w:"v",sj:"lời chê xuất thân của ngươi ở yến Trung thu",cast(A){return rdCast(A,["v"])},
 g:"Yến Trung thu ở Ngự hoa viên. {v} đã chuẩn bị sẵn một màn để cả cung nhớ ngươi là con gái nhà buôn muối. Lần này bạc không giúp được: phải hơn người bằng chính mình.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tước cân bằng cân nào",w:"v",if:RDW(1),t:"Sớ phong tước đã đến ngự án, cả cung biết. Ở yến Trung thu, {v} cười: “Nghe nói sắp có Tử tước bán muối, chẳng hay tước ấy cân bằng cân nào?”",o:[
  {n:"Cười đáp: cân bằng cân công đức",c:{},o:()=>40+S.tamco/3,w:{danh:3},wx:"câu đáp được truyền khắp cung",l:{danh:-3},lx:"câu đáp vụng, thành trò cười",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Cả bàn bật cười, lần này không phải cười ngươi.",rf:"{v} vặn lại: “Công đức cũng mua bằng bạc à?”"},
  {n:"Nâng chén mời {v}, không đáp",c:{suc:-2},w:{duc:3},sc:1,wx:"người ta khen ngươi độ lượng",lx:"{v} được nước lấn tới",rt:"{v} đành nâng chén, lời chê rơi xuống đất."},
  {n:"Nhìn sang Thái hậu, chờ bà lên tiếng",need:["th"],c:{},o:()=>35+S.th/3,w:{th:2},wx:"Thái hậu đỡ lời",l:{danh:-2},lx:"Thái hậu làm ngơ, ngươi đứng trơ",rt:"Thái hậu nói: “Muối nuôi cả thiên hạ, có gì đáng cười?”",rf:"Thái hậu nhấp trà, như không nghe."}]},
 s2:{h:"Chỗ ngồi cuối dãy",w:"v",if:RDW(0),t:"Tờ sớ chưa đến đâu, cả cung đã biết. Ở yến Trung thu, Nội vụ phủ xếp ngươi ngồi cuối dãy, sau cả những người bậc dưới. {v} che miệng cười.",o:[
  {n:"Lặng lẽ ngồi xuống",c:{danh:-2},w:{duc:3},wx:"không ai bắt được lỗi",lx:"ai cũng thấy ngươi bị xếp cuối",rt:"Ngươi ngồi thẳng lưng ở cuối dãy."},
  {n:"Hỏi Nội vụ phủ xếp theo lệ nào",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},wx:"chỗ ngồi được trả đúng lệ",l:{danh:-2},lx:"bị nói làm ồn ở yến",rt:"Quản sự Nội vụ phủ cuống quýt xếp lại chỗ.",rf:"Quản sự nói: “Lệ là do trên định.”"},
  {n:"Cáo bệnh, bỏ yến",c:{sung:-2},w:{suc:3},wx:"khỏi chịu nhục",lx:"Hoàng thượng thấy ghế trống",rt:"Ngươi về cung, nghe tiếng nhạc vọng từ xa."}]},
 c1:{h:"Câu đố muối",w:"v",need:["v"],t:"{v} đề nghị chơi đố chữ. Câu nào cũng xoay quanh muối, cá, chợ búa, chờ ngươi đáp hớ.",o:[
  {n:"Đáp bằng điển tích",c:{suc:-2},o:()=>35+S.tai/3,w:{danh:3},sc:1,f:"wit",wx:"cả bàn phục ngươi biết chữ",l:{danh:-3},lx:"đáp sai, càng bị cười",go:(A,ok)=>{if(ok)rdOan(A,"v",5)},rt:"Ngươi đáp bằng chuyện Quản Trọng nấu biển làm muối mà nước Tề giàu. {v} cứng họng.",rf:"Ngươi nhầm một điển tích, {v} sửa lại thật to."},
  {n:"Kể chuyện thật về nghề muối",c:{},o:()=>40+S.tamco/4+S.duc/6,w:{duc:2},sc:1,f:"true",wx:"người nghe thấy mồ hôi người làm muối",l:{danh:-2},lx:"bị chê kể chuyện chợ",rt:"Ngươi kể về ruộng muối nắng cháy da. Cả bàn lặng đi.",rf:"{v} ngáp dài giữa câu chuyện."},
  {n:"Từ chối chơi",c:{danh:-2},w:{suc:2},wx:"không mắc bẫy",lx:"người ta nói ngươi sợ",rt:"Ngươi mỉm cười lắc đầu."}]},
 c2:{h:"Bánh bị trả lại",w:"maid",t:"Ngươi gửi tặng các cung bánh Trung thu nhân muối hoa quê nhà. Ba cung trả lại, kèm lời: “Đồ chợ không dám nhận.”",o:[
  {n:"Gửi lần nữa, kèm thư tay",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"hai trong ba cung nhận",l:{danh:-2},lx:"bị trả lần hai",rt:"Thư tay chữ đẹp, hai cung nhận bánh.",rf:"Bánh lại về, thư bị gấp đôi."},
  {n:"Đem bánh chia cho cung nhân",c:{danh:-2},w:{duc:3,mat:1},f:"true",wx:"cung nhân nhớ ơn ngươi",lx:"phi tần càng cười ngươi gần kẻ hầu",rt:"Cung nữ các cung kháo nhau về bánh nhân muối hoa."},
  {n:"Ghi tên ba cung ấy",c:{suc:-2},w:{tamco:2},wx:"biết ai coi thường ngươi",lx:"lòng thêm nặng, mất ngủ mà chẳng gỡ được gì",rt:"Ngươi ghi ba cái tên vào sổ riêng."}]},
 t1:{h:"Đèn hoa đăng",w:"emp",t:()=>`Đèn được treo khắp Ngự hoa viên. Theo lệ, ai từ bậc ${RANKS[BAL.road.muoi_tuoc.rkSeat].n} trở lên được đề thơ lên đèn; người dưới bậc ấy dâng một món tài nghệ.`,o:[
  {n:"Đề thơ lên đèn",if:()=>S.rank>=BAL.road.muoi_tuoc.rkSeat,c:{suc:-2},o:()=>40+S.tai/3,w:{danh:3},sc:1,f:"wit",wx:"thơ treo cao cho cả cung đọc",l:{danh:-3},lx:"thơ kém cũng treo cao cho cả cung đọc",rt:"Bài thơ về sóng biển và hạt muối được Hoàng thượng đứng đọc lâu.",rf:"Có người đọc thơ ngươi rồi bấm nhau cười."},
  {n:"Dâng một khúc đàn",c:{suc:-3},o:()=>35+S.tai/3,w:{sung:2},sc:1,f:"wit",wx:"Hoàng thượng dừng chân nghe",l:{danh:-2},lx:"đàn lạc phím giữa yến",rt:"Tiếng đàn lặng cả vườn.",rf:"Một dây đàn đứt giữa khúc."},
  {n:"Nhường người khác đề trước",c:{danh:-2},w:{duc:2},wx:"không tranh với ai",lx:"đêm nay không ai nhớ đến ngươi",rt:"Ngươi đứng sau, ngắm đèn."}]},
 x1:{h:"Trước mặt Hoàng thượng",w:"emp",t:"Hoàng thượng đến muộn, hỏi: “Nghe nói ở đây có người chê xuất thân của ái phi?” Cả yến im phăng phắc. {v} cúi đầu chờ ngươi lên tiếng.",o:[
  {n:"Tâu: thiếp không nghe ai chê",c:{},o:A=>40+(A.f.true?8:0)+S.duc/5,e:["win","mid"],go:(A,ok)=>{if(ok)rdRel(A,"v",8)},rt:"Hoàng thượng nhìn ngươi lâu: “Rộng lượng.” {v} thở ra, mặt đỏ bừng.",rf:"Hoàng thượng gật đầu, nhưng lời chê vẫn ở lại trong yến."},
  {n:"Kể lại từng lời, xin ngài phân xử",c:{suc:-4},o:A=>30+(A.f.wit?12:0)+S.sung/5,e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"Hoàng thượng phạt {v} chép Nữ giới, nói: “Chê người là chê trẫm chọn.”",rf:"Hoàng thượng nhíu mày: “Chuyện yến tiệc mà cũng phải phân xử?”"},
  {n:"Tự nhận: thiếp là con nhà buôn muối",c:{},w:{duc:3},e:"mid",lx:"lời chê vẫn còn đó",rt:"Ngươi nói: “Muối nhà thiếp nuôi nửa Giang Nam.” Có người gật, có người cười."}]}},
 E:{win:{k:1,tag:"Hơn người bằng chính mình",w:"emp",t:"Sau yến Trung thu, không ai trong cung gọi ngươi là “con nhà buôn” trước mặt nữa. Người ta nhớ bài thơ, nhớ câu đáp, không nhớ mùi muối.",fx:{danh:6,sung:2}},
  mid:{k:0,tag:"Yến tàn, lời chê lắng",t:"Yến tàn. Lời chê không thắng, cũng không thua. Nó lắng xuống, chờ một dịp khác.",fx:{duc:2}},
  lose:{k:-1,tag:"Vẫn là con nhà buôn",t:"Câu chuyện yến Trung thu được kể lại nhiều lần, lần nào ngươi cũng là người bị cười.",fx:{danh:-5}}}});

rdDef("muoi_tuoc",8,{t:"Công với triều đình",w:"emp",sj:"con đê Giang Nam nhà ngươi bỏ bạc đắp",cast(A){return rdCast(A,["v"])},
 g:"Lũ thu phá đê sông ở quê nhà. Phụ thân muốn bỏ bạc đắp lại để có công với triều đình, nhưng bạc phải qua tay quan huyện, và đê phải xong trước mùa lũ năm sau. Công thật hay công mua, người ta sẽ nhìn vào con đê.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một lời trước mặt vua",w:"emp",if:RDW(1),t:"Sau yến Trung thu, Hoàng thượng hỏi ngươi về quê nhà. Ngươi nhắc đến con đê vỡ; ngài nói: “Nhà nàng có lòng thì trẫm ghi nhớ.”",o:[
  {n:"Xin cho nhà tự đứng ra đắp",c:{bac:-30},w:{sung:2},sc:1,f:"own",wx:"Hoàng thượng chờ xem",lx:"nhà phải gánh trọn tiền đắp đê",rt:"Hoàng thượng gật: “Đê xong, trẫm sai người xuống xem.”"},
  {n:"Xin triều đình đắp, nhà góp bạc",c:{bac:-40},w:{danh:3},wx:"công chia với triều đình, chắc chắn hơn",lx:"công của nhà nhỏ đi",rt:"Công bộ nhận bạc, ghi tên nhà ngươi vào sổ góp."},
  {n:"Tâu nhà còn túng vốn, xin để sau",c:{sung:-2},w:{suc:2},wx:"giữ được bạc nhà",lx:"Hoàng thượng nhớ ngươi thoái thác",rt:"Hoàng thượng không nói gì, lật sang trang tấu khác."}]},
 s2:{h:"Có bạc mà không có công",w:"maid",if:RDW(0),t:"Sau yến Trung thu, người ta vẫn gọi nhà ngươi là “nhà có bạc mà không có công”. Thư phụ thân: “Vậy thì cha đắp đê. Con lo cho tiếng ấy đến tai vua.”",o:[
  {n:"Viết thư báo Hộ bộ việc nhà góp",c:{suc:-2},o:()=>45+S.danh/4,w:{danh:2},sc:1,wx:"triều biết trước nhà có công",l:{danh:-2},lx:"bị nói là khoe",rt:"Hộ bộ ghi việc đắp đê vào sổ trình.",rf:"Có kẻ nói: “Chưa đắp đã khoe.”"},
  {n:"Để cha làm âm thầm",c:{danh:-2},w:{duc:3},f:"quiet",wx:"công thật thì tự sáng",lx:"triều không ai nhắc tên nhà ngươi",rt:"Phụ thân thuê thợ, không treo một lá cờ."},
  {n:"Sai {maid} về quê trông việc",c:{bac:-20},w:{mat:1},sc:1,f:"eye",wx:"có người của ngươi ở chân đê",lx:"{maid} vắng, trong cung thiếu người",rt:"{maid} lên thuyền về Giang Nam ngay trong đêm."}]},
 c1:{h:"Quan huyện ăn bớt",w:"maid",t:"Tin từ quê: quan huyện thu bạc đắp đê của nhà ngươi, đem trộn đất với rơm. Chưa đầy nửa năm nữa là mùa lũ.",o:[
  {n:"Tố quan huyện lên Hộ bộ",c:{suc:-3},o:A=>40+(A.f.eye?12:0)+S.danh/5,w:{danh:3},sc:1,f:"sue",wx:"đê được giao người khác trông",l:{danh:-3},lx:"quan huyện có người che, nhà ngươi bị nói vu",rt:"Quan huyện bị đổi đi, đê giao cho một viên Chủ sự Công bộ.",rf:"Hộ bộ trả đơn: “Chứng cứ đâu?”"},
  {n:"Gửi thêm bạc thuê thợ riêng",c:{bac:-50},sc:1,f:"own",wx:"đê vững thật",lx:"bạc đổ hai lần, quan huyện vẫn ung dung",rt:"Thợ của nhà đắp lại từng thước đê."},
  {n:"Nhắm mắt cho qua",c:{duc:-2},w:{suc:2},f:"weak",wx:"không gây chuyện với quan",lx:"làm ngơ cho quan tham, đê yếu",rt:"Ngươi gấp thư lại."}]},
 c2:{h:"Công mua",w:"v",need:["v"],t:"{v} nói trước mặt Hoàng hậu: “Đắp đê bằng bạc thì ai chẳng đắp được. Công mua mà cũng gọi là công sao?”",o:[
  {n:"Đáp: bạc ấy làm ra từ ruộng muối",c:{},o:()=>40+S.tamco/3,w:{danh:2},wx:"lời {v} bị bẻ lại",l:{danh:-2},lx:"bị cho là cãi trước mặt Hoàng hậu",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng hậu gật đầu: “Bạc làm ra bằng mồ hôi thì là công.”",rf:"Hoàng hậu bảo cả hai im."},
  {n:"Xin Hoàng hậu cử người xem đê",need:["hh"],c:{suc:-2},o:()=>45+S.hh/3,sc:1,f:"seen",wx:"có người của Trung cung làm chứng",l:{hh:-3},lx:"Hoàng hậu thấy ngươi kéo bà vào",rt:"Hoàng hậu sai một thái giám Trung cung xuống Giang Nam.",rf:"Hoàng hậu nói: “Bản cung không quản đê điều.”"},
  {n:"Im lặng, để con đê trả lời",c:{danh:-2},w:{duc:2},wx:"không thêm lời thừa",lx:"lời {v} đọng lại trong tai Hoàng hậu",rt:"Ngươi chỉ cúi đầu."}]},
 t1:{h:"Lũ đến sớm",w:"maid",t:"Mưa dầm đến sớm hơn mọi năm. Nước lên đến chân đê mới đắp, dân làng đứng trên đê nhìn xuống.",o:[
  {n:"Gửi bạc mua bao cát gấp",c:{bac:-40},o:A=>50+(A.f.own?15:0)-(A.f.weak?15:0),sc:2,wx:"đê đứng vững qua đêm",l:{danh:-3},lx:"bao cát đến muộn",rt:"Bao cát chất kín mặt đê trước khi nước lên đỉnh.",rf:"Thuyền chở bao cát mắc cạn giữa đường."},
  {n:"Xin Công bộ điều lính",c:{sung:-3},o:()=>40+S.sung/4,sc:1,wx:"triều đình chung tay giữ đê",l:{sung:-2},lx:"Công bộ đáp việc nhà buôn thì nhà buôn lo",rt:"Ba trăm lính xuống đắp đê trong đêm.",rf:"Công bộ trả lời chậm ba ngày."},
  {n:"Cầu trời, chờ",c:{suc:-2},w:{duc:2},f:"pray",wx:"không tốn thêm gì",lx:"thức trắng đêm, phó mặc may rủi",rt:"Ngươi thắp hương suốt đêm."}]},
 x1:{h:"Ngự sử về xem đê",w:"emp",t:"Hoàng thượng sai Ngự sử về xem đê. Lời tâu của y sẽ quyết định công của nhà ngươi là thật hay là mua.",o:[
  {n:"Nhờ cha mời Ngự sử đến tận làng",c:{suc:-4},o:A=>35+(A.f.own?10:0)-(A.f.weak?12:0)+S.duc/6,e:["win","lose"],rt:"Dân làng quỳ kín hai bên đê, kể từng đêm nhà ngươi giữ đê.",rf:"Dân làng sợ quan, không ai dám nói."},
  {n:"Bảo cha trình sổ chi tiêu từng đồng",c:{},o:A=>40+(A.f.sue?10:0)+(A.f.seen?8:0)+S.mat*3,e:["win","mid"],rt:"Ngự sử đọc sổ, tâu: “Không thiếu một đồng.”",rf:"Ngự sử khen sổ rõ, nhưng nói đê chưa qua đủ một mùa lũ."},
  {n:"Để nhà biếu Ngự sử lộ phí",c:{bac:-50},w:{danh:1},e:"mid",lx:"công còn mà mang tiếng lót tay",rt:"Ngự sử nhận lộ phí, tâu vừa đủ khen."}]}},
 E:{win:{k:1,tag:"Công đê được ghi",w:"emp",t:"Lời tâu của Ngự sử khen con đê nhà ngươi đắp. Hoàng thượng phê: “Có công với dân.” Lần này không ai nói đó là công mua.",fx:{danh:7,sung:2}},
  mid:{k:0,tag:"Công nửa thật nửa mua",t:"Đê đứng, nhưng lời tâu nhạt. Triều đình ghi nhà ngươi “có góp”, không ghi “có công”.",fx:{danh:2}},
  lose:{k:-1,tag:"Đê vỡ, công thành tội",t:"Một đoạn đê vỡ, nước tràn hai làng. Người ta nói nhà buôn muối đắp đê bằng rơm để lấy tiếng.",fx:{danh:-5,bac:-30}}}});

rdDef("muoi_tuoc",9,{t:"Tố mua quan bán tước",w:"emp",sj:"tờ sớ tố nhà ngươi mua tước",cast(A){return rdCast(A,["v"])},
 g:"Một Ngự sử dâng sớ: nhà buôn muối đem bạc mở đường phong tước, ấy là mua quan bán tước. Người đứng sau tờ sớ là nhà {v}. Án mà thành thì cả những gì nhà ngươi đã có cũng bị tước lại.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sớ tố sau lời khen",w:"emp",if:RDW(1),t:"Công đê vừa được khen thì sớ tố đến. Ngự sử viết: “Đê đắp bằng bạc, bạc ấy là bạc mua tước.”",o:[
  {n:"Xin Hoàng thượng đọc cả sổ đê",c:{suc:-3},o:()=>45+S.sung/4,w:{danh:2},sc:1,f:"open",wx:"sổ đê cãi thay ngươi",l:{sung:-3},lx:"ngài thấy ngươi dạy ngài cách đọc tấu",rt:"Hoàng thượng đặt hai tờ cạnh nhau, khẽ cười.",rf:"Hoàng thượng nói: “Trẫm tự biết đọc.”"},
  {n:"Dò xem ai đứng sau Ngự sử",c:{bac:-30},o:()=>40+S.mat*5,sc:1,f:"root",wx:"biết bàn tay đứng sau",lx:"dò mà lộ, Ngự sử tố thêm tội",rt:"Người đưa giấy mực cho Ngự sử là gia nhân nhà {v}.",rf:"Ngự sử biết bị dò, thêm một dòng vào sớ."},
  {n:"Im lặng chờ triều xét",c:{danh:-2},w:{duc:3},wx:"không ai bắt được lời nào",lx:"sớ tố đi một mình, không ai cãi",rt:"Ngươi đóng cửa cung chép kinh."}]},
 s2:{h:"Họ muốn gỡ cả biển",w:"maid",if:RDW(0),t:"Đê không được khen, nay lại thêm sớ tố. Thư phụ thân run rẩy: “Họ muốn gỡ cả tấm biển trước cửa nhà ta.”",o:[
  {n:"Bảo cha nộp hết sổ sách",c:{danh:-2},w:{duc:2},sc:1,f:"open",wx:"nhà không giấu gì",lx:"sổ nào cũng có chỗ bắt bẻ, triều xì xào",rt:"Phụ thân chất sổ đầy hai xe, đưa lên Đại Lý tự."},
  {n:"Gửi bạc cho cha thuê thầy kiện",c:{bac:-40},sc:1,f:"law",wx:"có người cãi giỏi",lx:"thêm một khoản bạc để người ta đếm",rt:"Thầy kiện giỏi nhất Giang Nam nhận lời."},
  {n:"Xin Thái hậu che chở",need:["th"],c:{suc:-2},o:()=>40+S.th/3,w:{th:2},sc:1,wx:"Đức Thọ cung đứng sau",l:{th:-3},lx:"Thái hậu ngại dính vào án",rt:"Thái hậu nói: “Ai gia biết nhà con.”",rf:"Thái hậu nói: “Án là việc triều đình.”"}]},
 c1:{h:"Sổ lễ năm xưa",w:"eun",t:A=>rdEnd(6)==="lose"?"Cuốn sổ lễ của Nội vụ phủ lại xuất hiện, lần này trong tay Ngự sử. Tên nhà ngươi đã nằm sẵn ở đó từ năm trước.":"Ngự sử đòi Nội vụ phủ nộp sổ lễ các năm. {eun} gửi lời: trong sổ có tên nhà ngươi.",o:[
  {n:"Chứng minh lễ là lễ mừng thọ",c:{suc:-2},o:()=>40+(rdEnd(6)==="win"?15:0)+S.danh/5,sc:1,wx:"lễ thành lễ, không thành hối lộ",l:{danh:-3},lx:"lời giải thích nghe như chối",rt:"Ngày tháng trong sổ khớp đúng lễ mừng thọ.",rf:"Ngự sử hỏi: “Mừng thọ ai mà lễ nặng vậy?”"},
  {n:"Mua chuộc người giữ sổ",c:{bac:-50},o:()=>45+S.mat*4,sc:1,f:"bribe",wx:"sổ mất một trang",l:{danh:-5},lx:"mua chuộc lần nữa là tự nhận tội",rt:"Trang sổ biến mất trước khi Ngự sử kịp đọc.",rf:"Người giữ sổ đem bạc nộp luôn cho Ngự sử."},
  {n:"Nhận một phần, xin xét phần còn lại",c:{danh:-3},w:{duc:3},sc:1,f:"open",wx:"thật thà được người nể",lx:"đã nhận là có lỗi",rt:"Ngươi nhận có đưa lễ, xin xét lễ ấy có mua được gì không."}]},
 c2:{h:"Nhà {v} cũng từng mua",w:"v",need:["v"],t:"Người của ngươi tìm ra: ông nội {v} năm xưa cũng nộp bạc vào quốc khố mà được tước. Nhà nàng cũng từng là nhà giàu mới.",o:[
  {n:"Đem chuyện ra giữa triều",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},sc:2,wx:"sớ tố quay về chính nhà {v}",l:{danh:-4},lx:"bị nói là đào mồ cha ông người khác",go:(A,ok)=>{rdOan(A,"v",ok?14:8)},rt:"Cả triều xì xào. Ngự sử lặng lẽ rút bớt hai khoản.",rf:"Người ta nói ngươi không cãi được thì bôi nhọ."},
  {n:"Gặp riêng {v}, đổi im lặng lấy im lặng",c:{},o:()=>45+S.tamco/4,sc:1,f:"deal",wx:"{v} rút tay khỏi tờ sớ",l:{danh:-2},lx:"{v} kể ngươi uy hiếp",go:(A,ok)=>{if(ok)rdRel(A,"v",6);else rdOan(A,"v",8)},rt:"{v} cắn môi gật đầu.",rf:"{v} đi thẳng đến Hoàng hậu kể ngươi đe dọa."},
  {n:"Giữ kín, không dùng",c:{danh:-2},w:{duc:3},wx:"tay ngươi không bẩn",lx:"lá bài nằm im, sớ tố cứ đi",rt:"Ngươi cất tờ giấy vào đáy rương."}]},
 t1:{h:"Hình bộ gọi huynh trưởng",w:"emp",t:"Đại Lý tự triệu huynh trưởng của ngươi lên kinh hỏi chuyện. Huynh trưởng sợ, gửi thư hỏi ngươi nên khai thế nào.",o:[
  {n:"Bảo huynh khai hết sự thật",c:{danh:-2},w:{duc:3},sc:1,f:"open",wx:"lời khai không có chỗ hở",lx:"sự thật có cả những khoản lễ, triều xì xào",rt:"Huynh trưởng khai từng khoản, quan tra ghi không kịp."},
  {n:"Dạy huynh lời khai",c:{suc:-2},o:()=>45+S.tamco/3,sc:1,f:"law",wx:"lời khai gọn, khéo",l:{danh:-3},lx:"lời khai bị bắt bẻ, huynh lúng túng",rt:"Huynh trưởng đáp gọn từng câu.",rf:"Quan tra hỏi ngược một câu, huynh trưởng nói lộ."},
  {n:"Xin cho huynh cáo bệnh",c:{sung:-2},wx:"huynh khỏi phải ra công đường",lx:"Đại Lý tự cho là nhà ngươi trốn",rt:"Huynh trưởng nằm nhà, có thái y làm chứng."}]},
 x1:{h:"Phiên đối chất",w:"emp",t:"Đại Lý tự mở phiên đối chất. Ngự sử đọc từng khoản bạc nhà ngươi đã chi, huynh trưởng thay nhà đứng đáp. Ngươi ở trong cung, chỉ gửi được lời qua người nhà.",o:[
  {n:"Dặn huynh xin đọc từng khoản đến cuối",c:{suc:-4},o:A=>35+(A.f.open?12:0)-(A.f.bribe?10:0)+S.duc/6,e:["win","lose"],rt:"Đọc hết, khoản nào cũng là đê, là chùa, là cứu đói. Ngự sử lặng thinh.",rf:"Giữa các khoản có một khoản không giải thích được."},
  {n:"Để thầy kiện bẻ từng lời",c:{bac:-40},o:A=>40+(A.f.law?12:0)+(A.f.root?8:0)+S.tai/6,e:["win","mid"],rt:"Thầy kiện hỏi ngược: “Bạc cứu đói cũng là bạc mua tước sao?”",rf:"Thầy kiện cãi giỏi, nhưng Đại Lý tự chỉ xử treo."},
  {n:"Khuyên cha dâng biểu nộp lại hư hàm",c:{danh:-3},w:{duc:4},e:"mid",lx:"nhà mất cái đã có",rt:"Phụ thân dâng biểu: “Nhà thần không cần tước, chỉ cần tiếng sạch.”"}]}},
 E:{win:{k:1,tag:"Sớ tố bị bác",w:"emp",t:"Đại Lý tự tâu lên, Hoàng thượng phê bác tờ sớ. Ngự sử bị phạt bổng vì tố không chứng cứ, và ai cũng biết giấy mực của y đến từ đâu.",fx:{danh:6,duc:2},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Án treo",t:"Án không thành, cũng không bác. Nó treo trên đầu nhà ngươi như một lưỡi dao chưa rơi.",fx:{duc:2}},
  lose:{k:-1,tag:"Nhà mang tiếng mua tước",t:"Hoàng thượng phê theo lời Đại Lý tự: có dấu hiệu dùng bạc mở đường. Tước chưa bị tước, nhưng tiếng thì đã mất.",fx:{danh:-6}}}});

rdDef("muoi_tuoc",10,{t:"Chiếu phong tước",w:"emp",sj:"tờ chiếu phong tước cho nhà ngươi",cast(A){return rdCast(A,["v"])},
 g:"Án tố đã qua, triều nghị lần cuối về tước của nhà ngươi: phong, hoãn, hay bác. Thái hậu, Hoàng thượng và cả nhà {v} đều có lời. Ai cũng chờ xem ngươi nói gì, và không nói gì.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hai bản chiếu thảo",w:"emp",if:RDW(1),t:"Sớ tố bị bác, triều đình nợ nhà ngươi một lời. Lễ bộ soạn hai bản chiếu: một bản phong tước truyền đời, một bản phong tước một đời.",o:[
  {n:"Xin bản truyền đời",c:{suc:-3},o:()=>40+S.sung/4,sc:2,wx:"nhắm đến tước lâu dài",l:{sung:-3},lx:"bị cho là tham",rt:"Hoàng thượng gác bản một đời sang bên.",rf:"Hoàng thượng nói: “Tham thì thâm.”"},
  {n:"Xin bản một đời, để đời sau tự lập",c:{danh:-2},w:{duc:3},sc:1,f:"modest",wx:"triều khen nhà biết phận",lx:"cháu chắt không có tước, họ hàng chê",rt:"Lễ bộ ghi lời ngươi vào sổ triều nghị."},
  {n:"Không xin gì",c:{sung:-1},w:{danh:2},wx:"không ai bắt bẻ được",lx:"Hoàng thượng thấy ngươi thờ ơ, Lễ bộ tự chọn",rt:"Ngươi chỉ tạ ơn."}]},
 s2:{h:"Lễ bộ xin hoãn",w:"emp",if:RDW(0),t:"Án chưa sạch hẳn. Lễ bộ tâu xin hoãn việc phong tước cho nhà ngươi đến khi tiếng nhà trong lại.",o:[
  {n:"Xin Thái hậu nói một lời",need:["th"],c:{suc:-2},o:()=>40+S.th/3,sc:2,wx:"Đức Thọ cung đỡ lời",l:{th:-3},lx:"Thái hậu mệt vì chuyện nhà ngươi",rt:"Thái hậu nói: “Hoãn thì hoãn, nhưng đừng bỏ.”",rf:"Thái hậu chỉ thở dài."},
  {n:"Gửi thêm bạc cứu tế để rửa tiếng",c:{bac:-60},w:{danh:3},sc:1,wx:"tiếng nhà trong lại phần nào",lx:"lại thêm bạc để người ta đếm",rt:"Ba nghìn thạch gạo đến các làng ven đê."},
  {n:"Chấp nhận hoãn",c:{danh:-2},w:{duc:3},wx:"khỏi tranh cãi",lx:"người ta nói nhà ngươi bị gác, phụ thân già có khi không kịp thấy",rt:"Ngươi viết thư báo phụ thân. Thư hồi chỉ một chữ: “Ừ.”"}]},
 c1:{h:"Phụ thân lâm bệnh",w:"maid",t:"Tin nhà: phụ thân lâm bệnh, nằm nhìn tấm biển trước cửa mà nói: “Chỉ mong thấy tờ chiếu.”",o:[
  {n:"Xin về thăm cha",c:{sung:-3},o:()=>35+S.sung/4,w:{duc:3},sc:1,wx:"phụ thân thấy mặt con",l:{sung:-2},lx:"bị từ chối, lòng thêm nặng",rt:"Ngươi về đến nơi, phụ thân ngồi dậy được.",rf:"Hoàng thượng nói: “Phi tần không về nhà vì cha ốm.”"},
  {n:"Gửi Thái y giỏi về quê",c:{bac:-40},w:{duc:2},sc:1,wx:"phụ thân khá lên",lx:"bị nói lạm dụng Thái y viện",rt:"Thái y bắt mạch, kê đơn, phụ thân ăn được cháo."},
  {n:"Viết thư dỗ cha",c:{suc:-1},w:{duc:2},wx:"phụ thân đọc thư mà cười",lx:"bệnh vẫn nặng",rt:"Ngươi viết suốt đêm, kể chuyện trong cung cho cha vui."}]},
 c2:{h:"{v} khóc ở Đức Thọ cung",w:"v",need:["v"],t:"{v} vào Đức Thọ cung, khóc kể nhà nàng chịu tiếng oan vì ngươi, xin đừng để nhà buôn muối đứng ngang nhà nàng.",o:[
  {n:"Đến Đức Thọ cung cùng lúc",c:{suc:-3},o:()=>40+S.th/3,sc:1,wx:"Thái hậu nghe hai phía",l:{danh:-3},lx:"thành cảnh hai phi tần cãi nhau trước Thái hậu",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Thái hậu nghe xong, bảo {v} về.",rf:"Thái hậu đuổi cả hai ra."},
  {n:"Gửi lời làm hòa với {v}",c:{bac:-30},o:()=>40+S.duc/4,wx:"{v} thôi cản đường",lx:"{v} khinh ngươi xuống nước",go:(A,ok)=>{rdRel(A,"v",ok?12:-4)},rt:"{v} nhận lễ, lần đầu gọi ngươi là tỷ tỷ.",rf:"{v} trả lễ, kèm một nụ cười lạnh."},
  {n:"Mặc nàng khóc",c:{th:-2},w:{suc:2},wx:"không tốn sức",lx:"Thái hậu nghe một phía, nghiêng về {v}",rt:"Ngươi ở lại cung, đọc sách."}]},
 t1:{h:"Một câu hỏi đêm",w:"emp",t:"Hoàng thượng lật bản chiếu thảo, hỏi ngươi: “Nếu trẫm phong, nhà nàng lấy gì đáp triều đình?”",o:[
  {n:"Đáp: nhà thiếp nộp thuế muối đủ từng đấu",c:{},o:()=>40+S.tai/3+S.danh/6,sc:2,f:"tax",wx:"ngài thấy nhà ngươi đáng tin",l:{sung:-2},lx:"ngài cho là câu đáp của con buôn",rt:"Hoàng thượng gật: “Thuế đủ là trung.”",rf:"Hoàng thượng nói: “Thuế là phận, không phải công.”"},
  {n:"Hứa nhà sẽ lập nghĩa thương",c:{bac:-50},w:{danh:2},sc:1,f:"granary",wx:"kho thóc cứu đói mang tên nhà",lx:"lời hứa là món nợ phải trả mỗi năm",rt:"Hoàng thượng ghi lời hứa vào bản chiếu thảo."},
  {n:"Đáp: thiếp không dám bàn việc triều",c:{sung:-1},w:{duc:2},wx:"ngài thấy ngươi biết phận",lx:"bỏ lỡ lời cuối, ngài hơi thất vọng",rt:"Hoàng thượng cười, không hỏi thêm."}]},
 x1:{h:"Triều nghị phong tước",w:"emp",t:"Mai là triều nghị. Người ta kể một lão thần đã soạn sẵn lời: “Con buôn đứng hàng sĩ phu, từ đời nào có?” Đêm nay Hoàng thượng ở cung ngươi, là lúc cuối ngươi còn nói được.",o:[
  {n:"Đêm nay xin Hoàng thượng xét công đê",c:{suc:-4},o:A=>35+(rdEnd(8)==="win"?12:0)+S.sung/6,e:["win","lose"],rt:"Hôm sau ở triều, Hoàng thượng hỏi lại lão thần: “Đê của khanh đâu?” Cả điện im.",rf:"Hôm sau lão thần tâu: “Đê ấy có đoạn vỡ.” Triều nghị nghiêng về phía bác."},
  {n:"Xin Thái hậu nói một lời",need:["th"],c:{th:-4},o:A=>40+S.th/5,e:["win","mid"],rt:"Thái hậu sai người truyền: “Ai gia thấy nhà ấy có lòng.”",rf:"Thái hậu chỉ nói được một chữ hoãn."},
  {n:"Xin phong tước một đời thôi",c:{},w:{duc:3},e:"mid",lx:"tước không truyền cho cháu chắt",rt:"Hoàng thượng nghe ngươi, hôm sau chỉ đưa ra bản một đời. Lão thần không còn gì để cãi."}]}},
 E:{win:{k:1,tag:"Chiếu phong tước ban xuống",w:"emp",t:"Hoàng thượng hạ chiếu: phụ thân được phong tước, khắc vào sổ tước của triều. Lão thần đập hốt hôm ấy cáo bệnh ba ngày.",fx:{danh:6,th:2}},
  mid:{k:0,tag:"Chiếu hoãn",t:"Chiếu chưa ban, cũng chưa bác. Lễ bộ cất bản thảo vào hộp, chờ năm sau.",fx:{duc:2}},
  lose:{k:-1,tag:"Chiếu bác",t:"Hoàng thượng nghe triều nghị, gác việc phong tước. {v} gửi sang cung ngươi một hũ muối, không kèm lời nào.",fx:{danh:-5}}}});

rdDef("muoi_tuoc",11,{t:"Tước vị của nhà",w:"emp",sj:"tước vị của nhà buôn muối",cast(A){return rdCast(A,["v"])},
 g:"Tước đã phong hay chưa, đây là hồi cuối của nhà buôn muối trong đời ngươi. Phụ thân già rồi. Tấm biển trước cửa sẽ treo lại cho cháu chắt, hay bị gỡ xuống, là ở ngươi. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Pháo đỏ ở quê",w:"maid",if:RDW(1),t:"Chiếu phong tước về đến quê, cả huyện đốt pháo. Phụ thân gửi vào cung một hũ muối hoa đầu mùa, kèm một chữ: “Đủ.”",o:[
  {n:"Khuyên cha mở trường cho con nhà nghèo",c:{bac:-40},w:{duc:3,danh:2},sc:1,wx:"tước có thêm tiếng học",lx:"bạc nhà vơi đi",rt:"Trường mở ở bến muối, học trò đầu tiên là con dân làm muối."},
  {n:"Khuyên cha giữ mình, đừng khoe",c:{danh:-2},w:{duc:2},sc:1,f:"clean",wx:"nhà không thêm kẻ ghen",lx:"cả vùng chê nhà có tước mà keo",rt:"Phụ thân tháo bớt đèn lồng, đóng cổng tiếp khách."},
  {n:"Mở tiệc lớn mừng tước",c:{bac:-30},w:{danh:3},wx:"cả vùng đến chúc",lx:"người ta lại nói nhà giàu mới",rt:"Tiệc kéo dài ba ngày, quan huyện ngồi ghế dưới."}]},
 s2:{h:"Dưới tấm biển cũ",w:"maid",if:RDW(0),t:"Tờ chiếu không như mong. Phụ thân ngồi lặng dưới tấm biển cũ, nửa tháng không ra cửa.",o:[
  {n:"Viết thư: nhà ta không cần tước để sống ngay",c:{suc:-2},w:{duc:3},sc:1,f:"clean",wx:"phụ thân hiểu lòng con",lx:"viết suốt đêm, phụ thân đọc mà vẫn buồn",rt:"Phụ thân treo bức thư cạnh tấm biển."},
  {n:"Gửi bạc lo lần cuối",c:{bac:-50},o:()=>40+S.mat*4,sc:2,wx:"còn một cửa chưa đóng",l:{danh:-3},lx:"lại mang tiếng dùng bạc",rt:"Một vị Thị lang nhận lời tâu lại việc nhà ngươi.",rf:"Bạc đi, không thấy hồi âm."},
  {n:"Xin Hoàng thượng một lời an ủi cho cha",c:{sung:-3},o:()=>35+S.sung/4,w:{danh:2},sc:1,wx:"phụ thân được một chữ ngự bút",l:{sung:-2},lx:"bị coi là xin xỏ",rt:"Hoàng thượng viết hai chữ “Cần kiệm” gửi về quê.",rf:"Hoàng thượng nói: “Việc đã xong.”"}]},
 c1:{h:"Huynh trưởng muốn mua chức",w:"maid",t:"Huynh trưởng thấy nhà có danh, muốn bỏ bạc mua một chức quan ở huyện. Phụ thân hỏi ý ngươi.",o:[
  {n:"Ngăn huynh lại",c:{suc:-2},w:{duc:3},sc:1,f:"clean",wx:"nhà không thêm vết mới",lx:"huynh giận, cãi nhau mệt người",rt:"Huynh trưởng giận ba ngày, rồi thôi."},
  {n:"Để huynh đi thi khoa cử",c:{bac:-20},o:()=>30+S.tai/3,sc:1,wx:"chức có được bằng chữ",l:{danh:-2},lx:"huynh trượt, thành chuyện cười",rt:"Huynh trưởng đỗ Cử nhân, cả bến muối mừng.",rf:"Huynh trưởng trượt, người ta nói con buôn học đòi."},
  {n:"Lo cho huynh một chức nhỏ",c:{bac:-50},w:{mat:1},f:"buy",wx:"nhà có người trong quan trường",lx:"lại một khoản bạc mua chức",rt:"Huynh trưởng thành Chủ bộ huyện nhà."}]},
 c2:{h:"Bức thư của {v}",w:"v",need:["v"],t:"{v} gửi đến một bức thư ngắn: nàng muốn biết ngươi còn giữ chuyện ông nội nàng nộp bạc được tước hay không.",o:[
  {n:"Đốt bức thư cũ trước mặt nàng",c:{tamco:-2},w:{duc:3},sc:1,f:"peace",wx:"mối hận dừng lại ở đây",lx:"mất lá bài cuối trong tay",go:A=>{rdRel(A,"v",15)},rt:"{v} nhìn tro bay, lần đầu nói: “Đa tạ.”"},
  {n:"Giữ lá bài, đáp lạnh nhạt",c:{duc:-2},w:{tamco:2},wx:"{v} không bao giờ dám động nữa",lx:"{v} hận ngươi đến cuối, lòng ngươi thêm hẹp",go:A=>{rdOan(A,"v",8)},rt:"Ngươi hồi thư một dòng: “Còn.”"},
  {n:"Đổi lá bài lấy lời nàng nói giúp",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,wx:"nhà {v} đứng về phía ngươi ở triều nghị",l:{danh:-2},lx:"{v} nói giúp nửa vời",go:(A,ok)=>{if(ok)rdRel(A,"v",8);else rdOan(A,"v",4)},rt:"Một trưởng bối nhà {v} lên tiếng giúp nhà ngươi một câu.",rf:"{v} nhận giấy, rồi quên lời hứa."}]},
 t1:{h:"Lễ dâng cuối năm",w:"emp",t:"Cuối năm, các nhà có danh vị dâng lễ vào cung. Nhà ngươi dâng gì, cả triều đều nhìn.",o:[
  {n:"Dâng muối hoa đầu mùa",c:{bac:-20},w:{danh:2},sc:1,f:"root",wx:"không quên gốc",lx:"có người lại cười mùi muối",rt:"Hoàng thượng nếm một hạt, nói: “Mặn mà sạch.”"},
  {n:"Dâng sổ thuế muối của nhà mười năm",c:{suc:-2},o:()=>40+S.tai/4,sc:2,f:"tax",wx:"công nhà nằm trên giấy trắng mực đen",l:{danh:-2},lx:"bị chê dâng sổ như dâng hóa đơn",rt:"Hộ bộ đọc, Hoàng thượng phê: “Nhà này chưa nợ triều đình một đấu.”",rf:"Có kẻ cười: “Dâng sổ sách thay dâng lễ.”"},
  {n:"Dâng vàng bạc như các nhà khác",c:{bac:-60},w:{sung:2},wx:"không ai chê lễ mỏng",lx:"lẫn vào đám đông, không ai nhớ",rt:"Lễ nhà ngươi nằm giữa các rương vàng khác."}]},
 x1:{h:"Tờ chiếu chưa đóng ấn",w:"emp",t:"Đầu xuân, Hoàng thượng triệu ngươi. Trên án là tên phụ thân và một tờ chiếu chưa đóng ấn.",o:[
  {n:"Xin cho tước truyền đời",c:{suc:-4},o:A=>35+(rdEnd(10)==="win"?12:0)+S.sung/6,e:["win","lose"],rt:"Hoàng thượng đóng ấn: “Truyền.”",rf:"Hoàng thượng đặt ấn xuống: “Nàng xin nhiều quá.”"},
  {n:"Xin tước chỉ vì công, không vì bạc",c:{},o:A=>45+(A.f.clean?8:0)+(A.f.tax?6:0)+S.duc/6,e:["win","mid"],rt:"Hoàng thượng gật: “Vì công, thì truyền được.”",rf:"Hoàng thượng viết thêm: tước vì công, một đời."},
  {n:"Xin không cần tước, chỉ cần tên sạch",c:{},w:{duc:4},e:"mid",lx:"nhà không có tước truyền",rt:"Hoàng thượng nhìn ngươi lâu, rồi viết hai chữ “Thanh thương” lên tờ chiếu."}]}},
 E:{win:{k:1,tag:"Tước truyền đời",w:"emp",t:"Nhà buôn muối có tước truyền đời. Tấm biển trước cửa được sơn lại, và cháu chắt sau này sẽ không ai phải nghe câu “mùi muối” nữa.",fx:{danh:8,sung:3}},
  mid:{k:0,tag:"Tước vì công, một đời",t:"Phụ thân giữ tước đến cuối đời, tước không truyền. Nhưng sổ triều ghi rõ: tước ấy vì công, không vì bạc.",fx:{danh:3,duc:3}},
  lose:{k:-1,tag:"Biển bị gỡ, nhà mang tiếng",t:"Tờ chiếu không đóng ấn. Tấm biển trước cửa nhà bị gỡ xuống. Nhà ngươi vẫn giàu, vẫn bán muối, và vẫn bị gọi là nhà buôn.",fx:{danh:-4}}}});
RD97L.push({a:"muoi_tuoc_11",tag:"Hoàng thương ngự phong",w:"emp",p:.1,n:"Xin cho nhà dâng muối vào Ngự thiện phòng",c:{suc:-4},
 path:["Khuyên cha mở trường","Khuyên cha giữ mình","Viết thư: nhà ta không cần tước","Ngăn huynh lại","Đốt bức thư cũ","Dâng muối hoa đầu mùa","Dâng sổ thuế muối"],np:2,bad:["Lo cho huynh một chức nhỏ","Dâng vàng bạc","Gửi bạc lo lần cuối"],sc:2,x:[()=>S.danh>=45,"Danh từ 45"],
 t:"Ngươi không xin tước, chỉ xin cho muối nhà được vào bếp vua. Hoàng thượng nếm muối nhà ngươi một năm, rồi hạ chỉ: nhà buôn muối Giang Nam là Hoàng thương, muối ngự thiện lấy từ ruộng nhà ấy, đời đời. Tấm biển mới khắc hai chữ ngự bút, và không ai trong triều còn dám nói chữ “con buôn” như một lời chê.",
 fx:{danh:12,bac:80},rw:"ngocboi",ti:"Con gái nhà Hoàng thương"});

/* ---------- muoi_lau · Thuyền muối đêm ---------- */
/* ROAD_MAP §4.3. .4 = ARC67.muoi_lau (win: house cleared, made a salt-office agent; mid: father lives, half the fortune lost;
   lose: fined, branded smugglers). Rival {v} is the one cast in .4 (her people paid the steward) and is carried; the framing salt house
   is her in-laws (nhà thông gia), backed by the Diêm vận sứ of Giang Khẩu. BAL.road.muoi_lau.rkSend = rank index from which a consort may
   ask Nội vụ phủ to send goods into a prison (.8). */
rdDef("muoi_lau",5,{t:"Sổ thuyền",w:"maid",sj:"sổ hải trình của thuyền muối nhà ngươi",cast(A){return rdCast(A,["v"])},
 g:"Án Giang Khẩu đã khép, nhưng sổ thuyền của nhà ngươi vẫn nằm ở Diêm vận ty. Ai ghi, ai sửa, ai xé trang, sổ sẽ nói. Phải lấy được sổ trước kỳ Diêm vận ty đốt sổ cũ cuối năm.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Mấy trang sổ thiếu",w:"maid",if:RDW(1),t:"Nhà ngươi được minh oan, lại được giao làm đầu mối muối quan. Ngày nhận việc, quản sự mới báo: sổ thuyền năm ngoái thiếu mấy trang, đúng những đêm thuyền bị giấu muối.",o:[
  {n:"Bảo cha đòi Diêm vận ty trả đủ sổ",c:{suc:-2},o:()=>40+S.danh/4,sc:1,f:"page",wx:"có lại sổ gốc",l:{danh:-2},lx:"Diêm vận ty ghét nhà mới được việc, nói ngươi cậy thế",rt:"Diêm vận ty miễn cưỡng trả ba trang sổ còn sót.",rf:"Diêm vận ty đáp: “Sổ cũ đã hủy theo lệ.”"},
  {n:"Nhờ huynh trưởng thuê người chép sổ",c:{bac:-30},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"copy",wx:"có bản chép từng dòng",l:{mat:-1},lx:"người chép bị bắt, mất một tai mắt",rt:"Bản chép về đến tay ngươi, mực còn ướt.",rf:"Người chép bị lính kho bắt giữa đêm."},
  {n:"Để yên, lo việc muối quan cho tốt",c:{danh:-2},w:{bac:30},wx:"làm ăn suôn sẻ",lx:"người ta nói nhà ngươi được việc rồi thì quên oan cũ",rt:"Thuyền muối quan của nhà đi đều mỗi tuần."}]},
 s2:{h:"Chữ của kẻ hại",w:"maid",if:RDW(0),t:"Phụ thân giữ được mạng mà nhà mất của. Ông viết: “Sổ thuyền còn ở Diêm vận ty. Trong đó có chữ của kẻ hại nhà ta.” Cuối năm sổ cũ sẽ bị đem đốt.",o:[
  {n:"Nhờ thầy kiện xin sao sổ",c:{bac:-40},o:()=>45+S.danh/5,sc:1,f:"copy",wx:"có bản sao chính thức",l:{danh:-2},lx:"thầy kiện bị từ chối, cả bến biết nhà ngươi muốn lật án",rt:"Thầy kiện mang về bản sao có dấu Diêm vận ty.",rf:"Diêm vận ty bác đơn, còn dán cáo thị."},
  {n:"Nhờ huynh trưởng cải trang vào kho",c:{suc:-3},o:()=>40+S.mat*5,sc:2,f:"page",wx:"lấy được trang sổ thật",l:{danh:-4},lx:"huynh trưởng bị bắt, nhà ngươi mang tiếng trộm sổ quan",rt:"Huynh trưởng về lúc gà gáy, trong áo giấu hai trang sổ; thư gửi vào cung kể lại.",rf:"Huynh trưởng bị giữ ở cửa kho, nhà phải bỏ bạc xin ra."},
  {n:"Viết thư bảo cha thôi",c:{duc:-2},w:{suc:3},wx:"nhà yên, ngươi đỡ lo",lx:"phụ thân thấy con gái bỏ mặc cái oan",rt:"Phụ thân không hồi thư."}]},
 c1:{h:"Nét chữ lạ",w:"maid",t:"Trong sổ, những dòng ghi đêm giấu muối là một nét chữ khác, mực khác. Người ghi là một thư lại của Diêm vận ty.",o:[
  {n:"Tìm thư lại ấy",c:{bac:-30},o:()=>40+S.mat*5,sc:1,f:"clerk",wx:"có người biết ai sai ghi",l:{danh:-2},lx:"thư lại đã bị điều đi, người ta biết ngươi đang tìm",rt:"Thư lại được tìm thấy ở một quán rượu bến sông, say mà vẫn nhớ.",rf:"Thư lại đã bị điều về một huyện xa."},
  {n:"So nét chữ với sổ Hộ bộ",c:{suc:-3},o:()=>40+S.tai/3,w:{tamco:2},sc:1,f:"hand",wx:"biết ai cầm bút",l:{danh:-2},lx:"so nhầm người, bị nói vu cho quan",rt:"Nét chữ ấy khớp với chữ trong sổ lễ của một Thông phán Diêm vận ty.",rf:"Ngươi so nhầm, một viên quan vô can bị gọi tên."},
  {n:"Giữ trang sổ, chưa động",c:{suc:-1},w:{tamco:2},wx:"giữ chứng cứ trong tay",lx:"thức canh trang sổ, kẻ kia có thời gian xóa dấu",rt:"Ngươi khâu trang sổ vào lớp lót áo."}]},
 c2:{h:"{v} hỏi chuyện sổ",w:"v",need:["v"],t:"{v} ghé thăm, lơ đãng hỏi: “Nghe nói nhà tỷ tỷ tìm được sổ thuyền cũ? Chuyện đã qua, sao còn khơi?”",o:[
  {n:"Đáp: chỉ là sổ thuế",c:{},o:()=>40+S.tamco/3,w:{tamco:2},wx:"{v} không biết ngươi đã tìm ra gì",l:{danh:-2},lx:"{v} không tin, rêu rao ngươi giấu chuyện",rt:"{v} gật gù, đổi sang chuyện hoa.",rf:"{v} cười: “Sổ thuế mà tỷ tỷ khâu vào áo?”"},
  {n:"Nhìn thẳng nàng: sổ có nét chữ lạ",c:{},o:()=>35+S.danh/4,sc:1,f:"scare",wx:"{v} lộ vẻ hoảng",l:{danh:-3},lx:"{v} biết ngươi có gì, kịp ra tay trước",go:(A,ok)=>{rdOan(A,"v",ok?8:4)},rt:"Chén trà trong tay {v} rung lên.",rf:"{v} bình thản: “Chữ lạ thì tìm người lạ.”"},
  {n:"Giữ nàng lại dùng trà, dò ý",c:{suc:-2},o:()=>40+S.tamco/4,sc:1,f:"inlaw",wx:"nghe ra nhà nàng có thông gia buôn muối",l:{mat:-1},lx:"{v} dò ngược lại ngươi, lộ một tai mắt",rt:"{v} buột miệng nhắc nhà thông gia ở Giang Khẩu.",rf:"{v} hỏi ngược, ngươi lỡ lời về người chép sổ."}]},
 t1:{h:"Đêm đốt sổ",w:"maid",t:"Diêm vận ty đốt sổ cũ theo lệ. Người nhà ngươi thấy trang sổ nhà ngươi được rút ra trước, cất riêng.",o:[
  {n:"Nhờ người nhà cứu trang sổ ấy",c:{bac:-40},o:()=>45+S.mat*4,sc:2,f:"page",wx:"trang sổ thật về tay ngươi",l:{danh:-3},lx:"người nhà ngươi bị bắt giữa đám cháy",rt:"Trang sổ cháy sém một góc, chữ vẫn còn.",rf:"Người nhà ngươi bị bắt, bị nói là đốt kho."},
  {n:"Nhờ cha báo Tuần diêm Ngự sử niêm phong",c:{suc:-2},o:()=>40+S.danh/4,sc:1,f:"seal",wx:"sổ được giữ chính thức",l:{danh:-2},lx:"Ngự sử chậm, sổ đã cháy mà nhà ngươi mang tiếng làm rộn",rt:"Tuần diêm Ngự sử niêm phong cả kho.",rf:"Tuần diêm Ngự sử đến nơi thì chỉ còn tro."},
  {n:"Để cháy, ghi nhớ kẻ rút sổ",c:{suc:-1},w:{tamco:2},wx:"biết mặt kẻ rút sổ",lx:"đứng nhìn suốt đêm, mất chứng cứ giấy",rt:"Ngươi ghi tên viên Thông phán đã rút sổ."}]},
 x1:{h:"Sổ về tay ai",w:"emp",t:"Hoàng thượng nghe chuyện sổ thuyền, hỏi: “Nhà nàng muốn lật lại án đã khép?”",o:[
  {n:"Tâu: thiếp chỉ xin giữ sổ làm chứng",c:{},o:A=>40+(A.f.page?12:0)+(A.f.copy?6:0)+S.sung/6,e:["win","mid"],rt:"Hoàng thượng cho giữ sổ ở Đại Lý tự, ghi tên ngươi là người nộp.",rf:"Hoàng thượng cho giữ sổ, nhưng ở Diêm vận ty."},
  {n:"Xin lật lại án, truy kẻ ghi sổ",c:{suc:-4},o:A=>30+(A.f.hand?12:0)+(A.f.clerk?8:0)+S.danh/6,e:["win","lose"],rt:"Hoàng thượng phê: “Tra.” Viên Thông phán bị gọi lên kinh.",rf:"Hoàng thượng nói: “Án đã khép, đừng khuấy.” Sổ bị thu lại."},
  {n:"Tâu: thiếp không dám",c:{},w:{duc:3},e:"mid",lx:"sổ ở lại Diêm vận ty",rt:"Ngươi cúi đầu lui ra."}]}},
 E:{win:{k:1,tag:"Sổ thuyền trong tay",w:"emp",t:"Sổ thuyền nằm ở Đại Lý tự, có tên ngươi là người nộp. Kẻ cầm bút đêm ấy bắt đầu mất ngủ.",fx:{danh:4,mat:1}},
  mid:{k:0,tag:"Sổ còn ở Diêm vận ty",t:"Sổ không mất, nhưng vẫn nằm trong tay người có thể sửa nó.",fx:{duc:2}},
  lose:{k:-1,tag:"Sổ bị đốt",t:"Trang sổ cuối cùng cháy trong lò Diêm vận ty. Ngươi chỉ còn những gì nhớ được.",fx:{danh:-3}}}});

rdDef("muoi_lau",6,{t:"Kẻ hãm hại",w:"v",sj:"nhà buôn muối đã hãm hại nhà ngươi",cast(A){return rdCast(A,["v"])},
 g:"Dấu vết dẫn đến một nhà buôn muối khác ở Giang Khẩu, nhà thông gia của {v}. Nhà ấy muốn mối muối của nhà ngươi, và có Diêm vận sứ Giang Khẩu chống lưng.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thuyền đậu cạnh",w:"maid",if:RDW(1),t:"Sổ thuyền trong tay ngươi chỉ thẳng vào nhà thông gia của {v}: đêm ấy thuyền nhà họ đậu sát thuyền nhà ngươi.",o:[
  {n:"Nhờ cha nộp sổ lên Hình bộ",c:{suc:-3},o:()=>40+S.danh/4,sc:1,f:"court",wx:"án được ghi tên nhà kia",l:{danh:-3},lx:"Hình bộ cho là tranh mối làm ăn, ngươi mang tiếng",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hình bộ nhận sổ, gọi chủ nhà kia lên hỏi.",rf:"Hình bộ trả sổ: “Đậu cạnh không phải là tội.”"},
  {n:"Cho người theo dõi thuyền nhà ấy",c:{bac:-30},o:()=>45+S.mat*5,sc:2,f:"watch",wx:"biết thuyền nhà ấy chở gì",l:{mat:-1},lx:"người theo dõi bị phát hiện, mất một tai mắt",rt:"Người nhà ngươi ghi đủ giờ thuyền đi, thuyền về.",rf:"Người theo dõi bị đánh, nhà ấy dời bến."},
  {n:"Gửi lời cho {v}: ta biết rồi",c:{danh:-2},o:()=>40+S.tamco/3,sc:1,f:"warn",wx:"{v} phải chọn đứng về đâu",l:{danh:-2},lx:"lời nhắn bị kể lại thành lời đe dọa",go:A=>{rdOan(A,"v",5)},rt:"{v} không hồi âm, nhưng từ đó tránh mặt ngươi.",rf:"{v} đem lời nhắn đi kể với Hoàng hậu."}]},
 s2:{h:"Kẻ mua rẻ",w:"maid",if:RDW(0),t:"Sổ không giữ được, nhưng {maid} nghe ngóng: nhà mua lại mối muối của nhà ngươi với giá rẻ chính là nhà thông gia của {v}.",o:[
  {n:"Tìm người môi giới hỏi chuyện",c:{bac:-30},o:()=>40+S.mat*5,sc:1,f:"watch",wx:"biết giá rẻ ấy do ai định",l:{danh:-2},lx:"người môi giới đi kể nhà ngươi cay cú",rt:"Người môi giới khai: giá do Diêm vận sứ định trước.",rf:"Người môi giới đóng cửa không tiếp."},
  {n:"Khéo hỏi {v} về nhà thông gia",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,f:"warn",wx:"nghe được điều nàng không định nói",l:{danh:-2},lx:"{v} biết ngươi để ý nhà nàng",go:(A,ok)=>{rdOan(A,"v",ok?3:6)},rt:"{v} khoe nhà thông gia sắp mua thêm thuyền.",rf:"{v} cười: “Tỷ tỷ hỏi nhiều quá.”"},
  {n:"Thôi, nhà mình còn sống là may",c:{danh:-2},w:{duc:3},wx:"lòng yên, không thêm thù",lx:"nhà kia ăn trọn mối muối Giang Khẩu, người ta nói nhà ngươi hèn",rt:"Ngươi gấp thư lại."}]},
 c1:{h:"Lễ từ Giang Khẩu",w:"eun",need:["v"],t:"{eun} kể nhỏ: Diêm vận sứ Giang Khẩu năm nào cũng gửi vào cung một chuyến lễ, đứng tên nhà thông gia của {v}.",o:[
  {n:"Xin {eun} cho xem sổ lễ",c:{bac:-40},o:()=>45+S.mat*4,sc:2,f:"gift",wx:"thấy tận mắt dây lễ",l:{danh:-3},lx:"{eun} nhận bạc rồi kể lại cho Diêm vận sứ",rt:"Sổ lễ ghi rõ: lễ của Diêm vận sứ, đưa qua tay nhà thông gia, đến cung {v}.",rf:"{eun} giả lẫn: “Sổ nào?”"},
  {n:"Báo Hoàng hậu chuyện lễ ngoài vào cung",need:["hh"],c:{suc:-2},o:()=>40+S.hh/3,sc:1,f:"gift",wx:"Trung cung để mắt đến dây lễ",l:{hh:-3},lx:"Hoàng hậu thấy ngươi đem chuyện nhà vào cung",rt:"Hoàng hậu cho tra lễ vào cung {v}.",rf:"Hoàng hậu nói: “Lễ ngoài vào cung, cung nào chẳng có.”"},
  {n:"Ghi lại, chưa động",c:{suc:-1},w:{tamco:2},wx:"cầm một manh mối",lx:"mất công dò mà chưa dùng được, lễ vẫn chảy",rt:"Ngươi ghi lại ngày tháng từng chuyến lễ."}]},
 c2:{h:"{v} đóng cửa",w:"v",need:["v"],t:"{v} đến cung ngươi, đóng cửa lại: “Nhà thông gia làm gì, muội không biết. Nhưng tỷ tỷ kéo họ xuống, nhà muội cũng chết theo.”",o:[
  {n:"Hứa giữ nhà nàng ngoài chuyện, đổi lời khai",c:{},o:()=>40+S.tamco/3+S.duc/8,sc:2,f:"ally",wx:"{v} thành người trong cuộc khai ra",l:{danh:-3},lx:"nàng nuốt lời, kể ngươi mặc cả án quan",go:(A,ok)=>{rdRel(A,"v",ok?14:-6)},rt:"{v} cắn môi, kể ra tên viên Thông phán đã sai ghi sổ.",rf:"{v} nhận lời rồi đi kể khắp nơi ngươi mua chuộc nàng."},
  {n:"Đáp: ai làm thì người ấy chịu",c:{danh:-1},w:{duc:3},wx:"giữ lẽ phải",lx:"{v} thành kẻ thù, cung nàng rêu rao ngươi bất nhân",go:A=>{rdOan(A,"v",10)},rt:"{v} mở cửa đi ra, không ngoảnh lại."},
  {n:"Cho nàng bạc lo cho nhà",c:{bac:-50},sc:1,wx:"{v} nợ ngươi một ân",lx:"bạc nhà ngươi nuôi nhà kẻ đã hại mình",go:A=>{rdRel(A,"v",10)},rt:"{v} nhận bạc, mắt đỏ hoe."}]},
 t1:{h:"Thuyền đêm lần hai",w:"maid",t:"Người nhà ngươi báo: đêm nay nhà thông gia lại có thuyền chở muối không giấy ra khỏi bến.",o:[
  {n:"Báo quan bến chặn bắt",c:{suc:-2},o:A=>40+(A.f.watch?15:0)+S.danh/6,sc:2,f:"catch",wx:"bắt quả tang",l:{danh:-3},lx:"quan bến cũng là người của Diêm vận sứ, ngươi bị nói vu",rt:"Thuyền bị chặn giữa sông, khoang đầy muối không giấy.",rf:"Quan bến đến chậm, thuyền đã đi."},
  {n:"Cho người lên thuyền lấy một bao làm chứng",c:{bac:-30},o:()=>45+S.mat*4,sc:1,f:"bag",wx:"có bao muối làm chứng",l:{mat:-1},lx:"người nhà ngươi bị đánh, mất một tai mắt",rt:"Bao muối không dấu kiểm về đến tay ngươi.",rf:"Người nhà ngươi bị đẩy xuống sông."},
  {n:"Không động, chờ cả đường dây",c:{danh:-1},w:{tamco:2},wx:"thấy được cả đường đi của thuyền",lx:"thuyền đi trót lọt, nhà kia thêm vững",rt:"Ngươi ghi lại đường thuyền đi."}]},
 x1:{h:"Đối chất hai nhà",w:"emp",t:"Hình bộ triệu hai nhà buôn muối đối chất. Phụ thân và huynh trưởng ra công đường; ngươi ở trong cung, chỉ gửi theo được những gì đã gom.",o:[
  {n:"Dặn huynh đưa bao muối không giấy ra",c:{suc:-4},o:A=>30+(A.f.catch?12:0)+(A.f.bag?10:0)+S.mat*3,e:["win","lose"],rt:"Bao muối không dấu kiểm đặt giữa công đường. Chủ nhà kia tái mặt.",rf:"Nhà kia nói bao muối ấy là của nhà ngươi bỏ vào."},
  {n:"Bảo nhà đệ đơn xin Hình bộ tra thêm",c:{bac:-30},o:A=>40+(A.f.ally?12:0)+(A.f.gift?6:0)+S.danh/6,e:["win","mid"],rt:"Hình bộ tra ra sổ lễ, gọi tên Diêm vận sứ lần đầu.",rf:"Hình bộ tra, nhưng chậm như nước đọng."},
  {n:"Bảo nhà rút đơn, giữ hòa khí",c:{},w:{duc:3},e:"mid",lx:"nhà kia ung dung, mối muối vẫn trong tay họ",rt:"Phụ thân rút đơn theo thư của ngươi."}]}},
 E:{win:{k:1,tag:"Nhà hãm hại bị gọi tên",w:"emp",t:"Nhà thông gia của {v} bị phạt vì chở muối không giấy. Cả bến Giang Khẩu biết đêm thuyền nhà ngươi bị giấu muối là do ai.",fx:{danh:5},go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Biết kẻ hại mà chưa động được",t:"Ngươi biết rõ kẻ hại nhà mình. Họ cũng biết ngươi biết. Chưa ai động.",fx:{tamco:2}},
  lose:{k:-1,tag:"Nhà kia thắng một ván",t:"Nhà kia được Hình bộ tuyên không tội, còn được thêm mối muối. Diêm vận sứ gửi lời hỏi thăm phụ thân.",fx:{danh:-4}}}});

/* HISTORY CHECK: salt monopoly (expert pass: PLAUSIBLE; uses diêm dẫn + Tuần diêm Ngự sử) — salt as a state monopoly run by a salt office (Diêm vận ty / Diêm vận sứ), merchants buying licences
   (diêm dẫn) per fixed quota (ngạch), salt makers delivering to state stores, "muối dư" (over-quota salt) and double-issued licences as the
   officials' own smuggling; whether this Ming/Qing-style system (and a consort's merchant family holding licences) fits Đại Hy wording. */
rdDef("muoi_lau",7,{t:"Muối quan, muối lậu",w:"eun",sj:"đường muối lậu trong chính Diêm vận ty",cast(A){return rdCast(A,["v"])},
 g:"Muối là của triều đình: dân làm muối nộp cho Diêm vận ty, nhà buôn mua diêm dẫn theo ngạch mới được chở bán, Tuần diêm Ngự sử đi tuần mà xét. Nhưng chính Diêm vận ty cấp hai tờ diêm dẫn cho một chuyến muối, và muối dư chạy ra chợ không thuế. Muối quan và muối lậu, hóa ra là một.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hai tờ cùng số",w:"maid",if:RDW(1),t:"Nhà kẻ hãm hại đã bị gọi tên, nhưng Diêm vận sứ vẫn ngồi vững. Phụ thân gửi vào một tờ diêm dẫn cũ: cùng một số hiệu, mà có hai bản.",o:[
  {n:"Nhờ cha đưa hai tờ cho Tuần diêm Ngự sử",c:{suc:-3},o:()=>40+S.danh/4,sc:1,f:"dup",wx:"Tuần diêm Ngự sử thấy tận mắt",l:{danh:-3},lx:"Ngự sử cũng có phần muối dư, nói nhà ngươi làm giả",rt:"Tuần diêm Ngự sử cầm hai tờ, tay hơi run.",rf:"Ngự sử giữ cả hai tờ, nói sẽ xét."},
  {n:"Lặng lẽ tìm thêm tờ trùng số",c:{bac:-30},o:()=>45+S.mat*4,sc:2,f:"dup",wx:"có cả chồng diêm dẫn trùng số",l:{mat:-1},lx:"người đi gom bị lộ, mất một tai mắt",rt:"Các nhà buôn nhỏ lén gửi đến mười hai tờ trùng số.",rf:"Người đi gom bị lính Diêm vận ty giữ lại."},
  {n:"Hỏi cha có từng mua tờ trùng số",c:{duc:-2},w:{tamco:2},sc:1,f:"own",wx:"biết nhà mình sạch đến đâu",lx:"phụ thân thú nhận từng mua, nhà ngươi cũng dính một vết",rt:"Phụ thân viết: “Một lần. Không mua thì không có muối mà bán.”"}]},
 s2:{h:"Muối rẻ ngoài chợ",w:"maid",if:RDW(0),t:"Nhà ngươi chưa gượng dậy. Phụ thân viết: “Muối nhà ta bán không được, vì muối không thuế ngoài chợ rẻ hơn. Muối ấy chở bằng thuyền có cờ Diêm vận ty.”",o:[
  {n:"Sai người ra chợ mua một bao",c:{bac:-20},o:()=>50+S.mat*3,sc:1,f:"bag",wx:"có muối làm chứng",l:{mat:-1},lx:"kẻ bán biết bị dò, mất một tai mắt",rt:"Bao muối có dấu kho quan mà không có dấu thuế.",rf:"Người mua bị theo về tận bến."},
  {n:"Xin cha hạ giá cạnh tranh",c:{bac:-40},w:{danh:2},wx:"dân lại mua muối nhà",lx:"nhà lỗ vốn",rt:"Muối nhà ngươi hạ giá, dân xếp hàng ở bến."},
  {n:"Hỏi thăm các nhà buôn khác",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,f:"guild",wx:"các nhà cùng bị chèn đứng về một phía",l:{danh:-2},lx:"các nhà sợ, đồn ngươi rủ họ chống quan",rt:"Bốn nhà buôn muối nhỏ gửi thư: họ cũng bị chèn.",rf:"Không nhà nào dám trả lời."}]},
 c1:{h:"Muối dư",w:"eun",t:"{eun} kể: theo lệ, muối dân nộp vượt ngạch gọi là muối dư, phải vào kho quan. Ở Giang Khẩu, muối dư chưa bao giờ vào kho.",o:[
  {n:"Xin {eun} chép giúp ngạch muối các năm",c:{bac:-40},o:()=>45+S.mat*4,sc:2,f:"quota",wx:"có con số từng năm",l:{danh:-2},lx:"{eun} báo lại cho người khác, ngươi bị nói xen việc Hộ bộ",rt:"Bảng ngạch muối cho thấy năm nào kho cũng hụt đúng một phần ba.",rf:"{eun} chỉ đưa được bảng năm ngoái."},
  {n:"Tự tính từ sổ thuế nhà mình",c:{suc:-3},o:()=>40+S.tai/3,sc:1,f:"quota",wx:"có con số do chính ngươi tính",l:{danh:-2},lx:"tính sai, thành chuyện cười",rt:"Ngươi tính suốt ba đêm, con số khớp với lời {eun}.",rf:"Một dòng tính nhầm, cả bảng đổ."},
  {n:"Không đụng đến kho muối triều đình",c:{tamco:-1},w:{duc:2},wx:"không phạm việc quan",lx:"bỏ qua chứng cứ lớn nhất",rt:"Ngươi gác chuyện muối dư sang bên."}]},
 c2:{h:"Lời nhắn của Diêm vận sứ",w:"v",need:["v"],t:"{v} chuyển đến một lời nhắn từ Diêm vận sứ: nếu ngươi thôi, nhà ngươi được cấp thêm diêm dẫn, gấp đôi năm trước.",o:[
  {n:"Nhận lời, lấy diêm dẫn",c:{duc:-4},w:{bac:80},f:"deal",wx:"nhà có thêm ngạch muối",lx:"từ nay nhà ngươi cũng ăn muối dư",go:A=>{rdRel(A,"v",6)},rt:"Diêm dẫn mới về đến nhà, giấy còn thơm mực."},
  {n:"Từ chối qua {v}",c:{danh:-1},w:{duc:3},wx:"giữ tay sạch",lx:"Diêm vận sứ biết ngươi không mua được, người ta nói ngươi gàn",go:A=>{rdOan(A,"v",6)},rt:"{v} mang lời từ chối đi, mặt lạnh tanh."},
  {n:"Giả vờ nhận, ghi lại lời hứa",c:{suc:-2},o:()=>40+S.tamco/3,sc:2,f:"trap",wx:"có lời mua chuộc làm chứng",l:{danh:-3},lx:"bị lộ là giả, bên kia đề phòng",rt:"Lời hứa của Diêm vận sứ được chép lại, có chữ {v} làm chứng.",rf:"{v} nhìn ra ngươi giả vờ."}]},
 t1:{h:"Sổ hai mặt",w:"maid",t:"Người nhà ngươi tìm ra Diêm vận ty giữ hai bộ sổ: một bộ nộp Hộ bộ, một bộ ghi muối thật.",o:[
  {n:"Mua bộ sổ thật",c:{bac:-60},o:()=>45+S.mat*4,sc:2,f:"book",wx:"có bộ sổ thật",l:{danh:-4},lx:"bị lộ là mua sổ quan",rt:"Bộ sổ được gói trong giấy dầu, đưa vào cung theo xe rau.",rf:"Kẻ bán sổ là người của Diêm vận sứ cài."},
  {n:"Nhờ Hoàng hậu xin Hộ bộ kiểm kho",need:["hh"],c:{suc:-2},o:()=>40+S.hh/3,sc:1,f:"audit",wx:"Hộ bộ phải đếm kho",l:{hh:-3},lx:"Hoàng hậu thấy ngươi kéo Trung cung vào việc triều",rt:"Hộ bộ mở kho Giang Khẩu: kho hụt một phần ba.",rf:"Hoàng hậu bảo: “Việc kho muối, hậu cung không bàn.”"},
  {n:"Chép lại vài trang",c:{suc:-3},o:()=>45+S.mat*3,sc:1,f:"book",wx:"có trang sổ làm chứng",l:{mat:-1},lx:"người chép bị lộ, mất một tai mắt",rt:"Năm trang sổ được chép lại, đủ ngày tháng.",rf:"Người chép bị đuổi khỏi Diêm vận ty."}]},
 x1:{h:"Thuế muối hụt",w:"emp",t:"Ở triều, Hoàng thượng hỏi Hộ bộ: “Thuế muối năm nay sao lại hụt?” Không ai đáp. Tối ấy ngài đến cung ngươi, vẫn còn nhíu mày. Ngươi biết câu trả lời.",o:[
  {n:"Dâng chứng cứ, tâu thẳng",c:{suc:-4},o:A=>30+(A.f.book?12:0)+(A.f.dup?8:0)+(A.f.quota?6:0)+(A.f.audit?6:0),e:["win","lose"],rt:"Sáng hôm sau, Hoàng thượng đem bảng ngạch muối ra triều hỏi Hộ bộ: “Một phần ba đi đâu?”",rf:"Hoàng thượng hỏi Hộ bộ, Hộ bộ tâu ngược: chứng cứ không rõ gốc, nghi có người trong cung xen việc thuế."},
  {n:"Để các nhà buôn đệ đơn lên Tuần diêm Ngự sử",c:{bac:-30},o:A=>40+(A.f.guild?10:0)+(A.f.bag?6:0)+(A.f.trap?6:0),e:["win","mid"],rt:"Tuần diêm Ngự sử dâng đơn của năm nhà buôn muối lên ngự án. Hoàng thượng cho tra Diêm vận ty.",rf:"Đơn lên, Hoàng thượng giao Hộ bộ tự xét."},
  {n:"Im lặng lần này",c:{},w:{duc:2},e:"mid",lx:"thuế muối hụt tiếp, muối dư vẫn chảy",rt:"Ngươi im lặng. Hộ bộ đổ cho mưa bão."}]}},
 E:{win:{k:1,tag:"Diêm vận ty bị tra",w:"emp",t:"Hoàng thượng hạ chỉ cho Tuần diêm Ngự sử tra Diêm vận ty Giang Khẩu. Lần đầu tiên, kho muối dư bị đếm.",fx:{danh:6,sung:2}},
  mid:{k:0,tag:"Muối dư còn chảy",t:"Hộ bộ xét qua loa. Muối dư vẫn chảy ra chợ, nhưng giờ nhiều người biết nó chảy từ đâu.",fx:{duc:1,tamco:1}},
  lose:{k:-1,tag:"Diêm vận sứ ra tay",t:"Diêm vận sứ biết ai đứng sau. Thuyền nhà ngươi bị giữ ở bến lâu gấp đôi, mỗi lần đều có lý do.",fx:{danh:-4,bac:-20}}}});

rdDef("muoi_lau",8,{t:"Cha bị giam",w:"maid",sj:"phụ thân trong ngục Giang Khẩu",cast(A){return rdCast(A,["v"])},
 g:"Diêm vận sứ trả đũa: phụ thân bị bắt giam ở Giang Khẩu vì tội nợ thuế muối. Ngục ẩm, cha già. Bạc và ân tình giữ cha sống qua mùa đông, chỉ chứng cứ mới đưa cha ra.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Nợ thuế muối dư",w:"maid",if:RDW(1),t:"Diêm vận ty bị tra, nhưng kẻ đứng đầu chưa ngã. Một tháng sau, phụ thân bị bắt vì “nợ thuế muối dư”, đúng thứ thuế ngươi vừa vạch ra.",o:[
  {n:"Xin Hoàng thượng chuyển án về kinh",c:{sung:-3},o:()=>40+S.sung/4,sc:2,f:"capital",wx:"cha ra khỏi tay Diêm vận sứ",l:{sung:-2},lx:"ngài bảo đừng xin cho nhà",rt:"Hoàng thượng phê: án này Đại Lý tự xét.",rf:"Hoàng thượng nói: “Nàng xin cho nhà nhiều lần rồi.”"},
  {n:"Nộp đủ khoản thuế bị vu",c:{bac:-60},w:{duc:2},wx:"cha bớt bị hành",lx:"nhận nợ là nhận tội",rt:"Bạc nộp đủ. Ngục tốt đổi chiếu rơm mới cho phụ thân."},
  {n:"Tìm người trong ngục Giang Khẩu",c:{bac:-30},o:()=>45+S.mat*4,sc:1,f:"guard",wx:"có người canh cho cha",l:{danh:-2},lx:"tin lộ ra, bị nói đút lót ngục",rt:"Một ngục tốt già nhận trông cho phụ thân.",rf:"Ngục tốt nhận bạc rồi báo lên trên."}]},
 s2:{h:"Cha ho ra máu",w:"maid",if:RDW(0),t:"Diêm vận sứ không bị đụng tới, mà phụ thân đã bị bắt. Thư huynh trưởng: “Cha ho ra máu. Muội làm gì đi.”",o:[
  {n:"Gửi Thái y riêng xuống Giang Khẩu",c:{bac:-40},w:{duc:2},sc:1,f:"doc",wx:"cha bớt bệnh",lx:"Thái y viện ghi tên ngươi vào sổ",rt:"Thái y vào ngục bắt mạch, kê thuốc ấm phổi."},
  {n:"Viết thư cầu Thái hậu",need:["th"],c:{suc:-2},o:()=>40+S.th/3,sc:1,f:"capital",wx:"Thái hậu nói một lời",l:{th:-3},lx:"Thái hậu thấy ngươi lấy chuyện nhà phiền bà",rt:"Thái hậu sai người hỏi Hình bộ về án.",rf:"Thái hậu trả thư không mở."},
  {n:"Bảo huynh lo, ngươi giữ mình",c:{duc:-2},w:{suc:2},wx:"ngươi không bị kéo vào",lx:"huynh trách, cha buồn",rt:"Huynh trưởng hồi thư ngắn, không xưng muội nữa."}]},
 c1:{h:"Ngục tốt đòi bạc",w:"maid",t:()=>`Ngục tốt Giang Khẩu gửi lời: mỗi tháng một khoản, phụ thân có chăn, có cháo. Theo lệ, phi tần từ bậc ${RANKS[BAL.road.muoi_lau.rkSend].n} trở lên được xin Nội vụ phủ gửi đồ vào ngục.`,o:[
  {n:"Trả đều tay",c:{bac:-40},w:{duc:2},f:"pay",wx:"cha được ăn ấm",lx:"khoản bạc không biết bao giờ dứt",rt:"Phụ thân viết: “Cháo nóng, con đừng lo.”"},
  {n:"Gửi đồ qua Nội vụ phủ",if:()=>S.rank>=BAL.road.muoi_lau.rkSend,c:{suc:-2},o:()=>50+S.danh/5,w:{duc:2},sc:1,f:"guard",wx:"đồ đi đường chính, ngục tốt không dám ăn",l:{danh:-2},lx:"Diêm vận sứ biết ngươi đang dõi, bị nói dùng thế cung",rt:"Đồ có dấu Nội vụ phủ, ngục tốt cúi đầu đưa tận tay.",rf:"Nội vụ phủ chậm nửa tháng."},
  {n:"Đe ngục tốt bằng tên ngươi",c:{},o:()=>40+S.danh/4,w:{tamco:1},wx:"ngục tốt sợ",l:{danh:-3},lx:"ngục tốt hành cha nặng hơn, kể ngươi cậy thế",rt:"Ngục tốt sợ tái mặt, từ đó gọi phụ thân là lão gia.",rf:"Ngục tốt cười: “Cung xa lắm.”"}]},
 c2:{h:"{v} muốn đổi phe",w:"v",need:["v"],t:"{v} đến, mắt đỏ: nhà thông gia của nàng bị Diêm vận sứ bỏ rơi sau vụ đối chất, giờ nàng muốn đổi phe.",o:[
  {n:"Nhận {v} làm đồng minh",c:{},o:()=>40+S.tamco/4+S.duc/8,sc:2,f:"ally",wx:"{v} biết đường dây từ bên trong",l:{danh:-3},lx:"nàng là bẫy, ngươi bị nói kết bè",go:(A,ok)=>{rdRel(A,"v",ok?14:-5)},rt:"{v} kể ra người giữ sổ thật của Diêm vận ty.",rf:"{v} quay về kể hết với Diêm vận sứ."},
  {n:"Bắt nàng viết lời khai trước",c:{suc:-2},o:()=>40+S.tamco/3,sc:1,f:"paper",wx:"có lời khai có dấu tay",l:{danh:-2},lx:"{v} tủi nhục, kể ngươi ép người",go:(A,ok)=>{if(!ok)rdOan(A,"v",5)},rt:"{v} viết, điểm chỉ, tay run.",rf:"{v} xé giấy bỏ đi."},
  {n:"Đuổi về",c:{danh:-1},w:{duc:2},wx:"không mắc bẫy",lx:"{v} oán, người ta nói ngươi không biết dùng người",go:A=>{rdOan(A,"v",6)},rt:"{v} cúi đầu lui ra."}]},
 t1:{h:"Cha muốn nhận tội",w:"maid",t:"Phụ thân gửi thư: “Cha già rồi. Nhận tội cho xong, để nhà còn đường sống.”",o:[
  {n:"Viết thư cấm cha nhận",c:{suc:-2},sc:1,f:"stand",wx:"cha còn đứng vững",lx:"cha thêm khổ trong ngục",rt:"Phụ thân hồi thư: “Ừ. Cha gắng.”"},
  {n:"Để cha nhận, lo chuộc",c:{bac:-50},w:{duc:2},f:"buy",wx:"cha ra sớm",lx:"nhà mang tội nợ thuế",rt:"Hình bộ nhận đơn chuộc tội."},
  {n:"Đưa tin: sắp có chiếu xét lại",c:{},o:()=>40+S.tamco/3,sc:1,wx:"cha có hy vọng mà gượng",l:{danh:-2},lx:"tin bị lộ là không có thật",rt:"Phụ thân ăn được thêm nửa bát cháo.",rf:"Ngục tốt đọc thư, đem đi kể."}]},
 x1:{h:"Mùa đông ở Giang Khẩu",w:"emp",t:"Đông đến, ngục Giang Khẩu đóng băng. Hoàng thượng hỏi ngươi có điều gì muốn xin.",o:[
  {n:"Xin chuyển cha về Đại Lý tự",c:{suc:-4},o:A=>30+(A.f.capital?12:0)+(A.f.stand?6:0)+S.sung/5,e:["win","lose"],rt:"Phụ thân được đưa về kinh trên xe có mui.",rf:"Hoàng thượng nói: “Án đang ở Giang Khẩu thì xét ở Giang Khẩu.”"},
  {n:"Xin cho cha tại ngoại chờ xét",c:{bac:-40},o:A=>40+(A.f.ally?10:0)+(A.f.guard?6:0)+(A.f.paper?6:0),e:["win","mid"],rt:"Phụ thân được về nhà, chờ ngày xử.",rf:"Tại ngoại bị bác, nhưng cha được đổi sang buồng khô."},
  {n:"Không xin, tự giữ cha bằng bạc",c:{bac:-30},w:{duc:2},e:"mid",lx:"cha vẫn trong ngục",rt:"Ngươi chỉ tâu: “Thiếp không dám xin gì.”"}]}},
 E:{win:{k:1,tag:"Cha ra khỏi ngục Giang Khẩu",w:"emp",t:"Phụ thân rời ngục Giang Khẩu. Án vẫn còn, nhưng giờ nằm ở chỗ Diêm vận sứ không với tay tới.",fx:{danh:4,duc:2}},
  mid:{k:0,tag:"Cha còn sống trong ngục",t:"Phụ thân qua được mùa đông. Ngươi nuôi cha bằng bạc và thư, từng tháng một.",fx:{duc:2}},
  lose:{k:-1,tag:"Cha ngã bệnh trong ngục",t:"Phụ thân ngã bệnh nặng trong ngục. Thái y nói qua được là nhờ trời.",fx:{danh:-3,bac:-30}}}});

rdDef("muoi_lau",9,{t:"Người lái thuyền",w:"maid",sj:"lão lái thuyền đêm ấy",cast(A){return rdCast(A,["v"])},
 g:"Đêm thuyền bị giấu muối, có một lão lái thuyền thấy hết. Lão trốn từ ngày ấy. Lão là nhân chứng duy nhất Diêm vận sứ chưa mua được, và người của y cũng đang tìm lão.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lá thư không ký tên",w:"maid",if:RDW(1),t:"Phụ thân đã ra khỏi ngục Giang Khẩu. Một lá thư không ký tên gửi đến cung ngươi: “Lão lái thuyền đang ở một ngôi chùa nhỏ ngoài thành.”",o:[
  {n:"Nhắn huynh trưởng ra ngay",c:{suc:-2},o:()=>45+S.mat*4,sc:2,f:"found",wx:"gặp được lão trước người khác",l:{mat:-1},lx:"đến muộn, lão đã đi, người đưa tin bị theo dõi",rt:"Huynh trưởng tìm thấy lão đang quét sân chùa.",rf:"Sư trụ trì nói lão vừa đi sáng nay."},
  {n:"Báo Đại Lý tự đến đón",c:{danh:-1},o:()=>40+S.danh/4,sc:1,f:"official",wx:"lão đi đường quan",l:{danh:-2},lx:"tin lọt đến Diêm vận sứ, ngươi bị nói làm rùm",rt:"Đại Lý tự đưa lão về kinh có lính đi kèm.",rf:"Lính Đại Lý tự đến thì chùa đã trống."},
  {n:"Nghi là bẫy, cho người xem trước",c:{bac:-20},o:()=>50+S.tamco/4,w:{tamco:2},wx:"không mắc bẫy",l:{mat:-1},lx:"chậm một bước, người dò bị lộ",rt:"Đúng là lão, và quanh chùa chưa có ai lạ.",rf:"Quanh chùa đã có người của Diêm vận sứ."}]},
 s2:{h:"Người duy nhất",w:"maid",if:RDW(0),t:"Phụ thân vẫn trong ngục. Huynh trưởng viết: người cứu được cha chỉ có lão lái thuyền đêm ấy, mà không ai biết lão ở đâu.",o:[
  {n:"Treo thưởng tìm lão",c:{bac:-50},sc:1,f:"found",wx:"cả bến Giang Khẩu đi tìm",lx:"người của Diêm vận sứ cũng nghe",rt:"Ba ngày sau, một người chèo đò chỉ đường."},
  {n:"Hỏi những nhà lái thuyền quen",c:{suc:-3},o:()=>40+S.mat*5,sc:1,f:"found",wx:"tìm ra lão bằng tình cũ",l:{danh:-2},lx:"dân bến sợ, đồn nhà ngươi lôi họ vào án",rt:"Một bà lái đò già biết lão trốn ở đâu.",rf:"Không ai dám nói."},
  {n:"Xin cha kể lại đêm ấy",c:{suc:-1},w:{tamco:2},wx:"nhớ ra lão có con gái ở gần",lx:"thư vào ngục mất nửa tháng, chỉ có manh mối",rt:"Phụ thân nhớ: lão có đứa con gái làm việc trong phủ Diêm vận sứ."}]},
 c1:{h:"Lão không chịu nói",w:"maid",t:"Tìm được lão, lão quỳ lạy mà không chịu khai: “Con gái lão làm ở phủ Diêm vận sứ. Lão nói thì nó chết.”",o:[
  {n:"Hứa đưa con gái lão ra",c:{bac:-40},o:()=>40+S.mat*4,sc:2,f:"daughter",wx:"lão hết sợ mà khai",l:{danh:-2},lx:"không đưa ra được, lão hết tin",rt:"Con gái lão được chuộc ra khỏi phủ Diêm vận sứ trong đêm.",rf:"Phủ Diêm vận sứ không chịu bán người."},
  {n:"Cho lão bạc, để lão tự chọn",c:{bac:-30},w:{duc:3},wx:"lão nhớ ơn ngươi",lx:"lão có thể bỏ trốn lần nữa",rt:"Lão cầm bạc, khóc, nói sẽ nghĩ."},
  {n:"Dọa giao lão cho quan",c:{},o:()=>40+S.tamco/3,sc:1,wx:"lão sợ mà khai",l:{duc:-3},lx:"lão hận, khai nửa chừng, lòng ngươi thêm nặng",rt:"Lão khai hết, giọng run.",rf:"Lão khai, nhưng bỏ sót những điều quan trọng nhất."}]},
 c2:{h:"{v} biết chỗ lão",w:"v",need:["v"],t:"{v} gửi lời: người của Diêm vận sứ sắp đến chỗ lão lái thuyền. Nàng có thể giữ chân họ, nếu ngươi tin.",o:[
  {n:"Tin {v}",c:{},o:()=>35+S.duc/5+(rdEnd(8)==="win"?10:0),sc:2,f:"vhelp",wx:"có thêm một ngày để đưa lão đi",l:{mat:-1},lx:"nàng phản, mất người canh lão",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"Người của Diêm vận sứ bị giữ chân ở bến suốt một ngày.",rf:"{v} không giữ ai, người nhà ngươi bị đánh."},
  {n:"Cảm ơn mà tự dời lão đi",c:{bac:-30},sc:1,wx:"lão an toàn, không nợ ai",lx:"{v} thấy ngươi không tin nàng",go:A=>{rdOan(A,"v",3)},rt:"Lão được dời sang một làng chài khác."},
  {n:"Bắt nàng nói nguồn tin",c:{},o:()=>40+S.tamco/3,w:{tamco:2},wx:"biết ai trong phủ Diêm vận sứ hở miệng",l:{danh:-2},lx:"{v} giận, kể ngươi tra hỏi nàng",go:(A,ok)=>{rdOan(A,"v",ok?3:6)},rt:"{v} nói: tin ấy từ người hầu nhà thông gia.",rf:"{v} bỏ về."}]},
 t1:{h:"Đêm chạy",w:"maid",t:"Người của Diêm vận sứ đến. Lão lái thuyền phải được đưa đi ngay trong đêm.",o:[
  {n:"Giấu lão trong thuyền chở rau vào kinh",c:{suc:-3},o:()=>45+S.mat*4,sc:2,f:"safe",wx:"lão vào kinh lặng lẽ",l:{danh:-3},lx:"thuyền bị khám, ngươi bị nói giấu tội nhân",rt:"Thuyền rau cập bến kinh lúc tờ mờ sáng.",rf:"Thuyền bị khám ở cửa sông."},
  {n:"Đưa lão lên thuyền quan có lính",c:{sung:-2},o:()=>40+S.sung/4,sc:1,f:"safe",wx:"có lính hộ tống",l:{sung:-2},lx:"Hoàng thượng thấy ngươi dùng lính vào việc nhà",rt:"Lính hộ tống đưa lão về đến Đại Lý tự.",rf:"Lính được điều đi nơi khác giữa đường."},
  {n:"Giấu lão ngay tại chỗ",c:{},o:()=>35+S.tamco/4,sc:1,wx:"không ai ngờ",l:{danh:-2},lx:"lão bị bắt đi, cả bến biết ngươi giấu người",rt:"Người của Diêm vận sứ lục khắp làng mà không tìm ra.",rf:"Lão bị lôi ra từ hầm cá."}]},
 x1:{h:"Lời khai",w:"emp",t:"Lão lái thuyền được đưa đến Đại Lý tự. Ngươi ở trong cung, chỉ nghe tin qua huynh trưởng: trước công đường, lão run rẩy nhìn quanh.",o:[
  {n:"Để lão khai trước công đường",c:{suc:-4},o:A=>30+(A.f.safe?10:0)+(A.f.daughter?12:0)+(A.f.vhelp?6:0),e:["win","lose"],rt:"Lão kể từng bao muối, từng người khiêng. Cả công đường lặng ngắt.",rf:"Lão nhìn thấy một người của Diêm vận sứ trong đám đông, rồi câm lặng."},
  {n:"Nhờ Ngự sử xin cho lão khai kín",c:{},o:A=>40+(A.f.found?6:0)+(A.f.official?6:0)+S.danh/6,e:["win","mid"],rt:"Lời khai kín được niêm phong, đóng dấu Đại Lý tự.",rf:"Lời khai kín ít người tin."},
  {n:"Giữ lão cho phiên xử sau",c:{bac:-20},e:"mid",wx:"lão còn sống",lx:"lời khai chưa thành, tốn bạc nuôi giữ",rt:"Lão được giấu ở một nơi chỉ ngươi biết."}]}},
 E:{win:{k:1,tag:"Nhân chứng đã khai",w:"emp",t:"Lời khai của lão lái thuyền nằm trong hồ sơ Đại Lý tự. Diêm vận sứ không còn nói được rằng đêm ấy không ai thấy.",fx:{danh:4,mat:1}},
  mid:{k:0,tag:"Nhân chứng còn giữ",t:"Lão còn sống, còn ở trong tay ngươi. Lời khai đến phiên xử mới nói.",fx:{tamco:2}},
  lose:{k:-1,tag:"Nhân chứng mất",t:"Lão lái thuyền biến mất khỏi kinh. Có người nói lão về quê, có người nói lão đã xuống sông.",fx:{danh:-3}}}});

rdDef("muoi_lau",10,{t:"Xử án Giang Khẩu",w:"emp",sj:"phiên xử án muối Giang Khẩu",cast(A){return rdCast(A,["v"])},
 g:"Đại Lý tự xử án Giang Khẩu: phụ thân nợ thuế, hay Diêm vận ty ăn muối dư. Diêm vận sứ có người ở Hộ bộ đứng sau, nhà ngươi có những gì ngươi đã gom được.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời nhắn của Diêm vận sứ",w:"eun",if:RDW(1),t:"Lời khai của lão lái thuyền đã vào hồ sơ. Diêm vận sứ nhờ {eun} chuyển lời: hắn muốn nói chuyện với ngươi trước phiên xử, qua người trung gian.",o:[
  {n:"Cho {eun} nghe hắn nói gì",c:{},o:()=>40+S.tamco/3,sc:1,f:"heard",wx:"biết hắn sợ điều gì",l:{danh:-3},lx:"bị đồn cung ngươi đi đêm với bị cáo",rt:"Diêm vận sứ lỡ lời với {eun}: Thị lang Hộ bộ nhận phần muối dư mỗi năm.",rf:"{eun} về tay trắng, lại để người ta thấy cung ngươi dính đến bị cáo."},
  {n:"Từ chối, báo Đại Lý tự",c:{suc:-1},w:{duc:3},wx:"tay ngươi sạch trước phiên xử",lx:"hắn liều hơn, ngươi phải đề phòng",rt:"Đại Lý tự ghi lại việc Diêm vận sứ xin gặp."},
  {n:"Nhờ huynh trưởng gặp thay, ghi lại",c:{bac:-20},o:()=>45+S.mat*4,sc:2,f:"heard",wx:"có lời hắn trên giấy",l:{mat:-1},lx:"người gặp thay bị mua chuộc, mất một tai mắt",rt:"Người nhà ngươi chép đủ lời Diêm vận sứ.",rf:"Người nhà ngươi về, chép thiếu một nửa."}]},
 s2:{h:"Tay gần trắng",w:"maid",if:RDW(0),t:"Không có lời khai trọn vẹn, nhà ngươi vào phiên xử với tay gần trắng. Phụ thân gửi lời: “Con đừng liều vì cha.”",o:[
  {n:"Gom lại mọi giấy tờ còn có",c:{suc:-3},o:()=>40+S.tai/4,sc:1,f:"papers",wx:"giấy tờ xếp thành một chuỗi",l:{danh:-2},lx:"giấy rời rạc, bị chê gom nhặt",rt:"Những mảnh giấy rời nối lại thành một đường muối.",rf:"Giấy tờ lộn xộn, thiếu những trang quan trọng."},
  {n:"Xin Hoàng hậu nói với Hoàng thượng một lời",need:["hh"],c:{suc:-2},o:()=>40+S.hh/3,sc:1,wx:"Trung cung để mắt đến án",l:{hh:-3},lx:"Hoàng hậu thấy ngươi kéo bà vào án",rt:"Hoàng hậu nhắc với Hoàng thượng về án Giang Khẩu trong bữa ngự thiện.",rf:"Hoàng hậu nói: “Án ngoài triều, bản cung không bàn.”"},
  {n:"Lo bạc chuộc tội cho cha",c:{bac:-60},w:{duc:2},f:"ransom",wx:"cha chắc được tha",lx:"nhận tội nợ thuế",rt:"Bạc chuộc tội được nộp trước phiên xử."}]},
 c1:{h:"Hộ bộ cãi",w:"emp",t:"Huynh trưởng báo vào cung: ở phiên đầu, Thị lang Hộ bộ đứng ra nói sổ thuế muối là sổ quan, không thể sai.",o:[
  {n:"Gửi sổ hai mặt cho thầy kiện đối chiếu",c:{suc:-3},o:()=>35+S.tai/4+(rdEnd(7)==="win"?15:0),sc:2,f:"book",wx:"sổ quan bị lật",l:{danh:-3},lx:"không đủ sổ để đối chiếu, bị nói bôi nhọ Hộ bộ",rt:"Hai bộ sổ đặt cạnh nhau, chênh một phần ba.",rf:"Thị lang nói sổ của ngươi không rõ gốc."},
  {n:"Đêm ấy xin Hoàng thượng cho mở kho muối",c:{sung:-2},o:()=>40+S.sung/4,sc:1,f:"audit",wx:"kho muối tự nói",l:{sung:-2},lx:"Hoàng thượng chê ngươi đòi nhiều",rt:"Kho Giang Khẩu được mở, hụt đúng như sổ thật.",rf:"Hộ bộ xin hoãn mở kho đến sau phiên xử."},
  {n:"Dặn nhà chỉ nhắm Diêm vận sứ",c:{tamco:-1},w:{duc:2},wx:"ít kẻ thù hơn",lx:"kẻ đứng trên thoát",rt:"Thầy kiện không nhắc đến Hộ bộ một lời."}]},
 c2:{h:"Tờ khai của nhà {v}",w:"v",need:["v"],t:"{v} hỏi: nếu nhà mẹ đẻ nàng đệ cho Đại Lý tự một tờ khai về những gì nhà thông gia đã làm, ngươi có giữ nhà thông gia khỏi tội nặng không.",o:[
  {n:"Hứa giữ",c:{},o:()=>40+S.duc/4,sc:2,f:"vwit",wx:"nhà {v} đệ tờ khai",l:{danh:-2},lx:"nhà nàng không đệ, ngươi mang tiếng mặc cả án",go:(A,ok)=>{rdRel(A,"v",ok?14:-4)},rt:"{v} gật đầu: “Nhà muội sẽ đệ.”",rf:"{v} nghĩ lại, nhà nàng không đệ."},
  {n:"Không hứa gì",c:{danh:-1},w:{duc:2},wx:"không nợ ai lời hứa",lx:"nhà nàng không đệ, người ta nói ngươi cứng nhắc",go:A=>{rdOan(A,"v",4)},rt:"{v} lặng lẽ ra về."},
  {n:"Đổi: nhà nàng đệ tờ khai, ngươi trả nợ",c:{bac:-50},sc:2,f:"vwit",wx:"tờ khai chắc chắn đến",lx:"bạc nuôi nhà kẻ từng hại mình",go:A=>{rdRel(A,"v",10)},rt:"{v} nhận, hẹn tờ khai đến trước phiên xử."}]},
 t1:{h:"Gói muối đêm trước",w:"maid",t:"Đêm trước phiên xử, có người ném vào cung ngươi một gói muối kèm mảnh giấy: “Muối mặn, đừng mở miệng.”",o:[
  {n:"Báo thị vệ tăng canh",c:{suc:-2},sc:1,wx:"cung an toàn",lx:"kẻ đe biết ngươi sợ",rt:"Thị vệ đứng kín quanh cung suốt đêm."},
  {n:"Giữ mảnh giấy làm chứng",c:{},o:()=>40+S.mat*4,sc:1,f:"threat",wx:"chứng cứ bị đe dọa",l:{suc:-3},lx:"nét chữ không ra ai, ngươi mất ngủ cả đêm",rt:"Nét chữ khớp với thư lại Diêm vận ty.",rf:"Không ai nhận ra nét chữ."},
  {n:"Gửi gói muối lại cho Diêm vận sứ",c:{},o:()=>35+S.tamco/3,w:{tamco:2},wx:"hắn biết ngươi không sợ",l:{danh:-2},lx:"hắn càng liều, người ta nói ngươi khiêu khích",rt:"Gói muối về đến phủ Diêm vận sứ, kèm một chữ: “Nhạt.”",rf:"Gói muối bị chặn, thành chuyện kể."}]},
 x1:{h:"Ngày Đại Lý tự xử án",w:"emp",t:"Đại Lý tự xử án. Diêm vận sứ quỳ một bên, phụ thân quỳ một bên. Ngươi ở trong cung chờ tin; những gì ngươi gửi đi được đều đã nằm trong tay huynh trưởng và thầy kiện. Bản án còn chờ Hoàng thượng phê.",o:[
  {n:"Để huynh trưởng đưa ra mọi chứng cứ",c:{suc:-4},o:A=>30+(A.f.vwit?12:0)+(A.f.book?8:0)+(A.f.threat?6:0)+(rdEnd(9)==="win"?10:0),e:["win","lose"],rt:"Chứng cứ nối thành một đường, từ thuyền đến kho đến phủ Diêm vận sứ.",rf:"Một chứng cứ đứt giữa chừng, cả đường đổ theo."},
  {n:"Nhờ thầy kiện xin xử riêng tội nợ thuế",c:{},o:A=>40+(A.f.papers?8:0)+(A.f.heard?6:0)+S.danh/6,e:["win","mid"],rt:"Đại Lý tự xử: phụ thân không nợ thuế; Diêm vận sứ phải trả lời phần còn lại.",rf:"Phụ thân được tha nợ, Diêm vận sứ thì không ai đụng."},
  {n:"Bảo nhà nộp bạc chuộc tội cho cha",c:{bac:-60},w:{duc:2},e:"mid",lx:"cha mang tội nợ thuế",rt:"Bạc nộp đủ, phụ thân được về."}]}},
 E:{win:{k:1,tag:"Diêm vận sứ bị cách chức",w:"emp",t:"Đại Lý tự tâu án lên, Hoàng thượng phê y: Diêm vận sứ Giang Khẩu tham muối dư, cách chức, giao Hình bộ. Huynh trưởng viết vào cung: phụ thân đứng dậy, chân run mà lưng thẳng.",fx:{danh:6,sung:2}},
  mid:{k:0,tag:"Cha được tha, án chưa ngã ai",t:"Hoàng thượng phê: phụ thân được tha. Diêm vận sứ bị đổi đi nơi khác, không mất gì.",fx:{duc:2}},
  lose:{k:-1,tag:"Án nghiêng về Diêm vận ty",t:"Đại Lý tự kết, Hoàng thượng phê y: nhà buôn muối có nợ thuế. Phụ thân được tha vì già yếu, nhưng tên nhà bị ghi vào sổ nợ.",fx:{danh:-5}}}});

rdDef("muoi_lau",11,{t:"Trắng án",w:"emp",sj:"án muối của nhà ngươi",cast(A){return rdCast(A,["v"])},
 g:"Án Giang Khẩu đi đến hồi cuối. Còn lại một câu: nhà ngươi có được trắng án, có giữ được diêm dẫn, và nhà kẻ hãm hại có phải trả giá. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Còn làm muối nữa không",w:"maid",if:RDW(1),t:"Diêm vận sứ bị cách chức. Phụ thân về nhà, gầy rộc. Ông nhìn cái bến cũ, hỏi: “Còn làm muối nữa không con?”",o:[
  {n:"Khuyên cha giữ nghề, làm sạch",c:{suc:-2},w:{duc:3},sc:1,f:"keep",wx:"nghề muối của nhà sạch từ đây",lx:"nghề muối còn nhiều kẻ thù, ngươi phải lo thêm",rt:"Phụ thân treo lại lá cờ cũ ở bến."},
  {n:"Khuyên cha trả diêm dẫn, đổi nghề",c:{bac:-30},w:{danh:2},f:"quit",wx:"nhà ra khỏi chốn thị phi",lx:"mất mối muối mấy đời",rt:"Phụ thân mở hiệu vải ở huyện, không nhắc đến muối nữa."},
  {n:"Xin cha mở kho muối giá rẻ cho dân",c:{bac:-40},w:{danh:3},sc:1,wx:"dân bến nhớ ơn",lx:"nhà lỗ vốn",rt:"Muối nhà ngươi bán giá gốc suốt mùa đông."}]},
 s2:{h:"Bán bến",w:"maid",if:RDW(0),t:"Án chưa ngã ai. Phụ thân được về mà nhà mất gần hết. Huynh trưởng muốn bán bến, đưa cả nhà về quê.",o:[
  {n:"Xin huynh giữ bến",c:{bac:-40},sc:1,f:"keep",wx:"nhà còn chỗ đứng ở Giang Khẩu",lx:"giữ bến tốn bạc",rt:"Huynh trưởng giữ bến, sơn lại cột thuyền."},
  {n:"Để huynh bán",c:{danh:-2},w:{bac:30},f:"quit",wx:"nhà có bạc dằn túi",lx:"mất bến của tổ tiên, dân bến nói nhà ngươi thua chạy",rt:"Bến được bán cho một nhà buôn nhỏ."},
  {n:"Xin Hoàng thượng xét lại một lần",c:{sung:-3},o:()=>35+S.sung/4,sc:2,wx:"án được mở lại",l:{sung:-2},lx:"ngài chán nghe chuyện nhà ngươi",rt:"Hoàng thượng hạ chỉ cho Đại Lý tự xét lại hồ sơ.",rf:"Hoàng thượng nói: “Án đã xử.”"}]},
 c1:{h:"Nhà kẻ hãm hại",w:"v",need:["v"],t:"Nhà thông gia của {v} quỳ trước cổng nhà ngươi xin tha. {v} nhìn ngươi, không nói.",o:[
  {n:"Tha cho họ",c:{danh:-1},w:{duc:4},f:"mercy",wx:"{v} mang ơn",lx:"kẻ hại nhà ngươi không bị gì, dân bến chê ngươi mềm",go:A=>{rdRel(A,"v",12)},rt:"{v} cúi đầu thật thấp."},
  {n:"Để luật xử",c:{suc:-1},w:{danh:3},f:"law",wx:"công bằng theo phép nước",lx:"{v} hận ngươi, ngươi mất sức theo án",go:A=>{rdOan(A,"v",10)},rt:"Nhà ấy bị phạt, mất mối muối."},
  {n:"Đòi họ bồi thường",c:{},o:()=>40+S.tamco/4,w:{bac:50},wx:"nhà lấy lại của đã mất",l:{danh:-3},lx:"bị nói là con buôn đòi nợ",go:A=>{rdOan(A,"v",5)},rt:"Nhà ấy bán thuyền trả nợ nhà ngươi.",rf:"Nhà ấy khóc lóc ở cổng, cả bến chê nhà ngươi."}]},
 c2:{h:"Diêm dẫn",w:"eun",t:"Hộ bộ xét lại các tờ diêm dẫn ở Giang Khẩu. Nhà ngươi có thể giữ, mất, hay được thêm.",o:[
  {n:"Bảo nhà xin giữ ngạch cũ",c:{suc:-2},o:()=>45+S.danh/4,sc:1,wx:"nhà giữ được nghề",l:{bac:-30},lx:"Hộ bộ cắt một nửa ngạch",rt:"Hộ bộ giữ nguyên ngạch cho nhà ngươi.",rf:"Hộ bộ cắt một nửa."},
  {n:"Bảo nhà xin thêm ngạch muối dư",c:{bac:-40},o:()=>40+S.mat*4,w:{bac:60},f:"greedy",wx:"nhà lớn hơn trước",l:{danh:-3},lx:"bị nói là thay chỗ Diêm vận sứ",rt:"Nhà ngươi được thêm ngạch.",rf:"Người ta nói: đuổi một Diêm vận sứ, lên một Diêm vận sứ."},
  {n:"Trả lại một phần cho các nhà nhỏ",c:{bac:-30},w:{duc:3,danh:2},sc:1,f:"share",wx:"các nhà buôn nhỏ nhớ ơn",lx:"nhà nhỏ đi",rt:"Bốn nhà buôn nhỏ được chia ngạch."}]},
 t1:{h:"Cuốn sổ cuối",w:"maid",t:"Huynh trưởng gửi vào cung qua {maid} một bọc vải: bộ sổ thật của Diêm vận ty, giấu dưới sàn thuyền cũ của nhà ngươi từ đêm bị bắt.",o:[
  {n:"Dâng lên Hoàng thượng",c:{suc:-3},o:()=>40+S.sung/4,sc:2,f:"ledger",wx:"sổ thật đến ngự án",l:{sung:-2},lx:"ngài thấy ngươi giữ chứng cứ quá lâu",rt:"Hoàng thượng giữ bộ sổ lại trong thư phòng.",rf:"Hoàng thượng hỏi: “Sao giờ mới dâng?”"},
  {n:"Nhờ cha giao cho Tuần diêm Ngự sử",c:{danh:-1},w:{duc:2},sc:1,wx:"đi đúng đường quan",lx:"sổ có thể bị ém đi giữa đường",rt:"Tuần diêm Ngự sử nhận sổ, đóng dấu."},
  {n:"Đốt đi cho yên",c:{duc:-2},w:{suc:3},wx:"khỏi thêm thù",lx:"sự thật cháy theo",rt:"Ngươi nhìn sổ cháy trong lò sưởi."}]},
 x1:{h:"Hồ sơ dày một gang tay",w:"emp",t:"Hoàng thượng triệu ngươi. Trên án là hồ sơ án Giang Khẩu, dày một gang tay.",o:[
  {n:"Xin trắng án và xử nhà kẻ hãm hại",c:{suc:-4},o:A=>35+(rdEnd(10)==="win"?12:0)+(A.f.law?6:0)+S.sung/6,e:["win","lose"],rt:"Hoàng thượng phê: “Trắng án. Kẻ vu phải chịu.”",rf:"Hoàng thượng nói: “Nàng muốn quá nhiều.”"},
  {n:"Xin trắng án, để luật xử nhà kia",c:{},o:A=>40+(A.f.keep?6:0)+(A.f.share?8:0)+S.duc/6,e:["win","mid"],rt:"Hoàng thượng phê trắng án, giao Hình bộ xét nhà kia.",rf:"Hoàng thượng phê trắng án, nhưng diêm dẫn phải nộp lại."},
  {n:"Xin tha hết, khép án",c:{},w:{duc:4},e:"mid",lx:"nhà mất diêm dẫn",rt:"Hoàng thượng gật: “Khép.”"}]}},
 E:{win:{k:1,tag:"Trắng án, nhà kẻ hãm hại đổ",w:"emp",t:"Nhà ngươi trắng án, tên được xóa khỏi sổ nợ. Nhà kẻ hãm hại mất bến, mất mối. Ở Giang Khẩu, người ta lại gọi nhà ngươi là nhà buôn muối sạch nhất bến.",fx:{danh:8,bac:60}},
  mid:{k:0,tag:"Trắng án, mất diêm dẫn",t:"Nhà ngươi trắng án, nhưng diêm dẫn bị thu. Nhà không còn làm muối, chỉ còn cái tên sạch.",fx:{danh:3,duc:3}},
  lose:{k:-1,tag:"Nộp phạt, mang tiếng",t:"Án khép bằng một khoản phạt. Nhà ngươi giữ được người, mất tiếng. Trong cung, người ta vẫn nhắc chuyện thuyền muối đêm.",fx:{danh:-4,bac:-40}}}});
RD97L.push({a:"muoi_lau_11",tag:"Sổ muối dâng ngự án",w:"emp",p:.1,n:"Tự tay dâng sổ Diêm vận ty, xin cải lệ muối",c:{suc:-4},
 path:["Khuyên cha giữ nghề","Xin huynh giữ bến","Tha cho họ","Để luật xử","Trả lại một phần","Dâng lên Hoàng thượng","xin giữ ngạch cũ"],np:2,bad:["Đốt đi cho yên","xin thêm ngạch muối dư","Đòi họ bồi thường"],sc:2,x:[()=>S.tamco>=45,"Tâm cơ từ 45"],
 t:"Ngươi đặt bộ sổ thật của Diêm vận ty lên ngự án, xin không phải cho nhà mình mà cho cả Giang Nam. Hoàng thượng đọc suốt đêm. Sáng ra, ngài hạ chỉ cải lệ muối: muối dư phải vào kho, diêm dẫn phải có số riêng, và nhà ngươi được giao giữ sổ đối chiếu cho triều. Từ đó, thuyền muối đêm không còn ai dám chở.",
 fx:{danh:12,bac:100},rw:"nt_dongchau",ti:"Người dâng sổ muối"});

/* ---------- muoi_doi · Năm đói ở Giang Nam ---------- */
/* .4 = ARC67.muoi_doi (win «Biển vàng Nghĩa thương» / mid «Qua năm đói» / lose «Mang tiếng đầu cơ»). The road follows the years after the
   famine: the land the starving sold, the refugees, the hoarding rumour, the relief, the grain thief, the next harvest, and what Giang Nam
   remembers. Rival {v} (whose mother's house speculated in .4 c2) is cast at .5 and carried. Chapter numbers: BAL.road.muoi_doi.han. */
const MUOID_N=n=>["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười","mười một","mười hai"][n]||String(n);

rdDef("muoi_doi",5,{t:"Ruộng của dân đói",w:"maid",sj:"chuyện ruộng đất phụ thân gom ở Giang Nam",cast(A){return rdCast(A,["v"])},
 g:"Năm đói qua đi, nông dân Giang Nam bán ruộng lấy gạo. Phụ thân đang gom ruộng rẻ như bèo. Lãi thì lớn, nhưng một nhà buôn muối ôm trăm khoảnh ruộng là chuyện triều đình sớm muộn sẽ hỏi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Biển vàng và ruộng rẻ",w:"maid",if:RDW(1),t:"Biển vàng ‘Nghĩa thương’ treo trước cổng nhà. Phụ thân viết thư: “Nay nhà ta có tiếng thơm, mua ruộng ai cũng bảo là cứu dân.” Ông đã mua ba trăm mẫu, mỗi mẫu một đấu gạo.",o:[
  {n:"Bảo cha cho dân chuộc lại ruộng",c:{bac:-40},w:{duc:3,danh:2},sc:1,f:"good",wx:"tiếng Nghĩa thương được giữ",lx:"cha mất một món lãi lớn",rt:"Cha càu nhàu cả trang thư, nhưng cho dân chuộc lại theo giá mua."},
  {n:"Để cha mua, dặn giá cho công bằng",c:{suc:-2},o:()=>40+S.tamco/3,w:{bac:40},f:"fair",wx:"lãi về, tiếng vẫn còn",l:{danh:-3},lx:"giá ‘công bằng’ chẳng ai tin",rt:"Cha trả thêm nửa đấu mỗi mẫu. Dân không khen, cũng không oán.",rf:"Quản sự vẫn ép giá cũ, dân đồn biển vàng là biển che."},
  {n:"Im lặng, nhận phần lãi",c:{duc:-3},w:{bac:70},f:"greed",wx:"bạc vào cung",lx:"biển vàng che cho việc ép giá",rt:"Bạc lãi từ ruộng theo thuyền muối vào cung."}]},
 s2:{h:"Cha muốn gỡ lại",w:"maid",if:RDW(0),t:()=>rdEnd(4)==="lose"?"Năm đói để lại cho ngươi cái tên ‘nương nương gạo’, nhà để lại một khoản phạt. Phụ thân muốn gỡ: gom ruộng dân bán tháo, đợi giá lên.":"Năm đói qua, nhà ngươi không được khen cũng không bị trách. Phụ thân thấy dân bán tháo ruộng thì muốn gom, đợi giá lên.",o:[
  {n:"Khuyên cha thôi, lấy tiếng làm vốn",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"good",wx:"cha nghe, dân giữ được ruộng",l:{bac:-30},lx:"cha giận, cắt bớt bạc gửi vào cung",rt:"Cha hồi thư một chữ “Được”, rồi rút người khỏi các làng.",rf:"Cha mắng con gái dạy cha làm ăn, bạc gửi vào ít đi."},
  {n:"Góp bạc riêng mua cùng cha",c:{bac:-50,duc:-2},o:()=>50+S.tai/5,w:{bac:100},f:"greed",wx:"lãi gấp đôi khi giá lên",lx:"giá không lên, bạc chôn trong ruộng",rt:"Giá ruộng lên sau nửa năm, phần của ngươi gấp đôi.",rf:"Ruộng không ai mua lại, bạc nằm chết trong đất."},
  {n:"Bảo cha mua, nhưng thuê chính chủ cày",c:{bac:-20},w:{duc:2,tamco:2},sc:1,f:"fair",wx:"dân còn chỗ làm, ruộng vẫn về nhà",lx:"lãi mỏng, cha chê con mềm lòng",rt:"Người bán ruộng được ở lại cày thuê, có người còn khóc mà lạy."}]},
 c1:{h:"Tờ đơn của một làng ven sông",w:"maid",t:"Dân một làng ven sông nhờ người quen gửi đơn vào kinh: quản sự nhà ngươi ép họ điểm chỉ bán ruộng, có tờ còn mang dấu tay của người đã chết đói.",o:[
  {n:"Cho người về tra tận làng",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"truth",wx:"biết quản sự nào làm bậy",l:{danh:-2},lx:"tin ngươi cho tra lan ra",rt:"Người của ngươi về báo: chính lão quản sự trông ruộng làm giả dấu tay.",rf:"Người của ngươi bị dân đuổi, chuyện ngươi cho tra đến tai cả huyện."},
  {n:"Trả ruộng cho làng ấy, bịt chuyện",c:{bac:-50},w:{duc:3},f:"good",wx:"làng thôi kêu",lx:"cha mất ruộng, kẻ gian vẫn ở đó",rt:"Làng nhận lại ruộng, tờ đơn được rút."},
  {n:"Để tờ đơn chìm",c:{duc:-3},w:{tamco:2},f:"greed",wx:"không động đến nhà",lx:"tờ đơn có thể đến tay kẻ khác",rt:"Ngươi cất tờ đơn vào đáy tráp."}]},
 c2:{h:"{v} hỏi chuyện ruộng",w:"v",need:["v"],t:"Ở yến thưởng hoa, {v} cười hỏi thật to: “Nghe nói nhà muội mua nửa Giang Nam bằng mấy đấu gạo?”",o:[
  {n:"Đáp thẳng: nhà thiếp mua thì trả giá",c:{},o:()=>40+S.tai/4,w:{danh:3},wx:"{v} cứng họng",l:{danh:-3},lx:"cả tiệc cười ngươi",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Ngươi kể giá từng mẫu. {v} không đáp được, đổi sang chuyện hoa.",rf:"Ngươi nói hớ một con số, cả tiệc bật cười."},
  {n:"Cười cho qua",c:{danh:-2},w:{tamco:2},wx:"không sinh chuyện",lx:"nuốt lời mỉa trước cả tiệc",rt:"Ngươi nâng chén, coi như không nghe."},
  {n:"Mời {v} cùng góp bạc cứu làng",c:{bac:-30},o:()=>35+S.danh/4,w:{duc:2},sc:1,wx:"{v} bị kéo vào việc thiện",lx:"{v} từ chối, chế giễu thêm",go:(A,ok)=>{rdRel(A,"v",ok?8:-4)},rt:"{v} không từ chối được trước bao người, đành góp bạc.",rf:"{v} cười: “Bạc nhà buôn, ta không dám đụng.”"}]},
 t1:{h:"Lão quản sự trông ruộng",w:"maid",t:"Lão quản sự trông ruộng nhà ngươi ở Giang Nam ép dân điểm chỉ; phụ thân thì tin lão như tin tay phải.",o:[
  {n:"Viết thư xin cha đuổi lão",c:{suc:-2},o:A=>40+(A.f.truth?20:0),w:{duc:2},sc:1,wx:"ruộng nhà sạch tay",l:{bac:-20},lx:"cha giận con xen việc nhà",rt:"Cha đọc chứng ngươi gửi, đuổi lão ngay trong ngày.",rf:"Cha nói: “Không có lão thì ai trông ruộng?”"},
  {n:"Giữ lão, bắt lão chuộc lỗi",c:{duc:-2},w:{tamco:2},f:"fair",wx:"lão sợ ngươi",lx:"dân vẫn ghét lão, tiếng nhà vương",rt:"Lão phải tự đến từng nhà trả thêm gạo."}]},
 x1:{h:"Hộ bộ đo lại ruộng",w:"emp",t:"Hoàng thượng sai Hộ bộ đo lại ruộng Giang Nam sau năm đói. Ruộng nhà ngươi đứng đầu sổ.",o:[
  {n:"Xin cha dâng sổ ruộng, cho dân chuộc",c:{bac:-60},o:A=>40+(A.f.good?10:0),e:["win","mid"],rt:"Cha dâng sổ theo lời ngươi. Hoàng thượng phê: nhà buôn biết trả ruộng cho dân, hiếm thấy.",rf:"Hộ bộ nhận sổ, nhưng chẳng ai nhắc đến lòng tốt ấy."},
  {n:"Thưa với ngài: nhà mua đúng giá, đúng phép",c:{suc:-3},o:A=>40+(A.f.fair?15:0)+(A.f.truth?10:0)-(A.f.greed?15:0)+S.danh/6,e:["win","lose"],rt:"Hộ bộ đo xong, giấy tờ sạch. Ngự sử không còn gì để hặc.",rf:"Hộ bộ tìm ra những tờ điểm chỉ giả."},
  {n:"Để cha tự lo với Hộ bộ",c:{},w:{tamco:2},e:"mid",lx:"ngươi không có phần trong việc nhà",rt:"Ngươi không nhắc một lời."}]}},
 E:{win:{k:1,tag:"Ruộng về tay người cày",w:"emp",t:"Hộ bộ ghi: nhà buôn muối trả ruộng cho dân chuộc theo giá mua. Giang Nam truyền tai nhau, biển vàng nhà ngươi sáng thêm một lần.",fx:{danh:6,duc:3},go:()=>e67kho(3)},
  mid:{k:0,tag:"Ruộng của nhà, tiếng nửa nọ nửa kia",t:"Ruộng vẫn là của nhà ngươi. Bạc có, tiếng thì kẻ khen người chê.",fx:{bac:30,danh:-1}},
  lose:{k:-1,tag:"Tiếng cướp ruộng dân đói",t:"Hộ bộ thu lại những mẫu ruộng điểm chỉ giả. Cả kinh thành nói: nhà buôn muối ăn trên xương dân đói.",fx:{danh:-5,duc:-2}}}});

rdDef("muoi_doi",6,{t:"Dân đói về kinh",w:"emp",sj:"đám dân đói ngoài cửa thành",cast(A){return rdCast(A,["v"])},
 g:"Mùa đông, dân Giang Nam mất ruộng kéo lên kinh. Triều đình cần một kẻ để đổ lỗi, và nhà buôn muối giàu nhất Giang Nam là cái tên dễ gọi nhất.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tấm vải cầu cứu",w:"emp",if:RDW(1),t:"Dân các làng được chuộc ruộng nhắc tên nhà ngươi. Nhưng đoàn dân đói từ huyện khác vẫn kéo đến cửa Tây kinh thành, có người giương tấm vải viết tên nhà ngươi để cầu cứu.",o:[
  {n:"Xin phép cho nhà dựng lều cháo ở cửa Tây",c:{bac:-50,suc:-2},w:{danh:4},sc:1,f:"good",wx:"dân nhớ ơn (Kho lúa +2)",lx:"thêm dân kéo đến vì nghe có cháo",go:()=>e67kho(2),rt:"Lều cháo dựng lên, khói bếp suốt ngày đêm."},
  {n:"Bảo dân tìm đến quan phủ",c:{danh:-2},w:{sung:2},wx:"Hoàng thượng thấy ngươi không giành tiếng",lx:"dân thất vọng, đổi lời",rt:"Người của ngươi chỉ đường cho dân đến phủ Kinh triệu."},
  {n:"Nhờ huynh trưởng hỏi quê từng người",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"truth",wx:"biết dân từ huyện nào, vì sao mất ruộng",l:{danh:-2},lx:"bị đồn là lôi kéo dân",rt:"Sổ ghi rõ: phần nhiều mất ruộng vì quan huyện thu thuế giữa năm đói.",rf:"Quan phủ thấy người nhà phi tần đi lại với dân, tâu là lôi kéo."}]},
 s2:{h:"Ruộng họ mất vào tay ai",w:"emp",if:RDW(0),t:"Đoàn dân đói đến cửa Tây kinh thành. Người ta kháo nhau: ruộng của họ mất vào tay nhà buôn muối.",o:[
  {n:"Lặng lẽ gửi gạo ra, không đề tên",c:{bac:-40},w:{duc:4},wx:"dân có cháo",lx:"không ai biết là của nhà ngươi",rt:"Mỗi sáng có mấy xe gạo không đề tên đến cửa Tây."},
  {n:"Xin Hoàng thượng cho nhà góp gạo chẩn",c:{sung:-2},o:()=>35+S.sung/4+S.danh/6,w:{danh:4},sc:1,f:"good",wx:"nhà góp gạo có chiếu",l:{danh:-2},lx:"bị cho là mua tiếng",rt:"Hoàng thượng cho phép, gạo nhà ngươi phát dưới cờ Hộ bộ.",rf:"Có người tâu: nhà ấy bỏ gạo để rửa tiếng."},
  {n:"Đóng cửa cung, tránh tiếng",c:{danh:-3},w:{tamco:2},f:"hide",wx:"không thêm chuyện",lx:"lời đồn không ai cãi",rt:"Ngươi đóng cửa cung chép kinh."}]},
 c1:{h:"Tờ sớ đổ tội",w:"emp",t:"Một viên Cấp sự trung dâng sớ: dân đói vì nhà buôn ôm thóc, xin tịch thu kho muối nhà ngươi. Đêm ấy Hoàng thượng đến cung ngươi, kể chuyện tờ sớ mà mặt không vui.",o:[
  {n:"Quỳ xin ngài xét kỹ",c:{suc:-3},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"ngài cho tra rõ",l:{sung:-3},lx:"ngài cho là ngươi bênh nhà",rt:"Hoàng thượng gật đầu: “Tra xong rồi hãy nói.”",rf:"Hoàng thượng nói: “Nàng là phi tần, không phải người nhà buôn.”"},
  {n:"Xin cha dâng sổ kho thóc lên Hộ bộ",c:{bac:-20},o:A=>45+(A.f.truth?15:0)+S.mat*3,w:{danh:3},sc:1,f:"proof",wx:"sổ sạch tự nói",l:{danh:-4},lx:"sổ có chỗ tẩy xóa",rt:"Sổ ghi rõ từng thạch thóc bán ra năm đói.",rf:"Người ta chỉ vào mấy chỗ tẩy xóa trong sổ."},
  {n:"Không nói, để ngài tự xét",c:{sung:-2},w:{duc:2},wx:"không bị coi là can chính",lx:"tờ sớ đứng một mình trước ngự án, ngài nghi",rt:"Ngươi chỉ rót trà, không nhắc một lời."}]},
 c2:{h:"Kẻ trả bạc cho dân kêu oan",w:"v",need:["v"],t:"Có kẻ trả bạc cho mấy người dân đói quỳ trước Ngọ Môn kêu oan, chỉ đích danh nhà ngươi. Bạc ấy được một cung nữ của {v} mang ra mỗi lần xuất cung.",o:[
  {n:"Cho người khám cung nữ ấy ở cửa cung",c:{suc:-3},o:()=>40+S.mat*5,w:{tamco:2},sc:1,f:"proof",wx:"lộ ra kẻ giật dây",l:{danh:-2},lx:"bị nói là khám xét người cung khác",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"Thị vệ cửa cung khám ra bạc thỏi có dấu cung {v} trong tay áo cung nữ ấy.",rf:"Cung nữ ấy không mang gì, cung {v} kêu bị làm nhục."},
  {n:"Nhờ huynh trưởng trả gấp đôi để dân nói thật",c:{bac:-40},o:()=>50+S.tamco/4,w:{mat:1},sc:1,f:"proof",wx:"có lời khai của dân",lx:"họ nhận bạc rồi đi mất",rt:"Một ông lão kể hết: ai trả bạc, trả bao nhiêu.",rf:"Họ cầm bạc của cả hai bên rồi biến mất."},
  {n:"Gặp {v}, bảo nàng dừng tay",c:{},o:()=>35+S.danh/4,w:{duc:2},wx:"{v} biết ngươi đã biết",l:{sung:-2},lx:"{v} cười, chối sạch",go:(A,ok)=>{rdRel(A,"v",ok?6:-6)},rt:"{v} lặng đi một lúc, rồi rút người về.",rf:"{v} cười: “Muội nói gì, ta không hiểu.”"}]},
 t1:{h:"Hộ bộ cần một cái tên",w:"emp",t:"Thượng thư Hộ bộ cần một nhà buôn chịu phạt cho dân nguôi. Hoàng thượng hỏi khẽ: nhà nàng có chịu nộp một khoản ‘thuế nghĩa’ không?",o:[
  {n:"Nhận nộp, đổi lấy chiếu minh oan",c:{bac:-60},w:{danh:3},f:"paid",wx:"chiếu nói nhà ngươi không tích trữ",lx:"nộp bạc như nhận một nửa tội",rt:"Chiếu ghi: nhà buôn muối tự nguyện góp bạc cứu dân."},
  {n:"Từ chối, xin xét cho ra lẽ",c:{},o:A=>35+(A.f.proof?20:0)+S.sung/5,w:{danh:2},sc:1,wx:"nhà không nhận tội thay",l:{sung:-3},lx:"Hoàng thượng phật ý",rt:"Hoàng thượng gật đầu: “Được, trẫm cho tra.”",rf:"Hoàng thượng nói: “Trẫm hỏi nàng là để nàng giúp trẫm.”"}]},
 x1:{h:"Tội ai",w:"emp",t:"Đông chí, triều đình xét việc dân đói, tên nhà ngươi nằm trong sớ. Đêm trước buổi triều, Hoàng thượng ngồi lâu ở cung ngươi, hỏi một câu: “Nàng nói xem, lỗi tại ai?”",o:[
  {n:"Tâu thẳng: dân mất ruộng vì thuế năm đói",c:{suc:-4},o:A=>35+(A.f.truth?10:0),e:["win","lose"],rt:"Hoàng thượng cho tra sổ thuế, mấy viên quan huyện bị cách chức.",rf:"Sáng hôm sau cả triều nói: phi tần nhà buôn thổi gió bên gối, đổ lỗi cho quan."},
  {n:"Xin cha dâng sổ, xin ngài cho người tra",c:{bac:-30},o:A=>45+(A.f.proof?15:0)+S.mat*3,e:["win","mid"],rt:"Người tra về tâu: kho nhà ngươi không giấu một hạt.",rf:"Tra mãi không xong, việc khép lại lửng lơ."},
  {n:"Cúi đầu nộp phạt cho êm",c:{bac:-60},w:{sung:2},e:"mid",lx:"nhà mang tiếng có lỗi",rt:"Ngươi viết thư bảo cha nộp phạt. Hoàng thượng nhẹ người."}]}},
 E:{win:{k:1,tag:"Lỗi về đúng chỗ",w:"emp",t:"Mấy viên quan huyện thu thuế giữa năm đói bị cách chức. Dân ngoài cửa Tây được phát lương về quê; có người thắp nén hương trước cổng nhà ngươi.",fx:{danh:6,sung:2},go:()=>e67kho(2)},
  mid:{k:0,tag:"Nộp bạc cho yên",t:"Dân về quê, triều yên. Không ai nói nhà ngươi có tội, cũng chẳng ai nói nhà ngươi vô tội.",fx:{duc:2,danh:-1}},
  lose:{k:-1,tag:"Nhà buôn muối gánh tội",t:"Kho muối nhà ngươi ở bến Giang Khẩu bị niêm phong. Trong cung, người ta nói ngươi ăn trên xương dân đói.",fx:{danh:-6,sung:-3}}}});

rdDef("muoi_doi",7,{t:"Tiếng tích trữ",w:"v",sj:"lời đồn nhà ngươi giấu thóc",cast(A){return rdCast(A,["v"])},
 g:"Kinh thành đồn nhà ngươi còn giấu kho thóc ngầm ở bến Giang Khẩu, chờ giá lên. {v} là người kể chuyện ấy hay nhất hậu cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lời đồn mới",w:"maid",if:RDW(1),t:"Sau buổi triều Đông chí, nhà ngươi được minh oan. Kẻ thua không chịu im: lời đồn mới nói nhà ngươi còn giấu ba kho thóc ngầm ở bến Giang Khẩu.",o:[
  {n:"Xin cha mời Hộ bộ mở kho xem",c:{bac:-30},o:()=>45+S.danh/5,w:{danh:3},sc:1,f:"open",wx:"kho trống, lời đồn tự chết",l:{danh:-3},lx:"trong kho có thóc giống cha quên khai",rt:"Hộ bộ nhận lời, hẹn ngày mở kho.",rf:"Hộ bộ thấy thóc giống không có trong sổ."},
  {n:"Truy xem ai tung tin",c:{suc:-3},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"trace",wx:"biết lời đồn từ cung nào",lx:"kẻ tung tin xóa dấu",rt:"Lời đồn đi ra từ một cung nữ hầu trà của {v}.",rf:"Lần đến đâu, dấu đứt đến đó."},
  {n:"Mặc kệ, lời đồn tự tàn",c:{danh:-3},w:{tamco:2},wx:"không mắc bẫy",lx:"lời đồn bén rễ",rt:"Ngươi không nói một lời."}]},
 s2:{h:"Tiếng cũ thêm tiếng mới",w:"maid",if:RDW(0),t:"Tiếng xấu năm đói chưa tan, nay thêm chuyện kho thóc ngầm. Có cung nữ nhìn ngươi rồi bịt miệng cười.",o:[
  {n:"Phạt cung nữ dám cười",c:{danh:-2,duc:-1},w:{tamco:2},wx:"cung ngươi im",lx:"cả hậu cung bảo ngươi chột dạ",rt:"Cung nữ ấy bị phạt quỳ nửa ngày."},
  {n:"Viết thư bảo cha mở kho cho dân xem",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,f:"open",wx:"dân thấy tận mắt",l:{bac:-20},lx:"cha cho là con làm nhục nhà",rt:"Cha mở kho, dân kéo đến xem: chỉ có thóc giống.",rf:"Cha giận, gửi lại thư trách và bớt bạc."},
  {n:"Hỏi {maid} gốc lời đồn",c:{bac:-20},w:{mat:1},sc:1,f:"trace",wx:"biết lời đồn từ đâu ra",lx:"tốn bạc mua tin",rt:"{maid} dò được: lời đồn đi ra từ cung {v}."}]},
 c1:{h:"Tờ sổ giả",w:"v",need:["v"],t:"Cung nữ của ngươi thấy {v} sai người chép một tờ ‘sổ kho’ đóng dấu son giả của hiệu buôn nhà ngươi.",o:[
  {n:"Lấy tờ sổ giả về tay",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"proof",wx:"có tang vật",l:{danh:-2},lx:"người của ngươi bị bắt lúc lấy",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Tờ sổ giả nằm trong tay áo ngươi.",rf:"Người của ngươi bị bắt, {v} kêu bị trộm."},
  {n:"Báo Hoàng hậu có kẻ giả dấu son",need:["hh"],c:{hh:-3},o:()=>40+S.hh/4+S.danh/6,w:{danh:2},sc:1,wx:"Hoàng hậu để mắt đến {v}",l:{hh:-3},lx:"Hoàng hậu cho là chuyện vặt",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Hoàng hậu cho người khám cung {v}.",rf:"Hoàng hậu nói: “Chuyện nhà buôn, bản cung không rảnh.”"},
  {n:"Để {v} dâng sổ giả rồi hãy vạch",c:{suc:-2},w:{tamco:3},sc:1,f:"trap",wx:"{v} tự đưa đầu vào",lx:"lời đồn lan thêm vài tháng",rt:"Ngươi để tờ sổ giả đi tiếp đường của nó."}]},
 c2:{h:"Kho thóc có thật",w:"maid",t:"Thư nhà: ở bến Giang Khẩu đúng là có một kho thóc của cha. Không phải để đầu cơ, ông để dành cho năm sau. Nhưng chẳng ai tin điều đó.",o:[
  {n:"Bảo cha khai kho với quan phủ",c:{bac:-20},w:{duc:3},f:"open",wx:"kho thành kho minh bạch",lx:"cha mất thế mặc cả với Hộ bộ",rt:"Quan phủ ghi kho vào sổ, đóng dấu."},
  {n:"Bảo cha bán bớt cho dân giá cũ",c:{bac:-40},w:{danh:3},sc:1,wx:"dân thấy thóc ra (Kho lúa +2)",lx:"kho vơi, năm sau ít dự trữ",go:()=>e67kho(2),rt:"Thuyền thóc ra bến, giá gạo chợ huyện hạ."},
  {n:"Bảo cha dời kho đi nơi khác",c:{duc:-3},o:()=>50+S.tamco/4,w:{tamco:2},f:"hide",wx:"không ai tìm thấy",l:{danh:-5},lx:"bị bắt gặp khi dời, đúng như lời đồn",rt:"Thóc được dời đi trong ba đêm.",rf:"Thuyền dời thóc bị lính tuần sông chặn."}]},
 t1:{h:"Hoàng thượng hỏi bâng quơ",w:"emp",t:"Đêm ấy Hoàng thượng hỏi bâng quơ: “Nhà nàng còn bao nhiêu thóc?”",o:[
  {n:"Tâu thật cả kho bến Giang Khẩu",c:{},o:A=>45+(A.f.open?20:0)-(A.f.hide?20:0)+S.sung/6,w:{sung:3},sc:1,wx:"ngài tin lời nàng",l:{sung:-4},lx:"ngài nghĩ ngươi chỉ thật khi bị dồn",rt:"Hoàng thượng cười: “Nàng là người đầu tiên nói thật với trẫm chuyện này.”",rf:"Hoàng thượng im lặng, rồi nói: “Trẫm đã biết từ trước.”"},
  {n:"Tâu: thiếp không rõ việc nhà",c:{sung:-2},w:{tamco:1},wx:"không nhận gì",lx:"ngài biết ngươi giấu",rt:"Hoàng thượng không hỏi nữa."}]},
 x1:{h:"Ngày khám kho",w:"v",need:["v"],t:"{v} xin Hoàng thượng sai người khám kho nhà ngươi trước mặt Ngự sử. Ngày khám đã định.",o:[
  {n:"Xin cha mời Ngự sử đến kho trước ngày định",c:{suc:-4,bac:-20},o:A=>40+(A.f.open?10:0),e:["win","lose"],rt:"Ngự sử đến sớm, sổ khớp từng thạch. {v} không còn gì để nói.",rf:"Ngự sử đếm ra số thóc lệch với sổ khai."},
  {n:"Đưa tờ sổ giả cho Hoàng thượng xem",c:{},o:A=>35+(A.f.proof?20:0)+(A.f.trap?15:0)+(A.f.trace?10:0)+S.mat*3,e:["win","mid"],go:(A,ok)=>{rdOan(A,"v",ok?12:5)},rt:"Dấu son giả bị Hoàng thượng nhận ra ngay.",rf:"{v} nói tờ sổ là do kẻ khác làm, việc khép lại lửng lơ."},
  {n:"Xin rút việc khám kho, chịu tiếng",c:{danh:-3},w:{duc:2},e:"mid",lx:"tiếng tích trữ đeo theo",rt:"Ngươi xin Hoàng thượng thôi khám. Ngài thuận."}]}},
 E:{win:{k:1,tag:"Kho mở, lời đồn chết",w:"emp",t:"Kho bến Giang Khẩu mở ra trước Ngự sử: thóc giống, sổ sách rõ ràng. {v} bị Hoàng thượng quở là ngồi lê đôi mách. Từ đó không ai dám nhắc kho ngầm nhà ngươi.",fx:{danh:6,sung:2},go:A=>{rdOan(A,"v",8)}},
  mid:{k:0,tag:"Lời đồn lắng xuống",t:"Không ai thắng, không ai thua. Lời đồn nhạt đi, nhưng thỉnh thoảng vẫn có người nhắc.",fx:{tamco:2}},
  lose:{k:-1,tag:"Tiếng tích trữ thành thật",w:"v",t:"Người khám thấy thóc nhà ngươi nhiều hơn sổ khai. {v} không cần nói thêm câu nào; cả hậu cung đã nói thay nàng.",fx:{danh:-6,sung:-2}}}});

rdDef("muoi_doi",8,{t:"Phát chẩn",w:"emp",sj:"đợt phát chẩn mùa giáp hạt",cast(A){return rdCast(A,["v"])},
 g:()=>`Mùa giáp hạt, Hoàng thượng mở chẩn cho Giang Nam. Gạo phát ra mang tên ai: tên ngài, tên Thái hậu, hay tên nhà ngươi. Phần góp của nhà phải nộp trong ${MUOID_N(BAL.road.muoi_doi.han)} tháng, trước kỳ Hộ bộ khóa sổ.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Hộ bộ đến hỏi",w:"emp",if:RDW(1),t:()=>`Kho nhà ngươi đã minh bạch. Hộ bộ đến hỏi: nhà nàng có góp gạo cho đợt chẩn giáp hạt không? Hạn góp là ${MUOID_N(BAL.road.muoi_doi.han)} tháng, trước kỳ khóa sổ.`,o:[
  {n:"Góp gạo, xin đề tên Hoàng thượng",c:{bac:-50},w:{sung:4},sc:1,f:"emp",wx:"ngài nhớ ơn",lx:"dân không biết gạo của ai",rt:"Bao gạo nào cũng đóng chữ ‘Ân của Thiên tử’."},
  {n:"Góp gạo, đề tên nhà",c:{bac:-50},w:{danh:5},f:"house",wx:"dân nhớ tên nhà ngươi",lx:"triều thần cho là nhà buôn mua tiếng",rt:"Bao gạo đóng tên hiệu buôn nhà ngươi."},
  {n:"Góp bằng công: dẫn cung nhân khâu bao chẩn",c:{suc:-6},o:()=>45+S.tai/4,w:{danh:2,duc:2},sc:1,wx:"mấy nghìn bao gạo chắc tay",l:{suc:-4},lx:"ngươi kiệt sức, việc vẫn rối",rt:"Cung ngươi khâu đủ bao trước kỳ, Hộ bộ khen bao chắc, không rơi một hạt.",rf:"Ngươi ngã bệnh giữa chừng, bao khâu dở phải gửi Nội vụ phủ làm nốt."}]},
 s2:{h:"Dịp rửa tiếng",w:"emp",if:RDW(0),t:()=>`Tiếng xấu của nhà còn đó. Hộ bộ gửi danh sách góp chẩn, tên nhà ngươi đứng đầu. Hạn góp ${MUOID_N(BAL.road.muoi_doi.han)} tháng, trước kỳ khóa sổ.`,o:[
  {n:"Góp gấp đôi để rửa tiếng",c:{bac:-70},w:{danh:6},f:"house",wx:"cả triều thấy nhà góp nhiều nhất",lx:"người ta nói: có tật giật mình",rt:"Phần góp của nhà ngươi gấp đôi nhà đứng thứ hai."},
  {n:"Xin góp bằng thóc giống thay bạc",c:{suc:-2},o:()=>40+S.tai/4+S.danh/6,w:{duc:3},sc:1,f:"seed",wx:"mùa sau dân có giống",l:{danh:-2},lx:"Hộ bộ chê ít",rt:"Hộ bộ nhận thóc giống, ghi là ‘lo cho mùa sau’.",rf:"Hộ bộ trả lại, đòi bạc."},
  {n:"Góp đúng phần, không hơn",c:{bac:-30},w:{tamco:2},wx:"giữ được bạc",lx:"chẳng ai khen",rt:"Nhà ngươi góp đúng phần ghi trong sổ."}]},
 c1:{h:"Đức Thọ cung muốn đề tên",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi: “Gạo chẩn năm nay, ai gia muốn đề chữ ‘Ân của Đức Thọ cung’.”",o:[
  {n:"Thuận theo Thái hậu",c:{danh:-2},w:{th:5},sc:1,f:"th",wx:"Thái hậu nhớ ngươi",lx:"công của nhà thành công người khác",rt:"Thái hậu gật đầu, ban cho ngươi một chuỗi tràng hạt."},
  {n:"Xin đề tên chung cả ba",c:{},o:()=>35+S.th/4+S.tai/6,w:{th:2,danh:2},sc:1,wx:"ai cũng có phần",l:{th:-4},lx:"Thái hậu chê ngươi tham",rt:"Thái hậu cười: “Con bé nhà buôn này biết chia.”",rf:"Thái hậu sầm mặt: “Ngươi mặc cả với ai gia?”"},
  {n:"Kín đáo từ chối",c:{th:-3},w:{danh:3},f:"house",wx:"tên nhà giữ nguyên",lx:"Đức Thọ cung lạnh nhạt",rt:"Thái hậu không nói gì, chỉ cho ngươi lui."}]},
 c2:{h:"Gạo mốc trong kho chẩn",w:"maid",t:"Người nhà báo về: gạo Hộ bộ trộn với gạo nhà ngươi có nửa phần mốc. Nếu phát ra, dân sẽ chửi tên in trên bao.",o:[
  {n:"Bỏ bạc đổi gạo mới",c:{bac:-40},w:{duc:3},sc:1,wx:"bao gạo nào cũng thơm",lx:"bạc đi, kẻ tráo gạo vẫn ẩn",rt:"Gạo mốc được đổ ra sông, gạo mới chất vào kho."},
  {n:"Báo Hoàng thượng có kẻ tráo gạo",c:{suc:-2},o:()=>40+S.sung/4+S.mat*3,w:{sung:2},sc:1,f:"tip",wx:"ngài cho tra kẻ tráo",l:{danh:-2},lx:"bị cho là đổ lỗi cho Hộ bộ",rt:"Hoàng thượng sai Ngự sử tra kho chẩn.",rf:"Hộ bộ tâu ngược: gạo mốc là gạo của nhà buôn."},
  {n:"Tách gạo mốc ra, phát phần tốt",c:{danh:-2},w:{tamco:2},wx:"không tốn thêm bạc",lx:"dân nhận ít hơn lời hứa",rt:"Mỗi người nhận bớt nửa đấu."}]},
 c3:{h:"{v} xin góp chung",w:"v",need:["v"],t:"{v} đến cung ngươi, dịu giọng xin góp một phần bạc, để tên nhà ngoại nàng đứng cạnh tên nhà ngươi trên bao gạo.",o:[
  {n:"Nhận, kéo {v} về một phía",c:{danh:-1},w:{bac:30},wx:"bớt một kẻ thù",lx:"nhà nàng ăn ké tiếng nhà ngươi",go:A=>{rdRel(A,"v",10)},rt:"{v} nắm tay ngươi cảm tạ."},
  {n:"Từ chối khéo",c:{bac:-20},w:{danh:2},wx:"tiếng nhà là của nhà",lx:"tự gánh phần bạc nàng định góp; {v} ghi thêm một mối",go:A=>{rdOan(A,"v",5)},rt:"{v} cười nhạt, ra về."},
  {n:"Nhận bạc, nhưng dò ý nàng",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"tip",wx:"biết nàng muốn gì",lx:"{v} nhận ra bị dò, giận",go:(A,ok)=>{if(!ok)rdOan(A,"v",6)},rt:"{v} buột miệng: nhà ngoại nàng muốn nhận thầu chở gạo chẩn.",rf:"{v} nhìn ngươi lạnh lẽo: “Muội không tin ta.”"}]},
 t1:{h:"Ngày phát chẩn",w:"emp",t:"Ngày phát chẩn, Hoàng thượng lên lầu Ngọ Môn nhìn xuống đoàn dân nhận gạo. Ngài hỏi ngươi có muốn theo hầu.",o:[
  {n:"Theo hầu ngài lên lầu cổng",c:{suc:-5},o:()=>45+S.sung/5,w:{sung:3,danh:2},sc:1,wx:"dân thấy bóng ngươi bên ngài",l:{suc:-3},lx:"gió lầu lạnh, ngươi ngã bệnh",rt:"Dân quỳ rạp, hô vạn tuế, có người gọi tên nhà ngươi.",rf:"Gió lầu lạnh buốt, ngươi về cung thì sốt mấy ngày."},
  {n:"Nhường ngài, ở lại trong cung",c:{danh:-2},w:{sung:2},f:"emp",wx:"ngài trọn tiếng",lx:"dân không nhớ mặt ngươi",rt:"Ngươi ở lại cung, nghe tiếng hô vạn tuế vọng vào."}]},
 x1:{h:"Sổ chẩn khép lại",w:"emp",t:"Hộ bộ khóa sổ. Mỗi bao gạo đi đâu, mang tên ai, đều phải tâu lên. Đêm ấy Hoàng thượng mang sổ đến cung ngươi đọc.",o:[
  {n:"Thưa rõ phần nhà đã góp",c:{suc:-3},o:A=>35+(A.f.house?10:0)+(A.f.tip?10:0),e:["win","lose"],rt:"Sổ khớp từng bao. Hoàng thượng phê: nhà buôn muối có công.",rf:"Có kẻ tâu phần nhà ngươi góp toàn gạo mốc."},
  {n:"Dâng hết công cho Hoàng thượng",c:{},o:A=>45+(A.f.emp?15:0)+(A.f.th?10:0)+S.sung/6,e:["win","mid"],rt:"Hoàng thượng cảm động: “Nàng không giành công với trẫm.”",rf:"Công về ngài, tên nhà ngươi chẳng ai nhắc."},
  {n:"Không tâu gì, gạo đã phát là đủ",c:{},w:{duc:3},e:"mid",lx:"công trôi theo nước",rt:"Ngươi không tâu một lời."}]}},
 E:{win:{k:1,tag:"Gạo chẩn mang ơn nhà ngươi",w:"emp",t:"Mùa giáp hạt qua, Giang Nam không ai chết đói. Hoàng thượng nhắc trước triều: nhà buôn muối góp đủ, góp sạch.",fx:{danh:6,sung:3},go:()=>e67kho(4)},
  mid:{k:0,tag:"Chẩn xong, công chia nhỏ",t:"Gạo đến tay dân. Công thì chia cho nhiều người, phần nhà ngươi nhỏ như hạt gạo.",fx:{duc:3}},
  lose:{k:-1,tag:"Bao gạo mốc mang tên nhà",t:"Dân mở bao gạo thấy mốc. Tên in trên bao là tên nhà ngươi. Bao nhiêu bạc góp vào cũng thành tiếng xấu.",fx:{danh:-6,duc:-2}}}});

/* the grain thief is a county magistrate of {v}'s mother's house (continuity with .4 c2: «Nhà ngoại của {v} gom gạo đầu cơ») */
rdDef("muoi_doi",9,{t:"Kẻ ăn bớt thóc chẩn",w:"maid",sj:"viên quan ăn bớt thóc chẩn",cast(A){return rdCast(A,["v"])},
 g:"Thóc chẩn về đến huyện thì vơi một nửa. Kẻ ăn bớt là một viên Tri huyện ở Giang Nam, và hắn là người nhà ngoại của {v}.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư cảm tạ thiếu một nửa",w:"maid",if:RDW(1),t:"Dân một huyện ven sông viết thư cảm tạ, nhưng kèm một dòng: mỗi người chỉ nhận được nửa đấu, không phải một đấu như chiếu nói.",o:[
  {n:"Nhờ huynh trưởng về huyện đếm lại",c:{bac:-30},o:()=>45+S.mat*5,w:{mat:1},sc:1,f:"count",wx:"biết thóc mất ở đâu",l:{danh:-2},lx:"huynh trưởng bị đuổi khỏi huyện",rt:"Sổ huyện ghi đủ, kho huyện thì vơi một nửa.",rf:"Nha lại huyện đóng cửa không cho xem sổ."},
  {n:"Tâu ngay lên Hoàng thượng",c:{suc:-2},o:()=>35+S.sung/4,w:{sung:2},sc:1,wx:"ngài để tâm",l:{sung:-3},lx:"ngài hỏi: chứng đâu?",rt:"Hoàng thượng cau mày, ghi tên huyện ấy.",rf:"Hoàng thượng nói: “Một lá thư của dân chưa đủ.”"},
  {n:"Bù phần thiếu bằng bạc nhà",c:{bac:-50},w:{duc:3,danh:2},wx:"dân đủ ăn",lx:"kẻ ăn bớt vẫn ăn tiếp",rt:"Thuyền gạo nhà ngươi đến huyện, phát đủ một đấu."}]},
 s2:{h:"Ngự sử hặc",w:"maid",if:RDW(0),t:"Ngự sử hặc: thóc chẩn mang tên nhà ngươi về đến huyện chỉ còn một nửa. Người ta hỏi: nhà buôn muối ăn lại của chính mình?",o:[
  {n:"Xin cha mở sổ nhà ra đối chiếu",c:{suc:-3},o:()=>45+S.mat*4,w:{danh:2},sc:1,f:"count",wx:"sổ nhà đủ, thóc mất dọc đường",l:{danh:-3},lx:"sổ nhà cũng có chỗ thiếu",rt:"Sổ nhà khớp từng thuyền. Thóc mất sau khi vào kho huyện.",rf:"Sổ nhà thiếu một chuyến, Ngự sử bám lấy."},
  {n:"Xin Hoàng thượng sai Ngự sử về huyện tra",c:{bac:-30},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"có người công chính đi tra",lx:"Ngự sử cũng là người nhận lễ",rt:"Ngự sử về huyện, đóng cửa kho mà đếm.",rf:"Ngự sử nhận lễ của huyện, về tâu: không có gì."},
  {n:"Im lặng chịu hặc",c:{danh:-2},w:{duc:2},wx:"không thêm tội cãi",lx:"tiếng xấu chồng tiếng xấu",rt:"Ngươi chép kinh trong cung, không ra ngoài."}]},
 c1:{h:"Tri huyện là người nhà ai",w:"v",need:["v"],t:"Người của ngươi về báo: viên Tri huyện ăn bớt là cháu ruột mẫu thân {v}. Chính nhà ngoại ấy năm đói đã gom gạo đầu cơ.",o:[
  {n:"Báo cho {v} trước, cho nàng đường lui",c:{danh:-2},w:{duc:3},sc:1,f:"mercy",wx:"{v} nợ ngươi một lần",lx:"nàng có thể báo cho hắn tẩu tán; người ta nói ngươi bao che",go:A=>{rdRel(A,"v",10)},rt:"{v} tái mặt, rồi cúi đầu: “Thiếp không biết. Thiếp nhớ ơn muội.”"},
  {n:"Giữ kín, chờ bắt tận tay",c:{suc:-2},w:{tamco:3},sc:1,f:"trap",wx:"hắn không kịp xóa dấu",lx:"{v} biết sau thì hận gấp đôi",rt:"Ngươi không nói với ai."},
  {n:"Dùng tin này ép {v} im miệng",c:{duc:-3},o:()=>45+S.tamco/3,w:{tamco:2},wx:"{v} thôi nói xấu nhà ngươi",lx:"{v} liều chết cãi",go:(A,ok)=>{rdOan(A,"v",ok?6:10)},rt:"{v} câm lặng. Từ đó nàng không nhắc đến nhà buôn muối nữa.",rf:"{v} gằn giọng: “Muội cứ tâu đi, xem ai tin.”"}]},
 c2:{h:"Hộp lễ của Tri huyện",w:"maid",t:"Viên Tri huyện gửi vào cung một hộp lễ: đôi vòng vàng và mấy chữ ‘xin nương nương nương tay’.",o:[
  {n:"Trả lễ, giữ thư làm chứng",c:{suc:-2},w:{mat:1},sc:1,f:"proof",wx:"có thư hắn tự tay viết",lx:"hắn biết ngươi không mua được, ngươi mất ngủ đề phòng",rt:"Hộp lễ trả về, lá thư ở lại trong tráp ngươi."},
  {n:"Nhận lễ, đổi lấy sổ kho thật",c:{duc:-3},o:()=>45+S.tamco/4,w:{bac:40},sc:1,f:"proof",wx:"có sổ thật trong tay",l:{danh:-4},lx:"nhận lễ của kẻ ăn chẩn",rt:"Hắn gửi sổ thật vào để mua yên.",rf:"Hắn nhận ra ngươi gài, đồn khắp huyện rằng phi tần nhà buôn ăn lễ."},
  {n:"Đốt cả hộp",c:{mat:-1},w:{duc:2},wx:"tay sạch",lx:"mất một tang chứng",rt:"Vòng vàng chảy trong lò, thư hóa tro."}]},
 t1:{h:"Hoàng thượng muốn xử kín",w:"emp",t:"Hoàng thượng thở dài: “Tri huyện ấy là người nhà phi tần. Trẫm muốn xử kín cho êm.”",o:[
  {n:"Xin ngài xử công khai",c:{sung:-3},o:A=>35+(A.f.proof?20:0)+(A.f.count?10:0)+S.danh/6,w:{danh:3},sc:1,wx:"dân thấy phép nước",l:{sung:-3},lx:"ngài cho là ngươi mượn việc công trả thù riêng",rt:"Hoàng thượng gật đầu: “Được. Dân phải thấy.”",rf:"Hoàng thượng nói: “Nàng muốn trẫm làm nhục một phi tần vì nhà nàng?”"},
  {n:"Thuận ý ngài xử kín",c:{danh:-2},w:{sung:3},wx:"ngài nhớ ngươi biết điều",lx:"dân không biết kẻ ăn chẩn bị gì, oán lây sang nhà ngươi",rt:"Hoàng thượng vỗ tay ngươi: “Nàng hiểu trẫm.”"}]},
 x1:{h:"Xử kẻ ăn chẩn",w:"emp",t:"Hình bộ đã dâng hồ sơ, chờ Hoàng thượng phê. Đêm ấy ngài hỏi ý ngươi: chém, cách chức, hay tha?",o:[
  {n:"Trao hết chứng cho ngài, xin xử đúng luật",c:{suc:-4},o:A=>35+(A.f.proof?10:0)+(A.f.count?10:0),e:["win","lose"],go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"Hắn bị cách chức, tịch biên, thóc trả về kho huyện.",rf:"Hồ sơ thiếu một chữ ký, hắn thoát tội, còn kiện ngươi vu cáo."},
  {n:"Xin ngài tha mạng, bắt hắn bồi thóc",c:{},o:A=>45+(A.f.mercy?15:0)+S.duc/6,e:["win","mid"],go:(A,ok)=>{if(ok)rdRel(A,"v",8)},rt:"Hắn bồi gấp đôi số thóc ăn bớt. {v} lặng lẽ gửi lời cảm tạ.",rf:"Hắn bồi một nửa rồi khất mãi."},
  {n:"Thưa: việc án là của ngài",c:{},w:{tamco:2},e:"mid",lx:"án kéo dài, dân chờ",rt:"Ngươi không nói thêm."}]}},
 E:{win:{k:1,tag:"Thóc chẩn về đủ tay dân",w:"emp",t:"Thóc ăn bớt được trả về. Huyện ven sông ăn Tết no. Hoàng thượng nói với Hộ bộ: lần sau phát chẩn, cho người nhà nàng ấy theo thuyền.",fx:{danh:6,duc:2},go:()=>e67kho(3)},
  mid:{k:0,tag:"Án khép lại kín",t:"Viên Tri huyện bị điều đi nơi khác. Dân không biết hắn bị gì, chỉ biết năm sau thóc về đủ hơn.",fx:{duc:2}},
  lose:{k:-1,tag:"Kẻ ăn chẩn thoát, nhà ngươi mang tiếng",w:"v",t:"Hắn thoát, còn kiện ngược. Người ta nhớ: nhà buôn muối vu cho quan huyện để che việc nhà.",fx:{danh:-5,sung:-2}}}});

rdDef("muoi_doi",10,{t:"Mùa sau",w:"emp",sj:"mùa gặt năm sau ở Giang Nam",cast(A){return rdCast(A,["v"])},
 g:"Năm sau, trời lại hạn đầu mùa. Cả Giang Nam nhìn vào kho nhà ngươi: lần này mở sớm hay đợi giá? Mùa gặt sẽ nói ai được nhớ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tháng tư không mưa",w:"emp",if:RDW(1),t:"Dân huyện ven sông đặt tên con là ‘Nghĩa’ để nhớ năm phát chẩn. Nhưng tháng tư không mưa, giá gạo lại nhích lên.",o:[
  {n:"Bảo cha lập kho thường bình",c:{bac:-50},w:{danh:3,duc:2},sc:1,f:"plan",wx:"giá gạo có chỗ dựa",lx:"bạc chôn trong kho, cha xót",rt:"Cha mua thóc lúc rẻ, hứa bán ra lúc đắt theo giá cũ."},
  {n:"Xin Hoàng thượng mở kho quan trước",c:{sung:-2},o:()=>40+S.sung/4,w:{sung:2},sc:1,wx:"kho quan mở sớm",l:{sung:-2},lx:"ngài cho là đàn bà bàn chính sự",rt:"Hoàng thượng hạ chỉ mở kho quan từ tháng năm.",rf:"Hoàng thượng nói: “Chưa đến lúc.”"},
  {n:"Chờ xem trời",c:{danh:-2},w:{tamco:2},wx:"không tốn gì",lx:"giá lên từng ngày, dân trách nhà buôn",rt:"Ngươi ngồi nhìn mây."}]},
 s2:{h:"Cha nghe con",w:"maid",if:RDW(0),t:"Năm ngoái chưa sạch tiếng, năm nay trời lại hạn. Phụ thân gửi thư: “Lần này cha nghe con. Con muốn làm gì?”",o:[
  {n:"Xin cha mở kho ngay từ đầu",c:{bac:-40},w:{danh:4},sc:1,f:"plan",wx:"giá không kịp lên",lx:"nếu mưa đến sớm, cha lỗ nặng",rt:"Cha mở kho bán giá cũ từ đầu tháng tư."},
  {n:"Xin cha mua giống chịu hạn phát cho dân",c:{suc:-2},o:()=>40+S.tai/4,w:{duc:3},sc:1,f:"seed",wx:"ruộng khô vẫn có lúa",l:{bac:-20},lx:"giống không hợp đất, bạc mất",rt:"Giống lúa sớm từ phương nam mọc tốt trên ruộng khô.",rf:"Giống không hợp đất, mạ chết cả."},
  {n:"Để cha tự quyết",c:{danh:-3},w:{tamco:2},f:"greed",wx:"không phải gánh",lx:"cha quen tay, lại bán giá cao",rt:"Cha quyết theo lối cũ."}]},
 c1:{h:"Hội buôn gõ cửa",w:"maid",t:"Hội buôn gạo Giang Nam rủ nhà ngươi cùng giữ giá cao suốt mùa hạn. Nhà ngươi lớn nhất, họ muốn cha đứng đầu.",o:[
  {n:"Từ chối, báo quan phủ",c:{bac:-20},o:()=>40+S.danh/4,w:{danh:3},sc:1,f:"plan",wx:"hội buôn tan",lx:"muối nhà bị hội buôn tẩy chay một mùa",rt:"Quan phủ gọi các nhà buôn lên răn, giá gạo đứng lại.",rf:"Quan phủ không xử, hội buôn cấm các bến bán muối nhà ngươi."},
  {n:"Nhận lời, rồi bán ngầm giá thấp",c:{suc:-3,duc:-2},o:()=>45+S.tamco/3,w:{bac:40},sc:1,wx:"giá vỡ, nhà vẫn lãi",l:{danh:-4},lx:"bị lộ là kẻ hai mặt",rt:"Gạo nhà ngươi tràn chợ, hội buôn vỡ mà không biết vì sao.",rf:"Hội buôn bắt được sổ bán ngầm, cả Giang Nam gọi nhà ngươi là kẻ hai mặt."},
  {n:"Để cha theo hội",c:{duc:-3},w:{bac:70},f:"greed",wx:"lãi lớn",lx:"nhà ngươi đứng đầu danh sách đầu cơ năm nay",rt:"Cha đứng đầu hội, bạc chảy về như nước."}]},
 c2:{h:"{v} chờ ngươi sảy chân",w:"v",need:["v"],t:"{v} cho người theo dõi từng chuyến thuyền gạo nhà ngươi, chờ một chuyến bán giá cao để dâng sớ.",o:[
  {n:"Cho {v} xem tận sổ bán",c:{},o:()=>40+S.danh/5,w:{duc:2},sc:1,wx:"{v} hết cớ",l:{tamco:-2},lx:"nàng chép sổ, tìm chỗ bắt bẻ",go:(A,ok)=>{rdRel(A,"v",ok?6:-4)},rt:"{v} đọc sổ rất lâu, rồi trả lại: “Năm nay nhà muội sạch.”",rf:"{v} chép lại sổ, chỉ ra một chuyến bán lệch giá."},
  {n:"Thả một chuyến thuyền giả nhử nàng",c:{bac:-20,suc:-2},o:()=>45+S.tamco/3,w:{tamco:2},sc:1,f:"trap",wx:"{v} dâng sớ sai",l:{danh:-2},lx:"thuyền giả bị nhận ra, ngươi thành kẻ gài bẫy",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"{v} dâng sớ về chuyến thuyền chở cát. Cả triều cười.",rf:"Người của {v} nhận ra thuyền chở cát, đồn ngươi gài bẫy."},
  {n:"Mặc nàng",c:{tamco:-1},w:{duc:1},wx:"không thêm thù",lx:"nàng sẽ tìm được gì đó, ngươi nơm nớp",rt:"Ngươi để nàng nhìn."}]},
 t1:{h:"Mưa đến muộn",w:"emp",t:"Cuối tháng sáu mưa xuống. Lúa kịp trổ, nhưng chỉ được nửa mùa. Giá gạo đứng ở mức cao.",o:[
  {n:"Bảo cha giữ giá cũ suốt mùa",c:{bac:-40},w:{danh:3},sc:1,wx:"dân mua được gạo",lx:"cha lỗ nửa năm",rt:"Thuyền gạo nhà ngươi bán giá cũ đến tận mùa gặt."},
  {n:"Cho dân vay thóc, trả sau mùa",c:{suc:-2},o:()=>45+S.tai/5,w:{duc:3},sc:1,f:"plan",wx:"dân cày tiếp được",l:{bac:-30},lx:"nhiều nhà không trả nổi",rt:"Dân vay thóc ăn, cày tiếp, cuối mùa trả đủ.",rf:"Nửa số nhà vay không trả nổi, cha xóa nợ trong tiếc nuối."}]},
 x1:{h:"Mùa gặt",w:"emp",t:"Lúa vàng trở lại Giang Nam. Hoàng thượng sai Hộ bộ tâu: năm hạn này, nhà buôn nào đứng ra giữ giá? Tối ấy ngài hỏi ngươi trước.",o:[
  {n:"Thưa: nhà thiếp giữ giá từ đầu mùa",c:{suc:-3},o:A=>35+(A.f.plan?15:0)-(A.f.greed?20:0),e:["win","lose"],rt:"Hộ bộ xác nhận từng chuyến. Hoàng thượng gật đầu.",rf:"Hộ bộ lôi ra những chuyến bán giá cao."},
  {n:"Xin ngài khen cả hội buôn Giang Nam",c:{},o:A=>45+S.danh/5+(A.f.seed?10:0),e:["win","mid"],rt:"Ngài khen cả hội, nhưng ai cũng biết nhà nào đứng đầu.",rf:"Công chia đều, chẳng ai nhớ nhà nào."},
  {n:"Để Hộ bộ tâu",c:{},w:{duc:2},e:"mid",lx:"công nhà thành công chung",rt:"Ngươi không nói gì."}]}},
 E:{win:{k:1,tag:"Năm hạn không đói",w:"emp",t:"Năm hạn qua đi mà Giang Nam không ai bỏ làng. Người ta nhắc: năm ấy nhà buôn muối mở kho trước cả kho quan.",fx:{danh:6,sung:2},go:()=>e67kho(4)},
  mid:{k:0,tag:"Qua một mùa nửa vời",t:"Mùa gặt đủ ăn. Không ai đói, không ai nhớ ai đã giữ giá.",fx:{duc:2}},
  lose:{k:-1,tag:"Lại bị gọi là nhà đầu cơ",t:"Hộ bộ ghi tên nhà ngươi vào sổ các nhà bán giá cao năm hạn. Cái tên ‘nương nương gạo’ trở lại.",fx:{danh:-6}}}});

rdDef("muoi_doi",11,{t:"Ơn hay oán",w:"emp",sj:"tiếng nhà ngươi ở Giang Nam",cast(A){return rdCast(A,["v"])},
 g:"Từ năm đói đến mùa gặt mới, đã mấy năm. Giang Nam sẽ nhớ nhà ngươi bằng ơn hay bằng oán. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tấm bia ở bến Giang Khẩu",w:"maid",if:RDW(1),t:"Dân Giang Nam muốn dựng một tấm bia ở bến Giang Khẩu, khắc tên nhà ngươi. Phụ thân viết thư hỏi: nhận hay không?",o:[
  {n:"Xin khắc tên Hoàng thượng lên trên",c:{danh:-2},w:{sung:3},sc:1,wx:"ơn về chỗ cao nhất",lx:"tên nhà nhỏ đi một dòng",rt:"Bia khắc: ‘Ân Thiên tử, sức nhà buôn, lòng dân Giang Nam’."},
  {n:"Nhận bia, cho khắc cả tên dân góp sức",c:{bac:-30},w:{danh:4,duc:2},sc:1,wx:"bia của cả Giang Nam",lx:"tốn bạc dựng bia",rt:"Bia dài ba trượng, khắc tên mấy trăm người chèo thuyền, gánh gạo."},
  {n:"Từ chối bia",c:{danh:-2},w:{duc:3},wx:"khiêm cung",lx:"dân thất vọng, cha tiếc",rt:"Phụ thân thở dài, cho dân dựng miếu thổ địa thay bia."}]},
 s2:{h:"Cha hỏi con",w:"maid",if:RDW(0),t:"Ở Giang Nam vẫn có người gọi nhà ngươi là ‘nhà đầu cơ’. Phụ thân già đi nhiều, viết: “Con muốn nhà ta được nhớ thế nào?”",o:[
  {n:"Xin cha lập kho nghĩa cho các làng",c:{bac:-50},w:{duc:4},sc:1,wx:"làng có kho dự phòng",lx:"bạc nhà vơi một góc",rt:"Mỗi làng ven sông có một kho nghĩa, chìa khóa giao cho lý trưởng."},
  {n:"Xin cha lên chùa làm lễ sám hối",c:{suc:-2},o:()=>40+S.duc/4,w:{danh:3},sc:1,wx:"dân thấy nhà biết lỗi",l:{danh:-2},lx:"bị cho là làm màu",rt:"Cha quỳ ở chùa ba ngày, dân đứng xem, có người khóc.",rf:"Dân nói: lạy Phật xong lại về bán gạo."},
  {n:"Bảo cha cứ làm ăn, tiếng rồi sẽ qua",c:{danh:-3,duc:-2},w:{bac:40},wx:"nhà vẫn giàu",lx:"tiếng xấu không ai rửa",rt:"Cha gật gù, thuyền muối lại xuôi ngược."}]},
 c1:{h:"Lời cuối của {v}",w:"v",need:["v"],t:"{v} chặn ngươi ở hành lang: “Mấy năm đấu với muội, ta mệt rồi. Muội định để cả Giang Nam nhớ nhà ngoại ta là kẻ ăn chẩn sao?”",o:[
  {n:"Bỏ qua chuyện cũ với {v}",c:{danh:-2},w:{duc:3},sc:1,wx:"bớt một kẻ thù cả đời",lx:"những gì nàng làm không ai đền, người ta bảo ngươi nhu nhược",go:A=>{rdRel(A,"v",15)},rt:"{v} cúi đầu, lần đầu gọi ngươi là ‘muội muội’ mà không mỉa."},
  {n:"Đòi {v} công khai nhận lời vu",c:{suc:-2},o:()=>35+S.danh/4+S.tamco/6,w:{danh:4},sc:1,wx:"nhà sạch tiếng",lx:"{v} thề đối đầu đến cùng",go:(A,ok)=>{rdOan(A,"v",ok?6:12)},rt:"{v} đứng trước các phi tần, nhận năm ấy đã nghe nhầm lời đồn.",rf:"{v} quay đi: “Muội đòi quá rồi.”"},
  {n:"Lờ nàng đi",c:{duc:-2},w:{tamco:2},wx:"không mắc nợ lời nào",lx:"mối thù để ngỏ, lòng ngươi hẹp đi",rt:"Ngươi bước qua, không ngoảnh lại."}]},
 c2:{h:"Rương sổ mấy năm",w:"maid",t:"Phụ thân gửi vào cung một rương sổ: từng thạch thóc nhà bán ra, giá bao nhiêu, cho ai, từ năm đói đến nay.",o:[
  {n:"Xin cha dâng nguyên rương sổ lên Hộ bộ",c:{suc:-2},o:()=>40+S.mat*4+S.danh/6,w:{danh:3},sc:1,wx:"sổ nói thay nhà",l:{danh:-3},lx:"lộ vài chuyến bán giá cao năm đầu",rt:"Hộ bộ đọc xong, ghi: nhà này thật thà.",rf:"Hộ bộ khoanh đỏ mấy chuyến bán giá cao năm đói."},
  {n:"Chép riêng phần tốt để dâng",c:{duc:-3},w:{danh:2},wx:"chỉ phần đẹp được thấy",lx:"sổ chép có thể bị đối chiếu",rt:"Bản chép sạch sẽ, đẹp đẽ."},
  {n:"Cất rương sổ",c:{danh:-2},w:{tamco:2},wx:"giữ sổ trong nhà",lx:"không ai biết nhà đã làm những gì",rt:"Rương sổ khóa lại, chìa đeo ở cổ ngươi."}]},
 t1:{h:"Hoàng thượng hỏi ý",w:"emp",t:"Hoàng thượng định xét thưởng phạt các nhà buôn Giang Nam sau mấy năm đói hạn. Ngài hỏi: “Nàng muốn trẫm nhớ nhà nàng thế nào?”",o:[
  {n:"Tâu thật cả việc tốt lẫn việc xấu",c:{},o:()=>40+S.sung/5+S.duc/6,w:{sung:3},sc:1,wx:"ngài quý lời thật",l:{sung:-3},lx:"ngài nhớ việc xấu hơn",rt:"Hoàng thượng nghe hết, rồi nói: “Nhà nào cũng có năm đầu. Nhà nàng có năm sau.”",rf:"Hoàng thượng nhíu mày ở chuyện bán giá cao."},
  {n:"Xin ngài nhớ dân, đừng nhớ nhà thiếp",c:{bac:-20},w:{duc:3},wx:"lời hợp lòng ngài",lx:"nhà không được thưởng gì, còn tự góp lễ tạ",rt:"Hoàng thượng nhìn ngươi lâu, không nói."},
  {n:"Xin ngài ban cho cha một chức nhỏ",c:{sung:-3},o:()=>35+S.sung/4,w:{danh:3},wx:"nhà buôn có chức",l:{sung:-2},lx:"ngài cho là đòi trả công",rt:"Hoàng thượng ban cho cha hàm Thất phẩm.",rf:"Hoàng thượng cười nhạt: “Ra là vì cái này.”"}]},
 x1:{h:"Chiếu thưởng phạt",w:"emp",t:"Chiếu thưởng phạt các nhà buôn Giang Nam sắp ban. Một lời của ngươi là lời cuối.",o:[
  {n:"Xin chiếu ghi công cho nhà",c:{suc:-3},o:A=>35+S.danh/6+(rdEnd(10)==="win"?10:0),e:["win","lose"],rt:"Chiếu ghi rõ: nhà buôn muối có công với Giang Nam trong năm đói, năm hạn.",rf:"Chiếu nhắc lại năm đầu cơ, còn công thì không một chữ."},
  {n:"Xin chiếu chỉ ghi công dân Giang Nam",c:{},o:A=>45+S.duc/5+(rdEnd(9)==="win"?10:0),e:["win","mid"],rt:"Chiếu khen dân Giang Nam; dân thì khen nhà ngươi.",rf:"Chiếu khen dân, nhà ngươi đứng ngoài."},
  {n:"Nhận chiếu thế nào cũng được",c:{},w:{duc:2},e:"mid",lx:"để người khác viết tên nhà",rt:"Ngươi cúi đầu chờ chiếu."}]}},
 E:{win:{k:1,tag:"Giang Nam nhớ ơn nhà ngươi",w:"emp",t:"Từ năm đói đến năm hạn, Giang Nam nhớ một nhà buôn muối mở kho đúng lúc. Ở bến Giang Khẩu, tên nhà ngươi được nhắc cùng với mùa gặt.",fx:{danh:8,duc:3},go:()=>e67kho(4)},
  mid:{k:0,tag:"Giữ được của, nhạt tiếng nhà",t:"Nhà ngươi vẫn giàu, kho vẫn đầy. Giang Nam không oán, nhưng cũng chẳng ai nhắc tên nhà ngươi khi nói chuyện năm đói.",fx:{bac:60,danh:-2}},
  lose:{k:-1,tag:"Mất của, mất cả tiếng",t:"Chiếu nhắc năm đầu cơ, Hộ bộ phạt bạc. Ở Giang Nam người ta vẫn gọi nhà ngươi là nhà đầu cơ; trong cung, ngươi là ‘nương nương gạo’.",fx:{danh:-4,bac:-40}}}});
RD97L.push({a:"muoi_doi_11",tag:"Ngự bút ban hai chữ Thục đức",w:"emp",p:.1,n:"Xin Hoàng thượng cho khắc tên dân góp sức lên bia",c:{suc:-4},
 path:["Nhận bia, cho khắc cả tên dân","Xin cha lập kho nghĩa","Bỏ qua chuyện cũ","Xin cha dâng nguyên rương sổ","Tâu thật cả việc tốt"],np:2,bad:["Chép riêng phần tốt","Bảo cha cứ làm ăn","Xin ngài ban cho cha"],sc:2,x:[()=>S.duc>=45,"Đức từ 45"],
 t:"Hoàng thượng tự tay viết hai chữ ‘Thục đức’ ban cho ngươi, sai khắc lên đầu tấm bia ở bến Giang Khẩu, dưới đó là tên mấy trăm người dân đã chèo thuyền, gánh gạo năm đói. Từ đó cả hậu cung không ai còn gọi ngươi là ‘nương nương gạo’.",
 fx:{danh:12,duc:4},go:()=>e67kho(5),rw:"nt_nhuy",ti:"Người có đức của Giang Nam"});

/* ---------- muoi_no · Món nợ trong cung ---------- */
/* .4 = ARC67.muoi_no (win «Món nợ thành tình chị em» / win2 «Nắm thóp {v}» / mid «Nợ xong, người xa» / lose «Bị tố cho vay nặng lãi»).
   The debtor {v} is the .4 rival, carried through the road. A third consort {v2} enters at .7 (rdCast(A,["v","v2"])) and returns at .10.
   The road follows the copy of the debt note left in the family shop, the interest still owed, the third consort, the debtor's new
   debts, the scandal, her fate, and the end of the thread between them. Chapter numbers: BAL.road.muoi_no.han. */
const MUOIN_N=n=>["không","một","hai","ba","bốn","năm","sáu","bảy","tám","chín","mười","mười một","mười hai"][n]||String(n);

rdDef("muoi_no",5,{t:"Bản sao giấy nợ",w:"maid",sj:"bản sao giấy nợ của {v}",cast(A){return rdCast(A,["v"])},
 g:"Sổ nợ trong cung đã khép, nhưng hiệu buôn ở Giang Nam vẫn giữ một bản sao có điểm chỉ của {v}. Lão kế toán giữ sổ vừa bị phụ thân đuổi, và bản sao biến mất cùng lão. Ai cầm nó, kẻ ấy cầm cả {v} lẫn ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư nhà báo mất sổ",w:"maid",if:RDW(1),need:["v"],t:()=>rdPrev()==="win2"?"{v} vẫn phải nghe ngươi vì món nợ. Rồi thư nhà đến: bản sao giấy nợ trong hiệu buôn đã mất, cùng với lão kế toán bị đuổi.":"{v} nay đứng cùng một phía với ngươi. Rồi thư nhà đến: bản sao giấy nợ trong hiệu buôn đã mất, cùng với lão kế toán bị đuổi.",o:[
  {n:"Báo ngay cho {v}",c:{tamco:-2},w:{duc:2},sc:1,f:"tell",wx:"{v} tin ngươi không giấu",lx:"lộ bài của mình cho người khác",go:A=>{rdRel(A,"v",6)},rt:"{v} nắm tay ngươi: “Muội không giấu ta, ta nhớ.”"},
  {n:"Sai người về Giang Nam tìm lão",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"hunt",wx:"lần ra dấu lão",l:{suc:-2},lx:"tốn bạc cho người đi xa; hỏng thì mất công lo nghĩ",rt:"Người của ngươi lần ra: lão đã lên kinh, trọ ở một quán ngoài cửa thành.",rf:"Lão đi trước một bước, dấu vết mất ở bến đò."},
  {n:"Giấu {v}, tự lo liệu",c:{suc:-2},w:{tamco:2},f:"hide",wx:"nắm việc trong tay",lx:"tự gánh lo một mình",rt:"Ngươi gấp thư, không nói với ai."}]},
 s2:{h:"Bản sao trôi nổi",w:"maid",if:RDW(0),need:["v"],t:()=>rdPrev()==="lose"?"Ngươi đã bị phạt bổng vì tiếng cho vay nặng lãi, và {v} nay là kẻ thù. Thư nhà lại báo: bản sao giấy nợ, chứng cứ duy nhất rằng nàng vay thật, đã mất.":"Món nợ đã xong, ngươi với {v} chẳng ai thân ai. Thư nhà báo: bản sao giấy nợ ở hiệu buôn đã mất cùng lão kế toán bị đuổi.",o:[
  {n:"Tìm bản sao trước kẻ khác",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"hunt",wx:"lần ra dấu lão kế toán",l:{suc:-2},lx:"tốn bạc dò la; hỏng thì mệt công vô ích",rt:"Người của ngươi biết lão đang ở quán trọ ngoài kinh.",rf:"Bạc đổ ra mà không thấy dấu lão."},
  {n:"Đến gặp {v} bàn chuyện",c:{suc:-2},o:()=>35+S.danh/5+S.tamco/6,w:{duc:2},sc:1,f:"tell",wx:"hai bên tạm cùng thuyền",l:{danh:-2},lx:"người ta thấy ngươi đến cung nàng; hỏng thì bị đồn giở trò",go:(A,ok)=>{rdRel(A,"v",ok?8:-5)},rt:"{v} nghe xong, lặng đi: “Lần này ta với muội cùng một thuyền.”",rf:"{v} cười lạnh: “Muội lại định giở trò gì?”"},
  {n:"Mặc, nợ đã xong",c:{mat:-1},w:{tamco:2},wx:"không dây vào",lx:"bỏ mặc tin tức, tai mắt kém đi",rt:"Ngươi đốt lá thư."}]},
 c1:{h:"Lão kế toán ra giá",w:"maid",t:()=>`Lão kế toán bị đuổi đang ở quán trọ ngoài kinh. Lão nói thẳng: muốn bản sao thì đem năm mươi lượng đến trong ${MUOIN_N(BAL.road.muoi_no.han)} tháng, quá hạn lão bán cho người khác.`,o:[
  {n:"Trả bạc chuộc bản sao",c:{bac:-50},w:{tamco:2},sc:1,f:"got",wx:"bản sao về tay ngươi",lx:"năm mươi lượng vào túi kẻ phản chủ",rt:"Lão đếm bạc, đưa bản sao gói trong giấy dầu."},
  {n:"Hứa xin cha nhận lão lại làm",c:{suc:-2},o:()=>40+S.danh/4,w:{duc:2},sc:1,f:"got",wx:"lão giao sổ, cảm ơn",l:{danh:-3},lx:"phải viết thư năn nỉ cha; hỏng thì lão rêu rao chuyện nhà",rt:"Cha miễn cưỡng nhận lão lại. Lão quỳ dâng bản sao.",rf:"Cha không chịu, lão kể chuyện nợ khắp quán trọ."},
  {n:"Nhờ cha báo quan bắt lão trộm sổ",c:{suc:-2},o:()=>45+S.mat*4,w:{danh:2},wx:"lão bị bắt, sổ bị tịch",l:{danh:-3},lx:"lão khai chuyện nợ trong cung ra công đường",rt:"Lão bị bắt, bản sao bị niêm trong hòm nha môn.",rf:"Lão khai to giữa công đường: có phi tần vay nợ nhà buôn."}]},
 c2:{h:"{v} đến tìm",w:"v",need:["v"],t:"{v} mặt cắt không còn hột máu: có kẻ gửi cho nàng một mảnh giấy, chép đúng từng chữ trong giấy nợ.",o:[
  {n:"Hứa sẽ lấy lại bản sao cho nàng",c:{suc:-2},w:{duc:2},sc:1,f:"tell",wx:"{v} bám vào ngươi",lx:"gánh thêm lời hứa, lo nghĩ hao sức",go:A=>{rdRel(A,"v",8)},rt:"{v} gật đầu, nước mắt rơi xuống tay ngươi."},
  {n:"Hỏi nàng còn nợ ai khác",c:{},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"hunt",wx:"biết nàng còn hai món nợ khác",l:{tamco:-2},lx:"{v} cho là ngươi bới móc, ngươi lỡ lời",go:(A,ok)=>{if(!ok)rdOan(A,"v",5)},rt:"{v} thú thật: nàng còn nợ một thái giám cho vay ở Nội vụ phủ.",rf:"{v} đứng phắt dậy: “Muội coi ta là con nợ đến bao giờ?”"},
  {n:"Bảo nàng tự lo",c:{duc:-2},w:{tamco:2},wx:"không gánh việc của nàng",lx:"quay lưng với người cầu cứu",go:A=>{rdOan(A,"v",6)},rt:"{v} cắn môi bỏ về."}]},
 t1:{h:"Mảnh giấy từ đâu",w:"eun",t:"Mảnh giấy chép giấy nợ đi qua tay một tiểu thái giám ở Nội vụ phủ. Tổng quản {eun} biết, nhưng muốn có giá.",o:[
  {n:"Trả giá cho {eun}",c:{bac:-40},w:{mat:1},sc:1,f:"hunt",wx:"biết kẻ đứng sau",lx:"bạc vào tay {eun}, hắn biết ngươi có chuyện cần giấu",rt:"{eun} nói nhỏ một cái tên: một mama coi kho ở Nội vụ phủ."},
  {n:"Nhờ Hoàng thượng hỏi Nội vụ phủ",c:{sung:-3},o:()=>35+S.sung/4,w:{danh:2},sc:1,wx:"Nội vụ phủ phải khai",l:{sung:-2},lx:"chuyện nợ đến tai ngài",rt:"Hoàng thượng chỉ hỏi một câu, Nội vụ phủ khai ngay tên kẻ chép.",rf:"Hoàng thượng hỏi lại: “Giấy nợ gì?”"}]},
 x1:{h:"Bản sao ở đâu",w:"maid",need:["v"],t:"Người của ngươi đã lần ra: bản sao nằm trong tráp của một mama ở Nội vụ phủ, đêm nay sẽ đổi chủ.",o:[
  {n:"Cho người lấy trước đêm nay",c:{suc:-4},o:A=>40+(A.f.hunt?15:0)+S.mat*3,e:["win","lose"],rt:"Tráp được mở trước canh hai. Bản sao về tay ngươi.",rf:"Người của ngươi bị bắt ngay tại kho Nội vụ phủ."},
  {n:"Đưa {v} cùng đi đòi lại",c:{suc:-2},o:A=>40+(A.f.tell?15:0)+(A.f.got?10:0)+S.tamco/6,e:["win","mid"],go:(A,ok)=>{if(ok)rdRel(A,"v",10)},rt:"Mama thấy hai phi tần cùng đến thì run tay trả tráp.",rf:"Mama đã giao bản sao đi trước khi các ngươi đến."},
  {n:"Để nó đổi chủ, chờ xem ai nhận",c:{tamco:-1},w:{mat:1},e:"mid",lx:"bản sao rơi vào tay người khác",rt:"Ngươi cho người đứng xa mà nhìn."}]}},
 E:{win:{k:1,tag:"Bản sao về tay ngươi",w:"v",t:"Bản sao giấy nợ nằm trong tráp ngươi. {v} biết: đời nàng nằm trong tay ngươi, và ngươi chưa dùng nó.",fx:{tamco:3,mat:1},go:A=>{rdRel(A,"v",8)}},
  mid:{k:0,tag:"Bản sao lọt vào tay người khác",t:"Bản sao đổi chủ trong đêm. Ngươi biết nó còn đó, chỉ chưa biết ai cầm.",fx:{mat:1}},
  lose:{k:-1,tag:"Chuyện nợ lộ ra ngoài",t:"Người của ngươi bị bắt ở Nội vụ phủ. Chuyện nhà buôn muối cho phi tần vay nợ lại được nhắc từ cung này sang cung khác.",fx:{danh:-5}}}});

rdDef("muoi_no",6,{t:"Đòi hay tha",w:"v",sj:"phần lãi {v} còn thiếu",cast(A){return rdCast(A,["v"])},
 g:"Hiệu buôn nhà ngươi làm ăn khó, phụ thân cần bạc trước kỳ thuyền muối nhập cảng. {v} còn thiếu một khoản lãi. Đòi, tha, hay giữ nó làm dây cương.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bản sao trong tráp",w:"maid",if:RDW(1),need:["v"],t:()=>`Bản sao giấy nợ nằm trong tráp ngươi. Phụ thân viết: hiệu buôn thiếu bạc, phần lãi {v} còn nợ phải thu trong ${MUOIN_N(BAL.road.muoi_no.han)} tháng, trước kỳ thuyền muối nhập cảng.`,o:[
  {n:"Đưa {v} xem bản sao, đòi lãi",c:{duc:-2},o:()=>45+S.tamco/4,w:{bac:60},f:"press",wx:"thu được lãi",l:{danh:-2},lx:"ép người bằng giấy nợ; hỏng thì {v} kể khắp nơi",go:(A,ok)=>{rdOan(A,"v",ok?5:9)},rt:"{v} cắn răng tháo đôi hoa tai vàng trả lãi.",rf:"{v} khóc lóc với các cung: nhà buôn ép nợ."},
  {n:"Đốt bản sao, xóa lãi",c:{bac:-40},w:{duc:3},sc:1,f:"free",wx:"{v} hết sợ",lx:"ngươi tự bù phần lãi cho cha",go:A=>{rdRel(A,"v",12)},rt:"Bản sao cháy trong lò. {v} đứng nhìn, không nói nên lời."},
  {n:"Giữ bản sao, cho nàng trả dần",c:{suc:-2},w:{tamco:2,bac:20},sc:1,f:"hold",wx:"bạc về từng ít",lx:"tháng nào cũng phải nhắc, hao sức",rt:"{v} cúi đầu nhận lời, mỗi tháng gửi sang một ít."}]},
 s2:{h:"Cha giục",w:"maid",if:RDW(0),need:["v"],t:()=>`Bản sao chưa về tay ngươi. Phụ thân thì giục: hiệu buôn thiếu bạc, phần lãi {v} còn nợ phải thu trong ${MUOIN_N(BAL.road.muoi_no.han)} tháng, trước kỳ thuyền muối nhập cảng.`,o:[
  {n:"Bảo cha xóa lãi, coi như xong",c:{bac:-30},w:{duc:3},sc:1,f:"free",wx:"{v} nhẹ gánh",lx:"ngươi bù phần lãi cho cha",go:A=>{rdRel(A,"v",8)},rt:"Cha càu nhàu nhưng gạch dòng lãi."},
  {n:"Sai người nhắc {v}",c:{},o:()=>40+S.tamco/4,w:{bac:40},f:"press",wx:"thu được một phần",l:{danh:-3},lx:"người ta thấy ngươi đòi nợ trong cung",go:(A,ok)=>{rdOan(A,"v",ok?4:8)},rt:"{v} gửi sang một gói bạc vụn.",rf:"Người của ngươi bị {v} đuổi ra trước mặt cả cung."},
  {n:"Tự bù cho cha bằng bạc riêng",c:{bac:-50},w:{tamco:2},wx:"cha yên, {v} không biết",lx:"bạc ngươi vơi một khoản",rt:"Ngươi gửi bạc về nhà, đề là ‘lãi của bạn’."}]},
 c1:{h:"Mẫu thân {v} bệnh",w:"v",need:["v"],t:"{v} khóc: mẫu thân nàng ngoài cung bệnh nặng, nàng không còn bạc cắt thuốc.",o:[
  {n:"Xin thái y ra ngoài xem bệnh",c:{sung:-2},o:()=>40+S.sung/4,w:{duc:3},sc:1,f:"free",wx:"mẹ nàng được cứu",l:{sung:-2},lx:"phải xin ân Hoàng thượng; hỏng thì bị trách dùng thái y riêng",go:(A,ok)=>{rdRel(A,"v",ok?12:4)},rt:"Thái y ra cung, bệnh mẹ {v} qua khỏi.",rf:"Hoàng thượng không cho, còn trách ngươi xen việc nhà người."},
  {n:"Cho thêm bạc, ghi vào nợ",c:{bac:-30},w:{tamco:2},f:"hold",wx:"{v} nợ thêm ngươi",lx:"bạc ra, nợ chồng thêm khó đòi",go:A=>{rdRel(A,"v",4)},rt:"{v} điểm chỉ thêm một dòng nợ."},
  {n:"Không dính vào",c:{duc:-2},w:{tamco:1},wx:"giữ bạc",lx:"ngoảnh mặt trước mẹ người bệnh",go:A=>{rdOan(A,"v",5)},rt:"Ngươi chỉ gửi một gói trà an thần."}]},
 c2:{h:"Lời khuyên của {maid}",w:"maid",t:"{maid} nói khẽ: “Nợ để lâu thành oán, tha mãi thành khinh. {Xung} phải chọn một đường.”",o:[
  {n:"Hỏi {maid} {v} giờ nghĩ gì",c:{bac:-20},w:{mat:1},sc:1,wx:"biết lòng nàng",lx:"tốn bạc mua tin từ cung nàng",rt:"{maid} dò được: {v} vừa sợ vừa thẹn, đêm nào cũng thắp hương."},
  {n:"Bảo {maid} đừng nói nữa",c:{mat:-1},w:{tamco:2},wx:"giữ uy",lx:"{maid} thôi nói thật với ngươi",rt:"{maid} cúi đầu lui ra."}]},
 t1:{h:"Phụ thân lên kinh",w:"maid",t:"Phụ thân lên kinh giao muối. Ông muốn tự đến nhà mẹ đẻ của {v} ở kinh đòi nợ.",o:[
  {n:"Cản cha, tự lo",c:{suc:-3},w:{duc:2},sc:1,wx:"giữ thể diện cho {v}",lx:"cha giận con bênh người ngoài, ngươi mệt mỏi",rt:"Cha lắc đầu, nhưng không đến nhà {v}."},
  {n:"Để cha đến nhà {v} đòi",c:{},o:()=>40+S.danh/5,w:{bac:50},f:"press",wx:"nợ được thu",l:{danh:-3},lx:"cả kinh thành biết nhà buôn đến đòi nợ nhà phi tần",go:A=>{rdOan(A,"v",8)},rt:"Nhà {v} bán ruộng trả đủ lãi. {v} nghe tin, mặt trắng bệch.",rf:"Cha to tiếng trước cổng, chuyện lọt vào đến hậu cung."}]},
 x1:{h:"Ngày kết sổ",w:"v",need:["v"],t:"Thuyền muối nhập cảng. {v} đến cung ngươi, mang theo một hộp trang sức.",o:[
  {n:"Đẩy hộp lại, xóa hết nợ",c:{bac:-50},o:A=>40+(A.f.free?15:0)-(A.f.press?10:0)+S.duc/6,e:["win","lose"],rt:"{v} ôm hộp, quỳ xuống: “Ơn này thiếp trả bằng cả đời.”",rf:"{v} tưởng ngươi khinh nàng, ném hộp xuống đất."},
  {n:"Nhận một món, xóa phần còn lại",c:{suc:-2},w:{bac:30},o:A=>45+(A.f.hold?10:0)+S.tamco/5,e:["win","mid"],rt:"Ngươi chọn cây trâm rẻ nhất. {v} hiểu, mắt đỏ hoe.",rf:"{v} nhận lại hộp, cảm tạ lấy lệ."},
  {n:"Nhận cả hộp, sòng phẳng",c:{duc:-2},w:{bac:60},e:"mid",lx:"{v} rời đi, lòng không còn gì với ngươi",rt:"Ngươi nhận hộp. Nợ xong."}]}},
 E:{win:{k:1,tag:"Tha nợ, được người",w:"v",t:"{v} không còn nợ nhà ngươi một đồng. Nàng nợ ngươi một thứ khác, và nàng biết.",fx:{duc:3,danh:2},go:A=>{rdRel(A,"v",15)}},
  mid:{k:0,tag:"Sòng phẳng",t:"Nợ thu đủ. Hiệu buôn qua được kỳ khó. {v} chào ngươi lễ phép, như chào người lạ.",fx:{bac:30}},
  lose:{k:-1,tag:"Món nợ thành mối nhục",w:"v",t:"{v} kể khắp nơi rằng nhà buôn muối sỉ nhục nàng. Món nợ xong, mối nhục ở lại.",fx:{danh:-3},go:A=>{rdOan(A,"v",12)}}}});

rdDef("muoi_no",7,{t:"Kẻ thứ ba",w:"v2",sj:"{v2} và món nợ cũ",cast(A){return rdCast(A,["v","v2"])},
 g:"{v2} biết chuyện {v} từng vay nợ nhà ngươi. Nàng không cần bạc; nàng cần một sợi dây để giật cả hai người.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{v2} thân thiết lạ thường",w:"v2",if:RDW(1),need:["v","v2"],t:"Món nợ khép lại êm được ít lâu thì {v2} bỗng thân thiết lạ thường với ngươi, hỏi han cả chuyện hiệu buôn nhà.",o:[
  {n:"Đáp vòng vo, dò lại nàng",c:{suc:-2},o:()=>40+S.tamco/3,w:{mat:1},sc:1,f:"read",wx:"biết {v2} đã nghe chuyện nợ",l:{tamco:-2},lx:"{v2} nhận ra ngươi đề phòng",rt:"{v2} lỡ lời: nàng đã thấy một tờ giấy chép.",rf:"{v2} cười, đổi chuyện, mắt không cười."},
  {n:"Báo cho {v} biết có kẻ dò",c:{tamco:-1},w:{duc:2},sc:1,f:"pair",wx:"{v} đứng cùng ngươi",lx:"lộ bài với {v}, nàng hoảng",go:A=>{rdRel(A,"v",6)},rt:"{v} siết tay ngươi: “Lần này ta không để muội một mình.”"},
  {n:"Kết thân với {v2}",c:{bac:-30},w:{tamco:2},wx:"{v2} tạm coi ngươi là bạn",lx:"tốn quà cáp; {v} thấy ngươi đi lại với kẻ dò mình",go:A=>{rdRel(A,"v2",8);rdRel(A,"v",-4)},rt:"{v2} nhận quà, cười tươi."}]},
 s2:{h:"Lời bóng gió giữa yến",w:"v2",if:RDW(0),need:["v","v2"],t:"{v2} đứng giữa yến, nói bâng quơ: “Có người trong cung này mặc lụa bằng bạc vay của nhà buôn muối.” Mấy chục ánh mắt quay về phía ngươi và {v}.",o:[
  {n:"Cười, hỏi lại nàng nghe ở đâu",c:{},o:()=>40+S.tai/4,w:{danh:2},sc:1,f:"read",wx:"{v2} lúng túng",l:{danh:-2},lx:"cả yến xì xào",go:(A,ok)=>{if(ok)rdOan(A,"v2",5)},rt:"{v2} ấp úng không nói được nguồn.",rf:"{v2} ung dung đáp: “Ai mà chẳng biết.”"},
  {n:"Đỡ lời cho {v}",c:{danh:-2},w:{duc:2},sc:1,f:"pair",wx:"{v} nhớ ơn",lx:"ngươi bị kéo vào chung",go:A=>{rdRel(A,"v",8)},rt:"Ngươi nói: bạn bè giúp nhau lúc khó, có gì lạ."},
  {n:"Im lặng, rời tiệc sớm",c:{sung:-2},w:{tamco:2},wx:"không cho {v2} cớ",lx:"bỏ yến sớm, Hoàng thượng không vui; {v} một mình chịu ánh mắt",go:A=>{rdOan(A,"v",4)},rt:"Ngươi cáo mệt lui về."}]},
 c1:{h:"{v2} ra giá",w:"v2",need:["v2"],t:"{v2} nói thẳng: nàng có một tờ chép giấy nợ. Muốn nàng im, ngươi phải nhường nàng suất hầu yến Trung thu.",o:[
  {n:"Nhường suất hầu yến",c:{sung:-4},w:{tamco:1},f:"pay",wx:"{v2} im một mùa",lx:"mất dịp gần Hoàng thượng, nàng sẽ đòi tiếp",rt:"{v2} cười, nhận suất hầu yến."},
  {n:"Đáp: giấy chép không điểm chỉ, chẳng ai tin",c:{},o:()=>40+S.tamco/3+S.danh/6,w:{danh:2},sc:1,f:"call",wx:"{v2} chùn tay",l:{danh:-3},lx:"{v2} đem giấy chép đi rải",go:(A,ok)=>{rdOan(A,"v2",ok?6:3)},rt:"{v2} cứng họng, gấp tờ giấy lại.",rf:"Sáng hôm sau, mấy cung đều có bản chép."},
  {n:"Đổi tin lấy tin",c:{bac:-20},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"read",wx:"có chuyện của {v2} trong tay",l:{tamco:-1},lx:"tốn bạc mua tin; hỏng thì lộ ý",rt:"Ngươi biết {v2} mua tờ chép từ một thái giám Nội vụ phủ.",rf:"Không moi được gì, {v2} còn biết ngươi dò."}]},
 c2:{h:"Tổng quản Nội vụ phủ",w:"eun",t:"{eun} gõ cửa: kẻ bán tờ chép cho người khác là thái giám dưới tay hắn. Hắn có thể đuổi kẻ ấy, với một cái giá.",o:[
  {n:"Trả giá cho {eun}",c:{bac:-40},w:{mat:1},sc:1,f:"cut",wx:"đường rò bị cắt",lx:"bạc vào tay {eun}, hắn giữ một bí mật của ngươi",rt:"Tiểu thái giám bị đưa đi trông lăng."},
  {n:"Nhờ {eun} làm chứng kẻ mua bí mật",c:{suc:-2},o:()=>35+S.mat*5,sc:1,f:"call",w:{tamco:2},wx:"có người làm chứng",l:{danh:-2},lx:"{eun} không dám dính vào phi tần, đồn ra ngoài",rt:"{eun} gật đầu: “Khi cần, nô tài sẽ nói.”",rf:"{eun} từ chối, còn đồn rằng cung ngươi gây chuyện."},
  {n:"Không nhờ ai",c:{mat:-1},w:{duc:1},wx:"không nợ ai",lx:"đường rò vẫn mở",rt:"Ngươi tiễn {eun} ra cửa."}]},
 t1:{h:"{v} muốn ra tay",w:"v",need:["v","v2"],t:"{v} run giọng: “Để thiếp tố {v2} tội mua chuộc thái giám. Một mất một còn.”",o:[
  {n:"Cản {v}",c:{tamco:-1},w:{duc:2},sc:1,wx:"giữ {v} khỏi làm liều",lx:"{v} cho là ngươi nhát, ngươi mất thế chủ động",rt:"{v} nghe ngươi, nhưng mắt vẫn đỏ."},
  {n:"Cùng {v} ra tay",c:{suc:-3},o:A=>40+(A.f.call?15:0)+(A.f.cut?10:0),sc:1,f:"pair",w:{tamco:2},wx:"hai người một lòng",l:{danh:-3},lx:"{v2} biết cả hai cùng phe",go:(A,ok)=>{rdRel(A,"v",6);rdOan(A,"v2",ok?8:4)},rt:"Hai người chia nhau giữ chứng.",rf:"{v2} nghe phong thanh, ra tay trước."}]},
 x1:{h:"Yến Trung thu",w:"v2",need:["v","v2"],t:"Yến Trung thu. {v2} đã chuẩn bị đọc tờ chép giấy nợ trước cả hậu cung.",o:[
  {n:"Đứng lên trước, tự kể món nợ",c:{suc:-3},o:A=>35+(A.f.pair?10:0)+S.tai/5,e:["win","lose"],go:(A,ok)=>{if(ok)rdOan(A,"v2",6)},rt:"Ngươi kể: nhà buôn cho bạn vay lúc nàng khó, có gì là tội? Cả yến gật gù, {v2} không còn gì để đọc.",rf:"Lời ngươi kể thành lời thú tội. {v2} chỉ việc gật đầu."},
  {n:"Cho người lấy tờ chép trước yến",c:{bac:-30},o:A=>40+(A.f.cut?15:0)+(A.f.read?10:0)+S.mat*3,e:["win","mid"],rt:"Tờ chép biến khỏi tay áo {v2} trước khi yến mở.",rf:"Tờ chép lấy được, nhưng {v2} đã kịp thì thầm với vài người."},
  {n:"Nhường {v2} điều nàng muốn",c:{sung:-3},w:{tamco:2},e:"mid",lx:"{v2} biết ngươi sẽ trả giá lần nữa",rt:"Ngươi để {v2} ngồi chỗ của ngươi bên Hoàng thượng."}]}},
 E:{win:{k:1,tag:"Kẻ thứ ba trắng tay",w:"v",t:"{v2} không còn gì trong tay. {v} nhìn ngươi như nhìn người đã đỡ nàng hai lần.",fx:{danh:4,tamco:2},go:A=>{rdRel(A,"v",8);rdOan(A,"v2",8)}},
  mid:{k:0,tag:"{v2} giữ miệng, giữ cả giấy",t:"{v2} im lặng, nhưng không trả tờ chép. Sợi dây ấy vẫn còn trong tay nàng.",fx:{tamco:1}},
  lose:{k:-1,tag:"Món nợ bị đọc giữa yến",w:"v2",t:"Giữa yến Trung thu, chuyện {v} vay nợ nhà ngươi bị đọc lên. {v} bỏ chạy khỏi yến, ngươi ngồi lại chịu những ánh mắt.",fx:{danh:-5,sung:-2},go:A=>{rdOan(A,"v",6)}}}});

rdDef("muoi_no",8,{t:"Nợ chồng nợ",w:"v",sj:"những món nợ mới của {v}",cast(A){return rdCast(A,["v"])},
 g:"Để trả nợ cũ và bịt miệng kẻ khác, {v} lén vay một thái giám cho vay nặng lãi ở Nội vụ phủ. Lãi tháng nào chồng tháng ấy. Ngươi biết, và chỉ ngươi biết.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cây trâm ngự ban",w:"v",if:RDW(1),need:["v"],t:"Sau Trung thu {v} thở được ít ngày. Rồi ngươi thấy nàng lén cầm cố cả cây trâm ngự ban.",o:[
  {n:"Hỏi thẳng {v} nợ ai",c:{},o:()=>40+S.danh/5+S.tamco/6,w:{mat:1},sc:1,f:"know",wx:"biết chủ nợ mới",l:{tamco:-2},lx:"{v} xấu hổ, đóng cửa không tiếp",go:(A,ok)=>{if(!ok)rdOan(A,"v",3)},rt:"{v} khai: một thái giám coi kho ở Nội vụ phủ.",rf:"{v} đóng cửa cung, không tiếp ai."},
  {n:"Chuộc lại cây trâm cho nàng",c:{bac:-40},w:{duc:3},sc:1,f:"help",wx:"{v} giữ được trâm ngự ban",lx:"bạc ngươi đi, nợ nàng vẫn còn",go:A=>{rdRel(A,"v",8)},rt:"Cây trâm về lại hộp gấm của {v}."},
  {n:"Ghi lại, chờ xem",c:{duc:-1},w:{tamco:2},wx:"không tốn gì",lx:"nợ nàng lăn thêm một tháng, lòng ngươi áy náy",rt:"Ngươi ghi vào sổ riêng."}]},
 s2:{h:"{v} tránh mặt",w:"maid",if:RDW(0),need:["v"],t:"{v} tránh mặt ngươi đã lâu. Người của ngươi nghe được: nàng vay cả bạc của một thái giám cho vay nặng lãi.",o:[
  {n:"Sai người dò chủ nợ",c:{bac:-20},w:{mat:1},sc:1,f:"know",wx:"biết kẻ cho vay là ai",lx:"tốn bạc, {v} biết ngươi dò",rt:"Kẻ cho vay là một thái giám coi kho ở Nội vụ phủ."},
  {n:"Gửi lời: nếu cần, cứ đến tìm",c:{},o:()=>35+S.duc/4,w:{duc:2},sc:1,f:"help",wx:"{v} có lối quay lại",l:{danh:-2},lx:"{v} cho là ngươi thương hại, nói khắp nơi",go:(A,ok)=>{rdRel(A,"v",ok?8:-3)},rt:"Đêm ấy {v} gửi sang một mảnh lụa thêu, không lời.",rf:"{v} trả lời: “Không dám làm phiền chủ nợ cũ.”"},
  {n:"Mừng thầm",c:{duc:-2},w:{tamco:2},wx:"kẻ cũ tự sa lầy",lx:"lòng ngươi nhỏ đi",rt:"Ngươi không làm gì."}]},
 c1:{h:"Chủ nợ ở Nội vụ phủ",w:"eun",t:"Kẻ cho vay là một thái giám coi kho ở Nội vụ phủ. Hắn cho vay cả chục phi tần, cung nữ, lãi mỗi tháng một phần mười.",o:[
  {n:"Mua lại nợ của {v} từ hắn",c:{bac:-60},w:{tamco:2},sc:1,f:"buy",wx:"nợ nàng về một mối",lx:"bạc lớn ra đi; ngươi lại thành chủ nợ của {v}",rt:"Hắn đếm bạc, trao giấy nợ."},
  {n:"Báo {eun} trị hắn",c:{},o:()=>40+S.mat*4+S.danh/6,w:{danh:3},sc:1,f:"stop",wx:"ổ cho vay bị dẹp",l:{danh:-3},lx:"hắn khai tên các con nợ, có cả {v}",rt:"{eun} cho người bắt hắn, sổ cho vay bị đốt.",rf:"Hắn khai ngược: phi tần nhà buôn tranh mối cho vay."},
  {n:"Sai thái giám cung mình đến dọa hắn",c:{suc:-3},o:()=>40+S.tamco/3,w:{tamco:2},wx:"hắn giảm lãi cho {v}",l:{danh:-2},lx:"hắn đồn phi tần nhà buôn tranh mối cho vay",rt:"Hắn rụt cổ, xóa nửa phần lãi.",rf:"Hắn cười khẩy, đồn khắp các kho."}]},
 c2:{h:"{v} cầu cứu",w:"v",need:["v"],t:"Đêm khuya {v} đến, quỳ trước cửa cung ngươi: “Thiếp không còn đường nào nữa.”",o:[
  {n:"Đỡ nàng dậy, cho vay không lãi",c:{bac:-40},w:{duc:3},sc:1,f:"help",wx:"{v} sống lại",lx:"bạc ra, nợ chồng nợ, lần này với ngươi",go:A=>{rdRel(A,"v",10)},rt:"{v} khóc ướt vạt áo ngươi."},
  {n:"Bắt nàng viết giấy cam kết",c:{duc:-2},w:{tamco:3},f:"bind",wx:"giấy có điểm chỉ",lx:"ép người lúc cùng đường",go:A=>{rdOan(A,"v",5)},rt:"{v} cúi đầu điểm chỉ."},
  {n:"Dạy nàng cách kiếm bạc",c:{suc:-3},o:()=>40+S.tai/4,w:{duc:2},sc:1,wx:"{v} bán tranh thêu qua hiệu nhà ngươi",l:{bac:-20},lx:"nàng không quen làm ăn, ngươi bù lỗ",rt:"Tranh thêu của {v} bán chạy ở Giang Nam.",rf:"Tranh thêu không ai mua, ngươi bỏ bạc bù."}]},
 t1:{h:"Lãi quá hạn",w:"eun",t:"Hạn trả lãi đến. Kẻ cho vay dọa sẽ đem giấy nợ của {v} lên Kính sự phòng.",o:[
  {n:"Bỏ bạc trả lãi thay",c:{bac:-40},w:{duc:2},sc:1,wx:"hắn tạm im",lx:"bạc đi, lãi tháng sau vẫn đến",rt:"Hắn nhận bạc, hẹn tháng sau."},
  {n:"Cùng {v} đến đối mặt hắn",c:{suc:-3},o:A=>40+(A.f.know?15:0)+(A.f.stop?10:0),sc:1,w:{tamco:2},wx:"hắn chùn tay",l:{danh:-3},lx:"bị thấy đi với kẻ cho vay",rt:"Hắn thấy hai phi tần cùng đến thì rụt lại.",rf:"Có người thấy ngươi đứng ở kho Nội vụ phủ, đồn ầm lên."}]},
 x1:{h:"Một mối hay vỡ nợ",w:"v",need:["v"],t:"Cuối năm, {v} đứng trước hai đường: vỡ nợ mà bị phanh phui, hoặc gom hết nợ về một mối.",o:[
  {n:"Gom hết nợ của nàng về nhà ngươi",c:{bac:-60},o:A=>40+(A.f.buy?15:0)+(A.f.help?5:0)+S.tamco/6,e:["win","lose"],rt:"Mọi giấy nợ của {v} nằm trong tay ngươi. Ở Nội vụ phủ không ai đòi nàng nữa.",rf:"Kẻ cho vay không chịu bán, tung giấy nợ ra."},
  {n:"Dẹp ổ cho vay, nợ nàng tự tan",c:{suc:-4},o:A=>40+(A.f.stop?15:0)+(A.f.know?10:0)+S.mat*3,e:["win","mid"],rt:"Ổ cho vay bị dẹp, giấy nợ bị đốt, {v} thoát.",rf:"Ổ cho vay tan, nhưng giấy nợ của {v} đã bị kẻ khác giữ."},
  {n:"Để nàng tự gánh",c:{duc:-2},w:{tamco:2},e:"mid",lx:"{v} lún sâu thêm",rt:"Ngươi không ra tay."}]}},
 E:{win:{k:1,tag:"Nợ về một mối",w:"v",t:"Mọi món nợ của {v} giờ chỉ còn một chủ: ngươi. Nàng biết, và đêm ấy nàng ngủ được giấc đầu tiên sau nhiều tháng.",fx:{tamco:3,duc:2},go:A=>{rdRel(A,"v",10)}},
  mid:{k:0,tag:"Nợ tạm yên",t:"Năm cũ qua, nợ của {v} tạm không ai đòi. Nhưng giấy nợ vẫn nằm đâu đó.",fx:{tamco:1}},
  lose:{k:-1,tag:"Nợ vỡ",t:"Kẻ cho vay tung giấy nợ. Tên {v} và tên hiệu buôn nhà ngươi bị nhắc cạnh nhau từ cung này sang cung khác.",fx:{danh:-5,bac:-30}}}});

/* .9: the Hoàng hậu investigates when there is one (need:["hh"]); with no Hoàng hậu the Emperor's chỉ sends the Tổng quản (s3/x2) */
const MUOIN_NOQ=()=>{try{return !qOn()}catch(e){return false}},MUOIN_Q=()=>MUOIN_NOQ()?"Tổng quản phụng chỉ":"Hoàng hậu";
rdDef("muoi_no",9,{t:"Món nợ lộ ra",w:"hh",sj:"lời đồn vay nợ trong hậu cung",cast(A){return rdCast(A,["v"])},
 g:()=>`Cả hậu cung xì xào chuyện phi tần vay nợ. ${MUOIN_Q()} cho tra việc vay mượn trong cung. Tên {v} nằm trong sổ, và tên nhà ngươi nằm cạnh.`,
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Lệnh tra vay mượn",w:"hh",need:["hh"],if:RDW(1),t:"Nợ của {v} tưởng đã yên. Nhưng Hoàng hậu bỗng ra lệnh tra mọi khoản vay mượn trong hậu cung, từ cung nữ đến phi tần.",o:[
  {n:"Tự dâng sổ cho Hoàng hậu",c:{},o:()=>40+S.hh/4+S.danh/6,w:{hh:3},sc:1,f:"open",wx:"Hoàng hậu thấy ngươi ngay thẳng",l:{danh:-3},lx:"sổ có tên {v}, nàng bị gọi lên",go:(A,ok)=>{if(!ok)rdOan(A,"v",6)},rt:"Hoàng hậu đọc sổ, gật đầu: “Ngươi không giấu, bản cung nhớ.”",rf:"Hoàng hậu gọi {v} lên ngay trong buổi."},
  {n:"Bàn với {v} trước",c:{suc:-2},w:{duc:2},sc:1,f:"pair",wx:"hai người nói một lời",lx:"thức đêm bàn bạc, dễ bị nghi thông đồng",go:A=>{rdRel(A,"v",5)},rt:"Hai người thống nhất từng câu sẽ nói."},
  {n:"Giấu sổ đi",c:{duc:-2},w:{tamco:2},f:"hide",wx:"chưa ai thấy gì",lx:"giấu sổ là tội nếu bị tìm ra",rt:"Sổ nợ được khâu vào lót gối."}]},
 s2:{h:"Cung nữ đã khai",w:"hh",need:["hh"],if:RDW(0),t:"Chuyện nợ của {v} lan khắp hậu cung. Hoàng hậu cho tra việc vay mượn; cung nữ đã khai tên nhà ngươi.",o:[
  {n:"Lên Càn Ninh cung trình bày",c:{suc:-3},o:()=>40+S.hh/4,w:{hh:2},sc:1,f:"open",wx:"Hoàng hậu nghe ngươi trước",l:{hh:-3},lx:"Hoàng hậu cho là ngươi đến chạy tội",rt:"Hoàng hậu cho ngươi ngồi, nghe hết.",rf:"Hoàng hậu lạnh lùng: “Đợi bản cung gọi.”"},
  {n:"Đổ cho kẻ cho vay ở Nội vụ phủ",c:{},o:()=>45+S.tamco/4,w:{tamco:2},sc:1,wx:"tội dồn về hắn",l:{danh:-3},lx:"hắn khai ngược lại",rt:"Mọi mũi tên chĩa về thái giám cho vay.",rf:"Hắn khai: phi tần nhà buôn cũng cho vay."},
  {n:"Chờ Hoàng hậu gọi",c:{danh:-2},w:{duc:2},wx:"không tỏ ra chột dạ",lx:"lời đồn đi trước ngươi",rt:"Ngươi ngồi chép kinh chờ."}]},
 s3:{h:"Chỉ tra vay mượn",w:"eun",if:MUOIN_NOQ,t:"Trung cung để trống, Hoàng thượng hạ chỉ cho Tổng quản {eun} tra mọi khoản vay mượn trong hậu cung. Sổ của Nội vụ phủ có tên {v}, và tên nhà ngươi nằm cạnh.",o:[
  {n:"Tự đưa sổ cho {eun}",c:{},o:()=>40+S.danh/5+S.mat*3,w:{danh:2},sc:1,f:"open",wx:"{eun} tâu rằng ngươi không giấu",l:{danh:-3},lx:"sổ có tên {v}, nàng bị gọi lên",go:(A,ok)=>{if(!ok)rdOan(A,"v",6)},rt:"{eun} nhận sổ, cúi đầu: “Nô tài sẽ tâu đúng như vậy.”",rf:"{eun} gọi {v} đến hỏi ngay trong ngày."},
  {n:"Bàn với {v} trước",c:{suc:-2},w:{duc:2},sc:1,f:"pair",wx:"hai người nói một lời",lx:"thức đêm bàn bạc, dễ bị nghi thông đồng",go:A=>{rdRel(A,"v",5)},rt:"Hai người thống nhất từng câu sẽ nói."},
  {n:"Biếu {eun} để nhẹ tay",c:{bac:-40,duc:-1},w:{tamco:2},f:"hide",wx:"{eun} tâu nhẹ đi",lx:"bạc vào tay {eun}, hắn nắm thêm một chuyện của ngươi",rt:"{eun} nhận lễ, nói: “Việc nhỏ.”"}]},
 c1:{h:"Lời đồn trong ngự hoa viên",w:"maid",t:"Cung nữ các cung kháo nhau: phi tần nhà buôn muối cho vay lấy lãi, nắm thóp nửa hậu cung.",o:[
  {n:"Mời các cung đến xem sổ",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:3},sc:1,wx:"lời đồn bị sổ bẻ gãy",l:{danh:-2},lx:"người ta xem sổ chỉ để đếm ai nợ ngươi",rt:"Sổ chỉ có một cái tên, các cung tự hiểu.",rf:"Các cung đọc sổ rồi đồn thêm."},
  {n:"Truy kẻ tung tin",c:{bac:-30},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"trace",wx:"biết tin đi ra từ đâu",l:{mat:-1},lx:"tốn bạc; hỏng thì người dò bị lộ",rt:"Tin đi ra từ một cung nữ Nội vụ phủ đã nhận bạc.",rf:"Kẻ tung tin lặn mất, người dò của ngươi bị nhận mặt."},
  {n:"Mặc kệ",c:{danh:-3},w:{tamco:2},wx:"không thêm sóng",lx:"lời đồn thành sự thật trong mắt người",rt:"Ngươi đóng cửa cung."}]},
 c2:{h:"{v} bị gọi lên",w:"v",need:["v","hh"],t:"Hoàng hậu gọi {v} lên hỏi: bạc lo lót năm ấy từ đâu ra, đã lo cho ai.",o:[
  {n:"Đi cùng {v}, đứng ra làm chứng",c:{danh:-2},o:()=>40+S.hh/4+S.danh/6,sc:1,f:"pair",w:{duc:3},wx:"{v} không đứng một mình",l:{hh:-3},lx:"Hoàng hậu xếp ngươi vào cùng tội",go:(A,ok)=>{rdRel(A,"v",ok?10:6)},rt:"Lời ngươi khớp lời {v}. Hoàng hậu dịu giọng.",rf:"Hoàng hậu nói: “Hai ngươi một giuộc.”"},
  {n:"Dặn {v} khai thật",c:{tamco:-1},w:{duc:2},f:"truth",wx:"chuyện ra ánh sáng",lx:"mất quyền giữ kín chuyện; {v} khai cả người nàng lo lót",rt:"{v} khai thật: bạc năm ấy lo cho một thái giám Kính sự phòng."},
  {n:"Để {v} tự liệu",c:{duc:-2},w:{tamco:2},wx:"không bị kéo theo",lx:"đứng ngoài lúc nàng cần",go:A=>{rdOan(A,"v",6)},rt:"Ngươi không đi."}]},
 t1:{h:"Hoàng thượng nghe chuyện",w:"emp",t:"Hoàng thượng nghe chuyện phi tần vay nợ, chỉ hỏi ngươi một câu: “Nhà nàng cho vay trong cung bao lâu rồi?”",o:[
  {n:"Tâu thật đầu đuôi",c:{},o:()=>40+S.sung/4,w:{sung:2},sc:1,f:"truth",wx:"ngài quý lời thật",l:{sung:-3},lx:"ngài không vui khi nghe hết",rt:"Hoàng thượng nghe xong, chỉ nói: “Nàng giúp người, trẫm biết.”",rf:"Hoàng thượng đứng dậy, không nói gì."},
  {n:"Tâu: chỉ giúp bạn lúc khó",c:{},o:()=>45+S.tai/5,w:{sung:2},sc:1,wx:"lời nghe mềm",l:{sung:-4},lx:"ngài biết ngươi nói giảm",rt:"Hoàng thượng gật đầu, không hỏi nữa.",rf:"Hoàng thượng cười nhạt: “Giúp bạn mà có giấy nợ?”"}]},
 x1:{h:"Hoàng hậu xử",w:"hh",need:["v","hh"],t:"Hoàng hậu triệu ngươi và {v} lên Càn Ninh cung. Sổ vay mượn để trên án.",o:[
  {n:"Xin nhận hết về mình",c:{suc:-3},o:A=>40+(A.f.open?10:0)+(A.f.truth?5:0)+S.duc/6,e:["win","lose"],go:A=>{rdRel(A,"v",10)},rt:"Hoàng hậu nhìn ngươi lâu: “Cho vay giúp người lúc khó, không phải tội.”",rf:"Hoàng hậu nói: “Đã nhận thì chịu.” Ngươi bị phạt bổng."},
  {n:"Xin xét cả kẻ cho vay ở Nội vụ phủ",c:{},o:A=>45+(A.f.trace?10:0)+(A.f.pair?10:0)+S.hh/6,e:["win","mid"],rt:"Hoàng hậu cho dẹp ổ cho vay, chỉ phạt nhẹ hai người.",rf:"Hoàng hậu phạt đều mỗi người một phần."},
  {n:"Để {v} tự nhận phần mình",c:{duc:-2},w:{tamco:2},e:"mid",lx:"{v} bị phạt bổng một năm",go:A=>{rdOan(A,"v",6)},rt:"Ngươi im lặng. {v} quỳ một mình."}]},
 x2:{h:"Tâu lên Hoàng thượng",w:"emp",if:MUOIN_NOQ,need:["v"],t:"{eun} đã tâu đủ. Hoàng thượng đọc sổ vay mượn, cho gọi ngươi đến Ngự thư phòng sau buổi chầu, hỏi chuyện nợ của {v}.",o:[
  {n:"Xin nhận hết về mình",c:{suc:-3},o:A=>40+(A.f.open?10:0)+(A.f.truth?5:0)+S.duc/6,e:["win","lose"],go:A=>{rdRel(A,"v",10)},rt:"Hoàng thượng gật đầu: “Cho bạn vay lúc khó, không phải tội.”",rf:"Hoàng thượng nói: “Đã nhận thì chịu.” Ngươi bị phạt bổng."},
  {n:"Xin xét cả kẻ cho vay ở Nội vụ phủ",c:{},o:A=>45+(A.f.trace?10:0)+(A.f.pair?10:0)+S.sung/6,e:["win","mid"],rt:"Hoàng thượng sai dẹp ổ cho vay, chỉ phạt nhẹ hai người.",rf:"Hoàng thượng phạt đều mỗi người một phần."},
  {n:"Để {v} tự nhận phần mình",c:{duc:-2},w:{tamco:2},e:"mid",lx:"{v} bị phạt bổng một năm",go:A=>{rdOan(A,"v",6)},rt:"Ngươi im lặng. {v} quỳ một mình."}]}},
 E:{win:{k:1,tag:"Món nợ thành chuyện nghĩa",w:"hh",t:()=>`${MUOIN_Q()} khép việc: cho bạn vay lúc khó, không đòi lãi nặng, là nghĩa. Lời đồn tự tắt.`,fx:{danh:5,hh:3}},
  mid:{k:0,tag:"Mỗi người một phần phạt",t:"Ngươi và {v} cùng bị phạt bổng. Không ai mất mặt hơn ai.",fx:{bac:-20,duc:2}},
  lose:{k:-1,tag:"Mang tiếng cho vay trong cung",t:"Sổ vay mượn ghi tên nhà ngươi đầu tiên. Hậu cung gọi ngươi là ‘bà chủ hiệu cầm đồ’.",fx:{danh:-6,hh:-4}}}});

rdDef("muoi_no",10,{t:"Ân hay oán",w:"v",sj:"số phận của {v}",cast(A){return rdCast(A,["v","v2"])},
 g:"Chuyện nợ đến tai Hoàng thượng, ngài định phạt nặng {v}. Một lời của ngươi có thể cứu nàng, hoặc đẩy nàng xuống hẳn.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tên {v} trên ngự án",w:"emp",if:RDW(1),need:["v"],t:"Chuyện trong hậu cung đã xử êm, nhưng Hoàng thượng chưa nguôi: phi tần vay nợ để lo lót là làm nhục cung cấm. Tên {v} nằm trên ngự án.",o:[
  {n:"Xin gặp Hoàng thượng nói giúp",c:{sung:-3},o:()=>35+S.sung/4,w:{duc:2},sc:1,f:"plead",wx:"ngài nghe ngươi một câu",l:{sung:-3},lx:"ngài cho là ngươi bao che",go:(A,ok)=>{rdRel(A,"v",ok?10:4)},rt:"Hoàng thượng nghe, gật đầu: “Trẫm sẽ nghĩ.”",rf:"Hoàng thượng phất tay: “Nàng cũng dính vào sao?”"},
  {n:"Hỏi {v} nàng muốn gì",c:{suc:-2},w:{mat:1},sc:1,f:"ask",wx:"biết nàng sợ nhất điều gì",lx:"thức trắng nghe nàng khóc",rt:"{v} nói: nàng không sợ mất bậc, chỉ sợ mẫu thân biết."},
  {n:"Đứng ngoài",c:{duc:-2},w:{tamco:2},wx:"giữ mình sạch",lx:"{v} biết ngươi đã chọn",go:A=>{rdOan(A,"v",4)},rt:"Ngươi không đến ngự thư phòng."}]},
 s2:{h:"Chỉ cần im lặng",w:"maid",if:RDW(0),need:["v"],t:"Hậu cung đã phạt, giờ đến Hoàng thượng. Người ta nói ngươi chỉ cần im lặng là {v} mất hết.",o:[
  {n:"Im lặng",c:{duc:-3},w:{tamco:3},wx:"kẻ từng làm khó ngươi rơi xuống",lx:"lòng ngươi không nhẹ đi",go:A=>{rdOan(A,"v",6)},rt:"Ngươi không nói gì."},
  {n:"Tìm cách cứu nàng",c:{suc:-3},o:()=>35+S.duc/4+S.danh/6,sc:1,f:"plead",w:{duc:3},wx:"có người nói giúp {v}",l:{danh:-2},lx:"bị cho là đồng lõa",go:(A,ok)=>{rdRel(A,"v",ok?10:3)},rt:"Ngươi nhờ được một vị lão Thái phi nói giúp.",rf:"Người ta nói ngươi cứu nàng vì sợ nàng khai."},
  {n:"Gặp nàng một lần",c:{suc:-2},w:{mat:1},sc:1,f:"ask",wx:"nghe nàng nói thật",lx:"nàng nói những lời khó nghe, ngươi mệt lòng",rt:"{v} nói: “Muội thắng rồi. Giờ muội muốn gì?”"}]},
 c1:{h:"Giấy biên nhận năm ấy",w:"v",need:["v"],t:"{v} kể: bạc vay năm ấy để lo cho một thái giám Kính sự phòng ghi tên nàng vào sổ thị tẩm. Nàng còn giữ tờ biên nhận có dấu của hắn.",o:[
  {n:"Giữ giấy biên nhận giúp nàng",c:{tamco:-1},w:{mat:1},sc:1,f:"slip",wx:"cầm một bí mật lớn",lx:"giữ nó là giữ lửa, ngươi phải đề phòng",rt:"Tờ biên nhận được khâu vào lót áo ngươi."},
  {n:"Bảo nàng đốt đi",c:{mat:-1},w:{duc:2},wx:"dập lửa",lx:"mất chứng cứ có thể cứu nàng",rt:"Tờ giấy cháy trong đèn dầu."},
  {n:"Đem giấy dâng Hoàng thượng",c:{suc:-2},o:()=>35+S.sung/4+S.mat*3,w:{danh:3},sc:1,f:"slip",wx:"tội nàng nhẹ đi, kẻ nhận bạc lộ",l:{sung:-3},lx:"ngài giận cả cung cấm, giận cả ngươi",rt:"Hoàng thượng đọc, sai bắt ngay thái giám ấy.",rf:"Hoàng thượng nói: “Nàng giữ thứ này bao lâu rồi?”"}]},
 c2:{h:"Thư của mẫu thân {v}",w:"maid",need:["v"],t:"Mẫu thân {v} từ quê viết thư cho ngươi, chữ run run: xin đừng để con bà bị đuổi khỏi cung.",o:[
  {n:"Hồi thư hứa giúp",c:{suc:-2},w:{duc:3},sc:1,f:"plead",wx:"bà cụ yên lòng",lx:"lời hứa thành gánh",rt:"Ngươi viết: “Bá mẫu yên lòng.”"},
  {n:"Gửi bạc về cho bà",c:{bac:-30},w:{duc:2},wx:"nhà nàng đỡ khó",lx:"bạc không cứu được ghế của nàng",rt:"Bạc theo thuyền muối về quê {v}."},
  {n:"Không hồi thư",c:{duc:-2},w:{tamco:2},wx:"không hứa điều không chắc",lx:"bà cụ chờ mãi",rt:"Lá thư nằm trong ngăn kéo."}]},
 t1:{h:"{v2} chen vào",w:"v2",need:["v","v2"],t:"{v2} tâu với Hoàng thượng rằng {v} còn nợ nần khắp nơi, xin phạt thật nặng để răn hậu cung.",o:[
  {n:"Vạch chuyện {v2} mua chuộc thái giám",c:{},o:A=>40+(rdEnd(7)==="win"?15:0)+S.mat*3,sc:1,w:{tamco:2},wx:"{v2} câm lặng",l:{danh:-2},lx:"{v2} quay sang nhắm ngươi",go:(A,ok)=>{rdOan(A,"v2",ok?10:6)},rt:"Hoàng thượng nhìn {v2}: “Nàng cũng mua tin của Nội vụ phủ?”",rf:"{v2} chối, còn nói ngươi bịa chuyện."},
  {n:"Nhịn, lo việc chính",c:{danh:-2},w:{duc:2},wx:"không thêm thù",lx:"lời {v2} có thêm sức",rt:"Ngươi để {v2} nói."}]},
 x1:{h:"Một lời của ngươi",w:"emp",need:["v"],t:A=>{const v=rv67(A,"v");return "Hoàng thượng hỏi ngươi: “{v} nợ nhà nàng. Nàng nói xem trẫm nên xử thế nào?” "+(v&&v.rank>0?`Nàng có thể bị giáng xuống ${RANKS[v.rank-1].n}.`:"Nàng có thể bị cấm túc lâu dài.")},o:[
  {n:"Xin tha cho {v}, nhận lỗi về nhà mình",c:{suc:-4},o:A=>35+(A.f.plead?10:0)+(A.f.slip?10:0)+S.sung/6,e:["win","lose"],go:(A,ok)=>{if(ok)rdRel(A,"v",10)},rt:"Hoàng thượng thở dài: “Nàng đã nói vậy, trẫm tha.”",rf:"Hoàng thượng giận: “Nàng cũng muốn chịu tội cùng sao?”"},
  {n:"Xin xử nhẹ, phạt bổng thay giáng bậc",c:{},o:A=>45+(A.f.ask?10:0)+S.sung/6,e:["win","mid"],rt:"Hoàng thượng thuận: phạt bổng một năm, giữ nguyên bậc.",rf:"Hoàng thượng vẫn xử theo lệ."},
  {n:"Thưa: thiếp không dám bàn",c:{duc:-2},w:{tamco:2},e:"mid",lx:"{v} bị xử theo lệ",go:A=>{rdOan(A,"v",4)},rt:"Ngươi cúi đầu."}]}},
 E:{win:{k:1,tag:"{v} giữ được bậc, nợ ngươi một đời",w:"v",t:"{v} chỉ bị phạt bổng. Tối ấy nàng đến cung ngươi, không mang quà, chỉ ngồi đến khuya mà không nói được gì.",fx:{duc:3,danh:3},go:A=>{rdRel(A,"v",15)}},
  mid:{k:0,tag:"{v} bị xử theo lệ",t:"Hoàng thượng xử theo lệ. Ngươi không thêm, không bớt một lời.",fx:{tamco:2},go:A=>e67drop(rv67(A,"v"),"vì chuyện vay nợ lo lót")},
  lose:{k:-1,tag:"Hoàng thượng giận lây",t:"Hoàng thượng giận cả hai: {v} bị xử nặng, ngươi bị lạnh nhạt mấy tháng.",fx:{sung:-5,danh:-3},go:A=>e67drop(rv67(A,"v"),"vì chuyện vay nợ lo lót")}}});

rdDef("muoi_no",11,{t:"Sợi chỉ đỏ",w:"v",sj:"sợi chỉ giữa ngươi và {v}",cast(A){return rdCast(A,["v"])},
 g:"Bao năm, một món nợ buộc ngươi và {v} vào nhau. Nay đến lúc cởi: thành chị em thật, thành kẻ thù cả đời, hay để nàng lui khỏi đời ngươi. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Cuộn chỉ đỏ",w:"v",if:RDW(1),need:["v"],t:"Một sáng {v} mang đến cung ngươi một cuộn chỉ đỏ: “Ở quê thiếp, ai cứu mạng ai thì buộc chỉ đỏ cho nhau.”",o:[
  {n:"Buộc chỉ đỏ với nàng",c:{danh:-2},w:{duc:3},sc:1,wx:"{v} coi ngươi như chị em ruột",lx:"cả hậu cung thấy hai người một phe, kẻ ghét {v} ghét lây",go:A=>{rdRel(A,"v",10)},rt:"Hai sợi chỉ đỏ quấn quanh cổ tay. {v} cười như con gái mười lăm."},
  {n:"Nhận chỉ, nhưng giữ khoảng cách",c:{duc:-1},w:{tamco:2},wx:"không bị ràng buộc",lx:"{v} buồn lòng",rt:"Ngươi cất cuộn chỉ vào hộp."},
  {n:"Hỏi nàng về giấy biên nhận năm ấy",c:{},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"secret",wx:"nàng kể hết chuyện Kính sự phòng",l:{tamco:-2},lx:"nàng chột dạ, giấu đi",rt:"{v} kể: thái giám nhận bạc năm ấy vẫn còn giữ sổ riêng.",rf:"{v} lảng sang chuyện khác."}]},
 s2:{h:"{v} xin gặp",w:"maid",if:RDW(0),need:["v"],t:"{v} gửi người đến: nàng đang xin lui về tụng kinh, chỉ mong trước đó được gặp ngươi một lần.",o:[
  {n:"Đến gặp nàng",c:{suc:-2},w:{duc:2},sc:1,wx:"nghe nàng nói lời cuối",lx:"đi đêm sang cung kẻ bị phạt, mệt mà còn bị nhìn",rt:"{v} ngồi trước bàn Phật, quay lại cười với ngươi."},
  {n:"Gửi lời, không đến",c:{duc:-2},w:{tamco:2},wx:"giữ mình",lx:"{v} nghĩ ngươi khinh nàng",go:A=>{rdOan(A,"v",4)},rt:"Ngươi gửi một xâu tràng hạt."},
  {n:"Hỏi nàng về giấy biên nhận năm ấy",c:{},o:()=>40+S.mat*5,w:{mat:1},sc:1,f:"secret",wx:"nàng kể hết chuyện Kính sự phòng",l:{tamco:-2},lx:"nàng chột dạ, giấu đi",rt:"{v} kể: thái giám nhận bạc năm ấy vẫn còn giữ sổ riêng.",rf:"{v} lắc đầu: “Chuyện cũ rồi.”"}]},
 c1:{h:"Sổ nợ cuối cùng",w:"maid",need:["v"],t:"Phụ thân gửi vào bản sổ cuối của hiệu buôn: mọi món {v} từng vay, cộng cả lãi, đủ mua một tòa nhà ở Giang Nam.",o:[
  {n:"Đốt sổ trước mặt {v}",c:{bac:-50},w:{duc:3},sc:1,wx:"không còn gì buộc nàng",lx:"nhà ngươi mất trắng món nợ, ngươi bù cho cha",go:A=>{rdRel(A,"v",12)},rt:"Sổ cháy. {v} nhìn ngọn lửa, khóc không thành tiếng."},
  {n:"Trả sổ cho {v} tự giữ",c:{tamco:-2},w:{duc:2},sc:1,wx:"nàng tự quyết đời mình",lx:"buông con bài cuối, nàng có thể dùng nó ngược lại",rt:"{v} cầm sổ, run tay."},
  {n:"Giữ sổ, phòng khi cần",c:{duc:-2},w:{tamco:3},wx:"vẫn cầm dây",lx:"{v} biết sợi dây chưa đứt",go:A=>{rdOan(A,"v",5)},rt:"Sổ vào lại tráp."}]},
 c2:{h:"Thái giám Kính sự phòng",w:"eun",t:"Thái giám từng nhận bạc của {v} năm ấy nay đã lên chức. Hắn sai người nhắn: chuyện cũ chôn đi thì tốt cho cả hai cung.",o:[
  {n:"Không đáp, giữ chứng",c:{sung:-2},w:{mat:1},sc:1,f:"secret",wx:"hắn sợ",lx:"hắn gạch bớt tên ngươi ở Kính sự phòng",rt:"Hắn đợi mãi không thấy hồi âm."},
  {n:"Nhận lời hắn, đổi lấy ân",c:{duc:-3},w:{sung:2},wx:"Kính sự phòng ưu ái ngươi",lx:"ngươi thành người chung thuyền với hắn",rt:"Tên ngươi được ghi vào sổ thị tẩm thường hơn."},
  {n:"Báo {v} biết hắn đã lên chức",c:{tamco:-1},w:{duc:2},wx:"{v} có người dựa",lx:"lộ tin, {v} hoảng sợ",go:A=>{rdRel(A,"v",4)},rt:"{v} tái mặt, rồi nắm chặt tay ngươi."}]},
 t1:{h:"{v} hỏi",w:"v",need:["v"],t:"{v} nhìn ngươi lâu: “Năm ấy muội cho thiếp vay, là vì thương, hay vì muốn nắm thóp?”",o:[
  {n:"Nói thật: lúc đầu là nắm thóp",c:{},o:()=>40+S.duc/4,w:{duc:3},sc:1,wx:"nàng quý lời thật",l:{duc:-2},lx:"nàng lặng đi, xa cách",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} cười, nước mắt chảy: “Thật thì tốt. Giờ thì sao?”",rf:"{v} đứng dậy, không nói thêm."},
  {n:"Nói: vì thương",c:{duc:-2},w:{tamco:1},wx:"lời dễ nghe",lx:"một lời nói dối giữa hai người",go:A=>{rdRel(A,"v",4)},rt:"{v} gật đầu, không biết có tin không."}]},
 x1:{h:"Sợi chỉ đỏ",w:"v",need:["v"],t:"Cuối năm, {v} đến cung ngươi lần cuối với tư cách con nợ. Sợi chỉ giữa hai người, ngươi buộc chặt hay cắt đứt.",o:[
  {n:"Kết nghĩa chị em trước Phật đường",c:{suc:-3},o:A=>40+S.duc/6+(rdEnd(10)==="win"?10:0),e:["win","lose"],rt:"Hai người thắp hương, lạy ba lạy. Từ nay {v} gọi ngươi là muội muội ruột.",rf:"{v} cười buồn: “Chị em? Muội vẫn là chủ nợ.” Từ đó nàng thành kẻ thù."},
  {n:"Trả tự do cho nàng: xóa nợ, để nàng chọn",c:{bac:-40},o:A=>45+S.danh/6+(rdEnd(9)==="win"?10:0),e:["win","mid"],rt:"{v} chọn ở lại bên ngươi.",rf:"{v} chọn lui về một góc cung, tụng kinh không ra."},
  {n:"Để nàng lui đi, nợ cũng thôi",c:{tamco:-1},w:{duc:2},e:"mid",lx:"mất một người từng gần như chị em",rt:"Ngươi tiễn nàng đến cửa cung."}]}},
 E:{win:{k:1,tag:"Món nợ thành sợi chỉ đỏ",w:"v",t:"Món nợ bắt đầu bằng một tờ giấy điểm chỉ, kết thúc bằng một sợi chỉ đỏ. {v} đứng cạnh ngươi đến hết đời trong cung.",fx:{danh:6,duc:3},go:A=>e67ally(rv67(A,"v"),35)},
  mid:{k:0,tag:"{v} lui khỏi đời ngươi",t:"{v} lui về một góc cung, đóng cửa tụng kinh. Nợ đã xóa, người đã xa. Tay ngươi sạch, nhưng mất một người biết chuyện cũ.",fx:{duc:4,danh:1},go:A=>e67drop(rv67(A,"v"),"xin lui về tụng kinh")},
  lose:{k:-1,tag:"Kẻ thù cả đời",w:"v",t:"{v} không quên những năm làm con nợ. Từ nay, nơi nào ngươi đến, nàng đến sau với một lời đàm tiếu.",fx:{danh:-4},go:A=>e67foe(rv67(A,"v"),20)}}});
RD97L.push({a:"muoi_no_11",tag:"Sổ riêng của Kính sự phòng",w:"emp",p:.1,n:"Dâng giấy biên nhận năm ấy lên Hoàng thượng",c:{suc:-4},
 path:["Buộc chỉ đỏ","Hỏi nàng về giấy biên nhận","Đến gặp nàng","Đốt sổ","Trả sổ cho","Không đáp, giữ chứng","Nói thật"],np:2,bad:["Giữ sổ, phòng","Nhận lời hắn"],sc:2,x:[()=>S.duc>=40,"Đức từ 40"],
 t:"Tờ biên nhận năm ấy dẫn đến một cuốn sổ riêng của Kính sự phòng: bao năm, ai muốn được ghi tên thị tẩm đều phải nộp bạc, và bao phi tần đã vay nợ khắp nơi vì nó. Hoàng thượng thay cả Kính sự phòng. {v} quỳ cạnh ngươi trước ngự án; món nợ của nàng hóa ra là chìa khóa mở cả một ổ nợ.",
 fx:{danh:12,sung:4},go:A=>e67ally(rv67(A,"v"),30),rw:"ngocboi",ti:"Người gỡ sổ nợ hậu cung"});

