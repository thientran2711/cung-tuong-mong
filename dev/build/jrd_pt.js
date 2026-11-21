/* ================= jrd_pt: the PHÙ TANG princess — third country branch of hòa thân and its OWN four roads (owner OD 19/11 ~06:40Z / ~06:42Z / ~06:50Z;
   FIGURE_GATE «OWNER LƯỢT 283»; E19 mapping reports/foreign-princess-3-history.md §B/§C.3; ROAD_MAP §4.5c) =================
   pf is a COUNTRY BRANCH of the one hòa thân origin nc (j1 ORIGIN_BR, par "nc"), never a 10th origin: it is rolled with nc (BAL.orig.br.nc.pf),
   plays the jkc2 home phase in Phù Tang (KC2LAND.pf), then the palace. New pf lives roll one of pt_hai · pt_su (this file) · pt_tang · pt_dang
   (jrd_pt2.js): .4 premise arc (o:"pf") + .5–.11 + j97 rare at .4 (PF97) + RD97L rare at .11. Numbers: jbalpt.js (ONE CORE).
   Era (Foreman E): a Tang-like world — no Wokou word (giặc biển Đông Hải), sea traders are Tân La merchants, «Thiên hoàng» only inside Phù Tang
   scenes (Đại Hy says «Quốc chủ Phù Tang»), dress = Tang-style jacket + pleated skirt. Names marked [D] in ROAD_MAP §5.4 are invented. */
const pfArc=(id,d)=>typeof arcFx==="function"?arcFx(id,d):d;
/* ---------- the branch (j1 ORIGIN_BR / j4 STORY / j67 QUEST67) ---------- */
ORIGIN_BR.pf={par:"nc",k:"pf",land:"Phù Tang",n:"Công chúa Phù Tang hòa thân",r:BAL.orig.pf.r,o:BAL.orig.pf.o,hh:0,th:BAL.orig.pf.th,art:{vu:1},
 t:"Con gái Thiên hoàng Phù Tang, theo thuyền sứ đoàn vượt bể sang làm tin cho minh ước hai nước."};
STORY.pf={t:"Hòa thân Phù Tang",n:3,goal:"Ngươi qua bể mà đến, sau lưng là sóng, trước mặt là cung cấm. Giữ cho hai nước còn thuyền qua lại, và giữ cho mình khỏi bị quên như một kiện cống phẩm.",
 init(){S.st.m=0},hint:()=>"Theo từng chương của Mệnh truyện",month(){return""}};
QUEST67.pf={t:"Người con gái bên kia bể",e:[["Cầu nối hai bờ biển",BAL.orig.quest[0],"Thuyền Phù Tang và thuyền Đại Hy đều mang thư của ngươi."],
 ["Khách được giữ lại",BAL.orig.quest[1],"Đại Hy cho ngươi một chỗ đứng, dù chẳng ai quên ngươi đến từ bên kia bể."],
 ["Kiện cống phẩm bị quên",BAL.orig.quest[2],"Sứ đoàn đã về, ngươi ở lại một mình; chỉ còn dựa vào chính mình."]]};
/* ---------- land tokens {land} {pv} {mh} {quan} {pa} {pb} {canh} {laq} {nden} (jrd_nc NCL; chained over the bd country switch of jrd_bd) ---------- */
const pfLife=()=>{try{return S.origin.k==="pf"}catch(e){return false}};
if(typeof NCL==="object"){NCL.pf={land:"Phù Tang",pv:"Phụ hoàng",mh:"Mẫu hậu",quan:"Thiên hoàng",pa:"Hoàng huynh",pb:"Hoàng thúc",canh:"canh rong biển nấu cá muối",laq:"lá tía tô",nden:"rưới nước thanh tẩy trước đền Thần"};
 if(typeof TOK67==="object")for(const k of Object.keys(NCL.pf)){const t0=TOK67[k];TOK67[k]=function(){return pfLife()?NCL.pf[k]:typeof t0==="function"?t0.apply(this,arguments):t0}}}
/* ---------- PFP: the people of pf's roads (law 6b, ROAD_MAP §5.4) — one living state per life, kept in the road flag book ----------
   where: "hb" at sea · "tn" Phù Tang · "cang" Minh Châu port · "kinh" kinh thành · "nguc" ngục; alive 1 / dead −1; met 1 once she has dealt with them.
   Chapters move them (pfMove / pfKill); a moved or dead person never acts again (every later line reads pfP / pfAlive; dev/measure/pt-scan.py). */
const PFP={kimthanh:{n:"Tá Bá Kim Thành",r:"Khiển Đường đại sứ",w:"kinh",want:"mang quốc thư về mà không mất thể diện của Phù Tang",man:1,h:"thu"},
 trongla:{n:"Cát Thành Trọng Lữ",r:"lưu học sinh",w:"kinh",want:"đỗ khoa thi của Đại Hy, làm quan ở đất này",man:1,h:"thu"},
 tieungoc:{n:"Tiểu Ngọc",r:"nhũ mẫu của ngươi",w:"hb",want:"tới được bờ, ở lại bên ngươi"},
 thanlao:{n:"Thân Lão",r:"người giữ kiêng trên thuyền",w:"hb",want:"được tin là đã giữ kiêng trọn vẹn",man:1,h:"thu"},
 namlao:{n:"Nham Lão",r:"lão lái thuyền thứ tư",w:"hb",want:"đưa thuyền và người về được bến",man:1,h:"thu"},
 huuthanh:{n:"Kim Hựu Thành",r:"thương chủ Tân La",w:"cang",want:"được quyền buôn ở Minh Châu, không phải nộp thuế hai lần",man:1,h:"thu"},
 ocuu:{n:"Ô Cửu",r:"đầu lĩnh giặc biển Đông Hải",w:"hb",want:"tiền chuộc, và một bến không ai đuổi",man:1,h:"thu"},
 tinhvien:{n:"Tịnh Viên",r:"tăng sư Phù Tang",w:"kinh",want:"thỉnh được một bậc thầy giới luật sang Phù Tang",man:1,h:"vuon"},
 trivien:{n:"Pháp sư Trí Viễn",r:"cao tăng Đại Hy",w:"kinh",want:"truyền giới luật sang bên kia bể trước khi mắt mờ hẳn",man:1,h:"vuon"},
 mh:{n:"Mẫu hậu",r:"mẹ",w:"tn",want:"nhận được một lá thư của con gái mỗi mùa gió"}};
const pfP=(id,k,v)=>{const key="pt.p."+id+"."+k;if(v!=null)RD_FL(key,v);const x=RD_FL(key);
 if(x)return x;if(k==="alive")return 1;if(k==="w")return PFP[id].w;return 0};
const pfAlive=id=>pfP(id,"alive")!==-1;/* dead = -1 (0 is the book's "unset") */
/* a man who is IN the capital stands in the world like every man (S.men, jmen schedule; the envoy keeps the envoy's places), and leaves it when
   he sails, is jailed or dies (law 6b; the bdMan pattern of jrd_bd). Women (Tiểu Ngọc, the mother) live in the book only, like bd's women guests. */
const pfMan=id=>{try{if(typeof menInit==="function")menInit()}catch(e){}if(!S.men||!PFP[id]||!PFP[id].man)return"";const mid="mpt_"+id,M=BAL.road.pt.man;
 const on=pfAlive(id)&&pfP(id,"w")==="kinh";const had=S.men.find(m=>m.id===mid);if(had){had.alive=pfAlive(id);if(on){had.away=0;delete had.ban}else{had.away=1;had.ban=M.away}return""}
 if(on)S.men.push({id:mid,role:"Sứ thần",rw:PFP[id].r,haunts:[PFP[id].h||"thu"],age:M.age[id]||M.age.d,name:PFP[id].n,trait:M.trait[id]||"cẩn trọng",loyal:M.loyal,af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[],ptp:id,known:1});return""};
const pfKill=id=>{pfP(id,"alive",-1);pfMan(id);return ""};
const pfMove=(id,w)=>{pfP(id,"w",w);pfMan(id);return ""};
const pfMeet=id=>{pfP(id,"met",1);pfMan(id);return ""};
const pfWhere=id=>({hb:"trên biển",tn:"Phù Tang",cang:"bến Minh Châu",kinh:"kinh thành",nguc:"ngục"})[pfP(id,"w")]||"";
/* PFO: the ONE object book of pf's four roads (law 6c; both files use it): fb "pt.o.<thing>" = where / who holds it now (0 = never in play).
   pfO(k) reads, pfO(k,v) sets (returns "" for text use). Holders: "ta" her · "vua" the Emperor · "kho" Nội vụ phủ store · "hl" Hồng Lư tự ·
   "bien" lost at sea · "chay" burnt · a PFP id · "tn" sent home · "chua" a temple. */
const pfO=(k,v)=>{const r=RD_FL("pt.o."+k,v);return v!=null?"":r};
const PFCF=k=>BAL.road.pt.conf[k];
const pfConfine=k=>{S.confined=Math.max(S.confined||0,PFCF(k));return ""};
/* the .4 rare rows of the pt premises (j97 R97L shape; j97 appends them; numbers BAL.arc.rare.<road>) */
const PF97=[];
RDQ.ptNgoc=()=>pfAlive("tieungoc");RDQ.ptKim=()=>pfAlive("kimthanh")&&pfP("kimthanh","w")==="kinh";

/* =====================================================================================================================================
   pt_hai · Vượt bể — lead (E21)
   ===================================================================================================================================== */
/* pt_hai · Vượt bể (Sinh tồn · Trung nghĩa). People: {emp}, {v}, {maid}, {th}; PFP kimthanh (envoy, capital), tieungoc (her nurse-maid, 4th ship),
   namlao (helmsman, 4th ship), thanlao (kiêng-keeper, her ship → Minh Châu), huuthanh (Tân La merchant, Minh Châu), ocuu (pirate chief, at sea).
   Objects (PFO): van (the painted plank), thu (Nham Lão's letter), danhsach (the embassy roll), nhatky (the 4th ship's log), ruong (the tribute chest),
   niem (its seals), ngoctrai (her pearls), haido (Kim Hựu Thành's sea chart), haidodh (the Đại Hy navy chart copy, .11), giaythue (the tax-free paper),
   hopthu (the mother's letter box, lost with Tiểu Ngọc), guong (the mother's bronze mirror, hers from .4), dongchau (the PF97 hairpin), tram ({v}'s planted hairpin).
   GE hooks (r2: each named option carries it): ge1 Người đếm tên kẻ chết đuối (.11 x1 «Ghi đủ tên người chết…», s2 «Tự tay ghi tên bà») ·
   ge2 Chủ thuyền Đông Hải (.8 x1 «Hứa cho Ô Cửu một bến…», .11 c2 «Xin tha cho hắn làm lính thủy») · ge3 Đổ tội cho biển (.4 x1 «Tâu: biển lấy cống…»,
   .10 c2 «Tâu: biển làm mất…», .11 x1 «Ghi người chết là ‘ở lại…’») · ge4 Thuyền về Nan Ba (.11 t1 «Giao thuyền cho người {land} lái», E.mid). */
const PFNGOC=()=>pfAlive("tieungoc")?"Tiểu Ngọc":"người sống sót";/* the one who tells, if the nurse-maid is gone */
const PFLOG=()=>pfO("nhatky")==="ta";/* she holds the 4th ship's log */
/* the ransom pearls' source, kept when they go to Ô Cửu (law 6c r2: the text names where the box came from) */
const PFNGOCN=()=>({ta:"hộp ngọc hồi môn của mẫu hậu",kho:"hộp ngọc mượn của Nội vụ phủ",kimthanh:"hộp ngọc đại sứ đổi bằng sách"})[RD_FL("pt.f.ngoc")||pfO("ngoctrai")]||"hộp ngọc";
RTHEME67.pt_hai="emp";
ARC67.pt_hai=pfArc("pt_hai",{o:"pf",t:"Thuyền thứ tư chưa tới",w:"emp",sj:"chiếc thuyền thứ tư của sứ đoàn",cast(A){if(!pfO("ruong"))pfO("ruong","namlao");if(!pfO("nhatky"))pfO("nhatky","namlao");if(!pfO("danhsach"))pfO("danhsach","kimthanh");if(!pfO("guong"))pfO("guong","ta");return rdCast(A,["v"])},
 g:"Bốn chiếc thuyền sứ đoàn rời Ngũ Đảo cùng một con nước. Thuyền của ngươi cập bến Minh Châu; thuyền thứ tư, chở Tiểu Ngọc, rương cống và cuốn nhật ký hải trình, đến nay vẫn chưa thấy. Trong triều đã có người hỏi: {land} gửi nửa phần cống, hay gửi một nàng công chúa thay cho cống?",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Đại sứ xin vào chầu",w:"emp",t:"Khiển Đường đại sứ Tá Bá Kim Thành xin vào chầu để tâu việc chiếc thuyền thứ tư. Ông nói tiếng Đại Hy chậm, từng chữ một. Hồng Lư tự khanh hỏi ngươi có muốn đứng cạnh ông không.",o:[
  {n:"Đứng cạnh đại sứ, tự mình thưa việc",f:"tim",wx:"ngài nghe chuyện từ chính miệng ngươi",lx:"phi tần đứng giữa triều, người ta chê",rt:"Ngươi thưa rõ: bốn thuyền, một con nước, một cơn bão. Hoàng thượng gật đầu.",rf:"Hồng Lư tự khanh ngắt lời ngươi: phi tần không tâu việc sứ đoàn.",go:()=>pfMeet("kimthanh")},
  {n:"Viết tờ trình bằng chữ Hán, nhờ Hồng Lư tự dâng",f:"cho",wx:"giữ đúng phép Đại Hy",lx:"tờ trình nằm chờ trên án",rt:"Tờ trình viết chân phương, Hồng Lư tự khanh khen chữ đẹp.",go:()=>pfMeet("kimthanh")},
  {n:"Xin Hoàng thượng sai thuyền Minh Châu ra khơi tìm",f:"tim",wx:"có người đi tìm ngay",lx:"tốn kho, triều thần không vui",rt:"Hoàng thượng phê: thuyền tuần Minh Châu ra khơi ba ngày.",rf:"Hoàng thượng nói: biển rộng, chờ gió đổi đã."}]},
 s2:{h:"Bến Minh Châu im sóng",w:"maid",t:"{maid} kể: mỗi sáng thủy thủ {land} ở Minh Châu ra bến nhìn về phía đông, không ai nói gì. Trên thuyền thứ tư có Tiểu Ngọc, người đã bế ngươi từ thuở lọt lòng.",o:[
  {n:"Lập bàn thờ thần biển trong cung, khấn cho thuyền",f:"cho",wx:"người {land} trong kinh thấy ngươi không quên họ",lx:"Thái hậu không ưa lễ lạ",rt:"Ngươi rưới nước, thắp hương, khấn theo lệ đền Thần."},
  {n:"Gửi bạc cho thuyền chài Minh Châu ra dò",f:"tim",wx:"có thêm mắt trên biển",lx:"bạc ra mà chưa chắc thấy gì",rt:"Mười chiếc thuyền chài ra khơi, dặn thấy ván sơn son thì mang về."},
  {n:"Hỏi đại sứ xem thuyền thứ tư chở những gì",f:"le",wx:"biết rõ cái đang mất",lx:"đại sứ ngại nói",rt:"Đại sứ đưa ngươi xem bản danh sách sứ đoàn: tên người, tên cống phẩm, rương nào niêm phong ở đâu.",go:()=>{pfMeet("kimthanh");return pfO("danhsach","ta")}}]},
 c1:{h:"{v} hỏi về cống phẩm",w:"v",need:["v"],t:"{v} cười trước mặt các phi tần: nghe nói rương cống {land} chìm mất nửa, chẳng biết có thật từng có rương không.",o:[
  {n:"Mời {v} xem danh mục cống đã đến",wx:"{v} không còn cớ nói",lx:"{v} thấy danh mục thiếu thật",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} đọc danh mục, im lặng.",rf:"{v} chỉ vào dòng thiếu: “Đây, thiếu.”"},
  {n:"Đáp: biển lấy của ai thì người ấy biết",wx:"giữ được thể diện",lx:"{v} cho là ngươi mỉa nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* rolled (r2 6a); {v}'s grudge is the price of answering, won or lost */,rt:"Các phi tần che miệng cười. {v} đỏ mặt.",rf:"{v} cười nhạt: “Biển không biết nói, công chúa thì biết.” Các phi tần cười theo nàng."},
  {n:"Lặng thinh, ghi nhớ từng lời",wx:"không thêm thù",lx:"lời đồn đi tiếp",rt:"Ngươi uống hết chén trà, không nói một lời."},
  {n:"Sai người tung tin: người nhà {v} từng giữ cống phẩm của nước khác",wx:"lời đồn quay về phía {v}",lx:"nếu lộ, ngươi là kẻ bịa chuyện",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* ác (r2): a rumour, not a proof; it can be traced back */,rt:"Ba hôm sau, hậu cung thì thầm về người nhà {v}.",rf:"Tin đồn bị lần ra từ cung ngươi. {v} đem chuyện ấy kể với Thái hậu."}]},
 c2:{h:"Mảnh ván sơn son",w:"emp",t:"Thứ sử Minh Châu gửi lên một mảnh ván sơn son, ngư dân vớt được ngoài cửa biển. Trên ván có hình mặt trời của thuyền {land}.",o:[
  {n:"Xin giữ mảnh ván làm chứng",wx:"có vật thật trong tay",lx:"người ta nói ngươi giữ đồ xui",rt:"Mảnh ván được đặt trong kho của cung ngươi.",go:()=>pfO("van","ta")},
  {n:"Gửi mảnh ván cho đại sứ xem",wx:"đại sứ nhận ra thuyền nào",lx:"đại sứ suy sụp",rt:"Đại sứ sờ hình mặt trời, nói: “Thuyền thứ tư. Nó còn trôi được.”",go:()=>{pfMeet("kimthanh");return pfO("van","kimthanh")}},
  {n:"Xin thứ sử dò theo hướng ván trôi về",wx:"biết thuyền ở phương nào",lx:"tốn công thứ sử",rt:"Thứ sử báo: gió đông bắc, ván trôi từ phía nam lên.",rf:"Thứ sử báo: không dò được.",go:()=>pfO("van","kho")}]},
 t1:{h:"Ngài hỏi: còn hy vọng chăng",w:"emp",t:"Đêm ấy Hoàng thượng hỏi ngươi: “Nàng còn tin chiếc thuyền ấy về không?” Câu trả lời của ngươi, ngài sẽ đem ra triều ngày mai.",o:[
  {n:"Thưa: thần thiếp tin, xin ngài cho tìm",f:"tim",wx:"ngài thấy ngươi có lòng với người của mình",lx:"nếu thuyền không về, ngươi mất lời",rt:"Hoàng thượng nói: “Trẫm cho tìm.”",rf:"Hoàng thượng thở dài: “Tin thì cứ tin.”"},
  {n:"Thưa: thần thiếp chờ gió mùa, không dám làm phiền",f:"cho",wx:"ngài thấy ngươi biết phận",lx:"ngài nghĩ ngươi đã buông",rt:"Hoàng thượng gật đầu, không hỏi thêm."},
  {n:"Thưa: thần thiếp không biết, chỉ biết người trên thuyền còn cần gạo nước",f:"le",wx:"ngài thấy ngươi thật thà",lx:"không ai cho là ngươi hy vọng",rt:"Hoàng thượng im lặng rất lâu."}]},
 x1:{h:"Triều nghị về nửa phần cống",w:"emp",t:"Sáng hôm sau, Hộ bộ tâu: {land} còn nợ nửa phần cống. Có người xin bắt sứ đoàn ở lại đến khi cống đủ. Hoàng thượng nhìn về phía rèm, nơi ngươi đứng.",o:[
  {n:"Tâu: biển lấy cống, không lấy lòng {land}; xin chờ đến gió mùa",e:["win","lose"],rt:"Hoàng thượng phán: chờ đến gió mùa. Hộ bộ cúi đầu.",rf:"Hộ bộ tâu tiếp: lòng mà không có cống thì là lòng suông. Cả triều cười."},
  {n:"Dâng hồi môn của mình bù phần cống",e:["win2","mid"],rt:"Mười tấm gấm và đôi bình sứ trong hồi môn của ngươi được ghi vào sổ cống. Hộ bộ không còn gì để nói.",rf:"Hộ bộ nhận hồi môn, nhưng vẫn ghi: {land} cống chưa đủ.",go:()=>pfO("hoimon","kho")},
  {n:"Xin viết thư về {land} đòi cống bù",e:"mid",lx:"{land} mang nợ với Đại Hy",rt:"Thư đi theo thuyền buôn Tân La. Triều nghị khép lại."}]}},
 E:{win:{tag:"Chờ gió mùa",w:"emp",t:"Hoàng thượng cho sứ đoàn ở lại chờ gió mùa, không bắt ai. Người {land} trong kinh cúi chào ngươi mỗi khi gặp."},
  win2:{tag:"Hồi môn thay cống",w:"emp",t:"Hồi môn của ngươi nằm trong kho Đại Hy với tên {land}. Hoàng thượng nói với Thái hậu: “Nàng ấy trả nợ cho cả một nước.”"},
  mid:{tag:"Sổ cống còn ghi thiếu",t:"Triều nghị khép lại. Sổ Hộ bộ vẫn ghi một dòng thiếu, chờ thuyền thứ tư hoặc thuyền năm sau."},
  lose:{tag:"Nửa phần cống",w:"v",t:"{v} kể khắp hậu cung: {land} gửi sang một nàng công chúa và nửa rương đồ, rồi đổ cho biển."}}});
