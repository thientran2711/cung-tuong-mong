/* review/punish-tier (owner OD 26/11 ~19:05Z + ~19:10Z «cây cao đón gió», MAIN 161) — the crime decides the penalty, on the real page, her and an NPC (law 1).
   usage: node dev/test/punish-tier.js <url> [W=755] [H=1000] [shotDir]   (exit 1 on a FAIL / page error)
   Checks: need by weight + rkPlus by rank · every evidence line shows its weight · vừa = one rank (seat frees) · nặng seat-free = lãnh cung keeping
   the title · nặng seated = giáng + lãnh cung (seat frees, holders skip her) · cực nặng = phế vị + lãnh cung or ban chết · release: owed rank when its
   seat is free else one lower (minh oan / pardon, her and an NPC) · failed accusation of a seated consort costs more · her notice rows Mức tội /
   Giáng phẩm / Lãnh cung («không» rows kept) · ROBOT: she climbs by bringing a Tần down (vừa and nặng both open the seat). */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',DIR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:DIR?2:1,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const r0=Math.random;Q.length=0;
  const L=liveRivals(true).filter(x=>!x.queen);const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.evq={};x.punWk=null;x.punR=null;x.confined=0;if(x!==S){x.scandal=0;x.affair=null;x.plan=null;x.inv=[];x.dress=null}};
  const sec=x=>JSON.stringify(x&&(x.kit&&x.kit.sections||x.sections)||"");const reset=()=>{try{CHM.clear()}catch(e){}for(const x of L.concat([S]))clean(x);S.evc={};S.evq={};S.out=0;S.coldFrom=null;S.coldRank=0;S.coldPend=null;S.confined=0;Q.length=0};
  const give=(h,t,c,k,n)=>{deedAdd(t,k,null,BAL.charge.actW[k]||BAL.charge.w[k]||1,"việc "+k);evA(h,t,n==null?chNeed(t,c):n,c)};
  const win=f=>{Math.random=()=>0;try{return f()}finally{Math.random=r0}};const lose=f=>{Math.random=()=>0.999;try{return f()}finally{Math.random=r0}};
  const rows=()=>{const q=Q.filter(x=>x&&(x.sections||x.h));const z=q[q.length-1];if(!z)return"";return JSON.stringify(z.sections||z.h)};
  reset();const A=L[0],B=L[1],C=L[2],D=L[3],E=L[4],F=L[5];
  /* 1. need by weight + rank (BAL.charge.tier + rkPlus) */
  A.rank=2;B.rank=3;C.rank=6;
  ok(chNeed(A,"vp")===1&&chNeed(A,"hd")===2&&chNeed(A,"mh")===3,`need by weight on a seat-free Quý nhân: nhẹ ${chNeed(A,"vp")} · vừa ${chNeed(A,"hd")} · nặng ${chNeed(A,"mh")}`);
  ok(chNeed(B,"hd")===2+BAL.charge.rkPlus[3]&&chNeed(C,"mh")===3+BAL.charge.rkPlus[6],`seated ranks need more: Tần vừa ${chNeed(B,"hd")} · Hoàng quý phi nặng ${chNeed(C,"mh")}`);
  /* 2. weight on every evidence line */
  give(S,A,"mh","poison",1);ok(/\(nặng\)/.test(chLine(S,A))&&/tội nặng/.test(chNeedTxt(S,A,"mh"))&&chRows(S,A).some(r=>/\(nặng\)/.test(r[0])),`evidence lines show the weight: «${chLine(S,A)}» · «${chNeedTxt(S,A,"mh")}»`);
  reset();A.rank=2;try{CHM.clear()}catch(e){}deedAdd(A,"tryst",null,2,"tư thông");ok(chTier(A,"tt")==="cuc"&&chTierN(A,"tt")==="cực nặng",'a real tư thông deed makes the charge cực nặng (cucDeed)');
  /* 3. ROBOT climb: she is Quý nhân, Tần is full; vừa on a Tần opens the seat */
  reset();S.rank=2;const T3=liveRivals(true).filter(x=>!x.queen&&x.rank===3);const need3=SEATCAP[3];for(const x of [A,B,C]){x.rank=3;x.queen=false}
  for(const x of liveRivals(true))if(x.rank===3&&![A,B,C].includes(x))x.rank=2;
  ok(!seatFree(3),`Tần full: ${holders(3).length}/${need3}`);
  give(S,A,"hd","huydung");const o1=accOK(S,A);win(()=>ACT.accuse.f(S,A));ok(o1&&A.rank===2&&!A.out&&seatFree(3),`ROBOT vừa: Tố giác hại dung nhan → ${A.name} Tần → ${RANKS[A.rank].n}, not in lãnh cung, Tần seat free (${holders(3).length}/${need3})`);
  /* 4. nặng on a seated rank = giáng + lãnh cung, the seat frees */
  A.rank=3;ok(!seatFree(3),'Tần full again');give(S,B,"mh","poison");win(()=>ACT.accuse.f(S,B));
  ok(B.out&&B.rank===2&&B.coldR===2&&B.coldFrom===3&&!holders(3).includes(B)&&seatFree(3),`ROBOT nặng seated: ${B.name} Tần → lãnh cung with title ${RANKS[B.rank].n} (coldFrom ${B.coldFrom}), Tần seat free`);
  ok(rkOfFace("consort",B)[1]==="Quý nhân · lãnh cung",`her face line inside: «${rkOfFace("consort",B)[1]}»`);
  /* 5. nặng on a seat-free rank = lãnh cung KEEPING the title */
  D.rank=2;give(S,D,"mh","poison");win(()=>ACT.accuse.f(S,D));ok(D.out&&D.rank===2&&D.coldR===2,`nặng seat-free: ${D.name} Quý nhân → lãnh cung, keeps Quý nhân`);
  /* 6. cực nặng: phế vị + lãnh cung (no death roll) or ban chết (roll) */
  E.rank=3;deedAdd(E,"tryst",null,2,"tư thông");evA(S,E,chNeed(E,"tt"),"tt");Math.random=()=>0.999;try{chPunish(E,"tt","bị tố giác",S)}finally{Math.random=r0}
  ok(E.out&&E.rank===0&&E.coldR===0&&E.alive!==false,`cực nặng spared: ${E.name} phế vị (rank ${E.rank}) + lãnh cung`);
  F.rank=2;deedAdd(F,"tryst",null,2,"tư thông");const was=BAL.eff.j8.mercyTurn;BAL.eff.j8.mercyTurn=-1;const ht=window.has;Math.random=()=>0;try{chPunish(F,"tt","bị tố giác",S)}finally{Math.random=r0;BAL.eff.j8.mercyTurn=was}
  ok(F.alive===false||F.out,`cực nặng death roll: ${F.name} ${F.alive===false?"bị ban chết":"(nhân từ) phế vị + lãnh cung"}`);
  /* 7. NPC release (law 1): pardon → title when the seat is free, else one lower; minh oan → rank before the conviction */
  B.coldWk-=BAL.pun.coldMinDays;coldFree(B,true);ok(!B.out&&B.rank===3,`NPC minh oan with a free Tần seat: back to ${RANKS[B.rank].n}`);
  const G=L[6]||L[0];reset();for(const x of [A,C,G])x.rank=3;for(const x of liveRivals(true))if(x.rank===3&&![A,C,G].includes(x))x.rank=2;
  D.out=true;D.rank=2;D.coldR=2;D.coldFrom=3;D.coldWk=wk()-BAL.pun.coldMinDays;coldFree(D,true);ok(!D.out&&D.rank===2,`NPC minh oan, Tần full: one lower → ${RANKS[D.rank].n}`);
  /* 8. HER (two-way): an NPC accuses her of a nặng crime while she is Tần → giáng + lãnh cung, her seat frees, notice rows */
  reset();for(const x of liveRivals(true))if(x.rank===3)x.rank=2;S.rank=3;A.rank=3;C.rank=3;Q.length=0;
  deedAdd(S,"poison",B,2,"bỏ độc");evA(A,S,chNeed(S,"mh"),"mh");win(()=>ACT.accuse.f(A,S));
  const nq=Q.find(x=>x&&x.t==="Lãnh cung");const nt=sec(nq);
  ok(S.out&&S.coldFrom===3&&S.coldRank===2&&!holders(3).includes(S)&&seatFree(3),`HER nặng seated: Tần → lãnh cung, title ${RANKS[S.coldRank].n}, coldFrom ${S.coldFrom}, her Tần seat free`);
  ok(/Mức tội/.test(nt)&&/nặng/.test(nt)&&/Giáng phẩm/.test(nt)&&/từ Tần xuống Quý nhân/.test(nt)&&/vẫn mang phẩm Quý nhân/.test(nt),`her lãnh cung notice rows: ${nt.replace(/\\"/g,"'").slice(0,300)}`);
  window.__coldQ=nq||null;
  /* 9. her release: pardon → title (Quý nhân, seat-free); minh oan with Tần full → one lower */
  S.coldWk=wk()-BAL.pun.coldMinDays;Q.length=0;restore(false,"Thái hậu mở lòng từ bi");ok(!S.out&&S.rank===2,`HER pardon: title kept inside → ${RANKS[S.rank].n}`);
  reset();for(const x of liveRivals(true))if(x.rank===3)x.rank=2;for(const x of [A,C,G])x.rank=3;S.rank=2;S.out=1;S.coldFrom=3;S.coldRank=2;S.coldWk=wk()-BAL.pun.coldMinDays;restore(true,"Án được lật");
  ok(!S.out&&S.rank===2,`HER minh oan, Tần full (${holders(3).filter(x=>x!==S).length}/${SEATCAP[3]}): one lower → ${RANKS[S.rank].n}`);
  for(const x of [C,G])x.rank=2;S.out=1;S.rank=0;S.coldFrom=3;S.coldRank=2;S.coldWk=wk()-BAL.pun.coldMinDays;restore(true,"Án được lật");ok(!S.out&&S.rank===3,`HER minh oan, Tần seat free: back to ${RANKS[S.rank].n}`);
  /* 10. vừa on her: one rank, notice rows «Lãnh cung: không» kept; nhẹ: «Giáng phẩm: không» */
  reset();S.rank=3;Q.length=0;deedAdd(S,"huydung",B,1,"hủy dung");evA(A,S,chNeed(S,"hd"),"hd");win(()=>ACT.accuse.f(A,S));const gq=sec(Q.find(x=>x&&/giáng/i.test(x.t||"")));
  ok(S.rank===2&&!S.out&&/Mức tội/.test(gq)&&/vừa/.test(gq)&&/Lãnh cung/.test(gq)&&/không/.test(gq),`HER vừa: Tần → ${RANKS[S.rank].n}; rows ${gq.replace(/\\"/g,"'").slice(0,220)}`);
  window.__giangQ=Q.find(x=>x&&/giáng/i.test(x.t||""))||null;
  reset();S.rank=2;Q.length=0;deedAdd(S,"vp",null,1,"vượt phẩm");evA(A,S,1,"vp");win(()=>ACT.accuse.f(A,S));const lq=sec(Q.find(x=>x&&/Phạt/i.test(x.t||"")));
  ok(S.rank===2&&!S.out&&/nhẹ/.test(lq)&&/Giáng phẩm/.test(lq),`HER nhẹ: phạt bổng, rank kept; rows ${lq.replace(/\\"/g,"'").slice(0,200)}`);
  /* 11. failed accusation costs more against a seated consort (BAL.charge.failRk) */
  reset();S.rank=3;S.danh=60;A.rank=2;give(S,A,"vp","vp");lose(()=>ACT.accuse.f(S,A));const d1=60-S.danh,c1=S.confined||0;
  reset();S.rank=3;S.danh=60;C.rank=6;give(S,C,"vp","vp");lose(()=>ACT.accuse.f(S,C));const d2=60-S.danh,c2=S.confined||0;
  ok(d2>d1&&c2>c1,`failed Tố giác: vs Quý nhân Danh −${d1} cấm túc ${c1} · vs Hoàng quý phi Danh −${d2} cấm túc ${c2}`);
  ok(chFailDanh(C)===Math.round(BAL.eff.j8.accuseFailDanh*BAL.charge.failRk.danhX[6])&&/phạm thượng/.test(chFailPun(C)),'the card prints the same fail cost (chFailDanh / chFailPun)');
  Math.random=r0;return out});
 let fails=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++}
 if(DIR){/* LOOK stills: the evidence card (weight on every charge) and her verdict notices */
  await p.evaluate(()=>{Q.length=0;closeModal();const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const v=L[0];v.wrongs=[];v.evc={};v.ev=0;S.evc={};S.out=0;S.rank=2;v.rank=3;
   deedAdd(v,"poison",L[1],2,`bỏ độc vào điểm tâm của ${L[1].name}`);deedAdd(v,"huydung",L[2],1,`hủy dung ${L[2].name}`);deedAdd(v,"vp",null,1,"ăn vận vượt phẩm");
   evA(S,v,chNeed(v,"hd"),"hd");evA(S,v,2,"mh");evA(S,v,1,"vp");try{k61Know(v,"",true,2)}catch(e){}kitEvidencePanel(v)});await sleep(1200);
  await p.screenshot({path:`${DIR}/evidence-${W}x${H}.png`});
  for(const k of ['__coldQ','__giangQ']){const has=await p.evaluate(k=>{closeModal();Q.length=0;const q=window[k];if(!q)return false;Q.push(q);showModal();return true},k);if(has){await sleep(1000);await p.screenshot({path:`${DIR}/${k.slice(2,-1)}-${W}x${H}.png`})}}
 }
 console.log('page errors:',errs.length,JSON.stringify(errs.slice(0,3)));if(errs.length)fails++;
 console.log(fails?`punish-tier: ${fails} FAIL`:'punish-tier: ALL PASS');await b.close();process.exit(fails?1:0)})();
