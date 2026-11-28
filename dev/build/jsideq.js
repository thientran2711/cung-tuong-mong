/* ================= jsideq: SIDEQ-TRIM — who may ask her, how many at once, how short (owner OD 26/11 ~19:15Z, BAL.sideq in jbal2.js) =================
   Every Việc nhờ / Phụ tuyến reaches her through j72 (q72Make → q72Offer), whatever the source: the random tuần tick, follow-ups and NPC-road
   help hồi (jnroad / jnroadm / jnroade push q72().ch), the Tâm nguyện lines (jreign rgLNext), meetings on the map (jact «favour»), NPC visits
   (jagharm «favour»), exam errors (jexam psErr), debts collected (q72Collect) and her own «Hỏi han» (q72Ask). So ONE gate here covers them all:
   (1) RANK FIT — q72Fit(A): BAL.sideq.who by her band, consorts within rvDn/rvUp ranks, only people who know her (j61 reveal stage ≥ BAL.sideq.knowSt, plus BAL.sideq.know / offKnow);
       q72Pick never draws an unfit asker, q72Make refuses a given unfit asker (follow-ups, lines, visits): that NPC keeps her own road and her
       chapter is played without the player (jnroad nrHold withdraws an unshown request), nobody is forced.
   (2) FEW AT ONCE — Q72CFG.max / Q72CFG.mo read BAL.sideq.open[band] / BAL.sideq.mo (the Việc nhờ tab and the chapter hints read Q72CFG),
       plus BAL.sideq.gapW tuần between two new asks from anyone.
   (3) SHORT — at most BAL.sideq.stepMax steps; deadline min(template, BAL.sideq.dlMax) but never under its waits + 1 (q72Dl, one place);
       accepted and never begun by the deadline → the asker took it elsewhere: small loss BAL.sideq.lateR, no other cost.
   (4) NOT WHOLE-GAME — when her band changes (promotion, demotion), an open quest whose asker no longer fits ends quietly («Dừng giữa chừng»,
       no loss) and the waiting follow-ups of unfit askers are dropped.
   Wraps only; no UI of its own (j72 kit card / history card / log). ================= */
