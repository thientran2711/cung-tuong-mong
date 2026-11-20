/* review coop-thin-f6b r1 (law 1, npc-purpose family): the co-op friend entry ({coop:true}, jcoopworld) is a PLAYER — no npcWhy kind ever
   picks him as its actor. Probe: a world with one rival made the co-op friend, primed so loTake's 'who' takes him (rich, a grudge, a motive);
   npwAsk over EVERY registered kind (ctx {p:S}, {p:S, …}) never returns him; loTake with him as the only fit → no keeper.
   usage: python3 dev/build/assemble.py && node dev/test/coop-npw-coop.js */
const {chromium}=require('playwright');const path=require('path');const {serve,BASE}=require('./coop-serve.js');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx,path.resolve(__dirname,'../..'));
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof npwAsk==='function');
 const r=await p.evaluate(()=>{window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20&&!(typeof S!=='undefined'&&S&&S.name);i++)start();Q.length=0;
  const v=liveRivals(true)[0];v.coop=true;v.bac=99999;try{for(const k of Object.keys(v.rel||{}))v.rel[k]=-100}catch(e){}
  /* loTake: make him the one fit (grudge band, motive, money) */const B=BAL.ag.why.loTake;const d0=window.danger,m0=window.loMotive;
  const w0=window.mindW;try{danger=(a,t)=>a===v?99:0;loMotive=()=>true;mindW=(a,k)=>a===v?9:w0(a,k)}catch(e){}
  const hit=[],kinds=Object.keys(NPW.reg);
  for(const k of kinds){for(const c of [{},{p:S},{p:S,v},{m:S,c:{}}]){let O=[];try{O=npwAsk(k,c)}catch(e){}if(O.some(o=>o.who===v))hit.push(k)}}
  const lt=(()=>{try{return NPW.reg.loTake.who({p:S}).includes(v)}catch(e){return "x"}})(),la=(()=>{try{return npwAsk("loTake",{p:S}).some(o=>o.who===v)}catch(e){return "x"}})();
  try{danger=d0;loMotive=m0;mindW=w0}catch(e){}
  return {kinds:kinds.length,hit:[...new Set(hit)],ltWho:lt,loTakeActor:la}});
 const ok=r.hit.length===0;console.log((ok?'ok  ':'FAIL')+' no npcWhy kind takes the co-op friend as its actor',JSON.stringify(r));
 console.log(errs.length?'FAIL page errors '+JSON.stringify(errs.slice(0,3)):'ok   no page errors');await b.close();process.exit(ok&&!errs.length?0:1)})();
