/* ================= jrd_td: the four full roads of «Con gái tội thần» (td), chapters .5–.11 (ROAD_MAP.md §4.6) =================
   Same shape as jrd_tt.js. The enemy pair {foe}/{foed} are real people (OD:L1247); when the .4 premise already sent {foe} to lãnh cung or
   {foed} to judgement, later chapters read that (foe67(), rdEnd) and the hostile role passes to people of their side. History rules of the
   expert pass (road-history.md): she never stands in a court hall or trial; retrials open with an Emperor's chỉ; verdicts are his. */
/* the premise chapter number of the road (.4 = BAL.road.first−1): rdEnd(tdPre()) = how the premise ended */
const tdPre=()=>BAL.road.first-1;
RDQ.tdsProof=A=>A.f.proof||RD_FL("td_song.proof");/* named predicate an odds term in BAL.road.fx reads (rdOdds "q") */
/* a rank name, index clamped to RANKS (ONE CORE: never a typed top index) */
/* td_tha: the grave land of her parents was won back in .6 (read by .8) — a road flag in S.st.f14 */
const TDMO=k=>{try{const f=S.st.f14;if(k)f.tdMo=1;return !!f.tdMo}catch(e){return false}};
const TDAN_RK=i=>RANKS[Math.max(0,Math.min(i|0,RANKS.length-1))].n;
/* history rule 11: an official's wife enters the palace to greet the Hoàng hậu / Thái hậu and is received by her on the way;
   with both seats empty, the mệnh phụ come in by the sóc vọng rule (fallback, never a visit to a consort alone) */
const TDVAO=()=>{try{return qOn()?"vào cung thỉnh an Hoàng hậu":!S.thDead?"vào cung thỉnh an Thái hậu":"theo lệ mệnh phụ vào cung ngày sóc vọng"}catch(e){return"theo lệ mệnh phụ vào cung ngày sóc vọng"}};
/* td_tha: {foe} in lãnh cung (alive, out) vs dead (never cast / gone) — beats for "{foe} absent" read which */
const TDFOE=()=>{try{return rivals.find(x=>x.name===S.foe)||null}catch(e){return null}};
const TDLC=()=>{const e=TDFOE();return !!(e&&e.alive&&e.out)};
const TDFD=()=>{const e=TDFOE();return !e||!e.alive};
/* td_tha: the ruộng hương hỏa came back (.6 c1, .8 x1, .11 c2 read it, so it is returned once) */
const TDRUONG=k=>!!RD_FL("td_tha.ruong",k?1:null);
/* td_song: the brother still holds a sword (.8 win); after .8 mid/lose he keeps the store / the horses */
const TDSW=()=>rdEnd(8)==="win";
/* ---------- td_an · Lật lại án cũ ---------- */
/* BAL.road.td_an = {rank:3, pre:4}  (pre = the premise chapter number whose ending says if {foed} was executed (.4 win); rank = rank index from which her own petition to reopen a former emperor's case is read; RANKS[rank].n is printed) */
/* .4 endings: win = case overturned in the Emperor's anger, {foed} beheaded, {foe} sent to lãnh cung (foe67() null), S.avenged;
   mid = father's honour restored, case still on the books, {foed} untouched; lose = proofs destroyed, the case may not be named.
   The road grows to the formal retrial (Tam ty) and the final edict. {v} = a live consort of {foed}'s faction (never the foe herself).
   Beats that need {foe} active are guarded with foe67(); beats about {foed} alive read rdEnd(tdPre()). */
