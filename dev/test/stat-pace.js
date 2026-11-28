/* stat-pace (owner OD 26/11 ~01:25Z event pile-up + ~04:20Z «1 năm đã full 100»): unit checks of the ONE rise rule (jstatpace spG / spAdd,
   BAL.stp) and the daily big-event cap (jevc, BAL.evc), on the built page, then simulated bot days (inpage6 «sens» bot) that must never show
   her more big events in one day than BAL.evc.cap (a fixed-date festival day may add its festival).
   usage: node dev/test/stat-pace.js <index.html> [days=45] → ok / FAIL lines, last line PASS / FAIL n; exit 1 on FAIL */
const {chromium}=require('./lib/dlgs-off').pw('off');/* checks cards / screens: side-line dialogue scenes off (lib/dlgs-off.js) */const path=require('path');const fs=require('fs');
const [,,PAGE,DAYS]=process.argv;const ND=+DAYS||45;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});
 await ctx.addInitScript(`(function(){let s=4242;Math.random=function(){s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^(t>>>15),t|1);t^=t+Math.imul(t^(t>>>7),t|61);return((t^(t>>>14))>>>0)/4294967296}})();window.MutationObserver=class{observe(){}disconnect(){}takeRecords(){return[]}};`);
 const p=await ctx.newPage();p.setDefaultTimeout(600000);await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(PAGE),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0});
 const U=await p.evaluate(()=>{const R=[];const ok=(c,m)=>R.push([!!c,m]);const B=BAL.stp;
  ok(typeof spG==="function"&&typeof spAdd==="function"&&typeof evcOK==="function","rule + cap loaded");if(typeof spG!=="function")return R;
  /* (1) size band: one change never passes «big»; a fall untouched */
  const h={};ok(spG("rel",h,0,34,7)<=B.band.rel[2],`kỳ ngộ thiện cảm +34 → ${spG("rel",{},0,34,7)} (big band ${B.band.rel[2]})`);
  ok(spG("sung",{},0,12,7)<=B.band.sung[2],`Sủng +12 → ${spG("sung",{},0,12,7)} (big ${B.band.sung[2]})`);
  ok(spG("danh",{},50,-9,0)===-9,"a fall is never touched");
  ok(spG("rel",{},0,-40,0)>=-B.band.rel[2]&&spG("rel",{},30,-20,0)===-20,`thiện cảm: dislike growing is paced (0 −40 → ${spG("rel",{},0,-40,0)}), a fall back toward 0 is not (30 −20 → ${spG("rel",{},30,-20,0)})`);
  ok(spG("danh",{},0,2,7)===2,"a small rise far from the ceiling is kept whole");
  /* (2) ceiling by rank; the road up never closes; above-ceiling values are kept (no rise, no drop) */
  for(let r=0;r<7;r++)ok(B.ceil[r]>RANKS[r+1].s&&B.ceil[r]>RANKS[r+1].d,`ceiling rank ${r} ${B.ceil[r]} > next rank needs Sủng ${RANKS[r+1].s} / Danh ${RANKS[r+1].d}`);
  ok(spG("th",{},spTop("th",0),5,0)===0&&spG("th",{},spTop("th",0)+20,5,0)===0,"thiện cảm: at / above the hard top (max of rank ceiling, floor) a rise adds nothing");
  /* ONE SOFT CEILING for the six (owner OD 26/11 ~23:55Z, CANON OVERWRITE of the hard stop): at / above the ceiling a rise goes on at the slow share, never 0 below 100 */
  for(const k of B.soft){const c=Math.min(spCeil(0,k),95);const q={};let s=0;for(let i=0;i<10;i++)s+=spG(k,q,c+1,5,0);ok(s>0&&s<=Math.ceil(10*5*(spAbs(k)?spAbs(k).min:B.dm.min)),`${k}: at / above its ceiling (or 95 for the 100-ceiling stats) ${c} a rise goes on at the slow share: 10 × +5 → ${s}`)}
  ok(spCeil(0,"duc")===Math.max(B.ceil[0],B.floor.duc),`Đức ceiling = rank ceiling, never below the hiền đức floor (${spCeil(0,"duc")})`);
  /* (2b) BIG review 1: every stat gate stays reachable at EVERY rank (full list: dev/measure/statpace-gates.py) */
  {const tc=Math.max(...Object.values(BAL.net.thClamp).map(x=>x[1]).filter(x=>x>3));
   const G=[["duc",BAL.route.anDuc,"Ẩn dật route.anDuc"],["duc",BAL.route.tuDuc,"xuất gia route.tuDuc"],["duc",BAL.route.guiltDuc,"route.guiltDuc"],["duc",BAL.ducLv.up,"Đức → Thái hậu ducLv.up"],["duc",BAL.ducLv.word[3],"hiền đức"],
    ["danh",BAL.danhG.kcVihanh,"Khách lạ ở chùa danhG.kcVihanh"],["danh",BAL.succN.rareCDanh,"succN.rareCDanh"],["sung",BAL.sinhThanSung,"sinh thần"],["sung",BAL.sungLv.emp[2],"sungLv.emp"],
    ["th",BAL.hhTh,"hhTh"],["th",BAL.road.ch_co.trust,"road ch_co trust"],["hh",BAL.ag.hh.rewardHh,"ag.hh.rewardHh"],["rel",tc,"net thClamp top"],["oan",tc,"net thClamp top"]];
   /* PACE-SPEED (owner OD 26/11 ~19:10Z (A)): a bar-tied stat (BAL.stp.bar: Sủng, Danh) stays near the NEXT rank's bar, so its high gates open
      as she climbs (law 5): such a gate must open at the top rank and, once open at a rank, stay open at every higher rank (never shut for good) */
   for(const [k,g,n] of G){const bad=[];for(let r=0;r<8;r++)if(spTop(k,r)<g)bad.push(r);
    if(B.bar&&B.bar[k]){const pre=bad.every((r,i)=>r===i);ok(g>0&&!bad.includes(7)&&pre,`gate ${n} ${k} ≥ ${g}: bar-tied, opens from rank ${bad.length}${pre?"":" — NOT a prefix: "+bad}`)}
    else ok(g>0&&!bad.length,`gate ${n} ${k} ≥ ${g}: reachable at every rank${bad.length?" — shut at "+bad:""}`)}}
  /* PACE-SPEED (A): bar-tied ceilings = the next rank's bar + margin; a long run of rises at a rank never passes ceiling + x */
  if(B.bar)for(const k in B.bar){const b=B.bar[k];for(let r=0;r<7;r++){const nx=RANKS[r+1][b.f],c=spCeil(r,k);ok(c===Math.min(b.top,nx+b.m)&&c>nx,`${k} rank ${r}: ceiling ${c} = next bar ${nx} + ${b.m}`);
    const q={};let v=0,n=0;while(v<c&&n<300){v+=spG(k,q,v,8,r);n++}const q2={};let w=0;for(let i=0;i<10;i++)w+=spG(k,q2,c,8,r);
    ok(v>=nx&&n<300&&w>0&&w<=10,`${k} rank ${r}: +8 rises reach the ceiling ${c} after ${n}; above it 10 × +8 add only ${w} (soft, bar ${nx})`)}}
  for(let r=1;r<8;r++)ok(B.ceil[r]>=B.ceil[r-1],`ceiling rises with rank (${B.ceil[r-1]} → ${B.ceil[r]})`);
  /* (3) diminishing returns: the same rise adds less near the top */
  const lo=spG("danh",{},5,5,2),hi=spG("danh",{},55,5,2);ok(hi<lo,`Danh +5 at 5 → ${lo}, at 55 → ${hi}`);
  /* (4) carry: 20 × +1 at 70 % of the ceiling adds about 20 × (1 − .49) */
  {const C3=spCeil(3,"duc");const q={};let s=0,c=Math.round(C3*.7);for(let i=0;i<20;i++)s+=spG("duc",q,c,1,3);const f=Math.max(B.dm.min,1-Math.pow(c/C3,B.dm.pow));ok(Math.abs(s-20*f)<=1,`carry: 20 × +1 near the top adds ${s} (expected ≈ ${(20*f).toFixed(1)})`)}
  /* (5) the funnels: her apply, an NPC ap, affAdd / oanAdd toward her, a raw spAdd — all slowed the same way (law 1) */
  const v=liveRivals(false)[0];S.rank=0;S.sung=S.ceilT=0;S.sung=10;apply({sung:30});ok(S.sung<=10+B.band.sung[2],`apply Sủng +30 at 10 → ${S.sung}`);
  v.rank=0;v.sung=10;delete v.spc;ap(v,{sung:30});ok(v.sung<=10+B.band.sung[2],`NPC ap Sủng +30 at 10 → ${v.sung} (same rule)`);
  v.rel=0;affAdd(v,S,40);ok(v.rel>0&&v.rel<=B.band.rel[2],`affAdd thiện cảm +40 toward her → ${v.rel}`);
  v.oan=0;oanAdd(v,S,48);ok(v.oan>0&&v.oan<=B.band.oan[2],`oanAdd oán +48 toward her → ${v.oan}`);
  v.rel=0;spAdd(v,"rel",25);ok(v.rel>0&&v.rel<=B.band.rel[2],`raw v.rel += 25 (spAdd) → ${v.rel}`);
  {S.rank=0;const c=spCeil(0,"danh");S.danh=c+20;delete S.spc;apply({danh:5});ok(S.danh>=c+20&&S.danh<=c+21,`old save above the ceiling kept, rises only at the slow share: Danh ${c+20} +5 → ${S.danh}`);S.danh=100;apply({danh:5});ok(S.danh===100,"100 stays 100")}
  /* (5b) BIG review 3: a regard ROW (co-op friend S.rl[pid], jts tsLeNpc) goes through the same rule */
  {S.rl=S.rl||{};S.rl.__t=0;spRow(S,"rl","__t",40,0);ok(S.rl.__t>0&&S.rl.__t<=B.band.rel[2],`spRow her row +40 → ${S.rl.__t}`);S.ro=S.ro||{};S.ro.__t=0;spRow(S,"ro","__t",40,0);ok(S.ro.__t>0&&S.ro.__t<=B.band.oan[2],`spRow oán row +40 → ${S.ro.__t}`);delete S.rl.__t;delete S.ro.__t}
  /* (6) the cap ledger */
  {const q0=Q.slice();Q.length=0;S.evc=null;const z=evcZ();z.n={};let n=0;const card={ky:{pid:"kyngo",t:"Kỳ ngộ"},visit:{t:"Có người đến"},harm:{pid:"j70",t:"Mưu hại"},opt:{pid:"q72o",t:"Việc nhờ"}};
   for(const k of ["ky","ky","visit","visit","harm","opt","opt"])if(evcOK(k)){Q.push(Object.assign({},card[k]));n++}
   ok(n===Math.min(BAL.evc.cap,4),`cap: ${n} of 7 tries let through (cap ${BAL.evc.cap}, at most ${JSON.stringify(BAL.evc.q)} a kind)`);ok(evcOK("fest"),"a festival is never refused");
   {Q.length=0;S.evc=null;evcZ().n={};const z=evcZ();z.n={visit:1};const r=BAL.evc.res&&BAL.evc.res.harm||0;ok(r<1||(evcOK("ky")===(1+1+r<=BAL.evc.cap)&&evcOK("harm")),`a slot is kept for harm (res ${r}): after 1 visit Kỳ ngộ ${evcOK("ky")?"comes":"waits"}, harm still comes`);z.n={visit:1,ky:1};ok(r<1||BAL.evc.cap<3||(!evcOK("opt")&&evcOK("harm")),"2 shown + harm not yet come: a third optional card waits, harm still comes");z.n={}}
   ok(evcKind({pid:"kyngo"})==="ky"&&evcKind({pid:"j70"})==="harm"&&evcKind({t:"Có người tìm đến"})==="visit"&&evcKind({pid:"e68x"})==="opt","card tags → kind");
   ok(evcKind({t:"Có người bán tin"})==="visit"&&evcKind({t:"Ngươi bắt gặp"})===null,"seller = visit; «Ngươi bắt gặp» exempt (what she sees where she stands)");
   /* BIG review 2: a deed aimed at her on a full day is put off (dropped from pend, never lands without her choice), no card */
   {Q.length=0;S.evc=null;const z=evcZ();z.n={visit:BAL.evc.q.visit,ky:1,opt:1};const az=agZ();const pp={k:"x",id:"v"+v.id,vid:v.id,t:"me",pl:"vuon",kh:0,act:"thăm"};az.pend.push(pp);
    let thrown=null;try{agScene(pp,v)}catch(e){thrown=e.message}ok(pp.drop===1&&az.pend.indexOf(pp)<0&&!Q.length&&!thrown,`full day: «Có người tìm đến» put off (drop ${pp.drop}, in pend ${az.pend.indexOf(pp)>=0}, cards ${Q.length}${thrown?", "+thrown:""})`);
    ok(knSellPick(S,{})===null,"full day: no seller comes to her");z.n={}}
   /* BIG review 6: a held card survives save + load */
   {EVCW.length=0;EVCW.push({m:{t:"Có người đến",h:"<p>thử</p>"},at:wk(),k:"visit"});const d=JSON.parse(JSON.stringify(ser()));EVCW.length=0;deser(d);ok(EVCW.length===1&&EVCW[0].k==="visit"&&/thử/.test(EVCW[0].m.h||""),`EVCW saved + loaded (${EVCW.length})`);EVCW.length=0}
   Q.length=0;q0.forEach(m=>Q.push(m))}
  return R});
 let fail=0;for(const [g,m] of U){console.log((g?'ok   ':'FAIL ')+m);if(!g)fail++}
 /* (7) simulated days with the real bot: big events she was SHOWN per day (cards by source tag) never pass the cap */
 let src=fs.readFileSync(path.join(__dirname,'..','measure','inpage6.js'),'utf8');await p.evaluate(src);
 await p.evaluate(()=>{window.__bd=[];window.__cur={};window.__cd={};const seen=new WeakMap();const C=typeof evcKind==='function'?m=>evcKind(m)/* the game's own tag rule (jevc) */:m=>{/* LIVE (no jevc): the same tags */const t=String(m.t||'').replace(/<[^>]+>/g,''),pid=String(m.pid||'');
   if(pid==='j70'||/^(Mưu hại|Sau vụ mưu hại|Lời cảnh báo|Tai mắt báo tin)/.test(t))return'harm';if(pid==='kyngo')return'ky';if(/^(Có người đến|Có người tìm đến|Một ánh mắt)/.test(t)||/visit/.test(pid))return'visit';
   if(/^(e68|q72o|rgo?$|j71m)/.test(pid)||/^(Việc khó xử|Phụ tuyến|Lập công)/.test(t))return'opt';if(/^j71[ix]$/.test(pid))return'fest';return null};
  const sm=showModal;showModal=function(){/* a card already counted today (the game's own day mark) and shown again is not a new event */const m0=Q[0],again=!!(m0&&typeof m0==='object'&&m0.evcN&&m0.evcN===wk()+1);const r0=sm.apply(this,arguments);if(again&&Q[0]===m0)return r0;/* count what is REALLY on screen after the game's own gates */try{const m=Q[0];if(m&&typeof m==='object'&&seen.get(m)!==wk()){seen.set(m,wk());const k=C(m);if(k){/* the day she SEES it (wk() now), not the day endTurn started: morning cards of a new day are painted inside endTurn */const d=wk();if(!window.__cd[d])window.__cd[d]={c:{},f:!!(typeof festToday==='function'&&festToday())};window.__cur=window.__cd[d].c;window.__cur[k]=(window.__cur[k]||0)+1;(window.__cur._=window.__cur._||[]).push(k+':'+(m.pid||'')+':'+String(m.t||'').slice(0,30)+(m.must?':MUST':'')+(m.forced?':FORCED':'')+(m.kend?':END':'')+(m.cls==='end'?':CLS':''))}}}catch(e){}return r0};
  const et=endTurn;endTurn=function(){const k0=wk();const r=et.apply(this,arguments);if(wk()!==k0){const x=window.__cd[k0]||{c:{},f:false};window.__bd.push({d:k0,f:x.f,c:x.c});delete window.__cd[k0]}return r}});
 const t0=Date.now();while(true){const st=await p.evaluate(()=>{window.__bot.step('sens',120);return{n:window.__bd.length,dead:!!(S&&S.dead)}});if(st.dead||st.n>=ND||Date.now()-t0>500e3)break}
 const D=await p.evaluate(()=>({bd:window.__bd,cap:BAL.evc?BAL.evc.cap:3}));let worst=0,over=0,sum=0;const hist={};
 for(const x of D.bd){const n=Object.entries(x.c).reduce((a,[k,v])=>a+(k==='fest'||k==='_'?0:v),0)+(x.f?1:0);worst=Math.max(worst,n);sum+=n;hist[n]=(hist[n]||0)+1;if(n>D.cap){over++;console.log('     day',x.d,JSON.stringify(x.c),x.f?'(festival)':'')}}
 const g=over===0&&D.bd.length>=Math.min(ND,20);console.log((g?'ok   ':'FAIL ')+`simulated ${D.bd.length} days: most big events shown in one day ${worst} (cap ${D.cap}), days over the cap ${over}; mean ${(sum/Math.max(1,D.bd.length)).toFixed(2)} a day; days by count ${JSON.stringify(hist)}`);if(!g)fail++;
 if(errs.length){console.log('FAIL page errors: '+errs.slice(0,3).join(' | '));fail++}
 console.log(fail?`FAIL ${fail}`:'PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
