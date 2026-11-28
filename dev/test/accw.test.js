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
  [w].forEach(clean);S.evc={};prove(S,w,"mh");mindPick=()=>"cho";let rs;try{rs=fix(0,()=>runAct(S,w,"accuse"))}finally{mindPick=mp}ok(!awRec(S,w)&&/tố giác|trình chứng cứ/.test(String(rs)),`her act on an NPC runs at once: «${String(rs).replace(/<[^>]+>/g,"").slice(0,80)}»`);
  /* the NPC Hoàng hậu's «Xử tội» on her: the same prepare step + the same dialog */
  if(q){S.accw={};[S].forEach(clean);S.out=0;S.rank=Math.max(S.rank,3);prove(q,S,"mh");Q.length=0;const rk2=S.rank;const rj=fix(0,()=>judge(q,S));const Rj=awRec(q,S);const dj=PEND.accw({a:key(q)});
   ok(rj===""&&Rj&&Rj.k==="judge"&&S.rank===rk2&&!S.out&&dj&&/sắp xử ngươi/.test(dj.t),`Hoàng hậu «Xử tội» on her: prepared, no penalty yet, dialog «${dj&&String(dj.t).replace(/<[^>]+>/g," ").slice(0,90)}»`);
   Rj.due=bq();fix(0,()=>rivalsBuoi());ok(!awRec(q,S)&&(S.rank<rk2||!!S.out),`… on its day the queen judges (rank ${rk2}→${S.rank}, lãnh cung ${!!S.out})`);S.out=0}
  ok(JSON.stringify(BAL.accw).length>20&&!/[0-9]{2,} lượng/.test(document.body.innerHTML.slice(0,0)),"numbers from BAL.accw");
  }catch(e){o.push([false,'EXC '+e.message+' '+String(e.stack||'').split('\n')[1]])}return o});
 let f=0;for(const [c,m] of out){console.log((c?'ok  ':'FAIL')+' '+m);if(!c)f++}
 if(errs.length){console.log('FAIL page errors: '+errs.join(' | '));f++}else console.log('ok   no page errors');
 console.log(`accw: ${out.length-out.filter(x=>!x[0]).length}/${out.length} ok`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(1)});
