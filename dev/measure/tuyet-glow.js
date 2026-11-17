/* KHUYNH THANH SKIN GLOW SAMPLE (owner 17/11 ~21:55Z): in-room full figure (real game stage view, her face PINNED to one picture, Khuynh thanh look) with the glow at its nicest moment
   + a head-and-shoulders close-up band from the same render, and a looping animation (frames from the paused CSS animation).
   usage: node tuyet-glow.js <http://host:port/index.html> <outdir> [WxH@dpr = 755x1000@2]   env: FACE (default c11-tcold-a18), FRAMES (default 24), MODE=stage|face, MAPDUMP=1, NOGLOW=1 (look without glow, for comparison) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const [,,URL,OUT,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');
const ROOT=process.env.ART||path.join(process.cwd(),'dev','art');const FACE=process.env.FACE||'c11-tcold-a18';const NF=+(process.env.FRAMES||24);
const SC={x:62,y:223,width:288,height:689},HC={x:112,y:228,width:200,height:150};
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof toilMakeup==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const fit2=JSON.parse(fs.readFileSync(path.join(ROOT,'toil-fit2.json'),'utf8'));const mk={};for(const f of fs.readdirSync(path.join(ROOT,'mkfit')))if(f.endsWith('.json'))mk[f.slice(0,-5)]=JSON.parse(fs.readFileSync(path.join(ROOT,'mkfit',f),'utf8'));
 await p.evaluate(([seed,FACE])=>{let x=seed;Math.random=()=>{x=(x*1103515245+12345)%2147483648;return x/2147483648};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});
  const f0=figFor;window.figFor=function(){const s=f0.apply(this,arguments);return typeof s==='string'?s.replace(/consort-c\d+-t[a-z0-9]+-a\d+/,'consort-'+FACE):s};start()},[4,FACE]);
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await p.waitForTimeout(3000);
 await p.evaluate(([fit2,mk])=>{TOIL_FIT.fit=fit2;for(const g in mk){MK_FIT.g[g]=mk[g];MK_FIT.ld[g]=1}},[fit2,mk]);
 await p.addStyleTag({content:'.kpets,.petal,[class*=petal]{display:none!important}'+(process.env.NOGLOW?'.kglw{display:none!important}':'')});
 await p.evaluate(gl=>{if(gl)Object.assign(BAL.toil.glow,JSON.parse(gl));Q.length=0;try{closeModal()}catch(e){}for(const k in TOIL_MKC)delete TOIL_MKC[k];const c=toilColFix(null);c.seed=7;S.toilette={day:toilWk()*10,wk:toilWk(),score:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:'tuyet',col:c};TOIL.prev=null;try{toilMkPre()}catch(e){}render()},process.env.GLOW||'');
 await p.waitForTimeout(3500);try{await p.evaluate(()=>toilLodPass())}catch(e){}await p.waitForTimeout(1500);
 {let last='',same=0;for(let i=0;i<40&&same<4;i++){const r=await p.evaluate(()=>{const f=document.querySelector('#mefig').getBoundingClientRect();return[f.x,f.y,f.width].map(v=>Math.round(v*10)).join()});if(r===last)same++;else{same=0;last=r}await p.waitForTimeout(250)}}
 await p.waitForFunction(()=>{return document.querySelectorAll('i.kglw b.kg-hl').length>3},null,{timeout:60000});await p.waitForTimeout(500);
  const DUR=6000;const at=async f=>{await p.evaluate(t=>{document.getAnimations().forEach(a=>{if(/^kg/.test(a.animationName||'')){a.pause();a.currentTime=t}})},f*DUR);await p.waitForTimeout(40)};
 const fr=await p.evaluate(()=>{const k=[...document.querySelectorAll('img.kmkc')].find(e=>e.getBoundingClientRect().width>0&&e.closest('#mefig, .kfxf'));const r=k.getBoundingClientRect();return{x:r.x,y:r.y,w:r.width,h:r.height}});
 const fw=fr.w*1.12,FC={x:fr.x+fr.w/2-fw/2,y:fr.y+fr.h*.5-fw*.62,width:fw,height:fw*1.1};/* face fills ~65 % of the frame width */
 const MODE=process.env.MODE||'stage';const clip=MODE==='face'?FC:SC;
 const off=async o=>p.evaluate(o=>{let s=document.getElementById('gl-off');if(!s){s=document.createElement('style');s.id='gl-off';document.head.appendChild(s)}s.textContent=o?'.kglw{display:none!important}':''},o);
 await off(true);await p.waitForTimeout(100);fs.writeFileSync(`${OUT}/off.png`,await p.screenshot({clip}));await off(false);
 /* timeline: SECS long (default 6, FPS 30); BURSTS = start seconds of the twinkle bursts (BAL burstMs long, the burst clock is off in the sampler: auto=false) */
 const SECS=+(process.env.SECS||6),FPS=+(process.env.FPS||30),BU=(process.env.BURSTS||'').split(',').filter(Boolean).map(Number),BMS=await p.evaluate(()=>BAL.toil.glow.burstMs);
 const total=Math.round(SECS*FPS);
 for(let i=0;i<total;i++){const t=i/FPS;const bs=BU.find(b0=>t>=b0&&t<b0+BMS/1000);
  await p.evaluate(([t,bs])=>{const L=[...document.querySelectorAll('i.kglw')];L.forEach(x=>{if(bs!=null){if(!x.classList.contains('on'))toilGlowOn(x)}else x.classList.remove('on')});
   document.getAnimations().forEach(a=>{const n=a.animationName||'';if(/^kgst$/.test(n)){a.pause();a.currentTime=(t-bs)*1000}else if(/^kg/.test(n)){a.pause();a.currentTime=t*1000}})},[t,bs==null?null:bs]);
  await p.waitForTimeout(30);fs.writeFileSync(`${OUT}/f${String(i).padStart(3,'0')}.png`,await p.screenshot({clip}))}
 await p.screenshot({path:OUT+'/full.png'});console.log('done',JSON.stringify(errs));await b.close()})();
