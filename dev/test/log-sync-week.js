/* log-sync r1: the week card (dawn wkSummary / Tuần lục wkBookData) must not show the bookkeeping lines (marker class="kls").
   Bots play; at every week change the week's marked lines are compared with the card text. usage: node dev/test/log-sync-week.js <url> [steps] */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});p.on('pageerror',e=>console.log('ERR',e.message));
 await p.addInitScript(()=>{let s=4242;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};window.__bot={pre:1}});
 await p.goto(process.argv[2],{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});
 await p.evaluate(INP);
 const r=await p.evaluate(n=>{const out={weeks:0,leaks:[],book:0,ex:[]};const pl=x=>String(x).replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
  const n0=nextBuoi;nextBuoi=function(){if(S&&!S.dead&&(S.buoi||0)>=B4L){try{const s=S.wkSnap||wkSnap();const k=Math.max(0,Math.min(S.logs.length,S.logSeq-(s.seq||0)));
     const mk=S.logs.slice(0,k).filter(x=>/class="kls"/.test(String(x)));const um=S.logs.slice(0,k).filter(x=>!/class="kls"/.test(String(x))).map(pl).join(" | ");out.book+=mk.length;const txt=pl(JSON.stringify(wkSummary()))+" "+pl(JSON.stringify(wkBookData()));out.weeks++;
     for(const x of mk){const t=pl(x.replace(/^<span class="ld">[^<]*<\/span>/,""));for(const probe of [t].concat(t.split(" · ").map(z=>z.trim()).filter(z=>z.length>=18&&/\d/.test(z))))if(txt.includes(probe.replace(/\.$/,""))&&!um.includes(probe.replace(/\.$/,""))){out.leaks.push(probe);break}}
     if(out.ex.length<2&&mk.length)out.ex.push({marked:mk.map(pl).slice(0,3),card:txt.slice(0,600)})}catch(e){out.err=String(e)}}return n0.apply(this,arguments)};
  window.__bot.step("rand",n);return out},+process.argv[3]||3000);
 console.log(JSON.stringify(r,null,1).slice(0,3000));console.log(r.leaks.length?"FAIL":"PASS","weeks",r.weeks,"marked lines",r.book,"leaks",r.leaks.length);await b.close()})();
