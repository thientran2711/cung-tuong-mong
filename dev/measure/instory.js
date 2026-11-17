/* D8 story-bot (P5): whole-life / chapter balance add-on for the sens bot. Load after inpage6.js (INP2=...,instory.js; runner: runstory.sh).
   Extends the existing harness (PRIORITY #1: no new bot framework):
   1. CHAPTER LOG: every chapter start of the 14-chapter frame (jst14: msStart67 / chStartArc67 raise S.st.ch.n) is stamped with the month
      (S.turn), the buổi count and her rank/Sủng/Danh; S.st.ch.past (outcome of each chapter: Xong / Lỡ dịp / arc tag, k) is copied at life end.
   2. CURVES: rank / Sủng / Danh / Đức every 3 months.
   3. TUTORIAL FOLLOWER (window.__tqOff=1 turns it off): a sensible new player reads «Việc nên làm» and does the open tutorial quests of
      chapters 1–3 (jtq14) through the game's own functions (act card, goTo, wear, econSell, buy, lesson, doAct, srvStaffAct). The plain
      sens bot never sells / buys / wears, so without this every tutorial chapter closes «Lỡ dịp» for a bot reason only.
   4. CHSTOP=n (window.__chStop): end the life (record "CHSTOP") when chapter n starts, or at window.__yrStop years, so chapters 1–4 can be
      measured on many lives fast. Without it the life runs to its real end (whole-life mode).
   5. Origin × difficulty rotation (window.__rot list of [origin, diff]) set by the runner's XJS, like rundiff.sh. */
