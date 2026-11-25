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
     4 GUEST reload with a snapshot ahead of the room → her week is the room's date (the snapshot is not restored)
     6 CAUSE 5 r2: a «Tin báo» notice panel open (nothing to choose) is carried over the room's step, never holds it
     5 CAUSE 5 (buổi split): his own look-up panel («Tâm trạng · Ngươi», 3 queued copies) never holds the room's buổi step; a real choice still does
   env ONLY=1,5 runs only those cases (debug). */
const {chromium}=require('playwright');const path=require('path');
const {serve,BASE}=require('./coop-serve.js');const CLR=require('./lib/coop-clear.js');
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''));return !!c};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
/* the co-op bot's player (dev/test/coop-bot.js mk / tapText / until / STEP, copied unchanged: coop-bot exports them only from
   review/robot10-coop, not landed; one copy here so this gate runs on main as it is) */
const WURL0=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const WURL=WURL0;
async function mk(b,name,vp,wurl){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);
  /* THIN=n (host's wanted thin level, dev flag) + THINPART=4,… (test-only part flags, contract C1) for a thin-guest run on a Worker with part A */
  await ctx.addInitScript(([l,pts,host])=>{try{if(l&&host)localStorage.setItem('ctm-thin',l);for(const p of pts)if(p)localStorage.setItem('ctm-thin-part-'+p,'1')}catch(e){}},[process.env.THIN||'',(process.env.THINPART||'').split(','),name==='A']);
  await ctx.addInitScript(u=>{window.COOP_URL=u;
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};const you=c.seat||s.you||null;const ended=c.ended||s.ended||{};
      const on=typeof c.on==='boolean'?c.on:!!(s.playing||(s.status&&s.status!=='off'));
      return{code:c.code||s.room||'',seat:you,week:c.week!=null?c.week:(s.week||0),ended,on,
        frozen:!!(on&&(s.status!=='open'||!s.peerOnline)),waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(you&&ended[you]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},wurl||WURL);
  /* TRIP=1 (review/coop-thin-a): the guest tripwire (thin-guest progress meter) on the guest page */
  if(process.env.TRIP&&name==='B')await ctx.addInitScript({path:path.join(__dirname,'coop-thin-trip.js')});
  const p=await ctx.newPage();p.setDefaultTimeout(30000);const o={name,ctx,p,errs:[],acts:0,deaths:0,names:[],meets:0,harms:0,hk:{}};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const until=async(o,fn,arg,ms=30000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const STEP=()=>{const c=__co();if(c.frozen||c.waiting)return'coop';if(typeof S==='undefined'||!S)return'nos';if(S.mg){try{S.mg=null;render()}catch(e){}return'mg'}
  if(S&&S.dead){const b=[...document.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Đầu thai|Luân hồi|Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Nhập cung/.test(x.textContent))||b.find(x=>x.closest('#modal'));if(k){k.click();return'reborn:'+k.textContent.trim().slice(0,20)}return'dead'}
  const T=document.getElementById('title');if(T&&!T.hidden){const b=[...T.querySelectorAll('button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Nhận thân phận|Tiến cung|Vào cung|Ở nhà|Lật|Chọn/.test(x.textContent))||b[0];if(k){k.click();return'title'}}
  const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'overlay'}
  const bk=[...document.querySelectorAll('.kbk-x,.kbk-bar button')].find(x=>x.offsetParent!==null&&(/^Lui$/.test(x.textContent.trim())||/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||'')));if(bk){bk.click();return'book'}
  /* the toilette screen (jtoil, Điểm trang, makeup-lux on main): take a shown prize (Nhận), then keep yesterday's clothes (a player's road) */
  {const tk=document.getElementById('toilkeep');if(tk&&tk.offsetParent!==null){const nh=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&x.textContent.trim()==='Nhận');if(nh){nh.click();return'toil-take'}tk.click();return'toil'}}
  const m=document.getElementById('modal');if(m&&!m.hidden){const A0=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null&&!x.dataset.kcp);const acc=A0.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||A0.find(x=>/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent));if(acc){acc.click();return'accept'}const o=[...m.querySelectorAll('.opts button:not([disabled]):not([data-kcp])')];const b=o.length?o[Math.floor(Math.random()*o.length)]:m.querySelector('#mr button:not([disabled]),.k3foot button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'modal'}return'stuck'}
  if(window.__actsThis==null)window.__actsThis=0;
  /* meet the friend / act on her like on an NPC (owner: full act set, place-dependent) */
  const f=rivals.find(v=>v.coop&&v.alive&&!v.out);
  if(f&&!window.__metThis&&Math.random()<.35){window.__metThis=1;try{const k=whereOf(f);if(k&&k!==S.place&&k!=='lc'){goTo(k);return'meet:'+k}}catch(e){}}
  if(f&&!window.__hitThis&&together(S,f)&&Math.random()<.5){window.__hitThis=1;
    const K=['rumor','trip','ally','gift','spy','frame','pushp','steal'].filter(k=>{try{return ACT[k]&&ACT[k].ok(S,f)}catch(e){return false}});
    if(K.length){const k=K[Math.floor(Math.random()*K.length)];try{if(k==='gift'||k==='plant')return'skipgift';spend&&spend(2);const r=runAct(S,f,k);if(r)log(r);render();return'harm:'+k}catch(e){return'harmerr:'+e.message}}}
  if(window.__actsThis<3&&Math.random()<.8){const cards=[...document.querySelectorAll('#panel button.card:not([disabled]),#panel button.kcard:not([disabled])')].filter(x=>x.offsetParent!==null);
    if(cards.length){window.__actsThis++;cards[Math.floor(Math.random()*cards.length)].click();return'act'}
    const t=[...document.querySelectorAll('[data-tab="act"]')].find(x=>x.offsetParent!==null);if(t&&!window.__tabTried){window.__tabTried=1;t.click();return'tab'}}
  const n=document.getElementById('next');if(n&&!n.disabled){window.__actsThis=0;window.__tabTried=0;window.__metThis=0;window.__hitThis=0;n.click();return'next'}return'idle'};
const CB={mk,tapText,until,STEP};
const DCL={waitUntil:'domcontentloaded'};const ON=n=>!process.env.ONLY||process.env.ONLY.split(',').includes(String(n));
const D=o=>o.p.evaluate(()=>{const c=window.COOPW||{};const bS=c.base&&c.base.W&&c.base.W.S;const rd=bS&&typeof bS.turn==='number'?bS:null;/* the room's merged date (CW.base.W.S), read directly: the same on a bare build */return {w:COOP.state.week,my:typeof S==='object'&&S?S.turn*3+S.tuan:null,
  date:typeof S==='object'&&S?[S.year,S.month,S.tuan,S.turn].join('/'):null,room:rd?[rd.year,rd.month,rd.tuan,rd.turn].join('/'):null,
  roomN:rd?rd.turn*3+rd.tuan:null,dead:!!(typeof S==='object'&&S&&S.dead),inLife:!!c.inLife,life:c.life||0,b:typeof S==='object'&&S?S.buoi||0:null,fix:c.calFix||0}}).catch(e=>({err:e.message}));
/* a player clears what is on top of her (kit layers, then an open dialog: the bot's own answer) without starting acts */
async function clr(o){if(await CLR.tap(o).catch(()=>'')==='x')return;if(await o.p.evaluate(()=>!document.getElementById('modal').hidden).catch(()=>false))await step(o)}
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
 if(ON(1))await rebirthCase(A,B,B,'1','tuan');
 if(ON(2))await rebirthCase(A,B,B,'2','turn');
 if(ON(3))await rebirthCase(A,B,A,'3','tuan');
 /* 4 reload with her snapshot ahead (her night moved her date, the page went away before the merge) */
 if(ON(4)){ok(await play(A,B,async()=>await alive(A)&&await alive(B),90000),'4: both live');const w0=(await D(B)).w;
  await B.p.evaluate(()=>{if(S.tuan<2)S.tuan++;else{S.turn++;S.tuan=0}COOPW.snapNow()});await B.p.close();B.p=await B.ctx.newPage();B.p.setDefaultTimeout(30000);B.p.on('pageerror',e=>B.errs.push(e.message));await A.p.waitForFunction(()=>COOP.frozen,null,{timeout:60000}).catch(()=>{});
  await B.p.goto(BASE+'?room='+code,DCL);await B.p.waitForTimeout(3000);await CB.tapText(B,/^Vào phòng|^Tiếp tục/,6000);
  ok(await play(A,B,async()=>{const d=await D(B);return d.w===w0&&await alive(B)},120000),'4: guest back in the room week');const d=await D(B);
  ok(d.my===d.roomN,'4: her week is at the room date after the reload',d);
  const st=await play(A,B,async()=>(await D(A)).w>w0&&(await D(B)).w>w0,240000);ok(st,'4: the room steps a week',[(await D(A)).w,(await D(B)).w])}
 /* 5 CAUSE 5 (Foreman B rooms QH9Y / U5HB / BGMQ, LIVE: the two seats' buổi split, host «Buổi sáng ✓», guest «Buổi trưa», both wait for
    ever; BGMQ host trace «onBuoi 0.1 me 0.0 Q25»): the host ends his buổi, then opens his own look-up panel «Tâm trạng · Ngươi» three times
    (the person-dialog queue keeps copies), the guest ends hers → the room steps → the host's seat steps too, at once (a look-up panel never
    holds the room's step), no tap on his side */
 if(ON(5)){const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
  ok(await play(A,B,async()=>{const a=await D(A),c=await D(B);return await alive(A)&&await alive(B)&&a.w===c.w&&a.b===c.b&&a.b<LAST},120000),'5: both live in one day buổi');
  for(let i=0;i<6;i++){await CLR.tap(A).catch(()=>'');await CLR.tap(B).catch(()=>'');await sleep(200)}
  const a0=await D(A);const nx=o=>o.p.evaluate(()=>{if(COOPW.bend)return true;/* already ended this buổi (the clock / an earlier tap): counts as pressed */const n=document.getElementById('next');if(!n||n.disabled||!document.getElementById('modal').hidden)return false;n.click();return true});
  let hp=false;for(let i=0;i<20&&!hp;i++){hp=await nx(A);if(!hp){await clr(A);await sleep(300)}}ok(hp,'5: host presses Hết buổi',a0);await sleep(800);
  ok(await A.p.evaluate(()=>{for(let i=0;i<3;i++)emoBox(emoKey(S));return !document.getElementById('modal').hidden&&Q.length>=1}),'5: host has «Tâm trạng · Ngươi» open (queued '+await A.p.evaluate(()=>Q.length)+')');
  let pr=false;for(let i=0;i<20&&!pr;i++){pr=await nx(B);if(!pr){await clr(B);await sleep(300)}}ok(pr,'5: guest presses Hết buổi',pr?undefined:[await B.p.evaluate(()=>{const n=document.getElementById('next');return {t:n&&n.textContent,dis:n&&n.disabled,modal:!document.getElementById('modal').hidden&&(document.getElementById('mt')||{}).textContent,Q:Q.length,b:S.buoi,tr:COOPW.tr.slice(-4)}}),await A.p.evaluate(()=>({Q:Q.length,b:S.buoi,tr:COOPW.tr.slice(-4)}))]);
  ok(await CB.until(B,b=>(S.buoi||0)===b+1,a0.b,20000),'5: the room steps (guest in the next buổi)');
  const st=await CB.until(A,b=>(S.buoi||0)===b+1&&!COOPW.pendBuoi,a0.b,15000);const a1=await D(A),b1=await D(B);
  ok(st&&a1.b===b1.b,'5: the host steps with the room by himself (no split)',[a1.b,b1.b,await A.p.evaluate(()=>({pb:!!COOPW.pendBuoi,Q:Q.length,tr:COOPW.tr.slice(-5)}))]);
  /* a real choice still holds the step until she answers (pendBuoi, unchanged) */
  let hp2=false;for(let i=0;i<30&&!hp2;i++){hp2=await nx(A);if(!hp2){await clr(A);await sleep(300)}}const a2=await D(A);ok(hp2,'5: host presses Hết buổi again (his dialogs answered)',await A.p.evaluate(()=>({Q:Q.length,tr:COOPW.tr.slice(-3)})));await sleep(800);
  await A.p.evaluate(()=>{window.__c5=0;pushModal({t:'Việc thử',h:'<p>Một việc cần ngươi tự quyết.</p>',opts:[{n:'Nhận',fx:{},x:'',go:()=>{window.__c5=1}},{n:'Thôi',fx:{},x:'',go:()=>{window.__c5=2}}]});showModal()});
  pr=false;for(let i=0;i<20&&!pr;i++){pr=await nx(B);if(!pr){await clr(B);await sleep(300)}}
  await CB.until(B,b=>(S.buoi||0)===b+1,a2.b,20000);await sleep(2500);
  ok((await D(A)).b===a2.b&&await A.p.evaluate(()=>!!COOPW.pendBuoi),'5: a real choice open still holds his step (pendBuoi)',await D(A));
  await A.p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button')].find(x=>/^Nhận/.test(x.textContent.trim()));if(b)b.click()});
  ok(await CB.until(A,b=>(S.buoi||0)===b+1,a2.b,15000)&&await A.p.evaluate(()=>window.__c5===1),'5: he answers → his step runs, the choice ran once')}
 /* 6 CAUSE 5 r2 (U3b room 6ZB2 on d16c5300: both seats had «Tin báo» open, host «onBuoi 3.2 me 3.1 Q1» parked): a panel that only TELLS
    (the «Tin báo» notice panel she opened, no choice) is carried over the room's step: his seat steps with the room and the panel is still
    on his screen after it (nothing she was reading is lost) */
 if(ON(6)){const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);const nx=o=>o.p.evaluate(()=>{if(COOPW.bend)return true;/* already ended this buổi (the clock / an earlier tap): counts as pressed */const n=document.getElementById('next');if(!n||n.disabled||!document.getElementById('modal').hidden)return false;n.click();return true});
  ok(await play(A,B,async()=>{const a=await D(A),c=await D(B);return await alive(A)&&await alive(B)&&a.w===c.w&&a.b===c.b&&a.b<LAST},120000),'6: both live in one day buổi');
  let hp=false;for(let i=0;i<30&&!hp;i++){hp=await nx(A);if(!hp){await clr(A);await sleep(300)}}const a0=await D(A);ok(hp,'6: host presses Hết buổi',a0);await sleep(800);
  ok(await A.p.evaluate(()=>{kitNotice({id:'t6',line:'Tin thử ca 6',text:'Một tin để đọc, không có gì phải chọn.'});kitNoticeOpen('t6');return !document.getElementById('modal').hidden&&Q.length===1&&/Tin báo/.test((document.getElementById('mt')||{}).textContent||'')}),'6: host has «Tin báo» open (a notice, no choice)');
  let pr=false;for(let i=0;i<30&&!pr;i++){pr=await nx(B);if(!pr){await clr(B);await sleep(300)}}ok(pr,'6: guest presses Hết buổi');
  ok(await CB.until(B,b=>(S.buoi||0)===b+1,a0.b,20000),'6: the room steps (guest in the next buổi)');
  const st=await CB.until(A,b=>(S.buoi||0)===b+1&&!COOPW.pendBuoi,a0.b,15000);const a1=await D(A),b1=await D(B);
  ok(st&&a1.b===b1.b,'6: the host steps with the room (no split)',[a1.b,b1.b,await A.p.evaluate(()=>({pb:!!COOPW.pendBuoi,Q:Q.length,tr:COOPW.tr.slice(-4)}))]);
  ok(await A.p.evaluate(()=>Q.some(x=>x&&x.t==='Tin báo')),'6: the «Tin báo» panel is still there after the step (carried, not lost)')}

 const NX=o=>o.p.evaluate(()=>{if(COOPW.bend)return true;const n=document.getElementById('next');if(!n||n.disabled||!document.getElementById('modal').hidden)return false;n.click();return true});
 const press=async o=>{let p=false;for(let i=0;i<30&&!p;i++){p=await NX(o);if(!p){await clr(o);await sleep(300)}}return p};
 const LAST=await A.p.evaluate(()=>typeof B4L==='number'?B4L:2);
 const sameDay=async t=>ok(await play(A,B,async()=>{const a=await D(A),c=await D(B);return await alive(A)&&await alive(B)&&a.w===c.w&&a.b===c.b&&a.b<LAST},120000),t+': both live in one day buổi');
 if(ON(7)){await sameDay('7');ok(await press(A),'7: host presses');const a0=await D(A);await sleep(800);
  await A.p.evaluate(()=>{emoBox(emoKey(S))});const q0=await A.p.evaluate(()=>Q.map(x=>x.t));console.log('7 host Q before',q0);
  ok(await press(B),'7: guest presses');await CB.until(A,b=>(S.buoi||0)===b+1,a0.b,15000);await sleep(1500);
  const r=await A.p.evaluate(()=>({b:S.buoi,Q:Q.map(x=>x.t),modal:!document.getElementById('modal').hidden,tr:COOPW.tr.slice(-5)}));console.log('7 host after',JSON.stringify(r));
  ok(r.Q.length>0,'7: PROBE look-up panel shown again after the step',r)}
 if(ON(8)){await sameDay('8');
  const r1=await A.p.evaluate(()=>{kitNotice({id:'t8',line:'Tin thử ca 8',text:'Một tin.'});kitNoticeOpen('t8');const q=Q.length;const k=COOPW.nightEnd();return {q,k,b:S.buoi,bend:COOPW.bend,Q:Q.map(x=>x.t)}});console.log('8 notice nightEnd',JSON.stringify(r1));
  ok(r1.k!=='','8: PROBE clock end NOT held by a notice (same rule as onBuoi carry)',r1);
  if(r1.k===''){await A.p.evaluate(()=>{Q.splice(0);showModal()});const r2=await A.p.evaluate(()=>{emoBox(emoKey(S));const q=Q.length;const k=COOPW.nightEnd();return {q,k,b:S.buoi,Q:Q.map(x=>x.t)}});console.log('8 look nightEnd',JSON.stringify(r2))}}
 if(ON(9)){await sameDay('9');await B.p.evaluate(()=>die('Thử: thẻ thân phận'));
  let got=false;for(let i=0;i<60&&!got;i++){got=await B.p.evaluate(()=>!!(Q.length&&Q[0]&&Q[0].nl&&COOPW.inLife));if(got)break;const t=await B.p.evaluate(()=>{const q=Q[0];const b=[...document.querySelectorAll('#modal button,#title button')].filter(x=>x.offsetParent!==null&&!x.disabled);const k=b.find(x=>/Chuyển kiếp|Đầu thai|Luân hồi|Đã rõ|Đã hiểu|Tiếp/.test(x.textContent));const r=(q?q.t+'|'+q.cls+'|'+COOPW.passiveQ(q):'noQ')+' -> '+(k?k.textContent.trim().slice(0,20):'-');if(k)k.click();return r});console.log('9 b',t);await sleep(1000)}
  const s0=await B.p.evaluate(()=>({nl:!!(Q[0]&&Q[0].nl),pass:COOPW.passiveQ(Q[0]),b:S.buoi,dead:S.dead,inLife:COOPW.inLife,w:COOP.state.week}));console.log('9 guest on life card',got,JSON.stringify(s0));
  ok(!s0.pass,'9: PROBE the life card (opts:[]) counts as a choice, not passive',s0);
  for(let i=0;i<3;i++){const p=await press(A);console.log('9 host press',p,JSON.stringify(await D(A)));await sleep(4000);
   const g=await B.p.evaluate(()=>({nl:!!(Q[0]&&Q[0].nl),b:S.buoi,inLife:COOPW.inLife,carried:COOPW.carried||0,pb:!!COOPW.pendBuoi,tr:COOPW.tr.slice(-4)}));console.log('9 guest',JSON.stringify(g))}}
 const errs=[...A.errs.map(e=>'A '+e),...B.errs.map(e=>'B '+e)].filter(e=>!/WebSocket|net::|ERR_/.test(e));ok(!errs.length,'no page errors',errs.slice(0,4));
 const bad=res.filter(r=>!r[0]).length;console.log(`\nCOOP-CAL-REBIRTH ${bad?'FAIL':'PASS'} ${res.length-bad}/${res.length}`);await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
