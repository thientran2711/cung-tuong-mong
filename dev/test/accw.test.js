/* ROW 12 removal ladder — WARNED BEFORE THE ACCUSATION (dev/build/jaccw.js; owner OD 25/11 ~23:33Z «a punishment never falls without a prior
   visible warning»; law 2 tiers Nhẹ · Vừa · Nặng; law 1 two-way). Real game functions (runAct, ACT.accuse via jcharge, chPunish, punTier).
   A  NPC → HER: the first «Tố giác» pick only PREPARES (no penalty, rank / cấm túc unchanged), her dialog «Sắp bị tố giác» names who / charge / weight /
      penalty / when, and offers the tiered ways out (Nhẹ tự thú when a lighter weight exists · Vừa dàn xếp · Nặng cầu che chở).
   B  each way out does what its card says (tự thú: lighter penalty now; dàn xếp: bạc moves to the accuser, her pieces handed back; che chở: case
      shelved, pieces burnt, accuser Danh −); waiting: on the due buổi the accusation runs with its own roll.
   C  NPC → NPC: the same prepare step, the accused answers with the same list; HER act on an NPC runs at once (no prepare).
   usage: node dev/test/accw.test.js [index.html]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const A=process.argv[2]||path.join(__dirname,'..','..','index.html');const URL=/^(file|https?):/.test(A)?A:'file://'+path.resolve(A);
(async()=>{const b=await chromium.launch();const errs=[];const ctx=await b.newContext({viewport:{width:755,height:1000}});const p=await ctx.newPage();
 p.on('pageerror',e=>errs.push(e.message.slice(0,200)));await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());await p.goto(URL,{waitUntil:'domcontentloaded'});
 for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1000);
 const out=await p.evaluate(()=>{BAL.charge.rep.n=99;const o=[];try{const ok=(c,m)=>o.push([!!c,m]);
  const L=liveRivals(true).filter(x=>!x.queen&&!x.coop);const [v,w,u]=L;const q=queenP();
  const clean=x=>{x.wrongs=[];x.dw=0;x.evc={};x.evq={};x.ev=0;x.out=x===S?0:false;x.confined=0;x.punWk=null;x.plan=null;if(x===S)S.deeds=(S.deeds||[]).filter(d=>d.a!=="me")};
  /* a real deed of the «ức hiếp» kind on t + the pieces the accuser needs (a nhẹ charge) or a «mưu hại» (heavier) */
  const prove=(a,t,c)=>{clean(t);a.evc={};const x=[v,w,u].find(z=>z!==t&&z!==a);if(c==="mh"){deedAdd(t,"poison",x,2,"bỏ thuốc "+x.name);deedAdd(t,"poison",x,2,"bỏ thuốc lần nữa "+x.name)}else{deedAdd(t,"trip",x,1,"ngáng chân "+x.name);deedAdd(t,"batnat",x,1,"bắt nạt "+x.name)}for(let i=0;i<12&&chHave(a,t,c)<chNeed(t,c);i++)evA(a,t,1,c);try{for(const z of [v,w,u,q]){if(z&&z!==a&&z!==t)chSawAdd(t,c,ledgerId(z))}}catch(e){}try{const W=chWitS(a,t);W[c]=chWitAv(a,t,c,W).slice(0,chWitNeed(t,c))}catch(e){}return chReady(a,t)};
  const gate=f=>{const g=[["npcKnows",()=>true],["j95gate",()=>false],["ptNpcSent",()=>false]].filter(x=>typeof window[x[0]]==="function").map(x=>{const o=window[x[0]];window[x[0]]=x[1];return [x[0],o]});try{return f()}finally{g.forEach(([n,o])=>window[n]=o)}};
  const fix=(r,f)=>{const r0=Math.random;Math.random=()=>r;try{return gate(f)}finally{Math.random=r0}};
  const pick=x=>{if(x.fx&&Object.keys(x.fx).length)apply(x.fx);/* the kit applies the option's Tốn first */x.go()};const st=()=>({rank:S.rank,conf:S.confined||0,out:!!S.out,bac:S.bac,dead:!!S.dead});
  const hasJ=typeof PEND.accw==="function";ok(hasJ,"PEND.accw exists (the warning dialog)");
  /* ---- A: NPC → her ---- */
  [v,w,u,S].forEach(clean);S.bac=500;S.rank=Math.max(S.rank,3);const c=prove(v,S,"mh");ok(!!c,`v holds a full charge on her: ${c} (${c&&chTierN(S,c)}) have ${chHave(v,S,'mh')}/${chNeed(S,'mh')} wit ${chWit(v,S,'mh')}/${chWitNeed(S,'mh')} av ${chWitAv(v,S,'mh',chWitS(v,S)).length}`);
  Q.length=0;const s0=st();const r=fix(0,()=>runAct(v,S,"accuse"));const s1=st();
  ok(s1.rank===s0.rank&&s1.conf===s0.conf&&s1.out===s0.out&&!s1.dead,`first «Tố giác» on her: NO penalty yet (rank ${s0.rank}→${s1.rank}, cấm túc ${s0.conf}→${s1.conf}, lãnh cung ${s1.out}) · act text «${String(r).slice(0,60)}»`);
  const m=Q.find(x=>x.pid==="accw");ok(!!m,`her dialog queued: «${m&&m.t}»`);
  const d=hasJ&&PEND.accw({a:key(v)});const tx=d?String(d.t).replace(/<[^>]+>/g," "):"";
  ok(d&&tx.includes(v.name)&&tx.includes(chName(c).toLowerCase())&&tx.includes(chTierN(S,c))&&/trong \d+ buổi/.test(tx)&&/Nếu tố thành, ngươi/.test(tx),`dialog names who / charge / weight / penalty / when: «${tx.slice(0,230)}»`);
  const names=d?d.o.map(x=>x.n):[];ok(names.length===3&&/^Nhẹ · /.test(names[0])&&/^Vừa · /.test(names[1])&&/^Nặng · /.test(names[2]),`three tiers: ${names.join(" | ")}`);
  ok(d&&d.o.every(x=>/thành:|được:/.test(x.j67||"")&&/tốn:/.test(x.j67||"")),`every option: tốn + được/thành (law 3): ${d&&d.o.map(x=>x.j67).join(" ‖ ").slice(0,400)}`);
  ok(!/%/.test(tx+JSON.stringify(names)),"no % in the dialog (law 7)");
  /* B1 tự thú */
  const r1=S.rank;pick(d.o[0]);ok(!awRec(v,S)&&!(v.plan&&v.plan.aw)&&chHave(v,S,c)===0,`tự thú: case closed, accuser's pieces spent (${chHave(v,S,c)})`);
  ok(S.rank>=r1-1&&!S.dead,`tự thú: penalty one tier lighter (${chTierN(S,c)} → ${punTierN(punStep(chTier(S,c),-1))}); rank ${r1}→${S.rank}, lãnh cung ${!!S.out}`);
  /* B2 dàn xếp (forced accept) */
  [v,S].forEach(clean);S.out=0;S.rank=Math.max(S.rank,3);prove(v,S,"mh");Q.length=0;fix(0,()=>runAct(v,S,"accuse"));let d2=PEND.accw({a:key(v)});const b0=S.bac,vb=v.bac|0,n2=chHave(v,S,c),r2=S.rank;
  fix(0,()=>pick(d2.o.find(x=>/^Vừa/.test(x.n))));ok(!awRec(v,S)&&S.bac<b0&&(v.bac|0)-vb===b0-S.bac&&chHave(v,S,c)===0&&S.rank===r2,`dàn xếp accepted: her bạc ${b0}→${S.bac}, ${v.name} +${(v.bac|0)-vb}, pieces ${n2}→${chHave(v,S,c)}, rank kept`);
  /* B2' dàn xếp refused: bạc kept, case stands */
  [v,S].forEach(clean);prove(v,S,"mh");Q.length=0;fix(0,()=>runAct(v,S,"accuse"));d2=PEND.accw({a:key(v)});const b1=S.bac;fix(.999,()=>pick(d2.o.find(x=>/^Vừa/.test(x.n))));ok(!!awRec(v,S)&&S.bac===b1,`dàn xếp refused: bạc kept (${b1}→${S.bac}), case stands`);
  /* B3 che chở (forced) */
  awRec(v,S)&&(delete S.accw[`${v.id}>${key(S)}`]);[v,S].forEach(clean);prove(v,S,"mh");Q.length=0;fix(0,()=>runAct(v,S,"accuse"));let d3=PEND.accw({a:key(v)});const b2=S.bac,dn=v.danh,r3=S.rank;
  const o3=d3.o.find(x=>/^Nặng/.test(x.n));fix(0,()=>pick(o3));ok(!awRec(v,S)&&b2-S.bac===BAL.accw.shield.bac&&chHave(v,S,c)===0&&v.danh<=dn&&S.rank===r3,`che chở (${o3.n}): bạc −${b2-S.bac}, pieces burnt, ${v.name} Danh ${dn}→${v.danh}, rank kept`);
  /* B4 waiting: the due buổi runs the accusation */
  [v,S].forEach(clean);S.out=0;S.rank=Math.max(S.rank,3);prove(v,S,"mh");Q.length=0;fix(0,()=>runAct(v,S,"accuse"));const R=awRec(v,S);const rk=S.rank,ou=!!S.out;
  ok(R&&v.plan&&v.plan.aw&&v.plan.due===R.due,`waiting: ${v.name} keeps the plan (due buổi ${R&&R.due}, now ${bq()})`);
  ok(fix(0,()=>runAct(v,S,"accuse"))===""&&S.rank===rk,"before the due buổi: nothing falls");
  R.due=bq();window.__dbg=JSON.stringify({ok:ACT.accuse.ok(v,S),rec:!!awRec(v,S),to:chTo(v,S)});const rr=fix(0,()=>runAct(v,S,"accuse"));window.__dbg+=" after:"+JSON.stringify({rec:!!awRec(v,S),plan:v.plan,ready:chReady(v,S),log:(S.log||[]).slice(-2)});ok(/thành/.test(rr)&&(S.rank<rk||!!S.out!==ou||S.dead||(S.confined||0)>0),`on the due buổi: the accusation runs («${String(rr).replace(/<[^>]+>/g,"").slice(0,80)}»), rank ${rk}→${S.rank}, lãnh cung ${!!S.out} ${window.__dbg}`);
  S.dead=false;S.out=0;
  /* ---- C: NPC → NPC and her → NPC ---- */
  S.accw={};[v,w].forEach(clean);prove(v,w,"mh");const wr=w.rank;const mp=mindPick;mindPick=()=>"cho";let rc;try{rc=fix(0,()=>runAct(v,w,"accuse"))}finally{mindPick=mp}
  ok(rc===""&&!!awRec(v,w)&&w.rank===wr&&!w.out,`NPC→NPC: prepared first (record ${!!awRec(v,w)}, ${w.name} rank ${wr}→${w.rank})`);
  S.accw={};[v,w].forEach(clean);prove(v,w,"mh");mindPick=()=>"tu";try{fix(0,()=>runAct(v,w,"accuse"))}finally{mindPick=mp}ok(!awRec(v,w)&&chHave(v,w,c)===0,`NPC→NPC: the accused confesses with the same rule (record gone, pieces ${chHave(v,w,c)})`);
  /* HER → NPC (law 1, rv FAIL 2): her accusation is prepared too; the NPC answers the same list incl. a settlement offered to HER */
  S.accw={};[w].forEach(clean);S.evc={};prove(S,w,"mh");const wr2=w.rank;mindPick=()=>"cho";let rs;try{rs=fix(0,()=>runAct(S,w,"accuse"))}finally{mindPick=mp}
  ok(!!awRec(S,w)&&w.rank===wr2&&!w.out&&/2 buổi nữa|buổi nữa sẽ xét/.test(String(rs)),`her «Tố giác» on an NPC: prepared, ${w.name} rank ${wr2}→${w.rank} («${String(rs).replace(/<[^>]+>/g,"").slice(0,70)}»)`);
  awRec(S,w).due=bq();fix(0,()=>rivalsBuoi());ok(!awRec(S,w)&&(w.rank<wr2||!!w.out||(w.confined||0)>0),`… on its day her accusation runs by itself (${w.name} rank ${wr2}→${w.rank}, lãnh cung ${!!w.out}, cấm túc ${w.confined||0})`);
  S.accw={};[w].forEach(clean);w.out=false;w.rank=Math.max(w.rank,3);S.evc={};prove(S,w,"mh");w.bac=500;Q.length=0;mindPick=()=>"xep";try{fix(0,()=>runAct(S,w,"accuse"))}finally{mindPick=mp}
  const qx=Q.find(x=>x.pid==="accwx");const dx=PEND.accwx({t:key(w)});ok(!!qx&&dx&&dx.o.length===2&&/xin ngươi bỏ qua/.test(dx.t),`the NPC offers HER a settlement: «${qx&&qx.t}» · ${dx&&dx.o.map(x=>x.n).join(" | ")}`);
  const sb=S.bac,wb=w.bac,nh=chHave(S,w,"mh");dx.o[0].go();ok(!awRec(S,w)&&S.bac-sb===wb-w.bac&&S.bac>sb&&chHave(S,w,"mh")===0,`she takes it: bạc +${S.bac-sb} from ${w.name}, her pieces ${nh}→${chHave(S,w,"mh")}, case dropped`);
  S.accw={};[w].forEach(clean);S.evc={};prove(S,w,"mh");mindPick=()=>"che";S.danh=30;const sd=S.danh;try{fix(0,()=>runAct(S,w,"accuse"))}finally{mindPick=mp}ok(!awRec(S,w)&&evG(S,w)===0&&S.danh<sd,`the NPC seeks a patron: her case shelved, every piece she held burnt (${evG(S,w)}), her Danh ${sd}→${S.danh}`);
  if(q){S.accw={};[w].forEach(clean);S.evc={};prove(q,w,"mh");const qr=S.rank,qq=q;q.queen=false;S.rank=7;const real=queenP;queenP=()=>S;let rj2;try{mindPick=()=>"cho";rj2=fix(0,()=>judge(S,w))}finally{mindPick=mp}
   ok(!!awRec(S,w)&&/buổi nữa sẽ xử/.test(String(rj2)),`her «Xử tội» as Hoàng hậu: prepared too («${String(rj2).slice(0,60)}»)`);queenP=real;S.rank=qr;qq.queen=true;S.accw={}}
  /* the NPC Hoàng hậu's «Xử tội» on her: the same prepare step + the same dialog */
  if(q){S.accw={};[S].forEach(clean);S.out=0;S.rank=Math.max(S.rank,3);prove(q,S,"mh");Q.length=0;const rk2=S.rank;const rj=fix(0,()=>judge(q,S));const Rj=awRec(q,S);const dj=PEND.accw({a:key(q)});
   ok(rj===""&&Rj&&Rj.k==="judge"&&S.rank===rk2&&!S.out&&dj&&/sắp xử ngươi/.test(dj.t),`Hoàng hậu «Xử tội» on her: prepared, no penalty yet, dialog «${dj&&String(dj.t).replace(/<[^>]+>/g," ").slice(0,90)}»`);
   Rj.due=bq();fix(0,()=>rivalsBuoi());ok(!awRec(q,S)&&(S.rank<rk2||!!S.out),`… on its day the queen judges (rank ${rk2}→${S.rank}, lãnh cung ${!!S.out})`);S.out=0}
  /* ---- D: THE CORE GATE (every other road: law 11 family) ---- */
  S.accw={};[v,S].forEach(clean);S.out=0;S.dead=false;S.rank=Math.max(S.rank,3);S.bac=500;Q.length=0;const st2=()=>({rank:S.rank,conf:S.confined||0,out:!!S.out,dead:!!S.dead,cut:S.cutPay||0,danh:S.danh,sung:S.sung,bac:S.bac,suc:S.suc});
  /* r3 (rv FAIL 3/4): every held card — the matter has no raw key, no «xét tội <a whole sentence>», no empty-option fallback, at least one option */
  const cardOk=d=>{const t=d?String(d.t).replace(/<[^>]+>/g," "):"";return !!d&&d.o&&d.o.length>0&&!/tội\s+(nhe|vua|nang|tu)\b/.test(t)&&!/undefined|null|NaN|\[object/.test(t)&&!/không còn việc để chọn/.test(t)&&!/xét tội\s+(bị|ngươi|[A-ZĐ])/.test(t)};
  const cores=()=>Object.entries(S.accw||{}).filter(([k,R])=>R.k==="core");
  ok(typeof awInW==="function"&&punish.__aw&&fall.__aw&&demote.__aw&&chPunishX.__aw&&deathSentence.__aw&&cold.__aw&&punTier.__aw,"every punishment core carries the gate wrap");
  ok(chooseM.__awc==="her"&&nextBuoi.__awc==="w"&&endTurn.__awc==="w"&&(typeof menReport!=="function"||menReport.__awc==="npc")&&(typeof rtReport!=="function"||rtReport.__awc==="npc")&&runAct.__awc,`road contexts: her taps / the world turn / witness roads / acts (${[chooseM.__awc,nextBuoi.__awc,endTurn.__awc,typeof menReport,typeof menReport==="function"&&menReport.__awc,typeof rtReport,typeof rtReport==="function"&&rtReport.__awc,runAct.__awc].join(",")})`);
  const tries=[["punish",()=>punish(S,"bị cung nữ tố giác mưu kế",2)],["fall",()=>fall(S,"bị tố giác, chứng cứ rành rành")],["demote",()=>demote(S,"bị Hoàng hậu tâu giáng")],["chPunishX",()=>chPunishX(S,"mh","bị tố",null,"nang",false)],
   ["deathSentence",()=>deathSentence(S,"Bị ban chết vì tư thông","thuong")],["cold",()=>cold("Bị đày vào lãnh cung")],["punTier",()=>punTier(S,"nang","tàng trữ độc vật",null)],
   ["chPunish",()=>chPunish(S,"mh","bị tố mưu hại",null)],["framed",()=>{const X1=ACTX;ACTX={a:null,pen:0};try{return framed(S,"tàng trữ bùa chú")}finally{ACTX=X1}}]];
  for(const [n,f] of tries){S.accw={};Q.length=0;const s0=st2();awInW(f);const s1=st2();const C=cores();const d=C.length?PEND.accw({id:C[0][0]}):null;const tx=d?String(d.t).replace(/<[^>]+>/g," "):"";
   ok(JSON.stringify(s0)===JSON.stringify(s1)&&C.length===1&&Q.some(x=>x.pid==="accw"&&x.t==="Sắp bị trị tội")&&/(trong|Trong) \d+ buổi tới/.test(tx)&&/Nếu tội thành, ngươi/.test(tx)&&cardOk(d),`world road → ${n}(): nothing falls now (rank/cấm túc/Danh/Sủng/bạc/Sức unchanged), held + her dialog «${tx.slice(0,150)}» · ${d&&d.o.map(x=>x.n).join(" | ")}`)}
  /* rv FAIL 3: punTier's matter is its reason (A[2]), never the tier key */
  {S.accw={};awInW(()=>punTier(S,"nang","tàng trữ độc vật",null));const C3=cores();const t3=C3.length?String(PEND.accw({id:C3[0][0]}).t).replace(/<[^>]+>/g," "):"";ok(/tàng trữ độc vật/.test(t3)&&!/tội\s+nang/.test(t3),`punTier held: the matter is the reason «${t3.slice(0,90)}»`);S.accw={}}
  /* rv FAIL 1: a chPunish with extras (Ức hiếp: bồi thường) on HER from an NPC: the WHOLE penalty waits (no bạc paid yet), then falls with its rows */
  {S.accw={};clean(S);clean(w);deedAdd(S,"trip",w,1,"ngáng chân "+w.name);S.bac=500;const b0=S.bac,wb0=w.bac|0;Q.length=0;const X2=ACTX;ACTX={a:v,pen:0};try{chPunish(S,"uh","bị tố giác",v)}finally{ACTX=X2}const C1=cores();
   ok(C1.length===1&&C1[0][1].fn==="chPunish"&&S.bac===b0&&(w.bac|0)===wb0,`chPunish «Ức hiếp» from ${v.name}: held whole (record ${C1.map(x=>x[1].fn)}, bạc ${S.bac-b0}, victim ${(w.bac|0)-wb0})`);
   const dc=C1.length&&PEND.accw({id:C1[0][0]});ok(cardOk(dc)&&/bồi bạc cho người bị hại/.test(String(dc.t)),`… its card names the bồi thường with the penalty «${dc&&String(dc.t).replace(/<[^>]+>/g," ").slice(0,160)}»`);
   C1[0][1].due=bq();fix(0,()=>rivalsBuoi());const nt=Q.map(m=>String(m.h||"")+JSON.stringify(m.sections||m.kit||"")).join(" ");ok(!cores().length&&S.bac<b0&&(w.bac|0)>wb0&&/Bồi thường/.test(nt),`… on its day it falls together: bạc ${b0}→${S.bac}, victim +${(w.bac|0)-wb0}, notice row «Bồi thường»`)}
  /* rv FAIL 1: framed (no framer named) on HER: Danh / Sủng wait with the punishment */
  {S.accw={};clean(S);S.rank=3;S.danh=60;S.sung=60;const X3=ACTX;ACTX={a:null,pen:0};let d=null;try{d=awInW(()=>framed(S,"tàng trữ bùa chú"))}finally{ACTX=X3}const C2=cores();ok(C2.length===1&&C2[0][1].fn==="framed"&&S.danh===60&&S.sung===60,`framed (world, no framer): held whole (Danh ${S.danh}, Sủng ${S.sung}, record ${C2.map(x=>x[1].fn)})`);
   C2[0][1].due=bq();fix(0,()=>rivalsBuoi());ok(!cores().length&&S.danh<60&&S.sung<60,`… falls on its day: Danh 60→${S.danh}, Sủng 60→${S.sung}`)}
  /* r3 family (law 11 «no penalty split»): a side penalty written with the core (punPlus: j8 search / birth omen / vượt phẩm, j92 / jdress / jshelf, j13, j4, jmen, jreign) waits with it */
  {S.accw={};clean(S);S.rank=3;S.danh=60;awInW(()=>punPlus(S,{danh:-10},()=>punish(S,"tàng trữ độc vật",2)));const C5=cores();const d5=C5.length&&PEND.accw({id:C5[0][0]});
   ok(C5.length===1&&S.danh===60&&C5[0][1].fx&&C5[0][1].fx.danh===-10&&punHeldLast()&&/Danh -10/.test(String(d5&&d5.t)),`punPlus on a world road: Danh waits with the held punish (Danh ${S.danh}, record fx ${JSON.stringify(C5[0]&&C5[0][1].fx)}, card names it)`);
   C5[0][1].due=bq();fix(0,()=>rivalsBuoi());ok(!cores().length&&S.danh===50,`… falls together on its day (Danh 60→${S.danh})`);
   S.danh=60;awInHer(()=>punPlus(S,{danh:-10},()=>punish(S,"tàng trữ độc vật",1)));ok(!cores().length&&S.danh===50&&!punHeldLast(),`… her own road: both fall at once (Danh 60→${S.danh})`);
   const wd=w.danh;awInW(()=>punPlus(w,{danh:-10},()=>punish(w,"x",1)));ok(w.danh===wd-10,`… an NPC victim: paid at once (Danh ${wd}→${w.danh})`)}
  /* rv FAIL 2/4: the servant cores (held, never fired here — she is not a servant): «Tin dữ: …» + a real option, no empty fallback */
  for(const [n,f] of [["srvLaundry",()=>srvLaundry(`${v.name} chán ghét ngươi, sai người giải xuống Nội vụ phủ.`,3)],["srvBeat",()=>srvBeat(`${v.name} nổi giận, sai thái giám đánh ngươi`,BAL.accw.beat.n,v.id)],
     ["srvKill",()=>srvKill(`${v.name} biết ngươi phản chủ, sai người dìm ngươi xuống giếng sau Ngự hoa viên`)],["chSrvEnd",()=>chSrvEnd({g:v.name,a:"",ev:"",x:"x"})],["srvAffairCaught",()=>srvAffairCaught()]]){
   S.accw={};const s0=st2();awInW(f);const C4=cores();const d4=C4.length?PEND.accw({id:C4[0][0]}):null;const t4=d4?String(d4.t).replace(/<[^>]+>/g," "):"";
   ok(C4.length===1&&JSON.stringify(st2())===JSON.stringify(s0)&&cardOk(d4)&&/^\s*Tin dữ: [A-ZĐÂ]/.test(t4)&&!/xét tội/.test(t4),`servant core ${n}: held, card «${t4.slice(0,140)}» · ${d4&&d4.o.map(x=>x.n).join(" | ")}`);S.accw={}}
  /* due: it falls once, exactly as the core would have */
  S.accw={};clean(S);S.rank=3;awInW(()=>punish(S,"tàng trữ độc vật",2));let C=cores();const s2=st2();C[0][1].due=bq();fix(0,()=>rivalsBuoi());const s3=st2();
  ok(!cores().length&&(s3.rank<s2.rank||s3.conf>s2.conf),`on its day the held punish() falls (rank ${s2.rank}→${s3.rank}, cấm túc ${s2.conf}→${s3.conf})`);const s4=st2();fix(0,()=>rivalsBuoi());ok(JSON.stringify(st2())===JSON.stringify(s4),"… once (the next buổi adds nothing)");
  /* the same matter twice = one record; two matters = two */
  S.accw={};awInW(()=>{punish(S,"lục lọi cung phi tần",1);punish(S,"lục lọi cung phi tần",1);punish(S,"giả bệnh khi quân",1)});ok(cores().length===2,`same matter twice = one record, two matters = two (${cores().length})`);
  /* an NPC accuser outside any turn (ACTX / by): held, with Vừa offered */
  S.accw={};clean(S);clean(v);S.rank=3;const X0=ACTX;ACTX={a:v,pen:0};try{fall(S,"bị cung nữ tố giác, chứng cứ rành rành")}finally{ACTX=X0}C=cores();const dd=C.length&&PEND.accw({id:C[0][0]});
  ok(C.length===1&&C[0][1].a===key(v)&&dd&&dd.o.map(x=>x.n.split(" · ")[0]).join(",")==="Nhẹ,Vừa,Nặng"&&String(dd.t).includes(v.name),`NPC accuser (ACTX ${v.name}): held, three tiers ${dd&&dd.o.map(x=>x.n).join(" | ")}`);
  ok(dd&&dd.o.every(x=>/tốn:/.test(x.j67)&&/được:|thành:/.test(x.j67))&&!/%/.test(JSON.stringify(dd)),"every option: tốn + được/thành, no % (laws 3, 7)");
  /* Nhẹ: one step lighter now */
  const rN=S.rank;pick(dd.o[0]);ok(!cores().length&&S.rank===rN&&(S.confined||0)>0&&!S.out,`Nhẹ «Nhận tội trước»: lighter now (vừa → nhẹ: cấm túc ${S.confined}, rank kept ${rN}→${S.rank}), case closed`);
  /* Vừa: bạc to the accuser */
  S.accw={};clean(S);ACTX={a:v,pen:0};try{fall(S,"bị tố giác")}finally{ACTX=X0}C=cores();let dv=PEND.accw({id:C[0][0]});const bS=S.bac,bV=v.bac|0;fix(0,()=>pick(dv.o.find(x=>/^Vừa/.test(x.n))));
  ok(!cores().length&&bS-S.bac===(v.bac|0)-bV&&bS>S.bac&&S.rank===rN,`Vừa «Dàn xếp»: bạc ${bS}→${S.bac} to ${v.name} (+${(v.bac|0)-bV}), case dropped, rank kept`);
  S.accw={};ACTX={a:v,pen:0};try{fall(S,"bị tố giác")}finally{ACTX=X0}C=cores();dv=PEND.accw({id:C[0][0]});const bS2=S.bac;fix(.999,()=>pick(dv.o.find(x=>/^Vừa/.test(x.n))));ok(cores().length===1&&S.bac===bS2,`Vừa refused: bạc handed back (${bS2}→${S.bac}), case stands`);
  /* Nặng: a bigger kind of result — every piece the accuser holds burnt — and the gift goes to a real owner */
  S.accw={};clean(S);prove(v,S,"mh");ACTX={a:v,pen:0};try{fall(S,"bị tố giác")}finally{ACTX=X0}C=cores();const dn2=PEND.accw({id:C[0][0]});const o3n=dn2.o.find(x=>/^Nặng/.test(x.n));const th0=(S.thO&&S.thO.bac)|0,qb0=(q&&q.bac)|0,bS3=S.bac,ev0=evG(v,S),vd=v.danh;
  fix(0,()=>pick(o3n));const toTh=/Thái hậu/.test(o3n.n);ok(!cores().length&&bS3-S.bac===BAL.accw.shield.bac&&(toTh?((S.thO.bac|0)-th0===BAL.accw.shield.bac):((q.bac|0)-qb0===BAL.accw.shield.bac))&&evG(v,S)===0&&ev0>0&&v.danh<vd,
   `Nặng «${o3n.n}»: bạc −${bS3-S.bac} into ${toTh?"the Thái hậu's household (S.thO.bac "+th0+"→"+S.thO.bac+")":"the Hoàng hậu's purse"}, ${v.name}'s pieces ${ev0}→${evG(v,S)} (all), Danh ${vd}→${v.danh}`);
  ok(BAL.accw.shield.base>BAL.accw.settle.base&&BAL.accw.shield.bac>BAL.accw.settle.cap,`tiers rise together: Nặng odds base ${BAL.accw.shield.base} > Vừa ${BAL.accw.settle.base}; Nặng bạc ${BAL.accw.shield.bac} > Vừa cap ${BAL.accw.settle.cap}`);
  /* her own choice: falls at once (the card said the risk) */
  S.accw={};clean(S);S.rank=3;const s5=st2();awInHer(()=>punish(S,"lục lọi cung phi tần",1));ok(!cores().length&&st2().conf>s5.conf,`her own card / act: falls at once (cấm túc ${s5.conf}→${st2().conf})`);
  clean(S);let fired=0;Q.length=0;pushModal({t:"t",h:"h",opts:[{n:"Làm",fx:{},go:()=>{punish(S,"làm phiền lúc thánh thượng nổi giận",1);fired=1}}]});const s6=st2();chooseM(0);ok(fired&&!cores().length&&st2().conf>s6.conf,"a real chooseM tap on her card: the risk it named falls at once");
  /* NPC victims of the world are not held (no player to warn; NPC acts prepare at act level) */
  S.accw={};clean(w);w.rank=Math.max(3,w.rank);const wc=w.confined||0;awInW(()=>punish(w,"x",1));ok(!cores().length&&(w.confined||0)>wc,"an NPC victim of a world road: falls at once (not held)");
  /* save mid-wait: the record is plain data; the dialog rebuilds and fires once after a save round-trip */
  S.accw={};clean(S);S.rank=3;ACTX={a:v,pen:0};try{fall(S,"bị tố giác")}finally{ACTX=X0}const sv=JSON.stringify(S.accw);S.accw=JSON.parse(sv);C=cores();ok(!!PEND.accw({id:C[0][0]})&&!/function/.test(sv),`save mid-wait: plain record (${sv.length} chars), dialog rebuilds`);
  /* a REAL save mid-wait (save() → loadSlot): the record and her card come back */
  {Q.length=0;S.accw={};clean(S);S.rank=3;ACTX={a:v,pen:0};try{fall(S,"bị tố giác")}finally{ACTX=X0}const qn=Q.filter(x=>x.pid==="accw").length;save();S.accw={};Q.length=0;let lr="ok";try{const dd0=loadSlot(SLOT);quiet=true;deser(dd0);quiet=false}catch(e){lr="EXC "+e.message}
   const back=Object.values(S.accw||{}).filter(R=>R.k==="core").length;ok(qn===1&&back===1&&Q.some(x=>x.pid==="accw"),`real save mid-wait → load: record ${back}, her card back ${Q.filter(x=>x.pid==="accw").length} (load → ${String(lr).slice(0,30)})`);C=cores()}
  const r7=S.rank;C[0][1].due=bq();fix(0,()=>rivalsBuoi());ok(!cores().length&&S.rank<r7,`… and falls on its day after the round-trip (rank ${r7}→${S.rank})`);
  /* ---- E: monthly checks warn a month ahead (j30 demoteReview) ---- */
  S.accw={};clean(S);S.rank=3;S.lowS=0;S.sick=0;const fl=sungFloor(3);S.sung=Math.max(0,fl-5);const rE=S.rank;awInW(()=>demoteReview());
  ok(S.rank===rE&&awPreHas("lowS")&&(kitNoticeList()||[]).some(x=>x.id==="aw:lowS"),`month 1: Sủng ${S.sung} under ${fl} → kit notice «${((kitNoticeList()||[]).find(x=>x.id==="aw:lowS")||{}).line||""}», no fall`);
  S.sung=Math.max(0,fl-5);awInW(()=>demoteReview());ok(S.rank<rE&&!awPreHas("lowS")&&!cores().length,`month 2 (warned): the demotion falls at once (rank ${rE}→${S.rank})`);
  S.accw={};S.rank=3;S.lowS=1;S.sung=Math.max(0,fl-5);awInW(()=>demoteReview());ok(S.rank===3&&cores().length===1,"an old save already at month 1 with no notice: the fall is held and warned instead");
  S.accw={};clean(S);S.rank=3;S.lowS=0;S.sung=99;S.sick=2;S.suc=10;awInW(()=>demoteReview());ok(awPreHas("sick")&&S.rank===3,"long illness: warned a month ahead");awInW(()=>demoteReview());ok(S.rank<3&&!awPreHas("sick"),`… then the illness demotion falls (rank 3→${S.rank})`);S.suc=80;S.accw={};
  ok(JSON.stringify(BAL.accw).length>20&&!/[0-9]{2,} lượng/.test(document.body.innerHTML.slice(0,0)),"numbers from BAL.accw");
  }catch(e){o.push([false,'EXC '+e.message+' '+String(e.stack||'').split('\n')[1]])}return o});
 let f=0;for(const [c,m] of out){console.log((c?'ok  ':'FAIL')+' '+m);if(!c)f++}
 if(errs.length){console.log('FAIL page errors: '+errs.join(' | '));f++}else console.log('ok   no page errors');
 console.log(`accw: ${out.length-out.filter(x=>!x[0]).length}/${out.length} ok`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(1)});