(function(){if(typeof q72Make!=="function"||!BAL.sideq)return;
const B=()=>BAL.sideq;
function sqBand(r){const b=B().band;r=r==null?(S&&S.rank|0):r;return b[Math.max(0,Math.min(b.length-1,r|0))]}
function sqKnows(v){try{if(!v||typeof v!=="object")return false;if(aff(v,S)>=netTh(v,B().know))return true;if(typeof sameHouse==="function"&&sameHouse(S,v))return true;const f=facOf(v);return !!(f&&f===facOf(S))}catch(e){return false}}
/* the who key of an asker: "man:<role>" for men, else the q72 kind */
function sqKey(A){if(!A)return"";if(A.k==="man"&&A.o&&A.o.rw)return "man:"+A.o.rw;return A.fam?"fam":A.k}
function q72Fit(A,T){try{if(!A||!S||window.__sqoff)return true;/* window.__sqoff: content tests (j72c-play, nrask-engine) deal any asker */const Q=B(),bd=sqBand();if(T&&T.s&&T.s.length>Q.stepMax)return false;
 if(A.k==="rv"&&typeof k61St==="function"){let st=3;try{st=k61St(A.o)}catch(e){}if(st<Q.knowSt)return false}
 if(A.k==="rv"){const v=A.o;const d=(v.rank|0)-(S.rank|0);if(d<-Q.rvDn||d>Q.rvUp)return false;return sqKnows(v)}
 if(A.k==="ak"&&A.mom===S)return true;/* her own grown child asks at every band */
 /* (5) only people she knows: the j61 reveal stage of the asker (1 face, 2 name, 3 acquainted) must reach knowSt — a stranger («Người lạ / ???»)
    never comes with a favour (MAIN 162 LOOK: a minister shown as «Người lạ» asked her). The Emperor and the Thái hậu are known to every consort. */
 if(A.k!=="emp"&&A.k!=="th"&&A.o&&typeof A.o==="object"&&typeof k61St==="function"){let st=3;try{st=k61St(A.o)}catch(e){}if(st<Q.knowSt)return false}
 const k=sqKey(A);const w=Q.who[k]||(k.indexOf("man:")===0?Q.who.man:null);if(w&&(bd<w[0]||bd>w[1]))return false;
 if(A.k==="fallen")return sqKnows(A.o);
 if(A.k==="rsv")return !!(A.own&&sqKnows(A.own));
 if(A.k==="off"){const h=A.o;return ((h&&h.af&&h.af[key(S)])||0)>=Q.offKnow}
 return true}catch(e){return true}}
window.q72Fit=q72Fit;window.sqBand=sqBand;
/* (1) the picker never draws an unfit asker; a given asker must fit (follow-ups, Tâm nguyện lines, visits, exam errors) */
const p0=q72Pick;q72Pick=function(sp,not,ff){const f2=(o,z)=>q72Fit(z)&&(!ff||ff(o,z));return p0.call(this,sp,not,f2)};
const m0=q72Make;q72Make=function(T,rq,place){if(rq&&!q72Fit(rq,T))return null;if(T&&T.s&&T.s.length>B().stepMax&&!window.__sqoff)return null;return m0.apply(this,arguments)};
/* (3) one deadline everywhere: min(template, dlMax), never under its own waits + 1. Written onto every template once (and on any template
   registered later), so the card tag «Hạn N tuần», the offer, the accept log and x.dl all read the same trimmed number. */
function q72Dl(T){if(!T)return B().dlMax;const w=(T.s||[]).reduce((a,st)=>a+(st&&st.w?st.w:0),0);return Math.max(Math.min(T.dl0||T.dl||6,B().dlMax),w+1)}
window.q72Dl=q72Dl;
function sqTrim(T){if(T&&T.dl0==null){T.dl0=T.dl||6;T.dl=q72Dl(T)}return T}
for(const T of T72)sqTrim(T);
const T70=T7;T7=function(){return sqTrim(T70.apply(this,arguments))};
const o0=q72Offer;q72Offer=function(x,how){const ok=o0.apply(this,arguments);if(ok)q72().lw=wk();return ok};
/* (2) few at once: Q72CFG.max / mo read BAL (every reader: j72 accept, Việc nhờ tab, chapter hints) */
try{Object.defineProperty(Q72CFG,"max",{get:()=>B().open[sqBand()],configurable:true});Object.defineProperty(Q72CFG,"mo",{get:()=>B().mo,configurable:true})}catch(e){}
const c0=q72CanOffer;q72CanOffer=function(ask){if(!c0.apply(this,arguments))return false;if(ask)return true;const q=q72();return !(q.lw!=null&&wk()-q.lw<B().gapW)};
/* (3)+(4) the tuần: an accepted quest never begun by its deadline → the asker took it elsewhere (small loss); band change → unfit askers withdraw */
function sqQuiet(x,X,line){const q=q72();const i=q.a.indexOf(x);if(i>=0)q.a.splice(i,1);
 q.h.unshift({tid:x.tid,res:"gone",w:wk(),t:X?q72Title(X):"",n:X?X.A.n:"",pn:X?q72PgN(X.A):"",f:X?X.A.f:null,lg:x.log.slice(-4),end:line,tok:""});if(q.h.length>12)q.h.length=12;log(line)}
const t0=q72Tick;q72Tick=function(){try{const q=q72();if(q&&q72On()){
 for(const x of q.a.slice()){if(wk()<=x.dl||x.st!==0||x.log.length)continue;const X=q72X(x);if(!X)continue;q72Rel(X.A,B().lateR);
  sqQuiet(x,X,`${q72Short(X.A)} đợi mãi không thấy ngươi bắt tay vào việc (${q72Title(X)}), đã nhờ người khác lo.${q72Tok(X.A,B().lateR)?" "+plain(q72Tok(X.A,B().lateR))+".":""}`)}
 const bd=sqBand();if(q.bd!=null&&q.bd!==bd){
  for(const x of q.a.slice()){const X=q72X(x);if(!X||q72Fit(X.A))continue;sqQuiet(x,X,`Ngươi nay ở ngôi khác, ${q72Short(X.A)} không tiện nhờ ngươi nữa: việc «${q72Title(X)}» người ấy tự lo liệu.`)}
  q.ch=q.ch.filter(c=>{const A=q72A(c.rk,c.ri);return !A||q72Fit(A,T72I[c.tid])})}
 q.bd=bd}}catch(e){console.error(e)}return t0.apply(this,arguments)};
/* the Việc nhờ gloss (kitInfo) states the rule with BAL numbers (one core): only acquaintances of a fitting rank, how many a month, how many at once */
try{if(typeof KIT_GLOSS==="object"){const g0=KIT_GLOSS["Việc nhờ"]||"";Object.defineProperty(KIT_GLOSS,"Việc nhờ",{configurable:true,enumerable:true,
 get:()=>`Chỉ người quen biết ngươi, phẩm bậc tương xứng mới tìm đến nhờ: nhiều nhất ${B().mo} lời nhờ mỗi tháng, cùng lúc làm ${B().open[sqBand()]} việc, mỗi việc ngắn, hạn chừng ${B().dlMax} tuần. Ngươi lên ngôi khác thì người cũ không tiện nhờ nữa. ${g0.replace(/^Người trong cung tìm đến nhờ khi cần \([^)]*\); /,"Ngươi ")}`.trim()})}}catch(e){}
})();
