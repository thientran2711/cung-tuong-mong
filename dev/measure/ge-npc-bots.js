/* ge-npc (GE09/GE10/OR19, review/ge-npc) — before/after bots: month-loop lives in the real build (the npc-roads-bal.js pattern: monthTick()
   directly, dialogs cleared, sensible care floors), N lives × Y years per style:
     off — NPC grand endings off (BAL.ge.npc.on = false) and no NPC foreign princess (BAL.nroad.fp.max = 0) = LIVE behaviour;
     on  — this branch (NPC grand endings + princesses);
     ge  — NPC grand endings only (no princess: BAL.nroad.fp.max = 0); fp — princesses only (BAL.ge.npc.on = false)  [review r1: split the cause];
     env SEED=<n>: life i of every style starts from the same seeded Math.random (mulberry32(SEED+i)) so the arms share their opening draws.
   Reads per life: NPC Hồi kết reached / grand / fail / quiet, shading, summits, seats held by NPCs, NPC Hoàng hậu at the end, NPCs who left by
   their ending, NPC foreign princesses, her death, NPC deaths, errors. usage: node dev/measure/ge-npc-bots.js <url> <lives> <years> [styles] [json] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,NL,NY,STY,OUT]=process.argv;const LIVES=+NL||10,YEARS=+NY||15,STYLES=(STY||'off,on').split(',');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const errs=[];const all={};
 for(const style of STYLES){all[style]=[];const CH=5;
  for(let done=0;done<LIVES;done+=CH){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});const page=await ctx.newPage();
   await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());page.on('pageerror',e=>errs.push(style+': '+e.message.slice(0,200)));
   await page.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await page.waitForFunction(()=>typeof start==='function'&&typeof nrMonth==='function',null,{timeout:0});await page.waitForTimeout(1500);
   const part=await page.evaluate(([style,N,Y,SEED,L0])=>{const out=[];const clr=()=>{try{Q.length=0}catch(e){}};try{document.getElementById('title').hidden=true}catch(e){}
    if(style==='off'){BAL.ge.npc.on=false;BAL.nroad.fp.max=0}if(style==='ge')BAL.nroad.fp.max=0;if(style==='fp')BAL.ge.npc.on=false;
    const R0=Math.random,mb=a=>()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};
    for(let l=0;l<N;l++){if(SEED!=null)Math.random=mb(SEED+L0+l);let ok=false;for(let t=0;t<3&&!ok;t++){quiet=true;start();quiet=false;clr();ok=!!(S&&S.origin)}if(!ok){out.push({err:'boot'});continue}
     let errs=0;const seen=new Set();
     for(let m=0;m<Y*12&&!S.dead;m++){
      if(illOf(S)&&S.bac>=40){S.bac-=40;treat(S,'ty')}S.suc=Math.max(S.suc,60);S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.duc=Math.max(S.duc,55);S.rank=Math.max(S.rank,2);S.bac=Math.max(S.bac,80);
      try{monthTick()}catch(e){errs++}clr();
      for(const v of rivals)if(v&&v.ge&&v.ge.res)seen.add(v)}
     const R=[...seen].map(v=>v.ge.res);const sums={};for(const v of seen)if(v.ge.res.ok){const s=GE_CAT[v.ge.b].e[v.ge.res.i][5];sums[s]=(sums[s]||0)+1}
     out.push({style,seed:SEED!=null?SEED+L0+l:null,fate:S.dead?String(S.fate||''):'',dead:!!S.dead,years:S.year,hk:R.length,ok:R.filter(r=>r.ok).length,quiet:R.filter(r=>r.quiet).length,fail:R.filter(r=>!r.ok&&!r.quiet).length,
      t:R.filter(r=>r.ok&&r.sh==="t").length,a:R.filter(r=>r.ok&&r.sh==="a").length,sums,seat:rivals.filter(v=>v.ge&&v.ge.seat).length,
      left:rivals.filter(v=>v.ge&&v.ge.left).length,hhGe:[...seen].filter(v=>v.queen&&v.ge.res.ok&&GE_CAT[v.ge.b].e[v.ge.res.i][5]==="HH").length,
      hh:rivals.some(v=>v.alive&&!v.out&&v.queen)?1:0,fp:rivals.filter(v=>v.fpk).length,npcDead:rivals.filter(v=>!v.alive&&!(v.ge&&v.ge.left)&&!v.nun).length,
      roads:rivals.filter(v=>v.nr).length,ended:rivals.filter(v=>v.nr&&v.nr.x).length,geBr:rivals.filter(v=>v.ge).length,errs})}
    Math.random=R0;return out},[style,Math.min(CH,LIVES-done),YEARS,process.env.SEED!=null?+process.env.SEED:null,done]);all[style].push(...part);await ctx.close()}}
 const avg=(L,f)=>L.length?(L.reduce((a,x)=>a+f(x),0)/L.length):0;const f2=x=>x.toFixed(2);
 console.log('style | lives | her death | NPC roads | roads ended | on a GE branch | Hồi kết | grand | fail | quiet | thiện/ác | seats held | left | NPC HH by GE | NPC HH at end | princesses | NPC deaths | errs');
 for(const s of STYLES){const L=all[s].filter(x=>!x.err);const sm={};L.forEach(x=>{for(const k in x.sums)sm[k]=(sm[k]||0)+x.sums[k]});
  console.log([s,L.length,f2(avg(L,x=>x.dead?1:0)),f2(avg(L,x=>x.roads)),f2(avg(L,x=>x.ended)),f2(avg(L,x=>x.geBr)),f2(avg(L,x=>x.hk)),f2(avg(L,x=>x.ok)),f2(avg(L,x=>x.fail)),f2(avg(L,x=>x.quiet)),
   `${L.reduce((a,x)=>a+x.t,0)}/${L.reduce((a,x)=>a+x.a,0)}`,f2(avg(L,x=>x.seat)),f2(avg(L,x=>x.left)),f2(avg(L,x=>x.hhGe)),f2(avg(L,x=>x.hh)),f2(avg(L,x=>x.fp)),f2(avg(L,x=>x.npcDead)),L.reduce((a,x)=>a+x.errs,0)].join(' | '));
  console.log('  summits reached:',JSON.stringify(sm))}
 console.log('page errors:',errs.length,errs.slice(0,5));if(OUT)fs.writeFileSync(OUT,JSON.stringify(all));await b.close()})();
