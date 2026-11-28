/* review/punish-tier (owner OD 26/11 ~20:35Z + MAIN recs under it; MAIN 161/162) — on the real page, her and an NPC (law 1).
   usage: node dev/test/punish-tier.js <url> [W=755] [H=1000] [shotDir]   (exit 1 on a FAIL / page error)
   Checks: need by weight (nhẹ 1 · vừa 2 · nặng 3 · tử tội 3), the same for every rank · weight on every evidence line · vừa = giáng 1 ·
   nặng = giáng + lãnh cung (seat frees) · tử tội = ban chết or phế vị + chung thân (pardon refused, minh oan opens) · release: owed rank when its
   seat is free else one lower · PHẢN TỌA (Tố giác, Tố tội thật, Bóc chuyện tư tình) · 3rd nhẹ in a year = vừa · tự thú −1 · pregnant: deferred
   until after the birth · notice rows Mức tội / Giáng phẩm / Lãnh cung («không» kept) · ROBOT: she climbs by bringing a Tần down. */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',DIR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:DIR?2:1,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const r0=Math.random;Q.length=0;
  const L=liveRivals(true).filter(x=>!x.queen);const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.ewc={};x.evq={};x.punWk=null;x.punR=null;x.confined=0;x.mercy=1;x.nheWk=[];x.punDefer=null;x.preg=0;x.fake=0;x.coldLife=0;if(x!==S){x.scandal=0;x.affair=null;x.plan=null;x.inv=[];x.dress=null}};
  const sec=x=>JSON.stringify(x&&(x.kit&&x.kit.sections||x.sections)||"");const reset=()=>{try{CHM.clear()}catch(e){}for(const x of L.concat([S]))clean(x);S.evc={};S.ewc={};S.evq={};S.out=0;S.coldFrom=null;S.coldRank=0;S.coldPend=null;S.coldLife=0;S.confined=0;Q.length=0};
  window.__tw||(window.__tw=1,(()=>{const d0=deedAdd;deedAdd=function(p,k){const d=d0.apply(this,arguments);try{if(d&&p)for(const s of allServ().filter(s=>s&&s.sid!=null&&!s.out).slice(0,3))chSawAdd(p,chOfDeed(k),"s"+s.sid)}catch(e){}return d}})());/* REAL-PROOF fixture: three real servants stood where each test deed was done (in play the day record gives who was there) */
  const give=(h,t,c,k,n)=>{deedAdd(t,k,null,BAL.charge.actW[k]||BAL.charge.w[k]||1,"việc "+k);evA(h,t,n==null?chNeed(t,c)+chWitNeed(t,c):n,c)};/* PUNISH-TIER-3: a nặng / tử tội charge also needs its witnesses (finds alternate) */
  const win=f=>{Math.random=()=>0;try{return f()}finally{Math.random=r0}};const lose=f=>{Math.random=()=>0.999;try{return f()}finally{Math.random=r0}};
  const tan=(...P)=>{for(const x of liveRivals(true))if(x.rank===3&&!P.includes(x))x.rank=2;for(const x of P){x.rank=3;x.queen=false;x.out=false;x.coldFrom=null;x.coldR=null}};
  const up=x=>{x.out=false;x.alive=true;x.coldFrom=null;x.coldR=null;x.coldLife=0};
  reset();const A=L[0],B=L[1],C=L[2],D=L[3],E=L[4],G=L[5]||L[0];
  /* 1. need by weight, the same for every rank */
  A.rank=2;C.rank=6;deedAdd(E,"cyfake",null,1,"báo có thai giả");
  ok(chNeed(A,"vp")===1&&chNeed(A,"hd")===2&&chNeed(A,"mh")===3&&chNeed(A,"tt")===3&&chNeed(E,"tt")===4,`need: nhẹ ${chNeed(A,"vp")} · vừa ${chNeed(A,"hd")} · nặng ${chNeed(A,"mh")} · tử tội ${chNeed(E,"tt")}`);
  {const P=L[7]||L[1];const T=[];for(const r of [2,3,4,5,6]){P.rank=r;T.push(`${RANKS[r].n} ${["vp","hd","mh"].map(c=>chNeed(P,c)).join("/")}`)}P.rank=5;const q5=[chNeed(P,"vp"),chNeed(P,"hd"),chNeed(P,"mh")].join();P.rank=6;const q6=[chNeed(P,"vp"),chNeed(P,"hd"),chNeed(P,"mh")].join();P.rank=2;
   ok(q5==="2,3,4"&&q6==="3,4,5",`count by the accused's group (owner 21:00Z table nhẹ/vừa/nặng): ${T.join(" · ")}`)}
  ok(chTier(E,"tt")==="tu"&&chTierN(E,"tt")==="tử tội"&&chTier(A,"tt")==="nang",'khi quân (giả thai) makes the charge tử tội (tuDeed); suspicion stays nặng');
  {try{CHM.clear()}catch(e){}D.wrongs.push({k:"poison",t:"emp",w:2,at:wk(),x:"mưu hại Hoàng thượng"});D.dw=(D.dw||0)+2;ok(chTier(D,"mh")==="tu",`mưu hại aimed at Hoàng thượng → ${chTier(D,"mh")} (tuTgt)`)}
  /* 2. weight on every evidence line */
  reset();A.rank=2;give(S,A,"mh","poison",1);ok(/\(nặng\)/.test(chLine(S,A))&&/tội nặng/.test(chNeedTxt(S,A,"mh"))&&chRows(S,A).some(r=>/\(nặng\)/.test(r[0])),`evidence lines show the weight: «${chLine(S,A)}» · «${chNeedTxt(S,A,"mh")}»`);
  /* 3. ROBOT climb: she is Quý nhân, Tần is full; vừa (giáng) and nặng (giáng + lãnh cung) both open the seat */
  reset();S.rank=2;tan(A,B,C);ok(!seatFree(3),`Tần full: ${holders(3).length}/${SEATCAP[3]}`);
  give(S,A,"hd","huydung");const o1=accOK(S,A);win(()=>ACT.accuse.f(S,A));
  ok(o1&&!A.out&&A.rank===2&&seatFree(3),`ROBOT vừa: Tố giác hại dung nhan → ${A.name} Tần → ${RANKS[A.rank].n}, not in lãnh cung, Tần seat free`);
  tan(A,B,C);give(S,B,"mh","poison");win(()=>ACT.accuse.f(S,B));
  ok(B.out&&B.rank===2&&B.coldR===2&&B.coldFrom===3&&!holders(3).includes(B)&&seatFree(3),`ROBOT nặng: Tố giác mưu hại → ${B.name} Tần → Quý nhân + lãnh cung, Tần seat free`);
  ok(rkOfFace("consort",B)[1]==="Quý nhân · lãnh cung",`her face line inside: «${rkOfFace("consort",B)[1]}»`);
  {const pl=[outTitleN(B),k61Short(B),k61MaskT(B),j95rk(B)];ok(pl.every(x=>x==="Quý nhân"),`NPC nặng inside: every plate = the kept title (RV-184 F1, outTitleN): ${pl.join(" | ")}`)}
  /* 4. the same penalty on a seat-free rank */
  D.rank=2;up(D);give(S,D,"mh","poison");win(()=>ACT.accuse.f(S,D));ok(D.out&&D.rank===1&&D.coldFrom===2,`nặng on a Quý nhân: → Thường tại + lãnh cung (same rule as Tần)`);
  /* 5. tử tội: death, or commuted to phế vị + chung thân (pardon refused, minh oan opens) */
  up(E);E.rank=3;try{CHM.clear()}catch(e){}deedAdd(E,"cyfake",null,1,"báo có thai giả");evA(S,E,chNeed(E,"tt")+chWitNeed(E,"tt"),"tt");const hn=window.has;window.has=k=>k==="nhantu"?false:hn(k);
  const ps0=punTuSpare;punTuSpare=()=>({o:0,why:[]});try{win(()=>ACT.accuse.f(S,E))}finally{window.has=hn;punTuSpare=ps0}
  ok(E.alive===false,`tử tội, no mercy: ${E.name} ${E.alive===false?"bị ban chết":"alive"} (tier ${chTier(E,"tt")}, pieces ${chHave(S,E,"tt")}, out ${E.out}, rank ${E.rank}, mercy ${E.mercy}, turn ${S.turn})`);
  up(G);G.rank=3;G.sung=90;try{CHM.clear()}catch(e){}deedAdd(G,"catswap",null,2,"tráo hoàng tự");evA(S,G,chNeed(G,"mh")+chWitNeed(G,"mh"),"mh");punTuSpare=()=>({o:100,why:["Thái hậu xin tha"]});try{win(()=>ACT.accuse.f(S,G))}finally{punTuSpare=ps0}
  ok(G.out&&G.rank===0&&G.coldLife===1&&G.alive!==false,`tử tội commuted: ${G.name} phế vị + lãnh cung chung thân`);
  {const pl=[outTitleN(G),k61Short(G),k61MaskT(G),j95rk(G)];ok(pl.every(x=>x==="Phế phi"),`NPC phế vị (chung thân): every plate = «Phế phi»: ${pl.join(" | ")}`)}
  G.coldWk-=BAL.pun.coldMinDays;ok(!coldStayOk(G)&&coldStayOk(G,true),'chung thân: no pardon / đại xá, minh oan still opens');
  /* 6. NPC release (law 1) */
  up(B);B.out=true;B.rank=2;B.coldR=2;B.coldFrom=3;B.coldWk=wk()-BAL.pun.coldMinDays;tan(C,A);coldFree(B,true);ok(!B.out&&B.rank===3,`NPC minh oan with a free Tần seat: back to ${RANKS[B.rank].n}`);
  up(D);D.out=true;D.rank=2;D.coldR=2;D.coldFrom=3;D.coldWk=wk()-BAL.pun.coldMinDays;coldFree(D,true);ok(!D.out&&D.rank===2,`NPC minh oan, Tần full: one lower → ${RANKS[D.rank].n}`);
  /* 7. HER (two-way): nặng while she is Tần → giáng + lãnh cung, her seat frees, notice rows */
  reset();tan(A,C);S.rank=3;Q.length=0;deedAdd(S,"poison",B,2,"bỏ độc");evA(A,S,chNeed(S,"mh")+chWitNeed(S,"mh"),"mh");win(()=>ACT.accuse.f(A,S));
  const nq=Q.find(x=>x&&x.t==="Lãnh cung");const nt=sec(nq);
  ok(S.out&&S.coldFrom===3&&S.coldRank===2&&!holders(3).includes(S)&&seatFree(3),`HER nặng at Tần: → lãnh cung, title ${RANKS[S.coldRank].n}, coldFrom ${S.coldFrom}, her Tần seat free`);
  ok(/Mức tội/.test(nt)&&/nặng/.test(nt)&&/Giáng phẩm/.test(nt)&&/từ Tần xuống Quý nhân/.test(nt)&&/vẫn mang phẩm Quý nhân/.test(nt),`her lãnh cung notice rows: ${nt.replace(/\\"/g,"'").slice(0,300)}`);
  window.__coldQ=nq||null;
  {const kn=kitName(S,{named:1}),pl=[outTitleN(S),kszRankName(S)[0],j95rk(S)];ok(pl.every(x=>x==="Quý nhân")&&rkOfFace("consort",S)[1]==="Quý nhân · lãnh cung"&&/Quý nhân/.test(kn)&&!/Phế phi/.test(kn),`HER nặng inside: her plates show the kept title, never «Phế phi» (RV-184 F1, two-way with the NPC): ${pl.join(" | ")} · kitName «${kn.replace(/<[^>]+>/g,"")}» · top-bar chip «${rkOfFace("consort",S)[1]}»`)}
  /* 8. her release: pardon → title; minh oan Tần full → one lower; Tần free → Tần */
  S.coldWk=wk()-BAL.pun.coldMinDays;Q.length=0;restore(false,"Thái hậu mở lòng từ bi");ok(!S.out&&S.rank===2,`HER pardon: title kept inside → ${RANKS[S.rank].n}`);
  reset();tan(A,C,G);S.rank=0;S.out=1;S.coldFrom=3;S.coldRank=2;S.coldWk=wk()-BAL.pun.coldMinDays;restore(true,"Án được lật");
  ok(!S.out&&S.rank===2,`HER minh oan, Tần full (${holders(3).filter(x=>x!==S).length}/${SEATCAP[3]}): one lower → ${RANKS[S.rank].n}`);
  tan(A);S.out=1;S.rank=0;S.coldFrom=3;S.coldRank=2;S.coldWk=wk()-BAL.pun.coldMinDays;restore(true,"Án được lật");ok(!S.out&&S.rank===3,`HER minh oan, Tần seat free: back to ${RANKS[S.rank].n}`);
  S.out=1;S.rank=0;S.coldFrom=3;S.coldRank=0;S.coldLife=1;S.coldWk=wk()-BAL.pun.coldMinDays;ok(outTitleN(S)==="Phế phi"&&/Phế phi/.test(kitName(S,{named:1}))&&kszRankName(S)[0]==="Phế phi",`HER phế vị (chung thân): plate «${outTitleN(S)}»`);Q.length=0;restore(false,"Chiếu đại xá thiên hạ");ok(S.out&&Q.some(x=>x&&/chung thân/i.test(x.t||"")),'HER chung thân: đại xá does not open the door');S.out=0;S.coldLife=0;
  {S.out=1;S.rank=0;S.coldFrom=null;S.coldLife=0;S.coldRank=2;const w=outTitleN(S);S.out=0;S.coldRank=0;ok(w==="Phế phi",`old save (out, no coldFrom): plate stays «Phế phi» (${w})`)}
  /* 9. vừa on her: one rank, «Lãnh cung: không»; nhẹ: «Giáng phẩm: không» */
  reset();tan(A);S.rank=3;Q.length=0;deedAdd(S,"huydung",B,1,"hủy dung");evA(A,S,chNeed(S,"hd")+chWitNeed(S,"hd"),"hd");win(()=>ACT.accuse.f(A,S));const gq=sec(Q.find(x=>x&&/giáng/i.test(x.t||"")));
  ok(S.rank===2&&!S.out&&/vừa/.test(gq)&&/Lãnh cung","không/.test(gq),`HER vừa: Tần → ${RANKS[S.rank].n}; rows ${gq.replace(/\\"/g,"'").slice(0,220)}`);
  window.__giangQ=Q.find(x=>x&&/giáng/i.test(x.t||""))||null;
  reset();S.rank=2;Q.length=0;deedAdd(S,"vp",null,1,"vượt phẩm");evA(A,S,1,"vp");win(()=>ACT.accuse.f(A,S));const lq=sec(Q.find(x=>x&&/Phạt/i.test(x.t||"")));
  ok(S.rank===2&&!S.out&&/nhẹ/.test(lq)&&/Giáng phẩm","không/.test(lq)&&/Lãnh cung","không/.test(lq),`HER nhẹ: phạt bổng, rank kept; rows ${lq.replace(/\\"/g,"'").slice(0,220)}`);
  /* 10. REPEAT: the 3rd nhẹ within a year counts as vừa */
  reset();up(D);D.rank=3;for(let i=0;i<3;i++){deedAdd(D,"vp",null,1,"vượt phẩm "+i);evA(S,D,1,"vp");chPunish(D,"vp","bị tố",S)}ok(D.rank===2,`3rd nhẹ (vượt phẩm) in a year → vừa: Tần → ${RANKS[D.rank].n}`);
  /* 11. TỰ THÚ: one step lighter (nặng → vừa: giáng only) */
  reset();up(C);C.rank=3;deedAdd(C,"poison",B,2,"bỏ độc");chConfess(C,"mh","tự thú tội mưu hại",null);ok(C.rank===2&&!C.out,`tự thú mưu hại (nặng): ${C.name} only giáng (vừa), not lãnh cung`);
  /* 12. PREGNANT: the penalty waits until after the birth */
  reset();up(C);C.rank=3;C.preg=5;deedAdd(C,"poison",B,2,"bỏ độc");evA(S,C,chNeed(C,"mh")+chWitNeed(C,"mh"),"mh");win(()=>ACT.accuse.f(S,C));const def=!!C.punDefer&&!C.out&&C.rank===3;
  C.preg=0;try{const pd=C.punDefer;C.punDefer=null;if(pd)punTier(C,pd.x,pd.why,null,true)}catch(e){}ok(def&&C.out&&C.rank===2,`pregnant ${C.name}: nặng deferred (still Tần, free), applied after the birth → Quý nhân + lãnh cung`);
  /* 13. PHẢN TỌA: her failed Tố giác of a vừa charge → she bears giáng; an NPC's failed nhẹ charge on her → the NPC is fined */
  /* split-merge B1: ONE «Tố giác» — with a Hoàng hậu above the accused it goes to her (Trình Hoàng hậu road); the phản tọa checks below run on the Hoàng thượng road (no Hoàng hậu) */
  const q0=rivals[0].queen;try{rivals[0].queen=1;if(qOn()&&rivals[0]!==A&&rivals[0]!==B)ok(chTo(S,A)==="trinhhh"&&chTo(B,S)==="trinhhh",`B1 one Tố giác: a Hoàng hậu above the accused hears it (chTo → trinhhh)`)}finally{rivals[0].queen=q0}
  rivals[0].queen=0;
  reset();S.rank=3;tan(C);A.rank=2;up(A);give(S,A,"hd","huydung");const ft=chFailPun(A);Q.length=0;lose(()=>ACT.accuse.f(S,A));const bq=Q.find(x=>x&&/giáng/i.test(x.t||""));
  ok(S.rank===2&&!S.out&&/phản tọa tội vừa/.test(ft)&&/không đứng vững/.test(sec(bq))&&!/không có chứng cứ/.test(sec(bq)),`HER phản tọa: failed Tố giác hại dung nhan → giáng to ${RANKS[S.rank].n}; card «${ft}»`);
  window.__backQ=bq||null;
  reset();S.rank=2;up(B);B.rank=2;const b0=B.bac=200;deedAdd(S,"vp",null,1,"vượt phẩm");evA(B,S,1,"vp");lose(()=>ACT.accuse.f(B,S));
  ok(B.bac===b0-BAL.charge.fine&&!B.out&&S.rank===2,`NPC phản tọa (nhẹ): ${B.name} fined ${b0-B.bac} lượng, she is untouched`);
  rivals[0].queen=q0;
  /* 14. the family: Tố tội thật and Bóc chuyện tư tình */
  reset();S.rank=2;up(C);C.rank=3;deedAdd(C,"vp",null,1,"vượt phẩm");evA(S,C,chNeed(C,"vp")+chWitNeed(C,"vp"),"vp");const cC=chTocao(S,C);Q.length=0;lose(()=>ACT.tocao.f(S,C));
  ok(cC==="vp"&&!S.out&&S.rank===2&&Q.some(x=>x&&/Phạt/i.test(x.t||"")),`Tố tội thật lost (vượt phẩm, nhẹ): she is fined by phản tọa, rank kept`);
  reset();S.rank=2;up(G);G.rank=3;G.scandal=2;deedAdd(G,"flirt",null,1,"liếc mắt đưa tình");evA(S,G,chNeed(G,"tt")+chWitNeed(G,"tt"),"tt");const okE=ACT.expose.ok(S,G);win(()=>ACT.expose.f(S,G));
  ok(okE&&G.out&&G.rank===2&&G.coldFrom===3,`Bóc chuyện tư tình won (tư thông nặng): ${G.name} Tần → Quý nhân + lãnh cung`);
  reset();S.rank=3;up(D);D.rank=2;D.scandal=2;deedAdd(D,"flirt",null,1,"liếc mắt đưa tình");evA(S,D,chNeed(D,"tt")+chWitNeed(D,"tt"),"tt");lose(()=>ACT.expose.f(S,D));
  ok(S.out&&S.coldFrom===3&&S.coldRank===2,`Bóc chuyện tư tình lost: phản tọa tội nặng → she goes Tần → Quý nhân + lãnh cung`);
  Math.random=r0;return out});
 let fails=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++}
 if(DIR){/* LOOK stills: the evidence card (weight on every charge) and her verdict notices */
  await p.evaluate(()=>{Q.length=0;closeModal();const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const v=L[0];v.wrongs=[];v.evc={};v.ev=0;S.evc={};S.out=0;S.rank=2;v.rank=3;
   deedAdd(v,"poison",L[1],2,`bỏ độc vào điểm tâm của ${L[1].name}`);deedAdd(v,"huydung",L[2],1,`hủy dung ${L[2].name}`);deedAdd(v,"vp",null,1,"ăn vận vượt phẩm");
   evA(S,v,chNeed(v,"hd")+chWitNeed(v,"hd"),"hd");evA(S,v,2,"mh");evA(S,v,1,"vp");try{k61Know(v,"",true,2)}catch(e){}S.met=S.met||{};S.met[v.id]=wk();window.__ev=v;/* a KNOWN Tần (met): the kit figure, not the unmet silhouette (OD 15/11 face rule) */kitEvidencePanel(v)});await sleep(1700);/* RV-184 nit: past the 1.5 s j11 verdict stamp (kitPace) */
  {const d=await p.evaluate(()=>{const v=window.__ev;const t=(document.querySelector("#modal")||document.body).innerText;return {known:kitKnown(v),tier:/· tội (nặng|vừa|nhẹ)/.test(t)}});
   console.log((d.known&&!d.tier?"PASS ":"FAIL ")+`evidence card: accused known (kit figure) ${d.known} · no weight label on a piece (count only, 21:00Z) ${!d.tier}`);if(!(d.known&&!d.tier))fails++}
  await p.screenshot({path:`${DIR}/evidence-${W}x${H}.png`});
  for(const k of ['__coldQ','__giangQ','__backQ']){const has=await p.evaluate(k=>{closeModal();Q.length=0;const q=window[k];if(!q)return false;Q.push(q);showModal();return true},k);if(has){await sleep(2500);await p.screenshot({path:`${DIR}/${k.slice(2,-1)}-${W}x${H}.png`})}}
 }
 console.log('page errors:',errs.length,JSON.stringify(errs.slice(0,3)));if(errs.length)fails++;
 console.log(fails?`punish-tier: ${fails} FAIL`:'punish-tier: ALL PASS');await b.close();process.exit(fails?1:0)})();
