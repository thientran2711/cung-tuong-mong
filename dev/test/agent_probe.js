/* NPC AGENT LOOP (jagent, AG1 + AG1b) probe: plays N buổi of real play (new buổi, random walks), closes cards by their last option,
   then reports: page errors, jagent errors, ticks, acts by deed, witness counts (her / NPC), perf (__agMs p50/p95/max), the why of a few acts,
   ledger rows written by the loop (S.roster.P "ag_*") and NPC means (Sức, Sủng, Thái hậu).
   usage: node dev/test/agent_probe.js <page URL or file> [steps] [WxH] [off|on] [cpu]   (off = the loop switched off, the old drips;
   cpu = CPU slow-down factor for the perf counter, e.g. 4 ≈ a phone like the Fold) */
const {chromium}=require('playwright');const [,,URL0,NB,SZ,OFF,CPU]=process.argv;const N=+NB||48;const [W,H]=(SZ||'755x1000').split('x').map(Number);
const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(240000);
 if(+CPU>1){const c=await p.context().newCDPSession(p);await c.send('Emulation.setCPUThrottlingRate',{rate:+CPU})}
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForTimeout(2500);
 await p.evaluate(off=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;if(off)window.__agOff=1;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()},OFF==='off');
 const seen0=[];
 for(let i=0;i<N;i++){
  const r=await p.evaluate(()=>{const out={};const clear=()=>{const ov=document.getElementById('ov');for(let j=0;j<5&&ov&&!ov.hidden;j++){const bs=ov.querySelectorAll('button');if(!bs.length)break;bs[bs.length-1].click()}
    let n=0;while(Q.length&&n++<30){const m=Q[0];if(/Ngươi bắt gặp|Có người tìm đến/.test(m.t||""))(window.__agSc=window.__agSc||[]).push({t:m.t,h:String(m.h||"").replace(/<[^>]+>/g," ").slice(0,160),o:(m.opts||[]).map(o=>o.n+" | "+o.x)});
     if(m.opts&&m.opts.length){try{const k=m.opts.findIndex(o=>o.n==="Nghe lén"||o.n==="Tham gia");chooseM(k>=0&&Math.random()<.5?k:m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}};
   if(S.dead)return{dead:1};
   const r=Math.random();if(r<.45){try{nextBuoi()}catch(e){out.e=String(e)}}else if(r<.75){const L=places().map(x=>x.k).filter(k=>k!==S.place&&accessOf(S,k).ok);if(L.length)try{goTo(L[Math.floor(Math.random()*L.length)])}catch(e){}}
   else{try{if(can(1)){spend(1);if(typeof j95sync==="function")j95sync()}}catch(e){}}
   clear();try{tab="go";render()}catch(e){}return out});
  if(r.dead)break;
 }
 const rep=await p.evaluate(()=>{const z=S.ag||{};const R=S.roster;let agRows=0;if(R)for(const id in R.P)for(const e of R.P[id])if(e&&String(e[1]).indexOf("ag_")===0)agRows++;
  const L=liveRivals(true);const mean=f=>Math.round(L.reduce((a,v)=>a+(+v[f]||0),0)/Math.max(1,L.length));
  return{on:typeof agOn==="function"&&agOn(),week:wk(),month:S.month,year:S.year,stat:window.AG&&AG.stat,tm:window.AG&&AG.tm,slow:window.AG&&AG.slow,over:window.AG&&AG.over,ms:window.AG&&AG.ms.map(x=>+x.toFixed(1)),errs:window.AG&&AG.errs,perf:typeof agPerf==="function"&&agPerf(),agN:window.__agN,
   log:(z.log||[]).slice(-8),pend:(z.pend||[]).length,agRows,mean:{suc:mean("suc"),sung:mean("sung"),th:mean("th"),bac:mean("bac")},orgs:L.map(v=>v.ag&&v.ag.o||(v.nr&&v.nr.o)||"-").join(","),
   scenes:(window.__agSc||[]).slice(0,4),nSc:(window.__agSc||[]).length,acts:R&&R.acts?R.acts.filter(a=>a.ag).length:0}});
 rep.pageErrs=errs;console.log(JSON.stringify(rep,null,1));await b.close()})();
