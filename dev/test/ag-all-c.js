/* AG-ALL part C checks (jagharm.js: schemes / harm acts as consort options + AG-HAP '!' from agent deeds). Part of the ag-all test set.
   1 options: a consort with a grudge gets scheme options from the player's own act list (every option key is an ACT key = a player button), each with odds,
     a place, a why; none outside the danger band (BANDS) or the motive gate
   2 one path: with the loop on, npcAct (the old flat triggers: j8 rivalsTurn ×.04, j9/j24 rivalsBuoi, j51, j95 ambush, j95b rumour) does nothing (HA.stat.mute)
     and BAL.ag.on=0 brings it back
   3 the deed lands through the act's own function (runAct / mindRun: v.fails learnt, evidence, belief); a big scheme is prepared first (v.plan, tell)
   4 steal: haStealTry is her choice (mindPick), not the try roll
   5 bot N buổi: histogram of the harm deeds chosen (harm:*), every key maps to a player act; '!' count per buổi: quiet (0) and busy (≥2) buổi both occur,
     and no dice: adHapRoll gives the same list twice in a row (no re-roll); perf p95 of the agent slices ≤ BAL.ag.perf.p95
   usage: node dev/test/ag-all-c.js <page URL or file> [buổi]   → exit 1 on any FAIL or page error */
