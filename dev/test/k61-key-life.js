/* SELSCENE-12 (law 11, «one j61 key = one person», coop-e2e a3: x34 = «Bích Đào» maid of #15 AND «Vân Nhi» maid of #23 on both seats):
   a person with no id / sid keeps the «x<n>» key j61 kOf61 gave her (.kk) for life, but the counter that issued it is her life's (S.kseq).
   Checks, solo page, no co-op room:
     A  a NEW LIFE in the same world (a fresh S whose S.kseq starts at 0; the world people keep their keys) keys a new person → no key held twice;
     B  the same with a stale registry entry (KREG) only: a key a registered person holds is never issued again;
     C  the guest seat (COOPW.seat "b") issues its own namespace («x<n>b»), so the host's keys that the merged world carries never meet hers.
   usage: python3 dev/build/assemble.py && node dev/test/k61-key-life.js [index.html] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x):'')}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8814/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8814/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kOf61==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});
 const r=await p.evaluate(()=>{const out={};
  const dups=()=>{const by=new Map();for(const e of k61All().concat([S])){const k=kOf61(e);if(!k)continue;if(!by.has(k))by.set(k,new Set());by.get(k).add(e)}return [...by].filter(([k,L])=>L.size>1).map(([k,L])=>[k,[...L].map(e=>e&&e.name)])};
  consorts();k61All().forEach(kOf61);/* every world maid / official keyed by this life */
  out.held=k61All().filter(e=>typeof e.kk==='string'&&/^x\d/.test(e.kk)).length;out.dup0=dups();
  /* A: a new life in the same world: a fresh S (counter 0), the world people keep their .kk */
  const S0=S;S=JSON.parse(JSON.stringify(S0));S.kseq=0;S.maid={name:'Thử Tân Tỳ',loyal:50};const kA=kOf61(S.maid);out.kA=kA;out.dupA=dups();
  /* B: a key a registered person holds (KREG) is never issued again, even when no world person holds it any more */
  const S1=S;S=JSON.parse(JSON.stringify(S0));S.kseq=0;const ghost={name:'Thử Bóng'};const kg='x'+((+S1.kseq||0)+1);KREG[kg]=ghost;S.kseq=+S1.kseq||0;
  const nb={name:'Thử Mới'};(S.staff=S.staff||[]).push(nb);const kB=kOf61(nb);out.kB=[kg,kB];out.dupB=dups();delete KREG[kg];
  /* C: the guest seat's namespace */
  const W0=window.COOPW;window.COOPW={on:true,seat:'b'};S=JSON.parse(JSON.stringify(S0));const nc={name:'Thử Khách'};(S.staff=S.staff||[]).push(nc);try{kOf61(nc)}finally{window.COOPW=W0}out.kC=String(nc.kk||'');/* the stored key (her own staff also wears the «g» prefix on top) */
  S=S0;return out});
 ok(r.held>0&&!r.dup0.length,'this life: every world person holds one key ('+r.held+' «x» keys)',r.dup0);
 ok(!r.dupA.length,'A new life in the same world: no key held twice (new key '+r.kA+')',r.dupA);
 ok(r.kB[1]!==r.kB[0]&&!r.dupB.length,'B a registered key is never issued again ('+r.kB.join(' → ')+')',r.dupB);
 ok(/^x\d+b$/.test(r.kC),'C the guest seat issues her own namespace ('+r.kC+')',r.kC);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();console.log(bad?bad+' FAIL':'ALL PASS');process.exit(bad?1:0)})();
