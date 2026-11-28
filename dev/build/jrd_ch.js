/* ================= jrd_ch: the four full roads of «Cháu gái Thái hậu» (ch), chapters .5–.11 (ROAD_MAP.md §4.7) =================
   Same shape as jrd_tt.js (rdDef, rdCast, RDW openings, RD97L rare finales; helpers in jroad.js). The Thái hậu can die mid-road (S.thDead,
   j13/j4): every hồi that needs her carries need:["th"] and each chapter keeps an opening / turn / climax for a life where she is gone. */
/* fix r1 shared guards (FIX_ch.md): the Thái hậu's favour moves only while she lives; the Hoàng hậu's palace / title is named only while
   there is a Hoàng hậu (qOn), else the consort who holds the lục cung; ch_bi .4 rare ending «Người phi tần năm xưa còn sống» (r97) keeps
   Lâm thị alive in the later chapters; ch_benh: the drug shop is {v}'s family only for the {v} cast when .7 revealed it (S.st.f14.chbv). */
const CHR_TH=n=>{if(S.thDead)return"";ap67({th:n});return fmt({th:n})};
if(!RDQ.artY)RDQ.artY=()=>S.arts&&S.arts.y||0;/* same count as jrd_cn (loads earlier); kept here so jrd_ch stands alone */
const CHTH=k=>BAL.road.chTh[k];/* Thái hậu / Hoàng hậu favour moved by a choice's go (key "<chapter>.<beat>.<option>|E.<end>|rare.<stat>"), BAL.road.chTh */
RDQ.chcoTh=()=>S.thDead?0:S.th;RDQ.chco9=()=>S.thDead?S.danh:S.th;/* ch_co climax odds terms (rdOdds "kd", divided in BAL.road.fx): the Thái hậu's favour while she lives, else her Danh at .9 */
const CHR_Q=()=>qOn()?"Càn Ninh cung":"cung người giữ việc lục cung";
const CHR_H=()=>qOn()?"Hoàng hậu":"người giữ việc lục cung";
const CHR_LAM=()=>rdEnd(4)==="r97";
/* fix road-b2-r1: CHR_TON = lương y họ Tôn was not driven out at ch_benh .5 (.7 opens with his recall by the Emperor's chỉ when he was) */
const CHR_TON=()=>rdEnd(5)!=="lose";
const CHR_BV=A=>{try{return S.st.f14.chbv!=null&&A.act.v===S.st.f14.chbv}catch(e){return false}};
/* ---------- ch_co · Quân cờ của cô mẫu ---------- */
/* ch_co: Thái hậu → ta thiện cảm netTh("th","than2") (her nết, ROW 9) needed for the .11 heir option and the rare finale */
/* Thái hậu alive: S.thDead false (j13/j4 set S.thDead=true,S.th=0 when she dies). Every chapter keeps an opening, a turning beat and a
   climax that still run if she died mid-road (if:()=>S.thDead); beats/options that need her carry need:["th"]. Hoàng hậu beats carry
   need:["hh"]; a no-queen fallback (if:()=>!qOn()) keeps every slot fillable. */
