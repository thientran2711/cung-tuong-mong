// review/hoang-tu balance check: bot lives (inpage5 sens|rand) on a local page (file path), results like runb.js (an7.py reads them).
// usage: node dev/measure/htbal.js <page.html> <sens|rand> <lives> <out.json>   env CAP=<seconds>
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,mode,N,out]=process.argv;const target=+N||100;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});const p=await ctx.newPage();p.setDefaultTimeout(900000);
 p.on('pageerror',e=>console.log('PAGEERR',e.message.slice(0,200)));
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0});
 await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage5.js'),'utf8'));
 const t0=Date.now();let n=0;
 while(true){n=await p.evaluate(m=>window.__bot.step(m,300),mode);fs.writeFileSync(out,JSON.stringify(await p.evaluate(()=>window.__res)));
  if(n>=target)break;if(Date.now()-t0>(+process.env.CAP||1500)*1e3){console.log('time cap',n);break}}
 await b.close()})().catch(e=>{console.error(e);process.exit(1)});
