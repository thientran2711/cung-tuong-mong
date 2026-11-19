/* ================= jrd_pt: the PHÙ TANG princess — third country branch of hòa thân and its OWN four roads (owner OD 19/11 ~06:40Z / ~06:42Z / ~06:50Z;
   FIGURE_GATE «OWNER LƯỢT 283»; E19 mapping reports/foreign-princess-3-history.md §B/§C.3; ROAD_MAP §4.5c) =================
   pf is a COUNTRY BRANCH of the one hòa thân origin nc (j1 ORIGIN_BR, par "nc"), never a 10th origin: it is rolled with nc (BAL.orig.br.nc.pf),
   plays the jkc2 home phase in Phù Tang (KC2LAND.pf), then the palace. New pf lives roll one of pt_hai · pt_su (this file) · pt_tang · pt_dang
   (jrd_pt2.js): .4 premise arc (o:"pf") + .5–.11 + j97 rare at .4 (PT97) + RD97L rare at .11. Numbers: jbalpt.js (ONE CORE).
   Era (Foreman E): a Tang-like world — no Wokou word (giặc biển Đông Hải), sea traders are Tân La merchants, «Thiên hoàng» only inside Phù Tang
   scenes (Đại Hy says «Quốc chủ Phù Tang»), dress = Tang-style jacket + pleated skirt. Names marked [D] in ROAD_MAP §5.4 are invented. */
const ptArc=(id,d)=>typeof arcFx==="function"?arcFx(id,d):d;
/* ---------- the branch (j1 ORIGIN_BR / j4 STORY / j67 QUEST67) ---------- */
ORIGIN_BR.pf={par:"nc",k:"pf",land:"Phù Tang",n:"Công chúa Phù Tang hòa thân",r:BAL.orig.pf.r,o:BAL.orig.pf.o,hh:0,th:BAL.orig.pf.th,art:{vu:1},
 t:"Con gái Thiên hoàng Phù Tang, theo thuyền sứ đoàn vượt bể sang làm tin cho minh ước hai nước."};
STORY.pf={t:"Hòa thân Phù Tang",n:3,goal:"Ngươi qua bể mà đến, sau lưng là sóng, trước mặt là cung cấm. Giữ cho hai nước còn thuyền qua lại, và giữ cho mình khỏi bị quên như một kiện cống phẩm.",
 init(){S.st.m=0},hint:()=>"Theo từng chương của Mệnh truyện",month(){return""}};
QUEST67.pf={t:"Người con gái bên kia bể",e:[["Cầu nối hai bờ biển",BAL.orig.quest[0],"Thuyền Phù Tang và thuyền Đại Hy đều mang thư của ngươi."],
 ["Khách được giữ lại",BAL.orig.quest[1],"Đại Hy cho ngươi một chỗ đứng, dù chẳng ai quên ngươi đến từ bên kia bể."],
 ["Kiện cống phẩm bị quên",BAL.orig.quest[2],"Sứ đoàn đã về, ngươi ở lại một mình; chỉ còn dựa vào chính mình."]]};
/* ---------- land tokens {land} {pv} {mh} {quan} {pa} {pb} {canh} {laq} {nden} (jrd_nc NCL; chained over the bd country switch of jrd_bd) ---------- */
const ptLife=()=>{try{return S.origin.k==="pf"}catch(e){return false}};
if(typeof NCL==="object"){NCL.pf={land:"Phù Tang",pv:"Phụ hoàng",mh:"Mẫu hậu",quan:"Thiên hoàng",pa:"Hoàng huynh",pb:"Hoàng thúc",canh:"canh rong biển nấu cá muối",laq:"lá tía tô",nden:"rưới nước thanh tẩy trước đền Thần"};
 if(typeof TOK67==="object")for(const k of Object.keys(NCL.pf)){const t0=TOK67[k];TOK67[k]=function(){return ptLife()?NCL.pf[k]:typeof t0==="function"?t0.apply(this,arguments):t0}}}
/* ---------- PTP: the people of pf's roads (law 6b, ROAD_MAP §5.4) — one living state per life, kept in the road flag book ----------
   where: "hb" at sea · "tn" Phù Tang · "cang" Minh Châu port · "kinh" kinh thành · "nguc" ngục; alive 1 / dead −1; met 1 once she has dealt with them.
   Chapters move them (ptMove / ptKill); a moved or dead person never acts again (every later line reads ptP / ptAlive; dev/measure/pt-scan.py). */
const PTP={kimthanh:{n:"Tá Bá Kim Thành",r:"Khiển Đường đại sứ",w:"kinh",want:"mang quốc thư về mà không mất thể diện của Phù Tang",man:1,h:"thu"},
 trongla:{n:"Cát Thành Trọng Lữ",r:"lưu học sinh",w:"kinh",want:"đỗ khoa thi của Đại Hy, làm quan ở đất này",man:1,h:"thu"},
 tieungoc:{n:"Tiểu Ngọc",r:"nhũ mẫu của ngươi",w:"hb",want:"tới được bờ, ở lại bên ngươi"},
 thanlao:{n:"Thân Lão",r:"người giữ kiêng trên thuyền",w:"hb",want:"được tin là đã giữ kiêng trọn vẹn",man:1,h:"thu"},
 namlao:{n:"Nham Lão",r:"lão lái thuyền thứ tư",w:"hb",want:"đưa thuyền và người về được bến",man:1,h:"thu"},
 huuthanh:{n:"Kim Hựu Thành",r:"thương chủ Tân La",w:"cang",want:"được quyền buôn ở Minh Châu, không phải nộp thuế hai lần",man:1,h:"thu"},
 ocuu:{n:"Ô Cửu",r:"đầu lĩnh giặc biển Đông Hải",w:"hb",want:"tiền chuộc, và một bến không ai đuổi",man:1,h:"thu"},
 tinhvien:{n:"Tịnh Viên",r:"tăng sư Phù Tang",w:"kinh",want:"thỉnh được một bậc thầy giới luật sang Phù Tang",man:1,h:"vuon"},
 trivien:{n:"Pháp sư Trí Viễn",r:"cao tăng Đại Hy",w:"kinh",want:"truyền giới luật sang bên kia bể trước khi mắt mờ hẳn",man:1,h:"vuon"},
 mh:{n:"Mẫu hậu",r:"mẹ",w:"tn",want:"nhận được một lá thư của con gái mỗi mùa gió"}};
const ptP=(id,k,v)=>{const key="pt.p."+id+"."+k;if(v!=null)RD_FL(key,v);const x=RD_FL(key);
 if(x)return x;if(k==="alive")return 1;if(k==="w")return PTP[id].w;return 0};
const ptAlive=id=>ptP(id,"alive")!==-1;/* dead = -1 (0 is the book's "unset") */
/* a man who is IN the capital stands in the world like every man (S.men, jmen schedule; the envoy keeps the envoy's places), and leaves it when
   he sails, is jailed or dies (law 6b; the bdMan pattern of jrd_bd). Women (Tiểu Ngọc, the mother) live in the book only, like bd's women guests. */
const ptMan=id=>{try{if(typeof menInit==="function")menInit()}catch(e){}if(!S.men||!PTP[id]||!PTP[id].man)return"";const mid="mpt_"+id,M=BAL.road.pt.man;
 const on=ptAlive(id)&&ptP(id,"w")==="kinh";const had=S.men.find(m=>m.id===mid);if(had){had.alive=ptAlive(id);if(on){had.away=0;delete had.ban}else{had.away=1;had.ban=M.away}return""}
 if(on)S.men.push({id:mid,role:"Sứ thần",rw:PTP[id].r,haunts:[PTP[id].h||"thu"],age:M.age[id]||M.age.d,name:PTP[id].n,trait:M.trait[id]||"cẩn trọng",loyal:M.loyal,af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[],ptp:id,known:1});return""};
const ptKill=id=>{ptP(id,"alive",-1);ptMan(id);return ""};
const ptMove=(id,w)=>{ptP(id,"w",w);ptMan(id);return ""};
const ptMeet=id=>{ptP(id,"met",1);ptMan(id);return ""};
const ptWhere=id=>({hb:"trên biển",tn:"Phù Tang",cang:"bến Minh Châu",kinh:"kinh thành",nguc:"ngục"})[ptP(id,"w")]||"";
/* PTO: the ONE object book of pf's four roads (law 6c; both files use it): fb "pt.o.<thing>" = where / who holds it now (0 = never in play).
   ptO(k) reads, ptO(k,v) sets (returns "" for text use). Holders: "ta" her · "vua" the Emperor · "kho" Nội vụ phủ store · "hl" Hồng Lư tự ·
   "bien" lost at sea · "chay" burnt · a PTP id · "tn" sent home · "chua" a temple. */
const ptO=(k,v)=>{const r=RD_FL("pt.o."+k,v);return v!=null?"":r};
const PTCF=k=>BAL.road.pt.conf[k];
const ptConfine=k=>{S.confined=Math.max(S.confined||0,PTCF(k));return ""};
/* the .4 rare rows of the pt premises (j97 R97L shape; j97 appends them; numbers BAL.arc.rare.<road>) */
const PT97=[];
RDQ.ptNgoc=()=>ptAlive("tieungoc");RDQ.ptKim=()=>ptAlive("kimthanh")&&ptP("kimthanh","w")==="kinh";

/* =====================================================================================================================================
   pt_hai · Vượt bể — lead (E21)
   ===================================================================================================================================== */
/* pt_hai · Vượt bể (Sinh tồn · Trung nghĩa). People: {emp}, {v}, {maid}, {th}; PTP kimthanh (envoy, capital), tieungoc (her nurse-maid, 4th ship),
   namlao (helmsman, 4th ship), thanlao (kiêng-keeper, her ship → Minh Châu), huuthanh (Tân La merchant, Minh Châu), ocuu (pirate chief, at sea).
   Objects (PTO): van (the painted plank), thu (Nham Lão's letter), danhsach (the embassy roll), nhatky (the 4th ship's log), ruong (the tribute chest),
   niem (its seals), ngoctrai (her pearls), haido (the sea chart). GE hooks: ge1 Người đếm tên kẻ chết đuối · ge2 Chủ thuyền Đông Hải ·
   ge3 Đổ tội cho biển · ge4 Thuyền về Nan Ba. */
