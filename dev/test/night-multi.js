/* night-multi (owner OD 16/11 22:45Z FINAL + 22:50Z defence + 22:10Z no speed reward; numbers = review/balance-core API): the flip choice's
   ONE resolve and its numbers. 1 several successes → higher Sủng; equal → seeded pick, order-free · 2 NPC vs NPC at the flip (agent choice
   at the commit), thief only, true Sổ ghi line · 3 a failed try = jbalcore stealFail (the mode's own loss, BAL.steal.m[mode].lose) ·
   4 ONE odds function: nfOdds = oSteal / oKeep, a kept defence = rungDown(o, BAL.steal.keep.rung) · 5 defence numbers: nobody took it →
   keepNoSteal (Sủng +BAL.steal.keep.gain); robbed → keepRobbed (heavier oán) · 6 the choice cards print the BAL numbers (no typed
   number) · 7 ledger pass (live:false): lines only, no night record.
   usage: node dev/test/night-multi.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={};
  /* his own visit (jvisit, from main) is not what these cases test: off (cap 0); night-final case 8 tests its order */T.vcap=BAL.visit.cap;BAL.visit.cap=0;
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
  T.setup=()=>{const L=T.fresh();T.cu=T.cu||FAIRN.custom;FAIRN.custom=[0,0];/* no mùng 1 / rằm custom night (j75): the flip must reach the tray */window.stealWant=()=>({u:0,p:0,mode:null});L.forEach(v=>{v.confined=0;v.block=0;v.out=0;v.ill=null});S.sung=50;T.toEvening();used=0;T.ch="Thôi";T.opts=null;return L};
  /* end tối with A forced as the flipped one (the real commit: realFlip → choice → resolve) */
  T.commitA=(A)=>{const un=T.only(A);try{T.endDay()}finally{un()}};
  T.fin=()=>{window.stealWant=T.sw;if(T.cu)FAIRN.custom=T.cu};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* 1. several successes → higher Sủng; equal Sủng → the same seeded pick whatever the order */
 let r=await p.evaluate(()=>{const out={};for(const hi of ["me","B"]){const L=T.setup();const [A,B]=L;const un=T.only(A);flip();un();S.tonight=A;
   S.sung=hi==="me"?80:30;B.sung=hi==="me"?30:80;const n0=T.recs(L);
   nfResolve(A,[{a:B,mode:"feign",o:100},{a:S,mode:"feign",o:100}],true,0);T.drain();T.endDay();const e=T.recs(L);out[hi]={me:e.me-n0.me,B:e.r1-n0.r1,A:e.r0-n0.r0}}
  const L=T.setup();const [A,B]=L;const X=[{a:B},{a:S}];const pk=[nfSeedPick(X,1).a===S?"me":"B",nfSeedPick(X.slice().reverse(),1).a===S?"me":"B"];
  const C=L[2];if(C){const Y=[{a:B},{a:C},{a:S}];const seen={};for(let k=0;k<40;k++){const w=nfSeedPick(Y,k).a;seen[w===S?"me":w.id]=1}pk.push(Object.keys(seen).length)}
  out.tie=pk;T.fin();return out});
 ok("1 several successes → higher Sủng; equal → seeded (order-free)",r.me.me===1&&r.me.B===0&&r.B.B===1&&r.B.me===0&&r.me.A===0&&r.B.A===0&&r.tie[0]===r.tie[1]&&(r.tie[2]==null||r.tie[2]>=2),r);
 /* 2. NPC vs NPC: B's agent choice is made AT the flip (the commit), resolved once; B only; the Sổ ghi line is true */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;window.stealWant=(v,t)=>v===B&&t===A?{u:1,p:1,mode:"feign"}:{u:0,p:0,mode:null};const n0=T.recs(L);
  const a={pre:S.tonight==null};const mr=Math.random;Math.random=()=>.001;let lg0=(S.log||[]).length;try{T.commitA(A)}finally{Math.random=mr}
  const e=T.recs(L);a.A=e.r0-n0.r0;a.B=e.r1-n0.r1;a.me=e.me-n0.me;const LG=(S.log||[]).map(x=>String(x.t||x)).join(" | ");a.wrong=new RegExp("thẻ bài của "+B.name+" được lật").test(LG);T.fin();return a});
 ok("2 NPC vs NPC at the flip: thief only, true line",r.pre&&r.B===1&&r.A===0&&r.me===0&&!r.wrong,r);
 /* 3. a failed try = stealFail: the mode's own loss from BAL.steal.m[mode].lose (Chặn ngự giá costs more than Tranh sủng) */
 r=await p.evaluate(()=>{const out={};for(const m of ["feign","road"]){const L=T.setup();const [A]=L;S.tonight=A;S.sung=50;S.danh=50;S.duc=50;const s0={sung:S.sung,danh:S.danh,duc:S.duc};
   const sf0=stealFail;let sf=null;stealFail=function(a,tt,md){if(a===S)sf=md;return sf0.apply(this,arguments)};try{nfResolve(A,[{a:S,mode:m,o:0}],true,"t")}finally{stealFail=sf0}const lo=BAL.steal.m[m].lose;out[m]={ok:Object.keys(lo).every(k=>Math.sign(S[k]-s0[k])===Math.sign(lo[k])&&Math.abs(S[k]-s0[k]-lo[k])<=1)/* ap's growth curve may round by 1 */&&sf===m,lose:lo,got:{sung:S.sung-s0.sung,danh:S.danh-s0.danh,duc:S.duc-s0.duc},holder:S.tonight===A}}T.fin();return out});
 ok("3 failure = stealFail (BAL.steal.m[mode].lose)",r.feign.ok&&r.road.ok&&r.feign.holder&&r.road.holder,r);
 /* 4. ONE odds function: nfOdds = oSteal / oKeep (balance-core), a kept defence drops BAL.steal.keep.rung rung(s) via rungDown */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;const cl=o=>Math.max(1,Math.min(99,Math.round(o)));const mood=mm;mm=()=>0;try{
  return{feign:nfOdds(B,"feign")===cl(oSteal(B,"feign")),road:nfOdds(B,"road")===cl(oSteal(B,"road")),keep:nfOdds(A,"keep")===cl(oKeep(A)),
   down:nfOdds(B,"feign",{down:1})===rungDown(cl(oSteal(B,"feign")),BAL.steal.keep.rung),w:[word(nfOdds(B,"feign")),word(nfOdds(B,"feign",{down:1}))],rung:BAL.steal.keep.rung}}finally{mm=mood;T.fin()}});
 ok("4 nfOdds = oSteal / oKeep; defence = rungDown(BAL.steal.keep.rung)",r.feign&&r.road&&r.keep&&r.down&&r.w[0]!==r.w[1],r);
 /* 5. her defence at the flip: kept (nobody won) → keepNoSteal applies Sủng +keep.gain (through ap: the growth curve may round it); robbed anyway → keepRobbed (her thiện cảm toward the winner drops more) */
 r=await p.evaluate(()=>{const out={};const L=T.setup();const [A,B]=L;const mr=Math.random;
  /* kept: B attacks, her keep succeeds, B fails */
  window.stealWant=(v,t)=>v===B&&t===S?{u:1,p:1,mode:"feign"}:{u:0,p:0,mode:null};S.sung=50;T.ch="Giữ chân Hoàng thượng";const kn=keepNoSteal;let kg=null;keepNoSteal=function(p){const s=p.sung;const n=kn.apply(this,arguments);if(p===S)kg=[n,p.sung-s];return n};const os=oSteal,ok0=oKeep;oSteal=()=>1;oKeep=()=>99;/* her keep holds, B's try fails */
  Math.random=()=>.5;try{const un=T.only(S);try{T.endDay()}finally{un()}}finally{Math.random=mr;oSteal=os;oKeep=ok0}
  keepNoSteal=kn;out.kept={kg,want:BAL.steal.keep.gain,x:S.nfX&&S.nfX.def};
  /* robbed: same, B succeeds although she held */
  const L2=T.setup();const [A2,B2]=L2;window.stealWant=(v,t)=>v===B2&&t===S?{u:1,p:1,mode:"road"}:{u:0,p:0,mode:null};T.ch="Giữ chân Hoàng thượng";
  const ra=typeof relAdd==="function"?relAdd:null;let hit=0,inK=0;relAdd=function(a,b,n){if(inK&&a===B2&&b===S)hit+=n;return ra.apply(this,arguments)};const kr=keepRobbed;keepRobbed=function(){inK=1;try{return kr.apply(this,arguments)}finally{inK=0}};
  Math.random=()=>.001;try{const un=T.only(S);try{T.endDay()}finally{un()}}finally{Math.random=mr;relAdd=ra;keepRobbed=kr}
  const M=BAL.steal.m.road;out.rob={hit,base:-M.rel,extra:-Math.round(M.rel*(BAL.steal.keep.oan-1)),B:S.tonight!=="me"};T.fin();return out});
 ok("5 defence: kept → keepNoSteal; robbed → keepRobbed",r.kept.kg&&r.kept.kg[0]===r.kept.want&&r.kept.kg[1]>0&&r.rob.hit===r.rob.extra&&r.rob.B,r);
 /* 6. the choice cards print the BAL numbers: attacker sees each mode's own loss; the flipped one sees keep.rung / keep.gain */
 r=await p.evaluate(()=>{const L=T.setup();const [A]=L;T.ch="Thôi";T.commitA(A);const att=T.opts;T.expA=T.exp;const L2=T.setup();T.ch="Thôi";const un=T.only(S);try{T.endDay()}finally{un()}const def=T.opts;T.fin();
  const has=(o,n,s)=>!!(o||[]).find(x=>x.n===n&&String(x.x||"").includes(s));const E=T.expA;
  return{ax:att&&att.map(x=>x.x),E,att:att&&att.map(x=>x.n),def:def&&def.map(x=>x.n),f:has(att,"Tranh sủng",E.f)&&has(att,"Tranh sủng",E.fk),r:has(att,"Chặn ngự giá",E.r)&&has(att,"Chặn ngự giá",E.rk)&&has(att,"Chặn ngự giá",E.rw),
   k:has(def,"Giữ chân Hoàng thượng",`khó thêm ${BAL.steal.keep.rung} bậc`)&&has(def,"Giữ chân Hoàng thượng",`Sủng +${BAL.steal.keep.gain}`)}});
 ok("6 choice cards print BAL numbers",r.f&&r.r&&r.k,r);
 /* 7. ledger night (not played): stealPass(holder,{live:false}) returns lines, no night record */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;window.stealWant=(v,t)=>v===B?{u:1,p:1,mode:"feign"}:{u:0,p:0,mode:null};const n0=T.recs(L);const o=window.stealPass(A,{live:false});const e=T.recs(L);T.fin();
  return{lines:Array.isArray(o.lines)&&o.lines.length>=1,tries:o.tries,rec:e.r0-n0.r0+e.r1-n0.r1+e.me-n0.me}});
 ok("7 ledger pass (live:false): lines only, no record",r.lines&&r.rec===0,r);
 const pass=Object.values(R).every(x=>x.pass);
 console.log(JSON.stringify({pass,R,errs},null,1));await b.close();process.exit(pass&&!errs.length?0:1)})();
