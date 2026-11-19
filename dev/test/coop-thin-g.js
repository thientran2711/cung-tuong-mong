/* coop-thin-g (part G: the week end + her personal month on the host for both seats, level 13). usage:
     node dev/test/coop-thin-g.js <W> [level 13] [swap 0|1]     (local Worker with THINMAX 13 until the FOR MAIN deploy)
   env: WEEKS=n (default 4) weeks played at level 13 (36 = the 12-month run), UP=1 starts the room at level 12 and upgrades it to 13
   (old room upgrade: the host takes P.b from the last merged C once; nothing lost), TABLE=<file> writes her per-week rows (JSON).
   G1 week at level 13: both seats one week on, her phone ran NO endTurn and sent NO end, the host ran her week end (G.stat.week), her
      phone's person == the host's store of her, no page error.  G2 same dice: her week end on the host (context b, constant dice) vs the
      SAME person + world as a SOLO game (constant dice): personal keys table.  G3 isolation: the host's own person and his device storage
      unchanged by her week end (probe).  G4 upgrade (UP=1).  G5 perf note (her week end ms on the host). */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||5);const SWAP=+(process.argv[4]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const TRIPSRC=process.env.TRIP?fs.readFileSync(path.join(__dirname,'coop-thin-trip.js'),'utf8'):null;
/* SHOTS=<dir outside git> (the Luân hồi intro overlay is hidden for the shot): host + guest at a buổi step (E3) and at her night card (E11), scratch only */
const shot=async(o,n)=>{if(!process.env.SHOTS)return;try{await o.p.evaluate(()=>{for(const b of document.querySelectorAll('.krbox')){const ov=b.parentElement;if(ov&&ov!==document.body)ov.style.display='none'}});await o.p.screenshot({path:require('path').join(process.env.SHOTS,n+'.png')})}catch(e){console.log('shot failed',n,e.message.split('\n')[0])}};
async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:process.env.SHOTS?2:1,reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},[WURL,want]);
  if(TRIPSRC&&name==='guest')await ctx.addInitScript(TRIPSRC);
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
 const FOLD=[686,880],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,+(process.env.UP||0)?12:LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G,'setup');
 const lv=[await H.p.evaluate(()=>COOPW.thin.lvl),await G.p.evaluate(()=>COOPW.thin.lvl)];
 const UP=+(process.env.UP||0);
 const both=async f=>[await H.p.evaluate(f),await G.p.evaluate(f)];
 const KEYS=['bac','sung','danh','suc','duc','th','tai','sac','tamco','rank'];/* mat (Tai mắt) is derived on the live S, not stored */
 const her=async()=>{const h=await H.p.evaluate(K=>{const B=COOPW.thin.seatOf('b');const s=B&&B.S||{};const o={};for(const k of K)o[k]=s[k];o.kids=(s.kids||[]).length;o.kidAge=(s.kids||[]).map(k=>k&&k.age).join(',');o.inv=(s.inv||[]).length;o.staff=(s.staff||[]).length;o.preg=JSON.stringify(s.preg||null).slice(0,40);o.ill=!!s.ill;o.dead=!!s.dead;return o},KEYS);
  const g=await G.p.evaluate(K=>{const o={};for(const k of K)o[k]=S[k];o.kids=(S.kids||[]).length;o.kidAge=(S.kids||[]).map(k=>k&&k.age).join(',');o.inv=(S.inv||[]).length;o.staff=(S.staff||[]).length;o.preg=JSON.stringify(S.preg||null).slice(0,40);o.ill=!!S.ill;o.dead=!!S.dead;return o},KEYS);return {h,g}};
 const diff=(a,b)=>Object.keys(a).filter(k=>JSON.stringify(a[k])!==JSON.stringify(b[k])).map(k=>[k,a[k],b[k]]);
 if(UP){ok(lv[0]===12&&lv[1]===12,'G4 upgrade: the room starts at level 12',lv)}else ok(lv[0]===LVL&&lv[1]===LVL,'G0 room level '+LVL+' on both seats',lv);
 /* counters on the guest: her endTurn runs, her outgoing messages */
 await G.p.evaluate(()=>{window.__sent=[];const s=COOP.send;COOP.send=function(m){try{window.__sent.push(m.t==='act'?'act:'+m.k:m.t==='do'?'do:'+m.op:m.t)}catch(e){}return s.apply(this,arguments)};
  window.__et=0;const e=endTurn;endTurn=function(){window.__et++;return e.apply(this,arguments)}});
 await G.p.evaluate(()=>{window.__noEnd=0;COOP.on('error',m=>{if(m&&m.code==='thinend')window.__noEnd++})});
 if(UP){/* G4: one week at level 12 with her items, then the host asks 13 */
  await week(H,G,'G4 level-12 week');
  const P12=await H.p.evaluate(()=>JSON.parse(JSON.stringify(COOPW.base.P.b)));
  await H.p.evaluate(()=>{localStorage.setItem('ctm-thin','13');COOPW.thin.say()});
  const up=await until(H,()=>COOPW.thin.lvl===13,null,20000)&&await until(G,()=>COOPW.thin.lvl===13,null,20000);ok(up,'G4 room upgraded to level 13 on both seats');
  const st=await H.p.evaluate(()=>{const B=COOPW.thin.seatOf('b');const s=B.S;return {inv:(s.inv||[]).map(x=>x&&(x.id||x.k)),kids:(s.kids||[]).map(k=>k.name),staff:(s.staff||[]).map(x=>x.sid),bac:s.bac,rank:s.rank,name:s.name}});
  const p={inv:(P12.S.inv||[]).map(x=>x&&(x.id||x.k)),kids:(P12.S.kids||[]).map(k=>k.name),staff:(P12.S.staff||[]).map(x=>x.sid),bac:P12.S.bac,rank:P12.S.rank,name:P12.S.name};
  ok(JSON.stringify(st)===JSON.stringify(p),'G4 the host store at level 13 = P.b of the last merged level-12 week (items / kids / servants / bạc)',[p,st]);}
 await H.p.evaluate(()=>{window.__drops=[];const d=COOPW.thin.seatDrop;COOPW.thin.seatDrop=function(x){window.__drops.push([COOP.state.week,x,(new Error().stack||'').split('\n').slice(2,5).join(' | ').replace(/http:\/\/ctm.local\/[^ ]*?([a-z0-9]+\.js)/g,'$1').slice(0,300)]);return d.apply(this,arguments)}});
 const W=+(process.env.WEEKS||4);const rows=[];let pass=0;const t0=Date.now();
 for(let k=0;k<W;k++){const a=await her();const g0=await G.p.evaluate(()=>({et:window.__et,end:window.__sent.filter(x=>x==='end').length}));const hs0=await H.p.evaluate(()=>COOPW.thin.G?COOPW.thin.G.stat.week:0);
  await week(H,G,'G1 week '+(k+1));for(let i=0;i<3;i++){await clear(H);await clear(G);await sleep(300)}
  let b=await her();const d0=diff(b.h,b.g);for(let t=0;t<20&&diff(b.h,b.g).length;t++){await sleep(500);b=await her()}if(d0.length)console.log('TRANSIENT week '+(k+1),JSON.stringify(d0),'settled',JSON.stringify(diff(b.h,b.g)),'to',JSON.stringify(d0.map(([x])=>[x,b.h[x],b.g[x]])));const g1=await G.p.evaluate(()=>({et:window.__et,end:window.__sent.filter(x=>x==='end').length,w:COOP.state.week}));const hs=await H.p.evaluate(()=>({w:COOPW.thin.G.stat.week,ms:COOPW.thin.G.ms.slice(-1)[0],G:COOPW.thin.G.stat,dev:COOPW.thin.G.devKeys,miss:COOPW.thin.uiMiss}));
  const d=diff(b.h,b.g);const okk=g1.et===g0.et&&g1.end===g0.end&&hs.w===hs0+1&&!d.length;if(okk)pass++;
  rows.push({w:g1.w,her:b.h,ms:hs.ms});
  ok(okk,'G1 week '+(k+1)+': her phone ran no week end, sent no end; the host ran hers once; her phone == host store',okk?{bac:[a.h.bac,b.h.bac],ms:hs.ms}:{et:[g0.et,g1.et],end:[g0.end,g1.end],hw:[hs0,hs.w],diff:d,G:hs.G})}
 console.log('ROWS',JSON.stringify(rows));if(process.env.TABLE)fs.writeFileSync(process.env.TABLE,JSON.stringify(rows,null,1));
 console.log('GSTAT',JSON.stringify(await H.p.evaluate(()=>({E:COOPW.thin.E.stat,drops:window.__drops||[],G:COOPW.thin.G.stat,dev:COOPW.thin.G.devKeys,miss:COOPW.thin.uiMiss||null,ms:COOPW.thin.G.ms,log:COOPW.thin.G.log.slice(-8)}))),'min',((Date.now()-t0)/60000).toFixed(1));
 /* G2 same dice + G3 isolation (probe: constant dice; everything put back after) */
 const pr=await H.p.evaluate(K=>{const TH=COOPW.thin,G=TH.G;const k=0.37;const R0=Math.random;
  const d0=JSON.stringify(ser());const B=TH.seatOf('b');const b0=JSON.stringify(B.S);const L0=JSON.stringify(Object.keys(localStorage).filter(x=>!/^(ctm-thin|ctm-f6b|ctm-coop)/.test(x)).sort().map(x=>[x,localStorage.getItem(x)]));
  const myKeys=s=>{const o={};for(const x of Object.keys(s))if(!COOPW.X.W_KEYS.includes(x)&&x!=='visit'/* display cache of who is here (refreshHere), rebuilt on every repaint */)o[x]=s[x];return JSON.stringify(o)};
  const hostP0=myKeys(JSON.parse(d0).S);
  /* her full state (person + world, her perspective) for the solo replay */
  let snap=null;TH.withSeat('b',()=>{S.buoi=typeof B4L==='number'?B4L:2;snap=ser()});
  snap.S.tuan=2;snap.R=(snap.R||[]).filter(r=>!r.coop);
  S.tuan=2;Math.random=()=>k;let ok1=false;try{ok1=G.herWeek(true)}finally{Math.random=R0}
  const A=TH.seatOf('b').S;const out={};for(const x of K)out[x]=A[x];out.kids=(A.kids||[]).map(c=>c&&c.age).join(',');out.inv=(A.inv||[]).length;out.staff=(A.staff||[]).length;out.loy=(A.staff||[]).map(s=>s&&s.loy).join(',');out.preg=JSON.stringify(A.preg||null).slice(0,40);out.ill=JSON.stringify(A.ill||null).slice(0,40);out.dead=!!A.dead;
  const hostP1=myKeys(ser().S);if(hostP0!==hostP1){const a=JSON.parse(hostP0),b=JSON.parse(hostP1);window.__hd=Object.keys(Object.assign({},a,b)).filter(x=>JSON.stringify(a[x])!==JSON.stringify(b[x])).map(x=>[x,JSON.stringify(a[x]).slice(0,600),JSON.stringify(b[x]).slice(0,600)])}const L1=JSON.stringify(Object.keys(localStorage).filter(x=>!/^(ctm-thin|ctm-f6b|ctm-coop)/.test(x)).sort().map(x=>[x,localStorage.getItem(x)]));
  /* put everything back */
  TH.seatOf('b').S=JSON.parse(b0);TH.seatOf('b').fresh=true;quiet=true;try{deser(JSON.parse(d0))}finally{quiet=false}Q.length=0;
  return {ran:ok1,A:out,snap,hd:window.__hd||null,hostSame:hostP0===hostP1,lsSame:L0===L1,dev:G.devKeys,miss:TH.uiMiss}},KEYS);
 ok(pr.ran,'G2 her month week end ran on the host (constant dice probe)');
 ok(pr.hostSame,'G3 the host\'s own person unchanged by her week end (no leak between the two)',pr.hd);
 ok(pr.lsSame,'G3 the host\'s device storage unchanged by her week end (device ledgers kept off)',pr.dev);
 /* the same person + world as a SOLO game, same constant dice */
 const So=await b.newContext({viewport:{width:686,height:880}});await serve(So);const sp=await So.newPage();const serr=[];sp.on('pageerror',e=>serr.push(e.message));
 await sp.goto(BASE);await sp.waitForTimeout(3000);
 const B2=await sp.evaluate(([snap,K])=>{const k=0.37;const R0=Math.random;quiet=true;try{deser(snap)}finally{quiet=false}Q.length=0;S.dead=false;
  Math.random=()=>k;try{nextBuoi()}catch(e){return {err:e.message}}finally{Math.random=R0}
  const A=S;const out={};for(const x of K)out[x]=A[x];out.kids=(A.kids||[]).map(c=>c&&c.age).join(',');out.inv=(A.inv||[]).length;out.staff=(A.staff||[]).length;out.loy=(A.staff||[]).map(s=>s&&s.loy).join(',');out.preg=JSON.stringify(A.preg||null).slice(0,40);out.ill=JSON.stringify(A.ill||null).slice(0,40);out.dead=!!A.dead;out.month=S.month;return out},[pr.snap,KEYS]);
 console.log('SAMEDICE',JSON.stringify({host:pr.A,solo:B2}));
 const dd=B2.err?[['err',B2.err]]:diff(pr.A,Object.fromEntries(Object.entries(B2).filter(([x])=>x!=='month')));
 ok(!B2.err&&dd.length===0,'G2 her month on the host = the solo rules, same dice (personal keys)',dd);
 await So.close();
 const errs=[...H.errs,...G.errs];ok(!errs.length,'no page errors',errs.slice(0,6));
 const n=res.filter(r=>r[0]).length;console.log(`coop-thin-g ${n}/${res.length}`);await b.close();process.exit(n===res.length?0:1)})().catch(e=>{console.error(e);process.exit(2)});
