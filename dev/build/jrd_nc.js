/* ================= jrd_nc: the four full roads of «Công chúa hòa thân» (nc, country branches Nam Chiếu / Bắc Địch), chapters .5–.11 (ROAD_MAP.md §4.5) =================
   ONE origin, country branches (owner OD:L1213/L1215): the roads are written ONCE with land tokens ({land} {pv} {mh} {quan} {pa} {pb}) and the
   Bắc Địch branch (S.origin.k "bd", premises bd_* in jorigins.js) plays the SAME chapters .5–.11 under its own premise id (aliases at the end of
   this file: bd_hoa→nc_su, bd_ngua→nc_gian, bd_tuc→nc_tuc, bd_hoang→nc_vuong). Chapter .5 opens on the .4 that was really played: nc openings
   carry NCW(k), Bắc Địch openings BDW(k) (the bd premise ended differently). Helpers RDW / rdRel / rdOan come from jrd_tt.js (same script). */
const ncBd=()=>{try{return S.origin.k==="bd"}catch(e){return false}};
RDQ.ncvBL=()=>RD_FL("nc_vuong.bought")||RD_FL("nc_vuong.loser");/* named predicate an odds term in BAL.road.fx reads (rdOdds "q") */
const NCL={nc:{land:"Nam Chiếu",pv:"Phụ vương",mh:"Mẫu hậu",quan:"Quốc vương",pa:"Hoàng huynh",pb:"hoàng thúc",canh:"canh chua",laq:"lá rừng",nden:"thả đèn hoa trên nước"},
 bd:{land:"Bắc Địch",pv:"Phụ hãn",mh:"Khả đôn",quan:"Khả hãn",pa:"Đại huynh",pb:"nhị huynh",canh:"canh sữa dê",laq:"cỏ thảo nguyên",nden:"thắp đèn bơ quanh chùa"}};
if(typeof TOK67==="object")Object.assign(TOK67,{land:()=>NCL[ncBd()?"bd":"nc"].land,pv:()=>NCL[ncBd()?"bd":"nc"].pv,mh:()=>NCL[ncBd()?"bd":"nc"].mh,
 quan:()=>NCL[ncBd()?"bd":"nc"].quan,pa:()=>NCL[ncBd()?"bd":"nc"].pa,pb:()=>NCL[ncBd()?"bd":"nc"].pb,
 canh:()=>NCL[ncBd()?"bd":"nc"].canh,laq:()=>NCL[ncBd()?"bd":"nc"].laq,nden:()=>NCL[ncBd()?"bd":"nc"].nden});
/* opening filters of chapter .5: NCW after a Nam Chiếu premise, BDW after a Bắc Địch premise (k as RDW) */
const NCW=k=>()=>!ncBd()&&RDW(k)();
/* months of cấm túc a road ending applies (S.confined, j3 counts it down): BAL.road.ncConf (jbal2.js) */
const NCCF=k=>BAL.road.ncConf[k];
const NCCW=k=>typeof kitNumVi==="function"?kitNumVi(NCCF(k)):"vài";
const ncConfine=k=>{S.confined=Math.max(S.confined||0,NCCF(k));return ""};
const BDW=k=>()=>ncBd()&&RDW(k)();
/* officials' wives enter the palace to greet the Thái hậu / Hoàng hậu and are received by her on the way (road-history rule 11); no one to greet → no visit */
const NC_MP=()=>!S.thDead?"Thái hậu":qOn()?"Hoàng hậu":"";
const NC_MPOK=()=>!!NC_MP();
/* ---------- nc_gian · Mật lệnh cố quốc ---------- */
/* Written ONCE for both country branches: Nam Chiếu (premise nc_gian) and Bắc Địch (premise bd_ngua plays these chapters, alias in nc_tail).
   Land words only through tokens {land} {pv} {mh} {quan} {pa} {pb}. Chapter .5 openings: NCW(k) after nc_gian .4, BDW(k) after bd_ngua .4.
   Story-only NPC: lão Kha, a merchant of {land} lodging at Hội Đồng quán (the go-between); the envoy of {land} (§5.4 row exists).
   BAL.road.nc_gian = {} (no chapter constants: deadlines are told in text, costs inline as in jrd_tt). */
rdDef("nc_gian",5,{t:"Đường thư qua Hội Đồng quán",w:"maid",sj:"đường thư về {land}",cast(A){return rdCast(A,["v"])},
 g:"{pv} không coi ván trước là xong. Lão Kha, một lái buôn {land} trọ ở Hội Đồng quán, được giao làm người đưa thư cho ngươi. Ai cầm đầu sợi dây ấy, người đó định tin gì về đến cố quốc.",
 p:[["s1","s2","s3","s4","s5"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư khen của {pv}",w:"maid",if:()=>NCW(1)()&&rdPrev()!=="win2",t:"Hai nước vừa ngừng binh nhờ thư ngươi viết. {pv} gửi thư khen, nhưng cuối thư có một dòng: “Hòa là để thở. Con hãy cho ta biết Đại Hy rút bao nhiêu quân khỏi ải.” Người mang thư là lão Kha, lái buôn {land} trọ ở Hội Đồng quán.",o:[
  {n:"Đưa thư cho Hoàng thượng xem",sc:1,f:"court",wx:"ngài thấy ngươi không giấu điều gì",lx:"Hoàng thượng hỏi vì sao thư lọt được vào cung; cố quốc biết ngươi trình thư",rt:"Hoàng thượng đọc xong, đặt tay lên tay ngươi: “Trẫm nhớ lần này.”",rf:"Hoàng thượng chỉ nói: “Sao thư vẫn vào được cung?”"},
  {n:"Hồi thư: đã hòa thì thôi dò",f:"court",wx:"lòng ngay thẳng",lx:"{pv} cho là con gái đã quên nước",rt:"Ngươi viết bốn chữ, gấp lại, trao lão Kha."},
  {n:"Nhận lão Kha làm người đưa thư riêng",sc:1,f:"hold",wx:"đường thư nằm trong tay ngươi",lx:"lão Kha nhận bạc hai đầu",rt:"Lão Kha cúi đầu: từ nay thư nào đi, thư nào đến, đều qua mắt ngươi trước.",rf:"Lão Kha nhận bạc, rồi vẫn báo hết về {land}."}]},
 s2:{h:"Vàng tạ ơn và lệnh mới",w:"maid",if:()=>NCW(1)()&&rdPrev()==="win2",t:"{pv} gửi vàng tạ ơn vì mùa thu năm trước. Kèm vàng là lệnh mới, do lão Kha, lái buôn {land} ở Hội Đồng quán, mang vào: chép cho được bản đồ các kho lương dọc ải. Ngươi đã giúp một lần, cố quốc tin ngươi sẽ giúp lần nữa.",o:[
  {n:"Nhận vàng, nhận lệnh",f:"home",wx:"cố quốc gửi vàng, tin ngươi trọn vẹn",lx:"nhận vàng là nhận một sợi dây buộc",rt:"Lão Kha để lại hộp vàng, dặn ngày quay lại."},
  {n:"Trả vàng, im lặng",f:"court",wx:"tay sạch",lx:"{pv} giận, cố quốc thôi tin",rt:"Hộp vàng theo đoàn buôn về nước, nguyên niêm."},
  {n:"Nhận vàng, khất lệnh",sc:1,f:"hold",wx:"có vàng mà chưa phải làm gì",lx:"lão Kha thấy ngươi dùng dằng",rt:"Lão Kha gật đầu: “Công chúa cứ thong thả.”",rf:"Lão Kha cười nhạt: “Vàng không chờ lâu.”"}]},
 s3:{h:"Thư vẫn đến",w:"maid",if:NCW(0),t:"Từ mùa thu năm ấy, ngoài cung ngươi lúc nào cũng có một thị vệ đứng xa xa. Vậy mà thư {pv} vẫn đến, qua tay lão Kha, lái buôn {land} ở Hội Đồng quán: “Đừng sợ. Kẻ đã bị nghi rồi là kẻ người ta thôi canh.”",o:[
  {n:"Trình thư để rửa nghi",sc:1,f:"court",wx:"Hoàng thượng bớt nghi",lx:"ngài hỏi vì sao thư vẫn lọt vào",rt:"Hoàng thượng đọc, rồi bảo người thôi đứng ngoài cung ngươi.",rf:"Hoàng thượng cho canh cung ngươi chặt hơn."},
  {n:"Đốt thư, cắt đường",f:"court",wx:"không còn dấu",lx:"cố quốc sẽ tìm đường khác, khó đoán hơn",rt:"Thư thành tro trong lò hương."},
  {n:"Hồi thư bằng mật ngữ thuở nhỏ",sc:1,f:"hold",wx:"thư đi mà không ai đọc được",lx:"chữ lạ bị chặn thì càng thêm nghi",rt:"Lão Kha giấu thư trong bao trà, ra cửa thành êm ả.",rf:"Thị vệ giữ bao trà lại một đêm."}]},
 s4:{h:"Ngựa mới từ {land}",w:"emp",if:BDW(1),t:"Tiếng nữ kỵ của ngươi về đến {land}. {pv} gửi sang mười con ngựa quý dâng Hoàng thượng, người dắt ngựa là lão Kha, sau đó trọ lại Hội Đồng quán. Trong bờm con ngựa đầu đàn có tết một cuộn lụa: “Con đã cưỡi ngựa bên vua Đại Hy. Hãy cho ta biết quân mã Đại Hy đóng ở những ải nào.”",o:[
  {n:"Dâng cả cuộn lụa lên Hoàng thượng",sc:1,f:"court",wx:"ngài thấy ngươi không giấu",lx:"triều thần bàn tán: ngựa {land} mang cả thư",rt:"Hoàng thượng cười: “Ngựa thì trẫm nhận, thư thì nàng giữ lòng là được.”",rf:"Hoàng thượng sai Thượng tứ viện khám kỹ cả mười con ngựa."},
  {n:"Đốt lụa, nhận ngựa",f:"court",wx:"không để lại dấu",lx:"{pv} chờ mãi không thấy hồi âm",rt:"Cuộn lụa cháy trong lò sưởi chuồng ngựa."},
  {n:"Giữ lão Kha lại làm người đưa thư",sc:1,f:"hold",wx:"đường thư nằm trong tay ngươi",lx:"một người lạ đi lại giữa cung và Hội Đồng quán",rt:"Lão Kha nhận lời: thư nào đi, đều qua tay ngươi trước.",rf:"Lão Kha nhận bạc, rồi vẫn báo hết về {land}."}]},
 s5:{h:"Người giữ chuồng ở Thượng tứ viện",w:"maid",if:BDW(0),t:"Đàn ngựa hồi môn của ngươi nay ở trong chuồng Đại Hy, chẳng ai nhớ chủ của chúng. Nhưng một người giữ chuồng ở Thượng tứ viện vốn là người {land}. Y lén đưa ngươi cuộn lụa của {pv} và chỉ đường: thư từ nay đi qua lão Kha, lái buôn trọ ở Hội Đồng quán.",o:[
  {n:"Trình cuộn lụa lên Hoàng thượng",sc:1,f:"court",wx:"ngài thấy ngươi một lòng",lx:"người giữ chuồng bị bắt, cố quốc biết ngươi trình thư",rt:"Hoàng thượng đọc, rồi chỉ sai người đổi kẻ giữ chuồng sang việc khác.",rf:"Hoàng thượng hỏi lại: “Ngựa của nàng còn mang theo gì nữa?”"},
  {n:"Đốt lụa, dặn y đừng đến nữa",f:"court",wx:"không còn dấu",lx:"cố quốc sẽ tìm đường khác",rt:"Người giữ chuồng cúi đầu lui ra."},
  {n:"Hồi thư qua lão Kha bằng mật ngữ",sc:1,f:"hold",wx:"thư đi mà không ai đọc được",lx:"chữ lạ bị chặn thì càng thêm nghi",rt:"Thư giấu trong bao cỏ khô, ra khỏi kinh êm ả.",rf:"Thị vệ giữ bao cỏ lại một đêm."}]},
 c1:{h:"Lão Kha ra giá",w:"maid",t:"Lão Kha nhắn vào: đường thư cần tiền lót tay lính gác cửa Tây Hoa và người đánh xe. Mỗi mùa một khoản, thiếu thì thư nằm lại.",o:[
  {n:"Trả đủ, dặn lão giữ miệng",wx:"đường thư êm",lx:"bạc ra mỗi mùa",rt:"Lão Kha nhận bạc, lính gác thôi hỏi han."},
  {n:"Cho cung nữ thân tín tự đi đường riêng",sc:1,wx:"không phải qua tay ai",lx:"cung nữ bị hỏi ở cửa cung",rt:"{maid} tìm được một lối qua phòng giặt.",rf:"{maid} bị thái giám gác cửa giữ lại hỏi chuyện."},
  {n:"Bảo lão tự lo lấy",wx:"không tốn gì",lx:"lão Kha báo về {land} rằng ngươi keo kiệt",rt:"Lão Kha im lặng mấy ngày rồi vẫn đến."}]},
 c2:{h:"{v} để ý cửa Tây Hoa",w:"v",need:["v"],t:"Người của {v} thấy cung nữ của ngươi ba lần ra cửa Tây Hoa trong một tháng. Nàng ta bắt đầu hỏi han Hội Đồng quán có ai người {land}.",o:[
  {n:"Đổi hẳn lối đi",wx:"{v} mất dấu",lx:"{v} biết ngươi đã đề phòng",go:A=>{rdOan(A,"v",5)},rt:"Từ đó thư đi qua phòng giặt, không qua cửa Tây Hoa."},
  {n:"Cho {v} thấy một việc vô hại",sc:1,wx:"{v} theo nhầm đường",lx:"{v} càng nghi",go:(A,ok)=>{if(!ok)rdOan(A,"v",6)},rt:"Người của {v} theo cung nữ ra chợ, chỉ thấy nàng mua chỉ thêu.",rf:"{v} cười: “Mua chỉ thêu mà phải đi ba lần?”"},
  {n:"Mời {v} sang uống trà, nói chuyện quê nhà",sc:1,wx:"{v} bớt tò mò",lx:"{v} thấy ngươi chột dạ",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} nghe ngươi kể chuyện quê, rồi thôi hỏi.",rf:"{v} uống trà, mắt không rời cung nữ của ngươi."}]},
 t1:{h:"Bản đồ kho lương",w:"emp",t:"Lão Kha nhắn lệnh thật của {pv}: chép cho được các kho lương dọc ải. Bản đồ ấy nằm trong ngự thư phòng, nơi ngươi thỉnh thoảng vào mài mực cho Hoàng thượng.",o:[
  {n:"Ghi nhớ thật",sc:1,f:"home",wx:"cố quốc có tin thật",lx:"bị bắt gặp đứng trước án",rt:"Ngươi nhớ được năm kho lớn.",rf:"Hoàng thượng quay lại, thấy ngươi nhìn bản đồ."},
  {n:"Ghi nhớ, rồi sửa đi khi chép",sc:1,f:"double",wx:"cố quốc tin mà Đại Hy không thiệt",lx:"tin sai bị nhận ra",rt:"Ngươi chép một bản đồ nửa thật nửa giả.",rf:"Ngươi chép vội, nét sửa còn lộ."},
  {n:"Không nhìn, báo lão Kha là không vào được",f:"court",wx:"tay sạch",lx:"{pv} cho là ngươi lười việc nước",rt:"Ngươi chỉ mài mực, mắt nhìn xuống nghiên."}]},
 x1:{h:"Đoàn buôn rời kinh",w:"maid",t:"Cuối tháng, đoàn buôn của lão Kha rời kinh. Thư gửi {pv} phải đi theo đoàn ấy, hoặc không đi. Lính cửa thành mấy hôm nay khám xe kỹ hơn thường lệ.",o:[
  {n:"Gửi bản tin do ngươi chọn từng chữ",e:["win","lose"],rt:"{pv} nhận thư, tin con gái. Lão Kha từ nay chỉ chuyển thư của ngươi.",rf:"Lính cửa thành khám xe, một tờ thư rơi ra. Lão Kha chạy thoát, nhưng cấm quân giữ tờ thư."},
  {n:"Gửi tin thật để {pv} yên lòng",wx:"{pv} tin ngươi, tin từ cố quốc về đến tay ngươi trước",e:["mid","lose"],rt:"Thư thật về đến {land}. {pv} yên lòng, còn ngươi thì mang thêm một điều phải giấu.",rf:"Lính cửa thành khám xe, tờ thư thật rơi vào tay cấm quân."},
  {n:"Không gửi gì, để đoàn đi tay không",e:"mid",lx:"{pv} chờ trong im lặng",rt:"Đoàn buôn ra khỏi cửa thành, không mang theo một chữ của ngươi."}]}},
 E:{win:{k:1,tag:"Đường thư trong tay ngươi",w:"maid",t:"Thư nào về {land}, thư nào đến cung ngươi, đều qua tay lão Kha, và lão Kha chỉ nghe ngươi. Cố quốc biết gì, từ nay do ngươi định."},
  mid:{k:0,tag:"Sợi dây còn đó",t:"Đoàn buôn đã đi. Cố quốc chưa giận, Đại Hy chưa biết, nhưng sợi dây giữa ngươi và {land} vẫn còn nguyên đó."},
  lose:{k:-1,tag:"Một tờ thư lọt vào tay cấm quân",w:"emp",t:"Cấm quân giữ một tờ thư không ký tên, chữ viết như chữ người trong cung. Chưa ai nói ra, nhưng Hoàng thượng đã cho người đọc nó.",go:()=>e67bien(-2)}}});

rdDef("nc_gian",6,{t:"Tấm lộ dẫn",w:"maid",sj:"rương hàng của lão Kha",cast(A){return rdCast(A,["v"])},
 g:"Lão Kha trở lại kinh với đoàn buôn mới, nhưng bị giữ ở cửa Chính Dương: thiếu lộ dẫn của bộ Lễ, hàng sẽ bị khám đến đáy rương. Trong một rương có thư của {pv}. Trước rằm tháng này phải có lộ dẫn, hoặc rương ấy phải biến mất.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Lão Kha cầu cứu",w:"maid",if:RDW(1),t:"Lão Kha, nay chỉ nghe ngươi, nhắn vào cung qua cung nữ: đoàn xe bị giữ ngoài cửa Chính Dương, lính gác hẹn đến rằm sẽ mở rương. Lão không sợ mất hàng, chỉ sợ mất đầu.",o:[
  {n:"Hứa lo cho lão",sc:1,wx:"lão Kha yên lòng, giữ miệng",lx:"hứa rồi thì phải làm cho được",rt:"Lão Kha nhắn lại một chữ: “Chờ.”"},
  {n:"Bảo lão tự đốt rương",wx:"thư cháy, không còn dấu",lx:"bồi hàng cho lão",rt:"Lão Kha gật đầu, nhưng xin ngươi bồi một nửa giá hàng."},
  {n:"Dò xem ai ra lệnh giữ xe",sc:1,wx:"biết kẻ đứng sau",lx:"lộ ra ngươi quan tâm đến một đoàn buôn",rt:"Lệnh giữ xe không phải của bộ Lễ, mà của một viên quan giữ cửa.",rf:"Không ai dám nói."}]},
 s2:{h:"Lại bị giữ ở cửa thành",w:"maid",if:RDW(0),t:"Lần trước đường thư suýt đứt. Lần này đoàn buôn của lão Kha bị giữ ngay ở cửa Chính Dương, lính gác hẹn đến rằm sẽ mở rương. Lão nhắn vào: “Nếu rương mở, lão không chết một mình.”",o:[
  {n:"Nhắn lại: lão sẽ không chết",sc:1,wx:"lão Kha tạm yên",lx:"lão Kha nghe ra ngươi chỉ hứa",rt:"Lão Kha thôi dọa.",rf:"Lão Kha nhắn lại lời dọa lần thứ hai."},
  {n:"Gửi bạc để lão lo lót",wx:"có người lo việc ở cửa thành",lx:"bạc của ngươi nằm trong tay lão",rt:"Lão Kha nhận bạc, lính gác hoãn mở rương."},
  {n:"Cắt đứt với lão",wx:"không dính thêm",lx:"rương mở thì không ai đỡ ngươi",rt:"Ngươi không hồi âm."}]},
 c1:{h:"Lộ dẫn của bộ Lễ",w:"emp",t:"Lộ dẫn cho đoàn buôn ngoại quốc do bộ Lễ cấp. Một chủ sự nói được việc, nhưng y muốn có người đứng tên bảo lãnh.",o:[
  {n:"Gửi bạc qua lão Kha mua lộ dẫn",sc:1,f:"pass",wx:"có giấy trước rằm",lx:"chủ sự đòi thêm bạc, và giữ tên ngươi trong sổ",rt:"Chủ sự đóng dấu, không hỏi thêm.",rf:"Chủ sự nhận bạc rồi đòi thêm."},
  {n:"Xin Hoàng thượng ân cho thương nhân quê nhà",sc:1,f:"pass",wx:"lộ dẫn đến từ ân vua",lx:"Hoàng thượng nhớ tên đoàn buôn này",rt:"Hoàng thượng phẩy bút: “Cho họ đi lại dễ hơn.”",rf:"Hoàng thượng bảo: “Việc của bộ Lễ, nàng đừng xen.”"},
  {n:"Không đứng tên ai",wx:"không để lại dấu",lx:"không có giấy",rt:"Ngươi để mặc bộ Lễ."}]},
 c2:{h:"Viên quan giữ cửa",w:"v",need:["v"],t:"Viên quan giữ cửa Chính Dương là anh họ của {v}. Hắn đã báo về cung nàng ta: rương thứ ba của đoàn buôn {land} có mùi mực mới.",o:[
  {n:"Cho người nói với hắn: đó là hàng tiến cung",sc:1,wx:"hắn không dám mở",lx:"hắn báo lại với {v} rằng ngươi che",go:(A,ok)=>{rdOan(A,"v",ok?6:3)},rt:"Viên quan giữ cửa lùi lại, cho xe vào sân chờ.",rf:"Hắn cười: “Hàng tiến cung thì càng phải khám.”"},
  {n:"Tìm cái sai của hắn",sc:1,wx:"nắm thóp hắn",lx:"{v} biết ngươi đánh vào nhà nàng",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"Hắn thu tiền qua cửa không vào sổ. Hắn im ngay.",rf:"Hắn sạch hơn ngươi tưởng."},
  {n:"Gặp {v} dàn xếp",sc:1,wx:"hai cung tạm yên",lx:"{v} biết ngươi có điều phải giấu",go:(A,ok)=>{rdRel(A,"v",ok?10:-8)},rt:"{v} nói: “Một rương hàng thôi mà.” Rồi cho người dặn anh họ.",rf:"{v} cười: “Thì ra có thật.”"}]},
 t1:{h:"Rương thứ ba",w:"maid",t:"Rương thứ ba nằm trong sân cửa thành, có lính canh đêm. Thư của {pv} khâu dưới lớp vải lót.",o:[
  {n:"Cho người lẻn vào đổi lớp lót",sc:1,wx:"rương sạch trước rằm",lx:"người của ngươi bị bắt gặp",rt:"Lớp lót mới, thư cũ đã nằm trong tay áo cung nữ.",rf:"Lính canh hô lên, người của ngươi chạy thoát mà để lại dấu giày."},
  {n:"Gửi lão Kha mật ngữ đổi chữ trong thư",sc:1,wx:"thư có bị đọc cũng thành thư nhà",lx:"chữ đổi vụng, càng lạ",rt:"Lão Kha bôi bỏ mấy dòng, thư chỉ còn lời hỏi thăm.",rf:"Lão Kha không kịp sửa."},
  {n:"Để nguyên, tin vào niêm",wx:"không động thì không lộ",lx:"rương mở là hết đường",rt:"Ngươi chờ đến rằm."}]},
 x1:{h:"Ngày rằm",w:"maid",t:"Rằm đến. Viên quan giữ cửa cho mở rương trước mặt dân buôn. Ngươi chỉ còn một nước đi trước giờ Thìn.",o:[
  {n:"Đưa lộ dẫn ra trước giờ khám",e:["win","lose"],rt:"Lộ dẫn đến kịp. Xe qua cửa, rương không ai mở.",rf:"Lộ dẫn đến muộn nửa khắc. Rương đã mở."},
  {n:"Tự đến trình Hoàng thượng: rương có thư nhà",e:["win","mid"],rt:"Hoàng thượng cười: “Thư nhà thì cứ để nàng đọc.” Ngài sai trả rương nguyên vẹn.",rf:"Hoàng thượng cho mở rương trước mặt ngài; thư chỉ còn lời thăm hỏi, nhưng ngài nhớ."},
  {n:"Bảo lão Kha đốt rương ngay trong đêm",e:"mid",lx:"mất hàng, mất thư, {pv} không có tin",rt:"Lửa cháy một góc sân cửa thành. Lão Kha chịu phạt vì bất cẩn."}]}},
 E:{win:{k:1,tag:"Rương qua cửa, thư về tay",w:"maid",t:"Thư của {pv} đến tay ngươi nguyên niêm. Viên quan giữ cửa mất một mẻ, và ai cũng thấy: đoàn buôn {land} có người che chở.",go:A=>{rdOan(A,"v",6);return""}},
  mid:{k:0,tag:"Rương không còn gì",t:"Rương qua cửa, nhưng thư không còn. Đường thư chưa đứt, cũng chưa yên."},
  lose:{k:-1,tag:"Rương bị mở trước dân buôn",w:"v",t:"Rương thứ ba bị mở. Thư chỉ còn vài dòng nhòe, không ai đọc ra là gì, nhưng cả kinh thành bàn chuyện đoàn buôn {land} giấu thư. {v} nghe trước tiên.",go:A=>{rdOan(A,"v",8);return""}}}});

rdDef("nc_gian",7,{t:"Mắt của Hoàng thượng",w:"emp",sj:"lời {v} dâng lên Hoàng thượng",cast(A){return rdCast(A,["v"])},
 g:"{v} tâu: trong cung có người viết thư về {land}. Hoàng thượng không tin hẳn, cũng không bỏ qua. Ngài cho thị vệ đứng ngoài cung ngươi, và tự mình thử ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài đến không báo trước",w:"emp",if:RDW(1),t:"Đường thư êm được một mùa thì Hoàng thượng đến cung ngươi giữa trưa, không cho thái giám báo trước. Ngài nhìn quanh án thư, nhìn nghiên mực còn ướt.",o:[
  {n:"Mời ngài xem chữ ngươi đang chép",sc:1,wx:"ngài thấy ngươi chỉ chép kinh",lx:"ngài lật xem từng tờ",rt:"Ngài đọc nửa trang kinh, khen nét chữ.",rf:"Ngài lật hết chồng giấy, không nói gì."},
  {n:"Pha trà, không nhắc gì",wx:"bình thản",lx:"ngài không biết ngươi nghĩ gì",rt:"Ngài uống hết chén trà rồi đi."},
  {n:"Hỏi thẳng: ngài nghe ai tâu",sc:1,wx:"ngài thích sự thẳng thắn",lx:"ngài thấy ngươi chột dạ",rt:"Ngài cười: “Ái phi đoán được rồi còn hỏi.”",rf:"Ngài đặt chén xuống: “Nàng sợ gì?”"}]},
 s2:{h:"Thị vệ đổi ca trước cửa cung",w:"emp",if:RDW(0),t:()=>(rdPrev()==="lose"?"Từ khi tờ thư nhòe trong rương {land} thành chuyện cả kinh thành bàn":"Rương {land} qua cửa mà thư không thấy đâu, lời đồn chưa dứt")+", thị vệ trước cửa cung ngươi đổi ca ba lần một ngày. Cung nữ ra vào đều bị hỏi tên.",o:[
  {n:"Đóng cửa cung, chép kinh",wx:"tỏ ra không giấu gì",lx:"chẳng ai nói giúp ngươi",rt:"Ngươi chép kinh suốt một tháng."},
  {n:"Sai người mang canh đến Dưỡng Tâm điện",sc:1,wx:"ngài nhớ ngươi",lx:"canh bị trả về",rt:"Hoàng thượng cho gọi ngươi đến.",rf:"Canh nguội ngoài cửa điện."},
  {n:"Đối đãi tử tế với thị vệ",wx:"thị vệ báo lên những lời tốt",lx:"bị nói là mua chuộc lính canh",rt:"Thị vệ trưởng nhận chén trà nóng, gật đầu."}]},
 c1:{h:"Cung nữ bị gọi đi hỏi",w:"maid",t:"Thị vệ gọi {maid} đi hỏi chuyện: ai ra cửa Tây Hoa, ai gặp người Hội Đồng quán.",o:[
  {n:"Dặn nàng nói thật những gì vô hại",sc:1,wx:"lời khai sạch",lx:"lời thật cũng có thể bị bóp méo",rt:"{maid} về, kể lại từng câu, không sót một câu nào nguy.",rf:"{maid} lỡ lời nhắc đến lão Kha."},
  {n:"Xin Hoàng hậu cho nàng được miễn hỏi",sc:1,need:["hh"],wx:"cung nữ không bị hỏi",lx:"Hoàng hậu biết ngươi có điều lo",rt:"Hoàng hậu nói một câu, thị vệ thôi gọi.",rf:"Hoàng hậu bảo: “Không có gì thì sợ gì hỏi.”"},
  {n:"Để nàng tự đáp",wx:"không dạy ai nói dối",lx:"nàng run, nói lộn xộn",rt:"{maid} đáp ngắn, thị vệ ghi rồi cho về."}]},
 c2:{h:"{v} xin khám cung ngươi",w:"v",need:["v"],t:"{v} quỳ trước Hoàng thượng, xin cho khám cung ngươi “để rửa tiếng cho tỷ tỷ”.",o:[
  {n:"Xin khám luôn cả cung {v}",sc:1,wx:"công bằng, {v} lùi bước",lx:"thành ra hai cung đấu nhau",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"{v} tái mặt, thôi không xin nữa.",rf:"Hoàng thượng gạt cả hai đi."},
  {n:"Tự mở cửa cung mời khám",sc:1,wx:"tỏ lòng trong sạch",lx:"bị lục tung trước mắt mọi người",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Khám cả ngày không thấy gì. {v} mất mặt.",rf:"Khám thấy một bức thư mẹ ngươi viết, chữ {land}, ai cũng nhìn."},
  {n:"Nhờ người nói xấu nhà {v} một câu",sc:1,wx:"{v} phải lo cho mình",lx:"Hoàng thượng chán chuyện hai cung",go:A=>{rdOan(A,"v",12)},rt:"{v} bận chạy tội cho nhà, thôi nhắc đến ngươi.",rf:"Lời đồn quay về chính ngươi."}]},
 t1:{h:"Hoàng thượng kể chuyện biên ải",w:"emp",t:"Đêm khuya, Hoàng thượng nói như vô tình: “Tháng sau trẫm rút một vạn quân ở ải giáp {land} về kinh.” Ngươi biết ngài đang thử.",o:[
  {n:"Giữ kín, không báo lão Kha",sc:1,f:"court",wx:"ngài thấy tin không lọt",lx:"nếu là thật, cố quốc lỡ một tin lớn",rt:"Một tháng sau, không ai ngoài cung nhắc chuyện ấy."},
  {n:"Báo về {land} kèm lời: tin này là bẫy",sc:1,f:"double",wx:"cố quốc tin ngươi mà không mắc bẫy",lx:"tin vẫn đi, ngài vẫn biết",rt:"{pv} không động binh. Hoàng thượng chẳng thấy gì lọt ra.",rf:"Thư đi, và ngài biết có thư đi."},
  {n:"Hỏi ngài sao nói với thiếp",sc:1,wx:"ngài thích sự thẳng thắn",lx:"ngài cho là ngươi quá để tâm",rt:"Hoàng thượng cười: “Không thật. Trẫm chỉ muốn xem nàng.”",rf:"Hoàng thượng không đáp."}]},
 x1:{h:"Đêm khám cung",w:"emp",t:"Canh ba, tổng quản Nội vụ phủ dẫn thái giám đến cửa cung ngươi với khẩu dụ: khám thư từ. Hoàng thượng không đến, nhưng ngài sẽ đọc tờ tấu sáng mai.",o:[
  {n:"Mở hết cửa, quỳ chờ",e:["win","mid"],rt:"Khám đến sáng không thấy gì. Tờ tấu chỉ có một dòng: “Không có gì.”",rf:"Khám ra vài thư nhà chữ {land}. Không có gì sai, nhưng tờ tấu dài ba trang."},
  {n:"Giấu sổ mật ngữ trước khi mở cửa",e:["win","lose"],rt:"Sổ mật ngữ nằm trong ruột gối của cung nữ. Người Nội vụ phủ về tay không.",rf:"Thái giám Nội vụ phủ lật gối. Sổ mật ngữ rơi ra."},
  {n:"Xin Hoàng thượng tự đến khám",e:["win","lose"],rt:"Hoàng thượng đến, nhìn ngươi, rồi bảo người Nội vụ phủ lui: “Trẫm không cần khám.”",rf:"Hoàng thượng không đến. Tổng quản Nội vụ phủ tâu rằng ngươi kháng chỉ."}]}},
 E:{win:{k:1,tag:"Hoàng thượng thôi nghi",w:"emp",t:"Người Nội vụ phủ lui. Hoàng thượng đến cung ngươi như cũ, và {v} bị khiển trách vì vu cáo.",go:A=>{rdOan(A,"v",8);return""}},
  mid:{k:0,tag:"Nghi ngờ chưa tan",t:"Không tìm ra gì, nhưng tờ tấu vẫn nằm trên án Hoàng thượng. Ngài vẫn đến, chỉ ít nói hơn."},
  lose:{k:-1,tag:"Cung ngươi bị để mắt",w:"emp",t:"Sổ mật ngữ bị đem đi. Không ai đọc được, nhưng từ đó Hoàng thượng cho thị vệ để mắt đến cung ngươi."}}});

