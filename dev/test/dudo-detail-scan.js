/* dudo-detail-scan: open EVERY clickable spot of Dư đồ (palace detail maps + areas), report: painted? title vs -/+ overlap? usage: node dev/test/dudo-detail-scan.js URL shotdir|- WxH@dpr,.. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,PAGEURL,DIR,SIZES]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0;
 for(const sz of (SIZES||'755x1000@2,412x1058@2,1180x820@2,1366x1024@2').split(',')){const [WH,DPR]=sz.split('@');const [W,H]=WH.split('x').map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:process.env.DESK?false:true,isMobile:process.env.DESK?false:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();p.setDefaultTimeout(90000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(PAGEURL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#krottip{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sleep(400);const srv=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!srv)break}
  const reset=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__mapKey2=null;tab='go';render()});
  await reset();await sleep(2500);
  const names=await p.evaluate(()=>[...document.querySelectorAll('.mapw .mspot')].map(s=>(s.querySelector('.mlab')||s).textContent.trim()));
  const rows=[];
  for(let i=0;i<names.length;i++){await reset();await sleep(700);
   const info=await p.evaluate(i=>{const s=document.querySelectorAll(".mapw .mspot")[i];if(!s)return 0;s.click();return 1},i);if(!info){rows.push({i,n:names[i],kind:"nospot"});continue}await sleep(1800);
   const r=await p.evaluate(()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return{l:r.left,t:r.top,r:r.right,b:r.bottom,w:r.width,h:r.height}};
    const kp=document.querySelector('#panel .kpmv, .game .kpmv');const mv=document.querySelector('.game .mapv');const ttl=document.querySelector('.maptools');
    const tools=[...document.querySelectorAll('.maptools .mz, .maptools button')].map(R).filter(Boolean);
    const hd=[...document.querySelectorAll('.maptools')].map(e=>({t:getComputedStyle(e,'::before').content,r:R(e)}));
    const imgs=[...document.querySelectorAll('.mapv img')];const sp=[...document.querySelectorAll('.mapv .mspot,.mapv .kpm-spot')].filter(s=>{const r=s.getBoundingClientRect();return r.width>0&&r.height>0});
    const mm=document.querySelector('.mapv .mapimg');const ov=(a,b)=>a&&b&&Math.min(a.r,b.r)-Math.max(a.l,b.l)>1&&Math.min(a.b,b.b)-Math.max(a.t,b.t)>1;const tt=R(document.querySelector('.mapv .kpm-t,.mapv .past')),btns=[...document.querySelectorAll('.maptools button')].map(e=>({n:e.textContent.trim().slice(0,8),r:R(e),vis:getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>0}));const olap=btns.filter(b=>b.vis&&ov(tt,b.r)).map(b=>b.n);
    return{kind:kp?'detail':(document.querySelector('.mapw')?'map':'other'),title:(document.querySelector('.mapv .kpm-title,.mapv .kmtitle,.mapv .mapttl')||{}).textContent,vis:sp.length,imgs:imgs.length,imgOk:imgs.filter(i=>i.complete&&i.naturalWidth>0).length,mm:mm?R(mm):null,tools:tools.slice(0,6),cls:mv&&mv.className,tt,btns:btns.map(b=>b.n+':'+(b.vis?Math.round(b.r.l)+','+Math.round(b.r.t)+','+Math.round(b.r.w)+'x'+Math.round(b.r.h):'hid')),olap}});
   rows.push({i,n:names[i],...r});if(DIR!=='-'&&r.kind==='detail')await p.screenshot({path:`${DIR}/detail-${sz.replace('@','x')}-${i}.png`})}
  console.log(sz,JSON.stringify(rows.filter(r=>r.kind!=='nospot'&&r.kind!=='other').map(r=>({n:r.n,k:r.kind,t:r.title,v:r.vis,im:r.imgOk+'/'+r.imgs,mm:r.mm&&[Math.round(r.mm.w),Math.round(r.mm.h)],tt:r.tt&&[Math.round(r.tt.l),Math.round(r.tt.t),Math.round(r.tt.w),Math.round(r.tt.h)],b:r.btns,ov:r.olap}))),errs.join('|'));
  await ctx.close()}
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
