/* flight-sid-rebirth (b) old-save check (law 6b): a save written BEFORE world people were keyed from their world id holds S.known under the
   per-seat «x<n>» keys (e.kk) of palace men, court officers, house heads, the censor and NPC consorts' children. After ser -> deser
   (same path as a real load), every such person keeps the level she knew (k61St), the new keys are world keys (n/o/t/c), and one j61 key
   = one person over k61All().
   usage: node dev/test/k61-wkey-oldsave.js [index.html]   exit 1 on a failure */
const {chromium}=require('playwright');const path=require('path');const U=process.argv[2]||path.resolve(__dirname,'../../index.html');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(/^https?:/.test(U)?U:'file://'+path.resolve(U));await p.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const r=await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
  for(let i=0;i<20;i++){try{nlNew()}catch(e){}start();if(S&&S.ps)break}Q.length=0;$("modal").hidden=true;
  if(typeof menInit==='function')menInit();if(typeof trS==='function')trS();if(typeof minNs==='function')minNs();
  /* a child for an NPC consort (world kid) */
  const mo=rivals.find(v=>v.alive&&!v.out&&!v.coop);if(mo){mo.kids=mo.kids||[];if(!mo.kids.length)mo.kids.push({name:'Hoàng tử Thử Nghiệm',sex:'m',age:3,fond:0,alive:true,hp:80})}
  k61S();const W=[...new Set(k61All().concat(S.trieu&&S.trieu.ns?[S.trieu.ns]:[]))].filter(e=>k61WKey(e));
  /* rewrite the state as an OLD build left it: «x<n>» keys on the person, S.known under them, no new keys, no migration flag */
  let n=500;const want=[];W.forEach((e,i)=>{e.kk='x'+(++n);const lv=i%4;delete S.known[k61WKey(e)];if(lv)S.known[e.kk]=lv;else delete S.known[e.kk];want.push([e.name,lv])});
  S.kseq=n;delete S.kwm;const d=JSON.parse(JSON.stringify(ser()));deser(d);
  for(const k in KREG)delete KREG[k];k61S();
  const W2=k61All().concat(S.trieu&&S.trieu.ns?[S.trieu.ns]:[]).filter(e=>k61WKey(e));const bad=[];
  for(const [nm,lv] of want){const e=W2.find(x=>x.name===nm);if(!e){bad.push([nm,'gone']);continue}const k=kOf61(e);const got=+S.known[k]||0;
   if(!/^[noct]/.test(k))bad.push([nm,'key '+k]);if(got!==lv)bad.push([nm,k,'want '+lv,'got '+got])}
  const by=new Map();for(const e of k61All()){const k=kOf61(e);if(!k)continue;if(!by.has(k))by.set(k,new Set());by.get(k).add(e)}
  const dup=[...by].filter(([k,L])=>L.size>1).map(([k,L])=>[k,[...L].map(e=>e.name)]);
  const kinds={};for(const e of W2){const c=kOf61(e)[0];kinds[c]=(kinds[c]||0)+1}
  return {n:want.length,kinds,bad,dup}});
 let f=0;const ok=(c,m,x)=>{if(!c)f++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
 console.log(JSON.stringify({n:r.n,kinds:r.kinds}));
 ok(r.n>=10&&r.kinds.n&&r.kinds.o&&r.kinds.t&&r.kinds.c,'old save holds world men, court, house heads and an NPC child',r.kinds);
 ok(!r.bad.length,'every world person keeps the level she knew under the old «x<n>» key',r.bad.slice(0,6));
 ok(!r.dup.length,'one j61 key = one person after the load',r.dup.slice(0,4));ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();console.log(f?'FAIL '+f:'PASS');process.exit(f?1:0)})();