rdDef("nc_gian",8,{t:"Hai lòng",w:"emp",sj:"tin về đường hành quân",cast(A){return rdCast(A,["v"])},
 g:"Mấy trại biên ải của {land} cướp phá thôn Đại Hy. Triều đình bàn đánh trả. Sứ thần {land} vào kinh để giải bày, còn {pv} chỉ cần một điều: quân Đại Hy sẽ qua ải nào. Gửi tin thật, tin giả, hay không gửi gì, máu đổ ở đâu là do ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài tin ngươi, nên ngài kể",w:"emp",if:RDW(1),t:"Từ khi thôi nghi, Hoàng thượng kể việc triều với ngươi. Đêm nay ngài nói: “Trẫm phải đánh. Không đánh thì dân biên ải nói trẫm bỏ họ.”",o:[
  {n:"Khuyên ngài đánh nhỏ, đừng đánh lớn",sc:1,wx:"ngài nghe",lx:"ngài cho là ngươi bênh cố quốc",rt:"Ngài gật đầu: “Chỉ phạt mấy trại cướp.”",rf:"Ngài im lặng hồi lâu."},
  {n:"Chỉ nghe, không nói",f:"court",wx:"ngài không thấy ngươi xen",lx:"ngươi không đổi được gì",rt:"Ngươi rót thêm trà."},
  {n:"Hỏi khéo đường quân",sc:1,f:"home",wx:"biết được ải nào",lx:"ngài thấy ngươi dò",rt:"Ngài vẽ ngón tay lên án: ải phía tây.",rf:"Ngài nhìn ngươi: “Nàng hỏi cho ai?”"}]},
 s2:{h:"Ngài không kể nữa",w:"emp",if:RDW(0),t:"Từ đêm khám cung, Hoàng thượng không nhắc một lời việc biên ải ở cung ngươi. Tin đánh trả {land} ngươi nghe từ miệng cung nữ.",o:[
  {n:"Hỏi Hoàng hậu",need:["hh"],sc:1,wx:"biết hướng gió",lx:"Hoàng hậu thấy ngươi để tâm quá",rt:"Hoàng hậu nói một câu, đủ để ngươi hiểu.",rf:"Hoàng hậu chỉ cười."},
  {n:"Chờ lão Kha đưa tin ngoài thành",wx:"biết tin ngoài triều",lx:"tin chậm và mua bằng bạc",rt:"Lão Kha nghe được ở chợ ngựa: quân đang dồn về phía tây."},
  {n:"Đóng cửa, thắp hương cầu cho cả hai nước",wx:"lòng yên",lx:"không biết gì, không làm gì",rt:"Khói hương bay qua song cửa."}]},
 c1:{h:"Sứ thần {land} vào triều",w:"emp",t:"Sứ thần {land} là một lão thần từng bế ngươi thuở nhỏ. Ông xin một buổi gặp “để chuyển lời {mh}”; theo lệ, sứ thần chỉ gặp phi tần trong buổi gia lễ ở nội điện.",o:[
  {n:"Xin Hoàng thượng cho gặp trong buổi gia lễ ở nội điện, có ngài ngồi đó",f:"court",wx:"không có gì giấu",lx:"sứ thần không nói được điều cần nói",rt:"Sứ thần chỉ nói chuyện {mh}, mắt nhìn ngươi đầy ý."},
  {n:"Sai cung nữ thân tín ra Hội Đồng quán nghe lời",sc:1,f:"home",wx:"nghe được lời thật của {pv}",lx:"người của ngươi bị thấy ra vào Hội Đồng quán",rt:"Cung nữ về thuật lại lời sứ thần: {pv} chỉ cần biết ải nào, không cần hơn.",rf:"Thị vệ thấy cung nữ của ngươi trước cửa Hội Đồng quán."},
  {n:"Từ chối gặp",wx:"không dính",lx:"sứ thần về tâu ngươi đã quên nước",rt:"Sứ thần đứng chờ ngoài cửa cung một khắc rồi về."}]},
 c2:{h:"{v} cho người theo sứ thần",w:"v",need:["v"],t:"Người của {v} theo sứ thần {land} từ Hội Đồng quán đến tận cửa cung ngươi. Nàng ta chờ một cái gật đầu, một chiếc khăn trao tay.",o:[
  {n:"Bắt kẻ theo dõi",sc:1,wx:"{v} mất tai mắt",lx:"ầm ĩ trước mặt sứ thần",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Kẻ theo dõi khai là người của {v}.",rf:"Kẻ theo dõi chạy thoát."},
  {n:"Cho kẻ ấy thấy một cảnh vô hại",sc:1,wx:"{v} tâu sai",lx:"{v} thêu dệt",rt:"{v} tâu rằng sứ thần chỉ dâng ngươi một gói trà.",rf:"{v} vẫn tâu có khăn trao tay."},
  {n:"Mặc kệ",wx:"không động",lx:"{v} tự do thêu dệt",rt:"Ngươi không để ý."}]},
 t1:{h:"Thư {pv} viết tay",w:"maid",t:"Lão Kha đưa vào bức thư chính tay {pv} viết: “Con gái. Nếu quân Đại Hy qua ải phía tây, ta mất ba vạn người. Ta không xin con phản ai. Ta chỉ xin một chữ.”",o:[
  {n:"Đốt thư trước mặt lão Kha",f:"court",wx:"dứt khoát",lx:"lòng đau, cố quốc giận",rt:"Lão Kha nhìn tro bay, không nói gì."},
  {n:"Giữ thư, chưa trả lời",wx:"còn đường chọn",lx:"giữ thư là giữ lửa",rt:"Ngươi giấu thư trong hộp trang điểm."},
  {n:"Viết chữ ấy, nhưng là chữ sai",sc:1,f:"double",wx:"cố quốc tin mà quân Đại Hy không bị phục",lx:"chữ sai có thể làm chết người khác",rt:"Ngươi viết: “Đông.”",rf:"Tay ngươi run, nét chữ nhòe."}]},
 x1:{h:"Bức thư cuối mùa",w:"maid",t:"Đêm trước ngày quân xuất ải, lão Kha chờ ngoài cửa Tây Hoa. Ngươi viết, hoặc không viết.",o:[
  {n:"Gửi tin giả để {land} lui về giữ chỗ khác",e:["win","lose"],rt:"Quân {land} kéo về phía đông. Quân Đại Hy phạt mấy trại cướp rồi về, không đánh một trận lớn nào.",rf:"{pv} không tin, dồn quân về phía tây. Hai bên đánh một trận đẫm máu."},
  {n:"Gửi tin thật để {land} kịp phòng",e:["mid","lose"],rt:"{land} giữ được ải. Quân Đại Hy về tay không, không ai biết vì sao.",rf:"Tin đến, quân {land} phục kích. Đại Hy thua một trận, và Binh bộ bắt đầu tìm kẽ hở."},
  {n:"Không gửi, xin Hoàng thượng chỉ phạt kẻ cướp",e:["win","mid"],rt:"Hoàng thượng nghe, chỉ phạt mấy trại cướp. Biên ải yên mà không ai phải chết.",rf:"Hoàng thượng không đổi ý. Hai bên đánh nhau ở ải phía tây, ngươi không nhúng tay vào đâu."}]}},
 E:{win:{k:1,tag:"Binh đao tránh được",w:"emp",t:"Quân Đại Hy về, quân {land} lui. Mấy trại cướp bị phạt, còn hai nước không mất một trận lớn nào. Chỉ ngươi biết vì sao.",go:()=>e67bien(4)},
  mid:{k:0,tag:"Hai bên đều giữ thế",t:"Biên ải đánh một trận nhỏ rồi thôi. Không bên nào thắng, không bên nào nợ ngươi."},
  lose:{k:-1,tag:"Máu đổ ở ải phía tây",w:"emp",t:"Hai bên đánh một trận lớn. Ai cũng hỏi: tin quân đi đường nào, sao bên kia lại biết.",go:()=>e67bien(-5)}}});

rdDef("nc_gian",9,{t:"Lão Kha bị bắt",w:"maid",sj:"lão Kha trong ngục Đại Lý tự",cast(A){return rdCast(A,["v"])},
 g:"Binh bộ lần ra đoàn buôn {land} chuyên đi qua ải. Lão Kha bị bắt giải về ngục Đại Lý tự. Mười ngày nữa là phiên thẩm vấn. Lão có thể câm, có thể khai, và tên ngươi nằm ở đầu lưỡi lão.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ thắc mắc ở Binh bộ",w:"emp",if:RDW(1),t:"Binh đao tránh được, nhưng một Thị lang bộ Binh cứ thắc mắc: vì sao quân {land} lui đúng lúc ấy. Y lần theo các đoàn buôn qua ải, và tìm ra lão Kha.",o:[
  {n:"Khen công Thị lang trước Hoàng thượng",sc:1,wx:"y được thăng, thôi đào sâu",lx:"y thấy ngươi quá quan tâm",rt:"Hoàng thượng thăng Thị lang, điều y sang việc khác.",rf:"Thị lang càng tò mò ai khen mình."},
  {n:"Để mặc, tin lão Kha câm",wx:"không động thì không lộ",lx:"tin vào miệng một lái buôn",rt:"Ngươi chờ."},
  {n:"Đốt hết thư cũ trong cung",wx:"không còn gì để khám",lx:"mất cả bằng chứng có lợi cho ngươi",rt:"Mọi thư từ {land} thành tro trong một đêm."}]},
 s2:{h:"Tờ thư cũ có chủ",w:"emp",if:RDW(0),t:"Những tờ thư không tên, chuyện khám cung, trận đánh ở ải: Đại Lý tự xếp tất cả lên một án. Lão Kha bị bắt ở chợ ngựa ngoài thành.",o:[
  {n:"Nhờ người hỏi xem ai thẩm án",sc:1,wx:"biết người cầm án",lx:"lộ ra ngươi quan tâm",rt:"Người thẩm án là một Thiếu khanh tiếng thẳng.",rf:"Không ai dám nói."},
  {n:"Đốt hết thư cũ trong cung",wx:"không còn gì để khám",lx:"mất cả bằng chứng có lợi cho ngươi",rt:"Mọi thư từ {land} thành tro trong một đêm."},
  {n:"Viết thư về {land} báo tin",sc:1,wx:"{pv} kịp lo cho người của mình",lx:"thêm một bức thư, thêm một rủi ro",rt:"Thư đi theo đường khác, không qua lão Kha.",rf:"Thư bị chặn ở cửa thành."}]},
 c1:{h:"Ngục Đại Lý tự",w:"maid",t:"Muốn lão Kha biết ngươi chưa bỏ lão, phải có người vào được ngục.",o:[
  {n:"Lót tay cai ngục",sc:1,f:"reach",wx:"lão Kha nhận được lời nhắn",lx:"cai ngục nhớ mặt người đưa bạc",rt:"Cai ngục đưa vào một bát cháo, dưới đáy bát có lời nhắn.",rf:"Cai ngục nhận bạc, rồi báo lên trên."},
  {n:"Xin thái y vào ngục xem bệnh cho phạm nhân ngoại quốc",sc:1,f:"reach",wx:"lời nhắn đi theo hộp thuốc",lx:"thái y kể với người khác",rt:"Thái y vào ngục, lão Kha nhận hộp thuốc.",rf:"Thái y không được cho vào."},
  {n:"Không liên lạc",wx:"không để lại dấu",lx:"lão Kha nghĩ ngươi bỏ lão",rt:"Ngươi im lặng."}]},
 c2:{h:"Cơm của {v}",w:"v",need:["v"],t:"Người của {v} đưa cơm vào ngục cho lão Kha, kèm lời hứa: khai ra người trong cung thì được tha về nước.",o:[
  {n:"Tâu Hoàng thượng có kẻ mua lời khai",sc:1,wx:"lời khai của lão bị coi là nghi",lx:"vụ án càng lớn",go:(A,ok)=>{if(ok)rdOan(A,"v",12)},rt:"Hoàng thượng truyền Đại Lý tự cấm người ngoài đưa cơm.",rf:"Hoàng thượng chỉ bảo Đại Lý tự ghi lại."},
  {n:"Hứa với lão nhiều hơn {v} hứa",sc:1,wx:"lão Kha không nghe {v}",lx:"lời hứa phải trả bằng bạc",rt:"Lão Kha trả lại bát cơm của người nhà {v}.",rf:"Lão Kha nhận cả hai."},
  {n:"Gặp {v}, xin nàng ta dừng tay",sc:1,wx:"bớt một mũi tên",lx:"{v} biết ngươi đang sợ",go:(A,ok)=>{rdRel(A,"v",ok?10:-10)},rt:"{v} nhìn ngươi lâu, rồi bảo người thôi đưa cơm.",rf:"{v} cười: “Tỷ tỷ cũng biết sợ.”"}]},
 t1:{h:"Lão Kha nhắn ra",w:"maid",t:"Lão Kha nhắn ra một câu: vợ con lão ở khu người {land} ngoài thành. Nếu ai đó lo cho họ, lão sẽ câm như đá.",o:[
  {n:"Đưa vợ con lão về {land}",sc:1,wx:"lão Kha câm",lx:"tốn bạc, thêm người biết chuyện",rt:"Vợ con lão Kha đi theo một đoàn buôn khác trong đêm."},
  {n:"Hứa suông",sc:1,wx:"không tốn gì",lx:"lão biết ngươi chỉ hứa",rt:"Lão Kha tạm tin.",rf:"Lão Kha bảo: lời hứa không nuôi được ai."},
  {n:"Nhờ sứ thần {land} lo",sc:1,wx:"người {land} lo cho người {land}",lx:"thêm một lần gặp sứ thần",rt:"Sứ thần đưa vợ con lão về Hội Đồng quán.",rf:"Sứ thần sợ liên lụy, từ chối."}]},
 x1:{h:"Phiên thẩm vấn",w:"emp",t:"Sáng nay Đại Lý tự thẩm lão Kha. Thiếu khanh hỏi: thư trong rương gửi cho ai trong cung.",o:[
  {n:"Lo lót để án chỉ còn là tội buôn lậu",e:["win","lose"],rt:"Đại Lý tự tâu lên: lão Kha chỉ là kẻ buôn lậu. Hoàng thượng phê đuổi về nước. Lão đi, không nói thêm một chữ.",rf:"Thiếu khanh nghi có người lo lót, tra ngược: ai đã chạy án cho lão."},
  {n:"Để lão tự giữ miệng",e:["mid","lose"],rt:"Lão Kha bị đánh ba mươi trượng, vẫn chỉ nói: “Thư nhà của người buôn.”",rf:"Lão Kha ngất đi, tỉnh dậy thì khai một cái tên."},
  {n:"Tâu trước: lão chỉ mang thư nhà cho thiếp",e:["win","mid"],rt:"Hoàng thượng cho rằng ngươi thật thà, phê xử lão tội buôn lậu.",rf:"Hoàng thượng cho giữ lão lại, cùng với lời ngươi tâu."}]}},
 E:{win:{k:1,tag:"Lão Kha bị đuổi về, không khai",w:"maid",t:"Lão Kha ra khỏi ải với hai vết trượng và một cái miệng kín. Án đóng lại, không có tên ai trong cung."},
  mid:{k:0,tag:"Lão Kha nằm trong ngục",t:"Lão Kha còn sống, còn câm, và còn nằm đó. Ai đến hỏi lão một lần nữa, lão có thể đổi lời."},
  lose:{k:-1,tag:"Lão Kha khai ra tên ngươi",w:"emp",t:"Lão Kha khai: thư trong rương gửi cho một vị phi tần người {land}. Không có chữ ký, không có ấn, nhưng ai cũng biết là ai.",go:A=>{rdOan(A,"v",6);return""}}}});

rdDef("nc_gian",10,{t:"Đường cùng",w:"emp",sj:"những bức thư trên án Hoàng thượng",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng cho bày lên án mọi thứ Đại Lý tự thu được về đoàn buôn {land}. Ngài cho gọi ngươi đến một mình. Nhận, chối, hay lật ngược ván cờ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Một bức thư còn sót",w:"emp",if:RDW(1),t:"Lão Kha đi rồi, nhưng trong sổ của Đại Lý tự còn sót một bức thư có nét chữ của ngươi. Hoàng thượng cầm nó đến cung ngươi, không mang theo ai.",o:[
  {n:"Nhận đó là thư nhà",sc:1,wx:"ngài thấy ngươi không chối",lx:"ngài hỏi thư nhà sao lại đi lối ấy",rt:"Ngài gật đầu chậm rãi.",rf:"Ngài không gật đầu."},
  {n:"Xin ngài đọc hết rồi hẵng hỏi",sc:1,wx:"ngài đọc thấy toàn lời thăm hỏi",lx:"ngài đọc thấy chữ lạ",rt:"Ngài đọc xong, cười khẽ: “Nàng viết thư nhà dài thật.”",rf:"Ngài dừng ở một dòng, cau mày."},
  {n:"Im lặng chờ ngài nói",wx:"không lỡ lời",lx:"im lặng cũng là một câu trả lời",rt:"Ngài nhìn ngươi rất lâu."}]},
 s2:{h:"Lời khai trên án",w:"emp",if:RDW(0),t:"Hồ sơ Đại Lý tự về lão Kha nằm trên án Hoàng thượng, cạnh mấy bức thư thu từ rương hàng. Thái giám truyền ngươi đến Dưỡng Tâm điện, đi một mình.",o:[
  {n:"Thay áo trắng, tháo trâm",wx:"tỏ ý nhận tội trước",lx:"cả cung thấy ngươi như kẻ có tội",rt:"Ngươi đi qua dãy hành lang, không ai dám nhìn."},
  {n:"Mặc lễ phục, giữ dáng",sc:1,wx:"cả cung thấy ngươi không sợ",lx:"ngài thấy ngươi ngạo",rt:"Ngươi bước vào điện như ngày được sắc phong.",rf:"Ngài nhìn áo ngươi, mím môi."},
  {n:"Gửi trước một lời xin gặp riêng",sc:1,wx:"ngài cho lui hết người hầu",lx:"ngài để quan Đại Lý tự chờ ngay gian ngoài",rt:"Trong điện chỉ còn ngài và ngươi.",rf:"Thiếu khanh Đại Lý tự đứng chờ ở gian ngoài, cửa không khép."}]},
 c1:{h:"Thư cuối của {pv}",w:"maid",t:"Một lá thư theo đường khác đến tay ngươi: {pv} dặn chối hết. Nếu cần, {land} sẽ xin cho ngươi về nước “vì {mh} lâm bệnh”.",o:[
  {n:"Nghe lời {pv}, chối hết",f:"home",wx:"cố quốc đứng sau ngươi",lx:"chối thì không còn đường lùi",rt:"Ngươi đốt thư, dặn lòng một chữ: chối."},
  {n:"Trình lá thư này lên",sc:1,f:"court",wx:"ngài thấy ngươi đã chọn",lx:"cố quốc biết ngươi trình thư",rt:"Ngài đọc, rồi gấp lại: “Nàng không về đâu cả.”",rf:"Ngài hỏi: “Còn bao nhiêu lá như thế?”"},
  {n:"Hồi thư: con sẽ tự lo",f:"double",wx:"không ai quyết thay ngươi",lx:"{pv} không hiểu ngươi định làm gì",rt:"Ngươi viết một dòng, gửi theo đường cũ."}]},
 c2:{h:"{v} đứng trong điện",w:"v",need:["v"],t:"{v} được cho đứng hầu trong điện, “để làm chứng”. Nàng ta nói: “Thần thiếp chỉ mong Hoàng thượng xét cho công bằng.”",o:[
  {n:"Hỏi lại {v} lấy chứng ở đâu",sc:1,wx:"lộ việc {v} chạy chứng",lx:"thành ra cãi nhau trước vua",go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"{v} lúng túng. Hoàng thượng nhìn nàng ta khác hẳn.",rf:"{v} khóc, Hoàng thượng cho nàng ta lui."},
  {n:"Không nhìn {v}",wx:"giữ thể diện",lx:"lời {v} ở lại trong điện",rt:"Ngươi chỉ nhìn Hoàng thượng."},
  {n:"Xin cho {v} lui",sc:1,wx:"chỉ còn ngài và ngươi",lx:"ngài thấy ngươi sợ người làm chứng",go:A=>{rdOan(A,"v",4)},rt:"Ngài phẩy tay, {v} lui ra.",rf:"Ngài bảo: “Nàng ấy ở lại.”"}]},
 t1:{h:"Ngài hỏi một câu",w:"emp",t:"Hoàng thượng đặt tay lên chồng thư: “Trẫm không hỏi nàng đã gửi gì. Trẫm hỏi: nàng gửi vì ai?”",o:[
  {n:"Vì hai nước khỏi đánh nhau",sc:1,wx:"ngài nghe ra lý",lx:"ngài cho là lời khéo",rt:"Ngài im lặng, rồi gật đầu.",rf:"Ngài cười nhạt."},
  {n:"Vì cha thiếp",sc:1,wx:"thật lòng",lx:"ngài nghe ra ngươi chưa dứt cố quốc",rt:"Ngài thở dài: “Trẫm cũng có cha.”"},
  {n:"Vì thiếp sợ",sc:1,wx:"ngài động lòng",lx:"ngài thấy ngươi yếu",rt:"Ngài kéo ngươi đứng dậy.",rf:"Ngài quay mặt đi."}]},
 x1:{h:"Nhận, chối hay lật thế cờ",w:"emp",t:"Hoàng thượng chờ. Ngoài điện, Thiếu khanh Đại Lý tự chờ lệnh.",o:[
  {n:"Nhận hết, xin dùng chính đường thư ấy làm việc cho Đại Hy",e:["win","lose"],rt:"Hoàng thượng nhìn ngươi rất lâu: “Được. Từ nay thư về {land}, trẫm đọc trước.”",rf:"Hoàng thượng lắc đầu: “Một người đã gửi tin sai cho cha mình, trẫm dám tin sao?”"},
  {n:"Nhận là thư nhà, chối việc dò quân",e:["mid","lose"],rt:"Hoàng thượng gác án. Ngài không tin hết, cũng không truy thêm.",rf:"Hoàng thượng đọc to một dòng mật ngữ Đại Lý tự đã giải được."},
  {n:"Quỳ, chờ Hoàng thượng định đoạt",e:"mid",lx:"số phận nằm trong tay người khác",rt:"Hoàng thượng để ngươi quỳ đến khi đèn tắt, rồi cho về."}]}},
 E:{win:{k:1,tag:"Đường thư thành của Hoàng thượng",w:"emp",t:"Án khép lại. Từ nay thư đi {land} qua tay Hoàng thượng trước, và ngài bắt đầu hỏi ý ngươi về {land}."},
  mid:{k:0,tag:"Ngài tha mà không quên",t:"Ngài gác án. Ngươi vẫn ở cung cũ, vẫn được ngài đến, nhưng ai cũng biết: hồ sơ ấy vẫn nằm trong một ngăn kéo."},
  lose:{k:-1,tag:"Bị cấm túc",w:"emp",t:()=>`Hoàng thượng không trị tội vì không đủ chứng, nhưng cấm túc ngươi ${NCCW("gian")} tháng. Thư từ {land} không được vào.`,go:()=>ncConfine("gian")}}});

rdDef("nc_gian",11,{t:"Trung với ai",w:"emp",sj:"sợi dây giữa hai nước",cast(A){return rdCast(A,["v"])},
 g:"{pv} và Hoàng thượng, mỗi người cầm một đầu sợi dây ngươi đã nối. Mùa xuân này sứ thần {land} sang. Hoàng thượng tiếp sứ ở tiền triều, nhưng quốc thư hồi đáp, ngài chờ ngươi nói câu cuối cùng: ngươi là người của ai. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hoàng thượng nhờ một bức thư",w:"emp",if:RDW(1),t:"Hoàng thượng đưa ngươi tờ giấy trắng: “Viết cho cha nàng. Trẫm muốn ông ấy thôi gửi người dò. Nàng viết thế nào, trẫm đóng ấn thế ấy.”",o:[
  {n:"Viết bằng lời con gái",sc:1,wx:"{pv} sẽ đọc như thư nhà",lx:"lời mềm thì việc nước khó cứng",rt:"Ngươi viết như thuở nhỏ viết thư chúc thọ."},
  {n:"Viết bằng lời một phi tần Đại Hy",sc:1,wx:"Hoàng thượng thấy ngươi đứng về phía ngài",lx:"{pv} sẽ đọc thấy lạnh",rt:"Hoàng thượng đọc xong, gật đầu.",rf:"Hoàng thượng bảo: “Lạnh quá.”"},
  {n:"Xin ngài viết cùng",sc:1,wx:"thư có cả hai giọng",lx:"ngài thấy ngươi đẩy việc",rt:"Ngài cầm bút viết thêm một dòng dưới thư ngươi.",rf:"Ngài đặt bút xuống: “Thư của nàng thì nàng viết.”"}]},
 s2:{h:"Gia lễ yến trong nội cung",w:"emp",if:RDW(0),t:"Sau những tháng dài bị nghi kỵ, việc đầu tiên ngươi nghe: sứ thần {land} sắp sang. Hoàng thượng tiếp sứ ở tiền triều; tối ấy nội cung mở gia lễ yến, lễ vật sứ đoàn dâng được bày ra, và ngài muốn ngươi dự.",o:[
  {n:"Tạ ơn, xin ngồi sau rèm",wx:"giữ đúng phép",lx:"cả yến không thấy mặt ngươi",rt:"Ngươi ngồi sau rèm, nghe thái giám đọc lễ đơn của sứ đoàn."},
  {n:"Xin ngồi ngang hàng Hoàng hậu trong yến",need:["hh"],sc:1,wx:"cả hậu cung thấy Hoàng thượng đặt ngươi ở đâu",lx:"Hoàng hậu và cả hậu cung cho là ngươi vượt phận",rt:"Hoàng thượng cho đặt ghế ngươi ngang hàng Hoàng hậu, chỉ một đêm ấy.",rf:"Hoàng hậu mỉm cười: “Muội muội ngồi dưới bổn cung một bậc là đủ.” Hoàng thượng không nói gì."},
  {n:"Xin ngồi đầu hàng phi tần trong yến",if:()=>!qOn(),sc:1,wx:"cả hậu cung thấy Hoàng thượng đặt ngươi ở đâu",lx:"các phi tần cao phẩm cho là ngươi vượt phận",rt:"Hoàng thượng cho ngươi ngồi đầu hàng, ngay dưới ghế ngài.",rf:"Hoàng thượng bảo: “Ngồi theo phẩm.”"},
  {n:"Cáo bệnh không dự",wx:"không phải nói gì",lx:"cả hai bên đoán ý ngươi",rt:"Ngươi ở lại cung."}]},
 c1:{h:"Thư {mh}",w:"maid",t:"Sứ thần mang thư {mh}: bà đã già, chỉ mong biết con gái còn sống yên. Cuối thư bà viết: “Đừng để cha con kéo con vào chỗ chết.”",o:[
  {n:"Hồi thư cho {mh}, kể chuyện bình yên",wx:"mẹ yên lòng",lx:"không nói được điều thật",rt:"Ngươi viết đến khuya, toàn chuyện hoa trong ngự uyển."},
  {n:"Gửi {mh} một hộp lễ vật kèm thư",sc:1,wx:"cố quốc thấy ngươi được trọng",lx:"Hoàng thượng hỏi sao lễ vật trong cung lại gửi đi riêng",rt:"Hộp lễ vật theo sứ thần về nước; trong thư ngươi kể Hoàng thượng đối đãi tử tế.",rf:"Hoàng thượng nhíu mày khi nghe tin."},
  {n:"Xin Hoàng thượng cho thư {mh} đi đường quan",sc:1,wx:"thư nhà thành thư sáng",lx:"mọi chữ đều qua mắt Lễ bộ",rt:"Thư ngươi đi cùng quốc thư.",rf:"Lễ bộ đòi đọc trước."}]},
 c2:{h:"{v} đòi xử cho ra lẽ",w:"v",need:["v"],t:"{v} nhờ cha dâng sớ: “Một kẻ từng gửi tin ra ngoài không thể được nhắc tên trong quốc thư hồi đáp.”",o:[
  {n:"Xin Hoàng thượng cho đối chất",sc:1,wx:"{v} không đủ chứng",lx:"chuyện cũ bị khơi lại",go:(A,ok)=>{rdOan(A,"v",ok?10:5)},rt:"{v} không đưa ra được gì mới.",rf:"{v} đọc to lời khai cũ."},
  {n:"Gửi lễ hòa giải",sc:1,wx:"hai cung tạm yên",lx:"{v} nắm thóp",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} nhận lễ, rút sớ.",rf:"{v} nhận lễ rồi vẫn để sớ đó."},
  {n:"Mặc kệ",wx:"không tốn gì",lx:"sớ nằm trên án",rt:"Ngươi không đáp."}]},
 t1:{h:"Lời của sứ thần",w:"emp",t:"Sau buổi tiếp sứ ở tiền triều, Hoàng thượng ân chuẩn cho sứ thần, vẫn là lão thần năm trước, vào bái kiến ngươi trong buổi gia lễ ở nội điện, cách một bức rèm, có thái giám Nội vụ phủ đứng hầu. Ông quỳ: “{pv} sai thần hỏi: công chúa còn là người {land} không.”",o:[
  {n:"Còn, và cũng là người Đại Hy",sc:1,f:"double",wx:"hai bên nghe đều thuận",lx:"có người cho là lời nước đôi",rt:"Sứ thần cúi đầu thật thấp.",rf:"Thái giám Nội vụ phủ ghi câu ấy vào sổ, mặt không vui."},
  {n:"Không. Thiếp là người Đại Hy",f:"court",wx:"thái giám tâu lại nguyên lời với Hoàng thượng",lx:"sứ thần mang câu ấy về cho {pv}",rt:"Sứ thần nhắm mắt, lui ra."},
  {n:"Còn. Xin chuyển lời: con vẫn là con của {pv}",f:"home",wx:"cố quốc yên lòng",lx:"thái giám ghi lại, câu ấy đến tai Hoàng thượng",rt:"Sứ thần rơm rớm nước mắt sau bức rèm."}]},
 x1:{h:"Câu trả lời",w:"emp",t:"Đêm trước ngày trao quốc thư hồi đáp, Hoàng thượng đến cung ngươi: “Nàng nói đi. Trẫm viết thế nào, cha nàng sẽ đọc thế ấy.”",o:[
  {n:"Xin làm người giữ lời giao hảo giữa hai nước",e:["win","lose"],rt:"Hoàng thượng gật đầu, chép lời ngươi vào quốc thư. Sứ thần quỳ nhận ở tiền triều. Từ nay không còn thư dò, chỉ còn thư thăm.",rf:"Sứ thần không dám nhận lời thay {pv}. Quốc thư về nước, mà {pv} không hồi âm."},
  {n:"Thưa: thiếp là người của Đại Hy",e:["mid","lose"],rt:"Hoàng thượng nắm tay ngươi, sai chép câu ấy vào quốc thư. Sứ thần mang về, {land} từ đó không gửi thư dò nữa.",rf:"Tin lọt ra ngoài, triều thần thì thầm: kẻ từng gửi tin, giờ nói thế thì ai tin."},
  {n:"Xin ngài tha cho cố quốc, mọi tội thiếp chịu",e:["mid","lose"],rt:"Hoàng thượng im lặng, rồi sai chép vào quốc thư: “Con gái ông có hiếu.”",rf:"Hoàng thượng đứng dậy rời cung ngươi, không nói một lời."}]}},
 E:{win:{k:1,tag:"Một lòng, hai nước",w:"emp",t:"{pv} thu mật lệnh. Hoàng thượng thôi canh cửa cung ngươi. Thư từ nay đi lại bằng đường quan, và ngươi là người viết. Cố quốc và Đại Hy đều gọi ngươi là người của mình.",go:()=>e67bien(6)},
  mid:{k:0,tag:"Người của Đại Hy",t:"Ngươi chọn Đại Hy, hoặc Đại Hy chọn cho ngươi. Cố quốc khép cửa, thư nhà thưa dần. Ngươi được yên, nhưng phía sau lưng không còn {land}."},
  lose:{k:-1,tag:"Cái bóng gián điệp",w:"emp",t:"Không ai trị tội ngươi, nhưng cũng không ai quên. Mỗi lần có tin biên ải, triều thần lại nhìn về phía cung ngươi.",go:()=>e67bien(-3)}}});
RD97L.push(rdRare({a:"nc_gian_11",tag:"Trung hiếu lưỡng toàn",w:"emp",n:"Xin Hoàng thượng cho viết thư khuyên cha thu mật lệnh, đóng cả ấn Đại Hy",
 path:["Viết bằng lời con gái","Xin ngài viết cùng","xin ngồi sau rèm","kể chuyện bình yên","đi đường quan","Xin Hoàng thượng cho đối chất","Còn, và cũng là người Đại Hy"],bad:["Gửi lễ hòa giải","Cáo bệnh không dự"],x:[()=>S.tamco>=RR("nc_gian_11").bar,"Tâm cơ từ "+RR("nc_gian_11").bar],
 t:"Bức thư ngươi viết, có ấn Đại Hy đóng bên dưới, đến tay {pv} giữa mùa mưa. Ông đọc xong, đốt hết mật lệnh, rồi sai sứ sang xin lập lệ: thư từ hai nước từ nay đi đường quan, và người giữ lệ ấy là ngươi. Hoàng thượng ngự bút bốn chữ, sai treo trước cửa cung ngươi.",
 go:()=>e67bien(8),rw:"bienngu",ti:"Trung hiếu lưỡng toàn"}));
