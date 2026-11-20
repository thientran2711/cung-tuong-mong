/* WORLD EVENTS frequency bot (jworld, review/world-events): plays N game years of tuần (endTurn), answers every card with its first option,
   restarts a new life on death, and counts world windows per kind / sub (phóng cung: per cause, released n + mine, empty releases, smallest gap vs phong.cd), open-at-once overlap, the longest run of tuần under a disaster
   window (dis/dich/hoa: "no perpetual disaster", research §5), the share of tuần under ANY hardship window (batch 1 + 2: tang, disasters,
   sickness of the Emperor / Thái hậu, vu cổ, giới nghiêm, trộm, ngoại thích, đại hàn) and its longest run, and errors.
   usage: node dev/measure/worldbot.js <dev/index.html or URL> [years=40] [seed=1]  → JSON on stdout */
const {chromium}=require('playwright');const path=require('path');const [,,U0,Y0,SD]=process.argv;
const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);const YEARS=+Y0||40,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 /* one evaluate per game year (keeps the renderer small; a 35-year single loop crashed it) */
 await p.evaluate(([SEED])=>{let s=SEED>>>0||1;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296};
  window.__wbFresh=()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=true;Q.length=0;try{deal()}catch(e){}};
  window.__wbFresh();window.__wb={tuan:0,lives:1,n:{},sub:{},open2:0,open3:0,disRun:0,disMax:0,errs:0,stuck:0,nightBlockedT:0,seen:{},lifeY:[],crisT:0,crisRun:0,crisMax:0,anyT:0};window.__wbCRIS=["dis","dich","hoa","trung","ret","vuco","cam","trom","ngoai","benh","thb","tang"];window.__wbY0=0},[SEED]);
 for(let y=0;y<YEARS;y++){await p.evaluate(()=>{const out=window.__wb;let n=0;while(n<36){if(!S||S.dead||S.over){out.lives++;out.lifeY.push(out.tuan-window.__wbY0);window.__wbY0=out.tuan;window.__wbFresh()}Q.length=0;S.mg=0;const w0=wk();
   try{endTurn()}catch(e){out.errs++}
   for(let i=0;i<6&&Q.length;i++){const m=Q.shift();try{const o=(m.opts||[]).find(o=>o&&!o.off&&!o.dis);if(o&&o.go)o.go()}catch(e){}}Q.length=0;
   if(wk()===w0){out.stuck++;if(out.stuck>50)return;continue}n++;out.tuan++;if(S.logs&&S.logs.length>40)S.logs.length=40;
   const A=worldWin();if(A.length>=2)out.open2++;if(A.length>=3)out.open3++;for(const w of A){const key=w.id+"|"+out.lives;if(!out.seen[key]){out.seen[key]=1;if(w.k==="phong")(out.phong=out.phong||[]).push({c:/trộm/.test(w.cause)?"trom":/đại hàn/.test(w.cause)?"ret":"cal",n:w.x.n||0,m:w.x.mine||0,t:w.t0,life:out.lives});out.n[w.k]=(out.n[w.k]||0)+1;if(w.x&&w.x.sub)out.sub[w.k+":"+w.x.sub]=(out.sub[w.k+":"+w.x.sub]||0)+1}}
   if(A.some(w=>["dis","dich","hoa"].includes(w.k))){out.disRun++;out.disMax=Math.max(out.disMax,out.disRun)}else out.disRun=0;
   /* batch 2: every hardship window (disasters + sickness + trials + curfew) — "not perpetual crisis" */
   if(A.some(w=>window.__wbCRIS.includes(w.k))){out.crisT++;out.crisRun++;out.crisMax=Math.max(out.crisMax,out.crisRun)}else out.crisRun=0;if(A.length)out.anyT++;
   if(worldNightBlocked(S))out.nightBlockedT++}})}
 const r=await p.evaluate(()=>{const out=window.__wb;delete out.seen;out.years=+(out.tuan/36).toFixed(1);out.perYear={};for(const k in out.n)out.perYear[k]=+(out.n[k]/out.years).toFixed(3);
  out.subPerYear={};for(const k in out.sub)out.subPerYear[k]=+(out.sub[k]/out.years).toFixed(3);out.nightBlockedShare=+(out.nightBlockedT/out.tuan).toFixed(3);out.crisisShare=+(out.crisT/out.tuan).toFixed(3);out.anyOpenShare=+(out.anyT/out.tuan).toFixed(3);const P=out.phong||[];out.phongSum={byCause:{},perYear:{},released:P.map(x=>x.n+x.m),empty:P.filter(x=>!(x.n+x.m)).length,minGap:null};for(const x of P)out.phongSum.byCause[x.c]=(out.phongSum.byCause[x.c]||0)+1;for(const c in out.phongSum.byCause)out.phongSum.perYear[c]=+(out.phongSum.byCause[c]/out.years).toFixed(3);
  for(let i=1;i<P.length;i++)if(P[i].life===P[i-1].life){const g=P[i].t-P[i-1].t;out.phongSum.minGap=out.phongSum.minGap==null?g:Math.min(out.phongSum.minGap,g)}delete out.phong;out.WW={err:WW.err,skip:WW.stat.skip,ill:WW.stat.ill||0,fire:WW.stat.fire||0};return out});
 r.pageErrors=errs.slice(0,5);r.pageErrorN=errs.length;console.log(JSON.stringify(r,null,1));await b.close()})();