PF97.push({a:"pt_hai",tag:"Lửa hiệu trên Ngũ Đảo",w:"emp",n:"Xin Hoàng thượng cho đốt lửa hiệu dọc bờ Minh Châu suốt ba đêm",
 path:["Đứng cạnh đại sứ","Gửi bạc cho thuyền chài","Hỏi đại sứ","Gửi mảnh ván","Thưa: thần thiếp tin","Tâu: biển lấy cống"],bad:["Lặng thinh","Thưa: thần thiếp chờ gió mùa"],x:[()=>S.tamco>=BAL.arc.rare.pt_hai.bar,`Tâm cơ từ ${BAL.arc.rare.pt_hai.bar}`],
 t:"Ngươi nhớ lời Nham Lão kể khi còn ở Phù Tang: thuyền lạc đêm đi theo lửa. Hoàng thượng cho đốt lửa hiệu dọc bờ Minh Châu ba đêm liền. Đêm thứ ba, lính canh thấy một đốm lửa nhỏ đáp lại ngoài khơi: thuyền thứ tư còn nổi. Hoàng thượng sai thưởng cho ngươi một cây trâm đông châu: “Ngọc của biển, trả cho người biết gọi biển.”",
 go:()=>pfO("dongchau","ta")/* r2 6c: the reward is the hairpin (rw item), booked as hers */,rw:"nt_dongchau",ti:"Lửa hiệu trên Ngũ Đảo"});

