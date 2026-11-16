const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,ignoreHTTPSErrors:true,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,150)));
await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitOptPic==='function',null,{timeout:60000});await p.waitForTimeout(6000);
const titles=JSON.parse(require('fs').readFileSync(process.argv[3]));
const r=await p.evaluate(t=>t.map(x=>{const q=kitOptPic(x);return [x,q.how,q.key]}),titles);
const bad=r.filter(x=>x[1]==='ph');console.log('titles',r.length,'on placeholder',bad.length,JSON.stringify(bad));
const keys=[...new Set(r.map(x=>x[2]))];const map={};r.forEach(x=>{(map[x[2]]=map[x[2]]||[]).push(x[0])});
require('fs').writeFileSync(process.argv[4],JSON.stringify(map,null,1));
console.log('errors',errs.length,errs.slice(0,2));await b.close()})()
