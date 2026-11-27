/* split-merge-fix (PUNISH-TIER-7): the merged roads behave as one, for her and NPCs (law 1), numbers from BAL (law 4), tiers read BAL.charge (law 2).
   usage: node dev/test/split-merge.js <url of index.html> [W] [H] [shotDir] */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',DIR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:DIR?2:1,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const B=BAL.charge;const L=liveRivals(true).filter(x=>!x.queen);const A=L[0],C=L[1];
  const clean=x=>{x.ev=0;x.evc={};x.ewc={};x.evq={};x.evm={};x.wsee={};x.out=false;x.alive=true};
  /* P3: every crime member of the harm / scheme doors (P7–P10) shows the tier of its charge */
  const TN={nhe:"nhẹ",vua:"vừa",nang:"nặng",tu:"nặng"};let bad=[],n=0;
  for(const r of DOOR.T){if(!r.chT)continue;for(const k of (r.acts.a||[])){const c=B.deed[k];if(!c)continue;n++;const d=DOOR.ofKey(k);if(!d||d.tier!==TN[B.C[c].tier])bad.push(`${k}:${d&&d.tier}≠${TN[B.C[c].tier]}`)}}
  ok(n>=20&&!bad.length,`P3 door tiers = BAL.charge tier for ${n} crime members${bad.length?" BAD "+bad.join(", "):""}`);
  ok(chOfDeed("phonghoa")==="mh"&&B.C.mh.tier==="nang"&&DOOR.ofKey("phonghoa").tier==="nặng",`P3 arson = Mưu hại tính mạng (nặng), door «nặng»`);
  ok(DOOR.ofKey("xinhh")&&DOOR.ofKey("xinhh").tier==="nặng",`P3 a member that is no crime keeps its own tier (xinhh nặng)`);
  /* P7 */
  ok(BAL.tcw&&BAL.tcw.mid===35&&BAL.wit===undefined,`P7 Tâm cơ marks read BAL.tcw; BAL.wit gone`);
  /* B1: the evidence panel offers ONE accusation by listener */
  for(const x of [S,A,C])clean(x);const q0=rivals[0].queen;
  const fold=["tocao","expose","trinhth","tieuhuy"];
  const keys=()=>evidenceActs(A).map(a=>a.k);
  rivals[0].queen=0;let K=keys();ok(K.filter(k=>["accuse","trinhhh","judge"].includes(k)).length===1&&K.includes("accuse")&&!fold.some(k=>K.includes(k)),`B1 panel, no Hoàng hậu: ONE «${(evidenceActs(A).find(a=>a.k==="accuse")||{}).n}» (accuse, tâu Hoàng thượng) [${K.join(",")}]`);
  if(rivals[0]!==A){rivals[0].queen=1;if(qOn()){K=keys();const e=evidenceActs(A).find(a=>a.k==="trinhhh");ok(K.filter(k=>["accuse","trinhhh","judge"].includes(k)).length===1&&e&&e.n===ACT.accuse.n&&e.cost.includes("tâu Hoàng hậu")&&!fold.some(k=>K.includes(k)),`B1 panel, a Hoàng hậu: ONE «${e&&e.n}» on the Hoàng hậu road [${K.join(",")}]`)}}
  rivals[0].queen=q0;const r0=S.rank;S.rank=7;K=keys();ok(K.includes("judge")&&!K.includes("accuse")&&!K.includes("trinhhh"),`B1 panel, she is Hoàng hậu: Xử tội only [${K.join(",")}]`);S.rank=r0;
  /* B1 law 1: NPC menus never offer the folded roads */
  let seen=new Set();for(const v of liveRivals(true))for(const t of [S].concat(liveRivals(true))){if(v===t)continue;v.evm=v.evm||{};const kk=key(t);const e0=v.evm[kk];v.evm[kk]=5;try{for(const [k] of mindMenu(v,t))seen.add(k)}catch(e){}v.evm[kk]=e0}
  ok(!["tocao","expose","trinhth","trinhhh","tieuhuy"].some(k=>seen.has(k)),`B1/B2 NPC menus: no tocao / expose / trinhth / trinhhh / tieuhuy (offered: ${[...seen].filter(k=>/accuse|uyhiep|banphe/.test(k)).join(",")})`);
  ok(J78EVK.join()==="accuse,uyhiep,banphe"&&!RVGRP.some(g=>g[1].some(k=>["tocao","expose","trinhth","trinhhh","tieuhuy"].includes(k))),`B1 card groups: «Dùng chứng cứ» = accuse, uyhiep, banphe; folded keys in no group`);
  ok(DOOR.T.find(r=>r.k==="P11").acts.a.join()==="accuse,xx,vp"&&DOOR.T.find(r=>r.k==="P12").acts.a.join()==="uyhiep,banphe",`B1/B2 doors: P11 = Tố giác + 2 visible-fault reports; P12 = Uy hiếp / Bán`);
  /* B3 + A1/A2: the catch card */
  clean(A);const sx={kind:"meet",a:"v"+A.id,spot:"vườn"};let O=j95catchOpts(A,null,sx,"rev");const nm=O.map(o=>o.n);
  ok(O.length===3&&nm.filter(n=>/^Tố giác/.test(n)).length===1&&nm.includes("Giữ làm con bài khống chế")&&nm.includes("Lặng im, đổi lấy ân tình"),`B3/A2 catch card: 3 roads [${nm.join(" | ")}]`);
  const tg=O.find(o=>o.n==="Tố giác");ok(tg.off&&/cần \d+ chứng cứ tội mưu hại/.test(tg.off.why),`B3 «Tố giác» locked without the charge's pieces: «${tg.off&&tg.off.why}»`);
  deedAdd(A,"poison",C,2,"bỏ độc");evA(S,A,chNeed(A,"mh"),"mh");const W0=chWitNeed(A,"mh");O=j95catchOpts(A,null,sx,"rev");const tg2=O.find(o=>o.n==="Tố giác");
  const rd=chReady(S,A,"mh");ok(!!tg2.off===!rd,`B3 «Tố giác» gate = chReady (pieces AND witnesses): ${tg2.off?tg2.off.why:"open"}`);
  const cr0=window.chReady;window.chReady=()=>"mh";try{const tg3=j95catchOpts(A,null,sx,"rev").find(o=>o.n==="Tố giác");ok(!tg3.off,`B3 «Tố giác» opens once the charge is ready`)}finally{window.chReady=cr0}
  /* P2: the owed favour goes into the j72 ledger */
  const d0=q72Debt(q72A("rv",A.id));j95owe(A,1);ok(q72Debt(q72A("rv",A.id))===d0+1&&!(S.j95&&S.j95.owe&&Object.keys(S.j95.owe).length),`P2 «nàng nợ ngươi một ân tình» → j72 nợ ân ledger (${d0} → ${q72Debt(q72A("rv",A.id))})`);
  /* A3: one-shot blackmail */
  S.rt=S.rt||{};const T=S.rt;T.bm={v:A.id,mid:0,n:40};const card=PEND.rtBm({v:A.id});
  ok(card&&card.o.length===4&&!/mỗi tháng/.test(card.t),`A3 blackmail card once, «${(card&&card.t||"").replace(/<[^>]+>/g,"").slice(0,70)}…»`);
  try{const b0=S.bac=Math.max(S.bac,100);card.o[0].go&&card.o[0].go();ok(!T.bm,`A3 paying once ends it (no monthly repeat)`)}catch(e){ok(0,"A3 pay go threw "+e.message)}
  /* A4: the maid's blackmail card has no bribe road, for her and an NPC maid */
  const ids=cnvBlackOpts(S,A,null).map(o=>o.id);ok(!ids.includes("pay")&&ids.length===2,`A4 maid blackmail card: ${ids.join(", ")}`);
  /* OD 27/11 ~04:08Z: her maid / servant killed → ONE notice to her at once (who, how found; no killer name), real deed on her house, new maid; NPC mistress = same deed */
  {const K=L[2]||A;const m0=S.maid;const mid=chMaidId("mm:me");Q.length=0;const r=covWitDo(K,mid,"nang",true);const N=Q.find(x=>x&&x.t==="Tin dữ");const h=N?N.h.replace(/<[^>]+>/g," "):"";
   const dd=(K.wrongs||[]).slice(-1)[0]||{};
   ok(N&&h.includes(m0.name)&&/cung nữ thân cận/.test(h)&&!h.includes(K.name)&&S.maid!==m0&&h.includes(S.maid.name)&&dd.k==="wkill"&&dd.t===key(S),`maid killed: «${h.replace(/\s+/g," ").trim().slice(0,170)}» · deed ${dd.k}→${dd.t}`);
   /* MAIN 177 LOOK (OD 27/11 ~05:59Z, KIT §84b.2): the notice figure = the DEAD maid in the dead state; the new maid = a name only; the stage swaps her at once */
   {const W=N&&N.who;const F=(N&&N.kit&&N.kit.facts)||[];const nl=F.find(f=>/Nội vụ phủ/.test(f.text||""));const VP=(S.visit&&S.visit.people)||[];
    ok(W&&W.__kp===m0&&W.st==="dead"&&!W.w&&m0.alive===false&&nl&&Array.isArray(nl.who)&&!nl.who.length&&!VP.some(x=>x&&(x.ref===m0||x.kind==="maid"&&x.name===m0.name)),`death notice figure: dead maid (st ${W&&W.st}, w ${W&&W.w}), new maid line no avatar, stage without her (${VP.map(x=>x&&x.name).join(", ")})`)}
   const sv=(S.staff||[]).find(x=>x&&!x.out);if(sv){Q.length=0;covWitDo(K,ledgerId(sv),"nang",true);const N2=Q.find(x=>x&&x.t==="Tin dữ");ok(N2&&/người hầu trong cung/.test(N2.h)&&!N2.h.includes(K.name),`servant killed: «${N2?N2.h.replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim().slice(0,120):"no notice"}»`)}
   const V=L[3]||C;const vm=V.maid||(V.maid=maidMk(V));const vid=chMaidId("mm:v"+V.id);Q.length=0;if(vid){covWitDo(K===V?A:K,vid,"nang",true);const dv=((K===V?A:K).wrongs||[]).slice(-1)[0]||{};ok(!Q.some(x=>x&&x.t==="Tin dữ")&&V.maid!==vm&&dv.t===key(V),`NPC mistress: her maid replaced, the deed is on her house (${dv.t}), no card to the player`)}}
  return out});
 let f=0;for(const [c,m] of R){console.log((c?"PASS ":"FAIL ")+m);if(!c)f++}
 if(errs.length){console.log("page errors: "+errs.slice(0,5).join(" | "));f++}
 console.log(f?`split-merge: ${f} FAIL`:"split-merge: ALL PASS");await b.close();process.exit(f?1:0)})();