const PTNGOC=()=>ptAlive("tieungoc")?"Tiểu Ngọc":"người sống sót";/* the one who tells, if the nurse-maid is gone */
const PTLOG=()=>ptO("nhatky")==="ta";/* she holds the 4th ship's log */
RTHEME67.pt_hai="emp";
ARC67.pt_hai=ptArc("pt_hai",{o:"pf",t:"Thuyền thứ tư chưa tới",w:"emp",sj:"chiếc thuyền thứ tư của sứ đoàn",cast(A){if(!ptO("ruong"))ptO("ruong","namlao");if(!ptO("nhatky"))ptO("nhatky","namlao");if(!ptO("danhsach"))ptO("danhsach","kimthanh");return rdCast(A,["v"])},
 g:"Bốn chiếc thuyền sứ đoàn rời Ngũ Đảo cùng một con nước. Thuyền của ngươi cập bến Minh Châu; thuyền thứ tư, chở Tiểu Ngọc, rương cống và cuốn nhật ký hải trình, đến nay vẫn chưa thấy. Trong triều đã có người hỏi: {land} gửi nửa phần cống, hay gửi một nàng công chúa thay cho cống?",
 p:[["s1","s2"],["c1","c2","G.rumor"],["t1"],["x1"]],
 B:{s1:{h:"Đại sứ xin vào chầu",w:"emp",t:"Khiển Đường đại sứ Tá Bá Kim Thành xin vào chầu để tâu việc chiếc thuyền thứ tư. Ông nói tiếng Đại Hy chậm, từng chữ một. Hồng Lư tự khanh hỏi ngươi có muốn đứng cạnh ông không.",o:[
  {n:"Đứng cạnh đại sứ, tự mình thưa việc",f:"tim",wx:"ngài nghe chuyện từ chính miệng ngươi",lx:"phi tần đứng giữa triều, người ta chê",rt:"Ngươi thưa rõ: bốn thuyền, một con nước, một cơn bão. Hoàng thượng gật đầu.",rf:"Hồng Lư tự khanh ngắt lời ngươi: phi tần không tâu việc sứ đoàn.",go:()=>ptMeet("kimthanh")},
  {n:"Viết tờ trình bằng chữ Hán, nhờ Hồng Lư tự dâng",f:"cho",wx:"giữ đúng phép Đại Hy",lx:"tờ trình nằm chờ trên án",rt:"Tờ trình viết chân phương, Hồng Lư tự khanh khen chữ đẹp.",go:()=>ptMeet("kimthanh")},
  {n:"Xin Hoàng thượng sai thuyền Minh Châu ra khơi tìm",f:"tim",wx:"có người đi tìm ngay",lx:"tốn kho, triều thần không vui",rt:"Hoàng thượng phê: thuyền tuần Minh Châu ra khơi ba ngày.",rf:"Hoàng thượng nói: biển rộng, chờ gió đổi đã."}]},
 s2:{h:"Bến Minh Châu im sóng",w:"maid",t:"{maid} kể: mỗi sáng thủy thủ {land} ở Minh Châu ra bến nhìn về phía đông, không ai nói gì. Trên thuyền thứ tư có Tiểu Ngọc, người đã bế ngươi từ thuở lọt lòng.",o:[
  {n:"Lập bàn thờ thần biển trong cung, khấn cho thuyền",f:"cho",wx:"người {land} trong kinh thấy ngươi không quên họ",lx:"Thái hậu không ưa lễ lạ",rt:"Ngươi rưới nước, thắp hương, khấn theo lệ đền Thần."},
  {n:"Gửi bạc cho thuyền chài Minh Châu ra dò",f:"tim",wx:"có thêm mắt trên biển",lx:"bạc ra mà chưa chắc thấy gì",rt:"Mười chiếc thuyền chài ra khơi, dặn thấy ván sơn son thì mang về."},
  {n:"Hỏi đại sứ xem thuyền thứ tư chở những gì",f:"le",wx:"biết rõ cái đang mất",lx:"đại sứ ngại nói",rt:"Đại sứ đưa ngươi xem bản danh sách sứ đoàn: tên người, tên cống phẩm, rương nào niêm phong ở đâu.",go:()=>{ptMeet("kimthanh");return ptO("danhsach","ta")}}]},
 c1:{h:"{v} hỏi về cống phẩm",w:"v",need:["v"],t:"{v} cười trước mặt các phi tần: nghe nói rương cống {land} chìm mất nửa, chẳng biết có thật từng có rương không.",o:[
  {n:"Mời {v} xem danh mục cống đã đến",wx:"{v} không còn cớ nói",lx:"{v} thấy danh mục thiếu thật",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"{v} đọc danh mục, im lặng.",rf:"{v} chỉ vào dòng thiếu: “Đây, thiếu.”"},
  {n:"Đáp: biển lấy của ai thì người ấy biết",wx:"giữ được thể diện",lx:"{v} cho là ngươi mỉa nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Các phi tần che miệng cười. {v} đỏ mặt."},
  {n:"Lặng thinh, ghi nhớ từng lời",wx:"không thêm thù",lx:"lời đồn đi tiếp",rt:"Ngươi uống hết chén trà, không nói một lời."}]},
 c2:{h:"Mảnh ván sơn son",w:"emp",t:"Thứ sử Minh Châu gửi lên một mảnh ván sơn son, ngư dân vớt được ngoài cửa biển. Trên ván có hình mặt trời của thuyền {land}.",o:[
  {n:"Xin giữ mảnh ván làm chứng",wx:"có vật thật trong tay",lx:"người ta nói ngươi giữ đồ xui",rt:"Mảnh ván được đặt trong kho của cung ngươi.",go:()=>ptO("van","ta")},
  {n:"Gửi mảnh ván cho đại sứ xem",wx:"đại sứ nhận ra thuyền nào",lx:"đại sứ suy sụp",rt:"Đại sứ sờ hình mặt trời, nói: “Thuyền thứ tư. Nó còn trôi được.”",go:()=>{ptMeet("kimthanh");return ptO("van","kimthanh")}},
  {n:"Xin thứ sử dò theo hướng ván trôi về",wx:"biết thuyền ở phương nào",lx:"tốn công thứ sử",rt:"Thứ sử báo: gió đông bắc, ván trôi từ phía nam lên.",rf:"Thứ sử báo: không dò được.",go:()=>ptO("van","kho")}]},
 t1:{h:"Ngài hỏi: còn hy vọng chăng",w:"emp",t:"Đêm ấy Hoàng thượng hỏi ngươi: “Nàng còn tin chiếc thuyền ấy về không?” Câu trả lời của ngươi, ngài sẽ đem ra triều ngày mai.",o:[
  {n:"Thưa: thiếp tin, xin ngài cho tìm",f:"tim",wx:"ngài thấy ngươi có lòng với người của mình",lx:"nếu thuyền không về, ngươi mất lời",rt:"Hoàng thượng nói: “Trẫm cho tìm.”",rf:"Hoàng thượng thở dài: “Tin thì cứ tin.”"},
  {n:"Thưa: thiếp chờ gió mùa, không dám làm phiền",f:"cho",wx:"ngài thấy ngươi biết phận",lx:"ngài nghĩ ngươi đã buông",rt:"Hoàng thượng gật đầu, không hỏi thêm."},
  {n:"Thưa: thiếp không biết, chỉ biết người trên thuyền còn cần gạo nước",f:"le",wx:"ngài thấy ngươi thật thà",lx:"không ai cho là ngươi hy vọng",rt:"Hoàng thượng im lặng rất lâu."}]},
 x1:{h:"Triều nghị về nửa phần cống",w:"emp",t:"Sáng hôm sau, Hộ bộ tâu: {land} còn nợ nửa phần cống. Có người xin bắt sứ đoàn ở lại đến khi cống đủ. Hoàng thượng nhìn về phía rèm, nơi ngươi đứng.",o:[
  {n:"Tâu: biển lấy cống, không lấy lòng {land}; xin chờ đến gió mùa",e:["win","lose"],rt:"Hoàng thượng phán: chờ đến gió mùa. Hộ bộ cúi đầu.",rf:"Hộ bộ tâu tiếp: lòng mà không có cống thì là lòng suông. Cả triều cười."},
  {n:"Dâng hồi môn của mình bù phần cống",e:["win2","mid"],rt:"Mười tấm gấm và đôi bình sứ trong hồi môn của ngươi được ghi vào sổ cống. Hộ bộ không còn gì để nói.",rf:"Hộ bộ nhận hồi môn, nhưng vẫn ghi: {land} cống chưa đủ."},
  {n:"Xin viết thư về {land} đòi cống bù",e:"mid",lx:"{land} mang nợ với Đại Hy",rt:"Thư đi theo thuyền buôn Tân La. Triều nghị khép lại."}]}},
 E:{win:{tag:"Chờ gió mùa",w:"emp",t:"Hoàng thượng cho sứ đoàn ở lại chờ gió mùa, không bắt ai. Người {land} trong kinh cúi chào ngươi mỗi khi gặp."},
  win2:{tag:"Hồi môn thay cống",w:"emp",t:"Hồi môn của ngươi nằm trong kho Đại Hy với tên {land}. Hoàng thượng nói với Thái hậu: “Nàng ấy trả nợ cho cả một nước.”"},
  mid:{tag:"Sổ cống còn ghi thiếu",t:"Triều nghị khép lại. Sổ Hộ bộ vẫn ghi một dòng thiếu, chờ thuyền thứ tư hoặc thuyền năm sau."},
  lose:{tag:"Nửa phần cống",w:"v",t:"{v} kể khắp hậu cung: {land} gửi sang một nàng công chúa và nửa rương đồ, rồi đổ cho biển."}}});
PT97.push({a:"pt_hai",tag:"Lửa hiệu trên Ngũ Đảo",w:"emp",n:"Xin Hoàng thượng cho đốt lửa hiệu dọc bờ Minh Châu suốt ba đêm",
 path:["Đứng cạnh đại sứ","Gửi bạc cho thuyền chài","Hỏi đại sứ","Gửi mảnh ván","Thưa: thiếp tin","Tâu: biển lấy cống"],bad:["Lặng thinh","Thưa: thiếp chờ gió mùa"],x:[()=>S.tamco>=BAL.arc.rare.pt_hai.bar,`Tâm cơ từ ${BAL.arc.rare.pt_hai.bar}`],
 t:"Ngươi nhớ lời Nham Lão kể khi còn ở Phù Tang: thuyền lạc đêm đi theo lửa. Hoàng thượng cho đốt lửa hiệu dọc bờ Minh Châu ba đêm liền. Đêm thứ ba, lính canh thấy một đốm lửa nhỏ đáp lại ngoài khơi: thuyền thứ tư còn nổi. Hoàng thượng sai thưởng cho ngươi một cây trâm đông châu: “Ngọc của biển, trả cho người biết gọi biển.”",
 go:()=>ptO("haido","vua"),rw:"nt_dongchau",ti:"Lửa hiệu trên Ngũ Đảo"});