/* ---------- nc_su · Sứ đoàn cố quốc ---------- */
/* Written ONCE for both country branches: Nam Chiếu (premise nc_su) and Bắc Địch (premise bd_hoa plays these chapters, alias in nc_tail).
   Land words only through tokens {land} {pv} {mh} {quan} {pa} {pb}. Chapter .5 openings: NCW(k) after nc_su .4, BDW(k) after bd_hoa .4.
   {pa} = her elder royal brother (family token, NCL), head of the mission. Story-only NPC: the envoy of {land} (§5.4 row exists); the
   Đại Hy interpreter of Hội Đồng quán (nc_su .4 s2 already names "một thông sự người Đại Hy"; here he is paid by the rival's house).
   BAL.road.nc_su = {} (no chapter constants: deadlines are told in text, costs inline as in jrd_tt). */
rdDef("nc_su",5,{t:"Lễ bái trước điện",w:"emp",sj:"lễ yết kiến của sứ đoàn {land}",cast(A){return rdCast(A,["v"])},
 g:"{pa} của ngươi lại dẫn sứ đoàn {land} vào kinh. Lễ bộ đòi sứ đoàn quỳ ba lần, khấu đầu chín lần trước điện. {pa} là con của {quan}, không chịu. Buổi yết kiến chưa diễn ra mà hai nước đã sắp mất mặt.",
 p:[["s1","s2","s3","s4","s5","s6"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Sứ đoàn mang minh ước sang",w:"emp",if:()=>NCW(1)()&&rdPrev()!=="win2"&&rdPrev()!=="r97",t:"Minh ước năm trước đến lúc trao bản chính. {pa} dẫn sứ đoàn trở lại, mang theo ấn của {quan}. Lễ bộ tâu xin định lễ; Hoàng thượng hỏi ngươi bên chén trà: hoàng tử {land} sẽ lạy ra sao, vì minh ước có tên ngươi.",o:[
  {n:"Nhận lời Hoàng thượng, viết thư dạy lễ cho {pa}",sc:1,f:"rite",wx:"Hoàng thượng thấy ngươi giúp được việc",lx:"lễ hỏng thì ngươi gánh",rt:"Hoàng thượng sai đưa bản nghi chú vào cung; ngươi chép lại từng bước vào thư nhà gửi {pa}."},
  {n:"Thưa: xin theo lễ minh ước",sc:1,f:"home",wx:"sứ đoàn được giữ thể diện",lx:"Lễ bộ cho là ngươi bênh người nhà",rt:"Hoàng thượng giao Lễ bộ xét lại nghi chú.",rf:"Hoàng thượng chuyển lời Lễ bộ: “Minh ước là minh ước, lễ là lễ.”"},
  {n:"Không xen vào",wx:"không ai trách ngươi",lx:"hai bên tự cãi nhau",rt:"Ngươi để Lễ bộ và Hội Đồng quán tự bàn."}]},
 s2:{h:"Sứ đoàn mang thêm cống",w:"emp",if:()=>NCW(1)()&&rdPrev()==="win2",t:"Năm trước ngươi khuyên Đại Hy nhận thêm cống. Năm nay {pa} dẫn đoàn xe cống nặng gấp rưỡi vào kinh, mặt không cười. Ở Hội Đồng quán, y nói với người hầu của ngươi: “Muội muội ta nay là người Đại Hy rồi.”",o:[
  {n:"Xin Hoàng thượng cho gặp {pa} trong buổi gia lễ ở nội điện",sc:1,f:"home",wx:"{pa} nguôi giận",lx:"triều thần bàn: sứ thần sao được vào hậu cung",rt:"Trong buổi gia lễ ở nội điện, cách một bức rèm, thái giám đứng hầu, {pa} im lặng hồi lâu rồi rót cho ngươi một chén rượu quê.",rf:"{pa} quay lưng: “Nương nương về đi.”"},
  {n:"Gửi lễ vật bù cho sứ đoàn",wx:"sứ đoàn bớt thiệt",lx:"bạc của ngươi, mà {pa} vẫn chưa nguôi",rt:"Sứ đoàn nhận lễ, cảm tạ theo phép."},
  {n:"Giữ thể diện Đại Hy, không gặp",f:"rite",wx:"Hoàng thượng thấy ngươi biết phận",lx:"{pa} càng xa",rt:"Ngươi chỉ sai người mang trà sang quán sứ."}]},
 s3:{h:"Sứ đoàn đến để đòi lời",w:"emp",if:NCW(0),t:"Sứ đoàn năm trước về nước không mang được gì. Năm nay {quan} lại sai {pa} sang, lần này có lời phải đòi cho bằng được: định lại lệ cống. Vừa vào kinh, y đã nói: “Lần này ta không quỳ để xin.”",o:[
  {n:"Viết thư khuyên {pa} giữ lễ trước",sc:1,f:"rite",wx:"{pa} chịu nghe",lx:"{pa} cho là ngươi đứng về Đại Hy",rt:"{pa} hồi một dòng: “Nghe muội.”",rf:"{pa} không hồi âm."},
  {n:"Xin Hoàng thượng nghe lời đòi của {land}",sc:1,f:"home",wx:"lời đòi được nghe",lx:"ngài cho là ngươi bênh cố quốc",rt:"Hoàng thượng bảo: “Cứ để họ nói.”",rf:"Hoàng thượng bảo: “Lễ trước, lời sau.”"},
  {n:"Đứng ngoài",wx:"không ai trách ngươi",lx:"hai bên tự cãi nhau",rt:"Ngươi không xen."}]},
 s4:{h:"Sứ đoàn đầu tiên theo hòa ước",w:"emp",if:BDW(1),t:"Hòa ước mười năm đã ký. Theo lệ, mỗi năm {land} sai một sứ đoàn vào kinh, và năm đầu tiên người dẫn đoàn là {pa} của ngươi. Y muốn tự mắt thấy em gái mình được đối đãi ra sao.",o:[
  {n:"Nhận lời Hoàng thượng, viết thư dạy lễ cho {pa}",sc:1,f:"rite",wx:"Hoàng thượng thấy ngươi giúp được việc",lx:"lễ hỏng thì ngươi gánh",rt:"Hoàng thượng sai đưa bản nghi chú vào cung; ngươi chép lại từng bước vào thư nhà gửi {pa}."},
  {n:"Xin cho {pa} vào thăm cung ngươi trước",sc:1,f:"home",wx:"{pa} thấy ngươi được trọng",lx:"triều thần bàn: sứ thần sao được vào hậu cung",rt:"Hoàng thượng cho {pa} gặp ngươi trong buổi gia lễ ở nội điện, cách một bức rèm, có thái giám đứng hầu.",rf:"Hoàng thượng bảo: “Gặp ở yến là đủ.”"},
  {n:"Không xen vào",wx:"không ai trách ngươi",lx:"hai bên tự cãi nhau",rt:"Ngươi để Lễ bộ và Hội Đồng quán tự bàn."}]},
 s5:{h:"{pa} sang xem con tin",w:"emp",if:BDW(0),t:"Hòa ước còn đó nhưng lung lay. {quan} sai {pa} của ngươi dẫn sứ đoàn sang, nói là triều cống, thật là để xem em gái có bị coi như con tin không. Vừa vào kinh, y đã nói: “Ta không quỳ trước kẻ giữ em gái ta làm tin.”",o:[
  {n:"Viết thư khuyên {pa} giữ lễ trước",sc:1,f:"rite",wx:"{pa} chịu nghe",lx:"{pa} cho là ngươi đứng về Đại Hy",rt:"{pa} hồi một dòng: “Nghe muội.”",rf:"{pa} không hồi âm."},
  {n:"Xin Hoàng thượng cho {pa} thấy ngươi bình yên",sc:1,f:"home",wx:"{pa} bớt nghi",lx:"ngài không thích bị nhắc chữ con tin",rt:"Hoàng thượng cho {pa} gặp ngươi trong buổi gia lễ ở nội điện, cách một bức rèm.",rf:"Hoàng thượng bảo: “Nàng là phi tần, không phải con tin. Không cần tỏ bày gì cả.”"},
  {n:"Đứng ngoài",wx:"không ai trách ngươi",lx:"hai bên tự cãi nhau",rt:"Ngươi không xen."}]},
 s6:{h:"Sứ đoàn đến chợ Vĩnh Hòa",w:"emp",if:()=>NCW(1)()&&rdPrev()==="r97",t:"Chợ biên Vĩnh Hòa mang phong hiệu của ngươi đã mở được một mùa. {pa} dẫn sứ đoàn vào kinh trao bản chính của lệ chợ. Bên chén trà, Hoàng thượng kể: Lễ bộ đòi sứ đoàn lạy đủ lễ, còn {pa} bảo chợ mở được là nhờ em gái, lạy bớt cũng không sao.",o:[
  {n:"Nhận lời Hoàng thượng, viết thư dạy lễ cho {pa}",sc:1,f:"rite",wx:"Hoàng thượng thấy ngươi giúp được việc",lx:"lễ hỏng thì ngươi gánh",rt:"Hoàng thượng sai đưa bản nghi chú vào cung; ngươi chép lại từng bước vào thư nhà gửi {pa}."},
  {n:"Xin Hoàng thượng nể chợ Vĩnh Hòa mà bớt một lạy",sc:1,f:"home",wx:"sứ đoàn giữ được thể diện",lx:"Hoàng thượng cho là ngươi cậy ơn",rt:"Hoàng thượng cười: “Chợ mang tên nàng, thì lễ cũng nể nàng một lạy.”",rf:"Hoàng thượng đặt chén xuống: “Chợ là ân, lễ là phép.”"},
  {n:"Không xen vào",wx:"không ai trách ngươi",lx:"hai bên tự cãi nhau",rt:"Ngươi để Lễ bộ và Hội Đồng quán tự bàn."}]},
 c1:{h:"Lễ bộ đòi đủ lễ",w:"emp",t:"Thượng thư bộ Lễ dâng nghi chú: sứ thần ngoại quốc, dù là hoàng tử, cũng quỳ ba lần khấu đầu chín lần. Hoàng thượng mang nghi chú về, hỏi ngươi có thể khuyên được sứ đoàn không.",o:[
  {n:"Nhận lời khuyên sứ đoàn",sc:1,f:"rite",wx:"Hoàng thượng ghi nhớ",lx:"khuyên không được thì mất mặt",rt:"Hoàng thượng gật đầu, bảo ngươi viết thư cho {pa} ngay đêm ấy.",rf:"Lễ bộ chê sau lưng: khuyên mà không được."},
  {n:"Xin Hoàng thượng cho tra lệ cũ về sứ thần là hoàng tử",sc:2,f:"bridge",wx:"có lệ để dựa",lx:"lệ cũ không có",rt:"Hoàng thượng sai tra sổ Lễ bộ. Có lệ: hoàng tử nước phiên được quỳ ba lần, cúi đầu ba lần.",rf:"Sổ cũ không ghi gì."},
  {n:"Thưa: việc của Lễ bộ",wx:"không dính",lx:"Lễ bộ thấy ngươi không giúp",rt:"Hoàng thượng gật đầu, không hỏi nữa."}]},
 c2:{h:"{v} cười sứ đoàn",w:"v",need:["v"],t:"Trong buổi thỉnh an, {v} cười: “Nghe nói sứ đoàn {land} ăn bốc bằng tay, chẳng biết có quỳ nổi không.”",o:[
  {n:"Đáp lại sắc bén",sc:1,wx:"cả điện nể ngươi",lx:"thành ra cãi nhau trước mặt các phi tần",go:A=>{rdOan(A,"v",8)},rt:"Ngươi đáp một câu, {v} đỏ mặt.",rf:"Cả điện cười, ngươi và {v} cùng mất mặt."},
  {n:"Cúi đầu im lặng",wx:"giữ thể diện",lx:"lời cười cứ thế lan",rt:"Ngươi chỉ nâng chén trà."},
  {n:"Mời {v} dự yến đón sứ",sc:1,wx:"{v} tự thấy sứ đoàn không như lời đồn",lx:"{v} có chỗ để soi",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} xem sứ đoàn dâng lễ, không cười nữa.",rf:"{v} ghi nhớ từng sơ suất."}]},
 t1:{h:"{pa} nói riêng",w:"emp",t:"{pa} nhắn vào cung: “Ta quỳ trước vua Đại Hy thì được. Nhưng khấu đầu chín lần là lễ của kẻ thuộc quốc, không phải của nước giao hảo.”",o:[
  {n:"Khuyên huynh: quỳ là vì muội",sc:1,f:"rite",wx:"{pa} mềm lòng",lx:"{pa} thấy muội đã thành người Đại Hy",rt:"{pa} lặng đi: “Vì muội.”",rf:"{pa} đáp: “Muội quên mình là ai rồi.”"},
  {n:"Đứng về phía huynh",f:"home",wx:"{pa} tin ngươi",lx:"Lễ bộ biết ngươi đứng đâu",rt:"{pa} cười lần đầu từ khi vào kinh."},
  {n:"Đề nghị lễ ba quỳ ba cúi",sc:1,f:"bridge",wx:"cả hai bên còn đường lùi",lx:"cả hai bên đều chê nửa vời",rt:"{pa} gật: “Thế thì được.”",rf:"{pa} lắc đầu."}]},
 x1:{h:"Đêm trước buổi yết kiến",w:"emp",t:"Sáng mai, giờ Thìn, sứ đoàn {land} vào yết kiến ở tiền triều; hậu cung không dự. Đêm nay là lần cuối ngươi còn nói được một lời: với {pa}, hoặc với Hoàng thượng.",o:[
  {n:"Nhắn {pa}: theo đủ lễ, vì muội",e:["win","lose"],rt:"Sáng ấy {pa} quỳ đủ lễ. Thái giám về kể: Hoàng thượng đứng dậy đỡ, ban ghế ngồi; cả triều thấy sứ {land} biết lễ.",rf:"Thái giám về kể: {pa} quỳ đến lần thứ ba thì đứng thẳng dậy, cả điện lặng đi."},
  {n:"Xin Hoàng thượng cho sứ đoàn theo lệ ba quỳ ba cúi",e:["win","mid"],rt:"Hoàng thượng chuẩn. Sáng ấy {pa} hành lễ trọn, không ai mất mặt.",rf:"Hoàng thượng chuẩn, nhưng Lễ bộ ghi vào sổ: “Phá lệ vì phi tần.”"},
  {n:"Không nhắn gì, để hai bên tự định",e:"mid",lx:"lễ xong mà hai bên đều còn ấm ức",rt:"Sáng ấy lễ quan xướng, sứ đoàn quỳ, mọi việc trôi qua như một buổi lễ thường."}]}},
 E:{win:{k:1,tag:"Sứ đoàn được đón đúng lễ",w:"emp",t:"Buổi yết kiến trọn vẹn. Hoàng thượng khen sứ {land} biết lễ, {pa} được ban yến riêng, và ai cũng biết ai đã đứng giữa hai bên.",go:()=>e67bien(2)},
  mid:{k:0,tag:"Lễ xong, lòng chưa xong",t:"Lễ đã hành, nhưng {pa} về quán sứ không nói một lời, còn Lễ bộ ghi lại mọi chỗ chưa vừa ý."},
  lose:{k:-1,tag:"Sứ đoàn thất lễ trước điện",w:"emp",t:"{pa} đứng thẳng giữa buổi lễ. Hoàng thượng cho lui triều. Cả kinh thành bàn chuyện sứ {land} kiêu ngạo, và nhìn ngươi.",go:()=>e67bien(-3)}}});

rdDef("nc_su",6,{t:"Bức gấm Bách thọ",w:"maid",sj:"lễ vật mừng Vạn thọ",cast(A){return rdCast(A,["v"])},
 g:"Lễ vật chính của {land} mừng Vạn thọ Hoàng thượng là bức gấm Bách thọ do chính tay {mh} dệt ba năm. Đêm qua ở Hội Đồng quán, bức gấm bị đổ mực loang một góc. Mười ngày nữa là Vạn thọ tiết.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{pa} đến tìm ngươi",w:"maid",if:RDW(1),t:"Từ sau buổi yết kiến, {pa} tin ngươi. Nên đêm nay, y nhờ thái giám đưa vào cung một lời nhắn chỉ có bốn chữ: “Gấm của mẫu thân.”",o:[
  {n:"Sai người sang xem ngay trong đêm",sc:1,wx:"biết rõ bức gấm hỏng đến đâu",lx:"người của ngươi bị thấy ra vào quán sứ",rt:"Vết mực loang một góc, che mất ba chữ Thọ."},
  {n:"Nhắn {pa} giữ kín, đừng làm ồn",sc:1,wx:"chưa ai ngoài sứ đoàn biết",lx:"{pa} thấy ngươi lạnh",rt:"{pa} cho đóng cửa kho lễ vật.",rf:"Võ sĩ của {pa} đã kể ra ngoài."},
  {n:"Xin {pa} gửi góc gấm vào cung",sc:1,wx:"{pa} thấy ngươi coi việc nhà là việc mình",lx:"gói đồ từ quán sứ vào hậu cung bị khám ở cửa",rt:"Ngươi cầm góc gấm trong tay, nhận ra đường thêu của {mh}.",rf:"Thị vệ cửa cung giữ gói gấm lại hỏi tên người nhận."}]},
 s2:{h:"Sứ đoàn không nhờ ngươi",w:"maid",if:RDW(0),t:"Từ sau buổi yết kiến, {pa} ít nhắn vào cung. Ngươi nghe chuyện bức gấm từ miệng cung nữ: sứ đoàn đang lo cuống cuồng mà không ai báo ngươi.",o:[
  {n:"Tự gửi lời hỏi {pa}",sc:1,wx:"{pa} chịu nói",lx:"{pa} đáp: việc của sứ đoàn",rt:"{pa} gửi lại một mảnh gấm hỏng.",rf:"{pa} không hồi âm."},
  {n:"Dò xem ai vào quán sứ đêm ấy",sc:1,wx:"có manh mối",lx:"lộ ra ngươi dò quán sứ",rt:"Đêm ấy, viên thông sự của Hội Đồng quán ở lại muộn.",rf:"Không ai nhớ gì."},
  {n:"Để sứ đoàn tự lo",wx:"không xen",lx:"lễ hỏng thì tiếng hỏng vẫn rơi vào ngươi",rt:"Ngươi chờ."}]},
 c1:{h:"Viên thông sự",w:"maid",t:"Viên thông sự người Đại Hy của Hội Đồng quán là kẻ cuối cùng ở trong kho lễ vật. Trong tay áo y có vết mực cùng màu.",o:[
  {n:"Nhờ {pa} giữ y lại hỏi",sc:1,f:"proof",wx:"có lời khai",lx:"phi tần nhúng tay việc ngoài cung là vượt phận",rt:"Y khai: có người trả bạc để y làm hỏng một món lễ.",rf:"Y cắn răng không khai."},
  {n:"Xin Hoàng thượng giao Lễ bộ xét",wx:"đúng phép",lx:"Lễ bộ chậm, kẻ đứng sau kịp lo",rt:"Hoàng thượng sai Lễ bộ giữ y lại."},
  {n:"Mua lại lời y bằng bạc",sc:1,f:"proof",wx:"y khai cả tên người trả",lx:"y ăn hai đầu",rt:"Y khai cái tên trước khi kịp sợ.",rf:"Y nhận bạc, rồi bỏ trốn."}]},
 c2:{h:"Bạc từ cung {v}",w:"v",need:["v"],t:"Bạc trả cho viên thông sự là bạc thỏi có dấu của cung {v}. Nàng ta muốn lễ vật {land} hỏng ngay giữa Vạn thọ tiết.",o:[
  {n:"Đưa thỏi bạc lên Hoàng hậu",need:["hh"],sc:1,wx:"{v} bị khiển trách",lx:"Hoàng hậu thấy ngươi rắc rối",go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"Hoàng hậu quở {v}, phạt chép kinh một tháng.",rf:"{v} nói thỏi bạc bị trộm từ trước."},
  {n:"Giữ thỏi bạc, chờ dịp",sc:1,wx:"cầm chứng cứ trong tay",lx:"{v} chưa bị gì",rt:"Ngươi gói thỏi bạc trong khăn lụa."},
  {n:"Gửi trả thỏi bạc cho {v}",wx:"{v} biết ngươi không muốn gây",lx:"{v} cho là ngươi sợ",go:A=>{rdRel(A,"v",6)},rt:"{v} nhận lại, không nói gì."}]},
 t1:{h:"Ai sửa được bức gấm",w:"maid",t:"Thợ thêu Thượng y cục nói sửa được, nhưng phải có chỉ kim tuyến và tám ngày không nghỉ. Còn một cách nữa: ngươi tự tay thêu lại ba chữ Thọ theo đường kim của {mh}.",o:[
  {n:"Bỏ bạc thuê Thượng y cục",sc:1,f:"mend",wx:"thợ giỏi, kịp ngày",lx:"bạc nhiều, và thêm người biết chuyện",rt:"Thượng y cục nhận việc, thợ thêu thức tám đêm."},
  {n:"Tự tay thêu lại",sc:1,f:"mend",wx:"đường kim con gái nối đường kim mẹ",lx:"thêu vụng thì càng hỏng",rt:"Ba chữ Thọ mới khớp với chín mươi bảy chữ cũ.",rf:"Kim đâm vào tay, máu thấm một góc gấm."},
  {n:"Để nguyên vết mực",wx:"vết mực là chứng cứ",lx:"dâng lễ hỏng là thất lễ",rt:"Ngươi dặn sứ đoàn giữ nguyên bức gấm."}]},
 x1:{h:"Ngày Vạn thọ",w:"emp",t:"Vạn thọ tiết. Sứ đoàn dâng lễ ở tiền triều; tối ấy lễ vật các nước được bày trong gia yến nội cung cho Hoàng thượng xem. Đến lượt {land}, thái giám mở bức gấm Bách thọ.",o:[
  {n:"Dâng bức gấm đã sửa",e:["win","lose"],rt:"Bức gấm trải ra, trăm chữ Thọ sáng rực. Hoàng thượng hỏi ai dệt, rồi ban lễ đáp cho {mh}.",rf:"Một chữ Thọ lệch đường kim. {v} khẽ cười, cả điện nghe thấy."},
  {n:"Để sứ đoàn dâng bức gấm hỏng, ngươi tâu rõ ai làm",e:["win","mid"],rt:"Hoàng thượng nghe chuyện, nổi giận vì lễ vật dâng mình bị phá. Kẻ đứng sau bị truy.",rf:"Hoàng thượng chỉ bảo: “Ngày vui, thôi đừng nói chuyện ấy.”"},
  {n:"Đổi lễ khác, giữ gấm lại",e:"mid",lx:"lễ vật thường, không ai nhớ",rt:"Sứ đoàn dâng ngọc thay gấm. Lễ trôi qua như mọi năm."}]}},
 E:{win:{k:1,tag:"Bức gấm làm Hoàng thượng động lòng",w:"emp",t:"Bức gấm Bách thọ được treo ở Dưỡng Tâm điện. Hoàng thượng ban lễ đáp cho {mh}, và từ đó nhắc đến {land} bằng giọng khác.",go:A=>{rdOan(A,"v",6);return""}},
  mid:{k:0,tag:"Lễ dâng đủ, không ai nhớ",t:"Vạn thọ qua. Lễ của {land} không hỏng, cũng không ai nhớ. Kẻ phá vẫn chưa bị gọi tên."},
  lose:{k:-1,tag:"Lễ vật hỏng giữa Vạn thọ",w:"v",t:"Cả điện thấy lễ vật {land} có tì vết. {v} kể lại chuyện ấy ở mọi buổi thỉnh an, và {pa} trách ngươi không giữ được thể diện mẹ.",go:()=>e67bien(-2)}}});

rdDef("nc_su",7,{t:"Huynh trưởng phạm cấm",w:"emp",sj:"tội phạm cấm của {pa}",cast(A){return rdCast(A,["v"])},
 g:"Sau một bữa rượu, {pa} của ngươi dẫn mấy võ sĩ phi ngựa vào vườn Thượng Lâm săn hươu ngự. Đó là đất cấm. Cấm quân giữ người. Sứ thần nước ngoài phạm cấm không còn là chuyện riêng, mà là chuyện của hai triều.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin đến lúc nửa đêm",w:"emp",if:RDW(1),t:"Từ ngày Vạn thọ, {pa} được kinh thành nể, và có người mời rượu mỗi đêm. Nửa đêm nay, thái giám gõ cửa cung ngươi: hoàng tử {land} bị cấm quân giữ ở cửa vườn Thượng Lâm.",o:[
  {n:"Xin vào Dưỡng Tâm điện ngay trong đêm",sc:1,f:"plead",wx:"ngài nghe ngươi trước khi nghe ai",lx:"phá giấc vua vì việc nhà",rt:"Hoàng thượng khoác áo ngồi dậy, nghe ngươi nói.",rf:"Thái giám không dám truyền vào."},
  {n:"Sai người đến xem {pa} có bị thương",wx:"biết rõ chuyện",lx:"chậm một đêm",rt:"{pa} không sao, chỉ có một võ sĩ gãy tay."},
  {n:"Chờ đến sáng",wx:"không làm ồn",lx:"tin đến tai triều thần trước",rt:"Ngươi ngồi bên đèn đến sáng."}]},
 s2:{h:"Ngươi nghe tin sau cùng",w:"emp",if:RDW(0),t:"Sáng ra cả cung đã biết: hoàng tử {land} say rượu xông vào vườn Thượng Lâm. Ngươi là người nghe tin sau cùng, từ miệng {v}.",o:[
  {n:"Sai thái giám thân tín đến chỗ cấm quân giữ người",sc:1,wx:"{pa} biết ngươi không bỏ y",lx:"bị nói là phi tần nhúng tay việc cấm quân",rt:"Thống lĩnh cấm quân cho thái giám của ngươi nói với {pa} vài câu qua song sắt.",rf:"Thống lĩnh không cho gặp."},
  {n:"Gửi thư cho sứ thần {land} lo trước",wx:"sứ đoàn kịp tính",lx:"người ngoài giữ việc của ngươi",rt:"Sứ thần cảm tạ, xin ngươi chờ."},
  {n:"Đóng cửa, chép kinh",wx:"không ai bảo ngươi bênh huynh",lx:"{pa} thấy ngươi bỏ mặc",rt:"Ngươi đóng cửa cung."}]},
 c1:{h:"Ai rủ {pa} đi săn",w:"emp",t:"Võ sĩ của {pa} kể: tối qua có một công tử Đại Hy mời rượu, cược rằng người {land} không dám vào vườn ngự.",o:[
  {n:"Tra cho ra công tử ấy",sc:1,f:"proof",wx:"tội không chỉ của một bên",lx:"động đến nhà quyền quý",rt:"Công tử ấy là em trai của {v}.",rf:"Công tử ấy đã về quê từ sáng."},
  {n:"Bắt võ sĩ viết lời khai",sc:1,f:"proof",wx:"có giấy trắng mực đen",lx:"lời người {land} không nặng bằng lời người Đại Hy",rt:"Võ sĩ điểm chỉ vào lời khai."},
  {n:"Không bới thêm",wx:"chuyện không to thêm",lx:"{pa} gánh một mình",rt:"Ngươi để việc ấy qua."}]},
 c2:{h:"Em trai của {v}",w:"v",need:["v"],t:"Người thách cược {pa} là em trai {v}. Nàng ta đã sai người dặn em mình chối hết, và đang khóc trước Hoàng thượng rằng sứ {land} vu cho nhà nàng.",o:[
  {n:"Đưa lời khai của võ sĩ lên",sc:1,wx:"tội chia đôi",lx:"hai nhà thành thù",go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"Hoàng thượng phạt em trai {v} cấm ra khỏi phủ một mùa.",rf:"Hoàng thượng bảo: lời người {land} không đủ."},
  {n:"Gặp {v} dàn xếp",sc:1,wx:"hai bên cùng im",lx:"{v} nắm thóp",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} nhận lời: em nàng sẽ không chối nữa, chỉ nhận là đùa quá trớn.",rf:"{v} nhận bạc, rồi vẫn khóc trước Hoàng thượng."},
  {n:"Để mặc",wx:"không gây thêm",lx:"{v} một mình kể chuyện",rt:"Ngươi không đáp."}]},
 t1:{h:"Lễ bộ đòi xử theo luật",w:"emp",t:"Lễ bộ tâu: vào vườn ngự săn hươu là tội nặng. Hình bộ thì nói: sứ thần là khách của triều, theo lệ giao về nước tự xử.",o:[
  {n:"Xin theo lệ giao về nước",sc:1,f:"plead",wx:"có lệ để dựa",lx:"Lễ bộ cho là ngươi chạy tội cho huynh",rt:"Hoàng thượng nghe, sai Hình bộ tra lệ cũ cho sứ thần.",rf:"Lễ bộ tâu lại: lệ ấy chỉ dành cho tội nhỏ."},
  {n:"Xin cho {pa} chịu phạt bổng, bồi hươu",wx:"tội chuộc được bằng của",lx:"bạc của ngươi đổ vào lỗi người khác",rt:"Lễ bộ nhận lời bồi."},
  {n:"Để {pa} chịu đúng luật Đại Hy",f:"law",wx:"triều đình thấy ngươi công minh",lx:"{pa} giận ngươi",rt:"Ngươi chỉ nói: “Thiếp không dám xin.”"}]},
 x1:{h:"Trước khi Hoàng thượng phê",w:"emp",t:"Trước khi xử {pa}, Hoàng thượng cho gọi ngươi đến Dưỡng Tâm điện. Tờ tâu của Lễ bộ và Hình bộ nằm trên án. Ngài hỏi: “Huynh của nàng. Nàng nói.”",o:[
  {n:"Quỳ xin cho huynh, nhận một nửa tội thay",e:["win","lose"],rt:"Hoàng thượng phẩy tay: “Tội ấy trẫm tha. Lần sau thì không.” Sáng sau {pa} được thả, nhìn về phía hậu cung rồi cúi đầu tạ ơn.",rf:"Hoàng thượng nghiêm mặt: “Nàng gánh nổi không?” Ngài cho {pa} chịu phạt, và nhớ lời ngươi."},
  {n:"Đưa lời khai: có người thách cược",e:["win","mid"],rt:"Hoàng thượng nghe ra có người gài bẫy. Ngài tha {pa}, phạt kẻ thách.",rf:"Hoàng thượng bảo: “Cược hay không, ngựa vẫn vào vườn trẫm.”"},
  {n:"Xin xử đúng luật",e:"mid",lx:"{pa} chịu phạt, lòng huynh muội lạnh",rt:"Hoàng thượng gật đầu; hôm sau võ sĩ chịu trượng, {pa} bị phạt bổng."}]}},
 E:{win:{k:1,tag:"Huynh trưởng được tha",w:"emp",t:"{pa} được tha, và lần đầu y cúi đầu trước vua Đại Hy mà không phải vì lễ. Y nói với ngươi: “Ta nợ muội.”"},
  mid:{k:0,tag:"Võ sĩ chịu phạt thay",t:"Võ sĩ chịu trượng, {pa} mất mặt nhưng không mất người. Chuyện khép lại, chưa ai nợ ai."},
  lose:{k:-1,tag:"Sứ đoàn bị giữ chân ở Hội Đồng quán",w:"emp",t:"Sứ đoàn bị cấm ra khỏi Hội Đồng quán cho đến ngày về. {pa} trách ngươi, triều thần trách {land}, còn ngươi đứng giữa.",go:()=>e67bien(-3)}}});

