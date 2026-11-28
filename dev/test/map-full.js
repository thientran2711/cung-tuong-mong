/* map-full: Dư đồ full screen (KIT §85.6). Scan: map width / page width = 100 % and map height = page height at every size, on the palace map and the courtyard level;
   tools row + side columns are overlays (inside the map box). usage: node dev/test/map-full.js <url> <shotdir|-> [WxH,..] [cache] ; localhost urls bypass the proxy */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.argv[5]||process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,URL_,DIR,SIZES]=process.argv;const sl=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});let bad=0;
for(const sz of (SIZES||'755x1000,1180x820,1366x1024,412x1058,390x844').split(',')){const [W,H]=sz.split('x').map(Number);const errs=[];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
  if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
  for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!s)break}
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;tab='go';render()});await sl(2500);
 const scan=()=>p.evaluate(()=>{const q=s=>document.querySelector(s),r=e=>e&&e.getBoundingClientRect();const v=q('.game.maptab .mapv'),m=q('.game.maptab .mapv>.mapsc'),t=q('.mapv>.maptools');if(!v||!m)return{nomap:1};
  const a=r(v),c=r(m),tl=r(t);const inside=e=>{const x=r(e);return !x||x.width===0||(x.left>=a.left-1&&x.right<=a.right+1&&x.top>=a.top-1&&x.bottom<=a.bottom+1)};
  return{pageW:Math.round(a.width),pageH:Math.round(a.height),mapW:Math.round(c.width),mapH:Math.round(c.height),pct:Math.round(c.width/a.width*1000)/10,pctH:Math.round(c.height/a.height*1000)/10,
   toolsOverlay:!!tl&&tl.top<=c.top+12&&tl.bottom<=c.bottom,colsInside:inside(q('#kshR'))&&inside(q('#krail')),hz:document.documentElement.scrollWidth<=innerWidth+1}});
 const res={};res.map=await scan();if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/full-map-${sz}.png`});
 await p.evaluate(()=>{window.__mapZ=0;kpmOpenSlot(0,null)});await sl(1500);res.court=await scan();if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/full-court-${sz}.png`});
 const ok=['map','court'].every(k=>res[k].pct>=99.5&&res[k].pctH>=99.5&&res[k].toolsOverlay!==false&&res[k].hz)&&res.map.toolsOverlay&&res.map.colsInside&&!errs.length;
 console.log(sz,ok?'PASS':'FAIL',JSON.stringify(res),errs.join('|'));if(!ok)bad++;await ctx.close()}
await b.close();process.exit(bad?1:0)})();
