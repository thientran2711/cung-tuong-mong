/* sw.js new-build switch (owner 11/15: phone / home-screen app stuck on an old build).
   usage: node dev/test/sw-update.js <base URL of dev/test/sw-serve.js> <outdir> <scenario>
   The server must have overlays A (this build), B (a rebuild with different content, window.__CTM_MARK="B") and main (index.html + sw.js
   of origin/main, the old worker on the owner's phone).
   scenario "ab"   : Fold 755x1000@2. Open build A (worker installs, loading screen shot), write a sổ in slot 1, open a dialog;
                     deploy B; app goes to the background and back ONCE (visibilitychange) → no reopening while the dialog is open;
                     close it → kit card "Có bản mới" → page opens build B by itself; sổ unchanged and loads.
   scenario "main" : iPad 1180x820@2. Open the old main build (old worker 'ctm-<ts>' precaches), write a sổ; deploy A; open the app
                     again ONCE (new page) → old page reloads on the new worker → build A; sổ unchanged and loads; old cache migrated.
                     STALE=1: that one open first gets the OLD index.html (stale HTTP cache / CDN) → old page must still end on A. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,SC]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
const R={scenario:SC},errs=[];
function watch(p){p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())})}
async function ev(p,f,a){for(let i=0;i<60;i++){try{return await p.evaluate(f,a)}catch(e){if(!/context|navigat/i.test(e.message))throw e;await sleep(500)}}}
async function until(p,f,ms,a){const t=Date.now();while(Date.now()-t<ms){const v=await ev(p,f,a).catch(()=>null);if(v)return v;await sleep(400)}return null}
const swV=p=>ev(p,()=>new Promise(ok=>{const c=navigator.serviceWorker.controller;if(!c)return ok(null);const h=e=>{if(e.data&&e.data.ctm==='v'){navigator.serviceWorker.removeEventListener('message',h);ok(e.data.v)}};
 navigator.serviceWorker.addEventListener('message',h);c.postMessage({ctm:'v'});setTimeout(()=>ok('no-answer'),3000)}));
/* the sổ keys; 'at' (time written) is dropped: the game writes the same sổ again on every render and right before reopening */
const saves=p=>ev(p,()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);if(/^hclh-(slot|save-v2-)/.test(k)){let v=localStorage.getItem(k);try{const d=JSON.parse(v);if(d&&typeof d==='object'){delete d.at;v=JSON.stringify(d)}}catch(e){}o[k]=v}}return o});
function box(p,sel){return ev(p,s=>{const vw=innerWidth,vh=innerHeight,bad=[];const r=document.querySelector(s);if(!r)return{none:true};
 r.querySelectorAll('.kptitle,.kpsub,.kpst,.kprog-n,.kprog-s,.kpnote,.kbtn,.kpseal').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;
  if(q.left<-1||q.right>vw+1||q.top<-1||q.bottom>vh+1)bad.push('out:'+e.className);if(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+2)bad.push('clip:'+e.className)});
 return{overflowX:document.documentElement.scrollWidth>vw,bad,pct:/%/.test(r.innerText),text:r.innerText.replace(/\s+/g,' ')}},sel)}
async function newLife(p){await ev(p,()=>{SLOT=1;document.getElementById('title').hidden=true;start();quiet=false;try{NLP=null}catch(e){}Q.length=0;const m=document.getElementById("modal");if(m)m.hidden=true;render();save()});await sleep(800)}
async function loadsBack(p){/* the title screen's own "continue" button for slot 1 */
 return ev(p,()=>{const d=loadSlot(1);if(!d)return{ok:false};showTitle();const b=document.querySelector('[data-load="1"]');if(b)b.click();else{SLOT=1;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;render()}
  return{ok:!!S&&S.name===d.S.name,name:S&&S.name,week:S&&S.week,button:!!b}})}