rdDef("nc_su",8,{t:"Đại yến các nước",w:"emp",sj:"đại yến đãi sứ các nước",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng mở đại yến đãi sứ các nước ở tiền triều trước khi họ về; hậu cung không dự, chỉ nghe thái giám kể lại. Sứ {land} ngồi hàng nào, {pa} nâng chén ra sao, đều là một câu nói của hai triều. Sau đại yến, Hoàng thượng ban cho {pa} một gia yến nhỏ trong nội cung, và cho ngươi ngồi cùng.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ghế của sứ {land}",w:"emp",if:RDW(1),t:"Từ sau chuyện vườn Thượng Lâm, {pa} nể ngươi. Hoàng thượng kể: Lễ bộ đang bàn xếp sứ {land} ngồi trên hay dưới sứ một nước phương tây vốn ganh với {land}, rồi hỏi ý ngươi.",o:[
  {n:"Xin ngài cho xếp {land} ngồi trên",sc:1,f:"home",wx:"{pa} được thể diện",lx:"sứ phương tây tức giận",rt:"Lễ bộ xếp {land} ngồi trên.",rf:"Hoàng thượng bảo: Lễ bộ xếp theo năm vào cống, không theo tình."},
  {n:"Xin xếp theo lệ cũ",f:"rite",wx:"không ai nói được ngươi thiên vị",lx:"{pa} ngồi dưới",rt:"Lễ bộ xếp theo lệ."},
  {n:"Xin xếp hai nước ngồi đối diện",sc:1,f:"bridge",wx:"không trên không dưới",lx:"Lễ bộ thấy phiền",rt:"Lễ bộ khen cách xếp khéo.",rf:"Lễ bộ không nghe."}]},
 s2:{h:"{pa} không muốn dự",w:"emp",if:RDW(0),t:"Sau chuyện vườn Thượng Lâm, {pa} nói sẽ cáo bệnh không dự đại yến. Sứ {land} vắng mặt ở đại yến là một câu nói không ai muốn nghe.",o:[
  {n:"Viết thư xin huynh đến",sc:1,wx:"{pa} chịu đến",lx:"{pa} đến mà mặt lạnh",rt:"{pa} hồi: “Vì muội.”",rf:"{pa} hồi: “Ta bệnh.”"},
  {n:"Xin Hoàng thượng ban rượu mời riêng",sc:1,wx:"lời mời của vua không ai từ",lx:"ngài thấy ngươi nhờ quá nhiều",rt:"Thái giám mang bình ngự tửu sang quán sứ. {pa} đành đến.",rf:"Hoàng thượng bảo: “Không đến thì thôi.”"},
  {n:"Để mặc",wx:"không nài ép",lx:"ghế sứ {land} bỏ trống",rt:"Ngươi không làm gì."}]},
 c1:{h:"Sứ phương tây",w:"emp",t:"Thái giám về kể: giữa đại yến, sứ một nước phương tây nâng chén nói to: “Nghe nói {land} gả công chúa sang làm tin, nay công chúa có còn nhớ tiếng mẹ đẻ?” Câu ấy vào đến hậu cung trước khi yến tan.",o:[
  {n:"Viết một câu thơ cổ {land} kèm lời dịch, xin đọc trong yến",sc:1,wx:"cả yến nể ngươi",lx:"có kẻ cho là ngươi khoe",rt:"Hoàng thượng cho đọc câu thơ ngươi viết, cả tiếng {land} lẫn tiếng Đại Hy. Sứ phương tây ngồi xuống.",rf:"Câu dịch vụng, sứ phương tây cười."},
  {n:"Mỉm cười cho qua",wx:"giữ thể diện",lx:"câu nói ở lại trong yến",rt:"Ngươi không đáp."},
  {n:"Chờ Hoàng thượng lên tiếng",sc:1,wx:"ngài lên tiếng thay",lx:"ngài thấy ngươi dựa",rt:"Thái giám kể: Hoàng thượng nói “Công chúa ấy là phi của trẫm. Ai hỏi nàng là hỏi trẫm.”",rf:"Thái giám kể: Hoàng thượng chỉ cười."}]},
 c2:{h:"Rượu của {v}",w:"v",need:["v"],t:"Ở gia yến, {v} cũng được ngồi hầu. Nàng ta sai cung nữ rót cho {pa} rượu mạnh hết chén này đến chén khác; nàng ta muốn hoàng tử {land} say trước mặt Hoàng thượng.",o:[
  {n:"Sai người đổi rượu thành nước trà",sc:1,wx:"{pa} tỉnh táo",lx:"bị thấy đổi rượu",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"{pa} uống mãi mà vẫn tỉnh.",rf:"Cung nữ của {v} bắt gặp, kể to."},
  {n:"Nâng chén mời {v} uống cùng",sc:1,wx:"{v} phải uống chén mình rót",lx:"thành ra đấu rượu trước vua",go:A=>{rdOan(A,"v",8)},rt:"{v} uống ba chén thì phải lui.",rf:"{v} uống không say, ngươi thì đỏ mặt."},
  {n:"Nhắn {pa} giữ sức",wx:"không gây chuyện",lx:"{pa} có nghe hay không là chuyện khác",rt:"{pa} gật đầu, rồi vẫn nhận chén."}]},
 t1:{h:"{pa} đứng dậy",w:"emp",t:"Giữa gia yến, {pa} đứng dậy, xin múa kiếm theo lệ {land} để chúc thọ Hoàng thượng. Thị vệ nắm chuôi đao.",o:[
  {n:"Đứng lên đánh trống theo nhịp",sc:2,f:"bridge",wx:"múa kiếm thành lễ chúc thọ",lx:"trống lạc nhịp, cả yến cười",rt:"Tiếng trống của ngươi dẫn từng đường kiếm. Cả yến nín thở.",rf:"Nhịp trống chậm nửa phách."},
  {n:"Xin ngài cho {pa} múa bằng kiếm gỗ",sc:1,f:"rite",wx:"thị vệ yên tâm",lx:"{pa} thấy bị coi thường",rt:"Hoàng thượng cười, sai đem kiếm gỗ.",rf:"{pa} vứt kiếm gỗ xuống đất."},
  {n:"Ngồi yên",wx:"không xen",lx:"mọi việc tùy {pa}",rt:"Ngươi ngồi yên, tay nắm chặt khăn."}]},
 x1:{h:"Chén rượu cuối yến",w:"emp",t:"Cuối gia yến, {pa} nâng chén về phía Hoàng thượng: “{land} xin kính Đại Hy một chén. Và xin bệ hạ cho muội muội ta một lời hứa: được về thăm {mh} một lần.”",o:[
  {n:"Nâng chén đáp lời huynh trước mặt Hoàng thượng",e:["win","lose"],rt:"Ngươi nâng chén: “Muội ở đây là để hai nước khỏi phải xa nhau.” Hoàng thượng cười, uống cạn, hứa sẽ cho sứ đoàn mang theo lễ mừng {mh}.",rf:"Ngươi chưa nói hết câu, Hoàng thượng đã đặt chén xuống."},
  {n:"Cúi đầu chờ ngài đáp",e:["mid","lose"],rt:"Hoàng thượng đáp: “Để trẫm nghĩ.” Không hứa, không từ.",rf:"Hoàng thượng đáp lạnh: “Phi tần Đại Hy không về nước.”"},
  {n:"Xin ngài cho sứ thần mang tranh vẽ ngươi về",e:["win","mid"],rt:"Hoàng thượng ưng ngay: “Họa sĩ cung đình vẽ cho đẹp.” {pa} cúi đầu tạ.",rf:"Hoàng thượng gật đầu cho có. Yến tan."}]}},
 E:{win:{k:1,tag:"Hai triều cùng nâng chén",w:"emp",t:"Gia yến khép lại trong tiếng cười. Sứ các nước nghe kể {land} và Đại Hy ngồi chung một mâm, và người ngồi giữa là ngươi.",go:()=>e67bien(3)},
  mid:{k:0,tag:"Yến tan êm",t:"Đại yến và gia yến đều qua. Không ai mất mặt, cũng không ai nhớ điều gì."},
  lose:{k:-1,tag:"Lời xin giữa yến bị khước",w:"emp",t:"Lời {pa} xin giữa yến bị khước, và tin ấy truyền ra đến sứ các nước. {land} mất mặt, Đại Hy cũng không vui vì bị hỏi khó.",go:()=>e67bien(-3)}}});

rdDef("nc_su",9,{t:"Điều ước chợ biên",w:"emp",sj:"điều ước chợ biên",cast(A){return rdCast(A,["v"])},
 g:"Trước khi về, sứ đoàn phải ký một điều ước chợ biên mới với bộ Hộ: muối, trà, sắt đổi lấy ngựa, da, thuốc. Nếu chưa ký xong trước tiết Sương giáng, đèo sẽ đóng vì tuyết, và sứ đoàn phải về tay không.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bộ Hộ hỏi ý ngươi",w:"emp",if:RDW(1),t:"Sau đại yến, Hoàng thượng mang bản thảo điều ước của bộ Hộ về cung ngươi, bảo ngươi xem trước một lượt.",o:[
  {n:"Đọc kỹ, ghi chú từng điều",sc:1,f:"terms",wx:"biết rõ chỗ nào lệch",lx:"mỏi mắt, mất sức",rt:"Ngươi ghi chú ba chỗ: giá muối, cân sắt, ngày mở chợ."},
  {n:"Gửi bản thảo cho {pa} xem",sc:1,f:"home",wx:"{pa} biết trước để bàn",lx:"bộ Hộ biết ngươi đưa bản thảo ra",rt:"{pa} gửi lại lời cảm tạ và hai điều xin sửa.",rf:"Bộ Hộ biết, hỏi ngươi đứng về phía ai."},
  {n:"Trả lại, xin không xem",wx:"không ai nói ngươi xen việc nước",lx:"bỏ lỡ một lần nói được",rt:"Ngươi trả bản thảo nguyên niêm."}]},
 s2:{h:"Hai bên không chịu nhau",w:"emp",if:RDW(0),t:"Bàn đã mười ngày mà chưa xong điều nào. Bộ Hộ chê {land} đòi nhiều, {pa} chê Đại Hy cân thiếu. Tiết Sương giáng chỉ còn một tháng.",o:[
  {n:"Gửi trà và một lời khuyên nhường cho cả hai bên",sc:1,f:"bridge",wx:"hai bên dịu lại",lx:"bị nói là phi tần xen việc nước",rt:"Thượng thư và {pa} cùng nhận trà; buổi bàn hôm sau bớt gắt.",rf:"Thượng thư trả trà về: việc nước không nhận quà hậu cung."},
  {n:"Xin Hoàng thượng định một hạn",sc:1,wx:"hai bên phải gấp",lx:"ngài thấy ngươi giục",rt:"Hoàng thượng phán: “Trước Sương giáng phải xong.”",rf:"Hoàng thượng bảo: “Việc của bộ Hộ.”"},
  {n:"Để hai bên tự bàn",wx:"không dính",lx:"thời gian trôi",rt:"Ngươi chờ tin."}]},
 c1:{h:"Thượng thư bộ Hộ",w:"emp",t:"Hoàng thượng kể lời Thượng thư bộ Hộ: Đại Hy không bán sắt cho nước ngoài. Sắt thành nông cụ hôm nay, mai có thể thành giáo mác.",o:[
  {n:"Đề nghị chỉ bán nông cụ đã rèn",sc:2,f:"terms",wx:"có sắt mà không có giáo",lx:"{pa} chê ít",rt:"Hoàng thượng đem ý ấy hỏi Thượng thư; ông vuốt râu: “Thế thì được.”",rf:"Thượng thư lắc đầu."},
  {n:"Thưa: Thượng thư nói phải",f:"law",wx:"Hoàng thượng thấy ngươi lo cho Đại Hy",lx:"{land} không có sắt",rt:"Hoàng thượng gật đầu."},
  {n:"Xin đổi sắt lấy ngựa theo giá định sẵn",sc:1,f:"home",wx:"{land} có sắt, Đại Hy có ngựa",lx:"Thượng thư cho là ngươi bênh cố quốc",rt:"Hoàng thượng sai bộ Hộ tính lại theo ý ấy.",rf:"Hoàng thượng không đáp."}]},
 c2:{h:"Nhà {v} buôn muối",w:"v",need:["v"],t:"Nhà {v} giữ giấy phép buôn muối ở biên ải. Chợ biên mở thì muối của họ mất giá. Cha nàng ta đã dâng sớ: chợ biên là cửa cho gian tế.",o:[
  {n:"Tâu rõ nhà {v} có lợi riêng",sc:1,wx:"sớ của nhà {v} mất sức nặng",lx:"hai nhà thành thù",go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"Hoàng thượng gác sớ của nhà {v}.",rf:"Hoàng thượng chán chuyện bè phái."},
  {n:"Chia cho nhà {v} một phần chợ muối",sc:1,wx:"nhà {v} thôi cản",lx:"chợ biên có thêm một kẻ ăn chia",go:(A,ok)=>{rdRel(A,"v",ok?12:-4)},rt:"Nhà {v} rút sớ.",rf:"Nhà {v} nhận phần, rồi vẫn cản."},
  {n:"Mặc kệ",wx:"không gây",lx:"sớ nằm trên án",rt:"Ngươi không đáp."}]},
 t1:{h:"Một điều khoản nhỏ",w:"emp",t:"Đêm trước ngày ký, ngươi thấy trong bản sạch có một điều khoản mới: thuế chợ do quan Đại Hy thu cả hai bên. {pa} chưa đọc tới.",o:[
  {n:"Báo {pa}",f:"home",wx:"{land} không bị thiệt",lx:"bộ Hộ biết ngươi báo",rt:"{pa} đọc, rồi gạch một dòng."},
  {n:"Xin Hoàng thượng sửa: mỗi bên thu một nửa",sc:1,f:"terms",wx:"cả hai bên công bằng",lx:"bộ Hộ khó chịu",rt:"Hoàng thượng phê sửa; bộ Hộ chép lại, không nói gì.",rf:"Hoàng thượng bảo: “Muộn rồi.”"},
  {n:"Im lặng",f:"law",wx:"Đại Hy có lợi",lx:"{land} sẽ biết ai đã im",rt:"Ngươi để nguyên."}]},
 x1:{h:"Đêm trước ngày ký",w:"emp",t:"Hai ngày trước Sương giáng, bộ Hộ và sứ đoàn sẽ ngồi vào bàn ký ở tiền triều. Đêm trước, Hoàng thượng mang bản sạch về cung ngươi: “Mai ký. Bản chữ {land}, nàng soát giúp trẫm.”",o:[
  {n:"Soát từng chữ cả hai bản, ghi chú dâng ngài",e:["win","lose"],rt:"Sáng sau, Hoàng thượng cầm bản ghi chú của ngươi ra điện. Không ai cãi được một chữ. Hai ấn đóng xuống.",rf:"Ngươi soát sót một chữ về cân sắt. Hai bên lại cãi đến tối."},
  {n:"Nhắn trước cho {pa} những điều nên gật",e:["win","mid"],rt:"{pa} gật từng điều như lời ngươi nhắn. Ấn đóng xong trước giờ Ngọ.",rf:"{pa} không hiểu lời nhắn, xin hoãn một điều."},
  {n:"Xin ngài bỏ điều sắt, ký phần còn lại",e:"mid",lx:"{land} về thiếu điều quan trọng nhất",rt:"Điều ước ký xong, chỉ còn muối, trà, ngựa và da."}]}},
 E:{win:{k:1,tag:"Điều ước có chữ của ngươi",w:"emp",t:"Điều ước chợ biên ký xong trước Sương giáng. Ở mỗi điều, ai đọc kỹ đều thấy dấu tay ngươi. Bộ Hộ khen, {pa} cảm tạ.",go:()=>e67bien(4)},
  mid:{k:0,tag:"Điều ước nửa vời",t:"Điều ước ký được một nửa. Chợ biên sẽ mở, nhưng điều về sắt còn để lại cho năm sau.",go:()=>e67bien(1)},
  lose:{k:-1,tag:"Điều ước lỡ hạn",w:"emp",t:"Sương giáng qua, điều ước chưa ký. Sứ đoàn phải về tay không, và cả hai bên đều biết ngươi đã soát bản ấy.",go:()=>e67bien(-4)}}});

rdDef("nc_su",10,{t:"Sứ đoàn lên đường",w:"emp",sj:"những gì sứ đoàn mang về",cast(A){return rdCast(A,["v"])},
 g:"Ba ngày nữa sứ đoàn rời kinh. {pa} hỏi ngươi gửi gì về cho {mh}. Còn ở cửa thành, có người đã tâu rằng xe sứ {land} mang theo thứ không được phép mang.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Quà đáp lễ của Hoàng thượng",w:"emp",if:RDW(1),t:"Điều ước ký xong, Hoàng thượng ban quà đáp lễ cho {land}, và hỏi ngươi: “Mẹ nàng thích gì?”",o:[
  {n:"Xin ngài ban lụa và trà",wx:"quà vừa ý cả hai",lx:"quà thường, không ai nhớ",rt:"Mười xe lụa trà được chất lên."},
  {n:"Xin ngài ban một bức ngự bút",sc:1,wx:"{mh} có vật quý nhất",lx:"ngài thấy ngươi xin nhiều",rt:"Hoàng thượng viết hai chữ “An khang”.",rf:"Hoàng thượng bảo: “Lụa là đủ.”"},
  {n:"Thưa: mẹ thiếp chỉ cần tin thiếp bình yên",wx:"ngài cảm động",lx:"quà đáp lễ do Lễ bộ chọn",rt:"Hoàng thượng nắm tay ngươi rất lâu."}]},
 s2:{h:"Sứ đoàn về sớm",w:"emp",if:RDW(0),t:"Điều ước không trọn, sứ đoàn quyết về sớm. {pa} nhắn vào: “Muội có gì gửi mẫu thân thì gửi gấp.”",o:[
  {n:"Viết thư cả đêm",wx:"{mh} có thư dài",lx:"mất một đêm, mệt",rt:"Ngươi viết đến khi đèn cạn dầu."},
  {n:"Sắm lễ vật gửi {mh}",wx:"{mh} có vật để nhớ",lx:"tốn bạc",rt:"Ngươi bỏ bạc sắm một hộp trâm, một tấm khăn, theo xe về {land}."},
  {n:"Gửi lời miệng qua {pa}",wx:"không để lại giấy",lx:"lời miệng dễ quên",rt:"{pa} gật đầu, nhắc lại từng câu."}]},
 c1:{h:"{mh} lâm bệnh",w:"maid",t:"Sứ thần {land} kể nhỏ: {mh} lâm bệnh từ mùa xuân, chỉ nhắc tên ngươi. Bà muốn một vật ngươi đeo, hoặc một lời hứa ngươi sẽ về.",o:[
  {n:"Cắt một lọn tóc gửi mẹ",wx:"{mh} có vật của con",lx:"có người bàn: phi tần cắt tóc là điềm không lành",rt:"Ngươi cắt một lọn tóc, gói trong khăn lụa."},
  {n:"Xin Hoàng thượng cho thái y theo sứ đoàn",sc:1,wx:"{mh} có thái y Đại Hy chữa",lx:"ngài thấy ngươi xin việc nước cho nhà",rt:"Hoàng thượng chuẩn cho một thái y đi theo.",rf:"Hoàng thượng bảo: “Thái y là của Đại Hy.”"},
  {n:"Hứa sẽ về",sc:1,wx:"{mh} có hy vọng",lx:"lời hứa chưa chắc giữ được",rt:"Sứ thần cúi đầu, ghi lời ngươi.",rf:"Sứ thần nhìn ngươi buồn: “Công chúa đừng hứa điều không giữ được.”"}]},
 c2:{h:"{v} tâu xe sứ có bản đồ",w:"v",need:["v"],t:"{v} tâu qua cha nàng ta: xe sứ {land} giấu bản đồ đường sá Đại Hy, do “người trong cung” vẽ cho.",o:[
  {n:"Xin mở xe trước mặt Lễ bộ",sc:1,wx:"không có gì, {v} mất mặt",lx:"{pa} bị nhục vì bị khám",go:(A,ok)=>{rdOan(A,"v",ok?12:6)},rt:"Mở hết xe, chỉ có lụa, trà và thư nhà.",rf:"Trong xe có một tấm bản đồ chợ biên. Không sai luật, nhưng ai cũng xì xào."},
  {n:"Hỏi lại {v} lấy tin ở đâu",sc:1,wx:"lộ việc {v} bịa",lx:"cãi nhau trước mặt các phi tần",go:A=>{rdOan(A,"v",8)},rt:"{v} không nói ra được người báo tin.",rf:"{v} nói: “Người báo tin không dám ra mặt.”"},
  {n:"Im lặng",wx:"không thêm sóng",lx:"lời tâu nằm trên án",rt:"Ngươi không đáp."}]},
 t1:{h:"{pa} nói lời từ biệt",w:"emp",t:"Đêm cuối, Hoàng thượng mở buổi gia lễ tiễn sứ ở nội điện; {pa} được phép bái biệt ngươi cách một bức rèm, có thái giám đứng hầu. Y nói: “Phụ thân già rồi. Ta về là phải gánh nước. Muội ở đây, là gánh nửa kia.”",o:[
  {n:"Hứa giữ nửa gánh",sc:1,f:"bridge",wx:"{pa} yên lòng",lx:"lời hứa nặng",rt:"{pa} nắm tay ngươi như thuở nhỏ."},
  {n:"Bảo huynh: muội là người Đại Hy",f:"law",wx:"rõ ràng",lx:"{pa} buồn",rt:"{pa} im lặng hồi lâu, rồi cúi đầu chào như chào một phi tần."},
  {n:"Xin huynh đừng bắt muội chọn",wx:"thật lòng",lx:"{pa} không biết ngươi đứng đâu",rt:"{pa} thở dài: “Ta không bắt.”"}]},
 x1:{h:"Khám xe ở cửa thành",w:"emp",t:"Sáng sứ đoàn lên đường, quan giữ cửa thành chặn xe, có lệnh của bộ Binh: khám hết. {pa} đặt tay lên chuôi kiếm.",o:[
  {n:"Xin Hoàng thượng miễn khám",e:["win","lose"],rt:"Thánh chỉ đến kịp: xe sứ đi thẳng. {pa} ngoái lại nhìn về phía hoàng thành.",rf:"Hoàng thượng bảo: “Khám thì có sao.” Xe bị khám, {pa} giận."},
  {n:"Khuyên {pa} tự mở xe cho khám",e:["win","mid"],rt:"{pa} tự tay mở từng xe. Quan giữ cửa đỏ mặt, cúi chào tiễn sứ.",rf:"{pa} mở xe, mặt lạnh như sắt."},
  {n:"Để bộ Binh làm việc",e:"mid",lx:"{pa} chịu nhục ở cửa thành",rt:"Xe bị khám đến trưa, rồi được đi."}]}},
 E:{win:{k:1,tag:"Sứ đoàn về trong vinh dự",w:"emp",t:"Sứ đoàn ra khỏi cửa thành, cờ {land} bay cạnh cờ Đại Hy. Xe chở quà đáp lễ và thư của ngươi gửi {mh}.",go:()=>e67bien(3)},
  mid:{k:0,tag:"Sứ đoàn về, lòng còn vướng",t:"Sứ đoàn về yên, nhưng {pa} nhớ buổi sáng ở cửa thành, còn {mh} vẫn chờ một lời hứa."},
  lose:{k:-1,tag:"Xe sứ bị lục, huynh trưởng giận",w:"emp",t:"Xe sứ bị lục tung giữa cửa thành. {pa} ra về không ngoái lại, và quốc thư sau đó lạnh hơn mọi năm.",go:()=>e67bien(-4)}}});

rdDef("nc_su",11,{t:"Chiếc cầu hai nước",w:"emp",sj:"quốc thư của {land}",cast(A){return rdCast(A,["v"])},
 g:"Quốc thư của {quan} đến: {land} trả lời mọi điều đã bàn năm nay, và cuối thư có một dòng nói về ngươi. Hoàng thượng đọc xong, gọi ngươi đến. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Quốc thư nói tốt về ngươi",w:"emp",if:RDW(1),t:"Hoàng thượng đọc to dòng cuối quốc thư: “Con gái của trẫm ở Đại Hy là chiếc cầu. Xin bệ hạ giữ cầu cho vững.” Ngài cười: “Nàng nghe thấy chưa?”",o:[
  {n:"Tạ ơn, xin ngài giữ cầu cùng",sc:1,wx:"ngài thấy ngươi khéo",lx:"triều thần thấy ngươi được nể quá",rt:"Ngài nắm tay ngươi: “Trẫm giữ.”",rf:"Ngài chỉ gật đầu."},
  {n:"Thưa: cầu là của hai nước, không phải của thiếp",sc:1,wx:"khiêm nhường",lx:"công lao của ngươi bị chia đều",rt:"Hoàng thượng nhìn ngươi khác hẳn."},
  {n:"Xin ngài cho thiếp viết thư nhà gửi kèm",sc:1,wx:"lời của ngươi đi cùng quốc thư",lx:"ngài thấy ngươi chen vào việc nước",rt:"Ngài gật đầu: thư nhà của ngươi sẽ đi cùng quốc thư.",rf:"Ngài bảo: “Quốc thư đi một mình.”"}]},
 s2:{h:"Quốc thư lạnh",w:"emp",if:RDW(0),t:"Quốc thư năm nay ngắn và lạnh. Dòng cuối chỉ viết: “Con gái trẫm ở Đại Hy, xin bệ hạ coi như phi tần.” Hoàng thượng đọc xong, nhìn ngươi lâu.",o:[
  {n:"Thưa: cha thiếp giận, không phải {land} giận",sc:1,wx:"ngài nghe ra có đường gỡ",lx:"ngài cho là lời bào chữa",rt:"Ngài gật đầu: “Cha nàng giận thì để nàng gỡ.”",rf:"Ngài đặt thư xuống, không đáp."},
  {n:"Quỳ xin lỗi thay cố quốc",wx:"tỏ lòng thành",lx:"nhận lỗi không phải của mình",rt:"Hoàng thượng đỡ ngươi dậy."},
  {n:"Im lặng",wx:"không lỡ lời",lx:"ngài không biết ngươi nghĩ gì",rt:"Ngươi chỉ cúi đầu."}]},
 c1:{h:"Thư riêng của {mh}",w:"maid",t:"Kẹp trong quốc thư là một lá thư riêng của {mh}: bà đã khỏe hơn, nhưng mỗi đêm vẫn đặt chiếc chén của ngươi lên bàn ăn.",o:[
  {n:"Hồi thư kể chuyện trong cung",wx:"mẹ yên lòng",lx:"không nói được điều thật",rt:"Ngươi kể chuyện hoa trong ngự uyển, chuyện cây hòe trước cửa cung."},
  {n:"Gửi kèm bức chân dung",wx:"{mh} có mặt con để nhìn",lx:"tốn bạc",rt:"Họa sĩ cung đình vẽ ngươi trong lễ phục Đại Hy."},
  {n:"Xin Hoàng thượng cho thư đi đường quan",sc:1,wx:"thư nhà thành thư sáng",lx:"mọi chữ đều qua mắt Lễ bộ",rt:"Thư ngươi đi cùng quốc thư hồi đáp.",rf:"Lễ bộ đòi đọc trước."}]},
 c2:{h:"{v} tâu ngươi thiên vị cố quốc",w:"v",need:["v"],t:"{v} nói giữa buổi thỉnh an: “Năm nay sứ {land} được lợi đủ đường. Ai cũng biết vì ai.”",o:[
  {n:"Kể từng điều Đại Hy được lợi",sc:1,wx:"lời {v} rỗng",lx:"cãi nhau giữa buổi thỉnh an",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"Ngươi kể ngựa, da, thuế chợ. Các phi tần gật đầu.",rf:"Cả điện thấy hai người cãi nhau, không ai đứng về phía nào."},
  {n:"Gửi lễ hòa giải",sc:1,wx:"hai cung tạm yên",lx:"{v} nắm thóp",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"{v} nhận lễ, thôi nói.",rf:"{v} nhận lễ, rồi vẫn nói."},
  {n:"Mặc kệ",wx:"không tốn gì",lx:"lời ấy ở lại",rt:"Ngươi không đáp."}]},
 t1:{h:"Dòng thư về ngươi",w:"emp",t:"Hoàng thượng hỏi: “Cha nàng nhắc đến nàng. Nàng muốn trẫm hồi đáp dòng ấy thế nào?”",o:[
  {n:"Xin ngài viết: nàng là cầu của hai nước",sc:1,f:"bridge",wx:"tên ngươi đứng trong quốc thư",lx:"có người cho là ngươi tham danh",rt:"Hoàng thượng gật đầu, ghi lại.",rf:"Hoàng thượng bảo: “Quốc thư không viết tên phi tần.”"},
  {n:"Xin ngài viết: nàng là phi của trẫm",f:"law",wx:"ngài vui",lx:"{land} đọc thấy ngươi đã thuộc về Đại Hy",rt:"Hoàng thượng cười: “Đúng thế.”"},
  {n:"Xin ngài đừng nhắc đến thiếp",wx:"không ai nói ngươi tranh công",lx:"công của ngươi không ai ghi",rt:"Hoàng thượng gác bút."}]},
 x1:{h:"Quốc thư hồi đáp",w:"emp",t:"Lễ bộ đã dâng bản thảo quốc thư hồi đáp. Đêm ấy Hoàng thượng đến cung ngươi, không mang theo bản thảo, chỉ hỏi: “Trẫm muốn thêm một dòng cho cha nàng. Nàng nghĩ nên thế nào?”",o:[
  {n:"Xin ngài thêm một điều: mỗi năm một sứ đoàn, mang theo thư nhà của ngươi",e:["win","lose"],rt:"Hoàng thượng chuẩn. Từ nay mỗi năm sứ {land} sang, đều mang theo thư nhà cho ngươi, đi đường quan.",rf:"Lễ bộ phản đối: quốc thư không kèm việc hậu cung. Hoàng thượng gạt điều ấy đi, và triều thần nhớ ngươi đã xin."},
  {n:"Xin ngài không thêm điều gì, chỉ viết lời cho ấm hơn",e:["win","mid"],rt:"Hoàng thượng sai Lễ bộ sửa vài chữ; quốc thư đọc lên như thư của hai nhà thông gia.",rf:"Quốc thư vẫn là quốc thư, đúng phép mà không ấm."},
  {n:"Thưa: việc quốc thư, xin để Lễ bộ định",e:"mid",lx:"ngươi không để lại dấu gì",rt:"Hoàng thượng gật đầu, không nói gì."}]}},
 E:{win:{k:1,tag:"Cầu nối hai triều",w:"emp",t:"Quốc thư đi, sứ đoàn đến, chợ biên mở mỗi mùa. Ở {land} người ta nhắc tên ngươi khi nói đến Đại Hy, ở Đại Hy người ta nhắc tên ngươi khi nói đến {land}.",go:()=>e67bien(5)},
  mid:{k:0,tag:"Hai nước yên, ngươi đứng giữa",t:"Hai nước giữ lễ với nhau. Không ai trách ngươi, cũng không ai cần ngươi. Ngươi tự đi đường mình trong cung."},
  lose:{k:-1,tag:"Sứ tiết thưa dần",w:"emp",t:"Quốc thư đi rồi không thấy hồi âm. Năm sau {land} không sai sứ sang. Ngươi vẫn là phi tần của Đại Hy, nhưng con đường về nhà đã cỏ mọc.",go:()=>e67bien(-5)}}});
RD97L.push(rdRare({a:"nc_su_11",tag:"Hai triều cùng sắc phong",w:"emp",n:"Xin Hoàng thượng cùng đóng ấn vào lá thư ngươi viết cho cha",
 path:["Tạ ơn, xin ngài giữ cầu cùng","Xin ngài cho thiếp viết thư nhà gửi kèm","cha thiếp giận, không phải","Gửi kèm bức chân dung","đi đường quan","Kể từng điều Đại Hy được lợi","nàng là cầu của hai nước"],bad:["Gửi lễ hòa giải","Xin ngài đừng nhắc đến thiếp"],x:[()=>S.danh>=RR("nc_su_11").bar,"Danh từ "+RR("nc_su_11").bar],
 t:"Lá thư ngươi viết đi cùng quốc thư, dưới có ấn Đại Hy. Mùa xuân năm sau, sứ đoàn mang sang hai đạo sắc: một của cha ngươi phong ngươi làm công chúa hộ quốc, một đạo Hoàng thượng đã viết sẵn chờ, ban ngươi hiệu riêng. Hai đạo sắc treo cạnh nhau trong cung ngươi.",
 go:()=>e67bien(8),rw:"nt_dongchau",ti:"Phi tần hai triều sắc phong"}));
/* ---------- nc_tuc · Người ngoại tộc ---------- */
/* BAL.road.nc_tuc = {} (no chapter constants: deadlines are told in text, costs inline as in jrd_tt) */
/* Played after nc_tuc (.4 Người ngoại tộc) AND after bd_tuc (.4 Phong tục thảo nguyên, alias in nc_tail). Chapter .5 opens with NCW/BDW;
   .6–.11 open with RDW and stay land-neutral ({land} {mh} only). The Thái hậu can die mid-road (j4/j13/jmort): every hồi that needs her
   carries need:["th"], and every climax has an x2 twin (if S.thDead) told before Hoàng thượng, so no chapter stalls. */
