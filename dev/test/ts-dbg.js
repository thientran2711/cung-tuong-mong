/* debug helper for jts: node dev/test/ts-dbg.js <baseURL> "<js to eval after a fresh life>" */
const {chromium}=require('playwright');const [,,BASE,JS]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!isSrv())break}try{NLP=null}catch(e){}Q.length=0;render()});
 const r=await p.evaluate(JS);console.log(JSON.stringify(r,null,0).slice(0,4000));console.log('errs',errs.slice(0,5));await b.close()})();
