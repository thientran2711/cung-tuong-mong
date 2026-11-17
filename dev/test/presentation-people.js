/* presentation-people (review/presentation-wiring): the people moments of jpres.js (KPM) + the kit part kitFigMove (KIT §68.8).
   usage: node dev/test/presentation-people.js <site url> <outdir> [--shots] 755x1000@2 1180x820@2 ...
   Per size: 0 page errors, 0 HTTP>=400 (art may 404 until it lands), every moment returns/plays through the kit (KPM_LOG + KFK.log fig:*), figures restore
   (no .kfxk-g ghost left, picture visible again), Gọn (OPT.fxon=false) animates nothing, hooks fire (death via dieIf, leaving the stage = out, state scan = preg,
   ACT wrappers on a forced success), perf (longest frame gap while 8 moments run), no horizontal overflow. --shots: mid-animation crops (slap, poison, die, drag, preg, join). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,...A]=process.argv;const SHOTS=A.includes('--shots');const SZ=A.filter(x=>!x.startsWith('--'));
(async()=>{const b=await chromium.launch();const out=[];fs.mkdirSync(OUT,{recursive:true});
 for(const sz of SZ){const [wh,dp]=sz.split('@');const [W,H]=wh.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dp||1),hasTouch:true,isMobile:W<1100});
  const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('response',r=>{if(r.status()>=400&&!/\.(webp|webm|mp4|mp3)|_index\.json/.test(r.url()))bad.push(r.status()+' '+r.url().slice(-60))});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kpmGo==='function'&&typeof kitFigMove==='function');await p.waitForTimeout(2000);
  await p.evaluate(()=>{window.kitRoulette=function(o){try{o.done&&o.done()}catch(e){}};window.kitKnown=()=>true;try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(window.isSrv&&isSrv()))break}['kroul','dawn','kload','ktut'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;
   document.querySelectorAll('.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;render();window.P=()=>curPeople().filter(w=>w.ref&&typeof w.ref.rank==='number'&&kfkFigEl(w.ref)).map(w=>w.ref);goTo('vuon')});
  await p.waitForTimeout(1200);await p.evaluate(()=>{['kroul','dawn','kload','ktut'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;render()});await p.waitForTimeout(1500);
  await p.waitForFunction(()=>window.P&&P().length>=1,null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(1500);
  const setup=await p.evaluate(()=>{const v=P();return{people:curPeople().length,figs:v.length,place:S.place}});
  const res={};
  /* 1. every moment on a stage figure */
  res.moments=await p.evaluate(async()=>{const ppl=P();const a=ppl[0],q=ppl[1]||ppl[0];const o={};await new Promise(r=>setTimeout(r,200));const M=['slap','poison','harm','rumour','preg','birth','rise','fall','favour','death','drag','out'];
   for(const m of M){KFK.log.length=0;o[m]={ret:kpmGo(m,a,q),kfk:KFK.log.slice(0,6).join(',')};await new Promise(r=>setTimeout(r,60));for(const g of [...document.querySelectorAll('.kfxk-g')])g.__h&&g.__h.stop();if(kfkFigEl(a)&&a)kfkFigEl(a).style.visibility=''}
   KFK.log.length=0;o.join={ret:kpmGo('join',a,q),kfk:KFK.log.join(',')};KFK.log.length=0;o.betray={ret:kpmGo('betray',a,q),kfk:KFK.log.join(',')};return o});
  await p.waitForTimeout(7000);
  res.after=await p.evaluate(()=>({ghosts:document.querySelectorAll('.kfxk-g').length,live:KFK.live.size,liveCls:[...KFK.live].map(e=>e.className),hidden:[...document.querySelectorAll('#tokens .tok img.figimg')].filter(e=>e.style.visibility==='hidden').length}));
  /* 2. Gọn: nothing animates */
  res.gon=await p.evaluate(()=>{OPT.fxon=false;const a=P()[0];KFK.log.length=0;const r=['slap','poison','die'].map(m=>kpmGo(m==='die'?'death':m,a));OPT.fxon=true;return{ret:r,log:KFK.log.filter(x=>/^fig:/.test(x))}});
  /* 3. hooks: death (dieIf), leaving the stage (out), state scan (preg), ACT wrapper on a forced success */
  res.hooks=await p.evaluate(async()=>{const o={};const ppl=P();const a=ppl[0];
   const W=curPeople().find(w=>w.ref===ppl[0]),im=kfkFigEl(ppl[0]);KFK.log.length=0;o.out=kpmOutCheck([[W,kfkSnap(im)]],curPeople().filter(w=>w!==W))+(KFK.log.filter(x=>/fig:out/.test(x)).length?10:0);for(const g of [...document.querySelectorAll('.kfxk-g')])g.__h&&g.__h.stop();
   KFK.log.length=0;a.suc=0;a.alive=true;try{dieIf(a,'chết vì bệnh')}catch(e){}o.death=KFK.log.filter(x=>/fig:die/.test(x)).length;a.alive=true;a.suc=60;for(const g of [...document.querySelectorAll('.kfxk-g')])g.__h&&g.__h.stop();
   const v=ppl[1]||ppl[0];v.preg=0;v.hidden=false;render();await new Promise(r=>setTimeout(r,900));KFK.log.length=0;v.preg=1;v.hidden=false;v.fake=0;render();await new Promise(r=>setTimeout(r,200));o.preg=KFK.log.filter(x=>/fig:glow/.test(x)).length;
   const R=Math.random;Math.random=()=>0;KFK.log.length=0;try{ACT.rumor.f(S,v)}catch(e){o.actErr=e.message}Math.random=R;await new Promise(r=>setTimeout(r,900));o.rumorAct=KPM_LOG.filter(x=>x.m==='rumour').length;
   KFK.log.length=0;try{ACT.tat&&ACT.tat.f(S,v)}catch(e){o.tatErr=e.message}await new Promise(r=>setTimeout(r,900));o.tatAct=KFK.log.filter(x=>/fig:flush/.test(x)).length;return o});
  await p.waitForTimeout(3500);
  /* 4. perf: longest frame gap while 8 moments run together */
  res.perf=await p.evaluate(async()=>{let max=0,last=performance.now(),run=true;const t=()=>{const n=performance.now();max=Math.max(max,n-last);last=n;if(run)requestAnimationFrame(t)};requestAnimationFrame(t);
   const ppl=P();for(const m of ['slap','poison','preg','birth','rise','favour','harm','rumour'])kpmGo(m,ppl[0]);await new Promise(r=>setTimeout(r,2500));run=false;return{maxGapMs:Math.round(max)}});
  res.overflow=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  if(SHOTS){const R=await p.evaluate(()=>{const e=kfkFigEl(P()[0]).getBoundingClientRect();return{x:Math.max(0,e.left-60),y:Math.max(0,e.top-30),width:Math.min(innerWidth-Math.max(0,e.left-60),e.width+360),height:Math.min(innerHeight-Math.max(0,e.top-30),e.height+60)}});
   for(const [m,dly] of [['slap',250],['poison',1700],['death',1500],['drag',650],['preg',700],['join',500]]){await p.waitForTimeout(3600);await p.evaluate((m)=>{const ppl=P();kpmGo(m,ppl[0],ppl[1]||ppl[0])},m);await p.waitForTimeout(dly);
    await p.screenshot({path:`${OUT}/ppl-${sz.replace('@','_')}-${m}.png`})}}
  const mom=res.moments;const missing=Object.keys(mom).filter(k=>!mom[k].ret&&!['join','betray'].includes(k));
  const ok=!errs.length&&!bad.length&&setup.figs>=1&&!missing.length&&res.after.ghosts===0&&res.after.hidden===0&&res.gon.log.length===0&&res.hooks.death>=1&&res.hooks.out>=1&&res.hooks.preg>=1&&res.hooks.rumorAct>=1&&!res.overflow;
  out.push({size:sz,setup,missing,after:res.after,gon:res.gon,hooks:res.hooks,perf:res.perf,overflow:res.overflow,errs,http4xx:bad.slice(0,6),ok});console.error(sz,JSON.stringify(out[out.length-1]).slice(0,600));
  if(sz===SZ[0])fs.writeFileSync(OUT+'/table.json',JSON.stringify(res.moments,null,0));await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close();process.exit(out.every(x=>x.ok)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
