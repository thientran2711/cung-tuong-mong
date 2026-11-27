/* promo-root3 (26/11): «the exam road was taken 24× and her rank never moved» (robot s11b, LIVE 6b5d3d05).
   usage: GAME=<index.html> node dev/test/promo-root3.js
   Every rank-up road, through the real game code, then a save → load round trip (a rank written to a copy / reset on load would show here):
   (1) consort exam card → real runOpt → exStart (no #ov → exSimC) forced to PASS → S.rank +1 (exDone → promoteP);
   (2) consort exam played in the kit board (#kg82) and LEFT mid-way («Quay lại» / ✕ closes the board): the pending exam is settled by exTick
       (exAbort, skipped rounds at her level) — never stuck, never a lost result; forced pass → S.rank +1;
   (3) passed exam with a FULL seat waits, then the month's promoteP raises her once the seat frees;
   (4) cung nữ exam «Khảo hạch Nội vụ phủ» (exSrvStart) forced to PASS → S.srv.rk +1 and the «Thăng bậc» card; S.rank stays 0 BY DESIGN
       (a maid has no consort rank) → a harness that reads S.rank only sees «rank 0» for the whole maid life;
   (5) cung nữ board left mid-way → exSrvTick settles it;
   (6) grace exam (son/daughter: exGrace → exGraceUp), direct roads (exDirectUp / promoReward «emp»), seat-contest win (promoteP with __seatPick),
       maid raised to Đáp ứng (srvRise): each raises the rank and the rank survives save → load. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const GAME=process.env.GAME||path.join(__dirname,'..','..','index.html');let bad=0;const ok=(c,t)=>{console.log((c?'ok   ':'BAD  ')+t);if(!c)bad++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});
 await ctx.addInitScript(`window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};HTMLElement.prototype.focus=function(){};`);
 const page=await ctx.newPage();await page.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());const errs=[];page.on('pageerror',e=>errs.push(e.message));
 await page.goto('file://'+GAME);await page.waitForTimeout(500);await page.evaluate(()=>localStorage.clear());await page.reload();await page.waitForTimeout(500);
 await page.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await page.waitForTimeout(800);
 /* helpers in the page: a fresh consort life at rank r with every gate met; force the exam result; save → load */
 await page.evaluate(()=>{window.__hhStop=1;
  window.T3={
   consort(r){quiet=true;localStorage.clear();window.__forceOrigin='tt';start();quiet=false;Q.length=0;if(typeof isSrv==='function'&&isSrv()){S.srv.risen=1}
    S.out=0;S.confined=0;S.dead=false;S.rank=r;S.sung=100;S.danh=100;S.th=60;S.hh=90;S.duc=100;S.suc=100;S.lastPromo=-99;S.turn=Math.max(S.turn||0,24);S.ex=null;S.exV=1;
    const q=queenP&&queenP();if(q&&q!==S){q.hh=q.hh}for(const v of liveRivals(true)){if(v.rank===r+1&&SEATCAP[r+1]!=null)v.rank=Math.max(0,r)}},
   maid(){quiet=true;localStorage.clear();window.__forceOrigin='tt';start();quiet=false;Q.length=0;if(!isSrv())srvInit();S.srv.risen=0;S.srv.lau=0;S.tin=100;S.srv.rk=1;S.srv.mp=srvMpNeed(1);S.srv.ex={};},
   forcePass(fn){const e0=exScore;exScore=function(){const r=e0.apply(this,arguments);r.pass=true;r.total=Math.max(r.total,arguments[0].bar);return r};
    const c0=window.capRes;if(typeof capRes==='function')capRes=(x)=>true;try{return fn()}finally{exScore=e0;if(c0)capRes=c0}},
   reload(){const d=JSON.parse(JSON.stringify(ser()));deser(d);return {rank:S.rank,srk:S.srv&&S.srv.rk}}};
 });
 /* (1) consort exam through the act card, no board */
 let R=await page.evaluate(()=>{T3.consort(1);const e=exS(S);const el=exElig(S);const ov=document.getElementById('ov');let ovp=null;if(ov){ovp=ov.parentNode;ov.remove()}
  try{exTick();const card=(deck||[]).find(a=>a&&a.exam===1)||exCard();T3.forcePass(()=>runOpt(card))}finally{if(ovp)ovp.appendChild(ov)}
  const r1=S.rank;const rr=T3.reload();return {el,r1,after:rr.rank,pass:!!(S.ex&&S.ex.pass)}});
 ok(R.el&&R.r1===2&&R.after===2,`(1) consort Thường tại → exam card PASS → rank ${R.r1} (want 2), after save/load ${R.after} (eligible ${R.el})`);
 /* (2) consort exam in the board, board closed mid-way, settled by exTick */
 R=await page.evaluate(async()=>{T3.consort(1);exTick();exStart();const opened=!!document.getElementById('kg82');const pend=!!(S.ex&&S.ex.pend);
  try{kg82Close()}catch(e){const k=document.getElementById('kg82');if(k)k.remove()}
  T3.forcePass(()=>exTick());const r=S.rank;const rr=T3.reload();return {opened,pend,r,after:rr.rank,pendLeft:!!(S.ex&&S.ex.pend)}});
 ok(R.opened&&R.pend&&R.r===2&&R.after===2&&!R.pendLeft,`(2) consort board left mid-way → exTick settles it → rank ${R.r} (want 2), after load ${R.after} (board ${R.opened}, pend ${R.pend}→${R.pendLeft})`);
 /* (3) passed exam, full seat → waits, then the month's promoteP raises her once a seat frees */
 R=await page.evaluate(()=>{T3.consort(3);const to=4,cap=SEATCAP[to];const L=liveRivals(true).filter(v=>v!==S);let k=0;const moved=[];
  for(const v of L){if(cap==null)break;if(holders(to).length>=cap)break;moved.push([v,v.rank]);v.rank=to;k++}
  const full=cap!=null&&!seatFree(to);const ov=document.getElementById('ov');let ovp=null;if(ov){ovp=ov.parentNode;ov.remove()}
  try{exTick();T3.forcePass(()=>exStart())}finally{if(ovp)ovp.appendChild(ov)}const waitR=S.rank,passed=!!(S.ex&&S.ex.pass);
  for(const [v,r0] of moved)v.rank=r0;const t=promote();return {cap,full,waitR,passed,upR:S.rank,t:String(t).replace(/<[^>]+>/g,'').slice(0,60)}});
 ok(R.full&&R.waitR===3&&R.passed&&R.upR===4,`(3) full seat (cap ${R.cap}): passed, waits at rank ${R.waitR}; seat frees → promote() → rank ${R.upR} (want 4) «${R.t}»`);
 /* (4) cung nữ exam → S.srv.rk +1, «Thăng bậc», S.rank stays 0 */
 R=await page.evaluate(()=>{T3.maid();const mx=srvMax();const g=exSrvGate(2);const ov=document.getElementById('ov');let ovp=null;if(ov){ovp=ov.parentNode;ov.remove()}
  const card=(deck||[]).find(a=>a&&a.exam===2)||exSrvCard();try{T3.forcePass(()=>runOpt(card))}finally{if(ovp)ovp.appendChild(ov)}
  const th=Q.some(q=>q&&q.t==='Thăng bậc');const rk=S.srv.rk,rank=S.rank;const rr=T3.reload();return {mx,g,rk,rank,th,after:rr.srk,srv:isSrv()}});
 ok(R.g&&R.rk===2&&R.th&&R.after===2,`(4) cung nữ exam PASS → S.srv.rk ${R.rk} (want 2), «Thăng bậc» ${R.th}, after load ${R.after} (cap ${R.mx})`);
 ok(R.srv&&R.rank===0,`(4b) a maid's S.rank stays ${R.rank} by design (isSrv ${R.srv}): a harness that reads only S.rank logs «rank 0» for every maid life`);
 /* (5) cung nữ board left mid-way → exSrvTick settles */
 R=await page.evaluate(()=>{T3.maid();exSrvGate(2);exSrvStart();const opened=!!document.getElementById('kg82'),pend=!!S.srv.ex.pend;try{kg82Close()}catch(e){const k=document.getElementById('kg82');if(k)k.remove()}
  T3.forcePass(()=>exSrvTick());return {opened,pend,rk:S.srv.rk,left:!!(S.srv.ex&&S.srv.ex.pend)}});
 ok(R.opened&&R.pend&&R.rk===2&&!R.left,`(5) cung nữ board left mid-way → exSrvTick → S.srv.rk ${R.rk} (want 2)`);
 /* (6) the other rank-up roads, each then save → load */
 const road=async(tag,fn,want)=>{const o=await page.evaluate(`(()=>{try{${fn};const r=S.rank;const rr=T3.reload();return {r,after:rr.rank,srv:isSrv()}}catch(e){return {err:String(e&&e.message||e)}}})()`);
  ok(!o.err&&o.r===want&&o.after===want&&!o.srv,`(6) ${tag}: rank ${o.r} → after load ${o.after} (want ${want})${o.err?' ERR '+o.err:''}`)};
 await road('grace exam (son) exGrace → pass → promoteP → exGraceUp','T3.consort(1);exGrace(S,"m");const ov=document.getElementById("ov");let ovp=null;if(ov){ovp=ov.parentNode;ov.remove()}try{exTick();T3.forcePass(()=>exStart())}finally{if(ovp)ovp.appendChild(ov)}',2);
 await road('direct road exDirectUp (story arc)','T3.consort(1);exDirectUp(S,"x")',2);
 await road('reign road promoReward «emp»','T3.consort(1);promoReward(S,"emp")',2);
 await road('first son promoReward «son1»','T3.consort(1);promoReward(S,"son1")',2);
 await road('seat contest win (promoteP with __seatPick)','T3.consort(1);S.ex={to:2,pass:true};window.__seatPick=1;try{promoteP(S)}finally{window.__seatPick=0}',2);
 await road('maid raised to Đáp ứng (srvRise)','T3.maid();S.age=Math.max(S.age||0,BAL.ageMin);const rf=roomFor;roomFor=()=>true;try{srvRise("x")}finally{roomFor=rf}',0);
 ok(!errs.length,`no page errors (${errs.slice(0,3).join(' | ')})`);
 console.log(bad?`promo-root3: ${bad} BAD`:'promo-root3: PASS');await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
