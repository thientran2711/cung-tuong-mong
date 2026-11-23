/* coop-ge-npc (B LANDER #2b co-op land gate for review/ge-npc-r1): an NPC's grand ending (GE09) is resolved ONCE on the host (world owner), both seats
   read the same v.ge result through the thin lens, and the «Thiên hạ truyền tin» centre pop-up (GE08) shows on EACH seat once (geNs per player); the guest phone
   never resolves / moves an NPC road itself. Harness = coop-thancan.js head (lines 3-53 copied).
   usage: python3 dev/build/assemble.py && [GE_BR=pt_tang] node dev/test/coop-ge-npc.js <workerURL> [level=9] [swap=0|1]  (GE_BR: road the NPC walks; origin = geOrig) */
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
 await G.p.evaluate(()=>{window.__gN=[];const P=Q.push;Q.push=function(...a){for(const q of a)if(q&&q.t==="Thiên hạ truyền tin")__gN.push(JSON.stringify((q.kit&&q.kit.facts)||q.h||''));return P.apply(this,a)}});
 /* G1: host resolves an NPC road (forced success on a stay ending, as ge-npc-unit (2)) */
 const pick=await H.p.evaluate((BR)=>{const br=BR||Object.keys(GE_DATA).find(b=>b==="tt_tranh")||Object.keys(GE_DATA).find(b=>nrRoads(b.split("_")[0]).includes(b));
  const v=rivals.find(x=>x&&x.alive&&!x.out&&!x.coop&&!x.queen&&x.name);if(!v)return{err:'no npc'};v.nr=nrNew(geOrig(br),br);v.ge=undefined;geNpcDbg.state(v);
  const E=GE_CAT[br].e;const i=E.findIndex(e=>e[3]!==3&&!BAL.ge.npc.leave.includes(e[5])&&!BAL.ge.seat.includes(e[5]));const roll0=roll;let res=null;
  for(let t=0;t<40&&!(res&&res.ok&&res.i===i);t++){const g=v.ge;g.st=["o","o","o","o"];g.done=0;g.res=null;g.pull=[0,0,0,0];g.pull[i]=200;roll=()=>true;try{res=geNpcResolve(v)}finally{roll=roll0}v.alive=true}
  return{id:v.id,name:v.name,b:v.ge.b,ok:!!(res&&res.ok),ti:res&&res.ti}},process.env.GE_BR||'');
 ok(pick.ok&&pick.ti,'G1 host resolved an NPC road (success)',pick);
 await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();await sleep(500);await sync();
 const gv=await G.p.evaluate(id=>{const v=rivals.find(x=>x&&String(x.id)===String(id));return v?{name:v.name,b:v.ge&&v.ge.b,ok:!!(v.ge&&v.ge.res&&v.ge.res.ok),ti:v.ge&&v.ge.res&&v.ge.res.ti,done:v.ge&&v.ge.done}:null},pick.id);
 ok(gv&&gv.ok&&gv.ti===pick.ti&&gv.name===pick.name&&gv.b===pick.b,'G2 guest lens reads the SAME NPC ending (one world)',{gv,pick});
 /* G3: the pop-up on each seat, once */
 const newsQ=()=>Q.filter(q=>q&&q.t==="Thiên hạ truyền tin").map(q=>JSON.stringify((q.kit&&q.kit.facts)||q.h||''));
 await H.p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});const hn=await H.p.evaluate(()=>geNpcNews());const hq=await H.p.evaluate(newsQ);
 ok(hn>=1&&hq.some(f=>f.includes(pick.ti)),'G3 host: «Thiên hạ truyền tin» pop-up with her title',{hn,hq:hq.slice(0,2)});
 /* her phone shows it on its own (render hook, once the host's view arrived): the watch was set before G1 */
 const gw=await until(G,ti=>__gN.some(f=>f.includes(ti)),pick.ti,30000);const gq=await G.p.evaluate(()=>__gN.slice());
 ok(gw,'G3 guest: the same pop-up on her phone by itself (render hook, not host-only)',{gq:gq.slice(0,2),ns:await G.p.evaluate(()=>Object.keys(S.geNs||{}))});
 const again=await both(()=>{Q.length=0;try{closeModal()}catch(e){}return geNpcNews()});const gl=await G.p.evaluate(()=>__gN.length);ok(again[0]===0&&again[1]===0&&gl===1,'G4 once per player: no repeat on either seat (her phone showed it exactly once)',[again,gl]);
 /* G5: the guest phone never moves an NPC road (GE10 help is host-only) */
 const gp=await G.p.evaluate(id=>{const v=rivals.find(x=>x&&String(x.id)===String(id));if(!v||!v.ge)return null;const p0=JSON.stringify(v.ge.pull);
  try{if(typeof nrHelped==='function')nrHelped({A:{o:v},B:{o:null}},1)}catch(e){return{exc:e.message}}return{same:JSON.stringify(v.ge.pull)===p0}},pick.id);
 ok(gp&&gp.same,'G5 guest seat: a help on her phone does not move the NPC road locally (host owns NPC roads)',gp);
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-ge-npc L${LVL} swap ${SWAP}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
