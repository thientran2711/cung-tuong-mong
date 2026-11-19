/* jcoopthinf6b: CO-OP THIN GUEST, part F6b = the remaining mini-game ends as ONE score intent each (review/coop-thin-f6b; report
   dev/handover/reports/coop-thin-f6b.md step 0; F5 pattern = reports/coop-thin-f5.md). Behind the room level: TH.on(12), on only when BOTH
   seats run a build with it (Worker THINMAX 12). Solo and rooms below level 12 run nothing new (every game file refactor is the same body
   moved into a named function: solo identical).
   ONE rule: the game plays on HER phone with solo parameters; nothing of hers is written there by its end; the end is ONE intent (TH.F.reg
   through F5's reg10 at level 12); the host checks every score (BAL.mgSc / the game's own table: outside → refused, nothing applied),
   rolls every quick button itself (kitQuickRoll in her context), pays every cost once (the card's runOpt inside act(i), jaudit's held cost
   = F5 payAA), then runs the end in her context. Her result rows / cards / sounds show on HER phone once (captured: TH.UICAP).
   Ends: exEnd (her exam + the servant exam), kcPhucEnd (Phúc tuyển), kc2ExamEnd (Ngày tuyển / Lễ ra mắt), kc2SelEnd (Tuyển chọn trước ngày
   phong), vlCraftEnd (veil craft), wdGroomEnd (Chải chuốt), toilFinish (the mirror: Điểm trang, also inside Hội phối đồ), tsDressEnd (Hội phối
   đồ theo đề: the board's end after the mirror), stealEnd (the
   Tranh sủng / Chặn ngự giá game before her deck card or her person-menu act), the Tự học deck card (jaudit aaMG: F5's wkLessonEnd + her
   card marked used on the host).
   A START that ran in her context on the host (a part-D card pick, an F intent such as F6a's act(i)) never opens a game there: the opener
   is captured (exGame / kcPhucGame / kc2ExamGame / kc2SelGame / vlCraftGame / stealGame / toilGo / tsDressGo, + a contest podium kitPodiumP) and plays on HER phone with the answer
   (TH.uiPlay); its end is the intent above. */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.thin||!CW.thin.F||!CW.thin.F.x5)return;
const TH=CW.thin,F=TH.F,X5=F.x5,J=CW.X.J;const L12=12;
const {reg10,CX10,payAA,inR,MSC,bad,lg,gOn,host,isMe}=X5;
const on=()=>TH.on(L12);
const hctx=()=>host()&&!!CW.ctx&&on();/* the host runs her tap in her context */
const g12=()=>gOn(L12);/* her phone, level 12, her own tap (not in a world step) */
const cl0=(x,a,b)=>Math.max(a,Math.min(b,x));
/* ---------- the opener capture (host, her context): the game opens on HER phone ---------- */
function cap(n,a){F.stat.gcap=(F.stat.gcap|0)+1;lg(["gcap",n]);if(!TH.uiCap){lg(["gcapLost",n]);return true}TH.uiCap.unshift([n,J(a)]);if(TH.uiCap.length>12)TH.uiCap.length=12/* first (always): the 4 an F answer carries */;return true}
function capFn(n){const f=window[n];if(typeof f!=="function")return;TH.UICAP.add(n);window[n]=function(){if(hctx())return cap(n,[...arguments]);return f.apply(this,arguments)}}
/* ---------- registration (level 12): F5's reg10 at lv 12 + ctx: the mirror's state, her Tự học card ---------- */
let CARD=null,HCARD=null;
const CX12=CX10.concat([["toil",()=>{try{return typeof TOIL==="object"&&TOIL.st?J(TOIL.st):null}catch(e){return null}},v=>{if(typeof TOIL==="object")TOIL.st=v&&typeof v==="object"?v:null}],
 ["card",()=>host()?null:CARD,v=>{HCARD=host()&&v&&typeof v==="object"?v:null}],
 /* the host's own running game (KG82.run) is never stopped by her end run in her context (toilFinish stops "the" running game) */
 ["kgrun",()=>host()&&typeof KG82==="object"?KG82.run:null,v=>{if(host()&&typeof KG82==="object")KG82.run=v||null}]]);
