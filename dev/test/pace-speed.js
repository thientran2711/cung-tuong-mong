/* pace-speed (owner OD 26/11 ~19:10Z rulings (A)+(D); MAIN 164 rulings 22:25Z; owner 21:20Z rare Emperor natural death; owner 23:00Z monthly proportional rescale per rank group, Danh · Đức · Sủng):
   unit checks on the built page — BAL.promo.gap read by promoGap, the Hoàng hậu block easing (qBlockAt), the Emperor's own lifespan curve. (Bar-tied stat ceilings: dev/test/stat-pace.js.)
   usage: node dev/test/pace-speed.js <index.html> → ok / FAIL lines, last line PASS / FAIL n; exit 1 on FAIL */
const {chromium}=require('playwright');const path=require('path');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto('file://'+path.resolve(process.argv[2]),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const R=[];const ok=(c,m)=>R.push([!!c,m]);try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;
  for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0;
  /* gap */
  const G=BAL.promo.gap;ok(Array.isArray(G)&&[0,1,2,3,4,5,6].every(r=>promoGap(r)===G[r]),`promoGap reads BAL.promo.gap ${G}`);
  ok(G[0]<=G[2]&&G.slice(2,7).every((x,i,a)=>i===0||x>a[i-1]),"gap: shortest at the seat-free low ranks, rising with rank from Quý nhân (law 5)");
  /* qBlock easing */
  const B=BAL.qBlock;S.lastPromo=S.turn;ok(qBlockAt(S)===BAL.qBlockHh,`qBlock bar right after a decree = BAL.qBlockHh ${BAL.qBlockHh}`);
  S.lastPromo=S.turn-B.after;ok(qBlockAt(S)===BAL.qBlockHh,`after ${B.after} months still ${BAL.qBlockHh}`);
  S.lastPromo=S.turn-B.after-4;ok(qBlockAt(S)===BAL.qBlockHh-4*B.ease,`4 months later eased by ${4*B.ease} → ${qBlockAt(S)}`);
  {const v=liveRivals(false)[0];if(v){v.lastPromo=S.turn-B.after-2;ok(qBlockAt(v)===BAL.qBlockHh-2*B.ease,"same easing for an NPC (law 1)")}}
  /* proportional rescale per rank group (owner 26/11 ~23:00Z) */
  {const C=BAL.stp.scale;const r=S.rank|0;let same=liveRivals(false).filter(v=>!v.out&&rkOf(v)===r);if(!same.length){const v=liveRivals(false)[0];v.rank=r;same=[v]}
   const T=spScaleT("duc",r);const others=liveRivals(true).filter(v=>!v.out&&rkOf(v)===r);for(const v of others)v.duc=10;same[0].duc=100;S.duc=30;
   const t=spScaleMonth();const f=T/100;ok(same[0].duc===Math.round(100*f)&&S.duc===Math.round(30*f),`group leader 100 → ${same[0].duc}, her 30 → ${S.duc} (T ${T.toFixed(1)}, ratio kept)`);
   ok(/xếp lại thứ bậc/.test(t),`one news line: «${t.trim()}»`);
   for(const v of others)v.duc=10;same[0].duc=Math.floor(T)-1;S.duc=20;const k0=S.duc;spScaleMonth();ok(S.duc===k0,"highest under T → nothing moves");
   for(let rr=0;rr<7;rr++)ok(spScaleT("sung",rr)>=RANKS[rr+1].s&&spScaleT("danh",rr)>=RANKS[rr+1].d,`rank ${rr}: T Sủng ${spScaleT("sung",rr).toFixed(1)} / Danh ${spScaleT("danh",rr).toFixed(1)} ≥ next bar ${RANKS[rr+1].s} / ${RANKS[rr+1].d}`);
   ok(C.keys.join()==="danh,duc,sung","three stats rescale: Danh · Đức · Sủng (not Sắc / Tài / Tâm cơ)");
   ok([0,1,2,3,4,5,6,7].every(rr=>spScaleT("duc",rr)>=BAL.stp.floor.duc),`Đức T never under its highest gate ${BAL.stp.floor.duc}`);
   S.sac=100;for(const v of others)v.sac=100;spScaleMonth();ok(S.sac===100,"Sắc never rescales");
   S.duc=99;same[0].duc=50;C.on=0;spScaleMonth();ok(S.duc===99,"switch off → nothing");C.on=1}
  /* Emperor curve */
  const D=BAL.mort.life.dice;ok(D.emp&&typeof D.emp==="object"&&D.emp.mean>D.adult.mean&&D.emp.sd>=D.adult.sd,`Emperor natural death rare + wide: ${JSON.stringify(D.emp)} (adult ${JSON.stringify(D.adult)})`);
  return R});
 for(const [c,m] of R)console.log((c?'ok   ':'FAIL ')+m);if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 const f=R.filter(x=>!x[0]).length;console.log(f?`FAIL ${f}`:'PASS');await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
