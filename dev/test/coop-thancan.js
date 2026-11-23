/* coop-thancan (review/thancan-r1): her «Chọn / Thôi làm cung nữ thân cận» tap on the GUEST phone = intent thcPick (jcoopthinf, level 6) run on the host in her context; harness = coop-thin-f4.js head.
   usage: python3 dev/build/assemble.py && node dev/test/coop-thancan.js <workerURL> [level=9] */
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
 await stage("S.staff=S.staff||[];while(S.staff.filter(s=>s.role==='maid').length<2)S.staff.push(mkServ('maid'));S.staff.filter(s=>s.role==='maid').forEach((s,i)=>{s.rk=1+i;s.loyal=80});S.bac=Math.max(S.bac||0,500);S.thcV=1;delete S.thc;return 1");
 await sync();
 const hostSelf0=await H.p.evaluate(()=>S.thc==null?null:S.thc);
 const gk=await G.p.evaluate(()=>{const m=S.staff.find(s=>s.role==='maid'&&s.rk===2);return m?m.sid:null});ok(gk!=null,'T0 her staged maid reached her phone',gk);
 const hb=()=>H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>({thc:S.thc==null?null:S.thc,bac:S.bac,ly:(S.staff.find(s=>s.role==='maid'&&s.rk===2)||{}).loyal})));
 const b0=await hb();
 const st0=await G.p.evaluate(()=>JSON.stringify(COOPW.thin.F?COOPW.thin.F.stat:{}));
 await reset();await sync();
 const dg=await G.p.evaluate(k=>{const F=COOPW.thin.F;const d={reg:!!(F&&F.R&&F.R.thcPick),Q:Q.length,dead:!!S.dead,hk:thcHouse(S).map(e=>e.id),why:(()=>{const m=S.staff.find(s=>s.sid===k);return m?thcWhyNot(S,m):'nomaid'})()};window.__r=thcPick(k,1);d.r=window.__r;d.stat=JSON.stringify(F&&F.stat);return d},gk);console.log('diag',JSON.stringify(dg));
 const sentOk=await until(G,k=>S.thc===k,gk,20000);await sync();
 const b1=await hb();const g1=await G.p.evaluate(()=>({thc:S.thc==null?null:S.thc,bac:S.bac,ly:(S.staff.find(s=>s.role==='maid'&&s.rk===2)||{}).loyal}));
 ok(sentOk&&b1.thc===gk&&g1.thc===gk,'T1 guest choose: host ran it in her context, both seats read the same thân cận',{b0,b1,g1,st0});
 ok(b1.bac===b0.bac-(await G.p.evaluate(()=>BAL.thc.pick.bac))&&g1.bac===b1.bac,'T1 cost paid once (Bạc), same on both seats',{b0,b1,g1});
 ok(b1.ly===Math.min(100,b0.ly+(await G.p.evaluate(()=>BAL.thc.pick.loy)))&&g1.ly===b1.ly,'T1 her lòng gain once, same on both seats',{b0,b1,g1});
 ok(await H.p.evaluate(x=>(S.thc==null?null:S.thc)===x,hostSelf0),'T1 host\'s own life untouched');
 await G.p.evaluate(k=>{thcPick(k,0)},gk);const dOk=await until(G,()=>S.thc==null,null,20000);await sync();const b2=await hb();
 ok(dOk&&b2.thc==null,'T2 guest dismiss: cleared on host and her phone',{b2});
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-thancan L${LVL}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
