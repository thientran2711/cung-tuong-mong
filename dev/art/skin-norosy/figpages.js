/* figpages.js <url> <WxH@dpr> <outdir> : boot + new game + every main tab (people pictures: stage, Hậu cung, Giao tình, Hoàng tự, Tư trang…)
   counts fig-/por- pictures shown, broken ones (naturalWidth 0) and page errors; one small shot per tab. */
const {chromium}=require('playwright');const fs=require('fs');const [,,PAGE,VP,OUT]=process.argv;const m=/^(\d+)x(\d+)@([\d.]+)$/.exec(VP);const W=+m[1],H=+m[2],DPR=+m[3];const sleep=t=>new Promise(r=>setTimeout(r,t));fs.mkdirSync(OUT,{recursive:true});
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(Object.assign({args:['--disable-dev-shm-usage']},px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{}));
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',ignoreHTTPSErrors:true});
 await ctx.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 await p.goto(PAGE,{waitUntil:'domcontentloaded',timeout:240000});
 for(let i=0;i<400;i++){const s=await p.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)&&!document.getElementById('kload')?'ok':''}).catch(()=>'');if(s)break;await sleep(500)}
 await sleep(1500);await p.addStyleTag({content:'.kmov{display:none!important}'});
 await p.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
  quiet=true;S.rank=5;S.bac=300;fillStaff(S,true);S.buoi=0;used=0;tab="act";goTo("home");render();quiet=false;render()});
 await sleep(3000);
 const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button, .tabs button, nav button')].filter(x=>x.offsetParent!==null).map(x=>x.textContent.trim()).filter(t=>t&&t.length<20));
 const res=[];let k=0;
 for(const t of tabs){if(/Sang buổi/.test(t))continue;await p.evaluate(t=>{const x=[...document.querySelectorAll('#tabs button, .tabs button, nav button')].find(e=>e.offsetParent!==null&&e.textContent.trim()===t);if(x)x.click()},t);await sleep(2500);
  for(let w=0;w<30;w++){const ok=await p.evaluate(()=>[...document.querySelectorAll('img')].filter(i=>/\/(fig|por)-/.test(i.currentSrc||i.src)&&i.offsetParent!==null).every(i=>i.complete));if(ok)break;await sleep(400)}
  const r=await p.evaluate(()=>{const L=[...document.querySelectorAll('img')].filter(i=>/\/(fig|por)-/.test(i.currentSrc||i.src)&&i.offsetParent!==null);return{n:L.length,broken:L.filter(i=>!i.naturalWidth).map(i=>i.src.split('/').pop())}});
  r.tab=t;res.push(r);k++;await p.screenshot({path:`${OUT}/${VP.replace('@','_')}-${k}.jpg`,type:'jpeg',quality:45})}
 console.log(JSON.stringify({vp:VP,tabs:res,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
