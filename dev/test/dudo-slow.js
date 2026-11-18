/* dudo-slow: the Dư đồ map with the map picture DELAYED/FAILED (slow or offline CDN): spots must still be laid out in view with a stable box (no collapse), then art appears.
   usage: node dev/test/dudo-slow.js URL shotdir|- WxH@dpr [delayMs|fail] */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,DIR,SZ,DELAY]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 let hold=false;const mapRe=process.env.DETAIL?/\/img\/(?!kit\/|ico)[^?]*\.webp/:/\/img\/map-[^/]*\.webp/;
 await ctx.route(u=>mapRe.test(u.pathname),async r=>{if(hold){if(DELAY==='fail')return r.abort();await sleep(+DELAY||6000)}try{await r.continue()}catch(e){}});
 const p=await ctx.newPage();p.setDefaultTimeout(90000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.kcf,#krottip{display:none!important}'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:180000});await sleep(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}});
 for(let i=0;i<15;i++){await sleep(400);const s=await p.evaluate(()=>{const s=isSrv();if(s)try{nlNew()}catch(e){}start();return s});if(!s)break}
 hold=true;await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__mapKey2=null;tab='go';render()});await sleep(process.env.DETAIL?300:1200);
 if(process.env.DETAIL){await p.evaluate(()=>{const s=[...document.querySelectorAll('.mapw .mspot.here, .mapw .mspot')].find(x=>/Ngọc Thanh/.test(x.textContent));s.click()});await sleep(1200)}
 const q=()=>p.evaluate(()=>{const sc=document.querySelector('.game.maptab .mapsc'),w=document.querySelector('.mapw'),img=document.querySelector('.mapimg');const sp=[...document.querySelectorAll('.mapw .mspot')];const q=sc.getBoundingClientRect();
  const inV=sp.filter(s=>{const r=s.getBoundingClientRect();return r.width>0&&r.height>0&&r.right>q.left&&r.left<q.right&&r.bottom>q.top&&r.top<q.bottom}).length;const wr=w.getBoundingClientRect();return{w:Math.round(wr.width),h:Math.round(wr.height),imgDone:img.complete&&img.naturalWidth>0,inView:inV,spots:sp.length,bg:getComputedStyle(sc).backgroundColor}});
 const early=await q();if(DIR!=='-')await p.screenshot({path:`${DIR}/slow-early-${W}.png`});
 await sleep(DELAY==='fail'?3000:(+DELAY||6000)+2500);const late=await q();if(DIR!=='-')await p.screenshot({path:`${DIR}/slow-late-${W}.png`});
 const need=process.env.DETAIL?1:3;const okEarly=early.h>100&&early.inView>=need;const okLate=DELAY==='fail'?true:(late.imgDone&&late.inView>=need);
 console.log(SZ,DELAY||6000,okEarly&&okLate?'PASS':'FAIL','early',JSON.stringify(early),'late',JSON.stringify(late),errs.join('|'));await b.close();process.exit(okEarly&&okLate?0:1)})().catch(e=>{console.error(e);process.exit(2)});
