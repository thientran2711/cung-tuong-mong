/* ================= jend14: PHẦN CUỐI «Ngôi Trung cung», chapters 12–14 in hồi form (ROAD_MAP.md §2 + §6 item 5; owner OD:L1242) =================
   Reuses what exists (LUẬT ƯU TIÊN SỐ 1): ch12 st_dong / st_con (j67, main) stay as they are; this file adds
     noi14  «Người nối dõi»        ch12 when she has no living child (ROAD_MAP ch12x),
     hau14  «Tranh ngôi Trung cung» ch13: the hồi form of the j67 milestone MS67.hau (whose goal, the Hoàng hậu seat, stays the game's own
            goal: the seat itself is still decided by the lập hậu rules of j8/j34; this chapter moves her real weight toward it),
     ke14   «Mẫu nghi thiên hạ»    ch14: the hồi form of MS67.ke (the Thái tử is still set by the succession rules j3/j51; this chapter
            moves her son's weight, and sets him only when no Thái tử exists yet).
   cnv (servant start, §8.4): a full road no longer holds «Từ kẻ hầu thành tiểu chủ»; if she is STILL a maid when the road ends, chapter 12
   is that chapter (MS67.len14, no time limit: the consort chapters 13–14 open once she is raised).
   SAVES: only a life started on this build gets S.st.f14.eg = 1; every older plan (ms:hau / ms:ke / end:12) runs exactly as before.
   ONE CORE (OD:L1267): chapter-level numbers in BAL.road.end (jbal2.js); per-option costs inline like every j67 arc.
   Kit only: these are j67 arcs (Mệnh truyện card, kit event frame, kitGoalDetail §72, kit result card); no new UI. */
const EG14={noi:"noi14",hau:"hau14",ke:"ke14"};
function egOn(){try{return !!(f14()&&S.st.f14.eg)}catch(e){return false}}
/* her strongest rival for the Trung cung seat (lập hậu weight j8 seatW), never the sitting Hoàng hậu */
function egSeatRv(A){try{const L=liveRivals(false).filter(v=>!v.queen);if(!L.length)return true;
 L.sort((a,b)=>(typeof seatW==="function"?seatW(b)-seatW(a):0));A.act.v=L[0].id}catch(e){}return true}
/* the mother of the prince who stands nearest the throne after hers (kvOrder j51), else any mother of a prince */
function egMomRv(A){try{const mine=new Set(mySons());const L=liveRivals(true).filter(v=>(v.kids||[]).some(k=>k.alive&&k.sex==="m"&&!mine.has(k)));
 if(L.length)A.act.v=L.sort((a,b)=>(typeof seatW==="function"?seatW(b)-seatW(a):0))[0].id}catch(e){}return true}
const egQueen=()=>S.rank>=7,egHeirMine=()=>!!(S.heir&&S.heir.k&&S.heir.k.alive&&!S.heir.v),egHeirNone=()=>!(S.heir&&S.heir.k&&S.heir.k.alive);
/* ch13 win: one real step toward the seat. Below Phi-level seats: an ân thi at once (jexam exGrace, conditions waived; she still sits it);
   at the top seat below Hoàng hậu: Thái hậu and court weight for the lập hậu choice; already Hoàng hậu: the seat holds (che chở months). */
function egHauWin(){const R=BAL.road.end;try{if(S.rank>=7){S.shield=Math.max(S.shield||0,R.hauShield);return `Ngôi Trung cung vững thêm: ${R.hauShield} tháng không ai lay nổi.`}
 if(S.rank<6&&typeof exGrace==="function"){exGrace(S,"m");return `Được ân thi tấn phong ngay, khỏi đợi đủ điều kiện (lên ${RANKS[S.rank+1].n} nếu qua).`}
 apply({th:R.hauTh,danh:R.hauDanh});return `Thái hậu và triều thần nghiêng về ngươi khi bàn lập hậu: Thái hậu quý ngươi +${R.hauTh}, Danh +${R.hauDanh}.`}catch(e){console.error(e)}return""}
/* ch14 win: her son. No Thái tử yet and he is dear enough to Hoàng thượng → he is set (j1 setHeir); else his weight grows (j67 e67heir). */
function egKeWin(){const R=BAL.road.end;try{const s=son67();if(!s){apply({danh:R.keDanh});return `Danh +${R.keDanh}: lục cung gọi ngươi là mẹ hiền.`}
 if(egHeirMine())return e67heir(R.keHeir);
 if(egHeirNone()&&(s.fond||0)>=R.keFond&&typeof setHeir==="function"){setHeir(s,null);return `<b class="g">${s.name} được lập làm Thái tử.</b>`}
 return e67heir(R.keHeir)}catch(e){console.error(e)}return""}

