/* dudo-blank: the Dư đồ map must PAINT (spots visible, art loaded, canvas/stage non-zero) within N s of opening, at every priority size.
   usage: node dev/test/dudo-blank.js <page URL> <shotdir|-> [WxH@dpr,..] [maxSeconds] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,PAGEURL,DIR,SIZES,MAXS]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));const MAX=+(MAXS||8);
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
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__mapKey2=null;tab='go';render()});
  const t0=Date.now();let last=null,okAt=null;
  const probe=()=>p.evaluate(()=>{const w=document.querySelector('.mapw'),v=document.querySelector('.mapv'),sc=document.querySelector('.game.maptab .mapsc');if(!w)return{nomap:1};const R=e=>{const r=e.getBoundingClientRect();return{w:Math.round(r.width),h:Math.round(r.height)}};
   const sp=[...document.querySelectorAll('.mapw .mspot')];const vis=sp.filter(s=>{const r=s.getBoundingClientRect();const cs=getComputedStyle(s);return r.width>0&&r.height>0&&cs.visibility!=='hidden'&&cs.display!=='none'&&+cs.opacity>0.05});
   const inView=vis.filter(s=>{const r=s.getBoundingClientRect(),q=sc.getBoundingClientRect();return r.right>q.left&&r.left<q.right&&r.bottom>q.top&&r.top<q.bottom});
   const imgs=[...document.querySelectorAll('.mapw img,.mapv img')];const bgs=[...document.querySelectorAll('.mapw *,.mapv')].filter(e=>/url\(/.test(getComputedStyle(e).backgroundImage));
   return{wr:R(w),vr:v&&R(v),sc:R(sc),spots:sp.length,vis:vis.length,inView:inView.length,imgs:imgs.length,imgOk:imgs.filter(i=>i.complete&&i.naturalWidth>0).length,bgs:bgs.length,z:window.__mapFit,tf:getComputedStyle(w).transform,op:getComputedStyle(w).opacity}});
  while(Date.now()-t0<MAX*1000){last=await probe();if(!last.nomap&&last.inView>=3&&last.imgs===last.imgOk){okAt=Date.now()-t0;break}await sleep(300)}
  await sleep(500);const fin=await probe();
  if(DIR!=='-')await p.screenshot({path:`${DIR}/dudo-${sz.replace('@','x')}.png`});
  const ok=okAt!=null&&!errs.length;console.log(sz,ok?'PASS':'FAIL','okAt',okAt,JSON.stringify(fin),errs.join('|'));if(!ok)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
