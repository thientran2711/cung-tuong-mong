/* review/charge-evidence (D4): find odds per charge, both directions (law 1), and searches needed to accuse (2000 runs each, the miss +1 rule
   included). usage: node dev/measure/charge-sim.js <url>  → markdown table. LIVE rule for comparison: any search that is not caught finds a
   piece of any wrong, 2 pieces of anything accuse (BAL.accNeedEv[0]), so 2 searches whatever the crime. */
const {chromium}=require('playwright');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({serviceWorkers:'block'})).newPage();
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(800);
 const T=await p.evaluate(()=>{const mk=(id,rank,tc,mat)=>{const o={id,name:"N"+id,rank,tamco:tc,staff:[],inv:[]};Object.defineProperty(o,'mat',{get:()=>mat,configurable:true});return o};
  const SC=[["A. Đáp ứng, Tâm cơ 70, Tai mắt 1 → Phi, Tâm cơ 20",mk(901,0,70,1),mk(902,5,20,0)],["B. Phi, Tâm cơ 20, Tai mắt 3 → Đáp ứng, Tâm cơ 70",mk(903,5,20,3),mk(904,0,70,0)],["C. same rank (Tần), Tâm cơ 40 = 40, Tai mắt 0",mk(905,3,40,0),mk(906,3,40,0)]];
  const rows=[];for(const [lab,h,t] of SC){for(const c of BAL.charge.order){const need=chNeed(t,c);const F0=chFind(h,t,c,null);let tot=0;const N=2000;
    for(let r=0;r<N;r++){let got=0,miss=0,k=0;while(got<need&&k<60){k++;const B=chB();let b=F0.band-0+Math.min(B.missCap,miss)*B.missStep;b=Math.max(0,Math.min(6,b));if(Math.random()*100<chBandO(b)){got++;miss=0}else miss++}tot+=k}
    rows.push([lab,chName(c),need,word(F0.o),(tot/N).toFixed(1)])}}return rows});
 let cur="";console.log("| who searches whom | charge | pieces | first search «Tìm chứng» | searches to accuse (mean) | LIVE |\n|---|---|---|---|---|---|");
 for(const r of T){console.log(`| ${r[0]===cur?"":r[0]} | ${r[1]} | ${r[2]} | ${r[3]} | ${r[4]} | 2 (any crime) |`);cur=r[0]}await b.close()})();
