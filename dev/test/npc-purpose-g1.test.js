/* NPC-PURPOSE G1 — the stray man has a goal (report dev/handover/reports/npc-purpose.md; kinds jagwhy1).
   1 affair: a lonely consort with an admirer (jmen likeV) takes THAT man; a lonely one nobody fancies never takes anyone; a favoured one never does
   2 exposure: only by a named accuser who holds proof and bears a grudge; without such a person an affair is never exposed (30 months)
   3 tryst plans: only for real pairs; the gap between a pair's meetings = BAL.ag.why.tryst.cd (no hash cadence)
   4 admirer: likeV is one of the two most beautiful candidates (never anyone else)
   5 bot run (8 tuần) with every affair path live: no page errors, no npcWhy errors
   usage: node dev/test/npc-purpose-g1.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};menInit();const L=liveRivals(false).filter(v=>!v.queen&&(v.age||20)>=18);o.n=L.length;o.men=(S.men||[]).length;
  for(const v of liveRivals(true)){v.affair=null;v.evm={}}for(const m of S.men)m.likeV=null;for(const m of S.men){try{netOf(m)}catch(e){}if(Array.isArray(m.net))m.net=m.net.map(t=>t==="Ham vui"?"An phận":t)}/* G1 #8: no man of a roving / fancying nết (Ham vui) in this fixture */delete S.npw;
  const [a,c,f]=L;const m=S.men.find(x=>x.alive);a.sung=0;a.duc=0;c.sung=0;c.duc=0;f.sung=90;f.duc=0;m.likeV=a.id;
  const ds0=deathSentence;deathSentence=()=>{};let got=0;
  try{affairMonth();o.a1=a.affair===m.id;o.c1=!c.affair;o.f1=!f.affair;
   /* 2 no accuser: 30 months, never exposed */let lost=0;for(let i=0;i<30;i++){S.turn++;const ev=affairMonth();if(!a.affair){lost++;break}}o.noExp=lost===0&&a.affair===m.id;
   /* accuser with proof + grudge */const w=L[3]||liveRivals(true).find(x=>x!==a&&x!==c&&x!==f);w.evm={};w.evm[key(a)]=BAL.ag.why.affairOut.ev;const h0=hostility;hostility=(x,y)=>x===w&&y===a?90:0;
   let txt="";try{S.turn++;txt=affairMonth()}finally{hostility=h0}o.exp=!a.affair&&txt.includes(w.name)&&/tố giác/.test(txt);o.txt=txt.replace(/<[^>]+>/g,"").slice(0,160)}finally{deathSentence=ds0}
  /* 3 tryst plans for a real pair */const m2=S.men.find(x=>x.alive&&x!==m);c.affair=m2.id;m2.alive=true;S.menPlans=[];delete S.npw;const w0=wk();const weeks=[];
  for(let t=w0;t<w0+12;t++){S.turn=Math.floor(t/3);S.tuan=t%3;menMakePlans(t)}for(const P of S.menPlans)if(P.r==="tryst"&&P.v===c.id)weeks.push(P.w);
  const gap=MEN_ROVE.some(t=>hasT(m2,t))?BAL.ag.why.tryst.cd[0]:BAL.ag.why.tryst.cd[1];o.weeks=weeks;o.gap=gap;
  o.tr=weeks.length>=2&&weeks.every((x,i)=>!i||x-weeks[i-1]>=gap);o.trOnly=S.menPlans.filter(P=>P.r==="tryst").every(P=>{const v=RV(P.v);return v&&v.affair===P.m});
  /* 4 likeV among the two most beautiful */for(const x of S.men)x.likeV=null;menInit();const C=liveRivals(false).filter(x=>!x.queen&&(x.age||20)>=18&&!x.affair).sort((x,y)=>(typeof effSac==="function"?effSac(y)-effSac(x):y.sac-x.sac));
  const top2=C.slice(0,2).map(x=>x.id);o.lv=S.men.filter(x=>x.likeV!=null).every(x=>top2.includes(x.likeV));o.top2=top2;return o});
 ok(r.n>=4&&r.men>=1,'setup',{n:r.n,men:r.men});ok(r.a1,'1 lonely consort with an admirer takes that man');ok(r.c1,'1 lonely consort nobody fancies: no affair');ok(r.f1,'1 favoured consort: no affair');
 ok(r.noExp,'2 no accuser with proof + grudge: never exposed (30 months)');ok(r.exp,'2 exposed by the named accuser',r.txt);
 ok(r.tr,'3 a pair meets at the BAL gap',{weeks:r.weeks,gap:r.gap});ok(r.trOnly,'3 tryst plans only for real pairs');ok(r.lv,'4 likeV = one of the two most beautiful',r.top2);
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat=NPW.stat;return o});
 ok(!bot.e.length,'5 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'5 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1: '+f:'PASS npc-purpose-g1 ('+res.length+' checks)');process.exit(f?1:0)})();
