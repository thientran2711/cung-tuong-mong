/* Co-op pets (review/coop-pets, owner 15/11 20:05Z): help / harm / steal the FRIEND's pet in a 2-player room on the LIVE Worker.
   usage: python3 dev/build/assemble.py && node dev/test/coop-pets.js [outdir] [rounds=3] [workerURL]
   A = host 755x1000@2, B = guest 1180x820@2 (both through coop-serve, dev/index.html).
   Checks: B's pets reach A's friend entry (live, pos); A helps (petcare) → B's own pet: fullness +helpGain, B sees the note, both agree;
   A harms (thaopet, forced success) → B loses that pet, her follow bonus leaves ONCE (not twice); A steals (petsteal, forced) → pet moves
   to A with its stage; a res that lands AFTER B ended the week is in the merged week (B re-sends end, A waits for the ack);
   every merged week: A's friend entry pets == B's own pets and B's friend entry pets == A's own pets; NPC pets identical on both;
   rounds × (random pet acts both ways + one week) stress; 0 page errors. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||'/tmp/coop-pets');fs.mkdirSync(OUT,{recursive:true});
const ROUNDS=+(process.argv[3]||3);
const WURL=process.argv[4]||'https://ctm-coop.victoria-tntt.workers.dev';
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,600):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
  await serve(ctx);/* r2: consort starts (lib/coop-real.js; env COOP_A_ORIGIN / COOP_B_ORIGIN, 'rand' = random) */await REALL.origin(ctx,name==='host'?'a':'b');await ctx.addInitScript(u=>{window.COOP_URL=u;
    window.__co=()=>{const c=window.COOP;if(!c)return{};const s=c.state||{};return{code:c.code||'',seat:c.seat,week:c.week||0,online:c.online||{},ended:c.ended||{},
      frozen:!!c.frozen,waiting:!!(window.COOPW&&COOPW.on&&(COOPW.sent===(s.week||0)||(c.seat&&(c.ended||{})[c.seat]))),world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.base)}}},WURL);
  const o={ctx,name,errs:[]};const p=await ctx.newPage();p.setDefaultTimeout(30000);
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|navigator.vibrate/.test(m.text()))o.errs.push('console: '+m.text())});o.p=p;return o}
const ALL=[];
async function tapText(o,re,ms=8000){const t0=Date.now();while(Date.now()-t0<ms){const h=await o.p.evaluateHandle(src=>{const R=new RegExp(src);
  return [...document.querySelectorAll('button,a,[role=button]')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
  const el=h.asElement();if(el){await el.click();return true}await sleep(250)}return false}
/* close the normal game's dialogs (never the co-op waiting/freeze panel); remembers the titles seen */
async function clear(o,n=25){for(let i=0;i<n;i++){const st=await require('./lib/coop-clear.js').first(o,()=>{const ke=[...document.querySelectorAll('.kmov .kmend')].find(x=>x.offsetParent!==null&&!x.disabled);if(ke){ke.click();return'x'}const kv=[...document.querySelectorAll('.kmov')].find(x=>!x.classList.contains('km-out')&&!x.querySelector('.kmend')&&!x.dataset.tsk);if(kv){kv.dataset.tsk=1;kv.click();return'x'}const c=__co();if(c.frozen||c.waiting)return'coop';
   /* the Luân hồi flow (owner 16/11): skip the origin roulette, close a kit book (review/coop-b1b5-p2 harness update) */
   
   const kx=[...document.querySelectorAll('.kbk-x')].find(x=>x.offsetParent!==null&&/^(Lui|Đóng)$/.test(x.getAttribute('aria-label')||''));if(kx){kx.click();return'x'}
   const ov=[...document.querySelectorAll('button')].find(x=>x.offsetParent!==null&&!x.disabled&&!x.closest('#panel,#tabs,#hud,#modal')&&x.parentElement&&x.closest('[class^=km],[class*=" km"]')&&(x.classList.contains('kmend')||/^(Nhận|Đã hiểu|Tạ ơn|Lĩnh chỉ|Tuân chỉ)$/.test(x.textContent.trim())));if(ov){ov.click();return'x'}
   const bk=[...document.querySelectorAll('.kbk-bar button')].find(x=>x.offsetParent!==null&&/^Lui$/.test(x.textContent.trim()));if(bk){bk.click();return'x'}
   const m=document.getElementById('modal');if(!m||m.hidden)return typeof S!=='undefined'&&S&&S.mg?'mg':'';
   try{const t=(m.querySelector('h2,h3,.kmt,.kmtitle')||{}).textContent||'';(window.__seen=window.__seen||[]).push(t.trim()+' | '+m.textContent.replace(/\s+/g,' ').slice(0,300))}catch(e){}
   const all=[...m.querySelectorAll('button:not([disabled])')].filter(x=>x.offsetParent!==null);const b=all.find(x=>/^Nhận thân phận/.test(x.textContent.trim()))||all.find(x=>!x.dataset.kcp&&/Nhận thân phận|Nhập cung|Tiến cung|Vào cung/.test(x.textContent))||m.querySelector('#mr button:not([disabled])')||m.querySelector('.opts button:not([disabled])')||[...m.querySelectorAll('.dlg .kit-x')].find(x=>x.offsetParent!==null);if(b){b.click();return'x'}return'stuck'});
  if(st==='mg'){await o.p.evaluate(()=>{try{S.mg=null;render()}catch(e){}});continue}
  if(st!=='x')return st;await sleep(200)}return'many'}
/* r1 fix 6: a seat that already pressed for this step (buổi ended = bend, night-ready by the night gate or its night with the Emperor, week end out) counts as pressed */
async function press(o){for(let t=0;t<80;t++){await clear(o);const r=await o.p.evaluate(()=>{if(window.COOPW&&COOPW.on&&((COOPW.nReady&&COOPW.nReady())||COOPW.bend||COOPW.pend||COOPW.sent===(COOP.state.week||0)))return true;const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});if(r)return true;await sleep(250)}
  ok(false,o.name+' #next enabled');return false}
async function buoiBoth(A,B){const k0=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0));await press(A);await press(B);
  for(let t=0;t<80;t++){const a=await A.p.evaluate(()=>__co().week+':'+(S.buoi||0)),b=await B.p.evaluate(()=>__co().week+':'+(S.buoi||0));if(a!==k0&&b!==k0&&a===b)return true;await clear(A);await clear(B);await sleep(250)}
  ok(false,'buổi '+k0+' advanced for both');return false}
const nB=o=>o.p.evaluate(()=>typeof B4N==='number'?B4N:3);
/* play to the last buổi of the week (both) */
async function toLast(A,B){const n=await nB(A);for(let i=0;i<40;i++){const b=await A.p.evaluate(()=>S.buoi||0);if(b>=n-1)return;await buoiBoth(A,B)}}
async function weekWait(o,wk,ms=60000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(x=>__co().week===x+1,wk))return true;for(const x of ALL)await clear(x);await sleep(300)}return false}
/* the pets as each side sees them */
const myPets=o=>o.p.evaluate(()=>(S.pets||[]).map(P=>({t:P.t,at:P.at||0,full:Math.round(P.full),stg:P.stg|0})));
const frPets=o=>o.p.evaluate(()=>{const f=COOPW.friend();return f?(f.pets||[]).map(P=>({t:P.t,at:P.at||0,full:Math.round(P.full),stg:P.stg|0})):null});
const npcPets=o=>o.p.evaluate(()=>rivals.filter(v=>!v.coop).map(v=>v.id+':'+(v.pets||[]).map(P=>P.t+'/'+Math.round(P.full||0)+'/'+(P.stg|0)).join(',')).join(';'));
/* run one of A's acts on the friend with the dice forced (o: true = success, undetected) */
const act=(o,k,force)=>o.p.evaluate(([k,force])=>{const r0=roll,c0=caught;if(force){roll=x=>true;caught=()=>""}try{const f=COOPW.friend();
   const okk=!!(f&&ACT[k]&&ACT[k].ok(S,f));const r=okk?coopPetAct(k):"";return{okk,r:String(r).replace(/<[^>]+>/g,'').slice(0,200)}}finally{roll=r0;caught=c0}},[k,force]);
