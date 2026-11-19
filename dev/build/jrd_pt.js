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

/* =====================================================================================================================================
   pt_su · Khiển Đường sứ — lead (E21)
   ===================================================================================================================================== */