const who=o=>{try{const d=JSON.parse(o['hclh-save-v2-1']).S;return [d.name,d.year,d.month,d.tuan,d.rank,d.bac].join('|')}catch(e){return null}};
async function setVer(v){await fetch(BASE+'__ver/'+v)}
(async()=>{const b=await chromium.launch();
 const [W,H]=SC==='ab'?[755,1000]:[1180,820];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'allow',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}});  /* keep the 600 MB figure set out of the test */
 let p=ctx.pages()[0]||await ctx.newPage();watch(p);
 if(SC==='ab'){await setVer('A');
  const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:60,downloadThroughput:20e6/8,uploadThroughput:5e6/8});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});
  await until(p,()=>window.KLOAD&&KLOAD.core.total&&KLOAD.core.have/KLOAD.core.total>.2,300000);await sleep(400);
  await p.screenshot({path:`${OUT}/ab-1-loading-fold-755x1000.png`});R.loading=await box(p,'#kload');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:0,downloadThroughput:-1,uploadThroughput:-1});
  await until(p,()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')&&navigator.serviceWorker.controller,600000);
  R.vA=await swV(p);R.markA=await ev(p,()=>window.__CTM_MARK||null);
  await newLife(p);R.savesA=await saves(p);
  await ev(p,()=>showSelf());await sleep(600);R.dialogOpen=await ev(p,()=>!document.getElementById('modal').hidden);
  await setVer('B');
  /* the app goes to the background and comes back once */
  const flip=s=>ev(p,s=>{Object.defineProperty(document,'visibilityState',{configurable:true,get:()=>s});Object.defineProperty(document,'hidden',{configurable:true,get:()=>s==='hidden'});document.dispatchEvent(new Event('visibilitychange'))},s);
  const t0=Date.now();await flip('hidden');await sleep(300);await flip('visible');
  R.pendingSeen=!!await until(p,()=>window.KSW&&KSW.pending,60000);R.pendingMs=Date.now()-t0;
  await sleep(6000);R.stillA_whileDialog=(await ev(p,()=>window.__CTM_MARK||'A'))==='A'&&await ev(p,()=>!document.getElementById('modal').hidden&&!document.getElementById('kupd'));
  await ev(p,()=>{const m=document.getElementById('modal');const x=m.querySelector('#mr button,#mr .kbtn,.kbtn');if(x)x.click();if(!m.hidden){Q.length=0;m.hidden=true}});
  const card=await until(p,()=>!!document.getElementById('kupd'),15000);R.card=!!card;
  if(card){R.savesAtCard=await saves(p);R.cardBox=await box(p,"#kupd");await p.screenshot({path:`${OUT}/ab-2-card-fold-755x1000.png`})}
  R.markB=await until(p,()=>window.__CTM_MARK==='B'&&document.readyState==='complete'?'B':null,30000);R.switchMs=Date.now()-t0;
  await until(p,()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload'),120000);
  R.vB=await swV(p);R.caches=await ev(p,()=>caches.keys());R.savesB=await saves(p);R.savesSame=JSON.stringify(R.savesAtCard)===JSON.stringify(R.savesB);
  R.sameLife=who(R.savesA)&&who(R.savesA)===who(R.savesB);R.life=who(R.savesB);
  for(const k of ['savesA','savesAtCard','savesB'])R[k]=Object.fromEntries(Object.entries(R[k]||{}).map(([a,v])=>[a,v.length]));
  R.load=await loadsBack(p);await sleep(1500);await p.screenshot({path:`${OUT}/ab-3-after-fold-755x1000.png`});
  R.overflowX=await ev(p,()=>document.documentElement.scrollWidth>innerWidth)}
 if(SC==='main'){await setVer('main');
  await p.goto(BASE,{waitUntil:'load'});
  R.oldCtl=!!await until(p,async()=>navigator.serviceWorker.controller&&(await caches.keys()).some(k=>/^ctm-\d+$/.test(k)),300000);
  await sleep(1500);R.oldCaches=await ev(p,()=>caches.keys());R.oldHasKSW=await ev(p,()=>!!window.KSW);
  await newLife(p);R.savesOld=await saves(p);
  /* deploy the new build, then the owner opens the app again (one new page; the old one is gone) */
  R.savesOld=await saves(p);await setVer('A');if(process.env.STALE)await fetch(BASE+'__stale/main');await p.close();const t0=Date.now();p=await ctx.newPage();watch(p);
  let navs=0;p.on('framenavigated',f=>{if(f===p.mainFrame())navs++});
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:180000});
  R.firstPageNew=await ev(p,()=>!!window.KSW);
  R.newBuild=!!await until(p,()=>window.KSW&&document.readyState==='complete',60000);R.switchMs=Date.now()-t0;R.navigations=navs;
  await until(p,()=>window.KLOAD&&KLOAD.phase==='core'||document.getElementById('kload'),8000);
  if(await ev(p,()=>!!document.getElementById('kload'))){await p.screenshot({path:`${OUT}/main-1-loading-ipad-1180x820.png`});R.loading=await box(p,'#kload')}
  await until(p,()=>window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload'),600000);
  R.vNew=await swV(p);R.caches=await ev(p,()=>caches.keys());R.core=await ev(p,()=>KLOAD.core);
  R.savesNew=await saves(p);R.savesSame=JSON.stringify(R.savesOld)===JSON.stringify(R.savesNew);R.sameLife=who(R.savesOld)&&who(R.savesOld)===who(R.savesNew);R.life=who(R.savesNew);
  for(const k of ['savesOld','savesNew'])R[k]=Object.fromEntries(Object.entries(R[k]||{}).map(([a,v])=>[a,v.length]));R.load=await loadsBack(p);
  await sleep(1200);await ev(p,()=>KSW.card());await sleep(300);R.cardBox=await box(p,'#kupd');await p.screenshot({path:`${OUT}/main-2-card-ipad-1180x820.png`});
  await sleep(4500);R.afterCardReload=await ev(p,()=>!!window.KSW&&!document.getElementById('kupd'));
  await p.screenshot({path:`${OUT}/main-3-after-ipad-1180x820.png`});R.overflowX=await ev(p,()=>document.documentElement.scrollWidth>innerWidth)}
 R.errs=errs;await ctx.close();await b.close();console.log(JSON.stringify(R,null,1))})().catch(e=>{console.error(e);process.exit(1)});