rdDef("ch_co",5,{t:"Tai mắt Đức Thọ cung",w:"th",sj:"tai mắt của Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu đã băng hà, nhưng tai mắt bà cài khắp lục cung vẫn còn đó. Họ cần một chủ mới. Nhận họ, hay để họ tan.":`Thái hậu có tai mắt khắp lục cung: một ma ma ở ${CHR_Q()}, một thái giám giữ sổ ở Nội vụ phủ, mấy cung nữ hầu trà. Từ nay họ nghe ngươi, hay chỉ nghe bà, là việc ngươi phải định.`,
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Cô mẫu trao danh sách",w:"th",need:["th"],if:RDW(1),t:"Sau buổi yến, Thái hậu dúi vào tay ngươi một mảnh giấy ghi năm cái tên. “Từ nay họ báo tin cho con. Đừng để ai gia thất vọng.”",o:[
  {n:"Gặp từng người, nhận mặt",f:"obey",wx:"tai mắt nhận mặt chủ mới",lx:"có kẻ báo về Đức Thọ cung rằng ngươi vội",rt:"Năm người lần lượt đến thỉnh an, ai cũng cúi đầu thật thấp.",rf:()=>`Một cung nữ hầu trà lỡ miệng trước mặt người của ${CHR_Q()}.`},
  {n:"Thưởng bạc, buộc họ vào mình",f:"own",wx:"họ mang ơn ngươi, không chỉ mang ơn bà",lx:"tốn bạc, cô mẫu sẽ biết ngươi tự lo",rt:"Ai nhận bạc cũng nhìn ngươi khác đi."},
  {n:"Cất danh sách, chưa gọi ai",wx:"không ai biết ngươi đã có danh sách",lx:"tai mắt chưa quen ngươi",rt:"Ngươi khóa mảnh giấy vào hộp trang điểm."}]},
 s2:{h:"Cô mẫu gọi {v} vào hầu",w:"th",need:["th","v"],if:RDW(0),t:"Từ ngày ngươi làm bà phật lòng, sáng nào Thái hậu cũng gọi {v} sang Đức Thọ cung. Tai mắt của bà bắt đầu báo tin cho {v}.",o:[
  {n:"Xin cô mẫu cho hầu lại",f:"obey",wx:"cô mẫu nguôi lòng",lx:"cả cung thấy ngươi phải đi xin",rt:"Thái hậu để ngươi bưng trà, không nói gì, nhưng không đuổi.",rf:"Thái hậu bảo: “Có {v} rồi.”"},
  {n:"Kết thân với {v}",f:"own",wx:"tin của Đức Thọ cung vẫn đến tai ngươi",lx:"{v} biết ngươi đang cần nàng",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} cười: “Tỷ muội cùng hầu một người, cần gì giấu nhau.”",rf:"{v} khéo léo không mời ngươi ngồi."},
  {n:"Lặng lẽ gây người của riêng mình",wx:"không lệ thuộc ai",lx:"Đức Thọ cung xa dần",rt:"Ngươi bắt đầu để ý đến những cung nữ không ai để ý."}]},
 s3:{h:"Đức Thọ cung để tang",w:"me",if:()=>S.thDead,t:"Thái hậu đã băng hà. Ma ma, thái giám, cung nữ từng làm tai mắt cho bà nay hoang mang: theo ai thì sống, theo ai thì chết.",o:[
  {n:"Thu nhận họ về cung mình",f:"own",wx:"tai mắt của cô mẫu thành tai mắt của ngươi",lx:"tốn bạc, cả cung biết ngươi gom người",rt:"Từng người một lặng lẽ đến cửa cung ngươi."},
  {n:"Cho họ về quê, giữ lấy một hai người",wx:"giữ được ân nghĩa của cô mẫu",lx:"tai mắt mỏng đi",rt:"Ma ma già khóc khi nhận bạc tiễn."},
  {n:"Dâng danh sách lên Hoàng thượng",f:"obey",wx:"ngài thấy ngươi không giấu",lx:"người của cô mẫu oán ngươi",rt:"Hoàng thượng đọc xong, đặt tay lên vai ngươi.",rf:"Hoàng thượng chỉ bảo: “Trẫm biết cả rồi.”"}]},
 c1:{h:"Ma ma ở Càn Ninh cung",w:"hh",need:["hh"],t:"Ma ma cài ở Càn Ninh cung báo: Hoàng hậu {hh} hay cho người nhà vào cung, đi ra mang theo rương nặng. Bà xin một lời hứa: nếu bị bắt, ngươi phải cứu.",o:[
  {n:"Hứa che chở bà",wx:"bà dốc lòng dò tiếp",lx:"lời hứa là món nợ",f:"own",rt:"Ma ma quỳ lạy, đêm sau đã có tên người nhà Hoàng hậu."},
  {n:"Chỉ bảo bà cẩn thận",wx:"không hứa điều không giữ được",lx:"bà dò chậm lại",rt:"Ma ma cúi đầu lui ra, mắt đầy lo."},
  {n:"Bảo bà thôi dò, rút về",wx:"Càn Ninh cung không sinh nghi",lx:"cô mẫu mất một tai mắt",go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_5.c1.2.th")})},rt:"Ma ma xin chuyển sang Hoán y cục."}]},
 c2:{h:"{v} cũng dò",w:"v",need:["v"],t:"{v} cho người làm thân với thái giám giữ sổ Nội vụ phủ, đem theo một đôi vòng vàng.",o:[
  {n:"Trả giá cao hơn",wx:"thái giám nghiêng về ngươi",lx:"hắn nhận cả hai bên",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Đôi vòng vàng bị gửi trả về cung {v}.",rf:"Hắn nhận cả hai, báo tin cho cả hai."},
  {n:"Báo cho {v} biết hắn là người của Đức Thọ cung",wx:"{v} biết đường lui",lx:"lộ một tai mắt",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} rút tay, sai người mang trả lễ."},
  {n:"Để mặc, xem hắn chọn ai",wx:"biết hắn là người thế nào",lx:"có thể mất hắn",rt:"Ba hôm sau, hắn vẫn đến báo tin cho ngươi trước."}]},
 c3:{h:"Thái giám giữ sổ đòi giá",w:"eun",t:"Thái giám giữ sổ ở Nội vụ phủ nhắn: cháu hắn muốn một chân thị vệ. Trong mười ngày không có tin, hắn thôi chép sổ cho ai cả.",o:[
  {n:"Lo bạc mua chân thị vệ",wx:"hắn chép sổ cho ngươi đều đặn",lx:"tốn bạc, mà mua người thì người cũng bán được",rt:"Chưa đến mười ngày, cháu hắn đã đeo đao đứng gác."},
  {n:"Xin Hoàng thượng một ân điển nhỏ",wx:"không tốn bạc mà hắn nợ ngươi",lx:"Hoàng thượng hỏi sao ngươi quen thị vệ",rt:"Hoàng thượng gật đầu, không hỏi thêm.",rf:"Hoàng thượng nhíu mày: “Việc của Nội vụ phủ.”"},
  {n:"Nhắc hắn chuyện cũ hắn muốn giấu",wx:"hắn sợ hơn là mang ơn",lx:"hắn đi báo kẻ khác",rt:"Hắn tái mặt, hôm sau mang sổ đến.",rf:"Hắn cáo bệnh, không đến nữa."}]},
 t1:{h:"Cô mẫu hỏi tin",w:"th",need:["th"],t:()=>`Thái hậu hỏi: “Con nghe được gì ở ${CHR_Q()}? Đừng giấu ai gia một chữ.”`,o:[
  {n:"Tâu hết",f:"obey",wx:"cô mẫu tin ngươi",lx:"không còn lá bài nào trong tay",rt:"Thái hậu nghe xong, gõ ngón tay lên bàn."},
  {n:"Tâu một nửa, giữ một nửa",f:"own",wx:"giữ được lá bài riêng",lx:"cô mẫu nhận ra ngươi giấu",rt:"Thái hậu gật đầu, không hỏi thêm.",rf:"Thái hậu cười nhạt: “Con lớn rồi.”"},
  {n:"Xin cô mẫu cho thêm thời gian",wx:"không nói điều chưa chắc",lx:"cô mẫu sốt ruột",go:()=>{ap67({th:CHTH("ch_co_5.t1.2.th")})},rt:"Thái hậu phẩy tay: “Mười ngày.”"}]},
 t2:{h:"Gói thư cô mẫu để lại",w:"me",if:()=>S.thDead,t:"Ma ma già của Đức Thọ cung đưa ngươi một gói thư Thái hậu dặn trao tận tay: tên những ai trong cung còn nợ bà.",o:[
  {n:"Đọc hết, ghi nhớ",f:"own",wx:"biết ai còn nợ Đức Thọ cung",lx:"cầm thư là cầm lửa",rt:"Ngươi đọc đến gà gáy."},
  {n:"Đốt đi",wx:"không ai còn bị nắm thóp",lx:"mất lá bài lớn nhất",rt:"Tro bay qua song cửa."}]},
 x1:{h:"Sổ chi Nội vụ phủ",w:"eun",t:A=>`Thái giám giữ sổ chép được một trang: bạc Nội vụ phủ chảy về ${qOn()?"nhà ngoại Hoàng hậu":"nhà một phi tần đang nắm việc lục cung"}. ${S.thDead?"Cô mẫu không còn, trang sổ ấy giờ trong tay ngươi.":"Thái hậu chờ trang sổ ấy."}`,o:[
  {n:"Chép sổ, dâng cô mẫu",need:["th"],e:["win","lose"],rt:"Thái hậu đọc xong, sai người tra Nội vụ phủ ngay trong đêm.",rf:"Trang sổ bị phát hiện là chép vội, Nội vụ phủ chối sạch."},
  {n:"Chép sổ, giữ riêng cho mình",e:["win","mid"],rt:"Trang sổ nằm trong tay ngươi, không ai biết.",rf:"Bản chép bị thất lạc một nửa."},
  {n:"Dâng thẳng lên Hoàng thượng",e:["win","lose"],rt:"Hoàng thượng cho tra sổ, khen ngươi biết giữ của công.",rf:"Hoàng thượng hỏi: “Ai cho nàng xem sổ Nội vụ phủ?”"},
  {n:"Không đụng đến sổ",e:"mid",lx:"tai mắt nằm im, không làm được gì",rt:"Ngươi dặn thái giám cất trang sổ về chỗ cũ."}]}},
 E:{win:{tag:"Nắm sổ Nội vụ phủ",w:"me",t:A=>S.thDead?"Tai mắt cô mẫu để lại nay báo tin cho ngươi. Trong cung, ai lấy bạc công, ngươi đều biết.":"Tai mắt của Đức Thọ cung nay báo tin qua tay ngươi. Thái hậu bảo: “Con cũng biết đánh cờ.”",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_co_5.E.win.th")});return fmt({th:CHTH("ch_co_5.E.win.th")})}},
  mid:{tag:"Tai mắt còn nằm im",t:"Người vẫn đó, sổ vẫn đó. Ngươi chưa dùng, cũng chưa ai dùng được để hại ngươi."},
  lose:{tag:"Tai mắt bị nhổ",w:"eun",t:()=>`Thái giám giữ sổ bị đuổi khỏi Nội vụ phủ, ma ma bị đưa đi Hoán y cục. ${CHR_Q()} biết ai đứng sau.`,go:(A,G)=>{rdOan(A,"v",G[0]);return""}}}});

rdDef("ch_co",6,{t:"Tai mắt bị lộ",w:"me",sj:"những tai mắt bị lộ",cast(A){return rdCast(A,["v"])},
 g:A=>qOn()?`Hoàng hậu {hh} biết trong cung mình có tai mắt của Đức Thọ cung. ${S.thDead?"Thái hậu không còn để hỏi":"Bà không hỏi Thái hậu"}; bà hỏi người yếu hơn: ngươi.`:`Ngôi Trung cung đang trống. Nội vụ phủ bắt được một tai mắt của Đức Thọ cung. Người giữ việc lục cung ${S.thDead?"không còn Thái hậu để hỏi":"không hỏi Thái hậu"}; họ hỏi ngươi.`,
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Trang sổ biến mất",w:"hh",need:["hh"],if:RDW(1),t:"Nội vụ phủ báo lên Hoàng hậu: sổ chi bị chép trộm một trang. {hh} cho gọi tất cả thái giám giữ sổ, từng người một.",o:[
  {n:"Đưa thái giám giữ sổ ra khỏi kinh",wx:"người của ngươi không bị hỏi",lx:"tốn bạc, mất một tai mắt",rt:"Hắn xin về quê chịu tang mẹ trước khi bị gọi."},
  {n:"Dặn hắn khai một tên giả",f:"own",wx:"Hoàng hậu đi sai đường",lx:"tên giả bị lật",rt:"Hoàng hậu tra một tên thư lại vô can, rồi thôi.",rf:"Hoàng hậu nhận ra tên giả, càng chắc có người đứng sau."},
  {n:"Đến thỉnh an Hoàng hậu như thường",wx:"không ai thấy ngươi hoảng",lx:"Hoàng hậu nhìn ngươi lâu hơn mọi khi",rt:"Hoàng hậu rót trà cho ngươi, cười rất hiền."}]},
 s2:{h:"Ma ma bị bắt",w:"hh",need:["hh"],if:RDW(0),t:"Ma ma cài ở Càn Ninh cung bị bắt khi lục rương. Bà chưa khai, nhưng ai cũng biết bà từng hầu Đức Thọ cung.",o:[
  {n:"Giữ lời hứa, xin cho bà",wx:"người của ngươi biết ngươi giữ lời",lx:"Hoàng hậu biết ngươi đứng sau",rt:"Hoàng hậu cho đưa bà ra khỏi cung thay vì đánh.",rf:"Hoàng hậu cười: “Muội lo cho bà ta lắm nhỉ.”"},
  {n:"Gửi bạc cho người nhà bà",wx:"bà không khai",lx:"bà vẫn chịu đòn",rt:"Ma ma chịu ba mươi trượng, không nói một lời."},
  {n:"Cắt đứt, như chưa từng quen",wx:"Càn Ninh cung không có cớ",lx:"tai mắt khác sợ, rút lui",rt:"Ngươi không nhắc tên bà nữa."}]},
 s3:{h:"Người giữ việc lục cung",w:"v",if:A=>{const v=rv67(A,"v");return !qOn()&&!!v&&v.rank>=S.rank&&liveRivals(false).every(x=>x===v||(x.rank||0)<=v.rank)},t:"{v} đang tạm giữ việc lục cung. Nàng cho bắt một cung nữ hầu trà, nói là tai mắt của Đức Thọ cung, và gọi ngươi đến nhận mặt.",o:[
  {n:"Nhận là người cũ của cung mình",wx:"cung nữ được tha",lx:"{v} nắm được một lời của ngươi",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} không có cớ phạt, đành tha.",rf:"{v} ghi lời ngươi vào sổ."},
  {n:"Nói không quen",wx:"không để lại dấu",lx:"cung nữ bị đánh, người khác sợ",rt:"Cung nữ bị đưa đi Tân Giả khố."},
  {n:"Xin {v} nể mặt Đức Thọ cung",need:["th"],wx:"{v} lùi một bước",lx:"Thái hậu không muốn bị đem ra làm khiên",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} thả người: “Nể Thái hậu.”",rf:"{v} cười: “Thái hậu sai muội đến nói sao?”"}]},
 c1:{h:"Hoàng hậu mời trà",w:"hh",need:["hh","th"],t:"Hoàng hậu {hh} mời riêng ngươi: “Muội vào cung là để làm cái bóng của Thái hậu sao? Bóng thì không có ngày mai.”",o:[
  {n:"Ngầm nhận một mối giao hảo",f:"two",wx:"có đường lui ở Càn Ninh cung",lx:"Đức Thọ cung biết ngươi ngồi uống trà lâu",rt:"Hoàng hậu cười, đổi chén trà nguội lấy chén nóng.",rf:"Thái hậu biết ngay trong chiều."},
  {n:"Đáp khéo, không nhận không chối",wx:"không mắc lời nào",lx:"Hoàng hậu thấy ngươi khó nắm thóp",rt:"Hoàng hậu gật đầu: “Muội giỏi lắm.”"},
  {n:"Thưa thẳng: thần thiếp là cháu Thái hậu",f:"obey",wx:"giữ trọn một lòng",lx:"Hoàng hậu thôi ngọt",go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_6.c1.2.th")})},rt:"Hoàng hậu đặt chén xuống, tiễn ngươi ra tận cửa."}]},
 c2:{h:"{v} ra mặt làm chứng",w:"v",need:["v"],t:"{v} nói với cả cung rằng nàng thấy người của ngươi ra vào Nội vụ phủ lúc nửa đêm.",o:[
  {n:"Đòi {v} đối chất",wx:"lời gièm bị lật",lx:"thành ra cãi nhau",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} không nói được giờ nào, người nào.",rf:"{v} đưa ra một thái giám chịu làm chứng."},
  {n:"Mời {v} đến, hỏi nàng muốn gì",wx:"{v} thôi nói",lx:"{v} thấy ngươi sợ",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} chỉ muốn một chỗ ngồi gần Thái hậu hơn.",rf:"{v} cười, không đáp."},
  {n:"Im lặng",wx:"không thêm sóng",lx:"lời gièm lan",rt:"Ngươi để mặc."}]},
 c3:{h:"Hoàng thượng hỏi một câu",w:"emp",t:"Hoàng thượng đến cung ngươi, hỏi như vô tình: “Nghe nói trong cung có người nghe ngóng cho Đức Thọ cung?”",o:[
  {n:"Thưa thật một nửa",wx:"ngài thấy ngươi không dối",lx:"ngài biết ngươi dính vào",rt:"Hoàng thượng cười: “Mẫu hậu vẫn thế.”",rf:"Hoàng thượng đặt chén trà xuống, không nói gì."},
  {n:"Chối, lái sang chuyện khác",wx:"không lộ gì",lx:"nếu sau này lộ thì thành dối vua",rt:"Ngài để ngươi lái câu chuyện."},
  {n:"Xin ngài đừng để hai cung khó xử",wx:"ngài thấy ngươi thương cả hai bên",lx:"ngài chẳng hứa gì",rt:"Hoàng thượng thở dài."}]},
 t1:{h:"Cô mẫu dặn",w:"th",need:["th"],t:()=>`Thái hậu gọi ngươi vào lúc chạng vạng: “Nếu ${CHR_Q()} hỏi, cứ để chúng hỏi ai gia.”`,o:[
  {n:"Nhận lời che chở của cô mẫu",f:"obey",wx:"có Đức Thọ cung đứng sau",lx:"càng là cái bóng của bà",rt:"Thái hậu gật đầu."},
  {n:"Xin tự lo, đừng để cô mẫu ra mặt",f:"own",wx:"bà nể ngươi",lx:"bà thấy ngươi cứng đầu",rt:"Thái hậu cười: “Được, ai gia xem.”",rf:"Thái hậu quay mặt đi."}]},
 t2:{h:"Không còn ai che",w:"me",if:()=>S.thDead,t:"Cô mẫu không còn. Ai hỏi, ngươi phải tự đáp.",o:[
  {n:"Tự gánh, không đổ cho người đã khuất",wx:"người ta kính ngươi",lx:"lỗi về một mình ngươi",rt:"Ngươi đốt nén nhang trước bài vị cô mẫu."},
  {n:"Đổ hết cho lệnh cũ của cô mẫu",wx:"người chết không bị phạt",lx:"họ ngoại cho là ngươi bạc",rt:"Ai cũng gật gù: Thái hậu sai, con cháu biết làm sao."}]},
 x1:{h:"Đối chất trước lục cung",w:"hh",t:A=>`${qOn()?"Hoàng hậu {hh}":"Nội vụ phủ"} cho gọi đủ lục cung, đặt giữa điện một trang sổ chép tay: “Ai chép, tự đứng ra.”`,o:[
  {n:"Nhận là mình xem sổ, vì của công",e:["win","lose"],rt:"Ngươi nói rõ bạc chảy đi đâu. Cả điện im lặng; người phải giải thích là kẻ lấy bạc, không phải ngươi.",rf:"Không ai hỏi bạc đi đâu, chỉ hỏi sao ngươi xem được sổ."},
  {n:"Để mọi lời nghi dồn về {v}",e:["win","mid"],go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Người của {v} cũng từng ra vào Nội vụ phủ; nghi ngờ đổi hướng.",rf:"Nghi ngờ chia đôi, không ai chịu."},
  {n:"Xin Thái hậu ra mặt",need:["th"],e:["mid","lose"],rt:"Thái hậu sai người đến nói một câu, cả điện tan.",rf:"Thái hậu không đến. Cả điện hiểu ngươi chỉ là quân cờ bị bỏ."},
  {n:"Quỳ im, nhận phạt chung",e:"mid",lx:"chép kinh một tháng cùng cả cung, ai cũng oán người chép sổ",rt:"Lục cung chép kinh một tháng."}]}},
 E:{win:{tag:()=>`${CHR_Q()} không bắt được tay`,w:"me",t:()=>`Không ai bắt được tay ngươi. Từ đó ${CHR_Q()} nhìn ngươi như nhìn một người biết đánh cờ, không còn như cái bóng của Đức Thọ cung.`},
  mid:{tag:"Biết mà không nói",t:"Ai cũng đoán ra, nhưng không ai nói. Ngươi qua được, mà từ nay mỗi bước đều có người nhìn."},
  lose:{tag:"Bị gọi là cái bóng của Đức Thọ cung",w:"me",t:()=>`Cả lục cung gọi ngươi là “cái bóng của Đức Thọ cung”. ${CHR_H()} không phạt, chỉ ghi nhớ.`}}});

rdDef("ch_co",7,{t:"Hai chủ",w:"emp",sj:"ghế Cửu môn đề đốc",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu vừa khuất, Hoàng thượng muốn thu ghế Cửu môn đề đốc khỏi tay họ ngoại. Biểu ca của ngươi đang ngồi ghế ấy. Cả họ chờ ngươi nói một lời.":"Thái hậu muốn biểu ca của ngươi, cháu trai bà, ngồi ghế Cửu môn đề đốc. Hoàng thượng muốn người của ngài. Cả hai đều nhờ ngươi nói giúp.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Hai lời nhờ một ngày",w:"th",need:["th"],if:RDW(1),t:"Sáng, Thái hậu bảo: “Con nói với Hoàng đế, ghế ấy để cho người nhà.” Tối, Hoàng thượng hỏi: “Nàng thấy mẫu hậu có nên buông tay chưa?”",o:[
  {n:"Thưa với vua đúng lời cô mẫu",f:"obey",wx:"cô mẫu biết ngươi làm",lx:"ngài thấy ngươi nói thay Đức Thọ cung",rt:"Hoàng thượng nghe, không đáp."},
  {n:"Thưa với vua lời của chính mình",f:"own",wx:"ngài thấy ngươi có chủ kiến riêng",lx:"lời đến tai Đức Thọ cung",rt:"Hoàng thượng nhìn ngươi lâu: “Nàng nói được.”",rf:"Hoàng thượng chỉ ừ."},
  {n:"Xin không nói, để hai bên tự bàn",wx:"không mắc lỗi với ai",lx:"không ai mang ơn ngươi",rt:"Ngươi rót trà, im lặng."}]},
 s2:{h:"Cô mẫu tìm người khác nói",w:"th",need:["th","v"],if:RDW(0),t:"Thái hậu không nhờ ngươi. Bà gọi {v} sang, dặn nàng thưa với Hoàng thượng chuyện ghế Cửu môn.",o:[
  {n:"Xin cô mẫu giao lại việc ấy",f:"obey",wx:"lấy lại chỗ đứng",lx:"cả cung thấy ngươi chen",rt:"Thái hậu gật đầu: “Thử lần nữa.”",rf:"Thái hậu bảo: “Đã có {v}.”"},
  {n:"Để {v} nói, ngươi chỉ nghe",wx:"thấy được ý vua mà không mất gì",lx:"công về {v}",rt:"{v} nói vụng; Hoàng thượng chau mày."},
  {n:"Ngầm báo Hoàng thượng ý cô mẫu trước",f:"own",wx:"ngài có sẵn lời đáp",lx:"cô mẫu biết ngươi đi trước bà",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Lời của {v} chưa dứt, Hoàng thượng đã có câu đáp.",rf:"Thái hậu biết ngươi đi trước."}]},
 s3:{h:"Họ ngoại đến cửa",w:"me",if:()=>S.thDead,t:"Biểu ca gửi thư vào cung: “Cô mẫu không còn, cả họ chỉ còn trông vào muội.”",o:[
  {n:"Hồi thư: muội sẽ thưa giúp",f:"obey",wx:"họ ngoại trông vào ngươi",lx:"lời hứa thì phải giữ",rt:"Biểu ca hồi thư tạ ơn."},
  {n:"Hồi thư: huynh nên tự lui một bước",f:"own",wx:"họ còn đường lùi",lx:"họ cho là ngươi quên gốc",rt:"Biểu ca im lặng mười ngày, rồi đáp: “Muội nói phải.”",rf:"Biểu ca xé thư."},
  {n:"Không hồi âm",wx:"Hoàng thượng thấy ngươi không dính họ ngoại",lx:"họ ngoại lạnh lòng",rt:"Thư nằm trong hộp."}]},
 c1:{h:"Ứng viên của Hoàng thượng",w:"emp",t:"Người Hoàng thượng muốn đặt là một vị tướng trẻ trấn biên mới về, không phe nào, chỉ trung với ngài.",o:[
  {n:"Cho người dò lai lịch y",wx:"biết y là người thế nào",lx:"dò tướng ngoài triều thì dễ bị nói",rt:"Y sạch như lời đồn, chỉ có một mẹ già ở quê.",rf:"Người dò bị y bắt gặp."},
  {n:"Gửi lễ mừng mẹ già của y",wx:"y nhớ ơn ngươi",lx:"tốn bạc, họ ngoại nhìn thấy",rt:"Y sai người mang thư tạ."},
  {n:"Không động đến",wx:"tay sạch",lx:"không biết gì về y",rt:"Ngươi để mặc."}]},
 c2:{h:"{v} đứng về đâu",w:"v",need:["v"],t:"Nhà {v} có người trong Binh bộ. Ghế Cửu môn về tay ai, nhà nàng cũng muốn chia phần.",o:[
  {n:"Hứa chia cho nhà {v} một chân phó tướng",wx:"{v} theo ngươi lần này",lx:"hứa điều không phải của mình",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} cười: “Tỷ biết điều.”",rf:"{v} đem lời hứa đi kể."},
  {n:"Bảo {v} đừng chen vào",wx:"không nợ ai",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cúi đầu, nhưng mắt không cúi."},
  {n:"Để {v} tự liệu",wx:"không dính",lx:"{v} có thể đứng về phía khác",rt:"Ngươi không nhắc chuyện ấy với nàng."}]},
 c3:{h:"Biểu ca phạm lỗi",w:"me",t:"Biểu ca say rượu đánh một viên đội trưởng Cấm quân. Ngự sử chưa biết, nhưng sẽ biết.",o:[
  {n:"Lo bạc bịt miệng",wx:"chuyện chìm",lx:"bịt không kín thì thành tội che",rt:"Viên đội trưởng nhận bạc, xin nghỉ dưỡng thương.",rf:"Ngự sử biết cả chuyện bịt miệng."},
  {n:"Bắt biểu ca tự đến nhận lỗi",wx:"lỗi nhỏ thành tiếng biết phép",lx:"họ ngoại cho là ngươi ép người nhà",rt:"Biểu ca bị phạt bổng ba tháng, Hoàng thượng khen biết nhận lỗi.",rf:"Biểu ca không chịu."},
  {n:"Để mặc",wx:"không vướng tay",lx:"ghế Cửu môn khó giữ",rt:"Ngươi không nhúng tay."}]},
 t1:{h:"Cô mẫu và Hoàng thượng cùng có mặt",w:"th",need:["th"],t:"Bữa cơm ở Đức Thọ cung. Thái hậu nhắc chuyện ghế Cửu môn ngay trước mặt Hoàng thượng, rồi quay sang ngươi: “Con nói xem.”",o:[
  {n:"Đứng về phía cô mẫu",f:"obey",wx:"cô mẫu hài lòng",lx:"Hoàng thượng nhớ",rt:"Thái hậu gắp cho ngươi miếng cá."},
  {n:"Đứng về phía Hoàng thượng",f:"emp",wx:"ngài nhớ",lx:"cô mẫu buông đũa",rt:"Hoàng thượng nắm tay ngươi dưới gầm bàn."},
  {n:"Tìm một lời vẹn cả đôi",f:"own",wx:"cả hai cùng cười",lx:"cả hai cùng thấy ngươi lẩn",rt:"Ngươi xin cho biểu ca làm phó, tướng trẻ làm chính. Thái hậu và Hoàng thượng nhìn nhau.",rf:"Không ai cười."}]},
 t2:{h:"Bài vị và long án",w:"emp",if:()=>S.thDead,t:"Hoàng thượng hỏi: “Nếu mẫu hậu còn, nàng ấy muốn gì? Nàng thì muốn gì?”",o:[
  {n:"Thưa ý cô mẫu",f:"obey",wx:"giữ đạo hiếu",lx:"ngài thấy ngươi nói thay người đã khuất",rt:"Hoàng thượng gật đầu chậm rãi."},
  {n:"Thưa ý mình",f:"own",wx:"ngài nghe ngươi",lx:"họ ngoại cho là ngươi quên cô mẫu",rt:"Hoàng thượng cười khẽ.",rf:"Hoàng thượng chỉ im lặng."}]},
 x1:{h:"Đêm trước chiếu định ghế Cửu môn",w:"emp",t:A=>`Đêm trước khi chiếu chỉ ban, ${S.thDead?"Hoàng thượng ngồi một mình ở cung ngươi; họ ngoại đã gửi thư vào từ chiều.":"bữa cơm nhà ở Đức Thọ cung: Thái hậu ngồi trên, Hoàng thượng ngồi dưới."} Ngài quay sang ngươi, như hỏi chuyện nhà: “Nàng thấy ai nên ngồi?” Ai ngồi, vẫn là ngài phê.`,o:[
  {n:"Tiến cử biểu ca",e:["win","lose"],rt:"Hoàng thượng phê tên biểu ca. Họ ngoại giữ được ghế, và biết ai đã giữ cho họ.",rf:"Hoàng thượng phê người của ngài, nhìn ngươi như nhìn một người họ ngoại."},
  {n:"Tiến cử tướng trẻ của Hoàng thượng",e:["win","mid"],go:(_A,_ok,G)=>CHR_TH(G[0]),rt:"Hoàng thượng phê tên tướng trẻ. Hoàng thượng tin ngươi hơn tin bất kỳ ai trong họ ngoại.",rf:"Tướng trẻ nhận ấn, nhưng ai cũng biết ngươi bỏ người nhà."},
  {n:"Xin chia: một chính một phó",e:["win","mid"],rt:"Hoàng thượng phê một chính một phó: hai người cùng giữ cửa kinh thành. Cả hai bên đều còn mặt mũi.",rf:"Chia rồi, hai bên cùng không vui."},
  {n:"Không dám bàn việc triều",e:"mid",lx:"không ai mang ơn ngươi",rt:"Ngươi cúi đầu lui."}]}},
 E:{win:{tag:"Vẹn cả hai chủ",w:"emp",t:A=>S.thDead?"Hoàng thượng và họ ngoại đều biết ghế Cửu môn yên là nhờ ngươi. Ngươi giữ được lòng Hoàng thượng mà không phụ cô mẫu đã khuất.":"Hoàng thượng và Thái hậu đều biết ghế Cửu môn yên là nhờ ngươi. Lần đầu, cả hai cùng nể một người."},
  mid:{tag:"Một bên vừa lòng",t:"Một bên vừa lòng, một bên im lặng. Ngươi qua được lần này, nhưng bên im lặng không quên."},
  lose:{tag:"Kẹt giữa hai chủ",w:"emp",t:"Hoàng thượng thấy ngươi là người của họ ngoại; họ ngoại thấy ngươi không giữ được ghế. Ngươi mất mặt ở cả hai nơi.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_co_7.E.lose.th")});return fmt({th:CHTH("ch_co_7.E.lose.th")})}}}});

rdDef("ch_co",8,{t:"Lệnh khó",w:"th",sj:"lệnh hại {v}",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Ma ma già của Đức Thọ cung mang đến một lệnh Thái hậu để lại trước khi băng hà: hạ {v}, kẻ đã quay lưng với bà. Lệnh của người chết, ai dám trái.":`{v} đã ngả về ${CHR_Q()}. Thái hậu muốn nàng biến mất khỏi mắt Hoàng thượng, bằng một con búp bê vải chôn dưới gốc cây trong cung nàng. Ngươi thấy lệnh ấy sai.`,
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Cô mẫu tin ngươi nhất",w:"th",need:["th"],if:RDW(1),t:"Thái hậu đưa ngươi một gói vải: “Việc này ai gia chỉ giao cho con. Người khác, ai gia không tin.”",o:[
  {n:"Nhận gói vải",f:"obey",wx:"cô mẫu tin ngươi",lx:"tay đã cầm vật hại người",rt:"Gói vải nặng hơn ngươi tưởng."},
  {n:"Xin cô mẫu cho nghĩ một đêm",f:"own",wx:"có thời gian tính",lx:"cô mẫu thấy ngươi do dự",rt:"Thái hậu gật đầu: “Một đêm.”",rf:"Thái hậu thu gói vải lại, ánh mắt lạnh."},
  {n:"Hỏi thẳng: {v} có tội gì",wx:"cô mẫu kể thật",lx:"bà giận ngươi hỏi",rt:()=>`Thái hậu kể: {v} đem chuyện Đức Thọ cung kể cho ${CHR_H()}.`,rf:"Thái hậu đáp: “Ai gia không cần giải thích.”"}]},
 s2:{h:"Lệnh qua tay ma ma",w:"th",need:["th"],if:RDW(0),t:"Thái hậu không gặp ngươi. Ma ma của bà mang gói vải đến, nói: “Thái hậu bảo, làm được việc này thì mọi chuyện cũ bỏ qua.”",o:[
  {n:"Nhận, để chuộc lỗi cũ",f:"obey",wx:"cô mẫu sẽ bỏ qua",lx:"chuộc lỗi bằng tội mới",rt:"Ma ma cười, lui ra."},
  {n:"Xin vào gặp cô mẫu",wx:"nói được lời mình",lx:"bị chặn ngoài cửa",rt:"Thái hậu cho vào, nghe ngươi nói hết.",rf:"Cửa Đức Thọ cung đóng."},
  {n:"Từ chối ngay với ma ma",f:"no",wx:"tay sạch",lx:"cô mẫu nghe lời từ chối qua miệng người khác",rt:"Ma ma cầm gói vải về, không nói gì."}]},
 s3:{h:"Lệnh của người đã khuất",w:"me",if:()=>S.thDead,t:"Ma ma già quỳ dâng gói vải: “Thái hậu dặn trước lúc đi: việc này để cháu bà làm.”",o:[
  {n:"Nhận để giữ lời cô mẫu",f:"obey",wx:"người cũ của Đức Thọ cung tin ngươi",lx:"tay cầm vật hại người",rt:"Ma ma rơi nước mắt."},
  {n:"Nhận để không ai khác làm",f:"own",wx:"gói vải nằm trong tay ngươi",lx:"ma ma tưởng ngươi sẽ làm",rt:"Ngươi giấu gói vải dưới đáy rương."},
  {n:"Đốt trước mặt ma ma",f:"no",wx:"dứt nghiệp cho cô mẫu",lx:"người cũ của Đức Thọ cung thất vọng",rt:"Ma ma lặng nhìn ngọn lửa."}]},
 c1:{h:"Cửa cung {v} có người canh",w:"v",need:["v"],t:"Cửa cung {v} mấy hôm nay có thêm người canh đêm. Nếu con búp bê bị tìm thấy, đó sẽ là tội trù ếm, không phải chuyện tranh sủng.",o:[
  {n:"Dò xem ai đặt người canh",wx:"biết lưới của ai",lx:"người của {v} thấy ngươi dò",rt:"Người canh là do chính {v} xin Nội vụ phủ: nàng đã sợ từ trước.",rf:"Người canh bắt gặp người của ngươi lảng vảng."},
  {n:"Gửi lễ mừng {v}",wx:"{v}: nghi −",lx:"tốn bạc, cô mẫu cho là ngươi mềm",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận lễ, cảm ơn khách sáo."},
  {n:"Không để tâm",wx:"không dao động",lx:"nếu bị bắt, tội càng nặng",rt:"Ngươi gạt chuyện ấy sang một bên."}]},
 c2:{h:"Cung nữ của ngươi biết",w:"maid",t:"{maid} thấy gói vải. Nàng quỳ: “{Goi}, việc này mà lộ thì cả cung ta chết.”",o:[
  {n:"Bảo nàng giữ kín",wx:"không thêm ai biết",lx:"nàng sợ, có thể lỡ lời",rt:"{maid} gật đầu, tay run."},
  {n:"Cho nàng về quê một thời gian",wx:"nàng không bị liên lụy",lx:"tốn bạc lộ phí cho nàng",rt:"{maid} khóc khi lên xe."},
  {n:"Bảo nàng đi chôn thay",wx:"tay ngươi không dính",lx:"nàng bị bắt thì khai ra ngươi",rt:"Nàng đi rồi về trong đêm, không ai thấy.",rf:"Nàng bị thị vệ hỏi ở cửa hậu."}]},
 c3:{h:"Hoàng hậu cũng đang nhìn",w:"hh",need:["hh"],t:"Hoàng hậu {hh} cho người canh cung {v}. Bà đang chờ có kẻ ra tay để bắt tận tay Đức Thọ cung.",o:[
  {n:"Báo cô mẫu: Càn Ninh cung đã giăng lưới",need:["th"],wx:"cô mẫu biết để lui",lx:"bà có thể đổi người làm",rt:"Thái hậu im lặng hồi lâu."},
  {n:"Ngầm cho Hoàng hậu biết ngươi không dính",need:["th"],wx:"Càn Ninh cung không nhắm ngươi",lx:"Đức Thọ cung biết",rt:"Hoàng hậu cho người nhắn: “Bổn cung biết.”",rf:"Thái hậu biết ngươi gửi tin sang Càn Ninh cung."},
  {n:"Để lưới đó, chờ",wx:"biết lưới ở đâu",lx:"không gỡ được",rt:"Ngươi ghi giờ canh của người Càn Ninh cung."}]},
 t1:{h:"Lời của cô mẫu",w:"th",need:["th"],t:"Thái hậu nói: “Ai gia sống đến tuổi này là nhờ không mềm tay. Con muốn đứng được, cũng phải thế.”",o:[
  {n:"Vâng lời",f:"obey",wx:"bà yên lòng",lx:"lòng ngươi thì không yên",rt:"Thái hậu vỗ tay ngươi."},
  {n:"Thưa: con muốn đứng bằng cách khác",f:"own",wx:"bà nghe",lx:"bà thấy ngươi dạy bà",rt:"Thái hậu nhìn ngươi: “Cách nào?”",rf:"Thái hậu cười lạnh."}]},
 t2:{h:"Đêm trước bài vị",w:"me",if:()=>S.thDead,t:"Ngươi quỳ trước bài vị Thái hậu, gói vải đặt bên cạnh.",o:[
  {n:"Khấn xin cô mẫu tha",wx:"Lòng +",lx:"người cũ của bà không biết",rt:"Nhang cháy thẳng một hàng."},
  {n:"Khấn hứa làm cho xong",f:"obey",wx:"lòng quyết",lx:"lời hứa với người chết khó gỡ",rt:"Ngươi lạy ba lạy."}]},
 x1:{h:"Gốc mai trong cung {v}",w:"v",t:()=>`Đêm mai {v} sang ${CHR_Q()} hầu yến. Cung nàng sẽ vắng một canh giờ. Gói vải vẫn trong tay ngươi.`,o:[
  {n:"Làm theo lệnh",e:["mid","lose"],go:(A,ok,G)=>{rdOan(A,"v",G[0]);if(!ok)return"";const v=rv67(A,"v");if(v)spAdd(v,"sung",G[1]);return CHR_TH(G[2])},rt:"Không ai thấy. Vài tháng sau, Hoàng thượng thôi đến cung {v}.",rf:()=>`Người canh của ${CHR_Q()} đào được gói vải ngay sáng hôm sau.`},
  {n:"Chôn gói vải ở nơi không ai đào",e:["win","mid"],go:(A,ok)=>{if(!ok&&!S.thDead){ap67({th:CHTH("ch_co_8.x1.1.th")});return fmt({th:CHTH("ch_co_8.x1.1.th")})}return""},rt:"Gói vải nằm dưới gốc mai trong cung ngươi. Lệnh coi như đã làm, không ai bị hại.",rf:"Ma ma của Đức Thọ cung đến xem, biết ngươi không chôn đúng chỗ."},
  {n:"Đến báo {v}, bắt nàng nợ ngươi",e:["win","lose"],go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} tái mặt, rồi quỳ: “Ơn này muội nhớ.”",rf:"{v} đem chuyện đi kể khắp lục cung, kể luôn tên Đức Thọ cung."},
  {n:"Trả gói vải, từ chối",e:"mid",lx:A=>S.thDead?"người cũ của Đức Thọ cung thất vọng":"cô mẫu không tha",go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_8.x1.3.th")})},rt:"Ngươi đặt gói vải lại chỗ cũ."}]}},
 E:{win:{tag:"Lệnh làm xong mà không ai chết",w:"me",t:"Lệnh coi như đã làm, {v} vẫn yên, và chỉ ngươi biết vì sao. Từ nay ngươi biết: lệnh cũng có thể đánh tráo."},
  mid:{tag:"Tay nhuốm hoặc lòng nặng",t:"Việc đã qua. Hoặc ngươi đã làm điều mình thấy sai, hoặc đã trái lệnh người che chở mình. Đêm về, ngươi khó ngủ."},
  lose:{tag:"Vụ búp bê vỡ lở",w:"me",t:"Gói vải bị tìm ra. Không ai bắt được tay ngươi, nhưng cả cung thì thầm tên Đức Thọ cung và tên ngươi bên nhau."}}});

rdDef("ch_co",9,{t:"Từ chối",w:"th",sj:"lời thề với Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Các vị trưởng lão họ ngoại vào kinh, muốn ngươi thề làm người giữ phần của cô mẫu. Thề thì có cả họ sau lưng; không thề thì một mình.":"Thái hậu muốn một lời thề: từ nay ngươi chỉ nghe bà. Thề thì có chỗ dựa mà mất mình; không thề thì mất chỗ dựa.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Cô mẫu ban thưởng",w:"th",need:["th"],if:RDW(1),t:"Thái hậu ban cho ngươi một chuỗi hạt trầm của bà, khen việc gói vải đã xong. Rồi bà hỏi: “Con có dám thề trọn đời nghe ai gia?”",o:[
  {n:"Nhận chuỗi hạt, chưa thề",f:"own",go:(A,ok)=>{if(ok)RD_FL("ch_co.hat",1)},wx:"giữ lời thề lại",lx:"bà nhận ra ngươi tránh",rt:"Thái hậu cười: “Không vội.”",rf:"Thái hậu thu tay về."},
  {n:"Thề ngay",f:"obey",go:()=>{RD_FL("ch_co.hat",1)},wx:"bà tin ngươi trọn",lx:"lời thề trói ngươi",rt:"Thái hậu đeo chuỗi hạt vào tay ngươi."},
  {n:"Trả chuỗi hạt, xin làm cháu chứ không làm quân cờ",f:"no",wx:"nói được lòng mình",lx:"bà lạnh mặt",rt:"Thái hậu im lặng, rồi bảo ngươi lui."}]},
 s2:{h:"Cô mẫu lạnh nhạt",w:"th",need:["th"],if:RDW(0),t:"Từ chuyện gói vải, Thái hậu không gọi ngươi. Nghe nói bà đã bảo với ma ma: “Đứa cháu này không dùng được.”",o:[
  {n:"Ngày ngày sang thỉnh an",f:"obey",wx:"bà mềm lòng",lx:"cả cung thấy ngươi bị bỏ ngoài cửa",rt:"Sáng thứ bảy, cửa mở.",rf:"Cửa không mở."},
  {n:"Gây dựng chỗ đứng riêng",f:"own",wx:"không lệ thuộc bà",lx:"không còn ai che",rt:"Ngươi bắt đầu mời các phi tần thấp phẩm sang uống trà."},
  {n:"Viết thư cho mẫu thân ở nhà",wx:"nhà biết ngươi khó",lx:"nhà ở xa, không giúp được",rt:"Mẫu thân hồi thư: “Con nhớ cô mẫu là người nhà.”"}]},
 s3:{h:"Trưởng lão họ ngoại vào kinh",w:"me",if:()=>S.thDead,t:"Ba vị trưởng lão họ ngoại xin vào thỉnh an. Họ mang theo gia phả: “Cô mẫu không còn. Nàng là người cao nhất của họ trong cung.”",o:[
  {n:"Tiếp đãi long trọng",f:"obey",wx:"họ ngoại vui",lx:"tốn bạc, Hoàng thượng thấy họ ngoại ra vào",rt:"Các trưởng lão gật gù."},
  {n:"Tiếp theo đúng lễ, không hơn",wx:"giữ phép",lx:"họ cho là ngươi lạnh",rt:"Các trưởng lão uống trà rồi về."},
  {n:"Hỏi thẳng họ muốn gì",f:"own",wx:"biết giá của lời thề",lx:"họ thấy ngươi hỗn",rt:"Họ muốn ngươi giữ ghế Cửu môn và kho muối cho họ.",rf:"Họ phật ý ra về."}]},
 c1:{h:"Lời thề có giá",w:"me",t:A=>S.thDead?"Họ ngoại đòi ngươi xin cho một người trong họ chức Tri phủ Giang Ninh trước tết Trung thu.":"Thái hậu đòi ngươi xin cho một người trong họ chức Tri phủ Giang Ninh trước tết Trung thu. “Thề rồi thì việc đầu tiên là việc này.”",o:[
  {n:"Gửi bạc cho họ ngoại tự lo chạy chức",wx:"kịp trước Trung thu",lx:"chạy chức bị lộ thì mất mặt cả họ",rt:"Họ ngoại lo lót bên ngoài; Lại bộ ghi tên người trong họ.",rf:"Ngự sử hặc Lại bộ nhận lễ."},
  {n:"Xin Hoàng thượng",wx:"không tốn bạc",lx:"ngài thấy ngươi đòi cho họ ngoại",rt:"Hoàng thượng phê, không hỏi gì.",rf:"Hoàng thượng bảo: “Lại bộ có phép của Lại bộ.”"},
  {n:"Để quá hạn",wx:"không cầu cạnh",lx:"bên đòi biết ngươi không làm",go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_9.c1.2.th")})},rt:"Trung thu qua, ghế ấy về người khác."}]},
 c2:{h:"{v} biết ngươi bị ép",w:"v",need:["v"],t:"{v} nhắn: “Tỷ cũng là quân cờ, muội cũng là quân cờ. Hay ta cùng đổi bàn?”",o:[
  {n:"Bắt tay với {v}",f:"own",wx:"có người đồng cảnh",lx:"{v} lật lọng",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} rót trà: “Từ nay hai ta không hại nhau.”",rf:"{v} đem lời ngươi đi kể."},
  {n:"Từ chối nhã nhặn",wx:"không mắc nợ",lx:"{v} lại đi tìm người khác",rt:"{v} cười, không giận."},
  {n:"Báo cho Đức Thọ cung",need:["th"],f:"obey",wx:"cô mẫu tin ngươi",lx:"{v} thành thù",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Thái hậu gật đầu: “Biết rồi.”"}]},
 c3:{h:"Hoàng thượng thấy ngươi buồn",w:"emp",t:"Hoàng thượng hỏi: “Mấy hôm nay nàng như có đá đè ngực.”",o:[
  {n:"Kể thật với ngài",wx:"ngài thương",lx:"ngài biết chuyện trong họ",rt:"Hoàng thượng ôm ngươi: “Có trẫm.”",rf:"Hoàng thượng chau mày: “Mẫu hậu lại thế.”"},
  {n:"Nói là nhớ nhà",wx:"ngài dỗ dành",lx:"không ai giúp được",rt:"Ngài cho người mang bánh quê đến."},
  {n:"Gượng cười",wx:"không phiền ngài",lx:"một mình gánh",rt:"Ngươi rót rượu cho ngài."}]},
 t1:{h:"Cô mẫu hỏi lần cuối",w:"th",need:["th"],t:"Thái hậu nói: “Ai gia hỏi lần cuối. Thề, hay đi.”",o:[
  {n:"Quỳ thề",f:"obey",wx:"bà che chở",lx:"lời thề nặng",rt:"Thái hậu đỡ ngươi dậy."},
  {n:"Thưa: con không thề, nhưng không bỏ cô mẫu",f:"own",wx:"bà hiểu ngươi",lx:"bà cho là ngươi cãi",rt:"Thái hậu nhìn ra cửa sổ rất lâu: “Ai gia biết rồi.”",rf:"Thái hậu đứng dậy đi vào trong."}]},
 t2:{h:"Gia phả họ ngoại",w:"me",if:()=>S.thDead,t:"Trưởng lão đặt gia phả trước mặt ngươi: “Ghi tên nàng làm người giữ phần của Thái hậu.”",o:[
  {n:"Nhận ghi tên",f:"obey",wx:"cả họ sau lưng",lx:"việc của cả họ đổ lên đầu",rt:"Tên ngươi được viết bằng mực son."},
  {n:"Xin để trống",f:"own",wx:"không bị trói",lx:"họ đi tìm người khác",rt:"Trưởng lão gấp gia phả lại."}]},
 x1:{h:"Quỳ ở Đức Thọ cung",w:"th",t:A=>S.thDead?"Trước bài vị Thái hậu, cả họ ngoại quỳ chờ lời ngươi.":"Cả hậu cung biết hôm nay ngươi phải trả lời Thái hậu. Ngươi quỳ ở thềm Đức Thọ cung.",o:[
  {n:"Thề, giữ chỗ dựa",e:["mid","lose"],go:(A,ok,G)=>CHR_TH(ok?G[0]:G[1]),rt:"Lời thề đã nói. Đức Thọ cung che ngươi, và ngươi thuộc về Đức Thọ cung.",rf:"Ngươi thề, nhưng giọng run. Người nghe đều biết lời ấy không thật."},
  {n:"Từ chối, nhận mất chỗ dựa",e:["win","lose"],go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_9.x1.1.th")})},rt:"Ngươi lạy ba lạy rồi đứng dậy. Cả cung kinh ngạc, nhưng không ai dám cười: người dám nói không với Đức Thọ cung thì không phải người yếu.",rf:"Ngươi đứng dậy, và cả cung biết ngươi không còn ai che."},
  {n:"Mặc cả: thề có điều kiện",e:["win","mid"],go:(A,ok)=>{if(!ok&&!S.thDead){ap67({th:CHTH("ch_co_9.x1.2.th")});return fmt({th:CHTH("ch_co_9.x1.2.th")})}return""},rt:"Ngươi thề nghe lời trong việc nhà, không nghe trong việc hại người. Bên kia lặng đi, rồi gật đầu.",rf:"Bên kia gật đầu, nhưng không tin."}]}},
 E:{win:{tag:"Nói không mà vẫn đứng",w:"me",t:"Ngươi không thành quân cờ, và cũng không bị bỏ. Từ nay người ta hỏi ý ngươi, không chỉ ra lệnh."},
  mid:{tag:"Lời thề đã nói",t:()=>RD_FL("ch_co.hat")?"Ngươi có chỗ dựa, đổi lại là một lời thề. Mỗi lần nhìn chuỗi hạt trầm, ngươi nhớ mình đã hứa gì.":"Ngươi có chỗ dựa, đổi lại là một lời thề. Mỗi lần bước qua thềm Đức Thọ cung, ngươi nhớ mình đã hứa gì."},
  lose:{tag:"Mất chỗ dựa",w:"me",t:"Bên kia quay lưng. Ngươi đứng một mình trong cung, và ai cũng biết."}}});

rdDef("ch_co",10,{t:"Người đánh cờ",w:"hh",sj:"thọ yến Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?`Giỗ đầu Thái hậu. ${CHR_Q()} muốn nhân dịp này thu hết người cũ của Đức Thọ cung. Lần này ngươi không chờ lệnh ai: nước cờ là của ngươi.`:`Thọ yến của Thái hậu. ${CHR_Q()} chuẩn bị một đòn: dâng sớ xin Thái hậu “an dưỡng”, giao lại mọi việc. Lần này ngươi không chờ lệnh: nước cờ là của ngươi.`,
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Tin lọt ra về tờ sớ",w:"eun",if:A=>RDW(1)()&&!S.thDead,t:()=>`Tai mắt cũ báo: ${CHR_Q()} đã soạn sẵn sớ, chỉ chờ thọ yến để dâng.`,o:[
  {n:"Báo ngay cho cô mẫu",need:["th"],f:"obey",wx:"bà có thời gian chuẩn bị",lx:"nước đi là của bà, không của ngươi",rt:"Thái hậu cười: “Để chúng dâng.”"},
  {n:"Giữ tin, tự tính",f:"own",wx:"nước đi là của ngươi",lx:"nếu hỏng, bà trách ngươi giấu",rt:"Ngươi ngồi bên đèn vẽ từng người sẽ ngồi đâu ở yến."},
  {n:"Lấy bản nháp tờ sớ",wx:"biết từng chữ",lx:"người lấy bị bắt",rt:"Bản nháp nằm trên bàn ngươi trước nửa đêm.",rf:"Người lấy bị bắt, khai là đi lấy hộ."}]},
 s2:{h:"Ngươi biết muộn",w:"me",if:A=>RDW(0)()&&!S.thDead,t:"Còn ba ngày đến thọ yến, ngươi mới nghe tin tờ sớ. Thái hậu chưa biết, hoặc biết mà không nói với ngươi.",o:[
  {n:"Vào báo cô mẫu",need:["th"],wx:"bà biết ngươi còn trung",lx:"bà đã biết từ trước",rt:"Thái hậu nghe, gật đầu: “Con còn nhớ ai gia.”",rf:"Thái hậu bảo: “Ai gia biết rồi.”"},
  {n:"Tìm người bên dâng sớ hỏi",wx:"biết ai sẽ dâng sớ",lx:"bên dâng sớ biết ngươi dò",rt:"Người dâng sớ sẽ là {v}.",rf:"Không ai nói."},
  {n:"Đứng ngoài",wx:"không dính",lx:"không có nước đi nào",rt:"Ngươi lo quà thọ như mọi năm."}]},
 s3:{h:"Giỗ đầu",w:"me",if:()=>S.thDead,t:()=>`Giỗ đầu Thái hậu. ${CHR_Q()} xin Hoàng thượng giải tán người cũ Đức Thọ cung, “cho cung ấy được yên”.`,o:[
  {n:"Lo lễ giỗ thật chu đáo",wx:"ai cũng thấy ngươi giữ hiếu",lx:"tốn bạc",rt:"Hoàng thượng đến dự, đứng lâu trước bài vị."},
  {n:"Gom người cũ lại một chỗ",wx:"không ai bị đuổi lẻ",lx:()=>`${CHR_Q()} thấy ngươi gom phe`,rt:"Người cũ của Đức Thọ cung về hầu cung ngươi.",rf:"Có người đã bị đuổi trước."},
  {n:"Để Hoàng thượng định",wx:"ngài thấy ngươi không tranh",lx:"người cũ tan",rt:"Ngươi chỉ quỳ dâng hương."}]},
 c1:{h:"{v} cầm sớ",w:"v",need:["v"],t:"{v} là người đứng tên dâng sớ. Nàng có thể rút tên, nếu có ai cho nàng lý do.",o:[
  {n:"Cho {v} lý do: nhắc ơn cũ",f:"own",wx:"{v} rút tên",lx:"{v} cho là ngươi kể ơn",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} cáo bệnh, không dự yến.",rf:"{v} đáp: “Ơn nào?”"},
  {n:"Cho {v} lý do: một chuyện xấu của nhà nàng",wx:"{v} sợ",lx:"{v} hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt, xin rút tên.",rf:"{v} vẫn dâng, còn kể thêm."},
  {n:"Để {v} dâng",wx:"biết trước nước của nàng",lx:"sớ vẫn đến tay vua",rt:"Ngươi để mặc."}]},
 c2:{h:"Hoàng hậu thăm dò",w:"hh",need:["hh","th"],t:"Hoàng hậu {hh} hỏi ngươi: “Muội thấy Thái hậu có nên nghỉ ngơi không? Bổn cung chỉ lo cho sức khỏe người.”",o:[
  {n:"Đáp: việc ấy để Thái hậu tự định",wx:"không mắc lời",lx:"Hoàng hậu biết ngươi không theo",rt:"Hoàng hậu cười, không hỏi nữa."},
  {n:"Ngầm hứa không cản",f:"two",wx:"Càn Ninh cung tin ngươi",lx:"Đức Thọ cung biết",rt:"Hoàng hậu nắm tay ngươi.",rf:"Thái hậu biết ngay chiều ấy."},
  {n:"Đề nghị một lối giữa",wx:"Hoàng hậu thấy ngươi có thể dàn xếp",lx:"bà thấy ngươi tham",rt:"Hoàng hậu nghe, mắt sáng lên.",rf:"Hoàng hậu bảo: “Muội nhỏ, đừng chen.”"}]},
 c3:{h:"Hoàng thượng muốn yên",w:"emp",need:["th"],t:"Hoàng thượng nói với ngươi: “Trẫm chỉ muốn thọ yến này không ai khóc.”",o:[
  {n:"Hứa với ngài sẽ giữ yên",wx:"ngài trông vào ngươi",lx:"lời hứa thì phải giữ",rt:"Hoàng thượng gật đầu."},
  {n:"Thưa thật chuyện tờ sớ",wx:"ngài có chuẩn bị",lx:()=>`${CHR_Q()} biết ai báo`,rt:"Hoàng thượng thở dài: “Trẫm biết rồi.”",rf:"Hoàng thượng phẩy tay: “Đàn bà các nàng.”"},
  {n:"Không nói gì",wx:"không dính",lx:"ngài không biết ngươi đứng đâu",rt:"Ngươi chỉ cười."}]},
 t1:{h:"Cô mẫu hỏi con tính gì",w:"th",need:["th"],t:"Đêm trước yến, Thái hậu gọi ngươi: “Ai gia nghe nói con có nước đi riêng. Nói ai gia nghe.”",o:[
  {n:"Kể hết kế của mình",f:"own",wx:"bà gật đầu cho ngươi đi",lx:"bà muốn tự đi",rt:"Thái hậu nghe xong, cười: “Đi đi.”",rf:"Thái hậu bảo: “Để ai gia.”"},
  {n:"Xin bà tin, không kể",wx:"nước đi giữ kín",lx:"bà không thích bị giấu",rt:"Thái hậu nhìn ngươi lâu: “Được.”",rf:"Thái hậu cau mày."},
  {n:"Xin bà ra tay, con theo",f:"obey",wx:"bà vui",lx:"nước đi lại là của bà",rt:"Thái hậu gật đầu."}]},
 t2:{h:"Người cũ hỏi",w:"me",if:()=>S.thDead,t:"Ma ma già hỏi: “{Goi} định giữ bọn nô tỳ, hay để bọn nô tỳ đi?”",o:[
  {n:"Giữ, ta lo",f:"own",wx:"người cũ một lòng",lx:"gánh thêm người",rt:"Ma ma quỳ lạy."},
  {n:"Đi thì có bạc, ở thì có việc",wx:"ai cũng có đường",lx:"tốn bạc",rt:"Một nửa ở, một nửa đi."}]},
 x1:{h:"Giữa thọ yến",w:"emp",t:A=>S.thDead?`Giữa lễ giỗ, ${CHR_Q()} dâng sớ xin giải tán Đức Thọ cung. Hoàng thượng nhìn ngươi.`:"Giữa thọ yến, tờ sớ xin Thái hậu an dưỡng được dâng lên. Cả điện im lặng. Thái hậu nhìn ngươi.",o:[
  {n:"Đứng dậy, đề nghị lối giữa",e:["win","lose"],rt:A=>S.thDead?"Ngươi xin giữ Đức Thọ cung làm nơi thờ, người cũ về hầu dưới tay ngươi. Hoàng thượng chuẩn.":`Ngươi xin Thái hậu giữ việc lễ nghi, giao sổ sách lục cung cho ${CHR_H()}, có ngươi phụ. Hai bên nhìn nhau, rồi cùng gật.`,rf:"Cả hai bên cùng thấy ngươi chen vào việc không phải của mình."},
  {n:"Lặng lẽ để cô mẫu tự đánh",need:["th"],e:["mid","lose"],go:(A,ok)=>{if(ok&&!S.thDead){ap67({th:CHTH("ch_co_10.x1.1.th")});return fmt({th:CHTH("ch_co_10.x1.1.th")})}return""},rt:"Thái hậu một câu đánh tan tờ sớ. Ngươi chỉ ngồi xem.",rf:"Thái hậu mệt, không đáp được hết. Tờ sớ được nhận."},
  {n:"Đứng về phía Càn Ninh cung",need:["hh"],e:["mid","lose"],f:"cn",go:(A,ok)=>{if(!S.thDead)ap67({th:CHTH("ch_co_10.x1.2.th")});if(ok){ap67({hh:CHTH("ch_co_10.x1.2.hh")});return fmt({hh:CHTH("ch_co_10.x1.2.hh")})}return""},rt:"Ngươi im lặng khi sớ được nhận. Càn Ninh cung ghi ơn.",rf:"Cả hai bên cùng khinh người đổi phe."},
  {n:"Nâng chén mừng thọ, lảng đi",e:"mid",lx:"không ai thắng, không ai nhớ ơn",rt:"Ngươi nâng chén, chuyện sớ bị bỏ lửng."}]}},
 E:{win:{tag:"Nước cờ của ngươi",w:"me",t:A=>S.thDead?`Đức Thọ cung được giữ làm nơi thờ, người cũ về dưới tay ngươi. ${CHR_Q()} lui, và cả cung biết ai đã đi nước ấy.`:`Thái hậu giữ được thể diện, ${CHR_H()} có được sổ sách, và ngươi đứng giữa. Lần đầu, cô mẫu nhìn ngươi như nhìn một người đánh cờ.`,go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_co_10.E.win.th")});return fmt({th:CHTH("ch_co_10.E.win.th")})}},
  mid:{tag:"Ván cờ của người khác",t:A=>A.f.cn?"Ván cờ đã đi, nhưng không phải nước của ngươi. Càn Ninh cung ghi một lần ơn; Đức Thọ cung ghi một lần phản.":"Ván cờ đã đi, nhưng không phải nước của ngươi. Ngươi vẫn an, chỉ là không ai nhớ ngươi đã ở đó."},
  lose:{tag:"Đức Thọ cung thua một ván",w:"me",t:A=>S.thDead?"Người cũ của Đức Thọ cung bị giải tán. Ngươi mất những đôi mắt cuối cùng của cô mẫu.":"Tờ sớ được nhận. Thái hậu phải giao bớt việc, và bà nhìn ngươi như nhìn một người đã không giữ được bà.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_co_10.E.lose.th")});return fmt({th:CHTH("ch_co_10.E.lose.th")})}}}});

rdDef("ch_co",11,{t:"Cô cháu",w:"th",sj:"cô cháu Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu đã khuất. Những gì bà để lại: người, sổ, ân oán, họ ngoại, cần một người nối. Đây là kết cục truyện xuất thân của ngươi.":"Thái hậu đã già. Bà muốn biết ván cờ cả đời bà sẽ giao cho ai. Ngươi là cháu, là quân cờ, hay là người ngồi bên kia bàn cờ. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Cô mẫu mở hộp gỗ",w:"th",need:["th"],if:RDW(1),t:"Thái hậu mở một hộp gỗ cũ: ấn riêng của Đức Thọ cung, sổ tên người, mấy lá thư. “Ai gia đang nghĩ nên để lại cho ai.”",o:[
  {n:"Xin cô mẫu dạy thêm, chưa nhận",f:"obey",wx:"bà vui được dạy",lx:"chưa có gì trong tay",rt:"Thái hậu kể cho ngươi nghe ván cờ năm bà mới vào cung."},
  {n:"Xin xem sổ tên người",f:"own",wx:"biết thế lực của bà lớn đến đâu",lx:"bà thấy ngươi vội",rt:"Thái hậu đưa sổ, chỉ từng tên.",rf:"Thái hậu gập hộp lại."},
  {n:"Thưa: con chỉ cần cô mẫu khỏe",wx:"bà cảm động",lx:"bà nghĩ ngươi không muốn gánh",rt:"Thái hậu cười, gõ nhẹ lên trán ngươi."}]},
 s2:{h:"Cô mẫu gọi cả {v}",w:"th",need:["th","v"],if:RDW(0),t:"Thái hậu gọi cả ngươi và {v} đến. “Ai gia già rồi. Hai đứa, đứa nào xứng?”",o:[
  {n:"Nhường {v}",wx:"{v} nợ ngươi",lx:"mất phần",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} sững người."},
  {n:"Xin cô mẫu thử cả hai",wx:"có dịp tỏ tài",lx:"thua thì mất mặt",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Thái hậu gật: “Được.” Ngươi làm tốt hơn.",rf:"{v} làm tốt hơn."},
  {n:"Thưa: con không tranh với người nhà",f:"obey",wx:"bà thấy ngươi biết phận",lx:"bà nghĩ ngươi yếu",rt:"Thái hậu gật đầu, không nói."}]},
 s3:{h:"Hộp gỗ của cô mẫu",w:"me",if:()=>S.thDead,t:"Ma ma già trao ngươi chiếc hộp gỗ của Thái hậu: ấn riêng Đức Thọ cung, sổ tên người, ân oán của bà. “Thái hậu dặn: đứa nào đến được ngày này thì giao.”",o:[
  {n:"Nhận hộp",f:"own",wx:"thế lực của cô mẫu trong tay",lx:"ân oán của bà cũng thành của ngươi",rt:"Hộp nặng như ngày đầu bà trao gói vải."},
  {n:"Dâng ấn lên Hoàng thượng, giữ sổ",wx:"ngài thấy ngươi không tham",lx:"ấn không còn trong tay",rt:"Hoàng thượng nhận ấn, trả lại cho ngươi một nụ cười."},
  {n:"Giao hộp cho họ ngoại",f:"obey",wx:"họ ngoại vui",lx:"không còn gì trong tay",rt:"Trưởng lão nhận hộp, cúi đầu."}]},
 c1:{h:"Những người còn nợ",w:"me",t:"Trong sổ có tên những người còn nợ Đức Thọ cung: một Thượng thư, hai phi tần, một thái y. Họ nghe tin, ai cũng chờ xem ai cầm sổ.",o:[
  {n:"Gặp từng người, nói rõ món nợ còn đó",f:"own",wx:"họ biết ai cầm sổ",lx:"có kẻ sợ quá mà phản",rt:"Ai cũng cúi đầu.",rf:()=>`Một phi tần chạy sang ${CHR_Q()}.`},
  {n:"Xóa nợ cho họ",wx:"người ta mang ơn thật",lx:"mất sức nắm",rt:"Thượng thư gửi thư tạ ơn, lời rất thật."},
  {n:"Giữ im",wx:"không động",lx:"họ đoán sai về ngươi",rt:"Ngươi cất sổ."}]},
 c2:{h:"{v} muốn phần",w:"v",need:["v"],t:"{v} đến: “Tỷ muội cùng hầu Đức Thọ cung bao năm. Muội không đòi nhiều, chỉ đòi một phần.”",o:[
  {n:"Chia cho {v} một phần",wx:"có thêm đồng minh",lx:"{v} lấy phần rồi lấy thêm",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nhận, thề không lấy quá.",rf:"{v} nhận rồi lén gặp người trong sổ."},
  {n:"Từ chối",wx:"thế lực không chia",lx:"{v} thành đối thủ",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cười nhạt bỏ đi."},
  {n:"Đổi phần lấy lời hứa",wx:"{v} nợ một lời",lx:"lời hứa của {v} không đáng tin",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0])},rt:"{v} hứa sẽ đứng về phía ngươi khi tranh ngôi Trung cung.",rf:"{v} hứa rồi quên."}]},
 c3:{h:"Hoàng thượng hỏi về họ ngoại",w:"emp",t:"Hoàng thượng hỏi: “Họ ngoại của mẫu hậu, sau này nàng định để họ thế nào?”",o:[
  {n:"Xin ngài giữ họ, ngươi gánh",wx:"họ ngoại còn chỗ",lx:"ngài thấy ngươi giữ phe",rt:"Hoàng thượng gật: “Có nàng thì được.”",rf:"Hoàng thượng không đáp."},
  {n:"Xin ngài xử theo phép",wx:"ngài tin ngươi",lx:"họ ngoại có kẻ mất ghế",rt:"Hoàng thượng cười, nắm tay ngươi."},
  {n:"Thưa: việc triều thần thiếp không dám bàn",wx:"giữ phép",lx:"không giúp ai",rt:"Ngài gật đầu."}]},
 t1:{h:"Câu hỏi cuối của cô mẫu",w:"th",need:["th"],t:"Thái hậu hỏi: “Cả đời ai gia dạy con đánh cờ. Giờ con muốn làm cháu, làm quân cờ, hay làm người ngồi bên kia bàn?”",o:[
  {n:"Làm người ngồi bên kia bàn",f:"own",wx:"bà nể ngươi",lx:"gánh nặng như bà",rt:"Thái hậu đẩy hộp gỗ về phía ngươi một tấc."},
  {n:"Làm cháu của cô mẫu",f:"obey",wx:"bà cười",lx:"vẫn trong ván cờ của bà",rt:"Thái hậu xoa đầu ngươi như ngày ngươi mới vào cung."},
  {n:"Bỏ bàn cờ",f:"no",wx:"Lòng +",lx:"bà thất vọng",go:()=>{ap67({th:CHTH("ch_co_11.t1.2.th")})},rt:"Thái hậu nhìn ngươi rất lâu: “Có lẽ con đúng.”"}]},
 t2:{h:"Bài vị và chiếc hộp",w:"me",if:()=>S.thDead,t:"Ngươi đặt chiếc hộp trước bài vị cô mẫu. Nhang cháy, không ai trả lời thay bà.",o:[
  {n:"Khấn: con sẽ ngồi chỗ của cô mẫu",f:"own",wx:"lòng quyết",lx:"ân oán của bà thành của ngươi",rt:"Ngọn nhang cháy thẳng."},
  {n:"Khấn: con xin buông",f:"no",wx:"Lòng +",lx:"người cũ không còn ai để theo",rt:"Ngươi lạy ba lạy."}]},
 x1:{h:"Ván cờ cuối",w:"th",t:A=>S.thDead?"Người cũ Đức Thọ cung, họ ngoại, những người còn nợ đều chờ ở sân. Ngươi bước ra.":"Thái hậu cho gọi cả họ ngoại và người cũ Đức Thọ cung vào điện. Bà chờ ngươi nói trước.",o:[
  {n:"Xin cô mẫu cho ngồi cùng bàn",need:["th"],if:()=>S.th>=netTh("th","than2"),e:["win","lose"],rt:"Thái hậu đặt ấn riêng vào tay ngươi trước mặt cả họ: “Từ nay, việc của ai gia, hỏi nó.”",rf:"Thái hậu thấy ngươi đòi quá sớm. Bà đóng hộp, cả họ quay đi."},
  {n:"Đứng ra nhận phần của cô mẫu",e:["win","lose"],rt:"Ngươi nói rõ: người nào giữ, nợ nào xóa, ân oán nào dừng. Không ai cãi.",rf:"Người cũ không phục. Họ ngoại chia năm xẻ bảy."},
  {n:"Quỳ, thưa vẫn là cháu ngoan",need:["th"],e:["mid","lose"],go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_11.x1.2.th")})},rt:"Ngươi giữ lễ trọn vẹn. Không ai trách, và không ai giao gì.",rf:"Người ta thấy ngươi yếu, tự đi tìm chủ khác."},
  {n:"Trả hết, xin đứng ngoài",e:"mid",lx:"thế lực Đức Thọ cung không còn đứng sau ngươi",rt:()=>RD_FL("ch_co.hat")?"Ngươi dâng ấn, dâng sổ, chỉ giữ chuỗi hạt trầm.":"Ngươi dâng ấn, dâng sổ, không giữ lại một thứ gì."}]}},
 E:{win:{tag:"Người nối ván cờ Đức Thọ cung",w:"me",t:A=>S.thDead?"Người cũ, họ ngoại, những món nợ của cô mẫu, giờ đều trong tay ngươi. Đức Thọ cung không còn chủ, nhưng thế lực của nó có người nối.":"Thái hậu và ngươi ngồi cùng một bàn cờ. Người trong cung gọi ngươi là “nửa Đức Thọ cung”, và bà không giận.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_co_11.E.win.th")});return fmt({th:CHTH("ch_co_11.E.win.th")})}},
  mid:{tag:"Cháu ngoan giữ lễ",t:"Ngươi không nối ván cờ, cũng không bỏ nó. Họ ngoại vẫn gọi ngươi là cháu ngoan, và ngươi tự đi đường mình."},
  lose:{tag:"Đức Thọ cung quay lưng",w:"me",t:A=>S.thDead?"Người cũ tan, họ ngoại tìm chỗ dựa khác. Ngươi vẫn là phi tần của Hoàng thượng, nhưng sau lưng không còn ai mang họ cô mẫu.":"Thái hậu đóng hộp gỗ, giao cho người khác. Cô cháu vẫn gặp nhau mỗi sáng, nhưng chỉ còn lễ, không còn lòng.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_co_11.E.lose.th")});return fmt({th:CHTH("ch_co_11.E.lose.th")})}}}});
