/* ACT-MERGE J2 test (harm / scheme / accuse doors P5–P14 = jdoor DOOR rows «J2 ext» + jdf card fold / DOOR.cardM / DOOR.more). usage: node dev/test/act-merge-j2.js [url]
   Whole family, every scenario (dau/cao/hh/con) × every live consort she can act on (card) and every consort met on Dư đồ (pop-up):
   T1 card: no member act button left outside its door; every door has ≥1 option; every member the OLD card showed is reachable in its door
      (rep / way shown as an option; a roll member = one of the tier's pick pool) — nothing dropped.
   T2 run path: every card option fires the SAME act key as its old button (doAct / sgAsk / empAct spied, nothing applied).
   T3 pop-up: no talk option of a door is shown outside it; every door option of the pop-up fires talk() on the same option NAME, or doAct on the in-person key.
   T4 two-way: every ACT key in a door is a key NPCs run on her (BANDS ∪ HA_VAR, minus HA_NO; tieuhuy = jagharm help option); haDoor(k) = doorOf(k).
   T5 counts: card buttons and pop-up buttons before (raw) → after. Exit 1 on any FAIL. Reuses the act-audit harness (AA). */
const fs=require('fs'),path=require('path');const {chromium}=require('playwright');const ROOT=path.resolve(__dirname,'../..');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL=process.argv[2]||'file://'+path.join(ROOT,'index.html');
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'block'})).newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2000);await p.evaluate(LIB);
 const R=await p.evaluate(()=>{const F=[],T={card:[],pop:[]};const fail=(t,m)=>F.push(t+': '+m);
  const J2=DOOR.T.filter(r=>r.acts);const idOf=h=>doorCardId(h);const memb=id=>{const m=DOOR.ofId(id);return m&&m.r.kinds.includes('card')?m:null};
  const spy=()=>{const log=[];const d0=doAct,e0=empAct,t0=talk,s0=typeof sgAsk==='function'?sgAsk:null;
   doAct=(i,k)=>log.push('a:'+k);empAct=(i,k)=>log.push('e:'+k);talk=oi=>{const L=talkOpts(curPeople()[popIdx]);const a=L[oi];log.push('t:'+(a&&doorTxt(a.n)))};if(s0)sgAsk=(o)=>log.push('a:'+o.k);
   return {log,undo(){doAct=d0;empAct=e0;talk=t0;if(s0)sgAsk=s0}}};
  for(const sc of ['dau','cao','hh','con']){AA.scen(sc);Q.length=0;doorJ2Attach();
   for(const [i,v] of rivals.entries()){if(!v.alive||v.out||sameHouse(S,v))continue;
    DOORC.raw++;let raw=[];try{raw=rvGroups(v,i)}finally{DOORC.raw--}const after=rvGroups(v,i);const AH=after.flatMap(g=>g[1]).filter(Boolean);
    T.card.push([sc,raw.flatMap(g=>g[1]).filter(Boolean).length,AH.length]);
    const rawIds=raw.flatMap(g=>g[1]).map(idOf).filter(id=>memb(id));
    for(const r of J2){const L=DOOR.cardM(i,r);const has=AH.some(h=>String(h).includes(`data-door="${r.k}"`));const lone=L.length===1&&!(r.roll||[]).length;
     if(L.length&&!lone&&!has)fail('T1 '+sc,`${v.name}: ${r.k} has members but no door button`);
     if(!lone)for(const h of AH){const id=idOf(h);const m=memb(id);if(m&&m.r===r)fail('T1 '+sc,`${v.name}: member ${id} outside door ${r.k}`)}
     const O=DOOR.rowsJ2(r,L,v);const shownN=new Set(O.map(o=>o.n));
     for(const id of rawIds){const m=memb(id);if(m.r!==r||m.role==='hide')continue;const b=L.find(x=>x.id===id);if(!b){fail('T1 '+sc,`${v.name}: ${id} not a member of ${r.k}`);continue}
      const t=(r.tiers||{})[id];if(shownN.has(t?`${b.n} · ${t}`:b.n))continue;const g=(r.roll||[]).find(g=>g.includes(id));if(g&&O.length)continue;fail('T1 '+sc,`${v.name}: ${id} not reachable in ${r.k}`)}
     const S0=spy();try{for(const m of L){const n=S0.log.length;try{m.go()}catch(e){fail('T2 '+sc,`${r.k} ${m.id} threw ${e.message}`)}const got=S0.log.slice(n).join(',');if(got!==m.id)fail('T2 '+sc,`${r.k} ${m.id} fired «${got}»`)}}finally{S0.undo()}}
    try{const d=mkP('door',{r:i,k:'P7'});if(DOOR.cardM(i,DOOR.byK('P7')).length&&!(d&&d.o&&d.o.length>1))fail('T2 '+sc,`${v.name}: PEND door P7 card mode empty`)}catch(e){fail('T2 '+sc,'PEND card '+e.message)}}
   /* T3 pop-up */
   for(const [i,v] of rivals.entries()){if(!v.alive||v.out)continue;S.visit={k:S.place,people:[rp(v)],talked:false,tk:{},msg:"",cap:{}};popIdx=0;const pp=curPeople()[0];
    let opts=[],raw=[];try{opts=talkOpts(pp);raw=doorRaw(pp)}catch(e){continue}const ip=dfInPerson(pp).length;
    T.pop.push([sc,(v.queen?'hh':sameHouse(S,v)?'same':'rival'),raw.length+ip,(dfActs(0)||[]).reduce((n,g)=>n+g.acts.length,0)]);
    for(const r of J2){const dOpt=opts.find(a=>a&&a.door===r.k);if(!dOpt)continue;for(const a of opts)if(a&&!a.door&&DOOR.of(a.n,pp.kind)===r)fail('T3 '+sc,`${v.name}: «${a.n}» outside door ${r.k}`);
     const d=mkP('door',{i:0,k:r.k});if(!d||!d.o||d.o.length<2){fail('T3 '+sc,`${v.name}: ${r.k} dialog empty`);continue}
     const S0=spy();try{for(const o of d.o){if(!o.go)continue;const n=S0.log.length;try{o.go()}catch(e){fail('T3 '+sc,`${r.k} «${o.n}» threw ${e.message}`)}const got=S0.log.slice(n).join(',');const base=String(o.n).replace(/ · (nhẹ|vừa|nặng)$/,'');
      if(!got||(got[0]==='t'&&doorTxt(got.slice(2))!==doorTxt(base)))fail('T3 '+sc,`${r.k} «${o.n}» fired «${got}»`)}}finally{S0.undo()}}}
   S.visit=null;popIdx=null}
  /* T4 two-way */const npc=new Set(BANDS.flatMap(b=>b[2]||[]));try{for(const vk in HA_VAR)npc.add(vk)}catch(e){}const no=new Set(typeof HA_NO==='object'?[...HA_NO]:[]);npc.add('tieuhuy');
  for(const r of J2)for(const k of (r.acts.a||[])){if(!ACT[k])fail('T4',`${k} is not an ACT key`);else if(!npc.has(k)||no.has(k))fail('T4',`${k} (door ${r.k}) is not run by NPCs`);if(typeof haDoor==='function'&&JSON.stringify(haDoor(k))!==JSON.stringify(DOOR.ofKey(k)))fail('T4',`haDoor(${k}) differs`)}
  const free=Object.keys(ACT).filter(k=>!DOOR.ofKey(k));
  return {F,T,free}});
 const agg=(L,k)=>{const o={};for(const r of L){const key=r.slice(0,k).join(' ');o[key]=o[key]||{n:0,b:[1e9,0],a:[1e9,0]};const x=o[key];x.n++;x.b=[Math.min(x.b[0],r[k]),Math.max(x.b[1],r[k])];x.a=[Math.min(x.a[0],r[k+1]),Math.max(x.a[1],r[k+1])]}return o};
 console.log('# T5 card buttons (scenario: consorts, before min–max → after min–max)');for(const [k,x] of Object.entries(agg(R.T.card,1)))console.log(`  ${k}: ${x.n} cards · ${x.b.join('–')} → ${x.a.join('–')}`);
 console.log('# T5 pop-up buttons (scenario kind: raw options + in-person acts before → focus-view acts after)');for(const [k,x] of Object.entries(agg(R.T.pop,2)))console.log(`  ${k}: ${x.n} · ${x.b.join('–')} → ${x.a.join('–')}`);
 console.log('# ACT keys outside the doors (J1 talk side / moved):',R.free.join(', '));
 console.log(R.F.length?'FAIL '+R.F.length+'\n  '+[...new Set(R.F)].slice(0,40).join('\n  '):'PASS T1 T2 T3 T4');console.log('page errors',perr.length,perr.slice(0,3).join(' | '));
 await b.close();process.exit(R.F.length||perr.length?1:0)})();
