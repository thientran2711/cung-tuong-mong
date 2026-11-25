/* TEMPER-EQUAL MEASURE (law 2 equal value + law 3 gain-and-loss; OD 25/11 ~05:45Z (1) + ~08:05Z; temper-design (b); the reviewer re-runs this).
   In ONE unit (bạc), with BAL.pm.val, for every reaction a consort's forced outburst can offer (jemoact eaOpts → eaPx):
   (a) every row of the R_ table (who c) + every jfeel act: net = Σloss − Σgain must lie within BAL.pm.eqTol of BAL.ea.pick.net, at the reference
       palace (BAL.ea.pick.refN staff) AND in the live start palace;
   (b) law 3: every option has a gain — the vent (BAL.ea.pick.vent, the same for all) on a bad feeling, or a stat gain (G) on a good one;
   (c) every temper (hot / even / timid × gen / stingy / sus / pious) × feeling (BAL.feel.act.main keys + the 5 jemoact groups) cell: the number of
       options shown (≤ BAL.ea.pick.n), and the spread (max − min net) of the cell ≤ 2·eqTol; a cell with fewer than 3 options is listed (WARN, not FAIL:
       it depends on her palace — no maid, no rival — and shows what she can do).
   usage: node dev/measure/temper-equal.js [dev/index.html] → table + exit 1 when (a) or (b) fails */
const path=require('path');const HTML=process.argv[2]||'dev/index.html';
(async()=>{const {chromium}=require('playwright');const b=await chromium.launch();const p=await b.newPage();await p.route(/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/,r=>r.abort());
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;
  const pk=BAL.ea.pick,tol=BAL.pm.eqTol,R=window.EA_REACT.filter(x=>x.who==="c");const good=k=>(BAL.feel.sg[k]||0)>0;
  const GOODG={vui:1};const rows=[];const seen={};
  for(const x of R){if(seen[x.k])continue;seen[x.k]=1;const live=eaPx(S,x);const ref=eaPx(null,x);
   const feelG=String(x.g).replace(/^f-/,"");const isGood=GOODG[feelG]||good(feelG);
   const gainOk=isGood?ref.G.length>0:true;/* on a bad feeling the vent itself is the gain (owner ~05:45Z: "được đó chính là giải tỏa tâm trạng") */
   rows.push({k:x.k,n:x.n,g:x.g,netRef:ref.net,netLive:live.net,G:ref.G.map(y=>y[0]+" "+y[1]).join(", "),L:ref.L.map(y=>y[0]+" "+(y[1]||y[4]+"%")).join(", "),
    ok:Math.abs(ref.net-pk.net)<=tol&&Math.abs(live.net-pk.net)<=tol,gainOk})}
  const Ts=[];for(const k of ["hot","even","timid"])for(const f of [{},{gen:true},{stingy:true},{sus:true},{pious:true}])Ts.push(Object.assign({k,tr:[]},f));
  const F=Object.keys(BAL.feel.act.main).map(k=>["f",k]).concat(["gian","buon","so","ghen","vui"].map(g=>["g",g]));const cells=[];
  for(const T of Ts)for(const [m,k] of F){const O=m==="f"?eaOpts(S,k,null,T):eaOpts(S,null,k,T);const nets=O.map(o=>eaPx(S,o).net);
   cells.push({T:T.k+(T.gen?"+gen":T.stingy?"+stingy":T.sus?"+sus":T.pious?"+pious":""),f:k,n:O.length,opts:O.map(o=>o.n).join(" | "),spread:nets.length?+(Math.max(...nets)-Math.min(...nets)).toFixed(1):0})}
  return{tol,net:pk.net,vent:pk.vent,n:pk.n,rows,cells}});
 let bad=0;console.log(`TEMPER-EQUAL  target net ${r.net} bạc ± ${r.tol} · vent ${r.vent} for every option · ≤ ${r.n} options`);
 console.log('\n(a)+(b) every consort reaction (ref palace / live start palace):');console.log('k        | net ref | net live | gain | name — G / L');
 for(const x of r.rows){const f=x.ok&&x.gainOk;if(!f)bad++;console.log(`${(f?'OK  ':'FAIL')} ${x.k.padEnd(8)} | ${String(x.netRef).padStart(6)} | ${String(x.netLive).padStart(7)} | ${x.gainOk?'yes ':'NO  '} | ${x.n} — G: ${x.G||'(vent)'} / L: ${x.L||'-'}`)}
 console.log('\n(c) cells temper × feeling: n options · spread · options');let warn=0,sp=0;
 for(const c of r.cells){const w=c.n<3;if(w)warn++;const sb=c.spread>2*r.tol;if(sb){sp++;bad++}console.log(`${w?'WARN':sb?'FAIL':'ok  '} ${c.T.padEnd(12)} ${c.f.padEnd(10)} n=${c.n} spread=${c.spread}  ${c.opts}`)}
 console.log(`\nSUMMARY rows ${r.rows.length} (fail ${r.rows.filter(x=>!(x.ok&&x.gainOk)).length}) · cells ${r.cells.length} (under 3 options: ${warn}, spread fail ${sp}) · page errors ${errs.length}${errs.length?' '+errs[0]:''}`);
 await b.close();process.exit(bad||errs.length?1:0)})();
