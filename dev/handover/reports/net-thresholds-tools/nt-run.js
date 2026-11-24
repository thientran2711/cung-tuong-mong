/* net-thresholds runner: runpers.js setup (inpage5 + inq72 + inbal bot) + nt-in.js; writes window.__nt + life results every loop. usage: node nt-run.js <out.json> [capSec] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const M=__dirname,GAME=path.join(M,'..','index.html');const out=process.argv[2],CAP=+process.argv[3]||1200;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844}});const page=await ctx.newPage();
 await page.route(u=>!/^file:/.test(String(u)),r=>r.abort());await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await page.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload({waitUntil:'domcontentloaded'});await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 await page.evaluate(`window.__servPolicy='';window.__aff=0;window.__balO=null;window.__fairO=null;window.__q72O=null;window.__xO=null;window.__q72off=0`);
 for(const f of ["inpage5.js","inq72.js","inbal.js","nt-in.js"])await page.evaluate(fs.readFileSync(path.join(M,f),'utf8'));
 const t0=Date.now();while(Date.now()-t0<CAP*1e3){let n=0;try{n=await page.evaluate(()=>window.__bot.step('sens',200))}catch(e){console.error('ERR',e.message.slice(0,200));break}
  fs.writeFileSync(out,JSON.stringify(await page.evaluate(()=>({nt:window.__nt,res:window.__res,lives:(window.__res||[]).length,wk:typeof wk==="function"?wk():0}))));if(n>=99)break}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