rdDef("pt_hai",5,{t:"Thư từ Phúc Châu",w:"emp",sj:"lá thư từ bờ biển Phúc Châu",cast(A){return rdCast(A,["v"])},
 g:"Một chiếc thuyền chài từ Phúc Châu mang lên kinh lá thư của Nham Lão, lão lái thuyền thứ tư: cột buồm gãy, thuyền trôi về phương nam, mắc cạn ở một đảo không tên. Nước ngọt còn đủ ít hôm. Người trên thuyền xin một con thuyền, và xin đừng ai quên họ.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư đến tay ngươi trước",w:"maid",if:RDW(1),t:"Vì Hoàng thượng đã cho tìm, thuyền chài đưa thư thẳng vào cung ngươi. {maid} đặt lá thư lên án: giấy ướt mặn, chữ Hán run, có dấu son của Nham Lão.",o:[
  {n:"Dâng ngay lá thư lên Hoàng thượng",f:"cuu",wx:"ngài thấy ngươi không giấu gì",lx:"triều thần biết ngay cái khó của {land}",rt:"Hoàng thượng đọc thư, gõ ngón tay lên án.",go:()=>pfO("thu","vua")},
  {n:"Giữ thư, mời đại sứ vào bàn trước",f:"giu",wx:"người {land} bàn với nhau trước khi nói",lx:"người ta bảo ngươi giấu tin",rt:"Đại sứ đọc thư, nói khẽ: “Còn sống. Họ còn sống.”",go:()=>{pfMeet("kimthanh");return pfO("thu","ta")}},
  {n:"Chép một bản, gửi bản gốc lên Hồng Lư tự",f:"le",wx:"đúng phép mà vẫn giữ được chứng",lx:"chậm một ngày",rt:"Bản chép nằm trong hộp gỗ của ngươi.",go:()=>pfO("thu","hl")}]},
 s2:{h:"Thư đến Hồng Lư tự trước",w:"emp",if:RDW(0),t:"Lá thư đến Hồng Lư tự trước. Tự khanh nói thư không có ấn của sứ đoàn, chưa biết thật giả.",o:[
  {n:"Xin đại sứ nhận dấu son của Nham Lão",f:"le",wx:"thư được nhận là thật",lx:"phải chờ đại sứ",rt:"Đại sứ nhận ra dấu son ngay.",rf:"Đại sứ đang ở Minh Châu, ba ngày nữa mới về.",go:()=>{pfMeet("kimthanh");return pfO("thu","hl")}},
  {n:"Xin Hoàng thượng cho xem thư",f:"cuu",wx:"ngài tự quyết",lx:"Tự khanh mất mặt",rt:"Hoàng thượng cho mang thư vào. Ngươi đọc to từng dòng.",go:()=>pfO("thu","vua")},
  {n:"Gửi bạc nhờ người Tự đưa thư ra sớm",f:"giu",wx:"thư về tay ngươi",lx:"bạc ra, có người biết",rt:"Lá thư về đến cung ngươi trước giờ Ngọ.",go:()=>pfO("thu","ta")}]},
 s3:{h:"Nước ngọt còn ít hôm",w:"maid",t:"Người đưa thư kể thêm: trên đảo không có suối. Họ hứng nước mưa bằng buồm rách.",o:[
  {n:"Gửi ngay gạo và nước theo thuyền chài",f:"cuu",wx:"người trên đảo có thêm ngày sống",lx:"bạc ra, thuyền nhỏ đi xa",rt:"Thuyền chài chất đầy chum nước, ra khơi lúc chiều."},
  {n:"Gửi thuốc trị sốt cùng thư dặn",f:"giu",wx:"người bệnh có thuốc",lx:"thuốc không thay được nước",rt:"Ngự y cho ba gói thuốc, gói kỹ trong giấy dầu."},
  {n:"Viết thư trả lời, dặn giữ lửa mỗi đêm",f:"le",wx:"thuyền tìm dễ thấy họ",lx:"không gửi được gì khác",rt:"Thư của ngươi gói trong ống trúc, buộc vào mạn thuyền chài."}]},
 c1:{h:"Ai trả tiền thuyền cứu",w:"emp",t:"Thứ sử Minh Châu tâu lên: một chiếc thuyền lớn đi phương nam cần bạc, gạo và hai mươi tay chèo. Kho Minh Châu không có khoản ấy.",o:[
  {n:"Bỏ bạc riêng ra thuê thuyền",wx:"thuyền đi ngay",lx:"bạc ra",rt:"Thứ sử nhận bạc, hẹn ba ngày thuyền rời bến."},
  {n:"Xin đại sứ lấy bạc của sứ đoàn",wx:"người {land} lo người {land}",lx:"đại sứ còn phải trả nhiều thứ",go:(A,ok,G)=>{pfMeet("kimthanh");return""},rt:"Đại sứ mở rương, đếm bạc đưa thứ sử.",rf:"Đại sứ nói: bạc sứ đoàn để mua sách; ông xin ngươi lo trước."},
  {n:"Tâu xin Hộ bộ chi theo lệ cứu nạn",wx:"đúng phép, không mất bạc",lx:"Hộ bộ chậm",rt:"Hộ bộ chuẩn chi, nhưng phải chờ mười ngày.",rf:"Hộ bộ nói: lệ cứu nạn dành cho dân Đại Hy."}]},
 c2:{h:"{v} hỏi thư ấy ai đọc được",w:"v",need:["v"],t:"{v} nói giữa lúc thỉnh an: “Thư viết bằng chữ gì? Người {land} viết, người {land} đọc, rồi bảo cả triều tin?”",o:[
  {n:"Xin Hoàng thượng cho Hàn lâm đọc thư",wx:"một người Đại Hy đọc, cả triều tin",lx:"nếu chữ run quá, Hàn lâm đọc sai",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Hàn lâm đọc thư, từng chữ khớp với lời ngươi.",rf:"Hàn lâm đọc ngắc ngứ ba chỗ; {v} cười."},
  {n:"Đáp: chữ Hán trên thư là chữ Đại Hy dạy cho {land}",wx:"cả điện thấy ngươi khéo lời",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Thái hậu khẽ cười. {v} cúi đầu.",rf:"{v} đáp ngay: “Học chữ người ta rồi viết thư xưng ngang người ta.” Thái hậu gật gù."},
  {n:"Mời {v} cùng gửi một chum nước ra đảo",wx:"{v} không thể nói gì thêm",lx:"{v} nhận công",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} miễn cưỡng nhận lời, sai người gửi một chum nước."}]},
 t1:{h:"Đại sứ muốn tự đi",w:"emp",t:"Tá Bá Kim Thành xin được tự mình theo thuyền cứu ra đảo. Ông là người giữ quốc thư; nếu ông chết trên biển, sứ đoàn không còn ai nói được với Đại Hy.",o:[
  {n:"Khuyên đại sứ ở lại kinh",f:"giu",wx:"sứ đoàn còn người đứng đầu",lx:"đại sứ thấy mình vô dụng",rt:"Đại sứ cúi đầu ở lại, đêm nào cũng ra bến nhìn.",go:()=>pfMeet("kimthanh")},
  {n:"Xin Hoàng thượng cho một quan Đại Hy đi cùng",f:"cuu",wx:"có quan Đại Hy làm chứng",lx:"ngài phải nghĩ thêm một việc",rt:"Hoàng thượng sai một viên Thị lang Hồng Lư tự đi theo thuyền.",rf:"Hoàng thượng nói: không có quan nào rảnh."},
  {n:"Để đại sứ tự quyết",f:"le",wx:"ông nhớ ngươi tôn trọng ông",lx:"ông có thể đi mà không về",rt:"Đại sứ quyết ở lại. “Quốc thư phải có người giữ.”",go:()=>pfMeet("kimthanh")}]},
 x1:{h:"Thuyền cứu ra khơi",w:"emp",t:"Cuối tháng, gió còn chưa đổi. Thủy sư Minh Châu nói đi lúc này là liều. Thương thuyền Tân La nói họ đi được, nếu có giá. Hoàng thượng hỏi ngươi chọn thuyền nào.",o:[
  {n:"Xin thuyền thủy sư Đại Hy đi ngay",e:["win","lose"],rt:"Thuyền thủy sư ra khơi giữa sóng lớn, cờ Đại Hy trên cột buồm. Cả kinh nói ngài thương người của nàng.",rf:"Thuyền thủy sư gặp gió ngược, quay về sau năm ngày, gãy một mái chèo."},
  {n:"Thuê thương thuyền Tân La, trả bằng giấy miễn thuế một mùa",e:["win","mid"],rt:"Thương thuyền Tân La nhổ neo đêm ấy. Thương nhân biết đường đảo hơn thủy sư.",rf:"Thương thuyền đi, nhưng không hứa ngày về.",go:()=>pfO("giaythue","tanla")/* r2 6c: the paper goes to the Tân La ship master, won or not */},
  {n:"Chờ gió đổi, gửi thêm thuyền chài mang nước",e:"mid",lx:"người trên đảo phải chờ",rt:"Mười chum nước nữa ra khơi. Thuyền lớn chờ gió."}]}},
 E:{win:{tag:"Thuyền cứu đã đi",w:"emp",t:"Thuyền cứu rời Minh Châu. Hoàng thượng dặn: thấy người {land} thì đón như đón người Đại Hy."},
  mid:{tag:"Còn chờ gió",t:"Gió chưa đổi. Mỗi đêm trên bến Minh Châu có một ngọn lửa, đốt cho người trên đảo."},
  lose:{tag:"Thuyền quay về",w:"v",t:"Thuyền cứu quay về tay không. {v} nói: biển đã quyết rồi, sao còn bắt người Đại Hy chết theo."}}});
rdDef("pt_hai",6,{t:"Người giữ kiêng",w:"emp",sj:"Thân Lão, người giữ kiêng trên thuyền",cast(A){if(pfP("thanlao","w")==="hb")pfMove("thanlao","nguc");return rdCast(A,["v"])},
 g:"Ở Minh Châu, thủy thủ {land} trói Thân Lão, người giữ kiêng trên thuyền của ngươi. Theo lệ cũ, người giữ kiêng không chải tóc, không ăn thịt suốt chuyến đi; thuyền gặp bão là tại hắn phạm kiêng, phải chết. Thứ sử Minh Châu giam hắn lại: trên đất Đại Hy không ai được giết người vì gió.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thuyền cứu báo tin",w:"emp",if:RDW(1),t:"Thuyền cứu về báo: đảo đã trống. Chỉ còn xác thuyền thứ tư, tro bếp và một lá cờ đen cắm trên đá. Thủy thủ {land} nghe tin, càng đòi xử Thân Lão.",o:[
  {n:"Xin Hoàng thượng cho tra lá cờ đen",f:"luat",wx:"người ta thôi đổ cho gió",lx:"tra lâu, thủy thủ không đợi",rt:"Thủy sư nhận ra cờ của giặc biển Đông Hải.",rf:"Không ai nhận ra lá cờ."},
  {n:"Tự đến nói với thủy thủ: người còn sống thì chưa ai được chết",f:"le",wx:"thủy thủ nghe lời công chúa",lx:"phi tần ra bến, triều chê",rt:"Thủy thủ cúi đầu, cởi dây cho Thân Lão ăn cơm."},
  {n:"Giữ tin, chờ thêm",f:"giu",wx:"không ai làm liều vì một tin chưa rõ",lx:"Thân Lão vẫn bị trói",rt:"Tin về lá cờ đen chỉ ngươi và Hoàng thượng biết."}]},
 s2:{h:"Thủy thủ đòi người",w:"maid",if:RDW(0),t:"Thuyền cứu chưa về. Ba mươi thủy thủ {land} quỳ trước nha môn Minh Châu đòi trả Thân Lão để xử theo lệ. Thứ sử gửi tờ cấp báo lên kinh.",o:[
  {n:"Viết thư cho thủy thủ, đóng ấn công chúa",f:"le",wx:"họ biết công chúa còn đứng sau họ",lx:"thư công chúa thành chuyện triều bàn",rt:"Thủy thủ đọc thư, đứng dậy về thuyền."},
  {n:"Xin thứ sử giữ nghiêm theo luật",f:"luat",wx:"Thân Lão được giữ an",lx:"thủy thủ cho là ngươi bỏ lệ",rt:"Thứ sử cho lính đứng canh ngục."},
  {n:"Gửi bạc mua rượu thịt cho thủy thủ",f:"giu",wx:"cơn giận nguôi đi",lx:"bạc ra, người giữ kiêng ăn thịt thì lại thêm chuyện",rt:"Thủy thủ say một đêm, sáng ra im lặng."}]},
 c1:{h:"{v} gọi đó là lệ man rợ",w:"v",need:["v"],t:"{v} kể trước mặt Thái hậu: người {land} trói người vì một cơn gió, công chúa {land} chắc cũng tin thế.",o:[
  {n:"Thưa: thần thiếp xin Đại Hy cứu người ấy",wx:"Thái hậu thấy ngươi biết phải trái",lx:"{v} bảo ngươi chê lệ nước mình",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Thái hậu gật đầu: “Thế mới phải.”",rf:"Thái hậu nói: “Lệ nước nào nước ấy giữ.”"},
  {n:"Đáp: Đại Hy cũng từng tế người cho sông",wx:"{v} không đáp được",lx:"Thái hậu không vui",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Cả điện im lặng. {v} cúi đầu.",rf:"{v} nói: “Đại Hy bỏ lệ ấy từ trăm năm, còn {land} thì chưa.” Thái hậu không vui với ngươi."},
  {n:"Cười, nói chuyện khác",wx:"không thêm chuyện",lx:"lời {v} đi khắp cung",rt:"Thái hậu hỏi sang chuyện hoa cúc."}]},
 c2:{h:"Chiếc lược trong tay nải",w:"maid",t:"Thân Lão nhờ người gửi vào cung một lời: lão giữ kiêng trọn chuyến. Nhưng lính ngục tìm thấy trong tay nải của lão một chiếc lược gỗ.",o:[
  {n:"Tin lão, xin thứ sử trả lại tay nải",wx:"Thân Lão biết ngươi tin lão",lx:"nếu lão nói dối, ngươi mất lời",rt:"Lão nhắn lại: chiếc lược là của con gái lão, lão chưa từng dùng.",go:()=>pfO("luoc","thanlao")},
  {n:"Xin mang chiếc lược lên kinh xem",wx:"có vật thật để xét",lx:"thủy thủ biết có chiếc lược",rt:"Chiếc lược nằm trên án ngươi: răng còn mới, không một sợi tóc.",go:()=>pfO("luoc","ta")},
  {n:"Để thứ sử giữ chiếc lược",wx:"không dính vào",lx:"chiếc lược thành chứng chống lão",rt:"Chiếc lược được niêm trong kho nha môn.",go:()=>pfO("luoc","kho")}]},
 t1:{h:"Đại sứ khó xử",w:"emp",t:"Tá Bá Kim Thành đến gặp ngươi: nếu ông không cho xử Thân Lão, thủy thủ sẽ không chịu chèo thuyền về. Nếu ông cho xử, Đại Hy sẽ nói {land} giết người.",o:[
  {n:"Khuyên đại sứ theo luật Đại Hy",f:"luat",wx:"sứ đoàn không mang tiếng",lx:"thủy thủ giận đại sứ",rt:"Đại sứ thở dài, viết lệnh cấm thủy thủ đụng vào Thân Lão.",go:()=>pfMeet("kimthanh")},
  {n:"Khuyên đại sứ cho lão chuộc tội bằng lễ thanh tẩy",f:"le",wx:"giữ được lệ mà không đổ máu",lx:"có người không chịu",rt:"Đại sứ cho dựng giếng đá ở bến, định ngày làm lễ.",go:()=>pfMeet("kimthanh")},
  {n:"Bảo đại sứ đó là việc của ông",f:"giu",wx:"ngươi không mang tiếng gì",lx:"đại sứ thấy ngươi bỏ mặc",rt:"Đại sứ cúi chào, ra về một mình.",go:()=>pfMeet("kimthanh")}]},
 x1:{h:"Phán xử ở Minh Châu",w:"emp",t:"Thứ sử Minh Châu tâu: phải quyết trong mười ngày, kẻo thủy thủ làm loạn. Hoàng thượng giao việc cho ngươi hỏi ý.",o:[
  {n:"Xin xử theo luật Đại Hy: gió không phải tội người",e:["win","lose"],rt:"Chiếu xuống: Thân Lão vô tội, được thả. Thủy thủ {land} nghe đọc chiếu, không ai nói gì.",rf:"Chiếu xuống, nhưng thủy thủ không chịu. Đại sứ đành cho xích Thân Lão, gửi về {land} theo chuyến thuyền buôn.",go:(_A,ok)=>ok?pfMove("thanlao","cang"):pfMove("thanlao","tn")},
  {n:"Xin cho lão làm lễ thanh tẩy rồi về nước",e:["win2","mid"],rt:"Lễ thanh tẩy làm ở bến. Thân Lão gội đầu dưới giếng đá, rồi lên thuyền buôn về {land}, còn sống.",rf:"Lễ chưa làm được, Thân Lão vẫn ngồi trong ngục.",go:(_A,ok)=>ok?pfMove("thanlao","tn"):""},
  {n:"Để thủy thủ xử theo lệ, giữ lòng sứ đoàn",e:"mid",lx:"một người chết vì một cơn gió",rt:"Thứ sử nhắm mắt cho qua. Sáng hôm sau thủy thủ {land} chịu chèo thuyền, không ai nhắc đến Thân Lão nữa.",go:()=>pfKill("thanlao")}]}},
 E:{win:{tag:"Gió không phải tội người",w:"emp",t:"Thân Lão ở lại bến Minh Châu sửa buồm cho sứ đoàn. Người {land} trong kinh kể: công chúa đã cứu một mạng người khỏi lệ cũ."},
  win2:{tag:"Lệ cũ không đổ máu",w:"emp",t:"Thân Lão về {land}, mang theo lời ngươi gửi phụ hoàng: lệ cũ giữ được mà không cần máu."},
  mid:{tag:"Việc ở Minh Châu khép lại",t:()=>pfAlive("thanlao")?"Thân Lão vẫn ngồi ngục Minh Châu, chờ một ngày ai đó nhớ ra lão.":"Thủy thủ {land} chèo thuyền, không ai nhắc đến người giữ kiêng nữa. Ngươi thì nhớ."},
  lose:{tag:"Xích sắt trên bến",w:"v",t:"Thân Lão bị xích về {land}. {v} nói: công chúa {land} cứu người không nổi, giữ lệ cũng không xong."}}});

rdDef("pt_hai",7,{t:"Thương thuyền Tân La",w:"emp",sj:"thương chủ Tân La Kim Hựu Thành",cast(A){if(pfO("nhatky")==="namlao")pfO("nhatky","huuthanh");return rdCast(A,["v"])},
 g:"Thương chủ Tân La Kim Hựu Thành cập bến Minh Châu, xin gặp người của ngươi. Thuyền ông đi qua hòn đảo trong thư Nham Lão: đảo trống, chỉ còn xác thuyền và dấu lửa. Ông nhặt được cuốn nhật ký hải trình của thuyền thứ tư, và biết ai đã đến đảo trước ông.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thương chủ vào kinh",w:"emp",if:RDW(1),t:()=>(pfAlive("thanlao")&&pfP("thanlao","w")==="cang"?"Thân Lão còn sửa buồm ở bến, nên cả bến Minh Châu biết":"Cả bến Minh Châu biết")+" công chúa {land} giữ lời. Kim Hựu Thành tự mình lên kinh, xin vào Hồng Lư tự gặp ngươi.",o:[
  {n:"Gặp ông ở Hồng Lư tự, có quan làm chứng",f:"tra",wx:"việc gặp thương nhân có người chứng",lx:"ông nói ít trước mặt quan",rt:"Kim Hựu Thành cúi chào kiểu Tân La, đặt cuốn nhật ký lên án nhưng tay vẫn giữ.",go:()=>{pfMove("huuthanh","kinh");return pfMeet("huuthanh")}},
  {n:"Cho {maid} ra gặp riêng",f:"mua",wx:"ông nói thật hơn",lx:"phi tần gặp riêng thương nhân, dễ thành chuyện",rt:"{maid} về kể: ông muốn một giấy phép buôn ở Minh Châu.",go:()=>{pfMove("huuthanh","kinh");return pfMeet("huuthanh")}},
  {n:"Mời đại sứ cùng gặp",f:"tra",wx:"có người {land} nhận đồ của {land}",lx:"đại sứ và thương nhân có thù cũ",rt:"Đại sứ nhận ra chữ của Nham Lão trên bìa nhật ký.",go:()=>{pfMove("huuthanh","kinh");pfMeet("kimthanh");return pfMeet("huuthanh")}}]},
 s2:{h:"Thư từ Minh Châu",w:"maid",if:RDW(0),t:"Kim Hựu Thành không dám lên kinh. Ông gửi thư: ai trả giá, người ấy có cuốn nhật ký.",o:[
  {n:"Gửi thư hỏi giá",f:"mua",wx:"biết ông muốn gì",lx:"ông biết ngươi cần",rt:"Ông trả lời: một giấy miễn thuế, hoặc bạc.",go:()=>pfMeet("huuthanh")},
  {n:"Nhờ thứ sử Minh Châu giữ thương thuyền lại",f:"tra",wx:"ông không đi được",lx:"ông thành kẻ thù",rt:"Thứ sử cho lính đứng ở mạn thuyền Tân La.",go:()=>pfMeet("huuthanh")},
  {n:"Gửi Thân Lão hoặc người {land} ở bến đến hỏi chuyện",f:"tra",wx:"người {land} nghe tận tai",lx:"thương nhân ngại người {land}",rt:()=>pfAlive("thanlao")&&pfP("thanlao","w")==="cang"?"Thân Lão đến thuyền Tân La, về kể: nhật ký có thật, chữ Nham Lão.":"Một thủy thủ {land} đến thuyền Tân La, về kể: nhật ký có thật, chữ Nham Lão.",go:()=>pfMeet("huuthanh")}]},
 c1:{h:"Giá của cuốn nhật ký",w:"emp",t:"Kim Hựu Thành nói thẳng: cuốn nhật ký ghi từng ngày thuyền thứ tư trôi, rương nào chở ở khoang nào. Ông không cho không.",o:[
  {n:"Trả bằng bạc",wx:"nhật ký về tay ngươi",lx:"bạc ra",rt:"Cuốn nhật ký về tay ngươi, còn mùi muối.",go:()=>pfO("nhatky","ta")},
  {n:"Hứa xin cho ông một giấy miễn thuế",wx:"không mất bạc",lx:"mang ơn một thương nhân",rt:"Ông trao nhật ký, cười: “Lời công chúa {land} đáng giá hơn bạc.”",go:()=>{pfO("giaythue","hua");return pfO("nhatky","ta")}},
  {n:"Xin Thị bạc ty thu cuốn nhật ký theo luật",wx:"đúng luật, không tốn gì",lx:"thương nhân giận, nhật ký vào kho",rt:"Thị bạc ty thu nhật ký, niêm vào kho. Ngươi phải xin mới được đọc.",rf:"Thị bạc ty nói nhật ký không phải hàng buôn, không thu.",go:(_A,ok)=>ok?pfO("nhatky","kho"):""}]},
 c2:{h:"Người của {v} ở Thị bạc ty",w:"v",need:["v"],t:"Biểu huynh của {v} làm việc ở Thị bạc ty Minh Châu. Y đòi khám cả thuyền Tân La, nói thương nhân giấu đồ cống của {land}.",o:[
  {n:"Xin cho khám, có người của ngươi đứng xem",wx:"khám công bằng",lx:"thương nhân mất mặt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Khám ba ngày, không thấy đồ cống nào.",rf:"Khám ba ngày, biểu huynh của {v} lấy đi hai hòm hàng."},
  {n:"Tâu rằng biểu huynh {v} gây khó cho khách",wx:"chặn tay người của {v}",lx:"{v} biết ngươi chặn",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Biểu huynh {v} bị gọi về, mặt tối sầm.",rf:"Thị bạc ty tâu lại: khám thuyền là phép. Biểu huynh {v} ở lại, khám tiếp."},
  {n:"Gửi thư bảo thương nhân nhường y một hòm hàng",wx:"yên chuyện",lx:"thương nhân mất của",rt:"Biểu huynh {v} nhận hòm hàng, không khám nữa."}]},
 t1:{h:"Ai đến đảo trước",w:"emp",t:()=>(PFLOG()?"Trang cuối nhật ký ghi bằng nét run":pfO("nhatky")==="kho"?"Ngươi xin Thị bạc ty cho đọc nhật ký. Trang cuối ghi bằng nét run":"Kim Hựu Thành mở nhật ký, đọc cho người của ngươi nghe trang cuối, nét chữ run")+": “Thuyền buồm đen. Họ hỏi rương nào có ngọc.” Kim Hựu Thành nói: đó là thuyền giặc biển Đông Hải của Ô Cửu.",o:[
  {n:"Tâu ngay lên Hoàng thượng",f:"tra",wx:"triều đình biết kẻ bắt người",lx:"triều đình biết rương có ngọc",rt:"Hoàng thượng sai thủy sư dò tìm thuyền buồm đen."},
  {n:"Báo đại sứ, bàn riêng việc chuộc người",f:"mua",wx:"người {land} lo người {land}",lx:"Đại Hy chưa biết",rt:"Đại sứ nắm tay lại: “Ngọc thì chuộc được, người thì không thể thay.”",go:()=>pfMeet("kimthanh")},
  {n:"Giữ trang ấy, chưa nói với ai",if:PFLOG/* r2 6c: only the holder of the log can keep its page */,f:"mua",wx:"có một con bài trong tay",lx:"người trên đảo phải chờ",rt:"Trang nhật ký được ép trong sách kinh của ngươi.",go:()=>pfO("trang","ta")}]},
 x1:{h:"Lời của thương nhân",w:"emp",t:"Kim Hựu Thành biết bến của Ô Cửu. Ông xin dẫn đường, đổi lấy một điều: thương thuyền Tân La được lập thương quán ở Minh Châu.",o:[
  {n:"Tâu xin cho Tân La lập thương quán ở Minh Châu",e:["win","lose"],rt:"Hoàng thượng chuẩn: thương quán Tân La mở ở bến Minh Châu. Kim Hựu Thành quỳ lạy, hẹn ngày dẫn đường.",rf:"Hộ bộ tâu: một phi tần đi xin quyền buôn cho thương nhân ngoại bang. Hoàng thượng gạt đi.",go:(_A,ok)=>ok?pfO("giaythue","huuthanh"):""},
  {n:"Hứa trả bạc khi người về đến bờ",e:["win","mid"],rt:"Kim Hựu Thành nhận lời: người về thì bạc về.",rf:"Ông nhận lời, nhưng không vội."},
  {n:"Cảm ơn ông, để thủy sư tự tìm",e:"mid",lx:"thủy sư không biết đường",rt:"Kim Hựu Thành cúi chào, về thuyền.",go:()=>pfMove("huuthanh","cang")}]}},
 E:{win:{tag:"Người dẫn đường",w:"emp",t:()=>"Thương thuyền Tân La và thuyền thủy sư Đại Hy cùng chờ một con nước."+(pfAlive("huuthanh")?" Kim Hựu Thành đứng ở mũi thuyền, chỉ về phía đảo đá.":"")},
  mid:{tag:"Biết tên kẻ bắt người",t:"Ngươi biết tên Ô Cửu. Biết tên thì chưa đủ; biển còn rộng."},
  lose:{tag:"Thương nhân ngoại bang",w:"v",t:()=>"{v} kể: công chúa {land} cấu kết với thương nhân Tân La, đòi quyền buôn cho người ngoài."+(pfAlive("huuthanh")?" Kim Hựu Thành về bến Minh Châu, không ai tiễn.":""),go:()=>pfMove("huuthanh","cang")}}});
const PFFREE=()=>{for(const id of ["tieungoc","namlao"])if(pfAlive(id)&&pfP(id,"w")==="hb")pfMove(id,"cang");return""};/* .8: the held people come ashore */
rdDef("pt_hai",8,{t:"Giặc biển Đông Hải",w:"emp",sj:"thuyền buồm đen của Ô Cửu",cast(A){if(pfO("ruong")==="namlao")pfO("ruong","ocuu");if(pfO("nhatky")==="namlao")pfO("nhatky","ocuu");return rdCast(A,["v"])},
 g:"Thuyền buồm đen của Ô Cửu neo sau một dãy đảo đá ngoài cửa Minh Châu. Hắn gửi vào bờ một mảnh áo của Tiểu Ngọc và một lời: rương cống và mười bảy mạng người, đổi bằng ngọc trai và một bến không ai đuổi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kim Hựu Thành dẫn đường",w:"emp",if:()=>RDW(1)()&&pfAlive("huuthanh"),t:"Kim Hựu Thành vẽ cho thủy sư một tấm hải đồ: lối vào bến giặc chỉ đi được lúc nước ròng.",o:[
  {n:"Xin giữ hải đồ trong cung ngươi",f:"danh",wx:"có đường vào bến giặc",lx:"thủy sư không vui vì phải xin phi tần",rt:"Tấm hải đồ nằm trong hộp gỗ của ngươi.",go:()=>{pfMeet("huuthanh");return pfO("haido","ta")}},
  {n:"Trao hải đồ cho thủy sư",f:"danh",wx:"thủy sư biết đường",lx:"ngươi không còn giữ gì",rt:"Thủy sư nhận hải đồ, cảm ơn thương nhân.",go:()=>{pfMeet("huuthanh");return pfO("haido","kho")}},
  {n:"Nhờ thương nhân đưa thư cho Ô Cửu trước",f:"chuoc",wx:"giặc biết có người muốn nói",lx:"giặc biết người ta đang tìm",rt:"Thương thuyền Tân La treo cờ trắng, chở thư ra đảo.",go:()=>pfMeet("huuthanh")}]},
 s2:{h:"Lời nhắn bằng mảnh áo",w:"maid",if:()=>RDW(0)()||!pfAlive("huuthanh"),t:"{maid} run tay đưa mảnh áo: vải gai nhuộm chàm, mép áo thêu hình sóng, đúng tay Tiểu Ngọc thêu.",o:[
  {n:"Giữ mảnh áo, viết thư hỏi giá",f:"chuoc",wx:"giặc biết ngươi muốn chuộc",lx:"giặc biết ngươi sợ",rt:"Thư hỏi giá gửi theo thuyền chài ra đảo.",go:()=>pfO("manhao","ta")},
  {n:"Mang mảnh áo lên Hoàng thượng",f:"danh",wx:"ngài thấy người {land} bị bắt thật",lx:"ngài muốn đánh, có thể hại con tin",rt:"Hoàng thượng cầm mảnh áo, sai thủy sư sẵn thuyền.",go:()=>pfO("manhao","vua")},
  {n:"Đưa mảnh áo cho đại sứ",f:"chuoc",wx:"người {land} cùng quyết",lx:"đại sứ không có binh",rt:"Đại sứ cầm mảnh áo, nói: “Người thêu nó là người bế người.”",go:()=>{pfMeet("kimthanh");return pfO("manhao","kimthanh")}}]},
 c1:{h:"Ngọc trai hồi môn",w:"emp",t:"Giá chuộc là một hộp ngọc trai. Trong hồi môn của ngươi có đúng một hộp như thế, mẫu hậu gửi theo để làm của riêng.",o:[
  {n:"Đem hộp ngọc hồi môn ra",wx:"có ngay giá chuộc",lx:"mất của riêng của mẫu hậu",rt:"Hộp ngọc được gói trong lụa, chờ ngày mang ra đảo.",go:()=>pfO("ngoctrai","ta")},
  {n:"Xin Nội vụ phủ cho mượn ngọc của kho",wx:"giữ được của riêng",lx:"mang nợ Nội vụ phủ",rt:"Nội vụ phủ cho mượn, ghi vào sổ nợ của cung ngươi.",rf:"Nội vụ phủ nói ngọc của kho không để chuộc giặc.",go:(_A,ok)=>ok?pfO("ngoctrai","kho"):""},
  {n:"Xin đại sứ bán sách của sứ đoàn lấy ngọc",wx:"người {land} trả cho người {land}",lx:"sứ đoàn về nước tay không",rt:"Đại sứ bán ba rương sách vừa mua, đổi lấy ngọc.",go:()=>{pfMeet("kimthanh");return pfO("ngoctrai","kimthanh")}}]},
 c2:{h:"{v} nói chuộc giặc là nuôi giặc",w:"v",need:["v"],t:"{v} tâu với Thái hậu: chuộc người bằng ngọc thì năm sau giặc biển lại bắt thuyền Đại Hy.",o:[
  {n:"Thưa: thần thiếp chuộc người, Đại Hy diệt giặc sau",wx:"Thái hậu thấy ngươi nghĩ xa",lx:"{v} bảo ngươi hứa suông",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Thái hậu gật đầu.",rf:"Thái hậu nói: “Hứa thì phải làm.”"},
  {n:"Hỏi lại {v}: nếu người bị bắt là em gái nàng thì sao",wx:"{v} câm lặng",lx:"{v} thù ngươi",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Cả điện nhìn {v}. Nàng ta không đáp.",rf:"{v} đáp: “Em gái thiếp không bao giờ để giặc bắt.” Thái hậu gật đầu với nàng."},
  {n:"Im lặng, cúi đầu nghe",wx:"không thêm chuyện",lx:"Thái hậu nghiêng về {v}",rt:"Thái hậu bảo: việc biển để Hoàng thượng quyết."}]},
 t1:{h:"Thư trả lời Ô Cửu",w:"emp",t:"Ô Cửu đòi trả lời trong ba ngày. Ngươi cầm bút.",o:[
  {n:"Viết: ngọc sẽ đến, người phải lành",f:"chuoc",wx:"giặc giữ người cho tử tế",lx:"giặc biết ngươi sẽ trả",rt:"Thư đi. Thuyền chài về kể: người trên đảo được ăn cơm."},
  {n:"Viết: thủy sư Đại Hy đã ra khơi",f:"danh",wx:"giặc sợ",lx:"giặc có thể giết người rồi chạy",rt:"Thư đi. Thuyền buồm đen dời neo vào sâu trong dãy đảo.",rf:"Thư đi. Ô Cửu gửi lại một mảnh áo nữa."},
  {n:"Viết: xin ba ngày nữa để gom ngọc",f:"chuoc",wx:"có thêm thời gian",lx:"giặc nghi",rt:"Ô Cửu cho thêm ba ngày."}]},
 x1:{h:"Đêm ở dãy đảo đá",w:"emp",t:"Đêm nước ròng. Thuyền thủy sư nằm chờ sau mỏm đá, thương thuyền Tân La treo đèn. Hoàng thượng để ngươi quyết lời cuối.",o:[
  {n:"Xin thủy sư đánh đêm, cứu người",e:["win","lose"],rt:()=>"Thủy sư áp mạn thuyền buồm đen lúc canh ba. Ô Cửu bị bắt sống, "+(pfO("ruong")==="ocuu"?"rương cống được khiêng về, ":"")+"người {land} lên thuyền Đại Hy, còn đủ.",rf:"Thủy sư áp mạn, giặc phóng lửa. Rương cống chìm theo thuyền buồm đen. Người ta vớt được Nham Lão; Tiểu Ngọc thì không.",go:(_A,ok)=>{if(ok){pfMove("ocuu","nguc");pfO("ruong","kho");if(pfO("nhatky")==="ocuu")pfO("nhatky","ta");return PFFREE()}pfMove("ocuu","hb");pfO("ruong","bien");if(pfO("nhatky")==="ocuu")pfO("nhatky","bien");pfKill("tieungoc");return PFFREE()}},
  {n:"Mang ngọc đến chuộc, thương thuyền Tân La làm trung gian",if:()=>["ta","kho","kimthanh"].includes(pfO("ngoctrai"))/* r2 6c: only with the pearls in hand */,e:["win2","mid"],rt:()=>`${PFNGOCN()[0].toUpperCase()+PFNGOCN().slice(1)} đổi lấy người và rương. Ô Cửu giữ lời, nhổ neo đi về phía đông.`,rf:()=>`${PFNGOCN()[0].toUpperCase()+PFNGOCN().slice(1)} đổi được người. Ô Cửu giữ lại rương cống, cười: “Lần sau.”`,go:(_A,ok)=>{RD_FL("pt.f.ngoc",pfO("ngoctrai"));pfO("ngoctrai","ocuu");pfMove("ocuu","hb");if(ok){pfO("ruong","kho");if(pfO("nhatky")==="ocuu")pfO("nhatky","ta")}return PFFREE()}},
  {n:"Hứa cho Ô Cửu một bến ở Minh Châu, đổi lấy tất cả",e:"mid",lx:"giặc biển có bến trên đất Đại Hy",rt:"Ô Cửu trả người, trả rương, đổi cờ đen lấy cờ thương thuyền. Từ nay hắn neo ở bến Minh Châu như một thương nhân.",go:()=>{pfMove("ocuu","cang");pfO("ruong","kho");if(pfO("nhatky")==="ocuu")pfO("nhatky","ta");return PFFREE()}}]}},
 E:{win:{tag:"Lửa trên đảo đá",w:"emp",t:()=>(pfP("ocuu","w")==="nguc"?"Ô Cửu nằm trong ngục Minh Châu. ":"")+"Người {land} về bờ, đủ tên. Thủy sư Đại Hy kể chuyện đêm ấy khắp các bến."},
  win2:{tag:"Ngọc đổi người",w:"emp",t:()=>pfO("ngoctrai")==="ocuu"?`Người về, rương về, ${PFNGOCN()} đi theo thuyền buồm đen. Ngươi không tiếc.`:"Người về, rương về. Ngươi không tiếc gì."},
  mid:{tag:"Người về, biển còn giữ một phần",t:()=>pfP("ocuu","w")==="cang"?"Ô Cửu neo thuyền ở bến Minh Châu. Người ta không biết nên gọi hắn là giặc hay là khách.":pfO("ruong")==="ocuu"?"Người về bờ. Rương cống còn nằm trong khoang thuyền buồm đen, ở đâu đó phía đông.":"Người về bờ. Biển còn giữ một phần."},
  lose:{tag:"Mảnh áo trên sóng",w:"v",t:()=>"Thuyền buồm đen cháy, Ô Cửu thoát."+(pfAlive("tieungoc")?"":" Tiểu Ngọc không về.")+" {v} nói: công chúa {land} gọi binh mà không cứu nổi người của mình."}}});

rdDef("pt_hai",9,{t:"Bến Minh Châu",w:"emp",sj:"những người sống sót của thuyền thứ tư",cast(A){return rdCast(A,["v"])},
 g:()=>"Người của thuyền thứ tư lên bờ Minh Châu, ít hơn tên trong danh sách. "+(pfO("ruong")==="kho"?"Rương cống được khiêng vào nha môn; nhìn kỹ, dải niêm phong đỏ có một chỗ bị cắt rồi dán lại.":"Họ không mang theo rương cống nào; ngươi cho mở lại các rương cống của ba thuyền đã đến, gửi ở Thị bạc ty từ hôm cập bến."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tiểu Ngọc lên bờ",w:"maid",if:()=>pfAlive("tieungoc"),t:"Tiểu Ngọc gầy rộc, tóc bạc thêm. Bà nhờ người viết một dòng gửi lên kinh: “Công chúa của già có được ăn no không?”",o:[
  {n:"Xin cho Tiểu Ngọc lên kinh ở cạnh ngươi",f:"dua",wx:"có người thân bên mình",lx:"Nội vụ phủ không ưa người ngoài vào cung",rt:"Nội vụ phủ chuẩn cho Tiểu Ngọc vào hầu, ghi tên là nhũ mẫu công chúa.",rf:"Nội vụ phủ nói: phải chờ xét.",go:(_A,ok)=>ok?pfMove("tieungoc","kinh"):""},
  {n:"Gửi bạc và thuốc cho bà dưỡng sức ở Minh Châu",f:"giu",wx:"bà được nghỉ",lx:"bạc ra, xa mặt",rt:"Tiểu Ngọc ở nhà trọ bến Minh Châu, mỗi tuần có người mang thuốc."},
  {n:"Viết thư tay bằng chữ {land} gửi bà",f:"giu",wx:"bà biết ngươi còn nhớ tiếng mẹ đẻ",lx:"người Đại Hy hỏi ngươi viết gì",rt:"Tiểu Ngọc giữ lá thư trong vạt áo."}]},
 s2:{h:"Nham Lão kể lại",w:"maid",if:()=>!pfAlive("tieungoc"),t:"Nham Lão quỳ trước cửa nha môn Minh Châu: lão lái thuyền mà không giữ được người bế công chúa. Lão xin kể lại đêm cuối của Tiểu Ngọc.",o:[
  {n:"Nghe lão kể, ghi lại từng lời",f:"giu",wx:"ngươi biết bà chết thế nào",lx:"nỗi đau mở lại",rt:"Bà nhảy xuống nước để giữ hộp thư của mẫu hậu gửi ngươi. Hộp thư chìm theo bà.",go:()=>{pfO("hopthu","bien");return pfAlive("namlao")?pfMeet("namlao"):""}/* r2 6c: the letter box is booked lost at sea */},
  {n:"Lập bàn thờ Tiểu Ngọc ở bến",f:"dua",wx:"thủy thủ {land} khóc theo ngươi",lx:"Thái hậu không ưa lễ lạ",rt:"Bàn thờ nhỏ đặt ở bến, quay mặt về phía đông."},
  {n:"Bảo Nham Lão đứng dậy, lão không có tội",f:"dua",wx:"lão nhớ ơn ngươi",lx:"thủy thủ cho là ngươi tha dễ quá",rt:"Nham Lão đứng dậy, không nói được gì.",go:()=>pfAlive("namlao")?pfMeet("namlao"):""}]},
 c1:{h:"Niêm phong bị cắt",w:"emp",t:()=>(pfO("ruong")==="kho"?"Dải niêm phong của rương cống thuyền thứ tư":"Dải niêm phong của một rương cống ba thuyền đầu")+" bị cắt ngọt rồi dán lại bằng hồ gạo, mà giặc biển không dùng hồ gạo. Sổ nha môn ghi: rương đã qua tay Thị bạc ty một đêm.",o:[
  {n:"Xin mang dải niêm phong lên kinh",wx:"có chứng trong tay",lx:"Thị bạc ty biết ngươi để ý",rt:"Dải niêm phong được ép trong hộp gỗ của ngươi.",go:()=>pfO("niem","ta")},
  {n:"Xin thứ sử ghi tên người đã mở rương",wx:"biết người mở",lx:"thứ sử ngại đụng Thị bạc ty",rt:"Thứ sử ghi tên ba người trực đêm ấy.",rf:"Thứ sử nói sổ trực đã mất trang.",go:()=>pfO("niem","kho")},
  {n:"Bỏ qua, miễn rương về kinh",wx:"rương đi nhanh",lx:"chứng có thể mất",rt:"Rương được dán niêm mới, lên đường.",go:()=>pfO("niem","chay")}]},
 c2:{h:"Biểu huynh {v} xin giữ rương",w:"v",need:["v"],t:"Biểu huynh {v} ở Thị bạc ty xin giữ rương thêm mười ngày để đối sổ. {v} gửi lời: đó là phép.",o:[
  {n:"Đồng ý, cử người đứng canh",wx:"đúng phép, có người canh",lx:"mười ngày chậm",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Người của ngươi ngồi cạnh rương mười đêm.",rf:"Người của ngươi bị đuổi ra ngoài đêm thứ ba."},
  {n:"Tâu xin rương đi thẳng về Hồng Lư tự",wx:"rương thoát tay Thị bạc ty",lx:"{v} biết ngươi nghi nhà nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Chiếu xuống: rương về Hồng Lư tự.",rf:"Lễ bộ tâu: đối sổ là phép của Thị bạc ty. Rương ở lại thêm mười ngày."},
  {n:"Gửi lễ vật cho biểu huynh {v}",wx:"yên chuyện",lx:"bạc ra, người ta biết ngươi lót tay",rt:"Biểu huynh {v} cười, cho rương đi."}]},
 t1:{h:"Ai hộ tống rương về kinh",w:"emp",t:()=>(pfO("ruong")==="kho"?"Rương cống của thuyền thứ tư":"Các rương cống ba thuyền đầu")+" phải đi mười ngày đường bộ lên kinh. Ai đi theo rương, người ấy chịu trách nhiệm nếu thiếu.",o:[
  {n:"Xin đại sứ tự đi theo rương",f:"giu",wx:"người {land} giữ đồ {land}",lx:"nếu thiếu, đại sứ mang tội",rt:"Đại sứ cưỡi ngựa đi sát xe rương.",go:()=>{pfMeet("kimthanh");return pfO("ruong",pfO("ruong")==="kho"?"kimthanh":pfO("ruong"))}},
  {n:"Để Hồng Lư tự hộ tống theo phép",f:"dua",wx:"đúng phép Đại Hy",lx:"không có người của ngươi",rt:"Quan Hồng Lư tự niêm lại rương, ký tên.",go:()=>pfO("ruong",pfO("ruong")==="kho"?"hl":pfO("ruong"))},
  {n:"Gửi người sống sót đi cùng rương",f:"dua",wx:"có nhân chứng đi theo",lx:"người bệnh đi đường xa",rt:"Thủy thủ {land} đi bộ theo xe rương, chân còn quấn vải."}]},
 x1:{h:"Đưa người sống sót về kinh",w:"emp",t:"Hoàng thượng hỏi: có nên cho người sống sót vào chầu, kể chuyện biển trước triều không. Có người nói làm thế là làm nhục thủy sư; có người nói làm thế thì cả triều tin {land}.",o:[
  {n:"Xin cho họ vào chầu, kể từ đầu",e:["win","lose"],rt:()=>`Người sống sót quỳ giữa điện, kể từng ngày trôi trên biển. ${PFNGOC()} kể đến đoạn giặc biển thì cả điện lặng đi.`,rf:"Người sống sót run quá, không kể nổi. Thủy sư tâu: người {land} nói không rõ."},
  {n:"Xin cho họ ở lại Minh Châu chữa bệnh, chờ thuyền về",e:["win","mid"],rt:"Hoàng thượng chuẩn: người sống sót ở nhà trọ quan, ăn lương Minh Châu đến gió mùa.",rf:"Hoàng thượng chuẩn, nhưng lương Minh Châu cấp thiếu."},
  {n:"Để Hồng Lư tự lo theo lệ khách",e:"mid",lx:"không ai nghe họ kể",rt:"Hồng Lư tự ghi tên, cấp áo, xếp chỗ ở."}]}},
 E:{win:{tag:"Người của biển về bờ",w:"emp",t:"Triều Đại Hy biết thuyền thứ tư đã trôi thế nào. Không ai còn nói {land} gửi nửa phần cống."},
  mid:{tag:"Ở lại bến chờ gió",t:"Người sống sót ở lại bến Minh Châu. Mỗi chiều họ ra bến nhìn về phía đông."},
  lose:{tag:"Lời kể không rõ",w:"v",t:"Thủy sư tâu: người {land} kể lộn xộn. {v} nói: người lạc biển thì kể gì chẳng được."}}});