rdDef("pt_hai",5,{t:"Thư từ Phúc Châu",w:"emp",sj:"lá thư từ bờ biển Phúc Châu",cast(A){return rdCast(A,["v"])},
 g:"Một chiếc thuyền chài từ Phúc Châu mang lên kinh lá thư của Nham Lão, lão lái thuyền thứ tư: cột buồm gãy, thuyền trôi về phương nam, mắc cạn ở một đảo không tên. Nước ngọt còn đủ ít hôm. Người trên thuyền xin một con thuyền, và xin đừng ai quên họ.",
 p:[["s1","s2","s3"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thư đến tay ngươi trước",w:"maid",if:RDW(1),t:"Vì Hoàng thượng đã cho tìm, thuyền chài đưa thư thẳng vào cung ngươi. {maid} đặt lá thư lên án: giấy ướt mặn, chữ Hán run, có dấu son của Nham Lão.",o:[
  {n:"Dâng ngay lá thư lên Hoàng thượng",f:"cuu",wx:"ngài thấy ngươi không giấu gì",lx:"triều thần biết ngay cái khó của {land}",rt:"Hoàng thượng đọc thư, gõ ngón tay lên án.",go:()=>ptO("thu","vua")},
  {n:"Giữ thư, mời đại sứ vào bàn trước",f:"giu",wx:"người {land} bàn với nhau trước khi nói",lx:"người ta bảo ngươi giấu tin",rt:"Đại sứ đọc thư, nói khẽ: “Còn sống. Họ còn sống.”",go:()=>{ptMeet("kimthanh");return ptO("thu","ta")}},
  {n:"Chép một bản, gửi bản gốc lên Hồng Lư tự",f:"le",wx:"đúng phép mà vẫn giữ được chứng",lx:"chậm một ngày",rt:"Bản chép nằm trong hộp gỗ của ngươi.",go:()=>ptO("thu","hl")}]},
 s2:{h:"Thư đến Hồng Lư tự trước",w:"emp",if:RDW(0),t:"Lá thư đến Hồng Lư tự trước. Tự khanh nói thư không có ấn của sứ đoàn, chưa biết thật giả.",o:[
  {n:"Xin đại sứ nhận dấu son của Nham Lão",f:"le",wx:"thư được nhận là thật",lx:"phải chờ đại sứ",rt:"Đại sứ nhận ra dấu son ngay.",rf:"Đại sứ đang ở Minh Châu, ba ngày nữa mới về.",go:()=>{ptMeet("kimthanh");return ptO("thu","hl")}},
  {n:"Xin Hoàng thượng cho xem thư",f:"cuu",wx:"ngài tự quyết",lx:"Tự khanh mất mặt",rt:"Hoàng thượng cho mang thư vào. Ngươi đọc to từng dòng.",go:()=>ptO("thu","vua")},
  {n:"Gửi bạc nhờ người Tự đưa thư ra sớm",f:"giu",wx:"thư về tay ngươi",lx:"bạc ra, có người biết",rt:"Lá thư về đến cung ngươi trước giờ Ngọ.",go:()=>ptO("thu","ta")}]},
 s3:{h:"Nước ngọt còn ít hôm",w:"maid",t:"Người đưa thư kể thêm: trên đảo không có suối. Họ hứng nước mưa bằng buồm rách.",o:[
  {n:"Gửi ngay gạo và nước theo thuyền chài",f:"cuu",wx:"người trên đảo có thêm ngày sống",lx:"bạc ra, thuyền nhỏ đi xa",rt:"Thuyền chài chất đầy chum nước, ra khơi lúc chiều."},
  {n:"Gửi thuốc trị sốt cùng thư dặn",f:"giu",wx:"người bệnh có thuốc",lx:"thuốc không thay được nước",rt:"Ngự y cho ba gói thuốc, gói kỹ trong giấy dầu."},
  {n:"Viết thư trả lời, dặn giữ lửa mỗi đêm",f:"le",wx:"thuyền tìm dễ thấy họ",lx:"không gửi được gì khác",rt:"Thư của ngươi gói trong ống trúc, buộc vào mạn thuyền chài."}]},
 c1:{h:"Ai trả tiền thuyền cứu",w:"emp",t:"Thứ sử Minh Châu tâu lên: một chiếc thuyền lớn đi phương nam cần bạc, gạo và hai mươi tay chèo. Kho Minh Châu không có khoản ấy.",o:[
  {n:"Bỏ bạc riêng ra thuê thuyền",wx:"thuyền đi ngay",lx:"bạc ra",rt:"Thứ sử nhận bạc, hẹn ba ngày thuyền rời bến."},
  {n:"Xin đại sứ lấy bạc của sứ đoàn",wx:"người {land} lo người {land}",lx:"đại sứ còn phải trả nhiều thứ",go:(A,ok,G)=>{ptMeet("kimthanh");return""},rt:"Đại sứ mở rương, đếm bạc đưa thứ sử.",rf:"Đại sứ nói: bạc sứ đoàn để mua sách; ông xin ngươi lo trước."},
  {n:"Tâu xin Hộ bộ chi theo lệ cứu nạn",wx:"đúng phép, không mất bạc",lx:"Hộ bộ chậm",rt:"Hộ bộ chuẩn chi, nhưng phải chờ mười ngày.",rf:"Hộ bộ nói: lệ cứu nạn dành cho dân Đại Hy."}]},
 c2:{h:"{v} hỏi thư ấy ai đọc được",w:"v",need:["v"],t:"{v} nói giữa lúc thỉnh an: “Thư viết bằng chữ gì? Người {land} viết, người {land} đọc, rồi bảo cả triều tin?”",o:[
  {n:"Xin Hoàng thượng cho Hàn lâm đọc thư",wx:"một người Đại Hy đọc, cả triều tin",lx:"nếu chữ run quá, Hàn lâm đọc sai",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Hàn lâm đọc thư, từng chữ khớp với lời ngươi.",rf:"Hàn lâm đọc ngắc ngứ ba chỗ; {v} cười."},
  {n:"Đáp: chữ Hán trên thư là chữ Đại Hy dạy cho {land}",wx:"cả điện thấy ngươi khéo lời",lx:"{v} ghi hận",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Thái hậu khẽ cười. {v} cúi đầu."},
  {n:"Mời {v} cùng gửi một chum nước ra đảo",wx:"{v} không thể nói gì thêm",lx:"{v} nhận công",go:(A,_ok,G)=>{rdRel(A,"v",G[0]);return""},rt:"{v} miễn cưỡng nhận lời, sai người gửi một chum nước."}]},
 t1:{h:"Đại sứ muốn tự đi",w:"emp",t:"Tá Bá Kim Thành xin được tự mình theo thuyền cứu ra đảo. Ông là người giữ quốc thư; nếu ông chết trên biển, sứ đoàn không còn ai nói được với Đại Hy.",o:[
  {n:"Khuyên đại sứ ở lại kinh",f:"giu",wx:"sứ đoàn còn người đứng đầu",lx:"đại sứ thấy mình vô dụng",rt:"Đại sứ cúi đầu ở lại, đêm nào cũng ra bến nhìn.",go:()=>ptMeet("kimthanh")},
  {n:"Xin Hoàng thượng cho một quan Đại Hy đi cùng",f:"cuu",wx:"có quan Đại Hy làm chứng",lx:"ngài phải nghĩ thêm một việc",rt:"Hoàng thượng sai một viên Thị lang Hồng Lư tự đi theo thuyền.",rf:"Hoàng thượng nói: không có quan nào rảnh."},
  {n:"Để đại sứ tự quyết",f:"le",wx:"ông nhớ ngươi tôn trọng ông",lx:"ông có thể đi mà không về",rt:"Đại sứ quyết ở lại. “Quốc thư phải có người giữ.”",go:()=>ptMeet("kimthanh")}]},
 x1:{h:"Thuyền cứu ra khơi",w:"emp",t:"Cuối tháng, gió còn chưa đổi. Thủy sư Minh Châu nói đi lúc này là liều. Thương thuyền Tân La nói họ đi được, nếu có giá. Hoàng thượng hỏi ngươi chọn thuyền nào.",o:[
  {n:"Xin thuyền thủy sư Đại Hy đi ngay",e:["win","lose"],rt:"Thuyền thủy sư ra khơi giữa sóng lớn, cờ Đại Hy trên cột buồm. Cả kinh nói ngài thương người của nàng.",rf:"Thuyền thủy sư gặp gió ngược, quay về sau năm ngày, gãy một mái chèo."},
  {n:"Thuê thương thuyền Tân La, trả bằng giấy miễn thuế một mùa",e:["win","mid"],rt:"Thương thuyền Tân La nhổ neo đêm ấy. Thương nhân biết đường đảo hơn thủy sư.",rf:"Thương thuyền đi, nhưng không hứa ngày về."},
  {n:"Chờ gió đổi, gửi thêm thuyền chài mang nước",e:"mid",lx:"người trên đảo phải chờ",rt:"Mười chum nước nữa ra khơi. Thuyền lớn chờ gió."}]}},
 E:{win:{tag:"Thuyền cứu đã đi",w:"emp",t:"Thuyền cứu rời Minh Châu. Hoàng thượng dặn: thấy người {land} thì đón như đón người Đại Hy."},
  mid:{tag:"Còn chờ gió",t:"Gió chưa đổi. Mỗi đêm trên bến Minh Châu có một ngọn lửa, đốt cho người trên đảo."},
  lose:{tag:"Thuyền quay về",w:"v",t:"Thuyền cứu quay về tay không. {v} nói: biển đã quyết rồi, sao còn bắt người Đại Hy chết theo."}}});
rdDef("pt_hai",6,{t:"Người giữ kiêng",w:"emp",sj:"Thân Lão, người giữ kiêng trên thuyền",cast(A){if(ptP("thanlao","w")==="hb")ptMove("thanlao","nguc");return rdCast(A,["v"])},
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
  {n:"Thưa: thiếp xin Đại Hy cứu người ấy",wx:"Thái hậu thấy ngươi biết phải trái",lx:"{v} bảo ngươi chê lệ nước mình",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Thái hậu gật đầu: “Thế mới phải.”",rf:"Thái hậu nói: “Lệ nước nào nước ấy giữ.”"},
  {n:"Đáp: Đại Hy cũng từng tế người cho sông",wx:"{v} không đáp được",lx:"Thái hậu không vui",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Cả điện im lặng. {v} cúi đầu."},
  {n:"Cười, nói chuyện khác",wx:"không thêm chuyện",lx:"lời {v} đi khắp cung",rt:"Thái hậu hỏi sang chuyện hoa cúc."}]},
 c2:{h:"Chiếc lược trong tay nải",w:"maid",t:"Thân Lão nhờ người gửi vào cung một lời: lão giữ kiêng trọn chuyến. Nhưng lính ngục tìm thấy trong tay nải của lão một chiếc lược gỗ.",o:[
  {n:"Tin lão, xin thứ sử trả lại tay nải",wx:"Thân Lão biết ngươi tin lão",lx:"nếu lão nói dối, ngươi mất lời",rt:"Lão nhắn lại: chiếc lược là của con gái lão, lão chưa từng dùng.",go:()=>ptO("luoc","thanlao")},
  {n:"Xin mang chiếc lược lên kinh xem",wx:"có vật thật để xét",lx:"thủy thủ biết có chiếc lược",rt:"Chiếc lược nằm trên án ngươi: răng còn mới, không một sợi tóc.",go:()=>ptO("luoc","ta")},
  {n:"Để thứ sử giữ chiếc lược",wx:"không dính vào",lx:"chiếc lược thành chứng chống lão",rt:"Chiếc lược được niêm trong kho nha môn.",go:()=>ptO("luoc","kho")}]},
 t1:{h:"Đại sứ khó xử",w:"emp",t:"Tá Bá Kim Thành đến gặp ngươi: nếu ông không cho xử Thân Lão, thủy thủ sẽ không chịu chèo thuyền về. Nếu ông cho xử, Đại Hy sẽ nói {land} giết người.",o:[
  {n:"Khuyên đại sứ theo luật Đại Hy",f:"luat",wx:"sứ đoàn không mang tiếng",lx:"thủy thủ giận đại sứ",rt:"Đại sứ thở dài, viết lệnh cấm thủy thủ đụng vào Thân Lão.",go:()=>ptMeet("kimthanh")},
  {n:"Khuyên đại sứ cho lão chuộc tội bằng lễ thanh tẩy",f:"le",wx:"giữ được lệ mà không đổ máu",lx:"có người không chịu",rt:"Đại sứ cho dựng giếng đá ở bến, định ngày làm lễ.",go:()=>ptMeet("kimthanh")},
  {n:"Bảo đại sứ đó là việc của ông",f:"giu",wx:"ngươi không mang tiếng gì",lx:"đại sứ thấy ngươi bỏ mặc",rt:"Đại sứ cúi chào, ra về một mình.",go:()=>ptMeet("kimthanh")}]},
 x1:{h:"Phán xử ở Minh Châu",w:"emp",t:"Thứ sử Minh Châu tâu: phải quyết trong mười ngày, kẻo thủy thủ làm loạn. Hoàng thượng giao việc cho ngươi hỏi ý.",o:[
  {n:"Xin xử theo luật Đại Hy: gió không phải tội người",e:["win","lose"],rt:"Chiếu xuống: Thân Lão vô tội, được thả. Thủy thủ {land} nghe đọc chiếu, không ai nói gì.",rf:"Chiếu xuống, nhưng thủy thủ không chịu. Đại sứ đành cho xích Thân Lão, gửi về {land} theo chuyến thuyền buôn.",go:(_A,ok)=>ok?ptMove("thanlao","cang"):ptMove("thanlao","tn")},
  {n:"Xin cho lão làm lễ thanh tẩy rồi về nước",e:["win2","mid"],rt:"Lễ thanh tẩy làm ở bến. Thân Lão gội đầu dưới giếng đá, rồi lên thuyền buôn về {land}, còn sống.",rf:"Lễ chưa làm được, Thân Lão vẫn ngồi trong ngục.",go:(_A,ok)=>ok?ptMove("thanlao","tn"):""},
  {n:"Để thủy thủ xử theo lệ, giữ lòng sứ đoàn",e:"mid",lx:"một người chết vì một cơn gió",rt:"Thứ sử nhắm mắt cho qua. Sáng hôm sau thủy thủ {land} chịu chèo thuyền, không ai nhắc đến Thân Lão nữa.",go:()=>ptKill("thanlao")}]}},
 E:{win:{tag:"Gió không phải tội người",w:"emp",t:"Thân Lão ở lại bến Minh Châu sửa buồm cho sứ đoàn. Người {land} trong kinh kể: công chúa đã cứu một mạng người khỏi lệ cũ."},
  win2:{tag:"Lệ cũ không đổ máu",w:"emp",t:"Thân Lão về {land}, mang theo lời ngươi gửi phụ hoàng: lệ cũ giữ được mà không cần máu."},
  mid:{tag:"Việc ở Minh Châu khép lại",t:()=>ptAlive("thanlao")?"Thân Lão vẫn ngồi ngục Minh Châu, chờ một ngày ai đó nhớ ra lão.":"Thủy thủ {land} chèo thuyền, không ai nhắc đến người giữ kiêng nữa. Ngươi thì nhớ."},
  lose:{tag:"Xích sắt trên bến",w:"v",t:"Thân Lão bị xích về {land}. {v} nói: công chúa {land} cứu người không nổi, giữ lệ cũng không xong."}}});

