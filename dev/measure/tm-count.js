/* AG-ALL-2f3 BALANCE WATCH (report §21.9): how many REAL Tai mắt the consorts hold as days pass (the number IS the list since 2f r2 / 2f2),
   run on the AG day loop (placeWhere / agFlush / nextBuoi, as dev/test/ag-sell.test.js) for DAYS days × SEEDS new games; her own count only grows
   by her choices (no bot plays her deck here), so it is staged at the end from the recruit odds she would face (tmOdds over tmCands).
   usage: node dev/measure/tm-count.js [dev/index.html] [days=30] [seeds=3] */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const DAYS=+process.argv[3]||30,NS=+process.argv[4]||3;
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const all=[];for(let g=0;g<NS;g++){const r=await p.evaluate(D=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let k=0;do{start();k++}while(isSrv()&&k<30);window.__nlInner=0;window.__bot=1;window.__agAll=1;quiet=true;Q.length=0;
  const smp=[];const t0={try:KN.stat.tmTry||0,ok:KN.stat.tmOk||0};for(let d=0;d<D;d++){for(let i=0;i<4;i++){Q.length=0;S.mg=0;try{placeWhere();agFlush()}catch(e){}Q.length=0;try{nextBuoi()}catch(e){}Q.length=0}
   if((d+1)%10===0)smp.push({d:d+1,npc:liveRivals(true).filter(v=>v.alive&&!v.out).map(v=>v.mat|0)})}
  const O=tmCands(S).map(s=>tmOdds(S,s)).sort((a,b)=>b-a);return{smp,tries:(KN.stat.tmTry||0)-t0.try,oks:(KN.stat.tmOk||0)-t0.ok,herTop:O.slice(0,5),herAvg:Math.round(O.reduce((a,b)=>a+b,0)/Math.max(1,O.length))}},DAYS);all.push(r)}
 for(const d of [10,20,30].filter(x=>x<=DAYS)){const L=all.flatMap(r=>(r.smp.find(s=>s.d===d)||{npc:[]}).npc);const m=L.reduce((a,b)=>a+b,0)/Math.max(1,L.length);console.log(`day ${d}: NPC real Tai mắt mean ${m.toFixed(2)} max ${Math.max(0,...L)} (n=${L.length})`)}
 console.log('recruit tries / accepted:',all.map(r=>`${r.tries}/${r.oks}`).join(' '),'· her odds vs the 5 most willing:',JSON.stringify(all.map(r=>r.herTop)),'avg over all',all.map(r=>r.herAvg).join(','));console.log('errs',JSON.stringify(errs.slice(0,3)));await b.close()})();
