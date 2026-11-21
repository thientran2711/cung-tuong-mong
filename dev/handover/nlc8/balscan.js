// usage: node balscan.js <liveIndex.html> <branchIndex.html> <assetRoot>
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const [LIVE,BR,ROOT]=process.argv.slice(2);
async function grab(b,file){const ctx=await b.newContext({viewport:{width:755,height:1000}});
 await ctx.route('http://ctm.local/**',async r=>{const u=new URL(r.request().url());let p=decodeURIComponent(u.pathname);
  if(p==='/'||p==='/index.html')return r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:fs.readFileSync(file)});
  if(p==='/sw.js')return r.fulfill({status:404,body:''});
  const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,body:fs.readFileSync(f)})});
 const p=await ctx.newPage();await p.goto('http://ctm.local/',{waitUntil:'domcontentloaded',timeout:180000});
 await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof BAL==='object',null,{timeout:180000});
 const r=await p.evaluate(()=>{const L={};const seen=new Set();(function walk(o,k,d){if(d>14)return;if(o&&typeof o==='object'){if(seen.has(o))return;seen.add(o);for(const x of Object.keys(o))walk(o[x],k+'.'+x,d+1)}else if(typeof o!=='function')L[k]=JSON.stringify(o)})(BAL,'BAL',0);
  const F=Object.keys(window).filter(k=>{try{return typeof window[k]==='function'}catch(e){return false}});return{L,F}});await ctx.close();return r}
(async()=>{const b=await chromium.launch();const a=await grab(b,LIVE),c=await grab(b,BR);await b.close();
 const miss=Object.keys(a.L).filter(k=>!(k in c.L)),diff=Object.keys(a.L).filter(k=>k in c.L&&a.L[k]!==c.L[k]),add=Object.keys(c.L).filter(k=>!(k in a.L));
 const fm=a.F.filter(k=>!c.F.includes(k)),fa=c.F.filter(k=>!a.F.includes(k));
 console.log(JSON.stringify({leaves:[Object.keys(a.L).length,Object.keys(c.L).length],missing:miss.length,changed:diff.length,added:add.length,fnMissing:fm,fnAdded:fa.length},null,0));
 console.log('MISSING',JSON.stringify(miss));console.log('CHANGED',JSON.stringify(diff.map(k=>[k,a.L[k],c.L[k]])));})();