rdDef("pt_hai",7,{t:"Thương thuyền Tân La",w:"emp",sj:"thương chủ Tân La Kim Hựu Thành",cast(A){if(ptO("nhatky")==="namlao")ptO("nhatky","huuthanh");return rdCast(A,["v"])},
 g:"Thương chủ Tân La Kim Hựu Thành cập bến Minh Châu, xin gặp người của ngươi. Thuyền ông đi qua hòn đảo trong thư Nham Lão: đảo trống, chỉ còn xác thuyền và dấu lửa. Ông nhặt được cuốn nhật ký hải trình của thuyền thứ tư, và biết ai đã đến đảo trước ông.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Thương chủ vào kinh",w:"emp",if:RDW(1),t:"Vì chuyện Thân Lão, cả bến Minh Châu biết công chúa {land} giữ lời. Kim Hựu Thành tự mình lên kinh, xin vào Hồng Lư tự gặp ngươi.",o:[
  {n:"Gặp ông ở Hồng Lư tự, có quan làm chứng",f:"tra",wx:"việc gặp thương nhân có người chứng",lx:"ông nói ít trước mặt quan",rt:"Kim Hựu Thành cúi chào kiểu Tân La, đặt cuốn nhật ký lên án nhưng tay vẫn giữ.",go:()=>{ptMove("huuthanh","kinh");return ptMeet("huuthanh")}},
  {n:"Cho {maid} ra gặp riêng",f:"mua",wx:"ông nói thật hơn",lx:"phi tần gặp riêng thương nhân, dễ thành chuyện",rt:"{maid} về kể: ông muốn một giấy phép buôn ở Minh Châu.",go:()=>{ptMove("huuthanh","kinh");return ptMeet("huuthanh")}},
  {n:"Mời đại sứ cùng gặp",f:"tra",wx:"có người {land} nhận đồ của {land}",lx:"đại sứ và thương nhân có thù cũ",rt:"Đại sứ nhận ra chữ của Nham Lão trên bìa nhật ký.",go:()=>{ptMove("huuthanh","kinh");ptMeet("kimthanh");return ptMeet("huuthanh")}}]},
 s2:{h:"Thư từ Minh Châu",w:"maid",if:RDW(0),t:"Kim Hựu Thành không dám lên kinh. Ông gửi thư: ai trả giá, người ấy có cuốn nhật ký.",o:[
  {n:"Gửi thư hỏi giá",f:"mua",wx:"biết ông muốn gì",lx:"ông biết ngươi cần",rt:"Ông trả lời: một giấy miễn thuế, hoặc bạc.",go:()=>ptMeet("huuthanh")},
  {n:"Nhờ thứ sử Minh Châu giữ thương thuyền lại",f:"tra",wx:"ông không đi được",lx:"ông thành kẻ thù",rt:"Thứ sử cho lính đứng ở mạn thuyền Tân La.",go:()=>ptMeet("huuthanh")},
  {n:"Gửi Thân Lão hoặc người {land} ở bến đến hỏi chuyện",f:"tra",wx:"người {land} nghe tận tai",lx:"thương nhân ngại người {land}",rt:()=>ptAlive("thanlao")&&ptP("thanlao","w")==="cang"?"Thân Lão đến thuyền Tân La, về kể: nhật ký có thật, chữ Nham Lão.":"Một thủy thủ {land} đến thuyền Tân La, về kể: nhật ký có thật, chữ Nham Lão.",go:()=>ptMeet("huuthanh")}]},
 c1:{h:"Giá của cuốn nhật ký",w:"emp",t:"Kim Hựu Thành nói thẳng: cuốn nhật ký ghi từng ngày thuyền thứ tư trôi, rương nào chở ở khoang nào. Ông không cho không.",o:[
  {n:"Trả bằng bạc",wx:"nhật ký về tay ngươi",lx:"bạc ra",rt:"Cuốn nhật ký về tay ngươi, còn mùi muối.",go:()=>ptO("nhatky","ta")},
  {n:"Hứa xin cho ông một giấy miễn thuế",wx:"không mất bạc",lx:"mang ơn một thương nhân",rt:"Ông trao nhật ký, cười: “Lời công chúa {land} đáng giá hơn bạc.”",go:()=>{ptO("giaythue","hua");return ptO("nhatky","ta")}},
  {n:"Xin Thị bạc ty thu cuốn nhật ký theo luật",wx:"đúng luật, không tốn gì",lx:"thương nhân giận, nhật ký vào kho",rt:"Thị bạc ty thu nhật ký, niêm vào kho. Ngươi phải xin mới được đọc.",rf:"Thị bạc ty nói nhật ký không phải hàng buôn, không thu.",go:(_A,ok)=>ok?ptO("nhatky","kho"):""}]},
 c2:{h:"Người của {v} ở Thị bạc ty",w:"v",need:["v"],t:"Biểu huynh của {v} làm việc ở Thị bạc ty Minh Châu. Y đòi khám cả thuyền Tân La, nói thương nhân giấu đồ cống của {land}.",o:[
  {n:"Xin cho khám, có người của ngươi đứng xem",wx:"khám công bằng",lx:"thương nhân mất mặt",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Khám ba ngày, không thấy đồ cống nào.",rf:"Khám ba ngày, biểu huynh của {v} lấy đi hai hòm hàng."},
  {n:"Tâu rằng biểu huynh {v} gây khó cho khách",wx:"chặn tay người của {v}",lx:"{v} biết ngươi chặn",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Biểu huynh {v} bị gọi về, mặt tối sầm."},
  {n:"Gửi thư bảo thương nhân nhường y một hòm hàng",wx:"yên chuyện",lx:"thương nhân mất của",rt:"Biểu huynh {v} nhận hòm hàng, không khám nữa."}]},
 t1:{h:"Ai đến đảo trước",w:"emp",t:"Trang cuối nhật ký ghi bằng nét run: “Thuyền buồm đen. Họ hỏi rương nào có ngọc.” Kim Hựu Thành nói: đó là thuyền giặc biển Đông Hải của Ô Cửu.",o:[
  {n:"Tâu ngay lên Hoàng thượng",f:"tra",wx:"triều đình biết kẻ bắt người",lx:"triều đình biết rương có ngọc",rt:"Hoàng thượng sai thủy sư dò tìm thuyền buồm đen."},
  {n:"Báo đại sứ, bàn riêng việc chuộc người",f:"mua",wx:"người {land} lo người {land}",lx:"Đại Hy chưa biết",rt:"Đại sứ nắm tay lại: “Ngọc thì chuộc được, người thì không thể thay.”",go:()=>ptMeet("kimthanh")},
  {n:"Giữ trang ấy, chưa nói với ai",f:"mua",wx:"có một con bài trong tay",lx:"người trên đảo phải chờ",rt:"Trang nhật ký được ép trong sách kinh của ngươi."}]},
 x1:{h:"Lời của thương nhân",w:"emp",t:"Kim Hựu Thành biết bến của Ô Cửu. Ông xin dẫn đường, đổi lấy một điều: thương thuyền Tân La được lập thương quán ở Minh Châu.",o:[
  {n:"Tâu xin cho Tân La lập thương quán ở Minh Châu",e:["win","lose"],rt:"Hoàng thượng chuẩn: thương quán Tân La mở ở bến Minh Châu. Kim Hựu Thành quỳ lạy, hẹn ngày dẫn đường.",rf:"Hộ bộ tâu: một phi tần đi xin quyền buôn cho thương nhân ngoại bang. Hoàng thượng gạt đi.",go:(_A,ok)=>ok?ptO("giaythue","huuthanh"):""},
  {n:"Hứa trả bạc khi người về đến bờ",e:["win","mid"],rt:"Kim Hựu Thành nhận lời: người về thì bạc về.",rf:"Ông nhận lời, nhưng không vội."},
  {n:"Cảm ơn ông, để thủy sư tự tìm",e:"mid",lx:"thủy sư không biết đường",rt:"Kim Hựu Thành cúi chào, về thuyền.",go:()=>ptMove("huuthanh","cang")}]}},
 E:{win:{tag:"Người dẫn đường",w:"emp",t:"Thương thuyền Tân La và thuyền thủy sư Đại Hy cùng chờ một con nước. Kim Hựu Thành đứng ở mũi thuyền, chỉ về phía đảo đá."},
  mid:{tag:"Biết tên kẻ bắt người",t:"Ngươi biết tên Ô Cửu. Biết tên thì chưa đủ; biển còn rộng."},
  lose:{tag:"Thương nhân ngoại bang",w:"v",t:"{v} kể: công chúa {land} cấu kết với thương nhân Tân La, đòi quyền buôn cho người ngoài. Kim Hựu Thành về Minh Châu, không ai tiễn.",go:()=>ptMove("huuthanh","cang")}}});
