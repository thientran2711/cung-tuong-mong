const {chromium}=require('playwright');(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.route(u=>!/^file:/.test(String(u)),r=>r.abort());await p.goto('file://'+process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForTimeout(2000);
const r=await p.evaluate(()=>{const o={};try{o.tea=["tragoi","trahop","tramoc"].map(k=>IT[k].d.split(" · ")[0]);}catch(e){o.tea=String(e)}
try{o.pet=ACT.petcare.x}catch(e){o.pet=String(e)}try{o.aout=AOUT.petcare}catch(e){o.aout=String(e)}return o});
console.log(JSON.stringify(r,null,1));console.log('errors',errs.length,errs.slice(0,3));await b.close()})();
