/* review/coop-guest-week-lag: the host's copy of the THIN GUEST (TH.seatOf "b" via withSeat) must equal her phone at EVERY week end
   (bạc, Sủng, Danh, Sức, items count, month card answers), both seat orders, thin levels 0 / 7 / 9. Real merged weeks through the real
   endTurn / monthTick (no direct stipend call). Repro of the bug found by E47 (bongloc-options «FIX ROUND 3»).
   usage: python3 dev/build/assemble.py && node dev/test/coop-week-lag.js [workerURL] [level=9] [swap=0]   (WEEKS=n, default 9; LOG=1 trace; RANK=3;
   STILL=1 = no press after a merge) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const LVL=+(process.argv[3]||9);const SWAP=+(process.argv[4]||0);const WEEKS=+(process.env.WEEKS||9);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const REALL=require('./lib/coop-real.js');async function mk(b,name,vp,want){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(([u,w])=>{window.COOP_URL=u;if(w)try{localStorage.setItem('ctm-thin',String(w))}catch(e){}
   window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}};
   /* trace: what each seat sends / receives about the guest's person (P.b) */
   window.__wl=[];const TH0=()=>{try{const V=COOPW.thin.view;return V&&[V.v,V.o.w,V.o.buoi,V.o.P&&V.o.P.b&&V.o.P.b.bac]}catch(e){return null}};const L=x=>{window.__wl.push(x);if(window.__wl.length>400)window.__wl.shift()};
   const hook=()=>{if(!window.COOP||!COOP.send||COOP.__wl)return;COOP.__wl=1;const s=COOP.send.bind(COOP);
    COOP.send=function(m){try{if(m&&m.t==='end'){const P=m.state&&m.state.P||{};L(['end',m.week,P.a&&P.a.S&&P.a.S.bac,P.b&&P.b.S&&P.b.S.bac,typeof S!=='undefined'&&S&&S.bac])}
     else if(m&&m.t==='do'&&(m.op==='erd'||m.op==='ready'||m.op==='f')){const V=COOPW.thin&&COOPW.thin.view;if(m.op!=='erd'&&V&&V.o&&typeof V.o.w==='number'&&V.o.w<(COOP.state.week||0))window.__stale=(window.__stale|0)+1;/* her ready / act sent while the host's view is still the OLD week: the race behind the bug */}
     if(m&&m.t==='do'&&m.op==='erd'){const A=m.args||{};const o=(A.ops||[]).filter(x=>JSON.stringify(x[1]).indexOf('"bac"')>=0);L(['erd',COOP.state.week,S&&S.buoi,(A.ops||[]).length,JSON.stringify(o).slice(0,160),S&&S.bac,'base',m.base,TH0()])}}catch(e){}return s(m)};
    COOP.on('week',m=>{try{const P=m.state&&m.state.P||{};L(['week',m.week,P.a&&P.a.S&&P.a.S.bac,P.b&&P.b.S&&P.b.S.bac,'pre',S&&S.bac]);const hb=()=>{try{return COOPW.seat==='a'&&COOPW.thin&&COOPW.thin.lvl?COOPW.thin.withSeat('b',()=>[S.bac,S.buoi,S.tuan]):null}catch(e){return e.message}};
     for(const t of [0,300,1500,4000])setTimeout(()=>L(['week+'+t,m.week,S&&S.bac,S&&S.buoi,S&&S.tuan,S&&S.month,hb(),(window.Q||[]).map(q=>q.t).slice(0,3)]),t)}catch(e){}})};
   const iv=setInterval(()=>{try{hook();if(window.COOP&&COOP.__wl)clearInterval(iv)}catch(e){}},50)},[WURL,want]);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon|fonts\.gstatic|CORS/.test(m.text()))o.errs.push('console: '+m.text().slice(0,300))});return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function week(A,B){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 /* press only while that seat is still in the old week: a press after the merge would step buổi sáng of the new week before the check */
 const STILL=!!process.env.STILL||!LVL;/* level 0 (old path): her week lives on her phone only until the merge, so the check stands at the week start */
 const inOld=o=>!STILL?Promise.resolve(true):o.p.evaluate(w=>COOP.state.week===w,w0);/* default: press on as a player does (her first ready / act of the new week may leave before the host's new view: the bug); STILL=1: never press after the merge */
 for(let g=0;g<14;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);if(await inOld(A))await press(A,8000);if(await inOld(B))await press(B,8000);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 return await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0)}