rdDef("nc_tuc",5,{t:"Áo váy cố hương",w:"th",sj:"y phục ngươi mặc trong lễ Nguyên đán",cast(A){return rdCast(A,["v"])},
 g:"Lễ Nguyên đán sắp đến. Nội vụ phủ ra lệnh mọi phi tần lạy mừng năm mới trong lễ phục Đại Hy theo phẩm. Rương áo {land} của ngươi nằm dưới đáy tủ. Mặc gì vào ngày ấy là nói cho cả cung biết ngươi là ai.",
 p:[["s1","s2","s3","s4","s5"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Áo cố hương được bắt chước",w:"v",if:()=>NCW(1)()&&(rdPrev()!=="r97"||S.thDead),t:"Từ ngày Thái hậu khen ngươi ở yến thọ, cả cung để ý ngươi mặc gì; mấy phi tần thấp phẩm lén may váy thêu theo kiểu cố hương của ngươi. {v} tâu với Nội vụ phủ rằng ngươi làm loạn phép y phục trong cung.",o:[
  {n:"Tặng mẫu thêu cho mọi người",wx:"thành người dẫn lối trong hậu cung",lx:"{v} có cớ nói ngươi kết bè",go:A=>{rdOan(A,"v",4)},rt:"Cả hậu cung thêu hoa văn cố hương. {v} tức đến đổ chén trà."},
  {n:"Tự đến Nội vụ phủ xin định lệ",sc:1,f:"keep",wx:"áo cố hương có chỗ trong lệ cung",lx:"Nội vụ phủ cho là ngươi lên mặt",rt:"Nội vụ phủ chép thêm một dòng: phi tần ngoại quốc được mặc y phục bản quốc ngày thường.",rf:"Tổng quản Nội vụ phủ cười nhạt: “Lệ cung không vì một người mà đổi.”"},
  {n:"Bảo các nàng thôi may",f:"bend",wx:"dập lời tâu của {v}",lx:"người theo ngươi cụt hứng",rt:"Các phi tần cất váy thêu kiểu cố hương vào rương."}]},
 s5:{h:"Áo lông công và lễ mồng Một",w:"v",need:["th"],if:()=>NCW(1)()&&rdPrev()==="r97",t:"Từ điệu múa chim công, ai chê áo cố hương của ngươi là chê Đức Thọ cung, nên không ai dám chê nữa. {v} đổi cách: sai người đi khắp cung hỏi xem sáng mồng Một ngươi có mặc áo lông công vào lạy Thái hậu không, như thể ơn của bà là cái cớ để ngươi lấn lễ.",o:[
  {n:"Xin Thái hậu chỉ dạy nên mặc gì",sc:1,f:"keep",wx:"lời Thái hậu chặn miệng mọi người",lx:"Thái hậu thấy ngươi cậy ơn bà",rt:"Thái hậu cười: “Lễ sáng thì phẩm phục. Tối yến, ai gia muốn thấy con chim công.”",rf:"Thái hậu bảo: “Việc áo xống, tự con liệu.”"},
  {n:"Lễ sáng mặc phẩm phục, giữ áo lông công cho yến tối",f:"bend",wx:"không ai bắt được lỗi",lx:"{v} bảo ngươi không dám dùng ơn Thái hậu",rt:"Ngươi cất áo lông công vào rương, để dành cho yến tối."},
  {n:"Mặc áo lông công cả buổi lễ",sc:1,f:"keep",wx:"cả cung nhớ ơn Thái hậu ban cho ngươi",lx:"cả cung, và Thái hậu, cho là ngươi lấn lễ",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"Thái hậu gật đầu khi thấy ngươi; không ai dám nói gì.",rf:"Thái hậu nhíu mày: “Lễ sáng không phải chỗ múa.”"}]},
 s2:{h:"Thượng y cục chậm tay",w:"maid",if:NCW(0),t:"Từ yến thọ, cả cung gọi ngươi là người ngoài. Thượng y cục viện cớ bận, chưa may lễ phục Nguyên đán cho cung ngươi; chỉ còn hơn một tháng là đến lễ.",o:[
  {n:"Lo lót Thượng y cục",sc:1,wx:"áo kịp lễ",lx:"cả cung biết ngươi phải đút lót mới có áo",rt:"Ba ngày sau, lễ phục được đưa đến, đường kim đều tăm tắp.",rf:"Thượng y cục nhận bạc, áo vẫn chậm."},
  {n:"Tự tay may lấy",f:"bend",wx:"áo do chính tay ngươi",lx:"mệt người, đường kim chưa khéo",rt:"Ngươi thức mấy đêm liền bên ngọn đèn."},
  {n:"Lấy áo cố hương ra phơi",f:"keep",wx:"không phải cúi đầu xin ai",lx:"thành cớ cho người ta bắt lỗi",rt:"Áo cố hương phơi đầy sân, sặc sỡ giữa tuyết."}]},
 s3:{h:"Tóc tết và áo cổ đứng",w:"v",if:BDW(1),t:"Từ yến thọ, ngươi được tiếng trong cung. Nhưng ngươi vẫn tết tóc, mặc áo cổ đứng như ở thảo nguyên, và {v} bảo Nội vụ phủ rằng như thế là coi thường lệ cung.",o:[
  {n:"Tặng các phi tần đai lưng thêu",wx:"người ta thấy ngươi rộng tay",lx:"{v} có cớ nói ngươi kết bè",go:A=>{rdOan(A,"v",4)},rt:"Đai lưng thêu cố hương thành món quà được tranh nhau."},
  {n:"Xin Nội vụ phủ cho mặc áo bản quốc ngày thường",sc:1,f:"keep",wx:"áo cố hương có chỗ trong lệ cung",lx:"Nội vụ phủ cho là ngươi lên mặt",rt:"Nội vụ phủ chép thêm một dòng lệ mới.",rf:"Nội vụ phủ gạt đi."},
  {n:"Gỡ tóc tết, búi theo lối Đại Hy",f:"bend",wx:"dập lời tâu của {v}",lx:"soi gương thấy người lạ",rt:"Cung nữ vấn tóc cho ngươi, tay run run."}]},
 s4:{h:"Tấm da sói trước cửa",w:"maid",if:BDW(0),t:"Từ yến thọ, có kẻ treo một tấm da sói trước cửa cung ngươi để giễu “người rợ”. Lễ Nguyên đán sắp đến; cả cung chờ xem ngươi mặc gì.",o:[
  {n:"Cho người tra kẻ treo da",sc:1,wx:"biết ai giễu ngươi",lx:"ầm ĩ mà không ra ai",rt:"Kẻ treo da là một thái giám quét sân, nhận bạc của người khác.",rf:"Không ai nhận."},
  {n:"Treo tấm da lên vách cho đẹp gian phòng",sc:1,f:"keep",wx:"lời giễu thành chuyện cười cho kẻ giễu",lx:"người ta cho là ngươi ngang bướng",rt:"Ai đến cung ngươi cũng hỏi về tấm da, và ngươi kể chuyện săn sói.",rf:"Thêm một cớ để gọi ngươi là người rợ."},
  {n:"Lặng lẽ cất đi",f:"bend",wx:"không thêm sóng",lx:"kẻ giễu được thể",rt:"Ngươi cuộn tấm da cất vào kho."}]},
 c1:{h:"Ma ma Đức Thọ cung đến xem áo",w:"th",need:["th"],t:"Thái hậu sai một lão ma ma đến xem lễ phục ngươi định mặc. Bà lật từng lớp áo cố hương, không nói một lời.",o:[
  {n:"Mời ma ma chỉ dạy lễ phục Đại Hy",f:"bend",wx:"Thái hậu biết ngươi chịu học",lx:"ma ma kể lại là ngươi chịu bỏ áo quê",rt:"Ma ma chỉ từng nếp gấp, từng dải lụa theo phẩm."},
  {n:"Kể cho ma ma ý nghĩa từng đường thêu",sc:1,f:"keep",wx:"ma ma kể lại cho Thái hậu nghe",lx:"ma ma tâu lại Thái hậu: ngươi cãi lệ",rt:"Ma ma nghe xong, khẽ vuốt đường thêu: “Đẹp. Để lão nói lại với Thái hậu.”",rf:"Ma ma gấp áo lại: “Lão chỉ đến xem, không đến nghe.”"},
  {n:"Biếu ma ma một tấm gấm cố hương",sc:1,wx:"ma ma nói đỡ một câu",lx:"có người bảo ngươi đút lót người của Thái hậu",rt:"Ma ma nhận gấm, dặn nhỏ: “Hôm ấy đừng mặc màu đỏ.”"}]},
 c2:{h:"{v} may áo giống áo ngươi",w:"v",need:["v"],t:"{v} cho người dò xem ngươi sẽ mặc gì, rồi đặt Thượng y cục may một bộ y hệt áo cố hương của ngươi, chỉ là màu chói hơn, để vào lạy trước ngươi một khắc.",o:[
  {n:"Đổi sang bộ khác vào phút cuối",sc:1,wx:"{v} thành kẻ bắt chước vụng",lx:"áo đổi vội không vừa",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"{v} đứng giữa điện trong bộ áo lạ, chẳng ai hiểu nàng mặc để làm gì.",rf:"Áo mới chưa kịp sửa, tay áo dài lê đất."},
  {n:"Báo Nội vụ phủ áo ấy vượt phẩm",sc:1,wx:"{v} bị buộc thay áo",lx:"Nội vụ phủ cho là ngươi gây chuyện",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Nội vụ phủ thu bộ áo của {v}: thêu kim tuyến quá phẩm.",rf:"Nội vụ phủ bảo áo ấy không trái lệ."},
  {n:"Để nàng mặc, ngươi nhường",wx:"không tranh",lx:"hôm ấy người ta nhớ áo của {v}",go:A=>{rdRel(A,"v",5)},rt:"Ngươi chỉ cười khi nghe tin."}]},
 t1:{h:"Chiếc khăn của mẹ",w:"maid",t:"Thư của {mh} đến cùng một chiếc khăn thêu: “Con mặc gì cũng được, chỉ đừng quên con là ai.”",o:[
  {n:"Cài khăn của mẹ vào lễ phục Đại Hy",sc:1,f:"both",wx:"giữ một chút cố hương trong áo Đại Hy",lx:"kẻ tinh mắt sẽ thấy",rt:"Ngươi khâu chiếc khăn vào lớp lót trong ống tay."},
  {n:"Thưa mẹ rằng con đã là người Đại Hy",f:"bend",wx:"lòng định",lx:"mẹ khóc khi đọc thư",rt:"Thư đi, ngươi không đọc lại."},
  {n:"Xin mẹ gửi thêm chỉ thêu quê nhà",sc:1,f:"keep",wx:"đủ chỉ thêu một bộ lễ phục của riêng ngươi",lx:"tốn bạc, đường xa",rt:"Một tháng sau, gói chỉ thêu về đến, còn thơm mùi lá quê."}]},
 x1:{h:"Sáng mồng Một",w:"th",need:["th"],t:"Sáng mồng Một, phi tần xếp hàng vào Đức Thọ cung lạy mừng năm mới. Thái hậu ngồi trên, mắt dừng lại ở ngươi.",o:[
  {n:"Mặc áo cố hương, lạy theo lễ Đại Hy",e:["win","lose"],rt:"Thái hậu gật đầu: “Áo là của nó, lễ là của Đại Hy. Được.”",rf:"Thái hậu nghiêm mặt: “Hôm nay là lễ của ai?”"},
  {n:"Mặc lễ phục Đại Hy, giấu khăn của mẹ trong tay áo",e:["win","mid"],rt:"Thái hậu thấy góc khăn lộ ra khi ngươi lạy, chỉ mỉm cười không hỏi.",rf:"Không ai thấy gì, cũng không ai nhớ gì."},
  {n:"Mặc lễ phục Đại Hy đúng phẩm",e:"mid",lx:"chẳng ai nhớ ngươi là ai",rt:"Ngươi lạy đúng lễ, lui đúng lúc."}]},
 x2:{h:"Sáng mồng Một",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất. Sáng mồng Một, phi tần vào lạy mừng năm mới trước Hoàng thượng; Lễ quan đứng bên xướng tên từng người, và Hoàng thượng ngẩng lên khi nghe tên ngươi.",o:[
  {n:"Mặc áo cố hương, lạy theo lễ Đại Hy",e:["win","lose"],rt:"Hoàng thượng cười: “Năm mới, có một đóa hoa lạ.”",rf:"Lễ quan tâu: phi tần ấy trái lệ y phục."},
  {n:"Mặc lễ phục Đại Hy, giấu khăn của mẹ trong tay áo",e:["win","mid"],rt:"Hoàng thượng thấy góc khăn lạ, hỏi nhỏ, và nghe ngươi kể về mẹ.",rf:"Không ai thấy gì, cũng không ai nhớ gì."},
  {n:"Mặc lễ phục Đại Hy đúng phẩm",e:"mid",lx:"chẳng ai nhớ ngươi là ai",rt:"Ngươi lạy đúng lễ, lui đúng lúc."}]}},
 E:{win:{k:1,tag:"Áo cố hương có chỗ trong cung",w:"th",t:"Từ lễ Nguyên đán ấy, áo cố hương của ngươi không còn là cớ để bắt lỗi. Có người bắt chước, có người ghen, nhưng không ai dám chê trước mặt."},
  mid:{k:0,tag:"Áo Đại Hy, lòng cố hương",t:"Ngươi mặc như mọi người. Lễ trôi qua êm, còn áo cố hương nằm lại dưới đáy rương."},
  lose:{k:-1,tag:"Bị chê trái lệ",t:"Cả cung kể lại chuyện người ngoại tộc đứng lạc giữa hàng phi tần trong ngày đầu năm. {v} cười to nhất.",go:A=>{rdOan(A,"v",4);return ""}}}});

rdDef("nc_tuc",6,{t:"Món ăn lạ",w:"doc",sj:"bát {canh} cố hương ở cung ngươi",cast(A){return rdCast(A,["v"])},
 g:"{v} ăn một bát {canh} theo lối {land} ở cung ngươi, đêm ấy nôn mửa, sốt cao. Cả cung đồn ngươi bỏ bùa ngải người ngoại tộc. Thận hình ty cho mười ngày; quá hạn chưa rõ trắng đen, vụ việc sẽ dâng lên trên.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Bữa tiệc mừng xuân",w:"v",if:RDW(1),t:"Sau lễ Nguyên đán, ngươi được tiếng; nhiều phi tần đến cung ngươi dự tiệc mừng xuân. {v} cũng đến, ăn nhiều nhất, và là người duy nhất ngã bệnh.",o:[
  {n:"Niêm bếp, giữ nguyên mọi thứ làm chứng",sc:1,wx:"giữ được chứng",lx:"người ta bảo ngươi chột dạ",rt:"Nồi canh, rổ lá, đũa bát đều được niêm lại."},
  {n:"Sai người mang thuốc đến thăm",wx:"tỏ lòng ngay",lx:"thuốc của ngươi, nàng không dám uống, còn đem ra làm cớ",rt:"Cung nữ của {v} nhận thuốc, đóng cửa ngay."},
  {n:"Tự đến cung {v} hỏi bệnh",sc:1,wx:"thấy tận mắt cơn bệnh",lx:"bị đuổi trước mặt người hầu",go:(A,ok)=>{if(!ok)rdOan(A,"v",4)},rt:"{v} nằm trên giường, nhìn ngươi bằng ánh mắt không giống người bệnh.",rf:"Cửa cung {v} đóng chặt."}]},
 s2:{h:"Lời đồn chạy trước thái y",w:"maid",if:RDW(0),t:()=>(rdPrev()==="lose"?"Sau lễ Nguyên đán, ngươi vốn đã bị chê.":"Lễ Nguyên đán qua êm, nhưng cả cung vẫn nhớ ngươi là người ngoại tộc.")+" Nay {v} ngã bệnh sau bữa ở cung ngươi, lời đồn bùa ngải chạy nhanh hơn thái y.",o:[
  {n:"Đóng cửa cung, không tiếp ai",wx:"không để lời nói bị bắt bẻ",lx:"đóng cửa là thừa nhận",rt:"Cửa cung ngươi khép lại suốt mấy ngày."},
  {n:"Cho người đi dập lời đồn",sc:1,wx:"lời đồn chậm lại",lx:"càng dập càng lan",rt:"Mấy cung nữ hay chuyện bỗng im miệng.",rf:"Ai cũng hỏi: không có gì thì dập làm chi?"},
  {n:"Xin Thận hình ty tra rõ ngay",f:"proof",wx:"tỏ ra không sợ",lx:"Thận hình ty sẽ soát cả bếp ngươi",rt:"Thận hình ty nhận lời, cho người đến bếp ngươi."}]},
 c1:{h:"Thái y nghiệm canh",w:"doc",t:"Thái y viện nghiệm bát canh còn lại. Trong canh có một thứ {laq} {land} mà sách thuốc Đại Hy không chép.",o:[
  {n:"Ăn một bát trước mặt thái y",sc:2,wx:"chứng canh không độc",lx:"ngươi cũng đau bụng ba ngày",rt:"Ngươi ăn hết bát, ba ngày sau vẫn khỏe.",rf:"Bụng ngươi quặn lên, người ta càng tin canh có điều bất ổn."},
  {n:"Mời người hiểu thuốc trong sứ quán cố hương",sc:1,wx:"có người hiểu thứ lá ấy làm chứng",lx:"người ta bảo người cố hương thì bênh người cố hương",rt:"Người hiểu thuốc giải: lá ấy lành, chỉ hại người vốn kỵ vị chua.",rf:"Thái y viện không nhận lời người ngoài."},
  {n:"Chép tên lá và cách nấu dâng Thái y viện",f:"proof",wx:"tỏ ra không giấu gì",lx:"bài thuốc của quê ngươi bị đem đi bàn tán",rt:"Thái y viện giữ bản chép để đối chiếu."}]},
 c2:{h:"Cung nữ hầu {v}",w:"v",need:["v"],t:"Một cung nữ hầu {v} lén tìm đến: hôm ấy chủ nàng còn ăn một đĩa bánh lạ do người khác dâng, trước khi sang cung ngươi.",o:[
  {n:"Giữ nàng lại làm chứng",sc:1,f:"proof",wx:"có lời khai",lx:"nàng sợ chủ biết, có thể đổi lời",go:A=>{rdOan(A,"v",4)},rt:"Ngươi cho nàng tiền gửi về nhà, dặn khi cần thì nói thật."},
  {n:"Hỏi cho ra ai dâng đĩa bánh",sc:1,wx:"lần ra một đầu mối",lx:"nàng sợ, bỏ trốn",rt:"Đĩa bánh do chính cung nữ thân tín của {v} làm.",rf:"Nàng run rẩy, không dám nói thêm."},
  {n:"Bảo nàng về, không dùng lời nàng",wx:"không đẩy người hầu vào chỗ chết",lx:"mất một manh mối",rt:"Nàng cúi đầu lui ra."}]},
 t1:{h:"Bệnh từ đâu",w:"v",t:"Manh mối dồn lại: {v} vốn kỵ vị chua từ nhỏ, người nhà nàng ai cũng biết. Vậy mà hôm ấy nàng ăn hai bát.",o:[
  {n:"Gom chứng, chờ ngày đối chất",sc:1,f:"proof",wx:"có đủ lời để nói",lx:"chờ thì lời đồn càng lan",rt:"Ngươi ghi từng lời vào một cuốn sổ nhỏ."},
  {n:"Gặp riêng {v}, cho nàng một lối lui",sc:1,wx:"{v} thôi làm lớn",lx:"{v} biết ngươi đã biết",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} cắn môi: “Ta chỉ không muốn thấy một người ngoài được thương hơn ta.”",rf:"{v} cười: “Lối lui là của ngươi mới phải.”"},
  {n:"Cho người kể khắp nơi chuyện nàng kỵ vị chua",sc:1,wx:"lời đồn quay đầu",lx:"thành ra hai cung đấu miệng",go:A=>{rdOan(A,"v",8)},rt:"Cả cung bắt đầu hỏi: kỵ chua sao còn ăn?",rf:"Người ta bảo ngươi bịa chuyện đổ tội."}]},
 x1:{h:"Hết hạn mười ngày",w:"th",need:["th"],t:"Mười ngày đã hết. Thái hậu cho gọi ngươi và {v} sang Đức Thọ cung. Bát canh nguội đặt giữa hai người.",o:[
  {n:"Trình chứng {v} tự ăn thứ mình kỵ",e:["win","lose"],rt:"Thái hậu nghe xong, quay sang {v}: “Lấy thân mình làm cớ hại người, ngươi học ở đâu?”",rf:"Thái hậu phẩy tay: “Ai gia không muốn nghe hai người đổ cho nhau.”"},
  {n:"Xin nấu lại trước mặt Thái hậu, ngươi ăn trước",e:["win","mid"],rt:"Ngươi ăn một bát, Thái hậu nếm một thìa: “Lạ miệng mà thơm. Không có bùa ngải nào ở đây.”",rf:"Thái hậu không nếm, chỉ bảo: “Từ nay bớt nấu món lạ.”"},
  {n:"Nhận sơ suất, xin thôi nấu món quê",e:"mid",lx:"bếp cố hương tắt hẳn",rt:"Thái hậu gật đầu cho lui."}]},
 x2:{h:"Hết hạn mười ngày",w:"emp",if:()=>S.thDead,t:"Mười ngày đã hết. Thận hình ty dâng vụ việc lên Hoàng thượng; ngài cho gọi ngươi và {v} đến Dưỡng Tâm điện.",o:[
  {n:"Trình chứng {v} tự ăn thứ mình kỵ",e:["win","lose"],rt:"Hoàng thượng nhìn {v} rất lâu: “Trẫm không thích bị lừa.”",rf:"Hoàng thượng chán: “Hậu cung lại thêm một chuyện.”"},
  {n:"Xin nấu lại trước mặt Hoàng thượng, ngươi ăn trước",e:["win","mid"],rt:"Hoàng thượng ăn hết bát canh, đòi thêm bát nữa.",rf:"Hoàng thượng không ăn, chỉ dặn bớt nấu món lạ."},
  {n:"Nhận sơ suất, xin thôi nấu món quê",e:"mid",lx:"bếp cố hương tắt hẳn",rt:"Hoàng thượng gật đầu cho lui."}]}},
 E:{win:{k:1,tag:"Canh cố hương vô tội",w:"th",t:"Bát canh được rửa tiếng. Kẻ tự làm mình bệnh để đổ cho ngươi bị cả cung nhìn bằng con mắt khác.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Bếp quê tắt lửa",t:"Không ai bị phạt. Bếp nhỏ cung ngươi thôi nấu món quê, và lời đồn cũng nguội dần."},
  lose:{k:-1,tag:"Mang tiếng bùa ngải",t:"Không ai chứng được ngươi vô tội. Từ đó người ta kháo nhau: đừng ăn gì ở cung người ngoại tộc."}}});

rdDef("nc_tuc",7,{t:"Bàn thờ cố hương",w:"emp",sj:"bàn thờ tổ tiên trong cung ngươi",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng mấy tuần liền mất ngủ, đêm nào cũng mộng dữ. Có kẻ tâu rằng trong cung ngươi có bàn thờ thần lạ, đêm đêm khói hương bay về phương cố quốc. Lệnh soát cung sắp ban. Giữ bàn thờ của tổ tiên mà không mang tiếng tà thuật.",
 p:[["s1","s2"],["c1","c2"],["t1","t2"],["x1"]],
 B:{s1:{h:"Kẻ thua đổi cách",w:"v",if:RDW(1),t:"{v} thua chuyện bát canh, nay đổi cách: người của nàng rỉ tai khắp cung rằng ngươi đêm đêm khấn một vị thần lạ, đúng những đêm Hoàng thượng mộng dữ.",o:[
  {n:"Mời phi tần đến xem ngươi thắp hương",sc:1,f:"open",wx:"người ta thấy tận mắt",lx:"có kẻ mang chuyện đi kể sai",rt:"Mấy phi tần đến, thấy chỉ có hương và hoa quả.",rf:"Có người về kể rằng tượng thần trừng mắt nhìn nàng."},
  {n:"Thôi thắp hương ban đêm",wx:"không cho kẻ rình một cảnh để kể",lx:"tổ tiên thiếu hương",rt:"Bàn thờ chỉ còn hương buổi sáng."},
  {n:"Cho người rình người của {v}",sc:1,wx:"biết ai mang chuyện đi",lx:"rình người là chuyện dễ lộ",go:(A,ok)=>{if(ok)rdOan(A,"v",4)},rt:"Kẻ rỉ tai là thái giám đưa than cho cung {v}.",rf:"Kẻ rình bị phát hiện."}]},
 s2:{h:"Lời đồn thành lời tâu",w:"v",if:RDW(0),t:"Tiếng bùa ngải chưa tan thì Hoàng thượng mất ngủ. {v} quỳ trước Nội vụ phủ, xin soát cung ngươi “để Hoàng thượng được yên giấc”.",o:[
  {n:"Tự xin soát cung trước",f:"open",wx:"tỏ ra không giấu",lx:"cung ngươi bị lật tung",rt:"Nội vụ phủ ghi nhận lời xin của ngươi."},
  {n:"Lo lót Nội vụ phủ hoãn soát",sc:1,wx:"có thêm thời gian",lx:"lộ ra thì thành tội che giấu",rt:"Lệnh soát bị hoãn nửa tháng.",rf:"Người Nội vụ phủ nhận bạc mà không hoãn, còn kể lại với Hoàng thượng."},
  {n:"Lặng lẽ thắp hương như cũ",f:"keep",wx:"không đổi lòng vì lời đồn",lx:"người ta càng tin là có chuyện",rt:"Khói hương vẫn bay qua mái ngói mỗi đêm."}]},
 c1:{h:"Tượng thần cố hương",w:"maid",t:"Trên bàn thờ có một tượng thần nhỏ bằng gỗ, {mh} trao cho ngươi ngày lên kiệu hoa. Người không biết thì nhìn nó như một con quỷ.",o:[
  {n:"Gửi tượng sang chùa trong cung thờ chung",f:"bend",wx:"tượng có chỗ đứng chính danh",lx:"không còn được thắp hương mỗi tối",rt:"Sư trụ trì nhận tượng, đặt ở góc điện phụ."},
  {n:"Giữ nguyên, khắc thêm chữ Đại Hy giải nghĩa",sc:1,f:"keep",wx:"ai đọc cũng hiểu đó là thần giữ nhà",lx:"chữ khắc vụng thành trò cười",rt:"Dưới chân tượng giờ có bốn chữ: “Hộ trạch an khang”.",rf:"Chữ khắc lệch, có người đọc ra nghĩa khác."},
  {n:"Giấu tượng trong rương",f:"hide",wx:"soát không thấy",lx:"nếu bị tìm ra thì càng giống tà thuật",rt:"Tượng nằm dưới lớp áo cố hương."}]},
 c2:{h:"Hình nhân trong bao gạo",w:"v",need:["v"],t:"Đêm trước ngày soát, cung nữ của ngươi bắt gặp một thái giám lạ lén nhét một hình nhân vải vào bao gạo trong bếp ngươi.",o:[
  {n:"Bắt hắn, giữ cả hình nhân làm chứng",sc:2,f:"caught",wx:"có chứng kẻ cài đồ",lx:"ầm ĩ giữa đêm",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"Thái giám bị trói, khai là người hầu than của cung {v}.",rf:"Hắn vùng thoát, hình nhân rơi lại."},
  {n:"Đốt hình nhân ngay",wx:"không còn gì để soát ra",lx:"mất cả chứng cứ",rt:"Hình nhân cháy trong bếp lò."},
  {n:"Nhét hình nhân trả về cung {v}",sc:1,wx:"gậy ông đập lưng ông",lx:"bị bắt thì ngươi thành kẻ cài đồ",go:A=>{rdOan(A,"v",12)},rt:"Sáng hôm sau, cung {v} có chuyện để giải thích.",rf:"Người đem hình nhân đi bị bắt giữa đường."}]},
 t1:{h:"Thái hậu hỏi về vị thần",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi, không nói chuyện soát cung, chỉ hỏi: “Thần của ngươi phù hộ cho ai?”",o:[
  {n:"Thưa: phù hộ cho nhà nào thờ thần",sc:1,wx:"Thái hậu hiểu thần ấy giữ nhà",lx:"Thái hậu hỏi: vậy nhà ngươi là nhà nào",rt:"Thái hậu gật đầu: “Vậy là giữ nhà cho Đại Hy.”",rf:"Thái hậu im lặng."},
  {n:"Xin Thái hậu đến xem bàn thờ",sc:2,f:"open",wx:"Thái hậu thấy tận mắt",lx:"Thái hậu không ưa cảnh lạ",rt:"Thái hậu đứng trước bàn thờ, tự tay cắm một nén hương.",rf:"Thái hậu nhìn tượng thần, cau mày quay đi."},
  {n:"Thưa: thiếp nguyện bỏ nếu Thái hậu không ưa",f:"bend",wx:"Thái hậu thấy ngươi biết điều",lx:"lời đã nói thì phải giữ",rt:"Thái hậu chỉ nói: “Để xem đã.”"}]},
 t2:{h:"Hoàng thượng hỏi về vị thần",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất. Một đêm không ngủ, Hoàng thượng hỏi ngươi: “Thần của nàng phù hộ cho ai?”",o:[
  {n:"Thưa: phù hộ cho nhà nào thờ thần",sc:1,wx:"ngài hiểu thần ấy giữ nhà",lx:"ngài hỏi: vậy nhà nàng là nhà nào",rt:"Hoàng thượng gật đầu: “Vậy là giữ nhà cho Đại Hy.”",rf:"Hoàng thượng im lặng."},
  {n:"Xin ngài đến xem bàn thờ",sc:2,f:"open",wx:"ngài thấy tận mắt",lx:"ngài không ưa cảnh lạ",rt:"Hoàng thượng đứng trước bàn thờ, tự tay cắm một nén hương.",rf:"Hoàng thượng nhìn tượng thần, cau mày quay đi."},
  {n:"Thưa: thiếp nguyện bỏ nếu ngài không ưa",f:"bend",wx:"ngài thấy ngươi biết điều",lx:"lời đã nói thì phải giữ",rt:"Hoàng thượng chỉ nói: “Để xem đã.”"}]},
 x1:{h:"Lệnh soát cung",w:"emp",t:"{eun} dẫn người đến soát. Hoàng thượng cũng đến, đứng dưới hiên, mắt thâm quầng vì những đêm không ngủ.",o:[
  {n:"Tự mở bàn thờ, giải nghĩa từng lễ vật",e:["win","lose"],rt:"Hoàng thượng nghe đến chuyện thần giữ nhà, khẽ nói: “Vậy đêm nay thần của nàng giữ cả giấc ngủ của trẫm.”",rf:"{eun} lôi từ góc bếp ra một thứ không phải của ngươi."},
  {n:"Xin Hoàng thượng cho rước tượng sang chùa",e:["win","mid"],rt:"Hoàng thượng chuẩn. Tượng được rước sang chùa trong cung có lọng che, và đêm ấy ngài ngủ yên.",rf:"Tượng được rước đi, lời đồn cũng theo đi, nhưng bàn thờ cung ngươi trống."},
  {n:"Để mặc soát, không nói gì",e:["mid","lose"],rt:"Soát ba canh giờ, không thấy gì đáng tội.",rf:"Tượng thần bị lôi ra giữa sân."}]}},
 E:{win:{k:1,tag:"Thần cố hương được thờ",w:"emp",t:"Bàn thờ cố hương của ngươi được Hoàng thượng chính miệng cho giữ. Kẻ tâu tà thuật phải im, và từ đó không ai dám rình khói hương của cung ngươi.",go:A=>{rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Bàn thờ dời đi",t:"Không ai buộc tội ngươi. Nhưng hương khói cho tổ tiên, từ nay ngươi phải đến chùa mới thắp được."},
  lose:{k:-1,tag:"Mang tiếng tà thuật",go:()=>ncConfine("tuc"),t:()=>`Tượng thần bị thu, ngươi bị cấm túc ${NCCW("tuc")} tháng để “tĩnh tâm”. Trong cung có người bắt đầu tránh đi ngang cửa nhà ngươi.`}}});

