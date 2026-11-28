/* NPC-PURPOSE G1 parts 7-10 — j22 / j4 / j21 / j54 / j71 / j75 / j95b deeds come from a person with a goal (kinds jagwhy1 kspCheck, story, mock, callMe, f7Enter,
   f7Merit, nightPrep, famGift, lieMe, blameMe, frameMe; BAL.ag.why.{j22,story,call,f7,j75,lie}).
   1 nobody resents her → nobody checks the Kính sự phòng book · 2 a story step waits for its person's plan clock (none in the first month)
   3 nobody with a motive → no mockery · 4 nobody likes or resents her → nobody calls · 5 contest entrants = those who want his eye, most eager first
   6 nobody seeks a name → no merit deed · 7 nobody with a motive → no lie, no blame, no frame · 8 the listener of a lie = one the spreader likes
   9 bot run 32 buổi without errors
   usage: node dev/test/npc-purpose-g1g.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw|wd|empDay/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const L=liveRivals(false);o.n=L.length;
  const calm=()=>{for(const v of rivals){v.sung=90;v.oan=0;v.ghen=0;v.rel=0;v.ro={};v.rl={};v.confined=0;v.danh=90;v.duc=0;v.malice=0;v.arts={}}S.ksKnows=0;delete S.npw;S.callW=0};
  const amb=BAL.ag.why.f7.ambT;const tr0=traitsOf;traitsOf=x=>x===S?tr0(x):["Ôn hòa"];
  calm();o.w1=!npcWhy("kspCheck",{C:L});
  calm();const st={};o.w2a=!npcWhy("story",npw1Sc(st,"tt1"));st.at_tt1=wk()-BAL.ag.why.story.wait.tt1;o.w2b=!!npcWhy("story",npw1Sc(st,"tt1"));
  calm();o.w3=!npcWhy("mock");
  calm();o.w4=!npcWhy("callMe");
  calm();const a=L[0],b=L[1];a.sung=0;b.sung=20;const E=npcWhyAll("f7Enter",{NP:L}).sort((x,y)=>y.s-x.s);o.e=E.map(x=>x.who.name);o.w5=E.length===2&&E[0].who===a;
  calm();o.w6=!npcWhy("f7Merit",{L});
  calm();o.w7=L.every(x=>!npcWhy("lieMe",{x})&&!npcWhy("blameMe",{a:x})&&!npcWhy("frameMe",{a:x}));
  calm();const LC=L.filter(y=>!sameHouse(y,S)&&aff(y,S)>-30);/* G1 #8: two the listener rule can reach (another house, not hostile to her); the first two of L were sometimes out of it by the start */const sp=L[0],fr=LC.find(y=>y!==sp)||L[1];sp.ro={};try{relAdd(sp,fr,60)}catch(e){}fr.ro={};let hit=0;for(let i=0;i<10;i++)if(j95bListener(sp)===fr)hit++;o.w8=hit>=4;o.h8=hit;
  traitsOf=tr0;return o});
 ok(r.n>=4,'setup',r.n);ok(r.w1,'1 nobody resents her → no book check');ok(r.w2a&&r.w2b,'2 story step waits for its plan clock',[r.w2a,r.w2b]);ok(r.w3,'3 no motive → no mockery');ok(r.w4,'4 no reason → nobody calls');
 ok(r.w5,'5 entrants = those who want his eye, most eager first',r.e);ok(r.w6,'6 nobody seeks a name → no merit deed');ok(r.w7,'7 no motive → no lie / blame / frame');ok(r.w8,'8 the listener is one the spreader likes',r.h8);
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat={};for(const k of ["kspCheck","trystKnow","taimat","story","mock","callMe","suitor","f7Enter","f7Merit","nightPrep","famGift","lieMe","blameMe","frameMe","exposeMe"])o.stat[k]=NPW.stat[k];return o});
 ok(!bot.e.length,'9 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'9 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1g: '+f:'PASS npc-purpose-g1g ('+res.length+' checks)');process.exit(f?1:0)})();
