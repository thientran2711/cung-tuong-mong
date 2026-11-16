/* ===================== ONE UI KIT (every screen builds from these pieces only) =====================
   portrait frame ...... pcPort(f,col,status) / pframe(f) / pframeArt(src)   rank ground by f.rk (rk-c0..c7, th, emp, sv0-4, eu0-3, off, kid, cold)
   face + name chip .... mdH(face,"xs|sm|big")  (small round avatar, also rank ground)
   person card ......... pcard({f,name,rank,lines,chips,note,groups})  + pager(key,items,mk) face strip
   labelled bar ........ ghenBar(n) / fbar(v,lo,hi,good)  (always beside label + number)
   odds chip ........... oddsChip(word)  ladder word or 'Chắc chắn'
   effect line ......... eff(token) / effList(tokens,default) / kitParse('word · tốn: … · thành: … · hỏng: …')
   act card ............ cardH(a,i)  title, khắc, text, odds chip, Tốn / Thành / Hỏng rows, disabled reason
   button .............. pbtn(attrs,name,line,whyDisabled)  name + price + gain/loss, reason when disabled
   result card ......... resultShow(title,before,ok)  THÀNH / HỎNG seal + coloured deltas + why
   dialog .............. showModal()  speaker portrait frame or place art, options through dilLine()
   Defined in j15 (cards, pager, bars), j17 (lines), j19 (kit core), j21 (relations). */
const RANKS=[
 {n:"Đáp ứng",s:0,d:0},{n:"Thường tại",s:15,d:10},{n:"Quý nhân",s:25,d:20},{n:"Tần",s:38,d:30},
 {n:"Phi",s:52,d:42},{n:"Quý phi",s:66,d:55},{n:"Hoàng quý phi",s:78,d:68},{n:"Hoàng hậu",s:85,d:78}];
const RCOL=["#8a7a6a","#a8946a","#6a8aa0","#7aa07a","#a07ab0","#c06a6a","#d98a3a","#f0d070"];
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
const NAMES={sung:"Sủng",danh:"Danh",bac:"Bạc",suc:"Sức",mat:"Tai mắt",th:"Thái hậu với ngươi",hh:"Hoàng hậu với ngươi",sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",maid:"Lòng cung nữ"};
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
function can(c){return !!S&&!S.dead&&used+c<=4&&(c<=1||S.suc>=20)}
function spend(c){used=Math.max(0,used+c)}
function pips(n){n=Math.max(0,Math.min(4,n));return `<span class="pip">${"●".repeat(n)}${"○".repeat(4-n)}</span>`}

function word(o){return o>=91?"Nắm chắc":o>=81?"Rất chắc":o>=66?"Chắc":o>=56?"Khá chắc":o>=46?"Năm ăn năm thua":o>=31?"Khó":"Liều"}
function cl(v,a,b){return Math.max(a,Math.min(b,v))}
function roll(o){return Math.random()*100<o}
function has(t){return S.emp.traits.includes(t)}
function mm(){return [10,0,-8,-15][S.emp.mood]}
function sg(n){if(!n)return 0;let f=has("nongnay")?1.3:1;if(n>0&&has("lanhlung"))f*=.7;const r=Math.round(n*f);return n>0?Math.max(1,r):r}
function fmt(o){return Object.entries(o||{}).filter(([k,v])=>NAMES[k]&&v).map(([k,v])=>{if(k==="sung")v=sg(v);return `<span class="${v>=0?"g":"r"}">${NAMES[k]} ${v>0?"+":""}${v}</span>`}).join(" · ")}
function apply(o){const pops=[];
  for(const k in o){let v=o[k];if(!v)continue;
    if(k==="maid"){S.maid.loyal=cl(S.maid.loyal+v,0,100);pops.push([k,v]);continue}
    if(k==="sung")v=sg(v);S[k]=(S[k]||0)+v;if(NAMES[k])pops.push([k,v])}
  for(const k of ["sung","danh","suc","sac","tai","tamco","duc"])S[k]=cl(S[k],0,100);
  S.th=cl(S.th,-100,100);S.hh=cl(S.hh,-100,100);S.bac=Math.max(0,S.bac);S.mat=cl(S.mat,0,10);
  if(!quiet)pops.forEach(([k,v],i)=>popNum(k,v,i))}
function popNum(k,v,i){const el=$("hud-"+k)||$("stage");if(!el)return;const r=el.getBoundingClientRect();
  const s=document.createElement("span");s.className="fly "+(v>0?"g":"r");s.textContent=`${NAMES[k]} ${v>0?"+":""}${v}`;
  const hud=el.id!=="stage";s.style.left=Math.max(4,Math.min(innerWidth-120,r.left+r.width/2-40))+"px";
  s.style.top=(hud?r.bottom+4+i*18:r.top+r.height*0.35+i*20)+"px";s.style.animationDelay=(i*.12)+"s";
  document.body.appendChild(s);setTimeout(()=>s.remove(),1900)}
function log(h){S.logSeq=(S.logSeq||0)+1;S.logs.unshift(`<span class="ld">T${S.month}/${S.year} ${TUAN[S.tuan]}</span>${h}`);if(S.logs.length>150)S.logs.length=150}
function when(){return `Năm ${S.year}, tháng ${S.month}, ${TUAN[S.tuan]} (${SEASON[S.month-1]})`}
function fx(cls,el){const e=el||$("game");e.classList.remove(cls);void e.offsetWidth;e.classList.add(cls);setTimeout(()=>e.classList.remove(cls),950)}

/* people helpers */
function allKids(){const a=[];if(S&&S.kids)S.kids.forEach(k=>a.push([k,null]));(rivals||[]).forEach(v=>(v.kids||[]).forEach(k=>a.push([k,v])));return a}
function mkKid(sex,age){const used=allKids().map(([k])=>k.name);const pre=sex==="m"?"Hoàng tử ":"Công chúa ";const pool=(sex==="m"?PRINCE:PRINCESS).filter(n=>!used.includes(pre+n));
  return {name:pre+(pool.length?pick(pool):pick(sex==="m"?PRINCE:PRINCESS)+" "+(R(9)+2)),sex,age,hp:80+R(21),tal:20+R(50),fond:30+R(30),alive:true,heir:false,fv:1+R(2)}}
function mySons(){return S.kids.filter(k=>k.alive&&k.sex==="m")}
function myDaus(){return S.kids.filter(k=>k.alive&&k.sex==="f")}
function liveRivals(q){return rivals.filter(v=>v.alive&&!v.out&&(q||!v.queen))}
function qOn(){const q=rivals[0];return q.alive&&!q.out&&q.queen}
function momRank(v){return v?(v.alive&&!v.out?(v.queen?7:v.rank):0):S.rank}
function setHeir(k,v){allKids().forEach(([x])=>x.heir=false);k.heir=true;S.heir={k,v};if(!v)apply({danh:10})}
function kidDie(k,why,mine){k.alive=false;const wasH=k.heir;if(wasH){k.heir=false;S.heir=null}if(mine)apply({suc:-15});
  return `<span class="r">${k.name} ${why}.</span>${mine?" Ngươi đau đớn khôn nguôi.":""}${wasH?" Ngôi Đông cung bỏ trống.":""} `}
function ghenAll(n){liveRivals(true).forEach(v=>v.ghen=cl(v.ghen+Math.round(n*(has("datinh")?1.5:1)),0,100))}
function namesInUse(){const a=[];if(S){a.push(S.name);if(S.maid)a.push(S.maid.name);if(S.foe)a.push(S.foe);if(S.st){if(S.st.guard)a.push(S.st.guard);if(S.st.stu)a.push(S.st.stu)}}(rivals||[]).forEach(v=>a.push(v.name));allKids().forEach(([k])=>a.push(k.name));return a}
function freshName(){const used=namesInUse();const sur=used.map(n=>SURN.find(x=>n.startsWith(x+" "))).filter(Boolean);
  let ss=SURN.filter(x=>!sur.includes(x));if(!ss.length)ss=SURN;
  for(let t=0;t<200;t++){const n=pick(ss)+" "+pick(GIVEN);if(!used.includes(n)&&!used.some(u=>u.endsWith(" "+n.split(" ").slice(-2).join(" "))))return n}
  for(const a of SURN)for(const b of GIVEN){const n=a+" "+b;if(!used.includes(n))return n}return pick(SURN)+" "+pick(GIVEN)+" "+(R(90)+10)}
function newRival(rank,isQueen){const t=pick(TRAITS);
  return rstats({id:++rid,name:freshName(),rank,queen:!!isQueen,trait:t[0],malice:t[1]+R(20)-10,sung:20+rank*9+R(10),rel:isQueen?-5:R(20)-10,ev:0,alive:true,out:false,
    kids:rank>=3&&R(3)===0?[mkKid("m",1+R(4))]:[],ghen:R(15),pg:0,nights:0,age:(rank>=5||isQueen?23:18)+R(8)},rank)}
function mkEmp(){const t=[];const ks=Object.keys(ETRAITS);
  while(t.length<2){const k=pick(ks);if(t.includes(k)||CLASH.some(([a,b])=>(a===k&&t.includes(b))||(b===k&&t.includes(a))))continue;t.push(k)}
  return {era:pick(ERA),age:20+R(14),traits:t,mood:1,likes:{flower:pick(LIKES.flower),music:pick(LIKES.music),dish:pick(LIKES.dish)},known:{}}}
function empName(){return `Hoàng thượng niên hiệu ${S.emp.era}`}
function discover(){const u=Object.keys(LIKES).filter(k=>!S.emp.known[k]);if(!u.length)return false;const k=pick(u);S.emp.known[k]=true;
  log(`<span class="g">Ngươi biết được: Hoàng thượng thích ${S.emp.likes[k]}.</span>`);return true}
function artW(k,l){return l*(((["cam","ky","thi","hoa"].includes(k)&&has("trongtai"))||(k==="vu"&&has("mesac")))?2:1)}
function bestArt(){let b={k:null,n:"giọng hát",l:0,w:0};for(const a of ARTS){const l=S.arts[a.k],w=artW(a.k,l);if(w>b.w)b={k:a.k,n:a.n,l,w}}return b}
function needDuc(){return S.heir&&!S.heir.v?30:40}
const DG=()=>has("danghi");
function start(){
  const o=(window.__forceOrigin&&ORIGINS.find(x=>x.k===window.__forceOrigin))||pick(ORIGINS);quiet=true;Q=[];popIdx=null;popMsg="";
  S={year:1,month:3,tuan:0,age:18+R(3),rank:o.r,sung:8,danh:8,bac:60,suc:80,mat:0,th:o.th,hh:o.hh,tai:30+R(50),sac:40+R(55),tamco:10+R(20),duc:30,thu:0,
     schemes:0,moreRivals:0,maid:newMaid(pick(MAIDS),50+R(31)),origin:o,name:"",
     preg:0,hidden:false,fake:0,fert:0,anthai:0,doctor:0,pray:0,kids:[],heir:null,lastPromo:0,turn:0,dead:false,
     arts:{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0},artp:{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0},master:0,confined:0,shield:0,tablet:0,
     place:"home",visit:null,tonight:null,inv:[],an:0,nightLog:[],evm:{},rl:{},hieu:"",block:0,dress:null,asthma:false,shop:[],seen:{},emp:mkEmp(),st:{step:0,done:0,tag:""},recorded:false,nights:0,thDead:false,logs:[],caseEv:0,avenged:false};
  rivals=[];S.name=freshName();apply(o.o);if(o.art)Object.assign(S.arts,o.art);S.ally=o.ally?1:0;
  for(const [r,q] of [[7,1],[5,0],[4,0],[4,0],[3,0],[3,0],[2,0],[2,0],[1,0],[1,0],[0,0],[0,0]])rivals.push(newRival(r,q));spreadTraits();
  Object.assign(S,drawFace());rivals.forEach(v=>Object.assign(v,drawFace()));S.emp.face=R(Math.max(1,(AV.emperor||[]).length));
  normAll();
  if(S.ally){const v=pick(liveRivals(false));if(v){relAdd(S,v,35);v.ghen=0;log(`${v.name} là người quen cũ, sẵn lòng che chở ngươi.`)}}
  const s=STORY[o.k];if(s.init)s.init();
  S.visit={k:"home",people:homePeople(),talked:false};S.buoi=0;rollWx();
  quiet=false;used=0;tab="act";
  const E=S.emp;
  pushModal({t:"Nhập cung",faces:[[pMe(),S.name],[pEmp(),"Hoàng thượng"],[pMaid(),S.maid.name]],h:`<p>${S.name}, ${S.age} tuổi, ${o.n}. ${o.t} Hôm nay ngươi được đưa vào cung, phong <b>${RANKS[S.rank].n}</b>. Cung nữ ${S.maid.name} theo hầu ngươi từ nhà.</p>
   <p><b>${empName()}</b>, ${E.age} tuổi: ${E.traits.map(t=>ETRAITS[t][0]).join(", ")}.</p>
   <p><b>Tuyến truyện: ${s.t}.</b> ${s.goal}${o.k==="td"?` Kẻ vu cho cha ngươi là ${S.foeDad}; con gái hắn, ${S.foe}, đang ở trong cung.`:""}</p>
   <p class="past">Mỗi tháng ba tuần; mỗi tuần ba buổi (sáng, chiều, tối), mỗi buổi 4 khắc. Mở Bản đồ để đi gặp người, chạm vào người để nói chuyện hay ra tay.</p>`});
  flip();newLots();deal();render();
}
function homePeople(){const p=[{kind:"maid",name:S.maid.name,ini:S.maid.name.split(" ").pop()[0],col:"#b9a48a",info:`Cung nữ thân tín · lòng ${S.maid.loyal}`}];
  S.kids.filter(k=>k.alive).forEach(k=>p.push({kind:"kid",ref:k,name:k.name,ini:k.sex==="m"?"子":"女",col:k.heir?"#f0d070":"#c9a0e0",info:`${k.age} tuổi · Sức khỏe ${k.hp} · Tài ${k.tal} · Hoàng thượng thương ${k.fond}${k.heir?" · Thái tử":""}`}));return p}

function pool(){const L=S.emp.likes,K=S.emp.known,tt=has("trongtai")?2:1;
 const A=[
  {n:"Đánh đàn ở ngự hoa viên",t:K.music?`Tấu ${L.music}, khúc ngài yêu thích.`:"Đợi Hoàng thượng đi ngang.",c:{suc:-10},o:od(35+S.tai/3+S.arts.cam*4*tt+(K.music?15:0)+mm()),w:{sung:K.music?9:7},l:{sung:-1}},
  {n:"Dâng canh ở ngự thư phòng",t:K.dish?`Tự tay nấu ${L.dish}, món ngài thích.`:"Tự tay nấu, sâm mua bằng bạc riêng.",c:{bac:-15,suc:-5},o:od(55+S.sac/5+(K.dish?15:0)+mm()),w:{sung:K.dish?8:6},l:{danh:-2}},
  {n:"Múa trong yến tiệc",t:"Cả hậu cung nhìn vào.",c:{suc:-20,bac:-10},o:od(30+S.sac/2*(has("mesac")?1.3:1)+S.arts.vu*4),w:{sung:12,danh:4},l:{danh:-6},x:"phi tần ghen +4",go:()=>ghenAll(4)},
  {n:"Cắm hoa dâng Hoàng thượng",t:K.flower?`Một bình ${L.flower}, loài hoa ngài yêu.`:"Chưa biết ngài thích hoa gì.",c:{bac:-5,suc:-5},o:K.flower?100:od(50),w:{sung:K.flower?5:2},l:{}},
  {n:"Cài tai mắt",t:"Mua chuộc cung nữ các cung khác.",c:{bac:-25},o:od(80),w:{mat:2},l:{danh:-3}},
  {n:"Nghỉ ngơi dưỡng sức",t:"Uống thuốc bổ, ngủ sớm.",c:{},o:100,w:{suc:20},l:{}},
  {n:"Thêu khăn bán ra ngoài",t:"Lén nhờ cung nữ mang ra cửa Thần Vũ.",c:{suc:-10},o:od(75),w:{bac:35},l:{danh:-4}},
  {n:"Làm thơ dâng lên",t:S.tai>=70?"Thơ ngươi đã truyền khắp cung, danh tiếng thêm vang.":"Tài hoa là con đường dài.",c:{suc:-5},o:od(30+S.tai/2+S.arts.thi*4*tt),w:{sung:5,danh:S.tai>=70?6:4},l:{danh:-1}},
  {n:"Cầu tự ở Phụng Tiên điện",t:"Thắp hương xin một hoàng tử.",c:{bac:-10},o:od(50),w:{},l:{},lock:S.fert>0||S.pray>0,t:"đang có hiệu lực",x:`2 tháng dễ có thai hơn (nay ${word(conceiveCh())})`,go:()=>S.pray=2},
  {n:"Phát chẩn cho cung nhân",t:"Ban bạc cho kẻ hầu nghèo.",c:{bac:-40},o:od(85),w:{danh:7,mat:1,duc:3},l:{}},
  {n:"Dưỡng nhan",t:"Ngọc trai nghiền, sữa dê tắm, ngủ đủ giấc.",c:{bac:-30},o:od(92),w:{sac:3},l:{}},
  {n:"Luyện cầm kỳ thi họa",t:"Ngày đêm khổ luyện bên án thư.",c:{suc:-10},o:100,w:{tai:2}},
  {n:"Đọc binh thư, sử sách",t:"Học mưu kế người xưa, xem lòng người.",c:{suc:-5},o:100,w:{tamco:2}},
  {n:"Tụng kinh, làm việc thiện",t:"Thắp hương ở Bảo Hoa điện, bố thí kẻ nghèo.",c:{bac:-10},o:100,w:{duc:3}},
  {n:"Thưởng cung nữ",t:`Ban cho ${S.maid.name} vòng bạc, giữ lòng nàng.`,c:{bac:-20},o:100,w:{maid:20}}];
 if(!S.preg&&S.tamco>=50)A.push({n:"Giả mang thai",t:"Mua chuộc thái y, độn bụng, chờ tháng thứ chín tráo con.",c:{bac:-60},o:od(S.tamco),w:{sung:6,th:5},l:{danh:-5},x:"có 'thai'; tháng 9 phải tráo con, lộ là bị ban chết",go:()=>{S.preg=1;S.fake=1;S.hidden=false;S.pregWk=wk()}});
 return A}
function artActs(){const A=[],r=S.arts;
 if(r.cam>=3)A.push({n:"Đàn khúc Phượng cầu hoàng",t:"Tiếng đàn đêm trăng vọng đến Dưỡng Hòa điện.",c:{suc:-10},o:od(40+artW("cam",r.cam)*8+S.tai/5+mm()),w:{sung:12},l:{sung:-2}});
 if(r.vu>=3)A.push({n:"Kinh hồng vũ",t:"Điệu múa trong yến tiệc khiến cả điện lặng người.",c:{suc:-20},o:od(40+artW("vu",r.vu)*8+S.sac/5+mm()),w:{sung:15,danh:3},l:{danh:-4},x:"các phi tần ghen +10, thân -5",go:()=>{ghenAll(10);liveRivals(true).forEach(v=>v.rel-=5)}});
 if(r.ky>=3)A.push({n:"Đánh cờ với Hoàng thượng",t:"Biết lúc thắng, biết lúc nhường.",c:{suc:-5},o:od(45+artW("ky",r.ky)*8+mm()),w:{sung:5,danh:2,tamco:1},l:{sung:-1}});
 if(r.hoa>=3)A.push({n:"Vẽ chân dung tặng Thái hậu",t:"Mất nửa tháng, từng sợi tóc bạc.",c:{suc:-10,bac:-10},o:od(50+artW("hoa",r.hoa)*8),w:{th:10},l:{th:-1}});
 return A}
function deal(){
 const X=[];const v=S.tonight&&S.tonight!=="me"?S.tonight:null;
 if(v){X.push({n:"Tranh sủng",t:`Tối nay thẻ bài của ${v.name} được lật. Sai cung nữ giả cớ ngươi đau tim, mời Hoàng thượng sang.`,c:{duc:-4},o:oSteal(S),w:{},l:{sung:-3},b:2,x:stealX(v),go:()=>{log(stealWin(S,v,"feign"))}});
  X.push({n:"Chặn ngự giá",t:`Chờ ở hành lang ngự giá đi qua, múa một khúc dưới đèn lồng, mong ngài dừng bước.`,c:{suc:-5},o:oSteal(S,"road"),w:{},l:{sung:-3},b:2,x:stealX(v,1),go:()=>{log(stealWin(S,v,"road"))}})}
 const ua=artActs();if(ua.length)X.push(pick(ua));
 const live=S.kids.filter(k=>k.alive);
 const ed=live.filter(k=>k.age>=3).sort((a,b)=>a.tal-b.tal);
 if(ed.length){const k=ed[0],g=4+Math.round(S.tai/20);X.push({n:`Dạy dỗ ${k.sex==="m"?"hoàng tử":"công chúa"}`,t:`Tự tay dạy ${k.name} chữ nghĩa, lễ nghi.`,c:{suc:-10},o:100,w:{},x:`Tài ${k.name} +${g}`,go:()=>{k.tal=cl(k.tal+g,0,100)}})}
 if(live.length){const k=live.slice().sort((a,b)=>a.fond-b.fond)[0];X.push({n:"Đưa con đến thỉnh an Hoàng thượng",t:`Dắt ${k.name} đến Dưỡng Hòa điện.`,c:{suc:-5},o:od(70+S.sung/10+mm()),w:{sung:2},l:{},x:`Hoàng thượng thương ${k.name} +8`,go:()=>{k.fond=cl(k.fond+8,0,100)}})}
 const sick=live.filter(k=>k.hp<70).sort((a,b)=>a.hp-b.hp)[0];
 if(sick&&S.arts.y>=4)X.push({n:"Chữa bệnh cho con",t:`${sick.name} đang yếu, ngươi tự bốc thuốc.`,c:{suc:-10},o:100,w:{},x:`Sức khỏe ${sick.name} +30`,go:()=>{sick.hp=Math.min(100,sick.hp+30)}});
 if(S.preg&&!S.fake)X.push(S.arts.y>=4?{n:"Tự bào chế thuốc an thai",t:"Ngươi tự sắc thuốc, không ai nhúng tay được.",c:{suc:-5},o:100,w:{},x:"tháng này nguy cơ sảy thai giảm một nửa",go:()=>S.anthai=1}
   :{n:"An thai",t:"Nằm nghỉ, uống thuốc an thai.",c:{bac:-20},o:100,w:{suc:10},x:"tháng này nguy cơ sảy thai giảm một nửa",go:()=>S.anthai=1});
 if(S.preg&&S.hidden&&S.preg<=3)X.push({n:"Báo tin có thai",t:"Đang giấu thai. Báo tin thì được sủng ái, nhưng kẻ ác cũng biết.",c:{},o:100,w:{sung:6,th:5},x:"phi tần có thể nhắm vào thai",go:()=>{S.hidden=false;ghenAll(6)}});
 const s=STORY[S.origin.k];if(!S.st.done&&s.acts)X.push(...s.acts());
 X.push(...directActs());X.push(...illCards());
 X.forEach(a=>{if(!a.dom)a.dom=/Dạy dỗ|con đến|Chữa bệnh/.test(a.n)?"Con cái":/an thai|Báo tin/i.test(a.n)?"Sức khỏe":/Tranh sủng|Chặn ngự giá/.test(a.n)?"Sủng":/Thỉnh an|Hối lộ/.test(a.n)?"Giao thiệp":"Tài nghệ"});
 deck=S.out?coldActs().concat(illCards()):X.concat(pool().sort(()=>Math.random()-.5).slice(0,5));
}
/* place acts also offered directly as cards: same option object as at the place (talkOpts), run once by runOpt */
function directActs(){const A=[],mk=(p,i,n,t)=>{const a=talkOpts(p)[i];if(a)A.push(Object.assign({},a,{n,t}))};
 if(!S.thDead)mk({kind:"th"},0,"Thỉnh an Thái hậu","Sang Đức Thọ cung vấn an, chép kinh cho Thái hậu.");
 if(qOn())mk({kind:"hh",ref:rivals[0]},0,"Thỉnh an Hoàng hậu",`Sang Càn Ninh cung vấn an Hoàng hậu ${rivals[0].name}.`);A.forEach(a=>{a.lock=false;a.b=0});
 mk({kind:"ksp"},0,"Hối lộ Kính sự phòng","Đút lót Tổng quản thái giám giữ thẻ bài.");
 return A}
function canPay(a){return !(a.c&&a.c.bac&&S.bac+a.c.bac<0)&&!a.lock}
function runOpt(a){if(!canPay(a))return null;if(a.c)apply(a.c);const o0=a.o==null?100:a.o,o=o0>=100?100:cl(o0+lotB(S,a.dom),5,95);const ok=o>=100||roll(o);
  apply(ok?(a.w||{}):(a.l||{}));
  log(`${a.n}. ${o<100?(ok?'<span class="g">Thành.</span>':'<span class="r">Hỏng.</span>'):""} ${fmt(ok?a.w:a.l)}${ok&&a.x?" · "+a.x:""}`);
  if(ok){if(a.go)a.go()}else if(a.fail)a.fail();
  return ok}
function cardCost(a){return a.k||(a.c&&a.c.suc<=-20?4:a.c&&(a.c.suc||a.c.bac||a.c.duc)?2:1)}
function act(i){const a=deck[i];if(!a||(a.b!=null&&(S.buoi||0)!==a.b)||!can(cardCost(a))||a.done||S.dead||Q.length||!canPay(a))return;a.done=1;spend(cardCost(a));runOpt(a);render()}

/* places */
function places(){const L=[
  {k:"vuon",n:"Ngự hoa viên",d:"Hoa nở bốn mùa. Xuân thu Hoàng thượng hay dạo bước.",sc:"vuon"},
  {k:"thu",n:"Cần Chính điện",d:"Nơi ngài phê tấu chương. Đến không được gọi dễ làm ngài phật ý.",sc:"thu"},
  {k:"dtd",n:"Dưỡng Hòa điện",d:"Tẩm điện của Hoàng thượng. Sủng dưới 50 thì thái giám không cho vào.",sc:"dtd"},
  {k:"tn",n:"Đức Thọ cung",d:"Cung của Thái hậu, khói trầm quanh năm.",sc:"tn"}];
 if(qOn())L.push({k:"kn",n:"Càn Ninh cung",d:`Cung của Hoàng hậu ${rivals[0].name}.`,sc:"kn"});
 for(const v of rivals)if(v.alive&&!v.out&&!v.queen)L.push({k:"r"+v.id,n:`Cung ${v.name}`,d:`${RANKS[v.rank].n} ${v.name} ở đây.`,sc:"rv",v});
 L.push({k:"tyv",n:"Thái y viện",d:"Thuốc thang, thái y, bài thuốc bí truyền.",sc:"tyv"},{k:"ksp",n:"Kính sự phòng",d:"Nơi giữ thẻ bài các phi tần.",sc:"ksp"},{k:"lc",n:"Lãnh cung",d:"Nơi các phi tần thất thế sống lay lắt.",sc:"lc"});
 return L}
function placeOf(k){if(k==="home")return{k,n:"Tẩm cung của ngươi",d:"Cung nữ và các con ở đây.",sc:"home"};const f=places().find(p=>p.k===k);if(f)return f;if(k&&k[0]==="r"){let nm="";try{nm=typeof palName==="function"?palName(k):""}catch(e){}const v=RV(+k.slice(1));if(!nm||/ngươi/.test(nm))nm=v?`Cung của ${v.name}`:"Cung phi tần";return{k,n:nm,d:"",sc:"rv"}}return{k,n:"Tẩm cung của ngươi",d:"",sc:"home"}}
function rp(v){return{kind:"rival",ref:v,name:v.name,ini:v.name.split(" ").pop()[0],col:RCOL[v.queen?7:v.rank],info:`${v.queen?"Hoàng hậu":RANKS[v.rank].n} · ${trChip(v)} · Với ngươi: Thiện cảm ${aff(v,S)} · Oán ${oan(v,S)} · Ghen ${v.ghen}${sameHouse(S,v)?" · cùng cung":""}`}}
function goTo(k){if(S.dead||Q.length||S.out)return;popIdx=null;popMsg="";
 if(k==="home"){S.place="home";S.visit={k,people:homePeople(),talked:false,tk:{}};render();return}
 const tc=travel(S.place,k);if(!can(tc+1)||S.confined)return;const P=placeOf(k);spend(tc);S.place=k;const W=S.where||{};
 const ppl=[];let msg="";const emp={kind:"emp",name:"Hoàng thượng",ini:"帝",col:"#f0d070",info:`${empName()} · ${MOODS[S.emp.mood][0].toLowerCase()}`};
 const here=liveRivals(true).filter(v=>W[v.id]===k);const empHere=W.emp===k;
 if(k==="vuon"){if(empHere){ppl.push(emp);apply({sung:S.emp.mood<=1?3:1});msg="Ngươi tình cờ gặp Hoàng thượng đang dạo bước. Ngài dừng lại nhìn ngươi."}else msg="Hoa nở rộ. Hoàng thượng không ra vườn hôm nay."}
 if(k==="thu"){if(empHere){if(S.sung<40&&!roll(od(40+S.sung+mm()))){apply({sung:-3});S.visit={k,people:[emp],talked:true,tk:{},msg:"Hoàng thượng cau mày: “Trẫm đang bận việc nước.” Ngươi phải lui ra."};log("Đến Cần Chính điện, bị đuổi về.");render();return}
   ppl.push(emp);msg="Hoàng thượng đang phê tấu chương, ngẩng lên nhìn ngươi."}else msg="Ngài không có ở thư phòng."}
 if(k==="dtd"){if(S.sung<50)msg="Thái giám chặn cửa: “Không có khẩu dụ, nương nương xin hồi cung.”"+(empHere?" Hoàng thượng ở bên trong, ngươi không được gặp.":"");else if(empHere){ppl.push(emp);msg="Hoàng thượng đang nghỉ, cho ngươi vào hầu."}else msg="Hoàng thượng không có ở điện."}
 if(k==="tn"){if(S.thDead)msg="Đức Thọ cung vắng lặng từ ngày Thái hậu băng hà.";else ppl.push({kind:"th",name:"Thái hậu",ini:"慈",col:"#c9a0e0",info:`Thái hậu · lòng ${S.th}`})}
 for(const v of here){if(v.ill)v.ill.known=true;if(v.queen&&qOn())ppl.push({...rp(v),kind:"hh",name:`Hoàng hậu ${v.name}`,ini:"鳳"});else ppl.push(rp(v))}
 if(P.v&&!here.includes(P.v)&&P.v.alive&&!P.v.out){ppl.push({kind:"chest",ref:P.v,name:`Rương của ${P.v.name}`,ini:"箱",col:"#8a6a4a",info:"Chủ nhân đi vắng"});msg=`${P.v.name} không có ở cung.`}
 if(k==="tyv")ppl.push({kind:"ty",name:"Thái y Trương",ini:"醫",col:"#8fc38a",info:"Thái y viện"});
 if(k==="ksp")ppl.push({kind:"ksp",name:"Tổng quản",ini:"宦",col:"#b9a48a",info:"Giữ thẻ bài các phi tần"});
 if(k==="lc"){const f=rivals.filter(v=>v.alive&&v.out);(f.length?f.slice(0,3):[null]).forEach(v=>ppl.push(v?{kind:"fallen",ref:v,name:v.name,ini:v.name.split(" ").pop()[0],col:"#6a7a8a",info:"Phế phi"}:{kind:"fallen",name:"Phế phi họ Lý",ini:"李",col:"#6a7a8a",info:"Phế phi"}))}
 if(!msg)msg=ppl.length?`Ở đây có ${ppl.length} người.`:"Không gặp ai.";
 S.visit={k,people:ppl,talked:false,tk:{},msg};log(`Đến ${P.n}.`);render()}
function curPeople(){return S.visit?S.visit.people:[]}

function talkOpts(p){const E=S.emp,K=E.known,L=E.likes,b=bestArt(),v=p.ref;
 if(p.kind==="emp"){const A=[
   {n:"Tâng bốc",o:od(55+S.sung/5+mm()),w:{sung:3},l:{sung:-1},go:()=>{if(roll(25))discover()}},
   {n:"Nói thật lòng",o:od(45+S.duc/3+mm()+(has("nhantu")?10:0)),w:{sung:2,danh:2},l:{sung:-2},x:"có thể biết ngài thích gì",go:()=>{if(roll(50))discover()}},
   {n:`Phô tài: ${b.n}`,c:{suc:-5},o:od(30+b.w*10+mm()),w:{sung:4+b.l,danh:1},l:{danh:-2}},
   {n:K.flower?`Dâng ${L.flower}`:"Dâng một cành hoa",c:{bac:-5},o:K.flower?100:od(50),w:{sung:K.flower?6:2},l:{}}];
  if(S.sung>=30)A.push({n:"Xin ân điển",o:od(35+S.sung/3+mm()),w:{bac:60},l:{sung:-4},fail:()=>{if(E.mood===3&&roll(40))punish("làm phiền lúc thánh thượng nổi giận",1)}});
  if(has("chamchinh"))A.push({n:"Bàn chuyện triều chính",o:od(40+S.tamco/2+S.arts.thi*3+mm()),w:{sung:4,danh:3},l:{sung:-2}});
  return A}
 if(p.kind==="th"){if(false)return[{n:"Xin xăm ở Phật đường",o:100,x:"rút hai quẻ, giữ quẻ tốt hơn",run:()=>{reLot(true);return "Ngươi thắp hương, xin một quẻ mới."}},];const t=liveRivals(false).filter(x=>x.ev>0).sort((a,c)=>c.ev-a.ev)[0];return[
   {n:"Thỉnh an, chép kinh",lock:(S.buoi||0)!==0,t:"chỉ buổi sáng",c:{suc:-5},o:od(75),w:{th:8,danh:2,duc:1},l:{th:-2}},
   {n:"Xin Thái hậu đỡ lời",o:od(45+S.th/3),lock:S.th<30,t:"cần Thái hậu 30",w:{danh:4,hh:5},x:"Hoàng hậu nể mặt",l:{th:-5}},
   {n:t?`Kể tội ${t.name}`:"Kể tội một phi tần",lock:!t,t:"cần chứng cứ",o:t?od(40+t.ev*10+S.th/5):0,w:{th:2,duc:-2},x:"nàng bị phạt",l:{th:-4},go:()=>{t.rel-=15;t.ev--;t.sung=cl(t.sung-10,0,100);log(`${t.name} bị Thái hậu quở trách, mất sủng.`)}}]}
 if(p.kind==="hh"){return topicOpts(v).filter(a=>["Hỏi han sức khỏe","Tạ lỗi","Nhún nhường","Chia sẻ bí mật"].includes(a.n)).concat([
   {n:"Thỉnh an",lock:(S.buoi||0)!==0,t:"chỉ buổi sáng",c:{suc:-5},o:od(70),w:{hh:8,danh:2,duc:1},l:{hh:-3},go:()=>{v.ghen=cl(v.ghen-5,0,100)}},
   {n:"Xin Hoàng hậu che chở",lock:S.hh<20,t:"cần Hoàng hậu 20",o:od(45+S.hh/3),w:{hh:3},x:"2 tháng phi tần khó hại ngươi",l:{hh:-5},go:()=>S.shield=2},
   {n:"Khiêu khích",o:100,w:{danh:2,hh:-15},x:"Hoàng hậu ghen +15",go:()=>{v.ghen=cl(v.ghen+15,0,100);relAdd(S,v,-10)}}])}
 if(p.kind==="rival"){const A=topicOpts(v);
  if(!sameHouse(S,v)){A.push({n:"Tặng quà",o:100,x:"chọn món trong rương",open:()=>{if(S.inv.some(e=>!e.h))pushDil(mkP("giftpick",{v:v.id}),"Tặng quà")}});
   A.push({n:"Khiêu khích",o:100,w:{danh:1},x:"nàng oán +10, ghen +10",go:()=>{relAdd(S,v,-15);v.ghen=cl(v.ghen+10,0,100)}});
   if(v.pg>=50)A.push({n:"Trút giận",o:100,w:{duc:-3},x:"hả cơn ghen; nàng oán",go:()=>{v.pg=0;relAdd(S,v,-20)}});
   A.push(...placeHarms(v,S.place));if(liveRivals(true).filter(x=>whereOf(x)===S.place).length>=2)A.push({n:"Nghe lén câu chuyện",o:od(40+S.mat*6),x:"chứng cứ +1",run:()=>overhear(S.place)})}
  return A}
 if(p.kind==="chest"){if(sameHouse(S,v))return[];return[{n:"Cài đồ vào rương nàng",o:cl(oPlant(S,v)+15,5,95),x:"chọn món đồ · tại chỗ, dễ hơn sai người",open:()=>{if(S.inv.some(e=>!e.h)&&can(2))pushDil(mkP("plantpick",{v:v.id,here:1}),"Cài đồ vào rương")}},
  {n:"Lục rương tìm chứng cứ",o:od(45+S.mat*5),act:1,x:"chứng cứ +1 · lộ: bị phạt",run:()=>{if(roll(od(45+S.mat*5))){evA(S,v,1);return `Lục được thư từ của ${v.name}: chứng cứ +1.`}relAdd(S,v,-15);punish("lục lọi cung phi tần",1);return "Bị cung nhân bắt gặp."}}]}
 if(p.kind==="ty"){const A=[];if(illOf(S))A.push({n:"Xin chữa bệnh",c:{bac:-30},o:100,x:illName(S),run:()=>treat(S,"ty")});A.push({n:"Bài thuốc dễ thụ thai",c:{bac:-40},o:100,x:"3 tháng dễ có thai hơn",go:()=>S.fert=3});
  if(!S.doctor)A.push({n:"Mời làm thái y tâm phúc",c:{bac:-50},o:100,x:"dễ phát hiện xạ hương, độc; bệnh của con nhẹ hơn",go:()=>S.doctor=1});
  const k=S.kids.filter(x=>x.alive&&x.hp<80).sort((a,c)=>a.hp-c.hp)[0];if(k)A.push({n:`Xin thuốc cho ${k.name}`,c:{bac:-30},o:100,x:"Sức khỏe +25",go:()=>{k.hp=Math.min(100,k.hp+25)}});
  A.push({n:"Học hỏi y lý",c:{bac:-10},o:100,x:"Y thuật tiến bộ +1",go:()=>addArt("y",1)});return A}
 if(p.kind==="ksp"){const A=[{n:"Đút lót lật thẻ",c:{bac:-30},o:100,lock:S.tablet>0,t:`đang có hiệu lực ${S.tablet} tuần`,x:`2 tuần tới dễ được lật thẻ: ${word(nightCh())} → dễ hơn một bậc`,go:()=>S.tablet=2}];
  if(Object.keys(LIKES).some(k=>!K[k]))A.push({n:"Hỏi sở thích Hoàng thượng",c:{bac:-15},o:od(80),x:"biết thêm một điều ngài thích",go:()=>discover()});
  A.push({n:"Xem sổ thị tẩm",o:100,x:"biết ai đang được sủng",go:()=>log("Sổ thị tẩm: "+liveRivals(true).map(x=>`${x.name} ${x.nights} lần`).join(", ")+`; ngươi ${S.nights} lần.`)});return A}
 if(p.kind==="peddler")return S.shop.slice(0,6).map(k=>({n:`Mua ${IT[k].n}`,c:{bac:-IT[k].pr},o:100,x:IT[k].d,go:()=>S.inv.push({k})}));
 if(p.kind==="fallen")return[
   {n:"Đưa cơm áo",c:{bac:-20},o:100,w:{duc:4}},
   {n:"Hỏi chuyện cũ",o:od(50+S.tamco/5),x:"chứng cứ một phi tần +1",go:()=>{const t=liveRivals(true);if(t.length){const x=pick(t);x.ev++;log(`Phế phi kể chuyện xấu của ${x.name}: chứng cứ +1.`)}}}];
 if(p.kind==="maid")return[
   {n:"Tâm sự",o:100,w:{maid:6}},
   {n:"Sai đi dò la",o:od(40+S.maid.loyal/3),w:{},l:{maid:-5},x:"chứng cứ một phi tần +1",go:()=>{const t=liveRivals(true);if(t.length){const x=pick(t);x.ev++;log(`${S.maid.name} nghe lén được chuyện của ${x.name}.`)}}}];
 return []}
function talk(oi){if(popIdx==null||!S.visit||S.visit.talked===true||S.dead||Q.length)return;S.visit.tk=S.visit.tk||{};if(S.visit.tk[popIdx])return;const p=curPeople()[popIdx];if(!p)return;const a=talkOpts(p)[oi];if(!a||!canPay(a))return;
 const tcost=a.act?2:1;if(!can(tcost))return;spend(tcost);
 if(a.run){if(a.c)apply(a.c);S.visit.tk[popIdx]=1;popMsg=a.run()||"";if(popMsg)log(`${a.n}: ${popMsg}`);render();return}
 if(a.open){a.open();render();return}
 S.visit.tk[popIdx]=1;const ok=runOpt(a);popMsg=`${a.n}: ${ok?'<span class="g">thành</span>':'<span class="r">hỏng</span>'}. ${fmt(ok?a.w:a.l)}`;render()}

/* arts */
function addArt(k,g){const a=ARTS.find(x=>x.k===k);S.artp[k]+=g;
 while(S.arts[k]<5&&S.artp[k]>=S.arts[k]+2){S.artp[k]-=S.arts[k]+2;S.arts[k]++;const l=S.arts[k];const f={[a.st]:2};if(l===3)f.danh=3;if(l===5)f.danh=6;apply(f);
   log(`<span class="g">${a.n} lên bậc ${l}.</span> ${fmt(f)}${l===3?" Cả cung nghe danh.":l===5?" Tiếng tăm vang khắp kinh thành.":""}`)}
 if(S.arts[k]>=5)S.artp[k]=0}
function lesson(k){const l=S.arts[k],cost=5+l*5;if(!can(2)||l>=5||S.bac<cost||S.dead||Q.length||S.mg)return;apply({suc:-10,bac:-cost});spend(2);render();
 S.mg={k,l};save();resumeMG()}
function resumeMG(){const m=S.mg;if(!m)return;const a=ARTS.find(x=>x.k===m.k);openMG(m.k,m.l,g=>{S.mg=null;log(`Học ${a.n}. Tiến bộ +${g}.`);addArt(m.k,g);render()})}
function hireMaster(){if(S.bac<60||S.master||S.dead)return;apply({bac:-60});S.master=3;log("Mời danh sư vào cung dạy: 3 tháng tiến bộ gấp đôi.");render()}

/* what a won night is worth, in numbers: a full thị tẩm (Sủng, Ân tình, a chance of a child and of a gift); the cost to the rival on a red 'kèm' line */
function stealX(v,road){let c=0;try{c=conceiveCh(S)}catch(e){}return `Sủng +3..8 · Ân tình +2..7${S.preg?"":` · thai: ${word(c)}`} · có thể được thưởng · kèm: ${v.name} ghen +25, thù -15`}

/* portraits */
const AV=window.AVATARS||{women:[],emperor:[],maids:[]};
function drawFace(){const n=(AV.women||[]).length;if(!n)return{face:-1,hue:0};S.usedFaces=S.usedFaces||[];
  let free=[...Array(n).keys()].filter(i=>!S.usedFaces.includes(i));let hue=0;
  if(!free.length)return{face:-1,hue:0};const f=pick(free);S.usedFaces.push(f);return{face:f,hue:0}}
function srcW(o){return o&&o.face>=0&&AV.women&&AV.women[o.face]?AV.women[o.face]:""}
function pv(v){const g=rkOfFace("consort",v);return{rk:g[0],rw:g[1],w:["r",v.id],src:fsrc(v.fc,srcW(v)),hue:0,ini:v.name.split(" ").pop()[0],col:RCOL[v.queen?7:v.rank]}}
function pEmp(){return{rk:"emp",rw:"Hoàng thượng",w:["e"],src:fsrc(S.emp.fc,(AV.emperor||[])[S.emp.face]||""),hue:0,ini:"帝",col:"#f0d070"}}
function pTH(){return{rk:"th",rw:"Thái hậu",w:["t"],src:fsrc(S.thF,AV.empress_dowager||""),hue:0,ini:"慈",col:"#c9a0e0"}}
function pMaid(){const m=S.maid;return{rk:"sv2",rw:"Cung nữ thân tín",w:["m"],src:maidSrc(m),hue:0,ini:m.name.split(" ").pop()[0],col:"#b9a48a"}}
/* faces by role and age band, fixed for life (saved): young maids img/face-maid-1..6; the elderly portrait only for an old nurse role (nhũ mẫu / ma ma, 45+) */
function maidSrc(m){return fsrc(m.fc,m.old&&m.age>=45&&AV.maids&&AV.maids[1]?AV.maids[1]:"")}
function eunBand(age){return age<28?0:age<40?1:age<52?2:3}
function pMe(){const g=rkOfFace("consort",S);return{rk:S.out?"cold":g[0],rw:S.out?"Lãnh cung":g[1],w:["me"],src:fsrc(S.fc,srcW(S)),hue:0,ini:S.name.split(" ").pop()[0],col:RCOL[S.rank]}}
function pMsg(){const t=S&&S.court&&S.court.tq;return{src:t?courtSrc("tq",t):"img/face-eunuch-4.webp",hue:0,ini:"宦",col:"#8a8aa0"}}
function pDoc(){return{rk:"off",rw:"Thái y",w:["d"],src:fsrc(S&&S.court&&S.court.ty&&S.court.ty.fc,"img/face-physician.webp"),hue:0,ini:"醫",col:"#8fc38a"}}
function mdH(p,cls){return `<span class="md ${cls||""}${p.rk?" rk-"+String(p.rk).split(" ").join(" rk-"):""}" style="--c:${p.col}">${p.src?`<img src="${p.src}" alt="" data-i="${p.ini}" onerror="this.parentNode.textContent=this.dataset.i">`:p.ini}</span>`}
function newMaid(name,loyal,age){return{name,loyal,age:age||16+R(7),fc:""}}

/* modal queue */
function pushModal(m){Q.push(m);}
/* saveable pending choices: a modal with opts is stored as {pid,pp,t}; PEND[pid](pp) rebuilds text and handlers */
const PEND={};const RV=id=>rivals.find(x=>x.id===id)||null;
function mkP(id,pp){pp=pp||{};const d=PEND[id]&&PEND[id](pp);if(!d)return null;d.pid=id;d.pp=pp;return d}
function pushDil(d,title){if(!d)return"";pushModal({t:title||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp});return""}
function WHO(w){if(!w)return null;const v=w[0]==="r"?RV(w[1]):null;return w[0]==="r"?(v?pv(v):null):w[0]==="e"?pEmp():w[0]==="t"?pTH():w[0]==="m"?pMaid():w[0]==="me"?pMe():w[0]==="d"?pDoc():null}
function serQ(){return Q.map(m=>m.pid?{pid:m.pid,pp:m.pp,t:m.t}:m.opts?null:{t:m.t,h:m.h,cls:m.cls,btn:m.btn,w:m.who&&m.who.w}).filter(Boolean)}
function deserQ(L){const out=[];for(const e of L||[]){try{if(e.pid){const d=mkP(e.pid,e.pp);if(d)out.push({t:e.t||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp})}else out.push({t:e.t,h:e.h,cls:e.cls,btn:e.btn,who:WHO(e.w)})}catch(x){}}return out}
function showModal(){const M=$("modal");if(!Q.length){M.hidden=true;return}const m=Q[0];
  M.className="modal "+(m.cls||"");$("mt").textContent=/pcm/.test(m.cls||"")?"":m.t;$("mt").hidden=/pcm/.test(m.cls||"");try{const ar=evArt();M.querySelector(".dlg").style.setProperty("--dart",ar&&(m.who||/pcm/.test(m.cls||""))?`url(${ar})`:"none")}catch(e){}
  const wh=m.who||null;const art=!m.who&&m.opts&&!m.faces?evArt():"";$("mb").innerHTML=(m.faces?`<div class="faces">${m.faces.map(f=>`<figure>${pframe(Object.assign({},f[0],{rw:""}))}<figcaption><b>${f[1]}</b>${f[0].rw?`<small>${f[0].rw}</small>`:""}</figcaption></figure>`).join("")}</div>`:"")+(m.faces||/pcm/.test(m.cls||"")?m.h:`<div class="spk">${wh?pframe(wh):pframeArt(art||evArt())}<div class="spkt">${m.h}</div></div>`)+(m.opts?`<div class="opts">${m.opts.map((c,i)=>{const poor=c.fx&&c.fx.bac&&S.bac+c.fx.bac<0;return `<button class="opt" data-m="${i}" ${poor?"disabled":""}>${c.n}<small>${dilLine(c)}</small></button>`}).join("")}</div>`:"");
  $("mr").innerHTML=m.opts?"":`<button class="main" id="mclose">${m.btn||"Đã rõ"}</button>`;
  kitFix(M);M.hidden=false;const f=M.querySelector(".opt:not(:disabled),#mclose");if(f)f.focus({preventScroll:true})}
function closeModal(){const m=Q.shift();if(m&&m.onClose)m.onClose();if(!S.dead||Q.length)showModal();render()}
function chooseM(i){const m=Q[0];if(!m||!m.opts)return;const c=m.opts[i];if(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)return;Q.shift();
  apply(c.fx||{});log(`${c.n}. ${fmt(c.fx)}${c.x&&!c.go?" · "+c.x:""}`);if(c.go)c.go();showModal();render()}

/* nights */
/* rivals */
/* children, pregnancy, heir */
function heirMonth(){if(S.heir&&S.heir.k.alive)return"";S.heir=null;
  const c=allKids().filter(([k])=>k.alive&&k.sex==="m"&&k.age>=6);if(!c.length||!roll(15))return"";
  const w=c.map(([k,v])=>5+momRank(v)*10+k.tal/2+k.fond/2+(v?0:Math.max(0,S.th)/2));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}
  const [k,v]=c[i];setHeir(k,v);fx("gold");return v?`Hoàng thượng lập ${k.name}, con của ${v.name}, làm Thái tử. `:`<b class="g">Hoàng thượng lập ${k.name}, con của ngươi, làm Thái tử.</b> Danh +10. `}

/* promotion */
/* Emperor mood, festivals, dilemmas */
function moodMonth(){const E=S.emp;let L=[[0,"Được mùa khắp nơi, Hoàng thượng vui vẻ."],[0,"Sứ thần các nước vào triều cống, ngài rất vui."],[1,""],[1,""],[2,"Lũ lụt ở Giang Nam, Hoàng thượng phiền muộn."],[2,"Hạn hán miền bắc, ngài ăn ngủ không yên."],[3,"Quan tham bị phát giác, Hoàng thượng nổi giận."],[3,"Biên ải có giặc cướp phá, ngài giận dữ."]];
  if(has("nongnay"))L=L.filter(x=>x[0]!==1);if([1,7,8].includes(S.month))L.push([0,"Ngày hội trong cung, ngài vui."],[0,"Ngày hội trong cung, ngài vui."]);
  const [m,t]=pick(L);E.mood=m;return t?`Tháng này: ${t} `:""}
PEND.vase=()=>({who:pMaid(),t:`${S.maid.name} lỡ tay đánh vỡ chén ngọc Hoàng hậu ban. Thái giám Càn Ninh cung đến bắt người.`,o:[
    {n:"Nhận tội thay nàng",fx:{hh:-5,danh:-3,maid:30}},{n:"Để nàng chịu đòn",fx:{maid:-30,duc:-3},x:"bị đánh 20 trượng"}]});
PEND.coldletter=p=>{const f=RV(p.f),v=p.v==null?null:RV(p.v);if(!f)return null;return{who:pv(f),t:`${f.name} từ lãnh cung lén gửi thư, xin chút bạc chạy thuốc.`,o:[
    {n:"Giúp nàng",fx:{bac:-30,duc:5},x:v?`${v.name} nghe chuyện, mến ngươi hơn`:"",go:()=>{if(v)v.rel+=20}},{n:"Làm ngơ",fx:{duc:-2}}]}};
PEND.embezzle=()=>{const q=rivals[0];return{who:pEunOf(q),t:`Một thái giám lén mang đến sổ sách chứng Hoàng hậu ${q.name} biển thủ bạc nội khố, đòi 80 lượng.`,o:[
    {n:"Mua lấy",fx:{bac:-80},x:"chứng cứ Hoàng hậu +2",go:()=>{q.ev+=2}},{n:"Đuổi hắn đi",fx:{}}]}};
PEND.tuyen=()=>({who:pEmp(),t:"Hoàng thượng hỏi ý ngươi: năm nay nên tuyển thêm tú nữ hay không.",o:[
    {n:"Tâu nên tuyển ít",fx:{danh:4,sung:-3}},{n:"Tâu nên tuyển nhiều",fx:{sung:5,duc:-3},x:"tháng sau thêm một tú nữ",go:()=>{S.moreRivals=1}}]});
PEND.thbenh=()=>({who:pTH(),t:"Thái hậu lâm bệnh, Đức Thọ cung đóng cửa không tiếp khách.",o:[
    {n:"Hầu bệnh cả tháng",fx:{suc:-25,th:15,duc:4}},{n:"Gửi lễ vật vấn an",fx:{bac:-30,th:4}}]});
PEND.loveletter=p=>{const v=RV(p.v);if(!v)return null;return{who:pSpy(),t:`Tai mắt nhặt được thư tình ${v.name} viết cho một thị vệ.`,o:[
    {n:"Trình lên Hoàng thượng",fx:{},x:`${word(50)} · thành: ${v.name} thất thế · hỏng: Danh -8`,go:()=>{if(roll(50))fall(v,"bị bắt được thư tư tình với thị vệ");else{apply({danh:-8});log(`<span class="r">Hoàng thượng cho là thư giả, trách ngươi gây chuyện.</span> Danh -8.`)}}},
    {n:"Cất giữ làm con tin",fx:{},x:`chứng cứ ${v.name} +2`,go:()=>{v.ev+=2}}]}};
function makeDil(){const pool=liveRivals(false),L=[];
  if(qOn())L.push(()=>mkP("vase"));
  if(rivals.some(v=>v.alive&&v.out))L.push(()=>{const f=pick(rivals.filter(v=>v.alive&&v.out));const v=pool.length?pick(pool):null;return mkP("coldletter",{f:f.id,v:v?v.id:null})});
  if(qOn())L.push(()=>mkP("embezzle"));
  L.push(()=>mkP("tuyen"));
  if(!S.thDead)L.push(()=>mkP("thbenh"));
  if(pool.length)L.push(()=>mkP("loveletter",{v:pick(pool).id}));
  const F=freshEvents();for(const e of F)L.push(()=>mkEv(e.id));if(F.length)L.push(()=>mkEv(pick(F).id));
  for(let t=0;t<4;t++){const d=pick(L)();if(d)return d}return null}

/* the turn */
function endTurn(){
  if(S.dead||Q.length||S.mg)return;S.buoi=0;const qStart=Q.length;let ev=resolveTonight();
  S.sung=cl(S.sung-((has("lanhlung")&&S.tuan===1)||(S.rank>=7&&S.tuan!==0)?0:1),0,100);
  const rg=harsh()?1:4;S.suc=cl(S.suc+rg,0,100);liveRivals(true).forEach(v=>v.suc=cl(v.suc+rg,0,100));if(S.tablet)S.tablet--;
  ev+=rivalsTurn();if(S.dead)return;
  if(S.suc<=0)return die("Bệnh nặng, không qua khỏi");
  if(S.tuan===2){ev+=monthTick();if(S.dead)return}else S.tuan++;
  if(Q.length===qStart&&roll(22))pushDil(makeDil());
  rollWx();S.place="home";placeWhere();if(S.out)coldVisit();S.visit={k:"home",people:homePeople(),talked:false};used=0;popIdx=null;popMsg="";
  flip();if(!S.dead)newLots();
  if(ev)Q.splice(qStart,0,{t:"Tin trong cung",h:`<p class="past">${when()}</p><p>${ev}</p>`});
  if(S.justCrowned){S.justCrowned=0;record("Lên ngôi Hoàng hậu");Q.unshift({t:"Mẫu nghi thiên hạ",cls:"end",who:pMe(),h:`<p>Sau ${S.year} năm trong cung, ${S.name} nhận kim sách kim ấn, lên ngôi Hoàng hậu.</p><p>Con đường còn lại: đưa một hoàng tử lên ngôi, thành Hoàng thái hậu.</p>`,btn:"Tiếp tục"})}
  if(ev)log(ev);
  curtain();deal();render()}
function monthTick(){let ev="";
  S.turn++;ev+=monthPay();
  if(S.pray)S.pray--;if(S.fert)S.fert--;if(S.master)S.master--;if(S.confined)S.confined--;if(S.shield)S.shield--;
  if(S.arts.thi>=3)S.sung=cl(S.sung+(S.arts.thi>=5?2:1),0,100);
  ev+=maidMonth();ev+=pregMonth();if(S.dead)return ev;S.anthai=0;ev+=itemMonth(S);anMonth(S);restock();oanMonth();assignHouses();S.chat={};ev+=illMonth();ev+=coldMonth();if(S.dead)return ev;ev+=servRanks();ev+=servMonth();ev+=facMonth();
  const dd=has("nhantu")?2:1;if(S.duc>=60)S.th=cl(S.th+dd,-100,100);else if(S.duc<20)S.th=cl(S.th-dd,-100,100);
  if(S.moreRivals&&!roomFor("consort"))S.moreRivals=0;if(S.moreRivals){S.moreRivals=0;const n=newRival(R(3));Object.assign(n,drawFace());rivals.push(n);ev+=`Theo lời ngươi tâu, cung tuyển thêm tú nữ: ${n.name} vào cung, phong ${RANKS[n.rank].n}. `}
  ev+=kidsMonth();S.storms=0;ev+=rivalsMonth();ev+=storyMonth();if(S.dead)return ev;ev+=heirMonth();
  if(!S.out&&S.sung<=0&&S.danh<=5&&S.rank<=1){cold("Bị bỏ quên, đưa vào lãnh cung");return ev}
  const wasQ=S.rank>=7;ev+=promote();if(!wasQ&&S.rank>=7)S.justCrowned=1;
  S.month++;S.tuan=0;
  if(S.month>12){S.month=1;S.year++;S.age++;S.emp.age++;if(typeof ageYear==="function")ageYear();allKids().forEach(([k])=>{if(k.alive)k.age++});
    if(S.heir&&!S.heir.v&&S.heir.k.alive){apply({danh:5});ev+="Ngươi là mẹ Thái tử, danh vọng thêm cao. Danh +5. "}
    if(S.age>25){S.sac=Math.max(10,S.sac-2);ev+=`Năm mới, ngươi ${S.age} tuổi; nhan sắc phai dần (Sắc ${S.sac}). `}}
  if(S.age>=40&&S.rank<7&&!mySons().length){over("Lãnh cung","Tuổi xuân qua đi, sống cô quạnh nơi thâm cung.","Tuổi xuân qua đi");return ev}
  if(S.year>12&&roll((S.year-12)*1.5+Math.max(0,S.emp.age-50)*.5)){emperorDies(ev);return ev}
  ev+=moodMonth();
  if(S.month===1)ev+=festival("Yến tiệc đầu xuân","sac","Sắc và điệu múa");
  if(S.month===7)ev+=festival("Thi tài ngày Thất tịch","tai","Tiếng đàn, lời thơ");
  return ev}
function curtain(){const c=$("curtain");c.textContent=`${TUAN[S.tuan][0].toUpperCase()+TUAN[S.tuan].slice(1)} · ${BUOI[S.buoi||0]} · tháng ${S.month}, năm ${S.year}`;c.classList.add("on");setTimeout(()=>c.classList.remove("on"),650)}

/* endings */
function emperorDies(ev){if(ev)log(ev);let h=S.heir&&S.heir.k.alive?S.heir:null;
  if(!h){const c=allKids().filter(([k])=>k.alive&&k.sex==="m").sort((a,b)=>b[0].age-a[0].age);if(c.length)h={k:c[0][0],v:c[0][1]}}
  const pre=`Năm ${S.year}, ${empName()} băng hà, thọ ${S.emp.age} tuổi. `;
  if(!h)return over("Thái phi",pre+"Tiên đế không có hoàng tử nối ngôi, thân vương vào kế vị. Ngươi được tôn làm Thái phi, sống nốt đời ở Thọ Khang cung.","Thành Thái phi");
  if(!h.v)return over("Hoàng thái hậu",pre+`${h.k.name}, con ngươi, lên ngôi. Ngươi được tôn làm Hoàng thái hậu, buông rèm nghe chính.`,"Lên ngôi Thái hậu");
  const v=h.v,live=v.alive&&!v.out;
  if(S.rank>=7)return over("Mẫu hậu Hoàng thái hậu",pre+`${h.k.name}, con của ${v.name}, lên ngôi. Ngươi là đích mẫu, được tôn làm Mẫu hậu Hoàng thái hậu${live?`; nhưng ${v.name} cũng được tôn Thánh mẫu, cùng ngươi chia đôi hậu cung`:""}.`,"Thành Thái hậu (đích mẫu)");
  if(!live)return over("Thái phi",pre+`${h.k.name} lên ngôi. Mẹ ruột tân đế đã không còn, không ai truy cứu chuyện cũ. Ngươi thành Thái phi.`,"Thành Thái phi");
  const o=od(30+S.duc/2+v.rel/2);
  if(roll(o))return over("Thái phi",pre+`${h.k.name} lên ngôi. Tân Thái hậu ${v.name} xét lại chuyện cũ (cơ may: ${word(o)}) rồi tha cho ngươi, cho dời đến Thọ Khang cung.`,"Thành Thái phi");
  return die(`${pre}Tân Thái hậu ${v.name} xét lại chuyện cũ (cơ may: ${word(o)}), ban lụa trắng, ép ngươi tuẫn táng theo tiên đế`)}
function record(fate){const p=store.get("cung-kiep")||[];const e={n:S.name,o:S.origin.n,r:RANKS[S.rank].n,age:S.age,f:fate+(S.st.tag?" · "+S.st.tag:"")};
  if(S.recorded&&p.length)p[0]=e;else p.unshift(e);S.recorded=true;store.set("cung-kiep",p.slice(0,12))}
function pastHTML(){const p=store.get("cung-kiep")||[];return p.length?`<h3>Các kiếp trước</h3><div class="past">`+p.map((k,i)=>`Kiếp ${p.length-i}: ${k.n}, ${k.o}, ${k.r}, ${k.age} tuổi. ${k.f}.`).join("<br>")+`</div>`:""}
function over(h,t,fate){S.dead=true;record(fate);const ms=mySons().length,md=myDaus().length;
  Q=[{t:h,cls:"end",who:pMe(),h:`<p>${t}</p><p class="past">${S.name} · ${S.origin.n} · ${RANKS[S.rank].n} · ${S.age} tuổi · ${ms} hoàng tử, ${md} công chúa · ${S.year} năm trong cung${S.st.tag?` · ${S.st.tag}`:""}</p>`,btn:"Đầu thai kiếp sau",onClose:start}];
  showModal();render()}
function die(why){over("Hồng nhan bạc mệnh",why+".",why)}

/* origin storylines */
function stEnd(r,tag){S.st.done=r;S.st.tag=tag;if(r===1&&!S.dead)bestow(S,"story")}
function setDil(d){return pushDil(d,"Tuyến truyện")}
function storyMonth(){const s=STORY[S.origin.k];if(S.st.done||!s.month)return"";return s.month()||""}
const STORY={
tt:{t:"Quân cờ của Tể tướng",n:3,goal:"Cha ngươi dùng ngươi làm tai mắt trong cung. Đi đến cùng ván cờ của ông, hoặc lật bàn cờ.",
 init(){S.st.loy=0},
 hint:()=>["Đợi thư nhà","Phe ngoại thích của Hoàng hậu sắp ra tay","Cha đang ngầm điều binh (từ năm thứ 4, hoặc khi ngươi có hoàng tử)"][S.st.step]||"",
 month(){const st=S.st;
  if(st.step===0&&S.turn>=2&&roll(30))return setDil(mkP("tt1"));
  if(st.step===1&&roll(25))return setDil(mkP("tt2"));
  if(st.step===2&&(S.year>=4||mySons().length)&&roll(25)){const son=mySons()[0],o=od(25+st.loy*15+S.tamco/4);
   return setDil(mkP("tt3",{son:son?son.name:null,o}))}
  return""}},
dtq:{t:"Trung thần nơi biên ải",n:3,goal:"Cha ngươi trấn giữ biên cương; thắng bại ngoài ải là vinh nhục của ngươi. Khi có kẻ vu cha mưu phản, phải tìm đủ chứng cứ trong hạn.",
 init(){S.st.proof=0;S.st.acc=0},
 hint:()=>S.st.acc?`Còn ${Math.max(0,S.st.acc-S.turn)} tháng, chứng cứ ${S.st.proof}/2`:"Tháng 4 hằng năm có tin biên ải; từ năm thứ 3 có thể có kẻ vu cha",
 month(){const st=S.st;let ev="";
  if(S.month===4&&S.turn>1){if(roll(55)){apply({danh:4,sung:3});S.emp.mood=0;ev+=`<span class="g">Tin thắng trận từ biên ải: cha ngươi phá tan quân giặc.</span> Danh +4 · Sủng +3. `}else{apply({danh:-4,sung:-3});S.emp.mood=2;ev+=`<span class="r">Cha ngươi thua một trận ở Nhạn Môn quan.</span> Danh -4 · Sủng -3. `}}
  if(!st.acc&&S.year>=3&&roll(15)){const p=liveRivals(false);if(p.length){const v=p.slice().sort((a,b)=>a.rel-b.rel)[0];st.acc=S.turn+8;st.accuser=v;st.step=1;v.rel-=10;ev+=`<span class="r">${v.name} xúi cha nàng dâng sớ: Đại tướng quân giữ binh không về, có lòng phản.</span> Hoàng thượng cho 8 tháng tra xét. `}}
  else if(st.acc&&S.turn>=st.acc&&st.proof<2){apply({danh:-20,sung:-15});S.rank=Math.max(0,S.rank-2);stEnd(-1,"Cha bị xử trảm");ev+=`<span class="r">Hết hạn tra xét. Cha ngươi bị xử trảm, ngươi bị giáng xuống ${RANKS[S.rank].n}.</span> Danh -20 · Sủng -15. `}
  return ev},
 acts(){const st=S.st;if(!st.acc)return[];return[{n:"Tìm chứng cứ cha trung thành",t:`Tra quân báo, tìm người làm chứng. Còn ${Math.max(0,st.acc-S.turn)} tháng · chứng cứ ${st.proof}/2.`,c:{bac:-20,suc:-10},o:od(40+S.mat*6+S.tamco/5),w:{},l:{danh:-2},x:"chứng cứ +1",
  go:()=>{st.proof++;st.step=1+st.proof;if(st.proof>=2){const v=st.accuser;apply({danh:8});stEnd(1,"Rửa oan cho cha");log(`<b class="g">Chứng cứ trình lên: cha ngươi trong sạch.</b> Danh +8.`);if(v&&v.alive&&!v.out)fall(v,"bị xét tội vu cáo trung thần")}}}]}},
muoi:{t:"Từ muối lên tước",n:3,goal:"Nhà buôn muối bị coi khinh. Dâng bạc vào quốc khố, được Thái hậu đỡ lời, xin cho cha được phong tước. Buôn lậu bị bắt ba lần là ô danh.",
 init(){S.st.don=0;S.st.caught=0},
 hint:()=>S.st.don<2?`Dâng bạc quốc khố ${S.st.don}/2`:"Xin phong tước cho cha (cần Thái hậu 30)",
 month(){if(roll(12)){apply({danh:-1});return `Các phi tần che miệng cười: “Người có mùi muối.” Danh -1. `}return""},
 acts(){const st=S.st,A=[{n:"Buôn bán lén trong cung",t:"Mua rẻ lụa ngoài cung, bán đắt cho cung nhân.",c:{suc:-5},o:od(65+S.tamco/5),w:{bac:50},l:{danh:-8},x:`bị bắt ${S.st.caught||0}/3 lần thì ô danh, hỏng tuyến truyện`,
  fail:()=>{st.caught++;punish("buôn lậu trong cung",2);if(st.caught>=3){apply({sung:-10});stEnd(-1,"Buôn lậu bị bắt, ô danh");log(`<span class="r">Bị bắt buôn lậu lần thứ hai. Cả cung khinh rẻ ngươi.</span>`)}}}];
  if(st.don<2)A.push({n:"Dâng bạc vào quốc khố",t:"Lấy danh nghĩa cha, giúp triều đình cứu đói.",c:{bac:-100},o:100,w:{danh:3,th:3},x:`lần dâng ${st.don+1}/2`,go:()=>{st.don++;st.step=st.don}});
  else A.push({n:"Xin phong tước cho cha",t:S.th>=30?"Nhờ Thái hậu nói giúp trước mặt Hoàng thượng.":`Cần Thái hậu ủng hộ 30 (nay ${S.th}).`,c:{suc:-5},o:od(45+S.danh/4+S.th/5),w:{danh:10},l:{th:-8},lock:S.th<30,x:"cha được phong tước",go:()=>{st.step=3;stEnd(1,"Nhà được phong tước")}});
  return A}},
cn:{t:"Từ nô tỳ thành chủ tử",n:3,goal:"Chủ cũ khinh ngươi, một mối tình cũ có thể hủy ngươi. Lên tới bậc Phi để rửa sạch thân phận.",
 init(){const v=rivals[1+R(4)];v.oldmis=true;v.rel=-25;S.st.mis=v;S.st.guard="thị vệ "+pick(SURN)+" "+pick(MALEN);S.st.secret=0},
 hint:()=>["Chủ cũ sắp làm khó ngươi","Chuyện cũ sắp bị khơi lại",`Lên bậc Phi (nay ${RANKS[S.rank].n})`][S.st.step]||"",
 month(){const st=S.st,m=st.mis;
  if(st.secret===1&&roll(5)){apply({danh:-20,sung:-20});punish("tư tình với thị vệ",2);stEnd(-1,"Lộ chuyện cũ với thị vệ");return `<span class="r">Thư cũ giữa ngươi và ${st.guard} lọt đến tay Hoàng thượng.</span> Danh -20 · Sủng -20. `}
  if(st.step===0&&S.turn>=2&&roll(30))return setDil(mkP("cn1"));
  if(st.step===1&&roll(25)){const o=od(50+S.tamco/3);return setDil(mkP("cn2",{o}))}
  if(st.step===2&&S.rank>=4){apply({danh:5});st.step=3;stEnd(1,"Rửa sạch thân phận cung nữ");return `<b class="g">Ngươi đã là ${RANKS[S.rank].n}. Không ai còn dám gọi ngươi là nô tỳ.</b> Danh +5. `}
  return""}},
nc:{t:"Hòa thân",n:3,goal:"Phụ vương Nam Chiếu muốn ngươi làm tai mắt. Chọn cố quốc hay triều đình; chiến tranh sẽ phân xử.",
 init(){S.st.m=0},
 hint:()=>S.st.step===0?"Mật sứ cố quốc sắp đến":S.year<4?"Chiến tranh có thể nổ ra từ tháng 9 năm thứ 4":"Chiến tranh có thể nổ ra tháng 9",
 month(){const st=S.st;
  if(st.step===0&&S.turn>=2&&roll(35))return setDil(mkP("nc1"));
  if(st.step>=1&&S.year>=4&&S.month===9){st.step=3;S.emp.mood=3;
   if(st.path==="home"){const o=od(35+st.m*15);if(roll(o)){apply({bac:150});stEnd(1,"Công thần của cố quốc");return `<b class="g">Nam Chiếu thắng trận nhờ tin ngươi gửi về. Đại Hy cầu hòa, cố quốc gửi vàng bạc tạ ơn.</b> Bạc +150. `}
    if(roll(od(30+S.tamco/2))){apply({sung:-15,danh:-10});stEnd(-1,"Bị nghi làm gián điệp");return `<span class="r">Nam Chiếu thua trận. Cả triều nghi ngươi, nhưng không bắt được chứng cứ.</span> Sủng -15 · Danh -10. `}
    stEnd(-1,"Gián điệp bị bắt");deathSentence("Nam Chiếu thua trận, thư mật của ngươi bị tìm thấy");return""}
   if(st.m>=2){apply({danh:10,th:10});stEnd(1,"Đoạn tuyệt cố quốc, được triều đình tin");return `<b class="g">Chiến tranh với Nam Chiếu. Ngươi đứng hẳn về phía Đại Hy, cả triều kính phục.</b> Danh +10 · Thái hậu +10. `}
   apply({sung:-10,danh:-10});stEnd(-1,"Bị nghi kỵ khi chiến tranh");return `<span class="r">Chiến tranh với Nam Chiếu. Triều thần nghi ngươi hai lòng.</span> Sủng -10 · Danh -10. `}
  return""},
 acts(){const st=S.st;if(!st.path)return[];
  if(st.path==="home")return[{n:"Gửi mật thư về Nam Chiếu",t:"Chép bố phòng, giấu trong hộp phấn gửi về.",c:{suc:-5},o:od(55+S.tamco/4+S.mat*3-(DG()?6:0)),w:{bac:30},l:{danh:-5},x:`tin tình báo +1 (đã gửi ${st.m})`,go:()=>{st.m++;st.step=2},
   fail:()=>{if(roll(40)){stEnd(-1,"Gián điệp bị bắt");deathSentence("Mật thư bị chặn, tra ra ngươi làm gián điệp cho Nam Chiếu")}else log("Mật thư bị chặn, may chưa tra ra ngươi.")}}];
  return[{n:"Giảng giải phong tục Nam Chiếu",t:"Giúp Lễ bộ hiểu cố quốc, để triều đình tin ngươi.",c:{suc:-5},o:od(70),w:{danh:3,th:3},l:{},x:`lòng tin +1 (${st.m})`,go:()=>{st.m++;st.step=2}}]}},
td:{t:"Báo thù cho nhà",n:5,goal:"Cả nhà ngươi bị vu mưu phản. Gom 3 chứng cứ, giữ được nhân chứng, lên bậc Tần rồi dâng sớ lật án.",
 init(){const e=rivals[1+R(4)];e.enemy=true;e.rel=-40;S.foe=e.name;S.foeDad="Thượng thư "+e.name.split(" ")[0];S.caseEv=0;S.st.wit=0},
 calc:()=>Math.min(S.caseEv,3)+(S.st.wit?1:0)+(S.avenged?1:0),
 hint:()=>S.caseEv<3?`Chứng cứ ${S.caseEv}/3`:!S.st.wit?"Cần giữ được nhân chứng":S.rank<3?"Lên bậc Tần để dâng sớ":"Có thể dâng sớ lật án",
 month(){const st=S.st;
  if(S.caseEv>=1&&roll(12)){const e=rivals.find(x=>x.enemy);if(roll(oSee(S,false))){if(e)e.ev+=2;return `Tai mắt báo: ${S.foeDad} sai người đốt kho hồ sơ Hình bộ. Ngươi chặn kịp và nắm 2 chứng cứ với ${S.foe}. `}S.caseEv--;return `<span class="r">Kho hồ sơ Hình bộ bốc cháy trong đêm. Một chứng cứ án cũ mất.</span> `}
  if(S.caseEv>=2&&!st.wit&&roll(35))return setDil(mkP("td1"));
  return""},
 acts(){const A=[{n:"Điều tra án cũ",t:`Lục hồ sơ Hình bộ, tìm người làm chứng. Chứng cứ: ${S.caseEv}/3.`,c:{bac:-20,suc:-10},o:od(40+S.mat*6+S.tai/10+S.tamco/5),w:{},l:{danh:-3},x:"chứng cứ án cũ +1",go:()=>{S.caseEv++}}];
  if(S.caseEv>=3){const ok=S.rank>=3&&S.st.wit;A.unshift({n:"Dâng sớ lật án",t:ok?`Đem chứng cứ và nhân chứng trình Hoàng thượng, trị tội ${S.foeDad}.`:!S.st.wit?"Cần giữ được nhân chứng.":"Cần đạt bậc Tần mới được dâng sớ.",c:{suc:-10},o:ok?od(45+S.danh/4+S.sung/5+(has("nhantu")?5:0)):0,w:{danh:20},l:{danh:-15,sung:-10},lock:!ok,x:"lật án, trị tội kẻ thù",
   go:()=>{S.avenged=true;const e=rivals.find(x=>x.enemy);log(`<b class="g">Án cũ được lật. Cả nhà ngươi được rửa oan, truy phong. ${S.foeDad} bị xử trảm.</b>`);if(e&&e.alive&&!e.out){e.out=true;log(`${e.name} bị phế, đày vào lãnh cung.`)}S.thu=0;stEnd(1,"Đã báo thù");fx("gold")},
   fail:()=>{S.caseEv=0;log(`<span class="r">Hoàng thượng nổi giận vì ngươi lật án của tiên đế. Chứng cứ bị thu hủy.</span>`)}})}
  return A}},
ch:{t:"Quân cờ của Thái hậu",n:3,goal:"Thái hậu đưa ngươi vào cung để thay Hoàng hậu. Mệnh lệnh của bà ngày một nặng. Khi bà mất, chỗ dựa sụp đổ.",
 init(){S.st.tool=0},
 hint:()=>["Thái hậu sắp giao việc","Thái hậu sẽ đòi hỏi hơn","Thái hậu tuổi đã cao"][S.st.step]||"",
 month(){const st=S.st,q=rivals[0];
  if(S.rank>=7){st.step=3;stEnd(1,st.tool>=2?"Thay cô tổ đoạt ngôi trung cung":"Tự mình lên ngôi trung cung");return""}
  if(st.step<2&&!qOn())st.step=2;
  if(S.year>=8||(st.step>=1&&S.year>=5&&roll(4))){st.step=3;S.th=0;S.thDead=true;apply({hh:-20});
   if(S.rank>=5){stEnd(1,st.tool>=2?"Quân cờ đắc lực của Thái hậu":"Tự đứng vững khi Thái hậu mất");return `<b>Thái hậu băng hà.</b> Ngươi đã là ${RANKS[S.rank].n}, đứng vững được. Hoàng hậu hận ngươi hơn. Hoàng hậu -20. `}
   apply({sung:-10,danh:-10});stEnd(-1,"Mất chỗ dựa khi Thái hậu băng hà");return `<span class="r">Thái hậu băng hà. Không còn ai che chở, Hoàng hậu bắt đầu trả thù.</span> Sủng -10 · Danh -10 · Hoàng hậu -20. `}
  if(st.step===0&&S.turn>=2&&qOn()&&roll(30))return setDil(mkP("ch1"));
  if(st.step===1&&qOn()&&roll(25)){const o=od(40+S.mat*5+S.tamco/4+S.th/5-(DG()?6:0));return setDil(mkP("ch2",{o}))}
  return""}},
thd:{t:"Tài nữ nhà nho",n:3,goal:"Thơ ngươi có thể làm rạng danh cha. Được phong Tài nữ, rồi xin khắc in sách của cha. Coi chừng kẻ vu ngươi đạo thơ.",
 init(){S.st.stu="Hàn lâm "+pick(SURN)+" "+pick(MALEN);S.st.frames=0;S.st.title=0},
 hint:()=>["Luyện Thi tới bậc 2 hoặc Tài 60","Dự thi Tài nữ (Thi bậc 3 hoặc Tài 70)","Xin khắc in sách của cha (Danh 40)"][S.st.step]||"",
 month(){const st=S.st;
  if(st.step===0&&(S.arts.thi>=2||S.tai>=60)){st.step=1;apply({danh:3});return `Thơ ngươi truyền ra ngoài cung. ${st.stu}, học trò cũ của cha ngươi, đem bình khắp kinh thành. Danh +3. `}
  if(st.step>=1&&roll(10)){const p=liveRivals(false);if(p.length){const v=pick(p),o1=od(30+S.tai/2+artW("thi",S.arts.thi)*8),o2=od(60);
   return setDil(mkP("thd1",{v:v.id,o1,o2}))}}
  return""},
 acts(){const st=S.st;
  if(st.step===1){const ok=S.arts.thi>=3||S.tai>=70;return[{n:"Dự thi Tài nữ ở Hàn lâm viện",t:ok?"Cùng các khuê tú đối thơ trước Hoàng thượng.":"Cần Thi bậc 3 hoặc Tài 70.",c:{suc:-10},o:ok?od(35+S.tai/3+artW("thi",S.arts.thi)*6):0,w:{danh:8,sung:3},l:{danh:-3},lock:!ok,x:"danh hiệu Tài nữ",go:()=>{st.title=1;st.step=2}}]}
  if(st.step===2){const ok=S.danh>=40;return[{n:"Xin khắc in sách của cha",t:ok?"Dâng di cảo của cha lên Hoàng thượng.":`Cần Danh 40 (nay ${S.danh}).`,c:{suc:-5},o:ok?od(45+S.danh/4):0,w:{danh:10,duc:5},l:{danh:-3},lock:!ok,x:"sách cha được khắc in",go:()=>{st.step=3;stEnd(1,"Tài nữ, sách cha được khắc in");fx("gold")}}]}
  return[]}}
};

/* storyline dilemmas: rebuildable from saved params */
PEND.tt1=p=>{const st=S.st;return {t:"Thư nhà: cha ngươi đòi ngươi tâu xin cho môn sinh của ông giữ chức Thị lang Lại bộ.",o:[
   {n:"Tâu xin cho người của cha",fx:{sung:-3,hh:-8},x:"cha hài lòng",go:()=>{st.loy++;st.step=1}},
   {n:"Viện cớ thoái thác",fx:{duc:2},x:"cha phật ý",go:()=>{st.step=1}}]}};
PEND.tt2=p=>{const st=S.st;return {t:"Họ ngoại của Hoàng hậu dâng sớ hặc tội cha ngươi kết bè kéo cánh.",o:[
   {n:"Bỏ bạc lo lót triều thần",fx:{bac:-60,hh:-10},x:"cha thoát nạn",go:()=>{st.loy++;st.step=2}},
   {n:"Đứng ngoài, giữ mình",fx:{danh:2},x:"cha bị phạt bổng, hận ngươi",go:()=>{st.step=2}}]}};
PEND.tt3=p=>{const st=S.st,son=p.son?mySons().find(k=>k.name===p.son):null,o=p.o;if(p.son&&!son)return null;return {t:son?`Cha ngươi ngầm điều cấm quân, định ép Hoàng thượng lập ${son.name} làm Thái tử.`:"Cha ngươi ngầm điều cấm quân, định ép Hoàng thượng phế Hoàng hậu, lập ngươi thay.",o:[
    {n:"Theo cha mưu đại sự",fx:{},x:`${word(o)} · hỏng: cả họ bị tru di`,go:()=>{st.step=3;if(roll(o)){if(son)setHeir(son,null);else if(qOn()){rivals[0].out=true;log(`Hoàng hậu ${rivals[0].name} bị phế.`)}apply({danh:5});stEnd(1,"Cùng cha mưu đại sự thành");log(`<b class="g">Cấm quân vây cung. Hoàng thượng đành nghe theo.</b>`)}else{stEnd(-1,"Mưu phản cùng cha");die("Mưu phản cùng cha, cả họ bị tru di")}}},
    {n:"Mật tâu Hoàng thượng",fx:{danh:12,duc:8,th:10,sung:-5},x:"đại nghĩa diệt thân, nhà ngươi sa sút",go:()=>{st.step=3;stEnd(1,"Đại nghĩa diệt thân, tố giác cha")}}]}};
PEND.cn1=p=>{const st=S.st,m=st.mis;if(!m)return null;return {who:pv(m),t:`${m.name}, chủ cũ của ngươi, bắt ngươi quỳ dâng trà trước mặt các phi tần, nhắc ngươi từng là nô tỳ.`,o:[
   {n:"Nhẫn nhịn",fx:{duc:3,danh:-2},go:()=>{st.step=1}},{n:"Đáp trả sắc sảo",fx:{danh:2},x:`${m.name} thù ngươi hơn`,go:()=>{m.rel-=20;st.step=1}}]}};
PEND.cn2=p=>{const st=S.st,m=st.mis,o=p.o;return {t:`${st.guard}, người từng hẹn ước với ngươi thuở còn làm cung nữ, nay gác cửa cung ngươi. Thái giám của ${m.name} đã đánh hơi thấy.`,o:[
   {n:"Đút bạc bịt miệng",fx:{bac:-50},x:"chuyện chưa dứt hẳn",go:()=>{st.secret=1;st.step=2}},
   {n:"Diệt khẩu tên thái giám",fx:{duc:-8},x:`${word(o)} · hỏng: lộ chuyện`,go:()=>{S.schemes++;st.step=2;if(roll(o)){st.secret=2;apply({tamco:2});log("Tên thái giám chết đuối ở giếng sau.")}else{st.secret=1;apply({danh:-8});log(`<span class="r">Diệt khẩu hỏng, lời đồn đã lan.</span>`)}}},
   {n:"Xin cho hắn ra biên ải",fx:{bac:-20,duc:4},go:()=>{st.secret=2;st.step=2}}]}};
PEND.nc1=p=>{const st=S.st;return {t:"Mật sứ Nam Chiếu trao thư của phụ vương: muốn ngươi dò bố phòng biên ải Đại Hy.",o:[
   {n:"Trung với cố quốc",fx:{},x:"nhận việc mật; lộ là chết",go:()=>{st.path="home";st.step=1}},
   {n:"Dâng thư lên Hoàng thượng",fx:{th:15,danh:5,sung:3},x:"đoạn tuyệt cố quốc",go:()=>{st.path="court";st.step=1}}]}};
PEND.td1=p=>{const st=S.st;return {t:`Lão thái giám họ Vương, nhân chứng còn sống của vụ án nhà ngươi, đang bị người của ${S.foeDad} truy sát.`,o:[
   {n:"Giấu ông ở Tân Giả Khố",fx:{bac:-40},x:"giữ được nhân chứng",go:()=>{st.wit=1}},
   {n:"Mặc kệ",fx:{},x:"chứng cứ -1",go:()=>{S.caseEv=Math.max(0,S.caseEv-1);log(`<span class="r">Xác lão Vương nổi trên sông Kim Thủy.</span>`)}}]}};
PEND.ch1=p=>{const st=S.st,q=rivals[0];return {who:pTH(),t:'Thái hậu gọi ngươi vào Đức Thọ cung: “Hoàng hậu bất tài. Ngươi phải thay nàng. Trước hết, dò xem Càn Ninh cung giấu gì.”',o:[
   {n:"Vâng mệnh cô tổ",fx:{th:8},x:"chứng cứ Hoàng hậu +1",go:()=>{q.ev++;st.tool++;st.step=1}},{n:"Thoái thác",fx:{th:-15,duc:2},go:()=>{st.step=1}}]}};
PEND.ch2=p=>{const st=S.st,q=rivals[0],o=p.o;return {who:pTH(),t:'Thái hậu dúi vào tay ngươi một gói thuốc: “Bỏ vào trà của Hoàng hậu.”',o:[
   {n:"Vâng mệnh",fx:{duc:-10},x:`${word(o)} · hỏng: bị ban chết`,go:()=>{S.schemes++;st.tool++;st.step=2;if(roll(o)){q.alive=false;apply({th:10,tamco:2});log(`<span class="r">Hoàng hậu ${q.name} băng hà sau chén trà chiều.</span>`)}else{stEnd(-1,"Bị Thái hậu phủi tay");deathSentence("Hạ độc Hoàng hậu bị bắt, Thái hậu phủi tay không nhận")}}},
   {n:"Từ chối, tự gây thế lực",fx:{th:-25,danh:4},go:()=>{st.step=2}}]}};
PEND.thd1=p=>{const st=S.st,v=RV(p.v),o1=p.o1,o2=p.o2;if(!v)return null;const lose=()=>{apply({danh:-15});st.frames++;if(st.title){st.title=0;st.step=1;log(`<span class="r">Ngươi bị tước danh hiệu Tài nữ.</span>`)}if(st.frames>=2)stEnd(-1,"Mang tiếng đạo thơ");log(`<span class="r">Cả cung tin ngươi đạo thơ.</span> Danh -15.`)};const win=()=>{apply({danh:5});v.rel-=10;log(`<span class="g">Ngươi rửa được tiếng oan, ${v.name} bẽ mặt.</span>`)};return {who:pv(v),t:`${v.name} tố ngươi chép thơ người xưa rồi nhận là của mình.`,o:[
    {n:"Ứng tác ngay trước mặt Hoàng thượng",fx:{},x:`${word(o1)} · hỏng: Danh -15`,go:()=>roll(o1)?win():lose()},
    {n:`Nhờ ${st.stu} minh oan`,fx:{bac:-40},x:`${word(o2)} · hỏng: Danh -15`,go:()=>roll(o2)?win():lose()}]}};

/* mini-games for art lessons */
const DOI=[["Hoa nở đầu xuân, hương ngập viện","Trăng soi cuối hạ, bóng tràn sân"],["Núi cao mây phủ","Sông rộng sóng xô"],["Gió đưa cành trúc la đà","Mưa rắc nhành mai lác đác"],
 ["Một nét bút son, lòng tựa ngọc","Ba chung rượu cúc, dạ như vàng"],["Đèn khuya soi án sách","Trống sớm giục lều binh"],["Chim kêu bến cũ","Cá lội dòng xưa"],
 ["Lá thu rơi rụng đầy thềm ngọc","Tuyết đông phủ kín khắp lầu son"],["Ngựa hí ngoài thành, cờ phấp phới","Quân reo trên ải, trống dồn dồn"],["Trà thơm mời khách quý","Rượu nhạt tiễn người xa"],
 ["Phượng múa sân rồng","Hạc bay cửa Phật"],["Lòng son chẳng đổi theo năm tháng","Dạ sắt không mòn với nắng mưa"],["Đàn gảy khúc nam phong","Thơ ngâm bài bắc nhạn"],
 ["Sen hồ tây ngát","Cúc giậu đông vàng"],["Cung sâu khóa kín xuân xanh","Lầu vắng giam chìm tuổi ngọc"],["Giọt mưa đêm gõ ngói","Tiếng nhạn sớm qua trời"]];
const YQ=[{q:"Cảm phong hàn, sợ lạnh, không ra mồ hôi. Dùng vị nào?",a:"Ma hoàng",w:["Thạch cao","Hoàng liên","Toan táo nhân"]},
 {q:"Mất ngủ, hồi hộp, tâm thần bất an. Dùng vị nào?",a:"Toan táo nhân",w:["Ma hoàng","Đại hoàng","Bán hạ"]},
 {q:"Thai động không yên, bụng đau âm ỉ. Vị nào an thai?",a:"Ngải cứu",w:["Xạ hương","Hồng hoa","Đào nhân"]},
 {q:"Sốt cao, khát nước, mồ hôi nhiều. Dùng vị nào?",a:"Thạch cao",w:["Nhân sâm","Ma hoàng","Quế chi"]},
 {q:"Khí hư, mệt mỏi, ăn ít. Dùng vị nào?",a:"Nhân sâm",w:["Đại hoàng","Thạch cao","Hoàng liên"]},
 {q:"Ho nhiều đờm, ngực đầy tức. Dùng vị nào?",a:"Bán hạ",w:["Toan táo nhân","Nhân sâm","Ngải cứu"]},
 {q:"Pha hương xông cho người có thai: an thần mà vô hại?",a:"Trầm hương",w:["Xạ hương","Long não","Hồng hoa"]},
 {q:"Ba bát canh dâng lên. Bát nào có độc?",a:"Canh gà: thìa bạc nhúng vào ngả đen",w:["Cháo yến: thìa bạc vẫn sáng","Chè sen: thơm mát, trong veo","Canh cá: mèo ăn ngon lành"]},
 {q:"Ba chén trà. Chén nào có độc?",a:"Chén có mùi hạnh nhân đắng",w:["Chén thơm mùi hoa nhài","Chén chát nhẹ vị trà mạn","Chén ngọt hậu vị cam thảo"]},
 {q:"Ba thang thuốc an thai. Thang nào bị bỏ xạ hương?",a:"Thang hắc nồng, mùi hương ngai ngái",w:["Thang đắng nhẹ mùi ngải cứu","Thang ngọt vị táo đỏ","Thang thơm mùi trần bì"]},
 {q:"Ba đĩa bánh. Đĩa nào bị hạ độc?",a:"Bánh hoa quế: mèo ngửi rồi bỏ đi",w:["Bánh đậu xanh: mèo ăn sạch","Bánh hạt sen: nếm thử không sao","Bánh táo: thái giám nếm vẫn khỏe"]},
 {q:"Hoàng tử lên đậu, sốt cao, nổi mụn khắp người. Phải làm gì?",a:"Kiêng gió, giữ ấm, cách ly",w:["Tắm nước lạnh cho hạ sốt","Cho ra vườn hóng gió","Cho chơi cùng các hoàng tử khác"]}];
const HOA=[["梅","Mai"],["蘭","Lan"],["菊","Cúc"],["竹","Trúc"],["山","Núi"],["水","Sông"],["鶴","Hạc"],["舟","Thuyền"]];
const VU=[["↑","Giơ tay áo"],["←","Xoay trái"],["→","Xoay phải"],["↓","Cúi mình"]];
const shuf=a=>a.slice().sort(()=>Math.random()-.5);
let mgStop=null,mgDone=true;
const MG={
 cam:["Cầm: tấu khúc",`Nốt rơi xuống bốn dây Cung, Thương, Giốc, Chủy. Chạm đúng dây khi nốt chạm vạch đỏ${typeof matchMedia==="function"&&matchMedia("(pointer:coarse)").matches?"":" (phím D F J K)"}.`,gCam],
 ky:["Kỳ: đấu cờ","Bàn 7×7. Ngươi cầm quân đen đi trước; năm quân liền một hàng là thắng.",gKy],
 thi:["Thi: đối câu","Chọn vế đối chỉnh nhất cho vế ra. 5 câu.",(b,l,e)=>quiz(b,shuf(DOI).slice(0,5).map(([x,y])=>{const wc=s=>s.replace(/,/g,"").split(" ").length;let w=DOI.filter(p=>p[1]!==y&&wc(p[1])===wc(y)).map(p=>p[1]);if(w.length<3)w=w.concat(DOI.filter(p=>p[1]!==y&&!w.includes(p[1])).map(p=>p[1]));return{q:`Vế ra: <b>${x}</b>`,a:y,w:shuf(w)}}),l,e)],
 hoa:["Họa: nhớ nét bút","Lật hai ô một lượt, tìm đủ các cặp giống nhau trong số lượt cho phép.",gHoa],
 vu:["Vũ: theo bước múa","Xem các bước sáng lên rồi múa lại đúng thứ tự. 5 lượt, mỗi lượt dài thêm một bước.",gVu],
 y:["Y thuật & điều hương","Chọn vị thuốc đúng, hoặc tìm thứ có độc. 5 câu.",(b,l,e)=>quiz(b,shuf(YQ).slice(0,5).map(x=>({q:x.q,a:x.a,w:shuf(x.w)})),l,e)]};
function openMG(k,lv,cb){const [t,h,fn]=MG[k];$("mgt").textContent=t;$("mgh").textContent=h;$("ov").hidden=false;mgDone=false;
 const sk=$("mgskip");sk.hidden=false;sk.innerHTML=`Để trời định<small>${word(od(35))} · thành: tiến bộ +1</small>`;
 const fin=(pts,skip)=>{if(mgDone)return;mgDone=true;if(mgStop)mgStop();mgStop=null;sk.hidden=true;const g=pts*(S.master?2:1);
  $("mgb").innerHTML=`<p class="mgres">${skip?(pts?"May mắn":"Không vào"):["","Tạm được","Khá","Xuất sắc"][pts]}</p><p style="text-align:center">Tiến bộ +${g}${S.master&&pts?" (danh sư dạy, gấp đôi)":""}</p><div style="display:flex;justify-content:center"><button class="main" id="mgok">Xong</button></div>`;
  $("mgok").onclick=()=>{$("ov").hidden=true;cb(g)};$("mgok").focus()};
 sk.onclick=()=>fin(roll(od(35))?1:0,true);
 mgStop=fn($("mgb"),lv,p=>fin(p,false))}
function quiz(b,Qs,lv,end){let r=0,sc=0,stop=false;const nO=lv>=3?4:3;
 function show(){if(stop)return;if(r>=Qs.length)return end(sc>=5?3:sc>=3?2:1);const q=Qs[r];const opts=shuf(q.w.slice(0,nO-1).concat([q.a]));
  b.innerHTML=`<p class="mgsc">Câu ${r+1}/${Qs.length} · đúng ${sc}</p><p class="mgq">${q.q}</p><div class="mgopts">${opts.map((o,i)=>`<button data-i="${i}">${o}</button>`).join("")}</div>`;
  const bs=[...b.querySelectorAll(".mgopts button")];
  bs.forEach(btn=>btn.onclick=()=>{const ok=opts[+btn.dataset.i]===q.a;if(ok)sc++;btn.classList.add(ok?"ok":"miss");bs.find(e=>opts[+e.dataset.i]===q.a).classList.add("ok");bs.forEach(e=>e.disabled=true);r++;setTimeout(show,900)});
  bs[0].focus()}
 show();return()=>{stop=true}}
function gCam(b,lv,end){const L=["Cung","Thương","Giốc","Chủy"],N=16,fall=Math.max(1100,2200-lv*220),gap=Math.max(450,800-lv*60);
 b.innerHTML=`<div class="lanes" id="lanes">${L.map((n,i)=>`<div class="lane" data-l="${i}"></div>`).join("")}<div class="hitline" id="hitl"></div></div><div class="lbtns">${L.map((n,i)=>`<button data-l="${i}">${n}</button>`).join("")}</div><p class="mgsc" id="mgsc">Trúng 0/${N}</p>`;
 const H=$("lanes").clientHeight,HIT=Math.round(H*.83);$("hitl").style.top=HIT+"px";
 const notes=[];for(let i=0;i<N;i++)notes.push({l:R(4),t:1200+i*gap,el:null,gone:false});
 const lanes=b.querySelectorAll(".lane");const t0=performance.now();let hits=0,raf=0,done=false;
 function frame(now){if(done)return;const t=now-t0;
  for(const n of notes){if(n.gone)continue;const y=(t-(n.t-fall))/fall*HIT;
   if(!n.el&&y>-20){n.el=document.createElement("i");lanes[n.l].appendChild(n.el)}
   if(n.el){n.el.style.transform=`translateY(${y}px)`;if(y>H+10){n.el.remove();n.el=null;n.gone=true}}}
  if(t>notes[N-1].t+fall*0.3+500){done=true;return end(hits>=13?3:hits>=8?2:1)}
  raf=requestAnimationFrame(frame)}
 raf=requestAnimationFrame(frame);
 function tap(l){if(done)return;const t=performance.now()-t0;const n=notes.find(x=>!x.gone&&x.l===l&&Math.abs(x.t-t)<180);
  const btn=b.querySelector(`.lbtns button[data-l="${l}"]`);
  if(n){n.gone=true;hits++;if(n.el){n.el.remove();n.el=null}btn.classList.add("ok")}else btn.classList.add("miss");
  setTimeout(()=>btn.classList.remove("ok","miss"),150);$("mgsc").textContent=`Trúng ${hits}/${N}`}
 b.querySelectorAll("[data-l]").forEach(e=>{e.onpointerdown=ev=>{ev.preventDefault();tap(+e.dataset.l)};e.onclick=ev=>{if(ev.detail===0)tap(+e.dataset.l)}});
 const keys={d:0,f:1,j:2,k:3,"1":0,"2":1,"3":2,"4":3};const kd=e=>{if(e.key in keys){e.preventDefault();tap(keys[e.key])}};document.addEventListener("keydown",kd);
 return()=>{done=true;cancelAnimationFrame(raf);document.removeEventListener("keydown",kd)}}
function gKy(b,lv,end){const n=7,B=Array(n*n).fill(0);let over=false,maxRun=0;
 b.innerHTML=`<div class="goban">${B.map((_,i)=>`<button data-i="${i}" aria-label="Hàng ${Math.floor(i/n)+1}, cột ${i%n+1}"></button>`).join("")}</div><p class="mgsc" id="mgsc">Đến lượt ngươi.</p>`;
 const cells=b.querySelectorAll(".goban button"),D=[[0,1],[1,0],[1,1],[1,-1]],W=[0,1,8,60,600,9000];
 const run=(i,p)=>{const r=Math.floor(i/n),c=i%n;let best=0;for(const[dr,dc]of D){let k=1;for(const s of[1,-1]){let rr=r+dr*s,cc=c+dc*s;while(rr>=0&&rr<n&&cc>=0&&cc<n&&B[rr*n+cc]===p){k++;rr+=dr*s;cc+=dc*s}}best=Math.max(best,k)}return best};
 const val=i=>{B[i]=2;const a=run(i,2);B[i]=1;const d=run(i,1);B[i]=0;const r=Math.floor(i/n),c=i%n;return W[Math.min(a,5)]*1.1+W[Math.min(d,5)]+(6-Math.abs(r-3)-Math.abs(c-3))};
 const ai=()=>{let best=-1,bi=-1;const noise=(5-lv)*35+10;for(let i=0;i<B.length;i++)if(!B[i]){const s=val(i)+Math.random()*noise;if(s>best){best=s;bi=i}}return bi};
 const put=(i,p)=>{B[i]=p;cells[i].textContent=p===1?"●":"○";cells[i].classList.add(p===1?"bk":"wh");cells[i].disabled=true;return run(i,p)};
 cells.forEach(c=>c.onclick=()=>{if(over)return;const i=+c.dataset.i;if(B[i])return;const r=put(i,1);maxRun=Math.max(maxRun,r);
  if(r>=5){over=true;$("mgsc").textContent="Ngươi thắng!";return setTimeout(()=>end(3),600)}
  if(B.every(x=>x)){over=true;$("mgsc").textContent="Hòa cờ.";return setTimeout(()=>end(2),600)}
  if(put(ai(),2)>=5){over=true;$("mgsc").textContent="Quân trắng thắng.";return setTimeout(()=>end(maxRun>=4?2:1),800)}
  if(B.every(x=>x)){over=true;$("mgsc").textContent="Hòa cờ.";setTimeout(()=>end(2),600)}});
 cells[24].focus();return()=>{over=true}}
function gHoa(b,lv,end){const P=lv>=3?8:6,limit=P+5+(lv>=3?2:0);const tiles=shuf(HOA.slice(0,P).flatMap(x=>[x,x]));let open=[],found=0,moves=0,lock=false,stop=false;
 b.innerHTML=`<p class="mgsc" id="mgsc"></p><div class="memo">${tiles.map((t,i)=>`<button data-i="${i}" aria-label="Ô ${i+1}">❖</button>`).join("")}</div>`;
 const bs=[...b.querySelectorAll(".memo button")];const upd=()=>$("mgsc").textContent=`Cặp ${found}/${P} · lượt ${moves}/${limit}`;upd();
 bs.forEach(btn=>btn.onclick=()=>{if(lock||stop)return;const i=+btn.dataset.i;if(open.includes(i)||btn.classList.contains("ok"))return;
  btn.innerHTML=`${tiles[i][0]}<small>${tiles[i][1]}</small>`;open.push(i);
  if(open.length===2){moves++;const [a,c]=open;open=[];
   if(tiles[a][1]===tiles[c][1]){bs[a].classList.add("ok");bs[c].classList.add("ok");bs[a].disabled=bs[c].disabled=true;found++;upd();if(found===P){stop=true;return setTimeout(()=>end(moves<=P+3?3:2),600)}}
   else{lock=true;setTimeout(()=>{bs[a].textContent="❖";bs[c].textContent="❖";lock=false},700)}
   upd();if(moves>=limit&&found<P){stop=true;setTimeout(()=>end(1),800)}}});
 bs[0].focus();return()=>{stop=true}}
function gVu(b,lv,end){let len=3,round=0,seq=[],inp=0,showing=true,stop=false;const sp=Math.max(320,650-lv*60);
 b.innerHTML=`<p class="mgsc" id="mgsc"></p><div class="simon">${VU.map((v,i)=>`<button data-i="${i}">${v[0]}<small>${v[1]}</small></button>`).join("")}</div>`;
 const bs=b.querySelectorAll(".simon button");
 function next(){if(stop)return;if(round>=5){stop=true;return end(3)}seq=Array.from({length:len},()=>R(4));inp=0;showing=true;$("mgsc").textContent=`Lượt ${round+1}/5: xem kỹ ${len} bước`;
  seq.forEach((s,k)=>setTimeout(()=>{if(stop)return;bs[s].classList.add("lit");setTimeout(()=>bs[s].classList.remove("lit"),sp*.6)},500+k*sp));
  setTimeout(()=>{if(stop)return;showing=false;$("mgsc").textContent=`Lượt ${round+1}/5: múa lại ${len} bước`},500+len*sp)}
 bs.forEach(bt=>bt.onclick=()=>{if(showing||stop)return;const i=+bt.dataset.i;bt.classList.add("lit");setTimeout(()=>bt.classList.remove("lit"),150);
  if(i!==seq[inp]){stop=true;$("mgsc").textContent="Sai bước.";return setTimeout(()=>end(round>=3?2:1),700)}
  inp++;if(inp===seq.length){round++;len++;setTimeout(next,600)}});
 next();return()=>{stop=true}}
/* palace-intrigue events: each is {id, ok (gate), pp (params, saved), b (builder from params)}; registered in PEND so a pending one survives reload */
const EV=[];const EVI={};
function ev(id,ok,pp,b){const e={id,ok,pp,b};EV.push(e);EVI[id]=e;PEND[id]=b}
function mkEv(id){const e=EVI[id];if(!e)return null;const pp=e.pp?e.pp():{};if(pp===null)return null;S.seen=S.seen||{};S.seen[id]=S.turn;return mkP(id,pp)}
function evFresh(e){const s=S.seen&&S.seen[e.id];return s==null||S.turn-s>=12}
function freshEvents(){return EV.filter(e=>{try{return evFresh(e)&&e.ok()}catch(x){return false}})}
const KID=n=>S.kids.find(k=>k.name===n&&k.alive)||null;
const rvTop=(f)=>{const L=liveRivals(false).slice().sort(f);return L[0]||null};
const rvAny=()=>{const L=liveRivals(false);return L.length?pick(L):null};
const two=()=>{const L=liveRivals(false);if(L.length<2)return null;const a=pick(L);const b=pick(L.filter(x=>x!==a));return{a:a.id,b:b.id}};
const mon=m=>S.month===m;
const kidHurt=(k,n)=>{k.hp=Math.max(0,k.hp-n);if(k.hp<=0)log(kidDie(k,"không qua khỏi cơn bệnh",true))};
const newGirl=rel=>{const n=newRival(1+R(2));Object.assign(n,drawFace());n.rel=rel;rivals.push(n);return n};

/* framing */
ev("doll",()=>S.rank>=1&&liveRivals(false).length,()=>({v:rvTop((a,b)=>b.ghen-a.ghen).id,o:od(35+S.mat*6+S.tamco/4)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pMaid(),
 t:`Canh ba, ${S.maid.name} hớt hải quỳ xuống: dưới gốc quế sân ngươi có hình nhân vải ghi ngày sinh của Hoàng thượng.<br>Người của Cung Chính ti đang trên đường tới.`,o:[
 {n:"Đốt ngay, lần dấu kẻ chôn",fx:{},x:`${word(p.o)} · thành: chứng cứ ${v.name} +2 · hỏng: bị phạt`,go:()=>{if(roll(p.o)){v.ev+=2;log(`Dấu giày dưới gốc quế dẫn về cung ${v.name}.`)}else punish("chôn hình nhân trù ẻo",2)}},
 {n:"Tự trình lên Hoàng thượng",fx:{danh:-3},x:`${word(od(50+S.duc/3))} · thành: Sủng +4 · hỏng: Sủng -8`,go:()=>{if(roll(od(50+S.duc/3)))apply({sung:4,duc:2});else apply({sung:-8})}},
 {n:"Mua chuộc Cung Chính ti",fx:{bac:-60},x:"chuyện chìm xuống"}]}});
ev("poisongift",()=>liveRivals(false).length&&S.rank>=1,()=>({v:rvAny().id,o:od(40+S.mat*5+S.tamco/4)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Hộp điểm tâm đề tên ngươi gửi sang cung ${v.name}; cung nữ nếm thử liền thổ huyết.<br>Cả hậu cung xôn xao: ngươi hạ độc.`,o:[
 {n:"Kêu oan, xin tra người đưa quà",fx:{},x:`${word(p.o)} · hỏng: bị phạt nặng`,go:()=>{if(roll(p.o)){apply({danh:3});log("Tra ra tiểu thái giám đưa quà đã bị mua chuộc; ngươi được minh oan.")}else{apply({danh:-6});v.rel-=20;punish("gửi quà có độc",2)}}},
 {n:"Nhờ Thái hậu đứng ra",fx:{th:-12},x:"Thái hậu ém chuyện; nàng vẫn nghi ngươi",go:()=>{v.rel-=15}},
 {n:"Đẩy tội cho cung nữ",fx:{maid:-40,duc:-6},x:"nàng bị đánh 30 trượng"}]}});
/* rumours */
ev("guardrumour",()=>S.nights>=1,()=>({v:(rvAny()||{}).id,o:od(40+S.duc/2)}),p=>{const v=p.v!=null?RV(p.v):null;return{
 t:"Lời đồn lan khắp các cung: đêm đêm có thị vệ lẻn vào tẩm cung của ngươi.<br>Hoàng thượng chưa nói gì, nhưng đã hai tuần không lật thẻ ngươi.",o:[
 {n:"Xin Hoàng thượng tra xét",fx:{},x:`${word(p.o)} · thành: Danh +4 · hỏng: Sủng -10`,go:()=>{if(roll(p.o))apply({danh:4,sung:2});else apply({sung:-10,danh:-6})}},
 {n:"Đút bạc dập lời đồn",fx:{bac:-40,danh:-2}},
 {n:"Tìm kẻ tung tin",fx:{suc:-10},x:v?`${word(oSpy())} · thành: chứng cứ ${v.name} +1`:"không ra manh mối",go:()=>{if(v&&roll(oSpy())){v.ev++;v.rel-=10;log(`Kẻ tung tin là người của ${v.name}.`)}}}]}});
ev("ghost",()=>SEASON[S.month-1]==="Thu"||SEASON[S.month-1]==="Đông",()=>({v:(rvAny()||{}).id}),p=>{const v=p.v!=null?RV(p.v):null;return{
 t:"Cung nhân thì thầm: đêm qua có bóng áo trắng khóc bên giếng sau cung ngươi.<br>Ba cung nữ xin đổi đi nơi khác.",o:[
 {n:"Mời sư làm lễ trừ tà",fx:{bac:-30,duc:2,suc:5}},
 {n:"Rình bắt kẻ giả ma",fx:{suc:-10},x:v?`${word(od(45+S.mat*5))} · thành: chứng cứ ${v.name} +2`:"chỉ là mèo hoang",go:()=>{if(v&&roll(od(45+S.mat*5))){v.ev+=2;log(`Kẻ giả ma là cung nữ của ${v.name}.`)}}},
 {n:"Mặc kệ",fx:{danh:-3,maid:-5}}]}});
/* alliances */
ev("pact",()=>qOn()&&liveRivals(false).length,()=>({v:rvTop((a,b)=>b.rel-a.rel).id}),p=>{const v=RV(p.v),q=rivals[0];if(!v)return null;return{who:pv(v),
 t:`${v.name} hẹn ngươi ở đình Thiên Thu: “Hoàng hậu ${q.name} đè đầu cả hậu cung đã lâu.<br>Hai ta chung một thuyền, được chăng?”`,o:[
 {n:"Kết minh",fx:{hh:-5},x:`${v.name} thân +25 · chứng cứ Hoàng hậu +1`,go:()=>{v.rel+=25;q.ev++}},
 {n:"Mật báo Hoàng hậu",fx:{hh:12},x:`${v.name} thù -30`,go:()=>{v.rel-=30;v.ghen=cl(v.ghen+10,0,100)}},
 {n:"Từ chối khéo",fx:{duc:1}}]}});
ev("eunuch",()=>S.mat<10,()=>({o:od(50+S.tamco/3)}),p=>({
 t:"Tiểu thái giám Tiểu Đức Tử quỳ ngoài thềm: “Nô tài nguyện làm chó săn cho nương nương.”<br>Hắn từng hầu ở Kính sự phòng.",o:[
 {n:"Nhận làm tai mắt",fx:{bac:-30,mat:1}},
 {n:"Thử lòng hắn trước",fx:{},x:`${word(p.o)} · thành: Tai mắt +1 · hỏng: hắn là gián điệp`,go:()=>{if(roll(p.o))apply({mat:1});else{apply({danh:-3});log('<span class="r">Tiểu Đức Tử mang chuyện cung ngươi đi bán.</span>')}}},
 {n:"Đuổi đi",fx:{duc:1}}]}));
/* the Emperor */
ev("empnight",()=>!S.preg&&S.sung>=20,()=>({o:od(40+bestArt().w*8+mm())}),p=>({who:pEmp(),
 t:"Đêm khuya, không đèn lồng, không thái giám báo trước. Hoàng thượng đứng ngoài rèm cửa cung ngươi.<br>“Trẫm không ngủ được.”",o:[
 {n:"Thắp đèn hầu rượu",fx:{},x:"được thị tẩm",go:()=>{S.tonight="me";nightScene()}},
 {n:`Phô tài: ${bestArt().n}`,fx:{suc:-5},x:`${word(p.o)} · thành: Sủng +6, Danh +2`,go:()=>{if(roll(p.o))apply({sung:6,danh:2})}},
 {n:"Khuyên ngài giữ long thể",fx:{duc:3,sung:-1}}]}));
ev("minister",()=>S.rank>=2,()=>({o:od(40+S.tai/3+(has("chamchinh")?15:0))}),p=>({who:pEmp(),
 t:"Hoàng thượng đặt bản tấu xuống: “Thượng thư Hộ bộ xin tăng thuế muối. Ái phi nghĩ sao?”",o:[
 {n:"Can gián thẳng thắn",fx:{},x:`${word(p.o)} · thành: Danh +5, Sủng +3 · hỏng: Sủng -5`,go:()=>{if(roll(p.o))apply({danh:5,sung:3});else apply({sung:-5})}},
 {n:"“Hậu cung không bàn chính sự”",fx:{duc:3,sung:-1}},
 {n:"Nói đỡ cho viên quan",fx:{bac:60,duc:-4},x:"đã nhận bạc của Thượng thư"}]}));
ev("jealousprince",()=>mySons().some(k=>k.age>=8),()=>({k:mySons().filter(k=>k.age>=8)[0].name}),p=>{const k=KID(p.k);if(!k)return null;return{who:pEmp(),
 t:`Triều thần vây quanh ${k.name} sau buổi giảng kinh. Hoàng thượng nhìn từ xa, sắc mặt sa sầm.`,o:[
 {n:"Bắt con đóng cửa đọc sách",fx:{danh:-2},x:`Hoàng thượng thương ${k.name} +6`,go:()=>{k.fond=cl(k.fond+6,0,100)}},
 {n:"Để con tiếp tục kết giao",fx:{danh:4,sung:-6},x:`Tài ${k.name} +5`,go:()=>{k.tal=cl(k.tal+5,0,100)}},
 {n:"Xin cho con đi tuần biên",fx:{sung:4},x:`Hoàng thượng thương ${k.name} -8`,go:()=>{k.fond=cl(k.fond-8,0,100)}}]}});
/* court ties */
ev("flood",()=>SEASON[S.month-1]==="Hạ",null,()=>({
 t:"Hoàng Hà vỡ đê, ba châu chìm trong nước. Hoàng hậu truyền các cung quyên góp cứu tế.",o:[
 {n:"Dâng 100 lượng",fx:{bac:-100,danh:6,duc:3}},
 {n:"Dâng 30 lượng",fx:{bac:-30,danh:2}},
 {n:"Cắt bổng lộc cung nhân để dâng",fx:{danh:3,maid:-15}}]}));
ev("newgirl",()=>liveRivals(true).length<9&&roomFor("consort"),null,()=>({
 t:"Con gái Thượng thư Lễ bộ được tuyển vào cung, nghe nói dung mạo khuynh thành.<br>Hôm nay nàng đến các cung bái kiến.",o:[
 {n:"Tặng trâm, kết thân",fx:{bac:-20},x:"tân nhân thân +20",go:()=>{const n=newGirl(20);log(`${n.name} vào cung, phong ${RANKS[n.rank].n}; nàng mến ngươi.`)}},
 {n:"Tiếp đãi lạnh nhạt",fx:{},x:"tân nhân thân -10",go:()=>{const n=newGirl(-10);log(`${n.name} vào cung, phong ${RANKS[n.rank].n}.`)}},
 {n:"Dằn mặt ngay buổi đầu",fx:{duc:-4,tamco:1},x:"tân nhân sợ, thù -25",go:()=>{const n=newGirl(-25);n.ghen=cl(n.ghen+15,0,100);log(`${n.name} vào cung, khóc suốt đêm sau buổi bái kiến.`)}}]}));
/* children */
ev("princefever",()=>S.kids.some(k=>k.alive&&k.age<10)&&(mon(1)||mon(8)),()=>({k:pick(S.kids.filter(k=>k.alive&&k.age<10)).name,o:od(40+S.arts.y*12)}),p=>{const k=KID(p.k);if(!k)return null;return{
 t:`Đêm yến tiệc, ${k.name} sốt cao co giật. Tiếng nhạc bên Thái Hòa điện vẫn vọng sang.`,o:[
 {n:"Bỏ yến, thức trắng bên con",fx:{suc:-20,sung:-3},x:`Sức khỏe ${k.name} +20`,go:()=>{k.hp=Math.min(100,k.hp+20)}},
 {n:"Mời thái y, vẫn dự yến",fx:{bac:-30,sung:3},x:`Sức khỏe ${k.name} +8`,go:()=>{k.hp=Math.min(100,k.hp+8)}},
 {n:"Tự bốc thuốc",fx:{},x:`${word(p.o)} · thành: Sức khỏe +30 · hỏng: Sức khỏe -25`,go:()=>{if(roll(p.o))k.hp=Math.min(100,k.hp+30);else kidHurt(k,25)}}]}});
ev("foreignwed",()=>myDaus().some(k=>k.age>=18),()=>{const d=myDaus().filter(k=>k.age>=18)[0];return d?{k:d.name,o:od(30+S.sung/3+mm())}:null},p=>{const k=KID(p.k);if(!k)return null;return{who:pEmp(),
 t:`Sứ thần Bắc Địch dâng ngựa quý, cầu hôn ${k.name}. Triều thần đều nói: một nàng công chúa đổi mười năm yên biên ải.`,o:[
 {n:"Thuận theo đại cục",fx:{danh:10,th:5,suc:-15},x:`${k.name} xuất giá phương bắc`,go:()=>{k.alive=false;k.wed=1;log(`${k.name} khóc từ biệt mẫu thân, theo đoàn sứ lên phương bắc.`)}},
 {n:"Quỳ xin giữ con lại",fx:{},x:`${word(p.o)} · hỏng: Sủng -10`,go:()=>{if(roll(p.o))log("Hoàng thượng động lòng, gả một tông nữ thay.");else apply({sung:-10,danh:-3})}},
 {n:"Tiến cử một tông nữ",fx:{bac:-50,danh:-2}}]}});
/* servants */
ev("maidhostage",()=>liveRivals(false).length,()=>({v:rvAny().id,o:od(40+S.tamco/3+S.maid.loyal/5)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pMaid(),
 t:`${S.maid.name} quỳ khóc: người của ${v.name} giữ cha mẹ nàng, bắt nàng lấy trộm thư từ của ngươi.`,o:[
 {n:"Bỏ bạc chuộc người",fx:{bac:-60,maid:25}},
 {n:"Bày kế phản gián",fx:{},x:`${word(p.o)} · thành: chứng cứ ${v.name} +2 · hỏng: Lòng cung nữ -20`,go:()=>{if(roll(p.o)){v.ev+=2;apply({maid:10})}else apply({maid:-20})}},
 {n:"Bỏ mặc",fx:{maid:-35}}]}});
ev("doctorblack",()=>S.doctor,()=>({o:od(35+S.tamco/3+S.mat*4)}),p=>({who:pDoc(),
 t:"Thái y tâm phúc của ngươi lén báo: có kẻ biết ông từng kê nhầm thuốc cho tiên phi, đòi 50 lượng mỗi tháng.",o:[
 {n:"Trả bạc thay ông",fx:{bac:-50}},
 {n:"Diệt kẻ tống tiền",fx:{duc:-6},x:`${word(p.o)} · hỏng: bị phạt`,go:()=>{S.schemes++;if(!roll(p.o)){apply({danh:-5});punish("giết người diệt khẩu",2)}}},
 {n:"Để ông tự lo",fx:{},x:"mất thái y tâm phúc",go:()=>{S.doctor=0}}]}));
/* omens */
ev("comet",()=>S.year>=2,()=>{const me=roll(40)||!liveRivals(false).length;return{me,v:me?null:rvAny().id}},p=>{const v=p.me?null:RV(p.v);if(!p.me&&!v)return null;
 if(p.me)return{t:"Sao chổi quét ngang trời tây. Khâm Thiên giám tâu: âm khí xung từ cung của ngươi.",o:[
  {n:"Trai giới cầu đảo",fx:{suc:-15,duc:4,danh:2}},{n:"Mua chuộc Khâm Thiên giám",fx:{bac:-80},x:"lời tâu đổi hướng"},{n:"Cắn răng chịu tiếng",fx:{danh:-8,sung:-5}}]};
 return{who:pv(v),t:`Sao chổi hiện. Khâm Thiên giám tâu: ${v.name} mệnh khắc với long thể.<br>Nàng quỳ ngoài Dưỡng Hòa điện cả đêm.`,o:[
  {n:"Đứng ra nói đỡ",fx:{duc:3,danh:-2},x:`${v.name} thân +25`,go:()=>{v.rel+=25}},
  {n:"Đổ thêm dầu vào lửa",fx:{duc:-5},x:`${v.name} Sủng -15, thù -20`,go:()=>{v.sung=cl(v.sung-15,0,100);v.rel-=20}},
  {n:"Im lặng",fx:{}}]}});
ev("phoenix",()=>S.rank>=3&&S.rank<7,null,()=>({
 t:"Thầy tướng ở chùa Bảo Hoa phán: trong hậu cung có một người mệnh phượng hoàng, và chỉ vào cung ngươi.",o:[
 {n:"Khiêm nhường chối từ",fx:{duc:3,hh:5}},
 {n:"Để lời đồn lan xa",fx:{danh:8,hh:-15},x:"cả hậu cung ghen +12",go:()=>ghenAll(12)},
 {n:"Bịt miệng thầy tướng",fx:{bac:-30,tamco:1}}]}));
/* festivals */
ev("doanngo",()=>mon(5),null,()=>({
 t:"Tết Đoan ngọ, thuyền rồng đua trên Thái Dịch trì. Các cung treo ngải cứu, gói bánh ú.",o:[
 {n:"Gói bánh ú dâng Thái hậu",fx:{suc:-5,th:6}},
 {n:"Đeo túi ngải cho các con",fx:{},x:"các con khỏe thêm 10",go:()=>S.kids.forEach(k=>{if(k.alive)k.hp=Math.min(100,k.hp+10)})},
 {n:"Đặt cược thuyền rồng",fx:{bac:-20},x:`${word(50)} · thắng: Bạc +60`,go:()=>{if(roll(50)){apply({bac:60});log("Thuyền ngươi cược về nhất.")}}}]}));
ev("trungcuu",()=>mon(9),()=>({o:od(35+S.tai/2+artW("thi",S.arts.thi)*6)}),p=>({who:pEmp(),
 t:"Tiết Trùng cửu, Hoàng thượng lên Cảnh Sơn ngắm cúc, uống rượu thù du.",o:[
 {n:"Theo ngài lên núi",fx:{suc:-15,sung:5}},
 {n:"Dâng rượu cúc chúc thọ Thái hậu",fx:{bac:-15,th:6}},
 {n:"Làm thơ Trùng cửu",fx:{},x:`${word(p.o)} · thành: Danh +5, Sủng +2`,go:()=>{if(roll(p.o))apply({danh:5,sung:2})}}]}));
ev("vulan",()=>mon(7),null,()=>({
 t:"Rằm tháng bảy, lễ Vu Lan. Đèn hoa đăng trôi trên kênh Kim Thủy, cung nhân khấn vái người đã khuất.",o:[
 {n:"Thả đèn cầu siêu",fx:{bac:-10,duc:3}},
 {n:"Cúng các phi tần chết oan",fx:{duc:5,danh:1},x:"cung nhân cảm phục, Lòng cung nữ +8",go:()=>apply({maid:8})},
 {n:"Mượn lễ dò hỏi cung nhân",fx:{tamco:1},x:"Tai mắt +1",go:()=>apply({mat:1})}]}));
ev("dongchi",()=>mon(11)||mon(12),null,()=>({
 t:"Đông chí, Hoàng thượng ra đàn Nam Giao tế trời. Tuyết phủ trắng mái ngói lưu ly.",o:[
 {n:"Xin theo hầu lễ tế",fx:{suc:-20,danh:S.rank>=3?6:2}},
 {n:"Nấu chè mừng cả cung",fx:{bac:-25,maid:10,duc:2}},
 {n:"Ở cung giữ ấm",fx:{suc:15}}]}));
ev("thbirthday",()=>!S.thDead&&mon(10),()=>({o:od(35+S.tai/3+artW("hoa",S.arts.hoa)*8)}),p=>({who:pTH(),
 t:"Thánh thọ Thái hậu. Các cung đua nhau dâng lễ; ai được Thái hậu khen sẽ nở mày nở mặt.",o:[
 {n:"Dâng ngọc Như Ý",fx:{bac:-80,th:12}},
 {n:"Tự thêu trăm chữ Thọ",fx:{suc:-20},x:`${word(p.o)} · thành: Thái hậu +15, Danh +4 · hỏng: Thái hậu +3`,go:()=>apply(roll(p.o)?{th:15,danh:4}:{th:3})},
 {n:"Lễ mọn cho phải phép",fx:{bac:-10,th:1,danh:-2}}]}));
/* punishments */
ev("caning",()=>qOn()&&liveRivals(false).length,()=>({v:rvAny().id}),p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Trước Càn Ninh cung, ${v.name} bị lột trâm, đánh hai mươi trượng vì tội bất kính. Hoàng hậu bắt các phi tần đứng xem.`,o:[
 {n:"Quỳ xin tha cho nàng",fx:{hh:-6,duc:3},x:`${v.name} thân +30`,go:()=>{v.rel+=30}},
 {n:"Đứng xem, mặt không đổi sắc",fx:{tamco:2,duc:-2}},
 {n:"Thêm một lời buộc tội",fx:{hh:5,duc:-4},x:`${v.name} Sủng -10, thù -30`,go:()=>{v.sung=cl(v.sung-10,0,100);v.rel-=30}}]}});
ev("condemnedmaid",()=>true,()=>({o:od(35+S.duc/2+(has("nhantu")?20:0))}),p=>({
 t:"Một cung nữ cung khác bị khép tội trộm, sắp bị đánh chết. Nàng gào tên ngươi khi bị lôi qua cửa.",o:[
 {n:"Quỳ xin tha",fx:{},x:`${word(p.o)} · thành: Đức +5, Tai mắt +1 · hỏng: Sủng -5`,go:()=>apply(roll(p.o)?{duc:5,danh:2,mat:1}:{sung:-5})},
 {n:"Lén gửi bạc cho nhà nàng",fx:{bac:-20,duc:2}},
 {n:"Không can dự",fx:{duc:-1}}]}));
ev("coldvisit",()=>rivals.some(v=>v.alive&&v.out),()=>({f:pick(rivals.filter(v=>v.alive&&v.out)).id,o:od(30+S.sung/3+(has("nhantu")?15:0))}),p=>{const f=RV(p.f);if(!f)return null;return{who:pv(f),
 t:`Gió lùa qua song cửa lãnh cung. ${f.name} gầy rộc, níu tay áo ngươi: “Ta biết những chuyện họ muốn chôn.”`,o:[
 {n:"Mang chăn ấm, thuốc men",fx:{bac:-20,duc:4},x:"chứng cứ một phi tần +1",go:()=>{const t=liveRivals(true);if(t.length){const x=pick(t);x.ev++;log(`${f.name} kể chuyện xấu của ${x.name}.`)}}},
 {n:"Xin Hoàng thượng ân xá",fx:{},x:`${word(p.o)} · thành: nàng về cung, thân +40 · hỏng: Sủng -6`,go:()=>{if(roll(p.o)){f.out=false;f.rank=0;f.rel+=40;log(`${f.name} được ân xá, về cung làm ${RANKS[0].n}.`)}else apply({sung:-6})}},
 {n:"Quay lưng bỏ đi",fx:{duc:-2}}]}});
/* dangers */
ev("taster",()=>S.rank>=2&&liveRivals(false).length,()=>({v:rvTop((a,b)=>b.malice-a.malice).id,o:oSpy()}),p=>{const v=RV(p.v);if(!v)return null;return{
 t:"Tiểu thái giám nếm canh ngự ban cho ngươi bỗng ôm bụng ngã gục, môi tím tái.",o:[
 {n:"Truy đến cùng Ngự thiện phòng",fx:{suc:-10},x:`${word(p.o)} · thành: chứng cứ ${v.name} +2`,go:()=>{if(roll(p.o)){v.ev+=2;log(`Đầu bếp khai ra người của ${v.name}.`)}else v.rel-=10}},
 {n:"Đổi người nấu, giấu chuyện",fx:{bac:-30},x:"2 tháng phi tần khó hại ngươi",go:()=>{S.shield=Math.max(S.shield,2)}},
 {n:"Khóc kể với Hoàng thượng",fx:{sung:3},x:"cả hậu cung bị tra, ai cũng ghen +5",go:()=>ghenAll(5)}]}});
ev("letterhome",()=>S.turn>=3,()=>({o:od(30+S.sung/3)}),p=>({
 t:`Thư nhà giấu trong giỏ trái cây: ${S.origin.k==="td"?"vú nuôi năm xưa":"mẹ già"} lâm bệnh nặng, chỉ mong gặp mặt ngươi lần cuối.`,o:[
 {n:"Gửi 50 lượng chữa bệnh",fx:{bac:-50,duc:3}},
 {n:"Xin ân chuẩn về thăm",fx:{},x:`${word(p.o)} · thành: Đức +4, Sức +10 · hỏng: Sủng -4`,go:()=>apply(roll(p.o)?{duc:4,suc:10}:{sung:-4})},
 {n:"Viết thư hỏi han",fx:{suc:-5,duc:1}}]}));
ev("fire",()=>liveRivals(false).length,()=>({v:rvAny().id,o:od(45+S.suc/4)}),p=>{const v=RV(p.v);if(!v)return null;return{who:pv(v),
 t:`Nửa đêm, Đông lục cung bốc cháy. Lửa liếm mái cung ${v.name}; tiếng trẻ khóc lẫn tiếng chiêng.`,o:[
 {n:"Lao vào cứu người",fx:{suc:-25},x:`${word(p.o)} · thành: ${v.name} thân +40, Danh +6 · hỏng: Sức -15`,go:()=>{if(roll(p.o)){v.rel+=40;apply({danh:6,sung:3})}else apply({suc:-15})}},
 {n:"Chỉ huy cung nhân dập lửa",fx:{danh:3,maid:5}},
 {n:"Ngầm tra kẻ phóng hỏa",fx:{},x:`${word(oSpy())} · thành: chứng cứ một phi tần +2`,go:()=>{if(roll(oSpy())){const t=liveRivals(false).filter(x=>x!==v);const x=t.length?pick(t):v;x.ev+=2;log(`Dấu dầu hỏa dẫn về người của ${x.name}.`)}}}]}});
/* rivals against each other: the player witnesses */
ev("rvframe",()=>liveRivals(false).length>=2,two,p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(a),
 t:`Ngươi nghe lén sau hòn non bộ: ${a.name} bàn với thái giám giấu đồ ngự dụng vào cung ${b.name} để vu tội trộm.`,o:[
 {n:`Báo cho ${b.name}`,fx:{duc:2},x:`${b.name} thân +25 · ${a.name} thù -15`,go:()=>{b.rel+=25;a.rel-=15}},
 {n:`Giúp ${a.name} một tay`,fx:{duc:-5},x:`${a.name} thân +20 · ${word(50)}: ${b.name} thất thế`,go:()=>{a.rel+=20;S.schemes++;if(roll(50))fall(b,"bị vu trộm đồ ngự dụng")}},
 {n:"Ghi nhớ làm chứng cứ",fx:{tamco:1},x:`chứng cứ ${a.name} +2`,go:()=>{a.ev+=2}}]}});
ev("rvquarrel",()=>liveRivals(false).length>=2,two,p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(a),
 t:`Trong Ngự hoa viên, ${a.name} và ${b.name} tranh nhau một chậu mẫu đơn Hoàng thượng ban, lời qua tiếng lại.`,o:[
 {n:"Đứng ra can ngăn",fx:{duc:2,danh:1},x:"cả hai thân +5",go:()=>{a.rel+=5;b.rel+=5}},
 {n:`Đứng về phía ${a.name}`,fx:{},x:`${a.name} thân +15 · ${b.name} thù -15`,go:()=>{a.rel+=15;b.rel-=15}},
 {n:"Mách Hoàng hậu",fx:{hh:qOn()?5:0,duc:-1},x:"cả hai Sủng -5",go:()=>{a.sung=cl(a.sung-5,0,100);b.sung=cl(b.sung-5,0,100)}}]}});
ev("rvmusk",()=>liveRivals(false).length>=2,()=>{const t=two();if(!t)return null;t.o=od(40+RV(t.a).ev*10+S.danh/5);return t},p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pv(b),
 t:`${S.maid.name} thì thầm: ${a.name} trộn xạ hương vào túi thơm tặng ${b.name}, mong nàng không bao giờ có con.`,o:[
 {n:`Cảnh báo ${b.name}`,fx:{duc:3},x:`${b.name} thân +30 · ${a.name} thù -20`,go:()=>{b.rel+=30;a.rel-=20}},
 {n:"Tố lên Hoàng thượng",fx:{},x:`${word(p.o)} · thành: ${a.name} thất thế · hỏng: Danh -5`,go:()=>{if(roll(p.o))fall(a,"bị tố trộn xạ hương hại phi tần");else apply({danh:-5})}},
 {n:"Làm ngơ",fx:{tamco:1,duc:-3}}]}});
ev("rvbribe",()=>liveRivals(false).length>=2,two,p=>{const a=RV(p.a),b=RV(p.b);if(!a||!b)return null;return{who:pEunCourt("ksp"),
 t:`${a.name} đút lót Kính sự phòng giấu thẻ bài của ${b.name}. Tổng quản thái giám đánh tiếng: ngươi muốn chen một chân không?`,o:[
 {n:"Góp bạc, giấu cả thẻ nàng",fx:{bac:-30},x:"tuần này và tuần sau dễ được thị tẩm",go:()=>{S.tablet=2;b.sung=cl(b.sung-5,0,100)}},
 {n:`Mách ${b.name}`,fx:{},x:`${b.name} thân +20 · ${a.name} ghen +10`,go:()=>{b.rel+=20;a.ghen=cl(a.ghen+10,0,100)}},
 {n:"Không dính vào",fx:{}}]}});
/* ================= ONE GROUP, ONE RULEBOOK =================
   The player (S) and every rival are consorts under the same formulas. Every act is one function act(actor, target). */
function key(p){return p===S?"me":p.id}
function byKey(k){return k==="me"?S:k==="emp"||k==="th"||k==null?null:RV(k)}
function NM(p){return p===S?"ngươi":p.name}
function NMc(p){return p===S?"Ngươi":p.name}
function rkOf(p){return p===S?S.rank:(p.queen?7:p.rank)}
function rkName(p){const r=rkOf(p);return r>=7?"Hoàng hậu":RANKS[r].n}
function consorts(){const L=[S].concat(liveRivals(true));for(const p of L){if(!p.maid)p.maid=p===S?newMaid(pick(MAIDS),45):{name:pick(MAIDS),loyal:50};if(!p.staff)p.staff=[]}return L}
function others(p){return consorts().filter(x=>x!==p)}
function kidsOf(p){return (p.kids||[]).filter(k=>k.alive)}
function sonsOf(p){return kidsOf(p).filter(k=>k.sex==="m")}
function queenP(){return S.rank>=7?S:(qOn()?rivals[0]:null)}
function malOf(p){return p===S?Math.max(0,70-S.duc):p.malice}
function wk(){return S.turn*3+S.tuan}
function ap(p,o){if(p===S)return apply(o);for(const k in o){const v=o[k];if(!v)continue;if(k==="maid"){p.maid.loyal=cl(p.maid.loyal+v,0,100);continue}p[k]=(p[k]||0)+v}
 for(const k of ["sung","danh","suc","sac","tai","tamco","duc","ghen","an"])if(p[k]!=null)p[k]=cl(p[k],0,100);p.th=cl(p.th||0,-100,100);p.hh=cl(p.hh||0,-100,100);p.bac=Math.max(0,p.bac||0);p.mat=cl(p.mat||0,0,10)}
function dieIf(p,why){if(p!==S&&p.alive&&p.suc<=0){p.alive=false;if(p.queen)p.queen=false;return `<span class="r">${p.name} ${why}.</span> `}return""}
/* a rival's full stat block: the same fields the player's formulas read */
function rstats(v,rank){rank=rank==null?(v.queen?7:v.rank):rank;
 const d=(k,x)=>{if(v[k]==null)v[k]=x};
 d("age",18+R(8));d("sac",40+R(55));d("tai",30+R(50));d("tamco",Math.round((v.malice||40)/3)+R(20));d("duc",Math.max(5,65-Math.round((v.malice||40)/2))+R(15));
 d("mat",R(3));d("danh",8+rank*8);d("bac",40+rank*20);d("suc",80);d("arts",{cam:R(3),ky:R(2),thi:R(3),hoa:R(2),vu:R(3),y:R(2)});d("artp",{cam:0,ky:0,thi:0,hoa:0,vu:0,y:0});
 d("maid",{name:pick(MAIDS),loyal:50+R(31)});d("preg",0);d("hidden",false);d("fake",0);d("anthai",0);d("doctor",0);d("confined",0);d("shield",0);d("tablet",0);d("block",0);
 d("lastPromo",0);d("inv",[]);d("evm",{});d("rl",{});d("ro",{});d("oan",0);d("an",0);d("nightLog",[]);d("th",R(20)-5);d("hh",R(20)-5);d("schemes",0);d("hieu","");d("dress",null);d("asthma",R(7)===0);d("pray",0);d("fert",0);d("thu",0);
 return v}
function normAll(){const d=(k,x)=>{if(S[k]==null)S[k]=x};
 d("inv",[]);d("evm",{});d("rl",{});d("ro",{});d("chat",{});d("an",0);d("nightLog",[]);d("hieu","");d("block",0);d("dress",null);d("asthma",false);d("shop",[]);d("seen",{});d("ghen",0);
 rivals.forEach(v=>rstats(v));if(!S.shop.length)restock();if(typeof staffInit==="function")staffInit();if(typeof ageInit==="function")ageInit();if(!S.where)placeWhere()}
/* relations (symmetric), evidence (who holds proof against whom) */
function evG(h,t){if(!h||!t)return 0;return h===S?t.ev:(h.evm[key(t)]||0)}
function evA(h,t,n){if(!h||!t||h===t)return;if(h===S)t.ev=Math.max(0,t.ev+n);else{const k=key(t);h.evm[k]=Math.max(0,(h.evm[k]||0)+n)}}
/* the shared formulas */
function od(b){return odA(S,b)}
function effSac(p){return cl(p.sac+wearBonus(p).sac,0,130)}
function conceiveCh(p=S){return cl(Math.round(lotB(p,"Con cái")+10+p.sung/4+effSac(p)/8+(p.pray?15:0)+(p.fert?20:0)-(p.age>28?(p.age-28)*3:0)),2,85)}
function nightCh(p=S){if(p.preg||p.block||p.confined||p.out)return 0;const m=has("mesac")?2:1;
  let c=4+p.sung/4+effSac(p)/12*m+p.arts.vu*2*m+p.arts.y*1.5+(p.tablet?20:0)+mm()/2+(rkOf(p)>=7?5:0)+(typeof tqAf==="function"?tqAf(p)/10:0);
  c+=lotB(p,"Sủng")/2+((p.staff||[]).some(s=>s.role==="eunuch"&&srk(s)>=3)?4:0);c*=illNightF(p);if(has("chamchinh"))c*=.6;if(has("datinh"))c*=1.2;if(illOf(S.emp))c*=.6;return cl(Math.round(c/1.4),c>0?1:0,70)}
function oSee(t=S,p){return cl(Math.round(15+t.mat*9+t.tamco/4+(t.maid&&t.maid.loyal>=70?10:0)+(p?(t.doctor?25:0)+(t.arts.y>=2?20:0):0)),5,95)}
function oSpy(a=S){return odA(a,45+a.mat*6+a.tai/10+a.tamco/5-(DG()?6:0))}
function oAlly(a,t){return odA(a,60-malOf(t)/3+(rel(a,t)>0?15:0)+a.danh/10)}
function oFrame(a=S){return odA(a,30+a.mat*5+(a.thu||0)*10+a.tamco/5+(DG()?4:0))}
function oPoison(a=S){return odA(a,25+a.mat*5+(a.thu||0)*10+a.tamco/5-(DG()?6:0))}
function oKSab(a=S){return odA(a,55+a.tamco/5+a.mat*3-(DG()?6:0))}
function oKPoison(a=S){return odA(a,20+a.mat*5+a.tamco/5-(DG()?6:0))}
function oKFrame(a=S){return odA(a,25+a.mat*5+a.tamco/5+(DG()?4:0))}
/* the sitting Empress is shielded: 3 proofs and a harder hearing, for every accuser alike */
function accNeed(t){return rkOf(t)>=7?4:2}
/* only a consort of Tần rank or above may bring a charge against the Empress */
function accOK(a,t){return evG(a,t)>=accNeed(t)&&(rkOf(t)<7||rkOf(a)>=3)}
function oAccuse(a,t){return odA(a,40-(rkOf(t)>=7?30:0)+evG(a,t)*15+a.danh/10+a.tai/10+(DG()?5:0)+5*(facN(a)-1))}
function oBribe(a,t){return odA(a,40+a.tamco/3-t.maid.loyal/3)}
function stealFit(a){const st=a===S?(S.staff||[]):(a.staff||[]);return (has("mesac")?effSac(a)/10:0)+(has("trongtai")?(a.tai||0)/10:0)+(has("datinh")?4:0)-(has("lanhlung")?4:0)+(st.some(s=>s.tr==="lanh")?6:0)+((a===S?S.maid:a.maid)&&(a===S?S.maid:a.maid).loyal>=70?3:0)}
function oSteal(a,m){return m==="road"?odA(a,30+effSac(a)/5+((a.arts&&a.arts.vu)||0)*5+stealFit(a)+mm()):odA(a,34+a.sung/3+effSac(a)/10+stealFit(a)+mm())}
function oRumor(a){return odA(a,50+a.tamco/4+a.mat*3)}
function oBlock(a){return odA(a,50+a.tamco/5+a.mat*3)}
function oPlant(a,t){return odA(a,40+a.tamco/3+a.mat*3-t.maid.loyal/4)}
function oVP(a){return odA(a,55+a.danh/5)}
/* punishment by standing: the same for every consort */
function punish(p,why,sev){if(typeof p==="string"){sev=why;why=p;p=S}
  if(sev>=2&&rkOf(p)>0&&roll(has("nongnay")?100:has("nhantu")?25:50)){if(p===S)S.rank--;else if(p.queen){p.queen=false;p.rank=6}else p.rank--;log(`<span class="r">${NMc(p)} bị giáng xuống ${rkName(p)} vì ${why}.</span>`);return}
  const m=has("nongnay")?3:has("nhantu")?1:2;p.confined=Math.max(p.confined||0,m);log(`<span class="r">${NMc(p)} bị cấm túc ${m} tháng vì ${why}.</span>`)}
function deathSentence(p,why){if(typeof p==="string"){why=p;p=S}
  if(S.turn<12&&!p.mercy){p.mercy=1;ap(p,{danh:-10,sung:-10});if(rkOf(p)>0){if(p===S)S.rank--;else if(p.queen){p.queen=false;p.rank=6}else p.rank--}p.confined=Math.max(p.confined||0,3);log(`<span class="r">${p===S?"Ngươi":p.name}: ${why.replace(/^Bị /,"suýt bị ")}. Niệm tình mới vào cung, Hoàng thượng tha tội chết: giáng một bậc, cấm túc 3 tháng, Danh -10, Sủng -10. Lần sau sẽ không tha.</span>`);return}
  if(p===S){if(has("nhantu")&&roll(30))return cold(`${why}. Hoàng thượng nhân từ tha tội chết, đày ngươi vào lãnh cung`);return die(why)}
  if(has("nhantu")&&roll(30)){p.out=true;if(p.queen)p.queen=false;log(`<span class="r">${p.name}: ${why}. Hoàng thượng nhân từ, đày vào lãnh cung.</span>`);return}
  p.alive=false;if(p.queen)p.queen=false;log(`<span class="r">${p.name} bị ban chết: ${why}.</span>`)}
/* a proven crime (accusation with evidence) */
function fall(p,why){if(p===S){if(ACTX.a&&ACTX.a!==S)S.framedBy=key(ACTX.a);if(S.rank>=5||R(2)){cold(`Ngươi ${why}`);return}S.rank=Math.max(0,S.rank-2);apply({sung:-15});log(`<span class="r">Ngươi ${why}, bị giáng xuống ${RANKS[S.rank].n}.</span>`);return}
 if(ACTX.a&&ACTX.a!==p)p.coldBy=key(ACTX.a);if(p.queen||p.rank>=5){p.out=true;p.queen=false;log(`<span class="g">${p.name} ${why}, bị phế vào lãnh cung.</span>`)}
 else if(R(2)){p.out=true;log(`<span class="g">${p.name} ${why}, bị đày vào lãnh cung.</span>`)}
 else{p.rank=Math.max(0,p.rank-2);p.sung=cl(p.sung-15,0,100);log(`<span class="g">${p.name} ${why}, bị giáng xuống ${RANKS[p.rank].n}.</span>`)}}
/* a fabricated charge that sticks */
function framed(p,why){if(ACTX.a&&ACTX.a!==p)p.framedBy=key(ACTX.a);const d=Math.round(12*(DG()?1.3:1));ap(p,{danh:-d,sung:-10});punish(p,why,2);return d}
/* the target's people notice first: same detection for everyone */
function caught(a,t,ps,desc){if(!roll(cl(oSee(t,ps)-4*(facN(a)-1),5,95)))return"";evA(t,a,2);relAdd(a,t,-10);
 if(t===S)return `${ps&&(S.doctor||S.arts.y>=2)?"Ngươi nhận ra điều lạ":"Tai mắt báo"}: ${a.name} định ${desc}. Ngươi chặn kịp và nắm 2 chứng cứ. `;
 return `Người của ${t.name} phát giác ${NM(a)} định ${desc}; ${t.name} nắm 2 chứng cứ của ${NM(a)}. `}
function judgeName(t){return t.queen||t===S&&S.rank>=7?"Hoàng thượng":queenP()&&queenP()!==t?(queenP()===S?"ngươi (Hoàng hậu)":"Hoàng hậu"):"Hoàng thượng"}

/* ---------- the acts: act(actor, target) ---------- */
const ACT={};
function A(k,n,o){o.k=k;o.n=n;ACT[k]=o}
A("spy","Dò la",{c:{bac:-15},ok:(a,t)=>a.bac>=15,o:(a)=>oSpy(a),f:(a,t)=>{ap(a,{bac:-15});if(roll(oSpy(a))){evA(a,t,1);ap(a,{tamco:2});return `${NMc(a)} dò la ${NM(t)}: <span class="g">nắm thêm một chứng cứ</span>. `}relAdd(a,t,-8);return `${NMc(a)} dò la ${NM(t)}: <span class="r">bị phát hiện</span>. `}});
A("ally","Kết giao",{c:{bac:-30},ok:(a,t)=>a.bac>=30,o:(a,t)=>oAlly(a,t),f:(a,t)=>{ap(a,{bac:-30});if(roll(oAlly(a,t))){relAdd(a,t,25);if(t!==S)t.ghen=cl(t.ghen-10,0,100);return `${NMc(a)} kết giao với ${NM(t)}: <span class="g">thành</span>. `}relAdd(a,t,-5);return `${NMc(a)} kết giao với ${NM(t)}: bị lạnh nhạt. `}});
A("rumor","Tung tin đồn",{c:{},ok:()=>true,o:a=>oRumor(a),x:"Danh nàng -8",f:(a,t)=>{const c=caught(a,t,false,"tung tin đồn bẩn");if(c)return c;if(roll(oRumor(a))){ap(t,{danh:-8});return `<span class="r">Khắp cung đồn ${NM(t)} tư thông.</span> Danh ${NM(t)} -8. `}evA(t,a,1);relAdd(a,t,-5);return `Lời đồn ${NM(a)} tung ra về ${NM(t)} không ai tin. `}});
A("frame","Vu oan",{c:{duc:-5},ok:()=>true,o:a=>oFrame(a),x:"lộ: Danh -15",f:(a,t)=>{a.schemes=(a.schemes||0)+1;ap(a,{duc:-5});const c=caught(a,t,false,"vu cho "+NM(t)+" dùng bùa ngải");if(c)return c;
  if(roll(oFrame(a))){const d=framed(t,"bị vu dùng bùa ngải");ap(a,{danh:3,tamco:2});return `<span class="r">Trong tẩm cung ${NM(t)} tìm thấy hình nhân bùa ngải.</span> Danh ${NM(t)} -${d} · Sủng -10. `}
  ap(a,{danh:-15,sung:-8});relAdd(a,t,-30);evA(t,a,1);punish(a,"vu oan phi tần",2);return `<span class="r">${NMc(a)} vu oan ${NM(t)} bị lộ.</span> `}});
A("poison","Hạ độc",{c:{duc:-10},ok:()=>true,o:a=>oPoison(a),x:"lộ: ban chết",f:(a,t)=>{a.schemes=(a.schemes||0)+1;ap(a,{duc:-10});const c=caught(a,t,true,"bỏ độc vào điểm tâm của "+NM(t));if(c)return c;
  if(roll(oPoison(a))){const strong=takeItem(a,"hacdinh");if(useAnti(t)){ap(t,{suc:-10});return `${NMc(t)} trúng độc, may có thuốc giải trong rương. Sức -10. `}
   const d=strong?120:35+R(30);if(t===S){apply({suc:-d});return `<span class="r">Ngươi trúng độc, nôn ra máu.</span> Sức -${d}. `}ap(t,{suc:-d});return dieIf(t,"chết sau một bát yến sào")||`<span class="r">${t.name} trúng độc, thập tử nhất sinh.</span> `}
  const r=`<span class="r">Thuốc độc nhắm vào ${NM(t)} bị phát hiện, tra ra người của ${NM(a)}.</span> `;deathSentence(a,`Bị ban rượu độc vì mưu hại ${NM(t)}`);return r}});
A("accuse","Tố giác",{c:{},ok:(a,t)=>accOK(a,t),o:(a,t)=>oAccuse(a,t),x:"cần 2 chứng cứ (Hoàng hậu: 4 chứng cứ và phẩm Tần trở lên; tố hụt Hoàng hậu là phạm thượng)",f:(a,t)=>{const o=oAccuse(a,t);evA(a,t,-99);
  if(roll(o)){const r=`${NMc(a)} tố giác ${NM(t)} trước ${judgeName(t)}: <span class="${t===S?"r":"g"}">thành</span>. `;ap(a,{danh:6});if(a!==S||roll(40))bestow(a,"accuse");if(rkOf(t)>=7)a.seatBan=S.turn+12;fall(t,"bị tố giác, chứng cứ rành rành");return r}
  ap(a,{danh:-8});relAdd(a,t,-20);if(rkOf(t)>=7)punish(a,"tố hụt Hoàng hậu, phạm thượng",2);return `${NMc(a)} tố giác ${NM(t)} không thành; chứng cứ bị hủy. `}});
A("bribe","Mua chuộc cung nữ",{c:{bac:-40},ok:(a,t)=>a.bac>=40,o:(a,t)=>oBribe(a,t),f:(a,t)=>{ap(a,{bac:-40});
  if(roll(oBribe(a,t))){if(t.schemes>0){evA(a,t,2);return `Cung nữ ${t.maid.name} của ${NM(t)} bị ${NM(a)} mua chuộc, khai ra mưu kế của chủ: ${NM(a)} nắm 2 chứng cứ. `}const g=Math.min(30,t.bac);ap(t,{bac:-g});ap(a,{bac:g});t.maid.loyal=cl(t.maid.loyal-10,0,100);return `Cung nữ ${t.maid.name} của ${NM(t)} bị ${NM(a)} mua chuộc, lấy trộm ${g} lượng. `}
  t.maid.loyal=cl(t.maid.loyal+5,0,100);evA(t,a,1);return `Cung nữ ${t.maid.name} từ chối bạc của ${NM(a)} và báo cho chủ. `}});
A("block","Rút thẻ bài",{c:{bac:-40},ok:(a,t)=>a.bac>=40&&!t.block,o:a=>oBlock(a),x:"2 tuần nàng không được lật thẻ",f:(a,t)=>{ap(a,{bac:-40});const c=caught(a,t,false,"đút lót Kính sự phòng rút thẻ bài của "+NM(t));if(c)return c;
  if(roll(oBlock(a))){t.block=2;return `${NMc(a)} đút lót Kính sự phòng: thẻ bài của ${NM(t)} bị giấu đi hai tuần. `}evA(t,a,1);return `Tổng quản Kính sự phòng nhận bạc của ${NM(a)} rồi đem chuyện kể với ${NM(t)}. `}});
A("musk","Bỏ xạ hương",{c:{bac:-30,duc:-8},ok:(a,t)=>a.bac>=30&&t.preg&&!t.hidden,o:()=>null,x:"nàng sảy thai",f:(a,t)=>{ap(a,{bac:-30,duc:-8});a.schemes=(a.schemes||0)+1;const c=caught(a,t,true,"bỏ xạ hương vào thuốc an thai của "+NM(t));if(c)return c;
  if(t.fake){t.preg=0;t.fake=0;evA(t,a,1);return `${NMc(a)} sai người bỏ xạ hương vào thuốc của ${NM(t)}; ${NM(t)} nhân đó giả sảy thai, thoát khỏi vở kịch. `}
  t.preg=0;t.hidden=false;ap(t,{suc:-25});return `<span class="r">${NMc(t)} sảy thai.</span> Thái y nói trong thuốc có xạ hương. Sức -25. `}});
A("catswap","Mua chuộc bà đỡ",{c:{bac:-50,duc:-10},ok:(a,t)=>a.bac>=50&&t.preg>=6&&!t.hidden&&!t.catplot,o:()=>null,x:"tráo hài nhi khi nàng sinh",f:(a,t)=>{ap(a,{bac:-50,duc:-10});a.schemes=(a.schemes||0)+1;t.catplot=key(a);return `${NMc(a)} cài bà đỡ vào cung ${NM(t)}, chờ ngày nàng lâm bồn. `}});
A("ksab","Phá việc học",{c:{duc:-3},kid:1,ok:(a,t)=>!!tKid(t),o:a=>oKSab(a),f:(a,t)=>{const k=tKid(t);a.schemes=(a.schemes||0)+1;ap(a,{duc:-3});const c=caught(a,t,false,`phá việc học của ${k.name}`);if(c)return c;
  if(roll(oKSab(a))){k.tal=cl(k.tal-15,0,100);ap(a,{tamco:2});return `${NMc(a)} mua chuộc thầy dạy, ${k.name} học hành sa sút. Tài -15. `}ap(a,{danh:-10});relAdd(a,t,-20);punish(a,"phá việc học của hoàng tự",2);return `<span class="r">Mưu phá việc học của ${k.name} bị lộ.</span> `}});
A("kpoison","Hạ độc con nàng",{c:{duc:-20},kid:1,ok:(a,t)=>!!tKid(t),o:a=>oKPoison(a),x:"lộ: ban chết",f:(a,t)=>{const k=tKid(t);a.schemes=(a.schemes||0)+1;ap(a,{duc:-20});const c=caught(a,t,true,`bỏ độc vào cháo của ${k.name}`);if(c)return c;
  if(roll(oKPoison(a))){const d=50+R(40);k.hp-=t.doctor?Math.round(d/2):d;return k.hp<=0?kidDie(k,"trúng độc mà chết",t===S):`<span class="r">${k.name} trúng độc, thập tử nhất sinh.</span> Sức khỏe còn ${k.hp}. `}
  const r=`<span class="r">Bát chè độc dâng ${k.name} bị thử ra, tra đến người của ${NM(a)}.</span> `;deathSentence(a,`Bị ban chết vì đầu độc ${k.name}`);return r}});
A("pond","Đẩy con nàng xuống hồ",{c:{duc:-15},kid:1,ok:(a,t)=>kidsOf(t).some(k=>k.age>=2),o:a=>oKSab(a),f:(a,t)=>{const k=pick(kidsOf(t).filter(k=>k.age>=2));a.schemes=(a.schemes||0)+1;ap(a,{duc:-15});const c=caught(a,t,true,`đẩy ${k.name} xuống hồ sen`);if(c)return c;
  if(roll(oKSab(a))){if(roll(45))return kidDie(k,"chết đuối ở hồ sen",t===S);k.hp=Math.max(1,k.hp-30);return `<span class="r">${k.name} bị đẩy xuống hồ sen, may được vớt lên.</span> Sức khỏe còn ${k.hp}. `}
  ap(a,{danh:-10});punish(a,"mưu hại hoàng tự",2);return `<span class="r">Kẻ định đẩy ${k.name} xuống hồ bị bắt, khai ra ${NM(a)}.</span> `}});
A("kframe","Vu con nàng trù ẻo",{c:{duc:-15},kid:1,ok:(a,t)=>sonsOf(t).some(k=>k.age>=6),o:a=>oKFrame(a),x:"lộ: ban chết",f:(a,t)=>{const k=sonsOf(t).filter(k=>k.age>=6).sort((x,y)=>(+y.heir)-(+x.heir))[0];a.schemes=(a.schemes||0)+1;ap(a,{duc:-15});const c=caught(a,t,false,`chôn hình nhân trù ẻo trong phòng ${k.name}`);if(c)return c;
  if(roll(oKFrame(a))){k.fond=cl(k.fond-35,0,100);ap(t,{danh:-10});let r=`<span class="r">Trong phòng ${k.name} đào được hình nhân trù ẻo Hoàng thượng.</span> Hoàng thượng thương nó -35. `;if(k.heir){k.heir=false;S.heir=null;r+=`${k.name} bị phế ngôi Thái tử. `}punish(t,"con trai bị tố trù ẻo",2);ap(a,{tamco:2});return r}
  const r=`<span class="r">Hình nhân trù ẻo bị lần ra gốc gác: người của ${NM(a)}.</span> `;deathSentence(a,`Bị ban chết vì vu ${k.name} trù ẻo thánh thượng`);return r}});
A("takeaway","Xin bế con nàng về nuôi",{c:{},kid:1,ok:(a,t)=>rkOf(a)>rkOf(t)&&rkOf(t)<4&&kidsOf(t).some(k=>k.age<6),o:a=>odA(a,40+a.sung/3+rkOf(a)*4),x:"chỉ người phẩm cao hơn",f:(a,t)=>{const k=pick(kidsOf(t).filter(k=>k.age<6));
  if(!roll(odA(a,40+a.sung/3+rkOf(a)*4))){relAdd(a,t,-10);return `${NMc(a)} xin bế ${k.name} về nuôi; Hoàng thượng chưa chuẩn. `}
  t.kids.splice(t.kids.indexOf(k),1);a.kids.push(k);if(k.heir&&S.heir)S.heir.v=a===S?null:a;relAdd(a,t,-30);
  return `<span class="${t===S?"r":"g"}">${a===S?"Ngươi":(a.queen?"Hoàng hậu":a.name)} được chuẩn bế ${k.name} về nuôi, vì phẩm vị ${NM(t)} còn thấp.</span> `}});
A("vp","Tố vượt phẩm",{c:{},ok:(a,t)=>vpItems(t).length>0,o:a=>oVP(a),x:"nàng mặc đồ quá phẩm vị",f:(a,t)=>vpAccuse(a,t)});
A("plant","Cài đồ vào rương",{c:{},ok:(a,t)=>a.inv.some(e=>!e.h),o:(a,t)=>oPlant(a,t),x:"chọn món đồ",npcOnly:0,f:(a,t,ix)=>plantItem(a,t,ix)});
A("steal","Tranh sủng",{c:{duc:-4},ok:(a,t)=>tonightOf()===t,o:a=>oSteal(a),f:(a,t)=>stealNight(a,t,"feign")});
A("road","Chặn ngự giá",{c:{suc:-5},ok:(a,t)=>tonightOf()===t,o:a=>oSteal(a,"road"),f:(a,t)=>stealNight(a,t,"road")});
A("gift","Tặng quà",{c:{},ok:(a,t)=>a.inv.some(e=>!e.h),o:()=>null,f:(a,t,ix)=>giveTo(a,t,ix)});
function stealWin(a,t,mode){relAdd(a,t,-15);if(t!==S)t.ghen=cl(t.ghen+25,0,100);if(a===S){S.tonight="me";nightScene()}else S.tonight=a;
 return `${NMc(a)} ${mode==="road"?"chặn ngự giá giữa đường":"sai người báo đau tim"}, Hoàng thượng sang cung ${NM(a)} thay vì ${NM(t)}. `}
function tKid(t){const L=kidsOf(t).filter(k=>k.age>=3||k.heir);return L.sort((a,b)=>((+b.heir)-(+a.heir))||((b.sex==="m")-(a.sex==="m"))||(b.fond-a.fond))[0]||null}
function targetKid(v){return tKid(v)}
function tonightOf(){return S.tonight==="me"?S:S.tonight||null}
function stealNight(a,t,mode){ap(a,mode==="road"?{suc:-5}:{duc:-4});const o=oSteal(a,mode);
 if(roll(o))return stealWin(a,t,mode);
 ap(a,{sung:-3});return `${NMc(a)} định giành đêm của ${NM(t)} nhưng Hoàng thượng không động lòng. Sủng -3. `}

/* ---------- judging by standing ---------- */
function judge(q,p){const n=evG(q,p),r=`${q===S?"Ngươi, ngôi Hoàng hậu,":"Hoàng hậu "+q.name} xét tội ${NM(p)} theo ${n} chứng cứ. `;evA(q,p,-99);relAdd(q,p,-10);punish(p,"bị Hoàng hậu xử tội",n>=3?2:1);return r}
function vpItems(p){const r=rkOf(p);const L=(p.inv||[]).filter(e=>e.w&&IT[e.k]&&IT[e.k].rk>r);if(p.dress&&p.dress.until>S.turn&&IT[p.dress.k].rk>r)L.push({k:p.dress.k,dress:1});return L}
function vpAccuse(a,t){const L=vpItems(t);if(!L.length)return"";const n=L.map(e=>IT[e.k].n).join(", ");
 if(roll(oVP(a))){t.inv=t.inv.filter(e=>!(e.w&&IT[e.k].rk>rkOf(t)));if(L.some(e=>e.dress))t.dress=null;ap(t,{danh:-8});punish(t,"vượt phẩm",1);relAdd(a,t,-10);return `${NMc(a)} tố ${NM(t)} vượt phẩm (${n}): <span class="${t===S?"r":"g"}">thành</span>. Đồ bị tịch thu, Danh -8. `}
 ap(a,{danh:-3});relAdd(a,t,-10);return `${NMc(a)} tố ${NM(t)} vượt phẩm, ${judgeName(t)} bỏ qua. `}

/* ================= ITEMS ================= */
const IT={
 tramngoc:{n:"Trâm ngọc bích",kd:"Trang sức",d:"Cài tóc: Sắc +2",pr:30,rk:0,sl:"hair",w:{sac:2},tg:["hh","rv"]},
 boodieu:{n:"Bộ diêu vàng",kd:"Trang sức",d:"Cài tóc: Sắc +5, Danh +2 · từ bậc Phi",pr:90,rk:4,sl:"hair",w:{sac:5,danh:2},tg:["hh","rv"]},
 tramphuong:{n:"Trâm phượng cửu vĩ",kd:"Trang sức",d:"Cài tóc: Sắc +8, Danh +4 · chỉ Hoàng hậu",pr:200,rk:7,sl:"hair",w:{sac:8,danh:4},tg:["rv"]},
 vongngoc:{n:"Vòng ngọc Hòa Điền",kd:"Trang sức",d:"Đeo tay: Sắc +2, Danh +1",pr:50,rk:0,sl:"wrist",w:{sac:2,danh:1},tg:["th","hh","rv"]},
 vongvang:{n:"Vòng vàng chạm phượng",kd:"Trang sức",d:"Đeo tay: Sắc +4, Danh +3 · từ Quý phi",pr:120,rk:5,sl:"wrist",w:{sac:4,danh:3},tg:["rv"]},
 sonphan:{n:"Son phấn Dương Châu",kd:"Trang sức",d:"Dùng: Sắc +2",pr:20,use:{sac:2},tg:["rv"]},
 luahang:{n:"Lụa Hàng Châu",kd:"Vải vóc",d:"May áo: Sắc +3 trong 3 tháng",pr:30,rk:0,dr:3,tg:["th","rv"]},
 gamto:{n:"Gấm Tô Châu",kd:"Vải vóc",d:"May áo: Sắc +6 trong 3 tháng · từ Quý phi",pr:80,rk:5,dr:6,tg:["th","hh","rv"]},
 gamvang:{n:"Gấm minh hoàng",kd:"Vải vóc",d:"Áo vàng: Sắc +9 trong 3 tháng · chỉ Hoàng hậu",pr:160,rk:7,dr:9,tg:[]},
 nhansam:{n:"Nhân sâm trăm năm",kd:"Thuốc bổ",d:"Dùng: Sức +25; có thai thì an thai",pr:60,use:{suc:25},ant:1,tg:["th"]},
 yensao:{n:"Yến sào",kd:"Thuốc bổ",d:"Dùng: Sức +15, Sắc +1",pr:35,use:{suc:15,sac:1},tg:["th","rv"]},
 agiao:{n:"A giao",kd:"Thuốc bổ",d:"Dùng: Sức +10; 2 tháng dễ thụ thai",pr:40,use:{suc:10},fert:2,tg:["rv"]},
 giaidoc:{n:"Thuốc giải độc",kd:"Thuốc",d:"Để trong rương: cứu một lần trúng độc",pr:70,anti:1,tg:[]},
 thuocanthai:{n:"Thuốc an thai",kd:"Thuốc",d:"Dùng khi có thai: nguy cơ sảy giảm nửa",pr:25,ant:1,tg:["rv"]},
 huongtram:{n:"Hương trầm",kd:"Hương liệu",d:"Dùng: Đức +1, Sức +5",pr:20,use:{duc:1,suc:5},tg:["th","emp"]},
 tuithom:{n:"Túi thơm thêu",kd:"Hương liệu",d:"Dùng: Sức +3",pr:15,use:{suc:3},tg:["rv","hh"]},
 xahuong:{n:"Xạ hương",kd:"Hương liệu",d:"Trộn vào túi thơm, hương trầm: hại thai",pr:50,mat:"xa",tg:[]},
 hacdinh:{n:"Hạc đỉnh hồng",kd:"Độc dược",d:"Hạ độc chắc chết · bị khám ra là có tội",pr:120,il:1,tg:[]},
 botngua:{n:"Bột ngứa",kd:"Độc dược",d:"Dùng với phi tần: nàng Danh -5 · bị khám ra là có tội",pr:30,il:1,tg:[]},
 tranhco:{n:"Tranh cổ",kd:"Lễ vật",d:"Tặng Hoàng thượng, Thái hậu: rất hợp ý",pr:90,gv:10,tg:["emp","th"]},
 nghien:{n:"Nghiên mực Đoan Khê",kd:"Lễ vật",d:"Tặng Hoàng thượng: hợp ý",pr:60,gv:8,tg:["emp"]},
 dancoc:{n:"Đàn cổ Tiêu Vĩ",kd:"Lễ vật",d:"Tặng Hoàng thượng, phi tần mê nhạc",pr:100,gv:10,tg:["emp","rv"]},
 demgam:{n:"Đệm gấm",kd:"Lễ vật",d:"Tặng: êm ấm, ai cũng nhận",pr:20,gv:4,tg:["th","rv","hh"]},
 ngocboi:{n:"Ngọc bội ngự ban",kd:"Kỷ vật",d:"Còn giữ: Sủng không dưới 15 · mất là đại họa",pr:0,keep:1,tg:[]},
 thunha:{n:"Thư nhà",kd:"Thư từ",d:"Đọc: Sức +10, Đức +2",pr:0,use:{suc:10,duc:2},tg:[]},
 chungcu:{n:"Tập chứng cứ",kd:"Thư từ",d:"Dùng với một phi tần: chứng cứ +2",pr:0,evi:2,tg:[]}};
/* hidden taints on innocent items (two-way scheme tools) */
const TAINT={xa:{n:"trộn xạ hương",on:["tuithom","huongtram"],need:"xahuong",c:0,hurt:"hại thai"},
 bua:{n:"giấu bùa chú",on:["tuithom","demgam"],c:30,il:1,hurt:"người giữ hao sức; khám ra là tội bùa ngải"},
 chi:{n:"pha chì",on:["sonphan"],c:20,hurt:"Sắc, Sức người dùng giảm dần"},
 meo:{n:"nhồi lông mèo",on:["demgam"],c:5,hurt:"người suyễn hao sức"},
 gia:{n:"khắc dấu 'ngự ban' giả",on:["vongngoc","tramngoc"],c:50,il:1,hurt:"khám ra là tội khi quân"},
 trom:{n:"thành ngọc bội ngự dụng bị trộm",on:["ngocboi","vongngoc"],c:80,il:1,hurt:"khám ra là tội trộm"}};
const SHOP_ALL=["tramngoc","vongngoc","sonphan","luahang","gamto","nhansam","yensao","agiao","giaidoc","thuocanthai","huongtram","tuithom","tranhco","nghien","dancoc","demgam","boodieu","vongvang"];
function restock(){const L=shuf(SHOP_ALL.slice()).slice(0,6);if(roll(45))L.push(pick(["xahuong","hacdinh","botngua"]));S.shop=L}
const ITIMG={tramphuong:"tram-phuong",vongngoc:"vong-ngoc",boodieu:"bo-dieu",gamto:"gam-to-chau",luahang:"lua-hang-chau",nhansam:"nhan-sam",yensao:"yen-sao",agiao:"a-giao",giaidoc:"thuoc-giai",thuocanthai:"thuoc-an-thai",huongtram:"huong-tram",xahuong:"xa-huong",hacdinh:"hac-dinh-hong",botngua:"bot-ngua",tranhco:"tranh-co",nghien:"nghien-muc",dancoc:"dan-co",ngocboi:"ngoc-boi-ban",thunha:"thu-nha",tuithom:"tui-thom",sonphan:"phan-son",chungcu:"hinh-nhan"};
function iic(k,s){return ITIMG[k]?ic("item-"+ITIMG[k],s||22):""}
function iname(e){const it=IT[e.k];return it?it.n:e.k}
function takeItem(p,k){const i=p.inv.findIndex(e=>e.k===k&&!e.h);if(i<0)return false;p.inv.splice(i,1);return true}
function useAnti(p){return takeItem(p,"giaidoc")}
function wearBonus(p){const b={sac:0,danh:0};if(!p||!p.inv)return b;const r=rkOf(p);
 for(const e of p.inv)if(e.w&&IT[e.k]&&IT[e.k].w){const m=IT[e.k].rk>r?1.5:1;for(const s in IT[e.k].w)b[s]+=Math.round(IT[e.k].w[s]*m)}
 if(p.dress&&p.dress.until>S.turn){const it=IT[p.dress.k];b.sac+=Math.round(it.dr*(it.rk>r?1.5:1))}return b}
function buy(p,k){const it=IT[k];if(!it||p.bac<it.pr)return false;ap(p,{bac:-it.pr});p.inv.push({k});return true}
function wear(p,ix){const e=p.inv[ix],it=e&&IT[e.k];if(!it||!it.sl||e.h)return;const on=!e.w;p.inv.forEach(x=>{if(IT[x.k]&&IT[x.k].sl===it.sl)x.w=0});e.w=on?1:0}
function useItem(p,ix,tgt){const e=p.inv[ix],it=e&&IT[e.k];if(!it||e.h)return"";let r="";
 if(it.dr){p.inv.splice(ix,1);p.dress={k:e.k,until:S.turn+3};return `${NMc(p)} may áo mới bằng ${it.n}${it.rk>rkOf(p)?" (vượt phẩm!)":""}. `}
 if(it.sl){wear(p,ix);return""}
 if(it.evi){const t=tgt;if(!t)return"";p.inv.splice(ix,1);evA(p,t,it.evi);return `${NMc(p)} giữ tập chứng cứ về ${t.name}: chứng cứ +${it.evi}. `}
 if(e.k==="botngua"){if(!tgt)return"";p.inv.splice(ix,1);const c=caught(p,tgt,false,"rắc bột ngứa vào áo "+tgt.name);if(c)return c;ap(tgt,{danh:-5});return `${tgt.name} gãi ngứa giữa yến tiệc, mất hết thể diện. Danh -5. `}
 if(it.anti||it.keep||it.mat||it.gv||it.il)return"";
 p.inv.splice(ix,1);if(it.use)ap(p,it.use);if(it.ant&&p.preg)p.anthai=1;if(it.fert)p.fert=Math.max(p.fert||0,it.fert);
 if(e.t)taintHit(p,e,true);
 return `${NMc(p)} dùng ${it.n}. ${fmt(it.use)}${it.ant&&p.preg?" · an thai":""}`}
function sellItem(p,ix){const e=p.inv[ix],it=e&&IT[e.k];if(!it||e.h)return"";p.inv.splice(ix,1);const g=Math.floor(it.pr/2);ap(p,{bac:g});return `${NMc(p)} bán ${it.n}: Bạc +${g}. `}
function taintItem(p,ix,tk){const e=p.inv[ix],T=TAINT[tk];if(!e||!T||!T.on.includes(e.k)||e.t)return"";if(T.need&&!takeItem(p,T.need))return"";
 const e2=p.inv.find(x=>x===e);if(!e2)return"";if(T.c)ap(p,{bac:-T.c,duc:-3});else ap(p,{duc:-3});e2.t=tk;e2.by=key(p);p.schemes=(p.schemes||0)+1;return `${NMc(p)} lén ${T.n} vào ${iname(e2)}. `}
/* receiving: people's tastes */
function giftVal(it,r){const base=it.gv||Math.round(it.pr/12)+2;const like=r==="emp"?(it.tg.includes("emp")||((it.k==="nghien"||it.k==="dancoc")&&(has("trongtai")||has("chamchinh")))):r==="th"?it.tg.includes("th"):r&&r.queen?it.tg.includes("hh"):it.tg.includes("rv");return like?base:Math.round(base/3)}
function giveTo(a,r,ix){const e=a.inv[ix];if(!e||e.h)return"";const it=IT[e.k];a.inv.splice(ix,1);e.w=0;const g=giftVal(Object.assign({k:e.k},it),r);
 if(r==="emp"){ap(a,{sung:Math.max(1,Math.round(g/2))});if(e.t==="gia"||e.t==="trom"){ap(a,{sung:-20});punish(a,"dâng đồ ngự dụng giả mạo",2)}return `${NMc(a)} dâng ${it.n} lên Hoàng thượng. Sủng +${Math.max(1,Math.round(g/2))}. `}
 if(r==="th"){ap(a,{th:g});return `${NMc(a)} dâng ${it.n} lên Thái hậu. Thái hậu +${g}. `}
 relAdd(a,r,g+3);if(r.queen||(r===S&&S.rank>=7))ap(a,{hh:g});
 const ent={k:e.k,from:key(a)};if(e.t){ent.t=e.t;ent.by=e.by}
 if(r===S){pushDil(mkP("giftin",{f:key(a),e:ent}),"Quà tặng");return `${a.name} sai người mang ${it.n} sang tặng ngươi. `}
 r.inv.push(ent);if(e.t&&roll(oSee(r,true))){r.inv.pop();evA(r,a,2);relAdd(a,r,-25);return `${r.name} nhận ${it.n} của ${NM(a)} nhưng người của nàng phát hiện đồ có vấn đề: nàng nắm 2 chứng cứ. `}
 if(IT[e.k].sl&&IT[e.k].rk>rkOf(r)&&(r.trait==="Kiêu ngạo"||r.trait==="Tham vọng"||roll(25)))wear(r,r.inv.length-1);
 return `${NMc(a)} tặng ${it.n} cho ${r.name}: thân +${g+3}. `}
function plantItem(a,t,ix){const e=a.inv[ix];if(!e||e.h)return"";a.inv.splice(ix,1);e.w=0;a.schemes=(a.schemes||0)+1;
 if(!roll(oPlant(a,t))){evA(t,a,2);relAdd(a,t,-20);return `<span class="r">Kẻ lẻn vào cung ${NM(t)} cài ${iname(e)} bị bắt, khai ra ${NM(a)}.</span> ${NMc(t)} nắm 2 chứng cứ. `}
 t.inv.push({k:e.k,t:e.t,by:key(a),h:1});return `${NMc(a)} lén cài ${iname(e)}${e.t?" ("+TAINT[e.t].n+")":""} vào rương ${NM(t)}. `}
/* a taint working on its holder */
function taintHit(p,e,used){const t=e.t;if(!t)return"";let r="";
 if(t==="xa"&&p.preg&&!p.fake&&(used||roll(35))){p.preg=0;p.hidden=false;ap(p,{suc:-20});r=`<span class="r">${NMc(p)} động thai, sảy mất đứa bé.</span> `}
 if(t==="chi")ap(p,{sac:-1,suc:-3});if(t==="meo")ap(p,{suc:p.asthma?-8:-1});if(t==="bua")ap(p,{suc:-3});return r}
function itemMonth(p){let r="";for(const e of p.inv.slice())if(e.t)r+=taintHit(p,e,false);
 if(p.inv.some(e=>e.k==="ngocboi"&&!e.t&&!e.h)&&p.sung<15)p.sung=15;
 if(p===S&&p.inv.some(e=>e.t&&e.by!=="me")&&roll(oSee(S,true)/5))r+=`Ngươi thấy trong người khó chịu từ khi nhận quà; nên kiểm tra đồ. `;
 return p===S?r:(r?"":"")}
/* inspection: same detection for everyone */
function inspect(p){const found=[];const sees=oSee(p,true);
 for(const e of p.inv.slice()){if(!(e.t||e.h))continue;if(e.by===key(p)&&!e.h)continue;if(!roll(sees))continue;
  p.inv.splice(p.inv.indexOf(e),1);const by=byKey(e.by);let s=`${iname(e)}${e.t?" ("+TAINT[e.t].n+")":""}${e.h?" lạ, không rõ ai cài":""}`;
  if(by&&by!==p&&roll(40+p.mat*6)){evA(p,by,2);s+=`: dấu vết dẫn về ${NM(by)} (chứng cứ +2)`}found.push(s)}
 return found}
/* palace search: illegal things found are crimes, unless the trail leads to whoever planted them */
function search(p){const bad=p.inv.filter(e=>(IT[e.k]&&IT[e.k].il)||(e.t&&TAINT[e.t].il));if(!bad.length)return"";const e=bad[0];p.inv.splice(p.inv.indexOf(e),1);
 const by=byKey(e.by),what=`${iname(e)}${e.t?" ("+TAINT[e.t].n+")":""}`;
 if(by&&by!==p&&roll(35+p.mat*5)){punish(by,"cài tang vật vu oan",2);evA(p,by,2);return `Cung Chính ti khám cung ${NM(p)}, tìm thấy ${what}; tra ra do ${NM(by)} cài vào. `}
 if(e.t==="bua"){const d=framed(p,"tàng trữ bùa chú");return `<span class="r">Khám cung ${NM(p)} tìm thấy ${what}.</span> Danh -${d}. `}
if(e.by&&e.by!==key(p))p.framedBy=e.by;
 if(e.t==="trom"){fall(p,"bị khám ra giấu ngọc bội ngự dụng");return `Khám cung ${NM(p)} tìm thấy ${what}. `}
 ap(p,{danh:-10});punish(p,e.t==="gia"?"tội khi quân":"tàng trữ độc vật",2);return `<span class="r">Khám cung ${NM(p)} tìm thấy ${what}.</span> Danh -10. `}
/* bestowals */
const TITLES=["Thục","Hiền","Đức","Thuần","Uyển","Trinh","Gia","Ý","Tĩnh","Huệ"];
const BEST={night:["tramngoc","vongngoc","luahang","yensao","sonphan","huongtram"],contest:["dancoc","gamto","vongngoc","tranhco"],son:["ngocboi","nhansam","vongvang","gamto"],promo:["boodieu","gamto","vongvang","tranhco"],accuse:["vongngoc","nghien","luahang"],story:["tranhco","vongngoc","nhansam","chungcu"],birthday:["dancoc","tramngoc","gamto"]};
const BWHY={night:"sau đêm thị tẩm",contest:"vì tài nghệ hơn người",son:"mừng hoàng tử ra đời",promo:"nhân dịp tấn phong",accuse:"vì tố giác kẻ gian",story:"",birthday:"nhân tiết Vạn thọ"};
function bestow(p,why){if(!p||p.dead||(p!==S&&!p.alive))return;let L=BEST[why]||BEST.night;L=L.filter(k=>!IT[k].rk||IT[k].rk<=rkOf(p)||why==="son");const k=pick(L.length?L:["tramngoc"]);p.inv.push({k,from:"emp"});
 let tt="";if(["son","promo","contest"].includes(why)&&!p.hieu&&roll(30)){const used=[S.hieu].concat(rivals.map(v=>v.hieu));const f=TITLES.filter(x=>!used.includes(x));if(f.length){p.hieu=pick(f);ap(p,{danh:5});tt=p.hieu}}
 if(p===S){Q.push({t:"Thánh thượng ban thưởng",who:pEmp(),h:`<p style="text-align:center">${iic(k,48)}</p><p>Thái giám tuyên khẩu dụ ${BWHY[why]||""}: ban cho ngươi <b>${IT[k].n}</b>.</p><p class="past">${IT[k].d}</p>${tt?`<p>Lại ban hiệu <b>${tt}</b>, gọi là ${tt} ${RANKS[Math.min(6,S.rank)].n}. Danh +5.</p>`:""}`});log(`Được ban ${IT[k].n}${tt?`, ban hiệu ${tt}`:""}.`)}
 else log(`${p.name} được Hoàng thượng ban ${IT[k].n}${tt?`, ban hiệu ${tt}`:""}.`)}

/* ================= NIGHTS ================= */
function nightScene(){S.tonight="me";pushFront(mkP("prep"),"Chuẩn bị thị tẩm")}
function pushFront(d,title){if(!d)return;Q.unshift({t:title||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp})}
function night(p=S){if(p.preg)return;if(roll(conceiveCh(p))){p.preg=1;p.pregWk=wk();if(p===S){S.hidden=true;log(`<span class="g">Thái y bắt mạch: ngươi đã có thai.</span> Ngươi có thể giấu thai đến hết tháng thứ 3, hoặc báo tin để được sủng ái.`)}else{p.hidden=p.tamco>=40;if(!p.hidden)ap(p,{sung:6,th:5})}}}
function giuBlocked(p){return rkOf(p)<=1&&(p.th<0||(has("hieuthao")&&p.th<10))&&roll(30)}
PEND.ksp=()=>({who:pEmp(),t:"<p>Tối nay Hoàng thượng lật thẻ bài của ngươi.</p>",o:[{n:"Tắm gội chờ giá",fx:{},x:"chuẩn bị thị tẩm",go:nightScene},
 {n:`Tiến cử ${S.maid.name} hầu thay`,fx:{},x:"nàng có thể được sủng, thành người của ngươi hoặc phản",go:()=>{log(sendMaid(S))}},
 {n:"Cáo bệnh",fx:{sung:-2},x:"nhường đêm; Ân tình -2",go:()=>{S.an=cl(S.an-2,0,100);S.tonight=null}}]});
PEND.prep=()=>{const wb=wearBonus(S),vp=vpItems(S).length>0,b=bestArt();return{who:pMe(),t:"<p>Kính sự phòng đã báo tin. Còn hai canh giờ trước khi kiệu đến.</p>",o:[
 {n:"Tắm cánh hoa, xông hương",fx:{bac:-10},x:"đêm nay được ưa hơn",go:()=>pushFront(mkP("night1",{q:2,vp:0}),"Đêm thị tẩm")},
 {n:"Điểm trang lộng lẫy",fx:{},x:`trang sức đang đeo: Sắc +${wb.sac}${vp?" · vượt phẩm, Hoàng thượng có thể thấy":""}`,go:()=>pushFront(mkP("night1",{q:1+Math.round(wb.sac/3),vp:vp?1:0}),"Đêm thị tẩm")},
 {n:`Tập trước ${b.n}`,fx:{suc:-5},x:`bậc ${b.l}`,go:()=>pushFront(mkP("night1",{q:1+b.l,vp:0}),"Đêm thị tẩm")},
 {n:"Để mộc, tự nhiên",fx:{},go:()=>pushFront(mkP("night1",{q:1,vp:0}),"Đêm thị tẩm")}]}};
PEND.night1=p=>{const E=S.emp,mood=[1,0,-1,-2][E.mood],go=b=>()=>{let s=p.q+b+mood+R(3),ex="";
  if(p.vp&&roll(40)){const n=vpItems(S).map(e=>IT[e.k].n).join(", ");S.inv=S.inv.filter(e=>!(e.w&&IT[e.k].rk>S.rank));if(vpItems(S).length)S.dress=null;apply({danh:-4});s-=2;ex=`Hoàng thượng nhíu mày nhìn ${n}: “Phẩm vị gì mà dám dùng thứ này?” Đồ bị thu lại. Danh -4.`;log(ex)}
  pushFront(mkP("night2",{s,ex}),"Đêm thị tẩm")};
 return{who:pEmp(),t:`<p>Canh một, thái giám Kính sự phòng cởi xiêm ngoài, cuộn ngươi trong tấm chăn gấm thêu phượng, khiêng vào Dưỡng Hòa điện theo lệ cũ.</p><p>Màn vàng rủ thấp. Hoàng thượng đặt quyển sách xuống${E.mood>=2?", vẻ mệt mỏi":""}, nhìn ngươi.</p>`,o:[
 {n:"Bàn thơ văn, cầm kỳ",fx:{},x:nx(has("trongtai")?3:S.tai>=60?1:0,has("trongtai")?"ngài trọng tài, rất hợp":""),go:go(has("trongtai")?3:S.tai>=60?1:0)},
 {n:"Bàn chuyện thiên hạ",fx:{},x:nx(has("chamchinh")?3:-1,has("chamchinh")?"ngài chăm chính sự, rất hợp":"ngài không thích phi tần bàn việc nước"),go:go(has("chamchinh")?3:-1)},
 {n:"Rót rượu, nũng nịu",fx:{},x:nx(has("datinh")||has("mesac")?3:has("lanhlung")?-1:0,has("datinh")||has("mesac")?"ngài đa tình, rất hợp":has("lanhlung")?"ngài lạnh lùng, dễ chán":""),go:go(has("datinh")||has("mesac")?3:has("lanhlung")?-1:0)},
 {n:"Lặng lẽ xoa vai, nghe ngài kể",fx:{},x:nx(E.mood>=2?2:1,E.mood>=2?"ngài đang phiền, rất hợp":"an toàn"),go:go(E.mood>=2?2:1)}]}};
/* the night talk's line: how well it suits him -> ladder word; the night is graded, never empty */
function nx(b,note){const m=[1,0,-1,-2][S.emp.mood];const v=b+m;const w=v>=3?"Rất chắc":v>=2?"Chắc":v>=1?"Khá chắc":v>=0?"Năm ăn năm thua":"Khó";return `${w} · thành: đêm vui, Sủng +5, Ân tình +5 · hỏng: đêm nhạt, Sủng +3, Ân tình +2${note?" · "+note:""}${vpItems(S).length?" · đồ vượt phẩm có thể bị thu, Danh -4":""}`}
function nightFx(s){S.tablet=0;S.nights++;S.nightLog.push(wk());const g=3+Math.max(0,Math.round(s/2));apply({sung:g});S.an=cl(S.an+2+Math.max(0,s),0,100);ghenAll(8);
 if(giuBlocked(S))pushFront(mkP("giu"),"Giữ hay không giữ");else night(S);
 if(roll(10+s*4))bestow(S,"night");log(`Thị tẩm. Sủng +${g} · Ân tình +${2+Math.max(0,s)}.`)}
PEND.night2=p=>{const s=p.s,v=liveRivals(false).slice().sort((a,b)=>a.rel-b.rel)[0],son=mySons()[0],o1=od(30+S.an/2+s*4),o2=od(30+S.an/2+s*3-(DG()?10:0)),o3=od(40+S.an/2+s*3);
 const txt=s>=6?"Ngài khẽ cười, kéo ngươi lại gần. Tấm rèm thêu uyên ương buông xuống; ngọn nến đỏ chập chờn rồi lụi, chỉ còn tiếng mưa xuân trên mái ngói.":s>=3?"Hương trầm vấn vít. Ngài nắm tay ngươi rất lâu, rồi màn the khép lại.":"Ngài có vẻ xa cách. Đêm trôi qua lặng lẽ sau tấm màn vàng.";
 const go=f=>()=>{nightFx(s);f()};
 const O=[{n:"Xin ân cho gia đình",fx:{},x:`${word(o1)} · thành: Danh +5, Bạc +40 · hỏng: Sủng -3`,go:go(()=>apply(roll(o1)?{danh:5,bac:40}:{sung:-3}))},
  {n:"Xin tha cho cung nữ bị phạt",fx:{},x:"Đức +3, Ân tình +1",go:go(()=>{apply({duc:3});S.an=cl(S.an+1,0,100)})}];
 if(v)O.push({n:`Thì thầm nói xấu ${v.name}`,fx:{},x:`${word(o2)} · thành: nàng Sủng -10${DG()?" · hỏng: ngài đa nghi, quay ra nghi ngươi":""}`,go:go(()=>{if(roll(o2)){v.sung=cl(v.sung-10,0,100);relAdd(S,v,-5)}else if(DG())apply({sung:-6,danh:-3});else apply({sung:-2})})});
 if(son)O.push({n:`Xin cho ${son.name}`,fx:{},x:`${word(o3)} · thành: ngài thương con +10`,go:go(()=>{if(roll(o3))son.fond=cl(son.fond+10,0,100);else S.an=cl(S.an-2,0,100)})});
 O.push({n:"Im lặng, tựa vai ngài",fx:{},x:"Ân tình +2",go:go(()=>{S.an=cl(S.an+2,0,100)})});
 return{cls:"night",who:pEmp(),t:`${p.ex?`<p class="past">${p.ex}</p>`:""}<p>${txt}</p><p class="past">Gối đầu, nửa đêm. Ngươi muốn nói gì?</p>`,o:O}};
PEND.giu=()=>{const o1=od(45+S.tamco/3),o2=od(30+S.an/2);return{who:pTH(),t:"<p>Sáng sớm, tổng quản Kính sự phòng quỳ ngoài điện hỏi theo lệ: “Giữ hay không giữ?”</p><p>Lời Thái hậu truyền xuống: phẩm vị thấp, không được giữ long thai.</p>",o:[
 {n:"Cúi đầu tuân lệnh",fx:{th:5},x:"không thể có thai lần này"},
 {n:"Đút bạc xin giữ",fx:{bac:-40},x:`${word(o1)} · hỏng: Thái hậu -10`,go:()=>{if(roll(o1))night(S);else apply({th:-10})}},
 {n:"Cầu xin Hoàng thượng",fx:{},x:`${word(o2)} · hỏng: Sủng -3`,go:()=>{if(roll(o2))night(S);else apply({sung:-3})}}]}};
/* a rival's night: same formula, no modal */
function rivalNight(v){v.nights++;v.nightLog.push(wk());const q=Math.round(effSac(v)/20+Math.max(...Object.values(v.arts))+R(4)-1);ap(v,{sung:2+Math.round(q/2),an:2+Math.max(0,q)});v.pg=cl(v.pg+6,0,100);v.tablet=0;
 let r=`Đêm qua thẻ bài của ${v.name} được lật. `;
 if(giuBlocked(v)){if(v.bac>=40&&roll(odA(v,45+v.tamco/3))){ap(v,{bac:-40});night(v)}}else night(v);
 if(v.rel<-20&&roll(20)){const o=odA(v,30+v.an/2);if(roll(o)){apply({sung:-4});if(S.mat>=2)r+=`Tai mắt nghe được: gối đầu, ${v.name} nói xấu ngươi. Sủng -4. `}else if(DG()){ap(v,{sung:-6});}}
 if(roll(3)){r+=sendMaid(v)}
 if(roll(8))bestow(v,"night");return r}
function sendMaid(a){const m=a.maid;const rise=roll(30);a.maid=a===S?newMaid(pick(MAIDS.filter(x=>x!==m.name)),45):{name:pick(MAIDS.filter(x=>x!==m.name)),loyal:45};if(a===S)S.tonight=null;
 if(rise&&roomFor("consort")){const n=newRival(0);Object.assign(n,drawFace());n.name=freshName();n.rel=0;relAdd(a,n,m.loyal>=60?30:-25);rivals.push(n);return `Cung nữ ${m.name} của ${NM(a)} hầu thay, được sủng hạnh, phong ${RANKS[0].n} ${n.name}${m.loyal>=60?" và vẫn nhớ ơn chủ cũ":" và trở mặt với chủ cũ"}. `}
 return `Cung nữ ${m.name} của ${NM(a)} hầu thay một đêm rồi được thả ra cung với chút bạc. `}
function anMonth(p){const recent=(p.nightLog||[]).filter(w=>wk()-w<=3).length;p.an=cl((p.an||0)-Math.max(1,4-recent*2),0,100)}

/* ================= THE MONTH FOR EVERY CONSORT ================= */
function pregMonthP(p){if(!p.preg)return"";p.preg++;const me=p===S;
 if(p.fake){const noRec=!(p.nightLog||[]).some(w=>(p.pregWk||0)-w>=0&&(p.pregWk||0)-w<=6);
  if(roll((p.doctor?1.5:3)+(noRec?4:0))){const why=noRec?"Sổ Kính sự phòng không ghi đêm thị tẩm nào trước khi có 'thai', giả mang thai bị lật tẩy, tội khi quân":"Giả mang thai bị thái y khác bắt mạch phát hiện, tội khi quân";if(me){deathSentence(why);return""}deathSentence(p,why);return `${p.name} giả mang thai bị lật tẩy. `}
  if(p.preg>=10){p.preg=0;p.fake=0;if(roll(odA(p,30+p.tamco/2+p.mat*4)))return (me?"Đêm “lâm bồn”, bà đỡ lén đưa vào một hài nhi từ ngoài cung. ":"")+birthP(p,true);if(me){deathSentence("Tráo con bị bắt quả tang, tội khi quân");return""}deathSentence(p,"Tráo con bị bắt quả tang, tội khi quân");return""}
  return""}
 let ev="";if(p.preg===4&&p.hidden){p.hidden=false;if(me)ghenAll(6);ev+=me?"Bụng đã lộ, cả cung biết ngươi có thai. ":`${p.name} có thai đã lộ. `}
 if(p.preg<10){let risk=(p.preg<=3||p.preg>=7?6:2)+(p.suc<30?8:0);if(p.anthai)risk/=2;
  if(roll(risk)){p.preg=0;p.hidden=false;ap(p,{suc:-20});ev+=me?`<span class="r">Ngươi động thai, sảy mất đứa bé.</span> Sức -20. `:`${p.name} động thai, sảy mất đứa bé. `}return ev}
 p.preg=0;p.hidden=false;return ev+birthP(p,false)}
/* childbirth risk: 1 base, +3 if Sức<40, +0.5 per year over 30; physician -2, Y thuật 2+ -1.5, an thai -1; floor 0.5 */
function birthRisk(p){return cl(1+(p.suc<40?3:0)+Math.max(0,(p.age||20)-30)*.5-(p.doctor?2:0)-(p.arts&&p.arts.y>=2?1.5:0)-(p.anthai?1:0),.5,60)}
function birthP(p,fake){const me=p===S;
 if(!fake&&roll(birthRisk(p))){if(me){die("Khó sinh, băng huyết mà chết");return""}p.alive=false;if(p.queen)p.queen=false;return `<span class="r">${p.name} khó sinh, băng huyết mà chết.</span> `}
 let ev="";
 if(!fake){let plot=p.catplot?byKey(p.catplot):null;p.catplot=null;
  if(!plot){const bad=others(p).filter(x=>x!==S&&rel(x,p)<-20&&(x.malice>50||(p===S&&x.ghen>=60)));if(bad.length&&roll(15))plot=pick(bad)}
  if(plot&&(plot===S||plot.alive)){if(roll(oSee(p,true))){evA(p,plot,2);relAdd(plot,p,-10);ev+=me?`Bà đỡ do ${plot.name} cài vào định tráo hài nhi bằng một con mèo lột da. Người của ngươi bắt quả tang: thêm 2 chứng cứ. `:`Bà đỡ do ${NM(plot)} cài vào cung ${p.name} bị bắt quả tang. `}
   else{ap(p,{danh:-10,sung:-10});punish(p,"bị đồn sinh ra yêu vật",2);return ev+(me?`<span class="r">Ngươi tỉnh lại thì bên cạnh là một con mèo chết lột da. Cả cung đồn ngươi sinh ra yêu vật.</span> Danh -10 · Sủng -10. Đứa trẻ không rõ tung tích. `:`<span class="r">${p.name} lâm bồn, bên cạnh chỉ có một con mèo chết lột da; cả cung đồn nàng sinh yêu vật.</span> `)}}}
 const n=!fake&&roll(4)?2:1;if(n===2)ev+=me?`<b class="g">Song thai!</b> `:`${p.name} sinh đôi. `;let up=false;
 for(let i=0;i<n;i++){const k=mkKid(R(2)?"m":"f",0);p.kids.push(k);
  if(k.sex==="m"){ev+=me?`<b class="g">Ngươi sinh hạ ${k.name}.</b> `:`${p.name} sinh hạ ${k.name}. `;if(me)ghenAll(15);if(!up&&rkOf(p)<6){if(me)S.rank++;else p.rank++;p.lastPromo=S.turn;up=true;ev+=`${me?"Được":p.name+" được"} tấn phong ${rkName(p)}. `}ap(p,{sung:10,danh:10,th:15});S.emp.mood=0;p.bonusPay=(p.bonusPay||0)+20;if(roll(50))bestow(p,"son")}
  else{ev+=me?`Ngươi sinh hạ ${k.name}. `:`${p.name} sinh hạ ${k.name}. `;if(me)ghenAll(8);ap(p,{sung:5,danh:4});p.bonusPay=(p.bonusPay||0)+10;if(roll(50))bestow(p,"dau")}}
 return ev}
/* months between decrees grow with rank: 3 up to Tần, then 5, 7, 9 */
function promoGap(r){return r<3?3:3+(r-2)*2}
function promoReqP(p){if(rkOf(p)>=7)return[];const r=rkOf(p),nx=RANKS[r+1],L=[];const me=p===S,qq=queenP();
 if(p.out)return[[false,"Đang ở lãnh cung"]];L.push([p.sung>=nx.s,`Sủng ${p.sung}/${nx.s}`],[p.danh>=nx.d,`Danh ${p.danh}/${nx.d}`],[S.turn-p.lastPromo>=promoGap(r),`Cách lần sắc phong trước ${S.turn-p.lastPromo}/${promoGap(r)} tháng`]);
 const qBlock=qq&&qq!==p;
 if(qBlock&&r+1>=2&&r+1<7)L.push([p.hh>-40||p.th>=50,`Hoàng hậu không chặn (Hoàng hậu ${p.hh}, cần trên -40; hoặc Thái hậu 50)`]);
 if(has("hieuthao"))L.push([p.th>=0,`Thái hậu gật đầu (${p.th}/0), vì Hoàng thượng hiếu thảo`]);
 if(r+1===7){const tn=has("hieuthao")?40:50,nd=S.heir&&S.heir.k.alive&&(S.heir.v===(me?null:p))?40:50;const sn=sonsOf(p).length>0;L.push([S.turn>=(p.seatBan||0),p.seatBan>S.turn?`Vừa tố Hoàng hậu, bị nghi tranh ngôi (còn ${p.seatBan-S.turn} tháng)`:"Không bị nghi tranh ngôi"],[!qq,"Ngôi Hoàng hậu bỏ trống"],[sn?p.th>=tn:p.th>=tn+30,sn?`Có hoàng tử và Thái hậu ủng hộ (${p.th}/${tn})`:`Chưa có hoàng tử: cần Thái hậu hết lòng (${p.th}/${tn+30})`],[p.duc>=nd,`Đức ${p.duc}/${nd}${nd<40?" (mẹ Thái tử)":""}`])}
 else if(r+1>=5)L.push([p.hh>-30||p.th>=30||!qBlock||(facOf(p)&&facStr(facOf(p))>=180),"Hoàng hậu không phản đối, hoặc Thái hậu 30, hoặc phe mạnh (thế lực 180)"]);
 if(p.confined)L.push([false,`Đang cấm túc (${p.confined} tháng)`]);return L}
function promoReq(){return promoReqP(S)}
/* the vacant seat is contested: every eligible consort (Quý phi and above) weighs in by favour, Thái hậu, sons and name */
/* the seat weighs sons, the clan behind her, Thái hậu, name, rank (same for everyone) */
function seatW(p){const dad=p.dad||40;return 30+Math.min(3,sonsOf(p).length)*15+Math.max(0,p.th||0)/5+(p.danh||0)/6+dad/2+(rkOf(p)>=6?10:0)}
function seatRivals(p){const L=liveRivals(false).filter(v=>v!==p&&v.rank>=5&&!v.confined&&!v.out);if(p!==S&&S.rank>=5&&!S.confined&&!S.out&&promoReqP(S).every(x=>x[0]||/Cách lần/.test(x[1])))L.push(S);return L}
function promoteP(p){if(rkOf(p)>=7||!promoReqP(p).every(x=>x[0]))return"";const me=p===S;p.lastPromo=S.turn;
 if(rkOf(p)===6)return"";
 if(false){const R2=seatRivals(p);if(R2.length){const tot=R2.reduce((s,v)=>s+seatW(v),seatW(p));if(!roll(100*seatW(p)/tot)){const w=R2.sort((a,b)=>seatW(b)-seatW(a))[0];if(S.rank>=7)return"";if(w===S){S.rank=7;S.justCrowned=1;S.lastPromo=S.turn;ghenAll(10);if(qOn())rivals[0].queen=false;return `<b class="g">Thánh chỉ: lập ${S.name} làm Hoàng hậu, chủ trì lục cung.</b> `}w.rank=6;w.queen=true;rivals.splice(rivals.indexOf(w),1);rivals.unshift(w);return `<b>Thánh chỉ: lập ${w.name} làm Hoàng hậu</b>${me?"; ngươi lỡ ngôi trung cung":""}. `}}}
 if(me){S.rank++;ghenAll(10);fx("gold");if(roll(35))bestow(S,"promo");if(S.rank===7){if(qOn())rivals[0].queen=false;return `<b class="g">Thánh chỉ: lập ${S.name} làm Hoàng hậu, chủ trì lục cung.</b> `}return `<b class="g">Thánh chỉ: tấn phong ${S.name} làm ${RANKS[S.rank].n}.</b> `}
 if(p.rank+1>=7){if(S.rank>=7)return"";p.rank=6;p.queen=true;const i=rivals.indexOf(p);rivals.splice(i,1);rivals.unshift(p);return `<b>Thánh chỉ: lập ${p.name} làm Hoàng hậu.</b> `}
 p.rank++;if(roll(35))bestow(p,"promo");return `${p.name} được tấn phong ${RANKS[p.rank].n}. `}
function promote(){return promoteP(S)}
function birth(fake){return birthP(S,fake)}
function pregMonth(){return pregMonthP(S)}
function maidMonthP(p){if(!p.maid)p.maid=p===S?newMaid(pick(MAIDS),45):{name:pick(MAIDS),loyal:50};const m=p.maid;m.loyal=cl(m.loyal-1,0,100);if(m.loyal>=45||!roll(15))return"";const pool=others(p);if(!pool.length)return"";
 const a=pool.slice().sort((x,y)=>rel(x,p)-rel(y,p))[0];const me=p===S;let ev;
 if(p.schemes>0){ap(p,{danh:-10});evA(a,p,2);relAdd(a,p,-10);ev=me?`<span class="r">${m.name} bị ${a.name} mua chuộc, đem chuyện ngươi bày mưu hại người kể ra ngoài.</span> Danh -10. `:`Cung nữ của ${p.name} bị ${NM(a)} mua chuộc, khai ra mưu kế của chủ. `;punish(p,"bị cung nữ tố giác mưu kế",2)}
 else{const g=Math.min(30,p.bac);ap(p,{bac:-g});ap(a,{bac:g});ev=me?`<span class="r">${m.name} bị ${a.name} mua chuộc, lấy trộm hộp trang sức của ngươi rồi bỏ trốn.</span> Bạc -30. `:`Cung nữ của ${p.name} bị ${NM(a)} mua chuộc, trộm bạc bỏ trốn. `}
 if(me){S.maid=newMaid(pick(MAIDS.filter(x=>x!==m.name)),40);return ev+`Nội vụ phủ đưa cung nữ ${S.maid.name} đến hầu thay (lòng 40). `}
 p.maid={name:pick(MAIDS),loyal:40};return S.mat>=3?ev:""}
function maidMonth(){return maidMonthP(S)}
function kidsMonth(){let ev="";const moms=[[S,S.kids]].concat(rivals.map(v=>[v,v.kids]));
 for(const [p,ks] of moms)for(const k of ks)if(k.alive){k.hp=Math.min(100,k.hp+4);
  if(roll((k.age<3?3:1.5)*(1+(S.storms||0)*.5))){let d=30+R(40);const doc=p===S?S.doctor:(p.alive&&!p.out&&p.doctor);if(doc)d=Math.round(d/2);k.hp-=d;const sk=pick(["lên đậu mùa","sốt cao co giật","mắc kiết lỵ","nhiễm phong hàn nặng"]);
   if(p===S)ev+=k.hp<=0?kidDie(k,`${sk} rồi không qua khỏi`,true):`<span class="r">${k.name} ${sk}.</span> Sức khỏe còn ${k.hp}. `;else if(k.hp<=0)ev+=kidDie(k,`${sk} rồi không qua khỏi`,false)}}
 return ev}
/* rival AI: the same acts as the player, picked by want */
function pickTarget(v){const L=others(v);if(!L.length)return null;const w=L.map(t=>1+hostility(v,t));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}return L[i]}
function npcAct(v,t){const O=[];const add=(k,w)=>{const a=ACT[k];if(a&&a.ok(v,t)&&w>0)O.push([k,w])};const hi=(t===S?v.ghen:hostility(v,t))>=60;
 if(rel(v,t)<0)add("accuse",6);add("vp",rel(v,t)<0?3:0);add("musk",hi?6:3);add("catswap",hi?3:1);
 for(const k of ["kpoison","pond","kframe","ksab"])add(k,hi?2:1);add("takeaway",2);
 if(ACT.pushp)add("pushp",1);if(ACT.trip)add("trip",2);add("frame",1);add("poison",1);add("rumor",2);add("spy",2);add("bribe",1);add("block",t.nightLog&&t.nightLog.length?1:0);
 if(v.inv.some(e=>e.t||IT[e.k].il))add("plant",3);
 if(!O.length)return"";const w=O.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const k=O[i][0];
 if(k==="plant")return runAct(v,t,"plant",v.inv.findIndex(e=>e.t||IT[e.k].il));return runAct(v,t,k)}
function seenNPC(v,t,txt){if(!txt)return"";if(t===S||v===S)return txt;if(roll(15+S.mat*6)){evA(S,v,1);return `Tai mắt thấy: ${txt}(Chứng cứ ${v.name} +1.) `}return""}
function npcMonthly(v){let ev="";const cost=k=>5+v.arts[k]*5;
 if(roll(30)){const k=pick(Object.keys(v.arts));if(v.arts[k]<5&&(v.bac>=cost(k)||v.suc>=40)){if(v.bac>=cost(k)){ap(v,{bac:-cost(k),suc:-10});v.artp[k]+=1+R(3)}else{ap(v,{suc:-15});v.artp[k]+=1};while(v.arts[k]<5&&v.artp[k]>=v.arts[k]+2){v.artp[k]-=v.arts[k]+2;v.arts[k]++}}}
 if(roll(25)&&S.shop.length){const k=pick(S.shop);if(IT[k]&&v.bac>=IT[k].pr+20&&(!IT[k].il||v.malice>60))buy(v,k)}
 if(v.malice>60&&roll(8)&&v.bac>=45&&!v.inv.some(e=>e.t)){buy(v,"tuithom");taintItem(v,v.inv.length-1,v.inv.some(e=>e.k==="xahuong")?"xa":"bua")}
 npcCourt(v);if(roll(15)){const i=v.inv.findIndex(e=>IT[e.k].gv&&!e.t);if(i>=0)giveTo(v,roll(50)?"emp":"th",i)}
 if(roll(30)&&roll(odA(v,55+v.sung/5+mm())))ap(v,{sung:3});
 if(!S.thDead&&roll(25)&&roll(odA(v,75)))ap(v,{th:4,danh:1});
 if(qOn()&&!v.queen&&roll(20)&&roll(odA(v,70)))ap(v,{hh:4,danh:1});
 if(roll(10)){const fr=others(v).filter(t=>rel(v,t)>10&&(t===S||t.alive));if(fr.length&&v.bac>=30){const t=pick(fr);const s=ACT.ally.f(v,t);if(t===S)ev+=s}}
 if(roll(10)&&v.inv.some(e=>!e.h&&IT[e.k].tg.includes("rv"))){const t=pick(others(v));const i=v.inv.findIndex(e=>!e.h&&IT[e.k].tg.includes("rv"));if(rel(v,t)>0||t===S&&v.rel>5)ev+=seenNPC(v,t,giveTo(v,t,i))}
 v.inv.forEach((e,i)=>{const it=IT[e.k];if(it.sl&&!e.w&&!e.h&&(it.rk<=rkOf(v)||v.trait==="Kiêu ngạo"))wear(v,i)});
 const ui=v.inv.findIndex(e=>!e.h&&IT[e.k].use&&!e.t&&(v.suc<60||(IT[e.k].ant&&v.preg)));if(ui>=0)useItem(v,ui);
 const ci=v.inv.findIndex(e=>!e.h&&IT[e.k].dr&&IT[e.k].rk<=rkOf(v));if(ci>=0&&!(v.dress&&v.dress.until>S.turn))useItem(v,ci);
 if(roll(20))inspect(v);if(!v.fakeIll&&!illOf(v)&&v.tamco>=45&&roll(3)){v.fakeIll=2;ap(v,{sung:3})}
 if(!v.preg&&!sonsOf(v).length&&v.tamco>=50&&roll(2)){v.preg=1;v.fake=1;v.pregWk=wk();ap(v,{sung:6,th:5})}
 if(v.preg&&v.hidden&&v.preg>=2&&v.tamco<55&&roll(50)){v.hidden=false;ap(v,{sung:6,th:5})}
 return ev}
function rivalsTurn(){const live=liveRivals(true);let ev="";
 for(const v of live){if(!v.alive||v.out)continue;v.sung=cl(v.sung+R(3)-1,0,100);if(v.block)v.block--;
  if(S.sung>v.sung-10&&!v.queen&&roll(33))v.rel-=1;if(v.queen&&S.rank>=4&&roll(50))v.rel-=1;
  if(S.sac>75)v.ghen=cl(v.ghen+1,0,100);v.ghen=cl(v.ghen-(v.rel>20?3:1),0,100);v.pg=Math.max(0,v.pg-1);
  if(v.queen){const g=others(v).find(p=>evG(v,p)>=2&&rel(v,p)<0);if(g&&roll(35)){ev+=seenNPC(v,g,judge(v,g));if(S.dead)return ev;continue}}
  const t=pickTarget(v);if(!t)continue;
  let want=((v.malice/100)*(rel(v,t)<0?1:.25)+hostility(v,t)/200)*(rkOf(t)>=rkOf(v)-1||(t===S&&v.ghen>=60)?1:.4);if(t.shield)want*=.5;
  if(Math.random()<want*.04){ev+=seenNPC(v,t,npcAct(v,t));if(S.dead)return ev}}
 if(S.block)S.block--;
 const q=rivals[0];if(qOn()&&R(480)===0){q.alive=false;q.queen=false;ev+=`Hoàng hậu ${q.name} băng hà vì bệnh. Ngôi trung cung bỏ trống. `}
if(queenP())S.vacSince=null;
 /* a vacant seat is filled by the Emperor's choice after 3 months of mourning: each week (1 in 8) he weighs every eligible consort, her included (Hoàng quý phi meeting the conditions), by favour, Thái hậu, sons and name */
 if(!queenP()&&S.vacSince==null)S.vacSince=S.turn;
 if(!window.__noOldSeat&&!queenP()&&S.turn-S.vacSince>=3&&roll(12)){const C=liveRivals(false).filter(v=>v.rank>=5&&!v.confined&&!v.out&&S.turn>=(v.seatBan||0));if(S.rank===6&&!S.out&&promoReqP(S).every(x=>x[0]||/Cách lần|bỏ trống/.test(x[1])))C.push(S);
  /* if the seat stays empty 18 months, the Emperor may raise a daughter of a great house from outside (weight 100) */
  if(S.vacSince==null)S.vacSince=S.turn;const OUT={outsider:1};if(roomFor("consort")&&S.turn-S.vacSince>=18)C.push(OUT);const wt=p=>p===OUT?100:seatW(p);
  if(C.length){const tot=C.reduce((s,p)=>s+wt(p),0);let r=Math.random()*tot,w=C[0];for(const p of C){r-=wt(p);if(r<=0){w=p;break}}
   if(w===OUT){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);ev+=`<b>Thánh chỉ: rước ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b>${C.includes(S)?" Ngươi lỡ ngôi trung cung.":""} `}else
   if(w===S){S.rank=7;S.justCrowned=1;S.lastPromo=S.turn;ghenAll(10);ev+=`<b class="g">Thánh chỉ: lập ${S.name} làm Hoàng hậu, chủ trì lục cung.</b> `}else{w.rank=6;w.queen=true;rivals.splice(rivals.indexOf(w),1);rivals.unshift(w);ev+=`<b>Thánh chỉ: lập ${w.name} làm Hoàng hậu, chủ trì lục cung.</b>${C.includes(S)?" Ngươi lỡ ngôi trung cung.":""} `}}}
 if(liveRivals(true).length<4&&R(12)===0&&roomFor("consort")){const n=newRival(R(3));Object.assign(n,drawFace());rivals.push(n);ev+=`Đợt tuyển tú mới: ${n.name} vào cung, phong ${RANKS[n.rank].n}. `}
 return ev}
function rivalsMonth(){let ev="";
 for(const v of liveRivals(true)){if((S.storms||0)&&roll(4*S.storms)){ap(v,{suc:-15});}if(v.confined)v.confined--;if(v.shield)v.shield--;if(v.pray)v.pray--;if(v.fert)v.fert--;v.anthai=0;
  itemMonth(v);ev+=seenNPC(v,v,"")||"";const pm=pregMonthP(v);if(pm)ev+=pm;if(!v.alive||v.out)continue;anMonth(v);ev+=npcMonthly(v);ev+=maidMonthP(v);
  if(v.duc>=60)v.th=cl(v.th+1,-100,100);else if(v.duc<20)v.th=cl(v.th-1,-100,100);ev+=promoteP(v)}
 /* Thái hậu and the Empress reward or punish, by the same rule for every consort */
 const qq=queenP();
 for(const p of consorts()){if(p!==S&&(!p.alive||p.out))continue;
  if(!S.thDead&&p.th>=60&&roll(8)){const k=pick(["nhansam","yensao","vongngoc","huongtram"]);p.inv.push({k,from:"th"});if(p===S)Q.push({t:"Thái hậu ban thưởng",who:pTH(),h:`<p>Đức Thọ cung sai người mang đến <b>${IT[k].n}</b>.</p><p class="past">${IT[k].d}</p>`});else log(`Thái hậu ban ${IT[k].n} cho ${p.name}.`)}
  if(qq&&qq!==S&&qq!==p&&p.hh<=-40&&roll(10)){const i=p.inv.findIndex(e=>IT[e.k].kd==="Trang sức"&&!e.h);if(i>=0){const n=iname(p.inv[i]);p.inv.splice(i,1);ev+=p===S?`<span class="r">Hoàng hậu sai người tịch thu ${n} của ngươi, trách ngươi xa xỉ.</span> `:"";if(p!==S)log(`Hoàng hậu tịch thu ${n} của ${p.name}.`)}}
  if(qq&&qq!==S&&qq!==p&&p.hh>=50&&roll(6)){const k=pick(["tramngoc","luahang","tuithom"]);p.inv.push({k,from:"hh"});if(p===S)ev+=`Hoàng hậu ban cho ngươi ${IT[k].n}. `}
  if(roll(4)){const s=search(p);if(s)ev+=p===S||S.mat>=2?s:""}}
 return ev}
function festival(title,k,lbl){const C=consorts();if(C.length<2)return"";const art=p=>k==="sac"?artW2(p,"vu")*6:(artW2(p,"cam")+artW2(p,"thi"))*3;
 const sc=C.map(p=>(k==="sac"?effSac(p):p[k])+art(p)+R(wet()?40:30)+(wet()&&k==="sac"?-artW2(p,"vu")*3:0));const wi=sc.indexOf(Math.max(...sc)),w=C[wi];
 ap(w,{sung:8,danh:3});if(roll(50))bestow(w,"contest");
 if(w===S){ghenAll(8);return `<span class="g">${title}: ${lbl} của ngươi át cả hậu cung, Hoàng thượng ban thưởng.</span> Sủng +8 · Danh +3. `}
 apply({danh:-2});return `<span class="r">${title}: ${w.name} chiếm hết phong quang, ngươi lu mờ.</span> Danh -2. `}
function artW2(p,k){const l=p.arts[k];return l*(((["cam","ky","thi","hoa"].includes(k)&&has("trongtai"))||(k==="vu"&&has("mesac")))?2:1)}

/* ================= PLAYER-SIDE UI for acts and items ================= */
function wk2(){return 0}
function doAct(i,k){const v=rivals[i],a=ACT[k];if(!v||!a||!can(2)||S.dead||Q.length||!v.alive||v.out||!a.ok(S,v))return;
 if(k==="plant"||k==="gift"){pushDil(mkP(k==="plant"?"plantpick":"giftpick",{v:v.id}),k==="plant"?"Cài đồ vào rương":"Tặng quà");render();return}
 spend(2);const r=runAct(S,v,k);if(r)log(r);render()}
function empAct(i,k){const v=rivals[i];if(!v||S.rank<7||!can(2)||S.dead||Q.length)return;let r="";if(k==="cutpay"){spend(2);v.cutPay=1;v.cutBy="Hoàng hậu";relAdd(S,v,-15);log(`Ngươi sai Nội vụ phủ khất bổng lộc của ${v.name} tháng tới.`);render();return}
 if(k==="judge"){if(evG(S,v)<2)return;r=judge(S,v)}
 else if(k==="conf"){const j=v.inv.findIndex(e=>IT[e.k].kd==="Trang sức"&&!e.h);if(j<0)return;if(evG(S,v)<1&&!vpItems(v).length){apply({danh:-3,th:-5});log(`Tịch thu vô cớ: Danh -3, Thái hậu -5.`)}const n=iname(v.inv[j]);v.inv.splice(j,1);relAdd(S,v,-20);v.hh-=15;r=`Ngươi tịch thu ${n} của ${v.name}.`}
 else if(k==="reward"){if(S.bac<30)return;apply({bac:-30});relAdd(S,v,20);v.hh+=10;ap(v,{danh:3});r=`Ngươi ban thưởng cho ${v.name}.`}
 else if(k==="pardon"){if(!v.confined&&!v.out)return;if(v.out){v.out=false;v.rank=0}v.confined=0;relAdd(S,v,30);apply({duc:2});r=`Ngươi ân xá cho ${v.name}.`}
 else return;spend(2);log(r);render()}
function giftTargets(){const L=[["emp","Hoàng thượng"]];if(!S.thDead)L.push(["th","Thái hậu"]);liveRivals(true).forEach(v=>L.push([v.id,(v.queen?"Hoàng hậu ":"")+v.name]));return L}
PEND.giftpick=p=>{const e=S.inv[p.ix!=null?p.ix:-1];const L=p.v!=null?[[p.v,(RV(p.v)||{}).name]]:giftTargets();
 if(p.v!=null){const items=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);return{t:"<p>Chọn món đồ để tặng.</p>",o:items.slice(0,8).map(([e,i])=>({n:iname(e)+(e.t?" (đã tẩm)":""),fx:{},x:IT[e.k].d,go:()=>{spend(2);log(giveTo(S,RV(p.v),i))}})).concat([{n:"Thôi",fx:{}}])}}
 if(!e)return null;return{t:`<p>Tặng <b>${iname(e)}</b> cho ai?</p>`,o:L.map(([id,n])=>({n,fx:{},x:id==="emp"||id==="th"?(e.t?"không thể dâng đồ đã tẩm":giftVal(Object.assign({k:e.k},IT[e.k]),id)>=8?"rất hợp ý":""):"",go:()=>{if((id==="emp"||id==="th")&&e.t)return;spend(2);log(giveTo(S,id==="emp"||id==="th"?id:RV(id),p.ix))}})).concat([{n:"Thôi",fx:{}}])}};
PEND.plantpick=p=>{const v=RV(p.v);if(!v)return null;const items=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);
 return{who:pv(v),t:`<p>Sai người lẻn vào cung ${v.name}, cài món gì vào rương nàng?</p><p class="past">${word(oPlant(S,v))} · hỏng: bị bắt, nàng nắm 2 chứng cứ</p>`,o:items.slice(0,8).map(([e,i])=>({n:iname(e)+(e.t?" ("+TAINT[e.t].n+")":""),fx:{},x:IT[e.k].il||(e.t&&TAINT[e.t].il)?"khám ra là có tội":IT[e.k].rk>rkOf(v)?"vượt phẩm của nàng":"",go:()=>{spend(2);if(p.here){ACTX={a:S,pen:-15};try{log(plantItem(S,v,i)+" (tại cung nàng)")}finally{ACTX={a:null,pen:0}}}else log(runAct(S,v,"plant",i))}})).concat([{n:"Thôi",fx:{}}])}};
PEND.taintpick=p=>{const e=S.inv[p.ix];if(!e)return null;const L=Object.entries(TAINT).filter(([k,T])=>T.on.includes(e.k)&&(!T.need||S.inv.some(x=>x.k===T.need&&!x.h)));
 return{t:`<p>Lén làm gì với <b>${iname(e)}</b>?</p>`,o:L.map(([k,T])=>({n:T.n[0].toUpperCase()+T.n.slice(1),fx:T.c?{bac:-T.c,duc:-3}:{duc:-3},x:T.hurt+(T.need?" · tốn "+IT[T.need].n:""),go:()=>log(taintItem(S,p.ix,k))})).concat([{n:"Thôi",fx:{}}])}};
PEND.evpick=p=>({t:"<p>Tập chứng cứ này nói về ai?</p>",o:liveRivals(true).map(v=>({n:v.name,fx:{},go:()=>log(useItem(S,p.ix,v))})).concat([{n:"Thôi",fx:{}}])});
PEND.itarget=p=>({t:`<p>Dùng ${IT[p.k].n} với ai?</p>`,o:liveRivals(true).map(v=>({n:v.name,fx:{},go:()=>{spend(2);log(useItem(S,p.ix,v))}})).concat([{n:"Thôi",fx:{}}])});
PEND.shop=()=>({who:pEunCourt("ped"),t:"<p>Thái giám bán hàng rong ở cửa cung mở gánh: “Nương nương xem, toàn đồ tốt.”</p>",o:S.shop.map(k=>({n:iic(k,20)+IT[k].n,fx:{bac:-IT[k].pr},x:`${IT[k].kd} · ${IT[k].d}`,go:()=>{S.inv.push({k});log(`Mua ${IT[k].n}.`)}})).concat([{n:"Thôi",fx:{}}])});
PEND.giftin=p=>{const f=byKey(p.f),e=p.e;if(!f)return null;const it=IT[e.k],hi=rkOf(f)>S.rank;
 return{who:pv(f),t:`<p>${f.name} sai người mang <b>${it.n}</b> sang tặng ngươi.</p><p class="past">${it.d}</p>`,o:[
 {n:"Nhận",fx:{},x:"cất vào rương",go:()=>S.inv.push(Object.assign({},e))},
 {n:"Trả lại quà",fx:{},x:hi?"nàng phẩm cao hơn, sẽ phật ý":"nàng hơi phật ý",go:()=>{relAdd(S,f,hi?-12:-4);if(f.queen)apply({hh:-8})}},
 {n:"Đem đến Thái y viện xét nghiệm",fx:{bac:-10},x:`${word(cl(oSee(S,true)+25,5,95))} · thành: nếu đồ bị tẩm sẽ biết, ai gửi · hỏng: không thấy gì`,go:()=>{if(e.t&&roll(cl(oSee(S,true)+25,5,95))){evA(S,f,2);log(`Thái y phát hiện ${it.n} của ${f.name} ${TAINT[e.t].n}. Chứng cứ ${f.name} +2.`)}else{S.inv.push(Object.assign({},e));relAdd(S,f,-3);log(`Thái y không thấy gì lạ ở ${it.n}.`)}}}]}};
function itemAct(a,ix){const e=S.inv[ix];if(!e||S.dead||Q.length)return;const it=IT[e.k];
 if(a==="use"){if(it.evi){pushDil(mkP("evpick",{ix}),"Tập chứng cứ");render();return}if(e.k==="botngua"){if(!can(2))return;pushDil(mkP("itarget",{ix,k:e.k}),it.n);render();return}const r=useItem(S,ix);if(r)log(r)}
 else if(a==="wear")wear(S,ix);
 else if(a==="gift"){if(!can(2))return;pushDil(mkP("giftpick",{ix}),"Tặng quà")}
 else if(a==="sell"){const r=sellItem(S,ix);if(r)log(r)}
 else if(a==="taint")pushDil(mkP("taintpick",{ix}),"Tẩm đồ");
 else if(a==="test"){if(S.bac<10)return;apply({bac:-10});if(e.t&&e.by!=="me"&&roll(cl(oSee(S,true)+25,5,95))){S.inv.splice(ix,1);const by=byKey(e.by);if(by)evA(S,by,2);log(`Thái y phát hiện ${it.n} ${TAINT[e.t].n}${by?`; dấu vết dẫn về ${NM(by)} (chứng cứ +2)`:""}.`)}else log(`Thái y xét ${it.n}: không thấy gì lạ.`)}
 render()}
function invAct(a){if(S.dead||Q.length)return;
 if(a==="shop"){pushDil(mkP("shop"),"Gánh hàng rong");render();return}
 if(a==="inspect"){if(!can(2))return;spend(2);const f=inspect(S);log(f.length?`Kiểm tra rương đồ, tìm thấy: ${f.join("; ")}.`:"Kiểm tra rương đồ: không thấy gì lạ.");if(f.length)Q.push({t:"Kiểm tra đồ",h:`<p>${f.join("<br>")}</p>`});render()}}
function invHTML(){const wb=wearBonus(S),vp=vpItems(S);const vis=S.inv.map((e,i)=>[e,i]).filter(([e])=>!e.h);
 const groups=[];for(const [e,i] of vis){const g=groups.find(x=>x.k===e.k&&!!x.t===!!(e.by==="me"&&e.t)&&!x.w&&!e.w);if(g)g.n++;else groups.push({k:e.k,t:e.by==="me"?e.t:null,w:e.w,i,n:1,ext:e.t&&e.by!=="me",from:e.from})}
 const dress=S.dress&&S.dress.until>S.turn?`${IT[S.dress.k].n} (đến tháng ${S.dress.until-S.turn} nữa)`:"không";
 let h=`<div class="ph"><span>Đang đeo: Sắc +${wb.sac}${wb.danh?`, Danh +${wb.danh}`:""} · áo mới: ${dress}${vp.length?` · <span class="r">vượt phẩm!</span>`:""}</span><span>Bạc ${S.bac}</span></div>
 <div class="rbtn" style="margin-bottom:6px"><button data-inv="shop">Gánh hàng rong<small>Chắc chắn · thành: xem hàng, mua đồ ở cửa cung</small></button><button data-inv="inspect" ${!can(2)?"disabled":""}>Kiểm tra đồ<small>${word(oSee(S,true))} · tốn: 2 khắc · thành: tìm ra đồ bị tẩm, cài · hỏng: không thấy gì</small></button></div>`;
 if(!groups.length)return h+`<p class="past">Rương trống. Mua ở gánh hàng rong, hoặc chờ được ban thưởng.</p>`;
 h+=`<div class="cards">`+groups.map(g=>{const it=IT[g.k],i=g.i;const B=[];
  if(it.sl)B.push(`<button data-it="wear" data-ix="${i}">${g.w?"Tháo":"Đeo"}<small>${it.rk>S.rank?"vượt phẩm":"hợp phẩm"}</small></button>`);
  if(it.dr)B.push(`<button data-it="use" data-ix="${i}">May áo<small>${it.rk>S.rank?"vượt phẩm":"3 tháng"}</small></button>`);
  if(it.use||it.evi||g.k==="botngua")B.push(`<button data-it="use" data-ix="${i}">Dùng<small>${g.k==="botngua"?"tốn 2 khắc":fmt(it.use)||"chọn người"}</small></button>`);
  if(g.k!=="ngocboi"||g.t)B.push(`<button data-it="gift" data-ix="${i}" ${!can(2)?"disabled":""}>Tặng<small>tốn 2 khắc</small></button>`);
  if(it.pr)B.push(`<button data-it="sell" data-ix="${i}">Bán<small>Bạc +${Math.floor(it.pr/2)}</small></button>`);
  if(Object.values(TAINT).some(T=>T.on.includes(g.k))&&!g.t)B.push(`<button data-it="taint" data-ix="${i}">Tẩm<small>mưu kế</small></button>`);
  if(g.from&&g.from!=="me"&&g.from!=="emp"&&g.from!=="th")B.push(`<button data-it="test" data-ix="${i}" ${S.bac<10?"disabled":""}>Xét nghiệm<small>Bạc -10</small></button>`);
  return `<div class="card"><h4>${iic(g.k)}${it.n}${g.n>1?` ×${g.n}`:""}${g.w?" · đang đeo":""}</h4><p>${it.kd} · ${it.d}${g.t?` · <span class="r">đã ${TAINT[g.t].n}</span>`:""}${it.rk?` · bậc ${RANKS[Math.min(7,it.rk)].n}`:""}</p><div class="rbtn">${B.join("")}</div></div>`}).join("")+`</div>`;return h}
/* the tablet: every consort weighted by the same night formula; others may steal it by the same act */
function flip(){S.tonight=null;if(S.dead)return;if(!roll(has("chamchinh")?65:90))return;
 const C=consorts().filter(p=>nightCh(p)>0);if(!C.length)return;const w=C.map(p=>nightCh(p));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}let t=C[i];
 if(t===S)S.tonight="me";else S.tonight=t;
 for(const v of liveRivals(true)){if(v===t)continue;if(hostility(v,t)>=50&&roll(6)){const s=stealNight(v,t,roll(50)?"feign":"road");if(S.tonight===v){if(t===S)Q.push({t:"Kính sự phòng",h:`<p>Thẻ bài của ngươi đã được lật, nhưng ${s}</p>`});else if(S.mat>=2)log(s);t=v;break}}}
 if(t===S)pushDil(mkP("ksp"),"Kính sự phòng báo tin")}
function resolveTonight(){const t=S.tonight;S.tonight=null;if(!t||t==="me"||!t.alive||t.out)return"";return rivalNight(t)}
/* ================= RELATION WEB, PALACE MAP, PRESENCE, TALK ================= */
/* two bars between every pair: Thiện cảm (aff, -100..100, directional) and Oán (0..100, directional) */
function aff(x,y){if(x===y)return 0;if(x===S)return S.rl[y.id]||0;if(y===S)return x.rel;return x.rl[y.id]||0}
function affAdd(x,y,n){if(x===S){S.rl[y.id]=cl((S.rl[y.id]||0)+n,-100,100);return}if(y===S){x.rel=cl(x.rel+n,-100,100);return}x.rl[y.id]=cl((x.rl[y.id]||0)+n,-100,100)}
function oan(x,y){if(!x||!y||x===y)return 0;if(x===S)return S.ro[y.id]||0;if(y===S)return x.oan||0;return x.ro[y.id]||0}
function oanAdd(x,y,n){if(!x||!y||x===y)return;const c=v=>cl(Math.round(v),0,100);if(x===S){S.ro[y.id]=c((S.ro[y.id]||0)+n);return}if(y===S){x.oan=c((x.oan||0)+n);return}x.ro[y.id]=c((x.ro[y.id]||0)+n)}
function rel(x,y){return aff(x,y)}
/* a deed between a and t: both affections move; a harm leaves the victim with Oán (and a little on the doer) */
function relAdd(x,y,n){if(!x||!y||x===y)return;affAdd(x,y,n);affAdd(y,x,n);if(n<0){oanAdd(y,x,-n*.6);oanAdd(x,y,-n*.2)}else{oanAdd(y,x,-n*.3)}}
function hostility(v,t){return oan(v,t)+Math.max(0,-aff(v,t))/2+(t===S?v.ghen/2:Math.max(0,(t.sung-v.sung)/3))+(rkOf(t)>=rkOf(v)?8:0)}
function oanMonth(){for(const v of rivals){v.oan=Math.max(0,(v.oan||0)-2);for(const k in v.ro)v.ro[k]=Math.max(0,v.ro[k]-2)}for(const k in S.ro)S.ro[k]=Math.max(0,S.ro[k]-2)}

/* houses: Phi and above head a palace; lower consorts live under a head. Same house: cannot harm or win over each other */
function houseOf(p){return rkOf(p)>=4?key(p):(p.resHead!=null&&byKey(p.resHead)&&(byKey(p.resHead)===S?S.rank>=4:byKey(p.resHead).alive&&!byKey(p.resHead).out&&rkOf(byKey(p.resHead))>=4)?p.resHead:key(p))}
function sameHouse(a,b){return a!==b&&houseOf(a)===houseOf(b)}
function assignHouses(){const heads=consorts().filter(p=>rkOf(p)>=4);for(const p of consorts()){if(rkOf(p)>=4){p.resHead=null;continue}if(houseOf(p)!==key(p))continue;p.resHead=heads.length&&roll(70)?key(pick(heads.filter(h=>h!==p))||p):null}}
function houseName(p){const h=byKey(houseOf(p));return h===S?"tẩm cung của ngươi":h===p?"cung riêng":"cung "+h.name}

/* where everyone is this tuần: by role, trait, season and time of month */
function palaceOf(p){if(p===S)return"home";if(p.queen)return"kn";const h=byKey(houseOf(p));return h===S?"home":"r"+h.id}
function placeWhere(){const W={},sea=SEASON[S.month-1],spring=sea==="Xuân"||sea==="Thu";
 const b=S.buoi||0;const e=b===2?pick(["dtd","dtd","dtd",has("datinh")?"vuon":"dtd"]):has("chamchinh")?pick(["thu","thu","thu",spring?"vuon":"thu"]):b===0?pick(["thu","thu","dtd"]):pick([spring?"vuon":"dtd","thu","vuon"]);W.emp=wet()&&e==="vuon"?"thu":e;W.th=S.thDead?null:"tn";
 for(const v of rivals){if(!v.alive){continue}if(v.out){W[v.id]="lc";continue}if(v.confined){W[v.id]=palaceOf(v);continue}
  const L=[[palaceOf(v),b===2?80:35],["vuon",(b===1?(spring?40:20):b===0?8:3)*(wet()?.25:1)],["tn",S.thDead?0:10],["tyv",v.preg||v.suc<50?15:3]];
  if(qOn()&&!v.queen)L.push(["kn",b===0?55:5]);if(v.queen)L[0][1]+=30;
  const w=L.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}W[v.id]=L[i][0]}
 S.where=W;npcEncounters()}
function whereOf(p){if(p===S)return S.place||"home";return (S.where||{})[p.id]||palaceOf(p)}
function together(a,b){return whereOf(a)===whereOf(b)}
function placeName(k){return placeOf(k).n}
function countAt(k){const W=S.where||{};let n=0;for(const v of rivals)if(v.alive&&!v.out&&W[v.id]===k)n++;if(W.emp===k&&["vuon","thu","dtd"].includes(k))n++;if(k==="tn"&&!S.thDead)n++;if(k==="home")n+=1+S.kids.filter(x=>x.alive).length;if(k==="tyv"||k==="ksp")n++;if(k==="lc")n+=Math.max(1,Math.min(3,rivals.filter(v=>v.alive&&v.out).length));return n}
/* NPCs who share a place meet: small talk or friction, by the same bars */
function npcEncounters(){const by={};for(const v of liveRivals(true)){const k=S.where[v.id];(by[k]=by[k]||[]).push(v)}
 for(const k in by){const L=by[k];for(let i=0;i<L.length;i++)for(let j=i+1;j<L.length;j++){const a=L[i],b=L[j];if(!roll(30))continue;
  if(oan(a,b)+oan(b,a)>40||a.ghen+b.ghen>110){oanAdd(a,b,3);oanAdd(b,a,3);affAdd(a,b,-2);affAdd(b,a,-2)}else{affAdd(a,b,2);affAdd(b,a,2)}}}}

/* sending someone instead of going: same act, lower odds, the servant may be caught and confess */
let ACTX={a:null,pen:0};
function runAct(a,t,k,extra){const A2=ACT[k];if(!A2)return"";const sent=!together(a,t)&&!["accuse","vp","gift","steal","road","takeaway"].includes(k);const where=together(a,t)?placeName(whereOf(a)):"";
 if(sameHouse(a,t)&&k!=="accuse")return a===S?"Người cùng cung, ngươi không thể ra tay hay lấy lòng. ":"";
 const sv=sent?bestSent(a):null;ACTX={a,pen:sent?sentPen(sv)-(sv?srk(sv)*3:0):0,dom:ACTDOM[k]};let r="";try{r=A2.f(a,t,extra)}finally{ACTX={a:null,pen:0}}
 const harm=!["ally","gift","spy"].includes(k);
 if(sent&&sv&&!/bị lộ|bị bắt|phát giác|chặn kịp|từ chối/.test(r))servMerit(sv,2);if(sent&&harm&&roll(confessRisk(sv))){evA(t,a,1);r+=`${sv?sv.name:"Kẻ"} được ${NM(a)} sai đi bị bắt, khai ra chủ: ${NM(t)} nắm thêm 1 chứng cứ. `+servCaught(a,sv)}
 if(sent&&sv)r=r.replace(/\(sai người đi\)/,"");
 return r?(r.trim()+(sent?` (sai ${sv?sv.name:"người"} đi)`:where?` (tại ${where})`:"")+" "):""}
function odA(a,b){return cl(Math.round(b+(a.suc<30?-15:0)-(ACTX.a===a?ACTX.pen:0)+(ACTX.a===a?lotB(a,ACTX.dom):0)),5,95)}

/* the talk system: topics, by traits and bars; the same chat repeated in a month gives less */
function chatF(v){S.chat=S.chat||{};const n=S.chat[v.id]||0;return 1/(1+n)}
function chatMark(v){S.chat[v.id]=(S.chat[v.id]||0)+1}
function topicOpts(v){const f=chatF(v),g=n=>Math.max(1,Math.round(n*f)),third=liveRivals(true).filter(x=>x!==v).sort((a,b)=>aff(v,a)-aff(v,b))[0];const A=[];
 const same=sameHouse(S,v);
 A.push({n:"Hỏi han sức khỏe",o:100,x:`thiện cảm +${g(4)}`,run:()=>{affAdd(v,S,g(4));chatMark(v);return `${v.name} cảm động. Thiện cảm +${g(4)}.`}});
 const praise=v.trait==="Kiêu ngạo"||v.trait==="Tham vọng"?8:4;A.push({n:"Khen tài nghệ nàng",o:od(60+S.tai/5),x:`thiện cảm +${g(praise)}`,run:()=>{chatMark(v);if(roll(od(60+S.tai/5))){affAdd(v,S,g(praise));return `${v.name} tươi cười. Thiện cảm +${g(praise)}.`}affAdd(v,S,-2);return `${v.name} cho là ngươi giả lả. Thiện cảm -2.`}});
 if(third)A.push({n:`Bàn tán về ${third.name}`,o:100,x:aff(v,third)<0?"nàng ghét người này, hợp chuyện":"nàng có thể mách lại",run:()=>{chatMark(v);if(aff(v,third)<0){affAdd(v,S,g(8));oanAdd(v,third,5);return `Hai người to nhỏ chuyện ${third.name}. Thiện cảm +${g(8)}.`}affAdd(v,S,-3);if(roll(50)){oanAdd(third,S,10);return `${v.name} đem lời ngươi kể lại với ${third.name}. ${third.name} oán ngươi +10.`}return `${v.name} lảng sang chuyện khác. Thiện cảm -3.`}});
 A.push({n:"Chia sẻ bí mật",o:100,x:`thiện cảm +${g(10)}${v.malice>50?" · nàng có thể nắm thóp ngươi":""}`,run:()=>{chatMark(v);affAdd(v,S,g(10));if(v.malice>50&&roll(50)){evA(v,S,1);return `${v.name} lắng nghe chăm chú, ghi nhớ từng lời. Thiện cảm +${g(10)}.`}return `${v.name} cũng kể chuyện riêng. Thiện cảm +${g(10)}.`}});
 A.push({n:"Nhờ giúp đỡ",o:100,x:aff(v,S)>=30?"nàng thân với ngươi":"cần thiện cảm 30",run:()=>{chatMark(v);if(aff(v,S)>=30){if(roll(50)&&v.bac>=30){ap(v,{bac:-30});apply({bac:30});return `${v.name} cho ngươi mượn 30 lượng.`}const x=liveRivals(true).filter(y=>y!==v)[0];if(x){evA(S,x,1);return `${v.name} kể cho ngươi một chuyện về ${x.name}: chứng cứ +1.`}}affAdd(v,S,-3);return `${v.name} khéo từ chối. Thiện cảm -3.`}});
 const foe=liveRivals(true).filter(x=>x!==v&&oan(x,v)>=30)[0];
 A.push({n:"Cảnh báo nàng",o:100,x:foe?`có kẻ đang oán nàng`:"không có căn cứ",run:()=>{chatMark(v);if(foe){affAdd(v,S,g(10));oanAdd(v,foe,10);return `Ngươi nhắc ${v.name} coi chừng ${foe.name}. Thiện cảm +${g(10)}.`}affAdd(v,S,-2);return `${v.name} nghi ngươi gây chia rẽ. Thiện cảm -2.`}});
 if(oan(v,S)>0){A.push({n:"Tạ lỗi",o:100,c:{danh:-1},x:"oán -15",run:()=>{oanAdd(v,S,-15);chatMark(v);return `Ngươi hạ mình tạ lỗi. ${v.name} oán -15.`}});
  A.push({n:"Nhún nhường",o:100,c:{danh:-2},x:"oán -8 · thiện cảm +2",run:()=>{oanAdd(v,S,-8);affAdd(v,S,2);chatMark(v);return `Ngươi nhún nhường trước ${v.name}. Oán -8.`}})}
 A.push({n:"Giúp đỡ nàng",c:{bac:-20},o:100,x:"thiện cảm +10 · oán -5",run:()=>{relAdd(S,v,10);oanAdd(v,S,-5);chatMark(v);return `Ngươi giúp ${v.name} việc khó. Thiện cảm +10.`}});
 if(same)return A.filter(a=>["Hỏi han sức khỏe","Bàn tán về "+(third?third.name:""),"Tạ lỗi","Nhún nhường"].includes(a.n)).concat([{n:"Cùng cung",o:100,lock:true,t:"không thể lấy lòng hay ra tay",x:""}]);
 return A}
/* harms that need the place: food served, the lotus pond, her palace while she is away, overhearing */
const FOOD=["kn","tn","home","dtd"];
function placeHarms(v,k){const H=[];if(sameHouse(S,v))return H;
 const act=(key2,n,x)=>{const a=ACT[key2];if(a&&a.ok(S,v))H.push({n,o:a.o?a.o(S,v):100,act:1,x:[a.x||"",fmt(a.c)].filter(Boolean).join(" · "),run:()=>runAct(S,v,key2)})};
 act("spy","Dò la");act("rumor","Tung tin đồn");
 if(FOOD.includes(k)||k[0]==="r"){act("poison","Bỏ độc vào trà nàng");act("musk","Bỏ xạ hương vào thuốc nàng")}
 if(k==="vuon"){H.push({n:"Đẩy nàng xuống hồ sen",o:odA(S,40+S.tamco/4),act:1,x:"Đức -12 · lộ: bị phạt",run:()=>pushPond(S,v)});act("pond","Đẩy con nàng xuống hồ")}
 H.push({n:"Ngáng chân nàng",o:odA(S,50+S.tamco/5),act:1,x:v.preg&&!v.hidden?"nàng đang có thai":"nàng bẽ mặt",run:()=>trip(S,v)});
 act("frame","Vu oan");act("vp","Tố vượt phẩm");
 return H}
function pushPond(a,t){ap(a,{duc:-12});a.schemes=(a.schemes||0)+1;const c=caught(a,t,false,"đẩy "+NM(t)+" xuống hồ sen");if(c)return c;
 if(roll(odA(a,40+a.tamco/4))){ap(t,{suc:-25});if(t.preg&&!t.fake&&roll(60)){t.preg=0;t.hidden=false}relAdd(a,t,-10);return (t===S?"<span class=\"r\">Ngươi bị đẩy xuống hồ sen</span>":`${t.name} trượt chân rơi xuống hồ sen`)+`, ướt sũng, nhiễm lạnh. Sức -25${t.preg===0?"":""}. `+dieIf(t,"nhiễm lạnh mà mất")}
 ap(a,{danh:-8});relAdd(a,t,-25);punish(a,"xô ngã phi tần",2);return `<span class="r">${NMc(a)} xô ${NM(t)} bị người thấy.</span> `}
function trip(a,t){ap(a,{duc:-4});if(roll(odA(a,50+a.tamco/5))){ap(t,{danh:-3});let r=`${NMc(t)} vấp ngã giữa chốn đông người. Danh -3. `;if(t.preg&&!t.fake&&roll(25)){t.preg=0;t.hidden=false;ap(t,{suc:-15});r+=`<span class="r">${NMc(t)} động thai.</span> `}relAdd(a,t,-6);return r}
 relAdd(a,t,-12);evA(t,a,1);return `${NMc(t)} thấy rõ ${NM(a)} ngáng chân. `}
function overhear(k){const here=liveRivals(true).filter(v=>whereOf(v)===k);if(here.length<2)return"";const v=pick(here);if(roll(od(40+S.mat*6))){evA(S,v,1);return `Ngươi nghe lén ${v.name} nói chuyện: chứng cứ +1.`}return "Không nghe được gì."}

/* the palace map */
const MAPL=[["thu","dtd","tn"],["kn","vuon","ksp"],["tyv","lc","home"]];
function mapHTMLgrid(){const W=S.where||{};const dis=k=>!can(travel(S.place,k)+1)||S.confined||S.dead||S.place===k;
 const tile=(k,n,sc,sub)=>`<button class="mtile" data-go="${k}" ${k==="home"?(S.place==="home"?"disabled":""):(dis(k)?"disabled":"")} style="${(SCIMG[sc]||k==="home")?`background-image:url(img/${k==="home"?"tam-cung-dem":SCIMG[sc]}.webp)`:""}"><span class="mband">${k!=="home"&&S.place!==k&&!can(travel(S.place,k)+1)?`<span class="mchip">hết khắc</span>`:""}<b>${n}</b><span>${countAt(k)?silChip(countAt(k)):"vắng"} · ${k==="home"?"không tốn khắc":travel(S.place,k)+" khắc"}</span>${sub&&k!=="home"?`<small>${sub}</small>`:""}</span></button>`;
 let h=`<div class="ph"><span>Đi gần 1 khắc, xa 2 khắc · còn <b>${4-used}</b> ${pips(4-used)}. Đến nơi phải còn ít nhất 1 khắc để gặp người.</span>${S.confined?`<span class="r">Cấm túc ${S.confined} tháng</span>`:""}</div><div class="pmap">`;
 for(const row of MAPL)for(const k of row){if(k==="kn"&&!qOn()){h+=`<div class="mtile off"><b>Càn Ninh cung</b><span>bỏ trống</span></div>`;continue}const P=placeOf(k);h+=tile(k,k==="home"?"Tẩm cung":P.n,P.sc,k==="home"?"không tốn việc":"")}
 h+=`</div><div class="pmap two">`+liveRivals(false).filter(v=>palaceOf(v)!=="home").map(v=>{const k="r"+v.id;return tile(k,typeof palName==="function"?palName(k):"Cung phi tần","rv","")}).filter((x,i,a)=>a.indexOf(x)===i).join("")+`</div>`;
 return h}
/* the 'Quan hệ' tab: the selected person's ties to everyone */
let relSel="me";
function relHTML(){const P=consorts();const sel=relSel==="emp"||relSel==="th"?relSel:(byKey(relSel)||S);
 let h=`<div class="reltab">`+[["me","Ngươi"]].concat(liveRivals(true).map(v=>[v.id,v.name]),[["emp","Hoàng thượng"]],S.thDead?[]:[["th","Thái hậu"]]).map(([k,n])=>`<button data-rel="${k}" aria-pressed="${String(k)===String(relSel)}">${n}</button>`).join("")+`</div>`;
 const row=(n,a,b)=>`<div class="rrow"><span>${n}</span><span>${a}</span><span>${b}</span></div>`;
 if(sel==="emp"){h+=row("<b>Người</b>","<b>Ngài sủng</b>","<b>Ân tình</b>")+P.map(p=>row(p===S?"Ngươi":p.name,p.sung,p.an||0)).join("");return h}
 if(sel==="th"){h+=row("<b>Người</b>","<b>Thái hậu thương</b>","")+P.map(p=>row(p===S?"Ngươi":p.name,p.th,"")).join("");return h}
 h+=row("<b>Với</b>","<b>Thiện cảm (đi · về)</b>","<b>Oán (đi · về)</b>")+P.filter(p=>p!==sel).map(p=>row((p===S?"Ngươi":p.name)+(sameHouse(sel,p)?" · cùng cung":""),`${aff(sel,p)} · ${aff(p,sel)}`,`${oan(sel,p)} · ${oan(p,sel)}`)).join("");
 h+=row("Hoàng thượng",`sủng ${sel.sung}`,`ân tình ${sel.an||0}`)+(S.thDead?"":row("Thái hậu",`thương ${sel.th}`,""));
 return h}

/* moving costs time: near 1 khắc, far 2 */
function mapPos(k){for(let r=0;r<MAPL.length;r++){const c=MAPL[r].indexOf(k);if(c>=0)return[r,c]}if(k[0]==="r"){const i=liveRivals(false).findIndex(v=>"r"+v.id===k);return[3+Math.floor(Math.max(0,i)/3),Math.max(0,i)%3]}return[2,2]}
function travel(a,b){if(a===b)return 0;const [r1,c1]=mapPos(a||"home"),[r2,c2]=mapPos(b);const far=Math.abs(r1-r2)+Math.abs(c1-c2)>1;return far?(wet()?3:2):1}
function rivalsBuoi(){let ev="";for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const t=pickTarget(v);if(!t)continue;
  let want=((v.malice/100)*(rel(v,t)<0?1:.25)+hostility(v,t)/200)*(rkOf(t)>=rkOf(v)-1||(t===S&&v.ghen>=60)?1:.4);if(t.shield)want*=.5;
  if(t===S&&S.lot&&S.lot.dom==="Hung")want*=1.5;if(Math.random()<want*.04){ev+=seenNPC(v,t,npcAct(v,t));if(S.dead)return ev}}return ev}
function nextBuoi(){if(!S||S.dead||Q.length||S.mg)return;if((S.buoi||0)>=2){S.buoi=0;endTurn();return}
 S.buoi=(S.buoi||0)+1;used=0;const ev=rivalsBuoi();if(S.dead){render();return}placeWhere();popIdx=null;popMsg="";
 if(S.out)coldVisit();else if(S.place!=="home"){const k=S.place;S.place="home";const u=used;goTo(k);used=u}else S.visit={k:"home",people:homePeople(),talked:false,tk:{}};
 if(ev)Q.push({t:"Tin trong cung",h:`<p class="past">${when()} · ${BUOI[S.buoi]}</p><p>${ev}</p>`});curtain();render()}
A("pushp","Đẩy xuống hồ sen",{c:{duc:-12},ok:(a,t)=>whereOf(a)==="vuon"&&together(a,t),o:a=>odA(a,40+a.tamco/4),f:(a,t)=>pushPond(a,t)});
A("trip","Ngáng chân",{c:{duc:-4},ok:(a,t)=>together(a,t),o:a=>odA(a,50+a.tamco/5),f:(a,t)=>trip(a,t)});
/* ================= HOUSEHOLDS: maids and eunuchs, one rule for every consort ================= */
const STR={trung:"trung thành",tham:"tham lam",nhat:"nhát gan",lanh:"lanh lợi",chuyen:"nhiều chuyện"};
const EUN=["Tiểu Lộ Tử","Tiểu Phúc Tử","Tiểu Thuận Tử","Tiểu An Tử","Tiểu Hỉ Tử","Tiểu Quế Tử","Tiểu Lâm Tử","Tiểu Đức Tử","Tiểu Thọ Tử","Tiểu Xuân Tử"];
let sidN=0;
function capOf(p){const r=rkOf(p);return r>=7?[4,2]:r>=5?[3,2]:r>=4?[2,1]:[1,1]}
function mkServ(role){const n=role==="maid"?(AV.maids||[]).length:0;const used=allServ().map(x=>x.name);const pool=(role==="maid"?MAIDS:EUN).filter(x=>!used.includes(x));
 const sa=servAge(role);return{fc:drawF(role==="maid"?"maid":"eunuch",sa.age),fk:bandKeys(role==="maid"?"maid":"eunuch",sa.age)[0],sid:++sidN,name:pool.length?pick(pool):pick(role==="maid"?MAIDS:EUN)+" "+(R(8)+2),role,face:allServ().filter(x=>x.role===role).length,hue:0,...sa,tr:pick(Object.keys(STR)),loyal:45+R(36),spyFor:null,lover:null,af:{}}}
function allServ(){const L=[];for(const p of [S].concat(rivals))if(p&&p.staff)L.push(...p.staff);return L}
function ownerOf(s){for(const p of [S].concat(rivals))if(p&&p.staff&&p.staff.includes(s))return p;return null}
function servById(id){return allServ().find(s=>s.sid===id)||null}
function staffInit(){sidN=Math.max(sidN,...allServ().map(s=>s.sid),0);for(const p of consorts()){if(!p.staff)p.staff=[];fillStaff(p,true)}
 if(!S.court)S.court={tq:{name:"Tổng quản Lý Liên Anh",n:"Tổng quản thái giám Càn Thanh cung",af:{},age:56+R(6)},ksp:{name:"Thái giám Kính sự phòng Kính Sự",n:"Giữ thẻ bài",af:{},age:40+R(10)},ped:{name:"Tiểu Ngân Tử",n:"Thái giám bán hàng rong",af:{},age:20+R(7)},ty:{name:"Thái y Trương",n:"Thái y viện",af:{},age:50+R(8)}};
 const L=allServ();if(!L.some(s=>s.af&&Object.keys(s.af).length))for(const s of L){const o=pick(L.filter(x=>ownerOf(x)!==ownerOf(s)));if(o){s.af[o.sid]=30;o.af[s.sid]=30}
  if(s.role==="eunuch"&&roll(20)){const m=pick(L.filter(x=>x.role==="maid"&&!x.lover&&ownerOf(x)!==ownerOf(s)));if(m){s.lover=m.sid;m.lover=s.sid}}}}
function fillStaff(p,free){const [cm,ce]=capOf(p);let m=p.staff.filter(s=>s.role==="maid").length+1,e=p.staff.filter(s=>s.role==="eunuch").length;
 while(m<cm&&roomFor("maid")&&(free||p.bac>=20)){p.staff.push(mkServ("maid"));m++;if(!free)ap(p,{bac:-20})}while(e<ce&&roomFor("eunuch")&&(free||p.bac>=20)){p.staff.push(mkServ("eunuch"));e++;if(!free)ap(p,{bac:-20})}}
function servAge(role){const age=role==="maid"?16+R(10):18+R(45);return role==="maid"?{age}:{age,fe:eunBand(age)}}
function pServ(s){const g=rkOfFace("serv",s);return Object.assign(pServ0(s),{rk:g[0],rw:g[1]})}
function pServ0(s){const n=s.role==="maid"?6:4,i=(s.face>=0?s.face:0);if(s.role!=="maid")return{src:fsrc(s.fc,`img/face-eunuch-${(s.fe>=0?s.fe:eunBand(s.age||30))+1}.webp`),hue:0,ini:"宦",col:"#8a8aa0"};return{src:fsrc(s.fc,""),hue:0,ini:s.role==="maid"?s.name.split(" ").pop()[0]:"宦",col:s.role==="maid"?"#b9a48a":"#8a8aa0"}}
/* the servant one sends: loyalty and traits set the odds and the risk of confessing */
function bestSent(p){const L=(p.staff||[]).filter(s=>!s.spyFor);if(!L.length)return null;return L.slice().sort((a,b)=>(b.loyal+(b.tr==="lanh"?15:0))-(a.loyal+(a.tr==="lanh"?15:0)))[0]}
function sentPen(s){if(!s)return 20;return cl(15-(s.tr==="lanh"?8:0)-Math.round((s.loyal-50)/10),0,25)}
function confessRisk(s){if(!s)return 25;return cl(20+(s.tr==="nhat"?20:0)-(s.tr==="trung"?15:0)-Math.round(s.loyal/10),3,60)}
function servCaught(p,s){if(!s)return"";if(roll(30)){p.staff.splice(p.staff.indexOf(s),1);return `${s.name} bị đánh chết trong ngục Thận Hình ti. `}s.loyal=cl(s.loyal-10,0,100);s.trouble=wk();return""}
/* acts on servants (same functions for NPC mistresses) */
function bribeServ(a,s){const o=ownerOf(s);if(!o||o===a||a.bac<30)return"";ap(a,{bac:-30});const odds=odA(a,35+(s.tr==="tham"?25:0)-s.loyal/3+a.tamco/5);
 if(roll(odds)){s.spyFor=key(a);return `${s.name} (người hầu của ${NM(o)}) nhận bạc của ${NM(a)}, thành tai mắt. `}s.loyal=cl(s.loyal+5,0,100);evA(o,a,1);relAdd(a,o,-5);return `${s.name} từ chối bạc của ${NM(a)} và mách chủ. `}
function threatServ(a,s){const o=ownerOf(s);if(!o||!s.lover)return"";s.spyFor=key(a);return `${NMc(a)} dọa tố chuyện đối thực của ${s.name}; hắn/nàng sợ hãi, thành tai mắt. `}
function plantServ(a,t){if(!a.staff)a.staff=[];const s=bestSent(a);if(!s||a.bac<40)return"";ap(a,{bac:-40});if(roll(odA(a,40+a.tamco/4+(s.tr==="lanh"?10:0)))){a.staff.splice(a.staff.indexOf(s),1);s.spyFor=key(a);(t.staff=t.staff||[]).push(s);return `${NMc(a)} cài ${s.name} vào cung ${NM(t)} làm tai mắt. `}evA(t,a,1);return `Nội vụ phủ thấy lạ, ${NM(t)} không nhận ${s.name}. `}
function servMonth(){let ev="";for(const p of consorts()){if(!p.staff)p.staff=[];
  const d=(p.schemes||0)-(p.schLast||0);p.schLast=p.schemes||0;
  for(const s of p.staff.slice()){if(s.tr!=="trung")s.loyal=cl(s.loyal-1,0,100);
   if(s.spyFor){const m=byKey(s.spyFor);if(m&&(m===S||m.alive)){if(d>0&&roll(60)){evA(m,p,1);if(m===S)ev+=`Tai mắt ${s.name} trong cung ${p.name} báo: nàng đang bày mưu. Chứng cứ +1. `}}else s.spyFor=null}
   if(d>0)for(const fid in s.af){if(s.af[fid]<20)continue;const f=servById(+fid),o=f&&ownerOf(f);if(o&&o!==p&&roll((s.tr==="chuyen"?25:10)+srk(s)*5)){evA(o,p,1);if(o===S)ev+=`${f.name} nghe bạn là ${s.name} kể chuyện cung ${NM(p)}: chứng cứ +1. `}}}
  if(p!==S&&roll(10)){const t=pickTarget(p);if(t&&t.staff&&t.staff.length&&p.bac>=60){const s=pick(t.staff);const r=bribeServ(p,s);if(t===S&&r&&s.spyFor===key(p)&&S.mat>=3)ev+=`Có tin: ${r}`}}
  if(p!==S&&roll(2)){const t=pickTarget(p);if(t)plantServ(p,t)}
  if(p!==S)fillStaff(p,false)}
 return ev}
function servAct(a,id){const s=servById(id);if(!s||S.dead||Q.length)return;const o=ownerOf(s);let r="";
 if(o===S){if(a==="thuong"){if(S.bac<10)return;apply({bac:-10});s.loyal=cl(s.loyal+12,0,100);r=`Thưởng ${s.name}: lòng +12.`}
  else if(a==="phat"){s.loyal=cl(s.loyal-15,0,100);if(s.spyFor){const m=byKey(s.spyFor);r=`Tra khảo ${s.name}: khai là tai mắt của ${m?NM(m):"kẻ khác"}. Đuổi khỏi cung.`;S.staff.splice(S.staff.indexOf(s),1);if(m&&m!==S)evA(S,m,1)}else r=`Phạt ${s.name}: lòng -15.`}
  else if(a==="hoi"){if(!can(2))return;spend(2);const f=Object.keys(s.af).map(x=>servById(+x)).find(x=>x&&s.af[x.sid]>=20);const o2=f&&ownerOf(f);
   if(o2&&o2!==S&&roll(s.tr==="chuyen"?70:40)){evA(S,o2,1);r=`${s.name} kể chuyện nghe từ ${f.name} bên cung ${o2.name}: chứng cứ +1.`}else r=`${s.name} không biết gì mới.`;
   const dt=allServ().find(x=>x.lover&&!(S.knowDT||[]).includes(x.sid)&&ownerOf(x)!==S);if(dt&&roll(30)){S.knowDT=(S.knowDT||[]).concat([dt.sid,dt.lover]);r+=` Lại nghe đồn ${dt.name} và ${(servById(dt.lover)||{}).name} đối thực.`}}
  else if(a==="doi"){S.staff.splice(S.staff.indexOf(s),1);r=`Trả ${s.name} về Nội vụ phủ.`}
  else if(a==="che"){s.loyal=cl(s.loyal+20,0,100);apply({danh:-2});r=`Che chở ${s.name} trước Thận Hình ti: lòng +20, Danh -2.`}}
 else if(o){if(!can(2))return;if(a==="mua"){spend(2);r=bribeServ(S,s)}else if(a==="doa"){spend(2);r=threatServ(S,s)}}
 if(r)log(r);render()}
function courtAct(a,k){const c=S.court[k];if(!c||S.dead||Q.length)return;let r="";
 if(a==="thuong"){if(S.bac<20)return;apply({bac:-20});c.af.me=(c.af.me||0)+10;r=`Biếu ${c.name} 20 lượng: thiện cảm +10.`}
 if(a==="hoi"){if(!can(2))return;spend(2);c.af.me=(c.af.me||0)+1;if(k==="tq"&&roll(40+(c.af.me||0)/2)){discover();r=`${c.name} hé lộ một sở thích của Hoàng thượng.`}else if(k==="ksp")r="Sổ thị tẩm: "+liveRivals(true).map(x=>`${x.name} ${x.nights}`).join(", ")+`; ngươi ${S.nights}.`;else r=`${c.name} chỉ cười, không nói gì.`}
 if(r)log(r);render()}
function tqAf(p){return S.court&&S.court.tq?(S.court.tq.af[key(p)]||0):0}
function npcCourt(v){if(roll(10)&&v.bac>=40&&S.court){ap(v,{bac:-20});S.court.tq.af[v.id]=(S.court.tq.af[v.id]||0)+10}}
function staffHTML(){const row=(s,btns)=>`<div class="srow2">${mdH(pServ(s),"sm")}<div class="sinfo"><b>${s.name}</b><span>${srkName(s)} · ${strShow(s)}${s.lover&&(S.knowDT||[]).includes(s.sid)?" · <span class=\"r\">đối thực</span>":""}${s.spyFor==="me"?" · <span class=\"g\">tai mắt của ngươi</span>":""}</span></div><div class="rbtn">${btns}</div></div>`;
 const [cm,ce]=capOf(S),nm=S.staff.filter(s=>s.role==="maid").length+1,ne=S.staff.filter(s=>s.role==="eunuch").length;
 let h=`<div class="ph"><span>Kẻ hầu: ${nm}/${cm} cung nữ · ${ne}/${ce} thái giám</span><span>Sai đi: ${bestSent(S)?bestSent(S).name:"không có ai"}</span></div>`;
 h+=`<div class="srow2">${mdH(pMaid(),"sm")}<div class="sinfo"><b>${S.maid.name}</b><span>cung nữ thân tín · lòng ${S.maid.loyal}</span></div></div>`;
 h+=S.staff.map(s=>row(s,`<span class="past">lòng ${s.loyal}</span><button data-sv="thuong" data-sid="${s.sid}" ${S.bac<10?"disabled":""}>Thưởng<small>Bạc -10</small></button><button data-sv="phat" data-sid="${s.sid}">Phạt<small>lòng -15</small></button><button data-sv="hoi" data-sid="${s.sid}" ${!can(2)?"disabled":""}>Hỏi chuyện<small>2 khắc</small></button><button data-sv="che" data-sid="${s.sid}">Che chở<small>Danh -2</small></button><button data-sv="doi" data-sid="${s.sid}">Đổi người</button><button data-rec="${s.sid}" ${S.bac<30?"disabled":""}>Tiến cử<small>Bạc -30 · Danh -2</small></button>`)).join("")+(S.staff.some(s=>s.role==="maid"&&srk(s)>=3)?`<div class="rbtn"><button data-smaid="1" ${!can(2)?"disabled":""}>Chưởng sự tra xét cung nữ<small>2 khắc · tìm tai mắt, đối thực</small></button></div>`:"");
 h+=`<div class="rbtn" style="margin:4px 0"><button data-hire="maid" ${nm>=cm||S.bac<20?"disabled":""}>Nội vụ phủ: thêm cung nữ<small>Bạc -20</small></button><button data-hire="eunuch" ${ne>=ce||S.bac<20?"disabled":""}>Thêm thái giám<small>Bạc -20</small></button><button data-plantsv="1" ${!can(2)||S.bac<40||!bestSent(S)?"disabled":""}>Cài người vào cung khác<small>Bạc -40 · 2 khắc</small></button></div>`;
 h+=`<h3>Người trong cung</h3>`+Object.entries(S.court).map(([k,c])=>`<div class="srow2">${mdH(k==="ty"?pDoc():{src:`img/face-eunuch-${["tq","ksp","ped"].indexOf(k)%4+1}.webp`,ini:"宦",col:"#8a8aa0"},"sm")}<div class="sinfo"><b>${c.name}</b><span>${c.n} · thiện cảm ${c.af.me||0}</span></div><div class="rbtn"><button data-cv="thuong" data-ck="${k}" ${S.bac<20?"disabled":""}>Biếu<small>Bạc -20</small></button><button data-cv="hoi" data-ck="${k}" ${!can(2)?"disabled":""}>Hỏi chuyện<small>2 khắc</small></button></div></div>`).join("");
 h+=`<h3>Kẻ hầu cung khác</h3>`+liveRivals(true).map(v=>`<div class="past" style="margin-top:4px"><b>${v.name}</b></div>`+(v.staff||[]).map(s=>row(s,s.spyFor==="me"?"":`<button data-sv="mua" data-sid="${s.sid}" ${!can(2)||S.bac<30?"disabled":""}>Mua chuộc<small>Bạc -30 · ${word(odA(S,35+(s.tr==="tham"?25:0)-s.loyal/3+S.tamco/5))}</small></button>${s.lover&&(S.knowDT||[]).includes(s.sid)?`<button data-sv="doa" data-sid="${s.sid}" ${!can(2)?"disabled":""}>Dọa tố đối thực<small>2 khắc</small></button>`:""}`)).join("")).join("");
 return h}
PEND.plantsv=()=>({t:"<p>Cài người hầu của ngươi vào cung ai?</p>",o:liveRivals(true).filter(v=>!sameHouse(S,v)).map(v=>({n:v.name,fx:{},x:"Bạc -40",go:()=>{spend(2);log(plantServ(S,v))}})).concat([{n:"Thôi",fx:{}}])});

/* ================= FACTIONS ================= */
const CLANS=["Tể tướng","Đại tướng quân","Lễ bộ","Hộ bộ","Hàn lâm"];
function clanOf(p){if(p===S)return {tt:"Tể tướng",dtq:"Đại tướng quân",ch:"Thái hậu",thd:"Hàn lâm"}[S.origin.k]||"";if(!p.clan)p.clan=pick(CLANS);return p.clan}
function facOf(p){return (S.facs||[]).find(f=>f.m.includes(key(p)))||null}
function facMembers(f){return f.m.map(byKey).filter(p=>p&&(p===S||(p.alive&&!p.out)))}
function facLeader(f){return facMembers(f).sort((a,b)=>rkOf(b)-rkOf(a))[0]||null}
function facStr(f){return Math.round(facMembers(f).reduce((s,p)=>s+rkOf(p)*10+p.danh/2+(p.dad||40)/2,0))}
function facName(lead){if(lead===S)return `phe ${S.name.split(" ")[0]} gia`;if(lead.queen)return "phe Càn Ninh";return `phe ${lead.name.split(" ")[0]} gia`}
function facN(a){const f=facOf(a);return f?facMembers(f).length:1}
function found(a,b){if(facOf(a)||facOf(b))return"";S.facs=S.facs||[];const f={id:Date.now()%1e7+R(999),m:[key(a),key(b)],name:""};S.facs.push(f);f.name=facName(facLeader(f));relAdd(a,b,5);return `${NMc(a)} và ${NM(b)} kết thành ${f.name}. `}
function joinFac(p,f){if(facOf(p)||!f)return"";f.m.push(key(p));return `${NMc(p)} gia nhập ${f.name}. `}
function leaveFac(p){const f=facOf(p);if(!f)return"";f.m=f.m.filter(k=>k!==key(p));facMembers(f).forEach(x=>relAdd(p,x,-10));if(facMembers(f).length<2)S.facs=S.facs.filter(x=>x!==f);return `${NMc(p)} rời ${f.name}. `}
function inviteOdds(a,t){const f=facOf(a);return odA(a,30+aff(t,a)/2+(f?facStr(f)/10:0)+(clanOf(a)===clanOf(t)?15:0))}
function invite(a,t){const f=facOf(a);if(!f||facOf(t))return"";if(roll(inviteOdds(a,t)))return joinFac(t,f);relAdd(a,t,-3);return `${NMc(t)} khéo từ chối lời mời của ${NM(a)}. `}
function askJoin(a,f){const l=facLeader(f);if(!l||facOf(a))return"";if(roll(odA(a,30+aff(l,a)/2+(clanOf(a)===clanOf(l)?15:0)+rkOf(a)*3)))return joinFac(a,f);return `${l===S?"Ngươi":l.name} chưa nhận ${NM(a)} vào phe. `}
function sellOut(a){const f=facOf(a);if(!f)return"";const M=facMembers(f).filter(x=>x!==a);const q=queenP()&&queenP()!==a?queenP():null;leaveFac(a);
 for(const m of M){oanAdd(m,a,40);if(q)evA(q,m,2);else if(roll(40))punish(m,"bị đồng đảng tố giác",1)}ap(a,{danh:5,sung:3});if(roll(40))bestow(a,"accuse");return `${NMc(a)} bán đứng ${f.name}, đem chuyện của ${M.map(NM).join(", ")} dâng lên ${q?(q===S?"ngươi":"Hoàng hậu"):"Hoàng thượng"}. `}
function divide(a,f){const M=facMembers(f).filter(x=>x!==a);if(M.length<2)return"";const [x,y]=shuf(M.slice()).slice(0,2);if(roll(odA(a,40+a.tamco/3))){oanAdd(x,y,25);oanAdd(y,x,25);affAdd(x,y,-15);affAdd(y,x,-15);let r=`${NMc(a)} ly gián ${x===S?"ngươi":x.name} và ${y===S?"ngươi":y.name}. `;if(roll(50))r+=leaveFac(rkOf(x)<rkOf(y)?x:y);return r}evA(x,a,1);return `Mưu ly gián của ${NM(a)} bị ${NM(x)} nhìn thấu. `}
function jointScheme(f,t){const M=facMembers(f),l=facLeader(f);const o=odA(l,oFrame(l)+5*(M.length-1));
 if(roll(o)){fall(t,`bị ${f.name} hợp mưu tố tội`);M.forEach(m=>ap(m,{tamco:1}));return `${f.name} hợp mưu hạ ${NM(t)}: thành. `}
 M.forEach(m=>punish(m,`hợp mưu vu cáo ${NM(t)}`,2));return `<span class="r">${f.name} hợp mưu hạ ${NM(t)} bị lộ, cả phe bị phạt.</span> `}
function facMonth(){let ev="";S.facs=(S.facs||[]).filter(f=>facMembers(f).length>=2);
 for(const p of consorts())if(p.dad==null)p.dad=30+R(40);for(const p of consorts())if(roll(15))p.dad=cl(p.dad+(R(2)?8:-8),0,100);
 for(const f of S.facs){const M=facMembers(f);const l=facLeader(f);f.name=facName(l);
  /* members share evidence and news */
  const T=[S].concat(rivals);for(const t of T){if(M.includes(t))continue;const mx=Math.max(...M.map(m=>evG(m,t)));if(mx>0)M.forEach(m=>{if(evG(m,t)<mx)evA(m,t,mx-evG(m,t))})}
  /* betrayal, split */
  const b=M.find(m=>m!==S&&m!==l&&aff(m,l)<0);if(b&&roll(4))ev+=seenNPC(b,b,sellOut(b))||"";
  const top=M.filter(m=>m!==S).sort((a,c)=>c.sung-a.sung);if(top.length>=2&&top[0].ghen>60&&top[1].ghen>60&&roll(5))ev+=S.mat>=2?leaveFac(top[1]):(leaveFac(top[1]),"");
  if(l!==S&&roll(6)){const e=consorts().filter(x=>!M.includes(x)&&M.reduce((s,m)=>s+oan(m,x),0)/M.length>=25)[0];if(e&&!sameHouse(l,e))ev+=seenNPC(l,e,jointScheme(f,e))}}
 /* NPCs found, join, invite, divide */
 for(const v of liveRivals(true)){if(facOf(v))continue;
  const fr=others(v).filter(x=>(x===S||x.alive)&&!sameHouse(v,x)&&(aff(v,x)>=35||clanOf(v)===clanOf(x)&&aff(v,x)>=15||consorts().some(e=>e!==v&&e!==x&&oan(v,e)>=30&&oan(x,e)>=30)));
  const x=fr.find(y=>y!==S);if(x&&roll(25)){const g=facOf(x);ev+=g?(roll(odA(v,30+aff(x,v)/2))?(S.mat>=2||facOf(S)===g?joinFac(v,g):(joinFac(v,g),"")):""):(S.mat>=2?found(v,x):(found(v,x),""))}}
 const mine=facOf(S);for(const f of S.facs){if(f===mine)continue;const l=facLeader(f);if(l&&l!==S&&!facOf(S)&&aff(l,S)>=35&&roll(10))Q.push({t:"Lời mời vào phe",who:pv(l),h:`<p>${l.name} mời ngươi vào ${f.name}. Vào thì cùng chia tin tức, chứng cứ, che chở nhau.</p><p class="past">Mở tab Phe phái để xin vào.</p>`})}
 if(mine&&roll(5)){const o=S.facs.find(f=>f!==mine);const l=o&&facLeader(o);if(l&&l!==S){const r=divide(l,mine);if(r)ev+=r}}
 return ev}
function facHTML(){const mine=facOf(S),F=S.facs||[];let h=`<div class="ph"><span>${mine?`Ngươi thuộc <b>${mine.name}</b>`:"Ngươi chưa vào phe nào"}</span><span>Họ: ${clanOf(S)||"không"}</span></div>`;
 if(!mine){const cands=liveRivals(true).filter(v=>!facOf(v)&&aff(v,S)>=30&&!sameHouse(S,v));h+=`<div class="rbtn" style="margin-bottom:6px">${cands.slice(0,4).map(v=>`<button data-fa="lap" data-fv="${v.id}" ${!can(2)?"disabled":""}>${mdH(pv(v),"xs")}Lập phe cùng ${v.name}<small>2 khắc</small></button>`).join("")||`<span class="past">Cần một phi tần thiện cảm với ngươi từ 30 để lập phe.</span>`}</div>`}
 else{const out=liveRivals(true).filter(v=>!facOf(v)&&!sameHouse(S,v));h+=`<div class="rbtn" style="margin-bottom:6px">${out.slice(0,4).map(v=>`<button data-fa="moi" data-fv="${v.id}" ${!can(2)?"disabled":""}>${mdH(pv(v),"xs")}Mời ${v.name}<small>${word(inviteOdds(S,v))}</small></button>`).join("")}<button data-fa="roi">Rời phe<small>đồng đảng giận</small></button><button data-fa="ban" ${!can(2)?"disabled":""}>Bán đứng<small>Danh +5 · cả phe oán +40</small></button></div>`}
 h+=F.map(f=>{const M=facMembers(f),l=facLeader(f),st=Math.round(M.filter(m=>m!==S).reduce((s,m)=>s+aff(m,S),0)/Math.max(1,M.filter(m=>m!==S).length));const me=f===mine;
  return `<div class="rival"><div class="top" style="align-items:center;justify-content:flex-start"><b>${f.name}</b><em>đứng đầu: ${mdH(l===S?pMe():pv(l),"xs")}${l===S?"ngươi":l.name} · thế lực ${facStr(f)}</em></div><div class="chips">${M.map(m=>chip(`${mdH(m===S?pMe():pv(m),"xs")}${m===S?"Ngươi":m.name}`)).join("")}${me?"":chip(`Với ngươi: ${st>=20?"thân":st<=-20?"thù":"bình thường"} (${st})`,st<=-20?"hot":st>=20?"ok":"")}</div>${me?(l===S?`<div class="rbtn">${consorts().filter(x=>x!==S&&!M.includes(x)&&!sameHouse(S,x)).slice(0,3).map(x=>`<button data-fa="hop" data-fv="${x.id}" ${!can(2)?"disabled":""}>${mdH(pv(x),"xs")}Hợp mưu hạ ${x.name}<small>${word(odA(S,oFrame(S)+5*(M.length-1)))} · lộ: cả phe bị phạt</small></button>`).join("")}</div>`:""):`<div class="rbtn">${mine?"":`<button data-fa="xin" data-ff="${f.id}" ${!can(2)?"disabled":""}>Xin vào phe<small>2 khắc</small></button>`}<button data-fa="ly" data-ff="${f.id}" ${!can(2)||M.length<2?"disabled":""}>Ly gián<small>${word(odA(S,40+S.tamco/3))} · 2 khắc</small></button></div>`}</div>`}).join("")||`<p class="past">Hậu cung chưa có phe phái nào.</p>`;
 return h}
function facAct(a,d){if(S.dead||Q.length)return;let r="";const v=d.fv?RV(+d.fv):null,f=d.ff?(S.facs||[]).find(x=>x.id===+d.ff):null;
 if(a==="roi"){r=leaveFac(S)}
 else{if(!can(2))return;spend(2);
  if(a==="lap"&&v)r=found(S,v);else if(a==="moi"&&v)r=invite(S,v);else if(a==="xin"&&f)r=askJoin(S,f);else if(a==="ban")r=sellOut(S);else if(a==="ly"&&f)r=divide(S,f);else if(a==="hop"&&v&&facOf(S))r=jointScheme(facOf(S),v);else spend(-2)}
 if(r)log(r);render()}

/* rendering */
const RIMG=["rank-dap-ung","rank-thuong-tai","rank-quy-nhan","rank-tan","rank-phi","rank-quy-phi","rank-hoang-quy-phi","rank-hoang-hau"];
const SCIMG={vuon:"ngu-hoa-vien",thu:"ngu-thu-phong",dtd:"duong-tam-dien",tn:"tu-ninh-cung",kn:"khon-ninh-cung",rv:"phi-tan-cung",tyv:"thai-y-vien",ksp:"kinh-su-phong",lc:"lanh-cung"};
const AIMG={cam:"cam",ky:"ky",thi:"thi",hoa:"hoa",vu:"vu",y:"y-thuat"};
function ic(n,s){s=s||16;return `<img class="ic" src="img/${n}.webp" width="${s}" height="${s}" alt="" onerror="this.remove()">`}
function chip(t,cls){return `<span class="chip ${cls||""}">${t}</span>`}
/* warns when an act would drop Đức under the Hoàng hậu bar (40) */
function ducWarn(c){const d=c&&c.duc;if(!d||d>=0||!S||S.rank>=7)return"";const after=S.duc+d;return after<50?`<span class="fx r"><b>Đức ${S.duc} → ${after}: ${S.duc>=40?"tụt dưới 50, mất đường lên Hoàng hậu":"cần Đức 50 mới lên Hoàng hậu"}</b></span>`:""}
function cardH(a,i){const poor=a.c&&a.c.bac&&S.bac+a.c.bac<0,o=a.o==null?100:a.o;const dis=!can(cardCost(a))||a.done||poor||a.lock||S.dead||(a.b!=null&&(S.buoi||0)!==a.b);
 const gain=[fmt(a.w),a.x].filter(Boolean).join(" · ")||"không";
 return `<button class="card" data-i="${i}" ${dis?"disabled":""}><h4>${a.n}</h4><span class="fx">${pips(cardCost(a))} ${cardCost(a)} khắc${a.b!=null?` · <b>Chỉ ${BUOI[a.b].toLowerCase()}</b>`:""}</span><p>${a.t||""}</p>${o<100&&!a.lock?`<span class="odds">${word(cl(o+lotB(S,a.dom),5,95))}${lotTag(a.dom)}</span>`:`<span class="odds">Chắc chắn</span>`}<span class="fx">Tốn: ${fmt(a.c)||"không"}</span>${ducWarn(a.c)}<span class="fx">Thành: ${gain}</span>${o<100&&!a.lock?`<span class="fx">Hỏng: ${fmt(a.l)||"không mất gì"}</span>`:""}</button>`}
function render(){if(!S)return;renderHUD();renderStage();renderPanel();$("next").disabled=S.dead||Q.length>0||!!S.mg;$("next").textContent=(S.buoi||0)>=2?"Qua đêm":"Qua buổi";if(!S.dead&&!Q.length&&!S.mg&&used>=4&&!advLock){advLock=true;setTimeout(()=>{advLock=false;if(used>=4&&!Q.length&&!S.dead)nextBuoi()},350)}
 document.querySelectorAll("#tabs button").forEach(b=>b.setAttribute("aria-selected",b.dataset.tab===tab));
 if(Q.length&&$("modal").hidden)showModal();save()}
function renderHUD(){if(typeof renderHud2==="function")renderHud2();$("me-n").textContent=S.name;$("me-r").innerHTML=ic(RIMG[S.rank],14)+(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n)+(S.hieu?` · hiệu ${S.hieu}`:"");$("me-d").textContent=`T${S.month}/${S.year} · ${TUAN[S.tuan]} · ${BUOI[S.buoi||0]} · ${S.wx?S.wx.n:""} ${"●".repeat(Math.max(0,4-used))}${"○".repeat(Math.min(4,used))}`;
 $("me-p").innerHTML=mdH(pMe(),"sm");
 for(const k of ["bac","suc","sung","danh"]){const e=$("hud-"+k);e.querySelector("span").textContent=S[k];const u=e.querySelector("u");if(u)u.style.width=S[k]+"%"}
 $("emp-p").innerHTML=mdH(pEmp(),"sm");$("emp-n").textContent=S.emp.era;const m=MOODS[S.emp.mood];$("emp-m").innerHTML=`<span class="${m[1]}">${m[0]}</span>`}
function renderStage(){const P=placeOf(S.place);$("stage").className="stage sc-"+P.sc;$("scimg").style.backgroundImage=SCIMG[P.sc]?`url(img/${SCIMG[P.sc]}.webp)`:"none";const ppl=curPeople();
 {const raw=S.visit&&S.visit.msg?S.visit.msg:P.d;const btns=(raw.match(/<button[\s\S]*?<\/button>/g)||[]).join("");const txt=raw.replace(/<button[\s\S]*?<\/button>/g,"").replace(/<[^>]+>/g,"");$("sc-t").innerHTML=`<h2><span class="rt1">${P.n}</span><span class="rmsg" title="${txt.replace(/"/g,"")}"> · ${txt}</span></h2>${btns}`}
 $("tokens").innerHTML=ppl.length?ppl.map((p,i)=>{const f=pFaceOf(p);
   if(p.kind==="hh")f.ini="鳳";return `<button class="tok" data-p="${i}">${mdH(f)}<span class="tag">${p.name}</span></button>`}).join(""):`<p class="empty">Không có ai ở đây.</p>`;
 let pw="";if(popIdx!=null&&ppl[popIdx])pw=`<div class="pop pcpop">${popCard(ppl[popIdx],popIdx)}</div>`;
 $("popw").innerHTML=pw;kitFix($("popw"))}
function rvButtons(v,i){const dis=!can(2)||!v.alive||v.out||S.dead;const b=(k,extra)=>{const a=ACT[k];if(!a||(a.kid&&!a.ok(S,v)))return"";const ok=a.ok(S,v),o=a.o?a.o(S,v):null;
  return `<button data-r="${i}" data-a="${k}" ${dis||!ok?"disabled":""}>${k==="poison"||k==="kpoison"?ic("doc",14):""}${a.n}<small>${[o!=null&&ok?word(cl(o+lotB(S,ACTDOM[k]),5,95))+lotTag(ACTDOM[k]):"",fmt(a.c),!ok&&a.x?a.x:ok&&a.x?a.x:""].filter(Boolean).join(" · ")||"không tốn"}</small></button>`};
 if(sameHouse(S,v))return `<p class="past">Cùng ${houseName(v)} với ngươi: không thể lấy lòng hay ra tay.</p>`;let h=`<p class="past" style="margin:2px 0">${together(S,v)?"Đang cùng chỗ với nàng":"Không cùng chỗ: phải sai người đi (khó hơn, kẻ đi có thể bị bắt)"}</p><div class="rbtn">${["spy","ally","gift","rumor","bribe","block","frame","poison","accuse","vp","plant","musk","catswap","ksab","kpoison","pond","kframe","takeaway"].map(k=>b(k)).join("")}</div>`;
 if(S.rank>=7)h+=`<div class="rbtn"><button data-e="${i}" data-k="judge" ${dis||evG(S,v)<2?"disabled":""}>Xử tội<small>${evG(S,v)>=2?"theo chứng cứ":"cần 2 chứng cứ"}</small></button><button data-e="${i}" data-k="conf" ${dis?"disabled":""}>Tịch thu trang sức<small>nàng thù -20</small></button><button data-e="${i}" data-k="reward" ${dis||S.bac<30?"disabled":""}>Ban thưởng<small>Bạc -30 · thân +20</small></button>${v.confined?`<button data-e="${i}" data-k="pardon" ${dis?"disabled":""}>Ân xá<small>hết cấm túc</small></button>`:""}</div>`;
 return h}
function renderPanel(){try{renderPanel0()}catch(e){console.error(e);const el=$("panel");el.innerHTML=`<p class="past">Mục này đang lỗi, ngươi chọn mục khác.</p>`}}
function renderPanel0(){const el=$("panel");let h="";faceInit();const gm=document.querySelector(".game");if(gm)gm.classList.toggle("cardtab",["rv","kid","staff"].includes(tab));
 if(tab==="act"){const pr=S.preg?`${S.hidden?"Đang giấu thai":"Mang thai"} tháng ${S.preg}${S.preg<=3||S.preg>=7?" · tháng hiểm":""}`:`Có thai mỗi lần thị tẩm: <b>${word(conceiveCh())}</b>`;
   h=`<div class="cards">${deck.map(cardH).join("")}</div>`}
 if(tab==="go")h=mapHTML();
 if(tab==="rv")h=rvTabHTML();
 if(tab==="kid"){const hl=S.heir?(S.heir.v?`Thái tử: ${S.heir.k.name}, con của ${S.heir.v.name}.`:`<span class="g">Con ngươi, ${S.heir.k.name}, là Thái tử.</span>`):"Chưa lập Thái tử. Hoàng tử từ 6 tuổi mới được xét.";
   h=kidTabHTML(hl)}
 if(tab==="art")h=artTabHTML();
 if(tab==="story"){const s=STORY[S.origin.k];if(s.calc)S.st.step=s.calc();
   h=`<div class="story"><h3>${s.t}</h3><p style="margin:0 0 4px">${s.goal}</p><p style="margin:0">Bước <b>${S.st.step}/${s.n}</b> · ${S.st.done===1?`<span class="g">Thành: ${S.st.tag}</span>`:S.st.done===-1?`<span class="r">Bại: ${S.st.tag}</span>`:s.hint()}</p></div>`;
   const c=(ok,t)=>`<span class="${ok?"y":"n"}">${ok?"✓":"✗"} ${t}</span>`;
   h+=S.rank>=7?`<div class="req"><h3>Ngươi là Hoàng hậu</h3>Đưa con mình lên ngôi để thành Hoàng thái hậu.</div>`:`<div class="req"><h3>Điều kiện sắc phong ${RANKS[S.rank+1].n}</h3>${promoReq().map(([ok,t])=>c(ok,t)).join("<br>")}<br><span class="past">Ngôi Hoàng hậu về sau cần: ngôi bỏ trống, có hoàng tử và Thái hậu 50 (không con trai: Thái hậu 80), và <b class="${S.duc>=50?"g":"r"}">Đức ${S.duc}/50</b> (mẹ Thái tử: 40). Khi ngôi trống, Hoàng thượng chọn trong những người đủ điều kiện (nặng ở hoàng tử, Thái hậu, Danh).</span><br><span class="past">Đủ điều kiện thì cuối tháng có thánh chỉ. Sinh hoàng tử được thăng thêm một bậc.</span></div>`}
 if(tab==="inv")h=invHTML();
 if(tab==="rel")h=relHTML();
 if(tab==="staff")h=staffTabHTML();
 if(tab==="fac")h=facHTML();
 if(tab==="log")h=`<h3>Nhật ký</h3><div class="logs">${S.logs.map(x=>{const v=rivals.find(r=>x.includes(r.name));return `<div>${v?mdH(pv(v),"xs"):x.includes("Hoàng thượng")?mdH(pEmp(),"xs"):""}${x}</div>`}).join("")||"<div>Chưa có gì.</div>"}</div>`+pastHTML();
 const same=el.dataset.tab===tab&&el.dataset.pg===String(PG[tab]),keep=el.dataset.tab===tab?el.scrollTop:0,rc=el.querySelector(".pcr"),rk=same&&rc?rc.scrollTop:0,lc=el.querySelector(".pcl"),lk=same&&lc?lc.scrollTop:0;el.innerHTML=h;el.dataset.tab=tab;el.dataset.pg=String(PG[tab]);el.scrollTop=keep;kitFix(el);const r2=el.querySelector(".pcr");if(r2)r2.scrollTop=rk;const l2=el.querySelector(".pcl");if(l2)l2.scrollTop=lk}
function showSelf(){Q.unshift({t:S.name,cls:"pcm",h:selfCardHTML()});showModal()}
function showEmp(){Q.unshift({t:empName(),cls:"pcm",h:empCardHTML()});showModal()}

/* save / load: three slots */
let SLOT=1;const SK=n=>"hclh-save-v2-"+n;
function ser(){const rs=new Set(rivals),ks=new Set(allKids().map(x=>x[0]));
 const walk=(o,top)=>{if(o===null||typeof o!=="object")return o;if(!top&&rs.has(o))return{$r:o.id};if(!top&&ks.has(o))return{$k:o.name};
  if(Array.isArray(o))return o.map(x=>walk(x,false));const r={};
  for(const k in o){const v=o[k];if(typeof v==="function"||k==="origin")continue;r[k]=(k==="kids"&&Array.isArray(v))?v.map(x=>walk(x,true)):walk(v,false)}return r};
 return{v:6,buoi:S.buoi||0,ok:S.origin.k,S:walk(S,true),R:rivals.map(x=>walk(x,true)),rid,tab,used,P:serQ(),at:Date.now()}}
function deser(d){rivals=d.R;rid=d.rid;S=d.S;S.origin=ORIGINS.find(o=>o.k===d.ok);
 const kid=n=>allKids().map(x=>x[0]).find(k=>k.name===n)||null;
 const fix=o=>{if(!o||typeof o!=="object")return o;if(o.$r!=null&&Object.keys(o).length===1)return rivals.find(v=>v.id===o.$r)||null;if(o.$k!=null&&Object.keys(o).length===1)return kid(o.$k);
  for(const k in o)o[k]=fix(o[k]);return o};
 for(const k in S)if(k!=="kids")S[k]=fix(S[k]);
 tab=d.tab||"act";used=d.used||0;popIdx=null;popMsg="";
 const vk=S.visit&&S.visit.k;if(d.v<3||!vk||vk==="home"||placeOf(vk).k!==vk||!Array.isArray(S.visit.people)){S.visit={k:"home",people:homePeople(),talked:false};S.place="home"}else S.place=vk;
 if(d.v<3)S.mg=null;if(d.v<5){used=0;S.buoi=0}normAll();Q=deserQ(d.P||[])}
function save(){if(!S||quiet)return;try{if(S.dead)localStorage.removeItem(SK(SLOT));else localStorage.setItem(SK(SLOT),JSON.stringify(ser()));localStorage.setItem("hclh-slot",String(SLOT))}catch(e){}}
function loadSlot(n){try{const d=JSON.parse(localStorage.getItem(SK(n))||"null");if(d&&d.v===2)d.P=[];/* v2: no pending choices; v2/v3 get items, stat blocks, records via normAll */
 return d&&d.v>=2&&d.v<=6?d:null}catch(e){return null}}
function showTitle(){const T=$("title");const L=[1,2,3].map(n=>{const d=loadSlot(n);
  if(!d)return `<div class="slot"><b>Ô ${n}</b><span class="past">Trống</span><button class="main" data-new="${n}">Bắt đầu kiếp mới</button></div>`;
  const s=d.S;return `<div class="slot"><b>Ô ${n}: ${s.name}</b><span class="past">${RANKS[s.rank].n} · năm ${s.year}, tháng ${s.month}, ${TUAN[s.tuan]}</span><div class="srow"><button class="main" data-load="${n}">Tiếp tục kiếp này</button><button class="btn" data-new="${n}" data-ask="1">Kiếp mới</button></div></div>`}).join("");
 $("slots").innerHTML=L;T.hidden=false;const f=T.querySelector("button");if(f)f.focus({preventScroll:true})}
$("slots").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.dataset.load){const d=loadSlot(+b.dataset.load);if(!d)return;SLOT=+b.dataset.load;quiet=true;deser(d);quiet=false;$("title").hidden=true;deal();showModal();render();if(S.mg)resumeMG();return}
 if(b.dataset.new){if(b.dataset.ask==="1"){b.dataset.ask="2";b.innerHTML="Chắc chắn?<small>Kiếp đang chơi sẽ mất</small>";return}SLOT=+b.dataset.new;$("title").hidden=true;start()}};

/* wiring */
$("panel").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;const d=b.dataset;
 if(d.pg){PG[d.pg]=+d.pi;renderPanel();const on=$("panel").querySelector(".pface.on");if(on)on.scrollIntoView({block:"nearest",inline:"nearest"});return}
 if(d.i!==undefined)act(+d.i);else if(d.r!==undefined)doAct(+d.r,d.a);else if(d.e!==undefined)empAct(+d.e,d.k);else if(d.it)itemAct(d.it,+d.ix);else if(d.inv)invAct(d.inv);else if(d.go)goTo(d.go);else if(d.sv)servAct(d.sv,+d.sid);else if(d.cv)courtAct(d.cv,d.ck);else if(d.hire){if(S.bac>=20&&roomFor(d.hire)){apply({bac:-20});S.staff.push(mkServ(d.hire));render()}}else if(d.plantsv){pushDil(mkP("plantsv"),"Cài người");render()}else if(d.fa)facAct(d.fa,d);else if(d.rec)recommend(+d.rec);else if(d.smaid)searchMaids();else if(d.relot)reLot(false);else if(d.rel){relSel=isNaN(+d.rel)?d.rel:+d.rel;render()}else if(d.art)lesson(d.art);else if(b.id==="master")hireMaster()};
$("stage").onclick=e=>{const b=e.target.closest("button");if(!b)return;
 if(b.id==="popx"){popIdx=null;popMsg="";renderStage();return}
 if(b.dataset.p!==undefined){popIdx=+b.dataset.p;popMsg="";renderStage();return}
 if(b.dataset.o!==undefined&&!b.disabled)talk(+b.dataset.o)};
$("tabs").onclick=e=>{const b=e.target.closest("button");if(!b)return;tab=b.dataset.tab;render()};
$("modal").onclick=e=>{const b=e.target.closest("button");if(!b||b.disabled)return;if(b.id==="mclose")closeModal();else if(b.dataset.m!==undefined)chooseM(+b.dataset.m)};
$("next").onclick=nextBuoi;$("me").onclick=()=>{if(!S.dead&&!Q.length)showSelf()};$("emp").onclick=()=>{if(!S.dead&&!Q.length)showEmp()};
$("menu").onclick=()=>{if(Q.length&&!S.dead)return;save();showTitle()};
try{const H=window.claude&&window.claude.hot;if(H){if(typeof H.snapshot==="function")H.snapshot(()=>S&&!S.dead?ser():null);if(typeof H.ready==="function")H.ready()}}catch(e){}
(()=>{let s=1;try{s=+localStorage.getItem("hclh-slot")||1}catch(e){}SLOT=s;showTitle()})();
/* ================= SETTINGS, SOUND, FEEDBACK, SCENE LAYER ================= */
const RM=(()=>{try{return matchMedia("(prefers-reduced-motion: reduce)").matches}catch(e){return false}})();
const OPT=Object.assign({snd:false,mus:.5,sfx:.7,mute:false,vib:true,fxon:true},(()=>{try{return JSON.parse(localStorage.getItem("hclh-opt")||"{}")}catch(e){return{}}})());
function saveOpt(){try{localStorage.setItem("hclh-opt",JSON.stringify(OPT))}catch(e){}}
/* ---- audio: HTMLAudio, starts after the first tap, missing files fail silently ---- */
const AU={unlocked:false,cur:null,curName:"",duck:1,cache:{}};
function auOk(){return AU.unlocked&&OPT.snd&&!OPT.mute&&!document.hidden}
function mkAudio(n,loop){try{const a=new Audio(`audio/${n}.mp3`);a.loop=!!loop;a.preload="auto";a.addEventListener("error",()=>{a.dead=1});return a}catch(e){return null}}
function musVol(){return OPT.mute||!OPT.snd?0:OPT.mus*AU.duck}
function fadeTo(a,v,ms,done){if(!a)return;const v0=a.volume,t0=performance.now();const st=()=>{const f=Math.min(1,(performance.now()-t0)/ms);try{a.volume=Math.max(0,Math.min(1,v0+(v-v0)*f))}catch(e){}if(f<1)setTimeout(st,60);else if(done)done()};st()}
function startTrack(n){const a=mkAudio(n,false);if(!a)return null;a.volume=0;a.addEventListener("timeupdate",()=>{if(AU.curName!==n||a.handoff||!a.duration)return;if(a.currentTime>a.duration-1.6){a.handoff=1;const b=startTrack(n);if(b){AU.cur=b;fadeTo(b,musVol(),1500)}fadeTo(a,0,1500,()=>{try{a.pause()}catch(e){}})}});if(auOk()){const p=a.play();if(p&&p.catch)p.catch(()=>{})}return a}
function setMusic(n){if(AU.curName===n&&AU.cur)return;AU.curName=n;const old=AU.cur;const a=startTrack(n);AU.cur=a;if(a)fadeTo(a,musVol(),1200);if(old)fadeTo(old,0,1200,()=>{try{old.pause()}catch(e){}})}
function heartLoop(on){try{if(on&&auOk()){if(!AU.hb){AU.hb=mkAudio("sfx-heartbeat",true)}if(AU.hb&&AU.hb.paused){AU.hb.volume=OPT.sfx*.6;const p=AU.hb.play();if(p&&p.catch)p.catch(()=>{})}}else if(AU.hb&&!AU.hb.paused)AU.hb.pause()}catch(e){}}
function sfx(n){if(!auOk())return;try{let a=AU.cache[n];if(!a){a=AU.cache[n]=mkAudio(n,false)}if(!a||a.dead)return;const b=a.cloneNode();b.volume=OPT.sfx;const p=b.play();if(p&&p.catch)p.catch(()=>{});
 AU.duck=.45;if(AU.cur)AU.cur.volume=musVol();clearTimeout(AU.dt);AU.dt=setTimeout(()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol()},650)}catch(e){}}
function musicCtx(){if(!S)return"bgm-day";if(S.dead)return"bgm-sorrow";if(S.place==="lc")return"bgm-cold";const m=Q[0];if(m&&(m.pid&&m.pid!=="ksp"&&m.pid!=="prep"&&m.pid!=="night1"&&m.pid!=="night2"&&m.pid!=="shop"))return"bgm-tension";
 if(m&&(m.pid==="night1"||m.pid==="night2"||m.cls==="night"))return"bgm-night";if((S.month===1||S.month===7)&&S.tuan===0)return"bgm-festival";return (S.buoi||0)===2?"bgm-night":"bgm-day"}
function auTick(){if(!AU.unlocked)return;const m0=Q[0];if(!(m0&&m0.pid&&musicCtx()==="bgm-tension"))heartLoop(false);if(!OPT.snd||OPT.mute){if(AU.cur)try{AU.cur.volume=0}catch(e){}return}setMusic(musicCtx());if(AU.cur){try{AU.cur.volume=musVol();if(AU.cur.paused&&!document.hidden){const p=AU.cur.play();if(p&&p.catch)p.catch(()=>{})}}catch(e){}}}
document.addEventListener("pointerdown",()=>{if(!AU.unlocked){AU.unlocked=true;auTick()}},{capture:true});
document.addEventListener("visibilitychange",()=>{try{if(document.hidden){if(AU.cur)AU.cur.pause()}else auTick()}catch(e){}if(PX.app){try{document.hidden?PX.app.ticker.stop():PX.app.ticker.start()}catch(e){}}});
/* ---- feedback(kind): sound + haptics + visual, one helper ---- */
const VIB={tap:8,coin:15,decree:[20,40,20],promote:[30,30,60],poison:[80,40,120],expose:[120],birth:[15,30,15,30,15],night:[10],heart:[40,120,40,600],hit:[30]};
const SFXN={tap:"sfx-tap",open:"sfx-open",coin:"sfx-coin",decree:"sfx-decree",promote:"sfx-promote",poison:"sfx-poison",expose:"sfx-expose",birth:"sfx-birth",night:"sfx-night",page:"sfx-page",step:"sfx-step",good:"sfx-learn-good",bad:"sfx-learn-bad",verdict:"sfx-decree",hit:"sfx-expose"};
function vib(k){if(!OPT.vib)return;try{if(navigator.vibrate&&VIB[k])navigator.vibrate(VIB[k])}catch(e){}}
function feedback(k,o){o=o||{};if(SFXN[k])sfx(SFXN[k]);vib(k);if(!OPT.fxon||RM)return;
 const g=$("game");
 if(k==="poison"){fxCls("shake-hard",g);fxOver("vig-red");pxBurst("red",30)}
 else if(k==="expose"){fxCls("shake-hard",g);fxOver("crack")}
 else if(k==="hit"){fxCls("shake",g);fxOver("vig-red")}
 else if(k==="decree"){fxOver("rim-gold");pxBurst("gold",40)}
 else if(k==="promote"){fxOver("rim-gold");pxBurst("gold",60);stamp(o.t||"Tấn phong","gold")}
 else if(k==="verdict"){fxCls("shake",g);stamp(o.t||"Định tội","red")}
 else if(k==="birth"){fxOver("flash-white");pxBurst("petal",50)}
 else if(k==="favour"){pxBurst("petal",24)}
 else if(k==="coin"){coinPop(o.n)}
 else if(k==="ink"){fxOver("ink")}
 else if(k==="ash"){pxBurst("ash",40)}}
function fxCls(c,el){if(!el)return;el.classList.remove(c);void el.offsetWidth;el.classList.add(c);setTimeout(()=>el.classList.remove(c),700)}
function fxOver(c){const d=document.createElement("div");d.className="fxo "+c;document.body.appendChild(d);setTimeout(()=>d.remove(),1300)}
function stamp(t,c){const d=document.createElement("div");d.className="stamp "+(c||"red");d.textContent=t;document.body.appendChild(d);setTimeout(()=>d.remove(),1500)}
function coinPop(n){const e=$("hud-bac");if(!e)return;const r=e.getBoundingClientRect();const d=document.createElement("div");d.className="coinp";d.textContent="◉ +"+(n||"");d.style.left=r.left+"px";d.style.top=r.top+"px";document.body.appendChild(d);setTimeout(()=>d.remove(),900)}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("button");if(b&&!b.disabled)feedback(b.closest("#tabs")?"page":"tap")},true);
/* ---- hooks into the game (wrapping the shared functions, so NPC events show too when they touch the player) ---- */
(function(){const W=(n,f)=>{const o=window[n];if(typeof o!=="function")return;window[n]=f(o)};
 W("bestow",o=>function(p,why){const r=o.apply(this,arguments);if(p===S)feedback("decree");return r});
 W("promoteP",o=>function(p){const r=o.apply(this,arguments);if(r&&p===S)feedback("promote",{t:S.rank>=7?"Phong hậu":"Tấn phong"});return r});
 W("deathSentence",o=>function(p,why){const me=typeof p==="string"||p===S;if(me){feedback("expose");feedback("verdict",{t:"Ban chết"})}else feedback("verdict",{t:"Ban chết"});return o.apply(this,arguments)});
 W("fall",o=>function(p){feedback(p===S?"expose":"ink");feedback("verdict",{t:"Phế"});return o.apply(this,arguments)});
 W("punish",o=>function(p){if(typeof p==="string"||p===S)feedback("hit");return o.apply(this,arguments)});
 W("birthP",o=>function(p){const r=o.apply(this,arguments);if(p===S&&!S.dead)feedback("birth");return r});
 W("nightFx",o=>function(){feedback("night");feedback("favour");return o.apply(this,arguments)});
 W("curtain",o=>function(){feedback("page");inkWipe();return o.apply(this,arguments)});
 W("goTo",o=>function(k){const r=o.apply(this,arguments);if(S&&S.place===k&&k!=="home")feedback("step");if(k==="lc")feedback("ash");return r});
 W("over",o=>function(){const r=o.apply(this,arguments);auTick();return r});
 W("showModal",o=>function(){const r=o.apply(this,arguments);const m=Q[0];if(m){if(m.pid&&!["ksp","prep","night1","night2","shop","giftpick","plantpick","taintpick","evpick","itarget","plantsv"].includes(m.pid)){feedback("heart");heartLoop(true)}else sfx("sfx-open");if(m.cls==="night"||m.pid==="night1"||m.pid==="night2")nightFade()}auTick();return r});
 W("apply",o=>function(fx){const b=S&&S.bac;const r=o.apply(this,arguments);if(S&&!quiet&&S.bac>b)feedback("coin",{n:S.bac-b});return r});
 W("openMG",o=>function(k,lv,cb){return o.call(this,k,lv,g=>{feedback(g>=2?"good":"bad");cb(g)})});
 const P=ACT.poison.f;ACT.poison.f=function(a,t){const r=P.apply(this,arguments);if(t===S||a===S)feedback(t===S?"poison":"ink");return r};
 for(const k of ["frame","kframe","kpoison","musk"]){const F=ACT[k].f;ACT[k].f=function(a,t){const r=F.apply(this,arguments);if(a===S&&/thành|tìm thấy|sảy|trúng|đào được/.test(r)&&!/bị lộ|phát giác|chặn kịp/.test(r))feedback("ink");if(t===S&&!/chặn kịp/.test(r))feedback("hit");return r}}
 W("render",o=>function(){const r=o.apply(this,arguments);try{auTick();pxScene();hudTween();tokAnim()}catch(e){}return r})})();
function inkWipe(){if(!OPT.fxon||RM)return;fxOver("inkwipe")}
function nightFade(){if(!OPT.fxon||RM)return;fxOver("nightf")}
/* HUD numbers count smoothly */
const HV={};function hudTween(){for(const k of ["bac","suc","sung","danh"]){const e=$("hud-"+k);if(!e)continue;const sp=e.querySelector("span"),to=S[k];const fr=HV[k]==null?to:HV[k];HV[k]=to;if(fr===to||RM){sp.textContent=to;continue}
 const t0=performance.now();const st=()=>{const f=Math.min(1,(performance.now()-t0)/500);sp.textContent=Math.round(fr+(to-fr)*f);if(f<1)requestAnimationFrame(st)};requestAnimationFrame(st)}}
/* tokens: slide in only for people who just arrived */
let tokPrev=new Set();function tokAnim(){const now=new Set();document.querySelectorAll("#tokens .tok").forEach(b=>{const n=b.textContent;now.add(n);b.classList.add("bob");if(!tokPrev.has(n)&&!RM)b.classList.add("enter")});tokPrev=now}
/* ---- PixiJS scene layer behind the people; falls back to the static image ---- */
const PX={app:null,loading:false,failed:false,key:"",bg:null,parts:[],tex:{},layer:null,fxl:null,t:0};
function pxLoad(){if(PX.loading||PX.app||PX.failed||RM)return;PX.loading=true;const s=document.createElement("script");s.src="https://cdn.jsdelivr.net/npm/pixi.js@8.5.2/dist/pixi.min.js";s.async=true;
 s.onerror=()=>{PX.failed=true;PX.loading=false};s.onload=async()=>{try{const app=new PIXI.Application();const st=$("stage");await app.init({backgroundAlpha:0,resizeTo:st,antialias:false,autoDensity:true,resolution:Math.min(2,devicePixelRatio||1)});
  app.ticker.maxFPS=60;const c=app.canvas;c.className="pxc";st.insertBefore(c,$("sc-t"));PX.app=app;PX.layer=new PIXI.Container();PX.fxl=new PIXI.Container();app.stage.addChild(PX.layer,PX.fxl);
  const g=new PIXI.Graphics();g.circle(8,8,8).fill(0xffffff);PX.tex.dot=app.renderer.generateTexture(g);const e=new PIXI.Graphics();e.ellipse(10,5,10,5).fill(0xffffff);PX.tex.petal=app.renderer.generateTexture(e);
  app.ticker.add(pxTick);PX.loading=false;PX.key="";pxScene()}catch(err){PX.failed=true;PX.loading=false}};document.head.appendChild(s)}
function pxCap(){return innerWidth<700?60:120}
function pxKind(){const P=placeOf(S.place),night=(S.buoi||0)===2,out=["vuon","lc","home"].includes(P.sc),w=S.wx?S.wx.k:"dust";
 if(out){const m={petal:"petal",rain:"rain",mist:"smoke",dust:night?"fly":"dust",sun:"dust",storm:"rain",leaf:"leaf",wind:"leaf",snow:"snow",snowh:"snow",frost:"snow",snowp:"snow"}[w]||"dust";return m}
 if(P.sc==="tn")return"smoke";if(P.sc==="thu")return"dust";if(night)return"fly";return w==="rain"||w==="storm"?"rain":"dust"}
async function pxScene(){if(!S||RM||!OPT.fxon){if(PX.app)PX.app.canvas.style.display="none";return}if(!PX.app){pxLoad();return}PX.app.canvas.style.display="";
 lightTick();const P=placeOf(S.place),k=P.sc+"|"+pxKind()+"|"+(S.wx?S.wx.k:"")+"|"+(S.buoi||0);if(PX.key===k)return;PX.key=k;
 for(const p of PX.parts)p.destroy();PX.parts=[];if(PX.bg){PX.bg.destroy({texture:false});PX.bg=null}
 const src=SCIMG[P.sc]?`img/${SCIMG[P.sc]}.webp`:null;if(src){try{const t=await PIXI.Assets.load(src);if(PX.key!==k)return;const sp=new PIXI.Sprite(t);sp.anchor.set(.5);PX.bg=sp;PX.layer.addChildAt(sp,0);$("scimg").style.opacity="0"}catch(e){$("scimg").style.opacity="1"}}else $("scimg").style.opacity="1";
 const kind=pxKind(),wk2=S.wx?S.wx.k:"",heavy=wk2==="snowh"||wk2==="storm",n=Math.round(pxCap()*(kind==="smoke"?.3:heavy?1:kind==="rain"?.6:.45));for(let i=0;i<n;i++)PX.parts.push(mkPart(kind,true));
 if(wk2==="snowp")for(let i=0;i<Math.round(n/4);i++)PX.parts.push(mkPart("petal",true));
 if((S.buoi||0)===2){const pts=[[.12,.3],[.88,.3],[.3,.18],[.7,.18]];pts.forEach(([x,y],i)=>{const g=mkPart("dust",true);g.v.kind="lamp";g.v.vx=0;g.v.vy=0;g.tint=0xffb050;g.scale.set(2.2);g.blendMode="add";g.alpha=0;g.v.on=i*40;g.v.fx=x;g.v.fy=y;PX.parts.push(g)});if(["vuon","lc","home"].includes(P.sc))for(let i=0;i<14;i++){const s=mkPart("dust",true);s.v.kind="star";s.v.vx=0;s.v.vy=0;s.tint=0xffffff;s.scale.set(.12);s.v.fy=Math.random()*.25;PX.parts.push(s)}}}
const PCOL={petal:[0xf4b6c8,0xf9d3dc,0xffffff],snow:[0xffffff],leaf:[0x9a9a8a,0x7a7a6a],dust:[0xfff2c0],fly:[0xfff07a],smoke:[0xcfc6bc],rain:[0xbcd0e0],gold:[0xf0d070,0xd9b25f],red:[0xc02a2a],ash:[0x6a6a6a,0x9a9a9a]};
function mkPart(kind,scatter,x0,y0){const W=PX.app.renderer.width/PX.app.renderer.resolution,H=PX.app.renderer.height/PX.app.renderer.resolution;const sp=new PIXI.Sprite(kind==="petal"||kind==="leaf"||kind==="gold"?PX.tex.petal:PX.tex.dot);
 const c=PCOL[kind]||[0xffffff];sp.tint=c[R(c.length)];sp.anchor.set(.5);const s={petal:.5,snow:.3,leaf:.6,dust:.15,fly:.25,smoke:2.2,rain:.12,gold:.6,red:.5,ash:.3}[kind]||.3;sp.scale.set(s*(.6+Math.random()*.8));
 sp.x=x0!=null?x0:Math.random()*W;sp.y=y0!=null?y0:(scatter?Math.random()*H:-10);sp.alpha=kind==="smoke"?.18:kind==="dust"?.5:.85;
 sp.v={kind,vx:(Math.random()-.5)*(kind==="rain"?.3:.6),vy:{petal:.5,snow:.4,leaf:.6,dust:-.05,fly:0,smoke:-.35,rain:6,gold:1.2,red:0,ash:.5}[kind]+Math.random()*.4,ph:Math.random()*6.28,life:x0!=null?90:1e9};
 if(kind==="rain")sp.scale.set(.1,1.2);if(x0!=null){sp.v.vx=(Math.random()-.5)*6;sp.v.vy=-Math.random()*5}
 (x0!=null?PX.fxl:PX.layer).addChild(sp);return sp}
function pxTick(tk){const d=tk.deltaTime,W=PX.app.renderer.width/PX.app.renderer.resolution,H=PX.app.renderer.height/PX.app.renderer.resolution;PX.t+=d/60;
 if(PX.bg){const sc=Math.max(W/PX.bg.texture.width,H/PX.bg.texture.height)*1.08;PX.bg.scale.set(sc*(1+.03*Math.sin(PX.t/9)));PX.bg.x=W/2+Math.sin(PX.t/13)*W*.02;PX.bg.y=H/2+Math.cos(PX.t/17)*H*.015}
 PX.flash=(PX.flash||0)*.9;if(S&&S.wx&&S.wx.k==="storm"&&Math.random()<.003*d){PX.flash=1;sfx("sfx-thunder")}$("stage").style.setProperty("--fl",PX.flash.toFixed(2));
 for(const p of PX.parts){const v=p.v;if(v.kind==="lamp"){if(v.on>0){v.on-=d}else p.alpha=Math.min(.55,p.alpha+.01*d)*(RM?1:.85+.15*Math.sin(PX.t*9+v.ph));p.x=v.fx*W;p.y=v.fy*H;continue}if(v.kind==="star"){p.y=v.fy*H;p.alpha=.5+.4*Math.sin(PX.t*2+v.ph);continue}v.ph+=.02*d;if(S&&S.wx&&S.wx.k==="wind")p.x+=1.2*d;p.x+=(v.vx+Math.sin(v.ph)*.3)*d;p.y+=v.vy*d;if(v.kind==="fly"){p.alpha=.4+.5*Math.sin(v.ph*3);p.x+=Math.sin(v.ph*1.3)*.4*d;p.y+=Math.cos(v.ph)*.4*d}if(v.kind==="petal"||v.kind==="leaf")p.rotation+=.02*d;
  if(p.y>H+12){p.y=-10;p.x=Math.random()*W}if(p.y<-20){p.y=H+10;p.x=Math.random()*W}if(p.x<-20)p.x=W+10;if(p.x>W+20)p.x=-10}
 for(const p of PX.fxl.children.slice()){const v=p.v;v.vy+=.15*d;p.x+=v.vx*d;p.y+=v.vy*d;p.rotation+=.05*d;v.life-=d;p.alpha=Math.max(0,v.life/90);if(v.life<=0)p.destroy()}}
function pxBurst(kind,n){if(!PX.app||RM||!OPT.fxon)return;const W=PX.app.renderer.width/PX.app.renderer.resolution,H=PX.app.renderer.height/PX.app.renderer.resolution;n=Math.min(n,pxCap());for(let i=0;i<n;i++)mkPart(kind,false,W/2+(Math.random()-.5)*W*.5,H*.45)}
/* ---- settings pop-over on the title screen ---- */
function optHTML(){return `<div class="optbox"><button class="btn" id="o-snd">${OPT.snd?"Tắt âm thanh":"Bật âm thanh"}</button>
 <label>Nhạc <input type="range" id="o-mus" min="0" max="1" step=".05" value="${OPT.mus}"></label><label>Hiệu ứng âm <input type="range" id="o-sfx" min="0" max="1" step=".05" value="${OPT.sfx}"></label><label>Giọng <input type="range" id="o-vo" min="0" max="1" step=".05" value="${OPT.vo==null?.7:OPT.vo}"></label>
 <label><input type="checkbox" id="o-mute" ${OPT.mute?"checked":""}> Tắt tiếng</label><label><input type="checkbox" id="o-vib" ${OPT.vib?"checked":""}> Rung</label><label><input type="checkbox" id="o-fx" ${OPT.fxon?"checked":""}> Hiệu ứng hình</label></div>`}
function wireOpt(){const T=$("title");if(!T)return;let b=T.querySelector(".optwrap");if(!b){b=document.createElement("div");b.className="optwrap";T.querySelector(".tbox").appendChild(b)}b.innerHTML=optHTML();
 $("o-snd").onclick=()=>{OPT.snd=!OPT.snd;AU.unlocked=true;saveOpt();wireOpt();auTick();if(OPT.snd)sfx("sfx-tap")};
 $("o-mus").oninput=e=>{OPT.mus=+e.target.value;saveOpt();auTick()};$("o-sfx").oninput=e=>{OPT.sfx=+e.target.value;saveOpt()};if($("o-vo"))$("o-vo").oninput=e=>{OPT.vo=+e.target.value;saveOpt();voice("f-softlaugh",1)};
 $("o-mute").onchange=e=>{OPT.mute=e.target.checked;saveOpt();auTick()};$("o-vib").onchange=e=>{OPT.vib=e.target.checked;saveOpt()};$("o-fx").onchange=e=>{OPT.fxon=e.target.checked;saveOpt();pxScene()}}
(function(){const o=window.showTitle;if(typeof o==="function")window.showTitle=function(){const r=o.apply(this,arguments);try{wireOpt()}catch(e){}return r}})();
/* ================= WEATHER AND LIGHT ================= */
const WX={Xuân:[["hoa đào bay","petal",0],["mưa phùn","rain",1],["sương sớm","mist",0],["trời quang","dust",0]],
 Hạ:[["nắng gắt","sun",2],["ve kêu râm ran","sun",0],["giông tố","storm",3],["đom đóm","dust",0]],
 Thu:[["lá phong rơi","leaf",0],["nắng vàng","sun",0],["gió heo may","wind",0],["trăng rằm","dust",0]],
 Đông:[["tuyết nhẹ","snow",1],["tuyết dày","snowh",4],["sương giá","frost",0],["mai nở trong tuyết","snowp",0]]};
/* flags: 1 wet, 2 heat, 3 storm, 4 heavy snow */
function rollWx(){const L=WX[SEASON[S.month-1]];const w=pick(L);S.wx={n:w[0],k:w[1],f:w[2]};
 if(w[2]===3){if(has("nongnay"))S.emp.mood=3;else if(S.emp.mood<2)S.emp.mood=2;S.storms=(S.storms||0)+1}
 if(w[2]===2&&has("nongnay")&&S.emp.mood<2)S.emp.mood=2;
 if((w[0]==="trăng rằm"||w[0]==="hoa đào bay"||w[0]==="mai nở trong tuyết")&&(has("datinh")||has("mesac")))S.emp.mood=0;
 if(w[2]===4&&has("chamchinh")&&S.emp.mood===0)S.emp.mood=1}
function wet(){return S&&S.wx&&[1,3,4].includes(S.wx.f)}
function harsh(){return S&&S.wx&&(S.wx.f===2||S.wx.f===4)}
function wxName(){return S&&S.wx?`${SEASON[S.month-1]} · ${S.wx.n}`:SEASON[S.month-1]}
/* light by buổi, smooth CSS overlay (works without the scene layer) */
function lightTick(){const st=$("stage");if(!st||!S)return;let L=st.querySelector(".light");if(!L){L=document.createElement("div");L.className="light";st.insertBefore(L,$("sc-t"))}
 const b=S.buoi||0,late=used>=2;const c=b===0?"rgba(170,200,255,.16)":b===1?(late?"rgba(255,130,50,.22)":"rgba(255,210,120,.14)"):"rgba(14,24,70,.5)";
 const w=wet()?(b===2?",rgba(40,50,80,.25)":",rgba(90,100,120,.18)"):S.wx&&(S.wx.k==="frost"||S.wx.k.startsWith("snow"))?",rgba(200,225,255,.16)":"";
 L.style.background=`linear-gradient(${c},${c})${w?`,linear-gradient(${w.slice(1)},${w.slice(1)})`:""}`;document.body.dataset.buoi=b;
 st.classList.toggle("frost",!!(S.wx&&S.wx.k==="frost"))}
/* ================= ILLNESS: one rulebook for every person ================= */
const ILL={phonghan:{n:"Phong hàn",sea:["Thu","Đông"],die:0,cont:1},sotret:{n:"Sốt rét",sea:["Hạ"],die:.5},kietly:{n:"Kiết lỵ",sea:["Hạ"],die:.6,cont:1},
 lao:{n:"Lao phổi",slow:1,die:1,sac:-1},daumua:{n:"Đậu mùa",cont:1,die:1,scar:-8},tambenh:{n:"Tâm bệnh",die:0,sung:-2},hausan:{n:"Hậu sản",die:.5},
 docman:{n:"Trúng độc mãn tính",die:.8},matngu:{n:"Chứng mất ngủ",die:0},longthe:{n:"Long thể bất an",die:.6}};
const STG=["","nhẹ","nặng","nguy kịch"];
function illOf(p){return p&&p.ill&&ILL[p.ill.k]?p.ill:null}
function illName(p){const i=illOf(p);return i?`${ILL[i.k].n} · ${STG[i.st]}`:""}
function illKnown(p){const i=illOf(p);if(!i)return false;return p===S||i.known||ILL[i.k].cont&&i.st>=2||S.mat>=3}
function catchIll(p,k){if(illOf(p)||p.dead||p.alive===false)return"";p.ill={k,st:1,known:p===S};return p===S?`<span class="r">Ngươi mắc ${ILL[k].n.toLowerCase()}.</span> `:""}
function careOdds(p){return (p.doctor?15:0)+(p.arts?p.arts.y*5:0)+(p.anthai?5:0)}
function illMonthP(p){const me=p===S;let ev="";const i=illOf(p);
 if(!i){const sea=SEASON[S.month-1];let base=1.5+(p.suc<40?4:0)+(S.storms||0)*1.5;const L=Object.entries(ILL).filter(([k,d])=>d.sea&&d.sea.includes(sea));
  if(roll(base+(L.length?3:0))){const k=L.length&&roll(70)?pick(L)[0]:pick(["lao","matngu","phonghan"]);ev+=catchIll(p,k)}
  else if((p.sung<10||p.out)&&roll(6))ev+=catchIll(p,"tambenh");
  else if((p.inv||[]).some(e=>e.t==="chi"||e.t==="meo")&&roll(10))ev+=catchIll(p,"docman");
  else{const near=others(p).find(x=>illOf(x)&&ILL[x.ill.k].cont&&(together(p,x)||sameHouse(p,x)));if(near&&roll(8))ev+=catchIll(p,near.ill.k)}
  return ev}
 const d=ILL[i.k];ap(p,{suc:-5*i.st});if(d.sac)ap(p,{sac:d.sac});if(d.sung)ap(p,{sung:d.sung});
 const c=careOdds(p);if(roll(30+c-(d.slow?15:0))){p.ill=null;if(d.scar)ap(p,{sac:d.scar});return ev+(me?`Ngươi khỏi ${d.n.toLowerCase()}${d.scar?", nhưng mặt để lại sẹo (Sắc "+d.scar+")":""}. `:"")}
 if(i.st<3&&roll(35-c/2)){i.st++;if(me)ev+=`<span class="r">${d.n} trở ${STG[i.st]}.</span> `}
 else if(i.st===3&&d.die&&roll(25*d.die)){if(me){die(`${d.n} nguy kịch, không qua khỏi`);return ev}p.alive=false;if(p.queen)p.queen=false;return ev+`<span class="r">${p.name} mất vì ${d.n.toLowerCase()}.</span> `}
 return ev}
function epidemic(){const P=consorts().filter(p=>p===S||p.alive&&!p.out);if(!roll(1.2))return"";const h=pick(P),hk=houseOf(h);let ev=`<span class="r">Dịch đậu mùa phát ở ${houseName(h)==="cung riêng"?"cung "+NM(h):houseName(h)}.</span> Cả cung bị phong tỏa một tháng. `;
 for(const p of P)if(houseOf(p)===hk){if(roll(35))ev+=catchIll(p,"daumua")||(p!==S?`${p.name} nhiễm bệnh. `:"");p.confined=Math.max(p.confined||0,1);for(const k of kidsOf(p))if(roll(45)){k.hp-=40;if(k.hp<=0)ev+=kidDie(k,"mất vì đậu mùa",p===S)}(p.staff||[]).slice().forEach(s=>{if(roll(10))p.staff.splice(p.staff.indexOf(s),1)})}
 return ev}
function illMonth(){let ev="";for(const p of consorts())ev+=illMonthP(p);ev+=epidemic();
 if(S.emp.age>50&&!illOf(S.emp)&&roll(3)){S.emp.ill={k:"longthe",st:1,known:true};S.emp.mood=2;ev+="Long thể bất an, Hoàng thượng ít vào hậu cung. "}
 else if(illOf(S.emp)){if(roll(35)){S.emp.ill=null;ev+="Long thể đã an. "}else if(S.emp.ill.st<3&&roll(30))S.emp.ill.st++}
 if(!S.thDead){if(!S.thIll&&roll(2))S.thIll={k:pick(["phonghan","lao"]),st:1,known:true};else if(S.thIll){if(roll(30))S.thIll=null;else if(S.thIll.st<3)S.thIll.st++;else if(roll(20)){S.thDead=true;S.th=0;ev+="<b>Thái hậu băng hà vì bệnh.</b> "}}}
 for(const p of consorts())if(p.fakeIll){p.fakeIll--;if(roll(15)){p.fakeIll=0;ap(p,{danh:-6});punish(p,"giả bệnh khi quân",1);if(p===S)ev+=`<span class="r">Thái y khác bắt mạch: ngươi giả bệnh.</span> `}}
 return ev}
/* the Emperor avoids the sick; quarantine blocks nights */
function illNightF(p){const i=illOf(p);if(p.fakeIll)return 1.2;return !i?1:ILL[i.k].cont?0:i.st>=2?.3:.7}
function treat(p,way){const i=illOf(p);if(!i)return"";let o=lotB(p,"Sức khỏe")+(way==="ty"?55+careOdds(p):way==="self"?30+p.arts.y*8:20+careOdds(p));
 const bribed=liveRivals(true).find(v=>v!==p&&S.court&&(S.court.ty.af[v.id]||0)>=30&&hostility(v,p)>=40);
 if(way==="ty"&&bribed&&roll(25)){i.st=Math.min(3,i.st+1);return `<span class="r">Thang thuốc của thái y làm bệnh nặng thêm.</span> (Có kẻ đã mua chuộc thái y?) `}
 if(roll(cl(o,5,95))){p.ill=null;return `${NMc(p)} khỏi bệnh. `}if(i.st>1&&roll(50)){i.st--;return `Bệnh đỡ, còn ${STG[i.st]}. `}return "Bệnh chưa thuyên giảm. "}
function illCards(){const A=[];const i=illOf(S);
 if(i){A.push({n:"Truyền thái y",t:`Mời thái y đến chữa ${ILL[i.k].n.toLowerCase()}.`,c:{bac:-40},o:100,k:2,w:{},x:"có thể khỏi bệnh",go:()=>log(treat(S,"ty"))});
  if(S.arts.y>=3)A.push({n:"Tự bốc thuốc",t:"Dùng y thuật của mình.",c:{suc:-5},o:100,k:2,w:{},x:`Y thuật bậc ${S.arts.y}`,go:()=>log(treat(S,"self"))});
  A.push({n:"Tĩnh dưỡng",t:"Đóng cửa nằm nghỉ cả buổi.",c:{},o:100,k:4,w:{suc:15},x:"có thể khỏi bệnh",go:()=>log(treat(S,"rest"))})}
 else if(!S.fakeIll)A.push({n:"Giả bệnh",t:"Cáo bệnh để Hoàng thượng thương xót, tránh việc khó.",c:{duc:-3},o:100,k:1,w:{sung:3},x:"dễ được thăm; thái y ngay thẳng có thể lật tẩy",go:()=>{S.fakeIll=2}});
 return A}

/* ================= THE TUẦN'S FORTUNE: xin xăm ================= */
const LV=["Thượng thượng","Thượng","Trung","Hạ","Hạ hạ"],LVB=[10,5,0,-5,-10];
const DOMS=["Sủng","Danh","Mưu kế","Con cái","Sức khỏe","Tài nghệ","Giao thiệp","Hung"];
const LOTS=[[0,"Phượng hoàng đậu ngọn ngô đồng,\nMây lành năm sắc phủ hoàng cung.","Mọi việc hanh thông, cơ hội lớn."],[0,"Trăng tròn soi giữa hồ thu,\nThuyền xuôi gió thuận, mây mù tan hết.","Điều mong sẽ thành."],[0,"Cành mai nở giữa tuyết sương,\nMột mình đứng vững, trăm hương cúi đầu.","Vững lòng thì thắng."],[0,"Rồng về biển cả, hổ về non,\nĐúng thời đúng chỗ, việc nào cũng tròn.","Thời vận đang đến."],[0,"Mưa xuân thấm đất, lúa đâm bông,\nGieo gì gặt nấy, chẳng uổng công.","Công sức được đền đáp."],[0,"Ngọc trong đá vỡ lộ ánh quang,\nNgười tài gặp chủ, rạng muôn phương.","Tài năng được thấy."],
 [1,"Gió đông đưa cánh én về,\nTin vui đâu đó gần kề cửa son.","Có tin mừng nhỏ."],[1,"Sen nở hồ trong, hương ngát xa,\nLòng ngay thì chẳng sợ ai gièm pha.","Giữ đức, được lợi."],[1,"Đường xa có bạn cùng đi,\nKhó khăn chia sẻ, ngại gì gian nan.","Nên kết giao."],[1,"Nước chảy đá mòn, chí chẳng sờn,\nTừng bước vững vàng, quả ngọt hơn.","Kiên nhẫn sẽ thành."],[1,"Đèn khuya soi quyển sách hiền,\nChữ vàng nét ngọc, tiếng truyền bốn phương.","Học hành có tiến bộ."],[1,"Trúc xanh qua bão vẫn còn,\nCong mình theo gió, chẳng mòn gốc sâu.","Mềm mỏng thì yên."],
 [2,"Mây che nửa mảnh trăng rằm,\nViệc chưa rõ ngọn, chớ lầm vội tin.","Chưa tốt chưa xấu, nên chờ."],[2,"Thuyền đi giữa khúc sông dài,\nChẳng nhanh chẳng chậm, chớ nài sóng to.","Bình thường."],[2,"Hoa nở có lúc, tàn có khi,\nThuận theo trời đất, lo gì mai sau.","Thuận theo tự nhiên."],[2,"Ngựa hay chưa gặp người hay,\nHãy còn chờ đợi một ngày mai sau.","Thời chưa đến."],[2,"Chén trà nguội giữa đêm thanh,\nLòng người khó đoán, chớ đành nói ra.","Giữ lời."],[2,"Cửa đóng then cài, khách chửa sang,\nYên ổn trong nhà, chớ ra đàng xa.","Ở yên là hơn."],
 [3,"Gió tây thổi lạnh ngõ cung,\nLời ngon tiếng ngọt, độc trong chén vàng.","Coi chừng người gần."],[3,"Lá vàng rụng xuống thềm rêu,\nViệc mong chưa tới, sầu nhiều hơn vui.","Việc khó thành."],[3,"Mưa dầm nước ngập lối đi,\nBước chân chậm lại, chớ thì tranh đua.","Nên lùi một bước."],[3,"Chim lạc bầy giữa trời đông,\nMột mình khó chống bão giông bốn bề.","Thiếu người giúp."],[3,"Gương mờ khó thấy mặt mình,\nLòng còn mê muội, chớ đành ra tay.","Đừng hành động vội."],[3,"Hương tàn khói tắt giữa đêm,\nNgười đi chẳng lại, nỗi niềm ai hay.","Có điều buồn."],
 [4,"Rắn độc nằm trong bụi hoa,\nBước chân chẳng cẩn, máu sa thềm hồng.","Đại hung, coi chừng mưu hại."],[4,"Thuyền con gặp sóng giữa dòng,\nBuồm rách lái gãy, mênh mông bốn bề.","Nguy hiểm, nên giữ mình."],[4,"Trăng khuyết, đèn tắt, cửa cài,\nTiếng cú kêu sương, ai hay lòng người.","Có kẻ hãm hại trong tối."],[4,"Cây cao gió lớn dễ nghiêng,\nDanh cao hiểm lắm, ưu phiền theo sau.","Danh vọng gặp họa."],[4,"Hổ dữ rình bên suối khuya,\nĐi đêm một bước, chia lìa trăm năm.","Chớ mạo hiểm."],[4,"Mây đen kéo kín trời tây,\nMưa giông sấm sét, đổ ngay trên đầu.","Tai họa bất ngờ."]];
/* each verse speaks of one domain; the lot's domain is the verse's */
const LDOM=["Sủng","Giao thiệp","Danh","Mưu kế","Con cái","Tài nghệ","Con cái","Danh","Giao thiệp","Mưu kế","Tài nghệ","Sức khỏe","Mưu kế","Giao thiệp","Con cái","Sủng","Giao thiệp","Sức khỏe","Sức khỏe","Sủng","Danh","Giao thiệp","Mưu kế","Con cái","Hung","Sức khỏe","Hung","Danh","Mưu kế","Hung"];
function drawLot(p,better){const pickL=()=>{const i=R(LOTS.length);return{i,lv:LOTS[i][0],dom:LDOM[i]||"Sủng"}};let l=pickL();if(better){const m=pickL();if(m.lv<l.lv)l=m}p.lot=l;return l}
function lotB(p,dom){return p&&p.lot&&dom&&p.lot.dom===dom?LVB[p.lot.lv]:0}
const LADW=["Liều","Khó","Năm ăn năm thua","Khá chắc","Chắc","Rất chắc","Nắm chắc"];
function ladI(o){return LADW.indexOf(word(cl(Math.round(o),5,95)))}
/* the lot's pull on one card, in ladder steps; o = the odds before the lot */
function lotTag(dom,o){const b=lotB(S,dom);if(!b)return"";const d=o==null?0:ladI(o+b)-ladI(o);return ` · Quẻ: ${b<0?"khó":"dễ"} hơn ${d?Math.abs(d)+" bậc":"một chút"}`}
/* the lot in plain words: scope, direction, the cards it touches */
function lotEffect(l){if(!l)return"";if(l.dom==="Hung")return l.lv>=3?"Tuần này phi tần dễ ra tay hại ngươi hơn (gấp rưỡi). Nên giữ mình, ít ra ngoài.":"";const b=LVB[l.lv];if(!b)return"Tuần này không có gì thay đổi.";
 const names=[...new Set((deck||[]).filter(a=>a.dom===l.dom).map(a=>a.n).concat(Object.keys(ACTDOM).filter(k=>ACTDOM[k]===l.dom&&ACT[k]).map(k=>ACT[k].n)))].slice(0,5);
 const st=Math.abs(b)>=10?"khoảng một bậc":"nửa bậc";const ex=b<0?(Math.abs(b)>=10?"Chắc → Khá chắc":"có khi Chắc → Khá chắc"):(b>=10?"Khá chắc → Chắc":"có khi Khá chắc → Chắc");
 return `Tuần này: các việc thuộc «${l.dom}» ${b<0?"khó":"dễ"} thành hơn ${st} (${ex}).${names.length?` Gồm: ${names.join(", ")}${names.length>=5?"…":""}.`:""}`}
function lotHTML(l){const L=LOTS[l.i];return `<div class="xam"><div class="tube">籤</div><div class="stick">${LV[l.lv]}</div></div><p style="text-align:center"><b>Quẻ ${LV[l.lv]}</b> · ${l.dom}</p><p style="text-align:center;font-style:italic">${L[1].replace("\n","<br>")}</p><p class="past" style="text-align:center">${L[2]}</p><p style="text-align:center"><span class="ef ${LVB[l.lv]<0||(l.dom==="Hung"&&l.lv>=3)?"r":LVB[l.lv]>0?"g":"n"}">${lotEffect(l)}</span></p>`}
function newLots(){const l=drawLot(S,false);S.relot=0;for(const v of liveRivals(true))drawLot(v,false);log(`Xin xăm: quẻ ${LV[l.lv]} · ${l.dom}.`);if(!window.__dawnOn)Q.push({t:"Gieo quẻ đầu tuần",h:lotHTML(l)})}
function reLot(better){if(S.dead||Q.length)return;if(!better){if(S.relot||S.bac<10||!can(1))return;apply({bac:-10});spend(1);S.relot=1}const l=drawLot(S,!!better);log(`Gieo lại: quẻ ${LV[l.lv]} · ${l.dom}.`);Q.push({t:better?"Xin xăm ở Phật đường":"Gieo lại quẻ",h:lotHTML(l)});render()}
/* which domain an act belongs to */
const ACTDOM={spy:"Mưu kế",frame:"Mưu kế",poison:"Mưu kế",rumor:"Mưu kế",bribe:"Mưu kế",block:"Mưu kế",musk:"Mưu kế",catswap:"Mưu kế",ksab:"Mưu kế",kpoison:"Mưu kế",pond:"Mưu kế",kframe:"Mưu kế",plant:"Mưu kế",accuse:"Danh",vp:"Danh",takeaway:"Con cái",ally:"Giao thiệp",gift:"Giao thiệp",steal:"Sủng",road:"Sủng"};
/* ================= LÃNH CUNG: a playable state for every consort ================= */
function cold(why){if(S.dead)return;if(S.out)return;S.out=1;S.coldWhy=why;S.coldRank=S.rank;S.coldTurn=S.turn;S.rank=0;S.confined=0;S.preg=S.fake?0:S.preg;S.fake=0;
 const keep=(S.staff||[]).filter(s=>s.loyal>=70).slice(0,1);(S.staff||[]).filter(s=>!keep.includes(s)).forEach(s=>{});S.staff=keep;
 log(`<span class="r">${why}. Ngươi bị đưa vào lãnh cung.</span>`);Q.push({t:"Lãnh cung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Cửa lãnh cung đóng lại sau lưng. Bổng lộc chỉ còn chút gạo mốc, kẻ hầu bỏ đi gần hết${keep.length?`; chỉ ${keep[0].name} ở lại`:""}.</p><p class="past">Chưa hết đường: minh oan, cầu xin, nhờ người bên ngoài, hay chờ ân xá.</p>`,btn:"Bước vào"});coldVisit();deal()}
function coldVisit(){S.place="lc";const f=rivals.filter(v=>v.alive&&v.out);S.visit={k:"lc",people:f.slice(0,4).map(v=>({kind:"fallen",ref:v,name:v.name,ini:v.name.split(" ").pop()[0],col:"#6a7a8a",info:"Phế phi · cùng cảnh ngộ"})),talked:false,tk:{},msg:"Gió lùa qua song cửa mục. Ở đây chỉ có những người bị quên lãng."}}
function restore(full,why){S.out=0;S.rank=full?S.coldRank:Math.max(0,S.coldRank-1);S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.lastPromo=S.turn;fillStaff(S,true);
 log(`<b class="g">${why}. Ngươi được rời lãnh cung, phục vị ${RANKS[S.rank].n}.</b>`);Q.push({t:"Rời lãnh cung",cls:"end",who:pMe(),h:`<p>${why}.</p><p>Ngươi được phục vị <b>${RANKS[S.rank].n}</b>.</p>`,btn:"Tạ ơn"});deal();if(typeof feedback==="function")feedback("decree")}
function coldActs(){const A=[],fr=liveRivals(true).filter(v=>aff(v,S)>=40),f=facOf(S),son=mySons().find(k=>k.age>=8);
 A.push({n:"Cầu xin",t:"Đút bạc cho lính gác, gửi thư lên Dưỡng Hòa điện.",c:{bac:-20},o:od(10+S.an/2+S.sung/4),k:2,w:{},l:{},x:"được tha",go:()=>restore(false,"Hoàng thượng đọc thư, động lòng")});
 if(fr.length||f||(S.dad||0)>=50)A.push({n:"Nhờ người bên ngoài",t:fr.length?`Nhờ ${fr[0].name} nói giúp.`:f?`Nhờ ${f.name} vận động.`:"Nhờ cha ở triều đình dâng sớ.",c:{bac:-10},o:od(15+(fr.length?aff(fr[0],S)/3:0)+(f?facStr(f)/10:0)+(S.dad||0)/5),k:2,w:{},l:{},x:"được tha",go:()=>restore(false,"Có người bên ngoài nói giúp")});
 if(S.framedBy!=null){const b=byKey(S.framedBy);A.push({n:"Tìm chứng cứ minh oan",t:`Tra lại vụ án. Chứng cứ: ${S.coldEv||0}/2.`,c:{suc:-10},o:od(35+S.mat*6+S.tamco/5),k:2,w:{},l:{},x:"chứng cứ +1; đủ 2 thì phục vị trọn vẹn",go:()=>{S.coldEv=(S.coldEv||0)+1;if(S.coldEv>=2){restore(true,"Án được lật, ngươi được minh oan");if(b&&(b===S||b.alive))fall(b,"bị lật tẩy vu oan người khác")}}})}
 if(S.an>=30)A.push({n:"Gửi bài thơ cũ",t:"Chép lại bài thơ đêm nào ngài khen, nhờ người lén dâng.",c:{},o:od(10+S.an/2+S.arts.thi*8),k:2,w:{},l:{},x:"ngài nhớ chuyện cũ",go:()=>restore(false,"Hoàng thượng đọc bài thơ cũ, nhớ chuyện xưa")});
 if(son)A.push({n:`Nhờ ${son.name} cầu xin`,t:"Con quỳ trước Dưỡng Hòa điện xin cho mẹ.",c:{},o:od(15+son.fond/2),k:1,w:{},l:{},x:"được tha",go:()=>restore(false,`${son.name} quỳ khóc xin cho mẹ`)});
 A.push({n:"Chép kinh, giữ đức",t:"Ngày ngày chép kinh Kim Cương.",c:{suc:-3},o:100,k:2,w:{duc:3}},{n:"Trồng rau",t:"Cuốc đất sau sân, trồng rau mà ăn.",c:{},o:100,k:2,w:{suc:6}},{n:"Thêu khăn bán",t:"Nhờ lính gác đem ra ngoài bán.",c:{suc:-5},o:od(70),k:2,w:{bac:10},l:{}},
  {n:"Xuất gia",t:"Cắt tóc đi tu, rời bỏ hồng trần.",c:{},o:100,k:4,w:{},x:"kết thúc kiếp này, yên ổn (sẽ hỏi lại)",go:()=>xgConfirm(()=>over("Xuất gia",`${S.name} cạo tóc, vào chùa Bảo Hoa tu hành, sống nốt quãng đời thanh tịnh.`,"Xuất gia"))});
 return A}
function coldMonth(){let ev="";
 if(S.out){apply({bac:2});const w=SEASON[S.month-1]==="Đông";apply({suc:w?-12:-6});if(w&&roll(8)){apply({suc:-20});ev+=`<span class="r">Đêm đông giá buốt, lãnh cung không than sưởi.</span> Sức -20. `}
  if(illOf(S)&&S.ill.k==="tambenh"&&S.ill.st>=3&&roll(30)){over("Lãnh cung","Ngươi u uất thành điên dại, sống nốt quãng đời trong lãnh cung.","Phát điên trong lãnh cung");return ev}
  if(!S.thDead&&S.th>=50&&roll(10)){restore(false,"Thái hậu mở lòng từ bi");return ev}
  if((S.month===1||S.month===8)&&roll(25)){restore(false,S.month===1?"Đại xá đầu năm":"Đại xá nhân tiết Vạn thọ");return ev}
  if(S.suc<=0){die("Chết rét, chết đói trong lãnh cung");return ev}}
 for(const v of rivals){if(!v.alive||!v.out)continue;ap(v,{suc:-4});if(v.suc<=0){v.alive=false;continue}
  if(roll(3)||(v.th>=50&&roll(5))){v.out=false;v.rank=0;v.lastPromo=S.turn;v.oan=cl((v.oan||0)+20,0,100);ev+=`${v.name} được tha khỏi lãnh cung, phục vị ${RANKS[0].n}. `;if(v.coldBy!=null){const b=byKey(v.coldBy);if(b)oanAdd(v,b,40)}}}
 return ev}

/* ================= SERVANT RANKS ================= */
const SRK={maid:["Cung nữ thô sử","Cung nữ","Đại cung nữ","Chưởng sự cô cô","Nữ quan"],eunuch:["Tiểu thái giám","Thái giám","Thủ lĩnh thái giám","Tổng quản thái giám"]};
function srk(s){return s.rk==null?(s.rk=1):s.rk}
function srkName(s){return SRK[s.role][srk(s)]}
function srkMax(o,s){const r=rkOf(o);if(s.role==="maid")return r>=7?4:r>=4?3:2;return r>=5?3:r>=3?2:1}
function servMerit(s,n){s.mp=(s.mp||0)+n}
function servRanks(){let ev="";for(const p of consorts()){const L=p.staff||[];for(const s of L.slice()){const o=p;servMerit(s,1+Math.floor(rkOf(o)/3));
  if((s.mp||0)>=(srk(s)+1)*5&&srk(s)<srkMax(o,s)){s.rk++;s.mp=0;s.loyal=cl(s.loyal+5,0,100);if(p===S)ev+=`${s.name} được thăng ${srkName(s)}. `}
  if(srk(s)>=2)ap(p,{bac:-Math.floor(srk(s)/2)});
  if(s.role==="maid"&&srk(s)>=2&&roll(1.2)&&roomFor("consort")){p.staff.splice(p.staff.indexOf(s),1);const n=newRival(0);Object.assign(n,drawFace());relAdd(p,n,s.loyal>=60?25:-25);rivals.push(n);ev+=`${s.name}, ${srkName(s).toLowerCase()} của ${NM(p)}, lọt mắt xanh Hoàng thượng, được phong ${RANKS[0].n} ${n.name}${s.loyal>=60?", vẫn nhớ ơn chủ cũ":", quay lưng với chủ cũ"}. `;continue}
  if(srk(s)>=2&&roll(1.5)){const big=consorts().find(x=>x!==p&&rkOf(x)>rkOf(p)+1&&(x.bac||0)>=60);if(big){p.staff.splice(p.staff.indexOf(s),1);big.staff.push(s);s.loyal=50;ap(big,{bac:-40});if(p===S||big===S)ev+=`${s.name} bị ${NM(big)} mua về cung mình. `}}}}
 return ev}
function recommend(id){const s=servById(id);if(!s||ownerOf(s)!==S||S.bac<30)return;apply({bac:-30,danh:-2});servMerit(s,5);log(`Tiến cử ${s.name} lên Nội vụ phủ.`);render()}
function searchMaids(){if(!can(2))return;const head=S.staff.find(s=>s.role==="maid"&&srk(s)>=3);if(!head)return;spend(2);const spies=S.staff.filter(s=>s.spyFor&&s.spyFor!=="me");
 let r=`${head.name} tra xét cung nữ: `;if(spies.length){const s=spies[0];const m=byKey(s.spyFor);S.staff.splice(S.staff.indexOf(s),1);if(m&&m!==S)evA(S,m,2);r+=`lôi ra ${s.name} là tai mắt của ${m?NM(m):"kẻ khác"} (chứng cứ +2).`}else{const dt=allServ().find(x=>x.lover&&!(S.knowDT||[]).includes(x.sid)&&ownerOf(x)!==S);if(dt){S.knowDT=(S.knowDT||[]).concat([dt.sid,dt.lover]);r+=`nghe ra chuyện đối thực của ${dt.name}.`}else r+="không thấy gì lạ."}log(r);render()}
try{if(!$("title").hidden)wireOpt()}catch(e){}
/* ================= PERSON CARD: portrait box, info under it, actions on the right; one card at a time with a face strip ================= */
const PG={};
function pFaceOf(p){if(!p)return{src:"",ini:"?",col:"#8a7a6a"};if(p.kind==="emp")return pEmp();if(p.kind==="th")return pTH();if(p.kind==="maid")return pMaid();if(p.kind==="ty")return pDoc();
 if(p.kind==="ksp")return{src:courtSrc("ksp",S.court&&S.court.ksp),hue:0,ini:"宦",col:p.col||"#8a8aa0"};if(p.kind==="peddler")return{src:courtSrc("ped",S.court&&S.court.ped),hue:0,ini:"宦",col:p.col||"#8a8aa0"};if(p.kind==="kid"&&p.ref)return kidFace(p.ref);
 if(p.kind==="hh"&&p.ref){const f=pv(p.ref);return f}if(p.ref&&p.kind!=="kid"&&p.kind!=="chest")return pv(p.ref);return{src:"",ini:p.ini,col:p.col}}
function pcPort(f,col,status){const rb=/^c\d/.test(f.rk||"")&&RIMG[+f.rk.slice(1)]?`<img class="pcb2" src="img/${RIMG[+f.rk.slice(1)]}.webp" alt="" onerror="this.remove()">`:"";return `<div class="pcp${f.src?"":" noimg"}${f.rk?" rk-"+f.rk.split(" ").join(" rk-"):""}" style="--c:${col||f.col||"var(--gold)"}">${f.src?`<img src="${f.src}" alt="" data-i="${f.ini||""}" onerror="this.parentNode.classList.add('noimg');this.replaceWith(this.dataset.i)">`:(f.ini||"")}${rb}${status?`<em class="pcs">${status}</em>`:""}</div>`}
function ghenBar(n){return `<div class="pgh"><span>Ghen <b>${n}</b></span><div class="mini"><u style="width:${cl(n,0,100)}%"></u></div></div>`}
/* o: {f, col, name, rank (html), status, out, ghen, lines[], chips[], note, groups:[[header,[button html]]], empty, close} */
function pcard(o){const f=o.f||{};const L=(o.lines||[]).filter(Boolean);const C=(o.chips||[]).filter(Boolean);
 const G=(o.groups||[]).filter(g=>g&&g[1]&&g[1].filter(Boolean).length);
 const role=o.tabKey||"p";window.__pcTab=window.__pcTab||{};let act=window.__pcTab[role];if(!G.some(g=>g[0]===act))act=(G.find(g=>g[1].some(b=>/<button(?![^>]*disabled)/.test(b)))||G[0]||[])[0];
 const tabs=G.length>1?`<div class="pctabs">${G.map(([hd,B])=>{const n=B.filter(b=>/<button(?![^>]*disabled)/.test(b)).length;return `<button class="pct${hd===act?" on":""}" data-pct="${hd}" data-role="${role}">${hd||"Việc"} <i>${n}</i></button>`}).join("")}</div>`:"";
 const right=(o.note?`<p class="pcn">${o.note}</p>`:"")+tabs+(G.length?G.map(([hd,B])=>(G.length>1?`<div class="pcg${hd===act?" on":""}" data-g="${hd}">`:(hd?`<h5>${hd}</h5>`:""))+`<div class="pcb${String(B.filter(Boolean)[0]).startsWith('<div class="pcrow"')?" rows":""}">${B.filter(Boolean).join("")}</div>`+(G.length>1?"</div>":"")).join(""):(o.empty?`<p class="past">${o.empty}</p>`:""));
 return `<div class="pc${o.out?" out":""}" style="--c:${o.col||f.col||"var(--gold)"}"><div class="pcl">${pcPort(f,o.col,o.status)}<b class="pcname">${o.name}</b>${o.rank?`<span class="pcrk">${o.rank}</span>`:""}${o.ghen!=null?ghenBar(o.ghen):""}${L.length?`<div class="pcinfo">${L.map(x=>`<span>${x}</span>`).join("")}</div>`:""}${C.length?`<div class="chips">${C.join("")}</div>`:""}</div><div class="pcr">${o.close||""}${right}</div></div>`}
/* one button: attrs string, name, small line, disabled reason ("" = enabled) */
function pbtn(at,n,sm,why){const k=/class="oc/.test(sm||"")?sm:kitParse(sm||"");return `<button ${at}${why?" disabled":""}>${n}<small>${why?`<span class="kwhy">${why}</span> `:""}${k}</small></button>`}
function whyTime(c){return !S||S.dead?"":used+c>4?"hết khắc buổi này":c>1&&S.suc<20?"Sức dưới 20":""}
/* pager: items [{f,name,dim,sep}] + index key; returns strip + the chosen card (built lazily by mk(i)) */
function pager(key,items,mk){const n=items.length;if(!n)return"";let i=PG[key];if(i==null||i<0||i>=n)i=0;PG[key]=i;
 const strip=`<div class="pstrip"><button class="parr" data-pg="${key}" data-pi="${(i-1+n)%n}" aria-label="Người trước">‹</button><div class="pfaces">${(()=>{let h="",open=false;items.forEach((t,j)=>{if(t.sep||!open){if(open)h+="</div></div>";h+=`<div class="pgrp">${t.sep?`<span class="psep">${t.sep}</span>`:items.some(x=>x.sep)?`<span class="psep">&nbsp;</span>`:""}<div class="pgf">`;open=true}h+=`<button class="pface${j===i?" on":""}${t.dim?" dim":""}" data-pg="${key}" data-pi="${j}" aria-pressed="${j===i}">${mdH(t.f,"sm")}<span>${t.name}</span></button>`});return h+(open?"</div></div>":"")})()}</div><span class="pcount">${i+1}/${n}</span><button class="parr" data-pg="${key}" data-pi="${(i+1)%n}" aria-label="Người sau">›</button></div>`;
 return strip+mk(i)}
function shortN(nm){const a=String(nm).split(" ");return a.length>2?a.slice(-2).join(" "):a.slice(-1)[0]}

/* ---- rivals (Phi tần tab; the Empress is rivals[0]) ---- */
/* the same four bands NPCs use toward her (BANDS, j24): she may pick any freely; her price is Đức, exposure and the target's Oán */
const RVGRP=[["Giao thiệp",["ally","gift"]],["Hại nhỏ",["rumor","spy","trip"]],["Hại nặng",["frame","plant","block","bribe","accuse","vp","ksab","takeaway","steal","road"]],["Sát hại",["poison","kpoison","pond","pushp","musk","catswap","kframe"]]];
function rvGroups(v,i){const G=[];
 const b=k=>{const a=ACT[k];if(!a||(a.kid&&!a.ok(S,v)))return"";const ok=a.ok(S,v),o=a.o?a.o(S,v):null;
  const why=!v.alive?"đã mất":v.out?"ở lãnh cung":whyTime(2)||(S.confined&&CRIME.includes(k)?"đang cấm túc: cung bị canh giữ":"")||(!ok?(a.x||"chưa đủ điều kiện"):"");
  const deadly=/ban chết/.test(a.x||"");const ow=o!=null?(deadly?"Liều":word(cl(o+lotB(S,ACTDOM[k]),5,95))):"Chắc chắn";const sm=actLineRaw(k,ow+(o!=null&&!deadly?lotTag(ACTDOM[k],o):""),fmt(a.c))+(deadly?" · bị lộ: ban chết":"")+(a.x&&!AOUT[k]?" · "+a.x:"")+(ducWarnTxt(a.c)?" · "+ducWarnTxt(a.c):"");
  return pbtn(`data-r="${i}" data-a="${k}"`,(k==="poison"||k==="kpoison"?ic("doc",14):"")+a.n,sm,why)};
 if(!sameHouse(S,v))for(const [hd,ks] of RVGRP)G.push([hd,ks.map(b)]);
 if(S.rank>=7){const t=whyTime(2);G.push(["Quyền Hoàng hậu",[pbtn(`data-e="${i}" data-k="judge"`,"Xử tội","theo chứng cứ",t||(evG(S,v)<2?"cần 2 chứng cứ":"")),pbtn(`data-e="${i}" data-k="conf"`,evG(S,v)>=1||vpItems(v).length?"Tịch thu trang sức (có cớ)":"Tịch thu vô cớ",evG(S,v)>=1||vpItems(v).length?"Chắc chắn · thành: trang sức của nàng bị thu · nàng thù -20":"Chắc chắn · thành: trang sức của nàng bị thu · tốn: Danh -3, Thái hậu -5 (xử bất công) · nàng thù -20",t),pbtn(`data-e="${i}" data-k="reward"`,"Ban thưởng","Bạc -30 · thân +20",t||(S.bac<30?"cần 30 bạc":"")),v.confined?pbtn(`data-e="${i}" data-k="pardon"`,"Ân xá","hết cấm túc",t):"",pbtn(`data-e="${i}" data-k="cutpay"`,"Khất bổng lộc","Chắc chắn · thành: bổng tháng tới của nàng bớt 3 phần 10 · nàng thù -15",t||(v.cutPay?"đã khất tháng này":""))]])}
 return G}
function rvCard(v,i){const st=!v.alive?"Đã chết":v.out?"Ở lãnh cung":"";const host=v.rel<-20;
 const lines=[ageLine(v),`Tính nết: ${trLine(v)}`].concat(relLines(v),[favLine(v),notesLine(v)]);
 const chips=[st?"":chip(together(S,v)?`Đang cùng chỗ với ngươi`:locKnown(v)?`Thấy ở ${placeName(locKnown(v))} (buổi này) · cách ${travel(S.place,locKnown(v))} khắc`:"Nơi ở: không rõ","loc"),"",chip(host?"Thù ngươi":v.rel>20?"Thân với ngươi":"Bình thường",host?"hot":v.rel>20?"ok":""),v.pg>=20?chip(`Ngươi ghen ${v.pg}`,"hot"):"",v.ev?chip(`${ic("chung-cu",14)}Chứng cứ ${v.ev}`,"hot"):"",illKnown(v)?chip(illName(v),"hot"):"",evG(v,S)?chip(`Nắm ${evG(v,S)} chứng cứ của ngươi`,"hot"):"",v.preg&&!v.hidden?chip(`${ic("thai",14)}Có thai tháng ${v.preg}`):"",v.confined?chip(`Cấm túc ${v.confined}`):"",v.hieu?chip(`Hiệu ${v.hieu}`,"ok"):"",vpItems(v).length?chip(`Vượt phẩm: ${vpItems(v).map(e=>IT[e.k].n).join(", ")}`,"hot"):"",v.enemy?chip("Kẻ thù nhà ngươi","hot"):"",v.oldmis?chip("Chủ cũ của ngươi","hot"):"",facOf(v)?chip(`Phe ${facOf(v).name}`):""].concat(v.kids.filter(k=>k.alive).map(k=>chip(`${ic("con",14)}${k.name} · ${k.age} tuổi${k.heir?" · Thái tử":""}`,k.heir?"ok":"")));
 let note="",groups=[],empty="";
 if(st){if(v.alive&&S.rank>=7)groups=[["",[pbtn(`data-e="${i}" data-k="pardon"`,"Ân xá","đưa nàng về cung",whyTime(2))]]];else empty=v.alive?"Nàng ở lãnh cung. Chỉ Hoàng hậu mới ân xá được.":"Nàng đã mất."}
 else{note=sameHouse(S,v)?`Cùng ${houseName(v)} với ngươi: không thể lấy lòng hay ra tay.`:together(S,v)?"Cùng chỗ: làm tại chỗ.":"Không gặp mặt: phải sai người (khó hơn).";groups=rvGroups(v,i);groups.unshift(["Gặp mặt",[seeBtn(v),visitBtn(v),scoutBtn(v),inviteBtn(v)]])}
 return pcard({tabKey:"rival",f:pv(v),col:RCOL[v.queen?7:v.rank],name:v.name,rank:`${ic(RIMG[v.queen?7:v.rank],16)}${v.queen?"Hoàng hậu":RANKS[v.rank].n}`,status:st,out:!!st,ghen:st?null:v.ghen,lines,chips,note,groups,empty})}
function rvTabHTML(){return `<div class="pgwrap">`+pager("rv",rivals.map(v=>({f:pv(v),name:shortN(v.name),dim:!v.alive||v.out})),i=>rvCard(rivals[i],i))+`</div>`}

/* ---- children ---- */
function kidCard(k){const lines=k.alive?[tuoi(k.age),`Sức khỏe <b>${k.hp}</b>`,`Tài <b>${k.tal}</b>`,`Hoàng thượng thương <b>${k.fond}</b>`]:["Đã mất"];
 const chips=[k.heir?chip("Thái tử","ok"):"",k.alive&&k.hp<40?chip("Yếu ớt","hot"):""];
 const home=S.place==="home";
 return pcard({f:kidFace(k),name:k.name,rank:`${ic("con",16)}${k.sex==="m"?"Hoàng tử":"Công chúa"} · ${k.alive?k.age+" tuổi":"đã mất"}`,status:k.alive?"":"Đã mất",out:!k.alive,lines,chips,
  groups:k.alive?[["",[pbtn(`data-go="home"`,"Về tẩm cung thăm con","Chắc chắn · tốn: 1-2 khắc · thành: gặp các con, chăm con tại tẩm cung",home?"đang ở tẩm cung":S.out?"đang ở lãnh cung":S.confined?"đang cấm túc":"")]]]:[],empty:"Con đã mất."})}
function kidTabHTML(hl){return `<div class="pgwrap"><div class="ph"><span>${hl}</span><span>${ic("con",14)}${mySons().length} hoàng tử · ${myDaus().length} công chúa</span></div>`+(S.kids.length?pager("kid",S.kids.map(k=>({f:kidFace(k),name:shortN(k.name),dim:!k.alive})),i=>kidCard(S.kids[i])):`<p class="past">Chưa có con. Được thị tẩm mới có thể mang thai.</p>`)+`</div>`}

/* ---- servants and palace people (Kẻ hầu tab) ---- */
function staffTabHTML(){const [cm,ce]=capOf(S),nm=S.staff.filter(s=>s.role==="maid").length+1,ne=S.staff.filter(s=>s.role==="eunuch").length;
 const L=[];L.push({t:"maid",f:pMaid(),name:shortN(S.maid.name),sep:"Cung ngươi"});
 S.staff.forEach((s,j)=>L.push({t:"own",s,f:pServ(s),name:shortN(s.name)}));
 Object.entries(S.court).forEach(([k,c],j)=>L.push({t:"court",k,c,f:k==="ty"?pDoc():{src:courtSrc(k,c),ini:"宦",col:"#8a8aa0"},name:shortN(c.name),sep:j?"":"Trong cung"}));
 let first=true;liveRivals(true).forEach(v=>(v.staff||[]).forEach(s=>{L.push({t:"other",s,v,f:pServ(s),name:shortN(s.name),sep:first?"Cung khác":""});first=false}));
 const sinfo=s=>[tuoi(s.age),`${srkName(s)} · ${strShow(s)}`,typeof bondBars==="function"?bondBars(s):`Lòng <b>${s.loyal}</b>`,typeof tinOf==="function"&&tinOf(s)<40?`<span class="past">Chưa đủ tin để sai việc kín (cần Chủ tin 40)</span>`:""].filter(Boolean);
 const schip=s=>[s.lover&&(S.knowDT||[]).includes(s.sid)?chip("đối thực","hot"):"",s.spyFor==="me"?chip("tai mắt của ngươi","ok"):""];
 const t2=whyTime(2);
 const mk=i=>{const e=L[i];
  if(e.t==="maid")return pcard({f:e.f,name:S.maid.name,rank:"Cung nữ thân tín",lines:[tuoi(S.maid.age),typeof bondBars==="function"?bondBars(S.maid):`Lòng <b>${S.maid.loyal}</b>`,`Kẻ hầu: ${nm}/${cm} cung nữ · ${ne}/${ce} thái giám`,`Sai đi: ${bestSent(S)?bestSent(S).name:"không có ai"}`],chips:[S.maid.loyal<45?chip("lòng lung lay","hot"):""],
   note:"Gặp nàng ở tẩm cung để tâm sự hay sai đi dò la.",groups:[["Quản kẻ hầu",[pbtn(`data-hire="maid"`,"Thêm cung nữ","Nội vụ phủ · Bạc -20",nm>=cm?"đủ số theo phẩm":!roomFor("maid")?"hậu cung hết cung nữ":S.bac<20?"cần 20 bạc":""),pbtn(`data-hire="eunuch"`,"Thêm thái giám","Bạc -20",ne>=ce?"đủ số theo phẩm":!roomFor("eunuch")?"hết thái giám":S.bac<20?"cần 20 bạc":""),pbtn(`data-plantsv="1"`,"Cài người vào cung khác","Bạc -40 · 2 khắc",t2||(S.bac<40?"cần 40 bạc":!bestSent(S)?"không có ai để sai":"")),S.staff.some(s=>s.role==="maid"&&srk(s)>=3)?pbtn(`data-smaid="1"`,"Chưởng sự tra xét cung nữ","2 khắc · tìm tai mắt, đối thực",t2):""]]]});
  if(e.t==="own"){const s=e.s;return pcard({f:e.f,name:s.name,rank:s.role==="maid"?"Cung nữ":"Thái giám",lines:sinfo(s),chips:schip(s),groups:[["Thưởng phạt",servJudgeBtns(s).concat(s.kn?[]:[pbtn(`data-svlook="${s.sid}"`,"Xem người","Bạc -15 · 1 khắc",S.bac<15?"cần 15 bạc":!can(1)?"hết khắc":"")])],["Sai bảo",[pbtn(`data-sv="hoi" data-sid="${s.sid}"`,"Hỏi chuyện",`${word(s.tr==="chuyen"?70:40)} · 2 khắc · thành: chứng cứ +1 nếu quen người cung khác · hỏng: không biết gì mới`,t2),pbtn(`data-rec="${s.sid}"`,"Tiến cử","Bạc -30 · Danh -2",S.bac<30?"cần 30 bạc":""),pbtn(`data-sv="doi" data-sid="${s.sid}"`,"Đổi người",`Chắc · tốn: Bạc -20, Danh -1 (đuổi 2 người trong nửa năm: Danh -3) · thành: trả ${s.name.split(" ").pop()} về, người thay ngẫu nhiên, nết chưa rõ · hắn biết chuyện của ngươi, có thể bán cho kẻ thù`,S.bac<20?"thiếu bạc (cần 20)":"")]]]})}
  if(e.t==="court"){const c=e.c,k=e.k;return pcard({f:e.f,name:c.name,rank:c.n,lines:[tuoi(c.age),`Thiện cảm <b>${c.af.me||0}</b>`],groups:[["Giao thiệp",[pbtn(`data-cv="thuong" data-ck="${k}"`,"Biếu","Bạc -20 · thiện cảm +10",S.bac<20?"cần 20 bạc":""),pbtn(`data-cv="hoi" data-ck="${k}"`,"Hỏi chuyện",k==="tq"?`${word(cl(40+(c.af.me||0)/2,5,95))} · 2 khắc · thành: biết một sở thích của Hoàng thượng · hỏng: ông chỉ cười`:k==="ksp"?"Chắc chắn · 2 khắc · thành: xem sổ thị tẩm":"Chắc chắn · 2 khắc · thiện cảm +1",t2)]]]})}
  const s=e.s,v=e.v;const known=s.lover&&(S.knowDT||[]).includes(s.sid);
  return pcard({f:e.f,name:s.name,rank:`${s.role==="maid"?"Cung nữ":"Thái giám"} · cung ${v.name}`,lines:sinfo(s),chips:schip(s),note:s.spyFor==="me"?"Người này đã là tai mắt của ngươi.":"",
   groups:s.spyFor==="me"?[]:[["Mưu kế",[pbtn(`data-sv="mua" data-sid="${s.sid}"`,"Mua chuộc",`Bạc -30 · ${word(odA(S,35+(s.tr==="tham"?25:0)-s.loyal/3+S.tamco/5))}`,t2||(S.bac<30?"cần 30 bạc":"")),known?pbtn(`data-sv="doa" data-sid="${s.sid}"`,"Dọa tố đối thực","2 khắc",t2):""]]]})};
 return `<div class="pgwrap">`+pager("staff",L,mk)+`</div>`}

/* ---- people met in a place (stage pop) ---- */
function popCard(p,i){const opts=talkOpts(p),done=S.visit&&(S.visit.talked===true||(S.visit.tk||{})[i]);const v=p.ref;const f=pFaceOf(p);
 const close=`<button class="x pcx" id="popx" aria-label="Đóng">✕ Đóng</button>`;
 let rank="",lines=[],chips=[],ghen=null,col=p.col;
 if((p.kind==="rival"||p.kind==="hh")&&v){col=RCOL[v.queen?7:v.rank];rank=`${ic(RIMG[v.queen?7:v.rank],16)}${v.queen?"Hoàng hậu":RANKS[v.rank].n}`;ghen=v.ghen;lines=[ageLine(v),`Tính nết: ${trLine(v)}`].concat(relLines(v),[favLine(v)]);chips=["",sameHouse(S,v)?chip("cùng cung"):"",v.ev?chip(`${ic("chung-cu",14)}Chứng cứ ${v.ev}`,"hot"):"",illKnown(v)?chip(illName(v),"hot"):"",v.preg&&!v.hidden?chip(`${ic("thai",14)}Có thai tháng ${v.preg}`):"",facOf(v)?chip(`Phe ${facOf(v).name}`):""]}
 else if(p.kind==="emp"){rank="Hoàng thượng";lines=[tuoi(S.emp.age),`Tâm trạng: <b>${MOODS[S.emp.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b>`]}
 else if(p.kind==="th"){rank="Thái hậu";lines=[tuoi(S.thAge),`Thái hậu thương ngươi <b>${S.th}</b>`]}
 else{const a=String(p.info||"").split(" · ");rank=a.shift()||"";lines=a;const ag=p.kind==="maid"?S.maid.age:p.kind==="ty"?(S.court&&S.court.ty||{}).age:p.kind==="ksp"?(S.court&&S.court.ksp||{}).age:p.kind==="peddler"?(S.court&&S.court.ped||{}).age:p.kind==="kid"&&p.ref?p.ref.age:p.kind==="fallen"&&v?v.age:0;if(ag&&p.kind!=="kid")lines.unshift(tuoi(ag))}
 const B=opts.map((a,j)=>{const o=a.o==null?100:a.o;const tc=a.act?2:1;const poor=a.c&&a.c.bac&&S.bac+a.c.bac<0;
  const why=a.lock?a.t:poor?"không đủ bạc":whyTime(tc);const sm=optLine(a);
  return pbtn(`class="opt" data-o="${j}"`,a.n,sm,why)});
 return pcard({f,col,name:p.name,rank,ghen,lines,chips,close,note:popMsg||"",groups:done?[]:[["",B]],empty:done?"Lần ghé này đã nói chuyện với người này rồi.":"Không có việc gì để làm với người này."})}

/* ---- the Emperor / herself, opened as a card in the dialog ---- */
function empCardHTML(){const E=S.emp;return pcard({f:pEmp(),col:"#f0d070",name:empName(),rank:"Hoàng thượng",lines:[tuoi(E.age),`Tâm trạng: <b>${MOODS[E.mood][0]}</b>`,`Ngài sủng ngươi <b>${S.sung}</b> · Ân tình <b>${S.an||0}</b>`],
 note:E.traits.map(t=>`<b>${ETRAITS[t][0]}</b>: ${ETRAITS[t][1]}`).join("<br>"),groups:[["Điều ngài thích",Object.keys(LIKES).map(k=>`<div class="pcrow"><span>${LIKEN[k]}</span><b>${E.known[k]?E.likes[k]:"chưa rõ"}</b></div>`)]],empty:""})+`<p class="past">Nói thật lòng với ngài, hoặc hỏi Kính sự phòng, để biết ngài thích gì.</p>`}
function selfCardHTML(){const ch=[["Sắc",S.sac],["Tài",S.tai],["Tâm cơ",S.tamco],["Đức",S.duc],["Tai mắt",S.mat],["Thái hậu",S.th],["Hoàng hậu",S.hh]];
 return pcard({f:pMe(),col:RCOL[S.rank],name:S.name,rank:`${ic(RIMG[S.rank],16)}${S.rank>=7?"Hoàng hậu":RANKS[S.rank].n}`,lines:[`${S.origin.n}`,ageLine(S),`Bổng lộc: <b>${S.out?5:BL[Math.min(7,S.rank)]}</b> bạc/tháng · công kẻ hầu -${(S.staff||[]).length*WAGE}`,`Cung nữ ${S.maid.name} · lòng <b>${S.maid.loyal}</b>`],chips:[illOf(S)?chip(illName(S),"hot"):"",S.preg?chip(`${ic("thai",14)}Mang thai tháng ${S.preg}`,"hot"):"",facOf(S)?chip(`Phe ${facOf(S).name}`):""],
 groups:[["Tư chất",ch.map(([a,b])=>`<div class="pcrow"><span>${a}</span><b>${b}</b></div>`)],["Tài nghệ",ARTS.map(a=>`<div class="pcrow"><span>${ic(AIMG[a.k],14)}${a.n}</span><b>${S.arts[a.k]}</b></div>`)]]})}
/* ================= EXPORT / IMPORT A SAVE AS A TEXT CODE (title screen = settings) ================= */
let XIO={m:"",slot:0,code:"",msg:"",imp:null,to:0,ask:0};
function b64e(u8){let s="";for(let i=0;i<u8.length;i+=0x8000)s+=String.fromCharCode.apply(null,u8.subarray(i,i+0x8000));return btoa(s)}
function b64d(t){const s=atob(t);const u=new Uint8Array(s.length);for(let i=0;i<s.length;i++)u[i]=s.charCodeAt(i);return u}
async function zpipe(u8,C){const st=new Blob([u8]).stream().pipeThrough(new C("deflate-raw"));return new Uint8Array(await new Response(st).arrayBuffer())}
async function saveCode(json){const u=new TextEncoder().encode(json);
 if(typeof CompressionStream==="function"){try{return "CTM2:"+b64e(await zpipe(u,CompressionStream))}catch(e){}}return "CTM1:"+b64e(u)}
async function readCode(code){code=String(code||"").replace(/\s+/g,"");const m=/^CTM([12]):([A-Za-z0-9+/=]+)$/.exec(code);if(!m)throw xe("Mã không đúng dạng (phải bắt đầu bằng CTM).");
 let u=b64d(m[2]);if(m[1]==="2"){if(typeof DecompressionStream!=="function")throw xe("Trình duyệt này không giải nén được mã.");u=await zpipe(u,DecompressionStream)}
 const d=JSON.parse(new TextDecoder().decode(u));if(!d||typeof d!=="object"||!d.S||!d.R)throw xe("Mã không chứa ván chơi.");
 if(!(d.v>=2&&d.v<=6))throw xe(`Phiên bản ván (${d.v}) không hợp với bản game này.`);return d}
function xe(m){const e=new Error(m);e.mine=1;return e}
function filledSlots(){return [1,2,3].filter(n=>loadSlot(n))}
function xioHTML(){const F=filledSlots();let h=`<div class="xiorow"><button class="btn" id="x-exp" aria-pressed="${XIO.m==="exp"}" ${F.length?"":"disabled"}>Xuất ván<small>${F.length?"chép ván thành mã chữ":"chưa có ván nào"}</small></button><button class="btn" id="x-imp" aria-pressed="${XIO.m==="imp"}">Nhập ván<small>dán mã để nạp ván</small></button></div>`;
 if(XIO.m==="exp"){h+=`<div class="xiobox"><div class="srow">${F.map(n=>`<button class="btn" data-xs="${n}" aria-pressed="${n===XIO.slot}">Ô ${n}<small>${loadSlot(n).S.name}</small></button>`).join("")}</div>
  <textarea id="x-code" readonly rows="4" aria-label="Mã ván">${XIO.code}</textarea><div class="srow"><button class="main" id="x-copy" ${XIO.code?"":"disabled"}>Chép</button><span class="past" id="x-msg">${XIO.msg}</span></div></div>`}
 if(XIO.m==="imp"){const d=XIO.imp;h+=`<div class="xiobox"><textarea id="x-in" rows="4" placeholder="Dán mã ván (CTM...) vào đây" aria-label="Dán mã ván"></textarea><div class="srow"><button class="btn" id="x-chk">Đọc mã</button><span class="past" id="x-msg">${XIO.msg}</span></div>
  ${d?`<p class="past">Ván: <b>${d.S.name}</b> · ${RANKS[d.S.rank]?RANKS[d.S.rank].n:""} · năm ${d.S.year}, tháng ${d.S.month}. Ghi vào ô nào?</p><div class="srow">${[1,2,3].map(n=>{const o=loadSlot(n);return `<button class="btn" data-xt="${n}" aria-pressed="${n===XIO.to}">Ô ${n}<small>${o?"đè: "+o.S.name:"trống"}</small></button>`}).join("")}</div>
  ${XIO.to?`<div class="srow"><button class="main" id="x-write">${XIO.ask?"Chắc chắn ghi":"Ghi vào Ô "+XIO.to}</button>${XIO.ask?`<span class="r">Ô ${XIO.to} đang có ván ${loadSlot(XIO.to).S.name}, sẽ mất.</span>`:""}<button class="btn" id="x-cancel">Thôi</button></div>`:""}`:""}</div>`}
 return h}
async function xioExport(n){XIO.slot=n;XIO.msg="";XIO.code="";try{const raw=localStorage.getItem(SK(n));XIO.code=raw?await saveCode(raw):"";XIO.msg=XIO.code?`${XIO.code.length} ký tự`:"Ô trống"}catch(e){XIO.msg="Không đọc được ô này."}wireXio()}
function wireXio(){const T=$("title");if(!T||T.hidden)return;let w=T.querySelector(".xiowrap");if(!w){w=document.createElement("div");w.className="xiowrap";const s=$("slots");s.parentNode.insertBefore(w,s.nextSibling)}
 const keep=XIO.m==="imp"&&$("x-in")?$("x-in").value:"";w.innerHTML=xioHTML();if(keep&&$("x-in"))$("x-in").value=keep;
 w.onclick=async e=>{const b=e.target.closest("button");if(!b||b.disabled)return;
  if(b.id==="x-exp"){XIO.m=XIO.m==="exp"?"":"exp";XIO.msg="";if(XIO.m==="exp"){const F=filledSlots();await xioExport(F.includes(SLOT)?SLOT:F[0]);return}}
  else if(b.id==="x-imp"){XIO.m=XIO.m==="imp"?"":"imp";XIO.msg="";XIO.imp=null;XIO.to=0;XIO.ask=0}
  else if(b.dataset.xs){await xioExport(+b.dataset.xs);return}
  else if(b.id==="x-copy"){const ta=$("x-code");let ok=false;try{if(navigator.clipboard&&navigator.clipboard.writeText){await navigator.clipboard.writeText(XIO.code);ok=true}}catch(x){}
   if(!ok){try{ta.focus();ta.select();ta.setSelectionRange(0,ta.value.length);ok=document.execCommand&&document.execCommand("copy")}catch(x){}}
   const m=$("x-msg");if(m)m.textContent=ok?"Đã chép mã.":"Hãy tự chọn và chép mã trong ô.";if(!ok){ta.focus();ta.select()}return}
  else if(b.id==="x-chk"){XIO.to=0;XIO.ask=0;try{XIO.imp=await readCode($("x-in").value);XIO.msg="Mã hợp lệ."}catch(x){XIO.imp=null;XIO.msg=`<span class="r">${x.mine?x.message:"Mã hỏng hoặc thiếu."}</span>`}}
  else if(b.dataset.xt){XIO.to=+b.dataset.xt;XIO.ask=0}
  else if(b.id==="x-cancel"){XIO.to=0;XIO.ask=0}
  else if(b.id==="x-write"&&XIO.imp&&XIO.to){if(loadSlot(XIO.to)&&!XIO.ask){XIO.ask=1}else{try{localStorage.setItem(SK(XIO.to),JSON.stringify(XIO.imp));XIO.msg=`Đã ghi vào Ô ${XIO.to}. Bấm “Tiếp tục kiếp này” để chơi.`;XIO.m="imp";XIO.imp=null;XIO.to=0;XIO.ask=0;showTitle();return}catch(x){XIO.msg='<span class="r">Không ghi được (bộ nhớ trình duyệt bị chặn hoặc đầy).</span>'}}}
  wireXio()}}
(function(){const o=window.showTitle;if(typeof o==="function")window.showTitle=function(){const r=o.apply(this,arguments);try{wireXio()}catch(e){}return r}})();
try{if(!$("title").hidden){wireXio();if(!$("title").querySelector(".optwrap")&&typeof wireOpt==="function")wireOpt()}}catch(e){}
/* ================= AGES: every person has an age, ageing yearly; faces by role and age band, fixed for life ================= */
function courtSrc(k,c){if(k==="ty")return fsrc(c&&c.fc,"img/face-physician.webp");return fsrc(c&&c.fc,`img/face-eunuch-${(c&&c.fe>=0?c.fe:eunBand(c&&c.age||40))+1}.webp`)}
function ageInit(){if(!S)return;[S].concat(rivals||[]).forEach(o=>{if(o)delete o.hue});if(typeof allServ==="function")allServ().forEach(s=>delete s.hue);if(!S.wkSnap&&typeof wkSnap==="function"){S.wkSnap=wkSnap();S.lastWk=wkKey()}const m=S.maid;if(m){if(!(m.age>=16))m.age=16+R(7);delete m.face;delete m.hue}
 if(!(S.thAge>0))S.thAge=(S.emp?S.emp.age:30)+18+R(7);
 (rivals||[]).forEach(v=>{if(!(v.age>=18))v.age=18+R(8)});
 const C=S.court||{};const base={tq:56,ksp:40,ped:20,ty:50};for(const k in C){const c=C[k];if(!(c.age>0))c.age=(base[k]||35)+R(6);if(k!=="ty"&&!(c.fe>=0))c.fe=eunBand(c.age)}
 if(typeof allServ==="function")allServ().forEach(s=>{if(!(s.age>0))Object.assign(s,servAge(s.role));if(s.role!=="maid"&&!(s.fe>=0))s.fe=eunBand(s.age)});faceInit()}
function ageYear(){(S.men||[]).forEach(m=>m.age++);if(S.maid)S.maid.age=(S.maid.age||18)+1;S.thAge=(S.thAge||50)+1;(rivals||[]).forEach(v=>{if(v.alive)v.age=(v.age||20)+1});
 for(const k in (S.court||{}))S.court[k].age=(S.court[k].age||40)+1;if(typeof allServ==="function")allServ().forEach(s=>s.age=(s.age||20)+1)}
function tuoi(n){return n>0?`Tuổi <b>${n}</b>`:""}
/* children: a variant at birth, the face band follows the age (initials if the file is missing) */
function kidBand(a){return a<=2?"baby":a<=6?"small":a<=12?"child":"teen"}
function kidFace(k){const mom=allKids().find(([x])=>x===k);const mr=mom?(mom[1]?(mom[1].queen?7:mom[1].rank):S.rank):S.rank;return Object.assign(kidFace0(k),{rk:"kid c"+mr,rw:k.sex==="m"?"Hoàng tử":"Công chúa"})}
function kidFace0(k){if(k.fv==null||k.fv>4)k.fv=kidVar(k);return{src:k.fv?`img/face-${k.sex==="m"?"prince":"princess"}-${kidBand(k.age||0)}-${k.fv}.webp`:"",hue:0,ini:k.sex==="m"?"子":"女",col:k.heir?"#d9b25f":"#c98aa0"}}

/* ===== FACE REGISTRY: one face per person, by role (+ age band for eunuchs), drawn without repeats; saved on the person (fc) =====
   Pools are the img/ file lists; a file that fails to load falls back to the older inline AVATARS face (or the initial medallion).
   When a pool is used up, only faces of people gone for good (dead, sent away) come back; nobody present ever shares a face. */
const pad=n=>String(n).padStart(2,"0");
const rng=(a,b,f)=>{const L=[];for(let i=a;i<=b;i++)L.push(f(i));return L};
const E=n=>"face-emperor-"+n,EU=n=>"face-eunuch-"+n,OF=n=>"face-official-"+n,TH=n=>"face-thaihau-"+n;
/* pools by role and age band, sorted by looking at each picture's apparent age */
const FPOOL={consort:rng(1,40,i=>"face-consort-"+pad(i)),maid:rng(1,6,i=>"face-maid-"+i).concat(rng(7,30,i=>"face-maid-"+pad(i))),womid:rng(1,8,i=>"face-woman-mid-"+i),mama:rng(1,6,i=>"face-mama-"+i),
 th0:[1,2,3,5,6].map(TH),th1:[4].map(TH),
 emp0:[1,5,8].map(E),emp1:[2,3,6].map(E),emp2:[4].map(E),emp3:[7].map(E),
 off0:[2].map(OF),off1:[4,5,6].map(OF),off2:[1,3].map(OF).concat(["face-physician"]),manold:rng(1,4,i=>"face-man-old-"+i),
 eun0:["1","2","05","08","09","11","14","15","17","19"].map(EU),eun1:["12","16","20"].map(EU),eun2:["06","10","18","4"].map(EU),eun3:["3","07","13"].map(EU)};
/* pool keys for a person, preferred band first, then the nearest bands */
function bandKeys(kind,age){if(kind==="consort")return age<=35?["consort","womid","mama"]:age<=50?["womid","consort","mama"]:["mama","womid","consort"];
 if(kind==="maid")return age<=35?["maid","womid","mama"]:age<=44?["womid","maid","mama"]:["mama","womid","maid"];
 if(kind==="eunuch"){const b=eunBand(age||30);return [0,1,2,3].sort((x,y)=>Math.abs(x-b)-Math.abs(y-b)||x-y).map(x=>"eun"+x)}
 const near=(pre,b,n)=>[...Array(n).keys()].sort((x,y)=>Math.abs(x-b)-Math.abs(y-b)||x-y).map(x=>pre+x);
 if(kind==="emperor"||kind==="royal")return near("emp",age<=25?0:age<=35?1:age<=50?2:3,4);
 if(kind==="thaihau")return near("th",age<=55?0:1,2);
 if(kind==="official"||kind==="man")return age>50&&kind==="man"?["manold","off2","off1","off0"]:near("off",age<=35?0:age<=50?1:2,3);
 return [kind]}
const FAV={};
(function probe(){const all=[].concat(...Object.values(FPOOL));for(const f of all){try{const im=new Image();im.onload=()=>{FAV[f]=1};im.onerror=()=>{FAV[f]=0};im.src="img/"+f+".webp"}catch(e){}}})();
function fsrc(fc,fb){if(!fc||FAV[fc]===0)return fb||"";return "img/"+fc+".webp"}
function poolOf(role){const pre={eunuch:"eun",emperor:"emp",thaihau:"th",official:"off"}[role];return pre?Object.keys(FPOOL).filter(k=>k.startsWith(pre)&&/\d$/.test(k)).flatMap(k=>FPOOL[k]):FPOOL[role]||[]}
function facesPresent(){const U=new Set();if(!S)return U;const add=o=>{if(o&&o.fc)U.add(o.fc)};add(S);add(S.maid);add(S.emp);if(S.thF)U.add(S.thF);(S.men||[]).forEach(m=>{if(m.alive)add(m)});
 (rivals||[]).forEach(add);for(const k in (S.court||{}))add(S.court[k]);if(typeof allServ==="function")allServ().forEach(add);return U}
function drawF(kind,age){if(!S)return"";const keys=Array.isArray(kind)?kind:bandKeys(kind,age);const pres=facesPresent(),seen=new Set(S.fseen||[]);
 for(const fresh of [true,false])for(const k of keys){const c=(FPOOL[k]||[]).filter(f=>!pres.has(f)&&FAV[f]!==0&&(!fresh||!seen.has(f)));if(c.length){const ok=c.filter(f=>FAV[f]===1);const f=pick(ok.length?ok:c);S.fseen=(S.fseen||[]).concat([f]);return f}}
 return""}
/* a person keeps a face while in one age band; on entering a new band they get a new face from that band's pool */
function faceFor(o,kind,age){const k=bandKeys(kind,age)[0];if(o.fc==null||o.fk!==k){o.fc="";o.fc=drawF(kind,age);o.fk=k}}
/* how many of a role may exist at once = the pool size (a consort pool counts the inline fallback portraits too) */
function roomFor(role){if(!S)return true;const n=poolOf(role).filter(f=>FAV[f]!==0).length;const cap=role==="consort"?Math.max(n,(AV.women||[]).length):n;
 const cnt=role==="consort"?1+(rivals||[]).filter(v=>v.alive).length:role==="maid"?1+(typeof allServ==="function"?allServ().filter(s=>s.role==="maid").length:0):role==="eunuch"?(typeof allServ==="function"?allServ().filter(s=>s.role!=="maid").length:0)+3:0;
 return cnt<cap}
function kidVar(k){const used=new Set(allKids().map(([x])=>x).filter(x=>x!==k&&x.alive&&x.sex===k.sex&&x.fv).map(x=>x.fv));const c=[1,2,3,4].filter(v=>!used.has(v));return c.length?pick(c):0}
/* give every present person a face once; old saves get theirs here too */
function faceInit(){if(!S)return;faceFor(S,"consort",S.age);(rivals||[]).forEach(v=>faceFor(v,"consort",v.age||20));
 if(S.maid)faceFor(S.maid,S.maid.old?"mama":"maid",S.maid.age||18);if(S.emp)faceFor(S.emp,"emperor",S.emp.age);S.thO=S.thO||{};faceFor(S.thO,"thaihau",S.thAge||55);S.thF=S.thO.fc;
 for(const k in (S.court||{})){const c=S.court[k];faceFor(c,k==="ty"?"official":"eunuch",c.age||40)}
 if(typeof allServ==="function")allServ().forEach(s=>faceFor(s,s.role==="maid"?"maid":"eunuch",s.age||20))}
/* under cấm túc a consort's palace is watched: no crimes can be set in motion (every consort alike) */
const CRIME=["poison","kpoison","kframe","pond","musk","catswap","frame","plant"];
CRIME.forEach(k=>{const A2=ACT[k];if(!A2)return;const o=A2.ok;A2.ok=(a,t)=>!a.confined&&o(a,t)});
/* ===== EVERY CHOICE SHOWS: an odds word ('Chắc chắn' when nothing is rolled), 'thành: …', 'hỏng: …' for rolled ones, and known risks ===== */
const ODDW=/(Chắc chắn|Nắm chắc|Rất chắc|Khá chắc|Năm ăn năm thua|Chắc|Khó|Liều)/;
const CAUGHT="có thể bị người của nàng phát giác: nàng nắm 2 chứng cứ";
const AOUT={spy:["chứng cứ +1, Tâm cơ +2","bị lộ, nàng thù -8"],ally:["thân +25, nàng bớt ghen 10","bị lạnh nhạt, thân -5"],rumor:["Danh nàng -8","không ai tin; nàng nắm 1 chứng cứ, thù -5"],
 frame:["nàng mất Danh và Sủng -10; Danh +3","bị lộ: Danh -15, Sủng -8, thù -30, bị phạt"],poison:["nàng trúng độc, có thể chết","bị tra ra: ban chết"],accuse:["nàng bị phế hoặc giáng; Danh +6","Danh -8, thù -20, chứng cứ bị hủy"],
 bribe:["moi được mưu kế (chứng cứ +2) hoặc trộm bạc của nàng","cung nữ báo chủ: nàng nắm 1 chứng cứ"],block:["2 tuần nàng không được lật thẻ","tổng quản kể lại: nàng nắm 1 chứng cứ"],
 musk:["nàng sảy thai","—"],catswap:["tráo hài nhi khi nàng sinh","—"],ksab:["con nàng Tài -15; Tâm cơ +2","bị lộ: Danh -10, thù -20, bị phạt"],kpoison:["con nàng trúng độc, có thể chết","bị tra ra: ban chết"],
 pond:["con nàng rơi xuống hồ, có thể chết đuối","bị bắt: Danh -10, bị phạt"],kframe:["con nàng mất sủng, có thể bị phế Thái tử","bị lần ra: ban chết"],takeaway:["bế con nàng về nuôi; nàng thù -30","chưa được chuẩn; nàng thù -10"],
 vp:["đồ của nàng bị tịch thu, Danh nàng -8, nàng bị phạt","Danh -3, nàng thù -10"],plant:["món đồ nằm trong rương nàng","kẻ cài bị bắt: nàng nắm 2 chứng cứ, thù -20"],steal:["đoạt đêm nay · kèm: nàng ghen +25, thù -15","Sủng -3"],road:["đoạt đêm nay · kèm: nàng ghen +25, thù -15","Sủng -3"],gift:["thân thêm theo món quà",""]};
const ACAUGHT=["rumor","frame","poison","block","musk","ksab","kpoison","pond","kframe"];
/* the small line of a scheme button */
function actLine(k,oddsWord,costHtml){const w=AOUT[k]||["",""];const rolled=oddsWord!=="Chắc chắn";const L=[oddsWord,costHtml?"tốn: "+costHtml:"",w[0]?"thành: "+w[0]:"",rolled?"hỏng: "+(w[1]&&w[1]!=="—"?w[1]:"không mất gì"):"",ACAUGHT.includes(k)?CAUGHT:""];return L.filter(Boolean).join(" · ")}
/* the small line of any option object {o, c, w, l, x, lock} */
function optLine(a){const o=a.o==null?100:a.o;const rolled=o<100&&!a.lock;const gain=[fmt(a.w||{}),a.x].filter(Boolean).join(" · ");
 return [rolled?word(o):"Chắc chắn",a.c&&fmt(a.c)?"tốn: "+fmt(a.c):"",gain?"thành: "+gain:"",rolled?"hỏng: "+(fmt(a.l||{})||"không mất gì"):""].filter(Boolean).join(" · ")}
/* a dilemma option {n, fx, x, go}: x usually already holds 'word · thành · hỏng'; fill what is missing */
function dilLine(c){const fx=fmt(c.fx||{}),x=c.x||"";const src=String(c.go||"")+String(c.fail||"");let s=x;
 if(!ODDW.test(x)){if(/roll\(/.test(src))s="Khó lường · "+x;else{if(!fx&&!x)return /^Thôi|^Im lặng|^Để /.test(c.n||"")?"Chắc chắn · không được mất gì":c.go||c.open?"Chắc chắn · chọn, xem kết quả ở bước sau":"Chắc chắn · không được mất gì";return ["Chắc chắn",fx?"ngay: "+fx:"",x?"thành: "+x:""].filter(Boolean).join(" · ")}}
 if(!/hỏng/.test(s))s+=" · hỏng: không mất gì";return [fx?"ngay: "+fx:"",s].filter(Boolean).join(" · ")}
/* the real speaker of an event: a named eunuch of that palace or of the court, a spy of hers; no speaker -> the place art */
function pEunOf(p){const e=(p&&p.staff||[]).find(s=>s.role!=="maid");return e?Object.assign(pServ(e),{nm:e.name}):pEunCourt("ksp")}
function pEunCourt(k){const c=S.court&&S.court[k];return{rk:k==="tq"?"eu3":"eu2",rw:k==="tq"?"Tổng quản thái giám":"Thái giám",src:courtSrc(k,c),hue:0,ini:"宦",col:"#8a8aa0",nm:c?c.name:""}}
function pSpy(){const s=(S.staff||[]).find(x=>x.spyFor==="me")||(S.staff||[]).find(x=>x.role==="maid");return s?Object.assign(pServ(s),{nm:s.name}):pMaid()}
function evArt(){try{const P=placeOf(S.place);return SCIMG[P.sc]?`img/${SCIMG[P.sc]}.webp`:""}catch(e){return""}}
/* ================= DAY TRANSITIONS: a light sky shift between buổi; night -> dawn curtain with the week's summary at a new tuần ================= */
window.__dawnOn=true;
function wkKey(){return `${S.year}-${S.month}-${S.tuan}`}
function wkSnap(){return{sung:S.sung,danh:S.danh,suc:S.suc,bac:S.bac,rank:S.rank,kids:S.kids.length,seq:S.logSeq||0,key:wkKey()}}
const plain=h=>String(h).replace(/<span class="ld">[^<]*<\/span>/,"").replace(/<\/(div|p|b|span)>/g," ").replace(/<[^>]+>/g,"").replace(/\s+/g," ").replace(/ ([.,:;])/g,"$1").trim();
/* the week's summary, rebuilt from the saved snapshot and the saved log */
function wkSummary(){const s=S.wkSnap||wkSnap();const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-(s.seq||0)));const L=S.logs.slice(0,n).map(plain).filter(x=>x&&!/^Xin xăm|^Gieo lại|^Đến /.test(x));
 const pick=(re,max)=>L.filter(x=>re.test(x)).slice(0,max);
 const D=[["Sủng",S.sung-s.sung],["Danh",S.danh-s.danh],["Sức",S.suc-s.suc],["Bạc",S.bac-s.bac]];
 const groups=[["Thăng giáng",pick(/tấn phong|sắc phong|lập .* Hoàng hậu|bị giáng|bị phế|lãnh cung|cấm túc/i,3)],["Sinh tử",pick(/sinh hạ|sinh đôi|băng hà|qua đời|chết|sảy thai|khó sinh/i,3)],
  ["Kẻ nhắm vào ngươi",pick(/ngươi.*(bị|trúng)|định .*(ngươi|của ngươi)|tố giác ngươi|vu .*ngươi|nhắm vào ngươi/i,3)],["Ban thưởng, đồ vật",pick(/ban thưởng|ban cho|nhận được|được tặng|mua /i,2)]];
 const used=new Set(groups.flatMap(g=>g[1]));const other=L.filter(x=>!used.has(x)).slice(0,3);if(other.length)groups.push(["Chuyện khác",other]);
 return{D,groups,rank:S.rank!==s.rank?(S.rank>s.rank?"Được thăng ":"Bị giáng xuống ")+(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n):"",kids:S.kids.length-s.kids}}
function bell(){if(typeof auOk!=="function"||!auOk())return;try{const C=window.__bellCtx||(window.__bellCtx=new (window.AudioContext||window.webkitAudioContext)());const t=C.currentTime;
 [[392,.22,4.5],[784,.08,3],[1176,.05,2],[523,.06,3.5]].forEach(([f,g,d])=>{const o=C.createOscillator(),v=C.createGain();o.type="sine";o.frequency.value=f;v.gain.setValueAtTime(0,t);v.gain.linearRampToValueAtTime(g*OPT.sfx,t+.02);v.gain.exponentialRampToValueAtTime(.0001,t+d);o.connect(v).connect(C.destination);o.start(t);o.stop(t+d+.1)})}catch(e){}}
function reducedMotion(){try{return matchMedia("(prefers-reduced-motion: reduce)").matches||(typeof OPT!=="undefined"&&OPT.fxon===false)}catch(e){return false}}
function curtain(){if(!S)return;if((S.buoi||0)===0&&S.lastWk!==wkKey()){S.lastWk=wkKey();dawn();return}buoiShift()}
function buoiShift(){const c=$("curtain");if(!c)return;c.className="curtain shift b"+(S.buoi||0);c.innerHTML=`<span>${BUOI[S.buoi||0]}</span>`;void c.offsetWidth;c.classList.add("on");setTimeout(()=>{c.classList.remove("on")},reducedMotion()?150:1000)}
function dawn(){const sum=wkSummary();S.wkSnap=wkSnap();let w=$("dawn");if(!w){w=document.createElement("div");w.id="dawn";w.className="dawn";document.body.appendChild(w)}
 const d=sum.D.filter(([,v])=>v).map(([k,v])=>`<span class="${v>0?"g":"r"}">${k} ${v>0?"+":""}${v}</span>`).join("")||`<span class="past">Không đổi</span>`;
 const lot=S.lot?`<div class="dlot"><b>Quẻ ${LV[S.lot.lv]}</b> · ${S.lot.dom}<small>${(LOTS[S.lot.i]||[])[2]||""}</small><span class="ef ${LVB[S.lot.lv]<0||(S.lot.dom==="Hung"&&S.lot.lv>=3)?"r":LVB[S.lot.lv]>0?"g":"n"}">${lotEffect(S.lot)}</span></div>`:"";
 const G=sum.groups.filter(g=>g[1].length).map(([h,L])=>`<h5>${h}</h5>${L.map(x=>{const v=rivals.find(r=>x.includes(r.name));return `<p>${v?mdH(pv(v),"xs"):/Hoàng thượng/.test(x)?mdH(pEmp(),"xs"):""}${x.length>110?x.slice(0,108)+"…":x}</p>`}).join("")}`).join("");
 w.innerHTML=`<div class="dsky"><i class="lan l1"></i><i class="lan l2"></i><i class="lan l3"></i><i class="sun"></i></div><div class="dbox"><p class="dsea">${SEASON[S.month-1]} · ${S.wx?S.wx.n:""}</p><h2>Năm ${S.year} · Tháng ${S.month} · ${TUAN[S.tuan][0].toUpperCase()+TUAN[S.tuan].slice(1)}</h2>${lot}
  <div class="dcard"><h4>Tuần qua</h4><div class="ddelta">${d}</div>${sum.rank?`<p class="g"><b>${sum.rank}</b></p>`:""}${sum.kids>0?`<p class="g">Thêm ${sum.kids} con</p>`:""}${G||'<p class="past">Một tuần yên ả.</p>'}</div>
  <button class="main" id="dawn-go">Vào ngày mới</button></div>`;
 w.hidden=false;w.classList.toggle("rm",reducedMotion());void w.offsetWidth;w.classList.add("on");setTimeout(bell,reducedMotion()?0:1400);
 const close=()=>{w.classList.remove("on");setTimeout(()=>{w.hidden=true},reducedMotion()?0:350);w.onclick=null};w.onclick=close;const b=$("dawn-go");if(b)b.focus({preventScroll:true})}
/* ================= ONE UI KIT: effect line, odds chip, act card; every card, choice and action button goes through it ================= */
const KRED=/(tru di|ban chết|lộ:|bị lộ|bị phạt|phạt|giáng|sảy|chết|lật tẩy|mất |mất$|tội|nguy|hỏng|không ai tin|bị bắt|cấm túc|báo cho chủ|lạnh nhạt|bị đồn|đuổi|truy)/i;
const KHOST=/(thù|oán|ghen|nàng nắm|nắm .*chứng cứ của ngươi|nhắm vào thai|nghi ngươi|bị đuổi)/i;
const KGOOD=/(\+\s?\d|dễ |dễ$|được|biết|che chở|giữ|thân|thiện cảm|chứng cứ|thăng|ban thưởng|bớt|tăng)/i;
const KNEU=/^(không|không tốn|không mất gì|không được mất gì|chỉ |—|\d+ (khắc|việc)|2 khắc|tốn 2 khắc|chọn )/i;
function kcls(t){const s=t.replace(/<[^>]+>/g,"").trim();if(!s)return"n";if(/bớt (ghen|thù|oán)|hết (ghen|thù)/i.test(s))return"g";if(KNEU.test(s))return"n";if(KHOST.test(s))return"r";
 if(/(\bnàng\b|con nàng|của nàng)/i.test(s)&&(/-\s?\d|sảy|chết|mất|phế|bị phạt|tịch thu|sa sút|không được lật thẻ|rơi/i.test(s)))return"g";
 if(KRED.test(s))return"r";if(KGOOD.test(s))return"g";if(/-\s?\d/.test(s))return"r";return"n"}
/* one effect token -> coloured span; fmt() spans keep their colour */
function eff(t){t=String(t).trim();if(!t)return"";if(/^<span class="(g|r)">/.test(t)&&/<\/span>$/.test(t)&&(t.match(/<span/g)||[]).length===1)return t.replace(/^<span class="(g|r)">/,'<span class="ef $1">');
 if(/^<b class="r">/.test(t))return `<span class="ef r">${t.replace(/<[^>]+>/g,"")}</span>`;return `<span class="ef ${kcls(t)}">${t}</span>`}
function effList(x,def){const parts=[].concat(x).filter(Boolean).join(" · ");if(!parts)return eff("không");return parts.split(/ · |, (?![^<]*>)/).filter(s=>s.trim()).map(s=>{let h=eff(s);if(def&&/class="ef n"/.test(h)&&!KNEU.test(s.replace(/<[^>]+>/g,"").trim()))h=h.replace('class="ef n"',`class="ef ${def}"`);return h}).join('<span class="ksep">·</span>')}
function oddsChip(w){if(/^Chắc chắn\b/.test(String(w))||String(w)==="Chắc chắn")return"";const m=String(w).match(ODDW);const k=m?m[1]:w;const lv={"Liều":0,"Khó":1,"Năm ăn năm thua":2,"Khá chắc":3,"Chắc":4,"Rất chắc":5,"Nắm chắc":6,"Chắc chắn":7}[k];const rest=String(w).replace(k,"").replace(/^\s*·\s*/,"");
 return `<span class="oc oc${lv==null?2:lv}">${k}</span>${rest?`<span class="ef ${/khó hơn/.test(rest)?"r":/dễ hơn/.test(rest)?"g":"n"}">${rest}</span>`:""}`}
/* parse a 'word · tốn: … · thành: … · hỏng: … · note' line into kit HTML */
function kitParse(str){str=String(str||"").trim();if(!str)return oddsChip("Chắc chắn");const segs=str.split(/ · (?![^<]*>)/);let odds="",out=[];let cur=null;
 for(let s of segs){const plain=s.replace(/<[^>]+>/g,"").trim();const mo=plain.match(/^(Chắc chắn|Nắm chắc|Rất chắc|Khá chắc|Năm ăn năm thua|Chắc|Khó|Liều)(?=$|\s|·)/);
  if(!odds&&mo&&plain.length<=mo[1].length+2){odds=mo[1];continue}
  if(/^Quẻ: /.test(plain)&&odds){odds+=" · "+plain;continue}
  const ml=s.match(/^\s*(?:<[^>]+>)*\s*(tốn|thành|hỏng|ngay|kèm|Tốn|Thành|Hỏng|Kèm)\s*:\s*/);if(ml){cur={l:ml[1].toLowerCase(),v:[s.slice(ml[0].length)]};out.push(cur);continue}
  if(cur&&cur.l!=="tốn"&&!/^(<b|<br)/.test(s)){cur.v.push(s);continue}out.push({l:"",v:[s]})}
 return (odds?oddsChip(odds):oddsChip("Chắc chắn"))+out.map(o=>(o.l?`<span class="kl">${o.l}</span>`:"")+(o.l==="kèm"?effList(o.v,"r").replace(/class="ef [gn]"/g,'class="ef r"'):effList(o.v,o.l==="thành"?"g":o.l==="hỏng"||o.l==="tốn"?"r":""))).join(" ")}
/* the act card */
function cardH(a,i){const poor=a.c&&a.c.bac&&S.bac+a.c.bac<0,o=a.o==null?100:a.o;const dis=!can(cardCost(a))||a.done||poor||a.lock||S.dead||(a.b!=null&&(S.buoi||0)!==a.b);const rolled=o<100&&!a.lock;
 const ow=rolled?word(cl(o+lotB(S,a.dom),5,95))+lotTag(a.dom,o):"Chắc chắn";
 return `<button class="card kcard" data-i="${i}" ${dis?"disabled":""}><h4>${a.n}</h4><span class="ktime">${pips(cardCost(a))} ${cardCost(a)} khắc${a.b!=null?` · Chỉ ${BUOI[a.b].toLowerCase()}`:""}</span><p>${a.t||""}</p><span class="krow">${oddsChip(ow)}</span>
 <span class="kgrid"><span class="kl">Tốn</span><span>${effList([fmt(a.c)||"không",ducWarnTxt(a.c)])}</span><span class="kl">Thành</span><span>${effList([fmt(a.w||{}),String(a.x||"").split(/ · kèm: /)[0]],"g")}</span>${/ · kèm: /.test(a.x||"")?`<span class="kl">Kèm</span><span>${effList(String(a.x).split(/ · kèm: /)[1],"r").replace(/class="ef [gn]"/g,'class="ef r"')}</span>`:""}${rolled?`<span class="kl">Hỏng</span><span>${effList(fmt(a.l||{})||"không mất gì","r")}</span>`:""}</span></button>`}
/* route the older line builders through the kit */
function ducWarnTxt(c){const d=c&&c.duc;if(!d||d>=0||!S||S.rank>=7)return"";const after=S.duc+d;return after<50?`Đức ${S.duc} → ${after}: ${S.duc>=40?"tụt dưới 50, mất đường lên Hoàng hậu":"cần Đức 50 mới lên Hoàng hậu"}`:""}
let actLineRaw;(function(){const o1=optLine,o2=dilLine,o3=actLine;actLineRaw=o3;optLine=a=>kitParse(o1(a));dilLine=c=>kitParse(o2(c));actLine=(k,w,c)=>kitParse(o3(k,w,c))})();
function kitFix(root){(root||document).querySelectorAll(".rbtn button small,.btn small,.pcb button small,.opt small").forEach(sm=>{if(sm.dataset.kp||sm.querySelector(".oc,.kl,.ef"))return;sm.dataset.kp=1;sm.innerHTML=kitParse(sm.innerHTML)})}
/* ONE portrait frame: the tall gold-framed 3:4 box, one size per breakpoint, for every person who is the subject (cards, dialogs, summaries) */
function pframe(f,col){return `<div class="pfwrap">${pcPort(f||{},col||(f&&f.col)).replace('class="pcp','class="pcp pfr')}${f&&f.rw?`<span class="pfrw">${f.rw}</span>`:""}</div>`}
function pframeArt(src){return `<div class="pcp pfr art"${src?` style="background-image:url(${src})"`:""}></div>`}
/* ===== RESULT FEEDBACK after every act and choice: seal THÀNH / HỎNG, the real deltas, one WHY line ===== */
const RKEYS=[["sung","Sủng"],["danh","Danh"],["suc","Sức"],["bac","Bạc"],["duc","Đức"],["th","Thái hậu với ngươi"],["hh","Hoàng hậu với ngươi"],["sac","Sắc"],["tai","Tài"],["tamco","Tâm cơ"],["mat","Tai mắt"],["an","Ân tình"]];
function rsnap(){if(!S)return null;const o={};RKEYS.forEach(([k])=>o[k]=S[k]||0);o.maid=S.maid?S.maid.loyal:0;o.seq=S.logSeq||0;o.rank=S.rank;return o}
const FAILRE=/(hỏng|không thành|bị phát hiện|bị lộ|lạnh nhạt|không ai tin|từ chối|không động lòng|chưa chuẩn|bỏ qua|bị đuổi|phải lui|không biết gì mới|chỉ cười|bị bắt|thất bại)/i;
function resultShow(title,before,okHint){if(!S||!before||S.dead)return;const d=RKEYS.map(([k,n])=>[n,(S[k]||0)-before[k]]).filter(x=>x[1]);if(S.maid&&S.maid.loyal!==before.maid)d.push(["Lòng cung nữ",S.maid.loyal-before.maid]);
 const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const L=S.logs.slice(0,n).map(plain).reverse();const why=L.join(" ").replace(/\s+/g," ").trim();
 const ok=okHint!=null?okHint:!FAILRE.test(why);if(!d.length&&!why&&okHint==null)return;
 if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t);t.onclick=()=>t.classList.remove("on")}
 t.className="rtoast "+(ok?"ok":"bad");t.innerHTML=`<b class="seal">${ok?"THÀNH":"HỎNG"}</b><div class="rt"><b>${title}</b><div class="rd">${d.map(([k,v])=>{const key=(RKEYS.find(x=>x[1]===k)||[])[0];const now=key?(S[key]||0):null;return `<span class="ef ${v>0?"g":"r"}">${k} ${now!=null?`${now-v} → ${now}`:(v>0?"+":"")+v}</span>`}).join('<span class="ksep">·</span>')||'<span class="ef n">không đổi chỉ số</span>'}</div>${why?`<small>${why.length>140?why.slice(0,138)+"…":why}</small>`:""}</div>`;
 void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),3200)}
function wrapR(name,titleOf,okOf){const f=window[name];if(typeof f!=="function")return;window[name]=function(){const b=rsnap(),ttl=titleOf?titleOf.apply(null,arguments):"";let r;r=f.apply(this,arguments);try{if(b&&(S.logSeq||0)!==b.seq||(b&&RKEYS.some(([k])=>(S[k]||0)!==b[k])))resultShow(ttl,b,okOf?okOf(r,arguments):null)}catch(e){}return r}}
wrapR("act",i=>deck[i]?deck[i].n:"",()=>window.__lastOk==null?null:!!window.__lastOk);
wrapR("doAct",(i,k)=>ACT[k]?ACT[k].n:"");
wrapR("talk",oi=>{try{return talkOpts(curPeople()[popIdx])[oi].n}catch(e){return""}});
wrapR("servAct",a=>({thuong:"Thưởng",phat:"Phạt",hoi:"Hỏi chuyện",doi:"Đổi người",che:"Che chở",mua:"Mua chuộc",doa:"Dọa tố"})[a]||"");
wrapR("courtAct",a=>a==="thuong"?"Biếu":"Hỏi chuyện");
wrapR("empAct",(i,k)=>({judge:"Xử tội",conf:"Tịch thu trang sức",reward:"Ban thưởng",pardon:"Ân xá"})[k]||"");
wrapR("recommend",()=>"Tiến cử");
wrapR("chooseM",i=>{try{return Q[0].opts[i].n}catch(e){return""}});
/* exact result for deck cards: runOpt knows */
(function(){const ro=runOpt;runOpt=function(a){const r=ro.apply(this,arguments);window.__lastOk=r;return r}})();
(function(){const f=window.act;window.act=function(i){window.__lastOk=null;return f.apply(this,arguments)}})();
/* why a card cannot be played, in words */
function cardWhy(a){if(S.dead)return"";if(a.done)return"Đã làm trong buổi này";if(a.b!=null&&(S.buoi||0)!==a.b){const nm=BUOI[a.b].toLowerCase();return (S.buoi||0)>a.b?`Đã qua ${nm} — mở lại ${nm} mai`:`Chỉ ${nm} — chờ đến ${nm}`}
 if(a.c&&a.c.bac&&S.bac+a.c.bac<0)return `Thiếu bạc (cần ${-a.c.bac})`;if(a.lock)return a.t||"Chưa đủ điều kiện";const w=whyTime(cardCost(a));return w?(/khắc/.test(w)?"Hết khắc buổi này — chờ buổi sau":w):""}
(function(){const ch=cardH;cardH=function(a,i){let h=ch(a,i);const txt=(a.t||"")+" "+(a.x||"");const vs=rivals.filter(v=>txt.includes(v.name));if(vs.length)h=h.replace("<h4>",`<h4>${vs.slice(0,2).map(v=>mdH(pv(v),"xs")).join("")}`);const w=cardWhy(a);return w?h.replace('<span class="krow">',`<span class="kwhy">${w}</span><span class="krow">`):h}})();
/* ===== RANK GROUNDS for every portrait frame and avatar ===== */
function rkOfFace(kind,o){if(kind==="consort"){if(o.out)return["cold","Phế phi · lãnh cung"];const r=o===S?S.rank:(o.queen?7:o.rank);return["c"+r,r>=7?"Hoàng hậu":RANKS[r].n]}
 if(kind==="serv"){const r=srk(o);return[(o.role==="maid"?"sv":"eu")+r,srkName(o)]}return[kind,""]}
/* ===== the always-visible status row (was inside Hành động) ===== */
const HX={buoi:"Mỗi buổi có 4 khắc. Mỗi việc tốn khắc; hết khắc thì sang buổi sau.",date:"Ngày tháng trong cung. Mỗi tuần có 3 buổi, mỗi tháng 3 tuần.",lot:"Quẻ đầu tuần. Gieo lại tốn 10 bạc và 1 khắc.",sac:"Sắc: nhan sắc. Giúp múa, thị tẩm, được để ý.",tai:"Tài: tài học. Giúp đàn, thơ, nói chuyện với Hoàng thượng.",tamco:"Tâm cơ: mưu trí. Giúp dò la, mưu kế, nhìn thấu.",duc:"Đức: tiếng hiền. Cần 50 để lên Hoàng hậu (mẹ Thái tử 40).",mat:"Tai mắt: người của ngươi khắp cung. Giúp biết tin, phát giác mưu hại.",th:"Thái hậu với ngươi: lòng thương của Thái hậu.",hh:"Hoàng hậu với ngươi: chính là thiện cảm của Hoàng hậu với ngươi (một con số duy nhất).",maid:"Lòng cung nữ thân tín. Dưới 45 dễ bị mua chuộc.",con:"Khả năng có thai mỗi lần thị tẩm.",dem:"Khả năng được lật thẻ bài mỗi tuần.",an:"Ân tình: tình nghĩa với Hoàng thượng, tích qua các đêm."};
const HXN={sac:"Sắc",tai:"Tài",tamco:"Tâm cơ",duc:"Đức",mat:"Tai mắt",th:"Thái hậu",hh:"Hoàng hậu",maid:"Lòng cung nữ",an:"Ân tình",aw:"Ân thưởng"};
function renderHud2(){const el=$("hud2");if(!el||!S)return;const prev=window.__h2p||{};const cur={};
 const c=(k,label,val,cls,ico)=>{cls=(cls||"")+(["buoi","lot","date"].includes(k)?" keep":"");cur[k]=val;const ch=prev[k]!=null&&typeof val==="number"&&prev[k]!==val?val-prev[k]:0;return `<button class="hc ${cls||""}${ch?" flash":""}" data-hx="${k}">${ico?ic(ico,12):""}${label}${val!=null&&val!==""?` <b>${val}</b>`:""}${ch?`<i class="${ch>0?"g":"r"}">${ch>0?"+":""}${ch}</i>`:""}</button>`};
 const st=[S.preg?c("preg",S.hidden?"Giấu thai":"Mang thai",`th.${S.preg}`,"hot","thai"):"",illOf(S)?c("ill",illName(S),"","hot"):"",S.fakeIll?c("fake","Giả bệnh","","hot"):"",S.out?c("out","Lãnh cung","","hot"):"",S.block?c("block","Thẻ bài bị rút",`${S.block} tuần`,"hot"):"",S.doctor?c("doc","Thái y tâm phúc","","ok"):"",S.confined?c("conf","Cấm túc",`${S.confined} tháng`,"hot"):"",S.shield?c("shield","Hoàng hậu che chở","","ok"):"",S.preg>=6&&!S.fake?c("birth","Sinh nở",word(Math.round(100-birthRisk(S))),birthRisk(S)>5?"hot":""):""];
 let colz=window.__h2c!=null?window.__h2c:true;try{const v=localStorage.getItem("hclh-h2c");if(v!=null)colz=v==="1"}catch(e){}el.classList.toggle("col",colz);el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${colz?"Mở rộng":"Thu gọn"}">${colz?"▾":"▴"}</button>`+c("date",`T${S.month}/${S.year} · ${TUAN[S.tuan]}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${4-used} khắc`)+(S.lot?c("lot",`Quẻ ${LV[S.lot.lv]}·${S.lot.dom}`,"",LVB[S.lot.lv]<0||S.lot.dom==="Hung"&&S.lot.lv>=3?"hot":LVB[S.lot.lv]>0?"ok":""):"")+
  c("sac","Sắc",S.sac,"","sac")+c("tai","Tài",S.tai,"","tai")+c("tamco","Tâm cơ",S.tamco,"","tam-co")+c("duc","Đức",S.duc,S.rank<7&&S.duc<50?"hot":"","duc")+c("mat","Tai mắt",S.mat,"","tai-mat")+c("th","Thái hậu với ngươi",S.th,"","thai-hau")+(queenP()&&queenP()!==S?c("hh","Hoàng hậu với ngươi",S.hh,S.hh<-20?"hot":S.hh>20?"ok":"","hoang-hau"):"")+c("maid",S.maid.name.split(" ").pop(),S.maid.loyal,S.maid.loyal<45?"hot":"")+c("con","Thai",word(conceiveCh()))+c("dem","Lật thẻ",word(nightCh()))+c("an","Ân tình",S.an||0,(S.an||0)>=50?"ok":"")+c("bl","Bổng lộc sau",`${3-S.tuan} tuần`)+c("aw","Ân thưởng",(S.awards||[]).length)+st.join("");
 if(colz){const chg=Object.keys(cur).filter(k=>typeof cur[k]==="number"&&prev[k]!=null&&prev[k]!==cur[k]).map(k=>`${(HXN[k]||k)} ${cur[k]-prev[k]>0?"+":""}${cur[k]-prev[k]}`);if(chg.length)el.insertAdjacentHTML("beforeend",`<span class="h2pulse">${chg.join(" · ")}</span>`)}window.__h2p=cur;
 el.onclick=e=>{if(e.target.closest(".h2t")||(el.classList.contains("col")&&e.target.closest(".hc.keep"))){const nv=el.classList.contains("col")?"0":"1";window.__h2c=nv==="1";try{localStorage.setItem("hclh-h2c",nv)}catch(x){}window.__h2p=cur;renderHud2();return}const b=e.target.closest(".hc");if(!b||Q.length||S.dead)return;const k=b.dataset.hx;
  if(k==="lot"&&S.lot){const can1=!S.relot&&S.bac>=10&&can(1);Q.unshift({t:`Quẻ ${LV[S.lot.lv]} · ${S.lot.dom}`,h:lotHTML(S.lot)+`<p class="past">${HX.lot}</p>`+(can1?`<div class="opts"><button class="opt" id="relot2">Gieo lại<small>${kitParse("Chắc chắn · tốn: Bạc -10, 1 khắc")}</small></button></div>`:"")});showModal();const r=$("relot2");if(r)r.onclick=()=>{Q.shift();showModal();reLot(false)};return}
  if(k==="bl"){Q.unshift({t:"Bổng lộc",h:blCard()});showModal();return}if(k==="aw"){Q.unshift({t:"Ân thưởng",h:awCard()});showModal();return}const t=HX[k]||b.textContent;Q.unshift({t:b.textContent.replace(/[+-]\d+$/,"").trim(),h:`<p>${t}</p>`});showModal()}}
/* keep the Pixi scene the size of the stage whenever the layout changes (not only on window resize) */
(function(){let ro=null;setInterval(()=>{try{if(PX&&PX.app&&!ro&&window.ResizeObserver){const st=$("stage");ro=new ResizeObserver(()=>{try{PX.app.resize()}catch(e){}});ro.observe(st)}}catch(e){}},1000)})();
/* every disabled button says why */
function guessWhy(b){const t=b.textContent;if(S&&S.dead)return"";const m=t.match(/Bạc -(\d+)/);if(m&&S.bac<+m[1])return `thiếu bạc (cần ${m[1]})`;if(/việc|khắc/.test(t)&&!can(2))return used>=4?"hết khắc buổi này":"Sức dưới 20";if(S.confined)return"đang cấm túc";return"chưa đủ điều kiện"}
(function(){const kf=kitFix;kitFix=function(root){kf(root);(root||document).querySelectorAll(".rbtn button:disabled,.btn:disabled,.pcb button:disabled").forEach(b=>{if(b.querySelector(".kwhy"))return;const sm=b.querySelector("small");const w=guessWhy(b);if(!w)return;if(sm)sm.insertAdjacentHTML("afterbegin",`<span class="kwhy">${w}</span> `);else b.insertAdjacentHTML("beforeend",`<small><span class="kwhy">${w}</span></small>`)})}})();
/* ================= BỔNG LỘC (monthly, every consort by the same ladder) and ÂN THƯỞNG ================= */
const BL=[30,45,60,90,130,180,240,320];
const BLG=["1 súc vải · 1 gói trà","1 súc vải · 1 gói trà · than","1 súc lụa · 1 hộp trà · than","1 súc lụa · 1 hộp trà · than · son phấn","2 súc lụa · 2 hộp trà · than · son phấn","2 súc gấm · 2 hộp trà · than · son phấn","3 súc gấm · trà · than · son phấn · yến sào","4 súc gấm · trà · than · son phấn · yến sào · sâm"];
const WAGE=3;
/* pays one consort her month; returns the plain line */
function stipend(p){const r=rkOf(p),me=p===S,staff=(p.staff||[]).length;let base=BL[Math.min(7,r)],why=[];
 if(p.out){base=5;why.push("lãnh cung: chỉ 5 bạc")}else{if(p.confined){base=Math.round(base/2);why.push("cấm túc: nửa bổng")}if(p.cutPay>0){base=Math.round(base*.7);why.push(`Nội vụ phủ khất bổng${p.cutBy?" theo ý "+p.cutBy:""}; bớt 3 phần 10`);p.cutPay--;if(!p.cutPay)p.cutBy=""}}
 const wage=p.out?0:staff*WAGE,bonus=p.bonusPay||0;p.bonusPay=0;const net=base-wage+bonus;ap(p,{bac:net});
 const line=`Bổng lộc tháng ${S.month} (${rkName(p)}): +${base} bạc${p.out?"":" · "+BLG[Math.min(7,r)]}${wage?` · công ${staff} kẻ hầu -${wage}`:""}${bonus?` · ân thưởng +${bonus}`:""} = ${net>=0?"+":""}${net} bạc${why.length?" ("+why.join("; ")+")":""}.`;
 return me?line:""}
/* a hostile Empress (or her, when Empress, by her own act) may have Nội vụ phủ hold back a consort's pay */
function payCuts(){const q=queenP();if(!q)return;for(const p of consorts()){if(p===q||p.out)continue;if(q!==S&&rel(q,p)<-30&&roll(20)){p.cutPay=Math.max(p.cutPay||0,1);p.cutBy=q.name;if(p===S)log(`<span class="r">Hoàng hậu ${q.name} sai Nội vụ phủ khất bổng lộc của ngươi tháng tới.</span>`)}}}
/* the NPC Empress rewards her closest ally a little each season (two-way: she, as Empress, has 'Ban thưởng') */
function queenRewards(){const q=queenP();if(!q||q===S||S.month%3)return;const L=consorts().filter(p=>p!==q&&!p.out).sort((a,b)=>rel(q,b)-rel(q,a));const w=L[0];if(!w||rel(q,w)<20)return;ap(w,{bac:20});w.ghen=cl((w.ghen||0)-5,0,100);if(w===S)log(`Hoàng hậu ${q.name} ban thưởng ngươi 20 bạc vì hiền thục. Bạc +20.`)}
function blCard(){return `<p>Bổng lộc phát ngày đầu mỗi tháng, theo phẩm vị (mọi phi tần như nhau). Mỗi kẻ hầu ăn công ${WAGE} bạc/tháng.</p><div class="pcb rows">${BL.map((b,i)=>`<div class="pcrow"><span>${i>=7?"Hoàng hậu":RANKS[i].n}</span><b>${b} bạc</b></div><div class="pcrow"><span class="past">${BLG[i]}</span><span></span></div>`).join("")}</div><p class="past">Lãnh cung: chỉ 5 bạc. Cấm túc: nửa bổng. Hoàng hậu ghét có thể sai Nội vụ phủ khất bổng (bớt 3 phần 10). Sinh con, được ân thưởng: cộng thêm một lần.</p>`}
/* ân thưởng: every reward has silver + item + jealousy; recorded */
const BBAC={night:0,contest:20,son:30,dau:15,promo:20,accuse:10,story:10,birthday:15,sinhthan:20,nurse:15};
BEST.dau=["tuithom","sonphan","luahang"];BEST.sinhthan=["tramngoc","vongngoc","gamto"];BEST.nurse=["nhansam","yensao","agiao"];
BWHY.dau="mừng công chúa ra đời";BWHY.sinhthan="nhân sinh thần của ngươi";BWHY.nurse="vì hầu thuốc chu đáo";
(function(){const b0=bestow;bestow=function(p,why){const n0=(p&&p.inv||[]).length,q0=Q.length;b0(p,why);if(!p||!p.inv||p.inv.length===n0)return;const k=p.inv[p.inv.length-1].k,bac=BBAC[why]||0;if(bac)ap(p,{bac});
 if(p===S){ghenAll(3);S.awards=(S.awards||[]);S.awards.unshift({d:`T${S.month}/${S.year}`,why:BWHY[why]||why,it:IT[k].n,bac});if(S.awards.length>60)S.awards.length=60;
  const m=Q[Q.length-1];if(Q.length>q0&&m&&m.t==="Thánh thượng ban thưởng")m.h+=`<p>${kitParse(`Chắc chắn · thành: ${IT[k].n}${bac?`, Bạc +${bac}`:""} · phi tần ghen +3`)}</p>`;log(`Ân thưởng ${BWHY[why]||""}: ${IT[k].n}${bac?`, Bạc +${bac}`:""}; phi tần ghen +3.`)}
 else{S.pg=0;p.pg=cl((p.pg||0)+3,0,100)}}})();
const AREASON=[["Đêm thị tẩm vui","night"],["Thắng ở yến tiệc, thi tài","contest"],["Sinh hoàng tử","son"],["Sinh công chúa","dau"],["Được tấn phong","promo"],["Tố giác kẻ gian thành","accuse"],["Tuyến truyện thành","story"],["Tiết Vạn thọ (tháng 8, người được sủng nhất)","birthday"],["Sinh thần của ngươi (Sủng từ 50)","sinhthan"],["Hầu thuốc Hoàng thượng khi ngài bệnh","nurse"]];
function awCard(){return `<p>Việc được ban thưởng và có thể nhận gì (mỗi lần: phi tần khác ghen +3):</p><div class="pcb rows">${AREASON.map(([n,k])=>`<div class="pcrow"><span>${n}</span><b>${(BEST[k]||[]).map(x=>IT[x]?IT[x].n:x).slice(0,3).join(", ")}${BBAC[k]?` · +${BBAC[k]} bạc`:""}</b></div>`).join("")}</div><p class="past">Sinh con, tấn phong, thi tài còn có thể được ban hiệu (Danh +5). Hoàng hậu ban thưởng người thân cận mỗi mùa.</p>`+
 `<h3>Sổ ân thưởng</h3>${(S.awards||[]).length?`<div class="pcb rows">${S.awards.map(a=>`<div class="pcrow"><span>${a.d} · ${a.why}</span><b>${a.it}${a.bac?` · +${a.bac} bạc`:""}</b></div>`).join("")}</div>`:`<p class="past">Chưa được ban thưởng lần nào.</p>`}`}
/* hook the month: stipends for everyone, cuts, seasonal and calendar rewards */
function monthPay(){let ev="";payCuts();const l=stipend(S);if(l)log(l);for(const v of liveRivals(true))stipend(v);queenRewards();
 if(S.month===8){const top=consorts().filter(p=>!p.out).sort((a,b)=>b.sung-a.sung)[0];if(top&&top.sung>=40)bestow(top,"birthday")}
 if(S.bmonth==null)S.bmonth=1+R(12);if(S.month===S.bmonth&&S.sung>=50&&!S.out)bestow(S,"sinhthan");return ev}
/* nursing the Emperor through illness: a card while he is ill */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(S&&S.emp&&S.emp.ill&&!S.out&&!S.confined)deck.unshift({n:"Hầu thuốc Hoàng thượng",t:"Long thể bất an. Ngươi sang Dưỡng Hòa điện sắc thuốc, hầu bên giường.",c:{suc:-10},o:od(65+S.arts.y*5),w:{sung:4,an:2},l:{suc:-5},x:"có thể được ban thưởng",dom:"Sủng",go:()=>{if(roll(40))bestow(S,"nurse")}})}})();
/* ================= WHAT SHE KNOWS: info acts show the facts, keep them, relation view in words ================= */
function kn(){S.kf=S.kf||{};S.notes=S.notes||{};S.met=S.met||{};return S}
function noteAdd(id,t){kn();const L=S.notes[id]=S.notes[id]||[];L.unshift(`T${S.month}/${S.year} ${TUAN[S.tuan]}: ${t}`);if(L.length>6)L.length=6}
function agoW(w){const d=wk()-w;return d<=0?"tuần này":d===1?"tuần trước":`${d} tuần trước`}
/* the favour book: true values; a weak look shows only the top 3 */
function favorBook(full){kn();const P=consorts().filter(p=>!p.out).sort((a,b)=>b.sung-a.sung);const L=full?P:P.slice(0,3);const m0=S.turn*3;
 const last=P.map(p=>[p,Math.max(-1,...(p.nightLog||[]))]).sort((a,b)=>b[1]-a[1])[0];
 const rows=L.map(p=>{const n=(p.nightLog||[]).filter(w=>w>=m0).length;if(p!==S){S.kf[p.id]={s:p.sung,n,w:wk()};noteAdd(p.id,`Sủng ${p.sung}, ${n} đêm tháng này${p.preg&&!p.hidden?", có thai":""}`)}
  return `<div class="fbrow">${mdH(p===S?pMe():pv(p),"xs")}<b>${p===S?"Ngươi":p.name}</b><span class="past">${rkName(p)}</span><span class="ef g">Sủng ${p.sung}</span><span class="ef n">${n} đêm tháng này</span>${p.preg&&!p.hidden?'<span class="ef r">có thai</span>':""}</div>`}).join("");
 return `<div class="fbook"><b>Sổ thị tẩm${full?"":" (chỉ xem lướt được 3 người đầu)"}:</b>${rows}${last&&last[1]>=0?`<p class="past">Lần lật thẻ gần nhất: ${last[0]===S?"ngươi":last[0].name} (${agoW(last[1])}).</p>`:""}</div>`}
/* Kính sự phòng: the book is shown, not just 'thành' */
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(p&&p.kind==="ksp"){const i=A.findIndex(a=>a.n==="Xem sổ thị tẩm");if(i>=0)A[i]=Object.assign({},A[i],{go:null,run:()=>favorBook(true),x:"thấy Sủng và số đêm của từng người"})}return A}})();
(function(){const c0=courtAct;courtAct=function(a,k){if(a==="hoi"&&k==="ksp"&&S.court&&!S.dead&&!Q.length&&can(2)){spend(2);S.court.ksp.af.me=(S.court.ksp.af.me||0)+1;const full=roll(60);Q.unshift({t:"Thái giám Kính sự phòng kể",who:pEunCourt("ksp"),h:favorBook(full)});log(`Hỏi Kính sự phòng: ${full?"xem trọn sổ thị tẩm":"chỉ nghe được 3 người đầu"}.`);showModal();render();return}return c0.apply(this,arguments)}})();
/* every talk result also shows what was learned (the lines it logged) */
(function(){const t1=talk;talk=function(oi){const b=S?S.logSeq||0:0;const p=S&&curPeople()[popIdx];const r=t1.apply(this,arguments);try{if(p&&p.ref&&p.ref.id!=null){kn();S.met[p.ref.id]=wk()}const n=(S.logSeq||0)-b;if(n>0&&popMsg){const L=S.logs.slice(0,n).map(plain).filter(x=>!/^[^.]{1,40}\. (Thành|Hỏng)\./.test(x)&&!popMsg.includes(x));if(L.length)popMsg+=`<br><span class="past">${L.join(" ")}</span>`;renderStage()}}catch(e){}return r}})();
/* acting on someone means having met her */
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];if(v){kn();S.met[v.id]=wk();if(k==="spy"){const e0=v.ev;const r=d0.apply(this,arguments);if(v.ev>e0)noteAdd(v.id,`dò la được thêm 1 chứng cứ (nay ${v.ev}); Sủng ${v.sung}`);S.kf[v.id]={s:v.sung,n:(v.nightLog||[]).filter(w=>w>=S.turn*3).length,w:wk()};return r}}return d0.apply(this,arguments)}})();
/* ladder words for feelings */
function affW(v){return v<=-60?"Thù":v<=-30?"Ghét":v<-10?"Lạnh nhạt":v<=10?"Bình thường":v<30?"Có cảm tình":v<60?"Thân":"Thân thiết"}
function oanW(v){return v<=10?"Không oán":v<30?"Hơi oán":v<60?"Oán":"Thù sâu"}
function fbar(v,lo,hi,good){const pc=cl((v-lo)/(hi-lo)*100,0,100);return `<span class="fbar"><u class="${good?"g":"r"}" style="width:${pc}%"></u></span>`}
function feel(a,o){return a==null?`<span class="ef n">chưa rõ</span>`:`<span class="ef ${a>10?"g":a<-10?"r":"n"}">${affW(a)} · ${a>0?"+":""}${a}</span>${fbar(a,-100,100,a>=0)} <span class="ef ${o>=30?"r":o>10?"r":"n"}">${oanW(o)} · ${Math.round(o)}</span>${fbar(o,0,100,false)}`}
function pron(p){return p==="emp"?"ngài":p==="th"?"người":"nàng"}
function knows(v){kn();return v===S||!!S.met[v.id]||sameHouse(S,v)||(v.ev||0)>0||(S.mat||0)>=4}
function relLines(v){return [`<span class="rlab">Ngươi với ${pron(v)}:</span> ${feel(aff(S,v),oan(S,v))}`,`<span class="rlab">${pron(v)[0].toUpperCase()+pron(v).slice(1)} với ngươi:</span> ${knows(v)?feel(aff(v,S),oan(v,S)):feel(null)}`]}
function favLine(v){kn();const k=S.kf[v.id];return k?`${ic("sung",14)}Sủng ${k.s} <span class="past">(biết ${agoW(k.w)})</span>`:`${ic("sung",14)}Sủng: <span class="past">chưa rõ (xem sổ thị tẩm)</span>`}
function notesLine(v){kn();const L=S.notes[v.id]||[];return L.length?`<span class="past">Đã biết: ${L.slice(0,2).join(" · ")}</span>`:""}
/* the relation tab, one kit piece */
function relHTML(){kn();const P=consorts();const sel=relSel==="emp"||relSel==="th"?relSel:(byKey(relSel)||S);
 const chips=[["me","Ngươi",pMe()]].concat(liveRivals(true).map(v=>[v.id,v.name,pv(v)]),[["emp","Hoàng thượng",pEmp()]],S.thDead?[]:[["th","Thái hậu",pTH()]]);
 let h=`<div class="relsel"><span class="past">Xem quan hệ của:</span>${chips.map(([k,n,f])=>`<button data-rel="${k}" aria-pressed="${String(k)===String(relSel)}">${mdH(f,"xs")}${n}</button>`).join("")}</div><p class="past rleg">Thiện cảm: càng cao càng quý mến · Oán: càng cao càng thù.</p>`;
 const row=(f,name,rank,lines)=>`<div class="rrow2">${mdH(f,"sm")}<div><b>${name}</b> <span class="past">${rank}</span>${lines.map(l=>`<div class="rl">${l}</div>`).join("")}</div></div>`;
 if(sel==="emp"){return h+row(pEmp(),"Hoàng thượng",empName(),[`<span class="rlab">Với ngươi:</span> <span class="ef g">Sủng ${S.sung}</span>${fbar(S.sung,0,100,true)} <span class="ef g">Ân tình ${S.an||0}</span>${fbar(S.an||0,0,100,true)}`])+liveRivals(true).map(v=>row(pv(v),v.name,rkName(v),[`<span class="rlab">Ngài với nàng:</span> ${favLine(v)}`])).join("")}
 if(sel==="th"){return h+row(pTH(),"Thái hậu","",[`<span class="rlab">Người với ngươi:</span> <span class="ef ${S.th>=0?"g":"r"}">Thương ${S.th}</span>${fbar(S.th,-100,100,S.th>=0)}`])+liveRivals(true).map(v=>row(pv(v),v.name,rkName(v),[`<span class="rlab">Người với nàng:</span> ${knows(v)?`<span class="ef ${v.th>=0?"g":"r"}">Thương ${v.th||0}</span>`:'<span class="ef n">chưa rõ</span>'}`])).join("")}
 if(sel===S){return h+row(pEmp(),"Hoàng thượng","",[`<span class="rlab">Ngài với ngươi:</span> <span class="ef g">Sủng ${S.sung}</span>${fbar(S.sung,0,100,true)} <span class="ef g">Ân tình ${S.an||0}</span>`])+(S.thDead?"":row(pTH(),"Thái hậu","",[`<span class="rlab">Người với ngươi:</span> <span class="ef ${S.th>=0?"g":"r"}">Thương ${S.th}</span>${fbar(S.th,-100,100,S.th>=0)}`]))+P.filter(p=>p!==S).map(v=>row(pv(v),v.name+(sameHouse(S,v)?" · cùng cung":""),rkName(v),relLines(v).concat([notesLine(v),`<span class="pcb">${seeBtn(v)}</span>`].filter(Boolean)))).join("")}
 if(!knows(sel))return h+`<p class="past">Ngươi chưa gặp ${sel.name}, chưa rõ nàng đối với người khác ra sao. Gặp nàng, dò la, hoặc có thêm tai mắt.</p>`;
 return h+P.filter(p=>p!==sel).map(p=>row(p===S?pMe():pv(p),p===S?"Ngươi":p.name,rkName(p),[`<span class="rlab">${sel.name} với ${p===S?"ngươi":"nàng"}:</span> ${feel(aff(sel,p),oan(sel,p))}`])).join("")}
/* ===== ONE TAP TO A PERSON; the map shows who she can know is there ===== */
/* fog: she knows where someone is only if she saw her there this buổi or her eyes reported it this buổi */
function bkey(){return wk()+"-"+(S.buoi||0)}
function seeLoc(v,k){kn();S.seenLoc=S.seenLoc||{};S.seenLoc[v.id]={k:k||whereOf(v),b:bkey()}}
function locKnown(v){const s=S.seenLoc&&S.seenLoc[v.id];return s&&s.b===bkey()&&s.k===whereOf(v)?s.k:null}
/* faces on the map only for the exceptions: her household, public schedules, and people seen/reported this buổi */
function seenAt(k){const W=S.where||{},L=[];if(W.emp===k&&k==="dtd"&&(S.buoi||0)===2)L.push(pEmp());if(k==="tn"&&!S.thDead&&(S.buoi||0)===0)L.push(pTH());if(k==="home"){L.push(pMaid());S.kids.filter(x=>x.alive).forEach(x=>L.push(kidFace(x)))}
 for(const v of rivals)if(v.alive&&!v.out&&W[v.id]===k&&locKnown(v)===k)L.push(Object.assign(pv(v),{see:v.id}));return L}
function seenFaces(k){const L=seenAt(k),n=countAt(k);if(!n)return"";return `<span class="mfaces">${L.slice(0,5).map(f=>f.see!=null?`<i data-see="${f.see}">${mdH(f,"xs")}</i>`:mdH(f,"xs")).join("")}${n>L.length?`<span class="mq">+${n-L.length} chưa rõ</span>`:""}</span>`}
/* walk to a consort and open her card; if she has gone, say where, offer to follow */
function goSee(id){const v=rivals.find(x=>x.id===id);if(!v||S.dead||Q.length)return;const k=whereOf(v);
 const open=()=>{const i=curPeople().findIndex(p=>p.ref===v&&p.kind!=="chest");if(i>=0){popIdx=i;popMsg=""}else{const now=whereOf(v);S.visit.msg=`${v.name} vừa rời đi, sang ${placeName(now)}. <button class="btn" data-follow="${v.id}">Theo đến<small>${travel(S.place,now)} khắc</small></button>`}renderStage()};
 if(S.place===k){open();return}const tc=travel(S.place,k);if(!can(tc+1)||S.confined||S.out)return;goTo(k);open()}
function seeBtn(v){if(!v||v===S||!v.alive||v.out||together(S,v)||!locKnown(v))return"";const k=whereOf(v),tc=travel(S.place,k);const why=S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":!can(tc+1)?"đến nơi sẽ hết khắc — chờ buổi sau":"";
 return pbtn(`data-see="${v.id}" class="seeb"`,`Đến gặp ${v.name.split(" ").pop()}`,`Chắc chắn · tốn: ${tc} khắc · thành: gặp mặt, mọi việc làm tại chỗ, dễ hơn sai người`,why)}
document.addEventListener("click",e=>{const s=e.target.closest("[data-see]");if(s&&!s.disabled){e.preventDefault();e.stopPropagation();goSee(+s.dataset.see);return}const f=e.target.closest("[data-follow]");if(f){e.preventDefault();e.stopPropagation();goSee(+f.dataset.follow)}},true);
/* finding someone: send her eyes (1 khắc), or invite her over */
function scoutBtn(v){if(!v||!v.alive||v.out||locKnown(v)||together(S,v))return"";const o=od(50+(S.mat||0)*8+S.tamco/10);return pbtn(`data-scout="${v.id}"`,"Sai tai mắt dò nơi ở",`${word(o)} · tốn: 1 khắc · thành: biết nàng ở đâu buổi này · hỏng: không dò ra`,whyTime(1))}
function inviteBtn(v){if(!v||!v.alive||v.out||sameHouse(S,v))return"";const pend=S.invite&&S.invite.id===v.id;const o=od(40+aff(v,S)/2+(S.rank-rkOf(v))*5);return pbtn(`data-invite="${v.id}"`,"Mời đến cung ta",`${word(o)} · tốn: 1 khắc · thành: buổi sau nàng sang cung ngươi · hỏng: nàng từ chối, thân -3`,pend?"đã mời, chờ buổi sau":whyTime(1)||(aff(v,S)<-30?"nàng ghét ngươi, sẽ không đến":""))}
function scout(id){const v=rivals.find(x=>x.id===id);if(!v||!can(1)||S.dead||Q.length)return;spend(1);const o=od(50+(S.mat||0)*8+S.tamco/10);if(roll(o)){seeLoc(v);log(`Tai mắt báo: ${v.name} đang ở ${placeName(whereOf(v))} buổi này.`)}else log(`Tai mắt không dò ra ${v.name} ở đâu.`);render()}
function invite(id){const v=rivals.find(x=>x.id===id);if(!v||!can(1)||S.dead||Q.length)return;spend(1);S.invite={id:v.id,o:od(40+aff(v,S)/2+(S.rank-rkOf(v))*5)};log(`Ngươi sai người mời ${v.name} buổi sau sang cung.`);render()}
document.addEventListener("click",e=>{const s=e.target.closest("[data-scout]");if(s&&!s.disabled){e.stopPropagation();scout(+s.dataset.scout);return}const i=e.target.closest("[data-invite]");if(i&&!i.disabled){e.stopPropagation();invite(+i.dataset.invite)}},true);
/* invitations land when the next buổi's places are drawn; rivals may invite her too */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{if(S.invite){const v=rivals.find(x=>x.id===S.invite.id);const o=S.invite.o;S.invite=null;if(v&&v.alive&&!v.out&&!v.confined){if(roll(o)){S.where[v.id]="home";seeLoc(v,"home");log(`${v.name} nhận lời, sang cung ngươi buổi này.`)}else{relAdd(S,v,-3);log(`${v.name} từ chối lời mời.`)}}}
  const f=liveRivals(true).filter(v=>aff(v,S)>=30&&!v.confined&&!sameHouse(S,v));if(f.length&&roll(4)){const v=pick(f);const k=palaceOf(v);S.where[v.id]=k;seeLoc(v,k);log(`${v.name} sai người mời ngươi sang cung nàng chơi buổi này.`)}}catch(e){}}})();
/* arriving somewhere reveals who is there */
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k)curPeople().forEach(p=>{if(p.ref&&p.kind!=="chest"&&p.ref.id!=null)seeLoc(p.ref,k)})}catch(e){}return r}})();
/* ===== visiting a consort at her own palace: chance she is home; her gatekeeper may tell where she went ===== */
function visitBtn(v){if(!v||!v.alive||v.out||sameHouse(S,v))return"";const k=palaceOf(v),tc=travel(S.place,k);if(S.place===k)return"";
 return pbtn(`data-visit="${v.id}"`,`Đến cung nàng thăm`,`Chắc chắn · tốn: ${tc} khắc · thành: nếu nàng ở nhà thì gặp mặt · có khi nàng đi vắng`,S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":!can(tc+1)?"đến nơi sẽ hết khắc — chờ buổi sau":"")}
function visitPal(id){const v=rivals.find(x=>x.id===id);if(!v||S.dead||Q.length)return;const k=palaceOf(v),tc=travel(S.place,k);if(!can(tc+1)||S.confined||S.out)return;goTo(k);if(S.place!==k)return;
 const i=curPeople().findIndex(p=>p.ref===v&&p.kind!=="chest");
 if(i>=0){if(aff(v,S)<=-40){S.visit.tk=S.visit.tk||{};S.visit.tk[i]=1;S.visit.msg=`${v.name} cáo bệnh không tiếp ngươi (nàng ghét ngươi).`}else{popIdx=i;popMsg=""}}
 else{const now=whereOf(v);const friend=aff(v,S)>=20||(v.staff||[]).some(s=>s.spyFor==="me");if(friend){seeLoc(v,now);S.visit.msg=`Cung nữ gác cửa: “Nương nương sang ${placeName(now)} rồi.” <button class="btn" data-follow="${v.id}">Theo đến<small>${travel(S.place,now)} khắc</small></button>`}else S.visit.msg="Cung nữ gác cửa: “Nương nương đi vắng.”"}
 renderStage()}
document.addEventListener("click",e=>{const s=e.target.closest("[data-visit]");if(s&&!s.disabled){e.stopPropagation();visitPal(+s.dataset.visit)}},true);
/* two-way: rivals call at her palace; if she is out, her maid tells or keeps quiet by loyalty */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{if(!S||S.out||!roll(4))return;const L=liveRivals(true).filter(v=>!v.confined&&!sameHouse(S,v));if(!L.length)return;const v=pick(L);
  if(S.place==="home"){S.where[v.id]="home";seeLoc(v,"home");log(`${v.name} sang cung ngươi thăm hỏi.`)}else if(S.maid){log(S.maid.loyal>=50?`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid.name} không nói ngươi đi đâu.`:`${v.name} sang cung ngươi thăm, ngươi đi vắng; ${S.maid.name} lỡ miệng nói ngươi ở ${placeName(S.place)}.`)}}catch(e){}}})();
/* her own palace has its art too (night bedchamber; brighter by day) */
SCIMG.home="tam-cung-dem";
/* ================= MEN OF THE PALACE AND FORBIDDEN AFFAIRS (adults; man and woman only; fade to black; full consequences) ================= */
const MROLES=[["Thị vệ","thị vệ",["vuon","thu"],24,8],["Thái y","thái y",["tyv"],29,6],["Vương gia","vương gia",["vuon","tn"],27,6],["Nhạc sư","nhạc sư",["vuon"],31,10],["Sứ thần","sứ thần",["thu","vuon"],34,8]];
const MTR=["phong lưu","trung hậu","tham vọng","đa tình","cẩn trọng"];
FPOOL.man=rng(1,8,i=>"face-man-"+i);
function menInit(){if(!S||S.men)return;const sur=["Tiêu","Lục","Hàn","Thẩm","Bùi","Tống","Mạnh"];S.men=MROLES.map((r,i)=>({id:"m"+i,role:r[0],rw:r[1],haunts:r[2],age:r[3]+R(r[4]),name:`${r[0]} ${pick(sur)} ${MALEN[(i*3+R(3))%MALEN.length]}`,trait:pick(MTR),loyal:40+R(50),af:0,tinh:0,letters:0,trysts:0,alive:true,knowsMe:[]}));S.menW={};S.aff={}}
function manById(id){return (S.men||[]).find(m=>m.id===id&&m.alive)||null}
function pMan(m){faceFor(m,m.rw==="vương gia"?"royal":"man",m.age);const fb=(AV.emperor||[]).filter((x,i)=>i!==S.emp.face)[Number(m.id.slice(1))%3]||"";return{rk:"off",rw:m.role,src:fsrc(m.fc,fb),hue:0,ini:m.name.split(" ").pop()[0],col:"#6a8aa0"}}
/* where the men are this buổi (silhouettes on the map, revealed on arrival) */
(function(){const pw=placeWhere;placeWhere=function(){pw.apply(this,arguments);try{menInit();S.menW={};for(const m of S.men){if(!m.alive)continue;if(roll(55))S.menW[m.id]=pick(m.haunts)}}catch(e){}}})();
(function(){const c0=countAt;countAt=function(k){let n=c0(k);try{for(const id in (S.menW||{}))if(S.menW[id]===k&&manById(id))n++}catch(e){}return n}})();
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k&&S.visit){for(const id in (S.menW||{})){const m=manById(id);if(m&&S.menW[id]===k){S.visit.people.push({kind:"man",ref:m,name:m.name.split(" ").slice(0,1).concat(m.name.split(" ").slice(-1)).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${m.trait}`});m.seen=bkey()}}if(S.visit.people.length&&/Không gặp ai/.test(S.visit.msg||""))S.visit.msg=`Ở đây có ${S.visit.people.length} người.`;renderStage()}}catch(e){}return r}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="man"&&p.ref)return pMan(p.ref);return f0(p)}})();
function tinhW(t){return t>=70?"si mê ngươi":t>=50?"thầm thương ngươi":t>=30?"để ý ngươi":t>=10?"có thiện cảm":"chưa để ý"}
/* risk of being seen: place, her watcher's loyalty, rivals' eyes */
function lộRisk(k){const base={vuon:28,thu:34,tyv:20,tn:40,home:15}[k]||26;const w=watcher();const eyes=liveRivals(true).reduce((s,v)=>s+(v.mat||0),0);return cl(Math.round(base+eyes*2-(w?w.loyal/5:0)-(S.mat||0)*2),6,92)}
function watcher(){const s=(S.staff||[]).filter(x=>x.loyal>=60).sort((a,b)=>b.loyal-a.loyal)[0];if(s)return{name:s.name,loyal:s.loyal,s};if(S.maid&&S.maid.loyal>=60)return{name:S.maid.name,loyal:S.maid.loyal};return null}
function whoMayKnow(){const w=watcher();return [w?w.name+" (canh cửa)":"",...liveRivals(true).filter(v=>(v.mat||0)>=3).map(v=>v.name)].filter(Boolean).slice(0,3).join(", ")||"không ai rõ"}
function affairExposed(m,how){/* full weight: the man dies; she faces death (first-year mercy aside) or lãnh cung */m.alive=false;log(`<span class="r">${how} ${m.name} bị xử trảm.</span>`);if(roll(50))deathSentence(`Bị ban chết vì tư thông với ${m.name}`);else cold(`Tư thông với ${m.name} bị lộ`)}
/* talk options with a man: every step carries its odds word and its risk */
(function(){const t0=talkOpts;talkOpts=function(p){if(!p||p.kind!=="man")return t0.apply(this,arguments);const m=p.ref;if(!m||!m.alive)return[];const k=S.place,risk=lộRisk(k);const A=[];
 A.push({n:"Chào hỏi đúng lễ",o:100,w:{danh:1},x:"hắn thiện cảm +5",go:()=>{m.af+=5}});
 A.push({n:"Liếc mắt đưa tình",o:od(55+S.sac/5),x:`tình ý của hắn +12 · có người thấy: ${word(100-Math.round(risk/3))} giữ kín`,l:{},go:()=>{m.tinh+=12+(m.trait==="đa tình"?6:0);if(roll(risk/3)){const v=pick(liveRivals(true));if(v){evA(v,S,1);log(`Có kẻ thấy ngươi liếc mắt với ${m.name}.`)}}}});
 if(m.tinh>=30)A.push({n:"Trao khăn tay",o:od(60+S.tamco/5),x:`hắn giữ khăn tay của ngươi (là tang vật nếu bị lục) · tình ý +15`,go:()=>{m.tinh+=15;m.letters++;S.aff=S.aff||{};S.aff[m.id]=(S.aff[m.id]||0)+1}});
 if(m.tinh>=50){const w=watcher();A.push({n:"Hẹn gặp riêng",o:w?cl(100-risk,5,95):0,lock:!w,t:"cần một người hầu trung thành (lòng 60+) canh cửa",act:1,x:`đêm ấy kín đáo: Sức +12, hắn thành người che chở · có thể mang thai · hỏng: bị bắt gặp, tội chết`,run:()=>tryst(m,risk)})}
 if(m.tinh>=30)A.push({n:"Cắt đứt",o:100,x:"hắn thôi tơ tưởng; giảm hẳn rủi ro",go:()=>{m.tinh=0}});
 return A}})();
function tryst(m,risk){if(roll(risk)){affairExposed(m,`Đêm ${S.name} hẹn ${m.name} bị bắt gặp.`);return "Bị bắt gặp."}
 m.trysts++;m.tinh+=10;S.lastTryst=wk();apply({suc:12});S.protector=m.id;S.an=S.an||0;let r=`Đêm ấy trôi qua kín đáo. Sức +12. ${m.name} nguyện che chở ngươi. Có thể biết chuyện: ${whoMayKnow()}.`;
 if(!S.preg&&roll(15)){S.preg=1;S.hidden=true;S.pregWk=wk();S.trueFather=m.id;const ok=(S.nightLog||[]).some(w=>Math.abs(w-wk())<=1);S.pregMismatch=!ok;r+=ok?" Mấy hôm sau ngươi biết mình có thai; ngày tháng trùng đêm thị tẩm.":` <b class="r">Ngươi có thai, mà sổ Kính sự phòng không có đêm thị tẩm nào khớp ngày.</b>`}
 return r}
/* pregnancy that the book cannot cover: her roads, each with its odds and cost */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(!S||!S.preg||!S.pregMismatch||S.out)return;
 deck.unshift({n:"Hối lộ Kính sự phòng sửa sổ",t:"Nhờ Tổng quản ghi thêm một đêm thị tẩm cho khớp ngày.",c:{bac:-80},o:od(55+((S.court&&S.court.ksp&&S.court.ksp.af.me)||0)/2),w:{},l:{danh:-5},x:"sổ khớp ngày, hết bị nghi · hỏng: Tổng quản biết chuyện của ngươi",dom:"Mưu kế",go:()=>{S.pregMismatch=false},fail:()=>{S.ksKnows=1}});
 deck.unshift({n:"Uống thuốc phá thai",t:"Bài thuốc mạnh, có thể hại thân.",c:{bac:-30},o:od(70+S.arts.y*5),w:{},l:{suc:-30},x:"mất đứa bé, Sức -20; hỏng: băng huyết, Sức -30, có thể chết",dom:"Sức khỏe",go:()=>{S.preg=0;S.hidden=false;S.pregMismatch=false;S.trueFather=null;apply({suc:-20})},fail:()=>{S.preg=0;S.hidden=false;S.pregMismatch=false;S.trueFather=null;if(roll(25))die("Uống thuốc phá thai, băng huyết mà chết")}});
 deck.unshift({n:"Thú tội với Hoàng thượng",t:"Quỳ trước Dưỡng Hòa điện, nhận hết tội.",c:{},o:100,w:{},x:"giữ được mạng (vào lãnh cung), hắn bị xử trảm",dom:"Sủng",go:()=>{const m=manById(S.trueFather);if(m){m.alive=false;log(`${m.name} bị xử trảm.`)}S.pregMismatch=false;cold("Thú tội tư thông")}})}})();
/* each month: the book may be checked; rivals carry on affairs too and can be found out */
function affairMonth(){if(!S||!S.men)return"";let ev="";
 if(S.preg&&S.pregMismatch){const q=queenP();const foes=liveRivals(true).filter(v=>rel(v,S)<-20);if((q&&q!==S&&rel(q,S)<0||foes.length)&&roll(10+(S.ksKnows?15:0))){const who=q&&q!==S?q:pick(foes);evA(who,S,3);ev+=`<span class="r">${who.name} cho người tra sổ Kính sự phòng: ngày ngươi có thai không khớp đêm thị tẩm nào.</span> `}}
 if(S.lastTryst!=null&&wk()-S.lastTryst<=3&&roll(4)){const v=pick(liveRivals(true).filter(x=>rel(x,S)<0)||[]);if(v){evA(v,S,2);if((S.mat||0)>=3)ev+=`Tai mắt báo: ${v.name} có vẻ biết chuyện riêng của ngươi. `}}
 for(const v of liveRivals(false)){if(!v.affair&&v.sung<30&&roll(2)){const m=pick(S.men.filter(x=>x.alive));if(m)v.affair=m.id}
  if(v.affair){const m=manById(v.affair);if(!m){v.affair=null;continue}if(roll(3)){m.alive=false;v.affair=null;ev+=`<span class="r">${v.name} tư thông với ${m.name} bị lộ.</span> `;deathSentence(v,`tư thông với ${m.name}`)}}}
 return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead)ev+=affairMonth()}catch(e){}return ev}})();
/* spying on a rival may reveal her affair: true, kept as a note and as proof */
(function(){const d0=doAct;doAct=function(i,k){const v=rivals[i];const r=d0.apply(this,arguments);try{if(k==="spy"&&v&&v.affair&&roll(40)){const m=manById(v.affair);if(m){evA(S,v,2);noteAdd(v.id,`tư thông với ${m.name} (tai mắt tận mắt thấy)`);log(`Tai mắt bắt gặp ${v.name} lén gặp ${m.name}. Chứng cứ +2.`)}}}catch(e){}return r}})();
/* the man's dossier: only known facts */
function manCard(m){const f=pMan(m);const known=m.seen===bkey();
 const lines=[tuoi(m.age),`Ngươi với hắn: <span class="ef ${m.af>10?"g":"n"}">${affW(m.af)} · ${m.af}</span>`,m.tinh>=10||m.letters?`Hắn với ngươi: <span class="ef ${m.tinh>=50?"r":"g"}">${tinhW(m.tinh)}</span>`:`Hắn với ngươi: <span class="ef n">chưa rõ</span>`,known?`Thấy ở ${placeName(S.menW[m.id]||"")} (buổi này)`:"Nơi ở: không rõ"];
 const tt=[m.letters?`${m.letters} lần trao khăn, thư (tang vật nếu bị lục)`:"",m.trysts?`${m.trysts} lần hẹn riêng · có thể biết: ${whoMayKnow()}`:"",S.trueFather===m.id&&S.preg?"Cha thật của đứa bé trong bụng ngươi":""].filter(Boolean);
 return pcard({f,col:"#6a8aa0",name:m.name,rank:`${m.role} · ${m.trait}`,lines,chips:[m.trysts?chip("Tư tình","hot"):""],note:tt.length?`<b>Tư tình</b> (chỉ ngươi biết): ${tt.join(" · ")}`:"Gặp hắn ở nơi hắn hay lui tới để trò chuyện.",groups:[["Gặp mặt",[known&&S.place!==S.menW[m.id]?pbtn(`data-go="${S.menW[m.id]}"`,"Đến chỗ hắn",`Chắc chắn · tốn: ${travel(S.place,S.menW[m.id])} khắc`,!can(travel(S.place,S.menW[m.id])+1)?"đến nơi sẽ hết khắc":""):""]]],empty:"Hắn hay ở: "+m.haunts.map(placeName).join(", ")+"."})}
/* the dossier tab lists the men after the consorts */
(function(){const r0=rvTabHTML;rvTabHTML=function(){menInit();const M=(S.men||[]).filter(m=>m.alive);if(!M.length)return r0();const n=rivals.length;
 return `<div class="pgwrap">`+pager("rv",rivals.map(v=>({f:pv(v),name:shortN(v.name),dim:!v.alive||v.out})).concat(M.map((m,j)=>({f:pMan(m),name:m.name.split(" ").pop(),sep:j?"":"Nam nhân"}))),i=>i<n?rvCard(rivals[i],i):manCard(M[i-n]))+`</div>`}})();
/* two-way: a consort with a lover may conceive by him; the Kính sự phòng book can expose her the same way it exposes the player */
(function(){const a0=affairMonth;affairMonth=function(){let ev=a0.apply(this,arguments);try{if(!S||S.dead)return ev;
 for(const v of liveRivals(false)){const m=v.affair&&manById(v.affair);
  if(m&&!v.preg&&!(v.lastBirth!=null&&S.turn-v.lastBirth<6)&&roll(5)){v.preg=1;v.hidden=true;v.pregWk=wk();v.trueFather=m.id;v.pregMismatch=!(v.nightLog||[]).some(w=>Math.abs(w-wk())<=1)&&roll(70)}
  if(v.preg&&v.pregMismatch){const foes=others(v).filter(x=>x!==S&&x.alive&&rel(x,v)<-20);if(foes.length&&roll(10)){const x=pick(foes);evA(x,v,3)}
   if(roll(8+(S.mat||0)*5)){evA(S,v,2);v.pregMismatch=false;noteAdd(v.id,`Tai mắt: ngày ${v.name} có thai không khớp đêm thị tẩm nào trong sổ Kính sự phòng (chứng cứ +2)`);ev+=`Tai mắt báo: ngày ${v.name} có thai không khớp sổ Kính sự phòng. `}}
  if(!v.preg){v.pregMismatch=false;v.trueFather=null}}}catch(e){}return ev}})();
/* ================= LEARNING: three roads, a milestone at every grade, gains shown on the button ================= */
const ARTDO={cam:"Tài: thơ, đàn, thi tài; dễ được Hoàng thượng để ý",ky:"Tài và Tâm cơ: đánh cờ, đoán ý người",thi:"Tài: làm thơ, bàn chuyện với Hoàng thượng",hoa:"Tài: vẽ tranh dâng tặng, Thái hậu quý",vu:"Sắc: múa ở yến tiệc, được chú ý",y:"Sắc: điều hương, nhận ra độc, chữa bệnh"};
const ARTMS={
 cam:["Tài +2; mỗi tháng tự đàn: Sức +1","Đánh đàn ở Ngự hoa viên dễ thành hơn (mỗi bậc +4)","Mở «Phượng cầu hoàng»: cơ hội được thị tẩm","Dạy con đàn: mỗi tháng các con Tài +1","Danh +6; đàn ở yến tiệc dễ được ban thưởng"],
 ky:["Tài +2, Tâm cơ +1","Tâm cơ +1 (dò la, mưu kế dễ hơn)","Mở «Đánh cờ với Hoàng thượng»","Tâm cơ +2","Danh +6, Tâm cơ +2"],
 thi:["Tài +2","Tuyến truyện thơ văn mở thêm lựa chọn","Mỗi tháng thơ đến tay Hoàng thượng: Sủng +1","Bàn chuyện triều chính khéo hơn (mỗi bậc +3)","Danh +6; mỗi tháng Sủng +2"],
 hoa:["Tài +2","Thái hậu thương +3","Mở «Vẽ chân dung tặng Thái hậu»","Thái hậu thương +5","Danh +6, Thái hậu thương +5"],
 vu:["Sắc +2","Múa trong yến tiệc dễ thành hơn (mỗi bậc +4)","Mở «Kinh hồng vũ»","Sắc +2","Danh +6"],
 y:["Sắc +2","Nhận ra độc, xạ hương trong đồ","Bệnh tật nhẹ hơn; Sức hồi tốt hơn","Tự bào chế thuốc an thai, chữa bệnh cho con","Danh +6; các con ít bệnh"]};
/* grade bonuses beyond the base +2 (applied once when the grade is reached) */
(function(){const a0=addArt;addArt=function(k,g){const l0=S.arts[k];a0.apply(this,arguments);for(let l=l0+1;l<=S.arts[k];l++){const b={ky:{1:{tamco:1},2:{tamco:1},4:{tamco:2},5:{tamco:2}},hoa:{2:{th:3},4:{th:5},5:{th:5}},vu:{4:{sac:2}}}[k];if(b&&b[l]){apply(b[l]);log(`${ARTS.find(a=>a.k===k).n} bậc ${l}: ${fmt(b[l])}.`)}}}})();
function artMonth(){if(!S||S.out)return;if(S.arts.cam>=1)S.suc=cl(S.suc+1,0,100);if(S.arts.cam>=4)S.kids.filter(k=>k.alive).forEach(k=>k.tal=cl(k.tal+1,0,100))}
(function(){const m0=monthTick;monthTick=function(){const ev=m0.apply(this,arguments);try{if(!S.dead)artMonth()}catch(e){}return ev}})();
/* three roads */
function lessonMode(k,mode){const l=S.arts[k],cost=5+l*5;if(!S||S.dead||Q.length||S.mg||l>=5)return;
 if(mode==="self"){if(!can(2)||S.suc<25)return;apply({suc:-15})}
 else if(mode==="th"){if(!can(2)||S.th<40||(S.buoi||0)!==0||S.thDead)return;apply({suc:-10,th:3})}
 else{if(!can(2)||S.bac<cost)return;apply({suc:-10,bac:-cost})}
 spend(2);S.mg={k,l,mode};save();render();resumeMG()}
(function(){const r0=resumeMG;resumeMG=function(){const m=S.mg;if(!m)return;const a=ARTS.find(x=>x.k===m.k);openMG(m.k,m.l,g=>{S.mg=null;const gg=m.mode==="self"?Math.max(1,Math.round(g*.6)):g;log(`${m.mode==="self"?"Tự học":m.mode==="th"?"Học cùng Thái hậu":"Học với thầy"} ${a.n}. Tiến bộ +${gg}.`);addArt(m.k,gg);
  if(m.mode==="teacher"&&roll(30)){if(roll(50)&&discover())log("Thầy dạy kể một sở thích của Hoàng thượng.");else{const t=pick(liveRivals(true));if(t){t.ev++;log(`Thầy dạy buột miệng chuyện của ${t.name}: chứng cứ +1.`)}}}render()})}})();
function artTabHTML(){const nx=ARTS.map(a=>S.arts[a.k]);let h=`<div class="ph"><span>Mỗi buổi học tốn 2 khắc. Ba cách học, giá trị ngang nhau, tốn thứ khác nhau.</span>${S.master?`<span class="g">Danh sư còn dạy ${S.master} tháng</span>`:""}</div><div class="arts">`;
 h+=ARTS.map(a=>{const l=S.arts[a.k],need=l+2,cost=5+l*5,ms=ARTMS[a.k]||[];const t2=whyTime(2);
  const B=l>=5?[`<span class="ef g">Đã tinh thông</span>`]:[pbtn(`data-learn="${a.k}" data-mode="self"`,"Tự học",`Chắc chắn · tốn: Sức -15 · thành: tiến bộ +1..2`,t2||(S.suc<25?"Sức dưới 25":"")),
   pbtn(`data-learn="${a.k}" data-mode="teacher"`,"Học với thầy",`Chắc chắn · tốn: Bạc -${cost}, Sức -10 · thành: tiến bộ +1..3, có khi nghe chuyện`,t2||(S.bac<cost?`thiếu bạc (cần ${cost})`:"")),
   S.thDead?"":pbtn(`data-learn="${a.k}" data-mode="th"`,"Xin Thái hậu cho học cùng",`Chắc chắn · tốn: Sức -10 · thành: tiến bộ +1..3, Thái hậu +3`,t2||(S.th<40?"cần Thái hậu thương 40":(S.buoi||0)!==0?"chỉ buổi sáng":""))];
  return `<div class="art"><b>${ic(AIMG[a.k],20)}${a.n} · Bậc ${l}/5</b><span class="u">${ARTDO[a.k]||""} · lên bậc: ${a.st==="sac"?"Sắc":"Tài"} +2</span>${l<5?`<span class="lv">Tiến bộ ${S.artp[a.k]}/${need}</span><div class="mini"><u style="width:${S.artp[a.k]/need*100}%"></u></div>`:""}
  <div class="ams">${ms.map((m,i)=>`<span class="${i<l?"ef g":i===l?"ef nx":"ef n"}" title="${m}">B${i+1}: ${m}</span>`).join("")}</div><div class="pcb">${B.join("")}</div></div>`}).join("")+`</div>`;
 return h}
document.addEventListener("click",e=>{const b=e.target.closest("[data-learn]");if(b&&!b.disabled){e.stopPropagation();lessonMode(b.dataset.learn,b.dataset.mode)}},true);
/* ================= HARM BANDS, PEOPLE COME TO HER, AFFAIR ROAD WHEN THE THRONE ROAD IS BLOCKED ================= */
/* C. danger of one person toward another, in plain bands (same for every NPC toward every NPC, and toward her) */
const BANDS=[[0,"không",[]],[30,"nhỏ",["rumor","spy","trip"]],[60,"nặng",["frame","plant","block","bribe","accuse","vp","ksab","takeaway","steal","road"]],[80,"sát hại",["poison","kpoison","pond","pushp","musk","catswap","kframe"]]];
function danger(v,t){const tr=v.trait==="Hiểm độc"?10:v.trait==="Hiền lành"?-15:v.trait==="Nhu mì"?-10:0;return Math.round(Math.max(t===S?(v.ghen||0):0,oan(v,t),Math.max(0,-aff(v,t)))+tr)}
function bandOf(d){let b=0;for(let i=0;i<BANDS.length;i++)if(d>=BANDS[i][0])b=i;return b}
function npcAct(v,t){const b=bandOf(danger(v,t));if(!b)return"";const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const O=[];const add=(k,w)=>{const a=ACT[k];if(a&&allow.includes(k)&&a.ok(v,t)&&w>0)O.push([k,w])};
 add("accuse",6);add("vp",3);add("musk",4);add("catswap",2);for(const k of ["kpoison","pond","kframe","ksab"])add(k,2);add("takeaway",2);add("pushp",1);add("trip",3);add("frame",2);add("poison",2);add("rumor",3);add("spy",3);add("bribe",2);add("block",t.nightLog&&t.nightLog.length?2:0);
 if(allow.includes("plant")&&v.inv.some(e=>e.t||IT[e.k].il))O.push(["plant",3]);
 if(!O.length)return"";const w=O.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const k=O[i][0];
 if(k==="plant")return runAct(v,t,"plant",v.inv.findIndex(e=>e.t||IT[e.k].il));return runAct(v,t,k)}
/* chance per buổi rises within a band */
function rivalsBuoi(){let ev="";for(const v of liveRivals(true)){if(!v.alive||v.out)continue;const t=pickTarget(v);if(!t)continue;const d=danger(v,t),b=bandOf(d);if(!b)continue;
  const lo=BANDS[b][0],hi=b<3?BANDS[b+1][0]:100;let c=[0,.03,.04,.05][b]+[0,.03,.04,.05][b]*cl((d-lo)/(hi-lo),0,1);if(t.shield)c*=.5;if(t===S&&S.lot&&S.lot.dom==="Hung")c*=1.5;if(t===S&&S.guardWarn){c*=.5}if(t===S)c*=BAL.hz;
  if(Math.random()<c){ev+=seenNPC(v,t,npcAct(v,t));if(S.dead)return ev}}return ev}
function dangerWord(v){kn();S.dKnown=S.dKnown||{};const k=S.dKnown[v.id];if(!k&&!knows(v))return `Có thể hại ngươi: <span class="ef n">chưa rõ</span>`;const b=bandOf(danger(v,S));if(k||knows(v)){if(!S.dKnown[v.id])S.dKnown[v.id]=wk()}return `Có thể hại ngươi: <span class="ef ${b>=2?"r":b===1?"r":"g"}">${BANDS[b][1]}</span>`}
function bandCard(){return `<p>Mỗi người với một người khác có mức <b>Nguy hiểm</b> = Ghen hoặc Oán hoặc ghét (lấy cao nhất), cộng tính nết (Hiểm độc +10, Hiền lành -15, Nhu mì -10). Ai cũng theo cùng thang:</p><div class="pcb rows">${BANDS.map((b,i)=>`<div class="pcrow"><span>${i<3?`${b[0]}-${BANDS[i+1][0]-1}`:"80 trở lên"}</span><b>${i?`hại ${b[1]}`:"không ra tay"}</b></div>${i?`<div class="pcrow"><span class="past">${b[2].map(k=>ACT[k]?ACT[k].n:k).join(", ")}</span><span></span></div>`:""}`).join("")}</div><p class="past">Trong mỗi mức, càng gần mức trên càng hay ra tay. Ngươi hại ai thì Oán của họ tăng, có thể leo lên mức trên.</p>`}
document.addEventListener("click",e=>{const b=e.target.closest("[data-ladder]");if(b){e.stopPropagation();if(!Q.length){Q.unshift({t:"Thang nguy hiểm",h:bandCard()});showModal()}}},true);
(function(){const rc=rvCard;rvCard=function(v,i){let h=rc(v,i);if(v.alive&&!v.out)h=h.replace('<div class="pcinfo">',`<div class="pcinfo"><span>${dangerWord(v)} <button class="lnk ladi" data-ladder="1" title="Thang nguy hiểm" aria-label="Xem thang nguy hiểm">ⓘ</button></span>`);return h}})();
/* B. people come to her: approaches each week by their traits and bonds; counted against what she starts herself */
function stat(){S.stat=S.stat||{un:0,act:0};return S.stat}
(function(){const sp=spend;spend=function(n){try{if(S&&!S.dead)stat().act++}catch(e){}return sp.apply(this,arguments)}})();
function approachOne(){const T=[];const fr=liveRivals(true).filter(v=>aff(v,S)>=10&&!v.confined),hos=liveRivals(true).filter(v=>bandOf(danger(v,S))>=1&&!v.confined);
 if(fr.length)T.push(()=>{const v=pick(fr);const kind=pick(["gossip","ally","borrow","gift"]);
  if(kind==="gossip")return{t:"Có người đến",who:pv(v),h:`<p>${v.name} sang chơi, kể chuyện trong cung.</p>${favorBook(false)}`};
  if(kind==="ally")return{t:"Có người đến",who:pv(v),h:`<p>${v.name} sang thăm, ngỏ ý kết làm chị em, cùng nhau đứng vững.</p>`,opts:[{n:"Nhận lời",fx:{},x:`nàng thân +20 · các phi tần khác ghen +3`,go:()=>{relAdd(S,v,20);ghenAll(3)}},{n:"Khéo từ chối",fx:{},x:"nàng thân -5",go:()=>relAdd(S,v,-5)}]};
  if(kind==="borrow")return{t:"Có người đến",who:pv(v),h:`<p>${v.name} ngượng ngùng hỏi mượn 20 lượng bạc.</p>`,opts:[{n:"Cho mượn",fx:{bac:-20},x:`nàng thân +12 · có thể trả lại`,go:()=>{relAdd(S,v,12);S.loans=(S.loans||[]).concat([{id:v.id,t:S.turn}])}},{n:"Từ chối",fx:{},x:"nàng thân -6",go:()=>relAdd(S,v,-6)}]};
  const k=pick(["tuithom","sonphan","luahang","huongtram"]);S.inv.push({k,from:v.id});relAdd(S,v,3);return{t:"Có người đến",who:pv(v),h:`<p>${v.name} mang sang tặng ngươi <b>${IT[k].n}</b>.</p><p>${kitParse(`Chắc chắn · thành: ${IT[k].n}, nàng thân +3 · đồ người khác tặng nên xét nghiệm trước khi dùng`)}</p>`}});
 if(hos.length)T.push(()=>{const v=pick(hos);return{t:"Có người đến",who:pv(v),h:`<p>${v.name} đến tận cửa cung, buông lời mỉa mai ngươi trước mặt cung nhân.</p>`,opts:[{n:"Nhịn",fx:{duc:2},x:"giữ lễ; nàng ghen +3",go:()=>{v.ghen=cl(v.ghen+3,0,100)}},{n:"Đáp trả sắc sảo",fx:{danh:1},x:"nàng oán +10, ngươi được tiếng cứng cỏi",go:()=>relAdd(S,v,-10)}]}});
 const sorry=liveRivals(true).filter(v=>oan(v,S)>=20&&v.trait!=="Hiểm độc");if(sorry.length)T.push(()=>{const v=pick(sorry);return{t:"Có người đến",who:pv(v),h:`<p>${v.name} sang xin lỗi chuyện cũ.</p>`,opts:[{n:"Nhận lời xin lỗi",fx:{},x:"nàng bớt oán 15, thân +5",go:()=>{oanAdd(v,S,-15);relAdd(S,v,5)}},{n:"Lạnh lùng",fx:{},x:"nàng thân -3",go:()=>relAdd(S,v,-3)}]}});
 if(S.sung>=60&&!S.out&&roll(50))T.push(()=>{apply({sung:2});S.an=cl((S.an||0)+2,0,100);return{t:"Hoàng thượng đến",who:pEmp(),h:`<p>Không báo trước, Hoàng thượng ghé cung ngươi uống chén trà.</p><p>${kitParse("Chắc chắn · thành: Sủng +2, Ân tình +2")}</p>`}});
 if(!S.thDead&&S.th>=10)T.push(()=>({t:"Thái hậu triệu",who:pTH(),h:"<p>Đức Thọ cung cho người sang mời ngươi qua hầu chuyện.</p>",opts:[{n:"Đến ngay",fx:{th:3,suc:-5},x:"Thái hậu vui lòng"},{n:"Cáo bệnh",fx:{th:-5}}]}));
 const sv=(S.staff||[]).length?pick(S.staff):null;if(sv)T.push(()=>({t:"Kẻ hầu xin",who:pServ(sv),h:`<p>${sv.name} quỳ xin: mẹ ở quê ốm nặng, xin chút bạc thuốc thang.</p>`,opts:[{n:"Cho 10 lượng",fx:{bac:-10},x:"lòng +15",go:()=>{sv.loyal=cl(sv.loyal+15,0,100)}},{n:"Từ chối",fx:{},x:"lòng -10",go:()=>{sv.loyal=cl(sv.loyal-10,0,100)}}]}));
 const bad=liveRivals(true).filter(v=>bandOf(danger(v,S))>=2);if(bad.length&&S.maid&&S.maid.loyal>=55)T.push(()=>{const v=pick(bad);kn();S.dKnown=S.dKnown||{};S.dKnown[v.id]=wk();noteAdd(v.id,`${S.maid.name} báo: nàng có thể hại ngươi (${BANDS[bandOf(danger(v,S))][1]})`);return{t:"Lời cảnh báo",who:pMaid(),h:`<p>${S.maid.name} thì thầm: “Người bên cung ${v.name} dò hỏi giờ giấc của nương nương. E là có ý không lành.”</p><p>${kitParse(`Chắc chắn · thành: biết ${v.name} có thể hại ngươi mức ${BANDS[bandOf(danger(v,S))][1]}`)}</p>`}});
 const M=(S.men||[]).filter(m=>m.alive);if(M.length&&roll(40))T.push(()=>{const m=pick(M);return{t:"Một ánh mắt",who:pMan(m),h:`<p>${m.name} lén gửi qua cung nữ một bài thơ chép tay.</p>`,opts:[{n:"Giữ bài thơ, đáp lại",fx:{},x:`hắn tình ý +10 · bài thơ là tang vật nếu bị lục`,go:()=>{m.tinh+=10;m.letters++}},{n:"Đốt đi, làm ngơ",fx:{},x:"an toàn",go:()=>{m.tinh=Math.max(0,m.tinh-5)}}]}});
 const def=[];for(const v of liveRivals(true))for(const s of (v.staff||[]))if(s.role==="maid"&&s.loyal<35&&s.spyFor!=="me")def.push([v,s]);if(def.length)T.push(()=>{const [v,s]=pick(def);return{t:"Có người đến",who:pServ(s),h:`<p>${s.name}, cung nữ bên cung ${v.name}, lén tìm đến xin theo ngươi.</p>`,opts:[{n:"Thu làm tai mắt",fx:{bac:-20},x:"có tai mắt trong cung nàng",go:()=>{s.spyFor="me"}},{n:"Đuổi về",fx:{},x:"không dính líu"}]}});
 if(!T.length)return null;return pick(T)()}
function approaches(){if(S&&S.guardWarn>0)S.guardWarn--;if(!S||S.dead||S.out)return;const n=1+(roll(50)?1:0)+(roll(25)?1:0);for(let i=0;i<n;i++){const m=approachOne();if(m){Q.push(m);stat().un++}}
 for(const L of (S.loans||[]).slice()){if(S.turn-L.t>=1&&roll(40)){const v=RV(L.id);S.loans.splice(S.loans.indexOf(L),1);if(v&&v.alive){apply({bac:20});log(`${v.name} trả lại 20 lượng đã mượn. Bạc +20.`)}}}}
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn,tu=S&&S.tuan;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&(S.turn!==t0||S.tuan!==tu)){approaches();if(Q.length)showModal()}}catch(e){}return r}})();
/* A. the affair road gives what the throne road cannot, most when that road is blocked */
function blocked(){return S.out||S.confined||S.sung<25||has("lanhlung")||(S.emp&&S.emp.ill)||(S.year>=3&&!S.kids.length)}
(function(){const t0=tryst;tryst=function(m,risk){const was=m.trysts;let r=t0.apply(this,arguments);if(m.trysts>was&&m.alive){const extra=[];if(blocked()){apply({suc:8});extra.push("Lúc bị ghẻ lạnh, đêm ấy cho ngươi chỗ dựa: Sức thêm +8")}
  if(m.rw==="thị vệ"){S.guardWarn=2;extra.push("thị vệ canh chừng: hai tuần tới kẻ hại ngươi khó ra tay hơn")}if(m.rw==="thái y"){S.doctor=1;extra.push("thái y thành người của ngươi: dễ nhận ra độc")}
  if(m.rw==="vương gia"){S.vgAlly=m.id;extra.push("vương gia hứa che chở nếu Hoàng thượng băng hà")}if(m.rw==="nhạc sư"){addArt("cam",1);extra.push("nhạc sư chỉ ngón đàn: Cầm tiến bộ +1")}if(m.rw==="sứ thần"){apply({bac:40});extra.push("sứ thần tặng vàng bạc: Bạc +40")}
  if(extra.length)r+=" "+extra.join(". ")+"."}return r}})();
/* the Emperor's hidden vigour shapes conception for every consort */
(function(){const c0=conceiveCh;conceiveCh=function(p){const v=S&&S.emp?(S.emp.fert||(S.emp.fert=.5+Math.random()*.7)):1;return Math.round(c0.apply(this,arguments)*v)}})();
/* from lãnh cung, a man who loves her can carry her plea out */
(function(){const c0=coldActs;coldActs=function(){const A=c0.apply(this,arguments);const m=(S.men||[]).find(x=>x.alive&&x.tinh>=50);if(m)A.push({n:`Nhờ ${m.role} đưa thư kêu oan`,t:`${m.name} lén mang thư ra khỏi lãnh cung.`,c:{suc:-5},o:od(35+m.tinh/3),w:{},l:{},x:"có thể được minh oan, rời lãnh cung · hỏng: thư bị chặn, hắn bị nghi",dom:"Mưu kế",go:()=>restore(false,`${m.name} đưa thư kêu oan`),fail:()=>{if(roll(30)){m.alive=false;log(`${m.name} bị bắt vì mang thư lãnh cung, bị xử trảm.`)}}});return A}})();
/* if the Emperor dies, a vương gia who loves her can shelter her */
(function(){const e0=emperorDies;emperorDies=function(ev){const m=S.vgAlly&&manById(S.vgAlly);if(m&&m.tinh>=60&&!(S.heir&&S.heir.k.alive&&!S.heir.v)&&S.rank<7){if(ev)log(ev);return over("Được Vương gia che chở",`Năm ${S.year}, ${empName()} băng hà. ${m.name} đứng ra giữ triều chính, đưa ngươi ra khỏi cung, sống nốt đời dưới sự che chở của hắn.`,"Vương gia che chở")}return e0.apply(this,arguments)}})();
/* attacks on her name the act, the odds the doer faced, the outcome, the defences that worked; the doer only if she could know */
(function(){const r0=runAct;runAct=function(a,t,k,extra){if(t!==S||a===S||!a||!ACT[k])return r0.apply(this,arguments);let o=null;try{o=ACT[k].o?ACT[k].o(a,t):null}catch(e){}const e0=evG(S,a);let r=r0.apply(this,arguments);if(!r)return r;
 const known=evG(S,a)>e0||roll(15+(S.mat||0)*6)||together(a,S);if(!known){const nms=[a.name,"Hoàng hậu "+a.name,"Hoàng hậu"].filter(Boolean);for(const n of nms)r=r.split(n).join("kẻ giấu mặt");r=r.replace(/(^|[.:] |<\/span> )kẻ giấu mặt/g,(m,p)=>p+"Kẻ giấu mặt")}
 const def=[S.maid&&S.maid.loyal>=70?`${S.maid.name} canh chừng cẩn mật`:"",S.shield?"Hoàng hậu che chở":"",S.doctor?"có thái y tâm phúc":"",S.guardWarn?"thị vệ canh chừng":"",S.inv.some(e=>e.k==="giaidoc")&&/độc/.test(ACT[k].n)?"có thuốc giải trong rương":""].filter(Boolean);
 const pr=r.replace(/<[^>]+>/g,"");const ok=!(FAILRE.test(pr)||/chặn kịp|phát giác|bắt quả tang|may có thuốc giải|không nhận|báo cho chủ|kể với/.test(pr));return `<b>[${ACT[k].n}${o!=null?" · "+word(cl(o,5,95)):""} · ${ok?"thành":"hỏng"}]</b> ${r}${def.length?` <span class="g">(Phòng bị của ngươi: ${def.join(", ")}.)</span>`:""}`}})();
/* ===== JUDGMENT WITH CAUSES: servants give reasons each week; acting without one is priced (same for every consort) ===== */
const SCAUSE={tham:[["ăn cắp trâm bạc",1]],nhat:[["ngủ quên lúc canh cửa",1],["làm vỡ chén ngọc",1]],chuyen:[["nhiều chuyện, lộ tin trong cung",1],["báo tin hay từ cung khác",0]],lanh:[["phát hiện mùi lạ trong điểm tâm",0],["báo tin hay từ cung khác",0]],trung:[["che chắn cho chủ khi bị xô",0],["làm việc chăm chỉ",0]]};
function servCauses(){for(const s of (S.staff||[])){if(s.cause&&wk()-s.cause.w>3)s.cause=null;if(s.cause||!roll(12))continue;const L=SCAUSE[s.tr]||[["làm việc chăm chỉ",0]];const c=pick(L);s.cause={txt:c[0],fault:!!c[1],w:wk()};
  Q.push({t:"Việc của kẻ hầu",who:pServ(s),h:`<p>${s.name} ${c[0]}.</p>`,opts:c[1]?[{n:`Phạt vì ${c[0]}`,fx:{},x:"lòng -5 · kẻ hầu khác giữ kỷ cương (lòng +1)",go:()=>judgeServ(s,"phat")},{n:"Tha lỗi",fx:{},x:"lòng +5 · kẻ hầu khác dễ lơ là (lòng -1)",go:()=>judgeServ(s,"tha")}]:[{n:`Thưởng vì ${c[0]}`,fx:{bac:-10},x:"lòng +15 · kẻ hầu khác gắng sức (lòng +2)",go:()=>judgeServ(s,"thuong",true)},{n:"Khen một câu",fx:{},x:"lòng +3",go:()=>{s.loyal=cl(s.loyal+3,0,100);s.cause=null}}]})}
 /* every consort's servants drift by how their mistress treats them: a cruel mistress's servants defect more easily */
 for(const v of liveRivals(true))for(const s of (v.staff||[])){const d=v.trait==="Hiểm độc"||v.trait==="Kiêu ngạo"?-2:v.trait==="Hiền lành"||v.trait==="Nhu mì"?1:0;s.loyal=cl(s.loyal+d,0,100)}}
function otherServ(s){return (S.staff||[]).filter(x=>x!==s)}
function judgeServ(s,how,paid){const c=s.cause;if(how==="phat"){if(c&&c.fault){s.loyal=cl(s.loyal-5,0,100);otherServ(s).forEach(x=>x.loyal=cl(x.loyal+1,0,100));log(`Phạt ${s.name} vì ${c.txt}: lòng -5; kẻ hầu khác giữ kỷ cương.`)}else{s.loyal=cl(s.loyal-25,0,100);apply({duc:-3});otherServ(s).forEach(x=>x.loyal=cl(x.loyal-5,0,100));s.grudge=1;log(`<span class="r">Phạt ${s.name} vô cớ: lòng -25, Đức -3; kẻ hầu khác sợ hãi (lòng -5); hắn/nàng có thể phản ngươi.</span>`)}}
 else if(how==="tha"){s.loyal=cl(s.loyal+5,0,100);otherServ(s).forEach(x=>x.loyal=cl(x.loyal-1,0,100));log(`Tha lỗi cho ${s.name}: lòng +5.`)}
 else if(how==="thuong"){if(!paid){if(S.bac<10)return;apply({bac:-10})}if(c&&!c.fault){s.loyal=cl(s.loyal+15,0,100);otherServ(s).forEach(x=>x.loyal=cl(x.loyal+2,0,100));log(`Thưởng ${s.name} vì ${c.txt}: lòng +15; kẻ hầu khác gắng sức.`)}else{s.loyal=cl(s.loyal+6,0,100);log(`Thưởng ${s.name} vô cớ: lòng +6.`)}}
 s.cause=null;render()}
function servJudgeBtns(s){const c=s.cause;const fault=c&&c.fault,merit=c&&!c.fault;const tr=s.trouble!=null&&wk()-s.trouble<=4;
 return [pbtn(`data-sj="thuong" data-sid="${s.sid}"`,merit?`Thưởng vì ${c.txt}`:"Thưởng vô cớ",merit?"Chắc chắn · tốn: Bạc -10 · thành: lòng +15, kẻ hầu khác lòng +2":"Chắc chắn · tốn: Bạc -10 · thành: lòng +6 (ít hơn thưởng có cớ)",S.bac<10?"thiếu bạc (cần 10)":""),
  s.spyFor&&s.spyFor!=="me"?pbtn(`data-sv="phat" data-sid="${s.sid}"`,"Tra khảo","Chắc chắn · thành: khai là tai mắt của ai · lòng -15",""):pbtn(`data-sj="phat" data-sid="${s.sid}"`,fault?`Phạt vì ${c.txt}`:"Phạt vô cớ",fault?"Chắc chắn · thành: kỷ cương, kẻ hầu khác lòng +1 · tốn: lòng -5":"Chắc chắn · tốn: lòng -25, Đức -3, kẻ hầu khác lòng -5 · hắn/nàng có thể phản ngươi",""),
  fault?pbtn(`data-sj="tha" data-sid="${s.sid}"`,"Tha lỗi","Chắc chắn · thành: lòng +5 · tốn: kẻ hầu khác lòng -1",""):"",
  tr?pbtn(`data-sv="che" data-sid="${s.sid}"`,"Che chở (đang bị bắt tội)","Chắc chắn · thành: lòng +20 · tốn: Danh -2",""):""]}
document.addEventListener("click",e=>{const b=e.target.closest("[data-sj]");if(b&&!b.disabled){e.stopPropagation();const s=servById(+b.dataset.sid);if(s&&!S.dead&&!Q.length){const bf=rsnap();judgeServ(s,b.dataset.sj);resultShow(b.firstChild.textContent,bf,true)}}},true);
/* a servant punished without cause may sell her out later */
(function(){const a0=approaches;approaches=function(){a0.apply(this,arguments);try{servCauses();const g=(S.staff||[]).find(s=>s.grudge&&s.loyal<30);if(g&&roll(15)){const v=pick(liveRivals(true));if(v){evA(v,S,1);g.grudge=0;g.spyFor=key(v);log(`<span class="r">${g.name}, kẻ từng bị ngươi phạt oan, lén bán tin cho ${v.name}.</span>`)}}}catch(e){}}})();
/* 'Đổi người': one honest price, a new servant from Nội vụ phủ */
(function(){const s0=servAct;servAct=function(a,id){if(a==="doi"){const s=servById(id);if(!s||ownerOf(s)!==S||S.dead||Q.length||S.bac<20)return;S.staff.splice(S.staff.indexOf(s),1);apply({bac:-20});const n=mkServ(s.role);S.staff.push(n);log(`Trả ${s.name} về Nội vụ phủ; Nội vụ phủ đưa ${n.name} đến thay. Bạc -20.`);render();return}return s0.apply(this,arguments)}})();
/* ===== ONE number per bond: 'Hoàng hậu với X' IS the Empress's own regard aff(Empress, X); no separate hh bar ===== */
function hhGet(o){const q=queenP();if(!q||q===o)return 0;return aff(q,o)}
function hhSet(o,v){const q=queenP();if(!q||q===o)return;const d=Math.round(v-hhGet(o));if(d)affAdd(q,o,d)}
function hhBind(o){if(!o)return;const d=Object.getOwnPropertyDescriptor(o,"hh");if(d&&d.get)return;let old=d?d.value:undefined;delete o.hh;
 Object.defineProperty(o,"hh",{get(){return hhGet(o)},set(v){hhSet(o,v)},enumerable:false,configurable:true});
 /* migrate once: blend the old separate number into the Empress's own regard */
 if(typeof old==="number"&&old!==0){const q=queenP();if(q&&q!==o){const cur=aff(q,o);affAdd(q,o,Math.round((old+cur)/2)-cur)}}}
(function(){const c0=consorts;consorts=function(){const L=c0.apply(this,arguments);for(const p of L)hhBind(p);return L}})();
(function(){const a0=ageInit;ageInit=function(){const r=a0.apply(this,arguments);try{consorts()}catch(e){}return r}})();
/* result cards for the newer acts too */
wrapR("scout",()=>"Sai tai mắt dò nơi ở");wrapR("invite",()=>"Mời đến cung ta");wrapR("visitPal",()=>"Đến cung nàng thăm");wrapR("goSee",()=>"Đến gặp");
/* every talk tells what she learned and the bar moves with their new values */
(function(){const t1=talk;talk=function(oi){const p=S&&curPeople()[popIdx];const b=rsnap();const r=t1.apply(this,arguments);try{if(p&&b&&popMsg){const ch=RKEYS.filter(([k])=>(S[k]||0)!==b[k]).map(([k,n])=>`<span class="ef ${(S[k]||0)>b[k]?"g":"r"}">${n} ${b[k]} → ${S[k]||0}</span>`);let learn="";
 if(p.kind==="emp"){const sw=S.sung>=70?"rất sủng ái ngươi":S.sung>=45?"thương ngươi":S.sung>=25?"còn nhớ đến ngươi":"chưa để tâm đến ngươi";learn=`Ngài lúc này: ${MOODS[S.emp.mood][0].toLowerCase()}; ngài ${sw}.`;const kn=Object.keys(LIKES).filter(k=>S.emp.known[k]).map(k=>`${LIKEN[k].toLowerCase()}: ${S.emp.likes[k]}`);if(kn.length)learn+=` Đã biết ngài thích: ${kn.join("; ")}.`}
 else if(p.ref&&p.ref.name&&p.kind!=="man"){const v=p.ref;learn=`${v.name} với ngươi: ${knows(v)?affW(aff(v,S)).toLowerCase()+" ("+aff(v,S)+")":"chưa rõ"}.`}
 else if(p.kind==="man"){learn=`${p.ref.name}: ${tinhW(p.ref.tinh)}.`}
 if(ch.length||learn){popMsg+=`<br>${ch.join(" · ")}${learn?`<br><span class="past">${learn}</span>`:""}`;renderStage()}}}catch(e){}return r}})();
/* events, dilemmas, summons that come to her also count as unasked */
(function(){const p0=pushDil;pushDil=function(){try{if(S&&!S.dead)stat().un++}catch(e){}return p0.apply(this,arguments)}})();
(function(){const n0=nightScene;nightScene=function(){try{if(S&&!S.dead)stat().un++}catch(e){}return n0.apply(this,arguments)}})();
/* the status drawer closes on a tap outside it (narrow screens) */
document.addEventListener("click",e=>{const el=$("hud2");if(!el||el.classList.contains("col")||e.target.closest("#hud2")||matchMedia("(min-width:1200px)").matches)return;window.__h2c=true;try{localStorage.setItem("hclh-h2c","1")}catch(x){}renderHud2()});
/* ================= AUDIT PASS: one builder for talk lines, explicit results, honest locks ================= */
/* talk options: tag place harms with their act key so they share the dossier's builder */
const HARMK={"Dò la":"spy","Tung tin đồn":"rumor","Bỏ độc vào trà nàng":"poison","Bỏ xạ hương vào thuốc nàng":"musk","Đẩy con nàng xuống hồ":"pond","Vu oan":"frame","Tố vượt phẩm":"vp","Đẩy nàng xuống hồ sen":"pushp","Ngáng chân nàng":"trip"};
AOUT.trip=["nàng vấp ngã: Danh nàng -3 (có thai: có thể động thai)","bị thấy: nàng oán ngươi"];AOUT.pushp=["nàng rơi xuống hồ sen, Sức nàng giảm mạnh","bị lộ: bị phạt, nàng oán"];
const RISKRE=/(lộ:|có thể (mách|nắm|bị|lật)|phật ý|bị khám|tội|ban chết|sẽ)/;
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);const v=p&&p.ref;return A.map(a=>{a=Object.assign({},a);if(HARMK[a.n])a.k=HARMK[a.n];
  if(a.n==="Nhờ giúp đỡ"&&v&&aff(v,S)<30){a.lock=true;a.t=`cần thiện cảm 30 (đang ${aff(v,S)})`}
  if(a.n==="Cảnh báo nàng"&&/không có căn cứ/.test(a.x||"")){a.lock=true;a.t="chưa biết ai đang hại nàng"}
  if(a.open&&!S.inv.some(e=>!e.h)){a.lock=true;a.t="rương trống"}
  if(/^Bàn tán về/.test(a.n)&&/mách lại/.test(a.x||"")){a.x="";a.risk="nàng có thể mách lại: người ấy oán ngươi +10"}
  if(a.n==="Chia sẻ bí mật"&&/nắm thóp/.test(a.x||"")){a.x=a.x.replace(/ · nàng có thể nắm thóp ngươi/,"");a.risk="nàng có thể nắm thóp ngươi: nàng có 1 chứng cứ"}
  if(a.n==="Khiêu khích"){a.risk=a.x;a.x=""}
  return a})}})();
/* the talk line: cost in khắc, gains green, risks and failure red, needs as disabled reasons */
optLine=function(a){const o=a.o==null?100:a.o;const rolled=o<100&&!a.lock;const tc=a.act?2:1;
 if(a.k&&AOUT[a.k]){return actLineRaw(a.k,rolled?word(o):"Chắc chắn",[`${tc} khắc`,fmt(a.c||{})].filter(Boolean).join(", "))}
 const xs=String(a.x||"").split(" · ").filter(Boolean);const gain=xs.filter(s=>!RISKRE.test(s)),risk=xs.filter(s=>RISKRE.test(s)).concat(a.risk?[a.risk]:[]);
 return kitParse([rolled?word(o):"Chắc chắn",`tốn: ${tc} khắc${a.c&&fmt(a.c)?", "+fmt(a.c):""}`,[fmt(a.w||{}),...gain].filter(Boolean).length?"thành: "+[fmt(a.w||{}),...gain].filter(Boolean).join(", "):"",rolled?"hỏng: "+(fmt(a.l||{})||(a.fail?"có hậu quả, xem kết quả":"không được gì")):"",risk.length?"hỏng: "+risk.join(", "):""].filter(Boolean).join(" · "))};
/* R-E: a gift or a planted item spends the time only when an item is chosen */
(function(){const t1=talk;talk=function(oi){const p=S&&curPeople()[popIdx];const a=p&&talkOpts(p)[oi];if(a&&a.open){if(a.lock||S.dead||Q.length)return;const tc=a.act?2:1;if(!can(tc))return;S.payOnPick=tc;S.visit.tk=S.visit.tk||{};a.open();render();return}return t1.apply(this,arguments)}})();
["giftpick","plantpick"].forEach(id=>{const b0=PEND[id];if(!b0)return;PEND[id]=function(){const d=b0.apply(this,arguments);if(d&&d.o)d.o=d.o.map(o=>/^Thôi/.test(o.n)?Object.assign({},o,{go:()=>{S.payOnPick=0;if(o.go)o.go()}}):Object.assign({},o,{go:()=>{if(S.payOnPick){spend(S.payOnPick);S.payOnPick=0;if(popIdx!=null&&S.visit){S.visit.tk=S.visit.tk||{};S.visit.tk[popIdx]=1}}if(o.go)o.go()}}));return d};});
/* gifts list their gain per target and a face */
(function(){const g0=PEND.giftpick;PEND.giftpick=function(p){const d=g0.apply(this,arguments);try{const e=S.inv[p&&p.ix!=null?p.ix:-1];if(d&&d.o)d.o.forEach(o=>{if(/^Thôi/.test(o.n))return;if(e){const r=/Hoàng thượng/.test(o.n)?"emp":/Thái hậu/.test(o.n)?"th":rivals.find(v=>o.n.includes(v.name));if(r){const g=giftVal(Object.assign({k:e.k},IT[e.k]),r);o.x=o.x||`${r==="emp"?"Sủng":r==="th"?"Thái hậu với ngươi":"thiện cảm nàng"} +${g}`}}})}catch(x){}return d}})();
/* R-B: explicit verdicts and every kind of change */
function relSnap(){const o={};for(const v of rivals){o[v.id]={a:aff(v,S),m:aff(S,v),e:v.ev||0,g:v.ghen||0,o:Math.round(oan(v,S))}}return o}
(function(){const rs=rsnap;rsnap=function(){const b=rs.apply(this,arguments);if(b){b.rel=relSnap();b.maidL=S.maid?S.maid.loyal:0}return b}})();
resultShow=function(title,before,okHint){if(!S||!before||S.dead)return;const d=RKEYS.map(([k,n])=>[n,(S[k]||0)-before[k],S[k]||0]).filter(x=>x[1]);if(S.maid&&S.maid.loyal!==before.maid)d.push([`Lòng ${S.maid.name}`,S.maid.loyal-before.maid,S.maid.loyal]);
 const R=before.rel||{};for(const v of rivals){const b=R[v.id];if(!b)continue;const a=aff(v,S),m=aff(S,v),e=v.ev||0,g=v.ghen||0,o=Math.round(oan(v,S));const nm=v.name.split(" ").pop();
  if(a!==b.a)d.push([`${nm} với ngươi (thiện cảm)`,a-b.a,a]);if(m!==b.m)d.push([`Ngươi với ${nm}`,m-b.m,m]);if(e!==b.e)d.push([`Chứng cứ về ${nm}`,e-b.e,e]);if(g!==b.g)d.push([`${nm} ghen`,-(g-b.g),g,true]);if(o!==b.o)d.push([`${nm} oán ngươi`,-(o-b.o),o,true])}
 const n=Math.max(0,Math.min(S.logs.length,(S.logSeq||0)-before.seq));const why=S.logs.slice(0,n).map(plain).reverse().join(" ").replace(/\s+/g," ").trim();
 const seal=okHint==="sure"?"XONG":okHint===false?"HỎNG":okHint===true?"THÀNH":(/chặn kịp|phát giác|bị lộ|bị bắt|không thành|hỏng|từ chối|không ai tin/i.test(why)?"HỎNG":"THÀNH");if(!d.length&&!why)return;
 if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}t.onclick=()=>t.classList.remove("on");
 t.className="rtoast "+(seal==="HỎNG"?"bad":seal==="XONG"?"sure":"ok");t.innerHTML=`<b class="seal">${seal}</b><div class="rt"><b>${title}</b><div class="rd">${d.map(([k,v,now,inv])=>`<span class="ef ${(inv?-v:v)>0?(inv?"r":"g"):(inv?"g":"r")}">${k} ${now-(inv?-v:v)} → ${now}</span>`).join('<span class="ksep">·</span>')||'<span class="ef n">không đổi chỉ số</span>'}</div>${why?`<small>${why}</small>`:""}<small class="past">Chạm để đóng · đầy đủ ở Nhật ký</small></div>`;
 void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),7000)};
/* verdicts: deck cards by their roll, sure acts 'XONG', scheme acts by their own outcome words */
(function(){const ro=runOpt;runOpt=function(a){const r=ro.apply(this,arguments);window.__lastOk=(a&&(a.o==null||a.o>=100))?"sure":r;return r}})();
(function(){const f=window.doAct;window.doAct=function(i,k){window.__actK=k;return f.apply(this,arguments)}})();
/* stop the buổi from turning over under the result: wait a little longer */
(function(){const r0=render;render=function(){const L=advLock;if(!S||S.dead||Q.length||S.mg||used<4||L)return r0.apply(this,arguments);advLock=true;const ret=(function(){const a=advLock;advLock=true;return r0.apply(this,arguments)}).apply(this,arguments);setTimeout(()=>{advLock=false;if(used>=4&&!Q.length&&S&&!S.dead&&!S.mg)nextBuoi()},2600);return ret}})();
/* Xuất gia asks first */
function xgConfirm(go){Q.unshift({t:"Xuất gia?",h:"<p>Cạo tóc đi tu là <b>kết thúc kiếp này</b>. Không quay lại được.</p>",opts:[{n:"Xuất gia, kết thúc kiếp này",fx:{},x:"kết thúc kiếp này",go},{n:"Thôi, ở lại",fx:{}}]});showModal()}
/* no faking illness from lãnh cung; no deck card that cannot help */
(function(){const d0=deal;deal=function(){d0.apply(this,arguments);if(S&&S.out)deck=deck.filter(a=>a.n!=="Giả bệnh")}})();
/* map tiles: every disabled tile says why */
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);const why=S.out?"đang ở lãnh cung":S.confined?`đang cấm túc (còn ${S.confined} tháng)`:"";if(why)h=h.replace(/<span class="mband">/g,`<span class="mband"><span class="mchip">${why}</span>`);
 h=h.replace(new RegExp(`(data-go="${S.place}"[^>]*>(?:(?!</button>).)*?<span class="mband">)`,"s"),`$1<span class="mchip">đang ở đây</span>`);return h}})();
/* kids: acts on the card, and a guard over them (two-way: rivals harm kids, she can protect them) */
function kidActs(k){if(!k.alive)return[];const t2=whyTime(2);return [pbtn(`data-kid="teach" data-kn="${k.name}"`,"Dạy học",`Chắc chắn · tốn: 2 khắc · thành: Tài con +${4+Math.round(S.tai/20)}`,t2||(k.age<3?"con còn quá nhỏ":"")),
 pbtn(`data-kid="care" data-kn="${k.name}"`,"Chăm sóc",`Chắc chắn · tốn: 2 khắc, Bạc -10 · thành: Sức khỏe con +10`,t2||(S.bac<10?"thiếu bạc (cần 10)":k.hp>=100?"con đang khỏe":"")),
 pbtn(`data-kid="greet" data-kn="${k.name}"`,"Dẫn đi thỉnh an Hoàng thượng",`${word(od(70+S.sung/10))} · tốn: 2 khắc, Sức -5 · thành: Hoàng thượng thương con +8, Sủng +2 · hỏng: không gặp được ngài`,t2||(k.age<2?"con còn quá nhỏ":"")),
 pbtn(`data-kid="guard"`,"Canh giữ các con",`Chắc chắn · tốn: 2 khắc, Bạc -20 · thành: 2 tháng kẻ hại con ngươi dễ bị chặn (1 trong 2 lần)`,t2||(S.bac<20?"thiếu bạc (cần 20)":S.kidGuard>0?`đang canh (còn ${S.kidGuard} tháng)`:""))]}
function kidAct(a,name){const k=S.kids.find(x=>x.name===name&&x.alive);if(S.dead||Q.length||!can(2))return;const b=rsnap();
 if(a==="teach"&&k&&k.age>=3){spend(2);const g=4+Math.round(S.tai/20);k.tal=cl(k.tal+g,0,100);log(`Dạy ${k.name} học: Tài con +${g}.`)}
 else if(a==="care"&&k&&S.bac>=10){spend(2);apply({bac:-10});k.hp=cl(k.hp+10,0,100);log(`Chăm sóc ${k.name}: Sức khỏe con +10.`)}
 else if(a==="greet"&&k){spend(2);apply({suc:-5});if(roll(od(70+S.sung/10))){k.fond=cl(k.fond+8,0,100);apply({sung:2});log(`Dẫn ${k.name} thỉnh an: Hoàng thượng thương con +8, Sủng +2.`)}else log(`Dẫn ${k.name} đi thỉnh an, Hoàng thượng bận không gặp.`)}
 else if(a==="guard"&&S.bac>=20&&!(S.kidGuard>0)){spend(2);apply({bac:-20});S.kidGuard=2;log("Ngươi cắt người canh giữ các con 2 tháng.")}else return;resultShow(a==="guard"?"Canh giữ các con":"Việc của con",b,a==="greet"?null:"sure");render()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-kid]");if(b&&!b.disabled){e.stopPropagation();kidAct(b.dataset.kid,b.dataset.kn)}},true);
(function(){const kc=kidCard;kidCard=function(k){let h=kc.apply(this,arguments);if(k.alive){const acts=kidActs(k).join("");h=h.replace('<div class="pcr">',`<div class="pcr"><h5>Chăm con</h5><div class="pcb">${acts}</div>`)}return h}})();
(function(){const r0=runAct;runAct=function(a,t,k){if(t===S&&a!==S&&["kpoison","pond","kframe","ksab"].includes(k)&&S.kidGuard>0&&roll(50)){evA(S,a,1);return `<b>[${ACT[k].n} · hỏng]</b> Người canh con ngươi chặn được kẻ lạ, khai ra người của ${a.name}: chứng cứ +1. `}return r0.apply(this,arguments)}})();
(function(){const m0=monthTick;monthTick=function(){const r=m0.apply(this,arguments);if(S&&S.kidGuard>0)S.kidGuard--;return r}})();
/* honest disabled reasons on the dossier for acts whose x is a goal, not a lack */
const LACK={musk:t=>!t.preg||t.hidden?"nàng không có thai (ngươi biết)":"",catswap:t=>!(t.preg>=6)||t.hidden?"nàng chưa có thai tháng 6":"",vp:t=>!vpItems(t).length?"nàng không mặc đồ quá phẩm":"",plant:()=>!S.inv.some(e=>!e.h)?"rương ngươi trống":"",gift:()=>!S.inv.some(e=>!e.h)?"rương ngươi trống":"",block:t=>t.block?"thẻ nàng đang bị rút":S.bac<40?"thiếu bạc (cần 40)":""};
(function(){const g0=rvGroups;rvGroups=function(v,i){const G=g0.apply(this,arguments);for(const g of G)g[1]=g[1].map(h=>{const m=String(h).match(/data-a="(\w+)"/);if(!m||!LACK[m[1]]||!/ disabled/.test(h))return h;const w=LACK[m[1]](v);return w?h.replace(/<span class="kwhy">[^<]*<\/span>/,`<span class="kwhy">${w}</span>`):h});return G}})();
/* HUD chip names say exactly what they are */
(function(){const r0=renderHud2;renderHud2=function(){r0.apply(this,arguments);const el=$("hud2");if(!el)return;const fix=(k,lab)=>{const b=el.querySelector(`.hc[data-hx="${k}"]`);if(b){const bb=b.querySelector("b");const i=b.querySelector("i");b.innerHTML=lab+(bb?` <b>${bb.innerHTML}</b>`:"")+(i?i.outerHTML:"")}};fix("maid",`Lòng ${S.maid?S.maid.name:"cung nữ"}`);fix("con","Dễ có thai:");fix("dem","Được lật thẻ:");fix("an","Ân tình (đêm)");fix("aw","Số lần ân thưởng");if(S.lot)fix("lot",`Quẻ tuần: ${LV[S.lot.lv]} (${S.lot.dom})`)}})();
/* relation words in lines: one wording, colour by meaning for her */
(function(){const kp=kitParse;kitParse=function(str){str=String(str||"").replace(/(nàng |hắn )?thù -(\d+)/g,(m,p,n)=>`${p||""}oán ngươi +${n}`).replace(/thân -(\d+)/g,"thiện cảm -$1").replace(/thân \+(\d+)/g,"thiện cảm +$1").replace(/\bngay: /g,"được ngay: ");return kp(str)}})();
(function(){const k0=kcls;kcls=function(t){const s=String(t).replace(/<[^>]+>/g,"");if(/thiện cảm\s*-|lòng\s*-|Sủng\s*-|Danh\s*-|Đức\s*-|oán ngươi \+|ghen \+/i.test(s)&&!/\bnàng\b.*-/.test(s.replace(/oán ngươi.*/,"")))return"r";return k0(t)}})();
/* dialog options: a face beside every named person */
(function(){const s0=showModal;showModal=function(){s0.apply(this,arguments);const M=$("modal");if(M.hidden)return;M.querySelectorAll(".opt").forEach(b=>{if(b.querySelector(".md"))return;const tx=b.firstChild&&b.firstChild.textContent||"";const v=rivals.find(r=>tx.includes(r.name));const f=v?pv(v):/Hoàng thượng/.test(tx)?pEmp():/Thái hậu/.test(tx)?pTH():null;if(f)b.insertAdjacentHTML("afterbegin",mdH(f,"xs"))})}})();
/* the ghen of a rival is hidden until she knows her */
(function(){const rc=rvCard;rvCard=function(v,i){let h=rc.apply(this,arguments);if(!knows(v))h=h.replace(/<div class="pgh">[\s\S]*?<\/div><\/div>/,`<div class="pgh"><span>Ghen: <span class="ef n">chưa rõ</span></span></div>`);return h}})();
/* her portrait in the death dialog is labelled by her name and rank */
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);f.rw=(S.rank>=7?"Hoàng hậu":RANKS[S.rank].n);return f}})();
/* older eunuchs are not 'Tiểu': Lão X; servant names unique across all palaces */
(function(){const a0=ageInit;ageInit=function(){const r=a0.apply(this,arguments);try{allServ().forEach(s=>{if(s.role!=="maid"&&s.age>=45&&/^Tiểu /.test(s.name))s.name=s.name.replace(/^Tiểu /,"Lão ")})}catch(e){}return r}})();
(function(){const m0=mkServ;mkServ=function(role){let s=m0.apply(this,arguments);const taken=new Set([S&&S.maid&&S.maid.name].concat((rivals||[]).map(v=>v.maid&&v.maid.name),allServ().map(x=>x.name)));let n=2;const base=s.name;while(taken.has(s.name))s.name=base+" "+(n++);if(role!=="maid"&&s.age>=45&&/^Tiểu /.test(s.name))s.name=s.name.replace(/^Tiểu /,"Lão ");return s}})();
/* items without their own picture yet use the nearest picture; the proof bundle uses the proof icon */
Object.assign(ITIMG,{tramngoc:"tram-phuong",vongvang:"vong-ngoc",gamvang:"gam-to-chau",demgam:"lua-hang-chau"});
(function(){const i0=iic;iic=function(k,s){if(k==="chungcu")return ic("chung-cu",s||22);return i0.apply(this,arguments)}})();
/* each rival palace looks a little different (tint of the shared hall art by owner rank) */
(function(){const r0=renderStage;renderStage=function(){r0.apply(this,arguments);try{const st=$("stage");const k=S.place;st.classList.remove("rp0","rp1","rp2","rp3","day","night");if(k&&k[0]==="r"){const v=RV(+k.slice(1));if(v)st.classList.add("rp"+(v.rank>=5?3:v.rank>=3?2:v.rank>=1?1:0))}st.classList.add((S.buoi||0)===2?"night":"day")}catch(e){}}})();
/* a faction may ask her to join (two-way) */
(function(){const a1=approachOne;approachOne=function(){if(!facOf(S)&&(S.facs||[]).length&&roll(20)){const f=pick(S.facs);const l=facLeader(f);if(l&&l!==S&&aff(l,S)>=0)return{t:"Có người đến",who:pv(l),h:`<p>${l.name}, người đứng đầu ${f.name}, mời ngươi vào phe.</p>`,opts:[{n:"Nhận lời vào phe",fx:{},x:`nàng thiện cảm +10 · kẻ thù của phe oán ngươi`,go:()=>{f.m.push(key(S));relAdd(S,l,10)}},{n:"Khéo từ chối",fx:{},x:"nàng thiện cảm -3",go:()=>relAdd(S,l,-3)}]}}return a1.apply(this,arguments)}})();
/* card sub-tabs: one group at a time, remembered per role */
document.addEventListener("click",e=>{const b=e.target.closest("[data-pct]");if(!b)return;e.stopPropagation();e.preventDefault();window.__pcTab=window.__pcTab||{};window.__pcTab[b.dataset.role]=b.dataset.pct;const c=b.closest(".pcr");c.querySelectorAll(".pct").forEach(x=>x.classList.toggle("on",x===b));c.querySelectorAll(".pcg").forEach(g=>g.classList.toggle("on",g.dataset.g===b.dataset.pct))},true);
/* consort faces by DRESS TIER (picked by rank), reviewed by eye: only serene, slim, adult, approved-style faces; stern, plump, sad or childlike ones are left out */
const CW=n=>"@W"+n,CF=n=>"face-consort-"+pad(n);
Object.assign(FPOOL,{ct1:[3,8,9,10,11,12,13,16,22,23].map(CW).concat([2,5,11,31,37,39].map(CF)),ct2:[1,2,6,14,15,21,24].map(CW).concat([1,12,15,18,28,32,38].map(CF)),ct3:[0,4,5,7,18,19,20].map(CW).concat([7,21,25].map(CF)),ct4:[17].map(CW).concat([13].map(CF)),ct5:[]});
FPOOL.consort=[].concat(FPOOL.ct1,FPOOL.ct2,FPOOL.ct3,FPOOL.ct4);
function tierOf(p){const r=p===S?S.rank:(p.queen?7:p.rank);return r<=1?1:r<=3?2:r<=5?3:r===6?4:5}
(function(){const b0=bandKeys;bandKeys=function(kind,age,p){if(kind==="consort"&&p){const t=tierOf(p);const near=[1,2,3,4,5].sort((a,b)=>Math.abs(a-t)-Math.abs(b-t)||b-a).map(x=>"ct"+x);return age>35?["womid"].concat(near):near}return b0.apply(this,arguments)}})();
/* a consort's face follows her rank tier: re-picked on promotion or demotion */
(function(){const ff=faceFor;faceFor=function(o,kind,age){if(kind==="consort"){const keys=bandKeys("consort",age,o);const k=keys[0];if(o.fc==null||o.fk!==k){o.fc="";o.fc=drawF(keys);o.fk=k}return}return ff.apply(this,arguments)}})();
(function(){const fs=fsrc;fsrc=function(fc,fb){if(fc&&fc[0]==="@"){const n=+fc.slice(2);return (AV.women||[])[n]||fb||""}return fs.apply(this,arguments)}})();
/* owner review 11/13: only serene, fair-skinned, adult faces stay in the pools */
Object.assign(FPOOL,{ct1:[3,8,9,10,11,12,13,16,22,23].map(CW).concat([2,5,11,37].map(CF)),ct4:[17].map(CW).concat([13,41,42,43,44,45].map(CF)),
 maid:[1,2,4,5].map(n=>"face-maid-"+n).concat([8,9,13,14,22,25,27,30,31,32,33].map(n=>"face-maid-"+pad(n))),mama:[1,3,4,6,7,8].map(n=>"face-mama-"+n),womid:[1,3,4,5,8].map(n=>"face-woman-mid-"+n),manold:[1,3].map(n=>"face-man-old-"+n),
 eun1:["16","20"].map(EU),eun2:["4"].map(EU),eun3:["3","13"].map(EU),th0:[1,5,6].map(TH),th1:[4].map(TH)});
FPOOL.consort=[].concat(FPOOL.ct1,FPOOL.ct2,FPOOL.ct3,FPOOL.ct4);
/* a saved face that left the pools (owner review) is re-picked on load */
(function(){const ff=faceFor;faceFor=function(o,kind,age){if(o&&o.fc&&o.fc[0]!=="@"){const all=new Set([].concat(...Object.values(FPOOL)));if(!all.has(o.fc)){o.fc=null;o.fk=null}}return ff.apply(this,arguments)}})();
FPOOL.ct3=[0,4,5,7,18,19,20].map(CW).concat([7,25].map(CF));FPOOL.consort=[].concat(FPOOL.ct1,FPOOL.ct2,FPOOL.ct3,FPOOL.ct4);
/* the rank race, as she knows it */
function rankBoard(){const L=consorts().concat(rivals.filter(v=>v.alive&&v.out)).filter((v,i,a)=>a.indexOf(v)===i).sort((a,b)=>rkOf(b)-rkOf(a));
 return `<div class="rboard"><p class="past">Bảng phẩm vị: ai đang ở đâu, ai sắp lên (theo điều ngươi biết).</p>${L.map(p=>{const me=p===S,r=rkOf(p);const nx=r<7?RANKS[r+1].n:"";const since=S.turn-(p.lastPromo||0);
  const known=me||knows(p);const req=me&&r<7?promoReqP(S).filter(x=>!x[0]).map(x=>x[1]):[];
  return `<div class="rrow2">${mdH(me?pMe():pv(p),"sm")}<div><b>${me?"Ngươi":p.name}</b> <span class="past">${r>=7?"Hoàng hậu":RANKS[r].n}${p.out?" · lãnh cung":""}</span>
   <div class="rl">${me?`${ic("sung",14)}Sủng ${S.sung} · Danh ${S.danh}`:favLine(p)} · ${since} tháng từ lần sắc phong trước</div>
   ${r<7&&!p.out?`<div class="rl">Lên ${nx}: ${me?(req.length?`<span class="ef r">còn thiếu: ${req.join("; ")}</span>`:`<span class="ef g">đủ điều kiện</span>`):known?`cần Sủng ${RANKS[r+1].s}, Danh ${RANKS[r+1].d}${p.hh<=-40&&r+1>=2?' · <span class="ef r">Hoàng hậu chặn</span>':""}`:'<span class="ef n">chưa rõ</span>'}</div>`:""}</div></div>`}).join("")}</div>`}
document.addEventListener("click",e=>{const b=e.target.closest("[data-rboard]");if(b){e.stopPropagation();window.__rb=!window.__rb;render()}},true);
(function(){const r0=rvTabHTML;rvTabHTML=function(){const btn=`<button class="pct${window.__rb?" on":""}" data-rboard="1">${window.__rb?"Về hồ sơ từng người":"Bảng phẩm vị"}</button>`;if(window.__rb)return `<div class="pgwrap"><div class="pctabs">${btn}</div><div style="overflow:auto;min-height:0">${rankBoard()}</div></div>`;return r0.apply(this,arguments).replace('<div class="pgwrap">',`<div class="pgwrap"><div class="pctabs">${btn}</div>`)}})();
/* ================= BẢN ĐỒ: the Đại Hy palace overview by season and buổi, places as hotspots ================= */
const MAPH={"places": {"vuon": {"box": {"x": 0.435, "y": 0.095, "w": 0.13, "h": 0.11}, "anchor": {"x": 0.5, "y": 0.15}}, "kn": {"box": {"x": 0.44, "y": 0.21, "w": 0.12, "h": 0.16}, "anchor": {"x": 0.5, "y": 0.258}}, "dtd": {"box": {"x": 0.44, "y": 0.38, "w": 0.125, "h": 0.205}, "anchor": {"x": 0.502, "y": 0.442}}, "thu": {"box": {"x": 0.4, "y": 0.61, "w": 0.205, "h": 0.18}, "anchor": {"x": 0.502, "y": 0.664}}, "tn": {"box": {"x": 0.12, "y": 0.19, "w": 0.145, "h": 0.26}, "anchor": {"x": 0.193, "y": 0.333}}, "tyv": {"box": {"x": 0.665, "y": 0.615, "w": 0.135, "h": 0.17}, "anchor": {"x": 0.733, "y": 0.683}}, "ksp": {"box": {"x": 0.57, "y": 0.855, "w": 0.185, "h": 0.08}, "anchor": {"x": 0.662, "y": 0.887}}, "lc": {"box": {"x": 0.692, "y": 0.095, "w": 0.045, "h": 0.105}, "anchor": {"x": 0.714, "y": 0.148}}, "home": {"box": {"x": 0.29, "y": 0.45, "w": 0.065, "h": 0.13}, "anchor": {"x": 0.323, "y": 0.502}}}, "rivalSlots": [{"name": "Cảnh Phúc cung", "box": {"x": 0.645, "y": 0.448, "w": 0.077, "h": 0.142}, "anchor": {"x": 0.683, "y": 0.491}}, {"name": "Khải Tường cung", "box": {"x": 0.645, "y": 0.322, "w": 0.067, "h": 0.123}, "anchor": {"x": 0.678, "y": 0.359}}, {"name": "Chung Tú cung", "box": {"x": 0.645, "y": 0.208, "w": 0.06, "h": 0.11}, "anchor": {"x": 0.675, "y": 0.241}}, {"name": "Hàm An cung", "box": {"x": 0.645, "y": 0.098, "w": 0.043, "h": 0.105}, "anchor": {"x": 0.666, "y": 0.13}}, {"name": "Thừa Minh cung", "box": {"x": 0.572, "y": 0.322, "w": 0.068, "h": 0.123}, "anchor": {"x": 0.606, "y": 0.359}}, {"name": "Diên Huy cung", "box": {"x": 0.575, "y": 0.448, "w": 0.066, "h": 0.142}, "anchor": {"x": 0.608, "y": 0.491}}, {"name": "Vĩnh Hòa cung", "box": {"x": 0.572, "y": 0.208, "w": 0.068, "h": 0.11}, "anchor": {"x": 0.606, "y": 0.241}}, {"name": "Trường Xuân cung", "box": {"x": 0.572, "y": 0.098, "w": 0.068, "h": 0.105}, "anchor": {"x": 0.606, "y": 0.13}}]};
const SEAK={"Xuân":"xuan","Hạ":"ha","Thu":"thu","Đông":"dong"},BUK=["sang","chieu","toi"];
function mapImg(){return `img/map-${SEAK[SEASON[S.month-1]]||"ha"}-${BUK[S.buoi||0]}.webp`}
function mapSpots(){const L=[];for(const k in MAPH.places){if(k==="kn"&&!qOn())continue;L.push({k,box:MAPH.places[k].box,n:k==="home"?"Tẩm cung":placeOf(k).n})}
 const pals=[...new Set(liveRivals(false).filter(v=>palaceOf(v)!=="home"&&palaceOf(v)!=="kn").map(v=>palaceOf(v)))];pals.forEach((k,i)=>{const s=MAPH.rivalSlots[i];if(!s)return;const v=RV(+k.slice(1));L.push({k,box:s.box,n:v?`Cung ${v.name.split(" ").pop()}`:s.name,small:true,v})});return L}
function mapHTML(){const W=S.where||{};const disR=k=>S.out?"đang ở lãnh cung":S.confined?`đang cấm túc (${S.confined} tháng)`:S.place===k?"đang ở đây":k!=="home"&&!can(travel(S.place,k)+1)?"hết khắc":"";
 if(window.__mapList){return `<div class="ph"><button class="btn" data-maplist="0">Xem bản đồ hoàng cung<small>toàn cảnh</small></button></div>`+mapHTMLgrid()}
 const z=window.__mapZ||1;
 return `<div class="mapv"><div class="maptools"><span class="past">${SEASON[S.month-1]} · ${BUOI[S.buoi||0]} · còn ${4-used} khắc · đi gần 1 khắc, xa 2</span><span><button class="btn mz" data-mapz="-1" aria-label="Thu nhỏ">−</button><button class="btn mz" data-mapz="1" aria-label="Phóng to">+</button><button class="btn mz" data-maplist="1">Danh sách</button></span></div>
 <div class="mapsc"><div class="mapw" style="width:${z*100}%"><img class="mapimg" src="${mapImg()}" alt="Toàn cảnh hoàng cung Đại Hy" onerror="this.src='img/map-${BUK[S.buoi||0]}.webp'">
 ${mapSpots().map(s=>{const why=disR(s.k);const n=countAt(s.k);const b=s.box;return `<button class="mspot${s.small?" sm":""}${why?" off":""}" data-go="${s.k}" ${why?"disabled":""} style="left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%"><span class="mlab">${s.v?mdH(pv(s.v),"xs"):""}${s.n}${n?` <i>${n} bóng</i>`:""}${why?` <em>${why}</em>`:s.k!=="home"&&S.place!==s.k?` <em class="ok">${travel(S.place,s.k)} khắc</em>`:""}</span></button>`}).join("")}
 </div></div></div>`}
document.addEventListener("click",e=>{const z=e.target.closest("[data-mapz]");if(z){e.stopPropagation();window.__mapZ=cl((window.__mapZ||(innerWidth<600?2.5:1))+(+z.dataset.mapz)*.5,1,3);render();return}const l=e.target.closest("[data-maplist]");if(l){e.stopPropagation();window.__mapList=l.dataset.maplist==="1";render()}},true);
/* ================= RESIDENCE ON THE ĐẠI HY PLAN, TWELVE RIVALS, TUYỂN TÚ ================= */
/* the plan's real names; each place keeps a short function word on hover */
const PALN=MAPH.rivalSlots.map(s=>s.name),HOMEN="Ngọc Thanh các";
const PLNAME={kn:["Càn Ninh cung","cung Hoàng hậu"],tn:["Đức Thọ cung","cung Thái hậu"],dtd:["Dưỡng Hòa điện","tẩm điện Hoàng thượng"],thu:["Cần Chính điện","nơi Hoàng thượng phê tấu"],lc:["Trường Môn viện","lãnh cung"],vuon:["Ngự hoa viên","vườn ngự"],tyv:["Thái y viện","thuốc thang"],ksp:["Kính sự phòng","giữ thẻ bài thị tẩm"]};
/* start: traits spread so no two of the same rank share one; each gets a second trait (virtue or vice) */
const TRAIT2=["Hiếu thảo","Ghen tuông","Tham tiền","Trọng nghĩa","Nhiều chuyện","Thù dai","Cả nể","Thẳng thắn","Mê tín","Khéo léo"];
function spreadTraits(){const A=[...TRAITS,...TRAITS].sort(()=>Math.random()-.5),B=[...TRAIT2,...TRAIT2].sort(()=>Math.random()-.5);
 rivals.forEach((v,i)=>{const t=A[i%A.length];v.trait=t[0];v.malice=cl(t[1]+R(20)-10,0,100);v.trait2=B[i%B.length]})}
function ensureT2(v){if(v&&!v.trait2)v.trait2=pick(TRAIT2);return v}
(function(){const n0=newRival;newRival=function(){return ensureT2(n0.apply(this,arguments))}})();
/* a palace head: Phi and above, not the queen (she holds Càn Ninh), not fallen */
function palHeadOK(p){return !!p&&(p===S?!S.out&&!S.dead:p.alive&&!p.out)&&!p.queen&&rkOf(p)>=4}
function palFix(){if(!S||!rivals)return;rivals.forEach(ensureT2);const occ={};const heads=[S].concat(rivals).filter(palHeadOK);
 if(S.pal!=null&&!palHeadOK(S)){log(`Ngươi dời khỏi ${PALN[S.pal]}.`);S.pal=null}
 for(const v of rivals)if(v.pal!=null&&!palHeadOK(v))v.pal=null;
 for(const p of heads)if(p.pal!=null){if(occ[p.pal]!=null)p.pal=null;else occ[p.pal]=key(p)}
 for(const p of heads)if(p.pal==null){const f=PALN.findIndex((_,i)=>occ[i]==null);if(f<0)continue;p.pal=f;occ[f]=key(p);if(p===S){S.palCer=1}}
 /* lower ranks live in a head's side hall (thiên điện); never left without a palace when a head exists */
 const hs=[S].concat(rivals).filter(p=>palHeadOK(p)||(p!==S&&p.queen&&p.alive&&!p.out));
 for(const p of [S].concat(rivals)){if(p!==S&&(!p.alive||p.out))continue;if(rkOf(p)>=4){p.resHead=null;continue}
  const h=p.resHead!=null&&byKey(p.resHead);const ok=h&&h!==p&&hs.includes(h)&&(h!==S||palHeadOK(S));
  if(p===S){if(!ok)S.resHead=null;continue} /* she keeps Ngọc Thanh các until she is a head herself */
  if(!ok){const L=hs.filter(x=>x!==p&&x!==S);const c=L.filter(x=>[S].concat(rivals).filter(y=>y.resHead===key(x)).length<3);p.resHead=(c.length?pick(c):L.length?pick(L):null);p.resHead=p.resHead?key(p.resHead):null}}}
(function(){const a0=assignHouses;assignHouses=function(){palFix()}})();
/* where a house lives on the plan */
function palSlot(k){if(k==="home")return S.pal!=null?S.pal:null;if(k&&k[0]==="r"){const h=RV(+k.slice(1));return h&&h.pal!=null?h.pal:null}return null}
function palName(k){if(k==="home")return S.pal!=null?PALN[S.pal]:HOMEN;if(PLNAME[k])return PLNAME[k][0];const i=palSlot(k);if(i!=null)return PALN[i];const h=k&&k[0]==="r"&&RV(+k.slice(1));return h?`thiên điện của ${h.name}`:k}
function palFn(k){if(k==="home")return "tẩm cung của ngươi";if(PLNAME[k])return PLNAME[k][1];const h=k&&k[0]==="r"&&RV(+k.slice(1));return h?`cung ${RANKS[h.rank].n} ${h.name}`:""}
function residents(k){const L=[];if(k==="kn"){const q=rivals.find(v=>v.queen&&v.alive&&!v.out);if(q)L.push(q)}
 for(const p of [S].concat(rivals)){if(p!==S&&(!p.alive||p.out))continue;if(k!=="kn"&&p.queen)continue;const pk=palaceOf(p);if(pk===k&&!L.includes(p))L.push(p)}
 return L.sort((a,b)=>rkOf(b)-rkOf(a))}
/* palaceOf: a lower consort living under the queen is in Càn Ninh */
(function(){const p0=palaceOf;palaceOf=function(p){if(p!==S&&p&&!p.queen){const h=byKey(houseOf(p));if(h&&h!==S&&h.queen)return"kn"}return p0.apply(this,arguments)}})();
function houseName(p){const k=palaceOf(p);const hd=byKey(houseOf(p));return k==="home"?(p===S?palName("home"):`thiên điện ${palName("home")} (cung ngươi)`):hd===p?palName(k):`thiên điện ${palName(k)}`}
/* places carry the plan names; one entry per house */
(function(){const p0=places;places=function(){const L=p0.apply(this,arguments).filter(x=>!(x.k[0]==="r"));for(const x of L)if(PLNAME[x.k]){x.n=PLNAME[x.k][0];x.fn=PLNAME[x.k][1]}
 const seen={};for(const v of rivals){if(!v.alive||v.out||v.queen)continue;const k=palaceOf(v);if(k==="home"||k==="kn"||seen[k])continue;seen[k]=1;const hd=RV(+k.slice(1));const R2=residents(k);
  L.splice(L.length-3,0,{k,n:palName(k),fn:palFn(k),d:`${hd&&rkOf(hd)>=4?"Chủ vị "+RANKS[hd.rank].n+" "+hd.name:"Ở thiên điện"}${R2.length>1?" · thiên điện: "+R2.filter(x=>x!==hd).map(x=>x.name).join(", "):""}.`,sc:"rv",v:hd}) }
 return L}})();
(function(){const p0=placeOf;placeOf=function(k){if(k==="home"){const R2=residents("home").filter(x=>x!==S);return{k,n:palName("home"),fn:"tẩm cung của ngươi",d:`Cung nữ và các con ở đây.${R2.length?" Thiên điện: "+R2.map(x=>x.name).join(", ")+".":""}`,sc:"home"}}return p0.apply(this,arguments)}})();
/* the ceremony card when she first heads a palace: the Emperor grants the best empty one; she may ask for another */
function palCeremony(){if(!S||!S.palCer||S.dead)return;S.palCer=0;const occ={};[S].concat(rivals).forEach(p=>{if(p.pal!=null&&(p===S||p.alive))occ[p.pal]=1});const free=PALN.map((n,i)=>i).filter(i=>!occ[i]);
 Q.push({t:"Ban cung",who:pEmp(),h:`<p>Thánh chỉ: ${RANKS[S.rank].n} ${S.name} được ban <b>${PALN[S.pal]}</b>, làm chủ vị một cung. Cung nhân dọn từ ${HOMEN} sang trong ngày.</p>`,
  opts:[{n:`Nhận ${PALN[S.pal]}`,fx:{},x:"tạ ơn, dọn sang",go:()=>log(`Dọn sang ${PALN[S.pal]}.`)}].concat(free.slice(0,3).map(i=>({n:`Xin ${PALN[i]}`,fx:{},x:"tâu xin cung khác còn trống",go:()=>{S.pal=i;log(`Tâu xin, được dời sang ${PALN[i]}.`)}})))});log(`Được ban ${PALN[S.pal]}.`)}
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead){palFix();palCeremony();tuyenTu();if(Q.length&&$("modal").hidden)showModal()}}catch(e){}return r}})();
/* TUYỂN TÚ: every third spring, 3-5 young consorts enter at Đáp ứng / Thường tại; living consorts capped at 16 */
const CAPC=16;
function tuyenTu(){if(!S||S.month!==2||S.tuan!==0||S.ttDone===S.year)return;if(S.year%3!==0&&liveRivals(true).length>=8)return;S.ttDone=S.year;const live=liveRivals(true).length+1;let n=Math.min(3+R(3),CAPC-live);const L=[];
 while(n-->0&&roomFor("consort")){const v=newRival(roll(60)?0:1);Object.assign(v,drawFace());v.age=15+R(4);rivals.push(v);L.push(v)}palFix();
 if(L.length){log(`Tuyển tú: ${L.map(v=>`${v.name} (${RANKS[v.rank].n})`).join(", ")} vào cung.`);if(!quiet)Q.push({t:"Tuyển tú",h:`<p>Mùa xuân năm thứ ${S.year}, cung tuyển tú nữ. ${L.length} người vào cung:</p><div class="pcb rows">${L.map(v=>`<div class="pcrow"><span>${mdH(pv(v),"xs")} ${v.name}</span><b>${RANKS[v.rank].n} · ${houseName(v)}</b></div>`).join("")}</div>`})}}
/* the cap applies to every way a consort enters */
(function(){const r0=roomFor;roomFor=function(role){if(role==="consort"&&S&&rivals&&liveRivals(true).length+1>=CAPC)return false;return r0.apply(this,arguments)}})();
/* MAP: every palace hotspot shows its plan name and its residents' faces (residence is public); silhouettes count who is there now */
function mapSpots(){palFix();const L=[];
 for(const k in MAPH.places){if(k==="kn"&&!qOn())continue;if(k==="home"&&S.pal!=null)continue;L.push({k,box:MAPH.places[k].box,n:k==="home"?HOMEN:palName(k),fn:k==="home"?"tẩm cung của ngươi":palFn(k),res:k==="home"||k==="kn"?residents(k):[],small:k==="lc"||k==="home"})}
 const houses={};for(const p of [S].concat(rivals)){if(p!==S&&(!p.alive||p.out||p.queen))continue;const k=palaceOf(p);if(k==="kn")continue;const i=palSlot(k);if(i!=null)houses[i]=k}
 PALN.forEach((nm,i)=>{const s=MAPH.rivalSlots[i];const k=houses[i];if(k){L.push({k,box:s.box,n:nm,fn:palFn(k),res:residents(k),small:true})}else L.push({k:null,box:s.box,n:nm,fn:"cung trống",res:[],small:true,empty:true})});
 /* lower consorts whose head has no slot yet (more heads than palaces) live with no plan spot: listed under the nearest head */
 return L}
function mapHTML(){const W=S.where||{};const disR=k=>S.out?"đang ở lãnh cung":S.confined?`đang cấm túc (${S.confined} tháng)`:S.place===k?"đang ở đây":k!=="home"&&!can(travel(S.place,k)+1)?"hết khắc":"";
 if(window.__mapList){return `<div class="ph"><button class="btn" data-maplist="0">Xem bản đồ hoàng cung<small>toàn cảnh</small></button></div>`+mapHTMLgrid()}
 const z=window.__mapZ||(innerWidth<600?2.5:1);
 return `<div class="mapv"><div class="maptools"><span class="past">${SEASON[S.month-1]} · ${BUOI[S.buoi||0]} · còn ${4-used} khắc<span class="mleg"> · đi gần 1 khắc, xa 2 · mặt nhỏ: người ở cung · bóng: người đang có mặt</span></span><span><button class="btn mz" data-mapz="-1" aria-label="Thu nhỏ">−</button><button class="btn mz" data-mapz="1" aria-label="Phóng to">+</button><button class="btn mz" data-maplist="1">Danh sách</button></span></div>
 <div class="mapsc"><div class="mapw" style="width:${z*100}%"><img class="mapimg" src="${mapImg()}" alt="Toàn cảnh hoàng cung Đại Hy" onerror="this.src='img/map-${BUK[S.buoi||0]}.webp'">
 ${mapSpots().map(s=>{const b=s.box;const pos=`left:${b.x*100}%;top:${b.y*100}%;width:${b.w*100}%;height:${b.h*100}%`;
  if(s.empty)return `<div class="mspot sm off empty" title="${s.n}: ${s.fn}" style="${pos}"><span class="mlab">${s.n.replace(/ cung$/,"")}</span></div>`;
  const why=disR(s.k);const n=countAt(s.k);const fs=s.res.slice(0,s.small?3:4).map(p=>`<span class="mres">${mdH(p===S?pMe():pv(p),"xs")}</span>`).join("")+(s.res.length>(s.small?3:4)?`<span class="mres more">+${s.res.length-(s.small?3:4)}</span>`:"");
  return `<button class="mspot${s.small?" sm":""}${why?" off":""}${S.place===s.k?" here":""}" data-go="${s.k}" ${why?"disabled":""} title="${s.n}: ${s.fn}${n?` · ${n} bóng`:""}${why?` · ${why}`:s.k!=="home"&&S.place!==s.k?` · đi ${travel(S.place,s.k)} khắc`:""}${s.res.length?" · ở: "+s.res.map(p=>p===S?"ngươi":p.name).join(", "):""}" style="${pos}"><span class="mlab">${s.small?s.n.replace(/ cung$/,""):s.n}</span>${(()=>{const bits=[n?`${n} bóng`:"",why&&why!=="đang ở đây"?`<em>${why}</em>`:s.k!=="home"&&S.place!==s.k?`<em class="ok">${travel(S.place,s.k)} khắc</em>`:""].filter(Boolean);return bits.length?`<span class="mmeta">${bits.join(" · ")}</span>`:""})()}${fs?`<span class="mfaces">${fs}</span>`:""}</button>`}).join("")}
 </div></div></div>`}
/* the palace screen: residents present stand in the scene; absent ones named 'đi vắng' only if known */
(function(){const g=goTo;goTo=function(k){const r=g.apply(this,arguments);try{if(S.place===k&&S.visit&&(k==="home"||k==="kn"||k[0]==="r")){const R2=residents(k).filter(p=>p!==S);const here=R2.filter(p=>whereOf(p)===k);const away=R2.filter(p=>whereOf(p)!==k);
   const aw=away.map(p=>{const l=locKnown&&locKnown(p);return l?`${p.name} (đi vắng, ở ${palName(l)})`:null}).filter(Boolean);
   S.visit.res={here:here.map(p=>p.id),away:aw};const line=`${palName(k)}: ${R2.length?R2.map(p=>`${p.name} (${p.queen?"Hoàng hậu":RANKS[p.rank].n}${byKey(houseOf(p))===p?", chủ vị":", thiên điện"})`).join(", "):"không ai ở"}.${aw.length?" "+aw.join("; ")+".":""}`;
   if(k!=="home")S.visit.msg=(S.visit.msg?S.visit.msg+" ":"")+line}}catch(e){}return r}})();
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{palFix()}catch(e){}return r}})();
/* on a narrow screen the zoomed map opens centred on where she stands */
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(tab==="go"){const sc=document.querySelector(".mapsc");const h=sc&&(sc.querySelector(".mspot.here")||sc.querySelector('[data-go="home"]'));const key=S.place+"|"+(window.__mapZ||0);if(sc&&h&&sc.scrollWidth>sc.clientWidth){const img=sc.querySelector(".mapimg");const go=()=>{sc.scrollLeft=h.offsetLeft+h.offsetWidth/2-sc.clientWidth/2;sc.scrollTop=h.offsetTop+h.offsetHeight/2-sc.clientHeight/2};if(img&&!img.complete)img.addEventListener("load",go,{once:true});else go();if(window.__mapCtr===key&&window.__mapPos){sc.scrollLeft=window.__mapPos[0];sc.scrollTop=window.__mapPos[1]}window.__mapCtr=key;sc.addEventListener("scroll",()=>{window.__mapPos=[sc.scrollLeft,sc.scrollTop]},{passive:true})}}}catch(e){}return r}})();
/* the Phi tần face strip, grouped by palace (12-16 consorts): Càn Ninh first, then each palace by rank, fallen and dead last */
(function(){const p0=pager;pager=function(key,items,mk){if(key!=="rv"||!rivals||items.length<rivals.length)return p0.apply(this,arguments);const n=rivals.length;
 const grp=v=>!v.alive?"Đã mất":v.out?"Lãnh cung":palName(palaceOf(v));const ordG=v=>!v.alive?99:v.out?98:palaceOf(v)==="kn"?0:palaceOf(v)==="home"?1:2+(palSlot(palaceOf(v))??9);
 const ord=rivals.map((v,i)=>i).sort((a,b)=>ordG(rivals[a])-ordG(rivals[b])||rkOf(rivals[b])-rkOf(rivals[a]));let last=null;
 const it2=ord.map(i=>{const g=grp(rivals[i]);const x=Object.assign({},items[i]);if(g!==last){x.sep=g;last=g}return x}).concat(items.slice(n));const map=ord.concat(items.slice(n).map((_,j)=>n+j));
 return p0.call(this,key,it2,i=>mk(map[i]))}})();
/* ================= FIGURES: full-body art read from img/FIGURES.json when present; faces otherwise ================= */
/* manifest: an array (or {figures:[...]}) of {file, role, tier, trait, ageBand, look}; fig-* full body, por-* portrait */
let FIGS=[];
(function(){try{fetch("img/FIGURES.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{const L=Array.isArray(j)?j:j&&(j.figures||j.files||j.items)||[];FIGS=L.filter(x=>x&&(x.file||x.src));if(FIGS.length&&S)render()}).catch(()=>{})}catch(e){}})();
const TRK={"Hiểm độc":"hiemdoc","Kiêu ngạo":"kieungao","Hiền lành":"hienlanh","Đa nghi":"danghi","Tham vọng":"thamvong","Nhu mì":"numi"};
function figRole(p){if(p===S)return"heroine";const k=p&&p.kind;if(k==="emp"||p===S.emp)return"emperor";if(k==="th")return"thaihau";if(k==="man"||(p&&p.ref&&p.ref.rw))return"man";if(k==="ty")return"physician";if(k==="maid"||k==="serv")return(p.ref&&p.ref.role==="eunuch")?"eunuch":"maid";return"consort"}
function ageBandOf(a){return a>=36?"old":a>=26?"mid":"young"}
function norm(x){return String(x==null?"":x).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g,"").replace(/đ/g,"d").replace(/[^a-z0-9]/g,"")}
function figFor(p,kind){if(!FIGS.length||!p)return"";const role=figRole(p),who=p.ref||p;const tier=who===S?(S.out?"cold":S.rank):who.queen?7:who.rank;const tr=TRK[who.trait]||norm(who.trait||who.look||"");const ab=ageBandOf(who.age||20);
 const L=FIGS.filter(f=>norm(f.role)===norm(role)&&(kind!=="por"||/(^|\/)por-/.test(f.file||f.src))&&(kind==="por"||!/(^|\/)por-/.test(f.file||f.src)));if(!L.length)return"";
 const sc=f=>(String(f.tier)===String(tier)||String(f.tier)===String(+tier+1)?4:0)+(norm(f.trait)===tr||norm(f.look)===tr?3:0)+(norm(f.ageBand)===ab?2:0);const best=Math.max(...L.map(sc));const top=L.filter(f=>sc(f)===best);
 const h=String(who.id!=null?who.id:who.name||"me").split("").reduce((a,c)=>a*31+c.charCodeAt(0)>>>0,7);const f=top[h%top.length];const src=f.file||f.src;return /^img\//.test(src)?src:"img/"+src}
/* the place screen: people present stand as full figures when the art exists, as framed faces otherwise */
(function(){const r0=renderStage;renderStage=function(){r0.apply(this,arguments);try{if(!FIGS.length)return;const ppl=curPeople();document.querySelectorAll("#tokens .tok").forEach(b=>{const p=ppl[+b.dataset.p];const who=p&&(p.kind==="emp"||p.kind==="th"?p:p.ref);if(!who)return;const src=figFor(p.kind==="emp"||p.kind==="th"?p:who);if(!src)return;
  const md=b.querySelector(".md");if(md){const im=document.createElement("img");im.className="figimg";im.alt="";im.src=src;im.onerror=()=>{im.remove();md.style.display=""};md.style.display="none";b.insertBefore(im,md);b.classList.add("fig")}})}catch(e){}}})();
/* her own figure in her palace (and in lãnh cung while she lives there) */
(function(){const r0=renderStage;renderStage=function(){r0.apply(this,arguments);try{const st=$("stage");let el=document.getElementById("mefig");const show=FIGS.length&&(S.place==="home"||(S.out&&S.place==="lc"));const src=show?figFor(S):"";if(!src){if(el)el.remove();return}if(!el){el=document.createElement("img");el.id="mefig";el.alt="";st.appendChild(el)}if(el.getAttribute("src")!==src)el.src=src}catch(e){}}})();

/* ================= PERSONALITY: one engine for every character ================= */
/* each trait = weights over the act menu + reaction rules; a person's behaviour = product of both traits' weights */
const PERS={
 "Hiểm độc":{tend:"nhẫn nại giăng bẫy, ngoài mặt thân thiện",w:{poison:3,kpoison:3,frame:2.5,kframe:2.5,plant:2.5,musk:3,catswap:2.5,pushp:2,feign:3,warn:.2,help:.4,mediate:.2,provoke:.5},dang:10,slight:1,forgive:.6,trust:.8,gift:1},
 "Kiêu ngạo":{tend:"khiêu khích, hạ nhục trước mặt người, khoe ân sủng, không chịu xin lỗi",w:{provoke:3,humiliate:3,flaunt:3,rumor:1.5,trip:1.5,help:.5,mediate:.3,apologise:.1},dang:0,slight:1.6,forgive:.6,trust:1,gift:.5,lavish:60},
 "Hiền lành":{tend:"giúp người, can ngăn, thăm người ốm, dễ bỏ qua",w:{help:3,warn:2.5,mediate:3,visit:3,apologise:2,poison:.15,kpoison:.15,frame:.2,plant:.2,musk:.15,pushp:.15,provoke:.2,humiliate:.1},dang:-15,slight:.6,forgive:2,trust:1.3,gift:1.2,harmGate:70},
 "Đa nghi":{tend:"dò xét, thử lòng, soát quà, chậm tin, nhanh ngờ",w:{spy:3,test:3,check:3,help:.6,ally:.6},dang:0,slight:1.2,forgive:.8,trust:.5,gift:.6,suspectWarn:1},
 "Tham vọng":{tend:"bám người mạnh, cướp đêm thị tẩm, bỏ đồng minh sa cơ, đút lót Kính sự phòng",w:{ally:2.5,steal:3,bribeksp:3,drop:3,block:2,accuse:1.5,bribe:1.5},dang:0,slight:1,forgive:1,trust:1,gift:1,riseGift:2},
 "Nhu mì":{tend:"tránh va chạm, theo người cầm đầu phe, dễ bị bạn mạnh xui làm",w:{follow:3,help:1.2,provoke:.2,humiliate:.1,poison:.3,frame:.4,pushed:3},dang:-10,slight:.8,forgive:1.4,trust:1.1,gift:1.1},
 /* second traits */
 "Hiếu thảo":{tend:"kính Thái hậu, giữ nề nếp",w:{serveTH:3,provoke:.7},dang:-3,slight:1,forgive:1.1,trust:1,gift:1},
 "Ghen tuông":{tend:"ghen ngay khi người khác được sủng",w:{steal:1.6,trip:1.5,rumor:1.4,block:1.5},dang:5,slight:1.2,forgive:.8,trust:1,gift:1,ghen:1.6},
 "Tham tiền":{tend:"mê bạc vàng, dễ mua chuộc",w:{bribe:1.5,flaunt:1.3},dang:0,slight:1,forgive:1,trust:1,gift:1.6},
 "Trọng nghĩa":{tend:"giữ lời, không bỏ bạn lúc hoạn nạn",w:{help:1.6,warn:1.6,drop:.1},dang:-5,slight:1,forgive:1.2,trust:1.2,gift:1},
 "Nhiều chuyện":{tend:"buôn chuyện, tin gì cũng lan",w:{rumor:2,gossip:3,spy:1.3},dang:0,slight:1,forgive:1,trust:1,gift:1},
 "Thù dai":{tend:"nhớ oán rất lâu",w:{provoke:1.2},dang:5,slight:1.4,forgive:.3,trust:.9,gift:.8},
 "Cả nể":{tend:"khó từ chối ai, dễ bị nhờ vả",w:{help:1.3,pushed:1.8,follow:1.5},dang:-3,slight:.8,forgive:1.3,trust:1.2,gift:1.1},
 "Thẳng thắn":{tend:"nói thẳng, ghét mưu ngầm",w:{feign:.2,plant:.5,frame:.6,warn:1.5,provoke:1.3},dang:0,slight:1.1,forgive:1.1,trust:1,gift:1},
 "Mê tín":{tend:"tin điềm báo, sợ bùa ngải",w:{check:1.5,pray:3},dang:0,slight:1,forgive:1,trust:1,gift:1},
 "Khéo léo":{tend:"khéo lấy lòng người trên",w:{ally:1.5,serveTH:1.5,gift:1.5},dang:0,slight:.9,forgive:1.1,trust:1,gift:1},
 /* servants */
 trung:{tend:"che chắn cho chủ, báo trước nguy",w:{warn:3,blame:3,dirty:.4},dang:-10,slight:1,forgive:1.2,trust:1.3,gift:1},
 tham:{tend:"ăn cắp, bán tin, làm việc bẩn vì bạc",w:{steal:3,sell:3,dirty:2,black:3},dang:0,slight:1,forgive:1,trust:.9,gift:1.6},
 nhat:{tend:"bị ép thì khai, nhưng không dám phản chủ",w:{confess:3,flee:2,scheme:0,dirty:.6},dang:-10,slight:1,forgive:1,trust:1,gift:1},
 lanh:{tend:"dò tin, tìm manh mối giỏi, nhưng muốn trèo cao",w:{clue:3,spy:3,leave:2},dang:0,slight:1,forgive:1,trust:1,gift:1},
 chuyen:{tend:"buôn chuyện hai chiều, mỗi tuần mang nhiều tin nhất",w:{gossip:3,rumor:2},dang:0,slight:1,forgive:1,trust:1,gift:1},
 /* the Emperor's traits drive his visits, punishments and rewards; men too */
 nongnay:{tend:"phạt nặng, sủng thất thường",w:{punish:2,reward:.8},slight:1.5,forgive:.6},nhantu:{tend:"hay khoan thứ, trọng đức",w:{punish:.5,reward:1.4,pardon:2},slight:.7,forgive:1.6},
 datinh:{tend:"thị tẩm nhiều, rải khắp",w:{visit:1.6},slight:1,forgive:1},lanhlung:{tend:"sủng lên chậm, phai chậm",w:{visit:.7},slight:1,forgive:1},chamchinh:{tend:"ít thị tẩm, trọng người bàn việc",w:{visit:.7,reward:1.1},slight:1,forgive:1},
 danghi:{tend:"dễ nghi, lời vu cáo khó gỡ",w:{punish:1.3},slight:1.2,forgive:.8},mesac:{tend:"trọng sắc",w:{visit:1.2},slight:1,forgive:1},trongtai:{tend:"trọng tài nghệ",w:{reward:1.2},slight:1,forgive:1},hieuthao:{tend:"nghe lời Thái hậu",w:{},slight:1,forgive:1}
};
const TH_TRAITS=["Hiền lành","Đa nghi","Kiêu ngạo","Hiếu thảo"];
function traitsOf(p){if(!p)return[];if(p===S)return[];if(p.kind==="emp"||p===S.emp)return S.emp.traits||[];if(p.kind==="th"||p==="th")return[S.thTrait||(S.thTrait=pick(["Hiền lành","Đa nghi","Kiêu ngạo"])),"Hiếu thảo"].slice(0,1);if(p.role==="maid"||p.role==="eun"||p.tr&&PERS[p.tr]&&!p.trait)return[p.tr,p.tr2].filter(Boolean);return[p.trait,p.trait2].filter(Boolean)}
function persW(p,act){let w=1;for(const t of traitsOf(p)){const P=PERS[t];if(P&&P.w&&P.w[act]!=null)w*=P.w[act]}return w}
function persF(p,f,def){let v=def;for(const t of traitsOf(p)){const P=PERS[t];if(P&&P[f]!=null)v=(f==="dang"?v+P[f]:v*P[f])}return v}
function tends(p){return traitsOf(p).map(t=>PERS[t]&&PERS[t].tend).filter(Boolean).join("; ")}
/* measurement: what each trait chose */
function persCount(p,act){if(!S||!p||p===S)return;S.persLog=S.persLog||{};for(const t of traitsOf(p)){const L=S.persLog[t]=S.persLog[t]||{};L[act]=(L[act]||0)+1}}
/* danger reads both traits (one rule for every head) */
function danger(v,t){const g=Math.max(t===S?(v.ghen||0)*(persF(v,"ghen",1)>1?1.15:1):0,oan(v,t),Math.max(0,-aff(v,t)));const gate=persF(v,"harmGate",0);const d=Math.round(g+persF(v,"dang",0));return gate&&g<gate?Math.min(d,29):d}
/* harm menu: the band's acts, each weighted by the doer's traits */
function npcAct(v,t){const b=bandOf(danger(v,t));if(!b)return"";const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const O=[];const add=(k,w)=>{const a=ACT[k];w*=persW(v,k);if(a&&allow.includes(k)&&a.ok(v,t)&&w>0)O.push([k,w])};
 add("accuse",6);add("vp",3);add("musk",4);add("catswap",2);for(const k of ["kpoison","pond","kframe","ksab"])add(k,2);add("takeaway",2);add("pushp",1);add("trip",3);add("frame",2);add("poison",2);add("rumor",3);add("spy",3);add("bribe",2);add("block",t.nightLog&&t.nightLog.length?2:0);
 if(allow.includes("plant")&&v.inv.some(e=>e.t||IT[e.k].il))O.push(["plant",3*persW(v,"plant")]);
 if(!O.length)return"";const w=O.map(x=>x[1]);let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}const k=O[i][0];persCount(v,k);
 if(k==="plant")return runAct(v,t,"plant",v.inv.findIndex(e=>e.t||IT[e.k].il));return runAct(v,t,k)}
/* reactions: Oán from a slight scales with the victim's traits; forgiveness (monthly fade) too; trust gains from her too */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(n>0&&x&&x!==S)n*=persF(x,"slight",1);return o0.call(this,x,y,n)}})();
(function(){const a0=affAdd;affAdd=function(x,y,n){if(n>0&&y===S&&x&&x!==S)n*=persF(x,"trust",1);return a0.call(this,x,y,Math.round(n))}})();
function oanMonth(){for(const v of rivals){const f=2*persF(v,"forgive",1);v.oan=Math.max(0,(v.oan||0)-f);for(const k in v.ro)v.ro[k]=Math.max(0,v.ro[k]-f)}for(const k in S.ro)S.ro[k]=Math.max(0,S.ro[k]-2)}
/* gifts land by trait: Kiêu ngạo shrugs at small ones, Tham vọng warms to a rising giver, Tham tiền to anything */
(function(){const g0=giftVal;giftVal=function(it,r){let v=g0.apply(this,arguments);if(r&&typeof r==="object"&&r!==S){let m=persF(r,"gift",1);const lav=persF(r,"lavish",0);if(lav&&(it.pr||0)>=lav)m=Math.max(m,1.5);if(traitsOf(r).includes("Tham vọng")&&(S.rank>=r.rank||S.sung>=r.sung))m*=2;v=Math.max(1,Math.round(v*m))}return v}})();
/* SOCIAL MENU: once a week each consort may do one non-harm deed, by her traits; the same menu toward her and toward anyone */
const SOC={
 help:{w:1,ok:(v,t)=>aff(v,t)>=10,run:(v,t)=>{relAdd(v,t,6);return `${v.name} sang giúp ${NM(t)} việc trong cung`}},
 visit:{w:0.8,ok:(v,t)=>t!==S?(t.suc<50||t.preg):(S.suc<50||S.preg),run:(v,t)=>{relAdd(v,t,5);if(t===S)apply({suc:3});return `${v.name} sang thăm ${NM(t)} lúc ốm mệt`}},
 warn:{w:0.8,ok:(v,t)=>aff(v,t)>=20&&liveRivals(true).some(x=>x!==v&&x!==t&&bandOf(danger(x,t))>=2),run:(v,t)=>{const x=liveRivals(true).find(x=>x!==v&&x!==t&&bandOf(danger(x,t))>=2);if(t===S){if(traitsOf(S).length){}S.dKnown=S.dKnown||{};S.dKnown[x.id]=wk();noteAdd(x.id,`${v.name} báo: nàng có thể hại ngươi`)}else{t.shield=Math.max(t.shield||0,1)}relAdd(v,t,4);return `${v.name} lén báo ${NM(t)} đề phòng ${x.name}`}},
 mediate:{w:0.8,ok:(v,t)=>t!==S&&oan(t,S)>=20,run:(v,t)=>{oanAdd(t,S,-10);return `${v.name} đứng ra hòa giải giữa ${t.name} và ngươi`}},
 provoke:{w:0.6,ok:(v,t)=>danger(v,t)>=10,run:(v,t)=>{oanAdd(t,v,6);if(t===S)apply({duc:0});else t.ghen=cl(t.ghen+3,0,100);ap(v,{danh:-1});return `${v.name} buông lời khiêu khích ${NM(t)}`}},
 humiliate:{w:0.5,ok:(v,t)=>danger(v,t)>=18&&rkOf(v)>=rkOf(t),run:(v,t)=>{oanAdd(t,v,10);ap(t,{danh:-2});ap(v,{danh:-1});return `${v.name} hạ nhục ${NM(t)} trước mặt cung nhân`}},
 flaunt:{w:0.5,ok:(v,t)=>v.sung>=40,run:(v,t)=>{liveRivals(true).forEach(x=>{if(x!==v)x.ghen=cl(x.ghen+2,0,100)});return `${v.name} đi khắp cung khoe quà ngự ban`}},
 spy:{w:0.6,ok:()=>true,run:(v,t)=>{evA(v,t,roll(40)?1:0);return `Người của ${v.name} dò hỏi giờ giấc của ${NM(t)}`}},
 test:{w:0.4,ok:(v,t)=>aff(v,t)>=0,run:(v,t)=>{const ok=t===S?roll(60):roll(50);affAdd(v,t,ok?3:-6);return `${v.name} thử lòng ${NM(t)}: ${ok?"tin thêm một chút":"càng ngờ vực"}`}},
 check:{w:0.4,ok:v=>v.inv.some(e=>!e.h),run:v=>{const i=v.inv.findIndex(e=>e.t);if(i>=0){v.inv.splice(i,1);return `${v.name} cho soát quà, vứt bỏ một món có độc`}return `${v.name} cho thái y soát lại quà được tặng`}},
 ally:{w:0.6,ok:(v,t)=>t!==S?t.sung>=v.sung:S.sung>=v.sung,run:(v,t)=>{relAdd(v,t,8);return `${v.name} tìm đến kết thân với ${NM(t)} đang được sủng`}},
 drop:{w:0.6,ok:(v,t)=>aff(v,t)>=30&&(t===S?S.sung<25||S.confined:t.sung<25||t.confined),run:(v,t)=>{affAdd(v,t,-20);return `${v.name} lạnh nhạt với ${NM(t)} lúc sa cơ`}},
 steal:{w:0.5,ok:(v,t)=>(t===S?S.tonight:true)&&v.sung>=20,run:(v,t)=>{ap(v,{sung:2});ap(t,{sung:-2});oanAdd(t,v,4);return `${v.name} khéo léo cướp đêm thị tẩm của ${NM(t)}`}},
 bribeksp:{w:0.4,ok:v=>v.bac>=30,run:v=>{ap(v,{bac:-30,sung:2});return `${v.name} đút lót Kính sự phòng để được lật thẻ`}},
 follow:{w:0.5,ok:v=>liveRivals(true).some(x=>x!==v&&rkOf(x)>rkOf(v)+1),run:v=>{const L=liveRivals(true).filter(x=>x!==v&&rkOf(x)>rkOf(v)+1);const x=L.sort((a,b)=>rkOf(b)-rkOf(a))[0];relAdd(v,x,6);return `${v.name} nép theo ${x.name}`}},
 feign:{w:0.5,ok:(v,t)=>danger(v,t)>=20,run:(v,t)=>{affAdd(t,v,6);return `${v.name} niềm nở với ${NM(t)}, chuyện trò thân mật`}},
 apologise:{w:0.4,ok:(v,t)=>oan(t,v)>=15,run:(v,t)=>{oanAdd(t,v,-8);return `${v.name} sang xin lỗi ${NM(t)}`}},
 serveTH:{w:0.5,ok:()=>!S.thDead,run:v=>{v.th=cl((v.th||0)+2,-100,100);return `${v.name} sớm hôm hầu hạ Thái hậu`}},
 gossip:{w:0.4,ok:()=>true,run:(v,t)=>{const x=pick(liveRivals(true).filter(y=>y!==v));if(x)ap(x,{danh:-1});return `${v.name} rỉ tai chuyện trong cung`}},
 pray:{w:0.3,ok:()=>true,run:v=>{v.pray=Math.max(v.pray||0,1);return `${v.name} lên chùa cầu khấn`}},
 idle:{w:3,ok:()=>true,run:()=>""}};
function npcSocial(v){const T=others(v);if(!T.length)return"";const t=pick(T);const O=[];for(const k in SOC){const s=SOC[k];let w=s.w*persW(v,k);if(w>0&&s.ok(v,t))O.push([k,w])}if(!O.length)return"";
 let r=Math.random()*O.reduce((a,b)=>a+b[1],0),i=0;while(r>O[i][1]&&i<O.length-1){r-=O[i][1];i++}const k=O[i][0];persCount(v,k);if(k==="idle")return"";const txt=SOC[k].run(v,t);
 if(txt)newsAdd(v,k,txt,t===S||v.id===undefined);return t===S&&txt?txt+". ":""}
/* the weekly news feed: deeds that show character; seen deeds may reveal a trait */
function newsAdd(v,k,txt,toMe){S.news=S.news||[];const seen=toMe||roll(25+(S.mat||0)*8)||(S.staff||[]).some(s=>s.tr==="chuyen"&&roll(30));if(!seen)return;S.news.unshift({w:wk(),id:v.id,k,t:txt});if(S.news.length>40)S.news.length=40;
 S.trK=S.trK||{};const T=traitsOf(v);const which=T.find(t=>PERS[t]&&PERS[t].w&&PERS[t].w[k]>1.5);if(which){const K=S.trK[v.id]=S.trK[v.id]||[];if(!K.includes(which)&&roll(35)){K.push(which);noteAdd(v.id,`Qua việc ${txt.replace(v.name+" ","")}: lộ nết ${which}`)}}}
function trKnown(v){S.trK=S.trK||{};return S.trK[v.id]||[]}
function learnTrait(v,why){const T=traitsOf(v).filter(t=>!trKnown(v).includes(t));if(!T.length)return"";const t=T[0];(S.trK[v.id]=S.trK[v.id]||[]).push(t);noteAdd(v.id,`${why}: biết nàng ${t}`);return t}
(function(){const r0=rivalsTurn;rivalsTurn=function(){let ev=r0.apply(this,arguments);try{if(S.dead)return ev;for(const v of liveRivals(true)){if(v.confined)continue;if(roll(60)){const t=npcSocial(v);if(t)ev+=t}}}catch(e){}return ev}})();
/* talking to someone, her servants' reports and watching them reveal traits */
(function(){const c0=chatMark;chatMark=function(v){const r=c0.apply(this,arguments);try{if(v&&S.chat[v.id]>=1&&roll(30))learnTrait(v,"Chuyện trò")}catch(e){}return r}})();
/* weekly news card section */
function newsHTML(){const L=(S.news||[]).filter(n=>wk()-n.w<=3);if(!L.length)return"";return `<h3>Tin trong cung tuần qua</h3><div class="pcb rows">${L.slice(0,8).map(n=>{const v=RV(n.id);return `<div class="pcrow"><span>${v?mdH(pv(v),"xs"):""} ${n.t}</span></div>`}).join("")}</div>`}
(function(){if(typeof wkSummary!=="function")return;const w0=wkSummary;wkSummary=function(){let h=w0.apply(this,arguments);try{const n=newsHTML();if(n&&typeof h==="string")h+=n}catch(e){}return h}})();
/* the dossier: traits hidden until learned, then a one-line 'tends to' */
function trLine(v){const K=trKnown(v);const T=traitsOf(v);const un=T.filter(t=>!K.includes(t)).length;return (K.length?K.map(t=>`<b>${t}</b>`).join(" · ")+(un?` <span class="past">(còn ${un} nết chưa rõ)</span>`:""):`<span class="past">chưa rõ</span>`)+(K.length?`<br><span class="past">Hay: ${K.map(t=>PERS[t]&&PERS[t].tend).filter(Boolean).join("; ")}</span>`:"")}
function trChip(v){const K=trKnown(v);return K.length?K.join(" · "):"Tính nết: chưa rõ"}
/* ================= SERVANT TRAITS: every trait has an upside and a downside; hidden at hire; firing is priced; a small monthly pool ================= */
const DIRTY=["poison","kpoison","frame","kframe","plant","musk","catswap","pushp","pond","ksab","vp","steal","takeaway","bribe"];
let ACTK=null;
(function(){const r0=runAct;runAct=function(a,t,k){const p=ACTK;ACTK=k;try{
  /* trung thành refuses (or begs against) a dishonourable order: the act does not happen */
  if(a&&k&&DIRTY.includes(k)&&!together(a,t)){const sv=bestSent(a);if(sv&&sv.tr==="trung"&&roll(30)){sv.kn=a===S?1:sv.kn;const m=`${sv.name} quỳ xin ${a===S?"nương nương":NM(a)} đừng làm việc thất đức; việc không thành. `;if(a===S)servLearn(sv,"Từ chối việc bẩn");return a===S?m:""}}
  const r=r0.apply(this,arguments);
  /* nhát gan: rivals' spies never notice him; a trail he leaves is lost */
  if(a&&k&&!together(a,t)){const sv=bestSent(a);if(sv&&sv.tr==="nhat"&&roll(35)&&t!==S&&t.evm&&t.evm[key(a)]>0)t.evm[key(a)]--}
  return r}finally{ACTK=p}}})();
function sentPen(s){if(!s)return 20;const d=ACTK&&DIRTY.includes(ACTK),ru=ACTK==="rumor";let p=15-Math.round((s.loyal-50)/10);
 if(s.tr==="lanh")p-=8;if(s.tr==="tham")p+=d?-10:3;if(s.tr==="trung")p+=d?12:-6;if(s.tr==="nhat")p+=d?6:-4;if(s.tr==="chuyen")p+=ru?-12:2;return cl(p,0,30)}
function confessRisk(s){if(!s)return 25;return cl(20+(s.tr==="nhat"?20:0)-(s.tr==="trung"?15:0)+(s.tr==="tham"?5:0)-Math.round(s.loyal/10),3,60)}
/* bribing: a greedy one is cheap to turn (15 silver), a timid one is too afraid to scheme against his mistress */
function bribeServ(a,s){const o=ownerOf(s);const cost=s.tr==="tham"?15:30;if(!o||o===a||a.bac<cost)return"";ap(a,{bac:-cost});const odds=odA(a,35+(s.tr==="tham"?25:0)-(s.tr==="nhat"?25:0)-(s.tr==="trung"?10:0)-s.loyal/3+a.tamco/5);
 if(roll(odds)){s.spyFor=key(a);return `${s.name} (người hầu của ${NM(o)}) nhận bạc của ${NM(a)}, thành tai mắt. `}s.loyal=cl(s.loyal+5,0,100);evA(o,a,1);relAdd(a,o,-5);return `${s.name} từ chối bạc của ${NM(a)} và mách chủ. `}
/* what one sees of a servant: hidden trait until learned; at hire only age, origin and a vague impression */
const ORIGINS_S=["con nhà nông ở Giang Nam","gia đình bao y kỳ tịch","con nhà buôn ở kinh thành","mồ côi, được Nội vụ phủ nuôi","con nhà thợ thêu Tô Châu","quê miền núi phía Bắc"];
const IMPR={trung:["ít nói, cúi đầu","chăm chỉ, ít cười"],tham:["mắt hay liếc đồ quý","khéo nói, nhanh tay"],nhat:["rụt rè, nói lí nhí","ít nói, cúi đầu"],lanh:["mắt sáng, nhanh nhẹn","khéo nói, nhanh tay"],chuyen:["hay cười, nói nhiều","mắt sáng, nhanh nhẹn"]};
function servMeta(s){if(!s.org)s.org=pick(ORIGINS_S);if(!s.imp)s.imp=pick(IMPR[s.tr]||["bình thường"]);return s}
function strShow(s){servMeta(s);const mine=ownerOf(s)===S;const known=s.kn||(!mine&&s.spyFor==="me");return known?STR[s.tr]:`nết chưa rõ · trông ${s.imp}`}
function servLearn(s,why){if(!s||s.kn)return;s.kn=1;log(`${why}: biết ${s.name} là người ${STR[s.tr]}.`)}
/* the household she starts with: known after the first weeks only by watching; new hires are strangers */
(function(){const m0=mkServ;mkServ=function(){const s=m0.apply(this,arguments);servMeta(s);s.kn=0;return s}})();
/* the monthly pool from Nội vụ phủ: 2-3 of each kind; rivals (higher rank first) take from it too */
function npool(){S.npool=S.npool||{maid:[],eunuch:[]};return S.npool}
function refillPool(){const P=npool();for(const r of ["maid","eunuch"]){P[r]=P[r].filter(()=>roll(50));while(P[r].length<2+R(2)&&roomFor(r))P[r].push(mkServ(r))}}
function takeFromPool(role){const P=npool();if(!P[role].length)return null;return P[role].splice(R(P[role].length),1)[0]}
/* NPC households fill from the same pool (one rule); she waits if it runs dry */
function fillStaff(p,free){const [cm,ce]=capOf(p);let m=p.staff.filter(s=>s.role==="maid").length+1,e=p.staff.filter(s=>s.role==="eunuch").length;
 const get=r=>free?mkServ(r):takeFromPool(r);
 while(m<cm&&roomFor("maid")&&(free||p.bac>=20)){const s=get("maid");if(!s)break;p.staff.push(s);m++;if(!free)ap(p,{bac:-20})}
 while(e<ce&&roomFor("eunuch")&&(free||p.bac>=20)){const s=get("eunuch");if(!s)break;p.staff.push(s);e++;if(!free)ap(p,{bac:-20})}}
/* hiring: she picks among this month's candidates (age, origin, impression only) */
function hireCard(role){const P=npool()[role];if(!P.length){Q.push({t:"Nội vụ phủ",h:`<p>Tháng này Nội vụ phủ không còn ${role==="maid"?"cung nữ":"thái giám"} nào. Tháng sau sẽ có người mới.</p>`});showModal();return}
 Q.push({t:"Nội vụ phủ đưa người",h:`<p>Người hiện có (chỉ biết tuổi, xuất thân và dáng vẻ; nết thật phải ở lâu mới biết):</p>`,opts:P.map(s=>({n:`${s.name}, ${s.age} tuổi`,fx:{bac:-20},x:`${s.org} · trông ${s.imp}`,go:()=>{const i=P.indexOf(s);if(i>=0)P.splice(i,1);S.staff.push(s);log(`Nhận ${s.name} từ Nội vụ phủ. Bạc -20.`)}})).concat([{n:"Thôi",fx:{},x:"không nhận ai"}])});showModal()}
document.addEventListener("click",e=>{const b=e.target.closest("[data-hire]");if(!b||b.disabled)return;e.stopPropagation();e.preventDefault();if(!S||S.dead||Q.length||S.bac<20)return;const [cm,ce]=capOf(S);const role=b.dataset.hire;const n=S.staff.filter(s=>s.role===role).length+(role==="maid"?1:0);if(n>=(role==="maid"?cm:ce))return;hireCard(role)},true);
/* 'Xem người': a costly look (Bạc -15, 1 khắc) reveals the trait */
document.addEventListener("click",e=>{const b=e.target.closest("[data-svlook]");if(!b||b.disabled)return;e.stopPropagation();const s=servById(+b.dataset.svlook);if(!s||S.bac<15||!can(1)||Q.length)return;apply({bac:-15});spend(1);servLearn(s,"Cho người dò xét lai lịch");render()},true);
/* FIRING: Nội vụ phủ must agree (Chắc), Bạc -20, Danh -1 (more if she fires often), a random replacement from the pool; he knows her secrets */
function fireServ(p,s,quietly){const me=p===S;const cost=20;if(p.bac<cost)return"";ap(p,{bac:-cost});p.fired=(p.fired||[]).filter(w=>wk()-w<18);p.fired.push(wk());const harsh=p.fired.length>=2;ap(p,{danh:harsh?-3:-1});
 if(!roll(80)){return me?`Nội vụ phủ chưa duyệt việc trả ${s.name} về. Bạc -${cost}. `:""}
 p.staff.splice(p.staff.indexOf(s),1);const n=takeFromPool(s.role);if(n)p.staff.push(n);
 /* he may sell what he knows: by trait, loyalty and how he was treated */
 const sell=cl(({tham:55,chuyen:40,lanh:30,nhat:12,trung:4})[s.tr]+(harsh?15:0)-Math.round(s.loyal/3)+((p.schemes||0)>0?10:0),0,90);let leak="";
 if(roll(sell)){const foes=others(p).filter(x=>x!==p&&(x===S||x.alive)&&danger(x,p)>=20);const f=foes.length?pick(foes):null;if(f){evA(f,p,1+((p.schemes||0)>2?1:0));leak=f===S?` ${s.name} tìm đến cung ngươi, kể chuyện của ${p.name}: chứng cứ +1.`:me?" Có tin hắn đã bán chuyện của ngươi cho người khác.":""}}
 if(!me&&roll(25))S.news&&newsAdd(p,"fire",`${p.name} đuổi ${s.name} khỏi cung`,false);
 return me?`Trả ${s.name} về Nội vụ phủ. Bạc -${cost}, Danh -${harsh?3:1}${harsh?" (tiếng khắc nghiệt)":""}. ${n?`Nội vụ phủ đưa ${n.name} đến thay (nết chưa rõ).`:"Nội vụ phủ chưa có người thay."}${leak} `:leak}
(function(){const s0=servAct;servAct=function(a,id){if(a==="doi"){const s=servById(id);if(!s||ownerOf(s)!==S||S.dead||Q.length||S.bac<20)return;log(fireServ(S,s));render();return}return s0.apply(this,arguments)}})();
/* trait events each month: upsides and downsides happen, and show the trait */
function servTraitMonth(){let ev="";for(const p of consorts()){for(const s of (p.staff||[]).slice()){if(s.spyFor)continue;const me=p===S;
  if(s.tr==="tham"){if(roll(10)){const n=5+R(10);ap(p,{bac:-n});if(me&&roll(40)){servLearn(s,"Bắt được ăn cắp");ev+=`${s.name} lấy trộm ${n} lượng bạc. `}}
   if(me&&roll(10)){const L=Object.keys(IT).filter(k=>IT[k].il);if(L.length){const k=pick(L);Q.push({t:"Hàng chợ đen",who:pServ(s),h:`<p>${s.name} lén mang đến <b>${IT[k].n}</b>, mua từ chợ đen ngoài cung.</p>`,opts:[{n:"Mua",fx:{bac:-Math.round((IT[k].pr||40)*.7)},x:"rẻ hơn hàng rong · đồ cấm, bị lục ra là tội",go:()=>{S.inv.push({k});servLearn(s,"Mang hàng chợ đen")}},{n:"Không mua",fx:{},x:"không dính líu"}]})}}}
  if(s.tr==="lanh"){if(me&&roll(12)){const v=pick(liveRivals(true));if(v){const t=learnTrait(v,`${s.name} dò được`);if(t){servLearn(s,"Mang tin về");ev+=`${s.name} dò được nết của ${v.name}: ${t}. `}}}
   /* ambition: if her rank has stalled a year he may ask to serve a higher palace */
   if(me&&S.turn-(S.lastPromo||0)>=12&&s.loyal<75&&roll(5)){const v=pick(liveRivals(true).filter(x=>rkOf(x)>S.rank));if(v){S.staff.splice(S.staff.indexOf(s),1);(v.staff=v.staff||[]).push(s);ev+=`${s.name} xin chuyển sang hầu ${v.name}, cung có phẩm cao hơn. `}}}
  if(s.tr==="chuyen"&&me&&roll(30)){const v=pick(liveRivals(true));if(v){if(roll(50)){const t=learnTrait(v,`${s.name} nghe đồn`);if(t)ev+=`${s.name} kể: ${v.name} là người ${t}. `}else if(roll(30)){ap(S,{danh:-1});ev+=`${s.name} lỡ miệng kể chuyện trong cung ngươi ra ngoài. Danh -1. `}}if(roll(20))servLearn(s,"Nghe chuyện nàng kể")}
  if(s.tr==="trung"&&me&&roll(8))servLearn(s,"Thấy hắn tận tụy");
  if(s.tr==="nhat"&&me&&roll(8))servLearn(s,"Thấy hắn rụt rè");
  /* rivals manage by the same rules: a harsh mistress fires low-loyalty servants */
  if(!me&&s.loyal<30&&roll(["Kiêu ngạo","Hiểm độc"].includes(p.trait)?25:8))ev+=fireServ(p,s,true)||""}}
 return ev}
/* a trung servant takes the blame when her sent man is caught, at the cost of his own life or freedom */
(function(){const c0=servCaught;servCaught=function(p,s){if(p===S){const t=(S.staff||[]).find(x=>x.tr==="trung"&&x!==s&&x.loyal>=60);if(t&&roll(40)){S.staff.splice(S.staff.indexOf(t),1);servLearn(t,"Nhận tội thay");return `${t.name} đứng ra nhận hết tội thay chủ, bị đưa vào Thận Hình ti. `}}return c0.apply(this,arguments)}})();
/* her monthly hook */
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.turn!==t0){refillPool();const ev=servTraitMonth();if(ev)log(ev);servPolicy();if(Q.length&&$("modal").hidden)showModal()}}catch(e){}return r}})();
/* for the measure only: a bot policy (window.__servPolicy = 'fire' looks at every servant and fires greedy and timid ones; 'keep' never fires) */
function servPolicy(){const pol=window.__servPolicy;if(pol!=="fire")return;for(const s of (S.staff||[]).slice()){if(!s.kn&&S.bac>=15){apply({bac:-15});s.kn=1}if(s.kn&&(s.tr==="tham"||s.tr==="nhat")&&S.bac>=20){fireServ(S,s);S.firedN=(S.firedN||0)+1}}}
(function(){const c0=servCauses;servCauses=function(){const r=c0.apply(this,arguments);try{for(const s of (S.staff||[]))if(s.cause&&s.cause.w===wk()&&roll(50))servLearn(s,`Việc ${s.cause.txt}`)}catch(e){}return r}})();
/* ================= SEAT CAPS PER RANK, PUSH-DOWN ROADS, DEMOTION REVIEW (one rule for every consort) ================= */
const SEATCAP={7:1,6:1,5:2,4:4,3:6};
function holders(r){return consorts().filter(p=>rkOf(p)===r)}
function seatFree(r){return SEATCAP[r]==null||holders(r).length<SEATCAP[r]}
function seatTxt(r){return SEATCAP[r]==null?"":`${RANKS[r].n} ${holders(r).length}/${SEATCAP[r]}`}
/* promotion into a full rank waits for a seat; the requirement row says so */
(function(){const q0=promoReqP;promoReqP=function(p){const L=q0.apply(this,arguments);const r=rkOf(p);if(r<6&&!p.out&&SEATCAP[r+1]!=null){const free=seatFree(r+1);L.push([free||!!window.__seatPick,free?`Ghế ${seatTxt(r+1)}: còn chỗ`:`Chờ ghế trống (${seatTxt(r+1)})`])}return L}})();
/* when seats are free and several qualify, the Emperor weighs them (sủng, Thái hậu, sons, danh, Hoàng hậu's word); her included */
function seatPickW(p){const q=queenP();return seatW(p)+p.sung/2+(q&&q!==p?aff(q,p)/5:0)}
function fillSeats(){let ev="";for(const r of [6,5,4,3]){if(!seatFree(r))continue;const C=consorts().filter(p=>rkOf(p)===r-1&&!p.out&&!p.confined&&promoReqP(p).every(x=>x[0]));
  if(C.length<2)continue;/* single candidate: the ordinary decree handles it */
  let n=SEATCAP[r]-holders(r).length;while(n-->0&&C.length){const tot=C.reduce((s,p)=>s+seatPickW(p),0);let x=Math.random()*tot,w=C[0];for(const p of C){x-=seatPickW(p);if(x<=0){w=p;break}}C.splice(C.indexOf(w),1);ev+=promoteP(w)||"";if(C.length)S.seatLost=(S.seatLost||[]).concat(C.includes(S)?[`${RANKS[r].n}: ${NM(w)}`]:[])}}return ev}
/* DEMOTION REVIEW: Sủng under the rank's floor for two months, or a conviction, drops one rank (and frees the seat) */
function sungFloor(r){return Math.max(0,RANKS[r].s-20)}
function demote(p,why){if(p===S){if(S.rank<=0)return"";S.rank--;S.lastPromo=S.turn;const t=`<span class="r">Ngươi ${why}, bị giáng xuống ${RANKS[S.rank].n}.</span>`;log(t);return t}
 if(p.queen){fall(p,why);return""}if(p.rank<=0)return"";p.rank--;p.lastPromo=S.turn;const t=`${p.name} ${why}, bị giáng xuống ${RANKS[p.rank].n}.`;log(t);newsAdd(p,"demote",t,true);return t}
function demoteReview(){let ev="";for(const p of consorts()){const r=rkOf(p);if(r<=0||r>=7||p.out)continue;if(p.sung<sungFloor(r))p.lowS=(p.lowS||0)+1;else p.lowS=0;
  if(p.lowS>=2){p.lowS=0;ev+=demote(p,`lâu không được sủng (Sủng ${p.sung} dưới mức ${sungFloor(r)} của ${RANKS[r].n} hai tháng)`)}
  if((p.sick||0)>0){p.sick--;ap(p,{sung:-4});if(p.sick===0&&p.suc<35)ev+=demote(p,"bệnh lâu không hầu được")}}return ev}
/* PUSH-DOWN ROADS: same odds and costs for everyone; each priced, each can be exposed */
function odT(a,base){return cl(Math.round(base+(a.tamco||0)/4),5,95)}
function hasScandal(t){return t===S?(S.men||[]).some(m=>m.trysts>0):!!t.scandal}
function realCrime(t){const w=(t.inv||[]).some(e=>e.w&&IT[e.k]&&IT[e.k].rk>rkOf(t));const il=(t.inv||[]).some(e=>e.t||(IT[e.k]&&IT[e.k].il));return w?"vượt phẩm (mặc đồ quá phẩm)":il?"giấu đồ cấm":t.schemes>0?"từng bày mưu hại người":""}
A("lygian","Ly gián",{c:{bac:-20},ok:(a,t)=>a.bac>=20&&rkOf(t)>=1,o:(a,t)=>odT(a,45-(t.duc||0)/6),x:"thành: nàng Sủng -10 · hỏng: lộ, Sủng ngươi -4",f:(a,t)=>{ap(a,{bac:-20});a.schemes=(a.schemes||0)+1;if(roll(odT(a,45-(t.duc||0)/6))){ap(t,{sung:-10});return `${NMc(a)} tung lời ly gián, ${NM(t)} bị Hoàng thượng lạnh nhạt (Sủng -10). `}const c=caught(a,t,false,"ly gián");if(c)return c;ap(a,{sung:-4});return `Lời ly gián của ${NM(a)} không ai tin. `}});
A("slowpoison","Hạ độc dần",{c:{bac:-40},ok:(a,t)=>a.bac>=40,o:(a,t)=>odT(a,35),x:"thành: nàng Sức -25, ốm 3 tháng (Sủng -4 mỗi tháng; ốm lâu bị giáng) · hỏng: dễ lộ, chứng cứ về tay nàng",f:(a,t)=>{ap(a,{bac:-40});a.schemes=(a.schemes||0)+1;if(roll(odT(a,35))){if(t===S&&(S.doctor||S.inv.some(e=>e.k==="giaidoc"))&&roll(60))return "Thuốc bổ có vị lạ; thái y kịp phát hiện độc dược ngấm dần. ";ap(t,{suc:-25});t.sick=3;return `${NM(t)} ngấm độc dần, người gầy rộc (Sức -25, ốm 3 tháng). `}const c=caught(a,t,true,"hạ độc dần");if(c)return c;return "Bát thuốc bị đổ đi, mưu không thành. "}});
A("tocao","Tố tội thật",{c:{},ok:(a,t)=>!!realCrime(t)&&evG(a,t)>=1,o:(a,t)=>odT(a,50+evG(a,t)*10),x:"cần 1 chứng cứ và nàng có tội thật · thành: nàng bị giáng một phẩm · hỏng: Danh -5",f:(a,t)=>{const o=odT(a,50+evG(a,t)*10);const cr=realCrime(t);evA(a,t,-1);if(roll(o)){ap(a,{danh:3});return `${NMc(a)} tố ${NM(t)} tội ${cr}: chứng cứ rõ ràng. `+demote(t,`bị tố ${cr}`)}ap(a,{danh:-5});return `${NMc(a)} tố ${NM(t)} nhưng không đủ chứng, bị chê nhiều chuyện (Danh -5). `}});
A("expose","Bóc chuyện tư tình",{c:{},ok:(a,t)=>hasScandal(t)&&evG(a,t)>=2,o:(a,t)=>odT(a,45+evG(a,t)*8),x:"cần 2 chứng cứ · thành: nàng bị ban chết hoặc vào lãnh cung · hỏng: ngươi bị tội vu khống",f:(a,t)=>{const o=odT(a,45+evG(a,t)*8);evA(a,t,-99);if(roll(o)){if(t===S){if(roll(50))return over("Tư thông bị phát giác","Chuyện tư tình bị phơi bày trước Hoàng thượng. Ngươi bị ban chết.","Ban chết: tư thông bại lộ")||"";cold("Ngươi tư thông bị phát giác");return "Chuyện tư tình bại lộ. "}if(roll(50)){t.alive=false;log(`${t.name} tư thông bị phát giác, bị ban chết.`);return `${t.name} tư thông bị phát giác, bị ban chết. `}fall(t,"tư thông bị phát giác");return ""}fall(a,"vu khống người khác tư thông");return ""}});
A("xinhh","Xin Hoàng hậu giáng",{c:{bac:-30},ok:(a,t)=>{const q=queenP();return a.bac>=30&&q&&q!==a&&q!==t&&aff(q,a)>=40&&rkOf(t)>=1},o:(a,t)=>{const q=queenP();return q?cl(30+aff(q,a)/2-aff(q,t)/2,5,95):5},x:"cần Hoàng hậu thân 40+ · thành: nàng bị giáng một phẩm · hỏng: Hoàng hậu bớt thân -10",f:(a,t)=>{ap(a,{bac:-30});const q=queenP();const o=cl(30+aff(q,a)/2-aff(q,t)/2,5,95);if(roll(o))return `Hoàng hậu nghe lời ${NM(a)}, tâu xin giáng ${NM(t)}. `+demote(t,"bị Hoàng hậu tâu giáng");affAdd(q,a,-10);return `Hoàng hậu gạt lời ${NM(a)} đi. `}});
/* the menus: her card groups and the NPC harm bands read the new roads */
(function(){const gi=RVGRP.findIndex(g=>g[0]==="Hại nặng");if(gi>=0)RVGRP[gi][1].push("lygian","tocao","xinhh");const gs=RVGRP.findIndex(g=>g[0]==="Sát hại");if(gs>=0)RVGRP[gs][1].push("slowpoison","expose");BANDS[2][2].push("lygian","tocao","xinhh");BANDS[3][2].push("slowpoison","expose")})();
(function(){const n0=npcAct;npcAct=function(v,t){/* rivals weigh the new roads by trait, more against the holder of the seat they want next */
  const nx=rkOf(v)+1;const want=rkOf(t)===nx&&SEATCAP[nx]!=null&&!seatFree(nx);if(want&&roll(45)){const L=["lygian","tocao","xinhh","slowpoison","expose"].filter(k=>{const b=bandOf(danger(v,t));return BANDS.slice(1,b+1).some(x=>x[2].includes(k))&&ACT[k].ok(v,t)});
   if(L.length){const w=L.map(k=>persW(v,k==="slowpoison"?"poison":k==="lygian"?"rumor":k==="xinhh"?"ally":"accuse"));let r=Math.random()*w.reduce((a,b)=>a+b),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}persCount(v,"push:"+L[i]);return runAct(v,t,L[i])}}
  return n0.apply(this,arguments)}})();
/* rivals hunt the holder of the seat they want next */
(function(){const h0=hostility;hostility=function(v,t){let h=h0.apply(this,arguments);const nx=rkOf(v)+1;if(rkOf(t)===nx&&SEATCAP[nx]!=null&&!seatFree(nx))h+=15;return h}})();
/* some rivals keep a hidden scandal (a guard, a doctor): the same road can be used against them */
(function(){const n0=newRival;newRival=function(){const v=n0.apply(this,arguments);if(v.scandal==null)v.scandal=roll(10);return v}})();
/* monthly: demotion review, then seats filled by weighing */
(function(){const e0=endTurn;endTurn=function(){const t0=S&&S.turn;const r=e0.apply(this,arguments);try{if(S&&!S.dead&&S.turn!==t0){const a=demoteReview();const b=fillSeats();palFix&&palFix()}}catch(e){}return r}})();
/* the rank board: seats used / total and who holds them */
(function(){const r0=rankBoard;rankBoard=function(){let h=r0.apply(this,arguments);const rows=[7,6,5,4,3].map(r=>{const H=holders(r).concat(r===7?[]:[]);const cap=SEATCAP[r];return `<div class="pcrow"><span>${r>=7?"Hoàng hậu":RANKS[r].n} <b>${H.length}/${cap}</b></span><span>${H.map(p=>mdH(p===S?pMe():pv(p),"xs")).join("")}${H.length<cap?' <span class="ef g">còn ghế</span>':""}</span></div>`}).join("")+`<div class="pcrow"><span>Quý nhân, Thường tại, Đáp ứng</span><span class="past">không giới hạn</span></div>`;
 return h.replace('<div class="rboard">',`<div class="rboard"><h3>Ghế theo phẩm</h3><div class="pcb rows">${rows}</div>`)}})();
/* her requirement list shows 'Đủ điều kiện · chờ ghế trống' with the holders' faces */
function seatWait(){const r=S.rank;if(r>=6||SEATCAP[r+1]==null||seatFree(r+1))return"";const rest=promoReqP(S).filter(x=>!x[0]&&!/Chờ ghế/.test(x[1]));if(rest.length)return"";return `<div class="rl"><span class="ef n">Đủ điều kiện · chờ ghế trống (${seatTxt(r+1)})</span> ${holders(r+1).map(p=>mdH(pv(p),"xs")).join("")}</div>`}
(function(){const r0=rankBoard;rankBoard=function(){const h=r0.apply(this,arguments);const w=seatWait();return w?h.replace('<h3>Ghế theo phẩm</h3>',`${w}<h3>Ghế theo phẩm</h3>`):h}})();
/* ================= FESTIVALS ON THE MAP: the festival picture on its days, a banner, and a light event for each ================= */
/* default table (game month, tuần 0-2); map-hotspots.json 'festivals' overrides it when present */
let FEST=Object.assign({"newyear": {"name": "Tết Nguyên đán", "m": 1, "t": [0], "files": {"sang": "img/map-fest-newyear-sang.webp", "chieu": "img/map-fest-newyear-chieu.webp", "toi": "img/map-fest-newyear-toi.webp"}}, "nguyentieu": {"name": "Tết Nguyên tiêu", "m": 1, "t": [1], "files": {"toi": "img/map-fest-nguyentieu-toi.webp"}}, "thanhminh": {"name": "Tiết Thanh minh", "m": 3, "t": [0], "files": {"sang": "img/map-fest-thanhminh-sang.webp"}}, "doanngo": {"name": "Tết Đoan ngọ", "m": 5, "t": [0], "files": {"sang": "img/map-fest-doanngo-trua.webp", "chieu": "img/map-fest-doanngo-trua.webp"}}, "phoenix": {"name": "Hội Phượng (thi cưỡi ngựa bắn cung)", "m": 6, "t": [0, 1, 2], "files": {"sang": "img/map-fest-phoenix-sang.webp"}}, "thattich": {"name": "Tết Thất tịch", "m": 7, "t": [0], "files": {"toi": "img/map-fest-thattich-toi.webp"}}, "trungthu": {"name": "Tết Trung thu", "m": 8, "t": [1], "files": {"sang": "img/map-fest-trungthu-sang.webp", "chieu": "img/map-fest-trungthu-chieu.webp", "toi": "img/map-fest-trungthu-toi.webp"}}, "trungcuu": {"name": "Tết Trùng cửu", "m": 9, "t": [0], "files": {"sang": "img/map-fest-trungcuu-trua.webp", "chieu": "img/map-fest-trungcuu-trua.webp"}}, "dongchi": {"name": "Tiết Đông chí", "m": 11, "t": [1], "files": {"sang": "img/map-fest-dongchi-sang.webp"}}, "giaothua": {"name": "Đêm Giao thừa", "m": 12, "t": [2], "files": {"toi": "img/map-fest-giaothua-toi.webp"}}},{vulan:{name:"Lễ Vu Lan",m:7,t:[1]},vantho:{name:"Tiết Vạn thọ",m:8,t:[2]},lapbat:{name:"Lễ Lạp bát",m:12,t:[0]}});
(function(){try{fetch("img/map-hotspots.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{const F=j&&j.festivals;if(!F)return;const N={};
 for(const k in F){const f=F[k];const m=f.month||f.m||(f.range&&f.range[0]&&f.range[0][0]);if(!m)continue;const t=f.tuan||f.t||(f.days?[...new Set(f.days.map(d=>d<=10?0:d<=20?1:2))]:f.day?[f.day<=10?0:f.day<=20?1:2]:[0]);N[k]=Object.assign({},FEST[k]||{},{name:f.name||k,m:+m})}
 if(Object.keys(N).length){Object.assign(FEST,N);if(S)render()}}).catch(()=>{})}catch(e){}})();
function festToday(){if(!S)return null;for(const k in FEST){const f=FEST[k];if(f.m===S.month&&f.t.includes(S.tuan))return Object.assign({k},f)}return null}
/* the map picture: festival variant first, then the season, then the plain buổi picture */
(function(){const m0=mapImg;mapImg=function(){const f=festToday();const b=BUK[S.buoi||0];if(f&&f.files&&f.files[b])return f.files[b];return m0.apply(this,arguments)}})();
(function(){const h0=mapHTML;mapHTML=function(){let h=h0.apply(this,arguments);const f=festToday();if(!f)return h;
 const sea=`img/map-${SEAK[SEASON[S.month-1]]||"ha"}-${BUK[S.buoi||0]}.webp`,base=`img/map-${BUK[S.buoi||0]}.webp`;
 h=h.replace(/onerror="this\.src='[^']*'"/,`onerror="if(!this.dataset.f1){this.dataset.f1=1;this.src='${sea}'}else if(!this.dataset.f2){this.dataset.f2=1;this.src='${base}'}"`);
 return h.replace('<div class="maptools">',`<div class="maptools"><span class="fest">${f.name}</span>`)}})();
/* light events for the festivals that had none (the others keep their own) */
const FESTEV={
 newyear:()=>({t:"Tết Nguyên đán",h:"<p>Sáng mồng một, lục cung vào Càn Thanh cung chúc Tết Hoàng thượng và Thái hậu.</p>",opts:[{n:"Dâng câu đối chúc Tết",fx:{},x:`${word(od(40+S.tai/2))} · thành: Sủng +4, Danh +2 · hỏng: Danh -1`,go:()=>{if(roll(od(40+S.tai/2)))apply({sung:4,danh:2});else apply({danh:-1})}},{n:"Lì xì cung nhân",fx:{bac:-20},x:"Lòng cung nữ +8, Đức +2",go:()=>apply({maid:8,duc:2})},{n:"Ở yên trong cung nghỉ ngơi",fx:{suc:10},x:"không ai để ý ngươi"}]}),
 nguyentieu:()=>({t:"Tết Nguyên tiêu",h:"<p>Đêm rằm tháng giêng, đèn lồng treo khắp ngự hoa viên, cung nhân đố đèn.</p>",opts:[{n:"Giải câu đố đèn",fx:{},x:`${word(od(35+S.tai/2+S.tamco/4))} · thành: Danh +3, Sủng +2`,go:()=>{if(roll(od(35+S.tai/2+S.tamco/4)))apply({danh:3,sung:2})}},{n:"Dạo đèn cùng một phi tần",fx:{},x:"một người thân +6",go:()=>{const v=pick(liveRivals(false));if(v)relAdd(S,v,6)}},{n:"Thả đèn cầu con",fx:{bac:-10},x:"dễ có thai thêm một tháng",go:()=>{S.fert=Math.max(S.fert||0,1)}}]}),
 thanhminh:()=>({t:"Tiết Thanh minh",h:"<p>Tiết Thanh minh, các cung tảo mộ, cúng tổ tiên.</p>",opts:[{n:"Xin về tảo mộ tổ tiên",fx:{suc:-10},x:"Đức +3, cha mẹ vui lòng",go:()=>apply({duc:3})},{n:"Cúng các phi tần bạc mệnh",fx:{bac:-10},x:"Đức +4",go:()=>apply({duc:4})},{n:"Mượn dịp dò tin",fx:{},x:`${word(od(40+S.tamco/3))} · thành: Tai mắt +1`,go:()=>{if(roll(od(40+S.tamco/3)))apply({mat:1})}}]}),
 trungthu:()=>({t:"Tết Trung thu",h:"<p>Đêm rằm tháng tám, Hoàng thượng mở yến thưởng trăng bên hồ.</p>",opts:[{n:"Hiến khúc đàn dưới trăng",fx:{suc:-5},x:`${word(od(35+artW("cam",S.arts.cam)*8))} · thành: Sủng +5 · hỏng: Danh -2`,go:()=>{if(roll(od(35+artW("cam",S.arts.cam)*8)))apply({sung:5});else apply({danh:-2})}},{n:"Dâng bánh trung thu Thái hậu",fx:{bac:-15},x:"Thái hậu +5",go:()=>apply({th:5})},{n:"Làm bánh cho các con",fx:{},x:"các con vui, Sức +5",go:()=>apply({suc:5})}]}),
 giaothua:()=>({t:"Đêm Giao thừa",h:"<p>Đêm cuối năm, cung đình đốt pháo, Hoàng thượng ban yến đón giao thừa.</p>",opts:[{n:"Thức đón giao thừa bên ngài",fx:{suc:-10},x:`${word(od(40+S.sung/2))} · thành: Sủng +4, Ân tình +2`,go:()=>{if(roll(od(40+S.sung/2))){apply({sung:4});S.an=cl((S.an||0)+2,0,100)}}},{n:"Viết câu đối mới cho cung",fx:{},x:`${word(od(35+S.tai/2))} · thành: Danh +3`,go:()=>{if(roll(od(35+S.tai/2)))apply({danh:3})}},{n:"Ngủ sớm",fx:{suc:10},x:"không ai để ý ngươi"}]}),
 phoenix:()=>({t:"Hội Phượng",h:"<p>Hội thi cưỡi ngựa bắn cung ở sân tàu ngựa phía tây, cả lục cung ra xem.</p>",opts:[{n:"Xin thử một mũi tên",fx:{suc:-10},x:`${word(od(30+S.suc/3))} · thành: Danh +4, Sủng +3 · hỏng: Danh -2`,go:()=>{if(roll(od(30+S.suc/3)))apply({danh:4,sung:3});else apply({danh:-2})}},{n:"Đặt cược tay thiện xạ",fx:{bac:-20},x:`${word(50)} · thắng: Bạc +50`,go:()=>{if(roll(50))apply({bac:50})}},{n:"Ngồi xem",fx:{},x:"không được không mất"}]}),
 lapbat:()=>({t:"Lễ Lạp bát",h:"<p>Mồng tám tháng chạp, cung nấu cháo lạp bát, ban phát cho cung nhân.</p>",opts:[{n:"Tự tay nấu cháo phát cho cung nhân",fx:{suc:-10},x:"Đức +3, Lòng cung nữ +6",go:()=>apply({duc:3,maid:6})},{n:"Dâng cháo lên Hoàng thượng",fx:{},x:`${word(60)} · thành: Sủng +3`,go:()=>{if(roll(60))apply({sung:3})}},{n:"Bỏ qua",fx:{},x:"không được không mất"}]})};
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S&&!S.dead&&!S.out){const f=festToday();const key=f&&`${S.year}-${f.k}`;if(f&&FESTEV[f.k]&&S.festDone!==key){S.festDone=key;Q.push(Object.assign({who:pEmp()},FESTEV[f.k]()));log(`${f.name}.`);if($("modal").hidden)showModal()}}}catch(e){}return r}})();
/* ================= DEATH IS PART OF THE GAME: readable deaths, the reincarnation loop, Sổ luân hồi ================= */
/* childbirth: dangerous per birth, lowered by her own physician, Y thuật and a loyal midwife; raised if a rival bribed the midwife */
function birthRisk(p){const me=p===S;const ag=p.age||20;let r=9+(p.suc<40?4:0)+Math.max(0,Math.min(ag,35)-30)*.5+Math.max(0,ag-35)*3;const why=[];
 if(p.doctor){r-=5}else why.push("không có thái y tâm phúc");if(p.arts&&p.arts.y>=2)r-=3;else if(me)why.push("Y thuật dưới bậc 2");if(p.anthai)r-=2;if(me&&S.maid&&S.maid.loyal>=70)r-=2;
 if(p.midBribe){r+=10;why.push("bà đỡ bị mua chuộc")}if(p.suc<40)why.push(`Sức chỉ ${p.suc}`);if(ag>35)why.push(`đã ${ag} tuổi`);if(me)S.birthWhy=why;return cl(r,1.5,60)}
/* a hostile rival may bribe the midwife in the last month (same rule for everyone) */
(function(){const p0=pregMonth;pregMonth=function(){try{for(const p of consorts()){const pr=p===S?S.preg:p.preg;if(pr>=8&&!p.midChk){p.midChk=1;const f=others(p).filter(x=>x!==p&&bandOf(danger(x,p))>=3&&(x===S?false:x.bac>=40));if(f.length&&roll(25)){const x=pick(f);ap(x,{bac:-40});p.midBribe=key(x);persCount(x,"midwife")}}if(!pr){p.midChk=0;p.midBribe=null}}}catch(e){}return p0.apply(this,arguments)}})();
/* every death card names the cause and the chain: who, what, how it could have been prevented */
function deathChain(fate){const L=[];const f=String(fate||"");
 if(/Khó sinh/.test(f)){const w=S.birthWhy||[];L.push(`Mỗi lần sinh nở đều có thể chết. Lần này: ${w.length?w.join(", "):"vận rủi"}.`);if(S.midBribe){const x=byKey(S.midBribe);L.push(`Bà đỡ đã nhận bạc của ${x?x.name:"kẻ giấu mặt"}.`)}L.push("Phòng được: thái y tâm phúc, học Y thuật bậc 2, giữ Sức trên 40, cung nữ trung thành đỡ đẻ.")}
 else if(/độc/.test(f)){const by=S.framedBy&&byKey(S.framedBy);L.push(by?`Kẻ ra tay: ${by.name}.`:"Kẻ ra tay chưa rõ.");L.push("Phòng được: người thử món, thuốc giải trong rương, thái y tâm phúc, cung nữ trung thành canh bếp.")}
 else if(/lãnh cung|Chết rét/.test(f)){L.push(`Vào lãnh cung vì: ${S.coldWhy||"bị phế"}.`);L.push("Phòng được: giữ chứng cứ gỡ tội, nhờ người đưa thư kêu oan, giữ Sức trước mùa đông.")}
 else if(/Ban chết/.test(f)){L.push("Mưu kế bại lộ trước Hoàng thượng.");L.push("Phòng được: sai người tin cẩn, bớt dấu vết, đợi thêm chứng cứ.")}
 else if(/Bệnh|Sức 0/.test(f)){L.push("Sức cạn dần mà không chữa.");L.push("Phòng được: mời thái y sớm, nghỉ ngơi, bớt việc nặng.")}
 else if(/tiên đế băng|Tuẫn táng|Thái phi/.test(f)){L.push("Hoàng thượng băng hà; số phận theo con trai và ngôi vị lúc ấy.")}
 const foes=liveRivals(true).filter(v=>oan(v,S)>=40||bandOf(danger(v,S))>=2).map(v=>v.name);if(foes.length)L.push(`Kẻ thù còn sống: ${foes.slice(0,4).join(", ")}.`);return L}
function lifeLog(){const p=store.get("cung-luanhoi")||[];return p}
function lifeSave(fate){const p=lifeLog();const kids=S.kids.filter(k=>k.alive).length;const maxR=Math.max(S.rank,S.maxRank||0);p.unshift({n:S.name,o:S.origin.n,r:maxR>=7?"Hoàng hậu":RANKS[maxR].n,age:S.age,y:S.year,kids,fc:S.fc||"",f:fate,foes:liveRivals(true).filter(v=>oan(v,S)>=40).map(v=>v.name).slice(0,3)});store.set("cung-luanhoi",p.slice(0,40))}
function over(h,t,fate){if(S.dead)return"";S.dead=true;S.fate=fate;record(fate);lifeSave(fate);const ms=mySons().length,md=myDaus().length;const ch=deathChain(fate);
 Q=[{t:"Kiếp này",cls:"end",who:pMe(),h:`<h3>${h}</h3><p>${t}</p>${ch.length?`<div class="pcb rows">${ch.map(x=>`<div class="pcrow"><span>${x}</span></div>`).join("")}</div>`:""}
  <div class="pcb rows"><div class="pcrow"><span>Thân phận</span><b>${S.name} · ${S.origin.n}</b></div><div class="pcrow"><span>Sống trong cung</span><b>${S.year} năm · ${S.age} tuổi</b></div><div class="pcrow"><span>Phẩm cao nhất</span><b>${Math.max(S.rank,S.maxRank||0)>=7?"Hoàng hậu":RANKS[Math.max(S.rank,S.maxRank||0)].n}</b></div><div class="pcrow"><span>Con cái</span><b>${ms} hoàng tử, ${md} công chúa</b></div><div class="pcrow"><span>Chết vì</span><b>${fate}</b></div></div>
  <p class="past">Chết là hết. Kiếp sau bắt đầu lại từ đầu, chỉ còn tên trong Sổ luân hồi.</p>`,btn:"Chuyển kiếp",onClose:start}];
 showModal();render();return""}
/* the highest rank this life reached */
(function(){const e0=endTurn;endTurn=function(){const r=e0.apply(this,arguments);try{if(S)S.maxRank=Math.max(S.maxRank||0,S.rank)}catch(e){}return r}})();
/* Sổ luân hồi on the title screen and in the log */
function pastHTML(){const p=lifeLog();if(!p.length){const o=store.get("cung-kiep")||[];return o.length?`<h3>Sổ luân hồi</h3><div class="past">`+o.map((k,i)=>`Kiếp ${o.length-i}: ${k.n}, ${k.o}, ${k.r}, ${k.age} tuổi. ${k.f}.`).join("<br>")+`</div>`:""}
 return `<h3>Sổ luân hồi</h3><div class="pcb rows">${p.slice(0,12).map((k,i)=>`<div class="pcrow"><span><span class="md xs" style="--c:#b08a5a">${k.fc?`<img src="${fsrc(k.fc,"")}" alt="" onerror="this.remove()">`:""}</span> Kiếp ${p.length-i}: <b>${k.n}</b> · ${k.o}</span><span class="past">${k.r} · ${k.y} năm · ${k.kids} con · ${k.f}</span></div>`).join("")}</div>`}
/* ================= SEASONAL THEME: tokens only on top of the kit; festivals override; effect colours unchanged ================= */
function themeTick(){if(!S)return;const sea=SEAK[SEASON[S.month-1]]||"ha";const f=festToday();const b=document.body;if(b.dataset.sea!==sea)b.dataset.sea=sea;const fk=f&&["newyear","trungthu","thattich","giaothua","nguyentieu"].includes(f.k)?f.k:"";if((b.dataset.fest||"")!==fk){if(fk)b.dataset.fest=fk;else delete b.dataset.fest}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{themeTick()}catch(e){}return r}})();
/* festival weather: gold and red sparks outdoors on Tết, Nguyên tiêu, Giao thừa; night-blue stars on Thất tịch use the fireflies */
(function(){if(typeof pxKind!=="function")return;const k0=pxKind;pxKind=function(){const k=k0.apply(this,arguments);try{const f=festToday();const P=placeOf(S.place);if(f&&["vuon","lc","home"].includes(P.sc)){if(["newyear","giaothua","nguyentieu"].includes(f.k))return "gold";if(f.k==="thattich"||f.k==="trungthu")return "fly"}}catch(e){}return k}})();
/* ================= TRANH GHẾ: an open seat is won in a three-round contest, same for every candidate ================= */
/* rounds: Tài nghệ (art + skill), Đức hạnh (Thái hậu's dilemma), Thế lực (backers); each 0-10, weighted by the Emperor's traits */
const CR=["Tài nghệ","Đức hạnh","Thế lực"];
function crW(i){return i===0?(has("trongtai")?1.5:1):i===1?(has("hieuthao")?1.5:1):(has("danghi")?.6:1)}
function ct(){return S.contest||null}
function candOK(p,r){if(p.out||p.confined||(p!==S&&!p.alive))return false;if(rkOf(p)!==r-1)return false;const req=promoReqP(p).filter(x=>!/Chờ ghế|Ghế |bỏ trống/.test(x[1]));if(r===7)return req.filter(x=>!/Cách lần/.test(x[1])).every(x=>x[0])&&(p.th||0)>=40;return req.every(x=>x[0])}
/* a seat opens: decree and candidate list */
function contestOpen(r){if(ct())return"";const C=consorts().filter(p=>candOK(p,r));if(!C.length)return"";if(C.length===1&&C[0]!==S){return promoteP(C[0])||""}
 const len=r===7?3:1;S.contest={r,c:C.map(key),t0:wk(),len,round:0,sc:{},bk:{},pr:{},sab:{},dq:[],hint:0};
 const t=`Khuyết ghế ${r>=7?"Hoàng hậu":RANKS[r].n}; trong ${r===7?"một tháng":"hai tuần"} sẽ chọn người.`;log(`<b>${t}</b> Ứng viên: ${C.map(p=>p===S?"ngươi":p.name).join(", ")}.`);
 if(!quiet&&C.includes(S))Q.push({t:"Tranh ghế",who:pEmp(),h:`<p>${t}</p><p>Ba vòng: <b>Tài nghệ</b> trước Hoàng thượng, <b>Đức hạnh</b> trước Thái hậu, <b>Thế lực</b> (ai đứng sau ngươi).${has("trongtai")?" Ngài trọng tài nghệ (vòng 1 ×1,5).":""}${has("hieuthao")?" Ngài hiếu thảo (vòng 2 ×1,5).":""}${has("danghi")?" Ngài đa nghi (vòng 3 ×0,6).":""}</p><div class="pcb rows">${C.map(p=>`<div class="pcrow"><span>${mdH(p===S?pMe():pv(p),"xs")} ${p===S?"Ngươi":p.name}</span><b>${p===S?RANKS[S.rank].n:RANKS[p.rank].n}</b></div>`).join("")}</div><p class="past">Giữa các vòng: luyện tập, vận động, hoặc ra tay với đối thủ (bị lộ là bị loại và bị phạt).</p>`});return ""}
/* scoring, one formula for all */
function bestArtOf(p){const A=p.arts||{};return ["cam","ky","thi","hoa","vu"].sort((a,b)=>(A[b]||0)-(A[a]||0))[0]}
function tScore(p,art,mini){const g=(p.arts||{})[art]||0;const base=Math.min(10,g*1.6+(mini!=null?mini*1.5:R(4)*1.2)+((ct().pr[key(p)]||0)*1.5)-((ct().sab[key(p)]||0)*2)+((p.suc||60)<40?-2:0));return cl(Math.round(base),0,10)}
const DILEMMAS=[["Hai cung nữ cãi nhau, một người làm vỡ chén ngọc của Thái hậu rồi đổ cho người kia. Ngươi xử thế nào?",[["nhan","Tha cả hai, tự bỏ bạc đền chén"],["le","Phạt đúng người, giữ phép cung"],["tri","Lặng lẽ tra hỏi cho ra kẻ nói dối"]]],
 ["Một phi tần ốm nặng mà Hoàng thượng triệu ngươi thị tẩm. Ngươi làm gì?",[["nhan","Xin nhường đêm ấy, sang thăm nàng"],["le","Vâng chỉ, rồi sai người mang thuốc sang"],["tri","Tâu xin Hoàng thượng ghé thăm nàng trước"]]],
 ["Nhà mẹ đẻ xin ngươi nói giúp một chức quan. Ngươi đáp sao?",[["le","Từ chối, hậu cung không bàn chính sự"],["nhan","Gửi bạc riêng giúp nhà, không xin chức"],["tri","Chỉ người có tài thì mới tiến cử"]]]];
function judgeVirtue(){const th=traitsOf("th")[0];const e=S.emp.traits;if(e.includes("nhantu")||e.includes("hieuthao")||th==="Hiền lành")return"nhan";if(e.includes("danghi")||e.includes("chamchinh")||th==="Đa nghi")return"tri";return"le"}
function dScore(p,v){const b=judgeVirtue();const m=v===b?6:3;return cl(Math.round(m+(p.duc||0)/25+(p.tamco||0)/30),0,10)}
function backers(p){const L=[];const q=queenP();if(q&&q!==p&&aff(q,p)>=30)L.push("Hoàng hậu");if((p.th||0)>=50&&!S.thDead)L.push("Thái hậu");const f=facOf(p);if(f)L.push(`phe ${f.name} (${facMembers(f).length})`);if((p.dad||(p===S?S.origin.dad:0)||40)>=60)L.push("nhà mẹ đẻ quyền thế");for(const x of (ct().bk[key(p)]||[]))L.push(x);return L}
function fScore(p){const L=backers(p);let n=0;for(const b of L)n+=/^phe/.test(b)?Math.min(4,1+(+(b.match(/\d+/)||[1])[0])/2):2;return cl(Math.round(n),0,10)}
/* between rounds: each candidate acts (practise, lobby, scheme); her choice is a card, theirs by traits */
function npcContestAct(p){const c=ct();const R2=c.c.map(byKey).filter(x=>x&&x!==p&&!c.dq.includes(key(x)));const k=key(p);
 const w={pr:2,lo:2,sc:R2.length?.6*persW(p,"poison")*persW(p,"frame"):0};const tot=w.pr+w.lo+w.sc;let r=Math.random()*tot;
 if((r-=w.pr)<0){c.pr[k]=(c.pr[k]||0)+1;return}if((r-=w.lo)<0){if(p.bac>=30&&roll(55)){ap(p,{bac:-30});(c.bk[k]=c.bk[k]||[]).push(pick(["một vị thượng thư","Tổng quản thái giám","một vị vương phi"]))}return}
 const t=R2.sort((a,b)=>(a===S?-1:0)-(b===S?-1:0))[0];sabotage(p,t)}
function sabotage(a,t){const c=ct();const o=cl(40+(a.tamco||0)/4-(t===S&&S.maid&&S.maid.loyal>=70?10:0),5,90);persCount(a,"contest:scheme");
 if(roll(o)){c.sab[key(t)]=(c.sab[key(t)]||0)+1;const m=t===S?`Đàn của ngươi bị cắt dây trước buổi diễn (vòng sau -2).`:`${a===S?"Ngươi":a.name} phá ${t.name}: vòng sau nàng -2.`;if(t===S||a===S)log(m);return m}
 if(roll(50)){c.dq.push(key(a));ap(a,{danh:-6,sung:-8});const m=`${a===S?"Ngươi":a.name} ra tay với ${NM(t)} bị bắt quả tang: bị loại khỏi cuộc tranh ghế, Danh -6, Sủng -8.`;log(m);return m}return `${a===S?"Ngươi":a.name} định ra tay nhưng không thành.`}
function myBetween(){if(quiet)return;const c=ct();const R2=c.c.map(byKey).filter(x=>x&&x!==S&&!c.dq.includes(key(x)));const top=R2.sort((a,b)=>(b.sung||0)-(a.sung||0))[0];
 Q.push({t:"Tranh ghế: giữa các vòng",who:pMe(),h:`<p>Còn ${3-c.round} vòng. Ngươi dùng mấy ngày này thế nào?</p>${scoreTable()}`,opts:[{n:"Luyện tập",fx:{suc:-10},x:"vòng Tài nghệ +1,5",go:()=>{c.pr.me=(c.pr.me||0)+1}},{n:"Vận động người đỡ đầu",fx:{bac:-30},x:`${word(55)} · thành: thêm một người đứng sau (Thế lực +2)`,go:()=>{if(roll(55))(c.bk.me=c.bk.me||[]).push(pick(["một vị thượng thư","Tổng quản thái giám","một vị vương phi"]))}},top?{n:`Ra tay với ${top.name}`,fx:{},x:`${word(cl(40+S.tamco/4,5,90))} · thành: nàng -2 điểm · hỏng: có thể bị loại, Danh -6, Sủng -8`,go:()=>sabotage(S,top)}:null].filter(Boolean)})}
/* talking to the Emperor or the Thái hậu during a contest shows which answer they prize */
(function(){const t1=talk;talk=function(oi){const p=S&&curPeople()[popIdx];const r=t1.apply(this,arguments);try{if(ct()&&p&&(p.kind==="emp"||p.kind==="th")&&!ct().hint){ct().hint=1;log(`Qua chuyện trò, ngươi đoán được ${p.kind==="emp"?"Hoàng thượng":"Thái hậu"} trọng ${({nhan:"lòng nhân",le:"lễ phép",tri:"sự sáng suốt"})[judgeVirtue()]}.`)}}catch(e){}return r}})();
function scoreTable(){const c=ct();if(!c)return"";return `<div class="pcb rows">${c.c.map(byKey).filter(Boolean).map(p=>{const s=c.sc[key(p)]||[];const tot=s.reduce((a,b,i)=>a+b*crW(i),0);return `<div class="pcrow"><span>${mdH(p===S?pMe():pv(p),"xs")} ${p===S?"Ngươi":p.name}${c.dq.includes(key(p))?' <span class="ef r">bị loại</span>':""}</span><b>${s.map((x,i)=>`${CR[i][0]}${x}`).join(" · ")||"-"}${s.length?` = ${Math.round(tot*10)/10}`:""}</b></div>`}).join("")}</div>`}
function runRound(){const c=ct();const i=c.round;const C=c.c.map(byKey).filter(p=>p&&(p===S||p.alive)&&!c.dq.includes(key(p)));
 for(const p of C){if(p===S)continue;const s=c.sc[key(p)]=c.sc[key(p)]||[];s[i]=i===0?tScore(p,bestArtOf(p)):i===1?dScore(p,roll(40+(p.tamco||0)/2)?judgeVirtue():pick(["nhan","le","tri"])):fScore(p)}
 if(C.includes(S)){const s=c.sc.me=c.sc.me||[];
  if(i===0){const arts=["cam","ky","thi","hoa","vu"].sort((a,b)=>(S.arts[b]||0)-(S.arts[a]||0));if(quiet){s[0]=tScore(S,arts[0]);}else Q.push({t:"Vòng 1: Tài nghệ",who:pEmp(),h:`<p>Trước Hoàng thượng, ngươi trình diễn môn nào?</p>`,opts:arts.map(a=>({n:(ARTS.find(x=>x.k===a)||{n:a}).n,fx:{},x:`bậc ${S.arts[a]||0} · điểm = bậc + màn diễn${(c.pr.me||0)?` + luyện tập ${c.pr.me}`:""}`,go:()=>{const done=g=>{s[0]=tScore(S,a,Math.min(3,g));log(`Vòng Tài nghệ: ngươi được ${s[0]}/10.`);};if(window.__bot||typeof openMG!=="function")done(R(4));else openMG(a,S.arts[a]||0,g=>done(g))}}))});}
  else if(i===1){const D=pick(DILEMMAS);const hint=c.hint?`<p class="past">Ngươi đoán người xét trọng ${({nhan:"lòng nhân",le:"lễ phép",tri:"sự sáng suốt"})[judgeVirtue()]}.</p>`:`<p class="past">Chưa rõ người xét trọng điều gì (chuyện trò với Hoàng thượng hoặc Thái hậu trước để đoán).</p>`;
   if(quiet)s[1]=dScore(S,pick(["nhan","le","tri"]));else Q.push({t:"Vòng 2: Đức hạnh",who:pTH(),h:`<p>${D[0]}</p>${hint}`,opts:D[1].map(([v,n])=>({n,fx:{},x:`điểm theo ý người xét + Đức ${S.duc}, Tâm cơ ${S.tamco}`,go:()=>{s[1]=dScore(S,v);log(`Vòng Đức hạnh: ngươi được ${s[1]}/10.`)}}))})}
  else{s[2]=fScore(S);log(`Vòng Thế lực: ${backers(S).join(", ")||"không ai"} đứng sau ngươi: ${s[2]}/10.`)}}
 c.round++}
function contestEnd(){const c=ct();const C=c.c.map(byKey).filter(p=>p&&(p===S||p.alive)&&!p.out&&!c.dq.includes(key(p))&&rkOf(p)===c.r-1);S.contest=null;if(!C.length)return"";
 const tot=p=>(c.sc[key(p)]||[]).reduce((a,b,i)=>a+(b||0)*crW(i),0);C.sort((a,b)=>tot(b)-tot(a)||(b.sung||0)-(a.sung||0));const w=C[0];
 let res;if(c.r===7){if(w===S){S.rank=7;S.justCrowned=1;S.lastPromo=S.turn;ghenAll(10)}else{w.rank=6;w.queen=true;rivals.splice(rivals.indexOf(w),1);rivals.unshift(w)}w.lastPromo=S.turn;res=`${w===S?"Ngươi":w.name} được lập làm Hoàng hậu`}else{window.__seatPick=1;try{res=promoteP(w)}finally{window.__seatPick=0}if(!res){if(w===S){S.rank++;S.lastPromo=S.turn}else{w.rank++;w.lastPromo=S.turn}}res=`${w===S?"Ngươi":w.name} được phong ${RANKS[Math.min(6,rkOf(w))].n}`}
 for(const p of C.slice(1)){oanAdd(p,w,10);if(p!==S&&w===S)p.ghen=cl(p.ghen+10,0,100)}
 const txt=`<b>Tranh ghế xong: ${res}.</b>`;log(txt);if(!quiet&&c.c.includes("me"))Q.push({t:"Kết quả tranh ghế",who:w===S?pMe():pv(w),h:`<p>${res}.</p>${(()=>{S.contest=c;const h=scoreTable();S.contest=null;return h})()}<p class="past">Người thua thêm Oán với người thắng (+10)${w===S?"; các phi tần ghen thêm":""}.</p>`});return txt}
/* weekly driver: one round per tuần (Hoàng hậu seat: one per month), acts between */
function contestWeek(){const c=ct();if(!c)return;if(!c.c.map(byKey).some(p=>p&&(p===S||p.alive)))return void(S.contest=null);const gap=c.len;if((wk()-c.t0)%gap!==0||wk()===c.t0)return;
 if(c.round<3){for(const k of c.c){const p=byKey(k);if(p&&p!==S&&p.alive&&!c.dq.includes(k))npcContestAct(p)}runRound();if(c.round<3&&c.c.includes("me")&&!c.dq.includes("me"))myBetween();if(c.round>=3)contestEnd()}else contestEnd()}
/* seats open → contest instead of a weighted pick; the old Hoàng hậu pick is replaced too */
function fillSeats(){let ev="";if(ct())return"";for(const r of [6,5,4,3]){if(!seatFree(r))continue;const C=consorts().filter(p=>candOK(p,r));if(C.length>=2||(C.length===1&&C[0]===S&&false)){ev+=contestOpen(r);break}}return ev}
(function(){const r0=rivalsTurn;rivalsTurn=function(){window.__noOldSeat=1;let ev="";try{ev=r0.apply(this,arguments)}finally{window.__noOldSeat=0}try{if(!S.dead){if(!queenP()&&!ct()){if(S.vacSince==null)S.vacSince=S.turn;if(S.turn-S.vacSince>=3)ev+=contestOpen(7);if(!ct()&&S.turn-S.vacSince>=18&&roomFor("consort")&&roll(10)){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);ev+=`<b>Thánh chỉ: rước ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b> `}}contestWeek()}}catch(e){}return ev}})();
/* while a seat is contested, nobody walks into it by plain decree */
(function(){const q0=promoReqP;promoReqP=function(p){const L=q0.apply(this,arguments);const c=ct();const r=rkOf(p)+1;if(c&&c.r===r&&!window.__seatPick)L.push([false,`Đang tranh ghế ${r>=7?"Hoàng hậu":RANKS[r].n} (vòng ${Math.min(3,c.round+1)}/3)`]);return L}})();
/* the contest card stays reachable from the rank board */
(function(){const r0=rankBoard;rankBoard=function(){const h=r0.apply(this,arguments);const c=ct();if(!c)return h;return h.replace('<div class="rboard">',`<div class="rboard"><h3>Tranh ghế ${c.r>=7?"Hoàng hậu":RANKS[c.r].n} · vòng ${Math.min(3,c.round+1)}/3</h3>${scoreTable()}`)}})();
/* ================= ONE IDENTITY FOR LIFE, FOUR AGE BANDS FOR ALL, SMALL AGE EFFECTS ================= */
/* bands for every group: 18-25 / 26-35 / 36-50 / 51+ */
function band4(a){return a>=51?3:a>=36?2:a>=26?1:0}
const BAND4N=["18-25","26-35","36-50","51+"];
function tagBand(x){const s=String(x==null?"":x).toLowerCase();const m=s.match(/\d+/);if(m)return band4(+m[0]);return /old|lao|51/.test(s)?3:/mid|trung|36/.test(s)?2:/adult|26/.test(s)?1:0}
/* faces stay for life: once drawn, kept across promotions and ageing (children still grow) */
(function(){const ff=faceFor;faceFor=function(o,kind,age){if(o&&o.fc&&o.fcKeep)return;const r=ff.apply(this,arguments);if(o&&o.fc)o.fcKeep=1;return r}})();
/* figures: each person gets one identity and keeps it; no two people in one game ever share one (a dead woman's identity is not reused until a new game) */
const LOOKFOR={"Hiểm độc":["hienlanh","gentle","diu","numi"],"Kiêu ngạo":["kieungao","proud"],"Hiền lành":["hienlanh","gentle"],"Đa nghi":["danghi","cool"],"Tham vọng":["thamvong","bold"],"Nhu mì":["numi","soft","hienlanh"]};
function idsFor(role){const m={};for(const f of FIGS)if(norm(f.role)===norm(role)&&f.identity!=null)m[f.identity]=m[f.identity]||[],m[f.identity].push(f);return m}
function identityOf(p,role){const who=p.ref||p;if(who.idn!=null)return who.idn;const M=idsFor(role);const ids=Object.keys(M);if(!ids.length)return null;
 const used=new Set([S].concat(rivals||[]).filter(x=>x&&x!==who&&(x===S||x.alive)&&x.idn!=null).map(x=>String(x.idn)));if(S.emp&&S.emp.idn!=null)used.add(String(S.emp.idn));
 S.idUsed=S.idUsed||{};const U=S.idUsed[role]=S.idUsed[role]||[];let free=ids.filter(i=>!used.has(String(i))&&!U.includes(String(i)));if(!free.length)return null;const want=LOOKFOR[who.trait]||[];const fit=free.filter(i=>M[i].some(f=>want.includes(norm(f.look))));if(fit.length)free=fit;who.idn=pick(free);U.push(String(who.idn));return who.idn}
(function(){const f0=figFor;figFor=function(p,kind){if(!FIGS.length||!p)return"";const role=figRole(p),who=p.ref||p;const idn=identityOf(who===S.emp?{ref:S.emp,trait:""}:who,role);if(idn==null)return f0.apply(this,arguments);
 const tier=who===S?(S.out?0:S.rank):who.queen?7:(who.rank||0);const ab=band4(who.age||20);const isPor=f=>/(^|\/)por-/.test(f.file||f.src);
 const L=FIGS.filter(f=>String(f.identity)===String(idn)&&norm(f.role)===norm(role)&&(kind==="por"?isPor(f):!isPor(f)));if(!L.length)return f0.apply(this,arguments);
 const tn=f=>{const t=+String(f.tier).replace(/\D/g,"");return isNaN(t)?0:t};const sc=f=>Math.abs(tn(f)-tier)+Math.abs(tagBand(f.ageBand)-ab)*1.5;L.sort((a,b)=>sc(a)-sc(b));const src=L[0].file||L[0].src;return /^img\//.test(src)?src:"img/"+src}})();
/* age effects, the same for everyone: Sắc -1 a year after 30 (soft floor 35), Tâm cơ +1 a year of court life up to +10 */
(function(){const a0=ageYear;ageYear=function(){S.age=S.age||18;const r=a0.apply(this,arguments);try{for(const p of [S].concat(rivals||[])){if(p!==S&&!p.alive)continue;const ag=p===S?S.age:p.age;if(ag>30&&(p.sac||0)>35){p.sac--;p.sacAge=(p.sacAge||0)+1}if((p.tcAge||0)<10){p.tamco=(p.tamco||0)+1;p.tcAge=(p.tcAge||0)+1}}}catch(e){}return r}})();
function ageLine(p){const ag=p===S?S.age:p.age;const b=[];if(p.sacAge)b.push(`Sắc -${p.sacAge} (tuổi)`);if(p.tcAge)b.push(`Tâm cơ +${p.tcAge} (từng trải)`);const ag2=ag>35?`sinh nở thêm nguy (${Math.round((ag-35)*3)})`:"";const il=ag>50?"dễ ốm hơn":"";return `Tuổi <b>${ag}</b> · ${BAND4N[band4(ag)]}${b.length?" · "+b.join(", "):""}${ag2?" · "+ag2:""}${il?" · "+il:""}`}
function tuoi(n){return n>0?`Tuổi <b>${n}</b> <span class="past">(${BAND4N[band4(n)]})</span>`:""}
/* the Emperor who loves beauty weighs youth */
(function(){const n0=nightCh;nightCh=function(p){const c=n0.apply(this,arguments);if(!c||!has("mesac"))return c;const ag=(p||S)===S?S.age:p.age;return Math.round(c*(ag<=25?1.15:ag>35?.8:1))}})();
/* illness rises after 50 */
(function(){const i0=illMonthP;illMonthP=function(p){let ev=i0.apply(this,arguments);try{const ag=p===S?S.age:p.age;if(ag>50&&!illOf(p)&&roll((ag-50)*.5))ev+=catchIll(p,pick(["lao","phonghan"]))||""}catch(e){}return ev}})();
/* after a birth the body rests: six months of ở cữ and nursing before she can conceive again (everyone alike) */
(function(){const b0=birthP;birthP=function(p,fake){if(!fake)p.lastBirth=S.turn;return b0.apply(this,arguments)}})();
(function(){const c0=conceiveCh;conceiveCh=function(p){p=p||S;if(p.lastBirth!=null&&S.turn-p.lastBirth<6)return 0;return Math.round(c0.apply(this,arguments)*.7)}})();
/* ================= VOICES: short human sounds on cards, by speaker and moment; one at a time, 6 s cooldown per key ================= */
const VOK=["f-laugh","f-softlaugh","f-cry","f-angry","f-gasp","f-sigh","old-hmph","m-chuckle","m-grunt","m-sigh","baby-cry","child-giggle","gossip","crowd-gasp"];
let VOX={};/* key -> [files]; from audio/VOICES.json when present, else audio/vo-<key>-1.mp3 / -2.mp3 */
(function(){try{fetch("audio/VOICES.json",{cache:"no-cache"}).then(r=>r.ok?r.json():null).then(j=>{if(!j)return;const L=Array.isArray(j)?j:j.voices||j.files||null;
 if(L){for(const x of L){const f=x.file||x.src;const k=x.key||x.id||x.name;if(f&&k)(VOX[k]=VOX[k]||[]).push(f)}}else for(const k in j){const v=j[k];if(Array.isArray(v))VOX[k]=v.map(x=>typeof x==="string"?x:x.file||x.src).filter(Boolean);else if(v&&(v.files||v.variants))VOX[k]=(v.files||v.variants)}}).catch(()=>{})}catch(e){}})();
const VOALIAS={"f-softlaugh":"f-laugh-soft","old-hmph":"old-f-hmph","m-chuckle":"m-laugh","m-grunt":"m-angry","child-giggle":"child-laugh","gossip":"crowd-gossip"};
function voFiles(k){k=VOX[k]?k:(VOALIAS[k]||k);const L=VOX[k];if(L&&L.length)return L.map(f=>/^audio\//.test(f)?f:"audio/"+f);return [1,2].map(n=>`audio/vo-${k}-${n}.mp3`)}
const VO={cur:null,last:{}};
function voice(k,force){try{if(!auOk()&&!force)return;if(!force&&Date.now()-(VO.last[k]||0)<6000)return;VO.last[k]=Date.now();const vol=OPT.vo==null?.7:OPT.vo;if(!vol)return;
 if(VO.cur){try{VO.cur.pause()}catch(e){}}const a=new Audio(pick(voFiles(k)));a.volume=vol;VO.cur=a;a.addEventListener("error",()=>{if(VO.cur===a)VO.cur=null});
 AU.duck=.6;if(AU.cur)AU.cur.volume=musVol();a.addEventListener("ended",()=>{AU.duck=1;if(AU.cur)AU.cur.volume=musVol();if(VO.cur===a)VO.cur=null});const p=a.play();if(p&&p.catch)p.catch(()=>{})}catch(e){}}
/* which voice a card calls for: the speaker (sex, age) and the moment */
function voKind(m){const w=m.who||{};const k=(w.w||[])[0];const txt=String((m.t||"")+" "+(m.h||"")).replace(/<[^>]+>/g," ");
 const emp=k==="e"||/Hoàng thượng/.test(m.t||"");const th=w.rk==="th"||/Thái hậu/.test(m.t||"");
 if(/chào đời|hạ sinh|sinh hạ|Sinh hoàng|sinh công chúa/.test(txt))return"baby-cry";
 if(/các con|hoàng tử nhỏ|công chúa nhỏ/.test(txt)&&/chơi|sang|vui/.test(txt))return"child-giggle";
 if(/băng hà|ban chết|bại lộ|có độc|trúng độc|sảy|chết/.test(txt))return/trước mặt|cả hậu cung|yến/.test(txt)?"crowd-gasp":"f-gasp";
 if(/tin đồn|đồn rằng|rỉ tai|buôn chuyện/.test(txt))return"gossip";
 if(emp){if(/phật ý|cau mày|nổi giận|quở|trách|đuổi/.test(txt))return"m-grunt";if(/vui|cười|ban thưởng|hài lòng|khen/.test(txt))return"m-chuckle";if(/thở dài|buồn|lo/.test(txt))return"m-sigh";return null}
 if(th){if(/không vui|phật ý|trách|chau mày|lạnh lùng/.test(txt))return"old-hmph";return null}
 if(/bị phạt|giáng|quỳ|đánh|trách phạt|lãnh cung|khóc/.test(txt))return"f-cry";
 if(/mỉa mai|khiêu khích|hạ nhục|giận/.test(txt))return"f-angry";
 if(/tặng|nhận lời|tươi cười|vui lòng|cảm tạ|kết làm chị em/.test(txt))return /e lệ|khẽ/.test(txt)?"f-softlaugh":"f-laugh";
 if(/thở dài|buồn|ốm/.test(txt))return"f-sigh";return null}
(function(){const s0=showModal;showModal=function(){const r=s0.apply(this,arguments);try{const m=Q[0];if(m&&m!==VO.lastCard){VO.lastCard=m;const k=voKind(m);if(k)voice(k)}}catch(e){}return r}})();

(function(){try{var m=new Date().getMonth();var se=["xuan","xuan","xuan","ha","ha","ha","thu","thu","thu","dong","dong","dong"][m];var h=new Date().getHours();var b=h<11?"sang":h<18?"chieu":"toi";var t=document.getElementById("title");if(t)t.style.setProperty("background","linear-gradient(rgba(40,18,10,.15),rgba(40,18,10,.35)),url(img/map-"+se+"-"+b+".webp) center/cover no-repeat","important")}catch(e){}})();
/* ================= THE MAP TAB, FULL SCREEN: the plan fills all between the top bar and the tab bar ================= */
/* people present show as anonymous silhouettes with a count (hữu duyên: who is there is learned only by going); residents are named inside the palace screen */
const SILH=`<svg viewBox="0 0 10 14" aria-hidden="true"><circle cx="5" cy="3" r="2.4"/><path d="M1 14c0-4.4 1.6-7.2 4-7.2s4 2.8 4 7.2z"/></svg>`;
function silChip(n){if(!n)return"";const k=Math.min(n,3);return `<span class="msil" aria-label="${n} bóng người">${SILH.repeat(k)}${n>1?`<b>${n}</b>`:""}</span>`}
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{/* drop the faces of residents and the names in the hover title; add the silhouettes */
  h=h.replace(/<span class="mfaces">[\s\S]*?<\/span><\/button>/g,"</button>");
  h=h.replace(/ · ở: [^"]*"/g,'"');
  h=h.replace(/(<button class="mspot[^"]*" data-go="([^"]+)"[^>]*>)/g,(all,open,k)=>{const n=countAt(k);return open+(n?silChip(n):"")});
  h=h.replace(/<span class="mleg">[^<]*<\/span>/,'<span class="mleg">đi gần 1 khắc, xa 2 · bóng: người đang có mặt</span>');}catch(e){}
 return h}})();
/* the layout switch */
(function(){const r0=renderPanel0;renderPanel0=function(){const r=r0.apply(this,arguments);try{const gm=document.querySelector(".game");if(gm)gm.classList.toggle("maptab",tab==="go"&&!window.__mapList)}catch(e){}return r}})();
/* the plan always covers the screen: the smallest zoom fills the height as well as the width */
function mapFit(){try{const sc=document.querySelector(".game.maptab .mapsc");if(!sc)return;const w=sc.querySelector(".mapw"),img=sc.querySelector(".mapimg");if(!w)return;
 const asp=img&&img.naturalWidth?img.naturalWidth/img.naturalHeight:1.792;const fit=Math.max(1,(sc.clientHeight/Math.max(1,sc.clientWidth))*asp);
 const z=Math.max(fit,window.__mapZ||fit);w.style.width=(z*100)+"%";window.__mapFit=fit;
 const key=S.place+"|"+z.toFixed(2)+"|"+sc.clientWidth;if(window.__mapKey2===key&&window.__mapPos2){sc.scrollLeft=window.__mapPos2[0];sc.scrollTop=window.__mapPos2[1]}
 else{const h=sc.querySelector(".mspot.here")||sc.querySelector('[data-go="home"]')||sc.querySelector('[data-go="'+(S.pal!=null?palaceOf(S):"home")+'"]');if(h){sc.scrollLeft=h.offsetLeft+h.offsetWidth/2-sc.clientWidth/2;sc.scrollTop=h.offsetTop+h.offsetHeight/2-sc.clientHeight/2}window.__mapKey2=key}
 if(!sc.dataset.sv){sc.dataset.sv=1;sc.addEventListener("scroll",()=>{window.__mapPos2=[sc.scrollLeft,sc.scrollTop]},{passive:true})}}catch(e){}}
(function(){const r0=render;render=function(){const r=r0.apply(this,arguments);try{if(tab==="go"&&!window.__mapList){mapFit();const img=document.querySelector(".mapsc .mapimg");if(img&&!img.complete)img.addEventListener("load",mapFit,{once:true})}}catch(e){}return r}})();
addEventListener("resize",()=>{try{if(S&&tab==="go")mapFit()}catch(e){}});
/* zoom buttons: the floor is the fitted size, not 1 */
document.addEventListener("click",e=>{const z=e.target.closest(".game.maptab [data-mapz]");if(!z)return;e.stopImmediatePropagation();e.preventDefault();const f=window.__mapFit||1;window.__mapZ=cl((window.__mapZ||f)+(+z.dataset.mapz)*.5,f,f+2.5);render()},true);
/* tapping a place opens the place screen; the floating 'Bản đồ' button there goes back to the full map */
(function(){const g=goTo;goTo=function(k){const wasMap=typeof tab!=="undefined"&&tab==="go";const r=g.apply(this,arguments);try{if(wasMap&&S&&!S.dead&&S.place===k){window.__fromMap=1;tab="act";render()}}catch(e){}return r}})();
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{const st=$("stage");let b=document.getElementById("tomap");const show=window.__fromMap&&tab!=="go"&&!S.out;if(!show){if(b)b.remove();return r}
 if(!b){b=document.createElement("button");b.id="tomap";b.className="tomap";b.innerHTML="‹ Bản đồ";b.setAttribute("aria-label","Về bản đồ hoàng cung");b.addEventListener("click",ev=>{ev.stopPropagation();tab="go";window.__fromMap=0;render()})}
 if(b.parentNode!==st)st.appendChild(b)}catch(e){}return r}})();
document.addEventListener("click",e=>{const t=e.target.closest("[data-tab]");if(t&&t.dataset.tab!=="act")window.__fromMap=0},true);

/* ================= FIGURES v2: every manifest merged; one identity per person for life, never reused in a game ================= */
/* img/FIGURES.json (consorts, player, emperor, eunuchs), img/FIGURES-servants.json (maid, mama, eunuch), img/FIGURES-others.json
   (thaihau, official, physician, man+sub). A missing file is skipped. When FIGURES-others.json holds official / physician
   entries, the old single-age ones of FIGURES.json are ignored. Re-read every 5 minutes so new art lands without a reload. */
const FIGF=["img/FIGURES.json","img/FIGURES-servants.json","img/FIGURES-others.json"];
let FIGIX={},FIGSIG="";
function figList(j){return (Array.isArray(j)?j:j&&(j.figures||j.files||j.items)||[]).filter(f=>f&&(f.file||f.src))}
function figAge(t){const s=String(t==null?"":t).toLowerCase();const m=s.match(/\d+/g);if(m){const a=+m[0],b=m[1]?+m[1]:a;return (a+b)/2}return /old|lao|gia/.test(s)?56:/mid|trung/.test(s)?32:/young|tre/.test(s)?20:null}
function figTier(t){if(t==null||t==="")return null;if(/cold|lanh/i.test(String(t)))return -1;const n=parseInt(String(t).replace(/[^\d-]/g,""),10);return isNaN(n)?null:n}
function figPath(s){return !s?"":/^img\//.test(s)?s:"img/"+s}
function figKey(f){const r=norm(f.role);if(f.identity!=null&&f.identity!=="")return r+":"+f.identity;if(f.variant!=null)return r+":v"+f.variant;return r+":"+String(f.file||f.src)}
function figIndex(all){const ix={};for(const f of all){if(/(^|\/)por-/.test(f.file||f.src))continue;const r=norm(f.role);const k=figKey(f);(ix[r]=ix[r]||{});(ix[r][k]=ix[r][k]||[]).push(f)}return ix}
function loadFigs(){try{Promise.all(FIGF.map(u=>fetch(u,{cache:"no-cache"}).then(r=>r.ok?r.json():[]).catch(()=>[]))).then(([a,b,c])=>{a=figList(a);b=figList(b);c=figList(c);
 const old=f=>/(^|\/)_old\//.test(String(f.file||f.src))||(f.por&&/(^|\/)_old\//.test(String(f.por)));a=a.filter(f=>!["thaihau","official","physician"].includes(norm(f.role)));a=a.filter(f=>!old(f));b=b.filter(f=>!old(f));c=c.filter(f=>!old(f));
 const all=a.concat(b,c);const sig=all.length+"|"+all.map(f=>f.file||f.src).join(",").length;if(sig===FIGSIG)return;FIGSIG=sig;FIGS=all;FIGIX=figIndex(all);try{if(S&&!S.dead)render()}catch(e){}}).catch(()=>{})}catch(e){}}
loadFigs();setInterval(loadFigs,300000);
/* which art group a person belongs to, preferred first */
const MANSUB={"thị vệ":["guard","thive","thi ve","vesi"],"thái y":["physician","doctor","thaiy"],"vương gia":["prince","royal","vuonggia","wang"],"nhạc sư":["musician","nhacsu","music"],"sứ thần":["envoy","suthan","ambassador"]};
function figWho(p){if(!p)return null;if(p===S)return S;const k=p.kind;if(k==="emp")return S.emp;if(k==="th"){S.thO=S.thO||{};return S.thO}if(k==="maid"&&!p.ref)return S.maid;if(k==="ty"&&!p.ref)return S.court&&S.court.ty;if(k==="ksp"&&!p.ref)return S.court&&S.court.ksp;return p.ref||p}
function figRoles(who){if(!who)return[];if(who===S)return["player","heroine"];if(who===S.emp)return["emperor"];if(who===S.thO)return["thaihau"];
 const C=S.court||{};if(who===C.ty)return["physician"];if(who===C.tq||who===C.ksp||who===C.ped)return["eunuch"];
 if((S.men||[]).includes(who))return who.rw==="thái y"?["man","physician"]:["man"];
 if(who===S.maid||who.role==="maid")return (who.age||18)>=36||who.old?["mama","maid"]:["maid"];
 if(who.role==="eunuch"||who.role==="eun")return["eunuch"];
 if((rivals||[]).includes(who))return["consort"];return[]}
function figAgeOf(who){return who===S?S.age||18:who===S.thO?S.thAge||55:who.age||20}
function figTierOf(who){if(who===S)return S.out?-1:S.rank;if((rivals||[]).includes(who))return who.out?-1:who.queen?7:who.rank||0;return null}
/* the closest file inside one identity: nearest tier, then nearest age */
function figDist(f,tier,age){const ft=figTier(f.tier),fa=figAge(f.ageBand);return (tier!=null&&ft!=null?Math.abs(ft-tier)*2:0)+(fa!=null?Math.abs(fa-age)/8:0)}
function figBest(L,tier,age){let b=null,bd=1e9;for(const f of L){const d=figDist(f,tier,age);if(d<bd){bd=d;b=f}}return b}
function figSubOk(who,f){const want=MANSUB[who.rw]||[];if(!want.length||f.sub==null)return 0;const s=norm(f.sub);return want.some(w=>norm(w)===s||s.includes(norm(w)))?1:-1}
function figLook(who,f){const want=(typeof LOOKFOR!=="undefined"&&LOOKFOR[who.trait])||[];if(!want.length||f.look==null)return 0;return want.includes(norm(f.look))?1:0}
function figUsed(){S.fidUsed=S.fidUsed||[];return S.fidUsed}
function figPick(who){const roles=figRoles(who);if(!roles.length)return null;const used=new Set(figUsed());
 if(who.fid){const r=who.fid.split(":")[0];if(FIGIX[r]&&FIGIX[r][who.fid])return who.fid}
 const tier=figTierOf(who),age=figAgeOf(who);
 for(const r of roles){const M=FIGIX[norm(r)];if(!M)continue;const free=Object.keys(M).filter(k=>!used.has(k));if(!free.length)continue;
  const sc=k=>{const L=M[k];const b=figBest(L,tier,age);let s=-figDist(b,tier,age);if((S.men||[]).includes(who))s+=4*Math.max(...L.map(f=>figSubOk(who,f)));s+=3*Math.max(...L.map(f=>figLook(who,f)));return s};
  let best=-1e9;for(const k of free)best=Math.max(best,sc(k));const top=free.filter(k=>sc(k)>=best-.5);const k=pick(top);who.fid=k;figUsed().push(k);return k}
 return null}
figFor=function(p,kind){try{if(!FIGS.length||!p||!S)return"";const who=figWho(p);if(!who)return"";const k=figPick(who);if(!k)return"";const r=k.split(":")[0];const L=(FIGIX[r]||{})[k];if(!L||!L.length)return"";
 const f=figBest(L,figTierOf(who),figAgeOf(who));if(!f)return"";if(kind==="por")return figPath(f.por);return figPath(f.file||f.src)}catch(e){return""}};
/* round portraits: the identity's por-*.webp once it has loaded; the old face until then (or if it fails) */
const PORK={};
function porOf(who,fb){try{if(!who||!FIGS.length)return fb;const src=figFor(who===S?S:who===S.emp?{kind:"emp"}:who===S.thO?{kind:"th"}:{ref:who},"por");if(!src)return fb;
 if(PORK[src]===1)return src;if(PORK[src]===0)return fb;if(PORK[src]==null){PORK[src]=2;const im=new Image();im.onload=()=>{PORK[src]=1;clearTimeout(window.__porT);window.__porT=setTimeout(()=>{try{if(S)render()}catch(e){}},250)};im.onerror=()=>{PORK[src]=0};im.src=src}return fb}catch(e){return fb}}
(function(){const W=(name,get)=>{const f0=window[name];if(typeof f0!=="function")return;window[name]=function(){const r=f0.apply(this,arguments);try{const who=get.apply(this,arguments);if(r&&typeof r==="object"&&who)r.src=porOf(who,r.src);else if(typeof r==="string"&&who)return porOf(who,r)}catch(e){}return r}};
 W("pv",v=>v);W("pMe",()=>S);W("pEmp",()=>S.emp);W("pTH",()=>{S.thO=S.thO||{};return S.thO});W("pDoc",()=>S.court&&S.court.ty);W("pServ0",s=>s);W("maidSrc",m=>m);W("courtSrc",(k,c)=>c);W("pMan",m=>m)})();
/* place screens: every person present stands full-body when art exists (servants, physician and eunuchs too) */
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{if(!FIGS.length)return r;const ppl=curPeople();document.querySelectorAll("#tokens .tok:not(.fig)").forEach(b=>{const p=ppl[+b.dataset.p];if(!p||p.kind==="kid"||p.kind==="chest")return;const src=figFor(p);if(!src)return;
  const md=b.querySelector(".md");if(md){const im=document.createElement("img");im.className="figimg";im.alt="";im.src=src;im.onerror=()=>{im.remove();md.style.display="";b.classList.remove("fig")};md.style.display="none";b.insertBefore(im,md);b.classList.add("fig")}})}catch(e){}return r}})();
(function(){const r0=renderStage;renderStage=function(){const r=r0.apply(this,arguments);try{$("stage").classList.toggle("hasme",!!document.getElementById("mefig"))}catch(e){}return r}})();

/* ================= NPC MINDS: human and beatable. Weighted choice by traits (never a best-move search), limited knowledge,
   wit from Tâm cơ, trait biases and mood, mistakes, and tells before big schemes. One rule for every head. ================= */
/* counters for the personality table */
function mindLog(v,k){try{persCount(v,k);S.mind=S.mind||{};S.mind[k]=(S.mind[k]||0)+1}catch(e){}}
function witOf(v){return cl(v===S?S.tamco||0:v.tamco||0,0,100)}
function bq(){return S.bqN||0}
/* a slight or a blow makes the next days rash (mood); every consort alike */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){if(n>0&&x&&x!==S)x.slightAt=bq();return o0.apply(this,arguments)}})();
function rashOf(v){const recent=v.slightAt!=null&&bq()-v.slightAt<=3;if(!recent)return 0;if(traitsOf(v).includes("Kiêu ngạo"))return 1;return roll(30)?1:0}
/* a blunder: the act is done badly (lower odds); read inside odA for that doer only */
(function(){const o0=odA;odA=function(a,b){const r=o0.apply(this,arguments);return a&&a.__err?cl(r-a.__err,5,95):r}})();
const BIG=["poison","kpoison","pond","pushp","musk","catswap","kframe","frame","plant"];
const TELLS={musk:"lén mua xạ hương ở chợ ngoài cung",poison:"vào Thái y viện hỏi mua thạch tín, nói là để trừ chuột",kpoison:"hỏi mua thạch tín, nói là để trừ chuột",pond:"hay dẫn người ra hồ sen dò lối, hỏi giờ các hoàng tự đi chơi",
 pushp:"dò giờ người ta đi qua bậc đá trơn sau mưa",catswap:"cho một bà đỡ lạ ra vào cung mình",kframe:"mua vải vàng và kim bạc, đóng cửa may vá ban đêm",frame:"mua vải vàng và kim bạc, đóng cửa may vá ban đêm",plant:"lảng vảng quanh cung người khác lúc vắng người"};
/* the choice: the band's menu weighted by traits; Tâm cơ tilts toward what works and away from what failed; low Tâm cơ repeats failed tricks */
function mindMenu(v,t){const b=bandOf(danger(v,t));if(!b)return[];const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const O=[];const tc=witOf(v);v.fails=v.fails||{};
 const add=(k,w)=>{const a=ACT[k];if(!a||!allow.includes(k))return;let ok=false;try{ok=a.ok(v,t)}catch(e){}if(!ok)return;w*=persW(v,k);if(w<=0)return;
  let o=null;try{o=a.o?a.o(v,t):null}catch(e){}if(o!=null&&tc>=30)w*=Math.pow(cl(o,5,95)/50,(tc-30)/35);/* wit: weigh the odds, more so the cleverer */
  const f=v.fails[k]||0;if(f)w*=tc<35?1+.6*f:Math.pow(.5,f);/* the foolish repeat, the clever learn */
  O.push([k,w])};
 add("accuse",6);add("vp",3);add("musk",4);add("catswap",2);for(const k of ["kpoison","pond","kframe","ksab"])add(k,2);add("takeaway",2);add("pushp",1);add("trip",3);add("frame",2);add("poison",2);add("rumor",3);add("spy",3);add("bribe",2);add("block",t.nightLog&&t.nightLog.length?2:0);
 if(allow.includes("plant")&&v.inv.some(e=>e.t||(IT[e.k]&&IT[e.k].il)))O.push(["plant",3*persW(v,"plant")]);return O}
function wpick(O){let r=Math.random()*O.reduce((a,b)=>a+b[1],0),i=0;while(r>O[i][1]&&i<O.length-1){r-=O[i][1];i++}return O[i][0]}
const FAILRX=/bị lộ|bị bắt|phát giác|bị phát hiện|không thành|không ai tin|từ chối|chưa chuẩn|bị thử ra|lần ra|tra ra|báo cho chủ|đem chuyện kể/;
function mindRun(v,t,k,err){v.__err=err||0;let r="";try{r=k==="plant"?runAct(v,t,"plant",v.inv.findIndex(e=>e.t||(IT[e.k]&&IT[e.k].il))):runAct(v,t,k)}finally{v.__err=0}
 v.fails=v.fails||{};const failed=FAILRX.test(r);if(failed)v.fails[k]=(v.fails[k]||0)+1;else if(r)v.fails[k]=0;
 if(r&&!failed&&k!=="spy"&&k!=="accuse"&&k!=="vp")mindBelief(t,v,k);
 /* Hiểm độc over-plots: a success may leave a clue behind */
 if(r&&!failed&&traitsOf(v).includes("Hiểm độc")&&BIG.includes(k)&&roll(20)){evA(t,v,1);mindLog(v,"_clue");if(t===S)r+=`(Để lại dấu vết: ngươi nắm thêm 1 chứng cứ về ${v.name}.) `}
 return r}
/* knowledge: a victim of a hidden blow only guesses who did it; wit and evidence help; a wrong guess turns her hatred on someone else (the player too) */
function mindBelief(t,v,k){if(!t||t===S||!t.alive)return;const ev=(t.evm&&t.evm[key(v)])||0;const p=cl(35+witOf(t)/2+(ev>0?25:0)-witOf(v)/4,10,90);mindLog(t,"_belief");
 if(roll(p)){oanAdd(t,v,8);return}
 const L=others(t).filter(x=>x!==v&&(x===S||x.alive&&!x.out));if(!L.length)return;const w=L.map(x=>[x,1+oan(t,x)+Math.max(0,-aff(t,x))]);let r=Math.random()*w.reduce((a,b)=>a+b[1],0),i=0;while(r>w[i][1]&&i<w.length-1){r-=w[i][1];i++}
 const s=w[i][0];oanAdd(t,s,8);mindLog(t,"_wrongBelief");t.blamed=t.blamed||{};t.blamed[key(s)]=(t.blamed[key(s)]||0)+1;
 if(s===S&&roll(30+(S.mat||0)*8))noteAdd(t.id,`Nghe nói ${t.name} ngờ ngươi đứng sau chuyện ${ACT[k]?ACT[k].n.toLowerCase():"vừa rồi"}, dù không phải ngươi`)}
/* the mind's turn: replaces the plain weighted pick */
npcAct=function(v,t){try{if(!v||!t)return"";const T=traitsOf(v);const tc=witOf(v);mindLog(v,"_decide");
  /* Nhu mì hesitates */
  if(T.includes("Nhu mì")&&roll(35)){mindLog(v,"_hesitate");return""}
  /* Đa nghi wastes effort on a false suspicion */
  if(T.includes("Đa nghi")&&roll(22)){const L=others(v).filter(x=>x!==t&&(x===S||x.alive&&!x.out)&&danger(x,v)<30);if(L.length){const u=pick(L);mindLog(v,"_wrongBelief");mindLog(v,"_mistake");evA(v,u,0);newsAdd(v,"spy",`Người của ${v.name} dò xét ${NM(u)} vì một mối ngờ không có thật`,u===S);return""}}
  /* Tham vọng overreaches: aims at the highest seat */
  let err=0;if(T.includes("Tham vọng")&&roll(20)){const L=others(v).filter(x=>(x===S||x.alive&&!x.out));const hi=L.sort((a,b)=>rkOf(b)-rkOf(a))[0];if(hi&&hi!==t&&bandOf(danger(v,hi))>=1){t=hi;err+=10;mindLog(v,"_overreach");mindLog(v,"_mistake")}}
  /* rash: slighted Kiêu ngạo, or a bad week for anyone */
  const rash=rashOf(v);if(rash){err+=10;mindLog(v,"_rash");mindLog(v,"_mistake")}
  /* low wit: clumsy */
  if(!rash&&tc<30&&roll(15)){err+=10;mindLog(v,"_mistake")}
  const O=mindMenu(v,t);if(!O.length)return"";let k;if(rash){const ov=O.filter(x=>["accuse","rumor","trip","vp","frame"].includes(x[0]));k=wpick(ov.length?ov:O)}else k=wpick(O);persCount(v,k);
  /* a big scheme is prepared first: it leaves a tell her people may catch */
  if(BIG.includes(k)&&!v.plan){const pat=tc>=60?2:tc>=35?1:0;v.plan={k,t:key(t),due:bq()+1+R(2)+pat,err};mindTell(v,t,k);return""}
  return mindRun(v,t,k,err)}catch(e){return""}};
function mindTell(v,t,k){mindLog(v,"_tell");const tc=witOf(v);let c=12+(S.mat||0)*7+(S.staff||[]).filter(s=>s.tr==="lanh"||s.tr==="chuyen").length*8+(tc<35?15:0)-(tc>=70?8:0)+(t===S&&S.maid&&S.maid.loyal>=70?10:0);
 if(!roll(cl(c,5,80)))return;mindLog(v,"_tellSeen");const txt=`Người của ${v.name} ${TELLS[k]||"có động tĩnh lạ"}`;S.tells=S.tells||{};S.tells[v.id]={k,t:key(t),bq:bq()};
 try{newsAdd(v,k,txt,true)}catch(e){}noteAdd(v.id,`Tai mắt báo: ${TELLS[k]||"có động tĩnh lạ"}${t===S?" (có lẽ nhắm vào ngươi)":` (có lẽ nhắm vào ${NM(t)})`}`);
 if(t===S){S.onGuard=S.onGuard||{};S.onGuard[v.id]=k;if(!S.dead)Q.push({t:"Tai mắt báo tin",h:`<p>${txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi tới mưu của nàng khó thành hơn; dò la hoặc tố giác nàng thì càng chắc.</p>`,who:{w:["r",v.id]}})}
 else log(`Tai mắt báo: ${txt}.`)}
/* plans fall due a few buổi later; her guard (from a caught tell) makes them fail more and leaves evidence */
(function(){const r0=rivalsBuoi;rivalsBuoi=function(){S.bqN=(S.bqN||0)+1;let ev="";try{for(const v of liveRivals(true)){const P=v.plan;if(!P||!v.alive||v.out)continue;if(P.due>bq())continue;v.plan=null;const t=byKey(P.t);if(!t||(t!==S&&(!t.alive||t.out))||(t===S&&S.dead))continue;
   let err=P.err||0;const guard=t===S&&S.onGuard&&S.onGuard[v.id];if(guard){err+=25;delete S.onGuard[v.id]}
   let ok=false;try{ok=ACT[P.k].ok(v,t)}catch(e){}if(!ok){mindLog(v,"_abandon");continue}
   const r=mindRun(v,t,P.k,err);if(guard&&FAILRX.test(r))evA(S,v,1);ev+=seenNPC(v,t,r);if(S.dead)return ev}}catch(e){}
  return ev+r0.apply(this,arguments)}})();
/* someone with a plan in hand waits for it instead of starting another */
(function(){const n0=npcAct;npcAct=function(v,t){if(v&&v.plan)return"";return n0.apply(this,arguments)}})();
/* ================= BALANCE KNOBS (measured with the sensible / random bots; see the report) ================= */
const BAL={outQ:85,hz:1.75,conc:.3/.7,later:5,hhTh:55};
/* an empty Hoàng hậu seat: the Thái hậu may bring in a girl of a great house instead of holding a contest (same for every candidate) */
(function(){const c0=contestOpen;contestOpen=function(r){if(r===7&&!ct()&&!queenP()&&S.outQv!==S.vacSince&&consorts().some(p=>candOK(p,7))&&(S.outQv=S.vacSince,true)&&roomFor("consort")&&roll(BAL.outQ)){const n=newRival(7,true);Object.assign(n,drawFace());n.rank=6;n.queen=true;n.dad=80;rivals.unshift(n);S.vacSince=null;
  const t=`<b>Thánh chỉ: Thái hậu chọn ${n.name}, con gái danh môn, vào cung lập làm Hoàng hậu.</b> Ghế trống không mở tranh. `;log(t);return t}return c0.apply(this,arguments)}})();
/* fewer births per life: conception (after the ×0.7) scaled; a woman who has borne before is a little safer in labour (everyone alike) */
(function(){const c0=conceiveCh;conceiveCh=function(p){return Math.round(c0.apply(this,arguments)*BAL.conc)}})();
(function(){const b0=birthRisk;birthRisk=function(p){const r=b0.apply(this,arguments);const n=p===S?(S.kids||[]).length:(p.kids||[]).length;if(n>0&&p===S&&S.birthWhy)S.birthWhy=S.birthWhy.concat([]);return n>0?cl(r-BAL.later,1.5,60):r}})();
/* the Hoàng hậu seat asks more: the Thái hậu's favour 55+ to stand as a candidate (same for every candidate) */
(function(){const c0=candOK;candOK=function(p,r){if(!c0.apply(this,arguments))return false;if(r===7&&(p.th||0)<BAL.hhTh)return false;return true}})();
(function(){const q0=promoReqP;promoReqP=function(p){const L=q0.apply(this,arguments);try{if(rkOf(p)===6)L.push([(p.th||0)>=BAL.hhTh,`Thái hậu với ${p===S?"ngươi":"nàng"} ${BAL.hhTh}+ (nay ${p.th||0})`])}catch(e){}return L}})();
/* ================= RA VÀO CUNG CẤM: who may enter which place, when; one rule for every character (her and every NPC) =================
   accessOf(p,k) -> {ok:true} | {ok:false,why,kind,ask}   kind: "rule" (rank / summons) | "hour" (closed) ; ask: "yk" xin yết kiến | "bk" xin bái kiến
   accRole(fn): a role hook, fn(p,k,ctx) returns a verdict object to decide, or null to fall through (a servant-player module plugs in here)
   accGrant(p,k): a pass for this buổi (summons, accepted request, successful sneak). */
const ACC_ROLE=[];
function accRole(fn){if(typeof fn==="function")ACC_ROLE.push(fn)}
function accGrant(p,k){p=p||S;p.acPass=p.acPass||{};p.acPass[k]=bkey()}
function accHas(p,k){const a=(p||S).acPass;return !!(a&&a[k]===bkey())}
function accHost(k){if(k==="kn")return rivals.find(v=>v.queen&&v.alive&&!v.out)||null;if(k&&k[0]==="r")return RV(+k.slice(1))||null;return null}
function accOwn(p,k){if(p===S)return k==="home"||(S.pal!=null&&palaceOf(S)===k);try{return palaceOf(p)===k}catch(e){return false}}
const ACC_DAY={tyv:1,vuon:1};
function accessOf(p,k){p=p||S;if(!k)return{ok:false,why:"cung trống",kind:"rule"};
 if(accOwn(p,k))return{ok:true};
 const ctx={b:S.buoi||0,r:rkOf(p),host:accHost(k)};
 for(const fn of ACC_ROLE){try{const v=fn(p,k,ctx);if(v)return v}catch(e){}}
 if(accHas(p,k))return{ok:true,pass:1};
 const b=ctx.b,r=ctx.r;
 if(k==="dtd"||k==="thu"){if(r>=4)return{ok:false,why:"cần xin yết kiến",kind:"rule",ask:"yk"};return{ok:false,why:"chỉ khi được triệu",kind:"rule"}}
 if(k==="kn"){if(!qOn()||r>=7)return{ok:true};if(b===0||r>=5)return{ok:true};return{ok:false,why:"chỉ sáng thỉnh an",kind:"rule",ask:"bk"}}
 if(k==="tn"){if(S.thDead)return{ok:true};if(r<2)return{ok:false,why:"cần phẩm Quý nhân",kind:"rule"};if(b===0)return{ok:true};return{ok:false,why:"chỉ sáng thỉnh an",kind:"rule"}}
 if(k[0]==="r"){const h=ctx.host;if(!h||!h.alive||h.out)return{ok:true};const hr=rkOf(h);if(r>=hr-1)return{ok:true};return{ok:false,why:`cần phẩm ${RANKS[Math.max(0,hr-1)].n}`,kind:"rule",ask:"bk"}}
 if(ACC_DAY[k]){if(b<=1)return{ok:true};return{ok:false,why:"đóng cửa tối",kind:"hour"}}
 return{ok:true}}
/* the odds and prices (her side; an NPC module may call the same) */
function accSneakO(k,a){a=a||S;const base=k==="dtd"?25:k==="thu"?30:k==="tn"||k==="kn"?35:k[0]==="r"?45:55;return odA(a,base+(a.tamco||0)/5+(a.mat||0)*3)}
function accAskO(k,a){a=a||S;if(k==="dtd"||k==="thu"){let o=45+(rkOf(a)-4)*8+mm()+(a.sung||0)/5;if(has("chamchinh")&&k==="thu")o-=10;if(has("datinh")&&k==="dtd")o+=8;return odA(a,o)}
 const h=accHost(k);return odA(a,40+(h?aff(h,a)/2+(rkOf(a)-rkOf(h))*8:0))}
function accName(k){try{return k==="home"?palName("home"):(typeof palName==="function"&&(PLNAME[k]||k[0]==="r")?palName(k):placeOf(k).n)}catch(e){return placeOf(k).n}}
/* the full state of a map place for her right now: grey reason (access first, then khắc / confinement) */
function accState(k){if(!S||!k)return{why:""};if(S.place===k)return{why:"",here:1};
 if(S.out)return{why:"đang ở lãnh cung"};if(S.confined)return{why:`cấm túc ${S.confined} tháng`};
 const a=accessOf(S,k);const tc=k==="home"?0:travel(S.place,k);
 if(!a.ok){const st={why:a.why,kind:a.kind,ask:a.ask,tc};st.sneakOk=can(tc+2);if(a.ask==="yk")st.empAway=(S.where||{}).emp!==k;st.askOk=can(1)&&!st.empAway;return st}
 if(k!=="home"&&!can(tc+1))return{why:"hết khắc"};
 return{why:"",tc}}
function accSneakLine(k,tc){return `${word(accSneakO(k))} · tốn: ${tc+1} khắc · thành: vào được buổi này · hỏng: Danh -8, bị phạt`}
function accAskLine(k){return `${word(accAskO(k))} · tốn: 1 khắc · thành: được vào buổi này · hỏng: không mất gì thêm`}
/* small kit buttons for the map hotspot: name + odds chip + price */
function accMini(k,st,risk){const L=[];
 if(st.ask&&st.ask==="yk")L.push(`<button class="acb" data-acask="${k}" ${st.askOk?"":"disabled"}>Xin yết kiến ${st.empAway?'<i>ngài vắng</i>':oddsChip(word(accAskO(k)))+'<i>1 khắc</i>'}</button>`);
 if(st.ask==="bk")L.push(`<button class="acb" data-acask="${k}" ${st.askOk?"":"disabled"}>Xin bái kiến ${oddsChip(word(accAskO(k)))}<i>1 khắc</i></button>`);
 if(st.kind)L.push(`<button class="acb" data-acsneak="${k}" ${st.sneakOk?"":"disabled"}>Lẻn vào ${oddsChip(word(accSneakO(k)))}<i>${st.tc+1} khắc${risk?" · bắt: Danh -8":""}</i></button>`);
 return L.length?`<span class="macts">${L.join("")}</span>`:""}
/* full kit buttons (Danh sách, cards) */
function accBtns(k,st){const L=[];
 if(st.ask==="yk")L.push(pbtn(`class="btn" data-acask="${k}"`,"Xin yết kiến",accAskLine(k),st.empAway?"Hoàng thượng không có ở đây":!can(1)?"hết khắc":""));
 if(st.ask==="bk")L.push(pbtn(`class="btn" data-acask="${k}"`,"Xin bái kiến",accAskLine(k),!can(1)?"hết khắc":""));
 if(st.kind)L.push(pbtn(`class="btn" data-acsneak="${k}"`,"Lẻn vào",accSneakLine(k,st.tc),st.sneakOk?"":"không đủ khắc"));
 return L.join("")}
/* acts */
function accSneak(k){if(!S||S.dead||Q.length||S.out||S.confined)return;const tc=travel(S.place,k);if(!can(tc+2))return;const nm=accName(k);const o=accSneakO(k);spend(1);
 if(roll(o)){accGrant(S,k);log(`Lẻn vào ${nm} trót lọt.`);window.__accSilent=0;goTo(k);if(S.place!==k)render();return}
 spend(tc);apply({danh:-8});log(`<span class="r">Lẻn vào ${nm}, bị thị vệ bắt được: Danh -8.</span>`);punish(S,`tự tiện lẻn vào ${nm}`,1);
 Q.push({t:"Bị bắt",h:`<p>Thị vệ ${nm} bắt được ngươi ở cửa hông. Chuyện truyền khắp lục cung.</p><p class="r">Danh -8 · ${S.confined?`cấm túc ${S.confined} tháng`:"bị phạt"}</p>`});showModal();render()}
function accAsk(k){if(!S||S.dead||Q.length||!can(1))return;const st=accState(k);if(!st.ask||st.empAway)return;const nm=accName(k);const o=accAskO(k);spend(1);
 if(roll(o)){accGrant(S,k);log(`Xin vào ${nm}: được cho vào buổi này.`);Q.push({t:st.ask==="yk"?"Được yết kiến":"Được mời vào",h:`<p>${st.ask==="yk"?"Thái giám truyền khẩu dụ: Hoàng thượng cho ngươi vào.":"Cung nữ ra cửa mời ngươi vào."}</p><p class="g">Được vào ${nm} buổi này.</p>`});}
 else{log(`Xin vào ${nm}: bị từ chối.`);Q.push({t:"Bị từ chối",h:`<p>${st.ask==="yk"?`Thái giám ra cửa: “Hoàng thượng đang ${S.emp.mood>=2?"không vui":"bận"}, nương nương xin hồi cung.”`:"Cung nữ ra cửa: “Chủ tử nhà nô tỳ không tiện tiếp.”"}</p>`})}
 showModal();render()}
document.addEventListener("click",e=>{const s=e.target.closest("[data-acsneak]");if(s){e.preventDefault();e.stopImmediatePropagation();if(!s.disabled)accSneak(s.dataset.acsneak);return}
 const a=e.target.closest("[data-acask]");if(a){e.preventDefault();e.stopImmediatePropagation();if(!a.disabled)accAsk(a.dataset.acask);return}
 const i=e.target.closest("[data-acinfo]");if(i){e.preventDefault();e.stopImmediatePropagation();accInfo();return}
 const g=e.target.closest(".agrey");if(g){e.preventDefault();e.stopImmediatePropagation()}},true);
/* the gate on goTo: barred places are never entered silently; a tap from elsewhere shows the card with the ways in */
(function(){const g0=goTo;goTo=function(k){if(!S||k===S.place||k==="home")return g0.apply(this,arguments);
 const a=accessOf(S,k);if(!a.ok){if(S.place==="home"&&(!S.visit||S.visit.k!=="home"))S.visit={k:"home",people:homePeople(),talked:false,tk:{}};
  if(!window.__accSilent&&!S.dead&&!Q.length&&!S.out&&!S.confined){const st=accState(k);const opts=[];
   if(st.ask&&!st.empAway)opts.push({n:st.ask==="yk"?"Xin yết kiến":"Xin bái kiến",fx:{},x:accAskLine(k),go:()=>setTimeout(()=>accAsk(k),0)});
   if(st.kind&&st.sneakOk)opts.push({n:"Lẻn vào",fx:{},x:accSneakLine(k,st.tc),go:()=>setTimeout(()=>accSneak(k),0)});
   opts.push({n:"Thôi",fx:{},x:""});Q.push({t:accName(k),h:`<p>Không vào được lúc này: <b>${a.why}</b>.</p>${st.kind&&!st.sneakOk?`<p class="past">Lẻn vào: không đủ khắc (cần ${st.tc+2}, còn ${4-used}).</p>`:""}`,opts});showModal()}
  return}
 const prev=S.place;const r=g0.apply(this,arguments);
 try{if(k==="lc"&&S.place==="lc"&&prev!=="lc"&&!S.out){apply({danh:-2});log("Bị thấy lui tới Trường Môn viện: Danh -2.");if(S.visit)S.visit.msg=(S.visit.msg?S.visit.msg+" ":"")+"Có người thấy ngươi ở lãnh cung: Danh -2."}}catch(e){}
 return r}})();
/* the new buổi re-enters her place quietly (a closed place sends her home without a card) */
(function(){const n0=nextBuoi;nextBuoi=function(){window.__accSilent=1;try{return n0.apply(this,arguments)}finally{window.__accSilent=0}}})();
/* a summons from the Thái hậu is a pass to Đức Thọ cung this buổi */
(function(){const c0=chooseM;chooseM=function(i){try{const m=Q[0];if(m&&/triệu/i.test(m.t||"")&&m.opts&&m.opts[i]&&/^Đến/.test(m.opts[i].n)){if(/Thái hậu/.test(m.t))accGrant(S,"tn");if(/Hoàng thượng/.test(m.t)){accGrant(S,"dtd");accGrant(S,"thu")}if(/Hoàng hậu/.test(m.t))accGrant(S,"kn")}}catch(e){}return c0.apply(this,arguments)}})();
/* NPC movement keeps the same rule: a consort barred from a place stays in her own palace */
(function(){const pw=placeWhere;placeWhere=function(){const r=pw.apply(this,arguments);try{const W=S.where||{};for(const v of rivals){if(!v.alive||v.out)continue;const k=W[v.id];if(!k||k==="home"||k[0]==="r")continue;if(!accessOf(v,k).ok)W[v.id]=palaceOf(v)}}catch(e){}return r}})();
/* person-card buttons that would walk into a barred place carry the reason, disabled */
function accDis(html,k){if(!html||!k||!S||S.place===k)return html;const a=accessOf(S,k);if(a.ok||/<button[^>]* disabled/.test(html))return html;return html.replace("<button ","<button disabled ").replace("<small>",`<small><span class="kwhy">${a.why}</span> `)}
(function(){if(typeof seeBtn==="function"){const s0=seeBtn;seeBtn=function(v){const h=s0.apply(this,arguments);try{return accDis(h,whereOf(v))}catch(e){return h}}}
 if(typeof visitBtn==="function"){const v0=visitBtn;visitBtn=function(v){const h=v0.apply(this,arguments);try{return accDis(h,palaceOf(v))}catch(e){return h}}}})();
/* THE MAP: grey as a whole when she cannot enter now; reason in grey; the ways in as kit buttons */
function accSpot(all,cls,k,attrs,inner){const st=accState(k);if(st.here||!st.why)return all;
 attrs=attrs.replace(/\sdisabled/g,"").replace(/title="([^"]*)"/,(m,t)=>`title="${t.replace(/ · (hết khắc|đang cấm túc[^·"]*|đang ở lãnh cung)/,"")} · ${st.why}"`);
 inner=inner.replace(/<span class="mmeta">[\s\S]*?<\/span>(?=<|$)/,"");
 return `<div class="mspot${cls.replace(/\soff/g,"")} off agrey" data-ak="${k}"${attrs}>${inner}<span class="mwhy">${st.why}</span>${accMini(k,st)}</div>`}
(function(){const m0=mapHTML;mapHTML=function(){let h=m0.apply(this,arguments);if(window.__mapList)return h;
 try{h=h.replace(/<button class="mspot([^"]*)" data-go="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,(all,cls,k,attrs,inner)=>accSpot(all,cls,k,attrs,inner));
  h=h.replace('<button class="btn mz" data-maplist="1">','<button class="btn mz" data-acinfo="1" aria-label="Ra vào cung cấm">ⓘ Ra vào</button><button class="btn mz" data-maplist="1">')}catch(e){}
 return h}})();
/* THE LIST: the same grey tiles */
(function(){const g0=mapHTMLgrid;mapHTMLgrid=function(){let h=g0.apply(this,arguments);
 try{h=h.replace(/<button class="mtile" data-go="([^"]+)"([^>]*)>([\s\S]*?)<\/button>/g,(all,k,attrs,inner)=>{const st=accState(k);if(st.here)return all.replace('class="mtile"','class="mtile ahere"');if(!st.why)return all;
   inner=inner.replace(/<span class="mchip">[^<]*<\/span>/g,"");inner=inner.replace('<span class="mband">',`<span class="mband"><span class="mchip agw">${st.why}</span>`);
   const acts=st.kind?`<span class="tacts">${accMini(k,st,1).replace(/<\/?span class="macts">/g,"")}</span>`:"";
   return `<div class="mtile agrey" data-ak="${k}"${attrs.replace(/\sdisabled/g,"")}>${inner}${acts}</div>`});
  h=h.replace('<div class="pmap">',`<div class="ph"><button class="btn" data-acinfo="1">ⓘ Ra vào cung cấm<small>ai được vào đâu, lúc nào</small></button></div><div class="pmap">`)}catch(e){}
 return h}})();
/* TRA CỨU: Ra vào cung cấm */
function accInfo(){if(!S||Q.length)return;const R=n=>`<b>${n}</b>`;
 Q.push({t:"Ra vào cung cấm",h:`<div class="acinfo"><p>Một luật cho mọi người trong cung, cả phi tần khác.</p>
 <p>${R("Dưỡng Hòa điện, Cần Chính điện")}: khi được triệu. Từ Phi: xin yết kiến (ngài có thể từ chối).</p>
 <p>${R("Càn Ninh cung")}: sáng thỉnh an, ai cũng vào. Lúc khác: được mời, hoặc từ Quý phi.</p>
 <p>${R("Đức Thọ cung")}: sáng thỉnh an, từ Quý nhân. Thấp hơn: khi Thái hậu triệu.</p>
 <p>${R("Cung phi tần khác")}: phẩm ngươi không thấp hơn chủ cung quá một bậc, hoặc được mời.</p>
 <p>${R("Thái y viện, Ngự hoa viên")}: sáng, chiều. Tối đóng cửa.</p>
 <p>${R("Kính sự phòng")}: phi tần nào cũng vào. ${R("Trường Môn viện")}: ai cũng vào, bị thấy: Danh -2.</p>
 <p>${R("Cung của ngươi")}: luôn vào được.</p>
 <p>Chỗ xám: không vào được lúc này. <b>Lẻn vào</b>: tốn khắc, bị bắt Danh -8 và bị phạt.</p></div>`,btn:"Đã rõ"});showModal()}
/* look: grey as a whole */
(function(){const st=document.createElement("style");st.textContent=`
.mspot.agrey{cursor:default;background:#20201c66;border-color:#9a9a9255;-webkit-backdrop-filter:grayscale(1) brightness(.72);backdrop-filter:grayscale(1) brightness(.72);pointer-events:auto}
.mspot.agrey:hover{border-color:#9a9a9255;background:#20201c66}
.mspot.agrey .mlab{opacity:1!important;background:#2b2b28d9;color:#bdbdb4;text-shadow:none}
.mspot.agrey .msil{filter:grayscale(1);opacity:.6}
.mspot .mwhy{display:block;background:#2b2b28d9;color:#c9c9c0;font-size:.55rem;line-height:1.2;border-radius:6px;padding:0 5px;margin-top:1px;white-space:nowrap;pointer-events:none}
.mspot.sm .mwhy{font-size:.5rem;padding:0 3px}
.mspot .macts{display:flex;flex-direction:column;gap:2px;margin-top:2px;align-items:center;z-index:3}
.mspot .acb,.mtile .acb{font:600 .55rem/1.2 var(--body);background:#3a2a1ee6;color:#ffe7b0;border:1px solid #c9a35a;border-radius:8px;padding:1px 5px;white-space:nowrap;cursor:pointer;display:inline-flex;align-items:center;gap:3px;min-height:20px}
.mspot .acb .oc,.mtile .acb .oc{font-size:.5rem;padding:0 4px;line-height:1.2}
.mspot .acb i,.mtile .acb i{font-style:normal;color:#f3e6cf;font-weight:400}
.mspot .acb:disabled,.mtile .acb:disabled{opacity:.5;cursor:default;filter:grayscale(1)}
@media (max-width:600px){.mspot .mwhy{font-size:.5rem}.mspot .acb,.mtile .acb{font-size:.5rem;min-height:18px}}
.mtile.agrey{background-color:#6d6d68!important;background-blend-mode:luminosity;cursor:default;border-color:#77776f}
.mtile.agrey .mband{filter:grayscale(1);opacity:.8}
.mtile .mchip.agw{background:#3a3a36;color:#d8d8cf;border:1px solid #77776f}
.mtile:disabled:not(.ahere){filter:grayscale(1)}
.mtile.ahere:disabled{opacity:1}
.mtile .tacts{display:flex;flex-wrap:wrap;gap:3px;padding:3px 4px 4px;width:100%;background:#1a0e08ee}
.mtile .tacts{flex-direction:column;align-items:stretch}.mtile .tacts .acb{white-space:normal;justify-content:flex-start;flex-wrap:wrap;font-size:.6rem;min-height:26px;text-align:left}
.acinfo p{margin:.2em 0;font-size:.85rem;line-height:1.35}
`;document.head.appendChild(st)})();
/* ================= NPC MINDS II: fills over j40 (never edits it). One rule for every head.
   1. the push-down roads (j30) come back into the mind's menu (j40 replaced npcAct whole and dropped them), with tells;
   2. knowledge: each victim keeps a belief book (bel) of who she thinks hurt her, built only from what she could know
      (seen with her own eyes, her spy in the doer's palace, evidence in hand); she may stay in the dark or blame the wrong head,
      planted evidence pulls her guess; the player's hidden blows are guessed the same way;
   3. wit: every head may slip (low Tâm cơ most, high ~12%); the clever wait for better odds;
   4. a bad week (punished, demoted, fallen) makes anyone rash for about three weeks;
   5. tells reach her through a named servant of hers, by Tai mắt and servant traits; a servant who spies for the schemer keeps silent (withholds, never lies). ================= */
const PUSHK=["lygian","tocao","xinhh","slowpoison","expose"];
const PUSHW={slowpoison:"poison",lygian:"rumor",xinhh:"ally",tocao:"accuse",expose:"accuse"};
PUSHK.forEach(k=>{if(!BIG.includes(k))BIG.push(k)});
Object.assign(TELLS,{lygian:"đem bạc lén biếu thái giám hầu cận Hoàng thượng, dò lúc ngài vui buồn",tocao:"sai người gom lời cung nhân, chép lại sổ sách cũ",
 xinhh:"năng sang cung Hoàng hậu, ngồi rất lâu, cho người hầu lui ra",slowpoison:"ngày ngày sắc một thứ thuốc bổ lạ mà chẳng dùng cho mình",expose:"cho người canh cửa sau, ghi giờ ai ra vào"});
function m43odds(v,t,k){try{const a=ACT[k];return a&&a.o?a.o(v,t):null}catch(e){return null}}
/* the menu: push-down roads against the holder of the seat she wants next (about the old 45% share); the clever drop poor odds and wait */
(function(){const m0=mindMenu;mindMenu=function(v,t){let O=m0.apply(this,arguments);try{
  const nx=rkOf(v)+1;const want=rkOf(t)===nx&&SEATCAP[nx]!=null&&!seatFree(nx);
  if(want){const b=bandOf(danger(v,t));const allow=BANDS.slice(1,b+1).flatMap(x=>x[2]);const L=PUSHK.filter(k=>{if(!allow.includes(k)||!ACT[k])return false;try{return ACT[k].ok(v,t)}catch(e){return false}});
   if(L.length){const W=O.reduce((a,b)=>a+b[1],0);const pw=L.map(k=>Math.max(.05,persW(v,PUSHW[k])));const ps=pw.reduce((a,b)=>a+b,0);const tot=W>0?W*.45/.55:1;L.forEach((k,i)=>O.push([k,tot*pw[i]/ps]))}}
  if(witOf(v)>=60&&O.length){let drop=0;const keep=O.filter(x=>{const o=m43odds(v,t,x[0]);if(o!=null&&o<45&&roll(60)){drop++;return false}return true});
   if(drop){mindLog(v,"_wait");if(!keep.length){const sp=O.find(x=>x[0]==="spy");return sp?[sp]:[]}}O=keep}/* the clever wait out poor odds and dig for evidence meanwhile */
 }catch(e){}return O}})();
/* the push-down roads read Tâm cơ through odT: a blunder lowers them too */
(function(){const o0=odT;odT=function(a,b){const r=o0.apply(this,arguments);return a&&a.__err?cl(r-a.__err,5,95):r}})();
/* belief book */
function m43sev(k){for(let i=1;i<BANDS.length;i++)if(BANDS[i][2].includes(k))return [0,6,12,20][i];return 6}
function belOf(t,x){t.bel=t.bel||{};const k=key(x);return t.bel[k]=t.bel[k]||{r:0,w:0}}
mindBelief=function(t,v,k){if(!t||t===S||!t.alive||t.out||!v)return;const kv=key(v);const ev=(t.evm&&t.evm[kv])||0;
 let p=35+witOf(t)/2+(ev>0?25:0)-witOf(v)/4;let seen=false;try{seen=together(v,t)}catch(e){}if(seen)p+=40;
 const spy=((v===S?S.staff:v.staff)||[]).some(s=>s&&s.spyFor===key(t));if(spy)p+=30;p=cl(p,10,95);mindLog(t,"_belief");
 const n=m43sev(k);if(roll(p)){oanAdd(t,v,n);belOf(t,v).r+=n;return}
 const L=others(t).filter(x=>x!==v&&(x===S||x.alive&&!x.out));
 if(!L.length||roll(30)){mindLog(t,"_dark");return}/* kept in the dark: she knows a blow fell, not whose */
 const w=L.map(x=>[x,1+oan(t,x)+Math.max(0,-aff(t,x))+15*((t.evm&&t.evm[key(x)])||0)]);let r=Math.random()*w.reduce((a,b)=>a+b[1],0),i=0;while(r>w[i][1]&&i<w.length-1){r-=w[i][1];i++}
 const s=w[i][0];oanAdd(t,s,n);belOf(t,s).w+=n;mindLog(t,"_wrongBelief");t.blamed=t.blamed||{};t.blamed[key(s)]=(t.blamed[key(s)]||0)+1;
 if(s===S&&roll(30+(S.mat||0)*8))noteAdd(t.id,`Nghe nói ${t.name} ngờ ngươi đứng sau chuyện ${ACT[k]?ACT[k].n.toLowerCase():"vừa rồi"}, dù không phải ngươi`)};
/* the belief book fades with the grudges, month by month */
(function(){const o0=oanMonth;oanMonth=function(){const r=o0.apply(this,arguments);try{for(const v of rivals){if(!v.bel)continue;for(const k in v.bel){const b=v.bel[k];b.r=Math.floor(b.r*.8);b.w=Math.floor(b.w*.8);if(!b.r&&!b.w)delete v.bel[k]}}}catch(e){}return r}})();
/* her own hidden blows are guessed by the victim the same way */
const M43HARM=new Set(BANDS.slice(1).flatMap(x=>x[2]).concat(PUSHK));
(function(){const r0=runAct;runAct=function(a,t,k){const r=r0.apply(this,arguments);try{if(a===S&&t&&t!==S&&t.alive&&M43HARM.has(k)&&k!=="accuse"&&k!=="vp"&&k!=="tocao"&&r&&!FAILRX.test(r))mindBelief(t,S,k)}catch(e){}return r}})();
/* wit: every head can slip; acts on a belief she holds wrongly are counted */
(function(){const r0=mindRun;mindRun=function(v,t,k,err){err=err||0;try{const tc=witOf(v);if(!err&&roll(tc>=60?12:tc>=30?18:20)){err=10;mindLog(v,"_mistake");mindLog(v,"_slip")}
  mindLog(v,"_act");const b=v.bel&&t&&v.bel[key(t)];if(b&&(b.w||b.r))mindLog(v,"_actBelief");if(b&&b.w>0&&b.w>=b.r)mindLog(v,"_actWrong")}catch(e){}
 const r=r0.call(this,v,t,k,err);try{if(r&&FAILRX.test(r))mindLog(v,"_fail")}catch(e){}return r}})();
/* a bad week: punished, demoted or fallen makes a head rash for about three weeks */
function m43bad(p){if(p&&typeof p==="object"&&p!==S)p.badWk=bq()}
(function(){const p0=punish;punish=function(p){m43bad(p);return p0.apply(this,arguments)}})();
(function(){const d0=demote;demote=function(p){m43bad(p);return d0.apply(this,arguments)}})();
(function(){const f0=fall;fall=function(p){m43bad(p);return f0.apply(this,arguments)}})();
(function(){const r0=rashOf;rashOf=function(v){const r=r0.apply(this,arguments);if(r)return r;if(v&&v.badWk!=null&&bq()-v.badWk<=9&&roll(25)){mindLog(v,"_badWeek");return 1}return 0}})();
/* tells: the same chance as before, now carried by a named servant of hers; a servant who spies for the schemer keeps it back */
function m43reporter(){const L=[];const seen=new Set();for(const s of [S.maid].concat(S.staff||[])){if(!s||seen.has(s))continue;seen.add(s);L.push(s)}if(!L.length)return null;
 const w=L.map(s=>(s.tr==="lanh"||s.tr==="chuyen"?3:s.tr==="trung"?2:1)*(s.loyal>=60?1.5:1));let r=Math.random()*w.reduce((a,b)=>a+b,0),i=0;while(r>w[i]&&i<w.length-1){r-=w[i];i++}return L[i]}
mindTell=function(v,t,k){mindLog(v,"_tell");try{if(v.plan&&v.plan.due>bq()+3)v.plan.due=bq()+3}catch(e){}/* a tell comes 1-3 buổi before the blow */const tc=witOf(v);let c=12+(S.mat||0)*7+(S.staff||[]).filter(s=>s.tr==="lanh"||s.tr==="chuyen").length*8+(tc<35?15:0)-(tc>=70?8:0)+(t===S&&S.maid&&S.maid.loyal>=70?10:0);
 if(!roll(cl(c,5,80)))return;const s=m43reporter();
 if(s&&s.spyFor&&s.spyFor!=="me"&&(s.spyFor===key(v)||roll(50))){mindLog(v,"_tellWithheld");return}
 mindLog(v,"_tellSeen");const what=TELLS[k]||"có động tĩnh lạ";const txt=`${s?s.name+" về báo: n":"N"}gười của ${v.name} ${what}`;S.tells=S.tells||{};S.tells[v.id]={k,t:key(t),bq:bq()};
 try{newsAdd(v,k,txt,true)}catch(e){}noteAdd(v.id,`${s?s.name:"Tai mắt"} báo: ${what}${t===S?" (có lẽ nhắm vào ngươi)":` (có lẽ nhắm vào ${NM(t)})`}`);
 if(t===S){S.onGuard=S.onGuard||{};S.onGuard[v.id]=k;if(!S.dead)Q.push({t:"Tai mắt báo tin",h:`<p>${txt}.</p><p>Có lẽ nàng đang nhắm vào ngươi. Ngươi đã đề phòng: vài buổi tới mưu của nàng khó thành hơn; dò la hoặc tố giác nàng thì càng chắc.</p>`,who:{w:["r",v.id]}})}
 else log(`${txt}.`)};
/* the wit scale: rivals' Tâm cơ runs about 5-55, so j40's marks (30 / 35 / 60 / 70) read on a stretched scale (x1.6), every head alike; without it no rival ever reached "patient" */
witOf=function(v){return cl(Math.round(1.6*(v===S?S.tamco||0:v.tamco||0)),0,100)};
/* a slight is a real blow (Oán +5 or more at once), not every small rub; smaller rubs leave the mood as it was */
(function(){const o0=oanAdd;oanAdd=function(x,y,n){const had=x&&x!==S?x.slightAt:undefined;const r=o0.apply(this,arguments);try{if(x&&x!==S&&n>0&&n<5){if(had===undefined)delete x.slightAt;else x.slightAt=had}}catch(e){}return r}})();

/* ================= CUNG NỮ: A TRUE SERVANT START (origin 'cnv') =================
   She enters as a palace maid of a rival consort (the mistress), below Đáp ứng. While S.srv is set and not risen she is
   NOT a consort: consorts() leaves her out, the week / month run the world for the rivals and her own servant life
   (chores in khắc, the mistress's moods by trait, wage, servant rank by the j14 ladder, orders, bribes, frames).
   Roads up: the Emperor's notice -> Đáp ứng (then the normal consort game), chưởng sự -> ma ma, ban gả (ending).
   Roads down: punishment, Tân Giả khố (laundry), death in a scheme.
   Access: placeEnterHook(p,place) -> {ok,why} | null (no opinion); also plugged into j41 accRole / canEnter / accessOf. */
ORIGINS.push({k:"cnv",n:"Cung nữ tuyển vào cung",r:0,o:{},hh:0,th:0,t:"Con nhà thường dân, qua kỳ tuyển cung nữ của Nội vụ phủ. Ngươi vào cung làm kẻ hầu, dưới cả Đáp ứng."});
NAMES.tin="Chủ tin";NAMES.nt="Hoàng thượng để ý";
RKEYS.push(["tin","Chủ tin"],["nt","Hoàng thượng để ý"]);
Object.assign(HX,{tin:"Chủ tin: lòng tin của chủ nhân với ngươi (0-100). Cao thì được thưởng, tiến cử; dưới 10 dễ bị đày Tân Giả khố.",nt:"Hoàng thượng để ý: ngài có nhớ mặt ngươi không. Từ 45 trở lên, ngài có thể hỏi tên và phong Đáp ứng.",srk:"Bậc cung nữ: Cung nữ → Đại cung nữ → Chưởng sự cô cô. Bậc cao nhất tùy phẩm của chủ.",merit:"Công lao: làm việc, được chủ tiến cử. Đủ thì cuối tháng Nội vụ phủ thăng bậc (cần Chủ tin 35).",wage:"Lương tháng theo bậc cung nữ.",age:"Cung nữ được xuất cung năm 25 tuổi. Chưởng sự có thể ở lại làm ma ma.",lau:"Tân Giả khố: giặt đồ chịu phạt. Hết hạn thì Nội vụ phủ chia về hầu chủ mới.",sec:"Số chuyện mờ ám của chủ mà ngươi biết. Có thể mật báo để lấy thưởng, nhưng chủ biết thì nguy.",spy:"Ngươi nhận bạc làm tai mắt cho người khác."});
Object.assign(HXN,{tin:"Chủ tin",nt:"Để ý"});
STORY.cnv={t:"Từ cung nữ lên phi tần",n:3,goal:"Ngươi vào cung làm cung nữ. Được Hoàng thượng để mắt mà phong Đáp ứng, rồi leo lên Tần.",init(){},
 hint:()=>["Được Hoàng thượng để mắt, phong Đáp ứng","Lên Thường tại","Lên Tần"][S.st.step]||"",
 calc:()=>!S.srv||!S.srv.risen?0:S.rank>=3?3:S.rank>=1?2:1,
 month(){if(S.srv&&S.srv.risen&&S.rank>=3&&!S.st.done){stEnd(1,"Từ cung nữ lên Tần");return `<b class="g">Từ thân cung nữ, ngươi đã lên Tần.</b> `}return ""}};
const CNV_WAGE=[1,3,5,8,12];
const WEDW=["Thân vương Dụ","Thị lang bộ Lễ họ Trương","Tham tướng cấm quân họ Lục","Tiến sĩ họ Tô vừa đỗ khoa này"];
function isSrv(){return !!(S&&S.srv&&!S.srv.risen)}
function srvM(){return S&&S.srv?RV(S.srv.mid):null}
function bid(){return wk()*3+(S.buoi||0)}
function srvTitle(){if(!S||!S.srv)return"";if(S.srv.lau>0)return"Cung nữ Tân Giả khố";const m=srvM();const n=S.srv.mama?"Ma ma":SRK.maid[S.srv.rk]||"Cung nữ";return m?`${n} của ${m.name}`:n}
function srvRkN(){return S.srv.lau>0?"Cung nữ Tân Giả khố":S.srv.mama?"Ma ma":SRK.maid[S.srv.rk]||"Cung nữ"}
function srvW(f){if(!isSrv())return f();const o=S.out;S.out=1;try{return f()}catch(e){console.error(e);return""}finally{S.out=o}}
function srvMerit(n){S.srv.mp=(S.srv.mp||0)+n}
function srvOnce(k,sc){const v=S.srv.once[k];return !!v&&(sc==="b"?v.b===bid():v.w===wk())}
function srvWhere(v){const w=whereOf(v);if(!w||w==="home"||w==="tgk")return palaceOf(v);try{return places().some(x=>x.k===w)?w:palaceOf(v)}catch(e){return palaceOf(v)}}
function srvMisHome(){const m=srvM();return !!m&&srvWhere(m)===palaceOf(m)}
function misAdj(m){return (m.trait==="Hiền lành"||m.trait==="Nhu mì"?10:m.trait==="Kiêu ngạo"||m.trait==="Hiểm độc"?-8:0)+(S.tin-40)/5}
function srvAf(s,n){S.srv.af[s.sid]=cl((S.srv.af[s.sid]||0)+n,-100,100)}
function srvColleagues(){const m=srvM();const L=(m&&m.staff||[]).slice();for(const sid of S.srv.met||[]){const s=servById(sid);if(s&&!L.includes(s))L.push(s)}return L.slice(0,10)}
function srvFriendList(){return srvColleagues().filter(s=>(S.srv.af[s.sid]||0)>=30)}
function srvMax(){const m=srvM();return m?srkMax(m,{role:"maid"}):2}
function srvToast(msg){if(window.__bot)return;let t=$("rtoast");if(!t){t=document.createElement("div");t.id="rtoast";document.body.appendChild(t)}t.onclick=()=>t.classList.remove("on");
 t.className="rtoast bad";t.innerHTML=`<b class="seal">CẤM</b><div class="rt"><b>${msg}</b></div>`;void t.offsetWidth;t.classList.add("on");clearTimeout(window.__rtT);window.__rtT=setTimeout(()=>t.classList.remove("on"),2600)}

/* ---------- start: the consort start runs, then she is turned into a maid of a random rival ---------- */
function srvInit(){const L=liveRivals(true);if(!L.length)return;const m=pick(L.filter(v=>v.rank>=1).length?L.filter(v=>v.rank>=1):L);
 S.srv={mid:m.id,rk:1,mp:0,lau:0,rk0:1,lw:0,af:{},know:{},met:[],sec:0,msch:m.schemes||0,intel:[],spyFor:null,betray:null,sent:null,err:null,once:{},mama:0,risen:0};
 S.tin=40+R(11);S.nt=0;S.sung=0;S.danh=2;S.bac=6+R(6);S.age=18+R(3);S.rank=0;S.staff=[];S.lot=null;S.pal=null;S.resHead=null;S.mat=0;S.tonight=null;S.shop=[];
 if(!m.staff)m.staff=[];if(!m.staff.length)try{fillStaff(m,true)}catch(e){}
 for(const s of m.staff)S.srv.af[s.sid]=R(21)-5;
 for(const s of allServ().filter(x=>ownerOf(x)!==m&&ownerOf(x)!==S).sort(()=>Math.random()-.5).slice(0,3)){S.srv.met.push(s.sid);S.srv.af[s.sid]=R(41)-20}
 S.place="home";S.visit=srvVisitOf("home");tab="act";
 Q=[{t:"Nhập cung làm cung nữ",faces:[[pMe(),S.name],[pv(m),m.name]],h:`<p>${S.name}, ${S.age} tuổi, con nhà thường dân. Qua kỳ tuyển cung nữ, Nội vụ phủ chia ngươi về hầu <b>${rkName(m)} ${m.name}</b> ở ${palName(palaceOf(m))}.</p>
  <p>Tính chủ: <b>${m.trait}${m.trait2?", "+m.trait2:""}</b>. Chủ tin ngươi: <b>${S.tin}</b>. Lương tháng ${CNV_WAGE[1]} bạc.</p>
  <p><b>Đường lên:</b> được Hoàng thượng để mắt mà phong Đáp ứng; lên Chưởng sự cô cô; được ban gả. <b>Đường xuống:</b> bị phạt, đày Tân Giả khố, chết trong mưu của người khác.</p>
  <p class="past">Mỗi buổi 4 khắc. Mục Việc: việc nặng và việc chủ sai. Bản đồ: chỉ nơi cung nữ được đến. Đồng liêu: kết bạn, đề phòng kẻ vu cáo.</p>`}];
 log(`Ngươi vào cung làm cung nữ, hầu ${rkName(m)} ${m.name}.`)}
(function(){const s0=start;start=function(){const r=s0.apply(this,arguments);try{if(S&&S.origin&&S.origin.k==="cnv"&&!S.srv){quiet=true;srvInit();quiet=false;deal();showModal();render()}}catch(e){console.error(e)}return r}})();

/* ---------- she is not a consort while she serves ---------- */
(function(){const c0=consorts;consorts=function(){const L=c0.apply(this,arguments);return isSrv()?L.filter(p=>p!==S):L}})();
(function(){const r0=rivalsBuoi;rivalsBuoi=function(){if(isSrv())return srvW(()=>r0.apply(this,arguments))||"";return r0.apply(this,arguments)}})();
(function(){const a0=apply;apply=function(o){const r=a0.apply(this,arguments);if(S){if(S.tin!=null)S.tin=cl(S.tin,0,100);if(S.nt!=null)S.nt=cl(S.nt,0,100)}return r}})();
(function(){const p0=pMe;pMe=function(){const f=p0.apply(this,arguments);if(isSrv()){f.rk="sv"+S.srv.rk;f.rw=srvRkN();f.col="#b9a48a"}return f}})();

/* ---------- access: one hook (j41 calls it through accRole; canEnter / accessOf wrapped if present) ---------- */
(function(){const prev=typeof window.placeEnterHook==="function"?window.placeEnterHook:null;
 window.placeEnterHook=function(p,place){const k=typeof place==="string"?place:place&&place.k;if(p!==S||!isSrv()||!k)return prev?prev(p,place):null;
  if(S.srv.lau>0)return k==="tgk"?{ok:true,why:""}:{ok:false,why:"đang chịu phạt ở Tân Giả khố"};
  const m=srvM(),mk=m&&palaceOf(m);
  if(k==="home"||k===mk||k==="tgk")return{ok:true,why:""};
  if(typeof accHas==="function"&&accHas(S,k))return{ok:true,why:"có lệnh"};
  const sn=S.srv.sent;if(sn&&!sn.done&&sn.k===k&&sn.until>=bid())return{ok:true,why:"chủ sai đi"};
  if(m&&k===srvWhere(m))return{ok:true,why:"theo hầu chủ"};
  if(k==="vuon"||k==="tyv")return{ok:true,why:""};
  if(k==="lc")return S.srv.rk>=2?{ok:true,why:""}:{ok:false,why:"chỉ Đại cung nữ mới được sai đưa cơm lãnh cung"};
  const why={dtd:"cung nữ không được tự vào tẩm điện",thu:"không có lệnh, không được bén mảng",tn:"chỉ khi chủ sai hoặc theo hầu chủ",ksp:"việc của thái giám",kn:"chỉ khi chủ sai"}[k];
  return{ok:false,why:why||"cung khác: chỉ khi chủ sai"}};
 if(typeof accRole==="function")accRole((p,k)=>{if(p!==S||!isSrv())return null;const h=window.placeEnterHook(S,k);return h?(h.ok?{ok:true}:{ok:false,why:h.why}):null});
 ["canEnter","accessOf"].forEach(nm=>{const f=window[nm];if(typeof f!=="function"||nm==="accessOf"&&typeof accRole==="function")return;window[nm]=function(p,place){const r=f.apply(this,arguments);
  try{if(isSrv()&&(p===S||typeof p==="string"||p==null)){const k=typeof p==="string"?p:typeof place==="string"?place:place&&place.k;const h=window.placeEnterHook(S,k);if(h){if(typeof r==="boolean")return h.ok;if(r&&typeof r==="object")return Object.assign({},r,{ok:h.ok,why:h.why||r.why});return h}}}catch(e){}return r}})})();

/* ---------- places and people ---------- */
(function(){const p0=placeOf;placeOf=function(k){if(k==="tgk")return{k,n:"Tân Giả khố",d:"Nơi cung nhân bị phạt giặt giũ ngày đêm.",sc:"lc"};
 if(k==="home"&&isSrv()){const m=srvM();return{k,n:`Phòng cung nữ · ${m?palName(palaceOf(m)):""}`,d:"Dãy phòng nhỏ sau hậu điện, nơi cung nữ ăn ngủ.",sc:"home"}}return p0.apply(this,arguments)}})();
function srvVisitOf(k){const ppl=[];let msg="";const m=srvM();const W=S.where||{};const P=(sk,o)=>ppl.push(Object.assign({kind:"srv",sk},o));
 const rvP=v=>P(v.queen?"hh":v===m?"mis":"rv",{ref:v,name:(v.queen?"Hoàng hậu ":"")+v.name,ini:v.name.split(" ").pop()[0],col:RCOL[rkOf(v)],info:`${rkName(v)}${v===m?" · chủ nhân của ngươi":""} · ${v.trait}`});
 const svP=(s,o)=>{P("sv",{ref:s,sid:s.sid,name:s.name,ini:s.name.split(" ").pop()[0],col:"#b9a48a",info:`${srkName(s)} · ${o===m?"cùng cung":o?"người của "+o.name:"Nội vụ phủ"}`});if(o!==m&&!S.srv.met.includes(s.sid))S.srv.met.push(s.sid)};
 if(k==="tgk")return{k,people:ppl,talked:false,tk:{},msg:"Nước giặt lạnh buốt, chậu gỗ chất cao. Quản sự cầm roi đứng canh."};
 if(k==="home"){const mk=m&&palaceOf(m);if(W.emp===mk)P("emp",{name:"Hoàng thượng",ini:"帝",col:"#f0d070",info:"Hoàng thượng · đang ở cung chủ"});
  if(m&&srvWhere(m)===mk)rvP(m);else if(m)msg=`${m.name} đi vắng, đang ở ${placeOf(srvWhere(m)).n}.`;
  for(const s of (m&&m.staff||[]).slice(0,4))svP(s,m)}
 else{if(W.emp===k)P("emp",{name:"Hoàng thượng",ini:"帝",col:"#f0d070",info:"Hoàng thượng"});
  for(const v of liveRivals(true).filter(v=>srvWhere(v)===k).slice(0,4))rvP(v);
  if(k[0]==="r"||k==="kn"){const hd=accHostK(k);for(const s of (hd&&hd.staff||[]).slice(0,2))svP(s,hd)}
  if(k==="tyv")P("ty",{name:"Thái y Trương",ini:"醫",col:"#8fc38a",info:"Thái y viện"})}
 const sn=S.srv.sent;if(sn&&!sn.done&&sn.k===k&&sn.until>=bid())P("task",{name:"Việc chủ sai",ini:"務",col:"#c9a46a",info:sn.n});
 if(!msg)msg=ppl.length?`Ở đây có ${ppl.length} người.`:"Không gặp ai.";
 return{k,people:ppl,talked:false,tk:{},msg}}
function accHostK(k){if(k==="kn")return rivals.find(v=>v.queen&&v.alive&&!v.out)||null;return RV(+k.slice(1))}
(function(){const h0=homePeople;homePeople=function(){if(isSrv())return srvVisitOf("home").people;return h0.apply(this,arguments)}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="srv"){if(p.sk==="emp")return pEmp();if(p.sk==="ty")return f0({kind:"ty"});
 if(p.sk==="sv"){const s=servById(p.sid);return s?pServ(s):{src:"",ini:p.ini,col:p.col}}if(p.ref&&p.ref.id!=null){const v=RV(p.ref.id);if(v)return pv(v)}return{src:"",ini:p.ini,col:p.col}}return f0(p)}})();
function srvGoTo(k){if(!S||S.dead||Q.length)return false;popIdx=null;popMsg="";const m=srvM();if(m&&k===palaceOf(m))k="home";
 if(S.srv.lau>0||k==="tgk"){S.place="tgk";S.visit=srvVisitOf("tgk");if(k!=="tgk")srvToast("Đang chịu phạt ở Tân Giả khố");render();return k==="tgk"}
 if(k==="home"){S.place="home";S.visit=srvVisitOf("home");render();return true}
 const h=window.placeEnterHook(S,k);if(h&&!h.ok){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast(`${placeOf(k).n}: ${h.why}`);render();return false}
 const from=S.place==="home"&&m?palaceOf(m):S.place;const tc=travel(from,k);if(!can(tc+1)){if(!S.visit||S.visit.k!==S.place)S.visit=srvVisitOf(S.place);srvToast(whyTime(tc+1)||"Hết khắc buổi này");render();return false}
 spend(tc);S.place=k;S.visit=srvVisitOf(k);log(`Đến ${placeOf(k).n}.`);render();return true}
(function(){const g0=goTo;goTo=function(k){if(!isSrv())return g0.apply(this,arguments);const wasMap=tab==="go";const ok=srvGoTo(k);if(ok&&wasMap&&!S.dead&&S.place!=="home"){window.__fromMap=1;tab="act";render()}return ok}})();

/* ---------- talking to people as a maid ---------- */
function srvTalk(p){const m=srvM();const A=[];if(!m)return A;
 const T=(n,o,w,l,x,ex,more)=>A.push(Object.assign({n,o,w:w||{},l:l||{},x,run(){const ok=o>=100||roll(o);apply(ok?(w||{}):(l||{}));const r=ex?ex(ok)||"":"";return `${o<100?(ok?'<span class="g">thành</span>. ':'<span class="r">hỏng</span>. '):""}${fmt(ok?w:l)}${r?" "+r:""}`}},more||{}));
 if(p.sk==="mis"){T("Đấm lưng, hầu chuyện",od(45+S.sac/10+S.tai/10+misAdj(m)),{tin:3},{tin:-1},"công lao +0.25",ok=>{srvMerit(.25);return ok?`${m.name} dịu nét mặt.`:`${m.name} gắt: “Lui ra!”`});
  T("Xin chủ ban thưởng",od(40+S.tin/2),{bac:3+rkOf(m)},{tin:-4},"",null,{lock:S.tin<60,t:"Cần Chủ tin 60"});
  const iv=(S.srv.intel||[]).map(RV).filter(v=>v&&v.alive&&v!==m)[0];
  T("Bẩm tin dò được",100,{tin:5},{},iv?`chủ nắm 1 chứng cứ của ${iv.name}`:"",()=>{if(iv){evA(m,iv,1);S.srv.intel.splice(S.srv.intel.indexOf(iv.id),1)}},{lock:!iv,t:"Chưa dò được tin gì"});
  T("Xin chủ tiến cử lên Nội vụ phủ",od(30+S.tin/2),{},{tin:-3},"công lao +3",ok=>{if(ok)srvMerit(3)},{lock:S.tin<50||S.srv.rk>=srvMax(),t:S.srv.rk>=srvMax()?"Đã ở bậc cao nhất cung này cho phép":"Cần Chủ tin 50"})}
 if(p.sk==="emp"){T("Quỳ dâng trà",od(25+S.sac/2.5+S.tai/10+mm()),{},{tin:-1},"Hoàng thượng để ý +8 · chủ có thể ghen",ok=>{if(ok)srvNotice("meet",8);return ok?"Ngài nhận chén trà, liếc nhìn ngươi.":"Tay run, trà sóng ra khay."});
  T("Cúi đầu lui tránh",100,{duc:1},{},"giữ phận",null)}
 if(p.sk==="rv"||p.sk==="hh"){const v=p.ref&&RV(p.ref.id);if(v&&v!==m){T("Hành lễ thỉnh an",100,{danh:1},{},`${v.name} thiện cảm +2`,()=>{affAdd(v,S,2)});
   const hostile=p.sk==="hh"||hostility(v,m)>=20;
   T(`Mật báo chuyện của ${m.name}`,100,{bac:15,danh:1},{},`${v.name} nắm 2 chứng cứ của ${m.name} · chủ có thể phát hiện`,()=>{evA(v,m,2);S.srv.sec=Math.max(0,S.srv.sec-1);S.srv.betray={by:v.id};return `${v.name} lặng nghe, dúi vào tay ngươi một túi bạc.`},{lock:!(S.srv.sec>0&&hostile),t:S.srv.sec>0?"Nàng không thù chủ ngươi":"Chưa biết chuyện gì của chủ"});
   if(p.sk==="hh")T(`Tố cáo ${m.name} trước Hoàng hậu`,od(30+S.srv.sec*15+S.danh/5),{danh:3,bac:30},{suc:-20},`${m.name} bị xét tội · ngươi về hầu Hoàng hậu`,ok=>{if(ok){S.srv.sec=0;const a0=ACTX.a;ACTX.a=v;try{fall(m,"bị cung nữ tố giác, chứng cứ rành rành")}finally{ACTX.a=a0}srvReassign("Hoàng hậu giữ ngươi lại làm chứng.",v);return `${m.name} bị xét tội.`}S.srv.betray={by:v.id};return "Hoàng hậu không tin lời một cung nữ."},{lock:S.srv.sec<2,t:"Cần biết ít nhất 2 chuyện của chủ",act:1})}
  else if(v===m)T("Hầu bên cạnh chủ",od(55+misAdj(m)),{tin:2},{tin:-1},"",null)}
 if(p.sk==="sv"){const s=servById(p.sid);if(s){T("Trò chuyện",od(55+S.duc/5+S.sac/10),{},{},"thiện cảm +10",ok=>{srvAf(s,ok?10:-3);if(roll(35))S.srv.know[s.sid]=1;return ok?`${s.name} cười nói vui vẻ.`:`${s.name} lạnh nhạt.`});
   T("Biếu quà nhỏ",100,{},{},"thiện cảm +12",()=>{srvAf(s,12)},{c:{bac:-5}})}}
 if(p.sk==="ty"){T("Xin thuốc bổ",100,{suc:15},{},"",null,{c:{bac:-6}});T("Học lỏm nghề thuốc",od(40+S.tai/3),{tai:1},{},"",ok=>{if(ok&&roll(30))S.arts.y=Math.min(5,(S.arts.y||0)+1)})}
 if(p.sk==="task"){const sn=S.srv.sent;if(sn)T(`Làm xong: ${sn.n}`,100,{tin:3},{},"công lao +1",()=>srvErrandDone())}
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){if(p&&p.kind==="srv")return isSrv()?srvTalk(p):[];return t0.apply(this,arguments)}})();
function srvErrandDone(){const sn=S.srv.sent;if(!sn||sn.done)return"";sn.done=1;srvMerit(1);const W=S.where||{};let r="Xong việc chủ sai.";
 if((sn.k==="thu"||sn.k==="vuon")&&W.emp===sn.k&&roll(od(30+S.sac/3))){srvNotice("errand",6);r+=" Hoàng thượng ngẩng lên nhìn ngươi."}
 if(sn.k==="tn"){apply({danh:1});r+=" Ma ma Đức Thọ cung khen ngươi lễ phép."}
 if(sn.v){const v=RV(sn.v),m=srvM();if(v&&m)relAdd(m,v,3)}
 return r}
function srvNotice(src,gain){if(!S||(S.age||0)<18)return;const g=gain||(6+Math.round(S.sac/12));S.nt=cl(S.nt+g+Math.round(S.sac/20),0,100);const m=srvM();
 if(m&&roll(30+(m.malice||40)/3)){const d=m.trait==="Hiểm độc"||m.trait==="Kiêu ngạo"?8:4;apply({tin:-d});log(`<span class="r">${m.name} thấy Hoàng thượng nhìn ngươi, sa sầm nét mặt.</span> Chủ tin -${d}.`)}
 if(S.nt>=45&&roll(S.nt/2-10))pushDil(mkP("cnvName",{src}),"Hoàng thượng hỏi tên")}

/* ---------- the day's cards (Việc) ---------- */
function srvErrPick(){const m=srvM();const L=[{k:"tyv",n:"Sang Thái y viện lấy thuốc cho chủ"},{k:"vuon",n:"Ra Ngự hoa viên hái hoa cắm bình"},{k:"thu",n:`Mang canh sang Cần Chính điện dâng thay ${m.name}`}];
 if(!S.thDead)L.push({k:"tn",n:"Mang kinh chép tay sang Đức Thọ cung"});
 const fr=liveRivals(true).filter(v=>v!==m&&aff(m,v)>=0&&palaceOf(v)!==palaceOf(m));if(fr.length){const v=pick(fr);L.push({k:palaceOf(v),n:`Mang quà sang cung ${v.name}`,v:v.id})}
 return pick(L)}
function srvCards(){const m=srvM();const X=[];if(!m)return X;const B=bid();const home=srvMisHome();
 const med={n:"Mua thuốc bổ",t:"Mua chén thuốc bổ của tiểu thái giám bán rong.",k:1,c:{bac:-8},o:100,w:{suc:20},once:"med"};
 if(S.srv.lau>0){
  X.push({n:"Giặt đồ",t:"Vò từng chậu y phục của cung nhân trong nước lạnh.",k:2,c:{suc:-10},o:100,w:{},x:`6 lần giặt: được về sớm 1 tuần (nay ${S.srv.lw||0}/6)`,rep:1,go:()=>{S.srv.lw=(S.srv.lw||0)+1;if(S.srv.lw>=6){S.srv.lw=0;S.srv.lau=Math.max(1,S.srv.lau-1);log("Quản sự gật đầu: bớt một tuần phạt.")}}});
  X.push({n:"Nghỉ tay một lát",t:"Ngồi sau chồng chậu, thở một hơi.",k:1,c:{},o:od(70),w:{suc:8},l:{suc:-3},x:"",rep:1,fail:()=>{S.srv.lau++;log("Bị quản sự bắt gặp: thêm một tuần phạt.")}});
  if(!srvOnce("plea"))X.push({n:"Cầu xin quản sự",t:"Dúi bạc, xin được tha về sớm.",k:1,c:{bac:-10},o:od(20+S.danh/2+srvFriendList().length*8),w:{},l:{},x:"được về cuối tuần này",once:"plea",go:()=>{S.srv.lau=1}});
  if(S.suc<50&&!srvOnce("med"))X.push(med);
  X.forEach(a=>a.dom="");return X}
 X.push({n:S.srv.rk>=2?"Đốc thúc cung nữ quét dọn":"Quét sân, lau điện",t:S.srv.rk>=2?"Đi một vòng hậu điện, sai bảo cung nữ dưới.":"Quét lá ngoài sân, lau bàn ghế trong điện.",k:1,c:{suc:S.srv.rk>=2?-2:-5},o:100,w:{tin:1},x:"công lao +0.5",rep:1,go:()=>srvMerit(.5)});
 X.push({n:"Dâng trà, hầu điểm tâm",t:home?`Pha trà dâng ${m.name}.`:`${m.name} đi vắng: chờ chủ về`,k:1,c:{suc:-2},o:od(50+S.sac/10+S.tai/10+misAdj(m)),w:{tin:2},l:{tin:-2},x:"công lao +0.25",rep:1,lock:!home,go:()=>srvMerit(.25)});
 const mw=srvWhere(m);if(mw!==palaceOf(m)&&S.place!==mw&&!srvOnce("follow","b"))X.push({n:"Theo hầu chủ",t:`${m.name} đang ở ${placeOf(mw).n}. Ngươi theo hầu.`,k:1,c:{},o:100,w:{tin:1},x:"đến nơi chủ đang ở",once:"follow",onceS:"b",go:()=>srvGoTo(mw)});
 if(!srvOnce("nvp","b"))X.push({n:"Lĩnh đồ ở Nội vụ phủ",t:"Lĩnh than, nến, vải vóc theo phần của cung.",k:2,c:{suc:-8},o:100,w:{tin:2},x:"công lao +0.5 · có thể gặp người",once:"nvp",onceS:"b",go:()=>{srvMerit(.5);srvMeet()}});
 X.push({n:"Học lễ nghi với cô cô",t:"Đứng nghe cô cô dạy cách đi đứng, dâng trà, quỳ lạy.",k:1,c:{suc:-3},o:100,w:{duc:1},x:"công lao +0.25",rep:1,go:()=>srvMerit(.25)});
 X.push({n:"Luyện thêu thùa, chữ nghĩa",t:"Lén học chữ, thêu hoa dưới đèn dầu.",k:1,c:{suc:-3},o:od(60),w:{tai:1},l:{},rep:1});
 X.push({n:"Chải chuốt, giữ nhan sắc",t:"Phấn rẻ, nước giếng, ngủ đủ giấc.",k:1,c:{bac:-3},o:od(55),w:{sac:1},l:{},rep:1});
 const strict=home&&(m.trait==="Kiêu ngạo"||m.trait==="Hiểm độc");
 X.push({n:"Nghỉ lấy sức",t:strict?`Chợp mắt; ${m.name} ghét kẻ lười.`:"Chợp mắt trong phòng cung nữ.",k:1,c:{},o:strict?od(70):100,w:{suc:12},l:{suc:6,tin:-3},x:"",rep:1});
 X.push({n:"Thêu khăn bán ra ngoài",t:"Nhờ thái giám mang ra cửa Thần Vũ bán.",k:2,c:{suc:-6},o:od(70),w:{bac:6},l:{danh:-2,tin:-2},rep:1});
 if(S.suc<50&&!srvOnce("med"))X.push(med);
 if(S.srv.rk>=3&&!srvOnce("so"))X.push({n:"Quản sổ sách trong cung",t:"Giữ sổ đồ dùng, sắp việc cho cung nữ dưới.",k:2,c:{suc:-4},o:od(75),w:{bac:4,tin:2,danh:1},l:{tin:-2},x:"công lao +0.5",once:"so",go:()=>srvMerit(.5)});
 if(!S.srv.err||S.srv.err.b!==B)S.srv.err=roll(45)?Object.assign({b:B},srvErrPick()):{b:B,none:1};
 const er=S.srv.err;if(!er.none&&!er.acc)X.push({n:"Việc chủ sai",t:er.n+".",k:1,c:{},o:100,w:{},x:"được vào nơi ấy buổi này · đến nơi chạm “Việc chủ sai”",go:()=>{er.acc=1;S.srv.sent={k:er.k,n:er.n,until:B,done:0,v:er.v||null};srvGoTo(er.k)}});
 if(S.tonight&&S.tonight!=="me"&&S.tonight.id===m.id&&!srvOnce("tea")){
  X.push({n:"Hầu trà khi ngự giá",t:`Tối nay Hoàng thượng ngự giá đến cung ${m.name}. Ngươi bưng khay trà vào điện.`,b:2,k:1,c:{},o:od(25+S.sac/2.5+S.tai/10+S.nt/5),w:{},l:{tin:-1},x:"Hoàng thượng để ý +8 · chủ có thể ghen",once:"tea",go:()=>srvNotice("tea",8)});
  X.push({n:"Lui sau bình phong",t:"Để chủ nhân một mình hầu ngài.",b:2,k:1,c:{},o:100,w:{tin:2},once:"tea"})}
 if(S.srv.spyFor!=null&&!srvOnce("spy")){const v=RV(S.srv.spyFor);if(v&&v.alive)X.push({n:`Lén báo tin cho ${v.name}`,t:"Kể chuyện trong cung chủ cho người đã mua chuộc ngươi.",k:1,c:{},o:od(70+S.tamco/5),w:{bac:8},l:{tin:-15},x:`${v.name} nắm 1 chứng cứ của ${m.name}`,once:"spy",go:()=>evA(v,m,1),fail:()=>{if(roll(40))srvLaundry(`${m.name} bắt gặp ngươi lén lút với người của ${v.name}.`,8)}})}
 X.forEach(a=>a.dom="");return X}
function srvMeet(){const m=srvM();const L=allServ().filter(s=>ownerOf(s)!==m&&!S.srv.met.includes(s.sid));
 if(roll(25)){apply({suc:-5});log("Tiểu thái giám Nội vụ phủ bắt nạt, bắt ngươi xách thêm hai gánh nước. Sức -5.");return}
 if(L.length){const s=pick(L);S.srv.met.push(s.sid);srvAf(s,5);log(`Ở Nội vụ phủ ngươi quen ${s.name}, ${srkName(s).toLowerCase()} của ${NM(ownerOf(s))}.`)}}
(function(){const d0=deal;deal=function(){if(isSrv()){deck=srvCards();return}return d0.apply(this,arguments)}})();
(function(){const a0=act;act=function(i){const a=deck[i];const was=a&&a.done;const r=a0.apply(this,arguments);
 try{if(isSrv()&&a&&a.done&&!was&&!S.dead){if(a.once){S.srv.once[a.once]={w:wk(),b:bid()};deck.forEach(x=>{if(x.once===a.once)x.done=1})}if(a.rep)a.done=0;render()}}catch(e){console.error(e)}return r}})();

/* ---------- the week, the month ---------- */
(function(){const n0=nextBuoi;nextBuoi=function(){if(!isSrv())return n0.apply(this,arguments);const b0=bid();const r=n0.apply(this,arguments);if(isSrv()&&!S.dead&&bid()!==b0&&(S.buoi||0)>0){deal();render()}return r}})();
(function(){const e0=endTurn;endTurn=function(){if(isSrv())return srvEndTurn();return e0.apply(this,arguments)}})();
function srvEndTurn(){if(S.dead||Q.length||S.mg)return;S.buoi=0;const q0=Q.length;let ev="";
 srvMisCheck();
 ev+=srvW(()=>resolveTonight()||"");ev+=srvW(()=>rivalsTurn()||"");if(S.dead)return;
 if(S.srv.lau>0){S.suc=cl(S.suc+5,0,100);S.srv.lau--;if(S.srv.lau<=0)srvFromLaundry()}
 else{S.suc=cl(S.suc+10,0,100);try{srvWeek()}catch(e){console.error(e)}}
 if(S.dead)return;
 if(S.suc<=0)return die(S.srv.lau>0?"Kiệt sức chết giữa đống đồ giặt ở Tân Giả khố":"Lao lực kiệt sức mà chết");
 if(S.tuan===2){ev+=srvMonth();if(S.dead)return}else S.tuan++;
 if(!isSrv())return;
 rollWx();S.place=S.srv.lau>0?"tgk":"home";try{placeWhere()}catch(e){}used=0;popIdx=null;popMsg="";
 srvW(()=>flip());srvW(()=>{palFix();tuyenTu()});S.visit=srvVisitOf(S.place);
 const m=srvM();if(ev){log(ev);if(m&&ev.includes(m.name)&&!quiet)Q.splice(q0,0,{t:"Tin về chủ nhân",who:pv(m),h:`<p class="past">${when()}</p><p>${ev}</p>`})}
 curtain();deal();render();if(Q.length&&$("modal").hidden)showModal()}
function srvWeek(){srvMisCheck();const m=srvM();if(!m||!isSrv())return;
 if(roll(32))srvMoodEvent();else if(roll(Math.max(2,(m.malice||40)/8)))srvOrder();else if(roll(7))srvBribeOffer();else if(roll(8))srvFramedEvent();else if(roll(12))srvFriendTip()}
function srvMonth(){let ev="";S.turn++;const rk=S.srv.rk;apply({bac:CNV_WAGE[rk]});log(`Lĩnh lương tháng: ${CNV_WAGE[rk]} bạc.`);
 ev+=srvW(()=>{let e="";for(const v of liveRivals(true))stipend(v);e+=rivalsMonth()||"";e+=servRanks()||"";e+=servMonth()||"";oanMonth();restock();e+=heirMonth()||"";e+=moodMonth()||"";return e})||"";
 if(S.dead)return ev;srvMisCheck();const m=srvM();
 if(isSrv()&&S.srv.lau<=0&&m){S.srv.mp+=1+Math.floor(rkOf(m)/3);const need=(S.srv.rk+1)*5,mx=srvMax();
  if(S.srv.mp>=need&&S.srv.rk<mx&&S.tin>=35){S.srv.rk++;S.srv.mp=0;S.tin=cl(S.tin+5,0,100);log(`<b class="g">Được thăng ${SRK.maid[S.srv.rk]}.</b>`);Q.push({t:"Thăng bậc",who:pMe(),h:`<p>Nội vụ phủ ghi công: ngươi được thăng <b>${SRK.maid[S.srv.rk]}</b> trong cung ${m.name}.</p><p class="past">Lương tháng ${CNV_WAGE[S.srv.rk]} bạc.</p>`})}
  else if(S.srv.mp>need)S.srv.mp=need;
  if(S.srv.rk>=2&&S.age>=18&&roll(1.2+S.nt/25))pushDil(mkP("cnvName",{src:"month"}),"Hoàng thượng để mắt");
  else if(S.srv.rk>=2&&roll(1.5)){const big=liveRivals(true).find(x=>x!==m&&rkOf(x)>rkOf(m)+1&&(x.bac||0)>=60);if(big){ap(big,{bac:-40});srvReassign(`${big.name} bỏ bạc mua ngươi về cung mình.`,big)}}
  const mm2=srvM();const d=(mm2.schemes||0)-(S.srv.msch||0);S.srv.msch=mm2.schemes||0;if(d>0&&roll(60)){S.srv.sec++;log(`Ngươi để ý thấy ${mm2.name} đang bày mưu hại người. (Biết chuyện của chủ: ${S.srv.sec})`)}
  if(S.srv.spyFor!=null){const v=RV(S.srv.spyFor);if(!v||!v.alive||v.out)S.srv.spyFor=null;else{apply({bac:8});if(d>0)evA(v,mm2,1);
   if(roll(mm2.trait==="Đa nghi"?25:8)){S.srv.spyFor=null;if(roll(30)){die(`Bị ${mm2.name} phát hiện làm tai mắt cho ${v.name}, sai đánh chết`);return ev}srvLaundry(`${mm2.name} phát hiện ngươi làm tai mắt cho ${v.name}.`,10);S.tin=10}}}
  if(isSrv()&&S.srv.betray&&roll(mm2.trait==="Đa nghi"?25:10)){S.srv.betray=null;if(roll(30)){die(`${mm2.name} biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên`);return ev}srvLaundry(`${mm2.name} biết ngươi mật báo chuyện của nàng.`,12);S.tin=10}
  if(isSrv()&&!S.srv.lau&&S.srv.rk>=2&&S.age>=18&&S.danh>=20&&roll(2+S.danh/15))pushDil(mkP("cnvWed",{w:R(WEDW.length)}),"Ban gả")}
 S.nt=Math.max(0,S.nt-2);
 S.month++;S.tuan=0;
 if(S.month>12){S.month=1;S.year++;S.age++;S.emp.age++;try{ageYear()}catch(e){}allKids().forEach(([k])=>{if(k.alive)k.age++});if(S.age>25)S.sac=Math.max(10,S.sac-2)}
 if(!isSrv())return ev;
 if(S.srv.mama&&S.age>=45){over("Ma ma",`${S.name} làm ma ma trong cung đến năm 45 tuổi, được ban bạc về dưỡng già. Đám cung nữ trẻ gọi bà là cô cô suốt đời.`,"Làm ma ma đến già");return ev}
 if(!S.srv.mama&&S.age>=30){over("Xuất cung",`${S.name} 30 tuổi, Nội vụ phủ cho xuất cung theo lệ. Ngươi rời cung với ${S.bac} lạng bạc dành dụm.`,"Xuất cung tuổi 30");return ev}
 if(!S.srv.mama&&S.age>=25&&!S.srv.ageAsked&&S.srv.lau<=0){S.srv.ageAsked=1;pushDil(mkP("cnvAge",{}),"Đến tuổi xuất cung")}
 if((S.month===1||S.month===7)&&S.srv.lau<=0)pushDil(mkP("cnvFest",{m:S.month}),S.month===1?"Yến tiệc đầu xuân":"Tiệc Thất tịch");
 return ev}
function srvMisCheck(){if(!isSrv())return;const m=srvM();if(m&&m.alive&&!m.out)return;
 srvReassign(`${!m?"Chủ nhân không còn":!m.alive?m.name+" đã qua đời":m.name+" bị đày vào lãnh cung"}; cung nhân bị Nội vụ phủ chia đi nơi khác.`)}
function srvReassign(why,to){const old=S.srv.mid;const L=liveRivals(true).filter(v=>v.id!==old);const n=to||(L.length?pick(L):null);if(!n)return;
 S.srv.mid=n.id;S.tin=to?50:40;S.srv.msch=n.schemes||0;S.srv.betray=null;S.srv.sent=null;if(S.srv.spyFor===n.id)S.srv.spyFor=null;S.srv.lau=0;
 S.srv.rk=Math.max(1,Math.min(S.srv.rk||1,srkMax(n,{role:"maid"})));if(!n.staff)n.staff=[];if(!n.staff.length)try{fillStaff(n,true)}catch(e){}
 for(const s of n.staff)if(S.srv.af[s.sid]==null)S.srv.af[s.sid]=R(21)-5;
 S.place="home";S.visit=srvVisitOf("home");log(`${why} Ngươi về hầu ${rkName(n)} ${n.name}.`);
 if(!quiet)Q.push({t:"Đổi chủ",who:pv(n),h:`<p>${why}</p><p>Từ nay ngươi là <b>${srvTitle()}</b>. Tính nàng: ${n.trait}${n.trait2?", "+n.trait2:""}.</p>`})}
function srvLaundry(why,weeks){if(!isSrv())return;if(S.srv.lau<=0)S.srv.rk0=Math.max(1,S.srv.rk);S.srv.rk=0;S.srv.lau=weeks;S.srv.lw=0;S.place="tgk";S.visit=srvVisitOf("tgk");S.srv.sent=null;S.srv.spyFor=null;
 log(`<span class="r">${why} Ngươi bị đày xuống Tân Giả khố ${weeks} tuần.</span>`);
 Q.push({t:"Tân Giả khố",cls:"end",who:pMe(),h:`<p>${why}</p><p>Ngươi bị đày xuống <b>Tân Giả khố</b> giặt đồ ${weeks} tuần. Việc nặng, cơm hẩm; Sức cạn thì có thể chết.</p>`,btn:"Cúi đầu"});if(!quiet)deal()}
function srvFromLaundry(){S.srv.lau=0;S.srv.rk=Math.max(1,(S.srv.rk0||1)-1);srvReassign("Hết hạn phạt ở Tân Giả khố.")}
function srvMoodEvent(){const m=srvM();const tr=m.trait;const good=(S.tin-20)/100+(tr==="Hiền lành"||tr==="Nhu mì"?.2:0)-(tr==="Hiểm độc"||tr==="Kiêu ngạo"?.12:0);
 if(Math.random()<good){const g=3+rkOf(m);apply({bac:g,tin:1});log(`${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.`);Q.push({t:"Chủ thưởng",who:pv(m),h:`<p>${m.name} vui lòng, thưởng ngươi ${g} lạng bạc.</p><p class="g">Bạc +${g} · Chủ tin +1</p>`});return}
 if(S.tin<10){srvLaundry(`${m.name} chán ghét ngươi, sai người giải xuống Nội vụ phủ.`,6+R(5));return}
 if((tr==="Hiểm độc"&&S.tin<30&&roll(45))||(S.tin<20&&roll(40))){const d=20+R(15);apply({suc:-d});log(`<span class="r">${m.name} sai thái giám đánh ngươi hai mươi trượng.</span> Sức -${d}.`);
  Q.push({t:"Bị đánh đòn",cls:"end",who:pv(m),h:`<p>${m.name} nổi giận, sai thái giám đánh ngươi hai mươi trượng.</p><p class="r">Sức -${d}</p>`});if(S.suc<=0)die(`Bị ${m.name} sai đánh trượng đến chết`);return}
 pushDil(mkP("cnvScold",{}),`${m.name} quở mắng`)}
function ordOdds(k){return od(k==="spy"?45+S.tamco/5+S.tai/10:k==="plant"?30+S.tamco/4+S.srv.rk*3:25+S.tamco/4+S.srv.rk*3)}
function srvOrder(){const m=srvM();const t=srvW(()=>pickTarget(m));if(!t||t===S||!t.alive)return;const mal=m.malice||40;
 const k=mal>=70&&roll(35)?"poison":mal>=45&&roll(50)?"plant":"spy";pushDil(mkP("cnvOrd",{k,t:t.id}),`Lệnh của ${m.name}`)}
function srvDoOrder(k,t){const m=srvM();if(!m||!t)return;m.schemes=(m.schemes||0)+1;S.srv.msch=m.schemes;const o=ordOdds(k);
 if(roll(o)){if(k==="spy"){evA(m,t,1);apply({tin:4,bac:3,tamco:1});log(`Ngươi dò la được chuyện của ${t.name}, về bẩm ${m.name}: chủ nắm thêm 1 chứng cứ.`)}
  else if(k==="plant"){const a0=ACTX.a;ACTX.a=m;try{framed(t,"bị vu dùng bùa ngải")}finally{ACTX.a=a0}apply({tin:8,bac:10,duc:-5});log(`Hình nhân bùa ngải được tìm thấy trong tẩm cung ${t.name}.`)}
  else{const d=35+R(30);ap(t,{suc:-d});const dd=dieIf(t,"chết sau một bát canh");apply({tin:12,bac:20,duc:-10});log(dd||`<span class="r">${t.name} trúng độc, thập tử nhất sinh.</span>`)}
  srvMerit(1);return}
 apply({tin:-2});if(!roll(50)){log("Việc không thành, may chưa ai thấy.");return}
 if(roll(30)){die(`Bị bắt quả tang khi ${k==="poison"?"bỏ độc":k==="plant"?"cài bùa ngải":"dò la"} ${t.name}, bị đánh chết ở Thận Hình ti`);return}
 if(roll(confessRisk({tr:S.tamco>=60?"lanh":"",loyal:S.tin}))){evA(t,m,2);relAdd(m,t,-10);srvLaundry(`Bị bắt, ngươi khai ra ${m.name}. ${t.name} nắm 2 chứng cứ; chủ hận ngươi.`,10);S.tin=5;return}
 apply({suc:-20,tin:3});log("Bị bắt và tra khảo, ngươi cắn răng không khai. Sức -20. Chủ nhân nhớ ơn.");if(S.suc<=0)die("Chết dưới đòn tra khảo ở Thận Hình ti")}
function srvBribeOffer(){const m=srvM();const L=liveRivals(true).filter(v=>v!==m&&hostility(v,m)>=25&&(v.bac||0)>=40);if(!L.length)return;pushDil(mkP("cnvBribe",{r:pick(L).id}),"Bạc lạ")}
function srvFramedEvent(){const m=srvM();const L=srvColleagues().filter(s=>(S.srv.af[s.sid]||0)<0);if(!L.length)return;pushDil(mkP("cnvFrame",{sid:pick(L).sid}),"Bị vu oan")}
function srvFriendTip(){const f=srvFriendList();if(!f.length)return;const s=pick(f);const m=srvM();const L=liveRivals(true).filter(x=>x!==m);
 if(roll(55)&&L.length){const v=pick(L);S.srv.intel.push(v.id);log(`${s.name} kể nhỏ với ngươi chuyện trong cung ${v.name}. Ngươi có tin để bẩm chủ.`)}else{apply({bac:2});log(`${s.name} chia cho ngươi ít bánh trái và 2 lạng bạc.`)}}

/* ---------- saveable choices ---------- */
PEND.cnvScold=()=>{const m=srvM();if(!isSrv()||!m)return null;const o=od(40+S.sac/3);
 return{t:`<p>${m.name} ${m.trait==="Kiêu ngạo"?"chê trà nguội, hắt cả chén vào người ngươi":m.trait==="Đa nghi"?"nghi ngươi lén lút ra ngoài, gọi vào tra hỏi":"trách ngươi làm việc chậm chạp"}.</p>`,who:pv(m),o:[
  {n:"Cúi đầu nhận lỗi",fx:{tin:1,duc:1},x:""},
  {n:"Khóc lóc xin tha",fx:{},x:`${word(o)} · thành: Chủ tin +3 · hỏng: Chủ tin -3`,go:()=>{if(roll(o)){apply({tin:3});log("Chủ mềm lòng.")}else{apply({tin:-3});log("Chủ càng bực.")}}},
  {n:"Cãi lại",fx:{danh:2,tin:-8},x:"đám cung nhân nể · có thể bị phạt quỳ: Sức -15",go:()=>{if(roll(40)){apply({suc:-15});log("Bị phạt quỳ giữa sân. Sức -15.")}}}]}};
PEND.cnvOrd=pp=>{const m=srvM(),t=RV(pp.t);if(!isSrv()||!m||!t||!t.alive||t.out)return null;const k=pp.k,o=ordOdds(k),mal=m.malice||40;
 const desc={spy:`dò la cung ${t.name}, xem nàng gặp ai, nói gì`,plant:`lén giấu hình nhân bùa ngải vào tẩm cung ${t.name}`,poison:`bỏ thuốc độc vào bát canh dâng ${t.name}`}[k];
 const gain={spy:`Chủ tin +4 · Bạc +3 · chủ nắm 1 chứng cứ của ${t.name}`,plant:`Chủ tin +8 · Bạc +10 · ${t.name} bị vu, mất Danh`,poison:`Chủ tin +12 · Bạc +20 · ${t.name} trúng độc, có thể chết`}[k];
 const q=queenP();const who=q&&q!==m&&q!==t&&q!==S?q:t;
 return{t:`<p>${m.name} gọi ngươi vào phòng trong, đóng cửa: “Ngươi đi ${desc}.”</p><p class="past">Kẻ hầu nào làm cũng một luật: hỏng thì nửa phần bị bắt; bị bắt thì 3 phần bị đánh chết ở Thận Hình ti, hoặc phải khai ra chủ.</p>`,who:pv(m),o:[
  {n:"Vâng lệnh",fx:{},x:`${word(o)} · thành: ${gain} · hỏng: Chủ tin -2, nửa phần bị bắt`,go:()=>srvDoOrder(k,t)},
  {n:"Từ chối",fx:{tin:mal>=60?-15:-10},x:"có thể bị phạt: Sức -20",go:()=>{if(roll(mal/2)){apply({suc:-20});log(`${m.name} sai người phạt ngươi quỳ trên đá vụn. Sức -20.`);if(S.suc<=0)die("Quỳ phạt đến kiệt sức mà chết")}}},
  {n:`Mật báo cho ${who.queen?"Hoàng hậu":who.name}`,fx:{bac:20,danh:2},x:`${who.name} nắm 2 chứng cứ của ${m.name} · chủ biết thì ngươi bị đánh chết hoặc đày Tân Giả khố`,go:()=>{evA(who,m,2);S.srv.betray={by:who.id};log(`Ngươi lén báo cho ${who.name} mưu của ${m.name}.`)}}]}};
PEND.cnvBribe=pp=>{const m=srvM(),v=RV(pp.r);if(!isSrv()||!m||!v||!v.alive)return null;
 return{t:`<p>Một thái giám của ${v.name} chặn ngươi ở hành lang, dúi vào tay ngươi một túi bạc: “Chủ tử nhà ta muốn biết chuyện trong cung ${m.name}.”</p>`,who:pv(v),o:[
  {n:"Nhận bạc, làm tai mắt",fx:{bac:20},x:"mỗi tháng Bạc +8 · chủ có thể phát hiện: bị đánh chết hoặc đày",go:()=>{ap(v,{bac:-20});S.srv.spyFor=v.id}},
  {n:"Từ chối, bẩm chủ",fx:{tin:5},x:`${m.name} nắm 1 chứng cứ của ${v.name}`,go:()=>{evA(m,v,1);relAdd(m,v,-5)}},
  {n:"Từ chối, im lặng",fx:{},x:""}]}};
PEND.cnvFrame=pp=>{const s=servById(pp.sid),m=srvM();if(!isSrv()||!s||!m)return null;const fr=srvFriendList().length;const o=od(30+S.tamco/2+S.duc/5+fr*8);const item=pick(["cây trâm vàng","chiếc vòng ngọc","hộp phấn ngự ban","túi hương thêu chỉ vàng"]);
 return{t:`<p>${s.name} (${srkName(s)}) tố với ${m.name} rằng ngươi lấy trộm ${item}.</p>${fr?`<p class="past">${fr} người bạn có thể làm chứng cho ngươi.</p>`:""}`,who:pServ(s),o:[
  {n:"Thanh minh",fx:{},x:`${word(o)} · thành: ${s.name} bị phạt, Chủ tin +2 · hỏng: Chủ tin -12, bị đánh đòn Sức -15`,go:()=>{if(roll(o)){s.loyal=cl(s.loyal-15,0,100);s.trouble=wk();srvAf(s,-20);apply({tin:2});log(`Ngươi thanh minh được; ${s.name} bị phạt vì vu cáo.`)}else{apply({tin:-12,suc:-15});log(`${m.name} không tin ngươi, sai đánh đòn.`);if(S.suc<=0)die("Bị đánh đòn vì tội trộm cắp, không qua khỏi");else if(S.tin<8)srvLaundry(`${m.name} cho rằng ngươi là kẻ cắp.`,6)}}},
  {n:"Nhận tội, xin tha",fx:{tin:-6,suc:-8},x:""},
  {n:`Đút bạc cho ${s.name} rút lời`,fx:{bac:-10},x:`${s.name} thôi tố, thiện cảm +10`,go:()=>srvAf(s,10)}]}};
PEND.cnvName=pp=>{if(!isSrv()||(S.age||0)<18)return null;const m=srvM();const o=od(40+S.nt/2+S.sac/5);const risky=!!m&&(m.malice||0)>=60&&S.tin<40;
 return{t:`<p>${pp.src==="month"?"Tổng quản Càn Thanh cung đến hỏi: Hoàng thượng còn nhớ cung nữ dâng trà hôm nọ.":"Hoàng thượng đặt chén trà xuống, hỏi: “Ngươi tên gì? Hầu ở cung nào?”"}</p>${risky?`<p class="r">${m.name} hiểm độc lại chẳng ưa ngươi: nàng có thể ra tay trước ngày sắc phong.</p>`:""}`,who:pEmp(),o:[
  {n:"Cúi đầu thưa tên",fx:{},x:`${word(o)} · thành: được phong ${RANKS[0].n}${risky?", nhưng chủ có thể hại ngươi trước":""} · hỏng: Chủ tin -15`,go:()=>{if(roll(o)){if(risky&&roll(25)){die(`Trước ngày sắc phong, ${m.name} sai người đẩy ngươi xuống giếng`);return}srvRise(pp.src==="month"?"Hoàng thượng nhớ đến ngươi":"Hoàng thượng để mắt đến cung nữ dâng trà")}else{apply({tin:-15});if(m)log(`${m.name} biết chuyện, giận ngươi lả lơi. Chủ tin -15.`)}}},
  {n:"Lui về sau chủ",fx:{tin:5},x:"Hoàng thượng để ý -10",go:()=>{S.nt=Math.max(0,S.nt-10)}}]}};
PEND.cnvWed=pp=>{if(!isSrv()||(S.age||0)<18)return null;const w=WEDW[pp.w||0];
 return{t:`<p>${w} dâng sớ xin Hoàng thượng ban gả một cung nữ hiền thục. Nội vụ phủ dâng tên ngươi.</p>`,who:pEmp(),o:[
  {n:"Tạ ơn, xuất giá",fx:{},x:"kết thúc kiếp này: làm vợ ngoài cung",go:()=>over("Xuất giá",`${S.name} được ban gả cho ${w}, rời cung bằng kiệu hoa. Từ thân cung nữ, ngươi thành chính thất một nhà, sống nốt đời ngoài bức tường son.`,`Được ban gả cho ${w}`)},
  {n:"Xin ở lại hầu chủ",fx:{tin:5},x:""}]}};
PEND.cnvAge=()=>{if(!isSrv())return null;const hi=S.srv.rk>=3;const fate=hi?"Chưởng sự xuất cung, an hưởng tuổi già":S.bac>=100?"Xuất cung, mở tiệm nhỏ ở kinh thành":"Xuất cung về quê";
 const o=[{n:"Xuất cung về quê",fx:{},x:"kết thúc kiếp này",go:()=>over("Xuất cung",`${S.name} ${S.age} tuổi, rời cung theo lệ với ${S.bac} lạng bạc. ${hi?"Là chưởng sự cô cô, ngươi được ban thêm bạc và một mảnh ruộng.":S.bac>=100?"Ngươi mở một tiệm thêu nhỏ ở kinh thành.":"Ngươi về quê, sống đời bình dị."}`,fate)}];
 if(hi)o.push({n:"Ở lại làm ma ma",fx:{danh:3},x:"ở lại đến già, dạy cung nữ mới",go:()=>{S.srv.mama=1;log("Ngươi ở lại cung làm ma ma.")}});
 else if(S.tin>=60)o.push({n:"Xin chủ giữ lại",fx:{tin:2},x:"ở thêm đến 30 tuổi",go:()=>log(`${srvM()?srvM().name:"Chủ"} xin Nội vụ phủ giữ ngươi lại.`)});
 else o.push({n:"Xin ở lại",fx:{},x:"Chủ tin dưới 60: chủ không giữ · ở thêm đến 30 tuổi, Chủ tin -5",go:()=>apply({tin:-5})});
 return{t:`<p>Năm nay ngươi ${S.age} tuổi, đến tuổi cung nữ được xuất cung.</p>`,who:pMe(),o}};
PEND.cnvFest=pp=>{if(!isSrv())return null;const m=srvM();const o=od(30+S.sac/3+S.tai/10);
 return{t:`<p>${pp.m===1?"Yến tiệc đầu xuân ở Thái Hòa điện":"Tiệc Thất tịch bên hồ sen"}. Ngươi theo hầu ${m?m.name:"chủ"}.</p>`,who:pMe(),o:[
  {n:"Rót rượu gần ngự tọa",fx:{},x:`${word(o)} · thành: Hoàng thượng để ý +12 · hỏng: Chủ tin -4`,go:()=>{if(roll(o))srvNotice("fest",12);else apply({tin:-4})}},
  {n:"Đứng sau hầu chủ",fx:{tin:3},x:""}]}};

/* ---------- rising: she joins the consort game ---------- */
function srvRise(why){if(!S||(S.age||0)<18)return;const m=srvM();const tin=S.tin;S.srv.risen=1;S.srv.wasMis=m?m.id:null;S.srv.sent=null;S.rank=0;S.sung=15+Math.round(S.nt/5);S.lastPromo=S.turn;apply({danh:5,bac:20});
 S.maid=newMaid(pick(MAIDS),50);S.staff=[];try{fillStaff(S,true)}catch(e){}
 if(m&&m.alive){relAdd(S,m,tin>=60?25:-25);m.ghen=cl((m.ghen||0)+(tin>=60?5:25),0,100)}
 try{palFix()}catch(e){}S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};tab="act";
 log(`<b class="g">${why}: ngươi được phong ${RANKS[0].n}.</b>`);
 Q.push({t:"Thánh chỉ",cls:"end",who:pEmp(),h:`<p>${why}. Thánh chỉ: cung nữ ${S.name} được phong <b>${RANKS[0].n}</b>, ở ${palName("home")}.</p><p>${m?`${m.name} ${tin>=60?"vẫn coi ngươi như người nhà.":"nhìn ngươi bằng ánh mắt lạnh như băng."}`:""}</p><p class="past">Từ nay ngươi theo luật của phi tần: Sủng, thị tẩm, phẩm vị.</p>`,btn:"Tạ ơn"});
 deal();render();if($("modal").hidden)showModal()}

/* ---------- endings keep her servant title in the record ---------- */
(function(){const o0=over;over=function(h,t,fate){const sv=isSrv(),nm=sv?srvRkN():"";const r=o0.apply(this,arguments);
 if(sv){try{for(const k of ["cung-kiep","cung-luanhoi"]){const p=store.get(k)||[];if(p[0]&&p[0].n===S.name){p[0].r=nm;store.set(k,p)}}
  if(Q[0]&&Q[0].h){Q[0].h=Q[0].h.replace(/<span>Phẩm cao nhất<\/span><b>[^<]*<\/b>/,`<span>Thân phận</span><b>${nm}</b>`).replace(/<span>Con cái<\/span><b>[^<]*<\/b>/,"<span>Con cái</span><b>không</b>");showModal()}}catch(e){}}return r}})();

/* ---------- UI: HUD, tabs, panels, self card, map ---------- */
const SRVTABS={act:"Việc",go:null,staff:"Đồng liêu",story:"Thân phận",log:null};
function srvTabs(){const on=isSrv();document.querySelectorAll("#tabs button").forEach(b=>{const t=b.dataset.tab;if(b.dataset.l0==null){b.dataset.l0=b.textContent;b.dataset.s0=b.dataset.s||""}
 if(on){b.style.display=t in SRVTABS?"":"none";const L=SRVTABS[t];b.textContent=L||b.dataset.l0;b.dataset.s=L||b.dataset.s0}else{b.style.display="";b.textContent=b.dataset.l0;b.dataset.s=b.dataset.s0}})}
function srvHud(){const e=$("hud-sung");if(!e)return;const sm=e.querySelector("small");if(sm&&sm.dataset.o0==null)sm.dataset.o0=sm.innerHTML;
 if(isSrv()){$("me-r").textContent=srvTitle();if(sm)sm.innerHTML=sm.dataset.o0.replace("Sủng","Chủ tin");e.querySelector("span").textContent=S.tin;const u=e.querySelector("u");if(u)u.style.width=S.tin+"%";e.title=HX.tin}
 else if(sm&&sm.innerHTML!==sm.dataset.o0){sm.innerHTML=sm.dataset.o0;e.title=""}}
(function(){const h0=renderHUD;renderHUD=function(){const r=h0.apply(this,arguments);try{srvHud()}catch(e){console.error(e)}return r}})();
(function(){const r0=renderHud2;renderHud2=function(){const r=r0.apply(this,arguments);try{if(isSrv())srvHud2()}catch(e){console.error(e)}return r}})();
function srvHud2(){const el=$("hud2");if(!el)return;const col=el.classList.contains("col");const m=srvM();
 const c=(k,l,v,cls)=>`<button class="hc ${cls||""}${["buoi","date","srk"].includes(k)?" keep":""}" data-hx="${k}">${l}${v!==""&&v!=null?` <b>${v}</b>`:""}</button>`;
 el.innerHTML=`<button class="h2t" data-h2t="1" aria-label="${col?"Mở rộng":"Thu gọn"}">${col?"▾":"▴"}</button>`+c("date",`T${S.month}/${S.year} · ${TUAN[S.tuan]}`,"")+c("buoi",`${BUOI[S.buoi||0].replace("Buổi ","")} · còn`,`${4-used} khắc`)+c("srk",srvRkN(),"",S.srv.lau>0?"hot":"")
  +c("tin","Chủ tin",S.tin,S.tin<30?"hot":S.tin>=60?"ok":"")+c("nt","Hoàng thượng để ý",S.nt,S.nt>=45?"ok":"")+c("sac","Sắc",S.sac)+c("tai","Tài",S.tai)+c("tamco","Tâm cơ",S.tamco)+c("duc","Đức",S.duc)
  +c("merit","Công lao",`${Math.floor(S.srv.mp)}/${(S.srv.rk+1)*5}`)+c("wage","Lương tháng",`${CNV_WAGE[S.srv.rk]} bạc`)+c("age","Tuổi",`${S.age} · xuất cung ${S.srv.mama?45:25}`)
  +(S.srv.lau>0?c("lau","Tân Giả khố",`${S.srv.lau} tuần`,"hot"):"")+(S.srv.sec?c("sec","Biết chuyện của chủ",S.srv.sec,"hot"):"")+(S.srv.spyFor!=null?c("spy","Tai mắt cho người khác","","hot"):"")+(m?c("mis",`Chủ: ${m.name}`,m.trait):"")}
(function(){const r0=render;render=function(){if(isSrv()&&!(tab in SRVTABS))tab="act";const r=r0.apply(this,arguments);try{srvTabs();if(isSrv()&&tab==="go")srvMapFix()}catch(e){console.error(e)}return r}})();
function srvMapFix(){const m=srvM(),mk=m&&palaceOf(m);document.querySelectorAll('#panel .mspot[data-go="home"]').forEach(b=>b.remove());
 document.querySelectorAll("#panel button.mspot[data-go]").forEach(b=>{const k=b.dataset.go;if(k===mk){b.classList.add("srvmine");if(S.place==="home")b.classList.add("here");const l=b.querySelector(".mlab");if(l&&!l.querySelector(".srvtag"))l.insertAdjacentHTML("beforeend",' <i class="srvtag">cung chủ</i>');b.disabled=false;return}
  const h=window.placeEnterHook(S,k);if(h&&!h.ok&&!b.disabled){b.disabled=true;b.classList.add("off","srvno");b.title=`${b.title.split(":")[0]}: ${h.why}`;let mt=b.querySelector(".mmeta");if(!mt){mt=document.createElement("span");mt.className="mmeta";b.appendChild(mt)}mt.innerHTML=`<em>${h.why}</em>`}})}
(function(){const p0=renderPanel0;renderPanel0=function(){if(!isSrv()||!["staff","story","act"].includes(tab))return p0.apply(this,arguments);
 const el=$("panel");if(tab==="act"){const r=p0.apply(this,arguments);try{el.insertAdjacentHTML("afterbegin",srvHead())}catch(e){}return r}
 const gm=document.querySelector(".game");if(gm)gm.classList.remove("cardtab","maptab");const keep=el.dataset.tab===tab?el.scrollTop:0;el.innerHTML=tab==="staff"?srvStaffHTML():srvRoadHTML();el.dataset.tab=tab;el.dataset.pg="";el.scrollTop=keep;kitFix(el)}})();
function srvHead(){const m=srvM();if(!m)return"";const w=srvWhere(m),mk=palaceOf(m);const sn=S.srv.sent&&!S.srv.sent.done&&S.srv.sent.until>=bid()?S.srv.sent:null;
 if(S.srv.lau>0)return `<div class="srvhead">${mdH(pMe(),"sm")}<span><b>Cung nữ Tân Giả khố</b> · <b class="r">còn ${S.srv.lau} tuần</b> · giặt đủ thì được về sớm; hết hạn, Nội vụ phủ chia về hầu chủ mới.</span></div>`;
 return `<div class="srvhead">${mdH(pv(m),"sm")}<span><b>${srvTitle()}</b> · chủ ${m.trait}${m.trait2?", "+m.trait2:""} · ${w===mk?"đang ở cung":"đang ở "+placeOf(w).n} · Chủ tin <b class="${S.tin<30?"r":S.tin>=60?"g":""}">${S.tin}</b>${sn?` · <b class="g">Việc chủ sai: ${sn.n} (đến ${placeOf(sn.k).n})</b>`:""}${S.srv.lau>0?` · <b class="r">Tân Giả khố còn ${S.srv.lau} tuần</b>`:""}</span></div>`}
function srvRows(){const m=srvM();const need=(S.srv.rk+1)*5,mx=srvMax();const row=(a,b)=>`<div class="pcrow"><span>${a}</span><b>${b}</b></div>`;
 return [row("Thân phận",srvTitle()),row("Công lao",`${Math.floor(S.srv.mp)}/${need}${S.srv.rk>=mx?` · bậc cao nhất cung ${m?m.name:""} cho phép`:` · đủ thì lên ${SRK.maid[S.srv.rk+1]||""}`}`),row("Lương tháng",`${CNV_WAGE[S.srv.rk]} bạc · đang có ${S.bac}`),
  row("Hoàng thượng để ý",`${S.nt}/100 · từ 45 ngài có thể hỏi tên, phong ${RANKS[0].n}`),row("Ban gả",S.srv.rk>=2?`Danh ${S.danh}/20 · đủ thì có người xin cưới`:"cần Đại cung nữ, Danh 20"),
  row("Xuất cung",S.srv.mama?"ma ma: ở đến 45 tuổi":`${S.age}/25 tuổi${S.srv.rk>=3?" · chưởng sự được ở lại làm ma ma":""}`),
  row("Đường xuống",`Chủ tin ${S.tin}: dưới 10 dễ bị đày Tân Giả khố`),row("Biết chuyện của chủ",`${S.srv.sec}${S.srv.betray?" · đã mật báo, chủ biết thì nguy":""}`),
  row("Bạn trong cung",`${srvFriendList().length} người (thiện cảm 30+)`)].concat(S.srv.spyFor!=null&&RV(S.srv.spyFor)?[row("Tai mắt cho",RV(S.srv.spyFor).name)]:[])}
function srvRoadHTML(){const m=srvM();return `<div class="story"><h3>Thân phận cung nữ</h3><p style="margin:0 0 4px">Ngươi là ${srvTitle()}${m?` (${rkName(m)}, tính ${m.trait})`:""}. Leo lên bằng công lao và lòng tin của chủ; được Hoàng thượng để mắt thì thành phi tần.</p></div><div class="pcb rows">${srvRows().join("")}</div>`}
function srvStaffHTML(){const L=srvColleagues();const m=srvM();const oc=od(55+S.duc/5+S.sac/10),of=od(30+S.tamco/3);
 return `<h3>Đồng liêu</h3><p class="past">Kẻ hầu cùng cung và người ngươi đã quen. Bạn (thiện cảm 30+) làm chứng khi ngươi bị vu, mách tin; kẻ ghét ngươi (dưới 0) có thể vu cáo.</p>`+(L.map(s=>{const a=S.srv.af[s.sid]||0;const o=ownerOf(s);const kn=S.srv.know[s.sid];const t1=!can(1)?"Hết khắc buổi này":"";
  return `<div class="srvrow">${mdH(pServ(s),"sm")}<div class="srvi"><b>${s.name}</b><span class="past">${srkName(s)} · ${o?(o===m?"cùng cung":"người của "+o.name):"Nội vụ phủ"} · ${kn?"tính "+STR[s.tr]:"chưa rõ tính"}</span><span>Thiện cảm <b class="${a>=30?"g":a<0?"r":""}">${a}</b></span></div><div class="srvb">`
   +pbtn(`class="opt" data-cnv="chat" data-sid="${s.sid}"`,"Trò chuyện",`${word(oc)} · tốn: 1 khắc · thành: thiện cảm +10 · hỏng: thiện cảm -3`,t1)
   +pbtn(`class="opt" data-cnv="gift" data-sid="${s.sid}"`,"Biếu quà",`Chắc chắn · tốn: Bạc -5, 1 khắc · thành: thiện cảm +12`,S.bac<5?"Thiếu bạc (cần 5)":t1)
   +pbtn(`class="opt" data-cnv="ask" data-sid="${s.sid}"`,"Nhờ dò tin",`Chắc chắn · tốn: 1 khắc · thành: có tin để bẩm chủ`,a<30?"Cần thiện cảm 30":t1)
   +pbtn(`class="opt" data-cnv="frame" data-sid="${s.sid}"`,"Tố lỗi với chủ",`${word(of)} · tốn: 1 khắc · thành: ${s.name} bị phạt, Chủ tin +3 · hỏng: thiện cảm -30, Chủ tin -5`,o!==m?"Chỉ tố người cùng cung":S.srv.lau>0?"Đang ở Tân Giả khố":t1)+`</div></div>`}).join("")||`<p class="past">Chưa quen ai.</p>`)}
function srvStaffAct(k,s){if(!can(1))return null;const m=srvM();
 if(k==="chat"){spend(1);const ok=roll(od(55+S.duc/5+S.sac/10));srvAf(s,ok?10:-3);if(roll(35))S.srv.know[s.sid]=1;log(`Trò chuyện với ${s.name}: ${ok?"thân hơn":"bị lạnh nhạt"}.`);return ok}
 if(k==="gift"){if(S.bac<5)return null;spend(1);apply({bac:-5});srvAf(s,12);log(`Biếu ${s.name} chút quà.`);return true}
 if(k==="ask"){if((S.srv.af[s.sid]||0)<30)return null;spend(1);const L=liveRivals(true).filter(x=>x!==m);if(L.length){const v=pick(L);S.srv.intel.push(v.id);log(`${s.name} kể cho ngươi chuyện trong cung ${v.name}: có tin để bẩm chủ.`)}else log(`${s.name} không biết gì mới.`);return true}
 if(k==="frame"){if(ownerOf(s)!==m||S.srv.lau>0)return null;spend(1);const ok=roll(od(30+S.tamco/3));
  if(ok){s.loyal=cl(s.loyal-15,0,100);s.trouble=wk();srvAf(s,-40);apply({tin:3});let r=`Ngươi tố ${s.name} lười nhác; ${m.name} phạt hắn.`;if(roll(25)&&m.staff.includes(s)){m.staff.splice(m.staff.indexOf(s),1);r+=` ${s.name} bị đuổi về Nội vụ phủ.`}log(r);return true}
  srvAf(s,-30);apply({tin:-5});log(`Ngươi tố ${s.name} nhưng ${m.name} không tin, còn trách ngươi gây chuyện.`);return false}
 return null}
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-cnv]");if(!b)return;e.stopPropagation();e.preventDefault();if(b.disabled||!isSrv()||S.dead||Q.length)return;
 const s=servById(+b.dataset.sid);if(!s)return;const bf=rsnap();const r=srvStaffAct(b.dataset.cnv,s);if(r!=null)resultShow(b.firstChild.textContent,bf,r);render()},true);
(function(){const s0=selfCardHTML;selfCardHTML=function(){if(!isSrv())return s0.apply(this,arguments);const m=srvM();
 return pcard({f:pMe(),col:"#b9a48a",name:S.name,rank:srvTitle(),lines:[`${S.age} tuổi · ${S.origin.n}`,`Sắc ${S.sac} · Tài ${S.tai} · Tâm cơ ${S.tamco} · Đức ${S.duc}`,`Sức ${S.suc} · Bạc ${S.bac} · Danh ${S.danh}`,`Chủ tin ${S.tin} · Hoàng thượng để ý ${S.nt}`],note:m?`Chủ: <b>${rkName(m)} ${m.name}</b>, tính ${m.trait}${m.trait2?", "+m.trait2:""}.`:"",groups:[["Đường đi",srvRows()]],empty:""})}})();
(function(){const t0=showTitle;showTitle=function(){const r=t0.apply(this,arguments);try{document.querySelectorAll("#slots .slot").forEach(el=>{const b=el.querySelector("[data-load]");if(!b)return;const d=loadSlot(+b.dataset.load);
 if(d&&d.S&&d.S.srv&&!d.S.srv.risen){const sp=el.querySelector(".past");if(sp)sp.textContent=sp.textContent.replace(/^[^·]*/,(d.S.srv.lau>0?"Cung nữ Tân Giả khố":SRK.maid[d.S.srv.rk]||"Cung nữ")+" ")}})}catch(e){}return r}})();
(function(){const st=document.createElement("style");st.textContent=`.srvhead{display:flex;gap:8px;align-items:center;padding:6px 8px;margin:0 0 8px;border:1px solid var(--line);border-radius:8px;background:var(--panel2);font-size:.82rem;line-height:1.4}
.srvrow{display:flex;gap:8px;align-items:flex-start;padding:8px 2px;border-bottom:1px solid var(--line);flex-wrap:wrap}.srvrow .srvi{display:flex;flex-direction:column;gap:1px;min-width:0;flex:1 1 160px;font-size:.85rem}
.srvrow .srvb{display:grid;grid-template-columns:repeat(auto-fill,minmax(150px,1fr));gap:6px;flex:1 1 100%}.srvrow .srvb .opt{min-width:0}
.mspot.srvno .mlab{opacity:.6}.mspot .srvtag{font-style:normal}`;document.head.appendChild(st)})();
(function(){const h0=hudTween;hudTween=function(){if(!isSrv())return h0.apply(this,arguments);const s=S.sung;S.sung=S.tin;try{return h0.apply(this,arguments)}finally{S.sung=s}}})();

/* ================= CUNG NỮ II: the palace men (j22), forbidden love and marriage roads for a maid =================
   Same men, same bars (m.af thiện cảm, m.tinh tình ý, m.letters tang vật, m.trysts) and the same ladder as a consort:
   glances -> tokens / letters -> secret meetings (fade to black). Adults only (she and he 18+), man and woman only.
   The risk differs: a maid belongs to the court, so a found-out romance means beating, Tân Giả khố or expulsion;
   death only when it touches a consort's scheme or a pregnancy. The man is punished too. NPC maids live by the same rules. */
function srvMen(){try{menInit()}catch(e){}return (S.men||[]).filter(m=>m.alive&&(m.age||0)>=18)}
function srvAdult(m){return (S.age||0)>=18&&!!m&&(m.age||0)>=18}
function srvRisk(k){const base={vuon:28,thu:34,tyv:20,tn:40,home:18}[k]||26;const eyes=liveRivals(true).reduce((s,v)=>s+(v.mat||0),0);return cl(Math.round(base+eyes-srvFriendList().length*4-(S.tamco||0)/10),6,92)}
function srvBond(){const L=srvMen().filter(m=>m.tinh>=50&&m.rw!=="vương gia").sort((a,b)=>(b.tinh+(S.srv.vow===b.id?50:0))-(a.tinh+(S.srv.vow===a.id?50:0)));return L[0]||null}
function srvSeen(m,n){S.srv.rumor=(S.srv.rumor||0)+n;const L=liveRivals(true).filter(v=>v!==srvM());if(L.length&&roll(50)){S.srv.leak=pick(L).id}log(`Có người thấy ngươi với ${m.name}. Lời ra tiếng vào.`)}
function srvAffairCaught(m,how){if(!isSrv())return;const mis=srvM();const scheme=m&&rivals.some(v=>v.alive&&v.affair===m.id);
 const pre=`${how} Cung nữ thuộc về cung cấm: tư tình là tội.`;
 if(m){if(m.rw==="vương gia"){m.tinh=Math.max(0,m.tinh-20);log(`${m.name} là vương gia, chỉ bị Hoàng thượng quở trách.`)}else if(roll(35)){m.alive=false;log(`<span class="r">${m.name} bị cách chức, đày ra biên ải.</span>`)}else{m.tinh=Math.max(0,m.tinh-25);m.loyal=Math.max(0,(m.loyal||50)-20);log(`<span class="r">${m.name} bị đánh bốn mươi trượng.</span>`)}}
 S.srv.lover=null;S.srv.vow=null;S.srv.rumor=0;S.srv.leak=null;if(mis)S.tin=Math.max(0,S.tin-20);
 if(S.srv.preg){S.srv.preg=0;if(roll(50)){die(`${pre} Bụng mang dạ chửa, ngươi bị đánh chết ở Thận Hình ti`);return}over("Bị đuổi khỏi cung",`${pre} Mang thai hoang, ngươi bị đánh đòn rồi đuổi ra khỏi cửa Thần Vũ, không một đồng.`,"Bị đuổi khỏi cung vì mang thai");return}
 if(scheme&&roll(40)){die(`${pre} Chuyện dính vào mưu của phi tần, ngươi bị diệt khẩu`);return}
 const r=Math.random();if(r<.25){over("Bị đuổi khỏi cung",`${pre} Ngươi bị tước tên khỏi sổ cung nữ, đuổi về quê.`,"Bị đuổi khỏi cung vì tư tình");return}
 const d=20+R(10);apply({suc:-d});if(S.suc<=0){die(`${pre} Ngươi chết dưới đòn roi`);return}srvLaundry(`${pre} Ngươi bị đánh ${d>25?"ba mươi":"hai mươi"} roi.`,r<.6?8:12)}
/* the men stand where j22 put them; a maid meets them on her own roads */
(function(){const v0=srvVisitOf;srvVisitOf=function(k){const V=v0.apply(this,arguments);try{if(k!=="tgk"&&k!=="home"){const W=S.menW||{};for(const m of srvMen())if(W[m.id]===k){V.people.push({kind:"srv",sk:"man",ref:m,mid:m.id,name:m.name.split(" ").slice(-2).join(" "),ini:m.name.split(" ").pop()[0],col:"#6a8aa0",info:`${m.role} · ${m.trait} · ${tinhW(m.tinh)}`});m.seen=bkey()}
  const here=liveRivals(true).filter(v=>srvWhere(v)===k&&v.affair&&W[v.affair]===k);for(const v of here){S.srv.knowAff=S.srv.knowAff||[];if(!S.srv.knowAff.includes(v.id)&&roll(40)){S.srv.knowAff.push(v.id);log(`Ngươi bắt gặp ${v.name} lén trao đổi ánh mắt với ${manById(v.affair).name}.`)}}
  if(V.people.length&&/Không gặp ai/.test(V.msg||""))V.msg=`Ở đây có ${V.people.length} người.`}}catch(e){console.error(e)}return V}})();
(function(){const f0=pFaceOf;pFaceOf=function(p){if(p&&p.kind==="srv"&&p.sk==="man"){const m=manById(p.mid);return m?pMan(m):{src:"",ini:p.ini,col:p.col}}return f0(p)}})();
(function(){const t0=srvTalk;srvTalk=function(p){const A=t0.apply(this,arguments);try{const mis=srvM();
 const T=(n,o,x,run,more)=>A.push(Object.assign({n,o,w:{},l:{},x,run(){const ok=o>=100||roll(o);const r=run(ok)||"";return `${o<100?(ok?'<span class="g">thành</span>. ':'<span class="r">hỏng</span>. '):""}${r}`}},more||{}));
 if(p.sk==="man"){const m=manById(p.mid);if(!m||!srvAdult(m))return A;const risk=srvRisk(S.place);
  T("Chào hỏi đúng lễ",100,"hắn thiện cảm +5",()=>{m.af+=5;return `${m.name} gật đầu đáp lễ.`});
  T("Liếc mắt đưa tình",od(55+S.sac/5),`tình ý của hắn +12 · có người thấy: ${word(100-Math.round(risk/3))} giữ kín`,ok=>{if(ok)m.tinh+=12+(m.trait==="đa tình"?6:0);if(roll(risk/3))srvSeen(m,1);return ok?`${m.name} khẽ cười.`:"Hắn không để ý."});
  if(m.tinh>=30)T("Trao khăn tay, thư",od(60+S.tamco/5),"tình ý +15 · khăn thư là tang vật nếu bị lục",ok=>{if(ok){m.tinh+=15;m.letters++}if(roll(risk/4))srvSeen(m,1);return ok?"Hắn giấu vội vào tay áo.":"Hắn chần chừ không nhận."});
  if(m.tinh>=50){const fr=srvFriendList();T("Hẹn gặp riêng",fr.length?cl(100-risk,5,95):0,`cần bạn canh cửa · đêm kín đáo: Sức +8, tình ý +10 · có thể mang thai · hỏng: bị bắt, roi vọt, Tân Giả khố hoặc bị đuổi`,ok=>{if(!ok){srvAffairCaught(m,`Đêm ngươi hẹn ${m.name} bị bắt gặp.`);return "Bị bắt gặp."}
    m.trysts++;m.tinh+=10;apply({suc:8});S.srv.lover=m.id;let r=`Đêm ấy rèm buông, đèn tắt; ${fr[0].name} canh ngoài hiên. Trời chưa sáng ngươi đã lẻn về.`;if(!S.srv.preg&&roll(10)){S.srv.preg=1;S.srv.pregM=0;r+=` <b class="r">Mấy hôm sau ngươi biết mình có thai.</b>`}return r},{lock:!fr.length,t:"cần một người bạn (thiện cảm 30+) canh cửa",act:1});
   if(m.rw!=="vương gia"&&S.srv.vow!==m.id)T("Hẹn ước trăm năm",od(45+m.tinh/3),"hắn hứa chờ ngươi xuất cung · mở đường thành thân",ok=>{if(ok){S.srv.vow=m.id;return `${m.name} thề sẽ chờ ngươi.`}return "Hắn ngập ngừng, chưa dám hứa."})}
  if(m.tinh>=30)T("Cắt đứt",100,"hắn thôi tơ tưởng; bớt hẳn rủi ro",()=>{m.tinh=0;if(S.srv.lover===m.id)S.srv.lover=null;if(S.srv.vow===m.id)S.srv.vow=null;return "Ngươi trả lại khăn tay."})}
 if((p.sk==="rv"||p.sk==="hh")&&p.ref){const v=RV(p.ref.id);if(v&&v!==mis&&(S.srv.knowAff||[]).includes(v.id)&&v.affair){const lm=manById(v.affair);
  T(`Dọa tố chuyện tư tình`,od(45+S.tamco/3),`Bạc +30 · nàng phải che chở ngươi · hỏng: nàng oán, có thể hại ngươi`,ok=>{S.srv.knowAff=S.srv.knowAff.filter(x=>x!==v.id);if(ok){apply({bac:30});affAdd(v,S,15);S.srv.hold=v.id;return `${v.name} tái mặt, dúi bạc vào tay ngươi: “Câm miệng.”`}oanAdd(v,S,40);if(roll(35))srvLaundry(`${v.name} ra tay trước, vu cho ngươi ăn cắp.`,8);return `${v.name} cười lạnh.`},{act:1});
  if(mis)T(`Bẩm chủ chuyện của ${v.name}`,100,`Chủ tin +6 · ${mis.name} nắm 2 chứng cứ của ${v.name}`,()=>{S.srv.knowAff=S.srv.knowAff.filter(x=>x!==v.id);evA(mis,v,2);apply({tin:6});return `${mis.name} ghi nhớ.${lm?" Chuyện "+v.name+" với "+lm.name+" thành thanh gươm trong tay chủ.":""}`})}}}catch(e){console.error(e)}return A}})();
/* the week: talk spreads, rivals use it; a token may be found */
(function(){const w0=srvWeek;srvWeek=function(){w0.apply(this,arguments);try{if(!isSrv()||S.dead||Q.length)return;const mis=srvM();const lover=S.srv.lover&&manById(S.srv.lover);
 const hot=srvMen().filter(m=>m.tinh>=30);if(!hot.length&&!S.srv.rumor)return;
 if(S.srv.leak&&roll(12)){const v=RV(S.srv.leak);if(v&&v.alive&&v!==mis){pushDil(mkP("cnvBlack",{r:v.id}),"Bị nắm thóp");return}}
 const m=lover||hot[0];if(m&&roll(1.5+(S.srv.rumor||0)*1.5+(mis&&mis.trait==="Đa nghi"?3:0)+m.letters*.5)){srvAffairCaught(m,`${mis?mis.name:"Quản sự"} lục rương, thấy khăn thư của ${m.name}.`)}}catch(e){console.error(e)}}})();
/* the month: the pregnancy clock, grants, a prince's ask, NPC maids, consorts' own affairs */
(function(){const m0=srvMonth;srvMonth=function(){let ev=m0.apply(this,arguments);try{
 ev+=srvW(()=>{try{return affairMonth()||""}catch(e){return""}})||"";
 ev+=maidLoveMonth();
 if(!isSrv()||S.dead)return ev;S.srv.rumor=Math.max(0,(S.srv.rumor||0)-1);
 if(S.srv.preg){S.srv.pregM=(S.srv.pregM||0)+1;if(S.srv.pregM>=3){const m=manById(S.srv.lover)||srvBond();srvAffairCaught(m,"Bụng ngươi lộ rõ, cung nhân xì xào.");return ev}}
 if(S.age<18||S.srv.lau>0||Q.length)return ev;const mis=srvM();
 const pr=srvMen().find(m=>m.rw==="vương gia"&&m.tinh>=40);if(pr&&roll(6)){pushDil(mkP("cnvPrince",{m:pr.id}),"Vương gia xin người");return ev}
 const thF=S.srv.thf||0;if((S.tin>=55||thF>=3)&&S.srv.rk>=1&&roll(2+(srvBond()?3:0)+thF)){const b=srvBond();pushDil(mkP("cnvGrant",{by:thF>=3&&roll(50)?"th":"mis",m:b&&roll(70)?b.id:null,w:R(WEDW.length)}),"Ban hôn")}}catch(e){console.error(e)}return ev}})();
/* Đức Thọ cung errands earn the Thái hậu's eye (a grant may come from her) */
(function(){const e0=srvErrandDone;srvErrandDone=function(){const sn=S.srv.sent;const r=e0.apply(this,arguments);if(sn&&sn.k==="tn"&&!S.thDead)S.srv.thf=(S.srv.thf||0)+1;return r}})();
/* NPC maids: the same road (love a palace man, caught or married off) */
function maidLoveMonth(){let ev="";try{const M=srvMen();if(!M.length)return"";const L=allServ().filter(s=>s.role==="maid"&&(s.age||20)>=18);
 if(L.length&&roll(25)){const s=pick(L.filter(x=>!x.manLove));if(s){const m=pick(M.filter(x=>x.rw!=="vương gia"));if(m)s.manLove=m.id}}
 for(const s of L.filter(x=>x.manLove)){const m=manById(s.manLove);const o=ownerOf(s);if(!m||!o){s.manLove=null;continue}
  const mine=isSrv()&&(o===srvM()||(S.srv.af[s.sid]||0)>=30);
  if(roll(4)){o.staff.splice(o.staff.indexOf(s),1);const t=roll(30)?`bị đuổi khỏi cung`:`bị đày xuống Tân Giả khố`;if(m.rw!=="vương gia"&&roll(35)){m.alive=false}const line=`${s.name}, cung nữ của ${NM(o)}, tư tình với ${m.name} bị lộ: ${t}${m.alive?"":"; hắn bị đày ra biên ải"}. `;log(line);if(mine)ev+=line;continue}
  if(roll(3)){o.staff.splice(o.staff.indexOf(s),1);const line=`${s.name}, cung nữ của ${NM(o)}, được chủ ban gả cho ${m.name}. `;log(line);if(mine)ev+=line}}}catch(e){console.error(e)}return ev}
(function(){const m0=monthTick;monthTick=function(){let ev=m0.apply(this,arguments);try{if(!S.dead&&!isSrv())maidLoveMonth()}catch(e){}return ev}})();
/* the choice cards */
PEND.cnvBlack=pp=>{const v=RV(pp.r),mis=srvM();if(!isSrv()||!v||!v.alive)return null;
 return{t:`<p>Thái giám của ${v.name} chặn ngươi sau hòn non bộ: “Chuyện ngươi với nam nhân bên ngoài, chủ tử nhà ta biết cả. Muốn giữ mạng thì nghe lời.”</p>`,who:pv(v),o:[
  {n:"Nghe lời, làm tai mắt",fx:{},x:`thành tai mắt của ${v.name} (không bạc) · chủ ngươi có thể phát hiện`,go:()=>{S.srv.spyFor=v.id;S.srv.leak=null}},
  {n:"Đút bạc bịt miệng",fx:{bac:-20},x:"lần này thôi; tin đồn bớt",go:()=>{S.srv.leak=null;S.srv.rumor=0}},
  {n:"Mặc kệ",fx:{},x:`${word(40)} · thành: nàng không nói · hỏng: nàng mách ${mis?mis.name:"quản sự"}, bị lục rương`,go:()=>{if(!roll(40)){const m=manById(S.srv.lover)||srvMen().filter(x=>x.tinh>=30)[0];if(m)srvAffairCaught(m,`${v.name} sai người mách chuyện tư tình của ngươi.`)}else S.srv.leak=null}}]}};
PEND.cnvGrant=pp=>{if(!isSrv()||(S.age||0)<18)return null;const m=pp.m&&manById(pp.m);const w=m?m.name:WEDW[pp.w||0];const by=pp.by==="th"&&!S.thDead?"Thái hậu":(srvM()?srvM().name:"Chủ nhân");
 return{t:`<p>${by} khen ngươi hầu hạ chu đáo, muốn ban gả ngươi cho <b>${w}</b>${m?`, người ngươi ${tinhW(m.tinh).replace("ngươi","")}`:""}.</p>`,who:pp.by==="th"?pTH():(srvM()?pv(srvM()):pMe()),o:[
  {n:"Tạ ơn, xuất giá",fx:{},x:"kết thúc kiếp này: được ban hôn",go:()=>over("Được ban hôn",`${by} ban gả ${S.name} cho ${w}. Ngươi rời cung có của hồi môn${m?", về với người mình thương":""}.`,`Được ${by} ban hôn cho ${w}`)},
  {n:"Xin ở lại",fx:{tin:pp.by==="th"?0:-5},x:"từ chối khéo"}]}};
PEND.cnvPrince=pp=>{const m=manById(pp.m);if(!isSrv()||!m||!srvAdult(m))return null;
 return{t:`<p>${m.name} dâng sớ xin Hoàng thượng ban cung nữ ${S.name} về phủ làm thiếp.</p>`,who:pMan(m),o:[
  {n:"Theo về vương phủ",fx:{},x:"kết thúc kiếp này: làm thiếp vương gia",go:()=>over("Vào vương phủ",`${S.name} được ban về phủ ${m.name} làm thiếp. Từ phòng cung nữ, ngươi bước vào một hậu viện khác.`,`Làm thiếp của ${m.name}`)},
  {n:"Xin ở lại hầu chủ",fx:{tin:3},x:"vương gia phật ý: tình ý -15",go:()=>{m.tinh=Math.max(0,m.tinh-15)}}]}};
/* release age: marry the man she is bound to */
(function(){const a0=PEND.cnvAge;PEND.cnvAge=pp=>{const d=a0(pp);try{const b=srvBond();if(d&&b)d.o.unshift({n:`Xuất cung thành thân với ${b.name}`,fx:{},x:`kết thúc kiếp này · ${b.name} ${tinhW(b.tinh)}`,go:()=>over("Thành thân",`${S.name} ${S.age} tuổi, rời cung theo lệ. Ngoài cửa Thần Vũ, ${b.name} đã đứng chờ. Hai người thành thân, sống nốt đời bên nhau.`,`Xuất cung thành thân với ${b.name}`)})}catch(e){}return d}})();
(function(){const o0=over;over=function(h,t,fate){if(isSrv()&&h==="Xuất cung"&&/30 tuổi/.test(t)){const b=srvBond();if(b){h="Thành thân";t+=` ${b.name} chờ ngươi ngoài cửa cung; hai người thành thân.`;fate=`Xuất cung thành thân với ${b.name}`}}return o0.call(this,h,t,fate)}})();
/* her road page shows her bonds */
(function(){const r0=srvRows;srvRows=function(){const L=r0.apply(this,arguments);try{const row=(a,b)=>`<div class="pcrow"><span>${a}</span><b>${b}</b></div>`;const H=srvMen().filter(m=>m.tinh>=10||m.af>=10);
 L.push(row("Nam nhân",H.length?H.map(m=>`${m.role} ${m.name.split(" ").slice(-2).join(" ")}: ${tinhW(m.tinh)}${S.srv.vow===m.id?" · đã hẹn ước":""}${S.srv.lover===m.id?" · tư tình":""}`).join("; "):"chưa quen ai (gặp ở vườn, điện, Thái y viện)"));
 if(S.srv.rumor||S.srv.leak)L.push(row("Lời đồn",`${S.srv.rumor||0}${S.srv.leak&&RV(S.srv.leak)?" · "+RV(S.srv.leak).name+" biết chuyện":""}`));
 if(S.srv.preg)L.push(row("Mang thai",`tháng ${S.srv.preg?S.srv.pregM+1:0}/3 · lộ thì có thể chết`));
 if((S.srv.knowAff||[]).length)L.push(row("Biết tư tình của",S.srv.knowAff.map(RV).filter(Boolean).map(v=>v.name).join(", ")))}catch(e){}return L}})();
/* a pregnancy she cannot show: the same hard road, priced */
(function(){const c0=srvCards;srvCards=function(){const X=c0.apply(this,arguments);try{if(isSrv()&&S.srv.preg&&!srvOnce("abort"))X.unshift({n:"Uống thuốc phá thai",t:"Mua thuốc của tiểu thái giám, uống lén trong đêm.",k:1,c:{bac:-20},o:od(60),w:{},l:{suc:-30},x:"hết thai, Sức -15 · hỏng: băng huyết Sức -30, có thể chết",once:"abort",dom:"",go:()=>{S.srv.preg=0;apply({suc:-15})},fail:()=>{S.srv.preg=0;if(roll(20))die("Uống thuốc phá thai, băng huyết mà chết")}})}catch(e){}return X}})();
/* a friend's tip may be a consort's affair */
(function(){const f0=srvFriendTip;srvFriendTip=function(){const v=liveRivals(true).find(x=>x.affair&&x!==srvM()&&!(S.srv.knowAff||[]).includes(x.id));if(v&&srvFriendList().length&&roll(30)){S.srv.knowAff=(S.srv.knowAff||[]).concat([v.id]);log(`${srvFriendList()[0].name} thì thầm: ${v.name} lén gặp ${manById(v.affair)?manById(v.affair).name:"một nam nhân"}.`);return}return f0.apply(this,arguments)}})();
