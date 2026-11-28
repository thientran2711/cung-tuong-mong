// review/staff-root fast measure (month loop, as mort-bots.js): node dev/measure/staff-month.js <game html rel. to repo root> <lives> <years>
// Each life: a new game (origins in turn: the 8 origins + the servant road "cung nữ"), then monthTick() month after month, dialogs dropped.
// Once a year her rank is moved at random (up AND down, sometimes the cold palace) to exercise every row of the table; NPCs live their own
// month (promotions, demotions, deaths, plants, buy-overs). After EVERY month: every household (hers + every live NPC consort) vs capOf:
// maids incl. the personal maid <= cap[0], eunuchs <= cap[1]. Prints max per rank, over-cap count, servants in the palace, early deaths.
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const path=require('path'),fs=require('fs');
const ROOT=path.resolve(__dirname,'../..');const GF=process.argv[2]||'dev/index.html',LIVES=+process.argv[3]||36,YEARS=+process.argv[4]||12;
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});
 await ctx.route('http://ts.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);if(/\.(webp|png|jpg|mp3|ogg)$/.test(u))return r.abort();const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'text/javascript; charset=utf-8'})});
 const errs=[];const ALL={lives:0,months:0,checks:0,over:[],max:{},tot:0,early:0,dead:0,srv:0,errs:[]};const BATCH=4;
 for(let b0=0;b0<LIVES;b0+=BATCH){const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://ts.local/'+GF,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof monthTick==='function',null,{timeout:120000});await p.waitForTimeout(2500);
 const R=await p.evaluate(([LIVES,YEARS,B0])=>{const ORIG=['tt','dtq','muoi','cn','nc','td','ch','thd','srv'];const quiet=()=>{try{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true}catch(e){}};
  const has=q=>{const L=q.staff||[];return[L.filter(s=>s.role==="maid").length+1,L.filter(s=>s.role==="eunuch").length]};
  const out={lives:0,months:0,checks:0,over:[],max:{},tot:0,early:0,dead:0,srv:0,errs:[]};
  for(let l=B0;l<B0+LIVES;l++){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}const o=ORIG[l%ORIG.length];
   if(o==='srv'){window.__forceOrigin=null;for(let i=0;i<300;i++){start();if(isSrv())break}}else{window.__forceOrigin=o;start()}quiet();out.lives++;if(isSrv())out.srv++;
   for(let m=0;m<YEARS*12&&!S.dead;m++){
    if(m%12===11&&!isSrv()){S.out=Math.random()<.08?1:0;S.rank=Math.floor(Math.random()*8)}S.bac=Math.max(S.bac,80);S.suc=Math.max(S.suc,60);
    try{monthTick()}catch(e){out.errs.push(String(e).slice(0,160));break}quiet();out.months++;try{render()}catch(e){}quiet();
    for(const q of [S].concat(rivals||[])){if(!q||(q!==S&&q.alive===false))continue;if(q===S&&isSrv())continue;out.checks++;const c=capOf(q),h=has(q);
     const rk=q.out?"cold":String(q===S?S.rank:(q.queen?7:q.rank));const M=out.max[rk]=out.max[rk]||[0,0];M[0]=Math.max(M[0],h[0]);M[1]=Math.max(M[1],h[1]);
     if(h[0]>c[0]||h[1]>c[1])out.over.push({who:q===S?"her":"npc",rk,h,c,l,m})}
    out.tot=Math.max(out.tot,(rivals||[]).concat([S]).reduce((a,q)=>a+((q.alive===false)?0:(q.staff||[]).length),0))}
   if(S.dead){out.dead++;if(S.turn<60)out.early++}}
  window.__forceOrigin=null;return out},[Math.min(BATCH,LIVES-b0),YEARS,b0]);await p.close();
  for(const k of ['lives','months','checks','early','dead','srv'])ALL[k]+=R[k];ALL.over.push(...R.over);ALL.errs.push(...R.errs);ALL.tot=Math.max(ALL.tot,R.tot);for(const [k,v] of Object.entries(R.max)){const M=ALL.max[k]=ALL.max[k]||[0,0];M[0]=Math.max(M[0],v[0]);M[1]=Math.max(M[1],v[1])}}
 const R=ALL;
 console.log(JSON.stringify({game:GF,lives:R.lives,srvLives:R.srv,months:R.months,checks:R.checks,overCap:R.over.length,overHer:R.over.filter(x=>x.who==="her").length,overSample:R.over.slice(0,4),
  maxPerRank:R.max,maxStaffInPalace:R.tot,dead:R.dead,earlyDead5y:R.early,errs:R.errs.slice(0,3),pageErrs:errs.slice(0,3)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
