/* the owner's case (15/11 "Tại sao không khớp"): a night with each night-talk choice, forced to fail (hỏng);
   the Sổ ghi line of the night must replay to the header Sủng / Ân tình / Danh / Đức / Bạc.
   usage: node dev/test/log-sync-night.js <url of a built page with charset, e.g. dev/_t.html served>  → PASS/FAIL per choice */
const {chromium}=require('playwright');
(async()=>{const b=await chromium.launch();let bad=0;
 for(const opt of [0,1,2,3]){const p=await b.newPage();p.on('pageerror',e=>console.log('ERR',e.message));
  await p.goto(process.argv[2],{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function',null,{timeout:0});await p.waitForTimeout(1200);
  await p.evaluate(()=>{window.__bot={pre:1};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:0});
  const r=await p.evaluate(opt=>{Q.length=0;S.buoi=3;lsSync("x");const b0=lsSnap();const s0=S.logSeq;nightScene();let g=0;let ch="";
   while(Q.length&&g++<20){const m=Q[0];if(m.opts&&m.opts.length){let i;if(m.pid==="night2"){Math.random=()=>0.999;i=Math.min(opt,m.opts.length-1);ch=m.opts[i].n}else{const j=m.opts.findIndex(x=>!(x.lk&&x.lk())&&!(x.fx&&x.fx.bac&&S.bac+x.fx.bac<0));i=j<0?0:j}chooseM(i)}else closeModal()}
   S.toMorning=0;const n=S.logSeq-s0;const L=S.logs.slice(0,n).reverse();const R=lsReplay(L,b0).v;const now=lsSnap();
   const diff=Object.keys(now).filter(k=>R[k]!==now[k]).map(k=>`${k} log ${R[k]} header ${now[k]}`);
   return {ch,diff,line:String(S.logs[0]).replace(/<[^>]+>/g,"")}},opt);
  console.log(r.diff.length?"FAIL":"PASS",r.ch,"|",r.line.slice(0,260),r.diff.join("; "));if(r.diff.length)bad++;await p.close()}
 await b.close();process.exit(bad?1:0)})();
