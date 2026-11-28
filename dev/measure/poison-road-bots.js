/* D8 poison road (jpq) bot measure: month-loop lives in the real build (dev/index.html), N lives × Y years per style.
   usage: node dev/measure/poison-road-bots.js <lives> <years> [out.json]     (STYLES=world,hate,harsh,vg)
   world  — she never schemes, her own death muted (S.tho far, die() off): how often do NPC consorts try the royal road, succeed, get caught? any runaway?
   hate / harsh / vg — a scheming player: the road's gate is held open (hate: Sủng/Ân tình low · harsh: strict Thái hậu who dislikes her ·
     vg: tình ý with the Vương gia), she gets one poison + one dish a year (as if bought) and tries as soon as she holds them. Per life: tries, hits,
     caught, exposed later, the ending. Counters come from the game itself (S.pq.n). */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');
const R=path.resolve(__dirname,'../..');const LIVES=+process.argv[2]||60,YEARS=+process.argv[3]||8,OUT=process.argv[4];const CH=+process.env.CHUNK||10;
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=900','--disable-gpu']});const ctx=await b.newContext({viewport:{width:1000,height:755},reducedMotion:'reduce'});
 await ctx.route(/^https?:\/\/(?!ts\.local)/,r=>/image|media|font/.test(r.request().resourceType())?r.abort():r.continue());
 await ctx.route('http://ts.local/**',r=>{const f=R+decodeURIComponent(new URL(r.request().url()).pathname);if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
  r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const errs=[];const all={};const STY=(process.env.STYLES||"world,hate,harsh,vg").split(",");
 for(const style of STY){all[style]=[];
  for(let done=0;done<LIVES;done+=CH){const page=await ctx.newPage();page.on('pageerror',e=>errs.push(e.message.slice(0,200)));
   await page.goto('http://ts.local/dev/index.html',{waitUntil:'domcontentloaded',timeout:120000});await page.waitForTimeout(2500);
   const part=await page.evaluate(([style,N,YEARS])=>{const strip=x=>String(x).replace(/<[^>]+>/g,'');let END=null;const o0=over;over=function(h,t,fate,alive){END={h,fate:strip(fate),t:strip(t).slice(0,200),alive:!!alive};return o0.apply(this,arguments)};
    const die0=die;if(style==="world")die=function(){};const L=[];
    for(let l=0;l<N;l++){SLOT=3;try{store.set(NL_KEY,null)}catch(e){}END=null;start();Q.length=0;if(style==="world")S.tho=999;S.mort=S.mort||{};
     const vgSet=()=>{try{menInit();const m=S.men.find(x=>x.role==="Vương gia");if(m&&m.alive){m.tinh=Math.max(m.tinh||0,80);S.vgAlly=m.id}}catch(e){}};
     let me=0,th0=!S.thDead,thDied=null,months=0,err="";
     for(let m=0;m<YEARS*12&&!S.dead;m++){months++;
      if(style!=="world"){S.suc=Math.max(S.suc,60);S.bac=Math.max(S.bac,80);S.rank=Math.max(S.rank,2);S.danh=Math.max(S.danh,15);
       if(style==="hate"){S.sung=Math.min(S.sung,BAL.pq.gate.sung);S.an=Math.min(S.an||0,BAL.pq.gate.an)}else S.sung=Math.max(S.sung,25);
       if(style==="harsh"&&!S.thDead){thArch();if(!BAL.pq.gate.harsh.includes(S.thO.arch))S.thO.arch="nghiem";S.th=Math.min(S.th,BAL.pq.gate.th)}
       if(style==="vg")vgSet();
       if(S.month===1&&!S.inv.some(e=>e.k==="hacdinh")){S.inv.push({k:"hacdinh"});S.inv.push({k:"yensao"})}
       const who=style==="harsh"?"th":"emp";const ix=S.inv.findIndex(e=>e&&e.k==="yensao"&&!e.h);
       if(ix>=0&&S.inv.some(e=>e.k==="hacdinh")&&pqMotive(S,who).ok&&!(S.pq&&(S.pq.done||S.pq.inq))){me++;try{pqGive(S,who,ix,"hacdinh")}catch(e){err=String(e).slice(0,120)}Q.length=0}}
      else{S.sung=Math.max(S.sung,40);S.danh=Math.max(S.danh,40);S.suc=80;S.age=Math.min(S.age,30)}
      try{monthTick()}catch(e){err=String(e).slice(0,120);break}Q.length=0;
      if(th0&&S.thDead&&!thDied)thDied={y:S.year,why:(S.pq&&S.pq.inq)||(S.pq&&S.pq.n&&S.pq.n.hit_th)?"poison":"other"}}
     const n=Object.assign({},(S.pq&&S.pq.n)||{});L.push({style,me,n,months,end:END,thDied,empPoison:!!(END&&/Ngự thiện có độc/.test(END.t)),err})}
    if(style==="world")die=die0;return L},[style,Math.min(CH,LIVES-done),YEARS]);
   all[style].push(...part);await page.close()}}
 await b.close();
 /* report */
 const rep={};for(const s of STY){const L=all[s];const sum=k=>L.reduce((a,x)=>a+(x.n[k]||0),0);const cnt=f=>L.filter(f).length;
  rep[s]={lives:L.length,yearsEach:YEARS,totalYears:+(L.reduce((a,x)=>a+x.months,0)/12).toFixed(1),
   herTries:L.reduce((a,x)=>a+x.me,0),npcTries:sum("npc_try"),tries:{emp:sum("try_emp"),th:sum("try_th")},roads:{hate:sum("road_hate"),harsh:sum("road_harsh"),vg:sum("road_vg")},
   hits:{emp:sum("hit_emp"),th:sum("hit_th")},missedUntraced:{emp:sum("miss_emp"),th:sum("miss_th")},executed:{emp:sum("doom_emp"),th:sum("doom_th")},
   inquests:{emp:sum("inq_emp"),th:sum("inq_th")},exposedLater:{emp:sum("exp_emp"),th:sum("exp_th")},vg:{tried:sum("vg_try"),won:sum("vg_win"),lost:sum("vg_lose")},
   livesWithRoyalPoisonDeath:cnt(x=>x.empPoison||(x.thDied&&x.thDied.why==="poison")),maxTriesOneLife:Math.max(0,...L.map(x=>(x.n.try_emp||0)+(x.n.try_th||0))),
   endings:L.reduce((a,x)=>{const k=x.end?x.end.fate:"(alive at end)";a[k]=(a[k]||0)+1;return a},{}),errors:L.filter(x=>x.err).map(x=>x.err).slice(0,5)}}
 rep.pageErrors=[...new Set(errs)].slice(0,10);console.log(JSON.stringify(rep,null,1));if(OUT)fs.writeFileSync(OUT,JSON.stringify({rep,all},null,0))})();
