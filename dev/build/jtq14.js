/* ================= jtq14: TUTORIAL QUESTS of chapters 1–3 (14-chapter frame, phase 2 of dev/STORY_ROADS_PLAN.md; ROAD_MAP Part 1) =================
   Owner rules: OD:L1233 (each tutorial quest makes her DO the task; the reward comes only when it is done), OD:L1242 (chapters 1–3 = tutorial,
   no skip-with-reward), OD:L1259 (the tutorial is PART OF THE STORY: every task is told as a beat of her first months in the palace),
   OD:L1432 (the narrator of a frame without its own person = the named palace official whose office covers the topic: Giáo tập ma ma for a
   new consort, Quản sự ma ma for a new palace maid; map in BAL.st14.q.narr, one core).
   - A tutorial chapter (jst14 nhap14 / sung14 / tap14) started on this build carries S.st.ms.q14 = {v, L:[{id,n}]}: the quests of its variant
     (v "c" consort, "s" cung nữ who still serves, read when the chapter opens). Each quest counts a REAL deed the player does herself (hooks
     below on the game's own functions: an act card, a place visit, wearing, selling, buying, a lesson, a deed to a consort / a colleague).
   - Quests are steps of the chapter (flag "q"): the chapter is done only when its milestone (jst14) AND every quest are done; the chapter
     reward (j67 reward67, BAL.st14.rw / danh) comes then. Each quest pays its own small reward the moment it is done (BAL.st14.q.bac).
     Time runs out first → the chapter closes «Lỡ dịp» with no chapter reward (jst14), quests not done pay nothing.
   - If she is raised from maid to Đáp ứng while maid quests are open, those quests lapse (not required, no reward): a consort cannot do them.
   - Displays: the chapter-open card (kit panel, narrator as the person), the quest-done card (same kit panel), the steps in the chapter detail
     / Mệnh truyện tab (kitChecks, unchanged), "Việc nên làm" with "Đi làm" (jgoal todo). No new kit part.
   SAVES: a chapter started before this build has no q14: nothing here touches it. Co-op: every player's own life (S); nothing is shared.
   Bots (window.__bot / quiet) count deeds the same way; only the cards are skipped (card67 rule). */