rdDef("pt_hai",10,{t:"Kiểm cống",w:"emp",sj:"rương cống của {land}",cast(A){return rdCast(A,["v"])},
 g:()=>(pfO("ruong")==="bien"||pfO("ruong")==="ocuu"?"Rương cống của thuyền thứ tư không về. ":"")+"Hồng Lư tự đối chiếu cống phẩm với danh sách sứ đoàn trước mặt Hộ bộ và các phi tần. Lụa mốc nửa phần, hộp ngọc trai trống một ngăn. "+(pfO("danhsach")==="ta"?"{v} nói: rương niêm ở {land} mà thiếu ở Đại Hy, chỉ có người từng cầm danh sách mới biết thiếu chỗ nào.":"{v} nói: rương niêm ở {land} mà thiếu ở Đại Hy, chắc người {land} đã mở trên biển."),
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Nhật ký trong tay ngươi",w:"emp",if:PFLOG,t:"Cuốn nhật ký hải trình nằm trong hộp gỗ của ngươi. Trang nào cũng có chữ Nham Lão: ngày nào nước vào khoang, rương nào bị ướt.",o:[
  {n:"Dâng nhật ký lên Hồng Lư tự",f:"chung",wx:"lụa mốc có lời giải",lx:"nhật ký ra khỏi tay ngươi",rt:"Tự khanh đọc đến trang mười một: “Khoang hai ngập ba ngày.” Lụa mốc là vì thế.",go:()=>pfO("nhatky","hl")},
  {n:"Đọc to từng trang trước mặt mọi người",f:"chung",wx:"cả điện nghe",lx:"đọc lâu, Hộ bộ sốt ruột",rt:"Ngươi đọc đến khi Hộ bộ giơ tay: “Đủ rồi.”"},
  {n:"Chép trang về rương ngọc, giữ bản gốc",f:"nhuong",wx:"vẫn giữ được bản gốc",lx:"bản chép kém tin",rt:"Bản chép được đặt lên án Tự khanh."}]},
 s2:{h:"Không có nhật ký",w:"emp",if:()=>!PFLOG(),t:"Cuốn nhật ký không ở trong tay ngươi. Ngươi chỉ còn lời người.",o:[
  {n:"Xin gọi Kim Hựu Thành làm chứng",f:"chung",wx:"một người ngoài nói giúp",lx:"thương nhân nói thì kém tin",rt:()=>pfAlive("huuthanh")&&["kinh","cang"].includes(pfP("huuthanh","w"))?"Kim Hựu Thành kể: khi ông đến đảo, giặc biển đã khiêng rương đi; trong khoang chỉ còn vết rương nằm, nước chưa vào chỗ ấy.":"Kim Hựu Thành đã đi biển, chỉ gửi được một tờ khai.",go:()=>pfAlive("huuthanh")?pfMeet("huuthanh"):""},
  {n:"Xin gọi Nham Lão làm chứng",f:"chung",wx:"người lái thuyền nói",lx:"lão là người {land}",rt:()=>pfAlive("namlao")?"Nham Lão kể từng ngày nước vào khoang.":"Nham Lão không còn. Chỉ có tên lão trong danh sách.",go:()=>pfAlive("namlao")?pfMeet("namlao"):""},
  {n:"Nhận: thần thiếp không có chứng, xin xét theo danh sách",f:"nhuong",/* pt6c: "nhận" = she admits, no object changes hands */wx:"thật thà",lx:"không có gì đỡ",rt:"Tự khanh gật đầu, đọc tiếp danh sách."}]},
 c1:{h:"Chiếc trâm ngọc trai",w:"v",need:["v"],t:"{v} dâng một chiếc trâm ngọc trai, nói cung nữ tìm thấy dưới gối trong cung ngươi: ngọc đúng loại trong rương cống.",o:[
  {n:"Xin gọi thợ bạc xem ngọc từ đâu",wx:"ngọc có nguồn gốc của nó",lx:"thợ bạc có thể nói sai",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return ok?pfO("tram","kho"):pfO("tram","v")},rt:"Thợ bạc nói: ngọc này mài kiểu Đại Hy, không phải ngọc {land}.",rf:"Thợ bạc ngập ngừng: ngọc giống ngọc {land}."},
  {n:"Hỏi lại: cung nữ nào tìm thấy, vào cung {tx} lúc nào",wx:"lật lại câu hỏi về phía {v}",lx:"{v} giận",go:(A,ok,G)=>{rdOan(A,"v",G[0]);return ok?pfO("tram","kho"):pfO("tram","v")},rt:"Cung nữ ấy lắp bắp, không nhớ giờ.",rf:"Cung nữ ấy khai trơn tru từng giờ, như đã thuộc lòng. {v} giữ lại chiếc trâm làm chứng."},
  {n:"Nhận đó là ngọc hồi môn của mình",wx:"không cãi nhau giữa điện",lx:"người ta tin {v} một nửa",go:()=>pfO("tram","ta"),rt:"Ngươi cài trâm lên tóc, nói: “Mẫu hậu cho.”"}]},
 c2:{h:"Hộ bộ đòi bồi",w:"emp",t:"Hộ bộ tâu: thiếu thì phải bồi. Nếu {land} không bồi, sổ cống ghi {land} lỗi lễ.",o:[
  {n:"Bỏ bạc riêng bồi phần thiếu",wx:"sổ cống sạch",lx:"bạc ra",rt:"Hộ bộ nhận bạc, xóa dòng thiếu."},
  {n:"Xin chờ thuyền năm sau bồi",wx:"không mất bạc",lx:"sổ ghi nợ một năm",rt:"Hộ bộ ghi: nợ đến gió mùa năm sau."},
  {n:"Tâu: biển làm mất, không ai bồi biển",wx:"giữ thể diện {land}",lx:"Hộ bộ không vui",rt:"Hoàng thượng cười: “Nàng nói phải.”",rf:"Hộ bộ tâu thêm hai lần."}]},
 t1:{h:"Ba người trực đêm ấy",w:"emp",t:"Tên ba người trực ở Thị bạc ty đêm rương qua tay: hai lính, và biểu huynh của {v}.",o:[
  {n:"Trình dải niêm phong, xin tra biểu huynh {v}",f:"chung",wx:"đổi người bị nghi",lx:"đụng đến nhà {v}",rt:()=>pfO("niem")==="ta"?"Dải niêm phong cắt ngọt, hồ gạo còn trắng. Hộ bộ cho gọi biểu huynh {v}.":"Ngươi không còn dải niêm phong; Hộ bộ chỉ ghi lời ngươi."},
  {n:"Gọi riêng hai lính trực hỏi chuyện",f:"chung",wx:"có người nói thật",lx:"lính sợ, khai nửa chừng",rt:"Một tên lính khai: đêm ấy có người mang kéo vào kho."},
  {n:"Không đụng đến nhà {v}",f:"nhuong",wx:"không thêm thù",lx:"kẻ cắt niêm thoát",rt:"Tên biểu huynh {v} không được ai nhắc."}]},
 x1:{h:"Trước án Hồng Lư tự",w:"emp",t:"Tự khanh hỏi lời cuối: phần thiếu là do biển, do người {land}, hay do người Đại Hy.",o:[
  {n:"Trình đủ chứng, xin tra người cắt niêm",e:["win","lose"],rt:"Biểu huynh {v} bị đánh hai mươi trượng, phải trả ngọc. Sổ cống ghi: {land} cống đủ.",rf:()=>"Chứng không đủ. Tự khanh phán: "+(pfO("danhsach")==="ta"?"người giữ danh sách phải chịu.":"công chúa đứng ra kiện thì công chúa phải chịu.")+" Ngươi bị cấm túc.",go:(_A,ok)=>ok?"":pfConfine("hai10")},
  {n:"Nhận phần thiếu, xin tự bù, không truy ai",e:["win2","mid"],rt:()=>(pfO("hoimon")==="kho"?"Hồi môn đã vào kho từ trước; bổng lộc của cung ngươi bù đủ.":"Hồi môn của ngươi bù đủ.")+" Hoàng thượng khen ngươi biết giữ hòa khí.",rf:()=>(pfO("hoimon")==="kho"?"Bổng lộc của cung ngươi":"Hồi môn")+" bù được nửa. Sổ còn ghi nợ.",go:()=>pfO("hoimon")==="kho"?"":pfO("hoimon","kho")/* r2 6c: the dowry is spent once (.4 x1 may have spent it) */},
  {n:"Xin Hoàng thượng tự xét",e:"mid",lx:"không ai được rửa tiếng",rt:"Hoàng thượng phê: việc cống phẩm khép lại, không truy."}]}},
 E:{win:{tag:"Niêm phong biết nói",w:"emp",t:"Cả triều biết cống phẩm đã bị mở ở đâu. {v} không dự yến ba tháng."},
  win2:{tag:"Bù cống, giữ hòa khí",w:"emp",t:"Sổ cống sạch. Không ai mất mặt, trừ túi riêng của ngươi."},
  mid:{tag:"Sổ cống khép lại",t:"Việc cống khép lại, không ai bị truy. Người cắt niêm vẫn ở Thị bạc ty."},
  lose:{tag:"Cấm túc vì rương cống",w:"v",t:()=>pfO("danhsach")==="ta"?"Ngươi bị cấm túc. {v} kể: công chúa {land} giữ danh sách mà để mất ngọc.":"Ngươi bị cấm túc. {v} kể: công chúa {land} kiện người Đại Hy mà không có chứng."}}});

