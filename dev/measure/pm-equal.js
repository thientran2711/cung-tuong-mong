/* PM EQUAL-VALUE MEASURE (law 2, jpma «Cùng chơi» / «Thách đấu»; FOREMAN E #13: the reviewer re-runs this).
   In ONE unit (bạc), with the exchange rates BAL.pm.val (danhBac, affBac, oanBac, sucBac), for every occasion rank R = 0..7:
   (a) the three stakes: Bạc V · the items each side would put up (pmItem, real saves) · Danh d·danhBac — each within BAL.pm.eqTol of V;
   (b) the answers of the receiver of a duel at a fair game (q = ½): Nhận lời (2q−1)·V · Nhường −V + yieldAff·affBac + yieldOan·oanBac ·
       Từ chối −(fail + up)·affBac — the spread (max − min) ≤ eqTol; peer asker (no Nhường, up = 0) the same;
   (c) the answers of a pastime: Nhận lời E[aff]·affBac − suc·sucBac · Từ chối −fail·affBac — spread ≤ eqTol.
   (d) ROUND C: a ladder challenge for her place (one place = mean(BAL.pm.lad.top) Danh a month in bạc) — the three answers within eqTol;
   (e) ROUND C: watchers (BAL.pm.eye) move the accept answer by less than eqTol in expectation.
   usage: node dev/measure/pm-equal.js [dev/index.html]  → table + exit 1 when a row is out of tolerance */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const P=BAL.pm,Vv=P.val,F=BAL.ag.cx2.help.fail,tol=P.eqTol;const rows=[];const items=[];for(const v of liveRivals(true).filter(x=>x!==S))for(const R of [0,3,7]){const V=P.stake.bac[R];const e=pmItem(v,V);if(e)items.push(Math.abs(ilVal(e)-V))}
  for(let R=0;R<8;R++){const V=P.stake.bac[R],d=Math.max(1,Math.round(V/Vv.danhBac));const ya=Math.max(1,Math.round(V*P.duel.yieldK/Vv.affBac));
   const acc=0,yl=-V+ya*Vv.affBac+P.duel.yieldOan*Vv.oanBac,noUp=-(F+P.refuse.up)*Vv.affBac,noPeer=-F*Vv.affBac;
   const sup=[acc,yl,noUp],peer=[acc,noPeer];const sp=a=>Math.max(...a)-Math.min(...a);
   rows.push({R,V,danhV:d*Vv.danhBac,stakeOk:Math.abs(d*Vv.danhBac-V)<=tol,acc,yield:yl,refuseSup:noUp,refusePeer:noPeer,spreadSup:sp(sup),spreadPeer:sp(peer),ok:sp(sup)<=tol&&sp(peer)<=tol&&Math.abs(d*Vv.danhBac-V)<=tol})}
  const A=P.play.aff,cut=P.play.cut;/* E[aff] over the mean raw of two plays ~ the BAL.mgTier word bands: equal weight of the three tiers (measured bound) */const Eaff=(A[0]+A[1]+A[2])/3;
  const pa=Eaff*Vv.affBac-P.play.suc*Vv.sucBac,pr=-F*Vv.affBac;const play={accept:+pa.toFixed(1),refuse:pr,spread:+(pa-pr).toFixed(1),ok:Math.abs(pa-pr)<=tol};
  /* (d) ROUND C ladder: the receiver is challenged FOR HER PLACE from below (fair game q = ½); one place = Pv = mean(BAL.pm.lad.top) Danh a month · danhBac.
     Nhận lời: (2q−1)·V − (1−q)·Pv · Nhường: yield − Pv + the superior's extra favour round(Pv/affBac)·affBac (she goes below the asker) · Từ chối: refuse − refuseDrop·Pv */
  const Pv=P.lad.top.reduce((t,x)=>t+x,0)/P.lad.top.length*Vv.danhBac;const lad=[];
  for(const x of rows){const yA=Math.round(Pv/Vv.affBac)*Vv.affBac;/* the yielded place's extra favour (pmYieldAff) */const L=[-.5*Pv,x.yield-Pv+yA,x.refuseSup-P.lad.refuseDrop*Pv],Lp=[-.5*Pv,x.refusePeer-P.lad.refuseDrop*Pv];const sp=a=>Math.max(...a)-Math.min(...a);
   lad.push({R:x.R,acc:-.5*Pv,yield:x.yield-Pv+yA,refSup:L[2],refPeer:Lp[1],spread:Math.max(sp(L),sp(Lp)),ok:Math.max(sp(L),sp(Lp))<=tol})}
  /* (e) ROUND C onlookers at q = ½ with the most watchers BAL.pm.eye.max, half liking the winner, half resenting: Danh ± cancels in expectation;
     respect (kinh·affBac) vs envy (oan·oanBac) of the win — the accept answer moves by E, which must stay within tol */
  const nW=P.eye.max,dW=Math.min(P.eye.danhMax,P.eye.danh*nW),eyeE=.5*(nW/2*P.eye.kinh*Vv.affBac-nW/2*P.eye.oan*Vv.oanBac)+.5*dW*Vv.danhBac-.5*dW*Vv.danhBac;
  const eye={E:+eyeE.toFixed(1),ok:Math.abs(eyeE)<=tol};
  return{tol,rows,play,lad,eye,Pv,itemDevMax:items.length?Math.max(...items):null,itemN:items.length,itemBand:Math.max(...P.stake.bac)*P.stake.band}});
 console.log('PM EQUAL VALUE (bạc units, tol '+r.tol+')');console.log('R  V   Danh→bạc  accept  yield  refuse(sup)  refuse(peer)  spread sup/peer  ok');
 for(const x of r.rows)console.log(`${x.R}  ${String(x.V).padEnd(3)} ${String(x.danhV).padEnd(9)} ${String(x.acc).padEnd(7)} ${String(x.yield).padEnd(6)} ${String(x.refuseSup).padEnd(12)} ${String(x.refusePeer).padEnd(13)} ${x.spreadSup}/${x.spreadPeer}${' '.repeat(12)}${x.ok?'ok':'OUT'}`);
 console.log('pastime: accept',r.play.accept,'refuse',r.play.refuse,'spread',r.play.spread,r.play.ok?'ok':'OUT');
 console.log('item stakes: '+r.itemN+' real items picked, max |price − V| = '+r.itemDevMax+' (band V·'+'±band)');
 console.log('ROUND C ladder challenge (one place = '+r.Pv+' bạc): R  accept  yield  refuse(sup)  refuse(peer)  spread  ok');for(const x of r.lad)console.log(`  ${x.R}  ${x.acc}  ${x.yield}  ${x.refSup}  ${x.refPeer}  ${x.spread}  ${x.ok?'ok':'OUT'}`);
 console.log('ROUND C onlookers: the accept answer moves by',r.eye.E,r.eye.ok?'ok':'OUT');
 const bad=r.lad.filter(x=>!x.ok).length+(r.eye.ok?0:1)+r.rows.filter(x=>!x.ok).length+(r.play.ok?0:1)+(r.itemDevMax!=null&&r.itemDevMax>r.tol?1:0);await b.close();console.log(bad?`OUT ${bad}`:'ALL WITHIN TOLERANCE');process.exit(bad?1:0)})();
