/* review/punish-tier-wit (PUNISH-TIER-3; owner OD 26/11 ~21:10Z + ~21:17Z as overwritten ~21:40Z): NHÂN CHỨNG = a separate count from CHỨNG CỨ.
   usage: node dev/test/punish-wit.js <url> [W=755] [H=1000] [shotDir]   (exit 1 on a FAIL / page error)
   Checks: BAL.charge.wit need (nhẹ 0 · vừa 0 · nặng 1 · tử tội 2, same for every rank group) · own store h.ewc, outside the evidence total ·
   nặng with full evidence but no witness cannot be brought (Tố giác / Xử tội / accOK) · witnesses held while evidence is short = a middle state
   (card row) · nhẹ / vừa evidence only · finds alternate evidence / witness · presenting spends the witnesses, her notice names them ·
   tử tội needs 2 · two-way (an NPC on her, the same) · testimony kinds moved to wk (none left in pk) · every shown number = the BAL constant ·
   old save (evidence held, no witness store) gets its testimony pieces as witnesses · save → load keeps the store. */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',DIR]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:DIR?2:1,serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const R=await p.evaluate(()=>{const out=[];const ok=(c,m)=>out.push([!!c,m]);const r0=Math.random;const B=BAL.charge;
  const L=liveRivals(true).filter(x=>!x.queen);
  const clean=x=>{x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];x.ev=0;x.evc={};x.ewc={};x.evq={};x.evm={};x.punWk=null;x.punR=null;x.confined=0;x.nheWk=[];x.punDefer=null;x.preg=0;x.fake=0;x.coldLife=0;x.out=false;x.alive=true;x.coldFrom=null;x.coldR=null;x.wsee={}};
  const saw=(t,c,...P)=>P.forEach(p=>chSawAdd(t,c,ledgerId(p)));/* REAL-PROOF: a real person who stood there (the day record gives these in play) */
  const reset=()=>{try{CHM.clear()}catch(e){}for(const x of L.concat([S]))clean(x);S.out=0;S.coldFrom=null;S.coldRank=0;S.coldPend=null;S.confined=0;Q.length=0};
  const win=f=>{Math.random=()=>0;try{return f()}finally{Math.random=r0}};
  const sec=x=>JSON.stringify(x&&(x.kit&&x.kit.sections||x.sections)||"");
  reset();const A=L[0],C=L[1],D=L[2],E=L[3];
  /* 1. BAL numbers */
  ok(B.wit&&B.wit.need.nhe===0&&B.wit.need.vua===0&&B.wit.need.nang===1&&B.wit.need.tu===2,`BAL.charge.wit.need ${JSON.stringify(B.wit&&B.wit.need)}`);
  {const T=[];for(const r of [1,2,3,5,6,7]){A.rank=r;T.push(["vp","hd","mh"].map(c=>chWitNeed(A,c)).join("/"))}ok(T.every(x=>x==="0/0/1"),`witness need the same for every rank group (nhẹ/vừa/nặng): ${T.join(" · ")}`)}
  /* 2. testimony kinds moved out of the evidence kinds */
  {const bad=[];for(const c in B.C){const C0=B.C[c];if((C0.pk||[]).some(k=>/lời khai|chứng kiến/.test(k)))bad.push(c);if(!(C0.wk||[]).length)bad.push(c+":nowk")}
   ok(!bad.length&&B.C.mh.wk.includes("lời khai người hầu")&&B.C.uh.wk.includes("người tận mắt chứng kiến"),`testimony kinds in wk only (pk clean): ${bad.join(",")||"ok"}`)}
  /* 3. nặng: full evidence, no witness → not ready; the witness completes it */
  reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");saw(A,"mh",C);const need=chNeed(A,"mh");chWitS(S,A);chSync(S,A).mh=need;S.evm=S.evm||{};A.ev=need;try{evS(S,A,need)}catch(e){}
  {const m=chSync(S,A);m.mh=need;}
  const ev0=chHave(S,A,"mh");ok(ev0===need&&chWit(S,A,"mh")===0&&!chReady(S,A,"mh")&&!chOK(S,A)&&!accOK(S,A),`Tần mưu hại ${ev0}/${need} chứng cứ, 0/${chWitNeed(A,"mh")} nhân chứng → not ready (Tố giác closed)`);
  ok(/nhân chứng 0\/1/.test(chLine(S,A))&&/và 1 nhân chứng \(có 0\)/.test(chNeedTxt(S,A,"mh")),`lines print the witness need: «${chLine(S,A)}» · «${chNeedTxt(S,A,"mh")}»`);
  {const r=chRows(S,A).find(x=>/Mưu hại/.test(x[0]));ok(r&&/^Chứng cứ \d+\/\d+ · Nhân chứng 0\/1 · /.test(r[1])&&!/đủ để tố/.test(r[1]),`card row = ONE line «Chứng cứ a/b · Nhân chứng c/d» + odds word (REAL-PROOF-2): ${JSON.stringify(r)}`)}
  const tot0=evG(S,A);evA(S,A,1,"mh");ok(chWit(S,A,"mh")===1&&chHave(S,A,"mh")===need&&evG(S,A)===tot0&&chReady(S,A,"mh")==="mh",`a find with evidence at the cap = a witness (1/1); evidence total unchanged ${tot0}→${evG(S,A)}; now ready`);
  {const r=chRows(S,A).find(x=>/Mưu hại/.test(x[0]));ok(r&&/đủ để tố/.test(r[1]),`card row ready: ${JSON.stringify(r)}`)}
  /* 4. middle state: witness held, evidence short; finds alternate */
  reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");saw(A,"mh",C);evA(S,A,2,"mh");ok(chHave(S,A,"mh")===1&&chWit(S,A,"mh")===1&&!chReady(S,A,"mh"),`2 finds on mưu hại → 1 chứng cứ + 1 nhân chứng (alternate), not ready (middle state): «${chLine(S,A)}»`);
  evA(S,A,need-1,"mh");ok(chHave(S,A,"mh")===need&&chWit(S,A,"mh")===1&&chReady(S,A,"mh"),`then ${need-1} more → ${chHave(S,A,"mh")}/${need} + 1/1, ready`);
  /* 5. nhẹ / vừa: evidence only */
  reset();A.rank=3;deedAdd(A,"huydung",C,1,"hủy dung");evA(S,A,chNeed(A,"hd"),"hd");ok(chReady(S,A,"hd")==="hd"&&chWit(S,A,"hd")===0&&!/nhân chứng/.test(chLine(S,A)),`vừa (hại dung nhan) ready on evidence only ${chHave(S,A,"hd")}/${chNeed(A,"hd")}, no witness line`);
  /* 6. presenting spends the witnesses; her (accuser) side and the notice */
  reset();A.rank=3;C.rank=3;S.rank=3;Q.length=0;deedAdd(S,"poison",D,2,"bỏ độc");saw(S,"mh",C);evA(A,S,chNeed(S,"mh")+chWitNeed(S,"mh"),"mh");
  ok(chOK(A,S)&&chWit(A,S,"mh")===1,`two-way: ${A.name} holds ${chHave(A,S,"mh")}/${chNeed(S,"mh")} + ${chWit(A,S,"mh")}/1 on her → ready`);
  win(()=>ACT.accuse.f(A,S));const nq=Q.find(x=>x&&x.t==="Lãnh cung");const nt=sec(nq);
  ok(S.out&&chWit(A,S,"mh")===0&&/1 nhân chứng: [^;"(]+ \((lời khai người hầu|người tận mắt chứng kiến)\)/.test(nt),`her lãnh cung notice names the witness, store spent: ${(nt.match(/Chứng cứ","[^"]*/)||[""])[0]}`);
  window.__witQ=nq;
  reset();A.rank=3;S.rank=3;deedAdd(S,"poison",D,2,"bỏ độc");evA(A,S,chNeed(S,"mh"),"mh");{const m=chSync(A,S);m.mh=chNeed(S,"mh");chWitS(A,S).mh=0}
  ok(!chOK(A,S),`two-way: ${A.name} with full evidence but no witness cannot accuse her`);
  /* 7. tử tội needs 2 */
  reset();E.rank=3;deedAdd(E,"cyfake",null,1,"báo có thai giả");saw(E,"tt",C,D);ok(chTier(E,"tt")==="tu"&&chWitNeed(E,"tt")===2,`tử tội (giả thai) needs ${chWitNeed(E,"tt")} witnesses`);
  evA(S,E,1,"tt");ok(chWit(S,E,"tt")===0&&chHave(S,E,"tt")===1,`1st find = evidence «${chLine(S,E)}»`);evA(S,E,1,"tt");ok(chWit(S,E,"tt")===1&&!chReady(S,E,"tt"),`2nd find = 1st witness «${chLine(S,E)}»`);
  evA(S,E,chNeed(E,"tt")-1,"tt");ok(chHave(S,E,"tt")===chNeed(E,"tt")-1&&chWit(S,E,"tt")===2&&!chReady(S,E,"tt"),`tử tội: evidence 1 short, 2/2 witnesses → not ready «${chLine(S,E)}»`);
  evA(S,E,1,"tt");ok(chReady(S,E,"tt")==="tt"&&chWit(S,E,"tt")===2,`+1 → «${chLine(S,E)}» ready`);
  /* 8. shown numbers = BAL (change the constant, the text follows) */
  {const o=B.wit.need.nang;B.wit.need.nang=3;try{CHM.clear()}catch(e){}const t1=ACT.accuse.x,t2=chNeedTxt(S,A,"mh"),t3=ACT.expose.x;B.wit.need.nang=o;ok(/tội nặng cần thêm 3 nhân chứng, tử tội 2/.test(t1)&&/và 3 nhân chứng/.test(t2)&&/3 nhân chứng tội tư thông/.test(t3),`texts print BAL.charge.wit: «${t1.slice(t1.indexOf("tội nặng cần"),t1.indexOf("tội nặng cần")+48)}» · expose «${t3.slice(0,60)}»`)}
  /* 10. REAL-PROOF (owner 27/11 ~00:10Z «Bằng chứng và nhân chứng có thật trong game không vậy, hay chỉ là 1 con số đó ?», law 6): witnesses are real people who were there */
  {reset();A.rank=3;const R=agRec(),kh=agKh(),ia=ledgerId(A),ic=ledgerId(C),id=ledgerId(D);
   if(R&&R.P[ia]&&R.P[ic]&&R.P[id]){const keep={};for(const w in R.P)if(R.P[w]&&R.P[w][kh]){keep[w]=R.P[w][kh];if(R.P[w][kh][0]==="__wt")R.P[w][kh]=["__zz","x",null,""]}
    R.P[ia][kh]=["__wt","x",null,""];R.P[ic][kh]=["__wt","x",null,""];R.P[id][kh]=["__far","x",null,""];deedAdd(A,"poison",E,2,"bỏ độc");const L=(A.wsee&&A.wsee.mh)||[];for(const w in keep)R.P[w][kh]=keep[w];
    ok(L.includes(ic)&&!L.includes(id)&&!L.includes(ia),`deed written → who stood at that place that khắc (day record) = the people who saw it: ${JSON.stringify(L)} (${C.name} there, ${D.name} elsewhere)`)}else ok(false,"no day record to read who was there")}
  /* 10b. MAID WITNESS (MAIN 169 answer (b), law 6b/1): a maid at the place is a real witness, stored as HERSELF («mu:»), never the role «mm:» */
  {reset();A.rank=3;const R=agRec(),kh=agKh(),ia=ledgerId(A);const mo="mm:"+A.id,mm="mm:me";
   if(R&&R.P[ia]&&A.maid&&A.maid.name&&S.maid){const keep={};for(const w in R.P)if(R.P[w]&&R.P[w][kh]){keep[w]=R.P[w][kh];R.P[w][kh]=["__zz","x",null,""]}
    const had={a:R.P[mo],m:R.P[mm]};R.P[mo]=R.P[mo]||[null,null,null,null];R.P[mm]=R.P[mm]||[null,null,null,null];const k0={a:R.P[mo][kh],m:R.P[mm][kh]};
    R.P[ia][kh]=["__wt","x",null,""];R.P[mm][kh]=["__wt","x",null,""];R.P[mo][kh]=["__wt","x",null,""];deedAdd(A,"poison",E,2,"bỏ độc");const L=(A.wsee&&A.wsee.mh)||[];
    for(const w in keep)R.P[w][kh]=keep[w];if(had.a)R.P[mo][kh]=k0.a;else delete R.P[mo];if(had.m)R.P[mm][kh]=k0.m;else delete R.P[mm];
    const im=L.find(x=>/^mu:me:/.test(x)),io=L.find(x=>x.indexOf("mu:"+A.id+":")===0);
    ok(im&&io&&!L.some(x=>/^mm:/.test(x))&&chWitP(im)===S.maid&&chWitNm(im)===S.maid.name&&chWitNames(A,"mh",[im]).join("").includes("lời khai người hầu"),`her maid and ${A.name}'s own maid stood there → both are witnesses by person id ${JSON.stringify(L)} · «${chWitNames(A,"mh",[im])}»`);
    const old=S.maid;S.maid=maidMk(S);const gone=chWitP(im);S.maid=old;ok(!gone&&chWitP(im)===old,`a maid replaced → the old id never resolves to her successor (${gone}); back → resolves again`);
    S.ewc={};S.ewc[key(A)]={mh:[io]};const w0=chWit(S,A,"mh");const nm=A.maid.name;covKill(S,io);const w1=chWit(S,A,"mh");
    ok(w0===1&&w1===0&&A.maid&&A.maid.name!==nm&&(S.mort.dl||[]).some(d=>d.g==="maid"&&d.c==="plot"),`thủ tiêu a maid witness: she dies (death ledger «maid»), ${A.name} gets a new maid, the witness stops counting (${w0} → ${w1})`)}
   else ok(false,"no day record / maids to test the maid witness")}
  {reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");A.wsee={};const need=chNeed(A,"mh");evA(S,A,need+3,"mh");
   ok(chWit(S,A,"mh")===0&&chHave(S,A,"mh")===need&&!chReady(S,A,"mh")&&!chRoom(S,A,"mh",chSync(S,A),chWitS(S,A)),`nobody was there → no witness can be found: «${chLine(S,A)}», no room left, not ready`)}
  {reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");A.wsee={};saw(A,"mh",C);const need=chNeed(A,"mh");evA(S,A,need+1,"mh");const W=chWitS(S,A).mh;
   ok(Array.isArray(W)&&W.length===1&&W[0]===ledgerId(C)&&!chLine(S,A).includes(chWitNm(ledgerId(C)))&&chWitNames(A,"mh",W).join(" ").includes(chWitNm(ledgerId(C)))&&chReady(S,A,"mh"),`the witness is stored by id ${JSON.stringify(W)}; the card line counts only «${chLine(S,A)}», the name is for Sổ ghi / notice «${chWitNames(A,"mh",W)}»`);
   C.alive=false;const dead=chWit(S,A,"mh"),rd=chReady(S,A,"mh");C.alive=true;ok(dead===0&&!rd,`a witness who died no longer counts (${dead}, ready ${rd})`)}
  {reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");A.wsee={};saw(A,"mh",S,A);evA(S,A,chNeed(A,"mh")+2,"mh");ok(chWit(S,A,"mh")===0,`the accuser and the accused are never witnesses (A.wsee ${JSON.stringify(A.wsee.mh)})`)}
  {reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");A.wsee={};saw(A,"mh",D);S.ewc={};S.ewc[key(A)]={mh:2};const w=chWit(S,A,"mh");const W=chWitS(S,A).mh;
   S.ewc={};S.ewc[key(A)]={mh:1};A.wsee={};const w0=chWit(S,A,"mh");ok(w===1&&Array.isArray(W)&&W[0]===ledgerId(D)&&w0===0,`old save count → the real people who were there, never more (count 2, 1 seen → ${w}; nobody seen → ${w0})`)}
  {reset();const v=A;S.evd={};S.intel=S.intel||{};S.intel[v.id]=[];const S0=S.deeds;S.deeds=[];CHLASTC=null;const i0=v.inv,d0=v.dress;v.inv=[];v.dress=null;const p0=j78proof(v);v.inv=i0;v.dress=d0;const real0=!p0||/^(td:|deed:|affair|plan:|items|vp)/.test(p0.ref||"");deedAdd(v,"poison",C,2,"bỏ độc");try{CHM.clear()}catch(e){}const p1=j78proof(v);S.deeds=S0;
   const scan=[];for(let i=0;i<6;i++){const q=j78proof(v);if(q&&/lần thứ|nói xấu/.test(q.proves))scan.push(q.proves)}
   ok(real0&&p1&&/bỏ độc/.test(p1.proves)&&!scan.length,`a piece of evidence only for a real thing: nothing real → ${JSON.stringify(p0&&p0.ref)}; a real deed → «${p1&&p1.proves}»; no invented «nói xấu … lần thứ N»`)}
  {reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");saw(A,"mh",D);const d=JSON.parse(JSON.stringify(ser()));deser(d);const A2=rivals.find(v=>v.id===A.id);ok(A2&&A2.wsee&&(A2.wsee.mh||[]).includes(ledgerId(D)),`save → load keeps who saw it (${JSON.stringify(A2&&A2.wsee)})`)}
  /* 9. old save: evidence store, no witness store → testimony pieces become witnesses; save → load keeps the store */
  reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");saw(A,"mh",C);delete S.ewc;delete S.ewOld;S.evc={};S.evc[key(A)]={mh:need};A.ev=need;try{CHM.clear()}catch(e){}
  {const w=chWit(S,A,"mh"),h=chHave(S,A,"mh"),r=chReady(S,A,"mh");ok(w===1&&h===need&&r==="mh",`old save (${need} pieces held, no store) → ${w} witness, evidence kept ${h}/${need}, ready ${r}`)}
  delete S.ewc;delete S.ewOld;S.evc={};S.evc[key(A)]={mh:1};A.ev=1;ok(chWit(S,A,"mh")===0,`old save with 1 piece → no witness (its testimony was the 2nd kind)`);
  reset();A.rank=3;deedAdd(A,"poison",C,2,"bỏ độc");saw(A,"mh",C);evA(S,A,2,"mh");const w1=chWit(S,A,"mh");const d=JSON.parse(JSON.stringify(ser()));deser(d);const A2=rivals.find(v=>v.id===A.id);
  ok(w1===1&&S.ewc&&chWit(S,A2,"mh")===1,`save → load keeps the witness store (${w1} → ${chWit(S,A2,"mh")})`);
  Math.random=r0;return out});
 let fails=0;for(const [c,m] of R){console.log((c?'PASS ':'FAIL ')+m);if(!c)fails++}
 if(DIR){/* LOOK stills: the evidence card with the witness line (middle state + ready) and her notice naming the witness */
  await p.evaluate(()=>{Q.length=0;closeModal();const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const v=L[0];v.wrongs=[];v.evc={};v.ewc={};v.ev=0;S.evc={};S.ewc={};S.out=0;S.rank=2;v.rank=3;
   deedAdd(v,"poison",L[1],2,`bỏ độc vào điểm tâm của ${L[1].name}`);deedAdd(v,"tryst",null,2,"tư tình với thị vệ");deedAdd(v,"huydung",L[2],1,`hủy dung ${L[2].name}`);chSawAdd(v,"mh",ledgerId(L[2]));chSawAdd(v,"tt",ledgerId(L[2]));
   evA(S,v,2,"mh");evA(S,v,chNeed(v,"tt")+chWitNeed(v,"tt"),"tt");chWitS(S,v).tt=0;/* full evidence, the witness missing */evA(S,v,chNeed(v,"hd"),"hd");try{k61Know(v,"",true,2)}catch(e){}S.met=S.met||{};S.met[v.id]=wk();kitEvidencePanel(v)});await sleep(1500);
  {const t=await p.evaluate(()=>(document.querySelector("#modal")||document.body).innerText);const g=/Nhân chứng 1\/1/.test(t)&&/Chứng cứ 4\/4 · Nhân chứng 0\/1/.test(t);console.log((g?"PASS ":"FAIL ")+`evidence card shows the witness counts (mưu hại 1/1 short evidence, tư thông 0/1)`);if(!g)fails++}
  await p.screenshot({path:`${DIR}/wit-evidence-${W}x${H}.png`});
  const has=await p.evaluate(()=>{closeModal();Q.length=0;/* a fresh case (the queued one of the checks names the S from before save → load) */const L=liveRivals(true).filter(x=>!x.queen&&!x.out);const A=L[3],D=L[4];
   A.rank=3;S.rank=3;S.out=0;S.coldFrom=null;A.evc={};A.ewc={};A.evm={};deedAdd(S,"poison",D,2,"bỏ độc vào trà của "+D.name);chSawAdd(S,"mh",ledgerId(L[5]||D));evA(A,S,chNeed(S,"mh")+chWitNeed(S,"mh"),"mh");
   const r0=Math.random;Math.random=()=>0;try{ACT.accuse.f(A,S)}finally{Math.random=r0}const q=Q.find(x=>x&&x.t==="Lãnh cung");Q.length=0;if(!q)return false;Q.push(q);showModal();return true});if(has){await sleep(2500);await p.screenshot({path:`${DIR}/wit-notice-${W}x${H}.png`})}
 }
 console.log('page errors:',errs.length,JSON.stringify(errs.slice(0,3)));if(errs.length)fails++;
 console.log(fails?`punish-wit: ${fails} FAIL`:'punish-wit: ALL PASS');await b.close();process.exit(fails?1:0)})();