RD97L.push(rdRare({a:"ch_co_11",tag:"Cô mẫu trao ấn Đức Thọ cung",w:"th",need:"th",n:"Quỳ xin cô mẫu đốt sổ ân oán trước khi trao ấn",
 path:["Xin cô mẫu dạy thêm","Thưa: con chỉ cần cô mẫu khỏe","Xóa nợ cho họ","Làm người ngồi bên kia bàn","Xin ngài xử theo phép","Đổi phần lấy lời hứa"],bad:["Từ chối","Bỏ bàn cờ"],x:[()=>!S.thDead&&(S.th||0)>=netTh("th","than2")&&S.duc>=RR("ch_co_11").bar,"Thái hậu còn, với ngươi đủ thiện cảm, Đức từ "+RR("ch_co_11").bar],
 t:"Thái hậu nhìn cuốn sổ ân oán cháy trong lò, rồi bật cười: “Ai gia giữ nó bốn mươi năm, con đốt nó trong một khắc.” Bà trao ấn riêng Đức Thọ cung cho ngươi trước mặt Hoàng thượng. Ngài đứng dậy cúi đầu với mẹ, rồi quay sang ngươi: từ nay, ngài nói, những gì mẫu hậu gánh, nàng gánh cùng trẫm.",
 go:()=>{if(!S.thDead)ap67({th:CHTH("ch_co_11.rare.th")});return""},rw:"ngocboi",ti:"Người giữ ấn Đức Thọ cung"}));
/* ---------- ch_benh · Thái hậu lâm bệnh ---------- */
/* ch_benh: Thái hậu → ta thiện cảm netTh("th","than") (her nết, ROW 9) needed for the .11 option "xin cô mẫu trao người" and the rare finale */
/* Thái hậu's death uses the game's own state (j13/j4): S.thDead=true, S.th=0 (S.thIll cleared). It can happen at .10 (lose) or .11
   (mid/lose), or earlier by the j13 illness roll; every chapter keeps an opening, a turning beat and a climax for S.thDead.
   .10 has two extra endings (dwin/dlose) for a life where she was already dead before the chapter. */
rdDef("ch_benh",5,{t:"Thuốc thang",w:"doc",sj:"phương thuốc cho Thái hậu",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu đã băng hà giữa lúc thầy thuốc còn tranh nhau. Hoàng thượng cho tra lại mọi phương thuốc bà đã uống. Ai mang tội là Hoàng thượng phê; lời ngươi chỉ làm ngài nghe về một phía.":"Thái hậu qua cơn nguy, nhưng bệnh chưa dứt. Viện phán Thái y viện và lương y họ Tôn, thầy thuốc ngoài cung được Hoàng thượng xuống chỉ gọi vào, bắt mạch ra hai bệnh khác nhau. Ai được sắc thuốc cho bà, ngươi phải chọn.",
 p:[["s1","s2","s3"],["c1","c2","c3","c4"],["t1","t2"],["x1","x2"]],
 B:{c4:{h:"Thái y viện và lương y",w:"doc",if:()=>S.thDead,t:"Trong lúc chờ tra, Viện phán sai người nhắn ngươi: nếu ngươi đứng về Thái y viện, Thái y viện sẽ không quên. Lương y họ Tôn thì chỉ xin được nói thật.",o:[
  {n:"Nhận lời Viện phán",f:"vien",wx:"Thái y viện nợ ngươi",lx:"lương y một mình chịu tội",rt:"Viện phán cúi đầu thật thấp."},
  {n:"Xin Hoàng thượng cho lương y ở lại chờ tra",f:"ton",wx:"y không bị giam trước khi tra",lx:"tốn bạc lo cho y, Thái y viện oán ngươi",rt:"Hoàng thượng chuẩn: lương y họ Tôn ở lại gian nhỏ sau Đức Thọ cung chờ tra."},
  {n:"Không nhận lời ai",wx:"tay sạch",lx:"không ai đứng về phía ngươi",rt:"Ngươi đóng cửa cung chép kinh."}]},
 s1:{h:"Sau cơn nguy",w:"th",need:["th"],if:RDW(1),t:A=>rdPrev()==="r97"?"Ngươi đang tạm cầm phượng ấn cho Đức Thọ cung. Việc đầu tiên trên bàn: chén thuốc đổi màu đã khiến Thái y viện bị tra; Viện phán cúi đầu nhận lỗi, rồi xin Thái hậu cho Thái y viện được sắc thuốc lại như cũ.":rdPrev().startsWith("win")&&rdPrev()!=="win"?"Thái hậu giao ngươi phụ việc lục cung. Việc đầu tiên trên bàn: Thái y viện xin thêm bạc mua dược liệu cho Đức Thọ cung, và Viện phán xin đuổi lương y họ Tôn.":"Thái y viện bị tra vì chén thuốc hôm trước. Viện phán cúi đầu nhận lỗi, rồi xin Thái hậu cho Thái y viện được sắc thuốc lại như cũ.",o:[
  {n:"Xin Hoàng thượng chuẩn cho lương y họ Tôn ở lại bên cô mẫu",f:"ton",wx:"người ngươi tin ở cạnh bà",lx:"tốn bạc nuôi thầy, Thái y viện mất mặt",rt:"Hoàng thượng chuẩn. Lương y họ Tôn dọn vào một gian nhỏ sau Đức Thọ cung."},
  {n:"Trả việc sắc thuốc cho Thái y viện",f:"vien",wx:"Thái y viện nợ ngươi một lần",lx:"chén thuốc lại qua tay người cũ",rt:"Viện phán dập đầu tạ ơn."},
  {n:"Để hai bên cùng bắt mạch, ngươi đọc phương",wx:"không ai qua mặt được ngươi",lx:"cả hai bên cho là ngươi không tin họ",rt:"Ngươi đọc cả hai phương, thấy chỗ khác nhau.",rf:"Hai phương đầy chữ thuốc, ngươi đọc không ra."}]},
 s2:{h:"Bệnh trở lại",w:"th",need:["th"],if:RDW(0),t:"Chưa đầy tháng, Thái hậu ho lại. Lời ngươi lần trước làm Thái y viện mất mặt; nay họ đóng cửa, chỉ cử thái y trẻ nhất sang.",o:[
  {n:"Đến Thái y viện xin Viện phán",f:"vien",wx:"Viện phán đích thân sang",lx:"bị bắt đợi ngoài sân",rt:"Viện phán xách hòm thuốc theo ngươi.",rf:"Viện phán cáo bệnh."},
  {n:"Xin Hoàng thượng xuống chỉ gọi lương y họ Tôn vào lại",f:"ton",wx:"có thầy thuốc ngươi tin",lx:"chỉ không xuống, bệnh Thái hậu kéo dài, bà trách ngươi",rt:"Hoàng thượng chuẩn. Lương y họ Tôn cầm chỉ vào bằng cửa Tây Hoa.",rf:"Hoàng thượng bảo: “Đã có Thái y viện.” Thị vệ không cho người ngoài vào."},
  {n:"Tự hầu thuốc ngày đêm",wx:"bà biết ngươi ở bên",lx:"Sức −−",rt:"Thái hậu ngủ được một giấc dài."}]},
 s3:{h:"Tra phương thuốc",w:"emp",if:()=>S.thDead,t:"Thái hậu đã băng hà. Hoàng thượng sai thu hết phương thuốc bà đã uống, giao Thái y viện và lương y họ Tôn mỗi bên viết một bản trình.",o:[
  {n:"Xin được đọc cả hai bản trình",wx:"biết hai bên nói gì",lx:"ngài thấy ngươi xen việc",rt:"Hoàng thượng cho ngươi ngồi đọc bên cạnh ngài.",rf:"Hoàng thượng bảo: “Nàng nghỉ đi.”"},
  {n:"Bảo lương y họ Tôn viết thật",f:"ton",wx:"lời thật",lx:"lương y có thể tự chuốc tội",rt:"Lương y họ Tôn viết suốt đêm."},
  {n:"Đứng ngoài, chỉ để tang",wx:"giữ hiếu",lx:"không ai nghe ngươi",rt:"Ngươi mặc áo trắng, không ra khỏi cung."}]},
 c1:{h:"Hai thầy hai bệnh",w:"doc",need:["th"],t:"Viện phán nói bệnh Thái hậu do nhiệt, phải dùng thuốc mát. Lương y họ Tôn nói do hàn, phải dùng thuốc ấm. Uống sai thì nặng thêm.",o:[
  {n:"Tin Viện phán",f:"vien",wx:"Thái y viện vui",lx:"nếu sai, lương y không còn đường nói",rt:"Thái y viện sắc thuốc mát."},
  {n:"Tin lương y họ Tôn",f:"ton",wx:"theo người ngươi tin",lx:"Thái y viện oán ngươi",rt:"Thuốc ấm vào, đêm ấy bà ngủ yên.",rf:"Thái y viện tâu lên: phi tần chọn thuốc thay thái y."},
  {n:"Đọc sách thuốc, tự xét",wx:"tự biết ai đúng",lx:"đọc mãi không ra",rt:"Ngươi tìm ra một dòng trong sách thuốc cổ «Thương hàn luận» khớp với bệnh.",rf:"Sách thuốc nói cả hai đều có lý."}]},
 c2:{h:"{v} dâng thầy",w:"v",need:["v","th"],t:"{v} tiến một vị đạo sĩ “chữa bệnh bằng bùa”, nói đã cứu mẹ nàng. Nàng muốn có công với Đức Thọ cung.",o:[
  {n:"Chặn đạo sĩ ngoài cửa",wx:"Đức Thọ cung khỏi trò bùa chú",lx:"{v} nói ngươi giành công",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng thượng nghe chuyện bùa, phẩy tay đuổi đạo sĩ.",rf:"{v} khóc trước mặt Hoàng thượng."},
  {n:"Để đạo sĩ làm lễ, thuốc vẫn của ngươi",wx:"{v} có công, ngươi giữ thuốc",lx:"cả cung tưởng bùa chữa khỏi",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Đạo sĩ đốt bùa, khói mù cả điện."},
  {n:"Dò lai lịch đạo sĩ",wx:"biết đạo sĩ là ai",lx:"bị nói là đa nghi",rt:"Đạo sĩ từng bán thuốc giả ở Giang Nam.",rf:"Không ai biết gì về hắn."}]},
 c3:{h:"Hoàng hậu nhận coi thuốc",w:"hh",need:["hh","th"],t:"Hoàng hậu {hh} tâu: Thái hậu bệnh, Trung cung phải lo thuốc thang, đó là phép. Bà muốn mọi chén thuốc qua tay người Càn Ninh cung.",o:[
  {n:"Thưa: cháu ruột hầu thuốc mới là phép",wx:"giữ được chén thuốc",lx:"Hoàng hậu thấy ngươi cãi",rt:"Hoàng thượng phán: “Để nàng ấy hầu.”",rf:"Hoàng thượng giao cho Hoàng hậu."},
  {n:"Đề nghị hai cung cùng coi",wx:"Hoàng hậu có mặt mũi",lx:"thêm một người cầm chén thuốc",rt:"Hoàng hậu gật đầu, cử một ma ma sang."},
  {n:"Nhường Hoàng hậu",wx:"Càn Ninh cung vui",lx:"chén thuốc không còn trong tay ngươi",rt:"Người Càn Ninh cung dọn vào gian thuốc."}]},
 t1:{h:"Cô mẫu không chịu uống",w:"th",need:["th"],t:"Thái hậu hất chén thuốc: “Ai gia uống thuốc đắng cả đời rồi.”",o:[
  {n:"Quỳ dâng lại",wx:"bà uống",lx:"bà giận",rt:"Thái hậu uống, rồi đưa cho ngươi miếng mứt.",rf:"Thái hậu quay mặt vào tường."},
  {n:"Đổi thuốc thành canh",wx:"bà dễ uống",lx:"tốn bạc, thuốc nhạt đi",rt:"Thái hậu ăn hết bát canh."},
  {n:"Để bà nghỉ một hôm",wx:"bà dễ chịu",lx:"bệnh không chờ",rt:"Thái hậu ngủ, ngươi ngồi quạt."}]},
 t2:{h:"Gian thuốc bỏ trống",w:"me",if:()=>S.thDead,t:"Gian sắc thuốc của Đức Thọ cung đóng cửa. Trên giá còn ba thang thuốc chưa sắc.",o:[
  {n:"Giữ ba thang thuốc lại",wx:"có vật chứng",lx:"giữ thuốc của người đã khuất thì bị nói",rt:"Ngươi gói ba thang thuốc vào khăn lụa."},
  {n:"Để Nội vụ phủ thu",wx:"đúng phép",lx:"vật chứng đi mất",rt:"Nội vụ phủ mang đi cả giá thuốc."}]},
 x1:{h:"Hội chẩn trước Hoàng thượng",w:"emp",need:["th"],t:"Hoàng thượng cho gọi Viện phán và lương y họ Tôn đến Đức Thọ cung, bắt mạch trước mặt ngài. Ngài hỏi ngươi: “Nàng ở cạnh mẫu hậu nhiều nhất. Nàng tin ai?”",o:[
  {n:"Tin lương y họ Tôn",e:["win","lose"],rt:"Lương y bắt mạch, nói đúng từng cơn ho của Thái hậu. Hoàng thượng giao thuốc cho y.",rf:"Viện phán chỉ ra một chỗ sai trong phương của y. Lương y bị đuổi khỏi cung."},
  {n:"Tin Viện phán",e:["mid","lose"],rt:"Thái y viện giữ việc, nhưng phải để lương y họ Tôn xem cùng.",rf:"Thuốc của Thái y viện vào, bà ho nặng hơn."},
  {n:"Xin hai bên cùng viết phương, ngươi chọn từng vị",e:["win","mid"],rt:"Ngươi chọn từng vị, Hoàng thượng gật đầu theo từng chữ. Phương thuốc ấy về sau gọi là phương của Đức Thọ cung.",rf:"Phương thuốc ghép, không bên nào dám nhận phần."}]},
 x2:{h:"Bản trình cuối",w:"emp",if:()=>S.thDead,t:"Hai bản trình đặt trên long án. Một bản đổ lỗi cho thuốc ấm của lương y, một bản cho thuốc mát của Thái y viện. Hoàng thượng hỏi ngươi.",o:[
  {n:"Đứng về phía lương y họ Tôn",e:["win","lose"],rt:"Hoàng thượng nghe lời ngươi, phê: Thái y viện bị phạt bổng, lương y được giữ lại.",rf:"Hoàng thượng phê: lương y bị bắt giam chờ xét."},
  {n:"Đứng về phía Thái y viện",e:["mid","lose"],rt:"Hoàng thượng phê: Thái y viện được yên, lương y không mang tội, ở lại làm chứng.",rf:"Hoàng thượng phê: lương y bị đánh trượng."},
  {n:"Xin ngài đừng trị ai",e:"mid",lx:"không ai biết thật hư",rt:"Hoàng thượng thở dài, gấp cả hai bản trình."}]}},
 E:{win:{tag:"Lương y họ Tôn được tin",w:"doc",t:A=>S.thDead?"Lương y họ Tôn được giữ lại trong cung. Ngươi có một thầy thuốc tin được, và Thái y viện biết ngươi có tiếng nói.":"Lương y họ Tôn sắc thuốc cho Thái hậu. Bà khá dần, và biết ai đã giữ người thầy ấy bên bà.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_benh_5.E.win.th")});return fmt({th:CHTH("ch_benh_5.E.win.th")})}},
  mid:{tag:"Hai phe thầy thuốc cùng giữ",t:"Thái y viện và lương y cùng ở, cùng nhìn nhau. Mỗi chén thuốc đi qua hai tay."},
  lose:{tag:"Thái y viện thắng thế",w:"doc",t:"Lương y họ Tôn bị đưa ra khỏi cung. Thái y viện giữ hết việc thuốc, và họ nhớ ai đã đưa người ngoài vào."}}});

rdDef("ch_benh",6,{t:"Kẻ rục rịch",w:"v",sj:"những người đổi chỗ dựa",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Đức Thọ cung không còn chủ. Phi tần từng thỉnh an Thái hậu mỗi sáng nay đổi đường sang cung khác. {v} đi đầu.":`Đức Thọ cung đóng cửa đã lâu. Phi tần từng thỉnh an Thái hậu mỗi sáng nay đổi đường sang ${CHR_Q()}. {v} đi đầu. Lễ tế tổ sắp đến, mà Thái hậu không đứng dậy nổi.`,
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1"]],
 B:{s1:{h:"Ngươi có tiếng nói",w:"v",need:["th"],if:RDW(1),t:"Từ ngày lương y họ Tôn được tin, người ta biết ngươi có tiếng nói ở Đức Thọ cung. {v} đến cửa xin ngươi chỉ cho một chỗ hầu thuốc.",o:[
  {n:"Cho {v} một chỗ hầu",wx:"{v} nợ ngươi",lx:"{v} ở gần Thái hậu",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cảm ơn, mắt nhìn quanh gian thuốc."},
  {n:"Từ chối khéo",wx:"Đức Thọ cung vẫn kín",lx:()=>`{v} quay sang ${CHR_Q()}`,go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cười, không nói gì."},
  {n:"Hỏi {v} vì sao muốn hầu",wx:"biết ý {v}",lx:"{v} thấy bị nghi",rt:"{v} lỡ lời: nhà nàng muốn biết Thái hậu còn được bao lâu.",rf:"{v} đáp khéo, ngươi không biết thêm gì."}]},
 s2:{h:"Cửa cung vắng",w:"me",need:["th"],if:RDW(0),t:()=>`Sáng nay chỉ còn ngươi và hai Đáp ứng đến thỉnh an Đức Thọ cung. Đường sang ${CHR_Q()} thì đông.`,o:[
  {n:"Giữ lệ thỉnh an mỗi sáng",wx:"Thái hậu biết ai còn ở lại",lx:"cả cung cho là ngươi chọn sai bên",rt:"Thái hậu hỏi tên hai Đáp ứng, ghi nhớ."},
  {n:"Ghé Càn Ninh cung một lần",need:["hh"],wx:"có đường lui",lx:"Đức Thọ cung biết",rt:"Hoàng hậu tiếp ngươi khách sáo.",rf:"Tin ngươi ghé Càn Ninh cung về đến Đức Thọ cung trước cả ngươi."},
  {n:"Kéo hai Đáp ứng về cùng một lòng",wx:"có người cùng giữ Đức Thọ cung",lx:"tốn bạc",rt:"Hai Đáp ứng nhận quà, hứa đi cùng ngươi."}]},
 s3:{h:"Đức Thọ cung không chủ",w:"me",if:()=>S.thDead,t:"Đức Thọ cung khóa cửa. Người cũ của bà chưa biết về đâu, và phi tần thì đã biết họ sẽ về đâu.",o:[
  {n:"Nhận người cũ về cung mình",wx:"có tai mắt cũ",lx:"tốn bạc, bị nói là gom phe",rt:"Ma ma già của Đức Thọ cung về hầu ngươi."},
  {n:"Xin Hoàng thượng giữ Đức Thọ cung như cũ",wx:"nơi ấy còn là nơi thờ",lx:"ngài thấy ngươi nặng chuyện cũ",rt:"Hoàng thượng chuẩn.",rf:"Hoàng thượng bảo để sau."},
  {n:"Để mọi việc theo phép",wx:"không gây chuyện",lx:"người cũ tan",rt:"Ngươi chỉ lo phần tang."}]},
 c1:{h:"{v} đổi chỗ dựa",w:"v",need:["v"],t:()=>`{v} ngày nào cũng ở ${CHR_Q()}, tay bưng trà, miệng kể chuyện Đức Thọ cung.`,o:[
  {n:"Cho {v} một tin giả",wx:"{v} kể sai",lx:"tin giả bị lật",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:()=>`{v} kể với ${CHR_H()} rằng Thái hậu sắp khỏe; ${CHR_Q()} chững lại.`,rf:"{v} nhận ra tin giả."},
  {n:"Nói chuyện thẳng với {v}",wx:"{v} thôi kể",lx:"{v} càng kể",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} cúi mặt: “Muội cũng phải tìm chỗ dựa.”",rf:"{v} cười nhạt."},
  {n:"Mặc kệ",wx:"không thêm chuyện",lx:()=>`${CHR_Q()} biết hết`,rt:"Ngươi không để tâm."}]},
 c2:{h:"Bạc Đức Thọ cung bị cắt",w:"hh",need:["hh","th"],t:"Nội vụ phủ cắt bớt bạc tháng của Đức Thọ cung, nói là Thái hậu bệnh thì tiêu ít. Lệnh có ấn Càn Ninh cung.",o:[
  {n:"Bù bạc từ cung mình",wx:"Đức Thọ cung không thiếu",lx:"tốn bạc",rt:"Ma ma Đức Thọ cung nhận bạc, khóc."},
  {n:"Tâu Hoàng thượng",wx:"bạc được trả lại",lx:"Hoàng hậu biết ai tâu",rt:"Hoàng thượng sai Nội vụ phủ trả đủ.",rf:"Hoàng thượng bảo việc ấy để Hoàng hậu lo."},
  {n:"Gặp Hoàng hậu xin",wx:"không động đến vua",lx:"bị coi là đi xin",rt:"Hoàng hậu trả một nửa.",rf:"Hoàng hậu cười: “Phép là phép.”"}]},
 c3:{h:"Hai Đáp ứng đổi lòng",w:"me",t:"Hai Đáp ứng trước nay hay đến Đức Thọ cung gửi lời xin lỗi: nhà họ dặn phải theo người đang lên.",o:[
  {n:"Tha cho họ đi",wx:"họ nhớ ơn",lx:"mất người",rt:"Hai người lạy rồi lui."},
  {n:"Giữ họ bằng một ân điển",wx:"họ ở lại",lx:"nhận quà rồi vẫn đi",rt:"Họ ở lại, thêm một người nữa xin theo.",rf:"Họ nhận rồi vẫn đi."},
  {n:"Ghi tên họ",wx:"biết ai không bền",lx:"không giữ được",rt:"Ngươi ghi tên họ vào sổ riêng."}]},
 t1:{h:"Cô mẫu hỏi ai còn đến",w:"th",need:["th"],t:"Thái hậu hỏi khẽ: “Sáng nay ai đến?” Bà đếm trên đầu ngón tay.",o:[
  {n:"Kể thật",wx:"bà biết ai trung",lx:"bà buồn",rt:"Thái hậu lặng đi."},
  {n:"Nói còn nhiều người đến",wx:"bà yên lòng",lx:"dối bà",rt:"Thái hậu cười, ngủ thiếp đi."},
  {n:"Kể và xin bà cho ngươi đứng thay ở lễ tế",f:"stand",wx:"bà gật đầu cho ngươi đứng",lx:"bà thấy ngươi đòi",rt:"Thái hậu bảo: “Đi đi.”",rf:"Thái hậu không đáp."}]},
 t2:{h:"Bài vị cần người dâng hương",w:"me",if:()=>S.thDead,t:"Lễ tế tổ năm nay, bài vị Thái hậu được rước vào Phụng Tiên điện lần đầu. Ai dâng hương thay Thái hậu trong hàng nội mệnh phụ là việc lớn.",o:[
  {n:"Xin dâng hương thay Thái hậu trong hàng nội mệnh phụ",f:"stand",wx:"ngươi được đứng trước",lx:"ngài thấy ngươi đòi",rt:"Hoàng thượng chuẩn.",rf:()=>`Hoàng thượng giao cho ${CHR_H()}.`},
  {n:"Không xin",wx:"giữ phép",lx:"người khác đứng trước",rt:"Ngươi đứng hàng sau."}]},
 x1:{h:"Lễ tế tổ",w:"emp",t:A=>`Lễ tế tổ ở Phụng Tiên điện. ${S.thDead?"Bài vị Thái hậu lần đầu được rước vào.":"Chỗ của Thái hậu bỏ trống."} ${qOn()?"Hoàng hậu {hh} và {v}":"{v}"} cùng nhìn chỗ ấy.`,o:[
  {n:"Bước lên đứng thay Đức Thọ cung",e:["win","lose"],rt:"Ngươi bước lên, không ai cản. Hoàng thượng gật đầu: đó là chỗ của cháu Thái hậu.",rf:"Lễ quan bước ra ngăn: phép không cho phi tần đứng hàng ấy."},
  {n:"Mời Hoàng hậu đứng, ngươi đứng kề",need:["hh"],e:["mid","lose"],go:()=>{ap67({hh:CHTH("ch_benh_6.x1.1.hh")});return fmt({hh:CHTH("ch_benh_6.x1.1.hh")})},rt:"Hoàng hậu đứng trước, ngươi đứng kề. Ai cũng thấy ngươi biết lễ.",rf:"Hoàng hậu đứng trước, kéo {v} đứng kề, ngươi bị đẩy xuống."},
  {n:"Nhường {v} để nàng nợ ngươi",e:["mid","lose"],go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} đứng hàng ấy, liếc ngươi một cái rất lâu.",rf:"{v} đứng rồi, coi như chỗ ấy vốn của nàng."},
  {n:"Đứng đúng hàng của mình",e:"mid",lx:"chỗ của Đức Thọ cung để trống",rt:"Ngươi đứng đúng phẩm, không nhìn chỗ trống."}]}},
 E:{win:{tag:"Ngươi đứng thay Đức Thọ cung",w:"me",t:"Cả cung thấy ngươi đứng ở chỗ của Đức Thọ cung. Ai đang tính đổi chỗ dựa, nay tính lại.",go:(A,G)=>{rdOan(A,"v",G[0]);if(S.thDead)return"";ap67({th:CHTH("ch_benh_6.E.win.th")});return fmt({th:CHTH("ch_benh_6.E.win.th")})}},
  mid:{tag:"Đứng hàng thứ hai",t:"Ngươi không mất mặt, cũng không được thêm gì. Người ta vẫn đang chờ xem."},
  lose:{tag:"{v} đứng chỗ của ngươi",w:"v",t:"{v} đứng ở chỗ lẽ ra của ngươi. Từ hôm ấy, người ta thỉnh an nàng trước."}}});

rdDef("ch_benh",7,{t:"Đầu độc?",w:"doc",sj:"chén thuốc có độc",cast(A){if(!rdCast(A,["v"]))return false;try{S.st.f14.chbv=A.act.v}catch(e){}return true},
 g:A=>(CHR_TON()?"":S.thDead?"Hoàng thượng xuống chỉ gọi lương y họ Tôn, người đã bị đưa ra khỏi cung, về xét lại các phương thuốc. ":"Thái y viện chữa mãi không dứt; Hoàng thượng xuống chỉ gọi lương y họ Tôn, người đã bị đưa ra khỏi cung, về lại Đức Thọ cung. ")+(S.thDead?"Có tiếng xì xào: Thái hậu không chết vì bệnh. Bã thuốc ở Ngự dược phòng cứ mười ngày bị đổ một lần. Kịp lấy được, thì biết.":"Có người thấy tiểu thái giám sắc thuốc của Ngự dược phòng lén bỏ thêm một vị vào siêu thuốc của Thái hậu. Bã thuốc mười ngày bị đổ một lần. Kịp lấy được, thì biết."),
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Lương y nghi",w:"doc",if:RDW(1),t:A=>`Lương y họ Tôn ${S.thDead?"đọc lại phương thuốc cuối của Thái hậu":"nếm bã thuốc"}, nhíu mày: có một vị không có trong phương.`,o:[
  {n:"Bảo y nghiệm cho kỹ",wx:"biết vị lạ là gì",lx:"Thái y viện biết bị nghi",rt:"Vị lạ là phụ tử chưa chế, ít thì không sao, lâu ngày hại tim.",rf:"Y chỉ nói “có lẽ”."},
  {n:"Giữ kín, chưa nói với ai",wx:"kẻ bỏ thuốc không đề phòng",lx:"thêm ngày nào, thêm chén thuốc ấy",rt:"Ngươi dặn lương y im lặng."},
  {n:"Báo ngay Hoàng thượng",wx:"có ngài đứng sau",lx:"rút dây động rừng",rt:"Hoàng thượng sai thị vệ canh Ngự dược phòng.",rf:"Hoàng thượng bảo: “Nghi thì phải có chứng.”"}]},
 s2:{h:"Lời đồn đến tai ngươi",w:"maid",if:RDW(0),t:"{maid} nghe cung nữ Ngự dược phòng xì xào: tiểu thái giám sắc thuốc gần đây tiêu bạc như nước.",o:[
  {n:"Cho {maid} làm thân với cung nữ ấy",wx:"có người trong Ngự dược phòng",lx:"cung nữ ấy sợ, đi kể",rt:"Cung nữ hứa giữ bã thuốc cho ngươi.",rf:"Cung nữ ấy chạy đi báo quản sự."},
  {n:"Dò bạc của tiểu thái giám từ đâu",wx:"lần ra đường bạc",lx:"hắn biết bị dò",rt:"Bạc đến từ một hiệu thuốc ngoài cửa Đông.",rf:"Hắn đổi chỗ giấu bạc."},
  {n:"Bỏ qua lời đồn",wx:"không nghi oan ai",lx:"nếu thật thì muộn",rt:"Ngươi cho là chuyện cung nữ."}]},
 c1:{h:"Tiểu thái giám sắc thuốc",w:"eun",t:"Tiểu thái giám mười sáu tuổi, mẹ già ở ngoại thành. Hắn run khi thấy người của ngươi.",o:[
  {n:"Hứa lo cho mẹ hắn, bắt hắn khai",wx:"hắn khai người đưa thuốc",lx:"hắn nhận bạc rồi im",rt:"Hắn khai: có người ở hiệu thuốc cửa Đông đưa gói thuốc, dặn bỏ mỗi lần một nhúm.",rf:"Hắn nhận bạc, rồi chỉ khóc."},
  {n:"Doạ đưa hắn sang Thận hình ty",wx:"hắn sợ mà khai",lx:"hắn sợ quá mà chạy",rt:"Hắn khai ra hiệu thuốc cửa Đông.",rf:"Sáng hôm sau, hắn không còn trong cung."},
  {n:"Để yên, cho người theo dõi",wx:"bắt được người đưa thuốc",lx:"chậm",rt:"Ba đêm sau, có người lạ đưa hắn một gói giấy."}]},
 c2:{h:"Hiệu thuốc của nhà {v}",w:"v",need:["v"],t:"Hiệu thuốc cửa Đông là của cậu ruột {v}. Nhà ấy bán dược liệu cho Ngự dược phòng đã mười năm.",o:[
  {n:"Cho người mua thử thuốc ở hiệu",wx:"có gói thuốc đối chiếu",lx:"hiệu thuốc biết bị dò",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Gói phụ tử chưa chế bán ra không ghi sổ.",rf:"Chủ hiệu nhận ra người của cung."},
  {n:"Thử lòng {v}",wx:"biết {v} có biết hay không",lx:"{v} biết bị nghi",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} tái mặt khi nghe tên hiệu thuốc: nàng biết, hoặc nàng sợ.",rf:"{v} hiểu ý, đi báo nhà."},
  {n:"Chưa nghi {v}",wx:"không oan người",lx:"nhà {v} kịp xóa dấu",rt:"Ngươi cho là trùng hợp."}]},
 c3:{h:"Hạn đổ bã thuốc",w:"doc",t:"Còn ba ngày nữa là Ngự dược phòng đổ bã thuốc của tuần. Qua hạn ấy, mọi chén thuốc đã sắc không còn dấu.",o:[
  {n:"Mua bã thuốc từ người đổ",wx:"có bã thuốc trong tay",lx:"người đổ nhận bạc rồi đổ",rt:"Một gói bã thuốc ướt được đưa đến cửa sau.",rf:"Bã thuốc đã đổ sớm một ngày."},
  {n:"Xin Hoàng thượng niêm Ngự dược phòng",wx:"không ai được đổ gì",lx:"ngài thấy ngươi làm lớn",rt:"Thị vệ niêm cửa Ngự dược phòng.",rf:"Ngài bảo: “Đừng làm cả cung sợ.”"},
  {n:"Tự đi lúc canh ba",wx:"không ai biết",lx:"bị bắt gặp ở Ngự dược phòng lúc nửa đêm",rt:"Ngươi tự tay gói bã thuốc mang về.",rf:"Thị vệ tuần đêm thấy ngươi."}]},
 t1:{h:"Ai muốn Đức Thọ cung sớm trống",w:"me",t:()=>`Ngươi ngồi nghĩ: Thái hậu mất thì ai được lợi nhất? ${qOn()?"Càn Ninh cung được trọn quyền lục cung; ":""}nhà {v} được giữ mối bán dược liệu cho cung; người khác nữa thì chưa rõ.`,o:[
  {n:"Nghi Càn Ninh cung",need:["hh"],f:"hh",wx:"đề phòng nơi mạnh nhất",lx:"nếu sai thì hại mình",rt:"Ngươi ghi tên Càn Ninh cung."},
  {n:"Nghi nhà {v}",f:"vfam",wx:"theo dấu bạc",lx:"{v} có thể bị oan",rt:"Ngươi ghi tên hiệu thuốc cửa Đông."},
  {n:"Không nghi ai, chỉ theo chứng",wx:"không oan người",lx:"chậm",rt:"Ngươi chỉ ghi những gì đã thấy."}]},
 x1:{h:"Bã thuốc trong đêm",w:"doc",t:A=>`Bã thuốc đang trong tay ngươi, hoặc trong tay kẻ sắp đổ nó. ${S.thDead?"Hoàng thượng đã cho an táng, nhưng ngài vẫn chờ một lời.":"Thái hậu vẫn uống thuốc mỗi ngày hai lần."}`,o:[
  {n:"Đưa bã thuốc cho lương y nghiệm trước mặt thị vệ",e:["win","lose"],rt:"Kim bạc đen lại trước mặt thị vệ. Có chứng.",rf:"Bã thuốc đã quá cũ, kim không đổi màu. Thái y viện tâu ngươi bịa chuyện."},
  {n:"Đặt bẫy bắt người đưa thuốc",e:["win","mid"],rt:"Người đưa gói thuốc bị bắt ở cửa sau Ngự dược phòng, trong người còn gói phụ tử.",rf:"Người đưa thuốc không đến nữa. Kẻ đứng sau đã đề phòng."},
  {n:"Lặng lẽ thay người sắc thuốc",e:"mid",lx:"kẻ đứng sau vẫn còn",rt:"Tiểu thái giám bị điều đi, người của ngươi vào thay."},
  {n:"Tâu ngay lên Hoàng thượng dù chưa đủ chứng",e:["mid","lose"],go:(A,_ok,G)=>{if(A.f.vfam)rdOan(A,"v",G[0])},rt:"Hoàng thượng cho tra Ngự dược phòng; chưa ra ai, nhưng không ai dám bỏ thêm gì.",rf:"Hoàng thượng thấy ngươi đổ tội không chứng, cả cung xì xào."}]}},
 E:{win:{tag:"Nắm được bã thuốc có độc",w:"doc",t:"Ngươi có bã thuốc, có lời của lương y, có người đưa thuốc. Kẻ đứng sau chưa lộ mặt, nhưng đã biết ngươi đang nắm đầu mối.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Nghi mà chưa có chứng",t:"Chén thuốc đã sạch, nhưng ngươi chưa biết ai đã làm bẩn nó."},
  lose:{tag:"Bị vu là kẻ đổi thuốc",w:"doc",t:"Thái y viện tâu ngươi tự ý lấy bã thuốc, đổi thuốc của Đức Thọ cung. Không ai kết tội, nhưng ai cũng nhớ."}}});

