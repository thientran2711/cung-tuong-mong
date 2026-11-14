/* quick look at the loader state every 2 s (dev aid). usage: node dev/test/load-dbg.js <url> [seconds] */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();
p.on('pageerror',e=>console.log('ERR',e.message));p.on('console',m=>{if(m.type()==='error')console.log('CON',m.text().slice(0,200))});
await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});
for(let i=0;i<(+process.argv[3]||16)/2;i++){await new Promise(r=>setTimeout(r,2000));console.log(JSON.stringify(await p.evaluate(()=>window.KLOAD)),await p.evaluate(()=>!!document.getElementById('kload')))}
await b.close()})();
