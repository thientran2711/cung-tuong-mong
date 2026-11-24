/* REVIEW r1 robot-fix-cnv F4: the stamp maps (KIT_AV.P, KFP_MAP, KFS_REG, EMOX) now hold people WEAKLY. This probe plays with render on and, on four tabs every
   5 buổi, forces GC and checks every LIVE stamp on screen (img[data-kav], [data-kfsp], [data-kfp], [data-emo]) still resolves to its person (a person held only
   by the map would be collected = a dead tap / lost fx layer).
   usage: node dev/test/r10-weak-dead.js <origin> <road> <buoi> [seed] [bot]   exit 1 = a dead stamp */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const [ORIGIN,ROAD,NB,SEED,BOT]=process.argv.slice(2);const M=path.join(__dirname,'..','measure');const rd=f=>fs.readFileSync(path.join(M,f),'utf8');
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});
 const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});await serve(ctx);
 await ctx.route(/\.(webp|png|jpe?g|gif|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 await ctx.addInitScript(`window.__seed=${+SEED||7};(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 await p.evaluate(`window.__PROBE_PAL=${process.env.PROBE_PAL?1:0}`);await p.evaluate(()=>{localStorage.clear();window.__keep={render,renderHUD,renderStage,renderPanel,fx,curtain,popNum}});
 await p.evaluate(`window.__r10cfg=${JSON.stringify({origin:ORIGIN,road:ROAD,locked:false,pers:BOT||'skilled',uiEvery:0,lagMs:1e9,rtEvery:1e9})}`);
 await p.evaluate(rd('inpage6.js'));await p.evaluate(rd('inty.js'));await p.evaluate(rd('robot10-in.js'));
 const mode=await p.evaluate(()=>window.__r10.mode);
 await p.evaluate(()=>{const K=window.__keep;render=K.render;renderHUD=K.renderHUD;renderStage=K.renderStage;renderPanel=K.renderPanel;
  document.querySelectorAll('#kload,#kroul,#kroulw,#klife').forEach(e=>e.remove());document.getElementById('title').hidden=true;SLOT=1;Q=[];start();try{render()}catch(e){}
  window.__n=0;const nb0=nextBuoi;nextBuoi=function(){const r=nb0.apply(this,arguments);window.__n++;return r}});
 const cdp=await ctx.newCDPSession(p);const T={kav:[0,0],kfs:[0,0],kfp:[0,0],emo:[0,0]};const ex=[];
 const want=+NB||60;let next=5;
 for(let i=0;i<4000;i++){const r=await p.evaluate(([m])=>{try{window.__bot.step(m,5)}catch(e){}return {n:window.__n,dead:!S||S.dead}},[mode]);if(r.dead||r.n>=want)break;
  if(r.n>=next){next=r.n+5;
   for(const tab of ['act','home','hau','go']){await p.evaluate(t=>{try{tab=t;render();if(typeof kitAvSweep==='function')kitAvSweep()}catch(e){}},tab).catch(()=>{});
    await cdp.send('HeapProfiler.collectGarbage');await p.waitForTimeout(50);await cdp.send('HeapProfiler.collectGarbage');
    const c=await p.evaluate(()=>{const o={kav:[0,0],kfs:[0,0],kfp:[0,0],emo:[0,0]},e=[];
     document.querySelectorAll('img[data-kav]').forEach(im=>{o.kav[0]++;if(!kitDeref(KIT_AV.P.get(+im.dataset.kav))&&KIT_AV.P.has(+im.dataset.kav)){o.kav[1]++;e.push('kav '+im.getAttribute('src'))}});
     document.querySelectorAll('[data-kfsp]').forEach(im=>{o.kfs[0]++;if(!kfsPerson(im)){o.kfs[1]++;e.push('kfs '+im.getAttribute('src'))}});
     document.querySelectorAll('[data-kfp]').forEach(im=>{if(!im.dataset.kfp)return;o.kfp[0]++;if(!kfpGet(im.dataset.kfp)){o.kfp[1]++;e.push('kfp '+(im.textContent||'').slice(0,40))}});
     document.querySelectorAll('[data-emo]').forEach(im=>{o.emo[0]++;if(!emoByKey(im.dataset.emo)){o.emo[1]++;e.push('emo '+im.dataset.emo)}});return {o,e:e.slice(0,3)}}).catch(()=>null);
    if(c){for(const k in T){T[k][0]+=c.o[k][0];T[k][1]+=c.o[k][1]}ex.push(...c.e.map(x=>tab+': '+x))}}}}
 const dead=Object.values(T).reduce((a,b)=>a+b[1],0);
 console.log((dead?'DEAD ':'ok   ')+` ${ORIGIN}/${ROAD} live stamps after GC (seen/dead): `+Object.entries(T).map(([k,v])=>k+' '+v[0]+'/'+v[1]).join(' · '));
 [...new Set(ex)].slice(0,12).forEach(x=>console.log('   '+x));
 if(errs.length)console.log('  page errors: '+[...new Set(errs)].slice(0,6).join(' | '));
 await b.close();process.exit(dead?1:0)})();
