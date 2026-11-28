/* dudo-title: on the Dư đồ map AND the palace detail map, the map title (cartouche / "Name · N bóng") never overlaps the -/+ zoom + back + Ra vào + Danh sách buttons (KIT map tools row), at every priority size.
   usage: node dev/test/dudo-title.js URL shotdir|- [WxH@dpr,..]   (env DESK=1: non-mobile context) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,PAGEURL,DIR,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0;
 for(const sz of (SIZES||'755x1000@2,412x1058@2,1180x820@2,1366x1024@2').split(',')){const [WH,DPR]=sz.split('@');const [W,H]=WH.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:!process.env.DESK,isMobile:!process.env.DESK&&W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(90000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGEURL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#krottip{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!s)break}
  const measure=()=>p.evaluate(()=>{const R=e=>{const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};const ov=(a,b)=>Math.min(a.r,b.r)-Math.max(a.l,b.l)>1&&Math.min(a.b,b.b)-Math.max(a.t,b.t)>1;
   const mt=document.querySelector('.game.maptab .maptools');if(!mt)return{none:1};const vis=e=>{const r=e.getBoundingClientRect(),c=getComputedStyle(e);return r.width>0&&r.height>0&&c.visibility!=='hidden'&&c.display!=='none'};
   const btns=[...mt.querySelectorAll('button')].filter(vis);const tit=[...mt.querySelectorAll('.past,.kpm-t')].filter(vis);const pr=getComputedStyle(mt,'::before');
   const cart=pr.content&&pr.content!=='none'&&pr.content!=='normal'?{content:pr.content,w:parseFloat(pr.width)||0,left:mt.getBoundingClientRect().left+(parseFloat(pr.left)||0)}:null;
   const hits=[];tit.forEach(t=>btns.forEach(x=>{if(ov(R(t),R(x)))hits.push((t.className||'t')+'~'+x.textContent.trim().slice(0,8))}));
   if(cart&&cart.w){const cr={l:cart.left,r:cart.left+cart.w,t:mt.getBoundingClientRect().top,b:mt.getBoundingClientRect().bottom};btns.forEach(x=>{if(ov(cr,R(x)))hits.push('cartouche~'+x.textContent.trim().slice(0,8))})}
   const mv=document.querySelector('.game.maptab .mapv');const sc=mv&&mv.querySelector('.mapsc');
   return{kind:document.querySelector('.kpmv')?'detail':'map',btns:btns.length,tit:tit.map(t=>t.textContent.trim().slice(0,30)),cart:!!cart,hits}});
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__mapKey2=null;tab='go';render()});await sleep(2500);
  const m1=await measure();if(DIR!=='-')await p.screenshot({path:`${DIR}/title-map-${W}.png`});
  await p.evaluate(()=>{const s=[...document.querySelectorAll('.mapw .mspot')].find(x=>x.classList.contains('here')||/Ngọc Thanh/.test(x.textContent));s.click()});await sleep(2500);
  const m2=await measure();if(DIR!=='-')await p.screenshot({path:`${DIR}/title-detail-${W}.png`});
  const ok=!m1.hits.length&&!(m2.hits||[]).length&&!errs.length;console.log(sz,ok?'PASS':'FAIL',JSON.stringify(m1),JSON.stringify(m2),errs.join('|'));if(!ok)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
