const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
await p.goto('file://'+path.resolve('dev/index.html'),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
const r=await p.evaluate(()=>{const o={};for(const k in KG82_KIND){const v=KG82_KIND[k];o[k]={e:v.e,n:v.n,t:v.t,own:v.own,timed:v.timed}};
 o.__cal=typeof mgCalKinds==="function"?mgCalKinds():null;o.__skip=typeof BAL!=="undefined"&&BAL.skip?BAL.skip:null;o.__plain=KG82_PLAIN;o.__eng=Object.keys(KG82_ENG||{});return o});
console.log(JSON.stringify(r,null,0));console.error(errs.slice(0,3));await b.close()})();
