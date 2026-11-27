/* ================= jamove: ACT-MOVE — person acts leave the Hậu cung card, they live where the person really is (worker ACT-MOVE-2, MAIN CHÍNH 168) =================
   Owner OD 27/11 ~00:32Z (Hậu cung = info only; acts only by MEETING the person on Dư đồ / Hành sự, tùy duyên), ~00:42Z (card = TWO general buttons
   «Tìm gặp» + «Ghé cung»; PALACE-bound acts at her palace even when she is out; PERSON-bound acts only face to face), ~00:46Z (law 2: tiers nhẹ·vừa·nặng),
   ~00:54Z (Emperor pop-up = exactly 6 merged moves), ~01:00Z (general button, SPECIFIC true result). Plan + design: dev/handover/reports/act-move*.md.
   NOTHING IS DELETED: every act keeps its own path (doAct + wrappers, its BAL numbers, its result card). This file only moves WHERE a button is offered:
   (1) the act-binding lists BAL.df.person / palace / either / personE (jbaldf) feed the stage pop-up doors (dfInPerson + DOOR.more of jdf),
   (2) doors P5–P14 + «Giao hảo» also open for her pop-up away from the card and for the chest «Rương của …» at her palace,
   (3) every resident consort who is out gets her chest at her palace (law 6c: her things are there),
   (4) the Emperor's pop-up = 6 moves: Hiến nghệ · Dâng lễ vật · Hầu chuyện (doors, tiers inside) · Chặn ngự giá · Xin ân điển · Đút lót lật thẻ;
       each result names the real cause from game data (his likes, nết, mood, her art + level, the real item),
   (5) the Hậu cung consort / Chí tôn cards show info only + amCardBtns(v) (the hook KK51-P's person card calls).
   Draws nothing of its own: buttons are pbtn (kit), doors are the ONE door engine (jdoor), cards are pcard. ===================================== */
