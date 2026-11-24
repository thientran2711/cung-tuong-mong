/* NPC-PURPOSE G1 part 5 — an NPC's day with the Emperor (jgift) and the wardrobe (j92) come from a person with a goal (kinds jagwhy1 seekEmp, wdRemark, wdDress, wdPawn, wdSpy; BAL.ag.why.{empDay,wd}).
   1 every consort favoured enough, none ambitious → no empDay · 2 one unfavoured consort → she is the one who seeks him
   3 nobody with a reason (Thái hậu gone, no grudge, no liking) → no remark on a plain outfit · 4 one consort with a grudge → she is the remarker, with the reason
   5 the same wearer is not remarked on again inside wd.gap tuần · 6 a consort who believes her clothes right, no festival → does not re-dress
   7 nobody short of silver → nobody pawns · 8 bot run 32 buổi without errors
   usage: node dev/test/npc-purpose-g1e.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&/npcWhy|npw|wd|empDay/.test(m.text()))errs.push(m.text())});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const o={};const L=liveRivals(false);o.n=L.length;const E=BAL.ag.why.seekEmp;
  const calm=()=>{for(const v of rivals){v.sung=E.want+10;v.oan=0;v.ghen=0;v.rel=0;v.ro={};v.rl={};v.confined=0;v.bac=500;v.th=0;v.traits=(v.traits||[]).filter(t=>!E.ambT.includes(t));if(E.ambT.includes(v.trait))v.trait="Ôn hòa"}S.th=0;delete S.npw};
  calm();o.amb=L.filter(v=>traitsOf(v).some(t=>E.ambT.includes(t))).length;let n1=0;for(let i=0;i<10;i++){delete S.npw;if(npcWhy("seekEmp"))n1++}o.w1=n1===0;o.n1=n1;
  calm();const a=L[0];a.sung=0;let h2=0,b2=0;for(let i=0;i<10;i++){delete S.npw;const x=npcWhy("seekEmp");if(x&&x.who===a)h2++;else b2++}o.w2=h2===10;
  const M0=BAL.ag.why.wd.meet;BAL.ag.why.wd.meet={ok:100,over:100,under:100,tang:100};/* G1 #7: the occasion odds (wd.meet) pass here; check 8 tests them */const thd=S.thDead;S.thDead=1;calm();const p=L[1];p.wd={tram:null,y:null};p.wdRmW=0;const r3=wdRemarker(p,"under");o.r3=r3&&r3.name;o.w3=r3===null||r3.v===queenP();
  calm();p.wdRmW=0;const h=L[2];h.ro={};h.ro[p.id]=0;try{relAdd(h,p,-70)}catch(e){}h.oan=0;const q=queenP();const rm=wdRemarker(p,"under");o.r4=rm&&{n:rm.name,w:rm.why};o.w4=!!rm&&(rm.v===h||(q&&rm.v===q))&&!!rm.why;
  delete S.npw;o.w5=wdRemarker(p,"under")===null;BAL.ag.why.wd.meet={ok:0,over:0,under:0,tang:0};delete S.npw;p.wdRmW=0;o.w8=wdRemarker(p,"under")===null;BAL.ag.why.wd.meet=M0;S.thDead=thd;
  calm();const d=L[3]||L[0];let called=0;const a0=wdAutoFor;wdAutoFor=function(){called++;return a0.apply(this,arguments)};const bs=wdBelStatus;wdBelStatus=(x,y)=>"ok";const tg=wdTang;wdTang=()=>false;const fs=wdFest;wdFest=()=>false;
   d.wd=d.wd||{tram:null,y:null};wdNpcDress(d);wdAutoFor=a0;wdBelStatus=bs;wdTang=tg;wdFest=fs;o.w6=called===0;
  calm();o.w7=npcWhyAll("wdPawn").length===0;
  return o});
 ok(r.n>=4,'setup',r.n);ok(r.w1,'1 nobody wants favour → no empDay',{amb:r.amb,n:r.n1});ok(r.w2,'2 the unfavoured one seeks the Emperor');ok(r.w3,'3 nobody with a reason → no remark (only the Empress keeps the rules)',r.r3);
 ok(r.w4,'4 the one with a grudge remarks, with the reason',r.r4);ok(r.w5,'5 wd.gap holds for the same wearer');ok(r.w6,'6 no reason → no re-dress');ok(r.w7,'7 nobody poor → no pawn');ok(r.w8,'8 a reason but no occasion this month (BAL.ag.why.wd.meet 0) → no remark');
 const bot=await p.evaluate(()=>{const o={e:[]};try{for(let i=0;i<32&&!S.dead;i++){try{nextBuoi()}catch(e){o.e.push(e.message)}Q.length=0}}catch(e){o.e.push(e.message)}o.stat={};for(const k of ["seekEmp","wdRemark","wdSpy","wdDress","wdNotice","wdSearch","wdPawn"])o.stat[k]=NPW.stat[k];return o});
 ok(!bot.e.length,'8 bot run: no errors',bot.e.slice(0,3));ok(!errs.length,'8 no page / npcWhy errors',errs.slice(0,3));console.log('npw stat '+JSON.stringify(bot.stat));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-purpose-g1e: '+f:'PASS npc-purpose-g1e ('+res.length+' checks)');process.exit(f?1:0)})();
