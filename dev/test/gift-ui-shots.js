/* review/gift-ui shots + checks: Emperor card daytime acts (Gặp ngài ban ngày: yết kiến / hầu cờ / đánh đàn / dạo vườn, one a day),
   a dialog with its own banner (img/ev-<key>.webp), the gift dialog, the Tuần lục first page.
   usage: node dev/test/gift-ui-shots.js <url> <W>x<H>@dpr <outdir> <tag>
   Prints JSON per step: overflowX, clipped leaf text, the reasons on the Emperor buttons, the banner file. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 /* POR_FACE=<file>: serve that img/POR_FACE2.json (before it is on the CDN) */
 if(process.env.POR_FACE)await p.route('**/img/POR_FACE2.json',r=>r.fulfill({path:process.env.POR_FACE,contentType:'application/json',headers:{'access-control-allow-origin':'*'}}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(4000);
 const rot=await p.evaluate(()=>{const e=document.querySelector('#rotate,.rotate,#rot');return e?getComputedStyle(e).display!=='none'&&e.offsetParent!==null:false});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  S.arts=S.arts||{};S.arts.ky=Math.max(2,S.arts.ky||0);S.arts.cam=Math.max(1,S.arts.cam||0);S.where=S.where||{};S.where.emp="vuon";S.buoi=1;
  try{k61Meet(S.emp,"gặp",3)}catch(e){}try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}render()});
 await p.waitForTimeout(1500);
 const settle=()=>p.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent&&i.getBoundingClientRect().width>30).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:12000}).catch(()=>{});
 const shot=async n=>{await settle();return p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:80})};
 const meas=()=>p.evaluate(()=>{const vw=innerWidth;const cut=[...document.querySelectorAll('#panel *, #modal *')].filter(e=>e.offsetParent&&e.children.length===0&&e.textContent.trim()&&e.scrollWidth>e.clientWidth+2&&['hidden','clip'].includes(getComputedStyle(e).overflowX)).slice(0,6).map(e=>e.className+':'+e.textContent.slice(0,40));
  return{ovf:document.documentElement.scrollWidth>vw+1,cut}});
 const R={rot};
 /* 1. the Emperor card, fresh day */
 const emp=async n=>{await p.evaluate(()=>{tab="court";PG.court=0;render()});await p.waitForTimeout(1600);
  await p.evaluate(()=>{const g=[...document.querySelectorAll('#panel button[data-kmemp],#panel button[data-acask],#panel button[data-kgmgive]')][0];if(g)g.scrollIntoView({block:'center'})});await p.waitForTimeout(400);await shot(n);
  return Object.assign(await meas(),{btns:await p.evaluate(()=>[...document.querySelectorAll('#panel button[data-kmemp],#panel button[data-acask],#panel button[data-kgmgive],#panel button[data-kgmgo]')].map(b=>(b.disabled?'[x] ':'')+b.innerText.replace(/\s+/g,' ').slice(0,110)))})};
 R.emp=await emp('hoangthuong');
 /* 1b. portraits: Phi tần strip + card (jkpor zoom per picture, must stay within [1, 1.14]) */
 await p.evaluate(()=>{tab="rv";PG.rv=0;render()});await p.waitForTimeout(2500);await shot('phitan');
 R.por=await p.evaluate(()=>{const z=[...document.querySelectorAll('img.kpor.kporz')].map(i=>+i.dataset.kpz).filter(x=>x>0);return{n:z.length,min:Math.min(...z),max:Math.max(...z)}});
 /* 2. play "Xin hầu cờ" → result card with the choice */
 await p.evaluate(()=>{const b=document.querySelector('#panel button[data-kmemp="ky"]');if(b&&!b.disabled)b.click()});await p.waitForTimeout(1500);await shot('haucco');R.hauco=Object.assign(await meas(),{t:await p.evaluate(()=>document.getElementById('mt')?.textContent||'')});
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 R.emp2=await emp('hoangthuong-dadung');
 /* 2b. he is at Dưỡng Tâm điện (Xin yết kiến): the same one-a-day reason */
 await p.evaluate(()=>{S.where.emp="dtd";S.rank0=S.rank;S.rank=4;render()});R.emp3=await emp('hoangthuong-yetkien');await p.evaluate(()=>{S.rank=S.rank0;S.where.emp="vuon";render()});
 /* 3. a dialog with its own banner */
 await p.evaluate(()=>{tab="me";render();Q.length=0;e68Test("thMama")});await p.waitForTimeout(2500);await shot('banner-thmama');
 R.banner=Object.assign(await meas(),{src:await p.evaluate(()=>(document.querySelector('#mb img')||{}).src||'')});
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 /* 4. the gift dialog */
 await p.evaluate(()=>{const ix=S.inv.findIndex(e=>e&&e.k==="tramngoc");itemAct("gift",ix)});await p.waitForTimeout(2000);await shot('tangqua');R.gift=await meas();
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 console.log(JSON.stringify(Object.assign(R,{errs})));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