const PTFREE=()=>{for(const id of ["tieungoc","namlao"])if(ptAlive(id)&&ptP(id,"w")==="hb")ptMove(id,"cang");return""};/* .8: the held people come ashore */
rdDef("pt_hai",8,{t:"Giặc biển Đông Hải",w:"emp",sj:"thuyền buồm đen của Ô Cửu",cast(A){if(ptO("ruong")==="namlao")ptO("ruong","ocuu");if(ptO("nhatky")==="namlao")ptO("nhatky","ocuu");return rdCast(A,["v"])},
 g:"Thuyền buồm đen của Ô Cửu neo sau một dãy đảo đá ngoài cửa Minh Châu. Hắn gửi vào bờ một mảnh áo của Tiểu Ngọc và một lời: rương cống và mười bảy mạng người, đổi bằng ngọc trai và một bến không ai đuổi.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Kim Hựu Thành dẫn đường",w:"emp",if:()=>RDW(1)()&&ptAlive("huuthanh"),t:"Kim Hựu Thành vẽ cho thủy sư một tấm hải đồ: lối vào bến giặc chỉ đi được lúc nước ròng.",o:[
  {n:"Xin giữ hải đồ trong cung ngươi",f:"danh",wx:"có đường vào bến giặc",lx:"thủy sư không vui vì phải xin phi tần",rt:"Tấm hải đồ nằm trong hộp gỗ của ngươi.",go:()=>{ptMeet("huuthanh");return ptO("haido","ta")}},
  {n:"Trao hải đồ cho thủy sư",f:"danh",wx:"thủy sư biết đường",lx:"ngươi không còn giữ gì",rt:"Thủy sư nhận hải đồ, cảm ơn thương nhân.",go:()=>{ptMeet("huuthanh");return ptO("haido","kho")}},
  {n:"Nhờ thương nhân đưa thư cho Ô Cửu trước",f:"chuoc",wx:"giặc biết có người muốn nói",lx:"giặc biết người ta đang tìm",rt:"Thương thuyền Tân La treo cờ trắng, chở thư ra đảo.",go:()=>ptMeet("huuthanh")}]},
 s2:{h:"Lời nhắn bằng mảnh áo",w:"maid",if:()=>RDW(0)()||!ptAlive("huuthanh"),t:"{maid} run tay đưa mảnh áo: vải gai nhuộm chàm, mép áo thêu hình sóng, đúng tay Tiểu Ngọc thêu.",o:[
  {n:"Giữ mảnh áo, viết thư hỏi giá",f:"chuoc",wx:"giặc biết ngươi muốn chuộc",lx:"giặc biết ngươi sợ",rt:"Thư hỏi giá gửi theo thuyền chài ra đảo.",go:()=>ptO("manhao","ta")},
  {n:"Mang mảnh áo lên Hoàng thượng",f:"danh",wx:"ngài thấy người {land} bị bắt thật",lx:"ngài muốn đánh, có thể hại con tin",rt:"Hoàng thượng cầm mảnh áo, sai thủy sư sẵn thuyền.",go:()=>ptO("manhao","vua")},
  {n:"Đưa mảnh áo cho đại sứ",f:"chuoc",wx:"người {land} cùng quyết",lx:"đại sứ không có binh",rt:"Đại sứ cầm mảnh áo, nói: “Người thêu nó là người bế người.”",go:()=>{ptMeet("kimthanh");return ptO("manhao","kimthanh")}}]},
 c1:{h:"Ngọc trai hồi môn",w:"emp",t:"Giá chuộc là một hộp ngọc trai. Trong hồi môn của ngươi có đúng một hộp như thế, mẫu hậu gửi theo để làm của riêng.",o:[
  {n:"Đem hộp ngọc hồi môn ra",wx:"có ngay giá chuộc",lx:"mất của riêng của mẫu hậu",rt:"Hộp ngọc được gói trong lụa, chờ ngày mang ra đảo.",go:()=>ptO("ngoctrai","ta")},
  {n:"Xin Nội vụ phủ cho mượn ngọc của kho",wx:"giữ được của riêng",lx:"mang nợ Nội vụ phủ",rt:"Nội vụ phủ cho mượn, ghi vào sổ nợ của cung ngươi.",rf:"Nội vụ phủ nói ngọc của kho không để chuộc giặc.",go:(_A,ok)=>ok?ptO("ngoctrai","kho"):""},
  {n:"Xin đại sứ bán sách của sứ đoàn lấy ngọc",wx:"người {land} trả cho người {land}",lx:"sứ đoàn về nước tay không",rt:"Đại sứ bán ba rương sách vừa mua, đổi lấy ngọc.",go:()=>{ptMeet("kimthanh");return ptO("ngoctrai","kimthanh")}}]},
 c2:{h:"{v} nói chuộc giặc là nuôi giặc",w:"v",need:["v"],t:"{v} tâu với Thái hậu: chuộc người bằng ngọc thì năm sau giặc biển lại bắt thuyền Đại Hy.",o:[
  {n:"Thưa: thiếp chuộc người, Đại Hy diệt giặc sau",wx:"Thái hậu thấy ngươi nghĩ xa",lx:"{v} bảo ngươi hứa suông",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Thái hậu gật đầu.",rf:"Thái hậu nói: “Hứa thì phải làm.”"},
  {n:"Hỏi lại {v}: nếu người bị bắt là em gái nàng thì sao",wx:"{v} câm lặng",lx:"{v} thù ngươi",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Cả điện nhìn {v}. Nàng ta không đáp."},
  {n:"Im lặng, cúi đầu nghe",wx:"không thêm chuyện",lx:"Thái hậu nghiêng về {v}",rt:"Thái hậu bảo: việc biển để Hoàng thượng quyết."}]},
 t1:{h:"Thư trả lời Ô Cửu",w:"emp",t:"Ô Cửu đòi trả lời trong ba ngày. Ngươi cầm bút.",o:[
  {n:"Viết: ngọc sẽ đến, người phải lành",f:"chuoc",wx:"giặc giữ người cho tử tế",lx:"giặc biết ngươi sẽ trả",rt:"Thư đi. Thuyền chài về kể: người trên đảo được ăn cơm."},
  {n:"Viết: thủy sư Đại Hy đã ra khơi",f:"danh",wx:"giặc sợ",lx:"giặc có thể giết người rồi chạy",rt:"Thư đi. Thuyền buồm đen dời neo vào sâu trong dãy đảo.",rf:"Thư đi. Ô Cửu gửi lại một mảnh áo nữa."},
  {n:"Viết: xin ba ngày nữa để gom ngọc",f:"chuoc",wx:"có thêm thời gian",lx:"giặc nghi",rt:"Ô Cửu cho thêm ba ngày."}]},
 x1:{h:"Đêm ở dãy đảo đá",w:"emp",t:"Đêm nước ròng. Thuyền thủy sư nằm chờ sau mỏm đá, thương thuyền Tân La treo đèn. Hoàng thượng để ngươi quyết lời cuối.",o:[
  {n:"Xin thủy sư đánh đêm, cứu người",e:["win","lose"],rt:"Thủy sư áp mạn thuyền buồm đen lúc canh ba. Ô Cửu bị bắt sống, rương cống được khiêng về, người {land} lên thuyền Đại Hy, còn đủ.",rf:"Thủy sư áp mạn, giặc phóng lửa. Rương cống chìm theo thuyền buồm đen. Người ta vớt được Nham Lão; Tiểu Ngọc thì không.",go:(_A,ok)=>{if(ok){ptMove("ocuu","nguc");ptO("ruong","kho");if(ptO("nhatky")==="ocuu")ptO("nhatky","ta");return PTFREE()}ptMove("ocuu","hb");ptO("ruong","bien");if(ptO("nhatky")==="ocuu")ptO("nhatky","bien");ptKill("tieungoc");return PTFREE()}},
  {n:"Mang ngọc đến chuộc, thương thuyền Tân La làm trung gian",e:["win2","mid"],rt:"Hộp ngọc đổi lấy người và rương. Ô Cửu giữ lời, nhổ neo đi về phía đông.",rf:"Hộp ngọc đổi được người. Ô Cửu giữ lại rương cống, cười: “Lần sau.”",go:(_A,ok)=>{ptO("ngoctrai","ocuu");ptMove("ocuu","hb");if(ok){ptO("ruong","kho");if(ptO("nhatky")==="ocuu")ptO("nhatky","ta")}return PTFREE()}},
  {n:"Hứa cho Ô Cửu một bến ở Minh Châu, đổi lấy tất cả",e:"mid",lx:"giặc biển có bến trên đất Đại Hy",rt:"Ô Cửu trả người, trả rương, đổi cờ đen lấy cờ thương thuyền. Từ nay hắn neo ở bến Minh Châu như một thương nhân.",go:()=>{ptMove("ocuu","cang");ptO("ruong","kho");if(ptO("nhatky")==="ocuu")ptO("nhatky","ta");return PTFREE()}}]}},
 E:{win:{tag:"Lửa trên đảo đá",w:"emp",t:"Ô Cửu nằm trong ngục Minh Châu. Người {land} về bờ, đủ tên. Thủy sư Đại Hy kể chuyện đêm ấy khắp các bến."},
  win2:{tag:"Ngọc đổi người",w:"emp",t:"Người về, rương về, hộp ngọc của mẫu hậu đi theo thuyền buồm đen. Ngươi không tiếc."},
  mid:{tag:"Người về, biển còn giữ một phần",t:()=>ptP("ocuu","w")==="cang"?"Ô Cửu neo thuyền ở bến Minh Châu. Người ta không biết nên gọi hắn là giặc hay là khách.":"Người về bờ. Rương cống còn nằm trong khoang thuyền buồm đen, ở đâu đó phía đông."},
  lose:{tag:"Mảnh áo trên sóng",w:"v",t:"Thuyền buồm đen cháy, Ô Cửu thoát. Tiểu Ngọc không về. {v} nói: công chúa {land} gọi binh mà không cứu nổi người của mình."}}});

