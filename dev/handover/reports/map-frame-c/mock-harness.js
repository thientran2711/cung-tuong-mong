/* map-labels.js — LUẬT SỬA CẢ NHÓM scan for Dư đồ place labels (owner 16/11 "Chữ nhỏ quá, mờ nữa").
   For every viewport x map zoom: every .mspot .mlab (place name chip) is measured: font px, text/chip contrast, chip opacity, box, whether it is
   clipped by the map viewport, overlaps a neighbour label, or is cut by its own box (scrollWidth > clientWidth).
   usage: node dev/test/map-labels.js <dev/index.html> <OUT> [WxH,WxH,..]   → <OUT>/table.json, <OUT>/<vp>-z<z>.jpg (map only), prints a table
   Pictures come from the CDN through Playwright (cached in .ahcache/img). */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const WT=path.resolve(__dirname,'../..')+'/';
const HTML0='/home/user/cung-tuong-mong/index.html',OUT=process.env.OUT;const HTML=path.resolve(HTML0);
const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=WT+'.ahcache/img/';
fs.mkdirSync(OUT,{recursive:true});fs.mkdirSync(CACHE,{recursive:true});

const CSSF=process.env.CSS||'';const TAG=process.env.TAG||'base';const MODE=process.env.MODE||'shot';
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY}:undefined});
 for(const vp of ['1180x820','755x1000']){const [W,H]=vp.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,ignoreHTTPSErrors:true,reducedMotion:'reduce'});
  await ctx.route('**/*',async r=>{const u=r.request().url();
   if(u.startsWith('http://ctm.test/')){const p=decodeURIComponent(new URL(u).pathname).slice(1);
    if(p===''||p==='index.html')return r.fulfill({status:200,body:fs.readFileSync(HTML),contentType:'text/html; charset=utf-8'});
    if(p.startsWith('mockassets/'))return r.fulfill({status:200,body:fs.readFileSync(process.env.ASSETS+'/'+p.slice(11))});
    const f=WT+p;if(fs.existsSync(f)&&fs.statSync(f).isFile())return r.fulfill({status:200,body:fs.readFileSync(f)});return r.fulfill({status:404,body:''})}
   if(u.startsWith(CDN)){const p=new URL(u).pathname.slice(1),c=CACHE+p.replace(/\//g,'__'),ct=p.endsWith('.json')?'application/json':p.endsWith('.webp')?'image/webp':'application/octet-stream';
    if(!p.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
    for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!p.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}
    return r.abort()}
   if(/fonts\.(googleapis|gstatic)/.test(u))return r.continue();return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(4000);
  await p.evaluate(()=>{SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(3000);
  await p.evaluate(()=>{Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi|Tiếp/.test(e.textContent||'')&&!e.closest('#stage'))e.remove()}const k=document.getElementById('kroul');if(k)k.remove();const m=document.getElementById('modal');if(m){m.classList.remove('on');m.hidden=true}const d=document.getElementById('dawn');if(d)d.hidden=true});
  await p.evaluate(()=>{Q.length=0;window.__mapList=0;tab='go';document.querySelectorAll('.modal,#modal').forEach(m=>{try{m.hidden=true}catch(e){}});render()});await p.waitForTimeout(2500);
  if(CSSF){await p.addStyleTag({content:fs.readFileSync(CSSF,'utf8')});}
  if(process.env.JS){await p.evaluate(fs.readFileSync(process.env.JS,'utf8'))}
  await p.waitForTimeout(2500);

  if(MODE==='scan'){for(const z of [0,.5,1.5,2.5]){await p.evaluate(z=>{window.__mapZ=z?(window.__mapFit||1)+z:0;render()},z);await p.waitForTimeout(1200);if(CSSF){await p.addStyleTag({content:fs.readFileSync(CSSF,'utf8')});await p.waitForTimeout(600)}
   const r=await p.evaluate(()=>{const sc=document.querySelector('.mapsc'),sr=sc.getBoundingClientRect();
    const G=[...sc.querySelectorAll('.mspot')].map(s=>{const parts=[...s.querySelectorAll('.mlab,.mmeta')].map(e=>e.getBoundingClientRect()).filter(r=>r.width>0);if(!parts.length)return null;const L=Math.min(...parts.map(r=>r.left)),T=Math.min(...parts.map(r=>r.top)),R=Math.max(...parts.map(r=>r.right)),B=Math.max(...parts.map(r=>r.bottom));return {n:(s.querySelector('.mlab')||s).textContent.trim().replace(/\s+/g,' ').slice(0,18),L,T,R,B}}).filter(Boolean);
    const vis=G.filter(g=>g.R>sr.left&&g.L<sr.right&&g.B>sr.top&&g.T<sr.bottom);let ov=[],cl=[];
    for(let i=0;i<vis.length;i++){const a=vis[i];if(a.L<sr.left-1||a.R>sr.right+1||a.T<sr.top-1||a.B>sr.bottom+1)cl.push(a.n);for(let j=i+1;j<vis.length;j++){const b=vis[j];if(Math.min(a.R,b.R)-Math.max(a.L,b.L)>1&&Math.min(a.B,b.B)-Math.max(a.T,b.T)>1)ov.push(a.n+' x '+b.n)}}
    return {fit:window.__mapFit,n:vis.length,ov,cl}});
   console.log(vp,'z+'+z,JSON.stringify(r))}}
  if(MODE==='dom'){console.log(await p.evaluate(()=>{const s=document.querySelector('.mspot');const t=document.querySelector('.maptools');return JSON.stringify({mspot:s&&s.outerHTML.slice(0,700),tools:t&&t.outerHTML.slice(0,900),mapv:document.querySelector('.mapv')&&document.querySelector('.mapv').parentElement.className})}));}
  await p.screenshot({path:`${OUT}/${TAG}-${vp}.png`});
  await ctx.close()}
 await b.close()})();
