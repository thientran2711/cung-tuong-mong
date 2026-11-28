/* review/punish-tier BEFORE/AFTER (MAIN 162 «robot table before/after»): the SAME scripted cases on two builds (LIVE vs branch), outcome words only.
   Only functions both builds have (ACT.accuse.f, chReady, chNeed, restore, coldFree, seatFree, holders). usage: node dev/measure/punish-tier-vs.js <url> → «VS {...}» */
const {chromium}=require('playwright');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 const R=await p.evaluate(()=>{const O={};const r0=Math.random;const L=liveRivals(true).filter(x=>!x.queen);
  const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.evq={};x.punWk=null;x.punR=null;x.confined=0;x.mercy=1;x.nheWk=[];x.preg=0;x.out=false;x.alive=true;x.coldFrom=null;x.coldR=null;x.coldLife=0;if(x!==S){x.inv=[];x.dress=null;x.scandal=0}};
  const reset=()=>{try{CHM.clear()}catch(e){}for(const x of L)clean(x);clean(S);S.out=0;S.coldFrom=null;S.coldRank=0;S.coldLife=0;S.evc={};Q.length=0};
  const tan=(...P)=>{for(const x of liveRivals(true))if(x.rank===3&&!P.includes(x))x.rank=2;for(const x of P){x.rank=3;x.queen=false}};
  const st=v=>`${v===S?"her":"NPC"}: ${v.alive===false||(v===S&&S.dead)?"ban chết":(v===S?S.out:v.out)?`lãnh cung, ${v===S?RANKS[S.coldRank|0].n:(v.rank>=7?"Hoàng hậu":RANKS[v.rank].n)}${(v===S?S.coldLife:v.coldLife)?" chung thân":""}`:`${RANKS[v===S?S.rank:v.rank].n}${(v===S?S.confined:v.confined)?" + cấm túc":""}`}`;
  const win=f=>{Math.random=()=>0;try{return f()}finally{Math.random=r0}};const lose=f=>{Math.random=()=>0.999;try{return f()}finally{Math.random=r0}};
  const acc=(a,t,c,k,w,lost)=>{deedAdd(t,k,a===S?L[5]:S,w,"việc "+k);let n=0;try{n=chNeed(t,c)}catch(e){n=3}evA(a,t,n,c);const f=()=>ACT.accuse.f(a,t);return lost?lose(f):win(f)};
  const A=L[0],B=L[1],C=L[2];const row=(k,f)=>{reset();try{O[k]=f()}catch(e){O[k]="ERR "+e.message.slice(0,60)}};
  row("need: vượt phẩm / hại dung nhan / mưu hại / tư thông (on a Quý nhân)",()=>{A.rank=2;return ["vp","hd","mh","tt"].map(c=>chNeed(A,c)).join(" / ")});
  row("need on a Hoàng quý phi: hại dung nhan / mưu hại",()=>{A.rank=6;return ["hd","mh"].map(c=>chNeed(A,c)).join(" / ")});row("need on a Quý phi: hại dung nhan / mưu hại",()=>{A.rank=5;return ["hd","mh"].map(c=>chNeed(A,c)).join(" / ")});
  row("Tố giác hại dung nhan → a Tần (Tần 3/3 full)",()=>{S.rank=2;tan(A,B,C);acc(S,A,"hd","huydung",1);return `${st(A)}; Tần seat ${seatFree(3)?"free":"full"}`});
  row("Tố giác mưu hại → a Tần (Tần 3/3 full)",()=>{S.rank=2;tan(A,B,C);acc(S,A,"mh","poison",2);return `${st(A)}; Tần seat ${seatFree(3)?"free":"full"}`});
  row("Tố giác mưu hại → a Quý nhân",()=>{A.rank=2;acc(S,A,"mh","poison",2);return st(A)});
  row("Tố giác tư thông (thư từ) → a Tần",()=>{A.rank=3;acc(S,A,"tt","flirt",1);return st(A)});
  row("Tố giác khi quân (giả thai) → a Tần",()=>{A.rank=3;acc(S,A,"tt","cyfake",1);return st(A)});
  row("NPC Tố giác mưu hại → HER at Tần",()=>{tan(A);S.rank=3;acc(A,S,"mh","poison",2);return st(S)});
  row("NPC Tố giác hại dung nhan → HER at Tần",()=>{tan(A);S.rank=3;acc(A,S,"hd","huydung",1);return st(S)});
  row("HER Tố giác hại dung nhan LOST (target Quý nhân, she Tần)",()=>{S.rank=3;tan();A.rank=2;acc(S,A,"hd","huydung",1,true);return st(S)});
  row("HER Tố giác vượt phẩm LOST (target Hoàng quý phi, she Tần)",()=>{S.rank=3;A.rank=6;acc(S,A,"vp","vp",1,true);return st(S)});
  row("HER minh oan, Tần full (was Tần)",()=>{tan(A,B,C);S.rank=0;S.out=1;S.coldFrom=3;S.coldRank=S.coldFrom!=null&&typeof coldTitle==="function"?2:3;S.coldWk=wk()-9;S.coldTurn=-9;restore(true,"Án được lật");return st(S)});
  row("HER pardon (was Tần)",()=>{tan(A);S.rank=0;S.out=1;S.coldFrom=3;S.coldRank=typeof coldTitle==="function"?2:3;S.coldWk=wk()-9;S.coldTurn=-9;restore(false,"Ân xá");return st(S)});
  row("NPC pardon out of lãnh cung (was Tần)",()=>{tan();A.out=true;A.rank=typeof coldTitle==="function"?2:3;A.coldR=A.rank;A.coldFrom=3;A.coldWk=wk()-9;coldFree(A);return st(A)});
  Math.random=r0;return O});
 console.log('VS '+JSON.stringify({url:URL.replace(/.*\//,''),R,errs}));await b.close()})();
