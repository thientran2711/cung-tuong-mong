/* map-wait (KIT §85.11, MAIN 149 26/11): on a slow picture the Dư đồ shows the kit wait cue and NO tag / mark / board boxes until the painting + mark loaded;
   then every tag shows. Map pictures are delayed by DELAY ms (default 3000). usage: node dev/test/map-wait.js <url> <shotdir|-> [WxH,..] ; exit 1 on failure */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';
const [,,URL_,DIR,SIZES]=process.argv;const DELAY=+(process.env.DELAY||3000);const sl=t=>new Promise(r=>setTimeout(r,t));if(DIR&&DIR!=='-')fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();let fail=0;
for(const sz of (SIZES||'755x1000,1180x820').split(',')){const [W,H]=sz.split('x').map(Number);
 for(const road of ['palace','home']){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});let slow=false;
  await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
   if(slow&&/\/img\/(map-|kc-?map|kcmap|mark|kit\/memark|.*-map)/i.test(u.pathname))await sl(DELAY);
   if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
   for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.setDefaultTimeout(120000);
  await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
  await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
  for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}
  if(road==='home'){await p.evaluate(()=>{S.origin=ORIGINS.find(x=>x.k==='tt');S.kcPick='nha';Q=[];window.__bot=1;kcInit();delete window.__bot;Q=[]});await sl(800);for(let i=0;i<4;i++){const n=await p.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sl(700)}}
  slow=true;const url=await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;tab='go';render();const i=document.querySelector('.mapw>.mapimg');if(i){const s=i.src;i.src='';i.src=s+(s.includes('?')?'&':'?')+'w='+Date.now()}return i&&i.src});
  await sl(Math.min(1200,DELAY/2));
  const A=await p.evaluate(()=>{const w=document.querySelector('.mapw');if(!w)return{nomap:1};const vis=e=>e&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>0;return{ready:w.classList.contains('kmready'),cue:vis(w.querySelector('.kmwait')),tags:[...w.querySelectorAll('.mspot .mlab')].filter(vis).length,mark:[...w.querySelectorAll('.kmmapmk')].filter(vis).length}});
  if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/${sz}-${road}-wait.png`});
  await sl(DELAY+2500);
  const B=await p.evaluate(()=>{const w=document.querySelector('.mapw');if(!w)return{nomap:1};const vis=e=>e&&getComputedStyle(e).visibility!=='hidden'&&e.getBoundingClientRect().width>0;return{ready:w.classList.contains('kmready'),cue:!!w.querySelector('.kmwait'),tags:[...w.querySelectorAll('.mspot .mlab')].filter(vis).length}});
  if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/${sz}-${road}-ready.png`});
  const bad=A.nomap||B.nomap||A.ready||!A.cue||A.tags||A.mark||!B.ready||B.cue||!B.tags||errs.length;if(bad)fail++;console.log(sz,road,JSON.stringify({during:A,after:B,errs}),bad?'FAIL':'ok');await ctx.close()}}
await b.close();console.log(fail?`FAIL ${fail}`:'PASS');process.exit(fail?1:0)})();