async function samePets(A,B,tag){
  const [a,b,fa,fb]=[await myPets(A),await myPets(B),await frPets(A),await frPets(B)];
  const k=L=>JSON.stringify((L||[]).map(x=>[x.t,x.at,x.stg]).sort());
  ok(k(fa)===k(b),tag+': A sees B\'s real pets',[fa,b]);ok(k(fb)===k(a),tag+': B sees A\'s real pets',[fb,a]);
  const na=await npcPets(A),nb=await npcPets(B);ok(na===nb,tag+': NPC pets identical on both',na===nb?undefined:[na.slice(0,200),nb.slice(0,200)])}
const REALL=require('./lib/coop-real.js');const DBGF=o=>o.p.evaluate(REALL.DBGF).catch(e=>'dbg err '+e.message);
/* r2: step 5 state of one seat for a failure dump (her queue titles, the week-end relay, D's patch queue / log, the host's stored copy of the guest's pets) */
const DBG5=o=>o.p.evaluate(()=>{const T=COOPW.thin||{},D=T.D||{};let hb=null;try{const ob=COOPW.seat==='a'?'b':'a';const x=COOPW.seat==='a'&&T.seatOf?T.seatOf(ob):null;hb=x&&x.S?(x.S.pets||[]).map(P=>P.t+'/'+Math.round(P.full)):null}catch(e){hb='err '+e.message}
  return{seat:COOPW.seat,wk:__co().week,day:typeof wk==='function'?wk():null,sent:COOPW.sent,pend:COOPW.pend,bend:COOPW.bend,rpend:Object.keys(COOPW.rpend||{}),Q:Q.map(m=>String(m&&(m.t||m.pid||'')).slice(0,30)+(m&&m.opts?'['+m.opts.length+']':'')+(m&&m.thin?'(thin)':'')),
   pets:(S.pets||[]).map(P=>P.t+'/'+Math.round(P.full)),thpn:S.thpn,N:D.N,PQ:D.PQ?Object.fromEntries(Object.entries(D.PQ).map(([k,L])=>[k,(L||[]).map(x=>x.n+':'+(x.p||[]).length+(x.rid?'r':''))])):null,
   dlog:(D.log||[]).slice(-14),fW:COOPW.fW?COOPW.fW():null,dOn:T.dOn?T.dOn():null,lvl:T.lvl,resIn:window.__resIn||null,resOut:window.__resOut||null,hostCopyB:hb,inLife:!!COOPW.inLife,life:T.life?{ask:!!T.life.ask}:null,tr:(COOPW.tr||[]).slice(-10)}}).catch(e=>'dbg err '+e.message);
