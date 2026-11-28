/* dtv-paint (OB-PHU3, owner OD 25/11 ~23:15Z: no stand-in picture reachable): Dưỡng Tú viện (place key dtv) in every season x buổi shows ITS OWN painting
   (img/duong-tu-vien-<xuan|ha|thu|dong>-<sang|trua|chieu>.webp by day, img/duong-tu-vien.webp at night), never the cung-nhan stand-in, and every file answers 200 on the CDN.
   usage: node dev/test/dtv-paint.js <url> [WxH] ; exit 1 on a stand-in / missing file */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';fs.mkdirSync(CACHE,{recursive:true});
const [,,URL_,SZ]=process.argv;const sl=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const [W,H]=(SZ||'1180x820').split('x').map(Number);let fail=0;const errs=[];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
 const seen=new Set();await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
  if(!u.pathname.endsWith('.json')&&fs.existsSync(c)){seen.add(u.pathname+' 200');return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct})}
  for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();seen.add(u.pathname+' '+res.status());if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL_,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#title,#kload{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sl(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='cn';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await sl(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
 const months={xuan:2,ha:5,thu:8,dong:11};const T=['sang','trua','chieu','toi'];
 for(const [se,m] of Object.entries(months))for(let bi=0;bi<4;bi++){
  const r=await p.evaluate(([m,bi])=>{S.month=m;S.buoi=bi;S.place='dtv';render();try{renderStage()}catch(e){}return{sc:placeOf('dtv').sc,img:sceneImg(SCIMG[placeOf('dtv').sc]),bg:document.getElementById('scimg').style.backgroundImage}},[m,bi]);await sl(300);
  const want=bi<3?`duong-tu-vien-${se}-${T[bi]}`:'duong-tu-vien';const ok=r.img===want&&r.bg.includes(want+'.webp')&&!/cung-nhan/.test(r.bg);if(!ok)fail++;console.log(se,T[bi],r.img,ok?'ok':'FAIL '+r.bg)}
 await sl(1500);const files=[...seen].filter(x=>/duong-tu-vien/.test(x));const bad=files.filter(x=>!/ 200$/.test(x));console.log('files loaded',files.length,bad.length?'NOT 200: '+bad.join(','):'all 200');if(bad.length)fail++;
 if(errs.length){fail++;console.log('errors',errs.slice(0,3).join(' || '))}
 await b.close();console.log(fail?`FAIL ${fail}`:'PASS');process.exit(fail?1:0)})();