(function(){
const AMV={card:1,c:new Map(),t:0};window.AMV=AMV;
const D=()=>(typeof BAL==="object"&&BAL.df)||{};
const txt=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
/* a short-lived memo (one paint): the door engine asks the same person + row many times while one pop-up is built */
function memo(key,f){if(AMV.c.has(key))return AMV.c.get(key);const r=f();AMV.c.set(key,r);if(!AMV.t)AMV.t=setTimeout(()=>{AMV.c.clear();AMV.t=0},0);return r}
function stamp(){try{return [S.turn||0,S.buoi||0,typeof used!=="undefined"?used:0,S.logSeq||0,S.bac|0,S.place,S.visit&&S.visit.k,Q.length].join(":")}catch(e){return Math.random()}}
/* ---- (1) where she stands toward a consort: face to face (her real place) and / or at the consort's own palace ---- */
function amAt(p){const v=p&&p.ref;if(!v||!(p.kind==="rival"||p.kind==="hh"||p.kind==="chest")||typeof rivals==="undefined"||rivals.indexOf(v)<0)return null;
 if(!v.alive||v.out||sameHouse(S,v))return null;
 return {v,per:p.kind!=="chest"&&together(S,v),pal:!!S.visit&&S.place===palaceOf(v)}}
/* the member ids (a:<ACT key> · e:<Quyền Hoàng hậu key>) she may use on this person HERE */
function amIds(p){const w=amAt(p);if(!w)return[];const B=D(),ids=[];const add=(t,L)=>(L||[]).forEach(k=>{const id=t+":"+k;if(!ids.includes(id))ids.push(id)});
 if(w.per){add("a",B.person);add("a",B.either);add("e",B.personE)}
 if(w.pal){add("a",B.palace);add("a",B.either)}
 return ids}
window.amIds=amIds;
/* jdf dfInPerson: the standalone acts of the focus view (a door row with one member) — same lock as before (a.ok + j61 name lock), now by place */
dfInPerson=function(p){const L=[];const w=amAt(p);if(!w||typeof ACT!=="object")return L;const i=rivals.indexOf(w.v);
 for(const id of amIds(p)){if(id[0]!=="a")continue;const k=id.slice(2),a=ACT[k];if(!a)continue;let ok=false;try{ok=!!a.ok(S,w.v)&&(typeof k61Named!=="function"||k61Named(w.v))}catch(e){}if(ok)L.push({k,a,i})}
 return L};
window.dfInPerson=dfInPerson;
/* ---- (2) the doors: rows open for her pop-up + the chest; members = the old card buttons (greyed ones keep their reason) ---- */
function amRows(){if(typeof DOOR!=="object"||!DOOR||AMV.rows)return;AMV.rows=1;
 for(const k of ["P5","P7","P8","P9","P10","P11","P12","P13","P14"]){const r=DOOR.byK(k);if(!r)continue;for(const x of ["rival","hh","chest"])if(!r.kinds.includes(x))r.kinds.push(x)}
 const gh=DOOR.byK("gh");if(gh){gh.acts=Object.assign({},gh.acts||{},{a:["ally","gift","petcare"]});for(const x of ["chest","card"])if(!gh.kinds.includes(x))gh.kinds.push(x)}
 /* (4) the Emperor: Phô tài → «Hiến nghệ» (one button for every art: her best art · or hầu cờ / đánh đàn); «Hầu chuyện» gets the garden walk; «Dâng lễ vật» */
 const pho=DOOR.byK("pho");if(pho){Object.assign(pho,{n:"Hiến nghệ",rep:"Phô tài",h:"Chọn cách hiến nghệ trước Hoàng thượng.",re:/^Phô tài/,acts:{x:["kmky","kmcam"]},roll:[["x:kmky","x:kmcam"]],
  tiers:new Proxy({},{get:(o,id)=>typeof id!=="string"?undefined:/^t:Phô tài/.test(id)?"nhẹ":/^x:km/.test(id)?"vừa":undefined})})}
 const hau=DOOR.byK("hau");if(hau){Object.assign(hau,{acts:{x:["walk"]},roll:[["t:Bàn chuyện triều chính","x:walk"]],
  tiers:{"t:Tâng bốc":"nhẹ","t:Nói thật lòng":"vừa","t:Bàn chuyện triều chính":"nặng","x:walk":"nặng"}})}
 DOOR.add({k:"dl",n:"Dâng lễ vật",kinds:["emp"],rep:null,h:"Chọn lễ vật dâng Hoàng thượng.",re:/^Dâng /,acts:{x:["giftemp"]},
  tiers:new Proxy({},{get:(o,id)=>typeof id!=="string"?undefined:/^t:Dâng /.test(id)?"nhẹ":id==="x:giftemp"?"vừa":undefined})});
 DOOR.names=new Set(DOOR.T.map(r=>r.n))}
function amEmpMore(p,r){if(!r||!["pho","hau","dl"].includes(r.k))return[];if(S.visit&&(S.visit.talked===true||(S.visit.tk||{})[curPeople().indexOf(p)]))return[];
 const M=[];const km=k=>{if(typeof KM_EMPACT!=="object"||!KM_EMPACT[k])return;const why=kmEmpWhy(S,k);M.push({id:"x:"+(k==="walk"?"walk":"km"+k),n:KM_EMPACT[k][0],x:kmEmpLine(k),off:!!why,why,go:()=>kmEmpRun(k)})};
 if(r.k==="pho"){km("ky");km("cam")}
 if(r.k==="hau")km("walk");
 if(r.k==="dl"){const n=S.inv.filter(e=>e&&!e.h&&(e.wk||IT[e.k])).length;const why=!n?"rương trống":!can(2)?(txt(whyTime(2))||"hết khắc buổi này"):"";
  M.push({id:"x:giftemp",n:"Dâng quà trong rương",x:`tốn: 2 khắc · thành: chọn một món trong rương (${n} món), mỗi món ghi đúng điều được`,off:!!why,why,go:()=>{if(!can(2))return;pushDil(mkP("giftto",{t:"emp"}),"Dâng lễ vật");render()}})}
 return M}
function amMore(p,r){try{if(!p||!r)return[];if(p.kind==="emp")return amEmpMore(p,r);
 const w=amAt(p);if(!w||(typeof k61Named==="function"&&!k61Named(w.v)))return[];/* j61: an act on a person she cannot name is never offered */
 if(S.visit&&(S.visit.talked===true||(S.visit.tk||{})[curPeople().indexOf(p)]))return[];
 return memo(["more",p.kind,w.v.id,r.k,stamp()].join("|"),()=>{const ids=amIds(p).filter(id=>{const m=DOOR.ofId(id);return m&&m.r===r});if(!ids.length)return[];
  /* the same act already offered as a talk member of this door (Kết giao / Tặng quà …) is not offered twice */
  const tn=new Set();try{doorRaw(p).forEach(a=>{if(a&&!a.door&&!a.k61&&DOOR.of(a.n,p.kind)===r)tn.add(txt(a.n))})}catch(e){}
  const all=memo(["card",w.v.id,stamp()].join("|"),()=>doorCardAll(rivals.indexOf(w.v)));
  return all.filter(b=>ids.includes(b.id)&&!tn.has(txt(b.n)))})}catch(e){console.error("amove more",e);return[]}}
function amAttach(){if(typeof DOOR!=="object"||!DOOR)return;try{doorJ2Attach()}catch(e){}amRows();DOOR.more=amMore}
amAttach();setTimeout(amAttach,0);
/* ---- (3) her palace: every resident consort who is out has her chest there (the palace head already had one, j2) ---- */
(function(){if(typeof goTo!=="function")return;const g0=goTo;goTo=function(k){const r=g0.apply(this,arguments);try{amChests()}catch(e){console.error("amove chests",e)}return r}})();
function amChests(){const V=S.visit;if(!V||!Array.isArray(V.people)||typeof rivals==="undefined")return;const k=V.k;if(!k||!(/^r\d+$/.test(k)||k==="kn"))return;let add=0;
 for(const v of rivals){if(!v||!v.alive||v.out||sameHouse(S,v)||palaceOf(v)!==k)continue;if(V.people.some(p=>p&&p.ref===v))continue;
  V.people.push({kind:"chest",ref:v,name:`Rương của ${v.name}`,ini:"Rương",col:"#8a6a4a",info:"Chủ nhân đi vắng"});add++}
 if(add)try{render()}catch(e){}}
window.amChests=amChests;
/* ---- (4) the Emperor's pop-up: 6 moves; Thái hậu: + Dâng lễ vật; the unnamed consort: ask the maid (the old card's «Làm quen») ---- */
const AM_FAV=()=>(BAL.ag&&BAL.ag.cx2&&BAL.ag.cx2.favor&&BAL.ag.cx2.favor.min)||0;
function moodN(){try{return MOODS[S.emp.mood][0].toLowerCase()}catch(e){return"bình thường"}}
function likeKnown(){try{const E=S.emp;const k=Object.keys(LIKES).find(x=>E.known[x]&&E.likes[x]);return k?`${LIKEN[k]}: ${E.likes[k]}`:""}catch(e){return""}}
function traitN(){try{const t=(S.emp.traits||[])[0];return t&&ETRAITS[t]?ETRAITS[t][0]:""}catch(e){return""}}
/* the result names WHAT happened and WHY, read from the game (owner ~01:00Z); the stat change stays the act's own (law 4) */
function amCause(a){const n=txt(a&&a.n);
 if(n==="Tâng bốc")return ok=>{const L=likeKnown();return ok?(L?`Ngươi khen đúng điều ngài ưa (${L}), ngài đẹp lòng.`:`Ngài đang ${moodN()}, nghe lời khen thấy vui.`):`Ngài đang ${moodN()}, lời tâng bốc không lọt tai.`};
 if(n==="Nói thật lòng")return ok=>{const t=traitN();return ok?`Lời thật lòng hợp nết${t?` «${t}»`:""} của ngài.`:`Lời thật mất lòng${t?`: ngài nết «${t}»`:""}, không ưa bị nói thẳng.`};
 if(n==="Bàn chuyện triều chính")return ok=>ok?"Ngươi bàn việc nước có kiến giải, ngài nể tài.":"Bàn chuyện triều chính, Hoàng thượng không vui: hậu cung không được bàn chính sự.";
 if(/^Phô tài/.test(n))return ok=>{let s="";try{const b=bestArt();s=b.k?`${b.n} bậc ${b.l} · ${artNm(b.l)}`:b.n}catch(e){}return ok?`Ngươi phô tài ${s}, ngài khen hay.`:`Ngươi phô tài ${s}, ngài nghe chưa vừa ý.`};
 if(/^Dâng /.test(n))return ok=>{let f="";try{f=S.emp.known.flower?S.emp.likes.flower:""}catch(e){}return f?`Dâng đúng loài hoa ngài ưa: ${f}.`:ok?"Ngài nhận cành hoa, khen ngươi có lòng.":"Ngài liếc qua cành hoa rồi để sang bên: chưa phải loài ngài ưa."};
 if(n==="Xin ân điển")return ok=>ok?`Ngài đang ${moodN()}, chuẩn lời ngươi xin.`:`Ngài đang ${moodN()}, không muốn bị làm phiền.`;
 return null}
function amEmpOpts(p,A){const gate=!!(A[0]&&A[0].k61);/* a stranger (j61 gate: greet first): the added moves wait behind the greeting like the rest */
 const n0=A.length;
 for(const a of A)if(a&&!a.door&&!a.cause){const c=amCause(a);if(c)a.cause=c}
 for(const d of A)if(d&&d.door&&Array.isArray(d.m))for(const a of d.m)if(a&&!a.cause){const c=amCause(a);if(c)a.cause=c}
 /* Xin ân điển: always one of the six (greyed with its own gate when Sủng is short) */
 if(!A.some(a=>a&&txt(a.n)==="Xin ân điển"))A.push({n:"Xin ân điển",o:100,lock:true,t:`cần Sủng ${AM_FAV()}`});
 /* Chặn ngự giá: the night act against the consort he picked tonight (j8 ACT road, its own cost / odds / result) */
 try{const t=typeof tonightOf==="function"?tonightOf():null;const ri=t&&t!==S?rivals.indexOf(t):-1;let ok=false;try{ok=ri>=0&&!!ACT.road&&!!ACT.road.ok(S,t)}catch(e){}
  A.push(ok?{n:"Chặn ngự giá",o:100,fix:1,act:1,x:`${typeof oSteal==="function"?word(oSteal(S,"road"))+" · ":""}chờ ngự giá trên đường đến cung ${t.name}`,open:()=>doorFireAct(ri,"road")}
   :{n:"Chặn ngự giá",o:100,lock:true,t:"chỉ khi đêm nay ngài đã lật thẻ người khác"})}catch(e){console.error("amove road",e)}
 /* Đút lót lật thẻ: the Kính sự phòng act (j2 talk ksp + jtwoway cost), sent from here */
 try{const kp={kind:"ksp",name:(S.court&&S.court.ksp&&S.court.ksp.name)||"Tổng quản"};let R=[];/* she sends someone: the Tổng quản's stranger gate (j61) is about HER meeting him, not about a sent bribe */const k0=K61RAW;K61RAW=true;try{R=typeof doorRaw==="function"?doorRaw(kp):talkOpts(kp)}finally{K61RAW=k0}const b=(R||[]).find(a=>a&&a.n==="Đút lót lật thẻ");
  if(b)A.push(Object.assign({},b,{x:`sai người sang Kính sự phòng · ${b.x||""}`}))}catch(e){console.error("amove ksp",e)}
 if(gate)for(let j=n0;j<A.length;j++)A[j]=Object.assign({},A[j],{lock:true,t:typeof K61WHY==="string"?K61WHY:"chưa biết người này là ai"});
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(!p||!Array.isArray(A))return A;
 try{if(p.kind==="emp")return amEmpOpts(p,A);
  if(p.kind==="th"&&!S.thDead&&!A.some(a=>a&&a.n==="Dâng lễ vật")){const n=S.inv.filter(e=>e&&!e.h&&(e.wk||IT[e.k])).length;
   A.push({n:"Dâng lễ vật",o:100,lock:!n,t:"rương trống",x:`tốn: 2 khắc · thành: chọn một món trong rương (${n} món), mỗi món ghi đúng điều được`,open:()=>{if(can(2)){pushDil(mkP("giftto",{t:"th"}),"Dâng lễ vật");render()}}})}
  if((p.kind==="rival"||p.kind==="hh")&&p.ref&&typeof k61Named==="function"&&!k61Named(p.ref)&&typeof k61Ask==="function"&&typeof kOf61==="function"&&!A.some(a=>a&&a.n==="Hỏi người hầu: đó là ai?")){
   const v=p.ref;A.push({n:"Hỏi người hầu: đó là ai?",o:100,lock:!can(1),t:"hết khắc buổi này",x:"tốn: 1 khắc · thành: biết người này là ai (lời thật) · hỏng: người hầu cũng không biết",open:()=>k61Ask(kOf61(v))})}}
 catch(e){console.error("amove talkOpts",e)}return A}})();
