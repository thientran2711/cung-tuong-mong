/* cloth-bake-static: the cloth layer (wet / mud / xoc) must show on EVERY static figure path on a COLD cache, same as warm.
   Paths: stage figure (kitFigFx, #mefig), event-stage figure (kitStageFig), mirror close-up (kitFaceZoom), mirror reveal markup (kitFxLayers in a .kfxf).
   usage: node dev/test/cloth-bake-static.js <url> <WxH@dpr> [shotdir]   (exit 1 on any missing layer; shots go to shotdir, never into git) */
const {chromium}=require('playwright');const [,,URL,VP,SHOT]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});await ctx.addInitScript(w=>{window.__W=w},+process.env.WAIT||40000);const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof clothXocLayer==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await p.waitForTimeout(3000);
 await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});
 const fails=[],rows=[];
 for(const kind of ['uot','bun','xoc']){for(const path of ['stage','eventstage','mirrorzoom','mirrorreveal']){for(const temp of ['cold','warm']){
  const r=await p.evaluate(async([kind,path,temp])=>{
   if(temp==='cold')clothCacheReset();
   S.stain={w:wk(),it:{}};S.stain.it[kind]={lv:3,at:lkNow()};
   const file=kitFile(kitFigOf(S));let host=document.getElementById('kcbs');if(host)host.remove();
   const ready=()=>{const L=host.querySelectorAll('img.kclo');return L.length&&[...L].every(i=>!i.classList.contains('kclo-wait')&&i.src&&!/^data:image\/gif/.test(i.src))};
   let layer=0;
   if(path==='stage'){render();kitFigFx();host=document.getElementById('stage')}
   else{host=document.createElement('div');host.id='kcbs';host.style.cssText='position:fixed;left:0;top:0;width:100%;height:100%;z-index:99999;background:#222;display:flex;gap:8px;justify-content:center';document.body.appendChild(host);
    if(path==='eventstage')host.innerHTML='<div style="width:40%">'+kitStageFig(S)+'</div>';
    else if(path==='mirrorzoom')host.innerHTML='<div style="width:60%;aspect-ratio:1">'+kitFaceZoom(S,file)+'</div>';
    else host.innerHTML='<div style="position:relative;width:40%"><img src="'+IMG_U('img/'+file)+'" style="width:100%;display:block"><span class="kfxf" style="position:absolute;left:0;top:0;width:100%;height:100%;pointer-events:none">'+kitFxLayers(S,file)+'</span></div>'}
   const t0=performance.now();let first=host.querySelectorAll('img.kclo').length;
   while(performance.now()-t0<(+window.__W||40000)&&!ready()){await new Promise(r=>setTimeout(r,200))}
   if(path==='stage')await new Promise(r=>setTimeout(r,600));
   const L=[...host.querySelectorAll('img.kclo')].filter(i=>!i.classList.contains('kclo-wait'));
   return{first,done:L.length,wait:host.querySelectorAll('img.kclo-wait').length,ms:Math.round(performance.now()-t0)}},[kind,path,temp]);
  const ok=r.done>0&&r.wait===0;rows.push([kind,path,temp,r.first?'layer':'none',ok?'BAKED':'MISSING',r.ms]);if(!ok)fails.push([kind,path,temp,r]);
  if(SHOT&&temp==='cold'&&kind==='xoc'&&path!=='stage'){await p.screenshot({path:SHOT+'/'+path+'-'+kind+'-cold.png'})}
 }}}
 await p.evaluate(()=>{const h=document.getElementById('kcbs');if(h)h.remove()});
 console.log('kind | path | cache | at first print | result | ms');rows.forEach(r=>console.log(r.join(' | ')));
 console.log(fails.length?'FAIL '+JSON.stringify(fails):'PASS',errs.length?'errs '+JSON.stringify(errs.slice(0,3)):'');await b.close();process.exit(fails.length||errs.length?1:0)})();