rdDef("pt_hai",9,{t:"Bến Minh Châu",w:"emp",sj:"những người sống sót của thuyền thứ tư",cast(A){return rdCast(A,["v"])},
 g:"Người của thuyền thứ tư lên bờ Minh Châu, ít hơn tên trong danh sách. Rương cống được khiêng vào nha môn; nhìn kỹ, dải niêm phong đỏ có một chỗ bị cắt rồi dán lại.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Tiểu Ngọc lên bờ",w:"maid",if:()=>ptAlive("tieungoc"),t:"Tiểu Ngọc gầy rộc, tóc bạc thêm. Bà nhờ người viết một dòng gửi lên kinh: “Công chúa của già có được ăn no không?”",o:[
  {n:"Xin cho Tiểu Ngọc lên kinh ở cạnh ngươi",f:"dua",wx:"có người thân bên mình",lx:"Nội vụ phủ không ưa người ngoài vào cung",rt:"Nội vụ phủ chuẩn cho Tiểu Ngọc vào hầu, ghi tên là nhũ mẫu công chúa.",rf:"Nội vụ phủ nói: phải chờ xét.",go:(_A,ok)=>ok?ptMove("tieungoc","kinh"):""},
  {n:"Gửi bạc và thuốc cho bà dưỡng sức ở Minh Châu",f:"giu",wx:"bà được nghỉ",lx:"bạc ra, xa mặt",rt:"Tiểu Ngọc ở nhà trọ bến Minh Châu, mỗi tuần có người mang thuốc."},
  {n:"Viết thư tay bằng chữ {land} gửi bà",f:"giu",wx:"bà biết ngươi còn nhớ tiếng mẹ đẻ",lx:"người Đại Hy hỏi ngươi viết gì",rt:"Tiểu Ngọc giữ lá thư trong vạt áo."}]},
 s2:{h:"Nham Lão kể lại",w:"maid",if:()=>!ptAlive("tieungoc"),t:"Nham Lão quỳ trước cửa nha môn Minh Châu: lão lái thuyền mà không giữ được người bế công chúa. Lão xin kể lại đêm cuối của Tiểu Ngọc.",o:[
  {n:"Nghe lão kể, ghi lại từng lời",f:"giu",wx:"ngươi biết bà chết thế nào",lx:"nỗi đau mở lại",rt:"Bà nhảy xuống nước để giữ hộp thư của mẫu hậu gửi ngươi. Hộp thư chìm theo bà.",go:()=>ptAlive("namlao")?ptMeet("namlao"):""},
  {n:"Lập bàn thờ Tiểu Ngọc ở bến",f:"dua",wx:"thủy thủ {land} khóc theo ngươi",lx:"Thái hậu không ưa lễ lạ",rt:"Bàn thờ nhỏ đặt ở bến, quay mặt về phía đông."},
  {n:"Bảo Nham Lão đứng dậy, lão không có tội",f:"dua",wx:"lão nhớ ơn ngươi",lx:"thủy thủ cho là ngươi tha dễ quá",rt:"Nham Lão đứng dậy, không nói được gì.",go:()=>ptAlive("namlao")?ptMeet("namlao"):""}]},
 c1:{h:"Niêm phong bị cắt",w:"emp",t:"Dải niêm phong của rương cống bị cắt ngọt rồi dán lại bằng hồ gạo, mà giặc biển không dùng hồ gạo. Sổ nha môn ghi: rương đã qua tay Thị bạc ty một đêm.",o:[
  {n:"Xin mang dải niêm phong lên kinh",wx:"có chứng trong tay",lx:"Thị bạc ty biết ngươi để ý",rt:"Dải niêm phong được ép trong hộp gỗ của ngươi.",go:()=>ptO("niem","ta")},
  {n:"Xin thứ sử ghi tên người đã mở rương",wx:"biết người mở",lx:"thứ sử ngại đụng Thị bạc ty",rt:"Thứ sử ghi tên ba người trực đêm ấy.",rf:"Thứ sử nói sổ trực đã mất trang.",go:()=>ptO("niem","kho")},
  {n:"Bỏ qua, miễn rương về kinh",wx:"rương đi nhanh",lx:"chứng có thể mất",rt:"Rương được dán niêm mới, lên đường.",go:()=>ptO("niem","chay")}]},
 c2:{h:"Biểu huynh {v} xin giữ rương",w:"v",need:["v"],t:"Biểu huynh {v} ở Thị bạc ty xin giữ rương thêm mười ngày để đối sổ. {v} gửi lời: đó là phép.",o:[
  {n:"Đồng ý, cử người đứng canh",wx:"đúng phép, có người canh",lx:"mười ngày chậm",go:(A,ok,G)=>{rdRel(A,"v",ok?G[0]:G[1]);return""},rt:"Người của ngươi ngồi cạnh rương mười đêm.",rf:"Người của ngươi bị đuổi ra ngoài đêm thứ ba."},
  {n:"Tâu xin rương đi thẳng về Hồng Lư tự",wx:"rương thoát tay Thị bạc ty",lx:"{v} biết ngươi nghi nhà nàng",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return""},rt:"Chiếu xuống: rương về Hồng Lư tự."},
  {n:"Gửi lễ vật cho biểu huynh {v}",wx:"yên chuyện",lx:"bạc ra, người ta biết ngươi lót tay",rt:"Biểu huynh {v} cười, cho rương đi."}]},
 t1:{h:"Ai hộ tống rương về kinh",w:"emp",t:"Rương cống phải đi mười ngày đường bộ lên kinh. Ai đi theo rương, người ấy chịu trách nhiệm nếu thiếu.",o:[
  {n:"Xin đại sứ tự đi theo rương",f:"giu",wx:"người {land} giữ đồ {land}",lx:"nếu thiếu, đại sứ mang tội",rt:"Đại sứ cưỡi ngựa đi sát xe rương.",go:()=>{ptMeet("kimthanh");return ptO("ruong",ptO("ruong")==="kho"?"kimthanh":ptO("ruong"))}},
  {n:"Để Hồng Lư tự hộ tống theo phép",f:"dua",wx:"đúng phép Đại Hy",lx:"không có người của ngươi",rt:"Quan Hồng Lư tự niêm lại rương, ký tên.",go:()=>ptO("ruong",ptO("ruong")==="kho"?"hl":ptO("ruong"))},
  {n:"Gửi người sống sót đi cùng rương",f:"dua",wx:"có nhân chứng đi theo",lx:"người bệnh đi đường xa",rt:"Thủy thủ {land} đi bộ theo xe rương, chân còn quấn vải."}]},
 x1:{h:"Đưa người sống sót về kinh",w:"emp",t:"Hoàng thượng hỏi: có nên cho người sống sót vào chầu, kể chuyện biển trước triều không. Có người nói làm thế là làm nhục thủy sư; có người nói làm thế thì cả triều tin {land}.",o:[
  {n:"Xin cho họ vào chầu, kể từ đầu",e:["win","lose"],rt:()=>`Người sống sót quỳ giữa điện, kể từng ngày trôi trên biển. ${PTNGOC()} kể đến đoạn giặc biển thì cả điện lặng đi.`,rf:"Người sống sót run quá, không kể nổi. Thủy sư tâu: người {land} nói không rõ."},
  {n:"Xin cho họ ở lại Minh Châu chữa bệnh, chờ thuyền về",e:["win","mid"],rt:"Hoàng thượng chuẩn: người sống sót ở nhà trọ quan, ăn lương Minh Châu đến gió mùa.",rf:"Hoàng thượng chuẩn, nhưng lương Minh Châu cấp thiếu."},
  {n:"Để Hồng Lư tự lo theo lệ khách",e:"mid",lx:"không ai nghe họ kể",rt:"Hồng Lư tự ghi tên, cấp áo, xếp chỗ ở."}]}},
 E:{win:{tag:"Người của biển về bờ",w:"emp",t:"Triều Đại Hy biết thuyền thứ tư đã trôi thế nào. Không ai còn nói {land} gửi nửa phần cống."},
  mid:{tag:"Ở lại bến chờ gió",t:"Người sống sót ở lại bến Minh Châu. Mỗi chiều họ ra bến nhìn về phía đông."},
  lose:{tag:"Lời kể không rõ",w:"v",t:"Thủy sư tâu: người {land} kể lộn xộn. {v} nói: người lạc biển thì kể gì chẳng được."}}});
