/* pace-speed (owner OD 26/11 ~19:10Z rulings (A)+(D); MAIN 164 rulings 22:25Z; owner 22:40Z fixed exam rhythm; owner 21:20Z rare Emperor natural death):
   unit checks on the built page — BAL.promo.gap read by promoGap, the Hoàng hậu block easing (qBlockAt), the kỳ khảo hạch rhythm (exKy / exCanSit /
   the exam row text), the Emperor's own lifespan curve. (Bar-tied stat ceilings: dev/test/stat-pace.js.)
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
  /* rhythm */
  const E=BAL.ex;const ky=[];for(let t=0;t<12;t++)ky.push(exKy(S.turn+t));ok(ky.filter(Boolean).length===12/E.every,`kỳ khảo hạch ${12/E.every} months a year (every ${E.every})`);
  ok([0,1,2,3,4,5,6,7,8,9,10,11].every(i=>{const m=((S.month-1+i)%12);return exKy(S.turn+i)===(m%E.every===E.at%E.every)}),"kỳ months are fixed calendar months");
  const t0=S.turn,n=exKyNext();ok(exKy(n)&&n>=t0&&n-t0<E.every,`next kỳ in ${n-t0} months`);
  {const v=liveRivals(false).find(x=>rkOf(x)<6);if(v&&typeof exCanSit==="function"){const e=exS(v);const m0=S.month,tu=S.turn;
    const off=[0,1,2].find(i=>!exKy(S.turn+i)),on=[0,1,2].find(i=>exKy(S.turn+i));
    const el0=exElig;window.exElig=exElig=()=>true;e.pass=0;e.cd=0;e.grace=null;
    S.turn+=off;S.month=((m0-1+off)%12)+1;const a=exCanSit(v);S.turn=tu;S.month=m0;S.turn+=on;S.month=((m0-1+on)%12)+1;const c=exCanSit(v);S.turn=tu;S.month=m0;
    e.grace=e.to;S.turn+=off;S.month=((m0-1+off)%12)+1;const g=exCanSit(v);S.turn=tu;S.month=m0;e.grace=null;window.exElig=exElig=el0;
    ok(!a&&c,`an eligible NPC sits the regular exam only in a kỳ month (off ${a}, on ${c})`);ok(g,"a grace exam keeps its own timing")}}
  {const r=exRow(S);ok(/kỳ khảo hạch/.test(r[1])||/Đã đỗ|được thi|ân thi|chờ đến/.test(r[1]),`exam row names the kỳ: «${r[1]}»`)}
  /* Emperor curve */
  const D=BAL.mort.life.dice;ok(D.emp&&typeof D.emp==="object"&&D.emp.mean>D.adult.mean&&D.emp.sd>=D.adult.sd,`Emperor natural death rare + wide: ${JSON.stringify(D.emp)} (adult ${JSON.stringify(D.adult)})`);
  return R});
 for(const [c,m] of R)console.log((c?'ok   ':'FAIL ')+m);if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 const f=R.filter(x=>!x[0]).length;console.log(f?`FAIL ${f}`:'PASS');await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
