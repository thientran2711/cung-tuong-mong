/* npc-roads U4 balance (review/npc-roads; reports/npc-roads.md §4 + §6): month-loop lives in the real build (the mort-bots.js pattern:
   monthTick() directly, dialogs cleared, sensible care: thái y when ill, rest, Sủng/Danh floors), N lives × Y years per style:
     off  — NPC roads switched off (window.__nroff = 1);
     on   — NPC roads on, a player who builds no bonds;
     bond — NPC roads on, a player who builds bonds every month (gifts to 3 consorts, a loyal household, men fond of her, court men and
            houses leaning to her) → how often a help hồi is asked, by kind of asker.
   Reads per life: her death within Y years, her Danh/Sủng/house power at the end, NPC consort deaths / lãnh cung / Hoàng hậu seat held,
   children deaths, NPC road chapters played (consorts, maids+eunuchs, men) and help hồi asked (per asker group).
   usage: node dev/measure/npc-roads-bal.js <url> <lives per style> <years> [styles=off,on,bond] → table on stdout (+ json to argv[5]) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,NL,NY,STY,OUT]=process.argv;const LIVES=+NL||10,YEARS=+NY||15,STYLES=(STY||'off,on,bond').split(',');
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const errs=[];const all={};
 for(const style of STYLES){all[style]=[];const CH=5;
  for(let done=0;done<LIVES;done+=CH){const ctx=await b.newContext({viewport:{width:390,height:844},serviceWorkers:'block'});const page=await ctx.newPage();
   await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());page.on('pageerror',e=>errs.push(style+': '+e.message.slice(0,200)));
   await page.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await page.waitForFunction(()=>typeof start==='function'&&typeof nrMonth==='function',null,{timeout:0});await page.waitForTimeout(1500);
   const part=await page.evaluate(([style,N,Y])=>{const out=[];const clr=()=>{try{Q.length=0}catch(e){}};try{document.getElementById('title').hidden=true}catch(e){}
    window.__nroff=style==='off'?1:0;
    for(let l=0;l<N;l++){let ok=false;for(let t=0;t<3&&!ok;t++){quiet=true;start();quiet=false;clr();ok=!!(S&&S.origin)}if(!ok){out.push({err:'boot'});continue}
     const asked=new Map(),played={rv:0,sv:0,men:0};let dead=null,errs=0;const lens=new Map();
     const kid0=new Set();
     for(let m=0;m<Y*12&&!S.dead;m++){
      if(illOf(S)&&S.bac>=40){S.bac-=40;treat(S,'ty')}S.suc=Math.max(S.suc,60);S.sung=Math.max(S.sung,25);S.danh=Math.max(S.danh,15);S.duc=Math.max(S.duc,55);S.rank=Math.max(S.rank,2);S.bac=Math.max(S.bac,80);
      if(style==='bond'){const L=liveRivals(true);for(let i=0;i<3&&L.length;i++){const v=pick(L);relAdd(S,v,5)}if(S.maid)S.maid.loyal=Math.max(S.maid.loyal,85);(S.staff||[]).forEach(s=>{s.loyal=Math.max(s.loyal,70)});
       (S.men||[]).forEach(x=>{x.tinh=Math.min(100,(x.tinh||0)+4)});const C=S.court||{};for(const k in C){const c=C[k];if(c){c.af=c.af||{};c.af.me=Math.min(100,(c.af.me||0)+2)}}
       try{const T=trS();for(const c in T.H){const h=T.H[c];h.af=h.af||{};h.af.me=Math.min(100,(h.af.me||0)+2)}}catch(e){}}
      try{monthTick()}catch(e){errs++}clr();
      try{const q=q72();for(const c of q.ch.slice())if(/^nr_/.test(c.tid)){const g=c.rk==='rv'||c.rk==='hh'?'rv':c.rk==='sv'||c.rk==='rsv'||c.rk==='maid'?'sv':'men';asked.set(c.rk+':'+c.ri+':'+(c.p&&c.p.nr),g);q.ch.splice(q.ch.indexOf(c),1)}}catch(e){}
      const tally=(p,g)=>{if(p&&p.nr){const n=p.nr.l.length,o=lens.get(p)||0;if(n>o){played[g]+=n-o;lens.set(p,n)}}};
      rivals.forEach(v=>tally(v,'rv'));try{nrMaidL().concat(nrServL('eunuch')).forEach(s=>tally(s,'sv'));nrMenL().forEach(e=>tally(e.p,'men'))}catch(e){}}
     const A={rv:0,sv:0,men:0};for(const g of asked.values())A[g]++;
     const kidsAll=allKids();const avgL=(L,f)=>L.length?L.reduce((a,x)=>a+f(x),0)/L.length:0;
     out.push({style,dead:!!S.dead,years:S.year,danh:S.danh,sung:S.sung,pow:S.dad||0,npcDead:rivals.filter(v=>!v.alive).length,npcOut:rivals.filter(v=>v.alive&&v.out).length,
      npcN:rivals.length,npcDanh:avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.danh||0),npcSung:avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.sung||0),npcRank:avgL(rivals.filter(v=>v.alive&&!v.out),v=>v.rank||0),hh:rivals.some(v=>v.alive&&!v.out&&v.queen)?1:0,kidDead:kidsAll.filter(([k])=>!k.alive).length,kidN:kidsAll.length,played,asked:A,errs})}
    return out},[style,Math.min(CH,LIVES-done),YEARS]);all[style].push(...part);await ctx.close()}}
 const avg=(L,f)=>L.length?(L.reduce((a,x)=>a+f(x),0)/L.length):0;const f1=x=>x.toFixed(1);
 console.log(`npc-roads-bal: ${LIVES} lives × ${YEARS} years per style`);
 console.log('style | her death % | Danh | Sủng | house | NPC Danh/Sủng/rank | NPC dead | NPC lãnh cung | HH seat held % | kids dead | chapters rv/sv/men | help asked rv/sv/men | errors');
 for(const s of STYLES){const L=all[s].filter(x=>!x.err);
  console.log(`${s} | ${f1(avg(L,x=>x.dead?100:0))} | ${f1(avg(L,x=>x.danh))} | ${f1(avg(L,x=>x.sung))} | ${f1(avg(L,x=>x.pow))} | ${f1(avg(L,x=>x.npcDanh))}/${f1(avg(L,x=>x.npcSung))}/${f1(avg(L,x=>x.npcRank))} | ${f1(avg(L,x=>x.npcDead))} | ${f1(avg(L,x=>x.npcOut))} | ${f1(avg(L,x=>x.hh*100))} | ${f1(avg(L,x=>x.kidDead))} | ${['rv','sv','men'].map(g=>f1(avg(L,x=>x.played[g]))).join('/')} | ${['rv','sv','men'].map(g=>f1(avg(L,x=>x.asked[g]))).join('/')} | ${L.reduce((a,x)=>a+x.errs,0)}`)}
 if(OUT)fs.writeFileSync(OUT,JSON.stringify(all));console.log('page errors:',errs.length,errs.slice(0,5).join(' | '));await b.close()})();
