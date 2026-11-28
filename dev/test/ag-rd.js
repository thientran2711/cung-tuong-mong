/* AG-ALL-2d — the owner's Ngự hoa viên scenario as a KHẮC CHAIN + ONE SHARED CLOCK (owner OD 17/11 ~15:45Z L1638, ~16:00Z L1641).
   node dev/test/ag-rd.js [dev/index.html] [runs]
   1 CHAIN (her timeline; timing = owner OD 17/11 ~17:55Z (3) "theo đường đi thật, gần thì khắc 2, xa thì khắc 3 trở đi"):
     noon, she stands one walk-khắc from Ngự hoa viên; a maid of consort A is on an errand there. She walks in (k1 = khắc index 0, her walk); the maid
     sees her and walks to A by the REAL Dư đồ road (travel()).
     NEAR (A's palace one walk-khắc from the garden): k2 (index 1): A hears at the START of this khắc, decides and walks (row "go"); k3 (index 2): A is
     in Ngự hoa viên (row, whereOf, Dư đồ count) with a deed aimed at her.
     FAR (two walk-khắc): k2: the maid is still on the road (row "ag_tell"), A has not re-decided; k3: A hears, decides and walks.
     a maid who keeps quiet → nothing; switch off → nothing.
   2 SHARED ACT (her): an NPC comes to her in khắc k → popup "Có người tìm đến" with Tiếp chuyện / Không tiếp. Tiếp chuyện: the deed lands and HER clock
     moves past the deed's khắc with the NPC's (both at k1+1). Không tiếp: her clock stays, the deed does not happen, the NPC's row keeps the khắc she spent.
   3 SHARED ACT (NPC ↔ NPC): A's meeting deed aimed at B who stands there free → B's row holds "ag_with"; B elsewhere → the meeting deed drops.
   → exit 1 on any FAIL or page error */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);const RUNS=+process.argv[3]||5;
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async(RUNS)=>{const out={runs:[]};
  const fresh=()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv())break}
   window.__bot=1;window.__agAll=1;Q.length=0;for(let i=0;i<8&&(S.buoi||0)!==1;i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}};
  const PLS=()=>{const L=new Set();try{const R=agRec();for(const id in R.P)for(const e of R.P[id])if(e&&e[0])L.add(e[0])}catch(e){}return [...L]};
  const one=(mode,DIST)=>{DIST=DIST||1;fresh();placeWhere();agFlush();
   /* she stands one walk-khắc from the garden at khắc 0 */
   const near=PLS().find(k=>k!=="vuon"&&k!=="home"&&k!=="lc"&&(()=>{try{return travel(k,"vuon")===1&&j95acc(S,k)}catch(e){return false}})());if(!near)return{err:"no place one khắc from the garden",pl:PLS()};
   S.place=near;placeWhere();agFlush();const R=agRec();if(!R)return{err:"no record"};
   const A=liveRivals(true).find(v=>v.alive&&!v.out&&!v.confined&&!sameHouse(S,v)&&(v.staff||[]).some(s=>s.role==="maid")&&R.P["v"+v.id]&&travel(palaceOf(v),"vuon")===DIST);if(!A)return{err:"no consort with a maid "+DIST};
   const s=A.staff.find(x=>x.role==="maid");s.loyal=100;A.rel=90;A.oan=0;const sid="s"+s.sid,aid="v"+A.id;
   const pinMaid=R2=>{if(!R2.P[sid]){R2.P[sid]=[0,1,2,3].map(()=>[null,"go",null,""]);R2.who[sid]=[s.name,"maid"]}for(let q=0;q<4;q++)if(R2.P[sid][q][1]!=="ag_tell")R2.P[sid][q]=["vuon","errand",null,""]};
   const pinA=R2=>{const mine=agZ().pend.some(x=>x.id===aid);if(mine)return;for(let q=0;q<4;q++)R2.P[aid][q]=[palaceOf(A),"rest",null,""]};
   pinMaid(R);pinA(R);const z=agZ();z.pend=z.pend.filter(x=>x.id!==aid);z.rq=[];pinA(R);
   const sv={keep:BAL.ag.kh2.rd.keep,quiet:BAL.ag.kh2.rd.quiet,slip:BAL.mind.slip,on:BAL.ag.kh2.rd.on,cap:BAL.ag.kh2.rd.cap};/* r2 #2: mode "go" makes EVERY servant in the garden tell (quiet ~0), so up to 8 masters heard in one khắc and the per-khắc cap (BAL.ag.kh2.rd.cap, a phone-perf knob, not under test here) pushed A's news one khắc on ~1 run in 20: the cap is lifted for the run */if(mode==="go")BAL.ag.kh2.rd.cap=1e9;
   BAL.ag.kh2.rd.keep=mode==="go"?.0001:sv.keep;BAL.ag.kh2.rd.quiet=mode==="quiet"?1e9:mode==="go"?.0001:sv.quiet;BAL.mind.slip=0;if(mode==="off")BAL.ag.kh2.rd.on=0;
   /* the maid is on an errand in the garden all buổi; A rests at home unless she re-decides (the record is rebuilt on every resync) */
   const rt0=agRdTick;agRdTick=function(){const R2=agRec();if(R2){pinMaid(R2);pinA(R2)}return rt0.apply(this,arguments)};
   const tl0=AGD.stat.tell||0;const T=[];/* r2 #2: rd / hr count A's OWN hearing and re-decide (agHeard on A); the global AGD.stat.rd / rdN also count another consort whose servant stood in the garden too (flake ~1 in 3) */let hrA=0,rdA=0;const hO=[];const ah0=agHeard;agHeard=function(v,info){const r=ah0.apply(this,arguments);if(v===A){hrA++;if(r)rdA++}else if(v&&v.id!=null)hO.push(v.id);return r};
   const snap=(lab)=>{const R2=agRec(),kh=agKh();let cnt=0;try{const C=j95counts(R2,kh);cnt=C&&C.vuon||0}catch(e){}T.push({k:kh,lab,me:R2.P.me[kh][0],maid:R2.P[sid]&&R2.P[sid][kh]?R2.P[sid][kh][1]:null,A:R2.P[aid][kh][0]+"/"+R2.P[aid][kh][1],Awhere:whereOf(A),told:(AGD.stat.tell||0)-tl0,rd:rdA,hr:hrA,oth:hO.length,cnt})};
   let got=null;try{AG.rdMe=null;snap("start");Q.length=0;/* r2 #2: a queued unrelated popup (e.g. the Emperor's garden stroll) made goTo a no-op ~1 run in 10, so she never walked in */goTo("vuon");if(S.place!=="vuon")throw new Error("she could not walk into the garden: "+S.place);j95sync();snap("entered");for(let i=0;i<3&&agKh()<3;i++){spend(1);j95sync();snap("next")}}catch(e){got=e.message+" "+(e.stack||"").split("\n")[1]}
   agRdTick=rt0;agHeard=ah0;Object.assign(BAL.ag.kh2.rd,{keep:sv.keep,quiet:sv.quiet,on:sv.on,cap:sv.cap});BAL.mind.slip=sv.slip;
   const deed=agZ().pend.find(x=>x.id===aid)||null;return{mode,DIST,T,got,deed:deed?{k:deed.k,kh:deed.kh,pl:deed.pl,t:deed.t}:null,near}};
  for(let i=0;i<RUNS;i++)out.runs.push(one("go"));out.far=[];for(let i=0;i<2;i++)out.far.push(one("go",2));out.quiet=one("quiet");out.off=one("off");
  /* B3 (review ag-all-2 r2): far news heard at the LAST khắc of an early buổi (her walk ends past the record) is kept: she re-plans next buổi (agTouch) */
  out.late=(()=>{fresh();placeWhere();agFlush();const z=agZ();const bo=S.buoi;const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined&&agRec().P["v"+v.id]);const mp=window.mindPick;
   for(const v of L){z.rp={};let pick=null;window.mindPick=(W)=>{const x=W.find(e=>typeof e[0]==="object"&&e[0].at);if(x){pick=x[0];x[0].at=()=>"vuon";return x[0]}return "keep"};
    let r;try{r=agHeard(v,{pl:"vuon",kh:J95.KH-1,why:"thử"})}finally{window.mindPick=mp}if(!pick)continue;return{r,touched:!!(z.rp||{})["v"+v.id],buoi:bo}}
   return{err:"no option"}})();
  /* 2 shared act with her */
  const sh=(ans)=>{fresh();placeWhere();agFlush();const R=agRec();const kh=agKh(),me=R.P.me[kh][0];
   for(const v of liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined&&!sameHouse(S,v)&&R.P["v"+v.id])){let N;try{N=agNeedsC(v)}catch(e){continue}const O=agOptsG(v,N,null).filter(o=>o.t===S&&!/^harm:/.test(o.k));/* a harm deed is covert (jagharm: no "comes to her" popup) */if(!O.length)continue;
    const o=O.slice().sort((a,b)=>agKhC(b,v)-agKhC(a,v))[0];/* prefer a deed of several khắc: still one khắc for the talk */const id="v"+v.id;const z=agZ();z.pend=z.pend.filter(x=>x.id!==id);for(let q=kh;q<R.P[id].length;q++){const e=R.P[id][q];if(e&&/^ag_/.test(e[1]||""))R.P[id][q]=[e[0],"rest",null,""]}/* r2 #2: her own deeds just taken off the list leave their painted rows too (else B7 counted her OWN earlier "call" over 4 khắc, ~1 run in 15) */agPlan(v,o,N,kh,me);const pd=z.pend[z.pend.length-1];agSpan(pd,o,v);
    Q.length=0;const k0=agKh();agWatch();const card=Q.find(x=>x.t==="Có người tìm đến");if(!card)return{err:"no popup",k:o.k,me};
    const names=(card.opts||[]).map(x=>x.n);const c=card.opts.find(x=>x.n===ans);c.go();Q.length=0;
    return{k:o.k,k0,k1:agK1(pd),after:agKh(),names,inPend:agZ().pend.includes(pd),drop:!!pd.drop,row:agRec().P[id][pd.kh][1],later:agRec().P[id].slice(agK1(pd)+1).filter(e=>e&&e[1]==="ag_"+o.k).length,lateD:agRec().P[id].slice(pd.kh+1).filter(e=>e&&e[1]==="ag_"+o.k).length}}
   return{err:"no NPC deed aimed at her"}};
  out.shRec=sh("Tiếp chuyện");out.shDec=sh("Không tiếp");
  /* 3 NPC ↔ NPC */
  {fresh();placeWhere();agFlush();const R=agRec();const kh=agKh();const L=liveRivals(true).filter(v=>v.alive&&!v.out&&!v.confined&&R.P["v"+v.id]);let o3={err:"no pair"};
   for(const a of L){let N;try{N=agNeedsC(a)}catch(e){continue}const O=agOptsG(a,N,null).filter(o=>o.t&&o.t!==S&&typeof o.t==="object"&&o.t.id!=null&&AGTALK.has(o.k));if(!O.length)continue;const o=O[0],t=o.t;const tid="v"+t.id;if(!R.P[tid])continue;
    const pl=R.P[tid][kh][0];const z=agZ();z.pend=z.pend.filter(x=>x.id!=="v"+a.id&&x.id!==tid);for(let q=0;q<4;q++)R.P[tid][q]=[pl,"rest",null,""];
    const sv=BAL.ag.kh2.sh.dec;BAL.ag.kh2.sh.dec=0;
    agPlan(a,o,N,kh,pl);let pd=z.pend[z.pend.length-1];agLand(pd);const rec=R.P[tid][kh][1];
    /* away: B stands elsewhere */
    for(let q=0;q<4;q++)R.P[tid][q]=[pl==="home"?"vuon":"home","rest",null,""];agPlan(a,o,N,kh,pl);pd=z.pend[z.pend.length-1];agLand(pd);const away={drop:!!pd.drop};
    BAL.ag.kh2.sh.dec=sv;o3={k:o.k,rec,away};break}
   out.npc=o3}
  out.errs=AGD.errs.concat(AG.errs).slice(0,5);out.stat={shMe:AGD.stat.shMe,shNo:AGD.stat.shNo,shNpc:AGD.stat.shNpc,shAway:AGD.stat.shAway,rdCap:AGD.stat.rdCap,rdLate:AGD.stat.rdLate};return out},RUNS);
 console.log(JSON.stringify(r).slice(0,3000));
 const G=r.runs.filter(x=>!x.err&&!x.got);
 console.log('KHẮC TIMELINE (run 1): '+(G[0]?G[0].T.map(t=>`k${t.k+1}[${t.lab}] me=${t.me} maid=${t.maid} A=${t.A} told=${t.told} rd=${t.rd} vuon#=${t.cnt}`).join(' | '):'-'));
 ok(G.length===r.runs.length&&G.length>0,'runs set up (she one walk-khắc from the garden, A one walk-khắc away)',r.runs.map(x=>x.err||x.got||'ok'));
 const at=(x,k)=>x.T.find(t=>t.k===k&&t.lab!=="start");
 /* A re-decides when she has a deed aimed at her she can pay for (else she keeps her plan, as the player would) */const W=G.filter(x=>x.T.some(t=>t.rd>0));
 ok(W.length>=1&&W.every(x=>{const a1=at(x,1),t=at(x,2);return a1&&a1.me==="vuon"&&a1.rd===0&&t&&t.told>=1&&t.rd>=1&&/\/go$/.test(t.A)}),/* rd ≥ 1: two of her people may tell A in the same khắc */'NEAR k2: she is in the garden, the maid sees her and walks to A (A not yet); k3: A hears at the start of k3, decides and walks (row "go")',G.map(x=>[at(x,1),at(x,2)]));
 ok(W.every(x=>{const t=at(x,3);return t&&t.A.split("/")[0]==="vuon"&&t.Awhere==="vuon"&&t.cnt>=1&&/^vuon\/(ag_|here$)/.test(t.A)/* an invite to her (cx3:invite2) shows her own "here" row once it meets her */&&(!x.deed||x.deed.kh===3&&x.deed.t==="me")}),'NEAR k4: A is in Ngự hoa viên (row, whereOf, Dư đồ count) with a deed aimed at her',G.map(x=>[at(x,3),x.deed]));
 const F=(r.far||[]).filter(x=>!x.err&&!x.got);console.log('FAR TIMELINE: '+(F[0]?F[0].T.map(t=>`k${t.k+1}[${t.lab}] maid=${t.maid} A=${t.A} told=${t.told} rd=${t.rd}`).join(' | '):JSON.stringify(r.far)));
 ok(F.length>=1&&F.every(x=>{const t=at(x,2);return t&&t.told>=1&&t.maid==="ag_tell"&&t.rd===0&&t.hr===0}),'FAR k3: the maid is still on the road to A (row "ag_tell"); A has not re-decided',F.map(x=>at(x,2)));
 ok(F.length>=1&&F.every(x=>{const t=at(x,3);return t&&t.hr>=1}),'FAR k4: A hears at the start of k4 (never before) and decides (her walk then must still fit the day: agFitDay)',F.map(x=>at(x,3)));
 ok(r.quiet&&!r.quiet.err&&r.quiet.T.every(t=>t.told===0&&t.rd===0),'a maid who keeps quiet → A never knows, keeps her plan',r.quiet&&(r.quiet.err||r.quiet.T));
 ok(r.off&&!r.off.err&&r.off.T.every(t=>t.rd===0),'switch off (BAL.ag.kh2.rd.on=0) → no re-decide',r.off&&(r.off.err||r.off.T));
 ok(r.shRec&&!r.shRec.err&&r.shRec.names.join()==="Tiếp chuyện,Không tiếp"&&r.shRec.after===r.shRec.k0+1&&!r.shRec.inPend,'shared act: Tiếp chuyện → the deed lands; the whole talk costs her exactly ONE khắc and both move to k+1 together',r.shRec);
 ok(r.late&&(r.late.err||r.late.buoi>=3||(r.late.r===0&&r.late.touched)),'B3 far news at the last khắc that fits the DAY is not dropped: she re-plans next buổi (agTouch)',r.late);
 ok(r.shRec&&!r.shRec.err&&r.shRec.later===0&&r.shDec&&!r.shDec.err&&r.shDec.lateD===0,'B7 a cut (Tiếp chuyện) or dropped (Không tiếp) deed leaves no later khắc painted with it',{rec:r.shRec&&r.shRec.later,dec:r.shDec&&r.shDec.lateD});
 ok(r.shDec&&!r.shDec.err&&r.shDec.after===r.shDec.k0&&r.shDec.drop&&/^ag_/.test(r.shDec.row||""),'shared act: Không tiếp → her khắc kept, the deed does not happen, the NPC\'s row keeps the khắc she spent coming',r.shDec);
 ok(r.npc&&!r.npc.err&&r.npc.rec==="ag_with"&&r.npc.away.drop,'NPC ↔ NPC: the met one, free there, holds the shared act (ag_with); away → the meeting deed drops',r.npc);
 ok(!errs.length&&!r.errs.length,'no page / agent errors',errs.concat(r.errs).slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
