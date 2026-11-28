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
  const B=BAL.qBlock;S.lastPromo=S.turn;ok(qBlockAt(S)===netThK(hhHolder(),"ghet","deep"),`qBlock bar right after a decree = netThK(hhHolder(),"ghet","deep") ${netThK(hhHolder(),"ghet","deep")}`);
  S.lastPromo=S.turn-B.after;ok(qBlockAt(S)===netThK(hhHolder(),"ghet","deep"),`after ${B.after} months still ${netThK(hhHolder(),"ghet","deep")}`);
  S.lastPromo=S.turn-B.after-4;ok(qBlockAt(S)===netThK(hhHolder(),"ghet","deep")-4*B.ease,`4 months later eased by ${4*B.ease} → ${qBlockAt(S)}`);
  {const v=liveRivals(false)[0];if(v){v.lastPromo=S.turn-B.after-2;ok(qBlockAt(v)===netThK(hhHolder(),"ghet","deep")-2*B.ease,"same easing for an NPC (law 1)")}}
  /* Sắc · Tài · Tâm cơ through the stat-pace slowdown (sếp FINAL 26/11 ~23:24Z) */
  {const A=BAL.stp.abs;for(const k of ["sac","tai","tamco"]){ok(A[k]&&SP_K[k],`${k} is paced (pow ${A[k]&&A[k].pow}, min ${A[k]&&A[k].min})`);
    ok(spG(k,{},50,30,0)<=BAL.stp.band[k][2],`${k}: one change never passes the big band (+30 → ${spG(k,{},50,30,0)})`);
    const lo=spG(k,{},20,5,0),hq={};let hi=0;for(let i=0;i<4;i++)hi+=spG(k,hq,85,5,0);hi=hi/4;/* 4 rises with the carry (Tâm cơ abs.k .5: one +5 at 85 adds a fraction) */ok(hi<lo&&hi>0,`${k}: +5 at 20 → ${lo}, at 85 → ${hi} a rise on average (slower near 100, never 0 forever)`);
    ok(spG(k,{},60,-7,0)===-7,`${k}: a fall untouched`);ok(spTop(k,0)===100&&spTop(k,7)===100,`${k}: no rank ceiling`)}
   const v=liveRivals(false)[0];v.tai=50;v.spc={};ap(v,{tai:30});ok(v.tai<=50+BAL.stp.band.tai[2],`same rule for an NPC (Tài 50 +30 → ${v.tai})`)}
  /* owner 26/11 ~23:55Z (confirmed): the promotion adjustment is GONE; ONE soft ceiling for the six; Sủng neglect fade + Sắc age fade */
  ok(typeof spScaleAt==="undefined"&&!BAL.stp.scale,"no promotion adjustment (dropped 23:55Z)");ok(typeof spScaleMonth==="undefined","no monthly rescale");
  {ok(["sung","danh","duc","sac","tai","tamco"].every(k=>spSoft(k)&&spTop(k,0)===100&&spTop(k,7)===100),"soft ceiling: the six never hard-stop below 100");
   const c=spCeil(3,"sung");ok(c===RANKS[4].s+BAL.stp.bar.sung.m,`Sủng ceiling at Tần = next bar ${RANKS[4].s} + ${BAL.stp.bar.sung.m} = ${c}`);
   /* the curve itself = the approved example (OD 23:55Z: ceiling 58, +8 → +7 at 30, +4 at 45, +1 at 55+; Sắc +6/+3/+1.5/+1); a raw +8 is first cut by
      the size band (BAL.stp.band, over) like every change, so the band is opened here to check the curve alone */
   const B0=JSON.stringify(BAL.stp.band);for(const k of ["sung","sac"])BAL.stp.band[k]=[8,8,8];
   const g=v=>spG("sung",{},v,8,3,0,1);const a=g(30),m=g(45),z=g(c-3),y=g(c+10);
   ok(a===7&&m>=4&&m<=5&&z>=1&&z<=2&&y===1,`Sủng ceiling ${c}, +8 event → +${a} at 30, +${m} at 45, +${z} at ${c-3}, +${y} at ${c+10} (still rises above the ceiling)`);
   const s=v=>spG("sac",{},v,8,0,0,1);ok(s(50)===6&&s(80)===3&&s(95)===1,`Sắc +8 → +${s(50)} at 50, +${s(80)} at 80, +${s(90)} at 90, +${s(95)} at 95`);
   BAL.stp.band=JSON.parse(B0);ok(spG("sung",{},30,8,2,0,1)<=Math.ceil(BAL.stp.band.sung[2]),`a raw +8 is still cut by the size band first (Sủng at 30 → +${spG("sung",{},30,8,2,0,1)})`);
   ok(spCeil(0,"duc")===BAL.stp.floor.duc&&spCeil(7,"duc")>=BAL.stp.floor.duc,`Đức ceiling never below the hiền đức floor ${BAL.stp.floor.duc} (Đáp ứng ${spCeil(0,"duc")}, Hoàng hậu ${spCeil(7,"duc")})`);
   ok(spG("duc",{},90,8,0,0,1)>=1,"Đức above its ceiling still rises (slow share)")}
  {const F=BAL.fade.sung;S.rank=Math.min(S.rank,5);S.out=0;S.sung=60;S.ngM=0;S.nightLog=[];S.empSeenW=null;const got=[];
   for(let i=0;i<6;i++){const w0=S.turn*3;const a=S.sung;spFadeMonth(w0,S.year);got.push(a-S.sung)}
   ok(got.join()===[2,3,4,5,5,5].map((x,i)=>Math.min(F.max,F.first+i*F.step)).join(),`Sủng neglect fade by month: −${got.join(", −")}`);
   const r0=S.rank;S.nightLog.push(S.turn*3);const a=S.sung;spFadeMonth(S.turn*3,S.year);ok(S.sung===a&&S.ngM===0&&S.rank===r0,"seen by Hoàng thượng → no fade, run reset, no demotion");
   const v=liveRivals(false).find(x=>rkOf(x)<7&&!x.out);if(v){v.sung=50;v.ngM=0;v.nightLog=[];v.empSeenW=null;spFadeMonth(S.turn*3,S.year);ok(v.sung===50-F.first,`same for an NPC (law 1): Sủng 50 → ${v.sung}`)}
   ok(BAL.fade.sung.wk===0,"the old weekly −1 is off (replaced by the neglect fade)")}
  {const A=BAL.fade.sac;S.age=A.from+2;S.sac=70;spFadeMonth(S.turn*3,S.year-1);ok(S.sac===70-A.per,`Sắc fades with age: age ${S.age}, a new year → Sắc 70 → ${S.sac}`);
   S.age=A.from-3;S.sac=70;spFadeMonth(S.turn*3,S.year-1);ok(S.sac===70,`no Sắc fade before ${A.from}`);
   S.tai=60;S.tamco=60;S.danh=40;S.duc=60;spFadeMonth(S.turn*3,S.year-1);ok(S.tai===60&&S.tamco===60&&S.danh===40&&S.duc===60,"Danh · Đức · Tài · Tâm cơ never fade by themselves")}
  ok(/càng cao càng khó lên/.test(kitGlossText("Sủng"))&&/Sắc phai theo tuổi/.test(kitGlossText("Tâm cơ")),"the one-line rule shows in the kit glossary of the six stats");
  /* Emperor curve */
  const D=BAL.mort.life.dice;ok(D.emp&&typeof D.emp==="object"&&D.emp.mean>D.adult.mean&&D.emp.sd>=D.adult.sd,`Emperor natural death rare + wide: ${JSON.stringify(D.emp)} (adult ${JSON.stringify(D.adult)})`);
  return R});
 for(const [c,m] of R)console.log((c?'ok   ':'FAIL ')+m);if(errs.length)console.log('page errors: '+errs.slice(0,3).join(' | '));
 const f=R.filter(x=>!x[0]).length;console.log(f?`FAIL ${f}`:'PASS');await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
