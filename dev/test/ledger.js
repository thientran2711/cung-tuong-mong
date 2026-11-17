/* ledger (review/night-ledger): the 10-night Kính sự phòng ledger (jledger.js; owner OD 16/11 18:10Z, 18:40Z, 19:00Z, 19:05Z).
   1 the Hoàng hậu is never drawn on the tray; mùng một / rằm = her custom night (or a visit when she is barred)
   2 cycle BY DAY: a woman in her cycle tuần is drawn on the other days of that tuần, never on her cycle days; she is never the played holder
   3 played tối = her FIRST day (S.tonight "me" from the j8 flip pin); else the first NPC day
   4 her other days: Sổ ghi line "ngày {d}, ngươi được lật thẻ thêm một đêm" + BAL.nt.extraFx gains + its own conception roll, nights recorded;
     NPC other days silent without tai mắt, one line with tai mắt
   5 conception = conceiveCh × BAL.nt.concF as a FLOAT while the ledger runs (BAL.nt.on false → the old whole-% chance)
   6 a real day (tối → "Sang ngày mới"): ledger rolled at the commit and settled once; summons odds read BAL.ag.emp.summon (AG2, one core)
   usage: node dev/test/ledger.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof ldRoll==='function',null,{timeout:0});await p.waitForTimeout(1500);
 const R=await p.evaluate(()=>{const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
  const fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc()))break}Q.length=0;S.preg=0;S.pregUnk=0;
   liveRivals(false).forEach(v=>{v.preg=0;v.confined=0;v.block=0;v.ill=null});return liveRivals(false)};
  const id=p=>p===S?"me":p.id;
  /* 1. Hoàng hậu */
  {fresh();let q=queenP();if(!q||q===S){S.rank=Math.min(S.rank,5);q=queenP()}
   let bad=0,cus=0,vis=0,n=0;const t0=S.tuan;
   for(let k=0;k<60;k++){S.tuan=k%3;S.ledger=null;const L=ldRoll();for(const e of L.days){n++;if(e.y==="pick"&&q&&e.w===id(q))bad++;
     if([1,15].includes(e.d)){if(e.y==="custom"&&e.w===id(q))cus++;else if(e.y==="visit")vis++;else bad++}}}
   S.tuan=t0;ok("1 Hoàng hậu never on the tray; mùng một / rằm custom",q&&bad===0&&cus+vis===40,{q:q&&q.name,bad,cus,vis,n})}
  /* 2. cycle by day */
  {const L0=fresh();const A=L0.find(v=>(cycleDaysOf(v,null,0)||[]).length&&!(queenP()===v));const t0=S.tuan;S.tuan=cyBase(A).t;
   const cd=cycleDaysOf(A,null,0);const nc=nightCh;nightCh=function(p){p=p||S;const c=nc(p);return p===A?(c>0?100:100):(c>0?1e-3:0)};
   /* A is in her cycle tuần: jcycle's tray reads her off the whole tuần (cyTray), the ledger only on her days */
   let onCyc=0,off=0,played=0,pCyc=0;try{for(let k=0;k<40;k++){S.ledger=null;const L=ldRoll();for(const e of L.days){if(e.w===A.id){if(cd.includes(e.d))onCyc++;else off++}}if(L.p>=0&&L.days[L.p].w===A.id){played++;if(cd.includes(L.days[L.p].d))pCyc++}}}finally{nightCh=nc;S.tuan=t0}
   ok("2 cycle by day: drawn on her other days, never her cycle days, played only on a non-cycle day",onCyc===0&&off>0&&pCyc===0,{A:A.name,cd,onCyc,off,played,pCyc})}
  /* 7. the PLAYED scene by day (review r1): her in her cycle tuần, 12 months (lengths 5/6/7 by cyLen) */
  {fresh();S.age=20;S.preg=0;S.cyb={};const t0=S.tuan,u0=S.turn;const nc=nightCh;nightCh=function(p){p=p||S;const c=nc(p);return p===S?(c>0?100:0):(c>0?1e-3:0)};
   const lens={},rows=[];let bad=0,playOff=0,blockIn=0,trayBefore=0;
   try{for(let m=0;m<12;m++){S.turn=u0+m;S.tuan=cyBase(S).t;S.cyb={};const cd=cycleDaysOf(S,null,0);lens[cd.length]=(lens[cd.length]||0)+1;
     if(cd.length!==cyLen(S,S.turn))bad++;
     S.ledger=null;if(cyTray(S))trayBefore++;           /* before the roll nothing blocks the whole tuần */
     const L=ldRoll();for(const e of L.days)if(e.w==="me"&&cd.includes(e.d))bad++;
     const pe=L.days[L.p];if(pe&&pe.w==="me"){if(cd.includes(pe.d))bad++;else if(!cyTray(S)&&nightCh(S)>0)playOff++}
     /* force the played tối onto her cycle day: the scene is blocked (cyTray true, nightCh 0) */
     const save=L.p;const ci=L.days.findIndex(e=>cd.includes(e.d));if(ci>=0){L.p=ci;if(cyTray(S)&&nightCh(S)===0)blockIn++;L.p=save}
     rows.push({m,len:cd.length,cd:cd[0]+"-"+cd[cd.length-1],p:pe?pe.d:null})}}finally{nightCh=nc;S.tuan=t0;S.turn=u0}
   ok("7 played scene by day: plays her non-cycle day, blocked on a cycle day; per-month 5/6/7 length",bad===0&&trayBefore===0&&playOff===12&&blockIn===12&&Object.keys(lens).length>=2,{lens,bad,trayBefore,playOff,blockIn,rows:rows.slice(0,6)})}
  /* 3. played tối = her first day; j8 flip pin */
  {const L0=fresh();S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"});const nc=nightCh;nightCh=function(p){p=p||S;const c=nc(p);return p===S?50:(c>0?50:0)};
   let good=0,tot=0,npcFirst=0,nT=0;try{for(let k=0;k<30;k++){S.ledger=null;S.tonight=null;const L=ldRoll();const i=L.days.findIndex(e=>e.w==="me");
     if(i>=0){tot++;if(L.p===i){const pin=ldPin();if(pin===S)good++}}
     else{nT++;const j=L.days.findIndex(e=>e.y==="pick"&&!cyTray(rivals.find(v=>v.id===e.w)));if(L.p===j)npcFirst++}}}finally{nightCh=nc}
   ok("3 played tối = her first day (else first NPC day)",tot>0&&good===tot&&npcFirst===nT,{tot,good,nT,npcFirst})}
  /* 4. her other days */
  {fresh();S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"});const R0=liveRivals(false);const base=(S.tuan||0)*10;const A=R0.find(v=>queenP()!==v);
   S.ledger={wk:wk(),days:[...Array(10)].map((_,k)=>({d:base+k+1,w:[1,4,7].includes(k)?"me":k===2?A.id:null,y:[1,4,7].includes(k)?"pick":k===2?"pick":"blank"})),p:1,st:0};
   S.tonight="me";S.nfN=wk();const sw=window.stealWant;window.stealWant=()=>({u:0,p:0,mode:null});
   let nS=0,nA=0;const ng=night;night=function(q){q=q||S;if(q===S)nS++;if(q===A)nA++;return ng.apply(this,arguments)};
   const n0=S.nights||0,a0=A.nights||0,an0=S.an,l0=S.logSeq||0,mat=S.mat;S.mat=0;
   try{ldSettle()}finally{night=ng;window.stealWant=sw;S.mat=mat}
   const L=S.logs.slice(0,(S.logSeq||0)-l0).join(" | ");
   const lines=(L.match(/ngươi được lật thẻ thêm một đêm/g)||[]).length;
   ok("4 her other days: notice + gains + own conception roll; NPC silent w/o tai mắt",S.ledger.st===1&&(S.nights||0)-n0===2&&nS===2&&nA===1&&(A.nights||0)-a0===1&&lines===2&&S.an-an0===2*BAL.nt.extraFx.an&&!/cung ${A.name}/.test(L),{nights:(S.nights||0)-n0,nS,nA,lines,an:S.an-an0,log:L.slice(0,400)})}
  /* 5. float conception */
  {fresh();S.preg=0;const c1=conceiveCh(S);BAL.nt.on=false;const c0=conceiveCh(S);BAL.nt.on=true;
   ok("5 conception float = conceiveCh × concF",Math.abs(c1-c0*BAL.nt.concF)<1e-9&&Number.isInteger(c0),{c0,c1})}
  return R});
 /* 6. a real day */
 const R6=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}window.__bot=1;
  for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc()))break}Q.length=0;
  const drain=()=>{for(let n=0;n<80&&Q.length;n++){const m=Q[0];const o=m.opts||m.o;if(o&&o.length){let i=m.pid==="nfch"?o.findIndex(x=>x.n==="Thôi"):o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=0;try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift();S.mg=0}};
  const rr=roll;const seen=[];roll=function(x){if(BAL.ag.emp.summon.includes(x))seen.push(x);return rr.apply(this,arguments)};
  const out=[];try{for(let d=0;d<6;d++){const w=wk();const nS=S.nights||0,nR=rivals.reduce((a,v)=>a+(v.nights||0),0);
   for(let g=0;g<14&&wk()===w;g++){drain();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi()}drain();
   const L=S.ledger;const got=L&&L.wk===w?L.days.filter(e=>e.w).length:-1;
   out.push({w,st:L&&L.wk===w?L.st:-1,got,rec:(S.nights||0)-nS+rivals.reduce((a,v)=>a+(v.nights||0),0)-nR})}}finally{roll=rr}
  return{out,seen:seen.length}});
 const okd=R6.out.every(x=>x.st===1&&x.got>=0&&x.rec===x.got)&&R6.seen>0;
 R["6 real days: rolled at the commit, settled once, one record per night"]={pass:okd,info:R6};
 let fail=0;for(const [k,v] of Object.entries(R)){if(!v.pass)fail++;console.log((v.pass?"PASS ":"FAIL ")+k+"  "+JSON.stringify(v.info).slice(0,500))}
 console.log(errs.length?"page errors: "+errs.slice(0,5).join(" | "):"0 page errors");console.log(fail?`${fail} FAIL`:"ALL PASS");
 await b.close();process.exit(fail||errs.length?1:0)})();
