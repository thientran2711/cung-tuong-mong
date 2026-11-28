/* review/charge-evidence (D4) — unit checks on the real page: per-charge store, find odds factors, accusation by one full charge,
   punishment by charge, old-save spread, two-way (NPC on her). usage: node dev/test/charge-smoke.js <url>. Exit 1 on a fail / page error. */
const {chromium}=require('playwright');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,300)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1200);
 const R=await p.evaluate(()=>{BAL.charge.rep.n=99;/* PUNISH-TIER: the repeat-nhẹ rule is tested in punish-tier.js; these steps punish the same people many times */const out=[];const ok=(c,m)=>out.push([!!c,m]);Q.length=0;
  window.__tw||(window.__tw=1,(()=>{const d0=deedAdd;deedAdd=function(p,k){const d=d0.apply(this,arguments);try{if(d&&p)for(const s of allServ().filter(s=>s&&s.sid!=null&&!s.out).slice(0,3))chSawAdd(p,chOfDeed(k),"s"+s.sid)}catch(e){}return d}})());/* REAL-PROOF fixture: three real servants stood where each test deed was done (in play the day record gives who was there) */
  const L=liveRivals(true).filter(x=>!x.queen);const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.scandal=0;x.affair=null;x.pregMismatch=0;x.plan=null;x.inv=[];x.dress=null};L.slice(0,3).forEach(clean);const v=L[0],w=L[1];BAL.charge.rkPlus.fill(0);/* PUNISH-TIER: base needs; the rank add-on is tested in punish-tier.js */v.wrongs=[];v.dw=0;v.schemes=0;v.dws=0;v.evc={};v.evq={};v.ev=0;S.evc={};S.ewc={};S.evq={};
  ok(deedCap(v)===0,'clean target: cap 0');ok(!chSearch(S,null,()=>evA(S,v,1)),'search on a clean target finds nothing');ok(!chMissed(),'no miss line on a clean target (nothing to find)');
  deedAdd(v,"poison",w,2,"bỏ độc")/* PUNISH-TIER: mưu hại = nặng, 3 pieces */;ok(chCapC(v,"mh")===3,'one poisoning: mưu hại cap 3 (= pieces needed)');ok(deedCap(v)===3,'deedCap = per-charge caps');
  /* certain pieces (caught): go to the charge */
  evA(S,v,2);ok(chHave(S,v,"mh")===1&&chWit(S,v,"mh")===1&&v.ev===1,'2 certain pieces → mưu hại 1 chứng cứ + 1 nhân chứng (PUNISH-TIER-3: finds alternate), evidence total 1');ok(!accOK(S,v),'1/3 mưu hại: cannot accuse');
  ok(/Mưu hại tính mạng \(nặng\): chứng cứ 1\/3, nhân chứng 1\/1/.test(chLine(S,v)),'card line: '+chLine(S,v));ok(/Tìm chứng tội mưu hại/.test(chFindTxt(S,v,S.maid)),'search card text names the charge she builds: '+chFindTxt(S,v,S.maid));
  /* find odds factors */
  S.tamco=60;v.tamco=10;v.rank=2;Object.defineProperty(S,'mat',{get:()=>0,configurable:true});let F=chFind(S,v,"mh",null);ok(F.band===4,`tâm cơ gap +50 → +2 bands (cap): band ${F.band}`);
  S.tamco=10;v.tamco=60;F=chFind(S,v,"mh",null);ok(F.band===0,`tâm cơ −50 → −2: band ${F.band}`);
  const setMat=(p,n)=>Object.defineProperty(p,'mat',{get:()=>n,configurable:true});S.tamco=30;v.tamco=30;setMat(S,4);F=chFind(S,v,"mh",null);ok(F.band===4,`Tai mắt 4 → +2: band ${F.band}`);setMat(S,2);F=chFind(S,v,"mh",null);ok(F.band===3,`Tai mắt 2 → +1: band ${F.band}`);
  setMat(S,0);v.rank=5;F=chFind(S,v,"mh",null);ok(F.band===1,`target Phi → −1: band ${F.band}`);v.rank=2;
  S.evq[key(v)]={mh:2};F=chFind(S,v,"mh",null);ok(F.band===4&&/2 lần/.test(F.why.join()),`2 misses → +2: band ${F.band}`);S.evq={};
  F=chFind(S,v,"vp",null);ok(F.band===6,'vượt phẩm base Rất vững');F=chFind(S,v,"tt",null);ok(F.band===1,'tư thông base Hiểm');
  /* a search: miss raises next, hit resets */
  const r0=Math.random;Math.random=()=>0.99;let n=chSearch(S,null,()=>evA(S,v,1));ok(!n&&chMissed()&&(S.evq[key(v)].mh===1),'missed search: +1 miss on mưu hại');ok(/chưa tìm ra chứng tội mưu hại/.test(chMissTxt(v)),'miss text: '+chMissTxt(v));
  window.__dbg=JSON.stringify({m:S.evc[key(v)],ord:chOrd(v),cap:chCapC(v,'vp'),ev:v.ev});Math.random=()=>0.0;n=chSearch(S,null,()=>evA(S,v,2));Math.random=r0;window.__dbg+=JSON.stringify({m:S.evc[key(v)],tries:CHLAST.tries});ok(n===2&&chHave(S,v,"mh")===3&&!(S.evq[key(v)].mh),'2 hits: 3/3 (+ 1/1 nhân chứng), miss counter reset');
  ok(accOK(S,v)&&chReady(S,v)==="mh",'3/3 mưu hại: can accuse (charge mh)');
  /* accusation: success → lãnh cung (mh), only that charge spent */
  deedAdd(v,"vp",null,1,"dùng đồ vượt phẩm");evA(S,v,1,"vp");const tot0=v.ev;Math.random=()=>0.0;let r="";try{ACTX={a:S,pen:0};r=ACT.accuse.f(S,v)}finally{ACTX={a:null,pen:0};Math.random=r0}
  ok(v.out===true||v.alive===false||v.mercy===1,'accused of mưu hại (nặng): giáng + lãnh cung ('+String(r).replace(/<[^>]+>/g,'')+')');ok(chHave(S,v,"mh")===0&&chHave(S,v,"vp")===1&&v.ev===1,`only mưu hại pieces spent (vp kept, total ${tot0}→${v.ev})`);
  /* two-way: an NPC on her */
  S.wrongs=[];S.dw=0;S.schemes=0;S.dws=0;S.evc={};S.ewc={};w.evc={};w.ewc={};w.evq={};w.evm=w.evm||{};w.evm.me=0;S.out=0;S.rank=3;S.punWk=null;
  deedAdd(S,"trip",w,1,"ngáng chân");ok(chCapC(S,"uh")===chNeed(S,"uh"),'her one ức hiếp: cap = need '+chNeed(S,"uh")+' (PUNISH-TIER: nhẹ needs 1)');setMat(S,3);
  const lg0=(S.log||[]).length;Math.random=()=>0.0;chSearch(w,null,()=>evA(w,S,chNeed(S,"uh")));Math.random=r0;ok(chHave(w,S,"uh")===chNeed(S,"uh")&&accOK(w,S),'NPC searching her: full ức hiếp, can accuse');
  ok(JSON.stringify(S.logs||[]).includes('Tai mắt báo'),'her Tai mắt warn her of the search');
  Math.random=()=>0.0;try{ACTX={a:w,pen:0};ACT.accuse.f(w,S)}finally{ACTX={a:null,pen:0};Math.random=r0}ok(S.rank===3&&S.confined>0&&!S.out,`ức hiếp proven on her: cấm túc, rank kept (rank ${S.rank}, confined ${S.confined})`);
  const nt=Q.find(x=>x&&x.kit||x);ok(Q.length>0,'her punishment notice queued');const txt=JSON.stringify(Q.map(x=>x.kit||x.h||x)).replace(/\\u003c|<[^>]*>/g,'');ok(/ức hiếp/.test(txt)&&/Ai tố/.test(txt),'notice names the charge + accuser');Q.length=0;
  /* old save: a total with no breakdown spreads onto the real deeds */
  const u=L[2];u.wrongs=[];u.dw=0;u.schemes=0;u.dws=0;deedAdd(u,"musk",w,2,"xạ hương");deedAdd(u,"il",null,1,"đồ cấm");S.evc={};u.ev=4;const m=chSync(S,u);ok(m.il+m.mh===4&&m.il<=2&&m.mh<=3,'old save total 4 spread: '+JSON.stringify(m));
  u.ev=1;chSync(S,u);ok(chSum(S.evc[key(u)])===1,'a direct lower total takes pieces back');
  return out});
 let f=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)f++}
 for(let i=0;i<6;i++){await p.evaluate(()=>{try{Q.length=0;endTurn()}catch(e){window.__e=String(e)}});await sleep(150)}
 const e2=await p.evaluate(()=>window.__e||'');if(e2)errs.push(e2);
 console.log('page errors:',errs.length,errs.slice(0,5));await b.close();process.exit(f||errs.length?1:0)})();
