/* ================= jrd_bd: Bắc Địch's OWN four roads (owner OD 18/11 ~22:05Z, GRAND_ENDINGS D2 = (a); ROAD_MAP §4.5b) =================
   bd stays a COUNTRY BRANCH of hòa thân (ORIGIN_BR.bd, KC2LAND.bd, STORY/QUEST67.bd unchanged; land tokens {land} {pv} {mh} {quan} {pa} {pb}
   of jrd_nc NCL.bd). New bd lives roll one of bd_san · bd_soi (this file) · bd_tuyet · bd_hen (jrd_bd2.js): .4 premise arc + .5–.11 + j97 rare
   at .4 + RD97L rare at .11. Numbers: jbalbd.js (ONE CORE). Helpers RDW / rdRel / rdOan / RD_FL from jroad.js / jrd_tt.js (same script).
   LEGACY (law 6c): the old premises bd_hoa / bd_ngua / bd_tuc / bd_hoang (jorigins.js) and their alias chapters (the loop below, moved verbatim
   from jrd_nc.js) stay registered so a saved life on one of them plays on to its .11; they are no longer dealt to NEW lives (BD_OLD filter). */
/* the .4 premise arcs go through j67 arcFx (BAL.arc.fx); a stand-alone scan of this file has none */
const bdArc=(id,d)=>typeof arcFx==="function"?arcFx(id,d):d;
const BD_OLD=["bd_hoa","bd_ngua","bd_tuc","bd_hoang"];
/* BA TƯ (owner OD 19/11 ~06:40Z / ~06:42Z, MAIN order foreign-princess-3; E19 mapping reports/foreign-princess-3-history.md §A.2/§C.2):
   the bd princess origin is now the daughter of the fallen king of Ba Tư (Sasanian Persia) who pleads Đại Hy for an ally. Code ids/keys stay
   "bd" (saves). A life already on an OLD premise (BD_OLD) keeps every Bắc Địch word (law 6c: its text never changes under it); every other
   bd life reads the Ba Tư row. Bắc Địch itself stays a neighbour country in court events (owner ~06:50Z) — those strings are not touched. */
const bdLegacy=()=>{try{return BD_OLD.includes(S.st.f14.road)}catch(e){return false}};
/* THE ONE per-life switch for every bd princess-origin text in any file (origin card, story, quest, home phase, GE rows…):
   bdTxt(bacDich, baTu) = the Bắc Địch words for a life on an old premise, else the Ba Tư words (law 4/11: one function decides) */
const bdTxt=(oldW,newW)=>bdLegacy()?oldW:newW;
/* a text property that follows the switch (getter: every reader of o[k] gets the right words, nothing copied per screen) */
const bdTxtProp=(o,k,oldW,newW)=>{try{Object.defineProperty(o,k,{get:()=>bdTxt(oldW,newW),enumerable:true,configurable:true})}catch(e){}return o};
const bdCountry=()=>{try{return S.origin.k==="bd"?(bdLegacy()?"bd":"bt"):"nc"}catch(e){return"nc"}};
if(typeof NCL==="object"){NCL.bt={land:"Ba Tư",pv:"Phụ vương",mh:"Vương hậu",quan:"Vương trung vương",pa:"Thế tử huynh",pb:"Vương thúc",canh:"cơm nấu thịt cừu, hạt dẻ và lựu",laq:"bụi gai sa mạc",nden:"giữ lửa thánh trong lò",dien:"vương điện",huong:"phương tây"};
 if(typeof TOK67==="object")for(const k of Object.keys(NCL.bt))TOK67[k]=()=>NCL[bdCountry()][k]}
/* a new life's premise pool (j67 arcIds67 → jst14 roll, j67 phase-1 frame): old bd premises out; saves keep the ids already written in their plan */
(function(){if(typeof arcIds67!=="function")return;const a0=arcIds67;arcIds67=function(o){const r=a0.apply(this,arguments);if(o!=="bd")return r;const n=r.filter(id=>!BD_OLD.includes(id));return n.length?n:r}/* until a new road exists the old ones stay dealt (no empty pool) */})();
/* ---------- BDP: the steppe people of bd's roads (law 6b, ROAD_MAP §5.4) — one living state per life, kept in the road flag book ----------
   where: "tn" home (Ba Tư) · "ai" biên ải · "kinh" kinh thành · "nguc" ngục; alive 1/0; met 1 once she has dealt with them. Chapters move them. */
const BDP={lie:{n:"Mi Hồ Lan",r:"vương thúc",w:"tn",want:"ngồi lên ngai vàng Ba Tư, được Đại Hy công nhận",man:1},
 olac:{n:"Nê Niết Sư",r:"em trai",w:"tn",want:"giữ ngai của cha, sống sót qua tay vương thúc",man:1},
 thatmoc:{n:"Đạt Lỗ",r:"vệ sĩ sứ đoàn",w:"tn",want:"một thái ấp của riêng mình",man:1},
 bado:{n:"Bạc Đồ",r:"mã phu Thượng tứ viện",w:"kinh",want:"được ghi tên chính ngạch, một ngày về lại quê nhà"},
 tuyetcau:{n:"Ngọc Câu",r:"ngựa của ngươi",w:"kinh",want:"cỏ và gió"},
 asnc:{n:"A La Hám",r:"lão tướng trấn Tật Lăng",w:"ai",want:"đưa người nước mình chạy nạn qua mùa đông, tìm chỗ dựa ở Đại Hy",man:1},
 phong:{n:"Mật Hồ Đạt",r:"người đã đính ước, đội trưởng hộ vệ sứ đoàn",w:"tn",want:"giữ lời thề trước lửa thánh",man:1},
 kd:{n:"Vương hậu",r:"mẹ",w:"tn",want:"giữ con trai mình sống, gặp lại con gái"}};
const bdP=(id,k,v)=>{const key="bd.p."+id+"."+k;if(v!=null)RD_FL(key,v);const x=RD_FL(key);
 if(x)return x;if(k==="alive")return 1;if(k==="w")return BDP[id].w;return 0};
const bdAlive=id=>bdP(id,"alive")!==-1;/* dead = -1 (0 is the book's "unset") */
/* a steppe man who is IN the capital stands in the world like every man (S.men, jmen schedule: an embassy member keeps the envoy's
   places and lawful reasons), and leaves it when he goes home or dies (law 6b). Women guests and the stable groom: see report FOR E. */
const bdMan=id=>{try{if(typeof menInit==="function")menInit()}catch(e){}if(!S.men||!BDP[id]||!BDP[id].man)return"";const mid="mbd_"+id,M=BAL.road.bd.man;
 const on=bdAlive(id)&&bdP(id,"w")==="kinh";const had=S.men.find(m=>m.id===mid);if(had){had.alive=bdAlive(id);if(on){had.away=0;delete had.ban}else{had.away=1;had.ban=BAL.road.bd.man.away}return""}/* away = off the jmen schedule (menBanned), kept in S.men */
 if(on)S.men.push({id:mid,role:"Sứ thần",rw:"sứ thần",haunts:["thu"],age:M.age[id]||M.age.d,name:BDP[id].n,trait:M.trait[id]||"cẩn trọng",loyal:M.loyal,af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[],bdp:id,known:1});return""};
const bdKill=id=>{bdP(id,"alive",-1);bdMan(id);return ""};
const bdMove=(id,w)=>{bdP(id,"w",w);bdMan(id);return ""};
const bdMeet=id=>{bdP(id,"met",1);return ""};
/* BDO: the ONE object book of bd's four roads (law 6c): every object a chapter gives, buys, receives, loses, burns or hides has its
   holder here, fb "bd.o.<thing>" = where/who holds it now (0 = never in play). bdO(k) reads, bdO(k,v) sets (returns "" for text use). */
const bdO=(k,v)=>{const r=RD_FL("bd.o."+k,v);return v!=null?"":r};
/* the book, as the chapter text and the later grand-ending wave read it */
const bdWhere=id=>({tn:bdCountry()==="bd"?"thảo nguyên":"quê nhà",ai:"biên ải",kinh:"kinh thành",nguc:"ngục"})[bdP(id,"w")]||"";
/* the .4 rare rows of the bd premises (j97 R97L shape; j97 appends them; numbers BAL.arc.rare.<road>) */
const BD97=[];
RDQ.bdOlac=()=>bdAlive("olac");RDQ.bdLie=()=>bdAlive("lie");

/* ---------- LEGACY: old bd premises play the nc chapters (moved from jrd_nc.js, unchanged) ---------- */
/* Bắc Địch branch: the same chapters under the bd premise ids (road key = the premise rolled for this life).
   Runs at load, before jbal2.js: it walks the registered chapters (ROAD14), not BAL.road. */
(function(){const P={bd_hoa:"nc_su",bd_ngua:"nc_gian",bd_tuc:"nc_tuc",bd_hoang:"nc_vuong"};
 for(const b in P){const r=P[b];for(const n in ROAD14[r]||{}){const id=ROAD14[r][n];
  const {o,road,rn,...d}=ARC67[id];d.rth=d.rth||RTHEME67[id];rdDef(b,+n,d)}
  for(const x of RD97L.filter(x=>x.a===r+"_11"))RD97L.push(Object.assign({},x,{a:b+"_11"}))}})();

/* =====================================================================================================================================
   bd_san · Mùa thu săn → «Mã cầu và săn hổ» for Ba Tư lives (Tài nghệ · Tình yêu). People: {emp}, {v}, {maid}; Bạc Đồ (BDP.bado), Tổng quản Thượng tứ viện (unnamed), the mare
   Ngọc Câu (BDP.tuyetcau, lives in the Thượng tứ viện stable). Objects: the cut girth (fb bd_san.girth: kept / given / swapped).
   GE intents (GRAND_ENDINGS §3): ge1 Thống lĩnh ngự mã (hold the stable, teach), ge2 Tri kỷ lưng ngựa (ride with him, open heart),
   ge3 Mũi tên trường săn (trap / turn the blow back on {v}), ge4 Về với thảo nguyên (home calls: Bạc Đồ, the Silk Road, Kim Quang môn).
   ===================================================================================================================================== */
const BDCF=k=>BAL.road.bd.conf[k];
const BDBOW=()=>bdO("cungvua")==="ta"?" Cây cung sừng của ngài, ngươi dâng trả tận tay khi về đến trại.":"";/* bd_san .11: the Emperor's bow goes back */
const BDGATE=()=>{const h=bdO("nguatay");return !h||h==="cua"};/* bd_san .10: the west-gate horse still waits at the gate */
const bdConfine=k=>{S.confined=Math.max(S.confined||0,BDCF(k));return ""};
RTHEME67.bd_san="emp";
ARC67.bd_san=bdArc("bd_san",{o:"bd",t:"Mã cầu và săn hổ",w:"emp",sj:"cuộc săn thu ở Bắc Uyển",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng mở cuộc săn thu ở Bắc Uyển. Cả triều chờ xem công chúa {land}, người lớn lên giữa mã cầu và những cuộc săn báo của vương đình, cưỡi ngựa ra sao. Một mũi tên của ngươi sẽ quyết định cả triều nhìn ngươi bằng con mắt nào.",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Phi tần ngồi xe",w:"emp",t:"Quan Thái bộc tâu: theo lệ, phi tần đi săn ngồi xe che rèm. Ngọc Câu, con ngựa trắng giống quý ngươi mang từ {land}, đứng trong chuồng Thượng tứ viện, cương còn treo trên vách.",o:[
  {n:"Xin ngự giá cho cưỡi Ngọc Câu theo đoàn",f:"ride",wx:"cả đoàn săn thấy ngươi trên lưng ngựa",lx:"bị chê trái lệ",rt:"Hoàng thượng phất tay: “Cho nàng cưỡi.”",rf:"Thái bộc lắc đầu: lệ là lệ."},
  {n:"Ngồi xe, mang cung theo",f:"bend",wx:"giữ đúng lệ Đại Hy",lx:"không ai thấy tài ngươi",rt:"Ngươi ngồi xe, cây cung đặt ngang gối."},
  {n:"Nhờ Bạc Đồ thắng yên cho các phi tần muốn cưỡi",f:"share",wx:"các phi tần cùng vui, không ai nói ngươi phá lệ một mình",lx:"tốn bạc sắm yên",rt:"Bạc Đồ thắng năm bộ yên nhỏ; hai vị phi tần nhận lời cưỡi theo ngươi.",go:()=>bdMeet("bado")}]},
 s2:{h:"Ngọc Câu bỏ ăn",w:"maid",t:"Ba hôm trước cuộc săn, Ngọc Câu bỏ ăn. Bạc Đồ, người giữ ngựa {land} ở Thượng tứ viện, nhắn vào cung: máng cỏ của nó có mùi lạ.",o:[
  {n:"Tự xuống chuồng xem máng cỏ",f:"ride",wx:"tìm ra cỏ bị trộn lá độc",lx:"phi tần xuống chuồng ngựa, người ta bàn tán",rt:"Trong máng có lá ngón trộn lẫn. Ngươi đổ máng, Ngọc Câu ăn lại.",rf:"Máng đã bị rửa sạch trước khi ngươi đến.",go:()=>bdMeet("bado")},
  {n:"Bảo Bạc Đồ thay cỏ, canh chuồng",f:"bend",wx:"ngựa yên mà không ồn ào",lx:"không biết ai trộn cỏ",rt:"Bạc Đồ ngủ luôn ở chuồng ba đêm.",go:()=>bdMeet("bado")},
  {n:"Báo Tổng quản Thượng tứ viện tra xét",f:"share",wx:"việc chuồng ngựa có người lo theo phép",lx:"Tổng quản thấy ngươi nghi người của lão",rt:"Tổng quản cho đổi hết cỏ cả dãy chuồng."}]},
 c1:{h:"{v} mượn ngựa",w:"v",need:["v"],t:"{v} sai người sang mượn Ngọc Câu cho em gái nàng ta cưỡi trong cuộc săn. Từ chối thì mất lòng, cho mượn thì ngựa ở trong tay người khác một ngày.",o:[
  {n:"Cho mượn, dặn Bạc Đồ theo sát",wx:"{v} không có cớ trách",lx:"ngựa ở trong tay người khác",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Ngọc Câu về chuồng lành lặn.",rf:"Ngọc Câu về chuồng, chân sau sưng."},
  {n:"Khéo từ: ngựa chỉ quen tay chủ",wx:"ngựa ở yên trong chuồng",lx:"{v} cho là ngươi khinh nhà nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} cười nhạt, cho người về."},
  {n:"Tặng em gái {v} một con ngựa khác",wx:"được lòng cả hai chị em",lx:"bạc ra",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return bdO("nguahong","emv")},rt:"Em gái {v} nhận con ngựa hồng, cảm ơn ngươi trước mặt mọi người."}]},
 c2:{h:"Con nai trắng",w:"emp",t:"Thị vệ báo trong rừng phong có một con nai trắng. Người xưa nói ai bắn được nai trắng thì được trời thương. Hoàng thượng muốn tự tay bắn.",o:[
  {n:"Lùa nai về phía ngự giá",f:"ride",wx:"ngài bắn được nai, nhớ ai lùa nó",lx:"phi ngựa giữa rừng, dễ ngã",rt:"Con nai chạy thẳng về phía ngài. Mũi tên vàng trúng ngay vai nó.",rf:"Con nai rẽ ngang, mất hút sau đồi."},
  {n:"Khuyên ngài tha nai, lấy điềm lành",f:"bend",wx:"ngài thấy ngươi có lòng",lx:"thị vệ cho là ngươi làm mất hứng",rt:"Hoàng thượng hạ cung: “Trời đã cho xem, không cần lấy.”"},
  {n:"Chỉ cho thị vệ dấu chân nai",f:"share",wx:"cả đoàn biết ngươi đọc được dấu rừng",lx:"công thuộc về thị vệ",rt:"Thị vệ theo dấu ngươi chỉ, vây được con nai trước bữa trưa."}]},
 t1:{h:"Mũi tên đầu tiên",w:"emp",t:"Một con hươu đực lớn vọt qua bãi. Mũi tên của Hoàng thượng sượt qua lưng nó. Cả đoàn im lặng: ngươi đang đứng ở chỗ bắn dễ nhất.",o:[
  {n:"Bắn ngay, hạ con hươu",f:"ride",wx:"cả đoàn thấy tài bắn của ngươi",lx:"bắn trước mặt vua là chuyện lớn",rt:"Mũi tên của ngươi xuyên cổ con hươu. Hoàng thượng nhìn ngươi rất lâu.",rf:"Tên của ngươi trượt, cắm vào thân cây ngay sau ngự mã."},
  {n:"Hạ cung, nhường ngài bắn lần nữa",f:"bend",wx:"ngài nhớ ngươi biết nhường",lx:"con hươu chạy mất",rt:"Hoàng thượng bắn mũi thứ hai, trúng."},
  {n:"Bắn chặn đường hươu, đẩy nó về phía ngài",f:"share",wx:"ngài hạ được hươu, cả hai cùng có công",lx:"một mũi tên khó",rt:"Mũi tên cắm trước mõm hươu; nó quay đầu, và ngài bắn trúng.",rf:"Con hươu không quay đầu."}]},
 x1:{h:"Hổ trong rừng phong",w:"emp",t:"Chiều xuống, một con hổ vằn lao ra khỏi bụi, nhắm vào chân ngự mã. Cấm quân còn ở xa. Ngươi ở gần nhất.",o:[
  {n:"Giương cung bắn con hổ",e:["win","lose"],rt:"Mũi tên trúng mắt con thú. Nó ngã cách ngự mã ba bước chân. Hoàng thượng gọi: “Nàng lại đây, cưỡi bên trẫm.”",rf:"Mũi tên sượt, con thú lồng lên, ngự mã hoảng hất ngài suýt ngã."},
  {n:"Thúc Ngọc Câu chắn trước ngự mã",e:["win2","mid"],rt:"Ngọc Câu đứng chắn, con thú húc vào bụi. Tổng quản Thượng tứ viện về hỏi ngươi cách dạy ngựa như thế.",rf:"Ngọc Câu hoảng, ngươi giữ được cương nhưng ngự mã đã chạy xa."},
  {n:"Hô cấm quân, chỉ lối cho ngự mã tránh",e:"mid",lx:"không ai nhớ ngươi đã ở đó",rt:"Cấm quân tới kịp. Ngự mã tránh được, cả đoàn về sớm."}]}},
 E:{win:{tag:"Một tên trước ngự giá",w:"emp",t:"Từ hôm ấy, cuộc cưỡi ngựa nào Hoàng thượng cũng gọi ngươi theo. Cả triều thôi coi tài bắn cung của ngươi là thói người Hồ."},
  win2:{tag:"Người hiểu ngựa",w:"emp",t:"Thượng tứ viện xin Hoàng thượng cho ngươi xem xét đàn ngựa {land} mới đến. Ngọc Câu có chuồng riêng."},
  mid:{tag:"Một ngày săn như mọi ngày",t:"Cuộc săn khép lại, ai về cung nấy. Người ta nhớ con hổ hơn nhớ ngươi."},
  lose:{tag:"Tên bay gần ngự mã",w:"v",t:"{v} kể khắp hậu cung: công chúa {land} bắn tên sát ngự mã, chẳng biết là vụng hay là cố ý."}}});
