/* robot10 E-FIX-3 acceptance (law 6c): an old save loads into a SLIMMER save and nothing is lost.
   Loads <save.json> (default: the nc-B-tuc year-14 save, 4.97 M chars), runs the once-per-load store move (ilWeek), and checks:
   (1) LASTING items (everything except allotment consumables al* / lx*) per owner (her, every NPC, store records by .own) = before;
   (2) allotment consumables WITH USES LEFT: pieces held + store records + counted stock S.il.stock = before (a piece with uses left is never dropped);
   (3) SPENT allotment remains taken out of the store = the count added to S.il.used (every drop has a ledger count);
   (4) save chars smaller. usage: node dev/test/r10e-oldsave-noloss.js [save.json]   exit 1 on any loss */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const save=process.argv[2]||'/home/user/wt/e10c-data/s010.json';
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const ctx=await b.newContext({viewport:{width:390,height:844},reducedMotion:'reduce'});await serve(ctx);
 await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(String(e)));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(500);
 const sv=JSON.parse(fs.readFileSync(save,'utf8'));
 const r=await p.evaluate(d=>{document.getElementById('title').hidden=true;SLOT=3;Q=[];
  const chars=()=>JSON.stringify(ser()).length;
  const cons=k=>!!((typeof alOf==='function'&&alOf(k))||(typeof lxOf==='function'&&lxOf(k)));
  const live=e=>/^al(dau)/.test(e.k)||/^lx/.test(e.k)?e.u>0:true;/* candles: one use each until burnt */
  const snap=()=>{const L={},C={},I=S.il||{};const add=(M,o,k,n)=>{M[o]=M[o]||{};M[o][k]=(M[o][k]||0)+(n||1)};
   for(const v of [S,...rivals]){const o=v===S?'me':v.id;for(const e of ilSlots(v)){if(!cons(e.k))add(L,o,e.k);else if(live(e))add(C,'held',e.k)}}
   let spentBox=0;for(const x of I.box||[]){const e=x.e||{};if(!cons(e.k))add(L,'box:'+(x.own||''),e.k);else if(ilOldStock(x)===1)spentBox++;else add(C,'box',e.k)}
   for(const s in I.stock||{})add(C,'stock',s.split('.')[0],I.stock[s]);
   let used=0;for(const o in I.used||{})for(const k in I.used[o])used+=I.used[o][k];return {L,C,spentBox,used,box:(I.box||[]).length}};
  deser(d);try{closeModal()}catch(e){}const c0=chars();const A=snap();ilWeek.m=S.il;ilOldMove(S.il);/* the move alone (ilWeek runs it once per loaded ledger; the rest of the week moves lasting pieces on purpose) */const c1=chars();const B=snap();
  /* lasting per owner */let lost=[];for(const o of new Set([...Object.keys(A.L),...Object.keys(B.L)]))for(const k of new Set([...Object.keys(A.L[o]||{}),...Object.keys(B.L[o]||{})])){const a=(A.L[o]||{})[k]||0,z=(B.L[o]||{})[k]||0;if(a!==z)lost.push([o,k,a,z])}
  const sum=M=>{const t={};for(const g in M)for(const k in M[g])t[k]=(t[k]||0)+M[g][k];return t};const CA=sum(A.C),CB=sum(B.C);const cl=[];for(const k of new Set([...Object.keys(CA),...Object.keys(CB)]))if((CA[k]||0)!==(CB[k]||0))cl.push([k,CA[k]||0,CB[k]||0]);
  const owners=Object.keys(A.L).length,lastA=Object.values(A.L).reduce((a,m)=>a+Object.values(m).reduce((x,y)=>x+y,0),0),lastB=Object.values(B.L).reduce((a,m)=>a+Object.values(m).reduce((x,y)=>x+y,0),0);
  const perOwner=Object.keys(A.L).filter(o=>!/^box/.test(o)).slice(0,6).map(o=>[o==='me'?'me':(RV(o)||{}).name||o,Object.values(A.L[o]).reduce((x,y)=>x+y,0),Object.values(B.L[o]||{}).reduce((x,y)=>x+y,0)]);
  return {c0,c1,boxA:A.box,boxB:B.box,owners,lastA,lastB,lost,consA:CA,consB:CB,cl,spentBoxA:A.spentBox,usedA:A.used,usedB:B.used,stock:S.il.stock,conv:S.il.conv,perOwner}},sv);
 console.log(`save chars ${r.c0} → ${r.c1} · S.il.box ${r.boxA} → ${r.boxB}`);
 console.log(`lasting items: ${r.owners} owners, ${r.lastA} → ${r.lastB} pieces; per owner (first 6): ${r.perOwner.map(x=>x.join(' ')).join(' · ')}; mismatches ${r.lost.length}`,r.lost.slice(0,8));
 console.log(`consumables with uses left (held + store + counted stock): ${JSON.stringify(r.consA)} → ${JSON.stringify(r.consB)}; mismatches ${r.cl.length}`,r.cl);
 console.log(`spent remains in the store ${r.spentBoxA} → used ledger +${r.usedB-r.usedA} (S.il.used ${r.usedA} → ${r.usedB}); conv ${JSON.stringify(r.conv)}; stock ${JSON.stringify(r.stock)}`);
 if(errs.length)console.log('page errors',errs.slice(0,5));
 const ok=!r.lost.length&&!r.cl.length&&r.usedB-r.usedA===r.spentBoxA&&r.c1<r.c0&&!errs.length;console.log(ok?'ALL OK':'FAIL');await b.close();process.exit(ok?0:1)})();
