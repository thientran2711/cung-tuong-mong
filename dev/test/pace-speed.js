/* pace-speed (owner OD 26/11 ~19:10Z rulings (A)+(D); MAIN 164 rulings 22:25Z; owner 21:20Z rare Emperor natural death):
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
  /* drift to the rank mean (owner 26/11 ~23:00Z) */
  {const M=BAL.stp.mean;const P=consorts().filter(p=>!p.out&&p.alive!==false);const r=S.rank|0;const same=P.filter(p=>p!==S&&rkOf(p)===r);
   if(!same.length){const v=liveRivals(false)[0];v.rank=r;same.push(v)}
   for(const v of same){v.danh=20;v.spc={}}S.danh=4;S.spc={};const m=[S].concat(same).reduce((a,p)=>a+p.danh,0)/(same.length+1);const s0=S.danh;
   const t=spMeanMonth();const exp=(m-s0)*M.k;ok(Math.abs((S.danh-s0)-Math.min(exp,spTop("danh",r)-s0))<=1,`her Danh ${s0} → ${S.danh} toward the rank mean ${m.toFixed(1)} (k ${M.k})`);
   ok(/so với các/.test(t),`one news line: «${t.trim()}»`);
   const v=same[0];ok(v.danh<20,`an NPC above the mean moves down too (20 → ${v.danh})`);
   const keep=S.danh;M.on=0;spMeanMonth();ok(S.danh===keep,"switch off → no drift");M.on=1}
  /* Emperor curve */
  const D=BAL.mort.life.dice;ok(D.emp&&typeof D.emp==="object"&&D.emp.mean>D.adult.mean&&D.emp.sd>=D.adult.sd,`Emperor natural death rare + wide: ${JSON.stringify(D.emp)} (adult ${JSON.stringify(D.adult)})`);
  return R});
 for(const [c,m] of R)console.log((c?'ok   ':'FAIL ')+m);if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 const f=R.filter(x=>!x[0]).length;console.log(f?`FAIL ${f}`:'PASS');await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
