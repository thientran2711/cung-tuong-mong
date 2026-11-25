/* coop-cal-rebirth (robot-coop-fix-6, week-end stuck CAUSE 4, law 11 whole family): a seat's own calendar (j8 wk() = S.turn*3+S.tuan,
   = jnf / jsmg day()) must be the room's merged date (COOPW.roomDate() = CW.base.W.S) whenever it lives in the room's week.
   Root (FIXER #10 lead, proven here): a seat that dies AFTER its own night moved its date (j3 endTurn tuần +1; monthTick S.turn++ then a
   death in the month roll = +3; dead after her end went out, merge pending) left a dying snapshot whose W.S date was ahead of the room;
   the new life was attached into it → her day() ahead of the room week → she asked the host for a night he never opens → both wait for ever.
   Two Playwright browsers (Fold host 755x1000 + iPad guest 1180x820), one room on the Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-cal-rebirth.js [workerURL]   (default the LIVE Worker)
   Cases (each from a live day buổi of week w):
     1 GUEST dies after her tuần step (date +1)      → reborn at the room date, the room then steps one week, both on one date
     2 GUEST dies inside the month roll (S.turn++, +3) → same
     3 HOST dies after his tuần step (date +1)       → same (the host's new life too)
     4 GUEST reload with a snapshot ahead of the room → her week is the room's date (the snapshot is not restored) */
const {chromium}=require('playwright');const path=require('path');
const {serve,BASE}=require('./coop-serve.js');const CB=require('./coop-bot.js');const CLR=require('./lib/coop-clear.js');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''));return !!c};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));const DCL={waitUntil:'domcontentloaded'};
const D=o=>o.p.evaluate(()=>{const c=window.COOPW||{};const bS=c.base&&c.base.W&&c.base.W.S;const rd=bS&&typeof bS.turn==='number'?bS:null;/* the room's merged date (CW.base.W.S), read directly: the same on a bare build */return {w:COOP.state.week,my:typeof S==='object'&&S?S.turn*3+S.tuan:null,
  date:typeof S==='object'&&S?[S.year,S.month,S.tuan,S.turn].join('/'):null,room:rd?[rd.year,rd.month,rd.tuan,rd.turn].join('/'):null,
  roomN:rd?rd.turn*3+rd.tuan:null,dead:!!(typeof S==='object'&&S&&S.dead),inLife:!!c.inLife,life:c.life||0,b:typeof S==='object'&&S?S.buoi||0:null,fix:c.calFix||0}}).catch(e=>({err:e.message}));
