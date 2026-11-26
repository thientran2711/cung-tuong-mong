/* stat-pace (owner OD 26/11 ~01:25Z event pile-up + ~04:20Z «1 năm đã full 100»): unit checks of the ONE rise rule (jstatpace spG / spAdd,
   BAL.sp) and the daily big-event cap (jevc, BAL.evc), on the built page, then simulated bot days (inpage6 «sens» bot) that must never show
   her more big events in one day than BAL.evc.cap (a fixed-date festival day may add its festival).
   usage: node dev/test/stat-pace.js <index.html> [days=45] → ok / FAIL lines, last line PASS / FAIL n; exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,PAGE,DAYS]=process.argv;const ND=+DAYS||45;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.addInitScript(`(function(){let s=4242;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
 const p=await ctx.newPage();p.setDefaultTimeout(600000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
 const U=await p.evaluate(()=>{const R=[];const ok=(c,m)=>R.push([!!c,m]);const B=BAL.sp;
  ok(typeof spG==="function"&&typeof spAdd==="function"&&typeof evcOK==="function","rule + cap loaded");if(typeof spG!=="function")return R;
  /* (1) size band: one change never passes «big»; a fall untouched */
  const h={};ok(spG("rel",h,0,34,7)<=B.band.rel[2],`kỳ ngộ thiện cảm +34 → ${spG("rel",{},0,34,7)} (big band ${B.band.rel[2]})`);
  ok(spG("sung",{},0,12,7)<=B.band.sung[2],`Sủng +12 → ${spG("sung",{},0,12,7)} (big ${B.band.sung[2]})`);
  ok(spG("danh",{},50,-9,0)===-9,"a fall is never touched");
  ok(spG("rel",{},0,-40,0)>=-B.band.rel[2]&&spG("rel",{},30,-20,0)===-20,`thiện cảm: dislike growing is paced (0 −40 → ${spG("rel",{},0,-40,0)}), a fall back toward 0 is not (30 −20 → ${spG("rel",{},30,-20,0)})`);
  ok(spG("danh",{},0,2,7)===2,"a small rise far from the ceiling is kept whole");
  /* (2) ceiling by rank; the road up never closes; above-ceiling values are kept (no rise, no drop) */
  for(let r=0;r<7;r++)ok(B.ceil[r]>RANKS[r+1].s&&B.ceil[r]>RANKS[r+1].d,`ceiling rank ${r} ${B.ceil[r]} > next rank needs Sủng ${RANKS[r+1].s} / Danh ${RANKS[r+1].d}`);
  ok(spG("sung",{},B.ceil[0],5,0)===0&&spG("sung",{},B.ceil[0]+20,5,0)===0,"at / above the rank ceiling a rise adds nothing");
  for(let r=1;r<8;r++)ok(B.ceil[r]>=B.ceil[r-1],`ceiling rises with rank (${B.ceil[r-1]} → ${B.ceil[r]})`);
  /* (3) diminishing returns: the same rise adds less near the top */
  const lo=spG("danh",{},5,5,2),hi=spG("danh",{},55,5,2);ok(hi<lo,`Danh +5 at 5 → ${lo}, at 55 → ${hi}`);
  /* (4) carry: 20 × +1 at 70 % of the ceiling adds about 20 × (1 − .49) */
  {const q={};let s=0,c=Math.round(B.ceil[3]*.7);for(let i=0;i<20;i++)s+=spG("duc",q,c,1,3);const f=Math.max(B.dm.min,1-Math.pow(c/B.ceil[3],B.dm.pow));ok(Math.abs(s-20*f)<=1,`carry: 20 × +1 near the top adds ${s} (expected ≈ ${(20*f).toFixed(1)})`)}
  /* (5) the funnels: her apply, an NPC ap, affAdd / oanAdd toward her, a raw spAdd — all slowed the same way (law 1) */
  const v=liveRivals(false)[0];S.rank=0;S.sung=S.ceilT=0;S.sung=10;apply({sung:30});ok(S.sung<=10+B.band.sung[2],`apply Sủng +30 at 10 → ${S.sung}`);
  v.rank=0;v.sung=10;delete v.spc;ap(v,{sung:30});ok(v.sung<=10+B.band.sung[2],`NPC ap Sủng +30 at 10 → ${v.sung} (same rule)`);
  v.rel=0;affAdd(v,S,40);ok(v.rel>0&&v.rel<=B.band.rel[2],`affAdd thiện cảm +40 toward her → ${v.rel}`);
  v.oan=0;oanAdd(v,S,48);ok(v.oan>0&&v.oan<=B.band.oan[2],`oanAdd oán +48 toward her → ${v.oan}`);
  v.rel=0;spAdd(v,"rel",25);ok(v.rel>0&&v.rel<=B.band.rel[2],`raw v.rel += 25 (spAdd) → ${v.rel}`);
  S.danh=B.ceil[0]+10;apply({danh:5});ok(S.danh===B.ceil[0]+10,`old save above the ceiling kept: Danh ${S.danh}`);
  /* (6) the cap ledger */
  {const q0=Q.slice();Q.length=0;S.evc=null;const z=evcZ();z.n={};let n=0;const card={ky:{pid:"kyngo",t:"Kỳ ngộ"},visit:{t:"Có người đến"},harm:{pid:"j70",t:"Mưu hại"},opt:{pid:"q72o",t:"Việc nhờ"}};
   for(const k of ["ky","ky","visit","visit","harm","opt","opt"])if(evcOK(k)){Q.push(Object.assign({},card[k]));n++}
   ok(n===Math.min(BAL.evc.cap,4),`cap: ${n} of 7 tries let through (cap ${BAL.evc.cap}, at most ${JSON.stringify(BAL.evc.q)} a kind)`);ok(evcOK("fest"),"a festival is never refused");
   {Q.length=0;S.evc=null;evcZ().n={};const z=evcZ();z.n={visit:1};const r=BAL.evc.res&&BAL.evc.res.harm||0;ok(r<1||(evcOK("ky")===(1+1+r<=BAL.evc.cap)&&evcOK("harm")),`a slot is kept for harm (res ${r}): after 1 visit Kỳ ngộ ${evcOK("ky")?"comes":"waits"}, harm still comes`);z.n={visit:1,ky:1};ok(r<1||(!evcOK("opt")&&evcOK("harm")),"2 shown + harm not yet come: a third optional card waits, harm still comes");z.n={}}
   ok(evcKind({pid:"kyngo"})==="ky"&&evcKind({pid:"j70"})==="harm"&&evcKind({t:"Có người tìm đến"})==="visit"&&evcKind({pid:"e68x"})==="opt","card tags → kind");
   Q.length=0;q0.forEach(m=>Q.push(m))}
  return R});
 let fail=0;for(const [g,m] of U){console.log((g?'ok   ':'FAIL ')+m);if(!g)fail++}
 /* (7) simulated days with the real bot: big events she was SHOWN per day (cards by source tag) never pass the cap */
 let src=fs.readFileSync(path.join(__dirname,'..','measure','inpage6.js'),'utf8');await p.evaluate(src);
 await p.evaluate(()=>{window.__bd=[];window.__cur={};window.__cd={};const seen=new WeakSet();const C=typeof evcKind==='function'?m=>evcKind(m)/* the game's own tag rule (jevc) */:m=>{/* LIVE (no jevc): the same tags */const t=String(m.t||'').replace(/<[^>]+>/g,''),pid=String(m.pid||'');
   if(pid==='j70'||/^(Mưu hại|Sau vụ mưu hại|Lời cảnh báo|Tai mắt báo tin)/.test(t))return'harm';if(pid==='kyngo')return'ky';if(/^(Có người đến|Có người tìm đến|Một ánh mắt)/.test(t)||/visit/.test(pid))return'visit';
   if(/^(e68|q72o|rgo?$|j71m)/.test(pid)||/^(Việc khó xử|Phụ tuyến|Lập công)/.test(t))return'opt';if(/^j71[ix]$/.test(pid))return'fest';return null};
  const sm=showModal;showModal=function(){const r0=sm.apply(this,arguments);/* count what is REALLY on screen after the game's own gates */try{const m=Q[0];if(m&&typeof m==='object'&&!seen.has(m)){seen.add(m);const k=C(m);if(k){/* the day she SEES it (wk() now), not the day endTurn started: morning cards of a new day are painted inside endTurn */const d=wk();if(!window.__cd[d])window.__cd[d]={c:{},f:!!(typeof festToday==='function'&&festToday())};window.__cur=window.__cd[d].c;window.__cur[k]=(window.__cur[k]||0)+1;(window.__cur._=window.__cur._||[]).push(k+':'+(m.pid||'')+':'+String(m.t||'').slice(0,30)+(m.must?':MUST':'')+(m.forced?':FORCED':'')+(m.kend?':END':'')+(m.cls==='end'?':CLS':''))}}}catch(e){}return r0};
  const et=endTurn;endTurn=function(){const k0=wk();const r=et.apply(this,arguments);if(wk()!==k0){const x=window.__cd[k0]||{c:{},f:false};window.__bd.push({d:k0,f:x.f,c:x.c});delete window.__cd[k0]}return r}});
 const t0=Date.now();while(true){const st=await p.evaluate(()=>{window.__bot.step('sens',120);return{n:window.__bd.length,dead:!!(S&&S.dead)}});if(st.dead||st.n>=ND||Date.now()-t0>500e3)break}
 const D=await p.evaluate(()=>({bd:window.__bd,cap:BAL.evc?BAL.evc.cap:3}));let worst=0,over=0,sum=0;const hist={};
 for(const x of D.bd){const n=Object.entries(x.c).reduce((a,[k,v])=>a+(k==='fest'||k==='_'?0:v),0)+(x.f?1:0);worst=Math.max(worst,n);sum+=n;hist[n]=(hist[n]||0)+1;if(n>D.cap){over++;console.log('     day',x.d,JSON.stringify(x.c),x.f?'(festival)':'')}}
 const g=over===0&&D.bd.length>=Math.min(ND,20);console.log((g?'ok   ':'FAIL ')+`simulated ${D.bd.length} days: most big events shown in one day ${worst} (cap ${D.cap}), days over the cap ${over}; mean ${(sum/Math.max(1,D.bd.length)).toFixed(2)} a day; days by count ${JSON.stringify(hist)}`);if(!g)fail++;
 if(errs.length){console.log('FAIL page errors: '+errs.slice(0,3).join(' | '));fail++}
 console.log(fail?`FAIL ${fail}`:'PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