rdDef("ch_benh",8,{t:"Hầu bệnh",w:"th",sj:"những đêm bên giường bệnh",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Ngươi để tang cô mẫu. Hoàng thượng thương ngươi, nhưng ngài cũng cô đơn; {v} thì không để tang ai.":"Thái hậu chỉ ngủ được khi có ngươi ngồi bên. Mỗi đêm ở Đức Thọ cung là một đêm không ở bên Hoàng thượng. {v} biết điều đó.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Cô mẫu không cho đi",w:"th",need:["th"],if:RDW(1),t:"Thái hậu nắm tay ngươi: “Đêm nay ở lại.” Thái giám Dưỡng Tâm điện đứng ngoài cửa chờ đưa ngươi sang.",o:[
  {n:"Ở lại",f:"stay",wx:"bà ngủ yên",lx:"Hoàng thượng chờ suông",rt:"Thái hậu ngủ, tay vẫn nắm tay ngươi."},
  {n:"Sang Dưỡng Tâm điện, nửa đêm về",wx:"vẹn cả hai",lx:"Sức −−",rt:"Gà gáy, ngươi đã ngồi lại bên giường bệnh."},
  {n:"Xin Hoàng thượng sang Đức Thọ cung",wx:"ngài đến thăm mẹ",lx:"ngài thấy bị sai khiến",rt:"Hoàng thượng đến, ngồi bên mẹ đến khuya.",rf:"Hoàng thượng bảo: “Trẫm còn tấu chương.”"}]},
 s2:{h:"Cô mẫu gọi người khác",w:"th",need:["th","v"],if:RDW(0),t:"Thái hậu sai gọi {v} sang hầu đêm. Bà nói ngươi bận.",o:[
  {n:"Xin vào hầu cùng {v}",f:"stay",wx:"bà nhận ra ngươi",lx:"{v} đắc ý",rt:"Thái hậu để cả hai ngồi; nửa đêm bà gọi tên ngươi.",rf:"Thái hậu bảo ngươi về."},
  {n:"Để {v} hầu, ngươi sang Dưỡng Tâm điện",f:"emp",wx:"Hoàng thượng vui",lx:"{v} chiếm chỗ bên Thái hậu",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Hoàng thượng hỏi ngươi gầy đi vì sao."},
  {n:"Gửi canh sâm cho cả hai",wx:"không tranh",lx:"tốn bạc",rt:"{v} nhận canh, nhìn ngươi khác đi."}]},
 s3:{h:"Áo tang",w:"me",if:()=>S.thDead,t:"Ngươi mặc áo tang. Theo lệ, phi tần để tang Thái hậu không hầu ngủ. Hoàng thượng đã ba lần cho người hỏi thăm.",o:[
  {n:"Giữ trọn tang",f:"stay",wx:"ai cũng kính lòng hiếu",lx:"Hoàng thượng xa dần",rt:"Ngươi chép kinh cho cô mẫu mỗi đêm."},
  {n:"Gặp ngài ban ngày, nói chuyện cô mẫu",f:"emp",wx:"ngài được an ủi",lx:"bị nói là chưa hết tang đã tìm vua",rt:"Hoàng thượng nghe ngươi kể, mắt đỏ.",rf:"Có người tâu ngươi chưa hết tang đã ra vào Dưỡng Tâm điện."},
  {n:"Gửi ngài một bức thư",wx:"ngài nhớ ngươi",lx:"thư không thay được người",rt:"Hoàng thượng đọc thư ba lần."}]},
 c1:{h:"{v} ở Dưỡng Tâm điện",w:"v",need:["v","th"],t:"Những đêm ngươi ở Đức Thọ cung, {v} được gọi sang Dưỡng Tâm điện. Nàng đang lên.",o:[
  {n:"Nhờ Hoàng thượng nhớ lại ngươi bằng một món quà",wx:"ngài nhớ",lx:"quà bị để quên",rt:"Hoàng thượng đeo túi thơm ngươi thêu.",rf:"Túi thơm nằm trên bàn, chưa mở."},
  {n:"Để {v} lên, ngươi giữ đạo hiếu",wx:"tiếng hiếu thảo",lx:"{v} chiếm chỗ",rt:"Ngươi không nói gì."},
  {n:"Cho {v} biết ngươi thấy",wx:"{v} biết dừng",lx:"{v} càng lấn",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} cười gượng, rồi ít sang dần.",rf:"{v} đáp: “Tỷ cứ hầu Thái hậu cho trọn.”"}]},
 c2:{h:"Sức người có hạn",w:"maid",t:"{maid} quỳ khuyên: “{Goi} đã ba đêm không ngủ.”",o:[
  {n:"Cho {maid} thay một đêm",wx:"lại sức",lx:"đêm ấy không phải ngươi",rt:"{maid} ngồi quạt thay ngươi."},
  {n:"Cố thêm",wx:"lòng hiếu",lx:"sức cạn",rt:"Ngươi ngủ gục bên giường."},
  {n:"Mua sâm bồi bổ",wx:"giữ sức",lx:"tốn bạc",rt:"Sâm vào, mắt đỡ quầng."}]},
 c3:{h:"Hoàng thượng ghé",w:"emp",t:"Hoàng thượng ghé cung ngươi, thấy cung vắng, đèn tắt. Ngài để lại một cành mai.",o:[
  {n:"Sáng sớm sang tạ ơn",wx:"ngài biết ngươi nhớ",lx:"Sức −",rt:"Hoàng thượng cười: “Trẫm biết nàng bận.”"},
  {n:"Cắm cành mai bên giường cô mẫu",need:["th"],wx:"bà biết con trai nhớ mình",lx:"ngài không biết ngươi nhận",rt:"Thái hậu nhìn cành mai, khóc."},
  {n:"Ép cành mai vào sách",wx:"giữ làm kỷ niệm",lx:"không ai biết",rt:"Ngươi ép cành mai vào quyển kinh."}]},
 t1:{h:"Cô mẫu kể chuyện cũ",w:"th",need:["th"],t:"Một đêm Thái hậu tỉnh, kể chuyện năm bà mới vào cung, kể cả những người bà đã hại.",o:[
  {n:"Ngồi nghe hết",wx:"bà trút được lòng",lx:"biết những điều nặng",rt:"Thái hậu kể đến sáng."},
  {n:"Ghi lại những tên bà nhắc",wx:"biết những mối oán cũ",lx:"bà thấy ngươi ghi",rt:"Ngươi nhớ từng tên.",rf:"Thái hậu ngừng kể."}]},
 t2:{h:"Trăm ngày",w:"me",if:()=>S.thDead,t:"Lễ trăm ngày. Hoàng thượng đứng cạnh ngươi trước bài vị.",o:[
  {n:"Xin ngài ở lại dùng bữa chay",wx:"ngài ở lại",lx:"bị nói là tranh sủng ở lễ tang",rt:"Hoàng thượng ở lại, ăn rất ít.",rf:"Ngài về sớm."},
  {n:"Chỉ lặng lẽ dâng hương",wx:"giữ lễ",lx:"ngài về một mình",rt:"Hoàng thượng đặt tay lên vai ngươi rồi đi."}]},
 x1:{h:"Đêm Trung thu",w:"emp",need:["th"],t:"Đêm Trung thu. Hoàng thượng mở yến thưởng trăng, gọi ngươi ngồi cạnh. Cùng lúc, Đức Thọ cung báo: Thái hậu lên cơn ho, gọi tên ngươi.",o:[
  {n:"Ở lại Đức Thọ cung",e:["win","mid"],go:()=>{ap67({th:CHTH("ch_benh_8.x1.0.th")});return fmt({th:CHTH("ch_benh_8.x1.0.th")})},rt:"Hoàng thượng nghe tin, bỏ yến sang Đức Thọ cung. Ba người ngồi bên nhau đến sáng.",rf:"Hoàng thượng ở lại yến, gọi {v} ngồi chỗ của ngươi."},
  {n:"Dự yến, sai lương y sang trước",e:["win","lose"],go:()=>{ap67({th:CHTH("ch_benh_8.x1.1.th")});return fmt({th:CHTH("ch_benh_8.x1.1.th")})},rt:"Lương y giữ được cơn ho; Hoàng thượng thấy ngươi biết lo cả hai nơi.",rf:"Thái hậu ho đến sáng không thấy ngươi. Bà không nói, nhưng không quên."},
  {n:"Xin Hoàng thượng dời yến sang Đức Thọ cung",e:["win","lose"],rt:"Yến dời sang sân Đức Thọ cung. Thái hậu ngắm trăng cùng con cháu.",rf:"Hoàng thượng phật ý: “Nàng muốn dạy trẫm làm con?”"}]},
 x2:{h:"Mãn tang",w:"emp",if:()=>S.thDead,t:"Mãn tang cô mẫu. Hoàng thượng mở yến, gọi ngươi. {v} đã ngồi cạnh ngài cả mùa.",o:[
  {n:"Đến yến, ngồi đúng chỗ của mình",e:["win","mid"],rt:"Hoàng thượng nhìn ngươi suốt buổi, rồi bảo {v} đổi chỗ.",rf:"Ngài vẫn để {v} ngồi cạnh."},
  {n:"Đến yến, nhắc chuyện cô mẫu",e:["win","lose"],rt:"Hoàng thượng nghe ngươi kể, nắm tay ngươi trước cả yến.",rf:"Ngài thấy buồn, bỏ yến sớm. Người ta trách ngươi."},
  {n:"Xin chưa dự, chép thêm một quyển kinh",e:"mid",lx:"{v} giữ chỗ cạnh ngài",rt:"Ngươi ở lại cung chép kinh."}]}},
 E:{win:{tag:"Vẹn hiếu vẹn tình",w:"emp",t:A=>S.thDead?"Ngươi giữ trọn tang cô mẫu, và Hoàng thượng vẫn quay về bên ngươi. Cả cung nói: người hiếu thì vua thương.":"Thái hậu có ngươi bên giường, Hoàng thượng có ngươi bên yến. Ngài nói: “Nàng thay trẫm làm con.”"},
  mid:{tag:"Được bên này, mất bên kia",t:"Một bên được ngươi, một bên chờ suông. Bên chờ suông không trách, chỉ thôi chờ."},
  lose:{tag:"Hai bên cùng phật lòng",w:"emp",t:"Hoàng thượng thấy ngươi bỏ ngài, Đức Thọ cung thấy ngươi bỏ bà. {v} ngồi chỗ của ngươi cả mùa.",go:(A,G)=>{rdOan(A,"v",G[0]);if(S.thDead)return"";ap67({th:CHTH("ch_benh_8.E.lose.th")});return fmt({th:CHTH("ch_benh_8.E.lose.th")})}}}});

rdDef("ch_benh",9,{t:"Bệnh trở nặng",w:"doc",sj:"vị thuốc cứu mạng",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Kẻ đã bỏ thuốc vào chén của Thái hậu đang xóa dấu: sổ dược liệu của Ngự dược phòng sẽ bị Nội vụ phủ đốt theo lệ cuối năm, còn mười ngày. Lấy được sổ, thì có chứng.":"Thái hậu trở bệnh nặng. Lương y nói chỉ còn một cách: tuyết liên trăm năm, trong mười ngày. Trong cung chỉ Ngự dược khố có, ngoài cung thì chỉ những nhà buôn lớn.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Tin dữ từ Đức Thọ cung",w:"doc",need:["th"],if:RDW(1),t:"Lương y họ Tôn gõ cửa cung ngươi lúc canh tư: “Bệnh chuyển. Mười ngày, không có tuyết liên thì thần không giữ được.”",o:[
  {n:"Lập tức sai người tìm",wx:"tin lan ra kịp",lx:"tốn bạc",rt:"Người của ngươi đi khắp các hiệu thuốc trong đêm."},
  {n:"Hỏi lương y còn cách nào khác",wx:"có phương thay thế",lx:"không có cách nào",rt:"Y nói: châm cứu giữ được thêm năm ngày.",rf:"Y lắc đầu."},
  {n:"Vào hầu bà trước đã",wx:"bà biết ngươi ở đây",lx:"mất nửa đêm",rt:"Thái hậu mở mắt nhìn ngươi."}]},
 s2:{h:"Thái y viện lắc đầu",w:"doc",need:["th"],if:RDW(0),t:"Viện phán tâu Hoàng thượng: Thái hậu tuổi cao, bệnh vào phế, nên lo hậu sự. Lương y họ Tôn lén nhắn ngươi: còn cách, nếu có tuyết liên trong mười ngày.",o:[
  {n:"Tin lương y",f:"ton",wx:"còn hy vọng",lx:"cãi lời Thái y viện",rt:"Ngươi dặn y chuẩn bị."},
  {n:"Tin Viện phán, lo hậu sự",wx:"không mất công vô ích",lx:"bỏ một cách cứu",rt:"Ngươi sai người chuẩn bị đồ tang, tay run."},
  {n:"Xin Hoàng thượng triệu cả hai",wx:"ngài nghe cả hai",lx:"ngài mệt mỏi",rt:"Hoàng thượng phán: tìm tuyết liên.",rf:"Hoàng thượng chỉ thở dài."}]},
 s3:{h:"Sổ dược liệu sắp đốt",w:"me",if:()=>S.thDead,t:"Lệ cuối năm, Nội vụ phủ đốt sổ dược liệu cũ. Còn mười ngày. Trong sổ có tên ai đã bán phụ tử chưa chế vào cung.",o:[
  {n:"Xin Hoàng thượng giữ sổ lại",wx:"sổ không bị đốt",lx:"ngài hỏi vì sao",rt:"Hoàng thượng phê: giữ sổ năm nay lại.",rf:"Ngài bảo: lệ là lệ."},
  {n:"Mua người giữ kho chép trước",wx:"có bản chép",lx:"tốn bạc, bản chép yếu hơn bản gốc",rt:"Bản chép đến tay ngươi sau ba đêm."},
  {n:"Chờ xem ai muốn đốt sổ sớm",wx:"lộ mặt kẻ sốt ruột",lx:"có thể mất sổ",rt:"Ngươi cho người canh kho sổ."}]},
 c1:{h:"Ngự dược khố",w:"emp",t:A=>S.thDead?"Sổ dược liệu nằm trong Ngự dược khố. Ra vào phải có thẻ bài của Nội vụ phủ.":"Ngự dược khố có một nhánh tuyết liên, giữ cho Hoàng thượng. Lấy ra phải có ngự phê.",o:[
  {n:"Xin ngự phê",wx:"không tốn bạc",lx:"ngài không vui khi bị xin",rt:"Hoàng thượng phê ngay: “Cho mẫu hậu.”",rf:"Ngài nói: “Đợi trẫm hỏi Thái y viện.”"},
  {n:"Nhờ Tổng quản thái giám",wx:"nhanh",lx:"lấy đồ ngự dụng bằng bạc là tội",rt:"{eun} mở khố trong đêm.",rf:"{eun} nhận bạc rồi báo lên."},
  {n:"Không động đến đồ ngự dụng",wx:"đúng phép",lx:"chỉ còn đường ngoài cung",rt:"Ngươi tìm đường khác."}]},
 c2:{h:"Nhà {v} có tuyết liên",w:"v",need:["v"],if:A=>CHR_BV(A),t:A=>S.thDead?"Nhà {v} đang cho người hỏi mua lại sổ dược liệu. Họ sợ điều gì?":"Nhà {v} buôn dược liệu, có tuyết liên trong kho. {v} nhắn: muốn có, thì đổi.",o:[
  {n:"Đổi một ân điển cho nhà {v}",wx:"có thứ cần mà không tốn bạc",lx:"nợ nhà {v} một ân",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} gửi đến một hộp gỗ nhỏ.",rf:"{v} đòi nhiều hơn ngươi cho được."},
  {n:"Trả bạc đúng giá",wx:"không nợ ai",lx:"tốn bạc",rt:"Hộp gỗ đến, giá không bớt một đồng."},
  {n:"Không nhận gì từ nhà {v}",wx:"không mắc bẫy",lx:"mất một nguồn",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi trả lời: không cần."}]},
 c3:{h:"Hạn ngày thứ bảy",w:"doc",t:A=>S.thDead?"Ngày thứ bảy. Có người hỏi Nội vụ phủ xin đốt sổ sớm, nói là kho chật.":"Ngày thứ bảy. Lương y nói Thái hậu chỉ còn uống được nước cháo.",o:[
  {n:"Đi tìm tận các nhà buôn kinh thành",wx:"có thêm đường",lx:"chạy suông",rt:"Một nhà buôn Tây Vực còn giữ một nhánh.",rf:"Nhà nào cũng nói đã bán."},
  {n:"Quỳ ở Phụng Tiên điện cầu tổ",wx:"cả cung thấy lòng ngươi",lx:"không thêm được vị thuốc nào",rt:"Ngươi quỳ đến khi hai gối tê dại."},
  {n:"Cho người canh kẻ sốt ruột",wx:"thấy ai sợ nhất",lx:"canh mà không thấy ai",rt:"Người hỏi đốt sổ là người của hiệu thuốc cửa Đông.",rf:"Không ai ra mặt."}]},
 t1:{h:"Cô mẫu tỉnh một khắc",w:"th",need:["th"],t:"Thái hậu tỉnh một khắc, gọi ngươi lại gần: “Đừng lo cho ai gia quá. Lo cho mình.”",o:[
  {n:"Thưa: con nhất định tìm được thuốc",wx:"bà: Sức +",lx:"lời hứa nặng",rt:"Thái hậu cười yếu ớt."},
  {n:"Hỏi bà có điều gì dặn",wx:"biết ý bà",lx:"bà biết ngươi đã nghĩ đến hậu sự",rt:"Thái hậu chỉ vào hộp gỗ dưới gối."}]},
 t2:{h:"Người cũ của Đức Thọ cung",w:"me",if:()=>S.thDead,t:"Ma ma già thì thầm: đêm Thái hậu băng hà, có người lạ vào gian thuốc.",o:[
  {n:"Hỏi kỹ mặt người lạ",wx:"có người làm chứng",lx:"ma ma sợ",rt:"Ma ma tả: người ấy mặc áo của Ngự dược phòng.",rf:"Ma ma không nhớ rõ."},
  {n:"Đưa ma ma ra khỏi cung cho an",wx:"nhân chứng sống",lx:"xa thì khó gọi",rt:"Ma ma lên xe trong đêm."}]},
 x1:{h:"Vị thuốc cuối",w:"doc",need:["th"],t:"Ngày thứ mười. Tuyết liên phải có trước giờ Tý.",o:[
  {n:"Mang tuyết liên ngự phê đến",e:["win","mid"],rt:"Tuyết liên đến trước giờ Tý. Lương y sắc thuốc ngay.",rf:"Ngự phê đến muộn một canh, thuốc vào khi bà đã yếu."},
  {n:"Mua tuyết liên của nhà buôn ngoài cung",e:["win","lose"],rt:"Tuyết liên thật, còn tươi. Lương y gật đầu.",rf:"Tuyết liên là giả, nhuộm từ một thứ hoa khác."},
  {n:"Giữ bà bằng châm cứu, chờ thêm",e:["mid","lose"],rt:"Kim giữ được hơi thở của bà thêm năm ngày.",rf:"Kim không giữ được."}]},
 x2:{h:"Đêm đốt sổ",w:"me",if:()=>S.thDead,t:"Ngày thứ mười. Lửa đã nhóm ở sân Nội vụ phủ.",o:[
  {n:"Xông vào lấy sổ",e:["win","lose"],rt:"Ngươi rút được quyển sổ năm ấy ra khỏi đống lửa.",rf:"Thị vệ ngăn ngươi lại; quyển sổ cháy trước mắt."},
  {n:"Dùng bản chép",e:["win","mid"],rt:"Bản chép khớp với lời ma ma và tên hiệu thuốc.",rf:"Bản chép không có dấu, khó làm chứng."},
  {n:"Để sổ cháy",e:"mid",lx:"mất chứng",rt:"Ngươi đứng nhìn tro bay."}]}},
 E:{win:{tag:"Kịp hạn mười ngày",w:"doc",t:A=>S.thDead?"Sổ dược liệu trong tay ngươi. Tên hiệu thuốc cửa Đông nằm ngay trang đầu.":"Tuyết liên vào thuốc. Đêm ấy Thái hậu thở đều hơn. Lương y nói: qua được tuần này là sống.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_benh_9.E.win.th")});return fmt({th:CHTH("ch_benh_9.E.win.th")})}},
  mid:{tag:"Muộn mà còn kịp",t:A=>S.thDead?"Chứng còn một nửa. Đủ để ngươi biết, chưa đủ để ngươi nói.":"Thuốc đến muộn. Thái hậu còn thở, nhưng mỗi ngày một yếu."},
  lose:{tag:"Lỡ hạn",w:"doc",t:A=>S.thDead?"Sổ cháy. Kẻ bỏ thuốc thở phào.":"Hạn mười ngày qua tay trắng. Lương y lắc đầu, Thái y viện bắt đầu lo hậu sự."}}});

rdDef("ch_benh",10,{t:"Hồi phục hay băng hà",w:"th",sj:"đêm quyết định của Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu đã khuất. Tang lễ, ấn của Đức Thọ cung, người cũ của bà, tất cả còn chờ một bàn tay.":"Đêm nay Thái hậu qua được, hoặc không. Những gì ngươi đã làm, thầy thuốc ngươi giữ, chén thuốc ngươi canh, vị thuốc ngươi tìm, đều dồn về đêm nay.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Bà thở đều hơn",w:"th",need:["th"],if:RDW(1),t:"Ba hôm sau tuyết liên, Thái hậu ăn được nửa bát cháo. Nhưng Viện phán vẫn tâu: “Qua đêm rằm mới chắc.”",o:[
  {n:"Ngồi canh đến rằm",f:"stay",wx:"bà có ngươi bên",lx:"Sức −−",rt:"Ngươi không rời Đức Thọ cung."},
  {n:"Cho lương y canh, ngươi lo bên ngoài",wx:"không ai lợi dụng lúc này",lx:"bà không thấy ngươi",rt:"Ngươi cho người canh cổng Đức Thọ cung."}]},
 s2:{h:"Hơi thở yếu dần",w:"th",need:["th"],if:RDW(0),t:"Thái hậu chỉ còn tỉnh vài khắc mỗi ngày. Ngoài sân, người Nội vụ phủ đã lặng lẽ may đồ tang.",o:[
  {n:"Đuổi người may đồ tang đi",wx:"không ai được trù bà",lx:"bị nói là không biết lệ",rt:"Người Nội vụ phủ dọn đi.",rf:"Họ chỉ dời sang gian khác."},
  {n:"Hầu bà từng khắc tỉnh",f:"stay",wx:"bà có ngươi",lx:"mệt",rt:"Mỗi lần tỉnh, bà đều thấy ngươi."},
  {n:"Lo hậu sự từ bây giờ",wx:"không bị động",lx:"bà biết ngươi đã chuẩn bị",rt:"Ngươi lặng lẽ soát lại đồ của Đức Thọ cung."}]},
 s3:{h:"Linh cữu Đức Thọ cung",w:"me",if:()=>S.thDead,t:"Linh cữu Thái hậu quàn ở Đức Thọ cung. Lễ bộ tâu lên: việc tang trong hậu cung giao ai giữ?",o:[
  {n:"Xin Hoàng thượng cho giữ việc tang",f:"stay",wx:"ngươi đứng đầu tang",lx:()=>`${CHR_Q()} thấy ngươi giành`,rt:"Hoàng thượng chuẩn.",rf:()=>`Lễ bộ tâu theo lệ, Hoàng thượng giao cho ${qOn()?"Trung cung":"người giữ việc lục cung"}.`},
  {n:"Phụ việc, không đứng đầu",wx:"giữ phép",lx:"không có quyền gì",rt:"Ngươi lo phần kinh kệ."}]},
 c1:{h:"Kẻ bỏ thuốc ra tay lần nữa",w:"eun",need:["th"],t:"Kẻ đứng sau chén thuốc vẫn chưa bị trị. Đêm nay có người lạ hỏi đường vào gian thuốc Đức Thọ cung.",o:[
  {n:"Đặt thị vệ ở gian thuốc",wx:"không ai lọt",lx:"làm ầm",rt:"Người lạ thấy thị vệ, quay đi.",rf:"Thị vệ ngủ gật."},
  {n:"Tự tay giữ siêu thuốc",wx:"siêu thuốc không ai đụng được",lx:"không còn sức lo việc khác",rt:"Siêu thuốc không rời tay ngươi."},
  {n:"Để người lạ vào, bắt tận tay",wx:"có người làm chứng",lx:"nếu sơ suất thì hại bà",rt:"Người lạ bị bắt khi đang mở gói giấy.",rf:"Người lạ trốn được, gói giấy rơi lại."}]},
 c2:{h:"{v} đến thăm",w:"v",need:["v","th"],t:A=>`{v} mang canh đến Đức Thọ cung, xin được vào thăm.${CHR_BV(A)?" Nhà nàng là nhà bán dược liệu.":""}`,o:[
  {n:"Cho vào, nhưng không cho đụng chén",wx:"không mất mặt ai",lx:"{v} thấy bị nghi",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} ngồi một lát rồi về."},
  {n:"Từ chối ở cửa",wx:"Đức Thọ cung kín",lx:"{v} nói ngươi giữ bà làm của riêng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đặt bát canh ở cửa."},
  {n:"Mời {v} cùng hầu một đêm",wx:"{v} thấy được lòng ngươi",lx:"có chuyện thì {v} đổ cho ngươi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} ngồi đến sáng, mắt đỏ.",rf:"{v} ngủ quên, sáng ra kể khắp nơi là ngươi ép."}]},
 c3:{h:"Hoàng thượng đến",w:"emp",t:A=>S.thDead?"Hoàng thượng quỳ trước linh cữu mẹ suốt đêm. Ngài hỏi ngươi: “Những ngày cuối, mẫu hậu nói gì?”":"Hoàng thượng đến, ngồi bên giường mẹ. Ngài hỏi ngươi: “Mẫu hậu có qua được không?”",o:[
  {n:"Thưa thật",wx:"ngài tin ngươi",lx:"lời thật đau",rt:"Hoàng thượng nắm tay ngươi."},
  {n:"Thưa cho ngài yên lòng",wx:"ngài nhẹ lòng",lx:"nếu sai thì thành dối",rt:"Hoàng thượng gật đầu."},
  {n:"Kể chuyện chén thuốc",wx:"ngài nổi giận thay mẹ",lx:"ngài thấy lúc này không nên",rt:"Hoàng thượng cho tra lại Ngự dược phòng ngay đêm ấy.",rf:"Hoàng thượng bảo: “Để sau.”"}]},
 t1:{h:"Cô mẫu dặn lại",w:"th",need:["th"],t:"Nửa đêm, Thái hậu tỉnh: “Nếu ai gia không qua, con lo cho người của ai gia.”",o:[
  {n:"Hứa với bà",wx:"bà yên lòng",lx:"gánh người của bà",rt:"Thái hậu nhắm mắt, môi khẽ cười."},
  {n:"Thưa: cô mẫu sẽ qua",wx:"bà: Sức +",lx:"bà chưa dặn hết",rt:"Thái hậu gật đầu khẽ."}]},
 t2:{h:"Đêm cuối quàn linh cữu",w:"me",if:()=>S.thDead,t:"Đêm cuối trước khi đưa linh cữu ra lăng. Người cũ Đức Thọ cung quỳ chờ ngươi.",o:[
  {n:"Hứa lo cho họ",wx:"họ theo ngươi",lx:"gánh thêm người",rt:"Ma ma già dập đầu."},
  {n:"Để họ tự liệu",wx:"không gom phe",lx:"họ tan",rt:"Ngươi chỉ thắp hương."}]},
 x1:{h:"Canh năm",w:"th",need:["th"],t:"Canh năm. Thái hậu lịm đi, mạch chìm. Viện phán lùi lại. Lương y họ Tôn nhìn ngươi.",o:[
  {n:"Cho lương y châm cứu",e:["win","lose"],rt:"Mũi kim cuối, Thái hậu ho ra một búng đờm đen, rồi thở. Trời sáng, bà gọi tên ngươi.",rf:"Kim vào, mạch không lên. Thái hậu đi trong tay ngươi."},
  {n:"Để Thái y viện dùng thuốc của viện",e:["mid","lose"],rt:"Thuốc vào, Thái hậu qua đêm, nhưng không tỉnh hẳn.",rf:"Thuốc vào, Thái hậu không qua được."},
  {n:"Quỳ bên giường, nắm tay bà gọi",e:["mid","lose"],rt:"Thái hậu nắm lại tay ngươi. Bà còn đây, dù rất yếu.",rf:"Bàn tay bà lạnh dần trong tay ngươi."}]},
 x2:{h:"Ấn Đức Thọ cung",w:"me",if:()=>S.thDead,t:()=>`Tang lễ xong. Ấn riêng của Đức Thọ cung còn đặt trên án. ${CHR_Q()}, họ ngoại và ngươi đều nhìn nó.`,o:[
  {n:"Xin Hoàng thượng cho giữ ấn làm kỷ vật",e:["dwin","dlose"],rt:"Hoàng thượng đặt ấn vào tay ngươi.",rf:()=>`Hoàng thượng giao ấn cho ${qOn()?"Trung cung cất":"Nội vụ phủ cất vào kho"}.`},
  {n:"Dâng ấn cho Trung cung",need:["hh"],e:"dlose",lx:"ấn không còn trong tay",rt:"Ngươi dâng ấn bằng hai tay."},
  {n:"Xin Hoàng thượng cho đặt ấn ở Phụng Tiên điện",e:["dwin","dlose"],rt:"Hoàng thượng chuẩn. Ấn được thờ ở Phụng Tiên điện, không ai được dùng. Người cũ tin ngươi.",rf:"Lễ quan tâu không có lệ ấy; Hoàng thượng cho cất ấn."}]}},
 E:{win:{tag:"Cô mẫu qua cơn nguy",w:"th",t:"Thái hậu tỉnh dậy lúc trời sáng. Cả Đức Thọ cung khóc. Bà nắm tay ngươi rất lâu, không nói gì.",go:()=>{if(S.thDead)return"";S.thIll=null;ap67({th:CHTH("ch_benh_10.E.win.th")});return fmt({th:CHTH("ch_benh_10.E.win.th")})}},
  mid:{tag:"Ngọn đèn leo lét",w:"th",t:"Thái hậu còn sống, nhưng nằm liệt. Bà tỉnh thì gọi ngươi, mê thì gọi tên những người đã khuất."},
  lose:{tag:"Thái hậu băng hà",w:"me",t:"Chuông Phụng Tiên điện gõ chín tiếng. Thái hậu băng hà lúc canh năm. Ngươi là người cuối cùng bà nhìn thấy.",go:()=>{if(S.thDead)return"";S.thDead=true;S.th=0;S.thIll=null;return"<b>Thái hậu băng hà.</b>"}},
  dwin:{tag:"Giữ ấn Đức Thọ cung",w:"me",t:"Ấn của cô mẫu không vào tay ai khác. Người cũ Đức Thọ cung biết họ còn một người để theo."},
  dlose:{tag:()=>qOn()?"Ấn về Trung cung":"Ấn về kho Nội vụ phủ",w:"me",t:()=>`Ấn của cô mẫu được cất ở ${qOn()?"Càn Ninh cung":"kho Nội vụ phủ"}. Người cũ Đức Thọ cung bắt đầu tìm đường riêng.`}}});