rdDef("nc_tuc",8,{t:"Tờ sớ người ngoại tộc",w:"emp",sj:"tờ sớ xin hạn ngôi thứ của phi tần ngoại tộc",cast(A){return rdCast(A,["v"])},
 g:"Một vị Ngự sử là họ ngoại của {v} dâng sớ: phi tần ngoại tộc không nên ở ngôi cao, không nên tự nuôi hoàng tự, vì “lòng người khác giống khó lường”. Tờ sớ chưa nêu tên ngươi, nhưng cả triều biết nó nói về ai.",
 p:[["s1","s2"],["c1","c2"],["t1","t2"],["x1"]],
 B:{s1:{h:"Sớ đến sau ngày vui",w:"emp",if:RDW(1),t:"Hoàng thượng vừa cho ngươi giữ bàn thờ cố hương được mấy hôm thì tờ sớ đến. Ai cũng biết: kẻ thua trong hậu cung đã mượn tay triều đình.",o:[
  {n:"Xin Hoàng thượng cho đọc tờ sớ",sc:1,f:"know",wx:"biết từng lời người ta buộc ngươi",lx:"ngài cho là ngươi xen việc triều",rt:"Hoàng thượng đọc cho ngươi nghe từng điều người ta buộc, rồi gấp sớ lại, không nói gì.",rf:"Hoàng thượng gấp sớ: “Không phải việc của nàng.”"},
  {n:"Làm như chưa nghe",wx:"không tỏ ra nóng ruột",lx:"để người khác nói thay mình",rt:"Ngươi vẫn chép kinh, vẫn tưới hoa."},
  {n:"Gửi lễ tạ ơn Hoàng thượng đúng lúc này",wx:"ngài nhớ ơn chưa trả là ơn của ai",lx:"có kẻ bảo ngươi khéo nịnh",rt:"Hoàng thượng nhận lễ, cười: “Nàng chọn ngày khéo thật.”"}]},
 s2:{h:"Sớ đến khi ngươi đã yếu thế",w:"emp",if:RDW(0),t:"Tiếng tà thuật chưa nguôi thì tờ sớ đến. Triều thần không ai lên tiếng cho ngươi; có người còn thêm tên ký vào.",o:[
  {n:"Viết biểu tự trình bày, dâng riêng lên Hoàng thượng",sc:1,f:"plead",wx:"Hoàng thượng nghe được lời ngươi",lx:"phi tần viết biểu về việc triều là trái lệ",rt:"Hoàng thượng đọc tờ biểu ở Ngự thư phòng. Hôm sau ngài tự đem từng ý ra hỏi vị Ngự sử, không nhắc đến tên ngươi.",rf:"Hoàng thượng trả biểu về: hậu cung không được bàn lời của triều."},
  {n:"Nhờ sứ quán cố hương lên tiếng",sc:1,wx:"triều đình nhớ ngươi là tờ hòa ước",lx:"Đại Hy không thích người ngoài xen vào",rt:"Sứ quán gửi lời hỏi: “Đại Hy đối đãi công chúa nước ta thế nào?”",rf:"Hoàng thượng cau mày: “Nàng gọi người nước nàng đến dạy trẫm?”"},
  {n:"Lặng im chờ",wx:"không thêm cớ",lx:"tờ sớ đi một mình",rt:"Ngươi đóng cửa cung."}]},
 c1:{h:"Ngự sử là ai",w:"v",need:["v"],t:"Vị Ngự sử dâng sớ là họ ngoại của {v}. Năm ngoái hắn mua một tòa nhà ở kinh thành bằng số bạc không ai rõ từ đâu.",o:[
  {n:"Cho người dò nguồn bạc",sc:2,f:"dirt",wx:"có một lá bài trong tay",lx:"dò quan triều là chuyện lớn",rt:"Bạc mua nhà là bạc của một thương nhân buôn muối lậu.",rf:"Người đi dò bị bắt gặp."},
  {n:"Gặp {v}, hỏi thẳng nàng muốn gì",sc:1,wx:"nghe được điều thật",lx:"{v} cười trước mặt ngươi",go:(A,ok)=>{rdRel(A,"v",ok?8:-6)},rt:"{v} nói: “Ta muốn ngươi thôi được gọi là đặc biệt.”",rf:"{v} chỉ đáp: “Sớ của triều, ta biết gì đâu.”"},
  {n:"Bỏ qua người dâng sớ, chỉ nhìn tờ sớ",wx:"không sa vào đấu đá",lx:"người đứng sau vẫn yên",rt:"Ngươi nhờ người nhà dò lại từng điều trong sớ, nghĩ cách đáp."}]},
 c2:{h:"Liên danh trong hậu cung",w:"v",need:["v"],t:"{v} đi từng cung xin chữ ký: các phi tần cùng tâu rằng phi tần ngoại tộc không nên ngồi trên họ.",o:[
  {n:"Đến từng cung trước nàng",sc:1,wx:"nhiều người từ chối ký",lx:"chạy đôn đáo trông thật thảm",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Một nửa hậu cung đóng cửa với {v}.",rf:"Người ta đã ký trước khi ngươi đến."},
  {n:"Tặng quà các phi tần thấp phẩm",sc:1,wx:"có người đứng về phía ngươi",lx:"bị gọi là mua lòng người",rt:"Ba phi tần trả lại bút cho {v}."},
  {n:"Để nàng xin chữ ký",wx:"lòng không vướng",lx:"tờ liên danh dài thêm",rt:"Ngươi không đi đâu cả."}]},
 t1:{h:"Một lời của Đức Thọ cung",w:"th",need:["th"],t:"Thái hậu có thể nói một câu là tờ sớ chìm. Nhưng bà chưa nói, và bà đang chờ ngươi đến.",o:[
  {n:"Đến xin Thái hậu che chở",sc:2,f:"th",wx:"Thái hậu đứng sau ngươi",lx:"Thái hậu thấy ngươi chỉ biết dựa",rt:"Thái hậu nói: “Ai gia già rồi, nhưng chưa điếc.”",rf:"Thái hậu bảo: “Tự mình đứng trước đã.”"},
  {n:"Đến thỉnh an, không nhắc tờ sớ",sc:1,wx:"Thái hậu quý sự biết điều",lx:"bà không biết ngươi cần",rt:"Thái hậu giữ ngươi lại ăn cơm chay."},
  {n:"Không đến, tự lo",wx:"không nợ ai",lx:"Thái hậu cho là ngươi cứng đầu",rt:"Đức Thọ cung im lặng."}]},
 t2:{h:"Một lời của Hoàng thượng",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất. Trong cung chỉ còn một người nói một câu là tờ sớ chìm, và ngài chưa nói.",o:[
  {n:"Xin Hoàng thượng che chở",sc:2,f:"th",wx:"Hoàng thượng đứng sau ngươi",lx:"ngài thấy ngươi chỉ biết dựa",rt:"Hoàng thượng nói: “Sớ là của triều. Nàng là của trẫm.”",rf:"Hoàng thượng bảo: “Tự mình đứng trước đã.”"},
  {n:"Hầu ngài như thường, không nhắc tờ sớ",sc:1,wx:"ngài quý sự biết điều",lx:"ngài không biết ngươi cần",rt:"Hoàng thượng ở lại dùng bữa tối."},
  {n:"Không cầu, tự lo",wx:"không nợ ai",lx:"ngài cho là ngươi cứng đầu",rt:"Ngươi không nhắc gì."}]},
 x1:{h:"Đêm trước ngày phê sớ",w:"emp",t:"Triều thần ở tiền triều đã bàn tờ sớ suốt ba buổi. Đêm ấy Hoàng thượng đến cung ngươi, đặt bản chép tờ sớ lên án: “Mai trẫm phê. Nàng có gì muốn nói?”",o:[
  {n:"Đáp từng điều, xin ngài mang lời ấy ra triều",e:["win","lose"],rt:"Sáng hôm sau, Hoàng thượng đem từng lời ngươi đáp ra hỏi lại triều thần. Không ai đáp được, và ngài phê: “Bác.”",rf:"Hoàng thượng nghe xong, chỉ nói: “Lời của hậu cung, trẫm không đem ra triều được.”"},
  {n:"Đưa ra nguồn bạc của vị Ngự sử",e:["win","mid"],rt:"Vị Ngự sử bị tra. Tờ sớ của kẻ ăn bạc lậu không ai còn nhắc.",rf:"Ngự sử bị tra, nhưng tờ sớ vẫn nằm lại trên án."},
  {n:"Không nói, để ngài tự phê",e:["mid","lose"],rt:"Hoàng thượng gác tờ sớ lại, nói chuyện sau.",rf:"Một nửa triều thần tán thành tờ sớ."}]}},
 E:{win:{k:1,tag:"Tờ sớ bị bác",w:"emp",t:"Hoàng thượng bác tờ sớ trước triều. Từ nay trong cung, “người ngoại tộc” không còn là một lời buộc tội.",go:A=>{rdOan(A,"v",8);return ""}},
  mid:{k:0,tag:"Tờ sớ bị gác",t:"Tờ sớ không ai phê, cũng không ai bác. Nó nằm đó, chờ một ngày có người lấy ra."},
  lose:{k:-1,tag:"Triều thần nghi người ngoại tộc",t:"Tờ sớ không được chuẩn, nhưng nửa triều đã ký. Từ nay mỗi lần ngươi được thăng, sẽ có người nhắc lại nó."}}});

rdDef("nc_tuc",9,{t:"Học lễ Đại Hy",w:"th",sj:"lễ Phật đản ngươi được giao lo",cast(A){return rdCast(A,["v"])},
 g:"Lễ Phật đản năm nay, hậu cung cần một người đứng lo. Lần đầu tiên việc ấy được giao cho ngươi. Mọi nghi thức phải đúng phép Đại Hy, không sai một bước; còn giữ được gì của mình trong đó, tùy ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Việc lớn đến tay",w:"th",if:RDW(1),t:"Sau tờ sớ bị bác, cả triều nhìn ngươi. Việc lo lễ Phật đản được giao xuống như một phép thử: người ngoại tộc có giữ nổi lễ Đại Hy không.",o:[
  {n:"Xin một ma ma giáo tập kèm sát",f:"learn",wx:"không sót nghi thức nào",lx:"ma ma nói gì cũng phải theo",rt:"Ma ma giáo tập dọn sang ở hẳn cung ngươi."},
  {n:"Tự đọc sách lễ ba đêm liền",sc:1,f:"learn",wx:"thuộc lễ như người Đại Hy",lx:"đọc mà không ai giảng thì hiểu sai",rt:"Ngươi thuộc làu từng bước.",rf:"Có một chỗ ngươi hiểu ngược ý."},
  {n:"Xin Thái hậu chỉ dạy",need:["th"],sc:2,wx:"Thái hậu tự tay dạy",lx:"Thái hậu chê ngươi lười tự học",rt:"Thái hậu sai người mang sách lễ của chính bà sang.",rf:"Thái hậu bảo: “Việc giao cho ngươi, không phải cho ai gia.”"}]},
 s2:{h:"Việc không ai muốn",w:"maid",if:RDW(0),t:"Phi tần lo lễ Phật đản năm ngoái đã bị phạt vì sai nghi thức. Năm nay không ai nhận, và việc rơi vào tay ngươi, như một cái bẫy.",o:[
  {n:"Tìm người lo lễ năm ngoái hỏi chỗ sai",sc:1,f:"learn",wx:"biết chỗ hiểm",lx:"người ấy oán, chỉ sai đường",rt:"Nàng kể: năm ngoái sai thứ tự dâng hoa.",rf:"Nàng chỉ ngươi một chỗ sai khác."},
  {n:"Xin Nội vụ phủ cho người lo phụ",wx:"có người làm cùng",lx:"sai thì người ta vẫn đổ cho ngươi",rt:"Nội vụ phủ cử hai thái giám quen lễ."},
  {n:"Từ chối khéo",wx:"tránh bẫy",lx:"người ta bảo người ngoại tộc không dám nhận việc",rt:"Ngươi xin cáo bệnh, việc vẫn không ai nhận."}]},
 c1:{h:"Đèn hoa đăng cố hương",w:"maid",t:"Ở {land}, ngày Phật đản người ta {nden}. Lễ Đại Hy không có điều ấy. Chùa trong cung ở ngay bờ hồ Thái Dịch.",o:[
  {n:"Thêm lễ thắp đèn cố hương sau nghi thức chính",sc:1,f:"own",wx:"lễ có nét của ngươi",lx:"bị chê thêm thắt",rt:"Trăm ngọn đèn cố hương sáng lên bên hồ, ai đứng xem cũng lặng đi.",rf:"Lễ quan bảo thêm lễ là trái phép."},
  {n:"Thắp một ngọn đèn riêng sau khi xong lễ",f:"own",wx:"giữ được lòng mà không phạm lễ",lx:"chỉ mình ngươi biết",rt:"Một ngọn đèn nhỏ cháy suốt đêm bên hồ."},
  {n:"Bỏ ý ấy",f:"learn",wx:"lễ đúng từng ly",lx:"lễ là của người ta",rt:"Ngươi gạch dòng ấy khỏi giấy."}]},
 c2:{h:"Ai đổi thứ tự lễ",w:"v",need:["v"],t:"Hai ngày trước lễ, tờ ghi thứ tự nghi thức trong cung ngươi bị ai đó chép lại sai một bước. Cung nữ của {v} từng ghé qua.",o:[
  {n:"Đối chiếu với sách lễ Nội vụ phủ",sc:2,wx:"sửa kịp",lx:"mất cả ngày, việc khác chậm",rt:"Bước sai được sửa lại.",rf:"Sách lễ Nội vụ phủ cũng bị mượn đi."},
  {n:"Bắt cung nữ của {v} hỏi tội",sc:1,wx:"có kẻ nhận",lx:"trước ngày lễ mà làm ầm",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Cung nữ khai được sai chép lại tờ ấy.",rf:"Cung nữ chối, {v} kêu ngươi vu oan."},
  {n:"Giả như không biết, giữ bản thật bên mình",sc:1,wx:"để kẻ gian tưởng đã thành",lx:"nếu nhớ nhầm một bước thì không ai đỡ",rt:"Bản thật nằm trong tay áo ngươi."}]},
 t1:{h:"Ma ma giáo tập dặn",w:"maid",t:"Đêm trước lễ, ma ma giáo tập nói nhỏ: “Lễ Đại Hy không trọng người làm đúng nhất. Lễ trọng người làm đúng mà không ai thấy mình gồng.”",o:[
  {n:"Tập lại từng bước đến canh ba",sc:1,wx:"bước chân thành thói quen",lx:"sáng ra mắt thâm",rt:"Ngươi đi lại trong sân, đếm từng bước."},
  {n:"Ngủ sớm cho thần sắc tươi",wx:"sáng ra rạng rỡ",lx:"không tập thêm được bước nào",rt:"Ngươi ngủ một giấc dài."},
  {n:"Hỏi ma ma về lễ ở quê bà",sc:1,wx:"ma ma kể, và hiểu ngươi hơn",lx:"mất một canh giờ",rt:"Ma ma kể về lễ ở một làng xa, rồi cười: “Ai cũng có quê.”",rf:"Ma ma chỉ bảo ngươi đi ngủ."}]},
 x1:{h:"Ngày Phật đản",w:"th",need:["th"],t:"Chuông chùa trong cung vừa điểm. Thái hậu ngồi giữa, hậu cung xếp hai hàng. Mọi nghi thức trong tay ngươi.",o:[
  {n:"Làm đúng lễ, kết bằng đèn hoa trên hồ",e:["win","lose"],rt:"Đèn hoa trôi đến chân Thái hậu. Bà cúi xuống nhìn rất lâu, rồi nói: “Năm sau cũng làm thế.”",rf:"Một ngọn đèn lật, cháy lan tấm phướn, cả lễ rối loạn."},
  {n:"Làm đúng lễ từng ly, không thêm gì",e:["win","mid"],rt:"Thái hậu khen: “Không một bước sai. Người Đại Hy cũng ít ai làm được.”",rf:"Lễ trôi qua không lỗi, cũng không ai nhớ."},
  {n:"Nhường ma ma giáo tập đứng chủ lễ",e:"mid",lx:"công không phải của ngươi",rt:"Ma ma đứng chủ lễ, ngươi đứng sau."}]},
 x2:{h:"Ngày Phật đản",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất; năm nay Hoàng thượng đích thân đến chùa trong cung dâng hương cầu siêu cho bà. Mọi nghi thức trong tay ngươi.",o:[
  {n:"Làm đúng lễ, kết bằng đèn hoa trên hồ",e:["win","lose"],rt:"Hoàng thượng thả theo một ngọn đèn cho mẹ, đứng bên hồ đến khi đèn khuất.",rf:"Một ngọn đèn lật, cháy lan tấm phướn, cả lễ rối loạn."},
  {n:"Làm đúng lễ từng ly, không thêm gì",e:["win","mid"],rt:"Hoàng thượng gật đầu: “Thái hậu ở trên trời cũng vừa lòng.”",rf:"Lễ trôi qua không lỗi, cũng không ai nhớ."},
  {n:"Nhường ma ma giáo tập đứng chủ lễ",e:"mid",lx:"công không phải của ngươi",rt:"Ma ma đứng chủ lễ, ngươi đứng sau."}]}},
 E:{win:{k:1,tag:"Lễ Đại Hy, đèn cố hương",w:"th",t:"Lễ Phật đản năm ấy được chép vào sổ Nội vụ phủ như một lễ mẫu. Người ngoại tộc giữ lễ Đại Hy giỏi hơn người Đại Hy, và còn để lại một ngọn đèn của mình."},
  mid:{k:0,tag:"Lễ tròn, người lặng",t:"Lễ không lỗi. Ngươi học được lễ Đại Hy, nhưng chưa ai coi đó là công của ngươi."},
  lose:{k:-1,tag:"Lễ Phật đản rối loạn",t:"Lễ rối, phướn cháy. Người ta không nhớ những bước ngươi làm đúng, chỉ nhớ lửa và tiếng kêu."}}});

rdDef("nc_tuc",10,{t:"Nghĩa nữ nhà ai",w:"th",sj:"việc nhập ngươi vào tông phả một nhà Đại Hy",cast(A){return rdCast(A,["v"])},
 g:"Một ân điển được đưa ra: nhận ngươi làm nghĩa nữ của một nhà thế gia Đại Hy, ghi tên vào tông phả. Từ đó ngươi không còn là người ngoại tộc trên giấy, và không ai còn lấy chữ ấy ra cản đường ngươi. Nhưng tên {land} của ngươi sẽ không còn ai gọi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1","x2"]],
 B:{s1:{h:"Ân điển sau ngày lễ",w:"th",if:RDW(1),t:"Lễ Phật đản xong, người ta đồn ngươi sắp được thưởng một điều lớn. Hôm nay tin đến: một nhà Hầu tước Đại Hy xin nhận ngươi làm nghĩa nữ.",o:[
  {n:"Hỏi rõ nhà Hầu tước là nhà nào",sc:1,f:"know",wx:"biết mình sắp nợ ai",lx:"tỏ ra nghi ngờ ân điển",rt:"Nhà Hầu tước đang cần một người trong cung nói giúp.",rf:"Người được hỏi chỉ đáp chung chung."},
  {n:"Tạ ơn trước, nghĩ sau",wx:"người ban ân thấy ngươi biết ơn",lx:"lời tạ ơn đã như lời nhận",rt:"Ngươi quỳ tạ ơn."},
  {n:"Xin thời gian viết thư hỏi {mh}",f:"home",wx:"giữ đạo làm con",lx:"có người bảo ngươi còn nhìn về cố quốc",rt:"Thư đi, ngươi đếm từng ngày."}]},
 s2:{h:"Con đường để lên",w:"th",if:RDW(0),t:"Sau những lần bị chê, có người nói thẳng với ngươi: muốn lên ngôi cao thì bỏ cái họ ngoại tộc. Một nhà Hầu tước Đại Hy sẵn lòng nhận ngươi làm nghĩa nữ.",o:[
  {n:"Tìm hiểu nhà ấy muốn gì",sc:1,f:"know",wx:"biết cái giá của ân điển",lx:"tỏ ra nghi ngờ",rt:"Nhà Hầu tước muốn một con gái trong cung làm chỗ dựa.",rf:"Người được hỏi chỉ đáp chung chung."},
  {n:"Nói thẳng: ta không bỏ họ",f:"home",wx:"lòng rõ ràng",lx:"cửa lên ngôi cao hẹp lại",rt:"Người đưa lời lặng lẽ lui ra."},
  {n:"Gật đầu, xin được biết thêm",f:"yes",wx:"có thêm đường lên",lx:"lời gật đầu bay nhanh hơn ngươi nghĩ",rt:"Ngay hôm sau, cả cung đã biết."}]},
 c1:{h:"Sứ quán cố hương phản đối",w:"maid",t:"Sứ giả {land} ở kinh, một người họ hàng bên mẹ, được Hoàng thượng cho vào nội điện bái kiến ngươi trong buổi gia lễ, như người nhà, và nói ngay: “Công chúa của {pv} thành con gái nhà người ta, thì hòa ước kia là hòa ước với ai?”",o:[
  {n:"Hứa với sứ giả sẽ giữ họ",f:"home",wx:"cố quốc yên lòng",lx:"lời hứa thành dây buộc",rt:"Sứ giả cúi đầu, mắt đỏ hoe."},
  {n:"Giảng cho sứ giả lợi của việc này",sc:1,f:"yes",wx:"sứ giả hiểu ngươi lên cao thì cố quốc cũng lợi",lx:"sứ giả viết thư về nước trách ngươi",rt:"Sứ giả nghĩ lâu, rồi nói: “Thần sẽ tâu lại như thế.”",rf:"Sứ giả đứng dậy không chào."},
  {n:"Cáo bệnh, không tiếp người họ hàng",wx:"không để ai nắm lời",lx:"cố quốc cho là ngươi quên gốc",rt:"Sứ giả đứng ngoài cửa đến tối rồi về."}]},
 c2:{h:"{v} cũng muốn ân điển ấy",w:"v",need:["v"],t:"{v} biết chuyện, cho người nhà đến nhà Hầu tước trước: nhà nàng cũng có con gái trong cung, và không mang họ ngoại tộc.",o:[
  {n:"Để mặc nàng tranh",wx:"không giành giật",lx:"có thể mất ân điển",rt:"Ngươi chỉ cười."},
  {n:"Tặng nhà Hầu tước lễ hậu",sc:1,f:"yes",wx:"nhà Hầu tước giữ lời với ngươi",lx:"tốn bạc mà vẫn thua",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Nhà Hầu tước trả lời {v}: đã có người.",rf:"Nhà Hầu tước nhận lễ của cả hai."},
  {n:"Tâu với Đức Thọ cung chuyện {v} chen ngang",need:["th"],sc:1,wx:"{v} bị quở",lx:"Thái hậu chán chuyện tranh giành",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Thái hậu sai người nhắn {v}: ân điển không phải chợ.",rf:"Thái hậu bảo: “Hai đứa tự lo.”"}]},
 t1:{h:"Thư {mh}",w:"maid",t:"Thư của {mh} về đến, chữ run hơn mọi lần: “Mẹ già rồi. Con ở đó được thương là mẹ vui. Nhưng nếu mẹ mất, con còn được để tang mẹ không?”",o:[
  {n:"Khóc một đêm, viết thư hứa giữ họ",sc:1,f:"home",wx:"mẹ yên lòng",lx:"cửa ân điển khép lại một nửa",rt:"Ngươi viết đến sáng."},
  {n:"Thư rằng con nhận ân điển, nhưng lòng không đổi",sc:1,f:"both",wx:"mẹ hiểu",lx:"mẹ không đáp lại",rt:"Mẹ hồi âm: “Tên là của người ta gọi. Lòng là của con.”",rf:"Thư không có hồi âm."},
  {n:"Không hồi âm",f:"yes",wx:"không để lòng lay",lx:"mẹ chờ mãi một lá thư",rt:"Ngươi gấp thư mẹ, cất đi."}]},
 x1:{h:"Đức Thọ cung chờ câu trả lời",w:"th",need:["th"],t:"Thái hậu cho gọi ngươi. Tờ tông phả nhà Hầu tước đặt trên án, mực còn ướt, chỉ chờ một chữ ký.",o:[
  {n:"Xin nhận ân điển mà giữ tên cố hương làm tên chữ",e:["win","lose"],rt:"Thái hậu cười: “Hai cái tên thì hai nhà cùng thương. Được.”",rf:"Thái hậu đặt bút xuống: “Đã nhận thì nhận cho trọn, không thì thôi.”"},
  {n:"Ký tên, nhận làm con nhà Đại Hy",e:["mid","lose"],rt:"Mực khô. Từ nay trên giấy ngươi là con gái nhà Hầu tước.",rf:"Ngươi ký, nhưng sứ giả cố quốc dâng thư phản đối lên triều."},
  {n:"Quỳ tạ, xin giữ nguyên họ cũ",e:["win","lose"],rt:"Thái hậu im rất lâu, rồi nói: “Giữ được gốc mới là người đáng nể.”",rf:"Thái hậu gấp tờ tông phả lại: “Ân điển, ai gia không ban hai lần.”"}]},
 x2:{h:"Hoàng thượng chờ câu trả lời",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất, ân điển do Hoàng thượng ban xuống. Tờ tông phả nhà Hầu tước đặt trên án Dưỡng Tâm điện, chỉ chờ một chữ ký.",o:[
  {n:"Xin nhận ân điển mà giữ tên cố hương làm tên chữ",e:["win","lose"],rt:"Hoàng thượng cười: “Trẫm gọi tên nào, nàng cũng thưa.”",rf:"Hoàng thượng chau mày: “Nàng muốn cả hai sao?”"},
  {n:"Ký tên, nhận làm con nhà Đại Hy",e:["mid","lose"],rt:"Mực khô. Từ nay trên giấy ngươi là con gái nhà Hầu tước.",rf:"Ngươi ký, nhưng sứ giả cố quốc dâng thư phản đối lên triều."},
  {n:"Quỳ tạ, xin giữ nguyên họ cũ",e:["win","lose"],rt:"Hoàng thượng gật đầu: “Trẫm cưới công chúa nước ấy, không cưới con nhà ai.”",rf:"Hoàng thượng phẩy tay: “Tùy nàng.”"}]}},
 E:{win:{k:1,tag:"Hai tên một lòng",w:"th",t:"Ngươi giữ được tên mình, mà Đại Hy vẫn mở cửa cho ngươi. Sứ quán cố hương gửi thư tạ, nhà thế gia Đại Hy gửi lễ mừng."},
  mid:{k:0,tag:"Con gái nhà Hầu tước",t:"Trên giấy, ngươi không còn là người ngoại tộc; triều thần thôi lấy chữ ấy ra cản ngươi, nhưng thư cố hương về thưa hẳn."},
  lose:{k:-1,tag:"Ân điển hóa dây buộc",t:"Ân điển hỏng giữa chừng: Đại Hy cho là ngươi cứng đầu, cố quốc cho là ngươi dao động. Hai bên đều nhìn ngươi bằng nửa con mắt."}}});

rdDef("nc_tuc",11,{t:"Hai nửa một người",w:"th",sj:"việc ngươi là ai trong mắt Đại Hy",cast(A){return rdCast(A,["v"])},
 g:"Tiết Vạn thọ năm nay, Hoàng thượng tiếp sứ thần bốn phương ở tiền triều, có cả sứ đoàn {land}. Sau đó nội cung mở gia yến cho hậu cung; sứ đoàn không vào, chỉ có quà của sứ đoàn được đưa vào. Ngươi đứng giữa: hậu cung Đại Hy nhìn ngươi, cố quốc cũng nhìn ngươi. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Ghế trong gia yến",w:"th",if:RDW(1),t:"Sau việc tông phả, Nội vụ phủ xếp ghế ngươi ngay dưới hàng phi tần cao phẩm trong gia yến. Hoàng thượng còn cho sứ thần già của {land}, họ hàng bên mẹ ngươi, vào nội điện bái kiến ngươi trong buổi gia lễ trước yến.",o:[
  {n:"Tiếp sứ thần già cách rèm như người nhà",sc:1,f:"home",wx:"sứ đoàn vui mừng",lx:"có kẻ bảo ngươi chưa vào yến đã chạy về phe nhà",rt:"Sứ thần già quỳ xuống, gọi ngươi bằng tên thuở nhỏ.",rf:"Thái giám Nội vụ phủ ngồi suốt buổi, ghi từng lời."},
  {n:"Chỉ gửi lời hỏi thăm qua thái giám",f:"dh",wx:"giữ đúng lễ",lx:"sứ đoàn thấy ngươi xa cách",rt:"Sứ thần già nhận lời hỏi thăm, gửi lại một câu chúc."},
  {n:"Chuẩn bị một món quà cho hai bên",sc:1,f:"both",wx:"quà vừa lòng cả hai bên",lx:"tốn bạc",rt:"Hộp trà Đại Hy gửi ra sứ quán, khăn thêu cố hương cho các phi tần."}]},
 s2:{h:"Ghế ngồi cuối hàng",w:"maid",if:RDW(0),t:"Ghế của ngươi trong gia yến bị xếp cuối hàng, cạnh cửa gió. Tin ấy lọt ra sứ quán, và sứ đoàn cố quốc hỏi nhau công chúa nước mình ở Đại Hy được đối đãi ra sao.",o:[
  {n:"Xin Nội vụ phủ đổi chỗ",sc:1,wx:"được ngồi đúng phẩm",lx:"bị cho là đòi hỏi",rt:"Ghế ngươi được dời lên ba bậc.",rf:"Nội vụ phủ nói chỗ đã định."},
  {n:"Ngồi yên, giữ mặt tươi",f:"dh",wx:"không ai bắt lỗi được",lx:"sứ đoàn nghe tin công chúa mình bị coi nhẹ",rt:"Ngươi ngồi thẳng lưng suốt yến."},
  {n:"Sai thái giám mang trà ra sứ quán",sc:1,f:"home",wx:"sứ đoàn biết ngươi vẫn nhớ",lx:"có người tâu ngươi đưa tin cho sứ",rt:"Sứ thần nhận trà, nhắn lại: “Thần đã yên lòng.”",rf:"Thái giám bị chặn ở cửa cung hỏi."}]},
 c1:{h:"{v} đặt một câu hỏi",w:"v",need:["v"],t:"Giữa yến, {v} cười hỏi to: “Tỷ tỷ nói xem, nếu Đại Hy với nước tỷ có chiến sự, tỷ cầu cho bên nào thắng?”",o:[
  {n:"Đáp: cầu cho không có chiến sự",sc:2,wx:"cả yến gật gù",lx:"lời đáp nghe như né",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng thượng khẽ gật đầu trước tiên.",rf:"{v} cười: “Tỷ khéo né thật.”"},
  {n:"Đáp: thiếp là người của Hoàng thượng",f:"dh",wx:"Hoàng thượng nghe vừa lòng",lx:"câu ấy ra đến sứ quán, sứ đoàn cố quốc cúi mặt",rt:"Hoàng thượng nâng chén về phía ngươi."},
  {n:"Hỏi lại {v}: muội cầu cho nhà muội hay cho Hoàng thượng",sc:1,wx:"{v} cứng họng",lx:"thành ra cãi nhau giữa yến",go:A=>{rdOan(A,"v",8)},rt:"{v} đỏ mặt, cúi xuống chén rượu.",rf:"Lễ quan phải ho lên một tiếng."}]},
 c2:{h:"Sứ đoàn mang quà của {mh}",w:"maid",t:"Quà của sứ đoàn được đưa vào cung ngươi, trong đó có một rương của {mh}: áo cố hương, hạt giống hoa quê nhà, và một bức thư xin cho ngươi về thăm mẹ một lần.",o:[
  {n:"Dâng thư lên Hoàng thượng xin về thăm",sc:1,f:"home",wx:"Hoàng thượng thấy lòng hiếu",lx:"Hoàng thượng sợ ngươi đi không về",rt:"Hoàng thượng nói: “Đợi xuân sang, trẫm cho người hộ tống.”",rf:"Hoàng thượng im lặng, gấp thư lại."},
  {n:"Gieo hạt giống ở vườn cung",f:"both",wx:"một góc quê nở hoa trong cung",lx:"hoa lạ, có kẻ bảo xấu điềm",rt:"Mùa sau, vườn cung có một khóm hoa không ai biết tên."},
  {n:"Gửi lại quà, thư rằng con ở yên",f:"dh",wx:"Đại Hy yên lòng",lx:"mẹ buồn",rt:"Rương quà theo sứ đoàn quay về."}]},
 t1:{h:"Lời hỏi sau cùng",w:"th",need:["th"],t:"Tan yến, Thái hậu giữ ngươi lại: “Ngươi ở Đại Hy đã lâu. Nay ai gia hỏi lần cuối: ngươi là người nước nào?”",o:[
  {n:"Thưa: là con dâu Đại Hy, con gái {land}",sc:2,f:"both",wx:"Thái hậu hiểu ngươi là cả hai",lx:"Thái hậu chê ngươi tham",rt:"Thái hậu cười, lần đầu tiên gọi tên ngươi.",rf:"Thái hậu bảo: “Một người chỉ đứng được một chỗ.”"},
  {n:"Thưa: là người Đại Hy",f:"dh",wx:"Thái hậu vừa lòng",lx:"trong lòng có tiếng gì vỡ",rt:"Thái hậu gật đầu."},
  {n:"Thưa: là con gái của {mh}",sc:1,f:"home",wx:"Thái hậu nể sự thật lòng",lx:"Thái hậu cho là ngươi chưa chịu thuộc về đâu",rt:"Thái hậu nhìn ngươi rất lâu: “Ai gia cũng từng là con gái của một người mẹ.”",rf:"Thái hậu quay mặt đi."}]},
 t2:{h:"Lời hỏi sau cùng",w:"emp",if:()=>S.thDead,t:"Tan yến, Hoàng thượng giữ ngươi lại: “Nàng ở Đại Hy đã lâu. Trẫm hỏi một lần: nàng là người nước nào?”",o:[
  {n:"Thưa: là con dâu Đại Hy, con gái {land}",sc:2,f:"both",wx:"ngài hiểu ngươi là cả hai",lx:"ngài chê ngươi tham",rt:"Hoàng thượng cười, gọi ngươi bằng tên thuở nhỏ.",rf:"Hoàng thượng bảo: “Một người chỉ đứng được một chỗ.”"},
  {n:"Thưa: là người Đại Hy",f:"dh",wx:"ngài vừa lòng",lx:"trong lòng có tiếng gì vỡ",rt:"Hoàng thượng gật đầu."},
  {n:"Thưa: là con gái của {mh}",sc:1,f:"home",wx:"ngài nể sự thật lòng",lx:"ngài cho là ngươi chưa chịu thuộc về đâu",rt:"Hoàng thượng nhìn ngươi rất lâu: “Trẫm cũng có mẹ.”",rf:"Hoàng thượng quay mặt đi."}]},
 x1:{h:"Lời phán của Đức Thọ cung",w:"th",need:["th"],t:"Trước khi gia yến tan, Thái hậu cho đánh chuông, nói trước cả hậu cung: bà sẽ nói một lời về người ngoại tộc trong cung, và lời ấy thành lệ.",o:[
  {n:"Quỳ xin Thái hậu cho giữ phong tục cố hương trong cung mình",e:["win","lose"],rt:"Thái hậu phán: “Người đến từ xa, giữ được gốc mà vẫn thờ Đại Hy, là phúc của Đại Hy.”",rf:"Thái hậu phán: “Vào nhà ai thì theo lệ nhà ấy.”"},
  {n:"Quỳ tạ, nguyện theo lệ Đại Hy trọn đời",e:["mid","lose"],rt:"Thái hậu phán: “Từ nay trong cung không ai được gọi nó là người ngoài.”",rf:"Thái hậu chỉ gật đầu, không phán gì."},
  {n:"Xin cho đọc tờ tạ ơn của sứ đoàn cùng lời ngươi",e:["win","lose"],rt:"Thái giám đọc tờ tạ ơn sứ đoàn gửi vào, rồi đến lời ngươi. Thái hậu cười: “Hai nước cùng tạ một lời, ai gia nhận.”",rf:"Lễ quan tâu: tờ của sứ ngoại quốc phải qua Lễ bộ, không đọc trong gia yến."}]},
 x2:{h:"Lời phán của Hoàng thượng",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất. Trước khi gia yến tan, Hoàng thượng nâng chén nói trước cả hậu cung: ngài sẽ nói một lời về người ngoại tộc trong cung, và lời ấy thành lệ.",o:[
  {n:"Quỳ xin Hoàng thượng cho giữ phong tục cố hương trong cung mình",e:["win","lose"],rt:"Hoàng thượng phán: “Hậu cung của trẫm rộng đủ cho hai phong tục.”",rf:"Hoàng thượng phán: “Vào nhà ai thì theo lệ nhà ấy.”"},
  {n:"Quỳ tạ, nguyện theo lệ Đại Hy trọn đời",e:["mid","lose"],rt:"Hoàng thượng phán: “Từ nay trong cung không ai được gọi nàng là người ngoài.”",rf:"Hoàng thượng chỉ gật đầu, không phán gì."},
  {n:"Xin cho đọc tờ tạ ơn của sứ đoàn cùng lời ngươi",e:["win","lose"],rt:"Thái giám đọc tờ tạ ơn sứ đoàn gửi vào, rồi đến lời ngươi. Hoàng thượng cười: “Hai nước cùng tạ một lời, trẫm nhận.”",rf:"Lễ quan tâu: tờ của sứ ngoại quốc phải qua Lễ bộ, không đọc trong gia yến."}]}},
 E:{win:{k:1,tag:"Được chấp nhận như chính mình",w:"th",t:"Ngươi không phải bỏ gì để được nhận. Áo cố hương, bàn thờ tổ tiên, tên thuở nhỏ, tất cả đều có chỗ trong cung Đại Hy, và cả hai nước đều gọi ngươi là người của mình."},
  mid:{k:0,tag:"Thành người Đại Hy",t:"Ngươi được nhận, bằng cách thành người Đại Hy trọn vẹn. Không ai gọi ngươi là người ngoài nữa, và ngươi cũng ít khi nhớ mình từng là ai."},
  lose:{k:-1,tag:"Mãi là người ngoài",t:"Sau bao năm, ngươi vẫn là người ngoại tộc trong mắt cung Đại Hy. Ngươi vẫn là phi tần của Hoàng thượng, nhưng mỗi lần ngươi bước vào, có người khẽ nghiêng đầu thì thầm.",go:A=>{rdOan(A,"v",4);return ""}}}});