(function(){
const R=window.__res;
const snap=()=>({t:S.turn,b:window.__lifeB||0,r:S.rank,s:S.sung,d:S.danh,u:S.duc,a:S.age});
let L=null;/* this life's story log */
function fresh(){L={ch:[],cv:[],tq:[],k0:S&&S.origin?S.origin.k:null,road:null,last:-1}}
function chN(){try{return S.st&&S.st.ch?S.st.ch.n||0:0}catch(e){return 0}}
function poll(){if(!S||S.dead)return;if(!L||L.k0!==S.origin.k&&!L.ch.length)fresh();
 const n=chN();while(L.ch.length<n){const x=snap();x.n=L.ch.length+1;try{x.id=S.st.ms?S.st.ms.id:(S.st.M?S.st.M.a:"")}catch(e){}L.ch.push(x)}
 if(S.turn>=L.last+3||L.last<0){L.last=S.turn;L.cv.push([S.turn,S.rank,S.sung,S.danh,S.duc])}
 try{if(!L.road&&S.st.f14)L.road=S.st.f14.road}catch(e){}}
function record(x){try{poll();const c=S.st&&S.st.ch;x.f14=!!(S.st&&S.st.f14);x.road=L?L.road:null;x.chN=chN();x.chs=L?L.ch:[];x.cv=L?L.cv:[];
 x.past=c?(c.past||[]).map(p=>({n:p.n,tag:p.tag,k:p.k,late:p.late?1:0,id:p.ms||p.a})):[];
 x.cur=S.st.ms?{ms:S.st.ms.id,t0:S.st.ms.t0,q:S.st.ms.q14?S.st.ms.q14.L.map(q=>q.id+(q.ok?"+":q.x?"x":"-")):null}:S.st.M?{a:S.st.M.a,due:S.st.M.due,dl:S.st.M.dl,step:S.st.M.i}:null;
 x.tq=L?L.tq:[];x.diff=typeof diffOf==="function"?diffOf():null;x.rot=window.__rotK;x.srvRisen=S.srv?!!S.srv.risen:null}catch(e){x.storyErr=String(e).slice(0,120)}L=null}
/* the sens bot (inpage6 modalStep) does not read c.off (an option whose «Cần» is not met, e.g. «Tố giác» in «Sau vụ mưu hại», j70):
   chooseM then does nothing and the life sticks in that modal (TIMEOUT). A player cannot press a greyed option: take the best open one. */
{const c0=window.chooseM;window.chooseM=function(i){try{const m=Q[0];if(m&&m.opts){const bad=c=>!c||c.off||(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0);
 if(bad(m.opts[i])){const j=m.opts.findIndex(c=>!bad(c));(window.__offPick=window.__offPick||{})[m.t]=((window.__offPick||{})[m.t]||0)+1;if(j<0){closeModal();return}i=j}}}catch(e){}return c0.call(this,i)}}
{const s0=window.start;window.start=function(){L=null;return s0.apply(this,arguments)}}
if(R&&!R.__st){const p0=R.push;R.push=function(x){try{if(x&&S)record(x)}catch(e){}return p0.apply(this,arguments)};R.__st=1}
/* chapter starts: stamp at once (exact month) */
for(const nm of ["msStart67","chStartArc67"]){const o=window[nm];if(typeof o==="function")window[nm]=function(){const r=o.apply(this,arguments);try{poll()}catch(e){}return r}}
/* tutorial quest closes: which quests were done when the chapter ended */
{const o=window.msCheck67;if(typeof o==="function")window.msCheck67=function(){const m=S&&S.st&&S.st.ms;let st=null;try{const d=m&&MS67[m.id];if(d&&d.steps)st=d.steps(m).map(x=>x[1]?1:0)}catch(e){}const r=o.apply(this,arguments);
 try{if(m&&m.q14&&S.st.ms!==m&&L)L.tq.push({id:m.id,t:S.turn-m.t0,q:m.q14.L.map(q=>q.id+(q.ok?"+":q.x?"x":"-")),st,nt:S.nt||0,r:S.rank,r0:m.r0,d:S.danh})}catch(e){}return r}}
{const nb=window.nextBuoi;window.nextBuoi=function(){try{poll()}catch(e){}return nb.apply(this,arguments)}}
/* ---- 3. tutorial follower ---- */
const QA={an:/^Thỉnh an (Thái hậu|Hoàng hậu)/,diem:/^(Điểm trang|Dưỡng nhan)/,cn:/^Trò chuyện với cung nữ/,hau:/^(Quét sân|Dâng trà|Theo hầu chủ|Lĩnh đồ|Việc chủ sai)/,
 le:/^Học lễ nghi/,chai:/^Chải chuốt/,theu:/^Thêu khăn/,luyen:/^Luyện thêu/};
const QP={an:["tn","kn"],vuon:["vuon"],di:["vuon","tn","ksp","tyv"]};
const FRIEND=["ally","gift","spyk"];
function openQ(){try{const m=S.st&&S.st.ms;if(!m||!m.q14)return[];return m.q14.L.filter(q=>!q.ok&&!q.x).map(q=>q.id)}catch(e){return[]}}
function tryQ(id){
 if(QA[id]){const i=deck.findIndex(a=>a&&QA[id].test(a.n||"")&&(typeof cardOK!=="function"||true));
  if(i>=0&&!deck[i].done&&canPay(deck[i])&&!deck[i].lock&&can(cardCost(deck[i]))){act(i);return true}
  for(const k of (QP[id]||[]))if(S.place!==k&&can(travel(S.place,k)+1)){const p=places().find(x=>x.k===k);if(p&&(typeof accessOf!=="function"||accessOf(S,k).ok)){goTo(k);return true}}
  return false}
 if(id==="di"||id==="vuon"){for(const k of QP[id]){if(S.place===k)continue;const p=places().find(x=>x.k===k);if(p&&can(travel(S.place,k)+1)&&(typeof accessOf!=="function"||accessOf(S,k).ok)){goTo(k);return true}}return false}
 if(id==="trang"){const ix=S.inv.findIndex(e=>e&&!e.h&&!e.w&&IT[e.k]&&IT[e.k].sl);if(ix>=0){wear(S,ix);return true}return buyCheap(1)}
 if(id==="ban"){const L=typeof econSellable==="function"?econSellable(S).filter(x=>x&&!x.no):[];if(L.length){econSell(S,L[0].ix);return true}
  const ix=S.inv.findIndex(e=>e&&!e.h&&!e.w&&IT[e.k]);if(ix>=0){sellItem(S,ix);return true}return buyCheap(0)}
 if(id==="mua")return buyCheap(0);
 if(id==="giao"){if(!can(2))return false;for(let i=0;i<rivals.length;i++){const v=rivals[i];if(!v||!v.alive||v.out)continue;let B;try{B=rvBtns(i)}catch(e){B=[]}for(const k of FRIEND)if(B.includes(k)){doAct(i,k);return true}}return false}
 if(id==="hoc"){const A=ARTS.filter(a=>S.arts[a.k]<5).sort((a,b)=>(typeof tchFee==="function"?tchFee(a.k)-tchFee(b.k):0));for(const a of A){const f=typeof tchFee==="function"?tchFee(a.k):5;if(S.bac>=f&&can(2)&&!S.mg){lesson(a.k);return true}}return false}
 if(id==="chat"||id==="bieu"){if(typeof srvColleagues!=="function")return false;const C=srvColleagues();if(!C.length)return false;const s=C[Math.floor(Math.random()*C.length)];return srvStaffAct(id==="chat"?"chat":"gift",s)!=null}
 return false}
/* cheapest item she can afford (slot item when sl), bought through buy() (j8): counts for «mua» */
function buyCheap(sl){const ks=Object.keys(IT).filter(k=>IT[k]&&IT[k].pr>0&&IT[k].pr<=S.bac&&(!sl||IT[k].sl)&&!IT[k].h&&!IT[k].hid).sort((a,b)=>IT[a].pr-IT[b].pr);if(!ks.length)return false;return !!buy(S,ks[0])}
const x0=window.__xOpts;
window.__xOpts=function(N){const out=x0?x0(N)||[]:[];if(window.__tqOff||!S||S.dead||Q.length||S.mg)return out;
 const L2=openQ();const tk=S.turn+"_"+S.tuan+"_"+(S.buoi||0)+"_"+used;if(window.__tqK!==tk){window.__tqK=tk;window.__tqN=0}
 if(L2.length&&window.__tqN<4)for(const id of L2)out.push({L:"tq"+id,s:4.5,f:()=>{window.__tqN++;let ok=false;try{ok=tryQ(id)}catch(e){}if(!ok)window.__tqN+=2;(window.__tqC=window.__tqC||{})[id+(ok?"+":"-")]=((window.__tqC||{})[id+(ok?"+":"-")]||0)+1}});
 /* the chapter goal itself (a new player reads «Mục tiêu»): «Học quy củ» = one friend (thiện cảm BAL.st14.goal.rel) + one art at goal.art */
 try{const m=S.st&&S.st.ms;if(m&&m.id==="tap14"&&!window.__tqOff&&!S.srv){const G=BAL.st14.goal;
  const fr=liveRivals(true).some(v=>(aff(v,S)||0)>=G.rel);
  if(!fr&&can(2)){let bi=-1,ba=-1e9;rivals.forEach((v,i)=>{if(!v||!v.alive||v.out)return;const a=aff(v,S)||0;if(a>ba){let B=[];try{B=rvBtns(i)}catch(e){}if(B.includes("gift")||B.includes("ally")){ba=a;bi=i}}});
   if(bi>=0)out.push({L:"tqfr",s:3.2,f:()=>{let B=[];try{B=rvBtns(bi)}catch(e){}doAct(bi,B.includes("ally")&&S.bac>=60?"ally":"gift");(window.__tqC=window.__tqC||{}).fr=(window.__tqC.fr||0)+1}})}
  const ar=Object.values(S.arts||{}).some(l=>(l||0)>=G.art);
  if(!ar&&can(2)&&!S.mg){const A=ARTS.filter(a=>S.arts[a.k]<G.art).sort((a,b)=>S.arts[b.k]-S.arts[a.k]);const a=A.find(a=>S.bac>=(typeof tchFee==="function"?tchFee(a.k):5));
   if(a)out.push({L:"tqart",s:3.2,f:()=>{lesson(a.k);(window.__tqC=window.__tqC||{}).art=(window.__tqC.art||0)+1}})}}}catch(e){}
 return out};
/* ---- 4. chapter stop ---- */
const st0=window.__bot.step;
function stopChk(){if(!S||S.dead)return;try{poll()}catch(e){}
 const cs=window.__chStop,ys=window.__yrStop;
 if((cs&&chN()>=cs)||(ys&&S.turn>=ys*12)){R.push({origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank||0,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),age:S.age,
  title:"CHSTOP",fate:cs&&chN()>=cs?"CHSTOP":"YRSTOP",sung:S.sung,danh:S.danh,duc:S.duc,bac:S.bac,kids:S.kids.length,lb:window.__lifeB,hhTurn:window.__hhTurn,acts:window.__acts});
  window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__hhWk=null;window.__hhB=null;window.__lifeB=0;window.__sucTrace=[];window.__acts={};Q=[];try{closeModal()}catch(e){}start()}}
/* one bot iteration at a time, so the stop lands on the exact chapter start */
window.__bot.step=function(mode,n){let r=0;for(let i=0;i<n;i++){stopChk();r=st0.call(this,mode,1)}return r};
{const e0=window.__bot.extra;window.__bot.extra=()=>Object.assign(e0(),{tqC:window.__tqC||{},offPick:window.__offPick||{}})}
})();
