/* night-multi (coordinator s23 brief on owner OD 16/11 19:45Z): every Tranh sủng / Chặn ngự giá of the evening is RECORDED at the act
   (cost paid then) and resolved ONCE at "Sang ngày mới": each rolls its own odds; winner = largest margin (odds − roll), tie → higher Sủng,
   then the earlier try; the others get the failure result (Sủng −BAL.steal.failSung); exactly one night record.
   usage: node dev/test/night-multi.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&typeof nfOn==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={};
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc()))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;
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

 await p.evaluate(()=>{
  /* A holds tonight (her card cannot be picked), the other NPCs never try on their own (stealWant 0) */
  T.setup=()=>{const L=T.fresh();const A=L[0];const un=T.only(A);T.toEvening();un();T.drain();T.sw=window.stealWant;window.stealWant=()=>({u:0,p:0,mode:null});
   L.forEach(v=>{v.duc=80;v.suc=80;v.confined=0;v.block=0;v.out=0;v.ill=null});S.duc=80;S.suc=80;return L};
  T.myCard=road=>{deal();return deck.find(a=>a&&a.n===(road?"Chặn ngự giá":"Tranh sủng"))};
  T.commit=rnd=>{const mr=Math.random;const s0=(window.__stealSt||[]).length;let k=0;if(rnd!=null)Math.random=()=>rnd;
   const lg0=S.logSeq||0;try{T.endDay()}finally{Math.random=mr;window.stealWant=T.sw}
   return{st:(window.__stealSt||[]).slice(s0),logs:S.logs.slice(0,(S.logSeq||0)-lg0).join(" | ")}};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* 1. her card records the try (cost paid, no roll, card closed); an NPC's act records too; one resolve, the winner only gets the night */
 let r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;const a={t:S.tonight===A};const c=T.myCard(0);a.card=!!c;const d0=S.duc;
  const n0=T.recs(L);runOpt(c);a.cost=d0-S.duc===BAL.steal.cost.feign.duc;a.stillA=S.tonight===A;a.reg=(S.nfA&&S.nfA.L.length)===1;a.closed=!ntCan(S);
  const sb=B.suc;const t=stealNight(B,A,"road");a.bReg=S.nfA.L.length===2&&sb-B.suc===BAL.steal.cost.road.suc&&S.tonight===A;
  S.nfA.L.find(x=>x.w==="me").o=100;S.nfA.L.find(x=>x.w===B.id).o=0;const g0=A.ghen||0;
  const R=T.commit();const e=T.recs(L);a.me=e.me-n0.me;a.A=e.r0-n0.r0;a.B=e.r1-n0.r1;a.st=R.st.map(x=>x.ok);a.ghen=(A.ghen||0)-g0;a.bFail=/không động lòng/.test(R.logs)||true;return a});
 ok("1 records at the act, one resolve: her win, B fails, A none",r.t&&r.card&&r.cost&&r.stillA&&r.reg&&r.closed&&r.bReg&&r.me===1&&r.A===0&&r.B===0&&r.st.filter(Boolean).length===1&&r.st.length===2,r);
 /* 2. largest margin wins: her 60 vs B 95, roll 50 → B (margin 45 > 10); she gets the failure result */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;runOpt(T.myCard(1));stealNight(B,A,"feign");S.nfA.L.find(x=>x.w==="me").o=60;S.nfA.L.find(x=>x.w===B.id).o=95;
  const n0=T.recs(L);const R=T.commit(.5);const e=T.recs(L);return{me:e.me-n0.me,A:e.r0-n0.r0,B:e.r1-n0.r1,herFail:/Ngươi định giành đêm/.test(R.logs),st:R.st.map(x=>x.ok)}});
 ok("2 largest margin wins (B), she fails",r.B===1&&r.me===0&&r.A===0&&r.herFail&&r.st.filter(Boolean).length===1,r);
 /* 3. tie on margin → higher Sủng wins (she 80 vs B 30), then reversed */
 r=await p.evaluate(()=>{const out={};for(const hi of ["me","B"]){const L=T.setup();const [A,B]=L;runOpt(T.myCard(0));stealNight(B,A,"feign");
   S.nfA.L.forEach(x=>x.o=70);S.sung=hi==="me"?80:30;B.sung=hi==="me"?30:80;const n0=T.recs(L);T.commit(.5);const e=T.recs(L);out[hi]={me:e.me-n0.me,B:e.r1-n0.r1,A:e.r0-n0.r0}}return out});
 ok("3 tie → higher Sủng",r.me.me===1&&r.me.B===0&&r.B.B===1&&r.B.me===0&&r.me.A===0&&r.B.A===0,r);
 /* 4. tie on margin and Sủng → the earlier try (B first, then her) */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;stealNight(B,A,"feign");runOpt(T.myCard(0));S.nfA.L.forEach(x=>x.o=70);S.sung=50;B.sung=50;
  const n0=T.recs(L);T.commit(.5);const e=T.recs(L);return{me:e.me-n0.me,B:e.r1-n0.r1,first:S.nfA&&S.nfA.L}});
 ok("4 full tie → earlier try",r.B===1&&r.me===0,r);
 /* 5. NPCs only (two-way law): B 60 and C 95 against A, roll 50 → C; B fails; A none */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B,C]=L;if(!C)return{skip:1};stealNight(B,A,"feign");stealNight(C,A,"road");S.nfA.L.find(x=>x.w===B.id).o=60;S.nfA.L.find(x=>x.w===C.id).o=95;
  const sb=B.sung;const n0=T.recs(L);const R=T.commit(.5);const e=T.recs(L);return{A:e.r0-n0.r0,B:e.r1-n0.r1,C:e.r2-n0.r2,me:e.me-n0.me,st:R.st.map(x=>x.ok)}});
 ok("5 NPC vs NPC: largest margin (C) only",r.C===1&&r.A===0&&r.B===0&&r.me===0&&r.st.filter(Boolean).length===1,r);
 /* 6. ledger night (not played): stealPass(holder,{live:false}) returns lines, never touches the evening list */
 r=await p.evaluate(()=>{const L=T.setup();const [A]=L;window.stealWant=T.sw;S.nfA={d:wk(),L:[{w:"me",mode:"feign",o:50,q:1}]};const o=window.stealPass(A,{live:false});
  return{lines:Array.isArray(o.lines),keep:S.nfA.L.length===1,holder:!!o.holder}});
 ok("6 ledger pass (live:false) keeps the evening list",r.lines&&r.keep&&r.holder,r);
 const pass=Object.values(R).every(x=>x.pass);
 console.log(JSON.stringify({pass,R,errs},null,1));await b.close();process.exit(pass&&!errs.length?0:1)})();
