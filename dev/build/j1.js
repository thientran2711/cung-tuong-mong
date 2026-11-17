/* ONE per-life registry (review/newlife-reset, owner bug 17/11): S and rivals are rebuilt by start() / deser(); every OTHER store that belongs to one
   life (module-level lets, window.* holding people, timers, scenes) registers itself here: lifeStore(name, reset). j93 kmReset runs every reset on
   start() (new game, Luân hồi rebirth, co-op new life), on a slot load and on the title screen. LIFE_STORES = the names (dev/test/newlife-leak.js
   checks no store outside this list still holds the old life). Static caches of art / words (KAK_C, KIT_TONE_CACHE, PETC_CACHE…) need no entry. */
const LIFE_REG=[],LIFE_STORES=window.LIFE_STORES=[];function lifeStore(n,f){LIFE_REG.push([n,f]);LIFE_STORES.push(n)}lifeStore("__kitLastEvArt",()=>{window.__kitLastEvArt=null});
const RANKS=[
 {n:"Đáp ứng",s:0,d:0},{n:"Thường tại",s:15,d:10},{n:"Quý nhân",s:25,d:20},{n:"Tần",s:38,d:30},
 {n:"Phi",s:52,d:42},{n:"Quý phi",s:66,d:55},{n:"Hoàng quý phi",s:78,d:68},{n:"Hoàng hậu",s:85,d:78}];
/* palace heads (chủ vị): Tần, Phi, Quý phi, Hoàng quý phi (owner 11/14, OWNER_DECISIONS) — rank index ≥ PAL_HEAD */
const PAL_HEAD=3;
/* KIT 1.3 · THE ONE RANK PALETTE (owner 11/16 13:00Z "nhạt nhòa quá → tươi hơn"; jewel tones): every rank colour in the game is read from here (ring, halo, chips, card colour, portrait ground
   .rk-cN, text tone via kitToneOf in jk4). Vivid bases, same colour family per rank; text on paper is DERIVED (kitToneOf), never typed again. Nobody keeps a copy. */
