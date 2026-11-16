/* night-final (owner OD 16/11 22:25Z canon, refines 19:45Z): the flip at the start of buổi tối names only the intended consort; a won try takes the night at once; else the night is committed
   ONCE at "Sang ngày mới" for exactly ONE woman (whoever holds it then); the loser gets no night record.
   usage: node dev/test/night-final.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={};
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;
   const L=liveRivals(false).filter(v=>nightCh(v)>0);L.forEach(v=>{v.preg=0});return L};
  /* answer every open dialog with its first option that is not a way out (Cáo bệnh / Tiến cử) */
  T.drain=(max=80)=>{const seen=[];for(let n=0;n<max&&Q.length;n++){const m=Q[0];seen.push(m.t);const o=m.opts||m.o;
    if(o&&o.length){let i=o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=0;try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}return seen};
  T.noCyc=()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"})};/* not her cycle tuần (jcycle would lock her night) */
  T.toEvening=()=>{let g=0;T.noCyc();while((S.buoi||0)<B4L&&g++<8){T.drain();used=4;nextBuoi()}};
  T.endDay=()=>{const d=wk();T.noCyc();for(let g=0;g<12&&wk()===d;g++){T.drain();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi()}T.drain()};
  T.recs=L=>{const o={me:S.nights||0};L.forEach((v,i)=>o["r"+i]=v.nights||0);return o};
  T.only=who=>{if(who===S)S.cyb=Object.assign(S.cyb||{},{lie:wk()});/* not her cycle tuần (her card would be locked: jcycle) */const nc=nightCh;nightCh=function(p){p=p||S;return p===who?100:0};const rr=roll;roll=function(x){return x===90||x===65?true:rr.apply(this,arguments)};return()=>{nightCh=nc;roll=rr}};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* 1. the flip waits for the evening; it picks HER: accepting the summons spends nothing until the day ends */
 let r=await p.evaluate(()=>{const L=T.fresh();const d0=wk();const a={t0:S.tonight,nfP:S.nfP===wk()};const un=T.only(S);const sw=window.stealWant;window.stealWant=()=>({u:0,p:0,mode:null});/* timing only: NPC last tries are case 4 + night-multi.js */
  T.toEvening();un();const k=Q.map(m=>m.pid);a.atTon=S.tonight;a.kspQ=k.includes("ksp");const n0=S.nights||0;T.drain();a.held=S.tonight==="me";a.spentEarly=(S.nights||0)-n0;
  a.prepOpen=Q.some(m=>m.pid==="prep");const L2=L.map(v=>v.nights||0);T.endDay();a.me=(S.nights||0)-n0;a.npc=L.reduce((s,v,i)=>s+(v.nights||0)-L2[i],0);a.day=(S.nightLog||[]).slice(-1)[0]===d0;a.nextDay=wk()===d0+1;window.stealWant=sw;return a});
 ok("1 flip at tối, her night spent once at day end",r.t0==null&&r.nfP&&r.atTon==="me"&&r.kspQ&&r.held&&r.spentEarly===0&&!r.prepOpen&&r.me===1&&r.npc===0&&r.day&&r.nextDay,r);
 /* 2. A's card turned; SHE steals it in the evening: only she is recorded, A gets nothing */
 r=await p.evaluate(()=>{const L=T.fresh();const A=L[0];const un=T.only(A);T.toEvening();un();const a={pickA:S.tonight===A};const b=T.recs(L);
  stealWin(S,A,"feign");T.drain();a.held=S.tonight==="me";a.early=(S.nights||0)-b.me;T.endDay();const e=T.recs(L);a.me=e.me-b.me;a.A=e.r0-b.r0;a.others=L.slice(1).reduce((s,v,i)=>s+e["r"+(i+1)]-b["r"+(i+1)],0);return a});
 ok("2 her steal: played at once, one record (hers), A none",r.pickA&&r.held&&r.early===1&&r.me===1&&r.A===0&&r.others===0,r);
 /* 3. A's card turned; NPC B steals it: B recorded, A none, the Sổ ghi line says he was invited to B (not 'B's card turned') */
 r=await p.evaluate(()=>{const L=T.fresh();const A=L[0],B=L[1];const un=T.only(A);T.toEvening();un();const b=T.recs(L);const s0=S.logSeq||0;
  stealWin(B,A,"feign");T.endDay();const e=T.recs(L);const logs=S.logs.slice(0,(S.logSeq||0)-s0).join(" ");
  return{A:e.r0-b.r0,B:e.r1-b.r1,me:e.me-b.me,line:/được mời sang cung/.test(logs),wrong:new RegExp("thẻ bài của "+B.name+" được lật").test(logs)}});
 ok("3 NPC↔NPC steal: B only, true line",r.A===0&&r.B===1&&r.me===0&&!r.wrong,r);
 /* 4. HER card turned and accepted (held); in an evening khắc, after she had it, NPC B's try wins: she gets no night, the thief does (OD 22:25Z) */
 r=await p.evaluate(()=>{const L=T.fresh();const B=L[1];const un=T.only(S);T.toEvening();un();T.drain();const held=S.tonight==="me";const b=T.recs(L);
  const sw=window.stealWant;window.stealWant=v=>v===B?{u:1,p:.999,mode:"feign",o:95}:{u:0,p:0,mode:null};B.duc=80;B.suc=80;B.confined=0;
  const mr=Math.random;Math.random=()=>.01;try{used=0;spend(1);render()}finally{Math.random=mr}const lost=S.tonight===B&&Q.some(m=>m.t==="Kính sự phòng");
  T.endDay();window.stealWant=sw;const e=T.recs(L);return{held,lost,me:e.me-b.me,B:e.r1-b.r1,tot:Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0)}});
 ok("4 NPC takes her held night in an evening khắc",r.held&&r.lost&&r.me===0&&r.B===1&&r.tot===1,r);
 /* 5. the Emperor's own visit (event) during the day: the night is hers and decided at once; it plays now (one record), the day ends */
 r=await p.evaluate(()=>{const L=T.fresh();const b=T.recs(L);S.buoi=1;used=0;Q.length=0;Q.push({t:"x",pid:"empnight",h:""});const x=Q[0];nightScene();Q.splice(Q.indexOf(x),1);
  const a={held:S.tonight==="me",settled:!!(S.ntk&&S.ntk.who==="me"),prep:Q.some(m=>m.pid==="prep")};a.stealOpen=typeof ntCan==="function"?ntCan(L[0]):null;
  T.drain();a.early=(S.nights||0)-b.me;T.endDay();const e=T.recs(L);a.me=e.me-b.me;a.tot=Object.keys(e).reduce((s,k)=>s+e[k]-b[k],0);return a});
 ok("5 his own visit: decided and played at once, spent once",r.held&&r.settled&&r.prep&&r.stealOpen===false&&r.early===1&&r.me===1&&r.tot===1,r);
 /* 6. invariant over 40 played days (no stubs): never more than ONE night record per day across all women */
 r=await p.evaluate(()=>{const L=T.fresh();const bad=[];let nights=0;for(let d=0;d<40&&!S.dead;d++){const w=wk();T.toEvening();if(Math.random()<.4&&S.tonight&&S.tonight!=="me")try{stealWin(S,S.tonight,"feign")}catch(e){}T.endDay();
   const all=[S].concat(typeof rivals!=="undefined"?rivals:[]);const n=all.reduce((s,x)=>s+((x.nightLog||[]).filter(z=>z===w).length),0);nights+=n;if(n>1)bad.push({w,n})}return{bad,nights,days:40}});
 ok("6 at most one night per day (40 days)",r.bad.length===0&&r.nights>0,r);
 const pass=Object.values(R).every(x=>x.pass);
 console.log(JSON.stringify({pass,R,errs},null,1));await b.close();process.exit(pass&&!errs.length?0:1)})();