BD97.push({a:"bd_san",tag:"Một tên hai nhạn",w:"emp",n:"Ngẩng lên bắn đôi nhạn đang bay qua ngự giá",
 path:["cưỡi Ngọc Câu","Tự xuống chuồng","Lùa nai","Bắn ngay","Bắn chặn đường hươu","Nhờ Bạc Đồ"],bad:["Ngồi xe","Hô cấm quân"],x:[()=>S.suc>=BAL.arc.rare.bd_san.bar,`Sức từ ${BAL.arc.rare.bd_san.bar}`],
 t:"Ngươi không bắn con thú, mà ngẩng lên. Một mũi tên xuyên cả đôi nhạn đang bay ngang trời; chúng rơi xuống trước móng ngự mã, con thú hoảng quay vào rừng. Hoàng thượng cười lớn, cởi chiếc nhẫn ngọc cài cung trao cho ngươi: “Nhạn bay thành đôi, nàng bắn một tên. Trẫm nhớ.”",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_nhuy",ti:"Một tên hai nhạn"});

rdDef("bd_san",5,{t:"Chuồng ngựa Thượng tứ viện",w:"emp",sj:"chuồng ngựa {land} ở Thượng tứ viện",cast(A){return rdCast(A,["v"])},
 g:"Đàn ngựa cống của {land} vừa vào kinh. Tổng quản Thượng tứ viện muốn nuôi theo phép Đại Hy, Bạc Đồ muốn nuôi theo phép {land}. Ai giữ chìa khóa dãy chuồng ấy, người đó có tiếng nói ở Thượng tứ viện.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài cho ngươi chọn ngựa",w:"emp",if:()=>RDW(1)()&&rdPrev()!=="win2",t:"Hoàng thượng sai mở chuồng: “Nàng chọn cho trẫm một con, và một con cho nàng.” Tổng quản Thượng tứ viện đứng sau, mặt không vui.",o:[
  {n:"Chọn con ngựa xấu mà bền cho ngài",f:"keep",wx:"ngài thấy ngươi hiểu ngựa thật",lx:"ngài có thể chê ngựa xấu",rt:"Hoàng thượng cưỡi thử, rồi gật đầu: “Nàng nói đúng.”",rf:"Hoàng thượng chê ngựa xấu, cưỡi con khác."},
  {n:"Để Tổng quản chọn, ngươi chỉ khen",f:"bend",wx:"Tổng quản: oán −",lx:"ngài nghĩ ngươi chẳng hiểu gì",rt:"Tổng quản chọn con ngựa đẹp nhất, nhìn ngươi bớt lạnh."},
  {n:"Xin ngài cho Bạc Đồ dắt ngựa ra",f:"steppe",wx:"Bạc Đồ có mặt trước ngự giá",lx:"Tổng quản bị gạt sang bên",rt:"Bạc Đồ dắt ngựa, ngài khen y biết việc.",go:()=>bdMeet("bado")}]},
 s2:{h:"Tổng quản đến hỏi",w:"emp",if:()=>rdPrev()==="win2",t:"Tổng quản Thượng tứ viện tự mình đến cung ngươi, mang theo sổ ngựa: đàn ngựa {land} mới đến có mười con không chịu ăn cỏ Đại Hy.",o:[
  {n:"Chỉ cách trộn cỏ mục túc",f:"keep",wx:"Tổng quản nợ ngươi một việc",lx:"công phải chia",rt:"Mười con ngựa ăn lại sau năm ngày. Tổng quản ghi công cho Thượng tứ viện."},
  {n:"Xin cho Bạc Đồ trông dãy chuồng ấy",f:"steppe",wx:"dãy chuồng có người của ngươi",lx:"Tổng quản thấy ngươi giành chỗ",rt:"Tổng quản miễn cưỡng giao cho Bạc Đồ.",rf:"Tổng quản nói: “Người {land} chỉ đáng giữ cửa chuồng.”",go:()=>bdMeet("bado")},
  {n:"Mời Tổng quản uống trà, hỏi chuyện nghề",f:"bend",wx:"lão bớt đề phòng",lx:"không xong việc",rt:"Tổng quản kể ba đời làm nghề ngựa, ra về vui vẻ."}]},
 s3:{h:"Ngọc Câu bị dắt sang chuồng xa",w:"maid",if:RDW(0),t:"Sau cuộc săn, Ngọc Câu bị dắt sang dãy chuồng cuối Thượng tứ viện, gần máng nước bẩn. {maid} nghe nói đó là lệnh của Tổng quản.",o:[
  {n:"Xin Hoàng thượng cho ngựa về chỗ cũ",f:"keep",wx:"ngài nói một câu là xong",lx:"ngài cho là ngươi làm phiền vì con ngựa",rt:"Hoàng thượng phê một chữ. Ngọc Câu về chỗ cũ.",rf:"Hoàng thượng nói: “Chuyện chuồng ngựa, để Thượng tứ viện lo.”"},
  {n:"Gửi bạc nhờ Bạc Đồ chăm riêng",f:"steppe",wx:"ngựa được chăm mà không ai biết",lx:"bạc ra mỗi tháng",rt:"Bạc Đồ dắt Ngọc Câu đi uống nước sạch mỗi sáng.",go:()=>bdMeet("bado")},
  {n:"Tự đến chuồng, chải lông cho ngựa",f:"bend",wx:"cung nhân thấy ngươi thương ngựa",lx:"phi tần ra chuồng, người ta cười",rt:"Ngọc Câu dụi đầu vào vai ngươi."}]},
 c1:{h:"Bạc Đồ xin việc",w:"maid",t:"Bạc Đồ nhắn vào: y muốn được ghi tên là phu ngựa chính ngạch, không phải người làm thuê. Có tên trong sổ, y mới ở lại kinh lâu được.",o:[
  {n:"Bỏ bạc lo cho y vào sổ",wx:"Bạc Đồ ở lại lâu dài",lx:"bạc ra",rt:"Tên Bạc Đồ được ghi vào sổ Thượng tứ viện."},
  {n:"Viết thư nhờ sứ {land} xin cho y",wx:"có giấy tờ đàng hoàng",lx:"sứ {land} biết ngươi cần người",rt:"Sứ {land} gửi một tờ thỉnh, Thượng tứ viện chuẩn.",rf:"Thư đi mà chưa có hồi âm."},
  {n:"Bảo y cứ làm, chờ dịp",wx:"không tốn gì",lx:"Bạc Đồ buồn lòng",rt:"Bạc Đồ cúi đầu, không nói gì."}]},
 c2:{h:"{v} xin một con ngựa {land}",w:"v",need:["v"],t:"{v} tâu xin một con ngựa {land} cho cung mình. Nàng ta xin đúng con ngựa ô mà ngươi định dâng Hoàng thượng.",o:[
  {n:"Nhường con ngựa ô cho {v}",wx:"{v} không có cớ nói ngươi giữ của",lx:"mất con ngựa tốt",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return bdO("nguao","v")},rt:"{v} nhận ngựa, cười với ngươi lần đầu."},
  {n:"Tâu rằng ngựa ô chưa thuần, chọn con khác cho nàng",wx:"giữ được ngựa ô",lx:"{v} biết ngươi lựa lời",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return""},rt:"{v} nhận con ngựa khác, không nói gì.",rf:"{v} nói: “Chưa thuần mà định dâng Hoàng thượng?”"},
  {n:"Mời {v} ra chuồng tự chọn",wx:"công bằng trước mắt mọi người",lx:"{v} chọn đúng con ngươi quý",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return bdO(bdO("nguahong")?"nguao":"nguahong","v")},rt:()=>bdO("nguahong")==="emv"?"Con ngựa hồng đã ở chỗ em gái nàng; {v} chọn con ngựa ô, khen ngươi rộng rãi.":"{v} chọn con ngựa hồng, khen ngươi rộng rãi."}]},
 t1:{h:"Sổ cỏ khô",w:"emp",t:"Bạc Đồ cho ngươi xem: sổ ghi mỗi ngày đổ mười xe cỏ cho dãy chuồng {land}, mà chỉ có sáu xe đến. Người ký sổ là thuộc hạ của Tổng quản.",o:[
  {n:"Đưa sổ lên Hoàng thượng",f:"keep",go:()=>bdO("so","vua"),wx:"ngài thấy ngươi giữ của công",lx:"Tổng quản thành kẻ thù",rt:"Hoàng thượng sai Nội vụ phủ tra, kẻ ký sổ bị đánh đòn.",rf:"Nội vụ phủ tra mà không ra gì, sổ bị nói là ghi nhầm."},
  {n:"Đem sổ đến nói riêng với Tổng quản",f:"bend",go:()=>bdO("so","tongquan"),wx:"Tổng quản nợ ngươi một lần",lx:"cỏ có thể vẫn thiếu",rt:"Tổng quản đổi người ký sổ, mười xe cỏ đến đủ."},
  {n:"Giữ bản chép sổ, chờ lúc cần",f:"steppe",wx:"có một chứng cứ trong tay",lx:"ngựa vẫn đói ít lâu",rt:"Bản chép nằm trong rương áo cưỡi của ngươi.",go:()=>bdO("so","chep")}]},
 x1:{h:"Ai giữ chìa khóa chuồng",w:"emp",t:"Cuối tháng, Hoàng thượng hỏi ai nên trông dãy chuồng ngựa {land}. Tổng quản Thượng tứ viện đứng chờ. Bạc Đồ đứng sau lưng ngươi.",o:[
  {n:"Tâu xin cho Bạc Đồ giữ chìa khóa",e:["win","lose"],rt:"Hoàng thượng giao chìa khóa cho Bạc Đồ, dưới quyền ngươi trông coi. Tổng quản cúi đầu.",rf:"Hoàng thượng nói: “Người {land} giữ ngựa {land}, thế thì Thượng tứ viện để làm gì?”",go:()=>bdMeet("bado")},
  {n:"Tâu xin hai người cùng trông",e:["win","mid"],rt:"Tổng quản giữ sổ, Bạc Đồ giữ chuồng. Hai người phải hỏi ngươi khi bất đồng.",rf:"Hai người cãi nhau ngay trước cửa chuồng."},
  {n:"Thưa: việc của Thượng tứ viện, thần thiếp không dám bàn",e:"mid",lx:"chuồng ngựa không còn là việc của ngươi",rt:"Chìa khóa về tay Tổng quản."}]}},
 E:{win:{tag:"Chuồng ngựa nghe lời ngươi",w:"emp",t:"Dãy chuồng ngựa {land} có chủ: người giữ là Bạc Đồ, người quyết là ngươi. Tổng quản Thượng tứ viện chào ngươi trước khi chào ai khác."},
  mid:{tag:"Ngựa của Đại Hy",t:"Đàn ngựa {land} giờ là ngựa của Đại Hy. Ngươi vẫn ghé chuồng thăm Ngọc Câu, nhưng chìa khóa không ở trong tay ngươi."},
  lose:{tag:"Tổng quản ghi hận",w:"emp",t:"Tổng quản Thượng tứ viện không quên ngày ấy. Từ nay mỗi lần ngươi xuống chuồng, sổ của lão lại có thêm một dòng.",go:()=>{RD_FL("bd_san.tq","foe");return""}}}});

rdDef("bd_san",6,{t:"Đai yên bị cắt",w:"maid",sj:"sợi đai yên của Ngọc Câu",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng hẹn cưỡi ngựa với ngươi ở bãi tập Tây Uyển. Sáng hôm ấy, đai yên của Ngọc Câu bị cắt gần đứt. Sợi đai là chứng cứ, nhưng chứng cứ chỉ có giá khi có người nói ra ai cầm dao.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bạc Đồ giữ lại sợi đai",w:"maid",if:RDW(1),t:"Bạc Đồ thắng yên lúc trời chưa sáng thì thấy sợi đai bị cứa sâu, chỉ còn một lớp da. Y không thay, mà giữ nguyên, dắt ngựa về chuồng và nhắn vào cung.",o:[
  {n:"Bảo y giữ nguyên sợi đai, không cho ai chạm",f:"proof",wx:"chứng cứ còn nguyên",lx:"buổi cưỡi ngựa phải hoãn",rt:"Sợi đai được cuộn trong vải, cất trong rương áo cưỡi của ngươi.",go:()=>{bdO("dai","kept");return""}},
  {n:"Thay đai mới, vẫn đi cưỡi như hẹn",f:"calm",wx:"Hoàng thượng không phải chờ",lx:"kẻ cắt đai biết việc đã lộ",rt:"Ngươi cưỡi bên ngài cả buổi, mặt không đổi sắc.",go:()=>{bdO("dai","kept");return""}},
  {n:"Cho Bạc Đồ rình xem ai quay lại chuồng",f:"trap",wx:"có thể bắt tận tay",lx:"Bạc Đồ thức trắng, dễ bị phát hiện",rt:"Đêm ấy có bóng người lén vào chuồng tìm sợi đai.",rf:"Không ai quay lại."}]},
 s2:{h:"Ngã ngựa ở bãi tập",w:"maid",if:RDW(0),t:"Đai yên đứt khi Ngọc Câu đang phi. Ngươi ngã xuống cát, may chỉ trầy tay. Bạc Đồ nhặt sợi đai lên: vết cắt gọn như dao.",o:[
  {n:"Giữ sợi đai, không nói với ai",f:"proof",wx:"chứng cứ trong tay",lx:"người ta tưởng ngươi vụng",rt:"Sợi đai cất trong rương. Người ta chỉ biết ngươi ngã ngựa.",go:()=>{bdO("dai","kept");return""}},
  {n:"Đưa sợi đai cho Hoàng thượng xem ngay",f:"open",wx:"ngài thấy rõ có kẻ hại ngươi",lx:"kẻ cắt đai kịp xóa dấu",rt:"Hoàng thượng cầm sợi đai, mặt sầm lại.",rf:"Hoàng thượng hỏi: “Đai cũ thì đứt, có gì lạ?”",go:()=>{bdO("dai","given");return""}},
  {n:"Cười cho qua, xin cưỡi lại ngay",f:"calm",wx:"không ai thấy ngươi sợ",lx:"tay đau, cưỡi khó",rt:"Ngươi thắng đai mới, phi thêm ba vòng bãi.",go:()=>{bdO("dai","kept");return""}}]},
 c1:{h:"Thái giám cung {v}",w:"v",need:["v"],t:"Một phu ngựa nhỏ ở Thượng tứ viện kể với Bạc Đồ: đêm trước có một thái giám cung {v} vào chuồng, nói là đến xem ngựa hồng của chủ.",o:[
  {n:"Cho người hỏi thẳng thái giám ấy",wx:"nghe y nói gì",lx:"{v} biết ngươi đã nghi",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Thái giám ấp úng, khai đã vào chuồng nhưng không làm gì.",rf:"Thái giám chối, rồi chạy về mách {v}."},
  {n:"Giữ phu ngựa nhỏ làm chứng",/*bd6c: a person, not an object*/wx:"có một người chứng",lx:"bạc nuôi miệng",rt:"Phu ngựa nhỏ nhận bạc, hứa sẽ nói khi được hỏi."},
  {n:"Sang cung {v} hỏi khéo",wx:"xem {v} có biết không",lx:"{v} thấy ngươi đến tận nơi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} tái mặt: nàng ta không biết người của mình vào chuồng.",rf:"{v} nói: “Chuồng ngựa ai vào chẳng được?”"}]},
 c2:{h:"Phu ngựa nhỏ",w:"maid",t:"Phu ngựa nhỏ ở Thượng tứ viện còn kể: con dao cắt đai là dao cắt cỏ của chuồng, sáng ra đã được treo lại chỗ cũ.",o:[
  {n:"Cho lấy con dao về giữ",wx:"thêm một chứng vật",lx:"Tổng quản hỏi vì sao mất dao",rt:"Con dao được gói chung với sợi đai.",go:()=>bdO("daocat","ta")},
  {n:"Nhờ Bạc Đồ đánh dấu con dao, để nguyên chỗ",wx:"xem ai lấy lại",lx:"có thể không ai lấy",rt:"Bạc Đồ khắc một vạch nhỏ dưới chuôi dao."},
  {n:"Bỏ bạc để phu ngựa nhỏ chuyển sang hầu chuồng của ngươi",wx:"người chứng ở gần ngươi",lx:"bạc ra",rt:"Phu ngựa nhỏ sang dãy chuồng {land} làm việc."}]},
 t1:{h:"Hoàng thượng hỏi đến",w:"emp",t:"Hoàng thượng hỏi vì sao buổi cưỡi ngựa hôm ấy lại có chuyện. Ngài nhìn tay ngươi.",o:[
  {n:"Thưa thật: có kẻ cắt đai",f:"open",wx:"ngài đứng về phía ngươi",lx:"ngài muốn chứng cứ ngay",rt:"Hoàng thượng nói: “Trẫm sẽ cho Thận hình ty xét.”",rf:"Hoàng thượng nói: “Nói có kẻ hại thì phải có kẻ.”"},
  {n:"Thưa: đai cũ đứt, thần thiếp sơ ý",f:"calm",wx:"không làm ồn",lx:"kẻ cắt đai yên tâm",rt:"Hoàng thượng sai Thượng tứ viện đổi hết yên cũ."},
  {n:"Xin ngài cho thần thiếp tự tra",f:"trap",wx:"có thời gian bắt người",lx:"ngài chờ kết quả",rt:"Hoàng thượng gật: “Mười ngày.”"}]},
 x1:{h:"Sợi đai trước Thận hình ty",w:"emp",t:"Thận hình ty mở phiên xét. Thái giám cung {v} quỳ một bên, ngươi đứng một bên. Trên án là sợi đai bị cắt.",o:[
  {n:"Trình sợi đai, con dao và lời phu ngựa nhỏ",e:["win","lose"],rt:"Phu ngựa nhỏ nói rõ đêm ấy. Thái giám cung {v} cúi đầu nhận tội, khai người sai bảo.",rf:"Phu ngựa nhỏ run quá, nói lẫn lộn. Thận hình ty cho là ngươi dựng chuyện.",go:()=>{bdO("dai","given");bdO("dai","tht");if(bdO("daocat")==="ta")bdO("daocat","tht");return""}},
  {n:"Đặt bẫy: để lộ tin còn sợi đai thứ hai",e:["win","lose"],rt:"Đêm ấy kẻ cắt đai quay lại chuồng tìm, Bạc Đồ bắt tận tay.",rf:"Không ai mắc bẫy; người ta cười ngươi bày trò."},
  {n:"Rút đơn, chỉ xin đổi người giữ yên",e:"mid",lx:"kẻ cắt đai vẫn yên ổn",rt:"Từ nay chỉ Bạc Đồ được chạm vào yên của Ngọc Câu."}]}},
 E:{win:{tag:"Kẻ cắt đai bị bắt",w:"emp",t:"Thái giám cung {v} bị đánh đòn, đuổi ra khỏi cung. Ai cũng biết hắn không tự làm, nhưng sợi đai đã nói đủ.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Đai mới, lòng không yên",t:"Ngọc Câu có đai mới, Bạc Đồ canh yên mỗi sáng. Kẻ cầm dao vẫn ở đâu đó trong cung."},
  lose:{tag:"Bị nói là tự vu",w:"v",t:"Hậu cung đồn ngươi tự cắt đai để vu cho người khác. {v} không cần nói gì, đã có người nói thay."}}});