rdDef("ch_benh",11,{t:"Chỗ dựa mới",w:"th",sj:"người của Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu đã khuất. Người của bà, ân oán của bà, kẻ đã bỏ thuốc vào chén của bà, tất cả còn đó. Ngươi sẽ là chỗ dựa mới, hay nhìn mọi thứ tan. Đây là kết cục truyện xuất thân của ngươi.":"Thái hậu đã qua những ngày tệ nhất, nhưng bà biết mình không còn nhiều năm. Bà sẽ trao người của bà cho ai, và ngươi sẽ đứng ở đâu khi Đức Thọ cung không còn. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s1:{h:"Cô mẫu ngồi dậy",w:"th",need:["th"],if:RDW(1),t:"Lần đầu sau nửa năm, Thái hậu ngồi dậy, cho gọi mọi người đến Đức Thọ cung thỉnh an. Bà nhìn từng người, ghi nhớ ai đã đến, ai đã đi.",o:[
  {n:"Đứng cạnh bà như mọi ngày",f:"stay",wx:"bà biết ngươi không đổi",lx:"không có gì mới",rt:"Thái hậu đặt tay lên tay ngươi trước mặt mọi người."},
  {n:"Đưa lương y họ Tôn ra mắt",f:"ton",wx:"công của y được ghi",lx:"Thái y viện: oán +",rt:"Thái hậu ban cho y một tấm biển.",rf:"Viện phán tâu: người ngoài không được nhận biển ở cung."},
  {n:"Nhắc bà những ai đã đi",wx:"bà biết ai hai lòng",lx:"bà thấy ngươi kể tội",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Thái hậu gật đầu, mắt lạnh.",rf:"Thái hậu bảo: “Ai gia biết, không cần con kể.”"}]},
 s2:{h:"Cô mẫu viết ý chỉ",w:"th",need:["th"],if:RDW(0),t:"Thái hậu biết mình không dậy nổi nữa. Bà cho gọi ngươi và một viên nữ quan đến chép ý chỉ.",o:[
  {n:"Ngồi chép cho bà",f:"stay",wx:"bà tin ngươi",lx:"ai cũng biết ngươi biết ý chỉ",rt:"Ngươi chép từng chữ bà nói."},
  {n:"Xin bà để Hoàng thượng chứng",wx:"ý chỉ có ngài làm chứng",lx:"bà muốn riêng tư",rt:"Hoàng thượng đến, ngồi nghe mẹ dặn.",rf:"Thái hậu bảo: “Việc đàn bà.”"},
  {n:"Xin bà nghỉ, đừng viết",wx:"bà được nghỉ",lx:"ý chỉ chưa viết",rt:"Thái hậu nhắm mắt."}]},
 s3:{h:"Sau tang",w:"me",if:()=>S.thDead,t:A=>`${rdPrev()==="lose"?"Chưa qua giỗ đầu, ":""}Đức Thọ cung khóa cửa. Người cũ của Thái hậu đứng chờ ở sân cung ngươi: ma ma, thái giám, cung nữ, cả lương y họ Tôn.`,o:[
  {n:"Mở cửa đón họ",f:"heir",wx:"người cũ thành người của ngươi",lx:"tốn bạc, cả cung nhìn",rt:"Từng người vào lạy."},
  {n:"Nhận vài người, tiễn số còn lại",wx:"ai cũng có đường",lx:"thế lực mỏng",rt:"Ma ma già ở lại, người khác lên xe."},
  {n:"Không nhận ai",wx:"Hoàng thượng thấy ngươi không gom phe",lx:"người cũ tan",rt:"Cửa cung ngươi đóng."}]},
 c1:{h:"Kẻ bỏ thuốc",w:"v",need:["v"],if:A=>CHR_BV(A),t:"Mọi dấu vết ngươi lần được đều chỉ về hiệu thuốc cửa Đông của cậu ruột {v}. {v} biết ngươi biết.",o:[
  {n:"Đem chứng lên Hoàng thượng",wx:"nhà {v} bị tra",lx:"chứng yếu, thành vu cáo",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Hoàng thượng sai Đại Lý tự tra hiệu thuốc cửa Đông.",rf:"Đại Lý tự tâu lên: chứng chưa đủ. Hoàng thượng gác lại."},
  {n:"Gặp riêng {v}, đổi im lặng lấy một lời thề",wx:"{v} nợ ngươi cả đời",lx:"tha kẻ có tội",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} quỳ: nàng không biết, nhưng nhà nàng biết. Nàng thề không để ai đụng đến ngươi.",rf:"{v} chối, rồi về báo nhà."},
  {n:"Để đó",wx:"không gây sóng",lx:"kẻ bỏ thuốc yên",rt:"Ngươi gói chứng cứ cất đi."}]},
 c2:{h:"Càn Ninh cung nhìn sang",w:"hh",need:["hh"],t:"Hoàng hậu {hh} cho người hỏi: người cũ Đức Thọ cung, Trung cung có nên thu về không, “cho đúng phép”.",o:[
  {n:"Thưa: người của Thái hậu, cháu Thái hậu lo",f:"heir",wx:"giữ được người",lx:"Hoàng hậu không vui",rt:"Hoàng hậu im lặng, không đòi nữa.",rf:"Hoàng hậu tâu Hoàng thượng."},
  {n:"Chia cho Trung cung một nửa",wx:"Càn Ninh cung vui",lx:"mất một nửa",rt:"Hoàng hậu nhận, sai người tạ."},
  {n:"Để Hoàng thượng định",wx:"không tranh",lx:"có thể mất hết",rt:"Ngươi thưa lên Hoàng thượng."}]},
 c3:{h:"Lương y họ Tôn xin về",w:"doc",t:"Lương y họ Tôn xin về quê. Y nói: “Thần chữa được bệnh, không chữa được người trong cung.”",o:[
  {n:"Xin Hoàng thượng cho y một chức trong Thái y viện",wx:"có thầy thuốc tin được",lx:"Thái y viện oán",rt:"Hoàng thượng phê, y nhận chức Ngự y.",rf:"Thái y viện tâu không nhận người ngoài; Hoàng thượng gác lại."},
  {n:"Tiễn y về, hậu tạ",wx:"y nhớ ơn",lx:"mất thầy thuốc",rt:"Y lạy ba lạy, ra cửa Tây Hoa."},
  {n:"Để y đi",wx:"không giữ người",lx:"mất thầy thuốc",rt:"Y đi."}]},
 t1:{h:"Cô mẫu hỏi người",w:"th",need:["th"],t:"Thái hậu hỏi: “Người của ai gia, sau này con có giữ được không?”",o:[
  {n:"Thưa: con giữ được",f:"heir",wx:"bà trao",lx:"bà thấy ngươi nói to",rt:"Thái hậu gật đầu, đưa ngươi chiếc hộp gỗ.",rf:"Thái hậu cười: “Con còn non.”"},
  {n:"Thưa: con xin cô mẫu sống lâu mà giữ",wx:"bà cảm động",lx:"bà chưa trao",rt:"Thái hậu cười, nước mắt chảy."}]},
 t2:{h:"Hộp gỗ của cô mẫu",w:"me",if:()=>S.thDead,t:"Ma ma già trao chiếc hộp gỗ Thái hậu để lại: tên người, ân oán, một lá thư cho ngươi.",o:[
  {n:"Đọc thư",wx:"biết bà nghĩ gì về ngươi",lx:"lời bà dặn nặng",rt:"Thư chỉ có một dòng: “Con đừng thành ai gia.”"},
  {n:"Đọc sổ tên người",f:"heir",wx:"biết thế lực bà để lại",lx:"ân oán của bà thành của ngươi",rt:"Ngươi đọc đến gà gáy."}]},
 x1:{h:"Ngày cô mẫu trao người",w:"th",need:["th"],t:"Thái hậu cho gọi người cũ Đức Thọ cung, họ ngoại và ngươi vào điện. Bà ho một tràng dài, rồi nói: “Ai gia không biết còn bao lâu.”",o:[
  {n:"Dâng phương thuốc của lương y, xin bà dưỡng thêm",e:["win","mid"],rt:"Thái hậu uống, rồi cười: “Vậy ai gia còn phải sống để xem con.” Bà khỏe dần qua mùa đông.",rf:"Bà uống, nhưng mùa đông năm ấy bà đi. Trước khi đi, bà trao người của bà cho ngươi."},
  {n:"Xin cô mẫu trao người cho mình",if:()=>S.th>=netTh("th","than"),e:["mid","lose"],rt:"Thái hậu trao hộp gỗ trước mặt mọi người. Ít lâu sau, bà nhắm mắt yên lòng.",rf:"Thái hậu thấy ngươi đòi khi bà còn sống. Bà trao cho người khác, rồi đi trong giận."},
  {n:"Để bà tự định, ngươi chỉ hầu",e:["win","lose"],rt:"Thái hậu sống thêm, và vẫn giữ ngươi bên cạnh như trước.",rf:"Thái hậu đi khi chưa kịp dặn. Người của bà mỗi người một ngả."}]},
 x2:{h:"Người của Đức Thọ cung chọn chủ",w:"me",if:()=>S.thDead,t:"Người cũ Đức Thọ cung, họ ngoại, và cả {v} đều chờ. Ai đứng ra trước, người ấy là chỗ dựa mới.",o:[
  {n:"Đứng ra nhận",e:["mid","lose"],rt:"Ngươi nói rõ người nào giữ, nợ nào xóa. Người cũ cúi đầu theo.",rf:"Người cũ chia làm ba, một phần theo {v}."},
  {n:"Dâng chứng kẻ bỏ thuốc lên Hoàng thượng trước",e:["mid","lose"],go:(A,_ok,G)=>{if(CHR_BV(A))rdOan(A,"v",G[0])},rt:"Hoàng thượng cho tra nhà buôn thuốc. Người cũ Đức Thọ cung biết ai đã báo thù cho chủ họ, và theo ngươi.",rf:"Chứng không đủ. Người cũ thấy ngươi làm ầm mà không thành."},
  {n:"Buông, để họ tự chọn",e:"lose",lx:"thế lực Đức Thọ cung tan",rt:"Ngươi mở cửa cho họ đi."}]}},
 E:{win:{tag:"Cô mẫu khỏe lại, trọng thưởng ngươi",w:"th",t:"Thái hậu khỏe lại qua mùa đông. Bà gọi ngươi là “đứa cháu giữ mạng cho ai gia”, và cả hậu cung biết Đức Thọ cung còn đứng được, vì có ngươi.",go:()=>{if(S.thDead)return"";S.thIll=null;ap67({th:CHTH("ch_benh_11.E.win.th")});return fmt({th:CHTH("ch_benh_11.E.win.th")})}},
  mid:{tag:"Nối người của cô mẫu",w:"me",t:A=>A.thd?"Thái hậu đi trong một đêm tuyết, sau khi đã trao người của bà cho ngươi. Ngươi mất chỗ dựa, nhưng có những người bà để lại.":"Người cũ Đức Thọ cung theo ngươi. Không còn cô mẫu, nhưng ngươi đã thành chỗ dựa cho những người bà để lại.",go:A=>{if(S.thDead)return"";S.thDead=true;S.th=0;S.thIll=null;A.thd=1;return"<b>Thái hậu băng hà.</b>"}},
  lose:{tag:"Đức Thọ cung tan đàn",w:"me",t:A=>A.thd?"Thái hậu băng hà khi chưa kịp dặn lại. Người của bà mỗi người một ngả, ân oán của bà rơi lên đầu ngươi mà không ai đỡ.":"Người cũ Đức Thọ cung mỗi người một ngả. Ngươi vẫn là phi tần của Hoàng thượng, nhưng chỗ dựa cũ đã không còn, và chỗ dựa mới chưa có.",go:A=>{if(S.thDead)return"";S.thDead=true;S.th=0;S.thIll=null;A.thd=1;return"<b>Thái hậu băng hà.</b>"}}}});
RD97L.push(rdRare({a:"ch_benh_11",tag:"Vạch mặt kẻ dâng thuốc độc",w:"th",need:"th",n:"Mời Thái hậu ngồi nghe, để lương y nghiệm chén thuốc của nhà buôn ngay giữa điện",
 path:["Đưa lương y họ Tôn ra mắt","Đem chứng lên Hoàng thượng","Xin Hoàng thượng cho y một chức","Thưa: con giữ được","Đứng cạnh bà như mọi ngày","Ngồi chép cho bà"],bad:["Để đó","Để y đi","Gặp riêng {v}"],x:[()=>!S.thDead&&rdEnd(7)==="win"&&(S.th||0)>=netTh("th","than"),"Thái hậu còn, đã nắm được bã thuốc có độc, Thái hậu với ngươi đủ thiện cảm"],
 t:"Kim bạc đen lại trước mặt cả điện. Chủ hiệu thuốc cửa Đông quỳ rạp, khai ra người đã thuê hắn. Thái hậu ngồi thẳng lưng lần đầu sau một năm, phán một câu: “Ai gia còn sống, là nhờ đứa cháu này.” Hoàng thượng sai Đại Lý tự tra xét rồi tâu lên ngài định tội, và cho người ngươi tiến cử coi Ngự dược phòng.",
 go:()=>{if(!S.thDead){S.thIll=null;ap67({th:CHTH("ch_benh_11.rare.th")})}return""},rw:"nt_nhuy",ti:"Người giữ chén thuốc Đức Thọ cung"}));
/* ---------- ch_ho · Hai người cháu ---------- */
/* fix r1: ch_ho's rival is kin (a niece of the Thái hậu). A recast {v} is told as taken into the họ ngoại (cháu nuôi), so the kin texts hold
   for whoever is cast. The Thái hậu can die mid-road: her beats carry need:["th"]; CHHO_D gives each chapter an opening (sD), a turn (cD/tD)
   and a climax (xD) for a life where she is gone (the nieces then contend for the họ ngoại and her memory). */
const CHHO_CAST=A=>{const n=(A.rc||[]).length;if(!rdCast(A,["v"],{v:v=>v.rank>=1}))return false;
 try{if((A.rc||[]).length>n){const v=rv67(A,"v");if(v){const L=`Họ ngoại nhận ${v.name} làm cháu nuôi trong họ, đưa nàng vào chỗ người cháu cũ.`;A.rc.push(L);log(`<i>${L}</i>`)}}}catch(e){console.error(e)}return true};
/* the four ch_ho beats played after the Thái hậu dies: their numbers live in BAL.road.fx.ch_hoD (one entry for the five chapters), filled by rdFx */
const CHHO_D=(st,xh,xt)=>{const B={
 sD:{h:"Tang cô mẫu",w:"v",if:()=>S.thDead,t:"Thái hậu đã băng hà. "+st,o:[
  {n:"Giữ lễ tang trọn vẹn",f:"kind",wx:"họ ngoại thấy ngươi hiếu",lx:"mệt người, việc khác bỏ dở",rt:"Ngươi chép kinh trước bài vị cô mẫu đến khuya."},
  {n:"Viết thư cho phụ thân bàn việc họ",f:"self",wx:"nhà ngoại nghe ngươi trước",lx:"bị nói là chưa hết tang đã tính việc",rt:"Phụ thân hồi thư: “Cha hiểu ý con.”"},
  {n:"Rủ {v} cùng chịu tang",f:"pact",wx:"hai người cháu cùng một lòng",lx:"{v} cho là ngươi làm cho người ta xem",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} quỳ cạnh ngươi trước bài vị.",rf:"{v} quỳ riêng một góc."}]},
 cD:{h:"Thư của các trưởng bối",w:"maid",if:()=>S.thDead,t:"Thư nhà ngoại gửi vào: không còn cô mẫu, các trưởng bối hỏi trong hai người cháu ai sẽ thay bà giữ họ trong cung.",o:[
  {n:"Hồi thư khiêm nhường",f:"kind",wx:"trưởng bối thấy ngươi biết phận",lx:"họ nghe {v} nhiều hơn",rt:"Các trưởng bối hồi: “Được.”"},
  {n:"Gửi lễ cho các trưởng bối",f:"self",wx:"nhà ngoại nhắc tên ngươi",lx:"tốn bạc",rt:"Lễ đến tận tay mỗi nhà."},
  {n:"Bàn với {v} một lời chung",f:"pact",wx:"hai người cháu cùng một lời",lx:"{v} giữ lời riêng",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} ký chung một bức thư với ngươi.",rf:"{v} gửi thư riêng."}]},
 tD:{h:"Trước bài vị cô mẫu",w:"me",if:()=>S.thDead,t:"Đêm trước ngày lớn, ngươi đứng trước bài vị Thái hậu một mình.",o:[
  {n:"Khấn xin cô mẫu cho hai cháu hòa",f:"kind",wx:"Lòng +",lx:"không tính gì cho mình",rt:"Nhang cháy thẳng một hàng."},
  {n:"Khấn hứa giữ phần của cô mẫu",f:"self",wx:"lòng quyết",lx:"gánh nặng hơn",rt:"Ngươi lạy ba lạy."}]},
 xD:{h:xh,w:"v",if:()=>S.thDead,t:xt,o:[
  {n:"Đứng ra trước, nhận phần mình",e:["win","lose"],rt:"Họ ngoại và cả điện nhìn ngươi đứng đầu những người cháu của Thái hậu.",rf:"{v} bước lên trước ngươi một bước, và mọi người nhìn nàng."},
  {n:"Mời {v} cùng đứng ra",e:["win","mid"],rt:"Hai người cháu cùng đứng một hàng. Họ ngoại thấy một nhà.",rf:"{v} không bước lên. Mỗi người một hàng."},
  {n:"Lui về sau, giữ lễ tang",e:"mid",lx:"không ai nhắc đến ngươi hôm ấy",rt:"Ngươi lui về sau, cúi đầu trước bài vị."}]}};rdFx("ch_hoD",{B});return B};
/* BAL.road.ch_ho = {} (no chapter-level constants: costs and gains are inline, as j67 / jrd_tt) */
rdDef("ch_ho",5,{t:"Ai được gọi trước",w:"th",sj:"thứ tự thỉnh an ở Đức Thọ cung",cast:CHHO_CAST,
 g:A=>S.thDead?"Thái hậu đã băng hà. Mỗi sáng trước bài vị bà, người cháu nào thắp hương trước, cả hậu cung nhìn mà đoán gió. Giữ chỗ đứng của ngươi, mà không để {v} thành kẻ thù trước bài vị cô mẫu.":"Mỗi sáng ở Đức Thọ cung, Thái hậu gọi tên một người cháu trước. Cả hậu cung nhìn thứ tự ấy mà đoán gió. Giữ được chỗ đứng của ngươi, mà không để {v} thành kẻ thù trước mặt cô mẫu.",
 p:[["s1","s2","s3","sD"],["c1","c2","cD"],["t1","tD"],["x1","xD"]],
 B:{...CHHO_D("Mỗi sáng trước bài vị bà, cung nữ hai cung tranh nhau ai bày hương trước.","Lễ rằm trước bài vị","Ngày rằm, cả lục cung đến Đức Thọ cung dâng hương cô mẫu. Người cháu nào đứng đầu hàng, người ấy là cháu của bà trong mắt mọi người."),
 s1:{h:"Hai chén trà mỗi sáng",w:"v",need:["th"],if:()=>rdPrev()==="win"||rdPrev()==="r97",t:"Từ ngày ngươi và {v} nắm tay trước điện Phật, Thái hậu gọi cả hai cùng lúc. Nhưng cung nữ hai cung bắt đầu tranh nhau ai bưng trà trước.",o:[
  {n:"Dặn người của mình luôn nhường",wx:"{v} thấy ngươi giữ lời",lx:"người trong cung ngươi ấm ức",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Cung nữ của ngươi lui một bước. {v} nhìn sang, khẽ gật."},
  {n:"Cùng {v} chia ngày hầu trà",wx:"Đức Thọ cung có nề nếp",lx:"Thái hậu chê hai đứa tính toán với nhau",f:"pact",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Ngày chẵn ngươi, ngày lẻ {v}. Thái hậu cười: “Biết chia nhau là khôn.”",rf:"Thái hậu gạt đi: “Ai gia không cần lịch hầu.”"},
  {n:"Lặng lẽ đến sớm hơn",wx:"cô mẫu thấy ngươi chăm",lx:"{v} cho là ngươi phá lời hứa",f:"first",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Trời chưa sáng ngươi đã đứng ngoài Đức Thọ cung.",rf:"{v} đến sớm hơn cả ngươi."}]},
 s2:{h:"{v} đến từ canh tư",w:"v",need:["th"],if:()=>rdPrev()==="win2",t:"Thái hậu đã chọn ngươi. Từ đó {v} đến Đức Thọ cung từ canh tư, quỳ ngoài cửa chờ bà dậy. Cả cung bảo: người được chọn chưa chắc đã giữ được.",o:[
  {n:"Mời {v} vào cùng hầu",wx:"người ta thấy ngươi rộng lượng",lx:"{v} có thêm chỗ đứng",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} ngẩn ra, rồi theo ngươi vào trong."},
  {n:"Cũng đến từ canh tư",wx:"không nhường chỗ",lx:"mệt người, cả cung thấy hai đứa đua nhau",f:"first",rt:"Hai người cháu quỳ hai bên cửa, sương đẫm vai áo."},
  {n:"Nhờ ma ma Đức Thọ cung khuyên nàng",wx:"{v} thôi làm khó",lx:"Thái hậu biết ngươi sai người trong cung bà",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Ma ma nói khéo, {v} thôi quỳ ngoài cửa.",rf:"Ma ma kể với Thái hậu."}]},
 s3:{h:"Chiếc ghế đã có người",w:"v",need:["th"],if:RDW(0),t:"Mỗi sáng, chiếc ghế gấm bên tay Thái hậu là chỗ của {v}. Ngươi đứng phía sau, cùng các phi tần khác.",o:[
  {n:"Đứng sau mà vẫn giữ lễ",wx:"Thái hậu thấy ngươi không oán",lx:"đứng sau thì không ai nhìn",rt:"Ngươi cúi đầu đứng đúng chỗ mình."},
  {n:"Xin chép kinh dâng cô mẫu",wx:"bà nhớ ra còn ngươi",lx:"bà chỉ để chồng kinh sang một bên",rt:"Thái hậu lật mấy trang kinh, gật đầu.",rf:"Thái hậu bảo để đó."},
  {n:"Gửi lễ cho các trưởng bối họ ngoại",wx:"nhà ngoại nhắc tên ngươi",lx:"tốn bạc, {v} biết ngươi chưa chịu thua",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Thư nhà nói: các trưởng bối khen ngươi biết điều."}]},
 c1:{h:"Cung nữ hai bên cãi nhau",w:"maid",need:["th"],t:"Ở cổng Đức Thọ cung, {maid} và cung nữ của {v} giành nhau ấm nước nóng. Lời qua tiếng lại, có kẻ đã nhắc đến tên chủ.",o:[
  {n:"Phạt người của mình trước",wx:"Thái hậu thấy ngươi nghiêm",lx:"{maid} tủi thân",rt:"Ngươi phạt {maid} quỳ nửa canh giờ."},
  {n:"Đến tận nơi đòi lẽ phải",wx:"không ai dám coi thường người của ngươi",lx:"Thái hậu ghét ồn ào trước cửa",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Cung nữ của {v} xin lỗi trước mặt mọi người.",rf:"Thái hậu sai người ra đuổi cả hai."},
  {n:"Sai người mang trà sang tạ lỗi {v}",wx:"hai cung lại êm",lx:"người ta cho là ngươi yếu",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận trà, sai người mang lại một hộp bánh."}]},
 c2:{h:"Giờ thỉnh an bị đổi",w:"v",need:["v","th"],t:"{v} báo cho ngươi: sáng mai Thái hậu dời giờ thỉnh an muộn một khắc. Ngươi không biết có nên tin.",o:[
  {n:"Tin {v}",wx:"hai người cháu tin được nhau",lx:"ngươi đến muộn trước mặt cô mẫu",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Lời {v} là thật. Hai người đến cùng lúc.",rf:"Giờ không đổi. Thái hậu hỏi: “Con ngủ quên à?”"},
  {n:"Cho người dò ở Đức Thọ cung",wx:"biết lời thật hay giả",lx:"ma ma trong cung bà biết ngươi dò",rt:"Ma ma nói nhỏ: giờ vẫn như cũ."},
  {n:"Cứ đến đúng giờ cũ",wx:"không bị lừa",lx:"{v} biết ngươi không tin nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi đến đúng giờ cũ."}]},
 t1:{h:"Cô mẫu hỏi kinh",w:"th",need:["th"],t:"Thái hậu đặt chuỗi tràng hạt xuống: “Kinh Kim Cương, ai trong hai đứa thuộc đoạn ‘Ưng vô sở trụ’?”",o:[
  {n:"Đọc trọn đoạn kinh",wx:"bà gật đầu khen",lx:"vấp một câu trước mặt cả điện",rt:"Ngươi đọc không sót một chữ.",rf:"Ngươi vấp ở câu thứ tư."},
  {n:"Đọc rồi giảng nghĩa theo lòng mình",wx:"bà thấy ngươi hiểu chứ không chỉ thuộc",lx:"bà cho là ngươi lên mặt",f:"own",rt:"Thái hậu lặng nghe, rồi bảo: “Không để lòng dính vào đâu. Khó lắm.”",rf:"Thái hậu chau mày: “Ai gia hỏi đọc, không hỏi giảng.”"},
  {n:"Để {v} đọc trước",wx:"giữ hòa khí",lx:"bà khen {v}",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} đọc, liếc sang ngươi như cảm ơn."}]},
 x1:{h:"Buổi thỉnh an ngày rằm",w:"th",need:["th"],t:"Ngày rằm, cả lục cung đến Đức Thọ cung. Thái hậu sẽ gọi tên một người cháu ngồi cạnh bà trước mặt mọi người.",o:[
  {n:"Dâng lời chúc trước cả điện",e:["win","lose"],rt:"Thái hậu gọi tên ngươi trước. Cả điện cúi chào.",rf:"Thái hậu gọi tên {v}. Ngươi đứng lại phía sau, mặt nóng bừng."},
  {n:"Đứng cạnh {v}, chờ bà gọi cả hai",e:["win","mid"],rt:"Thái hậu vẫy cả hai: “Lại đây, hai đứa.”",rf:"Thái hậu gọi cả hai, nhưng không ai được ngồi."},
  {n:"Lùi về chỗ các phi tần",e:"mid",lx:"không ai nhắc đến ngươi hôm ấy",rt:"Ngươi ngồi giữa các phi tần, nhìn chiếc ghế gấm trống."}]}},
 E:{win:{tag:"Được gọi tên trước",w:"th",t:A=>S.thDead?"Từ ngày rằm ấy, ngươi đứng đầu hàng trước bài vị cô mẫu. Hậu cung bắt đầu nói: cháu nào giữ hương khói cho bà, nhìn hàng đứng là biết.":"Từ ngày rằm ấy, mỗi sáng Thái hậu gọi tên ngươi trước. Hậu cung bắt đầu nói: cô mẫu thương cháu nào, nhìn thứ tự là biết.",go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}},
  mid:{tag:"Hai người cháu đứng ngang",t:A=>S.thDead?"Hai người cháu đứng ngang nhau trước bài vị cô mẫu. Họ ngoại chưa biết nên theo ai.":"Thái hậu gọi cả hai, không phân trước sau. Chiếc ghế gấm vẫn để trống, chờ.",go:(_A,G)=>CHR_TH(G[0])},
  lose:{tag:"{v} đứng trước",t:A=>S.thDead?"{v} đứng đầu hàng trước bài vị cô mẫu. Các phi tần khác bắt đầu sang cung nàng trước, bỏ qua cửa cung ngươi.":"Mỗi sáng tên {v} được gọi trước. Các phi tần khác bắt đầu sang cung nàng thỉnh an, bỏ qua cửa cung ngươi.",go:(A,G)=>{const v=rv67(A,"v");if(v)spAdd(v,"sung",G[0]);return CHR_TH(G[1])}}}});

rdDef("ch_ho",6,{t:"Quà mừng thọ",w:"th",sj:"lễ mừng thọ Thái hậu",cast:CHHO_CAST,
 g:A=>S.thDead?"Thái hậu đã băng hà trước ngày thọ yến. Lễ giỗ đầu của bà còn đúng một tháng; nhà ngoại sẽ nhìn lễ vật của hai người cháu mà đoán ai giữ được hương khói cho bà.":"Thọ yến của Thái hậu còn đúng một tháng. Nhà ngoại sẽ nhìn quà của hai người cháu mà đoán ai được lòng bà. Quà phải dâng trong tiệc, không có ngày lùi.",
 p:[["s1","s2","sD"],["c1","c2","cD"],["t1","tD"],["x1","xD"]],
 B:{...CHHO_D("Lễ giỗ đầu còn một tháng. {v} đã cho người về Giang Nam đặt một pho Quan Âm bạch ngọc để dâng lên bài vị.","Lễ giỗ đầu","Lễ giỗ đầu Thái hậu. Lễ vật dâng lần lượt trước bài vị. Đến lượt hai người cháu, cả điện im phăng phắc."),
 s1:{h:"{v} cũng muốn thắng",w:"v",need:["th"],if:RDW(1),t:"Sau ngày rằm, {v} cho người về Giang Nam đặt một pho Quan Âm bạch ngọc. Nàng không định thua lần thứ hai.",o:[
  {n:"Đặt thợ Thượng y cục thêu bình phong Vạn thọ",wx:"một món quà xứng với Thái hậu",lx:"Bạc −−, phải xong trước thọ yến",f:"silk",rt:"Thợ nhận lời: hai mươi tám ngày, không hơn."},
  {n:"Tự tay chép trăm chữ Thọ",wx:"quà có tay ngươi",lx:"chữ chưa đẹp thì mất mặt",f:"hand",rt:"Ngươi chép đến chữ Thọ thứ một trăm, tay run mà nét vẫn vững.",rf:"Nét chữ chưa đều, ngươi phải chép lại từ đầu."},
  {n:"Rủ {v} cùng dâng một món",wx:"không ai thua",lx:"{v} cho là ngươi sợ thua",f:"pact",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} nghĩ lâu, rồi gật đầu.",rf:"{v} cười: “Quà ai nấy dâng.”"}]},
 s2:{h:"{v} đã có quà",w:"v",need:["th"],if:RDW(0),t:"Cả cung đã biết: {v} có pho Quan Âm bạch ngọc từ Giang Nam. Còn ngươi chưa có gì, thọ yến còn đúng một tháng.",o:[
  {n:"Bán bớt trang sức, đặt quà lớn",wx:"không thua về giá",lx:"bạc đi như nước",f:"silk",rt:"Thợ Thượng y cục nhận thêu bình phong Vạn thọ."},
  {n:"Hỏi nhà ngoại xem bà nhớ gì nhất",wx:"biết lòng bà",lx:"thư nhà về chậm",f:"know",rt:"Thư nhà kể: ngày bé bà thích nhất bánh hạnh nhân của mẹ.",rf:"Thư nhà chỉ dặn: đừng thua {v}."},
  {n:"Chỉ dâng lễ theo phép",wx:"không tranh",lx:"quà ngươi lẫn vào trăm món",rt:"Ngươi chọn một đôi bình sứ theo phép cung."}]},
 c1:{h:"Bánh của mẹ bà",w:"maid",need:["th"],t:"Một ma ma già ở Đức Thọ cung kể: thuở nhỏ Thái hậu thích món bánh hạnh nhân quê nhà. Từ khi vào cung, bà chưa được ăn lại.",o:[
  {n:"Tự học làm bánh",wx:"có món quà không ai nghĩ đến",lx:"bánh chưa đúng vị",f:"know",rt:"Lò bánh thứ bảy, ma ma nếm rồi rơm rớm: “Đúng vị rồi.”",rf:"Bánh khét, ma ma lắc đầu."},
  {n:"Nhờ nhà ngoại gửi người làm bánh vào",wx:"đúng vị quê",lx:"tốn bạc, người ngoài vào cung phải xin phép",f:"know",rt:"Một bà già quê nhà được vào Ngự thiện phòng ba ngày."},
  {n:"Kể lại với {v}",wx:"{v} biết ngươi không giấu",lx:"mất một nước hơn người",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} ngạc nhiên: “Sao tỷ lại nói cho muội biết?”"}]},
 c2:{h:"Quà bị hỏng",w:"v",need:["v","th"],t:"Còn bảy ngày đến thọ yến, món quà của ngươi bị đổ nước lên. Cung nữ nói thấy một người lạ đi ngang kho.",o:[
  {n:"Tra cho ra kẻ phá",wx:"bắt được tay",lx:"tra không ra, cả cung xì xào",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Là một tiểu thái giám nhận bạc của cung {v}.",rf:"Không ai nhận."},
  {n:"Lặng lẽ làm lại",wx:"không ai biết ngươi bị hại",lx:"bảy ngày, Sức −−",rt:"Ngươi thức bảy đêm làm lại."},
  {n:"Bỏ thêm bạc mua món khác",wx:"kịp thọ yến",lx:"tốn bạc, kẻ phá vẫn yên",rt:"Một đôi như ý ngọc được mang vào kịp."}]},
 t1:{h:"Nhà ngoại dò hỏi",w:"maid",need:["th"],t:"Thư nhà ngoại gửi vào: các trưởng bối muốn biết trước quà của hai người cháu, để còn biết đứng sau ai trong tiệc.",o:[
  {n:"Kể thật quà của mình",wx:"nhà ngoại tin ngươi",lx:"lời có thể lọt đến {v}",rt:"Các trưởng bối hồi thư: “Được.”"},
  {n:"Nói một món, dâng một món",wx:"{v} đoán sai",lx:"nhà ngoại thấy ngươi giấu",f:"hide",rt:"Tin đồn ngươi dâng bình sứ chạy khắp cung.",rf:"Nhà ngoại biết ngươi nói dối."},
  {n:"Không trả lời",wx:"không lộ gì",lx:"nhà ngoại phật ý",rt:"Ngươi gấp thư cất đi."}]},
 x1:{h:"Dâng quà trên thọ yến",w:"th",need:["th"],t:"Thọ yến. Quà dâng lần lượt. Đến lượt hai người cháu, cả điện im phăng phắc.",o:[
  {n:"Dâng món quà riêng của ngươi",e:["win","lose"],rt:"Thái hậu cầm món quà lâu, rồi đặt nó cạnh chỗ ngồi của bà.",rf:"Thái hậu khen một câu, rồi quay sang pho Quan Âm của {v}."},
  {n:"Dâng chung với {v}",e:["win","mid"],rt:"Thái hậu cười: “Hai đứa một lòng là quà quý nhất.”",rf:"Thái hậu gật đầu, khen chung, không nhớ món nào."},
  {n:"Dâng theo phép, không tranh",e:"mid",lx:"không ai nhớ quà của ngươi",rt:"Quà ngươi được ghi vào sổ cùng trăm món khác."}]}},
 E:{win:{tag:A=>S.thDead?"Lễ vật của ngươi đặt trước bài vị":"Quà của ngươi được bà giữ bên mình",w:"th",t:A=>S.thDead?"Lễ vật của ngươi được đặt ngay trước bài vị cô mẫu. Nhà ngoại nghe tin, thư gửi vào cung ngươi nhiều hơn.":"Món quà của ngươi được để ở tẩm điện Thái hậu. Nhà ngoại nghe tin, thư gửi vào cung ngươi nhiều hơn.",go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}},
  mid:{tag:"Quà nào cũng được khen",t:A=>S.thDead?"Lễ vật của hai người cháu được bày ngang nhau. Nhà ngoại vẫn chưa biết nên đứng sau ai.":"Thái hậu khen cả hai. Nhà ngoại vẫn chưa biết nên đứng sau ai.",go:(_A,G)=>CHR_TH(G[0])},
  lose:{tag:"Quà của {v} bày giữa điện",t:A=>S.thDead?"Pho Quan Âm của {v} được đặt giữa điện thờ. Mỗi lần dâng hương, ngươi đều phải đi ngang qua nó.":"Pho Quan Âm của {v} được bày giữa Đức Thọ cung. Mỗi lần thỉnh an, ngươi đều phải đi ngang qua nó.",go:(_A,G)=>CHR_TH(G[0])}}});

rdDef("ch_ho",7,{t:"Lời gièm",w:"v",sj:"lời gièm đến tai Thái hậu",cast:CHHO_CAST,
 g:A=>S.thDead?"Có lời truyền khắp cung rằng ngay trong tang, ngươi nói xấu cô mẫu. Lời gièm đi nhanh hơn người. Tìm ra gốc của nó, trước khi nhà ngoại tin.":"Có lời truyền đến Đức Thọ cung rằng ngươi nói sau lưng cô mẫu. Lời gièm đi nhanh hơn người. Tìm ra gốc của nó, trước khi Thái hậu tin.",
 p:[["s1","s2","sD"],["c1","c2"],["t1"],["x1","xD"]],
 B:{...CHHO_D("Khắp cung truyền rằng trong tang cô mẫu, ngươi chê bà khắt khe.","Nhà ngoại hỏi tội","Các trưởng bối họ ngoại gửi thư vào hỏi cả hai người cháu: lời gièm từ đâu ra? Thư của người cháu nào cũng sẽ được đọc trước cả họ."),
 s1:{h:"Một câu nói bị cắt",w:"maid",need:["th"],if:RDW(1),t:"Hôm thọ yến, ngươi nói với {maid}: “Cô mẫu tuổi cao, ăn bánh ngọt không tốt.” Nay khắp cung truyền rằng ngươi chê Thái hậu già.",o:[
  {n:"Đến thưa thẳng với cô mẫu",wx:"bà biết ngươi lo cho bà",lx:"bà cho là ngươi chột dạ",rt:"Thái hậu cười: “Con lo cho ai gia, ai gia biết.”",rf:"Thái hậu chỉ nói: “Ai gia già thật.”"},
  {n:"Hỏi {maid} đã kể với ai",wx:"biết lời lọt từ đâu",lx:"{maid} sợ, cả cung ngươi nơm nớp",f:"trace",rt:"{maid} nhớ ra: hôm ấy có cung nữ của {v} đứng sau bình phong."},
  {n:"Để mặc, lời đồn tự tắt",wx:"không làm to chuyện",lx:"Lời đồn +",rt:"Ngươi không nói gì."}]},
 s2:{h:"Thái hậu hỏi một câu",w:"th",need:["th"],if:RDW(0),t:()=>`Thái hậu hỏi: “Nghe nói dạo này con hay sang ${CHR_Q()}?” Ngươi chỉ sang đó một lần, theo lệ.`,o:[
  {n:"Thưa rõ ngày nào, vì việc gì",wx:"bà thấy ngươi không giấu",lx:"bà nghĩ ngươi đã chuẩn bị lời",rt:"Thái hậu gật đầu: “Vậy là có người nói thêm.”",rf:"Thái hậu không đáp."},
  {n:"Hỏi ai đã nói với cô mẫu",wx:"biết kẻ gièm",lx:"bà cho là ngươi hỏi vặn",f:"trace",rt:"Thái hậu buột miệng: “{v} cũng chỉ lo cho con.”",rf:"Thái hậu nói: “Ai nói thì có quan gì.”"},
  {n:"Quỳ xin cô mẫu đừng nghi",wx:"tỏ lòng",lx:"quỳ là như nhận có chuyện",rt:"Thái hậu đỡ ngươi dậy, mà mắt vẫn lạnh."}]},
 c1:{h:"Lời đồn ở Ngự hoa viên",w:"maid",t:"Ở Ngự hoa viên, các cung nữ thì thầm: cháu gái Thái hậu đêm đêm viết thư ra ngoài. Không ai biết thư gửi ai.",o:[
  {n:"Đưa hết thư nhà cho Thái hậu xem",need:["th"],wx:"không còn gì để đồn",lx:"bà đọc cả chuyện riêng của nhà ngươi",rt:"Thái hậu lật mấy bức, rồi trả lại."},
  {n:"Cho người bắt tận cung nữ nói đầu",wx:"bắt được người",lx:"bị nói là bịt miệng",f:"trace",rt:"Cung nữ ấy khai: có người cho nàng một chiếc trâm bạc để nói.",rf:"Cung nữ ấy đã bị chuyển đi nơi khác."},
  {n:"Tung một lời đồn khác đè lên",wx:"cả cung nói chuyện khác",lx:"bị lộ là ngươi tung",rt:"Ba ngày sau, cả cung chỉ nói chuyện một con mèo lạc vào Dưỡng Tâm điện.",rf:"Có kẻ nhận ra lời đồn mới đến từ cung ngươi."}]},
 c2:{h:"{v} đến thăm",w:"v",need:["v"],t:"{v} mang trà sang, nói như vô tình: “Muội cũng nghe người ta nói xấu tỷ. Tỷ đừng để bụng.”",o:[
  {n:"Cảm ơn, giữ lại nói chuyện",wx:"{v} lỡ lời",lx:"nàng ra về mà ngươi không biết thêm gì",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"Nói một hồi, {v} lỡ lời nhắc đúng câu ngươi nói với {maid}.",rf:"{v} nói chuyện khác, rồi về."},
  {n:"Đáp thẳng: lời ấy từ cung {tg} ra",wx:"{v} biết ngươi đã biết",lx:A=>S.thDead?"thành ra cãi nhau, đến tai nhà ngoại":"thành ra cãi nhau, đến tai Thái hậu",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} tái mặt, đặt chén trà xuống.",rf:A=>S.thDead?"{v} khóc, viết thư về nhà ngoại.":"{v} khóc chạy sang Đức Thọ cung."},
  {n:"Tiếp trà, không nói gì",wx:"không lộ ý",lx:"{v} cho là ngươi chưa biết",rt:"Ngươi rót thêm trà, mỉm cười."}]},
 t1:{h:"Chiếc trâm bạc",w:"maid",t:"Chiếc trâm bạc trả cho kẻ tung tin có khắc hoa văn của Nội vụ phủ, chỉ phát cho cung có phẩm từ bậc nhất định trở lên.",o:[
  {n:"Tra sổ phát trâm của Nội vụ phủ",wx:"có chứng cứ",lx:"Nội vụ phủ báo lên",f:"proof",rt:"Sổ ghi: trâm ấy phát cho cung {v} mùa xuân năm ngoái.",rf:"Quản sự Nội vụ phủ nói sổ đã nộp lên."},
  {n:"Giữ trâm, không tra",wx:"một con bài trong tay",lx:"chưa có chứng gì",rt:"Ngươi gói trâm trong khăn."},
  {n:"Gửi trả trâm cho {v}",wx:"{v} biết ngươi tha",lx:"{v} cho là ngươi không dám",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nhận trâm, đêm ấy không ngủ."}]},
 x1:{h:"Đối chất trước Thái hậu",w:"th",need:["th"],t:"Thái hậu gọi cả hai vào: “Ai gia già rồi, không muốn nghe nhà mình nói xấu nhau. Nói một lần cho rõ.”",o:[
  {n:"Đặt chứng cứ trước bà",e:["win","lose"],rt:"Thái hậu nhìn chiếc trâm và sổ Nội vụ phủ, rồi nhìn {v} rất lâu.",rf:"Thái hậu gạt đi: “Một chiếc trâm thì ai chẳng mua được.”"},
  {n:"Xin bà đừng hỏi nữa, hai cháu tự hòa",e:["win","mid"],rt:"Thái hậu thở ra: “Biết nhường là biết lớn.” {v} cúi đầu không dám nhìn ngươi.",rf:"Thái hậu gật đầu, nhưng lòng chưa tan."},
  {n:"Nhận lỗi đã lỡ lời",e:"mid",lx:"lời gièm thành như có thật",rt:"Ngươi nhận lỗi về câu nói ấy. Thái hậu cho lui."}]}},
 E:{win:{tag:"Lời gièm bị vạch",w:"th",t:A=>S.thDead?"Nhà ngoại biết ai đã gièm. Không ai phạt {v}, nhưng thư nhà gửi nàng thưa dần.":"Thái hậu biết ai đã gièm. Bà không phạt {v}, nhưng từ đó không cho nàng ngồi ghế gấm nữa.",go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}},
  mid:{tag:"Lời gièm lắng xuống",t:A=>S.thDead?"Không ai thắng. Lời gièm lắng xuống, để lại một vết trong lòng nhà ngoại.":"Không ai thắng. Lời gièm lắng xuống, để lại một vết trong lòng Thái hậu."},
  lose:{tag:A=>S.thDead?"Nhà ngoại tin lời gièm":"Thái hậu tin lời gièm",t:A=>S.thDead?"Nhà ngoại tin ngươi nói xấu cô mẫu trong tang. Thư nhà gửi ngươi chỉ còn lời khách sáo.":"Thái hậu tin ngươi nói sau lưng bà. Bà vẫn cho ngươi thỉnh an, nhưng không còn hỏi han.",go:(_A,G)=>CHR_TH(G[0])}}});

rdDef("ch_ho",8,{t:"Nhà ngoại",w:"th",sj:"nhà ngoại chọn người cháu",cast:CHHO_CAST,
 g:"Cuối năm, các trưởng bối họ ngoại họp ở phủ Quốc cữu, phủ của phụ thân ngươi. Họ sẽ dồn bạc, người và tiếng nói trong triều cho một người cháu trong cung. Ngươi không ra khỏi cung được, chỉ có thư và người tin.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của phụ thân",w:"maid",if:RDW(1),t:"Phụ thân viết: các trưởng bối nghiêng về con, nhưng họ muốn biết con làm được gì cho họ. Một người cháu trong họ đang chờ một chức quan.",o:[
  {n:"Hứa sẽ nói giúp",wx:"nhà ngoại thấy ngươi có ích",lx:"lời hứa phải giữ",f:"promise",rt:"Phụ thân hồi thư: “Các bác vui lắm.”"},
  {n:"Thưa: con không xen việc triều",wx:"giữ phép cung",lx:"trưởng bối chê ngươi vô dụng",f:"clean",rt:"Phụ thân im lặng một tháng."},
  {n:"Gửi bạc về giúp họ",wx:"nhà ngoại nhận ơn",lx:"tốn bạc, họ sẽ đòi nữa",rt:"Các trưởng bối gửi thư cảm tạ."}]},
 s2:{h:"Các trưởng bối im lặng",w:"maid",if:RDW(0),t:"Đã ba tháng không có thư nhà ngoại. Nghe nói mẹ {v} về phủ Quốc cữu chúc Tết sớm hơn mọi năm.",o:[
  {n:"Viết thư cho phụ thân hỏi rõ",wx:"biết họ đang nghĩ gì",lx:"phụ thân đáp mập mờ",rt:"Phụ thân viết: “Họ chưa chọn. Con còn kịp.”",rf:"Phụ thân chỉ dặn con giữ sức."},
  {n:"Gửi lễ Tết cho từng trưởng bối",wx:"họ nhớ ra ngươi",lx:"tốn bạc",rt:"Lễ đến tận tay mỗi nhà."},
  {n:"Nhờ Thái hậu viết một dòng",need:["th"],wx:"lời bà nặng hơn mọi lễ",lx:"bà thấy ngươi mượn bà",rt:"Thái hậu viết: “Cháu nào cũng là cháu.” Đủ để họ không bỏ ngươi.",rf:"Thái hậu bảo: “Việc nhà ngoài để ngoài lo.”"}]},
 c1:{h:"Chức quan cho cháu họ",w:"emp",t:"Các trưởng bối muốn một người cháu trong họ được bổ làm Tri phủ. Họ nhờ ngươi nói với Hoàng thượng.",o:[
  {n:"Khéo nói với Hoàng thượng",wx:"nhà ngoại nợ ngươi",lx:"Hoàng thượng chê ngươi xen việc bổ quan",f:"promise",rt:"Hoàng thượng bảo: “Để Lại bộ xét.” Ba tháng sau có chiếu bổ.",rf:"Hoàng thượng nhìn ngươi: “Nhà ngoại Thái hậu đông người quá.”"},
  {n:"Khuyên họ để cháu ấy tự thi",wx:"tay sạch",lx:"trưởng bối phật ý",f:"clean",rt:"Ngươi viết thư khuyên. Trưởng bối không đáp."},
  {n:"Nhờ {v} cùng nói",wx:"hai cháu cùng ơn",lx:"{v} nhận hết công",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} đồng ý, hai người cùng ký thư về nhà.",rf:"{v} tự đi nói, rồi báo về nhà là công nàng."}]},
 c2:{h:"{v} hứa gả em gái",w:"v",need:["v"],t:"Nghe nói {v} hứa với nhà ngoại: em gái nàng sẽ gả cho con trưởng phủ Quốc cữu, nối hai nhánh họ làm một.",o:[
  {n:"Viết thư cho phụ thân can",wx:"phụ thân lùi lại",lx:"phụ thân cho là con ghen",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Phụ thân hồi: “Hôn sự để sau.”",rf:"Phụ thân hồi: “Việc nhà, cha lo.”"},
  {n:"Mừng cho cuộc hôn nhân",wx:"hai nhánh một nhà, ngươi cũng có phần",lx:"{v}: thế lực +",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Ngươi gửi lễ mừng. {v} ngỡ ngàng."},
  {n:"Tìm hiểu em gái {v}",wx:"biết người biết ta",lx:"bị nói là dò nhà người",rt:"Em gái {v} thật lòng thương con trưởng phủ Quốc cữu.",rf:"Không ai chịu nói."}]},
 t1:{h:"Phụ thân hỏi",w:"maid",t:"Thư phụ thân: “Nhà ta nên dồn cho con hay cho {v}? Cha hỏi con thật, không hỏi như Quốc cữu hỏi phi tần.”",o:[
  {n:"Thưa: dồn cho con",f:"self",wx:"phụ thân biết con muốn",lx:"phụ thân lo con tranh quá",rt:"Phụ thân hồi: “Cha hiểu.”"},
  {n:"Thưa: chia cho cả hai",f:"kind",wx:"nhà ngoại không chia rẽ",lx:"phần ngươi mỏng đi",rt:"Phụ thân hồi: “Con giống cô mẫu lúc trẻ.”"},
  {n:"Thưa: để trưởng bối tự chọn",wx:"không mang tiếng",lx:"không nói thì người khác nói",rt:"Phụ thân hồi một chữ: “Được.”"}]},
 x1:{h:"Buổi họp họ ở phủ Quốc cữu",w:"maid",t:"Đêm giao thừa, các trưởng bối họp ở phủ Quốc cữu. Thư ngươi gửi về sẽ được đọc trước họ.",o:[
  {n:"Gửi thư nói rõ ngươi làm được gì cho họ",e:["win","lose"],rt:"Đọc xong, các trưởng bối đồng thanh: dồn cho người cháu này.",rf:"Thư nghe như đòi hỏi. Các trưởng bối quay sang thư của {v}."},
  {n:"Đề nghị họ ủng hộ cả hai cháu",e:["win","mid"],rt:"Các trưởng bối gật gù: hai cháu cùng lên thì họ cùng lên.",rf:"Các trưởng bối chia làm hai, mỗi bên theo một cháu."},
  {n:"Chỉ gửi lời chúc Tết",e:"mid",lx:"không ai nói thay ngươi",rt:"Thư ngươi chỉ có lời chúc. Họ đọc xong, bàn chuyện khác."}]}},
 E:{win:{tag:"Nhà ngoại dồn sức cho ngươi",w:"maid",t:"Họ ngoại Thái hậu đứng sau ngươi: bạc, người, và vài lời nói trong triều. {v} biết, và nàng không ngủ được.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Nhà ngoại chia đôi",t:"Các trưởng bối chia sức cho cả hai cháu. Không ai đủ mạnh, nhưng cũng không ai bị bỏ."},
  lose:{tag:"Nhà ngoại theo {v}",t:"Nhà ngoại dồn sức cho {v}. Thư nhà gửi ngươi chỉ còn lời hỏi thăm sức khỏe.",go:(A,G)=>{const v=rv67(A,"v");if(v)spAdd(v,"sung",G[0]);return ""}}}});

rdDef("ch_ho",9,{t:"Kẻ thù chung",w:"emp",sj:"tờ sớ hặc họ ngoại Thái hậu",cast:CHHO_CAST,
 g:"Ngự sử đài dâng sớ hặc ngoại thích chuyên quyền, nêu tên cả phủ Quốc cữu lẫn nhà {v}. Sóng này đánh vào cả họ. Đứng chung với {v}, hay để nhà nàng gánh thay.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tờ sớ nêu tên phụ thân",w:"emp",if:RDW(1),t:"Vì nhà ngoại dồn sức cho ngươi, tờ sớ nêu tên phụ thân ngươi trước: Quốc cữu kết bè, mượn thế Đức Thọ cung.",o:[
  {n:"Viết thư dặn phụ thân lui một bước",wx:"phụ thân không bị bắt lỗi thêm",lx:"phụ thân cho là con dạy cha",rt:"Phụ thân dâng sớ xin bớt việc. Ngự sử đài khó nói tiếp.",rf:"Phụ thân hồi: “Cha không có tội, sao phải lui?”"},
  {n:"Xin Thái hậu lên tiếng",need:["th"],wx:"một lời của bà nặng hơn mười tờ sớ",lx:"bà bực vì ngoại thích làm phiền",f:"th",rt:"Thái hậu bảo Hoàng thượng: “Nhà ai gia không ai tham.”",rf:"Thái hậu đáp: “Ai làm thì người ấy chịu.”"},
  {n:"Tìm {v} bàn cách",wx:"hai nhà cùng một lời",lx:"{v} chỉ chờ nhà ngươi ngã",f:"ally",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} đến ngay: “Nhà muội cũng bị nêu tên. Lúc này không tranh nữa.”",rf:"{v} cáo bệnh không gặp."}]},
 s2:{h:"Tờ sớ nêu tên nhà {v}",w:"emp",if:RDW(0),t:"Tờ sớ nêu tên nhà {v} trước: nhà nàng được nhà ngoại dồn sức, lại nhận đất phong quá phép. Nhà ngươi chỉ được nhắc ở dòng cuối.",o:[
  {n:"Đứng ngoài, để nhà nàng chịu",wx:"nhà ngươi yên",lx:"{v} nhớ ngươi đứng nhìn",f:"apart",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi không nói một lời nào."},
  {n:"Sang an ủi {v}",wx:"{v} cảm động",lx:"người ta nói ngươi cùng phe với nhà bị hặc",f:"ally",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} nắm tay ngươi: “Không ngờ người đến là tỷ.”"},
  {n:"Nhờ người nhà báo tin cho Ngự sử về đất phong",wx:"nhà {v} gánh hết",lx:"bị lộ là ngươi đâm sau lưng họ mình",f:"apart",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Tờ sớ thứ hai chỉ nêu tên nhà {v}.",rf:"Ngự sử nói với người khác: tin ấy từ trong họ ra."}]},
 c1:{h:"Hoàng hậu ra tay",w:"hh",need:["hh","th"],t:"Hoàng hậu {hh} nhân dịp xin Hoàng thượng thu bớt việc lục cung khỏi Đức Thọ cung, nói là để Thái hậu tĩnh dưỡng.",o:[
  {n:"Thưa với Thái hậu ngay",wx:"bà kịp lên tiếng",lx:"Hoàng hậu biết ngươi báo",rt:"Thái hậu sai người đến Càn Ninh cung hỏi chuyện."},
  {n:"Gặp Hoàng hậu cầu hòa",wx:"Hoàng hậu nương tay",lx:"Thái hậu biết ngươi sang Càn Ninh cung",rt:"Hoàng hậu cười: “Muội biết điều.” Việc thu quyền gác lại.",rf:"Hoàng hậu không tiếp."},
  {n:"Cùng {v} xin Thái hậu giữ quyền",wx:"hai cháu cùng giữ cho bà",lx:"Hoàng hậu thấy hai nhà cùng chống",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0])},rt:"Thái hậu nhìn hai đứa, khẽ cười.",rf:"Thái hậu bảo: “Việc của ai gia, ai gia lo.”"}]},
 c2:{h:"{v} đến lúc nửa đêm",w:"v",need:["v"],t:"{v} đến lúc nửa đêm, không mang người theo: “Nếu một nhà phải ngã, tỷ muốn nhà nào?”",o:[
  {n:"Không nhà nào phải ngã",wx:"{v} tin ngươi",lx:"nàng không tin",f:"ally",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1])},rt:"{v} ngồi xuống. Hai người bàn đến khi gà gáy.",rf:"{v} cười buồn rồi về."},
  {n:"Nhà ta không phạm tội",wx:"không nhận phần",lx:"{v} biết ngươi sẽ để nàng ngã",f:"apart",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đứng dậy, không nói nữa."},
  {n:"Xin nàng đưa sổ đất phong để lo",wx:"nắm được chứng của nhà nàng",lx:"nàng thấy ngươi muốn nắm thóp",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} do dự, rồi đưa sổ.",rf:"{v} lùi lại: “Tỷ muốn cứu hay muốn cầm?”"}]},
 t1:{h:"Ngự sử cần một cái tên",w:"emp",t:"Một vị Ngự sử già nhắn qua phủ Quốc cữu: sóng sẽ lặng nếu có một người trong họ bị phạt. Một cái tên là đủ.",o:[
  {n:"Không đưa tên ai",wx:"giữ đạo người trong họ",lx:"sóng còn dài",f:"ally",rt:"Ngươi trả lời: trong họ không ai để đưa."},
  {n:"Đưa tên một quản sự đất phong nhà {v}",f:"apart",wx:"nhà ngươi qua sóng",lx:"{v} sẽ biết",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Tên quản sự được ghi vào sớ."},
  {n:"Đưa tên quản gia phủ Quốc cữu từng ăn chặn",wx:"nhà mình tự làm sạch",lx:"phụ thân giận vì con bêu nhà",rt:"Quản gia bị tra. Ngự sử đài khen phủ Quốc cữu biết giữ phép.",rf:"Quản gia khai lan sang cả phụ thân."}]},
 x1:{h:"Hoàng thượng hỏi họ ngoại",w:"emp",t:"Hoàng thượng triệu cả hai người cháu: “Ngoại thích của mẫu hậu, trẫm nên xử thế nào?”",o:[
  {n:"Cùng {v} quỳ xin xét công bằng",e:["win","lose"],rt:"Hoàng thượng thấy hai người cháu đồng lòng, cho gác tờ sớ.",rf:"Hoàng thượng bảo: “Đồng lòng mới đáng lo.” Ngài phê: cả hai nhà bị phạt bổng."},
  {n:"Tâu riêng cho nhà mình",e:["mid","lose"],rt:"Hoàng thượng nghe, rồi phê: nhà ngươi được miễn, nhà {v} bị phạt bổng.",rf:"Hoàng thượng nhìn ngươi lạnh lùng: “Người trong họ mà còn thế.”"},
  {n:"Xin Hoàng thượng hỏi Thái hậu",need:["th"],e:"mid",lx:"bà phải tự lo cho họ mình",rt:"Hoàng thượng sang Đức Thọ cung. Chuyện được xử nhẹ, không ai được công."}]}},
 E:{win:{tag:"Hai nhà cùng qua sóng",w:"v",t:"Tờ sớ được gác. {v} biết nếu không có ngươi, nhà nàng đã ngã. Mối thù giữa hai người cháu lần đầu lỏng ra.",go:(A,G)=>{rdRel(A,"v",G[0]);return CHR_TH(G[1])}},
  mid:{tag:"Mỗi nhà tự gánh",t:"Sóng qua. Nhà nào cũng mất một ít. Hai người cháu nhìn nhau như người dưng."},
  lose:{tag:"Nhà ngươi gánh tội",t:A=>`Hoàng thượng phê: phủ Quốc cữu bị phạt bổng, quản gia bị đày. ${S.thDead?"Họ ngoại buồn":"Thái hậu buồn"}, và người trong họ bắt đầu nói ngươi không giữ nổi nhà.`,go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}}}});

rdDef("ch_ho",10,{t:"Chiếc ghế",w:"th",sj:"người ngồi bên Thái hậu",cast:CHHO_CAST,
 g:A=>S.thDead?"Thái hậu đã khuất, ấn riêng của bà còn đặt ở Đức Thọ cung. Sau lễ Phật đản, Hoàng thượng sẽ giao việc hương khói Đức Thọ cung và ấn ấy cho một người cháu giữ. Ai giữ, người ấy là tiếng nói của họ ngoại trong hậu cung.":"Thái hậu sắp giao việc Đức Thọ cung và ấn riêng của bà cho một người cháu giữ. Bà sẽ chọn sau lễ Phật đản. Ai ngồi chiếc ghế ấy, người ấy là tiếng nói của bà trong hậu cung.",
 p:[["s1","s2","sD"],["c1","c2","cD"],["t1","tD"],["x1","xD"]],
 B:{...CHHO_D("Ấn riêng của bà còn đặt ở Đức Thọ cung, chờ Hoàng thượng giao cho một người cháu.","Hoàng thượng giao ấn","Sau lễ Phật đản, Hoàng thượng cho đặt ấn riêng của Thái hậu lên án, gọi cả hai người cháu đến."),
 s1:{h:"Bà thử cả hai",w:"th",need:["th"],if:RDW(1),t:"Thái hậu giao cho ngươi sổ chi tiêu Đức Thọ cung một tháng, giao cho {v} việc lo lễ Phật đản. Bà nói: “Xem đứa nào làm được.”",o:[
  {n:"Tra sổ thật kỹ",wx:"thấy chỗ hở trong sổ",lx:"chỉ thấy sổ sạch",f:"able",rt:"Ngươi thấy một quản sự ăn bớt dầu đèn ba năm.",rf:"Sổ sạch, ngươi không có gì để trình."},
  {n:"Giúp {v} lo lễ Phật đản",wx:"lễ chu toàn",lx:"công về tay {v}",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Lễ Phật đản không sót một việc nhỏ."},
  {n:"Làm phần mình, không nhìn sang",wx:"không ai nói ngươi xen",lx:"bà không thấy ngươi hơn",rt:"Ngươi trả sổ đúng hạn."}]},
 s2:{h:"Bà không gọi ngươi",w:"th",need:["th"],if:RDW(0),t:"Việc Đức Thọ cung, Thái hậu chỉ giao cho {v}. Ngươi biết tin qua một tiểu thái giám.",o:[
  {n:"Xin bà cho được giúp một việc nhỏ",wx:"bà cho ngươi lo hương đèn",lx:"bà bảo không cần",f:"able",rt:"Thái hậu gật: “Lo hương đèn đi.”",rf:"Thái hậu nói: “Có {v} rồi.”"},
  {n:"Tìm việc {v} làm sai",wx:"có lời để nói",lx:"bị nói là soi mói",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} đặt sai chỗ bài vị của tiên đế.",rf:"Không thấy gì."},
  {n:"Lo việc cung mình",wx:"không tranh",lx:"chiếc ghế xa thêm",rt:"Ngươi đóng cửa cung chép kinh."}]},
 c1:{h:"Ma ma già của Đức Thọ cung",w:"maid",need:["th"],t:"Ma ma hầu Thái hậu bốn mươi năm gặp ngươi ở hành lang: “Bà không tìm người giỏi nhất. Bà tìm người sau này không hại người kia.”",o:[
  {n:"Cảm ơn ma ma, ghi nhớ",f:"kind",wx:"hiểu lòng bà",lx:"biết thì phải làm",rt:"Ma ma gật đầu đi."},
  {n:"Biếu ma ma, xin thêm lời",wx:"biết bà sẽ hỏi gì",lx:"ma ma kể lại với bà",rt:"Ma ma nói: “Bà sẽ hỏi: nếu không được chọn, con làm gì.”",rf:"Ma ma trả lễ, lạnh mặt."},
  {n:"Cho là ma ma nói giúp {v}",wx:"không bị dắt mũi",lx:"bỏ qua một lời thật",rt:"Ngươi cười, không đáp."}]},
 c2:{h:"{v} quỳ trước điện Phật",w:"v",need:["v","th"],t:"Trước lễ Phật đản, {v} quỳ ở điện Phật Đức Thọ cung ba ngày ba đêm cầu thọ cho Thái hậu. Có người bảo nàng thật lòng, có người bảo nàng làm cho bà xem.",o:[
  {n:"Mang áo ấm đến cho nàng",wx:"Thái hậu biết ngươi đến",lx:"tốn bạc, người ta nói ngươi giả nhân",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} không quay lại, nhưng khoác áo lên vai."},
  {n:"Cho người xem nàng quỳ thật hay giả",wx:"biết sự thật",lx:"bị nói là soi người đang cầu Phật",rt:"Nàng quỳ thật, đầu gối rướm máu.",rf:"Người của ngươi bị bắt gặp."},
  {n:"Thay {v} lo việc Phật đản",wx:"lễ vẫn chu toàn",lx:"lễ có sơ suất thì bà trách, {v} cho là ngươi giành việc",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Lễ chu toàn, Thái hậu khen.",rf:"Lễ có chỗ sơ suất, ai cũng nhớ."}]},
 t1:{h:"Nếu ai gia không chọn con",w:"th",need:["th"],t:"Thái hậu hỏi riêng ngươi: “Nếu ai gia không chọn con, con làm gì?”",o:[
  {n:"Con vẫn hầu cô mẫu như cũ",f:"kind",wx:"bà yên lòng",lx:"bà biết ngươi không đòi",rt:"Thái hậu xoa đầu ngươi như ngày ngươi mới vào cung."},
  {n:"Con sẽ tự đứng được",wx:"bà thấy ngươi cứng cỏi",lx:"bà sợ ngươi rồi sẽ hại {v}",f:"self",rt:"Thái hậu cười: “Giống ai gia.”",rf:"Thái hậu nhíu mày."},
  {n:"Con xin cô mẫu đừng hỏi thế",wx:"không nói lời lỡ",lx:"bà không biết lòng ngươi",rt:"Thái hậu thở dài."}]},
 x1:{h:"Thái hậu chọn",w:"th",need:["th"],t:"Sau lễ Phật đản, Thái hậu đặt ấn riêng của bà lên bàn, gọi cả hai người cháu.",o:[
  {n:"Bước lên nhận ấn",e:["win","lose"],rt:"Thái hậu đặt ấn vào tay ngươi.",rf:"Thái hậu đặt ấn vào tay {v}."},
  {n:"Xin bà để hai cháu cùng giữ",e:["win","mid"],rt:"Thái hậu bật cười, chia ấn và sổ: ngươi giữ ấn, {v} giữ sổ.",rf:"Thái hậu cất ấn: “Chưa đến lúc.”"},
  {n:"Lùi lại, để {v} nhận",e:"mid",lx:"chiếc ghế không phải của ngươi",rt:"Ngươi lùi lại. Thái hậu nhìn ngươi, rồi cất ấn: “Để ai gia nghĩ thêm.”"}]}},
 E:{win:{tag:A=>S.thDead?"Ngươi giữ ấn của cô mẫu":"Ngươi ngồi bên Thái hậu",w:"th",t:A=>S.thDead?"Ấn riêng của Thái hậu ở trong tay ngươi. Từ nay hương khói Đức Thọ cung qua tay ngươi, và họ ngoại biết tiếng nói của bà nay là tiếng nói của ngươi.":"Ấn riêng của Thái hậu ở trong tay ngươi. Từ nay việc Đức Thọ cung qua tay ngươi, và hậu cung biết tiếng nói của bà là tiếng nói của ngươi.",go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}},
  mid:{tag:"Hai chiếc ghế",t:A=>S.thDead?"Hoàng thượng không trao ấn cho riêng ai. Hai người cháu cùng lo hương khói, mỗi người một việc.":"Thái hậu không trao ấn cho riêng ai. Hai người cháu cùng hầu, mỗi người một việc.",go:(_A,G)=>CHR_TH(G[0])},
  lose:{tag:A=>S.thDead?"{v} giữ ấn của cô mẫu":"{v} ngồi bên Thái hậu",t:A=>S.thDead?"Ấn riêng của Thái hậu ở trong tay {v}. Việc của Đức Thọ cung, giờ phải qua {v}.":"Ấn riêng của Thái hậu ở trong tay {v}. Muốn gặp cô mẫu, giờ phải qua {v}.",go:(A,G)=>{const v=rv67(A,"v");if(v)spAdd(v,"sung",G[0]);return CHR_TH(G[1])}}}});

rdDef("ch_ho",11,{t:"Họ ngoại",w:"th",sj:"người đứng đầu họ ngoại trong cung",cast:CHHO_CAST,
 g:A=>S.thDead?"Thái hậu đã khuất. Họ ngoại trong cung cần một chỗ dựa, không chia hai. Đây là kết cục truyện xuất thân của ngươi.":"Thái hậu đã già. Bà muốn trước khi nhắm mắt biết họ ngoại trong cung có một chỗ dựa, không chia hai. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","sD"],["c1","c2"],["t1","tD"],["x1","xD"]],
 B:{...CHHO_D("Họ ngoại trong cung không còn người che, mà chưa có người cầm.","Ngày tế tổ họ ngoại","Họ ngoại vào Đức Thọ cung tế tổ, lần đầu không có Thái hậu. Người đứng thắp hương đầu tiên trước bài vị bà sẽ là người đứng đầu họ trong cung."),
 s1:{h:"Ấn trong tay, người dưới chân",w:"th",if:RDW(1),t:"Từ khi ngươi giữ việc Đức Thọ cung, người họ ngoại xin gặp ngươi chứ không xin gặp {v}. Nàng ngồi trong cung mình, không ai đến.",o:[
  {n:"Mời {v} cùng lo việc",wx:"{v} còn chỗ đứng",lx:"chia bớt quyền",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} đến, lần đầu không mang vẻ đề phòng."},
  {n:"Giữ trọn việc trong tay",f:"self",wx:"không ai chen",lx:"{v} cô độc, mà người cô độc hay liều",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Ngươi không nhắc đến {v}."},
  {n:"Lặng lẽ gửi bạc nuôi nhà {v}",wx:"nhà nàng nhớ ơn",lx:"tốn bạc, nàng có thể thấy là bố thí",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Mẹ {v} gửi thư cảm tạ, {v} không nói gì."}]},
 s2:{h:"Đi qua cửa {v}",w:"v",need:["th"],if:RDW(0),t:"Muốn gặp Thái hậu, ngươi phải báo qua {v}, hoặc ít ra là đứng chờ nàng ra trước. Nhà ngoại đã quen gọi nàng là người của bà.",o:[
  {n:"Chịu qua cửa nàng",wx:"Thái hậu thấy ngươi biết nhẫn",lx:"cả cung thấy ngươi đứng dưới",f:"kind",rt:"{v} cho ngươi vào, mặt không đổi."},
  {n:"Xin Hoàng thượng cho thỉnh an riêng",wx:"gặp bà không qua ai",lx:"{v} biết ngươi vượt mặt",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Hoàng thượng cho ngươi vào Đức Thọ cung bất cứ lúc nào.",rf:"Hoàng thượng bảo: “Việc của mẫu hậu, trẫm không xen.”"},
  {n:"Gửi thư thẳng cho cô mẫu",wx:"bà đọc thư ngươi",lx:"thư có thể qua tay {v} trước",f:"self",rt:"Thái hậu hồi thư bằng tay bà.",rf:"Thư không có hồi âm."}]},
 c1:{h:"Phụ thân già yếu",w:"maid",t:"Thư nhà: phụ thân ngươi, Quốc cữu, xin cáo lão. Ai thay ông đứng đầu phủ sẽ quyết họ ngoại nghiêng về cháu nào.",o:[
  {n:"Xin phụ thân giao phủ cho người hợp ý ngươi",wx:"phủ Quốc cữu đứng sau ngươi",lx:"anh em trong họ cho là ngươi tham",f:"self",rt:"Phụ thân hồi: “Cha đã nghĩ như con.”",rf:"Phụ thân hồi: “Việc phủ không để phi tần quyết.”"},
  {n:"Xin phụ thân để họ tự bầu",wx:"họ ngoại không chia rẽ",lx:"người được bầu chưa chắc theo ngươi",f:"kind",rt:"Các trưởng bối bầu một người hiền lành."},
  {n:"Gửi sâm thuốc, không nói việc phủ",wx:"tròn đạo hiếu",lx:"tốn bạc, việc phủ để người khác quyết",rt:"Phụ thân đọc thư, sai người cất kỹ."}]},
 c2:{h:"Mẹ {v} vào cung",w:"v",need:["v","th"],t:"Mẹ {v} xin vào cung thăm con gái, rồi ở lại Đức Thọ cung cả buổi kể chuyện quê với Thái hậu. Người họ ngoại bảo nhau: mẹ ai được bà giữ lại lâu, con người ấy được lòng bà.",o:[
  {n:"Mang lễ đến chào mẹ nàng",wx:"Thái hậu vui",lx:"tốn bạc, nhà {v} thêm thế",f:"kind",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"Mẹ {v} nắm tay ngươi: “Hai đứa cùng một gốc.”"},
  {n:"Xin phụ thân cho mẫu thân vào cung cùng dịp",wx:"hai bà mẹ cùng ngồi với Thái hậu",lx:"bị nói là đua nhau đến cả mẹ",rt:"Thái hậu giữ cả hai bà lại dùng bữa.",rf:"Nội vụ phủ không cấp thẻ vào cung."},
  {n:"Không đến, giữ khoảng cách",wx:"không dính vào chuyện nhà người",lx:"Thái hậu thấy ngươi lạnh",rt:"Ngươi chỉ gửi một hộp trà."}]},
 t1:{h:"Lời của cô mẫu",w:"th",need:["th"],t:"Thái hậu gọi ngươi ngồi gần: “Ai gia sợ nhất là sau khi ai gia đi, hai đứa cắn nhau, người ngoài ăn họ mình.”",o:[
  {n:"Hứa với cô mẫu sẽ giữ {v}",f:"kind",wx:"bà yên lòng",lx:"lời hứa ràng chân",rt:"Thái hậu nắm tay ngươi rất lâu."},
  {n:"Thưa: họ cần một người đứng đầu",wx:"bà thấy ngươi dám gánh",lx:"bà nghe như ngươi muốn đè {v}",f:"self",rt:"Thái hậu gật: “Phải có người cầm.”",rf:"Thái hậu buông tay ngươi."},
  {n:"Lặng im",wx:"không hứa điều không giữ được",lx:"bà không biết lòng ngươi",rt:"Thái hậu nhìn ra cửa sổ."}]},
 x1:{h:"Ngày tế tổ họ ngoại",w:"th",need:["th"],t:"Thái hậu cho mời người họ ngoại vào Đức Thọ cung dự lễ tế tổ. Người đứng thắp hương đầu tiên sau bà sẽ là người đứng đầu họ trong cung.",o:[
  {n:"Bước lên thắp hương đầu",e:["win","lose"],rt:"Thái hậu đưa nén hương cho ngươi. Cả họ cúi đầu.",rf:"Thái hậu đưa nén hương cho {v}."},
  {n:"Mời {v} cùng thắp",e:["win","mid"],rt:"Hai nén hương cắm cùng một lúc. Thái hậu bật khóc.",rf:"{v} lùi lại, không nhận. Hương ai nấy thắp."},
  {n:"Đứng sau Thái hậu, không tranh",e:"mid",lx:"không ai đứng đầu",rt:"Ngươi đứng sau bà, đỡ tay bà cắm hương."}]}},
 E:{win:{tag:"Người đứng đầu họ ngoại",w:"th",t:A=>S.thDead?"Họ ngoại Thái hậu trong cung có một người đứng đầu: ngươi. Hương khói của cô mẫu, nhà ngoại, người cũ Đức Thọ cung đều theo ngươi, và cả hậu cung biết đụng đến ngươi là đụng cả họ.":"Họ ngoại Thái hậu trong cung có một người đứng đầu: ngươi. Thái hậu yên lòng, nhà ngoại theo ngươi, và cả hậu cung biết đụng đến ngươi là đụng Đức Thọ cung.",go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}},
  mid:{tag:"Hai người cháu chia ghế",t:"Hai người cháu cùng giữ họ ngoại, mỗi người một nửa. Không ai mạnh hẳn, nhưng họ không chia hai.",go:(_A,G)=>CHR_TH(G[0])},
  lose:{tag:"{v} đứng đầu họ ngoại",t:A=>S.thDead?"Họ ngoại theo {v}. Ngươi vẫn là cháu Thái hậu, nhưng hương khói của bà và nhà ngoại không còn đứng sau ngươi.":"Họ ngoại theo {v}. Ngươi vẫn là cháu Thái hậu, vẫn được bà thương, nhưng nhà ngoại không còn đứng sau ngươi.",go:(A,G)=>{const v=rv67(A,"v");if(v)spAdd(v,"sung",G[0]);return CHR_TH(G[1])}}}});
RD97L.push(rdRare({a:"ch_ho_11",tag:"Hai người cháu cùng cầm họ ngoại",w:"th",need:"th",n:"Nắm tay {v} quỳ trước Thái hậu, xin lập một phe chung",
 path:["Mời {v} vào cùng hầu","Rủ {v} cùng dâng một món","Kể lại với {v}","Xin bà đừng hỏi nữa, hai cháu tự hòa","Đề nghị họ ủng hộ cả hai cháu","Cùng {v} quỳ xin xét công bằng","Giúp {v} lo lễ Phật đản","Hứa với cô mẫu sẽ giữ {v}","Mời {v} cùng thắp"],bad:["Nhờ người nhà báo tin cho Ngự sử về đất phong","Đưa tên một quản sự đất phong nhà {v}","Tâu riêng cho nhà mình"],x:[A=>{const v=rv67(A,"v");return !S.thDead&&!!v&&aff(v,S)>=netTh(v,"than")},"Thái hậu còn sống, {v} thân với ngươi"],
 t:"Ngươi và {v} cùng quỳ trước Thái hậu, dâng một tờ giao ước: họ ngoại trong cung là một phe, việc lớn hai người cùng bàn, ai gặp nạn người kia gánh. Thái hậu đọc xong, đóng ấn riêng của bà vào giữa tờ giấy: “Ai gia đi rồi cũng yên.” Từ đó hậu cung không còn hai người cháu, chỉ còn một nhà.",
 go:(A,G)=>e67ally(rv67(A,"v"),G[0]),rw:"nt_haiduong",ti:"Người giữ giao ước họ ngoại"}));
/* ---------- ch_bi · Bí mật năm xưa ---------- */
/* BAL.road.ch_bi = {shield:3}  (shield = months of S.shield «che chở» the finale win gives: the Thái hậu in her debt) */
rdDef("ch_bi",5,{t:"Người trình thư",w:"th",sj:"kẻ đã đưa bản sao thư vào cung",cast(A){return rdCast(A,["v"])},
 g:"Bản sao lá thư cũ đã đến tay Hoàng thượng một lần. Kẻ dâng thư chỉ là một bàn tay; người đưa thư vào cung vẫn chưa ai biết. Lần ra hắn, trước khi một bản sao nữa xuất hiện.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kẻ dâng thư bị phạt, mà thư vẫn còn",w:"eun",if:()=>rdPrev()==="win"||rdPrev()==="r97",t:()=>(CHR_LAM()?"Lâm thị năm xưa còn sống, và bí mật hóa ra là một ân tình; tên thái giám dâng thư bị đánh rồi đuổi đi.":"Thái hậu đã được minh oan, tên thái giám dâng thư bị đánh rồi đuổi đi.")+" Trước khi ra cửa cung, hắn nói với {eun}: “Thư không phải của nô tài. Nô tài chỉ được trả bạc.”",o:[
  {n:"Cho người theo tên thái giám ra ngoài",wx:"biết hắn nhận bạc của ai",lx:"hắn biết bị theo, kêu oan khắp phố",f:"trace",rt:"Hắn ghé một hiệu sách gần Hàn lâm viện, nhận một túi bạc.",rf:"Hắn lẫn vào chợ, mất dấu."},
  {n:"Hỏi {eun} hắn còn nói gì",wx:"không tốn bạc",lx:"Tổng quản chỉ nói nửa lời",rt:"{eun} thì thầm: “Hắn nhận thư từ một cung nữ, áo màu của cung {v}.”"},
  {n:"Báo Thái hậu: việc chưa xong",need:["th"],wx:"bà biết ngươi còn canh cho bà",lx:"bà vừa yên lòng, không muốn nghe",rt:"Thái hậu đặt chén trà xuống: “Tra tiếp. Đừng để ai gia phải hỏi lần hai.”",rf:"Thái hậu phẩy tay: “Xong rồi thì thôi.”"}]},
 s2:{h:"Cô mẫu cho người lục cung ngươi",w:"th",need:["th"],if:()=>rdPrev()==="win2",t:"Ngươi giữ bản gốc, Thái hậu phải nể ngươi. Nhưng sáng nay, ma ma của Đức Thọ cung đến cung ngươi “xem lại đồ cúng”, lật từng chiếc rương.",o:[
  {n:"Để ma ma lục, thư đã giấu nơi khác",wx:"bà biết ngươi khó bắt",lx:"ma ma thấy chỗ giấu, Thái hậu giận",f:"hold",rt:"Ma ma về tay không. Thái hậu cười nhạt.",rf:"Ma ma tìm thấy hộp gấm, nhưng thư bên trong là bản chép tay của ngươi."},
  {n:"Tự mang hộp thư sang Đức Thọ cung",wx:"bà: nghi −",lx:"con bài rời tay ngươi",f:"trust",rt:"Thái hậu mở hộp, nhìn lá thư, rồi trả lại: “Con giữ đi. Ai gia chỉ muốn biết con còn là cháu ai gia.”"},
  {n:"Đóng cửa cung, không cho lục",wx:"cả cung thấy ngươi không sợ",lx:"bà tin ngươi giấu điều tệ hơn",rt:"Ma ma đứng ngoài cửa một canh giờ rồi về."}]},
 s3:{h:"Bản sao vẫn đi lại",w:"emp",if:A=>RDW(0)()||S.thDead,t:A=>S.thDead?"Thái hậu đã băng hà, nhưng bản sao thư vẫn đi lại trong cung: tiếng của bà sau khi khuất vẫn có thể bị bôi. Trong cung có người thì thầm: bản sao không chỉ có một.":"Hoàng thượng chưa nói gì thêm, nhưng ngài thôi sang Đức Thọ cung thỉnh an mỗi sớm. Trong cung có người thì thầm: bản sao không chỉ có một.",o:[
  {n:"Khéo hỏi Hoàng thượng ai đã dâng",wx:"biết tên kẻ dâng",lx:"ngài thấy ngươi bênh nhà ngoại",rt:"Ngài nói: “Một tiểu thái giám. Trẫm không hỏi hắn ai sai.”",rf:"Ngài đổi chuyện."},
  {n:"Thay cô mẫu sang thỉnh an Hoàng thượng",need:["th"],wx:"Thái hậu biết ngươi giữ tình mẹ con cho bà với Hoàng thượng",lx:"mệt người, ngài thấy ngươi làm sứ cho mẫu hậu",rt:"Hoàng thượng nhận trà ngươi dâng, không nói gì về Đức Thọ cung."},
  {n:"Lặng lẽ dò ai còn bản sao",wx:"có dấu",lx:"lộ là ngươi đang lo",f:"trace",rt:"Có cung nữ ở cung {v} hay ra cửa Tây Hoa.",rf:"Không ai chịu nói."}]},
 c1:{h:"Xe sách của Hàn lâm viện",w:"eun",t:"{eun} kể: mỗi tháng có một xe sách từ Hàn lâm viện vào cung đổi kinh. Năm nay xe ấy hay dừng ở cửa Tây Hoa lâu hơn lệ.",o:[
  {n:"Xin Tổng quản cho người khám xe",wx:"bắt được tờ thư kẹp sách",lx:"Hàn lâm viện kêu bị làm nhục",f:"trace",rt:"Trong một quyển kinh có kẹp tờ giấy chép tay: một đoạn của lá thư cũ.",rf:"Xe sạch, Hàn lâm viện dâng sớ trách cung cấm."},
  {n:"Chỉ ghi lại ngày xe vào",wx:"không động rừng",lx:"chậm một bước",rt:"Ngươi ghi: ngày mười, ngày hai mươi lăm."},
  {n:"Nhờ Tổng quản đổi người giữ cửa",wx:"đường thư bị chặn",lx:"kẻ đưa thư sẽ tìm đường khác, và ngươi mất dấu",rt:"Người giữ cửa Tây Hoa được thay."}]},
 c2:{h:"{v} hay đến Thọ Khang cung",w:"v",need:["v"],t:"{v} dạo này hay đến Thọ Khang cung, nơi các phi tần tiên đế ở, mang quà cho các bà lão. Không ai thấy nàng hiếu thảo như thế bao giờ.",o:[
  {n:"Cũng đến Thọ Khang cung mang quà",wx:"các bà lão quý ngươi",lx:"tốn bạc, {v} biết ngươi để ý",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Một bà lão nói nhỏ: “Nó hỏi chuyện họ Lâm.”"},
  {n:"Gặp {v} hỏi thẳng",wx:"{v} biết ngươi không dễ lừa",lx:"{v} đề phòng hơn",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} cười: “Muội đi thăm người già. Tỷ sợ gì?”",rf:"{v} quay đi không đáp."},
  {n:"Cho người theo {v}",wx:"biết nàng gặp ai",lx:"bị bắt gặp",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0])},rt:"{v} gặp riêng một bà lão từng hầu một phi tần họ Lâm.",rf:"Người của ngươi bị thị vệ cung {v} bắt lại."}]},
 t1:{h:"Giấy của Hàn lâm viện",w:"maid",t:"Bản sao thư được chép trên loại giấy chỉ Hàn lâm viện dùng. Nét chữ mới, người chép biết chữ của người xưa.",o:[
  {n:"Nhờ nhà ngoại đối chiếu nét chữ với sổ Hàn lâm",wx:"có tên người chép",lx:"bị nói là xen việc ngoài triều",f:"proof",rt:"Nhà ngoại hồi thư: nét chữ giống một vị Biên tu họ Lâm, mới được bổ vào Hàn lâm viện năm ngoái.",rf:"Nhà ngoại hồi thư: sổ Hàn lâm không cho người ngoài xem."},
  {n:"Giữ tờ giấy làm chứng",wx:"có vật trong tay",lx:"chưa biết là ai",rt:"Ngươi cất tờ giấy vào hộp."},
  {n:"Đưa tờ giấy cho Thái hậu",need:["th"],wx:"bà biết ngươi không giấu",lx:"bà sẽ tự ra tay theo cách của bà",f:"trust",rt:"Thái hậu nhìn nét chữ, tay khẽ run."}]},
 x1:{h:"Xe sách ngày hai mươi lăm",w:"eun",t:"Xe sách lại vào. Lần này có người đưa thư đi kèm. Bắt người ấy, ngươi biết ai đứng sau bản sao; để sổng, kẻ đứng sau sẽ đổi đường.",o:[
  {n:"Cho người chặn ở cửa Tây Hoa",e:["win","lose"],rt:"Người đưa thư khai: bản sao do một vị Biên tu họ Lâm chép, gửi vào cho cung {v}.",rf:"Người đưa thư nuốt tờ giấy, rồi ngất. Cung {v} kêu bị vu."},
  {n:"Để thư đi, theo đến tay người nhận",e:["win","mid"],rt:"Thư đến tay cung nữ của {v}. Ngươi biết cả hai đầu dây.",rf:"Thư đến tay một người ngươi không biết mặt. Chỉ biết đầu dây ngoài kia mang họ Lâm."},
  {n:"Không bắt, chỉ báo Thái hậu",need:["th"],e:"mid",lx:"bà sẽ hỏi sao ngươi không bắt",rt:"Thái hậu nghe, lặng thinh rất lâu: “Họ Lâm à.”"}]}},
 E:{win:{tag:"Lần ra người họ Lâm",w:"v",t:"Đầu dây ngoài cung là một vị Biên tu họ Lâm; đầu dây trong cung là {v}. Ngươi biết, và {v} biết ngươi đã biết.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Biết bản sao từ ngoài cung vào",t:"Ngươi biết bản sao đến từ ngoài cung, từ một người mang họ Lâm. Chưa biết ai trong cung nhận."},
  lose:{tag:"Đường thư đổi hướng",t:()=>`Kẻ đưa thư đổi đường. {v} kêu bị vu trước ${CHR_H()}, và bản sao vẫn đi lại trong cung.`,go:(A,G)=>{rdOan(A,"v",G[0]);return ""}}}});

rdDef("ch_bi",6,{t:"Người nhà họ Lâm",w:"th",sj:"cháu của phi tần họ Lâm",cast(A){return rdCast(A,["v"])},
 g:A=>CHR_LAM()?"Phi tần họ Lâm của tiên đế bị coi là đã chết năm ấy; ngươi biết bà còn sống, mang thân lão cung nữ ở Thọ Khang cung. Cả nhà bà bị đày đi Lĩnh Nam, không ai biết bà còn. Đứa cháu năm tuổi khi đó, Lâm Khải, nay là Biên tu Hàn lâm viện. Hắn gửi vào một lời: trước tiết Thanh minh, nếu Đức Thọ cung không trả lại tên cho cô hắn, bản sao cuối sẽ đến Ngự sử đài.":"Phi tần họ Lâm của tiên đế chết năm ấy; cả nhà bị đày đi Lĩnh Nam. Đứa cháu năm tuổi khi đó, Lâm Khải, nay là Biên tu Hàn lâm viện. Hắn gửi vào một lời: trước tiết Thanh minh, nếu Đức Thọ cung không trả lại tên cho cô hắn, bản sao cuối sẽ đến Ngự sử đài.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngươi viết thư trước",w:"maid",if:RDW(1),t:"Ngươi biết tên hắn trước khi hắn biết ngươi. Một lá thư từ cung cháu gái Thái hậu sẽ làm hắn sợ, hoặc làm hắn tin.",o:[
  {n:"Viết thư mời nói chuyện",wx:"hắn chịu nghe",lx:"hắn cho là bẫy",f:"talk",rt:"Lâm Khải hồi thư: “Thanh minh còn ba tháng. Hạ thần chờ.”",rf:"Thư không có hồi âm."},
  {n:"Viết thư răn đe",wx:"hắn biết ngươi không yếu",lx:"hắn rút ngắn hạn",f:"hard",rt:"Lâm Khải im lặng một tháng.",rf:"Lâm Khải hồi thư: “Hạn đổi: rằm tháng hai.”"},
  {n:"Gửi bạc nuôi mẹ già hắn",wx:"hắn biết ngươi có lòng",lx:"tốn bạc, hắn có thể cho là mua chuộc",f:"talk",rt:"Mẹ Lâm Khải nhận bạc. Hắn thì không viết gì."}]},
 s2:{h:"Tờ giấy trong quyển kinh",w:"maid",if:RDW(0),t:"Trong quyển kinh ngươi đang chép có một tờ giấy lạ: “Thanh minh còn ba tháng. Người nhà họ Lâm chờ một lời của Đức Thọ cung.” Ký tên Lâm Khải.",o:[
  {n:"Hồi thư qua đường kinh",wx:"giữ được đường nói chuyện",lx:"thư hồi có thể lọt ra",f:"talk",rt:()=>`Lâm Khải viết lại: “Hạ thần không muốn hại ai. Hạ thần chỉ muốn cô của hạ thần ${CHR_LAM()?"được trả lại tên":"được nằm trong lăng phi tần"}.”`,rf:"Thư hồi bị một cung nữ lạ nhặt được."},
  {n:"Đốt tờ giấy",wx:"không để lại dấu",lx:"hắn cho là ngươi khinh",rt:"Tờ giấy cháy. Hạn Thanh minh thì không cháy."},
  {n:"Đưa tờ giấy cho cô mẫu",need:["th"],wx:"bà biết ngươi trung",lx:"bà sẽ muốn hắn câm, theo cách của bà",f:"trust",rt:"Thái hậu đọc, gấp tờ giấy làm tư."}]},
 c1:{h:"Lão cung nữ kể",w:"maid",t:()=>CHR_LAM()?"Đàm ma ma, tức Lâm thị năm xưa, kể: bà có tội thật, nhưng cha mẹ, anh em bà không ai biết gì. Cả nhà bị đày vì một câu của Thái hậu.":"Đàm ma ma, lão cung nữ từng biết chuyện năm xưa, kể thêm: Lâm thị có tội thật, nhưng cha mẹ, anh em nàng không ai biết gì. Cả nhà bị đày vì một câu của Thái hậu.",o:[
  {n:"Ghi lời ma ma làm chứng",f:"wit",wx:"có lời của người trong cuộc",lx:"lời ghi là thêm một thứ có thể bị lấy",rt:"Đàm ma ma điểm chỉ vào tờ lời khai."},
  {n:"Xin ma ma giữ kín",wx:"bớt một miệng",lx:"tốn bạc, ma ma buồn vì không ai nghe bà",rt:"Đàm ma ma gật đầu, nhận bạc mà không nhìn ngươi."},
  {n:"Hỏi ma ma Lâm Khải là người thế nào",wx:"hiểu người mình phải đối",lx:"ma ma không biết",f:"talk",rt:"Ma ma nói: “Thằng bé ấy năm tuổi đã biết cõng em. Nó không ác.”",rf:"Ma ma chỉ lắc đầu."}]},
 c2:{h:"{v} gửi bạc cho họ Lâm",w:"v",need:["v"],t:"Nghe nói {v} sai người mang bạc ra nhà họ Lâm, hứa sẽ giúp họ đưa thư lên Ngự sử đài trước hạn.",o:[
  {n:"Cho Lâm Khải biết {v} muốn dùng hắn",wx:"hắn thôi tin {v}",lx:"hắn thôi tin cả ngươi",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Lâm Khải trả lại bạc cho cung {v}.",rf:"Lâm Khải bảo: “Cung nào cũng muốn dùng hạ thần.”"},
  {n:"Báo Hoàng hậu {v} thông đồng người ngoài",need:["hh"],wx:"{v} bị cấm túc",lx:"Hoàng hậu biết có chuyện họ Lâm",go:(A,ok,G)=>{if(!ok)return"";rdOan(A,"v",G[0]);const v=rv67(A,"v");if(v)v.confined=Math.max(v.confined||0,BAL.road.ch_bi.conf);return""},rt:()=>`Hoàng hậu cấm túc {v} ${kitNumVi(BAL.road.ch_bi.conf)} tháng vì tự ý đưa bạc ra cung.`,rf:"Hoàng hậu chỉ cười: “Chuyện nhà Đức Thọ cung, bổn cung không xen.”"},
  {n:"Để mặc",wx:"không gây thêm",lx:"{v} và họ Lâm gần nhau thêm",rt:"Ngươi không làm gì."}]},
 t1:{h:"Hạn Thanh minh",w:"maid",t:"Thanh minh còn hơn hai tháng. Lâm Khải không đòi bạc: hắn đòi một lời. Ngươi phải chọn đi đường nào trước.",o:[
  {n:"Tìm cách để cô mẫu chịu nghe",need:["th"],f:"trust",wx:"đi đường gần nhất",lx:"cô mẫu là người khó nghe nhất",rt:"Ngươi chọn ngày rằm để vào Đức Thọ cung."},
  {n:"Tìm bản sao cuối trước hạn",wx:"biết bản sao ở đâu",lx:"không thấy",f:"hold",rt:"Bản sao cuối không ở nhà Lâm Khải, mà gửi ở một ngôi chùa.",rf:"Không ai biết bản sao ở đâu."},
  {n:"Xin Lâm Khải lùi hạn",wx:"có thêm thời gian",lx:"hắn cho là ngươi kéo dài",f:"talk",rt:"Lâm Khải viết: “Thêm một tháng. Không hơn.”",rf:"Lâm Khải viết: “Cô của hạ thần đã chờ hai mươi năm.”"}]},
 x1:{h:"Gặp ở chùa Hộ Quốc",w:"me",t:()=>`Ngươi xin lên chùa Hộ Quốc ${S.thDead?"cầu siêu":"cầu an"} cho Thái hậu. ${CHR_LAM()?"Ngày họ Lâm vẫn làm giỗ cho bà":"Ngày giỗ phi tần họ Lâm"}, Lâm Khải cũng đến thắp hương. Cách nhau một tấm bình phong.`,o:[
  {n:()=>CHR_LAM()?"Hứa sẽ xin cho cô hắn được phục danh":"Hứa sẽ xin cho cô hắn một chỗ trong lăng",e:["win","lose"],rt:"Lâm Khải im lâu, rồi nói: “Hạ thần tin nương nương một lần.”",rf:"Lâm Khải nói: “Lời hứa của người trong cung, nhà hạ thần nghe đủ rồi.”"},
  {n:"Đặt lời khai của Đàm ma ma trước hắn",e:["win","mid"],rt:"Đọc xong, Lâm Khải khóc: hắn chưa từng biết cô mình đã làm gì trước.",rf:"Lâm Khải đọc xong, nói: “Có tội thì một người chịu. Sao cả nhà hạ thần phải chịu?”"},
  {n:"Chỉ thắp hương, không nói",e:"mid",lx:"hạn vẫn chạy",rt:"Ngươi thắp một nén hương cho phi tần họ Lâm rồi về."}]}},
 E:{win:{tag:"Lâm Khải chịu chờ",w:"th",t:"Lâm Khải hứa không dâng thư trước khi ngươi có lời. Hạn Thanh minh vẫn đó, nhưng bên kia bình phong là một người chịu nói chuyện."},
  mid:{tag:"Hạn vẫn còn đó",t:"Lâm Khải không đổi ý, cũng không vội. Ngày Thanh minh đến gần từng ngày."},
  lose:{tag:"Lâm Khải không tin ngươi",t:"Lâm Khải về, và tối ấy người của {v} lại đến nhà hắn.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}}}});

rdDef("ch_bi",7,{t:"Cô mẫu hỏi",w:"th",sj:"điều Thái hậu muốn biết",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Thái hậu đã khuất trước khi kể hết chuyện năm xưa. Bà để lại một hộp thư cho ma ma giữ; Đàm ma ma thì giữ một câu chuyện khác. Hai câu chuyện về một đêm năm xưa không giống nhau.":"Thái hậu biết ngươi đã gặp người họ Lâm. Bà muốn nghe ngươi kể, và bà muốn ngươi nghe bà kể. Hai câu chuyện về một đêm năm xưa không giống nhau.",
 p:[["s1","s2","s3"],["c1","c2","c3"],["t1","t2"],["x1","x2"]],
 B:{s3:{h:"Hộp thư của cô mẫu",w:"me",if:()=>S.thDead,t:"Ma ma Đức Thọ cung trao ngươi một hộp thư Thái hậu dặn lại: “Khi nào cháu ai gia gặp người họ Lâm, thì đưa.”",o:[
  {n:"Đọc hết thư, ghi nhớ",f:"hold",wx:"biết lời bà để lại",lx:"biết nhiều thì gánh nhiều",rt:"Ngươi đọc đến gà gáy."},
  {n:"Mời Đàm ma ma cùng đọc",f:"mercy",wx:"hai câu chuyện ghép lại một",lx:"ma ma khóc, không đọc nổi",rt:"Đàm ma ma đọc xong, ngồi lặng rất lâu.",rf:"Đàm ma ma đẩy hộp thư ra."},
  {n:"Cất hộp, không mở",f:"loyal",wx:"giữ kín cho người đã khuất",lx:"không biết bà muốn gì",rt:"Ngươi khóa hộp thư vào rương."}]},
 c3:{h:"Lời Đàm ma ma",w:"maid",if:()=>S.thDead,t:"Đàm ma ma kể đêm năm ấy theo lời bà: Lâm thị bỏ thuốc thật, nhưng là vì sợ, và cả nhà nàng không ai biết.",o:[
  {n:"Ghi lại lời ma ma",f:"hold",wx:"có lời của người trong cuộc",lx:"thêm một thứ có thể bị lấy",rt:"Ma ma điểm chỉ vào tờ lời khai."},
  {n:"Hỏi ma ma cô mẫu đã hối chưa",f:"mercy",wx:"biết lòng bà lúc cuối",lx:"ma ma không biết",rt:"Ma ma nói: “Năm nào đến ngày ấy, bà cũng chép kinh.”",rf:"Ma ma lắc đầu."},
  {n:"Nhắc ma ma giữ kín",f:"loyal",wx:"bớt một miệng",lx:"tốn bạc, ma ma buồn",rt:"Ma ma nhận bạc, không nhìn ngươi."}]},
 t2:{h:"Dòng chữ cuối của cô mẫu",w:"me",if:()=>S.thDead,t:"Trong hộp thư có một dòng Thái hậu viết: “Mọi bản sao phải về tay cháu ai gia.”",o:[
  {n:"Nhận lệnh cũ",f:"loyal",wx:"đi trọn ý bà",lx:"việc nặng thêm",rt:"Ngươi gấp tờ giấy, cất vào ngực áo."},
  {n:"Tự định theo lòng mình",f:"mercy",wx:"Lòng +",lx:"người cũ của bà trách ngươi",rt:"Ngươi đặt tờ giấy lên bài vị."}]},
 x2:{h:"Giữ tiếng cho người đã khuất",w:"emp",if:()=>S.thDead,t:"Trước Thanh minh, bản sao vẫn ở ngoài kia. Thái hậu không còn để ra lệnh; tiếng của bà sau khi khuất ở trong tay ngươi.",o:[
  {n:"Xin Hoàng thượng cho họ Lâm một lời đền bù kín",e:["win","lose"],rt:"Hoàng thượng gật: chuyện của mẫu hậu, trẫm lặng lẽ khép.",rf:"Hoàng thượng hỏi: “Nàng muốn trẫm nhận mẫu hậu sai?”"},
  {n:"Tự đi thu bản sao",e:["win","mid"],rt:"Bản sao lần lượt về tay ngươi.",rf:"Ngươi thu được một nửa; nửa kia còn ngoài cung."},
  {n:"Để mặc, chờ xem",e:"mid",lx:"bản sao vẫn ở ngoài kia",rt:"Ngươi không làm gì."}]},
 s1:{h:"Bà gọi ngươi lúc canh ba",w:"th",need:["th"],if:RDW(1),t:"Canh ba, ma ma Đức Thọ cung gõ cửa cung ngươi: “Thái hậu chưa ngủ. Bà đợi.”",o:[
  {n:"Đi ngay, kể hết",wx:"bà thấy ngươi không giấu",lx:"bà giận vì ngươi gặp hắn mà không xin phép",f:"trust",rt:"Thái hậu nghe hết, rồi nói: “Đến lượt ai gia kể.”",rf:"Thái hậu đập tay lên án: “Ai cho con gặp hắn?”"},
  {n:"Đi, nhưng chỉ kể một nửa",wx:"giữ được đường với Lâm Khải",lx:"bà biết ngươi giấu",f:"hold",rt:"Thái hậu gật đầu, không hỏi thêm.",rf:"Thái hậu nói: “Con nói thiếu.”"},
  {n:"Xin sáng mai mới đến",wx:"có thời gian nghĩ lời",lx:"bà đợi suốt đêm",rt:"Đèn Đức Thọ cung sáng đến sáng."}]},
 s2:{h:"Bà nghe tin từ người khác",w:"th",need:["th"],if:RDW(0),t:"Thái hậu đã nghe chuyện ngươi lên chùa Hộ Quốc, nhưng không phải từ ngươi. Bà cho gọi ngươi vào lúc đang dùng bữa, không cho ngồi.",o:[
  {n:"Quỳ thưa thật",wx:"bà nguôi",lx:"bà vẫn giận",f:"trust",rt:"Thái hậu đặt đũa xuống: “Đứng dậy. Ngồi đi.”",rf:"Thái hậu ăn tiếp, để ngươi quỳ."},
  {n:"Hỏi ai đã kể với cô mẫu",wx:"biết kẻ mách",lx:"bà cho là ngươi lảng",rt:"Thái hậu buột miệng: “{v} lo cho ai gia hơn con.”",rf:"Thái hậu chỉ nhìn ngươi."},
  {n:"Thưa: con đi cầu an cho cô mẫu",wx:"lời không sai",lx:"bà biết đó chỉ là nửa sự thật",f:"hold",rt:"Thái hậu cười nhạt."}]},
 c1:{h:"Đêm năm ấy",w:"th",need:["th"],t:()=>`Thái hậu kể: năm ấy bà mang thai Hoàng thượng. Lâm thị bỏ thuốc vào chén canh của bà. Tiên đế ban chết cho Lâm thị.${CHR_LAM()?" Ai gia lén thả nàng đi, giấu làm cung nữ.":""} Còn cả nhà họ Lâm, là bà xin đày.`,o:[
  {n:"Hỏi vì sao cả nhà phải chịu",wx:"bà thừa nhận đã quá tay",lx:"bà cho là ngươi trách bà",f:"mercy",rt:"Thái hậu im rất lâu: “Lúc ấy ai gia sợ. Người sợ thì ác.”",rf:"Thái hậu nói: “Không đày thì họ trả thù con ai gia.”"},
  {n:"Nắm tay bà, không hỏi",wx:"bà biết ngươi đứng về phía bà",lx:"câu hỏi còn trong lòng ngươi",f:"loyal",rt:"Thái hậu nắm lại tay ngươi, tay bà lạnh."},
  {n:"Ghi lại lời bà trong lòng",wx:"biết trọn chuyện",lx:"biết nhiều thì gánh nhiều",f:"hold",rt:"Ngươi nhớ từng chữ."}]},
 c2:{h:"{v} dâng canh",w:"v",need:["v","th"],t:"{v} ngày nào cũng mang canh sang Đức Thọ cung, ngồi kể với Thái hậu chuyện ngươi hay đi lại với người ngoài.",o:[
  {n:"Cũng sang hầu canh mỗi tối",wx:"bà thấy ngươi bên bà",lx:"mệt người, {v} vẫn nói",rt:"Hai người cháu ngồi hai bên Thái hậu, không ai nhìn ai."},
  {n:"Cho bà biết {v} gửi bạc cho họ Lâm",wx:"bà biết ai mới là kẻ dùng chuyện cũ",lx:"không có chứng, bà thấy hai đứa đấu nhau",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Thái hậu sai đổ bát canh của {v}.",rf:"Thái hậu nói: “Cháu nào cũng nói cháu kia.”"},
  {n:"Gặp {v}: chuyện cũ đừng đụng",wx:"{v} lùi lại",lx:"{v} cười, đi tiếp",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} không mang canh sang nữa.",rf:"{v} nói: “Tỷ giữ bà, muội giữ mình.”"}]},
 t1:{h:"Ai gia muốn hắn câm",w:"th",need:["th"],t:()=>CHR_LAM()?"Thái hậu nói: “Cháu của Lâm thị muốn gì? Trả tên cho nàng? Ai gia không trả. Trả là nhận mình sai.”":"Thái hậu nói: “Cháu của Lâm thị muốn gì? Một chỗ trong lăng? Ai gia không cho. Cho là nhận mình sai.”",o:[
  {n:"Thưa: nhận một nửa thì được một nửa",wx:"bà nghĩ lại",lx:"bà giận ngươi dạy bà",f:"mercy",rt:"Thái hậu lặng thinh, rồi bảo: “Để ai gia nghĩ.”",rf:"Thái hậu quay mặt đi."},
  {n:"Thưa: việc ấy con lo",wx:"bà giao việc cho ngươi",lx:"lo thế nào là gánh của ngươi",f:"loyal",rt:"Thái hậu gật: “Con lo. Ai gia không muốn nghe tên họ Lâm nữa.”"},
  {n:"Im lặng",wx:"không hứa điều không giữ được",lx:"bà không biết ngươi đứng đâu",rt:"Thái hậu thở dài."}]},
 x1:{h:"Lệnh của cô mẫu",w:"th",need:["th"],t:"Thái hậu ra lệnh: trước Thanh minh, mọi bản sao phải về tay bà. Ai giữ, người ấy là kẻ thù của Đức Thọ cung, kể cả cháu bà.",o:[
  {n:"Xin bà cho họ Lâm một lời đền bù kín",e:["win","lose"],rt:()=>CHR_LAM()?"Thái hậu nhắm mắt: “Cho nàng về với họ Lâm. Không chiếu, không bia. Thế thôi.”":"Thái hậu nhắm mắt: “Một chỗ trong lăng, không bia, không chiếu. Thế thôi.”",rf:"Thái hậu nổi giận: “Con đứng về phía họ Lâm?”"},
  {n:"Vâng lệnh, tự đi thu bản sao",e:["win","mid"],rt:"Thái hậu yên lòng, giao hết việc cho ngươi.",rf:"Thái hậu giao việc, nhưng sai cả ma ma theo ngươi."},
  {n:"Thưa: con chưa biết bản sao ở đâu",e:"mid",lx:"bà tự đi tìm theo cách của bà",rt:"Thái hậu gật đầu, rồi cho gọi {eun}."}]}},
 E:{win:{tag:A=>S.thDead?"Giữ được tiếng cô mẫu":"Cô mẫu chịu nghe",w:"th",t:A=>S.thDead?"Hoàng thượng lặng lẽ khép chuyện của mẫu hậu, hoặc bản sao đã về tay ngươi. Tiếng của cô mẫu được giữ, và việc còn lại là của ngươi.":"Thái hậu chưa nhận sai, nhưng bà đã nói tên Lâm thị mà không run giọng. Bà giao việc cho ngươi, và tin ngươi làm cho êm.",go:(_A,G)=>CHR_TH(G[0])},
  mid:{tag:A=>S.thDead?"Việc còn dở":"Cô mẫu giao việc",t:A=>S.thDead?"Một nửa bản sao về tay ngươi, nửa kia còn ngoài cung. Không còn ai ra lệnh, chỉ còn ngươi làm.":"Thái hậu giao việc thu bản sao cho ngươi. Bà không hỏi ngươi sẽ làm thế nào, và ngươi biết bà cũng có người của bà đang làm.",go:(_A,G)=>CHR_TH(G[0])},
  lose:{tag:A=>S.thDead?"Họ ngoại nghi ngươi":"Cô mẫu nghi ngươi",t:A=>S.thDead?"Hoàng thượng không muốn nghe thêm, và họ ngoại cho là ngươi nghiêng về họ Lâm. Người cũ Đức Thọ cung thôi kể chuyện xưa với ngươi.":"Thái hậu cho là ngươi nghiêng về họ Lâm. Bà vẫn gọi ngươi là cháu, nhưng thôi kể chuyện cũ với ngươi.",go:(_A,G)=>CHR_TH(G[0])}}});

rdDef("ch_bi",8,{t:"Thư bị đánh cắp",w:"maid",sj:"hộp gấm bị lấy khỏi cung ngươi",cast(A){return rdCast(A,["v"])},
 g:"Chiếc hộp gấm đựng bản sao thư và lời khai của Đàm ma ma biến mất khỏi cung ngươi. Ai lấy được nó, người ấy cầm Đức Thọ cung trong tay. Tìm lại trước khi nó ra khỏi hậu cung.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngăn tủ trống",w:"maid",if:A=>RDW(1)()||S.thDead,t:A=>(S.thDead?"Một đêm, ":"Đêm Thái hậu giao việc cho ngươi, ")+"{maid} phát hiện ngăn tủ sau bàn thờ trống. Khóa không hỏng: kẻ lấy có chìa.",o:[
  {n:"Khám người hầu trong cung",wx:"tìm ra kẻ có chìa",lx:"người vô tội cũng bị khám",f:"search",rt:"Một tiểu cung nữ có chìa phụ giấu trong giày.",rf:"Không ai có chìa."},
  {n:"Giữ kín, không cho ai biết đã mất",wx:"kẻ lấy tưởng ngươi chưa biết",lx:"mất thời gian",f:"quiet",rt:"Ngươi khóa ngăn tủ lại như cũ."},
  {n:"Báo Thái hậu ngay",need:["th"],wx:"bà biết ngươi không giấu",lx:"bà giận ngươi giữ không nổi",rt:"Thái hậu nói: “Tìm. Ba ngày.”",rf:"Thái hậu ném chuỗi tràng hạt xuống đất."}]},
 s2:{h:"Ma ma Đức Thọ cung đến trước",w:"th",need:["th"],if:RDW(0),t:"Ma ma của Thái hậu đến đòi hộp gấm theo lệnh bà. Ngươi mở tủ: hộp đã không còn.",o:[
  {n:"Thưa thật: hộp đã mất",wx:"không thêm tội giấu",lx:"Thái hậu nghi ngươi đưa cho họ Lâm",rt:"Ma ma về. Một canh giờ sau Đức Thọ cung đóng cửa."},
  {n:"Nói hộp đã gửi nơi khác",wx:"có thêm vài ngày",lx:"lời dối lộ ra, Thái hậu giận",f:"quiet",rt:"Ma ma tin, hẹn ba ngày.",rf:"Ma ma nhìn tủ trống, không nói gì."},
  {n:"Xin ma ma cùng tìm",wx:"ma ma thành người làm chứng cho ngươi",lx:"ma ma không chịu",f:"search",rt:"Ma ma nhận bạc, cùng ngươi tra người ra vào.",rf:"Ma ma trả bạc, về báo bà."}]},
 c1:{h:"Sổ ra vào của {eun}",w:"eun",t:"Mọi người ra vào cổng hậu cung đều qua sổ của {eun}. Hôm qua có ba người mang hộp ra.",o:[
  {n:"Xin xem sổ",wx:"biết hộp chưa ra khỏi cung",lx:"Tổng quản kể với người khác",f:"search",rt:"Không hộp nào giống hộp gấm. Nó vẫn còn trong hậu cung.",rf:"Tổng quản nói sổ hôm qua đã nộp lên Nội vụ phủ."},
  {n:"Nhờ Tổng quản cấm hộp ra cổng ba ngày",wx:"hộp không ra được",lx:"cả cung biết có thứ đang bị tìm",rt:"Cổng hậu cung khám từng hộp.",rf:"Tổng quản bảo: “Không có lệnh Thái hậu, nô tài không dám.”"},
  {n:"Không động đến Tổng quản",wx:"không thêm người biết",lx:"hộp có thể đã đi",rt:"Ngươi tự tìm."}]},
 c2:{h:"Cung nữ của {v}",w:"v",need:["v"],t:"Tiểu cung nữ có chìa phụ là em họ của một cung nữ ở cung {v}.",o:[
  {n:"Bắt tiểu cung nữ khai",wx:"có lời khai chỉ thẳng {v}",lx:"ép người là để lại tiếng",f:"proof",go:(A,ok,G)=>{if(ok)rdOan(A,"v",G[0])},rt:"Tiểu cung nữ khai: hộp đã đưa sang cung {v} đêm qua.",rf:"Tiểu cung nữ cắn môi không nói."},
  {n:"Tha nàng, bắt nàng làm hai mang",wx:"có người trong cung {v}",lx:"nàng lại phản",rt:"Nàng thề sẽ báo hộp nằm ở đâu.",rf:"Nàng chạy sang cung {v} kể hết."},
  {n:"Giao nàng cho Thận hình ty",wx:"cả cung biết phép",lx:"{v} biết ngươi đã biết",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Tiểu cung nữ bị đưa đi."}]},
 t1:{h:"Hộp sẽ đi đâu",w:"v",t:()=>`Người trong cung {v} nói: nàng định đưa hộp sang ${CHR_Q()} vào ngày mồng một, khi các phi tần thỉnh an ${CHR_H()}.`,o:[
  {n:"Chặn trước ngày mồng một",f:"search",wx:"còn đúng một đêm",lx:"phải liều",rt:"Ngươi chọn đêm cuối tháng."},
  {n:"Để hộp đến Càn Ninh cung, rồi xin Hoàng hậu trả",need:["hh"],wx:"Hoàng hậu chịu nghe ngươi một lần",lx:"Hoàng hậu biết hết",rt:"Ngươi chuẩn bị lời nói với Hoàng hậu.",rf:"Hoàng hậu không tiếp ngươi."},
  {n:"Báo Thái hậu, để bà tự đòi",need:["th"],wx:"không phải tự ra tay",lx:"bà đòi thì sẽ có người bị phạt nặng",f:"loyal",rt:"Thái hậu chỉ nói: “Biết rồi.”"}]},
 x1:{h:"Đêm cuối tháng",w:"v",t:()=>`Đêm cuối tháng. Hộp gấm nằm trong cung {v}. Sáng mai nó sẽ sang ${CHR_Q()}.`,o:[
  {n:"Đến cung {v} đòi lại",e:["win","lose"],rt:"{v} tái mặt, đưa hộp ra: “Tỷ thắng.”",rf:"{v} mở hộp trước mặt ngươi: trống. Hộp đã đi trước một đêm."},
  {n:"Cho người lẻn vào lấy",e:["win","mid"],rt:"Hộp gấm về tay ngươi trước canh năm.",rf:"Người của ngươi không lấy được, nhưng kịp đổ dầu đèn lên hộp. Hộp cháy."},
  {n:"Để Thái hậu tự đòi",need:["th"],e:"mid",lx:"cung {v} bị lục, mọi người biết có chuyện",rt:"Thái hậu sai ma ma đến cung {v}. Hộp bị đốt ngay trước mặt bà."}]}},
 E:{win:{tag:"Lấy lại hộp gấm",w:"maid",t:"Hộp gấm về tay ngươi, nguyên niêm. {v} biết mình thua, và biết ngươi giữ thứ có thể làm nàng mất tất cả.",go:(A,G)=>{rdOan(A,"v",G[0]);return ""}},
  mid:{tag:"Hộp gấm thành tro",t:"Hộp gấm cháy. Không ai cầm được nó nữa, kể cả ngươi. Lời khai của Đàm ma ma cũng mất theo."},
  lose:{tag:()=>`Hộp gấm sang ${CHR_Q()}`,t:"Hộp gấm đã ra khỏi cung {v} trước một đêm. Giờ nó ở nơi ngươi không với tới.",go:(_A,G)=>CHR_TH(G[0])}}});

rdDef("ch_bi",9,{t:"Bảo vệ hay dùng",w:"emp",sj:"lá thư cũ và người giữ nó",cast(A){return rdCast(A,["v"])},
 g:A=>(S.thDead?"Thanh minh còn một tháng. Hoàng thượng đã nghe lời đồn, Lâm Khải chờ ngươi. Bí mật trong tay ngươi có thể giữ tiếng cho cô mẫu đã khuất,":"Thanh minh còn một tháng. Hoàng thượng đã nghe lời đồn, Thái hậu chờ ngươi, Lâm Khải chờ ngươi. Bí mật trong tay ngươi có thể che cho cô mẫu,")+" có thể đổi lấy quyền, có thể trả lại cái tên cho một người đã bị xóa tên.",
 p:[["s1","s2","s3"],["c1","c2"],["t1","t2"],["x1"]],
 B:{s3:{h:"Bí mật của người đã khuất",w:"me",if:()=>S.thDead,t:"Thái hậu đã khuất, nhưng tên bà vẫn có thể bị bôi. Thanh minh còn một tháng.",o:[
  {n:"Giữ tiếng cho cô mẫu",f:"protect",wx:"người cũ của bà tin ngươi",lx:"mệt người",rt:"Ngươi cho người dập mọi lời đồn trong cung."},
  {n:"Viết thư cho Lâm Khải xin hắn chờ",f:"just",wx:"hắn chịu chờ",lx:"hắn không tin",rt:"Lâm Khải hồi: “Hạ thần chờ đến Thanh minh.”",rf:"Thư không có hồi âm."},
  {n:"Dò xem bản sao còn ở tay ai",f:"use",wx:"biết ai còn cầm",lx:"tốn bạc",rt:"Một trang chép còn ở cung {v}."}]},
 t2:{h:"Lời dặn cuối của cô mẫu",w:"me",if:()=>S.thDead,t:"Ma ma Đức Thọ cung nhắc: trước khi đi, Thái hậu dặn “đốt hết đi”.",o:[
  {n:"Vâng lời người đã khuất",f:"protect",wx:"đi trọn ý bà",lx:"họ Lâm không còn gì để đòi",rt:"Ngươi lạy ba lạy trước bài vị."},
  {n:"Giữ lại một trang cho họ Lâm",f:"just",wx:"họ Lâm còn đường đòi tên",lx:"người cũ của bà cho là ngươi trái lời",rt:"Ngươi tách một trang, cất riêng."},
  {n:"Giữ cả, để không ai đem ra",f:"use",wx:"con bài trong tay",lx:"ai cũng muốn lấy",rt:"Ngươi khóa tất cả vào một nơi."}]},
 s1:{h:"Bí mật trong tay",w:"th",need:["th"],if:RDW(1),t:"Hộp gấm trong tay ngươi. Thái hậu biết, {v} biết. Từ hôm ấy ai gặp ngươi cũng cười nhiều hơn một chút.",o:[
  {n:"Dâng hộp cho Thái hậu",need:["th"],wx:"bà tin ngươi tuyệt đối",lx:"con bài rời tay ngươi",f:"protect",rt:"Thái hậu nhận hộp, không mở: “Con giữ hộ ai gia thêm ít lâu.”"},
  {n:"Giữ hộp, không nói gì",f:"use",wx:"ai cũng phải nể ngươi",lx:"ai cũng muốn lấy nó",rt:"Ngươi khóa hộp vào nơi chỉ ngươi biết."},
  {n:"Cho Lâm Khải biết hộp vẫn nằm yên chỗ kín",wx:"hắn thôi lo",lx:"Thái hậu biết thì cho là ngươi hai lòng",f:"just",rt:"Lâm Khải hồi: “Hạ thần chờ đến Thanh minh.”",rf:"Thư lọt đến tai ma ma Đức Thọ cung."}]},
 s2:{h:"Bí mật trong tay người khác",w:"th",need:["th"],if:RDW(0),t:"Hộp gấm không còn trong tay ngươi. Thái hậu bắt đầu ho về đêm. Ma ma nói bà không ngủ được từ hôm nghe tin.",o:[
  {n:"Ở lại hầu bà",wx:"bà có người bên cạnh",lx:"mệt người, Hoàng thượng thấy ngươi vắng",f:"protect",rt:"Ngươi sắc thuốc, ngồi bên giường đến sáng."},
  {n:"Viết thư cho Lâm Khải xin hắn đừng vội",wx:"bên ngoài chưa nổ",lx:"hắn không còn tin",f:"just",rt:"Lâm Khải hồi: “Hạ thần không vội. Nhưng người khác vội.”",rf:"Thư không có hồi âm."},
  {n:"Tìm cách mua lại bản sao",wx:"có lại con bài",lx:"bạc đi, bản sao không về",f:"use",rt:()=>`Một thái giám ${CHR_Q()} bán cho ngươi một trang chép lại.`,rf:"Thái giám lấy bạc rồi biến mất."}]},
 c1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Đêm khuya, Hoàng thượng hỏi khẽ: “Mẫu hậu năm xưa có làm gì không? Trẫm muốn nghe từ nàng.”",o:[
  {n:"Thưa thật cả hai phía",wx:"ngài tin ngươi không giấu ngài",lx:A=>S.thDead?"họ ngoại trách ngươi kể":"Thái hậu biết ngươi kể",f:"just",rt:"Hoàng thượng nghe xong, ngồi rất lâu: “Mẫu hậu đã sợ vì trẫm.”",rf:"Hoàng thượng đứng dậy, ra khỏi cung không nói gì."},
  {n:"Thưa: mẫu hậu chỉ tự vệ",f:"protect",wx:"che được cho bà",lx:"ngài biết ngươi chỉ nói một nửa",rt:"Hoàng thượng gật đầu, không hỏi thêm."},
  {n:"Thưa: thần thiếp không dám bàn chuyện tiên đế",wx:"không sai lời",lx:"ngài thấy ngươi lảng",rt:"Hoàng thượng cười nhạt."}]},
 c2:{h:"{v} ra giá",w:"v",need:["v"],t:"{v} nhắn: nàng còn giữ một trang chép từ hộp gấm. Trước rằm, đưa một món bạc lớn thì trang ấy về tay ngươi; qua rằm, nó sang Ngự sử đài.",o:[
  {n:"Trả bạc trước rằm",wx:"trang chép về tay ngươi",lx:"tốn bạc lớn, {v} biết ngươi chịu trả",f:"use",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Trang chép được gói trong khăn lụa gửi sang."},
  {n:"Tìm chứng {v} đưa bạc ra cung để đổi lại",wx:"hai bên cùng cầm thóp nhau",lx:"không đủ chứng thì nàng làm thật",f:"use",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"{v} thấy sổ bạc của nàng trong tay ngươi, gửi trang chép sang không đòi gì.",rf:"{v} cười: “Rằm.”"},
  {n:"Mặc nàng, đi nói thẳng với Thái hậu",need:["th"],wx:"bà biết ai đang dọa bà",lx:"trang chép vẫn ở tay {v}",f:"protect",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"Thái hậu cho gọi {v}. Ngươi không biết họ nói gì."}]},
 t1:{h:"Cô mẫu xin một việc",w:"th",need:["th"],t:"Thái hậu nói, lần đầu không như ra lệnh: “Đốt hết đi. Ai gia già rồi, không muốn mang chuyện này xuống gặp tiên đế.”",o:[
  {n:"Vâng, con sẽ đốt",f:"protect",wx:"bà yên lòng",lx:"họ Lâm không còn gì để đòi",rt:"Thái hậu nhắm mắt: “Con là đứa cháu tốt.”"},
  {n:"Xin bà để lại một trang cho họ Lâm",wx:"bà chịu để lại",lx:"bà thấy ngươi bênh người ngoài",f:"just",rt:"Thái hậu khẽ gật.",rf:"Thái hậu nói: “Không.”"},
  {n:"Thưa: con giữ, để không ai đem ra nữa",wx:"bà để ngươi giữ",lx:"bà biết ngươi không muốn buông",f:"use",rt:"Thái hậu nhìn ngươi lâu: “Giống ai gia quá.”",rf:"Thái hậu quay mặt vào trong."}]},
 x1:{h:"Đường ngươi chọn",w:"emp",t:A=>`Còn mười ngày đến Thanh minh. Hoàng thượng, ${S.thDead?"":"Thái hậu, "}Lâm Khải và {v} đều đang chờ ngươi đi bước trước.`,o:[
  {n:"Xin Hoàng thượng lặng lẽ phục danh cho Lâm thị",e:["win","lose"],rt:()=>`Hoàng thượng gật: “Không chiếu, không sớ. Trẫm sẽ ${CHR_LAM()?"cho họ Lâm đón người về":"cho cải táng"}.” Không ai nhắc đến Thái hậu.`,rf:"Hoàng thượng hỏi: “Nàng muốn trẫm phán mẫu hậu sai?” Ngài không đáp lời ngươi nữa."},
  {n:"Đứng chắn trước cô mẫu",e:["win","mid"],rt:"Mọi lời đồn về Đức Thọ cung đều phải qua ngươi. Không ai dám nói to.",rf:"Ngươi chắn được lời đồn trong cung, nhưng ngoài triều vẫn có người thì thầm."},
  {n:"Giữ thế, chờ người khác đi trước",e:"mid",lx:"ai cũng thấy ngươi đứng nhìn",rt:"Ngươi không làm gì. Mười ngày trôi đi rất chậm."}]}},
 E:{win:{tag:"Ngươi nắm thế",w:"emp",t:A=>`Trước Thanh minh, mọi sợi dây đều đi qua tay ngươi: Hoàng thượng nghe ngươi, ${S.thDead?"người cũ Đức Thọ cung theo ngươi":"Thái hậu chờ ngươi"}, Lâm Khải tin ngươi.`},
  mid:{tag:"Mỗi bên giữ một nửa",t:"Ngươi giữ được một nửa. Nửa kia vẫn trong tay người khác, và Thanh minh thì đã đến."},
  lose:{tag:"Thế ngươi lỏng",t:A=>`Hoàng thượng lạnh nhạt, ${S.thDead?"họ ngoại nghi":"Thái hậu nghi"}, {v} chờ ngày rằm. Thanh minh đến khi ngươi chưa cầm được gì.`}}});

rdDef("ch_bi",10,{t:"Đêm Thanh minh",w:"emp",sj:"hạn Thanh minh của Lâm Khải",cast(A){return rdCast(A,["v"])},
 g:"Đêm trước Thanh minh. Sáng mai, nếu không có lời, Lâm Khải mang bản sao cuối đến Ngự sử đài. {v} cũng có người chờ ở cửa Ngự sử đài. Lá thư sẽ cháy, hay sẽ đến trước mặt Hoàng thượng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{c3:{h:"Đêm trước bài vị",w:"me",if:()=>S.thDead,t:"Ngươi thức trước bài vị Thái hậu. Sáng mai, cả kinh thành có thể biết bà đã làm gì năm xưa.",o:[
  {n:"Viết thay cô mẫu một lời tạ lỗi",f:"word",wx:"có một lời để trao",lx:"lời viết thay không có ấn của bà",rt:"Ngươi viết tám chữ, đóng ấn của chính mình: “Năm ấy cô mẫu quá tay. Xin yên nghỉ.”",rf:"Ngươi viết rồi xé, đến sáng vẫn không xong."},
  {n:"Ngồi im bên bài vị",f:"stay",wx:"Lòng +",lx:"đêm trôi mà không ai làm gì",rt:"Ngươi ngồi đến khi đèn tàn."}]},
 s1:{h:"Một lời nhắn của Lâm Khải",w:"maid",if:RDW(1),t:"Lâm Khải nhắn: hắn đang ở chùa Hộ Quốc với bản sao cuối. Nếu có người của nương nương đến trước canh năm, hắn sẽ nghe.",o:[
  {n:"Sai {maid} đến chùa",wx:"{maid} đến kịp",lx:"{maid} bị giữ ở cổng cung",f:"reach",rt:"{maid} ra cổng trước canh tư.",rf:"Thị vệ giữ {maid} lại hỏi giấy."},
  {n:"Viết một lá thư có ấn riêng của ngươi",wx:"hắn biết lời là thật",lx:"thư có ấn là chứng của ngươi",f:"reach",rt:"Ngươi đóng ấn riêng, gấp thư."},
  {n:"Gửi bạc lo cho mẹ hắn, kèm một lời",wx:"hắn biết ngươi lo cho người nhà hắn",lx:"tốn bạc, có thể hắn thấy là mua",f:"reach",rt:"Túi bạc và lá thư cùng đi."}]},
 s2:{h:"Ngươi không biết hắn ở đâu",w:"maid",if:RDW(0),t:"Lâm Khải không ở nhà, không ở Hàn lâm viện. Đêm nay hắn ở đâu, chỉ người của {v} biết.",o:[
  {n:"Nhờ nhà ngoại cho người canh cửa Ngự sử đài",wx:"gặp hắn trước khi hắn vào",lx:"tốn bạc, canh suốt đêm",f:"reach",rt:"Người nhà ngoại đứng trong bóng tối trước cửa Ngự sử đài."},
  {n:"Đoán hắn ở chùa Hộ Quốc",wx:"tìm đúng chỗ",lx:"đoán sai, mất một đêm",f:"reach",rt:"Đèn chùa Hộ Quốc còn sáng. Hắn ở đó.",rf:"Chùa tối om."},
  {n:"Ở lại Đức Thọ cung với cô mẫu",need:["th"],wx:"bà có người bên cạnh",lx:"bên ngoài để mặc",f:"stay",rt:"Ngươi ngồi bên Thái hậu. Bà không ngủ."}]},
 c1:{h:"Người của {v} ở cửa Ngự sử đài",w:"v",need:["v"],t:"Một thái giám của cung {v} sắp ra cổng cung với một gói giấy, mang đến cửa Ngự sử đài. Nếu Lâm Khải không đến, gói giấy ấy sẽ vào thay.",o:[
  {n:"Cho người chặn tên thái giám ở cổng cung",wx:"gói giấy không vào được",lx:"giữ người của cung khác là phạm phép",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1])},rt:"Tên thái giám bị giữ đến sáng vì “không có thẻ ra cung”.",rf:"Hắn có thẻ thật. Người của ngươi phải thả."},
  {n:"Báo Tổng quản: có kẻ mang giấy tờ ra cung",wx:"Tổng quản ra tay, không phải ngươi",lx:"Tổng quản ngại cung {v}",rt:"{eun} cho gọi tên thái giám về.",rf:"{eun} nói: “Không có lệnh, nô tài không bắt.”"},
  {n:"Để hắn vào",wx:"không ai nói ngươi ngăn người dâng tấu",lx:"Ngự sử đài có thêm một bản",rt:"Tên thái giám ra cổng, đứng chờ ở cửa Ngự sử đài đến sáng."}]},
 c2:{h:"Thái hậu không ngủ",w:"th",need:["th"],t:"Thái hậu ngồi trước bàn thờ tiên đế cả đêm. Bà hỏi ngươi: “Sáng mai, cả kinh thành sẽ biết ai gia đã làm gì?”",o:[
  {n:"Thưa: con sẽ không để thế",f:"stay",wx:"bà yên lòng",lx:"lời hứa nặng hơn sức ngươi",rt:"Thái hậu gật đầu, nhắm mắt niệm Phật."},
  {n:"Xin bà viết một dòng cho họ Lâm",wx:"có lời của bà trong tay",lx:"bà thấy bị ép",f:"word",rt:"Thái hậu cầm bút, viết tám chữ: “Năm ấy ai gia quá tay. Xin yên nghỉ.”",rf:"Thái hậu đặt bút xuống: “Ai gia không viết.”"},
  {n:"Ngồi im bên bà",wx:"bà có người bên cạnh",lx:"đêm trôi mà không ai làm gì",rt:"Hai cô cháu ngồi đến khi đèn tàn."}]},
 t1:{h:"Canh năm",w:"maid",t:"Canh năm. Trời sắp sáng. {maid} đứng ở cửa, chờ ngươi nói đi hay ở.",o:[
  {n:"Tự mình đi",wx:"đến kịp trước Lâm Khải",lx:"bị bắt gặp ra cổng giữa đêm",f:"reach",rt:"Ngươi mặc áo cung nữ, đi bằng cửa hông.",rf:"Thị vệ nhận ra ngươi ở cổng."},
  {n:"Gửi lá thư cuối",wx:"lời ngươi đến tay hắn",lx:"không biết hắn có đọc",rt:"{maid} chạy đi trong sương."},
  {n:"Ở lại, để trời quyết",wx:"không ai thấy ngươi nhúng tay",lx:"không còn gì trong tay",f:"stay",rt:"Ngươi ngồi lại."}]},
 x1:{h:"Ngọn lửa",w:"emp",t:"Sáng Thanh minh. Lâm Khải đứng trước cửa Ngự sử đài, bản sao cuối trong tay áo. Hắn chờ một lời.",o:[
  {n:"Trao lời tạ lỗi viết thay cô mẫu, xin hắn đốt thư",if:()=>S.thDead,e:["win","lose"],rt:"Lâm Khải đọc tám chữ, im rất lâu, rồi châm lửa vào bản sao cuối ngay trên bậc đá.",rf:"Lâm Khải nói: “Người viết không phải bà.” Hắn bước vào trong."},
  {n:"Trao lời của Thái hậu, xin hắn đốt thư",need:["th"],e:["win","lose"],rt:"Lâm Khải đọc tám chữ, rồi châm lửa vào bản sao cuối ngay trên bậc đá.",rf:"Lời đến muộn. Lâm Khải đã vào trong."},
  {n:"Tự đưa bản sao lên Hoàng thượng trước",e:["win","mid"],rt:"Hoàng thượng nhận từ tay ngươi, đọc, rồi bỏ vào lò: “Chuyện nhà trẫm, trẫm tự giải.”",rf:"Hoàng thượng nhận, không đốt, cất vào hộp riêng."},
  {n:"Để mọi việc đi theo đường của nó",e:"mid",lx:"không ai biết lá thư cuối đã đi đâu",rt:"Ngươi đứng xa nhìn. Lâm Khải đứng đến trưa rồi về, bản sao vẫn trong tay áo."}]}},
 E:{win:{tag:"Ngọn lửa trong tay ngươi",w:"emp",t:"Lá thư cuối thành tro. Ngự sử đài không nhận được gì. Người châm lửa, ai cũng biết, là do ngươi mà châm.",go:(_A,G)=>CHR_TH(G[0])},
  mid:{tag:"Lửa chưa tắt",t:"Lá thư không đến Ngự sử đài, nhưng cũng chưa cháy. Nó nằm ở đâu đó, chờ."},
  lose:{tag:"Bản sao đến Ngự sử đài",t:A=>S.thDead?"Lâm Khải dâng bản sao. Ngự sử đài chưa dám dâng sớ nhắc đến Thái hậu đã khuất, nhưng cả triều đã biết.":"Lâm Khải dâng bản sao. Ngự sử đài chưa dám dâng sớ hặc Thái hậu, nhưng cả triều đã biết.",go:(A,G)=>{rdOan(A,"v",G[0]);return CHR_TH(G[1])}}}});

rdDef("ch_bi",11,{t:"Bí mật được chôn",w:"th",sj:"bí mật năm xưa của Đức Thọ cung",cast(A){return rdCast(A,["v"])},
 g:A=>S.thDead?"Chuyện năm xưa phải có một kết. Thái hậu đã khuất; chôn nó, tiếng bà được giữ. Để nó ra ánh sáng, họ ngoại mất thế mà ngươi vẫn phải đứng. Giữ nó, nó thành quyền của ngươi. Đây là kết cục truyện xuất thân của ngươi.":"Chuyện năm xưa phải có một kết. Chôn nó, Thái hậu nợ ngươi. Để nó ra ánh sáng, bà mất thế mà ngươi vẫn phải đứng. Giữ nó, nó thành quyền của ngươi. Đây là kết cục truyện xuất thân của ngươi.",
 p:[["s1","s2","s3"],["c1","c2"],["t1","t2"],["x1","x2"]],
 B:{s3:{h:"Bài vị cô mẫu",w:"me",if:()=>S.thDead,t:"Thái hậu đã khuất. Chuyện năm xưa còn đó, và giờ chỉ ngươi quyết nó kết thế nào.",o:[
  {n:"Chép kinh cho cô mẫu",f:"bury",wx:"Lòng +",lx:"mệt người",rt:"Ngươi chép kinh trước bài vị đến khuya."},
  {n:"Viết thư hỏi thăm mẹ Lâm Khải",f:"amend",wx:"họ Lâm thấy ngươi có lòng",lx:"thư bị người khác đọc",rt:"Lâm Khải hồi: “Mẹ của hạ thần đội ơn nương nương.”",rf:"Thư lọt đến tai họ ngoại."},
  {n:"Giữ kín mọi giấy tờ",f:"power",wx:"con bài trong tay",lx:"ai cũng đoán ngươi cầm gì",rt:"Ngươi khóa rương."}]},
 t2:{h:"Lá thư cuối cùng",w:"me",if:()=>S.thDead,t:"Chỉ còn một thứ: lá thư gốc, hoặc trang chép cuối, trong tay ngươi. Không còn ai đòi nữa.",o:[
  {n:"Đốt trước bài vị cô mẫu",f:"bury",go:A=>{A.f.lgone=1},wx:"Lòng +",lx:"không còn gì trong tay",rt:"Lá thư cháy trước bài vị."},
  {n:"Khóa kỹ, giữ làm con bài",f:"power",wx:"con bài trong tay",lx:"người cũ của bà biết ngươi giữ",rt:"Ngươi khóa lá thư vào nơi không ai biết."},
  {n:"Gửi về cho họ Lâm",f:"amend",go:A=>{A.f.lgone=1},wx:"họ Lâm cầm lại tên của mình",lx:"họ ngoại cho là ngươi bán tiếng cô mẫu",rt:"Lâm Khải nhận lá thư, đặt lên bàn thờ cô hắn."}]},
 x2:{h:"Kết chuyện năm xưa",w:"emp",if:()=>S.thDead,t:"Thái hậu đã khuất. Hoàng thượng hỏi ngươi: “Chuyện năm xưa của mẫu hậu, nàng muốn nó kết thế nào?”",o:[
  {n:"Xin ngài lặng lẽ đền bù họ Lâm, giữ tiếng mẫu hậu",e:["win","lose"],rt:"Hoàng thượng gật đầu: họ Lâm được xóa án đày, không một tờ giấy nào nhắc đến mẫu hậu.",rf:"Việc đền bù vỡ ra ngoài triều. Người ta hỏi: sao triều đình phải đền?"},
  {n:"Xin ngài tự xét chuyện nhà",e:["win","mid"],rt:"Hoàng thượng một mình đến trước bài vị mẹ. Khi ngài ra, chuyện năm xưa đã khép.",rf:A=>A.f.lgone?"Hoàng thượng chỉ nói: “Trẫm biết rồi.” Chuyện năm xưa chưa khép.":"Hoàng thượng chỉ nói: “Trẫm biết rồi.” Lá thư ở lại trong tay ngươi."},
  {n:"Giữ lá thư làm con bài của mình",if:A=>!A.f.lgone,e:"mid",lx:"Hoàng thượng sẽ không quên ngươi cầm nó",rt:"Ngươi chỉ cúi đầu. Hoàng thượng hiểu, và ngài không hỏi nữa."}]},
 s1:{h:"Sau ngọn lửa",w:"th",need:["th"],if:RDW(1),t:"Từ sáng Thanh minh, Thái hậu không còn ho về đêm. Bà cho gọi ngươi, bày cờ, như ngày ngươi mới vào cung.",o:[
  {n:"Ngồi đánh cờ với bà",wx:"bà vui",lx:"bà không nhắc chuyện cũ, ngươi cũng không được nhắc",f:"bury",rt:"Thái hậu thắng ngươi ba ván, cười như trẻ."},
  {n:"Nhắc bà chuyện họ Lâm còn chưa xong",wx:"bà nhớ còn một món nợ",lx:"bà bực vì ngươi không để bà yên",f:"amend",rt:"Thái hậu đặt quân cờ xuống: “Ai gia biết.”",rf:"Thái hậu gạt bàn cờ."},
  {n:"Xin bà một ân điển cho cung mình",wx:"bà trả ơn ngay",lx:"bà thấy ngươi đòi công",f:"power",rt:"Thái hậu ban cho cung ngươi một đôi bình ngọc từ kho riêng.",rf:"Thái hậu nói: “Ơn thì nhớ, đòi thì thôi.”"}]},
 s2:{h:"Triều thần thì thầm",w:"emp",need:["th"],if:RDW(0),t:"Ngoài triều, chuyện Thái hậu năm xưa được nói nhỏ trong các phủ. Hoàng thượng thôi đến Đức Thọ cung mỗi sớm.",o:[
  {n:"Xin Hoàng thượng thăm mẫu hậu",wx:"mẹ con ngài gặp lại",lx:"ngài không đến",f:"bury",rt:"Hoàng thượng đến Đức Thọ cung. Hai mẹ con ngồi im, mà không ai đứng dậy về trước.",rf:"Hoàng thượng bảo: “Để sau.”"},
  {n:"Tự đứng ra trước các phi tần",wx:"lời đồn trong cung tắt",lx:"người ta nói ngươi chột dạ thay bà",f:"power",rt:"Trong buổi thỉnh an, không phi tần nào dám nhắc chuyện cũ khi ngươi ngồi đó.",rf:"Có phi tần cười sau quạt."},
  {n:"Lui về cung mình",wx:"không bị cuốn theo",lx:"Thái hậu một mình",rt:"Ngươi đóng cửa cung chép kinh."}]},
 c1:{h:"Lâm Khải xin một lần gặp",w:"maid",t:()=>`Lâm Khải gửi thư vào: mẹ hắn sắp mất, chỉ mong ${CHR_LAM()?"được gặp em chồng một lần":"biết em chồng bà rồi sẽ nằm ở đâu"}.`,o:[
  {n:"Xin Hoàng thượng cho Lâm thị được trả lại tên",wx:"họ Lâm được trả tên",lx:A=>S.thDead?"họ ngoại biết ngươi đi xin":"Thái hậu biết ngươi đi xin",f:"amend",rt:()=>CHR_LAM()?"Một chỉ nhỏ của Hoàng thượng qua Nội vụ phủ, không nêu lý do: Lâm thị được phục danh, về sống với họ Lâm.":"Một chỉ nhỏ của Hoàng thượng qua Nội vụ phủ, không nêu lý do: phi tần họ Lâm được cải táng vào lăng phi tần.",rf:"Nội vụ phủ trả lời: không có tiền lệ."},
  {n:"Gửi bạc lo hậu sự cho mẹ hắn",wx:"tròn một chữ nghĩa",lx:"tốn bạc, cái tên của Lâm thị vẫn chưa được trả",f:"amend",rt:"Mẹ Lâm Khải được lo chu đáo."},
  {n:"Không trả lời",wx:"không để lại dấu",lx:"Lâm Khải nhớ ngươi im lặng",f:"power",rt:"Thư nằm trong ngăn kéo."}]},
 c2:{h:"{v} cầu hòa",w:"v",need:["v"],t:"{v} đến, không mang gì theo: “Chuyện cũ, muội thua. Muội chỉ xin tỷ đừng đem những gì tỷ biết về muội ra.”",o:[
  {n:"Hứa không đem ra",wx:"{v}: oán −",lx:"nàng còn đó, và nàng nhớ",f:"bury",go:(A,_ok,G)=>{rdRel(A,"v",G[0])},rt:"{v} cúi đầu thật thấp."},
  {n:"Giữ thóp, bắt nàng theo ngươi",f:"power",wx:"thêm một người phải nghe ngươi",lx:"người bị ép thì chờ ngày phản",go:(A,_ok,G)=>{rdOan(A,"v",G[0])},rt:"{v} gật đầu, mắt không nhìn lên."},
  {n:"Bảo nàng đi xin lỗi Thái hậu",need:["th"],wx:"Thái hậu được một lời xin lỗi",lx:"{v} không chịu, Thái hậu phật ý",go:(A,ok,G)=>{if(ok)rdRel(A,"v",G[0]);else rdOan(A,"v",G[1])},rt:"{v} quỳ trước Đức Thọ cung nửa ngày.",rf:"{v} nói: “Tỷ đừng ép quá.”"}]},
 t1:{h:"Lá thư gốc",w:"th",need:["th"],t:"Chỉ còn một thứ: lá thư gốc, hoặc trang chép cuối, đang ở trong tay ngươi. Thái hậu biết. Bà không đòi nữa, bà chờ ngươi tự quyết.",o:[
  {n:"Đốt trước mặt bà",f:"bury",go:A=>{A.f.lgone=1},wx:"bà nhẹ lòng",lx:"không còn gì trong tay",rt:"Lá thư cháy. Thái hậu nhìn ngọn lửa đến khi tắt."},
  {n:"Giữ lại, khóa kỹ",wx:"con bài trong tay",lx:"bà biết ngươi giữ",f:"power",rt:"Ngươi khóa lá thư vào nơi không ai biết.",rf:"Ma ma Đức Thọ cung thấy ngươi giấu."},
  {n:"Trả về cho họ Lâm",wx:"họ Lâm cầm lại tên của mình",lx:"bà cho là ngươi bán bà",f:"amend",go:A=>{A.f.lgone=1},rt:"Lâm Khải nhận lá thư, đặt lên bàn thờ cô hắn.",rf:"Thư đến tay Lâm Khải, rồi lọt đến tai Thái hậu."}]},
 x1:{h:"Kết chuyện năm xưa",w:"th",need:["th"],t:"Thái hậu gọi ngươi vào lần cuối vì chuyện này: “Con muốn nó kết thế nào?”",o:[
  {n:"Chôn bí mật, xin cô mẫu lặng lẽ đền bù họ Lâm",e:["win","lose"],rt:()=>`Thái hậu gật đầu, rồi nói với Hoàng thượng; ngài lặng lẽ xóa án đày cho họ Lâm, ${CHR_LAM()?"Lâm thị được phục danh":"Lâm thị được cải táng"}, và không một tờ giấy nào nhắc đến bà.`,rf:"Việc đền bù vỡ ra ngoài triều. Người ta hỏi: sao Thái hậu phải đền?"},
  {n:"Xin Hoàng thượng tự xét chuyện nhà",e:["win","mid"],rt:"Hoàng thượng sang Đức Thọ cung một mình. Khi ngài ra, chuyện năm xưa đã khép, và mẹ con ngài cùng ra vườn.",rf:A=>A.f.lgone?"Hoàng thượng chỉ nói: “Trẫm biết rồi.” Chuyện năm xưa chưa khép.":"Hoàng thượng chỉ nói: “Trẫm biết rồi.” Lá thư ở lại trong tay ngươi."},
  {n:"Giữ lá thư làm con bài của mình",if:A=>!A.f.lgone,e:"mid",lx:"cô mẫu sẽ không bao giờ quên ngươi cầm nó",rt:"Ngươi chỉ cúi đầu. Thái hậu hiểu, và bà không hỏi nữa."}]}},
 E:{win:{tag:A=>S.thDead?"Bí mật được chôn, tiếng cô mẫu được giữ":"Bí mật được chôn, cô mẫu mang ơn",w:"th",t:A=>S.thDead?"Chuyện năm xưa nằm yên dưới đất. Họ Lâm có lại tên, tiếng của cô mẫu được giữ, và Hoàng thượng nhớ người đã làm cho cả hai điều ấy cùng xảy ra.":"Chuyện năm xưa nằm yên dưới đất. Họ Lâm có lại tên, Thái hậu có lại giấc ngủ, và bà nhớ người đã làm cho cả hai điều ấy cùng xảy ra. Đức Thọ cung che chở ngươi.",go:()=>{if(S.thDead)return"";ap67({th:CHTH("ch_bi_11.E.win.th")});S.shield=Math.max(S.shield||0,BAL.road.ch_bi.shield);return `${fmt({th:CHTH("ch_bi_11.E.win.th")})} Thái hậu che chở ngươi ${kitNumVi(BAL.road.ch_bi.shield)} tháng: phi tần khó hại ngươi.`}},
  mid:{tag:A=>A.f.lgone?"Chuyện năm xưa chưa khép":"Bí mật thành quyền của ngươi",t:A=>A.f.lgone?`Lá thư đã không còn trong tay ngươi, nhưng chuyện năm xưa chưa khép. ${S.thDead?"Họ ngoại":"Thái hậu"} vẫn chờ, {v} vẫn nhớ, và ai cũng biết ngươi từng đọc nó.`:`Lá thư ở trong tay ngươi. ${S.thDead?"Họ ngoại nể ngươi":"Thái hậu nể ngươi"}, {v} sợ ngươi, Hoàng thượng biết ngươi giữ một điều ngài không muốn nghe lại. Không ai thương ngươi hơn, nhưng không ai dám bỏ ngươi.`,go:(_A,G)=>CHR_TH(G[0])},
  lose:{tag:"Bí mật ra ánh sáng",t:A=>S.thDead?"Chuyện năm xưa ra ánh sáng. Ngoài triều người ta bàn về Thái hậu đã khuất; Hoàng thượng thôi nhắc đến họ ngoại. Ngươi vẫn đứng được, nhưng chỗ dựa lớn nhất của ngươi đã lùi vào bóng.":"Chuyện năm xưa ra ánh sáng. Thái hậu tự đóng cửa Đức Thọ cung tụng kinh, không còn hỏi việc lục cung; Hoàng thượng thăm bà một tháng một lần. Ngươi vẫn đứng được, nhưng chỗ dựa lớn nhất của ngươi đã lùi vào bóng.",go:(_A,G)=>CHR_TH(G[0])}}});
RD97L.push(rdRare({a:"ch_bi_11",tag:"Họ Lâm phục danh, hai nhà giải oán",w:"th",need:"th",n:"Xin cô mẫu cùng ngươi đến thắp hương cho phi tần họ Lâm",
 path:["Viết thư mời nói chuyện","Hỏi ma ma Lâm Khải là người thế nào","Hỏi vì sao cả nhà phải chịu","Xin bà cho họ Lâm một lời đền bù kín","Xin bà để lại một trang cho họ Lâm","Xin bà viết một dòng cho họ Lâm","Trao lời của Thái hậu","cho Lâm thị được trả lại tên"],bad:["Viết thư răn đe","Giữ thóp, bắt nàng theo ngươi","Giữ lá thư làm con bài"],x:[()=>!S.thDead&&S.duc>=RR("ch_bi_11").bar&&(S.th||0)>=netTh("th","than"),"Thái hậu còn sống, Đức từ "+RR("ch_bi_11").bar+", Thái hậu thân với ngươi"],
 t:()=>(CHR_LAM()?"Thái hậu chống gậy đến Thọ Khang cung, tự tay dắt Lâm thị ra trước mặt Lâm Khải. Hắn quỳ xuống, khóc không thành tiếng.":"Thái hậu chống gậy đứng trước mộ phi tần họ Lâm, tự tay thắp một nén hương. Lâm Khải quỳ phía sau, khóc không thành tiếng.")+" Bà nói với hắn: “Cô ngươi có tội với ai gia. Ai gia có tội với nhà ngươi. Hôm nay trả nhau.” Từ đó họ Lâm về lại kinh thành, và Đức Thọ cung không còn một bí mật nào phải giấu.",
 rw:"nt_dongchau",ti:"Người hòa giải chuyện năm xưa"}));
