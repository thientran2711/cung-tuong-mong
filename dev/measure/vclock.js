/* vclock.js — init script for reproducible bot runs (danh-p1; used by run_rep.js through addInitScript, arg [seed]).
   Why: run_par.js seeded Math.random but the game also runs ~100 wall-clock timers (setTimeout / setInterval / rAF) and reads
   Date.now / performance.now; how many of them fire between two bot calls depends on machine speed, and each one can draw from
   the same Math.random stream, so the same seed gave different lives (review-danh-balance-r1 §2/§5).
   Fix: (1) Math.random and crypto.getRandomValues from one seeded stream; (2) every timer goes through a table; until
   __vtOn(seed) they run on real time (boot), after it they run ONLY when the bot pumps the virtual clock (__vtPump(ms)),
   in (due time, creation order); (3) Date / performance.now read the virtual clock after __vtOn; (4) __vtOn re-seeds the stream,
   so the random draws spent during boot do not shift the life. Callbacks created inside a pump wait for the next pump. */
(function(seed0){
 let s=0;const seedIt=sd=>{s=(sd*7919+12345)|0};seedIt(seed0);
 const R=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
 Math.random=R;
 try{const C=globalThis.crypto;if(C){C.getRandomValues=function(a){const n=a.BYTES_PER_ELEMENT||1,m=2**(8*Math.min(n,4));for(let i=0;i<a.length;i++)a[i]=Math.floor(R()*m);return a};
  if(C.randomUUID)C.randomUUID=function(){const h=()=>Math.floor(R()*16).toString(16);return "xxxxxxxx-xxxx-4xxx-8xxx-xxxxxxxxxxxx".replace(/x/g,h)}}}catch(e){}
 const rST=setTimeout.bind(window),rCT=clearTimeout.bind(window),rSI=setInterval.bind(window),rCI=clearInterval.bind(window);
 const rPN=performance.now.bind(performance),RD=Date,rDN=Date.now.bind(Date);
 let V=false,vnow=0,seq=0,nid=1e7,inPump=false;const BASE=1795000000000;/* a fixed day in 11/2026 */
 const T=new Map();
 function run(t){try{typeof t.cb==="function"?t.cb.apply(window,t.args||[]):(0,eval)(String(t.cb))}catch(e){console.error("vclock cb",e&&e.message)}}
 function add(cb,d,args,iv){const id=++nid;d=Math.max(iv?4:0,+d||0);const t={cb,args,d,iv,at:vnow+d,seq:++seq,pend:inPump};T.set(id,t);
  if(!V)t.real=(iv?rSI:rST)(()=>{if(V)return;if(!iv)T.delete(id);run(t)},d);return id}
 function clr(id){const t=T.get(id);if(t){if(t.real!=null)(t.iv?rCI:rCT)(t.real);T.delete(id)}}
 window.setTimeout=(cb,d,...a)=>add(cb,d,a,false);window.setInterval=(cb,d,...a)=>add(cb,d,a,true);
 window.clearTimeout=clr;window.clearInterval=clr;
 window.requestAnimationFrame=cb=>add(()=>cb(V?vnow:rPN()),16,[],false);window.cancelAnimationFrame=clr;
 try{window.requestIdleCallback=cb=>add(()=>cb({didTimeout:false,timeRemaining:()=>0}),50,[],false);window.cancelIdleCallback=clr}catch(e){}
 performance.now=()=>V?vnow:rPN();
 function D(...a){if(!new.target)return RD();return a.length?new RD(...a):new RD(D.now())}
 D.prototype=RD.prototype;D.now=()=>V?BASE+Math.floor(vnow):rDN();D.parse=RD.parse;D.UTC=RD.UTC;window.Date=D;
 /* switch to the virtual clock: real timers cancelled, every live timer re-based on its own delay (creation order kept) */
 window.__vtOn=function(sd){seedIt(sd==null?seed0:sd);vnow=0;for(const t of [...T.values()].sort((a,b)=>a.seq-b.seq)){if(t.real!=null){(t.iv?rCI:rCT)(t.real);t.real=null}t.at=t.d;t.pend=false}V=true};
 window.__vtPending=()=>[...T.values()].filter(t=>!t.iv&&t.d<=10000).length;
 window.__vtPump=function(dt){if(!V)return;vnow+=(dt==null?5:dt);for(const t of T.values())t.pend=false;inPump=true;try{
  const due=[...T.entries()].filter(([,t])=>t.at<=vnow&&!t.pend).sort((a,b)=>a[1].at-b[1].at||a[1].seq-b[1].seq);
  for(const [id,t] of due){if(T.get(id)!==t)continue;if(t.iv)t.at=vnow+t.d;else T.delete(id);run(t)}}finally{inPump=false}};
})(typeof __SEED__!=="undefined"?__SEED__:1);
