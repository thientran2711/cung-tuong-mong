/* an OLD save (a build without the module under test): start a consort life, play a few buổi, write ser() to <out.json>.
   usage: node dev/test/mk-oldsave2.js <url of the old build> <out.json> */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const fs=require('fs');const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});await ctx.route(u=>/ctmload=1/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<15;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:60000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()))break}
 const d=await p.evaluate(()=>{Q.length=0;S.inv.push({k:'nhansam'});for(let i=0;i<3;i++){Q.length=0;try{nextBuoi()}catch(e){}}Q.length=0;return JSON.stringify(ser())});
 fs.writeFileSync(OUT,d);console.log(JSON.stringify({len:d.length,errs:errs.slice(0,3)}));await b.close()})();
