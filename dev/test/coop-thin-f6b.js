/* Co-op thin guest, part F6b (review/coop-thin-f6b): the remaining mini-game ends are ONE score intent each (level 12).
   Harness = coop-thin-f5.js (same rows machinery: her phone plays, the end is the intent, a twin on a CLONE of her person runs the old road).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f6b.js <workerURL> [level=12] [swap=0]   (TRIP=1, LAG, CPU, ROWS=E1,V1)
   level 10/11 = the old road for these ends (BEFORE column of latency + tripwire). Rows: E exam (exEnd) · K entry selections (kcPhucEnd,
   kc2ExamEnd, kc2SelEnd) · V veil craft (vlCraftEnd + the held cost) · R Chải chuốt (wdGroomEnd) · M the mirror (toilFinish) · T the steal
   game before her deck card (stealEnd) · A the Tự học deck card (aaMG: the card marked used on the host) · C a start run in her context on
   the HOST (a part-D card): the game opens on HER phone · D1 double end.
   (F5 header, kept:) Co-op thin guest, part F5 (review/coop-thin-f5): her mini-game SCORE ends are intents run on the host (TH.F.reg, level 10).
   Two Playwright clients in one room, host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Harness = coop-thin-f4.js.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f5.js <workerURL> [level=10] [swap=0]   (TRIP=1, OUT=<dir>, LAG=<ms>, CPU=<rate>, SHOTS=<dir>, ROWS=P1,L1)
   level 9 = the old road for these ends (her phone runs them: the BEFORE column of latency + tripwire; rows only check nothing was sent).
   The game plays on HER phone (kg82Play forced to a raw score: the real end chain runs: rows → «Đã hiểu» → onDone → the end engine); the
   start (pickers, the deferred cost put back) stays on her phone. Rows: P pet care (petcGain) · G shelf plant (shelfPlantGain) · L Tài nghệ
   lessons (wkLessonEnd + artLessonGain, the deferred cost aaPayMG) · W Tự học làm tác phẩm · M Học lối mới · T Tứ đức (tdFinish) · S the
   summons (tsSummonEnd) · N the lantern (tsDenEnd) · max / zero / over-max (refused: nothing applied) / quick plays (rolled on the HOST: her
   phone forced to the other outcome) · D1 double end · "same as solo": every applied row also runs the end on a CLONE of her person with
   the old road (Math.random fixed on both phones) and the deltas must match. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||12);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  /* P10 a dead socket on her phone (as coop-thin-e-net): while __mute her `do` frames are dropped, while __deafThin the host's views
     ("t":"delta" / "snap") never reach her; __wss = her sockets (closed by the test → COOP reconnects, "room") */
  if(name==='guest')await ctx.addInitScript(()=>{const W0=window.WebSocket,s0=W0.prototype.send;window.__wss=[];window.__drop=[];window.__lostV=0;
   W0.prototype.send=function(d){if(window.__mute&&typeof d==='string'&&d.indexOf('"t":"do"')>=0){window.__drop.push(d.slice(0,120));return}return s0.apply(this,arguments)};
   window.WebSocket=function(u,p){const s=p===undefined?new W0(u):new W0(u,p);window.__wss.push(s);s.addEventListener('message',ev=>{if(window.__deafThin&&typeof ev.data==='string'&&/"t":"(delta|snap)"/.test(ev.data)){window.__lostV++;ev.stopImmediatePropagation()}});return s};
   window.WebSocket.prototype=W0.prototype;Object.assign(window.WebSocket,{CONNECTING:0,OPEN:1,CLOSING:2,CLOSED:3})});
  /* LAG=<ms>: a 4G profile on this phone: every socket message out and in waits LAG ms (order kept) */
  if(+process.env.LAG)await ctx.addInitScript(L=>{const W=window.WebSocket;const P=function(u,p){const s=p===undefined?new W(u):new W(u,p);const snd=s.send.bind(s);
    s.send=d=>setTimeout(()=>{try{if(s.readyState===1)snd(d)}catch(e){}},L);let h=null;Object.defineProperty(s,'onmessage',{configurable:true,get(){return h},set(f){h=f}});
    W.prototype.addEventListener.call(s,'message',e=>setTimeout(()=>{try{h&&h.call(s,e)}catch(x){console.error(x)}},L));return s};
   P.prototype=W.prototype;for(const k of ['CONNECTING','OPEN','CLOSING','CLOSED'])P[k]=W[k];window.WebSocket=P},+process.env.LAG);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|fonts\.gstatic|CORS/.test(m.text()))o.errs.push('console: '+m.text().slice(0,300))});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<12;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once',okw?undefined:[await A.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent})),await B.p.evaluate(()=>({w:COOP.state.week,b:S.buoi,pend:COOPW.pend,sent:COOPW.sent,Q:Q.map(q=>q.t).slice(0,3),dis:document.getElementById('next').disabled,nt:document.getElementById('next').textContent,log:COOPW.thin.C.log.slice(-5),modal:(document.getElementById('modal')||{}).hidden,q0:Q[0]&&Object.keys(Q[0]).join(','),q0p:Q[0]&&(Q[0].pid||Q[0].ev||''),mg:!!S.mg,km:document.querySelectorAll('.kmov').length,fr:COOP.frozen,cy:COOPW.cyHold,dead:S.dead}))]);await sleep(1500);return okw}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=process.env.SHOTS?[755,1000]:[686,880],IPAD=[1180,820];/* SHOTS=<dir outside git>: the owner's devices Fold 755x1000@2 + iPad 1180x820@2 */
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 if(+process.env.CPU){const c=await H.ctx.newCDPSession(H.p);await c.send('Emulation.setCPUThrottlingRate',{rate:+process.env.CPU})}/* CPU=4: the host phone ×4 slower */
 /* PROF=1: where the host's time goes in her intent (withSeat in/out, each ctxOut step, the F run, the view flush) */
 if(process.env.PROF)await H.p.evaluate(()=>{const TH=COOPW.thin,P=window.__prof={};const add=(k,ms)=>{const e=P[k]||(P[k]={n:0,t:0,mx:0});e.n++;e.t+=ms;e.mx=Math.max(e.mx,ms)};
  const w0=TH.withSeat;TH.withSeat=function(seat,fn){if(seat===COOPW.seat)return w0.apply(this,arguments);const t0=performance.now();let tin=null;
   try{return w0.call(this,seat,function(){tin=performance.now();try{return fn.apply(this,arguments)}finally{add('ws.fn',performance.now()-tin);tin=performance.now()}})}finally{add('ws.total',performance.now()-t0);if(tin)add('ws.out',performance.now()-tin)}};
  TH.ctxOut.forEach((f,i)=>{TH.ctxOut[i]=function(){const t0=performance.now();try{return f.apply(this,arguments)}finally{add('ctxOut'+i,performance.now()-t0)}}});
  if(TH.flush){const f0=TH.flush;TH.flush=function(){const t0=performance.now();try{return f0.apply(this,arguments)}finally{add('flush',performance.now()-t0)}}}
  if(TH.hostView){const h0=TH.hostView;TH.hostView=function(){const t0=performance.now();try{return h0.apply(this,arguments)}finally{add('hostView',performance.now()-t0)}}}});
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;/* the test's rank is staged, not earned: her rank set counted as seen (jpromo prCheck), else the host gives it at her first act (L13) and the twin differs */S.prSeen={r:3,s:null};S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const ON=LVL>=12;/* level 10 = F5 on; below = the old road (her phone runs it: the BEFORE column of latency / tripwire) */
 /* helpers in both pages: her person's summary (bạc, the bag as a multiset, worn flags, wd slots, veil, khắc, newest log line), the item locator (law 6c) */
 const HELP=()=>{window.__sum=s=>{const inv=(s.inv||[]).filter(e=>e&&!e.h).map(e=>e.k+(e.w?'*':'')+(e.t?'!'+e.t:'')).sort();const wd=s.wd?{tram:s.wd.tram&&s.wd.tram.k,y:s.wd.y&&s.wd.y.k}:null;
   return {bac:s.bac,inv,wd,vl:s.vl&&s.vl.k||null,log:String((s.logs||[])[0]||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,90),nlog:(s.logs||[]).length,suc:s.suc,sac:s.sac,danh:s.danh,duc:s.duc}};
  window.__iu3=tag=>{const B=COOPW.seat==='a'&&COOPW.thin.seatOf?COOPW.thin.seatOf('b'):null;const I=(B&&B.S&&B.S.inv)||[];const e=I.find(x=>x&&x.tg3===tag)||S.inv.find(x=>x&&x.tg3===tag);return e&&e.iu!=null?e.iu:null};
  window.__her=()=>{if(COOPW.seat==='a'){return COOPW.thin.withSeat('b',()=>Object.assign(__sum(S),{used}))}return Object.assign(__sum(S),{used})};
  window.__where3=(tag,iu,k)=>{const L=[];const hit=e=>!!e&&(e.tg3===tag||(iu!=null&&e.iu===iu&&(!k||e.k===k)));const scan=(who,arr)=>{for(const e of arr||[])if(hit(e))L.push(who+':'+e.k)};scan('host',S.inv);const B=COOPW.thin.seatOf&&COOPW.thin.seatOf('b');scan('her',B&&B.S&&B.S.inv);
   for(const v of rivals||[])if(v&&!v.coop)scan('npc'+v.id,v.inv);for(const s of [S,B&&B.S])try{for(const x of (s&&s.il&&s.il.box)||[])if(x&&hit(x.e))L.push('il:'+x.at)}catch(e){}
   for(const s of [S,B&&B.S])try{for(const sl of ['tram','y'])if(s&&s.wd&&hit(s.wd[sl]))L.push('wd:'+sl);for(const x of (s&&s.wdPawn)||[])if(x&&hit(x.e))L.push('pawn')}catch(e){}return L}};
 await H.p.evaluate(HELP);await G.p.evaluate(HELP);
 /* stage her person in the HOST's store (her context) → the patch reaches her phone (never written on her phone) */
 const stage=async src=>{const r=await H.p.evaluate(src=>{try{return COOPW.thin.withSeat('b',()=>{const o=(0,eval)('(function(){'+src+'})')();/* every staged piece gets its ledger id now (the game gives it lazily): the same piece is traced by it after giveTo hands over a new entry */for(const e of S.inv||[])if(e&&e.tg3&&e.iu==null&&typeof ilUid==='function')ilUid(e);return o})}catch(e){return 'EXC '+e.message}},src);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();await sleep(300);return r};
 await stage("S.bac=Math.max(S.bac||0,3000);S.suc=60;S.confined=0;S.out=0;if(S.maid){S.maid.loyal=80;delete S.maid.spyFor}");
 {const a=await G.p.evaluate(()=>__her()),b=await H.p.evaluate(()=>__her());console.log('setup (info): her bag on her phone',a.inv.length,'· the host\'s copy',b.inv.length,'(her own changes reach the host in her next intent / ready diff: E / F1)')}
 /* harness staging (not game code): her phone's starting bag is copied into the host's store once, so every row starts with the
    two copies equal (in play her bag reaches the host in her first intent / ready diff, contract E); proves the E1/E2 'same' reds of #1
    were this staging gap, not a twin-state fault */
 {const inv=await G.p.evaluate(()=>JSON.stringify(S.inv||[]));await stage('S.inv='+inv+';');await sync();await sleep(800);
  /* the host's view now holds the same bag: her phone keeps its own copy (the view delta added the pieces a second time there) */await G.p.evaluate(inv=>{S.inv=JSON.parse(inv);render()},inv);
  const a=await G.p.evaluate(()=>__her()),b=await H.p.evaluate(()=>__her());ok(JSON.stringify(a.inv)===JSON.stringify(b.inv),'setup: her bag staged on the host = her phone',{phone:a.inv.length,host:b.inv.length})}
 const table=[];const trip=()=>TRIPSRC?G.p.evaluate(()=>window.__trip&&__trip()).catch(()=>null):null;const tw0=await trip();
 const pick=src=>G.p.evaluate(src=>(0,eval)('(function(){'+src+'})')(),src);
 const ROWS=process.env.ROWS?process.env.ROWS.split(','):null;
 /* F5 summary: pets, shelf plants, arts (level/progress), Tứ đức, favour, the work count */
 const HELP5=()=>{const s0=window.__sum;window.__sum=s=>Object.assign(s0(s),{pets:(s.pets||[]).map(P=>P.t+':'+Math.round(P.full||0)+'/'+Math.round(P.clean||0)+'/'+Math.round(P.joy||0)+'/'+Math.round(P.aff||0)).join(','),
   shelf:Object.entries((s.shelf&&s.shelf.g)||{}).filter(([g,e])=>e&&e.pc!=null).map(([g,e])=>g+':'+e.pc).sort().join(','),arts:JSON.stringify(s.arts||{}),artp:JSON.stringify(s.artp||{}),vir:JSON.stringify(s.vir||{}),
   sung:s.sung,an:s.an||0,th:s.th,mg:s.mg?s.mg.k+':'+s.mg.mode+(s.mg.cost?':c':''):null,nwk:(s.inv||[]).filter(e=>e&&e.wk).length})};
 await H.p.evaluate(HELP5);await G.p.evaluate(HELP5);
 const reset=async()=>{for(let i=0;i<3;i++){await clear(H);await clear(G)}await G.p.evaluate(()=>{Q.length=0;used=0;window.__aaPend=null;try{kg82Close()}catch(e){}try{closeModal()}catch(e){}render()});await H.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}const T=COOPW.thin.F.f6bStart;if(T)for(const k in T)delete T[k]})};
 /* her phone: the game's play forced to a raw score (the real end chain runs from there); Math.random fixed on a phone (rolls) */
 await G.p.evaluate(()=>{window.__kp0=kg82Play;kg82Play=function(kind,onEnd){if(window.__raw==null)return window.__kp0.apply(this,arguments);const r=window.__raw;setTimeout(()=>onEnd(r),0)};
  window.__aaN=0;const a=window.aaShowLast;window.aaShowLast=function(){window.__aaN++;return a.apply(this,arguments)}});
 const rnd=(o,v)=>o.p.evaluate(v=>{if(!window.__mr0)window.__mr0=Math.random;Math.random=v==null?window.__mr0:()=>v},v);
 const D=(b,a)=>{const o={};for(const k of ['suc','bac','sac','danh','duc','sung','an','th','nwk'])o[k]=(a[k]||0)-(b[k]||0);for(const k of ['inv','pets','shelf','arts','artp','vir','mg'])o[k]=a[k];return o};
 /* one end from her phone. o.pre = the start + the game opened and played (her phone); src = the end tap; o.twin = the same end on a CLONE
    of her person, old road (level 7, Math.random = o.r on her phone) → its delta must equal the real one. o.reject: the host refuses it. */
 const act=async(tag,src,o={})=>{if(ROWS&&!ROWS.some(x=>tag.startsWith(x)))return {skip:1};await until(G,()=>!COOPW.thin.F.pend,null,20000);await reset();if(o.stage)await stage(o.stage);await sync();
  await G.p.evaluate(r=>{window.__raw=r},o.raw==null?null:o.raw);
  if(process.env.DBG)console.log('DBGEX',tag,JSON.stringify([await G.p.evaluate(()=>[S.ex,(()=>{try{return COOPW.thin.E.base(COOPW.thin.view).ex}catch(e){return 'nb '+e.message}})()]),await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>S.ex))]));
  if(o.pre){const e=await pick('Q.length=0;try{closeModal()}catch(e){}'+o.pre);if(e)console.log(tag,'pre:',JSON.stringify(e).slice(0,300))}await sleep(o.wait||400);
  if(o.pre2){await until(G,()=>!COOPW.thin.F.pend,null,20000);await sleep(600);const e=await pick(o.pre2);if(e)console.log(tag,'pre2:',JSON.stringify(e).slice(-700));await sleep(o.wait2||900)}
  const r0=o.r==null?0.5:o.r;await rnd(G,o.hr!=null?o.hr:r0)/* the twin rolls as the host will */;
  const twin=o.twin&&ON&&!process.env.NOTWIN?await G.p.evaluate(src=>{const TH=COOPW.thin;const S0=S,u0=used,lv=TH.lvl,lw=COOPW.lvWas,ap=window.__aaPend,q0=Q.slice(),fx=window.aaCardTo,tq=TDS.q;const C=JSON.parse(JSON.stringify(S0));let out=null,err=null;
    S=C;TH.lvl=7;COOPW.lvWas=7;window.aaCardTo=()=>{};/* the twin's deferred steps (setTimeout: the rank edict's gifts, the next exam target) run on the CLONE before it is dropped, never later on her real person */const st0=window.setTimeout,DQ=[];window.setTimeout=(f,ms,...x)=>{if(typeof f==='function'&&(ms|0)<=2000){DQ.push(()=>f(...x));return 0}return st0(f,ms,...x)};try{const b=__sum(S);(0,eval)('(function(){'+src+'})')();for(let k=0;k<200&&DQ.length;k++){try{DQ.shift()()}catch(e){}}out={b,a:__sum(S),du:used-u0}}catch(e){err=e.message}finally{window.setTimeout=st0;S=S0;used=u0;TH.lvl=lv;COOPW.lvWas=lw;window.__aaPend=ap;window.aaCardTo=fx;TDS.q=tq;Q.length=0;Q.push(...q0)}return out||{err}},o.twin):null;
  await rnd(H,o.hr!=null?o.hr:r0);await rnd(G,o.gr!=null?o.gr:r0)/* her phone: the other outcome (it must never roll) */;
  const g0=await G.p.evaluate(()=>__her()),h0=await H.p.evaluate(()=>__her());const st0=await H.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{ms:0}));const gs0=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{ms:0},{aaN:window.__aaN}));
  const hc0=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  const r=await G.p.evaluate(src=>{const F=COOPW.thin.F;const s0=F.stat.sent,l0=F.stat.local;const t0=performance.now();let err=null;
   try{(0,eval)('(function(){'+src+'})')()}catch(e){err=String(e&&e.stack||e).slice(0,300)}const ms=Math.round(performance.now()-t0);
   const nx=document.getElementById('next');return {err,ms,pend:!!F.pend,next:!!(nx&&nx.disabled),sent:F.stat.sent-s0,local:F.stat.local-l0,id:F.pend&&F.pend.id,n:F.pend&&F.pend.n}},src);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,20000):false;const ansG=got?await G.p.evaluate(()=>COOPW.thin.F.lastAns):null;/* review f6b r1: her own answer, read at once (ptime-reds' due-task tick ptTickHer may answer after it and take lastAns) */
  await sleep(1500);await sync();await rnd(G,null);await rnd(H,null);
  if(o.shot&&process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const p of [H,G]){await tapText(p,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (never closed by this scripted run) */;await p.p.evaluate(()=>{for(const el of document.querySelectorAll('.nl-intro,#nlIntro,[data-nlintro]'))el.remove()}).catch(()=>{})}await sleep(1200);for(const p of [H,G]){const vp=p.p.viewportSize();await p.p.screenshot({path:path.join(process.env.SHOTS,`f6b-${o.shot}-L${LVL}-${p.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
  if(process.env.DBG)console.log('DBGPOST',tag,JSON.stringify([await H.p.evaluate(()=>[COOPW.thin.F.stat.prPost,COOPW.thin.withSeat('b',()=>[S.rank,S.ex,S.prSeen])]),await G.p.evaluate(()=>[COOPW.thin.F.stat.prSkip,S.rank,S.ex,S.prSeen])]));
  const g1=await G.p.evaluate(()=>__her()),h1=await H.p.evaluate(()=>__her());const st1=await H.p.evaluate(()=>COOPW.thin.F.stat);const gs1=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{aaN:window.__aaN}));const ans=ansG&&ansG.id===r.id?ansG:await G.p.evaluate(()=>COOPW.thin.F.lastAns);
  const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  const same=JSON.stringify(Object.assign({},g1,{log:0,nlog:0,used:0}))===JSON.stringify(Object.assign({},h1,{log:0,nlog:0,used:0}));
  const row={tag,r,got,st:ans&&ans.id===r.id&&ans.r0?ans.r0.st:null,ran:(st1.run||0)-(st0.run||0),ms:ans&&ans.id===r.id?ans.ms:null,g0,g1,h1,same,hostCard:hc1!==hc0,
   aaPaid:(st1.aaPaid|0)-(st0.aaPaid|0),aaCard:(st1.aaCard|0)-(st0.aaCard|0),aaN:(gs1.aaN|0)-(gs0.aaN|0),skip:(gs1.skip|0)-(gs0.skip|0),bad:(st1.mgBad|0)-(st0.mgBad|0),hlog:await H.p.evaluate(()=>[COOPW.thin.F.log.slice(-4),window.__tr&&window.__tr.slice(-4)])};
  if(twin&&twin.a){row.solo=D(twin.b,twin.a);row.solo.used=twin.du;row.real=D(g0,g1);row.real.used=g1.used-g0.used;if(o.noInv){delete row.solo.inv;delete row.real.inv}row.twinOk=JSON.stringify(row.solo)===JSON.stringify(row.real)}else if(twin)row.twinErr=twin.err;
  row.good=ON?(!r.err&&r.pend&&r.next&&r.sent===1&&r.local===0&&got&&same&&!row.hostCard&&(o.reject?(row.st==='gone'&&row.bad===1&&row.aaPaid===0):(row.st==='ok'&&row.ran===1&&(o.twin?row.twinOk===true:true)))&&(o.chk?o.chk(row):true))
   :(o.f5&&LVL>=10?r.sent===1&&row.st==='ok':r.sent===0)/* A1: the lesson end is already F5's intent at level 10; the old road: her phone runs it (a staged over-max / bad-kind end may throw there: solo never calls it so) */;
  const kd=(x,y)=>{const o={};for(const k of new Set([...Object.keys(x||{}),...Object.keys(y||{})]))if(JSON.stringify((x||{})[k])!==JSON.stringify((y||{})[k]))o[k]=[(x||{})[k],(y||{})[k]];return o};
  row.diff=row.solo?kd(row.solo,row.real):null;row.sameDiff=same?null:kd(Object.assign({},g1,{log:0,nlog:0,used:0}),Object.assign({},h1,{log:0,nlog:0,used:0}));
  if(process.env.DBG&&!row.good)console.log('DBG',tag,JSON.stringify(await G.p.evaluate(()=>({flog:COOPW.thin.F.log.slice(-6),st:COOPW.thin.F.stat,kg:!!document.getElementById('kg82'),ok:(document.getElementById('kg82ok')||{}).textContent,go:!!document.getElementById('kg82go'),ex:exS(S)}))).slice(0,1500));
  table.push(row);ok(row.good,`${tag}${ON?'':' (L'+LVL+' old road: local)'}`,row.good?{ms:row.ms,local_ms:r.ms}:{err:r.err,pend:r.pend,next:r.next,sent:r.sent,local:r.local,got,st:row.st,ran:row.ran,hostCard:row.hostCard,diff:row.diff,twinErr:row.twinErr,sameDiff:row.sameDiff,aaPaid:row.aaPaid,aaCard:row.aaCard,aaN:row.aaN,skip:row.skip,bad:row.bad,hlog:row.hlog,log:[g0.log,g1.log,h1.log]});return row};
 const KGO='document.getElementById("kg82go").click()',KOK='document.getElementById("kg82ok").click()',KSK='document.getElementById("kg82skip").click()';
 /* ---- F6b summary: her exam record, veils, the mirror record, her deck flags ---- */
 const HELP6=()=>{const s0=window.__sum;window.__sum=s=>Object.assign(s0(s),{ex:JSON.stringify(s.ex&&[s.ex.n||0,s.ex.last||null]||null)/* coop-thin-g-f1 (review r1 L3 staging): the sit count too — a second sit in the same turn with the same score (e.g. «Đã đỗ: chờ ghế» after L1) left e.last equal */,exw:s.ex?s.ex.w1:null,rank:s.rank,toil:s.toilette?[s.toilette.score,s.toilette.look,s.toilette.makeup,s.toilette.dv].join('/'):null,
   wd:s.wd?JSON.stringify({t:s.wd.tram&&s.wd.tram.k,y:s.wd.y&&s.wd.y.k}):null,nveil:(s.inv||[]).filter(e=>e&&/^vl/.test(e.k)).length,co:(s.ex&&s.ex.pend&&s.ex.pend.co)||(s.vlPend&&s.vlPend.co)||null});
  window.__clk=()=>{let n=0;const t=setInterval(()=>{if(++n>80){clearInterval(t);return}const g=document.getElementById('kg82go');if(g&&g.getClientRects().length){g.click();return}
   const k=document.getElementById('kg82ok');if(k&&!/Đã hiểu/.test(k.textContent)){k.click();return}if(k&&/Đã hiểu/.test(k.textContent))clearInterval(t)},150)};
  window.__hdeck=(f)=>COOPW.seat==='a'?COOPW.thin.withSeat('b',()=>f(deck)):f(deck)};
 await H.p.evaluate(HELP6);await G.p.evaluate(HELP6);
 /* ---- E: the exam (her exam) ---- */
 
 const est=`const e=exS(S);e.grace=e.to;e.w0=wk();e.w1=wk()+3;e.pend=null;e.cd=0;S.suc=80;`;
 const RW=r=>JSON.stringify(Array(NR).fill(r));
 const LIFT=await H.p.evaluate(()=>!!(COOPW.thin.gLift&&COOPW.thin.gLift.exam===12&&COOPW.thin.on(12)));
 /* a lifted kind's end is taken only after its start ran on the host: rows that open the game on her phone directly stage that start */
 const TOK=(k,v)=>`;{const T=COOPW.thin.F.f6bStart;if(T)(T[COOPW.ctx]=T[COOPW.ctx]||{}).${k}=${JSON.stringify(v==null?1:v)}}`;
 {const hr=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>S.rank));await G.p.evaluate(r=>{S.rank=r;render()},hr)}/* her phone's rank = the host's copy (a staged rank travels as a delta) */
 const NR=await pick(`try{return exPlanFull().rounds.length}catch(e){return 0}`);
 if(process.env.DBG)console.log('E dbg NR',NR,await pick(`return {elig:exElig(S),e:exS(S),rank:S.rank}`));
 const align=async()=>{const hr=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>S.rank));await G.p.evaluate(r=>{S.rank=r;render()},hr)};
 if(NR){await act('E1 exam played on her phone (every môn 9): same as solo',KOK,{stage:est+TOK('exam','me'),pre:`exStart();if(!document.getElementById('kg82go'))return 'no game';__clk()`,raw:9,wait:7000,twin:`exEnd('me',${RW(9)},[])`,noInv:1,chk:x=>(x.g1.ex!==x.g0.ex||x.g1.rank>x.g0.rank)/* passed with a free seat: the record moves to the next rank (exS) */&&x.g1.exw==null});
  await align();await act('E2 over-max (exEnd raw 11): refused, the window stays open',`exEnd('me',${RW(11)},[])`,{stage:est,reject:1,chk:x=>x.g1.ex===x.g0.ex&&x.g1.exw!=null});
  await align();await act('E3 every môn «Để tài nghệ quyết định» (exSkipRaw on the host): same as solo',`exEnd('me',${RW(0)},${JSON.stringify(Array(NR).fill(true))})`,{stage:est+TOK('exam','me'),twin:`exEnd('me',${RW(0)},${JSON.stringify(Array(NR).fill(true))})`,noInv:1,chk:x=>x.g1.ex!==x.g0.ex||x.g1.rank>x.g0.rank});
  if(LIFT){await align();await act('L2 forged exam end (no start ran on the host, the card lifted): refused',`exEnd('me',${RW(9)},[])`,{stage:est,reject:1,chk:x=>x.g1.ex===x.g0.ex});
   await align();const exK=await pick('return BAL.ex.suc');
   await act('L1 her exam deck card (lifted): act(i) on the host pays the start once, the game opens on HER phone, ONE end',KOK,{stage:est+`const c=exCard();if(c.lock)return 'locked';deck=deck.filter(x=>x&&!x.exam);deck.unshift(c);`,
    pre:`const i=deck.findIndex(a=>a&&a.exam);if(i<0)return 'no card: '+deck.map(a=>a&&a.n).join();act(i)`,pre2:`if(!document.getElementById('kg82go'))return 'no game '+JSON.stringify({uiN:COOPW.thin.uiN,la:COOPW.thin.F.lastAns&&{n:COOPW.thin.F.lastAns.n,ui:COOPW.thin.F.lastAns.ui,r0:COOPW.thin.F.lastAns.r0},kg:!!document.getElementById('kg82'),ov:(document.getElementById('ov')||{}).hidden,st:[COOPW.thin.F.stat.noCard,COOPW.thin.F.stat.exLocal],gerr:window.__gerr,modal:!!document.querySelector('#modal:not([hidden])'),Q:Q.map(q=>q.t)}).slice(-700);__clk()`,wait:600,wait2:7000,raw:9,
    chk:x=>x.g0.suc===80-exK&&(x.g1.ex!==x.g0.ex||x.g1.rank>x.g0.rank)})
   /* review r1: her page gone mid-exam (reload / app kill) after môn 1: her phone sends the solo end once (the môn played + exSkipRaw for the
      rest, solo exAbort); the start paid once; the window closed (no second card, no second pay) */
   await align();await act('L3 her page gone mid-exam (review r1): ONE solo end (môn 1 kept, the rest exSkipRaw), the start paid once, the window closed',`kg82Close();COOPW.thin.F.f6bExDrop();COOPW.thin.F.f6bGone()`,{stage:est+`const c=exCard();if(c.lock)return 'locked';deck=deck.filter(x=>x&&!x.exam);deck.unshift(c);`,
    pre:`const i=deck.findIndex(a=>a&&a.exam);if(i<0)return 'no card';act(i)`,pre2:`if(!document.getElementById('kg82go'))return 'no game';document.getElementById('kg82go').click()`,wait:600,wait2:1500,raw:9,
    twin:`exEnd('me',[9],[])`,noInv:1,chk:x=>x.g0.suc===80-exK&&(x.g1.ex!==x.g0.ex||x.g1.rank>x.g0.rank)&&x.g1.exw==null&&(x.h1.co==null)})}
  await align();await act('E4 no open window (a second end): refused',`exEnd('me',${RW(5)},[])`,{stage:`const e=exS(S);e.w0=e.w1=null;e.pend=null;`,reject:1})}
 else ok(true,'E no exam plan here (skipped)');
 await act('E5 servant exam without a window: refused',`exEnd('srv',[5],[])`,{reject:1});
 /* ---- K: entry selections (her life before the palace): the guards ---- */
 await act('K1 Phúc tuyển end outside the tiểu thư road: refused',`kcPhucEnd('cam',8,false)`,{reject:1});
 await act('K2 kc2ExamEnd without a round: refused',`kc2ExamEnd(7)`,{reject:1});
 await act('K3 kc2SelEnd without a selection: refused',`kc2SelEnd(7)`,{reject:1});
 /* ---- V: veil craft (the card, the held cost, the game) ---- */
 const vst=`S.suc=80;S.bac=Math.max(S.bac,3000);S.mg=null;`;
 const vpre=`pushDil(mkP('vlcraft'),'Kết mạng');showModal();if(!Q.length)return 'no card';chooseM(0);if(!document.getElementById('kg82go'))return 'no game: '+JSON.stringify(Q.map(q=>q.t));`;
 /* rv coop-thin-g r1: the solo twin of «Kết nhanh» takes main's deferred charge (mg-back r3, kgDefer: khắc + Sức are taken on «Sẵn sàng» / «Kết nhanh»;
    jveil vlCraftRun), the same twin fix coop-thin-f5 got (KGTW) */
 const vtw=(raw,sk)=>`${sk?'S.suc-=VL.craftSuc;spend(VL.craftK);':''}aaPayMG({title:'t',skip:${sk?1:0},ok:${raw>=5},raw:${sk?'null':raw}});vlCraftEnd(0,${raw},${!!sk})`;
 await act('V1 Kết bằng vải sa, played (raw 8): the veil made, cost once, same as solo',KOK,{stage:vst,pre:vpre+KGO,raw:8,wait:900,twin:vtw(8),chk:x=>x.aaPaid===1&&x.g1.inv.length===x.g0.inv.length+1,shot:'veil'});
 await act('V2 Kết nhanh: no veil, the material back, cost once',KSK,{stage:vst,pre:vpre,twin:vtw(5,1),chk:x=>x.aaPaid===1&&x.g1.inv.length===x.g0.inv.length});
 await act('V3 over-max (vlCraftEnd raw 11): refused',`vlCraftEnd(0,11,false)`,{stage:vst,reject:1});
 await act('V4 forged end (no start ran, no held cost): refused, nothing made or paid',`window.__aaPend=null;vlCraftEnd(1,8,false)`,{stage:vst,reject:1});
 await act('V5 forged held cost (review r1): Kết bằng ngọc played, its held bạc zeroed before the end: refused, nothing made or paid',`if(window.__aaPend)window.__aaPend.bac=0;`+KOK,{stage:vst,pre:vpre.replace('chooseM(0)','chooseM(2)')+KGO,raw:8,wait:900,reject:1});
 /* ---- R: Chải chuốt ---- */
 const rst=`S.suc=80;`;
 await act('R1 Chải chuốt «vùng giữa» (wdGroomEnd ok): same as solo',`wdGroomEnd('ok')`,{stage:rst,pre:`wdGroomUI();if(!document.getElementById('kg92go'))return 'no game'`,twin:`wdGroomEnd('ok')`,chk:x=>x.g1.used-x.g0.used===1});
 await act('R2 unknown zone: refused',`wdGroomEnd('far')`,{stage:rst,reject:1});
 await act('R3 no khắc left (review r1): refused, no khắc spent',`wdGroomEnd('ok')`,{stage:rst,pre:'used=BAL.time.khac;'/* her khắc clock rides in the intent ctx (F6a) */,reject:1});
 await G.p.evaluate(()=>{try{kg82Close()}catch(e){}});
 /* ---- M: the mirror ---- */
 const mst=`S.toilette=null;S.suc=80;`;const mpre=p=>`toilOpen();if(!TOIL.st)return 'no mirror';TOIL.st.parts=${JSON.stringify(p)};`;
 await act('M1 Điểm trang, played (brow .9 powder .8 son .7): same as solo',`toilFinish(true)`,{stage:mst+TOK('toil'),pre:mpre({brow:.9,powder:.8,son:.7}),twin:`toilFinish(true)`,chk:x=>x.g1.toil&&x.g1.toil!==x.g0.toil,shot:'mirror'});
 await act('M2 Điểm trang nhanh: the HOST rolls (host win, her phone forced to lose)',`toilFinish('quick')`,{stage:mst+TOK('toil'),pre:mpre({}),hr:0,gr:0.999,twin:`Math.random=()=>0;toilFinish('quick')`});
 if(LIFT)await act('M4 forged mirror end (no start ran on the host, lifted): refused',`toilFinish(true)`,{stage:mst,pre:mpre({brow:.9,powder:.8,son:.7}),reject:1});
 await act('M3 a part over 1 (brow 1.5): refused',`toilFinish(true)`,{stage:mst,pre:mpre({brow:1.5,powder:.5,son:.5}),reject:1});
 await G.p.evaluate(()=>{try{TOIL.st=null;kg82Close()}catch(e){}});
 /* ---- T: the steal game before her Tranh sủng card ---- */
 if(process.env.DBG)await G.p.evaluate(()=>{window.__gerr=[];window.addEventListener('error',e=>window.__gerr.push(String(e.message).slice(0,120)));const ce=console.error;console.error=function(){window.__gerr.push([...arguments].map(String).join(' ').slice(0,160));return ce.apply(this,arguments)}});
 if(process.env.DBG)await H.p.evaluate(()=>{const TH=COOPW.thin,t0=TH.tapRun;window.__tr=[];TH.tapRun=function(fn){const r=t0.call(this,fn);window.__tr.push(JSON.stringify(r.ui||null).slice(0,200));return r};const c0=TH.F.R.act;window.__actR=!!c0});
 const tcard=`const v=liveRivals(true).find(x=>x&&!x.coop);if(!v)return 'no rival';const a={n:'Tranh sủng',t:'t',c:stealCost('feign'),o:oSteal(S),w:{},l:{sung:-BAL.steal.failSung},x:'',__steal:1,go:()=>{log(stealWin(S,v,'feign'))}};deck=deck.filter(x=>x&&x.n!=='Tranh sủng');deck.unshift(a);return a.o;`;
 {const ho=await H.p.evaluate(src=>COOPW.thin.withSeat('b',()=>(0,eval)('(function(){'+src+'})')()),tcard);const go=await pick(tcard);const smOn=await pick(`return !!(BAL.steal&&BAL.steal.mg&&BAL.steal.mg.on)`);
  if(typeof ho==='number'&&typeof go==='number'&&smOn){
   const hd0=await H.p.evaluate(()=>COOPW.thin.F.stat.hDeal|0);
   await act('T1 Tranh sủng: the game on her phone (raw 9), the card run on the host once',KOK,{pre:`act(0)`,pre2:`if(!document.getElementById('kg82go'))return 'no game: '+JSON.stringify({d:deck.slice(0,2).map(a=>a&&[a.n,a.__g]),uiN:COOPW.thin.uiN,la:COOPW.thin.F.lastAns&&{n:COOPW.thin.F.lastAns.n,r0:COOPW.thin.F.lastAns.r0},flog:COOPW.thin.F.log.slice(-5),Q:Q.map(q=>q.t),modal:!!document.querySelector('#modal:not([hidden])')}).slice(0,900);`+KGO,raw:9,wait:900,
    chk:x=>x.ran===1});
   /* the card's own khắc can end her buổi: the host then deals her a new hand as her context closes (F6a, solo rule) → the used card is gone */
   const hd=await H.p.evaluate(h0=>__hdeck(d=>({n:d[0]&&d[0].n,done:d[0]&&d[0].done,steal:d.filter(a=>a&&a.n==='Tranh sủng'&&!a.done).length,redeal:(COOPW.thin.F.stat.hDeal|0)>h0})),hd0);if(!table.length||!table[table.length-1].tag.startsWith('T1'))ok(true,'T1b (row skipped)');else ok(ON?!!(hd&&(hd.done&&hd.n==='Tranh sủng'||hd.redeal&&!hd.steal)):true,'T1b her host-deck card used once (or a new hand dealt by its khắc)',hd);
   await act('T2 over-max (stealEnd raw 11): refused',`stealEnd({c:1,i:0,n:'Tranh sủng'},11,false)`,{reject:1})}
  else ok(true,'T steal game not on / no Tranh sủng card here (skipped)',{ho,go,smOn})}
 /* ---- A: the Tự học deck card (aaMG) ---- */
 {await rnd(H,0.1);await rnd(G,0.1);const ac=`const c=wkDeckCard();if(!c)return 'no card';deck=deck.filter(x=>x&&!x.aaMG);deck.unshift(c);return c.n`;
  const hn=await H.p.evaluate(src=>COOPW.thin.withSeat('b',()=>(0,eval)('(function(){'+src+'})')()),ac);const gn=await pick(ac);await rnd(H,null);await rnd(G,null);
  if(hn&&hn===gn){await act('A1 Tự học deck card (raw 7): cost once, her host-deck card used',KOK,{stage:`S.suc=80;S.bac=Math.max(S.bac,3000);S.mg=null;`,pre:`act(Math.max(0,deck.findIndex(a=>a&&a.aaMG&&!a.done)))/* a standing / mood card can be dealt in front of it (F6a ctxOut) */;const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click()}if(Q.length&&!document.getElementById('kg82go'))chooseM(0);if(!document.getElementById('kg82go'))return 'no game: '+JSON.stringify({mg:S.mg,Q:Q.map(q=>q.t),buoi:S.buoi,used,suc:S.suc,d:deck.slice(0,4).map(a=>a&&[a.n,a.done|0,a.b,!!a.aaMG,!!a.__g,!!a.__hd,(()=>{try{return canPay(a)}catch(e){return 'x'}})()]),modal:!!document.querySelector('#modal:not([hidden])'),gap:COOPW.thin.lvl});`+KGO,raw:7,wait:900,f5:1,chk:x=>x.aaPaid===1});
   const hd=await H.p.evaluate(nm=>__hdeck(d=>{const c=d.find(a=>a&&a.n===nm);return c&&{n:c.n,done:c.done,mk:COOPW.thin.F.stat.cardMark,ns:d.slice(0,4).map(a=>a&&[a.n,!!a.done,!!a.aaMG])}}),hn);if(!table.length||!table[table.length-1].tag.startsWith('A1'))ok(true,'A1b (row skipped)');else ok(ON?!!(hd&&hd.done):true,'A1b her host-deck Tự học card used',hd)}
  else ok(true,'A no matching Tự học card (skipped)',{hn,gn})}
 /* ---- C: a start in her context on the HOST (part-D card) opens the game on HER phone ---- */
 const HO=()=>H.p.evaluate(()=>{const g=document.getElementById('kg82go');return g?(document.querySelector('#kg82 .kg82t,#kg82 h3,#kg82 h4')||{}).textContent||'yes':false});
 if(ON){await reset();await stage(vst);const ho0=await HO();
  const r=await H.p.evaluate(()=>{const TH=COOPW.thin;let o=null;TH.withSeat('b',()=>{const T=TH.tapRun(()=>{try{vlCraftRun(0)}catch(e){o='EXC '+e.message}});o=o||T.ui});return o});
  const capd=Array.isArray(r)&&r.some(x=>x[0]==='vlCraftGame');await G.p.evaluate(ui=>{if(Array.isArray(ui))COOPW.thin.uiPlay(ui)},r);await sleep(800);
  const open=await G.p.evaluate(()=>!!document.getElementById('kg82go'));const hostOpen=await HO();
  ok(capd&&open&&hostOpen===ho0,'C1 a veil craft started in her context on the host: captured, the game opens on HER phone only',{r:JSON.stringify(r).slice(0,200),open,hostOpen,ho0});
  if(open){const n0=await G.p.evaluate(()=>S.inv.length),s1=await G.p.evaluate(()=>COOPW.thin.F.stat.sent);await G.p.evaluate(r=>{window.__raw=r},6);await G.p.evaluate(()=>document.getElementById('kg82go').click());await sleep(900);
   await G.p.evaluate(()=>{const k=document.getElementById('kg82ok');if(k)k.click()});await until(G,()=>!COOPW.thin.F.pend,null,20000);await sleep(1500);await sync();
   const r2=await G.p.evaluate(([n0,s1])=>({dn:S.inv.length-n0,sent:COOPW.thin.F.stat.sent-s1,ans:COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.n,st:COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.r0&&COOPW.thin.F.lastAns.r0.st}),[n0,s1]);
   ok(r2.dn===1&&r2.sent===1&&r2.ans==='vlCraftEnd'&&r2.st==='ok','C2 … and its end (raw 6) is ONE intent: the veil made once, on her',r2)}
  /* review r1: a host-started veil (cost paid there) whose game is gone on her phone (reload): ONE «Kết nhanh» end (material back), never a cost with nothing */
  await reset();await stage(vst+'delete S.vlPend;');const hb=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>({bac:S.bac,suc:S.suc})));
  const r3=await H.p.evaluate(()=>{const TH=COOPW.thin;let o=null;TH.withSeat('b',()=>{const T=TH.tapRun(()=>{try{apply({bac:-VL.mat[1]});vlCraftRun(1)}catch(e){o='EXC '+e.message}});o=o||T.ui});TH.flush();return o});
  await G.p.evaluate(ui=>{if(Array.isArray(ui))COOPW.thin.uiPlay(ui)},r3)/* with the view, as an answer plays it (the 3 s gone-check must not see a start with no game) */;await until(G,()=>!!document.getElementById('kg82go'),null,8000);await sync();const op3=await G.p.evaluate(()=>!!document.getElementById('kg82go'));
  const s3=await G.p.evaluate(()=>{const F=COOPW.thin.F,s0=F.stat.sent;kg82Close();F.f6bExDrop();F.f6bGone();return F.stat.sent-s0});await until(G,()=>!COOPW.thin.F.pend,null,20000);await sleep(1500);await sync();
  const ha=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>({bac:S.bac,suc:S.suc,vp:S.vlPend||null,nveil:(S.inv||[]).filter(e=>e&&/^vl/.test(e.k)).length})));const la=await G.p.evaluate(()=>COOPW.thin.F.lastAns&&[COOPW.thin.F.lastAns.n,COOPW.thin.F.lastAns.r0&&COOPW.thin.F.lastAns.r0.st]);
  ok(op3&&s3===1&&la&&la[0]==='vlCraftEnd'&&la[1]==='ok'&&!ha.vp&&ha.bac===hb.bac,'V6 a host-started veil, her page gone mid-game (review r1): ONE «Kết nhanh» end, the material back, the start record cleared',{op3,s3,la,hb,ha})}
 /* ---- H: Hội phối đồ theo đề: the hold runs in her context on the HOST (the world month); her pick «Tự tay phối đồ» opens the board on
    HER phone (captured tsDressGo); the mirror is already sat today (staged), so the board's end is the ONE intent tsDressEnd ---- */
 const hst=`S.suc=80;S.out=0;S.confined=0;const th=Object.keys(TS_THEME)[0];tsS().dress={th,m:S.month,y:S.year};S.toilette={wk:wk(),day:wk()*10,score:40,makeup:false,F:2,occ:['fest'],parts:{}};`;
 const hold=()=>H.p.evaluate(()=>{const TH=COOPW.thin;let o=null;TH.withSeat('b',()=>{const T=TH.tapRun(()=>{try{Q.length=0;tsDressHold();const i=Q.findIndex(q=>/^Hội phối đồ ·/.test(q.t||''));if(i<0){o='no panel';return}const m=Q.splice(i,1)[0];Q.length=0;Q.unshift(m);chooseM(0)}catch(e){o='EXC '+e.message}});o=o||T.ui});return o});
 if(ON)for(const [tag,skip] of [['H1 Hội phối đồ: her set presented',0],['H2 Hội phối đồ «Bỏ qua»: her maid picks, rolled on the host',1]]){if(ROWS&&!ROWS.some(x=>tag.startsWith(x)))continue;
  await reset();await stage(hst);const g0=await G.p.evaluate(()=>__her());const ho0=await HO();const r=await hold();
  const capd=Array.isArray(r)&&r.some(x=>x[0]==='tsDressGo');await G.p.evaluate(ui=>{if(Array.isArray(ui))COOPW.thin.uiPlay(ui)},r);await sleep(800);
  const open=await G.p.evaluate(()=>!!document.getElementById('tsdgo'));const hostOpen=await HO();
  if(!(capd&&open)){ok(false,tag,{r:JSON.stringify(r).slice(0,300),open});continue}
  const s1=await G.p.evaluate(()=>COOPW.thin.F.stat.sent),L0=await G.p.evaluate(()=>S.logSeq||0);
  await G.p.evaluate(sk=>{if(sk){document.getElementById('tsdskip').click();return}const b=document.querySelector('[data-tsi]');if(b){b.click();const o=document.querySelector('[data-tsact="on"]');if(o)o.click()}document.getElementById('tsdgo').click()},skip);
  await until(G,()=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.n==='tsDressEnd',null,20000);await sleep(1500);await sync();
  const g1=await G.p.evaluate(()=>__her()),h1=await H.p.evaluate(()=>__her());
  const x=await G.p.evaluate(([s1,L0])=>{const F=COOPW.thin.F;return {sent:F.stat.sent-s1,ans:F.lastAns&&F.lastAns.n,st:F.lastAns&&F.lastAns.r0&&F.lastAns.r0.st,args:F.lastMsg&&JSON.stringify(F.lastMsg.a).slice(0,160),pod:!!document.getElementById('kpodov'),
    logs:(S.logs||[]).slice(0,Math.max(0,Math.min(30,(S.logSeq||0)-L0))).map(l=>String(l).replace(/<[^>]+>/g,'').slice(0,90))}},[s1,L0]);
  const hpod=await H.p.evaluate(()=>!!document.getElementById('kpodov'));
  const same=JSON.stringify(Object.assign({},g1,{log:0,nlog:0,used:0}))===JSON.stringify(Object.assign({},h1,{log:0,nlog:0,used:0}));
  const placed=x.logs.filter(l=>/Hội phối đồ .*ngươi đứng thứ/.test(l)).length===1;
  ok(hostOpen===ho0&&!hpod&&x.sent===1&&x.ans==='tsDressEnd'&&x.st==='ok'&&placed&&same&&g1.suc-g0.suc===-5,tag+': the board + podium on HER phone only, ONE end, placed once, Sức -5 once',{x,same,dsuc:g1.suc-g0.suc,hostOpen,ho0,hpod});
  if(skip)ok(/^\[\{"v":\{\}\},\{"v":true\}\]/.test(x.args||''),'H2b her phone sent no pick (the host rolled her maid\'s pick)',x.args);
  await G.p.evaluate(()=>{try{kitPodiumClose(true)}catch(e){}})}
 if(ON&&(!ROWS||ROWS.some(x=>'H3'.startsWith(x)))){await reset();await stage(hst);const r=await hold();await G.p.evaluate(ui=>{if(Array.isArray(ui))COOPW.thin.uiPlay(ui)},r);await sleep(500);
  await sync();await sleep(1000);
  const g0=await G.p.evaluate(()=>__her());await G.p.evaluate(()=>{try{kg82Close()}catch(e){}window.tsDressEnd({hair:'zz_none'},false)});
  await until(G,()=>!COOPW.thin.F.pend,null,20000);await sleep(1200);await sync();const g1=await G.p.evaluate(()=>__her());
  const st=await G.p.evaluate(()=>COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.r0&&COOPW.thin.F.lastAns.r0.st);
  ok(st==='gone'&&g1.log===g0.log,'H3 a piece she does not hold: refused, nothing applied',{st,log:[g0.log,g1.log]})}
 /* double end */
 if(ON){await reset();await stage(vst);const r=await G.p.evaluate(()=>{const F=COOPW.thin.F,b0=F.stat.busy,s0=F.stat.sent;wdGroomEnd('ok');wdGroomEnd('ok');return {busy:F.stat.busy-b0,sent:F.stat.sent-s0}});
  await until(G,()=>!COOPW.thin.F.pend,null,20000);ok(r.sent===1&&r.busy===1,'D1 double end: one intent, the second ignored',r)}
 /* latency */
 {const ms=table.filter(x=>typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b),lo=table.map(x=>x.r&&x.r.ms).filter(x=>typeof x==='number').sort((a,b)=>a-b);
  if(ms.length)console.log('LATENCY end→answer ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1]);
  if(lo.length)console.log('LOCAL end tap→render ms on her phone: n='+lo.length+' median='+lo[lo.length>>1]+' min='+lo[0]+' max='+lo[lo.length-1])}
 if(process.env.PROF){const P=await H.p.evaluate(()=>{const o={};for(const [k,e] of Object.entries(window.__prof||{}))o[k]={n:e.n,avg:Math.round(e.t/e.n),mx:Math.round(e.mx),tot:Math.round(e.t)};return o});console.log('PROF host (ms):',JSON.stringify(P))}
 if(TRIPSRC){const t=await trip();const d=(a,b)=>{const o={};for(const k of new Set([...Object.keys(a||{}),...Object.keys(b||{})]))o[k]=((b||{})[k]||0)-((a||{})[k]||0);return o};
  const sp=d(tw0&&tw0.statePart,t&&t.statePart);
  console.log('TRIPWIRE F6b table (guest writes outside fromCanon during the end table): state',(t&&t.state)-(tw0&&tw0.state||0),'· by part',JSON.stringify(sp),'· F6b entries',JSON.stringify((t&&t.parts&&t.parts.F6b||[]).slice(0,12)),'· F6b·game (her game, reported)',JSON.stringify((t&&t.parts&&t.parts['F6b·game']||[]).slice(0,8)),'· ? top',JSON.stringify((t&&t.parts&&t.parts['?']||[]).slice(0,6)));
  if(ON)ok(!(sp.F6b>0),'TRIP F6b end writes on her phone = 0',sp)}
 console.log('F6b table:');for(const x of table)console.log(' ',JSON.stringify({tag:x.tag,good:x.good,ms:x.ms,local:x.r&&x.r.ms,ran:x.ran,solo:x.solo,real:x.real}).slice(0,500));
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f6b-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);ok(n(ho)+n(go)===0,'F8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f6b L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
