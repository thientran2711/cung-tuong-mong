/* palace-voice REPETITION AUDIT (owner 16/11 19:38Z: "ngày nào cũng thấy câu đó"). The sensible bot (measure/inpage4.js) plays N steps
   (300 game iterations each, one seeded Math.random); every dialog it answers and every Sổ ghi line is recorded. A "speech" = each “…”
   quote in it; its situation = the dialog title (digits masked). Reports, per situation and overall:
     shown   quotes shown          distinct  distinct quotes
     rep6    quotes identical to one shown in the SAME situation within the last W tuần (BAL.voice.noRepeat, default 6)
     top     the most repeated quotes with how often they came.
   usage: node dev/test/voice-rep.js <url> [steps=10] [out.json]      (compare two builds by running it on each) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,URL,NS,OUT]=process.argv;const N=+NS||10;
const INP=fs.readFileSync(path.join(__dirname,'../measure/inpage4.js'),'utf8');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.addInitScript(()=>{let s=4242;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Date.now=(()=>{let d=1.7e12;return()=>d+=1000})();window.__bot={pre:1}});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});
 await p.evaluate(()=>document.querySelectorAll('.kroul').forEach(e=>e.remove()));await p.evaluate(INP);
 await p.evaluate(()=>{const n0=nextBuoi;nextBuoi=function(){if(S&&S.mg){S.mg=null;try{if(typeof kg82Close==='function')kg82Close(true)}catch(e){}}return n0.apply(this,arguments)};
  for(const f of ['act','lesson','talk']){const o=window[f];if(typeof o!=='function')continue;window[f]=function(){const r=o.apply(this,arguments);if(S&&S.mg){S.mg=null;try{kg82Close(true)}catch(e){}const ov=document.getElementById('ov');if(ov)ov.hidden=true}return r}}
  /* recorder */
  window.__rec=[];const txt=h=>{const d=document.createElement('div');d.innerHTML=String(h||'');return d.textContent.replace(/\s+/g,' ').trim()};
  const W=()=>{try{return wk()}catch(e){return 0}};
  const rec=(src,m)=>{try{if(!m||m.__rec)return;m.__rec=1;let h=typeof m.h==='function'?'':m.h;let t=m.t||'';
    const body=txt((h||'')+' '+(m.h?'':t));const title=txt(m.h?t:(m.title||'')).replace(/\d+/g,'#').slice(0,60)||'(dialog)';
    const qs=body.match(/“[^”]{6,}”|‘[^’]{6,}’/g)||[];for(const q of qs)window.__rec.push([W(),src+':'+title,q])}catch(e){}};
  for(const f of ['chooseM','closeModal']){const o=window[f];if(typeof o!=='function')continue;window[f]=function(){try{rec('dlg',Q[0])}catch(e){}return o.apply(this,arguments)}}
  const l0=log;log=function(s){try{const t=txt(s);const qs=t.match(/“[^”]{6,}”/g)||[];for(const q of qs)window.__rec.push([W(),'log:'+t.slice(0,t.indexOf('“')).replace(/\d+/g,'#').replace(/[A-ZÀ-Ỹ][\wÀ-ỹ]+ [A-ZÀ-Ỹ][\wÀ-ỹ]+/g,'X').slice(-40),q])}catch(e){}return l0.apply(this,arguments)}});
 const tS=Date.now();for(let i=0;i<N;i++){await p.evaluate(()=>window.__bot.step('sens',300));console.error('step',i+1,Math.round((Date.now()-tS)/1000)+'s')}
 const R=await p.evaluate(()=>({rec:window.__rec,res:window.__res.length,wk:(()=>{try{return wk()}catch(e){return 0}})(),win:(typeof BAL!=='undefined'&&BAL.voice&&BAL.voice.noRepeat)||6}));await b.close();
 /* analysis — quotes are compared with names masked (a rival's name is not a different line) */
 const mask=q=>q.replace(/\d+/g,'#');const by={};let shown=0,rep=0;const all={};
 for(const [w,k,q0] of R.rec){const q=mask(q0);shown++;all[q]=(all[q]||0)+1;const s=by[k]=by[k]||{n:0,d:new Set(),last:{},rep:0};s.n++;s.d.add(q);
  if(s.last[q]!=null&&w-s.last[q]<R.win){s.rep++;rep++}s.last[q]=w}
 const sit=Object.entries(by).map(([k,s])=>({k,n:s.n,distinct:s.d.size,rep6:s.rep})).filter(x=>x.n>=3).sort((a,b)=>b.rep6-a.rep6||b.n-a.n);
 const top=Object.entries(all).sort((a,b)=>b[1]-a[1]).slice(0,20);
 const sum={url:URL,steps:N,lives:R.res,tuan:R.wk,window:R.win,quotes:shown,distinct:Object.keys(all).length,rep6:rep,rep6Pct:+(100*rep/Math.max(1,shown)).toFixed(1),errs:errs.slice(0,5)};
 console.log(JSON.stringify(sum));console.log('situations (n>=3) by repeats:');sit.slice(0,25).forEach(x=>console.log(`  ${x.rep6}\t${x.n}\t${x.distinct}\t${x.k}`));
 console.log('top quotes:');top.forEach(([q,n])=>console.log(`  ${n}\t${q.slice(0,120)}`));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({sum,sit,top},null,1))})().catch(e=>{console.error(e);process.exit(1)});