const RCOL=["#c4861a","#12b84a","#1f6cff","#ff3d8f","#a23cff","#ff1f3d","#ff6a00","#ffc400"];/* Đáp ứng champagne-bronze, Thường tại green, Quý nhân blue, Tần pink, Phi purple, Quý phi red, Hoàng quý phi orange, Hoàng hậu gold */
const RCOL_COLD="#8fa3b8";/* Lãnh cung / Phế phi: cool steel grey */
window.MRCOL=["#3aa38f","#00bf94","#2f6fff","#ff4a1c","#9b4dff"];/* maids: thô sử grey-jade, cung nữ jade, đại cung nữ blue, chưởng sự cô cô terracotta, nữ quan violet */
window.ERCOL=["#6fb03a","#12b35a","#1f8fe0","#d9601a"];/* eunuchs: tiểu thái giám sage, thái giám green, thủ lĩnh steel blue, tổng quản bronze */
const KIT_IMP="#ffd400";/* ONE imperial yellow token (owner 11/16 16:10Z: "màu vàng của hoàng gia, màu vàng tươi") for Hoàng thượng AND Hoàng thái hậu; kitToneOf keeps it as is, the ink edge is in jk4 */
const KIT_ROLE={emp:KIT_IMP,th:KIT_IMP,ty:"#12b5ac",prince:"#1f9be8",princess:"#f0543c",stranger:"#6e7681",official:"#3a6fe0",guard:"#5879a8",mama:"#b97a2a",slate:"#5a7a9a"};/* non-rank roles (never pink/purple for men) */
const ORIGINS=[
 {k:"tt",n:"Con gái Tể tướng",r:2,o:{danh:25,bac:150},hh:-15,th:5,art:{cam:1},t:"Nhà quyền thế. Hoàng hậu coi ngươi là mối lo."},
 {k:"dtq",n:"Con gái Đại tướng quân",r:1,o:{danh:15,suc:100,bac:80},hh:0,th:0,t:"Cha giữ binh quyền biên ải. Thân thể khỏe mạnh."},
 {k:"muoi",n:"Con gái nhà buôn muối",r:0,o:{bac:320},hh:0,th:-5,t:"Giàu mà xuất thân thấp. Có bạc để mua lòng người."},
 {k:"cn",n:"Cung nữ được sủng hạnh",r:1,o:{sung:20,bac:60,mat:3,danh:6,suc:10},hh:0,th:5,art:{y:2},ally:1,t:"Từng hầu trà ở Càn Thanh cung. Quen biết khắp đám cung nhân."},
 {k:"nc",n:"Công chúa nước Nam Chiếu hòa thân",r:3,o:{danh:30,bac:120},hh:0,th:-15,art:{vu:1},t:"Người ngoại tộc. Thái hậu không ưa."},
 {k:"td",n:"Con gái tội thần",r:0,o:{bac:70,sung:10,thu:1,tamco:15,tai:15,danh:6,mat:2},hh:0,th:0,art:{thi:1},ally:1,t:"Cả nhà bị xử trảm. Ngươi vào cung để báo thù."},
 {k:"ch",n:"Cháu gái Thái hậu",r:2,o:{danh:20,bac:100},hh:-5,th:40,t:"Có Thái hậu chống lưng."},
 {k:"thd",n:"Con gái thầy đồ nghèo",r:0,o:{bac:20,tai:20,duc:10},hh:5,th:0,art:{thi:1},t:"Thơ văn hơn người, ngoài ra không có gì."}
];
const SURN=["Thẩm","Tô","Lâm","Diệp","Ôn","Hạ","Mộ Dung","Bạch","Liễu","Cố","Tạ","Vân","Chu","Trịnh","Phùng","Lục","Tống","Hàn","Lý","Đường","Thượng Quan","Âu Dương","Hoa","Kiều","Tần","Nhan","Mạnh","Từ","Khương","Đoan Mộc"];
const GIVEN=["Mi Trang","Uyển Nhi","Thanh Ca","Lan Chi","Như Ý","Nguyệt Hoa","Tuyết Dao","Cẩm Tú","Ngọc Hành","Tịnh Nghi","Lăng Vân","Thục Nghi","Diễm Thu","Hàm Hương","Bích Dao","Linh Lung","Yên Nhiên","Tố Tâm","Mạn Châu","Khinh Vũ","Tử Yên","Vân Thường","Nhược Lan","Hải Đường","Thanh Liên","Mộng Điệp","Ngưng Sương","Tú Uyển","Phương Hoa","Họa Mi","Vân Khanh","Bạch Lộ","Kiều Nguyệt","Thủy Tiên","Hồng Diệp","Tịch Nhan","Lạc Anh","Băng Tâm","Ngọc Dao","Dao Cầm"];
const MALEN=["Văn Uyên","Tử Khiêm","Minh Viễn","Thừa Chí","Lục Trường","Tiêu Viễn","Hàn Phong","Lăng Vân","Kính Chi","Bá Ngôn"];
const TRAITS=[["Hiểm độc",80],["Kiêu ngạo",55],["Hiền lành",15],["Đa nghi",45],["Tham vọng",65],["Nhu mì",25]];
const SEASON=["Xuân","Xuân","Xuân","Hạ","Hạ","Hạ","Thu","Thu","Thu","Đông","Đông","Đông"];
const TUAN=["thượng tuần","trung tuần","hạ tuần"];
const MAIDS=["Tiểu Đào","Bích Ngọc","Xuân Hạnh","Thu Cúc","Hồng Liên","Tiểu Thúy","Lục Châu","Hạ Vân","Tố Cầm","Ngọc Lan"];
const PRINCE=["Vĩnh Kỳ","Vĩnh Diễm","Hoằng Trú","Vĩnh Thành","Miên Ninh","Vĩnh Tinh","Hoằng Chiêm","Vĩnh Dung","Dận Tường","Vĩnh Lân","Miên Khải","Hoằng Diệu"];
const PRINCESS=["Hòa Kính","Hòa Gia","Ngọc Dung","Tĩnh An","Hòa Thạc","Ninh Thọ","Thục Thận","Hòa Khác","An Lạc","Vĩnh Gia","Thục Nghi","Uyển Trinh"];
const NAMES={sung:"Sủng",danh:"Danh",bac:"Bạc",suc:"Sức",mat:"Tai mắt",th:"Thái hậu → ta: thiện cảm",hh:"Hoàng hậu → ta: thiện cảm",sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",maid:"Lòng cung nữ"};
const ETRAITS={
 danghi:["Đa nghi","Mưu kế dễ bị lộ hơn, nhưng lời vu cáo khó gỡ hơn."],
 mesac:["Mê sắc","Sắc đẹp và tài múa nặng gấp đôi khi chọn thị tẩm."],
 trongtai:["Trọng tài","Cầm, Kỳ, Thi, Họa nặng gấp đôi."],
 hieuthao:["Hiếu thảo","Thái hậu không gật đầu thì không sắc phong."],
 nongnay:["Nóng nảy","Phạt nặng; sủng ái lên xuống thất thường."],
 nhantu:["Nhân từ","Hay khoan thứ; Đức của ngươi được coi trọng."],
 chamchinh:["Chăm chính sự","Ít thị tẩm; thích người bàn việc triều chính."],
 datinh:["Đa tình","Thị tẩm nhiều, rải khắp hậu cung; ai cũng ghen hơn."],
 lanhlung:["Lạnh lùng","Sủng lên chậm, phai cũng chậm."]};
const CLASH=[["nongnay","nhantu"],["chamchinh","datinh"],["datinh","lanhlung"]];
const ERA=["Thừa Bình","Vĩnh An","Khang Định","Hưng Long","Thiên Hựu","Gia Thịnh","Cảnh Hòa","Chính Đức"];
const MOODS=[["Vui","g"],["Bình thường",""],["Phiền muộn","r"],["Giận dữ","r"]];
const LIKES={flower:["mẫu đơn","hoa mai","hoa lan","hoa sen","hoa cúc"],music:["khúc Cao sơn lưu thủy","khúc Bình sa lạc nhạn","khúc Mai hoa tam lộng","khúc Xuân giang hoa nguyệt"],dish:["canh hạt sen","bánh hoa quế","cháo yến","gà hấp lá sen","chè long nhãn"]};
const LIKEN={flower:"Hoa",music:"Nhạc",dish:"Món"};
const ARTS=[
 {k:"cam",n:"Cầm",st:"tai",u:"Bậc 3: khúc Phượng cầu hoàng"},
 {k:"ky",n:"Kỳ",st:"tai",u:"Bậc 3: đánh cờ với Hoàng thượng"},
 {k:"thi",n:"Thi",st:"tai",u:"Bậc 3: mỗi tháng thơ đến tay Hoàng thượng, Sủng +1"},
 {k:"hoa",n:"Họa",st:"tai",u:"Bậc 3: vẽ chân dung dâng Thái hậu"},
 {k:"vu",n:"Vũ",st:"sac",u:"Bậc 3: điệu Kinh hồng vũ"},
 {k:"y",n:"Y thuật & điều hương",st:"sac",u:"Bậc 2: nhận ra độc, xạ hương · Bậc 4: tự bào chế thuốc, chữa bệnh cho con"}];
const NIGHTS=["Rèm the buông xuống, nến đỏ cháy đến canh tư. Sáng ra, Hoàng thượng ban cho ngươi một cây trâm ngọc.",
 "Tiếng mưa rơi trên mái ngói. Hoàng thượng ở lại đến khi trời hửng sáng.",
 "Ngài kể chuyện thuở còn là hoàng tử, rồi đèn lụi dần. Sáng hôm sau, cả hậu cung đều biết.",
 "Hương trầm vấn vít. Đêm ấy dài như một khúc đàn chưa dứt."];

const R=n=>Math.floor(Math.random()*n), pick=a=>a[R(a.length)];
const $=id=>document.getElementById(id);
const store={get(k){try{return JSON.parse(localStorage.getItem(k)||"null")}catch(e){return null}},set(k,v){try{localStorage.setItem(k,JSON.stringify(v))}catch(e){}}};
let S,rivals,used=0,deck=[],tab="act",Q=[],rid=0,quiet=true,popIdx=null,popMsg="";
/* time: 3 buổi a tuần, 4 khắc a buổi; 'used' = khắc spent this buổi */
const BUOI=["Buổi sáng","Buổi chiều","Buổi tối"];let advLock=false;
function can(c){return !!S&&!S.dead&&used+c<=BAL.time.khac&&(c<=1||S.suc>=BAL.time.sucMin)}
function spend(c){used=Math.max(0,used+c)}
function pips(n){n=Math.max(0,Math.min(4,n));return `<span class="pip">${"●".repeat(n)}${"○".repeat(4-n)}</span>`}

function word(o){return o>=91?"Nắm chắc":o>=81?"Rất chắc":o>=66?"Chắc":o>=56?"Khá chắc":o>=46?"Năm ăn năm thua":o>=31?"Khó":"Liều"}
/* TWO scales, never mixed (owner 11/14, coordinator 11/15): word() above = the 7-step ladder, ONLY for the act's own success/failure (the one
   word in the card corner / beside an option). Every side chance of something that comes along (có thai, được ban thưởng, lật thẻ, bị lộ,
   chết… in Được / Mất / Kèm, result cards, Sổ ghi, hints, the HUD) reads on the chance scale Rất thấp / Thấp / Vừa / Cao / Rất cao. Same numbers. */
function chanceLvl(n){return n<=0?"Không có":n<8?"Rất thấp":n<18?"Thấp":n<35?"Vừa":n<60?"Cao":"Rất cao"}
function chanceLo(n){return chanceLvl(n).toLowerCase()}
function chanceW(n){return n<=0?"không có khả năng":"khả năng "+chanceLo(n)}
const CHW=/khả năng (rất thấp|thấp|vừa|cao|rất cao)|không có khả năng/;
function cl(v,a,b){return Math.max(a,Math.min(b,v))}
function roll(o){return Math.random()*100<o}
function has(t){return S.emp.traits.includes(t)}
function mm(){return [10,0,-8,-15][S.emp.mood]}
function sg(n){if(!n)return 0;let f=has("nongnay")?1.3:1;if(n>0&&has("lanhlung"))f*=.7;const r=Math.round(n*f);return n>0?Math.max(1,r):r}
/* KLOW: numbers where a FALL is good for her (Áp lực hôn sự / Nợ nhà / Phe chủ chiến, Lời đồn) — coloured by meaning (OD:L908), here and in the result card (j63) */
const KLOW={kap:1,kld:1};function kGood(k,v){return KLOW[k]?v<=0:v>=0}
function fmt(o){return Object.entries(o||{}).filter(([k,v])=>NAMES[k]&&v).map(([k,v])=>{if(k==="sung")v=sg(v);return `<span class="${kGood(k,v)?"g":"r"}">${NAMES[k]} ${v>0?"+":""}${v}</span>`}).join(" · ")}
function apply(o){const pops=[];
  for(const k in o){let v=o[k];if(!v)continue;
    if(k==="maid"){S.maid.loyal=cl(S.maid.loyal+v,0,100);pops.push([k,v]);continue}
    if(k==="sung")v=sg(v);S[k]=(S[k]||0)+v;if(NAMES[k])pops.push([k,v])}
  for(const k of ["sung","danh","suc","sac","tai","tamco","duc"])S[k]=cl(S[k],0,100);
  S.th=cl(S.th,-100,100);S.hh=cl(S.hh,-100,100);S.bac=Math.max(0,S.bac);S.mat=cl(S.mat,0,10);
  if(!quiet)pops.forEach(([k,v],i)=>popNum(k,v,i))}
function popNum(k,v,i){if(typeof kitStatFx==="function")return kitStatFx([{k,dv:v}],{src:"apply"});/* fallback before jstatfx is loaded */
  const el=$("hud-"+k)||$("stage");if(!el)return;const r=el.getBoundingClientRect();
  const s=document.createElement("span");s.className="fly "+(v>0?"g":"r");s.textContent=`${NAMES[k]} ${v>0?"+":""}${v}`;s.style.left=Math.max(4,r.left)+"px";s.style.top=(r.bottom+4)+"px";document.body.appendChild(s);setTimeout(()=>s.remove(),1900)}
function log(h){S.logSeq=(S.logSeq||0)+1;S.logs.unshift(`<span class="ld">T${S.month}/${S.year} ${TUAN[S.tuan]}</span>${h}`);if(S.logs.length>150)S.logs.length=150}
function when(){return `Năm ${S.year}, tháng ${S.month}, ${TUAN[S.tuan]} (${SEASON[S.month-1]})`}
function fx(cls,el){const e=el||$("game");e.classList.remove(cls);void e.offsetWidth;e.classList.add(cls);setTimeout(()=>e.classList.remove(cls),950)}

/* people helpers */
function allKids(){const a=[];if(S&&S.kids)S.kids.forEach(k=>a.push([k,null]));(rivals||[]).forEach(v=>(v.kids||[]).forEach(k=>a.push([k,v])));return a}
function mkKid(sex,age){const used=allKids().map(([k])=>k.name);const pre=sex==="m"?"Hoàng tử ":"Công chúa ";const pool=(sex==="m"?PRINCE:PRINCESS).filter(n=>!used.includes(pre+n));
  return {name:pre+(pool.length?pick(pool):pick(sex==="m"?PRINCE:PRINCESS)+" "+(R(9)+2)),sex,age,hp:80+R(21),tal:20+R(50),fond:30+R(30),alive:true,heir:false,fv:1+R(2)}}
/* palace-start (owner 16/11 "game starts right after the accession", amended: "about 4 small children, close in age"): a new game seeds
   BAL.ps.kidN-weighted 3–5 children in the whole palace, ages kidAge (1–4), princes and princesses mixed (sonP each, at least one of each),
   mothers in BAL.ps rank ranges; the Hoàng hậu never has a son at the start (no đích tử) and nobody is grown, so the player can still compete.
   A mother has at most two of them, born at least two years apart. New games only (S.ps). */
function psSeedKids(){const P=BAL.ps;let n=0,r=Math.random()*P.kidN.reduce((a,b)=>a+b,0);while(n<P.kidN.length-1&&r>=P.kidN[n]){r-=P.kidN[n];n++}
 const sx=[];for(let i=0;i<n;i++)sx.push(Math.random()<P.sonP?"m":"f");if(n>=2&&!sx.includes("m"))sx[0]="m";if(n>=2&&!sx.includes("f"))sx[n-1]="f";
 for(const x of sx){const age=P.kidAge[0]+R(P.kidAge[1]-P.kidAge[0]+1);const rg=x==="m"?P.sonMom:P.dauMom;
  const M=rivals.filter(v=>v.alive&&!(x==="m"&&v.queen)&&(v.queen?rg[1]>=7:v.rank>=rg[0]&&v.rank<=rg[1])&&(v.kids||[]).length<2&&(v.kids||[]).every(k=>Math.abs(k.age-age)>=2));if(!M.length)continue;
  const v=pick(M);const k=mkKid(x,age);v.kids.push(k);v.lastBirth=Math.max(v.lastBirth==null?-999:v.lastBirth,-12*age-R(6));
  v.age=Math.max(v.age,BAL.ps.momAge+age)}/* review r1: no mother (or Emperor) under momAge at a seeded child's birth */
 if(S&&S.emp){const mx=Math.max(0,...allKids().map(([k])=>k.age||0));if(mx)S.emp.age=Math.max(S.emp.age,BAL.ps.momAge+mx)}}
/* the opening line of a new game (Nhập cung): the Emperor has just taken the throne, the court is weak, the harem young, few children */
function psOpenText(){const E=S.emp,K=allKids().filter(([k])=>k.alive);const ns=K.filter(([k])=>k.sex==="m").length,nd=K.length-ns;
 const kl=!K.length?"Trong cung chưa có hoàng tự nào.":`Trong cung mới có ${[ns?ns+" hoàng tử":"",nd?nd+" công chúa":""].filter(Boolean).join(", ")}, đứa lớn nhất mới ${Math.max(...K.map(([k])=>k.age))} tuổi; Hoàng hậu chưa có con trai.`;
 return `Ngài vừa đăng cơ, nay mới là ${E.era} năm thứ nhất. Triều chính còn non: việc lớn vẫn phải qua Thái hậu và các đại thần phụ chính. Hậu cung còn thưa, phi tần phần nhiều là người cũ từ tiềm để, tuổi còn xanh. ${kl} Ngôi Đông cung còn bỏ trống.`}
function mySons(){return S.kids.filter(k=>k.alive&&k.sex==="m")}
function myDaus(){return S.kids.filter(k=>k.alive&&k.sex==="f")}
function liveRivals(q){return rivals.filter(v=>v.alive&&!v.out&&(q||!v.queen))}
function qOn(){const q=rivals[0];return q.alive&&!q.out&&q.queen}
function momRank(v){return v?(v.alive&&!v.out?(v.queen?7:v.rank):0):S.rank}
function setHeir(k,v){allKids().forEach(([x])=>x.heir=false);k.heir=true;S.heir={k,v};if(!v)apply({danh:10})}
function kidDie(k,why,mine){k.alive=false;const wasH=k.heir;if(wasH){k.heir=false;S.heir=null}if(mine)apply({suc:-15});
  return `<span class="r">${k.name} ${why}.</span>${mine?" Ngươi đau đớn khôn nguôi.":""}${wasH?" Ngôi Đông cung bỏ trống.":""} `}
/* ghenN(n) = the jealousy one "every consort ghen +n" really adds (Hoàng thượng đa tình ×BAL.ghen.datinh). ONE CORE (OD:L1267): ghenAll applies it and every text that shows that gain prints ghenN(n). */
function ghenN(n){let k=1;try{if(has("datinh"))k=BAL.ghen.datinh}catch(e){}return Math.round(n*k)}
function ghenAll(n){const d=ghenN(n);liveRivals(true).forEach(v=>v.ghen=cl(v.ghen+d,0,100))}
function namesInUse(){const a=[];if(S){a.push(S.name);if(S.maid)a.push(S.maid.name);if(S.foe)a.push(S.foe);if(S.st){if(S.st.guard)a.push(S.st.guard);if(S.st.stu)a.push(S.st.stu)}}(rivals||[]).forEach(v=>a.push(v.name));allKids().forEach(([k])=>a.push(k.name));return a}
function freshName(){const used=namesInUse();const sur=used.map(n=>SURN.find(x=>n.startsWith(x+" "))).filter(Boolean);
  let ss=SURN.filter(x=>!sur.includes(x));if(!ss.length)ss=SURN;
  for(let t=0;t<200;t++){const n=pick(ss)+" "+pick(GIVEN);if(!used.includes(n)&&!used.some(u=>u.endsWith(" "+n.split(" ").slice(-2).join(" "))))return n}
  for(const a of SURN)for(const b of GIVEN){const n=a+" "+b;if(!used.includes(n))return n}return pick(SURN)+" "+pick(GIVEN)+" "+(R(90)+10)}
function newRival(rank,isQueen){const t=pick(TRAITS);
  return rstats({id:++rid,name:freshName(),rank,queen:!!isQueen,trait:t[0],malice:t[1]+R(20)-10,sung:20+rank*9+R(10),rel:isQueen?-5:R(20)-10,ev:0,alive:true,out:false,
    kids:[],/* palace-start (owner 16/11): nobody arrives with a child; the few children at a new game are seeded by psSeedKids() */ghen:R(15),pg:0,nights:0,age:(rank>=5||isQueen?23:18)+R(8)},rank)}
function mkEmp(){const t=[];const ks=Object.keys(ETRAITS);
  while(t.length<2){const k=pick(ks);if(t.includes(k)||CLASH.some(([a,b])=>(a===k&&t.includes(b))||(b===k&&t.includes(a))))continue;t.push(k)}
  return {era:pick(ERA),age:BAL.ps.empAge[0]+R(BAL.ps.empAge[1]+1),reignY:1,traits:t,mood:1,likes:{flower:pick(LIKES.flower),music:pick(LIKES.music),dish:pick(LIKES.dish)},known:{}}}
function empName(){return `Hoàng thượng niên hiệu ${S.emp.era}`}
function discover(){const u=Object.keys(LIKES).filter(k=>!S.emp.known[k]);if(!u.length)return false;const k=pick(u);S.emp.known[k]=true;
  log(`<span class="g">Ngươi biết được: Hoàng thượng thích ${S.emp.likes[k]}.</span>`);return true}
function artW(k,l){return l*(((["cam","ky","thi","hoa"].includes(k)&&has("trongtai"))||(k==="vu"&&has("mesac")))?2:1)}
function bestArt(){let b={k:null,n:"giọng hát",l:0,w:0};for(const a of ARTS){const l=S.arts[a.k],w=artW(a.k,l);if(w>b.w)b={k:a.k,n:a.n,l,w}}return b}
function needDuc(){return S.heir&&!S.heir.v?30:40}
const DG=()=>has("danghi");