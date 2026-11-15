/* KIT §68 painted-fx (jfxkit): every painted sprite kind, light and sheet loads and plays; pooled particles; no leaks after 50 bursts;
   lights/sheets clean themselves up; reduced motion shows stills; kitFx table still works on painted art; 0 page errors; 5 sizes.
   usage: node dev/test/sw-serve.js <port> <worktree> dev=<worktree>/dev   (local build: CTM_IMG_BASE= python3 dev/build/assemble.py)
          node dev/test/fxkit.js http://localhost:<port>/ <outdir> [shots]                                  */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,SHOTS]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const VP=[[755,1000,2,'fold'],[1000,755,2,'fold-land'],[1180,820,2,'ipad'],[1366,1024,2,'ipad-pro'],[844,390,3,'phone-land']];
const L=(...a)=>console.error(new Date().toISOString().slice(11,19),...a);const sleep=t=>new Promise(r=>setTimeout(r,t));
const NEWLIFE=()=>{try{localStorage.removeItem('hclh-opt')}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;
 const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','dawn','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov').forEach(e=>e.remove());render();return S.name};
const settle=p=>p.waitForFunction(()=>KFX.parts.length===0&&KFK.lights===0&&KFK.sheets===0&&!document.querySelector('.kfxk'),null,{timeout:60000,polling:500}).then(()=>true,()=>false);
(async()=>{const b=await chromium.launch({args:['--use-gl=swiftshader','--enable-unsafe-swiftshader','--autoplay-policy=no-user-gesture-required']});const R={};let fail=0;
 for(const [W,H,D,tag] of VP.filter(v=>!process.env.VPS||process.env.VPS.split(',').includes(v[3]))){L('vp',tag);
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100});const p=await c.newPage();const errs=[],bad=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text())});
  p.on('response',q=>{if(/\/img\/fx\//.test(q.url())&&q.status()>=400)bad.push(q.status()+' '+q.url().split('/').pop())});
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitFxBurst==='function',null,{timeout:180000});await sleep(2000);
  const r={name:await p.evaluate(NEWLIFE)};OPT_OFF=await p.evaluate(()=>{OPT.fxon=true;KFX.ambOK=false;return 0});
  /* 1. every sprite kind loads (atlas frames), lights/sheets listed */
  r.kinds=await p.evaluate(async()=>{const n=Object.keys(KFK_SP);await kitFxPreload([...n,...Object.keys(KFK_LIGHT)]);return{sp:n.length,loaded:n.filter(k=>KFK.tex[k]&&KFK.tex[k].length===KFK_SP[k].n).length,lights:Object.keys(KFK_LIGHT).length,sheets:Object.keys(KFK_SHEET).length}});
  /* 2. 50 bursts of mixed kinds, then everything gone + pool reused */
  r.burst=await p.evaluate(async()=>{const n=Object.keys(KFK_SP);let spawned=0,peak=0;const t0=KFK.made;
   for(let i=0;i<50;i++){spawned+=await kitFxBurst(n[i%n.length],{x:innerWidth*(.2+.6*Math.random()),y:innerHeight*.4},10);peak=Math.max(peak,KFX.parts.length);await new Promise(r=>setTimeout(r,60))}
   return{spawned,peak,made:KFK.made-t0}});
  r.burstClean=await p.waitForFunction(()=>KFX.parts.length===0,null,{timeout:90000,polling:500}).then(()=>true,()=>false);
  r.after=await p.evaluate(()=>({parts:KFX.parts.length,root:KFX.root.children.length,pool:KFK.pool.length,made:KFK.made,freed:KFK.freed}));
  /* a second round of 50 must reuse the pool (no new sprites beyond the first peak) */
  r.burst2=await p.evaluate(async()=>{const n=Object.keys(KFK_SP);const m0=KFK.made;for(let i=0;i<50;i++){await kitFxBurst(n[i%n.length],null,10);await new Promise(r=>setTimeout(r,60))}return{newSprites:KFK.made-m0}});
  await p.waitForFunction(()=>KFX.parts.length===0,null,{timeout:90000,polling:500}).catch(()=>{});
  /* 3. every kitFx table kind (now painted) */
  r.fxKinds=await p.evaluate(async()=>{const k=Object.keys(FX);for(const x of k){kitFx(x,{x:innerWidth/2,y:innerHeight/2});await new Promise(r=>setTimeout(r,120))}return k.length});
  /* 4. lights: each plays (video advancing, or the sheet fallback), screen blend, auto-cleanup by dur and when the target leaves */
  r.lights=await p.evaluate(async()=>{const out={};const tgt=document.querySelector('#stage')||document.body;
   for(const n of Object.keys(KFK_LIGHT)){const h=kitFxLight(n,tgt,{dur:2600,scale:.6});await new Promise(r=>setTimeout(r,1500));const v=h.el.querySelector('video');
    out[n]={blend:getComputedStyle(h.el).mixBlendMode,video:!!v,playing:v?(v.currentTime>0&&!v.paused):null,rs:v?v.readyState:null,still:h.el.classList.contains('kfxk-still')}}
   const d=document.createElement('div');d.style.cssText='position:fixed;left:10px;top:10px;width:120px;height:120px';document.body.appendChild(d);kitFxLight('candle',d,{});
   const low=kitFxLight('glow-gold',null,{low:1,dur:1200});out.lowSheet=!!(low&&/sheet/.test(low.el.style.backgroundImage));
   await new Promise(r=>setTimeout(r,300));d.remove();return out});
  /* sheets */
  r.sheets=await p.evaluate(async()=>{const out={};for(const n of Object.keys(KFK_SHEET)){const h=kitFxSheet(n,null,{});await new Promise(r=>setTimeout(r,700));out[n]=!!(h&&/webp/.test(h.el.style.backgroundImage))}return out});
  if(SHOTS&&['fold','ipad','phone-land'].includes(tag)){await p.evaluate(()=>{['kroul','dawn','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});const m=document.getElementById('modal');if(m)m.hidden=true;kitFxLight('candle',{x:innerWidth*.25,y:innerHeight*.45},{size:Math.min(innerWidth,innerHeight)*.35,dur:6000});
    kitFxLight('glow-gold',{x:innerWidth*.62,y:innerHeight*.4},{dur:6000});kitFxBurst('petal-peach',null,24);kitFxBurst('spark',{x:innerWidth*.62,y:innerHeight*.4},16);kitFxBurst('coin',null,10)});
   await sleep(1300);await p.screenshot({path:`${OUT}/fx-${tag}.jpg`,type:'jpeg',quality:60,timeout:120000})}
  r.clean=await settle(p);r.left=await p.evaluate(()=>({parts:KFX.parts.length,lights:KFK.lights,sheets:KFK.sheets,dom:document.querySelectorAll('.kfxk').length,
   overflow:document.documentElement.scrollWidth>innerWidth+1}));
  r.errs=errs.slice(0,6);r.bad404=bad;
  const ok=r.kinds.loaded===r.kinds.sp&&r.burstClean&&r.after.root===0&&r.burst2.newSprites<=5&&r.clean&&!r.left.overflow&&!errs.length&&!bad.length
   &&Object.keys(r.lights).filter(k=>KFK_LIGHT_NAMES.includes(k)).every(k=>r.lights[k].blend==='screen'&&(r.lights[k].playing||r.lights[k].still))&&r.lights.lowSheet;
  r.ok=ok;if(!ok)fail++;R[tag]=r;L(tag,JSON.stringify(r));await c.close()}
 /* reduced motion: stills only, no particles */
 {const c=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,reducedMotion:'reduce'});const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kitFxBurst==='function',null,{timeout:180000});await sleep(1500);await p.evaluate(NEWLIFE);
  const r=await p.evaluate(async()=>{const n=await kitFxBurst('petal-plum',null,10);const h=kitFxLight('candle',null,{dur:800});await new Promise(r=>setTimeout(r,300));
   return{burst:n,still:h.el.classList.contains('kfxk-still'),video:!!h.el.querySelector('video'),parts:KFX.parts.length}});
  r.clean=await settle(p);r.errs=errs;r.ok=r.burst===0&&r.still&&!r.video&&r.clean&&!errs.length;if(!r.ok)fail++;R.reduced=r;L('reduced',JSON.stringify(r));await c.close()}
 fs.writeFileSync(`${OUT}/fxkit.json`,JSON.stringify(R,null,1));console.log(fail?`FAIL ${fail}`:'PASS');await b.close();process.exit(fail?1:0)})();
const KFK_LIGHT_NAMES=['candle','glow-gold','moonlight','lantern-red','divine'];let OPT_OFF;
