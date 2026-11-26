/* review/punish-tier (owner OD 26/11 ~19:50Z — three weights, the same for every rank, phản tọa; MAIN 161/162) — on the real page, her and an NPC (law 1).
   usage: node dev/test/punish-tier.js <url> [W=755] [H=1000] [shotDir]   (exit 1 on a FAIL / page error)
   Checks: need by weight (nhẹ 1 · vừa 2 · nặng 3), no rank extra · every evidence line shows its weight · vừa = giáng + lãnh cung on ANY rank (seat
   frees, holders skip her) · nặng = ban chết · release: owed rank when its seat is free else one lower (minh oan / pardon, her and an NPC) ·
   PHẢN TỌA: a failed accusation puts the charge's weight on the accuser (her and an NPC) · her notice rows Mức tội / Giáng phẩm / Lãnh cung
   («không» rows kept) · ROBOT: she climbs by bringing a Tần down. */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',DIR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:DIR?2:1,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const r0=Math.random;Q.length=0;
  const L=liveRivals(true).filter(x=>!x.queen);const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.evq={};x.punWk=null;x.punR=null;x.confined=0;x.mercy=1;if(x!==S){x.scandal=0;x.affair=null;x.plan=null;x.inv=[];x.dress=null}};
  const sec=x=>JSON.stringify(x&&(x.kit&&x.kit.sections||x.sections)||"");const reset=()=>{try{CHM.clear()}catch(e){}for(const x of L.concat([S]))clean(x);S.evc={};S.evq={};S.out=0;S.coldFrom=null;S.coldRank=0;S.coldPend=null;S.confined=0;Q.length=0};
  const give=(h,t,c,k,n)=>{deedAdd(t,k,null,BAL.charge.actW[k]||BAL.charge.w[k]||1,"việc "+k);evA(h,t,n==null?chNeed(t,c):n,c)};
  const win=f=>{Math.random=()=>0;try{return f()}finally{Math.random=r0}};const lose=f=>{Math.random=()=>0.999;try{return f()}finally{Math.random=r0}};
  const tan=(...P)=>{for(const x of liveRivals(true))if(x.rank===3&&!P.includes(x))x.rank=2;for(const x of P){x.rank=3;x.queen=false;x.out=false;x.coldFrom=null;x.coldR=null}};
  reset();const A=L[0],B=L[1],C=L[2],D=L[3],E=L[4],G=L[5]||L[0];
  /* 1. need by weight, the same for every rank */
  A.rank=2;C.rank=6;deedAdd(E,"tryst",null,2,"tư thông");
  ok(chNeed(A,"vp")===1&&chNeed(A,"hd")===2&&chNeed(A,"mh")===2&&chNeed(E,"tt")===3,`need by weight: nhẹ ${chNeed(A,"vp")} · vừa ${chNeed(A,"hd")} · nặng (tư thông thật) ${chNeed(E,"tt")}`);
  ok(chNeed(C,"hd")===chNeed(A,"hd")&&chNeed(C,"vp")===chNeed(A,"vp"),`no rank extra: Hoàng quý phi vừa ${chNeed(C,"hd")} = Quý nhân ${chNeed(A,"hd")}`);
  ok(chTier(E,"tt")==="nang"&&chTierN(E,"tt")==="nặng"&&chTier(A,"tt")==="vua",'a real tư thông deed makes the charge nặng (nangDeed); suspicion stays vừa');
  /* 2. weight on every evidence line */
  reset();A.rank=2;give(S,A,"mh","poison",1);ok(/\(vừa\)/.test(chLine(S,A))&&/tội vừa/.test(chNeedTxt(S,A,"mh"))&&chRows(S,A).some(r=>/\(vừa\)/.test(r[0])),`evidence lines show the weight: «${chLine(S,A)}» · «${chNeedTxt(S,A,"mh")}»`);
  /* 3. ROBOT climb: she is Quý nhân, Tần is full; one vừa conviction of a Tần opens the seat */
  reset();S.rank=2;tan(A,B,C);ok(!seatFree(3),`Tần full: ${holders(3).length}/${SEATCAP[3]}`);
  give(S,A,"hd","huydung");const o1=accOK(S,A);win(()=>ACT.accuse.f(S,A));
  ok(o1&&A.out&&A.rank===2&&A.coldR===2&&A.coldFrom===3&&!holders(3).includes(A)&&seatFree(3),`ROBOT vừa: Tố giác hại dung nhan → ${A.name} Tần → Quý nhân + lãnh cung, Tần seat free (${holders(3).length}/${SEATCAP[3]})`);
  ok(rkOfFace("consort",A)[1]==="Quý nhân · lãnh cung",`her face line inside: «${rkOfFace("consort",A)[1]}»`);
  /* 4. the same penalty on a seat-free rank */
  D.rank=2;give(S,D,"mh","poison");win(()=>ACT.accuse.f(S,D));ok(D.out&&D.rank===1&&D.coldFrom===2,`vừa on a Quý nhân: → Thường tại + lãnh cung (same rule as Tần)`);
  /* 5. nặng = ban chết */
  E.rank=3;E.mercy=1;try{CHM.clear()}catch(e){}deedAdd(E,"tryst",null,2,"tư thông");evA(S,E,chNeed(E,"tt"),"tt");const hn=window.has;window.has=k=>k==="nhantu"?false:hn(k);try{win(()=>ACT.accuse.f(S,E))}finally{window.has=hn}
  ok(E.alive===false,`nặng (tư thông thật): ${E.name} ${E.alive===false?"bị ban chết":"alive"}`);
  /* 6. NPC release (law 1) */
  B.out=true;B.rank=2;B.coldR=2;B.coldFrom=3;B.coldWk=wk()-BAL.pun.coldMinDays;tan(C,G);coldFree(B,true);ok(!B.out&&B.rank===3,`NPC minh oan with a free Tần seat: back to ${RANKS[B.rank].n}`);
  D.out=true;D.rank=2;D.coldR=2;D.coldFrom=3;D.coldWk=wk()-BAL.pun.coldMinDays;coldFree(D,true);ok(!D.out&&D.rank===2,`NPC minh oan, Tần full: one lower → ${RANKS[D.rank].n}`);
  /* 7. HER (two-way): an NPC accuses her of a vừa crime while she is Tần → giáng + lãnh cung, her seat frees, notice rows */
  reset();tan(A,C);S.rank=3;Q.length=0;deedAdd(S,"poison",B,2,"bỏ độc");evA(A,S,chNeed(S,"mh"),"mh");win(()=>ACT.accuse.f(A,S));
  const nq=Q.find(x=>x&&x.t==="Lãnh cung");const nt=sec(nq);
  ok(S.out&&S.coldFrom===3&&S.coldRank===2&&!holders(3).includes(S)&&seatFree(3),`HER vừa at Tần: → lãnh cung, title ${RANKS[S.coldRank].n}, coldFrom ${S.coldFrom}, her Tần seat free`);
  ok(/Mức tội/.test(nt)&&/vừa/.test(nt)&&/Giáng phẩm/.test(nt)&&/từ Tần xuống Quý nhân/.test(nt)&&/vẫn mang phẩm Quý nhân/.test(nt),`her lãnh cung notice rows: ${nt.replace(/\\"/g,"'").slice(0,300)}`);
  window.__coldQ=nq||null;
  /* 8. her release: pardon → title; minh oan Tần full → one lower; Tần free → Tần */
  S.coldWk=wk()-BAL.pun.coldMinDays;Q.length=0;restore(false,"Thái hậu mở lòng từ bi");ok(!S.out&&S.rank===2,`HER pardon: title kept inside → ${RANKS[S.rank].n}`);
  reset();tan(A,C,G);S.rank=0;S.out=1;S.coldFrom=3;S.coldRank=2;S.coldWk=wk()-BAL.pun.coldMinDays;restore(true,"Án được lật");
  ok(!S.out&&S.rank===2,`HER minh oan, Tần full (${holders(3).filter(x=>x!==S).length}/${SEATCAP[3]}): one lower → ${RANKS[S.rank].n}`);
  tan(A);S.out=1;S.rank=0;S.coldFrom=3;S.coldRank=2;S.coldWk=wk()-BAL.pun.coldMinDays;restore(true,"Án được lật");ok(!S.out&&S.rank===3,`HER minh oan, Tần seat free: back to ${RANKS[S.rank].n}`);
  /* 9. nhẹ on her: phạt bổng, rows «Giáng phẩm: không», «Lãnh cung: không» */
  reset();S.rank=2;Q.length=0;deedAdd(S,"vp",null,1,"vượt phẩm");evA(A,S,1,"vp");win(()=>ACT.accuse.f(A,S));const lq=sec(Q.find(x=>x&&/Phạt/i.test(x.t||"")));
  ok(S.rank===2&&!S.out&&/nhẹ/.test(lq)&&/Giáng phẩm","không/.test(lq)&&/Lãnh cung","không/.test(lq),`HER nhẹ: phạt bổng, rank kept; rows ${lq.replace(/\\"/g,"'").slice(0,220)}`);
  /* 10. PHẢN TỌA: her failed Tố giác of a vừa charge → she bears giáng + lãnh cung; an NPC's failed nhẹ charge on her → the NPC is fined */
  reset();S.rank=3;tan(C);A.rank=2;give(S,A,"hd","huydung");const ft=chFailPun(A);Q.length=0;lose(()=>ACT.accuse.f(S,A));const bq=Q.find(x=>x&&x.t==="Lãnh cung");
  ok(S.out&&S.coldFrom===3&&S.coldRank===2&&/phản tọa tội vừa/.test(ft)&&/không đứng vững/.test(sec(bq))&&!/không có chứng cứ/.test(sec(bq)),`HER phản tọa: failed Tố giác hại dung nhan → lãnh cung, title ${RANKS[S.coldRank].n}; card «${ft}»`);
  window.__backQ=bq||null;
  reset();S.rank=2;B.rank=2;const b0=B.bac=200;deedAdd(S,"vp",null,1,"vượt phẩm");evA(B,S,1,"vp");lose(()=>ACT.accuse.f(B,S));
  ok(B.bac===b0-BAL.charge.fine&&!B.out&&S.rank===2,`NPC phản tọa (nhẹ): ${B.name} fined ${b0-B.bac} lượng, she is untouched`);
  Math.random=r0;return out});
 let fails=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++}
 if(DIR){/* LOOK stills: the evidence card (weight on every charge) and her verdict notices */
  await p.evaluate(()=>{Q.length=0;closeModal();const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const v=L[0];v.wrongs=[];v.evc={};v.ev=0;S.evc={};S.out=0;S.rank=2;v.rank=3;
   deedAdd(v,"poison",L[1],2,`bỏ độc vào điểm tâm của ${L[1].name}`);deedAdd(v,"huydung",L[2],1,`hủy dung ${L[2].name}`);deedAdd(v,"vp",null,1,"ăn vận vượt phẩm");
   evA(S,v,chNeed(v,"hd"),"hd");evA(S,v,2,"mh");evA(S,v,1,"vp");try{k61Know(v,"",true,2)}catch(e){}kitEvidencePanel(v)});await sleep(1200);
  await p.screenshot({path:`${DIR}/evidence-${W}x${H}.png`});
  for(const k of ['__coldQ','__backQ']){const has=await p.evaluate(k=>{closeModal();Q.length=0;const q=window[k];if(!q)return false;Q.push(q);showModal();return true},k);if(has){await sleep(1000);await p.screenshot({path:`${DIR}/${k.slice(2,-1)}-${W}x${H}.png`})}}
 }
 console.log('page errors:',errs.length,JSON.stringify(errs.slice(0,3)));if(errs.length)fails++;
 console.log(fails?`punish-tier: ${fails} FAIL`:'punish-tier: ALL PASS');await b.close();process.exit(fails?1:0)})();
