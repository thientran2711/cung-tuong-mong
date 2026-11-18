/* night-final fix F1 (Foreman D #8, 17/11; review-night-final-r1 F1): the new night flow is SOLO only until coop-thin E. While a co-op room is
   on (COOPW.on) jnf's ONE gate nfParked() closes nfOn() and every jnf entry point falls back to the live night (jfe start-of-tối flip, the two
   Tranh sủng / Chặn ngự giá deck cards + person menu + NPC bands, jsteal's own stealPass, live commit, no relay message). A life that joins or
   leaves a room mid-week must never hang.
   The room is a local stub (no Worker): COOPW.on + base + COOP.state open/peer online, seat a (host), COOP.send recorded; after each week end
   the stub "merges" (CW.pend=false). The real two-seat room is coop-e2e.js / coop-night.js.
   usage: node dev/test/night-coop-park.js <url>   (exit 0 = all pass) */
const {chromium}=require('playwright');const [,,URL]=process.argv;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function'&&typeof nfParked==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={sent:[]};BAL.visit.cap=0;
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   T.room(false);for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null;
   liveRivals(false).forEach(v=>{v.preg=0})};
  /* the room stub */
  const s0=COOP.send;COOP.send=m=>{T.sent.push(m)};
  T.room=on=>{const W=COOPW;W.on=on;if(on){W.seat="a";W.base=W.base||{};W.pend=false;W.sent=-1;W.p2=false;W.hold=null;COOP.state=Object.assign(COOP.state||{},{status:"open",peerOnline:true,ended:{}})}};
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
 /* 2. a room on: gate closed at the root, every list back (live), jflip not pending, no jnf relay message; the flip at the START of tối (jfe, live); the deck has both cards in tối */
 r=await p.evaluate(()=>{T.fresh();T.room(true);render();T.sent.length=0;const a={on:nfOn(),park:nfParked()};Object.assign(a,T.lists());
  const d=wk();T.toEvening();a.tonight=!!S.tonight;a.flipped=S.nfF===d||!!(S.nightWhy&&S.nightWhy.wk===d);a.nfch=Q.some(m=>m.pid==="nfch");
  {const t0=S.tonight;S.tonight=t0&&t0!=="me"?t0:liveRivals(true)[0];a.deck=T.deck();S.tonight=t0}   /* the cards need an NPC holder (a night may also be nobody's / hers) */
  const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.nfX=!!(S.nfX&&S.nfX.d===d);a.nfMsg=T.sent.filter(m=>m&&m.k==="ctm-nf").length;T.room(false);render();return a});
 ok("2 room on: live night — flip at the start of tối, steal cards, the week moves, no jnf relay",!r.on&&r.park&&r.rv&&r.bands&&r.flipped&&!r.nfch&&r.deck&&r.moved&&!r.nfX&&r.nfMsg===0,r);
 /* 3. solo → joins a room in tối (tablet still waiting, jnf S.nfP): jfe turns it at once, the day ends the live way, no hang */
 r=await p.evaluate(async()=>{T.fresh();const d=wk();T.toEvening();const a={nfP:S.nfP===d,ton0:S.tonight==null};T.room(true);render();await new Promise(z=>setTimeout(z,50));T.drain();
  a.flipped=S.nfF===d;a.tonight=!!S.tonight;a.nw=S.nightWhy&&S.nightWhy.wk===d?{pick:S.nightWhy.pick,cause:S.nightWhy.cause}:null;const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.nfch=Q.some(m=>m.pid==="nfch");T.room(false);render();return a});
 ok("3 solo → room mid-day: waiting tablet turned by jfe, live day end, no hang",r.nfP&&r.ton0&&r.flipped&&r.moved&&!r.nfch,r);
 /* 4. a room → solo in tối (the room's flip already made): jnf never turns it again; the flip choice opens for that pick; one record; the day moves */
 r=await p.evaluate(()=>{T.fresh();T.room(true);render();const d=wk();T.toEvening();const w0=S.nightWhy?JSON.stringify([S.nightWhy.wk,S.nightWhy.flip0]):null;const t0=S.tonight==="me"?"me":S.tonight&&S.tonight.id;
  const n0=(S.nights||0)+liveRivals(false).reduce((s,v)=>s+(v.nights||0),0);
  T.room(false);render();const a={on:nfOn(),flipped:S.nfF===d||!!(S.nightWhy&&S.nightWhy.wk===d)};
  const cf=[];const f0=window.cfPlay;let nfch=0;const sm=showModal;showModal=function(){if(Q[0]&&Q[0].pid==="nfch")nfch++;return sm.apply(this,arguments)};
  const e=T.endDay();showModal=sm;a.moved=e.moved;a.presses=e.presses;a.sameFlip=(S.nightWhy&&S.nightWhy.wk===d?JSON.stringify([S.nightWhy.wk,S.nightWhy.flip0]):w0)===w0;
  const n1=(S.nights||0)+liveRivals(false).reduce((s,v)=>s+(v.nights||0),0);a.rec=n1-n0;a.t0=t0;a.done=!!(S.nfX&&S.nfX.d===d&&S.nfX.st==="done");Object.assign(a,T.lists());return a});
 ok("4 room → solo mid-day: no second flip, the choice resolves, ≤1 record, the day moves",r.on&&r.flipped&&r.moved&&r.sameFlip&&r.rec<=1&&r.done&&!r.rv&&!r.bands,r);
 /* 5. the room leaves while the flip choice is OPEN (solo end of tối): the live path takes over, the day ends, no hang */
 r=await p.evaluate(()=>{T.fresh();const d=wk();T.toEvening();S.toMorning=0;used=4;S.buoi=B4L;nextBuoi();const a={open:Q.some(m=>m.pid==="nfch")||!!(S.nfX&&S.nfX.d===d)};
  T.room(true);render();const e=T.endDay();a.moved=e.moved;a.presses=e.presses;a.left=Q.length;T.room(false);render();return a});
 ok("5 solo choice open → room on: live day end, no hang",r.open&&r.moved,r);
 /* 6. three more weeks each way, switching at every week boundary: never stuck */
 r=await p.evaluate(()=>{T.fresh();const L=[];for(let w=0;w<6;w++){T.room(w%2===1);render();const d=wk();T.toEvening();const e=T.endDay();L.push(e.moved?1:0)}T.room(false);render();return{L,all:L.every(x=>x)}});
 ok("6 switch at every day boundary (6 days): never stuck",r.all,r);
 const out={R,errs};console.log(JSON.stringify(out,null,1));const bad=Object.values(R).filter(x=>!x.pass).length;
 console.log(bad||errs.length?`FAIL ${bad} (errors ${errs.length})`:`ALL OK ${Object.keys(R).length}/${Object.keys(R).length}`);await b.close();process.exit(bad||errs.length?1:0)})();
