const {chromium}=require('playwright');const [,,URL,CODE]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
 await p.goto(URL,{timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof ilAudit==='function',null,{timeout:0});
 const r=await p.evaluate(new Function(require('fs').readFileSync(CODE,'utf8')));console.log(JSON.stringify({r,errs:errs.slice(0,8)},null,1));await b.close()})();
