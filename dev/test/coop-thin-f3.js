/* Co-op thin guest, part F3 (review/coop-thin-f3): her bag / shop / wear / gifts are intents run on the host (TH.F.reg, level 8). Two
   Playwright clients in one room, host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins).
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f3.js <workerURL> [level=8] [swap=0]   (TRIP=1, OUT=<dir>, LAG=<ms>, CPU=<rate>, SHOTS=<dir>)
   level 7 = the old road (her phone runs the act: the BEFORE column of latency + tripwire; rows only check nothing was sent).
   F0 level on · B the bag (use, use on a consort, sell, test, inspect, taint) · W wearing (jewel on/off, hairpin wdWearUI/wdOffUI, y phục
   wdWear, sewing, wdAutoUI, wdSellUI) · S the kit shop (buy ×2, sell) · G gifts (consort, Hoàng thượng, Tổng quản, Biếu quà làm lành
   bạc / piece, plant here, nhà ngoại) · X gifts between the two players both directions · D1 double tap · law 6c: tagged pieces (tg3) are
   in exactly one place after each move · "same as solo": self-only acts are also run on a CLONE of her person on her phone with the old
   road (level forced below 8) and the deltas (bạc, bag, worn, slots, veil, Sức/Sắc/Danh, khắc, her log line) must be equal · her result
   card shows on her phone after the answer, never on the host · TRIP=1: F3 entry writes on her phone = 0. */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||8);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
  if(process.env.UISCAN&&name==='host')await ctx.addInitScript(fs.readFileSync(path.join(__dirname,'coop-thin-uiscan.js'),'utf8'));/* hostnull: the host-side UI scan of her runs */
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
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const ON=LVL>=8;/* level 8 = F3 on; below = the old road (her phone runs it: the BEFORE column of latency / tripwire) */
 const reset=async()=>{for(let i=0;i<3;i++){await clear(H);await clear(G)}await G.p.evaluate(()=>{Q.length=0;S.mg=null;used=0;try{closeModal()}catch(e){}render()});await H.p.evaluate(()=>{Q.length=0;S.mg=null;try{closeModal()}catch(e){}})};
 /* helpers in both pages: her person's summary (bạc, the bag as a multiset, worn flags, wd slots, veil, khắc, newest log line), the item locator (law 6c) */
 const HELP=()=>{window.__sum=s=>{const inv=(s.inv||[]).filter(e=>e&&!e.h).map(e=>e.k+(e.w?'*':'')+(e.t?'!'+e.t:'')).sort();const wd=s.wd?{tram:s.wd.tram&&s.wd.tram.k,y:s.wd.y&&s.wd.y.k}:null;
   return {bac:s.bac,inv,wd,vl:s.vl&&s.vl.k||null,log:String((s.logs||[])[0]||'').replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim().slice(0,90),nlog:(s.logs||[]).length,suc:s.suc,sac:s.sac,danh:s.danh,duc:s.duc}};
  window.__iu3=tag=>{const B=COOPW.seat==='a'&&COOPW.thin.seatOf?COOPW.thin.seatOf('b'):null;const I=(B&&B.S&&B.S.inv)||[];const e=I.find(x=>x&&x.tg3===tag)||S.inv.find(x=>x&&x.tg3===tag);return e&&e.iu!=null?e.iu:null};
  window.__her=()=>{if(COOPW.seat==='a'){return COOPW.thin.withSeat('b',()=>Object.assign(__sum(S),{used}))}return Object.assign(__sum(S),{used})};
  window.__where3=(tag,iu,k)=>{const L=[];const hit=e=>!!e&&(e.tg3===tag||(iu!=null&&e.iu===iu&&(!k||e.k===k)));const scan=(who,arr)=>{for(const e of arr||[])if(hit(e))L.push(who+':'+e.k)};scan('host',S.inv);const B=COOPW.thin.seatOf&&COOPW.thin.seatOf('b');scan('her',B&&B.S&&B.S.inv);
   for(const v of rivals||[])if(v&&!v.coop)scan('npc'+v.id,v.inv);for(const s of [S,B&&B.S])try{for(const x of (s&&s.il&&s.il.box)||[])if(x&&hit(x.e))L.push('il:'+x.at)}catch(e){}
   for(const s of [S,B&&B.S])try{for(const sl of ['tram','y'])if(s&&s.wd&&hit(s.wd[sl]))L.push('wd:'+sl);for(const x of (s&&s.wdPawn)||[])if(x&&hit(x.e))L.push('pawn')}catch(e){}return L}};
 await H.p.evaluate(HELP);await G.p.evaluate(HELP);
 /* F2 r2 (quiet off for her taps): the task card «Xong việc: …» (jtq14 doneCard) her act earns must reach HER phone, once, and never the host's */
 const DONEW=()=>{window.__done3=new Set();const seen=()=>{const m=document.getElementById('modal');if(!m||m.hidden)return;const t=(m.textContent||'').match(/Xong việc: ([^\n]{2,60}?)(Chương|$)/);if(t)window.__done3.add(t[1].trim())};
  new MutationObserver(seen).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']})};
 await H.p.evaluate(DONEW);await G.p.evaluate(DONEW);
 /* stage her person in the HOST's store (her context) → the patch reaches her phone (never written on her phone) */
 const stage=async src=>{const r=await H.p.evaluate(src=>{try{return COOPW.thin.withSeat('b',()=>{const o=(0,eval)('(function(){'+src+'})')();/* every staged piece gets its ledger id now (the game gives it lazily): the same piece is traced by it after giveTo hands over a new entry */for(const e of S.inv||[])if(e&&e.tg3&&e.iu==null&&typeof ilUid==='function')ilUid(e);return o})}catch(e){return 'EXC '+e.message}},src);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();await sleep(300);return r};
 await stage("S.bac=Math.max(S.bac||0,3000);S.suc=60;S.confined=0;S.out=0;if(S.maid){S.maid.loyal=80;delete S.maid.spyFor}");
 {const a=await G.p.evaluate(()=>__her()),b=await H.p.evaluate(()=>__her());console.log('setup (info): her bag on her phone',a.inv.length,'· the host\'s copy',b.inv.length,'(her own changes reach the host in her next intent / ready diff: E / F1)')}
 const table=[];let tw0=null;const BV=await G.p.evaluate(()=>({it:BAL.bacFee.itTest,court:BAL.bacFee.court,ts:BAL.tsGift.bac,tk:BAL.tsGift.khac}));
 const trip=()=>TRIPSRC?G.p.evaluate(()=>window.__trip&&__trip()).catch(()=>null):null;
 tw0=await trip();
 /* one act from her phone: src = the tap (guest JS, as the UI calls it). Returns the row: pending at once, nothing changed on her phone,
    sent once, the host ran it once in her context, her person the same on both phones after the answer */
 const ROWS=process.env.ROWS?process.env.ROWS.split(','):null;
 const act=async(tag,src,o={})=>{if(ROWS&&!ROWS.some(x=>tag.startsWith(x)))return {skip:1};await until(G,()=>!COOPW.thin.F.pend,null,20000);await reset();await sync();
  const twin=o.twin?await G.p.evaluate(src=>{const TH=COOPW.thin;const S0=S,u0=used,lv=TH.lvl,lw=COOPW.lvWas;const C=JSON.parse(JSON.stringify(S0));let out=null,err=null;
    S=C;TH.lvl=7;COOPW.lvWas=7;try{const b=__sum(S);(0,eval)('(function(){'+src+'})')();out={b,a:__sum(S),du:used-u0}}catch(e){err=e.message}finally{S=S0;used=u0;TH.lvl=lv;COOPW.lvWas=lw;Q.length=0;try{closeModal()}catch(e){}try{render()}catch(e){}}return out||{err}},src):null;
  const g0=await G.p.evaluate(()=>__her()),h0=await H.p.evaluate(()=>__her());const run0=await H.p.evaluate(()=>COOPW.thin.F.stat.run);
  const hc0=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});const c0=await G.p.evaluate(()=>COOPW.thin.F.stat.card|0);
  if(o.pre)await G.p.evaluate(src=>(0,eval)('(function(){'+src+'})')(),o.pre);
  const r=await G.p.evaluate(src=>{const F=COOPW.thin.F;const s0=F.stat.sent,l0=F.stat.local,gt0=F.stat.gate|0,b0=F.stat.busy;const before=JSON.stringify(__sum(S));const t0=performance.now();let err=null;
   try{(0,eval)('(function(){'+src+'})')()}catch(e){err=String(e&&e.stack||e).slice(0,300)}
   try{render()}catch(e){}const ms=Math.round(performance.now()-t0);
   const nx=document.getElementById('next');const now={pend:!!F.pend,next:!!(nx&&nx.disabled),same:JSON.stringify(__sum(S))===before};
   return {err,now,ms,sent:F.stat.sent-s0,local:F.stat.local-l0,gate:(F.stat.gate|0)-gt0,id:F.pend&&F.pend.id,n:F.pend&&F.pend.n}},src);
  if(o.after)await G.p.evaluate(src=>(0,eval)('(function(){'+src+'})')(),o.after);
  const got=r.id?await until(G,id=>!COOPW.thin.F.pend&&COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.id===id,r.id,20000):false;
  await sleep(500);await sync();
  if(o.shot&&process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const p of [H,G]){for(let i=0;i<3;i++)await tapText(p,/^Đã hiểu$/,800)/* setup edicts (the test's rank) */;await tapText(p,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (never closed by this scripted run) */;await p.p.evaluate(()=>{for(const el of document.querySelectorAll('.nl-intro,#nlIntro,[data-nlintro]'))el.remove()}).catch(()=>{})}await sleep(900);for(const p of [H,G]){const vp=p.p.viewportSize();await p.p.screenshot({path:path.join(process.env.SHOTS,`f3-${o.shot}-L${LVL}-${p.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:72})}}
  const g1=await G.p.evaluate(()=>__her()),h1=await H.p.evaluate(()=>__her());const run1=await H.p.evaluate(()=>COOPW.thin.F.stat.run);const ans=await G.p.evaluate(()=>COOPW.thin.F.lastAns);
  const hc1=await H.p.evaluate(()=>{const t=document.getElementById('rtoast');return t?t.innerHTML:''});const c1=await G.p.evaluate(()=>COOPW.thin.F.stat.card|0);
  const same=JSON.stringify(Object.assign({},g1,{log:0,nlog:0,used:0}))===JSON.stringify(Object.assign({},h1,{log:0,nlog:0,used:0}))/* her khắc clock lives on her phone (E / F1); checked per row */;
  const hlog=!same?await H.p.evaluate(()=>COOPW.thin.F.log.slice(-5)):null;
  const gone=ans&&ans.r0&&ans.r0.st==='gone'?{hl:await H.p.evaluate(()=>COOPW.thin.F.log.slice(-4)),msg:await G.p.evaluate(()=>COOPW.thin.F.lastMsg||null),g:await G.p.evaluate(()=>S.inv.filter(e=>e&&e.tg3)),h:await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return (B&&B.S&&B.S.inv||[]).filter(e=>e&&e.tg3)})}:null;
  const row={hlog,gone,tag,r,got,ran:run1-run0,ms:ans&&ans.id===r.id?ans.ms:null,st:ans&&ans.r0&&ans.r0.st,ar:ans&&ans.r0&&ans.r0.r,g0,g1,h0,h1,same,twin,hostCard:hc1!==hc0,card:c1-c0};table.push(row);
  /* her log: the act's line is the newest on the host's copy; her phone shows it too (the guest-side log writers after a world delta are F6/G) */
  row.logOk=!ans||!ans.r0||!ans.r0.r||String(g1.log).includes(String(ans.r0.r).replace(/\s+/g,' ').trim().slice(0,30))||String(h1.log).includes(String(ans.r0.r).replace(/\s+/g,' ').trim().slice(0,30));
  if(twin&&twin.a){const d=x=>({bac:x.a.bac-x.b.bac,inv:x.a.inv,wd:x.a.wd,vl:x.a.vl,suc:x.a.suc-x.b.suc,sac:(x.a.sac||0)-(x.b.sac||0),danh:(x.a.danh||0)-(x.b.danh||0),used:x.du});
   const real={a:g1,b:g0,du:g1.used-g0.used};row.solo=d(twin);row.real=d(real);row.twinOk=JSON.stringify(row.solo)===JSON.stringify(row.real)&&(!twin.a.log||twin.a.log.slice(0,40)===g1.log.slice(0,40)||twin.a.log.slice(0,40)===h1.log.slice(0,40))}
  row.good=ON?(!r.err&&r.now.pend&&r.now.next&&(r.now.same||!!o.pre/* a card's own cost (chooseM fx) is paid on her phone and rides in the intent's diff (part D) */)&&r.sent===1&&r.local===0&&got&&row.ran===1&&row.st==='ok'&&same&&!row.hostCard&&(row.twinOk!==false)&&(o.chk?o.chk(row):true))
   :(!r.err&&r.sent===0);
  if(o.card!=null&&ON)row.good=row.good&&row.card===o.card;
  ok(row.good,`${tag}${ON?'':' (L'+LVL+' old road: local)'}`,row.good?{ms:row.ms,local_ms:r.ms}:row);return row};
 const pick=src=>G.p.evaluate(src=>(0,eval)('(function(){'+src+'})')(),src);
 const ixOf=k=>`S.inv.findIndex(e=>e&&!e.h&&e.tg3===${JSON.stringify(k)})`;
 const npcT="rivals.find(v=>v&&!v.coop&&v.alive!==false&&!v.out&&v.id<900&&!(typeof sameHouse==='function'&&sameHouse(S,v)))";
 /* ---- B: the bag ---- */
 await stage(`S.inv.push({k:'yensao',tg3:'b1'},{k:'tuithom',tg3:'b2'},{k:'botngua',tg3:'b3'},{k:'tranhco',tg3:'b4'},{k:'yensao',tg3:'b5'},{k:'tuithom',tg3:'b6'})`);
 await act('B1 Dùng (useItem, itemAct use): same as solo',`itemAct('use',${ixOf('b1')})`,{twin:true});
 {const v=await pick(`const v=${npcT};return v&&v.id`);
  await act('B2 Dùng … với ai (itarget → useItem on a consort)',`const m=Q[0];const i=m.opts.findIndex(o=>o.kgt&&o.kgt.id===${v});chooseM(i)`,{pre:`pushDil(mkP('itarget',{ix:${ixOf('b3')},k:'botngua'}),'x')`,chk:x=>x.g1.inv.length===x.g0.inv.length-1})}
 await act('B3 Bán (itemAct sell = econSell): bạc + price, the item leaves the bag',`window.__p3=econPrice(S,S.inv[${ixOf('b2')}]);itemAct('sell',${ixOf('b2')})`,{chk:x=>x.g1.bac-x.g0.bac>0&&x.g1.inv.length===x.g0.inv.length-1});
 await stage(`S.inv.push({k:'yensao',tg3:'p1'},{k:'yensao',tg3:'p2'})`);
 await act('B4b two identical pieces, the 2nd tested: the flag is on THAT piece on both phones (patch identity)',`itemAct('test',${ixOf('p2')})`,{chk:x=>true});
 {const fl=await both(()=>S.inv.filter(e=>e&&/^p[12]$/.test(e.tg3||'')).map(e=>e.tg3+':'+(e.tested?1:0)).sort().join(','));const hs=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');return (B.S.inv||[]).filter(e=>e&&/^p[12]$/.test(e.tg3||'')).map(e=>e.tg3+':'+(e.tested?1:0)).sort().join(',')});
  if(!ROWS||ROWS.some(x=>'B4b'.startsWith(x)))ok(fl[1]==='p1:0,p2:1'&&hs==='p1:0,p2:1','B4b law 6c: her phone and the host\'s copy mark the same piece',{guest:fl[1],host:hs})}
 await act('B4 Nghiệm độc (itemTest)',`itemAct('test',${ixOf('b5')})`,{chk:x=>x.g0.bac-x.g1.bac===BV.it});
 await act('B5 Soát rương đồ (invAct inspect): result card on her phone only',`invAct('inspect')`,{chk:x=>x.g1.used===x.g0.used+2});
 {const t=await pick(`const L=Object.entries(TAINT).find(([k,T])=>T.on.includes('yensao')&&!T.need&&!T.c);return L?L[0]:null`);
  if(t)await act('B6 Tẩm đồ (taintpick → taintItem)',`const m=Q[0];const i=m.opts.findIndex(o=>o.n&&o.n!=='Thôi');chooseM(i)`,{pre:`pushDil(mkP('taintpick',{ix:${ixOf('b6')}}),'x')`,chk:x=>x.g1.inv.some(k=>/!/.test(k))});
  else ok(true,'B6 Tẩm đồ: no taint without a need item in this build (skipped)')}
 /* ---- W: wearing ---- */
 const jw=await pick(`return Object.keys(IT).find(k=>IT[k].sl&&!(typeof WD_ITEMS==='object'&&WD_ITEMS[k])&&!IT[k].h&&!(IT[k].rk>S.rank))`);
 const wdT=await pick(`return typeof WD_ITEMS==='object'?Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k].sl==='tram'&&!WD_ITEMS[k].nt):null`);
 const wdY=await pick(`return typeof WD_ITEMS==='object'?Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k].sl==='y'&&!WD_ITEMS[k].nt&&(WD_ITEMS[k].pr||0)>0):null`);
 const fab=await pick(`return Object.keys(IT).find(k=>IT[k].dr&&typeof wdFabOf==='function'&&wdFabOf(k))`);
 await stage(`S.inv.push(${JSON.stringify([jw&&{k:jw,tg3:'w1'},wdT&&{k:wdT,tg3:'w2'},wdY&&{k:wdY,tg3:'w3'},fab&&{k:fab,tg3:'w4'},wdY&&{k:wdY,tg3:'w5'}].filter(Boolean)).slice(1,-1)})`);
 if(jw){await act('W1 Đeo (itemAct wear): same as solo',`itemAct('wear',${ixOf('w1')})`,{twin:true});await act('W1b Tháo (wear again)',`itemAct('wear',${ixOf('w1')})`,{twin:true})}
 if(wdT){await act('W2 Cài trâm (wdWearUI): same as solo, result card on her phone only',`wdWearUI(${ixOf('w2')})`,{twin:true,card:1,shot:'wear-card'});
  await act('W3 Tháo trâm (wdOffUI)',`wdOffUI('tram')`,{twin:true})}
 if(wdY)await act('W4 Mặc y phục from Điểm trang (toilAct → wdWear)',`wdWear(S,${ixOf('w3')})`,{twin:true});
 if(fab)await act('W5 May áo (useItem on a fabric, jwdinv)',`itemAct('use',${ixOf('w4')})`,{twin:true});
 await act('W6 Tự chọn đồ (wdAutoUI)',`wdAutoUI()`,{});
 if(wdY){await act('W7 Bán lén (wdSellUI)',`wdSellUI(${ixOf('w5')})`,{});}
 {const lines=await G.p.evaluate(()=>(S.logs||[]).map(x=>String(x).replace(/<[^>]+>/g,'')).filter(x=>/Xong việc «/.test(x)).length);const gs=await G.p.evaluate(()=>[...window.__done3]),hs=await H.p.evaluate(()=>[...window.__done3]);
  if(ON)ok(lines===0||(gs.length>=1&&hs.length===0),'W done card: a task her bag / wear acts finished shows its «Xong việc» card on HER phone (quiet off, F2 r2), none on the host',{lines,guest:gs,host:hs})}
 /* ---- S: the shop (Nhờ thái giám mua đồ, kit shop nvp) ---- */
 {await reset();const it=await pick(`S.shop=S.shop&&S.shop.length?S.shop:['yensao','tuithom'];kitShopNvp();const o=KSHOP.reg.nvp;const x=o.items.find(y=>y&&IT[y.k]&&y.price>0&&y.price<=S.bac&&!y.mark);closeModal();return x?{k:x.k,pr:x.price}:null`);
  if(it){const q=2;await act(`S1 Mua ×${q} in the kit shop (kitShopBuy nvp): bạc −price×${q}, +${q} items, the open panel refreshes`,
     `kitShopNvp();const o=KSHOP.reg.nvp;o.q[${JSON.stringify(it.k)}]=${q};kitShopBuy('nvp',${JSON.stringify(it.k)},${q},'buy')`,{after:'',shot:'shop',chk:x=>x.g0.bac-x.g1.bac===it.pr*q&&x.g1.inv.filter(k=>k===it.k).length===x.g0.inv.filter(k=>k===it.k).length+q});
   await G.p.evaluate(()=>{try{closeModal()}catch(e){}})}
  else ok(false,'S1 no item to buy in the kit shop');
  await stage(`S.inv.push({k:'tuithom',tg3:'s2'})`);
  const sk=await pick(`kitShopNvp();const o=KSHOP.reg.nvp;o.mode='sell';const L=o.sell.items();closeModal();const x=L.find(y=>/tuithom/.test(y.k)&&!/_r/.test(y.k));return x?{k:x.k,pr:x.price}:null`);
  if(sk)await act('S2 Bán in the kit shop (kitShopBuy nvp sell tab): bạc + the shown price, one less in the bag',
     `kitShopNvp();const o=KSHOP.reg.nvp;o.mode='sell';kitShopBuy('nvp',${JSON.stringify(sk.k)},1,'sell')`,{chk:x=>x.g1.bac-x.g0.bac===sk.pr&&x.g1.inv.filter(k=>k==='tuithom').length===x.g0.inv.filter(k=>k==='tuithom').length-1});
  else ok(false,'S2 nothing to sell in the kit shop',sk);
  await G.p.evaluate(()=>{try{closeModal()}catch(e){}});
  /* law 6c: the sold piece is traceable (the item ledger), never lost / doubled */
  const w=await H.p.evaluate(()=>__where3('s2',null,'tuithom'));ok(w.length<=1&&!w.some(x=>x.startsWith('her')),'S2 the sold piece is in one place, not in her bag (item ledger)',w)}
 /* ---- G: gifts ---- */
 await stage(`S.inv.push({k:'tranhco',tg3:'g1'},{k:'yensao',tg3:'g2'},{k:'tuithom',tg3:'g3'},{k:'yensao',tg3:'g4'})`);
 {const v=await pick(`const v=${npcT};return v&&v.id`);
  const iuG1=await H.p.evaluate(()=>__iu3('g2'));
  /* receiver choice (jrcv rcvGiftIn, LIVE c02748c2): the consort answers the gift (take / send it back / have it checked); this row checks the
     piece's road when she takes it: her answer is staged «take» on the host for the row only (her other answers keep the piece in ONE place too) */
  await H.p.evaluate(()=>{if(typeof rcvPick==='function'&&!window.__rp3){window.__rp3=rcvPick;rcvPick=function(t,a,O,k){return k==='gift'?(O||[]).find(o=>o&&o.id==='take')||window.__rp3.apply(this,arguments):window.__rp3.apply(this,arguments)}}});
  await act('G1 Tặng quà (item card Tặng → gift dialog → giveTo a consort): the piece moves to her, once',
   `const m=Q[0];const i=m.opts.findIndex(o=>o.kgt&&o.kgt.id===${v});chooseM(i)`,{pre:`itemAct('gift',${ixOf('g2')})`,chk:x=>x.g1.inv.length===x.g0.inv.length-1&&x.g1.used===x.g0.used+2});
  const w=await H.p.evaluate(iu=>__where3('g2',iu,'yensao'),iuG1);ok(w.length===1&&w[0].startsWith('npc'+v+':'),'G1 law 6c: the gift is in ONE place: the consort\'s bag (host world)',{w,v});
  const wg=await G.p.evaluate(([v,iu])=>{const t=rivals.find(x=>x&&x.id===v);return (t&&t.inv||[]).filter(e=>e&&(e.tg3==='g2'||(iu!=null&&e.iu===iu))).length},[v,iuG1]);ok(wg===1,'G1 her phone\'s world shows it in the consort\'s bag too',wg);await H.p.evaluate(()=>{if(window.__rp3){rcvPick=window.__rp3;delete window.__rp3}})}
 await act('G2 Dâng Hoàng thượng (giftto → giveTo emp)',`const m=Q[0];const i=m.opts.findIndex(o=>o.ik===${ixOf('g1')});chooseM(i)`,{pre:`pushDil(mkP('giftto',{t:'emp'}),'x')`,chk:x=>x.g1.inv.length===x.g0.inv.length-1});
 {const ck=await pick(`return S.court&&S.court.tq?'tq':S.court?Object.keys(S.court)[0]:null`);
  if(ck)await act('G3 Biếu Tổng quản (courtAct thuong → courtGive)',`courtAct('thuong',${JSON.stringify(ck)})`,{chk:x=>x.g0.bac-x.g1.bac===BV.court});
  else ok(true,'G3 no court person (skipped)')}
 {const v=await pick(`const v=${npcT};return v&&v.id`);
  await act('G4 Biếu quà làm lành · Lễ bạc (tsgift → tsGiftBacGo)',`chooseM(0)`,{pre:`pushDil(mkP('tsgift',{L:[${v}]}),'x')`,chk:x=>x.g0.bac-x.g1.bac===BV.ts});
  /* review r1 (law 11, the G1 family): the same receiver choice answers this piece (rcvGiftIn may send it back = R.kept): staged «take» for the row only */
  await H.p.evaluate(()=>{if(typeof rcvPick==='function'&&!window.__rp3){window.__rp3=rcvPick;rcvPick=function(t,a,O,k){return k==='gift'?(O||[]).find(o=>o&&o.id==='take')||window.__rp3.apply(this,arguments):window.__rp3.apply(this,arguments)}}});
  await act('G5 Biếu quà làm lành · một món (tsGiftPieceGo: the piece picker\'s choice)',`const v=rivals.find(x=>x&&x.id===${v});const L=tsGiftPieces(S,v,'it').filter(o=>o.w.ok);if(!L.length)throw new Error('no piece');window.__g5=S.inv[L[0].i].k;tsGiftPieceGo(v,L[0].i)`,{chk:x=>x.g1.inv.length===x.g0.inv.length-1&&x.g1.used===x.g0.used+BV.tk});await H.p.evaluate(()=>{if(window.__rp3){rcvPick=window.__rp3;delete window.__rp3}})}
 {const v=await pick(`const v=${npcT};return v&&v.id`);
  await act('G6 Cài đồ vào rương tại cung nàng (plantpick here → plantHereGo)',`const m=Q[0];const i=m.opts.findIndex(o=>o.ik===${ixOf('g3')});chooseM(i)`,{pre:`pushDil(mkP('plantpick',{v:${v},here:1}),'x')`,chk:x=>x.g1.inv.length===x.g0.inv.length-1})}
 {const tc=await pick(`try{const T=trS();const k=Object.keys(T.H||{}).find(c=>T.H[c]&&T.H[c].dadOf!=='me');return k||null}catch(e){return null}`);
  if(tc!=null)await act('G7 Biếu quà nhà ngoại (tdAct gift → tdGiftGo): her card after the answer',`tdAct('gift',{tc:${JSON.stringify(tc)}})`,{card:1});
  else ok(true,'G7 no house to gift in this world (skipped)')}
 /* gifts BETWEEN the two players (law 1 both directions; law 6c the piece in one place) */
 {await stage(`S.inv.push({k:'tranhco',tg3:'x1'})`);const fid=await G.p.evaluate(()=>COOPW.friend()&&COOPW.friend().id);const iuX1=await H.p.evaluate(()=>__iu3('x1'));const hn0=await H.p.evaluate(()=>S.inv.filter(e=>e&&e.tg3==='x1').length);
  await act('X1 her gift to the host (giftpick on the friend → giveTo): run once on the host',`const m=Q[0];const i=m.opts.findIndex(o=>o.ik===${ixOf('x1')});chooseM(i)`,{pre:`pushDil(mkP('giftpick',{v:${fid}}),'x')`,chk:x=>/ngỏ ý tặng quà/.test(x.ar||'')&&x.g1.inv.length===x.g0.inv.length/* the ASK act: the piece stays in her bag until he says yes */});
  /* ONE path for gifts between the two (the ASK act): the host gets her invite card (thInv) → Nhận → then the Quà tặng card (giftin) → Nhận */
  const took=[];let w=[];const t0=Date.now();while(Date.now()-t0<45000){const t=await H.p.evaluate(()=>{const i=Q.findIndex(q=>q&&(q.pid==='giftin'||q.pid==='thInv'));if(i<0)return null;if(i>0){const m=Q.splice(i,1)[0];Q.unshift(m)}try{showModal()}catch(e){}const M=Q[0];const j=(M.opts||[]).findIndex(o=>/^Nhận/.test(o.n));const pid=M.pid;if(j<0)return {pid,ns:(M.opts||[]).map(o=>o.n)};chooseM(j);return {pid}});if(t)took.push(t);
   await sleep(600);await sync(3000);w=await H.p.evaluate(iu=>__where3('x1',iu),iuX1);if(w.length===1&&w[0].startsWith('host'))break}
  ok(took.some(t=>t.pid==='thInv')&&took.some(t=>t.pid==='giftin')&&w.length===1&&w[0].startsWith('host'),'X1 the host takes her gift (her invite card → Nhận, Quà tặng → Nhận): the piece in ONE place, his bag',{took,w})}
 {const her=await H.p.evaluate(()=>COOPW.friend()&&COOPW.friend().id);let hr=null,iuX2=null,g0=null;
  for(const kk of ['tranhco','yensao','tuithom','trahop']){await H.p.evaluate(kk=>{S.inv=S.inv.filter(e=>!(e&&e.tg3==='x2'));S.inv.push({k:kk,tg3:'x2'});if(typeof ilUid==='function')ilUid(S.inv[S.inv.length-1]);render()},kk);await sync();iuX2=await H.p.evaluate(()=>(S.inv.find(e=>e&&e.tg3==='x2')||{}).iu);
  g0=await G.p.evaluate(()=>__her());await reset();
  hr=await H.p.evaluate(id=>{used=0;pushDil(mkP('giftpick',{v:id}),'Tặng quà');const m=Q[0];if(!m||!m.opts){showModal()}const M=Q[0];const i=(M.opts||[]).findIndex(o=>o.ik===S.inv.findIndex(e=>e&&e.tg3==='x2'));if(i<0)return {i,ns:(M.opts||[]).map(o=>o.n)};const k=S.inv[S.inv.findIndex(e=>e&&e.tg3==='x2')].k;chooseM(i);return {i,k,log:String(S.logs[0]||'').replace(/<[^>]+>/g,'').slice(0,90),left:S.inv.filter(e=>e&&e.tg3==='x2').length}},her);if(hr&&hr.i>=0)break}
  let took=0,w=[];const t0=Date.now();while(Date.now()-t0<40000){await sync(3000);const t=await G.p.evaluate(()=>{try{if(Q.length&&document.getElementById('modal').hidden)showModal()}catch(e){}const m=document.getElementById('modal');if(!m||m.hidden)return false;const b=[...m.querySelectorAll('button')].find(b=>b.offsetParent!==null&&/^Nhận/.test(b.textContent.trim()));if(!b)return false;b.click();return true});if(t)took++;
   await sleep(1200);await sync(3000);w=await H.p.evaluate(([iu,k])=>__where3('x2',iu,k),[iuX2,hr&&hr.k]);if(w.length===1&&w[0].startsWith('her'))break}
  const g1=await G.p.evaluate(()=>__her());
  ok(took>=2&&w.length===1&&w[0].startsWith('her')&&g1.inv.length===g0.inv.length+1,'X2 the host\'s gift to her (his giftpick → the ASK act, his engine): her invite card → Nhận, her Quà tặng card → Nhận: the piece in ONE place, her bag (both phones)',{hr,took,w,n0:g0.inv.length,n1:g1.inv.length,q:await G.p.evaluate(()=>Q.map(q=>q.t||q.pid).slice(0,4))})}
 /* double tap: a second bag tap while one is pending is ignored (never queued) */
 if(ON){await stage(`S.inv.push({k:'yensao',tg3:'d1'})`);await reset();
  const r=await G.p.evaluate(ix=>{const F=COOPW.thin.F,b0=F.stat.busy,s0=F.stat.sent;itemAct('use',ix);itemAct('use',ix);return {busy:F.stat.busy-b0,sent:F.stat.sent-s0,id:F.pend&&F.pend.id}},await pick(`return ${ixOf('d1')}`));
  await until(G,id=>!COOPW.thin.F.pend,r.id,20000);ok(r.sent===1&&r.busy===1,'D1 double tap: one intent, the second tap ignored',r)}
 /* latency */
 {const ms=table.filter(x=>typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b),lo=table.map(x=>x.r&&x.r.ms).filter(x=>typeof x==='number').sort((a,b)=>a-b);
  if(ms.length)console.log('LATENCY tap→answer ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1]);
  if(lo.length)console.log('LOCAL tap→render ms on her phone (the tap itself): n='+lo.length+' median='+lo[lo.length>>1]+' min='+lo[0]+' max='+lo[lo.length-1])}
 if(TRIPSRC){const t=await trip();const d=(a,b)=>{const o={};for(const k of new Set([...Object.keys(a||{}),...Object.keys(b||{})]))o[k]=((b||{})[k]||0)-((a||{})[k]||0);return o};
  const sp=d(tw0&&tw0.statePart,t&&t.statePart);const f3=Object.entries(sp).filter(([k])=>k!=='D·patch').reduce((a,[,n])=>a+n,0);
  console.log('TRIPWIRE F3 table (guest writes outside fromCanon during the act table): state',(t&&t.state)-(tw0&&tw0.state||0),'· by part',JSON.stringify(sp),'· without D·patch',f3,'· F3 entries',JSON.stringify((t&&t.parts&&t.parts.F3||[]).slice(0,12)));
  if(ON)ok(!(sp.F3>0),'TRIP F3 entry writes on her phone = 0',sp)}
 console.log('F3 table:');for(const x of table)console.log(' ',JSON.stringify({tag:x.tag,good:x.good,ms:x.ms,local:x.r&&x.r.ms,ran:x.ran,solo:x.solo,real:x.real}).slice(0,400));
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f3-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);ok(n(ho)+n(go)===0,'F8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const o of [H,G]){await o.p.evaluate(()=>{try{render()}catch(e){}});await sleep(800);const vp=o.p.viewportSize();await o.p.screenshot({path:path.join(process.env.SHOTS,`f3-L${LVL}-${o.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
 if(process.env.UISCAN)try{fs.writeFileSync(process.env.UISCAN,JSON.stringify(await H.p.evaluate(()=>window.__uiscan)))}catch(e){console.error('uiscan',e.message)}
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f3 L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