rdDef("pt_hai",10,{t:"Kiểm cống",w:"emp",sj:"rương cống của {land}",cast(A){return rdCast(A,["v"])},
 g:()=>(ptO("ruong")==="bien"||ptO("ruong")==="ocuu"?"Rương cống của thuyền thứ tư không về. ":"")+"Hồng Lư tự đối chiếu cống phẩm với danh sách sứ đoàn trước mặt Hộ bộ và các phi tần. Lụa mốc nửa phần, hộp ngọc trai trống một ngăn. {v} nói: rương niêm ở {land} mà thiếu ở Đại Hy, chỉ có người từng cầm danh sách mới biết thiếu chỗ nào.",
 p:[["s1","s2"],["c1","c2"],["t1"],["x1"]],
 B:{s1:{h:"Nhật ký trong tay ngươi",w:"emp",if:PTLOG,t:"Cuốn nhật ký hải trình nằm trong hộp gỗ của ngươi. Trang nào cũng có chữ Nham Lão: ngày nào nước vào khoang, rương nào bị ướt.",o:[
  {n:"Dâng nhật ký lên Hồng Lư tự",f:"chung",wx:"lụa mốc có lời giải",lx:"nhật ký ra khỏi tay ngươi",rt:"Tự khanh đọc đến trang mười một: “Khoang hai ngập ba ngày.” Lụa mốc là vì thế.",go:()=>ptO("nhatky","hl")},
  {n:"Đọc to từng trang trước mặt mọi người",f:"chung",wx:"cả điện nghe",lx:"đọc lâu, Hộ bộ sốt ruột",rt:"Ngươi đọc đến khi Hộ bộ giơ tay: “Đủ rồi.”"},
  {n:"Chép trang về rương ngọc, giữ bản gốc",f:"nhuong",wx:"vẫn giữ được bản gốc",lx:"bản chép kém tin",rt:"Bản chép được đặt lên án Tự khanh."}]},
 s2:{h:"Không có nhật ký",w:"emp",if:()=>!PTLOG(),t:"Cuốn nhật ký không ở trong tay ngươi. Ngươi chỉ còn lời người.",o:[
  {n:"Xin gọi Kim Hựu Thành làm chứng",f:"chung",wx:"một người ngoài nói giúp",lx:"thương nhân nói thì kém tin",rt:()=>ptAlive("huuthanh")&&["kinh","cang"].includes(ptP("huuthanh","w"))?"Kim Hựu Thành kể: ông thấy rương còn niêm khi trên đảo.":"Kim Hựu Thành đã đi biển, chỉ gửi được một tờ khai.",go:()=>ptAlive("huuthanh")?ptMeet("huuthanh"):""},
  {n:"Xin gọi Nham Lão làm chứng",f:"chung",wx:"người lái thuyền nói",lx:"lão là người {land}",rt:()=>ptAlive("namlao")?"Nham Lão kể từng ngày nước vào khoang.":"Nham Lão không còn. Chỉ có tên lão trong danh sách.",go:()=>ptAlive("namlao")?ptMeet("namlao"):""},
  {n:"Nhận: thiếp không có chứng, xin xét theo danh sách",f:"nhuong",wx:"thật thà",lx:"không có gì đỡ",rt:"Tự khanh gật đầu, đọc tiếp danh sách."}]},
 c1:{h:"Chiếc trâm ngọc trai",w:"v",need:["v"],t:"{v} dâng một chiếc trâm ngọc trai, nói cung nữ tìm thấy dưới gối trong cung ngươi: ngọc đúng loại trong rương cống.",o:[
  {n:"Xin gọi thợ bạc xem ngọc từ đâu",wx:"ngọc có nguồn gốc của nó",lx:"thợ bạc có thể nói sai",go:(A,ok,G)=>{if(!ok)rdOan(A,"v",G[0]);return ok?ptO("tram","kho"):ptO("tram","v")},rt:"Thợ bạc nói: ngọc này mài kiểu Đại Hy, không phải ngọc {land}.",rf:"Thợ bạc ngập ngừng: ngọc giống ngọc {land}."},
  {n:"Hỏi lại: cung nữ nào tìm thấy, vào cung thiếp lúc nào",wx:"lật lại câu hỏi về phía {v}",lx:"{v} giận",go:(A,_ok,G)=>{rdOan(A,"v",G[0]);return ptO("tram","kho")},rt:"Cung nữ ấy lắp bắp, không nhớ giờ."},
  {n:"Nhận đó là ngọc hồi môn của mình",wx:"không cãi nhau giữa điện",lx:"người ta tin {v} một nửa",go:()=>ptO("tram","ta"),rt:"Ngươi cài trâm lên tóc, nói: “Mẫu hậu cho.”"}]},
 c2:{h:"Hộ bộ đòi bồi",w:"emp",t:"Hộ bộ tâu: thiếu thì phải bồi. Nếu {land} không bồi, sổ cống ghi {land} lỗi lễ.",o:[
  {n:"Bỏ bạc riêng bồi phần thiếu",wx:"sổ cống sạch",lx:"bạc ra",rt:"Hộ bộ nhận bạc, xóa dòng thiếu."},
  {n:"Xin chờ thuyền năm sau bồi",wx:"không mất bạc",lx:"sổ ghi nợ một năm",rt:"Hộ bộ ghi: nợ đến gió mùa năm sau."},
  {n:"Tâu: biển làm mất, không ai bồi biển",wx:"giữ thể diện {land}",lx:"Hộ bộ không vui",rt:"Hoàng thượng cười: “Nàng nói phải.”",rf:"Hộ bộ tâu thêm hai lần."}]},
 t1:{h:"Ba người trực đêm ấy",w:"emp",t:"Tên ba người trực ở Thị bạc ty đêm rương qua tay: hai lính, và biểu huynh của {v}.",o:[
  {n:"Trình dải niêm phong, xin tra biểu huynh {v}",f:"chung",wx:"đổi người bị nghi",lx:"đụng đến nhà {v}",rt:()=>ptO("niem")==="ta"?"Dải niêm phong cắt ngọt, hồ gạo còn trắng. Hộ bộ cho gọi biểu huynh {v}.":"Ngươi không còn dải niêm phong; Hộ bộ chỉ ghi lời ngươi."},
  {n:"Gọi riêng hai lính trực hỏi chuyện",f:"chung",wx:"có người nói thật",lx:"lính sợ, khai nửa chừng",rt:"Một tên lính khai: đêm ấy có người mang kéo vào kho."},
  {n:"Không đụng đến nhà {v}",f:"nhuong",wx:"không thêm thù",lx:"kẻ cắt niêm thoát",rt:"Tên biểu huynh {v} không được ai nhắc."}]},
 x1:{h:"Trước án Hồng Lư tự",w:"emp",t:"Tự khanh hỏi lời cuối: phần thiếu là do biển, do người {land}, hay do người Đại Hy.",o:[
  {n:"Trình đủ chứng, xin tra người cắt niêm",e:["win","lose"],rt:"Biểu huynh {v} bị đánh hai mươi trượng, phải trả ngọc. Sổ cống ghi: {land} cống đủ.",rf:"Chứng không đủ. Tự khanh phán: người giữ danh sách phải chịu. Ngươi bị cấm túc.",go:(_A,ok)=>ok?"":ptConfine("hai10")},
  {n:"Nhận phần thiếu, xin bù bằng hồi môn, không truy ai",e:["win2","mid"],rt:"Hồi môn của ngươi bù đủ. Hoàng thượng khen ngươi biết giữ hòa khí.",rf:"Hồi môn bù được nửa. Sổ còn ghi nợ."},
  {n:"Xin Hoàng thượng tự xét",e:"mid",lx:"không ai được rửa tiếng",rt:"Hoàng thượng phê: việc cống phẩm khép lại, không truy."}]}},
 E:{win:{tag:"Niêm phong biết nói",w:"emp",t:"Cả triều biết rương cống đã bị mở ở đâu. {v} không dự yến ba tháng."},
  win2:{tag:"Bù cống, giữ hòa khí",w:"emp",t:"Sổ cống sạch. Không ai mất mặt, trừ hồi môn của ngươi."},
  mid:{tag:"Sổ cống khép lại",t:"Việc cống khép lại, không ai bị truy. Người cắt niêm vẫn ở Thị bạc ty."},
  lose:{tag:"Cấm túc vì rương cống",w:"v",t:"Ngươi bị cấm túc. {v} kể: công chúa {land} giữ danh sách mà để mất ngọc."}}});

