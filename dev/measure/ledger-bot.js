/* ledger-bot (review/night-ledger): per-woman nights and conceptions per month, BEFORE (one night a tuần) vs AFTER (10-night ledger).
   Real days: tối → "Sang ngày mới" (jnf commit: flip at the end of tối, the 10-second choice answered "Thôi", her night dialogs answered with
   the first option that is not a way out) — the same day walk as dev/test/night-multi.js. Her stats floored like night-time-bot3
   (Sủng ≥ SUNG, Danh 15, Sức 60, Đức 55, Bạc 80, rank ≥ 2); NPCs live their own lives.
   usage: node dev/measure/ledger-bot.js <url> <lives> <months> <out.json>   (seeded: SEED0) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,LS,MS,OUT]=process.argv;const LIVES=+LS||6,MONTHS=+MS||30;
const SEEDRNG=`(function(){let s=(window.__seed||1)>>>0;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();`;
(async()=>{const b=await chromium.launch({args:['--disable-gpu']});const lives=[];const errs=[];const t0=Date.now();
 for(let l=0;l<LIVES;l++){
  const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.addInitScript(`window.__seed=${(+process.env.SEED0||7000)+l*7919};`+SEEDRNG+`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
  const p=await ctx.newPage();p.setDefaultTimeout(0);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
  p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(1500);
  const r=await p.evaluate(([M,SUNG])=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}
   SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;window.render=function(){};
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc()))break}Q.length=0;
   const C={meC:0,npcC:0};const ng0=night;night=function(q){q=q||S;const was=!!q.preg;const r=ng0.apply(this,arguments);if(!was&&q.preg){if(q===S)C.meC++;else C.npcC++}return r};
   const drain=(max=80)=>{for(let n=0;n<max&&Q.length;n++){const m=Q[0];const o=m.opts||m.o;
     if(o&&o.length){let i=m.pid==="nfch"?o.findIndex(x=>x.n==="Thôi"):o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=o.findIndex(x=>x.n==="Thôi");if(i<0)i=0;
      try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift();S.mg=0}};
   const floor=()=>{S.sung=Math.max(S.sung,SUNG);S.danh=Math.max(S.danh,15);S.suc=Math.max(S.suc,60);S.duc=Math.max(S.duc,55);S.bac=Math.max(S.bac,80);S.rank=Math.max(S.rank,2)};
   const endDay=()=>{const d=wk();for(let g=0;g<14&&wk()===d&&!S.dead;g++){drain();floor();S.toMorning=0;used=4;S.buoi=B4L;try{nextBuoi()}catch(e){}}drain()};
   const months=[];let ms=0,t=0;
   while(months.length<M&&!S.dead){const m0={me:S.nights||0,meC:C.meC,npcC:C.npcC,npc:{},n:0,t:performance.now()};const R0=liveRivals(false);R0.forEach(v=>{m0.npc[v.id]=v.nights||0});
    const mo=S.turn;let g=0;while(S.turn===mo&&!S.dead&&g++<12)endDay();
    const R=liveRivals(false).filter(v=>m0.npc[v.id]!=null);const npcN=R.reduce((a,v)=>a+((v.nights||0)-m0.npc[v.id]),0);
    months.push({me:(S.nights||0)-m0.me,meC:C.meC-m0.meC,npcC:C.npcC-m0.npcC,npcN,nR:R.length,ms:performance.now()-m0.t,sung:R.reduce((a,v)=>a+v.sung,0)/Math.max(1,R.length),an:R.reduce((a,v)=>a+(v.an||0),0)/Math.max(1,R.length),led:!!(S.ledger)})}
   return{months,dead:!!S.dead,ld:typeof ldOn==="function"}},[MONTHS,+process.env.SUNG||25]);
  lives.push(r);await ctx.close();process.stderr.write(`life ${l+1}/${LIVES} months ${r.months.length}\n`)}
 await b.close();
 const A=lives.flatMap(x=>x.months);const s=k=>A.reduce((a,m)=>a+m[k],0);const n=A.length;const cm=A.reduce((a,m)=>a+m.nR,0);
 const sum={months:n,ledger:lives.some(x=>x.ld),herNightsPerMonth:+(s('me')/n).toFixed(2),herMonthsWithNight:+(A.filter(m=>m.me>0).length/n).toFixed(2),
  npcNightsPerConsortMonth:+(s('npcN')/cm).toFixed(2),herConceptionsPerMonth:+(s('meC')/n).toFixed(3),npcConceptionsPerConsortMonth:+(s('npcC')/cm).toFixed(4),
  npcConceptionsPerConsortYear:+(12*s('npcC')/cm).toFixed(3),npcSungEnd:+(lives.map(x=>x.months[x.months.length-1]?.sung||0).reduce((a,b)=>a+b,0)/lives.length).toFixed(1),
  npcAnEnd:+(lives.map(x=>x.months[x.months.length-1]?.an||0).reduce((a,b)=>a+b,0)/lives.length).toFixed(1),msPerMonth:+(s('ms')/n).toFixed(0),wallS:Math.round((Date.now()-t0)/1000),errs:errs.slice(0,8)};
 fs.writeFileSync(OUT,JSON.stringify({sum,lives},null,0));console.log(JSON.stringify(sum))})().catch(e=>{console.error(e);process.exit(1)});
