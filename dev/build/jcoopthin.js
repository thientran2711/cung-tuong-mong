/* jcoopthin: CO-OP THIN GUEST, part A = foundations (review/coop-thin-a; audit dev/handover/reports/coop-thin-guest-audit.md §2-3;
   owner GO 17/11: host-authoritative thin guest, part by part, end state = the guest only displays the host's state).
   NO player-visible change: nothing here acts unless the room's thin level is > 0, and the level stays 0 unless the HOST asks for it
   (dev flag: localStorage "ctm-thin" = n or ?thin=n) AND both seats run the same build that supports it. Solo play never runs any of it.
   API (COOPW.thin = TH):
     TH.CAP                 the highest part this build supports (A = 1, B = 2 … H = 8)
     TH.lvl / TH.on(n)      the room's level (server message "thin") / part n is on: co-op on, not held by the build-match hold
                            (COOPW.hold, dev/site/swreg.js) and TH.lvl >= n
     TH.reg(name,get,set)   one per-player module state the host swaps in withSeat; the core list (used deck Q popIdx popMsg) and the
                            per-player engine state found by the scan of dev/build/j*.js are registered below (TH.REG = the names)
     TH.withSeat(seat,fn)   HOST only: run fn as `seat`: her S (world keys shared by reference, her personal part of emp/cm/men swapped in),
                            her viewer rows (rel/oan/ghen/ev + "me" refs) on every NPC, the host as the friend entry, her registered module
                            state; no render / modal / save inside. What her turn did to the host's entry comes back through TH.bridge.
     TH.seatOf(seat)        the host's stored state of the other seat (built from the room's P[seat] on first use; TH.seatDrop(seat))
     TH.rng(stream)         ROOM RNG: next float of a sfc32 stream seeded by room code + week + stream name; TH.R(n,st) TH.pick(a,st);
                            TH.rlog = the last 200 draws [week, stream, i, value] (a bug report can be replayed)
     TH.snapSend(o) / TH.deltaSend(o)   host: full snapshot / delta (paths changed since the last sent) with versions (Worker t snap/delta)
     TH.view                guest: {v, o} = the host's latest state (snap + deltas; a version gap asks "snapreq")
     TH.doSend(op,args)     guest: an intent (Worker t "do"); TH.onDo(op,fn) host: fn(args,msg) runs in withSeat("b"), then a delta goes out
     TH.selfTest()          host: withSeat round trip for both seats (state before == after) → {ok, ...}
   The snapshot shape grows part by part (part A: date + both persons + NPCs, as a pipe test; nothing reads it on the guest yet). */
