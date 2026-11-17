/* review/residence-seats: sens bot (inpage6) + inresseat.js against a served build. A fresh page every PER lives (the bot page grows and
   crashes after a few lives); results accumulate across pages.  usage: node dev/measure/run_rs.js <url> <lives> <out.json> [capSeconds=3000] [per=4] [lifeMonths=120]
   Crash fix (17/11, successor): images are SERVED as a 1x1 png, never disabled. With --blink-settings=imagesEnabled=false every <img> stays
   "pending" forever, Blink keeps it alive as a pending activity and with it the whole detached dialog tree (3.5 M nodes after ~11 months
   -> "Target crashed"). Audio/video are still aborted. Each life stops at lifeMonths (10 game years) so 150 lives per side fit in a day. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,target,OUT,CAP='3000',PER='4',LM='120']=process.argv;const PX=Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=','base64');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage']});const t0=Date.now();let acc=[];
 while(acc.length<+target&&Date.now()-t0<+CAP*1e3){const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(/\.(webp|png|jpg|jpeg|gif|svg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:PX}).catch(()=>{}));
  await ctx.route(/\.(mp3|ogg|mp4|webm|wav|m4a)(\?|$)/,r=>r.abort().catch(()=>{}));
  const page=await ctx.newPage();page.on('pageerror',e=>{console.log('PAGEERR',e.message.slice(0,200))});let got=[];
  try{await page.goto(URL);for(let i=0;i<300;i++){if(await page.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await page.waitForTimeout(300)}
   await page.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__nlInner=1;start();try{NLP=null}catch(e){}Q.length=0;render()});
   await page.evaluate(m=>{window.__rsCap=m;window.__rsFast=1},+LM);for(const f of ['inpage6.js','inresseat.js'])await page.evaluate(fs.readFileSync(path.join(__dirname,f),'utf8'));
   while(got.length<+PER&&Date.now()-t0<+CAP*1e3){const n=await page.evaluate(()=>window.__bot.step('sens',300));if(n!==got.length)got=await page.evaluate(()=>window.__res)}
  }catch(e){console.log('page lost:',String(e.message).slice(0,80),'kept',got.length)}
  acc=acc.concat(got);fs.writeFileSync(OUT,JSON.stringify(acc));await ctx.close().catch(()=>{})}
 console.log('lives',acc.length,'s',((Date.now()-t0)/1e3)|0);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
