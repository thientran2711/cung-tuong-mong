/* jload + sw.js end-to-end (review/loading).
   usage: node dev/test/load-e2e.js <baseURL of the built site root> <outdir> <phase>
   phase "cold"   : Fold 755x1000@2, fresh profile, throttled 4G (20 Mbit/s, 60 ms) → screenshot mid-progress, time to enter, background chip,
                    then unthrottled until every background set is cached; reload offline (context.setOffline) → title + a new life play.
                    The profile is kept in <outdir>/prof for phase "update".
   phase "ipad"   : iPad 1180x820@2 (and 1366x1024@2), fresh profile, throttled → screenshot mid-progress.
   phase "update" : same profile as "cold" after a rebuild with one changed image → counts which files download (expect exactly that one). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,PHASE]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const NET={offline:false,latency:60,downloadThroughput:20e6/8,uploadThroughput:5e6/8};
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function ctxFor(b,W,H,DPR,dir){const o={viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1100,serviceWorkers:'allow'};
 return dir?chromium.launchPersistentContext(dir,o):b.newContext(o)}
function watch(p,errs){p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())})}
const state=p=>p.evaluate(()=>JSON.parse(JSON.stringify(window.KLOAD||{})));
async function layout(p){return p.evaluate(()=>{const vw=innerWidth,vh=innerHeight,bad=[];const r=document.getElementById('kload');if(!r)return{none:true};
 r.querySelectorAll('.kptitle,.kpsub,.kpst,.kprog-n,.kprog-s,.kpnote,.kbtn').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;
  if(q.left<-1||q.right>vw+1||q.top<-1||q.bottom>vh+1)bad.push('out:'+e.className);if(e.scrollWidth>e.clientWidth+1)bad.push('clip:'+e.className)});
 return{overflowX:document.documentElement.scrollWidth>vw,bad,pct:/%/.test(r.innerText),text:r.innerText}})}
async function midShot(p,name){for(let i=0;i<600;i++){const s=await state(p);if(s.core&&s.core.total&&s.core.have/s.core.total>.3)break;await sleep(200)}
 await sleep(300);await p.screenshot({path:`${OUT}/${name}.png`});return layout(p)}
(async()=>{const b=await chromium.launch();const R={};
 if(PHASE==='cold'){const ctx=await ctxFor(b,755,1000,2,(process.env.PROF||OUT+'/prof'));const p=ctx.pages()[0]||await ctx.newPage();const errs=[];watch(p,errs);
  const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',NET);
  const t0=Date.now();await p.goto(BASE,{waitUntil:'domcontentloaded'});
  R.shellMs=Date.now()-t0;R.mid=await midShot(p,'1-loading-mid-fold-755x1000');
  await p.waitForFunction(()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:600000});
  R.enterMs=Date.now()-t0;const s=await state(p);R.coreMB=+(s.core.total/1e6).toFixed(1);R.figMB=+(s.fig.total/1e6).toFixed(1);
  await sleep(4000);await p.screenshot({path:`${OUT}/2-title-bg-chip-fold.png`});R.chip=await p.evaluate(()=>{const c=document.querySelector('#krail [data-rail="st-dl"]');return c?(c.title||'icon'):null});
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  const t1=Date.now();await p.waitForFunction(()=>KLOAD.phase==='all',null,{timeout:1800000});R.bgMsUnthrottled=Date.now()-t1;
  R.storage=await p.evaluate(async()=>{const e=await navigator.storage.estimate();const c=await caches.open('ctm-assets');return{usageMB:Math.round(e.usage/1e6),keys:(await c.keys()).length,cacheNames:await caches.keys(),ctl:!!navigator.serviceWorker.controller}});
  /* offline: reload, title, start a life, pictures come from the cache */
  await ctx.setOffline(true);const t2=Date.now();await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);R.offlineReloadMs=Date.now()-t2;
  R.offline1=await p.evaluate(()=>({loader:!!document.getElementById('kload'),title:!document.getElementById('title').hidden,phase:KLOAD.phase}));
  await p.screenshot({path:`${OUT}/3-offline-title-fold.png`});
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
  await sleep(4000);
  R.offline2=await p.evaluate(()=>{const im=[...document.images].filter(i=>i.src&&/img\//.test(i.src));return{imgs:im.length,broken:im.filter(i=>i.complete&&!i.naturalWidth).map(i=>i.src.split('/').pop()).slice(0,8),week:typeof S!=='undefined'&&S.week}});
  await p.screenshot({path:`${OUT}/4-offline-play-fold.png`});
  R.errs=errs;await ctx.setOffline(false);await ctx.close()}
 if(PHASE==='ipad'){for(const [W,H] of [[1180,820],[1366,1024]]){const ctx=await ctxFor(b,W,H,2);const p=await ctx.newPage();const errs=[];watch(p,errs);
   const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',NET);
   await p.goto(BASE,{waitUntil:'domcontentloaded'});R['mid'+W]=await midShot(p,`1-loading-mid-ipad-${W}x${H}`);R['errs'+W]=errs;await ctx.close()}
  for(const [W,H,D] of [[686,880,2.2],[412,1058,2],[390,844,3],[1024,768,2]]){const ctx=await ctxFor(b,W,H,D);const p=await ctx.newPage();const errs=[];watch(p,errs);
   const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',NET);
   await p.goto(BASE,{waitUntil:'domcontentloaded'});R['mid'+W]=await midShot(p,`5-loading-mid-${W}x${H}`);R['errs'+W]=errs;await ctx.close()}}
 if(PHASE==='chip'){for(const [W,H,D] of [[755,1000,2],[686,880,2.2],[1180,820,2]]){const ctx=await ctxFor(b,W,H,D);const p=await ctx.newPage();const errs=[];watch(p,errs);
   await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>window.KLOAD&&KLOAD.phase==='done'&&!document.getElementById('kload'),null,{timeout:300000});
   await sleep(4000);await p.screenshot({path:`${OUT}/2-title-chip-${W}x${H}.png`});if(process.env.PAUSE)await p.evaluate(()=>{KLOAD.paused=true});
   await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;setTimeout(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true},50);render()});
   await sleep(3500);await p.screenshot({path:`${OUT}/2-game-chip-${W}x${H}.png`,animations:'disabled',timeout:90000});
   R['chip'+W]=await p.evaluate(()=>{const c=document.querySelector('#krail [data-rail="st-dl"]');if(!c)return null;const r=c.getBoundingClientRect(),hit=[];
    document.querySelectorAll('button,.kbtn,[data-tab]').forEach(e=>{if(c.contains(e)||e.closest('#krail'))return;const q=e.getBoundingClientRect();if(q.width&&q.left<r.right&&q.right>r.left&&q.top<r.bottom&&q.bottom>r.top)hit.push(e.textContent.trim().slice(0,20))});return{hit,overflowX:document.documentElement.scrollWidth>innerWidth}});R['errs'+W]=errs;await ctx.close()}}
 if(PHASE==='update'){const ctx=await ctxFor(b,755,1000,2,(process.env.PROF||OUT+'/prof'));const p=ctx.pages()[0]||await ctx.newPage();const errs=[];watch(p,errs);
  const got=[];p.on('request',q=>{if(q.headers()['x-ctm-load'])got.push(q.url().replace(BASE,''))});
  const sw=[];ctx.on('request',q=>{if(/\/img\/|\/audio\//.test(q.url())&&!q.headers()['x-ctm-load'])sw.push(q.url().replace(BASE,''))});
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await sleep(6000);
  /* the new sw.js activates → controllerchange reload → jload runs again on the new build */
  await p.waitForFunction(()=>window.KLOAD&&KLOAD.phase==='all',null,{timeout:120000}).catch(()=>{});await sleep(2000);
  R.update={downloaded:[...new Set(got)],loaderShown:false,phase:(await state(p)).phase,
   caches:await p.evaluate(async()=>{const c=await caches.open('ctm-assets');const ks=(await c.keys()).map(q=>q.url);return{names:await caches.keys(),keys:ks.length}})};
  R.update.networkImgs=sw.filter(u=>!/\?h=/.test(u)).slice(0,10);R.errs=errs;await ctx.close()}
 await b.close();console.log(JSON.stringify(R,null,1))})();
