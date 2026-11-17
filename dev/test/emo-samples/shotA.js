const {chromium}=require('playwright');const fs=require('fs');
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push(m.text())});
await p.goto('http://localhost:8123/'+process.argv[2]);await p.waitForFunction(()=>window.DONE||window.ERR,null,{timeout:120000});
const r=await p.evaluate(()=>({err:window.ERR,d:window.DONE}));if(r.err){console.log('ERR',r.err,errs);process.exit(1)}
fs.writeFileSync(process.argv[3],Buffer.from(r.d.split(',')[1],'base64'));console.log('ok',errs);await b.close()})();
