/* review/cdn-images-merged: a few game weeks on the CDN build, every picture request recorded (dev/review/cdn-images.md).
   usage: node dev/test/cdn-play.js <server root URL (dev/test/sw-serve.js with overlays new= old=)> <W>x<H>@dpr <outdir> [weeks=3] [offline]
   1. old build (/__ver/old = origin/main index.html, pictures from git) makes a save in slot 2 in its own context
   2. new build (/__ver/new), fresh profile: loading screen §35 (shot mid-way, no "%", stays in the viewport), then title
   3. the old save is copied in and loads; every tab
   4. a new life plays <weeks> weeks (turn button + a choice in every dialog, every tab and the map each buổi)
   5. runtime name families: FPOOL faces, map/scene for every season x buổi, kid faces … (keys written to <outdir>/keys-<tag>.txt)
   6. [offline] once the core set is cached and the service worker controls the page: offline reload, the save loads, pictures show
   Every response under /img/: status >= 400 or requestfailed is an error. Prints one JSON line. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,BASE,SZ,OUT,WEEKS,OFF]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ.replace('@','_');
const CDN='ctm-img.victoria-tntt.workers.dev';const sleep=t=>new Promise(r=>setTimeout(r,t));fs.mkdirSync(OUT,{recursive:true});
const opts={viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'};
(async()=>{const b=await chromium.launch();const R={size:SZ};
 /* 1. old save */
 await fetch(BASE+'__ver/old');
 {const c=await b.newContext(Object.assign({},opts,{serviceWorkers:'block'}));const p=await c.newPage();p.setDefaultTimeout(120000);
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await sleep(3000);
  R.oldSave=await p.evaluate(()=>{try{SLOT=2;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){start();if(S.origin.k!=='cnv')break}Q.length=0;
   for(let i=0;i<5;i++){try{Q.length=0;endTurn()}catch(e){}Q.length=0}
   localStorage.setItem(SK(2),JSON.stringify(ser()));localStorage.setItem('hclh-slot','2');
   const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return{name:S.name,turn:S.turn,ls:o}}catch(e){return{err:String(e)}}});
  await c.close()}
 const LS=R.oldSave.ls||{};R.oldSave={name:R.oldSave.name,turn:R.oldSave.turn,err:R.oldSave.err,keys:Object.keys(LS).length};
 await fetch(BASE+'__ver/new');
 /* 2. new build, fresh */
 const ctx=await b.newContext(Object.assign({},opts,{serviceWorkers:'allow'}));
 await ctx.addInitScript(ls=>{try{if(!localStorage.getItem('__seeded')){for(const k in ls)localStorage.setItem(k,ls[k]);localStorage.setItem('__seeded','1')}}catch(e){}},LS);
 const p=await ctx.newPage();p.setDefaultTimeout(120000);
 const errs=[],failed=[],bad=[],seen=new Map(),req={n:0,cdn:0,same:0};
 p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 ctx.on('requestfailed',q=>{const u=q.url();if(/\/img\//.test(u))failed.push(u.replace(/^https?:\/\/[^/]+\//,'')+' '+(q.failure()||{}).errorText)});
 ctx.on('response',r=>{const u=r.url();if(!/\/img\//.test(u))return;req.n++;if(u.includes(CDN))req.cdn++;else req.same++;
  const k=u.replace(/^https?:\/\/[^/]+\//,'').replace(/\?.*$/,'');seen.set(k,Math.max(seen.get(k)||0,r.status()));if(r.status()>=400)bad.push(r.status()+' '+k)});
 const t0=Date.now();await p.goto(BASE,{waitUntil:'domcontentloaded'});
 /* loading screen §35 */
 R.loading=null;for(let i=0;i<300;i++){const s=await p.evaluate(()=>{const k=window.KLOAD||{};const c=k.core||{};return{ph:k.phase,have:c.have,total:c.total,box:!!document.getElementById('kload')}}).catch(()=>({}));
  if(s.box&&s.total&&s.have/s.total>.15){await sleep(200);await p.screenshot({path:`${OUT}/load-${tag}.jpg`,type:'jpeg',quality:70});
   R.loading=await p.evaluate(()=>{const vw=innerWidth,vh=innerHeight,bad=[];const r=document.getElementById('kload');if(!r)return{gone:true};
    r.querySelectorAll('.kptitle,.kpsub,.kpst,.kprog-n,.kprog-s,.kpnote,.kbtn').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;
     if(q.left<-1||q.right>vw+1||q.top<-1||q.bottom>vh+1)bad.push('out:'+e.className);if(e.scrollWidth>e.clientWidth+1)bad.push('clip:'+e.className)});
    return{bad,pct:/%/.test(r.innerText),thoi:/\bThôi\b/.test(r.innerText),han:/[一-鿿]/.test(r.innerText),text:r.innerText.replace(/\s+/g,' ').slice(0,160),overflowX:document.documentElement.scrollWidth>vw}});break}
  if(s.ph&&['done','skipped','all'].includes(s.ph)&&!s.box)break;await sleep(200)}
 await p.waitForFunction(()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:900000}).catch(e=>errs.push('kload wait '+e.message));
 R.enterMs=Date.now()-t0;R.kload=await p.evaluate(()=>{const k=window.KLOAD||{};return{phase:k.phase,coreMB:k.core&&+(k.core.total/1e6).toFixed(1),figMB:k.fig&&+(k.fig.total/1e6).toFixed(1)}});
 await sleep(2500);await p.screenshot({path:`${OUT}/title-${tag}.jpg`,type:'jpeg',quality:70});
 const scan=where=>p.evaluate(where=>{const vw=innerWidth;const L=[...document.images].filter(i=>i.getAttribute('src')&&!i.getAttribute('src').startsWith('data:')&&i.complete&&i.naturalWidth===0&&i.style.visibility!=='hidden').map(i=>i.getAttribute('src').replace(/^https?:\/\/[^/]+\//,''));
  return{where,broken:L.slice(0,6),nBroken:L.length,overflowX:document.documentElement.scrollWidth>vw+1}},where);
 R.scans=[await scan('title')];
 /* 3. old save */
 R.load=await p.evaluate(()=>{const bt=document.querySelector('[data-load="2"]');if(!bt)return 'no slot button';bt.click();return S&&S.name?'loaded '+S.name+' turn '+S.turn:'fail'});
 await sleep(2500);
 const closeAll=()=>p.evaluate(async()=>{for(let i=0;i<8;i++){const m=[...document.querySelectorAll('#ov,#modal')].find(x=>!x.hidden);if(!m)break;const bt=[...m.querySelectorAll('button')].filter(x=>x.offsetParent&&!x.disabled);if(!bt.length)break;bt[0].click();await new Promise(r=>setTimeout(r,200))}});
 await closeAll();
 const tabs=async(lbl,shot)=>{const T=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent).map(b=>b.dataset.tab));
  for(const t of T){await p.evaluate(t=>{const x=document.querySelector(`#tabs [data-tab="${t}"]`);if(x)x.click()},t);await sleep(700);
   R.scans.push(await scan(lbl+' '+t));if(shot)await p.screenshot({path:`${OUT}/${lbl}-${tag}-${t}.jpg`,type:'jpeg',quality:65})}};
 await tabs('save',true);
 /* 4. new life, <weeks> weeks */
 const weeks=+(WEEKS||3);
 /* one tuần = one endTurn (Qua đêm after the last buổi); each buổi: every tab, a walk to a random place, then "Qua buổi" */
 R.play=await p.evaluate(async weeks=>{const out={buoi:0,tuan:0,dialogs:0,walks:0,err:null,places:new Set()};const sl=t=>new Promise(r=>setTimeout(r,t));
  try{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){start();if(S.origin.k!=='cnv')break}Q.length=0;render();
   const e0=endTurn;endTurn=function(){out.tuan++;return e0.apply(this,arguments)};
   const drain=async()=>{for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length){chooseM(Math.floor(Math.random()*m.opts.length))}else closeModal()}catch(e){Q.shift();try{showModal()}catch(e){}}out.dialogs++;await sl(120)}
    for(const x of [...document.querySelectorAll('#ov,#modal')].filter(x=>!x.hidden)){const bt=[...x.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(bt){bt.click();await sl(120)}}};
   for(let i=0;i<weeks*30&&out.tuan<weeks&&!S.dead;i++){await drain();if(Q.length){Q.length=0;render()}
    for(const t of [...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent)){t.click();await sl(120)}
    try{const L=places().filter(p=>p.k&&p.k!==S.place);const pl=L[Math.floor(Math.random()*L.length)];if(pl){goTo(pl.k);out.walks++;out.places.add(pl.k);await sl(400);await drain()}}catch(e){}
    try{goTo('home')}catch(e){}await drain();
    const n=document.getElementById('next');if(n&&!n.disabled){n.click();out.buoi++}else{try{Q.length=0;endTurn()}catch(e){}}await sl(400)}
   await drain();out.turn=S.turn;out.alive=!S.dead;out.places=[...out.places]}catch(e){out.err=String(e);out.places=[...out.places]}return out},weeks);
 await sleep(3000);R.scans.push(await scan('play'));await p.screenshot({path:`${OUT}/play-${tag}.jpg`,type:'jpeg',quality:70});
 /* 5. runtime families: ask the page for every name it can build */
 const keys=await p.evaluate(async()=>{const K=new Set();const add=u=>{if(u&&typeof u==='string'){const k=u.replace(/^https?:\/\/[^/]+\//,'').replace(/\?.*$/,'');if(k.startsWith('img/'))K.add(k)}};
  try{Object.entries(FPOOL).filter(([k])=>k!=='man').forEach(([k,v])=>v.filter(f=>!f.startsWith('@')).forEach(f=>add('img/'+f+'.webp')))}catch(e){} /* FPOOL.man (j22) is never drawn: bandKeys('man') uses off and manold; '@W<n>' are weights */
  const m0=S.month,b0=S.buoi;try{for(let mo=1;mo<=12;mo++)for(let bu=0;bu<BUK.length;bu++){S.month=mo;S.buoi=bu;add(mapImg())}}catch(e){}S.month=m0;S.buoi=b0;
  try{for(const sex of['m','f'])for(const age of[1,4,9,14])for(let fv=1;fv<=4;fv++)add(kidFace0({sex,age,fv}).src)}catch(e){}
  try{if(typeof ITIMG==='object')Object.values(ITIMG).forEach(v=>add('img/item-'+v+'.webp'))}catch(e){}
  try{if(typeof itemArt==='function'&&typeof ITIMG==='object')Object.keys(ITIMG).forEach(k=>{const a=itemArt(k);if(a){add(a.src);add(a.src512)}})}catch(e){}
  try{KIT_ORIGINS.forEach(k=>{add(kitOriginArt(k));add(kitOriginWide(k))})}catch(e){}
  for(const u of performance.getEntriesByType('resource').map(e=>e.name))add(u);
  return[...K]});
 const extra=[...new Set([...keys,...seen.keys()].filter(k=>k.startsWith('img/')))];fs.writeFileSync(`${OUT}/keys-${tag}.txt`,extra.join('\n'));R.keys=extra.length;
 /* 6. offline */
 if(OFF){R.sw=await p.evaluate(async()=>{if(!navigator.serviceWorker)return 'no sw';const r=await Promise.race([navigator.serviceWorker.ready.then(()=>'ready'),new Promise(r=>setTimeout(()=>r('timeout'),240000))]);
   const ks=await caches.keys();let n=0,cdn=0;for(const k of ks){const c=await caches.open(k);const q=await c.keys();n+=q.length;cdn+=q.filter(x=>x.url.includes('ctm-img.')).length}return{r,ctl:!!navigator.serviceWorker.controller,caches:ks,n,cdn}});
  await ctx.setOffline(true);const q2=await ctx.newPage();const e2=[];q2.on('pageerror',e=>e2.push(e.message));
  await q2.goto(BASE,{waitUntil:'load'}).catch(e=>e2.push('goto '+e.message));await sleep(4000);
  await q2.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:30000}).catch(()=>e2.push('kload still shown offline'));
  R.offline=await q2.evaluate(async()=>{const bt=document.querySelector('[data-load="2"]');if(bt)bt.click();await new Promise(r=>setTimeout(r,3000));
   try{const n=document.getElementById('next');for(let i=0;i<6;i++){const ov=[...document.querySelectorAll('#ov,#modal')].find(x=>!x.hidden);if(ov){const bt=[...ov.querySelectorAll('button')].find(x=>x.offsetParent&&!x.disabled);if(bt)bt.click()}else if(n&&!n.disabled)n.click();await new Promise(r=>setTimeout(r,400))}}catch(e){}
   const I=[...document.images].filter(i=>i.offsetParent&&i.getAttribute('src')&&!i.getAttribute('src').startsWith('data:'));
   return{loaded:!!(window.S&&S.name),turn:S&&S.turn,shown:I.filter(i=>i.complete&&i.naturalWidth>0).length,notShown:I.filter(i=>!(i.complete&&i.naturalWidth>0)).map(i=>i.getAttribute('src').replace(/^https?:\/\/[^/]+\//,'')).slice(0,6)}}).catch(e=>({err:String(e)}));
  R.offline.errors=e2.slice(0,6);await q2.screenshot({path:`${OUT}/offline-${tag}.jpg`,type:'jpeg',quality:70});await ctx.setOffline(false)}
 R.KCDN=await p.evaluate(()=>window.KCDN||null);
 const scansBad=R.scans.filter(s=>s.nBroken||s.overflowX);R.nScans=R.scans.length;R.scans=scansBad;
 Object.assign(R,{req,distinct:seen.size,failed:failed.slice(0,10),nFailed:failed.length,http4xx:[...new Set(bad)].slice(0,20),nHttp4xx:bad.length,errors:errs.slice(0,10)});
 console.log(JSON.stringify(R));await b.close()})();
