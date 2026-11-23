/* AG-ALL-2 part 2b checks (G5 / G6 / G10 + jcmaid choices; jagstf2.js, j42, jmline, jeitem, jpromsv, jcmaid):
   1 every new player button exists and runs the SAME act function as the NPC path:
     maid player: Bỏ độc vào bát cơm (srvStaffAct → mlPoisonDo ← AS_DO.poison), Lén giữ đồ Nội vụ phủ phát (eitPilTake → eitPilJudge ← eitPilNpc),
     Xin chủ cho đi hầu cung khác (srvTalk → spAsk ← AS_DO.leave / spMonth); consort: Bắt quỳ, vả miệng / Vu tội (mlHitMe → mlHitDo ← mlHit)
   2 the dilemmas share ONE option list: the PEND cards (cnvFrame / cnvBribe / cnvOrd) carry the same option names as cnvFrameOpts / cnvBribeOpts /
     cnvOrdOpts; the player consort's pilfer card = eitPilOpts; her leave card = spLeaveOpts
   3 NPC picks vary by her stats (histograms over N trials, never one answer): framed (by Tâm cơ), bribed (by lòng), ordered (by lòng), a master on
     a caught pilferer, a master on a servant asking to leave, the close maid's eavesdrop / leak (by lòng)
   4 BAL.ag.on = 0 → no choice (old rolls); 0 page errors
   usage: node dev/test/ag-stf2.js <page URL or file>   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0]=process.argv;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=(maid)=>p.evaluate((maid)=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  if(maid)srvInit();else if(S.srv)delete S.srv;/* a consort life (start() may keep the maid road of the last fresh life) */try{deal()}catch(e){}render();return{srv:isSrv(),on:agOn()}},maid);
 /* ---------- 1 maid player ---------- */
 const f1=await fresh(true);ok(f1.srv&&f1.on,'maid life, loop on',f1);
 const r1=await p.evaluate(()=>{const m=srvM();const o=liveRivals(true).find(v=>v!==m&&(v.staff||[]).some(x=>x.role==="maid"));if(!o)return{skip:1};const x=o.staff.find(z=>z.role==="maid");
  S.srv.met.push(x.sid);const h0=hostility;hostility=()=>99;S.bac=100;used=0;const out={};
  const spy=(name)=>{const f=window[name];const c={n:0,a:null};window[name]=function(){c.n++;c.a=[...arguments];return f.apply(this,arguments)};return [c,()=>window[name]=f]};
  try{const html=(()=>{const L=srvColleagues(),p0=PG.staff;let h="";try{L.forEach((_,i)=>{PG.staff=i;h+=srvStaffTabHTML()})}finally{PG.staff=p0}return h})();/* every card of the Đồng liêu pager */out.btn=/data-cnv="poison"/.test(html);
   /* the player's button → mlPoisonDo(master, S, …) */
   let [c,undo]=spy("mlPoisonDo");const d0=die;die=()=>{};const r0=roll;roll=()=>false;try{srvStaffAct("poison",x)}finally{roll=r0;die=d0;undo()}out.me=c.n===1&&c.a[0]===m&&c.a[1]===S&&c.a[3]===x;
   /* an NPC maid's option → the same mlPoisonDo */
   const s=(m.staff||[]).find(z=>z.role==="maid")||(o.staff||[])[0];asSt(s);s.bac=50;s.af=s.af||{};
   const x2=(liveRivals(true).find(v=>v!==m&&v!==o&&(v.staff||[]).some(z=>z.role==="maid"))||o).staff.find(z=>z.role==="maid");s.af[x2.sid]=-80;
   const O=asOpts(s);const op=O.find(z=>z.sk==="poison");out.npcOpt=!!op;[c,undo]=spy("mlPoisonDo");try{if(op)AS_DO.poison(s,m,op,true)}finally{undo()}out.npc=c.n===1&&c.a[1]===s;
  }finally{hostility=h0}return out});
 ok(r1.skip||r1.btn,'maid: Đồng liêu shows "Bỏ độc vào bát cơm" for a hostile palace\'s maid',r1);
 ok(r1.skip||r1.me,'maid: her button runs mlPoisonDo (master, her, victim)',r1);ok(r1.skip||r1.npcOpt&&r1.npc,'NPC maid: the option exists by spite and runs the same mlPoisonDo',r1);
 const r2=await p.evaluate(()=>{const m=srvM();m.inv=m.inv||[];const k=Object.keys(IT).find(z=>IT[z].pr>0);m.inv.push({k,from:"noivu",d:S.turn});S.tin=10;S.srv.pilM=null;S.srv.pilDet=null;S.srv.lau=0;S.srv.spyFor=null;
  deal();const card=deck.find(a=>a.n==="Lén giữ đồ Nội vụ phủ phát");const out={card:!!card,o:card&&card.o,see:100-eitPilSee(m)};
  const f=eitPilJudge;let n=0,arg=null;eitPilJudge=function(X){n++;arg=X;return f.apply(this,arguments)};
  try{eitPilTake(false);out.me=n===1&&arg.p===m&&arg.s===S;
   const v=liveRivals(true).find(z=>z!==m&&(z.staff||[]).length);const s=v.staff[0];v.inv=v.inv||[];v.inv.push({k,from:"noivu",d:S.turn});n=0;const r0=roll;roll=()=>true;try{eitPilNpc({p:v,s,k,g:null})}finally{roll=r0}out.npc=n===1}finally{eitPilJudge=f}return out});
 ok(r2.card&&r2.o===r2.see,'maid: "Lén giữ đồ Nội vụ phủ phát" card, odds = 100 − her master\'s notice (the NPC rule)',r2);ok(r2.me&&r2.npc,'caught: her master answers through eitPilJudge, as an NPC master with an NPC servant',r2);
 const r3=await p.evaluate(()=>{const m=srvM();S.tin=10;S.srv.lvCd=0;const T=srvTalk({sk:"mis"});const a=T.find(x=>x.n==="Xin chủ cho đi hầu cung khác");const out={has:!!a,lock:a&&a.lock};
  const f=spAsk;let n=0,arg=null;spAsk=function(o,s){n++;arg=[o,s];return""};try{if(a)a.run();out.me=n===1&&arg[0]===m&&arg[1]===S;
   const s=(m.staff||[])[0];if(s){asSt(s);s.loyal=10;s.lvCd=0;const op=asOpts(s).find(z=>z.sk==="leave");out.npcOpt=!!op;n=0;if(op)AS_DO.leave(s,m,op,true);out.npc=n===1&&arg[0]===m&&arg[1]===s}}finally{spAsk=f}return out});
 ok(r3.has&&!r3.lock&&r3.me,'maid: "Xin chủ cho đi hầu cung khác" (Chủ tin under the bar) runs spAsk(master, her)',r3);ok(r3.npcOpt&&r3.npc,'NPC staff: the leave option runs the same spAsk',r3);
 /* ---------- 2 consort ---------- */
 await fresh(false);
 const r4=await p.evaluate(()=>{const v=liveRivals(true).find(z=>(z.staff||[]).some(x=>x.role==="maid"));if(!v)return{skip:1};const s=v.staff.find(x=>x.role==="maid");used=0;
  const B=mlHitBtns(s,v,"").join("");const out={beat:/data-mlh="beat"/.test(B),frame:/data-mlh="frame"/.test(B)};
  const f=mlHitDo;let A=[];mlHitDo=function(){A.push([...arguments]);return f.apply(this,arguments)};
  try{mlHitMe("beat",s.sid);out.me=A.length===1&&A[0][0]===S&&A[0][1]===v&&A[0][3]==="beat";
   const p2=liveRivals(true).find(z=>z!==v);const ah=asHitPick;asHitPick=()=>({t:v,k:"frame"});A=[];try{mlHit(p2)}finally{asHitPick=ah}out.npc=A.length===1&&A[0][0]===p2&&A[0][3]==="frame"}finally{mlHitDo=f}
  /* the dilemma cards = the one option list */
  const m0=liveRivals(true)[0];const x=(m0.staff||[])[0];const pl=v.staff[0];
  out.pilSame=JSON.stringify(eitPilEvent({p:S,s:(S.staff||[])[0]||pl,k:Object.keys(IT)[0],g:null}).opts.map(o=>o.n))===JSON.stringify(eitPilOpts({p:S,s:(S.staff||[])[0]||pl,k:Object.keys(IT)[0],g:null}).map(o=>o.n));
  out.lvNames=spLeaveOpts(S,(S.staff||[])[0]||pl).map(o=>o.n);return out});
 ok(r4.skip||r4.beat&&r4.frame,'consort: another palace\'s maid card has "Bắt quỳ, vả miệng" and "Vu tội"',r4);ok(r4.skip||r4.me&&r4.npc,'her button and the NPC consort\'s mlHit both run mlHitDo',r4);
 ok(r4.skip||r4.pilSame,'pilfer card options = eitPilOpts (one list for her card and an NPC master)',r4);
 const r5=await p.evaluate(()=>{const out={};srvInit();const m=srvM();const s=(m.staff||[])[0]||allServ()[0];const v=liveRivals(true).find(z=>z!==m)||m;const t=liveRivals(true).find(z=>z!==m&&z!==v)||v;
  const nm=d=>d?d.o.map(o=>o.n):null;
  out.frame=JSON.stringify(nm(PEND.cnvFrame({sid:s.sid})))===JSON.stringify(cnvFrameOpts(S,s,m).map(o=>o.n));
  out.bribe=JSON.stringify(nm(PEND.cnvBribe({r:v.id})))===JSON.stringify(cnvBribeOpts(S,v,m,1).map(o=>o.n));
  out.ord=JSON.stringify(nm(PEND.cnvOrd({k:"spy",t:t.id})))===JSON.stringify(cnvOrdOpts(S,m,t,null).map(o=>o.n));return out});
 ok(r5.frame&&r5.bribe&&r5.ord,'maid PEND cards (Bị vu oan / Bạc lạ / Lệnh của chủ) render the shared option builders',r5);
 /* ---------- 3 histograms ---------- */
 await fresh(false);
 const H=await p.evaluate(()=>{const N=400;const v=liveRivals(true).find(z=>(z.staff||[]).length>=2)||liveRivals(true)[0];const base=v.staff[0],acc=v.staff[1]||v.staff[0];
  const clone=(o,x)=>Object.assign(JSON.parse(JSON.stringify(o)),{sid:90000+Math.floor(Math.random()*1e6)},x);const H={};const add=(g,k)=>{H[g]=H[g]||{};H[g][k]=(H[g][k]||0)+1};
  const lg=log;log=()=>{};const d0=die;die=()=>{};
  try{for(const tc of [5,90])for(let i=0;i<N;i++){const x=clone(base,{loyal:50,tamco:tc,duc:20,bac:30,suc:70});asSt(x);const a=clone(acc,{loyal:50});const R=stf2Framed(x,a,v);add("frame_tamco"+tc,R.id+(R.id==="clear"?(R.ok?"+":"-"):""))}
   /* the bribed servant must be one whose lòng moves her bribe odds: an incorruptible one (Thanh liêm + trọng Liêm / Trung, AG-ALL-2f3 bt core)
      sits at BAL.odds.lo for lòng 10 AND 90 (real rule: she never sells), which says nothing about lòng — pick the first servant where it matters */
   const a0=liveRivals(true).find(z=>z!==v);const bb=(()=>{for(const z of liveRivals(true))for(const x of z.staff||[]){if(bribeOdds(a0,clone(x,{loyal:10,bac:0}))-bribeOdds(a0,clone(x,{loyal:90,bac:0}))>=15)return x}return base})();
   for(const lo of [10,90])for(let i=0;i<N;i++){const s=clone(bb,{loyal:lo,bac:0});const a=liveRivals(true).find(z=>z!==v);const c0=a.bac;a.bac=999;bribeServ(a,s);a.bac=c0;
     /* bribeServ on a clone not in staff: ownerOf null → stf2Bribe directly */const r=stf2Bribe(a,s,v,bribeOdds(a,s),1);add("bribe_lo"+lo,/thành tai mắt/.test(r)?"take":/mách chủ/.test(r)?"tell":"quiet")}
   for(const lo of [10,90])for(let i=0;i<N;i++){const s=clone(base,{loyal:lo,suc:80});add("ord_lo"+lo,stf2Ord(v,s,liveRivals(true).find(z=>z!==v),"poison"))}
   const P0=JSON.parse(JSON.stringify(window.__stf2N||{}));for(let i=0;i<N;i++){const s=clone(base,{loyal:30});const X={p:v,s,k:Object.keys(IT)[0],g:null};const st=v.staff.slice(),inv=(v.inv||[]).slice();eitPilJudge(X);v.staff=st;v.inv=inv}
   const P1=window.__stf2N;for(const k in P1)if(/^pil_/.test(k))H.pil=Object.assign(H.pil||{},{[k]:(P1[k]||0)-(P0[k]||0)});
   const L0=JSON.parse(JSON.stringify(window.__stf2N||{}));for(let i=0;i<N;i++){const s=clone(base,{loyal:30,rk:2});const st=v.staff.slice(),bac=v.bac;v.staff.push(s);spAsk(v,s);v.staff=st;v.bac=bac}
   const L1=window.__stf2N;for(const k in L1)if(/^leave_/.test(k))H.leave=Object.assign(H.leave||{},{[k]:(L1[k]||0)-(L0[k]||0)});
   for(const lo of [20,95]){let sp=0,lk=0;for(let i=0;i<N*5;i++){const m={loyal:lo};if(cmSpyCh(m))sp++;if(cmLeakCh(m,{k:"debt"}))lk++}H["cm_lo"+lo]={nghe:sp,leak:lk}}
   BAL.ag.on=0;H.off={frame:stf2Framed(clone(base,{}),clone(acc,{}),v),ord:stf2Ord(v,clone(base,{}),v,"poison")};BAL.ag.on=1}
  finally{log=lg;die=d0}return H});
 console.log(JSON.stringify(H));
 const many=o=>o&&Object.values(o).filter(n=>n>0).length>=2&&Math.max(...Object.values(o))<Object.values(o).reduce((a,b)=>a+b,0);
 const fr=k=>H[k]||{};const share=(o,k)=>(o[k]||0)/Object.values(o).reduce((a,b)=>a+b,0);
 ok(many(fr("frame_tamco5"))&&many(fr("frame_tamco90")),'framed NPC: several answers, never one',[H.frame_tamco5,H.frame_tamco90]);
 ok(share(fr("frame_tamco90"),"clear+")>share(fr("frame_tamco5"),"clear+"),'framed NPC: a sharp (Tâm cơ 90) one clears herself more often than a dull one',[share(fr("frame_tamco90"),"clear+"),share(fr("frame_tamco5"),"clear+")]);
 ok(many(fr("bribe_lo10"))&&share(fr("bribe_lo10"),"take")>share(fr("bribe_lo90"),"take")&&share(fr("bribe_lo90"),"tell")>share(fr("bribe_lo10"),"tell"),'bribed NPC: a disloyal one takes more, a loyal one tells her master more',[H.bribe_lo10,H.bribe_lo90]);
 ok(many(fr("ord_lo10"))&&share(fr("ord_lo90"),"obey")>share(fr("ord_lo10"),"obey"),'ordered NPC: obey / refuse / tell vary, a loyal one obeys more',[H.ord_lo10,H.ord_lo90]);
 ok(many(H.pil),'NPC master on a caught pilferer: several answers (punish / forgive / back / ignore)',H.pil);ok(many(H.leave),'NPC master on a servant asking to leave: several answers',H.leave);
 ok(H.cm_lo95.nghe>H.cm_lo20.nghe&&H.cm_lo20.leak>H.cm_lo95.leak,'close maid: a loyal one eavesdrops for her mistress more, a disloyal one leaks more',[H.cm_lo20,H.cm_lo95]);
 ok(H.off.frame===null&&H.off.ord===null,'loop off (BAL.ag.on = 0): no choice, the old rolls',H.off);
 /* ---------- 4 play ---------- */
 const r9=await p.evaluate(()=>{const E=[];const ce=console.error;console.error=(...a)=>{E.push(String(a[0]))};try{for(let i=0;i<12;i++){try{Q.length=0;endTurn()}catch(e){E.push(e.message)}}}finally{console.error=ce}return{E:E.slice(0,5),N:window.__stf2N}});
 ok(!r9.E.length,'12 tuần as a consort: no throw',r9);
 await fresh(true);
 const r10=await p.evaluate(()=>{const E=[];const ce=console.error;console.error=(...a)=>{E.push(String(a[0]))};S.tin=20;try{for(let i=0;i<12&&isSrv()&&!S.dead;i++){try{Q.length=0;used=0;deal();
   for(const a of deck.slice()){const j=deck.indexOf(a);if(a&&!a.lock&&/Lén giữ đồ/.test(a.n)){try{act(j)}catch(e){E.push(e.message)}}}
   for(const x of srvTalk({sk:"mis"}))if(/Xin chủ cho đi/.test(x.n)&&!x.lock){try{x.run()}catch(e){E.push(e.message)}}
   endTurn()}catch(e){E.push(e.message)}}}finally{console.error=ce}return{E:E.slice(0,5),srv:isSrv(),dead:!!S.dead}});
 ok(!r10.E.length,'12 tuần as a maid using the new cards: no throw',r10);
 ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();const n=res.filter(x=>!x).length;console.log(n?`AG-STF2: ${n} FAIL`:`AG-STF2: ALL ${res.length} PASS`);process.exit(n?1:0)})();
