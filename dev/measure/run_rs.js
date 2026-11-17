/* review/residence-seats: sens bot (inpage6) + inresseat.js against a served build. A fresh page every PER lives (the bot page grows and
   crashes after a few lives); results accumulate across pages.  usage: node dev/measure/run_rs.js <url> <lives> <out.json> [capSeconds=3000] [per=4] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,target,OUT,CAP='3000',PER='4']=process.argv;
(async()=>{const b=await chromium.launch({args:['--blink-settings=imagesEnabled=false','--disable-dev-shm-usage']});const t0=Date.now();let acc=[];
 while(acc.length<+target&&Date.now()-t0<+CAP*1e3){const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort().catch(()=>{}));
  const page=await ctx.newPage();page.on('pageerror',e=>{console.log('PAGEERR',e.message.slice(0,200))});let got=[];
  try{await page.goto(URL);for(let i=0;i<300;i++){if(await page.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await page.waitForTimeout(300)}
   await page.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__nlInner=1;start();try{NLP=null}catch(e){}Q.length=0;render()});
   for(const f of ['inpage6.js','inresseat.js'])await page.evaluate(fs.readFileSync(path.join(__dirname,f),'utf8'));
   while(got.length<+PER&&Date.now()-t0<+CAP*1e3){const n=await page.evaluate(()=>window.__bot.step('sens',300));if(n!==got.length)got=await page.evaluate(()=>window.__res)}
  }catch(e){console.log('page lost:',String(e.message).slice(0,80),'kept',got.length)}
  acc=acc.concat(got);fs.writeFileSync(OUT,JSON.stringify(acc));await ctx.close().catch(()=>{})}
 console.log('lives',acc.length,'s',((Date.now()-t0)/1e3)|0);await b.close()})().catch(e=>{console.error(e);process.exit(1)});
