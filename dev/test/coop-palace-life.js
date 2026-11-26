/* coop-palace-life (B LANDER #2a for review/palace-life-gaps-r1, owner CO-OP LAND GATE 20/11 ~21:30Z): KP03 children living rules (jkidlife) on BOTH seats.
   Harness = coop-thancan.js head (host-first; SWAP=1 swaps the devices). Cases:
   P1 her son named Thái tử (host builds her card in her context, D.later) → her Danh +BAL.kid.heirDanh once, on her phone and in the host's copy of her.
   P2 the HOST's son replaces HER Thái tử → she loses that Danh again (−heirDanh), exactly as solo (jkidlife setHeir wrap: the mother whose son is put aside).
   P3 month end: her son who lives away (A ca sở / Đông cung) and was not seen loses BAL.kid.estr Mẫu tử ONCE (never twice: the host phone does not run
      her household a second time), same value on her phone and in the host's copy; NPC children read the same Mẫu tử on both seats.
   usage: python3 dev/build/assemble.py && node dev/test/coop-palace-life.js [workerURL] [level=9] [swap=0]. Exit 1 on a miss. */
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
 await stage("S.confined=0;S.out=0;S.danh=Math.max(S.danh||0,40);S.kids=(S.kids||[]).filter(k=>k.name!=='Thử Lân');S.kids.push({name:'Thử Lân',sex:'m',bt:3,alive:true,hp:60,tal:50,fond:50,age:8,hM:60,kmS:-9});return 1");
 await H.p.evaluate(()=>{S.kids=(S.kids||[]).filter(k=>k.name!=='Thử Hùng');S.kids.push({name:'Thử Hùng',sex:'m',bt:4,alive:true,hp:60,tal:50,fond:50,age:8,hM:60,kmS:-9});S.danh=Math.max(S.danh||0,40)});
 await sync();
 const B=await G.p.evaluate(()=>BAL.kid);
 const herG=()=>G.p.evaluate(()=>{const k=(S.kids||[]).find(k=>k.name==='Thử Lân');return {danh:S.danh|0,hM:k?k.hM:null,turn:S.turn|0}});
 const herH=()=>H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>{const k=(S.kids||[]).find(k=>k.name==='Thử Lân');return {danh:S.danh|0,hM:k?k.hM:null,turn:S.turn|0}}));
 ok((await herG()).hM===60,'P0 her staged son reached her phone',await herG());
 /* P1 */
 await reset();await sync();const g0=await herG();
 await H.p.evaluate(()=>{window.__hrs=S.hr;S.hr='p902|Thử Lân#3';COOPW.thin.D.later('b',()=>COOPW.hrCardTest(S.hr))});
 const c1=await until(G,()=>Q.some(q=>q.thin&&q.t==='Lập Thái tử'),null,20000);await until(G,d=>(S.danh|0)!==d,g0.danh,15000);await sync();
 const g1=await herG(),h1=await herH();
 ok(c1&&g1.danh-g0.danh===B.heirDanh,'P1 her son made Thái tử: her Danh +heirDanh once on her phone',{g0,g1,heirDanh:B.heirDanh});
 ok(h1.danh===g1.danh,'P1 the host\'s copy of her reads the same Danh',{h1,g1});
 /* P2 the known gap */
 await reset();await sync();
 await H.p.evaluate(()=>{S.hr='p901|Thử Hùng#4';COOPW.thin.D.later('b',()=>COOPW.hrCardTest(S.hr))});
 const c2=await until(G,()=>Q.some(q=>q.thin&&q.t==='Lập Thái tử'&&/Thử Hùng/.test(q.h)),null,20000);await until(G,d=>(S.danh|0)!==d,g1.danh,10000);await sync();
 const g2=await herG(),h2=await herH();
 ok(c2,'P2 her card «Lập Thái tử» names the host\'s son',await G.p.evaluate(()=>Q.map(q=>q.t+':'+String(q.h||'').replace(/<[^>]+>/g,'').slice(0,80))));
 ok(g2.danh-g1.danh===-B.heirDanh&&h2.danh===g2.danh,'P2 the host\'s son replaces HER Thái tử: she loses Danh −heirDanh as solo (both seats)',{g1,g2,h2,heirDanh:B.heirDanh});
 /* P4 (CO-OP HEIR FIX r2, law 11): her OWN act in her context (j97 mật chiếu / jend14 ch14 / j4 setHeir) reads the world's Thái tử and writes it back */
 const p4a=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>[egHeirNone(),S.heir&&S.heir.k&&S.heir.k.name]));
 ok(p4a[0]===false&&p4a[1]==='Thử Hùng','P4 in her context the world\'s Thái tử (the host\'s son) is seen: "no Thái tử yet" is false',p4a);
 await reset();await sync();
 await H.p.evaluate(()=>{S.hr=null;S.heir=null;0});
 await H.p.evaluate(()=>{COOPW.thin.withSeat('b',()=>{const k=S.kids.find(k=>k.name==='Thử Lân');setHeir(k,null)});try{COOPW.thin.flush()}catch(e){}});
 await until(G,d=>(S.danh|0)!==d,g2.danh,15000);await sync();
 const g4=await herG(),h4=await herH(),w4=await H.p.evaluate(()=>[S.hr,S.heir&&S.heir.k&&S.heir.k.name]);
 ok(/\|Thử Lân#3$/.test(String(w4[0]))&&w4[1]==='Thử Lân','P4 her act made her son Thái tử: the world S.hr and the host\'s S.heir read him',w4);
 ok(g4.danh-g2.danh===B.heirDanh&&h4.danh===g4.danh,'P4 her Danh +heirDanh once, the same on both seats',{g2,g4,h4});
 await H.p.evaluate(()=>{S.hr=window.__hrs||null});
 /* P4 her own act (her context) names her son when there is no Thái tử: world S.hr + host S.heir follow, Danh once.
   P3 month end: estrangement once */
 await reset();await sync();
 await stage("const k=S.kids.find(k=>k.name==='Thử Lân');if(k){k.hM=60;k.kmS=-9}S.place='home';return 1");
 const m0=await herG();let m1=m0;
 for(let i=0;i<5&&m1.turn===m0.turn;i++){await week(H,G,'P3 week '+(i+1));await sync();m1=await herG()}
 const mh=await herH();
 ok(m1.turn>m0.turn,'P3 a month ended on her phone',{m0,m1});
 ok(m1.hM===Math.max(0,Math.min(100,60+B.estr)),'P3 her son away and unseen: Mẫu tử +estr ONCE (not twice)',{m0,m1,estr:B.estr});
 ok(mh.hM===m1.hM,'P3 the host\'s copy of her son reads the same Mẫu tử',{mh,m1});
 const npcK=p=>p.evaluate(()=>(rivals||[]).filter(v=>v&&!v.coop).flatMap(v=>(v.kids||[]).filter(k=>k.alive).map(k=>v.id+':'+k.name+':'+(k.hM==null?'-':k.hM))).sort().join('|'));
 const nk=[await npcK(H.p),await npcK(G.p)];
 ok(nk[0]===nk[1],'P3 NPC children: the same Mẫu tử on both seats',{host:nk[0].slice(0,400),guest:nk[1].slice(0,400)});
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-palace-life L${LVL} swap ${SWAP}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
