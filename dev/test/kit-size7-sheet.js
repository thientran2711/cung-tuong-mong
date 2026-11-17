/* kit-size7-sheet.js — before/after sheet of event-picture frames: for each picture, rows = kinds, columns = S M L XL, real v3 frames (kszFrame3), cropped tiles composed by the caller.
   usage: node dev/test/kit-size7-sheet.js <url> <WxH> <outdir> <tag> [jksize.js to inject = BEFORE|-] <pic,pic,...> [kinds=news,notice]
   writes <outdir>/<tag>-<pic>-<kind>-<K>.png (outdir OUTSIDE the repo) */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,SZ,OUT,TAG,INJ='-',PICS,KINDS='news,notice']=process.argv;const [W,H]=SZ.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 await p.goto(URL+'?khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2000);
 await p.addStyleTag({content:'#krottip{display:none!important}body>*:not(#kszhost){visibility:hidden!important}#kszhost{visibility:visible!important}'});
 await p.evaluate(()=>{window.kitKnown=()=>true;window.isKnown61=()=>true;window.k61Named=()=>true;window.met61=()=>true;window.kitKnownName=()=>true;document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip').forEach(e=>e.remove())});
 if(W<H)await p.evaluate(()=>{document.documentElement.classList.remove('kv2');document.documentElement.classList.add('kv1')});
 if(INJ!=='-')await p.addScriptTag({content:fs.readFileSync(INJ,'utf8')});
 await p.evaluate(()=>{const h=document.createElement('div');h.id='kszhost';h.style.cssText='position:absolute;left:0;top:0;width:900px;background:#f4ead6;padding:6px';document.body.appendChild(h)});
 for(const name of PICS.split(',')){for(const kind of KINDS.split(',')){for(const K of ['S','M','L','XL']){
  await p.evaluate(async([name,kind,K])=>{const X=kszSpecs3()[kind];const sp=Object.assign({},X[K],{pic:'img/'+name+'.webp'});const h=document.getElementById('kszhost');h.innerHTML=kszFrame3(sp,K);const d=h.firstElementChild;const im=d.querySelector('img.ksimg,.k3ev img,.k3mpic img');
   await Promise.all([...d.querySelectorAll('img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)})));kitFrameApply3(d);kitFrameApply3(d)},[name,kind,K]);
  await p.waitForTimeout(250);await p.locator('#kszhost>*').first().screenshot({path:`${OUT}/${TAG}-${name}-${kind}-${K}.png`})}}}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