/* her rank set (jpromo prCheck: the rank's full set of real items + the chest) is given by the HOST in her context right after an end that
   raised her rank (the exam, the entry selections): in the same patch as the rank, so her phone never sees the rank without the set
   (and her exam record exS moved to the new rank there too, the same patch).
   Her phone never runs prCheck at level 12 (it gave the set a second time on her phone: proven by coop-thin-f6b E1, law 6c) — every other
   road that raises her rank in her context on the host gets it at her next step there (jpromo's nextBuoi wrapper, her context). */
const prPost=name=>{const f=window[name];if(typeof f!=="function")return;window[name]=function(){const r=f.apply(this,arguments);if(hctx())try{if(typeof exS==="function")exS(S)/* her exam record moved to the next rank (exS resets it lazily: else her phone did it, a write there) */;if(typeof prCheck==="function"){prCheck();F.stat.prPost=(F.stat.prPost|0)+1}}catch(e){console.error("thin F6b prCheck",e)}return r}};
if(typeof window.prCheck==="function"){const p0=window.prCheck;window.prCheck=function(){if(on()&&!host()&&!!CW.seat&&!!TH.view){F.stat.prSkip=(F.stat.prSkip|0)+1;return}return p0.apply(this,arguments)};prCheck=window.prCheck}
capFn("kitPersonReveal");/* the new servant's reveal of that set (kmPush is silent in her context): on her phone */
const reg12=(name,K,o)=>{prPost(name);return reg10(name,K,Object.assign({lv:L12,ctx:CX12},o||{}))};
const raw0=(raw,sk)=>sk||inR(raw,MSC().raw);
/* her own card in her host deck (the same rule F6a uses: index + name; else the first not-done card with that name) */
function myCard(c){if(!c||!Array.isArray(deck))return -1;const i=c.i|0;if(deck[i]&&deck[i].n===c.n)return i;return deck.findIndex(a=>a&&a.n===c.n&&!a.done)}

/* her phone: a game opened by the answer of a card run on the host (F6a's act(i): the exam, the mirror, a steal card) is the card's own
   screen — the half result card that answer brings (cardLater → resultShow, next tick) is not shown over it (solo shows none before the
   game: the card's go opens the game at once; a steal card's result comes with the steal end, after the game) */
let NOCARD=0;const noCard=()=>{if(!host())NOCARD=Date.now()};
if(typeof window.resultShow==="function"){const r0=window.resultShow;window.resultShow=function(){if(NOCARD&&Date.now()-NOCARD<2000&&on()&&!host()){NOCARD=0;F.stat.noCard=(F.stat.noCard|0)+1;return}return r0.apply(this,arguments)};try{resultShow=window.resultShow}catch(e){}}
/* the game START as an intent (F5 reviewer: the forged start / cost / score-in-range family): once a game-first deck kind is lifted
   (TH.gLift[kind] = 12: F6a's act(i) runs her card on the host, its cost paid there once), the host keeps that start per seat and the
   end is accepted only after it, once. A kind not lifted keeps its old start road (no check). */
const ST={};const lifted=k=>!!(TH.gLift&&TH.gLift[k]===L12&&on());
const stSet=(k,v)=>{const s=CW.ctx;(ST[s]=ST[s]||{})[k]=v==null?1:v;F.stat.start=(F.stat.start|0)+1};
const stTake=(k,v)=>{const o=ST[CW.ctx];if(!o||o[k]==null||(v!=null&&o[k]!==v))return false;delete o[k];return true};
F.f6bStart=ST;
/* F6a's game-first deck kinds lifted at level 12 (TH.gLift: from here the card is a plain host card, its tap rides F6a's act(i); its game
   opens on her phone through the captures below). aaMG (the Tự học work cards) stays on the old road: its lesson picker opens on the
   host side otherwise (no capture yet) — listed for H. */
if(TH.gLift){TH.gLift.exam=L12;TH.gLift.toil=L12;TH.gLift.steal=L12}
/* ===== 1-2. the exams (her exam, the servant exam): exRun plays on her phone with a throw-away state; the end = exEnd ===== */
if(typeof exRun==="function"){const x0=exRun;
 exRun=function(P,e,done){const kind=P&&P.srv?"srv":"me";
  if(hctx()){stSet("exam",kind);return cap("exGame",[kind])}
  if(g12()){const t={};let sk=null;const r=x0.call(this,P,t,res=>exEnd(kind,res&&res.raws||[],sk||[]));sk=t.pend&&t.pend.sk;F.stat.exLocal=(F.stat.exLocal|0)+1;return r}
  return x0.apply(this,arguments)}}
