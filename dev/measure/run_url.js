/* bot balance run against a served build (no scratchpad paths).
   usage: node dev/measure/run_url.js <url> <mode sens|rand> <lives> <out.json> [inpage file, default inpage5.js]
   then: python3 dev/measure/an7.py <out.json> */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const [,,URL,mode,target,OUT,INP]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 /* URL "root/<file>" = serve the repo root from disk through the browser (no separate server) */
 let U=URL;if(/^root\//.test(URL)){const R=path.resolve(__dirname,'../..');await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new globalThis.URL(r.request().url()).pathname);const f=R+u;if(!fs.existsSync(f))return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':/\.webp$/.test(f)?'image/webp':'application/octet-stream',body:fs.readFileSync(f)})});U='http://ts.local/'+URL.slice(5)}
 const page=await ctx.newPage();
 page.on('pageerror',e=>{console.log('PAGEERR',e.message.slice(0,200))});
 await page.goto(U);await page.waitForTimeout(1500);
 await page.evaluate(()=>{try{localStorage.clear()}catch(e){}});await page.reload();await page.waitForTimeout(2500);
 await page.evaluate(()=>{SLOT=3;const t=document.getElementById('title');if(t)t.hidden=true;try{store.set(NL_KEY,null)}catch(e){}start();try{NLP=null}catch(e){}Q.length=0;render()});
 await page.evaluate(fs.readFileSync(path.join(__dirname,INP||'inpage5.js'),'utf8'));
 const t0=Date.now();let n=0;
 while(true){n=await page.evaluate(([m])=>window.__bot.step(m,300),[mode]);
  if(n!==globalThis.__ln){globalThis.__ln=n;fs.writeFileSync(OUT,JSON.stringify(await page.evaluate(()=>window.__res)))}
  if(n>=+target)break;if(Date.now()-t0>5400e3){console.log('time cap');break}}
 fs.writeFileSync(OUT,JSON.stringify(await page.evaluate(()=>window.__res)));
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
