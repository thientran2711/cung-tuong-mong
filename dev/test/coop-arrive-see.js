/* coop-arrive-see (review/coop-arrive-see, GAP OD-CO1): in co-op the friend who arrives SECOND at a place must see the friend already
   standing there, and the one already there sees the arrival (law 1 two-way + law 6b real people). Order: host first, then her; then her
   first, then host; SWAP=1 = devices swapped. RUNS=<n> repeats (default 5). Paths: walk (goTo), a walk after a buổi change, visit her palace
   (visitPal), return home (both see each other gone). Harness head = coop-places.js.
   usage: python3 dev/build/assemble.py && node dev/test/coop-arrive-see.js <workerURL> [level=9] [swap=0|1] */
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
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.buoi=0;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 await REALL.realize(H,G,()=>week(H,G,'setup'),ok);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 const L0=LVL===0;/* level 0 = the LIVE default (no ctm-thin flag): each phone runs its own world, no host copy of her */
 if(L0)ok(await until(G,()=>COOPW.thin.lvl===0,null,20000),'L0 room level 0 (live default)');else ok(await until(G,lv=>COOPW.thin.lvl>=lv&&!!COOPW.thin.view&&COOPW.thin.C.isLens(rivals),LVL,40000),'F0 level on, the guest NPC list is the lens',await both(()=>[COOPW.thin.lvl,COOPW.thin.C.isLens(rivals)]));
 for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
 /* settle: the host's view of this moment has arrived */
 const sync=async(ms=15000)=>{if(L0){await sleep(1200);return true}const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
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
 const stage=async src=>{if(L0)return G.p.evaluate(src=>{const o=(0,eval)('(function(){'+src+'})')();try{render()}catch(e){}return o},src);const r=await H.p.evaluate(src=>{try{return COOPW.thin.withSeat('b',()=>{const o=(0,eval)('(function(){'+src+'})')();/* every staged piece gets its ledger id now (the game gives it lazily): the same piece is traced by it after giveTo hands over a new entry */for(const e of S.inv||[])if(e&&e.tg3&&e.iu==null&&typeof ilUid==='function')ilUid(e);return o})}catch(e){return 'EXC '+e.message}},src);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();await sleep(300);return r};
 /* her person on the HOST (seat b store) and the host's own: place, visit place, people names at the visit, khắc clock */
 const PL=()=>({place:S.place,vk:S.visit&&S.visit.k||null,ppl:((S.visit&&S.visit.people)||[]).map(p=>p.name).sort(),used:typeof used==='number'?used:null,buoi:S.buoi,turn:S.turn});
 const hostOwn=()=>H.p.evaluate(`(${PL})()`);
 const herOnHost=()=>L0?herPhone():H.p.evaluate(`COOPW.thin.withSeat('b',${PL})`);
 const herPhone=()=>G.p.evaluate(`(${PL})()`);
 /* PLACES=tgk: the same check on an old place (control) */
 const keeper={nth:'Quản sự Ngự thiện phòng',pd:'Sư cô Phật đường',tgk:'Quản sự Tân Giả khố'};
 const home=async()=>{await stage("S.place='home';S.visit=null;S.buoi=0;S.rank=3;S.confined=0;S.out=0;S.ent=null;return 1");await H.p.evaluate(()=>{S.place='home';S.visit=null;S.buoi=0;S.ent=null;used=0;try{render()}catch(e){}});await stage('used=0;return 1');await sync()};
 const walkHost=async k=>{await reset();return H.p.evaluate(k=>{S.ent={d:typeof j95sDay==='function'?j95sDay():0,ids:[],at:k};goTo(k);Q.length=0;return S.place},k)};
 const walkHer=async k=>{await reset();await G.p.evaluate(k=>{S.ent={d:typeof j95sDay==='function'?j95sDay():0,ids:[],at:k};goTo(k)},k);const ok1=await until(G,k=>S.place===k&&!(COOPW.thin.F&&COOPW.thin.F.pend),k,20000);await sync();return ok1};
 const counts=k=>Promise.all([H.p.evaluate(k=>({[k]:countAt(k)}),k),G.p.evaluate(k=>({[k]:countAt(k)}),k)]);
 const order=SWAP?['her','host']:['host','her'];
 const RUNS=+(process.env.RUNS||5);
 const fname=o=>o.p.evaluate(()=>{const f=rivals.find(v=>v&&v.coop);return f?f.name:null});
 const sees=async(o,ctxHer)=>{const src=`(()=>{const f=rivals.find(v=>v&&v.coop);const P=(S.visit&&S.visit.people)||[];return {place:S.place,vk:S.visit&&S.visit.k||null,f:f?f.name:null,fw:f&&S.where?S.where[f.id]:null,saw:!!f&&P.some(p=>p&&(p.ref&&p.ref.coop||p.name===f.name)),ppl:P.map(p=>p&&p.name)}})()`;
  return ctxHer&&L0?sees(G):ctxHer?o.p.evaluate(`COOPW.thin.withSeat('b',()=>${src})`):o.p.evaluate(src)};
 const look=async()=>({host:await sees(H),herH:await sees(H,1),her:await sees(G)});
 const PLC=(process.env.PLACES||'tgk,nth').split(',');
 for(let r=1;r<=RUNS;r++)for(const first of ['host','her'])for(const k of PLC){
  await home();
  const go=async who=>who==='host'?(await walkHost(k),await sync()):await walkHer(k);
  await go(first);await sleep(400);const L1=await look();
  const second=first==='host'?'her':'host';await go(second);await sleep(600);await sync();await sleep(400);const L2=await look();
  const tag=`run${r} ${k} ${first}-first`;
  ok(L2.host.vk===k&&L2.her.vk===k,`${tag}: both stand at ${k}`,L2);
  ok(L2.host.saw,`${tag}: host sees her`,L2);
  ok(L2.her.saw,`${tag}: her phone sees the host`,L2);
  ok(L2.herH.saw===L2.her.saw,`${tag}: host's copy of her = her phone`,L2);
  void L1}
 /* buổi change: both stand at the same place, the room steps one buổi; after it, presence matches places on both seats */
 for(const k of PLC.slice(0,1)){await home();await walkHost(k);await sync();await walkHer(k);await sync();await sleep(400);
  const b0=await H.p.evaluate(()=>S.buoi||0);await press(H);await press(G);
  const t0=Date.now();while(Date.now()-t0<40000){await clear(H);await clear(G);if(await H.p.evaluate(b=>(S.buoi||0)!==b,b0)&&await G.p.evaluate(b=>(S.buoi||0)!==b,b0))break;await sleep(400)}
  await sleep(800);await sync();await sleep(400);const L=await look();const same=L.host.place===L.her.place&&L.host.vk&&L.her.vk;
  ok(L.host.saw===!!same&&L.her.saw===!!same&&L.herH.saw===L.her.saw,`buổi step at ${k}: presence matches places on both seats`,L);
  /* then she walks to where the host now is (after the step) and both see each other */
  if(L.host.place&&L.host.place!=='home'){await walkHer(L.host.place);await sync();await sleep(500);const M=await look();ok(M.host.saw&&M.her.saw,`after the buổi step: she joins the host at ${L.host.place}, both see`,M)}
  else{await walkHost(k);await sync();await walkHer(k);await sync();await sleep(500);const M=await look();ok(M.host.saw&&M.her.saw,`after the buổi step: both walk to ${k}, both see`,M)}}
 /* return home: the one who leaves is gone from the other's list */
 await home();await walkHost(PLC[0]);await sync();await walkHer(PLC[0]);await sync();await sleep(500);
 await stage('used=0;return 1');await G.p.evaluate(()=>{Q.length=0;goTo('home')});await sleep(800);await sync();await sleep(400);let L=await look();
 ok(L.host.vk===PLC[0]&&!L.host.saw,'home: she went home, the host no longer sees her',L);
 await walkHer(PLC[0]);await sync();await sleep(500);
 await H.p.evaluate(()=>{used=0;Q.length=0;goTo('home')});await sleep(800);await sync();await sleep(400);L=await look();
 ok(L.her.vk===PLC[0]&&!L.her.saw&&!L.herH.saw,'home: the host went home, she no longer sees him',L);
 if(process.env.DBG)console.log('DBG',JSON.stringify(await H.p.evaluate(()=>{const f=rivals.find(v=>v.coop);return COOPW.thin.withSeat('b',()=>({k:S.place,W:S.where[rivals.find(v=>v.coop).id],P:S.visit.people.map(p=>({kind:p.kind,n:p.name,ref:!!p.ref,co:!!(p.ref&&p.ref.coop),same:p.ref===rivals.find(v=>v.coop)})),presK:COOPW.presK}))})));
 /* visit her palace while she is at home (visitPal), both ways */
 await home();await sleep(500);
 const hp=await H.p.evaluate(()=>{const f=rivals.find(v=>v&&v.coop);Q.length=0;visitPal(f.id);Q.length=0;return S.place});await sleep(800);await sync();L=await look();
 ok(L.host.saw,'visitPal: host at her palace sees her at home',{hp,L});
 await home();await sleep(500);
 await G.p.evaluate(()=>{const f=rivals.find(v=>v&&v.coop);Q.length=0;visitPal(f.id)});await sleep(1500);await sync();L=await look();
 ok(L.her.saw,'visitPal: she at the host palace sees him at home',L);
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-arrive-see L${LVL} swap${SWAP}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
