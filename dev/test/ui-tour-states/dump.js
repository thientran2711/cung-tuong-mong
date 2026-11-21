const {chromium,openPage,gameFrame}=require('./lib');const seed=require('./seed');const walk=require('./walk');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1,ctm.local'}}:{});
 const {p}=await openPage(b,755,1000);const f=await gameFrame(p);await p.waitForTimeout(2500);
 const opt=JSON.parse(process.argv[2]||'{}');console.log(JSON.stringify(await f.evaluate(`(${seed.rich})(${JSON.stringify(opt)})`)));
 await walk(f,async path=>{const t=await f.evaluate(()=>(document.getElementById('panel')||{}).innerText||'');console.log('## '+path.join(' › ')+'\n   '+t.replace(/\s+/g,' ').slice(0,260))});
 console.log(p.errs);await b.close()})();
