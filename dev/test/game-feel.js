/* review/game-feel (jfx): touch kit, kitFx table, Pixi overlay, numbers fly, switches, offline, old save, open time.
   usage: node dev/test/sw-serve.js 8955 <repo root> main=<dir holding main's index.html>   (in another shell)
          node dev/test/game-feel.js http://localhost:8955/ <outdir> [shots]
   Slow machine: CPU throttled 4x (CDP Emulation.setCPUThrottlingRate) on every viewport. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const VP=[[755,1000,2,'fold'],[1180,820,2,'ipad'],[412,1058,2,'phone']];
const PH=(process.env.PH||'1234').split('');const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);
const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<200;i++){start();if(!isSrv()&&!(window.isKc&&isKc()))break}Q.length=0;document.getElementById('modal').hidden=true;
 ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
function watch(p,errs,reqs){p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
 p.on('request',q=>{if(/pixi/.test(q.url()))reqs.push({t:Date.now(),u:q.url().split('/').slice(-2).join('/')})})}
async function ctx(b,W,H,D,sw){const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100,serviceWorkers:sw?'allow':'block'});
 await c.addInitScript(()=>{window.__vib=[];try{Object.defineProperty(navigator,'vibrate',{value:p=>{window.__vib.push(p);return true},configurable:true})}catch(e){}});return c}
async function slow(c,p){const s=await c.newCDPSession(p);await s.send('Emulation.setCPUThrottlingRate',{rate:4});return s}
const clearOv=p=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','dawn','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove())});
const shot=async(p,n)=>{if(!SHOTS)return;for(let t=0;t<2;t++){try{await p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:62,timeout:150000});return}catch(e){L('shot retry',n)}}};
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader']});const R={};
 /* ---- 1. open time: main vs this build (4x CPU), and Pixi never fetched before the game starts ---- */
 if(PH.includes('1'))for(const ver of ['main','new']){await fetch(BASE+'__ver/'+(ver==='main'?'main':'none'));const t=[];
  for(let i=0;i<2;i++){const c=await ctx(b,755,1000,2);const p=await c.newPage();const errs=[],reqs=[];watch(p,errs,reqs);await slow(c,p);const t0=Date.now();
   await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:120000});const t1=Date.now()-t0;
   L('open',ver,t1);await sleep(3000);t.push({ready:t1,pixiOnTitle:reqs.length,errs:errs.length});await c.close()}
  R['open_'+ver]=t}
 await fetch(BASE+'__ver/none');
 /* ---- 2. per viewport ---- */
 for(const [W,H,D,tag] of (PH.includes('2')?VP.filter(v=>!process.env.VPS||process.env.VPS.includes(v[3])):[])){L('vp',tag);const c=await ctx(b,W,H,D);const p=await c.newPage();const errs=[],reqs=[];watch(p,errs,reqs);await slow(c,p);const r={};
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);r.pixiBeforeGame=reqs.length;
  r.name=await p.evaluate(NEWLIFE);await sleep(400);await clearOv(p);await p.evaluate(()=>render());
  await p.waitForFunction(()=>window.PIXI&&window.KFX,null,{timeout:60000}).catch(()=>{});r.pixiAfterGame=reqs.map(x=>x.u);
  /* tabs underline */
  await p.evaluate(()=>{const t=document.querySelector('#tabs [data-tab="rel"]')||document.querySelectorAll('#tabs [data-tab]')[3];t.click()});await sleep(900);
  r.tabline=await p.evaluate(()=>{const l=document.querySelector('#tabs>.kftl'),a=document.querySelector('#tabs [aria-selected="true"]');if(!l||!a)return{none:true};const lr=l.getBoundingClientRect(),ar=a.getBoundingClientRect();return{dx:Math.round(lr.left-ar.left),dw:Math.round(lr.width-ar.width),bottomGap:Math.round(ar.bottom-lr.bottom)}});
  await p.evaluate(()=>{document.querySelector('#tabs [data-tab="act"]').click()});await sleep(600);await clearOv(p);
  /* press: scale .96 while held + ripple */
  r.press=await p.evaluate(async()=>{const b=[...document.querySelectorAll('button.card.ka:not(:disabled):not(.kdis),#tabs [data-tab],button.kbtn:not(:disabled)')].find(x=>x.getBoundingClientRect().height>20&&x.getBoundingClientRect().top>0&&x.getBoundingClientRect().bottom<innerHeight);if(!b)return{none:true};
   const r=b.getBoundingClientRect();b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:r.left+20,clientY:r.top+15,pointerType:'touch',isPrimary:true}));await new Promise(o=>setTimeout(o,160));
   const sc=getComputedStyle(b).scale,rip=!!document.querySelector('.kfrip');document.dispatchEvent(new PointerEvent('pointerup',{bubbles:true}));return{scale:sc,ripple:rip}});
  /* locked act card: shake + buzz + reason */
  r.lock=await p.evaluate(async()=>{const b=[...document.querySelectorAll('button.ka:disabled,button.ka.kdis')].find(x=>{const q=x.getBoundingClientRect();return q.height>20&&q.top>0&&q.bottom<innerHeight});if(!b)return{none:true};const v0=__vib.length;
   const r=b.getBoundingClientRect();b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:r.left+20,clientY:r.top+15,pointerType:'touch'}));await new Promise(o=>setTimeout(o,120));
   const n=document.querySelector('.kflockwhy');return{why:n&&n.textContent,buzz:__vib.slice(v0)}});
  if(tag==='fold'){await sleep(200);await shot(p,`1-locked-reason-${tag}`)}
  await clearOv(p);
  /* the FX table: every kind once; buzz recorded; fps sampled during the busiest ones */
  r.fx={};for(const k of ['promote','coin','poison','expose','birth','night','lantern','win','fail','death','demote','hit']){
   const o=await p.evaluate(async k=>{const v0=__vib.length;let fr=0,t0=performance.now();let run=true;const f=()=>{fr++;if(run)requestAnimationFrame(f)};requestAnimationFrame(f);
    kitFx(k);await new Promise(o=>setTimeout(o,900));const parts=KFX.parts.length,fl=document.querySelectorAll('.kfx-fl').length;await new Promise(o=>setTimeout(o,500));run=false;
    return{buzz:JSON.stringify(__vib.slice(v0)),parts,flash:fl,fps:Math.round(fr/((performance.now()-t0)/1000)),q:+KFX.q.toFixed(2)}},k);r.fx[k]=o;
   if(SHOTS&&['promote','coin','poison','lantern'].includes(k)&&(tag==='fold'||(tag==='ipad'&&k==='lantern'))){await shot(p,`2-${k}-${tag}`)}
   L(tag,k,JSON.stringify(o));await sleep(k==='lantern'?3500:1700)}
  /* result card: THÀNH + numbers fly into the top-bar cells */
  r.result=await p.evaluate(async()=>{const before={};for(const [k] of RKEYS)before[k]=S[k]||0;S.sung+=6;S.danh+=3;S.duc-=2;S.bac+=12;resultShow('Dâng trà',before,true);
   await new Promise(o=>setTimeout(o,700));const n=[...document.querySelectorAll('.kfnum')].map(x=>x.textContent);await new Promise(o=>setTimeout(o,1700));
   const hit=['hud-sung','hud-danh','hud-duc','hud-bac'].map(i=>document.getElementById(i)).filter(Boolean).length;return{nums:n,cells:hit,log:KFX.log.slice(-3)}});
  if(tag==='fold'){}
  /* overflow + errors */
  r.overflowX=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  /* switches: Cảnh động off → no particles / flash / shake; Rung off → no buzz */
  r.off=await p.evaluate(async()=>{OPT.fxon=false;KFX.parts.forEach(s=>s.destroy());KFX.parts.length=0;const v0=__vib.length;kitFx('poison');await new Promise(o=>setTimeout(o,500));const a={parts:KFX.parts.length,flash:document.querySelectorAll('.kfx-fl').length,buzz:__vib.length-v0};
   OPT.vib=false;const v1=__vib.length;kitFx('promote');a.buzzVibOff=__vib.length-v1;OPT.fxon=true;OPT.vib=true;return a});
  r.errs=errs;R[tag]=r;await c.close()}
 /* ---- 3. screenshots of the number flight + home petals (fold) ---- */
 if(SHOTS&&PH.includes('3')){const c=await ctx(b,755,1000,2);const p=await c.newPage();await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);await p.evaluate(NEWLIFE);await clearOv(p);
  await p.evaluate(()=>{S.place='home';S.month=8;render()});await p.waitForFunction(()=>window.KFX&&KFX.amb>=3,null,{timeout:30000}).catch(()=>{});await sleep(4000);await clearOv(p);await shot(p,'3-home-autumn-leaves-fold');
  await p.evaluate(()=>{const before={};for(const [k] of RKEYS)before[k]=S[k]||0;S.sung+=6;S.danh+=3;S.duc-=2;resultShow('Dâng trà',before,true)});await sleep(1150);await shot(p,'4-result-numbers-fly-fold');await c.close()}
 /* ---- 4. old save (made by main) loads in this build; offline after the first visit ---- */
 if(PH.includes('4')){L('old/offline');const c=await ctx(b,755,1000,2,true);const p=await c.newPage();const errs=[],reqs=[];watch(p,errs,reqs);
  await fetch(BASE+'__ver/main');await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(2000);
  R.oldSave=await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;quiet=false;S.inv.push({k:'nhansam'});localStorage.setItem(SK(3),JSON.stringify(ser()));return{name:S.name,key:SK(3)}});
  await fetch(BASE+'__ver/none');await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.KFX);await sleep(2000);
  R.oldLoad=await p.evaluate(()=>{try{const d=loadSlot(3);if(!d)return{ok:'NO SAVE'};SLOT=3;document.getElementById('title').hidden=true;deser(d);try{deal()}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;render();return{ok:true,name:S.name,inv:S.inv.length}}catch(e){return{ok:'ERR '+e.message}}});
  await p.waitForFunction(()=>window.PIXI,null,{timeout:60000}).catch(()=>{});await sleep(3000);
  R.swCached=await p.evaluate(async()=>{const c=await caches.open('ctm-assets');return (await c.keys()).filter(k=>/pixi/.test(k.url)).map(k=>k.url.split('/').pop())});
  await c.setOffline(true);await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await sleep(2500);
  await p.evaluate(NEWLIFE);await clearOv(p);await p.waitForFunction(()=>window.PIXI&&KFX,null,{timeout:30000}).catch(()=>{});
  R.offline=await p.evaluate(async()=>{kitFx('coin');await new Promise(o=>setTimeout(o,1200));return{pixi:!!window.PIXI,overlay:KFX.loaded,parts:KFX.parts.length,stage:typeof PX!=='undefined'&&!!PX.app}});
  R.offlineErrs=errs;await c.setOffline(false);await c.close()}
 /* ---- 5. frame cost: idle game vs. busy FX (main build has no overlay), with and without 4x CPU; jfx tick JS time ---- */
 if(PH.includes('5'))for(const rate of (process.env.RATES||'1,4').split(',').map(Number))for(const ver of ['main','new']){await fetch(BASE+'__ver/'+(ver==='main'?'main':'none'));const c=await ctx(b,755,1000,2);const p=await c.newPage();
  const s=await c.newCDPSession(p);await s.send('Emulation.setCPUThrottlingRate',{rate});await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await sleep(2500);
  await p.evaluate(NEWLIFE);await clearOv(p);await p.waitForFunction(()=>window.PIXI,null,{timeout:60000}).catch(()=>{});await sleep(4000);
  const m=await p.evaluate(async()=>{const fps=async ms=>{let n=0,run=true;const f=()=>{n++;if(run)requestAnimationFrame(f)};requestAnimationFrame(f);await new Promise(o=>setTimeout(o,ms));run=false;return +(n/(ms/1000)).toFixed(1)};
   const o={idle:await fps(2000)};if(window.KFX){o.amb=KFX.amb;KFX.ambOK=false;kfAmbient();await new Promise(o=>setTimeout(o,9000));o.idleNoAmb=await fps(2000);o.canvas=KFX.app?KFX.app.canvas.style.display:'none'}if(window.kitFx){await kitFx('coin');await new Promise(o=>setTimeout(o,1500));let t=0,k=0;const T=KFX.app.ticker;const f0=T._head;
    const tick=kfTick;KFX.app.ticker.remove(tick);KFX.app.ticker.add(x=>{const a=performance.now();tick(x);t+=performance.now()-a;k++});kitFx('promote');kitFx('coin');o.busy=await fps(2000);o.parts=KFX.parts.length;o.tickMs=+(t/Math.max(1,k)).toFixed(3)}return o});
  R['perf_'+ver+'_cpu'+rate]=m;L('perf',ver,rate,JSON.stringify(m));await c.close()}
 await fetch(BASE+'__ver/none');
 fs.writeFileSync(OUT+'/result.json',JSON.stringify(R,null,1));console.log(JSON.stringify(R,null,1));await b.close()})();
