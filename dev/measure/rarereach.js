/* rare-reach recorder (load after inpage6.js + rare97.js): every rare source, per life.
   j97 arc rare + jroad road-finale rare (both go through r97Gate): at the climax, the eligibility breakdown (path count vs np, bad hit,
   Lợi thế vs sc, the extra stat/relation condition), whether the hidden roll hit, and whether the rare ending was then taken.
   j96 Thanh mai (tm96c): rare96() eligibility first seen true, the «Giả chết» try and the ending.  jkc outside-palace: each kcRare(id) roll.
   j99succ: succRareOK() at the second succession chapter and the roll (S.succ.r).  Origin rotation over all 9 origins (incl. cnv).
   Output: window.__rr (one object per finished life), also put on the life's inpage6 window.__res entry as .rr (run_rep.js saves __res).
   usage: cat inpage6.js rare97.js rarereach.js > /tmp/x.js; node dev/measure/run_rep.js root/dev/index.html <sens|rand|mix> <lives> out.json /tmp/x.js 4 <seed>  (summary: rr-sum.js) */
(function(){window.__rr=window.__rr||[];let L=null;const ORIG=['tt','dtq','muoi','cn','nc','td','ch','thd','cnv'];window.__rrOi=window.__rrOi||0;
const newL=()=>{L={gates:[],tm:{on:0,elig:0,try:0,end:""},kc:[],succ:null}};newL();
const s0=start;start=function(){window.__origO=ORIG[(window.__rrOi++)%ORIG.length];newL();return s0.apply(this,arguments)};
const isRoad=a=>(window.RD97L||[]).some(d=>d.a===a);
const g0=r97Gate;r97Gate=function(A){let pre=null;try{if(A&&!A.r97&&A.nb&&R97[A.a]&&r97IsX(A,A.nb)){const d=R97[A.a],q=A.q97||{p:0,b:0};let x=1;try{x=d.x?(d.x[0](A)?1:0):1}catch(e){x=0}
  let nd=1;if(d.need==="kid"&&!r97son())nd=0;if(d.need==="hh"&&!qOn())nd=0;if(d.need==="th"&&S.thDead)nd=0;
  pre={a:A.a,src:isRoad(A.a)?"road":"arc",p:q.p||0,np:d.np||2,b:q.b?1:0,sc:Math.max(A.sc||0,(q.sc)||0),sc0:A.sc||0,scN:d.sc||0,x,nd,B:(d.p||.1)*(R97CFG.p||1),P:typeof r97Roll==="function"?r97Roll((d.p||.1)*(R97CFG.p||1),isRoad(A.a)?"road":"arc"):(d.p||.1)*(R97CFG.p||1),turn:S.turn}}}catch(e){}
 const r=g0.apply(this,arguments);try{if(pre&&A.r97){pre.c=A.r97.c;pre.ok=A.r97.ok;L.gates.push(pre)}}catch(e){}return r};
try{const f=rare96;rare96=function(){const v=f.apply(this,arguments);try{if(v&&!L.tm.elig){L.tm.elig=1;L.tm.thuoc=(typeof A96has==="function"&&A96has("thuoc"))?1:0}}catch(e){}return v}}catch(e){}
try{const f=kcRare;kcRare=function(id,p){const had=S.kc&&S.kc.r97&&S.kc.r97[id]!=null;const v=f.apply(this,arguments);if(!had)L.kc.push({id,p,ok:v?1:0});return v}}catch(e){}
try{const f=succRareOK;succRareOK=function(){const v=f.apply(this,arguments);try{L.succ={p:S.succ&&S.succ.p,elig:v?1:0}}catch(e){}return v}}catch(e){}
const mk=fate=>{const T=S.tm96;L.tm.on=T?1:0;if(T){L.tm.end=T.endC||"";L.tm.h=T.h|0}if(L.succ&&S.succ)L.succ.r=S.succ.r;
  const me={origin:S.origin.k,turns:S.turn,rank:S.rank,ch:S.st&&S.st.ch?S.st.ch.n||0:0,kcMode:S.kc?1:0,fate:String(fate).replace(/<[^>]+>/g,'').slice(0,50),rare:(S.r97||[]).map(x=>x.a),gates:L.gates,tm:L.tm,kc:L.kc,succ:L.succ};window.__rr.push(me);return me};
/* chapter stop: every hidden-chain climax sits in chapters 1–11 (Phần giữa ends at BAL.st14.parts[1][1]); 12–14 are the Trung cung milestones.
   window.__rrStop = n ends the recorded life when chapter n starts (0 = play the whole life). */
const st0=window.__bot.step;window.__bot.step=function(mode,n){try{const cs=window.__rrStop,c=S&&!S.dead&&S.st&&S.st.ch;if(cs&&c&&(c.n||0)>=cs){const me=mk("CHSTOP");
  window.__res.push({origin:S.origin.k,rank:S.rank,maxRank:Math.max(window.__maxRank||0,S.rank),turns:S.turn,years:+(S.turn/12).toFixed(2),title:"CHSTOP",fate:"CHSTOP",rr:me});
  window.__maxRank=0;window.__lifeIter=0;window.__hhTurn=null;window.__sucTrace=[];window.__acts={};Q=[];try{closeModal()}catch(e){}start()}}catch(e){console.error(e)}return st0.call(this,mode,n)};
const o0=over;over=function(h,t,fate){let me=null;const n0=(window.__res||[]).length;try{if(S&&!S.dead)me=mk(fate)}catch(e){}const r=o0.apply(this,arguments);try{const R=window.__res;if(me&&R&&R.length>n0)R[R.length-1].rr=me}catch(e){}return r}})();