RD97L.push(rdRare({a:"nc_tuc_11",tag:"Lễ cố hương vào lịch cung",w:"emp",n:"Xin cho cả hậu cung cùng đón Tết cố hương một lần",
 path:["Tự đến Nội vụ phủ xin định lệ","Xin Nội vụ phủ cho mặc áo bản quốc","Chép tên lá và cách nấu","Tự mở bàn thờ","Xin Thái hậu đến xem bàn thờ","Thắp một ngọn đèn riêng","Thêm lễ thắp đèn","Xin nhận ân điển mà giữ tên cố hương","Gieo hạt giống","Thưa: là con dâu Đại Hy"],
 bad:["Nhét hình nhân trả về","Cho người kể khắp nơi","Không hồi âm"],x:[()=>S.danh>=RR("nc_tuc_11").bar,"Danh từ "+RR("nc_tuc_11").bar],
 t:"Hoàng thượng chuẩn lời ngươi. Tết cố hương năm ấy, cả hậu cung mặc áo {land}, ăn món {land}, thắp đèn cố hương bên hồ Thái Dịch. Ngài sai Lễ bộ chép ngày ấy vào lịch lễ nội cung, mỗi năm một lần, “để người đi xa có một ngày được về nhà mà không phải rời cung”.",
 rw:"nt_haiduong",ti:"Người mang cố hương vào cung"}));
/* ---------- nc_vuong · Ngai vàng cố quốc ---------- */
/* BAL.road.nc_vuong = {} (no chapter constants: the deadlines are told in text, costs inline as in jrd_tt) */
/* Played after nc_vuong (.4: win = {pa} crowned, win2 = {pb} crowned, mid = Đại Hy stood out, lose = backed the loser) AND after bd_hoang
   (.4: win = the elders chose, win2 = {pa} crowned, mid = throne settled without her, lose = both brothers resent her). Chapter .5 opens with
   NCW/BDW; .6–.11 open with RDW and never say WHO sits on the throne: «tân {quan}» (the new ruler) and «phe thua ngôi» (the side that lost). */
rdDef("nc_vuong",5,{t:"Ấn sách phong",w:"emp",sj:"ấn sách phong cho tân {quan}",cast(A){return rdCast(A,["v"])},
 g:"Ngôi ở {land} đã có chủ, nhưng chưa có ấn sách phong của Đại Hy thì chủ ấy chưa vững. Lễ bộ còn chần chừ, phe thua ngôi lén gửi người sang xin Đại Hy đừng phong. Một lời của ngươi nặng hơn ngươi tưởng.",
 p:[["s1","s2","s3","s4","s5"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Quốc thư của tân {quan}",w:"emp",if:()=>NCW(1)()&&rdPrev()!=="r97",t:"Phe ngươi khuyên đã thắng. Quốc thư của tân {quan} đến, lời lẽ cung kính, xin Đại Hy sớm ban ấn sách phong, và xin ngươi nói giúp một lời.",o:[
  {n:"Tâu xin Hoàng thượng phong sớm",sc:1,f:"fast",wx:"cố quốc biết ơn ngươi",lx:"ngài cho là ngươi lo cho nước mình trước",rt:"Hoàng thượng gật đầu: “Trẫm đã hứa thì giữ.”",rf:"Hoàng thượng đáp: “Việc của Lễ bộ.”"},
  {n:"Khuyên tân {quan} dâng thêm cống phẩm",f:"loyal",wx:"Lễ bộ dễ nói hơn",lx:"cố quốc tốn kém, có người trách ngươi",rt:"Thư khuyên đi trong đêm."},
  {n:"Chờ Lễ bộ tự xét",wx:"không ai nói ngươi xen việc nước",lx:"cố quốc chờ mòn mỏi",rt:"Ngươi gấp quốc thư cất vào hộp."}]},
 s5:{h:"Ngai ngươi đã từ",w:"emp",if:()=>NCW(1)()&&rdPrev()==="r97",t:"Ngươi đã chọn ở lại Đại Hy. Các trưởng lão rước một người trong tông thất lên ngôi; tân {quan} biết ngai ấy từng được dâng cho ngươi, nên quốc thư gửi sang vừa cung kính vừa dè chừng, xin Đại Hy sớm ban ấn sách phong.",o:[
  {n:"Tâu xin Hoàng thượng phong sớm",sc:1,f:"fast",wx:"tân {quan} thôi dè chừng ngươi",lx:"ngài cho là ngươi lo cho nước mình trước",rt:"Hoàng thượng gật đầu: “Nàng đã từ ngai, trẫm tin lời nàng.”",rf:"Hoàng thượng đáp: “Việc của Lễ bộ.”"},
  {n:"Viết thư cho tân {quan}: ngai là của người",f:"loyal",wx:"tân {quan} yên lòng",lx:"các trưởng lão buồn vì ngươi dứt khoát",rt:"Thư đi trong đêm, có ấn riêng của ngươi."},
  {n:"Chờ Lễ bộ tự xét",wx:"không ai nói ngươi xen việc nước",lx:"cố quốc chờ mòn mỏi",rt:"Ngươi gấp quốc thư cất vào hộp."}]},
 s2:{h:"Quốc thư không nhắc tên ngươi",w:"maid",if:NCW(0),t:"Ngôi đã có chủ, nhưng không nhờ lời ngươi. Quốc thư của tân {quan} gửi Đại Hy không nhắc một chữ đến ngươi, và sứ giả đi ngang cửa cung ngươi không ghé.",o:[
  {n:"Gửi thư mừng tân {quan}",sc:1,f:"mercy",wx:"cố quốc nhớ ra còn ngươi",lx:"thư mừng bị gửi trả",rt:"Sứ giả quay lại, cúi đầu nhận thư.",rf:"Thư mừng nằm lại ở sứ quán, không ai mở."},
  {n:"Sai thái giám ra sứ quán hỏi chuyện",sc:1,f:"know",wx:"biết tân {quan} nghĩ gì về ngươi",lx:"sứ giả từ chối",rt:"Thái giám về kể, sứ giả nói thật: tân {quan} chưa biết nên tin ngươi hay sợ ngươi.",rf:"Sứ giả cáo bận."},
  {n:"Để mặc cố quốc",wx:"không cầu cạnh ai",lx:"cố quốc quên ngươi thêm một chút",rt:"Ngươi không hỏi đến."}]},
 s3:{h:"Mười con ngựa quý",w:"emp",if:BDW(1),t:"Như lời ngươi tâu, trướng vàng {land} đã có chủ và Đại Hy đứng sau. Tân {quan} gửi tặng mười con ngựa quý, xin Đại Hy sớm ban ấn sách phong để các bộ lạc thôi xì xào.",o:[
  {n:"Dâng cả mười con ngựa lên Hoàng thượng",f:"loyal",wx:"ngài thấy ngươi không giữ riêng",lx:"tân {quan} hỏi sao quà của mình lại vào chuồng ngựa vua",rt:"Hoàng thượng chọn một con, cưỡi thử quanh Ngự uyển."},
  {n:"Xin Hoàng thượng phong cho sớm",sc:1,f:"fast",wx:"cố quốc biết ơn ngươi",lx:"ngài cho là ngươi lo cho nước mình trước",rt:"Hoàng thượng gật đầu.",rf:"Hoàng thượng đáp: “Việc của Lễ bộ.”"},
  {n:"Giữ ngựa, chờ Lễ bộ",wx:"có thêm của",lx:"có người bảo ngươi nhận quà riêng",rt:"Mười con ngựa vào tàu ngựa cung ngươi."}]},
 s4:{h:"Sứ giả không ghé",w:"maid",if:BDW(0),t:"Ngôi {quan} đã có chủ, nhưng chủ mới không nhớ ơn ngươi; thư nhà về mỗi lúc một thưa. Nay sứ của tân {quan} đến xin ấn sách phong, đi thẳng vào Lễ bộ, không ghé cung ngươi.",o:[
  {n:"Sai người mang trà sữa ra sứ quán",sc:1,f:"mercy",wx:"sứ giả nhớ ra còn ngươi",lx:"trà bị trả về",rt:"Sứ giả uống cạn, nhờ người nhắn lời cảm tạ.",rf:"Trà nguội trên bàn sứ quán."},
  {n:"Dò xem tân {quan} cần gì ở Đại Hy",sc:1,f:"know",wx:"biết lá bài trong tay mình",lx:"người đi dò bị đuổi",rt:"Tân {quan} cần ấn sách phong trước mùa hội các bộ lạc.",rf:"Không ai chịu nói."},
  {n:"Không hỏi đến",wx:"không cầu cạnh ai",lx:"cố quốc quên ngươi thêm một chút",rt:"Ngươi đóng cửa cung."}]},
 c1:{h:"Sứ phe thua ngôi",w:"maid",t:"Một thái giám lo việc mua bán ngoài cung lén mang vào cung ngươi một rương vàng và lá thư của phe thua ngôi, xin Đại Hy hoãn ấn sách phong.",o:[
  {n:"Nhận vàng, hứa nói giúp",f:"loser",go:()=>{RD_FL("nc_vuong.loser",1)},wx:"giàu thêm; phe thua nhớ lời hứa",lx:"lộ ra thì cả hai nước đều trách; về sau khó trở mặt với phe thua",rt:"Rương vàng được khiêng vào kho trong đêm."},
  {n:"Bắt hắn nộp Hoàng thượng",sc:1,f:"loyal",wx:"ngài thấy ngươi một lòng",lx:"phe thua ngôi coi ngươi là kẻ thù",rt:"Thái giám bị trói giải đến Thận hình ty, khai ra kẻ gửi vàng; Hoàng thượng đọc lời khai.",rf:"Hắn kịp nhắn ra ngoài; phe thua ngôi kể khắp nơi rằng ngươi bán đứng người cùng nước."},
  {n:"Trả vàng, đọc hết lá thư",f:"know",wx:"biết phe thua còn bao nhiêu sức",lx:"phe thua kể khắp nơi rằng ngươi đã đọc thư",rt:"Thư viết rõ: phe thua ngôi còn ba vạn quân ở biên, và không định buông."}]},
 c2:{h:"Lễ bộ chần chừ",w:"v",need:["v"],t:"Thị lang Lễ bộ giữ việc sách phong là anh họ của {v}. Hắn để hồ sơ nằm yên, chờ xem cung ngươi trả giá gì.",o:[
  {n:"Biếu Thị lang một phần lễ",sc:1,f:"fast",wx:"hồ sơ chạy",lx:"lộ ra thì tiếng ngươi đút lót",rt:"Ba ngày sau, hồ sơ đã lên đến Hoàng thượng.",rf:"Hắn nhận lễ, hồ sơ vẫn nằm im."},
  {n:"Nhờ Hoàng thượng hỏi đến",sc:1,f:"fast",wx:"Lễ bộ phải làm",lx:"ngài phiền vì việc nhỏ",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Hoàng thượng hỏi một câu, Thị lang toát mồ hôi.",rf:"Hoàng thượng bảo: “Để họ làm.”"},
  {n:"Gặp {v} dàn xếp",sc:1,wx:"hai nhà bớt một mối",lx:"{v} nắm thóp ngươi",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} nói: “Anh ta chỉ muốn được nhớ tên.”",rf:"{v} cười: “Ngươi cũng biết cầu người à?”"}]},
 t1:{h:"Thư của {mh}",w:"maid",t:"{mh} viết: “Trong cung còn nhiều người chưa phục. Ấn đến sớm một ngày là bớt một ngày máu chảy. Nhưng con đừng để người ta nói con bán nước mình lấy ơn.”",o:[
  {n:"Hứa với mẹ sẽ giục cho sớm",f:"fast",wx:"mẹ yên lòng",lx:"lời hứa thành gánh",rt:"Ngươi viết thư hứa, tay run."},
  {n:"Xin mẹ khuyên tân {quan} tha phe thua",sc:1,f:"mercy",wx:"mở một đường hòa",lx:"mẹ sợ, không dám nói",rt:"Mẹ hồi âm: “Mẹ sẽ nói. Nghe hay không là việc của người ta.”",rf:"Thư không có hồi âm."},
  {n:"Thưa mẹ: việc Đại Hy, con không xen",wx:"Hoàng thượng biết ngươi giữ phận",lx:"mẹ buồn",rt:"Ngươi gấp thư mẹ lại."}]},
 x1:{h:"Ngày bàn sách phong",w:"emp",t:"Đêm ấy Hoàng thượng đến cung ngươi, mang theo tờ sớ Lễ bộ xin hoãn ấn sách phong: “Nàng là người {land}. Trẫm phong hay chưa?”",o:[
  {n:"Khuyên phong ngay, kèm lệ cống mới",e:["win","lose"],rt:"Hoàng thượng đóng dấu. Ấn sách phong lên đường cùng lệ cống mới, và tân {quan} gửi thư tạ cả Đại Hy lẫn ngươi.",rf:"Lễ bộ tâu ngươi thiên vị; Hoàng thượng gác lại ấn."},
  {n:"Khuyên phong, buộc tân {quan} tha phe thua",e:["win","mid"],rt:"Hoàng thượng viết thêm một dòng vào sắc: phong, và không được giết người cùng tông.",rf:"Hoàng thượng chưa quyết, bảo đợi xem phe thua có buông không."},
  {n:"Thưa: việc nước, thiếp không dám nói",e:"mid",lx:"cố quốc chờ thêm",rt:"Hoàng thượng gật đầu, tự xét."}]}},
 E:{win:{k:1,tag:"Ấn sách phong đã trao",w:"emp",t:"Tân {quan} nhận ấn sách phong của Đại Hy. Từ nay ai ở {land} cũng biết: lời người công chúa ở Đại Hy có sức nặng.",go:()=>e67bien(4)},
  mid:{k:0,tag:"Sách phong còn chờ",t:"Ấn chưa trao. Tân {quan} ngồi ngôi mà chưa vững, phe thua ngôi chưa chịu buông."},
  lose:{k:-1,tag:"Đại Hy hoãn phong",t:"Ấn bị gác. Ở {land} người ta đồn công chúa bên Đại Hy không nói được lời nào, hoặc không muốn nói.",go:()=>e67bien(-3)}}});

rdDef("nc_vuong",6,{t:"Triều đình chia phe",w:"emp",sj:"việc Đại Hy đối đãi với cố quốc",cast(A){return rdCast(A,["v"])},
 g:"{land} vừa qua cơn tranh ngôi, còn yếu. Trong triều Đại Hy, Binh bộ muốn nhân lúc ấy đòi lại hai trấn biên, Lễ bộ muốn giữ hòa. Nhà {v} đứng sau Binh bộ, và ngươi bị kẹt ở giữa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Binh bộ đòi giá",w:"emp",if:RDW(1),t:"Ấn sách phong vừa trao, Binh bộ đã dâng sớ: Đại Hy đã giúp {land} yên ngôi, nay {land} phải trả bằng hai trấn biên.",o:[
  {n:"Nhắc Hoàng thượng lời hứa trong sắc phong",sc:1,f:"peace",wx:"ngài nhớ chữ tín",lx:"ngài không thích bị nhắc",rt:"Hoàng thượng nói: “Trẫm chưa quên.”",rf:"Hoàng thượng phẩy tay."},
  {n:"Viết thư báo tân {quan} chuẩn bị",f:"warn",wx:"cố quốc không bị bất ngờ, kịp tính đường đổi chợ",lx:"lộ ra thì thành đưa tin cho nước ngoài",rt:"Thư đi theo đường thương nhân."},
  {n:"Im lặng chờ ngài phán",wx:"không bị bắt lỗi",lx:"Binh bộ nói một mình",rt:"Ngươi không nói gì."}]},
 s2:{h:"Binh bộ thấy dịp tốt",w:"emp",if:RDW(0),t:"Đại Hy còn chưa trao ấn, Binh bộ đã dâng sớ: {land} đang rối, đây là lúc lấy lại hai trấn biên mà tiền triều đánh mất.",o:[
  {n:"Xin Hoàng thượng trao ấn trước, bàn đất sau",sc:1,f:"peace",wx:"cố quốc có chỗ dựa",lx:"ngài thấy ngươi nóng ruột",rt:"Hoàng thượng cho trao ấn, giữ việc đất lại bàn sau.",rf:"Hoàng thượng bảo hai việc là một."},
  {n:"Viết thư báo tân {quan} chuẩn bị",f:"warn",wx:"cố quốc không bị bất ngờ, kịp tính đường đổi chợ",lx:"lộ ra thì thành đưa tin cho nước ngoài",rt:"Thư đi theo đường thương nhân."},
  {n:"Nhờ phu nhân Thượng thư Lễ bộ chuyển lời",if:NC_MPOK,sc:1,f:"peace",wx:"Lễ bộ có thêm lý lẽ",lx:"phi tần nhắn lời ra triều, dễ bị nói",rt:()=>`Phu nhân vào cung thỉnh an ${NC_MP()}, ghé cung ngươi trên đường về; về nhà kể lại, Thượng thư Lễ bộ nói thay ngươi trong triều.`,rf:"Phu nhân cáo bệnh không vào."}]},
 c1:{h:"Thượng thư Binh bộ",w:"v",need:["v"],t:"Thượng thư Binh bộ là thông gia của nhà {v}. Nếu Đại Hy động binh, một người anh họ của {v} sẽ cầm quân lấy công, và nhà {v} sẽ lên một bậc.",o:[
  {n:"Thưa với Hoàng thượng: Binh bộ cầu công riêng",sc:1,f:"peace",wx:"Hoàng thượng thấy rõ",lx:"thành ra ngươi đối đầu một Thượng thư",go:(A,ok)=>{rdOan(A,"v",ok?10:6)},rt:"Hoàng thượng sai một vị Ngự sử xét chuyện ấy; hôm sau Ngự sử nhắc nó trong triều.",rf:"Người ta bảo ngươi vu cho trọng thần."},
  {n:"Gặp {v}, đề nghị một con đường khác cho nhà nàng",sc:1,wx:"nhà {v} bớt hăng",lx:"{v} cho là ngươi sợ",go:(A,ok)=>{rdRel(A,"v",ok?10:-5)},rt:"{v} nghe đến chức tuần biên không đổ máu, mắt sáng lên.",rf:"{v} cười: “Nhà ta không cần ngươi lo.”"},
  {n:"Để mặc Binh bộ",wx:"không gây thù với trọng thần",lx:"Binh bộ mạnh thêm",rt:"Ngươi không động đến."}]},
 c2:{h:"Hộ bộ tính sổ",w:"emp",t:"Hộ bộ tâu: một trận ở biên tốn bằng ba năm thuế hai trấn ấy. Họ cần một người biết rõ lương thảo {land} để tính.",o:[
  {n:"Kể với Hoàng thượng sản vật, đường sá {land}",sc:1,f:"peace",wx:"con số nói thay ngươi",lx:"có người bảo ngươi đưa tin của nước mình cho Đại Hy",rt:"Hoàng thượng sai Hộ bộ tính theo lời ngươi. Hộ bộ dâng sớ: đánh thì lỗ."},
  {n:"Thưa với Hoàng thượng: đổi đất lấy chợ biên",sc:1,f:"trade",wx:"một lối thứ ba",lx:"cả hai phe đều chê",rt:"Hoàng thượng đem ý ấy hỏi Hộ bộ. Hộ bộ thích: thuế chợ còn lâu hơn thuế đất.",rf:"Hoàng thượng nghe, rồi gác lại."},
  {n:"Không xen",wx:"không dính",lx:"Hộ bộ tự tính sai",rt:"Ngươi không nói gì."}]},
 t1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Đêm khuya, Hoàng thượng hỏi: “Nếu Đại Hy lấy hai trấn ấy, nàng có oán trẫm không?”",o:[
  {n:"Thưa: thiếp oán người làm ngài thất tín",sc:1,f:"peace",wx:"ngài nghe ra ý",lx:"ngài cho là ngươi dạy ngài",rt:"Hoàng thượng cười: “Nàng mắng khéo thật.”",rf:"Hoàng thượng quay mặt đi."},
  {n:"Thưa: thiếp là người của Đại Hy",wx:"ngài yên lòng",lx:"ngài nghĩ ngươi sẽ không cản",rt:"Hoàng thượng kéo chăn đắp cho ngươi."},
  {n:"Thưa: nếu đổi được chợ biên thì không ai phải oán",sc:1,f:"trade",wx:"ngài nghĩ lại",lx:"ngài chưa tin",rt:"Hoàng thượng ngồi dậy, bảo ngươi nói tiếp.",rf:"Hoàng thượng bảo: “Đàn bà biết gì chợ biên.”"}]},
 x1:{h:"Tờ giấy trắng",w:"emp",t:"Ở tiền triều, triều thần chia hai phe rõ rệt. Hoàng thượng chưa phê, chỉ sai thái giám mang đến cung ngươi một tờ giấy trắng: “Nàng viết đi.”",o:[
  {n:"Viết kế đổi đất lấy chợ biên",e:["win","lose"],rt:"Hoàng thượng chép lại kế ấy bằng tay mình, đọc trước triều. Binh bộ không còn lời, Hộ bộ gật gù, và {land} nhận chợ biên thay vì mất đất.",rf:"Binh bộ cười: “Kế của người {land}, lợi cho {land}.”"},
  {n:"Viết hai chữ: giữ tín",e:["win","mid"],rt:"Hoàng thượng phê: giữ hòa ước như cũ.",rf:"Hoàng thượng hoãn việc đất, nhưng không bác hẳn."},
  {n:"Trả tờ giấy trắng",e:["mid","lose"],rt:"Hoàng thượng hiểu ngươi không muốn xen, tự gác việc lại.",rf:"Binh bộ được thế, sớ đòi đất được chuẩn."}]}},
 E:{win:{k:1,tag:"Hòa ước được giữ",w:"emp",t:"Biên ải yên. Binh bộ mất một dịp lập công, và nhà {v} nhớ điều đó. Ở {land}, người ta kể lại rằng công chúa bên Đại Hy đã giữ đất cho nước.",go:A=>{e67bien(3);rdOan(A,"v",6);return ""}},
  mid:{k:0,tag:"Hai trấn biên còn treo",t:"Việc đất bị hoãn. Hai trấn biên vẫn là của {land}, nhưng tờ sớ Binh bộ vẫn nằm trên án."},
  lose:{k:-1,tag:"Binh bộ thắng thế",t:"Đại Hy đòi hai trấn biên. {land} phải nhượng, và ở cố quốc có người nói công chúa bên ấy đã ngồi im nhìn nước mình mất đất.",go:()=>e67bien(-4)}}});

rdDef("nc_vuong",7,{t:"Thư cầu cứu của mẹ",w:"maid",sj:"thư cầu cứu của {mh}",cast(A){return rdCast(A,["v"])},
 g:"Phe thua ngôi dấy binh ở biên {land}. {mh} kẹt lại trong một tòa thành cũ, lương cạn, thuốc hết. Thư bà viết: đường qua đèo chỉ còn đi được đến cuối tháng này; sang tháng, đèo đóng, không ai vào được nữa.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tin dữ giữa lúc yên",w:"maid",if:RDW(1),t:"Biên ải vừa yên được ít ngày thì tin dữ đến: phe thua ngôi dấy binh lần nữa, và {mh} kẹt trong thành cũ đúng lúc vây kín.",o:[
  {n:"Đếm lại bạc riêng trong cung",f:"silver",wx:"biết mình có bao nhiêu",lx:"đếm xong mới thấy không đủ",rt:"Rương bạc riêng của ngươi vơi quá nửa."},
  {n:"Xin vào gặp Hoàng thượng ngay đêm nay",sc:1,f:"court",wx:"ngài biết sớm",lx:"ngài đang bận, thấy phiền",rt:"Hoàng thượng nghe hết, hứa nghĩ cách.",rf:"Thái giám bảo ngài đã nghỉ."},
  {n:"Hỏi thương nhân {land} ở kinh",f:"silver",wx:"có một đường đưa lương",lx:"thương nhân đòi giá cao",rt:"Thương nhân nói: có đường, có giá."}]},
 s2:{h:"Tin dữ dồn tin dữ",w:"maid",if:RDW(0),t:"Đại Hy đang ép {land} nhượng đất, thì phe thua ngôi lại dấy binh. {mh} viết thư bằng nét chữ run: bà kẹt trong thành cũ, không biết còn trụ được bao lâu.",o:[
  {n:"Khóc một đêm, sáng ra tính việc",wx:"lòng định lại",lx:"mất một đêm quý",rt:"Sáng ra ngươi rửa mặt, gọi cung nữ thân tín."},
  {n:"Xin Nội vụ phủ ứng trước bổng lộc",f:"silver",wx:"có thêm bạc",lx:"kỳ bổng tới bị khấu, cả cung biết ngươi túng",go:()=>{S.cutPay=Math.max(S.cutPay||0,1);S.cutBy="Nội vụ phủ (ứng trước)";return ""},rt:"Nội vụ phủ ứng bạc, ghi khoản khấu vào sổ bổng."},
  {n:"Xin Thái hậu một lời",need:["th"],sc:1,f:"court",wx:"Thái hậu nói giúp",lx:"Thái hậu không muốn xen việc nước người",rt:"Thái hậu nói: “Mẹ ai cũng là mẹ.”",rf:"Thái hậu lần chuỗi hạt, không đáp."}]},
 c1:{h:"Tiền chở lương trước ngày đèo đóng",w:"maid",t:"Thương nhân {land} ở kinh nhận chở lương thuốc vào thành, đòi một khoản lớn trả trước, đi trước ngày đèo đóng. Quá ngày ấy, có bạc cũng không đi được.",o:[
  {n:"Bỏ bạc riêng trả đủ",sc:2,f:"silver",wx:"đoàn lương lên đường ngay",lx:"kho riêng cạn",rt:"Đoàn lương xuất kinh lúc trời chưa sáng."},
  {n:"Xin Hoàng thượng cho quân biên hộ tống đoàn lương",sc:2,f:"court",wx:"không tốn bạc, có quân đi kèm",lx:"ngài cho là ngươi đem quân Đại Hy làm việc nhà",rt:"Hoàng thượng phê: quân biên mở đường cho đoàn lương.",rf:"Hoàng thượng bảo: quân không phải để chở gạo."},
  {n:"Trả nửa trước, hứa nửa sau",sc:1,f:"silver",wx:"đỡ tốn",lx:"thương nhân đi chậm, chờ nửa kia",rt:"Thương nhân gật đầu.",rf:"Thương nhân đi được nửa đường thì dừng lại chờ bạc."}]},
 c2:{h:"Đoàn lương bị giữ ở ải",w:"v",need:["v"],t:"Đoàn lương đến ải thì bị giữ lại. Viên quan tra hàng ở ải là người nhà {v}; hắn nói trong lương có hàng cấm.",o:[
  {n:"Xin Hoàng thượng một đạo khẩu dụ cho ải",sc:1,wx:"đoàn lương đi tiếp",lx:"ngài thấy ngươi đem việc ải vào hậu cung",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Khẩu dụ đến ải, viên quan mở cổng.",rf:"Hoàng thượng bảo: việc ải để Binh bộ xét."},
  {n:"Đến cầu {v}",sc:1,wx:"{v} nhắn người nhà thả",lx:"{v} kể khắp nơi ngươi phải cầu nàng",go:(A,ok)=>{rdRel(A,"v",ok?8:-4)},rt:"{v} lặng đi: “Mẹ ta cũng già rồi.”",rf:"{v} cười: “Lệ ải là lệ ải.”"},
  {n:"Cho đoàn lương vòng đường núi",sc:1,wx:"tránh được ải",lx:"đường núi chậm, có thể không kịp",rt:"Đoàn lương lặng lẽ vòng qua.",rf:"Đường núi lở, đoàn lương mất ba ngày."}]},
 t1:{h:"Thư của tân {quan}",w:"emp",t:"Tân {quan} viết: sẽ đem quân giải vây cho {mh}, nhưng xin Đại Hy cho mượn đường qua một khúc biên, vì đường trong nước đã bị phe thua chặn.",o:[
  {n:"Trình thư lên Hoàng thượng",sc:1,f:"court",wx:"ngài thấy ngươi không giấu",lx:"Binh bộ sẽ bảo mượn đường là cớ",rt:"Hoàng thượng đọc, bảo Binh bộ bàn.",rf:"Hoàng thượng bảo: “Cho mượn đường, rồi ai trả đường?”"},
  {n:"Đáp tân {quan}: đừng chờ Đại Hy",wx:"cố quốc tự lo",lx:"tân {quan} cho là ngươi không giúp",rt:"Thư đi trong đêm."},
  {n:"Giữ thư, tự lo đường lương",f:"silver",wx:"không kéo Đại Hy vào",lx:"một mình gánh",rt:"Ngươi cất thư."}]},
 x1:{h:"Trước ngày đèo đóng",w:"emp",t:"Chỉ còn ba ngày là đèo đóng. Tin cuối từ thành cũ: lương chỉ đủ mười ngày nữa.",o:[
  {n:"Thúc đoàn lương vượt đèo ngay",e:["win","lose"],rt:"Đoàn lương qua đèo đêm cuối cùng trước khi đường đóng. Tháng sau, thư mẹ đến: “Mẹ còn sống.”",rf:"Đoàn lương bị phe thua chặn ở chân đèo."},
  {n:"Quỳ xin Hoàng thượng cho quân biên đón mẹ về ải",e:["win","mid"],rt:"Một toán kỵ binh Đại Hy phá vòng vây, đón {mh} về ải.",rf:"Quân biên chỉ đưa được lương đến chân thành, không đón được người."},
  {n:"Viết thư xin tân {quan} lo",e:["mid","lose"],rt:"Tân {quan} gửi một cánh quân đến giữ thành qua mùa đông.",rf:"Thư đến muộn. Thành cũ mở cổng."}]}},
 E:{win:{k:1,tag:"Mẹ ngươi bình an",w:"maid",t:"{mh} qua được mùa đông. Ở {land} người ta kể: công chúa bên Đại Hy đã cứu mẹ mình khi cả nước còn đang loạn."},
  mid:{k:0,tag:"Mẹ ngươi cầm cự qua đông",t:"Thành cũ còn đứng, mẹ ngươi còn sống, nhưng vòng vây chưa giải. Mỗi lá thư về là một lần ngươi thở ra."},
  lose:{k:-1,tag:"Mẹ ngươi rơi vào tay phe nổi loạn",t:"Thành cũ mở cổng. {mh} bị phe thua ngôi giữ làm con tin, và chúng gửi lời: Đại Hy động một ngón tay, bà không còn."}}});