(function(){try{
const CW=window.COOPW;if(!CW||!CW.X||typeof COOP!=="object")return;
const X=CW.X,J=X.J,LS={get(k){try{return localStorage.getItem(k)}catch(e){return null}}};
const TH=CW.thin={CAP:9/* F4 her pets / garden / kitchen / study as intents (jcoopthinf.js), F3 her bag / shop / wear / gifts as intents (jcoopthinf.js), F2 her places / goTo / visits as intents (jcoopthinf.js), F1 her acts as intents (jcoopthinf.js),  E buổi + night gate on the host (jcoopthine.js), B life + rebirth on the host (jcoopthinb.js), C world read-only on the guest (jcoopthinc.js), D remote dialogs (section 6) */,lvl:0,REG:[],bridge:[],rlog:[],view:null,hv:0,dn:0,dr:null,ctxN:0};
const host=()=>CW.seat==="a";
const D={};   /* part D (remote dialogs), filled in section 6 */
TH.on=n=>!!(CW.on&&!CW.hold&&TH.lvl>=(n||1));
function want(){let v=null;try{const q=new URLSearchParams(location.search).get("thin");if(q!=null)v=q}catch(e){}if(v==null)v=LS.get("ctm-thin");return Math.max(0,Math.min(TH.CAP,(+v)|0))}
TH.want=want;

/* ---------- 1. room level + capability check ---------- */
function say(){if(!CW.on&&!(COOP.state&&COOP.state.you))return;
 COOP.send({t:"thin",cap:TH.CAP,v:String(window.CTM_BUILD||""),want:(COOP.state.you||CW.seat)==="a"?want():0})}   /* the room reply comes before the lobby hands over (CW.seat unset yet) */
TH.say=say;
COOP.on("room",()=>{TH.lvl=0;setTimeout(say,0)});
COOP.on("peer",on=>{if(on)say()});
COOP.on("thin",m=>{const was=TH.lvl;TH.lvl=m&&m.lvl|0;if(TH.lvl&&!was&&host())setTimeout(()=>snapNow(),0)});

/* ---------- 2. per-player module state ---------- */
const REG=[];
TH.REGBAD=[];
TH.reg=function(name,get,set){try{get()}catch(e){TH.REGBAD.push(name);return false}/* not reachable from here (e.g. inside a module's IIFE): listed in TH.REGBAD */if(REG.some(r=>r[0]===name))return true;
 let d;try{d=J(get())}catch(e){d=null}REG.push([name,get,set,d]);TH.REG.push(name);return true};
/* core (j1.js:64): S is handled apart (its world keys are shared); tab/quiet/rid are UI / room-wide */
TH.reg("used",()=>used,v=>{used=v});TH.reg("deck",()=>deck,v=>{deck=v});TH.reg("Q",()=>Q,v=>{Q=v});
TH.reg("popIdx",()=>popIdx,v=>{popIdx=v});TH.reg("popMsg",()=>popMsg,v=>{popMsg=v});
/* per-player engine state at script top level (scan: grep -nE "^(let|var) " dev/build/j*.js; report coop-thin-a.md §2). Ids (rid, sidN)
   are room-wide counters and stay shared; caches of pictures / DOM / UI tabs stay per phone. Module state inside an IIFE cannot be
   reached from here: those modules register themselves when their part moves (the tripwire names them). */
TH.reg("ACTX",()=>ACTX,v=>{ACTX=v});TH.reg("EVHOLD",()=>EVHOLD,v=>{EVHOLD=v});TH.reg("EVLAST",()=>EVLAST,v=>{EVLAST=v});
TH.reg("wkPend",()=>wkPend,v=>{wkPend=v});TH.reg("jointScheme0",()=>jointScheme0,v=>{jointScheme0=v});TH.reg("SUCC_NPC",()=>SUCC_NPC,v=>{SUCC_NPC=v});
TH.reg("EIT_PIL",()=>EIT_PIL,v=>{EIT_PIL=v});
TH.reg("EVB_ART",()=>EVB_ART,v=>{EVB_ART=v});
/* state inside a module's IIFE (review/coop-thin-a-r1): that module queues [name,get,set] on window.THIN_REG from its own file (every module
   loads BEFORE this one, so COOPW.thin does not exist yet there); the queue is drained here, and later pushes register at once.
   Queued today: NOLUCK (jdh) FORCE (jdh2) inFlip stoleFrom (jflip). */
{const q=Array.isArray(window.THIN_REG)?window.THIN_REG:[];for(const r of q)try{TH.reg(r[0],r[1],r[2])}catch(e){}
 window.THIN_REG={push(){for(const r of arguments)try{TH.reg(r[0],r[1],r[2])}catch(e){}return REG.length}}}
TH.reg("NLP",()=>NLP,v=>{NLP=v});TH.reg("NLR",()=>NLR,v=>{NLR=v});TH.reg("DEED85",()=>DEED85,v=>{DEED85=v});TH.reg("DT85",()=>DT85,v=>{DT85=v});
TH.reg("TR_DEED",()=>TR_DEED,v=>{TR_DEED=v});TH.reg("K61PASS",()=>K61PASS,v=>{K61PASS=v});
/* part B (start / nlRun in context b, review r1 §3): the start() wrappers clear or set these per-player module states. KMS/KMSNAP (j93 kmDiff,
   jkc kcSnapReset), J95B bind/ev/notes/next (j95b), J95C lastV/sig (j95c), SP13 L/held (jspread). Fields of a module object register one by one. */
TH.reg("KMS",()=>KMS,v=>{KMS=v});TH.reg("KMSNAP",()=>KMSNAP,v=>{KMSNAP=v});
for(const f of ["bind","ev","notes","next"])TH.reg("J95B."+f,()=>J95B[f],v=>{J95B[f]=v});
for(const f of ["lastV","sig"])TH.reg("J95C."+f,()=>J95C[f],v=>{J95C[f]=v});
for(const f of ["L","held"])TH.reg("SP13."+f,()=>window.SP13[f],v=>{window.SP13[f]=v});

/* ---------- 3. withSeat (host) ---------- */
const ST={};const PID={a:901,b:902};
const plain=o=>o!==null&&typeof o==="object";
/* the personal part of the shared world objects (emp.known, cm CM_P fields, each man's MEN_P fields): taken out / put in */
function persTake(s){const o={kn:null,cm:{},men:{}};
 if(plain(s.emp)){o.kn="known" in s.emp?[s.emp.known]:null;delete s.emp.known}
 if(plain(s.cm))for(const f of X.CM_P)if(f in s.cm){o.cm[f]=s.cm[f];delete s.cm[f]}
 if(Array.isArray(s.men))for(const x of s.men){if(!plain(x)||x.id==null)continue;for(const f of X.MEN_P)if(f in x){(o.men[x.id]=o.men[x.id]||{})[f]=x[f];delete x[f]}}
 return o}
function persPut(s,o){if(!o)return;
 if(plain(s.emp)&&o.kn)s.emp.known=o.kn[0];
 if(plain(s.cm))Object.assign(s.cm,o.cm||{});
 if(Array.isArray(s.men))for(const x of s.men){if(!plain(x)||x.id==null)continue;const p=(o.men||{})[x.id];if(p)Object.assign(x,p)}}
/* viewer swap on one object tree: "me" (the from-seat) → its pid, the to-seat's pid → "me" (keys and the REFF fields' values), one pass.
   Other NPCs / S met inside are not entered (each NPC is swapped once, from the rivals loop). */
function mapView(o,from,to,root,seen,skip){if(!plain(o)||seen.has(o))return;seen.add(o);if(o!==root&&skip.has(o))return;
 if(Array.isArray(o)){for(const x of o)mapView(x,from,to,root,seen,skip);return}
 const ks=Object.keys(o),out=[];
 for(const k of ks){let v=o[k];
  if(X.REFF.includes(k)){if(v==="me")v=from;else if(v===to)v="me";o[k]=v}
  mapView(v,from,to,root,seen,skip);
  if(k==="me")out.push([k,String(from)]);else if(k===String(to))out.push([k,"me"])}
 if(out.length){const vals=out.map(([k])=>o[k]);out.forEach(([k])=>delete o[k]);out.forEach(([,k2],i)=>{o[k2]=vals[i]})}}
const ROWS=[["rel","rl"],["oan","ro"],["ghen","gp"],["ev","ep"]];
/* the viewer rows of one NPC: r.rel… is the viewer's; r.rl[pid]… the other player's (jcoopworld fromCanon) */
function rowsIn(r,from,to){const mk={c:{},a:{},t:{}};
 for(const [f,m] of ROWS){if(!plain(r[m])){r[m]={};mk.c[m]=1}
  if(f in r)r[m][from]=r[f];else mk.a[f]=1;
  if(to in r[m]){r[f]=r[m][to];delete r[m][to]}else{r[f]=0;mk.t[f]=1}}
 return mk}
function rowsOut(r,from,to,mk){mk=mk||{c:{},a:{},t:{}};
 for(const [f,m] of ROWS){if(!plain(r[m]))r[m]={};const cur=r[f];
  if(!(mk.t[f]&&(cur===0||cur==null)))r[m][from]=cur;
  if(mk.a[f]&&!(to in r[m]))delete r[f];else{r[f]=to in r[m]?r[m][to]:0}delete r[m][to];
  if(mk.c[m]&&!Object.keys(r[m]).length)delete r[m]}}
function npcs(){return (rivals||[]).filter(v=>v&&!v.coop)}
function swapView(from,to,mks,wobj){const fp=PID[from],tp=PID[to];const L=npcs(),skip=new Set(L);if(S)skip.add(S);
 const enter=!mks.size;
 for(const r of L){if(enter)mks.set(r,rowsIn(r,fp,tp));else rowsOut(r,fp,tp,mks.get(r))}
 const seen=new Set();for(const r of L)mapView(r,fp,tp,r,seen,skip);
 for(const k of X.W_KEYS)if(wobj&&plain(wobj[k]))mapView(wobj[k],fp,tp,wobj[k],seen,skip)}
/* her stored state: from the room's P[seat] the first time (S = personal keys only, refs as {$r}/{$k}) */
/* B r2 (seam): the person her accept just made, until the room has it (her `me` reaches the server, then the room's P[seat]): a D intent
   deferred while her life was held is delivered on THIS person, never on the dead old one the room still holds */
TH.pbase={};
TH.lifeOf=function(seat){const C=CW.base||COOP.state.C;const P=C&&C.P&&C.P[seat];let l=(P&&P.life)||0;const O=TH.pbase[seat];if(O&&(O.life||0)>l)l=O.life;return l};
/* a seat whose rolled life waits for her accept (part B TB.hold): no part-D work may run on that store (jcoopthinb sets TH.holdOf) */
TH.held=seat=>!!(TH.holdOf&&TH.holdOf(seat));
TH.seatOf=function(seat){if(ST[seat])return ST[seat];
 const C=CW.base||COOP.state.C;let P=C&&C.P&&C.P[seat];
 {const O=TH.pbase[seat];if(O){if(P&&(P.life||0)>=(O.life||0))delete TH.pbase[seat];else P=O}}
 /* part B: a seat with no person yet (the guest's FIRST life) gets a blank store, only for the intent that builds her life (TH.blank) */
 if(!P||!P.S){if(!(TH.blank&&TH.blank(seat)))return null;P={S:{},ok:"tt"}}
 const s=J(P.S);const pers={kn:[s.empKnown||{}],cm:s.cmP||{},men:s.menP||{}};
 for(const k of ["empKnown","cmP","menP","cnews","heir"])delete s[k];for(const k of X.W_KEYS)delete s[k];
 const g={};for(const r of REG)g[r[0]]=J(r[3]);g.used=0;g.deck=[];g.Q=[];g.popIdx=null;g.popMsg="";
 return ST[seat]={S:s,ok:P.ok||"tt",pers,g,fresh:true,pid:P.pid}};
TH.seatDrop=seat=>{delete ST[seat]};
/* {$r:id} / {$k:name} refs (stored state AND every part-D patch value on her phone, review coop-thin-e: a patch left raw {$r} in her S → pFaceOf/pv crash) */
function unref(o){const kid=n=>{try{return allKids().map(x=>x[0]).find(k=>k.name===n)||null}catch(e){return null}};
 const fix=o=>{if(!plain(o))return o;if(o.$r!=null&&Object.keys(o).length===1)return rivals.find(v=>v.id===o.$r)||null;if(o.$k!=null&&Object.keys(o).length===1)return kid(o.$k);
  for(const k in o)o[k]=fix(o[k]);return o};return fix(o)}
const refKey=k=>k!=="kids"&&!X.W_KEYS.includes(k);
function fixRefs(s){for(const k in s)if(refKey(k))s[k]=unref(s[k])}
function standIn(PA,mine){if(!PA)return null;try{
 if(X.friendSrv(PA)){const m=typeof RV==="function"?RV(PA.S.srv.mid):null;if(m){const v=X.buildFriendSrv(PA);m.staff=m.staff||[];m.staff.push(v);return v}return null}
 const v=X.buildFriend(PA,mine);if(!v)return null;
 /* "hh" (the Empress's regard) is bound in X.buildFriend (B r1 item 6, the root for both paths); it is never bridged (the row it reads is the world's) */
 try{rstats(v)}catch(e){}
 /* the bridge baseline is taken AFTER rstats (its derived numbers are not her acts; S.hh etc. are setters on the host's S) */
 if(v.__b){for(const k of X.STAT)v.__b[k]=v[k];v.__b.rel=v.rel;v.__b.oan=v.oan}
 if(v.queen&&typeof qOn==="function"&&!qOn())rivals.unshift(v);else{if(v.queen){v.queen=false;v.rank=Math.min(v.rank,6)}rivals.push(v)}return v}catch(e){console.error("thin standIn",e);return null}}
TH.withSeat=function(seat,fn){
 if(!CW.on||!host())throw new Error("withSeat: host only");
 if(CW.ctx){if(CW.ctx===seat)return fn();throw new Error("withSeat: nested "+CW.ctx+"→"+seat)}
 if(seat===CW.seat)return fn();
 const B=TH.seatOf(seat);if(!B)throw new Error("withSeat: no state for seat "+seat);
 const A={S,g:{},quiet};for(const r of REG)A.g[r[0]]=r[1]();
 let PA=null;try{PA=X.myBlob(ser().S)}catch(e){console.error("thin blob",e)}
 const L=X.pullFriend();const hp=persTake(A.S);const mks=new Map();
 swapView(CW.seat,seat,mks,A.S);persPut(A.S,B.pers);
 const sb=B.S;for(const k of X.W_KEYS){if(k in A.S)sb[k]=A.S[k];else delete sb[k]}
 sb.origin=(typeof originByKey==="function"&&originByKey(B.ok))||A.S.origin;
 CW.ctx=seat;TH.ctxN++;TH.outerS=A.S/* part B: the host's own person, READ-ONLY inside (her names must not repeat the host's own servants: the stand-in has no staff) */;quiet=true;S=sb;for(const r of REG)if(r[0] in B.g)try{r[2](B.g[r[0]])}catch(e){}
 let v=null,p0=null;const dOn=TH.dOn();
 /* B r1 item 2 (ONE life-change path): a part-B life intent (roll / accept) answers with its own person (P), dialogs (q) and rows; part D's
    steps (thq hold, takeQ of her cards, the person patch, her row tracking) do not run for it, so a new life never travels twice */
 /* B r2 (seam, belt): every D path into a held seat is deferred upstream (D.later / D.kind / her intents); one that still gets here
    runs without D's steps (never takeQ on the rolled life) and is logged ("held-run", the tests assert none) */
 const hd=TH.held(seat)&&TH.curDo!=="life";if(hd)D.log.push(["held-run",seat,TH.curDo||"later"]);
 const dW=dOn&&TH.curDo!=="life"&&!hd;
 try{if(B.fresh){fixRefs(S);B.fresh=false}if(dW&&D.hold)D.hold(S);v=standIn(PA,S);if(v)v.__inv0=(v.inv||[]).slice();if(dW&&!D.noPatch)try{p0=pSnap()}catch(e){console.error("thin p0",e)}D.cur={p0,rv:dW&&!D.noPatch?D.rvIn(seat):null};return fn()}
 finally{const sN=S;
  if(dW)try{D.takeQ()}catch(e){console.error("thin takeQ",e)}
  let rvOps=[];if(dOn&&D.cur&&D.cur.rv)try{rvOps=D.rvOut(seat,D.cur.rv)}catch(e){console.error("thin rows",e)}
  try{for(const r of REG)B.g[r[0]]=r[1]()}catch(e){}
  for(const k of X.W_KEYS){if(k in sN)A.S[k]=sN[k];else delete A.S[k]}
  try{B.ok=sN.origin&&sN.origin.k||B.ok;const ss=ser().S;for(const k of X.W_KEYS)delete ss[k];B.S=ss;B.fresh=true;
   if(dOn){p0=D.cur&&D.cur.p0||p0;D.cur=null;if(dW&&p0){const pt=pDiff(p0,ss).concat(rvOps);if(pt.length)D.patchOut(seat,pt)}D.save()}}catch(e){console.error("thin ser",TH.curDo,e);B.S=sN}
  const Lb=X.pullFriend();TH.bridge=[];TH.bridgeItems=[];
  for(const [,e] of Lb){if(e!==v||!e.__b)continue;const b=e.__b;
   /* part D: things her turn put into the host's entry (a gift she gave, accepted by the host) go to the host as her gift (Quà tặng) */
   if(dOn&&Array.isArray(e.inv))for(const x of e.inv)if(x&&x.k&&!x.h&&!(e.__inv0||[]).includes(x))TH.bridgeItems.push(J(x));
   for(const k of X.STAT)if(k!=="hh"&&typeof e[k]==="number"&&e[k]!==b[k]){TH.bridge.push([k,b[k],e[k]]);A.S[k]=e[k]}
   for(const [f,m] of [["rel","rl"],["oan","ro"]])if(e[f]!==b[f]){A.S[m]=A.S[m]||{};A.S[m][PID[seat]]=e[f];TH.bridge.push([m,b[f],e[f]])}}
  B.pers=persTake(A.S);swapView(seat,CW.seat,mks,A.S);persPut(A.S,hp);X.pushFriend(L);
  CW.ctx=undefined;TH.outerS=null;S=A.S;for(const r of REG)try{r[2](A.g[r[0]])}catch(e){}quiet=A.quiet;
  if(dOn)D.afterRun(seat)}};
/* no host screen / save work for the other seat's turn: render, the modal and save stay the host's */
/* parts B + D (contract C3 "UI side effects"): her events must not play on the host's phone: scene queue (kmPush / kmReset), toasts (kitLine),
   sounds (sfx / kitSfx / kitResultSfx), stat floaters (kitStatFx / kitStatGlow / kitStatDelta), overlays (kitEdict / kitGloom / kitReward /
   kitResultFx). ONE list (TH.NOOP); coop-thin-b.js checks each name is wrapped. */
TH.NOOP=["render","showModal","save","kmPush","kmReset","kitLine","sfx","kitSfx","kitResultSfx","kitStatFx","kitStatGlow","kitStatDelta","kitEdict","kitGloom","kitReward","kitResultFx",
 /* F2 (her walks / visits on the host): her arrival must not toast on his
    phone; a toast her run raises (srvToast / kitLine) is captured (TH.uiCap, set by part F's run) and plays on HER phone with the answer.
    renderStage is NOT here: its wrappers also write her person (name reveals, residence, roster: guest-side writers, F6/G) and F1/E rely on
    them running once in her context; the host's stage is repainted right after her run instead (part F: D.after → render) */
 "srvToast"];/* k3ShowPlace / k3Shell live inside jk3's IIFE (its own calls never see a window wrapper): they return at once there when COOPW.ctx is set */TH.NOOPED=[];TH.uiCap=null;
/* resultShow is not a no-op inside her context either (it writes her Sổ ghi line's stat suffix, F1 relies on it); a result card a run in her
   context leaves for LATER (a timer: accEtqGo's +30 ms) carries a snapshot marked with her seat and never shows on the host (below) */
TH.NOOP.push("resultShow");
/* F2 r2 (review r1 item 1, the whole family): HER TAP RUN ON THE HOST (part F intents, part D card picks) runs as solo: quiet OFF (j1 quiet
   silences every card / Sổ ghi line / number of a turn that is not played: in her context that silenced her own walk's «Xong việc» card,
   card67, tdPop, Lỡ hẹn, Tin về chủ nhân / Đổi chủ, deed lines …). Her cards go into HER Q → part D cards on her phone (takeQ); the screen
   gates read screenOff() (j1: true inside COOPW.ctx), so nothing of hers draws on the host's screen; her floaters / numbers / item and coin
   effects called in her run are captured here (UICAP, plain arguments only) and play on HER phone once, with the answer (TH.uiPlay).
   E's buổi step, B's life, C's world frame and D's deferred work stay quiet (turns that are not her tap). */
const UICAP=new Set(["srvToast","kitLine","kitStatFx","feedback","kitCoins","kitGain","kitLose","kitReward","kitLearn","stipReveal","kitItemFx","kitNotice","kitKnow"/* know-notice: what SHE learns by her run on the host (k61Know / noteAdd / newsAdd… raise kitKnow, batched later) is captured at the call and shown on HER phone, not the host's *//* review coop-ptime-reds r1 (whole family: her notices raised by her run on the host — jptime pt:go / pt:back / pt:ord, jrcv rcv:, jerr errand:, jstagehere close: — showed on the HOST's screen, her report text included, and never on hers): captured, shown on HER phone (uiPlay gives the «go» back) */,"kitSfx"/* F3 r1 review: her act sounds (jsfx W buy / sellItem / wkSell / giveTo → kitSfx) were silenced on the host and never played on her phone */]);
for(const n of UICAP)if(!TH.NOOP.includes(n))TH.NOOP.push(n);
TH.UICAP=UICAP;/* F4: a part adds the screen redraws it captures itself (its own wrappers push them to TH.uiCap); TH.uiPlay plays only names in this set */
const uiArg=a=>{try{return JSON.parse(JSON.stringify(a,(k,v)=>typeof v==="function"||(typeof Node!=="undefined"&&v instanceof Node)?undefined:v))}catch(e){return null}};
TH.tapRun=function(fn){const q0=quiet,u0=TH.uiCap;quiet=false;TH.uiCap=[];let r,ui;try{r=fn()}finally{quiet=q0;ui=TH.uiCap;TH.uiCap=u0}return {r,ui:ui&&ui.length?ui.slice(0,12):null}};
/* a captured notice loses its «go» (a function never travels): given back by its id on her phone, the same go its maker set (a notice had a go iff it has a goLabel) */
function noteGo(sp){try{if(!sp||typeof sp!=="object"||!sp.goLabel)return sp;const id=String(sp.id||"");let go=null;
 if(/^pt:ord:/.test(id)&&typeof ptOrdQ==="function"&&typeof ptOrdOpen==="function"){const k=id.slice(7);go=()=>{const o=ptOrdQ().find(z=>String(z.id)===k);if(o)setTimeout(()=>ptOrdOpen(o),0)}}
 else if(/^pt:/.test(id)&&typeof ptOpenTin==="function")go=ptOpenTin;else if(/^errand:/.test(id)&&typeof errOpen==="function")go=errOpen;
 else if(/^rcv:/.test(id)&&typeof rcvOpen==="function")go=()=>rcvOpen(id);
 return go?Object.assign({},sp,{go}):Object.assign({},sp,{goLabel:""})}catch(e){return sp}}
/* guest: what her run on the host captured, played once on her own screen */
TH.uiPlay=function(L){let n=0;for(const x of L||[]){if(!Array.isArray(x))continue;const [f,a]=x;if(!UICAP.has(f)||typeof window[f]!=="function")continue;if(f==="kitNotice"&&Array.isArray(a))a[0]=noteGo(a[0]);
 try{window[f].apply(null,Array.isArray(a)?a:[a]);n++}catch(e){console.error("thin uiPlay",f,e)}}TH.uiN=(TH.uiN|0)+n;return n};
for(const n of TH.NOOP)if(typeof window[n]==="function"){const f=window[n];window[n]=function(){if(CW.ctx&&n!=="resultShow"){if(TH.uiCap&&UICAP.has(n)&&TH.uiCap.length<12)try{const a=[...arguments].map(uiArg);if(n==="kitLine"||n==="srvToast")a[0]=String(a[0]==null?"":a[0]).slice(0,300);TH.uiCap.push([n,a])}catch(e){}return}
  /* a result card whose snapshot was taken in another seat's context (her greeting's card at +30 ms, accEtqGo) is hers, never the host's */
  if(n==="resultShow"&&arguments[1]&&arguments[1].__ctx&&CW.seat!==arguments[1].__ctx)return;return f.apply(this,arguments)};TH.NOOPED.push(n)}

/* stable text of the host's whole state (the round-trip check) */
function stable(o){const seen=new WeakSet();return JSON.stringify(o,function(k,v){if(typeof v==="function")return undefined;
 if(plain(v)&&!Array.isArray(v)){if(seen.has(v))return "[cyc]";seen.add(v);const r={};for(const x of Object.keys(v).sort())r[x]=v[x];return r}return v})}
TH.stateText=function(){const d=ser();const g={};for(const r of REG)g[r[0]]=r[1]();return stable({S:d.S,R:d.R,rid,used,deck,Q:typeof serQ==="function"?serQ():Q.length,popIdx,popMsg,g})};
TH.selfTest=function(){const out={ok:false};try{const t0=TH.stateText();
  out.a=TH.withSeat(CW.seat,()=>S.name);out.sameA=TH.stateText()===t0;
  const other=CW.seat==="a"?"b":"a";
  out.b=TH.withSeat(other,()=>({name:S.name,ctx:CW.ctx,host:(rivals.find(v=>v.coop)||{}).name||null,hostId:(rivals.find(v=>v.coop)||{}).id||null,
   friend:rivals.some(v=>v.coop&&v.id===PID[other]),saved:quiet}));
  const t1=TH.stateText();out.sameB=t1===t0;if(!out.sameB){let i=0;while(i<t0.length&&t0[i]===t1[i])i++;out.diffAt=[t0.slice(Math.max(0,i-80),i+80),t1.slice(Math.max(0,i-80),i+80)];try{const a=JSON.parse(t0),b=JSON.parse(t1),P=[];const dd=(x,y,p)=>{if(P.length>=8)return;if(JSON.stringify(x)===JSON.stringify(y))return;if(plain(x)&&plain(y)){for(const k of new Set([...Object.keys(x),...Object.keys(y)]))dd(x[k],y[k],p+"."+k);return}P.push([p,JSON.stringify(x),JSON.stringify(y)].map(z=>String(z).slice(0,200)))};dd(a,b,"");out.paths=P}catch(e){}}
  out.ok=out.sameA&&out.sameB&&out.b.ctx===other&&out.b.hostId===PID[CW.seat]&&!out.b.friend}catch(e){out.err=String(e&&e.stack||e)}return out};

/* ---------- 4. room RNG ---------- */
function h32(s){let h=2166136261>>>0;for(let i=0;i<s.length;i++){h^=s.charCodeAt(i);h=Math.imul(h,16777619)>>>0}return h>>>0}
function sfc32(a,b,c,d){return function(){a>>>=0;b>>>=0;c>>>=0;d>>>=0;let t=(a+b)|0;a=b^(b>>>9);b=(c+(c<<3))|0;c=(c<<21)|(c>>>11);d=(d+1)|0;t=(t+d)|0;c=(c+t)|0;return (t>>>0)/4294967296}}
const RS={};let RW=-1;
TH.rng=function(stream){stream=String(stream||"main");const w=COOP.state.week||0;if(w!==RW){for(const k in RS)delete RS[k];RW=w}
 let s=RS[stream];if(!s){const seed=(COOP.state.room||"solo")+"|"+w+"|"+stream;const f=sfc32(h32(seed),h32(seed+"#1"),h32(seed+"#2"),h32(seed+"#3"));for(let i=0;i<12;i++)f();s=RS[stream]={f,n:0}}
 const x=s.f();s.n++;TH.rlog.push([w,stream,s.n,x]);if(TH.rlog.length>200)TH.rlog.shift();return x};
TH.R=(n,st)=>Math.floor(TH.rng(st)*n);TH.pick=(a,st)=>a[TH.R(a.length,st)];

/* ---------- 5. snapshot / delta (host → server → guest) and intents (guest → server → host) ---------- */
function put(o,path,v,del){const k=path.split(".");let x=o;for(let i=0;i<k.length-1;i++){if(!plain(x[k[i]])){if(del)return;x[k[i]]={}}x=x[k[i]]}if(del)delete x[k[k.length-1]];else x[k[k.length-1]]=v}
const BADK=/^(__proto__|constructor|prototype)$/;
/* paths whose value changed between a and b (plain objects entered; arrays and other values travel whole) */
function diff(a,b,pre,set,del){for(const k of Object.keys(b)){if(BADK.test(k)||k.includes("."))continue;const p=pre+k,x=a[k],y=b[k];
  if(plain(x)&&plain(y)&&!Array.isArray(x)&&!Array.isArray(y))diff(x,y,p+".",set,del);else if(!(k in a)||JSON.stringify(x)!==JSON.stringify(y))set[p]=J(y)}
 for(const k of Object.keys(a))if(!(k in b)&&!BADK.test(k)&&!k.includes("."))del.push(pre+k)}
TH.diff=(a,b)=>{const set={},del=[];diff(a||{},b||{},"",set,del);return {set,del}};
let lastSent=null;
TH.snapSend=function(o){if(!host()||!TH.on(1))return false;lastSent=J(o);TH.hv++;return COOP.send({t:"snap",v:TH.hv,o:lastSent})};
TH.deltaSend=function(o){if(!host()||!TH.on(1))return false;if(!lastSent)return TH.snapSend(o);const t=performance.now();const d=TH.diff(lastSent,o);
 if(!Object.keys(d.set).length&&!d.del.length)return false;lastSent=J(o);const base=TH.hv;TH.hv++;const r=COOP.send({t:"delta",v:TH.hv,base,set:d.set,del:d.del});
 /* F1 latency: every intent answered since the last send leaves now (q = its wait on the host, v = view build + diff + send) */
 try{if(latP.length){const now=performance.now(),v=Math.round(now-t+(TH.hvMs||0));for(const x of latP.splice(0))latN({id:x.id,op:x.op,run:Math.round(x.run),q:Math.round(t-(TH.hvMs||0)-x.t1),v})}}catch(e){}return r};
/* part A pipe: what the host sends (grows per part) */
TH.hostView=function(){if(!S)return null;const t0=performance.now();try{return hostView0()}finally{TH.hvMs=performance.now()-t0}};
function hostView0(){const d=ser();let b=null;try{const B=TH.seatOf(CW.seat==="a"?"b":"a");b=B&&J(B.S)}catch(e){}
 return {w:COOP.state.week||0,buoi:S.buoi||0,P:{a:d.S,b},R:d.R,rid,dn:TH.dn,dr:TH.dr}}
function snapNow(){try{const o=TH.hostView();if(o)TH.snapSend(o)}catch(e){console.error("thin snap",e)}}
/* F1 latency: a later render's deltaSoon() (1200 ms) must never push back a sooner send already due (an intent's answer: deltaSoon(0)) */
let dT=0,dDue=0;function deltaSoon(ms){ms=ms==null?1200:ms;const due=Date.now()+ms;if(dT&&dDue<=due)return;clearTimeout(dT);dDue=due;dT=setTimeout(()=>{dT=0;dDue=0;try{const o=TH.hostView();if(o)TH.deltaSend(o)}catch(e){console.error("thin delta",e)}},ms)}
TH.flush=()=>{clearTimeout(dT);dT=0;dDue=0;try{const o=TH.hostView();if(o)TH.deltaSend(o)}catch(e){console.error(e)}};
COOP.on("error",m=>{if(!m)return;if(m.code==="snapresync"&&host()&&TH.on(1)){TH.hv=Math.max(TH.hv,m.v|0);snapNow()}});
COOP.on("week",()=>{if(host()&&TH.on(1))setTimeout(snapNow,0)});
if(typeof render==="function"){const f=render;render=function(){const r=f.apply(this,arguments);try{if(!CW.ctx&&host()&&TH.on(1))deltaSoon()}catch(e){}return r}}
/* guest: the host's state as she receives it */
COOP.on("snap",m=>{if(host()||!m||!m.o)return;TH.view={v:m.v|0,o:m.o};COOP.emit("thinview",TH.view)});
COOP.on("delta",m=>{if(host()||!m)return;const V=TH.view;if(!V||V.v!==(m.base|0)){COOP.send({t:"snapreq"});return}
 for(const p in m.set||{}){if(p.split(".").some(k=>BADK.test(k)))continue;put(V.o,p,m.set[p],false)}for(const p of m.del||[])put(V.o,String(p),null,true);
 V.v=m.v|0;const t=performance.now();COOP.emit("thinview",V);TH.gAp=Math.round(performance.now()-t);const A=TH.F&&TH.F.lastAns;if(A&&A.ap==null&&V.o&&V.o.dr&&V.o.dr.id===A.id)A.ap=TH.gAp});
/* intents */
const DO={};let doN=0;TH.myPick=new Set();/* F2 r2: her own picks (their answer's screen effects play once) */
TH.onDo=(op,fn)=>{DO[op]=fn};TH.doFn=op=>DO[op];/* part C wraps part B's "life" */
TH.doSend=function(op,args){if(host()||!TH.on(1))return false;const id="d"+Date.now().toString(36)+"-"+(doN++);if(op==="pick"){TH.myPick.add(id);if(TH.myPick.size>40)TH.myPick.delete(TH.myPick.values().next().value)}COOP.send({t:"do",op,args:args===undefined?null:args,base:TH.view?TH.view.v:0,id});return id};
function runDo(m){const fn=DO[m.op];let r=null;TH.curDo=m.op;
 try{if(fn)r=TH.withSeat(m.from||"b",()=>fn(m.args,m))}catch(e){console.error("thin do",m.op,e);r={err:String(e&&e.message||e)}}
 TH.curDo=null;/* D r1: call-scoped (a later D.later must not see a stale op) */return r}
/* F1 latency split (report only): TH.lat = host times per intent id: run = her intent's run (withSeat + the act), q = wait from the run's end
   to the delta timer, v = view build + diff + send (the guest's network time = her tap→answer minus these and her own apply) */
TH.lat=[];const latN=x=>{TH.lat.push(x);if(TH.lat.length>60)TH.lat.shift()};let latP=[];
COOP.on("do",m=>{if(!host()||!m||!TH.on(1))return;let r;const t0=performance.now();
 /* B r2 (seam): her intents other than the life itself wait while her rolled life is held (they run on her accepted person) */
 if(m.op!=="life"&&m.op!=="probe"&&TH.held(m.from||"b")){D.defer(m.from||"b",{op:m.op,args:m.args===undefined?null:J(m.args),m:{from:m.from||"b",id:m.id}});r={held:1}}
 else r=runDo(m);
 TH.dn=m.n|0;TH.dr={id:m.id,op:m.op,r:r===undefined?null:J(r)};latP.push({id:m.id,op:m.op,run:performance.now()-t0,t1:performance.now()});if(latP.length>20)latP.shift();deltaSoon(0)});
/* part A test intent: read her person in context b (no change) */
TH.onDo("probe",()=>({name:S.name,used,ctx:CW.ctx,host:(rivals.find(v=>v.coop)||{}).id||null}));

/* ---------- 6. part D = remote dialogs (cards) (review/coop-thin-d; audit §3 row D; contract coop-thin-a.md C1-C6) ----------
   ONE path for "a card for her": the host builds it in her context (TH.withSeat), it lives SERIALIZED in her stored person
   (S.thq = the serQ form {pid,pp,t} / note {t,h,cls,btn,w} + id + v = the text and options as she reads them, built in her context)
   and so travels in the snapshot as P.<seat>.thq (the Worker keeps it: a reconnect or a reload shows it again). The guest shows it with
   the normal kit dialog (a stand-in entry in her Q: {thin:id}); her tap sends `do pick {card,i}`; the host rebuilds the card from
   its pid IN HER CONTEXT and runs that option exactly as chooseM does (fx, go, log), once (the card leaves S.thq).
   Closures are never stored: a pid card is rebuilt at pick time inside her context, so its handlers see HER S.
   What the host's run did to her person reaches her phone as a PATCH (until part G the guest still holds her own person): her stored S
   before/after → numbers as deltas, other values set, arrays by element ({pq} in the view; she applies each n once (S.thpn) and acks
   with `do pack`; the host's week end waits for the ack like the old res ack). Things for the HOST (his own cards, his costs) run
   in the host's context after withSeat returns (D.after). Every withSeat entered by part D starts at the top of the event loop
   (D.later = setTimeout 0), never inside an engine call (contract C3: call-scoped flags).
   Gate: TH.dOn() = TH.on(4), or, until part B is on main (contract C1: CAP stays at the lower merged part), TH.on(1) + the test-only
   flag localStorage "ctm-thin-part-4" = "1" on BOTH seats. Off → the old relays in jcoopworld run unchanged (solo never reaches any of it). */
TH.dOn=()=>TH.on(4)||(TH.on(1)&&LS.get("ctm-thin-part-4")==="1");
TH.D=D;D.on=TH.dOn;D.bad=[];D.log=[];
const room=()=>String(COOP.state.room||COOP.code||"");
const SKIP=new Set(["thq","thpn","heir","hr","cyb"]);
function pSnap(){const o=J(ser().S);for(const k of X.W_KEYS)delete o[k];return o}
/* person patch: [op, path, value]; path = keys, an array element as {i, id} (matched by its id / sid / name+bt / k on her side) */
const eid=x=>plain(x)?(x.id!=null?"i"+x.id:x.sid!=null?"s"+x.sid:x.name!=null?"n"+x.name+"#"+(x.bt==null?"":x.bt):x.k!=null?"k"+x.k+"#"+(x.ci==null?"":x.ci):null):null;
const jq=(a,b)=>JSON.stringify(a)===JSON.stringify(b);
const SJ=o=>JSON.stringify(o,(k,v)=>v&&typeof v==="object"&&!Array.isArray(v)?Object.keys(v).sort().reduce((r,x)=>(r[x]=v[x],r),{}):v);
/* thin E: the room's step is the host's alone: it travels as its value, never as a delta (a delta on a seat that is already there drifted to buổi 4) */
const ABS=new Set(["buoi"]);
function pDiff(a,b,pre,out){out=out||[];pre=pre||[];
 for(const k of new Set([...Object.keys(a||{}),...Object.keys(b||{})])){if(!pre.length&&SKIP.has(k)&&!(k==="cyb"&&TH.on(5)/* E-fix: her cycle flags are the host's at level 5+: they travel in the patch */))continue;if(BADK.test(k))continue;
  const x=a[k],y=b[k],p=pre.concat([k]);if(jq(x,y))continue;
  if(!(k in b)){out.push(["-",p]);continue}
  if(typeof x==="number"&&typeof y==="number"){out.push(p.length===1&&ABS.has(k)?["=",p,y]:["+",p,y-x]);continue}
  if(Array.isArray(x)&&Array.isArray(y)){
   if(x.length===y.length&&x.every((e,i)=>plain(e)&&plain(y[i])&&eid(e)!=null&&eid(e)===eid(y[i]))){x.forEach((e,i)=>{if(!jq(e,y[i]))pDiff(e,y[i],p.concat([{i,id:eid(e)}]),out)});continue}
   const rest=x.map(e=>JSON.stringify(e)),add=[];for(const e of y){const j=rest.indexOf(JSON.stringify(e));if(j>=0)rest[j]=null;else add.push(e)}
   const rm=rest.filter(v=>v!=null).map(v=>JSON.parse(v));const front=add.length&&jq(y.slice(0,add.length),add);
   if(rm.length)out.push(["r",p,rm]);if(add.length)out.push(["a",p,add,front?1:0]);continue}
  if(plain(x)&&plain(y)&&!Array.isArray(x)&&!Array.isArray(y)){pDiff(x,y,p,out);continue}
  out.push(["=",p,J(y)])}
 return out}
TH.pDiff=(a,b)=>pDiff(a,b);
/* a step inside her context changed her stored S on purpose before the real change (e.g. put her item in): the patch starts from here */
D.rebase=()=>{if(D.cur&&CW.ctx)D.cur.p0=pSnap()};
/* guest: one patch onto her live S */
function pApply(root,L){let n=0;for(const [op,path,val,fr] of L||[]){try{if(op==="nv"){if(nvApply(path,val))n++;continue}let o=root;
  for(let i=0;i<path.length-1;i++){const k=path[i];if(plain(k)&&Array.isArray(o)){o=(k.i<o.length&&eid(o[k.i])===k.id?o[k.i]:null)/* F3: same position first (eid is not unique: two Yến sào are both "kyensao#") */||o.find(e=>eid(e)===k.id)||(k.i<o.length&&eid(o[k.i])==null?o[k.i]:undefined)}else{if(typeof k!=="string"||BADK.test(k))o=undefined;else{if(!plain(o[k])&&(op==="+"||op==="="||op==="a")&&typeof path[i+1]==="string")o[k]={};o=o[k]}}if(!plain(o))break}
  const k=path[path.length-1];if(!plain(o)||typeof k!=="string"||BADK.test(k))continue;
  const V=x=>{const c=J(x);return root===S&&typeof path[0]==="string"&&refKey(path[0])?unref(c):c};
  if(op==="+"){o[k]=(typeof o[k]==="number"?o[k]:0)+val}else if(op==="="){o[k]=V(val)}else if(op==="-"){delete o[k]}
  else if(op==="a"){if(!Array.isArray(o[k]))o[k]=[];if(fr)o[k].unshift(...V(val));else o[k].push(...V(val))}
  else if(op==="r"&&Array.isArray(o[k])){for(const e of val){const t=SJ(e);let j=o[k].findIndex(z=>SJ(z)===t)/* F3: keys in any order (else the eid fallback took the FIRST piece of that kind) */;if(j<0&&eid(e)!=null)j=o[k].findIndex(z=>eid(z)===eid(e));
   if(j<0&&plain(e)&&Object.keys(e).length===1&&("$r" in e||"$k" in e)){const u=V(e);if(u)j=o[k].indexOf(u)}if(j>=0)o[k].splice(j,1)}}
  n++}catch(e){console.error("thin patch",e)}}return n}
TH.pApply=pApply;
/* D r1 (item 3, the whole family): HER viewer rows on the NPCs (rel / oan / ghen / ev = what that NPC feels / holds toward HER, and every
   "<map>.me" number such as evm.me = that NPC's proof against her) changed by anything the host runs in her context (tai mắt proof, Mua chuộc
   answers, res effects, card choices). They reach her phone at once in the patch as ["nv",[npcId,…path],delta]. Merge3 adds numeric deltas,
   so the host's own world keeps the room's OLD numbers for those rows until the week merges (same rule as part B's life rows): her week
   carries the change exactly once. Inside her context on the host the pending deltas of this week (D.RV) are put back on top, so a later
   card sees the true value (e.g. deedCap of a second proof). D.RV is cleared when the week merges; kept in localStorage (host reload). */
D.RV={};
const RVF=["rel","oan","ghen","ev"];
function rvRead(r){const o={};for(const f of RVF)if(typeof r[f]==="number")o[f]=r[f];
 for(const k of Object.keys(r)){const m=r[k];if(plain(m)&&!Array.isArray(m)&&typeof m.me==="number")o[k+".me"]=m.me}return o}
function rvSet(r,p,v){const k=p.split(".");if(k.length===1){if(v===undefined)delete r[p];else r[p]=v;return}
 if(v===undefined){if(plain(r[k[0]]))delete r[k[0]][k[1]];return}if(!plain(r[k[0]]))r[k[0]]={};r[k[0]][k[1]]=v}
const rvClamp=(p,v)=>p==="rel"?Math.max(-100,Math.min(100,v)):p==="oan"||p==="ghen"?Math.max(0,Math.min(100,v)):Math.max(0,v);
D.rvIn=function(seat){const P=D.RV[seat]||{},m=new Map();
 for(const r of npcs()){if(r.id==null)continue;const s0=rvRead(r),pd=P[r.id];if(pd)for(const p in pd)rvSet(r,p,rvClamp(p,(s0[p]||0)+pd[p]));m.set(r,[s0,rvRead(r)])}return m};
D.rvOut=function(seat,m){const out=[];const P=D.RV[seat]=D.RV[seat]||{};
 for(const [r,[s0,s1]] of m){const s2=rvRead(r);const d={};for(const p of new Set([...Object.keys(s1),...Object.keys(s2)])){const x=(s2[p]||0)-(s1[p]||0);if(x)d[p]=x}
  for(const p of new Set([...Object.keys(s0),...Object.keys(s2)]))rvSet(r,p,s0[p]);  /* the host's world: the room's old numbers */
  for(const p in d){out.push(["nv",[r.id].concat(p.split(".")),d[p]]);const q=P[r.id]=P[r.id]||{};q[p]=(q[p]||0)+d[p]}}
 if(out.length)D.log.push(["rows",seat,out.length]);return out};
/* guest: one row delta onto her own world (her viewer rows of that NPC) */
function nvApply(path,d){if(!Array.isArray(path)||typeof d!=="number")return false;const id=path[0];const r=(rivals||[]).find(x=>x&&x.id===id&&!x.coop);if(!r)return false;
 const p=path.slice(1).join(".");if(!/^(rel|oan|ghen|ev|[A-Za-z0-9_]+\.me)$/.test(p)||BADK.test(path[1]))return false;const s=rvRead(r);rvSet(r,p,rvClamp(p,(s[p]||0)+d));return true}
TH.nvApply=nvApply;

/* host: card store = her stored S.thq; pending patches D.PQ[seat] = [{n,p,rid}]; both kept in localStorage per room (a host reload) */
D.PQ={};D.N={};
const LSK=()=>"ctm-thin-d:"+room();
/* B r2 (seam): D.QS = her saved cards per seat, kept when her store is dropped (part B's accept drops it INSIDE her context: before, the
   save that followed wrote no list for her and the next store loaded none = the host's invite lost); D.DF = deferred D work (data only) */
D.QS=null;D.qsRoom="";
function qsInit(){if(D.QS&&D.qsRoom===room())return;const o=loadLS();D.QS=(o&&o.q)||{};D.qsRoom=room();if(o&&o.df&&typeof o.df==="object")for(const k in o.df)if(Array.isArray(o.df[k])&&!(D.DF[k]&&D.DF[k].length))D.DF[k]=o.df[k]}
D.save=function(){try{qsInit();for(const k in ST)D.QS[k]=(ST[k].S&&ST[k].S.thq)||[];
 const df={};for(const k in D.DF)df[k]=(D.DF[k]||[]).filter(x=>x&&!x.fn);
 const o={q:D.QS,pq:D.PQ,n:D.N,rv:D.RV,rw:COOP.state.week||0,df};localStorage.setItem(LSK(),JSON.stringify(o))}catch(e){}};
/* her card list after a life change (part B accept): replaces the saved list of that seat (her store is gone; the next one loads this) */
D.keepQ=function(seat,L){qsInit();D.QS[seat]=Array.isArray(L)?L:[];if(ST[seat]&&ST[seat].S)ST[seat].S.thq=D.QS[seat];D.save()};
function loadLS(){try{return JSON.parse(localStorage.getItem(LSK())||"null")}catch(e){return null}}
{const so=TH.seatOf;TH.seatOf=function(seat){const had=!!ST[seat];const B=so.apply(this,arguments);if(B&&!had&&TH.dOn()){const o=loadLS();
  /* D r1: her cards come ONLY from the host's own store; a thq inside the room's person blob is ignored (stale: a host reload showed an old card) */
  qsInit();B.S.thq=Array.isArray(D.QS[seat])?D.QS[seat]:o&&o.q&&Array.isArray(o.q[seat])?o.q[seat]:[];
  if(o){if(o.pq&&o.pq[seat]&&!D.PQ[seat])D.PQ[seat]=o.pq[seat];if(o.n&&o.n[seat]&&!D.N[seat])D.N[seat]=o.n[seat];
   if(o.rv&&o.rv[seat]&&!D.RV[seat]&&o.rw===(COOP.state.week||0))D.RV[seat]=o.rv[seat]}}return B}}
D.hold=s=>{if(!Array.isArray(s.thq))s.thq=[]};
const safe=o=>{try{return JSON.parse(JSON.stringify(o,(k,v)=>typeof v==="function"?undefined:v))}catch(e){return null}};
function optV(o){const r=safe(o)||{n:o&&o.n,x:o&&o.x,fx:o&&o.fx};if(r)delete r.go;return r}
let cN=0;
/* D r1 (KIT FIRST, one place): the card as she reads it = EVERY data field of the queued entry (pid, pp, hideOut, kit, art, stage …:
   the renderer and its kit wrappers key on them, e.g. kitIsEventChoice = "pid" in m), minus handlers and this device's own `__` markers.
   The guest's stand-in (gSync) is this object + {thin:id}, so her copy renders exactly like the native card on the host. */
D.vOf=function(m){const v={};for(const k of Object.keys(m||{})){if(/^__/.test(k)||k==="opts"||k==="onClose"||typeof m[k]==="function")continue;const x=safe(m[k]);if(x!==null||m[k]===null)v[k]=x}
 v.who=safe(m.who);v.opts=m.opts?m.opts.map(optV):null;v.mustChoose=!!m.mustChoose;return v};
D.standIn=function(c){const v=c.v||{};return Object.assign({},v,{thin:c.id,t:v.t||c.t,h:v.h||c.h||"",who:v.who||null,opts:v.opts||null,
 must:1/* the host already let this card through; her phone's event pacing (j68 evGate: optional cards held / dropped) must not drop it */})};
/* inside her context: every dialog her turn queued (her Q) becomes a serialized card in S.thq */
D.takeQ=function(){if(!CW.ctx||!Array.isArray(Q)||!Q.length)return 0;D.hold(S);let n=0;
 for(const m of Q.splice(0,Q.length)){if(!m||(typeof isMenuCard==="function"&&isMenuCard(m)))continue;
  const base=m.pid?{pid:m.pid,pp:safe(m.pp)||{},t:m.t}:!m.opts?{t:m.t,h:m.h,cls:m.cls,btn:m.btn,w:m.who&&m.who.w}:null;
  if(!base){D.bad.push(String(m.t||"?"));console.warn("thin D: a card with handlers and no pid cannot be kept",m.t);continue}
  const id="c"+Date.now().toString(36)+(cN++);
  S.thq.push(Object.assign({id},base,{v:D.vOf(m)}));n++}
 if(n){D.log.push(["card",CW.ctx,n]);setTimeout(()=>TH.flush(),0)}return n};
/* things for the host to do after her context closes (his own cards, his costs, his note) */
const AFTER=[];
D.after=fn=>{if(CW.ctx)AFTER.push(fn);else try{fn()}catch(e){console.error("thin after",e)}};
D.afterRun=function(seat){const L=AFTER.splice(0);for(const f of L)try{f()}catch(e){console.error("thin after",e)}
 if(TH.bridgeItems&&TH.bridgeItems.length){const pid=PID[seat];for(const e of TH.bridgeItems.splice(0)){const x=J(e);x.from=pid;if(x.by==="me")x.by=pid;
  try{pushDil(mkP("giftin",{f:pid,e:x}),"Quà tặng")}catch(er){console.error(er)}}}
 if(L.length||AFTER.length)try{showModal();render()}catch(e){}
 try{if(CW.reEnd)CW.reEnd()}catch(e){}};
/* run fn in her context from the top of the event loop (her cards, her res); rid = a host wait (CW.rpend) released when she has it.
   B r2 (seam, the ONE gate for every D path into her context): while her rolled life is held (TH.held) the work is DEFERRED (D.DF), never
   run on the rolled store; it runs when the hold ends (her accept: on her accepted person; release: on the room's person). Work given as
   data (D.kind: k + args + the life it was meant for) survives a host reload; a kind about her PERSON (D.LIFEB: an effect, a proof, news)
   meant for a life she no longer has is dropped (her old life's news die with it); a kind that needs her answer or answers her own act
   (D.ANS cards, her own intents) is always delivered, so the other player's act gets its answer. */
D.K={};D.ANS=["thInv","thBribe"];D.LIFEB=new Set(["res","ev","hr","nbribe","invHer","briber"]);D.GONE={};D.DF={};
D.later=function(seat,fn,rid,it){setTimeout(()=>{if(TH.held(seat)){D.defer(seat,it?Object.assign({},it,{rid}):{fn,rid});return}
  if(it&&D.LIFEB.has(it.k)&&it.life!=null&&TH.lifeOf(seat)>it.life){D.log.push(["drop-life",seat,it.k]);if(rid&&CW.rpend)delete CW.rpend[rid];return}
  const run=it?()=>{const f=D.K[it.k];if(f)f(it.a);else D.log.push(["no-kind",it.k])}:fn;
  let pn=D.N[seat]||0;try{TH.withSeat(seat,run)}catch(e){console.error("thin later",e)}
  if(rid){if((D.N[seat]||0)>pn){const L=D.PQ[seat]||[];const P=L[L.length-1];if(P)P.rid=rid}else if(CW.rpend)delete CW.rpend[rid]}},0)};
/* r3 reviewer: `life` = the life the work is ABOUT. For the host's answer to HER offer (invHer / briber) that is the life that MADE the
   offer (carried in the card's pp.lf from her intent), not the life she has when he answers: an offer of her old life answered after
   her new life is in would otherwise run on the new person (her old item pushed into the new chest and given away, the old bribe paid
   and its proof counted against the new person) */
D.kind=function(seat,k,a,rid,life){D.later(seat,null,rid,{k,a:a===undefined?null:J(a),life:life!=null?life:TH.lifeOf(seat)})};
D.defer=function(seat,it){(D.DF[seat]=D.DF[seat]||[]).push(it);D.log.push(["defer",seat,it.op||it.k||"fn"]);D.save()};
/* the hold is over: the deferred work runs in order (each from the top of the event loop) */
D.flush=function(seat){if(!host()||TH.held(seat))return 0;const L=(D.DF[seat]||[]).splice(0);if(!L.length)return 0;D.save();D.log.push(["flush",seat,L.length]);
 for(const it of L){if(it.op){setTimeout(()=>{if(TH.held(seat)){D.defer(seat,it);return}const r=runDo({op:it.op,args:it.args,from:seat,id:it.m&&it.m.id});D.log.push(["late-do",it.op,!!(r&&!r.err)]);deltaSoon(0)},0)}
  else D.later(seat,it.fn||null,it.rid,it.fn?null:it)}return L.length};
setInterval(()=>{try{if(!CW.on||!host()||!TH.dOn())return;qsInit();for(const k in D.DF)if(D.DF[k]&&D.DF[k].length&&!TH.held(k))D.flush(k)}catch(e){}},1000);
/* part B accept: her old life's unacked patches are void (her new person never had them; S.thpn restarts with it) */
D.dropPQ=function(seat){for(const x of D.PQ[seat]||[])if(CW.rpend){delete CW.rpend["pq"+seat+x.n];if(x.rid)delete CW.rpend[x.rid]}D.PQ[seat]=[]};
/* her card from the host's side: build is called in her context; true when a card was queued */
D.cardFor=function(seat,build,rid){D.later(seat,()=>{build()},rid)};
D.patchOut=function(seat,p){D.N[seat]=(D.N[seat]||0)+1;const L=D.PQ[seat]=D.PQ[seat]||[];L.push({n:D.N[seat],p});while(L.length>40)L.shift();
 const k="pq"+seat+D.N[seat];if(CW.rpend)CW.rpend[k]=Date.now();D.log.push(["patch",seat,D.N[seat],p.length]);setTimeout(()=>TH.flush(),0)};
/* an act / NPC event's effect on her (the old `res` message), applied on the host in her context; death / lãnh cung stay on the old path (part B/G) */
D.resTo=function(seat,m,rid){const g=m.flags||{};if(g.dead||g.cold)return false;D.kind(seat,"res",{m},rid);return true};
D.K.res=a=>{try{X.resApply(a.m)}catch(e){console.error("thin res",e)}};
{const hv=TH.hostView;TH.hostView=function(){const o=hv.apply(this,arguments);if(o&&TH.dOn()){const other=CW.seat==="a"?"b":"a";o.pq=(D.PQ[other]||[]).map(x=>({n:x.n,p:x.p}))}return o}}
/* host: her choice. B r2: a card that needs her answer but cannot be rebuilt any more (her life changed: e.g. Mua chuộc on a cung nữ who
   is one no longer) still answers the other side (D.GONE[pid], run in the host's context) */
TH.onDo("pick",a=>{a=a||{};D.hold(S);const L=S.thq,i=L.findIndex(c=>c&&c.id===a.card);if(i<0)return {gone:1};const c=L.splice(i,1)[0];
 let m=null;if(c.pid){const d=mkP(c.pid,c.pp||{});if(d)m={t:c.t||"Việc khó xử",h:d.t,opts:d.o,who:d.who,pid:d.pid,pp:d.pp,cls:d.cls}}else m={t:c.t,h:c.h,cls:c.cls,btn:c.btn};
 if(!m){D.log.push(["pick-stale",c.pid]);const g=D.GONE[c.pid];if(g)D.after(()=>g(c.pp||{}));return {stale:1}}
 Q.unshift(m);const k=+a.i;const nw=window.__kpNoWarn;window.__kpNoWarn=true;/* asked on her phone already (kpGate) */
 /* F2 r2: her pick is her tap: run as solo (TH.tapRun: quiet off, her follow-up cards / numbers reach HER phone) */
 let ui=null;try{if(m.opts){if(k>=0&&m.opts[k])ui=TH.tapRun(()=>chooseM(k)).ui;if(Q[0]===m){Q.shift();if(k>=0){L.splice(i,0,c);return {refused:1}}}}
 else closeModal()}finally{window.__kpNoWarn=nw}
 D.log.push(["pick",c.pid||c.t,k]);const o={ok:1,i:k};if(ui)o.ui=ui;return o});
/* guest: the screen effects of her pick (captured on the host) play once, when its answer lands (dr = that pick's id) */
COOP.on("thinview",V=>{try{const r=!host()&&V&&V.o&&V.o.dr;if(!r||r.op!=="pick"||!TH.myPick.has(r.id))return;TH.myPick.delete(r.id);if(r.r&&r.r.ui)TH.uiPlay(r.r.ui)}catch(e){console.error("thin pick ui",e)}});
/* her ack of the patches she applied */
TH.onDo("pack",a=>{const n=+(a&&a.n)||0;const seat=CW.ctx;const L=D.PQ[seat]||[];
 for(const x of L)if(x.n<=n&&CW.rpend){delete CW.rpend["pq"+seat+x.n];if(x.rid)delete CW.rpend[x.rid]}D.PQ[seat]=L.filter(x=>x.n>n);
 setTimeout(()=>{try{if(CW.soonEnd)CW.soonEnd()}catch(e){}},0);return {n}});
/* the stored person of the other seat is rebuilt from the merged week while part B is not on (her cards / patches are kept) */
COOP.on("week",()=>{if(host())D.RV={};if(host()&&TH.dOn()&&!TH.on(2)){D.save();for(const k in ST)if(k!==CW.seat)TH.seatDrop(k)}});

/* guest: her cards and patches from the view */
const SENT=new Map();
function gSync(V){if(host()||!TH.dOn()||!V||!V.o||!S)return;
 /* B r2 (seam): while her life changes (the roll asked / her Luân hồi card up / the accept out) her S is a display of the rolled person:
    no card and no patch lands on it; part B's answer calls TH.gSync again once her accepted person is in */
 if(CW.inLife||(TH.life&&TH.life.ask))return;const me=V.o.P&&V.o.P[CW.seat];
 /* patches first (a card may speak of what the patch changed) */
 const pq=V.o.pq||[];let got=0;
 for(const x of pq){if(x.n<=(S.thpn||0))continue;pApply(S,x.p);S.thpn=x.n;got++}   /* the host keeps each patch until she acks it */
 if(got){try{TH.doSend("pack",{n:S.thpn})}catch(e){}try{if(CW.reEnd)CW.reEnd()}catch(e){}}
 const cards=(me&&Array.isArray(me.thq)?me.thq:[]);const ids=new Set(cards.map(c=>c.id));let ch=false;
 for(let i=Q.length-1;i>=0;i--)if(Q[i]&&Q[i].thin&&!ids.has(Q[i].thin)){Q.splice(i,1);ch=true}
 const now=Date.now();for(const [id,t] of SENT)if(!ids.has(id)||now-t>15000)SENT.delete(id);
 for(const c of cards){if(SENT.has(c.id)||Q.some(q=>q&&q.thin===c.id))continue;
  Q.push(D.standIn(c));ch=true}
 if(ch||got){try{showModal();render()}catch(e){console.error(e)}}}
COOP.on("thinview",gSync);TH.gSync=gSync;
COOP.on("room",()=>SENT.clear());
/* her tap on a card: never applied here; the host runs it */
if(typeof chooseM==="function"){const f=chooseM;chooseM=function(i){const m=Q[0];if(m&&m.thin&&!host()){const c=m.opts&&m.opts[i];if(!c||c.off||c.fx&&c.fx.bac&&S.bac+c.fx.bac<0)return;
  if(typeof window.kpGate==="function"&&window.kpGate(i))return;/* her "Kiếp này chưa trọn" warning is asked on her phone; the host never asks it */
  Q.shift();SENT.set(m.thin,Date.now());TH.doSend("pick",{card:m.thin,i});showModal();render();return}return f.apply(this,arguments)}}
if(typeof closeModal==="function"){const f=closeModal;closeModal=function(){const m=Q[0];if(m&&m.thin&&!host()){Q.shift();SENT.set(m.thin,Date.now());TH.doSend("pick",{card:m.thin,i:-1});showModal();render();return}return f.apply(this,arguments)}}
if(typeof serQ==="function"){const f=serQ;serQ=function(){const q=Q;if(!q.some(m=>m&&m.thin))return f.apply(this,arguments);Q=q.filter(m=>!(m&&m.thin));try{return f.apply(this,arguments)}finally{Q=q}}}
try{if(typeof CW.dInit==="function")CW.dInit(TH)}catch(e){console.error("thin dInit",e)}
}catch(e){console.error("jcoopthin",e)}})();
