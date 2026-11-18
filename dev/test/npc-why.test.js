/* NPC-PURPOSE STEP 0 — the shared helper (jagwhy): npcWhy / npcWhyAll / npwPick / npcWit / npcTell (report dev/handover/reports/npc-purpose.md).
   1 no reason (every why() null or below BAL.ag.why.min) → null, nobody acts (quiet)
   2 the actor is always one with a goal-valid reason; a weak reason far below the best is never picked (near × best)
   3 cooldown: the same person does not act again in the same kind before BAL.ag.why.cd tuần; a save without S.npw works
   4 npcWit: only people really at the place; best watcher first (eyes / hostility)
   5 npcTell: the teller is a witness with a grudge against the subject or a liking for the one told; nobody qualifies → null
   6 BAL.ag.why.on = 0 → npcWhy null; no page errors
   usage: node dev/test/npc-why.test.js [dev/index.html] → exit 1 on any FAIL */
const {chromium}=require('playwright');const path=require('path');const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while(isSrv()&&g<30);window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 const r=await p.evaluate(()=>{const out={};const L=liveRivals(true);out.n=L.length;delete S.npw;
  /* 1 quiet */npwReg("t_quiet",{who:()=>L,why:()=>null});out.q1=npcWhy("t_quiet")===null;
  npwReg("t_weak",{who:()=>L,why:()=>({s:BAL.ag.why.min-1,r:"x"})});out.q2=npcWhy("t_weak")===null&&npcWhyAll("t_weak").length===0;
  /* 2 goal-valid pick: one strong, one weak (below near × best), the rest no reason */
  const a=L[0],c=L[1];npwReg("t_pick",{who:()=>L,why:p=>p===a?{s:90,t:c,r:"oán "+npwNm(c),k:"vuon"}:p===c?{s:BAL.ag.why.min+1,r:"y"}:null});
  const picks={};for(let i=0;i<40;i++){delete S.npw;const o=npcWhy("t_pick");picks[o?o.who.id:"null"]=(picks[o?o.who.id:"null"]||0)+1;if(i===0)out.o0={who:o&&o.who.id,tgt:o&&o.tgt&&o.tgt.id,why:o&&o.why,place:o&&o.place}}
  out.picks=picks;out.onlyA=Object.keys(picks).length===1&&picks[a.id]===40;
  /* npwPick among near options: both chosen over many draws, never the far one */
  const P={};for(let i=0;i<400;i++){const x=npwPick(["s","n","f"],k=>({s:100,n:80,f:10})[k]);P[x]=(P[x]||0)+1}out.P=P;out.pickOk=P.s>0&&P.n>0&&!P.f;
  /* 3 cooldown (only a has a reason) */npwReg("t_one",{who:()=>L,why:p=>p===a?{s:90,r:"z"}:null});delete S.npw;const o1=npcWhy("t_one"),o2=npcWhy("t_one");out.cd=!!o1&&o1.who===a&&o2===null;const t0=S.turn;S.turn+=Math.ceil((BAL.ag.why.cd._+1)/3);out.cd2=!!npcWhy("t_one");S.turn=t0;delete S.npw;
  /* 4 witnesses (places stubbed: whereOf reads the day record) */const k="vuon";const POS=new Map(L.map(v=>[v,"tn"]));POS.set(a,k);POS.set(c,k);const wo0=whereOf;whereOf=x=>POS.has(x)?POS.get(x):"home";
  const w=npcWit(k,null,{pool:L});out.wit=w.map(x=>x.p.id).sort().join(",")===[a.id,c.id].sort().join(",");out.witNot=npcWit(k,null,{pool:L,not:[a]}).length===1;
  /* 5 tell: c hates the subject (L[2] at the place too) */const s3=L[2];POS.set(s3,k);const h0=hostility;let tl,tl2;
  try{hostility=(x,y)=>x===c&&y===s3?90:0;tl=npcTell(s3,{from:npcWit(k,null,{pool:L}).map(x=>x.p)});hostility=()=>0;const af0=aff;aff=()=>0;tl2=npcTell(s3,{from:npcWit(k,null,{pool:L}).map(x=>x.p)});aff=af0}finally{hostility=h0}
  out.tell=!!tl&&tl.who===c&&tl.to===S&&/oán/.test(tl.why);out.tell2=tl2===null;whereOf=wo0;
  /* 7 each (G1 #7): every one with a reason makes her own try, the first success is the deed; only she is stamped */npwReg("t_each",{each:true,who:()=>L,why:p=>p===a||p===c?{s:60,r:"e"}:null});delete S.npw;const tried=[];const oe=npcWhy("t_each",{},x=>{tried.push(x.who);return x.who===c});
  out.each=!!oe&&oe.who===c&&tried.includes(c)&&tried.length<=2&&npwCdOk("t_each",c)===false&&npwCdOk("t_each",a)===true;const tried2=[];delete S.npw;out.eachMiss=npcWhy("t_each",{},x=>{tried2.push(x.who);return false})===null&&tried2.length===2;
  /* 6 off */BAL.ag.why.on=0;out.off=npcWhy("t_pick")===null;BAL.ag.why.on=1;out.stat=NPW.stat.t_pick;return out});
 ok(r.n>=3,'game has rivals',r.n);ok(r.q1&&r.q2,'1 no reason → nobody acts');ok(r.onlyA,'2 actor = the one with the strong goal (40/40)',r.picks);ok(r.o0&&r.o0.why&&r.o0.tgt&&r.o0.place==='vuon','2 result carries target, reason, place',r.o0);
 ok(r.pickOk,'2 npwPick weights only between near-best options, never the far one',r.P);ok(r.cd&&r.cd2,'3 cooldown blocks a repeat, lifts after cd tuần; no S.npw OK');
 ok(r.wit&&r.witNot,'4 npcWit = only people at the place');ok(r.tell&&r.tell2,'5 npcTell = a witness with a grudge; none → null');ok(r.off,'6 BAL.ag.why.on=0 → null');ok(r.each&&r.eachMiss,'7 reg each: each one with a reason tries (first success wins, only she is stamped; all fail → null)');ok(!errs.length,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(f?'FAIL npc-why: '+f:'PASS npc-why ('+res.length+' checks)');process.exit(f?1:0)})();