rdDef("nc_vuong",8,{t:"Binh Đại Hy xuất ải",w:"emp",sj:"việc Đại Hy xuất quân",cast(A){return rdCast(A,["v"])},
 g:"Phe thua ngôi chiếm ba thành biên của {land}, sát ải Đại Hy. Tân {quan} xin viện binh. Binh bộ muốn đi, Hộ bộ không muốn tốn, và Hoàng thượng chờ một lời của người hiểu {land} nhất trong cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Mẹ đã an, giặc chưa yên",w:"emp",if:RDW(1),t:"{mh} đã an, nhưng phe thua ngôi càng mạnh. Chúng tung tin ở biên rằng công chúa bên Đại Hy xui Đại Hy diệt người cùng giống.",o:[
  {n:"Viết thư cho các trưởng làng biên",sc:1,f:"split",wx:"dân biên nghe lời ngươi",lx:"thư bị giặc thu",rt:"Mấy làng biên đóng cổng với quân phe thua.",rf:"Thư rơi vào tay giặc, chúng đọc to trước quân."},
  {n:"Mặc tin đồn",wx:"không thêm lời",lx:"tin đồn mạnh lên",rt:"Ngươi không đáp."},
  {n:"Xin Hoàng thượng ban chiếu an dân biên",sc:1,wx:"dân biên yên lòng",lx:"ngài bảo việc ấy chưa đến lúc",rt:"Chiếu an dân được dán khắp ải.",rf:"Hoàng thượng gạt đi."}]},
 s2:{h:"Lời dọa từ biên ải",w:"maid",if:RDW(0),t:()=>(rdPrev()==="lose"?"{mh} đã ở trong tay phe thua ngôi.":"Thành cũ của {mh} vẫn bị vây.")+" Người của phe thua ngôi nhắn: Đại Hy xuất quân thì người thân của ngươi không sống. Ngươi không biết đó là lời dọa thật hay lời dọa suông.",o:[
  {n:"Cho người dò thật hư lời dọa",sc:1,f:"split",wx:"biết thật hư",lx:"người đi dò không về",rt:"Người đi dò về: người thân của ngươi còn sống, chúng cần giữ họ để mặc cả.",rf:"Người đi dò mất tích."},
  {n:"Xin Hoàng thượng chậm binh",sc:1,wx:"có thêm thời gian",lx:"ngài thấy ngươi đặt nhà mình trên Đại Hy",rt:"Hoàng thượng cho hoãn mười ngày.",rf:"Hoàng thượng nói: “Trẫm không vì một người mà để giặc sát ải.”"},
  {n:"Nuốt nước mắt, không xin gì",wx:"Hoàng thượng thấy ngươi hiểu đại sự",lx:"lòng đau",rt:"Ngươi lạy, không nói."}]},
 c1:{h:"Ai cầm quân",w:"v",need:["v"],t:"Binh bộ tiến cử anh họ của {v} làm tướng xuất ải. Một lão tướng giữ biên hai mươi năm cũng xin đi.",o:[
  {n:"Nói giúp lão tướng giữ biên",sc:1,f:"old",wx:"người hiểu đất cầm quân",lx:"nhà {v} mất dịp lập công, oán ngươi",go:A=>{rdOan(A,"v",8)},rt:"Hoàng thượng chọn lão tướng.",rf:"Binh bộ vẫn giữ người của mình."},
  {n:"Để Binh bộ chọn",wx:"không gây thù",lx:"người cầm quân không biết đường núi",rt:"Anh họ của {v} nhận ấn tướng."},
  {n:"Dâng bản vẽ đường núi cho người cầm quân",sc:2,f:"map",wx:"ai cầm quân cũng không lạc",lx:"có người hỏi sao ngươi vẽ được đường núi nước mình",rt:"Ngươi vẽ ba đêm, từ trí nhớ thuở nhỏ."}]},
 c2:{h:"Hộ bộ đòi lương",w:"emp",t:"Hộ bộ tâu: muốn xuất quân phải có lương cho ba tháng. Kho biên chỉ đủ một tháng rưỡi.",o:[
  {n:"Xin tân {quan} góp lương cho quân Đại Hy",sc:1,f:"ally",wx:"có lương, Hộ bộ thôi cản việc xuất quân",lx:"tân {quan} cho là bị ép",rt:"Tân {quan} gửi sang năm nghìn thạch lương.",rf:"Tân {quan} chỉ hứa suông."},
  {n:"Góp bạc riêng vào lương quân",sc:1,wx:"cả triều thấy ngươi bỏ của",lx:"kho riêng vơi",rt:"Hộ bộ ghi tên ngươi vào sổ góp lương."},
  {n:"Khuyên đánh nhanh, ít lương",sc:1,wx:"bớt tốn",lx:"đánh nhanh thì dễ vội",rt:"Hoàng thượng nghe, cho Binh bộ tính lại.",rf:"Binh bộ cười chê."}]},
 t1:{h:"Mật thư từ thành giặc",w:"maid",t:"Một mật thư lọt qua ải, viết bằng chữ {land}: mấy viên tướng bên phe thua ngôi muốn hàng, nếu được tha tội và giữ đất.",o:[
  {n:"Giữ mật thư, dùng khi cần",sc:1,f:"split",wx:"cầm một lá bài lớn",lx:"giữ thư của giặc là chuyện nguy",rt:"Ngươi khâu mật thư vào lót áo."},
  {n:"Trình mật thư lên Hoàng thượng",sc:1,f:"split",wx:"ngài có thêm đường",lx:"ngài hỏi sao thư lại đến tay ngươi",rt:"Hoàng thượng đọc xong, gõ nhẹ lên án: “Hay.”",rf:"Hoàng thượng nghi ngươi có đường dây với giặc."},
  {n:"Đốt đi",wx:"không dính gì",lx:"mất một đường hòa",rt:"Mật thư cháy trong lò."}]},
 x1:{h:"Hoàng thượng quyết",w:"emp",t:"Hoàng thượng mang bản đồ biên ải sang cung ngươi, trải lên án: “Đánh, không đánh, hay đánh cách nào. Nàng nói.”",o:[
  {n:"Khuyên xuất quân giúp tân {quan} lấy lại ba thành",e:["win","lose"],rt:"Hoàng thượng hạ chỉ xuất quân. Quân Đại Hy theo đường núi, lấy lại ba thành trong một tháng.",rf:"Quân Đại Hy đi vội, bị kẹt ở hẻm núi."},
  {n:"Khuyên chiêu hàng trước, đánh sau",e:["win","mid"],rt:"Hai viên tướng giặc mở cổng thành hàng. Quân Đại Hy vào thành không mất một mũi tên.",rf:"Chiêu hàng không thành, quân Đại Hy dừng ở ải."},
  {n:"Khuyên giữ ải, không vượt",e:"mid",lx:"tân {quan} tự đánh một mình",rt:"Quân Đại Hy đóng ở ải, chờ."}]}},
 E:{win:{k:1,tag:"Viện binh đúng lúc",w:"emp",t:"Ba thành biên về lại tay tân {quan}. Đại Hy được tiếng giữ chữ tín, và lời ngươi nói với Hoàng thượng đêm ấy được truyền khắp Binh bộ.",go:()=>e67bien(5)},
  mid:{k:0,tag:"Đại Hy giữ ải",t:"Quân Đại Hy đứng ở ải. Không mất người, không được công. Chiến sự ở {land} còn kéo dài."},
  lose:{k:-1,tag:"Xuất quân vội vàng",t:"Quân Đại Hy sa vào hẻm núi, mất nhiều người. Ở kinh, người ta bắt đầu hỏi ai đã khuyên xuất quân.",go:()=>e67bien(-3)}}});

rdDef("nc_vuong",9,{t:"Tin bại trận",w:"emp",sj:"trận thua ở hẻm núi biên ải",cast(A){return rdCast(A,["v"])},
 g:"Tin từ biên: một cánh quân bị phục ở hẻm núi, mất gần nửa. Triều đình cần một người để đổ lỗi, và cái tên dễ nhất là người {land} trong cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thắng rồi lại thua",w:"emp",if:RDW(1),t:"Ba thành vừa lấy lại thì một cánh quân đuổi giặc sâu vào hẻm núi và bị phục. Có người nhắc: chính ngươi đã khuyên đánh, và trong cung không ai hiểu đường núi {land} bằng ngươi.",o:[
  {n:"Xin xem quân báo",sc:1,f:"wit",wx:"biết cánh quân ấy đi đường nào",lx:"ngài bảo phi tần không xem quân báo",rt:"Cánh quân bị phục đã đi con đường ngươi không vẽ.",rf:"Thái giám từ chối đưa."},
  {n:"Đóng cửa cung chờ tra",wx:"không bị bắt lỗi thêm",lx:"người ta bảo ngươi chột dạ",rt:"Cửa cung khép."},
  {n:"Viếng vong linh quân sĩ",wx:"triều thấy lòng ngươi",lx:"có kẻ bảo ngươi khóc mướn",rt:"Ngươi dâng hương ở chùa trong cung cho quân sĩ tử trận."}]},
 s2:{h:"Thua trên thua",w:"emp",if:RDW(0),t:"Chiến sự ở {land} kéo dài, và một cánh quân biên Đại Hy lạc vào hẻm núi bị giết gần hết. Lời đồn đến trước quân báo: có kẻ dẫn đường cho giặc.",o:[
  {n:"Xin xem quân báo",sc:1,f:"wit",wx:"biết rõ chuyện",lx:"ngài bảo phi tần không xem quân báo",rt:"Quân báo ghi: cánh quân ấy trái lệnh, tự đuổi vào hẻm.",rf:"Thái giám từ chối đưa."},
  {n:"Tự đến Dưỡng Tâm điện quỳ chờ",sc:1,wx:"ngài thấy ngươi không trốn",lx:"quỳ cả ngày mà không được gặp",rt:"Hoàng thượng cho gọi vào.",rf:"Ngươi quỳ đến tối."},
  {n:"Im lặng",wx:"không thêm lời",lx:"lời đồn tự lớn",rt:"Ngươi không nói gì."}]},
 c1:{h:"Ngự sử hặc ngươi",w:"emp",t:"Ngự sử dâng sớ: phi tần người {land} can dự binh sự, khiến quân Đại Hy chết oan. Xin xét tội.",o:[
  {n:"Viết biểu tự trình, dâng riêng lên Hoàng thượng",sc:1,f:"plead",wx:"Hoàng thượng nghe lời ngươi",lx:"phi tần viết biểu về việc binh là trái lệ",rt:"Hoàng thượng đọc tờ biểu ở Ngự thư phòng. Hôm sau ngài tự đem từng ý ra hỏi vị Ngự sử, không nhắc đến tên ngươi.",rf:"Hoàng thượng trả biểu về: hậu cung không bàn việc binh."},
  {n:"Nhờ phu nhân Thượng thư Lễ bộ chuyển lời",if:NC_MPOK,sc:1,wx:"có tiếng nói trong triều",lx:"người ta bảo ngươi kết bè ngoài triều",rt:()=>`Phu nhân vào cung thỉnh an ${NC_MP()}, ghé cung ngươi trên đường về. Hôm sau Thượng thư Lễ bộ nói trong triều: việc binh là của Binh bộ.`,rf:"Phu nhân cáo bệnh không vào."},
  {n:"Chịu tiếng, không đáp",wx:"không thêm sóng",lx:"tờ sớ đi một mình",rt:"Ngươi không đáp."}]},
 c2:{h:"{v} nói ngươi là gian tế",w:"v",need:["v"],t:"{v} khóc trước Hoàng thượng: “Kẻ dẫn đường cho giặc biết hẻm núi ấy. Trong cung này, ai biết đường núi {land} rõ hơn nàng ta?”",o:[
  {n:"Hỏi lại: ai cầm cánh quân ấy",sc:1,f:"wit",wx:"câu hỏi chạm đúng chỗ đau",lx:"thành ra hai cung đấu nhau trước vua",go:A=>{rdOan(A,"v",10)},rt:"{v} tái mặt. Hoàng thượng nhíu mày nhìn nàng.",rf:"{v} khóc to hơn."},
  {n:"Quỳ xin Hoàng thượng tra cung ngươi",sc:1,wx:"tỏ ra không sợ",lx:"cung ngươi bị lật tung",rt:"Tra ba ngày, không có gì.",rf:"Tra ra bản vẽ đường núi cũ của ngươi."},
  {n:"Đến tìm {v} nói riêng",sc:1,wx:"{v} lùi một bước",lx:"{v} càng hăng",go:(A,ok)=>{rdRel(A,"v",ok?8:-8)},rt:"{v} nói nhỏ: “Anh ta là anh ta. Ta cũng chỉ muốn giữ nhà.”",rf:"{v} đóng cửa."}]},
 t1:{h:"Người lính sống sót",w:"maid",t:"Một người lính sống sót được đưa về kinh dưỡng thương. Cung nữ của ngươi nghe được hắn kể: viên Phó tướng cầm cánh quân ấy ham công, trái lệnh đuổi sâu vào hẻm. Phó tướng ấy là anh họ của {v}.",o:[
  {n:"Cho người ghi lời hắn, có người làm chứng",sc:2,f:"wit",wx:"có lời khai",lx:"tốn bạc, lời lính thường nhẹ",rt:"Lời khai có chữ điểm chỉ của hắn và hai người cùng trại."},
  {n:"Xin Hoàng thượng cho đưa hắn đến Binh bộ khai",sc:1,wx:"lời khai thành công văn",lx:"Binh bộ là nhà của người bị khai",rt:"Hoàng thượng chuẩn. Một viên Lang trung ngay thẳng ghi lời.",rf:"Người lính bị đưa đi chỗ khác."},
  {n:"Để yên cho hắn dưỡng thương",wx:"không đẩy người vào chỗ nguy",lx:"mất một lời chứng",rt:"Ngươi gửi cho hắn một gói thuốc."}]},
 x1:{h:"Hoàng thượng triệu ngươi",w:"emp",t:"Hoàng thượng triệu ngươi đến Dưỡng Tâm điện. Tờ sớ hặc và quân báo đặt cạnh nhau trên án. Ngài hỏi: “Nàng có gì để nói?”",o:[
  {n:"Trình lời khai của người lính",e:["win","lose"],rt:"Hoàng thượng đọc xong, sai tra Phó tướng trái lệnh. Tờ sớ hặc ngươi bị trả về.",rf:"Lời một tên lính không địch được tờ sớ của Ngự sử."},
  {n:"Xin tự cấm túc chờ tra xét",e:["win","mid"],rt:"Hoàng thượng không cho cấm túc: “Người có tội không tự đóng cửa như thế.”",rf:()=>`Ngươi bị cấm túc ${NCCW("vuong")} tháng; tra xong không ra tội, nhưng cũng không ai xin lỗi.`,go:(A,ok)=>{if(!ok)ncConfine("vuong");return ""}},
  {n:"Quỳ nhận lỗi đã khuyên việc binh",e:"mid",lx:"mang tiếng nhận tội thay",rt:"Hoàng thượng thở dài, cho lui."}]}},
 E:{win:{k:1,tag:"Rửa tiếng gian tế",w:"emp",t:"Phó tướng trái lệnh bị cách chức. Nhà {v} mất mặt, và cả triều biết: người {land} trong cung không bán Đại Hy.",go:A=>{rdOan(A,"v",10);return ""}},
  mid:{k:0,tag:"Tiếng xấu chìm xuống",t:"Không ai kết tội ngươi, cũng không ai rửa cho ngươi. Tiếng gian tế chìm xuống, chờ ngày nổi lên."},
  lose:{k:-1,tag:"Bị nghi gian tế",t:"Hoàng thượng không kết tội, nhưng thôi bàn việc biên với ngươi. Thư nhà của ngươi, từ nay, qua tay Nội vụ phủ trước khi đến tay ngươi."}}});

rdDef("nc_vuong",10,{t:"Lời quyết",w:"emp",sj:"lời quyết của ngươi về cố quốc",cast(A){return rdCast(A,["v"])},
 g:"Phe thua ngôi sai sứ xin giảng hòa: chia đôi {land}, mỗi bên một nửa. Tân {quan} xin Đại Hy giúp dẹp hẳn. Hoàng thượng nói: lần này trẫm nghe nàng, và chỉ nghe một lần.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ thù xin gặp",w:"maid",if:RDW(1),t:"Tiếng ngươi đã sạch, ai cũng biết lời ngươi là lời thật. Sứ phe thua ngôi là một người họ hàng của ngươi; hắn xin Hoàng thượng cho vào nội điện bái kiến ngươi trong buổi gia lễ, như người nhà.",o:[
  {n:"Tiếp sứ có thái giám Nội vụ phủ đứng bên",f:"know",wx:"nghe được mà không bị nghi",lx:"sứ nói ít hơn khi có người lạ",rt:"Sứ trình điều kiện, thái giám ghi từng chữ."},
  {n:"Từ chối gặp",wx:"Hoàng thượng thấy ngươi giữ phận",lx:"không biết phe thua thật muốn gì",rt:"Sứ đứng ngoài cửa cung một lúc rồi đi."},
  {n:"Nhận thư riêng hắn gửi qua thái giám",sc:1,f:"know",wx:"biết điều sứ không nói trước triều",lx:"lộ ra thì lại tiếng gian tế",rt:"Sứ thú thật: phe thua đã cạn lương, chỉ cần một lối lui có thể diện.",rf:"Có kẻ thấy thái giám mang thư vào cung ngươi."}]},
 s2:{h:"Lời ngươi nhẹ đi",w:"emp",if:RDW(0),t:"Tiếng gian tế chưa sạch, lời ngươi nhẹ đi trong triều. Nhưng Hoàng thượng vẫn cho gọi, vì không ai hiểu {land} hơn ngươi.",o:[
  {n:"Xin Hoàng thượng kể lại lời sứ hai bên",sc:1,f:"know",wx:"nghe công khai, không ai nghi",lx:"ngài bảo ngươi đòi nhiều",rt:"Đêm ấy Hoàng thượng kể lại từng lời sứ hai bên, không sót.",rf:"Hoàng thượng bảo: “Việc tiếp sứ, nàng chớ bận lòng.”"},
  {n:"Thưa: thiếp chỉ nói khi ngài hỏi",wx:"không ai bắt lỗi",lx:"biết ít hơn",rt:"Ngươi cúi đầu."},
  {n:"Gửi thư hỏi {mh}",f:"peace",wx:"nghe lời người trong cuộc",lx:"thư qua tay Nội vụ phủ",rt:"Thư đi, mất nửa tháng mới về."}]},
 c1:{h:"Điều kiện của phe thua ngôi",w:"maid",t:"Sứ phe thua ngôi đưa thêm một điều riêng cho ngươi: nếu ngươi nói giúp, họ thả hết người thân của ngươi đang bị giữ, và dâng ngươi một trang ấp ở biên.",o:[
  {n:"Đòi thả người trước, rồi mới nói",sc:1,f:"hard",wx:"người thân về trước",lx:"sứ bảo ngươi mặc cả như lái buôn",rt:"Ba ngày sau, tin về: phe thua đã thả mấy người thân của ngươi.",rf:"Sứ bỏ về."},
  {n:"Nhận trang ấp",f:"bought",go:()=>{RD_FL("nc_vuong.bought",1)},wx:"giàu thêm",lx:"nhận của phe thua là tự trói tay: khó khuyên dẹp hay buộc họ quy thuận",rt:"Văn tự trang ấp nằm trong hộp trang sức."},
  {n:"Từ chối mọi điều riêng",f:"peace",wx:"lời ngươi sạch",lx:"người thân còn bị giữ",rt:"Sứ cúi chào, có phần nể."}]},
 c2:{h:"Binh bộ muốn rửa nhục",w:"v",need:["v"],t:"Sau trận thua ở hẻm núi, Binh bộ muốn Đại Hy đánh tiếp để rửa nhục, và nhà {v} đứng sau Binh bộ: có công mới thì chẳng ai nhắc lỗi cũ.",o:[
  {n:"Nhắc Hoàng thượng ai thua trận ấy",sc:1,wx:"lời Binh bộ nhẹ đi",lx:"ngài không thích chuyện cũ bị khơi",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Hoàng thượng gật đầu: “Phải, rửa nhục bằng xác lính thì không đáng.”",rf:"Hoàng thượng gắt: “Trẫm nhớ, không cần nhắc.”"},
  {n:"Đề nghị cho nhà {v} việc giữ hội thề",sc:1,wx:"nhà {v} có công mà không cần đánh",lx:"{v} cho là ngươi ban ơn",go:(A,ok)=>{rdRel(A,"v",ok?12:-4)},rt:"{v} cho người nhắn: “Lần này ta nợ ngươi.”",rf:"Nhà {v} chê việc canh hội là việc nhỏ."},
  {n:"Không động đến",wx:"không thêm thù",lx:"Binh bộ nói to hơn",rt:"Ngươi không nói gì."}]},
 t1:{h:"Lời của {mh}",w:"maid",t:"{mh} nhắn: “Con ơi, đất chia thì còn ghép lại được. Người chết thì không.”",o:[
  {n:"Nghe lời mẹ",sc:1,f:"peace",wx:"lòng định về phía hòa",lx:"tân {quan} sẽ cho là ngươi phản",rt:"Ngươi đọc thư mẹ ba lần."},
  {n:"Thưa mẹ: chia rồi thì không bao giờ ghép lại",sc:1,f:"hard",wx:"lòng định về phía một ngai",lx:"mẹ buồn",rt:"Ngươi viết thư đáp mẹ, không khóc."},
  {n:"Không đáp",wx:"giữ ý kín",lx:"mẹ chờ",rt:"Ngươi gấp thư lại."}]},
 x1:{h:"Lời quyết",w:"emp",t:"Sứ hai bên đã về sứ quán chờ. Đêm ấy Hoàng thượng đến cung ngươi: “Mai trẫm trả lời họ. Nàng nói. Trẫm nghe.”",o:[
  {n:"Khuyên giúp tân {quan} dẹp hẳn phe thua",e:["win","lose"],go:(A,ok)=>{if(ok)RD_FL("nc_vuong.crush",1)},rt:"Đại Hy xuất quân lần cuối. Phe thua ngôi tan, tân {quan} ngồi vững.",rf:"Quân Đại Hy đánh mãi không xong, phe thua rút vào rừng núi."},
  {n:"Khuyên mở hội thề ở biên ải, Đại Hy làm chứng",e:["win","mid"],rt:"Hoàng thượng chuẩn. Ngày hội thề định vào đầu xuân, hai bên đều gật đầu.",rf:"Hai bên gật đầu, nhưng không bên nào tin bên nào."},
  {n:"Khuyên để {land} tự định",e:"mid",lx:"Đại Hy rút tay, cố quốc tự lo",rt:"Sáng hôm sau, Hoàng thượng cho sứ hai bên về nước tự định."}]}},
 E:{win:{k:1,tag:"Lời quyết được nghe",w:"emp",t:"Lời quyết là của Hoàng thượng, nhưng sứ hai bên ra về đều biết trong lời ấy có lời của ngươi.",go:()=>e67bien(4)},
  mid:{k:0,tag:"Cố quốc tự định",t:"Đại Hy lùi một bước. {land} còn chia hai phe, chưa bên nào thắng hẳn."},
  lose:{k:-1,tag:"Lời quyết sai",t:"Lời ngươi đưa Đại Hy vào một cuộc chiến không dứt. Triều thần bắt đầu tính xem ai sẽ chịu tội.",go:()=>e67bien(-4)}}});

rdDef("nc_vuong",11,{t:"Ngai vàng sau cùng",w:"emp",sj:"ngai vàng {land}",cast(A){return rdCast(A,["v"])},
 g:()=>(RD_FL("nc_vuong.crush")?"Phe thua ngôi đã tan, nhưng dư đảng còn giữ mấy trấn núi và xin hội thề để được sống. Đầu xuân, sứ của tân {quan} và của dư đảng cùng vào kinh, hội ở Hồng Lô tự. Quy thuận hay cắt đất, một ngai hay hai, đều quyết ở đây.":"Đầu xuân, sứ của tân {quan} và của phe thua ngôi cùng vào kinh, hội ở Hồng Lô tự. Chiến hay hòa, một ngai hay hai, đều quyết ở đây.")+" Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Hai đoàn sứ vào kinh",w:"emp",if:RDW(1),t:"Sứ hai bên vào kinh cùng một ngày. Cả hai đoàn đều có người họ hàng của ngươi, và đều xin Hoàng thượng cho vào nội điện bái kiến ngươi trong buổi gia lễ, như người nhà, trước khi đến Hồng Lô tự.",o:[
  {n:"Tiếp cả hai đoàn cùng lúc, cách rèm",sc:1,f:"both",wx:"hai bên thấy ngươi không thiên vị",lx:"hai đoàn cãi nhau ngay trong cung ngươi",rt:"Hai đoàn ngồi hai bên, uống cùng một ấm trà.",rf:"Hai đoàn không ai chịu ngồi dưới ai."},
  {n:"Chỉ tiếp sứ của tân {quan}",f:"crown",wx:"giữ lễ với ngai chính",lx:"phe thua thấy ngươi đã chọn",rt:"Sứ của tân {quan} dâng quà, cảm tạ."},
  {n:"Không tiếp ai",wx:"không bị nói thiên vị",lx:"cả hai bên không biết ý ngươi",rt:"Ngươi đóng cửa cung."}]},
 s2:{h:"Hội thề trong nghi kỵ",w:"emp",if:RDW(0),t:"Cuộc chiến ở {land} vẫn kéo. Hai đoàn sứ vào kinh, mỗi bên mang theo một tờ sớ tố cáo bên kia. Lời ngươi lúc này vừa nặng vừa nguy.",o:[
  {n:"Xin Hoàng thượng mỗi tối kể lại việc hội",sc:1,f:"both",wx:"nghe tận tai",lx:"ngài thấy ngươi để tâm việc triều quá",rt:"Hoàng thượng gật đầu; tối nào ngài cũng ghé cung ngươi kể chuyện hội.",rf:"Hoàng thượng bảo: “Việc ngoài triều, nàng chớ bận lòng.”"},
  {n:"Gửi quà cho cả hai đoàn",sc:1,f:"both",wx:"hai bên bớt gai",lx:"tốn bạc",rt:"Hai đoàn nhận quà, sứ già hai bên cùng gửi lời tạ."},
  {n:"Đứng ngoài",wx:"không mang tiếng",lx:"hội thề không có người hiểu cả hai bên",rt:"Ngươi ở trong cung."}]},
 c1:{h:"Người thân bị giữ",w:"maid",t:"Một thư lén gửi đến: trong đoàn sứ phe thua ngôi có người giữ danh sách những người thân của ngươi còn bị họ giữ ở biên, kể cả người hầu cũ của {mh}.",o:[
  {n:"Đòi trả người làm điều kiện trước hội",sc:1,f:"hard",wx:"người thân về",lx:"hội thề chưa bắt đầu đã căng",rt:"Phe thua trả người trước ngày hội.",rf:"Phe thua bảo: người là để đổi, không để cho."},
  {n:"Bỏ bạc chuộc người",sc:1,wx:"người thân về yên",lx:"phe thua biết ngươi chịu trả",rt:"Danh sách người thân được trao lại, kèm văn tự thả."},
  {n:"Gác chuyện riêng, chờ hội xong",f:"both",wx:"lời ngươi trong hội sạch",lx:"người thân còn chờ",rt:"Ngươi cất thư."}]},
 c2:{h:"Chén rượu có độc",w:"v",need:["v"],t:"Rượu hội thề do Ngự thiện phòng cất, sắp đưa ra Hồng Lô tự. Cung nữ của ngươi bắt gặp một thái giám cung {v} lén đổi một vò. Nếu một sứ thần ngã xuống, hội tan, và Binh bộ lại có trận để đánh.",o:[
  {n:"Bắt tận tay, nộp Hoàng thượng",sc:2,f:"guard",wx:"cứu được hội thề",lx:"ầm ĩ trước ngày hội",go:(A,ok)=>{rdOan(A,"v",ok?14:6)},rt:"Thái giám cung {v} bị bắt cùng vò rượu, khai người nhà {v} sai khiến.",rf:"Kẻ đổi rượu chạy thoát, vò rượu bị đập vỡ."},
  {n:"Lặng lẽ đổi vò lại",sc:1,f:"guard",wx:"hội an toàn mà không ai biết",lx:"kẻ đứng sau còn yên",rt:"Vò rượu thật trở về chỗ cũ.",rf:"Ngươi không tìm ra vò nào bị đổi."},
  {n:"Tìm {v} nói thẳng",sc:1,wx:"{v} cho người dừng tay",lx:"{v} biết ngươi đã biết",go:(A,ok)=>{rdRel(A,"v",ok?12:-8)},rt:"{v} tái mặt: “Ta không biết nhà ta làm đến thế.”",rf:"{v} nói: “Ngươi có chứng gì?”"}]},
 t1:{h:"Hoàng thượng hỏi ngươi muốn gì",w:"emp",t:"Đêm trước hội, Hoàng thượng hỏi: “Xong việc này, nàng muốn gì cho mình?”",o:[
  {n:"Thưa: không muốn gì, chỉ muốn cố quốc yên",sc:1,f:"both",wx:"ngài nhớ lời này",lx:"không xin thì không có",rt:"Hoàng thượng nắm tay ngươi rất lâu."},
  {n:"Xin được về thăm mẹ một lần",sc:1,wx:"ngài hứa",lx:"ngài sợ ngươi đi không về",rt:"Hoàng thượng nói: “Xong hội, trẫm cho người hộ tống.”",rf:"Hoàng thượng im lặng."},
  {n:"Xin một phong hiệu cho mình",sc:1,f:"crown",wx:"có danh phận rõ ở cả hai nước",lx:"ngài thấy ngươi đòi công",rt:"Hoàng thượng gật đầu: “Để xem hội ra sao.”",rf:"Hoàng thượng cau mày."}]},
 x1:{h:"Ngày hội thề",w:"emp",t:"Hội thề ở Hồng Lô tự đã đến ngày cuối, mà lời thề chưa bên nào chịu đọc trước. Hoàng thượng sai thái giám về cung hỏi ngươi một câu, và đứng chờ đem lời ngươi đi.",o:[
  {n:"Viết lời thề bằng chữ hai nước gửi đi",e:["win","lose"],rt:"Thái giám mang tờ lời thề ngươi viết bằng chữ Đại Hy và chữ {land} về Hồng Lô tự. Hoàng thượng cho đọc; sứ hai bên cùng quỳ, cùng uống chén rượu thề.",rf:"Sứ phe thua đọc xong đứng dậy bỏ ra: “Lời của người bên kia viết.”"},
  {n:"Khuyên Hoàng thượng buộc phe thua quy thuận",e:["win","lose"],rt:"Phe thua ngôi quỳ nhận phong làm Thân vương, một ngai cho cả {land}.",rf:"Phe thua ngôi không chịu quỳ. Chiến sự lại nổ ra ở biên."},
  {n:"Khuyên chia đôi cho yên",e:["mid","lose"],rt:"Hai bên ký chia đất. {land} thành hai, mỗi bên một ngai.",rf:"Hai bên ký rồi lại xé, ngay trong năm."}]}},
 E:{win:{k:1,tag:"Cố quốc một lòng",w:"emp",t:"{land} có một ngai, một lời thề, và Đại Hy đứng làm chứng. Sứ của {land}, từ nay, vào kinh đều mang theo thư thăm hỏi ngươi.",go:()=>e67bien(6)},
  mid:{k:0,tag:"Cố quốc chia đôi",t:"{land} chia hai, mỗi bên một ngai, cả hai đều gọi ngươi là người nhà mà không bên nào nghe ngươi trọn. Biên ải yên, lòng ngươi không yên.",go:()=>e67bien(1)},
  lose:{k:-1,tag:"Cố quốc thành nước thù",t:"Hội thề tan, chiến sự lại nổ, và {land} quay lưng với Đại Hy. Ngươi vẫn là phi tần của Hoàng thượng, nhưng trong mắt cả hai nước, ngươi như một con tin chưa ai đòi.",go:()=>e67bien(-6)}}});
RD97L.push(rdRare({a:"nc_vuong_11",tag:"Hai nhà thề hòa bằng rượu của ngươi",w:"emp",n:"Xin Hoàng thượng dùng rượu thề cất ở cung mình",
 path:["Khuyên phong, buộc tân","Xin mẹ khuyên tân","Trả vàng, đọc hết lá thư","Viết kế đổi đất lấy chợ biên","Khuyên chiêu hàng trước","Trình lời khai của người lính","Khuyên mở hội thề","Từ chối mọi điều riêng","Tiếp cả hai đoàn cùng lúc","Bắt tận tay, nộp Hoàng thượng"],
 bad:["Nhận vàng, hứa nói giúp","Nhận trang ấp","Khuyên chia đôi"],x:[()=>S.danh>=RR("nc_vuong_11").bar,"Danh từ "+RR("nc_vuong_11").bar],
 t:"Rượu hội thề được cất ở cung ngươi theo cách {mh} dạy, niêm ấn cung ngươi đưa ra Hồng Lô tự. Sứ của tân {quan} và sứ phe thua ngôi, hai bên từng muốn giết nhau, cùng nâng chén; Hoàng thượng về kể: “Họ uống rượu của nàng, nên không bên nào dám bội.” Hoàng thượng ban biển ngự bút «Trung hiếu lưỡng toàn»: trung với Đại Hy, hiếu với {land}. Ở cố quốc, người ta lập một tấm bia ghi tên ngươi bên cạnh lời thề.",
 go:()=>e67bien(8),rw:"bienngu",ti:"Người giữ lời thề hai nhà"}));
/* Bắc Địch branch: the same chapters under the bd premise ids (road key = the premise rolled for this life).
   Runs at load, before jbal2.js: it walks the registered chapters (ROAD14), not BAL.road. */
(function(){const P={bd_hoa:"nc_su",bd_ngua:"nc_gian",bd_tuc:"nc_tuc",bd_hoang:"nc_vuong"};
 for(const b in P){const r=P[b];for(const n in ROAD14[r]||{}){const id=ROAD14[r][n];
  const {o,road,rn,...d}=ARC67[id];d.rth=d.rth||RTHEME67[id];rdDef(b,+n,d)}
  for(const x of RD97L.filter(x=>x.a===r+"_11"))RD97L.push(Object.assign({},x,{a:b+"_11"}))}})();
