/* NPC-HARM-HEAT (ALLOT-PACE-2, RV-163L finding «NPC grouped harm 15/15 LIVE vs 7/15 lc31-b3b»).
   Pins the rule that made the drop: review/oan-pace (f) (owner OD 26/11 ~18:40Z «điểm oán nó tăng quá nhanh»; nết thresholds OD L2308) —
   an NPC plans a harm deed on a person only when her grudge heat toward that person (joanpace opHeat) ≥ BAL.oanPace.act, or an outside reason (opEx).
   And law 1 (two-way): with a real grudge the NPC has the SAME tiered harm roads (door + tier, grouped as ONE outcome per door+tier+target).
     H1. a real grudge one point below the bar (oán = act − 1) → no harm option of any NPC targets her (oán, ghen and dislike all held under the bar; opEx cases skipped).
     H2. full grudge → harm options toward her exist, at least one grouped door+tier choice, never two options on the same door+tier+target,
         every grouped member from that same tier (same checks as door-onetap F).
     H3. the bar is the BAL key: with BAL.oanPace.on = 0 the low-heat NPC from H1 gets harm options again (the gate, not something else, held them).
   usage: [MUT=1] node dev/test/npc-harm-heat.js [index.html]   (default dev/index.html — python3 dev/build/assemble.py first) → exit 1 on any failure */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
const MUT=process.env.MUT==='1';/* MUT=1: mutation proof — the gate switched off for the whole run, H1 must FAIL */
const RUN=String.raw`(()=>{window.__bot=1;if(${MUT})BAL.oanPace.on=0;const R={fail:[],n:{low:0,lowHarm:0,full:0,fullHarm:0,grp:0,reopen:0}};const F=t=>{if(R.fail.length<40&&!R.fail.includes(t))R.fail.push(t)};
 const act=BAL.oanPace.act,top=BAL.linkRange.ro[1];const harm=o=>o&&o.door&&o.door.tier&&(ONE.M[o.door.k]||{}).harm;
 const opts=v=>{try{return haOpts0(v,agNeeds(v),null)||[]}catch(e){F("haOpts0 "+e.message);return []}};
 const low=v=>{v.oan=act-1/* a real grudge, one point under the bar */;v.ghen=0;try{if(aff(v,S)<0)affAdd(v,S,-aff(v,S))}catch(e){}if(typeof v.rel==="number"&&v.rel<0)v.rel=0};
 for(const sc of ["cao","dau","hh","con","cao","dau"]){AA.scen(sc);S.sung=100;S.rank=Math.max(S.rank,6);
  const L=rivals.filter(v=>v&&v.alive&&!v.out&&!v.confined&&!v.coop);
  /* H1 + H3 */for(const v of L){low(v);let h=0;try{h=opHeat(v,S)}catch(e){}if(h>=act)continue;let ex=false;try{ex=opEx(v,S)}catch(e){}if(ex)continue;R.n.low++;
   const O=opts(v).filter(o=>harm(o)&&o.t===S);if(O.length){R.n.lowHarm++;F("H1 harm on her below the heat bar: "+v.name+" heat "+Math.round(h)+" < "+act+" · "+O.map(o=>o.door.k+"/"+o.door.tier).join(","))}}
  for(const v of L){low(v);const P0=BAL.oanPace.on;BAL.oanPace.on=0;try{if(opts(v).some(o=>harm(o)&&o.t===S))R.n.reopen++}finally{BAL.oanPace.on=P0}}
  /* H2 */for(const v of L){v.oan=top;R.n.full++;const O=opts(v).filter(harm);const G={};let toHer=0;
   for(const o of O){if(o.t===S)toHer++;const k=[o.door.k,o.door.tier,o.t&&o.t.id].join("|");if(G[k])F("H2 two options same door+tier+target "+k);G[k]=1;
    if(o.oneOf){R.n.grp++;for(const ak of o.oneOf){const m=DOOR.ofKey(ak);if(!m||m.tier!==o.door.tier)F("H2 group mixes tiers "+k+" "+ak)}}}
   if(toHer)R.n.fullHarm++}}
 if(!R.n.low)F("H1 no low-heat NPC measured");if(!R.n.fullHarm)F("H2 no NPC with a full grudge has a harm road toward her");if(!R.n.grp)F("H2 no grouped door+tier choice");
 if(!R.n.reopen)F("H3 BAL.oanPace.on=0 did not reopen any harm road (the gate is not the heat bar)");
 return R})()`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);const R=await p.evaluate(RUN);await b.close();const N=R.n;
 console.log(`NPC-HARM-HEAT · ${URL}`);
 console.log(`H1 low-heat NPCs ${N.low} (harm on her ${N.lowHarm}) · H3 reopened with pace off ${N.reopen} · H2 full-grudge NPCs ${N.full} (harm toward her ${N.fullHarm}) · grouped ${N.grp}`);
 console.log('page errors',perr.length,perr.slice(0,3).join(' | '));if(perr.length)R.fail.push('page errors '+perr.length);
 if(R.fail.length){console.log('FAIL '+R.fail.length);R.fail.forEach(f=>console.log('  - '+f));process.exit(1)}console.log('ALL PASS')})();
