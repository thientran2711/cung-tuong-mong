/* review/home-chapters: static law scan of every home arc (KCA) in the built game.
   law 3 gain-and-loss: every option shows a gain (w / wx / sc / an ending with a k ≥ 0) AND a cost or loss (c / l / lx / a failing ending);
   law 2 equal value (proxy): no beat has an option that is sure AND has no cost while another option of the same beat pays;
   endings: win / mid / lose exist, every seed names a real palace arc (ARC67) of this origin; every number comes through BAL.kc3.fx (fx entry per beat).
   usage: node dev/test/home-chapters/laws.js <url> */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();const p=await b.newPage();await p.goto(process.argv[2],{waitUntil:'domcontentloaded'});await new Promise(r=>setTimeout(r,4000));
 const r=await p.evaluate(()=>{const F=[],T=[];const has=o=>o&&Object.keys(o).some(k=>o[k]);
  for(const id in KCA){const a=KCA[id],fx=BAL.kc3.fx[id]||{};let n=0;
   for(const k of ["win","mid","lose"])if(!a.E[k])F.push(`${id}: no ending ${k}`);
   for(const ek in a.E){const E=a.E[ek];if(typeof E.seed==="string"&&!ARC67[E.seed])F.push(`${id}.${ek}: seed ${E.seed} is no palace arc`)}
   for(const bid in a.B){const B=a.B[bid];if(!fx[bid])F.push(`${id}.${bid}: no BAL.kc3.fx entry`);
    const O=B.o||[];O.forEach((o,i)=>{n++;const end=o.e?(Array.isArray(o.e)?o.e:[o.e,o.e]):[];
     const gain=has(o.w)||!!o.wx||(o.sc>0)||end.some(e=>a.E[e]&&a.E[e].k>=0)||/^✦/.test(o.n);
     const loss=has(o.c)||has(o.l)||!!o.lx||end.some(e=>a.E[e]&&a.E[e].k<0)||/^✦/.test(o.n);
     if(!gain)F.push(`${id}.${bid}[${i}] «${o.n}»: no gain (law 3)`);if(!loss)F.push(`${id}.${bid}[${i}] «${o.n}»: no cost or loss (law 3)`);
     if(/%|\d/.test(o.n+(o.wx||"")+(o.lx||"")))F.push(`${id}.${bid}[${i}]: typed number or % in player words`)});
    const free=O.filter(o=>o.o==null&&!has(o.c)&&!o.lx&&!o.e);if(free.length&&O.some(o=>has(o.c)))F.push(`${id}.${bid}: a sure free option beside paid ones (law 2)`)}
   T.push(`${id} ${a.t}: ${Object.keys(a.B).length} beats, ${n} options, endings ${Object.keys(a.E).map(k=>k+(a.E[k].seed?"→"+(typeof a.E[k].seed==="string"?a.E[k].seed:"fn"):"")).join(" ")}`)}
  return{F,T}});
 console.log(r.T.join("\n"));console.log(r.F.length?"FAIL\n"+r.F.join("\n"):"PASS: home arcs laws 2/3, endings, seeds, BAL");await b.close();process.exit(r.F.length?1:0)})();
