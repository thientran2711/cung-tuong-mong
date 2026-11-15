/* quick bot check: the sensible bot (dev/measure/inpage4.js) plays N lives with ONE seeded Math.random on two builds;
   a rule change that keeps the numbers must give the same lives. usage: node dev/test/bot-same.js <urlA> <urlB> [lives] [mode] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,A,B,NL,MODE]=process.argv;const N=+NL||12,mode=MODE||'sens';
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
async function run(b,url){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Date.now=(()=>{let d=1.7e12;return()=>d+=1000})()});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.evaluate(INP);
 let n=0,guard=0;while(n<N&&guard++<400)n=await p.evaluate(([m])=>window.__bot.step(m,300),[mode]);
 const res=await p.evaluate(()=>window.__res.map(r=>({o:r.origin,rank:r.rank,max:r.maxRank,t:r.turns,f:String(r.fate||r.title||'').slice(0,40),err:r.err})));await ctx.close();return{res:res.slice(0,N),errs}}
(async()=>{const b=await chromium.launch();const ra=await run(b,A),rb=await run(b,B);await b.close();
 const same=JSON.stringify(ra.res)===JSON.stringify(rb.res);const hh=r=>r.res.filter(x=>x.max>=7).length;
 console.log(JSON.stringify({lives:[ra.res.length,rb.res.length],same,hhA:hh(ra),hhB:hh(rb),diff:ra.res.map((x,i)=>JSON.stringify(x)!==JSON.stringify(rb.res[i])?[x,rb.res[i]]:null).filter(Boolean).slice(0,4),errsA:ra.errs.slice(0,3),errsB:rb.errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