async function step(o){try{return await CLR.first(o,CB.STEP)}catch(e){return 'err'}}
/* both seats play (a player's taps: coop-bot STEP + the shared coop-clear) until fn(A,B) holds */
async function play(A,B,fn,ms){const t0=Date.now();while(Date.now()-t0<ms){await step(A);await step(B);if(await fn())return true;await sleep(150)}return false}
const alive=async o=>{const d=await D(o);return d.my!=null&&!d.dead&&!d.inLife&&await o.p.evaluate(()=>document.getElementById('title').hidden&&!document.querySelector('#kroul')).catch(()=>false)};
/* kill a seat the way the robot round did: its own date moved first (the shape of the case), then a death (j3 die) */
const kill=(o,how)=>o.p.evaluate(how=>{if(how==='tuan'){if(S.tuan<2)S.tuan++;else{S.turn++;S.month=S.month%12+1;S.tuan=0}}else if(how==='turn')S.turn++;die('Thử: lịch đi trước')},how);
async function rebirthCase(A,B,X,tag,how){
  ok(await play(A,B,async()=>await alive(A)&&await alive(B)&&(await D(A)).b===0&&(await D(B)).b===0,90000),tag+': both live at a buổi sáng');
  const x0=await D(X),w0=x0.w;ok(x0.my===x0.roomN,tag+': '+X.name+' calendar = room date before',x0);
  await kill(X,how);const x1=await D(X);ok(x1.dead||x1.inLife||true,tag+': '+X.name+' died ('+how+')',x1);
  const back=await play(A,B,async()=>{const d=await D(X);return d.w===w0&&!d.dead&&!d.inLife&&d.life>x0.life&&await alive(X)},180000);
  const x2=await D(X);ok(back,tag+': '+X.name+' reborn in the same room week',x2);
  ok(x2.my===x2.roomN&&x2.date===x2.room,tag+': the new life is at the room date (not ahead)',{my:x2.my,room:x2.roomN,date:x2.date,roomDate:x2.room,fix:x2.fix});
  const Y=X===A?B:A;const y2=await D(Y);ok(y2.my===x2.my,tag+': both seats on one calendar',[x2.date,y2.date]);
  const stepped=await play(A,B,async()=>(await D(A)).w>w0&&(await D(B)).w>w0,240000);const a=await D(A),b=await D(B);
  ok(stepped&&a.w===w0+1&&b.w===w0+1,tag+': the room steps one week (no stuck)',[w0,a.w,b.w]);
  ok(a.date===b.date&&a.my===a.roomN,tag+': same date on both seats after the step',[a.date,b.date,a.room])}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-web-security','--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const A=await CB.mk(b,'A',[755,1000],WURL),B=await CB.mk(b,'B',[1180,820],WURL);A.name='host';B.name='guest';
 await A.p.goto(BASE,DCL);await A.p.waitForTimeout(3000);
 ok(await CB.tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A: Cùng hảo hữu');await A.p.waitForTimeout(600);ok(await CB.tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A: Mời hảo hữu');
 ok(await CB.until(A,()=>COOP.code&&COOP.seat==='a'),'A has a room');const code=await A.p.evaluate(()=>COOP.code);console.log('room',code);
 await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await CB.tapText(B,/^Vào phòng|^Tiếp tục/,4000);
 ok(await CB.until(B,()=>COOP.seat==='b',null,60000),'B in seat b');
 ok(await play(A,B,async()=>await alive(A)&&await alive(B),240000),'both chose their thân phận and are in the game');
 /* one week first (a merged base) */
 {const w=(await D(A)).w;ok(await play(A,B,async()=>(await D(A)).w>w&&(await D(B)).w>w,240000),'warm-up: the room steps a week')}
 await rebirthCase(A,B,B,'1','tuan');
 await rebirthCase(A,B,B,'2','turn');
 await rebirthCase(A,B,A,'3','tuan');
 /* 4 reload with her snapshot ahead (her night moved her date, the page went away before the merge) */
 {ok(await play(A,B,async()=>await alive(A)&&await alive(B),90000),'4: both live');const w0=(await D(B)).w;
  await B.p.evaluate(()=>{if(S.tuan<2)S.tuan++;else{S.turn++;S.tuan=0}COOPW.snapNow()});await B.p.close();B.p=await B.ctx.newPage();B.p.setDefaultTimeout(30000);B.p.on('pageerror',e=>B.errs.push(e.message));await A.p.waitForFunction(()=>COOP.frozen,null,{timeout:60000}).catch(()=>{});
  await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await CB.tapText(B,/^Vào phòng|^Tiếp tục/,6000);
  ok(await play(A,B,async()=>{const d=await D(B);return d.w===w0&&await alive(B)},120000),'4: guest back in the room week');const d=await D(B);
  ok(d.my===d.roomN,'4: her week is at the room date after the reload',d);
  const st=await play(A,B,async()=>(await D(A)).w>w0&&(await D(B)).w>w0,240000);ok(st,'4: the room steps a week',[(await D(A)).w,(await D(B)).w])}
 const errs=[...A.errs.map(e=>'A '+e),...B.errs.map(e=>'B '+e)].filter(e=>!/WebSocket|net::|ERR_/.test(e));ok(!errs.length,'no page errors',errs.slice(0,4));
 const bad=res.filter(r=>!r[0]).length;console.log(`\nCOOP-CAL-REBIRTH ${bad?'FAIL':'PASS'} ${res.length-bad}/${res.length}`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
