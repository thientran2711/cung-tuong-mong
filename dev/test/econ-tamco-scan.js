/* review/econ-tamco F2 (laws 2/3, law 11 whole group): a scheme road sells odds (+BAL.tcroad.up), so the odds must really reach the outcome.
   usage: node dev/test/sw-serve.js <port> <repo root> (other shell); node dev/test/econ-tamco-scan.js http://127.0.0.1:<port>/ [WxH@dpr] [N]
   For EVERY priced scheme (ACT[k].__c0), for her AND for an NPC actor: run the act N times with the odds frozen at 0 and N times at 100
   (her: fzRun = the card's frozen shown odds; NPC: the road bonus ECON_RB through aOdd, −/+ 200), each run from the same saved state.
   A scheme that gets roads (econRoadRolls) must give clearly different outcomes (total variation distance of the normalised result
   lines ≥ MIN_TVD). A scheme whose odds do not reach the outcome must not get roads: no road card for her, no NPC road. Seeded Math.random. */
const {chromium}=require('playwright');const [,,URL,SIZE,NN]=process.argv;const N=+NN||40,MIN_TVD=.4;
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const fails=[];const [wh,dpr]=(SIZE||"755x1000@2").split("@");const [W,H]=wh.split("x").map(Number);const errs=[];
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr||1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(600000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{window.__nlInner=1;let s=20261121>>>0;Math.random=()=>{s=(s+0x6D2B79F5)>>>0;let t=s;t=Math.imul(t^t>>>15,t|1);t^=t+Math.imul(t^t>>>7,t|61);return((t^t>>>14)>>>0)/4294967296}});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof econRoadCost==='function');await sleep(2500);
 const r=await p.evaluate(([N])=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<400;i++){KMQ.length=0;start();if(!isSrv())break}
  try{KMQ.length=0;document.querySelectorAll('.kmov').forEach(o=>o.remove());kmBusy=false}catch(e){}Q.length=0;quiet=true;
  const rich=x=>{x.bac=5000;x.tamco=80;x.duc=60;x.khac=99};rich(S);for(const v of liveRivals(true))rich(v);
  const D=JSON.stringify(ser());/* a build before F2 has no econRoadRolls: every priced scheme got roads */const RR=typeof econRoadRolls==="function"?econRoadRolls:(k)=>!!(ACT[k]&&ACT[k].__c0);const reload=()=>{deser(JSON.parse(D));Q.length=0;try{used=0}catch(e){}};
  const prep=(k,t,a)=>{if(a){delete a.frA92;const q=typeof queenP==="function"?queenP():null;if(k==="xinhh"&&q&&q!==a&&q!==t)affAdd(q,a,100)}delete t.frT92;if(k==="musk")t.preg=3;if(k==="catswap")t.preg=7;t.block=0;t.scar=0;t.rash=0;if(t.maid)t.maid.spyFor=null;S.confined=0;S.mg=null};
  const norm=s=>String(s||"").replace(/<[^>]+>/g,"").replace(/\d+/g,"#").replace(/\s+/g," ").trim().slice(0,90);
  const pair=(k,her)=>{const L=liveRivals(true);for(const a of her?[S]:L)for(const t of L.concat(her?[]:[S])){if(t===a||sameHouse(a,t))continue;prep(k,t,a);try{if(ACT[k].ok(a,t)&&(k!=="giahoa"||her||typeof motiveOK!=="function"||motiveOK(a,t,"giahoa").ok))/* an NPC frame needs a motive (j95c gate) */return [a.id==null?"S":a.id,t===S?"S":t.id]}catch(e){}}return null};
  const who=id=>id==="S"?S:RV(id);
  const run=(k,her,ids,fz)=>{reload();const a=who(ids[0]),t=who(ids[1]);prep(k,t,a);const pH=window.ptHarmSend;window.ptHarmSend=null;let r="";
   try{if(her)r=fzRun(fz,k,()=>runAct(S,t,k));else{ECON_RB={a,b:fz?200:-200,road:"scan"};ACTX=actCtx(a,t,k);try{r=ACT[k].f(a,t)}finally{ECON_RB=null;ACTX={a:null,pen:0}}/* the act itself (runAct hides an NPC-on-NPC line) */}}catch(e){r="ERR "+String(e).slice(0,60)}finally{window.ptHarmSend=pH}return norm(r)};
  const out=[];
  for(const k of Object.keys(ACT).filter(k=>ACT[k].__c0))for(const her of [true,false]){reload();const ids=pair(k,her);
   if(!ids){out.push({k,side:her?"her":"npc",skip:"no target"});continue}
   const a=who(ids[0]),t=who(ids[1]);prep(k,t,a);const roads=RR(k,a,t),o=actOdds(a,t,k);
   let card=null,npcRoad=null;
   if(her){reload();const t2=who(ids[1]);prep(k,t2,who(ids[0]));Q.length=0;try{doAct(rivals.indexOf(t2),k)}catch(e){}card=Q.some(m=>m&&m.pid==="roadpick");Q.length=0}
   else{reload();const a2=who(ids[0]),t2=who(ids[1]);prep(k,t2,who(ids[0]));const np=BAL.tcroad.npcP;BAL.tcroad.npcP=100;try{npcRoad=econRoadNpc(a2,k,t2)}finally{BAL.tcroad.npcP=np}}
   const H={0:{},100:{}};for(const fz of [0,100])for(let i=0;i<N;i++){const s=run(k,her,ids,fz);H[fz][s]=(H[fz][s]||0)+1}
   const keys=new Set(Object.keys(H[0]).concat(Object.keys(H[100])));let tvd=0;for(const s of keys)tvd+=Math.abs((H[0][s]||0)-(H[100][s]||0))/N;tvd/=2;
   const top=h=>Object.entries(h).sort((x,y)=>y[1]-x[1]).slice(0,2).map(([s,n])=>n+"× "+s);
   out.push({k,side:her?"her":"npc",ids,o,roads,card,npcRoad,tvd:Math.round(tvd*100)/100,top0:top(H[0]),top100:top(H[100])})}
  reload();quiet=false;return out},[N]);
 for(const x of r){if(x.skip){console.log(`${x.k.padEnd(11)} ${x.side} SKIP ${x.skip}`);continue}
  console.log(`${x.k.padEnd(11)} ${x.side} odds ${x.o} roads ${x.roads?"yes":"no "} ${x.side==="her"?"card "+x.card:"npcRoad "+JSON.stringify(x.npcRoad)} TVD ${x.tvd}  | 0: ${x.top0.join(" / ")}  | 100: ${x.top100.join(" / ")}`);
  if(x.roads&&x.tvd<MIN_TVD)F(`${x.k} (${x.side}): gets roads but frozen odds 0 vs 100 change little (TVD ${x.tvd} < ${MIN_TVD})`);
  if(!x.roads&&x.side==="her"&&x.card)F(`${x.k} (her): no roll on its odds but the road card opens`);
  if(!x.roads&&x.side==="npc"&&x.npcRoad)F(`${x.k} (npc): no roll on its odds but the NPC takes road ${x.npcRoad}`);
  if(x.roads&&x.side==="her"&&x.card===false)console.log(`  note: ${x.k} roads ok but no card (her gate: khắc/price/odds)`)}
 function F(m){fails.push(m)}
 const her=r.filter(x=>x.side==="her"&&x.roads),npc=r.filter(x=>x.side==="npc"&&x.roads);if(!her.length||!npc.length)F(`scan covered too little (her ${her.length}, npc ${npc.length})`);
 if(errs.length)F(`page errors: ${errs.slice(0,3).join(" | ")}`);await b.close();
 if(fails.length){console.log("FAIL\n"+fails.join("\n"));process.exit(1)}console.log(`PASS econ-tamco-scan (${her.length} her + ${npc.length} npc road schemes, N ${N})`)})();
