/* KIT §68.7 rim-light scan (review/diemtrang-fx): every light entry point aimed at / reaching a person must draw a RIM (kitFxRim), never an overlay on the person.
   usage: node dev/test/rimlight-scan.js <url> [WxH@dpr]   prints JSON {rows:[{entry,rim,overlays,hits}],errs}; exit 1 when an overlay still meets a person */
const {chromium}=require('playwright');
const [,,URL,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out);if(ok)break}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;deal();render();OPT.fxon=true;OPT.fxpick=1;window.__bot=0});
 await p.evaluate(()=>{while(Q.length){Q.length=0}try{closeModal()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(2500);
 const rows=await p.evaluate(async()=>{const R=[];const persons=()=>kfkPersons({x:0,y:0,w:innerWidth,h:innerHeight});
  const hit=()=>{const P=persons().map(e=>e.getBoundingClientRect());return [...document.querySelectorAll('.kfxk-l,.kfxk-s.kfxk-scr,.kfxk-s')].filter(d=>{const r=d.getBoundingClientRect();return P.some(q=>!(q.right<=r.left||q.left>=r.right||q.bottom<=r.top||q.top>=r.bottom))}).length};
  const run=async(name,f)=>{document.querySelectorAll('.kfxk').forEach(e=>e.remove());await new Promise(r=>setTimeout(r,150));const n0=KFK.log.length;let h=null;try{h=f()}catch(e){h=null}await new Promise(r=>setTimeout(r,1100));const log=KFK.log.slice(n0);R.push({entry:name,persons:persons().length,rim:log.some(x=>/^rim:/.test(x)),overlays:log.filter(x=>/^(light|sheet):/.test(x)).length,hits:hit()});try{h&&h.stop&&h.stop(50)}catch(e){}await new Promise(r=>setTimeout(r,200))};
  await new Promise(r=>setTimeout(r,2500));const P0=persons().find(e=>e.matches('img.figimg'))||persons()[0];
  await run('kitFxLight(glow-gold, person)',()=>kitFxLight('glow-gold',P0,{dur:900}));
  await run('kitFxLight(glow-gold, null = screen)',()=>kitFxLight('glow-gold',null,{dur:900,scale:1}));
  await run('kitFxLight(fireworks, null)',()=>kitFxLight('fireworks',null,{dur:900}));
  await run('kitFxBurst(glowburst, person)',()=>kitFxBurst('glowburst',P0,1,{scale:1}));
  await run('kitFxBurst(glowburst, screen centre)',()=>kitFxBurst('glowburst',null,1,{scale:1.2}));
  await run('kitFxBurst(orb, person)',()=>kitFxBurst('orb',P0,3,{}));
  await run('kitFx(promote) flash+rays',()=>kitFx('promote',{}));
  await run('kitFx(decree) flash+rays',()=>kitFx('decree',{el:P0}));
  await run('kfPx(lotus)',()=>kfPx('lotus',kfPt({el:P0})));
  return R});
 const bad=rows.filter(r=>r.persons&&r.hits>0);
 console.log(JSON.stringify({vp:VP,rows,bad:bad.length,errs},null,1));await b.close();process.exit(bad.length?1:0)})();
