/* ================= jrd_bd: Bắc Địch's OWN four roads (owner OD 18/11 ~22:05Z, GRAND_ENDINGS D2 = (a); ROAD_MAP §4.5b) =================
   bd stays a COUNTRY BRANCH of hòa thân (ORIGIN_BR.bd, KC2LAND.bd, STORY/QUEST67.bd unchanged; land tokens {land} {pv} {mh} {quan} {pa} {pb}
   of jrd_nc NCL.bd). New bd lives roll one of bd_san · bd_soi (this file) · bd_tuyet · bd_hen (jrd_bd2.js): .4 premise arc + .5–.11 + j97 rare
   at .4 + RD97L rare at .11. Numbers: jbalbd.js (ONE CORE). Helpers RDW / rdRel / rdOan / RD_FL from jroad.js / jrd_tt.js (same script).
   LEGACY (law 6c): the old premises bd_hoa / bd_ngua / bd_tuc / bd_hoang (jorigins.js) and their alias chapters (the loop below, moved verbatim
   from jrd_nc.js) stay registered so a saved life on one of them plays on to its .11; they are no longer dealt to NEW lives (BD_OLD filter). */
/* the .4 premise arcs go through j67 arcFx (BAL.arc.fx); a stand-alone scan of this file has none */
const bdArc=(id,d)=>typeof arcFx==="function"?arcFx(id,d):d;
const BD_OLD=["bd_hoa","bd_ngua","bd_tuc","bd_hoang"];
/* a new life's premise pool (j67 arcIds67 → jst14 roll, j67 phase-1 frame): old bd premises out; saves keep the ids already written in their plan */
(function(){if(typeof arcIds67!=="function")return;const a0=arcIds67;arcIds67=function(o){const r=a0.apply(this,arguments);if(o!=="bd")return r;const n=r.filter(id=>!BD_OLD.includes(id));return n.length?n:r}/* until a new road exists the old ones stay dealt (no empty pool) */})();
/* ---------- BDP: the steppe people of bd's roads (law 6b, ROAD_MAP §5.4) — one living state per life, kept in the road flag book ----------
   where: "tn" thảo nguyên · "ai" biên ải · "kinh" kinh thành · "nguc" ngục; alive 1/0; met 1 once she has dealt with them. Chapters move them. */
const BDP={lie:{n:"Hô Diên Liệt",r:"thúc phụ",w:"tn",want:"ngồi vào kim trướng, được Đại Hy công nhận",man:1},
 olac:{n:"Ô Lặc",r:"em trai",w:"tn",want:"giữ lều cha, sống sót qua tay thúc phụ",man:1},
 thatmoc:{n:"Thát Mộc",r:"vệ sĩ sứ đoàn",w:"tn",want:"một bộ lạc của riêng mình",man:1},
 bado:{n:"Ba Đồ",r:"phu ngựa Thượng tứ viện",w:"kinh",want:"được ghi tên chính ngạch, một ngày về lại thảo nguyên"},
 tuyetcau:{n:"Tuyết Câu",r:"ngựa của ngươi",w:"kinh",want:"cỏ và gió"},
 asnc:{n:"A Sử Na Cát",r:"trưởng lão bộ lạc biên",w:"ai",want:"cứu bộ lạc qua mùa đông",man:1},
 phong:{n:"Thác Bạt Phong",r:"người đã đính ước",w:"tn",want:"giữ lời thề bên đống đá",man:1},
 kd:{n:"Khả đôn",r:"mẹ",w:"tn",want:"giữ con trai mình sống, gặp lại con gái"}};
const bdP=(id,k,v)=>{const key="bd.p."+id+"."+k;if(v!=null)RD_FL(key,v);const x=RD_FL(key);
 if(x)return x;if(k==="alive")return 1;if(k==="w")return BDP[id].w;return 0};
const bdAlive=id=>bdP(id,"alive")!==-1;/* dead = -1 (0 is the book's "unset") */
/* a steppe man who is IN the capital stands in the world like every man (S.men, jmen schedule: an embassy member keeps the envoy's
   places and lawful reasons), and leaves it when he goes home or dies (law 6b). Women guests and the stable groom: see report FOR E. */
const bdMan=id=>{try{if(typeof menInit==="function")menInit()}catch(e){}if(!S.men||!BDP[id]||!BDP[id].man)return"";const mid="mbd_"+id,M=BAL.road.bd.man;
 const on=bdAlive(id)&&bdP(id,"w")==="kinh";const had=S.men.find(m=>m.id===mid);if(had){if(!on)had.alive=bdAlive(id),had.away=1;else had.away=0;return""}
 if(on)S.men.push({id:mid,role:"Sứ thần",rw:"sứ thần",haunts:["thu"],age:M.age[id]||M.age.d,name:BDP[id].n,trait:M.trait[id]||"cẩn trọng",loyal:M.loyal,af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[],bdp:id,known:1});return""};
const bdKill=id=>{bdP(id,"alive",-1);bdMan(id);return ""};
const bdMove=(id,w)=>{bdP(id,"w",w);bdMan(id);return ""};
const bdMeet=id=>{bdP(id,"met",1);return ""};
/* the book, as the chapter text and the later grand-ending wave read it */
const bdWhere=id=>({tn:"thảo nguyên",ai:"biên ải",kinh:"kinh thành",nguc:"ngục"})[bdP(id,"w")]||"";
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
   bd_san · Mùa thu săn (Tài nghệ · Tình yêu). People: {emp}, {v}, {maid}; Ba Đồ (BDP.bado), Tổng quản Thượng tứ viện (unnamed), the mare
   Tuyết Câu (BDP.tuyetcau, lives in the Thượng tứ viện stable). Objects: the cut girth (fb bd_san.girth: kept / given / swapped).
   GE intents (GRAND_ENDINGS §3): ge1 Thống lĩnh ngự mã (hold the stable, teach), ge2 Tri kỷ lưng ngựa (ride with him, open heart),
   ge3 Mũi tên trường săn (trap / turn the blow back on {v}), ge4 Về với thảo nguyên (the steppe calls, Ba Đồ, the west gate).
   ===================================================================================================================================== */
