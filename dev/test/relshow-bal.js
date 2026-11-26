/* relshow-scan helper: node dev/test/relshow-bal.js <abs index.html> dev/test/relshow-bal.json — dumps BAL (signs for NEG); the json is not kept in git */
const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.goto('file://'+process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
const j=await p.evaluate(()=>JSON.stringify(BAL,(k,v)=>typeof v==='function'?undefined:v));require('fs').writeFileSync(process.argv[3],j);console.log('bytes',j.length,'errors',errs.length,errs.slice(0,3));await b.close()})();
