/* review/home-chapters r2 item 2 (law 6b, fix the whole roster group): starts N home lives of every khuê các origin and counts, per roster
   role (nhũ mẫu, bà mối, 5 teachers, every suitor), lives where the person has NO face (fid "") or a named palace face (BAL.kc3.ros.noFid).
   Also loads an r1-style life (teacher faces wiped) and checks the month hook gives them a face (old saves).
   usage: node dev/test/home-chapters/faces.js <url> [--lives=4] */
const {chromium}=require('playwright');
const A=process.argv.slice(2),URL=A[0],LIVES=+((A.find(x=>x.startsWith('--lives='))||'=4').split('=')[1]);
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});const p=await c.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));await p.addInitScript(()=>{window.__bot=1});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await new Promise(r=>setTimeout(r,5000));
 const r=await p.evaluate(LIVES=>{const T={},bad=k=>BAL.kc3.ros.noFid.some(x=>String(k).startsWith(x));let n=0,old=0,oldOk=0,dup=0;
  for(const o of ['tt','dtq','muoi','thd','ch','td'])for(let L=0;L<LIVES;L++){for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!S.srv&&!(typeof isSrv==='function'&&isSrv()))break}
   S.origin=ORIGINS.find(x=>x.k===o);S.kcPick='nha';Q=[];kcInit();Q=[];n++;for(let s=0;s<3;s++)try{kcSuitor()}catch(e){}
   for(const m of S.kc.fam){if(!/^(nm|ba|thay\d|sx\d+)$/.test(m.r))continue;const k=/^sx/.test(m.r)?'Nhà cầu thân':m.t;T[k]=T[k]||{lives:0,empty:0,palace:0};T[k].lives++;if(!m.fid)T[k].empty++;else if(bad(m.fid))T[k].palace++}
   const F=S.kc.fam.map(m=>m.fid).filter(Boolean);if(new Set(F).size<F.length)dup++;
   /* r1-style save: teachers lost their faces */ const th=S.kc.fam.filter(m=>m.grp==='thay');th.forEach(m=>{const U=figUsed(),j=U.indexOf(m.fid);if(j>=0)U.splice(j,1);m.fid='';delete m.role3});old++;kcWhere();if(th.every(m=>m.fid&&!bad(m.fid)))oldOk++}
  return{n,T,dup,old,oldOk}},LIVES);
 console.log('| role | lives | no face | palace face |\n|---|---|---|---|');let bad=0;for(const k in r.T){const t=r.T[k];bad+=t.empty+t.palace;console.log(`| ${k} | ${t.lives} | ${t.empty} | ${t.palace} |`)}
 console.log(`lives ${r.n} · lives with a face used twice ${r.dup} · r1 saves repaired ${r.oldOk}/${r.old} · page errors ${errs.length}`);
 await b.close();const ok=!bad&&!r.dup&&r.oldOk===r.old&&!errs.length;console.log(ok?'PASS: every roster person has a face':'FAIL');process.exit(ok?0:1)})();
