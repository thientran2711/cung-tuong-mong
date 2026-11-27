/* REAL-PROOF-2 law 11 family scan (owner OD 27/11 ~00:57Z MAIN rec applied: Đức on ANY wicked deed by weight, known or not; Danh ONLY when exposed).
   usage: node dev/measure/cover-scan.js <url>  — the same script on the base build and on the branch gives the before / after table.
   For every scheme that writes a deed (every ACT with a deed weight = BAL.charge.actW, run through runAct by an NPC on another NPC, and every other
   deed road written directly in an action) it measures on the DOER: Đức and Danh when the scheme works and nobody catches it ("unexposed"), and Danh
   when the doer is caught red-handed (j8 caught → "caught"). Rolls are forced (roll → true; caught → "" or forced). */
const {chromium}=require('playwright');const [,,URL]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1200);
 const R=await p.evaluate(()=>{const out=[];/* NPC gates that would send / postpone the act (knows the target, motive, planned-time sending) are opened: we measure the act itself */try{npcKnows=()=>true;motiveOK=()=>({ok:true});ptNpcSent=()=>false}catch(e){}const r0=roll,c0=caught,m0=Math.random;const L=liveRivals(true).filter(x=>!x.queen);const A=L[0],T=L.find(x=>x!==A&&!sameHouse(A,x));
  const prep=()=>{for(const x of [A,T]){x.duc=50;x.danh=50;x.bac=999;x.wrongs=[];x.dw=0;x.confined=0;x.alive=true;x.out=false;x.suc=80}T.preg=6;T.hidden=false;T.catplot=null;T.fake=0;
   const kid=(T.kids||[]).find(k=>k.age>=8&&k.alive&&k.sex==="m");if(!kid){T.kids=T.kids||[];T.kids.push({name:"Tiểu hoàng tử",age:9,hp:80,heir:0,tal:50,fond:50,sex:"m",alive:true,id:"kx"+Math.random()})}};
  const one=(k,mode)=>{prep();const d0=A.duc,n0=A.danh;roll=()=>true;Math.random=()=>0.5;caught=mode==="caught"?function(a,t,ps,desc){return c0.call(this,a,t,ps,desc)}:()=>"";
   if(mode==="caught"){roll=()=>true}let r="";try{r=runAct(A,T,k)||""}catch(e){r="ERR "+e.message}finally{roll=r0;caught=c0;Math.random=m0}return{duc:A.duc-d0,danh:A.danh-n0,ok:!!r&&(A.wrongs||[]).length>0}};
  const tierOf=k=>{const c=BAL.charge.deed[k]||"uh";return (BAL.charge.C[c]||{}).tier||"nhe"};
  for(const k of Object.keys(BAL.charge.actW)){if(!ACT[k])continue;const u=one(k,"free"),c=one(k,"caught");out.push({k,road:"ACT "+ACT[k].n,tier:tierOf(k),ducU:u.duc,danhU:u.danh,danhC:c.danh,ok:u.ok})}
  /* deed roads that are not ACTs: written directly (as their road does), inside an action when the branch has one */
  const act=f=>{if(typeof COV==="object"){COV.ctx++;COV.force=1;try{return f()}finally{COV.ctx--;COV.force=0}}return f()};
  for(const k of ["plot","sbribe","sthreat","illbuy","flirt","mangift","mlbeat","cyfake","cylie","cyforge","wthreat","wbribe","wkill"]){if(!BAL.charge.deed[k]&&!/^w/.test(k))continue;prep();const d0=A.duc,n0=A.danh;act(()=>deedAdd(A,k,T,null,"thử"));out.push({k,road:"deed "+k,tier:tierOf(k),ducU:A.duc-d0,danhU:A.danh-n0,danhC:null,ok:true})}
  /* proven (conviction) Danh by weight, an NPC accused */
  for(const c of ["vp","uh","hd","mh"]){prep();T.rank=2;T.danh=50;const n0=T.danh;try{chPunish(T,c,"thử","S")}catch(e){}out.push({k:"proven:"+c,road:"chPunish "+BAL.charge.C[c].n,tier:BAL.charge.C[c].tier,ducU:null,danhU:null,danhC:T.danh-n0,ok:true})}
  return out});
 const f=v=>v==null?"—":v>0?"+"+v:String(v);
 console.log("| key | road | weight | Đức unexposed | Danh unexposed | Danh exposed (caught / proven) |\n|---|---|---|---|---|---|");
 for(const r of R)console.log(r.ok?`| ${r.k} | ${r.road} | ${r.tier} | ${f(r.ducU)} | ${f(r.danhU)} | ${f(r.danhC)} |`:`| ${r.k} | ${r.road} | ${r.tier} | n/a (the act found no fitting target in the scan; its own c.duc is paid when it runs) | | |`);
 const bad=R.filter(r=>r.ok&&r.ducU!=null&&r.k.indexOf("proven")<0&&!(r.ducU<0)),dU=R.filter(r=>r.danhU<0);
 console.log(`\nFAMILY: no Đức on an unexposed deed ${bad.length} (${bad.map(r=>r.k).join(",")||"none"}) · Danh lost while unexposed ${dU.length} (${dU.map(r=>r.k).join(",")||"none"}) · page errors ${errs.length} ${errs.slice(0,3).join(" | ")}`);
 await b.close()})();