/* the result line: append the real cause to the talk result («Hầu chuyện», «Hiến nghệ», «Dâng lễ vật», «Xin ân điển») */
(function(){const t0=talk;talk=function(oi){let a=null;try{const p=curPeople()[popIdx];if(p&&p.kind==="emp")a=talkOpts(p)[oi]}catch(e){}const s0=typeof popMsg==="string"?popMsg:"";const r=t0.apply(this,arguments);
 try{if(a&&typeof a.cause==="function"&&typeof popMsg==="string"&&popMsg!==s0&&/class="[gr]">(thành|hỏng)</.test(popMsg)){const ok=/class="g">thành</.test(popMsg);const c=a.cause(ok);
   if(c){popMsg=popMsg.replace(/(<span class="[gr]">(?:thành|hỏng)<\/span>\.)/,`$1 ${c}`);log(`${txt(a.n)}: ${c}`);try{render()}catch(e){}}}}catch(e){console.error("amove cause",e)}return r}})();
/* ---- (5) the Hậu cung cards: info only + two general buttons (the hook KK51-P's card calls: amCardBtns(v)) ---- */
function amRetitle(h,t){return String(h||"").replace(/^(<button[^>]*>)([\s\S]*?)(<small>)/,`$1${t}$3`)}
function amOff(t,why){return pbtn('data-amoff="1"',t,"",why)}
function amCardBtns(v){try{
 if(v==="emp"){const B=typeof courtMeet==="function"?courtMeet("emp"):[];const go=B.find(b=>/data-(kgmgo|acask)=/.test(b));
  if(go)return[amRetitle(go,"Tìm gặp")];if(B.some(b=>/kr3note/.test(b)))return[amOff("Tìm gặp","ngài đang ở đây: chạm vào ngài trên sân khấu")];
  const f=typeof kmEmpFree==="function"?kmEmpFree():{why:""};return[amOff("Tìm gặp",f.why||"chưa rõ ngài ở đâu")]}
 if(v==="th"){if(S.thDead)return[];const B=typeof courtMeet==="function"?courtMeet("th"):[];const go=B.find(b=>/data-kgmgo=/.test(b));
  return[go?amRetitle(go,"Ghé cung"):amOff("Ghé cung","đang ở Đức Thọ cung: chạm vào Thái hậu trên sân khấu")]}
 if(!v||!v.alive||v.out)return[];
 const see=seeBtn(v),sc=scoutBtn(v),vis=visitBtn(v);
 const a=see?amRetitle(see,"Tìm gặp"):sc?amRetitle(sc,"Tìm gặp"):amOff("Tìm gặp",together(S,v)?"đang cùng chỗ: chạm vào nàng trên sân khấu":"chưa tìm được lúc này");
 const b=vis?amRetitle(vis,"Ghé cung"):amOff("Ghé cung",sameHouse(S,v)?"cùng cung với ngươi":S.place===palaceOf(v)?"đang ở cung nàng":"chưa đến được lúc này");
 return[a,b]}catch(e){console.error("amCardBtns",e);return[]}}