rdDef("td_an",5,{t:"Bản sớ gốc",w:"eun",sj:"tờ sớ vu cáo năm xưa",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Tờ sớ {foed} dâng hặc cha ngươi năm ấy, bản gốc có son phê của tiên đế, vẫn nằm trong kho Nội các. Ấn Binh bộ đóng trên đó là ấn giả. Ai giữ được bản gốc, người ấy giữ được cả án.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Án lật trong một cơn giận",w:"emp",if:()=>rdK()>0,t:"Hoàng thượng lật án vì thương ngươi, nhưng chưa ai định án theo phép. Ngoài triều, môn sinh cũ của {foed} rỉ tai nhau: án chưa qua Tam ty (Hình bộ, Ngự sử đài, Đại Lý tự) thì chưa thành án, chứng cứ của con gái tội thần là giả, đợi ngài nguôi giận sẽ xét lại.",o:[
  {n:"Xin Hoàng thượng giao Tam ty định án",wx:"án được đưa vào nề nếp",lx:"ngài thấy ngươi đòi hỏi",rt:"Hoàng thượng gật đầu: “Đợi chứng cứ đủ, trẫm giao Tam ty.”",rf:"Hoàng thượng phẩy tay: “Trẫm đã phán, còn xét gì nữa.”"},
  {n:"Lặng lẽ gom lại bản gốc",f:"doc",wx:"chứng cứ sẽ nằm trong tay ngươi",lx:"tốn bạc lo lót người giữ kho",rt:"Một thái giám giữ kho hứa mở cửa cho người của ngươi."},
  {n:"Để mặc lời rỉ tai",wx:"không ai thấy ngươi nóng vội",lx:"lời đồn lan rộng",rt:"Ngươi chỉ lo thắp hương cho cha."}]},
 s2:{h:"Truy phong mà chưa rửa oan",w:"maid",if:()=>rdK()===0,t:"Cha ngươi được truy phục danh dự, nhưng hai chữ mưu phản vẫn ghi trong sổ Hình bộ. Đến ngày giỗ, ngươi vẫn chưa được để tang cha công khai.",o:[
  {n:"Xin được để tang cha",wx:"cả cung biết ngươi không quên",lx:"Hoàng thượng thấy ngươi khơi chuyện cũ",rt:"Hoàng thượng cho ngươi mặc áo trắng ba ngày.",rf:"Hoàng thượng im lặng, không chuẩn."},
  {n:"Dò xem bản sớ gốc nằm ở đâu",f:"doc",wx:"biết chỗ của bản gốc",lx:"kẻ giữ kho biết có người dò",rt:"Bản gốc nằm trong rương thứ ba ở kho Nội các.",rf:"Người dò về tay không."},
  {n:"Nhẫn, chờ thời",wx:"không lộ ý",lx:"thời gian trôi, chứng cứ phai",rt:"Ngươi gấp áo tang cất vào rương."}]},
 s3:{h:"Lệnh cấm nhắc chuyện cũ",w:"maid",if:()=>rdK()<0,t:"Chứng cứ đã bị thu hủy, ngươi bị cấm nhắc đến án cũ. Người trong cung tránh ngươi như tránh tro tàn.",o:[
  {n:"Tạ tội, tỏ ra đã buông",wx:"Hoàng thượng nguôi dần",lx:"kẻ thù tưởng ngươi đã gục",rt:"Hoàng thượng ghé cung ngươi uống một chén trà, không nhắc gì."},
  {n:"Cho người tìm thư lại già ở Hình bộ",f:"doc",wx:"ông vẫn còn giữ một bản chép",lx:"có người thấy người của ngươi lui tới Hình bộ",rt:"Thư lại già lấy từ gầm giường ra một bản chép cũ.",rf:"Thư lại sợ, đóng cửa không tiếp."},
  {n:"Nhờ Thái hậu hỏi giúp một lời",need:["th"],wx:"Thái hậu nhớ chuyện cũ",lx:"Thái hậu không muốn dính vào",rt:"Thái hậu hỏi Hoàng thượng một câu, ngài không gạt đi.",rf:"Thái hậu bảo: “Chuyện tiên đế đã phán, đừng nhắc.”"}]},
 c1:{h:"Thái giám giữ kho Nội các",w:"eun",t:"Kho Nội các do một lão thái giám giữ. Hắn mê cờ bạc, nợ khắp các phòng trực. {eun} biết chuyện, cũng biết ai đang trả nợ thay hắn.",o:[
  {n:"Trả nợ cho hắn",f:"doc",wx:"hắn mở kho cho ngươi",lx:"hắn say rượu khoe chuyện",rt:"Hắn hẹn cho người của ngươi vào kho một canh giờ.",rf:"Hắn nhận bạc rồi say khướt, khoe khắp phòng trực."},
  {n:"Nhờ {eun} sai hắn",wx:"có Tổng quản che chở",lx:"{eun} từ chối, chuyện ngươi nhờ vả lọt ra",rt:"{eun} chỉ nói một câu, lão giữ kho cúi rạp.",rf:"{eun} cười: “Việc kho Nội các, nô tài không dám.”"},
  {n:"Nắm lỗi cờ bạc của hắn",f:"doc",wx:"hắn sợ ngươi",lx:"hắn quay sang báo phe kia",rt:"Hắn run tay đưa chìa khóa.",rf:"Hắn chạy đi báo người đang trả nợ thay hắn."}]},
 c2:{h:"{v} để mắt",w:"v",need:["v"],t:"{v}, nhà nàng đứng trong phe {foed}, sai người theo dõi cung nữ của ngươi mỗi lần ra vào gần kho Nội các.",o:[
  {n:"Đổi đường, đổi người",wx:"kẻ theo mất dấu",lx:"{v} biết ngươi đề phòng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người của {v} đứng chờ ở cổng cũ cả buổi."},
  {n:"Dẫn người của nàng đi lạc",wx:"{v} nhận tin sai",lx:"bị nhận ra",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"{v} tưởng ngươi chỉ đi lễ chùa.",rf:"Kẻ theo nhận ra đường vòng."},
  {n:"Nói thẳng với {v}",wx:"nàng thôi dòm",lx:"nàng cười, càng dòm",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} đỏ mặt: “Muội chỉ lo cho tỷ.”",rf:"{v} cười nhạt: “Tội thần thì phải có người canh.”"}]},
 c3:{h:"{foe} nhắn hỏi",w:"foe",if:()=>!!foe67(),t:"{foe} cho người nhắn: “Tờ sớ ấy cha ta viết. Muội tìm nó làm gì?”",o:[
  {n:"Đáp: tìm để thắp hương cho cha",wx:"không lộ ý",lx:"{foe} không tin",rt:"{foe} không hỏi thêm."},
  {n:"Đáp thẳng: để lật án",wx:"{foe} chột dạ, lộ ra nỗi sợ",lx:"{foe} báo cha",go:(A,ok,G)=>{const e=foe67();if(e)oanAdd(e,S,ok?G[0]:G[1])},rt:"Người đưa tin kể: {foe} làm rơi chén trà.",rf:"Ngay chiều ấy, phủ {foed} đóng cổng."},
  {n:"Không đáp",wx:"giữ kín",lx:"{foe} càng nghi",rt:"Người đưa tin đứng chờ rồi về."}]},
 t1:{h:"Son phê và ấn giả",w:"maid",t:"{maid} lén xem được bản gốc: ấn Binh bộ lệch một nét ở chữ “Binh”. Thợ khắc ấn năm ấy họ Lý, nay mở hàng khắc dấu ở ngoại thành.",o:[
  {n:"Tìm thợ Lý",f:"seal",wx:"có người làm chứng về ấn",lx:"thợ Lý bỏ trốn",rt:"Thợ Lý nhìn bản dập rồi tái mặt: “Nét này là tay tiểu nhân.”",rf:"Hàng khắc dấu đóng cửa từ hôm qua."},
  {n:"Nhờ người đối chiếu với ấn thật ở Binh bộ",f:"seal",wx:"chứng được ấn giả bằng mắt",lx:"Binh bộ hỏi ai sai người xem ấn",rt:"Hai bản dập đặt cạnh nhau: lệch đúng một nét.",rf:"Binh bộ không cho dập ấn."},
  {n:"Chỉ ghi lại, chưa động",wx:"không ai biết ngươi đã thấy",lx:"chứng cứ mới chỉ là lời",rt:"Ngươi vẽ lại nét lệch vào sổ riêng."}]},
 x1:{h:"Đêm mở kho Nội các",w:"eun",t:"Đêm nay kho mở một canh giờ. Bản gốc nằm trong rương thứ ba. Mang ra là phạm tội, để lại thì có thể bị hủy.",o:[
  {n:"Mang bản gốc ra",e:["win","lose"],rt:"Bản gốc nằm trong tay ngươi, son phê của tiên đế còn đỏ.",rf:"Lính tuần đến. Người của ngươi bỏ chạy, rương bị niêm lại."},
  {n:"Chép tay, để bản gốc lại",e:["mid","lose"],rt:"Bản chép có cả nét lệch của ấn.",rf:"Mực chưa khô thì đèn đã tắt."},
  {n:"Xin {eun} niêm kho giữ nguyên",e:"mid",lx:"lễ tạ Tổng quản không nhẹ, bản gốc vẫn nằm chỗ người khác đến được",rt:"Kho được niêm, không ai vào được, kể cả ngươi."}]}},
 E:{win:{tag:"Bản gốc trong tay",w:"maid",t:"Tờ sớ vu cáo năm xưa, với ấn giả và son phê tiên đế, nay nằm trong tráp của ngươi. Chứng cứ thứ nhất đã có."},
  mid:{tag:"Có bản chép",t:"Ngươi có bản chép tờ sớ. Đủ để biết, chưa đủ để buộc tội."},
  lose:{tag:"Kho bị niêm",t:"Kho Nội các bị niêm, phe kia biết có người dò. Bản gốc có thể đã bị chuyển đi.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_an",6,{t:"Nhân chứng",w:"maid",sj:"những người còn nhớ án cũ",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Lão quản gia cũ của nhà ngươi còn sống ở Giang Nam; thư lại già ở Hình bộ nhận lệnh đi biên viễn, ba tháng nữa phải lên đường. Giữ họ sống, lấy được lời họ trước hạn ấy.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Lão quản gia về kinh",w:"maid",if:RDW(1),t:"Nghe tin ngươi có bản gốc, lão quản gia nhà ngươi, người từng bế ngươi thuở nhỏ, chống gậy từ Giang Nam về kinh, xin được làm chứng.",o:[
  {n:"Thuê nhà cho lão ở gần cung",wx:"nhân chứng ở trong tầm tay",lx:"ở gần cung thì dễ bị dòm",rt:"Lão quản gia dọn vào một căn nhà nhỏ ở ngõ Đông Hoa."},
  {n:"Gửi lão vào chùa Hộ Quốc",wx:"cửa chùa che chở",lx:"sư trụ trì không dám nhận",rt:"Lão quản gia cạo đầu làm người quét sân chùa.",rf:"Sư trụ trì từ chối khéo."},
  {n:"Bảo lão về quê chờ",wx:"lão yên ổn",lx:"xa thì khó gọi làm chứng",rt:"Lão quản gia lạy ba lạy rồi đi."}]},
 s2:{h:"Thư từ Giang Nam",w:"maid",if:RDW(0),t:"Lão quản gia viết thư từ Giang Nam: lão già rồi, đi không nổi, nhưng còn nhớ rõ đêm người của {foed} vào phủ nhà ngươi.",o:[
  {n:"Cho người đón lão",wx:"lão về được kinh",lx:"đường xa, lão ngã bệnh",rt:"Ba tháng sau, lão quản gia đến kinh.",rf:"Lão ngã bệnh giữa đường, phải dừng ở Dương Châu."},
  {n:"Xin lão viết lời khai gửi vào",wx:"có lời khai bằng giấy",lx:"thư bị chặn giữa đường",rt:"Lời khai đến, có điểm chỉ của lão.",rf:"Thư không đến."},
  {n:"Để lão yên",wx:"không ai nói ngươi ép người già lặn lội",lx:"lão tự lên đường, không ai đón",rt:"Ngươi gửi lão một tấm áo bông. Lão vẫn chống gậy tự về kinh."}]},
 c1:{h:"Thư lại bị điều đi",w:"maid",t:"Thư lại già ở Hình bộ nhận lệnh đi một huyện biên viễn, hạn ba tháng phải lên đường. Người ký lệnh từng ăn lộc nhà {foed}.",o:[
  {n:"Lo lót xin hoãn lệnh",f:"wit",wx:"ông ở lại kinh",lx:"bạc rơi vào tay phe kia",rt:"Lệnh điều được hoãn đến sang năm.",rf:"Bạc đi, lệnh vẫn y nguyên."},
  {n:"Lấy lời khai trước hạn",f:"wit",wx:"lời khai ký kịp",lx:"vội quá, lời khai thiếu dấu",rt:"Thư lại ký vào lời khai đêm trước khi đi.",rf:"Lời khai thiếu dấu Hình bộ."},
  {n:"Để ông đi",wx:"ông khỏi bị liên lụy",lx:"mất người nhớ hồ sơ",rt:"Thư lại đi, gửi lại một lời chào."}]},
 c2:{h:"Tờ cung khai ở chùa Giang Nam",w:"maid",t:"Lão quản gia kể: năm ấy, lão thái giám Vương từng gửi một tờ cung khai cho sư trụ trì một ngôi chùa ở Giang Nam, dặn chỉ trao cho người nhà ngươi.",o:[
  {n:"Sai người xuống Giang Nam",f:"wit",wx:"có lời của lão Vương",lx:"người đi bị theo dõi",rt:"Tờ cung khai về đến cung, giấy đã ngả vàng, chữ lão Vương run run.",rf:"Sư trụ trì đã viên tịch, tờ cung khai chưa tìm ra."},
  {n:"Viết thư xin sư gửi lên",f:"wit",wx:"sư tin chữ của ngươi",lx:"thư rơi vào tay kẻ khác",rt:"Sư gửi tờ cung khai lên, kèm một chuỗi hạt.",rf:"Thư không có hồi âm."},
  {n:"Chưa động đến",wx:"tờ cung khai còn yên chỗ cũ",lx:"chưa có trong tay",rt:"Ngươi ghi tên ngôi chùa vào sổ riêng."}]},
 c3:{h:"{foe} dò hỏi",w:"foe",if:()=>!!foe67(),t:"{foe} hỏi cung nữ của ngươi về một ông lão lạ hay đứng ở chân thành. Nàng biết nhà nàng đang bị lần lại.",o:[
  {n:"Cho lão quản gia đổi chỗ",wx:"kẻ dò mất dấu",lx:"lão mệt vì đổi chỗ",rt:"Lão quản gia dọn đi trong đêm."},
  {n:"Để nàng thấy một ông lão khác",wx:"{foe} theo nhầm người",lx:"nàng nhận ra trò",go:(A,ok,G)=>{const e=foe67();if(e)oanAdd(e,S,ok?G[0]:G[1])},rt:"{foe} sai người theo một ông lão bán than suốt nửa tháng.",rf:"{foe} cười: “Muội tưởng ta mù sao?”"},
  {n:"Cảnh cáo {foe}",wx:"{foe} chùn tay",lx:"{foe} tâu ngươi đe dọa",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} thôi hỏi.",rf:"{foe} khóc với Hoàng thượng rằng ngươi dọa nàng."}]},
 t1:{h:"Kẻ dò quanh nhà",w:"maid",t:"Có kẻ lảng vảng quanh chỗ ở của lão quản gia, hỏi hàng xóm lão đi đâu, gặp ai.",o:[
  {n:"Đổi chỗ ở cho lão",wx:"kẻ dò mất dấu",lx:"lão già yếu, đi lại khổ",rt:"Lão quản gia dọn về một gian sau tiệm thuốc."},
  {n:"Bắt kẻ dò",wx:"biết ai sai hắn",lx:"hắn chạy, phe kia biết bị lộ",rt:"Kẻ dò khai là gia nhân một phủ quan.",rf:"Kẻ dò chạy mất."},
  {n:"Cho lão giả bệnh nằm nhà",wx:"kẻ dò tưởng lão sắp chết",lx:"kẻ dò không tin",rt:"Kẻ dò thôi đến.",rf:"Kẻ dò trèo tường nhìn vào."}]},
 x1:{h:"Kẻ đến lấy mạng",w:"maid",t:"Đêm cuối trước hạn thư lại lên đường, kẻ lạ trèo tường vào chỗ ở của lão quản gia. Người của ngươi chỉ có một khắc.",o:[
  {n:"Bắt sống kẻ đến",e:["win","lose"],rt:"Kẻ đến bị bắt sống. Trong người hắn có thẻ bài của một phủ quan.",rf:"Kẻ đến thoát. Lão quản gia bị thương."},
  {n:"Đưa lão chạy",e:["mid","lose"],rt:"Lão quản gia sống, kẻ đến về tay không.",rf:"Lão ngã khi chạy, bị thương nặng."},
  {n:"Báo lính tuần thành",e:["mid","lose"],rt:"Lính tuần đến, kẻ đến bỏ chạy.",rf:"Lính tuần đến muộn."}]}},
 E:{win:{tag:"Nhân chứng có đủ",w:"maid",t:"Lão quản gia sống, thư lại kịp ký lời khai trước khi lên đường, và kẻ đến lấy mạng đã khai ra phủ sai hắn. Chứng cứ thứ hai đã có."},
  mid:{tag:"Nhân chứng còn sống",t:"Lão quản gia còn sống, lời khai đã nằm trong tráp. Kẻ sai người đến vẫn chưa lộ mặt."},
  lose:{tag:"Nhân chứng bị thương",t:"Lão quản gia bị thương nặng, đi đâu cũng phải khiêng cáng; thư lại đã lên đường. Lời họ còn trên giấy, nhưng khó ai đứng ra đối chất trước công đường.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_an",7,{t:"Nhà kẻ thù ra tay",w:"v",sj:"đòn phản công của nhà {foed}",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Nhà {foed} biết ngươi đang gom chứng cứ. Họ không chờ ngươi dâng sớ mà ra tay trước: trong cung qua {v}, và qua bất cứ ai còn nợ ơn họ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Phủ quan bị lộ",w:"maid",if:RDW(1),t:"Kẻ đến lấy mạng đã khai ra một phủ quan thân với nhà {foed}. Phủ ấy đang lo chạy tội, và sẵn lòng làm bất cứ điều gì.",o:[
  {n:"Dâng lời khai lên Hoàng thượng, xin giao Hình bộ",wx:"phủ ấy bị tra",lx:"Hình bộ gác lại, phe kia biết hết",rt:"Hoàng thượng giao lời khai cho Hình bộ; Hình bộ cho người đến hỏi phủ ấy.",rf:"Hình bộ cất lời khai vào ngăn kéo."},
  {n:"Giữ lời khai, đợi ngày dâng sớ",wx:"lá bài còn kín",lx:"phủ ấy kịp xóa dấu",rt:"Ngươi khóa lời khai vào tráp."},
  {n:"Gửi bản sao cho phủ ấy xem",f:"press",wx:"phủ ấy sợ, rút tay",lx:"phủ ấy liều ăn thua",rt:"Phủ ấy cho người đến xin ngươi tha.",rf:"Phủ ấy dâng sớ tố ngươi trước."}]},
 s2:{h:"Lời đồn về ngươi",w:"v",if:RDW(0),t:"Khắp cung truyền nhau: con gái tội thần đêm đêm gặp người lạ ngoài cung, mưu việc báo thù. Lời đồn đi ra từ cung {v}.",o:[
  {n:"Đóng cửa cung một tháng",wx:"lời đồn không có chỗ bám",lx:"việc gom chứng cứ chậm lại",rt:"Cửa cung ngươi khép suốt một tháng."},
  {n:"Truy ra kẻ tung tin",wx:"bắt được miệng đầu tiên",lx:"càng truy càng ồn",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Một cung nữ của {v} nhận là đã nói.",rf:"Ai cũng nói nghe người khác kể."},
  {n:"Bỏ bạc mua miệng đám cung nữ",wx:"lời đồn tắt dần",lx:"mua miệng là như nhận tội",rt:"Mười ngày sau, không ai nhắc nữa.",rf:"Có kẻ nhận bạc rồi kể thêm chuyện ngươi mua miệng."}]},
 c1:{h:"{foe} tố ngươi",w:"foe",if:()=>!!foe67(),t:"{foe} quỳ trước Hoàng thượng, tố ngươi chứa chấp người nhà tội thần ngoài cung và thông tin với họ.",o:[
  {n:"Thừa nhận lão quản gia là người nhà cũ",wx:"Hoàng thượng thấy ngươi không giấu",lx:"bị trách tự ý",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"Hoàng thượng gật đầu: “Người cũ nhớ chủ, có gì là tội.”",rf:"Hoàng thượng trách ngươi không tâu trước."},
  {n:"Chối, gọi đó là lời vu",wx:"{foe} mang tiếng vu cáo",lx:"bị bắt quả tang nói dối",go:(A,ok,G)=>{const e=foe67();if(e)oanAdd(e,S,ok?G[0]:G[1])},rt:"{foe} không đưa ra được chứng, bị Hoàng thượng quở.",rf:"{foe} đưa ra tên căn nhà ở ngõ Đông Hoa."},
  {n:"Xin Thái hậu đứng ra",need:["th"],wx:"Thái hậu gạt lời tố",lx:"Thái hậu ngại phiền",rt:"Thái hậu nói: “Chuyện nhỏ, đừng làm ồn.”",rf:"Thái hậu không nói gì."}]},
 c2:{h:"Thư từ lãnh cung",w:"foe",if:()=>rivals.some(x=>x.enemy&&x.alive&&x.out),t:"Từ lãnh cung, {foe} nhờ một cung nữ quét dọn chuyển thư cho {v}. Trong thư là tên những người đã làm chứng cho ngươi.",o:[
  {n:"Chặn đường thư lãnh cung",wx:"thư không ra được nữa",lx:"{v} biết ngươi canh lãnh cung",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cung nữ quét dọn bị đổi đi nơi khác."},
  {n:"Đến lãnh cung gặp {foe}",wx:"{foe} thôi viết thư",lx:"người ta nói ngươi đến xát muối",go:(A,ok,G)=>{const e=rivals.find(x=>x.enemy&&x.alive);if(e){if(ok)relAdd(S,e,G[0]);else oanAdd(e,S,G[1])}},rt:"{foe} nhìn ngươi rất lâu, rồi đưa nốt lá thư chưa gửi vào lửa.",rf:"{foe} cười điên dại, ném chén vỡ dưới chân ngươi."},
  {n:"Tâu Hoàng thượng",wx:"lãnh cung bị canh nghiêm",lx:"ngài chán nghe chuyện cũ",rt:"Hoàng thượng sai đổi người canh lãnh cung.",rf:"Hoàng thượng phẩy tay."}]},
 c3:{h:"Bài thơ năm mười bốn tuổi",w:"v",need:["v"],t:"{v} dâng lên Hoàng thượng một bài thơ ngươi viết thuở nhỏ, bảo trong thơ có ý oán vua.",o:[
  {n:"Giảng lại bài thơ trước mặt vua",wx:"ngài thấy thơ chỉ là nhớ nhà",lx:"lời giảng nghe như lời chối",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng thượng nghe xong, đặt bài thơ xuống: “Thơ hay. Người dâng thơ đọc chưa hiểu.”",rf:"Hoàng thượng cau mày, cất bài thơ lại."},
  {n:"Nhận là thơ dại, xin tội",wx:"ngài thương ngươi thật thà",lx:"{v} được thế",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng bảo: “Thơ trẻ con, trẫm không chấp.”"},
  {n:"Tìm ai lục đồ cũ của ngươi",wx:"lộ ra {v} sai người lục rương của ngươi",lx:"không lần ra",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Một thái giám khai đã lấy bài thơ từ rương ngươi theo lời {v}.",rf:"Kẻ lấy trộm đã bị đưa ra khỏi cung."}]},
 t1:{h:"Ai bán ngươi",w:"maid",t:"Biết chỗ ở của lão quản gia chỉ có ba người. Một trong ba đã nói ra.",o:[
  {n:"Thử cả ba bằng ba tin giả",wx:"tìm ra kẻ phản",lx:"cả ba đều sinh nghi",rt:"Tin giả thứ hai lọt ra ngoài: kẻ phản là người đưa cơm.",rf:"Không tin nào lọt ra."},
  {n:"Tin {maid}, nghi hai người kia",wx:"{maid} càng trung",lx:"có thể nghi oan người",rt:"{maid} quỳ tạ ơn."},
  {n:"Cho cả ba thôi việc này",wx:"đường rò bị bịt",lx:"mất người chạy việc",rt:"Ba người được giao việc khác."}]},
 x1:{h:"Tờ sớ tố ngươi",w:"emp",t:()=>`Hoàng thượng cho gọi ngươi. Trên ngự án là một tờ sớ: ${/^(win|r97)$/.test(rdEnd(tdPre()))?"môn sinh cũ của {foed}":"{foed}"} tố ngươi làm giả chứng cứ để báo thù, xin tra cung ngươi.`,o:[
  {n:"Xin tra cung để rửa tiếng",e:["win","lose"],rt:"Cung ngươi bị tra, không tìm thấy gì sai. Kẻ dâng sớ phải chịu tội vu cáo.",rf:"Người tra lục ra bản chép tờ sớ cũ. Hoàng thượng cau mày."},
  {n:"Dâng ngay chứng cứ đang có",e:["mid","lose"],rt:"Hoàng thượng đọc, gác tờ sớ tố ngươi lại.",rf:"Chứng cứ chưa đủ, ngài gác cả hai."},
  {n:"Khóc xin ngài nhớ đến cha ngươi",e:"mid",lx:"chứng cứ chưa dùng đã lộ",rt:"Hoàng thượng thở dài, bảo ngươi lui."}]}},
 E:{win:{tag:"Đòn phản công bị bẻ gãy",w:"emp",t:"Lời tố ngươi làm giả chứng cứ bị bác. Kẻ đứng tên sớ bị phạt bổng; {v} im lặng một thời gian.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Hai tờ sớ cùng bị gác",t:"Hoàng thượng gác cả lời tố lẫn chứng cứ của ngươi. Không ai thắng, nhưng ai cũng biết trận này chưa xong."},
  lose:{tag:"Ngươi bị nghi",t:"Hoàng thượng nghi ngươi làm giả chứng cứ. Cung ngươi bị canh, và phe kia đắc ý.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_an",8,{t:"Đủ chứng cứ",w:"emp",sj:"chứng cứ thứ ba và bậc để dâng sớ",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:()=>`Tờ sớ năm ấy và lời nhân chứng, gom được bao nhiêu thì ngươi đã gom. Còn thiếu chứng cứ thứ ba: sổ xuất ấn của Binh bộ năm ấy. Cuối năm nay, sổ cũ sẽ bị đem đốt theo lệ. Và sớ xin xét lại án của tiên đế chỉ được đọc khi người dâng đứng từ bậc ${TDAN_RK(BAL.road.td_an.rank)} trở lên, hoặc có người đủ cao chịu dâng thay.`,
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng hỏi nhỏ",w:"emp",if:RDW(1),t:"Sau khi lời tố bị bác, Hoàng thượng hỏi nhỏ: “Nàng còn thiếu gì?”",o:[
  {n:"Tâu: thiếu sổ xuất ấn Binh bộ",f:"reg",wx:"ngài chịu xét lời xin rút sổ trước lò",lx:"ngài thấy ngươi lấn việc triều",rt:"Hoàng thượng gật đầu: “Đốt sổ là lệ cũ, trẫm không bỏ. Nhưng ai xin rút sổ trước lò, trẫm sẽ xét.”",rf:"Hoàng thượng chỉ cười, không đáp."},
  {n:"Tâu: chỉ thiếu lòng ngài",wx:"ngài vui",lx:"bỏ lỡ dịp xin giữ sổ",rt:"Hoàng thượng nắm tay ngươi rất lâu."},
  {n:"Không tâu gì",wx:"ngài thấy ngươi biết phận",lx:"sổ vẫn theo lệ bị đốt",rt:"Ngươi chỉ rót trà."}]},
 s2:{h:"Cuối năm sắp đến",w:"maid",if:RDW(0),t:"Binh bộ đã lập danh sách sổ cũ đem đốt cuối năm. Sổ xuất ấn năm ấy nằm ở dòng thứ mười hai.",o:[
  {n:"Lo lót cho người chép sổ",f:"reg",wx:"có bản chép sổ ấn",lx:"người chép bị bắt",rt:"Bản chép về tay ngươi trong tay áo một thư lại.",rf:"Người chép bị bắt khi ra cổng Binh bộ."},
  {n:"Nhờ người quen xếp sổ ấy lên xe gần lối đi",f:"reg",wx:"ngày đốt, sổ nằm chỗ dễ rút",lx:"bị hỏi vì sao",rt:"Sổ năm ấy được xếp lên xe thứ hai, ngay cạnh lối đi.",rf:"Người quen từ chối: “Lệ là lệ.”"},
  {n:"Để mặc",wx:"không lộ",lx:"chứng cứ thứ ba sắp thành tro",rt:"Ngươi đếm từng ngày đến cuối năm."}]},
 c1:{h:"Sổ xuất ấn Binh bộ",w:"maid",t:"Người của ngươi tìm thấy: năm ấy ấn Binh bộ được đem ra khỏi kho đúng một đêm, người ký nhận là một thư lại dưới quyền {foed}.",o:[
  {n:"Chép lại trang ấy",f:"reg",wx:"có chứng cứ thứ ba",lx:"bản chép không có dấu Binh bộ",rt:"Trang chép nằm trong tráp, cạnh bản sớ gốc."},
  {n:"Nhờ Ngự sử xin Binh bộ sao y có đóng dấu",f:"reg",wx:"bản sao có giá trước công đường",lx:"Binh bộ báo phe kia",rt:"Bản sao có dấu son Binh bộ.",rf:"Binh bộ đáp: sổ cũ không sao cho người ngoài bộ."},
  {n:"Để nguyên, chỉ ghi số trang",wx:"không ai biết ngươi đã thấy",lx:"cuối năm sổ thành tro",rt:"Ngươi ghi: quyển bảy, trang mười chín."}]},
 c2:{h:"Bậc chưa đủ",w:"emp",if:()=>S.rank<BAL.road.td_an.rank,t:()=>`Ngươi mới ở bậc ${TDAN_RK(S.rank)}. Muốn tự tay dâng sớ, phải lên đến bậc ${TDAN_RK(BAL.road.td_an.rank)}, hoặc tìm người đủ cao dâng thay.`,o:[
  {n:"Dồn sức lấy lòng Hoàng thượng",need:["nsrv"],wx:"gần bậc cần hơn",lx:"mệt sức, bỏ dở việc khác",rt:"Hoàng thượng ghé cung ngươi nhiều hơn."},
  {n:"Xin Thái hậu dâng thay",need:["th"],f:"th",wx:"Thái hậu nhận lời",lx:"Thái hậu chê ngươi lợi dụng",rt:"Thái hậu gật đầu: “Đến lúc, ai gia sẽ đưa sớ ấy.”",rf:"Thái hậu không đáp."},
  {n:"Nhờ Ngự sử dâng thay",f:"censor",wx:"sớ đi đường triều",lx:"Ngự sử bị phe kia chặn",rt:"Một Ngự sử già nhận lời đứng tên sớ.",rf:"Ngự sử xin cáo bệnh."}]},
 c3:{h:"Bậc đã đủ",w:"emp",if:()=>S.rank>=BAL.road.td_an.rank,t:()=>`Ngươi đã ở bậc ${TDAN_RK(S.rank)}. Sớ của ngươi sẽ được đọc, nhưng cũng vì thế, cả triều sẽ nhìn vào ngươi.`,o:[
  {n:"Tự tay soạn sớ",f:"self",wx:"lời sớ là lời của ngươi",lx:"mọi lỗi đều do ngươi gánh",rt:"Ngươi mài mực suốt đêm."},
  {n:"Mời Ngự sử cùng đứng tên",f:"censor",wx:"sớ có tiếng nói ngoài triều",lx:"Ngự sử đòi một ân",rt:"Ngự sử ký tên dưới tên ngươi.",rf:"Ngự sử chỉ hứa nói giúp, không ký."},
  {n:"Hỏi ý Thái hậu trước",need:["th"],wx:"Thái hậu không cản",lx:"Thái hậu khuyên thôi",rt:"Thái hậu bảo: “Đi thì đi cho thẳng.”",rf:"Thái hậu thở dài: “Con còn trẻ.”"}]},
 t1:{h:"{v} đòi đổi chác",w:"v",need:["v"],t:"{v} nhắn: nhà nàng có người ở Binh bộ, sổ năm ấy có thể cháy sớm hơn ngày đốt. Nàng sẽ không để chuyện ấy xảy ra, nếu ngươi hứa trong sớ không nhắc đến nhà nàng.",o:[
  {n:"Nhận đổi",wx:"{v} không nhúng tay vào sổ",lx:"nhà {v} thoát",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} mỉm cười: “Tỷ biết điều.”"},
  {n:"Từ chối thẳng",wx:"sớ không bị ràng buộc",lx:"{v} ra tay với sổ, ngày đốt khó rút hơn",go:(A,_ok,G)=>{A.f.vb=1;rdOan(A,"v",G[0])},rt:"{v} đặt chén trà xuống, không nói thêm."},
  {n:"Hứa rồi không giữ",wx:"{v} tin, không nhúng tay vào sổ",lx:"bị bắt bài, {v} ra tay với sổ",go:(A,ok,G)=>{if(!ok)A.f.vb=1;rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} tin lời hứa.",rf:"{v} nhìn thấu: “Tỷ tưởng muội ngốc sao?”"}]},
 x1:{h:"Ngày đốt sổ cũ",w:"emp",t:"Sáng cuối năm, xe chở sổ cũ của Binh bộ lăn ra lò. Sổ xuất ấn năm ấy nằm trên xe thứ hai.",o:[
  {n:"Cho người chặn xe xin rút sổ",e:["win","lose"],rt:"Sổ được rút khỏi xe, nguyên vẹn, có dấu Binh bộ.",rf:"Người chặn xe bị bắt; sổ cháy cùng xe."},
  {n:"Nhờ người đủ cao xin giữ sổ",e:["mid","lose"],rt:"Sổ được giữ lại ở Binh bộ theo lệnh trên.",rf:"Lời xin đến muộn một khắc."},
  {n:"Chỉ giữ bản chép",e:"mid",lx:"bản chép kém giá trước công đường",rt:"Ngươi cất bản chép vào tráp, nhìn khói bay."}]}},
 E:{win:{tag:"Đủ ba chứng cứ",w:"maid",t:()=>`${rdEnd(5)==="win"?"Bản sớ gốc":"Tờ sớ năm ấy"}, lời nhân chứng, sổ xuất ấn Binh bộ: ba chứng cứ nằm trong tay ngươi. Còn lại chỉ là lúc dâng.`},
  mid:{tag:"Chứng cứ còn thiếu",t:"Ngươi có đủ để nói, chưa đủ để buộc. Sớ có thể dâng, nhưng sẽ phải đấu bằng lời."},
  lose:{tag:"Sổ ấn thành tro",t:"Sổ xuất ấn Binh bộ đã cháy. Phe kia biết ngươi chỉ còn bản chép.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_an",9,{t:"Dâng sớ",w:"emp",sj:"tờ sớ xin xét lại án nhà ngươi",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Tờ sớ đã soạn: xin Hoàng thượng ban chỉ giao Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự, hội thẩm lại. Án do tiên đế phê; xin xét lại là chạm đến chữ hiếu của Hoàng thượng. Chọn ngày, chọn lời, chọn người đứng cạnh, rồi quỳ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ngày lành",w:"emp",if:RDW(1),t:"Khâm thiên giám tâu: tháng này có ngày đại cát. Hoàng thượng vừa được tin thắng trận ở biên, lòng đang rộng.",o:[
  {n:"Dâng ngay ngày đại cát",wx:"đúng lúc lòng vua rộng",lx:"ngày lành của ngài, không phải của ngươi",rt:"Hoàng thượng nhận sớ, không cau mày.",rf:"Hoàng thượng bảo: “Hôm nay là ngày vui.”"},
  {n:"Đợi qua tiệc mừng",wx:"không làm mất vui ngài",lx:"phe kia có thêm thời gian",rt:"Ngươi cất sớ chờ qua tiệc."},
  {n:"Mở tiệc mừng thắng trận ở cung ngươi",wx:"ngài ghé cung ngươi",lx:"tốn kém, bị nói xa hoa",rt:"Hoàng thượng ngồi đến canh ba, cười nói như thuở mới gặp."}]},
 s2:{h:"Triều thần chia hai",w:"maid",if:RDW(0),t:"Tin ngươi sắp dâng sớ lan ra. Triều thần chia hai: kẻ bảo xét lại án tiên đế là bất hiếu, kẻ bảo án oan thì phải giải.",o:[
  {n:"Gặp riêng một Ngự sử ngay thẳng",f:"censor",wx:"có người nói giúp ngoài triều",lx:"bị nói kéo bè",rt:"Ngự sử hứa sẽ đứng ra khi sớ đến triều.",rf:"Ngự sử cáo bệnh."},
  {n:"Mời lễ quan giảng chữ hiếu",wx:"có lời rằng giải oan cũng là hiếu",lx:"lễ quan nói hai đầu",rt:"Lễ quan viết: “Sửa điều tiên đế bị lừa, ấy là đại hiếu.”",rf:"Lễ quan nhận lễ của cả hai bên."},
  {n:"Im lặng chờ",wx:"không ai bắt bẻ được",lx:"phe kia nói một mình",rt:"Ngươi không ra khỏi cung."}]},
 c1:{h:"Chữ hiếu",w:"th",need:["th"],t:"Thái hậu cho gọi: “Xét lại án tiên đế là nói tiên đế sai. Ngươi có nghĩ đến Hoàng thượng không?”",o:[
  {n:"Tâu: tiên đế bị lừa, không phải sai",f:"pious",wx:"Thái hậu gật đầu",lx:"Thái hậu cho là ngươi khéo miệng",rt:"Thái hậu lần chuỗi hạt: “Nói vậy thì nghe được.”",rf:"Thái hậu quay đi: “Lời hay thì ai chẳng nói được.”"},
  {n:"Xin Thái hậu đứng sau",f:"pious",wx:"Thái hậu ngầm ủng hộ",lx:"Thái hậu không muốn dính",rt:"Thái hậu nhận lễ, nói sẽ ngồi bên Hoàng thượng hôm ấy.",rf:"Thái hậu trả lễ."},
  {n:"Cúi đầu nghe dạy",wx:"Thái hậu thấy ngươi biết lễ",lx:"bà chưa hứa gì",rt:"Thái hậu dạy ngươi một canh giờ về chữ hiếu."}]},
 c2:{h:"{v} đến chặn",w:"v",need:["v"],t:"{v} đến cung ngươi, giọng ngọt: “Tỷ tỷ dâng sớ hôm nào, muội cũng có một tờ, kể những đêm người lạ ra vào cung tỷ.”",o:[
  {n:"Dâng sớ trước nàng một ngày",wx:"sớ của nàng thành lời chống chế",lx:"vội vàng, lời sớ sơ suất",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Sớ của ngươi đến trước, sớ của {v} bị gác.",rf:"Sớ đến vội, thiếu một trang."},
  {n:"Hỏi nàng muốn gì",wx:"biết giá của nàng",lx:"nàng cười, không nói",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} buột miệng: nàng chỉ sợ nhà mình bị liên lụy.",rf:"{v} cười, đứng dậy về."},
  {n:"Mặc nàng",wx:"không sa vào",lx:"hai tờ sớ đến cùng ngày",rt:"Ngươi tiễn {v} ra cửa."}]},
 c3:{h:"{foe} xin gặp",w:"foe",if:()=>!!foe67(),t:"{foe} xin gặp ngươi trước ngày dâng sớ. Nàng không cầu xin, chỉ hỏi: “Nếu cha ta có tội, thì ta có tội không?”",o:[
  {n:"Đáp: tội ai người nấy chịu",wx:"{foe} biết ngươi không đòi máu cả nhà",lx:"phe kia thấy ngươi mềm",go:(_A,_ok,G)=>{const e=foe67();if(e)relAdd(S,e,G[0])},rt:"{foe} cúi đầu, lặng lẽ về."},
  {n:"Đáp: nhà ta cũng chẳng ai có tội",wx:"giữ trọn mối thù",lx:"{foe} oán thêm",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} tái mặt."},
  {n:"Hỏi nàng biết gì về án cũ",wx:"{foe} buột ra một điều chưa ai biết",lx:"{foe} im lặng bỏ đi",rt:"{foe} kể: đêm ấy cha nàng về phủ, tay run không cầm nổi chén.",rf:"{foe} đứng dậy, không nói một lời."}]},
 t1:{h:"Lời sớ",w:"maid",t:"Đêm trước ngày dâng, ngươi đọc lại tờ sớ. Một câu có thể đổi cả án: buộc tội kẻ vu cáo, hay chỉ xin xét lại?",o:[
  {n:"Viết: xin trị tội kẻ vu cáo",f:"hard",wx:"sớ có gai",lx:"Hoàng thượng thấy ngươi đòi máu",rt:"Ngươi viết thêm một dòng, nét bút rất mạnh."},
  {n:"Viết: chỉ xin Tam ty xét lại",f:"soft",wx:"sớ dễ được chuẩn",lx:"kẻ vu cáo có đường thoát",rt:"Ngươi gạch đi một dòng."},
  {n:"Viết cả hai, để ngài chọn",wx:"lời sớ khéo",lx:"sớ dài, ngài đọc không hết",rt:"Tờ sớ đọc lên trơn như nước.",rf:"Tờ sớ dài ba trang."}]},
 x1:{h:"Quỳ trước ngự án",w:"emp",t:"Ngươi quỳ trước ngự án, hai tay nâng tờ sớ. Hoàng thượng đọc rất lâu.",o:[
  {n:"Xin Tam ty xét lại, đưa chứng cứ ra",e:["win","lose"],rt:"Hoàng thượng phê: “Giao Tam ty hội thẩm.”",rf:"Hoàng thượng gấp sớ: “Án của tiên đế, trẫm không xét lại.”"},
  {n:"Xin ngài đọc thôi, không đòi gì",e:["mid","lose"],rt:"Hoàng thượng giữ sớ lại, cho Hình bộ xem trước.",rf:"Sớ bị trả về."},
  {n:"Rút sớ, xin đợi",e:"mid",lx:"chứng cứ nằm thêm một năm",rt:"Ngươi rút sớ, khấu đầu lui ra."}]}},
 E:{win:{tag:"Sớ được chuẩn",w:"emp",t:"Hoàng thượng giao Tam ty hội thẩm. Lần đầu tiên sau bao năm, án nhà ngươi được xét theo phép, không theo cơn giận."},
  mid:{tag:"Sớ còn chờ",t:"Sớ nằm ở Hình bộ, chưa được chuẩn, chưa bị bác. Phe kia có thêm thời gian."},
  lose:{tag:"Sớ bị trả về",t:"Hoàng thượng không muốn xét lại án của tiên đế. Phe kia lập tức tính nước khác.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_an",10,{t:"Tam ty xét lại",w:"emp",sj:"phiên Tam ty hội thẩm án nhà ngươi",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự, cùng ngồi xét lại án nhà ngươi. Nhân chứng sẽ bị hỏi, chứng cứ sẽ bị soi, và bên kia cũng có quyền nói. Phi tần không được ra công đường: mọi lời của ngươi phải đi qua tay người khác.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Danh sách quan xét án",w:"emp",if:RDW(1),t:"Chỉ dụ ban xuống: giao Tam ty hội thẩm án nhà ngươi. Danh sách ba quan xét án được công bố. Một người là môn sinh cũ của {foed}.",o:[
  {n:"Xin Hoàng thượng đổi người",wx:"phiên xét công bằng hơn",lx:"ngài cho là ngươi nghi cả triều",rt:"Hoàng thượng đổi một người.",rf:"Hoàng thượng bảo: “Người trẫm chọn, nàng không tin sao?”"},
  {n:"Để Ngự sử nêu lệ hồi tị",wx:"hắn tự xin lui",lx:"hắn ngồi lại, càng ghét ngươi",rt:"Hắn dâng sớ xin lui vì có quan hệ thầy trò.",rf:"Hắn ngồi lại, mặt lạnh như sắt."},
  {n:"Để hắn ngồi, canh từng lời",wx:"biết trước hắn sẽ nói gì",lx:"một phần ba phiên xét nghiêng về bên kia",rt:"Ngươi cho người chép lại mọi lời hắn nói."}]},
 s2:{h:"Bên kia đòi xét",w:"v",if:RDW(0),t:"Sớ của ngươi chưa được chuẩn, thì phe {v} lại dâng sớ xin Tam ty xét: để chốt án cũ mãi mãi, và trị ngươi tội vu cáo. Hoàng thượng ban chỉ chuẩn. Phiên xét mở, nhưng ngươi ở thế bị đánh.",o:[
  {n:"Nhận lời xét, nhờ Ngự sử nộp hết chứng cứ",wx:"phiên xét của họ thành phiên xét của ngươi",lx:"chứng cứ lộ hết trước khi xét",rt:"Chứng cứ của ngươi được ghi vào hồ sơ phiên xét.",rf:"Bên kia chép được chứng cứ của ngươi trước phiên."},
  {n:"Xin Thái hậu nhắc Hoàng thượng xét cho công bằng",need:["th"],wx:"Hoàng thượng dặn quan xét giữ phép",lx:"Thái hậu không muốn dính",rt:"Thái hậu nói với Hoàng thượng một câu; hôm sau ngài dặn ba quan xét: xét cho công bằng.",rf:"Thái hậu bảo việc công đường không phải việc hậu cung."},
  {n:"Giữ chứng cứ đến phút cuối",wx:"bên kia không biết ngươi có gì",lx:"bị nói giấu giếm",rt:"Ngươi khóa tráp, giữ chìa trong người."}]},
 c1:{h:"Nhân chứng lên công đường",w:"maid",t:()=>`${rdEnd(6)==="lose"?"Lão quản gia được khiêng cáng lên công đường.":"Lão quản gia được gọi lên công đường."} Quan Đại Lý tự hỏi: một gia nô thì làm chứng cho chủ cũ được sao?`,o:[
  {n:"Nhờ lão quản gia nộp thêm lời khai của thư lại",wx:"hai lời khớp nhau",lx:"lời khai bị chê là cũ",rt:"Hai lời khai khớp từng giờ, từng người.",rf:"Quan Hình bộ bảo: “Người khai đã ở biên viễn, ai hỏi lại được?”"},
  {n:"Nhờ Ngự sử xin mời sư chùa Giang Nam làm chứng tờ cung khai",wx:"lời người tu hành có sức nặng",lx:"sư không đến kịp",rt:"Sư già chắp tay kể lại ngày lão Vương gửi tờ cung khai.",rf:"Sư bệnh giữa đường."},
  {n:"Để lão quản gia kể hết",wx:"lời thật làm cả công đường lặng",lx:"lão già lẫn, nói sai một chi tiết",rt:"Lão kể đến đêm người ta vào phủ, cả công đường không ai lên tiếng.",rf:"Lão nhầm năm, bên kia bắt bẻ."}]},
 c2:{h:"{foed} lên công đường",w:"emp",if:()=>rdEnd(tdPre())!=="win",t:"{foed} là Thượng thư, nay là người bị hỏi trong án, vậy mà hắn xin ngồi hàng quan mà tự biện, mặt không đổi sắc: “Ấn ấy do Binh bộ đóng. Lão phu chỉ chuyển sớ.”",o:[
  {n:"Nhờ Ngự sử xin đối chiếu sổ xuất ấn Binh bộ",wx:"lời {foed} vỡ",lx:"sổ bị chê là bản chép",rt:"Tên người ký nhận ấn là thư lại dưới quyền {foed}. Hắn im lặng.",rf:"Quan Hình bộ bảo: bản chép không đủ."},
  {n:"Nhờ Ngự sử xin gọi thợ khắc ấn ra đối chất",wx:"thợ khắc chỉ thẳng mặt hắn",lx:"thợ khắc sợ, đổi lời",rt:"Thợ Lý run run chỉ tay: “Chính người nhà đại nhân mang mẫu đến.”",rf:"Thợ Lý nói không nhớ."},
  {n:"Xin Hoàng thượng cho {foed} chỉ đứng hỏi như người bị cáo",wx:"hắn chỉ được hỏi như người bị cáo",lx:"ngài thấy ngươi bới lệ",rt:"Hoàng thượng phê: {foed} không được ngồi hàng quan, ra công đường chỉ để trả lời.",rf:"Hoàng thượng bảo: “Để hắn tự biện.”"}]},
 c3:{h:"Môn sinh nhà {foed} cãi thay",w:"emp",if:()=>rdEnd(tdPre())==="win",t:"{foed} đã đền tội, nhưng môn sinh của hắn đứng ra cãi: chứng cứ của ngươi do người nhà tội thần làm giả để báo thù, án lật năm trước là lật trong cơn giận.",o:[
  {n:"Nhờ Ngự sử nộp bản sớ gốc có son phê",if:()=>rdEnd(5)==="win",wx:"son phê tiên đế không ai dám chê",lx:"bị hỏi vì sao bản gốc ra khỏi kho",rt:"Bản gốc đặt giữa công đường. Môn sinh kia lùi một bước.",rf:"Bên kia hỏi ai mang bản gốc ra khỏi kho Nội các."},
  {n:"Nhờ Ngự sử xin gọi thợ khắc ấn lên công đường",wx:"thợ khắc nhận nét ấn là của mình",lx:"thợ khắc sợ, đổi lời",rt:"Thợ Lý nhận nét lệch là tay mình khắc theo mẫu người ta mang đến.",rf:"Thợ Lý nói không nhớ."},
  {n:"Để quan Hình bộ hỏi cho",wx:"ngươi không bị nói ép cung",lx:"bên kia có chỗ lách",rt:"Quan Hình bộ hỏi ba ngày liền."}]},
 t1:{h:"Đêm giữa hai phiên",w:"maid",t:"Giữa hai phiên xét, có kẻ khiêng một rương bạc vào nhà quan Đại Lý tự. Người của ngươi trông thấy.",o:[
  {n:"Cho người báo Ngự sử đài",wx:"kẻ đút lót bị bắt",lx:"Ngự sử đài làm lơ",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Kẻ khiêng rương bị bắt, khai là gia nhân nhà {v}.",rf:"Ngự sử đài bảo không có chứng."},
  {n:"Nhờ Ngự sử già nhắc khéo quan Đại Lý tự",wx:"ông trả rương bạc",lx:"bị nói ngươi cũng đi cửa sau",rt:"Sáng hôm sau, rương bạc bị khiêng trả về.",rf:"Quan Đại Lý tự đóng cửa không tiếp."},
  {n:"Ghi lại, giữ làm lá bài",wx:"nắm thóp một quan xét",lx:"phiên sau có thể đã nghiêng",rt:"Ngươi ghi ngày giờ, số người khiêng."}]},
 x1:{h:"Phiên xét cuối",w:"emp",t:"Phiên cuối. Ba quan xét án sẽ ký tên vào bản tâu. Một chữ của họ sẽ quyết án nhà ngươi trước khi đến tay Hoàng thượng.",o:[
  {n:"Xin cho lão quản gia đọc lời khai thay",e:["win","lose"],rt:"Lão quản gia đọc lời khai của ngươi giữa công đường: tiên đế bị người che mắt. Ba quan xét cùng ký: án oan.",rf:"Quan Hình bộ bác: lời khai từ hậu cung không đọc ở công đường, gia nô cũng không được đọc thay."},
  {n:"Để chứng cứ tự nói",e:["mid","lose"],rt:"Hai quan ký án oan, một quan ghi còn ngờ.",rf:"Bản tâu ghi: chứng cứ chưa đủ để lật."},
  {n:"Xin Hoàng thượng hoãn phiên xét",e:"mid",lx:"bên kia có thêm thời gian",rt:"Phiên xét hoãn một tháng, bản tâu ghi hai ý."}]}},
 E:{win:{tag:"Tam ty tâu án oan",w:"emp",t:"Ba quan xét án cùng ký: án nhà ngươi là án oan. Bản tâu đã lên ngự án.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Tam ty chia lời",t:"Bản tâu không đồng lòng. Hoàng thượng sẽ phải tự quyết."},
  lose:{tag:"Tam ty giữ án cũ",t:"Tam ty tâu: chứng cứ chưa đủ để lật án tiên đế. Phe kia mở tiệc."}}});

rdDef("td_an",11,{t:"Án cũ sáng tỏ",w:"emp",sj:"án nhà ngươi",cast(A){return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Bản tâu của Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự, đã ở trên ngự án. Lật hay giữ, phán là việc của Hoàng thượng. Hoàng thượng sẽ phán lần cuối. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Trước ngày phán",w:"emp",if:RDW(1),t:"Hoàng thượng cho gọi ngươi đến trước khi phán. Ngài hỏi: “Nếu trẫm phán án oan, nàng còn muốn gì nữa?”",o:[
  {n:"Xin phục tước cho nhà",f:"title",wx:"ngài ghi nhớ",lx:"ngài thấy ngươi đòi nhiều",rt:"Hoàng thượng gật đầu, không hứa, cũng không từ.",rf:"Hoàng thượng cau mày: “Nàng đòi nhiều quá.”"},
  {n:"Xin dời mộ cha về quê",wx:"ngài cảm động",lx:"không xin được gì cho người sống",rt:"Hoàng thượng lặng đi rồi nói: “Trẫm chuẩn.”"},
  {n:"Không xin gì",wx:"ngài thấy ngươi không vì lợi",lx:"bỏ lỡ dịp",rt:"Hoàng thượng nhìn ngươi lâu hơn thường lệ."}]},
 s2:{h:"Ngự án còn lưỡng lự",w:"emp",if:RDW(0),t:"Bản tâu không làm ngài yên lòng. Hoàng thượng ba ngày không phê, cũng không ghé cung ngươi.",o:[
  {n:"Sai người dâng canh, không nhắc án",wx:"ngài nhớ đến ngươi",lx:"canh bị trả về",rt:"Hoàng thượng cho gọi ngươi đến.",rf:"Canh nguội ngoài cửa điện."},
  {n:"Xin Thái hậu nói một lời",need:["th"],wx:"Thái hậu nhắc ngài",lx:"Thái hậu không muốn dính",rt:"Thái hậu nói với Hoàng thượng: “Án oan thì đừng để lâu.”",rf:"Thái hậu bảo ngươi tự lo."},
  {n:"Chép kinh cầu siêu cho cha",wx:"lòng yên",lx:"không ai nói giúp",rt:"Ngươi chép xong một bộ kinh, mực hòa nước mắt."}]},
 c1:{h:"Người nhà còn sống",w:"maid",t:"Lão quản gia kể: còn mấy người họ hàng nhà ngươi bị sung làm nô ở biên ải. Nếu án được giải, họ được tha, nếu xin kịp.",o:[
  {n:"Lập danh sách xin tha",wx:"không ai bị bỏ quên",lx:"danh sách thiếu tên",rt:"Danh sách mười một người được dâng kèm.",rf:"Danh sách thiếu ba người đã đổi tên."},
  {n:"Gửi bạc ra biên lo trước",wx:"họ bớt khổ ngay",lx:"tốn bạc, dễ bị dò",rt:"Bạc đến biên ải trước mùa đông."},
  {n:"Đợi án xong mới lo",wx:"không lộ ý",lx:"có người không chờ được",rt:"Ngươi giữ danh sách trong tráp."}]},
 c2:{h:"{foe} trong lãnh cung",w:"foe",if:()=>rivals.some(x=>x.enemy&&x.alive&&x.out),t:"Từ lãnh cung, {foe} nhờ người gửi lời: nàng biết ngày phán đã gần, xin được gặp ngươi một lần.",o:[
  {n:"Đến gặp",wx:"khép lại một mối",lx:"bị nói ngươi đến hả hê",go:(_A,_ok,G)=>{const e=rivals.find(x=>x.enemy&&x.alive);if(e)relAdd(S,e,G[0])},rt:"{foe} nắm tay ngươi: “Cha ta sai. Ta biết từ lâu rồi.”"},
  {n:"Gửi than và áo ấm đến",wx:"giữ được lòng người",lx:"phe kia nói ngươi giả nhân",rt:"Than và áo ấm đến lãnh cung trước trận rét đầu mùa."},
  {n:"Không đến",wx:"không mềm lòng",lx:"bị nói ngươi lạnh",rt:"Ngươi để người đưa tin đứng chờ ngoài cửa."}]},
 c3:{h:"{foe} cầu xin",w:"foe",if:()=>!!foe67(),t:"{foe} quỳ ngoài cửa cung ngươi từ sáng: “Cha ta có tội. Xin để mẹ và em ta sống.”",o:[
  {n:"Hứa không đòi máu đàn bà trẻ nhỏ",wx:"cả cung nể ngươi",lx:"phe kia bớt sợ",go:(_A,_ok,G)=>{const e=foe67();if(e)relAdd(S,e,G[0])},rt:"{foe} lạy ba lạy rồi đứng dậy."},
  {n:"Bảo nàng đứng dậy, không hứa gì",wx:"giữ tay rảnh",lx:"{foe} oán",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} đứng dậy, mắt khô."},
  {n:"Đòi nàng làm chứng chống cha",f:"turn",wx:"có lời con gái kẻ vu cáo",lx:"bị nói ác",go:(A,ok,G)=>{const e=foe67();if(e)oanAdd(e,S,ok?G[0]:G[1])},rt:"{foe} nhắm mắt gật đầu.",rf:"{foe} hét lên rồi bỏ chạy."}]},
 t1:{h:"Câu hỏi cuối",w:"emp",t:"Hoàng thượng hỏi: “Án được giải thì tiên đế mang tiếng xét lầm. Nàng muốn trẫm viết thế nào?”",o:[
  {n:"Viết: tiên đế bị kẻ gian lừa",f:"pious",wx:"giữ thể diện cho tiên đế",lx:"tội đổ hết lên một nhà",rt:"Hoàng thượng gật đầu: “Phải.”"},
  {n:"Viết: án sai thì sửa",wx:"thẳng thắn",lx:"ngài phật ý",rt:"Hoàng thượng cười: “Nàng gan lắm.”",rf:"Hoàng thượng lặng đi."},
  {n:"Xin ngài tự viết",wx:"ngài thấy ngươi biết phận",lx:"chữ viết không theo ý ngươi",rt:"Ngươi cúi đầu."}]},
 x1:{h:"Chiếu phán",w:"emp",t:"Hoàng thượng cầm bút son. Ngài nhìn ngươi lần cuối trước khi phán.",o:[
  {n:"Xin rửa oan và trị tội kẻ vu cáo",e:["win","lose"],rt:"Chiếu phán: nhà ngươi vô tội, kẻ vu cáo đền tội.",rf:"Hoàng thượng đặt bút xuống: “Chuyện cũ, để yên.”"},
  {n:"Chỉ xin rửa oan",e:["mid","lose"],rt:"Chiếu phán: nhà ngươi vô tội. Không nhắc đến ai khác.",rf:"Hoàng thượng gác chiếu."},
  {n:"Xin ngài tự phán",e:["mid","lose"],rt:"Hoàng thượng mở ân: án oan được giải, chuyện cũ khép lại.",rf:"Hoàng thượng phán: giữ nguyên, chuyện cũ khép lại."}]}},
 E:{win:{tag:"Nhà ngươi rạng danh",w:"emp",t:()=>rdEnd(tdPre())==="win"?"Chiếu phán nhà ngươi vô tội, được truy phục quan tước, đất mộ được trả. Tên {foed} bị ghi vào sổ gian thần, môn sinh của hắn bị bãi khỏi triều. Người nhà còn sống được tha về.":"Chiếu phán nhà ngươi vô tội, được truy phục quan tước, đất mộ được trả. {foed} bị cách chức, tịch biên, đày ra biên ải. Người nhà còn sống được tha về.",go:(_A,G)=>{const e=foe67();if(e){oanAdd(e,S,G[0]);return e67pun(e,G[1])}return""}},
  mid:{tag:"Rửa oan, không trị tội",t:()=>rdEnd(tdPre())==="win"?"Nhà ngươi được rửa oan theo phép. Tên {foed} không bị ghi vào sổ gian thần, môn sinh của hắn vẫn ngồi khắp triều. Ngươi nhẹ lòng, nhưng biết có người vẫn ung dung.":"Nhà ngươi được rửa oan. Kẻ vu cáo không bị nhắc tên, vì triều đình cần yên. "+(rdEnd(tdPre())==="r97"?"{foed} vẫn ngồi ngục chờ xét, không ai nhắc thêm tội vu cáo.":"{foed} vẫn lên triều mỗi sáng.")+" Ngươi nhẹ lòng, nhưng biết có người vẫn ung dung."},
  lose:{tag:"Án không lật được",t:()=>rdEnd(tdPre())==="win"?(rdEnd(10)==="win"?"Tam ty đã tâu án oan, nhưng Hoàng thượng gác bản tâu, không phê":"Tam ty không định án")+"; lệnh lật án năm nào chỉ còn là lời phán trong cơn giận. Nhà ngươi không bị khép tội lại, nhưng cũng không được phục tước, và người đời vẫn gọi ngươi là con gái tội thần. Ngươi vẫn là phi tần của Hoàng thượng, vẫn sống, vẫn thắp hương cho cha mỗi năm.":"Án nhà ngươi vẫn ghi trong sổ. Ngươi vẫn là phi tần của Hoàng thượng, vẫn sống, vẫn thắp hương cho cha mỗi năm, chỉ không được khóc trước mặt người.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});
RD97L.push(rdRare({a:"td_an_11",tag:"Ngự bút phục tước, biển Trung hiếu",w:"emp",n:"Xin Hoàng thượng phục tước cho nhà ngươi",
 path:["Mang bản gốc ra","Bắt sống kẻ đến","Xin tra cung để rửa tiếng","Cho người chặn xe","Xin Tam ty xét lại","đọc lời khai thay","Xin phục tước cho nhà"],bad:["Nhận đổi","Hứa rồi không giữ","Đòi nàng làm chứng chống cha"],x:[()=>S.duc>=RR("td_an_11").bar,"Đức từ "+RR("td_an_11").bar],
 t:"Hoàng thượng phê phục tước cho nhà ngươi, rồi tự tay viết bốn chữ «Trung hiếu lưỡng toàn», sai treo trước từ đường. Ngày rước biển, người trong kinh đứng kín hai bên đường, và không ai còn gọi ngươi là con gái tội thần.",
 rw:"bienngu",ti:"Con gái nhà trung hiếu"}));
/* ---------- td_ke · Kẻ đứng sau màn ---------- */
/* BAL.road.td_ke = {}  (no chapter-level constants)
   .4 endings: win «Trừ tận gốc» = {n1} (the mastermind: a title picked in ARC67.td_ke.cast) dismissed pending inquiry, S.avenged;
   mid «Báo thù một nửa» = the knife {foed} fell, {n1} untouched; lose «Sớ bị bác» = nobody fell, {n1} alerted.
   {n1} is only a title (A.n1), not a person record, so it is kept for the road in S.st.f14.n1 (the wrapper below stores the .4 pick;
   every chapter's cast reads it back, with a fallback pick for lives that started before this file). {v} = a live consort of {n1}'s
   clan (never the foe); {foe}/{foed} stay the real enemy pair (OD:L1247); beats that need {foe} active are guarded with foe67(). */
(function(){const a=ARC67.td_ke;if(!a||!a.cast||a.cast.rdKeep)return;const c0=a.cast;
 a.cast=function(A){const r=c0.apply(this,arguments);try{if(S.st&&S.st.f14)S.st.f14.n1=A.n1}catch(e){}return r};a.cast.rdKeep=1})();
rdDef("td_ke",5,{t:"Lần theo bạc",w:"maid",sj:"đường bạc nuôi án cũ",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Năm ấy {foed} không đủ bạc để mua thợ giả ấn, mua người làm chứng. Bạc ấy từ đâu ra, qua tay ai, thì {n1} đứng ở cuối đường. Lần theo trước khi sổ sách bị đốt.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"{n1} chờ tra xét",w:"emp",if:RDW(1),t:()=>rdPrev()==="r97"?"{n1} bị tước hết chức tước, giam chờ định tội. Người của hắn chạy khắp kinh, đốt sổ, đổi tên. Hết ba tháng tra xét mà không có chứng, tội hắn sẽ được xét nhẹ.":"{n1} bị cách chức chờ tra xét, nhưng chưa có án. Người của hắn chạy khắp kinh, đốt sổ, đổi tên. Hết ba tháng tra xét mà không có chứng, hắn sẽ được phục chức.",o:[
  {n:"Xin giữ sổ sách phủ hắn",wx:"sổ phủ hắn bị niêm",lx:"Hoàng thượng thấy ngươi nóng vội",rt:"Hoàng thượng sai niêm kho sổ phủ {n1}.",rf:"Hoàng thượng bảo: “Việc tra xét, nàng đừng lo.”"},
  {n:"Cho người canh lò đốt nhà hắn",f:"ash",wx:"cứu được mấy trang chưa cháy",lx:"người canh bị bắt gặp",rt:"Người của ngươi nhặt được một xấp giấy cháy dở.",rf:"Người canh bị gia đinh phủ hắn đánh đuổi."},
  {n:"Để người tra xét tự làm",wx:"ngươi không bị nói xen việc triều",lx:"người tra xét có thể đã bị mua, tai mắt của ngươi lơi đi",rt:"Ngươi chỉ hỏi han qua lời đồn."}]},
 s2:{h:"{n1} vẫn ngồi chỗ cũ",w:"maid",if:RDW(0),t:"{n1} vẫn lên triều mỗi sáng, gặp ngươi ở yến cung vẫn chào bằng nụ cười. Hắn biết ngươi đã thử, và đã hụt một nước.",o:[
  {n:"Rút vào bóng tối",wx:"hắn tưởng ngươi đã thôi",lx:"chậm thêm một mùa, người ta tưởng ngươi đã gục",rt:"Ngươi chỉ thêu thùa, chép kinh."},
  {n:"Tìm người từng giữ sổ cho {foed}",f:"ash",wx:"có một đầu mối",lx:"người ấy đã đổi chủ",rt:"Người giữ sổ cũ nay bán trà ở cửa Tây.",rf:"Người ấy đã vào phủ {n1} làm việc."},
  {n:"Nhờ Ngự sử năm xưa dò tiếp",wx:"có người ngoài triều cùng dò",lx:"Ngự sử bị để ý",rt:"Ngự sử nhận lời.",rf:"Ngự sử bị điều sang việc khác."}]},
 c1:{h:"Tiền trang ngoài cửa Tây",w:"maid",t:"Mấy năm trước án, một tiền trang ngoài cửa Tây đổi cho {foed} một vạn lượng ngân phiếu. Ông chủ tiền trang vẫn sống, sổ vẫn còn.",o:[
  {n:"Mua trang sổ năm ấy",f:"ledger",wx:"có giấy trắng mực đen",lx:"ông chủ bán cả hai đầu",rt:"Trang sổ năm ấy nằm trong tay ngươi.",rf:"Ông chủ bán tin ngươi mua sổ cho phủ {n1}."},
  {n:"Dọa ông chủ bằng luật tiền trang",f:"ledger",wx:"ông chủ sợ, đưa sổ",lx:"ông chủ báo {n1}",rt:"Ông chủ run tay xé trang sổ đưa ra.",rf:"Ông chủ đóng cửa tiệm, chạy sang phủ {n1}."},
  {n:"Chỉ ghi số hiệu ngân phiếu",wx:"có số hiệu để đối chiếu",lx:"có số mà không có sổ thì chưa đủ",rt:"Người của ngươi nhớ thuộc từng số hiệu."}]},
 c2:{h:"Thái giám Nội vụ phủ",w:"eun",t:"Một phần bạc năm ấy đi qua Nội vụ phủ: tiền mua đồ cống bị khai khống. Người ký là một thái giám nay đã lên làm thủ lĩnh.",o:[
  {n:"Nhờ {eun} tra sổ Nội vụ phủ",wx:"có sổ đối chiếu",lx:"{eun} từ chối, chuyện ngươi dò sổ lọt ra",rt:"{eun} cho người chép lại mấy trang.",rf:"{eun} bảo sổ năm ấy đã mục."},
  {n:"Mua chuộc hắn",wx:"hắn khai ra người nhận bạc",lx:"hắn nhận bạc rồi báo chủ",rt:"Hắn khai: bạc đi về phủ {n1}.",rf:"Hắn nhận bạc rồi im lặng."},
  {n:"Để yên, ghi tên hắn",wx:"hắn không biết bị để ý",lx:"chưa có gì trong tay, mất công dò",rt:"Ngươi ghi tên hắn vào sổ riêng."}]},
 c3:{h:"{v} hỏi han",w:"v",need:["v"],t:"{v}, nhà nàng nương bóng {n1}, bỗng thân với ngươi, hỏi dạo này ngươi hay sai người ra cửa Tây làm gì.",o:[
  {n:"Kể chuyện mua phấn son",wx:"nàng tin",lx:"nàng không tin",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} cười, hỏi xin một hộp phấn.",rf:"{v} nhìn ngươi lâu hơn thường lệ."},
  {n:"Hỏi lại nàng về {n1}",wx:"nàng buột lời",lx:"nàng biết ngươi nhắm vào ai",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} buột miệng: {n1} có một tiền trang riêng.",rf:"{v} đổi sắc mặt."},
  {n:"Lạnh nhạt cho nàng thôi hỏi",wx:"nàng thôi dò",lx:"nàng báo về nhà, cả cung bảo ngươi kiêu",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} không đến nữa."}]},
 t1:{h:"Ngân phiếu mang dấu",w:"maid",t:"Một tờ ngân phiếu năm ấy còn sót lại: mặt sau có dấu triện riêng của phủ {n1}.",o:[
  {n:"Giữ tờ ngân phiếu",f:"ledger",wx:"chứng cứ chạm đến hắn",lx:"giữ là giữ lửa, phải dồn người canh",rt:"Tờ ngân phiếu nằm dưới đáy tráp."},
  {n:"Nhờ người đối chiếu triện",wx:"triện là thật",lx:"người đối chiếu sợ, bỏ",rt:"Người thợ khắc triện xác nhận: đúng triện phủ {n1}.",rf:"Người thợ khắc trả lại, không dám nói."},
  {n:"Giao cho Ngự sử giữ",wx:"chứng cứ không nằm trong cung ngươi",lx:"Ngự sử làm thất lạc",rt:"Ngự sử cất ngân phiếu ở nhà thờ họ.",rf:"Ngự sử báo ngân phiếu bị lấy mất."}]},
 x1:{h:"Lò đốt sổ",w:"maid",t:"Tin đến: đêm nay người của {n1} sẽ đốt sổ tiền trang. Người của ngươi ở gần, nhưng chỉ đủ cho một việc.",o:[
  {n:"Cướp sổ khỏi lò",e:["win","lose"],rt:"Sổ còn nguyên, chỉ cháy sém một góc.",rf:"Người của ngươi bị đánh đuổi, sổ thành tro."},
  {n:"Bắt kẻ đốt sổ",e:["mid","lose"],rt:"Kẻ đốt sổ bị bắt, khai là gia nhân phủ {n1}.",rf:"Kẻ đốt sổ trốn thoát."},
  {n:"Để cháy, giữ những gì đã có",e:"mid",lx:"mất sổ gốc",rt:"Ngươi nhìn khói bốc lên ở phía cửa Tây."}]}},
 E:{win:{tag:"Sổ bạc trong tay",w:"maid",t:"Đường bạc từ phủ {n1} đến tay {foed} nay có giấy trắng mực đen. Mối dây đầu tiên đã nắm."},
  mid:{tag:"Có manh mối, thiếu sổ",t:"Ngươi biết bạc đã đi đường nào, nhưng sổ gốc thì không còn."},
  lose:{tag:"Sổ thành tro",t:"Sổ tiền trang đã cháy. {n1} biết có người lần theo bạc.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_ke",6,{t:"Con dao còn sống",w:"maid",sj:"số phận của {foed}",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"{foed}, con dao năm xưa, là người duy nhất còn sống nói được ai đã trao dao cho hắn. {n1} cũng biết điều đó. Giữ mạng kẻ đã hại nhà ngươi, hay để hắn chết cùng bí mật.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"{n1} muốn bịt miệng",w:"maid",if:RDW(1),t:"Tai mắt báo: người của {n1} đã mua thuốc độc ở chợ Đông. {foed} không biết mình là con dao sắp bị bẻ.",o:[
  {n:"Báo cho {foed} biết",f:"warn",wx:"hắn mang ơn kẻ thù",lx:"hắn tưởng là bẫy",rt:"{foed} đóng cửa phủ, đổi hết người nấu bếp.",rf:"{foed} đuổi người đưa tin của ngươi."},
  {n:"Chặn kẻ mang thuốc",wx:"bắt được tay sai {n1}",lx:"kẻ mang thuốc thoát",rt:"Kẻ mang thuốc bị bắt giữa chợ.",rf:"Kẻ mang thuốc lẩn vào đám đông."},
  {n:"Để mặc",wx:"tay không dính",lx:"thấy người sắp chết mà đứng nhìn",rt:"Ngươi không làm gì."}]},
 s2:{h:"Phong thư không ký tên",w:"maid",if:RDW(0),t:"Một phong thư không ký tên lọt vào cung ngươi, nét chữ của {foed}: hắn biết mình sắp bị bỏ, hắn muốn đổi lời khai lấy mạng cả nhà.",o:[
  {n:"Hồi thư: nhận đổi",f:"warn",wx:"có lời hứa của con dao",lx:"thư bị chặn",rt:"Thư hồi âm đến tay {foed}.",rf:"Thư hồi âm rơi vào tay người lạ."},
  {n:"Đốt thư",wx:"không dính vào kẻ thù",lx:"bỏ lỡ người làm chứng",rt:"Tro thư bay qua song cửa."},
  {n:"Đưa thư cho Ngự sử",wx:"thư thành chứng cứ",lx:"Ngự sử nghi là bẫy",rt:"Ngự sử cất thư làm chứng.",rf:"Ngự sử trả thư lại."}]},
 c1:{h:"{foe} cầu ngươi",w:"foe",if:()=>!!foe67(),t:"{foe} tìm gặp ngươi, mắt sưng: “Có người muốn giết cha ta để lấp miệng. Ngươi muốn ông chết, ta biết. Nhưng ông chết thì ngươi mất người làm chứng.”",o:[
  {n:"Hứa giữ mạng cha nàng",f:"turn",wx:"{foe} theo ngươi",lx:"nàng không tin",go:(A,ok,G)=>{const e=foe67();if(e){if(ok)relAdd(S,e,G[0]);else oanAdd(e,S,G[1])}},rt:"{foe} cúi đầu thật thấp.",rf:"{foe} cười lạnh: “Lời của con gái tội thần.”"},
  {n:"Đòi nàng đưa cha ra làm chứng",f:"turn",wx:"điều kiện rõ ràng",lx:"{foe} thấy ngươi lạnh",go:(A,ok,G)=>{const e=foe67();if(e&&!ok)oanAdd(e,S,G[0])},rt:"{foe} nghiến răng gật đầu.",rf:"{foe} bỏ đi."},
  {n:"Từ chối",wx:"giữ trọn mối thù",lx:"mất một nhân chứng, {foe} oán",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} đứng lặng rồi lui ra."}]},
 c2:{h:"Chỗ giấu người",w:"maid",t:"Muốn giữ con dao sống phải có chỗ giấu: trang trại ngoại thành của một người quen cũ, hay chùa Hộ Quốc.",o:[
  {n:"Trang trại ngoại thành",f:"hide",wx:"kín, xa cung",lx:"tốn bạc, xa thì khó canh",rt:"{foed} được đưa đi trong một xe chở rơm."},
  {n:"Chùa Hộ Quốc",f:"hide",wx:"cửa chùa không ai dám lục",lx:"sư trụ trì không chịu",rt:"{foed} khoác áo nâu, quét lá ở sân sau chùa.",rf:"Sư trụ trì từ chối."},
  {n:"Không giấu, để hắn tự lo",wx:"không chứa chấp kẻ thù",lx:"hắn dễ chết, mất dấu hắn",rt:"{foed} tự tìm chỗ trốn."}]},
 c3:{h:"{v} biết chuyện",w:"v",need:["v"],t:"{v} nhắn: “Tỷ tỷ đang nuôi con rắn đã cắn nhà tỷ. Không sợ nó cắn lần nữa sao?” Nàng đang dò xem {foed} ở đâu.",o:[
  {n:"Đánh lạc hướng {v}",wx:"nàng báo nhầm chỗ cho {n1}",lx:"nàng không tin",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Người của {n1} lùng sục một ngôi miếu bỏ hoang.",rf:"{v} cười: “Tỷ giấu vụng lắm.”"},
  {n:"Cấm cung nữ qua lại cung {v}",wx:"đường rò bị chặn",lx:"{v} biết có chuyện",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cửa ngách sang cung {v} bị khóa."},
  {n:"Tặng {v} lễ, mua sự im lặng",wx:"nàng tạm im",lx:"nàng nhận rồi vẫn báo",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận lễ, không nhắc nữa.",rf:"{v} nhận lễ, rồi báo với {n1}."}]},
 t1:{h:"Lời khai đầu tiên",w:"maid",t:"{foed} chịu nói một nửa: năm ấy hắn chỉ chuyển sớ, ấn giả do người của {n1} mang đến. Nửa kia, hắn đòi ngươi hứa trước.",o:[
  {n:"Hứa sẽ xin Hoàng thượng khoan cho cả nhà hắn",wx:"có trọn lời khai",lx:"hứa xin ân cho kẻ hại nhà mình, lời ấy sẽ bị đòi ở chương cuối",go:()=>{RD_FL("td_ke.deal",1)},rt:"{foed} kể hết, đến cả tên người mang ấn."},
  {n:"Hứa chỉ xin khoan cho con gái hắn",wx:"lời hứa vừa phải",lx:"hắn chỉ nói thêm một ít",rt:"{foed} gật đầu, nói thêm nửa chuyện.",rf:"{foed} im lặng."},
  {n:"Không hứa, ép hắn",wx:"không nợ kẻ thù",lx:"hắn câm",rt:"{foed} sợ, khai thêm.",rf:"{foed} ngậm miệng."}]},
 x1:{h:"Đêm sát thủ",w:"maid",t:"Nửa đêm, kẻ của {n1} tìm đến chỗ giấu {foed}. Người của ngươi ở đó.",o:[
  {n:"Bắt sống sát thủ",e:["win","lose"],rt:"Sát thủ bị bắt sống. {foed} sống, và giờ hắn biết ai muốn hắn chết.",rf:"Sát thủ thoát; {foed} bị thương nặng."},
  {n:"Đưa {foed} chạy",e:["mid","lose"],rt:"{foed} sống, kẻ đến về tay không.",rf:"{foed} ngã ngựa giữa đường."},
  {n:"Để hắn tự lo",e:"mid",lx:"mất dấu con dao",rt:"{foed} tự trốn được, không ai biết hắn ở đâu."}]}},
 E:{win:{tag:"Con dao quay mũi",w:"maid",t:"{foed} sống, và hắn đã biết {n1} muốn bịt miệng mình. Con dao năm xưa nay quay mũi về phía người cầm."},
  mid:{tag:"Con dao còn sống",t:"{foed} còn sống, nhưng chưa chịu nói hết. Hắn sợ cả ngươi lẫn {n1}."},
  lose:{tag:"Con dao gãy",t:"{foed} bị thương nặng, không nói được nữa. {n1} thở phào.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_ke",7,{t:"Bị phát hiện",w:"eun",sj:"tai mắt của {n1} trong cung ngươi",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"{n1} đã biết ngươi là người lần theo hắn. Hắn không ra tay ngoài sáng: hắn mua người trong cung ngươi, cài thị vệ canh cửa, và chờ ngươi sơ suất một lần.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Sát thủ khai",w:"maid",if:RDW(1),t:"Sát thủ bị bắt khai: lệnh đến từ phủ {n1}, qua một thái giám trong cung. Thái giám ấy làm việc ngay trong cung ngươi.",o:[
  {n:"Âm thầm đổi việc hắn",wx:"hắn không biết bị lộ",lx:"hắn còn ở gần",rt:"Hắn được sai ra coi vườn."},
  {n:"Bắt hắn tra hỏi",wx:"hắn khai ra đường tin",lx:"hắn cắn lưỡi, cả cung hoảng",rt:"Hắn khai đường tin đi qua Nội vụ phủ.",rf:"Hắn không khai, cả cung xôn xao."},
  {n:"Dùng hắn đưa tin giả",f:"double",wx:"đường tin của {n1} thành đường của ngươi",lx:"hắn đánh hơi",rt:"Tin giả đi đúng đường, {n1} tin.",rf:"Hắn đánh hơi, xin đổi việc."}]},
 s2:{h:"Cung ngươi có kẻ lạ",w:"maid",if:RDW(0),t:"{maid} thấy hộp trang sức của ngươi bị mở rồi đóng lại, không mất gì. Có người đang tìm thứ ngươi giấu.",o:[
  {n:"Dời chứng cứ ra ngoài cung",wx:"chứng cứ không còn trong cung",lx:"tốn bạc, xa tay",rt:"Chứng cứ được gửi về nhà một người quen."},
  {n:"Đặt bẫy bắt kẻ lục đồ",f:"double",wx:"bắt được kẻ lục đồ",lx:"kẻ ấy không quay lại",rt:"Kẻ lục đồ là một tiểu thái giám mới đến.",rf:"Không ai mắc bẫy."},
  {n:"Giả như không biết",wx:"kẻ kia chủ quan",lx:"chứng cứ vẫn nằm chỗ cũ",rt:"Ngươi để hộp trang sức y như cũ."}]},
 c1:{h:"Thị vệ canh cửa mới",w:"maid",t:"Một thị vệ mới được điều đến canh cửa cung ngươi. Hắn ghi chép mọi người ra vào.",o:[
  {n:"Xin điều hắn đi",wx:"cửa cung sạch",lx:"bị hỏi vì sao sợ một thị vệ",rt:"Thị vệ bị điều sang cổng khác.",rf:"Hoàng thượng hỏi: “Nàng sợ gì?”"},
  {n:"Mua hắn",wx:"hắn cho ngươi xem sổ ghi",lx:"hắn báo cả hai bên",rt:"Thị vệ đưa ngươi xem sổ trước khi nộp.",rf:"Thị vệ nhận bạc rồi ghi cả việc ấy vào sổ."},
  {n:"Cho hắn thấy những gì vô hại",wx:"{n1} đọc một cuốn sổ vô hại",lx:"hắn thấy một người lạ",rt:"Sổ của thị vệ chỉ toàn chuyện trà bánh.",rf:"Thị vệ ghi được tên người đưa tin của ngươi."}]},
 c2:{h:"Lời cảnh cáo",w:"maid",t:"Một chiếc hộp gửi vào cung ngươi: trong là một lọn tóc cột chỉ đỏ, tóc của {maid}.",o:[
  {n:"Đưa {maid} ra khỏi kinh một thời gian",wx:"{maid} an toàn",lx:"tốn bạc, mất người tin cậy bên cạnh",rt:"{maid} về quê thăm mẹ một mùa."},
  {n:"Trình hộp lên Thái hậu",need:["th"],wx:"Thái hậu biết có kẻ uy hiếp ngươi",lx:"Thái hậu bảo đừng làm lớn",rt:"Thái hậu nheo mắt, ghi nhớ tên {n1}.",rf:"Thái hậu bảo: “Chuyện nhỏ.”"},
  {n:"Tăng người canh {maid}",wx:"{maid} có người canh",lx:"{maid} sợ hãi, làm việc rụt rè",rt:"Hai thái giám theo {maid} như bóng."}]},
 c3:{h:"{v} làm tai mắt",w:"v",need:["v"],t:"{v} ghé cung ngươi thường hơn, mỗi lần ngồi lâu hơn, mắt đảo khắp nơi.",o:[
  {n:"Tiếp nàng ở sảnh ngoài",wx:"nàng không vào được bên trong",lx:"bị nói tiếp khách lạnh nhạt",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} ngồi sảnh ngoài, uống hết một chén trà rồi về."},
  {n:"Cho nàng thấy một tráp giả",f:"double",wx:"{n1} nhận tin sai",lx:"nàng không mắc",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} liếc thấy tráp, mắt sáng lên.",rf:"{v} không nhìn tráp lấy một lần."},
  {n:"Hỏi thẳng nàng",wx:"nàng xấu hổ thôi đến",lx:"nàng tâu ngươi vô lễ",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} đỏ mặt, cáo lui.",rf:"{v} tâu Hoàng thượng ngươi xua đuổi nàng."}]},
 t1:{h:"Hoàng thượng nghe đồn",w:"emp",need:["nsrv"],t:"Hoàng thượng nghe ai đó tâu: cung ngươi đang giấu người có tội. Ngài hỏi ngươi, giọng chưa giận.",o:[
  {n:"Kể hết với ngài",f:"emp",wx:"ngài đứng về phía ngươi",lx:"ngài giận vì ngươi giấu lâu",rt:"Hoàng thượng nghe hết, đặt tay lên vai ngươi.",rf:"Hoàng thượng đứng dậy bỏ đi."},
  {n:"Chối khéo",wx:"ngài cho qua",lx:"ngài nhớ lời chối",rt:"Hoàng thượng cười, đổi chuyện.",rf:"Hoàng thượng nhìn ngươi rất lâu."},
  {n:"Xin ngài cho thêm thời gian",wx:"ngài thấy ngươi thật",lx:"ngài chờ, và ngài nhớ",rt:"Hoàng thượng gật đầu: “Trẫm chờ.”"}]},
 x1:{h:"Một đêm lục soát",w:"eun",t:"Có lệnh lục soát cung ngươi, ký bởi người của {n1} ở Nội vụ phủ, lấy cớ mất đồ cống. Người lục soát đã đến cổng.",o:[
  {n:"Đứng chặn ở cổng, đòi xem lệnh",e:["win","lose"],rt:"Lệnh không có dấu Tổng quản. Người lục soát phải lui, người ký lệnh bị hỏi tội.",rf:"Lệnh đúng phép. Cung ngươi bị lục, một tráp thư bị mang đi."},
  {n:"Để họ lục, chứng cứ đã dời",e:["mid","lose"],rt:"Họ lục cả đêm, không thấy gì.",rf:"Họ tìm thấy chỗ giấu cũ, còn sót một trang."},
  {n:"Mời {eun} đến làm chứng",e:"mid",lx:"lễ tạ Tổng quản không nhẹ",rt:"{eun} đến, cuộc lục soát thành ra lấy lệ."}]}},
 E:{win:{tag:"Tai mắt bị nhổ",w:"maid",t:"Kẻ ký lệnh lục soát bị phạt, tai mắt của {n1} trong cung ngươi bị nhổ sạch. Hắn mất một bàn tay trong cung.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Giữ được chứng cứ",t:"Cung ngươi bị lục mà không mất gì. Nhưng {n1} đã biết ngươi có thứ để giấu."},
  lose:{tag:"Mất một trang chứng cứ",t:"Một trang chứng cứ rơi vào tay {n1}. Hắn biết ngươi đã đi đến đâu."}}});

rdDef("td_ke",8,{t:"Đồng minh bất ngờ",w:"maid",sj:"những người khác {n1} từng hại",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Một người như {n1} không chỉ hại một nhà. Còn những người khác cũng mang thù với hắn, có người ngươi không ngờ tới. Kéo họ về, mà đừng để họ dùng ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Trịnh phu nhân",w:"maid",if:RDW(1),t:()=>`Tin tai mắt của {n1} bị nhổ lan ra ngoài. Một bà góa họ Trịnh ${TDVAO()}, rồi xin ghé cung ngươi trên đường về: chồng bà là một Thị lang bị {n1} hại chết mười năm trước.`,o:[
  {n:"Tiếp bà, nghe hết",f:"widow",wx:"có thêm một nhà cùng thù",lx:"bà kể dài, cả cung nghe tiếng",rt:"Trịnh phu nhân khóc suốt một buổi chiều."},
  {n:"Nhận sổ sách bà giữ",f:"widow",wx:"có thêm chứng cứ cũ",lx:"sổ đã mục",rt:"Sổ sách của Thị lang họ Trịnh có tên {n1} ở ba trang.",rf:"Sổ mục nát, chữ nhòe hết."},
  {n:"Khéo từ chối",wx:"không mang thêm gánh",lx:"bà về tay trắng, người ta nói ngươi lạnh",rt:"Trịnh phu nhân lui ra, lưng còng hơn lúc vào."}]},
 s2:{h:"Một mình không đủ",w:"maid",if:RDW(0),t:"Ngươi đếm lại: có chứng cứ, nhưng không có tiếng nói ngoài triều. Một mình ngươi không lay được {n1}.",o:[
  {n:"Tìm những nhà {n1} từng hại",f:"widow",wx:"tìm ra một bà góa họ Trịnh",lx:"không ai dám nhận",rt:()=>`Trịnh phu nhân, góa phụ một Thị lang, hẹn ngày ${TDVAO()} sẽ ghé cung ngươi.`,rf:"Không nhà nào dám nhận."},
  {n:"Nhờ Ngự sử năm xưa nối dây",f:"censor",wx:"có người ngoài triều",lx:"Ngự sử bị để ý",rt:"Ngự sử mời được hai nhà.",rf:"Ngự sử về tay không."},
  {n:"Chờ",wx:"không lộ",lx:"thời gian là của hắn",rt:"Ngươi chờ."}]},
 c1:{h:"{foe} đổi phe",w:"foe",if:()=>!!foe67(),t:"{foe} tìm ngươi: “Cha ta là con dao, và người cầm dao đã định bẻ nó. Ta không còn nợ hắn gì.” Nàng muốn đứng về phía ngươi, một lần.",o:[
  {n:"Bắt tay",f:"turn",wx:"{foe} mở cửa nhà nàng cho ngươi",lx:"nàng giữ lại một nửa",go:(A,ok,G)=>{const e=foe67();if(e){if(ok)relAdd(S,e,G[0]);else oanAdd(e,S,G[1])}},rt:"{foe} đưa ngươi một chiếc chìa khóa thư phòng của cha nàng.",rf:"{foe} chỉ hứa suông."},
  {n:"Bắt tay, nhưng giữ khoảng cách",f:"turn",wx:"có đồng minh mà không mắc nợ",lx:"nàng thấy ngươi chưa tin",go:(_A,_ok,G)=>{const e=foe67();if(e)relAdd(S,e,G[0])},rt:"Hai người hẹn mỗi tháng gặp một lần ở Phụng Tiên điện."},
  {n:"Từ chối kẻ thù",wx:"giữ trọn mối thù",lx:"mất một đồng minh, {foe} oán",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} cười buồn rồi đi."}]},
 c2:{h:"{v} lung lay",w:"v",need:["v"],t:"{v} khóc ở Ngự hoa viên: {n1} ép nhà nàng gả em gái nàng cho một lão quan góa vợ để kết bè. Nàng ghét {n1} hơn ai hết.",o:[
  {n:"An ủi, kéo nàng về",wx:"{v} có thể đổi phe",lx:"nàng ngại",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} tựa vai ngươi khóc.",rf:"{v} lau nước mắt, đứng dậy về."},
  {n:"Hứa giúp em gái nàng",wx:"{v} nợ ngươi",lx:"không giúp nổi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Hôn sự của em gái {v} bị hoãn.",rf:"Hôn sự vẫn thành."},
  {n:"Dùng nước mắt của nàng",wx:"biết nhà hắn đang chia rẽ",lx:"bỏ lỡ một người",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi ghi lại từng lời {v} nói."}]},
 c3:{h:"Ngự sử năm xưa",w:"maid",t:"Ngự sử, môn sinh cũ của cha ngươi, xin một lời: nếu ngươi đi đến cùng, ông sẵn lòng đứng tên sớ.",o:[
  {n:"Nhận lời",f:"censor",wx:"có người đứng tên ngoài triều",lx:"ông sẽ là người hứng đòn đầu, tiếng kéo bè dính đến ngươi",rt:"Ngự sử chắp tay: “Ân thầy, nay mới trả được.”"},
  {n:"Xin ông chờ",wx:"giữ ông an toàn",lx:"mất một tiếng nói",rt:"Ngự sử gật đầu chờ."},
  {n:"Nhờ ông dò trong Ngự sử đài",wx:"biết ai trong Ngự sử đài là người của {n1}",lx:"ông bị nghi",rt:"Ngự sử gửi vào một danh sách ba cái tên.",rf:"Ngự sử bị gọi lên hỏi."}]},
 t1:{h:"Liên minh có giá",w:"maid",t:"Đồng minh nào cũng có giá: người muốn chức, người muốn báo thù riêng, người muốn ngươi che chở về sau.",o:[
  {n:"Hứa với từng người",wx:"liên minh vững",lx:"nợ nhiều lời hứa",rt:"Ai cũng ra về với một lời hứa."},
  {n:"Chỉ hứa điều làm được",wx:"người ở lại là người thật",lx:"có người bỏ đi",rt:"Không ai bỏ đi.",rf:"Một nhà bỏ đi."},
  {n:"Không hứa, chỉ chia chứng cứ",wx:"không nợ ai",lx:"chứng cứ ra khỏi tay ngươi, liên minh lỏng",rt:"Mỗi nhà giữ một bản chép."}]},
 x1:{h:"Gặp nhau ở chùa Hộ Quốc",w:"maid",t:"Ngày rằm, các nhà mang thù với {n1} gặp nhau ở chùa Hộ Quốc, qua người của ngươi. Chỉ một lần, chỉ một khắc.",o:[
  {n:"Gom mọi chứng cứ làm một",e:["win","lose"],rt:"Mọi chứng cứ ghép lại thành một: {n1} không còn đường chối.",rf:"Một người trong buổi gặp là tai mắt của {n1}. Cuộc gặp tan."},
  {n:"Chỉ lập lời thề cùng tiến",e:["mid","lose"],rt:"Các nhà thề cùng tiến, nhưng mỗi nhà giữ chứng cứ riêng.",rf:"Không ai chịu thề trước."},
  {n:"Không cử người, để Ngự sử thay",e:"mid",lx:"liên minh không có người của ngươi ở giữa",rt:"Ngự sử đến thay người của ngươi."}]}},
 E:{win:{tag:"Liên minh đã thành",w:"maid",t:"Các nhà mang thù với {n1} gom chứng cứ về một mối, và mối ấy ở trong tay ngươi."},
  mid:{tag:"Liên minh lỏng",t:"Có lời thề, chưa có lòng tin. Mỗi nhà giữ một phần, chờ xem ai ra tay trước."},
  lose:{tag:"Liên minh tan",t:"Cuộc gặp bị lộ. Các nhà rút về, {n1} biết hết những ai đang chống hắn.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_ke",9,{t:"Bẫy ngược",w:"emp",sj:"cái bẫy dành cho {n1}",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Đánh thẳng vào {n1} thì sớ dễ bị bác. Phải để hắn tự bước vào bẫy, tự ra tay trước mắt người cần thấy. Mồi phải thật, và bẫy phải khép trước Tết Nguyên đán, khi hắn lại vào chầu ngồi cạnh Hoàng thượng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Mồi",w:"maid",if:RDW(1),t:"Liên minh có đủ chứng cứ. Chỉ cần {n1} tin rằng ngươi giấu bản gốc ở một chỗ, hắn sẽ sai người đến lấy.",o:[
  {n:"Dùng tráp giả làm mồi",f:"bait",wx:"mồi trông thật",lx:"hắn ngửi ra",rt:"Tráp giả được đặt ở điện thờ nhỏ sau cung.",rf:"Tráp giả trông mới quá."},
  {n:"Dùng một trang chứng cứ thật",f:"bait",wx:"mồi không thể giả hơn",lx:"trang ấy rời khỏi tay ngươi, mất nếu bẫy hỏng",rt:"Ngươi đặt trang sổ tiền trang vào tráp."},
  {n:"Thuê người đóng vai kẻ bán chứng cứ",f:"bait",wx:"hắn tự tìm đến",lx:"kẻ đóng vai bán thật",rt:"Người của {n1} tìm đến kẻ bán.",rf:"Kẻ đóng vai đem bán thật cho {n1}."}]},
 s2:{h:"Thiếu người",w:"maid",if:RDW(0),t:"Liên minh lỏng lẻo, ngươi chỉ có thể dựa vào chính mình và vài người trong cung.",o:[
  {n:"Nhờ {eun} giúp một tay",f:"bait",wx:"có người giữ cửa cung giúp",lx:"{eun} từ chối, chuyện ngươi cầu cạnh lọt ra",rt:"{eun} cho mượn bốn thái giám.",rf:"{eun} từ chối khéo."},
  {n:"Dựa vào {maid}",wx:"{maid} trung thành",lx:"ít người, dễ hở, phải tự thức canh",rt:"{maid} thề không ngủ đêm ấy."},
  {n:"Bỏ bạc thuê người ngoài",wx:"đủ tay",lx:"người ngoài bán tin",rt:"Sáu người lạ mặt đứng sẵn ngoài tường.",rf:"Một người thuê đem tin bán cho phủ {n1}."}]},
 c1:{h:"Ai sẽ thấy",w:"emp",t:()=>S.thDead?"Bẫy chỉ có nghĩa khi đúng người nhìn thấy: Hoàng thượng, hay Ngự sử đài.":"Bẫy chỉ có nghĩa khi đúng người nhìn thấy: Hoàng thượng, Thái hậu, hay Ngự sử đài.",o:[
  {n:"Mời Hoàng thượng ghé đúng đêm ấy",need:["nsrv"],f:"see",wx:"chính ngài thấy",lx:"ngài không đến, còn hỏi vì sao",rt:"Hoàng thượng hứa sẽ ghé vào canh ba.",rf:"Hoàng thượng bận tấu chương."},
  {n:"Mời Thái hậu",need:["th"],f:"see",wx:"Thái hậu làm chứng",lx:"Thái hậu không thích bị dùng",rt:"Thái hậu nhận lời ở lại cung ngươi nghe kinh đêm ấy.",rf:"Thái hậu bảo ngươi đừng bày trò."},
  {n:"Cho người báo Ngự sử đài",wx:"có người giữ phép nước",lx:"tin lộ qua Ngự sử đài",rt:"Hai Ngự sử chờ sẵn ở cổng.",rf:"Có kẻ trong Ngự sử đài báo tin đi."}]},
 c2:{h:"{v} có thể làm hỏng",w:"v",need:["v"],t:"{v} biết ngươi đang bày việc gì đó. Một lời của nàng đến tai {n1} là bẫy hỏng.",o:[
  {n:"Cho {v} một vai trong bẫy",wx:"chính {v} đưa mồi đến {n1}",lx:"nàng phản",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} báo với {n1} đúng điều ngươi muốn hắn nghe.",rf:"{v} báo với {n1} cả cái bẫy."},
  {n:"Giữ chân nàng đêm ấy",wx:"nàng không kịp báo",lx:"nàng sinh nghi sau đó",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi mời {v} xem hát suốt đêm."},
  {n:"Mặc nàng",wx:"không lộ thêm",lx:"bẫy có thể hở",rt:"Ngươi không đụng đến {v}."}]},
 c3:{h:"{foe} đưa tin",w:"foe",if:()=>!!foe67(),t:"{foe} hứa sẽ để lọt vào phủ {n1} một lời: chỗ ngươi giấu chứng cứ. Từ miệng con gái con dao, hắn sẽ tin.",o:[
  {n:"Tin nàng",wx:"mồi đến đúng chỗ",lx:"nàng hai lòng",go:(A,ok,G)=>{const e=foe67();if(e){if(ok)relAdd(S,e,G[0]);else oanAdd(e,S,G[1])}},rt:"{foe} về phủ thăm mẹ, và tin đến tai {n1}.",rf:"{foe} không về phủ như đã hứa."},
  {n:"Cảm ơn, tự đưa mồi",wx:"không dựa vào kẻ thù",lx:"mất một đường tin tốt, tự lo thêm việc",rt:"Ngươi tự sai người để lọt tin."},
  {n:"Thử nàng trước bằng tin giả",wx:"biết nàng thật lòng",lx:"nàng biết bị thử",go:(A,ok,G)=>{const e=foe67();if(e&&!ok)oanAdd(e,S,G[0])},rt:"Tin giả không lọt ra đâu cả: {foe} thật lòng.",rf:"{foe} biết bị thử, mặt lạnh hẳn."}]},
 t1:{h:"Đêm trước khi bẫy khép",w:"maid",t:"{maid} hỏi: “Nếu bẫy hỏng, {xung} có đường lui không?”",o:[
  {n:"Chuẩn bị đường lui",wx:"hỏng cũng không gãy",lx:"tốn bạc, chia sức",rt:"Một cỗ xe chờ ở cổng sau."},
  {n:"Không lui",wx:"dồn hết vào một nước",lx:"hỏng là mất hết",rt:"Ngươi thổi tắt đèn, ngồi chờ."},
  {n:"Viết sẵn tờ thú nhận",wx:"nếu hỏng, Hoàng thượng nghe ngươi trước",lx:"tờ thú nhận cũng là chứng chống ngươi",rt:"Tờ thú nhận nằm dưới gối."}]},
 x1:{h:"Bẫy khép",w:"emp",t:"Canh ba. Người của {n1} trèo vào chỗ giấu chứng cứ. Ngươi chờ trong bóng tối.",o:[
  {n:"Khép bẫy, bắt quả tang",e:["win","lose"],rt:"Người của {n1} bị bắt quả tang, trong tay là mồi, trên người là thẻ bài phủ hắn.",rf:"Kẻ đến nhận ra bẫy, cắn lưỡi trước khi bị bắt."},
  {n:"Để hắn lấy mồi, theo dấu",e:["mid","lose"],rt:"Kẻ đến mang mồi về thẳng phủ {n1}. Ngươi biết đường đi, nhưng chưa bắt được ai.",rf:"Người theo dấu bị lạc."},
  {n:"Gỡ bẫy, đợi dịp khác",e:"mid",lx:"mất một dịp",rt:"Ngươi cho người dọn mồi."}]}},
 E:{win:{tag:"Bắt quả tang",w:"emp",t:"Người của {n1} bị bắt quả tang trước mắt người cần thấy. Lần đầu tiên, hắn không thể nói mình vô can.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Biết đường, chưa bắt được",t:"Ngươi biết tin đi đường nào trong phủ {n1}, nhưng trong tay chưa có ai."},
  lose:{tag:"Bẫy hỏng",t:"Bẫy hỏng, và {n1} biết ngươi muốn bẫy hắn. Hắn sẽ ra tay trước."}}});

rdDef("td_ke",10,{t:"Lộ mặt",w:"emp",sj:"bộ mặt thật của {n1}",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Triều hội đầu xuân. {n1} đứng hàng đầu. Ngươi không có mặt ở triều: mọi chứng cứ ngươi có chỉ đến được ngự án qua tay Ngự sử, qua sớ và người làm chứng. Hôm nay hắn lộ mặt, hoặc ngươi lộ mặt.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ bị bắt đã khai",w:"emp",if:RDW(1),t:"Kẻ bị bắt quả tang đã khai trước Ngự sử đài. {n1} xin vào chầu riêng, tâu rằng có kẻ hãm hại hắn.",o:[
  {n:"Xin Hoàng thượng cho đối chất",wx:"đối chất trước mặt vua",lx:"ngài không muốn ồn",rt:"Hoàng thượng phán: đối chất ở triều hội.",rf:"Hoàng thượng bảo việc triều để triều lo."},
  {n:"Để Ngự sử dâng sớ trước hắn",wx:"sớ đến trước lời chối",lx:"Ngự sử bị chặn ở cửa",rt:"Sớ của Ngự sử đặt trên ngự án trước giờ {n1} vào chầu.",rf:"Ngự sử bị giữ ở cửa Ngọ môn."},
  {n:"Im lặng, chờ hắn nói nhiều",wx:"lời chối nhiều thì hở",lx:"hắn có thêm thời gian xóa dấu",rt:"Ngươi để hắn nói."}]},
 s2:{h:"{n1} ra tay trước",w:"emp",if:RDW(0),t:"{n1} dâng sớ trước: con gái tội thần ôm hận, kết bè với các nhà có tội, mưu hại đại thần. Sớ đã đến ngự án.",o:[
  {n:"Quỳ xin ngài đọc chứng cứ của ngươi",wx:"ngài đọc",lx:"ngài thấy ngươi đúng như sớ nói",rt:"Hoàng thượng đọc từng trang.",rf:"Hoàng thượng gạt đi."},
  {n:"Nhờ Thái hậu nói giúp",need:["th"],wx:"Thái hậu đứng ra",lx:"Thái hậu không muốn dính",rt:"Thái hậu bảo Hoàng thượng: “Nghe cả hai bên.”",rf:"Thái hậu trả lễ."},
  {n:"Nhận là có ôm hận, xin xét cả hai",wx:"lời thật làm ngài lặng",lx:"thừa nhận cả chuyện kết bè",rt:"Hoàng thượng lặng đi một lúc: “Trẫm xét cả hai.”"}]},
 c1:{h:"Con dao làm chứng",w:"emp",t:()=>rdEnd(6)==="lose"?"{foed} được khiêng đến Ngự sử đài. Từ đêm sát thủ, hắn không nói được nữa, chỉ còn cầm được bút. Hắn nhìn {n1} lần đầu sau ngần ấy năm.":"{foed} được đưa đến Ngự sử đài. Hắn nhìn {n1} lần đầu sau ngần ấy năm.",o:[
  {n:()=>rdEnd(6)==="lose"?"Để hắn viết hết":"Để hắn khai hết",wx:"lời con dao chỉ thẳng người cầm",lx:()=>rdEnd(6)==="lose"?"hắn sợ, nét chữ run không đọc ra":"hắn sợ, nói lắp",rt:()=>rdEnd(6)==="lose"?"{foed} run run viết từng chữ: “Ấn ấy, chính người nhà đại nhân mang đến.”":"{foed} chỉ tay: “Ấn ấy, chính người nhà đại nhân mang đến.”",rf:()=>rdEnd(6)==="lose"?"{foed} cầm bút không vững, nét chữ không ai đọc ra.":"{foed} run rẩy, nói trước quên sau."},
  {n:"Nhắn sẽ xin Hoàng thượng khoan cho con hắn",wx:()=>rdEnd(6)==="lose"?"hắn viết trọn lời":"hắn nói trơn tru",lx:"lời hứa thành ràng buộc, chương cuối sẽ bị đòi",go:()=>{RD_FL("td_ke.deal",1)},rt:()=>rdEnd(6)==="lose"?"{foed} nhận lời nhắn, thở ra, viết hết.":"{foed} nhận lời nhắn, thở ra, kể hết."},
  {n:"Xin Ngự sử đừng cho hắn lên",wx:"không để kẻ thù nhà mình thành người có công",lx:"mất chứng cứ sống",rt:"{foed} bị đưa về ngục."}]},
 c2:{h:"{v} chọn phe",w:"v",need:["v"],t:"{v} sẽ được Hoàng thượng hỏi: nhà nàng là phe {n1}, ngài muốn nghe người trong phe.",o:[
  {n:"Gặp nàng trước",wx:"nàng nói thật",lx:"nàng bênh {n1}",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} tâu: {n1} có giữ một tiền trang riêng.",rf:"{v} tâu: {n1} là trung thần."},
  {n:"Lo cho em gái nàng một mối tốt",wx:"nàng nghiêng về ngươi",lx:"nàng nhận rồi đổi ý",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} cúi đầu cảm tạ, rồi tâu thật.",rf:"{v} nhận ơn, rồi vẫn bênh {n1}."},
  {n:"Mặc nàng",wx:"không dính",lx:"nàng bênh {n1}",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi không gặp {v}."}]},
 c3:{h:"{foe} đứng ra",w:"foe",if:()=>!!foe67(),t:"{foe} xin dâng lời trình qua tay Hoàng thượng: nàng từng nghe chính miệng {n1} dặn cha nàng giữ kín chuyện ấn.",o:[
  {n:"Để nàng dâng lời trình",wx:"lời con gái kẻ vu cáo",lx:"bị nói nàng là người của ngươi",go:(A,ok,G)=>{const e=foe67();if(e)relAdd(S,e,ok?G[0]:G[1])},rt:"Hoàng thượng chuyển lời trình của {foe} sang Ngự sử đài, cả đài lặng đi.",rf:"Người ta bảo {foe} bị ngươi xui."},
  {n:"Khuyên nàng đứng ngoài",wx:"giữ nàng khỏi tai họa",lx:"bớt một lời chứng",go:(_A,_ok,G)=>{const e=foe67();if(e)relAdd(S,e,G[0])},rt:"{foe} nhìn ngươi, gật đầu."},
  {n:"Không tin nàng",wx:"không mắc bẫy",lx:"{foe} oán",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} cắn môi lui ra."}]},
 t1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Trước giờ chầu, Hoàng thượng hỏi riêng: “{n1} là trọng thần ba triều. Nàng có chắc không?”",o:[
  {n:"Thiếp chắc",wx:"ngài tin",lx:"đã nói chắc thì không được sai",rt:"Hoàng thượng gật đầu."},
  {n:"Thiếp có chứng cứ, xin ngài xét",wx:"ngài thấy ngươi biết phép",lx:"ngài chưa đứng về phía nào",rt:"Hoàng thượng bảo: “Trẫm sẽ xét.”"},
  {n:"Thiếp chỉ xin công bằng cho cha",wx:"ngài động lòng",lx:"ngài thấy ngươi nói tình",rt:"Hoàng thượng nắm tay ngươi.",rf:"Hoàng thượng lặng thinh."}]},
 x1:{h:"Triều hội đầu xuân",w:"emp",t:"Ngự sử bước ra hàng, dâng sớ. Cả triều quay về phía {n1}.",o:[
  {n:"Trao hết chứng cứ cho Ngự sử dâng một lần",e:["win","lose"],rt:"{n1} tái mặt. Hoàng thượng phán: cách chức, giao Tam ty là Hình bộ, Ngự sử đài, Đại Lý tự xét.",rf:"{n1} bẻ từng chứng cứ. Hoàng thượng gác sớ."},
  {n:"Chỉ trao chứng cứ vững nhất",e:["mid","lose"],rt:"{n1} bị giáng một bậc, chờ xét thêm.",rf:"Chứng cứ bị chê là đơn lẻ."},
  {n:"Để Ngự sử tự lo",e:"mid",lx:"công không phải của ngươi",rt:"Ngự sử nói một mình. {n1} bị hỏi, chưa bị tội."}]}},
 E:{win:{tag:"Kẻ chủ mưu lộ mặt",w:"emp",t:"{n1} bị cách chức, giao Tam ty xét. Cả triều biết bàn tay sau màn năm ấy là ai.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Lộ một nửa",t:"{n1} bị giáng một bậc. Ai cũng ngờ, chưa ai dám nói."},
  lose:{tag:"Hắn đứng vững",t:"{n1} đứng vững giữa triều. Ngươi bị Hoàng thượng trách là gây sóng gió."}}});

rdDef("td_ke",11,{t:"Trả thù kẻ nào",w:"emp",sj:"mối thù của nhà ngươi",cast(A){const f=S.st&&S.st.f14||{};A.n1=f.n1||(f.n1=pk67(["Hộ bộ thượng thư","Lễ bộ thượng thư","Thái sư"]));return rdCast(A,["v"],{v:v=>!v.enemy})},
 g:"Hai kẻ thù: {foed}, con dao, và {n1}, người cầm dao. Hoàng thượng sẽ phán lần cuối, và hỏi ngươi muốn gì. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tam ty xét {n1}",w:"emp",if:RDW(1),t:"Theo chỉ, Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự, cùng xét {n1}. Phủ hắn bị niêm, môn sinh hắn tìm đường thoát thân. Có kẻ nhờ người gửi thư vào cung ngươi xin tha.",o:[
  {n:"Nhận người ra hàng",wx:"thêm lời khai từ người trong nhà hắn",lx:"thư xin tha gửi vào cung ngươi không dứt",rt:"Một quản sự phủ {n1} nhờ người đưa vào cung tờ khai hết mọi việc."},
  {n:"Đóng cửa",wx:"không mang tiếng thu nạp",lx:"bỏ lỡ lời khai",rt:"Cửa cung ngươi đóng suốt mùa xét án."},
  {n:"Nhận, nhưng đòi sổ sách",f:"grip",wx:"có sổ riêng phủ {n1}",lx:"bị nói ép người",rt:"Quản sự gửi vào cuốn sổ riêng của {n1}.",rf:"Quản sự sợ, bỏ trốn."}]},
 s2:{h:"Hắn còn đó",w:"emp",if:RDW(0),t:"{n1} vẫn còn đó. Hắn cho người mang đến một hộp quà và một lời: “Dừng ở đây, hai nhà cùng yên.”",o:[
  {n:"Trả quà",wx:"hắn biết ngươi không lùi",lx:"hắn ra tay mạnh hơn, lời đồn về ngươi nổi lên",rt:"Hộp quà về phủ {n1} nguyên niêm."},
  {n:"Nhận quà, chưa đáp",wx:"hắn tưởng ngươi mềm",lx:"nhận quà là để lại dấu",rt:"Ngươi cất hộp quà, không hồi âm."},
  {n:"Đem quà trình Hoàng thượng",wx:"ngài thấy hắn mua chuộc",lx:"ngài chán chuyện cũ",rt:"Hoàng thượng nhìn hộp quà, mặt sầm lại.",rf:"Hoàng thượng phẩy tay."}]},
 c1:{h:"Thư từ trong ngục",w:"maid",t:()=>`{foed} viết thư: hắn đã khai những gì hắn biết, chỉ xin được về quê, không xin gì hơn.${RD_FL("td_ke.deal")?" Cuối thư, hắn nhắc lời ngươi đã nhắn: sẽ xin Hoàng thượng khoan cho nhà hắn.":""}`,o:[
  {n:"Dâng tờ xin Hoàng thượng khoan cho hắn về quê",wx:()=>RD_FL("td_ke.deal")?"giữ được lời đã nhắn, thù khép lại bằng lòng rộng":"thù khép lại bằng lòng rộng",lx:"có người nói ngươi quên cha",rt:"Ngươi viết một tờ xin, lời rất ngắn. Tha hay không là ân của Hoàng thượng."},
  {n:"Để luật xử hắn",if:()=>!RD_FL("td_ke.deal"),wx:"phép nước đúng phép",lx:"{foe} đau lòng, oán ngươi",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"Ngươi gấp thư lại."},
  {n:"Nuốt lời đã nhắn, để luật xử hắn",if:()=>!!RD_FL("td_ke.deal"),wx:"phép nước đúng phép",lx:"lời đã nhắn bị đòi: người ta nói ngươi nuốt lời, {foe} oán ngươi",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"Ngươi gấp thư lại. Lời nhắn năm trước, ngươi không nhắc nữa."},
  {n:"Không trả lời",wx:"không ràng buộc",lx:"hắn chết không yên, người ta nói ngươi lạnh",rt:"Thư nằm dưới đáy rương."}]},
 c2:{h:"{foe} và ngươi",w:"foe",if:()=>!!foe67(),t:"{foe} đến, lần này không để xin: “Dù ngươi làm gì với cha ta, ta cũng đã chọn đứng cùng ngươi một lần. Sau này, ta là gì của ngươi?”",o:[
  {n:"Là người một phe",wx:"{foe} thành đồng minh",lx:"phe {n1} oán cả hai",go:(_A,_ok,G)=>{const e=foe67();if(e)relAdd(S,e,G[0])},rt:"{foe} cười, lần đầu tiên."},
  {n:"Là con gái kẻ thù, nợ đã trả xong",wx:"rõ ràng",lx:"{foe} lạnh lòng",go:(_A,_ok,G)=>{const e=foe67();if(e)oanAdd(e,S,G[0])},rt:"{foe} gật đầu, quay đi."},
  {n:"Chưa biết",wx:"để thời gian trả lời",lx:"nàng không yên, giữ khoảng cách với ngươi",rt:"{foe} không hỏi lại."}]},
 c3:{h:"Nhà {v} lung lay",w:"v",need:["v"],t:"Nhà {v} lung lay theo {n1}. Nàng đến tìm ngươi: “Tỷ muốn nhà muội ngã cùng {n1} sao?”",o:[
  {n:"Tha nhà nàng",wx:"{v} nợ ngươi",lx:"phe kia còn chỗ đứng",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} lạy ngươi một lạy."},
  {n:"Bắt nàng chọn",wx:"{v} quay về phía ngươi",lx:"{v} oán",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} cắn môi: “Muội chọn tỷ.”",rf:"{v} bỏ đi, không ngoái lại."},
  {n:"Mặc nhà nàng",wx:"không nhúng tay",lx:"{v} oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi không đáp."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Hoàng thượng hỏi: “Nàng muốn trẫm trị ai: con dao, hay người cầm dao?”",o:[
  {n:"Người cầm dao",f:"big",wx:"trừ tận gốc",lx:"đối thủ lớn, ngài ngại động đến trọng thần",rt:"Hoàng thượng gật đầu chậm rãi."},
  {n:"Con dao thôi, cho triều yên",f:"small",wx:"dễ thành",lx:"kẻ chủ mưu còn đó",rt:"Hoàng thượng thở ra."},
  {n:"Thiếp không xin trị ai",wx:"ngài thấy ngươi không vì thù",lx:"thù không trả, người nhà cũ thất vọng",rt:"Hoàng thượng nhìn ngươi rất lâu."}]},
 x1:{h:"Chiếu cuối",w:"emp",t:"Hoàng thượng cầm bút son.",o:[
  {n:"Xin trị tội {n1}",e:["win","lose"],rt:"{n1} bị cách chức, tịch biên, giam chờ xử. Án nhà ngươi được lật đến tận gốc.",rf:()=>rdEnd(10)==="win"?"{n1} được các nguyên lão nói giúp. Ngài chỉ cho hắn về quê, không xét thêm.":"{n1} được các nguyên lão nói giúp. Ngài chỉ phạt bổng."},
  {n:"Xin trị tội {foed}",e:["mid","lose"],rt:"{foed} bị xử theo luật, nhà ngươi được truy phong.",rf:"Hoàng thượng mở ân, cho {foed} lấy công khai báo chuộc tội."},
  {n:"Xin ngài tự phán",e:["mid","lose"],rt:"Hoàng thượng phán: con dao chịu tội; người cầm dao được ân cho về hưu.",rf:"Hoàng thượng phán: chuyện cũ, khép lại."}]}},
 E:{win:{tag:"Kẻ chủ mưu đền tội",w:"emp",t:"{n1} bị tịch biên, cả triều biết bàn tay sau màn năm ấy. Án nhà ngươi được lật đến tận gốc; Hoàng thượng thấy ngươi giúp ngài trừ một quyền thần.",go:(A,G)=>{S.avenged=true;rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Chỉ con dao ngã",t:"{foed} chịu tội; {n1} được Hoàng thượng mở ân cho về hưu với trọn bổng lộc. Nhà ngươi được truy phong, nhưng ngươi biết người cầm dao vẫn sống yên."},
  lose:{tag:"Buông cả hai để giữ mình",t:()=>`Không kẻ thù nào bị trị cho xứng tội; chuyện cũ khép lại bằng một lệnh nhẹ tay. Ngươi giữ được mình và chỗ đứng trong cung, và học cách ${rdEnd(10)==="win"?"nghe nhắc tên {n1}":"cúi chào {n1} ở yến tiệc"} mà tay không run.`}}});
RD97L.push(rdRare({a:"td_ke_11",tag:"Nắm thóp kẻ chủ mưu",w:"maid",n:"Giữ sổ tội, để {n1} không dám động đến nhà ngươi",
 path:["Cướp sổ khỏi lò","Bắt sống sát thủ","Dùng hắn đưa tin giả","Gom mọi chứng cứ làm một","Khép bẫy","Nhận, nhưng đòi sổ sách","Người cầm dao"],bad:["Để cháy","Để hắn tự lo","Hứa với từng người"],x:[()=>S.tamco>=RR("td_ke_11").bar,"Tâm cơ từ "+RR("td_ke_11").bar],
 t:"Ngươi không dâng sổ tội. Ngươi gửi cho {n1} một trang chép tay, kèm một lời: “Đại nhân giữ yên phận mình, sổ này nằm yên trong tráp ta.” Hắn đọc, rồi đốt trang giấy. Từ hôm ấy, phủ {n1} và môn sinh của hắn không ai còn dám động đến nhà ngươi hay cung ngươi, mà không ai hiểu vì sao.",
 rw:"nt_dongchau",ti:"Người cầm dây sau màn"}));
/* ---------- td_song · Người em còn sống ---------- */
/* BAL.road.td_song = {} (no chapter constants: deadlines are told in text like tt_oan .6).
   The brother = the youngest son of HER fallen family (jkc fall card: "Em trai út lạc trong đêm khám phủ"); no name field exists in S.kc.fam,
   so he is "em" / "em trai út" in text and "Tiểu Thạch" = the soldier name he carries since .4 (j67 td_song s1). Never a real name.
   The enemy pair: {foe} (S.foe, foe67()) and {foed} (S.foeDad). cast() puts the live foe in A.act.foe so rv67(A,"foe") / rdOan(A,"foe",n)
   work; every beat where {foe} acts in person carries if:A=>!!rv67(A,"foe") and has a sibling beat without her (foe out / dead / never cast).
   .4 endings read: win / r97 (pardoned, keeps his merit, in the army openly), mid (lives quietly under the false name), lose (exiled to an island). */
rdDef("td_song",5,{t:"Tin lan về kinh",w:"maid",sj:"tin em ngươi còn sống",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Chuyện em trai út còn sống không còn là chuyện riêng của ngươi. Có người ngoài đã nghe, và nhà {foed} sợ nhất là một đứa con trai của nhà bị hại lớn lên. Biết ai đã biết, và tìm cho em một chỗ dựa trước khi họ ra tay.",
 p:[["s1","s2","s3"],["c1","c2","c3","c4"],["t1"],["x1"]],
 B:{s1:{h:"Chiếu đọc giữa triều",w:"emp",if:()=>/^(win|r97)$/.test(rdPrev()),t:()=>(rdPrev()==="r97"?"Chiếu cho em ngươi khôi phục họ cũ, ghi công cứu ải, được đọc giữa triều; sổ đinh nơi biên vẫn ghi cái tên Tiểu Thạch.":"Chiếu ân xá cho em ngươi được đọc giữa triều.")+" Ngay hôm ấy {foed} cáo bệnh không lên chầu. Ai cũng hiểu: con trai út của nhà tội thần còn sống là cái gai trong mắt hắn.",o:[
  {n:"Gửi bạc cho em lo chỗ đứng trong doanh",f:"guard",wx:"em có người trong doanh che chở",lx:"bạc đi nhiều thì dễ bị dò",rt:"Em ngươi đổi được chỗ ngủ cạnh lều phó tướng."},
  {n:"Xin Hoàng thượng cho em về dưới trướng phó tướng cũ",f:"guard",wx:"em ở cạnh người mang ơn em",lx:"Hoàng thượng cho là ngươi xin quá nhiều",rt:"Hoàng thượng phê một chữ “Chuẩn”.",rf:"Hoàng thượng bảo việc quân để Binh bộ lo."},
  {n:"Dặn em sống kín, đừng khoe công",f:"quiet",wx:"em ít bị để mắt",lx:"em lỡ dịp thăng chức",rt:"Em hồi thư: “Đệ nghe tỷ.”"}]},
 s2:{h:"Có kẻ hỏi tên Tiểu Thạch",w:"maid",if:()=>rdPrev()==="mid",t:"Người lái buôn từng đưa chiếc vòng bạc nhắn vào: có kẻ lạ giọng kinh thành đi khắp các quán trọ ở Nhạn Môn, tay cầm bạc, hỏi về một lính phu tên Tiểu Thạch.",o:[
  {n:"Nhờ lái buôn đưa em đổi doanh",f:"quiet",wx:"em ra khỏi tầm mắt kẻ lạ",lx:"đổi doanh thì công trận cũ không ai nhớ",rt:"Em theo đoàn xe muối sang một doanh phía tây."},
  {n:"Cho người theo dõi kẻ lạ",f:"know",wx:"biết hắn là người của ai",lx:"kẻ lạ biết bị theo",rt:"Mỗi lần về kinh, kẻ lạ đều ghé cửa sau phủ {foed}.",rf:"Kẻ lạ cắt đuôi ở bến đò."},
  {n:"Bảo em cứ ở yên, đừng hoảng",wx:"không gây động",lx:"kẻ lạ tìm gần thêm",rt:"Em vẫn gánh nước mỗi sáng như mọi lính phu khác."}]},
 s3:{h:"Thư từ hải đảo",w:"maid",if:()=>!/^(win|r97|mid)$/.test(rdPrev()),t:"Một bức thư nhòe nước biển: em ngươi bị đày ra đảo, sốt rét quanh năm. Lính coi đảo nói ai có bạc thì được đổi sang đội đồn điền trên đất liền, gần biên ải.",o:[
  {n:"Gửi bạc lo cho em lên đất liền",f:"guard",wx:"em rời đảo",lx:"lính coi đảo biết nhà ngươi có của, còn đòi nữa",rt:"Em lên thuyền về đất liền, vào đội đồn điền dưới chân ải."},
  {n:"Xin Thái hậu một lời khoan hồng",need:["th"],f:"guard",wx:"em được chuyển đi theo lệnh trên",lx:"Thái hậu nhắc ngươi là con tội thần",rt:"Một lệnh của Đức Thọ cung đưa em về đất liền.",rf:"Thái hậu bảo người đã đày thì ở yên chỗ đày."},
  {n:"Viết thư dặn em giữ mình, chờ lệnh đổi phiên",wx:"không lộ tay ngươi",lx:"em ở đảo thêm một mùa bệnh",rt:"Ba tháng sau, cả đội lưu đày được đưa vào đất liền khai hoang."}]},
 c1:{h:"Ai đã nói ra",w:"maid",t:"{maid} dò được: tin em ngươi còn sống lọt ra ngoài qua một thái giám chạy thư ở Nội vụ phủ, kẻ vẫn ăn bạc của nhiều cung.",o:[
  {n:"Mua lại miệng hắn",wx:"hắn chuyển tin giả cho kẻ mua",lx:"hắn ăn bạc hai đầu",rt:"Hắn báo với người mua rằng tên lính kia đã chết vì bệnh."},
  {n:"Cho hắn biết ngươi đã biết",wx:"hắn sợ, im miệng",lx:"hắn đi kể lể khắp Nội vụ phủ",rt:"Hắn tái mặt, từ đó đi vòng qua cung ngươi.",rf:"Hắn kể với ai cũng bảo ngươi dọa hắn."},
  {n:"Đổi đường thư, bỏ qua hắn",wx:"thư sau kín hơn",lx:"tin đã lọt thì không lấy lại được",rt:"Từ nay thư nhà đi bằng tay {maid}."}]},
 c2:{h:"{foe} hỏi chuyện biên ải",w:"foe",if:A=>!!rv67(A,"foe"),t:"Trong buổi thỉnh an, {foe} nói như vô tình: “Nghe nói ở Nhạn Môn có tên lính trẻ giống muội lắm.” Mấy phi tần quay sang nhìn ngươi.",o:[
  {n:"Cười: người giống người thì nhiều",wx:"lời nàng trôi qua",lx:"cả điện để ý",rt:"Có người cười theo, chuyện trôi đi.",rf:"Chẳng ai cười theo ngươi."},
  {n:"Hỏi lại nàng nghe từ ai",f:"know",wx:"biết đường tin của nhà {foed}",lx:"{foe} biết ngươi chột dạ",go:(A,ok,G)=>{if(!ok)rdOan(A,"foe",G[0])},rt:"{foe} buột miệng: cha nàng có người ở Binh bộ.",rf:"{foe} mỉm cười, không đáp."},
  {n:"Nhìn thẳng nàng, không đáp",wx:"không ai dám cười",lx:"{foe} ghi hận",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"{foe} quay mặt đi trước."}]},
 c3:{h:"Phủ {foed} mua tin",w:"maid",if:A=>!rv67(A,"foe"),t:"Không còn con gái trong cung làm tai mắt, phủ {foed} trả bạc cho bất kỳ ai mang được tin của cung ngươi ra ngoài.",o:[
  {n:"Nhử bằng tin giả",f:"know",wx:"phủ {foed} trả bạc cho tin rỗng",lx:"tin giả bị nhận ra",rt:"Phủ {foed} cho người đi tìm em ở một doanh không có em.",rf:"Kẻ mua tin cười khẩy."},
  {n:"Tăng bạc thưởng cho người trong cung giữ miệng",wx:"cung ngươi kín như bưng",lx:"tốn bạc",rt:"Không một chữ nào ra khỏi cửa cung."},
  {n:"Mặc, không làm gì",wx:"không gây chú ý",lx:"phủ {foed} có thể mua được ai đó",rt:"Ngươi để mọi việc như thường."}]},
 c4:{h:"Thư của phó tướng",w:"maid",t:"Phó tướng mà em ngươi từng cõng ra khỏi vòng vây gửi thư riêng: y muốn che chở em, nhưng cần biết em thật là ai.",o:[
  {n:"Nói thật với y",f:"ally",wx:"em có một người che chở thật lòng",lx:"y sợ dính án, lánh xa",rt:"Phó tướng hồi thư: “Mạng ta do y cứu. Ta không hỏi y là con ai.”",rf:"Phó tướng không hồi âm nữa."},
  {n:"Gửi lễ cảm tạ, không nói gì",wx:"y vẫn quý em",lx:"y che chở nửa vời",rt:"Phó tướng nhận lễ, dặn em ở gần lều mình."},
  {n:"Không hồi âm",wx:"không để lại chữ",lx:"y sinh nghi",rt:"Thư của phó tướng nằm im trong hộp."}]},
 t1:{h:"Kẻ lạ vào doanh",w:"maid",t:"Tin về: một viên quan Binh bộ đến doanh của em xét sổ lính, chỉ hỏi kỹ một cái tên.",o:[
  {n:"Báo em lánh đi vài ngày",f:"quiet",wx:"viên quan về tay không",lx:"bỏ doanh là phạm quân luật",rt:"Em theo đội đi chặt gỗ trên núi, viên quan về tay không.",rf:"Em bị bắt đánh hai mươi roi vì rời doanh."},
  {n:"Nhờ phó tướng giữ em bên mình",if:A=>A.f.ally,wx:"không ai dám đụng người của phó tướng",lx:"phó tướng mang tiếng thiên vị",rt:"Phó tướng nói với viên quan: “Người này là thân binh của ta.”"},
  {n:"Bỏ bạc đánh lạc viên quan",wx:"viên quan ghi một cái tên khác",lx:"viên quan nhận bạc rồi vẫn báo lên",rt:"Viên quan ghi vào sổ: không có ai tên ấy.",rf:"Viên quan nhận bạc, rồi vẫn khoanh tròn tên em."}]},
 x1:{h:"Ai giữ em",w:"emp",t:"Cuối mùa, sổ lính biên ải trình về kinh. Có tên em trong đó, kèm một dòng son của {foed}: xin tra lại tên lính này. Ngươi phải chọn ai đứng ra giữ em.",o:[
  {n:"Xin Hoàng thượng giao em cho phó tướng",e:["win","lose"],rt:"Hoàng thượng gạch dòng son, phê: “Lính giỏi, giữ lại.”",rf:"Hoàng thượng hỏi sao một tên lính lại khiến ngươi bận lòng đến vậy."},
  {n:"Lặng lẽ đưa em sang doanh khác",e:["mid","lose"],rt:"Em đi trong đêm, sổ doanh mới ghi một người khác hẳn.",rf:"Em bị chặn ở trạm gác, đành quay về doanh cũ."},
  {n:"Để em tự lo",e:"mid",lx:"em một mình trước tờ tra",rt:"Em viết thư: “Tỷ đừng lo, đệ lo được.”"}]}},
 E:{win:{tag:"Em có người che chở",w:"emp",t:"Lời son của {foed} bị gạch. Em ở lại dưới trướng phó tướng, có người che, có việc làm. Nhà {foed} biết đã có người đứng sau tên lính ấy.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}},
  mid:{tag:"Em lánh khỏi tầm mắt",t:"Em lặng lẽ đổi chỗ. Không ai bắt được em, nhưng cũng chẳng ai đứng ra giữ em."},
  lose:{tag:"Nhà {foed} đã biết",t:"Tên em bị khoanh son. Nhà {foed} biết chắc con trai út của nhà ngươi còn sống, và biết ngươi đang che cho em.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}}}});

rdDef("td_song",6,{t:"Thư qua biên ải",w:"maid",sj:"đường thư giữa ngươi và em",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Thư từ là sợi dây duy nhất giữa ngươi và em, cũng là thứ dễ hại em nhất. {v} đang săn thư của cung ngươi để đem bán cho người trả giá cao. Giữ đường thư, đừng để một chữ nào lọt.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Bức thư bằng chữ thật",w:"maid",if:RDW(1),t:"Có người che chở, em gửi thư đầu tiên bằng chữ thật của mình. Nét chữ giống hệt chữ cha. Ai từng đọc tấu của cha mà thấy thư này là biết.",o:[
  {n:"Đọc xong thì đốt",f:"burn",wx:"không để lại dấu",lx:"mất vật duy nhất có nét chữ nhà",rt:"Ngươi đọc ba lần rồi thả vào lò hương."},
  {n:"Giữ trong hộp khóa",wx:"giữ được kỷ vật",lx:"hộp khóa vẫn có thể bị cạy",rt:"Lá thư nằm dưới đáy hộp trang sức."},
  {n:"Dặn em đổi nét chữ",f:"code",wx:"thư sau không ai nhận ra",lx:"em viết vụng, sai cả lời",rt:"Thư sau em viết nét gầy như chữ thầy đồ quê.",rf:"Thư sau em viết rối, ngươi đọc không ra."}]},
 s2:{h:"Thư không phải của em",w:"maid",if:RDW(0),t:"Em phải lánh, thư đứt ba tháng. Rồi một bức thư không đề tên đến cửa cung ngươi. Lời lẽ như em, nhưng nét chữ không phải của em.",o:[
  {n:"Lần ngược người mang thư",f:"know",wx:"biết ai đang giả thư",lx:"người mang thư mất dấu",rt:"Người mang thư nhận việc từ một cung nữ hầu {v}.",rf:"Người mang thư đã rời kinh."},
  {n:"Hồi đáp bằng lời vô hại",wx:"kẻ giả thư chẳng moi được gì",lx:"kẻ giả thư đoán ra ngươi biết",rt:"Ngươi viết về hoa mai và thời tiết.",rf:"Kẻ giả thư thôi gửi, chuyển sang cách khác."},
  {n:"Đốt, không đáp",wx:"không sa bẫy",lx:"không biết ai đặt bẫy",rt:"Bức thư cháy trong lò hương."}]},
 c1:{h:"{v} săn thư",w:"v",need:["v"],t:"Cung nữ của {v} làm thân với người đưa thư của cung ngươi, ngày nào cũng mang bánh sang.",o:[
  {n:"Đổi người đưa thư",wx:"đường thư kín lại",lx:"{v} biết ngươi đề phòng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người đưa thư cũ được đưa sang Thượng thiện giám."},
  {n:"Cho {v} lấy được một lá thư giả",f:"code",wx:"{v} cầm một lá thư vô dụng",lx:"thư giả bị nhận ra",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"{v} đem lá thư giả đi bán, người mua trả lại bạc.",rf:"{v} cười: “Muội tưởng ta ngốc sao.”"},
  {n:"Gặp {v}, nói thẳng",wx:"hai bên ngầm hiểu",lx:"{v} biết ngươi có điều cần giấu",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} hứa không động đến thư nhà ngươi.",rf:"{v} hỏi: “Thư nhà gì mà muội sợ đến vậy?”"}]},
 c2:{h:"Bài thơ của mẹ",w:"maid",t:"{maid} nhắc: thuở nhỏ, mẹ ngươi dạy hai chị em một lối giấu chữ trong bài thơ, chữ đầu mỗi câu ghép lại thành lời.",o:[
  {n:"Viết thư bằng thơ",f:"code",wx:"thư đọc như thơ vịnh cảnh",lx:"thơ gượng, người đọc sinh nghi",rt:"Em hồi một bài thơ, chữ đầu ghép lại: “Đệ bình an”.",rf:"Em quên mất lối ghép chữ."},
  {n:"Gửi thư qua lái buôn kèm hàng",wx:"thư nằm trong bao hàng",lx:"lái buôn biết hết chuyện",rt:"Thư đi trong một kiện vải."},
  {n:"Viết thật ngắn, không tên",wx:"có lọt cũng chẳng ai hiểu",lx:"em đọc cũng chưa chắc hiểu",rt:"Ngươi viết bốn chữ: “Áo ấm chưa?”"}]},
 c3:{h:"Chuyến xe cuối trước mùa tuyết",w:"maid",t:"Đoàn lái buôn chỉ đi biên một chuyến nữa trước khi tuyết phong đèo, còn chừng nửa tháng. Lỡ chuyến này thì thư và áo ấm phải chờ sang xuân.",o:[
  {n:"Gửi kịp áo bông và bạc",wx:"em có áo qua đông",lx:"kiện hàng lớn dễ bị xét",rt:"Áo bông đến tay em trước trận tuyết đầu mùa."},
  {n:"Nhờ trạm dịch quân đưa thư",wx:"thư nhanh mà không tốn bạc",lx:"thư qua tay lính trạm",rt:"Thư đến trong mười ngày.",rf:"Thư bị trạm dịch giữ lại để xét."},
  {n:"Không gửi, chờ xuân",wx:"không để lại dấu",lx:"em qua đông không tin nhà",rt:"Ngươi cất thư vào hộp."}]},
 t1:{h:"Thư mất trên đường",w:"maid",t:"Một bức thư của ngươi không đến tay em. Người đưa thư nói lính tuần lục soát giữa đường và giữ mất.",o:[
  {n:"Tìm cho ra lá thư",wx:"biết thư nằm ở đâu",lx:"càng tìm càng lộ",rt:"Thư nằm trong tay một cung nữ hầu {v}.",rf:"Không ai nhận đã giữ thư."},
  {n:"Viết lại như chưa có gì",wx:"không ai thấy ngươi hoảng",lx:"lá thư cũ vẫn ở đâu đó",rt:"Ngươi viết lại, lời lẽ nhạt hơn."},
  {n:"Tâu Hoàng hậu có kẻ chặn thư cung ngươi",need:["hh"],wx:"Hoàng hậu cho xét người đưa thư",lx:"Hoàng hậu hỏi thư gửi cho ai",rt:"Hoàng hậu ra lệnh: thư các cung không ai được giữ.",rf:"Hoàng hậu hỏi ngươi viết thư cho ai."}]},
 x1:{h:"Lá thư trên án {v}",w:"v",t:"Một lá thư ngươi gửi em đã nằm trên án của {v}. Nàng hẹn ngươi ra vườn sau, giọng ngọt như mật: “Tỷ chỉ muốn biết, người muội gọi là đệ là ai?”",o:[
  {n:"Đổi bằng điều ngươi biết về {v}",e:["win","lose"],go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} trả thư, môi mím chặt. Hai bên cùng giữ thóp nhau.",rf:"{v} cười: “Chuyện của tỷ ai cũng biết. Chuyện của muội thì chưa.”"},
  {n:"Chuộc thư bằng bạc",e:["mid","lose"],go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận bạc, trả thư, không hỏi thêm.",rf:"{v} nhận bạc, nhưng đã chép lại thư."},
  {n:"Bảo thư là giả",e:["mid","lose"],rt:"Thư viết lối giấu chữ, {v} đọc mãi không ra một lời đáng giá.",rf:"{v} đem thư đi hỏi người khác."}]}},
 E:{win:{tag:"Đường thư kín",w:"maid",t:"Thư lấy lại được, đường thư đổi người, đổi lối viết. Từ nay giữa ngươi và em có một sợi dây mà người ngoài không đọc được."},
  mid:{tag:"Mất một lá thư",t:"Thư về lại, nhưng ngươi không chắc nó chưa bị chép. {v} biết ngươi có một người thân ngoài cung."},
  lose:{tag:"{v} nắm thóp",t:"{v} giữ một bản chép thư của ngươi. Chưa ai đọc ra hết, nhưng nàng biết đó là thứ ngươi sợ mất.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_song",7,{t:"Kẻ nghi ngờ",w:"maid",sj:"người nhận ra gương mặt nhà ngươi",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Em giống cha như đúc. Một lão quan bộ Lễ, đồng liêu cũ của cha, vừa đi tuần biên về; nhà {foed} cho thợ vẽ lên ải. Một lời đồn đang đi về phía ngự án: con trai tội thần kết bè trong quân để báo thù. Bịt lời đồn, đổi lời đồn, hay đón nó trước.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Lão quan bộ Lễ xin gặp",w:"maid",if:RDW(1),t:"Đường thư kín, nhưng gương mặt thì không giấu được. Một lão quan bộ Lễ, đồng liêu cũ của cha, vừa đi tuần biên về, nhờ người đưa vào cung ngươi một câu: “Thần đã gặp một người ở Nhạn Môn.”",o:[
  {n:"Cho người ra nghe lão kể hết",f:"elder",wx:"có một người trong triều nhớ ơn cha",lx:"lão nói lại với người khác",rt:"Lão khóc: “Thị lang năm ấy là người ngay.”",rf:"Lão kể chuyện gặp em ở quán rượu bộ Lễ."},
  {n:"Không hồi âm",wx:"không ai thấy người của ngươi với lão",lx:"lão buồn, đi nói với người khác",rt:"Lão quan chờ mãi không thấy hồi âm."},
  {n:"Gửi lễ dặn lão giữ kín",wx:"lão hiểu ý",lx:"có lễ là có dấu",rt:"Lão nhận lễ, gửi lại một chữ: “Kín.”"}]},
 s2:{h:"Lời đồn đến bộ Lễ",w:"maid",if:RDW(0),t:"Từ khi thư lọt, lời đồn bay đến bộ Lễ. Một lão quan, đồng liêu cũ của cha, viết thư hỏi Binh bộ về một tên lính tên Tiểu Thạch. Lão muốn tốt, nhưng thư ấy ai cũng đọc được.",o:[
  {n:"Gửi người xin lão rút thư",f:"elder",wx:"lão rút thư, thành người một phe",lx:"lão không hiểu, càng hỏi",rt:"Lão rút thư, nhắn: “Thần hiểu rồi.”",rf:"Lão gửi thêm một thư nữa."},
  {n:"Cho người đến Binh bộ lấy thư ra",wx:"thư biến mất khỏi Binh bộ",lx:"kẻ lấy thư bị bắt gặp",rt:"Lá thư không còn trong sổ công văn.",rf:"Thư đã được chép sang phủ {foed}."},
  {n:"Để mặc",wx:"không động tay",lx:"lời hỏi của lão đi tiếp",rt:"Ngươi không làm gì."}]},
 c1:{h:"{foe} gom lời",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} cho mời mấy phi tần đến uống trà, hỏi từng người đã nghe gì về một tên lính giống ngươi.",o:[
  {n:"Đến dự, dẫn chuyện sang hướng khác",wx:"tiệc trà thành chuyện hoa cỏ",lx:"ai cũng thấy ngươi lảng",go:(A,ok,G)=>{if(ok)rdOan(A,"foe",G[0])},rt:"Cả buổi chỉ nói chuyện vải mới.",rf:"{foe} quay lại hỏi thẳng ngươi."},
  {n:"Rỉ cho nàng một tin sai",f:"false",wx:"nhà {foed} đi tìm nhầm người",lx:"tin sai lộ ra từ cung ngươi",go:(A,ok,G)=>{if(ok)rdOan(A,"foe",G[0])},rt:"{foe} gửi thư về nhà kể về một tên lính ở doanh khác.",rf:"{foe} nhận ra tin từ cung ngươi."},
  {n:"Cáo bệnh không đến",wx:"không phải nói dối",lx:"tiệc trà nói về ngươi",rt:"Tiệc trà vắng ngươi, và nói về ngươi."}]},
 c2:{h:"Thợ vẽ lên ải",w:"maid",t:"Nhà {foed} thuê một thợ vẽ lên Nhạn Môn vẽ mặt Tiểu Thạch, mang về so với bức tranh thờ cha ngươi mà họ giữ từ ngày khám phủ.",o:[
  {n:"Mua tranh trước khi về kinh",wx:"bức vẽ không bao giờ đến kinh",lx:"thợ vẽ biết có người trả giá",rt:"Bức vẽ cháy ở một quán trọ dọc đường."},
  {n:"Dặn em để râu, đổi dáng",f:"false",wx:"bức vẽ không giống ai",lx:"em đổi dáng mà vẫn lộ",rt:"Bức vẽ mang về là một gã râu rậm lạ hoắc.",rf:"Mắt em vẫn là mắt của cha."},
  {n:"Đòi lại tranh thờ cha",wx:"nhà {foed} mất vật để so",lx:"lộ rằng ngươi biết tranh nằm đâu",rt:"Tranh thờ cha được trả về chùa.",rf:"Phủ {foed} nói tranh đã mất từ lâu."}]},
 c3:{h:"Tai mắt của {v}",w:"v",need:["v"],t:"{v} nghe được lời đồn, và thấy đây là dịp kéo ngươi xuống: nàng sai người chép lời đồn thành vè, dạy cung nữ hát.",o:[
  {n:"Bắt người hát vè",wx:"vè tắt",lx:"càng bắt càng có người nghe",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Hai cung nữ bị giải lên Thận hình ty, bài vè tắt.",rf:"Bài vè chuyển sang Tân Giả khố."},
  {n:"Tung một bài vè khác",wx:"vè mới át vè cũ",lx:"cả cung toàn vè",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Cả cung hát vè về chuyện khác.",rf:"Hai bài vè cùng truyền."},
  {n:"Làm ngơ",wx:"không hạ mình",lx:"vè cứ lan",rt:"Ngươi đi ngang, không nghe."}]},
 t1:{h:"Mồi của {foed}",w:"maid",t:"Một mật thư báo: {foed} sẽ cho người tâu lên rằng con trai tội thần đang kết bè trong quân để báo thù cho cha. Mũi tên nhắm vào em, nhưng cũng nhắm vào ngươi.",o:[
  {n:"Gom công trận của em làm chứng",f:"merit",wx:"có giấy tờ công trận",lx:"lục công trận thì lộ người lục",rt:"Phó tướng gửi về bản ghi công có ấn doanh.",rf:"Bản ghi công bị giữ ở Binh bộ."},
  {n:"Dặn em đừng gặp ai riêng",f:"quiet",wx:"lời tâu không có chứng",lx:"em thành kẻ lạc loài trong doanh",rt:"Em ăn một mình, ngủ một mình."},
  {n:"Rỉ tin để lão quan bộ Lễ nói trước",if:A=>A.f.elder,wx:"lời tốt đến ngự án trước lời xấu",lx:"lão quan dính vào chuyện nhà ngươi",rt:"Lão quan tâu về một người lính trung dũng ở Nhạn Môn."}]},
 x1:{h:"Câu hỏi giữa bữa",w:"emp",t:"Hoàng thượng hỏi giữa bữa: “Có người tâu tên lính Tiểu Thạch là con tội thần, đang kết bè trong quân để báo thù. Nàng có nghe gì không?”",o:[
  {n:"Dâng bản ghi công của em",e:["win","lose"],rt:"Hoàng thượng đọc bản ghi công, nói: “Kết bè gì mà cõng phó tướng ra khỏi vòng vây.”",rf:"Hoàng thượng đặt bản ghi công xuống: “Nàng biết nhiều quá.”"},
  {n:"Thưa: người tâu có thù với nhà thiếp",e:["mid","lose"],go:(A,ok,G)=>{if(ok)rdOan(A,"foe",G[0])},rt:"Hoàng thượng gật đầu, lời tâu bị gác lại.",rf:"Hoàng thượng thấy ngươi lại lôi thù cũ ra."},
  {n:"Giả không biết",e:["mid","lose"],rt:"Hoàng thượng chuyển sang chuyện khác.",rf:"Hoàng thượng nhìn ngươi rất lâu."}]}},
 E:{win:{tag:"Lời đồn hóa lời khen",w:"emp",t:"Lời tâu bị gạt đi, và Hoàng thượng nhớ đến tên lính ấy như một người lính giỏi. Nhà {foed} mất một nước cờ.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}},
  mid:{tag:"Lời đồn bị gác",t:"Lời tâu bị gác lại, chưa bị bác. Nó vẫn nằm đâu đó trong ngự thư phòng."},
  lose:{tag:"Hoàng thượng sinh nghi",t:"Hoàng thượng không nói gì, nhưng mấy hôm liền không ghé cung ngươi. Lời tâu về em được giao cho Binh bộ xét."}}});

rdDef("td_song",8,{t:"Em bị thương",w:"maid",sj:"vết thương của em",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Đội của em bị đẩy lên tuyến đầu, em trúng tên vào vai. Quân y nói phải có thuốc tốt trong vòng một tháng, kẻo mất cánh tay. Bạc, thuốc, người mang thuốc: thiếu một là lỡ. Và phải biết ai đã ký lệnh đẩy đội em lên.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tin dữ sau lời khen",w:"maid",if:RDW(1),t:"Hoàng thượng vừa khen tên lính ấy, thì một tháng sau đội của em bị đẩy lên giữ một đồn trơ trọi. Em trúng tên vào vai phải.",o:[
  {n:"Xin Hoàng thượng cho thái y theo đoàn quân lương",wx:"thuốc đi theo đường quan",lx:"Hoàng thượng thấy lạ",rt:"Một thái y trẻ theo đoàn quân lương lên ải.",rf:"Hoàng thượng bảo quân y biên ải đủ dùng."},
  {n:"Bỏ bạc thuê người phi ngựa mang thuốc",wx:"thuốc đi nhanh",lx:"tốn bạc",rt:"Người đưa thuốc đi ngay trong đêm."},
  {n:"Nhờ phó tướng đưa em về hậu doanh",wx:"em được nằm yên",lx:"phó tướng mang tiếng thiên vị",rt:"Em được khiêng về hậu doanh.",rf:"Phó tướng cũng đang bị điều đi."}]},
 s2:{h:"Em bị thương mà không ai hay",w:"maid",if:RDW(0),t:"Lời tâu bị gác, nhưng đội của em vẫn bị đẩy lên đầu. Tin em trúng tên đến cung ngươi chậm nửa tháng, qua tay người lái buôn.",o:[
  {n:"Gửi ngay thuốc trị thương",wx:"thuốc lên đường",lx:"tốn bạc",rt:"Một gói kim sang dược theo đoàn lái buôn đi."},
  {n:"Hỏi thái y bài thuốc, tự sắc gửi đi",wx:"thuốc hợp bệnh mà không tốn bạc",lx:"thái y hỏi ngươi chữa cho ai",rt:"Thái y chép cho ngươi một bài cao dán.",rf:"Thái y đi kể ngươi hỏi thuốc trị tên."},
  {n:"Viết thư hỏi cho chắc",wx:"không động khi chưa rõ",lx:"mất thêm mười ngày",rt:"Thư đi, ngươi đếm từng ngày."}]},
 c1:{h:"Thuốc của Thái y viện",w:"doc",t:"Thuốc trị tên độc tốt nhất nằm trong kho Thái y viện, phải có lệnh mới được lấy. Thái y nói: còn chừng ba tuần nữa thì vết thương hóa mủ, lúc ấy thuốc nào cũng muộn.",o:[
  {n:"Đổi thuốc bằng bạc riêng",wx:"có thuốc ngay",lx:"tốn bạc",rt:"Thái y nhận bạc, đưa ba gói thuốc."},
  {n:"Xin thuốc với cớ mình đau",wx:"có thuốc mà không tốn bạc",lx:"thái y biết ngươi không đau",rt:"Thái y kê đơn cho ngươi, ngươi gửi thuốc đi.",rf:"Thái y nói thuốc này không dành cho bệnh của ngươi."},
  {n:"Dùng thuốc thường",wx:"không phải xin ai",lx:"thuốc thường chậm",rt:"Ngươi gửi đi mấy gói thuốc thường."}]},
 c2:{h:"Người mang thuốc",w:"maid",t:"Thuốc có rồi, phải có người mang lên ải trong hạn. Đường lên Nhạn Môn mùa này có cướp.",o:[
  {n:"Gửi người nhà của {maid}",wx:"người tin được",lx:"người nhà {maid} gặp nạn",rt:"Anh trai {maid} đưa thuốc đến nơi.",rf:"Anh trai {maid} bị cướp giữa đường, thuốc mất một nửa."},
  {n:"Thuê tiêu cục",wx:"đi chắc",lx:"tiêu cục ghi sổ người gửi",rt:"Tiêu cục giao thuốc đúng hẹn."},
  {n:"Nhờ đoàn quân lương",wx:"đi theo đường quan",lx:"quan quân lương hỏi gửi ai",rt:"Thuốc đi trong rương quân lương.",rf:"Quan quân lương không nhận đồ riêng."}]},
 c3:{h:"{foe} biết em bị thương",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} sai người đến hỏi thăm ngươi, mang theo một hộp thuốc trị thương rất quý. Không ai rõ trong hộp là thuốc hay độc.",o:[
  {n:"Nhận, đem cho thái y nghiệm",wx:"biết lòng {foe}",lx:"{foe} biết ngươi nghi nàng",go:(A,ok,G)=>{if(!ok)rdOan(A,"foe",G[0])},rt:"Thuốc thật. Ngươi không biết nàng tốt bụng hay muốn dò ngươi.",rf:"Thái y nghiệm ra một vị lạ."},
  {n:"Trả lại, cảm ơn",wx:"không mắc nợ nhà {foed}",lx:"{foe} biết ngươi có người cần thuốc",rt:"{foe} nhận lại hộp, mỉm cười."},
  {n:"Hỏi thẳng nàng muốn gì",wx:"nghe được giá của nhà {foed}",lx:"nàng không nói, còn cười",go:(A,ok,G)=>{rdOan(A,"foe",ok?G[0]:G[1])},rt:"{foe} nói: “Cha ta muốn em ngươi rời quân ngũ. Thế thôi.”",rf:"{foe} cười: “Ta chỉ hỏi thăm.”"}]},
 c4:{h:"Thư của phủ {foed}",w:"maid",if:A=>!rv67(A,"foe"),t:"Một lá thư không ký tên của phủ {foed} đến cung ngươi: “Em ngươi rời quân ngũ thì sống. Còn cầm đao thì không.”",o:[
  {n:"Giữ thư làm chứng",f:"proof",wx:"có chữ của phủ {foed}, dùng được đến ngày xét sớ cuối",lx:"giữ thư là giữ lửa",go:()=>{RD_FL("td_song.proof",1)},rt:"Lá thư nằm trong hộp khóa."},
  {n:"Đưa thư cho lão quan bộ Lễ",wx:"có người trong triều biết",lx:"lão quan sợ",rt:"Lão quan đọc, tay run, rồi cất kỹ.",rf:"Lão quan trả lại thư, không dám giữ."},
  {n:"Đốt",wx:"không sợ dọa",lx:"mất chứng",rt:"Lá thư cháy trong lò hương."}]},
 t1:{h:"Ai ký lệnh",w:"maid",t:"Lệnh đẩy đội em lên đồn trơ trọi do một Lang trung Binh bộ ký, kẻ mà ai cũng biết là môn khách của {foed}.",o:[
  {n:"Chép lại lệnh làm chứng",f:"proof",wx:"có bản chép lệnh, dùng được đến ngày xét sớ cuối",go:(A,ok)=>{if(ok)RD_FL("td_song.proof",1)},lx:"người chép bị bắt",rt:"Bản chép lệnh về tay ngươi.",rf:"Sổ lệnh đã bị sửa."},
  {n:"Nhớ tên, chờ dịp",wx:"không lộ ý",lx:"hắn còn ký lệnh khác",rt:"Ngươi ghi tên hắn vào sổ riêng."},
  {n:"Nhờ phó tướng xin rút đội em",wx:"em được rút về",lx:"phó tướng bị nói là chống lệnh",rt:"Đội em được rút về hậu doanh.",rf:"Phó tướng bị khiển trách."}]},
 x1:{h:"Ngày thứ ba mươi",w:"maid",t:"Đã gần hết hạn một tháng. Tin cuối cùng từ ải: vết thương của em sưng đỏ, quân y đang chờ thuốc.",o:[
  {n:"Gửi thêm một chuyến thuốc tốt nhất",e:["win","lose"],rt:"Thuốc đến kịp. Quân y nói em giữ được cả cánh tay.",rf:"Thuốc đến chậm hai ngày."},
  {n:"Xin Hoàng thượng cho em về kinh chữa",e:["win","lose"],rt:"Hoàng thượng cho một xe ngựa đưa thương binh về kinh, có tên em.",rf:"Hoàng thượng nói thương binh nào cũng là con dân, không thể riêng một người."},
  {n:"Tin vào quân y và số mệnh",e:["mid","lose"],lx:"không còn gì để làm",rt:"Em qua cơn sốt, nhưng tay yếu đi.",rf:"Em qua cơn sốt, nhưng mất sức cầm đao."}]}},
 E:{win:{tag:"Em giữ được cánh tay",w:"maid",t:"Em lành vết thương, cầm đao lại được. Em viết: “Tỷ, đệ nợ tỷ một cánh tay.” Kẻ ký lệnh ở Binh bộ biết đã có người nhìn thấy hắn."},
  mid:{tag:"Em sống, tay yếu đi",t:"Em qua khỏi, nhưng tay phải không còn khỏe như xưa. Em được chuyển sang giữ kho."},
  lose:{tag:"Thuốc đến muộn",t:"Em sống, nhưng không còn cầm đao được. Em bị đưa khỏi đội, làm người giữ ngựa. Nhà {foed} đã lấy được một phần thứ họ muốn."}}});

rdDef("td_song",9,{t:"Đổi tên",w:"eun",sj:"tờ hộ tịch của em",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Cái tên Tiểu Thạch đã bị quá nhiều người nhắc. Cuối năm Hộ bộ tra lại sổ đinh, ai không có hộ tịch rõ ràng sẽ bị giữ lại hỏi. Còn hai tháng: làm cho em một tờ hộ tịch mới, hoặc dám để em đứng dưới họ thật.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Em hỏi về họ thật",w:"maid",if:RDW(1),t:()=>rdEnd(4)==="r97"?"Lành vết thương, em viết: “Tỷ, chiếu đã trả đệ họ cha, mà sổ đinh nơi biên vẫn ghi Tiểu Thạch. Đệ muốn tờ hộ tịch cũng mang họ cha.”":"Lành vết thương, em viết: “Tỷ, đệ không muốn cả đời làm Tiểu Thạch. Đệ muốn mang họ cha.”",o:[
  {n:"Hứa sẽ tìm cách",f:"name",wx:"em có điều để chờ",lx:"một lời hứa nặng",rt:"Em hồi thư, nét chữ vui hẳn."},
  {n:"Khuyên em chờ thêm",f:"wait",wx:"giữ an toàn",lx:"em buồn",rt:"Em không đáp thư ấy."},
  {n:"Nhắn hỏi lão quan bộ Lễ về lệ khôi phục họ",f:"name",wx:"biết đường đi",lx:"lão quan nói ra ngoài",rt:"Lão quan nói: có công lớn thì có thể xin.",rf:()=>rdEnd(4)==="r97"?"Lão quan nói: chiếu thì có, nhưng sửa sổ đinh nơi biên chưa có lệ.":"Lão quan nói lệ ấy chưa từng có."}]},
 s2:{h:"Sổ đinh cuối năm",w:"maid",if:RDW(0),t:"Em yếu tay, không còn ở hàng lính chiến. Người làm việc ở hậu doanh phải có hộ tịch rõ, mà tờ của em là giấy mua của một lái buôn năm nào.",o:[
  {n:"Lo một tờ giấy mới",f:"paper",wx:"có giấy tạm",lx:"giấy mua thì có người bán",rt:"Lái buôn mua được một tờ hộ tịch của một người đã mất."},
  {n:"Dặn em xin về đội đồn điền",f:"wait",wx:"đồn điền ít ai tra giấy",lx:"đồn điền cực khổ",rt:"Em xin được về đồn điền.",rf:"Đội trưởng không cho em đi."},
  {n:"Chờ xem ai tra",wx:"không động khi chưa cần",lx:"mất thời gian",rt:"Ngươi chờ."}]},
 c1:{h:"Người làm giấy ở Nội vụ phủ",w:"eun",t:"{eun} nói nhỏ: Nội vụ phủ có một thư lại chuyên chép sổ đinh cho các doanh biên. Tên nào hắn chép vào thì thành người thật.",o:[
  {n:"Mua tay hắn",f:"paper",wx:"có tờ hộ tịch mới",lx:"hắn có thể bán lại cho người khác",rt:"Thư lại chép vào sổ một cái tên mới cho em."},
  {n:"Đổi bằng một ân tình",f:"paper",wx:"không tốn bạc",lx:"hắn nắm thóp ngươi",rt:"Hắn nhận lời, vì cháu hắn cần một chỗ làm trong cung ngươi.",rf:"Hắn đòi bạc trước."},
  {n:"Không dùng đường này",wx:"tay sạch",lx:"mất một đường",rt:"Ngươi lắc đầu."}]},
 c2:{h:"{v} biết chuyện giấy tờ",w:"v",need:["v"],t:"Người của {v} thấy {eun} ra vào cung ngươi nhiều lần. {v} đánh hơi được có chuyện giấy tờ.",o:[
  {n:"Cho {v} một miếng lợi khác",wx:"{v} quay sang việc khác",lx:"{v} nhận lợi mà vẫn rình",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} bận lo áo mới cho yến Trung thu.",rf:"{v} nhận lễ, vẫn sai người theo {eun}."},
  {n:"Đánh tiếng rằng ngươi lo giấy cho cháu {maid}",wx:"chuyện có cớ",lx:"cớ yếu",rt:"{v} nghe xong, chán, bỏ đi.",rf:"{v} tìm đến tận nhà {maid}."},
  {n:"Ngừng một thời gian",wx:"{v} mất dấu",lx:"hạn sổ đinh không chờ",rt:"Ngươi bảo {eun} thôi qua lại."}]},
 c3:{h:"Họ thật",w:"emp",if:A=>A.f.name,t:"Có một đường khác: xin Hoàng thượng cho em lấy lại họ cha nhờ công trận. Lời xin ấy sẽ nhắc cả triều nhớ đến án cũ.",o:[
  {n:"Thăm dò ý Hoàng thượng",f:"own",wx:"biết ngài có mở lòng không",lx:"ngài không vui khi nghe nhắc án tiên đế",rt:"Hoàng thượng nói: “Có công thì có thưởng. Họ là chuyện nhỏ.”",rf:"Hoàng thượng đổi sắc mặt."},
  {n:"Nhờ lão quan bộ Lễ dâng sớ trước",f:"own",wx:"không phải ngươi mở lời",lx:"lão quan bị đàn hặc",rt:"Sớ của lão quan được đọc mà không ai phản đối.",rf:"Môn khách nhà {foed} đàn hặc lão quan."},
  {n:"Gác lại",wx:"không động vào án cũ",lx:"em buồn",rt:"Ngươi cất chuyện ấy đi."}]},
 t1:{h:"Tờ giấy bị nghi",w:"eun",t:"Hộ bộ gửi tờ hỏi về doanh của em: có một người tên trong sổ mà không có quê gốc rõ. Hạn trả lời là mười ngày.",o:[
  {n:"Lo cho người quê đứng ra nhận",wx:"có người làm chứng quê",lx:"người nhận bị hỏi vặn",rt:"Một lão nông nhận em là cháu.",rf:"Lão nông khai lắp bắp."},
  {n:()=>TDSW()?"Bảo em xin ra trận lập công":"Bảo em xin theo đoàn tải lương ra tiền tuyến",f:"brave",wx:"người có công thì ít ai tra",lx:()=>TDSW()?"em vừa lành vết thương":"tay em còn yếu, đường tải lương có giặc",rt:()=>TDSW()?"Em ra trận, về với một đầu giặc.":"Em giữ trọn kho lương giữa trận, có tên trong sổ công.",rf:()=>TDSW()?"Em bị giữ lại hỏi trước khi ra trận.":"Em bị giữ lại hỏi trước khi theo đoàn."},
  {n:"Để Nội vụ phủ giải thích",if:A=>A.f.paper,wx:"sổ Nội vụ phủ khớp",lx:"thư lại nắm thêm một bí mật",rt:"Thư lại đưa sổ ra, mọi dòng đều khớp."}]},
 x1:{h:"Tờ giấy đóng ấn",w:"emp",t:"Sổ đinh cuối năm đóng lại. Tên nào trong sổ thì thành người thật. Em sẽ đứng dưới cái tên nào?",o:[
  {n:"Tên mới, sạch sẽ",e:["win","lose"],rt:"Tên mới của em được đóng ấn Hộ bộ. Tiểu Thạch không còn trên đời.",rf:"Thư lại bị bắt vì chép sổ sai, tên em bị khoanh lại."},
  {n:"Họ cha, nhờ công trận",e:["win","lose"],rt:"Hoàng thượng phê: “Lính có công, cho về họ cũ.” Em mang lại họ cha.",rf:"Hoàng thượng bác: “Án tiên đế, không bàn.”"},
  {n:"Giữ tên Tiểu Thạch",e:"mid",lx:"cái tên đã bị nhiều người nhắc",rt:"Em vẫn là Tiểu Thạch, như mọi năm."}]}},
 E:{win:{tag:"Em có một cái tên đứng được",w:"emp",t:"Dù là tên mới hay họ cha, cái tên ấy có ấn Hộ bộ. Từ nay muốn tra em, phải tra qua một tờ giấy thật."},
  mid:{tag:"Vẫn là Tiểu Thạch",t:"Em giữ cái tên cũ. Không ai tra thêm, nhưng ai muốn tìm thì vẫn tìm được."},
  lose:{tag:"Giấy tờ bị tra",t:"Tên em bị khoanh lại, em bị giữ ở doanh chờ xét. Nhà {foed} có thêm một cớ.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}}}});

rdDef("td_song",10,{t:"Đưa em về",w:"emp",sj:"chỗ đứng của em",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Giặc Bắc tạm lui, các doanh biên đổi phiên. Có thể xin cho em về cấm quân ở kinh: gần ngươi, mà cũng gần nhà {foed}. Hoặc giữ em ở ải xa, yên mà cách biệt. Chọn chỗ cho em đứng trước khi người khác chọn thay.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Có tên rồi, có thể về",w:"emp",if:RDW(1),t:()=>TDSW()?"Em có tên đứng được, có công trận. Thống lĩnh cấm quân đang tìm người trẻ có công ở biên để bổ vào hàng thị vệ.":"Em có tên đứng được, có công trận, dù tay không còn cầm đao. Thống lĩnh cấm quân đang tìm người có công ở biên để coi ngựa, giữ kho cho cấm quân.",o:[
  {n:"Tiến cử em qua phó tướng",f:"home",wx:"tên em đến tai thống lĩnh",lx:"phó tướng không muốn mất người",rt:"Phó tướng viết thư tiến cử.",rf:"Phó tướng muốn giữ em ở lại."},
  {n:"Gửi lễ cho thống lĩnh",f:"home",wx:"thống lĩnh để ý tên em",lx:"thống lĩnh biết có người trong cung lo cho em",rt:"Thống lĩnh nhận lễ, hứa xem xét."},
  {n:"Hỏi em muốn gì",f:"ask",wx:"em được tự chọn",lx:"em chọn điều ngươi không muốn",rt:"Em viết: “Đệ muốn gần tỷ, nhưng ở ải đệ mới là người.”"}]},
 s2:{h:"Ở xa mà vẫn bị tìm",w:"emp",if:RDW(0),t:"Em vẫn ở ải, nhưng ai muốn tìm em đều tìm được. Lão quan bộ Lễ khuyên: người ở gần ngự giá thì khó bị hại hơn người ở xa.",o:[
  {n:"Nghe lão, tìm đường cho em về kinh",f:"home",wx:"mở được một đường",lx:"Hoàng thượng thấy ngươi lo cho người ngoài",rt:"Hoàng thượng hỏi tên người lính, rồi ghi nhớ.",rf:"Hoàng thượng không để tâm."},
  {n:"Đưa em vào Nam, xa hẳn nhà {foed}",f:"far",wx:"em xa mọi tai mắt",lx:"xa cả ngươi",rt:"Em theo đoàn đổi phiên vào Nam."},
  {n:"Để em tự xin",f:"ask",wx:"em tự chọn đường",lx:"không có ai đỡ",rt:"Em xin ở lại ải."}]},
 c1:{h:"Nhà {foed} chờ ở kinh",w:"maid",t:"{maid} nghe tin: nhà {foed} đã gài người vào cấm quân. Em về kinh là về trong tầm tay họ.",o:[
  {n:"Dò tên người được gài",f:"know",wx:"biết ai phải tránh",lx:"kẻ được gài biết bị dò",rt:"Hai thị vệ trong cấm quân là cháu họ {foed}.",rf:"Không ai chịu nói."},
  {n:"Lo cho em về đội khác",wx:"em ở đội không có người nhà {foed}",lx:"tốn bạc",rt:"Em được xếp vào đội giữ cửa Đông."},
  {n:"Tin em tự giữ mình",wx:"em là lính, không phải trẻ con",lx:"em một mình giữa người lạ",rt:"Ngươi dặn em ba điều, rồi thôi."}]},
 c2:{h:"{foe} cầu hòa",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} đến cung ngươi một mình: “Cha ta già rồi. Ông chỉ sợ em ngươi về kinh đòi nợ máu. Nếu em ngươi ở yên nơi xa, nhà ta sẽ thôi.”",o:[
  {n:"Đòi nàng thề trước Phật",f:"truce",wx:"một lời thề có người chứng",lx:"nàng thề rồi vẫn sợ cha",go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1])},rt:"{foe} thề ở Phụng Tiên điện.",rf:"{foe} nói: “Ta thề thay cha được sao?”"},
  {n:"Từ chối: em đi đâu là quyền của em",wx:"không cúi đầu với nhà {foed}",lx:"nhà {foed} thấy không còn đường hòa",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"{foe} lặng lẽ ra về."},
  {n:"Nhận lời, nhưng không hứa chắc",wx:"nhà {foed} chùn tay một thời gian",lx:"{foe} biết ngươi nói nước đôi",rt:"{foe} gật đầu, như trút được gánh nặng.",rf:"{foe} nhìn ngươi, không tin."}]},
 c3:{h:"Phủ {foed} dọa",w:"maid",if:A=>!rv67(A,"foe"),t:"Không còn con gái làm người nói giúp, phủ {foed} cho người đến tận quê ngoại ngươi, hỏi về một ngôi mộ mới.",o:[
  {n:"Cho người canh mộ",wx:"mộ phần yên",lx:"tốn bạc",rt:"Hai người canh mộ được trả công cả năm."},
  {n:"Nhắn lão quan bộ Lễ",wx:"có quan biết chuyện",lx:"lão quan không đủ sức",rt:"Lão quan cho nha lại quê ngoại để ý.",rf:"Lão quan thở dài."},
  {n:"Không để họ khiêu khích",wx:"không mắc mồi",lx:"họ thấy ngươi im",rt:"Ngươi không động."}]},
 t1:{h:"Thử lòng ở thao trường",w:"emp",t:()=>TDSW()?"Hoàng thượng đi xem thao trường, các thị vệ mới đấu võ. Nếu em có tên trong danh sách, ngài sẽ thấy em tận mắt.":"Hoàng thượng đi xem thao trường, các thị vệ mới đấu võ. Em không còn cầm đao, chỉ dắt ngựa bên rìa thao trường; ngài đi qua là thấy em tận mắt.",o:[
  {n:"Xin theo ngự giá xem",f:"seen",wx:"ngài thấy em bên cạnh ngươi",lx:"ngài thấy hai gương mặt giống nhau",rt:()=>TDSW()?"Hoàng thượng khen một người lính trẻ đánh đẹp.":"Hoàng thượng dừng lại hỏi người dắt ngựa có vết tên ở vai.",rf:"Hoàng thượng nhìn em, rồi nhìn ngươi."},
  {n:()=>TDSW()?"Dặn em đừng đấu":"Dặn em đổi phiên hôm ấy",wx:"em không bị ai để ý",lx:"em mất dịp",rt:()=>TDSW()?"Em xin lui vì vết thương cũ.":"Em đổi phiên, hôm ấy ở lại chuồng ngựa."},
  {n:"Không đi",wx:"không ai thấy ngươi bận tâm",lx:"không biết em ra sao",rt:"Ngươi ở cung chép kinh."}]},
 x1:{h:"Chỗ đứng của em",w:"emp",t:"Binh bộ trình danh sách đổi phiên. Một dòng có tên em, để trống chỗ đến. Hoàng thượng hỏi ngươi: “Nghe nói nàng biết người lính này?”",o:[
  {n:"Thưa: xin cho y về cấm quân",e:["win","lose"],rt:()=>TDSW()?"Hoàng thượng viết vào chỗ trống: “Cấm quân, cửa Đông.”":"Hoàng thượng viết vào chỗ trống: “Cấm quân, coi ngựa ở cửa Đông.”",rf:"Hoàng thượng viết: “Đồn Ngọc Lĩnh.” Nơi xa nhất."},
  {n:"Thưa: y nên ở lại ải",e:["mid","lose"],rt:"Em ở lại Nhạn Môn, dưới trướng người quen.",rf:"Em bị điều sang một đồn xa không ai quen."},
  {n:"Thưa: thiếp không biết",e:["mid","lose"],rt:"Hoàng thượng để Binh bộ tự xếp. Em ở lại ải.",rf:"Binh bộ, có người nhà {foed}, xếp em đi xa."}]}},
 E:{win:{tag:"Em về kinh",w:"emp",t:()=>(TDSW()?"Em về cấm quân, giữ cửa Đông. Mỗi tháng có một ngày em đứng gác gần cung ngươi.":"Em về cấm quân, coi ngựa ở cửa Đông. Mỗi tháng có một ngày em dắt ngựa qua gần cung ngươi.")+" Hai chị em chưa thể nhận nhau, nhưng đã thấy nhau."},
  mid:{tag:"Em ở lại ải",t:"Em ở lại biên ải, yên ổn mà xa. Thư vẫn đi, mỗi mùa một lá."},
  lose:{tag:"Em bị điều đi xa",t:"Em bị điều đến một đồn xa tít, thư đi ba tháng mới tới. Nhà {foed} đã chọn chỗ cho em thay ngươi.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}}}});

rdDef("td_song",11,{t:"Máu mủ",w:"emp",sj:"em trai út của ngươi",cast(A){const e=foe67();if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"{foed} dồn sức cho nước cuối: dâng sớ rằng con trai tội thần cầm binh là mầm loạn, xin bắt về tra. Lần này không giấu được nữa. Ngươi không được bước vào triều; lời ngươi chỉ đến ngự án bằng tờ tấu, bằng người ngoài cung, và bằng lúc Hoàng thượng hỏi riêng. Nhận em, đưa em đi đường em, hay để em tự đứng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tờ sớ cuối cùng",w:"emp",if:RDW(1),t:"Em mới về kinh được nửa năm thì {foed} dâng sớ: con trai tội thần ở trong cấm quân, sát hậu cung, là mầm họa. Cả triều chờ xem cung ngươi có động tĩnh gì.",o:[
  {n:"Dâng tấu: em là người có công",f:"claim",wx:"ngự án có một lời thật",lx:"tự nhận là chị của tội thần",rt:"Hoàng thượng đọc tấu, không phê, nhưng giữ lại bên mình.",rf:"Tấu bị trả về với một chữ: “Biết.”"},
  {n:"Im lặng, để lão quan bộ Lễ tâu",f:"elder",wx:"không phải ngươi lên tiếng",lx:"lão quan một mình",rt:"Lão quan đứng ra giữa triều, giọng run mà rõ."},
  {n:"Cho em xin đổi về ải",f:"away",wx:"tờ sớ mất cớ",lx:"em rời kinh",rt:"Em xin lui, tờ sớ yếu đi một nửa."}]},
 s2:{h:"Bắt về tra",w:"emp",if:RDW(0),t:"{foed} dâng sớ: tên lính ở biên là con trai tội thần, cầm binh là mầm loạn, xin bắt về kinh tra hỏi. Lệnh bắt chưa ký, nhưng đã nằm trên ngự án.",o:[
  {n:"Báo em chuẩn bị",f:"away",wx:"em có thời gian",lx:"báo tin là đi trước lệnh vua",rt:"Em được tin trước ba ngày.",rf:"Tin đến cùng lúc với lệnh."},
  {n:"Gặp Hoàng thượng trước khi ký",f:"claim",wx:"ngài nghe ngươi trước",lx:"ngài thấy ngươi biết quá sớm",rt:"Hoàng thượng gác lệnh lại, chờ nghe thêm.",rf:"Hoàng thượng hỏi: “Ai báo nàng?”"},
  {n:"Gom chứng nhà {foed} hại em",f:"proof",wx:"có lệnh đẩy em lên tuyến đầu",lx:"người gom bị lộ",rt:"Bản chép lệnh Binh bộ năm trước về tay ngươi.",rf:"Sổ lệnh đã bị sửa."}]},
 c1:{h:"Phó tướng dâng sớ",w:"emp",t:"Phó tướng, nay đã là Tổng binh, viết thư hỏi: có nên dâng sớ bảo lãnh cho em không. Bảo lãnh thì y mất phần lớn tiếng nói trong triều.",o:[
  {n:"Xin y bảo lãnh",f:"ally",wx:"em có một tướng đứng ra",lx:"y mang nợ ngươi",rt:"Sớ bảo lãnh của Tổng binh đến kinh.",rf:"Sớ của y bị Binh bộ giữ lại."},
  {n:"Khuyên y đứng ngoài",wx:"y giữ được mình",lx:"em thiếu một tiếng nói",rt:"Y hồi thư: “Có việc gì, ta vẫn ở đây.”"},
  {n:"Gửi lễ cảm tạ y",wx:"tình nghĩa giữ được",lx:"tốn bạc",rt:"Y nhận lễ, hứa giữ em nếu em về ải."}]},
 c2:{h:"{foe} đứng ở đâu",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} nhắn: nàng biết cha sẽ dâng tờ sớ ấy, và nàng không ngăn nổi. Nàng hỏi ngươi có muốn nàng nói gì khi Hoàng thượng hỏi đến không.",o:[
  {n:"Xin nàng nói một lời công bằng",f:"foeword",wx:"con gái {foed} nói giúp em",lx:"nàng không dám",go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1])},rt:"Khi Hoàng thượng hỏi, {foe} tâu: “Kẻ cứu phó tướng không phải mầm loạn.”",rf:"{foe} cúi đầu, không nói."},
  {n:"Bảo nàng đứng ngoài",wx:"không mắc nợ nhà {foed}",lx:"mất một lời nói",rt:"{foe} gật đầu."},
  {n:"Đòi nàng khuyên cha rút sớ",wx:"tờ sớ có thể bị rút",lx:"nàng thấy bị ép",go:(A,ok,G)=>{if(ok)rdRel(A,"foe",G[0]);else rdOan(A,"foe",G[1])},rt:"{foe} về phủ. Hôm sau {foed} cáo bệnh.",rf:"{foe} nói: “Ngươi tưởng ta nói được với cha sao?”"}]},
 c3:{h:"{v} thêm dầu",w:"v",need:["v"],t:"{v} nhân dịp ấy nói khắp hậu cung rằng ngươi giấu một người thân tội thần bên cạnh ngự giá.",o:[
  {n:"Đến gặp {v}, cảnh cáo",wx:"{v} im",lx:"{v} càng nói",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} thôi không nhắc.",rf:"{v} kể lại lời cảnh cáo, thêm mắm muối."},
  {n:"Dùng điều ngươi biết về {v}",wx:"{v} có điều phải giữ",lx:"lộ rằng ngươi giữ thóp người",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"{v} tái mặt, lánh mặt ngươi.",rf:"{v} đi kể khắp hậu cung."},
  {n:"Mặc kệ",wx:"không đôi co",lx:"lời đồn lan",rt:"Ngươi để lời đồn tự tắt."}]},
 t1:{h:"Đêm trước ngày xét sớ",w:"maid",t:()=>rdEnd(10)==="win"?"Đêm trước ngày tờ sớ được xét, em xin gặp ngươi lần đầu sau ngần ấy năm, ở cửa Đông, chỉ một khắc.":"Em bị gọi về kinh chờ xét sớ. Đêm trước ngày tờ sớ được xét, em xin gặp ngươi lần đầu sau ngần ấy năm, ở cửa Đông, chỉ một khắc.",o:[
  {n:"Đi gặp em",f:"meet",wx:"hai chị em nói được với nhau",lx:"có người thấy",rt:"Em quỳ xuống. Ngươi kéo em dậy. Một khắc ngắn như một hơi thở.",rf:"Thị vệ đổi phiên bắt gặp."},
  {n:"Gửi {maid} mang lời",wx:"không ai bắt được gì",lx:"không nhìn được mặt em",rt:"{maid} mang về một câu: “Đệ không sợ.”"},
  {n:"Không gặp",wx:"giữ kín đến cùng",lx:"em đứng chờ cả khắc",rt:"Em đứng chờ, rồi về."}]},
 x1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Tan buổi chầu, Hoàng thượng đến cung ngươi, tờ sớ của {foed} trong tay áo: “Người lính ấy là ai của nàng?”",o:[
  {n:"Quỳ nhận em, dâng hết công trận",e:["win","lose"],rt:"Hoàng thượng im rất lâu, rồi nói: “Trẫm tin bản ghi công của y hơn tờ sớ.”",rf:"Hoàng thượng phẩy tay: “Giấu trẫm ngần ấy năm.”"},
  {n:"Xin cho em ra biên lập công chuộc tên",e:["mid","lose"],rt:"Hoàng thượng chuẩn: em ra biên, công đến đâu, tên sạch đến đấy.",rf:"Hoàng thượng chuẩn cho em đi, nhưng không nói gì đến tên."},
  {n:"Đưa chứng nhà {foed} hại em",e:["win","lose"],go:(A,ok,G)=>{rdOan(A,"foe",ok?G[0]:G[1])},rt:"Hoàng thượng mang lệnh đẩy em lên tuyến đầu ra triều hỏi. {foed} cứng họng.",rf:"Chứng cứ bị nói là dựng lại. Ngươi bị coi là trả thù riêng."}]}},
 E:{win:{tag:"Chị em đoàn tụ",w:"emp",t:()=>(rdEnd(10)==="win"?"Em ở lại kinh":"Em được gọi về kinh, ở lại hẳn")+(rdEnd(9)==="win"?", đứng dưới một cái tên có ấn Hộ bộ":", Hoàng thượng cho ghi tên em vào sổ Hộ bộ")+", và từ nay không ai dám bắt em vì tội của cha. Mỗi dịp lễ, em được vào thỉnh an chị. Hoàng thượng nói: “Nhà nàng còn một người đàn ông tốt.”",go:(_A,G)=>e67bien(G[0])},
  mid:{tag:"Em theo quân phương xa",t:"Em ra biên, mang theo lời hứa của Hoàng thượng. Xa, nhưng sống, và đang tự làm sạch cái tên của mình."},
  lose:{tag:"Lạc mất em lần nữa",t:"Em bị điều đi, rồi thư thưa dần, rồi không còn thư. Người ta nói em đã đổi tên lần nữa, đi về phía Nam. Ngươi vẫn sống trong cung, chỉ là thiếu đi một người để chờ thư."}}});
RD97L.push(rdRare({a:"td_song_11",tag:"Em lập công, rửa tên cha",w:"emp",n:"Xin Hoàng thượng đọc lại án cũ của cha, nhân công trận của em",
 path:["Dâng tấu: em là người có công","Gom chứng nhà {foed} hại em","Xin y bảo lãnh","Xin nàng nói một lời công bằng","Đến gặp {v}, cảnh cáo","Đi gặp em"],bad:["Không gặp","Mặc kệ","Bảo nàng đứng ngoài"],x:[()=>S.sung>=RR("td_song_11").bar,"Sủng từ "+RR("td_song_11").bar],
 t:"Ngươi không xin cho em. Ngươi xin cho cha. Hoàng thượng hạ chỉ cho Tam ty gồm Hình bộ, Ngự sử đài và Đại Lý tự xét lại án cũ: nét ấn giả, lời tâu của {foed}, và bản ghi công của người lính đã cõng phó tướng ra khỏi vòng vây. Xét xong, ngự phê ban xuống: Thị lang bộ Lễ năm ấy bị oan, được truy phục chức tước; con trai út được mang lại họ cha, phong Hiệu úy. Hai chị em quỳ trước bài vị cha, lần đầu không phải giấu.",
 go:(_A,G)=>{S.avenged=true;return e67bien(G[0])},rw:"bienngu",ti:"Người rửa tên cho cha"}));
/* ---------- td_tha · Thù hay tha ---------- */
/* BAL.road.td_tha = {} (no chapter constants: deadlines are told in text like tt_oan .6).
   The enemy pair: {foe} = S.foe (the enemy consort) and {foed} = S.foeDad (her father). .4 (j67 td_tha) ends: win / r97 = {foe} made an ally
   (enemy=false, so foe67() is null while she is still in the palace), {foed} confessed; win2 = {foe} sent to lãnh cung (out), {foed} judged;
   mid = she let it go; lose = she accused and failed (thù dai). cast() therefore finds {foe} by S.foe (alive, not out) and puts her in
   A.act.foe: rv67(A,"foe") / rdRel(A,"foe",n) / rdOan(A,"foe",n) work in every state and do nothing when she is gone.
   Beats where {foe} acts in person carry if:A=>!!rv67(A,"foe"); each has a sibling beat for {foe} gone (lãnh cung / dead): letters, her
   mother, {foed}'s house. {v} = a third consort (real rival) whose house wants the ruin of {foed}'s house. */
rdDef("td_tha",5,{t:"Búp bê trù ếm",w:"foe",sj:"vụ búp bê trù ếm",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:()=>(TDFD()?"Người ta tìm thấy một con búp bê trù ếm trong rương đồ cũ của {foe}, người đã khuất, trên ngực ghi ngày sinh của Hoàng thượng.":"Người ta tìm thấy một con búp bê trù ếm trong chỗ ở của {foe}, trên ngực ghi ngày sinh của Hoàng thượng.")+" Kẻ tố là {v}. Cả cung chờ xem con gái nhà bị hại sẽ nói gì về con gái kẻ đã hại.",
 p:[["s1","s2","s3","s4","s5"],["c1","c2","c3","c4"],["t1"],["x1"]],
 B:{s1:{h:"Người tự thú được giảm tội",w:"foe",if:A=>/^(win|r97)$/.test(rdPrev())&&!!rv67(A,"foe"),t:"Từ ngày {foe} khuyên cha tự thú, {foed} chỉ bị giáng chức, vì người tự thú được giảm tội. Đêm qua {foe} sai người báo: có kẻ muốn nàng chết thay cha.",o:[
  {n:"Đến gặp nàng ngay trong đêm",f:"mercy",wx:"biết trước kẻ muốn hại nàng",lx:"có người thấy ngươi ra vào cung nàng",go:(A,ok,G)=>{if(ok)rdRel(A,"foe",G[0])},rt:"{foe} nắm tay ngươi: “Người của {v} đã vào cung ta hai lần.”",rf:"Ngươi đến muộn, nàng đã tắt đèn, cửa cung có người canh."},
  {n:"Gửi người canh cung nàng",f:"mercy",wx:"không ai lén vào được nữa",lx:"tốn bạc, và cả cung biết ngươi che nàng",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Hai thái giám của ngươi đứng gác ngoài cung nàng."},
  {n:"Đứng ngoài, chờ xem",f:"watch",wx:"không dính vào",lx:"{foe} thấy ngươi bỏ mặc",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Ngươi tắt đèn đi ngủ."}]},
 s2:{h:"Búp bê dưới gối lãnh cung",w:"v",if:A=>!TDFD()&&(rdPrev()==="win2"||!rv67(A,"foe")),t:"{foe} đã vào lãnh cung, {foed} bị giam chờ kỳ thu thẩm. Vậy mà {v} vẫn chưa buông: người của nàng vừa tìm thấy một con búp bê dưới gối {foe} trong lãnh cung. Có tội này, kẻ ở lãnh cung khó giữ được mạng.",o:[
  {n:"Cho người vào lãnh cung hỏi",f:"mercy",wx:"nghe được lời của {foe}",lx:"có người thấy ngươi dính đến lãnh cung",rt:"Cung nữ lãnh cung kể: hôm ấy có người của {v} mang chăn mới đến.",rf:"Người canh lãnh cung không cho vào."},
  {n:"Mặc, thù nhà ngươi đã trả",f:"hate",wx:"không dính đến lãnh cung",lx:"để kẻ khác giết người thay ngươi",rt:"Ngươi không nhắc đến lãnh cung nữa."},
  {n:"Hỏi {v} vì sao chưa buông",wx:"biết {v} muốn gì",lx:"{v} biết ngươi để ý",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} cười: “Cha nàng còn sống ngày nào, nhà ta chưa yên ngày ấy.”",rf:"{v} không đáp."}]},
 s5:{h:"Búp bê trong rương người đã khuất",w:"v",if:A=>!rv67(A,"foe")&&TDFD(),t:"{foe} đã khuất, {foed} bị giam chờ kỳ thu thẩm. Vậy mà {v} vẫn chưa buông: người của nàng tìm thấy búp bê trong rương đồ cũ của {foe} trả về phủ. Có tội này, nhà {foed} khó mong được giảm tội.",o:[
  {n:"Cho người hỏi ai đã mở rương",f:"probe",wx:"biết ai đặt búp bê vào rương",lx:"có người thấy ngươi dính vào vụ án",rt:"Gia nhân phủ {foed} kể: trước hôm ấy có người của {v} đến xem rương.",rf:"Gia nhân phủ {foed} đóng cửa không nói."},
  {n:"Mặc, thù nhà ngươi đã trả",f:"hate",wx:"không dính vào vụ án",lx:"để kẻ khác bôi nhọ người đã khuất",rt:"Ngươi không nhắc đến chuyện ấy nữa."},
  {n:"Hỏi {v} vì sao chưa buông",wx:"biết {v} muốn gì",lx:"{v} biết ngươi để ý",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} cười: “Cha nàng còn sống ngày nào, nhà ta chưa yên ngày ấy.”",rf:"{v} không đáp."}]},
 s3:{h:"Buông rồi mà không ai tin",w:"maid",if:A=>!/^(win|r97|win2|lose)$/.test(rdPrev()),t:"Ngươi đã đốt thư, buông thù. Nhưng nhà {foed} không tin, còn {v}, kẻ chờ hai nhà cắn nhau, đã sốt ruột. Búp bê được tìm thấy đúng lúc ấy.",o:[
  {n:"Gửi lời cho {foe}: không phải ta",f:"mercy",wx:"{foe} tin ngươi",lx:"lời nhắn lọt ra ngoài",go:(A,ok,G)=>{if(ok)rdRel(A,"foe",G[0])},rt:"{foe} nhắn lại: “Ta biết.”",rf:"{foe} không đáp."},
  {n:"Giữ cửa cung, không nói gì",wx:"không ai bắt được lời",lx:"người ta đoán thay ngươi",rt:"Cửa cung ngươi đóng ba ngày."},
  {n:"Cho người dò ai dựng chuyện",f:"probe",wx:"có manh mối",lx:"người dò bị bắt gặp",rt:"Vải búp bê là gấm Thục, năm nay chỉ phát cho ba cung.",rf:"Không ai chịu nói."}]},
 s4:{h:"Ánh mắt đổ về cung ngươi",w:"maid",if:()=>rdPrev()==="lose",t:"Cả cung vẫn gọi ngươi là kẻ thù dai. Nên khi búp bê được tìm thấy chỗ {foe}, ánh mắt đầu tiên đổ về cung ngươi, không phải cung {v}.",o:[
  {n:"Tự xin Thận hình ty khám cung mình",wx:"tay sạch trước mặt mọi người",lx:"khám ra một món không phải của ngươi",rt:"Thận hình ty khám ba canh, không thấy gì.",rf:"Thận hình ty tìm thấy một gói vải lạ, không ai nhận."},
  {n:"Đổ ngược về {v}",f:"probe",wx:"nghi ngờ chia đôi",lx:"lại bị nói là gieo thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Có người bắt đầu hỏi sao {v} biết chỗ giấu búp bê.",rf:"Người ta bảo ngươi đổ vạ."},
  {n:"Im lặng chịu tiếng",wx:"không thêm một lời thù",lx:"tiếng thù dai nặng thêm",rt:"Ngươi chép kinh, không ra khỏi cung."}]},
 c1:{h:"Vải của búp bê",w:"maid",t:"{maid} nhận ra vải búp bê là gấm Thục, năm nay Nội vụ phủ chỉ phát cho mấy cung có phẩm cao.",o:[
  {n:"Tra sổ phát gấm",f:"probe",wx:"biết cung nào nhận gấm",lx:"quản sự Nội vụ phủ báo lại",rt:"Một tấm gấm Thục phát cho cung {v} thiếu hai thước.",rf:"Sổ phát gấm bị rách mất trang."},
  {n:"Hỏi thợ may Thượng y cục",f:"probe",wx:"có người nói ra",lx:"thợ may sợ, đi báo",rt:"Một thợ may khai đã may búp bê theo lời một cung nữ lạ.",rf:"Thợ may khóc lóc không nói."},
  {n:"Không tra",wx:"không dính vào vụ án",lx:"mất manh mối",rt:"Ngươi để việc tra cho người khác."}]},
 c2:{h:"{v} rủ ngươi làm chứng",w:"v",need:["v"],t:"{v} đến cung ngươi: “Muội chỉ cần nói đã từng thấy {foe} đốt hương lạ. Thù nhà muội, coi như trả.”",o:[
  {n:"Nhận lời",f:"hate",wx:"có {v} đứng cùng",lx:"hứa làm chứng gian",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);rdOan(A,"foe",G[1])},rt:"{v} cười, rót trà cho ngươi."},
  {n:"Từ chối thẳng",f:"mercy",wx:"không làm chứng gian",lx:"{v} thành kẻ thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đặt chén xuống: “Muội sẽ hối.”"},
  {n:"Giả nhận để dò",f:"probe",wx:"biết {v} định làm gì",lx:"{v} nhận ra ngươi dò",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} kể hết kế, cả tên cung nữ đặt búp bê.",rf:"{v} cười: “Muội tưởng ta ngốc à.”"}]},
 c3:{h:"{foe} cầu cứu",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} bị cấm túc chờ xét. Một cung nữ của nàng lén mang ra mảnh khăn: “Ta không làm. Ta chỉ còn ngươi để nhờ.”",o:[
  {n:"Nhận lời giúp",f:"mercy",wx:"{foe} có chỗ bám",lx:"người ta nói ngươi che con gái kẻ thù",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Ngươi giữ mảnh khăn."},
  {n:"Đốt khăn",f:"hate",wx:"không dính chứng",lx:"{foe} biết ngươi bỏ mặc",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"Mảnh khăn cháy trong lò hương."},
  {n:"Gửi trả khăn, không nói gì",wx:"không hứa gì",lx:"{foe} không biết ngươi nghĩ gì",rt:"{maid} trả khăn qua cửa sổ."}]},
 c4:{h:"Mẹ của {foe}",w:"maid",if:A=>!rv67(A,"foe"),t:()=>`Phu nhân nhà {foed} ${TDVAO()}, trên đường về quỳ trước cửa cung ngươi: ${TDFD()?"“Con gái ta đã khuất rồi. Xin đừng để người ta bôi nhọ cả nắm xương của nó.”":"“Con gái ta đã ở lãnh cung rồi. Xin đừng để người ta giết nó.”"}`,o:[
  {n:"Đỡ bà dậy, nghe bà nói",f:"mercy",wx:"bà kể điều {v} giấu",lx:"cả cung thấy ngươi đỡ vợ kẻ thù",rt:"Bà kể: người nhà {v} đã đến xin cưới hỏi với họ mình trước vụ búp bê."},
  {n:"Đóng cửa không tiếp",f:"hate",wx:"không mềm lòng",lx:"bà quỳ đến chiều",rt:"Bà quỳ đến chiều rồi được đưa ra cửa cung."},
  {n:"Sai người đưa bà về, gửi lễ",wx:"giữ lễ",lx:"không nghe được gì",rt:"Phu nhân nhận lễ, khóc mà về."}]},
 t1:{h:"Người may búp bê",w:"maid",t:"Thợ may ở Thượng y cục chịu nói: nàng may búp bê theo lời một cung nữ, cung nữ ấy đeo lệnh bài của cung {v}.",o:[
  {n:"Giấu thợ may trong cung mình",f:"wit",wx:"giữ được nhân chứng",lx:"giấu người là phạm phép",rt:"Thợ may ở trong kho vải cung ngươi."},
  {n:"Đưa nàng ra Thận hình ty",f:"wit",wx:"lời khai có người ghi",lx:"lời khai bị ép đổi",rt:"Thận hình ty ghi lời khai.",rf:"Qua một đêm, thợ may đổi lời."},
  {n:"Cho nàng bạc trốn đi",wx:"nàng sống",lx:"mất nhân chứng",rt:"Thợ may ra khỏi cung trong xe rác."}]},
 x1:{h:"Lời của ngươi nặng nhất",w:"emp",t:"Hoàng thượng sai xét vụ búp bê, gọi ngươi đến hỏi: “Nhà nàng và nhà {foed} có thù. Lời nàng nặng nhất. Nàng nói đi.”",o:[
  {n:"Tâu: búp bê là bẫy",e:["win","lose"],rt:"Thợ may được gọi ra. Lệnh bài cung {v} được đặt lên án.",rf:"Thợ may không còn ở đó. Lời ngươi chỉ là lời."},
  {n:"Làm chứng theo {v}",e:["win2","lose"],rt:"Lời ngươi khớp với lời {v}. Hoàng thượng phê: phạt nặng.",rf:"Lời ngươi và lời {v} lệch nhau một chỗ, Hoàng thượng nghi cả hai."},
  {n:"Tâu: thiếp không biết",e:"mid",lx:"Hoàng thượng thấy ngươi né",rt:"Hoàng thượng giao vụ án cho Thận hình ty tự xét."}]}},
 E:{win:{tag:"Bẫy của {v} bị lật",w:"emp",t:()=>(TDFD()?"Búp bê là đồ của cung {v}. Tiếng của {foe} được giữ sạch, và nhà {foed} biết ai đã nói lời ấy.":"Búp bê là đồ của cung {v}. {foe} được tha, và nàng biết ai đã nói lời ấy.")+" {v} bị Hoàng thượng quở nặng, từ nay là kẻ thù thật của ngươi.",go:(A,G)=>{rdOan(A,"v",G[0]);rdRel(A,"foe",G[1]);const v=rv67(A,"v");return v?e67pun(v,G[2]):""}},
  win2:{tag:"Mượn tay {v} trả thù",w:"v",t:()=>(TDFD()?"Nhà {foed} bị xét nặng thêm vì tội của người con gái đã khuất.":"{foe} bị xử nặng.")+" Thù nhà ngươi trả thêm một phần, bằng tay người khác. {v} coi ngươi là người một phe, nhưng có người thì thầm ngươi làm chứng gian.",go:(A,G)=>{const e=rv67(A,"foe");rdOan(A,"foe",G[0]);rdRel(A,"v",G[1]);return e?e67drop(e,"vì vụ búp bê"):""}},
  mid:{tag:"Đứng ngoài vụ án",t:"Thận hình ty xét mãi không xong. {foe} vẫn mang tiếng chờ xét, {v} không được gì. Hai bên đều nhớ ngươi đã đứng ngoài."},
  lose:{tag:"Bị kéo vào vụ án",t:"Lời ngươi không đứng được. Hoàng thượng trách ngươi lấy thù nhà làm rối hậu cung."}}});

rdDef("td_tha",6,{t:"Đứng nhìn hay ra tay",w:"v",sj:"tờ sớ hặc nhà {foed}",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Vụ búp bê qua rồi, nhưng nhà {v} không dừng. Lần này họ dâng sớ hặc nhà {foed} ngoài triều, mời ngươi chung tay. Đứng nhìn thì nặng lòng, ra tay cứu thì mất mặt với vong linh nhà mình, ra tay đánh thì thành con dao của {v}.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"{v} không quên",w:"v",if:RDW(1),t:"Bị quở vì vụ búp bê, hoặc được ngươi giúp sức, {v} đều không quên. Nhà nàng dâng sớ hặc {foed} ăn bớt bạc tu sửa văn miếu khi còn giữ chức.",o:[
  {n:"Dò xem sớ nói thật hay giả",f:"probe",wx:"biết sớ đứng được bao nhiêu",lx:"nhà {v} biết ngươi dò",rt:"Một nửa sớ là thật, một nửa là thêm.",rf:"Không ai chịu cho xem sổ."},
  {n:"Gửi lễ cho nhà {v}",f:"hate",wx:"nhà {v} tin ngươi đứng cùng",lx:"thành người một phe với {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Nhà {v} nhận lễ, gửi lại một bản chép sớ."},
  {n:"Báo tin cho {foe}",if:A=>!!rv67(A,"foe"),f:"mercy",wx:"{foe} kịp báo cha",lx:"{v} biết ngươi báo tin",go:(A,ok,G)=>{if(ok)rdRel(A,"foe",G[0]);else rdOan(A,"v",G[1])},rt:"{foe} cúi đầu: “Ta nợ ngươi lần nữa.”",rf:"Tin ngươi báo đến tai {v} trước."}]},
 s2:{h:"Hậu cung nhìn ngươi",w:"maid",if:RDW(0),t:"Vụ búp bê khép lại không ra đầu ra đuôi. Nay nhà {v} hặc {foed} ngoài triều, và cả hậu cung chờ xem ngươi đứng về đâu.",o:[
  {n:"Ra mặt nói: việc triều do triều xét",f:"mercy",wx:"giữ phép",lx:"{v} cho là ngươi che nhà {foed}",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Lời ngươi truyền khắp hậu cung."},
  {n:"Ngầm gửi người theo phe {v}",f:"hate",wx:"có phần khi nhà {foed} ngã",lx:"tốn bạc, mang tiếng",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Nhà {v} biết ngươi đứng cùng."},
  {n:"Đóng cửa chép kinh",wx:"không ai nắm được ý ngươi",lx:"mất mặt vì im",rt:"Ngươi chép kinh bảy ngày."}]},
 c1:{h:"Phu nhân nhà {foed}",w:"maid",t:()=>`Phu nhân nhà {foed} ${TDVAO()}, trên đường về ghé cung ngươi, mang theo một chiếc hộp gỗ: văn tự mấy mẫu ruộng hương hỏa của nhà ngươi bị tịch thu năm xưa.`,o:[
  {n:"Nhận văn tự, hứa không chung tay với {v}",f:"deal",wx:"ruộng hương hỏa về tay",lx:"nhận của nhà kẻ thù",go:()=>{TDRUONG(1)},rt:"Phu nhân để hộp lại, lạy rồi đi."},
  {n:"Trả hộp, giữ lời của mình",wx:"không bán thù",lx:"mất ruộng hương hỏa",rt:"Phu nhân ôm hộp ra về, khóc không thành tiếng."},
  {n:"Nhận, nhưng không hứa gì",wx:"được ruộng mà không mất lời",lx:"phu nhân kể khắp nơi ngươi nhận của",go:(A,ok)=>{if(ok)TDRUONG(1)},rt:"Phu nhân không dám đòi lời hứa.",rf:"Phu nhân kể khắp các phủ rằng ngươi nhận văn tự."}]},
 c2:{h:"Lời ra tiếng vào",w:"maid",t:"Trong hậu cung có câu: “Con gái nhà bị hại mà đi cứu nhà kẻ hại, chẳng biết là hiền hay là ngốc.”",o:[
  {n:"Tự nói rõ: ta cứu người ngay, không cứu kẻ có tội",wx:"câu nói của ngươi thay câu cũ",lx:"người ta cười ngươi biện bạch",rt:"Câu của ngươi được nhắc nhiều hơn.",rf:"Người ta lại thêm một câu."},
  {n:"Cho người dập lời đồn",wx:"lời đồn tắt",lx:"dập không xong",rt:"Lời đồn tắt sau mười ngày.",rf:"Lời đồn lan ra Tân Giả khố."},
  {n:"Mặc người nói",wx:"không bận lòng",lx:"tiếng xấu nằm đó",rt:"Ngươi không nghe."}]},
 c3:{h:"Bằng chứng của {v}",w:"v",need:["v"],t:"{v} cho ngươi xem một tờ giấy: chữ ký của {foed} trên lệnh khám phủ nhà ngươi năm xưa. “Ta có cái này. Muội có muốn dùng không?”",o:[
  {n:"Đổi lấy tờ giấy",f:"paper",wx:"chứng cứ về tay ngươi",lx:"{v} biết ngươi cần nó",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Tờ giấy nằm trong tráp của ngươi."},
  {n:"Xin chép một bản",f:"paper",wx:"có bản chép mà không trả gì",lx:"{v} giận vì bị lấy không",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} cho chép, mặt không vui.",rf:"{v} gấp tờ giấy lại."},
  {n:"Không cần giấy của {v}",wx:"không nợ {v}",lx:"mất một chứng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cất tờ giấy, cười nhạt."}]},
 t1:{h:"Mộ phần ở quê",w:"maid",t:"Tin từ quê: mộ cha mẹ ngươi bị bỏ hoang, đất quanh mộ đã thành ruộng của một nhà họ hàng {foed}. Nhà {v} hứa trả lại đất nếu ngươi đứng tên làm chứng.",o:[
  {n:"Bỏ bạc chuộc đất mộ",wx:"mộ cha mẹ yên",lx:"tốn bạc",go:()=>{TDMO(1)},rt:"Đất mộ được chuộc, có bia mới."},
  {n:"Nhận lời nhà {v}",f:"hate",wx:"đất mộ về mà không tốn bạc",lx:"bị trói vào tờ sớ của {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);TDMO(1)},rt:"Nhà {v} sai người dựng lại bia mộ."},
  {n:"Nhờ {foe} nói với họ hàng",if:A=>!!rv67(A,"foe"),f:"mercy",wx:"đất mộ về mà không mắc nợ {v}",lx:"{foe} không nói được",go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1]);if(ok)TDMO(1)},rt:"Họ hàng {foed} trả đất, xin lỗi bằng một mâm lễ.",rf:"Họ hàng {foed} không nghe nàng."},
  {n:"Gác lại",wx:"không mắc nợ ai",lx:"mộ cha mẹ vẫn hoang",rt:"Ngươi thắp hương vọng về quê."}]},
 x1:{h:"Ý nàng ra sao",w:"emp",t:"Sớ của nhà {v} lên tới ngự án. Hoàng thượng hỏi riêng ngươi: “Nhà nàng là nhà bị hại. Ý nàng ra sao?”",o:[
  {n:"Xin xét đúng tội, không xét lan",e:["win","lose"],rt:"Hoàng thượng phê: tội ai người ấy chịu, không liên lụy vợ con.",rf:"Hoàng thượng cho là ngươi nói đỡ cho nhà kẻ thù."},
  {n:"Xin xét đến tận gốc",if:A=>!A.f.deal,e:["win2","lose"],rt:"Hoàng thượng giao Đại Lý tự xét cả nhà {foed}.",rf:"Hoàng thượng chán chuyện báo thù, gác sớ."},
  {n:"Thưa: thiếp không dám bàn việc triều",e:"mid",lx:"Hoàng thượng thấy ngươi không giúp được gì",rt:"Hoàng thượng gật đầu, tự quyết."}]}},
 E:{win:{tag:"Tội ai người ấy chịu",w:"emp",t:"{foed} bị xét đúng phần tội bạc văn miếu. Vợ con không liên lụy. Nhà {v} được một nửa, giận ngươi một nửa.",go:(A,G)=>{rdRel(A,"foe",G[0]);rdOan(A,"v",G[1]);return""}},
  win2:{tag:"Nhà {foed} lung lay",w:"v",t:"Đại Lý tự xét cả nhà {foed}. Ai cũng biết ngươi đã đẩy thêm một tay. {foe} không nhìn mặt ngươi nữa.",go:(A,G)=>{rdOan(A,"foe",G[0]);rdRel(A,"v",G[1]);return""}},
  mid:{tag:"Hoàng thượng tự quyết",t:"Hoàng thượng giáng {foed} thêm một bậc, gác phần còn lại. Không ai biết ngươi nghĩ gì."},
  lose:{tag:"Lời ngươi bị gạt",t:"Hoàng thượng gạt lời ngươi đi. Ngài nói: “Nàng đừng mang thù nhà vào cung.”"}}});

rdDef("td_tha",7,{t:"Lời thú nhận",w:"foe",sj:"điều {foe} giấu bấy lâu",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"{foe} có một điều giấu từ thuở còn ở nhà: nàng đã thấy bản nháp tờ sớ vu nhà ngươi trên án thư của cha. Nói ra là phản cha, giữ lại là phản lòng mình. Ngươi có thể ép, có thể chờ, có thể cho nàng một lối ra.",
 p:[["s1","s2"],["c1","c2","c3","c4"],["t1"],["x1"]],
 B:{s1:{h:"Nàng nhắn muốn gặp",w:"foe",if:RDW(1),t:"Sau tờ sớ, {foe} nhắn: “Có một điều ta phải nói với ngươi, nói rồi thì cha ta hết đường.”",o:[
  {n:"Hẹn ở Phụng Tiên điện",f:"mercy",wx:"nơi kín, có Phật làm chứng",lx:"Phụng Tiên điện có người quét dọn",rt:"Ngươi hẹn giờ thắp hương chiều."},
  {n:"Bảo nàng viết ra giấy",f:"press",wx:"có chữ của nàng",lx:"nàng thấy bị ép",go:(A,ok,G)=>{if(!ok)rdOan(A,"foe",G[0])},rt:"{foe} gửi một mảnh giấy gấp tư.",rf:"{foe} không gửi gì."},
  {n:"Chưa gặp, để nàng tự tìm đến",wx:"không tỏ ra cần",lx:"nàng đổi ý",rt:"Ngươi chờ."}]},
 s2:{h:"Lời nhắn từ chỗ {foe}",w:"maid",if:RDW(0),t:"Từ chỗ ở của {foe}, một cung nữ mang ra lời nhắn: nàng không chịu nổi nữa, có điều muốn nói, nhưng sợ người của {v} nghe.",o:[
  {n:"Gửi {maid} đến nghe",f:"mercy",wx:"lời nàng đến tai ngươi kín đáo",lx:"{maid} bị người canh chặn",rt:"{maid} về, kể lại từng chữ.",rf:"{maid} bị đuổi khỏi cửa."},
  {n:"Bỏ bạc mua người canh",wx:"lối vào thông",lx:"tốn bạc, người canh biết chuyện",rt:"Người canh quay lưng một khắc."},
  {n:"Bỏ qua lời nhắn",f:"hate",wx:"không sa vào bẫy nếu là bẫy",lx:"mất lời của nàng",rt:"Ngươi đốt lời nhắn."}]},
 c1:{h:"Nàng kể",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} kể: năm ấy nàng mới mười mấy tuổi, thấy cha ngồi tập một nét ấn lạ suốt đêm. Sáng ra, nhà ngươi bị hặc.",o:[
  {n:"Nắm tay nàng, nghe hết",f:"mercy",wx:"nàng kể cả điều chưa ai biết",lx:"ngươi phải nghe lại ngày nhà mình tan",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Nàng kể đến khi đèn cạn dầu."},
  {n:"Hỏi dồn từng chi tiết",f:"press",wx:"lời kể đủ để đối chiếu",lx:"nàng thấy bị tra",go:(A,ok,G)=>{if(!ok)rdOan(A,"foe",G[0])},rt:"Nàng nhớ cả màu mực, cả tên người giả ấn.",rf:"Nàng khóc, không kể nữa."},
  {n:"Bảo nàng thôi, đủ rồi",wx:"nàng nhẹ lòng",lx:"thiếu chi tiết",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Nàng lau nước mắt."}]},
 c2:{h:"Mảnh lụa chữ than",w:"maid",if:A=>!rv67(A,"foe"),t:()=>TDFD()?"Trong rương đồ cũ của {foe} trả về phủ, {maid} lần được một mảnh lụa nàng viết bằng than trước khi mất: “Cha ta tập nét ấn suốt đêm trước ngày nhà ngươi bị hặc.”":"Từ lãnh cung, {foe} viết bằng than lên một mảnh lụa: “Cha ta tập nét ấn suốt đêm trước ngày nhà ngươi bị hặc.”",o:[
  {n:"Giữ mảnh lụa làm chứng",f:"press",wx:"có chữ của nàng",lx:"chữ than dễ bị nói là giả",rt:"Mảnh lụa nằm trong tráp."},
  {n:()=>TDFD()?"Gửi lễ cúng cho vong nàng":"Gửi chăn ấm vào lãnh cung",f:"mercy",wx:()=>TDFD()?"nhà nàng biết ngươi nhận lời":"nàng biết ngươi nhận lời",lx:"tốn bạc, có người thấy",rt:()=>TDFD()?"Lễ cúng đến phủ {foed} vào ngày tuần của nàng.":"Chăn ấm đến lãnh cung trước trận rét."},
  {n:"Đốt",f:"hate",wx:"không dính đến nhà kẻ thù",lx:"mất lời của nàng",rt:"Mảnh lụa cháy."}]},
 c3:{h:"{v} nghe ngóng",w:"v",need:["v"],t:"{v} biết hai người đã nói chuyện riêng. Nàng nhắn ngươi: “Có gì hay thì chia nhau. Đừng giữ một mình.”",o:[
  {n:"Cho {v} biết một nửa",wx:"{v} tưởng mình biết hết",lx:"{v} biết còn nửa kia",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} hài lòng ra về.",rf:"{v} cười: “Nửa kia đâu?”"},
  {n:"Chối không có chuyện gì",wx:"{v} không nắm được gì",lx:"{v} càng tò mò",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} bỏ đi.",rf:"{v} sai người canh chỗ {foe}."},
  {n:"Đổi cung nữ hầu {foe}",if:A=>!!rv67(A,"foe"),wx:"tai mắt của {v} bị cắt",lx:"tốn bạc",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hai cung nữ của {v} bị đưa đi chỗ khác."}]},
 c4:{h:"Bản nháp còn không",w:"maid",t:"{maid} hỏi: bản nháp tờ sớ năm ấy, nếu còn, sẽ nằm trong rương hồi môn của {foe} ở phủ {foed}. Nàng giấu nó từ ngày vào cung.",o:[
  {n:"Mua gia nhân lấy rương ra",f:"draft",wx:"bản nháp về tay",lx:"gia nhân báo chủ",rt:"Bản nháp gói trong một chiếc yếm lụa cũ.",rf:"Gia nhân báo lại, phủ {foed} lục rương."},
  {n:"Xin {foe} viết thư cho mẹ gửi vào",if:A=>!!rv67(A,"foe"),f:"draft",wx:"bản nháp vào cung theo đồ hồi môn",lx:"thư lọt vào tay {foed}",go:(A,ok,G)=>{if(ok)rdRel(A,"foe",G[0])},rt:"Phu nhân gửi vào một hộp kim chỉ, đáy có bản nháp.",rf:"{foed} đọc được thư."},
  {n:"Không cần, lời nàng là đủ",wx:"không mạo hiểm",lx:"thiếu vật chứng",rt:"Ngươi không nhắc đến rương."}]},
 t1:{h:"Nàng sợ",w:"foe",t:"{foe} nhắn: nàng sợ cha bị xử chết, sợ mẹ bị liên lụy. Nàng hỏi ngươi một câu: “Nếu ta nói, ngươi có tha cho mẹ ta không?”",o:[
  {n:"Hứa sẽ xin tha cho mẹ nàng",f:"vow",wx:"nàng yên lòng",lx:"một lời hứa ngươi chưa chắc giữ được",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Nàng đáp một chữ: “Được.”"},
  {n:"Nói thật: luật không do ta",wx:"không hứa suông",lx:"nàng chùn bước",rt:"Nàng im rất lâu."},
  {n:"Bảo nàng không có quyền mặc cả",f:"hate",wx:"nàng biết ai cầm dao",lx:"nàng oán ngươi",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"Nàng không nhắn gì nữa."}]},
 x1:{h:"Lời khai trên giấy",w:"foe",t:"Đến lúc lời nói phải thành chữ. Không có chữ, lời {foe} chỉ là gió.",o:[
  {n:"Xin nàng tự tay viết lời khai",e:["win","lose"],go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1])},rt:"{foe} viết, ký, điểm chỉ. Tay nàng không run.",rf:"{foe} cầm bút rồi buông: “Ta không viết được tên cha.”"},
  {n:"Tự chép lời nàng, nhờ người làm chứng",e:["mid","lose"],rt:"Lời chép có hai người làm chứng ký bên dưới.",rf:"Người làm chứng rút tên."},
  {n:"Để nàng giữ lời, không ép",e:"mid",lx:"không có chữ nào",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Ngươi nói: “Khi nào nàng muốn.”"}]}},
 E:{win:{tag:"{foe} viết lời khai",w:"foe",t:"Lời khai của {foe} nằm trong tráp của ngươi. Nàng đã đặt tên cha mình lên giấy. Từ nay nàng chỉ còn ngươi."},
  mid:{tag:"Lời nói chưa thành chữ",t:"Ngươi biết sự thật, có người biết cùng ngươi, nhưng chữ ký của {foe} thì chưa có."},
  lose:{tag:"{foe} rút lời",t:"{foe} rút lại mọi lời. Nàng sợ, và nàng giận ngươi vì đã làm nàng sợ.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}}}});

rdDef("td_tha",8,{t:"Cha nàng",w:"maid",sj:"lời mặc cả của {foed}",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:()=>{const w=[TDRUONG()?"":"ruộng hương hỏa",TDMO()?"":"đất quanh mộ phần nhà ngươi"].filter(Boolean).join(" và ");return `{foed} biết con gái đã nói. Ông gửi lời: ${w?`trả lại ${w}, thêm một rương bạc`:"dâng hai rương bạc"}, đổi lấy tờ lời khai. Hạn là trước kỳ thu thẩm, chừng hai tháng; qua kỳ ấy ông không còn gì để đổi, và ngươi cũng không.`},
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Người đưa lời",w:"maid",if:RDW(1),t:"Có lời khai trong tay, ngươi nhận được một hộp trầu cau từ phủ {foed}, trong có một tờ thiếp không ký tên: “Cái gì cũng có giá.”",o:[
  {n:"Gửi lại một câu: chưa đủ",f:"bait",wx:"{foed} phải trả giá cao hơn",lx:"{foed} biết ngươi chịu mặc cả",rt:"Ba ngày sau, tờ thiếp thứ hai nói rõ hơn.",rf:"Phủ {foed} im lặng."},
  {n:"Dâng tờ thiếp lên Hoàng thượng",f:"proof",wx:"có dấu ông mua chuộc",lx:"thiếp không ký tên, khó dùng",rt:"Hoàng thượng giao tờ thiếp cho Đại Lý tự ghi vào hồ sơ.",rf:"Hoàng thượng bảo thiếp không tên thì không xét."},
  {n:"Đốt tờ thiếp",wx:"không nhận lời",lx:"mất một dấu",rt:"Hộp trầu cau được trả về."}]},
 s2:{h:"{foed} gặp mặt",w:"maid",if:RDW(0),t:()=>`Không có chữ ký của con gái, {foed} vẫn sợ. Ông nhờ vợ, khi ${TDVAO()}, ghé cung ngươi mang lời: ông muốn ngươi nghe điều ông đổi.`,o:[
  {n:"Cho phu nhân ghé vào nói thay ông",f:"bait",wx:"nghe trọn lời ông nhắn",lx:"để lại dấu rằng ngươi chịu nghe mặc cả",rt:"Phu nhân thỉnh an xong, ghé cung ngươi, nói từng lời chồng dặn."},
  {n:"Từ chối, bảo ông viết thư",f:"proof",wx:"có chữ ông",lx:"ông không dại viết",rt:"Ông viết một bức thư dài, có tên.",rf:"Ông không viết."},
  {n:"Không đáp",wx:"không dính",lx:"ông tìm đường khác",rt:"Phu nhân về tay không."}]},
 c1:{h:"Rương bạc",w:"maid",t:"Một thái giám ăn bạc phủ {foed} khiêng đến cửa sau cung ngươi một rương bạc, nói là lễ mừng thọ, không cần đáp.",o:[
  {n:"Nhận rương",wx:"giàu lên",lx:"nhận bạc nhà kẻ thù, ông sẽ đem rương ấy ra tố ngươi",go:()=>{RD_FL("td_tha.bribe",1)},rt:"Rương bạc vào kho."},
  {n:"Trả rương, có người làm chứng",f:"proof",wx:"cả cung biết ngươi không nhận",lx:"{foed} biết không mua được ngươi",rt:"Rương bạc được khiêng trả trước mắt mọi người."},
  {n:"Nhận, đem nộp Nội vụ phủ",f:"proof",wx:"bạc thành chứng",lx:"Nội vụ phủ hỏi vặn",rt:"Nội vụ phủ ghi: bạc biếu của phủ {foed}.",rf:"Nội vụ phủ không nhận."}]},
 c2:{h:"{foe} bị cha ép",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foed} gửi thư cho con gái: nếu nàng không lấy lại tờ lời khai, mẹ nàng sẽ bị đưa về quê ngoại, không bao giờ gặp lại.",o:[
  {n:"Cho nàng xem tờ lời khai, nói sẽ không dùng nếu chưa cần",f:"mercy",wx:"nàng đứng vững",lx:"nàng vẫn sợ",go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1])},rt:"{foe} gấp thư cha lại: “Ta không lấy.”",rf:"{foe} khóc cả đêm."},
  {n:"Cho người đón mẹ nàng vào chùa",f:"vow",wx:"mẹ nàng có chỗ trú",lx:"tốn bạc, {foed} biết ngươi động tay",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Phu nhân vào chùa Hộ Quốc ở."},
  {n:"Để nàng tự chọn",wx:"không gánh thay nàng",lx:"nàng có thể chọn cha",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Ngươi không nói gì."}]},
 c3:{h:"{v} đòi phần",w:"v",need:["v"],t:"{v} biết có lời mặc cả. Nàng nhắn: hoặc ngươi chia cho nhà nàng một nửa ruộng {foed} đem đổi, hoặc nhà nàng báo Đại Lý tự ngươi đang ăn hối lộ của nhà kẻ có tội. Hạn là trước rằm.",o:[
  {n:"Chia cho {v} bạc thay ruộng",wx:"{v} im",lx:"tốn bạc",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận bạc, im."},
  {n:"Dọa lại bằng vụ búp bê",wx:"{v} im mà không tốn bạc",lx:"{v} báo thật",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} nhớ ra thợ may vẫn còn sống.",rf:"Nhà {v} báo Đại Lý tự."},
  {n:"Tâu trước với Hoàng thượng",f:"proof",wx:"lời {v} thành vô dụng",lx:"Hoàng thượng nghi ngươi",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng giao Đại Lý tự ghi: phi tần tự tâu có người mua chuộc.",rf:"Hoàng thượng hỏi sao giờ mới tâu."}]},
 t1:{h:"Giá cuối",w:"maid",t:"Tờ thiếp cuối của {foed}: ngoài ruộng và bạc, ông sẽ dâng sớ tự nhận phần tội vu cáo, xin tha cho vợ con, chỉ cần ngươi không đưa tờ lời khai của con gái ông lên ngự án.",o:[
  {n:"Đòi ông dâng sớ trước",f:"bait",wx:"ông tự trói tay",lx:"ông nghi",rt:"Ông nhận lời, xin thêm mười ngày.",rf:"Ông nói: “Ngươi đưa trước.”"},
  {n:"Ghi lại mọi lời ông hứa",f:"proof",wx:"lời mặc cả thành chứng",lx:"mất lòng tin của ông",rt:"Có hai người làm chứng ghi lời ông hứa."},
  {n:"Bảo ông: không đổi",wx:"giữ thẳng lưng",lx:"ông dồn hết sức chống lại",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"Phủ {foed} đóng cửa ba ngày."}]},
 x1:{h:"Ngày hết hạn",w:"maid",t:"Còn mấy ngày nữa là kỳ thu thẩm. Thái giám ăn bạc phủ {foed} đứng chờ câu trả lời cuối cùng ở cửa sau.",o:[
  {n:"Giả nhận để ông tự lộ",e:["win","lose"],rt:"{foed} giao văn tự, giao bạc, giao cả thư hứa. Mỗi thứ là một chứng cứ ông tự đưa.",rf:"{foed} đánh hơi thấy, rút lại mọi thứ."},
  {n:()=>TDRUONG()?"Nhận bạc của ông, giữ bản chép lời khai":"Nhận ruộng hương hỏa, giữ bản chép lời khai",e:["mid","lose"],f:"took",go:(A,ok)=>{if(ok)TDRUONG(1)},rt:()=>TDRUONG()?"Bạc của ông về kho, ruộng hương hỏa vẫn yên. Bản gốc đi, bản chép còn.":"Ruộng hương hỏa về tay. Bản gốc đi, bản chép còn.",rf:"Người của ông lục được cả bản chép."},
  {n:"Từ chối, chờ ngày xử",e:"mid",lx:"không được gì từ ông, ông đi kêu oan khắp nơi",rt:"Thái giám đứng chờ đến tối, rồi đi."}]}},
 E:{win:{tag:"Lời mặc cả thành chứng cứ",w:"maid",t:"Thư hứa, văn tự, và số bạc ông giao trong đêm hết hạn: {foed} tự tay đưa cho ngươi đủ chứng để thấy ông biết mình có tội. Mộ cha mẹ ngươi đã có người trông."},
  mid:{tag:"Để đến ngày xử",t:A=>A.f.took?"Ngươi nhận phần ông đổi, giữ bản chép lời khai. Phần còn lại vẫn để đến ngày xử.":"Ngươi không nhận gì của ông. Phần còn lại vẫn để đến ngày xử."},
  lose:{tag:"Lộ kế",t:"{foed} biết ngươi bẫy ông. Ông dồn ép con gái, và chuẩn bị đánh trả ngươi.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}}}});

rdDef("td_tha",9,{t:"Hai người con gái",w:"foe",sj:"đêm giỗ nhà ngươi",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Đêm giỗ cha mẹ ngươi, {foe} xin được thắp một nén hương. Hai người con gái của hai nhà sẽ ngồi riêng với nhau lần đầu. Mà {v} có tai mắt khắp nơi.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1","x2"]],
 B:{s1:{h:"Nàng mang hương đến",w:"foe",if:A=>RDW(1)()&&!!rv67(A,"foe"),t:"Biết cha mình đã tự lộ, {foe} đến trước giờ giỗ, tay ôm một bó hương trầm. Nàng đứng ngoài cửa, không dám vào.",o:[
  {n:"Mời nàng vào",f:"mercy",wx:"nàng đứng trước bài vị",lx:"cung nữ ngươi xì xào",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Nàng bước vào, quỳ xuống trước khi ngươi kịp nói."},
  {n:"Bảo nàng chờ đến khuya",wx:"không ai thấy",lx:"có người thấy nàng đứng chờ",rt:"Đến canh ba, cửa cung mới mở.",rf:"Tai mắt của {v} thấy nàng đứng chờ."},
  {n:"Nhận hương, không cho vào",f:"hate",wx:"giữ khoảng cách",lx:"nàng đứng chờ trong gió",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"Nàng đưa hương rồi đi."}]},
 s2:{h:"Giỗ mà không có ai",w:"maid",if:A=>RDW(0)()||!rv67(A,"foe"),t:()=>TDFD()?"Đêm giỗ, ngươi bày bài vị trong phòng kín. Từ phủ {foed} có người mang đến một nén hương, gói trong giấy, không lời: phần hương {foe} dặn lại trước khi mất.":"Đêm giỗ, ngươi bày bài vị trong phòng kín. Từ chỗ ở của {foe} có người mang đến một nén hương, gói trong giấy, không lời.",o:[
  {n:"Thắp nén hương ấy",f:"mercy",wx:"nhận lời xin lỗi không thành tiếng",lx:"cha mẹ ngươi có nhận không, ngươi không biết",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Khói hương lẫn vào khói hương."},
  {n:"Gửi trả",f:"hate",wx:"không nhận của nhà kẻ thù",lx:"nàng biết ngươi chưa tha",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"Nén hương được gửi trả."},
  {n:"Cho người hỏi nàng muốn gì",wx:"nghe được lời nàng",lx:"người hỏi bị bắt gặp",rt:"Nàng nhắn: “Chỉ muốn ngươi biết, ta nhớ ngày này.”",rf:"Người hỏi bị người canh đuổi về."}]},
 c1:{h:"Tai mắt của {v}",w:"v",need:["v"],t:"{maid} báo: một cung nữ quét dọn mới đến cung ngươi ba hôm nay, là người của {v}.",o:[
  {n:"Đuổi nàng ta đi trước đêm giỗ",wx:"đêm giỗ kín",lx:"{v} biết ngươi đề phòng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cung nữ quét dọn bị trả về Nội vụ phủ."},
  {n:"Để nàng ta nghe một câu chuyện khác",f:"probe",wx:"{v} nghe điều ngươi muốn",lx:"chuyện thật lọt ra",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"{v} nghe kể ngươi và {foe} cãi nhau trước bài vị.",rf:"Cung nữ ấy nghe được cả chuyện thật."},
  {n:"Mua lại nàng ta",wx:"có một tai mắt ngược",lx:"tốn bạc",rt:"Nàng ta nhận bạc, từ nay báo {v} điều ngươi dặn."}]},
 c2:{h:"Bài vị và tên",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} đọc tên trên bài vị, tên từng người trong nhà ngươi. Đến tên em gái nhỏ nhất, nàng dừng lại.",o:[
  {n:"Kể cho nàng về từng người",f:"mercy",wx:"nàng biết mình đã mất gì của ngươi",lx:"ngươi phải nhớ lại từng người",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Nàng nghe, nước mắt chảy không dứt."},
  {n:"Bắt nàng quỳ lạy từng người",f:"hate",wx:"nàng cúi đầu trước nhà ngươi",lx:"nàng thấy bị nhục",go:(A,ok,G)=>{rdOan(A,"foe",ok?G[0]:G[1])},rt:"Nàng quỳ, lạy từng bài vị.",rf:"Nàng đứng dậy bỏ đi."},
  {n:"Im lặng",wx:"không nói điều sẽ hối",lx:"nàng không hiểu ngươi nghĩ gì",rt:"Hai người đứng im đến khi hương tàn."}]},
 c3:{h:"Phu nhân nhà {foed}",w:"maid",if:A=>!rv67(A,"foe"),t:()=>`Phu nhân nhà {foed} ${TDVAO()}, rồi xin ghé cung ngươi thắp hương thay con gái ${TDFD()?"đã khuất":"đang ở lãnh cung"}. Bà mang theo một bức thư của nàng.`,o:[
  {n:"Cho bà thắp hương",f:"mercy",wx:"bà và con bà biết ngươi nhận",lx:"cả cung thấy",rt:"Bà khóc trước bài vị nhà ngươi."},
  {n:"Đọc thư, không cho bà vào",wx:"biết lời {foe}",lx:"bà quỳ ngoài cửa",rt:"Thư viết: “Ta không xin ngươi tha cha ta. Ta chỉ xin tha cho mẹ.”"},
  {n:"Không tiếp",f:"hate",wx:"giữ đêm giỗ cho nhà mình",lx:"mất lời {foe}",rt:"Phu nhân về, thư vẫn trong tay áo."}]},
 t1:{h:"Một câu hỏi",w:"maid",t:"Đêm khuya, ngươi tự hỏi: muốn {foed} chết, hay muốn cả triều biết nhà mình vô tội? Hai điều ấy không phải lúc nào cũng là một.",o:[
  {n:"Ta muốn sự thật",f:"mercy",wx:"lòng rõ",lx:"thù có thể không trả đủ",rt:"Ngươi ngủ được một giấc."},
  {n:"Ta muốn hắn trả nợ máu",f:"hate",wx:"lòng rõ",lx:"đường hòa khép lại",rt:"Ngươi thức đến sáng."},
  {n:"Ta muốn cả hai",wx:"không bỏ điều nào",lx:"lòng rối",rt:"Ngươi nghĩ ra một cách.",rf:"Ngươi không nghĩ ra cách nào."}]},
 x1:{h:"Trước bài vị",w:"foe",if:A=>!!rv67(A,"foe"),t:"Hương sắp tàn. {foe} hỏi: “Ngươi muốn ta làm gì? Ta làm.”",o:[
  {n:"Xin nàng để Hoàng thượng ghi lời khai",e:["win","lose"],go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1])},rt:"{foe} thề trước bài vị cha mẹ ngươi: khi Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự, xét án, nàng sẽ xin Hoàng thượng cho ghi lời khai của nàng gửi sang.",rf:"{foe} nói: “Ta làm được mọi việc, trừ việc ấy.”"},
  {n:"Bảo nàng tránh xa ngày xử",e:["mid","lose"],rt:"{foe} gật đầu. Nàng sẽ không đứng về phía nào.",rf:"{foe} nói: “Ngươi coi ta là gì?”"},
  {n:"Bảo nàng về, đêm nay là của nhà ta",e:"mid",lx:"nàng ra về, không biết mình đứng đâu",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"{foe} lặng lẽ ra về."}]},
 x2:{h:"Hương tàn",w:"maid",if:A=>!rv67(A,"foe"),t:()=>`Hương tàn. Lời {foe} nằm trong một bức thư, ${TDFD()?"nàng thì đã khuất":"nàng thì ở nơi không ai đến"}. Ngươi phải định: ngày xử {foed}, ngươi đứng ở đâu.`,o:[
  {n:()=>TDFD()?"Xin Hoàng thượng cho đọc thư {foe} để lại":"Xin Hoàng thượng cho ghi lời khai của {foe}",e:["win","lose"],rt:()=>TDFD()?"Hoàng thượng chuẩn: thư nàng để lại được chép sang Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự.":"Hoàng thượng chuẩn: một thái giám sẽ vào lãnh cung ghi lời nàng, chép sang Tam ty, tức Hình bộ, Ngự sử đài, Đại Lý tự.",rf:()=>TDFD()?"Hoàng thượng không chuẩn: thư người đã khuất không ai đối chất được.":"Hoàng thượng không chuẩn: người ở lãnh cung không được khai."},
  {n:"Đứng một mình",e:["mid","lose"],rt:"Ngươi chuẩn bị lời trình của riêng mình.",rf:"Ngươi thấy mình đứng một mình thật."},
  {n:"Thôi, để việc xử cho triều",e:"mid",lx:"hồ sơ ngày xử không có lời nào của ngươi",rt:"Ngươi cất bài vị."}]}},
 E:{win:{tag:"Lời thề trước bài vị",w:"foe",t:()=>`Đêm giỗ qua đi. Ngày xử {foed}, ${TDFD()?"thư con gái ông để lại":"lời khai của con gái ông"} sẽ nằm cạnh lời trình của ngươi trong hồ sơ.`},
  mid:{tag:"Mỗi người một đêm",t:"Hai người con gái mỗi người về với đêm của mình. Không ai hứa gì."},
  lose:{tag:"Đêm giỗ lạnh",t:"{v} biết hết chuyện đêm ấy, và kể nó theo cách của nàng. Cả cung nói ngươi làm nhục nhà kẻ thù trước bài vị, hoặc nói ngươi tha cho kẻ giết cha mẹ mình.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("td_tha",10,{t:"Nước cờ cuối của nhà kia",w:"emp",sj:"nước cờ cuối của nhà {foed}",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"{foed} đánh nước cuối: tâu rằng ngươi là con gái tội thần đổi tên vào cung, tội khi quân. Muốn sống, ông phải kéo ngươi ngã trước ngày xử. Đứng vững bằng {foe}, bằng tay {v}, hay tự mình đứng ra nhận.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tờ sớ khi quân",w:"emp",if:RDW(1),t:()=>`Biết ngày xử có lời con gái mình, {foed} liều: ông dâng sớ tố ngươi đổi tên vào cung, giấu thân phận con gái tội thần.${RD_FL("td_tha.bribe")?" Trong sớ còn kể: ngươi đã nhận một rương bạc của chính phủ ông.":""}`,o:[
  {n:"Đến gặp Hoàng thượng trước buổi chầu",f:"self",wx:"ngài nghe ngươi trước",lx:"ngài chưa muốn gặp",rt:"Hoàng thượng cho vào, nghe đến hết.",rf:"Thái giám nói ngài đang bận."},
  {n:"Gom lời người thế giao đã đổi tên ngươi",f:"why",wx:"có người kể vì sao phải đổi tên",lx:"kéo người thế giao vào vụ án",rt:"Người thế giao viết lời trình, kể đêm khám phủ."},
  {n:"Ngồi yên chờ",wx:"không tỏ ra hoảng",lx:"lời tâu đi trước",rt:"Ngươi ngồi chép kinh, tay không run."}]},
 s2:{h:"Lời đồn thành sớ",w:"emp",if:RDW(0),t:()=>`Từ đêm giỗ, lời đồn về ngươi đã thành sớ: {foed} tố ngươi đổi tên vào cung, giấu thân phận.${RD_FL("td_tha.bribe")?" Sớ còn kể ngươi đã nhận một rương bạc của phủ ông.":""} Tờ sớ nằm trên ngự án.`,o:[
  {n:"Xin Thái hậu một lời",need:["th"],f:"self",wx:"Thái hậu nói giúp",lx:"Thái hậu không ưa chuyện giấu tên",rt:"Thái hậu nói với Hoàng thượng: “Một đứa con gái mất nhà thì phải sống.”",rf:"Thái hậu nói: “Giấu là giấu.”"},
  {n:"Gom lời người thế giao",f:"why",wx:"có lời kể vì sao đổi tên",lx:"kéo người thế giao vào",rt:"Lời trình của người thế giao về tay ngươi."},
  {n:"Viết tờ tự trình",f:"self",wx:"lời của ngươi đến trước",lx:"tự trình là tự nhận",rt:"Tờ tự trình nằm cạnh tờ sớ.",rf:"Tờ tự trình bị gác lại."}]},
 c1:{h:"{foe} chọn",w:"foe",if:A=>!!rv67(A,"foe"),t:"{foe} biết cha đã dâng sớ tố ngươi. Nàng đến cung ngươi, mặt trắng bệch: “Cha ta muốn kéo ngươi chết cùng.”",o:[
  {n:"Xin nàng tâu: nàng biết ngươi từ trước",f:"foeword",wx:"lời con gái người tố đỡ cho ngươi",lx:"nàng không dám",go:(A,ok,G)=>{rdRel(A,"foe",ok?G[0]:G[1])},rt:"{foe} tâu: “Thần thiếp biết từ lâu. Nàng không hại ai.”",rf:"{foe} cúi đầu: “Ta không đứng trước cha được.”"},
  {n:"Bảo nàng giữ mình",wx:"nàng không bị kéo vào",lx:"mất một lời nói",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"{foe} nắm tay ngươi rồi về."},
  {n:"Trách nàng không ngăn được cha",wx:"trút được giận",lx:"nàng tổn thương",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"{foe} ra về, không nói lời nào."}]},
 c2:{h:"{v} chìa tay",w:"v",need:["v"],t:"{v} nhắn: nhà nàng có thể dâng sớ hặc ngược {foed} tội vu cáo hai lần. Đổi lại, ngày xử, ngươi im để nhà nàng nhận công.",o:[
  {n:"Nhận",f:"vhand",wx:"có sớ nhà {v} đỡ",lx:"công về tay {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Nhà {v} dâng sớ ngay hôm ấy."},
  {n:"Từ chối",wx:"không nợ {v}",lx:"đứng một mình",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cười nhạt."},
  {n:"Nhận, không hứa im",f:"vhand",wx:"có sớ mà không mất lời",lx:"{v} biết bị lừa",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"Nhà {v} dâng sớ, chưa đòi gì.",rf:"{v} rút lời."}]},
 c3:{h:"Phu nhân nhà {foed} quỳ",w:"maid",if:A=>!rv67(A,"foe"),t:()=>`Phu nhân nhà {foed} lại ${TDVAO()}, rồi ghé cung ngươi: bà không biết chồng định dâng sớ ấy. Bà xin làm chứng rằng chồng mình biết ngươi là ai từ trước khi ngươi vào cung, mà không nói.`,o:[
  {n:"Nhận lời bà",f:"foeword",wx:"vợ người tố nói ông biết mà im",lx:"bà đổi ý",rt:"Phu nhân ký vào lời trình.",rf:"Phu nhân sợ, rút lời."},
  {n:"Không để bà dính vào",wx:"bà khỏi bị chồng trả thù",lx:"mất một nhân chứng",rt:"Ngươi đưa bà ra cửa."},
  {n:"Đổi lời bà lấy lời hứa xin Hoàng thượng khoan cho bà",f:"foeword",wx:"có lời bà",lx:"mặc cả với một người mẹ",rt:"Bà gật đầu."}]},
 t1:{h:"Đêm trước buổi chầu",w:"maid",t:"{maid} hỏi: “Ngày mai, tiểu chủ định nói gì?”",o:[
  {n:"Nói thật hết",f:"self",wx:"không còn gì để giấu",lx:"cái giá của khi quân",rt:"Ngươi viết sẵn từng câu."},
  {n:"Chỉ nói điều cần",wx:"giữ được thế",lx:"lời nửa vời",rt:"Ngươi chọn ba điều phải nói.",rf:"Ngươi chọn mãi không xong."},
  {n:"Để mai tính",wx:"ngủ được",lx:"không chuẩn bị",rt:"Ngươi ngủ một giấc."}]},
 x1:{h:"Hoàng thượng cầm tờ sớ đến",w:"emp",t:"Tan buổi chầu, Hoàng thượng cầm tờ sớ của {foed} đến cung ngươi, đặt lên án: “Nàng có đổi tên vào cung không?”",o:[
  {n:"Thưa thật, và kể đêm khám phủ",e:["win","lose"],rt:"Hoàng thượng nghe xong, nói: “Một đứa con gái mất cả nhà, đổi tên để sống. Trẫm không gọi đó là khi quân.”",rf:"Hoàng thượng nói: “Nàng đã giấu trẫm.”"},
  {n:"Để sớ nhà {v} đến ngự án trước",e:["mid","lose"],rt:"Sớ nhà {v} lấn át sớ của {foed}. Tội vu cáo che mất tội giấu tên.",rf:"Hai tờ sớ cùng bị gác, ngươi đứng giữa."},
  {n:"Quỳ, không biện bạch",e:"mid",lx:"Hoàng thượng phải tự đoán",rt:"Hoàng thượng nhìn ngươi rất lâu, rồi gác tờ sớ."}]}},
 E:{win:{tag:"Hoàng thượng che chở ngươi",w:"emp",t:"Tờ sớ khi quân bị bác. Cả triều biết ngươi là con gái nhà bị vu, và biết Hoàng thượng đứng sau ngươi. {foed} đã tự đào hố."},
  mid:{tag:"Tạm yên",t:"Tờ sớ bị gác lại, không bác, không chuẩn. Ngươi vẫn ở chỗ cũ, chỉ là cả cung biết tên thật của ngươi."},
  lose:{tag:"Bị nghi khi quân",t:"Hoàng thượng không xử, nhưng ngài không ghé cung ngươi một thời gian dài. Ngày xử {foed}, lời ngươi sẽ nhẹ hơn."}}});

rdDef("td_tha",11,{t:"Cởi nút thắt",w:"foe",sj:"phiên Tam ty xét án {foed}",cast(A){const e=rivals.find(x=>x.name===S.foe&&x.alive&&!x.out);if(e)A.act.foe=e.id;else delete A.act.foe;return rdCast(A,["v"])},
 g:"Hoàng thượng hạ chỉ: Tam ty gồm Hình bộ, Ngự sử đài và Đại Lý tự cùng xét án {foed}. Ngươi không được bước vào nơi xét án; lời ngươi chỉ đến đó bằng tờ trình, bằng nhân chứng, bằng người ngoài cung. Lời khai của {foe}, sớ của nhà {v}, và cuối cùng là ngự phê sẽ định số phận hai nhà. Sau ngày ấy, ngươi và {foe} là tỷ muội, là kẻ thù trọn đời, hay hai người dưng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Chỉ xét án ban xuống",w:"maid",if:RDW(1),t:"Hoàng thượng đã đứng về phía ngươi. Chỉ xét án vừa ban. Đại Lý tự tâu xin lời trình của nhà bị hại; Hoàng thượng sai thái giám vào cung hỏi ngươi có dâng không.",o:[
  {n:"Dâng lời trình có ký tên",f:"stand",wx:"lời ngươi nằm trong hồ sơ",lx:"tên ngươi đứng đầu tờ trình, ai cũng đọc thấy",rt:"Ngươi viết suốt đêm, sáng ra niêm phong, giao thái giám dâng Hoàng thượng chuyển sang Đại Lý tự."},
  {n:"Nhờ người thế giao đứng tên dâng thay",wx:"lời ngươi đến mà tên ngươi không lộ",lx:"lời người ngoài nhẹ hơn",rt:"Người thế giao nộp lời trình ở Đại Lý tự.",rf:"Đại Lý tự xếp lời trình ấy xuống cuối."},
  {n:"Dò xem {foe} có dâng lời khai không",wx:"biết nàng đứng đâu",lx:"lộ rằng ngươi chờ nàng",rt:"Thái giám truyền lời: nàng đã xin được dâng lời khai.",rf:"Không ai biết."}]},
 s2:{h:"Chỉ xét án đến khi ngươi đang yếu thế",w:"maid",if:RDW(0),t:"Tờ sớ khi quân chưa bác, Hoàng thượng còn lạnh nhạt. Vậy mà chỉ xét án {foed} vẫn ban xuống, và lời ngươi vẫn là lời của nhà bị hại.",o:[
  {n:"Vẫn dâng lời trình",f:"stand",wx:"cả triều biết ngươi không sợ",lx:"người ta cười ngươi liều",rt:"Lời trình của ngươi được ghi vào hồ sơ đầu tiên.",rf:"Có quan đọc lời trình rồi cười khẩy."},
  {n:"Nhờ lão Ngự sử môn sinh cũ của cha nói thay",wx:"có người trong Ngự sử đài nói",lx:"tốn lễ, lời người khác nhẹ hơn",rt:"Lão Ngự sử nhận lời."},
  {n:"Lui về, để Tam ty tự xét",wx:"không ai nói ngươi thù dai",lx:"lời ngươi vắng trong hồ sơ",rt:"Ngươi ở lại cung chép kinh."}]},
 c1:{h:"{foe} trước khi dâng lời khai",w:"foe",if:A=>!!rv67(A,"foe"),t:"Hoàng thượng cho một thái giám đến cung {foe} ghi lời khai của nàng. Đêm trước, nàng đến cung ngươi: “Ta sẽ khai. Nhưng ngươi hứa với ta một điều: xin cho mẹ ta.”",o:[
  {n:"Hứa",f:"vow",wx:"nàng đứng vững",lx:"một lời hứa phải xin bằng ân điển của Hoàng thượng",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"{foe} gật đầu, mắt khô."},
  {n:"Nói: tội tha hay không là ở Hoàng thượng",wx:"không hứa điều không giữ được",lx:"nàng do dự",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"{foe} đứng lâu, rồi vẫn gật đầu."},
  {n:"Bảo nàng không cần khai",f:"hate",wx:"thù là của nhà ngươi, không cần nàng",lx:"nàng thấy bị gạt ra",go:(A,_ok,G)=>{rdOan(A,"foe",G[0])},rt:"{foe} lùi lại."}]},
 c2:{h:"Nhà {v} đòi phần",w:"v",need:["v"],t:"Nhà {v} dâng thêm một xấp sớ lên Tam ty: họ muốn xét cả họ hàng {foed}, chia ruộng của nhà ấy. {v} nhắn hỏi ngươi có ký tên cùng không.",o:[
  {n:"Dâng tờ xin Hoàng thượng chỉ xét người có tội",f:"mercy",wx:"vợ con {foed} có thể không bị liên lụy",lx:"nhà {v} giận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng chuyển tờ của ngươi sang Tam ty. Tam ty nghị: không xét lan họ hàng, trình Hoàng thượng định.",rf:"Hoàng thượng chuyển tờ của ngươi sang Tam ty. Tam ty nghị: việc ấy theo luật, trình Hoàng thượng định."},
  {n:"Ký tên cùng nhà {v}",f:"hate",wx:"nhà {foed} ngã đến tận gốc",lx:"công về tay {v}, tiếng ác về ngươi",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Tên ngươi đứng cạnh tên nhà {v} trong tờ sớ."},
  {n:"Nhờ người thế giao đứng đơn xin trả ruộng hương hỏa",if:()=>!TDRUONG(),wx:"đất hương hỏa về",lx:"bị nói là đòi của",go:(A,ok)=>{if(ok)TDRUONG(1)},rt:"Tam ty ghi vào lời nghị: ruộng hương hỏa trả về chủ cũ, trình Hoàng thượng định.",rf:"Người ta cười: “Còn đòi của.”"}]},
 c3:{h:"Phu nhân nhà {foed}",w:"maid",if:A=>!rv67(A,"foe"),t:()=>`Con gái ${TDFD()?"đã khuất":"ở lãnh cung"}, phu nhân nhà {foed} ${TDVAO()}, trên đường về ghé cung ngươi, đưa bức thư {foe} ${TDFD()?"để lại":"viết"}. Bà hỏi có nên nhờ người nộp nó lên Tam ty không.`,o:[
  {n:"Xin Hoàng thượng cho nộp thư của {foe}",f:"mercy",wx:"lời {foe} vào hồ sơ",lx:"thư bị nói là ép viết",rt:"Hoàng thượng chuẩn. Thư được chép vào hồ sơ.",rf:"Hoàng thượng không chuẩn."},
  {n:"Dâng tờ xin ân điển cho phu nhân",f:"vow",wx:"bà có người xin cho",lx:"người ta nói ngươi mềm lòng",rt:"Tờ xin của ngươi nằm cạnh án của {foed}."},
  {n:"Không nhận thư",f:"hate",wx:"không mềm lòng",lx:"bà khóc ngoài cửa cung",rt:"Phu nhân ôm thư ra về."}]},
 t1:{h:"Lời nhắn từ ngục",w:"maid",t:"Một ngục tốt Hình bộ mang ra lời nhắn của {foed}, gầy rộc sau mấy tháng giam: “Ta xin nói một câu với nàng, qua người nào cũng được.”",o:[
  {n:"Sai {maid} ra cửa cung nghe ngục tốt thuật lại",f:"hear",wx:"nghe lời cuối của kẻ thù",lx:"ông nói lời độc",rt:"{maid} mang về: “Năm ấy ta sợ. Ta không xin nàng tha.”",rf:"{maid} mang về: “Nhà nàng đáng như thế.”"},
  {n:"Không nghe",f:"hate",wx:"không cho ông một lời",lx:"không biết ông định nói gì",rt:"Ngươi bảo ngục tốt về."},
  {n:"Bảo ông nhắn cho con gái ông",if:A=>!!rv67(A,"foe"),f:"mercy",wx:"cha con họ có một lời",lx:"cả cung biết",go:(A,_ok,G)=>{rdRel(A,"foe",G[0])},rt:"Lời nhắn đến cung {foe}. Nàng khóc cả đêm, sáng ra xin ghi lời khai."}]},
 x1:{h:"Lời nghị lên ngự án",w:"emp",t:"Tam ty xét xong, dâng lời nghị. Trước khi phê, Hoàng thượng đến cung ngươi: “Nhà nàng là nhà bị hại. Trẫm muốn nghe nàng nói lần cuối.”",o:[
  {n:"Dâng lời khai, xin ân điển cho mẹ con {foe}",e:["win","lose"],rt:"Hoàng thượng đọc lời khai, phê: {foed} chịu đúng tội vu cáo; vợ con được ơn tha.",rf:"Hoàng thượng nói lời khai như bị ép viết. Ngài phê nhẹ tay cho {foed}."},
  {n:"Xin xử đến cùng, không tha ai",e:["mid","lose"],rt:"Hoàng thượng phê theo lời nghị nặng nhất. Nhà {foed} tan.",rf:"Hoàng thượng thấy ngươi mang thù vào lời xin, phê nhẹ tay cho {foed}."},
  {n:"Xin Hoàng thượng nghe chính lời {foe}",if:A=>!!rv67(A,"foe"),e:["win","mid"],rt:"Hoàng thượng cho gọi {foe}. Nàng kể từng chữ về đêm cha nàng tập nét ấn.",rf:"{foe} quỳ trước Hoàng thượng, rồi không nói nổi. Ngài phê theo lời nghị nặng nhất."}]}},
 E:{win:{tag:"Kết nghĩa tỷ muội",w:"foe",t:"Ngự phê ban xuống: {foed} chịu đúng tội; mẹ con {foe} được ơn tha. Nhà ngươi được rửa tên lần cuối, không còn ai dám nhắc. Đêm ấy, hai người con gái của hai nhà thù cùng thắp hương, và từ đó gọi nhau là tỷ muội.",go:(A,G)=>{S.avenged=true;const e=rv67(A,"foe");if(e){e.enemy=false;return e67ally(e,G[0])}return""}},
  mid:{tag:"Thù trả, nghĩa tuyệt",t:"Hoàng thượng phê theo lời nghị nặng nhất, nhà {foed} tan. Thù nhà ngươi đã trả đủ. {foe} sẽ oán ngươi trọn đời, và cả cung biết điều ấy.",go:(A,G)=>{S.avenged=true;rdOan(A,"foe",G[0]);return""}},
  lose:{tag:"Đường ai nấy đi",t:"Hoàng thượng phê nhẹ tay cho {foed}. Ngươi và {foe} gặp nhau ở hành lang mà không ai dừng bước. Không ai tha ai, không ai thắng ai.",go:(A,G)=>{rdOan(A,"foe",G[0]);return""}}}});
RD97L.push(rdRare({a:"td_tha_11",tag:"Con gái làm chứng cho cha",w:"foe",n:"Xin Hoàng thượng nghe {foe} khai chống lại chính cha nàng",
 path:["Dâng lời trình có ký tên","Vẫn dâng lời trình","Hứa","Dâng tờ xin Hoàng thượng chỉ xét người có tội","Xin Hoàng thượng cho nộp thư","Sai {maid} ra cửa cung","Bảo ông nhắn cho con gái ông"],bad:["Bảo nàng không cần khai","Ký tên cùng nhà {v}","Không nhận thư","Không nghe"],x:[A=>!!rv67(A,"foe")&&S.duc>=RR("td_tha_11").bar,"Đức từ "+RR("td_tha_11").bar],
 t:"{foe} quỳ trước Hoàng thượng, không nhắc đến cha bằng chữ cha. Nàng kể đêm ông tập nét ấn giả, dâng bản nháp tờ sớ nàng giấu bấy lâu. Hoàng thượng sai đưa bản nháp sang Tam ty; {foed} nhìn nét chữ của chính mình, nhận tội từng chữ. Ngự phê ghi rằng con gái nhà vu cáo đã tự tay trả lại sự thật cho nhà bị vu, và ban ơn tha cho mẹ con nàng. Từ đó trong cung, hai người đi đâu cũng có nhau.",
 go:(A,G)=>{S.avenged=true;const e=rv67(A,"foe");if(e){e.enemy=false;return e67ally(e,G[0])}return""},rw:"nt_dongchau",ti:"Người cởi nút thắt hai nhà"}));