rdDef("pt_hai",11,{t:"Danh sách sứ đoàn",w:"emp",sj:"danh sách sứ đoàn về nước",cast(A){if(!pfO("danhsach")||pfO("danhsach")==="kimthanh")pfO("danhsach","ta");return rdCast(A,["v"])},
 g:()=>"Gió mùa đã đổi. Sứ đoàn sắp về {land}. "+(pfO("danhsach")==="ta"?"Bản danh sách sứ đoàn nằm trên án ngươi; Tá Bá Kim Thành xin ngươi ghi lần cuối":"Tá Bá Kim Thành xin ngươi ghi lần cuối bản danh sách")+": người sống ghi mực đen, người chết ghi mực son. Tên nào ghi màu gì, Quốc chủ {land} sẽ đọc.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tiểu Ngọc muốn gì",w:"maid",if:()=>pfAlive("tieungoc"),t:()=>`Tiểu Ngọc ${pfP("tieungoc","w")==="kinh"?"đứng hầu sau lưng ngươi":"gửi thư từ bến Minh Châu"}: bà già rồi, muốn chết ở quê, nhưng không muốn bỏ ngươi.`,o:[
  {n:"Giữ bà lại bên mình",f:"that",wx:"có người thân đến cuối đời",lx:"bà nhớ quê",rt:"Tiểu Ngọc ở lại. Bà dạy {maid} nấu {canh}.",go:()=>pfMove("tieungoc","kinh")},
  {n:"Cho bà về {land} theo thuyền",f:"an",wx:"bà được về quê",lx:"ngươi một mình",rt:"Tiểu Ngọc lên thuyền, ôm ngươi một lần cuối.",go:()=>pfMove("tieungoc","tn")},
  {n:"Để bà tự chọn",f:"that",wx:"bà biết ngươi tôn trọng bà",lx:"bà khó nghĩ",rt:"Tiểu Ngọc chọn ở lại.",go:()=>pfMove("tieungoc","kinh")}]},
 s2:{h:"Mực son",w:"maid",if:()=>!pfAlive("tieungoc"),t:"Trong danh sách, tên Tiểu Ngọc chờ được ghi. Đại sứ hỏi ngươi ghi bằng mực gì.",o:[
  {n:"Tự tay ghi tên bà bằng mực son",f:"that",wx:"{quan} biết bà chết vì ai",lx:"tay ngươi run",rt:"Ngươi ghi tên bà, thêm một dòng: chết vì giữ thư của mẫu hậu."},
  {n:"Ghi bà là ‘ở lại hầu công chúa’",f:"an",wx:"mẫu hậu không đau lòng",lx:"một lời nói dối đi qua biển",rt:"Đại sứ nhìn ngươi, rồi ghi theo."},
  {n:"Gửi kèm một lá thư riêng cho mẫu hậu",f:"that",wx:"mẹ biết từ chính con",lx:"thư đi lâu",rt:"Lá thư gói trong giấy dầu, đặt trên cùng rương."}]},
 c1:{h:"Thân Lão xin về",w:"emp",if:()=>pfAlive("thanlao")&&pfP("thanlao","w")==="cang",t:"Thân Lão nhắn từ Minh Châu: lão xin được giữ kiêng cho thuyền về. Thủy thủ còn ngại.",o:[
  {n:"Viết thư bảo thủy thủ nhận lão",wx:"lão được giữ nghề",lx:"thủy thủ còn ngại",rt:"Thủy thủ nhận Thân Lão. Lão cạo đầu, ngồi ở mũi thuyền.",go:()=>pfMove("thanlao","tn")},
  {n:"Cho lão ở lại Minh Châu sửa buồm",wx:"lão yên thân",lx:"lão buồn vì không được về",rt:"Thân Lão ở lại bến, vá buồm cho thuyền buôn."},
  {n:"Gửi lão về như một hành khách",wx:"về mà không giữ kiêng",lx:"lão thấy mình thừa",rt:"Thân Lão lên thuyền, ngồi ở đuôi.",go:()=>pfMove("thanlao","tn")}]},
 c2:{h:"Ô Cửu trong ngục",w:"emp",if:()=>pfAlive("ocuu")&&pfP("ocuu","w")==="nguc",t:"Ô Cửu trong ngục Minh Châu xin được đưa về {land} chịu xử, vì hắn từng là thủy thủ {land} trước khi làm giặc.",o:[
  {n:"Xin Đại Hy xử hắn theo luật Đại Hy",wx:"giặc chịu tội nơi hắn gây tội",lx:"{land} thấy mất một người của mình",rt:"Ô Cửu bị xử trảm ở bến Minh Châu.",go:()=>pfKill("ocuu")},
  {n:"Xin giao hắn cho sứ đoàn đưa về {land}",wx:"{land} tự xử người của {land}",lx:"Đại Hy cho là ngươi bao che",rt:"Ô Cửu bị xích lên thuyền sứ đoàn.",go:()=>pfMove("ocuu","tn")},
  {n:"Xin tha cho hắn làm lính thủy Minh Châu",wx:"một tay lái giỏi về phe Đại Hy",lx:"người ta sợ hắn trở mặt",rt:"Ô Cửu quỳ nhận lệnh, đổi cờ đen lấy cờ Đại Hy.",go:()=>pfMove("ocuu","cang")}]},
 c3:{h:"Thư gửi mẫu hậu",w:"maid",t:"Thuyền về sẽ mang theo thư. Ngươi viết cho {mh} điều gì?",o:[
  {n:"Viết thật mọi điều đã xảy ra",wx:"mẹ hiểu con",lx:"mẹ lo",rt:"Thư dài ba tờ, chữ nhỏ."},
  {n:"Viết rằng con được yêu chiều, mọi điều yên ổn",wx:"mẹ yên lòng",lx:"một lời nói dối",rt:"Thư ngắn, chữ đẹp."},
  {n:"Gửi kèm tấm gương đồng của mẹ về",if:()=>pfO("guong")==="ta"/* r2 6c: hers since .4 */,wx:"mẹ thấy con còn giữ lời",lx:"ngươi không còn gì của mẹ",rt:"Tấm gương đồng gói trong lụa, nằm trên cùng rương thư.",go:()=>pfO("guong","tn")}]},
 t1:{h:"Ai lái thuyền về",w:"emp",t:()=>pfAlive("namlao")?"Nham Lão xin lái chiếc thuyền về, để chuộc lỗi thuyền thứ tư.":"Không còn Nham Lão. Thuyền về cần một tay lái biết đường qua Ngũ Đảo.",o:[
  {n:"Giao thuyền cho người {land} lái",f:"that",wx:"người {land} đưa người {land} về",lx:"đường biển vẫn khó",rt:()=>pfAlive("namlao")?"Nham Lão cầm lái, cười lần đầu từ ngày lên bờ.":"Một thủy thủ già nhận lái.",go:()=>pfAlive("namlao")?pfMove("namlao","tn"):""},
  {n:"Xin một tay lái Tân La dẫn đường",f:"an",wx:"người quen biển dẫn",lx:"phải trả công",rt:"Kim Hựu Thành cho một tay lái già của ông theo thuyền."},
  {n:"Xin Hoàng thượng cho hải đồ của thủy sư",f:"an",wx:"có đường biển Đại Hy",lx:"hải đồ Đại Hy ra khỏi nước",rt:()=>"Hoàng thượng cho chép một bản hải đồ của thủy sư gửi theo."+(pfO("haido")==="ta"?" Tấm hải đồ của Kim Hựu Thành vẫn nằm trong hộp gỗ của ngươi.":""),go:()=>pfO("haidodh","tn")/* r2 6c: a new copy, Kim Hựu Thành's chart (haido) is not overwritten */}]},
 x1:{h:"Đêm trước ngày thuyền đi",w:"emp",t:"Đêm cuối, đại sứ quỳ trước ngươi với bản danh sách: “Nếu {quan} thấy quá nhiều tên mực son, sứ đoàn năm sau sẽ không đi nữa. Xin công chúa quyết.”",o:[
  {n:"Ghi đủ tên người chết bằng mực son, xin Đại Hy làm lễ tế biển",e:["win","lose"],rt:"Hoàng thượng cho làm lễ tế biển ở Minh Châu. Tên từng người chết được đọc to. Đại sứ khóc.",rf:"Triều thần tâu: Đại Hy không tế người ngoại bang. Lễ không làm được.",go:()=>pfO("danhsach","kimthanh")},
  {n:"Ghi người chết là ‘ở lại Đại Hy học đạo’",e:["win2","mid"],rt:"Danh sách đi về {land} toàn mực đen. Sứ đoàn năm sau sẽ đi.",rf:"Danh sách toàn mực đen, nhưng thủy thủ biết, và thủy thủ nói.",go:()=>pfO("danhsach","kimthanh")},
  {n:"Xin Hoàng thượng cho thuyền Đại Hy hộ tống sứ đoàn",e:"mid",lx:"tốn thuyền của thủy sư",rt:"Hai thuyền thủy sư đi kèm đến Ngũ Đảo. Danh sách đi theo đại sứ, như cũ.",go:()=>pfO("danhsach","kimthanh")}]}},
 E:{win:{tag:"Người đếm tên kẻ chết đuối",w:"emp",t:"Thuyền đi. Danh sách mang tên từng người chết, và tên ngươi bên dưới, người đã đếm.",go:()=>pfMove("kimthanh","tn")},
  win2:{tag:"Danh sách toàn mực đen",w:"emp",t:"Thuyền đi. Ở {land}, {quan} đọc danh sách toàn mực đen, và gửi thêm thuyền cho năm sau.",go:()=>pfMove("kimthanh","tn")},
  mid:{tag:"Thuyền về Nan Ba",t:"Thuyền đi theo gió mùa. Ngươi đứng ở bến Minh Châu đến khi cánh buồm cuối cùng khuất.",go:()=>pfMove("kimthanh","tn")},
  lose:{tag:"Lễ không thành",w:"v",t:"Thuyền đi mà không có lễ. {v} nói: người chết của {land}, Đại Hy không có nghĩa vụ khóc.",go:(_A,G)=>{pfMove("kimthanh","tn");return e67bien(G[0])}}}});
RD97L.push(rdRare({a:"pt_hai_11",tag:"Đèn trên mặt bể",w:"emp",n:"Thả trăm ngọn đèn giấy trên biển, mỗi ngọn một tên",
 path:["Đứng cạnh đại sứ","Dâng ngay lá thư","Gửi ngay gạo và nước","Thuê thương thuyền Tân La","Xin xử theo luật Đại Hy","Tin lão","Trả bằng bạc","Tâu xin cho Tân La","Xin thủy sư đánh đêm","Mang ngọc đến chuộc","Xin cho họ vào chầu","Trình đủ chứng","Tự tay ghi tên bà","Ghi đủ tên người chết"],
 bad:["Để thủy thủ xử theo lệ","Hứa cho Ô Cửu một bến","Ghi người chết là"],x:[()=>S.duc>=RR("pt_hai_11").bar,"Đức từ "+RR("pt_hai_11").bar],
 t:"Đêm thuyền đi, ngươi xin cho thả trên biển Minh Châu những ngọn đèn giấy, mỗi ngọn viết một tên người đã ra khơi mà không về, cả người {land} lẫn thủy sư Đại Hy chết trong đêm đảo đá. Đèn trôi về phía đông theo con nước. Hoàng thượng đứng bên ngươi đến khi ngọn cuối cùng tắt, rồi sai treo trước cung ngươi một tấm biển ngự bút.",
 go:(_A,G)=>e67bien(G[0]),rw:"bienngu",ti:"Đèn trên mặt bể"}));


/* =====================================================================================================================================
   pt_su · Khiển Đường sứ — lead (E21)
   ===================================================================================================================================== */
/* .11: the embassy sails home with the monsoon (law 6b: the envoy leaves S.men; a scholar who passed the exam stays, else he sails too) */
const pfSail=()=>{pfMove("kimthanh","tn");if(pfO("hoithu")==="kimthanh")pfO("hoithu","tn");if(pfO("thuta")==="kimthanh")pfO("thuta","tn");if(pfO("thudai")==="kimthanh")pfO("thudai","tn");if(pfO("quat")==="kimthanh")pfO("quat","tn");if(pfAlive("trongla")&&pfP("trongla","quan")!==1){pfMove("trongla","tn");if(pfO("but")==="trongla")pfO("but","tn")}return""};
/* pt_su · Khiển Đường sứ (Quyền mưu · Trung nghĩa). People: {emp}, {v}, {maid}, {th}; PFP kimthanh (envoy chief, capital → home at .11),
   trongla (student-scholar, capital; stays or sails at .11); unnamed: Hồng Lư tự khanh, the Tân La envoy, {v}'s father at Lễ bộ.
   Objects (PFO): quocthu (the Phù Tang state letter), hoithu (the Đại Hy answer), lenh (the forged sailing order), kiem (the Phù Tang sword),
   sach (the book list of the return gifts), tho (the scholar's poem). GE hooks: ge1 Sứ giả của hai trời · ge2 Người dịch quốc thư ·
   ge3 Bẻ gãy sứ đoàn · ge4 Hồi thư bằng máu. */
RTHEME67.pt_su="emp";
ARC67.pt_su=pfArc("pt_su",{o:"pf",t:"Quốc thư hai mặt trời",w:"emp",sj:"quốc thư của {land}",cast(A){if(!pfO("quocthu"))pfO("quocthu","kimthanh");pfMeet("kimthanh");return rdCast(A,["v"])},
 g:"Đại sứ Tá Bá Kim Thành dâng quốc thư của {land}. Dòng đầu viết: “Thiên tử nơi mặt trời mọc gửi thư cho Thiên tử nơi mặt trời lặn.” Hoàng thượng đặt thư xuống, mặt không đổi sắc. Cả điện chờ xem công chúa {land} đọc tiếp, hay quỳ xuống.",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Đọc thư giữa điện",w:"emp",t:"Hồng Lư tự khanh trao quốc thư cho ngươi: “Chữ {land} viết, xin công chúa đọc cho triều nghe.” Bá quan nhìn ngươi.",o:[
  {n:"Đọc đúng từng chữ, giọng không run",f:"doc",wx:"cả triều thấy ngươi không giấu",lx:"chữ ‘thiên tử’ vang giữa điện",rt:"Ngươi đọc hết thư. Không ai nói gì, nhưng Hoàng thượng gật đầu một lần.",rf:"Đến chữ ‘thiên tử’, Lễ bộ thượng thư đứng bật dậy."},
  {n:"Đọc, giảng thêm nghĩa chữ cho êm tai",f:"dich",wx:"câu thư nghe mềm đi",lx:"người ta bảo ngươi đổi lời quốc thư",rt:"Ngươi giảng: ở {land}, ‘thiên tử’ là người giữ đền Thần. Vài vị quan gật gù."},
  {n:"Quỳ xuống trước, rồi mới đọc",f:"quy",wx:"Hoàng thượng thấy ngươi biết lễ",lx:"đại sứ thấy ngươi hạ nước mình",rt:"Ngươi quỳ đọc. Đại sứ cúi mặt.",go:()=>pfMeet("kimthanh")}]},
 s2:{h:"Bức thư đêm trước",w:"maid",t:"Đêm trước buổi chầu, đại sứ mang quốc thư đến cung ngươi, xin ngươi xem trước. Dòng đầu ấy làm ông mất ngủ.",o:[
  {n:"Khuyên đại sứ chép lại dòng đầu",f:"dich",wx:"quốc thư bớt gai",lx:"sửa quốc thư là tội ở {land}",rt:"Đại sứ không dám chép lại, nhưng ông ghi nhớ lời ngươi.",go:()=>pfMeet("kimthanh")},
  {n:"Bảo đại sứ cứ dâng nguyên",f:"doc",wx:"giữ đúng lời {quan}",lx:"ngày mai sẽ khó",rt:"Đại sứ thở ra: “Công chúa nói phải.”",go:()=>pfMeet("kimthanh")},
  {n:"Báo trước cho Hồng Lư tự khanh",f:"quy",wx:"Đại Hy không bị bất ngờ",lx:"đại sứ thấy ngươi đi báo",rt:"Hồng Lư tự khanh cảm ơn ngươi, dặn bá quan đừng làm ồn.",go:()=>pfMeet("kimthanh")}]},
 c1:{h:"{v} nói nước nhỏ mà xưng thiên tử",w:"v",need:["v"],t:"Ra khỏi điện, {v} nói lớn với các phi tần: một nước nhỏ bên kia bể mà dám xưng thiên tử, công chúa nước ấy ở đây làm gì.",o:[
  {n:"Đáp: Đại Hy lớn nên không sợ một chữ",wx:"lời ngươi được truyền đi",lx:"{v} thấy ngươi mỉa",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Các phi tần im lặng. Câu ấy đến tai Hoàng thượng trước giờ ngọ.",rf:"{v} cười: “Không sợ, nhưng cũng không nhận.” Các phi tần gật gù theo nàng."},
  {n:"Mời {v} ngày mai cùng nghe đại sứ giảng chữ",wx:"{v} không có cớ chê",lx:"{v} có thể bắt bẻ thêm",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} đến, nghe, rồi về không nói gì.",rf:"{v} đến, bắt bẻ ba chữ."},
  {n:"Cúi đầu đi qua",wx:"không thêm chuyện",lx:"lời {v} đi tiếp",rt:"Ngươi đi thẳng về cung."}]},
 c2:{h:"Thái hậu hỏi chuyện",w:"th",t:"Thái hậu cho gọi ngươi: “Ở nước ngươi, đàn bà cũng đọc quốc thư giữa triều à?”",o:[
  {n:"Thưa: ở {land} từng có nữ chúa",wx:"Thái hậu biết thêm một chuyện",lx:"Thái hậu không ưa đàn bà trị nước",rt:"Thái hậu nhướng mày: “Thế à.”",rf:"Thái hậu nói: “Ở đây thì không.”"},
  {n:"Thưa: thần thiếp chỉ đọc vì không ai khác biết chữ ấy",wx:"Thái hậu thấy ngươi biết phận",lx:"không ai nhớ ngươi giỏi",rt:"Thái hậu gật đầu, cho lui."},
  {n:"Dâng Thái hậu một bản chép quốc thư có giảng nghĩa",wx:"Thái hậu có cái để đọc",lx:"tốn một đêm chép",rt:"Thái hậu giữ bản chép, sai đem trà ra."}]},
 t1:{h:"Hoàng thượng hỏi riêng",w:"emp",t:"Đêm ấy Hoàng thượng hỏi: “Phụ hoàng nàng thật nghĩ mình ngang trẫm?”",o:[
  {n:"Thưa thật: {land} nghĩ thế, vì {land} ở xa",f:"doc",wx:"ngài tin lời ngươi thật",lx:"ngài không vui",rt:"Hoàng thượng cười khẽ: “Xa thì nghĩ gì chẳng được.”",rf:"Hoàng thượng im lặng rất lâu."},
  {n:"Thưa: phụ hoàng chỉ muốn được nói chuyện như người với người",f:"dich",wx:"ngài thấy {land} không phải kẻ thù",lx:"ngài nghĩ ngươi bào chữa",rt:"Hoàng thượng gật đầu."},
  {n:"Thưa: thần thiếp ở đây thì {land} ở dưới ngài",f:"quy",wx:"ngài vui",lx:"đại sứ mà biết thì đau lòng",rt:"Hoàng thượng nắm tay ngươi."}]},
 x1:{h:"Lời của công chúa trước triều",w:"emp",t:"Sáng hôm sau, Lễ bộ xin trả quốc thư, đuổi sứ đoàn. Hoàng thượng hỏi ngươi có điều gì muốn nói trước triều.",o:[
  {n:"Thưa: ‘thiên tử’ ở {land} là người giữ đền Thần, không phải người trị thiên hạ",e:["win","lose"],rt:"Lễ bộ không cãi được. Hoàng thượng phán: quốc thư nhận, sứ đoàn ở lại.",rf:"Lễ bộ thượng thư cười: “Đền Thần mà gửi thư cho thiên tử?” Quốc thư bị trả lại.",go:(_A,ok)=>ok?pfO("quocthu","hl"):pfO("quocthu","kimthanh")},
  {n:"Xin cho {land} viết lại quốc thư, thần thiếp xin chịu lỗi thay",e:["win2","mid"],rt:"Hoàng thượng cho sứ đoàn ở lại chờ thư mới. Ngươi chịu phạt ba tháng bổng lộc.",rf:"Hoàng thượng cho sứ đoàn ở lại, quốc thư cũ cất vào kho.",go:()=>pfO("quocthu","kho")},
  {n:"Thưa: việc nước, thần thiếp không dám bàn",e:"mid",lx:"triều quyết mà không có tiếng {land}",rt:"Triều nghị quyết: quốc thư nhận mà không trả lời.",go:()=>pfO("quocthu","hl")}]}},
 E:{win:{tag:"Một chữ thiên tử",w:"emp",t:"Cả triều nhớ cách ngươi giảng một chữ. Hồng Lư tự khanh gọi ngươi là ‘người dịch quốc thư’."},
  win2:{tag:"Công chúa nhận lỗi thay",w:"emp",t:"Ngươi chịu phạt thay {land}. Đại sứ quỳ ngoài cửa cung ngươi suốt một buổi."},
  mid:{tag:"Quốc thư nằm trong kho",t:()=>pfO("quocthu")==="kho"?"Quốc thư cũ nằm trong kho, chờ thư mới của {land}. Sứ đoàn ở lại, chờ.":"Quốc thư được nhận mà không ai trả lời. Sứ đoàn ở lại, chờ."},
  lose:{tag:"Quốc thư bị trả lại",w:"v",t:"Quốc thư bị trả lại tay đại sứ. {v} nói: công chúa {land} giảng chữ mà triều không tin."}}});