window.amCardBtns=amCardBtns;
(function(){if(typeof k61AskBtn!=="function")return;const a0=k61AskBtn;k61AskBtn=function(){return AMV.inCard?"":a0.apply(this,arguments)}})();
(function(){if(typeof pcard!=="function")return;const P0=pcard;pcard=function(o){if(!AMV.card||!o||o.close)return P0.apply(this,arguments);let v=null;
 try{if(o.tabKey==="rival"&&!o.status){v=rivals.find(x=>x&&x.name===o.name)||null;if(v){o=Object.assign({},o,{groups:[["",amCardBtns(v)]],note:sameHouse(S,v)?o.note:""})}}
  else if(o.rank==="Hoàng thượng"&&Array.isArray(o.groups)&&o.groups.some(g=>g&&g[0]==="Việc hôm nay")){v="emp";o=Object.assign({},o,{groups:[["",amCardBtns("emp")]].concat(o.groups.filter(g=>g&&g[0]==="Điều ngài thích"))})}
  else if(/^Thái hậu/.test(o.rank||"")&&Array.isArray(o.groups)&&o.groups.some(g=>g&&g[0]==="Việc hôm nay")){v="th";o=Object.assign({},o,{groups:[["",amCardBtns("th")]]})}}catch(e){console.error("amove card",e)}
 if(!v)return P0.apply(this,[o]);AMV.inCard=1;try{return P0.apply(this,[o])}finally{AMV.inCard=0}}})();
/* the greyed info button «Tìm gặp / Ghé cung» never fires anything */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-amoff]");if(b){e.stopPropagation();e.preventDefault()}},true);
})();
