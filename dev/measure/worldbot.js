/* WORLD EVENTS frequency bot (jworld, review/world-events): plays N game years of tuần (endTurn), answers every card with its first option,
   restarts a new life on death, and counts world windows per kind / sub, open-at-once overlap, the longest run of tuần under a disaster
   window (dis/dich/hoa: "no perpetual disaster", research §5), and errors.
   usage: node dev/measure/worldbot.js <dev/index.html or URL> [years=40] [seed=1]  → JSON on stdout */
const {chromium}=require('playwright');const path=require('path');const [,,U0,Y0,SD]=process.argv;
const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);const YEARS=+Y0||40,SEED=+SD||1;
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:1180,height:820}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(async([YEARS,SEED])=>{let s=SEED>>>0||1;Math.random=()=>{s=(s*1664525+1013904223)>>>0;return s/4294967296};
  const fresh=()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;window.__bot=1;quiet=true;Q.length=0;try{deal()}catch(e){}};
  fresh();const out={tuan:0,lives:1,n:{},sub:{},open2:0,open3:0,disRun:0,disMax:0,errs:0,illCatch:0,stuck:0,nightBlockedT:0};const seen=new Set();let tu=0;
  const T_TOTAL=YEARS*36;while(tu<T_TOTAL){if(!S||S.dead||S.over){out.lives++;fresh()}Q.length=0;S.mg=0;const w0=wk();
   try{endTurn()}catch(e){out.errs++}
   for(let i=0;i<6&&Q.length;i++){const m=Q.shift();try{const o=(m.opts||[]).find(o=>o&&!o.off&&!o.dis);if(o&&o.go)o.go()}catch(e){}}Q.length=0;
   if(wk()===w0){out.stuck++;if(out.stuck>50)break;continue}tu++;
   const A=worldWin();if(A.length>=2)out.open2++;if(A.length>=3)out.open3++;for(const w of A){const key=w.id+"|"+out.lives;if(!seen.has(key)){seen.add(key);out.n[w.k]=(out.n[w.k]||0)+1;if(w.x&&w.x.sub)out.sub[w.k+":"+w.x.sub]=(out.sub[w.k+":"+w.x.sub]||0)+1}}
   if(A.some(w=>["dis","dich","hoa"].includes(w.k))){out.disRun++;out.disMax=Math.max(out.disMax,out.disRun)}else out.disRun=0;
   if(worldNightBlocked(S))out.nightBlockedT++}
  out.tuan=tu;out.years=+(tu/36).toFixed(1);out.perYear={};for(const k in out.n)out.perYear[k]=+(out.n[k]/out.years).toFixed(3);out.WW={err:WW.err,skip:WW.stat.skip,ill:WW.stat.ill||0};return out},[YEARS,SEED]);
 r.pageErrors=errs.slice(0,5);r.pageErrorN=errs.length;console.log(JSON.stringify(r,null,1));await b.close()})();
