/* night-coop-park — REWRITTEN for the co-op UNPARK (MAIN ROOT-82 20/11 22:58Z on the owner's 20/11 ~21:30Z rule «phải chạy được trên cả hai bản»):
   a co-op room runs the NEW night (jnf) — flip at the END of tối, the 10-second choice, ONE host resolve, relayed to the guest (ctm-nf
   open / fin). Only a THIN part-E room (Foreman B's coop-thin, dev flag: COOPW.thin.on(5)) stays parked on the live night (jfe). A life that
   joins or leaves a room mid-week must never hang, and never gets a second flip.
   The room is a local stub (no Worker): COOPW.on + base + COOP.state open/peer online, seat a (host), COOP.send recorded; after each week end
   the stub "merges" (CW.pend=false). The real two-seat room is coop-steal.js / coop-night.js / coop-e2e.js.
   usage: node dev/test/night-coop-park.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function'&&typeof nfParked==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={sent:[],thin0:COOPW.thin};BAL.visit.cap=0;
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   T.room(false);for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;
   liveRivals(false).forEach(v=>{v.preg=0})};
  /* the room stub */
  const s0=COOP.send;COOP.send=m=>{T.sent.push(m)};
  T.room=(on,thin)=>{const W=COOPW;W.on=on;W.thin=thin?{on:n=>n<=5}:T.thin0;if(on){W.seat="a";W.base=W.base||{};W.pend=false;W.sent=-1;W.p2=false;W.hold=null;COOP.state=Object.assign(COOP.state||{},{status:"open",peerOnline:true,ended:{}})}};
  T.drain=(max=80)=>{for(let n=0;n<max&&Q.length;n++){const m=Q[0];const o=m.opts||m.o;
    if(o&&o.length){let i=m.pid==="nfch"?o.findIndex(x=>x.n==="Thôi"):o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=0;try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}};
  T.noCyc=()=>{S.cyb=Object.assign(S.cyb||{},{lie:wk(),rk:wk(),rv:"lui"})};
  T.toEvening=()=>{let g=0;T.noCyc();while((S.buoi||0)<B4L&&g++<8){T.drain();used=4;nextBuoi()}T.drain()};
  /* one day end: the press at the end of tối, then (room) the stub merge; never more than 12 presses */
  T.endDay=()=>{const d=wk();T.noCyc();let n=0;for(;n<12&&wk()===d;n++){T.drain();S.toMorning=0;used=4;S.buoi=B4L;if(COOPW.on){endTurn();COOPW.pend=false}else nextBuoi()}T.drain();return{moved:wk()!==d,presses:n}};
  T.lists=()=>({rv:RVGRP.some(g=>g[1].includes("steal")&&g[1].includes("road")),bands:BANDS.some(g=>(g[2]||[]).includes("steal")&&(g[2]||[]).includes("road"))});
  T.deck=()=>{try{deal()}catch(e){}const n=(typeof deck!=="undefined"?deck:[]).map(a=>a&&a.n);return n.includes("Tranh sủng")&&n.includes("Chặn ngự giá")};
 });
 const R={};const ok=(k,c,info)=>{R[k]={pass:!!c,info}};
 /* 1. solo: the new flow (gate open), lists without the two acts */
 let r=await p.evaluate(()=>{T.fresh();render();const a={on:nfOn(),park:nfParked()};Object.assign(a,T.lists());a.okS=ACT.steal.ok(S,liveRivals(true)[0]);return a});
 ok("1 solo: nfOn, the two acts in no list",r.on&&!r.park&&!r.rv&&!r.bands&&!r.okS,r);
 /* 2. a PLAYER room on (host seat): the NEW night — gate open, the two acts in no list, no flip during tối (tablet waits, S.nfP), the flip at
    the END of tối opens the choice (nfch) on the host and relays {open} then {fin} to the guest (ctm-nf, mode h); one record; the week moves */
 r=await p.evaluate(()=>{T.fresh();T.room(true);render();T.sent.length=0;const a={on:nfOn(),park:nfParked()};Object.assign(a,T.lists());a.okS=ACT.steal.ok(S,liveRivals(true)[0]);
  const d=wk();T.toEvening();a.waits=S.nfP===d&&S.nfF!==d&&!(S.nightWhy&&S.nightWhy.wk===d);a.ton0=S.tonight==null;
  T.noCyc();S.toMorning=0;used=4;S.buoi=B4L;let seen=0;const sm=showModal;showModal=function(){if(Q[0]&&Q[0].pid==="nfch")seen++;return sm.apply(this,arguments)};
  /* one press at the end of tối: the flip + (a card turned) the choice */
  try{endTurn()}finally{}a.flipped=S.nfF===d;a.x=S.nfX&&S.nfX.d===d?{st:S.nfX.st,t:S.nfX.t,role:S.nfX.role}:null;a.nfch=Q.some(m=>m.pid==="nfch")||seen>0;
  const n0=(S.nights||0)+liveRivals(false).reduce((s,v)=>s+(v.nights||0),0);
  const e=T.endDay();showModal=sm;a.moved=e.moved;a.presses=e.presses;a.done=!!(S.nfX&&S.nfX.d===d&&S.nfX.st==="done");
  const n1=(S.nights||0)+liveRivals(false).reduce((s,v)=>s+(v.nights||0),0);a.rec=n1-n0;
  a.msgs=T.sent.filter(m=>m&&m.k==="ctm-nf"&&m.d===d).map(m=>({ph:m.ph,open:m.open,fin:m.fin,mode:m.mode}));T.room(false);render();return a});
 {const card=r.x&&r.x.t!=null;const relOpen=r.msgs.some(m=>m.mode==="h"&&m.open),relFin=r.msgs.some(m=>m.mode==="h"&&m.fin);
  ok("2 player room on: the NEW night on the host — no flip during tối, flip at the end, choice (a card turned), relay open + fin, ≤1 record, the week moves",
   r.on&&!r.park&&!r.rv&&!r.bands&&!r.okS&&r.waits&&r.ton0&&r.flipped&&(!card||(r.nfch&&relOpen))&&relFin&&r.done&&r.moved&&r.rec<=1,r)}
 /* 3. a THIN part-E room (Foreman B's coop-thin, COOPW.thin.on(5); jcoopthin is not in this build, so the level is a stub) stays PARKED at the
    ONE gate: nfOn false, the two acts back in the live lists, no jnf relay message, no jnf choice / record of its own; the day still moves */
 r=await p.evaluate(()=>{T.fresh();T.room(true,true);render();T.sent.length=0;const a={on:nfOn(),park:nfParked()};Object.assign(a,T.lists());
  const d=wk();T.toEvening();a.nfch=Q.some(m=>m.pid==="nfch");
  {const t0=S.tonight;S.tonight=t0&&t0!=="me"?t0:liveRivals(true)[0];a.deck=T.deck();S.tonight=t0}
  const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.nfX=!!(S.nfX&&S.nfX.d===d);a.nfMsg=T.sent.filter(m=>m&&m.k==="ctm-nf").length;T.room(false);render();return a});
 ok("3 thin part-E room: parked at the gate — live lists + steal cards, no jnf relay / choice, the week moves",!r.on&&r.park&&r.rv&&r.bands&&!r.nfch&&r.deck&&r.moved&&!r.nfX&&r.nfMsg===0,r);
 /* 4. solo → joins a player room in tối (tablet still waiting, S.nfP): it keeps waiting, ONE flip at the end of tối, the day moves */
 r=await p.evaluate(()=>{T.fresh();const d=wk();T.toEvening();const a={nfP:S.nfP===d,ton0:S.tonight==null};T.room(true);render();T.drain();
  a.still=S.nfP===d&&S.nfF!==d;const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.flipped=S.nfF===d||!!(S.nightWhy&&S.nightWhy.wk===d);a.done=!!(S.nfX&&S.nfX.d===d&&S.nfX.st==="done");T.room(false);render();return a});
 ok("4 solo → player room mid-day: the tablet still waits, one flip at the end of tối, the day moves",r.nfP&&r.ton0&&r.still&&r.flipped&&r.done&&r.moved,r);
 /* 5. a thin-E room → solo in tối: jnf takes the night over — at most ONE flip of the day (an earlier live flip is never turned again),
    the choice resolves, ≤1 record, the day moves */
 r=await p.evaluate(()=>{T.fresh();T.room(true,true);render();const d=wk();T.toEvening();const w0=S.nightWhy&&S.nightWhy.wk===d?JSON.stringify([S.nightWhy.wk,S.nightWhy.flip0]):null;
  const n0=(S.nights||0)+liveRivals(false).reduce((s,v)=>s+(v.nights||0),0);
  T.room(false);render();const a={on:nfOn()};
  const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.w0=w0;a.w1=S.nightWhy&&S.nightWhy.wk===d?JSON.stringify([S.nightWhy.wk,S.nightWhy.flip0]):null;a.sameFlip=!w0||a.w1===w0;a.flipped=S.nfF===d||!!a.w1;
  const n1=(S.nights||0)+liveRivals(false).reduce((s,v)=>s+(v.nights||0),0);a.rec=n1-n0;a.done=!!(S.nfX&&S.nfX.d===d&&S.nfX.st==="done");Object.assign(a,T.lists());return a});
 ok("5 thin-E room → solo mid-day: one flip at most (never a second), the choice resolves, ≤1 record, the day moves",r.on&&r.flipped&&r.moved&&r.sameFlip&&r.rec<=1&&r.done&&!r.rv&&!r.bands,r);
 /* 6. the solo choice is OPEN, then a player room comes on: the same choice finishes (one resolve), the day ends, no hang */
 r=await p.evaluate(()=>{T.fresh();const d=wk();T.toEvening();T.noCyc();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi();const a={open:Q.some(m=>m.pid==="nfch")||!!(S.nfX&&S.nfX.d===d)};
  T.room(true);render();const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.left=Q.length;a.done=!!(S.nfX&&S.nfX.d===d&&S.nfX.st==="done");T.room(false);render();return a});
 ok("6 solo choice open → player room on: the choice finishes, the day ends, no hang",r.open&&r.moved&&r.done,r);
 /* 7. switch at every day boundary between solo / player room / thin-E room (9 days): never stuck */
 r=await p.evaluate(()=>{T.fresh();const L=[];for(let w=0;w<9;w++){T.room(w%3!==0,w%3===2);render();const d=wk();T.toEvening();const e=T.endDay();L.push(e.moved?1:0)}T.room(false);render();return{L,all:L.every(x=>x)}});
 ok("7 switch solo / room / thin-E at every day boundary (9 days): never stuck",r.all,r);
 const out={R,errs};console.log(JSON.stringify(out,null,1));const bad=Object.values(R).filter(x=>!x.pass).length;
 console.log(bad||errs.length?`FAIL ${bad} (errors ${errs.length})`:`ALL OK ${Object.keys(R).length}/${Object.keys(R).length}`);await b.close();process.exit(bad||errs.length?1:0)})();
