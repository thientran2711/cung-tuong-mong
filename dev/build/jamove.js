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
 if(r.k==="dl"){const n=S.inv.filter(e=>e&&!e.h&&(e.wk||IT[e.k])).length;const why=!n?"rương trống":!can(BAL.time.cost.give)?(txt(whyTime(BAL.time.cost.give))||"hết khắc buổi này"):"";
  M.push({id:"x:giftemp",n:"Dâng quà trong rương",x:`tốn: ${BAL.time.cost.give} khắc · thành: chọn một món trong rương (${n} món), mỗi món ghi đúng điều được`,off:!!why,why,go:()=>{if(!can(BAL.time.cost.give))return;pushDil(mkP("giftto",{t:"emp"}),"Dâng lễ vật");render()}})}
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
 if(!A.some(a=>a&&txt(a.n)==="Xin ân điển"))A.push({n:"Xin ân điển",o:100,lock:true,t:`cần Sủng ${AM_FAV()}`,x:`thành: ngài ban ${fmt(BAL.ag.cx2.favor.w)}`/* ACT-MOVE-6 law 3: what the real option gives (j2 favor w) */});
 /* Chặn ngự giá: the night act against the consort he picked tonight (j8 ACT road, its own cost / odds / result) */
 try{const t=typeof tonightOf==="function"?tonightOf():null;const ri=t&&t!==S?rivals.indexOf(t):-1;let ok=false;try{ok=ri>=0&&!!ACT.road&&!!ACT.road.ok(S,t)}catch(e){}
  A.push(ok?{n:"Chặn ngự giá",o:100,fix:1,act:1,x:`${typeof oSteal==="function"?word(oSteal(S,"road"))+" · ":""}tốn: ${fmt(stealCost("road"))} · thành: Hoàng thượng dừng bước, sang cung ngươi đêm nay thay vì cung ${t.name} · hỏng: ${fmt(stealLose("road"))}`/* ACT-MOVE-6 law 3: j8 ACT road → stealNight (cost / loss = BAL.steal via stealCost / stealLose) */,open:()=>doorFireAct(ri,"road")}
   :{n:"Chặn ngự giá",o:100,lock:true,t:"chỉ khi đêm nay ngài đã lật thẻ người khác",x:"thành: Hoàng thượng dừng bước, sang cung ngươi đêm nay"})}catch(e){console.error("amove road",e)}
 /* Đút lót lật thẻ: the Kính sự phòng act (j2 talk ksp + jtwoway cost), sent from here */
 try{const kp={kind:"ksp",name:(S.court&&S.court.ksp&&S.court.ksp.name)||"Tổng quản"};let R=[];/* she sends someone: the Tổng quản's stranger gate (j61) is about HER meeting him, not about a sent bribe */const k0=K61RAW;K61RAW=true;try{R=typeof doorRaw==="function"?doorRaw(kp):talkOpts(kp)}finally{K61RAW=k0}const b=(R||[]).find(a=>a&&a.n==="Đút lót lật thẻ");
  if(b)A.push(Object.assign({},b,{x:`sai người sang Kính sự phòng · ${b.x||""}`}))}catch(e){console.error("amove ksp",e)}
 if(gate)for(let j=n0;j<A.length;j++)A[j]=Object.assign({},A[j],{lock:true,t:typeof K61WHY==="string"?K61WHY:"chưa biết người này là ai"});
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(!p||!Array.isArray(A))return A;
 try{if(p.kind==="emp")return amEmpOpts(p,A);
  if(p.kind==="th"&&!S.thDead&&!A.some(a=>a&&a.n==="Dâng lễ vật")){const n=S.inv.filter(e=>e&&!e.h&&(e.wk||IT[e.k])).length;
   A.push({n:"Dâng lễ vật",o:100,lock:!n,t:"rương trống",x:`tốn: ${BAL.time.cost.give} khắc · thành: chọn một món trong rương (${n} món), mỗi món ghi đúng điều được`,open:()=>{if(can(BAL.time.cost.give)){pushDil(mkP("giftto",{t:"th"}),"Dâng lễ vật");render()}}})}
  if((p.kind==="rival"||p.kind==="hh")&&p.ref&&typeof k61Named==="function"&&!k61Named(p.ref)&&typeof k61Ask==="function"&&typeof kOf61==="function"&&!A.some(a=>a&&a.n==="Hỏi người hầu: đó là ai?")){
   const v=p.ref;A.push({n:"Hỏi người hầu: đó là ai?",o:100,lock:!can(BAL.time.cost.ask),t:"hết khắc buổi này",x:`tốn: ${BAL.time.cost.ask} khắc · thành: biết người này là ai (lời thật) · hỏng: người hầu cũng không biết`,open:()=>k61Ask(kOf61(v))})}}
 catch(e){console.error("amove talkOpts",e)}return A}})();
