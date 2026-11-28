/* SELSCENE-18 (law 11, the servant-id family; coop symptom «s1» = two people): one sid = one person.
   Checks, solo page, no co-op room:
     A  a fresh life: every sid held by a servant (every household incl. the Thái hậu's elders, her Nội vụ phủ pool, her maid) is unique;
     B  a reload (sidN back to 0, staffInit from the saved people): the next new servant never takes a sid a POOL servant holds (pool is not in allServ);
     C  a new co-op life put into a world whose servants hold the same sids (attach → lifeRekey): her clashing people get fresh sids above every
        sid anyone holds, links between her own people (af, lover) follow, world sids never change.
   usage: python3 dev/build/assemble.py && node dev/test/sid-unique.js [index.html] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'..');const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m,x)=>{if(!c){bad++;console.log('FAIL',m,x!==undefined?JSON.stringify(x):'')}else console.log('ok',m)};
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'});
 await ctx.route('http://localhost:8814/**',r=>{const u=new URL(r.request().url());const f=path.join(ROOT,decodeURIComponent(u.pathname));if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});return r.fulfill({status:200,contentType:f.endsWith('.html')?'text/html; charset=utf-8':'application/octet-stream',body:fs.readFileSync(f)})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto('http://localhost:8814/'+PAGE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof sidTop==='function',null,{timeout:240000});
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});
 const r=await p.evaluate(()=>{const out={};
  const held=()=>{const L=allServ().slice();const P=npool();for(const k in P)L.push(...P[k]);if(S.maid&&S.maid.sid!=null)L.push(S.maid);return L.filter(x=>x&&!x.coop&&x.sid!=null)};
  const dups=()=>{const by=new Map();for(const x of held()){const k=+x.sid;if(!by.has(k))by.set(k,new Set());by.get(k).add(x)}return [...by].filter(([k,L])=>L.size>1).map(([k,L])=>[k,[...L].map(x=>x.name)])};
  out.n=held().length;out.thO=(S.thO&&S.thO.staff||[]).length;out.dA=dups();
  /* B: a pool servant holds the top sid; reload → sidN 0 → staffInit → the next new servant */
  const P=npool();const ps=mkServ("maid");P.maid.push(ps);const top=ps.sid;sidN=0;staffInit();const nw=mkServ("eunuch");out.B={pool:top,next:nw.sid};
  /* C: her household + pool renumbered 1..k (a new life's counter), the world keeps its sids */
  const own=[].concat(S.staff||[],P.maid,P.eunuch).filter(x=>x&&!x.coop);const world=allServ().filter(x=>!own.includes(x)&&!x.coop);
  const wS=world.map(x=>x.sid);let i=0;for(const x of own)x.sid=++i;/* review r19 (mutation proof): the linked pair sits ON world sids and two more of her own share one sid, so the world-clash rekey, the own-vs-own rule and the af / lover remap all run */if(own.length>1&&wS.length>1){own[0].sid=wS[0];own[1].sid=wS[1];const e2=mkServ("eunuch"),e3=mkServ("eunuch");(P.eunuch=P.eunuch||[]).push(e2,e3);e2.sid=e3.sid=880;own.push(e2,e3)}if(own.length>1){own[0].af={[own[1].sid]:33};own[1].lover=own[0].sid}
  const a0=own[0],a1=own[1];COOPW.lifeRekey();out.C={dups:dups(),worldSame:world.every((x,j)=>x.sid===wS[j]),af:a0&&a1?a0.af[a1.sid]:33,lover:a1?a1.lover===a0.sid:true,clash:own.filter(x=>world.some(w=>w.sid===x.sid)).length,above:own.length?Math.min(...own.filter(x=>wS.includes(x.sid)).map(x=>x.sid).concat([1e9]))===1e9:true,nOwn:own.length,nWorld:world.length};
  return out});
 ok(r.n>5&&!r.dA.length,'A fresh life: every sid held once ('+r.n+' servants, Thái hậu elders '+r.thO+')',r.dA);
 ok(r.B.next>r.B.pool,'B reload: the next new servant never takes a pool servant\'s sid',r.B);
 ok(r.C.nWorld>0&&r.C.nOwn>0&&!r.C.dups.length&&!r.C.clash,'C new co-op life in a world with the same sids: no sid held twice',r.C);
 ok(r.C.worldSame,'C the world\'s sids never change (host truth)',r.C);
 ok(r.C.af===33&&r.C.lover,'C links between her own people follow the new sids (af, lover)',r.C);
 ok(!errs.length,'no page errors',errs.slice(0,3));
 console.log(bad?'FAIL '+bad:'PASS');await b.close();process.exit(bad?1:0)})();