async function waitFr(o,fn,ms=15000){const t0=Date.now();while(Date.now()-t0<ms){if(await o.p.evaluate(fn).catch(()=>false))return true;await sleep(300)}return false}

(async()=>{const b=await chromium.launch();
 const A=await mk(b,'host',[755,1000,2]);ALL.push(A);
 await A.p.goto(BASE);await A.p.waitForTimeout(3000);
 ok(await tapText(A,/^(Chơi cùng bạn|Cùng hảo hữu)/),'A taps Chơi cùng bạn');await A.p.waitForTimeout(600);
 ok(await tapText(A,/^(Mời bạn|Mời hảo hữu)/),'A taps Mời bạn');
 await A.p.waitForFunction(()=>__co().code&&__co().seat==='a',null,{timeout:30000});
 const code=(await A.p.evaluate(()=>__co())).code;console.log('room',code);await clear(A);
 const B=await mk(b,'guest',[1180,820,2]);ALL.push(B);await B.p.goto(BASE+'?room='+code);await B.p.waitForTimeout(3000);await tapText(B,/^Vào phòng/,4000);
 await B.p.waitForFunction(()=>__co().seat==='b'&&!__co().frozen,null,{timeout:40000});
 {const inGame=o=>o.p.evaluate(()=>!!(__co().world&&COOPW.on&&typeof S!=='undefined'&&S&&!COOPW.inLife&&document.getElementById('title').hidden&&!document.getElementById('kroul')&&document.getElementById('next').offsetParent)).catch(()=>false);
  const t0=Date.now();while(Date.now()-t0<150000){await clear(A);await clear(B);if(await inGame(A)&&await inGame(B))break;await sleep(700)}}
 /* both as consorts in the palace (a servant / tiểu thư-at-home start has no consort entry to aim pet acts at) */
 for(const o of [A,B])await o.p.evaluate(()=>{if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=Math.max(S.rank||0,3);render()});
 /* D20 coop-flakes: rank trail (dump only): every change of her rank until the set-up check */
 for(const o of [A,B])await o.p.evaluate(()=>{window.__rk=[];let l='';window.__rkI=setInterval(()=>{try{const x=__co().week+':'+(S.buoi|0)+' r'+S.rank+(Q.length?' Q:'+String(Q[0].t||Q[0].pid||'').slice(0,40):'');if(S.rank+''!==l){l=S.rank+'';__rk.push(x)}}catch(e){}},100)});
 ok(await A.p.evaluate(()=>__co().world)&&await B.p.evaluate(()=>__co().world),'both in the shared world');await clear(A);await clear(B);
 /* both get pets (B: a cat that follows her + a crane; A: one dog) */
 for(const [o,L] of [[B,['meo','hac']],[A,['cho']]])await o.p.evaluate(L=>{petMax=()=>4;/* test: room for a few pets at any rank */S.petTip=1;/* r2: she has had a pet before (legal state): no first-time «Thú nuôi · lời dặn lần đầu» panel lands on top of the gift checks */S.pets=[];S.petOn=-1;S.petB=null;S.petBn=0;for(const t of L){const P=petAdd(S,t,'thử','buy');P.full=40;P.clean=50;P.joy=50;P.aff=30;P.stg=1;petcSync(P)}S.bac=Math.max(S.bac||0,200);render()},L);
 /* D20 coop-flakes (pb-1: the host's rank 3 → 2 by the set-up check): the set-up above is screen-only; if a rebuild lands on a seat in the
    same moment it puts back that seat's stored state. Hold until it has stayed for 1.5 s on both seats; a reset is printed (with the rank
    trail) and the set-up is written again, like a player whose screen reloaded does it again */
 for(let k=0;k<4;k++){await sleep(1500);const bad=[];for(const [o,n] of [[A,1],[B,2]])if(!await o.p.evaluate(n=>S.rank>=3&&(S.pets||[]).length===n,n).catch(()=>false))bad.push(o.name);if(!bad.length)break;
  console.log('SETUP-RESET',k,JSON.stringify(bad),JSON.stringify(await A.p.evaluate(()=>({rk:window.__rk,tr:(COOPW.tr||[]).slice(-10)}))),JSON.stringify(await B.p.evaluate(()=>({rk:window.__rk,tr:(COOPW.tr||[]).slice(-10)}))));
  for(const o of [A,B])await o.p.evaluate(()=>{if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=Math.max(S.rank||0,3);render()});
  for(const [o,L] of [[B,['meo','hac']],[A,['cho']]])await o.p.evaluate(L=>{if((S.pets||[]).length===L.length)return;S.petTip=1;S.pets=[];S.petOn=-1;S.petB=null;S.petBn=0;for(const t of L){const P=petAdd(S,t,'thử','buy');P.full=40;P.clean=50;P.joy=50;P.aff=30;P.stg=1;petcSync(P)}render()},L)}
 /* r2: the set-up above wrote each seat's own screen; the guest's person lives on the host (thin co-op) and the world's entries are built from the
    merged week, so one week merge makes it real on both seats (rank ≥ PAL_HEAD = her own palace, never «Người cùng cung»; her pets in the host's copy) */
 if(!process.env.COOP_PETS_NOMERGE){const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);await press(A);await press(B);ok(await weekWait(A,wk)&&await weekWait(B,wk),'set-up week merged');await clear(A);await clear(B);
  ok(await waitFr(A,REALL.REAL)&&await waitFr(B,REALL.REAL),'set-up is real on both seats (consort entry, own palace)',[await DBGF(A),await DBGF(B),await A.p.evaluate(()=>({rk:window.__rk,logs:(S.logs||[]).slice(-14)})),await B.p.evaluate(()=>({rk:window.__rk,logs:(S.logs||[]).slice(-14)}))])}
 if(process.env.COOP_PETS_PROBE){for(const t of [3000,15000]){await sleep(t);const hs=async o=>o.p.evaluate(()=>{const f=COOPW.friend();return f?{fRank:f.rank,fRes:f.resHead,fPets:(f.pets||[]).map(P=>P.t+'/'+Math.round(P.full)),same:sameHouse(S,f),hm:houseOf(S),hf:houseOf(f)}:null});
   console.log('PROBE',t,JSON.stringify({A:await DBGF(A),B:await DBGF(B),Ah:await hs(A),Bh:await hs(B),Ap:await DBG5(A)}))}await b.close();process.exit(0)}
 /* review/coop-guest-staff: waited like the next two checks (read once, it raced the friend entry's build after the rank/pet set-up: [false,false] in 2 of 7 runs) */
 ok(await waitFr(A,()=>!!COOPW.friend())&&await waitFr(B,()=>!!COOPW.friend()),'each has the other as a consort entry',[await DBGF(A),await DBGF(B)]);
 ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.pets||[]).length===2}),'A\'s friend entry shows B\'s 2 pets (live pos)');
 ok(await waitFr(B,()=>{const f=COOPW.friend();return f&&(f.pets||[]).length===1}),'B\'s friend entry shows A\'s pet');
 /* 1 help */
 {const sy=await REALL.syncFr(A,B);ok(sy===true,'A\'s entry of B shows her real pets before A aims',sy)}
 const tgH=await A.p.evaluate(()=>{const f=COOPW.friend();return f.pets[petTarget(f)].t});const b0=await myPets(B);const rl0=await B.p.evaluate(()=>(S.rl||{})[COOPW.seat==='a'?902:901]||0);
 const h=await act(A,'petcare',false);ok(h.okk&&/giúp/.test(h.r),'A: Giúp chăm thú (petcare) is allowed on the friend and runs',h);
 ok(await waitFr(B,()=>/được chăm/.test(JSON.stringify(Q)+((document.getElementById('modal')||{}).textContent||''))),'B sees the help note (Hảo hữu sang giúp)');
 await B.p.screenshot({path:OUT+'/01-help-note-guest.png'});
 const b1=await myPets(B);const p0=b0.find(x=>x.t===tgH),p1=b1.find(x=>x.t===tgH);
 ok(p0&&p1&&p1.full===Math.min(100,p0.full+25),'B\'s own pet ('+tgH+'): No +25',[p0,p1]);
 ok(await B.p.evaluate(()=>(S.rl||{})[COOPW.seat==='a'?902:901]||0)>rl0,'B: thiện cảm toward A went up');
 await clear(B);
 /* 1b gift an item to the friend (Tặng quà = invite → she accepts → her own Quà tặng dialog → the item is in HER bag) */
 {await A.p.evaluate(()=>{S.inv=S.inv||[];S.inv.push({k:'tramngoc'});render()});const n0=await B.p.evaluate(()=>(S.inv||[]).filter(e=>e.k==='tramngoc').length);
  const r=await A.p.evaluate(()=>{const f=COOPW.friend();const ix=S.inv.findIndex(e=>e.k==='tramngoc');return String(runAct(S,f,'gift',ix))});ok(/ngỏ ý/.test(r),'A: Tặng quà sends the invite',r);
  ok(await waitFr(B,()=>/Hảo hữu tìm đến/.test(JSON.stringify(Q)+((document.getElementById('modal')||{}).textContent||''))),'B gets the gift invite card');
  {const t0=Date.now();while(Date.now()-t0<20000){await clear(B);if(await B.p.evaluate(n=>(S.inv||[]).filter(e=>e.k==='tramngoc').length>n,n0))break;await sleep(400)}}
  ok(await B.p.evaluate(n=>(S.inv||[]).filter(e=>e.k==='tramngoc').length===n+1,n0),'B: the hairpin is in her own bag (Quà tặng dialog kept it)',await B.p.evaluate(()=>(window.__seen||[]).slice(-3)));
  ok(await A.p.evaluate(()=>!S.inv.some(e=>e.k==='tramngoc')),'A: the hairpin left her bag');
  /* item ledger (review/item-ledger-solo): the live path carries the gift; A's ledger only records it — one gift = one item, never also in A's store */
  if(await A.p.evaluate(()=>typeof ilS==='function')){const L=await A.p.evaluate(()=>{try{ilCensus()}catch(e){}const I=ilS();return{box:I.box.filter(x=>x.e&&x.e.k==='tramngoc').length,sent:I.log.some(l=>l[2]==='tramngoc'&&/hảo hữu/.test(l[5])),net:I.net}});
   ok(L.box===0&&L.sent&&L.net===0,'A ledger: gift logged "sang hảo hữu", not in her box, no net (one gift = one item)',L);
   ok(await B.p.evaluate(n=>{let c=(S.inv||[]).filter(e=>e.k==='tramngoc').length;try{c+=ilS().box.filter(x=>x.e&&x.e.k==='tramngoc').length}catch(e){}return c===n+1},n0),'B: exactly one hairpin arrived (chest + store)')}
  await clear(A)}
 /* 2 harm (forced success): B loses her best pet (petTarget), the follow bonus leaves once */
 const sb0=await B.p.evaluate(()=>({pets:(S.pets||[]).map(P=>P.t),on:S.petOn,b:S.petB,bn:S.petBn,stats:{sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc,danh:S.danh,th:S.th}}));
 {const sy=await REALL.syncFr(A,B);ok(sy===true,'A\'s entry of B shows her real pets before A aims',sy)}
 const tgt=await A.p.evaluate(()=>{const f=COOPW.friend();return f.pets[petTarget(f)].t});
 const hm=await act(A,'thaopet',true);ok(hm.okk,'A: Hại thú nuôi (thaopet) allowed on the friend',hm);
 ok(await waitFr(B,()=>!(S.pets||[]).some(P=>P.t===window.__tg),5000)||await B.p.evaluate(t=>!(S.pets||[]).some(P=>P.t===t),tgt),'B lost '+tgt);
 const sb1=await B.p.evaluate(()=>({pets:(S.pets||[]).map(P=>P.t),on:S.petOn,b:S.petB,bn:S.petBn,stats:{sac:S.sac,tai:S.tai,tamco:S.tamco,duc:S.duc,danh:S.danh,th:S.th}}));
 {const d={};for(const k in sb0.stats)if(sb1.stats[k]!==sb0.stats[k])d[k]=sb1.stats[k]-sb0.stats[k];
  /* expected: the old follower's bonus off, the new follower's bonus on (if any), nothing else, never twice */
  const exp={};if(sb0.b)exp[sb0.b]=(exp[sb0.b]||0)-(sb0.bn||1);if(sb1.b)exp[sb1.b]=(exp[sb1.b]||0)+(sb1.bn||1);for(const k in exp)if(!exp[k])delete exp[k];
  ok(JSON.stringify(Object.entries(d).filter(([k])=>k!=='danh'&&k!=='th').sort())===JSON.stringify(Object.entries(exp).sort()),'B: stats changed only by the follow bonus, once',{d,exp,sb0,sb1})}
 await B.p.screenshot({path:OUT+'/02-harm-note-guest.png'});await clear(B);
 /* 3 steal (forced): give B one more pet first */
 await B.p.evaluate(()=>{const P=petAdd(S,'tho','thử','buy');P.stg=2;P.full=60;petcSync(P);render()});
 ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.pets||[]).some(P=>P.t==='tho')}),'A sees B\'s new rabbit');
 {const sy=await REALL.syncFr(A,B);ok(sy===true,'A\'s entry of B shows her real pets before A aims',sy)}
 const tg2=await A.p.evaluate(()=>{const f=COOPW.friend();return {t:f.pets[petTarget(f)].t,stg:f.pets[petTarget(f)].stg}});
 const nA0=await A.p.evaluate(()=>(S.pets||[]).length);
 const st=await act(A,'petsteal',true);ok(st.okk&&/mang/.test(st.r),'A: Trộm thú (petsteal) runs',st);
 ok(await A.p.evaluate(([n,t])=>(S.pets||[]).length===n+1&&S.pets.some(P=>P.t===t.t&&(P.stg|0)===t.stg),[nA0,tg2]),'A has the stolen pet with its stage',tg2);
 ok(await waitFr(B,()=>!(S.pets||[]).some(P=>P.t===window.__x),3000)||await B.p.evaluate(t=>!(S.pets||[]).some(P=>P.t===t),tg2.t),'B no longer has it');
 await clear(A);await clear(B);
 /* 4 week merge: pets agree on both sides */
 {const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);await press(A);await press(B);ok(await weekWait(A,wk)&&await weekWait(B,wk),'week 1 merged');await clear(A);await clear(B);
  await samePets(A,B,'after week 1')}
 /* 5 late res: B ends the week first, THEN A helps her; the help must be in the merged week */
 {await B.p.evaluate(()=>{for(const P of S.pets||[]){P.full=30;petcSync(P)}render()});await sleep(1500);
  const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);
  /* review/coop-guest-staff: under jnf co-op the guest's night needs the HOST's flip (host endTurn) and the host's {fin}; a dialog the host
     holds BEFORE its flip holds the guest's night too, so B can never end first that way. Real order now: both close tối, the host's flip +
     the one choice resolve (S.nfFin = today, {fin} sent to B), and at THAT moment the host's player opens a dialog and keeps it open
     (setter on S.nfFin, synchronous: nothing of A's own night or week end can slip in first). B then plays her own night and ends first. */
  await A.p.evaluate(()=>{window.__hold=0;const s=S;let v=s.nfFin;Object.defineProperty(s,'nfFin',{configurable:true,enumerable:true,get:()=>v,
    set:x=>{v=x;try{if(!window.__hold&&x===(typeof wk==='function'?wk():(S.turn*3+(S.tuan||0)))){/* jnf day(), private there */window.__hold=1;pushModal({t:"Chờ",h:"<p>Chờ</p>"});window.__holdQ=Q[Q.length-1];window.__holdRe=0;window.__holdW=setInterval(()=>{try{if(window.__hold===1&&!Q.includes(window.__holdQ)){window.__holdRe++;window.__holdWhy=(window.__holdWhy||[]).concat([{wk:__co().week,sent:COOPW.sent,m:!$('modal').hidden}]);Q.unshift(window.__holdQ)}}catch(e){}},20);window.__sentAtHold={sent:COOPW.sent,wk:__co().week,q:Q.length,pend:COOPW.pend,tr:(COOPW.tr||[]).slice(-8)}}}catch(e){}}})});
  await press(A);await press(B);
  /* both choices resolve (the 10-second clock); keep clearing B only, and A only until its hold is up */
  {const t0=Date.now();while(Date.now()-t0<90000){if(await B.p.evaluate(()=>COOPW.sent===__co().week))break;
    if(!await A.p.evaluate(()=>window.__hold))await clear(A);await clear(B);await sleep(300)}}
  ok(await A.p.evaluate(()=>!!window.__hold&&COOPW.sent!==__co().week&&Q.includes(window.__holdQ)),'A holds a dialog after the flip, her end not sent',await A.p.evaluate(()=>({hold:window.__hold,re:window.__holdRe,why:window.__holdWhy,at:window.__sentAtHold,sent:COOPW.sent,wk:__co().week,nfFin:S.nfFin,inQ:Q.includes(window.__holdQ),tr:(COOPW.tr||[]).slice(-14)})));
  ok(await B.p.evaluate(()=>COOPW.sent===__co().week),'B ended the week (end sent)');
  ok(await waitFr(A,()=>{const f=COOPW.friend();return f&&(f.pets||[]).length>0}),'A still sees B\'s pets');
  /* r2: the res relay of the late help, both ends (what A sent, what reached B) for a failure dump */
  await B.p.evaluate(()=>{window.__resIn=[];COOP.on('res',m=>{try{__resIn.push({id:m.id,k:m.k,from:m.from,pet:m.pet,sent:COOPW.sent,wk:__co().week})}catch(e){}})});
  await A.p.evaluate(()=>{window.__resOut=[];const s0=COOP.send;COOP.send=function(m){try{if(m&&(m.t==='res'||m.t==='actr'))__resOut.push({t:m.t,id:m.id,k:m.k,pet:m.pet,ack:m.ack})}catch(e){}return s0.apply(this,arguments)};COOP.on('actr',m=>{try{if(m.from!==COOPW.seat)__resOut.push({in:'actr',id:m.id,ack:m.ack})}catch(e){}})});
  {const sy=await REALL.syncFr(A,B);ok(sy===true,'A\'s entry of B shows her real pets before A aims (late help)',sy)}
  const before=await myPets(B);await B.p.evaluate(f=>{window.__f0=f},Math.max(...before.map(x=>x.full)));const aim=await A.p.evaluate(()=>{const f=COOPW.friend();const P=f&&f.pets[petTarget(f)];return P?{t:P.t,at:P.at||0,full:Math.round(P.full)}:null});const hh=await act(A,'petcare',false);ok(hh.okk&&/giúp/.test(hh.r),'A helps B after B ended',hh);
  ok(!!aim&&before.some(x=>x.t===aim.t&&x.at===aim.at),'the pet A aims at is one B really has (friend entry not stale)',{aim,before});
  {const lh=await waitFr(B,()=>(S.pets||[]).some(P=>P.full>=window.__f0+25||P.full>=100));ok(lh,'B applied the late help',lh?await myPets(B):{B:await DBG5(B),A:await DBG5(A)})}
  /* r2: deterministic release. A random host-side dialog (a visitor's kit choice, e.g. Hà cô cô) can be pushed while the hold is up; A's player
     answers EVERY dialog in her queue (the first open choice, or closes it) until her queue is empty, then ends her week */
  await A.p.evaluate(()=>{window.__hold=2;clearInterval(window.__holdW);const i=Q.indexOf(window.__holdQ);if(i>=0)Q.splice(i,1);const s=S,v=s.nfFin;delete s.nfFin;s.nfFin=v;try{showModal();render()}catch(e){}});
  {const t0=Date.now();const drain=[];while(Date.now()-t0<30000){const st=await clear(A);const n=await A.p.evaluate(()=>Q.length);if(!n&&st!=='x')break;
    if(n&&st!=='x')drain.push(await A.p.evaluate(()=>{const m=Q[0];const t=String(m&&(m.t||'')).slice(0,40);try{if(m&&m.opts){const k=m.opts.findIndex(o=>o&&!o.off);chooseM(k<0?0:k)}else closeModal()}catch(e){Q.shift()}try{showModal();render()}catch(e){}return t}));await sleep(250)}
  if(drain.length)console.log('step 5 release: answered by hand',JSON.stringify(drain))}
  await press(A);{const w2=await weekWait(A,wk)&&await weekWait(B,wk);ok(w2,'week 2 merged',w2?undefined:{A:await DBG5(A),B:await DBG5(B)})}await clear(A);await clear(B);
  const after=await myPets(B);const t0=before.find(x=>true);
  ok(after.some(x=>x.full>=Math.min(100,Math.max(...before.map(y=>y.full))+25)),'merged week keeps the late help',{before,after});
  await samePets(A,B,'after week 2')}
 /* 6 stress: random pet acts both ways, one week per round */
 for(let r=0;r<ROUNDS;r++){
  for(const o of [A,B])await o.p.evaluate(()=>{if((S.pets||[]).length<2){const k=pick(['meo','cho','tho','hoami','cachep']);if(!(S.pets||[]).some(P=>P.t===k)){const P=petAdd(S,k,'thử','buy');if(P){P.stg=1;petcSync(P)}}}S.bac=Math.max(S.bac||0,100);render()});
  await sleep(1500);
  for(let i=0;i<4;i++){const o=i%2?B:A;const k=['petcare','thaopet','petsteal'][Math.floor(Math.random()*3)];await act(o,k,Math.random()<.5);await sleep(300)}
  const wk=await A.p.evaluate(()=>__co().week);await toLast(A,B);
  if(r%2){await press(B);await act(A,'petcare',false);await press(A)}else{await press(A);await press(B)}
  {const w=await weekWait(A,wk)&&await weekWait(B,wk);const dbg=async o=>o.p.evaluate(()=>({co:__co(),sent:COOPW.sent,pend:COOPW.pend,rp:Object.keys(COOPW.rpend||{}).length,Q:Q.map(m=>String(m&&(m.t||m.pid)||'').slice(0,30)),mg:!!S.mg,dead:!!S.dead,b:S.buoi,nx:[document.getElementById('next').disabled,document.getElementById('next').textContent],cyHold:COOPW.cyHold,cyHer:COOPW.cyHer?COOPW.cyHer():null,ended:COOP.state.ended,inLife:!!COOPW.inLife,tr:COOPW.tr.slice(-16)})).catch(e=>'dbg err '+e.message);
   ok(w,`stress round ${r+1}: week merged`,w?undefined:[await dbg(A),await dbg(B)])}await clear(A);await clear(B);await samePets(A,B,`stress round ${r+1}`)}
 await A.p.screenshot({path:OUT+'/03-host-end.png'});
 for(const o of [A,B])ok(!o.errs.length,o.name+': no page errors',o.errs.slice(0,5));
 const bad=res.filter(r=>!r[0]);console.log(`\n${res.length-bad.length}/${res.length} passed`);fs.writeFileSync(OUT+'/result.txt',res.map(r=>(r[0]?'ok  ':'FAIL')+' '+r[1]).join('\n')+'\n');
 await b.close();process.exit(bad.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
