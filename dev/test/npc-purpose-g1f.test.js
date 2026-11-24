/* NPC-PURPOSE G1 part 6 — jts / jtsb / j8 deeds come from a person with a goal (kinds jagwhy1 tsGuard, empMercy, birthPlot, giftCheck, fakeIll, fakePreg, raid, bulWant,
   bulTell, fireHeed, tsDen; BAL.ag.why.{ts,bul,j8}).
   1 nobody threatens her → she does not close her doors · 2 the Emperor spares only one he still favours (Sủng / children)
   3 nobody hates the mother → no midwife plot · 4 no unchecked gift → no gift check · 5 a guileless or favoured consort never feigns illness
   6 no forbidden goods → no raid; forbidden goods + nobody resents her → no raid · 7 a plain bully takes silver when the target can pay
   8 a lantern only from one who wants favour or is devout · 9 bot run 32 buổi without errors
   usage: node dev/test/npc-purpose-g1f.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw|wd|empDay/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const L=liveRivals(false);o.n=L.length;const J=BAL.ag.why.j8;
  const calm=()=>{for(const v of rivals){v.sung=60;v.oan=0;v.ghen=0;v.rel=0;v.ro={};v.rl={};v.confined=0;v.bac=500;v.tamco=10;v.duc=30;v.kids=[];v.inv=(v.inv||[]).map(e=>Object.assign(e,{h:1}))}delete S.npw};
  calm();const v=L[0];o.w1=!npcWhy("tsGuard",{v});
  calm();v.sung=0;const m0=npcWhy("empMercy",{p:v});v.sung=90;const m1=npcWhy("empMercy",{p:v});o.w2=!m0&&!!m1;
  calm();const bad=L.slice(1,4);o.w3=!npcWhy("birthPlot",{p:v,bad});
  calm();o.w4=!npcWhy("giftCheck",{v});
  calm();o.w5a=!npcWhy("fakeIll",{v});v.tamco=90;v.sung=90;o.w5b=!npcWhy("fakeIll",{v});v.sung=0;o.w5c=!!npcWhy("fakeIll",{v});
  calm();o.w6a=!npcWhy("raid",{p:v});
  calm();const a=L[1],t=L[2];t.bac=500;a.traits=[];a.trait="Ôn hòa";const tr0=traitsOf;traitsOf=x=>x===a?["Ôn hòa"]:tr0(x);o.w7=!npcWhy("bulWant",{a,t});traitsOf=tr0;
  calm();for(const x of rivals){x.sung=90;x.duc=10}let dn=0;for(let i=0;i<5;i++){delete S.npw;dn+=npcWhyAll("tsDen").length}o.w8=dn===0;
  return o});
 ok(r.n>=4,'setup',r.n);ok(r.w1,'1 no danger → no closed doors');ok(r.w2,'2 mercy only for one he favours');ok(r.w3,'3 nobody hates her → no midwife plot');ok(r.w4,'4 no unchecked gift → no check');
 ok(r.w5a&&r.w5b&&r.w5c,'5 feigned illness only from a cunning, unfavoured consort',[r.w5a,r.w5b,r.w5c]);ok(r.w6a,'6 no forbidden goods → no raid');ok(r.w7,'7 plain bully takes silver');ok(r.w8,'8 no lantern without a wish');
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat={};for(const k of ["tsGuard","empSummon","tsDen","bulWant","bulTell","fireHeed","empMercy","birthPlot","maidSell","giftCheck","fakeIll","fakePreg","raid","empAsk"])o.stat[k]=NPW.stat[k];return o});
 ok(!bot.e.length,'9 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'9 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1f: '+f:'PASS npc-purpose-g1f ('+res.length+' checks)');process.exit(f?1:0)})();
