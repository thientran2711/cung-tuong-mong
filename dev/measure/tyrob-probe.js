/* tyrob-probe (dress-fix-n1, RV-163G N1, law 1 parity) — node dev/measure/tyrob-probe.js [dev/index.html]
   The NPC harm chooser (jagharm haOpts0, AG-ALL) builds its options from BANDS up to the hater's band toward the target. For every live consort
   with the «nặng» band toward HER (band forced to 2 here, motive gate open), list her harm options: PASS = «harm:tyrob» (or tyrobl) is among them
   with a positive utility for at least one consort, exactly like «harm:laydo» (the same family). Also prints how often each wins the pick. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000}})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof haOpts0==='function');await p.waitForTimeout(2000);
 const r=await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const b0=bandVT,m0=motiveOK,t0=haTargets;bandVT=(v,t)=>t===S?2:b0(v,t);motiveOK=(v,t,k)=>t===S?{ok:true,why:"probe"}:m0(v,t,k);haTargets=v=>[S];
  const out={consorts:0,withTyrob:0,withLaydo:0,top:{}};try{for(const v of liveRivals(true)){if(v.coop||v.out)continue;v.bac=Math.max(v.bac||0,200);out.consorts++;
   let O=[];try{O=haOpts0(v,{spite:1,sung:.3,kid:0,safe:.2,danh:.2,ally:.2},null)}catch(e){out.err=String(e)}
   const ks=O.map(o=>o.ak);if(ks.includes("tyrob")||ks.includes("tyrobl"))out.withTyrob++;if(ks.includes("laydo")||ks.includes("laydol"))out.withLaydo++;
   const best=O.slice().sort((a,b)=>b.u-a.u)[0];if(best)out.top[best.ak]=(out.top[best.ak]||0)+1}}finally{bandVT=b0;motiveOK=m0;haTargets=t0}return out});
 console.log(JSON.stringify(r));console.log(errs.length?'page errors: '+errs.slice(0,3).join(' | '):'no page errors');
 console.log(!errs.length&&r.withTyrob>0?'PASS':'FAIL');await b.close()})();
