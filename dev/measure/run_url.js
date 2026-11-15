/* bot balance run against a served build (no scratchpad paths).
   usage: node dev/measure/run_url.js <url> <mode sens|rand> <lives> <out.json> [inpage file, default inpage5.js]
   then: python3 dev/measure/an7.py <out.json> */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,mode,target,OUT,INP]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const page=await ctx.newPage();
 page.on('pageerror',e=>{console.log('PAGEERR',e.message.slice(0,200))});
 await page.goto(URL);await page.waitForTimeout(1500);
 await page.evaluate(()=>{try{localStorage.clear()}catch(e){}});await page.reload();await page.waitForTimeout(2500);
 await page.evaluate(()=>{SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();try{NLP=null}catch(e){}Q.length=0;render()});
 await page.evaluate(fs.readFileSync(path.join(__dirname,INP||'inpage5.js'),'utf8'));
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  if(n%5===0)fs.writeFileSync(OUT,JSON.stringify(await page.evaluate(()=>window.__res)));
  if(n>=+target)break;if(Date.now()-t0>5400e3){console.log('time cap');break}}
 fs.writeFileSync(OUT,JSON.stringify(await page.evaluate(()=>window.__res)));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
