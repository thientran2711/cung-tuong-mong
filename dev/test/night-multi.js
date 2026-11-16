/* night-multi (owner OD 16/11 22:25Z canon night rule + 22:10Z no speed reward + 22:17Z ties): a Tranh sủng / Chặn ngự giá try
   resolves AT ONCE (one roll vs its own odds); her win = the thị tẩm sequence now + the day ends; a fail = Sủng −BAL.steal.failSung and
   she plays on; NPC tries of a khắc come only AFTER she has had that khắc; several successes in one batch → higher Sủng, equal → fair
   seeded roll; nobody wins → the intended consort's night at the end of tối; exactly one night record.
   usage: node dev/test/night-multi.js <url>   (exit 0 = all pass) */
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


 await p.evaluate(()=>{
  /* A holds tonight (her card cannot be picked), the other NPCs never try on their own unless a test says so */
  T.setup=()=>{const L=T.fresh();const A=L[0];const un=T.only(A);T.toEvening();un();T.drain();T.sw=T.sw||window.stealWant;window.stealWant=()=>({u:0,p:0,mode:null});
   L.forEach(v=>{v.duc=80;v.suc=80;v.confined=0;v.block=0;v.out=0;v.ill=null});S.duc=80;S.suc=80;S.sung=50;used=0;return L};
  T.myCard=road=>{deal();return deck.find(a=>a&&a.n===(road?"Chặn ngự giá":"Tranh sủng"))};
  T.play=(c,rnd)=>{const mr=Math.random;if(rnd!=null)Math.random=()=>rnd;try{act(deck.indexOf(c))}finally{Math.random=mr}};
  T.fin=()=>{window.stealWant=T.sw};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* 1. her card resolves AT ONCE: win → night hers now (summons first), cost paid, A gets nothing, the day ends after the sequence */
 let r=await p.evaluate(()=>{const L=T.setup();const [A]=L;const a={t:S.tonight===A};const c=T.myCard(0);a.card=!!c;const d0=S.duc,w0=wk();const n0=T.recs(L);
  T.play(c,0);a.cost=d0-S.duc===BAL.steal.cost.feign.duc;a.mine=S.tonight==="me";a.sum=Q.length>0&&Q[0].pid==="nfsum";a.settled=!!(S.ntk&&S.ntk.who==="me");
  const seen=T.drain();a.seq=seen.join(" > ");T.fin();T.endDay();const e=T.recs(L);a.me=e.me-n0.me;a.A=e.r0-n0.r0;a.dayOn=wk()!==w0;return a});
 ok("1 her try wins at once: summons → sequence, one record",r.t&&r.card&&r.cost&&r.mine&&r.sum&&r.settled&&r.me===1&&r.A===0&&r.dayOn,r);
 /* 2. her card fails at once: Sủng −failSung, A keeps the night, she stays in tối, the card is closed with the reason (j75 lock) */
 r=await p.evaluate(()=>{const L=T.setup();const [A]=L;const c=T.myCard(1);const s0=S.sung;const n0=T.recs(L);T.play(c,.999);
  const a={sung:s0-S.sung===BAL.steal.failSung,stillA:S.tonight===A,eve:(S.buoi||0)===B4L,closed:!ntCan(S)};deal();const c2=T.myCard(1)||c;a.lock=!!c2.lock;a.why=String(c2.t||"");
  T.endDay();T.fin();const e=T.recs(L);a.me=e.me-n0.me;a.A=e.r0-n0.r0;return a});
 ok("2 her try fails at once; card locked with reason; A's night at the end of tối",r.sung&&r.stillA&&r.eve&&r.closed&&r.lock&&/đã thử/.test(r.why)&&r.me===0&&r.A===1,r);
 /* 3. NPC tries never before her: B wants it surely; nothing happens until she has had khắc 0; then B tries in khắc 0's NPC turn */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;window.stealWant=v=>v===B?{u:1,p:.999,mode:"feign",o:50}:{u:0,p:0,mode:null};const a={};
  render();a.before=(S.nfA&&S.nfA.n)||0;a.k0=S.nfA?S.nfA.K:0;const mr=Math.random;Math.random=()=>.01;try{spend(1);render()}finally{Math.random=mr}a.after=S.nfA.n;a.k1=S.nfA.K;T.fin();return a});
 ok("3 NPC tries only after her khắc",r.before===0&&r.k0===0&&r.after===1&&r.k1===1,r);
 /* 4. one batch, several successes → higher Sủng wins; equal Sủng → the same seeded pick every time (no "earlier try") */
 r=await p.evaluate(()=>{const out={};for(const hi of ["me","B"]){const L=T.setup();const [A,B]=L;S.sung=hi==="me"?80:30;B.sung=hi==="me"?30:80;const n0=T.recs(L);
   nfResolve(A,[{a:B,mode:"feign",o:100},{a:S,mode:"feign",o:100}],true,0);T.drain();T.fin();T.endDay();const e=T.recs(L);out[hi]={me:e.me-n0.me,B:e.r1-n0.r1,A:e.r0-n0.r0}}
  const L=T.setup();const [A,B]=L;T.fin();const X=[{a:B},{a:S}];const pk=[nfSeedPick(X,1).a===S?"me":"B",nfSeedPick(X.slice().reverse(),1).a===S?"me":"B"];
  const C=L[2];if(C){const Y=[{a:B},{a:C},{a:S}];const seen={};for(let k=0;k<40;k++){const w=nfSeedPick(Y,k).a;seen[w===S?"me":w.id]=1}pk.push(Object.keys(seen).length)}
  out.tie=pk;return out});
 ok("4 several successes → higher Sủng; equal → seeded (order-free)",r.me.me===1&&r.me.B===0&&r.B.B===1&&r.B.me===0&&r.me.A===0&&r.B.A===0&&r.tie[0]===r.tie[1]&&(r.tie[2]==null||r.tie[2]>=2),r);
 /* 5. NPC vs NPC (two-way law): B's agent act in khắc 0 resolves at khắc 0's NPC turn; winner B only; A none */
 r=await p.evaluate(()=>{const L=T.setup();const [A,B]=L;const n0=T.recs(L);const mr=Math.random;stealNight(B,A,"feign");const reg=S.nfA.L.length===1&&S.tonight===A;
  Math.random=()=>0;try{spend(1);render()}finally{Math.random=mr}const won=S.tonight===B;T.fin();T.endDay();const e=T.recs(L);return{reg,won,A:e.r0-n0.r0,B:e.r1-n0.r1,me:e.me-n0.me}});
 ok("5 NPC vs NPC at the khắc tick: thief only",r.reg&&r.won&&r.B===1&&r.A===0&&r.me===0,r);
 /* 6. ledger night (not played): stealPass(holder,{live:false}) returns lines, never touches the evening list */
 r=await p.evaluate(()=>{const L=T.setup();const [A]=L;window.stealWant=T.sw;S.nfA={d:wk(),L:[{w:"me",mode:"feign",o:50,k:0}],K:0,gU:0,n:0};const o=window.stealPass(A,{live:false});
  return{lines:Array.isArray(o.lines),keep:S.nfA.L.length===1,holder:!!o.holder}});
 ok("6 ledger pass (live:false) keeps the evening list",r.lines&&r.keep&&r.holder,r);
 const pass=Object.values(R).every(x=>x.pass);
 console.log(JSON.stringify({pass,R,errs},null,1));await b.close();process.exit(pass&&!errs.length?0:1)})();