rdDef("pt_hai",11,{t:"Danh sách sứ đoàn",w:"emp",sj:"danh sách sứ đoàn về nước",cast(A){if(!ptO("danhsach")||ptO("danhsach")==="kimthanh")ptO("danhsach","ta");return rdCast(A,["v"])},
 g:"Gió mùa đã đổi. Sứ đoàn sắp về {land}. Tá Bá Kim Thành mang bản danh sách đến, xin ngươi đọc lần cuối: người sống ghi mực đen, người chết ghi mực son. Tên nào ghi màu gì, {quan} sẽ đọc.",
 p:[["s1","s2"],["c1","c2","c3"],["t1"],["x1"]],
 B:{s1:{h:"Tiểu Ngọc muốn gì",w:"maid",if:()=>ptAlive("tieungoc"),t:()=>`Tiểu Ngọc ${ptP("tieungoc","w")==="kinh"?"đứng hầu sau lưng ngươi":"gửi thư từ bến Minh Châu"}: bà già rồi, muốn chết ở quê, nhưng không muốn bỏ ngươi.`,o:[
  {n:"Giữ bà lại bên mình",f:"that",wx:"có người thân đến cuối đời",lx:"bà nhớ quê",rt:"Tiểu Ngọc ở lại. Bà dạy {maid} nấu {canh}.",go:()=>ptMove("tieungoc","kinh")},
  {n:"Cho bà về {land} theo thuyền",f:"an",wx:"bà được về quê",lx:"ngươi một mình",rt:"Tiểu Ngọc lên thuyền, ôm ngươi một lần cuối.",go:()=>ptMove("tieungoc","tn")},
  {n:"Để bà tự chọn",f:"that",wx:"bà biết ngươi tôn trọng bà",lx:"bà khó nghĩ",rt:"Tiểu Ngọc chọn ở lại.",go:()=>ptMove("tieungoc","kinh")}]},
 s2:{h:"Mực son",w:"maid",if:()=>!ptAlive("tieungoc"),t:"Trong danh sách, tên Tiểu Ngọc chờ được ghi. Đại sứ hỏi ngươi ghi bằng mực gì.",o:[
  {n:"Tự tay ghi tên bà bằng mực son",f:"that",wx:"{quan} biết bà chết vì ai",lx:"tay ngươi run",rt:"Ngươi ghi tên bà, thêm một dòng: chết vì giữ thư của mẫu hậu."},
  {n:"Ghi bà là ‘ở lại hầu công chúa’",f:"an",wx:"mẫu hậu không đau lòng",lx:"một lời nói dối đi qua biển",rt:"Đại sứ nhìn ngươi, rồi ghi theo."},
  {n:"Gửi kèm một lá thư riêng cho mẫu hậu",f:"that",wx:"mẹ biết từ chính con",lx:"thư đi lâu",rt:"Lá thư gói trong giấy dầu, đặt trên cùng rương."}]},
 c1:{h:"Thân Lão xin về",w:"emp",if:()=>ptAlive("thanlao")&&ptP("thanlao","w")==="cang",t:"Thân Lão nhắn từ Minh Châu: lão xin được giữ kiêng cho thuyền về. Thủy thủ còn ngại.",o:[
  {n:"Viết thư bảo thủy thủ nhận lão",wx:"lão được giữ nghề",lx:"thủy thủ còn ngại",rt:"Thủy thủ nhận Thân Lão. Lão cạo đầu, ngồi ở mũi thuyền.",go:()=>ptMove("thanlao","tn")},
  {n:"Cho lão ở lại Minh Châu sửa buồm",wx:"lão yên thân",lx:"lão buồn vì không được về",rt:"Thân Lão ở lại bến, vá buồm cho thuyền buôn."},
  {n:"Gửi lão về như một hành khách",wx:"về mà không giữ kiêng",lx:"lão thấy mình thừa",rt:"Thân Lão lên thuyền, ngồi ở đuôi.",go:()=>ptMove("thanlao","tn")}]},
 c2:{h:"Ô Cửu trong ngục",w:"emp",if:()=>ptAlive("ocuu")&&ptP("ocuu","w")==="nguc",t:"Ô Cửu trong ngục Minh Châu xin được đưa về {land} chịu xử, vì hắn từng là thủy thủ {land} trước khi làm giặc.",o:[
  {n:"Xin Đại Hy xử hắn theo luật Đại Hy",wx:"giặc chịu tội nơi hắn gây tội",lx:"{land} thấy mất một người của mình",rt:"Ô Cửu bị xử trảm ở bến Minh Châu.",go:()=>ptKill("ocuu")},
  {n:"Xin giao hắn cho sứ đoàn đưa về {land}",wx:"{land} tự xử người của {land}",lx:"Đại Hy cho là ngươi bao che",rt:"Ô Cửu bị xích lên thuyền sứ đoàn.",go:()=>ptMove("ocuu","tn")},
  {n:"Xin tha cho hắn làm lính thủy Minh Châu",wx:"một tay lái giỏi về phe Đại Hy",lx:"người ta sợ hắn trở mặt",rt:"Ô Cửu quỳ nhận lệnh, đổi cờ đen lấy cờ Đại Hy.",go:()=>ptMove("ocuu","cang")}]},
 c3:{h:"Thư gửi mẫu hậu",w:"maid",t:"Thuyền về sẽ mang theo thư. Ngươi viết cho {mh} điều gì?",o:[
  {n:"Viết thật mọi điều đã xảy ra",wx:"mẹ hiểu con",lx:"mẹ lo",rt:"Thư dài ba tờ, chữ nhỏ."},
  {n:"Viết rằng con được yêu chiều, mọi điều yên ổn",wx:"mẹ yên lòng",lx:"một lời nói dối",rt:"Thư ngắn, chữ đẹp."},
  {n:"Gửi kèm tấm gương đồng của mẹ về",wx:"mẹ thấy con còn giữ lời",lx:"ngươi không còn gì của mẹ",rt:"Tấm gương đồng gói trong lụa, nằm trên cùng rương thư.",go:()=>ptO("guong","tn")}]},
 t1:{h:"Ai lái thuyền về",w:"emp",t:()=>ptAlive("namlao")?"Nham Lão xin lái chiếc thuyền về, để chuộc lỗi thuyền thứ tư.":"Không còn Nham Lão. Thuyền về cần một tay lái biết đường qua Ngũ Đảo.",o:[
  {n:"Giao thuyền cho người {land} lái",f:"that",wx:"người {land} đưa người {land} về",lx:"đường biển vẫn khó",rt:()=>ptAlive("namlao")?"Nham Lão cầm lái, cười lần đầu từ ngày lên bờ.":"Một thủy thủ già nhận lái.",go:()=>ptAlive("namlao")?ptMove("namlao","tn"):""},
  {n:"Xin một tay lái Tân La dẫn đường",f:"an",wx:"người quen biển dẫn",lx:"phải trả công",rt:"Kim Hựu Thành cho một tay lái già của ông theo thuyền."},
  {n:"Xin Hoàng thượng cho hải đồ của thủy sư",f:"an",wx:"có đường biển Đại Hy",lx:"hải đồ Đại Hy ra khỏi nước",rt:"Hoàng thượng cho chép một bản hải đồ gửi theo.",go:()=>ptO("haido","tn")}]},
 x1:{h:"Đêm trước ngày thuyền đi",w:"emp",t:"Đêm cuối, đại sứ quỳ trước ngươi với bản danh sách: “Nếu {quan} thấy quá nhiều tên mực son, sứ đoàn năm sau sẽ không đi nữa. Xin công chúa quyết.”",o:[
  {n:"Ghi đủ tên người chết bằng mực son, xin Đại Hy làm lễ tế biển",e:["win","lose"],rt:"Hoàng thượng cho làm lễ tế biển ở Minh Châu. Tên từng người chết được đọc to. Đại sứ khóc.",rf:"Triều thần tâu: Đại Hy không tế người ngoại bang. Lễ không làm được.",go:()=>ptO("danhsach","kimthanh")},
  {n:"Ghi người chết là ‘ở lại Đại Hy học đạo’",e:["win2","mid"],rt:"Danh sách đi về {land} toàn mực đen. Sứ đoàn năm sau sẽ đi.",rf:"Danh sách toàn mực đen, nhưng thủy thủ biết, và thủy thủ nói.",go:()=>ptO("danhsach","kimthanh")},
  {n:"Xin Hoàng thượng cho thuyền Đại Hy hộ tống sứ đoàn",e:"mid",lx:"tốn thuyền của thủy sư",rt:"Hai thuyền thủy sư đi kèm đến Ngũ Đảo. Danh sách đi theo đại sứ, như cũ.",go:()=>ptO("danhsach","kimthanh")}]}},
 E:{win:{tag:"Người đếm tên kẻ chết đuối",w:"emp",t:"Thuyền đi. Danh sách mang tên từng người chết, và tên ngươi bên dưới, người đã đếm.",go:()=>ptMove("kimthanh","tn")},
  win2:{tag:"Danh sách toàn mực đen",w:"emp",t:"Thuyền đi. Ở {land}, {quan} đọc danh sách toàn mực đen, và gửi thêm thuyền cho năm sau.",go:()=>ptMove("kimthanh","tn")},
  mid:{tag:"Thuyền về Nan Ba",t:"Thuyền đi theo gió mùa. Ngươi đứng ở bến Minh Châu đến khi cánh buồm cuối cùng khuất.",go:()=>ptMove("kimthanh","tn")},
  lose:{tag:"Lễ không thành",w:"v",t:"Thuyền đi mà không có lễ. {v} nói: người chết của {land}, Đại Hy không có nghĩa vụ khóc.",go:(_A,G)=>{ptMove("kimthanh","tn");return e67bien(G[0])}}}});
RD97L.push(rdRare({a:"pt_hai_11",tag:"Đèn trên mặt bể",w:"emp",n:"Thả trăm ngọn đèn giấy trên biển, mỗi ngọn một tên",
 path:["Đứng cạnh đại sứ","Dâng ngay lá thư","Gửi ngay gạo và nước","Thuê thương thuyền Tân La","Xin xử theo luật Đại Hy","Tin lão","Trả bằng bạc","Tâu xin cho Tân La","Xin thủy sư đánh đêm","Mang ngọc đến chuộc","Xin cho họ vào chầu","Trình đủ chứng","Tự tay ghi tên bà","Ghi đủ tên người chết"],
 bad:["Để thủy thủ xử theo lệ","Hứa cho Ô Cửu một bến","Ghi người chết là"],x:[()=>S.duc>=RR("pt_hai_11").bar,"Đức từ "+RR("pt_hai_11").bar],
 t:"Đêm thuyền đi, ngươi xin cho thả trên biển Minh Châu những ngọn đèn giấy, mỗi ngọn viết một tên người đã ra khơi mà không về, cả người {land} lẫn thủy sư Đại Hy chết trong đêm đảo đá. Đèn trôi về phía đông theo con nước. Hoàng thượng đứng bên ngươi đến khi ngọn cuối cùng tắt, rồi sai treo trước cung ngươi một tấm biển ngự bút.",
 go:(_A,G)=>e67bien(G[0]),rw:"bienngu",ti:"Đèn trên mặt bể"}));


/* =====================================================================================================================================
   pt_su · Khiển Đường sứ — lead (E21)
   ===================================================================================================================================== */
