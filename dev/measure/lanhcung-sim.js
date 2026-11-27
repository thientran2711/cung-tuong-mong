// review/lanhcung-early (Foreman B ROOT 3 brief b-lanhcung-early): headless life sim on the real page. Records EVERY time she is sent to
// lãnh cung (j14 cold) or loses a rank (j30 demote / j8 fall): why, the road (caller from the stack), rank before, month, year, Sủng/Danh.
// usage: node dev/measure/lanhcung-sim.js <page.html> <seeds> [months=36] [seed0=0] [mode=sens|rand|idle]
// idle = a passive player (sensible bot that never finds an act worth taking: window.__minS huge → only answers events and sleeps)
// env PAR (default 3), CAP (s per seed, default 900), BALO (JSON merged into BAL before play)
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const [,,PAGE,NS,MO,S0,MODE]=process.argv;const N=+NS||3,MONTHS=+MO||36,seed0=+S0||0,PAR=+process.env.PAR||3,mode=MODE||'sens';
const BALO=process.env.BALO?JSON.parse(process.env.BALO):null;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const jobs=[];for(let si=seed0;si<seed0+N;si++)jobs.push(si);
 const run=async si=>{
  const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
  await ctx.addInitScript(`window.__seed=${7000+si*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(900000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
  if(BALO)await p.evaluate(o=>{const mg=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')mg(a[k],b[k]);else a[k]=b[k]}};mg(BAL,o)},BALO);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
  await p.evaluate(fs.readFileSync(path.join(__dirname,'inpage6.js'),'utf8'));
  await p.evaluate(()=>{const E=window.__lc=[];
   const who=()=>String(new Error().stack).split('\n').slice(3,9).map(l=>(l.match(/at (?:Object\.|window\.)?([\w$.]+)/)||[])[1]||'?').filter(f=>!/^(Array|Object|eval|Function)/.test(f)).slice(0,4).join('<');
   const rec=(k,why)=>{try{E.push({k,why:String(why||'').replace(/<[^>]+>/g,'').slice(0,90),rank:S.rank,turn:S.turn,year:S.year,age:S.age,sung:Math.round(S.sung||0),danh:Math.round(S.danh||0),out:!!S.out,dead:!!S.dead,srv:!!(typeof isSrv==='function'&&isSrv()),by:who()})}catch(e){}};
   const c0=cold;cold=function(why,by){const was=S&&!S.out&&!S.dead;const r=S.rank;const res=c0.apply(this,arguments);if(was&&S.out){rec('cold',why);E[E.length-1].rank=r}return res};
   const d0=demote;demote=function(pp,why){if(pp!==S)return d0.apply(this,arguments);const r=S.rank;const res=d0.apply(this,arguments);if(S.rank<r&&!S.out){rec('demote',why);E[E.length-1].rank=r;E[E.length-1].to=S.rank}return res};
   const f0=fall;fall=function(pp,why,by){if(pp!==S)return f0.apply(this,arguments);const r=S.rank,o=S.out;const res=f0.apply(this,arguments);if(!o&&!S.out&&S.rank<r){rec('fall-down',why);E[E.length-1].rank=r;E[E.length-1].to=S.rank}return res};
   const rs0=restore;restore=function(full,why){const o=S.out;const res=rs0.apply(this,arguments);if(o&&!S.out){rec('restore',why)}return res};
   /* her own heavy deeds (the crimes a nặng charge reads, BAL.charge.deed → cold): proof that the charge was real (law 6a) */
   window.__dd=[];const da0=deedAdd;deedAdd=function(pp,k){const r=da0.apply(this,arguments);try{if(pp===S){const c=BAL.charge.deed[k];if(c&&BAL.charge.C[c]&&BAL.charge.C[c].pun==='cold')window.__dd.push({k,c,turn:S.turn,by:who()})}}catch(e){}return r};
   window.__maxR=0;
  });
  if(mode==='idle')await p.evaluate(()=>{window.__minS=1e9});const BM=mode==='idle'?'sens':mode;
  const t0=Date.now();let end='months';
  while(true){const st=await p.evaluate(m=>{const n0=window.__res.length;window.__bot.step(m,120);try{window.__maxR=Math.max(window.__maxR,S.rank|0)}catch(e){}return{t:S.turn,dead:window.__res.length>n0}},BM);
   if(st.dead){end='died';break}
   if(st.t>=MONTHS)break;if(Date.now()-t0>(+process.env.CAP||900)*1e3){end='cap';break}}
  const out=await p.evaluate(()=>({lc:window.__lc,dd:window.__dd,res:(window.__res||[]).map(r=>JSON.stringify(r).slice(0,200)),rank:S.rank,maxR:window.__maxR,turn:S.turn,out:!!S.out,origin:S.org||S.origin||null,srv:!!(typeof isSrv==='function'&&isSrv())}));
  console.log(JSON.stringify(Object.assign({seed:si,mode,end,errs:errs.slice(0,3)},out)));await ctx.close()};
 const q=jobs.slice();await Promise.all(Array.from({length:PAR},async()=>{while(q.length)await run(q.shift())}));await b.close()})().catch(e=>{console.error(e);process.exit(2)});