window.exGame=function(kind){noCard();const P=kind==="srv"?exSrvPlan(exSrvS().to):exPlanFull();return exRun(P,{},null)};
TH.UICAP.add("exGame");
reg12("exEnd",["v","v","v"],{title:A=>A[0]==="srv"?"Khảo hạch Nội vụ phủ":"Khảo hạch",
 dec:a=>{const x=X5.decA9(["v","v","v"],a);if(!x)return null;const [kind,raws,sk0]=x;if(kind!=="me"&&kind!=="srv")return bad("exEnd");
  if(lifted("exam")&&!stTake("exam",kind))return bad("exEnd");/* lifted: only after her card ran on the host */
  const e=kind==="srv"?exSrvS():exS(S);if(!e||(e.w1==null&&!e.pend))return bad("exEnd");/* her window is open (one end per exam) */
  const P=kind==="srv"?exSrvPlan(e.to):exPlanFull();const sk=Array.isArray(sk0)?sk0.map(Boolean):[];
  if(!Array.isArray(raws)||raws.length>P.rounds.length)return bad("exEnd");for(let j=0;j<raws.length;j++)if(!raw0(raws[j],sk[j]))return bad("exEnd");
  return [kind,raws.slice(),sk]}});

/* ===== 3-5. the entry selections (tiểu thư road / kc2 roads): the end = kcPhucEnd / kc2ExamEnd / kc2SelEnd ===== */
for(const n of ["kcPhucGame","kc2ExamGame","kc2SelGame"])capFn(n);
reg12("kcPhucEnd",["v","v","v"],{title:()=>"Phúc tuyển",
 dec:a=>{const x=X5.decA9(["v","v","v"],a);if(!x)return null;const [k,raw,sk]=x;let ok=false;try{ok=isKc()&&!!S.kc.tt&&!!S.kc.tt.play&&!S.kc.tt.done}catch(e){}
  if(!ok||!ARTS.some(y=>y.k===k)||!raw0(raw,sk))return bad("kcPhucEnd");return [k,sk?0:raw,!!sk]},
 pre:A=>{if(A[2])A[1]=entSkipRaw()}});
reg12("kc2ExamEnd",["v"],{title:()=>"Tuyển chọn",
 dec:a=>{const x=X5.decA9(["v"],a);if(!x)return null;let ok=false;try{ok=!!S.kc&&!!S.kc.ex&&!S.kc.ex.done}catch(e){}return ok&&inR(x[0],MSC().raw)?[x[0]]:bad("kc2ExamEnd")}});
reg12("kc2SelEnd",["v"],{title:()=>"Tuyển chọn",
 dec:a=>{const x=X5.decA9(["v"],a);if(!x)return null;let ok=false;try{ok=!!S.selx&&!S.selx.done}catch(e){}return ok&&inR(x[0],MSC().raw)?[x[0]]:bad("kc2SelEnd")}});

/* ===== 8. the veil craft: vlCraftGame (mgEnd 12 = F5's held cost machinery), the end = vlCraftEnd ===== */
capFn("vlCraftGame");
{const v0=window.vlCraftGame;if(typeof v0==="function")window.vlCraftGame=function(m){if(hctx())stSet("veil",m);return v0.apply(this,arguments)};vlCraftGame=window.vlCraftGame}
/* her start ran on her phone: its cost travels held (F5 aa ctx); the host takes it only when it is at least the solo khắc + Sức (VL; the material is paid by vlCraft in the end) */
const vlHeld=m=>{const c=window.__aaPend;return !!c&&typeof c==="object"&&(c.khac|0)>=VL.craftK&&(+c.suc||0)<=-VL.craftSuc};
/* mgEnd 12 means "an F6b end": below level 12 (or not her own tap) the game runs exactly as before (F5's wrapper sees no mgEnd) */
if(typeof playArt==="function"){const p0=playArt;playArt=function(o){if(o&&o.mgEnd===12&&!g12())o=Object.assign({},o,{mgEnd:0});return p0.call(this,o)};window.playArt=playArt}
reg12("vlCraftEnd",["v","v","v"],{title:()=>"Tự tay kết mạng che mặt",
 dec:a=>{const x=X5.decA9(["v","v","v"],a);if(!x)return null;const [m,raw,sk]=x;if(![0,1,2].includes(m)||!raw0(raw,sk))return bad("vlCraftEnd");
  if(!stTake("veil",m)&&!vlHeld(m))return bad("vlCraftEnd");/* the start: run on the host (paid there), or her held solo cost */return [m,sk?5:raw,!!sk]},
 pre:A=>payAA(sc=>{sc.skip=!!A[2];sc.raw=A[2]?null:cl0(Math.round(A[1]||0),0,10);sc.ok=!A[2]&&sc.raw>=5})});

