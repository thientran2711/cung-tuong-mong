/* ACT-MERGE J2 test (harm / scheme / accuse doors P5–P14, jdf DOOR). usage: node dev/test/act-merge-j2.js [url]
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
  const spy=()=>{const log=[];const d0=doAct,e0=empAct,t0=talk,s0=typeof sgAsk==='function'?sgAsk:null;
   doAct=(i,k)=>log.push('a:'+k);empAct=(i,k)=>log.push('e:'+k);talk=oi=>{const L=talkOpts(curPeople()[popIdx]);log.push('t:'+(L[oi]&&L[oi].n))};if(s0)sgAsk=(o)=>log.push('a:'+o.k);
   return {log,undo(){doAct=d0;empAct=e0;talk=t0;if(s0)sgAsk=s0}}};
  for(const sc of ['dau','cao','hh','con']){AA.scen(sc);Q.length=0;
   for(const [i,v] of rivals.entries()){if(!v.alive||v.out||sameHouse(S,v))continue;
    DOORX.raw++;let raw=[];try{raw=rvGroups(v,i)}finally{DOORX.raw--}const after=rvGroups(v,i);
    const rawKeys=raw.flatMap(g=>g[1]).map(doorKeyOf).filter(k=>k&&DOOR_M[k]);const nRaw=raw.flatMap(g=>g[1]).filter(Boolean).length,nAft=after.flatMap(g=>g[1]).filter(Boolean).length;
    T.card.push([sc,nRaw,nAft]);
    for(const h of after.flatMap(g=>g[1]))if(doorKeyOf(h)&&DOOR_M[doorKeyOf(h)])fail('T1 '+sc,`${v.name}: member ${doorKeyOf(h)} outside its door`);
    const M=doorCardMembers(v,i);
    for(const d of DOOR){const O=doorOpts(d,M,v);const has=after.flatMap(g=>g[1]).some(h=>String(h).includes(`data-door="${d.id}"`));
     if(O.length&&!has)fail('T1 '+sc,`${v.name}: ${d.id} has options but no button`);if(!O.length&&has)fail('T1 '+sc,`${v.name}: ${d.id} button with no option`);
     const shown=new Set(O.map(o=>o.m));
     for(const k of rawKeys){const m=DOOR_M[k];if(m.d!==d||m.role==='hide')continue;if(shown.has(k))continue;
      if(m.role==='roll'||m.role==='rep'){const t=d.T[m.ti];const pool=[t[1][0]].concat(t[2]).filter(x=>M[x]);if(pool.includes(k)&&O.some(o=>pool.includes(o.m)))continue}
      fail('T1 '+sc,`${v.name}: ${k} not reachable in ${d.id}`)}
     /* T2 */const S0=spy();try{for(const o of O){const n=S0.log.length;try{o.run()}catch(e){fail('T2 '+sc,`${d.id} ${o.m} threw ${e.message}`)}const got=S0.log.slice(n).join(',');if(got!==o.m)fail('T2 '+sc,`${d.id} option ${o.m} fired «${got}»`)}}finally{S0.undo()}}}
   /* T3 pop-up: every consort as met on a place she stands at */
   for(const [i,v] of rivals.entries()){if(!v.alive||v.out)continue;S.visit={k:S.place,people:[rp(v)],talked:false,tk:{},msg:"",cap:{}};popIdx=0;const pp=curPeople()[0];
    let opts=[];try{opts=talkOpts(pp)}catch(e){continue}const d=document.createElement('div');d.innerHTML=popCard(pp,0);const B=[...d.querySelectorAll('button')].filter(x=>dfIsAct(x));
    T.pop.push([sc,(v.queen?'hh':sameHouse(S,v)?'same':'rival'),opts.length+dfInPerson(pp).length,B.length]);
    for(const x of B){const nm=x.dataset.o!=null?(opts[+x.dataset.o]||{}).n:null;if(nm&&DOOR_M['t:'+nm])fail('T3 '+sc,`${v.name}: «${nm}» outside its door`)}
    const M=doorPopMembers(pp,0,opts);for(const dd of DOOR){const O=doorOpts(dd,M,v);const S0=spy();try{for(const o of O){const n=S0.log.length;try{o.run()}catch(e){fail('T3 '+sc,`${dd.id} ${o.m} threw ${e.message}`)}const got=S0.log.slice(n).join(',');if(got!==o.m)fail('T3 '+sc,`${dd.id} option ${o.m} fired «${got}»`)}}finally{S0.undo()}}}
   S.visit=null;popIdx=null}
  /* T4 two-way */const npc=new Set(BANDS.flatMap(b=>b[2]||[]));try{for(const vk in HA_VAR)npc.add(vk)}catch(e){}const no=new Set(typeof HA_NO==='object'?[...HA_NO]:[]);npc.add('tieuhuy');
  for(const m in DOOR_M){if(m[0]!=='a')continue;const k=m.slice(2);if(!ACT[k])fail('T4',`${k} is not an ACT key`);else if(!npc.has(k)||no.has(k))fail('T4',`${k} (door ${DOOR_M[m].d.id}) is not run by NPCs`);if(typeof haDoor==='function'&&JSON.stringify(haDoor(k))!==JSON.stringify(doorOf(k)))fail('T4',`haDoor(${k}) differs`)}
  const free=Object.keys(ACT).filter(k=>!DOOR_M['a:'+k]);
  return {F,T,free}});
 const agg=(L,k)=>{const o={};for(const r of L){const key=r.slice(0,k).join(' ');o[key]=o[key]||{n:0,b:[1e9,0],a:[1e9,0]};const x=o[key];x.n++;x.b=[Math.min(x.b[0],r[k]),Math.max(x.b[1],r[k])];x.a=[Math.min(x.a[0],r[k+1]),Math.max(x.a[1],r[k+1])]}return o};
 console.log('# T5 card buttons (scenario: consorts, before min–max → after min–max)');for(const [k,x] of Object.entries(agg(R.T.card,1)))console.log(`  ${k}: ${x.n} cards · ${x.b.join('–')} → ${x.a.join('–')}`);
 console.log('# T5 pop-up buttons (scenario kind: options before → buttons after)');for(const [k,x] of Object.entries(agg(R.T.pop,2)))console.log(`  ${k}: ${x.n} · ${x.b.join('–')} → ${x.a.join('–')}`);
 console.log('# ACT keys outside the doors (J1 talk side / moved):',R.free.join(', '));
 console.log(R.F.length?'FAIL '+R.F.length+'\n  '+[...new Set(R.F)].slice(0,40).join('\n  '):'PASS T1 T2 T3 T4');console.log('page errors',perr.length,perr.slice(0,3).join(' | '));
 await b.close();process.exit(R.F.length||perr.length?1:0)})();
