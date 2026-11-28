/* E-TIER-B13 batch 3 part 2 gate (law 2 same-result merge, owner OD 27/11 ~01:03Z «auto best fit»): the two static event cards whose two art ways
   give the SAME exam result now show ONE art way, the one with the better odds for her (tie → her higher art level), + the bow way:
   (1) C41 Lễ ra mắt jkc2 PEND.kc2Sel (every origin: KC2DART pairs cnv / nc / bd, the 1-art cn, and the generic two best arts);
   (2) jkc2 d_thi «Ngày tuyển cung nữ» (Làm bài khéo tay / Thêu một mảnh khăn → one).
   Also: the kept way's odds word = the best of the old two; tapping it runs the exam with that art; 0 page errors.
   usage: node dev/test/tier-b13-b3s.js */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const ROOT=path.resolve(__dirname,'../..');
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,600):''))};
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});
 const se=await g.evaluate(()=>{try{SLOT=9;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__forceOrigin='tt';start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;return typeof S}catch(e){return 'err '+e.message}});ok(se==='object','a life starts ('+se+')');
 /* (1) the selection card, per origin and per art spread */
 const R=await g.evaluate(()=>{const out=[];const o0=S.origin,a0=S.arts,s0=S.selx,s2=S.selx2;
  const cases=[['cnv',{kim:1,theu:4}],['cnv',{kim:4,theu:1}],['nc',{mua:5,cam:1}],['nc',{mua:0,cam:5}],['bd',{mua:1,ban:5}],['cn',{huong:3}],['tt',{cam:2,mua:5,ky:1}],['tt',{cam:5,mua:1}],['dtq',{}]];
  for(const [k,arts] of cases){S.origin=Object.assign({},o0,{k});S.arts=Object.assign({},arts);S.selx={};S.selx2=null;if(k==='cnv')S.srv=S.srv||{};
   let d=null,err=null;try{d=PEND.kc2Sel({})}catch(e){err=e.message}
   const all=(KC2DART[k]||entArts().slice(0,2).map(([a,,n])=>[a,`Dâng ${n}`]));const P=all.map(x=>({a:x[0],n:x[1],p:kc2SelP(x[0]),l:(S.arts||{})[x[0]]||0}));
   let best=P[0];for(const x of P)if(x.p>best.p||(x.p===best.p&&x.l>best.l))best=x;
   out.push({k,arts,err,n:d&&d.o.length,names:d&&d.o.map(o=>o.n),cand:P,best:best&&best.n})}
  S.origin=o0;S.arts=a0;S.selx=s0;S.selx2=s2;return out});
 for(const r of R)ok(!r.err&&r.n===2&&r.names[0]===r.best&&r.names[1]==='Cúi đầu chờ xét',`Lễ ra mắt ${r.k} ${JSON.stringify(r.arts)}: ${r.cand.length} art way(s) → «${r.names&&r.names[0]}» (odds ${r.cand.map(c=>c.n.replace(/^Dâng /,'')+' '+c.p).join(' / ')}) + «Cúi đầu chờ xét»`,r);
 /* (2) d_thi «Ngày tuyển cung nữ» (cung nữ home road) */
 const T=await g.evaluate(()=>{const out=[];const k0=S.kc,a0=S.arts;
  for(const kim of [0,3,5]){S.kc={kd:'dan',kim,ev:{},evT:{},fam:[]};S.arts={kim:1,theu:3};let d=null,err=null;try{d=KCE.d_thi.b({})}catch(e){err=e.message}
   const P=[['kim','Làm bài khéo tay'],['theu','Thêu một mảnh khăn']].map(([a,n])=>({a,n,p:kc2ExP(a)}));
   out.push({kim,err,n:d&&d.o.length,names:d&&d.o.map(o=>o.n),cand:P})}
  S.kc=k0;S.arts=a0;return out});
 for(const r of T){let w=r.cand&&r.cand[0];const L={kim:1,theu:3};if(r.cand)for(const c of r.cand)if(c.p>w.p||(c.p===w.p&&L[c.a]>L[w.a]))w=c;
  ok(!r.err&&r.n===2&&r.names[0]===w.n&&r.names[1]==='Cúi đầu chờ ma ma xét',`d_thi kim ${r.kim}: 2 art ways → «${r.names&&r.names[0]}» (odds ${r.cand.map(c=>c.a+' '+c.p).join(' / ')}) + «Cúi đầu chờ ma ma xét»`,r)}
 ok(errs.length===0,errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`TIER-B13-B3S: ${fail} FAIL`:'TIER-B13-B3S: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
