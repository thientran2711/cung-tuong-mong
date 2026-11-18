/* review/steal-minigame × review/balance-chain night (jnf, OD 16/11 22:45Z FINAL): the rung inside the ONE flip-choice resolve.
   Harness (T.setup / T.only / T.commitA / T.drain) copied from balance-chain dev/test/night-multi.js. Runs only on a build that has jnf
   (main today: prints SKIP). usage: node dev/test/steal-mg-nf.js <url> */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2000);
 if(!(await p.evaluate(()=>typeof nfOn==='function'&&typeof nfStep==='function'))){console.log("SKIP: no jnf in this build");await b.close();return}
 await p.evaluate(()=>{window.T={};
  /* his own visit (jvisit, from main) is not what these cases test: off (cap 0); night-final case 8 tests its order */T.vcap=BAL.visit.cap;BAL.visit.cap=0;
  /* the 10-night ledger (jledger) adds the tuần's other nights at the commit: these cases count the PLAYED tối only, so the ledger is off here; its own cases: dev/test/ledger.js */BAL.nt.on=false;
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;
   const L=liveRivals(false).filter(v=>nightCh(v)>0);L.forEach(v=>{v.preg=0});return L};
  /* answer every open dialog with its first option that is not a way out (Cáo bệnh / Tiến cử) */
  T.ch="Thôi";T.opts=null;
  T.drain=(max=80)=>{const seen=[];for(let n=0;n<max&&Q.length;n++){const m=Q[0];seen.push(m.pid||m.t);const o=m.opts||m.o;
    if(o&&o.length){if(m.pid==="nfch"){T.opts=o.map(x=>({n:x.n,x:x.x}));T.exp={f:fmt(stealLose("feign")),r:fmt(stealLose("road")),fk:stealKem(tonightOf(),"feign"),rk:stealKem(tonightOf(),"road"),rw:fmt(BAL.steal.m.road.win)}}let i=m.pid==="nfch"?o.findIndex(x=>x.n===T.ch):o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=o.findIndex(x=>x.n==="Thôi");if(i<0)i=0;
     try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}return seen};
  T.noCyc=()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"})};/* not her cycle tuần (jcycle would lock her night) */
  T.toEvening=()=>{let g=0;T.noCyc();while((S.buoi||0)<B4L&&g++<8){T.drain();used=4;nextBuoi()}T.drain()};
  T.endDay=()=>{const d=wk();T.noCyc();for(let g=0;g<12&&wk()===d;g++){T.drain();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi()}T.drain()};
  T.recs=L=>{const o={me:S.nights||0};L.forEach((v,i)=>o["r"+i]=v.nights||0);return o};
  T.only=who=>{if(who===S)S.cyb=Object.assign(S.cyb||{},{lie:wk()});/* not her cycle tuần (her card would be locked: jcycle) */const nc=nightCh;nightCh=function(p){p=p||S;return p===who?100:(nc(p)>0?1e-9:0)};/* the others keep a tiny weight: still on the tray, so they may attack */const rr=roll;roll=function(x){return x===90||x===65?true:rr.apply(this,arguments)};return()=>{nightCh=nc;roll=rr}};
 });


 await p.evaluate(()=>{
  /* the flip at the end of tối picks A (forced); NPCs never attack on their own unless a case says so */
  T.sw=window.stealWant;
  T.setup=()=>{const L=T.fresh();T.cu=T.cu||FAIRN.custom;FAIRN.custom=[0,0];T.cuA=T.cuA||(BAL.ag&&BAL.ag.emp&&BAL.ag.emp.custom);if(T.cuA)BAL.ag.emp.custom=[0,0];/* AG2 moved the custom weight to BAL.ag.emp.custom (ONE CORE); both off here *//* no mùng 1 / rằm custom night (j75): the flip must reach the tray */window.stealWant=()=>({u:0,p:0,mode:null});L.forEach(v=>{v.confined=0;v.block=0;v.out=0;v.ill=null});S.sung=50;T.toEvening();used=0;T.ch="Thôi";T.opts=null;return L};
  /* end tối with A forced as the flipped one (the real commit: realFlip → choice → resolve) */
  T.commitA=(A)=>{const un=T.only(A);try{T.endDay()}finally{un()}};
  T.fin=()=>{window.stealWant=T.sw;if(T.cu)FAIRN.custom=T.cu;if(T.cuA)BAL.ag.emp.custom=T.cuA};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* spy: every oSteal read INSIDE the one resolve (S.nfX st done, def not yet written), with the plain value read the same instant */
 await p.evaluate(()=>{const os=oSteal;T.os=[];oSteal=function(a,m){const r=os.apply(this,arguments);try{const x=S.nfX;if(x&&x.st==="done"&&!x.def){x.def=1;let pl;try{pl=os.apply(this,arguments)}finally{delete x.def}
   T.os.push({w:a===S?"me":a.id,m,r,pl})}}catch(e){}return r}});
 for(const [nm,ch,raw,want] of [["her Tranh sủng, game won","Tranh sủng",9,1],["her Chặn ngự giá, game won","Chặn ngự giá",8,1],["her Tranh sủng, game lost","Tranh sủng",1,0],["her Chặn ngự giá, skipped","Chặn ngự giá",null,0]]){
  const r=await p.evaluate(([ch,raw])=>{const L=T.setup();const [A]=L;T.ch=ch;T.os.length=0;const n0=__smgSt.length;
   window.__smgFake=()=>raw==null?{skipped:true,sync:true}:{raw,sync:true};const mr=Math.random;Math.random=()=>.999;/* every try fails: only the odds are read */
   try{T.commitA(A)}finally{Math.random=mr;window.__smgFake=null}
   const me=T.os.filter(o=>o.w==="me").map(o=>Object.assign(o,{up:stealRungUp(o.pl,1),top:oddsLv(o.pl)>=6}));const g=__smgSt.slice(n0).filter(z=>z.path==="her");T.fin();return{me,g,st:S.nfX&&S.nfX.st}},[ch,raw]);
  const o=r.me[0]||{};ok(nm,r.g.length===1&&r.me.length>=1&&(want?o.r===o.up&&(o.r>o.pl||o.top):o.r===o.pl)&&r.st==="done",r)}
 /* NPC attacker at the resolve: the NPC contest roll, same win line */
 for(const [nm,raw,want] of [["NPC attacker wins her roll → one rung up",10,1],["NPC attacker loses her roll → plain",0,0]]){
  const r=await p.evaluate(([raw])=>{const L=T.setup();const [A,B]=L;window.stealWant=(v,t)=>v===B&&t===A?{u:1,p:1,mode:"road"}:{u:0,p:0,mode:null};T.os.length=0;
   const kr=kg82NpcRaw;kg82NpcRaw=()=>raw;const mr=Math.random;Math.random=()=>.999;try{T.commitA(A)}finally{Math.random=mr;kg82NpcRaw=kr}
   const v=T.os.filter(o=>o.w===B.id).map(o=>Object.assign(o,{up:stealRungUp(o.pl,1)}));T.fin();return{v}},[raw]);
  const o=r.v[0]||{};ok(nm,r.v.length>=1&&(want?o.r===o.up:o.r===o.pl),r)}
 /* a save made while her game was open: the step resumes */
 const r9=await p.evaluate(()=>{const L=T.setup();S.nfX={d:wk(),st:"mg"};render();return S.nfX.st});ok("stale 'mg' after load → back to 'open'",r9==="open",r9);
 let bad=0;for(const k in R){console.log((R[k].pass?"PASS":"FAIL")+" | "+k+" | "+JSON.stringify(R[k].info).slice(0,400));if(!R[k].pass)bad++}
 console.log("page errors:",errs.length?errs.slice(0,5):0);await b.close();process.exit(bad||errs.length?1:0)})();
