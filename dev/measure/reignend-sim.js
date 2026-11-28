// review/reign-end: month-loop lives on the real build (monthTick directly, no buổi acts, cards left unanswered = she stands aside).
// She is kept alive and in place ("world" style of mort-bots.js) so every life runs until the REIGN ends (or the cap): reads how the reign ends.
// Births: the month loop has no nights, so a palace son is added at SONP % a month to a random living consort (≈ real play's pace).
// usage: node dev/measure/reignend-sim.js <page.html> <lives> [years=40] [seed0=0]   env SONP (default 3), BALO (JSON merged into BAL)
const {chromium}=require('playwright');const path=require('path');
const [,,PAGE,NL,YR,S0]=process.argv;const LIVES=+NL||20,YEARS=+YR||40,seed0=+S0||0,SONP=process.env.SONP!=null?+process.env.SONP:3;
const BALO=process.env.BALO?JSON.parse(process.env.BALO):null;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.addInitScript(`window.__seed=${9000+seed0*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
 const p=await ctx.newPage();await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 if(BALO)await p.evaluate(o=>{const mg=(a,b)=>{for(const k in b){if(b[k]&&typeof b[k]==='object'&&!Array.isArray(b[k])&&a[k]&&typeof a[k]==='object')mg(a[k],b[k]);else a[k]=b[k]}};mg(BAL,o)},BALO);
 const out=await p.evaluate(([LIVES,YEARS,SONP])=>{const res=[];document.getElementById('title').hidden=true;window.__bot=1;const strip=x=>String(x).replace(/<[^>]+>/g,'');
  const die0=die;die=function(){};const o0=over;
  for(let l=0;l<LIVES;l++){for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0;S.tho=999;
   let end=null;over=function(h,t,f,a){end=end||{h,t:strip(t).slice(0,180)};return o0.apply(this,arguments)};
   const y0=S.reign&&S.reign.y0!=null?S.reign.y0:S.year;let warn={},cards={};let mx={a:0,pow:0,ev:0,pl:0};
   for(let m=0;m<YEARS*12&&!end;m++){S.sung=Math.max(S.sung,40);S.danh=Math.max(S.danh,40);S.suc=80;S.age=Math.min(S.age,30);
    if(SONP&&Math.random()*100<SONP){const L=liveRivals(true).filter(v=>(v.age||20)<40);if(L.length){const v=L[Math.floor(Math.random()*L.length)];const k=mkKid(Math.random()<.5?"m":"f",0);(v.kids=v.kids||[]).push(k)}}
    try{monthTick()}catch(e){res.push({err:String(e).slice(0,160)});break}
    for(const q of Q)if(q.pid==='re')cards[q.pp.k]=(cards[q.pp.k]||0)+1;Q.length=0;
    const R=S.re;if(R){mx.a=Math.max(mx.a,R.a);for(const c in R.F){mx.ev=Math.max(mx.ev,R.F[c].ev);mx.pl=Math.max(mx.pl,R.F[c].pl)}}
    try{for(const c in trS().H)mx.pow=Math.max(mx.pow,trS().H[c].pow)}catch(e){}}
   const R=S.re&&S.re.end;let cause=end?(R?R.k:/băng hà/.test(end.t)?((S.mort&&S.mort.empWhy)||"lifespan"):"other:"+end.h):"cap";
   if(/Thích khách|độc/.test(cause))cause="plot";else if(cause!=="abd"&&cause!=="phe"&&cause!=="coup"&&cause!=="cap"&&!/^other/.test(cause))cause=/ngã|trúng phong|chè/.test(cause)?"accident":"natural";
   res.push({cause,ry:S.year-y0,eAge:S.emp.age,cards,mx,t:end?end.t.slice(0,120):""});over=o0}
  die=die0;return res},[LIVES,YEARS,SONP]);
 for(const r of out)console.log(JSON.stringify(r));
 const L=out.filter(r=>!r.err),ry=L.map(r=>r.ry).sort((a,b)=>a-b),q=f=>ry[Math.min(ry.length-1,Math.floor(f*ry.length))];
 const C={};L.forEach(r=>C[r.cause]=(C[r.cause]||0)+1);
 console.log(`SUMMARY lives ${L.length} · reign years mean ${(ry.reduce((a,b)=>a+b,0)/ry.length).toFixed(1)} p10 ${q(.1)} p50 ${q(.5)} p90 ${q(.9)} · causes ${JSON.stringify(C)} · errs ${errs.length} ${errs.slice(0,2)}`);
 await b.close()})();