/* ===== 10. Chải chuốt: the end = wdGroomEnd, its rows (wdGroomShow) on her phone ===== */
/* her result rows replay into HER open game frame; the frame closed meanwhile (✕, a reload) = nothing to draw (the end is applied all the same) */
const frameOnly=n=>{const f=window[n];if(typeof f!=="function")return;window[n]=function(){if(!host()&&on()&&!document.getElementById("kg82box")){F.stat.noFrame=(F.stat.noFrame|0)+1;return}return f.apply(this,arguments)}};
frameOnly("wdGroomShow");frameOnly("toilFinShow");
capFn("wdGroomShow");
reg12("wdGroomEnd",["v"],{title:()=>"Chải chuốt",dec:a=>{const x=X5.decA9(["v"],a);if(!x)return null;return ["ok","over","under"].includes(x[0])?[x[0]]:bad("wdGroomEnd")}});

/* ===== 9. the mirror (Điểm trang; also the face of Hội phối đồ): the end = toilFinish (TOIL.st rides in ctx "toil"), its rows = toilFinShow ===== */
capFn("toilFinShow");capFn("toilGo");
{const t0=window.toilGo;if(typeof t0==="function")window.toilGo=function(){if(hctx())stSet("toil");else if(on()&&!host())noCard();return t0.apply(this,arguments)};toilGo=window.toilGo}
const unit=x=>x==null||inR(x,MSC().unit);
reg12("toilFinish",["v"],{title:()=>"Điểm trang",
 dec:a=>{const x=X5.decA9(["v"],a);if(!x)return null;const made=x[0];const st=typeof TOIL==="object"?TOIL.st:null;
  if(!(made===true||made===false||made==="quick")||!st||typeof st!=="object"||!Array.isArray(st.occ)||!st.occ.length||!st.parts||typeof st.parts!=="object")return bad("toilFinish");
  const P=st.parts;if(!unit(P.brow)||!unit(P.powder)||!unit(P.son)||!unit(P.hd))return bad("toilFinish");
  if(st.F!=null&&!(typeof st.F==="number"&&st.F>=0&&st.F<=9))return bad("toilFinish");
  if(lifted("toil")&&!DH[CW.ctx]&&!stTake("toil"))return bad("toilFinish");/* lifted: her mirror card ran on the host, or the contest's face */
  return [made]}});
/* the mirror's quick button ("Điểm trang nhanh") rolls on the host: her phone never calls toilFinish (the intent) — nothing to hold here */

/* ===== 6-7. Tranh sủng / Chặn ngự giá: the game before her deck card or her person-menu act; the end = stealEnd (the host runs the card /
   act with the game answered at once by her score: jsmg's own __smgFake seam) ===== */
let SRC=null,HSRC=null,OPN=false;
window.__smgEnd=function(mode,raw,sk){if(!SRC||!g12())return false;const s=SRC;SRC=null;window.stealEnd(s,sk?null:raw,!!sk);return true};
window.__smgOpen=function(mode,o){if(!host()){if(SRC)OPN=true;return false}if(!hctx()||!HSRC)return false;cap("stealGame",[mode,HSRC]);return true};
/* her phone: SRC lives while her game is open; a card / act that opened no game (top rung, no art) took the old road: SRC dropped */
const withSrc=(src,fn)=>{if(host()){HSRC=src;try{return fn()}finally{HSRC=null}}SRC=src;OPN=false;try{return fn()}finally{if(!OPN&&SRC===src)SRC=null}};
window.stealGame=function(mode,src){noCard();if(!src||typeof window.stealMgPlay!=="function")return;let o=null;
 if(src.c){const i=myCard(src);o=i>=0?deck[i].o:null}else o=window.stealO0(S,mode);if(o==null)return;withSrc(src,()=>window.stealMgPlay(mode,o,()=>{SRC=null}))};