PF97.push({a:"pt_su",tag:"Hai mặt trời, một bầu trời",w:"emp",n:"Xin bút mực, viết ngay một câu đáp giữa điện",
 path:["Đọc đúng từng chữ","Bảo đại sứ cứ dâng nguyên","Mời {v} ngày mai","Dâng Thái hậu","Thưa thật","Thưa: ‘thiên tử’"],bad:["Quỳ xuống trước","Cúi đầu đi qua","Thưa: việc nước"],x:[()=>S.tamco>=BAL.arc.rare.pt_su.bar,`Tâm cơ từ ${BAL.arc.rare.pt_su.bar}`],
 t:"Ngươi xin bút, viết ngay dưới quốc thư một dòng: “Mặt trời mọc ở đông, lặn ở tây, mà trời thì chỉ có một.” Hoàng thượng đọc, bật cười, sai Hàn lâm chép câu ấy vào đầu hồi thư. Đại sứ cúi lạy ba lần. Tối ấy ngài ban cho ngươi một miếng ngọc bội khắc chữ ‘Nhất thiên’.",
 go:()=>pfO("quocthu","hl"),rw:"ngocboi",ti:"Hai mặt trời, một bầu trời"});

rdDef("pt_su",5,{t:"Hồi thư",w:"emp",sj:"hồi thư của Đại Hy gửi {land}",cast(A){if(!pfO("hoithu"))pfO("hoithu","hl");return rdCast(A,["v"])},
 g:"Đại Hy phải viết hồi thư. Một chữ trong ấy sẽ theo thuyền về {land} và nằm trong kho {quan} trăm năm: gọi {quan} là ‘Vương’ thì {land} nhục, gọi là ‘Thiên hoàng’ thì Đại Hy nhục. Hồng Lư tự khanh, Lễ bộ và ngươi đều muốn một chữ khác.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Ngài cho xem bản thảo",w:"emp",if:RDW(1),t:"Vì câu giảng chữ hôm trước, Hoàng thượng cho ngươi xem bản thảo hồi thư trước khi đóng ấn.",o:[
  {n:"Xin đổi chữ ‘Vương’ thành ‘Quốc chủ’",f:"giu",wx:"{land} không nhục mà Đại Hy cũng không",lx:"Lễ bộ thấy ngươi sửa thư của họ",rt:"Hoàng thượng gạch chữ ‘Vương’, viết chữ ‘Quốc chủ’ bên cạnh.",rf:"Hoàng thượng nói: chữ ấy để Lễ bộ quyết."},
  {n:"Khen bản thảo, không đổi gì",f:"thang",wx:"Lễ bộ nhớ ơn",lx:"{land} sẽ đọc chữ ‘Vương’",rt:"Lễ bộ thượng thư nghe tin, gửi lời cảm tạ."},
  {n:"Xin thêm một câu thăm sức khỏe Quốc chủ {land}",f:"giu",wx:"thư có hơi người",lx:"thêm câu là thêm chuyện",rt:"Hoàng thượng tự tay thêm câu thăm hỏi."}]},
 s2:{h:"Hồng Lư tự viết thay",w:"emp",if:RDW(0),t:"Hồng Lư tự khanh được giao viết hồi thư một mình. Ông gửi người sang hỏi ngươi: chữ gì thì {land} chịu nhận?",o:[
  {n:"Gửi lại một tờ giảng các chữ {land} chịu được",f:"giu",wx:"Tự khanh có cái để dựa",lx:"Lễ bộ biết ngươi nhúng tay",rt:"Tự khanh viết theo tờ giảng của ngươi.",go:()=>pfO("togiang","hl")},
  {n:"Đáp: Đại Hy viết gì, {land} nhận nấy",f:"thang",wx:"Đại Hy thấy ngươi một lòng",lx:"đại sứ đau lòng",rt:"Tự khanh viết chữ ‘Vương’."},
  {n:"Mời đại sứ đến bàn với Tự khanh",f:"giu",wx:"hai bên tự nói với nhau",lx:"chậm",rt:"Đại sứ và Tự khanh ngồi đến canh hai.",go:()=>pfMeet("kimthanh")}]},
 c1:{h:"Phụ thân {v} muốn thêm một câu",w:"v",need:["v"],t:"Phụ thân {v} ở Lễ bộ xin thêm vào hồi thư một câu: ‘{land} mỗi năm phải sang triều cống.’ Câu ấy biến minh ước thành lệ cống.",o:[
  {n:"Tâu xin bỏ câu ấy",wx:"minh ước vẫn là minh ước",lx:"nhà {v} mất mặt",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* fail cost by design (r2): tried and failed, {v}'s house still knows who asked */,rt:"Câu ấy bị gạch.",rf:"Câu ấy được giữ lại."},
  {n:"Đổi ‘mỗi năm’ thành ‘khi gió thuận’",wx:"giữ được lệ mà không thành gánh",lx:"{v} biết ngươi khéo hơn cha nàng",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Lễ bộ đồng ý. Câu thư mềm đi.",rf:"Lễ bộ nói chữ của Lễ bộ không đổi."},
  {n:"Để câu ấy, xin {land} tự trả lời sau",wx:"không đụng nhà {v}",lx:"{land} sẽ đọc chữ ‘triều cống’",rt:"Câu ấy nằm trong hồi thư."},
  {n:"Lén cho người chép câu ấy gửi sứ Tân La, để Tân La làm ồn thay",wx:"câu ấy bị bên ngoài chê",lx:"nếu lộ, ngươi tiết lộ thư của triều",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* ác (r2) */,rt:"Sứ Tân La dâng biểu hỏi: Đại Hy định bắt bao nhiêu nước sang cống? Lễ bộ phải gạch câu ấy.",rf:"Người chép thư bị bắt ở nhà khách Tân La, khai ra cung ngươi."}]},
 c2:{h:"Đại sứ quỳ ngoài cửa",w:"emp",t:"Đại sứ quỳ ngoài cửa Hồng Lư tự từ sáng: ông xin được xem hồi thư trước khi đóng ấn, để biết mang gì về cho {quan}.",o:[
  {n:"Xin cho đại sứ xem một bản chép",wx:"đại sứ yên lòng",lx:"Lễ bộ nói ngươi tiết lộ thư",rt:"Đại sứ đọc bản chép, đứng dậy.",rf:"Hồng Lư tự không cho chép.",go:()=>pfMeet("kimthanh")},
  {n:"Ra tận cửa, bảo đại sứ đứng dậy",wx:"đại sứ không mất mặt hơn",lx:"phi tần ra cửa Hồng Lư tự",rt:"Đại sứ đứng dậy, cúi chào ngươi.",go:()=>pfMeet("kimthanh")},
  {n:"Gửi lời: đừng quỳ, chữ đã có người lo",wx:"đại sứ tin ngươi",lx:"ông sẽ trách nếu chữ xấu",rt:"Đại sứ về nhà khách, đóng cửa chờ.",go:()=>pfMeet("kimthanh")}]},
 t1:{h:"Chữ cuối cùng",w:"emp",t:"Hồi thư chỉ còn thiếu một chữ: gọi Quốc chủ {land} là gì. Hàn lâm cầm bút chờ.",o:[
  {n:"Đề nghị: ‘Quốc chủ’",f:"giu",wx:"hai bên cùng nhận được",lx:"không bên nào vui hẳn",rt:"Hàn lâm viết ‘Quốc chủ {land}’."},
  {n:"Đề nghị: ‘Vương’, như mọi nước khác",f:"thang",wx:"Đại Hy giữ lệ",lx:"{land} nhục",rt:"Hàn lâm viết ‘{land} Vương’."},
  {n:"Đề nghị: không gọi gì, chỉ ghi ‘gửi {land}’",f:"giu",wx:"không ai nhục",lx:"thư thiếu lễ",rt:"Hàn lâm viết ‘Gửi nước {land}’. Lễ bộ nhăn mặt."}]},
 x1:{h:"Ấn ngự trên hồi thư",w:"emp",t:"Hồi thư đặt trước ngự án, chờ ấn. Hoàng thượng hỏi lần cuối: “Nàng nói xem, thư này về đến {land} thì {land} vui hay buồn?”",o:[
  {n:"Thưa: {land} sẽ buồn, nhưng sẽ còn gửi sứ",e:["win","lose"],rt:"Hoàng thượng đóng ấn: “Buồn mà còn đến, thế là đủ.” Hồi thư trao tay đại sứ.",rf:"Hoàng thượng chau mày: “Buồn thì đừng đến.” Hồi thư được viết lại cứng hơn.",go:()=>pfO("hoithu","kimthanh")},
  {n:"Thưa: thần thiếp xin viết kèm một thư riêng cho phụ hoàng",e:["win","mid"],rt:"Ngài cho phép. Thư riêng của ngươi gói chung với hồi thư.",rf:"Ngài cho phép, nhưng Lễ bộ đòi xem thư riêng.",go:()=>{pfO("thuta","kimthanh");return pfO("hoithu","kimthanh")}/* r2 6c: the private letter is booked with the envoy (pfSail takes it home) */},
  {n:"Thưa: thư của Đại Hy, {land} phải vui",e:"mid",lx:"đại sứ nghe được",rt:"Hoàng thượng đóng ấn. Đại sứ nhận thư, không ngẩng đầu.",go:()=>pfO("hoithu","kimthanh")}]}},
 E:{win:{tag:"Buồn mà còn đến",w:"emp",t:"Hồi thư đóng ấn ngự. Đại sứ đọc chữ cuối, thở ra: {land} sẽ còn gửi sứ."},
  mid:{tag:"Hồi thư đã đóng ấn",t:"Hồi thư nằm trong tay đại sứ. Chữ trong ấy, chỉ {land} mới biết là vui hay buồn."},
  lose:{tag:"Hồi thư viết lại",w:"v",t:"Hồi thư bị viết lại cứng hơn. Phụ thân {v} khen: Đại Hy không nhún trước nước nhỏ."}}});
rdDef("pt_su",6,{t:"Chỗ ngồi đêm Nguyên đán",w:"emp",sj:"chỗ ngồi của sứ {land} trong yến Nguyên đán",cast(A){return rdCast(A,["v"])},
 g:"Yến Nguyên đán, Hồng Lư tự xếp sứ {land} ngồi dưới sứ Tân La, ở dãy phía tây. Tá Bá Kim Thành không chịu ngồi: ở {land}, Tân La là nước sang cống {land}. Trước giờ yến, ông xin ngươi nói với Hoàng thượng.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tự khanh hỏi ý ngươi",w:"emp",if:RDW(1),t:"Vì hồi thư đã yên, Hồng Lư tự khanh tự đến hỏi ngươi trước khi chốt sơ đồ chỗ ngồi.",o:[
  {n:"Xin xếp sứ {land} ngồi phía đông",f:"tranh",wx:"{land} được chỗ trên",lx:"Tân La sẽ phản đối",rt:"Tự khanh ghi lại, nói sẽ tâu.",rf:"Tự khanh nói: sơ đồ đã gửi Lễ bộ."},
  {n:"Xin xếp hai sứ đối diện nhau",f:"nhuong",wx:"không ai trên ai",lx:"cả hai không vui hẳn",rt:"Tự khanh gật đầu: “Cách ấy hay.”"},
  {n:"Để Tự khanh xếp theo lệ",f:"nhuong",wx:"Tự khanh nhớ ngươi không làm khó",lx:"đại sứ sẽ giận",rt:"Tự khanh cảm ơn, xếp như cũ."}]},
 s2:{h:"Sơ đồ đã đóng dấu",w:"maid",if:RDW(0),t:"{maid} báo: sơ đồ chỗ ngồi đã đóng dấu Lễ bộ. Muốn đổi phải có lời Hoàng thượng.",o:[
  {n:"Xin vào gặp Hoàng thượng ngay",f:"tranh",wx:"ngài nghe trước giờ yến",lx:"ngài bận, không vui",rt:"Hoàng thượng nghe, nói sẽ xem.",rf:"Thái giám nói ngài đang nghỉ."},
  {n:"Khuyên đại sứ ngồi tạm, bàn sau",f:"nhuong",wx:"yến không có chuyện",lx:"đại sứ mất mặt một đêm",rt:"Đại sứ nghe, mặt tái.",go:()=>pfMeet("kimthanh")},
  {n:"Gửi lời hỏi sứ Tân La có chịu đổi không",f:"tranh",wx:"biết Tân La nghĩ gì",lx:"Tân La biết {land} đòi chỗ",rt:"Sứ Tân La đáp: “Chỗ của Tân La do Đại Hy xếp.”"}]},
 c1:{h:"{v} xin ngồi cạnh sứ Tân La",w:"v",need:["v","hh"]/* r2 6b: names Hoàng hậu */,t:"{v} xin Hoàng hậu cho mình ngồi gần dãy sứ Tân La trong yến, để ‘tỏ lòng hiếu khách’. Ai cũng hiểu nàng muốn gì.",o:[
  {n:"Xin cho mình ngồi gần dãy sứ {land}",wx:"hai bên ngang nhau",lx:"phi tần chia phe giữa yến",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Hoàng hậu cho cả hai.",rf:"Hoàng hậu chỉ cho {v}."},
  {n:"Tâu Hoàng hậu: phi tần không nên ngồi gần sứ",wx:"{v} không được chỗ",lx:"{v} biết ngươi chặn",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng hậu cho mọi phi tần ngồi sau rèm.",rf:"Hoàng hậu nói: lòng hiếu khách thì có gì sai. {v} được ngồi gần sứ Tân La."},
  {n:"Để mặc {v}",wx:"không đụng chạm",lx:"Tân La có người nói giúp",rt:"{v} ngồi gần sứ Tân La, cười nói suốt yến."},
  {n:"Sai người làm đổ rượu lên áo {v} trước giờ yến",wx:"{v} phải về thay áo, lỡ chỗ ngồi",lx:"nếu lộ, cả cung biết ngươi chơi xấu",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* ác (r2) */,rt:"{v} về thay áo; lúc quay lại, chỗ gần sứ Tân La đã có người ngồi.",rf:"Cung nữ làm đổ rượu khai ra người sai. {v} mang chuyện ấy đi khắp yến."}]},
 c2:{h:"Sứ Tân La gửi quà",w:"emp",t:"Sứ Tân La gửi đến cung ngươi một hộp nhân sâm: “Hai nước cùng ở bên kia bể, xin đừng tranh nhau một chỗ ngồi.”",o:[
  {n:"Nhận quà, đáp lễ bằng giấy {land}",wx:"hai sứ có đường nói chuyện",lx:"đại sứ cho là ngươi nhượng",rt:"Sứ Tân La nhận giấy, gửi lời cảm tạ."},
  {n:"Trả lại quà, cảm ơn",wx:"không mắc nợ ai",lx:"Tân La thấy {land} kiêu",rt:"Hộp sâm về lại nhà khách Tân La."},
  {n:"Đưa hộp sâm cho đại sứ xem",wx:"đại sứ biết Tân La muốn hòa",lx:"đại sứ nghi ngươi",rt:"Đại sứ nhìn hộp sâm rất lâu: “Họ khôn hơn ta.”",go:()=>pfMeet("kimthanh")}]},
 t1:{h:"Giờ yến đã đến",w:"emp",t:"Trống canh một. Đại sứ đứng ở cửa điện, chưa chịu vào chỗ.",o:[
  {n:"Ra cửa, mời đại sứ vào cùng mình",f:"nhuong",wx:"đại sứ có bậc để xuống",lx:"phi tần ra cửa điện",rt:"Đại sứ theo ngươi vào, ngồi xuống.",go:()=>pfMeet("kimthanh")},
  {n:"Tâu nhỏ với Hoàng thượng chuyện đại sứ",f:"tranh",wx:"ngài biết trước khi ai làm ồn",lx:"ngài phải quyết giữa yến",rt:"Hoàng thượng gật đầu, gọi Tự khanh."},
  {n:"Ngồi yên, chờ xem",f:"nhuong",wx:"không ai thấy ngươi dính vào",lx:"đại sứ có thể làm loạn",rt:"Đại sứ đứng ở cửa đến hết tuần rượu đầu."}]},
 x1:{h:"Giữa yến Nguyên đán",w:"emp",t:"Tuần rượu thứ hai, đại sứ quỳ giữa điện xin đổi chỗ. Cả điện ngừng đũa. Hoàng thượng nhìn ngươi.",o:[
  {n:"Tâu: xin cho sứ {land} ngồi trên sứ Tân La",e:["win","lose"],rt:"Hoàng thượng phán đổi chỗ. Sứ Tân La đứng lên nhường, mặt không đổi.",rf:"Hoàng thượng phán đổi chỗ. Sứ Tân La bỏ yến về nhà khách, hôm sau dâng biểu trách.",go:(A,ok)=>ok?"":e67bien(-BAL.road.pt.bien)},
  {n:"Tâu: xin hai sứ ngồi đối diện, đông tây ngang hàng",e:["win2","mid"],rt:"Thái giám kê lại hai bàn đối diện. Hai sứ cùng nâng chén.",rf:"Thái giám kê lại, nhưng sứ Tân La vẫn được ngồi gần ngự tọa hơn."},
  {n:"Ra đỡ đại sứ đứng dậy, xin ông ngồi tạm",e:"mid",lx:"{land} mất mặt trước Tân La",rt:"Đại sứ đứng dậy theo tay ngươi, về chỗ cũ.",go:()=>pfMeet("kimthanh")}]}},
 E:{win:{tag:"Chỗ ngồi phía đông",w:"emp",t:"Năm ấy sứ {land} ngồi trên sứ Tân La. Đại sứ viết vào nhật ký sứ đoàn: công chúa đã giữ thể diện cho cả nước."},
  win2:{tag:"Hai bàn đối diện",w:"emp",t:"Hai sứ ngồi đối diện. Từ năm ấy, Hồng Lư tự xếp sứ hai nước ngang hàng."},
  mid:{tag:"Ngồi tạm một đêm",t:"Đại sứ ngồi chỗ cũ. Ông không ăn gì, nhưng yến qua yên."},
  lose:{tag:"Biểu trách của Tân La",w:"v",t:"Tân La dâng biểu trách. {v} nói: công chúa {land} đổi chỗ ngồi mà mất một nước bạn."}}});

