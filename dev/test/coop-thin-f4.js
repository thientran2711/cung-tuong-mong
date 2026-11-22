/* Co-op thin guest, part F4 (review/coop-thin-f4): her pets / garden / kitchen / study are intents run on the host (TH.F.reg, level 9).
   Two Playwright clients in one room, host Fold 686x880 + guest iPad 1180x820 (swap=1: iPad hosts, Fold joins). Harness = coop-thin-f3.js.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thin-f4.js <workerURL> [level=9] [swap=0]   (TRIP=1, OUT=<dir>, LAG=<ms>, CPU=<rate>, SHOTS=<dir>, ROWS=P1,K1)
   level 8 = the old road for these rows (her phone runs them: the BEFORE column of latency + tripwire; rows only check nothing was sent).
   P pets (follow, free, the pet shop, Giao kẻ hầu chăm, "Để trời định" of the care game: her care screen redrawn on HER phone only) ·
   G her shelf plant ("Để trời định") · K the taste questions (thái y about herself, cung nữ about a person) · R reading a recipe book ·
   T Tứ đức practice at bậc 5 (the work made) · D1 double tap · law 6c: pets counted, the book read stays traced, the work made is in ONE
   place · "same as solo": rows with twin:true also run on a CLONE of her person with the old road (seeded rolls: Math.random fixed). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||9);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
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
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const ON=LVL>=9;/* level 9 = F4 on; below = the old road (her phone runs it: the BEFORE column of latency / tripwire) */
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
  if(o.shot&&process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const p of [H,G]){for(let i=0;i<3;i++)await tapText(p,/^Đã hiểu$/,800)/* setup edicts (the test's rank) */;await tapText(p,/^Bỏ qua$/,1500)/* the Luân hồi intro overlay (never closed by this scripted run) */;await p.p.evaluate(()=>{for(const el of document.querySelectorAll('.nl-intro,#nlIntro,[data-nlintro]'))el.remove()}).catch(()=>{})}await sleep(900);for(const p of [H,G]){const vp=p.p.viewportSize();await p.p.screenshot({path:path.join(process.env.SHOTS,`f4-${o.shot}-L${LVL}-${p.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:72})}}
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
 /* F4 helpers: her pets, shelf plants, taste knowledge, recipe knowledge, maid loyalty, Tứ đức levels join the summary */
 const HELP4=()=>{const s0=window.__sum;window.__sum=s=>Object.assign(s0(s),{pets:(s.pets||[]).map(P=>P.t+':'+Math.round(P.full||0)+'/'+Math.round(P.clean||0)+'/'+Math.round(P.joy||0)+'/'+Math.round(P.aff||0)+'/'+(P.maidW||0)).join(','),petOn:s.petOn==null?null:s.petOn,
   shelf:Object.entries((s.shelf&&s.shelf.g)||{}).filter(([g,e])=>e&&e.pc!=null).map(([g,e])=>g+':'+e.pc).sort().join(','),rcpK:JSON.stringify(s.rcpK||{}),rcpL:JSON.stringify(s.rcpL||{}),ml:s.maid?s.maid.loyal:null,vir:JSON.stringify(s.vir||{}),/* parallel time (jptime): her sends still away — a maid ask is a send that lands at the due khắc */ptTaste:(Array.isArray(s.away)?s.away:[]).filter(a=>a&&a.by==="me"&&!a.back&&a.who==="mm:me"&&a.a&&a.a.run==="taste").length,ptOn:!!(typeof BAL==="object"&&BAL.ptime&&BAL.ptime.on&&window.PTIME)})};
 await H.p.evaluate(HELP4);await G.p.evaluate(HELP4);
 /* F2 r2 (quiet off for her taps): a task card «Xong việc: …» (jtq14 doneCard) her F4 act earns (pet shop note "buy") reaches HER phone, once, never the host's (as F3 'W') */
 const DONEW=()=>{window.__done4=[];const seen=()=>{const m=document.getElementById('modal');if(!m||m.hidden)return;const t=(m.textContent||'').match(/Xong việc: ([^\n]{2,60}?)(Chương|$)/);if(t&&window.__done4[window.__done4.length-1]!==t[1].trim())window.__done4.push(t[1].trim())};
  new MutationObserver(seen).observe(document.body,{subtree:true,childList:true,attributes:true,attributeFilter:['hidden']})};
 await H.p.evaluate(DONEW);await G.p.evaluate(DONEW);const xl0=await G.p.evaluate(()=>(S.logs||[]).filter(x=>/Xong việc «/.test(String(x))).length);
 const herDo=async src=>{await stage(src)};
 /* ---- P: pets ---- */
 const PK=await pick(`return Object.keys(PET).filter(k=>PET[k].pr&&PET[k].tr===0).slice(0,3)`);
 await stage(`S.pets=[];S.petOn=null;S.petMax=Math.max(S.petMax||0,3);for(const t of [${JSON.stringify(PK[0])},${JSON.stringify(PK[1])}])S.pets.push({t,from:'x',src:'buy',care:80,at:tsbWk()});S.petOn=0;return S.pets.length`);
 const np=await pick(`return tsbPets(S).length`);console.log('pets staged',PK,np,'petMax',await pick(`return petMax(S)`));
 if(np>=2){await act('P1 Cho theo hầu (petDo follow): same as solo',`petDo('follow',{dataset:{i:'1'}})`,{twin:true,chk:x=>x.g1.petOn===1});
  await act('P2 Gửi về Ngự thú viên (petDo free): same as solo, one pet less',`petDo('free',{dataset:{i:'1'}})`,{twin:true,chk:x=>x.g1.pets.split(',').length===x.g0.pets.split(',').length-1})}
 else ok(false,'P1/P2 two pets could not be staged',np);
 {await reset();const it=await pick(`petShop();const o=KSHOP.reg.pet;const x=o&&o.items.find(y=>y&&y.price>0&&y.price<=S.bac&&!y.why);try{closeModal()}catch(e){}return x?{k:x.k,pr:x.price}:null`);
  if(it)await act('P3 the pet shop (kitShopBuy pet): bạc −price, a pet or the sick-pet line',`petShop();kitShopBuy('pet',${JSON.stringify(it.k)},1,'buy')`,{after:'try{closeModal()}catch(e){}',chk:x=>x.g0.bac-x.g1.bac===it.pr&&(x.g1.pets.split(',').length===x.g0.pets.split(',').length+1||/ốm/.test(x.g1.log+x.h1.log))});
  else ok(false,'P3 nothing to buy in the pet shop')}
 await stage(`if(!S.maid)S.maid={name:'Tiểu Thúy',loyal:90};S.maid.loyal=90;(S.pets[0]||{}).maidW=0`);
 await act('P4 Giao kẻ hầu chăm (petcMaid): same as solo',`PETC.i=0;petcMaid(0)`,{twin:true,chk:x=>/\/[1-9]\d*$/.test(x.g1.pets.split(',')[0])});
 {const r=await act('P5 Để trời định in the care game (petcQuick): her care screen redrawn on HER phone, nothing on the host',`petcQuick('feed')`,{pre:`petcOpen(0);PETC.game=null`,chk:x=>{const f=y=>+((y.pets||'').split(',')[0]||'').split(':')[1]?.split('/')[0];/* review r1: the roll ran on HER pet 0 */return f(x.g1)>f(x.g0)||/chưa thành/.test(x.g1.log+x.h1.log)||f(x.g0)>=100},shot:'care'});
  const ui=await both(()=>{const b=document.getElementById('kpcare');return b?/Vừa rồi|Để trời định/.test(b.textContent):false});if(!r.skip)ok(ON?(ui[1]&&!ui[0]):true,'P5 her care screen REDRAWN with the result on her phone after the answer (replayed petcDraw), none on the host',ui);await G.p.evaluate(()=>{try{petcClose()}catch(e){}})}
 /* ---- G: her shelf plant ---- */
 {const pk=await pick(`return Object.keys(BAL.shelf.it).find(k=>BAL.shelf.it[k].care)||null`);
  if(pk){await stage(`shelfOf(S).g.f4p={k:${JSON.stringify(pk)},pc:40}`);
   const r=await act('G1 Để trời định on her shelf plant (shelfPlantQuick)',`shelfPlantQuick()`,{pre:`shelfPlantOpen('f4p')`,chk:x=>{const a=/f4p:(\d+)/.exec(x.g0.shelf||''),b=/f4p:(\d+)/.exec(x.g1.shelf||'');/* review r1: the roll really ran on HER plant: won = pc up, lost = the 'chưa thành' log line */return !!a&&!!b&&(+b[1]>+a[1]||/chưa thành/.test(x.g1.log+x.h1.log))},shot:'plant'});
   const ui=await both(()=>!!document.getElementById('kshp'));if(!r.skip)ok(ON?(ui[1]&&!ui[0]):true,'G1 her plant screen on her phone only',ui);await G.p.evaluate(()=>{try{closeModal()}catch(e){}})}
  else ok(false,'G1 no shelf plant kind in BAL.shelf.it')}
 /* ---- K: taste questions ---- */
 await act('K1 Hỏi thái y kiêng kỵ về chính mình (rcpAskGo ty, her): same as solo',`rcpAskGo('ty',S)`,{twin:true,chk:x=>x.g1.rcpK!==x.g0.rcpK});
 {const v=await pick(`const v=rcpPeople().find(r=>r&&typeof r==='object'&&rcpUnknown(r).length);return v?v.id:null`);
  if(v!=null)await act('K2 Sai cung nữ dò la khẩu vị (rcpAskGo maid, a consort)',`rcpAskGo('maid',rivals.find(r=>r.id===${v}))`,{chk:x=>x.g1.rcpK!==x.g0.rcpK||x.g1.ml!==x.g0.ml||/* parallel time (review parallel-time #4): her maid is SENT (order khắc paid, one more «taste» task away on HER state); what she learns lands at the due khắc */(x.g1.ptOn&&x.g1.ptTaste===x.g0.ptTaste+1&&x.g1.used>x.g0.used)});
  else ok(true,'K2 nobody left to ask about (skipped)')}
 /* ---- R: a recipe book read ---- */
 {const bk=await pick(`for(const k in IT)if(IT[k]&&IT[k].bk&&!rcpKnows(S,IT[k].bk.kind,IT[k].bk.sid))return k;return null`);
  if(bk){await stage(`S.inv.push({k:${JSON.stringify(bk)},tg3:'r1'})`);await act('R1 Đọc sách phổ (rcpRead): same as solo, the recipe learnt',`rcpRead(${ixOf('r1')})`,{twin:true,chk:x=>x.g1.rcpL!==x.g0.rcpL})}
  else ok(false,'R1 no recipe book in IT')}
 /* ---- T: Tứ đức practice at bậc 5 (no game) ---- */
 {const k='cong',kind=await pick(`return TDS_KIND.cong`);const rid=await pick(`return (WKR[TDS_KIND.cong]||[])[0]?WKR[TDS_KIND.cong][0].id:null`);
  await stage(`S.vir=S.vir||{};S.vir.cong=5;S.suc=80;S.mg=null`);
  await act('T1 Tứ đức Tự học at bậc 5 (tdsRun prac): the work made, in ONE place (her bag, both phones)',`tdsRun('cong','prac',{kind:${JSON.stringify(kind)},mat:0,r:${JSON.stringify(rid)},subj:''})`,{shot:'cook',chk:x=>x.g1.inv.length===x.g0.inv.length+1&&x.h1.inv.length===x.g0.inv.length+1})}
 {const xl=await G.p.evaluate(()=>(S.logs||[]).filter(x=>/Xong việc «/.test(String(x))).length)-xl0;const gs=await G.p.evaluate(()=>window.__done4),hs=await H.p.evaluate(()=>window.__done4);
  if(ON)ok(xl<=0||(gs.length===xl&&hs.length===0),'C1 task cards: every «Xong việc» line her F4 acts earned shows its card on HER phone once, none on the host',{lines:xl,guest:gs,host:hs})}
 /* double tap */
 if(ON){await reset();const r=await G.p.evaluate(()=>{const F=COOPW.thin.F,b0=F.stat.busy,s0=F.stat.sent,h0=F.stat.held|0;const pre=F.pend&&F.pend.n||null;petcMaid(0);petcMaid(0);return {pre,busy:F.stat.busy-b0,sent:F.stat.sent-s0,held:(F.stat.held|0)-h0,id:F.pend&&F.pend.id}});
  /* review r1: her due-task tick (ptTickHer) may be pending at the tap: the first tap is then HELD and sent after its answer, never lost */
  await until(G,()=>!COOPW.thin.F.pend&&!COOPW.thin.F.next,null,20000);const s2=await G.p.evaluate(()=>COOPW.thin.F.lastAns&&COOPW.thin.F.lastAns.n);
  ok(r.sent+r.held===1&&r.busy===1&&(!r.held||s2==='petcMaid'),'D1 double tap: one intent (held behind a pending due-task tick when there is one, then sent), the second tap ignored',Object.assign(r,{last:s2}))}
 /* latency */
 {const ms=table.filter(x=>typeof x.ms==='number').map(x=>x.ms).sort((a,b)=>a-b),lo=table.map(x=>x.r&&x.r.ms).filter(x=>typeof x==='number').sort((a,b)=>a-b);
  if(ms.length)console.log('LATENCY tap→answer ms (LAG '+(+process.env.LAG||0)+', host CPU ×'+(+process.env.CPU||1)+'): n='+ms.length+' median='+ms[ms.length>>1]+' min='+ms[0]+' max='+ms[ms.length-1]);
  if(lo.length)console.log('LOCAL tap→render ms on her phone (the tap itself): n='+lo.length+' median='+lo[lo.length>>1]+' min='+lo[0]+' max='+lo[lo.length-1])}
 if(TRIPSRC){const t=await trip();const d=(a,b)=>{const o={};for(const k of new Set([...Object.keys(a||{}),...Object.keys(b||{})]))o[k]=((b||{})[k]||0)-((a||{})[k]||0);return o};
  const sp=d(tw0&&tw0.statePart,t&&t.statePart);const f3=Object.entries(sp).filter(([k])=>k!=='D·patch').reduce((a,[,n])=>a+n,0);
  console.log('TRIPWIRE F4 table (guest writes outside fromCanon during the act table): state',(t&&t.state)-(tw0&&tw0.state||0),'· by part',JSON.stringify(sp),'· without D·patch',f3,'· F4 entries',JSON.stringify((t&&t.parts&&t.parts.F4||[]).slice(0,12)),'· ? top',JSON.stringify((t&&t.parts&&t.parts['?']||[]).slice(0,6)),'· F1 top',JSON.stringify((t&&t.parts&&t.parts.F1||[]).slice(0,4)));
  if(ON)ok(!(sp.F4>0),'TRIP F4 entry writes on her phone = 0',sp)}
 console.log('F4 table:');for(const x of table)console.log(' ',JSON.stringify({tag:x.tag,good:x.good,ms:x.ms,local:x.r&&x.r.ms,ran:x.ran,solo:x.solo,real:x.real}).slice(0,400));
 if(process.env.OUT){fs.mkdirSync(process.env.OUT,{recursive:true});fs.writeFileSync(path.join(process.env.OUT,`f4-L${LVL}-s${SWAP}.json`),JSON.stringify(table,null,1))}
 {const [ho,go]=await both(()=>COOPW.oldRun||{});const n=o=>Object.values(o).reduce((a,b)=>a+b,0);ok(n(ho)+n(go)===0,'F8 no old guest state guard ran (COOPW.oldRun, both seats)',{host:ho,guest:go})}
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 if(process.env.SHOTS){fs.mkdirSync(process.env.SHOTS,{recursive:true});for(const o of [H,G]){await o.p.evaluate(()=>{try{render()}catch(e){}});await sleep(800);const vp=o.p.viewportSize();await o.p.screenshot({path:path.join(process.env.SHOTS,`f4-L${LVL}-${o.name}-${vp.width}x${vp.height}.jpg`),type:'jpeg',quality:70})}}
 const n=res.filter(x=>x[0]).length;console.log(`coop-thin-f4 L${LVL}${SWAP?' swap':''}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});