(async()=>{const b=await chromium.launch(/127\.0\.0\.1|localhost/.test(WURL)?{args:['--disable-features=BlockInsecurePrivateNetworkRequests,PrivateNetworkAccessSendPreflights,PrivateNetworkAccessRespectPreflightResults,LocalNetworkAccessChecks']}:{});
 const FOLD=[686,880],IPAD=[1180,820];
 const H=await mk(b,'host',SWAP?IPAD:FOLD,LVL),G=await mk(b,'guest',SWAP?FOLD:IPAD,0);
 await H.p.goto(BASE);await H.p.waitForTimeout(3000);await tapText(H,/^(Chơi cùng bạn|Cùng hảo hữu)/);await H.p.waitForTimeout(500);await tapText(H,/^(Mời bạn|Mời hảo hữu)/);
 await until(H,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await H.p.evaluate(()=>COOP.code);console.log('room',code,'level',LVL,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 const inW=async()=>{const t0=Date.now();while(Date.now()-t0<150000){await clear(H);await clear(G);const a=await H.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)return true;await sleep(500)}return false};
 await inW();
 for(const o of [H,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.kpWarn=1;render()});
 if(!(await until(H,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(H,G);
 await REALL.realize(H,G,()=>week(H,G),ok);
 if(LVL)ok(await until(G,lv=>COOPW.thin.lvl>=lv,LVL,40000),'level on',await G.p.evaluate(()=>COOPW.thin.lvl));
 const sync=async(ms=15000)=>{if(!LVL)return true;const t0=Date.now();while(Date.now()-t0<ms){await H.p.evaluate(()=>{try{COOPW.thin.flush()}catch(e){}});await sleep(500);
   const [hv,gv]=[await H.p.evaluate(()=>COOPW.thin.hv),await G.p.evaluate(()=>COOPW.thin.view&&COOPW.thin.view.v)];if(hv===gv)return true}return false};
 const KEYS=['bac','sung','danh','suc','duc','th'];
 const phone=()=>G.p.evaluate(K=>{const o={};for(const k of K)o[k]=S[k];o.inv=(S.inv||[]).length;o.tuan=S.tuan;o.month=S.month;o.rank=S.rank;o.buoi=S.buoi||0;o.thpn=S.thpn||0;return o},KEYS);
 const onHost=()=>H.p.evaluate(K=>{const f=()=>{const o={};for(const k of K)o[k]=S[k];o.inv=(S.inv||[]).length;o.buoi=S.buoi||0;return o};try{return COOPW.thin.lvl?COOPW.thin.withSeat('b',f):(()=>{const v=COOPW.friend();return v?{bac:v.bac,sung:v.sung,danh:v.danh,suc:v.suc,duc:v.duc,th:v.th}:null})()}catch(e){return{err:e.message}}},KEYS);
 const room=()=>G.p.evaluate(K=>{const C=COOPW.base||COOP.state.C;/* the merged week as her seat took it */const P=C&&C.P&&C.P.b;const o={};if(P&&P.S)for(const k of K)o[k]=P.S[k];return o},KEYS);
 /* her rank on both copies (the month card has a lễ nghĩa choice from rank 1) */
 const RK=+(process.env.RANK||3);await G.p.evaluate(r=>{S.rank=r;render()},RK);await H.p.evaluate(r=>{try{COOPW.thin.lvl&&COOPW.thin.withSeat('b',()=>{S.rank=r})}catch(e){}},RK);
 if(process.env.LOG)await H.p.evaluate(()=>{const TH=COOPW.thin,L=x=>window.__wl.push(x);const sd=TH.seatDrop;TH.seatDrop=function(k){L(['drop',k,COOP.state.week,!!COOPW.ctx]);return sd.apply(this,arguments)};
   const so=TH.seatOf;TH.seatOf=function(k){const B=so.apply(this,arguments);if(B&&B.fresh&&!B.__wl){B.__wl=1;const C=COOPW.base||COOP.state.C;L(['build',k,COOP.state.week,B.S.bac,B.S.suc,B.S.sung,B.S.buoi,C&&C.week,(new Error).stack.split('\n').slice(2,6).join('|').replace(/http:\/\/ctm.local\/[^:]*:/g,'')])}return B};
   const pa=TH.pApply;TH.pApply=function(T,ops){try{const o=(ops||[]).filter(x=>/"(bac|suc|sung|danh)"/.test(JSON.stringify(x&&x[1])));if(o.length&&COOPW.ctx)L(['pApply',COOPW.ctx,COOP.state.week,T&&T.buoi,JSON.stringify(o).slice(0,200),(new Error).stack.split('\n').slice(2,5).join('|').replace(/http:\/\/ctm.local\/[^:]*:/g,'')])}catch(e){}return pa.apply(this,arguments)};
   const et=endTurn;window.endTurn=endTurn=function(){if(COOPW.ctx)L(['endTurn-ctx',COOPW.ctx,COOP.state.week,S.bac,S.suc,S.sung,S.buoi,(new Error).stack.split('\n').slice(2,9).join('|').replace(/http:\/\/ctm.local\/[^:]*:/g,'')]);return et.apply(this,arguments)}});
 /* law 1 (two-way): HIS person as her phone holds it (the view's P.a at a thin level, the friend stand-in at level 0) == his phone */
 const hisOnHer=()=>G.p.evaluate(K=>{const o={};if(COOPW.thin&&COOPW.thin.lvl){const V=COOPW.thin.view,P=V&&V.o&&V.o.P&&V.o.P.a;if(P)for(const k of K)o[k]=P[k];o.buoi=V&&V.o&&V.o.buoi}else{const v=COOPW.friend();if(v)for(const k of K)o[k]=v[k]}return o},KEYS);
 const his=()=>H.p.evaluate(K=>{const o={};for(const k of K)o[k]=S[k];o.buoi=S.buoi||0;return o},KEYS);
 const rows=[];let off=0,offM=0,mw=0,offH=0;const hrows=[];
 for(let w=0;w<WEEKS;w++){const p0=await phone();const okw=await week(H,G);if(!okw){ok(false,`week ${w} merged once`);break}
  for(let i=0;i<4;i++){await clear(H);await clear(G);await sleep(300)}await sync();await sleep(1500);for(let i=0;i<3;i++){await clear(G);await sleep(200)}await sync();
  /* the check waits until both copies stand at the same buổi (REAL=1 may have stepped buổi sáng of the new week) */
  for(let t=0;t<30&&LVL;t++){const a=await phone(),c=await onHost();if(c&&a.buoi===c.buoi&&await sync(3000))break;await clear(H);await clear(G);await sleep(500)}await sleep(1000);await sync();
  const ph=await phone(),ho=await onHost(),rm=await room();const mc=ph.month!==p0.month;if(mc)mw++;
  /* level 0 (old path): the host holds her only as the friend stand-in = the merged week; what her phone does after the merge (her
     whole week, a card answer at buổi sáng included) reaches him at the next merge by design → the check is host == room there */
  const diff=KEYS.filter(k=>ho&&(LVL?ph[k]:(k==='bac'?Math.max(0,rm[k]):rm[k]))!==ho[k]);/* level 0: the stand-in is an NPC entry (ap() keeps bạc ≥ 0) */rows.push({w,month:ph.month,mc,ph,ho,rm,diff});
  {const a=await his(),c=await hisOnHer();const KH=LVL?KEYS:['bac','sung','danh'];/* level 0: the stand-in carries only what the friend card shows */const d=KH.filter(k=>a[k]!==c[k]);if(d.length){offH++;hrows.push({w,d:d.map(k=>k+':'+c[k]+'/'+a[k])})}}
  if(diff.length){off++;if(mc)offM++}
  console.log(`W${w} m${ph.month}${mc?'*':' '} b${ph.buoi}/${ho&&ho.buoi} phone ${KEYS.map(k=>k+'='+ph[k]).join(' ')} | host ${ho&&KEYS.map(k=>ho[k]).join('/')} | room ${KEYS.map(k=>rm[k]).join('/')}${diff.length?'  OFF '+diff.join(','):''}`);
  if(process.env.LOG){const gl=await G.p.evaluate(()=>{const x=window.__wl.slice();window.__wl.length=0;return x});const hl=await H.p.evaluate(()=>{const x=window.__wl.slice();window.__wl.length=0;return x});
   const el=await H.p.evaluate(()=>{const E=COOPW.thin.E;if(!E)return null;const x=E.log.slice();E.log.length=0;return x});
   console.log('  G',JSON.stringify(gl).slice(0,1500));console.log('  H',JSON.stringify(hl).slice(0,900));console.log('  E',JSON.stringify(el).slice(0,1500))}}
 ok(off===0,`every week end: the host's copy of her == ${LVL?'her phone':'the merged week (level 0)'} (${rows.length} weeks, ${mw} month changes)`,rows.filter(r=>r.diff.length).map(r=>({w:r.w,mc:r.mc,d:r.diff.map(k=>k+':'+r.ho[k]+'/'+r.ph[k])})));
 ok(offH===0,`every week end: her phone's copy of HIM == his phone (law 1)`,hrows);
 const wb=await G.p.evaluate(()=>{const E=COOPW.thin&&COOPW.thin.E;return E?{staleViewSends:window.__stale|0,rd:E.stat.rd,ops:E.stat.ops,big:E.stat.big}:null});console.log('guest E stat (staleViewSends = her ready / act sent before the host\'s new-week view: the race the fix covers)',JSON.stringify(wb));
 const errs=[...H.errs,...G.errs].filter(e=>!/ResizeObserver/.test(e));ok(!errs.length,'no page errors on either seat',errs.slice(0,4));
 await b.close();const nf=res.filter(r=>!r[0]).length;console.log(nf?`WEEK-LAG FAIL ${nf}/${res.length}`:`WEEK-LAG PASS ${res.length}/${res.length}`);process.exit(nf?1:0)})().catch(e=>{console.error(e);process.exit(1)});
