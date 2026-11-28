/* OB-NGOAICUNG-3b r5 (RV r4 PERF FAIL): where does a slow buổi come from on this branch? Per origin (home roads tt td cnv nc bd + palace origins),
   a new life, then N buổi each timed like dev/tools/quickcheck.js BUOI (close cards, tap «Sang buổi», wait for the turn) under CPU slowdown,
   and the time spent INSIDE each function this branch wraps (placeSift / placeEvOk / placeNoteSweep / placeNoteOk / placeLogOk / whyText / resultShow /
   meRankN / road8 / placeW / pMe / kszRankName / rkName / rcvAsk). usage: node perf-probe.js <url> [--origins=tt,cnv,..] [--n=4] [--cpu=4] [--label=x] */
const {chromium}=require('playwright');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv.slice(2);const URL=A[0];const opt=(k,d)=>{const a=A.find(x=>x.startsWith('--'+k+'='));return a?a.split('=')[1]:d};
const ORGS=opt('origins','tt,td,cnv,nc,bd,cc,ttg').split(',');const N=+opt('n',4);const CPU=+opt('cpu',4);const LBL=opt('label','');
const FN=['placeSift','placeEvOk','placeNoteSweep','placeNoteOk','placeLogOk','whyText','resultShow','meRankN','road8','placeW','pMe','kszRankName','rkName','rcvAsk','render','showModal','nextBuoi'];
(async()=>{const b=await chromium.launch();const out=[];
 for(const ORG of ORGS){const c=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,100)));
  await p.goto(URL);await sleep(2500);await p.evaluate(()=>localStorage.clear());await p.reload();await sleep(3500);
  await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()});
  const ok=await p.evaluate(o=>{try{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<200;i++){if(i)try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin&&S.origin.k===o)break}
   if(!S.origin||S.origin.k!==o){const O=ORIGINS.find(x=>x.k===o);if(!O)return 'NO '+o;S.origin=O;nlCard()}return S.origin.k}catch(e){return 'ERR '+e.message}},ORG);
  await sleep(800);await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');if(b)b.click()});await sleep(800);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');if(b)b.click()});await sleep(1500);
  /* wrap: inclusive time per function (outermost call only per name) */
  await p.evaluate(F=>{window.__pt={};window.__pc={};const deep={};for(const n of F){const f=window[n];if(typeof f!=='function')continue;const w=function(){if(deep[n])return f.apply(this,arguments);deep[n]=1;const t=performance.now();try{return f.apply(this,arguments)}finally{deep[n]=0;window.__pt[n]=(window.__pt[n]||0)+performance.now()-t;window.__pc[n]=(window.__pc[n]||0)+1}};
   try{window[n]=w;eval(n+'=w')}catch(e){}}},FN);
  const cdp=await c.newCDPSession(p);await cdp.send('Emulation.setCPUThrottlingRate',{rate:CPU});
  const rows=[];
  for(let k=0;k<N;k++){const r=await p.evaluate(async()=>{const sl=t=>new Promise(r=>setTimeout(r,t));let slept=0;const S2=t=>{slept+=t;return sl(t)};
    const pend=()=>{const ov=document.getElementById('ov');return (ov&&!ov.hidden&&!S.mg)||!!document.querySelector('[id^="kroul"],.kroul-ov,#kpodov,.kmov:not(.km-out)')||(typeof KMQ!=='undefined'&&KMQ.length)||Q.length};
    for(let i=0;i<30&&pend()&&!S.dead;i++){const ov=document.getElementById('ov');if(ov&&!ov.hidden&&!S.mg)ov.hidden=true;document.querySelectorAll('[id^="kroul"],.kroul-ov,#kpodov').forEach(e=>e.remove());try{kmPump()}catch(e){}
     const kb=[...document.querySelectorAll('.kmov:not(.km-out) button,#kmrew button,#kpodov button')].find(b=>b.getClientRects().length&&!b.disabled)||document.querySelector('.kmov:not(.km-out)');if(kb)kb.click();
     for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await sl(40)}await sl(250)}
    for(const n in window.__pt){window.__pt[n]=0;window.__pc[n]=0}
    const home=typeof isKc==='function'&&isKc();const k0=JSON.stringify([S.turn,S.buoi,S.month,S.year]);const t0=performance.now();let cards=0;
    for(let i=0;i<40;i++){for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];cards++;try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await S2(40)}
     const n=document.getElementById('next');if(n&&!n.disabled){n.click();await S2(300);break}await S2(200)}
    for(let i=0;i<60&&JSON.stringify([S.turn,S.buoi,S.month,S.year])===k0;i++)await S2(100);
    for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];cards++;try{if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}catch(e){Q.shift()}await S2(40)}
    const ms=Math.round(performance.now()-t0-slept);const top=Object.entries(window.__pt).filter(([n,v])=>v>=5).sort((a,b)=>b[1]-a[1]).map(([n,v])=>n+' '+Math.round(v)+'/'+window.__pc[n]);
    return {home,ms,cards,top}});rows.push(r)}
  out.push({ORG,ok,errs:errs.length,rows});console.log(LBL,ORG,ok,'errs',errs.length);for(const r of rows)console.log('   ',r.home?'HOME':'pal ',String(r.ms).padStart(5),'ms cards',r.cards,'|',r.top.slice(0,8).join(' · '));await c.close()}
 await b.close()})();
