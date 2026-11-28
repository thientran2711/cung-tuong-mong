/* D-SELX-FAIR tuning aid (fast, no cards): fresh tú nữ lives, the REAL girls (selxGirls) with their real first impression (selxImpRun on each) and the
   real royal tests (one drawn per type, selxTestPick) — the same selxContest as the days; her marks by profile. Kept-rate by profile × Tài band, for a
   trial BAL.selx override. Confirm any choice with dev/measure/selx-fair.js (the full card-by-card days).
   usage: node dev/measure/selx-tune.js [lives] ['{"w":{...},"noise":n}'] */
const {chromium}=(require('../test/lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'..');const N=+process.argv[2]||150;const OV=process.argv[3]?JSON.parse(process.argv[3]):null;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8813/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();p.setDefaultTimeout(1800000);await p.goto('http://localhost:8813/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof selxContest==='function'&&typeof start==='function'&&typeof selxRoyals==='function');
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin);
 const r=await p.evaluate(([N,OV])=>{window.__bot=1;if(OV)for(const k in OV)BAL.selx[k]=typeof OV[k]==='object'&&!Array.isArray(OV[k])?Object.assign({},BAL.selx[k],OV[k]):OV[k];
  const W=BAL.mgTier.word,M=BAL.selx.npcMatch;const out=[];let n=0,g=0;
  while(n<N&&g++<N*20){try{store.set(NL_KEY,null)}catch(e){}start();if(S.origin.k==="cnv"||selxHoaThan(S.origin.k))continue;S.kcPick="cung";nlAccept();const Z=S.selx2;if(!Z||!Z.days||!Z.girls)continue;
   document.querySelectorAll('.kmov,#kprevov,#kg82,#kpodov,.kscn').forEach(x=>x.remove());
   let art="";try{art=entKind(entBest())}catch(e){}const skip=entSkipRaw();
   const RY=selxRoyals();const tok=k=>(RY.find(x=>x[0]===k)||[])[2];const eD=selxTestPick("doidap","T"),eH=selxTestPick("hanhxu","H");
   const t={art,dd:eD&&Object.assign({},eD,{__k:"T"}),hx:eH&&Object.assign({},eH,{__k:"H"}),rdd:o=>selxReactR(o,tok("T")),rhx:o=>selxReactR(o,tok("H"))};
   let imp=null;try{imp=selxImpAll(S).mk}catch(e){}for(const v of Z.girls){try{if(v.__impMk==null)v.__impMk=selxImpAll(v).mk}catch(e){}}
   const first=(e,rf)=>e?selxMark(rf(e.options[0])):M.none;const liked=M.hit;
   const prof={skip:{mini:skip,dd:first(eD,t.rdd),hx:first(eH,t.rhx)},fair:{mini:W[2],dd:first(eD,t.rdd),hx:first(eH,t.rhx)},good:{mini:W[2],dd:liked,hx:liked},best:{mini:W[3],dd:liked,hx:liked}};
   n++;for(const pk in prof){const mk=Object.assign({},prof[pk],imp!=null?{imp}:{});const L=selxContest(Z.girls.map(v=>{delete v.__marks;delete v.__sc;return v}),{marks:mk,t});const me=L.find(x=>x.v===S);out.push({pk,tai:S.tai,duc:S.duc,sac:S.sac,kept:me.kept,place:me.place,sc:me.sc})}}
  return out},[N,OV]);
 const band=t=>t<50?"<50":t<70?"50-69":t<85?"70-84":"85+";const rows=[];for(const pk of ["skip","fair","good","best"]){const R=r.filter(x=>x.pk===pk);const row={pk,n:R.length,kept:(R.filter(x=>x.kept).length/R.length).toFixed(2)};
  for(const bb of ["<50","50-69","70-84","85+"]){const Q=R.filter(x=>band(x.tai)===bb);row["Tài "+bb]=Q.length?`${(Q.filter(x=>x.kept).length/Q.length).toFixed(2)} (${Q.length})`:"-"}rows.push(row)}
 console.table(rows);await b.close()})();