TH.UICAP.add("stealGame");
window.stealEnd=function(src,raw,sk){const f0=window.__smgFake;window.__smgFake=()=>({raw:sk?0:raw,skipped:!!sk,sync:1});
 try{if(src.c){const i=myCard(src);if(i>=0)act(i)}else{const i=rivals.findIndex(v=>v&&v.id===src.v);if(i>=0)doAct(i,src.k)}}finally{window.__smgFake=f0}};
/* the outermost act / doAct: the card / person the game is for (her phone: her end names it; the host: a captured game names it) */
/* the same wrapper on her phone (outermost window.act / doAct) and on the host's run of a registered act (F.PRE: F6a's act(i) intent runs
   PRE.act on the host, below every window wrapper — without this the host ran her steal card with no capture: the game opened nowhere) */
const wAct=a0=>function(i){const a=Array.isArray(deck)?deck[i]:null;
  if(a&&typeof window.stealIsCard==="function"&&window.stealIsCard(a)&&(g12()||hctx())&&!window.__smgFake){const self=this,args=arguments;return withSrc({c:1,i,n:a.n},()=>a0.apply(self,args))}
  if(a&&a.aaMG&&g12())CARD={i,n:a.n};/* her Tự học card: marked used on the host with her lesson's end */
  return a0.apply(this,arguments)};
const wDo=d0=>function(i,k){if((k==="steal"||k==="road")&&(g12()||hctx())&&!window.__smgFake){const v=rivals[i];
   if(v&&v.id!=null){const self=this,args=arguments;return withSrc({v:v.id,k},()=>d0.apply(self,args))}}return d0.apply(this,arguments)};
if(typeof act==="function"){act=wAct(act);window.act=act}
if(typeof doAct==="function"){doAct=wDo(doAct);window.doAct=doAct}
if(F.PRE){if(typeof F.PRE.act==="function")F.PRE.act=wAct(F.PRE.act);if(typeof F.PRE.doAct==="function")F.PRE.doAct=wDo(F.PRE.doAct)}
reg12("stealEnd",["v","v","v"],{snap:"soft",noRes:true,title:A=>A[0]&&A[0].k==="road"||(A[0]&&A[0].n==="Chặn ngự giá")?"Chặn ngự giá":"Tranh sủng",
 dec:a=>{const x=X5.decA9(["v","v","v"],a);if(!x)return null;const [src,raw,sk]=x;if(!src||typeof src!=="object"||!raw0(raw,sk))return bad("stealEnd");
  if(src.c){const i=myCard(src);if(i<0||!window.stealIsCard(deck[i])||deck[i].done)return bad("stealEnd");return [{c:1,i,n:src.n},sk?0:raw,!!sk]}
  if(src.k!=="steal"&&src.k!=="road")return bad("stealEnd");const v=rivals.find(y=>y&&y.id===src.v);if(!v||isMe(v))return bad("stealEnd");return [{v:src.v,k:src.k},sk?0:raw,!!sk]}});

/* ===== 12. the Tự học deck card (jaudit aaMG): the lesson's end is F5's wkLessonEnd; her card is marked used on the host too ===== */
if(F.R.wkLessonEnd){const R=F.R.wkLessonEnd;R.ctx=CX12;const p0=R.pre;R.pre=function(A){if(on()&&HCARD){const i=myCard(HCARD);if(i>=0)deck[i].done=1;F.stat.cardMark=(F.stat.cardMark|0)+1}HCARD=null;return p0?p0.apply(this,arguments):undefined};
 const w=window.wkLessonEnd;window.wkLessonEnd=function(){try{return w.apply(this,arguments)}finally{if(!host())CARD=null}}}

/* ===== 11. Hội phối đồ theo đề: the board + the mirror play on HER phone; the end = tsDressEnd (the host keeps the contest: the entrants
   rolled at the hold, her option's cost already paid at her pick; it rolls her maid's pick itself and runs the same finish) ===== */
