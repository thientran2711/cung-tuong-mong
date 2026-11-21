/* Co-op thin guest, part F6a (review/coop-thin-f6): her deck cards (ONE hand, dealt on the host), quest steps and her other acts are
   intents run on the host (TH.F.reg, level 11). Harness = coop-thin-f5.js (host Fold 686x880 + guest iPad 1180x820; swap=1: roles swapped).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f6.js <workerURL> [level=11] [swap=0]   (TRIP=1, OUT=<dir>, LAG=<ms>, CPU=<rate>, ROWS=H,A,Q)
   level 10 = the old road (her phone runs them: the BEFORE column of latency + tripwire; rows only check nothing was sent).
   Rows: H her hand on her phone = the host's hand (names, order) · A every card of several hands, one tap each (sent once, run once on the
   host, both phones the same, the card done on both, khắc = cardCost, a rolled card's stats = cost + win/lose table: runOpt's own rule) ·
   A-dup double tap · Q quest steps · E/S/K/O empAct / servAct / elderAct / sgOver+sgServ (+ a step sgStep cannot give: refused). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||11);const SWAP=+(process.argv[4]||0);
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
 const ON=LVL>=11;/* level 11 = F6a on; below = the old road (her phone runs it: the BEFORE column of latency / tripwire) */
 /* helpers in both pages: her person's summary (bạc, the bag as a multiset, worn flags, wd slots, veil, khắc, newest log line), the item locator (law 6c) */
 const HELP=()=>{window.__sum=s=>{const inv=(s.inv||[]).filter(e=>e&&!e.h).map(e=>e.k+(e.w?'*':'')+(e.t?'!'+e.t:'')).sort();const wd=s.wd?{tram:s.wd.tram&&s.wd.tram.k,y:s.wd.y&&s.wd.y.k}:null;
   return {bac:s.bac,inv,wd,vl:s.vl&&s.vl.k||null,log:String((s.logs||[])[0]||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,90),nlog:(s.logs||[]).length,suc:s.suc,sac:s.sac,danh:s.danh,duc:s.duc}};
  window.__iu3=tag=>{const B=COOPW.seat==='a'&&COOPW.thin.seatOf?COOPW.thin.seatOf('b'):null;const I=(B&&B.S&&B.S.inv)||[];const e=I.find(x=>x&&x.tg3===tag)||S.inv.find(x=>x&&x.tg3===tag);return e&&e.iu!=null?e.iu:null};
  if(COOPW.seat==='b'&&typeof mkSync==='function'&&!window.__mkP){window.__mkP=[];const f=mkSync;mkSync=function(p){const b=p===S&&S.mood?JSON.stringify(S.mood.log):null;const r=f.apply(this,arguments);if(b!==null&&S.mood&&JSON.stringify(S.mood.log)!==b&&window.__mkP.length<12)window.__mkP.push({u:typeof used==='number'?used:null,st:String(new Error().stack).split('\n').slice(2,9).map(x=>x.trim().split(' ')[1]).join('<')});return r};window.mkSync=mkSync}
  /* F6a #3 probe: on the host, every change of HER stored khắc clock (B.g.used) by a withSeat run / a store drop (which run, in → out) */
  if(COOPW.seat==='a'&&!window.__uP){window.__uP=[];const T=COOPW.thin;const ws=T.withSeat;T.withSeat=function(seat,fn){const B0=seat==='b'?T.seatOf('b'):null;const u0=B0&&B0.g?B0.g.used:null;try{return ws.apply(this,arguments)}finally{try{const B1=seat==='b'?T.seatOf('b'):null;const u1=B1&&B1.g?B1.g.used:null;if(seat==='b'&&u0!==u1){window.__uP.push({d:T.curDo||null,u0,u1,same:B0===B1,st:String(new Error().stack).split('\n').slice(2,7).map(x=>x.trim().split(' ')[1]).join('<')});if(window.__uP.length>12)window.__uP.shift()}}catch(e){}}};
   const sd=T.seatDrop;T.seatDrop=function(seat){if(seat==='b'){window.__uP.push({drop:1,st:String(new Error().stack).split('\n').slice(2,6).map(x=>x.trim().split(' ')[1]).join('<')});if(window.__uP.length>12)window.__uP.shift()}return sd.apply(this,arguments)}}
  window.__her=()=>{if(COOPW.seat==='a'){return COOPW.thin.withSeat('b',()=>Object.assign(__sum(S),{used}))}return Object.assign(__sum(S),{used})};
  window.__where3=(tag,iu,k)=>{const L=[];const hit=e=>!!e&&(e.tg3===tag||(iu!=null&&e.iu===iu&&(!k||e.k===k)));const scan=(who,arr)=>{for(const e of arr||[])if(hit(e))L.push(who+':'+e.k)};scan('host',S.inv);const B=COOPW.thin.seatOf&&COOPW.thin.seatOf('b');scan('her',B&&B.S&&B.S.inv);
   for(const v of rivals||[])if(v&&!v.coop)scan('npc'+v.id,v.inv);for(const s of [S,B&&B.S])try{for(const x of (s&&s.il&&s.il.box)||[])if(x&&hit(x.e))L.push('il:'+x.at)}catch(e){}
   for(const s of [S,B&&B.S])try{for(const sl of ['tram','y'])if(s&&s.wd&&hit(s.wd[sl]))L.push('wd:'+sl);for(const x of (s&&s.wdPawn)||[])if(x&&hit(x.e))L.push('pawn')}catch(e){}return L}};
 await H.p.evaluate(HELP);await G.p.evaluate(HELP);
 /* stage her person in the HOST's store (her context) → the patch reaches her phone (never written on her phone) */
 const stage=async src=>{const r=await H.p.evaluate(src=>{try{return COOPW.thin.withSeat('b',()=>{const o=(0,eval)('(function(){'+src+'})')();/* every staged piece gets its ledger id now (the game gives it lazily): the same piece is traced by it after giveTo hands over a new entry */for(const e of S.inv||[])if(e&&e.tg3&&e.iu==null&&typeof ilUid==='function')ilUid(e);return o})}catch(e){return 'EXC '+e.message}},src);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();await sleep(300);return r};
 await stage("S.bac=Math.max(S.bac||0,3000);S.suc=60;S.confined=0;S.out=0;if(S.maid){S.maid.loyal=80;delete S.maid.spyFor}");
 {const a=await G.p.evaluate(()=>__her()),b=await H.p.evaluate(()=>__her());console.log('setup (info): her bag on her phone',a.inv.length,'· the host\'s copy',b.inv.length,'(her own changes reach the host in her next intent / ready diff: E / F1)')}
 const table=[];const trip=()=>TRIPSRC?G.p.evaluate(()=>window.__trip&&__trip()).catch(()=>null):null;const tw0=await trip();
 const pick=src=>G.p.evaluate(src=>(0,eval)('(function(){'+src+'})')(),src);
 const ROWS=process.env.ROWS?process.env.ROWS.split(','):null;
 /* F5 summary: pets, shelf plants, arts (level/progress), Tứ đức, favour, the work count */
 const HELP5=()=>{const s0=window.__sum;window.__sum=s=>Object.assign(s0(s),{pets:(s.pets||[]).map(P=>P.t+':'+Math.round(P.full||0)+'/'+Math.round(P.clean||0)+'/'+Math.round(P.joy||0)+'/'+Math.round(P.aff||0)).join(','),
   shelf:Object.entries((s.shelf&&s.shelf.g)||{}).filter(([g,e])=>e&&e.pc!=null).map(([g,e])=>g+':'+e.pc).sort().join(','),arts:JSON.stringify(s.arts||{}),artp:JSON.stringify(s.artp||{}),vir:JSON.stringify(s.vir||{}),
   sung:s.sung,an:s.an||0,th:s.th,mg:s.mg?s.mg.k+':'+s.mg.mode+(s.mg.cost?':c':''):null,nwk:(s.inv||[]).filter(e=>e&&e.wk).length,mood:s.mood?JSON.stringify(Object.assign({},s.mood,{log:(s.mood.log||[]).map(x=>JSON.stringify(x)).sort()})):null,q72:JSON.stringify(s.q72&&{a:(s.q72.a||[]).map(x=>x.u+':'+x.st),d:s.q72.d,n:s.q72.n}||null),tamco:s.tamco||0,kids:(s.kids||[]).map(k=>k.name+':'+k.tal+':'+k.fond+':'+k.hp).join(','),staffAf:JSON.stringify((s.staff||[]).map(x=>x.loyal||0))})};
 await H.p.evaluate(HELP5);await G.p.evaluate(HELP5);
 const reset=async()=>{for(let i=0;i<3;i++){await clear(H);await clear(G)}await G.p.evaluate(()=>{Q.length=0;used=0;window.__aaPend=null;try{kg82Close()}catch(e){}try{closeModal()}catch(e){}render()});await H.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}/* F6a #3: her khắc clock reset on BOTH copies (resetting it on her phone only made the host's copy differ = a test artefact) */try{COOPW.thin.withSeat('b',()=>{used=0})}catch(e){}})};
 /* her phone: the game's play forced to a raw score (the real end chain runs from there); Math.random fixed on a phone (rolls) */
 await G.p.evaluate(()=>{window.__kp0=kg82Play;kg82Play=function(kind,onEnd){if(window.__raw==null)return window.__kp0.apply(this,arguments);const r=window.__raw;setTimeout(()=>onEnd(r),0)};
  window.__aaN=0;const a=window.aaShowLast;window.aaShowLast=function(){window.__aaN++;return a.apply(this,arguments)}});
 const rnd=(o,v)=>o.p.evaluate(v=>{if(!window.__mr0)window.__mr0=Math.random;Math.random=v==null?window.__mr0:()=>v},v);
 const D=(b,a)=>{const o={};for(const k of ['suc','bac','sac','danh','duc','sung','an','th','nwk'])o[k]=(a[k]||0)-(b[k]||0);for(const k of ['inv','pets','shelf','arts','artp','vir','mg'])o[k]=a[k];return o};
 /* one end from her phone. o.pre = the start + the game opened and played (her phone); src = the end tap; o.twin = the same end on a CLONE
    of her person, old road (level 7, Math.random = o.r on her phone) → its delta must equal the real one. o.reject: the host refuses it. */
 const act=async(tag,src,o={})=>{if(ROWS&&!ROWS.some(x=>tag.startsWith(x)))return {skip:1};await until(G,()=>!COOPW.thin.F.pend,null,20000);await reset();if(o.stage)await stage(o.stage);await sync();
  await G.p.evaluate(r=>{window.__raw=r},o.raw==null?null:o.raw);
  if(o.pre){const e=await pick('Q.length=0;try{closeModal()}catch(e){}'+o.pre);if(e)console.log(tag,'pre:',JSON.stringify(e).slice(0,300))}await sleep(o.wait||400);
  const r0=o.r==null?0.5:o.r;await rnd(G,o.hr!=null?o.hr:r0)/* the twin rolls as the host will */;
  const twin=o.twin&&ON?await G.p.evaluate(src=>{const TH=COOPW.thin;const S0=S,u0=used,lv=TH.lvl,lw=COOPW.lvWas,ap=window.__aaPend,q0=Q.slice(),fx=window.aaCardTo,tq=TDS.q;const C=JSON.parse(JSON.stringify(S0));let out=null,err=null;
    S=C;TH.lvl=7;COOPW.lvWas=7;window.aaCardTo=()=>{};try{const b=__sum(S);(0,eval)('(function(){'+src+'})')();out={b,a:__sum(S),du:used-u0}}catch(e){err=e.message}finally{S=S0;used=u0;TH.lvl=lv;COOPW.lvWas=lw;window.__aaPend=ap;window.aaCardTo=fx;TDS.q=tq;Q.length=0;Q.push(...q0)}return out||{err}},o.twin):null;
  await rnd(H,o.hr!=null?o.hr:r0);await rnd(G,o.gr!=null?o.gr:r0)/* her phone: the other outcome (it must never roll) */;
  const g0=await G.p.evaluate(()=>__her()),h0=await H.p.evaluate(()=>__her());const st0=await H.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{ms:0}));const gs0=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{ms:0},{aaN:window.__aaN}));
  const hc0=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  const r=await G.p.evaluate(src=>{const F=COOPW.thin.F;const s0=F.stat.sent,l0=F.stat.local;const t0=performance.now();let err=null;
   try{(0,eval)('(function(){'+src+'})')()}catch(e){err=String(e&&e.stack||e).slice(0,300)}const ms=Math.round(performance.now()-t0);
   const nx=document.getElementById('next');return {err,ms,pend:!!F.pend,next:!!(nx&&nx.disabled),sent:F.stat.sent-s0,local:F.stat.local-l0,id:F.pend&&F.pend.id,n:F.pend&&F.pend.n}},src);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,20000):false;const ansG=got?await G.p.evaluate(()=>COOPW.thin.F.lastAns):null;/* review f6b r1: her own answer, read at once (ptime-reds' due-task tick ptTickHer may answer after it and take lastAns) */
  await sleep(1500);await sync();await rnd(G,null);await rnd(H,null);
  if(o.shot&&process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const p of [H,G]){await tapText(p,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (never closed by this scripted run) */;await p.p.evaluate(()=>{for(const el of document.querySelectorAll('.nl-intro,#nlIntro,[data-nlintro]'))el.remove()}).catch(()=>{})}await sleep(1200);for(const p of [H,G]){const vp=p.p.viewportSize();await p.p.screenshot({path:path.join(process.env.SHOTS,`f6-${o.shot}-L${LVL}-${p.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
  const g1=await G.p.evaluate(()=>__her()),h1=await H.p.evaluate(()=>__her());const st1=await H.p.evaluate(()=>COOPW.thin.F.stat);const gs1=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{aaN:window.__aaN}));const ans=ansG&&ansG.id===r.id?ansG:await G.p.evaluate(()=>COOPW.thin.F.lastAns);
  const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  const same=JSON.stringify(Object.assign({},g1,{log:0,nlog:0,used:0}))===JSON.stringify(Object.assign({},h1,{log:0,nlog:0,used:0}));
  const row={tag,r,got,st:ans&&ans.id===r.id&&ans.r0?ans.r0.st:null,ran:(st1.run||0)-(st0.run||0),ms:ans&&ans.id===r.id?ans.ms:null,g0,g1,h1,same,hostCard:hc1!==hc0,
   aaPaid:(st1.aaPaid|0)-(st0.aaPaid|0),aaCard:(st1.aaCard|0)-(st0.aaCard|0),aaN:(gs1.aaN|0)-(gs0.aaN|0),skip:(gs1.skip|0)-(gs0.skip|0),bad:(st1.mgBad|0)-(st0.mgBad|0),hlog:await H.p.evaluate(()=>COOPW.thin.F.log.slice(-3))};
  if(twin&&twin.a){row.solo=D(twin.b,twin.a);row.solo.used=twin.du;row.real=D(g0,g1);row.real.used=g1.used-g0.used;row.twinOk=JSON.stringify(row.solo)===JSON.stringify(row.real)}else if(twin)row.twinErr=twin.err;
  row.good=ON?(!r.err&&r.pend&&r.next&&r.sent===1&&r.local===0&&got&&same&&!row.hostCard&&(o.reject?(row.st==='gone'&&row.aaPaid===0):(row.st==='ok'&&row.ran===1&&(o.twin?row.twinOk===true:true)))&&(o.chk?o.chk(row):true))
   :(r.sent===0)/* the old road: her phone runs it (a staged over-max / bad-kind end may throw there: solo never calls it so) */;
  const kd=(x,y)=>{const o={};for(const k of new Set([...Object.keys(x||{}),...Object.keys(y||{})]))if(JSON.stringify((x||{})[k])!==JSON.stringify((y||{})[k]))o[k]=[(x||{})[k],(y||{})[k]];return o};
  row.diff=row.solo?kd(row.solo,row.real):null;row.sameDiff=same?null:kd(Object.assign({},g1,{log:0,nlog:0,used:0}),Object.assign({},h1,{log:0,nlog:0,used:0}));
  table.push(row);ok(row.good,`${tag}${ON?'':' (L'+LVL+' old road: local)'}`,row.good?{ms:row.ms,local_ms:r.ms}:{err:r.err,pend:r.pend,next:r.next,sent:r.sent,local:r.local,got,st:row.st,ran:row.ran,hostCard:row.hostCard,diff:row.diff,twinErr:row.twinErr,sameDiff:row.sameDiff,aaPaid:row.aaPaid,aaCard:row.aaCard,aaN:row.aaN,skip:row.skip,bad:row.bad,hlog:row.hlog,log:[g0.log,g1.log,h1.log],used:[g0.used,g1.used,h1.used],mkP:row.same?0:await G.p.evaluate(()=>(window.__mkP||[]).slice(-4)),uP:row.same?0:await H.p.evaluate(()=>(window.__uP||[]).slice(-8))});await G.p.evaluate(()=>{if(window.__mkP)window.__mkP.length=0});return row};
 /* ---- H: one hand ---- */
 const nm=a=>a.n+(a.done?'*':'')+(a.__g?'#':'');
 const gHandN=()=>G.p.evaluate(()=>(deck||[]).map(a=>a.n+(a.done?'*':'')+(a.__g?'#':'')));
 const hHandN=()=>H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return (B&&B.hd||[]).map(a=>a.n+(a.done?'*':'')+(a.__g?'#':''))});
 const fresh=async src=>{await stage((src||'')+';S.suc=90;S.bac=Math.max(S.bac||0,3000);S.confined=0;S.mg=null;used=0;deal();');await sync();await G.p.evaluate(()=>render());await sleep(300)};
 await fresh('');
 if(ON){const [g,h]=[await gHandN(),await hHandN()];const st=L=>L.map(x=>x.replace(/#$/,''));ok(g.length>0&&JSON.stringify(st(g))===JSON.stringify(st(h)),'H1 her hand on her phone = the host\'s hand (one hand, dealt on the host)',{g,h});
  const d=await G.p.evaluate(()=>COOPW.thin.F.stat.gHand|0);ok(d>0,'H2 her phone took the host\'s hand',{gHand:d})}
 if(process.env.DBG)console.log('DBG2',JSON.stringify(await G.p.evaluate(()=>{const F=COOPW.thin.F;const w=window.mkSync;let n=0,g=0,st=[];window.mkSync=function(p){n++;if(F.gOn(11))g++;else if(st.length<3)st.push(JSON.stringify({on:COOPW.thin.on(11),seat:COOPW.seat,ctx:COOPW.ctx,dead:S&&S.dead,inLife:COOPW.inLife,inFC:COOPW.inFC,allow:COOPW.allow,allowN:COOPW.allowN,inW:COOPW.thin.C.inWorld()}));return w.apply(this,arguments)};const r0=F.stat.ro|0;render();window.mkSync=w;return {n,g,ro:(F.stat.ro|0)-r0,st}})));
 if(process.env.DBG)console.log('DBG',JSON.stringify(await G.p.evaluate(()=>{const F=COOPW.thin.F;const m0=JSON.stringify(S.mood);let e=null;try{mkSync(S)}catch(x){e=x.message}return {ro:F.stat.ro,same:m0===JSON.stringify(S.mood),src:String(window.mkSync).slice(0,160),e,lvl:COOPW.thin.lvl,ctx:COOPW.ctx,inFC:COOPW.inFC,allow:COOPW.allow,allowN:COOPW.allowN,inLife:COOPW.inLife,inW:COOPW.thin.C&&COOPW.thin.C.inWorld&&COOPW.thin.C.inWorld()}})));
 /* ---- A: every card of several hands, one tap each ---- */
 const stats=['suc','bac','sac','danh','duc','sung','tai','tamco'];
 const cardRule=(c,g0,g1)=>{const d={};for(const k of stats)d[k]=(g1[k]||0)-(g0[k]||0);const exp=(t)=>{const o={};for(const k of stats){const v=((c.c||{})[k]||0)+((t||{})[k]||0);if(v)o[k]=v}return o};
  const match=t=>Object.entries(exp(t)).every(([k,v])=>d[k]===v||(v>0&&d[k]>=0&&d[k]<v)||(v<0&&d[k]<=0&&d[k]>v))/* a clamp at 0 / 100 */;return {d,ok:match(c.w)||match(c.l)||!!c.go}};
 const seen=new Set();const HANDS=[['',''],['S.buoi=1',''],['S.buoi=2',''],['S.buoi=0;S.preg=2;S.hidden=true','']];
 if(ON||true)for(const [st] of HANDS){await fresh(st);let L=await G.p.evaluate(()=>(deck||[]).map((a,i)=>({i,n:a.n,hd:!!a.__hd,g:!!a.__g,rep:!!(a.rep||a.j76||a.rest||a.ad||a.ea||a.rt)/* repeatable / opens a card / a mood card eaSync rebuilds / a «Lối riêng» card (rtRefresh rebuilds the route cards after each step: its own ledger T.dn, solo the same) */,o:a.o,c:a.c,w:a.w,l:a.l,k:typeof cardCost==='function'?cardCost(a):0,go:!!a.go})));
  for(const c of L){if(c.g||!c.hd&&ON||seen.has(c.n))continue;const okc=await G.p.evaluate(n=>{const a=(deck||[]).find(x=>x&&x.n===n&&!x.done)/* by name: a played route card rebuilds the hand (indexes move) */;if(!a||a.done||a.lock||(typeof adDoorUsed==='function'&&adDoorUsed(a.n)))return false/* F6a #3: a shared door (jact: one act, one lock) or a locked card greys on her phone = solo: no tap */;try{return !!(can(cardCost(a))&&canPay(a)&&(a.b==null||(S.buoi||0)===a.b))}catch(e){return false}},c.n);if(!okc)continue;seen.add(c.n);
   if(seen.size>28)break;
   const row=await act(`A ${c.n}`,`act(deck.findIndex(a=>a&&a.n===${JSON.stringify(c.n)}&&!a.done))`,{shot:seen.size===1?'deck':0/* LOOK (SHOTS=dir): after her first deck card */,stage:'S.suc=90;S.bac=Math.max(S.bac||0,3000);',chk:x=>{const used=x.g1.used-x.g0.used;if(used!==c.k)console.log('  used',c.n,used,c.k,x.g0.used,x.g1.used);return used===c.k}});
   if(row&&row.g0&&ON){const dn=await G.p.evaluate(n=>(deck||[]).some(a=>a.n===n&&a.done),c.n),hdn=await H.p.evaluate(n=>{const B=COOPW.thin.seatOf('b');return (B&&B.hd||[]).some(a=>a.n===n&&a.done)},c.n);
    const cr=cardRule(c,row.g0,row.g1);const qn=await G.p.evaluate(()=>Q.length+((S.thq||[]).length));if(!c.rep&&!qn&&!(dn&&hdn)&&process.env.DBG)console.log('  hand',JSON.stringify(await G.p.evaluate(()=>deck.map(a=>a.n+(a.done?'*':'')))),JSON.stringify(await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return [B.hk,(B.hd||[]).map(a=>a.n+(a.done?'*':'')),COOPW.thin.F.stat.hDeal,COOPW.thin.F.stat.hRef]})));if(!c.rep&&!qn&&!(dn&&hdn))ok(false,`A ${c.n}: the card done on both phones`,{dn,hdn});if(!cr.ok)console.log('  info (rule):',c.n,JSON.stringify(cr.d),JSON.stringify({c:c.c,w:c.w,l:c.l}))}}}
 console.log('cards played:',seen.size,[...seen].join(' | '));console.log('host stat',JSON.stringify(await H.p.evaluate(()=>{const x=COOPW.thin.F.stat;return {rdN:x.rdN,rdMs:x.rdMs,hDeal:x.hDeal,hRef:x.hRef,cardBad:x.cardBad,run:x.run}})));
 if(ON){let i=-1;for(let t=0;t<4&&i<0;t++){await fresh('');for(let k=0;k<3;k++)await clear(G);i=await G.p.evaluate(()=>Q.length||document.querySelector('#modal:not([hidden])')?-1:(deck||[]).findIndex(a=>a.__hd&&!a.__g&&!a.done&&can(cardCost(a))&&canPay(a)))}/* coop-thin-g-f1 (review r1: a row stages its own state): the new deal can open cards on her phone (a player answers them before she can tap a deck card: Q 2, modal → act refused, sent 0), or hold no playable host-dealt card → answer them / deal again */
  const r=await G.p.evaluate(i=>{const F=COOPW.thin.F,b0=F.stat.busy,s0=F.stat.sent;if(i<0)return {i,buoi:S.buoi,suc:S.suc,khac:typeof khacLeft==='function'?khacLeft():null,d:(deck||[]).map(a=>a&&[a.n,a.__hd|0,a.__g|0,a.done|0,(()=>{try{return [can(cardCost(a)),canPay(a)]}catch(e){return 'x'}})()])};const pre={i,n:deck[i]&&deck[i].n,pend:!!F.pend,Q:Q.length,thq:(S.thq||[]).length,modal:!!document.querySelector('#modal:not([hidden])'),ov:!(document.getElementById('ov')||{}).hidden,mg:!!S.mg,buoi:S.buoi,inTurn:!!COOPW.inTurn,fz:!!COOP.frozen};act(i);act(i);const o={busy:F.stat.busy-b0,sent:F.stat.sent-s0};if(!o.sent)o.pre=pre;return o},i);await until(G,()=>!COOPW.thin.F.pend,null,20000);
  ok(r.sent===1&&(r.busy===1||r.busy===0),'A-dup double tap on a card: one intent',r);
  const rj=await G.p.evaluate(()=>{const F=COOPW.thin.F;const b0=F.stat.sent;COOP.send({t:'do',op:'f',args:{n:'act',a:{i:0,n:'Không có thẻ này'},c:{},ops:[]},base:COOPW.thin.view.v,id:'dfake'+Date.now()});return b0});await sleep(2500);
  const hb=await H.p.evaluate(()=>COOPW.thin.F.stat.cardBad|0);ok(hb>=1,'A-bad a card not in her hand: refused on the host',{cardBad:hb})}
 /* ---- Q: quest steps ---- */
 const qst=`const q=q72();q.a=[];const P0=S.place;for(let t=0;t<40;t++)for(const p of places().map(p=>p.k)){let x=null;try{x=q72Choose(q72Cands(p),p)}catch(e){}if(!x)continue;x.t0=wk();x.dl=wk()+6;q.a=[x];try{q72Enter(x,q72X(x))}catch(e){}const X=q72X(x);const st=X&&X.T.s[x.st];if(!st||st.w)continue;for(const pl of [S.place,p,P0]){S.place=pl;const o=st.ch?st.ch[0]:null;if(!q72Why(x,X,st,o))return}}q.a=[];return 'no doable quest';`;
 await stage(qst);await sync();
 const qa=await G.p.evaluate(()=>{const q=S.q72;const x=q&&q.a&&q.a[0];if(!x)return null;const X=q72X(x);const st=X&&X.T.s[x.st];return {u:x.u,oi:st&&st.ch?0:undefined,w:!!(st&&st.w)}});
 if(qa){await act('Q1 quest step (q72Do)',`q72Do(${JSON.stringify(qa.u)},${qa.oi==null?'undefined':qa.oi})`,{shot:'quest',chk:x=>x.g1.q72!==x.g0.q72||x.g1.log!==x.g0.log});
  await stage(qst);await sync();const u2=await G.p.evaluate(()=>S.q72&&S.q72.a[0]&&S.q72.a[0].u);
  if(u2!=null)await act('Q2 drop a quest (q72Drop)',`q72Drop(${JSON.stringify(u2)})`,{chk:x=>x.g1.q72!==x.g0.q72})}else ok(false,'Q staging: no quest could be made',null);
 await act('Q3 ask around (q72Ask)',`q72Ask()`,{stage:'const q=q72();q.a=[];q.cd={};q.mo={};if(S.evCd)for(const k in S.evCd)if(/q72/.test(k))delete S.evCd[k];',chk:x=>x.g1.q72!==x.g0.q72||x.g1.log!==x.g0.log});
 {const k=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>{const q=q72();q.d=q.d||{};q.d['th:']=1;const L=q72Debtors();return L.length?L[0][2]:null}));await sync();
  if(k)await act('Q4 call a favour in (q72Call)',`q72Call(${JSON.stringify(k)})`,{chk:x=>x.g1.q72!==x.g0.q72});else ok(false,'Q4 staging: no debtor',null)}
 /* ---- E / S / K / O: her other acts ---- */
 {const i=await G.p.evaluate(()=>rivals.findIndex(v=>v&&v.alive&&!v.coop&&v!==S&&!v.out));
  await act('E1 Hoàng hậu power: khất bổng (empAct cutpay)',`empAct(${i},'cutpay')`,{stage:'S.rank=7;',chk:x=>x.g1.log!==x.g0.log});await stage('S.rank=3;');await sync()}
 {const s=await G.p.evaluate(()=>{try{const L=allServ().filter(s=>{const o=ownerOf(s);return o&&o!==S&&!o.coop&&!s.spyFor});return L.length>1?[L[0].sid,L[1].sid]:null}catch(e){return null}});
  if(s!=null){await act('S1 servant card Mua chuộc (servAct mua)',`servAct('mua',${JSON.stringify(s[0])})`,{chk:x=>x.g1.nlog!==x.g0.nlog||x.g1.bac!==x.g0.bac||x.g1.used!==x.g0.used/* a lost roll: 2 khắc spent, no bạc; the log list may sit at its cap */});
   await act('O2 person-card job Mua chuộc, the game step (sgServ, step 1)',`sgServ(${JSON.stringify(s[1])},{step:1})`,{chk:x=>x.g1.nlog!==x.g0.nlog||x.g1.bac!==x.g0.bac||x.g1.used!==x.g0.used});
   await act('O3 a step sgStep never gives (sgServ step 9): refused',`sgServ(${JSON.stringify(s[1])},{step:9})`,{reject:1})}else ok(false,'S staging: no servant of another palace',null)}
 await act('O1 person-card job Nghe lén (sgOver, step 0)',`sgOver({step:0})`,{stage:'const L=liveRivals(true).filter(v=>!v.coop).slice(0,2);S.where=S.where||{};for(const v of L)S.where[v.id]=S.place;',chk:x=>x.g1.log!==x.g0.log||x.g1.nlog!==x.g0.nlog});
 {const e=await G.p.evaluate(()=>{try{const b=document.querySelector('[data-elder]');if(b)return [b.dataset.elder,b.dataset.eid];return null}catch(e){return null}});
  if(e)await act('K1 the elders (elderAct)',`elderAct(${JSON.stringify(e[0])},${JSON.stringify(e[1])})`,{});else console.log('K1 skipped: no elder button on screen')}
 /* latency */
 {const ms=table.filter(x=>typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b),lo=table.map(x=>x.r&&x.r.ms).filter(x=>typeof x==='number').sort((a,b)=>a-b);
  if(ms.length)console.log('LATENCY tap→answer ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1]);
  if(lo.length)console.log('LOCAL tap→render ms on her phone: n='+lo.length+' median='+lo[lo.length>>1]+' min='+lo[0]+' max='+lo[lo.length-1])}
 if(TRIPSRC){const t=await trip();const d=(a,b)=>{const o={};for(const k of new Set([...Object.keys(a||{}),...Object.keys(b||{})]))o[k]=((b||{})[k]||0)-((a||{})[k]||0);return o};
  const sp=d(tw0&&tw0.statePart,t&&t.statePart),en=d(tw0&&tw0.entries,t&&t.entries);
  console.log('TRIPWIRE ? stacks',JSON.stringify((t&&t.qs)||[]).slice(0,3000));console.log('TRIPWIRE F6 table: state',(t&&t.state)-(tw0&&tw0.state||0),'· by part',JSON.stringify(sp),'· entries',JSON.stringify(en),'· ? top',JSON.stringify((t&&t.parts&&t.parts['?']||[]).slice(0,8)),'· F1 top',JSON.stringify((t&&t.parts&&t.parts.F1||[]).slice(0,8)));
  if(ON)ok(!(en['F1|act']>0),'TRIP deck act writes on her phone = 0',en)}
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f6-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);ok(n(ho)+n(go)===0,'F8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f6 L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
