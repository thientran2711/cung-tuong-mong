/* review/real-proof-2 (PUNISH-TIER-5; owner OD 27/11 ~00:13Z … ~00:57Z, verbatim on the handover branch): covering one's tracks, jcover.js.
   usage: node dev/test/cover.js <url> [W=755] [H=1000] [shotDir]   (exit 1 on a FAIL / page error)
   Checks: charge card = ONE line «Chứng cứ a/b · Nhân chứng c/d» + odds word, no names · exposure row «Ẩn lộ» after HER deed: «Không ai hay biết.» /
   «Để lại dấu vết.» / «<Tên> đã trông thấy.» (joined) · a clean deed adds no evidence cap · «Xóa dấu vết» on her maid: bạc by weight (BAL), wipes the
   newest traced deed, its pieces go, witnesses stay; a failure keeps it · the witness door «Xử nhân chứng» = three tiers at once (nhẹ / vừa / nặng) ·
   nhẹ silences (gone from t.wsee and every holder's h.ewc, for good, also after save → load) · vừa refused = no bạc lost, accepted = bạc paid ·
   nặng: the consort really dies (alive false, death ledger «plot»), a servant dies; failure = Danh at once + evidence to the witness, the witness stays ·
   Đức on any wicked deed by weight (known or not), never twice on a road with its own Đức · Danh only when exposed (caught: by the act's weight;
   proven: by weight) · NPCs: the same road on her (threat silences her, bribe = her card, wipe) · every shown number = BAL (changed constant → text). */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',DIR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:DIR?2:1,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const r0=Math.random,roll0=roll;const B=BAL.charge,V=B.cover;
  let L,A,C,D,E;
  const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.ewc={};x.evq={};x.evm={};x.wsee={};x.wsil={};x.confined=0;x.alive=true;x.out=false;x.duc=50;x.danh=50;x.bac=500;x.suc=80;x.preg=0};
  const reset=()=>{try{CHM.clear()}catch(e){}L=liveRivals(true).filter(x=>!x.queen);[A,C,D,E]=L;for(const x of L.concat([S]))clean(x);S.out=0;Q.length=0;COV.last=[];S.rcvPend=[]};
  const force=(v,f)=>{const pr=roll;roll=()=>v;try{return f()}finally{roll=pr}};
  const snap=()=>({seq:S.logSeq||0});
  const lo=(b4)=>{const r=kaResultRows(b4,"thử",true);return (r&&r[2]&&r[2].lo)||[]};
  const hp0=chHere;chHere=()=>[];/* the day record would add whoever really stood there; each case names its own witnesses */
  reset();A.rank=3;try{
  /* 1. the charge card: ONE line, count only, no names */
  deedAdd(A,"poison",C,2,"bỏ độc");chSawAdd(A,"mh",ledgerId(D));evA(S,A,2,"mh");
  {const r=chRows(S,A).find(x=>/Mưu hại/.test(x[0]));ok(r&&/^Chứng cứ \d+\/\d+ · Nhân chứng \d+\/1 · (Tìm chứng: \S|đủ để tố)/.test(r[1])&&!r[1].includes(D.name)&&!/\(/.test(r[1]),`card row = «Chứng cứ a/b · Nhân chứng c/d» + odds word, no name: ${JSON.stringify(r)}`)}
  /* 2. exposure line after HER deed (her result card row «Ẩn lộ») */
  reset();{const hp=chHere;chHere=()=>[];let b4=snap();COV.ctx++;COV.force=1;try{deedAdd(S,"trip",C,1,"ngáng chân "+C.name)}finally{COV.ctx--;COV.force=0;chHere=hp}const ln=lo(b4);
   ok(ln.length===1&&ln[0]==="Để lại dấu vết.",`traced, nobody there → «${ln}»`)}
  reset();{const hp=chHere;chHere=()=>[];let b4=snap();COV.ctx++;try{force(false,()=>deedAdd(S,"trip",C,1,"ngáng chân "+C.name))}finally{COV.ctx--;chHere=hp}const ln=lo(b4);const d=S.wrongs[S.wrongs.length-1];
   ok(ln[0]==="Không ai hay biết."&&d&&d.w===0&&d.cl===1&&deedCap(S)===0,`no trace, nobody there → «${ln}»; the deed adds no evidence cap (w ${d&&d.w}, cap ${deedCap(S)})`)}
  reset();{const hp=chHere;chHere=()=>[ledgerId(D)];let b4=snap();COV.ctx++;COV.force=1;try{deedAdd(S,"trip",C,1,"ngáng chân")}finally{COV.ctx--;COV.force=0;chHere=hp}const ln=lo(b4);
   ok(ln[0]===`Để lại dấu vết; ${chWitNm(ledgerId(D))} đã trông thấy.`,`traced + seen → one line «${ln}»`)}
  reset();{const hp=chHere;chHere=()=>[ledgerId(D),ledgerId(E),ledgerId(C)];let b4=snap();COV.ctx++;try{force(false,()=>deedAdd(S,"trip",C,1,"ngáng chân"))}finally{COV.ctx--;chHere=hp}const ln=lo(b4);
   ok(/^.+, .+ và 1 người khác đã trông thấy\.$/.test(ln[0]||""),`clean but seen by 3 → «${ln}» (at most ${V.names} names)`)}
  reset();{let b4=snap();ok(!lo(b4).length,"no deed → no row")}
  reset();{let b4=snap();COV.ctx++;COV.force=1;try{deedAdd(A,"trip",S,1,"ngáng chân ngươi")}finally{COV.ctx--;COV.force=0}const ln=lo(b4);ok(ln[0]==="Để lại dấu vết.",`an NPC's deed on her: the same row on her card «${ln}» (she can go after the trace)`);
   let b5=snap();COV.ctx++;COV.force=1;try{deedAdd(A,"trip",C,1,"ngáng chân")}finally{COV.ctx--;COV.force=0}ok(!lo(b5).length,"an NPC's deed on someone else → nothing on her card")}
  /* 3. Xóa dấu vết (her maid) */
  reset();{COV.ctx++;COV.force=1;try{deedAdd(S,"poison",C,2,"bỏ độc "+C.name)}finally{COV.ctx--;COV.force=0}chSawAdd(S,"mh",ledgerId(D));evA(A,S,2,"mh");
   const mp={kind:"maid",ref:S.maid,name:S.maid&&S.maid.name};const raw=doorRaw(mp);const o=raw.find(a=>a&&a.n==="Xóa dấu vết");const cost=V.wipe.bac[covTier("poison")];
   ok(o&&o.c&&o.c.bac===-cost&&o.act===1&&o.o===covWipeO(S),`maid offers «Xóa dấu vết»: bạc ${o&&o.c&&o.c.bac} = −BAL wipe.bac.${covTier("poison")} ${cost}, khắc of an act, odds ${o&&word(o.o)} (Tâm cơ)`);
   const cap0=deedCap(S);force(true,()=>runOpt(o));const d=S.wrongs[S.wrongs.length-1];evTruthSweep();
   ok(d.w===0&&d.wp===1&&deedCap(S)<cap0&&evG(A,S)===0&&(S.wsee.mh||[]).includes(ledgerId(D)),`success: the deed's trace is gone (cap ${cap0}→${deedCap(S)}), held pieces → rumour (${evG(A,S)}), the witness stays`);
   ok(!doorRaw(mp).some(a=>a&&a.n==="Xóa dấu vết"),"nothing left to wipe → no button");
   COV.ctx++;COV.force=1;try{deedAdd(S,"trip",C,1,"ngáng chân")}finally{COV.ctx--;COV.force=0}const o2=doorRaw(mp).find(a=>a&&a.n==="Xóa dấu vết");const b0=S.bac;force(false,()=>runOpt(o2));const d2=S.wrongs[S.wrongs.length-1];
   ok(d2.w>0&&!d2.wp,`failure: the trace stays (w ${d2.w})`);
   const keep=V.wipe.bac.nhe;V.wipe.bac.nhe=keep+7;const o3=doorRaw(mp).find(a=>a&&a.n==="Xóa dấu vết");ok(o3&&o3.c.bac===-(keep+7),`BAL change → cost follows (${o3&&o3.c.bac})`);V.wipe.bac.nhe=keep;
   /* law 2 / OD:L582: no Bạc → the same ONE act paid in Sức of the same weight */const bk=S.bac;S.bac=0;const o4=doorRaw(mp).find(a=>a&&a.n==="Xóa dấu vết");ok(o4&&!o4.c.bac&&o4.c.suc===-V.wipe.suc[covTier("trip")],`no Bạc → «Xóa dấu vết» costs Sức ${o4&&o4.c.suc} (BAL wipe.suc)`);S.bac=bk}
  /* 4. the witness door: three tiers at once */
  reset();const rp1=v=>({kind:"rival",ref:v,name:v.name});
  {COV.ctx++;COV.force=1;try{deedAdd(S,"poison",C,2,"bỏ độc")}finally{COV.ctx--;COV.force=0}chSawAdd(S,"mh",ledgerId(D));evA(A,S,4,"mh");
   const raw=doorRaw(rp1(D)).filter(a=>a&&COVN&&Object.values(COVN).includes(a.n));const fold=doorFold(rp1(D),doorRaw(rp1(D)));const door=fold.find(a=>a&&a.door==="wit");
   ok(raw.length===3&&door&&door.n==="Xử nhân chứng"&&door.m.length===3,`witness ${D.name}: one door «${door&&door.n}» with ${door&&door.m.length} tiers (${raw.map(a=>a.n).join(" · ")})`);
   ok(!doorRaw(rp1(E)).some(a=>a&&Object.values(COVN).includes(a.n)),"not a witness → no door");
   const [n1,v1,k1]=raw;ok(n1.c.suc===-V.wit.nhe.suc&&!(n1.c.bac)&&v1.w.bac===-V.wit.vua.bac[covSawTier(S,ledgerId(D))]&&!(v1.c&&v1.c.bac)&&!(k1.c&&k1.c.bac),`costs by tier: nhẹ Sức ${n1.c.suc} · vừa bạc ${v1.w.bac} only on acceptance · nặng no bạc`);
   ok(n1.o<=v1.o&&v1.o<=k1.o,`odds rise with the tier: ${word(n1.o)} ≤ ${word(v1.o)} ≤ ${word(k1.o)}`);
   /* nhẹ success → silenced everywhere */
   const id=ledgerId(D);const S0={d:S.duc};force(true,()=>runOpt(n1));const hold=(A.ewc[key(S)]||{}).mh||[];
   ok(!(S.wsee.mh||[]).includes(id)&&!hold.includes(id)&&S.wsil[id]!=null,`nhẹ worked: ${D.name} is gone from her t.wsee and from ${A.name}'s witness store (${JSON.stringify(hold)})`);
   ok(S.duc<S0.d,`a threat is itself a deed: Đức ${S0.d}→${S.duc}`);
   const sv=JSON.parse(JSON.stringify(ser()));deser(sv);ok(!((S.wsee||{}).mh||[]).includes(id)&&!doorRaw(rp1(rivals.find(v=>v.id===D.id))).some(a=>a&&a.n===COVN.nhe),"FINAL-RESULT LAW: still silenced after save → load, no door any more")}
  /* vừa: refused = no bạc lost; accepted = bạc paid */
  reset();{deedAdd(S,"poison",C,2,"bỏ độc");chSawAdd(S,"mh",ledgerId(D));const raw=doorRaw(rp1(D));const v1=raw.find(a=>a&&a.n===COVN.vua);const b0=S.bac;force(false,()=>runOpt(v1));
   ok(S.bac===b0&&(S.wsee.mh||[]).includes(ledgerId(D)),`vừa refused: bạc ${b0}→${S.bac} (none lost), still a witness`);
   const pr=V.wit.vua.bac[covSawTier(S,ledgerId(D))];const db=D.bac;force(true,()=>runOpt(doorRaw(rp1(D)).find(a=>a&&a.n===COVN.vua)));
   ok(S.bac===b0-pr&&D.bac===db+pr&&!(S.wsee.mh||[]).includes(ledgerId(D)),`vừa accepted: she pays ${pr} (BAL), ${D.name} gets it, silenced`)}
  /* nặng: success = the person really dies; failure = exposed */
  reset();{deedAdd(S,"poison",C,2,"bỏ độc");chSawAdd(S,"mh",ledgerId(D));const k1=doorRaw(rp1(D)).find(a=>a&&a.n===COVN.nang);const d0=S.duc,n0=S.danh,dl0=((S.mort||{}).dl||[]).length;force(true,()=>runOpt(k1));
   ok(D.alive===false&&((S.mort||{}).dl||[]).length===dl0+1&&!chWitP(ledgerId(D))&&S.duc<d0&&S.danh===n0,`nặng worked: ${D.name} dead (alive ${D.alive}, death ledger +1), Đức ${d0}→${S.duc}, Danh unchanged ${S.danh} (nobody knows)`);
   D.alive=true}
  reset();{deedAdd(S,"poison",C,2,"bỏ độc");chSawAdd(S,"mh",ledgerId(D));const k1=doorRaw(rp1(D)).find(a=>a&&a.n===COVN.nang);const n0=S.danh;force(false,()=>runOpt(k1));
   ok(D.alive!==false&&S.danh<n0&&chHave(D,S,"mh")>=1&&(S.wsee.mh||[]).includes(ledgerId(D)),`nặng failed: ${D.name} lives, Danh ${n0}→${S.danh} at once (exposed), ${D.name} holds ${chHave(D,S,"mh")} piece of the attempt, still a witness`)}
  /* a servant witness dies for real */
  reset();{const sv=(A.staff||[]).find(s=>s&&s.sid!=null&&!s.out);if(sv){deedAdd(S,"poison",C,2,"bỏ độc");chSawAdd(S,"mh","s"+sv.sid);const pp={kind:"npc",sid:sv.sid,name:sv.name};const k1=doorRaw(pp).find(a=>a&&a.n===COVN.nang);
   ok(!!k1,`servant witness ${sv.name}: the door is there`);force(true,()=>runOpt(k1));ok(sv.dead===1&&!chWitP("s"+sv.sid)&&!(A.staff||[]).includes(sv),`servant witness killed: dead, out of ${A.name}'s staff, no longer a witness`)}else ok(true,"no servant to test (skipped)")}
  /* 5. Đức / Danh family */
  reset();{const d0=A.duc;COV.ctx++;COV.force=1;try{deedAdd(A,"plot",C,null,"bày mưu")}finally{COV.ctx--;COV.force=0}ok(A.duc===d0+V.duc.nhe,`an NPC's nhẹ deed: Đức ${d0}→${A.duc} (= ${V.duc.nhe}, known or not)`);
   const d1=A.duc;deedAdd(A,"poison",C,2,"bỏ độc");ok(A.duc===d1,`a road with its own Đức (Hạ độc c.duc) is never taken twice (${d1}→${A.duc})`);
   const n0=A.danh;ok(A.danh===n0,"Danh unchanged while unexposed");C.rank=2;const c0=C.danh;try{chPunish(C,"mh","thử",S)}catch(e){}ok(C.danh===c0+V.danh.nang,`proven nặng: Danh ${c0}→${C.danh} (= ${V.danh.nang})`);
   ok(BAL.eff.j85.caughtDanh===V.danh.nhe,`caught outside an act = nhẹ ${BAL.eff.j85.caughtDanh}; inside an act it reads the act's weight`)}
  /* 6. NPCs do the same to her (law 1) */
  reset();{deedAdd(A,"poison",C,2,"bỏ độc");chSawAdd(A,"mh","me");evA(C,A,3,"mh");A.duc=80;const pr=roll;roll=()=>true;try{covNpcTurn()}finally{roll=pr}
   ok(!(A.wsee.mh||[]).includes("me"),`${A.name} (Đức 80 → nhẹ) threatened her: she is no longer a witness`)}
  reset();{deedAdd(A,"poison",C,2,"bỏ độc");chSawAdd(A,"mh","me");A.duc=45;A.bac=999;const ra=rcvAsk;let asked=null;rcvAsk=function(k,p,t){asked={k,p,t};return ra.apply(this,arguments)};const pr=roll;roll=()=>true;try{covNpcTurn()}finally{roll=pr;rcvAsk=ra}
   ok(asked&&asked.k==="witBribe"&&asked.p===A&&asked.t===S&&(A.wsee.mh||[]).includes("me"),`${A.name} (Đức 45, bạc) sends a bribe: HER choice card (jrcv «${RCVK.witBribe.t}»), she is still a witness until she takes it`);
   const P=PEND.rcvAsk({k:"witBribe",a:key(A)});const yes=P&&P.o[0];const b0=S.bac;yes&&yes.go();ok(S.bac>b0&&!(A.wsee.mh||[]).includes("me"),`she takes it: bạc ${b0}→${S.bac}, silenced`)}
  reset();{COV.ctx++;COV.force=1;try{deedAdd(A,"trip",C,1,"ngáng chân")}finally{COV.ctx--;COV.force=0}const pr=roll;roll=()=>true;try{covNpcTurn()}finally{roll=pr}const d=A.wrongs[A.wrongs.length-1];ok(d.w===0&&d.wp===1,"an NPC wipes her own trace (same road)")}
  }catch(e){ok(false,'THREW '+e.message+' @ '+String(e.stack).split('\n').slice(1,4).join(' | '))}
  chHere=hp0;roll=roll0;Math.random=r0;return out});
 let fails=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++}
 if(DIR){/* LOOK stills: her result card with the «Ẩn lộ» row, and the witness door card */
  const CLR="const clr=()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());[...document.querySelectorAll('body > *')].filter(e=>e.id!=='rtoast'&&e.id!=='modal'&&/Sửa soạn nhập cung|Chạm để mở/.test(e.textContent||'')).forEach(e=>e.remove())};clr();";
  await p.evaluate(()=>{window.__bot=0;Q.length=0;try{closeModal()}catch(e){}S.wrongs=[];S.wsee={};COV.last=[]});await p.evaluate(CLR);await sleep(400);await p.evaluate(CLR);
  await p.evaluate(()=>{const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const C=L[1],D=L[2];const b4=rsnap();const hp=chHere;chHere=()=>[ledgerId(D)];COV.ctx++;COV.force=1;try{deedAdd(S,"trip",C,1,"ngáng chân "+C.name);apply({duc:-2})}finally{COV.ctx--;COV.force=0;chHere=hp}
   log(`Ngươi ngáng chân ${C.name} giữa đường.`);resultShow("Ngáng chân",b4,true)});await sleep(900);
  {const t=await p.evaluate(()=>{const e=document.getElementById("rtoast");return e?e.textContent:""});const g=/Ẩn lộ/.test(t)&&/đã trông thấy/.test(t);console.log((g?"PASS ":"FAIL ")+`result card shows the «Ẩn lộ» row: ${t.replace(/\n/g," | ").slice(0,160)}`);if(!g)fails++}
  await p.evaluate(CLR);await p.screenshot({path:`${DIR}/cover-result-${W}x${H}.png`});
  /* RV-163L nit: the late «Nhập cung» start card can still arrive and hold #modal — wait it out and clear it before the door opens */
  await sleep(2000);await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});
  await p.evaluate(()=>{const e=document.getElementById("rtoast");if(e)e.classList.remove("on");const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const C=L[1],D=L[2];S.wsee={};deedAdd(S,"poison",C,2,"bỏ độc");/* the stage of her room: the consort visiting her stood there and saw it (curPeople = the room people) */
   S.place="home";const HP=homePeople();if(!HP.some(x=>x&&(x.kind==="rival"||x.kind==="hh"))){const L2=liveRivals(true).filter(x=>!x.queen&&!x.out&&!sameHouse(S,x));if(L2[2])HP.push(rp(L2[2]))}/* a consort calling on her (the room has one on most days) */S.visit={k:"home",people:HP,talked:false,tk:{},msg:"",cap:{}};Q.length=0;try{closeModal()}catch(e){}render();let P=curPeople();/* RV-163L nit: no consort in the room on this draw (only maid / elder) → bring one in, so the test always opens the real door */if(!P.some(x=>x&&(x.kind==="rival"||x.kind==="hh"))){const x=liveRivals(true).find(y=>y&&!y.queen&&!y.out&&!sameHouse(S,y)&&y!==C);if(x){if(!S.visit||S.visit.k!=="home")S.visit={k:"home",people:homePeople(),talked:false,tk:{},msg:"",cap:{}};S.visit.people.push(rp(x));P=curPeople()}}const pp=P.find(x=>x&&(x.kind==="rival"||x.kind==="hh"))||P.find(x=>x&&x.kind==="npc"&&x.sid!=null);if(!pp)return;chSawAdd(S,"mh",covWitId(pp));popIdx=P.indexOf(pp);doorOpen(pp,"wit");try{if(Q.length&&document.getElementById("modal").hidden)showModal()}catch(e){}});await sleep(1500);
  /* if another card still sits in front, bring the queued door card forward (read the card the door made, not a stray one) */
  await p.evaluate(()=>{const M=document.getElementById("modal");const txt=M&&!M.hidden?M.innerText:"";if(/Đe dọa bịt miệng/.test(txt))return;const i=Q.findIndex(c=>c&&(c.opts||[]).some(o=>/Đe dọa bịt miệng|Mua chuộc nhân chứng|Thủ tiêu nhân chứng/.test(o&&o.n||"")));if(i>0){const c=Q.splice(i,1)[0];Q.unshift(c)}if(i>=0){try{closeModal()}catch(e){}try{showModal()}catch(e){}}});await sleep(800);
  {const t=await p.evaluate(()=>(document.querySelector("#modal")||document.body).innerText);const g=/Đe dọa bịt miệng/.test(t)&&/Mua chuộc nhân chứng/.test(t)&&/Thủ tiêu nhân chứng/.test(t);console.log((g?"PASS ":"FAIL ")+"witness door card shows the three tiers at once");if(!g)fails++}
  await p.evaluate(CLR);await p.screenshot({path:`${DIR}/cover-door-${W}x${H}.png`});
 }
 console.log('page errors:',errs.length,JSON.stringify(errs.slice(0,3)));if(errs.length)fails++;
 console.log(fails?`cover: ${fails} FAIL`:'cover: ALL PASS');await b.close();process.exit(fails?1:0)})();