rdDef("bd_san",7,{t:"Cưỡi ngựa cùng vua",w:"emp",sj:"những buổi cưỡi ngựa ngoài thành",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng muốn ra khỏi cung, cưỡi ngựa với ngươi trên đồng cỏ ngoài cửa Đức Thắng. Trong triều, một vị Ngự sử đã viết xong tờ sớ: phi tần cưỡi ngựa theo vua là trái phép tổ tông.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài muốn ra ngoài thành",w:"emp",if:RDW(1),t:"Hoàng thượng sai người mang áo cưỡi đến cung ngươi: “Sáng mai, chỉ trẫm với nàng, mười thị vệ theo xa.”",o:[
  {n:"Nhận lời, cưỡi Ngọc Câu đi trước dẫn đường",f:"ride",wx:"ngài vui như thuở thiếu niên",lx:"đi xa, triều thần bàn tán",rt:"Hai con ngựa phi đến tận bờ sông. Ngài cười suốt đường về.",rf:"Thị vệ mất dấu ngài nửa canh giờ, cả cung náo loạn."},
  {n:"Nhận lời, xin ngài cho thị vệ đi gần",f:"care",wx:"ngài thấy ngươi lo cho ngài",lx:"cuộc đi bớt vui",rt:"Thị vệ theo sát, ngài chỉ cười: “Nàng cẩn thận hơn cả Thống lĩnh.”"},
  {n:"Xin ngài cưỡi trong Tây Uyển thôi",f:"bend",wx:"không trái lệ",lx:"ngài hơi thất vọng",rt:"Hai người cưỡi quanh hồ Tây Uyển đến trưa."}]},
 s2:{h:"Ngài cưỡi một mình",w:"maid",if:RDW(0),t:"{maid} báo: Hoàng thượng ra ngoài thành cưỡi ngựa, không gọi ngươi. Ngài cưỡi con ngựa ô mà ngươi từng chọn.",o:[
  {n:"Cưỡi Ngọc Câu đuổi theo",f:"ride",wx:"ngài thấy ngươi không chịu đứng ngoài",lx:"đuổi theo vua là liều",rt:"Ngươi bắt kịp ngài ở bờ sông. Ngài không giận, chỉ hỏi: “Nàng đuổi kịp trẫm thật à?”",rf:"Thị vệ chặn ngươi ở cửa thành."},
  {n:"Sai Bạc Đồ mang nước và áo ấm theo ngài",f:"care",wx:"ngài nhận ra ai lo cho mình",lx:"ngươi không có mặt",rt:"Ngài uống nước, hỏi Bạc Đồ: “Chủ ngươi đâu?”"},
  {n:"Ở lại cung, chờ ngài về",f:"bend",wx:"giữ đúng phận",lx:"ngài quen cưỡi một mình",rt:"Ngài về lúc chiều, chỉ ghé qua cung ngươi một lát."}]},
 c1:{h:"Tờ sớ của Ngự sử",w:"emp",t:"Tờ sớ đến ngự án: “Phi tần cưỡi ngựa theo vua ra ngoài thành, thì hậu cung còn phép gì?” Tên ngươi không có trong sớ, nhưng ai đọc cũng biết.",o:[
  {n:"Viết một bức thư nhỏ dâng ngài, kể phu nhân {land} cưỡi ngựa đánh mã cầu",wx:"ngài có lời để đáp Ngự sử",lx:"chữ ngươi đến tay triều thần",rt:"Ngài đọc thư, gác tờ sớ sang bên.",rf:"Thư của ngươi bị chép lại, truyền khắp các bộ."},
  {n:"Xin Thái hậu một lời",wx:"có người trên che chở",lx:"nợ Đức Thọ cung một ơn",rt:"Thái hậu nói với Ngự sử: “Thời tiên đế cũng có phi tần cưỡi ngựa.”",rf:"Thái hậu chỉ nói: “Ngựa là việc của đàn ông.”"},
  {n:"Tạm thôi cưỡi ngựa ít ngày",wx:"tờ sớ hết lửa",lx:"ngài phải cưỡi một mình",rt:"Áo cưỡi treo trên vách mười ngày."}]},
 c2:{h:"{v} cũng xin theo",w:"v",need:["v"],t:"{v} tâu xin được theo Hoàng thượng cưỡi ngựa, nói nàng ta cũng biết cưỡi. Thật ra nàng ta chỉ ngồi được trên lưng ngựa đi bước.",o:[
  {n:"Dạy {v} cưỡi cho vững",wx:"{v} nợ ngươi một ơn",lx:"mất mấy buổi chiều",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Sau năm buổi, {v} phi được một vòng bãi. Nàng ta nhìn ngươi khác hẳn.",rf:"{v} ngã, đổ tội cho ngựa của ngươi."},
  {n:"Để {v} theo, chọn cho nàng ta ngựa hiền",wx:"không ai nói ngươi giữ ngài",lx:"cuộc đi có thêm người",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} cưỡi con ngựa già, đi sau cả đoàn."},
  {n:"Tâu rằng đường ngoài thành không hợp người mới học",wx:"giữ được buổi cưỡi riêng",lx:"{v} nhớ mặt ngươi",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng thượng gật đầu. {v} lui ra, mặt lạnh."}]},
 t1:{h:"Đường về qua làng",w:"emp",t:"Trên đường về, ngựa đi qua một làng ven sông. Mùa màng thất, dân ra ruộng nhặt từng bông lúa. Hoàng thượng hỏi ngươi: “Ở {land}, năm đói người ta làm gì?”",o:[
  {n:"Thưa thật: vua nước thần thiếp xá thuế, mở kho chia lúa",f:"open",wx:"ngài nghe chuyện nước ngươi bằng lòng thật",lx:"ngài có thể cho là ngươi khoe",rt:"Ngài lặng nghe, rồi sai thị vệ ghi tên làng để xá thuế.",rf:"Ngài nói: “Đại Hy không phải {land}.”"},
  {n:"Xin ngài xuống ngựa hỏi dân",f:"care",wx:"dân làng được thấy mặt vua",lx:"về cung muộn",rt:"Ngài xuống ngựa, cầm tay một ông lão. Ngươi đứng sau, dắt hai con ngựa."},
  {n:"Lấy túi bạc bên yên chia cho dân",f:"give",wx:"dân làng nhớ ơn",lx:"bạc ra",rt:"Dân làng quỳ hai bên đường, gọi ngươi là “phu nhân áo cưỡi”."}]},
 x1:{h:"Tờ sớ trước ngự án",w:"emp",t:"Phiên triều sáng, Ngự sử quỳ đọc lại tờ sớ. Hoàng thượng cho người hỏi ngươi một câu: “Nàng muốn trẫm trả lời thế nào?”",o:[
  {n:"Xin dạy các công chúa nhỏ cưỡi ngựa, để cưỡi ngựa thành phép",e:["win","lose"],rt:"Hoàng thượng phán: từ nay các công chúa học cưỡi ngựa, người dạy là phi tần {land}. Ngự sử lui.",rf:"Triều thần xôn xao: công chúa Đại Hy học phép người Hồ? Ngài phải gác lại."},
  {n:"Xin ngài để thần thiếp tự đến Ngự sử đài tạ lỗi",e:["win","lose"],rt:"Ngự sử thấy ngươi đến, không giận được nữa. Lão chỉ xin ngươi mặc áo chùng dài khi cưỡi.",rf:"Ngự sử từ chối gặp, lại viết thêm một tờ sớ."},
  {n:"Thưa: thần thiếp thôi cưỡi ngựa ngoài thành",e:"mid",lx:"những buổi ngoài thành chấm dứt",rt:"Ngài gật đầu, rồi im lặng rất lâu."}]}},
 E:{win:{tag:"Người cùng ngài phi ngựa",w:"emp",t:"Những buổi sáng ngoài cửa Đức Thắng thành chuyện cả kinh thành biết. Ngự sử không viết thêm. Hoàng thượng nói với ngươi những điều ngài không nói trong điện."},
  mid:{tag:"Áo cưỡi cất vào rương",t:"Ngươi cất áo cưỡi. Hoàng thượng vẫn đến cung ngươi, nhưng ngài thôi nhắc đến đồng cỏ ngoài thành."},
  lose:{tag:"Lời sớ thắng",w:"emp",t:"Tờ sớ được ghi vào sổ triều. Ngươi thành gương xấu để các ma ma dạy cung nữ mới: phi tần không được cưỡi ngựa."}}});

rdDef("bd_san",8,{t:"Dịch ngựa",w:"emp",sj:"dịch bệnh ở Thượng tứ viện",cast(A){return rdCast(A,["v"])},
 g:"Ngựa ở Thượng tứ viện chảy nước mũi, bỏ ăn, rồi gục xuống từng con. Biên ải đang chờ một đợt chiến mã. Binh bộ hỏi: ngựa {land} có mang bệnh vào không?",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tổng quản xin ngươi xem bệnh",w:"emp",if:RDW(1),t:"Tổng quản Thượng tứ viện đứng ngoài cửa cung ngươi từ sáng sớm: “Ba mươi con đã gục. Thú y của viện không biết bệnh gì.”",o:[
  {n:"Theo Tổng quản xuống chuồng ngay",f:"cure",wx:"ngươi thấy bệnh tận mắt",lx:"phi tần vào chuồng dịch, người ta sợ",rt:"Ngươi nhận ra bệnh: thầy ngựa {land} gọi là sốt cỏ ướt.",rf:"Ngươi chưa nhận ra bệnh gì."},
  {n:"Sai Bạc Đồ xuống xem rồi về kể",f:"slow",wx:"ngươi không phải vào chuồng dịch",lx:"chậm một ngày",rt:"Bạc Đồ về kể từng dấu bệnh. Ngươi nghĩ ra cách chữa."},
  {n:"Viết thư hỏi thầy ngựa ở {land}",f:"home",wx:"có người biết bệnh thật",lx:"thư đi lâu",rt:"Thư theo người đưa tin của sứ quán đi ngay trong đêm."}]},
 s2:{h:"Binh bộ đổ tội ngựa {land}",w:"v",if:RDW(0),t:"Binh bộ dâng tấu: dịch bắt đầu từ dãy chuồng ngựa {land}. Người nhà {v} trong Binh bộ đòi đem cả đàn ngựa {land} ra đốt.",o:[
  {n:"Xin Hoàng thượng cho ba ngày chữa",f:"cure",wx:"đàn ngựa còn cơ hội",lx:"nếu thất bại thì tội về ngươi",rt:"Hoàng thượng cho ba ngày.",rf:"Hoàng thượng chỉ cho một ngày."},
  {n:"Chứng minh dịch bắt đầu từ chuồng khác",f:"proof",wx:"ngựa {land} được rửa tiếng",lx:"phải tìm sổ chuồng",rt:"Sổ chuồng ghi con ngựa gục đầu tiên ở dãy chuồng Đại Hy.",rf:"Sổ chuồng đã bị sửa."},
  {n:"Xin tự bỏ bạc chuộc đàn ngựa ra ngoài thành nuôi riêng",f:"home",wx:"ngựa không bị đốt",lx:"Bạc −−",rt:"Đàn ngựa {land} được dắt ra bãi cỏ ngoài thành."}]},
 c1:{h:"Thú y Thượng tứ viện",w:"emp",t:"Thú y của Thượng tứ viện muốn cho ngựa uống thuốc đắng và trích máu theo sách. Bạc Đồ lắc đầu: ngựa yếu mà trích máu thì chết.",o:[
  {n:"Bàn với thú y, chọn cách nào hợp cả hai",wx:"thú y nể ngươi",lx:"mất thời gian bàn",rt:"Thú y thôi trích máu, giữ thuốc đắng."},
  {n:"Đứng về phía Bạc Đồ",wx:"ngựa không bị trích máu",lx:"thú y oán ngươi",rt:"Thú y lui ra, mặt sầm."},
  {n:"Để thú y làm theo sách",wx:"ngươi không chịu trách nhiệm nếu ngựa chết",lx:"thêm ngựa chết",rt:"Thú y trích máu mười con, sáu con gục."}]},
 c2:{h:"{v} đồn ngựa {land} mang bệnh",w:"v",need:["v"],t:"Khắp hậu cung truyền lời: ngựa {land} mang dịch vào kinh, chủ của chúng cũng không sạch. Lời ấy bắt đầu từ cung {v}.",o:[
  {n:"Mời {v} xuống chuồng xem tận mắt",wx:"lời đồn mất gốc",lx:"{v} thấy ngươi thách",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"{v} không dám xuống chuồng dịch. Lời đồn tắt.",rf:"{v} xuống chuồng, chỉ vào một con ngựa {land} đang ho."},
  {n:"Gửi {v} một gói thuốc phòng dịch",wx:"tỏ ra không để bụng",lx:"{v} có thể cho là ngươi chột dạ",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nhận thuốc, không nói gì."},
  {n:"Lặng im, chữa ngựa cho xong",wx:"không mất sức cãi",lx:"lời đồn còn đó",rt:"Ngươi không đáp lời nào."}]},
 t1:{h:"Binh bộ thúc ngựa",w:"emp",t:"Thư biên ải đến: phải có một đợt chiến mã trước mùa tuyết. Binh bộ hỏi Thượng tứ viện còn bao nhiêu con khỏe.",o:[
  {n:"Chọn những con khỏe nhất gửi đi",f:"cure",wx:"biên ải có ngựa",lx:"có thể mang mầm bệnh theo",rt:"Đợt ngựa lên đường, đến ải khỏe mạnh.",rf:"Ba con gục giữa đường."},
  {n:"Xin hoãn một tháng, cho ngựa khỏi hẳn",f:"slow",wx:"không mang dịch ra ải",lx:"Binh bộ trách",rt:"Binh bộ hoãn, ghi tên ngươi vào tấu."},
  {n:"Xin {land} gửi gấp một đàn ngựa khỏe",f:"home",wx:"ải có ngựa mà chuồng không vơi",lx:"{pv} sẽ xin lại một việc",rt:"{pv} gom ngựa của các thương nhân người Hồ, cống ngay năm trăm con.",rf:"Ngựa {land} đến chậm, qua mùa tuyết."}]},
 x1:{h:"Cứu chuồng ngựa",w:"emp",t:"Ngày thứ ba, dịch lan sang chuồng ngự mã. Con ngựa ô của Hoàng thượng đã bỏ ăn. Ngài hỏi: “Nàng có cách gì không?”",o:[
  {n:"Dùng cách chữa xứ tây: đốt ngải, tách chuồng, cho uống nước muối",e:["win","lose"],rt:"Khói ngải bay khắp Thượng tứ viện ba ngày. Con ngựa ô đứng dậy, ăn lại.",rf:"Khói ngải không cứu được con ngựa ô. Người ta nói ngươi làm bùa."},
  {n:"Cùng thú y chữa theo cả hai phép",e:["win","mid"],rt:"Thuốc của Đại Hy, cách giữ chuồng của {land}: ngựa khỏi dần.",rf:"Hai phép chữa vướng nhau, ngựa khỏi chậm."},
  {n:"Thưa: thần thiếp không dám chữa ngựa ngự",e:"mid",lx:"không ai nhớ ngươi biết chữa",rt:"Thú y chữa theo sách. Một nửa đàn qua khỏi."}]}},
 E:{win:{tag:"Chuồng ngựa khỏi bệnh",w:"emp",t:"Thượng tứ viện hết dịch. Con ngựa ô của Hoàng thượng lại phi được. Binh bộ thôi nhắc đến ngựa {land}."},
  mid:{tag:"Mất nửa đàn",t:"Dịch qua, Thượng tứ viện mất nửa đàn ngựa. Không ai đổ tội cho ngươi, cũng không ai cảm ơn ngươi."},
  lose:{tag:"Ngựa {land} bị đổ tội",w:"v",t:"Binh bộ ghi vào sổ: dịch đến từ ngựa {land}. Biên ải thiếu ngựa qua mùa tuyết.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_san",9,{t:"Mã cầu và hội bắn xuân",w:"emp",sj:"hội mã cầu và bắn cung mùa xuân",cast(A){return rdCast(A,["v"])},
 g:"Đầu xuân, Hoàng thượng mở hội mã cầu và bắn cung cho các hoàng tử, con nhà tướng và thị vệ. Ngài muốn ngươi có mặt. Người nhà {v} có một em trai là tay cung giỏi nhất cấm quân.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài mời ngươi dạy bắn",w:"emp",if:RDW(1),t:"Hoàng thượng nói: “Trẫm muốn các hoàng tử học mã cầu và cách ngoái lại bắn trên lưng ngựa. Nàng dạy được không?”",o:[
  {n:"Nhận dạy các hoàng tử",/*bd6c: a task, not an object*/f:"teach",wx:"các hoàng tử gọi ngươi là thầy",lx:"dạy hỏng thì mang tiếng",rt:"Sau một tháng, hai hoàng tử vừa phi vừa ngoái lại bắn trúng bia.",rf:"Một hoàng tử ngã ngựa trong buổi tập đầu."},
  {n:"Xin dạy thị vệ trước, hoàng tử sau",f:"safe",wx:"không đặt hoàng tử vào chỗ liều",lx:"chậm",rt:"Thị vệ học trước, rồi tự dạy lại các hoàng tử."},
  {n:"Xin ngài cho Bạc Đồ dạy thay",f:"steppe",wx:"Bạc Đồ được đứng trước các hoàng tử",lx:"triều thần chê dùng người Hồ",rt:"Bạc Đồ dạy, ngươi đứng xem. Hoàng thượng ban cho y một tấm áo."}]},
 s2:{h:"Không có tên ngươi",w:"maid",if:RDW(0),t:"Danh sách hội bắn dán ở Tây Uyển, không có tên ngươi. {maid} nghe nói Lễ bộ gạch tên vì “phi tần không bắn trước mặt hoàng tử”.",o:[
  {n:"Xin Hoàng thượng ghi lại tên",f:"teach",wx:"ngươi được dự",lx:"Lễ bộ khó chịu",rt:"Hoàng thượng tự tay viết thêm tên ngươi.",rf:"Hoàng thượng nói: “Năm nay thôi.”"},
  {n:"Đến xem, mang cung theo",f:"safe",wx:"có mặt mà không trái lệ",lx:"chỉ đứng xem",rt:"Ngươi ngồi hàng phi tần, cây cung đặt bên cạnh."},
  {n:"Tự mở một hội bắn nhỏ trong cung mình",f:"steppe",wx:"cung nữ và thái giám được vui",lx:"bạc ra, có người nói ngươi chống Lễ bộ",rt:"Sân cung ngươi dựng ba cái bia rơm. Cung nữ cười vang đến tối."}]},
 c1:{h:"Em trai nhà {v}",w:"v",need:["v"],t:"Em trai {v} là tay cung giỏi nhất cấm quân. {v} nhắn ngươi: “Năm nay để em ta thắng, nhà ta nhớ ơn.”",o:[
  {n:"Hứa không tranh với y",wx:"nhà {v} nợ ngươi",lx:"bỏ một dịp tỏ tài",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gửi sang một hộp trà ngon."},
  {n:"Đáp: mũi tên không biết nhà ai",wx:"giữ được lòng tự trọng",lx:"{v}: oán +",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} cười nhạt: “Để xem.”"},
  {n:"Mời em trai {v} tập bắn chung",wx:"biết rõ tay cung của y",lx:"y cũng biết rõ tay ngươi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Hai người tập ba buổi. Y nể ngươi thật lòng.",rf:"Y bắn thua một buổi, về kể với chị là ngươi chơi khăm."}]},
 c2:{h:"Cây cung của tiên đế",w:"emp",t:"Thượng tứ viện tìm thấy trong kho một cây cung sừng của tiên đế, dây đã mục. Hoàng thượng muốn có người lên dây lại để dùng trong hội.",o:[
  {n:"Tự tay lên dây theo cách {land}",wx:"cây cung bắn được lại",lx:"làm hỏng thì có tội",rt:"Dây gân mới căng, cây cung bật tiếng như xưa.",rf:"Sừng cung nứt một đường nhỏ."},
  {n:"Nhờ thợ cung của Binh bộ, ngươi chỉ cách",wx:"việc xong mà không ai trách ngươi",lx:"công thuộc về thợ",rt:"Thợ cung làm theo lời ngươi, xong trong năm ngày."},
  {n:"Khuyên ngài để cây cung trong kho",wx:"giữ được vật của tiên đế",lx:"ngài tiếc",rt:"Cây cung được lau dầu, đặt lại vào hộp gấm."}]},
 t1:{h:"Gió ngược",w:"emp",t:"Ngày hội, gió cát thổi ngược. Các tay cung Đại Hy bắn lệch cả. Ngươi học bắn trong gió sa mạc từ thuở nhỏ.",o:[
  {n:"Chỉ cho các hoàng tử cách nghiêng tên",f:"teach",wx:"các hoàng tử bắn trúng",lx:"ngươi tự bỏ lợi thế",rt:"Các hoàng tử bắn trúng liền ba mũi. Hoàng thượng nhìn ngươi gật đầu."},
  {n:"Giữ cách bắn cho riêng mình",/*bd6c: a skill, not an object*/f:"self",wx:"chỉ ngươi bắn trúng trong gió",lx:"người ta nói ngươi giấu nghề",rt:"Mũi tên của ngươi trúng hồng tâm giữa gió."},
  {n:"Tâu xin dời hội sang buổi chiều lặng gió",f:"safe",wx:"hội công bằng cho mọi người",lx:"ngài phải đợi",rt:"Chiều xuống, gió lặng. Hội bắn lại từ đầu."}]},
 x1:{h:"Mũi tên cuối",w:"emp",t:"Còn mũi tên cuối. Em trai {v} đang dẫn trước một mũi tên. Hoàng thượng nhìn sang ngươi.",o:[
  {n:"Tự giương cung bắn mũi cuối",e:["win","lose"],rt:"Mũi tên của ngươi xẻ đôi mũi tên của em trai {v} trên hồng tâm. Cả Tây Uyển đứng dậy.",rf:"Gió đổi chiều đúng lúc buông dây, tên ngươi cắm ngoài vòng."},
  {n:"Đưa cây cung cho hoàng tử ngươi đã dạy",/*bd6c: her own bow, lent for one shot, back in her hand*/e:["win","mid"],rt:"Hoàng tử bắn trúng hồng tâm, quay lại cúi đầu với ngươi trước cả triều.",rf:"Hoàng tử bắn trúng vòng hai. Ngài vẫn khen."},
  {n:"Hạ cung, chúc em trai {v} thắng",e:"mid",lx:"ngươi không bắn mũi cuối",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Em trai {v} thắng hội. {v} gật đầu với ngươi từ xa."}]}},
 E:{win:{tag:"Cung thần của hậu cung",w:"emp",t:"Hoàng thượng ban cho ngươi cây cung sừng của tiên đế. Từ nay, hội bắn nào cũng có ghế của ngươi.",go:()=>bdO("cungtd","ta")},
  mid:{tag:"Tên trúng, người không nhớ",t:"Hội bắn tan. Người ta nhớ ai thắng, còn ngươi được nhớ là người đã có mặt."},
  lose:{tag:"Tên trượt trước cả triều",w:"v",t:"Cả triều thấy mũi tên của ngươi cắm ngoài vòng. {v} sai người mang sang một bó tên tập, gọi là quà."}}});

rdDef("bd_san",10,{t:"Tiếng gọi con đường tơ lụa",w:"maid",sj:"con ngựa thắng sẵn ở Kim Quang môn",cast(A){return rdCast(A,["v"])},
 g:"Mùa hạ, thương nhân người Hồ dắt ngựa {land} theo con đường tơ lụa đến Tây Thị. Thư {mh} gửi theo chỉ một câu: “Lựu năm nay chín đỏ lắm.” Bạc Đồ nói nhỏ với ngươi: y đã thắng sẵn một con ngựa ở Kim Quang môn.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của {mh}",w:"maid",if:RDW(1),t:"Thư {mh} đến kèm một túi cỏ mục túc phơi khô ở quê nhà. Ngươi mở túi, mùi cỏ làm ngươi nhớ những buổi chiều trên lưng ngựa.",o:[
  {n:"Hồi thư kể chuyện Đại Hy cho mẹ",f:"stay",wx:"{mh} yên lòng",lx:"lòng ngươi càng nhớ",rt:"Ngươi viết suốt đêm, kể cả chuyện cây cung của tiên đế."},
  {n:"Treo túi cỏ trong chuồng Ngọc Câu",f:"north",wx:"ngựa và người cùng nhớ quê",lx:"người ta thấy ngươi buồn",rt:"Ngọc Câu hít túi cỏ, hí một tiếng dài."},
  {n:"Đưa thư cho Hoàng thượng đọc",f:"open",wx:"ngài hiểu lòng ngươi",lx:"thư nhà thành chuyện của triều",rt:"Ngài đọc, rồi hỏi: “Nàng có muốn về thăm không?”",rf:"Ngài đọc, rồi không nói gì."}]},
 s2:{h:"Đàn ngựa ở Tây Thị",w:"maid",if:RDW(0),t:"Người buôn ở Tây Thị kể: đàn ngựa {land} năm nay có một con trắng giống hệt Ngọc Câu, là con của mẹ nó. Người chăn hỏi thăm công chúa.",o:[
  {n:"Bỏ bạc mua con ngựa ấy về kinh",f:"stay",wx:"có thêm một con ngựa quê nhà",lx:"bạc ra",rt:"Con ngựa trắng về đến Thượng tứ viện, đứng cạnh Ngọc Câu.",go:()=>bdO("nguatrang","tuv")},
  {n:"Nhờ người buôn mang thư hỏi thăm người chăn",f:"north",wx:"có tin quê",lx:"thư qua tay người lạ",rt:"Người buôn nhận thư, hứa mùa sau mang hồi âm."},
  {n:"Lặng im, không hỏi thêm",f:"open",wx:"không ai thấy ngươi nhớ nhà",lx:"Lòng −",rt:"Ngươi về cung, đóng cửa sớm."}]},
 c1:{h:"Con ngựa ở Kim Quang môn",w:"maid",t:"Bạc Đồ thưa: con ngựa thắng sẵn ở Kim Quang môn là ngựa nhanh nhất y từng nuôi. Nếu ngươi muốn, một đêm là ra khỏi kinh, rồi cứ theo đường tơ lụa mà về tây.",o:[
  {n:"Bảo Bạc Đồ trả ngựa về chuồng",wx:"không để lại dấu",lx:"Bạc Đồ buồn",rt:"Bạc Đồ cúi đầu, dắt ngựa về.",go:()=>bdO("nguatay","chuong")},
  {n:"Bảo Bạc Đồ cứ để ngựa đó",wx:"một đường lui còn mở",lx:"có người thấy ngựa lạ ở Kim Quang môn",rt:"Con ngựa vẫn buộc ở Kim Quang môn, cỏ đầy máng.",rf:"Lính Kim Quang môn hỏi ngựa của ai.",go:()=>{RD_FL("bd_san.westgate",1);bdO("nguatay","cua");return""}},
  {n:"Cho Bạc Đồ cưỡi con ngựa ấy về thăm nhà",wx:"y về quê mà ngươi ở lại",lx:"mất người giữ ngựa một thời gian",rt:"Bạc Đồ lạy ngươi ba lạy, ra Kim Quang môn lúc gà gáy.",go:()=>{bdO("nguatay","bado");return bdMove("bado","tn")}}]},
 c2:{h:"{v} hỏi về Kim Quang môn",w:"v",need:["v"],t:"{v} vô tình nhắc trong buổi thỉnh an: “Nghe nói có con ngựa {land} buộc ở Kim Quang môn cả tháng, chẳng biết đợi ai.”",o:[
  {n:"Cười: ngựa của người buôn",wx:"câu chuyện dừng ở đó",lx:"{v} chưa tin",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return""},rt:"Không ai hỏi thêm.",rf:"{v} cười: “Người buôn nào buộc ngựa một chỗ cả tháng?”"},
  {n:"Thưa thật: ngựa của phu ngựa nhà mình",wx:"không ai bắt được lỗi nói dối",lx:"{v} nắm được một chuyện",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} gật đầu, không nói gì nữa."},
  {n:"Hỏi lại {v} sao biết rõ thế",wx:"{v} lộ là có người rình",lx:"{v}: oán +",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} đỏ mặt, đổi sang chuyện khác."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Đêm ấy Hoàng thượng đến, ngồi rất lâu rồi hỏi: “Nếu trẫm cho nàng về {land} một chuyến, nàng có quay lại không?”",o:[
  {n:"Thưa: thần thiếp quay lại, vì ngài ở đây",f:"stay",wx:"ngài yên lòng",lx:"một lời hứa phải giữ",rt:"Ngài nắm tay ngươi đến sáng."},
  {n:"Thưa: thần thiếp không biết",f:"north",wx:"ngươi không nói dối ngài",lx:"ngài lo",rt:"Ngài im lặng, rồi nói: “Trẫm hiểu.”",rf:"Ngài đứng dậy, ra về sớm."},
  {n:"Xin ngài cùng đi một chuyến ra ải",f:"open",wx:"ngài thấy được quê ngươi",lx:"đi ra ải là việc lớn",rt:"Ngài cười: “Để mùa thu.”"}]},
 x1:{h:"Đêm ở Kim Quang môn",w:"maid",t:()=>"Đêm rằm, trăng sáng như ban ngày. "+({chuong:"Con ngựa Bạc Đồ thắng sẵn đã về chuồng, nhưng Ngọc Câu cứ hí trong đêm. ",bado:"Bạc Đồ đã cưỡi con ngựa Kim Quang môn về quê nhà. Chuồng Ngọc Câu thiếu một người. "}[bdO("nguatay")]||"Con ngựa ở Kim Quang môn vẫn chờ. ")+"Gió tây mang mùi cát thổi vào tận sân cung ngươi.",o:[
  {n:"Ở lại, xin Hoàng thượng cho về thăm cố hương theo lễ",e:["win","lose"],rt:"Hoàng thượng chuẩn: mùa thu năm sau, ngươi theo sứ đoàn về thăm {land}, có cấm quân hộ tống.",rf:"Lễ bộ bác: phi tần hòa thân không có lệ về nước."},
  {n:"Lên ngựa ra Kim Quang môn, phi một đoạn đường tây rồi về trước sáng",if:()=>BDGATE(),e:["win","lose"],rt:"Ngươi phi đến tận bờ sông, nhìn về phía tây, rồi quay về trước khi trống canh năm. Không ai biết, trừ con ngựa.",rf:"Lính Kim Quang môn giữ ngươi lại lúc quay về. Sáng ra, cả cung biết.",go:()=>{RD_FL("bd_san.rode",1);return""}},
  {n:"Bảo Bạc Đồ dắt ngựa về chuồng, đóng cửa sổ",if:()=>BDGATE(),e:"mid",lx:"gió tây không còn gọi",rt:"Con ngựa về chuồng. Ngươi đóng cửa sổ, ngồi đến sáng.",go:()=>bdO("nguatay","chuong")},
  {n:"Thắng Ngọc Câu, ra Kim Quang môn phi một đoạn đường tây rồi về trước sáng",if:()=>!BDGATE(),e:["win","lose"],rt:"Ngươi phi đến tận bờ sông, nhìn về phía tây, rồi quay về trước khi trống canh năm. Không ai biết, trừ Ngọc Câu.",rf:"Lính Kim Quang môn giữ ngươi lại lúc quay về. Sáng ra, cả cung biết.",go:()=>{RD_FL("bd_san.rode",1);return""}},
  {n:"Đóng cửa sổ, ngồi đến sáng",if:()=>!BDGATE(),e:"mid",lx:"gió tây không còn gọi",rt:"Ngươi đóng cửa sổ, ngồi đến sáng. Sáng ra, gió đã đổi chiều."}]}},
 E:{win:{tag:"Gió tây trong tay áo",w:"emp",t:"Ngươi vẫn ở Đại Hy, nhưng con đường tơ lụa không thôi gọi ngươi. Hoàng thượng biết điều ấy, và không bắt ngươi quên."},
  mid:{tag:"Ngựa về chuồng",t:"Kim Quang môn không còn con ngựa nào chờ ngươi. Ngươi vẫn ra chuồng thăm Ngọc Câu, nhưng thôi nhìn về phía tây."},
  lose:{tag:"Bị bắt ở Kim Quang môn",w:"emp",t:"Phi tần ra khỏi cửa cung lúc nửa đêm. Hoàng thượng không trách, nhưng cho đóng cửa cung ngươi.",go:()=>bdConfine("san10")}}});

rdDef("bd_san",11,{t:"Vi trường năm sau",w:"emp",sj:"cuộc săn thu năm sau",cast(A){if(bdP("bado","w")!=="kinh"){bdMove("bado","kinh");if(bdO("nguatay")==="bado")bdO("nguatay","chuong");RD_FL("bd_san.badove",1)}return rdCast(A,["v"])},
 g:()=>(RD_FL("bd_san.badove")?"Bạc Đồ đã về lại kinh sau một năm trên đường tơ lụa, dắt theo con ngựa Kim Quang môn, cúi đầu nhận lại chuồng Ngọc Câu. ":"")+"Thu lại về, cuộc săn ở Bắc Uyển lại mở. Bạc Đồ thấy trong rừng phong có người lạ mặc áo thị vệ mà không mang thẻ. Lần này, một mũi tên có thể quyết cả chuyện sống chết.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngươi cưỡi đầu đoàn",w:"emp",if:RDW(1),t:"Hoàng thượng cho ngươi cưỡi Ngọc Câu đi ngay sau ngự mã. Các phi tần ngồi xe phía sau nhìn theo.",o:[
  {n:"Đi sát ngự mã, mắt nhìn rừng",f:"guard",wx:"ngài có người canh bên cạnh",lx:"không còn là cuộc vui",rt:"Ngươi thấy trước mọi bụi cây động."},
  {n:"Mời một phi tần lên ngựa cưỡi cùng",f:"share",wx:"hậu cung: oán −",lx:"phải lo thêm một người",rt:"Hai con ngựa đi song song sau ngự giá."},
  {n:"Đi trước dò đường",f:"scout",wx:"thấy được người lạ trước",lx:"cách xa ngài",rt:"Ngươi thấy dấu chân người trong rừng phong.",rf:"Ngươi đi xa quá, mất dấu đoàn."}]},
 s2:{h:"Ngươi ngồi xe",w:"maid",if:RDW(0),t:"Năm nay ngươi phải ngồi xe che rèm. Ngọc Câu đi không người cưỡi sau xe. Bạc Đồ dắt ngựa, nhìn vào rừng.",o:[
  {n:"Xin xuống xe, cưỡi Ngọc Câu",f:"guard",wx:"ngươi ở gần ngự giá",lx:"trái lệnh",rt:"Hoàng thượng thấy ngươi lên ngựa, chỉ cười.",rf:"Thái bộc giữ ngươi lại trong xe."},
  {n:"Bảo Bạc Đồ theo sát ngự mã",f:"scout",wx:"có người mình gần ngài",lx:"Bạc Đồ không có quyền",rt:"Bạc Đồ dắt Ngọc Câu đi sát cấm quân."},
  {n:"Vén rèm, đếm thị vệ",f:"share",wx:"biết ai thừa ra",lx:"người ta thấy ngươi tò mò",rt:"Thị vệ đếm được thừa ra hai người."}]},
 c1:{h:"Người lạ mặc áo thị vệ",w:"maid",t:"Bạc Đồ nói khẽ: hai người lạ mặc áo thị vệ, đeo cung dài, đứng ở mé rừng phía tây. Thống lĩnh cấm quân không biết họ.",om3:"010",o:[
  {alt:{n:"Tự phi ngựa đến hỏi thẻ bài",rt:"Hai người không có thẻ, lùi vào rừng.",rf:"Hai người chìa thẻ ra, là thẻ thật của Nội vụ phủ."},n:"Báo ngay Thống lĩnh cấm quân",wx:"cấm quân đề phòng",lx:"lỡ là người thật thì mang tiếng",rt:"Cấm quân dàn hàng ở mé rừng tây.",rf:"Thống lĩnh bảo: người của Nội vụ phủ, không có gì."},
  {n:"Bảo Bạc Đồ theo dõi, không động",wx:"không đánh động",lx:"chậm một bước",rt:"Bạc Đồ nấp sau gốc phong, mắt không rời hai người."}]},
 c2:{h:"{v} đổi chỗ xe",w:"v",need:["v"],t:"{v} xin Thái bộc cho xe mình đi lên gần ngự giá, sát chỗ con đường vào rừng phong.",o:[
  {n:"Nhắc {v} chỗ ấy không yên",wx:"cứu {v} nếu có chuyện",lx:"{v} cho là ngươi ghen",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nghe, cho xe lùi lại.",rf:"{v} không nghe."},
  {n:"Để mặc {v}",wx:"không dính vào",lx:"nếu có chuyện, xe {v} ở đầu",rt:"Xe {v} đi sát ngự giá."},
  {n:"Xin Thái bộc giữ mọi xe ở sau",wx:"công bằng cho mọi người",lx:"{v} biết ngươi chặn",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Thái bộc giữ xe lại. {v} nhìn ngươi."}]},
 t1:{h:"Hoàng thượng trao cung",w:"emp",t:"Trước khi vào rừng, Hoàng thượng trao cho ngươi cây cung sừng của mình: “Nàng giữ, trẫm cưỡi cho nhẹ.”",o:[
  {n:"Nhận cung, đi sát ngài",f:"guard",go:()=>bdO("cungvua","ta"),wx:"có cung trong tay khi cần",lx:"cả đoàn thấy ngài tin ngươi quá",rt:"Cây cung nằm ngang yên Ngọc Câu."},
  {n:"Xin ngài giữ cung",f:"share",wx:"ngài tự vệ được",lx:"ngài nghĩ ngươi từ chối",rt:"Ngài cười, đeo cung lên vai."},
  {n:"Nhận cung, lắp sẵn một mũi tên",f:"scout",go:()=>bdO("cungvua","ta"),wx:"sẵn sàng",lx:"người ta thấy ngươi căng thẳng",rt:"Ngươi lắp tên, tay không run."}]},
 x1:{h:"Mũi tên từ rừng phong",w:"emp",t:"Giữa trưa, một mũi tên rít ra từ rừng phong, nhắm thẳng ngự giá. Mũi thứ hai đang lên dây.",o:[
  {n:"Thúc Ngọc Câu chắn mũi tên",e:["win","lose"],rt:"Mũi tên cắm vào yên Ngọc Câu, cách tay ngươi một tấc. Ngự giá an toàn. Hoàng thượng ôm lấy ngươi giữa cấm quân.",rf:"Ngọc Câu trúng tên vào vai, ngã quỵ. Ngươi ngã theo, mũi thứ hai sượt qua ngự giá.",go:(A,ok)=>{if(!ok)bdP("tuyetcau","hurt",1);return""}},
  {n:"Bắn trả về phía rừng, bắt sống kẻ bắn",e:["win","lose"],rt:"Mũi tên của ngươi xuyên tay kẻ đang kéo dây. Cấm quân bắt được hắn, hắn khai người sai khiến.",rf:"Tên ngươi trượt. Kẻ bắn chạy mất vào rừng."},
  {n:"Kéo cương ngự mã chạy khỏi bãi",e:["mid","lose"],rt:"Ngự mã theo Ngọc Câu chạy ra khỏi bãi. Cả hai về đến trại, ngài không bị gì.",rf:"Ngự mã hoảng, hất ngài ngã ở bìa rừng."}]}},
 E:{win:{tag:"Nữ kỵ bên ngự giá",w:"emp",t:()=>"Từ hôm ấy, Hoàng thượng đi đâu cũng có ngươi cưỡi bên. Thượng tứ viện, Tây Uyển, Bắc Uyển: con ngựa trắng đi sau ngự mã ai cũng biết là ai."+BDBOW(),go:()=>bdO("cungvua",bdO("cungvua")?"vua":0)},
  mid:{tag:"Ngựa về chuồng, người về cung",t:()=>"Cuộc săn khép lại sớm. Ngươi đã giữ được ngài, nhưng không ai kể chuyện ấy như một chiến công."+BDBOW(),go:()=>bdO("cungvua",bdO("cungvua")?"vua":0)},
  lose:{tag:"Mũi tên lạc",w:"v",t:()=>"Kẻ bắn không bị bắt. Hậu cung thì thầm: mũi tên ấy nhắm vào ai, có khi chỉ người {land} biết."+BDBOW(),go:(_A,G)=>{bdO("cungvua",bdO("cungvua")?"vua":0);return e67bien(G[0])}}}});
RD97L.push(rdRare({a:"bd_san_11",tag:"Hoàng thượng trao cương ngựa ngự",w:"emp",n:"Nhảy sang lưng ngự mã, cầm cương thay ngài",
 path:["Bắn ngay","Chọn con ngựa xấu","Tâu xin cho Bạc Đồ","Đặt bẫy","Trình sợi đai","Nhận lời, cưỡi Ngọc Câu","Xin dạy các công chúa","Dùng cách chữa xứ tây","Tự giương cung","Nhận dạy các hoàng tử","Đi sát ngự mã","Nhận cung"],
 bad:["Ngồi xe","Thưa: thần thiếp thôi cưỡi","Thưa: thần thiếp không dám"],x:[()=>S.suc>=RR("bd_san_11").bar,"Sức từ "+RR("bd_san_11").bar],
 t:"Ngươi nhảy sang lưng ngự mã đang hoảng, ghì cương, đưa ngài ra khỏi tầm tên trong một hơi thở. Ba hôm sau, Hoàng thượng ban chiếu: phi tần {land} được giữ cương ngựa ngự trong mọi cuộc săn, đặt chức Ngự mã nữ quan đầu tiên của Đại Hy. Ngọc Câu được ăn trong máng bạc.",
 go:(_A,G)=>e67bien(G[0]),rw:"bienngu",ti:"Người giữ cương ngựa ngự"}));

/* =====================================================================================================================================
   bd_soi · Ngai vàng Tô Lận (was «Sói đầu đàn»; Quyền lực · Gia tộc; GRAND_ENDINGS §4.2 worked sample). BA TƯ text (owner OD 19/11, E19
   §A.2): Tô Lận thành (蘇藺, the Sasanian capital Ctesiphon in Sui/Tang sources), sông Đạt Hạt (達曷, Tigris), Tật Lăng, Tây Thị, An Tây,
   Thông Lĩnh. People: {pv} (wounded fighting Đại Thực), {mh} (Vương hậu, comes to the capital at .8: BDP move "kinh" via fb "bd.p.kd.w"),
   vương thúc Mi Hồ Lan (BDP.lie, a great noble house), em trai Nê Niết Sư (BDP.olac), Đạt Lỗ (BDP.thatmoc), {emp}, {v}. Objects: the copy
   of the border map (fb bd_soi.map: kept / false / given / burnt), the uncle's letters (fb bd_soi.letters), the winged seal ring (bdO ansoi).
   GE intents: ge1 Nữ vương (keep the map, turn Đạt Lỗ, refuse the trade-road deal, arm the Vương hậu's guard, play the polo trial herself,
   trade troops for the noble houses' oath) · ge2 Lập em lên ngôi (honest letters, spare Đạt Lỗ, reopen the road, shelter the Vương hậu
   openly, a champion for the brother, envoys not troops; closed by stealing the map / poison) · ge3 Kẻ tranh ngai phải chết (false map,
   kill Đạt Lỗ, push war, bait, bribe the judges, the whole army) · ge4 Con trai hai cõi (shelter the Vương hậu, the trial under the
   prince's banner, the brother's oath to her son).
   ===================================================================================================================================== */
RTHEME67.bd_soi="emp";
const BDKD=()=>bdP("kd","w");/* where the Vương hậu is (law 6b): "tn" home, "kinh" in the capital, "ai" with her kin's caravan camp at the western border */
const BDKDAT=()=>RD_FL("bd_soi.chua")?"đền Hỏa Tiên ngoài thành":"nhà khách Lễ bộ";
const BDSON=()=>{try{return !!son67()}catch(e){return false}};
ARC67.bd_soi=bdArc("bd_soi",{o:"bd",t:"Ngai vàng Tô Lận",w:"emp",sj:"ngai vàng của {land}",cast(A){return rdCast(A,["v"])},
 g:"{pv} trúng tên trong trận giữ thành trước quân Đại Thực, nằm mê man trong kim điện Tô Lận. Vương thúc Mi Hồ Lan sai sứ vào kinh, xin Đại Hy công nhận mình giữ ngai. Em trai Nê Niết Sư của ngươi mới mười sáu tuổi, gửi thư cầu cứu. Hoàng thượng hỏi ngươi.",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Tin dữ từ Tô Lận",w:"emp",t:"Người đưa tin quỳ ngoài cung, áo còn bám bụi đường cát: {pv} trúng tên, chưa tỉnh. Vương thúc Mi Hồ Lan đã dời phủ mình vào sát kim điện.",o:[
  {n:"Xin Hoàng thượng cho thái y theo sứ sang tây",f:"kin",wx:"{pv} có thầy thuốc giỏi",lx:"Đại Hy nhúng tay vào việc ngai vàng",rt:"Hoàng thượng sai hai thái y theo người đưa tin lên đường ngay.",rf:"Thái y viện tâu: đường qua Thông Lĩnh xa, không ai dám đi."},
  {n:"Hỏi người đưa tin ai đang giữ quân",f:"cold",wx:"biết rõ thế trong kim điện",lx:"bị coi là lạnh lòng",rt:"Người đưa tin kể: quân cận vệ còn theo {pv}, nhưng các nhà quý tộc nhỏ đã sang phủ vương thúc."},
  {n:"Gửi ngay vòng ngọc của mẹ cho Nê Niết Sư làm tin",f:"kin",wx:"em trai biết ngươi đứng về phía nó",lx:"vương thúc biết ngươi chọn phe",rt:"Chiếc vòng ngọc theo người đưa tin về tây.",go:()=>{bdO("vongngoc","olac");return bdMeet("olac")}}]},
 s2:{h:"Sứ của vương thúc",w:"emp",t:"Sứ của Mi Hồ Lan vào chầu, dâng hai mươi con ngựa và một bức thư: “Đại Hy công nhận ta, ta giữ đường tơ lụa yên như {pv}.” Sứ nhìn ngươi khi nói câu ấy.",o:[
  {n:"Đứng sau rèm nghe hết, không nói",f:"cold",wx:"biết vương thúc muốn gì",lx:"sứ cho là ngươi đã ngả",rt:"Ngươi nghe đến chữ cuối, ghi nhớ từng điều kiện.",go:()=>bdMeet("lie")},
  {n:"Xin Hoàng thượng hỏi sứ về sức khỏe {pv}",f:"kin",wx:"sứ lộ là vương thúc không mong {pv} tỉnh",lx:"sứ ghi hận",rt:"Sứ ấp úng, nói {pv} đã già.",rf:"Sứ đáp trơn tru: {pv} sẽ khỏi."},
  {n:"Nhận ngựa thay Hoàng thượng, cảm ơn sứ",f:"bend",go:()=>bdO("nguasu","tuv"),wx:"sứ yên lòng, nói nhiều hơn",lx:"người ta nghĩ ngươi nhận quà vương thúc",rt:"Sứ cảm động, kể cả chuyện các nhà quý tộc đã theo ai."}]},
 c1:{h:"Thư của Nê Niết Sư",w:"maid",t:"Thư của Nê Niết Sư viết bằng chữ {land}, nét còn non: “Chị, vương thúc nói em còn nhỏ. Các đại tộc nghe vương thúc. Em sợ.”",o:[
  {n:"Hồi thư dạy em cách giữ quân cận vệ",wx:"Nê Niết Sư có người chỉ đường",lx:"thư có thể lọt vào tay vương thúc",rt:"Thư đi theo đoàn lạc đà, giấu trong túi hàng.",rf:"Thư bị giữ ở biên ải.",go:()=>bdMeet("olac")},
  {n:"Đưa thư em lên Hoàng thượng",wx:"ngài thấy ngươi không giấu",lx:"việc nhà thành việc triều",rt:"Hoàng thượng đọc xong, nói: “Thằng bé viết chữ đẹp.”"},
  {n:"Gửi bạc cho em mua lòng các đại tộc",wx:"em có của để chia",lx:"Bạc −−",rt:"Bạc theo đoàn lạc đà về tây.",go:()=>bdMeet("olac")}]},
 c2:{h:"{v} nói ra nói vào",w:"v",need:["v"],t:"{v} nói trong buổi thỉnh an: “Người {land} giết nhau tranh ngai là thói quen, Đại Hy dính vào làm gì?”",o:[
  {n:"Đáp: biên ải yên là việc của Đại Hy",wx:"cả cung nghe ngươi nói phải",lx:"{v} bị bẽ mặt",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Các phi tần gật gù, {v} im."},
  {n:"Im lặng, cúi đầu",wx:"không gây chuyện",lx:"người ta nghĩ ngươi chịu lời ấy",rt:"Ngươi uống trà, không đáp."},
  {n:"Mời {v} sang uống rượu nho, kể chuyện kim điện",wx:"{v}: oán −",lx:"mất một buổi chiều",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nghe chuyện kim điện, lần đầu hỏi tên em trai ngươi.",rf:"{v} chê rượu nho chua."}]},
 t1:{h:"Bản đồ trong Binh bộ",w:"emp",t:"Một đêm, người của vương thúc lén đưa vào cung ngươi một lời nhắn: nếu ngươi chép được bản đồ đồn ải phía tây trong kho Binh bộ, vương thúc sẽ gả Nê Niết Sư cho con gái mình và để nó sống.",o:[
  {n:"Đưa lời nhắn lên Hoàng thượng",f:"open",wx:"ngài thấy ngươi một lòng",lx:"vương thúc biết ngươi trình",rt:"Hoàng thượng sai Binh bộ đổi chỗ cất bản đồ.",rf:"Hoàng thượng hỏi: “Người của hắn vào được cung nàng bằng đường nào?”",go:()=>{bdO("thuluc","given");return""}},
  {n:"Giữ lời nhắn, chưa đáp",f:"cold",wx:"giữ được thế chờ",lx:"vương thúc cho là ngươi đang cân nhắc lời hắn",rt:"Lời nhắn nằm dưới đáy hộp trang sức.",go:()=>{bdO("thuluc","kept");return""}},
  {n:"Đốt lời nhắn trước mặt người đưa",f:"kin",wx:"vương thúc biết ngươi không mua được",lx:"vương thúc thôi giữ thể diện cho em ngươi",rt:"Lời nhắn cháy trong lò. Người đưa lui ra.",go:()=>{bdO("thuluc","burnt");return""}}]},
 x1:{h:"Hoàng thượng hỏi ý ngươi",w:"emp",t:"Hoàng thượng triệu sứ của vương thúc và người đưa tin của Nê Niết Sư vào cùng một điện. Ngài quay sang ngươi: “Trẫm nên công nhận ai?”",o:[
  {n:"Tâu: chờ {pv} tỉnh, chưa công nhận ai",e:["win","lose"],rt:"Hoàng thượng phán: Đại Hy chỉ biết một chủ ngai vàng là {pv}. Sứ vương thúc tái mặt.",rf:"Sứ vương thúc nói lớn: “Chờ đến khi Đại Thực vào tận Tô Lận sao?” Triều thần xôn xao."},
  {n:"Tâu: Nê Niết Sư là con trưởng của {pv}, xin ban ấn cho em",e:["win2","lose"],rt:"Hoàng thượng ban một tờ chiếu nhận Nê Niết Sư là người nối ngôi. Người đưa tin của em quỳ lạy ngươi.",rf:"Triều thần nói ngươi bênh em ruột; Hoàng thượng gác chiếu lại."},
  {n:"Thưa: việc ngoài ải, thần thiếp không dám nói",e:"mid",lx:"cả hai bên đều thấy lời ngươi chẳng có sức nặng",rt:"Hoàng thượng nhìn ngươi lâu, rồi cho sứ lui."}]}},
 E:{win:{tag:"Ngai vàng chờ {pv}",w:"emp",t:"Đại Hy không công nhận ai khi {pv} còn sống. Vương thúc phải dời phủ ra khỏi kim điện, lùi về đất của nhà mình."},
  win2:{tag:"Ấn của Đại Hy cho Nê Niết Sư",w:"emp",t:"Nê Niết Sư có tờ chiếu của Đại Hy trong tay. Vương thúc không dám động đến em, nhưng cũng không lùi."},
  mid:{tag:"Ngai vàng chưa có chủ",t:"Đại Hy chưa nói gì. Ở {land}, vương thúc và em trai ngươi mỗi người giữ một nửa các đại tộc."},
  lose:{tag:"Vương thúc ghi nhớ ngươi",w:"emp",t:"Sứ vương thúc về tây, mang theo tên ngươi như tên một kẻ thù.",go:(_A,_ok,G)=>e67bien(G[0])}}});
BD97.push({a:"bd_soi",tag:"Phụ vương tỉnh lại",w:"emp",n:"Xin Hoàng thượng cho thần thiếp tự mang thuốc sang kim điện",
 path:["thái y theo sứ","vòng ngọc của mẹ","Hồi thư dạy em","Đốt lời nhắn","Đưa lời nhắn lên Hoàng thượng","chờ {pv} tỉnh"],bad:["Nhận ngựa thay","Giữ lời nhắn, chưa đáp"],x:[()=>S.duc>=BAL.arc.rare.bd_soi.bar,`Đức từ ${BAL.arc.rare.bd_soi.bar}`],
 t:"Ngươi theo sứ đoàn sang tây, mang thang thuốc của Thái y viện và chiếc khăn gấm của {mh}. Đêm thứ ba ở kim điện, {pv} mở mắt, gọi tên ngươi bằng tên thuở nhỏ. Vương thúc quỳ ngoài điện đến sáng. Trước khi ngươi về, {pv} tháo chiếc nhẫn ấn khắc đôi cánh trao cho ngươi: “Con giữ. Tô Lận nhớ ai đã cứu nó.”",
 go:(_A,_ok,G)=>{bdO("ansoi","ta");return e67bien(G[0])},rw:"nt_dongchau",ti:"Người gọi Phụ vương tỉnh lại"});

rdDef("bd_soi",5,{t:"Hai phong thư",w:"emp",sj:"thư của vương thúc và của em trai",cast(A){return rdCast(A,["v"])},
 g:"Mùa xuân, hai phong thư từ Tô Lận đến cung ngươi trong cùng một tuần. Vương thúc Mi Hồ Lan xin một bản chép bản đồ đồn ải phía tây, để đem đổi lấy hòa với Đại Thực. Nê Niết Sư xin chị một lời với Hoàng thượng. Thư nào lên ngự án, thư nào nằm lại, là việc của ngươi.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Vương thúc hứa hẹn",w:"emp",if:()=>RDW(1)()&&rdPrev()!=="win2",t:"Đại Hy chưa công nhận ai, vương thúc phải nhún. Thư của ông ta lời lẽ ngọt: “Cháu gái cho ta bản đồ, ta để Nê Niết Sư làm trấn thủ Tật Lăng, cả nhà yên.”",o:[
  {n:"Trình cả hai phong thư lên Hoàng thượng",f:"honest",wx:"ngài thấy ngươi không giữ gì riêng",lx:"vương thúc biết thư bị trình",rt:"Hoàng thượng đọc hai thư, đặt thư của Nê Niết Sư lên trên.",rf:"Hoàng thượng hỏi: “Thư này đến bằng đường nào?”",go:()=>{bdO("thuluc","given");return""}},
  {n:"Giữ thư vương thúc làm chứng, chưa đáp",f:"hold",wx:"có trong tay chữ ký của vương thúc",lx:"vương thúc chờ, rồi nóng",rt:"Thư vương thúc cất trong hộp ấn của ngươi.",go:()=>{bdO("thuluc","kept");return""}},
  {n:"Đáp thư vương thúc: cháu cần thời gian",f:"wolf",wx:"vương thúc tưởng ngươi đã xiêu",lx:"có chữ của ngươi trong tay vương thúc",rt:"Thư đáp của ngươi đi theo đoàn lạc đà.",go:()=>bdMeet("lie")}]},
 s2:{h:"Nê Niết Sư cảm ơn chị",w:"maid",if:()=>rdPrev()==="win2",t:"Nê Niết Sư gửi theo thư một con chim ưng non: “Ấn của Đại Hy cứu em. Nhưng vương thúc nói ấn ấy là của chị, không phải của em.”",o:[
  {n:"Viết cho em: ấn là của em, chị chỉ xin hộ",f:"honest",wx:"Nê Niết Sư vững lòng",lx:"vương thúc đọc được thì lấy làm cớ",rt:"Nê Niết Sư đọc thư trước hội đồng quý tộc.",go:()=>{bdO("chimung","ta");return bdMeet("olac")}},
  {n:"Viết cho em: mọi lệnh phải hỏi chị trước",f:"hold",wx:"không ai lừa được em",lx:"các đại tộc nói Nê Niết Sư là con rối",rt:"Nê Niết Sư nghe lời, mỗi lệnh đều gửi thư hỏi.",go:()=>bdO("chimung","ta")},
  {n:"Gửi người dạy em đọc sổ quân",f:"wolf",wx:"em biết quân mình có bao nhiêu",lx:"người của ngươi trong phủ em",rt:"Một lão thư lại của sứ quán theo đoàn lạc đà sang tây.",go:()=>bdO("chimung","ta")}]},
 s3:{h:"Thư của vương thúc không còn ngọt",w:"emp",if:RDW(0),t:"Vương thúc thấy Đại Hy im lặng, nên viết thẳng: “Bản đồ đồn ải, hoặc Nê Niết Sư sẽ trúng tên như cha nó.”",o:[
  {n:"Trình thư dọa lên Hoàng thượng",f:"honest",wx:"ngài có cớ cảnh cáo vương thúc",lx:"vương thúc biết không lay được ngươi",rt:"Hoàng thượng sai Lễ bộ gửi sang tây một tờ quở.",rf:"Hoàng thượng chỉ nói: “Việc trong nhà của họ.”",go:()=>{bdO("thuluc","given");return""}},
  {n:"Giữ thư dọa, chờ ngày dùng",f:"hold",wx:"có chữ dọa của vương thúc trong tay",lx:"Nê Niết Sư vẫn trong vòng nguy",rt:"Thư dọa nằm chung với thư cũ.",go:()=>{bdO("thuluc","kept");return""}},
  {n:"Gửi người về giữ cho Nê Niết Sư",f:"wolf",wx:"em có người canh",lx:"bạc ra, người đi đường xa",rt:"Hai kỵ sĩ của sứ quán sang tây, ngủ ngoài cửa phủ Nê Niết Sư."}]},
 c1:{h:"Lão thư lại Binh bộ",w:"emp",t:"Bản đồ đồn ải nằm trong kho Binh bộ. Một lão thư lại giữ kho mang ơn {pv} từ thời làm sứ, lão nhắn: muốn chép thì lão để cửa kho mở một đêm.",o:[
  {n:"Bảo lão khóa kho, quên chuyện ấy",wx:"tay sạch",lx:"lão thấy ngươi không tin",rt:"Lão thư lại thở phào."},
  {n:"Nhờ lão chép một bản, cất ở chỗ lão",wx:"có bản đồ mà không qua tay ngươi",lx:"bản chép ở trong tay người khác",rt:"Lão chép trong ba đêm, cất dưới sàn nhà mình.",go:()=>{bdO("bando","kept");return""}},
  {n:"Nhờ lão chép một bản sai các đồn",wx:"có thứ để đưa vương thúc",lx:"lão sợ",rt:"Lão chép, đổi chỗ năm đồn.",rf:"Lão chép sai cả chỗ mình không định sai.",go:()=>{bdO("bando","false");return""}}]},
 c2:{h:"{v} và người nhà ở Binh bộ",w:"v",need:["v"],t:"Người nhà {v} làm Thị lang Binh bộ. {v} vô tình kể: kho bản đồ sắp kiểm lại, ai chép trộm sẽ lộ.",o:[
  {n:"Cảm ơn {v} đã nhắc",wx:"{v} tưởng ngươi không dính",lx:"{v}: thiện cảm +",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} cười, không nói thêm."},
  {n:"Hỏi {v} ngày kiểm kho",wx:"biết trước",lx:"{v} nghi",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return""},rt:"{v} nói ngày, như không để ý.",rf:"{v} nhìn ngươi: “Phi tần hỏi kho Binh bộ làm gì?”"},
  {n:"Kể với {v} chuyện vương thúc đòi bản đồ",wx:"có người làm chứng ngươi không giấu",lx:"việc nhà lọt ra ngoài",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nghe, rồi về kể với người nhà ở Binh bộ."}]},
 t1:{h:"Người của vương thúc chờ hồi âm",w:"maid",t:"Người đưa thư của vương thúc trọ ở Hội Đồng quán, đã chờ mười ngày. Hắn nhắn: không có hồi âm thì hắn về tay không, và vương thúc sẽ hiểu.",o:[
  {n:"Gửi lời: không có bản đồ nào",f:"honest",wx:"vương thúc biết rõ ý ngươi",lx:"vương thúc thôi nể",rt:"Người đưa thư về tây tay không."},
  {n:"Cho hắn chờ thêm",f:"hold",wx:"vương thúc chưa động",lx:"hắn đi lại Hội Đồng quán, dễ bị để ý",rt:"Người đưa thư ở lại thêm một tháng."},
  {n:"Gửi hắn một lời hứa không ký tên",f:"wolf",wx:"vương thúc tin ngươi đang lo",lx:"lời hứa có thể bị dùng",rt:"Hắn mang lời hứa về tây."}]},
 x1:{h:"Ngày kiểm kho Binh bộ",w:"emp",t:"Sáng mai Binh bộ kiểm kho. Đêm nay là đêm cuối để quyết bản đồ đi đâu, hoặc không đi đâu cả.",o:[
  {n:"Giữ bản đồ, không trao ai",e:["win","lose"],rt:"Lão thư lại đưa bản chép về cung ngươi, giấu trong rương áo cưỡi. Sáng ra kho đủ, không ai biết có bản thứ hai.",rf:"Binh bộ đếm thấy dấu mực mới trên bản gốc. Lão thư lại bị hỏi.",go:()=>{bdO("bando","kept");return""}},
  {n:"Đưa vương thúc bản đồ giả",e:["win","lose"],rt:"Bản đồ sai năm đồn theo người đưa thư về tây. Kẻ nào mua nó sẽ đánh vào chỗ không có ai.",rf:"Người đưa thư bị khám ở biên ải, bản đồ giả rơi vào tay Binh bộ.",go:()=>{bdO("bando","false");return""}},
  {n:"Đốt bản chép, trình lão thư lại lên Hoàng thượng xin tha",e:["mid","lose"],rt:"Bản chép thành tro. Hoàng thượng tha lão thư lại, khen ngươi thật thà.",rf:"Lão thư lại bị cách chức, oán ngươi.",go:()=>{bdO("bando","burnt");return""}}]}},
 E:{win:{tag:"Bản đồ trong tay ngươi",w:"emp",t:"Bản đồ đồn ải ở chỗ ngươi chọn. Vương thúc chờ, Nê Niết Sư chờ, và chỉ ngươi biết tờ giấy ấy nằm ở đâu."},
  mid:{tag:"Không còn bản đồ",t:"Không còn bản chép nào. Vương thúc phải tìm đường khác, và ông ta sẽ tìm."},
  lose:{tag:"Dấu mực mới",w:"emp",t:"Binh bộ biết có người đã chép bản đồ. Chưa ai nói tên ngươi, nhưng người ta đã nhìn về phía cung ngươi.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",6,{t:"Sứ giả mang dao",w:"emp",sj:"Đạt Lỗ của sứ đoàn vương thúc",cast(A){return rdCast(A,["v"])},
 g:"Sứ đoàn vương thúc vào kinh dâng cống mùa hạ. Trong đoàn có Đạt Lỗ, vệ sĩ của vương thúc, giắt một con dao cong trong ủng. Người của Nê Niết Sư cũng đang ở Hội Đồng quán.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bạc Đồ thấy con dao",w:"maid",if:RDW(1),t:"Mã phu {land} ở Thượng tứ viện nhắn: lúc dắt ngựa của sứ đoàn, y thấy Đạt Lỗ lau một con dao cong, lưỡi bôi thứ gì đen đen.",o:[
  {n:"Cho người canh người của Nê Niết Sư",f:"guard",wx:"em trai có người giữ ở kinh",lx:"Đạt Lỗ biết bị canh",rt:"Hai thị vệ cung ngươi đứng ngoài phòng người của Nê Niết Sư.",go:()=>{bdMove("thatmoc","kinh");return bdMeet("thatmoc")}},
  {n:"Báo Hồng Lô tự khám sứ đoàn",f:"law",go:()=>bdMove("thatmoc","kinh"),wx:"việc theo phép",lx:"vương thúc nói Đại Hy làm nhục sứ",rt:"Hồng Lô tự khám, thu được con dao.",rf:"Hồng Lô tự khám, không thấy dao đâu."},
  {n:"Mời Đạt Lỗ vào cung uống rượu",f:"turn",wx:"biết mặt kẻ cầm dao",lx:"liều",rt:"Đạt Lỗ đến, uống, nhìn ngươi lâu.",go:()=>{bdMove("thatmoc","kinh");return bdMeet("thatmoc")}}]},
 s2:{h:"Người của Nê Niết Sư bị thương",w:"maid",if:RDW(0),t:"Đêm đầu tiên, người đưa tin của Nê Niết Sư bị đâm ở hành lang Hội Đồng quán, may chưa chết. Ai cũng biết là Đạt Lỗ, không ai thấy.",o:[
  {n:"Đưa người bị thương vào nhờ thái y",f:"guard",go:()=>bdMove("thatmoc","kinh"),wx:"cứu được người",lx:"cả cung biết ngươi dính vào",rt:"Thái y khâu vết thương. Y sống.",rf:"Thái y đến muộn, y mê man."},
  {n:"Xin Hình bộ điều tra",f:"law",go:()=>bdMove("thatmoc","kinh"),wx:"việc theo phép",lx:"chậm",rt:"Hình bộ cho người đến Hội Đồng quán."},
  {n:"Sai người theo dõi Đạt Lỗ",f:"turn",go:()=>bdMove("thatmoc","kinh"),wx:"biết hắn đi đâu",lx:"người theo có thể bị giết",rt:"Đạt Lỗ ra Tây Thị, gặp một người lạ ở hiệu thuốc."}]},
 c1:{h:"Thuốc độc ở hiệu thuốc",w:"maid",t:"Hiệu thuốc phía tây chợ bán cho Đạt Lỗ một gói rễ ô đầu. Chủ hiệu sợ, nói với cung nữ của ngươi.",o:[
  {n:"Bỏ bạc mua lời khai của chủ hiệu",wx:"có lời khai",lx:"bạc ra",rt:"Chủ hiệu ký lời khai, giấu tên."},
  {n:"Bảo chủ hiệu tráo gói thuốc lần sau",wx:"dao của Đạt Lỗ thành vô hại",lx:"chủ hiệu run",rt:"Lần sau, Đạt Lỗ mua phải bột rễ cam thảo.",rf:"Chủ hiệu tráo vụng, Đạt Lỗ nghi."},
  {n:"Để chủ hiệu yên, không dính vào",wx:"không lộ",lx:"thuốc vẫn ở tay Đạt Lỗ",rt:"Ngươi không hỏi thêm."}]},
 c2:{h:"{v} gặp sứ đoàn",w:"v",need:["v"],t:"Người nhà {v} ở Binh bộ ăn yến với sứ đoàn vương thúc. {v} khoe với ngươi: “Vương thúc ngươi hào phóng thật.”",o:[
  {n:"Nhắc {v}: quà của kẻ tranh ngai có giá",wx:"{v} dè chừng",lx:"{v} cho là ngươi dọa",go:(A,ok,G)=>{ok?rdRel(A,"v",G[0]):rdOan(A,"v",G[1]);return""},rt:"{v} cất món quà vào kho, không đeo.",rf:"{v} cười: “Ngươi ghen với vương thúc ngươi à?”"},
  {n:"Hỏi {v} vương thúc tặng gì",wx:"biết vương thúc mua ai",lx:"{v} thấy ngươi để ý",rt:"{v} kể: một bình bạc đầu ngựa và hai tấm gấm dệt chim."},
  {n:"Không nói gì",wx:"không gây chuyện",lx:"Binh bộ nghiêng về vương thúc",rt:"Ngươi uống trà, đổi chuyện."}]},
 t1:{h:"Đạt Lỗ tìm đến",w:"emp",t:"Đạt Lỗ lén đến cửa sau cung ngươi lúc canh ba. Hắn không mang dao: “Vương thúc hứa cho tiểu nhân một thái ấp. Công chúa trả hơn không?”",o:[
  {n:"Nghe hắn nói hết",f:"turn",wx:"biết vương thúc sai hắn làm gì",lx:"có người thấy hắn vào cung ngươi",rt:"Đạt Lỗ khai: dao là cho người của Nê Niết Sư, và cho ngươi nếu ngươi cản.",go:()=>bdMeet("thatmoc")},
  {n:"Gọi thị vệ bắt hắn",f:"law",wx:"bắt được kẻ cầm dao",lx:"vương thúc nói ngươi bày bẫy",rt:"Thị vệ trói Đạt Lỗ ngay ở cửa.",rf:"Đạt Lỗ vượt tường chạy thoát."},
  {n:"Đuổi hắn đi, không nói gì",f:"guard",wx:"không dính vào",lx:"hắn đi với dao",rt:"Đạt Lỗ lùi vào bóng tối."}]},
 x1:{h:"Đêm cuối của sứ đoàn",w:"emp",t:"Đêm cuối của sứ đoàn, Đạt Lỗ bị cấm quân bắt ở hành lang Hội Đồng quán, trong tay có dao. Hoàng thượng giao hắn cho ngươi định.",o:[
  {n:"Bắt sống Đạt Lỗ, đổi lòng y",e:["win","lose"],rt:"Đạt Lỗ quỳ: từ nay hắn là tai mắt của ngươi trong sứ đoàn vương thúc.",rf:"Đạt Lỗ giả vờ nghe, về đến Tô Lận thì kể hết với vương thúc.",go:()=>bdMove("thatmoc","tn")},
  {n:"Tha Đạt Lỗ, gửi về kèm lời nhắn",e:["win","mid"],rt:"Đạt Lỗ mang về cho vương thúc một câu của ngươi: “Dao của thúc, cháu trả lại. Lần sau, Đại Hy không trả.”",rf:"Vương thúc nghe lời nhắn, cười lớn.",go:()=>bdMove("thatmoc","tn")},
  {n:"Chém Đạt Lỗ, gửi đầu về Tô Lận",e:["win","lose"],rt:"Đầu Đạt Lỗ theo xe sứ về tây. Các nhà quý tộc nhỏ rùng mình, có hai nhà quay về với Nê Niết Sư.",rf:"Vương thúc treo đầu Đạt Lỗ trước cổng phủ, gọi đó là thù của Đại Hy.",go:()=>bdKill("thatmoc")}]}},
 E:{win:{tag:"Dao không tới được em",w:"emp",t:"Người của Nê Niết Sư sống, sứ đoàn vương thúc về tây với một bài học. Ở kinh, không ai dám mang dao đến gần người {land} của ngươi."},
  mid:{tag:"Dao trả về chủ",t:"Sứ đoàn đi, con dao đi theo. Vương thúc biết ngươi đã thấy nó."},
  lose:{tag:"Thù chồng thêm thù",w:"emp",t:"Vương thúc có cớ nói Đại Hy giết người của ông. Mùa thu này, sứ của ông sẽ sang cầu hòa với Đại Thực.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",7,{t:"Tây Thị bị chặn đường tơ lụa",w:"emp",sj:"đường tơ lụa và Tây Thị",cast(A){return rdCast(A,["v"])},
 g:"Đại Thực chặn đường tơ lụa phía tây; đường còn lại đi qua đất vương thúc, và ông khóa nó cho đến khi Đại Hy công nhận ông. Thương nhân {land} ở Tây Thị đóng cửa hiệu. Người nhà {v} trong Binh bộ dâng sớ xin xuất binh.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Vương thúc đề nghị giao kèo",w:"emp",if:RDW(1),t:"Vương thúc gửi sứ: đường buôn mở lại, nếu Đại Hy chịu gả một công chúa cho con trai ông và gọi ông là chủ kim điện.",o:[
  {n:"Khước từ giao kèo đường buôn của vương thúc",f:"own",wx:"vương thúc không được thứ ông muốn",lx:"đường buôn còn đóng",rt:"Ngươi tâu Hoàng thượng: lụa có thể đi đường khác, ngai vàng thì không bán được."},
  {n:"Xin mở lại đường buôn bằng một hòa ước nhỏ",f:"peace",wx:"lạc đà lại về Tây Thị",lx:"vương thúc có được một chữ ký",rt:"Lễ bộ thảo một tờ ước chỉ nói chuyện buôn, không nói chuyện ngai.",rf:"Vương thúc không nhận ước nhỏ."},
  {n:"Khuyên triều đình xuất binh",f:"war",wx:"Binh bộ đứng về phía ngươi",lx:"chiến sự là con dao hai lưỡi",rt:"Người nhà {v} ngạc nhiên thấy ngươi cùng ý với họ."}]},
 s2:{h:"Binh bộ đổ tội",w:"v",if:RDW(0),t:"Binh bộ nói thẳng trước triều: Tây Thị vắng hàng vì phi tần {land} không giữ được nhà mình. Người nhà {v} đọc sớ.",o:[
  {n:"Xin Hoàng thượng cho thần thiếp viết thư cho các đại quý tộc",f:"own",wx:"các đại tộc nghe tiếng ngươi",lx:"thư có thể không ai đọc",rt:"Bảy vị đại quý tộc nhận thư. Ba người hồi âm.",rf:"Thư đi mà không ai trả lời."},
  {n:"Xin mở một đường buôn khác qua Tật Lăng, xa đất vương thúc",f:"peace",wx:"Tây Thị có hàng từ đường khác",lx:"đường xa, tốn bạc",rt:"Đường Tật Lăng mở, họ ngoại của ngươi dắt lạc đà đến."},
  {n:"Đứng về phía Binh bộ: phải đánh",f:"war",wx:"Binh bộ: oán −",lx:"người {land} gọi ngươi là kẻ phản",rt:"Người nhà {v} gật đầu, sớ của họ bớt nhắc tên ngươi."}]},
 c1:{h:"Họ ngoại của ngươi",w:"maid",t:"Họ ngoại của ngươi là một nhà buôn lớn, đóng trại ở ải tây, còn trung thành với {pv}. Họ có lạc đà và hàng, nhưng sợ vương thúc.",o:[
  {n:"Viết thư hứa Đại Hy che chở họ",wx:"họ dám đưa hàng sang",lx:"hứa thay Hoàng thượng",rt:"Họ ngoại đưa ba trăm con lạc đà chở hàng về Tây Thị.",rf:"Họ ngoại xin thêm thời gian."},
  {n:"Gửi bạc mua hàng của họ",wx:"hàng về mà không phải hứa",lx:"bạc ra",rt:"Bạc đi, hàng về."},
  {n:"Để họ yên",wx:"không kéo họ vào",lx:"Tây Thị vẫn vắng hàng",rt:"Ngươi không viết thư nào."}]},
 c2:{h:"Người nhà {v} ở Binh bộ",w:"v",need:["v"],t:"Người nhà {v} muốn được làm tướng nếu xuất binh. {v} nói với ngươi: “Ngươi tâu một câu, nhà ta nhớ ơn.”",o:[
  {n:"Hứa tâu giúp",wx:"nhà {v} nợ ngươi",lx:"nếu thua trận, tên ngươi đi kèm",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nắm tay ngươi cảm ơn."},
  {n:"Từ chối: binh quyền không phải việc phi tần",wx:"tay sạch",lx:"{v}: oán +",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} quay đi."},
  {n:"Ra điều kiện: nhà {v} phải để đường buôn Tật Lăng yên",wx:"đổi được một điều",lx:"{v} thấy ngươi mặc cả",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nhận lời.",rf:"{v} không nhận."}]},
 t1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Đêm ấy Hoàng thượng hỏi riêng: “Nếu trẫm đánh vương thúc nàng, nàng có trách trẫm không?”",o:[
  {n:"Thưa: vương thúc không phải là {land}",f:"war",wx:"ngài yên lòng nếu phải đánh",lx:"người {land} nghe được thì buồn",rt:"Hoàng thượng gật đầu, im lặng."},
  {n:"Thưa: xin ngài đánh bằng chợ, đừng bằng gươm",f:"peace",wx:"ngài nghĩ đến cách khác",lx:"Binh bộ cho là ngươi yếu",rt:"Hoàng thượng cười: “Nàng buôn giỏi hơn Hộ bộ.”"},
  {n:"Thưa: thần thiếp chỉ xin ngài đừng hỏi thần thiếp việc ấy",f:"own",wx:"ngài thương ngươi",lx:"ngài quyết mà không có ngươi",rt:"Hoàng thượng ôm ngươi, không hỏi nữa."}]},
 x1:{h:"Phiên triều về đường tơ lụa",w:"emp",t:"Phiên triều đông nhất mùa hạ. Binh bộ xin binh, Lễ bộ xin hòa, Hộ bộ xin mở đường buôn. Hoàng thượng cho thái giám về cung hỏi ngươi một câu.",o:[
  {n:"Gửi lời: mở đường buôn qua Tật Lăng, khóa đường của vương thúc",e:["win","lose"],rt:"Đường Tật Lăng mở, đường của vương thúc bị khóa. Lạc đà của các nhà trung thành về Tây Thị; đất vương thúc ứ hàng.",rf:"Các nhà buôn sợ vương thúc, không dám đi đường Tật Lăng."},
  {n:"Gửi lời: xin xuất binh ra ải",e:["win","lose"],rt:"Năm nghìn kỵ binh Đại Hy ra An Tây. Vương thúc mở đường sau mười ngày.",rf:"Quân ra An Tây, vương thúc không sợ. Hai bên giằng co."},
  {n:"Gửi lời: thần thiếp xin không nói",e:"mid",lx:"triều đình quyết mà không có ngươi",rt:"Hoàng thượng cho hoãn, Tây Thị vẫn vắng hàng."}]}},
 E:{win:{tag:"Đường buôn theo ý ngươi",w:"emp",t:"Lạc đà lại về Tây Thị, theo con đường ngươi chọn. Vương thúc biết đường tơ lụa không còn là con bài của riêng ông."},
  mid:{tag:"Tây Thị vẫn vắng hàng",t:"Đường buôn vẫn đóng. Binh bộ chờ, vương thúc chờ, và mùa thu đến gần."},
  lose:{tag:"Biên ải giằng co",w:"emp",t:"Quân hai bên đứng nhìn nhau qua ải. Binh bộ ghi tên ngươi vào sớ.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",8,{t:"Vương hậu vào kinh",w:"emp",sj:"{mh} lánh nạn ở kinh thành",cast(A){return rdCast(A,["v"])},
 g:"Vương thúc vây phủ {mh}. Bà trốn khỏi Tô Lận với mười kỵ sĩ, theo đoàn lạc đà đến cửa ải xin vào kinh. Che chở bà là việc của một người con, nhưng vương thúc sẽ coi đó là cớ.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"{mh} đến cửa ải",w:"emp",if:RDW(1),t:"Tổng binh Ngọc Môn quan gửi tấu gấp: {mh} của {land} đang ở ngoài cửa ải, xin vào. Vương thúc gửi thư: ai cho bà vào là kẻ thù.",o:[
  {n:"Xin Hoàng thượng mở ải đón {mh}",f:"open",wx:"{mh} được vào",lx:"vương thúc có cớ",rt:"Cửa ải mở. {mh} vào kinh bằng xe của Lễ bộ, ở nhà khách Lễ bộ.",go:()=>bdMove("kd","kinh")},
  {n:"Xin đón {mh} vào lén, không lễ",f:"quiet",wx:"bà vào mà không ồn",lx:"bà phải vào như kẻ trốn",rt:"{mh} vào kinh trong xe chở cỏ, ở tạm đền Hỏa Tiên ngoài thành.",go:()=>{RD_FL("bd_soi.chua",1);return bdMove("kd","kinh")}},
  {n:"Gửi người đưa {mh} sang trại họ ngoại",f:"send",wx:"bà an toàn mà Đại Hy không dính",lx:"bà ở xa ngươi",rt:"{mh} sang trại của họ ngoại ở ải tây.",go:()=>bdMove("kd","ai")}]},
 s2:{h:"{mh} đã ở ngoài thành",w:"maid",if:RDW(0),t:"{maid} báo: có một bà già người {land} quỳ trước cửa Kim Quang, nói là mẹ của phi tần {land}. Lính cửa không cho vào.",o:[
  {n:"Tự ra cửa thành đón mẹ",f:"open",wx:"cả kinh thành thấy ngươi đón mẹ",lx:"phi tần ra cửa thành là việc lớn",rt:"Ngươi quỳ trước mẹ giữa cửa Kim Quang. Lính cửa quỳ theo.",rf:"Thái giám giữ ngươi lại ở cửa cung. Đến tối, Lễ bộ mới cho {mh} vào tạm đền Hỏa Tiên ngoài thành.",go:(A,ok)=>{if(!ok)RD_FL("bd_soi.chua",1);return bdMove("kd","kinh")}},
  {n:"Sai người đưa {mh} vào đền Hỏa Tiên ngoài thành",f:"quiet",wx:"bà có chỗ ở",lx:"bà không được vào kinh",rt:"{mh} nghỉ ở đền, ngươi gửi áo ấm và sữa.",go:()=>{RD_FL("bd_soi.chua",1);return bdMove("kd","kinh")}},
  {n:"Gửi bạc, xin bà về ải tây",f:"send",wx:"không có cớ cho vương thúc",lx:"bà buồn",rt:"{mh} nhận bạc, khóc, rồi lên đường về tây, ở trại họ ngoại.",go:()=>bdMove("kd","ai")}]},
 c1:{h:"Đội kỵ sĩ của {mh}",w:"emp",if:()=>BDKD()==="kinh",t:"Mười kỵ sĩ theo {mh} xin được giữ gươm. Lễ bộ nói người ngoại quốc không được mang gươm trong kinh.",o:[
  {n:"Xin cho đội vệ của {mh} mang gươm",wx:"bà có người giữ",lx:"triều thần sợ",rt:"Hoàng thượng chuẩn: mười gươm, không hơn."},
  {n:"Đổi kỵ sĩ lấy thị vệ Đại Hy",wx:"không ai nói gì",lx:"bà sống giữa người lạ",rt:"Mười kỵ sĩ giao gươm. Thị vệ Đại Hy đứng ngoài cửa bà."},
  {n:"Bỏ bạc thuê vệ sĩ trong kinh cho bà",wx:"bà có người giữ mà không mang gươm",lx:"bạc ra",rt:"Sáu vệ sĩ thuê ở tiêu cục đứng ngoài cửa bà."}]},
 c2:{h:"{v} nói {mh} là gián điệp",w:"v",need:["v"],if:()=>BDKD()==="kinh",t:()=>"{v} nói với Thái hậu: “{mh} {land} ở "+(RD_FL("bd_soi.chua")?"ngoài thành":"ngay trong kinh")+", ai biết bà gặp những ai?”",o:[
  {n:"Mời {v} đến thăm {mh}",wx:"{v} tận mắt thấy bà chỉ là một người mẹ",lx:"{v} có thể nói thêm",go:(A,ok,G)=>{ok?rdRel(A,"v",G[0]):rdOan(A,"v",G[1]);return""},rt:"{v} về, không nói thêm.",rf:"{v} về kể bà nói tiếng {land} với người lạ."},
  {n:"Xin Thái hậu cử người canh {mh}",wx:"không ai còn cớ",lx:"mẹ ngươi bị canh như tù",rt:"Thái hậu cử hai ma ma đến ở cùng {mh}."},
  {n:"Thưa: mẹ thần thiếp gặp con gái mình",wx:"giữ được thể diện",lx:"{v}: oán +",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Thái hậu gật, {v} im."}]},
 c3:{h:"Đội kỵ sĩ của {mh} ở ải tây",w:"emp",if:()=>BDKD()!=="kinh",t:"Mười kỵ sĩ theo {mh} giữ trại bà ở chỗ họ ngoại. Tổng binh ải tây tâu về: có cho người của {mh} mang gươm ra vào ải không.",o:[
  {n:"Xin cho đội vệ của {mh} mang gươm ra vào ải",wx:"bà có người giữ",lx:"Binh bộ sợ",rt:"Hoàng thượng chuẩn: mười gươm, không hơn."},
  {n:"Xin lính ải Đại Hy canh trại bà",wx:"không ai nói gì",lx:"bà sống giữa người lạ",rt:"Mười kỵ sĩ giao gươm. Lính ải Đại Hy đứng ngoài trại bà."},
  {n:"Bỏ bạc thuê người của họ ngoại canh trại cho bà",wx:"bà có người giữ mà Đại Hy không dính",lx:"bạc ra",rt:"Sáu tay cung của họ ngoại đứng ngoài trại bà."}]},
 t1:{h:"Vương thúc đòi người",w:"emp",t:()=>BDKD()==="kinh"?"Thư vương thúc đến: “Trả {mh} về, hoặc đường buôn không bao giờ mở lại.”":"Thư vương thúc đến: “Họ ngoại giấu {mh} ở ải tây. Trả bà về, hoặc đường buôn không bao giờ mở lại.”",o:[
  {n:"Xin Hoàng thượng đáp: {mh} là khách của Đại Hy",f:"open",wx:"cả Tô Lận biết Đại Hy che chở bà",lx:"vương thúc có cớ đánh",rt:"Thư đáp đóng ấn Đại Hy về tây."},
  {n:"Đáp thư bằng lời mẹ: bà chỉ đến thăm con",f:"quiet",wx:"vương thúc không có cớ",lx:"lời nói có thể không đủ",rt:"{mh} tự viết thư, giọng bình thản."},
  {n:"Dùng {mh} làm mồi nhử",f:"bait",wx:"vương thúc sẽ sai người đến, và sẽ bị bắt",lx:"mẹ ngươi ở trong vòng nguy",rt:"Ngươi để lộ tin {mh} sắp về ải. Người của vương thúc đến chặn đường."}]},
 x1:{h:"Đêm có người đến",w:"emp",t:()=>"Đêm rằm, "+(BDKD()!=="kinh"?"tin gấp từ ải tây: có người lạ lảng vảng quanh trại họ ngoại nơi {mh} ở. Lính ải ở xa.":"có người lạ trèo tường "+BDKDAT()+" nơi {mh} ở. Cấm quân ở xa.")+" Ngươi được báo trước một khắc.",o:[
  {n:"Đón {mh} vào cung, công khai",e:["win","lose"],rt:()=>"{mh} vào ở cung ngươi, có chiếu của Hoàng thượng. Kẻ lạ bị bắt ở "+(BDKD()!=="kinh"?"trại":BDKDAT())+" trống.",rf:"Trên đường vào cung, xe của bà bị chặn. Bà bị thương nhẹ.",go:()=>{RD_FL("bd_soi.chua",0);return bdMove("kd","kinh")}},
  {n:"Phục sẵn thị vệ, bắt người của vương thúc",e:["win","lose"],rt:"Năm người của vương thúc bị bắt sống. Chúng khai vương thúc sai giết {mh}.",rf:"Người của vương thúc thoát hai tên. Bà bị kinh hãi, ốm nặng."},
  {n:"Đưa {mh} về ải tây trong đêm",if:()=>BDKD()==="kinh",e:["mid","lose"],rt:"{mh} về trại họ ngoại an toàn. Kinh thành không có chuyện gì.",rf:"Xe của bà bị theo dõi đến tận ải.",go:()=>bdMove("kd","ai")},
  {n:"Đưa {mh} theo đoàn lạc đà của họ ngoại đi trong đêm",if:()=>BDKD()!=="kinh",e:["mid","lose"],rt:"Họ ngoại nhổ trại, đưa {mh} sang một ốc đảo khác dọc ải tây. Kẻ lạ mất dấu.",rf:"Kẻ lạ bám theo đoàn lạc đà suốt đêm.",go:()=>bdMove("kd","ai")}]}},
 E:{win:{tag:"Mẹ ở bên ngươi",w:"emp",t:()=>"{mh} ở "+(BDKD()==="kinh"?"kinh":"ải tây")+", có Đại Hy che chở. Cả Tô Lận biết vương thúc đã sai người giết {mh}, và đã thất bại."},
  mid:{tag:"Mẹ ở xa",t:"{mh} ở trại họ ngoại. Bà an toàn, ngươi yên lòng một nửa."},
  lose:{tag:"Mẹ bị thương",w:"emp",t:"{mh} bị thương, phải nằm. Vương thúc có cớ nói Đại Hy không giữ được khách của mình.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",9,{t:"Trận mã cầu chọn ngôi",w:"emp",sj:"trận mã cầu trước hội đồng quý tộc",cast(A){return rdCast(A,["v"])},
 g:"Hội đồng quý tộc họp ở Tô Lận: theo lệ cổ, nhà nào thắng trận mã cầu mùa hạ trước hội đồng thì có tiếng nói về ngai vàng. Vương thúc cử con trai mình. Nê Niết Sư còn non tay gậy. Trận đấu mở sau một tuần trăng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Hội đồng quý tộc gọi tên ngươi",w:"emp",if:RDW(1),t:"Thư hội đồng quý tộc đến: theo lệ, con gái của {pv} cũng được ra sân. Nếu ngươi ra, các đại tộc sẽ đến xem.",o:[
  {n:"Xin Hoàng thượng cho về dự hội",f:"self",wx:"các đại tộc được thấy ngươi",lx:"đi xa là liều",rt:"Hoàng thượng do dự rất lâu, rồi chuẩn, với một trăm kỵ binh hộ tống.",rf:"Hoàng thượng không chuẩn."},
  {n:"Chọn một dũng sĩ đánh cầu thay em",f:"champ",wx:"Nê Niết Sư có người đánh giỏi",lx:"người thay là người ngoài",rt:"Ngươi chọn một tay cầu của họ ngoại."},
  {n:"Gửi Ngọc Câu cho em cưỡi",f:"gift",wx:"Nê Niết Sư có ngựa tốt nhất",lx:"ngươi xa con ngựa của mình",rt:"Ngọc Câu theo đoàn lạc đà sang tây.",go:()=>bdMove("tuyetcau","tn")}]},
 s2:{h:"Nê Niết Sư xin chị chỉ cách",w:"maid",if:RDW(0),t:"Nê Niết Sư viết: “Em ngã ngựa hai lần khi tập. Vương thúc cười. Chị dạy em.”",o:[
  {n:"Viết cho em cách giữ gậy khi ngựa phi",f:"self",wx:"em cưỡi vững hơn",lx:"thư không thay được người dạy",rt:"Nê Niết Sư tập theo thư, ngã ít hơn."},
  {n:"Gửi Bạc Đồ sang dạy em",f:"champ",wx:"em có thầy",lx:"Thượng tứ viện mất người",rt:"Bạc Đồ sang tây theo đoàn lạc đà.",go:()=>bdMove("bado","tn")},
  {n:"Gửi em bộ yên của mình",f:"gift",wx:"em ngồi vững",lx:"đồ của phi tần ra khỏi cung",rt:"Bộ yên của ngươi theo thư sang tây.",go:()=>bdO("yen","olac")}]},
 c1:{h:"Người chấm trận",w:"emp",t:"Ba vị đại quý tộc chấm trận mã cầu. Một người là chỗ thân tình cũ của {pv}, một người theo vương thúc, một người chưa nghiêng bên nào.",o:[
  {n:"Gửi quà cho người chưa nghiêng",wx:"có thêm một phiếu",lx:"quà có thể bị lộ",rt:"Vị quý tộc nhận quà, gửi lời cảm ơn {mh}."/*bd6b: a message, wherever she is*/},
  {n:"Mua chuộc người chấm của vương thúc",wx:"vương thúc mất một phiếu",lx:"bị lộ thì cả hội đồng nói ngươi gian",rt:"Người chấm của vương thúc nhận vàng, hứa giữ miệng.",rf:"Người chấm của vương thúc nhận vàng, rồi đưa thư cho vương thúc xem.",go:()=>{RD_FL("bd_soi.bribe",1);return""}},
  {n:"Viết thư cho cả ba, xin xét công bằng",wx:"không ai nói được ngươi gian",lx:"không đổi được gì",rt:"Ba vị đại quý tộc nhận thư, không trả lời."}]},
 c2:{h:"{v} nói chuyện mã cầu",w:"v",need:["v"],t:"{v} cười trong yến: “Phi tần mà về Tô Lận đánh mã cầu, thì Đại Hy gọi là gì?”",o:[
  {n:"Đáp: gọi là giữ yên biên ải",wx:"cả yến nghe ngươi",lx:"{v} bị bẽ",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng thượng cười, nâng chén."},
  {n:"Cười, không đáp",wx:"không gây chuyện",lx:"lời {v} ở lại",rt:"Yến tiếp tục."},
  {n:"Mời {v} theo xem trận mã cầu",wx:"{v} tò mò",lx:"phải lo thêm một người",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} không đi, nhưng lần đầu hỏi về sông Đạt Hạt.",rf:"{v} nói: “Ta không đi chỗ cát bay.”"}]},
 c3:{h:"Cờ của hoàng tử",w:"emp",if:BDSON,t:"Con trai ngươi, hoàng tử, đã biết cưỡi ngựa. Hội đồng quý tộc nói: con của con gái {pv} cũng có máu ngai vàng.",o:[
  {n:"Cho tay cầu mang cờ của hoàng tử",wx:"cả Tô Lận nhớ tên con ngươi",lx:"Đại Hy lo hoàng tử bị kéo về tây",rt:"Cờ hoàng tử thêu chim thần có cánh, sẽ đi đầu trận đấu."},
  {n:"Gửi hội đồng quý tộc một bức thư hoàng tử viết",wx:"các đại tộc biết con ngươi",lx:"triều thần dị nghị",rt:"Hoàng tử viết bằng chữ {land} ngươi dạy."},
  {n:"Giữ hoàng tử ra khỏi việc này",/*bd6c: a person, not an object*/wx:"con ngươi yên",lx:"các đại tộc quên con ngươi",rt:"Ngươi không nhắc đến con."}]},
 t1:{h:"Đêm trước trận",w:"maid",t:"Đêm trước trận, có tin: con ngựa của Nê Niết Sư bị đầu độc. Người làm là ai, ai cũng đoán được.",o:[
  {n:"Gửi gấp con ngựa tốt nhất của mình",f:"gift",wx:"em có ngựa",lx:"ngựa đi xa, mệt",rt:()=>bdP("tuyetcau","w")==="kinh"?"Ngọc Câu tới Tô Lận lúc gà gáy.":"Ngọc Câu đã ở chỗ em; con ngựa ô của ngươi tới Tô Lận lúc gà gáy.",go:()=>bdP("tuyetcau","w")==="kinh"?bdMove("tuyetcau","tn"):bdO("nguao_ta","olac")},
  {n:"Bảo em đánh bằng ngựa của tay cầu thay",f:"champ",wx:"vẫn có người đánh",lx:"em không tự đánh",rt:"Tay cầu thay dắt ngựa vào sân."},
  {n:"Nhắn em tố vương thúc trước hội đồng quý tộc",f:"self",wx:"các đại tộc biết ai gian",lx:"không có chứng thì thành vu",rt:"Nê Niết Sư đứng lên giữa hội đồng, nói thẳng.",rf:"Vương thúc cười: “Có chứng không?”"}]},
 x1:{h:"Hiệp cuối",w:"emp",t:"Hiệp cuối trên sân bên sông Đạt Hạt. Con trai vương thúc dẫn trước. Tin về đến kinh qua chim ưng: ngươi còn một lời gửi kịp.",o:[
  {n:"Tự mình ra sân, cưỡi ngựa của em",e:["win","lose"],rt:"Ngươi cướp cầu từ gậy con trai vương thúc ở hiệp cuối, đánh vào cầu môn. Cả Tô Lận hô tên con gái {pv}.",rf:"Ngươi ngã ngựa giữa sân. Con trai vương thúc thắng trận."},
  {n:"Nhắn dũng sĩ đánh thay em: giữ biên sân trái",e:["win","mid"],rt:"Dũng sĩ giữ biên trái, đánh trái cầu quyết định. Hội đồng quý tộc trao tiếng nói cho Nê Niết Sư.",rf:"Dũng sĩ thua sát nút. Hội đồng quý tộc chia đôi."},
  {n:"Nhắn em: thua cũng được, giữ mạng",e:"mid",lx:"vương thúc có tiếng nói",go:()=>bdMeet("olac"),rt:"Nê Niết Sư thua sát, không ngã."}]}},
 E:{win:{tag:"Tô Lận hô tên nhà ngươi",w:"emp",t:"Trận mã cầu thuộc về nhà {pv}. Hội đồng quý tộc đã thấy: con của {pv} không yếu."},
  mid:{tag:"Hội đồng chia đôi",t:"Hội đồng quý tộc chia tiếng nói. Vương thúc một nửa, em ngươi một nửa."},
  lose:{tag:"Con trai vương thúc thắng",w:"emp",t:"Con trai vương thúc thắng trận. Nê Niết Sư phải lùi về phủ cũ.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",10,{t:"Đoàn hộ tống trên Thông Lĩnh",w:"emp",sj:"đoàn hộ tống Đại Hy trên Thông Lĩnh",cast(A){return rdCast(A,["v"])},
 g:"Tuyết đầu mùa phủ Thông Lĩnh. Vương thúc dồn quân về phía thành của Nê Niết Sư. Đô hộ An Tây giữ một đoàn hộ tống nhỏ ở chân núi chờ lệnh. Hoàng thượng nói: “Lần này trẫm nghe nàng.”",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Nê Niết Sư xin binh",w:"maid",if:RDW(1),t:"Thư Nê Niết Sư: “Vương thúc có ba nghìn kỵ. Em có một nghìn. Chị, em cần Đại Hy.”",o:[
  {n:"Đưa thư em lên Hoàng thượng",f:"envoy",wx:"ngài thấy em ngươi thật cần",lx:"ngài phải quyết nhanh",rt:"Hoàng thượng đọc, gọi Binh bộ vào ngay."},
  {n:"Hỏi em các đại tộc còn theo ai",f:"oath",wx:"biết thế ở {land}",lx:"chậm một ngày",rt:"Nê Niết Sư kể: bảy nhà theo em, năm nhà theo vương thúc, ba nhà chờ."},
  {n:"Nhắn em: giữ thành, chờ chị",f:"army",wx:"em không liều",lx:"vương thúc có thêm thời gian",rt:"Nê Niết Sư rút về sau sông, giữ thành."}]},
 s2:{h:"Nê Niết Sư im lặng",w:"maid",if:RDW(0),t:"Đã hai tuần không có thư Nê Niết Sư. Thương nhân người Hồ nói thành của em bị vây bên sông Đạt Hạt.",o:[
  {n:"Xin Hoàng thượng sai sứ đến hỏi vương thúc",f:"envoy",wx:"vương thúc phải trả lời Đại Hy",lx:"sứ có thể bị giữ",rt:"Sứ Đại Hy sang tây mang ấn của Hoàng thượng."},
  {n:"Gửi chim ưng tìm em",f:"oath",if:()=>bdO("chimung")==="ta",wx:"có tin thật",lx:"chim có thể không về",rt:"Chim ưng về sau ba ngày, mang một mẩu vải của em: em còn sống.",rf:"Chim ưng không về.",go:(A,ok)=>{if(!ok)bdO("chimung","mat");return""}},
  {n:"Xin đoàn hộ tống vượt núi tiến gần",f:"army",wx:"vương thúc thấy cờ Đại Hy",lx:"có thể châm lửa",rt:"Đoàn hộ tống vượt thêm nửa ngày đường trên Thông Lĩnh."},
  {n:"Gửi người buôn quen tìm em",f:"oath",if:()=>bdO("chimung")!=="ta",wx:"có tin thật",lx:"người buôn có thể không về",rt:"Người buôn về sau năm ngày, mang một mẩu vải của em: em còn sống.",rf:"Người buôn không về."}]},
 c1:{h:"Đô hộ An Tây",w:"emp",t:"Đô hộ An Tây tâu: quân ông đủ đánh, nhưng tuyết dày, vượt Thông Lĩnh thì khó về.",o:[
  {n:"Xin Đô hộ giữ ải, chỉ đánh nếu vương thúc vượt ải",wx:"không mất quân",lx:"em ngươi tự lo",rt:"Đô hộ nhận lời, ở yên sau ải."},
  {n:"Gửi Đô hộ áo bông và lương",wx:"quân sẵn sàng",lx:"bạc ra",rt:"Áo bông lên ải trước tuyết lớn."},
  {n:"Xin Đô hộ cho một trăm kỵ theo sứ",wx:"sứ có người hộ",lx:"quân Đại Hy ra khỏi ải",rt:"Một trăm kỵ theo sứ sang tây."}]},
 c2:{h:"{v} và Binh bộ",w:"v",need:["v"],t:"Người nhà {v} ở Binh bộ muốn đánh to để lập công. {v} nói: “Ngươi xin cả đạo quân đi, nhà ta lo phần còn lại.”",o:[
  {n:"Từ chối: không cần cả đạo quân",wx:"không mắc nợ nhà {v}",lx:"{v}: oán +",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} cười nhạt."},
  {n:"Nhận lời, để nhà {v} lo quân lương",wx:"có thêm người lo",lx:"công chia cho nhà {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gật đầu."},
  {n:"Mặc cả: nhà {v} lo lương, không cầm quân",wx:"giữ quân trong tay người của Hoàng thượng",lx:"{v} thấy ngươi khôn",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nhận lời.",rf:"{v} không chịu."}]},
 c3:{h:"Lời thề cho hoàng tử",w:"emp",if:BDSON,t:"Nê Niết Sư nhắn: nếu Đại Hy giúp, em sẽ thề trước hội đồng quý tộc rằng con trai chị là người thừa kế sau em.",o:[
  {n:"Nhận lời thề cho con trai",wx:"con ngươi có chỗ ở {land}",lx:"Đại Hy lo hoàng tử bị chia lòng",rt:"Nê Niết Sư thề trước lửa thánh, có thần Mithra làm chứng, rồi gửi lời về cho chị."},
  {n:"Bảo em: con chị là con Đại Hy",wx:"Đại Hy yên tâm",lx:"các đại tộc quên con ngươi",rt:"Nê Niết Sư gửi lại một lời: em hiểu."},
  {n:"Xin em thề giữ biên ải thay lời thề cho con",wx:"biên ải có lời thề",lx:"không có gì cho con ngươi",rt:"Nê Niết Sư thề, các đại tộc nghe."}]},
 t1:{h:"Ngự án trước tuyết lớn",w:"emp",t:"Trên ngự án có ba tờ: sớ Binh bộ xin đánh, sớ Lễ bộ xin sứ, và tờ thư của em ngươi.",o:[
  {n:"Chỉ vào sớ Lễ bộ",f:"envoy",wx:"ngài thấy ngươi muốn hòa",lx:"Binh bộ cho là ngươi yếu",rt:"Hoàng thượng đặt sớ Lễ bộ lên trên."},
  {n:"Chỉ vào thư của em",f:"oath",wx:"ngài thấy việc từ phía em",lx:"ngài cho là ngươi bênh em",rt:"Hoàng thượng đọc thư em lần nữa."},
  {n:"Chỉ vào sớ Binh bộ",f:"army",wx:"ngài thấy ngươi dám đánh",lx:"người {land} gọi ngươi là kẻ đưa giặc về",rt:"Hoàng thượng nhíu mày, rồi gật."}]},
 x1:{h:"Một lời cho đoàn trên Thông Lĩnh",w:"emp",t:"Đêm tuyết lớn nhất năm. Thái giám chờ ngoài cửa cung ngươi, cầm sẵn giấy mực. Lời ngươi sẽ thành lệnh cho đoàn hộ tống trên Thông Lĩnh.",o:[
  {n:"Chỉ xin sứ thần, không xin binh",e:["win","lose"],rt:"Sứ Đại Hy mang ấn vào kim điện. Vương thúc không dám đánh khi sứ còn ở đó; các nhà còn chờ quay về với em.",rf:"Vương thúc giữ sứ làm tin, vẫn vây thành em."},
  {n:"Đổi binh lấy lời thề của các đại tộc",e:["win","mid"],rt:"Năm nhà thề theo nhà {pv} để đổi một nghìn kỵ Đại Hy. Vương thúc còn trơ trọi.",rf:"Các nhà nhận binh mà chưa thề. Đoàn hộ tống quay về giữa tuyết."},
  {n:"Xin cả đạo quân ra ải",e:["win","lose"],rt:"Đạo quân Đại Hy vượt Thông Lĩnh trong tuyết. Trại vương thúc cháy đỏ một góc trời.",rf:"Đạo quân sa vào tuyết trên Thông Lĩnh, mất một phần ba người ngựa.",go:()=>{RD_FL("bd_soi.war",1);return""}}]}},
 E:{win:{tag:"Thông Lĩnh theo ý ngươi",w:"emp",t:"Một lời của ngươi làm thay đổi thế ở {land}. Vương thúc biết, Nê Niết Sư biết, và Hoàng thượng cũng biết."},
  mid:{tag:"Đoàn hộ tống quay về",t:"Tuyết phủ kín Thông Lĩnh, đoàn hộ tống quay về, không ai đánh được ai. Mùa xuân sẽ quyết."},
  lose:{tag:"Tuyết chôn quân",w:"emp",t:"Quân An Tây mất người, biên ải yếu đi. Triều thần nhắc tên ngươi trong mỗi tờ sớ.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",11,{t:"Người ngồi ngai vàng",w:"emp",sj:"ngai vàng của {land}",cast(A){return rdCast(A,["v"])},
 g:"Xuân sang, tuyết tan. {pv} trút hơi thở cuối trong kim điện Tô Lận. Hội đồng quý tộc họp lần cuối để chọn người nối ngôi. Sứ của vương thúc và sứ của Nê Niết Sư cùng quỳ trước điện Đại Hy, chờ một tờ chiếu.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tang {pv}",w:"emp",if:RDW(1),t:"Tin tang đến. Hoàng thượng cho ngươi để tang theo lễ {land} ba ngày, cho treo cờ trắng trước cung.",o:[
  {n:"Để tang theo lễ {land}, mời sứ hai bên cùng đến",f:"peace",wx:"cả hai bên phải cúi đầu trước linh {pv}",lx:"vương thúc có dịp gần ngươi",rt:"Sứ vương thúc và sứ Nê Niết Sư cùng quỳ trước bàn thờ, không ai dám nói lời nào.",rf:"Sứ vương thúc không đến."},
  {n:"Để tang riêng, đóng cửa cung",f:"self",wx:"lòng ngươi được yên",lx:"việc triều chờ",rt:()=>BDKD()==="kinh"?"Ba ngày ngươi không gặp ai, trừ {mh}.":"Ba ngày ngươi không gặp ai; mỗi sáng có thư {mh} từ ải tây."},
  {n:"Gửi nhẫn ấn có cánh của {pv} cho Nê Niết Sư",f:"heir",if:()=>bdO("ansoi")==="ta",wx:"các đại tộc thấy nhẫn ấn trong tay em",lx:"vương thúc biết ngươi đã chọn",rt:()=>"Chiếc nhẫn ấn theo "+(bdO("chimung")==="ta"?"chim ưng":"người đưa tin")+" về Tô Lận.",go:()=>{bdO("ansoi","olac");return bdMeet("olac")}},
  {n:"Gửi thư tang của chị cho Nê Niết Sư, xin các đại tộc nhận em",f:"heir",if:()=>bdO("ansoi")!=="ta",wx:"các đại tộc thấy chị đứng sau em",lx:"vương thúc biết ngươi đã chọn",rt:"Thư tang của ngươi được đọc trước hội đồng quý tộc ở Tô Lận.",go:()=>bdMeet("olac")}]},
 s2:{h:"Tang {pv}, và một lời đồn",w:"emp",if:RDW(0),t:"Tin tang đến cùng một lời đồn: vương thúc đã ngồi lên ngai vàng trước khi {pv} tắt thở.",o:[
  {n:"Xin Hoàng thượng chưa công nhận ai trước lễ tang",f:"peace",wx:"vương thúc chưa có danh",lx:"vương thúc có quân",rt:"Hoàng thượng phán: Đại Hy chờ hết tang mới bàn."},
  {n:"Viết thư cho hội đồng quý tộc, nhắc lệ cổ",f:"self",wx:"hội đồng quý tộc nhớ lệ",lx:"lệ cổ có thể không đủ",rt:"Bảy vị đại quý tộc đọc thư trước điện tang."},
  {n:"Gửi người về xem thật giả",f:"heir",wx:"biết sự thật",lx:"chậm",rt:"Người của ngươi về báo: vương thúc ngồi lên ngai thật, hội đồng quý tộc chưa nhận."}]},
 c1:{h:"Hội đồng quý tộc hỏi ngươi",w:"maid",t:"Thư hội đồng quý tộc: “Con gái {pv} ở Đại Hy, nói một lời. Lời ấy nặng như một đại tộc.”",o:[
  {n:"Đáp: ngai vàng thuộc về con trai {pv}",wx:"Nê Niết Sư: Danh +",lx:"vương thúc thù ngươi",rt:"Hội đồng quý tộc đọc lời ngươi trước điện."},
  {n:"Đáp: hội đồng chọn, Đại Hy làm chứng",wx:"hội đồng quý tộc thấy được nể",lx:"lời của ngươi không chỉ ai",rt:"Các vị quý tộc gật đầu."},
  {n:"Đáp: ngai vàng cần một người mạnh",wx:"các đại tộc nghe ra ý ngươi",lx:"ai cũng có thể hiểu là mình",rt:"Lời của ngươi đi khắp các phủ quý tộc."}]},
 c2:{h:"{v} và tờ chiếu",w:"v",need:["v"],t:"Người nhà {v} ở Binh bộ đòi chiếu công nhận ai cũng phải kèm hai tòa thành biên cho Đại Hy.",o:[
  {n:"Phản đối: lấy thành của người đang tang",wx:"người {land} nhớ ơn",lx:"nhà {v} oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng thượng gạch điều đòi thành."},
  {n:"Đồng ý một tòa thành, đổi lấy đường buôn",wx:"Binh bộ vui, đường buôn mở",lx:"người {land} nói ngươi bán đất",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Chiếu có thêm một điều: một tòa thành và một con đường buôn."},
  {n:"Để Hoàng thượng tự quyết",wx:"không mắc lỗi",lx:"chiếu có điều ngươi không muốn",rt:"Ngươi không nói gì."}]},
 t1:{h:"Hoàng thượng hỏi lần cuối",w:"emp",t:"Đêm trước ngày ban chiếu, Hoàng thượng hỏi: “Nàng muốn ai ngồi ngai vàng? Nói thật với trẫm.”",o:[
  {n:"Thưa: em trai thần thiếp",f:"heir",wx:"ngài biết ý ngươi",lx:"ngài lo ngươi nghiêng về nhà",rt:"Hoàng thượng nói: “Trẫm biết rồi.”"},
  {n:"Thưa: người giữ được biên ải yên",f:"peace",wx:"ngài thấy ngươi nghĩ cho Đại Hy",lx:"lời mập mờ",rt:"Hoàng thượng gật."},
  {n:"Thưa: thần thiếp",f:"self",wx:"ngài nghe được lòng thật",lx:"ngài sợ",rt:"Hoàng thượng nhìn ngươi rất lâu, không cười.",rf:"Hoàng thượng đứng dậy, ra về."}]},
 x1:{h:"Tờ chiếu ngai vàng",w:"emp",t:"Sáng ban chiếu. Hai sứ quỳ trước điện. Hoàng thượng đưa bút cho ngươi: “Nàng viết tên.”",o:[
  {n:"Viết tên Nê Niết Sư",e:["win","lose"],rt:"Nê Niết Sư nhận chiếu của Đại Hy, lên ngai vàng. Vương thúc lùi về đất của nhà mình.",rf:"Chiếu đến, nhưng vương thúc không lùi. Các đại tộc chia đôi.",go:(A,ok)=>{if(!ok)bdP("olac","w","ai");return""}},
  {n:"Viết: chia {land}, mỗi bên một nửa",e:["mid","lose"],rt:"{land} chia đôi. Nê Niết Sư giữ Tô Lận, vương thúc giữ các trấn phía đông.",rf:"Hai bên ký rồi lại đánh."},
  {n:"Viết tên vương thúc, đổi lời thề giữ biên ải",e:["mid","lose"],rt:"Vương thúc lên ngai vàng, thề giữ yên biên ải. Nê Niết Sư được làm trấn thủ Tật Lăng.",rf:"Vương thúc lên ngai, rồi quên lời thề.",go:(A,ok)=>{if(!ok)bdKill("olac");return""}}]}},
 E:{win:{tag:"Em trai lên ngôi",w:"emp",/*bd6b: win only from «Viết tên Nê Niết Sư», which never kills him*/t:"Nê Niết Sư ngồi ngai vàng với chiếu của Đại Hy. Mỗi mùa thu, đoàn lạc đà {land} lại về Tây Thị, kèm một phong thư cho chị."},
  mid:{tag:"Ngai vàng chia đôi",t:"{land} có hai chủ, cả hai đều gọi ngươi là người nhà, không ai nghe ngươi trọn. Biên ải yên, lòng ngươi không yên."},
  lose:{tag:"Vương thúc thắng, mối hòa lung lay",w:"emp",t:()=>"Vương thúc ngồi ngai vàng. "+(bdAlive("olac")?"Nê Niết Sư lưu lạc.":"Nê Niết Sư đã chết trong tay người của vương thúc.")+" Đại Hy nhìn ngươi như một tờ hòa ước đã cũ.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"bd_soi_11",tag:"Tô Lận tôn ngươi làm Nữ vương",w:"emp",n:"Viết tên chín vị đại quý tộc, xin họ chọn trước mặt hai sứ",
 path:["vòng ngọc của mẹ","Trình cả hai phong thư","Giữ bản đồ","Tha Đạt Lỗ","Bắt sống Đạt Lỗ","mở đường buôn qua Tật Lăng","Đón {mh} vào cung","dũng sĩ","Chỉ xin sứ thần","Đổi binh lấy lời thề"],
 bad:["Chém Đạt Lỗ","Mua chuộc","Dùng {mh} làm mồi"],x:[()=>S.danh>=RR("bd_soi_11").bar,"Danh từ "+RR("bd_soi_11").bar],
 /*bd6b: the rare replaces the x1 choice, Nê Niết Sư alive*/t:()=>"Ngươi không viết tên ai. Ngươi viết tên chín vị đại quý tộc, xin họ chọn ngay trước điện Đại Hy. Chín người đứng dậy, cùng quay về phía ngươi: theo lệ có từ thời Nữ vương Bố Lan, con gái {pv} mà giữ được {land} qua một mùa đông, thì hội đồng tôn làm Nữ vương. "+(bdO("ansoi")==="olac"?"Nê Niết Sư ngồi ngai, nhẫn ấn trong tay em, nhưng lời là lời của ngươi; ":bdO("ansoi")==="ta"?"Nê Niết Sư ngồi ngai, nhưng nhẫn ấn ở trong tay ngươi; ":"Nê Niết Sư ngồi ngai, nhưng chín vị đại quý tộc nghe lời ngươi; ")+"vương thúc quỳ nhận lệnh từ một tờ thư có chữ ký của ngươi.",
 go:(_A,G)=>e67bien(G[0]),rw:"bienngu",ti:"Nữ vương thành Tô Lận"}));
