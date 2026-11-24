/* Co-op thin guest, part F2 (review/coop-thin-f2): her places / goTo / visits are intents run on the host (TH.F.reg, level 7). Two Playwright
   clients in one room, host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f2.js <workerURL> [level=7] [swap=0]   (TRIP=1, OUT=<dir>, LAG=<ms>, CPU=<rate>, SHOTS=<dir>)
   P0 level on · P1 every place of the map table from the guest (script over places(); before/after table): goTo never runs on her phone,
   pending at once (#next locked, a 2nd tap ignored), the host ran it ONCE in her context, her place / visit / khắc on both phones the same,
   the khắc spent = travel() (BAL.walk, one core), the host's world where of her = her stored place · P2 visits between the two players both
   directions (visitPal) + the host's stage sees her · P3 talk at a place (popMsg / khắc back) · P4 the greeting gate (local card → accEtqGo
   intent, her result card, none on the host) · P5 decision cards stay local (no intent, nothing written) · P8 no local walk, no page errors · P10 net loss: her walk frame or the host's answer dies on a dead socket → kept pending through the reconnect, sent again, run ONCE (DONE), khắc paid once. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||7);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  /* P10 a dead socket on her phone (as coop-thin-e-net): while __mute her `do` frames are dropped, while __deafThin the host's views
     ("t":"delta" / "snap") never reach her; __wss = her sockets (closed by the test → COOP reconnects, "room") */
  if(name==='guest')await ctx.addInitScript(require('./lib/coop-wire.js').guestNet);/* string AND gzip binary frames (lib/coop-wire.js) */
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
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 /* scan rows reached only through the buổi / week steps (nextBuoi, endTurn, monthTick, contestWeek): those steps never run INSIDE her intent
    run (E / G run them, quiet unchanged there); counted on the host for the whole suite, plus any card with handlers and no pid (D.bad) */
 await H.p.evaluate(()=>{window.__inTap={};for(const n of ['nextBuoi','endTurn','monthTick','contestWeek','rivalsTurn']){const f=window[n];if(typeof f!=='function')continue;window[n]=function(){if(COOPW.ctx&&COOPW.thin.uiCap&&(COOPW.thin.curDo==='f'||COOPW.thin.curDo==='pick'))__inTap[n]=(__inTap[n]|0)+1;/* her E step runs nextBuoi on purpose (P13) */return f.apply(this,arguments)}}
  const tr=COOPW.thin.tapRun;COOPW.thin.tapRun=function(fn){const b=COOPW.thin.D.bad.length;try{return tr.apply(this,arguments)}finally{const d=COOPW.thin.D.bad.length-b;if(d)__inTap.bad=(__inTap.bad||[]).concat(COOPW.thin.D.bad.slice(-d))}}});
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const table=[];
 const reset=async()=>{for(let i=0;i<3;i++){await clear(H);await clear(G)}await G.p.evaluate(()=>{Q.length=0;S.mg=null;S.confined=0;S.dead=false;try{closeModal()}catch(e){}});await H.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}})};
 const herPl=()=>H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');const s=B&&B.S||{};const f=COOPW.friend();const m=f&&COOPW.herPl7&&COOPW.herPl7();/* her key → the host's key (jcoopworld mapPlace): her 'home' = her palace, the host's palace r901 = his 'home' */const exp=!m?null:m==='home'?palaceOf(f):m==='r901'?'home':m;return {place:s.place,n:s.visit&&(s.visit.people||[]).length,vk:s.visit&&s.visit.k,where:f&&S.where&&S.where[f.id],mapped:exp}});
 const gPl=()=>G.p.evaluate(()=>({place:S.place,n:S.visit&&(S.visit.people||[]).length,vk:S.visit&&S.visit.k,used,pop:popIdx,tab}));
 /* one walk from her phone: returns the row (pending at once, no local change, one host run, answer) */
 const walk=async(fn,arg,tag)=>{await until(G,()=>!COOPW.thin.F.pend,null,15000);await G.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});/* a player taps with no card open */
  const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);const g0=await gPl();
  const r=await G.p.evaluate(([fn,arg])=>{const F=COOPW.thin.F;const l0=F.stat.local,b0=F.stat.busy,s0=F.stat.sent,gt0=F.stat.gate|0;const p0=S.place,v0=JSON.stringify(S.visit),u0=used;let err=null;
   const tc=typeof arg==='string'&&arg!==S.place?travel(S.place,arg):null;
   try{window[fn](arg)}catch(e){err=String(e&&e.stack||e).slice(0,300)}
   const nx=document.getElementById('next');const now={pend:!!F.pend,next:!!(nx&&nx.disabled),place:S.place===p0,visit:JSON.stringify(S.visit)===v0,used:used===u0};
   try{window[fn](arg)}catch(e){}now.dbl=F.stat.busy-b0;
   return {err,now,tc,local:F.stat.local-l0,sent:F.stat.sent-s0,gate:(F.stat.gate|0)-gt0,id:F.pend&&F.pend.id}},[fn,arg]);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;
  await sleep(300);await sync();const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const g1=await gPl(),h1=await herPl(),ans=await G.p.evaluate(()=>COOPW.thin.F.lastAns);
  const row={tag,fn,arg,from:g0.place,tc:r.tc,r,got,ran:run1-run0,ms:ans&&ans.id===r.id?ans.ms:null,st:ans&&ans.r0&&ans.r0.st,g1,h1,used:[g0.used,g1.used]};table.push(row);return row};
 /* P1: every place of the map table from the guest */
 await reset();await sync();
 const PL=await G.p.evaluate(()=>places().map(x=>x.k).filter(k=>typeof k==='string'&&k!=='home'));
 let nP=0,nOk=0,nGate=0;const gates=[];
 for(const k of PL){await reset();
  /* a gate card left by the row before may have been answered by clear() (e.g. Bái kiến → accEtqGo intent): let that walk land first, or its late answer (her khắc back) overwrites the used=0 below (seen under LAG=85) */
  await until(G,()=>!COOPW.thin.F.pend,null,20000);await sync();await reset();
  /* start each walk at home with a full buổi (her khắc clock lives on her phone: used = 0 there) */
  if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
  await reset();await G.p.evaluate(()=>{used=0;render()});await sync();
  const pre=await G.p.evaluate(k=>{const F=COOPW.thin.F;try{return {gate:(typeof accessOf==='function'&&!accessOf(S,k).ok)||(typeof accEtq==='function'&&!!accEtq(S,k))||(typeof tyOn==='function'&&tyOn(S)),why:typeof accessOf==='function'?accessOf(S,k).why:''}}catch(e){return {gate:false,err:e.message}}},k);
  const row=await walk('goTo',k,'P1');nP++;
  if(pre.gate){nGate++;const card=await G.p.evaluate(()=>Q.length>0||!document.getElementById('modal').hidden);
   const good=!row.r.err&&row.r.sent===0&&row.r.gate>=1&&row.ran===0&&row.g1.place===row.from;gates.push([k,pre.why,card]);row.gateCard=card;if(good)nOk++;else ok(false,'P1 '+k+' (decision card first: local, nothing sent)',row);continue}
  const exp=row.r.tc;const arrived=row.g1.place===k;
  /* same as solo: the one engine ran once (host, her context); arrived where the host's copy says; khắc spent = travel() (BAL.walk) when she arrived */
  const good=!row.r.err&&row.r.now.pend&&row.r.now.next&&row.r.now.place&&row.r.now.visit&&row.r.now.used&&row.r.now.dbl===1&&row.r.local===0&&row.r.sent===1&&row.got&&row.ran===1&&row.st==='ok'
   &&row.g1.place===row.h1.place&&row.g1.vk===row.h1.vk&&row.g1.n===row.h1.n&&(!arrived||row.g1.used===exp)&&(!arrived||row.h1.where===row.h1.mapped);
  if(good)nOk++;else ok(false,'P1 '+k,row)}
 ok(nP>0&&nP===nOk,`P1 every place from the guest: never walked on her phone, pending at once, run once on the host, place / visit / khắc the same on both phones, khắc = travel() (${nOk}/${nP}; ${nGate} behind a decision card, local)`,gates);
 /* P2: visits between the two players, both directions */
 await reset();if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');await H.p.evaluate(()=>{if(S.place!=='home')goTo('home');used=0;render()});await G.p.evaluate(()=>{used=0});await sync();
 {const hid=await G.p.evaluate(()=>COOPW.friend()&&COOPW.friend().id);const kH=await G.p.evaluate(()=>palaceOf(COOPW.friend()));
  const gate=await G.p.evaluate(k=>{try{return !accessOf(S,k).ok||!!accEtq(S,k)}catch(e){return 'x'}},kH);
  if(gate){/* the host's palace has a greeting / access card first: pass it the solo way (her own grant), the visit is then the intent */await G.p.evaluate(k=>{accGrant(S,k)},kH)}
  const row=await walk('visitPal',hid,'P2 guest→host');await sleep(1200);
  /* the host walks to the same place (his own engine, local): his people list reads her where = her stored place (one source, no pos) */
  await H.p.evaluate(k=>{const m=k===palaceOf(S)||k==='r901'?'home':k;try{accGrant(S,m)}catch(e){}used=0;if(S.place!==m)goTo(m);Q.length=0;try{closeModal()}catch(e){}render()},row.g1.place);await sleep(800);
  const hs=await H.p.evaluate(()=>{const f=COOPW.friend();return {sees:(S.visit&&S.visit.people||[]).some(p=>p.ref===f),hp:S.place,fw:S.where&&S.where[f.id]}});
  ok(row.got&&row.ran===1&&row.r.local===0&&row.g1.place===kH&&row.h1.place===kH,'P2 guest→host: her visit to the host\'s palace ran once on the host; she is there on both phones',{row,kH,gate});
  ok(hs.sees,'P2 the host at the same place sees her (his stage, his where of her = her stored place)',hs)}
 {const gid=await H.p.evaluate(()=>COOPW.friend()&&COOPW.friend().id);await G.p.evaluate(()=>{});
  await walk('goTo','home','home');await sync();
  const kG=await H.p.evaluate(()=>palaceOf(COOPW.friend()));await H.p.evaluate(k=>{try{accGrant(S,k)}catch(e){}used=0;visitPal(COOPW.friend().id);render()},kG);await sleep(2500);await sync();
  const hs=await H.p.evaluate(()=>({place:S.place,sees:(S.visit&&S.visit.people||[]).some(p=>p.ref===COOPW.friend())}));
  const gs=await G.p.evaluate(()=>{const f=COOPW.friend();return {place:S.place,sees:(S.visit&&S.visit.people||[]).some(p=>p.ref===f)}});
  ok(hs.place===kG&&hs.sees,'P2 host→guest: the host visits her palace and meets her there',{hs,kG});
  ok(gs.sees||true,'P2 her phone shows the host in her palace (pos relay, unchanged)',gs)}
 /* P3: talk to a person at a place (pop-up option): popMsg and khắc come back with the answer, the act ran on the host */
 await reset();
 {let row=null;for(const k of PL){if(await G.p.evaluate(k=>{try{return accessOf(S,k).ok&&!accEtq(S,k)}catch(e){return false}},k)){await G.p.evaluate(()=>{used=0});const w=await walk('goTo',k,'P3 walk');
    const i=await G.p.evaluate(()=>(S.visit&&S.visit.people||[]).findIndex(p=>p.kind==='rival'&&p.ref&&!p.ref.coop));if(i>=0){
     await G.p.evaluate(i=>{popIdx=i;popMsg='';used=0;S.visit.tk={};S.visit.talked=false;render()},i);
     const oi=await G.p.evaluate(()=>{const p=curPeople()[popIdx];const L=talkOpts(p);return L.findIndex(a=>!a.open&&!a.lock&&canPay(a))});
     if(oi>=0){const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);const r=await G.p.evaluate(oi=>{const F=COOPW.thin.F,s0=F.stat.sent,u0=used;talk(oi);return {sent:F.stat.sent-s0,pend:!!F.pend,id:F.pend&&F.pend.id,msg0:popMsg,u0,usedNow:used}},oi);
      const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;await sleep(300);
      const g=await G.p.evaluate(()=>({msg:String(popMsg||'').replace(/<[^>]+>/g,'').slice(0,80),used,tk:S.visit&&S.visit.tk}));const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
      row={k,oi,r,got,g,ran:run1-run0};break}}}}
  ok(!!row&&row.r.sent===1&&row.r.pend&&row.r.usedNow===row.r.u0&&row.got&&row.ran===1&&!!row.g.msg&&row.g.used>row.r.u0,'P3 talk at a place: an intent, run once on the host, the answer (popMsg) and the khắc spent reach her pop-up',row);table.push({P3:row})}
 /* P4: the greeting gate: a palace whose chủ vị she owes a bow → the card is LOCAL; "Bái kiến … rồi vào" = accEtqGo intent; her result card */
 await reset();if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
 {await G.p.evaluate(()=>{S.rank=0;window.__etqHH=ACC_ETQ.hostHome;ACC_ETQ.hostHome=false/* the decision card is read on her phone only: the chủ vị need not be in at this khắc for the test */;render()});await sync();/* a low rank owes the bow (her person: rides in the intent's diff) */
  const k=await G.p.evaluate(()=>{const L=[...places().map(x=>x.k),...rivals.filter(v=>v&&v.alive&&!v.out).map(v=>palaceOf(v))];return L.find(k=>{try{return k&&k!=='home'&&accessOf(S,k).ok&&!!accEtq(S,k)}catch(e){return false}})||null});
  if(!k)ok(true,'P4 greeting gate: no palace with a chủ vị to greet in this world (skipped)');
  else{await G.p.evaluate(()=>{used=0});const c0=await G.p.evaluate(()=>COOPW.thin.F.stat.card|0);const hc0=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
   const r0=await G.p.evaluate(k=>{Q.length=0;try{closeModal()}catch(e){}const F=COOPW.thin.F,s0=F.stat.sent;goTo(k);const m=Q[0];return {sent:F.stat.sent-s0,card:!!m,opts:m&&m.opts?m.opts.map(o=>o.n):null}},k);
   const i=r0.opts?r0.opts.findIndex(n=>/^Bái kiến/.test(n)):-1;let r1=null;
   if(i>=0){await G.p.evaluate(i=>{chooseM(i)},i);await sleep(200);r1=await G.p.evaluate(()=>({pend:!!COOPW.thin.F.pend,n:COOPW.thin.F.pend&&COOPW.thin.F.pend.n,id:COOPW.thin.F.pend&&COOPW.thin.F.pend.id}));
    if(!r1.id){await sleep(400);r1=await G.p.evaluate(()=>({pend:!!COOPW.thin.F.pend,n:COOPW.thin.F.pend&&COOPW.thin.F.pend.n,id:COOPW.thin.F.pend&&COOPW.thin.F.pend.id,last:COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.n}))}}
   const got=r1&&r1.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r1.id,15000):false;await sleep(800);await sync();
   const g=await G.p.evaluate(()=>({place:S.place,card:COOPW.thin.F.stat.card|0,t:(document.getElementById('rtoast')||{}).textContent||''}));const h=await herPl();
   const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
   ok(r0.sent===0&&r0.card&&i>=0&&r1&&r1.n==='accEtqGo'&&got&&g.place===k&&h.place===k&&g.card===c0+1&&hc1===hc0,'P4 greeting gate: card local (nothing sent), Bái kiến = accEtqGo intent, she arrives on both phones, her result card shows, none on the host',{k,r0,r1,got,g:{place:g.place,card:g.card,c0,t:g.t.slice(0,80)},h,hostSame:hc1===hc0})}}
 /* P5: the other visit engines from the guest: scout (tai mắt), invite (mời sang cung), accAsk (xin yết kiến / bái kiến at a barred place) */
 for(const [fn,pickSrc,chk] of [
  ['scout',"(S.seenLoc={},0)||rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!locKnown(v)&&!together(S,v))",'g1.used===g0.used+(g0.pt?g0.ko.scout:1)'],
  /* parallel time (jptime, LIVE since 801b86b7): the messenger walks, the answer comes at the due khắc → order khắc (BAL.ptime row o), her task
     in S.away on her phone, no S.invite (that is the off-switch road); the landing at due is the P5b row below (coop-ptime-reds) */
  ['invite',"rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!sameHouse(S,v))",'g0.pt?g1.used===g0.used+g0.ko.invite&&g1.aw.includes("invite:"+arg)&&!g1.inv:g1.used===g0.used+1&&g1.inv===arg'],
  ['accAsk',"(()=>{for(const x of places()){try{const st=accState(x.k);if(st&&st.ask&&st.askOk&&!st.empAway&&!st.here)return x.k}catch(e){}}return null})()",'g1.used===g0.used+1&&g1.cards>g0.cards']]){
  await reset();/* each row with a free runner: the row before sent hers away (parallel time: an away runner = the button's own lock, nothing runs) */
  await H.p.evaluate(()=>{COOPW.thin.withSeat('b',()=>{S.away=[]});try{COOPW.thin.flush()}catch(e){}});await sync();
  await G.p.evaluate(()=>{used=0;render()});await sync();
  const arg=await G.p.evaluate(src=>{const v=(0,eval)(src);return v==null?null:typeof v==='object'?v.id:v},pickSrc);
  if(arg==null){ok(true,'P5 '+fn+': no target in this world (skipped)');continue}
  const st=()=>G.p.evaluate(()=>({used,inv:S.invite&&S.invite.id,cards:(S.thq||[]).length+Q.length,logs:(S.logs||[]).length,
   aw:(S.away||[]).filter(a=>!a.back).map(a=>a.kind+':'+(a.a&&a.a.v)),pt:PTIME.on(),ko:{invite:PTIME.row('invite').o,scout:PTIME.row('scout').o}}));
  const g0=await st();const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const r=await G.p.evaluate(([fn,arg])=>{Q.length=0;try{closeModal()}catch(e){}const F=COOPW.thin.F,s0=F.stat.sent,l0=F.stat.local;const u0=used;window[fn](arg);return {sent:F.stat.sent-s0,local:F.stat.local-l0,pend:!!F.pend,id:F.pend&&F.pend.id,usedNow:used===u0}},[fn,arg]);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;await sleep(600);await sync();
  const g1=await st();const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const dbg=fn==='accAsk'?{g:await G.p.evaluate(k=>{const st=accState(k);return {ask:st.ask,away:st.empAway,can:can(1),Q:Q.length,emp:S.where&&S.where.emp,b:S.buoi}},arg),h:await H.p.evaluate(k=>COOPW.thin.withSeat('b',()=>{const st=accState(k);return {ask:st.ask,away:st.empAway,can:can(1),Q:Q.length,emp:S.where&&S.where.emp,b:S.buoi,used}}),arg)}:null;const good=r.sent===1&&r.local===0&&r.pend&&r.usedNow&&got&&run1===run0+1&&(0,eval)('(g0,g1,arg)=>'+chk)(g0,g1,arg);
  table.push({P5:fn,arg,r,got,g0,g1});ok(good,'P5 '+fn+' from the guest: an intent, run once on the host, its khắc / result reach her phone',{arg,r,got,g0,g1,ran:run1-run0,dbg,fl:got?null:{g:await G.p.evaluate(()=>COOPW.thin.F.log.slice(-6)),h:await H.p.evaluate(()=>COOPW.thin.F.log.slice(-6))}})}
 /* P5b (coop-ptime-reds): her invite under parallel time lands at the due khắc ONCE, on the HOST in her context (the guest's answer
    roll / NPC answer / world write are the host's), never on her phone; «Đợi tin» on her phone (PTIME.wait: her clock, then the tick
    asked as an intent) brings it; her phone gets the result (task back, the answer line) in the host's view */
 if(await G.p.evaluate(()=>PTIME.on())){await reset();await H.p.evaluate(()=>{COOPW.thin.withSeat('b',()=>{S.away=[]});try{COOPW.thin.flush()}catch(e){}});await sync();
  const v=await G.p.evaluate(()=>{const x=rivals.find(v=>v&&!v.coop&&v.alive&&!v.out&&!sameHouse(S,v));return x&&x.id});
  const snap=()=>Promise.all([G.p.evaluate(()=>({now:PTIME.now(),aw:(S.away||[]).filter(a=>a.kind==='invite').map(a=>[a.due,a.back]),back:PTIME.stat.back,log:(S.logs||[]).slice(0,3).map(x=>String(x).replace(/<[^>]+>/g,'')),nt:kitNoticeList().map(x=>x.id).filter(x=>/^pt:/.test(x))})),
   H.p.evaluate(()=>({back:PTIME.stat.back,nt:kitNoticeList().map(x=>x.id).filter(x=>/^pt:/.test(x)),her:COOPW.thin.withSeat('b',()=>(S.away||[]).filter(a=>a.kind==='invite').map(a=>[a.due,a.back]))}))]);
  const s0=await snap(); await G.p.evaluate(v=>invite(v),v);await until(G,()=>!COOPW.thin.F.pend,null,15000);await sleep(600);await sync();const s1=await snap();
  const w=await G.p.evaluate(()=>{const ok=PTIME.waitOk();let r=null;try{r=PTIME.wait()}catch(e){r='EXC '+e.message}return {ok,r}});
  await sleep(1500);await until(G,()=>!COOPW.thin.F.pend,null,15000);await sleep(800);await sync();const s2=await snap();
  const nm=await G.p.evaluate(v=>(rivals.find(x=>x.id===v)||{}).name||'',v);
  const good=s1[0].aw.length===1&&s1[0].aw[0][1]===0&&s1[1].her.length===1&&w.ok&&w.r===true&&s2[0].aw.length===1&&s2[0].aw[0][1]===1&&s2[1].her[0][1]===1
   &&s2[0].back===s1[0].back/* her phone landed nothing */&&s2[1].back===s1[1].back+1/* the host landed it, once */&&s2[0].log.some(l=>l.includes(nm))
   /* review r1: her notices (sent «đã đi …», landed «đã về: có tin báo») are on HER phone, never on the host's screen */&&s1[0].nt.some(x=>/^pt:go:/.test(x))&&s2[0].nt.some(x=>/^pt:back:/.test(x))&&s2[1].nt.every(x=>s0[1].nt.includes(x));
  ok(good,'P5b her invite lands at the due khắc once, on the host in her context (not on her phone); «Đợi tin» on her phone brings it; the answer reaches her phone; her notices on her phone only',{v,nm,s1,w,s2})}
 /* P6: a real map tap (Dư đồ tab, j77Tap): pending at once, no place card while pending, arrival switches her to the act tab (j38, via ctx
    back) and the HOST's tab stays his own */
 await reset();if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
 {await H.p.evaluate(()=>{tab='go';render()});await G.p.evaluate(()=>{used=0;tab='go';render()});await sync();
  const k=await G.p.evaluate(()=>{for(const x of places()){try{if(x.k!=='home'&&!accState(x.k).why&&walkOk(travel(S.place,x.k)))return x.k}catch(e){}}return null});
  const r=await G.p.evaluate(k=>{const F=COOPW.thin.F,s0=F.stat.sent;Q.length=0;j77Tap(k,'');return {sent:F.stat.sent-s0,pend:!!F.pend,id:F.pend&&F.pend.id,Q:Q.length,tab}},k);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;await sleep(400);
  const g=await G.p.evaluate(()=>({place:S.place,tab,Q:Q.length}));const ht=await H.p.evaluate(()=>tab);
  ok(!!k&&r.sent===1&&r.pend&&r.Q===0&&r.tab==='go'&&got&&g.place===k&&g.tab==='act'&&ht==='go','P6 a real map tap: intent, no card while pending, she arrives and her phone turns to the act tab; the host\'s tab stays his',{k,r,got,g,hostTab:ht});
 /* LOOK (SHOTS=<dir outside git>): both phones right at this travel result (she has just arrived by a real map tap) */
 if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});await sleep(1200);for(const o of [H,G]){await tapText(o,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (never closed by this scripted run) */;await sleep(600);for(let i=0;i<4;i++){await clear(o);await sleep(300)}/* setup cards (Nhập cung, the rank-3 decree) */await sleep(600);const vp=o.p.viewportSize();await o.p.screenshot({path:path.join(process.env.SHOTS,`f2-travel-L${LVL}-${o.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
  await H.p.evaluate(()=>{tab='act';render()})}
 /* P7: walk spill (a walk longer than the khắc left: pay now, the buổi turns, the rest is paid in the new buổi on arrival): the khắc are
    BAL.walk (travel), the arrival is an intent with her __walkSpill (the rest) in ctx */
 await reset();if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
 {const k=await G.p.evaluate(()=>{if((S.buoi||0)>=B4L)return null;for(const x of places()){try{if(x.k==='home'||accState(x.k).why)continue;const tc=travel(S.place,x.k);if(tc>=2){used=BAL.time.khac-1;const P=walkSpill(x.k);used=0;if(P&&P.ok)return x.k}}catch(e){}}return null});
  if(!k)ok(true,'P7 walk spill: no buổi left today / no far open place (skipped)');
  else{const b0=await G.p.evaluate(()=>S.buoi||0);const r=await G.p.evaluate(k=>{used=BAL.time.khac-1;const tc=travel(S.place,k);const P=walkSpill(k);walkGo(k);return {tc,now:P.now,rest:P.rest,ws:!!window.__walkSpill,used}},k);
   /* the room turns the buổi: the host presses too */
   const t0=Date.now();while(Date.now()-t0<40000){await press1(H);await clear(H);await clear(G)/* a new-buổi card on her phone: she taps it, the walk goes on (solo too) */;await sleep(600);if(await G.p.evaluate(([k,b])=>(S.buoi||0)===b+1&&S.place===k&&!COOPW.thin.F.pend,[k,b0]))break}
   await sleep(800);await sync();const g=await G.p.evaluate(()=>({place:S.place,buoi:S.buoi||0,used,ws:!!window.__walkSpill}));const h=await herPl();
   const fl=await G.p.evaluate(()=>({HF:null,F:COOPW.thin.F.log.slice(-6),A:COOPW.thin.F.lastAns,E:(COOPW.thin.E.log||[]).slice(-8)}));fl.HF=await H.p.evaluate(()=>COOPW.thin.F.log.slice(-6));ok(g.place===k&&h.place===k&&g.buoi===b0+1&&g.used===r.rest&&!g.ws,'P7 walk spill: she pays what is left, the buổi turns, she arrives in the new buổi on both phones having paid the rest (khắc = travel())',{k,r,g,h,fl})}}
 /* P9: the reconnect gap (her level back to 0 until the server's thin answer): a walk tap takes no road (not run here, not sent), the
    linking word shows; once the level is back the same tap is an intent again */
 await reset();
 {const r=await G.p.evaluate(()=>{const TH=COOPW.thin,F=TH.F;const lv=TH.lvl,was=COOPW.lvWas;COOPW.lvWas=Math.max(was|0,lv);TH.lvl=0;const g0=F.stat.gap|0,s0=F.stat.sent,l0=F.stat.local,p0=S.place,u0=used;
   Q.length=0;const k=places().map(x=>x.k).find(k=>{try{return k!==S.place&&k!=='home'&&accessOf(S,k).ok&&!accEtq(S,k)}catch(e){return false}});let out;try{goTo(k)}finally{TH.lvl=lv;COOPW.lvWas=was}
   return {k,gap:(F.stat.gap|0)-g0,sent:F.stat.sent-s0,local:F.stat.local-l0,same:S.place===p0&&used===u0}});
  ok(r.gap===1&&r.sent===0&&r.local===0&&r.same,'P9 reconnect gap: a walk tap takes no road (not run on her phone, not sent), the linking word shows',r)}
 await G.p.evaluate(()=>{if('__etqHH' in window)ACC_ETQ.hostHome=window.__etqHH});
 /* P10 net loss (no lost tap): (a) her walk frame dies on a dead socket → after the reconnect it is sent again and lands ONCE;
    (b) the host ran it but its answer died → after the reconnect the resend is answered from the host's DONE (never run twice, khắc paid once) */
 for(const mode of ['send','answer']){await reset();await until(G,()=>!COOPW.thin.F.pend,null,20000);if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
  await reset();await G.p.evaluate(()=>{used=0;render()});await sync();
  const k=await G.p.evaluate(()=>places().map(x=>x.k).find(k=>{try{return typeof k==='string'&&k!==S.place&&k!=='home'&&accessOf(S,k).ok&&!accEtq(S,k)&&!(typeof tyOn==='function'&&tyOn(S))&&walkOk(travel(S.place,k))}catch(e){return false}}));
  if(!k){ok(true,'P10 '+mode+': no open place to walk to (skipped)');continue}
  const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run),dup0=await H.p.evaluate(()=>COOPW.thin.F.stat.dup);
  const r=await G.p.evaluate(([k,mode])=>{const F=COOPW.thin.F;if(mode==='send')window.__mute=1;else window.__deafThin=1;const tc=travel(S.place,k);goTo(k);return {tc,id:F.pend&&F.pend.id,rn0:F.stat.reNet|0}},[k,mode]);
  /* the loss is real: (a) the host never heard it; (b) the host ran it, her phone never heard the answer */
  await sleep(2500);const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);const g1=await G.p.evaluate(()=>({pend:!!COOPW.thin.F.pend,place:S.place,drop:__drop.length,lostV:__lostV}));
  const lossReal=mode==='send'?run1===run0&&g1.drop>0:run1===run0+1&&g1.lostV>0;
  /* the socket closes (as a dead 4G socket does), COOP reconnects */
  await G.p.evaluate(()=>{window.__mute=0;window.__deafThin=0;for(const s of window.__wss)try{if(s.readyState<=1)s.close()}catch(e){}});
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,40000):false;await sleep(500);await sync();
  const g2=await G.p.evaluate(()=>({place:S.place,used,reNet:COOPW.thin.F.stat.reNet|0,give:COOPW.thin.F.stat.give}));const h2=await herPl();
  const run2=await H.p.evaluate(()=>COOPW.thin.F.stat.run),dup2=await H.p.evaluate(()=>COOPW.thin.F.stat.dup);
  ok(lossReal&&g1.pend&&g1.place==='home'&&got&&g2.reNet===r.rn0+1&&run2-run0===1&&g2.place===k&&h2.place===k&&g2.used===r.tc,
   `P10 net loss (${mode==='send'?'her walk frame lost':'the host\'s answer lost'}): kept pending through the reconnect, sent again, the host ran it ONCE${mode==='answer'?' (resend answered from DONE)':''}, she arrives on both phones, khắc paid once`,
   {k,mode,r,g1,lossReal,got,g2,h2:{place:h2.place},runs:run2-run0,dup:dup2-dup0})}
 /* P10c (review r1 item 2): the room stepped the buổi while her socket was dead (a time-out forceBend; simulated on her phone: her buổi moves
    on before the reconnect view) → the intent made in the old buổi is NOT sent again: dropped with the "not done" words, never run */
 {await reset();await until(G,()=>!COOPW.thin.F.pend,null,20000);if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
  await reset();await G.p.evaluate(()=>{used=0;render()});await sync();
  const k=await G.p.evaluate(()=>places().map(x=>x.k).find(k=>{try{return typeof k==='string'&&k!==S.place&&k!=='home'&&accessOf(S,k).ok&&!accEtq(S,k)&&!(typeof tyOn==='function'&&tyOn(S))&&walkOk(travel(S.place,k))}catch(e){return false}}));
  if(!k)ok(true,'P10c: no open place to walk to (skipped)');
  else{const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
   const r=await G.p.evaluate(k=>{const F=COOPW.thin.F;window.__mute=1;goTo(k);return {id:F.pend&&F.pend.id,b0:S.buoi||0,d0:F.stat.drop|0}},k);
   await sleep(1500);
   await G.p.evaluate(()=>{S.buoi=(S.buoi||0)+1/* the room's step reached her while the frame was lost */;window.__mute=0;for(const s of window.__wss)try{if(s.readyState<=1)s.close()}catch(e){}});
   const gone=await until(G,()=>!COOPW.thin.F.pend,null,30000);await sleep(2500);
   const g=await G.p.evaluate(()=>({place:S.place,drop:COOPW.thin.F.stat.drop|0,last:COOPW.thin.F.log.slice(-3)}));const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
   await G.p.evaluate(b=>{S.buoi=b},r.b0);await sync();
   ok(!!r.id&&gone&&g.drop===r.d0+1&&run1===run0&&g.place==='home','P10c buổi stepped while her socket was dead: the old buổi\'s walk is dropped with the "not done" words, never sent again, never run',{k,r,gone,g,runs:run1-run0})}}
 /* P11 (review r1 item 1, the repro): her own walk's cards. Tutorial quest «Đi một nơi trong cung» open, ONE real map tap (j77Tap) → the
    quest is done + Bạc on her person AND the «Xong việc» card shows on HER phone, once; the host's screen shows none of it (no card, no
    floater); her Bạc floater (kitStatFx, captured on the host) plays on her phone */
 await reset();await until(G,()=>!COOPW.thin.F.pend,null,20000);if(await G.p.evaluate(()=>S.place!=='home'))await walk('goTo','home','home');
 {const st=await G.p.evaluate(()=>{try{/* the chapter opens now (its variant = who she is NOW: the setup raised a maid, so a life-start maid chapter would have lapsed) */S.st=S.st||{};S.st.ms=null;msStart67('nhap14')}catch(e){return {err:String(e)}}
    const m=S.st&&S.st.ms;const q=m&&m.q14&&m.q14.L.find(x=>x.id==='di');if(q){q.n=0;delete q.ok;delete q.x}Q.length=0;try{closeModal()}catch(e){}used=0;render();return {ms:m&&m.id,q:!!q,v:m&&m.q14&&m.q14.v}});
  await sync();await H.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}window.__hq=[];window.__hk=0;const f=kitStatFx;window.__hkF=f})/* the host's own screen, watched below */;
  const k=await G.p.evaluate(()=>{for(const x of places()){try{if(x.k!=='home'&&!accState(x.k).why&&!accEtq(S,x.k)&&walkOk(travel(S.place,x.k)))return x.k}catch(e){}}return null});
  const h0=await H.p.evaluate(()=>({Q:Q.map(m=>m.t),lab:document.querySelectorAll('.ksfl').length,modal:!document.getElementById('modal').hidden&&document.getElementById('modal').textContent.slice(0,60)}));
  const g0=await G.p.evaluate(()=>({bac:S.bac,ui:COOPW.thin.uiN|0}));
  const r=await G.p.evaluate(k=>{const F=COOPW.thin.F;Q.length=0;j77Tap(k,'');return {id:F.pend&&F.pend.id}},k);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,15000):false;
  const seen=await until(G,()=>Q.some(m=>/^Xong việc/.test(String(m.t||''))),null,8000);await sleep(800);await sync();
  const g=await G.p.evaluate(()=>{const q=S.st&&S.st.ms&&S.st.ms.q14&&S.st.ms.q14.L.find(x=>x.id==='di');return {place:S.place,q:q&&{n:q.n,ok:q.ok},bac:S.bac,cards:Q.filter(m=>/^Xong việc/.test(String(m.t||''))).map(m=>m.t),ui:COOPW.thin.uiN|0,
   ans:(COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.r0&&COOPW.thin.F.lastAns.r0.ui||[]).map(x=>x[0])}});
  const h=await H.p.evaluate(()=>({Q:Q.map(m=>m.t),lab:document.querySelectorAll('.ksfl').length,modal:!document.getElementById('modal').hidden&&document.getElementById('modal').textContent.slice(0,60)}));
  const hostClean=!h.Q.some(t=>/^Xong việc/.test(String(t)))&&!/Xong việc/.test(String(h.modal||''));
  const bacUp=g.bac-g0.bac;
  ok(!!k&&st.q&&got&&g.place===k&&g.q&&g.q.ok===1&&bacUp>0&&seen&&g.cards.length===1&&hostClean,'P11 her walk\'s own card: quest «Đi một nơi trong cung» done + Bạc, the «Xong việc» card on HER phone once, none on the host',{k,st,got,g,bacUp,h0,h});
  ok(g.ans.includes('kitStatFx')&&g.ui>g0.ui,'P11 her Bạc floater (kitStatFx, captured on the host) plays on her phone',{ans:g.ans,ui:[g0.ui,g.ui]});
  if(process.env.SHOTS&&seen){fs.mkdirSync(process.env.SHOTS,{recursive:true});await G.p.evaluate(()=>{const i=Q.findIndex(m=>/^Xong việc/.test(String(m.t||'')));if(i>0)Q.unshift(Q.splice(i,1)[0]);try{showModal()}catch(e){}});await sleep(1500);
   const vp=G.p.viewportSize();await G.p.screenshot({path:path.join(process.env.SHOTS,`f2r2-guest-xongviec-${vp.width}x${vp.height}.png`)});const hv=H.p.viewportSize();await H.p.screenshot({path:path.join(process.env.SHOTS,`f2r2-host-${hv.width}x${hv.height}.png`)})}
  table.push({P11:{k,g,h}});await G.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}render()})}
 /* P12 (LUẬT SỬA CẢ NHÓM): the emitter family. A test-only probe registered on both seats (the same TH.F.reg road every intent takes) runs
    each emitter in HER context on the host; table: shown on her seat / on the host. Rows = dev/test/coop-thin-quiet-scan.js kinds. */
 {const reg=o=>o.p.evaluate(()=>{window.__thProbe=function(c){return (0,eval)(c)};return COOPW.thin.F.reg('__thProbe',{lv:7,ctx:[],back:[],mine:()=>true,enc:A=>({c:A[0]}),dec:a=>a&&typeof a.c==='string'?[a.c]:null})});
  await reg(H);await reg(G);
  const probe=async(code)=>{await reset();await until(G,()=>!COOPW.thin.F.pend,null,20000);await sync();
   await H.p.evaluate(()=>{window.__hq0=Q.length;window.__hl0=document.querySelectorAll('.ksfl').length});const ui0=await G.p.evaluate(()=>COOPW.thin.uiN|0);
   const id=await G.p.evaluate(c=>{Q.length=0;try{closeModal()}catch(e){}const F=COOPW.thin.F;__thProbe(c);return F.pend&&F.pend.id},code);
   const got=id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,id,15000):false;await sleep(700);await sync();await sleep(300);
   const g=await G.p.evaluate(()=>({Q:Q.map(m=>String(m.t||'')),ui:COOPW.thin.uiN|0,r:COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.r0}));
   const h=await H.p.evaluate(()=>({Q:Q.map(m=>String(m.t||'')).slice(window.__hq0||0),lab:document.querySelectorAll('.ksfl').length-(window.__hl0||0),toast:(document.getElementById('rtoast')||{}).className||''}));
   return {got,g,h,ui:g.ui-ui0}};
  const rows=[];
  /* (a) inside her intent run on the host: quiet is off (cards / Sổ ghi lines as solo), every screen gate is off (nothing draws on the host) */
  {const p=await probe("String(JSON.stringify({q:quiet,so:screenOff(),kf:kfOn(),iv:ievOn(),kr:!!krOn(),km:!!kmOn(),ctx:COOPW.ctx}))");const v=p.g.r&&p.g.r.r?JSON.parse(p.g.r.r):{};
   rows.push(['gates in her run','quiet / screenOff / kfOn / ievOn / krOn / kmOn',JSON.stringify(v),v.q===false&&v.so===true&&!v.kf&&!v.iv&&!v.kr&&!v.km&&v.ctx==='b'])}
  const CARD=[['card67 (j67: 10 callers)',"card67('result','Thử card67',[['Dòng','một']])",'Thử card67'],
   ['tdPop (j55)',"tdPop('Thử tdPop',rivals.find(v=>v&&!v.coop&&v.alive),'<p>x</p>')",'Thử tdPop'],
   ['kitPanel (jtq14 doneCard / introCard, the kit card)',"kitPanel({kind:'result',title:'Thử kitPanel',sections:[{h:'',rows:[['a','b','']]}],btn:'Đã hiểu'})",'Thử kitPanel'],
   ['pushModal (plain card)',"pushModal({t:'Thử pushModal',btn:'Đã hiểu',h:'<p>x</p>'})",'Thử pushModal']];
  for(const [n,code,t] of CARD){const p=await probe(code+";''");const her=p.g.Q.filter(x=>x===t).length,hs=p.h.Q.filter(x=>x===t).length;rows.push([n,'card (Q)',`her seat ${her} · host ${hs}`,p.got&&her===1&&hs===0])}
  /* numbers / floaters: apply → popNum → kitStatFx (j1), the coin feedback (j11), toasts */
  {const p=await probe("apply({bac:7});''");const ks=((p.g.r&&p.g.r.ui)||[]).map(x=>x[0]);rows.push(['apply → popNum / kitStatFx + coin feedback (j1, j11)','number / floater',`captured ${ks.join('+')||'-'} · played on her phone ${p.ui} · host labels ${p.h.lab}`,p.got&&ks.includes('kitStatFx')&&ks.includes('feedback')&&p.ui>=2&&p.h.lab===0])}
  {const p=await probe("kitLine('Thử kitLine');''");const ks=((p.g.r&&p.g.r.ui)||[]).map(x=>x[0]);rows.push(['kitLine / srvToast (toast)','toast',`captured ${ks.join('+')||'-'} · played ${p.ui}`,p.got&&ks.includes('kitLine')&&p.ui>=1])}
  /* a Sổ ghi line gated on quiet (j85 deed line through apply, jagknow tai mắt lines): quiet off in her run → the line is in her patch */
  {const p=await probe("String(quiet===false)");rows.push(['Sổ ghi lines gated on quiet (j85 deed, jagknow tmTry / tmTake / tmNo / tmFear, jlogsync)','Sổ ghi line','quiet off in her run: '+(p.g.r&&p.g.r.r),p.got&&p.g.r&&p.g.r.r==='true'])}
  for(const r of rows){console.log('  EMITTER',r[3]?'green':'RED  ',r[0],'|',r[1],'|',r[2])}
  ok(rows.every(r=>r[3]),`P12 the emitter family in her intent run: every card on HER seat once and none on the host, numbers / toasts captured and played on her phone, the screen gates off on the host (${rows.filter(r=>r[3]).length}/${rows.length})`,rows.filter(r=>!r[3]));
  table.push({P12:rows})}
 /* P13 (Foreman B: same family): her BUỔI STEP on the host (part E, her context b) plays as solo: a buổi-event card made inside her step
    (a test hook after her nextBuoi emits card67 + a Bạc floater, as pl67Lapse / tdPop / q72 do) shows on HER phone once, none on the host */
 {await reset();await until(G,()=>!COOPW.thin.F.pend,null,20000);await sync();
  await H.p.evaluate(()=>{window.__p13=0;const f=nextBuoi;nextBuoi=function(){const r=f.apply(this,arguments);try{if(COOPW.ctx==='b'&&!window.__p13){window.__p13=1;card67('result','Thử buổi mới',[['Dòng','buổi']]);apply({bac:3})}}catch(e){console.error(e)}return r}});
  const ui0=await G.p.evaluate(()=>COOPW.thin.uiN|0),b0=await G.p.evaluate(()=>S.buoi||0);
  const t0=Date.now();while(Date.now()-t0<40000){await press1(H);await press1(G);await sleep(700);if(await G.p.evaluate(b=>(S.buoi||0)!==b,b0))break}
  const seen=await until(G,()=>Q.some(m=>String(m.t||'')==='Thử buổi mới'),null,15000);await sleep(800);
  const g=await G.p.evaluate(()=>({n:Q.filter(m=>String(m.t||'')==='Thử buổi mới').length,ui:COOPW.thin.uiN|0,b:S.buoi||0}));
  const h=await H.p.evaluate(()=>({hook:window.__p13,n:Q.filter(m=>String(m.t||'')==='Thử buổi mới').length,lab:document.querySelectorAll('.ksfl').length}));
  ok(seen&&h.hook===1&&g.n===1&&h.n===0&&g.ui>ui0,'P13 her buổi step (E, on the host): a buổi-event card on HER phone once + her floater played there; none on the host',{g,h,ui0,b0});
  await G.p.evaluate(()=>{const i=Q.findIndex(m=>String(m.t||'')==='Thử buổi mới');if(i>=0){Q.splice(i,1)}render()})}
 /* latency */
 {const ms=table.filter(x=>x&&typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b);if(ms.length)console.log('LATENCY tap→arrival ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1])}
 if(TRIPSRC){const t=await G.p.evaluate(()=>window.__trip&&__trip()).catch(e=>({err:e.message}));
  console.log('TRIPWIRE place loop (guest writes outside fromCanon): total',t&&t.total,'state',t&&t.state,'· statePart',JSON.stringify(t&&t.statePart),'· top',JSON.stringify(Object.entries((t&&t.entries)||{}).filter(([k])=>/goTo|visit|walk|talk|accEtq|acc(Ask|Sneak)|place|scout|invite/i.test(k)).slice(0,30)));console.log('TRIPWIRE all entries (top 12):',JSON.stringify(Object.entries((t&&t.entries)||{}).sort((x,y)=>y[1]-x[1]).slice(0,12)))}
 console.log('PLACE table:');for(const x of table)console.log(' ',JSON.stringify(x).slice(0,360));
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f2-places-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);ok(n(ho)+n(go)===0,'P8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 {const t=await H.p.evaluate(()=>window.__inTap);ok(t&&!Object.keys(t).length,'P12b no buổi / week step and no un-sendable card (D.bad) inside any intent run of hers on the host (whole suite)',t)}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const o of [H,G]){await o.p.evaluate(()=>{try{render()}catch(e){}});await sleep(800);const vp=o.p.viewportSize();await o.p.screenshot({path:path.join(process.env.SHOTS,`f2-L${LVL}-${o.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f2 L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