/* ---------- ch12x · noi14 · Người nối dõi (no living child) ---------- */
ARC67.noi14={o:"eg",ok:()=>nsrv67()&&!S.kids.some(k=>k.alive),t:"Người nối dõi",w:"th",sj:"chuyện con cái của ngươi",
 g:"Năm tháng qua, cung ngươi vẫn chưa có tiếng trẻ. Người ta bắt đầu đếm: ai có con, ai không. Ngươi phải tự tìm chỗ đứng cho mình khi không có đứa trẻ nào đứng sau lưng.",
 p:[["s1","s2"],["c1","c2","c3","G.th","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Thái y bắt mạch",w:"doc",t:"Thái y bắt mạch xong, ngập ngừng: “Mạch nương nương hơi hàn, chưa phải hết đường. Có điều phải kiên nhẫn, lại tốn kém.”",o:[
  {n:"Xin bài thuốc dài ngày",c:{bac:-50},w:{},wx:"dễ thụ thai hơn trong mấy tháng tới",lx:"thuốc đắng, tốn bạc",go:()=>{S.fert=Math.max(S.fert||0,BAL.road.end.fertM)},rt:"Thái y kê đơn, dặn uống đủ ba tháng."},
  {n:"Giữ kín bệnh mạch",c:{suc:-3},o:()=>45+S.mat*5,w:{danh:2},sc:1,wx:"không ai biết ngươi lo",l:{danh:-3},lx:"chuyện lộ ra thì thành chuyện cười",rt:"Thái y hứa không ghi vào sổ mạch.",rf:"Sổ mạch đến tay người khác."},
  {n:"Cảm tạ, không chữa",c:{th:-2},w:{duc:3},wx:"lòng yên, không tốn bạc",lx:"Thái hậu trách ngươi không lo hương hỏa",rt:"Ngươi đóng hộp thuốc, bảo thái y lui."}]},
 s2:{h:"Lời bàn sau lưng",w:"v",need:["v"],t:"Ở tiệc thưởng hoa, {v} bế con ngồi cạnh Thái hậu, cười: “Cung của tỷ tỷ yên tĩnh thật, chẳng như cung muội, cả ngày ồn tiếng trẻ.”",o:[
  {n:"Cười đáp, khen đứa trẻ",c:{suc:-2},w:{duc:3},wx:"giữ thể diện",lx:"{v} được thế lấn tới",rt:"Thái hậu gật gù: ngươi biết điều."},
  {n:"Đáp trả một câu",c:{},o:()=>40+S.tamco/3,w:{danh:2},sc:1,wx:"{v} cứng họng",l:{danh:-3},lx:"thành kẻ ghen con người",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Cả bàn tiệc lặng đi, {v} đỏ mặt.",rf:"Thái hậu nhíu mày: ngươi hẹp lượng."},
  {n:"Cáo bệnh rời tiệc",c:{sung:-2},w:{suc:4},wx:"khỏi chịu nhục",lx:"vắng mặt thì người khác nói thay",rt:"Ngươi về cung, đóng cửa nghỉ."}]},
 c1:{h:"Cầu tự ở Phụng Tiên điện",w:"th",t:"Thái hậu khuyên: “Thành tâm thì trời thương. Ngươi chép kinh cầu tự đủ bảy ngày đi.”",o:[
  {n:"Chép kinh bảy ngày",c:{suc:-5},w:{th:4},wx:"Thái hậu thấy ngươi thành tâm; dễ có thai hơn",lx:"bảy ngày không gặp được Hoàng thượng",go:()=>{S.pray=Math.max(S.pray||0,BAL.road.end.prayM)},rt:"Bảy ngày qua, hương trong điện không tắt."},
  {n:"Cúng dường chùa ngoài cung",c:{bac:-40},w:{danh:3},wx:"tiếng hiền đức ra ngoài",lx:"tốn bạc",rt:"Chùa dựng bia ghi tên công đức của ngươi."},
  {n:"Thưa: mệnh có thì tự đến",c:{th:-3},w:{duc:2},wx:"không ép mình",lx:"Thái hậu cho là ngươi cứng đầu",rt:"Thái hậu thở dài, không nói thêm."}]},
 c2:{h:"Công chúa mất mẹ",w:"th",need:["th"],if:()=>allKids().some(([k,v])=>v&&k.alive&&k.sex==="f"&&(!v.alive||v.out)),t:"Một công chúa nhỏ vừa mất mẹ. Thái hậu hỏi ai trong lục cung chịu trông nom nó những ngày đầu.",o:[
  {n:"Xin được trông nom",c:{suc:-4,bac:-20},w:{th:6,duc:3},wx:"Thái hậu thấy ngươi có lòng",lx:"thêm việc, thêm tốn",rt:"Đứa bé ôm cổ ngươi ngủ thiếp đi."},
  {n:"Nhường người có con",c:{th:-3},w:{duc:1},wx:"không vướng chuyện nhà người",lx:"Thái hậu quý ngươi bớt đi",rt:"Thái hậu giao đứa bé cho người khác."},
  {n:"Tiến cử một phi tần hiền",c:{suc:-2},o:()=>45+S.danh/5,w:{danh:3},sc:1,wx:"được hai người mang ơn",l:{th:-2},lx:"người kia làm hỏng việc",rt:"Thái hậu khen ngươi biết người.",rf:"Người ngươi tiến cử để đứa bé ốm."}]},
 c3:{h:"Hoàng thượng thăm cung",w:"emp",t:"Hoàng thượng ghé cung ngươi, ngồi lâu hơn thường lệ: “Cung nàng yên quá. Trẫm có khi lại cần một chỗ yên như thế.”",o:[
  {n:"Giữ ngài ở lại dùng bữa",c:{bac:-20},w:{sung:5},wx:"ngài vui",lx:"tốn bạc bày tiệc",rt:"Đêm ấy ngài nghỉ lại cung ngươi."},
  {n:"Đàm đạo việc nước với ngài",c:{suc:-3},o:()=>40+S.tai/3,w:{danh:3,sung:2},sc:1,wx:"ngài thấy ngươi hiểu chuyện",l:{sung:-3},lx:"ngài thấy ngươi bàn việc ngoài phận",rt:"Hoàng thượng gật gù nghe ngươi nói.",rf:"Hoàng thượng đổi sang chuyện khác."},
  {n:"Khuyên ngài thăm cung khác",c:{sung:-3},w:{duc:4},wx:"lục cung khen ngươi rộng lượng",lx:"ngài đi thật",rt:"Hoàng thượng cười, rồi sang cung khác."}]},
 t1:{h:"Chọn đường cho mình",w:"me",t:"Đêm ấy ngươi ngồi một mình. Không con, thì lấy gì mà đứng? Lấy đức, lấy người, hay cứ chờ trời?",o:[
  {n:"Lấy đức làm gốc",c:{suc:-2},w:{duc:5,danh:2},wx:"tiếng hiền đức",lx:"đức không thay được Sủng",rt:"Từ đó cung ngươi mở cửa cho người cần giúp."},
  {n:"Kết thân một bà mẹ có hoàng tử",c:{bac:-30},o:()=>40+S.tamco/3,if:A=>!!rv67(A,"v"),w:{danh:2},sc:1,wx:"có một đồng minh có con",l:{duc:-2},lx:"bị coi là đi cửa sau",go:(A,ok)=>{rdRel(A,"v",ok?12:-5)},rt:"{v} nhận lễ, hẹn từ nay có nhau.",rf:"{v} lạnh nhạt nhận lễ, không hứa gì."},
  {n:"Kiên trì cầu con",c:{bac:-30},w:{},wx:"dễ thụ thai hơn",lx:"tốn bạc, lòng nặng",go:()=>{S.fert=Math.max(S.fert||0,BAL.road.end.fertM)},rt:"Ngươi lại nhờ thái y kê đơn."}]},
 x1:{h:"Hương hỏa",w:"th",t:"Thái hậu cho gọi ngươi: “Ai gia không trách ngươi chuyện con cái. Ai gia chỉ hỏi: không có con, ngươi lấy gì để lục cung nể?”",o:[
  {n:"Thưa: lấy lòng đối đãi với mọi đứa trẻ",c:{suc:-4},o:()=>40+S.duc/3+S.th/5,e:["win","mid"],rt:"Thái hậu nắm tay ngươi rất lâu.",rf:"Thái hậu gật đầu, nhưng không nói gì thêm."},
  {n:"Thưa: lấy tài trị việc",c:{suc:-4},o:()=>40+S.tai/3+S.danh/5,e:["win","lose"],rt:"Thái hậu giao ngươi coi sổ lễ một mùa.",rf:"Thái hậu cười nhạt: tài thì ai chẳng có."},
  {n:"Quỳ xin Thái hậu che chở",c:{danh:-2},w:{th:4},e:"mid",lx:"bị coi là yếu",rt:"Thái hậu đỡ ngươi dậy."}]}},
 E:{win:{k:1,tag:"Không con mà vẫn đứng vững",w:"th",t:"Thái hậu đứng sau ngươi, lục cung biết ngươi là người hiền. Không có đứa trẻ nào, ngươi vẫn có chỗ đứng của riêng mình, và trời còn cho ngươi thời gian.",fx:{danh:6,th:6},go:()=>{S.fert=Math.max(S.fert||0,BAL.road.end.fertM);return "Mấy tháng tới dễ thụ thai hơn."}},
  mid:{k:0,tag:"Lấy đức thay con",t:"Ngươi không còn đếm ngày chờ con. Người ta nể đức ngươi, dù vẫn có kẻ xì xào sau lưng.",fx:{duc:4,danh:2}},
  lose:{k:-1,tag:"Cung vắng tiếng trẻ",t:"Lời bàn tán thắng. Ngươi bị coi là người không có phúc, Hoàng thượng thưa đến.",fx:{sung:-5,danh:-3}}}};

/* ---------- ch13 · hau14 · Tranh ngôi Trung cung ---------- */
ARC67.hau14={o:"eg",ok:()=>nsrv67(),t:"Tranh ngôi Trung cung",w:"emp",sj:"ngôi Trung cung",cast(A){return egSeatRv(A)},
 g:A=>egQueen()?"Ngươi đã ngồi ngôi Trung cung, nhưng ngôi ấy chưa vững: kẻ muốn kéo ngươi xuống vẫn còn. Giữ được ngôi, lục cung mới thật sự phục.":"Ngôi Trung cung là đích cuối của mọi phi tần. Từng bậc phải đủ Sủng, Danh, Đức; lúc bàn lập hậu, Hoàng thượng nhìn hoàng tử, lòng Thái hậu và tiếng của nhà ngươi. Chương này đưa ngươi một bước thật về phía ngôi ấy.",
 p:[["s1","s2","s3","s4"],["c1","c2","G.th","G.emp","G.hh"],["t1"],["x1"]],
 B:{s1:{h:"Ngôi chưa ấm chỗ",w:"v",if:()=>egQueen(),need:["v"],t:"Ngươi ngồi ngôi Trung cung chưa lâu, {v} đã kết bè với mấy nhà quyền thần, rỉ tai rằng ngươi không đủ đức làm mẫu nghi.",o:[
  {n:"Mở tiệc ban thưởng lục cung",c:{bac:-60},w:{danh:4},wx:"lục cung biết ơn",lx:"tốn bạc, {v} chê ngươi mua lòng",rt:"Cả lục cung nhận quà, khen ngươi rộng tay."},
  {n:"Cho người dò bè cánh của {v}",c:{suc:-3},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"biết ai theo {v}",l:{danh:-3},lx:"bị nói là Hoàng hậu đa nghi",go:(A,ok)=>{if(ok)rdOan(A,"v",6)},rt:"Danh sách bè cánh nằm trên bàn ngươi.",rf:"Kẻ dò bị bắt, {v} kêu oan khắp nơi."},
  {n:"Mời {v} đến nói chuyện",c:{},o:()=>35+S.danh/4,w:{duc:2},sc:1,wx:"hòa được thì đỡ một kẻ thù",l:{danh:-2},lx:"{v} coi đó là ngươi sợ",go:(A,ok)=>{rdRel(A,"v",ok?10:-6)},rt:"{v} cúi đầu, hứa giữ lễ.",rf:"{v} cười: “Ngôi ấy chưa chắc của tỷ tỷ lâu đâu.”"}]},
 s4:{h:"Lục cung chờ xem",w:"me",if:A=>egQueen()&&!rv67(A,"v"),t:"Ngươi ngồi ngôi Trung cung chưa lâu. Lục cung cung kính, nhưng ai cũng chờ xem ngươi trị việc ra sao, có thiên vị ai không.",o:[
  {n:"Định lại lệ lục cung",c:{suc:-4},o:()=>40+S.tai/3,w:{danh:4},sc:1,wx:"lục cung nề nếp",l:{danh:-3},lx:"lệ mới làm nhiều người phật ý",rt:"Lệ mới được chép thành sổ, ai cũng theo.",rf:"Mấy cung than phiền, lệ mới bỏ dở."},
  {n:"Giữ lệ cũ, ban ơn đều tay",c:{bac:-40},w:{duc:3},wx:"lục cung yên",lx:"tốn bạc",rt:"Lục cung khen ngươi công bằng."},
  {n:"Nhờ Thái hậu chỉ bảo",c:{danh:-2},w:{th:4},wx:"Thái hậu vui",lx:"Danh giảm: bị coi là chưa tự đứng được",rt:"Thái hậu dạy ngươi từng việc."}]},
 s2:{h:"Trung cung lung lay",w:"hh",if:()=>!egQueen()&&qOn(),t:"Trong triều có người dâng sớ chê việc lục cung dưới tay Hoàng hậu {hh} bê trễ, xin chọn người phụ việc Trung cung.",o:[
  {n:"Xin vào giúp Hoàng hậu",c:{suc:-5},w:{hh:6,duc:3},wx:"Hoàng hậu thấy ngươi trung hậu",lx:"mất nhiều ngày làm việc không công",rt:"Hoàng hậu nắm tay ngươi: “Muội có lòng.”"},
  {n:"Xin phụ việc lục cung",c:{hh:-6},o:()=>40+S.tai/3+S.danh/5,w:{danh:4},sc:1,wx:"tay nắm việc lục cung",l:{duc:-3},lx:"bị nói là nhòm ngó ngôi Trung cung",rt:"Hoàng thượng giao ngươi coi sổ lục cung một mùa.",rf:"Hoàng thượng chọn {v}."},
  {n:"Đứng ngoài, chờ thời",c:{danh:-2},w:{tamco:2},wx:"không để lộ ý",lx:"Danh giảm: người khác nhanh chân hơn",rt:"Ngươi đóng cửa cung, chỉ nghe ngóng."}]},
 s3:{h:"Ngôi Trung cung bỏ trống",w:"emp",if:()=>!egQueen()&&!qOn(),t:"Ngôi Trung cung đã trống. Triều đình chia phe: phe muốn lập người có hoàng tử, phe muốn lập người nhà thế gia, phe chờ ý Thái hậu.",o:[
  {n:"Nhờ nhà mình vận động triều thần",c:{bac:-50},o:()=>40+S.danh/4,w:{danh:3},sc:1,wx:"có tiếng nói trong triều",l:{sung:-3},lx:"Hoàng thượng ghét hậu cung kết bè ngoài triều",rt:"Mấy vị Thượng thư dâng sớ nhắc tên ngươi.",rf:"Ngự sử hặc nhà ngươi kết bè."},
  {n:"Thỉnh an Thái hậu mỗi sáng",c:{suc:-4},w:{th:6},wx:"Thái hậu nhớ đến ngươi",lx:"không có thời gian cho việc khác",rt:"Thái hậu khen ngươi biết lễ."},
  {n:"Không động tĩnh gì",c:{danh:-3},w:{duc:3},wx:"tiếng không tham ngôi",lx:"Danh giảm: không ai nhắc tên ngươi",rt:"Ngươi vẫn sống như mọi ngày."}]},
 c1:{h:"{v} tung lời đồn",w:"v",need:["v"],t:"Khắp lục cung râm ran: nhà ngươi từng nhận hối lộ, ngươi không đủ đức làm mẫu nghi. Ai cũng biết lời ấy từ cung {v} mà ra.",o:[
  {n:"Tìm kẻ tung tin",c:{bac:-30},o:()=>45+S.mat*5,w:{danh:3},sc:1,wx:"rửa được tiếng",l:{danh:-3},lx:"không tìm ra, tiếng càng xấu",go:(A,ok)=>{if(ok)rdOan(A,"v",8)},rt:"Cung nữ tung tin khai ra cung {v}.",rf:"Kẻ tung tin trốn mất."},
  {n:"Lấy việc thiện mà đáp",c:{bac:-40},w:{duc:5},wx:"việc thiện át lời đồn",lx:"tốn bạc, lời đồn vẫn còn",rt:"Ngươi phát gạo cho cung nhân già, lời đồn tự lặng."},
  {n:"Tâu thẳng Hoàng thượng",c:{sung:-3},o:()=>40+S.sung/4,sc:1,w:{sung:3},wx:"ngài tin ngươi",l:{sung:-4},lx:"ngài thấy phiền chuyện hậu cung",go:(A,ok)=>{if(ok)rdOan(A,"v",5)},rt:"Hoàng thượng phạt cung {v} cấm túc.",rf:"Hoàng thượng bảo hai người tự giải quyết."}]},
 c2:{h:"Sổ lễ Thái miếu",w:"th",need:["th"],t:"Sắp đến đại lễ Thái miếu. Thái hậu muốn xem ai trong lục cung lo nổi việc sắp đặt lễ nghi cho đúng phép.",o:[
  {n:"Nhận lo việc lễ",c:{suc:-6},o:()=>40+S.tai/3+S.duc/5,w:{th:6,danh:3},sc:1,wx:"Thái hậu thấy ngươi đủ sức gánh việc",l:{th:-4},lx:"sai một lễ là mất mặt cả đời",rt:"Đại lễ trọn vẹn, không sai một bước.",rf:"Một bài vị đặt sai chỗ, Thái hậu không vui."},
  {n:"Dâng bạc lo lễ",c:{bac:-60},w:{th:3},wx:"lễ chu toàn",lx:"tốn bạc, công không về tay ngươi",rt:"Thái hậu nhận bạc, khen ngươi biết điều."},
  {n:"Nhường {v} lo lễ",c:{th:-3},if:A=>!!rv67(A,"v"),w:{duc:2},wx:"không phải gánh việc",lx:"{v} lấy được lòng Thái hậu, Thái hậu quý ngươi bớt đi",rt:"{v} nhận việc, liếc ngươi đắc ý."}]},
 t1:{h:"Sớ lập hậu",w:"emp",t:"Một bản sớ lập hậu được dâng lên. Trong sớ có tên ngươi, có tên {v}. Hoàng thượng chưa phê.",o:[
  {n:"Nhờ Thái hậu nói giúp",c:{th:-5},o:()=>40+S.th/3,w:{danh:3},sc:1,wx:"Thái hậu lên tiếng",l:{sung:-2},lx:"Hoàng thượng không thích bị ép",rt:"Thái hậu nói với Hoàng thượng một câu.",rf:"Thái hậu bảo việc này để Hoàng thượng định."},
  {n:"Dâng một bài trần tình",c:{suc:-3},o:()=>40+S.tai/3,w:{sung:3},sc:1,wx:"ngài thấy lòng ngươi",l:{danh:-2},lx:"bị nói là tự tiến cử",rt:"Hoàng thượng đọc đi đọc lại bài trần tình.",rf:"Bài trần tình bị trả lại không phê."},
  {n:"Im lặng chờ thánh ý",c:{sung:-2},w:{duc:3},wx:"tiếng không tranh",lx:"Sủng giảm: phe kia nói nhiều hơn",rt:"Ngươi không nói một lời."}]},
 x1:{h:"Thánh ý",w:"emp",t:A=>egQueen()?"Hoàng thượng triệu ngươi và {v} cùng đến điện. Ngài hỏi: lục cung loạn đã lâu, lỗi tại ai?":"Hoàng thượng triệu ngươi đến điện, hỏi: “Nếu trẫm giao lục cung cho nàng, nàng lấy gì giữ nó yên?”",o:[
  {n:"Thưa: lấy đức mà giữ",c:{suc:-5},o:()=>35+S.duc/3+S.th/6,e:["win","mid"],rt:"Hoàng thượng gật đầu thật lâu.",rf:"Hoàng thượng nói: đức thì ai cũng tự xưng."},
  {n:"Thưa: lấy phép mà giữ",c:{suc:-5},o:()=>35+S.tamco/3+S.danh/6,e:["win","lose"],rt:"Hoàng thượng thấy ngươi cứng rắn, đủ sức trị lục cung.",rf:"Hoàng thượng lắc đầu: nàng quá cứng."},
  {n:"Thưa: thiếp không dám nhận",c:{},w:{duc:3},e:"mid",lx:"bỏ lỡ một lần thánh ý",rt:"Hoàng thượng cười: “Nàng khiêm nhường quá.”"}]}},
 E:{win:{k:1,tag:"Một bước gần ngôi Trung cung",w:"emp",t:A=>egQueen()?"Hoàng thượng phạt {v}, tuyên trước lục cung rằng Trung cung là ngươi. Từ nay không ai dám nhắc chuyện thay ngôi.":"Hoàng thượng ghi tên ngươi trong lòng. Lục cung biết: ngày bàn lập hậu, ngươi là người phải nhắc đến.",fx:{danh:5,sung:3},go:A=>{rdOan(A,"v",8);return egHauWin()}},
  mid:{k:0,tag:"Thánh ý còn để ngỏ",t:"Hoàng thượng chưa định. Ngươi giữ được chỗ đứng, nhưng ngôi Trung cung vẫn còn xa một bước.",fx:{danh:2}},
  lose:{k:-1,tag:"Người khác được thế",t:"Hoàng thượng nghiêng về {v}. Ngươi lùi một bước, nhưng đường lên ngôi Trung cung vẫn còn mở.",fx:{sung:-4,danh:-3},go:A=>{rdRel(A,"v",-6)}}}};

/* ---------- ch14 · ke14 · Mẫu nghi thiên hạ ---------- */
ARC67.ke14={o:"eg",ok:()=>nsrv67(),t:"Mẫu nghi thiên hạ",w:"emp",sj:"ngôi Đông cung",cast(A){return egMomRv(A)},
 g:()=>egHeirMine()?"Con ngươi đã là Thái tử, nhưng ngôi Đông cung là ngôi bị nhắm nhiều nhất. Giữ được con đến ngày lên ngôi, ngươi thành Hoàng thái hậu.":mySons().length?"Đưa con mình lên ngôi Đông cung: Hoàng thượng thương con, triều thần tin con, các bà mẹ khác không hại được con. Khi con lên ngôi, ngươi thành Hoàng thái hậu.":"Không có hoàng tử của riêng mình, ngươi làm mẹ của cả lục cung: con của ai cũng là con trong nhà. Mẫu nghi thiên hạ là đức, không chỉ là ngôi.",
 p:[["s1","s2","s3","s4"],["c1","c2","G.th","G.emp"],["t1"],["x1"]],
 B:{s1:{h:"Đông cung bị nhắm",w:"kid",if:()=>egHeirMine(),t:"Thái tử {k} vừa khỏi một trận sốt lạ. Thái y nói khẽ: món điểm tâm hôm ấy không do Ngự thiện phòng làm.",o:[
  {n:"Đổi hết người hầu Đông cung",c:{bac:-40,suc:-3},w:{mat:1},wx:"Đông cung kín kẽ hơn",lx:"người vô tội cũng bị đuổi",rt:"Đông cung thay người mới, toàn người ngươi chọn."},
  {n:"Lần theo món điểm tâm",c:{suc:-4},o:()=>45+S.mat*5,if:A=>!!rv67(A,"v"),w:{danh:3},sc:1,wx:"tìm ra kẻ ra tay",l:{danh:-3},lx:"đánh động mà không bắt được ai",go:(A,ok)=>{if(ok)rdOan(A,"v",10)},rt:"Dấu vết dẫn về cung {v}.",rf:"Kẻ đưa điểm tâm đã bị diệt khẩu."},
  {n:"Tâu Hoàng thượng xin thêm thị vệ",c:{sung:-2},w:{},wx:"Thái tử được canh gác",lx:"ngài nghĩ ngươi lo xa",go:()=>{S.shield=Math.max(S.shield||0,BAL.road.end.keShield)},rt:"Hoàng thượng sai thêm thị vệ canh Đông cung."}]},
 s2:{h:"Ngôi Đông cung còn ngỏ",w:"emp",if:()=>!egHeirMine()&&mySons().length>0,t:"Triều thần lại dâng sớ xin lập Thái tử. Trong sớ nhắc đến {k}, cũng nhắc đến con của {v}.",o:[
  {n:"Mời thầy giỏi dạy {k}",c:{bac:-50},w:{},wx:"con tiến bộ, Hoàng thượng để ý",lx:"tốn bạc",go:()=>e67heir(6),rt:"Thầy mới khen {k} sáng dạ."},
  {n:"Cho {k} theo Hoàng thượng đi săn",c:{suc:-3},o:()=>40+S.sung/4,sc:1,w:{danh:2},wx:"con được ngài để mắt",l:{sung:-3},lx:"con ngã ngựa thì ngươi mang tiếng",go:(A,ok)=>ok?e67heir(8):"",rt:"{k} bắn trúng một con nai, Hoàng thượng cười lớn.",rf:"{k} sợ ngựa, Hoàng thượng nhíu mày."},
  {n:"Dặn con giữ mình, chưa tranh",c:{danh:-2},w:{duc:3},wx:"con không thành bia",lx:"Hoàng thượng bớt để ý con",go:()=>{const s=son67();if(s)s.fond=cl((s.fond||0)-4,0,100)},rt:"{k} gật đầu, lặng lẽ học bài."}]},
 s3:{h:"Mẹ của lục cung",w:"th",if:()=>!mySons().length&&allKids().some(([k,v])=>v&&k.alive),t:"Mùa đông năm ấy rét đậm, mấy hoàng tự nhỏ ốm liền. Thái hậu hỏi: ai trong lục cung đứng ra lo cho bọn trẻ?",o:[
  {n:"Đứng ra lo cho các hoàng tự",c:{suc:-5,bac:-30},w:{th:5,danh:3},wx:"lục cung gọi ngươi là mẹ hiền",lx:"mệt và tốn",rt:"Bọn trẻ khỏi bệnh, mẹ chúng tạ ơn ngươi."},
  {n:"Mời thái y giỏi nhất",c:{bac:-50},w:{danh:3},wx:"việc chu toàn",lx:"tốn bạc",rt:"Thái y túc trực, không đứa nào nặng thêm."},
  {n:"Để các bà mẹ tự lo",c:{th:-4},w:{suc:3},wx:"không vướng",lx:"Thái hậu quý ngươi bớt: thấy ngươi vô tình",rt:"Ngươi chỉ gửi thuốc bổ."}]},
 s4:{h:"Cung nhân già yếu",w:"me",if:()=>!mySons().length&&!allKids().some(([k,v])=>v&&k.alive),t:"Mùa đông rét đậm. Ở Tây sở, mấy chục cung nhân già yếu không người chăm, không áo ấm. Chuyện đến tai ngươi trước tiên.",o:[
  {n:"Đứng ra lo cho họ",c:{suc:-5,bac:-30},w:{th:4,danh:3},wx:"cả cung gọi ngươi là mẹ hiền",lx:"mệt và tốn",rt:"Tây sở ấm lửa suốt mùa đông."},
  {n:"Tâu Nội vụ phủ cấp thêm",c:{suc:-2},o:()=>40+S.danh/4,w:{danh:2},sc:1,wx:"việc công lo việc công",l:{danh:-2},lx:"Nội vụ phủ chối, ngươi mất mặt",rt:"Nội vụ phủ phát thêm than củi.",rf:"Nội vụ phủ đáp: không có lệ ấy."},
  {n:"Gửi chút bạc rồi thôi",c:{bac:-10},w:{duc:1},wx:"đỡ được phần nào",lx:"tốn chút bạc, người ta chê qua loa",rt:"Bạc đến tay họ, nhưng không đủ."}]},
 c1:{h:"Bà mẹ của hoàng tử khác",w:"v",need:["v"],t:"{v} đến cung ngươi, nụ cười rất ngọt: “Bọn trẻ lớn cả rồi. Tỷ tỷ với muội nên cùng một lòng, đừng để người ngoài chia rẽ.”",o:[
  {n:"Bắt tay với {v}",c:{duc:-2},o:()=>40+S.tamco/3,w:{danh:2},sc:1,wx:"bớt một phe chống",l:{danh:-3},lx:"{v} lợi dụng ngươi",go:(A,ok)=>{rdRel(A,"v",ok?12:-6)},rt:"Hai cung từ nay qua lại.",rf:"{v} đem chuyện hai người kể với triều thần."},
  {n:"Từ chối khéo",c:{danh:-1},w:{tamco:2},wx:"không bị ràng buộc",lx:"{v} oán ngươi đề phòng",go:A=>{rdOan(A,"v",4)},rt:"Ngươi rót trà, nói chuyện hoa cỏ."},
  {n:"Dò ý nàng ta",c:{suc:-3},o:()=>45+S.mat*5,w:{mat:1},sc:1,wx:"biết {v} đang tính gì",l:{danh:-2},lx:"{v} nhận ra",rt:"{v} lỡ lời nhắc đến một nhà quyền thần.",rf:"{v} cười, không để lộ gì."}]},
 c2:{h:"Năm mất mùa",w:"emp",t:"Phương nam mất mùa, dân đói kéo về kinh. Hoàng thượng muốn hậu cung làm gương tiết kiệm.",o:[
  {n:"Cắt bớt bổng lộc cung mình",c:{bac:-60},w:{danh:5,duc:3},wx:"dân và triều khen ngươi",lx:"cung ngươi thiếu thốn một mùa",rt:"Tiếng ngươi ra tận ngoài kinh."},
  {n:"Dẫn lục cung may áo bông cho dân",c:{suc:-5},o:()=>40+S.danh/4,w:{danh:4},sc:1,wx:"lục cung theo ngươi",l:{danh:-2},lx:"phi tần khác than mệt",rt:"Ba nghìn áo bông đưa ra khỏi cung.",rf:"Việc làm nửa chừng thì bỏ."},
  {n:"Giữ lệ cũ",c:{sung:-2},w:{bac:20},wx:"giữ bổng lộc",lx:"Hoàng thượng thấy ngươi không chia lo",rt:"Cung ngươi vẫn như cũ."}]},
 t1:{h:"Lời dạy cho con",w:"kid",t:A=>mySons().length?"Đêm khuya, {k} hỏi ngươi: “Mẫu thân, làm vua thì phải giỏi nhất, hay phải hiền nhất?”":"Một hoàng tự nhỏ ngươi từng trông nom hỏi: “Nương nương, sao người lại thương cả con của người khác?”",o:[
  {n:"Dạy: phải biết người",c:{suc:-2},w:{tamco:2},wx:"đứa trẻ khôn hơn",lx:"lời ấy đến tai người khác thì thành mưu",go:()=>mySons().length?e67heir(4):"",rt:"Đứa trẻ nhớ lời ngươi."},
  {n:"Dạy: phải thương dân",c:{suc:-2},w:{duc:3},wx:"lời hay truyền ra ngoài",lx:"có kẻ cho là mềm yếu",go:()=>mySons().length?e67heir(4):"",rt:"Thầy dạy nghe lại, chép vào sách."},
  {n:"Bảo nó tự nghĩ",c:{suc:-1},w:{danh:1},wx:"đứa trẻ tự lập",lx:"thức khuya, mất sức",rt:"Đứa trẻ ngồi nghĩ rất lâu."}]},
 x1:{h:"Đại lễ đầu xuân",w:"emp",t:"Đại lễ đầu xuân. Hoàng thượng đứng trước Thái miếu, các hoàng tự đứng sau. Ai đứng gần ngài nhất, cả triều sẽ nhìn.",o:[
  {n:"Lo trọn lễ, không tranh chỗ",c:{suc:-5},o:()=>35+S.duc/3+S.danh/6,e:["win","mid"],rt:"Hoàng thượng thấy ngươi đứng đúng chỗ của bậc mẫu nghi.",rf:"Lễ trọn, nhưng không ai nhắc tên ngươi."},
  {n:"Đưa con đứng gần Hoàng thượng",c:{suc:-5},o:()=>35+S.sung/3+S.tamco/6,e:["win","lose"],need:["kid"],rt:"Hoàng thượng đặt tay lên vai {k}.",rf:"Triều thần xì xào ngươi tranh ngôi cho con."},
  {n:"Lùi lại, nhường bậc",c:{},w:{duc:3},e:"mid",lx:"bỏ lỡ dịp",rt:"Ngươi lùi sau một bước."}]}},
 E:{win:{k:1,tag:"Mẫu nghi thiên hạ",w:"emp",t:()=>mySons().length?"Cả triều nhìn mẹ con ngươi. Con ngươi đứng gần ngôi Đông cung hơn ai hết; ngày ngươi thành Hoàng thái hậu chỉ còn chờ trời định.":"Lục cung gọi ngươi là mẹ. Không có hoàng tử của riêng mình, ngươi vẫn là bậc mẫu nghi mà ai cũng phục.",fx:{danh:6,th:4},go:A=>egKeWin()},
  mid:{k:0,tag:"Lục cung nể đức",t:"Lễ trọn, lòng người yên. Ngôi Đông cung vẫn để Hoàng thượng định, nhưng tên ngươi được nhắc với lòng kính trọng.",fx:{danh:3,duc:2},go:()=>mySons().length?e67heir(BAL.road.end.keHeir>>1):""},
  lose:{k:-1,tag:"Bị cho là tranh ngôi",t:"Triều thần cho là ngươi tranh ngôi cho con. Hoàng thượng lạnh nhạt một mùa; đường của con ngươi vẫn còn, nhưng dài hơn.",fx:{sung:-5,danh:-4},go:A=>{const s=son67();if(s)s.fond=cl((s.fond||0)-BAL.road.end.keHeir,0,100);return s?`Hoàng thượng bớt thương ${s.name}.`:""}}}};
try{Object.assign(RTHEME67,{noi14:"med",hau14:"court",ke14:"emp"})}catch(e){}

/* ---- frame (new lives only) ---- */
(function(){if(typeof a67init!=="function")return;const i0=a67init;a67init=function(){const r=i0.apply(this,arguments);
 try{if(!f14())return r;S.st.f14.eg=1;const P=S.st.ch.plan;for(let i=0;i<P.length;i++){if(P[i]==="ms:hau")P[i]="st:"+EG14.hau;else if(P[i]==="ms:ke")P[i]="st:"+EG14.ke}}catch(e){console.error(e)}return r}})();
/* chapter 12 by her state when it opens: still a maid → «Từ kẻ hầu thành tiểu chủ»; a son → st_dong; a child → st_con; none → noi14 */
function eg12(){try{if(typeof isSrv67==="function"&&isSrv67())return"ms:len14";for(const id of ["st_dong","st_con",EG14.noi])if(ARC67[id]&&arcOk67(ARC67[id]))return"st:"+id}catch(e){console.error(e)}return"end:12"}
(function(){const a0=chAdvance67;chAdvance67=function(E){try{if(egOn()){const c=S.st.ch,P=c.plan;let j=c.i+1;while(j<P.length&&(P[j]==="fin"||P[j]==="s"))j++;
  if(P[j]==="end:12")P[j]=eg12()}}catch(e){console.error(e)}return a0.apply(this,arguments)}})();
window.eg12=eg12;
