/* review/face-zoom-stretch: shots of kitFaceZoom for given picture files (side by side), usage: node dev/test/face-zoom-shots.js <url> <out.png> <file1,file2,...> */
const {chromium}=require('playwright');const [,,URL,OUT,FL]=process.argv;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const ctx=await b.newContext({viewport:{width:1180,height:820},deviceScaleFactor:1,serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.known);await p.waitForTimeout(3000);await p.waitForFunction(()=>window.TOIL_FIT&&TOIL_FIT.fit,null,{timeout:60000});
 await p.evaluate(async fl=>{const h=document.createElement('div');h.id='fzs';h.style.cssText='position:fixed;left:0;top:0;right:0;bottom:0;z-index:2147483647;background:#fff;display:flex;gap:14px;padding:14px;flex-wrap:wrap';document.documentElement.appendChild(h);
  for(const f of fl){const c=document.createElement('div');c.style.cssText='width:260px;font:11px sans-serif';c.innerHTML='<div class="kfzoom" style="width:240px;margin:0 auto">'+kitFaceZoom(S,f).replace(/^<div class="kfzoom"[^>]*>/,'').replace(/<\/div>$/,'')+'</div><div>'+f+'</div>';h.appendChild(c)}
  await new Promise(r=>setTimeout(r,6000))},FL.split(','));
 await p.evaluate(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove()));await p.screenshot({path:OUT});await b.close()})();
