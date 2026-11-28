/* coop-hh-decu (d-followups-1, law 1): «Hoàng hậu đề cử» in a co-op room, BOTH orders.
   (A) the HOST is the Hoàng hậu: her own pick on her phone (solo path), the guest's copy of the world shows the nominee's special exam.
   (B) the GUEST is the Hoàng hậu: before, pbHhMeList was empty on a guest (NPC state is the host's) → nobody nominated in that world. Now her
       act card + kit sheet show on her phone, her pick = intent pbHhMeDo (jcoopthinf reg8, level 8) run on the HOST in her context: the same
       pbHhMeList rules, the same once-key hh:<her key>, the same gains / losses; a second pick of the same nominee is refused.
   harness = coop-thancan.js head (coop-thin-f4). usage: python3 dev/build/assemble.py && node dev/test/coop-hh-decu.js <workerURL> [level=9] */
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
 await week(H,G,'settle');/* a merged week carries her phone's set-up diff (rank 3) to the host: the rank staged below is not added to it */
 /* stage her person in the HOST's store (her context) → the patch reaches her phone (never written on her phone) */
 const stage=async src=>{const r=await H.p.evaluate(src=>{try{return COOPW.thin.withSeat('b',()=>{const o=(0,eval)('(function(){'+src+'})')();/* every staged piece gets its ledger id now (the game gives it lazily): the same piece is traced by it after giveTo hands over a new entry */for(const e of S.inv||[])if(e&&e.tg3&&e.iu==null&&typeof ilUid==='function')ilUid(e);return o})}catch(e){return 'EXC '+e.message}},src);await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sync();await sleep(300);return r};

 /* the world: three NPC candidates, the NPC queen stepped down (same recipe as dev/test/promo-build.js queenMe), on the HOST (NPC state is his) */
 const NPCSET="const q0=queenP();if(q0&&!q0.coop&&q0!==S){q0.queen=false;q0.rank=6}const v=liveRivals(false).filter(x=>x.rank<3&&!x.confined&&!x.coop&&!pbOpen(x)).slice(0,3);v.forEach((x,i)=>{delete x.ex;delete x.pbs;x.hh=95-i;x.th=60;x.sung=0;x.danh=0;x.lastPromo=S.turn;x.confined=0});return v.map(x=>x.id)";
 const npcSet=()=>H.p.evaluate(()=>{const q0=queenP();if(q0&&!q0.coop&&q0!==S){q0.queen=false;q0.rank=6}
   const v=liveRivals(false).filter(x=>x.rank<3&&!x.confined&&!x.coop&&!pbOpen(x)).slice(0,3);v.forEach((x,i)=>{delete x.ex;delete x.pbs;x.hh=95-i;x.th=60;x.sung=0;x.danh=0;x.lastPromo=S.turn;x.confined=0});return v.map(x=>x.id)});
 const qOf=(o,id,hk)=>o.p.evaluate(([id,hk])=>{const v=RV(id);if(!v)return null;const s=(v.pbs||{}).hh||{};return{gw:(v.ex||{}).gw||null,once:s[hk]||0}},[id,hk]);
 /* (A) host = Hoàng hậu */
 await reset();let ids=await H.p.evaluate(src=>{S.rank=7;S.lastPromo=S.turn;return (0,eval)('(function(){'+src+'})')()},NPCSET);
 const hkA=await H.p.evaluate(()=>pbHhMeKey());
 const LA=await H.p.evaluate(()=>pbHhMeList().map(v=>v.id));ok(LA.length>=1,'A1 host queen: her nominee list (solo rules)',LA.length?LA:await H.p.evaluate(ids=>({rk:rkOf(S),ex:exOn(),live:pbLive(S),g:pbGuest(),c:ids.map(id=>{const v=RV(id);return{id,can:pbCan(v),open:pbOpen(v),to:exS(v).to,hh:pbHhOf(v),cut:pbHhCut(S),rows:pbRowsOk(v),miss:exBase(v).filter(x=>!x[0]).map(x=>x[1])}})}),ids));
 const cardA=await H.p.evaluate(()=>{deal();return deck.some(a=>a&&a.pbhh)});ok(cardA,'A1 host queen: «Hoàng hậu đề cử» act card');
 if(LA.length){await H.p.evaluate(()=>{Q.length=0;pbHhMeOpen();chooseM(0)});await sync();
  const hA=await qOf(H,LA[0],hkA),gA=await qOf(G,LA[0],hkA);
  ok(hA&&hA.gw==='hh'&&hA.once===1,'A2 host pick: the nominee has the hh special exam, once-key counted',hA);
  ok(gA&&gA.gw==='hh','A2 the guest\'s copy shows the same nominee exam',gA);
  ok(await H.p.evaluate(id=>!pbHhMeList().some(v=>v.id===id),LA[0]),'A3 once per life per queen: not listed again')}
 await H.p.evaluate(()=>{S.rank=3;render()});console.log('errs after A (info)',G.errs.length,H.errs.length);
 /* (B) guest = Hoàng hậu */
 await G.p.evaluate(()=>{const f=kszRankName;kszRankName=function(p){try{return f.apply(this,arguments)}catch(e){window.__kszE={rank:S&&S.rank,isS:p===S,t:typeof S.rank,st:e.stack.slice(0,400)};throw e}}});
 await reset();await stage("S.rank=7;S.lastPromo=S.turn;S.trait=S.trait||'Điềm tĩnh';S.confined=0;S.out=0");await until(G,()=>S.rank===7,null,30000);/* her person is staged on the host only (a second write on her phone would ride as her own diff and add up) */
 ids=await H.p.evaluate(src=>{const a=(0,eval)('(function(){'+src+'})')();COOPW.thin.withSeat('b',()=>(0,eval)('(function(){'+src+'})')());return a},NPCSET);await sync();
 console.log('B setup (info)',JSON.stringify(await G.p.evaluate(ids=>({rk:S.rank,hh:ids.map(id=>(RV(id)||{}).hh)}),ids)),JSON.stringify(await H.p.evaluate(ids=>COOPW.thin.withSeat('b',()=>({rk:S.rank,hh:ids.map(id=>(RV(id)||{}).hh)})),ids)));
 const hkB=await G.p.evaluate(()=>pbHhMeKey());const hkBh=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>pbHhMeKey()));
 ok(hkB===hkBh&&hkB!==hkA,'B0 her once-key is her own seat\'s (phone = host in her context), not the host\'s',{hkA,hkB,hkBh});
 console.log('errs after A (info)',G.errs.length,JSON.stringify(await G.p.evaluate(()=>window.__kszE||null)));
 ok(await G.p.evaluate(()=>S.rank===7),'B0 her rank 7 reached her phone',await G.p.evaluate(()=>S.rank));
 ok(await G.p.evaluate(()=>!!(COOPW.thin.F&&COOPW.thin.F.R&&COOPW.thin.F.R.pbHhMeDo)&&pbHhMeCoop()),'B0 intent pbHhMeDo registered and on (level 8+)');
 const LB=await G.p.evaluate(()=>pbHhMeList().map(v=>v.id));const LBh=await H.p.evaluate(()=>COOPW.thin.withSeat('b',()=>pbHhMeList().map(v=>v.id)));
 ok(LB.length>=1,'B1 guest queen: her nominee list on her phone (was always empty)',LB.length?LB:await G.p.evaluate(ids=>{const q=queenP();const o={q:q===S?'me':q?q.id:null,rl:ids.map(id=>S.rl&&S.rl[id]),rk:rkOf(S),ex:exOn(),live:pbLive(S),g:pbGuest(),coop:pbHhMeCoop(),srv:typeof isSrv==='function'&&isSrv()};try{o.c=ids.map(id=>{const v=RV(id);const r={id,coop:v.coop,can:pbCan(v),conf:v.confined,open:pbOpen(v),to:exS(v).to,hh:pbHhOf(v),cut:pbHhCut(S)};try{r.once=(pbS(v).hh||{})['hh:'+key(S)]}catch(e){r.pbsErr=e.message}try{r.rows=pbRowsOk(v);r.done=pbRoadDone(v)}catch(e){r.rowErr=e.message}return r});o.inLive=liveRivals(false).map(v=>v.id)}catch(e){o.err=e.message+' '+e.stack.slice(0,300)}return o},LBh));
 ok(JSON.stringify(LB)===JSON.stringify(LBh),'B1 the same list as the host computes in her context (one rule)',{phone:LB,host:LBh});
 const cardB=await G.p.evaluate(()=>{deal();const c=deck.find(a=>a&&a.pbhh);return c?{n:c.n,k:c.k}:null});ok(!!cardB&&cardB.k===await G.p.evaluate(()=>BAL.promoR.sp.meK),'B1 her act card, khắc from BAL',cardB);
 const sheet=await G.p.evaluate(()=>{Q.length=0;pbHhMeOpen();const m=Q[0];return m?{t:m.t,n:m.opts.filter(o=>o.go).length,x:m.opts.filter(o=>o.go).map(o=>String(o.x).replace(/^được: .*? nợ ngươi/,'được: N nợ ngươi'))}:null});
 ok(sheet&&sheet.t==='Hoàng hậu đề cử'&&sheet.n===LB.length&&sheet.x.every(x=>x===sheet.x[0]),'B2 the same kit sheet on her phone, equal options',sheet);
 if(LB.length){const id=LB[0],oth=LB.slice(1);
  const before=await H.p.evaluate(([id,oth])=>COOPW.thin.withSeat('b',()=>({owe:(q72().d[q72Key(q72A("rv",id))]||0),oan:oth.map(x=>{const v=RV(x);return v?Math.round(oan(v,S)||0):0})})),[id,oth]).catch(()=>null);
  await G.p.evaluate(()=>chooseM(0));
  const went=await until(H,([id,hk])=>{const v=RV(id);return !!v&&((v.pbs||{}).hh||{})[hk]===1},[id,hkB],20000);await sync();
  const hB=await qOf(H,id,hkB),gB=await qOf(G,id,hkB);
  ok(went&&hB.gw==='hh','B3 her pick ran on the HOST: the nominee has the hh special exam, once-key hh:<her key> counted',hB);
  ok(gB&&gB.gw==='hh'&&gB.once===1,'B3 her phone shows the same (host view)',gB);
  const after=await H.p.evaluate(([id,oth])=>COOPW.thin.withSeat('b',()=>({owe:(q72().d[q72Key(q72A("rv",id))]||0),oan:oth.map(x=>{const v=RV(x);return v?Math.round(oan(v,S)||0):0})})),[id,oth]).catch(()=>null);
  ok(before&&after&&after.owe-before.owe===await G.p.evaluate(()=>BAL.promoR.sp.cost.hhOwe),'B4 gain: the nominee owes HER one ân (her q72 on the host)',{before,after});
  ok(!oth.length||(before&&after&&after.oan.every((x,i)=>x>before.oan[i])),'B4 loss: every passed-over candidate oán her',{before,after});
  const lg=await G.p.evaluate(()=>String((S.logs||[])[0]||'').replace(/<[^>]+>/g,''));ok(/Ngươi đề cử/.test(lg),'B5 her log line came back to her phone',lg);
  ok(await G.p.evaluate(id=>!pbHhMeList().some(v=>v.id===id),id),'B6 once per life per queen: not listed again on her phone');
  const again=await H.p.evaluate(id=>COOPW.thin.withSeat('b',()=>{const v=RV(id);const n0=((v.pbs||{}).hh||{});pbHhMeDo(v,[]);return ((v.pbs||{}).hh||{})}),id);
  ok(again[hkB]===1,'B6 a second pick of the same nominee is refused on the host',again)}
 ok(await H.p.evaluate(()=>S.rank===3),'host life untouched by her pick');
 ok(!H.errs.length&&!G.errs.length,'no page errors',{h:H.errs.slice(0,4),g:G.errs.slice(0,4)});
 const n=res.filter(x=>x[0]).length;console.log(`coop-hh-decu L${LVL}: ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