const BDCF=k=>BAL.road.bd.conf[k];
const bdConfine=k=>{S.confined=Math.max(S.confined||0,BDCF(k));return ""};
RTHEME67.bd_san="emp";
ARC67.bd_san=bdArc("bd_san",{o:"bd",t:"Mùa thu săn",w:"emp",sj:"cuộc săn thu ở Bắc Uyển",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng mở cuộc săn thu ở Bắc Uyển. Cả triều chờ xem công chúa {land} cưỡi ngựa ra sao. Một mũi tên của ngươi sẽ định ai nhìn thấy ngươi, và nhìn bằng con mắt nào.",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Phi tần ngồi xe",w:"emp",t:"Quan Thái bộc tâu: theo lệ, phi tần đi săn ngồi xe che rèm. Tuyết Câu, con ngựa trắng ngươi mang từ {land}, đứng trong chuồng Thượng tứ viện, cương còn treo trên vách.",o:[
  {n:"Xin ngự giá cho cưỡi Tuyết Câu theo đoàn",f:"ride",wx:"cả đoàn săn thấy ngươi trên lưng ngựa",lx:"bị chê trái lệ",rt:"Hoàng thượng phất tay: “Cho nàng cưỡi.”",rf:"Thái bộc lắc đầu: lệ là lệ."},
  {n:"Ngồi xe, mang cung theo",f:"bend",wx:"giữ đúng lệ Đại Hy",lx:"không ai thấy tài ngươi",rt:"Ngươi ngồi xe, cây cung đặt ngang gối."},
  {n:"Nhờ Ba Đồ thắng yên cho các phi tần muốn cưỡi",f:"share",wx:"các phi tần cùng vui, không ai nói ngươi phá lệ một mình",lx:"tốn bạc sắm yên",rt:"Ba Đồ thắng năm bộ yên nhỏ; hai vị phi tần nhận lời cưỡi theo ngươi.",go:()=>bdMeet("bado")}]},
 s2:{h:"Tuyết Câu bỏ ăn",w:"maid",t:"Ba hôm trước cuộc săn, Tuyết Câu bỏ ăn. Ba Đồ, người giữ ngựa {land} ở Thượng tứ viện, nhắn vào cung: máng cỏ của nó có mùi lạ.",o:[
  {n:"Tự xuống chuồng xem máng cỏ",f:"ride",wx:"tìm ra cỏ bị trộn lá độc",lx:"phi tần xuống chuồng ngựa, người ta bàn tán",rt:"Trong máng có lá ngón trộn lẫn. Ngươi đổ máng, Tuyết Câu ăn lại.",rf:"Máng đã bị rửa sạch trước khi ngươi đến.",go:()=>bdMeet("bado")},
  {n:"Bảo Ba Đồ thay cỏ, canh chuồng",f:"bend",wx:"ngựa yên mà không ồn ào",lx:"không biết ai trộn cỏ",rt:"Ba Đồ ngủ luôn ở chuồng ba đêm.",go:()=>bdMeet("bado")},
  {n:"Báo Tổng quản Thượng tứ viện tra xét",f:"share",wx:"việc chuồng ngựa có người lo theo phép",lx:"Tổng quản thấy ngươi nghi người của lão",rt:"Tổng quản cho đổi hết cỏ cả dãy chuồng."}]},
 c1:{h:"{v} mượn ngựa",w:"v",need:["v"],t:"{v} sai người sang mượn Tuyết Câu cho em gái nàng ta cưỡi trong cuộc săn. Từ chối thì mất lòng, cho mượn thì ngựa ở trong tay người khác một ngày.",o:[
  {n:"Cho mượn, dặn Ba Đồ theo sát",wx:"{v} không có cớ trách",lx:"ngựa ở trong tay người khác",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Tuyết Câu về chuồng lành lặn.",rf:"Tuyết Câu về chuồng, chân sau sưng."},
  {n:"Khéo từ: ngựa chỉ quen tay chủ",wx:"ngựa ở yên trong chuồng",lx:"{v} cho là ngươi khinh nhà nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} cười nhạt, cho người về."},
  {n:"Tặng em gái {v} một con ngựa khác",wx:"được lòng cả hai chị em",lx:"bạc ra",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Em gái {v} nhận con ngựa hồng, cảm ơn ngươi trước mặt mọi người."}]},
 c2:{h:"Con nai trắng",w:"emp",t:"Thị vệ báo trong rừng phong có một con nai trắng. Người xưa nói ai bắn được nai trắng thì được trời thương. Hoàng thượng muốn tự tay bắn.",o:[
  {n:"Lùa nai về phía ngự giá",f:"ride",wx:"ngài bắn được nai, nhớ ai lùa nó",lx:"phi ngựa giữa rừng, dễ ngã",rt:"Con nai chạy thẳng về phía ngài. Mũi tên vàng trúng ngay vai nó.",rf:"Con nai rẽ ngang, mất hút sau đồi."},
  {n:"Khuyên ngài tha nai, lấy điềm lành",f:"bend",wx:"ngài thấy ngươi có lòng",lx:"thị vệ cho là ngươi làm mất hứng",rt:"Hoàng thượng hạ cung: “Trời đã cho xem, không cần lấy.”"},
  {n:"Chỉ cho thị vệ dấu chân nai",f:"share",wx:"cả đoàn biết ngươi đọc được dấu rừng",lx:"công thuộc về thị vệ",rt:"Thị vệ theo dấu ngươi chỉ, vây được con nai trước bữa trưa."}]},
 t1:{h:"Mũi tên đầu tiên",w:"emp",t:"Một con hươu đực lớn vọt qua bãi. Mũi tên của Hoàng thượng sượt qua lưng nó. Cả đoàn im lặng: ngươi đang đứng ở chỗ bắn dễ nhất.",o:[
  {n:"Bắn ngay, hạ con hươu",f:"ride",wx:"cả đoàn thấy tài bắn của ngươi",lx:"bắn trước mặt vua là chuyện lớn",rt:"Mũi tên của ngươi xuyên cổ con hươu. Hoàng thượng nhìn ngươi rất lâu.",rf:"Tên của ngươi trượt, cắm vào thân cây ngay sau ngự mã."},
  {n:"Hạ cung, nhường ngài bắn lần nữa",f:"bend",wx:"ngài nhớ ngươi biết nhường",lx:"con hươu chạy mất",rt:"Hoàng thượng bắn mũi thứ hai, trúng."},
  {n:"Bắn chặn đường hươu, đẩy nó về phía ngài",f:"share",wx:"ngài hạ được hươu, cả hai cùng có công",lx:"một mũi tên khó",rt:"Mũi tên cắm trước mõm hươu; nó quay đầu, và ngài bắn trúng.",rf:"Con hươu không quay đầu."}]},
 x1:{h:"Lợn rừng trong rừng phong",w:"emp",t:"Chiều xuống, một con lợn rừng lao ra khỏi bụi, nhắm vào chân ngự mã. Cấm quân còn ở xa. Ngươi ở gần nhất.",o:[
  {n:"Giương cung bắn con lợn rừng",e:["win","lose"],rt:"Mũi tên trúng mắt con thú. Nó ngã cách ngự mã ba bước chân. Hoàng thượng gọi: “Nàng lại đây, cưỡi bên trẫm.”",rf:"Mũi tên sượt, con thú lồng lên, ngự mã hoảng hất ngài suýt ngã."},
  {n:"Thúc Tuyết Câu chắn trước ngự mã",e:["win2","mid"],rt:"Tuyết Câu đứng chắn, con thú húc vào bụi. Tổng quản Thượng tứ viện về hỏi ngươi cách dạy ngựa như thế.",rf:"Tuyết Câu hoảng, ngươi giữ được cương nhưng ngự mã đã chạy xa."},
  {n:"Hô cấm quân, chỉ lối cho ngự mã tránh",e:"mid",lx:"không ai nhớ ngươi đã ở đó",rt:"Cấm quân tới kịp. Ngự mã tránh được, cả đoàn về sớm."}]}},
 E:{win:{tag:"Một tên trước ngự giá",w:"emp",t:"Từ hôm ấy, cuộc cưỡi ngựa nào Hoàng thượng cũng gọi ngươi theo. Cả triều thôi coi tài bắn cung của ngươi là thói rợ."},
  win2:{tag:"Người hiểu ngựa",w:"emp",t:"Thượng tứ viện xin Hoàng thượng cho ngươi xem xét đàn ngựa {land} mới đến. Tuyết Câu có chuồng riêng."},
  mid:{tag:"Một ngày săn như mọi ngày",t:"Cuộc săn khép lại, ai về cung nấy. Người ta nhớ con lợn rừng hơn nhớ ngươi."},
  lose:{tag:"Tên bay gần ngự mã",w:"v",t:"{v} kể khắp hậu cung: công chúa {land} bắn tên sát ngự mã, chẳng biết là vụng hay là cố ý."}}});
BD97.push({a:"bd_san",tag:"Một tên hai nhạn",w:"emp",n:"Ngẩng lên bắn đôi nhạn đang bay qua ngự giá",
 path:["cưỡi Tuyết Câu","Tự xuống chuồng","Lùa nai","Bắn ngay","Bắn chặn đường hươu","Nhờ Ba Đồ"],bad:["Ngồi xe","Hô cấm quân"],x:[()=>S.suc>=BAL.arc.rare.bd_san.bar,`Sức từ ${BAL.arc.rare.bd_san.bar}`],
 t:"Ngươi không bắn con thú, mà ngẩng lên. Một mũi tên xuyên cả đôi nhạn đang bay ngang trời; chúng rơi xuống trước móng ngự mã, con thú hoảng quay vào rừng. Hoàng thượng cười lớn, cởi chiếc nhẫn ngọc cài cung trao cho ngươi: “Nhạn bay thành đôi, nàng bắn một tên. Trẫm nhớ.”",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_nhuy",ti:"Một tên hai nhạn"});

rdDef("bd_san",5,{t:"Chuồng ngựa Thượng tứ viện",w:"emp",sj:"chuồng ngựa {land} ở Thượng tứ viện",cast(A){return rdCast(A,["v"])},
 g:"Đàn ngựa cống của {land} vừa vào kinh. Tổng quản Thượng tứ viện muốn nuôi theo phép Đại Hy, Ba Đồ muốn nuôi theo phép thảo nguyên. Ai giữ chìa khóa dãy chuồng ấy, người đó có tiếng nói ở Thượng tứ viện.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài cho ngươi chọn ngựa",w:"emp",if:()=>RDW(1)()&&rdPrev()!=="win2",t:"Hoàng thượng sai mở chuồng: “Nàng chọn cho trẫm một con, và một con cho nàng.” Tổng quản Thượng tứ viện đứng sau, mặt không vui.",o:[
  {n:"Chọn con ngựa xấu mà bền cho ngài",f:"keep",wx:"ngài thấy ngươi hiểu ngựa thật",lx:"ngài có thể chê ngựa xấu",rt:"Hoàng thượng cưỡi thử, rồi gật đầu: “Nàng nói đúng.”",rf:"Hoàng thượng chê ngựa xấu, cưỡi con khác."},
  {n:"Để Tổng quản chọn, ngươi chỉ khen",f:"bend",wx:"Tổng quản bớt hận",lx:"ngài nghĩ ngươi chẳng hiểu gì",rt:"Tổng quản chọn con ngựa đẹp nhất, nhìn ngươi bớt lạnh."},
  {n:"Xin ngài cho Ba Đồ dắt ngựa ra",f:"steppe",wx:"Ba Đồ có mặt trước ngự giá",lx:"Tổng quản bị gạt sang bên",rt:"Ba Đồ dắt ngựa, ngài khen y biết việc.",go:()=>bdMeet("bado")}]},
 s2:{h:"Tổng quản đến hỏi",w:"emp",if:()=>rdPrev()==="win2",t:"Tổng quản Thượng tứ viện tự mình đến cung ngươi, mang theo sổ ngựa: đàn ngựa {land} mới đến có mười con không chịu ăn cỏ Đại Hy.",o:[
  {n:"Chỉ cách trộn cỏ thảo nguyên",f:"keep",wx:"Tổng quản nợ ngươi một việc",lx:"công phải chia",rt:"Mười con ngựa ăn lại sau năm ngày. Tổng quản ghi công cho Thượng tứ viện."},
  {n:"Xin cho Ba Đồ trông dãy chuồng ấy",f:"steppe",wx:"dãy chuồng có người của ngươi",lx:"Tổng quản thấy ngươi giành chỗ",rt:"Tổng quản miễn cưỡng giao cho Ba Đồ.",rf:"Tổng quản nói: “Người {land} chỉ đáng giữ cửa chuồng.”",go:()=>bdMeet("bado")},
  {n:"Mời Tổng quản uống trà, hỏi chuyện nghề",f:"bend",wx:"lão bớt đề phòng",lx:"không xong việc",rt:"Tổng quản kể ba đời làm nghề ngựa, ra về vui vẻ."}]},
 s3:{h:"Tuyết Câu bị dắt sang chuồng xa",w:"maid",if:RDW(0),t:"Sau cuộc săn, Tuyết Câu bị dắt sang dãy chuồng cuối Thượng tứ viện, gần máng nước bẩn. {maid} nghe nói đó là lệnh của Tổng quản.",o:[
  {n:"Xin Hoàng thượng cho ngựa về chỗ cũ",f:"keep",wx:"ngài nói một câu là xong",lx:"ngài cho là ngươi làm phiền vì con ngựa",rt:"Hoàng thượng phê một chữ. Tuyết Câu về chỗ cũ.",rf:"Hoàng thượng nói: “Chuyện chuồng ngựa, để Thượng tứ viện lo.”"},
  {n:"Gửi bạc nhờ Ba Đồ chăm riêng",f:"steppe",wx:"ngựa được chăm mà không ai biết",lx:"bạc ra mỗi tháng",rt:"Ba Đồ dắt Tuyết Câu đi uống nước sạch mỗi sáng.",go:()=>bdMeet("bado")},
  {n:"Tự đến chuồng, chải lông cho ngựa",f:"bend",wx:"cung nhân thấy ngươi thương ngựa",lx:"phi tần ra chuồng, người ta cười",rt:"Tuyết Câu dụi đầu vào vai ngươi."}]},
 c1:{h:"Ba Đồ xin việc",w:"maid",t:"Ba Đồ nhắn vào: y muốn được ghi tên là phu ngựa chính ngạch, không phải người làm thuê. Có tên trong sổ, y mới ở lại kinh lâu được.",o:[
  {n:"Bỏ bạc lo cho y vào sổ",wx:"Ba Đồ ở lại lâu dài",lx:"bạc ra",rt:"Tên Ba Đồ được ghi vào sổ Thượng tứ viện."},
  {n:"Viết thư nhờ sứ {land} xin cho y",wx:"có giấy tờ đàng hoàng",lx:"sứ {land} biết ngươi cần người",rt:"Sứ {land} gửi một tờ thỉnh, Thượng tứ viện chuẩn.",rf:"Thư đi mà chưa có hồi âm."},
  {n:"Bảo y cứ làm, chờ dịp",wx:"không tốn gì",lx:"Ba Đồ buồn lòng",rt:"Ba Đồ cúi đầu, không nói gì."}]},
 c2:{h:"{v} xin một con ngựa {land}",w:"v",need:["v"],t:"{v} tâu xin một con ngựa {land} cho cung mình. Nàng ta xin đúng con ngựa ô mà ngươi định dâng Hoàng thượng.",o:[
  {n:"Nhường con ngựa ô cho {v}",wx:"{v} không có cớ nói ngươi giữ của",lx:"mất con ngựa tốt",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nhận ngựa, cười với ngươi lần đầu."},
  {n:"Tâu rằng ngựa ô chưa thuần, chọn con khác cho nàng",wx:"giữ được ngựa ô",lx:"{v} biết ngươi lựa lời",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return""},rt:"{v} nhận con ngựa khác, không nói gì.",rf:"{v} nói: “Chưa thuần mà định dâng Hoàng thượng?”"},
  {n:"Mời {v} ra chuồng tự chọn",wx:"công bằng trước mắt mọi người",lx:"{v} chọn đúng con ngươi quý",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} chọn con ngựa hồng, khen ngươi rộng rãi."}]},
 t1:{h:"Sổ cỏ khô",w:"emp",t:"Ba Đồ cho ngươi xem: sổ ghi mỗi ngày đổ mười xe cỏ cho dãy chuồng {land}, mà chỉ có sáu xe đến. Người ký sổ là thuộc hạ của Tổng quản.",o:[
  {n:"Đưa sổ lên Hoàng thượng",f:"keep",wx:"ngài thấy ngươi giữ của công",lx:"Tổng quản thành kẻ thù",rt:"Hoàng thượng sai Nội vụ phủ tra, kẻ ký sổ bị đánh đòn.",rf:"Nội vụ phủ tra mà không ra gì, sổ bị nói là ghi nhầm."},
  {n:"Đem sổ đến nói riêng với Tổng quản",f:"bend",wx:"Tổng quản nợ ngươi một lần",lx:"cỏ có thể vẫn thiếu",rt:"Tổng quản đổi người ký sổ, mười xe cỏ đến đủ."},
  {n:"Giữ bản chép sổ, chờ lúc cần",f:"steppe",wx:"có một chứng cứ trong tay",lx:"ngựa vẫn đói ít lâu",rt:"Bản chép nằm trong rương áo cưỡi của ngươi.",go:()=>{RD_FL("bd_san.ledger","kept");return""}}]},
 x1:{h:"Ai giữ chìa khóa chuồng",w:"emp",t:"Cuối tháng, Hoàng thượng hỏi ai nên trông dãy chuồng ngựa {land}. Tổng quản Thượng tứ viện đứng chờ. Ba Đồ đứng sau lưng ngươi.",o:[
  {n:"Tâu xin cho Ba Đồ giữ chìa khóa",e:["win","lose"],rt:"Hoàng thượng giao chìa khóa cho Ba Đồ, dưới quyền ngươi trông coi. Tổng quản cúi đầu.",rf:"Hoàng thượng nói: “Người {land} giữ ngựa {land}, thế thì Thượng tứ viện để làm gì?”",go:()=>bdMeet("bado")},
  {n:"Tâu xin hai người cùng trông",e:["win","mid"],rt:"Tổng quản giữ sổ, Ba Đồ giữ chuồng. Hai người phải hỏi ngươi khi bất đồng.",rf:"Hai người cãi nhau ngay trước cửa chuồng."},
  {n:"Thưa: việc của Thượng tứ viện, thiếp không dám bàn",e:"mid",lx:"chuồng ngựa không còn là việc của ngươi",rt:"Chìa khóa về tay Tổng quản."}]}},
 E:{win:{tag:"Chuồng ngựa nghe lời ngươi",w:"emp",t:"Dãy chuồng ngựa {land} có chủ: người giữ là Ba Đồ, người quyết là ngươi. Tổng quản Thượng tứ viện chào ngươi trước khi chào ai khác."},
  mid:{tag:"Ngựa của Đại Hy",t:"Đàn ngựa {land} giờ là ngựa của Đại Hy. Ngươi vẫn ghé chuồng thăm Tuyết Câu, nhưng chìa khóa không ở trong tay ngươi."},
  lose:{tag:"Tổng quản ghi hận",w:"emp",t:"Tổng quản Thượng tứ viện không quên ngày ấy. Từ nay mỗi lần ngươi xuống chuồng, sổ của lão lại có thêm một dòng.",go:()=>{RD_FL("bd_san.tq","foe");return""}}}});

rdDef("bd_san",6,{t:"Đai yên bị cắt",w:"maid",sj:"sợi đai yên của Tuyết Câu",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng hẹn cưỡi ngựa với ngươi ở bãi tập Tây Uyển. Sáng hôm ấy, đai yên của Tuyết Câu bị cắt gần đứt. Sợi đai là chứng cứ, nhưng chứng cứ chỉ có giá khi có người nói ra ai cầm dao.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ba Đồ giữ lại sợi đai",w:"maid",if:RDW(1),t:"Ba Đồ thắng yên lúc trời chưa sáng thì thấy sợi đai bị cứa sâu, chỉ còn một lớp da. Y không thay, mà giữ nguyên, dắt ngựa về chuồng và nhắn vào cung.",o:[
  {n:"Bảo y giữ nguyên sợi đai, không cho ai chạm",f:"proof",wx:"chứng cứ còn nguyên",lx:"buổi cưỡi ngựa phải hoãn",rt:"Sợi đai được cuộn trong vải, cất trong rương áo cưỡi của ngươi.",go:()=>{RD_FL("bd_san.girth","kept");return""}},
  {n:"Thay đai mới, vẫn đi cưỡi như hẹn",f:"calm",wx:"Hoàng thượng không phải chờ",lx:"kẻ cắt đai biết việc đã lộ",rt:"Ngươi cưỡi bên ngài cả buổi, mặt không đổi sắc.",go:()=>{RD_FL("bd_san.girth","kept");return""}},
  {n:"Cho Ba Đồ rình xem ai quay lại chuồng",f:"trap",wx:"có thể bắt tận tay",lx:"Ba Đồ thức trắng, dễ bị phát hiện",rt:"Đêm ấy có bóng người lén vào chuồng tìm sợi đai.",rf:"Không ai quay lại."}]},
 s2:{h:"Ngã ngựa ở bãi tập",w:"maid",if:RDW(0),t:"Đai yên đứt khi Tuyết Câu đang phi. Ngươi ngã xuống cát, may chỉ trầy tay. Ba Đồ nhặt sợi đai lên: vết cắt gọn như dao.",o:[
  {n:"Giữ sợi đai, không nói với ai",f:"proof",wx:"chứng cứ trong tay",lx:"người ta tưởng ngươi vụng",rt:"Sợi đai cất trong rương. Người ta chỉ biết ngươi ngã ngựa.",go:()=>{RD_FL("bd_san.girth","kept");return""}},
  {n:"Đưa sợi đai cho Hoàng thượng xem ngay",f:"open",wx:"ngài thấy rõ có kẻ hại ngươi",lx:"kẻ cắt đai kịp xóa dấu",rt:"Hoàng thượng cầm sợi đai, mặt sầm lại.",rf:"Hoàng thượng hỏi: “Đai cũ thì đứt, có gì lạ?”",go:()=>{RD_FL("bd_san.girth","given");return""}},
  {n:"Cười cho qua, xin cưỡi lại ngay",f:"calm",wx:"không ai thấy ngươi sợ",lx:"tay đau, cưỡi khó",rt:"Ngươi thắng đai mới, phi thêm ba vòng bãi.",go:()=>{RD_FL("bd_san.girth","kept");return""}}]},
 c1:{h:"Thái giám cung {v}",w:"v",need:["v"],t:"Một phu ngựa nhỏ ở Thượng tứ viện kể với Ba Đồ: đêm trước có một thái giám cung {v} vào chuồng, nói là đến xem ngựa hồng của chủ.",o:[
  {n:"Cho người hỏi thẳng thái giám ấy",wx:"nghe y nói gì",lx:"{v} biết ngươi đã nghi",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"Thái giám ấp úng, khai đã vào chuồng nhưng không làm gì.",rf:"Thái giám chối, rồi chạy về mách {v}."},
  {n:"Giữ phu ngựa nhỏ làm chứng",wx:"có một người chứng",lx:"bạc nuôi miệng",rt:"Phu ngựa nhỏ nhận bạc, hứa sẽ nói khi được hỏi."},
  {n:"Sang cung {v} hỏi khéo",wx:"xem {v} có biết không",lx:"{v} thấy ngươi đến tận nơi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} tái mặt: nàng ta không biết người của mình vào chuồng.",rf:"{v} nói: “Chuồng ngựa ai vào chẳng được?”"}]},
 c2:{h:"Phu ngựa nhỏ",w:"maid",t:"Phu ngựa nhỏ ở Thượng tứ viện còn kể: con dao cắt đai là dao cắt cỏ của chuồng, sáng ra đã được treo lại chỗ cũ.",o:[
  {n:"Cho lấy con dao về giữ",wx:"thêm một chứng vật",lx:"Tổng quản hỏi vì sao mất dao",rt:"Con dao được gói chung với sợi đai."},
  {n:"Nhờ Ba Đồ đánh dấu con dao, để nguyên chỗ",wx:"xem ai lấy lại",lx:"có thể không ai lấy",rt:"Ba Đồ khắc một vạch nhỏ dưới chuôi dao."},
  {n:"Bỏ bạc để phu ngựa nhỏ chuyển sang hầu chuồng của ngươi",wx:"người chứng ở gần ngươi",lx:"bạc ra",rt:"Phu ngựa nhỏ sang dãy chuồng {land} làm việc."}]},
 t1:{h:"Hoàng thượng hỏi đến",w:"emp",t:"Hoàng thượng hỏi vì sao buổi cưỡi ngựa hôm ấy lại có chuyện. Ngài nhìn tay ngươi.",o:[
  {n:"Thưa thật: có kẻ cắt đai",f:"open",wx:"ngài đứng về phía ngươi",lx:"ngài muốn chứng cứ ngay",rt:"Hoàng thượng nói: “Trẫm sẽ cho Thận hình ty xét.”",rf:"Hoàng thượng nói: “Nói có kẻ hại thì phải có kẻ.”"},
  {n:"Thưa: đai cũ đứt, thiếp sơ ý",f:"calm",wx:"không làm ồn",lx:"kẻ cắt đai yên tâm",rt:"Hoàng thượng sai Thượng tứ viện đổi hết yên cũ."},
  {n:"Xin ngài cho thiếp tự tra",f:"trap",wx:"có thời gian bắt người",lx:"ngài chờ kết quả",rt:"Hoàng thượng gật: “Mười ngày.”"}]},
 x1:{h:"Sợi đai trước Thận hình ty",w:"emp",t:"Thận hình ty mở phiên xét. Thái giám cung {v} quỳ một bên, ngươi đứng một bên. Trên án là sợi đai bị cắt.",o:[
  {n:"Trình sợi đai, con dao và lời phu ngựa nhỏ",e:["win","lose"],rt:"Phu ngựa nhỏ nói rõ đêm ấy. Thái giám cung {v} cúi đầu nhận tội, khai người sai bảo.",rf:"Phu ngựa nhỏ run quá, nói lẫn lộn. Thận hình ty cho là ngươi dựng chuyện.",go:()=>{RD_FL("bd_san.girth","given");return""}},
  {n:"Đặt bẫy: để lộ tin còn sợi đai thứ hai",e:["win","lose"],rt:"Đêm ấy kẻ cắt đai quay lại chuồng tìm, Ba Đồ bắt tận tay.",rf:"Không ai mắc bẫy; người ta cười ngươi bày trò."},
  {n:"Rút đơn, chỉ xin đổi người giữ yên",e:"mid",lx:"kẻ cắt đai vẫn yên ổn",rt:"Từ nay chỉ Ba Đồ được chạm vào yên của Tuyết Câu."}]}},
 E:{win:{tag:"Kẻ cắt đai bị bắt",w:"emp",t:"Thái giám cung {v} bị đánh đòn, đuổi ra khỏi cung. Ai cũng biết hắn không tự làm, nhưng sợi đai đã nói đủ.",go:(A,G)=>{rdOan(A,"v",G[0]);return""}},
  mid:{tag:"Đai mới, lòng không yên",t:"Tuyết Câu có đai mới, Ba Đồ canh yên mỗi sáng. Kẻ cầm dao vẫn ở đâu đó trong cung."},
  lose:{tag:"Bị nói là tự vu",w:"v",t:"Hậu cung đồn ngươi tự cắt đai để vu cho người khác. {v} không cần nói gì, đã có người nói thay."}}});

rdDef("bd_san",7,{t:"Cưỡi ngựa cùng vua",w:"emp",sj:"những buổi cưỡi ngựa ngoài thành",cast(A){return rdCast(A,["v"])},
 g:"Hoàng thượng muốn ra khỏi cung, cưỡi ngựa với ngươi trên đồng cỏ ngoài cửa Đức Thắng. Trong triều, một vị Ngự sử đã viết xong tờ sớ: phi tần cưỡi ngựa theo vua là trái phép tổ tông.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài muốn ra ngoài thành",w:"emp",if:RDW(1),t:"Hoàng thượng sai người mang áo cưỡi đến cung ngươi: “Sáng mai, chỉ trẫm với nàng, mười thị vệ theo xa.”",o:[
  {n:"Nhận lời, cưỡi Tuyết Câu đi trước dẫn đường",f:"ride",wx:"ngài vui như thuở thiếu niên",lx:"đi xa, triều thần bàn tán",rt:"Hai con ngựa phi đến tận bờ sông. Ngài cười suốt đường về.",rf:"Thị vệ mất dấu ngài nửa canh giờ, cả cung náo loạn."},
  {n:"Nhận lời, xin ngài cho thị vệ đi gần",f:"care",wx:"ngài thấy ngươi lo cho ngài",lx:"cuộc đi bớt vui",rt:"Thị vệ theo sát, ngài chỉ cười: “Nàng cẩn thận hơn cả Thống lĩnh.”"},
  {n:"Xin ngài cưỡi trong Tây Uyển thôi",f:"bend",wx:"không trái lệ",lx:"ngài hơi thất vọng",rt:"Hai người cưỡi quanh hồ Tây Uyển đến trưa."}]},
 s2:{h:"Ngài cưỡi một mình",w:"maid",if:RDW(0),t:"{maid} báo: Hoàng thượng ra ngoài thành cưỡi ngựa, không gọi ngươi. Ngài cưỡi con ngựa ô mà ngươi từng chọn.",o:[
  {n:"Cưỡi Tuyết Câu đuổi theo",f:"ride",wx:"ngài thấy ngươi không chịu đứng ngoài",lx:"đuổi theo vua là liều",rt:"Ngươi bắt kịp ngài ở bờ sông. Ngài không giận, chỉ hỏi: “Nàng đuổi kịp trẫm thật à?”",rf:"Thị vệ chặn ngươi ở cửa thành."},
  {n:"Sai Ba Đồ mang nước và áo ấm theo ngài",f:"care",wx:"ngài nhận ra ai lo cho mình",lx:"ngươi không có mặt",rt:"Ngài uống nước, hỏi Ba Đồ: “Chủ ngươi đâu?”"},
  {n:"Ở lại cung, chờ ngài về",f:"bend",wx:"giữ đúng phận",lx:"ngài quen cưỡi một mình",rt:"Ngài về lúc chiều, chỉ ghé qua cung ngươi một lát."}]},
 c1:{h:"Tờ sớ của Ngự sử",w:"emp",t:"Tờ sớ đến ngự án: “Phi tần cưỡi ngựa theo vua ra ngoài thành, thì hậu cung còn phép gì?” Tên ngươi không có trong sớ, nhưng ai đọc cũng biết.",o:[
  {n:"Viết một bức thư nhỏ dâng ngài, nói về phép cưỡi ngựa của {land}",wx:"ngài có lời để đáp Ngự sử",lx:"chữ ngươi đến tay triều thần",rt:"Ngài đọc thư, gác tờ sớ sang bên.",rf:"Thư của ngươi bị chép lại, truyền khắp các bộ."},
  {n:"Xin Thái hậu một lời",wx:"có người trên che chở",lx:"nợ Đức Thọ cung một ơn",rt:"Thái hậu nói với Ngự sử: “Thời tiên đế cũng có phi tần cưỡi ngựa.”",rf:"Thái hậu chỉ nói: “Ngựa là việc của đàn ông.”"},
  {n:"Tạm thôi cưỡi ngựa ít ngày",wx:"tờ sớ hết lửa",lx:"ngài phải cưỡi một mình",rt:"Áo cưỡi treo trên vách mười ngày."}]},
 c2:{h:"{v} cũng xin theo",w:"v",need:["v"],t:"{v} tâu xin được theo Hoàng thượng cưỡi ngựa, nói nàng ta cũng biết cưỡi. Thật ra nàng ta chỉ ngồi được trên lưng ngựa đi bước.",o:[
  {n:"Dạy {v} cưỡi cho vững",wx:"{v} nợ ngươi một ơn",lx:"mất mấy buổi chiều",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Sau năm buổi, {v} phi được một vòng bãi. Nàng ta nhìn ngươi khác hẳn.",rf:"{v} ngã, đổ tội cho ngựa của ngươi."},
  {n:"Để {v} theo, chọn cho nàng ta ngựa hiền",wx:"không ai nói ngươi giữ ngài",lx:"cuộc đi có thêm người",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} cưỡi con ngựa già, đi sau cả đoàn."},
  {n:"Tâu rằng đường ngoài thành không hợp người mới học",wx:"giữ được buổi cưỡi riêng",lx:"{v} nhớ mặt ngươi",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng thượng gật đầu. {v} lui ra, mặt lạnh."}]},
 t1:{h:"Đường về qua làng",w:"emp",t:"Trên đường về, ngựa đi qua một làng ven sông. Mùa màng thất, dân ra ruộng nhặt từng bông lúa. Hoàng thượng hỏi ngươi: “Ở {land}, năm đói người ta làm gì?”",o:[
  {n:"Thưa thật: người thảo nguyên chia nhau đàn gia súc",f:"open",wx:"ngài nghe chuyện nước ngươi bằng lòng thật",lx:"ngài có thể cho là ngươi khoe",rt:"Ngài lặng nghe, rồi sai thị vệ ghi tên làng để xá thuế.",rf:"Ngài nói: “Đại Hy không phải thảo nguyên.”"},
  {n:"Xin ngài xuống ngựa hỏi dân",f:"care",wx:"dân làng được thấy mặt vua",lx:"về cung muộn",rt:"Ngài xuống ngựa, cầm tay một ông lão. Ngươi đứng sau, dắt hai con ngựa."},
  {n:"Lấy túi bạc bên yên chia cho dân",f:"give",wx:"dân làng nhớ ơn",lx:"bạc ra",rt:"Dân làng quỳ hai bên đường, gọi ngươi là “phu nhân áo cưỡi”."}]},
 x1:{h:"Tờ sớ trước ngự án",w:"emp",t:"Phiên triều sáng, Ngự sử quỳ đọc lại tờ sớ. Hoàng thượng cho người hỏi ngươi một câu: “Nàng muốn trẫm trả lời thế nào?”",o:[
  {n:"Xin dạy các công chúa nhỏ cưỡi ngựa, để cưỡi ngựa thành phép",e:["win","lose"],rt:"Hoàng thượng phán: từ nay các công chúa học cưỡi ngựa, người dạy là phi tần {land}. Ngự sử lui.",rf:"Triều thần xôn xao: công chúa Đại Hy học phép người rợ? Ngài phải gác lại."},
  {n:"Xin ngài để thiếp tự đến Ngự sử đài tạ lỗi",e:["win","lose"],rt:"Ngự sử thấy ngươi đến, không giận được nữa. Lão chỉ xin ngươi mặc áo chùng dài khi cưỡi.",rf:"Ngự sử từ chối gặp, lại viết thêm một tờ sớ."},
  {n:"Thưa: thiếp thôi cưỡi ngựa ngoài thành",e:"mid",lx:"những buổi ngoài thành chấm dứt",rt:"Ngài gật đầu, rồi im lặng rất lâu."}]}},
 E:{win:{tag:"Người cùng ngài phi ngựa",w:"emp",t:"Những buổi sáng ngoài cửa Đức Thắng thành chuyện cả kinh thành biết. Ngự sử không viết thêm. Hoàng thượng nói với ngươi những điều ngài không nói trong điện."},
  mid:{tag:"Áo cưỡi cất vào rương",t:"Ngươi cất áo cưỡi. Hoàng thượng vẫn đến cung ngươi, nhưng ngài thôi nhắc đến đồng cỏ ngoài thành."},
  lose:{tag:"Lời sớ thắng",w:"emp",t:"Tờ sớ được ghi vào sổ triều. Ngươi thành gương xấu để các ma ma dạy cung nữ mới: phi tần không được cưỡi ngựa."}}});

rdDef("bd_san",8,{t:"Dịch ngựa",w:"emp",sj:"dịch bệnh ở Thượng tứ viện",cast(A){return rdCast(A,["v"])},
 g:"Ngựa ở Thượng tứ viện chảy nước mũi, bỏ ăn, rồi gục xuống từng con. Biên ải đang chờ một đợt chiến mã. Binh bộ hỏi: ngựa {land} có mang bệnh vào không?",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tổng quản xin ngươi xem bệnh",w:"emp",if:RDW(1),t:"Tổng quản Thượng tứ viện đứng ngoài cửa cung ngươi từ sáng sớm: “Ba mươi con đã gục. Thú y của viện không biết bệnh gì.”",o:[
  {n:"Theo Tổng quản xuống chuồng ngay",f:"cure",wx:"ngươi thấy bệnh tận mắt",lx:"phi tần vào chuồng dịch, người ta sợ",rt:"Ngươi nhận ra bệnh: ngựa thảo nguyên gọi là sốt cỏ ướt.",rf:"Ngươi chưa nhận ra bệnh gì."},
  {n:"Sai Ba Đồ xuống xem rồi về kể",f:"slow",wx:"ngươi không phải vào chuồng dịch",lx:"chậm một ngày",rt:"Ba Đồ về kể từng dấu bệnh. Ngươi nghĩ ra cách chữa."},
  {n:"Viết thư hỏi thầy ngựa ở {land}",f:"home",wx:"có người biết bệnh thật",lx:"thư đi lâu",rt:"Thư theo người đưa tin của sứ quán đi ngay trong đêm."}]},
 s2:{h:"Binh bộ đổ tội ngựa {land}",w:"v",if:RDW(0),t:"Binh bộ dâng tấu: dịch bắt đầu từ dãy chuồng ngựa {land}. Người nhà {v} trong Binh bộ đòi đem cả đàn ngựa {land} ra đốt.",o:[
  {n:"Xin Hoàng thượng cho ba ngày chữa",f:"cure",wx:"đàn ngựa còn cơ hội",lx:"nếu thất bại thì tội về ngươi",rt:"Hoàng thượng cho ba ngày.",rf:"Hoàng thượng chỉ cho một ngày."},
  {n:"Chứng minh dịch bắt đầu từ chuồng khác",f:"proof",wx:"ngựa {land} được rửa tiếng",lx:"phải tìm sổ chuồng",rt:"Sổ chuồng ghi con ngựa gục đầu tiên ở dãy chuồng Đại Hy.",rf:"Sổ chuồng đã bị sửa."},
  {n:"Xin tự bỏ bạc chuộc đàn ngựa ra ngoài thành nuôi riêng",f:"home",wx:"ngựa không bị đốt",lx:"bạc ra nhiều",rt:"Đàn ngựa {land} được dắt ra bãi cỏ ngoài thành."}]},
 c1:{h:"Thú y Thượng tứ viện",w:"emp",t:"Thú y của Thượng tứ viện muốn cho ngựa uống thuốc đắng và trích máu theo sách. Ba Đồ lắc đầu: ngựa yếu mà trích máu thì chết.",o:[
  {n:"Bàn với thú y, chọn cách nào hợp cả hai",wx:"thú y nể ngươi",lx:"mất thời gian bàn",rt:"Thú y thôi trích máu, giữ thuốc đắng."},
  {n:"Đứng về phía Ba Đồ",wx:"ngựa không bị trích máu",lx:"thú y oán ngươi",rt:"Thú y lui ra, mặt sầm."},
  {n:"Để thú y làm theo sách",wx:"ngươi không chịu trách nhiệm nếu ngựa chết",lx:"thêm ngựa chết",rt:"Thú y trích máu mười con, sáu con gục."}]},
 c2:{h:"{v} đồn ngựa {land} mang bệnh",w:"v",need:["v"],t:"Khắp hậu cung truyền lời: ngựa {land} mang dịch vào kinh, chủ của chúng cũng không sạch. Lời ấy bắt đầu từ cung {v}.",o:[
  {n:"Mời {v} xuống chuồng xem tận mắt",wx:"lời đồn mất gốc",lx:"{v} thấy ngươi thách",go:(A,ok,G)=>{rdOan(A,"v",ok?G[0]:G[1]);return""},rt:"{v} không dám xuống chuồng dịch. Lời đồn tắt.",rf:"{v} xuống chuồng, chỉ vào một con ngựa {land} đang ho."},
  {n:"Gửi {v} một gói thuốc phòng dịch",wx:"tỏ ra không để bụng",lx:"{v} có thể cho là ngươi chột dạ",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nhận thuốc, không nói gì."},
  {n:"Lặng im, chữa ngựa cho xong",wx:"không mất sức cãi",lx:"lời đồn còn đó",rt:"Ngươi không đáp lời nào."}]},
 t1:{h:"Binh bộ thúc ngựa",w:"emp",t:"Thư biên ải đến: phải có một đợt chiến mã trước mùa tuyết. Binh bộ hỏi Thượng tứ viện còn bao nhiêu con khỏe.",o:[
  {n:"Chọn những con khỏe nhất gửi đi",f:"cure",wx:"biên ải có ngựa",lx:"có thể mang mầm bệnh theo",rt:"Đợt ngựa lên đường, đến ải khỏe mạnh.",rf:"Ba con gục giữa đường."},
  {n:"Xin hoãn một tháng, cho ngựa khỏi hẳn",f:"slow",wx:"không mang dịch ra ải",lx:"Binh bộ trách",rt:"Binh bộ hoãn, ghi tên ngươi vào tấu."},
  {n:"Xin {land} gửi gấp một đàn ngựa khỏe",f:"home",wx:"ải có ngựa mà chuồng không vơi",lx:"nợ {pv} một việc",rt:"{pv} gửi ngay năm trăm con.",rf:"Ngựa {land} đến chậm, qua mùa tuyết."}]},
 x1:{h:"Cứu chuồng ngựa",w:"emp",t:"Ngày thứ ba, dịch lan sang chuồng ngự mã. Con ngựa ô của Hoàng thượng đã bỏ ăn. Ngài hỏi: “Nàng có cách gì không?”",o:[
  {n:"Dùng cách chữa thảo nguyên: đốt ngải, tách chuồng, cho uống nước muối",e:["win","lose"],rt:"Khói ngải bay khắp Thượng tứ viện ba ngày. Con ngựa ô đứng dậy, ăn lại.",rf:"Khói ngải không cứu được con ngựa ô. Người ta nói ngươi làm bùa."},
  {n:"Cùng thú y chữa theo cả hai phép",e:["win","mid"],rt:"Thuốc Đại Hy, cách chuồng thảo nguyên: ngựa khỏi dần.",rf:"Hai phép chữa vướng nhau, ngựa khỏi chậm."},
  {n:"Thưa: thiếp không dám chữa ngựa ngự",e:"mid",lx:"không ai nhớ ngươi biết chữa",rt:"Thú y chữa theo sách. Một nửa đàn qua khỏi."}]}},
 E:{win:{tag:"Chuồng ngựa khỏi bệnh",w:"emp",t:"Thượng tứ viện hết dịch. Con ngựa ô của Hoàng thượng lại phi được. Binh bộ thôi nhắc đến ngựa {land}."},
  mid:{tag:"Mất nửa đàn",t:"Dịch qua, Thượng tứ viện mất nửa đàn ngựa. Không ai đổ tội cho ngươi, cũng không ai cảm ơn ngươi."},
  lose:{tag:"Ngựa {land} bị đổ tội",w:"v",t:"Binh bộ ghi vào sổ: dịch đến từ ngựa {land}. Biên ải thiếu ngựa qua mùa tuyết.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_san",9,{t:"Hội bắn mùa xuân",w:"emp",sj:"hội bắn cung mùa xuân",cast(A){return rdCast(A,["v"])},
 g:"Đầu xuân, Hoàng thượng mở hội bắn cho các hoàng tử, con nhà tướng và thị vệ. Ngài muốn ngươi có mặt. Người nhà {v} có một em trai là tay cung giỏi nhất cấm quân.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài mời ngươi dạy bắn",w:"emp",if:RDW(1),t:"Hoàng thượng nói: “Trẫm muốn các hoàng tử học cách bắn trên lưng ngựa. Nàng dạy được không?”",o:[
  {n:"Nhận dạy các hoàng tử",f:"teach",wx:"các hoàng tử gọi ngươi là thầy",lx:"dạy hỏng thì mang tiếng",rt:"Sau một tháng, hai hoàng tử bắn trúng bia khi ngựa đang phi.",rf:"Một hoàng tử ngã ngựa trong buổi tập đầu."},
  {n:"Xin dạy thị vệ trước, hoàng tử sau",f:"safe",wx:"không đặt hoàng tử vào chỗ liều",lx:"chậm",rt:"Thị vệ học trước, rồi tự dạy lại các hoàng tử."},
  {n:"Xin ngài cho Ba Đồ dạy thay",f:"steppe",wx:"Ba Đồ được đứng trước các hoàng tử",lx:"triều thần chê dùng người rợ",rt:"Ba Đồ dạy, ngươi đứng xem. Hoàng thượng ban cho y một tấm áo."}]},
 s2:{h:"Không có tên ngươi",w:"maid",if:RDW(0),t:"Danh sách hội bắn dán ở Tây Uyển, không có tên ngươi. {maid} nghe nói Lễ bộ gạch tên vì “phi tần không bắn trước mặt hoàng tử”.",o:[
  {n:"Xin Hoàng thượng ghi lại tên",f:"teach",wx:"ngươi được dự",lx:"Lễ bộ khó chịu",rt:"Hoàng thượng tự tay viết thêm tên ngươi.",rf:"Hoàng thượng nói: “Năm nay thôi.”"},
  {n:"Đến xem, mang cung theo",f:"safe",wx:"có mặt mà không trái lệ",lx:"chỉ đứng xem",rt:"Ngươi ngồi hàng phi tần, cây cung đặt bên cạnh."},
  {n:"Tự mở một hội bắn nhỏ trong cung mình",f:"steppe",wx:"cung nữ và thái giám được vui",lx:"bạc ra, có người nói ngươi chống Lễ bộ",rt:"Sân cung ngươi dựng ba cái bia rơm. Cung nữ cười vang đến tối."}]},
 c1:{h:"Em trai nhà {v}",w:"v",need:["v"],t:"Em trai {v} là tay cung giỏi nhất cấm quân. {v} nhắn ngươi: “Năm nay để em ta thắng, nhà ta nhớ ơn.”",o:[
  {n:"Hứa không tranh với y",wx:"nhà {v} nợ ngươi",lx:"bỏ một dịp tỏ tài",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gửi sang một hộp trà ngon."},
  {n:"Đáp: mũi tên không biết nhà ai",wx:"giữ được lòng tự trọng",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} cười nhạt: “Để xem.”"},
  {n:"Mời em trai {v} tập bắn chung",wx:"biết rõ tay cung của y",lx:"y cũng biết rõ tay ngươi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Hai người tập ba buổi. Y nể ngươi thật lòng.",rf:"Y bắn thua một buổi, về kể với chị là ngươi chơi khăm."}]},
 c2:{h:"Cây cung của tiên đế",w:"emp",t:"Thượng tứ viện tìm thấy trong kho một cây cung sừng của tiên đế, dây đã mục. Hoàng thượng muốn có người lên dây lại để dùng trong hội.",o:[
  {n:"Tự tay lên dây theo cách {land}",wx:"cây cung bắn được lại",lx:"làm hỏng thì có tội",rt:"Dây gân mới căng, cây cung bật tiếng như xưa.",rf:"Sừng cung nứt một đường nhỏ."},
  {n:"Nhờ thợ cung của Binh bộ, ngươi chỉ cách",wx:"việc xong mà không ai trách ngươi",lx:"công thuộc về thợ",rt:"Thợ cung làm theo lời ngươi, xong trong năm ngày."},
  {n:"Khuyên ngài để cây cung trong kho",wx:"giữ được vật của tiên đế",lx:"ngài tiếc",rt:"Cây cung được lau dầu, đặt lại vào hộp gấm."}]},
 t1:{h:"Gió ngược",w:"emp",t:"Ngày hội, gió bắc thổi ngược. Các tay cung Đại Hy bắn lệch cả. Ngươi biết cách bắn trong gió thảo nguyên.",o:[
  {n:"Chỉ cho các hoàng tử cách nghiêng tên",f:"teach",wx:"các hoàng tử bắn trúng",lx:"ngươi tự bỏ lợi thế",rt:"Các hoàng tử bắn trúng liền ba mũi. Hoàng thượng nhìn ngươi gật đầu."},
  {n:"Giữ cách bắn cho riêng mình",f:"self",wx:"chỉ ngươi bắn trúng trong gió",lx:"người ta nói ngươi giấu nghề",rt:"Mũi tên của ngươi trúng hồng tâm giữa gió."},
  {n:"Tâu xin dời hội sang buổi chiều lặng gió",f:"safe",wx:"hội công bằng cho mọi người",lx:"ngài phải đợi",rt:"Chiều xuống, gió lặng. Hội bắn lại từ đầu."}]},
 x1:{h:"Mũi tên cuối",w:"emp",t:"Còn mũi tên cuối. Em trai {v} đang dẫn trước một điểm. Hoàng thượng nhìn sang ngươi.",o:[
  {n:"Tự giương cung bắn mũi cuối",e:["win","lose"],rt:"Mũi tên của ngươi xẻ đôi mũi tên của em trai {v} trên hồng tâm. Cả Tây Uyển đứng dậy.",rf:"Gió đổi chiều đúng lúc buông dây, tên ngươi cắm ngoài vòng."},
  {n:"Đưa cây cung cho hoàng tử ngươi đã dạy",e:["win","mid"],rt:"Hoàng tử bắn trúng hồng tâm, quay lại cúi đầu với ngươi trước cả triều.",rf:"Hoàng tử bắn trúng vòng hai. Ngài vẫn khen."},
  {n:"Hạ cung, chúc em trai {v} thắng",e:"mid",lx:"ngươi không bắn mũi cuối",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Em trai {v} thắng hội. {v} gật đầu với ngươi từ xa."}]}},
 E:{win:{tag:"Cung thần của hậu cung",w:"emp",t:"Hoàng thượng ban cho ngươi cây cung sừng của tiên đế. Từ nay, hội bắn nào cũng có ghế của ngươi."},
  mid:{tag:"Tên trúng, người không nhớ",t:"Hội bắn tan. Người ta nhớ ai thắng, còn ngươi được nhớ là người đã có mặt."},
  lose:{tag:"Tên trượt trước cả triều",w:"v",t:"Cả triều thấy mũi tên của ngươi cắm ngoài vòng. {v} sai người mang sang một bó tên tập, gọi là quà."}}});

rdDef("bd_san",10,{t:"Tiếng gọi thảo nguyên",w:"maid",sj:"con ngựa thắng sẵn ở cửa Tây",cast(A){return rdCast(A,["v"])},
 g:"Một đàn ngựa {land} xuống chợ biên mùa hạ. Thư {mh} gửi theo đàn ngựa chỉ một câu: “Cỏ năm nay cao lắm.” Ba Đồ nói nhỏ với ngươi: y đã thắng sẵn một con ngựa ở cửa Tây.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư của {mh}",w:"maid",if:RDW(1),t:"Thư {mh} đến kèm một túi cỏ khô thảo nguyên. Ngươi mở túi, mùi cỏ làm ngươi nhớ những buổi chiều trên lưng ngựa.",o:[
  {n:"Hồi thư kể chuyện Đại Hy cho mẹ",f:"stay",wx:"{mh} yên lòng",lx:"lòng ngươi càng nhớ",rt:"Ngươi viết suốt đêm, kể cả chuyện cây cung của tiên đế."},
  {n:"Treo túi cỏ trong chuồng Tuyết Câu",f:"north",wx:"ngựa và người cùng nhớ quê",lx:"người ta thấy ngươi buồn",rt:"Tuyết Câu hít túi cỏ, hí một tiếng dài."},
  {n:"Đưa thư cho Hoàng thượng đọc",f:"open",wx:"ngài hiểu lòng ngươi",lx:"thư nhà thành chuyện của triều",rt:"Ngài đọc, rồi hỏi: “Nàng có muốn về thăm không?”",rf:"Ngài đọc, rồi không nói gì."}]},
 s2:{h:"Đàn ngựa ở chợ biên",w:"maid",if:RDW(0),t:"Người buôn từ chợ biên về kể: đàn ngựa {land} năm nay có một con trắng giống hệt Tuyết Câu, là con của mẹ nó. Người chăn hỏi thăm công chúa.",o:[
  {n:"Bỏ bạc mua con ngựa ấy về kinh",f:"stay",wx:"có thêm một con ngựa quê nhà",lx:"bạc ra",rt:"Con ngựa trắng về đến Thượng tứ viện, đứng cạnh Tuyết Câu."},
  {n:"Nhờ người buôn mang thư hỏi thăm người chăn",f:"north",wx:"có tin quê",lx:"thư qua tay người lạ",rt:"Người buôn nhận thư, hứa mùa sau mang hồi âm."},
  {n:"Lặng im, không hỏi thêm",f:"open",wx:"không ai thấy ngươi nhớ nhà",lx:"lòng ngươi nặng",rt:"Ngươi về cung, đóng cửa sớm."}]},
 c1:{h:"Con ngựa ở cửa Tây",w:"maid",t:"Ba Đồ thưa: con ngựa thắng sẵn ở cửa Tây là ngựa nhanh nhất y từng nuôi. Nếu ngươi muốn, một đêm là ra khỏi kinh, mười đêm là tới cỏ.",o:[
  {n:"Bảo Ba Đồ trả ngựa về chuồng",wx:"không để lại dấu",lx:"Ba Đồ buồn",rt:"Ba Đồ cúi đầu, dắt ngựa về."},
  {n:"Bảo Ba Đồ cứ để ngựa đó",wx:"một đường lui còn mở",lx:"có người thấy ngựa lạ ở cửa Tây",rt:"Con ngựa vẫn buộc ở cửa Tây, cỏ đầy máng.",rf:"Lính cửa Tây hỏi ngựa của ai.",go:()=>{RD_FL("bd_san.westgate",1);return""}},
  {n:"Cho Ba Đồ cưỡi con ngựa ấy về thăm nhà",wx:"y về quê mà ngươi ở lại",lx:"mất người giữ ngựa một thời gian",rt:"Ba Đồ lạy ngươi ba lạy, ra cửa Tây lúc gà gáy.",go:()=>bdMove("bado","tn")}]},
 c2:{h:"{v} hỏi về cửa Tây",w:"v",need:["v"],t:"{v} vô tình nhắc trong buổi thỉnh an: “Nghe nói có con ngựa {land} buộc ở cửa Tây cả tháng, chẳng biết đợi ai.”",o:[
  {n:"Cười: ngựa của người buôn",wx:"câu chuyện dừng ở đó",lx:"{v} chưa tin",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return""},rt:"Không ai hỏi thêm.",rf:"{v} cười: “Người buôn nào buộc ngựa ở cửa cung?”"},
  {n:"Thưa thật: ngựa của phu ngựa nhà mình",wx:"không ai bắt được lỗi nói dối",lx:"{v} nắm được một chuyện",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} gật đầu, không nói gì nữa."},
  {n:"Hỏi lại {v} sao biết rõ thế",wx:"{v} lộ là có người rình",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} đỏ mặt, đổi sang chuyện khác."}]},
 t1:{h:"Hoàng thượng hỏi",w:"emp",t:"Đêm ấy Hoàng thượng đến, ngồi rất lâu rồi hỏi: “Nếu trẫm cho nàng về {land} một chuyến, nàng có quay lại không?”",o:[
  {n:"Thưa: thiếp quay lại, vì ngài ở đây",f:"stay",wx:"ngài yên lòng",lx:"một lời hứa phải giữ",rt:"Ngài nắm tay ngươi đến sáng."},
  {n:"Thưa: thiếp không biết",f:"north",wx:"ngươi không nói dối ngài",lx:"ngài lo",rt:"Ngài im lặng, rồi nói: “Trẫm hiểu.”",rf:"Ngài đứng dậy, ra về sớm."},
  {n:"Xin ngài cùng đi một chuyến ra ải",f:"open",wx:"ngài thấy được quê ngươi",lx:"đi ra ải là việc lớn",rt:"Ngài cười: “Để mùa thu.”"}]},
 x1:{h:"Đêm ở cửa Tây",w:"maid",t:"Đêm rằm, trăng sáng như ban ngày. Con ngựa ở cửa Tây vẫn chờ. Gió từ phương bắc thổi vào tận sân cung ngươi.",o:[
  {n:"Ở lại, xin Hoàng thượng cho về thăm cố hương theo lễ",e:["win","lose"],rt:"Hoàng thượng chuẩn: mùa thu năm sau, ngươi theo sứ đoàn về thăm {land}, có cấm quân hộ tống.",rf:"Lễ bộ bác: phi tần hòa thân không có lệ về nước."},
  {n:"Lên ngựa ra cửa Tây, phi một vòng đồng rồi về trước sáng",e:["win","lose"],rt:"Ngươi phi đến tận bờ sông, nhìn về phương bắc, rồi quay về trước khi trống canh năm. Không ai biết, trừ con ngựa.",rf:"Lính cửa Tây giữ ngươi lại lúc quay về. Sáng ra, cả cung biết.",go:()=>{RD_FL("bd_san.rode",1);return""}},
  {n:"Bảo Ba Đồ dắt ngựa về chuồng, đóng cửa sổ",e:"mid",lx:"gió bắc không còn gọi",rt:"Con ngựa về chuồng. Ngươi đóng cửa sổ, ngồi đến sáng."}]}},
 E:{win:{tag:"Gió bắc trong tay áo",w:"emp",t:"Ngươi vẫn ở Đại Hy, nhưng gió thảo nguyên không bỏ ngươi. Hoàng thượng biết điều ấy, và không bắt ngươi quên."},
  mid:{tag:"Ngựa về chuồng",t:"Con ngựa ở cửa Tây không còn. Ngươi vẫn ra chuồng thăm Tuyết Câu, nhưng thôi nhìn về phương bắc."},
  lose:{tag:"Bị bắt ở cửa Tây",w:"emp",t:"Phi tần ra khỏi cửa cung lúc nửa đêm. Hoàng thượng không trách, nhưng cho đóng cửa cung ngươi.",go:()=>bdConfine("san10")}}});

rdDef("bd_san",11,{t:"Vi trường năm sau",w:"emp",sj:"cuộc săn thu năm sau",cast(A){return rdCast(A,["v"])},
 g:"Thu lại về, cuộc săn ở Bắc Uyển lại mở. Ba Đồ thấy trong rừng phong có người lạ mặc áo thị vệ mà không mang thẻ. Lần này, một mũi tên sẽ không chỉ quyết ai nhìn thấy ngươi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngươi cưỡi đầu đoàn",w:"emp",if:RDW(1),t:"Hoàng thượng cho ngươi cưỡi Tuyết Câu đi ngay sau ngự mã. Các phi tần ngồi xe phía sau nhìn theo.",o:[
  {n:"Đi sát ngự mã, mắt nhìn rừng",f:"guard",wx:"ngài có người canh bên cạnh",lx:"không còn là cuộc vui",rt:"Ngươi thấy trước mọi bụi cây động."},
  {n:"Mời một phi tần lên ngựa cưỡi cùng",f:"share",wx:"hậu cung bớt ghen",lx:"phải lo thêm một người",rt:"Hai con ngựa đi song song sau ngự giá."},
  {n:"Đi trước dò đường",f:"scout",wx:"thấy được người lạ trước",lx:"cách xa ngài",rt:"Ngươi thấy dấu chân người trong rừng phong.",rf:"Ngươi đi xa quá, mất dấu đoàn."}]},
 s2:{h:"Ngươi ngồi xe",w:"maid",if:RDW(0),t:"Năm nay ngươi phải ngồi xe che rèm. Tuyết Câu đi không người cưỡi sau xe. Ba Đồ dắt ngựa, nhìn vào rừng.",o:[
  {n:"Xin xuống xe, cưỡi Tuyết Câu",f:"guard",wx:"ngươi ở gần ngự giá",lx:"trái lệnh",rt:"Hoàng thượng thấy ngươi lên ngựa, chỉ cười.",rf:"Thái bộc giữ ngươi lại trong xe."},
  {n:"Bảo Ba Đồ theo sát ngự mã",f:"scout",wx:"có người mình gần ngài",lx:"Ba Đồ không có quyền",rt:"Ba Đồ dắt Tuyết Câu đi sát cấm quân."},
  {n:"Vén rèm, đếm thị vệ",f:"share",wx:"biết ai thừa ra",lx:"người ta thấy ngươi tò mò",rt:"Thị vệ đếm được thừa ra hai người."}]},
 c1:{h:"Người lạ mặc áo thị vệ",w:"maid",t:"Ba Đồ nói khẽ: hai người lạ mặc áo thị vệ, đeo cung dài, đứng ở mé rừng phía tây. Thống lĩnh cấm quân không biết họ.",o:[
  {n:"Báo ngay Thống lĩnh cấm quân",wx:"cấm quân đề phòng",lx:"lỡ là người thật thì mang tiếng",rt:"Cấm quân dàn hàng ở mé rừng tây.",rf:"Thống lĩnh bảo: người của Nội vụ phủ, không có gì."},
  {n:"Bảo Ba Đồ theo dõi, không động",wx:"không đánh động",lx:"chậm một bước",rt:"Ba Đồ nấp sau gốc phong, mắt không rời hai người."},
  {n:"Tự phi ngựa đến hỏi thẻ bài",wx:"biết ngay thật giả",lx:"ngươi một mình gần kẻ có cung",rt:"Hai người không có thẻ, lùi vào rừng.",rf:"Hai người chìa thẻ ra, là thẻ thật của Nội vụ phủ."}]},
 c2:{h:"{v} đổi chỗ xe",w:"v",need:["v"],t:"{v} xin Thái bộc cho xe mình đi lên gần ngự giá, sát chỗ con đường vào rừng phong.",o:[
  {n:"Nhắc {v} chỗ ấy không yên",wx:"cứu {v} nếu có chuyện",lx:"{v} cho là ngươi ghen",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nghe, cho xe lùi lại.",rf:"{v} không nghe."},
  {n:"Để mặc {v}",wx:"không dính vào",lx:"nếu có chuyện, xe {v} ở đầu",rt:"Xe {v} đi sát ngự giá."},
  {n:"Xin Thái bộc giữ mọi xe ở sau",wx:"công bằng cho mọi người",lx:"{v} biết ngươi chặn",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Thái bộc giữ xe lại. {v} nhìn ngươi."}]},
 t1:{h:"Hoàng thượng trao cung",w:"emp",t:"Trước khi vào rừng, Hoàng thượng trao cho ngươi cây cung sừng của mình: “Nàng giữ, trẫm cưỡi cho nhẹ.”",o:[
  {n:"Nhận cung, đi sát ngài",f:"guard",wx:"có cung trong tay khi cần",lx:"cả đoàn thấy ngài tin ngươi quá",rt:"Cây cung nằm ngang yên Tuyết Câu."},
  {n:"Xin ngài giữ cung",f:"share",wx:"ngài tự vệ được",lx:"ngài nghĩ ngươi từ chối",rt:"Ngài cười, đeo cung lên vai."},
  {n:"Nhận cung, lắp sẵn một mũi tên",f:"scout",wx:"sẵn sàng",lx:"người ta thấy ngươi căng thẳng",rt:"Ngươi lắp tên, tay không run."}]},
 x1:{h:"Mũi tên từ rừng phong",w:"emp",t:"Giữa trưa, một mũi tên rít ra từ rừng phong, nhắm thẳng ngự giá. Mũi thứ hai đang lên dây.",o:[
  {n:"Thúc Tuyết Câu chắn mũi tên",e:["win","lose"],rt:"Mũi tên cắm vào yên Tuyết Câu, cách tay ngươi một tấc. Ngự giá an toàn. Hoàng thượng ôm lấy ngươi giữa cấm quân.",rf:"Tuyết Câu trúng tên vào vai, ngã quỵ. Ngươi ngã theo, mũi thứ hai sượt qua ngự giá.",go:(A,ok)=>{if(!ok)bdP("tuyetcau","hurt",1);return""}},
  {n:"Bắn trả về phía rừng, bắt sống kẻ bắn",e:["win","lose"],rt:"Mũi tên của ngươi xuyên tay kẻ đang kéo dây. Cấm quân bắt được hắn, hắn khai người sai khiến.",rf:"Tên ngươi trượt. Kẻ bắn chạy mất vào rừng."},
  {n:"Kéo cương ngự mã chạy khỏi bãi",e:["mid","lose"],rt:"Ngự mã theo Tuyết Câu chạy ra khỏi bãi. Cả hai về đến trại, ngài không bị gì.",rf:"Ngự mã hoảng, hất ngài ngã ở bìa rừng."}]}},
 E:{win:{tag:"Nữ kỵ bên ngự giá",w:"emp",t:"Từ hôm ấy, Hoàng thượng đi đâu cũng có ngươi cưỡi bên. Thượng tứ viện, Tây Uyển, Bắc Uyển: con ngựa trắng đi sau ngự mã ai cũng biết là ai."},
  mid:{tag:"Ngựa về chuồng, người về cung",t:"Cuộc săn khép lại sớm. Ngươi đã giữ được ngài, nhưng không ai kể chuyện ấy như một chiến công."},
  lose:{tag:"Mũi tên lạc",w:"v",t:"Kẻ bắn không bị bắt. Hậu cung thì thầm: mũi tên ấy nhắm vào ai, có khi chỉ người {land} biết.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"bd_san_11",tag:"Hoàng thượng trao cương ngựa ngự",w:"emp",n:"Nhảy sang lưng ngự mã, cầm cương thay ngài",
 path:["Bắn ngay","Chọn con ngựa xấu","Tâu xin cho Ba Đồ","Đặt bẫy","Trình sợi đai","Nhận lời, cưỡi Tuyết Câu","Xin dạy các công chúa","Dùng cách chữa thảo nguyên","Tự giương cung","Nhận dạy các hoàng tử","Đi sát ngự mã","Nhận cung"],
 bad:["Ngồi xe","Thưa: thiếp thôi cưỡi","Thưa: thiếp không dám"],x:[()=>S.suc>=RR("bd_san_11").bar,"Sức từ "+RR("bd_san_11").bar],
 t:"Ngươi nhảy sang lưng ngự mã đang hoảng, ghì cương, đưa ngài ra khỏi tầm tên trong một hơi thở. Ba hôm sau, Hoàng thượng ban chiếu: phi tần {land} được giữ cương ngựa ngự trong mọi cuộc săn, đặt chức Ngự mã nữ quan đầu tiên của Đại Hy. Tuyết Câu được ăn trong máng bạc.",
 go:(_A,G)=>e67bien(G[0]),rw:"bienngu",ti:"Người giữ cương ngựa ngự"}));

/* =====================================================================================================================================
   bd_soi · Sói đầu đàn (Quyền lực · Gia tộc; GRAND_ENDINGS §4.2 worked sample). People: {pv} (falls from his horse), {mh} (Khả đôn, comes to
   the capital at .8: BDP move "kinh" via fb "bd.p.kd.w"), thúc phụ Hô Diên Liệt (BDP.lie), em trai Ô Lặc (BDP.olac), Thát Mộc (BDP.thatmoc),
   {emp}, {v}. Objects: the copy of the border map (fb bd_soi.map: kept / false / given / burnt), the uncle's letters (fb bd_soi.letters).
   GE intents: ge1 Nữ Khả hãn (keep the map, turn Thát Mộc, refuse the market deal, arm the Khả đôn's guard, ride the race herself, trade
   troops for the tribes' oath) · ge2 Lập em làm hãn (honest letters, spare Thát Mộc, reopen the market, shelter the Khả đôn openly, a champion
   for the brother, envoys not troops; closed by stealing the map / poison) · ge3 Sói già phải chết (false map, kill Thát Mộc, push war, bait,
   bribe the judges, the whole army) · ge4 Con trai hai cõi (shelter the Khả đôn, race under the prince's banner, the brother's oath to her son).
   ===================================================================================================================================== */
RTHEME67.bd_soi="emp";
const BDSON=()=>{try{return !!son67()}catch(e){return false}};
ARC67.bd_soi=bdArc("bd_soi",{o:"bd",t:"Sói đầu đàn",w:"emp",sj:"kim trướng của {land}",cast(A){return rdCast(A,["v"])},
 g:"{pv} ngã ngựa trong buổi săn mùa đông, nằm mê man trong kim trướng. Thúc phụ Hô Diên Liệt sai sứ vào kinh, xin Đại Hy công nhận mình giữ trướng. Em trai Ô Lặc của ngươi mới mười sáu tuổi, gửi thư cầu cứu. Hoàng thượng hỏi ngươi.",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Tin dữ từ thảo nguyên",w:"emp",t:"Người đưa tin quỳ ngoài cung, áo lông còn đọng tuyết: {pv} ngã ngựa, chưa tỉnh. Thúc phụ Hô Diên Liệt đã dời lều mình vào sát kim trướng.",o:[
  {n:"Xin Hoàng thượng cho thái y theo sứ lên bắc",f:"kin",wx:"{pv} có thầy thuốc giỏi",lx:"Đại Hy nhúng tay vào việc trướng",rt:"Hoàng thượng sai hai thái y theo người đưa tin lên đường ngay.",rf:"Thái y viện tâu: đường tuyết, không ai dám đi."},
  {n:"Hỏi người đưa tin ai đang giữ quân",f:"cold",wx:"biết rõ thế trong trướng",lx:"bị coi là lạnh lòng",rt:"Người đưa tin kể: quân cận vệ còn theo {pv}, nhưng các bộ lạc nhỏ đã sang lều thúc phụ."},
  {n:"Gửi ngay vòng ngọc của mẹ cho Ô Lặc làm tin",f:"kin",wx:"em trai biết ngươi đứng về phía nó",lx:"thúc phụ biết ngươi chọn phe",rt:"Chiếc vòng ngọc theo người đưa tin về bắc.",go:()=>bdMeet("olac")}]},
 s2:{h:"Sứ của thúc phụ",w:"emp",t:"Sứ của Hô Diên Liệt vào chầu, dâng hai mươi con ngựa và một bức thư: “Đại Hy công nhận ta, ta giữ biên ải yên như {pv}.” Sứ nhìn ngươi khi nói câu ấy.",o:[
  {n:"Đứng sau rèm nghe hết, không nói",f:"cold",wx:"biết thúc phụ muốn gì",lx:"sứ cho là ngươi đã ngả",rt:"Ngươi nghe đến chữ cuối, ghi nhớ từng điều kiện.",go:()=>bdMeet("lie")},
  {n:"Xin Hoàng thượng hỏi sứ về sức khỏe {pv}",f:"kin",wx:"sứ lộ là thúc phụ không mong {pv} tỉnh",lx:"sứ ghi hận",rt:"Sứ ấp úng, nói {pv} đã già.",rf:"Sứ đáp trơn tru: {pv} sẽ khỏi."},
  {n:"Nhận ngựa thay Hoàng thượng, cảm ơn sứ",f:"bend",wx:"sứ yên lòng, nói nhiều hơn",lx:"người ta nghĩ ngươi nhận quà thúc phụ",rt:"Sứ cảm động, kể cả chuyện các bộ lạc đã theo ai."}]},
 c1:{h:"Thư của Ô Lặc",w:"maid",t:"Thư của Ô Lặc viết bằng chữ thảo nguyên, nét còn non: “Chị, thúc phụ nói em còn nhỏ. Các bộ nghe thúc phụ. Em sợ.”",o:[
  {n:"Hồi thư dạy em cách giữ quân cận vệ",wx:"Ô Lặc có người chỉ đường",lx:"thư có thể lọt vào tay thúc phụ",rt:"Thư đi theo đoàn buôn, giấu trong yên ngựa.",rf:"Thư bị giữ ở biên ải.",go:()=>bdMeet("olac")},
  {n:"Đưa thư em lên Hoàng thượng",wx:"ngài thấy ngươi không giấu",lx:"việc nhà thành việc triều",rt:"Hoàng thượng đọc xong, nói: “Thằng bé viết chữ đẹp.”"},
  {n:"Gửi bạc cho em mua lòng các bộ",wx:"em có của để chia",lx:"bạc ra nhiều",rt:"Bạc theo đoàn buôn về bắc.",go:()=>bdMeet("olac")}]},
 c2:{h:"{v} nói ra nói vào",w:"v",need:["v"],t:"{v} nói trong buổi thỉnh an: “Người {land} giết nhau tranh trướng là thói quen, Đại Hy dính vào làm gì?”",o:[
  {n:"Đáp: biên ải yên là việc của Đại Hy",wx:"cả cung nghe ngươi nói phải",lx:"{v} bị bẽ mặt",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Các phi tần gật gù, {v} im."},
  {n:"Im lặng, cúi đầu",wx:"không gây chuyện",lx:"người ta nghĩ ngươi chịu lời ấy",rt:"Ngươi uống trà, không đáp."},
  {n:"Mời {v} sang uống sữa ngựa, kể chuyện kim trướng",wx:"{v} bớt khinh",lx:"mất một buổi chiều",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nghe chuyện kim trướng, lần đầu hỏi tên em trai ngươi.",rf:"{v} chê sữa ngựa chua."}]},
 t1:{h:"Bản đồ trong Binh bộ",w:"emp",t:"Một đêm, người của thúc phụ lén đưa vào cung ngươi một lời nhắn: nếu ngươi chép được bản đồ đồn ải phía bắc trong kho Binh bộ, thúc phụ sẽ gả Ô Lặc cho con gái mình và để nó sống.",o:[
  {n:"Đưa lời nhắn lên Hoàng thượng",f:"open",wx:"ngài thấy ngươi một lòng",lx:"thúc phụ biết ngươi trình",rt:"Hoàng thượng sai Binh bộ đổi chỗ cất bản đồ.",rf:"Hoàng thượng hỏi: “Người của hắn vào được cung nàng bằng đường nào?”",go:()=>{RD_FL("bd_soi.letters","given");return""}},
  {n:"Giữ lời nhắn, chưa đáp",f:"cold",wx:"giữ được thế chờ",lx:"thúc phụ cho là ngươi đang nghĩ",rt:"Lời nhắn nằm dưới đáy hộp trang sức.",go:()=>{RD_FL("bd_soi.letters","kept");return""}},
  {n:"Đốt lời nhắn trước mặt người đưa",f:"kin",wx:"thúc phụ biết ngươi không mua được",lx:"thúc phụ thôi giữ thể diện cho em ngươi",rt:"Lời nhắn cháy trong lò. Người đưa lui ra.",go:()=>{RD_FL("bd_soi.letters","burnt");return""}}]},
 x1:{h:"Hoàng thượng hỏi ý ngươi",w:"emp",t:"Hoàng thượng triệu sứ của thúc phụ và người đưa tin của Ô Lặc vào cùng một điện. Ngài quay sang ngươi: “Trẫm nên công nhận ai?”",o:[
  {n:"Tâu: chờ {pv} tỉnh, chưa công nhận ai",e:["win","lose"],rt:"Hoàng thượng phán: Đại Hy chỉ biết một chủ kim trướng là {pv}. Sứ thúc phụ tái mặt.",rf:"Sứ thúc phụ nói lớn: “Chờ đến khi biên ải loạn sao?” Triều thần xôn xao."},
  {n:"Tâu: Ô Lặc là con trưởng của {pv}, xin ban ấn cho em",e:["win2","lose"],rt:"Hoàng thượng ban một tờ chiếu nhận Ô Lặc là người nối trướng. Người đưa tin của em quỳ lạy ngươi.",rf:"Triều thần nói ngươi bênh em ruột; Hoàng thượng gác chiếu lại."},
  {n:"Thưa: việc ngoài ải, thiếp không dám nói",e:"mid",lx:"cả hai bên đều thấy ngươi không có tiếng",rt:"Hoàng thượng nhìn ngươi lâu, rồi cho sứ lui."}]}},
 E:{win:{tag:"Kim trướng chờ {pv}",w:"emp",t:"Đại Hy không công nhận ai khi {pv} còn sống. Thúc phụ phải lùi lều ra khỏi kim trướng một tầm tên."},
  win2:{tag:"Ấn của Đại Hy cho Ô Lặc",w:"emp",t:"Ô Lặc có tờ chiếu của Đại Hy trong tay. Thúc phụ không dám động đến em, nhưng cũng không lùi."},
  mid:{tag:"Kim trướng chưa có chủ",t:"Đại Hy chưa nói gì. Trên thảo nguyên, thúc phụ và em trai ngươi mỗi người giữ một nửa các bộ."},
  lose:{tag:"Thúc phụ ghi nhớ ngươi",w:"emp",t:"Sứ thúc phụ về bắc, mang theo tên ngươi như tên một kẻ thù.",go:(_A,_ok,G)=>e67bien(G[0])}}});
BD97.push({a:"bd_soi",tag:"Phụ hãn tỉnh lại",w:"emp",n:"Xin Hoàng thượng cho thiếp tự mang thuốc lên kim trướng",
 path:["thái y theo sứ","vòng ngọc của mẹ","Hồi thư dạy em","Đốt lời nhắn","Đưa lời nhắn lên Hoàng thượng","chờ {pv} tỉnh"],bad:["Nhận ngựa thay","Giữ lời nhắn, chưa đáp"],x:[()=>S.duc>=BAL.arc.rare.bd_soi.bar,`Đức từ ${BAL.arc.rare.bd_soi.bar}`],
 t:"Ngươi theo sứ đoàn lên bắc, mang thang thuốc của Thái y viện và chiếc khăn lông của {mh}. Đêm thứ ba ở kim trướng, {pv} mở mắt, gọi tên ngươi bằng tên thuở nhỏ. Thúc phụ quỳ ngoài trướng đến sáng. Trước khi ngươi về, {pv} trao cho ngươi chiếc ấn sói bằng bạc: “Con giữ. Thảo nguyên nhớ ai đã cứu nó.”",
 go:(_A,_ok,G)=>e67bien(G[0]),rw:"nt_dongchau",ti:"Người gọi Phụ hãn tỉnh lại"});

rdDef("bd_soi",5,{t:"Hai phong thư",w:"emp",sj:"thư của thúc phụ và của em trai",cast(A){return rdCast(A,["v"])},
 g:"Mùa xuân, hai phong thư từ thảo nguyên đến cung ngươi trong cùng một tuần. Thúc phụ Hô Diên Liệt xin một bản chép bản đồ đồn ải phía bắc. Ô Lặc xin chị một lời với Hoàng thượng. Thư nào lên ngự án, thư nào nằm lại, là việc của ngươi.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thúc phụ hứa hẹn",w:"emp",if:()=>RDW(1)()&&rdPrev()!=="win2",t:"Đại Hy chưa công nhận ai, thúc phụ phải nhún. Thư của ông ta lời lẽ ngọt: “Cháu gái cho ta bản đồ, ta để Ô Lặc làm tả hiền vương, cả nhà yên.”",o:[
  {n:"Trình cả hai phong thư lên Hoàng thượng",f:"honest",wx:"ngài thấy ngươi không giữ gì riêng",lx:"thúc phụ biết thư bị trình",rt:"Hoàng thượng đọc hai thư, đặt thư của Ô Lặc lên trên.",rf:"Hoàng thượng hỏi: “Thư này đến bằng đường nào?”",go:()=>{RD_FL("bd_soi.letters","given");return""}},
  {n:"Giữ thư thúc phụ làm chứng, chưa đáp",f:"hold",wx:"có trong tay chữ ký của thúc phụ",lx:"thúc phụ chờ, rồi nóng",rt:"Thư thúc phụ cất trong hộp ấn của ngươi.",go:()=>{RD_FL("bd_soi.letters","kept");return""}},
  {n:"Đáp thư thúc phụ: cháu cần thời gian",f:"wolf",wx:"thúc phụ tưởng ngươi đã xiêu",lx:"có chữ của ngươi trong tay thúc phụ",rt:"Thư đáp của ngươi đi theo đoàn buôn.",go:()=>bdMeet("lie")}]},
 s2:{h:"Ô Lặc cảm ơn chị",w:"maid",if:()=>rdPrev()==="win2",t:"Ô Lặc gửi theo thư một con chim ưng non: “Ấn của Đại Hy cứu em. Nhưng thúc phụ nói ấn ấy là của chị, không phải của em.”",o:[
  {n:"Viết cho em: ấn là của em, chị chỉ xin hộ",f:"honest",wx:"Ô Lặc vững lòng",lx:"thúc phụ đọc được thì lấy làm cớ",rt:"Ô Lặc đọc thư trước các trưởng lão.",go:()=>bdMeet("olac")},
  {n:"Viết cho em: mọi lệnh phải hỏi chị trước",f:"hold",wx:"không ai lừa được em",lx:"các bộ nói Ô Lặc là con rối",rt:"Ô Lặc nghe lời, mỗi lệnh đều gửi thư hỏi."},
  {n:"Gửi người dạy em đọc sổ quân",f:"wolf",wx:"em biết quân mình có bao nhiêu",lx:"người của ngươi trong trướng em",rt:"Một lão thư lại của sứ quán theo đoàn buôn lên bắc."}]},
 s3:{h:"Thư của thúc phụ không còn ngọt",w:"emp",if:RDW(0),t:"Thúc phụ thấy Đại Hy im lặng, nên viết thẳng: “Bản đồ đồn ải, hoặc Ô Lặc sẽ ngã ngựa như cha nó.”",o:[
  {n:"Trình thư dọa lên Hoàng thượng",f:"honest",wx:"ngài có cớ cảnh cáo thúc phụ",lx:"thúc phụ biết không lay được ngươi",rt:"Hoàng thượng sai Lễ bộ gửi sang bắc một tờ quở.",rf:"Hoàng thượng chỉ nói: “Việc trong trướng của họ.”",go:()=>{RD_FL("bd_soi.letters","given");return""}},
  {n:"Giữ thư dọa, chờ ngày dùng",f:"hold",wx:"có chữ dọa của thúc phụ trong tay",lx:"Ô Lặc vẫn trong vòng nguy",rt:"Thư dọa nằm chung với thư cũ.",go:()=>{RD_FL("bd_soi.letters","kept");return""}},
  {n:"Gửi người về giữ cho Ô Lặc",f:"wolf",wx:"em có người canh",lx:"bạc ra, người đi đường xa",rt:"Hai kỵ sĩ của sứ quán lên bắc, ngủ ngoài lều Ô Lặc."}]},
 c1:{h:"Lão thư lại Binh bộ",w:"emp",t:"Bản đồ đồn ải nằm trong kho Binh bộ. Một lão thư lại giữ kho mang ơn {pv} từ thời làm sứ, lão nhắn: muốn chép thì lão để cửa kho mở một đêm.",o:[
  {n:"Bảo lão khóa kho, quên chuyện ấy",wx:"tay sạch",lx:"lão thấy ngươi không tin",rt:"Lão thư lại thở phào."},
  {n:"Nhờ lão chép một bản, cất ở chỗ lão",wx:"có bản đồ mà không qua tay ngươi",lx:"bản chép ở trong tay người khác",rt:"Lão chép trong ba đêm, cất dưới sàn nhà mình.",go:()=>{RD_FL("bd_soi.map","kept");return""}},
  {n:"Nhờ lão chép một bản sai các đồn",wx:"có thứ để đưa thúc phụ",lx:"lão sợ",rt:"Lão chép, đổi chỗ năm đồn.",rf:"Lão chép sai cả chỗ mình không định sai.",go:()=>{RD_FL("bd_soi.map","false");return""}}]},
 c2:{h:"{v} và người nhà ở Binh bộ",w:"v",need:["v"],t:"Người nhà {v} làm Thị lang Binh bộ. {v} vô tình kể: kho bản đồ sắp kiểm lại, ai chép trộm sẽ lộ.",o:[
  {n:"Cảm ơn {v} đã nhắc",wx:"{v} tưởng ngươi không dính",lx:"{v} để ý ngươi hơn",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} cười, không nói thêm."},
  {n:"Hỏi {v} ngày kiểm kho",wx:"biết trước",lx:"{v} nghi",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return""},rt:"{v} nói ngày, như không để ý.",rf:"{v} nhìn ngươi: “Phi tần hỏi kho Binh bộ làm gì?”"},
  {n:"Kể với {v} chuyện thúc phụ đòi bản đồ",wx:"có người làm chứng ngươi không giấu",lx:"việc nhà lọt ra ngoài",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nghe, rồi về kể với người nhà ở Binh bộ."}]},
 t1:{h:"Người của thúc phụ chờ hồi âm",w:"maid",t:"Người đưa thư của thúc phụ trọ ở Hội Đồng quán, đã chờ mười ngày. Hắn nhắn: không có hồi âm thì hắn về tay không, và thúc phụ sẽ hiểu.",o:[
  {n:"Gửi lời: không có bản đồ nào",f:"honest",wx:"thúc phụ biết rõ ý ngươi",lx:"thúc phụ thôi nể",rt:"Người đưa thư về bắc tay không."},
  {n:"Cho hắn chờ thêm",f:"hold",wx:"thúc phụ chưa động",lx:"hắn đi lại Hội Đồng quán, dễ bị để ý",rt:"Người đưa thư ở lại thêm một tháng."},
  {n:"Gửi hắn một lời hứa không ký tên",f:"wolf",wx:"thúc phụ tin ngươi đang lo",lx:"lời hứa có thể bị dùng",rt:"Hắn mang lời hứa về bắc."}]},
 x1:{h:"Ngày kiểm kho Binh bộ",w:"emp",t:"Sáng mai Binh bộ kiểm kho. Đêm nay là đêm cuối để quyết bản đồ đi đâu, hoặc không đi đâu cả.",o:[
  {n:"Giữ bản đồ, không trao ai",e:["win","lose"],rt:"Lão thư lại đưa bản chép về cung ngươi, giấu trong rương áo cưỡi. Sáng ra kho đủ, không ai biết có bản thứ hai.",rf:"Binh bộ đếm thấy dấu mực mới trên bản gốc. Lão thư lại bị hỏi.",go:()=>{RD_FL("bd_soi.map","kept");return""}},
  {n:"Đưa thúc phụ bản đồ giả",e:["win","lose"],rt:"Bản đồ sai năm đồn theo người đưa thư về bắc. Thúc phụ sẽ đánh vào chỗ không có ai.",rf:"Người đưa thư bị khám ở biên ải, bản đồ giả rơi vào tay Binh bộ.",go:()=>{RD_FL("bd_soi.map","false");return""}},
  {n:"Đốt bản chép, trình lão thư lại lên Hoàng thượng xin tha",e:["mid","lose"],rt:"Bản chép thành tro. Hoàng thượng tha lão thư lại, khen ngươi thật thà.",rf:"Lão thư lại bị cách chức, oán ngươi.",go:()=>{RD_FL("bd_soi.map","burnt");return""}}]}},
 E:{win:{tag:"Bản đồ trong tay ngươi",w:"emp",t:"Bản đồ đồn ải ở chỗ ngươi chọn. Thúc phụ chờ, Ô Lặc chờ, và chỉ ngươi biết tờ giấy ấy nằm ở đâu."},
  mid:{tag:"Không còn bản đồ",t:"Không còn bản chép nào. Thúc phụ phải tìm đường khác, và ông ta sẽ tìm."},
  lose:{tag:"Dấu mực mới",w:"emp",t:"Binh bộ biết có người đã chép bản đồ. Chưa ai nói tên ngươi, nhưng người ta đã nhìn về phía cung ngươi.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",6,{t:"Sứ giả mang dao",w:"emp",sj:"Thát Mộc của sứ đoàn thúc phụ",cast(A){return rdCast(A,["v"])},
 g:"Sứ đoàn thúc phụ vào kinh dâng cống mùa hạ. Trong đoàn có Thát Mộc, vệ sĩ của thúc phụ, giắt một con dao cong trong ủng. Người của Ô Lặc cũng đang ở Hội Đồng quán.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ba Đồ thấy con dao",w:"maid",if:RDW(1),t:"Phu ngựa {land} ở Thượng tứ viện nhắn: lúc dắt ngựa của sứ đoàn, y thấy Thát Mộc lau một con dao cong, lưỡi bôi thứ gì đen đen.",o:[
  {n:"Cho người canh người của Ô Lặc",f:"guard",wx:"em trai có người giữ ở kinh",lx:"Thát Mộc biết bị canh",rt:"Hai thị vệ cung ngươi đứng ngoài phòng người của Ô Lặc.",go:()=>{bdMove("thatmoc","kinh");return bdMeet("thatmoc")}},
  {n:"Báo Hồng Lô tự khám sứ đoàn",f:"law",go:()=>bdMove("thatmoc","kinh"),wx:"việc theo phép",lx:"thúc phụ nói Đại Hy làm nhục sứ",rt:"Hồng Lô tự khám, thu được con dao.",rf:"Hồng Lô tự khám, không thấy dao đâu."},
  {n:"Mời Thát Mộc vào cung uống rượu",f:"turn",wx:"biết mặt kẻ cầm dao",lx:"liều",rt:"Thát Mộc đến, uống, nhìn ngươi lâu.",go:()=>{bdMove("thatmoc","kinh");return bdMeet("thatmoc")}}]},
 s2:{h:"Người của Ô Lặc bị thương",w:"maid",if:RDW(0),t:"Đêm đầu tiên, người đưa tin của Ô Lặc bị đâm ở hành lang Hội Đồng quán, may chưa chết. Ai cũng biết là Thát Mộc, không ai thấy.",o:[
  {n:"Đưa người bị thương vào nhờ thái y",f:"guard",go:()=>bdMove("thatmoc","kinh"),wx:"cứu được người",lx:"cả cung biết ngươi dính vào",rt:"Thái y khâu vết thương. Y sống.",rf:"Thái y đến muộn, y mê man."},
  {n:"Xin Hình bộ điều tra",f:"law",go:()=>bdMove("thatmoc","kinh"),wx:"việc theo phép",lx:"chậm",rt:"Hình bộ cho người đến Hội Đồng quán."},
  {n:"Sai người theo dõi Thát Mộc",f:"turn",go:()=>bdMove("thatmoc","kinh"),wx:"biết hắn đi đâu",lx:"người theo có thể bị giết",rt:"Thát Mộc ra chợ, gặp một người lạ ở hiệu thuốc."}]},
 c1:{h:"Thuốc độc ở hiệu thuốc",w:"maid",t:"Hiệu thuốc phía tây chợ bán cho Thát Mộc một gói rễ ô đầu. Chủ hiệu sợ, nói với cung nữ của ngươi.",o:[
  {n:"Bỏ bạc mua lời khai của chủ hiệu",wx:"có lời khai",lx:"bạc ra",rt:"Chủ hiệu ký lời khai, giấu tên."},
  {n:"Bảo chủ hiệu tráo gói thuốc lần sau",wx:"dao của Thát Mộc thành vô hại",lx:"chủ hiệu run",rt:"Lần sau, Thát Mộc mua phải bột rễ cam thảo.",rf:"Chủ hiệu tráo vụng, Thát Mộc nghi."},
  {n:"Để chủ hiệu yên, không dính vào",wx:"không lộ",lx:"thuốc vẫn ở tay Thát Mộc",rt:"Ngươi không hỏi thêm."}]},
 c2:{h:"{v} gặp sứ đoàn",w:"v",need:["v"],t:"Người nhà {v} ở Binh bộ ăn yến với sứ đoàn thúc phụ. {v} khoe với ngươi: “Thúc phụ ngươi hào phóng thật.”",o:[
  {n:"Nhắc {v}: quà của sói có giá",wx:"{v} dè chừng",lx:"{v} cho là ngươi dọa",go:(A,ok,G)=>{ok?rdRel(A,"v",G[0]):rdOan(A,"v",G[1]);return""},rt:"{v} cất món quà vào kho, không đeo.",rf:"{v} cười: “Ngươi ghen với thúc phụ ngươi à?”"},
  {n:"Hỏi {v} thúc phụ tặng gì",wx:"biết thúc phụ mua ai",lx:"{v} thấy ngươi để ý",rt:"{v} kể: một bộ yên bạc và hai tấm da cáo."},
  {n:"Không nói gì",wx:"không gây chuyện",lx:"Binh bộ nghiêng về thúc phụ",rt:"Ngươi uống trà, đổi chuyện."}]},
 t1:{h:"Thát Mộc tìm đến",w:"emp",t:"Thát Mộc lén đến cửa sau cung ngươi lúc canh ba. Hắn không mang dao: “Thúc phụ hứa cho tôi một bộ lạc. Công chúa trả hơn không?”",o:[
  {n:"Nghe hắn nói hết",f:"turn",wx:"biết thúc phụ sai hắn làm gì",lx:"có người thấy hắn vào cung ngươi",rt:"Thát Mộc khai: dao là cho người của Ô Lặc, và cho ngươi nếu ngươi cản.",go:()=>bdMeet("thatmoc")},
  {n:"Gọi thị vệ bắt hắn",f:"law",wx:"bắt được kẻ cầm dao",lx:"thúc phụ nói ngươi bày bẫy",rt:"Thị vệ trói Thát Mộc ngay ở cửa.",rf:"Thát Mộc vượt tường chạy thoát."},
  {n:"Đuổi hắn đi, không nói gì",f:"guard",wx:"không dính vào",lx:"hắn đi với dao",rt:"Thát Mộc lùi vào bóng tối."}]},
 x1:{h:"Đêm cuối của sứ đoàn",w:"emp",t:"Đêm cuối của sứ đoàn, Thát Mộc bị cấm quân bắt ở hành lang Hội Đồng quán, trong tay có dao. Hoàng thượng giao hắn cho ngươi định.",o:[
  {n:"Bắt sống Thát Mộc, đổi lòng y",e:["win","lose"],rt:"Thát Mộc quỳ: từ nay hắn là tai mắt của ngươi trong sứ đoàn thúc phụ.",rf:"Thát Mộc giả vờ nghe, về đến bắc thì kể hết với thúc phụ.",go:()=>bdMove("thatmoc","tn")},
  {n:"Tha Thát Mộc, gửi về kèm lời nhắn",e:["win","mid"],rt:"Thát Mộc mang về cho thúc phụ một câu của ngươi: “Dao của thúc, cháu trả lại. Lần sau, Đại Hy không trả.”",rf:"Thúc phụ nghe lời nhắn, cười lớn.",go:()=>bdMove("thatmoc","tn")},
  {n:"Chém Thát Mộc, gửi đầu về trướng",e:["win","lose"],rt:"Đầu Thát Mộc theo xe sứ về bắc. Các bộ lạc nhỏ rùng mình, có hai bộ quay về với Ô Lặc.",rf:"Thúc phụ treo đầu Thát Mộc trước lều, gọi đó là thù của Đại Hy.",go:()=>bdKill("thatmoc")}]}},
 E:{win:{tag:"Dao không tới được em",w:"emp",t:"Người của Ô Lặc sống, sứ đoàn thúc phụ về bắc với một bài học. Ở kinh, không ai dám mang dao đến gần người {land} của ngươi."},
  mid:{tag:"Dao trả về chủ",t:"Sứ đoàn đi, con dao đi theo. Thúc phụ biết ngươi đã thấy nó."},
  lose:{tag:"Thù chồng thêm thù",w:"emp",t:"Thúc phụ có cớ nói Đại Hy giết người của ông. Mùa thu này, ngựa thảo nguyên sẽ xuống phía nam.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",7,{t:"Chợ ngựa đóng cửa",w:"emp",sj:"chợ ngựa biên ải",cast(A){return rdCast(A,["v"])},
 g:"Thúc phụ đóng chợ ngựa ở biên ải: không một con ngựa nào xuống nam cho đến khi Đại Hy công nhận ông. Binh bộ thiếu ngựa. Người nhà {v} trong Binh bộ dâng sớ xin xuất binh.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thúc phụ đề nghị giao kèo",w:"emp",if:RDW(1),t:"Thúc phụ gửi sứ: chợ ngựa mở lại, nếu Đại Hy chịu gả một công chúa cho con trai ông và gọi ông là chủ kim trướng.",o:[
  {n:"Khước từ giao kèo chợ ngựa của thúc phụ",f:"own",wx:"thúc phụ không được thứ ông muốn",lx:"chợ ngựa còn đóng",rt:"Ngươi tâu Hoàng thượng: ngựa có thể mua chỗ khác, kim trướng thì không bán được."},
  {n:"Xin mở lại chợ ngựa bằng một hòa ước nhỏ",f:"peace",wx:"ngựa lại xuống nam",lx:"thúc phụ có được một chữ ký",rt:"Lễ bộ thảo một tờ ước chỉ nói chuyện ngựa, không nói chuyện trướng.",rf:"Thúc phụ không nhận ước nhỏ."},
  {n:"Khuyên triều đình xuất binh",f:"war",wx:"Binh bộ đứng về phía ngươi",lx:"chiến sự là con dao hai lưỡi",rt:"Người nhà {v} ngạc nhiên thấy ngươi cùng ý với họ."}]},
 s2:{h:"Binh bộ đổ tội",w:"v",if:RDW(0),t:"Binh bộ nói thẳng trước triều: chợ ngựa đóng vì phi tần {land} không giữ được nhà mình. Người nhà {v} đọc sớ.",o:[
  {n:"Xin Hoàng thượng cho thiếp viết thư cho các trưởng lão",f:"own",wx:"các bộ nghe tiếng ngươi",lx:"thư có thể không ai đọc",rt:"Bảy trưởng lão nhận thư. Ba người hồi âm.",rf:"Thư đi mà không ai trả lời."},
  {n:"Xin mở chợ ngựa ở một ải khác, xa đất thúc phụ",f:"peace",wx:"Binh bộ có ngựa từ bộ khác",lx:"đường xa, tốn bạc",rt:"Chợ mới mở ở ải phía tây, bộ lạc của mẹ ngươi mang ngựa đến."},
  {n:"Đứng về phía Binh bộ: phải đánh",f:"war",wx:"Binh bộ bớt chĩa vào ngươi",lx:"người {land} gọi ngươi là kẻ phản",rt:"Người nhà {v} gật đầu, sớ của họ bớt nhắc tên ngươi."}]},
 c1:{h:"Bộ lạc của mẹ",w:"maid",t:"Bộ lạc bên ngoại của ngươi ở phía tây biên ải còn trung thành với {pv}. Họ có ngựa, nhưng sợ thúc phụ.",o:[
  {n:"Viết thư hứa Đại Hy che chở họ",wx:"họ dám bán ngựa",lx:"hứa thay Hoàng thượng",rt:"Bộ lạc bên ngoại gửi xuống ba trăm con ngựa.",rf:"Bộ lạc bên ngoại xin thêm thời gian."},
  {n:"Gửi bạc mua ngựa của họ",wx:"ngựa xuống mà không phải hứa",lx:"bạc ra",rt:"Bạc lên, ngựa xuống."},
  {n:"Để họ yên",wx:"không kéo họ vào",lx:"Binh bộ vẫn thiếu ngựa",rt:"Ngươi không viết thư nào."}]},
 c2:{h:"Người nhà {v} ở Binh bộ",w:"v",need:["v"],t:"Người nhà {v} muốn được làm tướng nếu xuất binh. {v} nói với ngươi: “Ngươi tâu một câu, nhà ta nhớ ơn.”",o:[
  {n:"Hứa tâu giúp",wx:"nhà {v} nợ ngươi",lx:"nếu thua trận, tên ngươi đi kèm",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} nắm tay ngươi cảm ơn."},
  {n:"Từ chối: binh quyền không phải việc phi tần",wx:"tay sạch",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} quay đi."},
  {n:"Ra điều kiện: nhà {v} phải để chợ ngựa phía tây yên",wx:"đổi được một điều",lx:"{v} thấy ngươi mặc cả",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nhận lời.",rf:"{v} không nhận."}]},
 t1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Đêm ấy Hoàng thượng hỏi riêng: “Nếu trẫm đánh thúc phụ nàng, nàng có trách trẫm không?”",o:[
  {n:"Thưa: thúc phụ không phải là {land}",f:"war",wx:"ngài yên lòng nếu phải đánh",lx:"người {land} nghe được thì buồn",rt:"Hoàng thượng gật đầu, im lặng."},
  {n:"Thưa: xin ngài đánh bằng chợ, đừng bằng gươm",f:"peace",wx:"ngài nghĩ đến cách khác",lx:"Binh bộ cho là ngươi yếu",rt:"Hoàng thượng cười: “Nàng buôn giỏi hơn Hộ bộ.”"},
  {n:"Thưa: thiếp chỉ xin ngài đừng hỏi thiếp việc ấy",f:"own",wx:"ngài thương ngươi",lx:"ngài quyết mà không có ngươi",rt:"Hoàng thượng ôm ngươi, không hỏi nữa."}]},
 x1:{h:"Phiên triều về chợ ngựa",w:"emp",t:"Phiên triều đông nhất mùa hạ. Binh bộ xin binh, Lễ bộ xin hòa, Hộ bộ xin mở chợ. Hoàng thượng cho thái giám về cung hỏi ngươi một câu.",o:[
  {n:"Gửi lời: mở chợ ngựa ở ải tây, khóa ải đông",e:["win","lose"],rt:"Chợ tây mở, chợ đông khóa. Ngựa của các bộ trung thành xuống nam; bộ của thúc phụ đói muối.",rf:"Các bộ phía tây sợ thúc phụ, không dám mang ngựa đến."},
  {n:"Gửi lời: xin xuất binh ra ải",e:["win","lose"],rt:"Năm nghìn kỵ binh Đại Hy đóng ở ải. Thúc phụ mở chợ ngựa sau mười ngày.",rf:"Quân ra ải, thúc phụ không sợ. Hai bên giằng co."},
  {n:"Gửi lời: thiếp xin không nói",e:"mid",lx:"triều đình quyết mà không có ngươi",rt:"Hoàng thượng cho hoãn, chợ ngựa vẫn đóng."}]}},
 E:{win:{tag:"Chợ ngựa theo ý ngươi",w:"emp",t:"Ngựa lại xuống nam, theo con đường ngươi chọn. Thúc phụ biết chợ ngựa không còn là con bài của riêng ông."},
  mid:{tag:"Chợ ngựa vẫn đóng",t:"Chợ ngựa vẫn đóng. Binh bộ chờ, thúc phụ chờ, và mùa thu đến gần."},
  lose:{tag:"Biên ải giằng co",w:"emp",t:"Quân hai bên đứng nhìn nhau qua ải. Binh bộ ghi tên ngươi vào sớ.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",8,{t:"Khả đôn vào kinh",w:"emp",sj:"{mh} lánh nạn ở kinh thành",cast(A){return rdCast(A,["v"])},
 g:"Thúc phụ vây lều {mh}. Bà trốn khỏi thảo nguyên với mười kỵ sĩ, đến cửa ải xin vào kinh. Che chở bà là việc của một người con, nhưng thúc phụ sẽ coi đó là cớ.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"{mh} đến cửa ải",w:"emp",if:RDW(1),t:"Tổng binh ải bắc gửi tấu gấp: {mh} Khả đôn của {land} đang ở ngoài cửa ải, xin vào. Thúc phụ gửi thư: ai cho bà vào là kẻ thù.",o:[
  {n:"Xin Hoàng thượng mở ải đón {mh}",f:"open",wx:"{mh} được vào",lx:"thúc phụ có cớ",rt:"Cửa ải mở. {mh} vào kinh bằng xe của Lễ bộ.",go:()=>{bdP("kd","w","kinh");return""}},
  {n:"Xin đón {mh} vào lén, không lễ",f:"quiet",wx:"bà vào mà không ồn",lx:"bà phải vào như kẻ trốn",rt:"{mh} vào kinh trong xe chở cỏ, ở tạm chùa ngoài thành.",go:()=>{bdP("kd","w","kinh");return""}},
  {n:"Gửi người đưa {mh} sang bộ lạc bên ngoại",f:"send",wx:"bà an toàn mà Đại Hy không dính",lx:"bà ở xa ngươi",rt:"{mh} sang bộ lạc bên ngoại ở ải tây."}]},
 s2:{h:"{mh} đã ở ngoài thành",w:"maid",if:RDW(0),t:"{maid} báo: có một bà già người {land} quỳ trước cửa Đức Thắng, nói là mẹ của phi tần {land}. Lính cửa không cho vào.",o:[
  {n:"Tự ra cửa thành đón mẹ",f:"open",wx:"cả kinh thành thấy ngươi đón mẹ",lx:"phi tần ra cửa thành là việc lớn",rt:"Ngươi quỳ trước mẹ giữa cửa Đức Thắng. Lính cửa quỳ theo.",rf:"Thái giám giữ ngươi lại ở cửa cung.",go:()=>{bdP("kd","w","kinh");return""}},
  {n:"Sai người đưa {mh} vào chùa ngoài thành",f:"quiet",wx:"bà có chỗ ở",lx:"bà không được vào kinh",rt:"{mh} nghỉ ở chùa, ngươi gửi áo ấm và sữa.",go:()=>{bdP("kd","w","kinh");return""}},
  {n:"Gửi bạc, xin bà về ải tây",f:"send",wx:"không có cớ cho thúc phụ",lx:"bà buồn",rt:"{mh} nhận bạc, khóc, rồi lên đường về tây."}]},
 c1:{h:"Đội kỵ sĩ của {mh}",w:"emp",t:"Mười kỵ sĩ theo {mh} xin được giữ gươm. Lễ bộ nói người ngoại quốc không được mang gươm trong kinh.",o:[
  {n:"Xin cho đội vệ của {mh} mang gươm",wx:"bà có người giữ",lx:"triều thần sợ",rt:"Hoàng thượng chuẩn: mười gươm, không hơn."},
  {n:"Đổi kỵ sĩ lấy thị vệ Đại Hy",wx:"không ai nói gì",lx:"bà sống giữa người lạ",rt:"Mười kỵ sĩ giao gươm. Thị vệ Đại Hy đứng ngoài cửa bà."},
  {n:"Bỏ bạc thuê vệ sĩ trong kinh cho bà",wx:"bà có người giữ mà không mang gươm",lx:"bạc ra",rt:"Sáu vệ sĩ thuê ở tiêu cục đứng ngoài cửa bà."}]},
 c2:{h:"{v} nói {mh} là gián điệp",w:"v",need:["v"],t:"{v} nói với Thái hậu: “Khả đôn {land} ở ngoài thành, ai biết bà gặp những ai?”",o:[
  {n:"Mời {v} đến thăm {mh}",wx:"{v} tận mắt thấy bà chỉ là một người mẹ",lx:"{v} có thể nói thêm",go:(A,ok,G)=>{ok?rdRel(A,"v",G[0]):rdOan(A,"v",G[1]);return""},rt:"{v} về, không nói thêm.",rf:"{v} về kể bà nói tiếng {land} với người lạ."},
  {n:"Xin Thái hậu cử người canh {mh}",wx:"không ai còn cớ",lx:"mẹ ngươi bị canh như tù",rt:"Thái hậu cử hai ma ma đến ở cùng {mh}."},
  {n:"Đáp: mẹ thiếp gặp con gái mình",wx:"giữ được thể diện",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Thái hậu gật, {v} im."}]},
 t1:{h:"Thúc phụ đòi người",w:"emp",t:"Thư thúc phụ đến: “Trả Khả đôn về, hoặc chợ ngựa không bao giờ mở lại.”",o:[
  {n:"Xin Hoàng thượng đáp: Khả đôn là khách của Đại Hy",f:"open",wx:"cả thảo nguyên biết Đại Hy che chở bà",lx:"thúc phụ có cớ đánh",rt:"Thư đáp đóng ấn Đại Hy về bắc."},
  {n:"Đáp thư bằng lời mẹ: bà chỉ đến thăm con",f:"quiet",wx:"thúc phụ không có cớ",lx:"lời nói có thể không đủ",rt:"{mh} tự viết thư, giọng bình thản."},
  {n:"Dùng {mh} làm mồi nhử",f:"bait",wx:"thúc phụ sẽ sai người đến, và sẽ bị bắt",lx:"mẹ ngươi ở trong vòng nguy",rt:"Ngươi để lộ tin {mh} sắp về ải. Người của thúc phụ đến chặn đường."}]},
 x1:{h:"Đêm có người đến",w:"emp",t:"Đêm rằm, có người lạ trèo tường chùa ngoài thành nơi {mh} ở. Cấm quân ở xa. Ngươi được báo trước một khắc.",o:[
  {n:"Đón {mh} vào cung, công khai",e:["win","lose"],rt:"{mh} vào ở cung ngươi, có chiếu của Hoàng thượng. Kẻ trèo tường bị bắt ở chùa trống.",rf:"Trên đường vào cung, xe của bà bị chặn. Bà bị thương nhẹ.",go:()=>{bdP("kd","w","kinh");return""}},
  {n:"Phục sẵn thị vệ, bắt người của thúc phụ",e:["win","lose"],rt:"Năm người của thúc phụ bị bắt sống. Chúng khai thúc phụ sai giết Khả đôn.",rf:"Người của thúc phụ thoát hai tên. Bà bị kinh hãi, ốm nặng."},
  {n:"Đưa {mh} về ải tây trong đêm",e:["mid","lose"],rt:"{mh} về bộ lạc bên ngoại an toàn. Kinh thành không có chuyện gì.",rf:"Xe của bà bị theo dõi đến tận ải.",go:()=>{bdP("kd","w","ai");return""}}]}},
 E:{win:{tag:"Mẹ ở bên ngươi",w:"emp",t:"{mh} ở kinh, có Đại Hy che chở. Cả thảo nguyên biết thúc phụ đã sai người giết Khả đôn, và đã thất bại."},
  mid:{tag:"Mẹ ở xa",t:"{mh} ở bộ lạc bên ngoại. Bà an toàn, ngươi yên lòng một nửa."},
  lose:{tag:"Mẹ bị thương",w:"emp",t:"{mh} bị thương, phải nằm. Thúc phụ có cớ nói Đại Hy không giữ được khách của mình.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",9,{t:"Hội đua ngựa mùa hạ",w:"emp",sj:"hội đua chọn chủ kim trướng",cast(A){return rdCast(A,["v"])},
 g:"Các trưởng lão họp ở hồ Bạch Thủy: theo lệ cổ, ai thắng hội đua ngựa mùa hạ thì có tiếng nói ở kim trướng. Thúc phụ cử con trai mình. Ô Lặc còn non tay ngựa. Hội đua mở sau một tuần trăng.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Các trưởng lão gọi tên ngươi",w:"emp",if:RDW(1),t:"Thư các trưởng lão đến: theo lệ, con gái của {pv} cũng được ra đua. Nếu ngươi ra, các bộ sẽ đến xem.",o:[
  {n:"Xin Hoàng thượng cho về dự hội",f:"self",wx:"các bộ được thấy ngươi",lx:"đi xa là liều",rt:"Hoàng thượng do dự rất lâu, rồi chuẩn, với một trăm kỵ binh hộ tống.",rf:"Hoàng thượng không chuẩn."},
  {n:"Chọn một dũng sĩ đua thay em",f:"champ",wx:"Ô Lặc có người đua giỏi",lx:"người thay là người ngoài",rt:"Ngươi chọn một tay đua của bộ lạc bên ngoại."},
  {n:"Gửi Tuyết Câu cho em cưỡi",f:"gift",wx:"Ô Lặc có ngựa tốt nhất",lx:"ngươi xa con ngựa của mình",rt:"Tuyết Câu theo đoàn buôn lên bắc.",go:()=>bdMove("tuyetcau","tn")}]},
 s2:{h:"Ô Lặc xin chị chỉ cách",w:"maid",if:RDW(0),t:"Ô Lặc viết: “Em ngã ngựa hai lần khi tập. Thúc phụ cười. Chị dạy em.”",o:[
  {n:"Viết cho em cách cưỡi trên cỏ ướt",f:"self",wx:"em cưỡi vững hơn",lx:"thư không thay được người dạy",rt:"Ô Lặc tập theo thư, ngã ít hơn."},
  {n:"Gửi Ba Đồ lên dạy em",f:"champ",wx:"em có thầy",lx:"Thượng tứ viện mất người",rt:"Ba Đồ lên bắc theo đoàn buôn.",go:()=>bdMove("bado","tn")},
  {n:"Gửi em bộ yên của mình",f:"gift",wx:"em ngồi vững",lx:"đồ của phi tần lên thảo nguyên",rt:"Bộ yên của ngươi theo thư lên bắc."}]},
 c1:{h:"Người chấm đua",w:"emp",t:"Ba trưởng lão chấm hội đua. Một người là bạn cũ của {pv}, một người theo thúc phụ, một người chưa nghiêng bên nào.",o:[
  {n:"Gửi quà cho người chưa nghiêng",wx:"có thêm một phiếu",lx:"quà có thể bị lộ",rt:"Trưởng lão nhận quà, gửi lời cảm ơn {mh}."},
  {n:"Mua chuộc người chấm của thúc phụ",wx:"thúc phụ mất một phiếu",lx:"bị lộ thì cả hội nói ngươi gian",rt:"Người chấm của thúc phụ nhận vàng, hứa giữ miệng.",rf:"Người chấm của thúc phụ nhận vàng, rồi đưa thư cho thúc phụ xem.",go:()=>{RD_FL("bd_soi.bribe",1);return""}},
  {n:"Viết thư cho cả ba, xin xét công bằng",wx:"không ai nói được ngươi gian",lx:"không đổi được gì",rt:"Ba trưởng lão nhận thư, không trả lời."}]},
 c2:{h:"{v} nói ngựa thảo nguyên",w:"v",need:["v"],t:"{v} cười trong yến: “Phi tần mà về thảo nguyên đua ngựa, thì Đại Hy gọi là gì?”",o:[
  {n:"Đáp: gọi là giữ yên biên ải",wx:"cả yến nghe ngươi",lx:"{v} bị bẽ",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng thượng cười, nâng chén."},
  {n:"Cười, không đáp",wx:"không gây chuyện",lx:"lời {v} ở lại",rt:"Yến tiếp tục."},
  {n:"Mời {v} theo xem hội đua",wx:"{v} tò mò",lx:"phải lo thêm một người",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} không đi, nhưng lần đầu hỏi về hồ Bạch Thủy.",rf:"{v} nói: “Ta không đi chỗ có sói.”"}]},
 c3:{h:"Cờ của hoàng tử",w:"emp",if:BDSON,t:"Con trai ngươi, hoàng tử, đã biết cưỡi ngựa. Các trưởng lão nói: con của con gái {pv} cũng có máu kim trướng.",o:[
  {n:"Cho tay đua mang cờ của hoàng tử",wx:"cả thảo nguyên nhớ tên con ngươi",lx:"Đại Hy lo hoàng tử bị kéo về bắc",rt:"Cờ hoàng tử thêu sói trắng, sẽ đi đầu hội đua."},
  {n:"Gửi các trưởng lão một bức thư hoàng tử viết",wx:"các bộ biết con ngươi",lx:"triều thần dị nghị",rt:"Hoàng tử viết bằng chữ {land} ngươi dạy."},
  {n:"Giữ hoàng tử ra khỏi việc này",wx:"con ngươi yên",lx:"các bộ quên con ngươi",rt:"Ngươi không nhắc đến con."}]},
 t1:{h:"Đêm trước hội",w:"maid",t:"Đêm trước hội, có tin: con ngựa của Ô Lặc bị đầu độc. Người làm là ai, ai cũng đoán được.",o:[
  {n:"Gửi gấp con ngựa tốt nhất của mình",f:"gift",wx:"em có ngựa",lx:"ngựa đi xa, mệt",rt:"Con ngựa tới hồ Bạch Thủy lúc gà gáy."},
  {n:"Bảo em đua bằng ngựa của tay đua thay",f:"champ",wx:"vẫn có người đua",lx:"em không tự đua",rt:"Tay đua thay dắt ngựa đến chỗ xuất phát."},
  {n:"Nhắn em tố thúc phụ trước các trưởng lão",f:"self",wx:"các bộ biết ai gian",lx:"không có chứng thì thành vu",rt:"Ô Lặc đứng lên giữa hội, nói thẳng.",rf:"Thúc phụ cười: “Có chứng không?”"}]},
 x1:{h:"Vòng đua cuối",w:"emp",t:"Vòng đua cuối quanh hồ Bạch Thủy. Con trai thúc phụ dẫn trước. Tin về đến kinh qua chim ưng: ngươi còn một lời gửi kịp.",o:[
  {n:"Tự mình ra đua, cưỡi ngựa của em",e:["win","lose"],rt:"Ngươi vượt con trai thúc phụ ở khúc quanh cuối. Cả hồ Bạch Thủy hô tên con gái {pv}.",rf:"Ngươi ngã ở khúc quanh. Con trai thúc phụ về nhất."},
  {n:"Nhắn dũng sĩ đua thay em: đi đường ven nước",e:["win","mid"],rt:"Dũng sĩ đi đường ven nước, về nhất. Các trưởng lão trao tiếng nói cho Ô Lặc.",rf:"Dũng sĩ về nhì. Các trưởng lão chia đôi."},
  {n:"Nhắn em: thua cũng được, giữ mạng",e:"mid",lx:"thúc phụ có tiếng nói",go:()=>bdMeet("olac"),rt:"Ô Lặc về nhì, không ngã."}]}},
 E:{win:{tag:"Hồ Bạch Thủy hô tên nhà ngươi",w:"emp",t:"Hội đua thuộc về nhà {pv}. Các trưởng lão đã thấy: con của {pv} không yếu."},
  mid:{tag:"Hội đua chia đôi",t:"Các trưởng lão chia tiếng nói. Thúc phụ một nửa, em ngươi một nửa."},
  lose:{tag:"Con trai thúc phụ thắng",w:"emp",t:"Con trai thúc phụ thắng hội. Ô Lặc phải lùi về lều cũ.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",10,{t:"Đêm tuyết Âm Sơn",w:"emp",sj:"quân Đại Hy ở ải Âm Sơn",cast(A){return rdCast(A,["v"])},
 g:"Tuyết đầu mùa phủ Âm Sơn. Thúc phụ dồn quân về phía lều Ô Lặc. Quân Đại Hy đóng ở ải Âm Sơn chờ lệnh. Hoàng thượng nói: “Lần này trẫm nghe nàng.”",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Ô Lặc xin binh",w:"maid",if:RDW(1),t:"Thư Ô Lặc: “Thúc phụ có ba nghìn kỵ. Em có một nghìn. Chị, em cần Đại Hy.”",o:[
  {n:"Đưa thư em lên Hoàng thượng",f:"envoy",wx:"ngài thấy em ngươi thật cần",lx:"ngài phải quyết nhanh",rt:"Hoàng thượng đọc, gọi Binh bộ vào ngay."},
  {n:"Hỏi em các bộ còn theo ai",f:"oath",wx:"biết thế trên thảo nguyên",lx:"chậm một ngày",rt:"Ô Lặc kể: bảy bộ theo em, năm bộ theo thúc phụ, ba bộ chờ."},
  {n:"Nhắn em: giữ lều, chờ chị",f:"army",wx:"em không liều",lx:"thúc phụ có thêm thời gian",rt:"Ô Lặc rút về sau hồ, giữ lều."}]},
 s2:{h:"Ô Lặc im lặng",w:"maid",if:RDW(0),t:"Đã hai tuần không có thư Ô Lặc. Người buôn nói lều em bị vây ở chân Âm Sơn.",o:[
  {n:"Xin Hoàng thượng sai sứ đến hỏi thúc phụ",f:"envoy",wx:"thúc phụ phải trả lời Đại Hy",lx:"sứ có thể bị giữ",rt:"Sứ Đại Hy lên bắc mang ấn của Hoàng thượng."},
  {n:"Gửi chim ưng tìm em",f:"oath",wx:"có tin thật",lx:"chim có thể không về",rt:"Chim ưng về sau ba ngày, mang một mẩu vải của em: em còn sống.",rf:"Chim ưng không về."},
  {n:"Xin quân ở ải tiến gần",f:"army",wx:"thúc phụ thấy quân Đại Hy",lx:"có thể châm lửa",rt:"Quân ở ải tiến thêm nửa ngày đường."}]},
 c1:{h:"Tổng binh ải Âm Sơn",w:"emp",t:"Tổng binh ải Âm Sơn tâu: quân ông đủ đánh, nhưng tuyết dày, ra ải thì khó về.",o:[
  {n:"Xin Tổng binh giữ ải, chỉ đánh nếu thúc phụ vượt ải",wx:"không mất quân",lx:"em ngươi tự lo",rt:"Tổng binh nhận lời, ở yên sau ải."},
  {n:"Gửi Tổng binh áo bông và lương",wx:"quân sẵn sàng",lx:"bạc ra",rt:"Áo bông lên ải trước tuyết lớn."},
  {n:"Xin Tổng binh cho một trăm kỵ theo sứ",wx:"sứ có người hộ",lx:"quân Đại Hy ra khỏi ải",rt:"Một trăm kỵ theo sứ lên bắc."}]},
 c2:{h:"{v} và Binh bộ",w:"v",need:["v"],t:"Người nhà {v} ở Binh bộ muốn đánh to để lập công. {v} nói: “Ngươi xin cả đạo quân đi, nhà ta lo phần còn lại.”",o:[
  {n:"Từ chối: không cần cả đạo quân",wx:"không mắc nợ nhà {v}",lx:"{v} thêm oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} cười nhạt."},
  {n:"Nhận lời, để nhà {v} lo quân lương",wx:"có thêm người lo",lx:"công chia cho nhà {v}",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} gật đầu."},
  {n:"Mặc cả: nhà {v} lo lương, không cầm quân",wx:"giữ quân trong tay người của Hoàng thượng",lx:"{v} thấy ngươi khôn",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} nhận lời.",rf:"{v} không chịu."}]},
 c3:{h:"Lời thề cho hoàng tử",w:"emp",if:BDSON,t:"Ô Lặc nhắn: nếu Đại Hy giúp, em sẽ thề với các bộ rằng con trai chị là người thừa kế sau em.",o:[
  {n:"Nhận lời thề cho con trai",wx:"con ngươi có chỗ trên thảo nguyên",lx:"Đại Hy lo hoàng tử bị chia lòng",rt:"Ô Lặc gửi về một mũi tên bẻ đôi: lời thề của thảo nguyên."},
  {n:"Bảo em: con chị là con Đại Hy",wx:"Đại Hy yên tâm",lx:"các bộ quên con ngươi",rt:"Ô Lặc gửi lại một lời: em hiểu."},
  {n:"Xin em thề giữ biên ải thay lời thề cho con",wx:"biên ải có lời thề",lx:"không có gì cho con ngươi",rt:"Ô Lặc thề, các bộ nghe."}]},
 t1:{h:"Ngự án trước tuyết lớn",w:"emp",t:"Trên ngự án có ba tờ: sớ Binh bộ xin đánh, sớ Lễ bộ xin sứ, và tờ thư của em ngươi.",o:[
  {n:"Chỉ vào sớ Lễ bộ",f:"envoy",wx:"ngài thấy ngươi muốn hòa",lx:"Binh bộ cho là ngươi yếu",rt:"Hoàng thượng đặt sớ Lễ bộ lên trên."},
  {n:"Chỉ vào thư của em",f:"oath",wx:"ngài thấy việc từ phía em",lx:"ngài cho là ngươi bênh em",rt:"Hoàng thượng đọc thư em lần nữa."},
  {n:"Chỉ vào sớ Binh bộ",f:"army",wx:"ngài thấy ngươi dám đánh",lx:"người {land} gọi ngươi là kẻ đưa giặc về",rt:"Hoàng thượng nhíu mày, rồi gật."}]},
 x1:{h:"Một lời cho ải Âm Sơn",w:"emp",t:"Đêm tuyết lớn nhất năm. Thái giám chờ ngoài cửa cung ngươi, cầm sẵn giấy mực. Lời ngươi sẽ thành lệnh lên ải Âm Sơn.",o:[
  {n:"Chỉ xin sứ thần, không xin binh",e:["win","lose"],rt:"Sứ Đại Hy mang ấn lên kim trướng. Thúc phụ không dám đánh khi sứ còn ở đó; các bộ chờ có quay về với em.",rf:"Thúc phụ giữ sứ làm tin, vẫn vây lều em."},
  {n:"Đổi binh lấy lời thề của các bộ",e:["win","mid"],rt:"Năm bộ thề theo nhà {pv} để đổi một nghìn kỵ Đại Hy. Thúc phụ còn trơ trọi.",rf:"Các bộ nhận binh mà chưa thề. Quân Đại Hy đóng lại giữa tuyết."},
  {n:"Xin cả đạo quân ra ải",e:["win","lose"],rt:"Đạo quân Đại Hy ra Âm Sơn trong tuyết. Lều thúc phụ cháy đỏ một góc trời.",rf:"Đạo quân sa vào tuyết, mất một phần ba người ngựa.",go:()=>{RD_FL("bd_soi.war",1);return""}}]}},
 E:{win:{tag:"Âm Sơn theo ý ngươi",w:"emp",t:"Một lời của ngươi làm thay đổi thế trên thảo nguyên. Thúc phụ biết, Ô Lặc biết, và Hoàng thượng cũng biết."},
  mid:{tag:"Tuyết phủ Âm Sơn",t:"Tuyết phủ kín Âm Sơn, không ai đánh được ai. Mùa xuân sẽ quyết."},
  lose:{tag:"Tuyết chôn quân",w:"emp",t:"Ải Âm Sơn mất người, biên ải yếu đi. Triều thần nhắc tên ngươi trong mỗi tờ sớ.",go:(_A,G)=>e67bien(G[0])}}});

rdDef("bd_soi",11,{t:"Chủ nhân kim trướng",w:"emp",sj:"kim trướng của {land}",cast(A){return rdCast(A,["v"])},
 g:"Xuân sang, tuyết tan. {pv} trút hơi thở cuối trong kim trướng. Các trưởng lão họp lần cuối để chọn chủ nhân. Sứ của thúc phụ và sứ của Ô Lặc cùng quỳ trước điện Đại Hy, chờ một tờ chiếu.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tang {pv}",w:"emp",if:RDW(1),t:"Tin tang đến. Hoàng thượng cho ngươi để tang theo lễ {land} ba ngày, cho treo cờ trắng trước cung.",o:[
  {n:"Để tang theo lễ {land}, mời sứ hai bên cùng đến",f:"peace",wx:"cả hai bên phải cúi đầu trước linh {pv}",lx:"thúc phụ có dịp gần ngươi",rt:"Sứ thúc phụ và sứ Ô Lặc cùng quỳ trước bàn thờ, không ai dám nói lời nào.",rf:"Sứ thúc phụ không đến."},
  {n:"Để tang riêng, đóng cửa cung",f:"self",wx:"lòng ngươi được yên",lx:"việc triều chờ",rt:"Ba ngày ngươi không gặp ai, trừ {mh}."},
  {n:"Gửi chiếc ấn sói bằng bạc của {pv} cho Ô Lặc",f:"heir",wx:"các bộ thấy ấn trong tay em",lx:"thúc phụ biết ngươi đã chọn",rt:"Chiếc ấn theo chim ưng về hồ Bạch Thủy.",go:()=>bdMeet("olac")}]},
 s2:{h:"Tang {pv}, và một lời đồn",w:"emp",if:RDW(0),t:"Tin tang đến cùng một lời đồn: thúc phụ đã ngồi vào kim trướng trước khi {pv} tắt thở.",o:[
  {n:"Xin Hoàng thượng chưa công nhận ai trước lễ tang",f:"peace",wx:"thúc phụ chưa có danh",lx:"thúc phụ có quân",rt:"Hoàng thượng phán: Đại Hy chờ hết tang mới bàn."},
  {n:"Viết thư cho các trưởng lão, nhắc lệ cổ",f:"self",wx:"các trưởng lão nhớ lệ",lx:"lệ cổ có thể không đủ",rt:"Bảy trưởng lão đọc thư trước lều tang."},
  {n:"Gửi người về xem thật giả",f:"heir",wx:"biết sự thật",lx:"chậm",rt:"Người của ngươi về báo: thúc phụ ngồi vào trướng thật, các trưởng lão chưa nhận."}]},
 c1:{h:"Các trưởng lão hỏi ngươi",w:"maid",t:"Thư các trưởng lão: “Con gái {pv} ở Đại Hy, nói một lời. Lời ấy nặng như một bộ lạc.”",o:[
  {n:"Đáp: kim trướng thuộc về con trai {pv}",wx:"Ô Lặc có thêm tiếng",lx:"thúc phụ thù ngươi",rt:"Các trưởng lão đọc lời ngươi trước hội."},
  {n:"Đáp: các trưởng lão chọn, Đại Hy làm chứng",wx:"các trưởng lão thấy được nể",lx:"lời của ngươi không chỉ ai",rt:"Các trưởng lão gật đầu."},
  {n:"Đáp: kim trướng cần một người mạnh",wx:"các bộ nghe ra ý ngươi",lx:"ai cũng có thể hiểu là mình",rt:"Lời của ngươi đi khắp các lều."}]},
 c2:{h:"{v} và tờ chiếu",w:"v",need:["v"],t:"Người nhà {v} ở Binh bộ đòi chiếu công nhận ai cũng phải kèm hai tòa thành biên cho Đại Hy.",o:[
  {n:"Phản đối: lấy thành của người đang tang",wx:"người {land} nhớ ơn",lx:"nhà {v} oán",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng thượng gạch điều đòi thành."},
  {n:"Đồng ý một tòa thành, đổi lấy chợ ngựa",wx:"Binh bộ vui, chợ ngựa mở",lx:"người {land} nói ngươi bán đất",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"Chiếu có thêm một điều: một tòa thành và một chợ ngựa."},
  {n:"Để Hoàng thượng tự quyết",wx:"không mắc lỗi",lx:"chiếu có điều ngươi không muốn",rt:"Ngươi không nói gì."}]},
 t1:{h:"Hoàng thượng hỏi lần cuối",w:"emp",t:"Đêm trước ngày ban chiếu, Hoàng thượng hỏi: “Nàng muốn ai ngồi kim trướng? Nói thật với trẫm.”",o:[
  {n:"Thưa: em trai thiếp",f:"heir",wx:"ngài biết ý ngươi",lx:"ngài lo ngươi nghiêng về nhà",rt:"Hoàng thượng nói: “Trẫm biết rồi.”"},
  {n:"Thưa: người giữ được biên ải yên",f:"peace",wx:"ngài thấy ngươi nghĩ cho Đại Hy",lx:"lời mập mờ",rt:"Hoàng thượng gật."},
  {n:"Thưa: thiếp",f:"self",wx:"ngài nghe được lòng thật",lx:"ngài sợ",rt:"Hoàng thượng nhìn ngươi rất lâu, không cười.",rf:"Hoàng thượng đứng dậy, ra về."}]},
 x1:{h:"Tờ chiếu kim trướng",w:"emp",t:"Sáng ban chiếu. Hai sứ quỳ trước điện. Hoàng thượng đưa bút cho ngươi: “Nàng viết tên.”",o:[
  {n:"Viết tên Ô Lặc",e:["win","lose"],rt:"Ô Lặc nhận chiếu của Đại Hy, ngồi vào kim trướng. Thúc phụ lùi về núi.",rf:"Chiếu đến, nhưng thúc phụ không lùi. Các bộ chia đôi.",go:(A,ok)=>{if(!ok)bdP("olac","w","ai");return""}},
  {n:"Viết: chia thảo nguyên, mỗi bên một nửa",e:["mid","lose"],rt:"Thảo nguyên chia đôi. Ô Lặc giữ hồ Bạch Thủy, thúc phụ giữ Âm Sơn.",rf:"Hai bên ký rồi lại đánh."},
  {n:"Viết tên thúc phụ, đổi lời thề giữ biên ải",e:["mid","lose"],rt:"Thúc phụ ngồi vào kim trướng, thề giữ yên biên ải. Ô Lặc được làm tả hiền vương.",rf:"Thúc phụ ngồi vào trướng, rồi quên lời thề.",go:(A,ok)=>{if(!ok)bdKill("olac");return""}}]}},
 E:{win:{tag:"Em trai lên ngôi hãn",w:"emp",t:"Ô Lặc ngồi kim trướng với chiếu của Đại Hy. Mỗi mùa thu, ngựa thảo nguyên lại xuống chợ biên, kèm một phong thư cho chị."},
  mid:{tag:"Thảo nguyên chia đôi",t:"Thảo nguyên có hai chủ, cả hai đều gọi ngươi là người nhà, không ai nghe ngươi trọn. Biên ải yên, lòng ngươi không yên."},
  lose:{tag:"Thúc phụ thắng, mối hòa lung lay",w:"emp",t:"Thúc phụ ngồi kim trướng. Ô Lặc lưu lạc. Đại Hy nhìn ngươi như một tờ hòa ước đã cũ.",go:(_A,G)=>e67bien(G[0])}}});
RD97L.push(rdRare({a:"bd_soi_11",tag:"Kim trướng gọi ngươi là Khả đôn",w:"emp",n:"Viết tên chín trưởng lão, xin họ chọn trước mặt hai sứ",
 path:["vòng ngọc của mẹ","Trình cả hai phong thư","Giữ bản đồ","Tha Thát Mộc","Bắt sống Thát Mộc","mở chợ ngựa ở ải tây","Đón {mh} vào cung","dũng sĩ","Chỉ xin sứ thần","Đổi binh lấy lời thề"],
 bad:["Chém Thát Mộc","Mua chuộc","Dùng {mh} làm mồi"],x:[()=>S.danh>=RR("bd_soi_11").bar,"Danh từ "+RR("bd_soi_11").bar],
 t:"Ngươi không viết tên ai. Ngươi viết tên chín trưởng lão, xin họ chọn ngay trước điện Đại Hy. Chín người đứng dậy, cùng quay về phía ngươi: theo lệ cổ, con gái {pv} mà giữ được thảo nguyên qua một mùa đông, thì kim trướng gọi là Khả đôn. Ô Lặc ngồi trướng, nhưng ấn sói ở trong tay ngươi; thúc phụ quỳ nhận lệnh từ một tờ thư có chữ ký của ngươi.",
 go:(_A,G)=>e67bien(G[0]),rw:"bienngu",ti:"Khả đôn của kim trướng"}));
