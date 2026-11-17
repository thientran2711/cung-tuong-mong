/* kit-size9-sheet.js — kit page samples for the grade chip on the frame: the reveal card (kitRevealHTML), the items3 sheet (sizes, 6.2 card, 6.3 pick grid, 6.5 tags, wear row), the §54.1 / §28.13 kit page rows. usage: node dev/test/kit-size9-sheet.js <url> <outdir outside the repo> [WxH] */
const {chromium}=require('playwright');const [,,URL,OUT,SZ]=process.argv;
(async()=>{const [W,H]=(SZ||'1180x820').split('x').map(Number);const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL+'?khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitSizeSheet==='function'&&typeof kitRevealHTML==='function',null,{timeout:90000});await p.waitForTimeout(3000);
 await p.evaluate(()=>{const d=document.createElement('div');d.id='rv';d.style.cssText='position:fixed;left:0;top:0;z-index:99999;background:#1a0f0a;padding:20px;width:760px;display:flex;gap:30px;justify-content:center';d.innerHTML=[['nhansam',{from:'Thái hậu ban'}],['tramngoc',{}],['luahang',{noSub:true}]].map(([k,o])=>kitRevealHTML(kitItemInfo(k),o)).join('');document.body.appendChild(d)});await p.waitForTimeout(2500);
 await p.locator('#rv').screenshot({path:OUT+'/reveal-'+W+'.png'});await p.evaluate(()=>document.getElementById('rv').remove());
 await p.evaluate(()=>{try{kitSizeSheet('items3')}catch(e){console.error(e)}});await p.waitForTimeout(2500);
 const el=await p.$('#kszsheet');if(el){const bb=await el.boundingBox();console.log('sheet',Math.round(bb.width),Math.round(bb.height));await el.screenshot({path:OUT+'/items3-'+W+'.png'})}
 console.log('errs',errs.length,errs.slice(0,3));await b.close()})();
