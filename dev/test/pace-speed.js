/* pace-speed (owner OD 26/11 ~19:10Z rulings (A)+(D); MAIN 164 rulings 22:25Z; owner 21:20Z rare Emperor natural death; sếp FINAL 23:24Z Sắc · Tài · Tâm cơ through the stat-pace slowdown):
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
  /* Sắc · Tài · Tâm cơ through the stat-pace slowdown (sếp FINAL 26/11 ~23:24Z) */
  {const A=BAL.stp.abs;for(const k of ["sac","tai","tamco"]){ok(A[k]&&SP_K[k],`${k} is paced (pow ${A[k]&&A[k].pow}, min ${A[k]&&A[k].min})`);
    ok(spG(k,{},50,30,0)<=BAL.stp.band[k][2],`${k}: one change never passes the big band (+30 → ${spG(k,{},50,30,0)})`);
    const lo=spG(k,{},20,5,0),hi=spG(k,{},85,5,0);ok(hi<lo&&hi>=1,`${k}: +5 at 20 → ${lo}, at 85 → ${hi} (slower near 100, never 0 forever)`);
    ok(spG(k,{},60,-7,0)===-7,`${k}: a fall untouched`);ok(spTop(k,0)===100&&spTop(k,7)===100,`${k}: no rank ceiling`)}
   const v=liveRivals(false)[0];v.tai=50;v.spc={};ap(v,{tai:30});ok(v.tai<=50+BAL.stp.band.tai[2],`same rule for an NPC (Tài 50 +30 → ${v.tai})`)}
  /* proportional adjustment at each promotion (owner 26/11 ~23:35Z) */
  {const C=BAL.stp.scale;ok(C&&C.keys.join()==="danh,duc,sung"&&C.pal.join()==="sac,tai,tamco"&&C.tq===85,"scale: Danh·Đức·Sủng per new rank group, Sắc·Tài·Tâm cơ palace-wide (T 85)");
   ok(typeof spScaleMonth==="undefined","no monthly rescale (dropped 23:24Z)");
   const L=consorts().filter(p=>!p.out&&p.alive!==false);for(const v of L)v.tai=40;const w=L.find(p=>p!==S);w.tai=100;S.tai=50;
   const r0=S.rank;S.lastPromo=-99;const t=exDirectUp(S,"thử");ok(S.rank===r0+1||r0>=6,`exDirectUp promoted her (${r0} → ${S.rank})`);
   if(S.rank===r0+1){ok(w.tai===85&&S.tai===Math.round(50*85/100),`on promotion Tài palace-wide: leader 100 → ${w.tai}, her 50 → ${S.tai}`);ok(/xếp lại/.test(t),`line on the promotion result: «${String(t).trim().slice(0,90)}»`)}
   for(const v of L)v.tai=40;S.tai=60;spScaleAt(S);ok(S.tai===60,"top under T → nothing");
   {for(const v of L)v.tai=40;w.tai=100;S.spRk0=S.rank;S.rank++;render();ok(w.tai===85,`watcher: a rank-up by any road adjusts too (leader Tài 100 → ${w.tai})`)}
const r=S.rank|0,grp=L.filter(p=>(p===S?(S.rank|0):rkOf(p))===r);for(const v of grp)v.duc=50;S.duc=100;spScaleAt(S);
   const T=spScaleT("duc",r);ok(S.duc===Math.round(T)&&grp.every(p=>p===S||p.duc===Math.round(50*T/100)),`Đức in the new rank group: top 100 → ${S.duc} (T ${T.toFixed(1)}), others 50 → ${Math.round(50*T/100)}`)}
  /* Emperor curve */
  const D=BAL.mort.life.dice;ok(D.emp&&typeof D.emp==="object"&&D.emp.mean>D.adult.mean&&D.emp.sd>=D.adult.sd,`Emperor natural death rare + wide: ${JSON.stringify(D.emp)} (adult ${JSON.stringify(D.adult)})`);
  return R});
 for(const [c,m] of R)console.log((c?'ok   ':'FAIL ')+m);if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 const f=R.filter(x=>!x[0]).length;console.log(f?`FAIL ${f}`:'PASS');await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
