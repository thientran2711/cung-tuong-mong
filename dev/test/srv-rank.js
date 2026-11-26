/* review/srv-rank (Foreman F s11b b851: maid road srv.rk flat at 4, no rise offer for ~400 buổi).
   ROOT: a maid's rung is capped by her master's rank (j14 srkMax, owner OD:L1149: master rank >= 7 -> Nữ quan, >= 4 -> Chưởng sự cô cô,
   else nhất đẳng). At the cap the only own road out, «Xin chủ cho đi hầu cung khác», was locked for a TRUSTED maid (Chủ tin >= BAL.sp.leaveLoyal),
   and «Xin chủ tiến cử» is locked at the cap, so a good maid under a low master stood still for years (the buy-out roll and the ma ma age
   are the only other exits). FIX = ONE rule spOutgrown (jpromsv, BAL.srvCap) for her AND every NPC servant (law 1): at the cap with full
   Công lao and a higher palace with room, the ask is open whatever her trust; a trusted servant who asks is let go more, demoted less.
   usage: node dev/test/srv-rank.js <URL> [label] [oldURL]   → PASS/FAIL rows; exit 1 on any FAIL (on LIVE the «open» rows FAIL = the bug) */
const {chromium}=require('playwright');
const [,,URL,LBL,OLD]=process.argv;/* OLD = optional LIVE URL: a maid life saved there (at her cap, trusted, Công lao full) loads here and has the open ask */
(async()=>{const b=await chromium.launch();const T=[];const ok=(c,n,x)=>T.push([c?'PASS':'FAIL',n,x==null?'':JSON.stringify(x).slice(0,300)]);const errs=[];
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block',reducedMotion:'reduce'});
 await ctx.addInitScript(()=>{window.__nlInner=1;window.__exAuto=1;window.__bot=1});
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 const r=await p.evaluate(()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;
  window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;render=()=>{};const out={};
  const room=v=>{const c=capOf(v),h=hhHas(v);return h[0]<c[0]};
  /* a low master (rank < 4 → cap nhất đẳng) and a higher palace with room */
  const L=liveRivals(true);let m=srvM();const lo=L.find(v=>rkOf(v)<4);if(lo&&lo!==m){srvReassign("test",lo);m=srvM()}
  m.rank=Math.min(rkOf(m),2);let hi=L.find(v=>v!==m&&rkOf(v)>=4&&room(v));if(!hi){hi=L.find(v=>v!==m);hi.rank=5;hi.staff=(hi.staff||[]).filter(s=>s.role!=="maid")}
  const cap=srvMax();S.srv.lau=0;S.srv.lvCd=0;S.srv.rk=cap;S.srv.mp=srvMpNeed(cap);S.tin=80;
  const leave=()=>srvTalk({kind:"srv",sk:"mis"}).find(x=>x.n==="Xin chủ cho đi hầu cung khác");
  out.has=typeof spOutgrown==="function";out.cap=cap;out.mrk=rkOf(m);out.hi=hi&&rkOf(hi);
  out.open=!leave().lock;
  S.srv.mp=srvMpNeed(cap)-1;out.openShort=!leave().lock;S.srv.mp=srvMpNeed(cap);
  S.srv.rk=cap-1;out.openBelow=!leave().lock;S.srv.rk=cap;
  S.tin=40;out.openLow=!leave().lock;S.tin=80;
  /* the master's answers for a trusted maid who outgrew the house (agent mindPick, N tries, state restored each time) */
  const N=120,cnt={let:0,keep:0,demote:0,other:0},snap={mid:S.srv.mid,rk:S.srv.rk,mp:S.srv.mp,tin:S.tin,bac:S.bac,place:S.place};let capAfter=[];
  for(let i=0;i<N;i++){Object.assign(S.srv,{mid:snap.mid,rk:snap.rk,mp:snap.mp,lvCd:0,sent:null});S.tin=snap.tin;S.bac=snap.bac;Q.length=0;
   try{spAsk(srvM(),S)}catch(e){cnt.err=(cnt.err||"")+e.message.slice(0,80)}
   if(S.srv.mid!==snap.mid){cnt.let++;capAfter.push(srvMax())}else if(S.srv.rk<snap.rk)cnt.demote++;else if(S.bac>snap.bac||S.tin>snap.tin)cnt.keep++;else cnt.other++}
  Object.assign(S.srv,{mid:snap.mid,rk:snap.rk,mp:snap.mp,lvCd:0});S.tin=snap.tin;S.bac=snap.bac;
  out.ans=cnt;out.capAfter=capAfter.length?Math.min(...capAfter):null;
  /* after a move to the higher house: the next months raise her (exam gate auto) */
  const v=spGoTo(srvM(),{role:"maid",rk:S.srv.rk});out.v=!!v;
  if(v){srvReassign("test move",v);const rk0=S.srv.rk;S.tin=80;out.exOffer=null;for(let k=0;k<12&&S.srv.rk===rk0&&!S.dead;k++){Q.length=0;S.tin=Math.max(S.tin,60);try{srvMonth()}catch(e){out.mErr=e.message.slice(0,120);break}
    if(S.srv.rk===rk0&&S.srv.ex&&S.srv.ex.to===rk0+1){if(out.exOffer==null)out.exOffer=k+1;try{exSrvStart()}catch(e){}}}out.rose=S.srv.rk>rk0;out.rkAfter=S.srv.rk;out.mrkAfter=rkOf(srvM())}
  /* NPC parity (law 1): an NPC maid at her master's cap with full Công lao and high loyalty has the same ask */
  let s=null,o=null;for(const x of liveRivals(true)){if(rkOf(x)>=4)continue;const st=(x.staff||[]).find(y=>y.role==="maid"&&!y.coop);if(st){s=st;o=x;break}}
  if(s){s.rk=srkMax(o,s);s.mp=srvMpNeed(s.rk);s.loyal=85;s.lvCd=0;if(!spGoTo(o,s)){hi.rank=Math.max(rkOf(hi),5)}
   out.npcOut=typeof spOutgrown==="function"?spOutgrown(o,s):null;
   try{const O=asOpts(s);out.npcLeave=O.some(z=>z.sk==="leave");out.npcIds=O.map(z=>z.sk).slice(0,20)}catch(e){out.npcErr=e.message.slice(0,120)}
   s.loyal=85;s.mp=0;try{out.npcLeaveShort=asOpts(s).some(z=>z.sk==="leave")}catch(e){}}
  else out.npcNone=1;
  /* save / load round trip */
  try{const j=JSON.stringify(ser());deser(JSON.parse(j));out.load=isSrv();try{srvMonth()}catch(e){out.loadErr=e.message.slice(0,120)}}catch(e){out.loadErr=e.message.slice(0,120)}
  return out});
 ok(r.has,'spOutgrown exists (one rule, jpromsv)',r.has);
 ok(r.open,`trusted maid at the cap (${r.cap}, master rank ${r.mrk}) with full Công lao and a higher palace with room: «Xin chủ cho đi hầu cung khác» OPEN`,{open:r.open,hi:r.hi});
 ok(!r.openShort,'same, Công lao not full: locked (trusted)',r.openShort);
 ok(!r.openBelow,'same, below the cap: locked (trusted; she still rises here)',r.openBelow);
 ok(r.openLow,'Chủ tin under BAL.sp.leaveLoyal: open as before',r.openLow);
 ok(r.ans&&r.ans.let>0&&r.ans.let>=r.ans.demote,'master answers for a trusted maid who outgrew the house: let >= demote, let > 0',r.ans);
 ok(r.capAfter==null||r.capAfter>r.cap,'every «Cho đi» lands in a house with a higher cap',{cap:r.cap,capAfter:r.capAfter});
 ok(r.v&&r.exOffer!=null&&r.exOffer<=3,'after the move the next rung opens: the Nội vụ phủ exam is offered within 3 months',{v:r.v,exOffer:r.exOffer,err:r.mErr});
 ok(r.v&&r.rose,'after the move she rises within 12 months (exam at its BAL odds, sat each window)',{rose:r.rose,rk:r.rkAfter,mrk:r.mrkAfter});
 ok(r.npcNone||r.npcLeave,'NPC parity: an NPC maid at her cap, full Công lao, loyalty 85 may ask to leave (asOpts «leave»)',{out:r.npcOut,leave:r.npcLeave,ids:r.npcIds,err:r.npcErr,none:r.npcNone});
 ok(r.npcNone||!r.npcLeaveShort,'NPC parity: same NPC maid without full Công lao: no ask',r.npcLeaveShort);
 ok(r.load&&!r.loadErr,'save / load round trip + one month',{load:r.load,err:r.loadErr});
 if(OLD){const c2=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});await c2.addInitScript(()=>{window.__nlInner=1;window.__bot=1});const q=await c2.newPage();
  await q.goto(OLD,{waitUntil:'domcontentloaded',timeout:0});await q.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await q.waitForTimeout(1000);
  const sv=await q.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__forceOrigin="cnv";for(let i=0;i<20;i++){start();if(isSrv())break}Q.length=0;render=()=>{};
   const L=liveRivals(true);const lo=L.find(v=>rkOf(v)<4&&!v.queen);if(lo&&lo!==srvM())srvReassign("old",lo);Q.length=0;S.srv.rk=srvMax();S.srv.mp=srvMpNeed(S.srv.rk);S.tin=80;S.srv.lvCd=0;return JSON.stringify(ser())});await c2.close();
  const o=await p.evaluate(j=>{try{deser(JSON.parse(j));Q.length=0;const lv=srvTalk({kind:"srv",sk:"mis"}).find(x=>x.n==="Xin chủ cho đi hầu cung khác");const og=spOutgrown(srvM(),S);let e2=null;try{srvMonth()}catch(e){e2=e.message.slice(0,120)}return{srv:isSrv(),open:lv&&!lv.lock,og,e2}}catch(e){return{err:e.message.slice(0,150)}}},sv);
  ok(o.srv&&!o.err&&!o.e2,'OLD SAVE (LIVE maid at her cap) loads here and plays a month',o);ok(o.open===o.og,'OLD SAVE: the ask follows the one rule (open iff outgrown)',o)}
 ok(!errs.length,'no page errors',errs.slice(0,3));
 console.log(`# srv-rank ${LBL||URL}`);for(const t of T)console.log(t.join(' | '));const f=T.filter(t=>t[0]==='FAIL').length;console.log(`${T.length-f}/${T.length} PASS`);
 await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