const DH={};/* host: seat → {th, m, cb} (the contest closure of tsDressHold, in memory: a host reload drops it → her end is refused, nothing applied) */
if(typeof window.tsDressGame==="function"){const g0=window.tsDressGame;window.tsDressGame=function(th,done){
  if(hctx()){DH[CW.ctx]={th,m:S.month,cb:done};try{if(typeof mktKnow==="function")mktKnow()}catch(e){}/* her make-up notes record (lazy) made here, not by the board on her phone */return cap("tsDressGo",[th,S.month])}return g0.apply(this,arguments)}}
/* her phone: the board, then the mirror (its own end = toilFinish), then ONE end; her maid's pick is rolled on the host (sk) */
window.tsDressGo=function(th,m){if(typeof window.tsDressGame!=="function"||!TS_THEME[th])return;
 window.tsDressGame(th,(P,sk)=>tsMkSit(th,m,()=>{let n=0;const go=()=>{if(F.pend&&++n<200){setTimeout(go,300);return}/* the mirror's end first (one intent at a time) */
   window.tsDressEnd(sk?{}:P,!!sk)};go()}))};
TH.UICAP.add("tsDressGo");
/* host, her context: the mirror was sat on her phone (its end already applied) or left → never opened here */
if(typeof window.tsMkSit==="function"){const m0=window.tsMkSit;window.tsMkSit=function(th,m,done){if(hctx()){done();return}return m0.apply(this,arguments)};tsMkSit=window.tsMkSit}
window.tsDressEnd=function(P,sk){const h=DH[CW.ctx];if(!h)return;delete DH[CW.ctx];const Q2=sk?tsMaidPick(h.th):P;h.cb(Q2,!!sk)};
reg12("tsDressEnd",["v","v"],{snap:true,title:()=>"Hội phối đồ",
 dec:a=>{const x=X5.decA9(["v","v"],a);if(!x)return null;const [P,sk]=x;const h=DH[CW.ctx];if(!h||h.m!==S.month||!P||typeof P!=="object"||Array.isArray(P))return bad("tsDressEnd");
  const o={};if(!sk)for(const [k,v] of Object.entries(P)){const s=TS_SLOT.find(z=>z[0]===k);if(!s)return bad("tsDressEnd");if(v==null)continue;
   if(typeof v!=="string"||!s[2](v)||!S.inv.some(e=>e&&e.k===v))return bad("tsDressEnd");o[k]=v}/* every piece is in her bag and fits its slot */
  return [o,!!sk]}});
/* the podium of a contest run in her context on the host: shown on HER phone (plain list: her = "me", an NPC by id); the host goes on at once */
if(typeof window.kitPodiumShow==="function"){const k0=window.kitPodiumShow;window.kitPodiumShow=function(list,o){
  if(hctx()){try{if(typeof cuMeet==="function")cuMeet((list||[]).map(x=>x&&x.who).filter(Boolean))}catch(e){}/* everyone on the dais is known: written here, in her context */
   const L=(Array.isArray(list)?list:[]).map(x=>({who:x&&x.who===S?"me":x&&x.who&&x.who.id,score:x&&x.score,place:x&&x.place,sub:x&&x.sub}));
   cap("kitPodiumP",[L,{title:o&&o.title,sub:o&&o.sub,next:o&&o.next}]);try{if(o&&typeof o.onNext==="function")o.onNext()}catch(e){console.error(e)}return null}
  return k0.apply(this,arguments)};kitPodiumShow=window.kitPodiumShow}
window.kitPodiumP=function(L,o){const W=x=>x==="me"?S:(rivals||[]).find(v=>v&&v.id===x);const list=(L||[]).map(x=>Object.assign({},x,{who:W(x.who)})).filter(x=>x.who);
 if(list.length>=2)window.kitPodiumShow(list,o||{})};
TH.UICAP.add("kitPodiumP");

/* the deferred cost a game holds (F5): an F6b end that ran on her phone after all pays it there (reg10's own wrapper) — nothing more here */
F.f6b={on,stat:()=>F.stat};
}catch(e){console.error("jcoopthinf6b",e)}})();