(function(){try{
const QB=()=>BAL.st14.q;
/* she still serves: the cung nữ start before she is raised (jst14 f14Srv: true from the first moment of the life, before j42 fills S.srv) */
const srvNow=()=>{try{if(S&&S.origin&&S.origin.k==="cnv")return !(S.srv&&S.srv.risen);return typeof isSrv==="function"&&isSrv()}catch(e){return false}};
const esc=s=>String(s==null?"":s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
const nv=n=>typeof kitNumVi==="function"?kitNumVi(n):String(n);
const lc=s=>String(s).charAt(0).toLowerCase()+String(s).slice(1);
/* how the narrator speaks to her (VANPHONG §2): a maid is "ngươi" and the ma ma says "ta"; a consort below Tần "tiểu chủ", Tần and up "nương nương" */
function X(cap){/* ONE address core (jvoice kAddr, VANPHONG §2): the narrator calls a maid "ngươi"; a consort is called as her own servant calls her (tiểu chủ / nương nương / Hoàng hậu nương nương) */let w;try{w=srvNow()?kAddr(null,{srv:"f"},{name:"ngươi"}).goi:kAddr({srv:"f"},S,{m:"cool"}).goi}catch(e){w=srvNow()?"ngươi":"tiểu chủ"}return cap?w.charAt(0).toUpperCase()+w.slice(1):w}
function ME(){/* the narrator's self word: the ma ma says "ta" to a maid (kAddr, no speaker); a consort's maid says "nô tỳ" */try{return srvNow()?kAddr(null,{srv:"f"},{name:"ngươi"}).xung:kAddr({srv:"f"},S,{m:"cool"}).xung}catch(e){return srvNow()?"ta":"nô tỳ"}}
function say(s){return String(s).replace(/\{X\}/g,X(true)).replace(/\{x\}/g,X(false)).replace(/\{m\}/g,ME())}
/* ---------- the quests: [variant][chapter] → list; need = how many times (BAL.st14.q.need[id] or 1) ---------- */
const A=re=>d=>!!(d&&re.test(String(d.n||"")));
const TQ={
 c:{
  nhap14:[
   {id:"an",ev:"act",m:A(/^Thỉnh an/),t:"Thỉnh an Thái hậu hoặc Hoàng hậu",tab:"act",act:/Thỉnh an (Thái hậu|Hoàng hậu)/,card:"Thỉnh an",
    why:"Người mới vào cung, việc đầu tiên là ra mắt bề trên; lễ đủ thì không ai bắt bẻ được.",ok:"“Lễ ra mắt đã đủ. Từ nay bề trên đã biết mặt {x}.”"},
   {id:"di",ev:"go",m:d=>!!d&&d.k!=="home",t:"Đi một nơi trong cung",tab:"go",
    why:"Biết lối đi lối về, khỏi lạc bước vào chỗ cấm.",ok:"“{X} đã biết đường. Chỗ nào được đến, chỗ nào phải tránh, xin nhớ cho kỹ.”"},
   {id:"trang",ev:"wear",t:"Thay y phục hay trang sức trong Tư trang",tab:"inv",
    why:"Áo xiêm chỉnh tề, hợp phẩm cấp, kẻo bị chê thất lễ ngay buổi đầu.",ok:"“Ăn vận như vậy là phải phép, không ai chê được.”"}],
  sung14:[
   {id:"ban",ev:"sell",t:"Bán đồ trong rương riêng",tab:"inv",
    why:"Muốn được để mắt phải có bạc lo quà cáp, lễ lạt. Rương mang theo từ nhà, món nào không dùng thì đổi lấy bạc.",ok:"“Bạc trong tay rồi, việc gì cũng dễ lo hơn.”"},
   {id:"diem",ev:"act",m:A(/^(Điểm trang|Dưỡng nhan)/),t:"Điểm trang hoặc Dưỡng nhan",tab:"act",act:/Điểm trang|Dưỡng nhan/,card:"Điểm trang, Dưỡng nhan",
    why:"Dung nhan là thứ Hoàng thượng thấy trước tiên.",ok:"“Dung nhan như thế, gặp ngự giá ắt được ngoái nhìn.”"},
   {id:"mua",ev:"buy",t:"Nhờ thái giám Nội vụ phủ mua một món",tab:"go",tl:"Dư đồ › Nội vụ phủ",
    why:"Biết chỗ sắm sửa, khi cần lễ vật dâng lên khỏi lúng túng.",ok:"“Đã biết đường mua sắm. Đồ tốt phải để dành lúc cần.”"}],
  tap14:[
   {id:"giao",ev:"rel",t:"Làm một việc với một phi tần trong Hậu cung",tab:"court",tl:"Hậu cung › Phi tần",
    why:"Thăm hỏi, tặng quà, trò chuyện: có qua có lại mới thành chị em, một mình thì khó đứng.",ok:"“Có người qua lại rồi. Trong cung, thêm một người quen là thêm một lối thoát.”"},
   {id:"hoc",ev:"art",t:"Học một buổi ở mục Tài nghệ",tab:"art",
    why:"Một môn sở trường là chỗ dựa lâu dài, yến tiệc thi tài đều cần đến.",ok:"“Chăm như vậy, ngày sau ắt có lúc trổ tài.”"},
   {id:"cn",ev:"act",m:A(/^Trò chuyện với cung nữ/),t:"Trò chuyện với cung nữ thân cận",tab:"act",act:/Trò chuyện với cung nữ/,card:"Trò chuyện với cung nữ",
    why:"Cung nữ thân cận là tai mắt, là người giữ lưng cho {x}.",ok:"“Người hầu có lòng thì chủ mới yên. {X} nhớ giữ lấy nàng.”"}]},
 s:{
  nhap14:[
   {id:"hau",ev:"act",m:A(/^(Quét sân|Dâng trà|Theo hầu chủ|Lĩnh đồ|Việc chủ sai)/),t:"Làm một việc hầu hạ",tab:"act",act:/Quét sân|Dâng trà|Theo hầu chủ|Lĩnh đồ/,card:"Quét sân, Dâng trà",
    why:"Kẻ hầu mới vào, chủ nhìn vào việc tay chân trước tiên.",ok:"“Làm được việc thì chủ mới nhớ tên. Cứ thế mà giữ.”"},
   {id:"le",ev:"act",m:A(/^Học lễ nghi/),t:"Học lễ nghi với cô cô",tab:"act",act:/Học lễ nghi/,card:"Học lễ nghi với cô cô",
    why:"Một bước sai lễ là một trận đòn. Học cho thuộc, đứng cho đúng chỗ.",ok:"“Thưa gửi, quỳ đứng đã có nề nếp. Thế là khỏi bị phạt oan.”"},
   {id:"di",ev:"go",m:d=>!!d&&d.k!=="home",t:"Đi một nơi trong cung",tab:"go",
    why:"Chủ sai đi đâu thì phải biết đường, chậm chân là bị mắng.",ok:"“Đã quen lối đi. Chỗ nào cấm thì đừng bén mảng.”"}],
  sung14:[
   {id:"chai",ev:"act",m:A(/^Chải chuốt/),t:"Chải chuốt, giữ nhan sắc",tab:"act",act:/Chải chuốt/,card:"Chải chuốt, giữ nhan sắc",
    why:"Kẻ hầu cũng có ngày lọt vào mắt rồng; mặt mũi lem luốc thì ai nhìn.",ok:"“Gọn gàng sạch sẽ, đứng hầu cũng sáng cả góc điện.”"},
   {id:"vuon",ev:"go",m:d=>!!d&&d.k==="vuon",t:"Đến Ngự hoa viên",tab:"go",tl:"Dư đồ › Ngự hoa viên",
    why:"Xuân thu Hoàng thượng hay dạo bước ở đó; đi qua đúng lúc là có duyên.",ok:"“Đã biết chỗ ngự giá hay qua. Duyên đến hay không là ở trời.”"},
   {id:"theu",ev:"act",m:A(/^Thêu khăn/),t:"Thêu khăn bán ra ngoài",tab:"act",act:/Thêu khăn/,card:"Thêu khăn bán ra ngoài",
    why:"Kẻ hầu cũng cần chút bạc riêng phòng thân, lúc cần lo lót.",ok:"“Có đồng bạc riêng rồi, lúc túng khỏi phải ngửa tay.”"}],
  tap14:[
   {id:"chat",ev:"cnv",m:d=>!!d&&d.k==="chat",t:"Trò chuyện với một đồng liêu",tab:"staff",
    why:"Đồng liêu nâng nhau thì sống, dìm nhau thì chết. Kết lấy một người.",ok:"“Có người nói chuyện được rồi. Đừng tin ai trọn lòng, nhưng phải có người.”"},
   {id:"bieu",ev:"cnv",m:d=>!!d&&d.k==="gift",t:"Biếu quà một đồng liêu",tab:"staff",
    why:"Một món quà nhỏ đổi được một lời nói đỡ lúc ngặt.",ok:"“Quà nhỏ mà lòng người thì nhớ lâu.”"},
   {id:"luyen",ev:"act",m:A(/^Luyện thêu/),t:"Luyện thêu thùa, chữ nghĩa",tab:"act",act:/Luyện thêu/,card:"Luyện thêu thùa, chữ nghĩa",
    why:"Có nghề trong tay, chủ mới giao việc lớn.",ok:"“Tay nghề lên rồi. Người có nghề không lo bị bỏ.”"}]}};
/* the chapter-open lines of the narrator (OD:L1259: the tasks are her story, not a feature tour) */
const INTRO={
 c:{nhap14:"{N} dẫn {x} về cung mới, cúi đầu thưa: “Vào cung rồi, mỗi bước đều có người nhìn. Ra mắt bề trên, biết lối đi, ăn vận phải phép: {x} làm trọn mấy việc đầu này, {m} mới yên lòng.”",
  sung14:"{N} ghé lại, hạ giọng: “Hoàng thượng còn chưa nhớ đến {x}. Muốn được để mắt phải có dung nhan, có chút bạc lo việc, biết chỗ sắm sửa. Đồ trong rương món nào không dùng, cứ đổi lấy bạc.”",
  tap14:"{N} dặn: “Được để mắt rồi thì người ghen cũng nhiều. Trong cung một mình thì khó đứng: phải có chị em, có nghề trong tay, có người hầu tin cẩn.”"},
 s:{nhap14:"{N} ghi tên ngươi vào sổ cung nữ, nghiêm giọng: “Đã vào làm kẻ hầu thì phải biết việc, biết lễ, biết đường. Mấy việc này làm trước, sai một là bị phạt.”",
  sung14:"{N} liếc nhìn ngươi: “Kẻ hầu cũng có ngày được Hoàng thượng để mắt, nhưng phải tự lo cho mình: mặt mũi gọn gàng, biết chỗ ngự giá hay qua, có chút bạc riêng.”",
  tap14:"{N} dặn: “Ở lâu trong cung mới biết, kẻ hầu sống nhờ đồng liêu. Kết lấy người, biếu chút quà, luyện tay nghề, thì mới có chỗ đứng.”"}};
/* per-origin beat (OD:L1259 STORY FIRST, STORY_ROADS_PLAN phase 2): why THIS girl does the same quests, told from HER origin (one line per origin
   × chapter) and, in chapter 1, from her rolled road's own subject (ARC67[S.st.f14.road].sj: every road has one; a road whose subject still
   holds a {placeholder} filled only when the road starts tells that person unnamed, SJ0 below). Only words: deeds, rewards and numbers stay the quests' own (one core).
   {X}/{x} = how she is addressed (say()). */
const BEAT={
 tt:{nhap14:"Cha {x} là Tể tướng, đưa {x} vào cung để có người của phủ bên long sàng. Việc đầu là ra mắt bề trên cho đủ lễ, thay y phục cho xứng danh phủ Tể tướng.",
  sung14:"Phủ Tể tướng gửi thư hỏi {x} đã được ngự giá nhớ mặt chưa. Đổi bớt đồ trong rương lấy bạc, điểm trang chỉnh tề, nhờ thái giám Nội vụ phủ mua giúp một món để dâng lên.",
  tap14:"Người trong phủ dặn: một mình thì khó đứng, phải có chị em và một nghề trong tay. Kết một phi tần, học thêm một buổi tài nghệ, thân cận với cung nữ."},
 dtq:{nhap14:"Cha {x} nắm binh quyền ngoài biên ải, trong cung ai cũng dè chừng. Ra mắt bề trên cho đủ lễ, biết lối đi lối về, ăn vận không để ai chê nhà võ thô lỗ.",
  sung14:"Nhà võ chỉ biết giữ nước, ít biết lo quà cáp chốn cung đình. Bán bớt đồ trong rương lấy bạc, điểm trang cho tươm tất, nhờ thái giám Nội vụ phủ mua giúp một món.",
  tap14:"Cha ở xa, trong cung {x} chỉ có một mình. Phải có chị em qua lại, một nghề trong tay, một cung nữ biết giữ lời."},
 ch:{nhap14:"Thái hậu là cô mẫu, nhưng vào cung rồi {x} vẫn phải tự đứng vững. Ra mắt Thái hậu và Hoàng hậu cho đủ lễ, biết lối đi, ăn vận cho xứng cháu ngoại tộc của Thái hậu.",
  sung14:"Có Thái hậu chống lưng nhưng muốn được ngự giá nhớ vẫn phải tự lo. Đổi đồ trong rương lấy bạc, điểm trang, nhờ thái giám Nội vụ phủ mua một món dâng lên.",
  tap14:"Thái hậu dặn: đừng chỉ dựa vào cô mẫu. Kết chị em trong Hậu cung, học một môn tài nghệ, giữ cung nữ thân cận cho chắc."},
 muoi:{nhap14:"Bổng lộc còn thiếu, mà buổi họp mặt đầu đã có kẻ chê áo xiêm của nhà buôn muối. Ra mắt bề trên, thay y phục cho phải phép để khỏi ai cười.",
  sung14:"Nhà buôn biết giá từng món. Muốn lo quà cáp thì cần bạc: bán đồ trong rương, nhờ thái giám Nội vụ phủ mua giúp một món, người ấy về sau còn dùng đến. Bạc tiêu đi, tháng sau sẽ tiếc.",
  tap14:"Không có thân thế đỡ lưng, {x} chỉ có tay nghề và tính toán. Kết một phi tần, học thêm một buổi tài nghệ, giữ thiện cảm của cung nữ."},
 thd:{nhap14:"Nhà nghèo, chữ nghĩa là của hồi môn duy nhất. Ra mắt bề trên cho đủ lễ, thay y phục chỉnh tề, kẻo bị cười là nữ nhi nhà nghèo vào cung.",
  sung14:"Một nữ nhân nhà nho khó có bạc dư. Bán bớt đồ trong rương, điểm trang tươm tất, nhờ thái giám Nội vụ phủ mua giúp một món cần dùng.",
  tap14:"Chữ nghĩa chỉ có giá khi có người đọc. Kết một phi tần, học thêm tài nghệ, giữ cung nữ thân cận."},
 td:{nhap14:"Người quản gia cũ của nhà gửi lời từ ngoài cung, nhắn {x} dò xem ai gác cửa hông. Ra mắt bề trên cho đủ lễ, rồi đi một vòng xem nơi nào ra vào được.",
  sung14:"Muốn lần ra manh mối thì cần bạc mua tin và dung nhan để ngự giá nhớ mặt. Bán đồ trong rương, điểm trang, nhờ thái giám Nội vụ phủ mua giúp một món. Kẻ gác cổng cũng sẽ nhớ mặt {x}.",
  tap14:"Một người trong Hậu cung nói được lời đỡ, một nghề trong tay giữ được thể diện. Một mình {x} không lần ra được."},
 nc:{nhap14:"Lễ bộ muốn thấy {x} giữ đúng quy củ cung đình. Thỉnh an cho đủ lễ, biết lối đi lối về; sứ thần theo hầu sẽ khó chịu nếu {x} cúi đầu quá thấp.",
  sung14:"Thái hậu đã để mắt sơ qua, nhưng muốn được ngự giá nhớ thì phải có bạc lo việc và dung nhan chỉnh tề. Bán đồ mang theo, nhờ thái giám Nội vụ phủ mua giúp một món.",
  tap14:"Xứ lạ thì cần người quen. Kết chị em trong Hậu cung, học một môn tài nghệ, giữ cung nữ biết tiếng của {x}."},
 bd:{nhap14:"Khả hãn gửi {x} sang làm người hòa thân, Lễ bộ nhìn xem có giữ quy củ không. Ra mắt bề trên cho đủ lễ, thay y phục theo phép cung đình, đừng để ai bảo người thảo nguyên thô lỗ.",
  sung14:"Mang theo của hồi môn từ thảo nguyên, món nào không dùng thì đổi bạc. Điểm trang, nhờ thái giám Nội vụ phủ mua giúp một món để lo cho ngự giá.",
  tap14:"Xa quê thì phải có người quen. Kết chị em trong Hậu cung, học một môn tài nghệ, giữ cung nữ thân cận."},
 cn:{nhap14:"Nay đã là chủ tử, nhưng vài cung nữ cũ vẫn nhớ {x} từng bưng trà. Ra mắt bề trên cho đủ lễ, thay y phục cho đúng phẩm cấp, để không ai bảo {x} chưa quen vị trí.",
  sung14:"Không có nhà sau lưng nên mọi thứ phải tự lo. Bán đồ trong rương, điểm trang, nhờ thái giám Nội vụ phủ mua giúp một món; vài kẻ đồng liêu cũ sẽ nhìn xem {x} chi tiêu ra sao.",
  tap14:"Người cũ biết rõ {x}, người mới còn dò xét. Kết một phi tần, học thêm tài nghệ, thân cận với cung nữ."},
 cnv:{nhap14:"Ngươi mới vào làm kẻ hầu, chủ nhân nhìn việc tay chân trước tiên. Làm xong mấy việc hầu hạ, học lễ nghi, biết lối đi lối về thì khỏi bị mắng oan.",
  sung14:"Chủ nhân cần một món quà dâng lên bậc trên; ngươi chải chuốt, thêu khăn cho khéo, đi qua Ngự hoa viên lúc ngự giá hay dạo. Việc này làm tốt sẽ được tin cậy, nhưng kẻ bị giành mất cơ hội sẽ oán ngươi.",
  tap14:"Đồng liêu nâng nhau thì sống, dìm nhau thì chết. Nói chuyện, biếu quà một người, luyện thêu thùa cho giỏi."}};
/* bang-words review (E40r, law 6b / 11): BEAT.bd above is the Bắc Địch (old-premise) line; a NEW bd life is the Ba Tư princess
   (owner OD 19/11) and reads the Ba Tư line through THE one switch bdTxtProp (jrd_bd.js). Phù Tang (pf) has its own row. */
if(typeof bdTxtProp==="function"){const B=BEAT.bd;
 bdTxtProp(B,"nhap14",B.nhap14,"Phụ vương gửi {x} sang cầu Đại Hy làm đồng minh, Lễ bộ nhìn xem người Ba Tư có giữ quy củ không. Ra mắt bề trên cho đủ lễ, thay y phục theo phép cung đình, đừng để ai bảo người phương tây thô lỗ.");
 bdTxtProp(B,"sung14",B.sung14,"Mang theo của hồi môn từ Ba Tư, tấm thảm hay chuỗi ngọc nào không dùng thì đổi bạc. Điểm trang, nhờ thái giám Nội vụ phủ mua giúp một món để lo cho ngự giá.")}
BEAT.pf={nhap14:"Thuyền sứ đoàn đưa {x} qua bể sang Đại Hy, Lễ bộ nhìn xem người Phù Tang có giữ quy củ không. Ra mắt bề trên cho đủ lễ, thay y phục theo phép cung đình, đừng để ai cười là người bên kia bể.",
 sung14:"Mang theo của hồi môn từ Phù Tang, món nào không dùng thì đổi bạc. Điểm trang, nhờ thái giám Nội vụ phủ mua giúp một món để lo cho ngự giá.",
 tap14:"Xa quê thì phải có người quen. Kết chị em trong Hậu cung, học một môn tài nghệ, giữ cung nữ thân cận."};
/* a road's person is cast only when the road starts (j67 newThread67 fill67), so a {v}/{foe}/{mis} subject is told without a name: the
   person stays unnamed here and is named by the road itself (law 6b: nobody is made up); any other {tag} → no road line */
const SJ0={v:"một phi tần",foe:"một phi tần",mis:"chủ nhân"};
function roadSj(){try{const id=S.st.f14&&S.st.f14.road,a=id&&typeof ARC67!=="undefined"&&ARC67[id];if(!a)return "";
 const sj=String(a.sj||"").replace(/\{(v|foe|mis)\}/g,(m,k)=>SJ0[k]);if(!sj||/\{[^}]*\}/.test(sj))return "";return sj.replace(/\bngươi\b/g,"{x}")}catch(e){return ""}}
function beatLine(m){try{const o=S.origin&&S.origin.k,t=BEAT[o]&&BEAT[o][m.id];if(!t)return "";
 let r=say(t);if(m.id==="nhap14"){const sj=roadSj();if(sj)r+=" "+say("Điều {x} canh cánh trong lòng là "+sj+".")}return r}catch(e){return ""}}
window.tq14Beat=beatLine;window.tq14Say=say;window.tq14Intro=m=>introCard(m);
function variant(){return srvNow()?"s":"c"}
function defOf(v,ch,id){return ((TQ[v]||{})[ch]||[]).find(q=>q.id===id)||null}
function need(id){const N=QB().need||{};return N[id]||1}
function active(){try{if(typeof f14!=="function"||!f14()||!S||S.dead)return null;const m=S.st.ms;if(!m||!m.q14||!F14T.test(m.id))return null;if(typeof f14Home==="function"&&f14Home())return null;return m}catch(e){return null}}
/* ---------- the narrator (OD:L1432): the named palace official of this topic, a real NPC with her face ---------- */
function narr(){try{const id=(QB().narr||{})[variant()]||"gt";if(typeof elderBy==="function"){let st=elderBy(id);if(!st&&typeof elderInit==="function"){elderInit();st=elderBy(id)}
  if(st){const f=typeof staffFace==="function"?staffFace(st):null;return{name:st.call,office:typeof elderOffice==="function"?elderOffice(st):"",face:f}}}
 const g=typeof staffGuide==="function"?staffGuide():null;if(g)return{name:g.name,office:g.office,face:g.face}}catch(e){}return{name:"Ma ma",office:"",face:null}}
function lapse(m){/* raised while maid quests are open: they cannot be done any more */try{if(m.q14.v==="s"&&!srvNow())for(const q of m.q14.L)if(!q.ok)q.x=1}catch(e){}}
/* steps shown for a quest chapter: [label, done, "q"] (a lapsed quest counts as done for the chapter, says so, pays nothing) */
function qSteps(m){if(!m||!m.q14)return[];lapse(m);return m.q14.L.map(q=>{const d=defOf(m.q14.v,m.id,q.id);if(!d)return null;const N=need(q.id);
 return[`${d.t}${N>1?` (${Math.min(q.n,N)}/${N})`:""}${q.x?" · không còn hợp thân phận mới":""}`,!!(q.ok||q.x),"q"]}).filter(Boolean)}
window.tq14Steps=qSteps;
/* the quest list in the two cards: kit §46 kitChecks (✓/✗ chip + text, the same part as the chapter detail's steps) */
function qChecks(m){const L=qSteps(m).map(x=>[x[1],esc(x[0])]);return typeof kitChecks==="function"?kitChecks(L.filter(x=>!x[0]).concat(L.filter(x=>x[0]))):""}
/* "Việc nên làm" with "Đi làm" (jgoal nextSteps reads C.todo) */
function todo(m){if(!m||!m.q14)return null;const L=[];for(const q of m.q14.L){if(q.ok||q.x)continue;const d=defOf(m.q14.v,m.id,q.id);if(!d)continue;
  L.push({t:d.t,why:say(d.why)+hint(q.id),tab:d.tab,act:d.act,card:d.card,tl:d.tl})}return L.length?L:null}
/* nothing in the chest for this quest: say where to get one (the Nội vụ phủ shop button is in Tư trang) */
function hint(id){try{const inv=S.inv||[];
 if(id==="trang"&&!inv.some(e=>e&&!e.h&&((typeof wdItem==="function"&&wdItem(e))||(IT[e.k]&&itm(e.k).sl))))return " Rương chưa có món nào để thay: nhờ thái giám mua một món rồi mặc vào.";
 if(id==="ban"&&typeof econSellable==="function"&&!econSellable(S).some(x=>x&&!x.no))return " Rương chưa còn món nào bán được: nhờ thái giám mua một món, hoặc chờ đồ được ban thưởng.";
}catch(e){}return ""}
window.tq14Todo=todo;
/* ---------- the chapter: steps, goal text, done rule ---------- */
for(const id of ["nhap14","sung14","tap14"]){const d=MS67[id];if(!d)continue;
 const s0=d.steps;d.steps=function(m){const st=s0.apply(this,arguments);if(!m||!m.q14)return st;const T=st.filter(x=>x[2]==="t"),R=st.filter(x=>!x[2]);
  /* a chapter whose milestone is "one of these" (any) shows it as ONE line, so every line left must be done */
  const M=d.any&&R.length>1?[[R.map((x,i)=>i?lc(x[0]):x[0]).join(" · hoặc "),R.some(x=>x[1])]]:R;return M.concat(qSteps(m),T)};
 const g0=d.g;d.g=function(){const g=g0.apply(this,arguments);try{const m=S.st.ms;if(m&&m.id===id&&m.q14){const n=narr();return `${g} Phải làm đủ ${nv(m.q14.L.length)} việc ${n.name} dặn thì chương mới tính là xong.`}}catch(e){}return g}}
(function(){const d0=msDone67;msDone67=function(m){if(m&&m.q14&&MS67[m.id]){const st=MS67[m.id].steps(m);return st.filter(x=>x[2]!=="t").every(x=>x[1])||st.some(x=>x[2]==="t"&&x[1])}return d0.apply(this,arguments)}})();
window.tq14Real=function(m,st){/* jst14 «Lỡ dịp» rule: did she really finish (milestone + every quest)? */return st.filter(x=>x[2]!=="t").every(x=>x[1])};
/* the chapter opens: quests given, the narrator tells the beat (one kit card instead of the plain chapter card) */
function init(m){const v=variant();const L=((TQ[v]||{})[m.id]||[]).map(q=>({id:q.id,n:0}));if(L.length)m.q14={v,L}}
function introCard(m){if(quiet||window.__bot||typeof kitPanel!=="function")return;const c=S.st.ch,d=MS67[m.id],n=narr();
 const rows=[["Lời dặn",say(INTRO[m.q14.v][m.id]).replace("{N}",esc(n.name)+(n.office?`, ${esc(n.office)},`:""))],...(beatLine(m)?[["Duyên cớ",beatLine(m)]]:[]),["Mục tiêu",d.g()],
  ["Phần thưởng",`mỗi việc xong: Bạc +${QB().bac[m.q14.v]}; đủ việc và đạt mục tiêu: phần thưởng của chương`],msHan67(m,1)];
 kitPanel({kind:"info",title:`Chương ${c.n}: ${d.t()}`,sub:`${n.name} dặn`,sections:[{h:"",rows:rows.slice(0,rows.length-2).map(r=>[r[0],r[1],r[2]||""])},
  {h:"Việc phải làm",html:qChecks(m)},{h:"",rows:rows.slice(rows.length-2).map(r=>[r[0],r[1],r[2]||""])}],subject:n.face||null,btn:"Đã hiểu"})}
(function(){const m0=msStart67;msStart67=function(id){if(!(typeof f14==="function"&&f14()&&F14T.test(id)))return m0.apply(this,arguments);
 /* the same steps as j67 msStart67, with the quests set before anything is shown */
 const c=S.st.ch;c.n++;S.st.ms={id,r0:S.rank,t0:S.turn};S.st.M=null;const d=MS67[id];init(S.st.ms);
 if(!S.st.ms.q14){c.n--;S.st.ms=null;return m0.apply(this,arguments)}
 log(`<b>Chương ${c.n}: ${d.t()}.</b> ${d.g()}`);introCard(S.st.ms);syncMain67()}})();
/* ---------- a deed is done ---------- */
function doneCard(m,d,b){if(quiet||window.__bot||typeof kitPanel!=="function")return;const n=narr(),c=S.st.ch,ch=MS67[m.id];
 const left=m.q14.L.filter(q=>!q.ok&&!q.x).length;
 const rows=[["Lời dặn",`${esc(n.name)}: ${say(d.ok)}`],["Phần thưởng",`Bạc +${b}`,"g"]].concat(left?[]:[["Còn lại","Đủ việc ma ma dặn. Đạt mục tiêu của chương thì chương xong, có thưởng."]]);
 kitPanel({kind:"result",title:`Xong việc: ${d.t}`,sub:`Chương ${c.n} · ${ch.t()}`,sections:[{h:"",rows:rows.map(r=>[r[0],r[1],r[2]||""])},{h:"Việc ma ma dặn",html:qChecks(m)}],subject:n.face||null,btn:"Đã hiểu"})}
function note(ev,det){const m=active();if(!m)return;lapse(m);let hit=0;
 for(const q of m.q14.L){if(q.ok||q.x)continue;const d=defOf(m.q14.v,m.id,q.id);if(!d||d.ev!==ev||(d.m&&!d.m(det)))continue;
  q.n++;hit=1;if(q.n>=need(q.id)){q.ok=1;const b=QB().bac[m.q14.v]||0;try{apply({bac:b})}catch(e){S.bac=(S.bac||0)+b}
   log(`<b class="g">Xong việc «${d.t}».</b> ${esc(narr().name)} dặn thêm: ${say(d.ok)} Bạc +${b}.`);doneCard(m,d,b)}}
 if(hit)try{if(typeof syncMain67==="function")syncMain67()}catch(e){}}
window.tq14Note=note;
/* ---------- hooks on the game's own functions (every path of each kind, LUẬT SỬA CẢ NHÓM) ---------- */
/* every hooked name is a global function declaration (a window property in this classic script), so window[name]= rebinds it for every caller */
const W=(name,fn)=>{try{const o=window[name];if(typeof o==="function")window[name]=fn(o)}catch(e){console.error("tq14 hook",name,e)}};
const acts=()=>{try{return typeof stat==="function"?stat().act:0}catch(e){return 0}};
/* acts: every act card and every place / pop-up option runs through runOpt (j2); it returns null when she could not pay */
W("runOpt",o=>function(a){const r=o.apply(this,arguments);try{if(r!=null&&a)note("act",{n:a.n})}catch(e){}return r});
/* places: goTo moved her */
W("goTo",o=>function(k){const p0=S&&S.place;const r=o.apply(this,arguments);try{if(S&&S.place===k&&p0!==k)note("go",{k})}catch(e){}return r});
/* dress: wear (j8, items with a slot) and wdWear (j92, the wardrobe); her own body only */
W("wear",o=>function(p,ix){const e=p&&p.inv&&p.inv[ix];const w0=e&&e.w;const r=o.apply(this,arguments);try{if(p===S&&e&&e.w!==w0)note("wear",{})}catch(x){}return r});
W("wdWear",o=>function(p,ix){const e=p&&p.inv&&p.inv[ix];const r=o.apply(this,arguments);try{if(p===S&&e&&!S.inv.includes(e))note("wear",{})}catch(x){}return r});
/* selling: sellItem (j8), wkSell (j83, her handmade works), econSell (jecon, the Tư trang sell button and the Nội vụ phủ sell list);
   one sale counts once even when one calls another */
let sd=0;const SELL=o=>function(p){const n0=p&&p.inv?p.inv.length:0;sd++;let r;try{r=o.apply(this,arguments)}finally{sd--}try{if(!sd&&p===S&&S.inv.length<n0)note("sell",{})}catch(x){}return r};
W("sellItem",SELL);W("wkSell",SELL);W("econSell",SELL);
/* buying: buy (j8) and every kit shop item (kitShop, jinv: Nội vụ phủ, pets …); the shop's sell list goes through econSell above */
W("buy",o=>function(p){const r=o.apply(this,arguments);try{if(r&&p===S)note("buy",{})}catch(x){}return r});
W("kitShop",o=>function(sp){try{if(sp&&Array.isArray(sp.items))for(const x of sp.items){if(!x||typeof x.onBuy!=="function"||x.__tq)continue;const b0=x.onBuy;x.__tq=1;
  x.onBuy=function(){const n0=S.inv.length,c0=S.bac;const r=b0.apply(this,arguments);try{if(S.inv.length>n0||S.bac<c0)note("buy",{})}catch(e){}return r}}}catch(e){}return o.apply(this,arguments)});
/* a deed of hers to a consort: every path (Hậu cung person card j8 doAct, its gift / plant pickers, place pop-ups j9, schemes j70,
   the person-card game jsgame, a co-op friend's invitation) ends in runAct(S, consort, key) (j9), which returns its result line */
W("runAct",o=>function(a,t){const r=o.apply(this,arguments);try{if(a===S&&t&&t!==S&&r&&typeof rivals!=="undefined"&&rivals.includes(t))note("rel",{k:arguments[2]})}catch(x){}return r});
/* a lesson in the Tài nghệ tab, every kind (LUẬT SỬA CẢ NHÓM): tự học / học với thầy / với Thái hậu, Tứ đức tự rèn / theo ma ma, the
   recipe picker + its mini game (jwkr, j83), even "Để trời định": every one ends in progress through addArt (j2, arts) or addVir (j85, Tứ đức).
   A lesson left half-way (picker closed, «Thôi, để lúc khác») gives no progress and does not count. */
W("addArt",o=>function(k,g){const r=o.apply(this,arguments);try{if(g>0)note("art",{k})}catch(x){}return r});
W("addVir",o=>function(p,k,g){const r=o.apply(this,arguments);try{if(p===S&&g>0)note("art",{k})}catch(x){}return r});
/* a maid's deed to a colleague (j42 srvStaffAct: chat / gift / ask / frame) */
W("srvStaffAct",o=>function(k){const r=o.apply(this,arguments);try{if(r!=null)note("cnv",{k})}catch(x){}return r});
}catch(e){console.error("jtq14",e)}})();
