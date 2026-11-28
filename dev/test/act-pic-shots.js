/* act-pic-shots.js (review/act-pic-match): full-screen shots of the Hành sự list, every tab, on the priority devices (Fold 755x1000@2, iPad 1180x820@2).
   Real pictures from the CDN. ACTS_FILE=<local ACTS.json> tests a manifest before it goes live.
   usage: [ACTS_FILE=x.json] node dev/test/act-pic-shots.js <build url> <outdir> [WxH@dpr,...]  -> <outdir>/<WxH>-<tab>.jpg, prints tabs + page errors + horizontal overflow */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const [,,URL,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 for(const v of (SZ||"755x1000@2,1180x820@2").split(",")){const [sz,d]=v.split("@");const [W,H]=sz.split("x").map(Number);const errs=[];
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,hasTouch:true,isMobile:W<1000,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  if(process.env.ACTS_FILE)await ctx.route(/img\/ACTS\.json/,r=>r.fulfill({status:200,contentType:'application/json',headers:{'access-control-allow-origin':'*'},body:fs.readFileSync(process.env.ACTS_FILE)}));
  const p=await ctx.newPage();p.setDefaultTimeout(120000);p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function');await sleep(3000);await p.addStyleTag({content:'#kroul,.kroul,.krbox,.kcf-w,.kmov.kcf{display:none!important}'});
  await p.waitForFunction(()=>typeof KIT_ACTS!=='undefined'&&KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:90000});
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
   quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw,#klife,#curtain').forEach(e=>e.remove());try{fillStaff(S,true)}catch(e){}render()});
  for(let i=0;i<25;i++){await p.evaluate(()=>{const g=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^\s*(Nhận|Đóng|Đã rõ|Xong|Đã hiểu|Tiếp tục)\s*$/.test(x.textContent))[0];if(g)g.click();Q.length=0});await sleep(250)}
  const tabs=await p.evaluate(()=>[...new Set([...document.querySelectorAll('[data-tab]')].map(b=>b.dataset.tab))]);console.log(v,'tabs',tabs.join(','));
  for(const t of tabs){for(let i=0;i<2;i++){await p.evaluate(()=>{const g=[...document.querySelectorAll('button')].filter(x=>x.offsetParent&&/^\s*(Nhận|Đóng|Đã rõ|Xong|Đã hiểu|Tiếp tục)\s*$/.test(x.textContent))[0];if(g)g.click();Q.length=0});await sleep(200)}
   await p.evaluate(t=>{tab=t;for(const k in PG)PG[k]=0;render()},t);await sleep(1800);
   const ov=await p.evaluate(()=>document.documentElement.scrollWidth-document.documentElement.clientWidth);
   await p.screenshot({path:`${OUT}/${W}x${H}-${t}.jpg`,type:'jpeg',quality:72});console.log(' ',t,'overflow',ov)}
  console.log(v,'page errors',errs.length,errs.slice(0,3));await ctx.close()}
 await b.close()})();
