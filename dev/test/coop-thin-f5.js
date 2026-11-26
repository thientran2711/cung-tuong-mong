/* Co-op thin guest, part F5 (review/coop-thin-f5): her mini-game SCORE ends are intents run on the host (TH.F.reg, level 10).
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
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||10);const SWAP=+(process.argv[4]||0);
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
 const ON=LVL>=10;/* level 10 = F5 on; below = the old road (her phone runs it: the BEFORE column of latency / tripwire) */
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
 const table=[];const trip=()=>TRIPSRC?G.p.evaluate(()=>window.__trip&&__trip()).catch(()=>null):null;const tw0=await trip();
 const pick=src=>G.p.evaluate(src=>(0,eval)('(function(){'+src+'})')(),src);
 const ROWS=process.env.ROWS?process.env.ROWS.split(','):null;
 /* F5 summary: pets, shelf plants, arts (level/progress), Tứ đức, favour, the work count */
 const HELP5=()=>{const s0=window.__sum;window.__sum=s=>Object.assign(s0(s),{pets:(s.pets||[]).map(P=>P.t+':'+Math.round(P.full||0)+'/'+Math.round(P.clean||0)+'/'+Math.round(P.joy||0)+'/'+Math.round(P.aff||0)).join(','),
   shelf:Object.entries((s.shelf&&s.shelf.g)||{}).filter(([g,e])=>e&&e.pc!=null).map(([g,e])=>g+':'+e.pc).sort().join(','),arts:JSON.stringify(s.arts||{}),artp:JSON.stringify(s.artp||{}),vir:JSON.stringify(s.vir||{}),
   sung:s.sung,an:s.an||0,th:s.th,mg:s.mg?s.mg.k+':'+s.mg.mode+(s.mg.cost?':c':''):null,nwk:(s.inv||[]).filter(e=>e&&e.wk).length})};
 await H.p.evaluate(HELP5);await G.p.evaluate(HELP5);
 const reset=async()=>{for(let i=0;i<3;i++){await clear(H);await clear(G)}await G.p.evaluate(()=>{Q.length=0;used=0;window.__aaPend=null;try{kg82Close()}catch(e){}try{closeModal()}catch(e){}render()});await H.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}})};
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
  if(o.shot&&process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const p of [H,G]){await tapText(p,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (never closed by this scripted run) */;await p.p.evaluate(()=>{for(const el of document.querySelectorAll('.nl-intro,#nlIntro,[data-nlintro]'))el.remove()}).catch(()=>{})}await sleep(1200);for(const p of [H,G]){const vp=p.p.viewportSize();await p.p.screenshot({path:path.join(process.env.SHOTS,`f5-${o.shot}-L${LVL}-${p.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
  const g1=await G.p.evaluate(()=>__her()),h1=await H.p.evaluate(()=>__her());const st1=await H.p.evaluate(()=>COOPW.thin.F.stat);const gs1=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{aaN:window.__aaN}));const ans=ansG&&ansG.id===r.id?ansG:await G.p.evaluate(()=>COOPW.thin.F.lastAns);
  const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});
  const same=JSON.stringify(Object.assign({},g1,{log:0,nlog:0,used:0}))===JSON.stringify(Object.assign({},h1,{log:0,nlog:0,used:0}));
  const row={tag,r,got,st:ans&&ans.id===r.id&&ans.r0?ans.r0.st:null,ran:(st1.run||0)-(st0.run||0),ms:ans&&ans.id===r.id?ans.ms:null,g0,g1,h1,same,hostCard:hc1!==hc0,
   aaPaid:(st1.aaPaid|0)-(st0.aaPaid|0),aaCard:(st1.aaCard|0)-(st0.aaCard|0),aaN:(gs1.aaN|0)-(gs0.aaN|0),skip:(gs1.skip|0)-(gs0.skip|0),bad:(st1.mgBad|0)-(st0.mgBad|0),hlog:await H.p.evaluate(()=>COOPW.thin.F.log.slice(-3))};
  if(twin&&twin.a){row.solo=D(twin.b,twin.a);row.solo.used=twin.du;row.real=D(g0,g1);row.real.used=g1.used-g0.used;row.twinOk=JSON.stringify(row.solo)===JSON.stringify(row.real)}else if(twin)row.twinErr=twin.err;
  row.good=ON?(!r.err&&r.pend&&r.next&&r.sent===1&&r.local===0&&got&&same&&!row.hostCard&&(o.reject?(row.st==='gone'&&row.bad===1&&row.aaPaid===0):(row.st==='ok'&&row.ran===1&&(o.twin?row.twinOk===true:true)))&&(o.chk?o.chk(row):true))
   :(r.sent===0)/* the old road: her phone runs it (a staged over-max / bad-kind end may throw there: solo never calls it so) */;
  const kd=(x,y)=>{const o={};for(const k of new Set([...Object.keys(x||{}),...Object.keys(y||{})]))if(JSON.stringify((x||{})[k])!==JSON.stringify((y||{})[k]))o[k]=[(x||{})[k],(y||{})[k]];return o};
  row.diff=row.solo?kd(row.solo,row.real):null;row.sameDiff=same?null:kd(Object.assign({},g1,{log:0,nlog:0,used:0}),Object.assign({},h1,{log:0,nlog:0,used:0}));
  table.push(row);ok(row.good,`${tag}${ON?'':' (L'+LVL+' old road: local)'}`,row.good?{ms:row.ms,local_ms:r.ms}:{err:r.err,pend:r.pend,next:r.next,sent:r.sent,local:r.local,got,st:row.st,ran:row.ran,hostCard:row.hostCard,diff:row.diff,twinErr:row.twinErr,sameDiff:row.sameDiff,aaPaid:row.aaPaid,aaCard:row.aaCard,aaN:row.aaN,skip:row.skip,bad:row.bad,hlog:row.hlog,log:[g0.log,g1.log,h1.log]});return row};
 const KGO='document.getElementById("kg82go").click()',KOK='document.getElementById("kg82ok").click()',KSK='document.getElementById("kg82skip").click()';
 /* ---- P: pet care games ---- */
 const PK=await pick(`return Object.keys(PET).filter(k=>PET[k].pr&&PET[k].tr===0).slice(0,2)`);
 const petSt=`S.pets=[];S.petMax=Math.max(S.petMax||0,3);for(const t of ${JSON.stringify(PK)})S.pets.push({t,from:'x',src:'buy',care:80,at:tsbWk(),full:30,clean:30,joy:30,aff:20});S.petOn=0;`;
 const pc='petcOpen(0);PETC.game="feed"';
 await act('P1 Cho ăn, best score (petcGain feed 1): same as solo',`petcGain('feed',1)`,{stage:petSt,pre:pc,twin:`PETC.i=0;petcGain('feed',1)`,chk:x=>x.g1.pets!==x.g0.pets,shot:'pet'});
 await act('P2 Tắm, zero score (petcGain bath 0): same as solo',`petcGain('bath',0)`,{stage:petSt,pre:pc,twin:`PETC.i=0;petcGain('bath',0)`});
 await act('P3 over-max score (petcGain feed 1.01): refused, nothing applied',`petcGain('feed',1.01)`,{stage:petSt,pre:pc,reject:1,chk:x=>x.g1.pets===x.g0.pets});
 await act('P4 unknown care kind: refused',`petcGain('poke',.5)`,{stage:petSt,pre:pc,reject:1});
 await G.p.evaluate(()=>{try{petcClose()}catch(e){}});
 /* ---- G: shelf plant water game ---- */
 {const pk=await pick(`return Object.keys(BAL.shelf.it).find(k=>BAL.shelf.it[k].care)||null`);const gst=`shelfOf(S).g.f5p={k:${JSON.stringify(pk)},pc:40}`,gp=`shelfPlantOpen('f5p')`;
  await act('G1 water game, best score (shelfPlantGain 1): same as solo',`shelfPlantGain(1)`,{stage:gst,pre:gp,twin:`SHPC.g='f5p';shelfPlantGain(1)`,chk:x=>x.g1.shelf!==x.g0.shelf});
  await act('G2 water game, zero score: same as solo',`shelfPlantGain(0)`,{stage:gst,pre:gp,twin:`SHPC.g='f5p';shelfPlantGain(0)`});
  await act('G3 over-max (shelfPlantGain 1.2): refused',`shelfPlantGain(1.2)`,{stage:gst,pre:gp,reject:1,chk:x=>x.g1.shelf===x.g0.shelf});
  await G.p.evaluate(()=>{try{closeModal()}catch(e){}})}
 /* ---- L: Tài nghệ lessons (the work picker card, the deferred cost, the game, «Đã hiểu») ---- */
 const AK=await pick(`const a=ARTS.find(x=>WDEF[x.k]&&wkKindsOf(x.k).length&&x.k!=='y');return a?a.k:null`);
 const lst=`S.arts[${JSON.stringify(AK)}]=1;S.artp[${JSON.stringify(AK)}]=0;S.suc=80;S.bac=Math.max(S.bac,3000);S.mg=null;S.master=0;`;
 const lpre=mode=>`lessonMode(${JSON.stringify(AK)},'${mode}');if(!Q.length)return 'no picker';const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click();if(!Q.length)return 'no material card'}chooseM(0);if(!document.getElementById('kg82go'))return 'no game: '+JSON.stringify({mg:S.mg,Q:Q.map(q=>q.t),wp:typeof wkPend!=='undefined'?wkPend:'-'});${KGO}`;
 /* main mg-back r3 (KIT §13.9 kgDefer): a lesson's charge is only remembered until «Sẵn sàng» / the quick option (kgPay): the solo twin of a
    quick end takes it as solo's quick option does (on the copy, numbers only: the real pending objects are never touched) */
 const KGTW="{const pp=(typeof KG82!=='undefined'&&KG82.payOnGo)||null;if(pp&&typeof pp==='object'){if(pp.suc)S.suc+=pp.suc;if(pp.bac)S.bac+=pp.bac;if(pp.th)S.th+=pp.th;if(pp.khac)spend(pp.khac)}}";
 const ltw=(raw,sk)=>KGTW+`const m=S.mg;aaPayMG({title:'t',skip:${sk?1:0},ok:${raw>=5},raw:${sk?'null':raw}});wkLessonEnd(${JSON.stringify(AK)},m,${raw},{skipped:${!!sk}})`;
 const lchk=x=>x.aaPaid===1&&x.aaCard===1&&x.aaN===1&&x.g1.mg===null&&x.g1.suc-x.g0.suc===-15&&x.g1.used-x.g0.used===2;
 await act('L1 Tự học, max play (raw 10): cost once, the work made, same as solo',KOK,{stage:lst,pre:lpre('self'),raw:10,wait:900,twin:ltw(10),chk:x=>lchk(x)&&x.g1.nwk===x.g0.nwk+1,shot:'lesson'});
 await act('L2 Tự học, zero play (raw 0): same as solo',KOK,{stage:lst,pre:lpre('self'),raw:0,wait:900,twin:ltw(0),chk:lchk});
 await act('L3 over-max play (raw 11): refused, no cost, no gain, the lesson closed',KOK,{stage:lst,pre:lpre('self'),raw:11,wait:900,reject:1,chk:x=>x.g1.mg===null&&x.g1.suc===x.g0.suc&&x.g1.artp===x.g0.artp});
 await act('L4 Học nhanh: the HOST rolls (host win, her phone forced to lose)',KSK,{stage:lst,pre:`lessonMode(${JSON.stringify(AK)},'self');const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click();if(!Q.length)return 'no material card'}chooseM(0)`,hr:0,gr:0.999,twin:`Math.random=()=>0;`+ltw(0,1),chk:x=>x.skip===1&&lchk(x)&&x.g1.nwk===x.g0.nwk});
 await act('L5 Học với thầy (the teacher picker, then the work picker): cost once, same as solo',KOK,{stage:lst,pre:`lessonMode(${JSON.stringify(AK)},'teacher');if(!Q.length)return 'no teacher card';chooseM(0);if(!Q.length)return 'no picker';const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click();if(!Q.length)return 'no material card'}chooseM(0);if(!document.getElementById('kg82go'))return 'no game';${KGO}`,raw:8,wait:900,hr:0.99,twin:ltw(8),chk:x=>x.aaPaid===1&&x.aaN===1&&x.g1.mg===null&&x.g1.bac<x.g0.bac});
 /* ---- W / M: bậc 5 practice (Tự học, làm tác phẩm) and Học lối mới với thầy ---- */
 const wst=`S.arts[${JSON.stringify(AK)}]=5;S.suc=80;S.bac=Math.max(S.bac,3000);S.mg=null;`;
 const ptw=(raw,sk)=>KGTW+`const m=S.mg;aaPayMG({title:'t',skip:${sk?1:0},ok:${raw>=5},raw:${sk?'null':raw}});wkLessonEnd(${JSON.stringify(AK)},m,${raw},{skipped:${!!sk}})`;
 await act('W1 Tự học, làm tác phẩm (raw 7): the work made, cost once, same as solo',KOK,{stage:wst,pre:`wkPractice(${JSON.stringify(AK)});if(!Q.length)return 'no picker';const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click();if(!Q.length)return 'no material card'}chooseM(0);if(!document.getElementById('kg82go'))return 'no game';${KGO}`,raw:7,wait:900,twin:ptw(7),chk:x=>x.aaPaid===1&&x.g1.nwk===x.g0.nwk+1&&x.g1.mg===null});
 await act('W2 Học nhanh at bậc 5: no work, cost once',KSK,{stage:wst,pre:`wkPractice(${JSON.stringify(AK)});const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click();if(!Q.length)return 'no material card'}chooseM(0)`,twin:ptw(0,1),chk:x=>x.skip===1&&x.aaPaid===1&&x.g1.nwk===x.g0.nwk&&x.g1.mg===null});
 {const ok5=await pick(`return typeof rcpNewSt==='function'&&rcpNewSt(${JSON.stringify(AK)})`);
  if(ok5)await act('M1 Học lối mới với thầy (raw 8): the work made "học với thầy", same as solo',KOK,{stage:wst,pre:`rcpMaster(${JSON.stringify(AK)});if(!Q.length)return 'no teacher card';chooseM(0);if(!Q.length)return 'no picker';const t=document.querySelector('#modal [data-kwrgo]:not([disabled])');if(t){t.click();if(!Q.length)return 'no material card'}chooseM(0);if(!document.getElementById('kg82go'))return 'no game';${KGO}`,raw:8,wait:900,twin:ptw(8),chk:x=>x.aaPaid===1&&x.g1.nwk===x.g0.nwk+1&&/học với thầy/.test(x.h1.log+x.g1.log)});
  else ok(true,'M1 no new sub-style left for '+AK+' (skipped)')}
 /* ---- T: Tứ đức with a game ---- */
 const tst=`vNorm(S);S.vir.cong=1;S.suc=80;S.mg=null;TDS.busy=false;`;
 await act('T1 Tứ đức Tự học (raw 9): same as solo',KOK,{stage:tst,pre:`TDS.busy=false;tdPlay('cong','self');if(!document.getElementById('kg82go'))return 'no game';${KGO}`,raw:9,wait:900,twin:`tdFinish('cong','self',9,false)`,chk:x=>/Tiến bộ/.test(x.h1.log)});
 await act('T2 Tứ đức «Để trời định»: the HOST rolls (host win, her phone forced to lose)',KSK,{stage:tst,pre:`TDS.busy=false;tdPlay('cong','self')`,hr:0,gr:0.999,twin:`TDS.q=true;tdFinish('cong','self',BAL.skip.raw,true)`,chk:x=>x.skip===1});
 await act('T3 over-max (tdFinish raw 12): refused',`tdFinish('cong','self',12,false)`,{stage:tst,reject:1,chk:x=>x.g1.vir===x.g0.vir});
 /* ---- S / N: tsGame ends (the summons card, the lantern) ---- */
 const sst=`S.suc=80;S.sung=Math.max(S.sung||0,30);S.mg=null;`;
 const spre=`TSA.summonMe('dan');if(!Q.length)return 'no card';chooseM(0);if(!document.getElementById('kg82go'))return 'no game';`;
 await act('S1 Hoàng thượng triệu đánh đàn (raw 8): same as solo',KOK,{stage:sst,pre:spre+KGO,raw:8,wait:900,twin:`tsSummonEnd('dan',{raw:8,skipped:false,guard:null},null)`,chk:x=>x.g1.sung>x.g0.sung});
 await act('S2 Bỏ qua: the HOST rolls the odds (host win, her phone forced to lose)',KSK,{stage:sst,pre:spre,hr:0,gr:0.999,twin:`Math.random=()=>0;tsSummonEnd('dan',tsSkipRes(oddsCl(Math.round(tsSummonOdds(S,'dan')||50)),0),null)`});
 await act('S3 over-max (tsSummonEnd raw 11): refused',`tsSummonEnd('co',{raw:11,skipped:false,guard:null},null)`,{stage:sst,reject:1});
 for(const o of [H,G])await o.p.evaluate(()=>{window.__tdf=tsDenFest;tsDenFest=()=>({k:'trungthu',name:'Trung thu'})});
 await act('N1 Thả đèn cầu bình an (raw 8): same as solo',`tsDenEnd(1,{raw:8,skipped:false,guard:null},null)`,{stage:sst,twin:`tsDenEnd(1,{raw:8,skipped:false,guard:null},null)`,chk:x=>x.g1.duc>x.g0.duc||x.g1.log!==x.g0.log});
 for(const o of [H,G])await o.p.evaluate(()=>{tsDenFest=window.__tdf});
 /* double end */
 if(ON){await reset();await stage(petSt);await pick(pc);const r=await G.p.evaluate(()=>{const F=COOPW.thin.F,b0=F.stat.busy,s0=F.stat.sent;petcGain('play',1);petcGain('play',1);return {busy:F.stat.busy-b0,sent:F.stat.sent-s0,id:F.pend&&F.pend.id}});
  await until(G,()=>!COOPW.thin.F.pend,null,20000);ok(r.sent===1&&r.busy===1,'D1 double end: one intent, the second ignored',r)}
 /* review r1: R1 resend after her answer is lost (4G): the host runs the end ONCE (DONE), the cost paid once; X1/X2 no word of hers travels */
 if(ON&&(!ROWS||ROWS.some(x=>'R1'.startsWith(x)||x==='R1'))){await until(G,()=>!COOPW.thin.F.pend,null,20000);await reset();await stage(lst);await sync();await G.p.evaluate(()=>{window.__raw=10});
  const e=await pick('Q.length=0;try{closeModal()}catch(e){}'+lpre('self'));if(e)console.log('R1 pre:',e);await sleep(900);
  const h0=await H.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{her:__her()})),g0=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{her:__her()}));
  await G.p.evaluate(()=>{window.__deafThin=true});await G.p.evaluate(KOK=>(0,eval)(KOK),KOK);
  const rs=await until(G,n=>(COOPW.thin.F.stat.resend|0)>n,g0.resend|0,20000);await G.p.evaluate(()=>{window.__deafThin=false});
  const got=await until(G,()=>!COOPW.thin.F.pend,null,30000);await sleep(1500);await sync();
  const h1=await H.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{her:__her()})),g1=await G.p.evaluate(()=>Object.assign({},COOPW.thin.F.stat,{her:__her()}));
  const r={rs,got,run:(h1.run|0)-(h0.run|0),dup:(h1.dup|0)-(h0.dup|0),aaPaid:(h1.aaPaid|0)-(h0.aaPaid|0),suc:g1.her.suc-g0.her.suc,hsuc:h1.her.suc-h0.her.suc,used:g1.her.used-g0.her.used,nwk:g1.her.nwk-g0.her.nwk,mg:g1.her.mg};
  ok(rs&&got&&r.run===1&&r.dup>=1&&r.aaPaid===1&&r.suc===-15&&r.hsuc===-15&&r.used===2&&r.nwk===1&&r.mg===null,'R1 resend after a lost answer: the end runs once on the host, the cost paid once, one work',r);
  for(const [tag,mut] of [['X1 forged practice words (m.hw not in WK_HOW): refused','m.pa=1;m.hw="<b>x</b>"'],['X2 forged work subject (not one of wkSubj): refused','m.wk=Object.assign({},m.wk||{kind:WDEF[AK],mat:0},{subj:"<img src=x>"})']]){
   await until(G,()=>!COOPW.thin.F.pend,null,20000);await reset();await stage(lst);await sync();const b0=await H.p.evaluate(()=>COOPW.thin.F.stat.mgBad|0);const n0=await H.p.evaluate(()=>__her().nwk);
   await G.p.evaluate(([AK,mut])=>{const m={k:AK,l:1,mode:'self',wk:{kind:WDEF[AK],mat:0}};(0,eval)('(function(m,AK){'+mut+'})')(m,AK);wkLessonEnd(AK,m,7,{skipped:false})},[AK,mut]);
   await until(G,()=>!COOPW.thin.F.pend,null,20000);await sleep(800);await sync();const b1=await H.p.evaluate(()=>COOPW.thin.F.stat.mgBad|0);const n1=await H.p.evaluate(()=>__her().nwk);
   ok(b1-b0===1&&n1===n0,tag,{bad:b1-b0,nwk:[n0,n1]})}}
 /* latency */
 {const ms=table.filter(x=>typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b),lo=table.map(x=>x.r&&x.r.ms).filter(x=>typeof x==='number').sort((a,b)=>a-b);
  if(ms.length)console.log('LATENCY end→answer ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1]);
  if(lo.length)console.log('LOCAL end tap→render ms on her phone: n='+lo.length+' median='+lo[lo.length>>1]+' min='+lo[0]+' max='+lo[lo.length-1])}
 if(TRIPSRC){const t=await trip();const d=(a,b)=>{const o={};for(const k of new Set([...Object.keys(a||{}),...Object.keys(b||{})]))o[k]=((b||{})[k]||0)-((a||{})[k]||0);return o};
  const sp=d(tw0&&tw0.statePart,t&&t.statePart);
  console.log('TRIPWIRE F5 table (guest writes outside fromCanon during the end table): state',(t&&t.state)-(tw0&&tw0.state||0),'· by part',JSON.stringify(sp),'· F5 entries',JSON.stringify((t&&t.parts&&t.parts.F5||[]).slice(0,12)),'· ? top',JSON.stringify((t&&t.parts&&t.parts['?']||[]).slice(0,6)));
  if(ON)ok(!(sp.F5>0),'TRIP F5 end writes on her phone = 0',sp)}
 console.log('F5 table:');for(const x of table)console.log(' ',JSON.stringify({tag:x.tag,good:x.good,ms:x.ms,local:x.r&&x.r.ms,ran:x.ran,solo:x.solo,real:x.real}).slice(0,500));
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f5-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);ok(n(ho)+n(go)===0,'F8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f5 L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
