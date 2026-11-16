// node cmp.js <url> <WxH> <outdir> fig1,fig2,...  — identity card big figure, DPR 2: crops of the upper body under several filters
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));const fs=require('fs');
const [,,URL0,SZ,OUT,FIGS]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,serviceWorkers:'block'});
 const CD='/home/user/wt/figcut-shots/cdn/';fs.mkdirSync(CD,{recursive:true});
 await ctx.route(/ctm-img\.victoria-tntt\.workers\.dev\/img\/.*\.webp/,async rt=>{const u=new URL(rt.request().url());const f=CD+u.pathname.replace(/\//g,'_');
   if(fs.existsSync(f))return rt.fulfill({status:200,body:fs.readFileSync(f),headers:{'content-type':'image/webp','access-control-allow-origin':'*'}});
   for(let i=0;i<4;i++){try{const r=await rt.fetch();const bd=await r.body();if(r.status()===200){fs.writeFileSync(f,bd);return rt.fulfill({response:r,body:bd})}if(r.status()===404)return rt.fulfill({response:r,body:bd})}catch(e){}await sleep(500)}return rt.abort()});
 await ctx.route('**/*',rt=>{if(rt.request().headers()['x-ctm-load'])return rt.abort();return rt.fallback()});
 const p=await ctx.newPage();p.on('pageerror',e=>console.log('ERR',e.message.slice(0,200)));
 await p.goto(URL0,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:120000});await sleep(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
 for(let i=0;i<40;i++){if(await p.evaluate(()=>!!document.querySelector('#kroul .krskip')))break;await sleep(500)}
 await p.evaluate(()=>{const s=document.querySelector('#kroul .krskip');s&&s.click()});
 for(let i=0;i<120;i++){const ok=await p.evaluate(()=>{const g=document.querySelector('[data-kl="go"]');if(g)g.click();return !!document.querySelector('#modal > img.kidfig2')&&!!NLP&&!g});if(ok&&i>6)break;await sleep(500)}
 await p.evaluate(()=>{const d=document.createElementNS('http://www.w3.org/2000/svg','svg');d.setAttribute('width','0');d.setAttribute('height','0');d.style.position='absolute';d.innerHTML='<defs>'+[['k2',2,-0.5],['k3',3,-1.2],['k4',4,-1.9]].map(([id,s,i])=>`<filter id="${id}" x="0" y="0" width="100%" height="100%" color-interpolation-filters="sRGB"><feComponentTransfer><feFuncA type="linear" slope="${s}" intercept="${i}"/></feComponentTransfer></filter>`).join('')+'</defs>';document.body.appendChild(d)});
 const MODES=(process.env.MODES||'game,none,shadow,kfa').split(',');const res=[];
 for(const fig of FIGS.split(',')){const url='https://ctm-img.victoria-tntt.workers.dev/img/'+fig+'.webp';
  await p.evaluate(f=>{const M=$('modal');const im=M.querySelector(':scope > img.kidfig2');M.__kidWant=f;im.removeAttribute('srcset');im.src=f;kpIdLay(M)},url);
  await sleep(2500);
  for(const m of MODES){await p.evaluate(m=>{const im=document.querySelector('#modal > img.kidfig2');const F={game:'',none:'none',shadow:'drop-shadow(0 6px 18px #0006)',kfa:'url(#kfa)',k2:'url(#k2) drop-shadow(0 6px 18px #0006)',k3:'url(#k3) drop-shadow(0 6px 18px #0006)',k4:'url(#k4) drop-shadow(0 6px 18px #0006)'};
     if(F[m]==='')im.style.removeProperty('filter');else im.style.setProperty('filter',F[m],'important')},m);await sleep(400);
   const r=await p.evaluate(()=>{const im=document.querySelector('#modal > img.kidfig2');const a=im.getBoundingClientRect();return {ss:im.getAttribute('srcset'),sz:im.getAttribute('sizes'),cmp:im.complete,cls:im.className,cur:im.currentSrc,nw:im.naturalWidth,nh:im.naturalHeight,box:[a.left,a.top,a.width,a.height]}});
   const [x,y,w,h]=r.box;await p.screenshot({path:`${OUT}/${fig}-${m}.png`,clip:{x,y,width:w,height:Math.round(h*.45)}});res.push({ss:r.ss&&r.ss.replace(/https:[^ ]*\//g,''),sz:r.sz,cls:r.cls,fig,m,cur:r.cur.split('/').slice(-2).join('/'),nw:r.nw,nh:r.nh,box:r.box.map(Math.round)})}}
 console.log(JSON.stringify(res));await b.close()})();
