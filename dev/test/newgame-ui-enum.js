/* review/newgame-ui: list every portrait the face picker can show at a new game (input of dev/art/tn_make.py). usage: node dev/test/newgame-ui-enum.js <url> <out.txt> */
const {chromium}=require('playwright');const sleep=t=>new Promise(r=>setTimeout(r,t));const fs=require('fs');
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await ctx.newPage();
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof FIGIX!=='undefined'&&FIGIX.maid&&Object.keys(FIGIX.maid).length>10,null,{timeout:120000});await sleep(3000);
 const r=await p.evaluate(()=>{const U=new Set(),st={};window.__nlInner=1;for(let i=0;i<120;i++){start();const k=S.rank+"/"+S.age+"/"+(isSrv()?"srv":"c");st[k]=(st[k]||0)+1;
   for(const f of ["consort","maid"])facePool(f).forEach(x=>U.add(x.por))}return {st,U:[...U]}});
 console.log(JSON.stringify(r.st));fs.writeFileSync(process.argv[3],r.U.join('\n'));console.log(r.U.length);await b.close()})();
