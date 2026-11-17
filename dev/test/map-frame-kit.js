/* map-frame-kit: Dư đồ style C (KIT §85). Opens the map at the default zoom, checks: no .msil anywhere, slip on every .mlab/.mmeta,
   overlap of place boxes (.mlab+.mmeta union) = 0 at default zoom and +1/+2 zoom steps, the tools row as an overlay ON the map (§85.6). usage: node dev/test/map-frame-kit.js <url> <shotdir> [WxH,..] */
const {chromium}=require('playwright');const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});const [,,PAGEURL,DIR,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0;
 for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(90000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGEURL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!srv)break}
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;tab='go';render()});await sleep(2500);
  const scan=()=>p.evaluate(()=>{const sc=document.querySelector('.game.maptab .mapsc');if(!sc)return{nomap:1};const B=[...sc.querySelectorAll('.mspot')].map(s=>{const P=[...s.querySelectorAll('.mlab,.mmeta')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);if(!P.length)return null;return{n:(s.querySelector('.mlab')||{}).textContent,L:Math.min(...P.map(r=>r.left)),R:Math.max(...P.map(r=>r.right)),T:Math.min(...P.map(r=>r.top)),Bt:Math.max(...P.map(r=>r.bottom))}}).filter(Boolean);
   let ov=0;const pr=[];for(let i=0;i<B.length;i++)for(let j=i+1;j<B.length;j++){const a=B[i],c=B[j];if(Math.min(a.R,c.R)-Math.max(a.L,c.L)>0&&Math.min(a.Bt,c.Bt)-Math.max(a.T,c.T)>0){ov++;pr.push(a.n+'|'+c.n)}}
   const lab=sc.querySelector('.mlab');const cs=lab&&getComputedStyle(lab);const tools=document.querySelector('.kleather>.maptools');
   return{n:B.length,ov,pr:pr.slice(0,4),msil:document.querySelectorAll('.msil').length,slip:cs&&/mapslip/.test(cs.borderImageSource),mmeta:sc.querySelectorAll('.mmeta').length,
    toolsAbove:!!tools&&tools.getBoundingClientRect().top<=sc.getBoundingClientRect().top+12&&tools.getBoundingClientRect().bottom<=sc.getBoundingClientRect().bottom,z:window.__mapFit}});
  const r0=await p.evaluate(()=>window.__mapZ);const res={};res.def=await scan();await p.screenshot({path:`${DIR}/map-${sz}-z0.png`});
  for(const k of [1,2]){await p.evaluate(k=>{window.__mapZ=(window.__mapFit||1)+k;mapFit()},k);await sleep(500);res['z+'+k]=await scan()}
  await p.evaluate(()=>{window.__mapZ=(window.__mapFit||1)+1;mapFit()});await sleep(400);await p.screenshot({path:`${DIR}/map-${sz}-z1.png`});
  await p.evaluate(()=>{window.__mapZ=0;kpmOpenSlot(0,null)});await sleep(1500);res.kpm=await p.evaluate(()=>{const v=document.querySelector('.kpmv');if(!v)return{none:1};const l=v.querySelector('.kpm-spot .mlab');return{msil:v.querySelectorAll('.msil').length,spots:v.querySelectorAll('.kpm-spot').length,img:(v.querySelector('.mapimg')||{}).naturalWidth,src:((v.querySelector('.mapimg')||{}).src||'').slice(-40),slip:!!l&&/mapslip/.test(getComputedStyle(l).borderImageSource)}});
  await p.screenshot({path:`${DIR}/kpm-${sz}.png`});
  const d=res.def;const ok=!d.nomap&&d.ov===0&&res['z+1'].ov===0&&res['z+2'].ov===0&&d.msil===0&&d.slip&&d.toolsAbove&&res.kpm.msil===0&&!res.kpm.none&&res.kpm.slip&&errs.length===0;
  console.log(sz,ok?'PASS':'FAIL',JSON.stringify(res),errs.join('|'));if(!ok)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
