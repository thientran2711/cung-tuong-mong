const {chromium}=(require('../../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
(async()=>{const b=await chromium.launch();for(const f of process.argv.slice(2)){const ctx=await b.newContext({serviceWorkers:'block'});
 await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a)(\?|$)/i,r=>r.abort());
 await ctx.route('http://ts.local/**',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:fs.readFileSync(path.resolve(f))}));
 const p=await ctx.newPage();await p.goto('http://ts.local/x.html',{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const r=await p.evaluate(()=>{const out={};SLOT=3;for(let i=0;i<60;i++){try{localStorage.clear()}catch(e){}start();try{NLP=null}catch(e){}if(S.srv)continue;const k=S.origin.k;(out[k]=out[k]||[]).push([S.rank,S.danh,S.sung,S.duc,S.bac,S.th])}
  const agg={};for(const k in out){const a=out[k];agg[k]=[a.length,...[0,1,2,3,4,5].map(j=>Math.round(a.reduce((s,x)=>s+x[j],0)/a.length))]}return agg});
 console.log(f,'origin: [n, rank, danh, sung, duc, bac, th]',JSON.stringify(r));await ctx.close()}await b.close()})();