rdDef("pt_su",7,{t:"Lạy hay vái",w:"emp",sj:"lễ bái của sứ {land}",cast(A){return rdCast(A,["v"])},
 g:"Lễ đại triều, sứ các nước phải ba quỳ chín lạy. Tá Bá Kim Thành nói ở {land} chỉ lạy trước đền Thần; trước người, chỉ vái. Lễ bộ nói: không lạy thì không được vào chầu.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Đại sứ đến học lễ",w:"emp",if:RDW(1),t:"Vì chuyện chỗ ngồi, đại sứ tin ngươi. Ông đến xin ngươi dạy lễ Đại Hy, nhưng xin đừng bắt ông lạy đủ.",o:[
  {n:"Dạy ông đủ ba quỳ chín lạy",f:"day",wx:"ông vào chầu được",lx:"ông thấy nhục",rt:"Đại sứ tập đến khi gối đỏ.",go:()=>pfMeet("kimthanh")},
  {n:"Dạy ông một cách quỳ mà vẫn giữ lưng thẳng",f:"che",wx:"lạy mà không cúi hẳn",lx:"Lễ bộ có thể bắt lỗi",rt:"Đại sứ quỳ, lưng thẳng, đầu cúi vừa đủ.",go:()=>pfMeet("kimthanh")},
  {n:"Kể ông nghe sứ nước khác lạy thế nào",f:"day",wx:"ông biết mình không phải người đầu",lx:"ông vẫn chưa chịu",rt:"Đại sứ nghe, im lặng.",go:()=>pfMeet("kimthanh")}]},
 s2:{h:"Lễ bộ gửi người dạy lễ",w:"maid",if:RDW(0),t:"Lễ bộ gửi một viên chủ sự đến nhà khách dạy lễ. Y nói với đại sứ: “Người {land} lạy cho thẳng.”",o:[
  {n:"Xin đổi người dạy",f:"che",wx:"đại sứ bớt nhục",lx:"Lễ bộ không vui",rt:"Lễ bộ đổi người khác, già hơn, hiền hơn."},
  {n:"Tự đến đứng xem buổi dạy",f:"che",wx:"viên chủ sự giữ lời",lx:"phi tần đến nhà khách",rt:"Viên chủ sự thấy ngươi, nói năng nhỏ nhẹ."},
  {n:"Gửi lời bảo đại sứ cứ học",f:"day",wx:"việc chạy",lx:"đại sứ thấy ngươi bỏ ông",rt:"Đại sứ học, không nói gì.",go:()=>pfMeet("kimthanh")}]},
 c1:{h:"{v} chờ xem",w:"v",need:["v","hh"]/* r2 6b: names Hoàng hậu */,t:"{v} rủ các phi tần đứng sau rèm điện xem sứ {land} lạy. Nàng nói: “Xem có ngã không.”",o:[
  {n:"Rủ Thái hậu cùng xem",wx:"không ai dám cười",lx:"Thái hậu thấy ngươi làm lớn",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Thái hậu ngồi. Không ai cười.",rf:"Thái hậu không đến."},
  {n:"Xin Hoàng hậu cấm phi tần đứng sau rèm",wx:"không ai xem",lx:"{v} biết ngươi chặn",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Hoàng hậu cấm. Rèm điện buông kín.",rf:"Hoàng hậu nói: sau rèm thì có gì mà cấm. {v} vẫn đứng xem."},
  {n:"Đứng xem cùng {v}",wx:"biết nàng nói gì",lx:"nếu đại sứ ngã, ngươi ở đó",rt:"{v} xem, không cười, vì ngươi đứng cạnh."},
  {n:"Cho người ghé tai {v}: Hoàng thượng đang để ý ai cười sau rèm",wx:"{v} không dám đứng xem",lx:"nếu lộ, ngươi mượn lời Hoàng thượng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* ác (r2) */,rt:"{v} rời rèm trước giờ lễ, mặt tái.",rf:"{v} hỏi lại thái giám hầu ngự, biết lời ấy không thật, rồi kể với Hoàng hậu."}]},
 c2:{h:"Đầu gối của đại sứ",w:"maid",t:"{maid} nghe người nhà khách kể: đại sứ có vết thương cũ ở gối từ chuyến vượt biển. Quỳ lâu ông sẽ ngã.",o:[
  {n:"Gửi thuốc đắp gối cho đại sứ",wx:"ông quỳ được lâu hơn",lx:"bạc ra",rt:"Ngự y gửi thuốc đắp, đại sứ cảm ơn.",go:()=>pfMeet("kimthanh")},
  {n:"Tâu xin cho đại sứ được kê đệm",wx:"ông không ngã",lx:"Lễ bộ nói ngươi xin ân ngoài lệ",rt:"Hoàng thượng chuẩn: một chiếc đệm mỏng.",rf:"Lễ bộ nói: sứ nước nào cũng quỳ đá."},
  {n:"Không nói gì",wx:"không ai bảo ngươi bênh",lx:"đại sứ có thể ngã",rt:"Đại sứ tự lo."}]},
 t1:{h:"Đêm trước lễ",w:"emp",t:"Đêm trước lễ đại triều, Hoàng thượng hỏi: “Sứ của nàng ngày mai lạy hay không?”",o:[
  {n:"Thưa: ông sẽ lạy, vì thần thiếp đã dạy",f:"day",wx:"ngài yên lòng",lx:"nếu ông không lạy, ngươi mất lời",rt:"Hoàng thượng gật đầu."},
  {n:"Thưa: ông sẽ quỳ theo lệ {land}, xin ngài rộng lượng",f:"che",wx:"ngài biết trước",lx:"ngài phải nghĩ",rt:"Hoàng thượng nói: “Trẫm xem.”",rf:"Hoàng thượng nói: “Lệ là lệ.”"},
  {n:"Thưa: thần thiếp không biết",f:"che",wx:"không hứa điều gì",lx:"ngài thấy ngươi không lo việc",rt:"Hoàng thượng thở dài."}]},
 x1:{h:"Lễ đại triều",w:"emp",t:"Đến lượt sứ {land}. Đại sứ bước ra giữa điện, quỳ một gối, rồi dừng. Lễ bộ thượng thư đứng lên.",o:[
  {n:"Bước ra khỏi rèm, quỳ lạy cùng đại sứ",e:["win","lose"],rt:"Ngươi quỳ cạnh đại sứ, lạy đủ chín lạy. Đại sứ lạy theo ngươi. Hoàng thượng phán: “Lễ đã đủ.”",rf:"Lễ bộ tâu: phi tần ra giữa điện là trái lệ. Ngươi bị cấm túc.",go:(_A,ok)=>ok?pfMeet("kimthanh"):pfConfine("su7")},
  {n:"Tâu: ở {land}, quỳ một gối là lễ trọng nhất",e:["win2","mid"],rt:"Hoàng thượng phán: “Lễ trọng nhất của họ, trẫm nhận.” Lễ bộ ngồi xuống.",rf:"Hoàng thượng cho qua, nhưng Lễ bộ ghi vào sổ: sứ {land} thất lễ."},
  {n:"Ngồi yên sau rèm",e:"mid",lx:"đại sứ một mình giữa điện",rt:"Đại sứ cắn răng lạy đủ, đứng dậy không vững."}]}},
 E:{win:{tag:"Chín lạy của hai người",w:"emp",t:"Cả triều kể chuyện công chúa {land} quỳ cùng sứ thần nước mình. Hoàng thượng cho đại sứ ngồi ghế trong mọi buổi chầu sau."},
  win2:{tag:"Lễ trọng nhất của {land}",w:"emp",t:"Lễ bộ ghi thêm vào sổ lệ: sứ {land} quỳ một gối. Đại sứ cúi đầu cảm tạ ngươi."},
  mid:{tag:"Lễ đã qua",t:"Đại sứ lạy đủ, chân run. Ông không nói gì với ai suốt ba ngày."},
  lose:{tag:"Phi tần giữa điện",w:"v",t:"Ngươi bị cấm túc vì bước ra khỏi rèm. {v} nói: công chúa {land} quên mình là phi của Đại Hy."}}});

rdDef("pt_su",8,{t:"Hồi tứ",w:"emp",sj:"lễ vật Đại Hy ban về {land}",cast(A){if(!pfO("kiem"))pfO("kiem","kimthanh");return rdCast(A,["v"])},
 g:"Sứ đoàn dâng cống: ngọc trai, bạc, giấy {land}, và một thanh đao {land} rèn trăm lần. Đại Hy phải hồi tứ: lụa, sách, thuốc. Đại sứ chỉ xin sách và thuốc; Hộ bộ muốn trả bằng lụa, vì sách là của quý không cho người ngoài.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Danh mục sách",w:"emp",if:RDW(1),t:"Hoàng thượng giao ngươi xem danh mục sách đại sứ xin: kinh sử, luật lệnh, sách thuốc, lịch.",o:[
  {n:"Giữ nguyên danh mục, dâng lên",f:"sach",wx:"{land} có đủ sách",lx:"Hộ bộ cho là ngươi cho đi của quý",rt:"Danh mục dâng lên, không thiếu một quyển.",go:()=>pfO("sach","ta")},
  {n:"Bỏ sách luật lệnh, giữ sách thuốc",f:"bac",wx:"Hộ bộ yên lòng",lx:"{land} thiếu sách trị nước",rt:"Danh mục ngắn đi một phần ba.",go:()=>pfO("sach","ta")},
  {n:"Thêm vào danh mục một bộ thơ",f:"sach",wx:"{land} có thêm cái đẹp",lx:"Hộ bộ thêm việc",rt:"Một bộ thơ Đại Hy được thêm vào cuối danh mục.",go:()=>pfO("sach","ta")}]},
 s2:{h:"Hộ bộ giữ danh mục",w:"emp",if:RDW(0),t:"Danh mục sách nằm trong tay Hộ bộ. Ngươi chỉ được biết qua lời người khác.",o:[
  {n:"Xin Hoàng thượng cho xem danh mục",f:"sach",wx:"biết rõ cái {land} được",lx:"Hộ bộ không vui",rt:"Danh mục được mang sang cung ngươi một đêm.",rf:"Hộ bộ nói danh mục chưa xong.",go:(_A,ok)=>ok?pfO("sach","ta"):pfO("sach","kho")},
  {n:"Nhờ đại sứ đọc lại những gì ông nhớ",f:"bac",wx:"biết được phần lớn",lx:"ông nhớ không đủ",rt:"Đại sứ đọc thuộc hai mươi tên sách.",go:()=>{pfMeet("kimthanh");return pfO("sach","kho")}},
  {n:"Gửi lễ cho viên chủ sự Hộ bộ",f:"bac",wx:"có người báo tin",lx:"bạc ra",rt:"Viên chủ sự lén chép danh mục gửi sang.",go:()=>pfO("sach","kho")}]},
 c1:{h:"Thanh đao {land}",w:"emp",t:"Trong cống phẩm có thanh đao {land} rèn trăm lần. Hoàng thượng cầm lên, hỏi ngươi: đao này chém được gì?",o:[
  {n:"Xin ngài thử chém một tấm lụa thả rơi",wx:"ngài thấy đao thật",lx:"nếu không đứt, {land} mất mặt",rt:"Tấm lụa rơi xuống lưỡi đao, đứt làm đôi. Hoàng thượng treo đao trong thư phòng.",rf:"Tấm lụa vướng trên lưỡi đao. Các quan che miệng.",go:(_A,ok)=>pfO("kiem","vua")},
  {n:"Thưa: đao này để thờ, không để chém",wx:"đao được trọng",lx:"ngài thấy tiếc",rt:"Hoàng thượng cho đặt đao trên giá ở điện.",go:()=>pfO("kiem","vua")},
  {n:"Xin ngài ban đao cho Cấm quân thống lĩnh",wx:"võ tướng Đại Hy biết đao {land}",lx:"đao rời tay ngài",rt:"Thống lĩnh cấm quân nhận đao, quỳ tạ.",go:()=>pfO("kiem","kho")}]},
 c2:{h:"{v} xin lụa hồi tứ",w:"v",need:["v","hh"]/* r2 6b: names Hoàng hậu */,t:"{v} xin Hoàng hậu cho nhà mình được giữ việc dệt lụa hồi tứ. Lụa dệt dày hay mỏng, ai biết.",o:[
  {n:"Xin cho Nội vụ phủ dệt",wx:"lụa đúng phép",lx:"{v} mất một mối lợi",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Nội vụ phủ nhận việc dệt.",rf:"Hoàng hậu nói: nhà {v} dệt lâu năm, không đổi. Việc dệt về tay nhà {v}."},
  {n:"Để nhà {v} dệt, cử người xem",wx:"{v} vui, lụa có người canh",lx:"vẫn có thể bị bớt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Lụa dệt đủ, dày.",rf:"Người của ngươi thấy lụa mỏng hơn mẫu."},
  {n:"Để mặc",wx:"không thêm thù",lx:"lụa có thể mỏng",rt:"Nhà {v} dệt lụa."}]},
 t1:{h:"Hộ bộ đếm",w:"emp",t:"Hộ bộ đếm xong: hồi tứ cho {land} nặng gấp đôi cống phẩm. Hộ bộ thượng thư nói: thế là Đại Hy lỗ.",o:[
  {n:"Thưa: Đại Hy lỗ lụa, được lòng",f:"sach",wx:"ngài thấy ngươi nghĩ xa",lx:"Hộ bộ ghét ngươi",rt:"Hoàng thượng cười: “Nàng nói như một Thượng thư.”"},
  {n:"Xin bớt lụa, giữ sách",f:"sach",wx:"Hộ bộ đỡ lỗ",lx:"{land} ít lụa",rt:"Lụa bớt một nửa. Sách giữ nguyên."},
  {n:"Xin bớt sách, giữ lụa",f:"bac",wx:"của quý ở lại Đại Hy",lx:"{land} thiếu sách",rt:"Sách bớt một nửa. Hộ bộ gật đầu."}]},
 x1:{h:"Ngự phê hồi tứ",w:"emp",t:"Hoàng thượng cầm bút son trên danh mục hồi tứ. Ngài hỏi ngươi lần cuối.",o:[
  {n:"Xin cho {land} đủ sách, kể cả luật lệnh",e:["win","lose"],rt:"Ngài phê đủ. Đại sứ cầm danh mục, run tay.",rf:"Ngài phê, nhưng Hộ bộ giữ lại sách luật lệnh: ‘của quý không ra khỏi nước’."},
  {n:"Xin đổi một nửa lụa lấy thuốc và thầy thuốc",e:["win2","mid"],rt:"Ngài phê: hai thầy thuốc Thái y viện theo thuyền sang {land} một năm.",rf:"Ngài phê thuốc, nhưng không cho thầy thuốc đi."},
  {n:"Thưa: ngài cho gì, {land} nhận nấy",e:"mid",lx:"{land} nhận theo ý Hộ bộ",rt:"Ngài phê theo Hộ bộ."}]}},
 E:{win:{tag:"Sách qua bể",w:"emp",t:"Ba rương sách đóng dấu ngự theo thuyền về {land}. Đại sứ nói: {land} sẽ nhớ tên ngươi trong từng quyển."},
  win2:{tag:"Thầy thuốc qua bể",w:"emp",t:"Hai thầy thuốc Đại Hy sẽ sang {land}. Ngươi gửi theo họ một lá thư cho {mh}."},
  mid:{tag:"Hồi tứ theo lệ",t:"Hồi tứ theo lệ Hộ bộ. {land} có lụa, ít sách."},
  lose:{tag:"Sách ở lại",w:"v",t:"Sách luật lệnh ở lại Đại Hy. {v} nói: công chúa {land} xin của quý cho nước mình mà không được."}}});
rdDef("pt_su",9,{t:"Lưu học sinh",w:"emp",sj:"lưu học sinh Cát Thành Trọng Lữ",cast(A){pfMeet("trongla");return rdCast(A,["v"])},
 g:"Cát Thành Trọng Lữ, lưu học sinh {land}, học ở Quốc tử giám đã ba năm. Y xin dự khoa thi của Đại Hy để ở lại làm quan. Đại sứ nói: y là người {quan} gửi đi học để mang chữ về, không phải để cho Đại Hy.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Bài văn của Trọng Lữ",w:"maid",if:RDW(1),t:"Trọng Lữ nhờ người gửi vào cung ngươi một bài văn: viết bằng chữ Hán, không sai một nét, kể chuyện biển {land}.",o:[
  {n:"Dâng bài văn lên Hoàng thượng",f:"o",wx:"ngài biết tên y",lx:"đại sứ thấy ngươi giúp y ở lại",rt:"Hoàng thượng đọc hai lần, gật đầu.",go:()=>pfMeet("trongla")},
  {n:"Gửi lại cho y một lời khen",f:"ve",wx:"y vui, không thêm chuyện",lx:"y chưa được gì",rt:"Trọng Lữ nhận lời khen, cúi đầu về phía cung ngươi.",go:()=>pfMeet("trongla")},
  {n:"Đưa bài văn cho đại sứ đọc",f:"ve",wx:"đại sứ thấy y giỏi thật",lx:"đại sứ càng muốn đưa y về",rt:"Đại sứ đọc, thở dài: “Giỏi thế này thì càng phải về.”",go:()=>{pfMeet("kimthanh");return pfMeet("trongla")}}]},
 s2:{h:"Quốc tử giám từ chối",w:"emp",if:RDW(0),t:"Quốc tử giám nói: lệ thi không cho người ngoại bang. Trọng Lữ xin ngươi nói giúp một lời.",o:[
  {n:"Tâu xin Hoàng thượng mở lệ",f:"o",wx:"y có đường",lx:"triều thần không ưa",rt:"Hoàng thượng nói sẽ xem.",rf:"Hoàng thượng nói: lệ là lệ.",go:()=>pfMeet("trongla")},
  {n:"Khuyên y học thêm, chờ dịp",f:"ve",wx:"y không làm liều",lx:"y buồn",rt:"Trọng Lữ cúi đầu.",go:()=>pfMeet("trongla")},
  {n:"Tìm một vị Hàn lâm nhận y làm học trò",f:"o",wx:"y có thầy Đại Hy",lx:"mang ơn một vị Hàn lâm",rt:"Một vị Hàn lâm già nhận y.",go:()=>pfMeet("trongla")}]},
 c1:{h:"{v} nói người ngoài chiếm chỗ",w:"v",need:["v"],t:"{v} nói: em trai nàng thi ba lần chưa đỗ, nay lại có người {land} xin vào thi.",o:[
  {n:"Đáp: người giỏi thì ở đâu cũng giỏi",wx:"giữ được lời cho Trọng Lữ",lx:"{v} giận",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"{v} không đáp.",rf:"{v} đáp: “Giỏi thì về nước mà giỏi.” Các phi tần cười."},
  {n:"Mời em trai {v} cùng Trọng Lữ đọc sách",wx:"hai người học cùng nhau",lx:"em trai {v} có thể ghét y",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Hai người đọc sách cùng nhau một tháng, thành bạn.",rf:"Em trai {v} đến một lần rồi thôi."},
  {n:"Im lặng",wx:"không thêm thù",lx:"lời {v} đến tai Quốc tử giám",rt:"Ngươi uống trà."},
  {n:"Cho người tung tin em trai {v} từng nhờ người viết thay bài thi",wx:"{v} lo cho em mình, thôi nói",lx:"nếu lộ, ngươi vu cho người",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* ác (r2): a rumour, it can be traced back */,rt:"Quốc tử giám cho tra lại quyển cũ của em trai {v}. {v} không nhắc đến Trọng Lữ nữa.",rf:"Quyển cũ của em trai {v} sạch. Quốc tử giám biết lời đồn từ đâu ra."}]},
 c2:{h:"Thư của mẹ Trọng Lữ",w:"maid",t:"Trọng Lữ cho ngươi xem thư mẹ y gửi theo thuyền: bà già rồi, chỉ mong thấy con một lần.",o:[
  {n:"Khuyên y về thăm mẹ",wx:"y nhớ ơn ngươi",lx:"y có thể không quay lại",rt:"Trọng Lữ khóc.",go:()=>pfMeet("trongla")},
  {n:"Gửi kèm thư của y một món quà cho bà",wx:"bà có quà của con",lx:"bạc ra",rt:"Một tấm lụa và một gói trà theo thuyền về {land}."},
  {n:"Nói: y lớn rồi, y tự quyết",wx:"y thấy ngươi tôn trọng y",lx:"y một mình nghĩ",rt:"Trọng Lữ gấp thư lại."}]},
 t1:{h:"Đại sứ đến gặp",w:"emp",t:"Tá Bá Kim Thành đến gặp ngươi, mặt nặng: “Nếu Trọng Lữ ở lại, {quan} sẽ hỏi tôi đã gửi bao nhiêu người đi để mất bao nhiêu người.”",o:[
  {n:"Thưa: một người ở lại làm quan là một cửa mở cho {land}",f:"o",wx:"đại sứ nghĩ lại",lx:"đại sứ không vui",rt:"Đại sứ lặng thinh rất lâu.",go:()=>pfMeet("kimthanh")},
  {n:"Hứa sẽ khuyên y về",f:"ve",wx:"đại sứ yên lòng",lx:"Trọng Lữ sẽ buồn",rt:"Đại sứ cúi đầu cảm tạ.",go:()=>pfMeet("kimthanh")},
  {n:"Đề nghị: y ở lại một kỳ thi, rồi theo thuyền năm sau",f:"o",wx:"hai bên cùng chờ được",lx:"không bên nào vui hẳn",rt:"Đại sứ nói sẽ nghĩ.",go:()=>pfMeet("kimthanh")}]},
 x1:{h:"Khoa thi mùa thu",w:"emp",t:"Hoàng thượng hỏi ngươi: có nên cho Trọng Lữ dự khoa thi mùa thu không.",o:[
  {n:"Tâu xin cho y dự thi",e:["win","lose"],rt:"Trọng Lữ đỗ, được bổ làm Hiệu thư lang. Y mặc áo quan Đại Hy đến lạy tạ ngươi.",rf:"Trọng Lữ dự thi, nhưng quyển của y bị đánh rớt vì ‘văn có giọng lạ’.",go:(_A,ok)=>{pfP("trongla","quan",ok?1:0);return pfMeet("trongla")}},
  {n:"Khuyên y về nước, mang sách về dạy",e:["win2","mid"],rt:"Trọng Lữ nhận lời. Y xin chép lại cả bộ sách luật để mang về.",rf:"Trọng Lữ nhận lời, nhưng mặt buồn.",go:()=>{pfP("trongla","ve",1);return pfMeet("trongla")}},
  {n:"Thưa: để đại sứ quyết",e:"mid",lx:"y không được ai nói giúp",rt:"Đại sứ quyết: y theo thuyền về.",go:()=>pfP("trongla","ve",1)}]}},
 E:{win:{tag:"Hiệu thư lang người {land}",w:"emp",t:"Cả kinh nói chuyện người {land} đỗ khoa thi Đại Hy. Trọng Lữ ngồi ở Bí thư sảnh, ngày nào cũng gửi một dòng vào cung ngươi."},
  win2:{tag:"Người mang chữ về",w:"emp",t:"Trọng Lữ chép sách ngày đêm. Y nói: chữ của Đại Hy sẽ sống ở {land}."},
  mid:{tag:"Lưu học sinh chờ thuyền",t:"Trọng Lữ chờ thuyền về. Y không đến Quốc tử giám nữa."},
  lose:{tag:"Văn có giọng lạ",w:"v",t:"Quyển của Trọng Lữ bị đánh rớt. {v} cười: chữ người {land} thì vẫn là chữ người {land}."}}});

rdDef("pt_su",10,{t:"Thuyền về",w:"emp",sj:"ngày thuyền sứ đoàn rời bến",cast(A){if(!pfO("lenh"))pfO("lenh","hl");return rdCast(A,["v"])},
 g:"Hồng Lư tự nhận được lệnh: sứ đoàn {land} phải rời Minh Châu trong mười ngày. Gió mùa chưa đổi; đi lúc này là liều. Lệnh có dấu Lễ bộ, nhưng Lễ bộ thượng thư nói không nhớ đã ký.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tự khanh mang lệnh đến",w:"emp",if:RDW(1),t:"Hồng Lư tự khanh tin ngươi; ông mang tờ lệnh đến cung ngươi trước khi gửi đi Minh Châu.",o:[
  {n:"Xin giữ tờ lệnh một đêm để xem",f:"tra",wx:"có lệnh trong tay",lx:"Tự khanh mang tội nếu mất",rt:"Tờ lệnh nằm trên án ngươi: dấu son hơi lệch, nét chữ không phải của Lễ bộ.",go:()=>pfO("lenh","ta")},
  {n:"Xin Tự khanh tạm giữ, đừng gửi",f:"cho",wx:"sứ đoàn chưa phải đi",lx:"Tự khanh làm trái lệnh",rt:"Tự khanh gật đầu, cất lệnh vào hộp.",go:()=>pfO("lenh","hl")},
  {n:"Xin Tự khanh mang lệnh lên Hoàng thượng",f:"tra",wx:"ngài tự xem",lx:"việc thành lớn",rt:"Hoàng thượng xem lệnh, nhíu mày.",go:()=>pfO("lenh","vua")}]},
 s2:{h:"Lệnh đã đến Minh Châu",w:"maid",if:RDW(0),t:"{maid} báo: lệnh đã đến Minh Châu. Thủy thủ {land} đang chất hàng lên thuyền.",o:[
  {n:"Gửi người cưỡi ngựa nhanh đến Minh Châu bảo chờ",f:"cho",wx:"thuyền chưa nhổ neo",lx:"ngươi trái lệnh Lễ bộ",rt:"Người của ngươi đến kịp, thuyền chưa đi."},
  {n:"Xin Hồng Lư tự gửi bản sao lệnh về",f:"tra",wx:"có chứng để xem",lx:"chậm",rt:"Bản sao lệnh về đến tay ngươi.",go:()=>pfO("lenh","ta")},
  {n:"Báo đại sứ, để ông quyết",f:"cho",wx:"người {land} tự quyết",lx:"ông có thể đi liều",rt:"Đại sứ cho thủy thủ ngừng chất hàng.",go:()=>pfMeet("kimthanh")}]},
 c1:{h:"Chữ trên tờ lệnh",w:"v",need:["v"],t:()=>({ta:"Ngươi so chữ trên tờ lệnh",vua:"Hoàng thượng cho so chữ trên tờ lệnh",hl:"Hồng Lư tự khanh so chữ trên tờ lệnh"})[pfO("lenh")]+": giống chữ một viên chủ sự Lễ bộ, người làm dưới tay phụ thân {v}.",o:[
  {n:"Trình chuyện này lên Hoàng thượng",wx:"kẻ giả lệnh bị tra",lx:"đụng đến nhà {v}",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* fail cost by design (r2): a failed try still points at {v}'s house */,rt:"Hoàng thượng sai tra viên chủ sự.",rf:"Viên chủ sự khai không biết gì."},
  {n:"Gọi riêng viên chủ sự đến hỏi",wx:"biết ai sai y",lx:"y có thể báo lại",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Viên chủ sự quỳ xuống: y chỉ làm theo lời người trên.",rf:"Viên chủ sự không đến."},
  {n:"Đốt tờ lệnh, không nói gì",if:()=>pfO("lenh")==="ta"/* r2 6c: she burns only an order in her hands */,wx:"không thêm thù",lx:"kẻ giả lệnh thoát",rt:"Tờ lệnh cháy trong lò sưởi.",go:()=>pfO("lenh","chay")}]},
 c2:{h:"Đại sứ muốn đi",w:"emp",t:"Đại sứ nói: nếu Đại Hy không muốn sứ đoàn ở, ông sẽ đi, dù gió chưa đổi. Thể diện {land} không cho ông ở lại khi bị đuổi.",o:[
  {n:"Khuyên ông ở lại, lệnh là giả",wx:"ông không đi liều",lx:"ông nghi ngươi",rt:"Đại sứ ngồi xuống: “Nếu công chúa nói giả thì là giả.”",go:()=>pfMeet("kimthanh")},
  {n:"Xin Hoàng thượng ban lời giữ sứ đoàn",wx:"đại sứ có thể diện để ở",lx:"ngài phải nói một lời",rt:"Hoàng thượng phán: sứ đoàn ở đến gió mùa.",rf:"Hoàng thượng nói sẽ xem.",go:()=>pfMeet("kimthanh")},
  {n:"Để ông quyết",wx:"tôn trọng ông",lx:"ông có thể đi",rt:"Đại sứ quyết chờ thêm năm ngày.",go:()=>pfMeet("kimthanh")}]},
 t1:{h:"Gió mùa",w:"emp",t:"Lão thủy thủ {land} nói: gió mùa còn hai mươi ngày nữa mới đổi. Đi sớm là chết.",o:[
  {n:"Xin Thiên văn đài xem ngày gió đổi",f:"tra",wx:"có lời Đại Hy làm chứng",lx:"Thiên văn đài có thể nói sai",rt:"Thiên văn đài tâu: hai mươi ngày nữa."},
  {n:"Tin lời lão thủy thủ",f:"cho",wx:"người biển biết biển",lx:"triều không tin người {land}",rt:"Ngươi ghi lời lão vào thư gửi Hồng Lư tự."},
  {n:"Hỏi thương nhân Tân La",f:"tra",wx:"có người thứ ba nói",lx:"Tân La biết sứ đoàn khó",rt:"Thương nhân Tân La đáp: “Hai mươi ngày, không ít hơn.”"}]},
 x1:{h:"Lệnh thật hay lệnh giả",w:"emp",t:()=>"Hoàng thượng cho gọi Lễ bộ thượng thư, Hồng Lư tự khanh và ngươi vào thư phòng. "+(pfO("lenh")==="chay"?"Tờ lệnh đã cháy; trên án chỉ còn lời khai và lịch gió.":"Tờ lệnh đặt trên án."),o:[
  {n:"Tâu: lệnh giả, xin tra đến người sai",e:["win","lose"],rt:()=>pfO("lenh")==="ta"||pfO("lenh")==="vua"?"Ngươi chỉ dấu son lệch, nét chữ lạ. Viên chủ sự khai người sai y. Phụ thân {v} bị phạt bổng một năm.":"Ngươi chỉ lời khai và ngày gió. Lễ bộ thượng thư nhận: lệnh không phải của ông.",rf:"Lễ bộ thượng thư nói lệnh là thật, ông quên. Hoàng thượng cho qua. Ngươi mang tiếng vu cho Lễ bộ."},
  {n:"Tâu: xin hoãn lệnh đến gió mùa, không truy ai",e:["win2","mid"],rt:"Hoàng thượng phán hoãn. Lễ bộ thở ra. Sứ đoàn ở lại.",rf:"Hoàng thượng phán hoãn năm ngày thôi."},
  {n:"Thưa: thần thiếp xin để ngài xét",e:"mid",lx:"không ai được rửa tiếng",rt:()=>pfO("lenh")==="chay"?"Hoàng thượng gấp lời khai lại, cất vào ngăn kéo.":"Hoàng thượng cất tờ lệnh vào ngăn kéo.",go:()=>pfO("lenh")==="chay"?"":pfO("lenh","vua")}]}},
 E:{win:{tag:"Tờ lệnh giả",w:"emp",t:()=>(pfO("lenh")==="chay"?"Chuyện tờ lệnh giả":"Tờ lệnh giả")+" bị đem ra giữa triều. Từ nay giấy tờ của sứ đoàn {land} phải qua tay ngươi xem trước."},
  win2:{tag:"Chờ gió mùa",w:"emp",t:"Sứ đoàn ở lại chờ gió mùa. Không ai bị truy, và không ai dám ra lệnh giả lần nữa."},
  mid:{tag:"Tờ lệnh trong ngăn kéo",t:()=>pfO("lenh")==="vua"?"Tờ lệnh nằm trong ngăn kéo ngự án. Sứ đoàn chờ.":pfO("lenh")==="chay"?"Lời khai về tờ lệnh nằm trong ngăn kéo ngự án. Sứ đoàn chờ.":"Lệnh hoãn còn chờ ngự phê. Sứ đoàn chờ."},
  lose:{tag:"Vu cho Lễ bộ",w:"v",t:"Ngươi mang tiếng vu cho Lễ bộ. {v} nói: công chúa {land} giữ sứ đoàn như giữ của riêng."}}});

rdDef("pt_su",11,{t:"Ai về cố quốc",w:"emp",sj:"sứ đoàn {land} về nước",cast(A){return rdCast(A,["v"])},
 g:"Gió mùa đã đổi. Sứ đoàn {land} xuống Minh Châu. Hoàng thượng ngự giá xuống bến tiễn sứ, cho ngươi theo hầu; xe đi mười ngày mới tới biển. Đại sứ mang hồi thư; lưu học sinh chờ biết mình đi hay ở; còn ngươi, ngươi gửi gì về theo thuyền?",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Trọng Lữ ở lại",w:"emp",if:()=>pfAlive("trongla")&&pfP("trongla","quan")===1,t:"Trọng Lữ mặc áo quan Đại Hy đến bến tiễn sứ đoàn. Đại sứ không nhìn y.",o:[
  {n:"Bảo Trọng Lữ lạy đại sứ một lạy",f:"tien",wx:"đại sứ nguôi lòng",lx:"y thấy nhục",rt:"Trọng Lữ quỳ lạy. Đại sứ đỡ y dậy.",go:()=>pfMeet("kimthanh")},
  {n:"Đứng giữa hai người, nói lời tiễn",f:"tien",wx:"hai người không phải nói với nhau",lx:"không ai nói thật",rt:"Ngươi nói thay cả hai."},
  {n:"Để hai người tự nói",f:"giu",wx:"hai người đàn ông tự giải",lx:"có thể cãi nhau",rt:"Hai người nói tiếng {land} một lúc lâu, rồi cùng cúi chào."}]},
 s2:{h:"Trọng Lữ lên thuyền",w:"emp",if:()=>!(pfAlive("trongla")&&pfP("trongla","quan")===1),t:"Trọng Lữ khiêng ba rương sách lên thuyền. Y nhìn về phía kinh thành rất lâu.",o:[
  {n:"Tặng y một cây bút của mình",f:"tien",wx:"y có kỷ vật",lx:"ngươi mất cây bút quý",rt:"Trọng Lữ cầm bút, quỳ lạy.",go:()=>pfO("but","trongla")},
  {n:"Hứa sẽ xin cho y quay lại",f:"giu",wx:"y có hy vọng",lx:"một lời hứa khó giữ",rt:"Trọng Lữ cười lần đầu."},
  {n:"Chỉ cúi chào",f:"giu",wx:"không ai nói ngươi thân với y",lx:"y buồn",rt:"Trọng Lữ cúi chào lại."}]},
 c1:{h:"{v} đến bến xem",w:"v",need:["v"],t:"{v} xin theo đoàn ngự giá xuống bến xem tiễn sứ, nói: “Xem công chúa có theo thuyền về không.”",o:[
  {n:"Mời {v} đứng cạnh mình tiễn sứ",wx:"{v} không nói được gì",lx:"phải đứng cạnh nàng cả buổi",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} đứng cạnh ngươi, im lặng.",rf:"{v} đứng cạnh ngươi, nói nhỏ suốt buổi."},
  {n:"Đáp: {tx} về rồi thì ai tiễn nàng",wx:"cả bến cười",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Các phi tần che miệng. {v} đỏ mặt.",rf:"{v} đáp: “Người tiễn thì đông, chỉ sợ người về không có.” Cả bến nhìn ngươi."},
  {n:"Không đáp",wx:"không thêm thù",lx:"lời {v} đi tiếp",rt:"Ngươi nhìn ra biển."},
  {n:"Cho người thì thầm với đoàn ngự giá: {v} muốn ra thuyền gặp riêng ai đó",wx:"{v} phải đứng xa bến",lx:"nếu lộ, ngươi bịa chuyện về nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""}/* ác (r2) */,rt:"Thái giám mời {v} lên lầu xa, không cho xuống bến.",rf:"Lời thì thầm bị lần ra. {v} đứng cạnh ngự giá, nhìn ngươi suốt buổi."}]},
 c2:{h:"Thư gửi phụ hoàng",w:"maid",t:"Đại sứ hỏi ngươi có thư gì gửi {pv} không.",o:[
  {n:"Viết thư dài, kể mọi chuyện",wx:"{pv} hiểu con",lx:"thư có thể bị Lễ bộ xem",rt:"Thư dài năm tờ, gói chung với hồi thư.",go:()=>pfO("thudai","kimthanh")/* r2 6c: a second letter (thuta is the .5 one) */},
  {n:"Viết một bài thơ ngắn",wx:"thư nhẹ mà sâu",lx:"{pv} có thể không hiểu",rt:"Bốn câu thơ trên giấy {land}.",go:()=>pfO("thudai","kimthanh")},
  {n:"Gửi lời miệng qua đại sứ",wx:"không để lại chữ",lx:"lời có thể sai",rt:"Đại sứ nhắc lại lời ngươi ba lần cho nhớ."}]},
 t1:{h:"Đại sứ xin một điều",w:"emp",t:"Trước khi lên thuyền, đại sứ xin ngươi một điều: “Năm sau, nếu thuyền {land} lại đến, xin công chúa ra bến đón.”",o:[
  {n:"Hứa sẽ ra bến đón",f:"tien",wx:"sứ đoàn năm sau có người đón",lx:"phi tần ra bến là chuyện lớn",rt:"Đại sứ cúi lạy.",go:()=>pfMeet("kimthanh")},
  {n:"Thưa: thần thiếp sẽ xin Hoàng thượng cho Hồng Lư tự đón",f:"giu",wx:"đúng phép",lx:"đại sứ thấy ngươi xa",rt:"Đại sứ gật đầu.",go:()=>pfMeet("kimthanh")},
  {n:"Tặng đại sứ một chiếc quạt Đại Hy",f:"tien",wx:"ông có kỷ vật",lx:"người ta thấy ngươi tặng quà sứ",rt:"Đại sứ cầm quạt, mở ra: trên quạt có chữ ngươi viết.",go:()=>{pfMeet("kimthanh");return pfO("quat","kimthanh")}}]},
 x1:{h:"Bến Minh Châu",w:"emp",t:"Thuyền nhổ neo. Hoàng thượng đứng cạnh ngươi trên lầu bến. Ngài hỏi: “Nàng có muốn trẫm làm gì cho {land} trước khi thuyền đi không?”",o:[
  {n:"Xin ngài ban một chiếu: thuyền {land} được vào bến mỗi khi gió thuận",e:["win","lose"],rt:"Ngài sai đọc chiếu ngay trên bến. Đại sứ quỳ trên mũi thuyền nghe.",rf:"Ngài nói: chiếu lớn như thế phải qua triều nghị. Thuyền đi mà không có chiếu."},
  {n:"Xin ngài cho một thuyền Đại Hy đi kèm đến Ngũ Đảo",e:["win2","mid"],rt:"Một thuyền thủy sư nhổ neo theo. Sứ đoàn về đến Ngũ Đảo, gửi thư báo yên.",rf:"Thuyền thủy sư đi được nửa đường thì quay về."},
  {n:"Thưa: thần thiếp chỉ xin đứng đây đến khi thuyền khuất",e:"mid",lx:"{land} không được gì thêm",rt:"Ngài đứng cạnh ngươi đến khi cánh buồm cuối cùng khuất."}]}},
 E:{win:{tag:"Sứ giả của hai trời",w:"emp",t:"Chiếu cho thuyền {land} vào bến được chép thành hai bản: một ở Hồng Lư tự, một theo thuyền về {land}.",go:()=>pfSail()},
  win2:{tag:"Thuyền về Ngũ Đảo",w:"emp",t:"Thư từ Ngũ Đảo về: sứ đoàn yên. Đại sứ viết thêm: ‘công chúa đã đưa chúng tôi về.’",go:()=>pfSail()},
  mid:{tag:"Cánh buồm cuối cùng",t:"Thuyền khuất. Ngươi đứng trên lầu bến, gió biển thổi về phía tây.",go:()=>pfSail()},
  lose:{tag:"Thuyền đi không chiếu",w:"v",t:"Thuyền đi mà không có chiếu. {v} nói: công chúa {land} xin lớn quá, nên chẳng được gì.",go:(_A,G)=>{pfSail();return e67bien(G[0])}}}});
RD97L.push(rdRare({a:"pt_su_11",tag:"Bài thơ trăng Tam Lạp",w:"emp",n:"Đọc bài thơ trăng của Trọng Lữ giữa bến",
 path:["Đọc đúng từng chữ","Xin đổi chữ ‘Vương’","Đổi ‘mỗi năm’","Tâu: xin hai sứ ngồi đối diện","Dạy ông một cách quỳ","Tâu: ở {land}, quỳ một gối","Giữ nguyên danh mục","Xin đổi một nửa lụa","Dâng bài văn","Tâu xin cho y dự thi","Xin giữ tờ lệnh","Tâu: lệnh giả","Hứa sẽ ra bến đón","Xin ngài ban một chiếu"],
 bad:["Quỳ xuống trước","Thưa: việc nước","Ngồi yên sau rèm","Đốt tờ lệnh"],x:[()=>S.tamco>=RR("pt_su_11").bar,"Tâm cơ từ "+RR("pt_su_11").bar],
 t:"Trăng lên trên bến Minh Châu. Ngươi đọc to bài thơ Trọng Lữ viết đêm trước: “Ngẩng nhìn trời biển rộng, trăng ấy là trăng mọc trên núi Tam Lạp quê nhà.” Thủy thủ {land} trên thuyền hát theo. Hoàng thượng lặng đi, rồi sai khắc bài thơ lên bia đá ở bến, và ban cho ngươi bộ diêu «Hải đường xuân thụy».",
 go:(_A,G)=>{pfO("tho","bia");return e67bien(G[0])},rw:"nt_haiduong",ti:"Bài thơ trăng Tam Lạp"}));

