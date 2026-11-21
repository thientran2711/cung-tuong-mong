const fs=require('fs');const {chromium}=require('playwright');
const F=fs.readFileSync('/home/user/wt/e43-out/qcfns.js','utf8');
eval(F.replace(/^const /gm,'global.'));
(async()=>{const url=process.argv[2],N=+process.argv[3]||6;const b=await chromium.launch();
for(let i=0;i<N;i++){const ctx=await b.newContext({viewport:{width:1180,height:820}});const p=await ctx.newPage();
 await p.goto(url);await p.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:120000});await p.waitForTimeout(1500);
 await p.evaluate(NEWLIFE);await p.waitForFunction(SETTLE,null,{polling:150,timeout:60000}).catch(()=>{});
 const info=await p.evaluate(()=>({o:S.origin&&S.origin.k,kc:typeof isKc==='function'&&isKc(),place:S.place}));
 const cdp=await ctx.newCDPSession(p);await cdp.send('Profiler.enable');await cdp.send('Profiler.start');
 const bu=await p.evaluate(BUOI);const {profile}=await cdp.send('Profiler.stop');
 const self={};const nodes=profile.nodes;const dt={};profile.samples.forEach((s,k)=>{dt[s]=(dt[s]||0)+(profile.timeDeltas[k]||0)});
 for(const n of nodes){const f=n.callFrame;const key=(f.functionName||'(anon)')+':'+(f.lineNumber+1);self[key]=(self[key]||0)+(dt[n.id]||0)/1000}
 const top=Object.entries(self).sort((a,b)=>b[1]-a[1]).slice(0,8).map(([k,v])=>k+'='+Math.round(v));
 console.log(JSON.stringify({info,ms:bu&&bu.ms,top}));await ctx.close()}
await b.close()})();
