// node sheet.js <url> <WxH> <out.png> fig  — on the live identity screen backdrop: same figure, OLD #kfa (left) vs NEW #kfa (right), game drop-shadow, DPR 2
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));
const [,,URL0,SZ,OUT,FIG]=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,serviceWorkers:'block'});
 await ctx.route('**/*',rt=>{if(rt.request().headers()['x-ctm-load'])return rt.abort();return rt.fallback()});
 const p=await ctx.newPage();await p.goto(URL0,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await sleep(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('#kroul .krskip')))break;await sleep(500)}
 await p.evaluate(()=>{const s=document.querySelector('#kroul .krskip');s&&s.click()});
 for(let i=0;i<120;i++){const ok=await p.evaluate(()=>{const g=document.querySelector('[data-kl="go"]');if(g)g.click();return !!document.querySelector('#modal > img.kidfig2')&&!!NLP&&!g});if(ok&&i>6)break;await sleep(500)}
 await p.evaluate(f=>{const M=document.getElementById('modal');M.querySelectorAll(':scope > *').forEach(e=>e.style.visibility='hidden');
  const d=document.createElementNS('http://www.w3.org/2000/svg','svg');d.setAttribute('width','0');d.setAttribute('height','0');d.style.position='absolute';
  d.innerHTML='<defs><filter id="kfaOld" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="1.07" intercept="-0.065"/></feComponentTransfer></filter></defs>';document.body.appendChild(d);
  const hd='https://ctm-img.victoria-tntt.workers.dev/img/'+f+'.webp';
  const H=Math.round(innerHeight*.9);
  ['kfaOld','kfa'].forEach((k,i)=>{const im=document.createElement('img');im.src=hd;im.style.cssText=`position:fixed;z-index:99;bottom:0;left:${i?52:2}vw;height:${H}px;width:auto;filter:url(#${k}) drop-shadow(0 6px 18px #0006)`;M.appendChild(im);
   const t=document.createElement('div');t.textContent=i?'SAU (new #kfa)':'TRƯỚC (live)';t.style.cssText=`position:fixed;z-index:100;top:6px;left:${i?52:2}vw;font:700 18px sans-serif;color:#fff;background:#000a;padding:2px 8px`;M.appendChild(t)})},FIG);
 await sleep(5000);await p.screenshot({path:OUT});await b.close()})();
