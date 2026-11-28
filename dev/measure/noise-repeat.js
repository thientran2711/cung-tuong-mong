// D-ROW37 (row 37 «daily noise», qc-noise r10b goal; owner OD 26/11 ~06:50Z (A) PLAYER-NOISE + (B) «Sổ ghi grouping»): REPEAT LINES per game day.
// qc-noise (dev/measure/noise-day.js) counts how MANY rows each channel shows a day; this robot counts how many of them SAY THE SAME THING AGAIN
// the same day: per day (wk()) and per surface — Sổ ghi (S.logs, the day log), Tin báo (kitNoticeList), world news (S.tb K/R lines) —
// lines, distinct lines (numbers masked as #, html stripped), repeats = lines − distinct, the worst single line's count, and the top repeated lines.
// READ-ONLY: it only reads S.logs / S.logSeq / kitNoticeList / S.tb after each bot step (no wrapper, no game call that writes, no Math.random).
// usage: node dev/measure/noise-repeat.js <page.html> <seeds> [months=6] [seed0=0]   env PAR (3), CAP (s per seed, 900)
// prints one JSON line per seed: {seed,end,turn,days:{wk:{log:[n,distinct,worst],tin:[…],news:[…]}},top:{surface:[[line,count,day]…]}}
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0]=process.argv;const N=+NS||3,MONTHS=+MO||6,seed0=+S0||0,PAR=+process.env.PAR||3;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${5000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8'));
  await p.evaluate(()=>{
   const pl=h=>String(h==null?'':h).replace(/^<span class="ld">[^<]*<\/span>/,'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
   const key=t=>t.replace(/[+−-]?\d+([.,]\d+)?/g,'#');
   const D=window.__rp={};const seenN=new Map(),seenTb=new Set();let seq=S.logSeq||0;
   const add=(sf,t)=>{if(!t||t.length<3)return;let w=0;try{w=wk()}catch(e){}const d=D[w]=D[w]||{};const z=d[sf]=d[sf]||{};const k=key(t);z[k]=(z[k]||0)+1};
   window.__rpTick=()=>{try{const s=S.logSeq||0;let n=s-seq;if(n<0)n=0;n=Math.min(n,(S.logs||[]).length);for(let i=n-1;i>=0;i--)add('log',pl(S.logs[i]));seq=s}catch(e){}
    try{for(const x of (typeof kitNoticeList==='function'?kitNoticeList():[])){const v=pl(x.line);if(seenN.get(x.id)===v)continue;seenN.set(x.id,v);add('tin',v)}}catch(e){}
    try{const T=S.tb||{};for(const it of [...Object.values(T.K||{}),...(Array.isArray(T.R)?T.R:[])]){if(!it||it.id==null||seenTb.has(it.id))continue;seenTb.add(it.id);add('news',pl(it.line))}}catch(e){}};
  });
  const t0=Date.now();let end='months';
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;for(let i=0;i<12;i++){window.__bot.step(m,10);window.__rpTick();if(window.__res.length>n0)break}return{t:S.turn,dead:window.__res.length>n0}},'sens');
   if(st.dead){end='died';break}if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||900)*1e3){end='cap';break}}
  const out=await p.evaluate(()=>{const days={},top={};for(const w in window.__rp){days[w]={};for(const sf in window.__rp[w]){const z=window.__rp[w][sf];const c=Object.values(z);const n=c.reduce((a,b)=>a+b,0);
     days[w][sf]=[n,c.length,Math.max(...c)];for(const k in z)if(z[k]>1)(top[sf]=top[sf]||[]).push([k.slice(0,140),z[k],+w])}}
    for(const sf in top)top[sf]=top[sf].sort((a,b)=>b[1]-a[1]).slice(0,25);return{days,top,turn:S.turn}});
  console.log(JSON.stringify(Object.assign({seed:si,end,errs:errs.slice(0,3)},out)));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