/* the result line: append the real cause to the talk result («Hầu chuyện», «Hiến nghệ», «Dâng lễ vật», «Xin ân điển») */
(function(){const t0=talk;talk=function(oi){let a=null;try{const p=curPeople()[popIdx];if(p&&p.kind==="emp")a=talkOpts(p)[oi]}catch(e){}const s0=typeof popMsg==="string"?popMsg:"";const r=t0.apply(this,arguments);
 try{if(a&&typeof a.cause==="function"&&typeof popMsg==="string"&&popMsg!==s0&&/class="[gr]">(thành|hỏng)</.test(popMsg)){const ok=/class="g">thành</.test(popMsg);const c=a.cause(ok);
   if(c){popMsg=popMsg.replace(/(<span class="[gr]">(?:thành|hỏng)<\/span>\.)/,`$1 ${c}`);log(`${txt(a.n)}: ${c}`);try{render()}catch(e){}}}}catch(e){console.error("amove cause",e)}return r}})();
/* ---- (5) the Hậu cung cards: info only + two general buttons (the hook KK51-P's card calls: amCardBtns(v)) ---- */
function amRetitle(h,t){return String(h||"").replace(/^(<button[^>]*>)([\s\S]*?)(<small>)/,`$1${t}$3`)}
function amOff(t,why){return pbtn('data-amoff="1"',t,"",why)}
function amCardBtns(v,kind){if(kind)return amCardPos(v,kind);try{
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
(function(){if(typeof pcard!=="function")return;const P0=pcard;pcard=function(o){if(AMV.cap&&o){const h=P0.apply(this,arguments);try{AMV.cap.set(txt(o.name),h)}catch(e){}return h}
 if(!AMV.card||!o||o.close)return P0.apply(this,arguments);let v=null;
 try{AMV.lastW=null;const b2=amCard2(o);if(b2){const j0=window.__j70off;AMV.inCard=1;window.__j70off=1;try{return amStamp(P0.apply(this,[b2]),AMV.lastW)}finally{AMV.inCard=0;window.__j70off=j0}}}catch(e){console.error("amove card2",e)}
 try{if(o.tabKey==="rival"&&!o.status){v=rivals.find(x=>x&&x.name===o.name)||null;if(v){o=Object.assign({},o,{groups:[["",amCardBtns(v)]],note:sameHouse(S,v)?o.note:""})}}
  else if(o.rank==="Hoàng thượng"&&Array.isArray(o.groups)&&o.groups.some(g=>g&&g[0]==="Việc hôm nay")){v="emp";o=Object.assign({},o,{groups:[["",amCardBtns("emp")]].concat(o.groups.filter(g=>g&&g[0]==="Điều ngài thích"))})}
  else if(/^Thái hậu/.test(o.rank||"")&&Array.isArray(o.groups)&&o.groups.some(g=>g&&g[0]==="Việc hôm nay")){v="th";o=Object.assign({},o,{groups:[["",amCardBtns("th")]]})}}catch(e){console.error("amove card",e)}
 if(!v)return P0.apply(this,[o]);AMV.inCard=1;try{return P0.apply(this,[o])}finally{AMV.inCard=0}}})();
/* ---- (6) BATCH 2 (OD 27/11 ~00:32Z (4) whole family): Cung nhân / Hoàng tự / lãnh cung cards = info only + «Tìm gặp» / «Ghé cung»;
   their acts move onto that person's STAGE pop-up (Dư đồ meet / Hành sự). Bridge = the OLD card's own buttons, read from the card builder
   (staffTabHTML · kidActs · rvCard) and fired by a hidden twin carrying the same data-* (the delegated handlers run unchanged: cost, odds, result). ---- */
const AM_NAV=/^data-(pg|pi|pgo|pager|pct|go|see|scout|visit|amoff|ladder|follow|kgmgo|acask)$/;
const AM_POST={ty:"tyv",ksp:"ksp",tq:"thu",ped:"nvp"};
/* MAIN 171 LOOK FAIL (kit rows glued): while an old card is captured, pbtn keeps its RAW small text (odds word · tốn: … · thành: … · hỏng: … · kèm: …)
   on the button (data-amx), so the pop-up option re-parses it into the kit rows (kaRows / kitParse) instead of getting tag-stripped rendered rows */
(function(){if(typeof pbtn!=="function")return;const p0=pbtn;pbtn=function(at,n,sm,why){const h=p0.apply(this,arguments);if(!(AMV.cap||AMV.rawOn)||typeof h!=="string")return h;
 return h.replace(/^<button /,`<button data-amx="${encodeURIComponent(String(sm||""))}" `)};window.pbtn=pbtn})();
/* fallback for a button not made by pbtn: rebuild «label: value» segments from the rendered kit rows (span.kl), the odds chip word first */
function amRawOf(sm,why){const c=sm.cloneNode(true);c.querySelectorAll(".kwhy").forEach(e=>e.remove());const S2=[];const od=c.querySelector(".kodds,.oc");
 if(od){const w=txt((od.querySelector(".kow,.ocw")||od).textContent);if(w)S2.push(w);od.remove()}
 let cur=null;for(const n of [...c.childNodes]){if(n.nodeType===1&&n.classList.contains("kl")){cur={l:txt(n.textContent),v:""};S2.push(cur);continue}
  const t=n.nodeType===1?n.outerHTML:String(n.textContent||"");if(cur)cur.v+=t;else if(txt(t))S2.push({l:"",v:t})}
 return S2.map(s=>typeof s==="string"?s:s.l?`${s.l}: ${s.v.trim()}`:s.v.trim()).filter(Boolean).join(" · ")}
function amBtnsOf(h){const d=document.createElement("div");d.innerHTML=h||"";const R=[];
 for(const b of d.querySelectorAll("button")){if(b.classList.contains("pct"))continue;const at=[...b.attributes].filter(a=>/^data-/.test(a.name)&&a.name!=="data-amx").map(a=>[a.name,a.value]);
  if(!at.length||at.some(a=>AM_NAV.test(a[0])))continue;const n=b.dataset.runner?"Đổi người chạy việc":txt(b.childNodes[0]&&b.childNodes[0].nodeType===3?b.childNodes[0].textContent:(b.firstChild&&b.firstChild.textContent)||b.textContent);if(!n)continue;
  const sm=b.querySelector("small");const why=b.disabled?txt((b.querySelector(".kwhy")||{}).textContent||""):"";let x="";try{x=AMV.noRaw?(sm?txt(sm.innerHTML).replace(why,"").replace(/\s*·\s*$/,""):"")/* scan «before» column only (act-move-rows-scan) */:b.hasAttribute("data-amx")?decodeURIComponent(b.getAttribute("data-amx")):sm?amRawOf(sm,why):""}catch(e){x=sm?txt(sm.textContent):""}
  if(b.dataset.runner&&!x)x=`thành: <span class="g">tự chọn người chạy việc cho ngươi (đi dò la, đưa thư, mua đồ; lòng cao thì ít khi khai ra ngươi)</span>`;/* E-GAIN3-LIVE law 3: the «Đổi ›» chip has no line of its own; its gain = jhc PEND.runner's own words (bestSent runs every errand); one line with ACT-MOVE-6 law 3 (the pick is free) */
  R.push({n,at,x,off:!!b.disabled,why})}
 return R}
/* every Cung nhân card of the tab, by name (one paint) — the builder runs whole (pager → every row) with pcard recording its html */
function amCapStaff(){return memo("cap:staff|"+stamp(),()=>{const M=new Map();if(typeof staffTabHTML!=="function")return M;const c0=AMV.cap;AMV.cap=M;try{staffTabHTML()}catch(e){console.error("amove cap",e)}finally{AMV.cap=c0}return M})}
(function(){if(typeof pager!=="function")return;const g0=pager;pager=function(key,items,mk){if(AMV.cap&&typeof mk==="function"&&Array.isArray(items)){for(let i=0;i<items.length;i++)try{mk(i)}catch(e){}return""}return g0.apply(this,arguments)}})();
function amSid(sid){try{if(typeof servById==="function"){const s=servById(+sid);if(s)return s}}catch(e){}
 const L=[].concat(S.staff||[],...(typeof rivals!=="undefined"?rivals.map(v=>v&&v.staff||[]):[]));return L.find(s=>s&&s.sid===+sid)||null}
function amPName(p){const r=p.ref;if(p.kind==="maid")return S.maid&&S.maid.name;if(r&&r.name)return r.name;if(p.sid!=null){const s=amSid(p.sid);if(s)return s.name}
 const m=/^c:(\w+)$/.exec(p.lid||"");const C=S.court||{};if(m&&C[m[1]])return C[m[1]].name;if((p.kind==="ty"||p.kind==="ksp")&&C[p.kind])return C[p.kind].name;if(p.kind==="peddler"&&C.ped)return C.ped.name;return txt(p.name)}
window.amPName=amPName;
function amOldBtns(p){try{
 if(p.kind==="kid"){const k=p.ref;return k&&(S.kids||[]).includes(k)&&typeof kidActs==="function"?amBtnsOf(AMV.kidRaw(k).join("")):[]}
 if(p.kind==="fallen"){const v=p.ref,i=typeof rivals!=="undefined"?rivals.indexOf(v):-1;if(i<0||typeof rvCard!=="function")return[];
  return memo(["cap:rv",v.id,stamp()].join("|"),()=>{const M=new Map(),c0=AMV.cap;AMV.cap=M;try{rvCard(v,i)}catch(e){}finally{AMV.cap=c0}return amBtnsOf([...M.values()].join(""))})}
 if(!["maid","serv","npc","ty","ksp","elder","court","peddler"].includes(p.kind))return[];
 const nm=amPName(p);if(!nm)return[];return amBtnsOf(amCapStaff().get(txt(nm))||"")}catch(e){console.error("amove old",e);return[]}}
window.amOldBtns=amOldBtns;
/* fire the old button: a hidden twin inside #panel (its onclick + the document handlers both see it) */
function amFire(at){const pn=document.getElementById("panel")||document.body;const b=document.createElement("button");b.type="button";b.style.display="none";for(const [k,v] of at)b.setAttribute(k,v);
 pn.appendChild(b);try{S.payOnPick=0}catch(e){}try{b.click()}finally{b.remove()}}
window.amFire=amFire;
function amBridge(p,A){if(AMV.inBr)return A;const old=amOldBtns(p);if(!old.length)return A;const have=new Set();AMV.inBr=1;try{
 const addN=a=>{if(!a)return;have.add(txt(a.n));if(Array.isArray(a.m))a.m.forEach(m=>m&&have.add(txt(m.n)))};A.forEach(addN);try{(doorRaw(p)||[]).forEach(addN)}catch(e){}
 }finally{AMV.inBr=0}
 for(const b of old){if(have.has(b.n))continue;have.add(b.n);A.push({n:b.n,o:100,x:b.x,amb:1,lock:b.off,t:b.why,open:()=>amFire(b.at)})}
 return A}
(function(){const t0=talkOpts;talkOpts=function(p){const A=t0.apply(this,arguments);if(!p||!Array.isArray(A))return A;try{return amBridge(p,A)}catch(e){console.error("amove bridge",e);return A}}})();
/* MAIN 171 LOOK FAIL: a bridged option shows the OLD card's own kit rows (its raw string: odds word · tốn · thành · hỏng · kèm) — optLine must not wrap it
   as «thành: …» with a second «tốn: 1 khắc»; its time = the khắc its own «tốn» states (the handler pays it; j25 defers the talk pay, amFire clears it) */
function amK(x){const m=/(?:^|·)\s*tốn:\s*([^·]*)/i.exec(String(x||"").replace(/<[^>]+>/g," "));const k=m&&/(\d+)\s*khắc/.exec(m[1]);return k?+k[1]:0}
(function(){if(typeof talkK==="function"){const k0=talkK;talkK=function(a){return a&&a.amb?amK(a.x):k0.apply(this,arguments)}}
 if(typeof optLine==="function"){const o0=optLine;optLine=function(a){return a&&a.amb&&typeof kitParse==="function"?kitParse(String(a.x||"")):o0.apply(this,arguments)}}})();
/* the Dư đồ focus view (jdf dfActs) writes each act's small line «odds word · Tốn …» from talkK + c.bac: a bridged act takes both from its own raw string */
function amSeg(x){const t=String(x||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();const S2=t.split(/\s·\s/);let word="",ton="";
 const W=typeof KIT_ODDS!=="undefined"?KIT_ODDS:[];for(const g of S2){const q=g.trim();if(!word&&W.includes(q)){word=q;continue}}
 try{const R=kaRows(kaModelStr(String(x||"")));ton=(R.ton||[]).map(e=>txt(kaPlain(e.h)).replace(/\s[-−]\s?(\d)/,"\u0020$1")/* a cost is written as the kit Tốn row writes it: «Bạc 20» */).filter(Boolean).join(" · ")}catch(e){const m=/(?:^|\s·\s)tốn:\s*([^·]*)/i.exec(t);if(m)ton=m[1].trim()}/* the kit's own model: «Bạc -20» with no label is a cost, as the card shows it */
 return{word,ton}}
(function(){if(typeof window.dfActs!=="function")return;const d0=window.dfActs;window.dfActs=function(i){const R=d0.apply(this,arguments);try{if(!Array.isArray(R))return R;const p=curPeople()[i];if(!p)return R;
 const T=talkOpts(p);for(const g of R)for(const a of g.acts||[]){const m=/data-o="(\d+)"/.exec(a.info||"");const o=m&&T[+m[1]];if(!o||!o.amb)continue;const sg=amSeg(o.x);a.ton=sg.ton;if(sg.word)a.word=sg.word}}catch(e){console.error("amove dfActs",e)}return R};
 try{dfActs=window.dfActs}catch(e){}})();
/* the kid card: j25 string-inserts «Chăm con» (kidActs) — on the card it is empty now (the acts are on the kid's pop-up) */
(function(){if(typeof kidActs!=="function")return;const k0=kidActs;AMV.kidRaw=k=>{const r0=AMV.rawOn;AMV.rawOn=1;try{return k0(k)}finally{AMV.rawOn=r0}};kidActs=function(){return AMV.inKid?[]:k0.apply(this,arguments)}})();
(function(){if(typeof kidCard!=="function")return;const c0=kidCard;kidCard=function(k){if(!AMV.card)return c0.apply(this,arguments);const t0=AMV.tab;AMV.inKid=1;AMV.tab="kid";AMV.who=k;
 try{return String(c0.apply(this,arguments)).replace('<h5>Chăm con</h5><div class="pcb"></div>',"")}finally{AMV.inKid=0;AMV.tab=t0;AMV.who=null}}})();
(function(){if(typeof staffTabHTML!=="function")return;const s0=staffTabHTML;staffTabHTML=function(){if(AMV.cap)return s0.apply(this,arguments);const t0=AMV.tab;AMV.tab="staff";try{return s0.apply(this,arguments)}finally{AMV.tab=t0}}})();
/* who a Cung nhân card is about (by its name) */
function amWho(nm){nm=txt(nm);if(S.maid&&txt(S.maid.name)===nm)return{v:S.maid,kind:"maid"};const C=S.court||{};
 const L=[].concat(S.staff||[],Object.values(C),...(typeof rivals!=="undefined"?rivals.map(v=>v&&v.staff||[]):[]),typeof elderTabRows==="function"?(()=>{try{return elderTabRows().map(e=>e.s).filter(Boolean)}catch(e){return[]}})():[]);
 const v=L.find(x=>x&&txt(x.name)===nm);return v?{v,kind:"p"}:null}
/* the walk to where the person is now (roster, else her post / home): one kit button «Tìm gặp» */
function amGo(k,who){if(!k)return"";if(S.place===k)return{why:`${who||"người ấy"} ở ngay đây: chạm vào trên sân khấu`};let tc=0;try{tc=travel(S.place,k)}catch(e){}
 const why=S.confined?"đang cấm túc":S.out?"đang ở lãnh cung":(typeof walkBlock==="function"?walkBlock(k,tc):"");let pn="";try{pn=placeOf(k).n}catch(e){}
 return pbtn(`data-go="${k}"`,"Tìm gặp",`${pn} · tốn: ${tc} khắc · thành: gặp mặt, việc làm tại chỗ`,why)}
const amAtId=(id,h)=>{try{return typeof placeOfId==="function"?placeOfId(id,h):h}catch(e){return h}};
/* KK51-P2 contract (KIT §6.4b): amCardBtns(v,kind) → [tìm, ghé]; "" = none · {why} = disabled · null = kit defaults */
function amCardPos(v,kind){try{
 if(kind==="rv"||kind==="emp"||kind==="th"){const vv=kind==="rv"?v:kind;
  if(kind==="rv"&&v&&v.alive&&v.out)return[amGo("lc",v.name),""];
  const a=amCardBtns(vv);const f=re=>a.find(h=>re.test(txt(String(h).replace(/<small>[\s\S]*$/,""))))||"";return[f(/^Tìm gặp/),f(/^Ghé cung/)]}
 if(!v)return null;
 if(kind==="maid"||v===S.maid)return[amGo(amAtId("mm:me","home"),v.name),""];
 if((S.kids||[]).includes(v))return v.alive?[amGo("home",typeof sname==="function"?sname(v):v.name),""]:["",""];
 if((S.staff||[]).includes(v))return[amGo(amAtId("s"+v.sid,"home"),v.name),""];
 const C=S.court||{};const ck=Object.keys(C).find(k=>C[k]===v);if(ck)return[amGo(amAtId("c:"+ck,AM_POST[ck]||""),v.name),""];
 if(v.eid)return[amGo(amAtId("s"+v.sid,"tn"),v.name),""];
 const w=typeof rivals!=="undefined"?rivals.find(x=>x&&(x.staff||[]).includes(v)):null;
 if(w){const vis=visitBtn(w);return["",vis?amRetitle(vis,"Ghé cung"):{why:!w.alive?"chủ nhân đã mất":w.out?"chủ nhân ở lãnh cung":sameHouse(S,w)?"cùng cung với ngươi":S.place===palaceOf(w)?`đang ở cung ${w.name}`:"chưa đến được lúc này"}]}
 return null}catch(e){console.error("amCardPos",e);return null}}
/* ACT-MOVE-5: the card names its person for the kit panel (jkpp kppWho reads data-amw → amWhoOf): unnamed «???» servants and kids have no name to look up */
const AMW=new Map();let amwN=0;
function amStamp(h,W){if(!W||typeof h!=="string")return h;if(AMW.size>400)AMW.clear();const id=String(++amwN);AMW.set(id,W);return h.replace(/<div class="pc(?=[ "])[^"]*"/,m=>`${m} data-amw="${id}"`)}
window.amWhoOf=id=>AMW.get(String(id))||null;
/* the card (pcard wrapper): Cung nhân / Hoàng tự / lãnh cung → groups = the two buttons only */
function amCard2(o){if(!o||!Array.isArray(o.groups))return null;let W=null;
 if(AMV.tab==="kid"&&AMV.who)W={v:AMV.who,kind:"p"};else if(AMV.tab==="staff")W=amWho(o.name);
 else if(o.tabKey==="rival"&&o.status==="Ở lãnh cung"){const v=rivals.find(x=>x&&x.name===o.name);if(v)W={v,kind:"rv"}}
 if(!W)return null;AMV.lastW=W;const P=amCardPos(W.v,W.kind)||["",""];const L=[];
 P.forEach((h,j)=>{const t=j?"Ghé cung":"Tìm gặp";if(!h)return;L.push(typeof h==="object"?amOff(t,h.why||""):h)});
 const lines=Array.isArray(o.lines)?o.lines.map(l=>String(l||"").replace(/\s*<button[^>]*data-runner[^>]*>[\s\S]*?<\/button>/g,"")):o.lines;/* «Đổi ›» (người chạy việc) → the maid's pop-up */
 const note=typeof o.note==="string"?o.note.replace(/\s*<button[^>]*data-runner[^>]*>[\s\S]*?<\/button>/g,""):o.note;
 return Object.assign({},o,{groups:L.length?[["",L]]:[],lines,note})}
window.amCardPos=amCardPos;
/* MAIN 169 LOOK note (a): a person-card button that walks her to the person ends on Hành sự (the stage where the pop-up lives), never with a person tab lit */
const AM_PTABS=["court","rv","men","staff","kid","kvo","kin","hon","qt"];
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest(".pc button[data-see],.pc button[data-visit],.pc button[data-go],.pc button[data-kgmgo],.pc button[data-acask],.pc button[data-scout],.kppbtns button");if(!b||b.disabled)return;
 const t0=typeof tab!=="undefined"?tab:"";if(!AM_PTABS.includes(t0))return;const p0=S.place,v0=S.visit;
 setTimeout(()=>{try{if(!S.dead&&(S.place!==p0||S.visit!==v0)&&typeof goTab==="function")goTab("act")}catch(err){console.error("amove tab",err)}},0)},true);
/* the greyed info button «Tìm gặp / Ghé cung» never fires anything */
document.addEventListener("click",e=>{const b=e.target.closest&&e.target.closest("[data-amoff]");if(b){e.stopPropagation();e.preventDefault()}},true);
})();
