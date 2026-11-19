/* MINISTER AGENTS (jagmin, PARKING LOT #7) — one fresh consort life:
   1 every memorial of the month (forced 40×) names a living official of S.trieu (a house head or the censor) with his goal words
   2 each official's goal = BAL.ag.min.gT of his nết (censor default liem); the speaker is the one his candidate list names
   3 the censor's regard lowers her can-chính risk (ccRisk = what ccWord previews: ONE CORE)
   4 TWO-WAY: she courts the censor by the Triều đình gift button (tdAct gift, same deed as the heads); a worried NPC consort courts him too
   5 an official whose own inquiry found a father clean does not impeach that father again within BAL.ag.min.imp.keep months
   6 off switch BAL.ag.min.on = 0 → old j55 path (no named speaker on the can-chính memorial)
   7 old save without S.trieu.ns / goals loads, gets its censor; the Triều đình view shows his card; 0 page errors over 36 months
   usage: node dev/test/minister-agents.js <page URL or file> → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0||'')?URL0:'file://'+require('path').resolve(URL0||'index.html');
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{let n=0;do{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;n++}while(!tdOn()&&n<20);window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r1=await p.evaluate(()=>{const T=trS();const names=new Set(minAll().map(h=>h.name));let bad=[],n=0,kinds={},why=0;
  for(let i=0;i<40;i++){rivals.filter(v=>v.alive).slice(0,2).forEach(v=>v.cc=3);if(!T.praise)T.praise=CLANS[i%5];Q.length=0;
   const r=(minForceSo()||"").replace(/<[^>]+>/g,"");if(!r)continue;n++;const k=(r.match(/^(Sớ [^:]+):/)||[,r.slice(0,20)])[1];kinds[k]=(kinds[k]||0)+1;
   const sp=[...names].find(x=>r.includes(x));if(!sp)bad.push(r.slice(0,120));if(Object.values(MING).some(w=>r.includes(w)))why++}
  return{n,kinds,bad:bad.slice(0,3),why,on:minOn()}});
 ok(r1.on&&r1.n>=20,'memorials fired with the agents on',r1);ok(!r1.bad.length,'every memorial names a living official of S.trieu',r1.bad);ok(r1.why===r1.n,'every memorial carries the speaker\'s goal words',{why:r1.why,n:r1.n});
 const r2=await p.evaluate(()=>{const M=BAL.ag.min;const bad=[];for(const h of minAll()){const t=traitsOf(h);const e=(M.gT.find(x=>t.includes(x[0]))||[])[1]||(h.ns?M.nsDflt:M.dflt);if(minGoal(h)!==e)bad.push([h.name,t,minGoal(h),e])}
  const L=minCands();const sp=L.every(o=>minAll().includes(o.h));return{bad,sp,n:L.length,ns:!!minNs().ns}});
 ok(!r2.bad.length&&r2.sp&&r2.ns,'goal = nết table; every candidate speaker is a court official; one censor',r2);
 const r3=await p.evaluate(()=>{const ns=minNs();S.cc=3;delete ns.af.me;const a=ccRisk(S),wa=ccWord(S);ns.af.me=100;const c=ccRisk(S),wc=ccWord(S);delete ns.af.me;return{a,c,wa,wc,exp:Math.round(a*(1-BAL.ag.min.ns.afW))}});
 ok(r3.c<r3.a&&Math.abs(r3.c-r3.exp)<=1,'censor regard 100 lowers can-chính risk by afW',r3);
 const r4=await p.evaluate(()=>{const ns=minNs();S.bac=500;S.suc=100;S.cc=0;S.out=0;S.confined=0;Q.length=0;delete ns.af.me;const af0=0;let t=0,ok2=false;
  for(let i=0;i<12&&!ok2;i++){Q.length=0;S.suc=100;try{tdAct("gift",{tc:MINC})}catch(e){return{err:String(e)}}t++;ok2=(ns.af.me||0)!==af0}
  /* NPC side: a consort with can-chính record and silver courts him over a few months */
  const v=liveRivals(true).find(x=>!x.confined&&!x.out);v.cc=5;v.bac=999;let n=0;for(let i=0;i<24;i++){v.cc=5;v.bac=999;if(ns.af[key(v)]){n=i;break}tdMonth()}
  return{me:ns.af.me||0,tries:t,npc:ns.af[key(v)]||0,months:n}});
 ok(r4.me!==0,'she courts the censor by the gift button (his regard moved)',r4);ok(r4.npc!==0,'an NPC consort with can-chính record courts him too (same deed)',r4);
 const r5=await p.evaluate(()=>{const T=trS();const M=BAL.ag.min;const L=minCands().filter(o=>o.k==="imp");if(!L.length)return{skip:1};const o=L[0];o.h.clean={};
  const keep=o.t.dadT;o.t.dadT=false;o.h.clean[key(o.t)]=S.turn;const again=minCands().some(x=>x.k==="imp"&&x.h===o.h&&x.t===o.t);o.h.clean[key(o.t)]=S.turn-M.imp.keep;const later=minCands().some(x=>x.k==="imp"&&x.h===o.h&&x.t===o.t);o.t.dadT=keep;delete o.h.clean;return{again,later}});
 ok(r5.skip||(!r5.again&&r5.later),'a father his inquiry found clean is not impeached again within imp.keep',r5);
 const r6=await p.evaluate(()=>{BAL.ag.min.on=0;rivals.filter(v=>v.alive).slice(0,2).forEach(v=>v.cc=3);const r=(tdForceSo("cc")||"").replace(/<[^>]+>/g,"");const off=!minOn();BAL.ag.min.on=1;return{off,r:r.slice(0,90)}});
 ok(r6.off&&/ngự sử tâu/.test(r6.r),'off switch: old anonymous j55 path',r6);
 const r7=await p.evaluate(()=>{const T=trS();delete T.ns;for(const c in T.H)delete T.H[c].goal;const blob=JSON.parse(JSON.stringify(T));S.trieu=blob;const ns=minNs();
  window.__tdV="td";curTab="fac";try{render()}catch(e){return{err:String(e)}}const html=(typeof tdHTML==="function"?tdHTML():"");
  for(let i=0;i<36;i++){Q.length=0;monthTick()}return{ns:!!(ns&&ns.name),card:html.includes(MINC)&&html.includes(`data-tc="${MINC}"`),chip:html.includes("Chí: "),age:ns.age}});
 ok(r7.ns&&r7.card&&r7.chip,'old save gets its censor; Triều đình shows his card + goal chips',r7);
 ok(!errs.length,'0 page errors',errs.slice(0,5));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?`FAIL ${f}/${res.length}`:`ALL PASS ${res.length}`);process.exit(f||errs.length?1:0)})();
