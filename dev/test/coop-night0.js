/* coop-night0 — ONE night path for a co-op room (review/coop-night0, rv 4jNDqKuC root, LAW 11).
   Bug (LIVE 24980875): host = cung nữ (isSrv: her night = the live servant path, jcoopworld tnRelay) + guest = phi tần (jnf on): the guest
   asked «which word for day 0?» every 400 ms, the host's jnf act listener returned on !nfOn() → guest «night 0» for ever, host «Chờ hảo hữu…».
   Fix (jnf.js roomOff, one place): in a room jnf runs only while BOTH seats live in the palace, read from the room's shared world
   COOPW.base.P (a cung nữ not risen, the tiểu thư at home, a dead seat = off) — the same answer on both phones; else both play the live night.
   Part 1 (always, no Worker): a local room stub on one page — every seat state × both seats → nfOn / nfRoomOff, plus a host day end with a
   cung-nữ friend (no jnf choice opened, the day moves).
   Part 2 (NIGHT0_E2E != 0): the real two-seat room, coop-e2e.js (its clear() = THE helper dev/test/lib/coop-clear.js where landed) with the
   origin pairs pinned, COOP_WEEKS=1 (NIGHT0_WEEKS): cnv/tt (the repro: LIVE 114/138 STUCK) and tt/cnv (two-way). NIGHT0_PAIRS="cnv:tt,tt:cnv".
   usage: python3 dev/build/assemble.py && node dev/test/coop-night0.js <url-of-dev/index.html> [outdir]   (exit 0 = all pass) */
const {chromium}=require('playwright');const path=require('path'),fs=require('fs');const {spawnSync}=require('child_process');
const [,,URL,OUTA]=process.argv;const OUT=path.resolve(OUTA||path.join(__dirname,'../shots/coop-night0'));fs.mkdirSync(OUT,{recursive:true});
const R=[];const ok=(k,c,info)=>{R.push([!!c,k]);console.log((c?'ok  ':'FAIL')+' '+k+(c?'':' '+JSON.stringify(info)))};
(async()=>{
 const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});
 await p.waitForFunction(()=>typeof start==='function'&&typeof nfOn==='function'&&typeof nfRoomOff==='function',null,{timeout:0});await p.waitForTimeout(2000);
 await p.evaluate(()=>{window.T={sent:[]};BAL.visit.cap=0;
  COOP.send=m=>{T.sent.push(m)};
  T.fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   COOPW.on=false;for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc())&&!(window.cycOn&&cycOn(S)))break}Q.length=0;S.preg=0;S.pregUnk=0;S.cyc=null};
  /* the room stub: seat a (host), the shared world's two seat blobs */
  T.room=(Pa,Pb)=>{const W=COOPW;W.on=true;W.seat="a";W.base={P:{a:Pa,b:Pb}};W.pend=false;W.sent=-1;W.p2=false;W.hold=null;
   COOP.state=Object.assign(COOP.state||{},{status:"open",peerOnline:true,ended:{}})};
  T.drain=(max=80)=>{for(let n=0;n<max&&Q.length;n++){const m=Q[0];const o=m.opts||m.o;
    if(o&&o.length){let i=m.pid==="nfch"?o.findIndex(x=>x.n==="Thôi"):o.findIndex(x=>!/Cáo bệnh|Tiến cử|Thôi/.test(x.n||""));if(i<0)i=0;try{chooseM(i)}catch(e){Q.shift()}if(Q[0]===m)Q.shift()}else Q.shift()}};
 });
 /* 1. the seat table: [label, P.a, P.b, expected nfOn on seat a] */
 const PAL={S:{}},SRV={srv:true,S:{srv:{risen:0}}},ROSE={srv:false,S:{srv:{risen:1}}},HOME={S:{kc:{inPal:false}}},INPAL={S:{kc:{inPal:true}}},DEAD={dead:true,S:{}};
 const CASES=[["both phi tần",PAL,PAL,true],["friend cung nữ",PAL,SRV,false],["host-blob cung nữ (this seat, as the friend sees it)",SRV,PAL,false],
  ["friend cung nữ risen",PAL,ROSE,true],["friend tiểu thư at home",PAL,HOME,false],["friend tiểu thư in the palace",PAL,INPAL,true],
  ["friend dead",PAL,DEAD,false],["friend not joined yet",PAL,undefined,true],["old blob (top-level srv only)",PAL,{srv:true},false]];
 for(const [lab,a,bb,want] of CASES){const r=await p.evaluate(([a,bb])=>{T.fresh();T.room(a,bb);return{on:nfOn(),off:nfRoomOff()}},[a,bb]);
  ok(`1 ${lab}: nfOn ${want}`,r.on===want&&r.off===!want,r)}
 /* solo: a stale world in COOPW.base never turns her night off once the room is off */
 let r=await p.evaluate(()=>{T.fresh();T.room({S:{}},{srv:true,S:{srv:{risen:0}}});COOPW.on=false;return{on:nfOn(),off:nfRoomOff()}});
 ok('1 room off (solo), stale base with a cung-nữ friend: nfOn true',r.on&&!r.off,r);
 /* 2. host day end with a cung-nữ friend: the live night (no jnf tablet / choice, no ctm-nf word), the day moves */
 r=await p.evaluate(()=>{T.fresh();T.room({S:{}},{srv:true,S:{srv:{risen:0}}});render();T.sent.length=0;const d=wk();let g=0;
  while((S.buoi||0)<B4L&&g++<8){T.drain();used=4;nextBuoi()}T.drain();
  for(let n=0;n<12&&wk()===d;n++){T.drain();S.toMorning=0;used=4;S.buoi=B4L;endTurn();COOPW.pend=false}T.drain();
  return{moved:wk()!==d,nfP:S.nfP===d,nfX:!!(S.nfX&&S.nfX.d===d),nf:T.sent.filter(m=>m&&m.k==="ctm-nf").length}});
 ok('2 host + cung-nữ friend: live night (no jnf tablet / choice / ctm-nf word), the day moves',r.moved&&!r.nfP&&!r.nfX&&r.nf===0,r);
 ok('page errors: none',!errs.length,errs.slice(0,5));
 await b.close();
 /* 3. the real room, origin pairs pinned */
 if(process.env.NIGHT0_E2E!=='0'){const pairs=(process.env.NIGHT0_PAIRS||'cnv:tt,tt:cnv').split(',').map(s=>s.split(':'));
  for(const [A,B] of pairs){const out=path.join(OUT,`e2e-${A}-${B}`);
   const x=spawnSync('node',[path.join(__dirname,'coop-e2e.js'),out],{env:Object.assign({},process.env,{COOP_A_ORIGIN:A,COOP_B_ORIGIN:B,COOP_WEEKS:process.env.NIGHT0_WEEKS||'1'}),encoding:'utf8',maxBuffer:1<<28});
   const L=(x.stdout||'').split('\n');const bad=L.filter(l=>/^FAIL/.test(l)&&/advanced|same date|STUCK|night/i.test(l)).map(l=>l.slice(0,300));
   const sum=L.filter(l=>/^\s*\d+\/\d+/.test(l)||/passed|STUCK/.test(l)).slice(-2);
   ok(`3 coop-e2e host ${A} / guest ${B}: no seat stuck in a night, same date`,!bad.length&&x.status!==null,{bad:bad.slice(0,4),sum,status:x.status})}}
 const n=R.filter(x=>x[0]).length;console.log(`coop-night0: ${n}/${R.length}`);process.exit(n===R.length?0:1)})().catch(e=>{console.error(e);process.exit(1)});