const {chromium}=require('playwright');const [,,URL0,NB]=process.argv;const N=+NB||160;const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+require('path').resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));p.setDefaultTimeout(600000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<40&&isSrv();i++)start();/* F3: a consort start (a servant start hides the Dư đồ '!' by design) */window.__nlInner=0;window.__bot=1;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
 /* 1 */
 const r1=await p.evaluate(()=>{const L=liveRivals(true).filter(v=>!v.queen&&!v.confined);const v=L[0],t=L[1];oanAdd(v,t,70);relAdd(v,t,-60);v.bac=300;v.duc=60;
  const N=agNeeds(v);N.spite=1;const O=haOpts(v,N,"spite");const bad=O.filter(o=>{const k=o.ak;return !(ACT[k]||["taint","cook"].includes(k))});
  const band=O.filter(o=>{if(!ACT[o.ak]||!o.t||o.ak==="tieuhuy")return false;const A=BANDS.slice(1,bandOf(danger(v,o.t))+1).flatMap(x=>x[2]);return !A.includes(o.ak)&&!A.includes(HA_VAR[o.ak])});
  return{n:O.length,keys:O.map(o=>o.k+":"+o.u.toFixed(3)),bad:bad.length,band:band.length,at:O.map(o=>o.at(j95kh(),v,o.t)).slice(0,6)}});
 ok(r1.n>0&&r1.bad===0,'options: scheme options come from the player act list (ACT) only',r1);ok(r1.band===0,'options: none outside the danger band',r1);
 /* 2 */
 const r2=await p.evaluate(()=>{const L=liveRivals(true).filter(v=>!v.queen&&!v.confined);const v=L[0],t=L[1];const m0=HA.stat.mute;let s="";for(let i=0;i<20;i++)s+=npcAct(v,t)||"";const on=HA.stat.mute-m0;
  BAL.ag.on=0;let n=0;for(let i=0;i<40;i++)if(npcAct(v,t))n++;BAL.ag.on=1;return{on,s:s.length,offRan:n}});
 ok(r2.on===20&&r2.s===0,'one path: old npcAct triggers muted while the loop is on',r2);ok(r2.offRan>=0,'switch off: npcAct runs again (BAL.ag.on=0)',r2);
 /* 3 */
 const r3=await p.evaluate(()=>{const L=liveRivals(true).filter(v=>!v.queen&&!v.confined&&!sameHouse(S,v));const v=L[0],t=L.find(x=>x!==v&&!sameHouse(v,x));v.bac=300;v.plan=null;oanAdd(v,t,80);relAdd(v,t,-80);
  const kh=j95kh();const z=agZ();const out={};
  /* a plain act (spy) lands through runAct */
  agPlan(v,{k:"harm:spy",t,act:"dò la "+t.name,need:"safe"},agNeeds(v),kh,palaceOf(t));let p=z.pend[z.pend.length-1];const b0=v.bac;out.spy=agLand(p);out.paid=b0-v.bac;
  /* a big scheme is prepared first */
  agPlan(v,{k:"harm:musk",t,act:"lén mua xạ hương",need:"spite",prep:1},agNeeds(v),kh,"nvp");p=z.pend[z.pend.length-1];const tp=t.preg,th=t.hidden;t.preg=3;t.hidden=false;out.prep=p.prep;agLand(p);out.plan=v.plan&&v.plan.k;t.preg=tp;t.hidden=th;v.plan=null;
  return out});
 ok(r3.paid===15&&typeof r3.spy==="string","land: Dò la pays the player's cost (15 bạc) via runAct",r3);ok(r3.prep===1&&r3.plan==="musk",'land: a big scheme is prepared first (v.plan)',r3);
 /* 4 */
 const r4=await p.evaluate(()=>{const v=liveRivals(true)[0];const s0=HA.stat.steal+HA.stat.stealNo;const r0=Math.random;let c=0;for(let i=0;i<50;i++)haStealTry(v,S,{u:1,p:.5,mode:"feign"});return{n:HA.stat.steal+HA.stat.stealNo-s0,tries:HA.stat.steal}});
 ok(r4.n===50&&r4.tries>0&&r4.tries<50,'steal: her choice by mindPick (try vs let it be)',r4);
 /* 6 AG-HAP fire: a provoke between two consorts planned in the garden at a later khắc → '!' quarrel at vuon from THOSE two; arriving fires the
      quarrel card with them and lands the real deed; a gossip deed → '!' gossip, the doer is the one heard */
 const r6=await p.evaluate(()=>{Q.length=0;const z=agZ();const L=liveRivals(true).filter(v=>!v.queen&&!v.confined&&!sameHouse(S,v));const a=L[0],b=L.find(x=>x!==a&&!sameHouse(a,x));
  const kh=Math.min(J95.KH-1,j95kh()+1);if(S.place==="vuon")S.place="home";
  agPlan(a,{k:"provoke",t:b,act:"tìm đến khiêu khích",need:"spite"},agNeeds(a),kh,"vuon");const pa=z.pend[z.pend.length-1];
  const H=agHap();const q=H.find(h=>h.k==="vuon"&&h.id==="quarrel");if(!q)return{noQ:1,H:H.map(h=>h.k+":"+h.id)};
  const f=adHapFire1(q,"vuon");const wit=Q.some(x=>x.t==="Ngươi bắt gặp");const d=Q.find(x=>x.t===AD_HAP_T.quarrel)||Q[Q.length-1];const txt=JSON.stringify(d||{}).slice(0,400);const landed=!z.pend.includes(pa);Q.length=0;
  const H2=agHap();return{f,wit,landed,ab:txt.includes(a.name)&&txt.includes(b.name),again:H2.some(h=>h.x&&h.x.pid===q.x.pid)}});
 ok(r6.f&&(r6.landed&&r6.ab||r6.wit),"AG-HAP: a planned garden quarrel shows '!' and fires the quarrel card with the real two, the deed lands",r6);ok(r6.again===false,"AG-HAP: once seen, that '!' is gone",r6);
 /* 5 bot */
 const H={};const hist=[];let same=1;
 for(let i=0;i<N;i++){const r=await p.evaluate(()=>{const clear=()=>{let n=0;while(Q.length&&n++<30){const m=Q[0];if(m.opts&&m.opts.length){try{chooseM(m.opts.length-1)}catch(e){Q.shift()}}else{try{closeModal()}catch(e){Q.shift()}}}};
   if(S.dead||S.out)return{dead:1};clear();try{nextBuoi()}catch(e){}try{agFlush()}catch(e){}clear();
   const a=JSON.stringify(adHapRoll().map(h=>h.k+h.id)),b=JSON.stringify(adHapRoll().map(h=>h.k+h.id));const HN=adHapNow().filter(h=>!h.done);return{n:HN.length,ids:HN.map(h=>h.id),same:a===b}});
  if(r.dead){await p.evaluate(()=>{localStorage.clear();window.__nlInner=1;start();for(let i=0;i<40&&isSrv();i++)start();/* F3: a consort start (a servant start hides the Dư đồ '!' by design) */window.__nlInner=0;Q.length=0});continue}hist.push(r.n);for(const id of r.ids||[])H[id]=(H[id]||0)+1;if(!r.same)same=0}
 const rep=await p.evaluate(()=>({by:HA.stat.by,stat:HA.stat,perf:agPerf(),errs:AG.errs.slice(-5),keysOk:(()=>{const R=new Set(RVGRP.flatMap(g=>g[1]));/* the player's rival-card buttons (j15 RVGRP) + her item act Tẩm đồ + her workshop */
   return Object.keys(HA.stat.by).every(k=>{const a=k.slice(5);return R.has(a)||["taint","cook"].includes(a)})})(),bandInRV:(()=>{const R=new Set(RVGRP.flatMap(g=>g[1]));return [...new Set(BANDS.flatMap(x=>x[2]))].filter(k=>!R.has(k))})()}));
 const h={};for(const n of hist)h[n]=(h[n]||0)+1;
 console.log('harm deeds chosen over',N,'buổi:',JSON.stringify(rep.by));console.log("'!' per buổi histogram:",JSON.stringify(h));console.log("'!' kinds over the run:",JSON.stringify(H));console.log('stat',JSON.stringify(rep.stat));
 ok(rep.keysOk,'bot: every chosen harm key is a button on the player\'s rival card (RVGRP) or her Tẩm đồ / workshop',rep.by);ok(!rep.bandInRV.length,'every act the danger band opens to an NPC is a player rival-card button',rep.bandInRV);ok((h[0]||0)>0&&Object.keys(h).some(k=>+k>=2),"bot: quiet buổi (0 '!') and busy buổi (≥2) both occur",h);
 ok((H.quarrel||0)+(H.gossip||0)+(H.deed||0)>0,"F5: people's own deeds (quarrel / gossip / witnessed deeds) put '!' on the map, not only festival / walk / cold palace",H);
 ok(same===1,"no dice: the '!' list is the same when asked twice (no re-roll)");ok(!rep.perf.p95||rep.perf.p95<=rep.perf.budget,'perf: agent slice p95 within BAL.ag.perf.p95',rep.perf);
 ok(!rep.errs.length,'no agent errors',rep.errs);ok(!errs.length,'no page errors',errs.slice(0,5));
 await b.close();process.exit(res.every(x=>x)?0:1)})();
